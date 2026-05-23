# Lesson 04 — Chain rule (Quy tắc dây xích)

> **Bài quan trọng nhất của Tầng 3.** Backpropagation — thuật toán huấn luyện mọi mạng neural từ AlexNet tới GPT — không hơn không kém chính là **chain rule áp dụng tuần tự, ngược từ loss về input**. Hiểu xong bài này, bạn đã hiểu cơ chế cốt lõi của deep learning.

## Mục tiêu

Sau bài này, bạn sẽ:

- Phát biểu được **chain rule** ở cả 2 dạng: ký hiệu Lagrange `(g ∘ f)'(x) = g'(f(x)) · f'(x)` và Leibniz `dy/dx = dy/du · du/dx`.
- Chứng minh được chain rule từ định nghĩa đạo hàm qua giới hạn (đầy đủ, từng bước, không "dễ thấy").
- Áp dụng chain rule cho **composition 2 lớp** (vd `sin(x²)`), **3 lớp** (vd `e^(sin(x²))`), và tổng quát n lớp.
- Nhận diện ngay **đạo hàm "bên trong"** mà người mới hay quên (lý do `(sin(x²))' = 2x cos(x²)` chứ không phải `cos(x²)`).
- Mô tả được **backpropagation** trên một mạng neural 2 lớp bằng cách áp chain rule một cách máy móc.
- Tính được gradient của loss theo **mọi tham số** (`W₁`, `W₂`, `b₁`, `b₂`) với giá trị số cụ thể.
- Liên hệ được tại sao PyTorch/TensorFlow **autograd** = "chain rule tự động".

## Prerequisites

- [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/): bạn cần thuộc đạo hàm của polynomial, `e^x`, `ln x`, `sin x`, `cos x` và quy tắc tổng/tích/thương.
- [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/): định nghĩa `f'(x) = lim (f(x+h) − f(x))/h`.
- [Algebra Lesson 05 — Hàm số (mục composition)](../../Algebra/lesson-05-functions/): khái niệm `(g ∘ f)(x) = g(f(x))`.
- [Algebra Lesson 07 — Hàm mũ, log](../../Algebra/lesson-07-exp-log-functions/): biết `e^x`, `ln x`.
- [Trigonometry Lesson 02 — sin, cos, tan](../../Trigonometry/lesson-02-sin-cos-tan/): biết sin/cos để derivatives chứa chúng có ý nghĩa.

---

## 1. Vấn đề: đạo hàm của composition

### 💡 Trực giác

Ở Algebra Lesson 05 bạn đã gặp **composition** — ghép 2 hàm: cho hàm `f` và hàm `g`, hàm composition `g ∘ f` định nghĩa bởi

```
(g ∘ f)(x) = g(f(x))
```

Nghĩa là: lấy `x`, đưa qua `f` để được `f(x)`, rồi đưa kết quả qua `g` để được `g(f(x))`. Hai bước, nối tiếp.

Ví dụ cụ thể:

- `f(x) = 3x + 1`, `g(u) = u²`. Khi đó `(g ∘ f)(x) = (3x + 1)²`.
- `f(x) = x²`, `g(u) = sin u`. Khi đó `(g ∘ f)(x) = sin(x²)`.
- `f(x) = sin x`, `g(u) = ln u`. Khi đó `(g ∘ f)(x) = ln(sin x)`.

Composition xuất hiện **ở mọi nơi** trong toán ứng dụng và đặc biệt trong neural networks (NN). Một mạng neural sâu 50 lớp chính là composition của 50 hàm.

### Câu hỏi đặt ra (sẽ giải đáp ngay trong bài)

Nếu mình biết:

- `f'(x)` — đạo hàm của `f`
- `g'(u)` — đạo hàm của `g`

Thì làm sao tính `(g ∘ f)'(x)` — đạo hàm của composition?

**Câu trả lời (chain rule)**, sẽ được chứng minh ở mục 3:

```
(g ∘ f)'(x) = g'(f(x)) · f'(x)
```

Bằng ký hiệu Leibniz, đặt `u = f(x)`, `y = g(u)`:

```
dy/dx = dy/du · du/dx
```

> Chain rule = **nhân** đạo hàm "bên ngoài" tính tại "điểm bên trong", với đạo hàm "bên trong".

### ⚠ Bẫy đầu tiên ai cũng mắc

Sai lầm phổ biến nhất: viết `(g ∘ f)'(x) = g'(f(x))` rồi **quên `· f'(x)`**.

Ví dụ:

- `(sin(x²))'` — sai thành `cos(x²)`. **Đúng**: `cos(x²) · 2x`.
- `((3x+1)²)'` — sai thành `2(3x+1)`. **Đúng**: `2(3x+1) · 3 = 6(3x+1)`.
- `(e^(2x))'` — sai thành `e^(2x)`. **Đúng**: `e^(2x) · 2 = 2 e^(2x)`.

Cách nhớ: "đạo hàm bên ngoài (giữ nguyên bên trong) **NHÂN** đạo hàm bên trong". Không nhân = sai.

### 📝 Tóm tắt mục 1

- Composition `(g ∘ f)(x) = g(f(x))` xuất hiện ở mọi nơi, đặc biệt NN.
- Chain rule trả lời câu hỏi: đạo hàm của composition là gì?
- Công thức: `(g ∘ f)'(x) = g'(f(x)) · f'(x)`. Hay Leibniz: `dy/dx = dy/du · du/dx`.
- Bẫy: quên nhân `f'(x)` (đạo hàm "bên trong").

---

## 2. Trực giác bằng tốc độ thay đổi

### 💡 Hình dung "bậc thang tốc độ"

Tưởng tượng dây chuyền sản xuất:

- Khi `x` thay đổi **1 đơn vị**, thì `u = f(x)` thay đổi `f'(x)` đơn vị (theo nghĩa **tốc độ tức thời**).
- Khi `u` thay đổi **1 đơn vị**, thì `y = g(u)` thay đổi `g'(u)` đơn vị.

Ghép lại: khi `x` thay đổi 1 đơn vị, qua tầng 1 nó "khuếch đại" thành `f'(x)` đơn vị thay đổi cho `u`, rồi qua tầng 2 nó tiếp tục khuếch đại thành `g'(u) · f'(x)` đơn vị thay đổi cho `y`.

**Đó chính là chain rule**: tốc độ tổng = tích các tốc độ tầng.

### Ví dụ tốc độ cụ thể

Cho `f(x) = 3x` (mỗi 1 đơn vị thay đổi của `x` cho 3 đơn vị thay đổi của `u`). Cho `g(u) = 2u` (mỗi 1 đơn vị thay đổi của `u` cho 2 đơn vị thay đổi của `y`).

- Khi `x` tăng 1 → `u` tăng 3 → `y` tăng `2 · 3 = 6`.
- Vậy tốc độ tổng của `y` theo `x` là `6`. Tức `dy/dx = 6`.

Kiểm tra trực tiếp: `y = g(f(x)) = 2 · (3x) = 6x`, nên `dy/dx = 6`. ✓

Verify với chain rule: `dy/du = g'(u) = 2`, `du/dx = f'(x) = 3`, tích `= 6`. ✓

### Ví dụ phi tuyến

Cho `f(x) = x²`, `g(u) = u + 1`. Composition: `y = x² + 1`.

- `f'(x) = 2x`, `g'(u) = 1`.
- Chain rule: `dy/dx = g'(f(x)) · f'(x) = 1 · 2x = 2x`.
- Kiểm tra trực tiếp: `(x² + 1)' = 2x`. ✓

Đổi vai trò: `f(x) = x + 1`, `g(u) = u²`. Composition: `y = (x + 1)²`.

- `f'(x) = 1`, `g'(u) = 2u`. Khi `u = f(x) = x + 1`, `g'(f(x)) = 2(x+1)`.
- Chain rule: `dy/dx = 2(x+1) · 1 = 2(x+1) = 2x + 2`.
- Kiểm tra trực tiếp: `(x + 1)² = x² + 2x + 1`, đạo hàm `= 2x + 2`. ✓

### 🔁 Dừng lại tự kiểm tra

**Hỏi**: Cho `f(x) = 2x + 3`, `g(u) = 5u`. Tính `(g ∘ f)'(x)` bằng 2 cách (trực tiếp và chain rule), verify bằng nhau.

<details>
<summary>Đáp án</summary>

Trực tiếp: `(g ∘ f)(x) = g(2x + 3) = 5(2x + 3) = 10x + 15`. Đạo hàm `= 10`.

Chain rule: `f'(x) = 2`, `g'(u) = 5`. `(g ∘ f)'(x) = g'(f(x)) · f'(x) = 5 · 2 = 10`. ✓ Khớp.
</details>

### ❓ Câu hỏi tự nhiên

- *"Sao chain rule chỉ là **nhân** mà nghe quan trọng đến vậy?"* — Vì khi composition lồng nhiều lớp (NN sâu = 10, 50, 1000 lớp), mỗi lớp đóng góp 1 thừa số. Vài thừa số nhỏ hơn 1 lặp lại 50 lần → gradient cực nhỏ (**vanishing gradient**). Vài thừa số lớn hơn 1 lặp lại → gradient nổ (**exploding gradient**). Cả 2 hiện tượng kinh điển trong DL đều xuất phát từ phép nhân của chain rule. Sẽ gặp lại ở Tầng 6.
- *"Tôi không nhớ thứ tự — bên ngoài trước hay bên trong trước?"* — Cứ viết Leibniz: `dy/dx = dy/du · du/dx`. Đọc từ trái sang: "`y` theo `x` = `y` theo `u` nhân `u` theo `x`". Thừa số tự khớp với chữ — `du` ở mẫu của thừa số trước, `du` ở tử của thừa số sau, "khử" nhau như phân số (đây chỉ là gợi nhớ — chain rule không phải khử phân số nhưng ký hiệu Leibniz cố tình thiết kế để dễ nhớ như vậy).
- *"Khi nào chain rule **không** áp dụng được?"* — Chỉ khi `f` không khả vi tại `x`, hoặc `g` không khả vi tại `f(x)`. Trong NN ta dùng hàm activation hầu như khả vi khắp nơi (sigmoid, tanh, GELU); ReLU không khả vi tại 0 nhưng ta định nghĩa subgradient để vẫn dùng được.

### 📝 Tóm tắt mục 2

- Trực giác "tốc độ × tốc độ": tổng tốc độ thay đổi = tích các tốc độ tầng.
- Hai dạng ký hiệu: Lagrange `(g ∘ f)'(x) = g'(f(x)) · f'(x)` và Leibniz `dy/dx = dy/du · du/dx`.
- Hai dạng tương đương — chọn theo ngữ cảnh, Leibniz gọn khi chain nhiều tầng.

---

## 3. Chứng minh chain rule

Phần này có thể skip lần đầu đọc — nhưng nếu muốn hiểu **vì sao** chain rule đúng, hãy đọc kỹ.

### Giả thiết

- `f` khả vi tại `x` (tức `f'(x)` tồn tại).
- `g` khả vi tại `u = f(x)` (tức `g'(u)` tồn tại).

### Kết luận cần chứng minh

```
lim_{h→0} [g(f(x+h)) − g(f(x))] / h = g'(f(x)) · f'(x)
```

### Chứng minh từng bước (không "dễ thấy")

**Bước 1.** Đặt ký hiệu cho tiện:

- `u = f(x)` (giá trị cố định khi `x` cố định).
- `k = f(x + h) − f(x)` (lượng thay đổi của `u` khi `x` tăng thêm `h`).

Như vậy `f(x + h) = u + k`, nên `g(f(x + h)) = g(u + k)`.

**Bước 2.** Viết lại tử số:

```
g(f(x + h)) − g(f(x)) = g(u + k) − g(u)
```

**Bước 3.** Chia cả tử và mẫu cho `h`:

```
[g(f(x+h)) − g(f(x))] / h  =  [g(u + k) − g(u)] / h
```

**Bước 4.** Đây là bước then chốt. **Nhân và chia** cho `k`:

```
[g(u + k) − g(u)] / h  =  [g(u + k) − g(u)] / k  ·  k / h
```

(với điều kiện `k ≠ 0` — sẽ xử lý trường hợp `k = 0` ở Bước 7.)

**Bước 5.** Thay `k = f(x + h) − f(x)`:

```
k / h = [f(x + h) − f(x)] / h
```

Vậy:

```
[g(f(x+h)) − g(f(x))] / h  =  [g(u + k) − g(u)] / k  ·  [f(x + h) − f(x)] / h
```

**Bước 6.** Lấy giới hạn `h → 0`.

- Vì `f` khả vi tại `x`, nó liên tục tại `x`, nên `f(x + h) → f(x)` khi `h → 0`. Tương đương: `k = f(x + h) − f(x) → 0`.
- Thừa số thứ hai: `[f(x + h) − f(x)] / h → f'(x)` (định nghĩa đạo hàm của `f`).
- Thừa số thứ nhất: `[g(u + k) − g(u)] / k`. Khi `h → 0` thì `k → 0`, nên đây là giới hạn của tỉ sai phân của `g` tại `u`, bằng `g'(u) = g'(f(x))` (định nghĩa đạo hàm của `g`).

Vậy tích → `g'(f(x)) · f'(x)`. □

**Bước 7.** Xử lý trường hợp `k = 0`.

Có thể tồn tại `h ≠ 0` mà `f(x + h) = f(x)` (tức `k = 0`). Bước 4 đã chia cho `k`, nên không hợp lệ. Cách xử lý: định nghĩa hàm phụ

```
ε(k) = [g(u + k) − g(u)] / k − g'(u),  khi k ≠ 0
ε(0) = 0
```

Khi đó `ε(k) → 0` khi `k → 0` (do `g` khả vi tại `u`), và **với mọi k** (kể cả `k = 0`):

```
g(u + k) − g(u) = (g'(u) + ε(k)) · k
```

(với `k = 0` cả 2 vế đều là 0). Chia cho `h`:

```
[g(f(x+h)) − g(f(x))] / h = (g'(u) + ε(k)) · k / h
                          = (g'(u) + ε(k)) · [f(x+h) − f(x)] / h
```

Khi `h → 0`: `k → 0` nên `ε(k) → 0`, và `[f(x+h) − f(x)] / h → f'(x)`. Tích → `g'(u) · f'(x) = g'(f(x)) · f'(x)`. □

### ❓ Câu hỏi tự nhiên

- *"Sao phải xử lý case `k = 0`? Trong thực tế có gặp không?"* — Có, ví dụ `f(x) = x² · sin(1/x)` rất hay dao động qua 0. Lập luận trực quan "nhân chia cho `k`" chỉ đúng khi `k ≠ 0`; trong giáo trình nghiêm túc người ta xử lý case này bằng hàm phụ `ε(k)` như Bước 7. Bạn không cần nhớ chi tiết — chỉ cần biết: **chain rule vẫn đúng**.
- *"Chứng minh trên có dùng tính liên tục của `f` ở chỗ nào?"* — Bước 6, khi nói `k → 0` lúc `h → 0`. Vì `f` khả vi → `f` liên tục → `f(x+h) → f(x)`.

### 📝 Tóm tắt mục 3

- Ý tưởng chứng minh: viết lượng thay đổi của `g(f(x))` qua lượng thay đổi của `f`, rồi tách tỉ sai phân thành tích hai tỉ sai phân.
- Bước trick: nhân chia cho `k = f(x+h) − f(x)`.
- Phải xử lý case `k = 0` bằng hàm phụ `ε(k)` để chặt chẽ — bản chất công thức không đổi.

---

## 4. Walk-through 6 ví dụ tăng dần độ phức tạp

Quy trình áp dụng chain rule (luôn dùng quy trình này lần đầu):

1. **Xác định lớp ngoài và lớp trong**: gọi `u = f(x)` là biểu thức "bên trong", `y = g(u)` là hàm "bên ngoài".
2. Tính `dy/du` (giả vờ `u` là biến độc lập).
3. Tính `du/dx`.
4. Nhân: `dy/dx = dy/du · du/dx`.
5. Thay `u = f(x)` để biểu diễn theo `x`.

### Ví dụ 1: `y = (3x + 1)²`

- Lớp trong `u = 3x + 1`, lớp ngoài `y = u²`.
- `dy/du = 2u`.
- `du/dx = 3`.
- Chain: `dy/dx = 2u · 3 = 6u = 6(3x + 1) = 18x + 6`.

Verify trực tiếp: khai triển `(3x + 1)² = 9x² + 6x + 1`. Đạo hàm `= 18x + 6`. ✓

### Ví dụ 2: `y = sin(x²)`

- Lớp trong `u = x²`, lớp ngoài `y = sin u`.
- `dy/du = cos u`.
- `du/dx = 2x`.
- Chain: `dy/dx = cos u · 2x = 2x · cos(x²)`.

Verify tại `x = 1`: `y = sin(1) ≈ 0.8415`. Slope theo chain rule: `2 · 1 · cos(1) ≈ 2 · 0.5403 = 1.0806`.

Sanity check số: tính `[sin((1.001)²) − sin(1²)] / 0.001 = [sin(1.002001) − sin(1)] / 0.001 ≈ [0.84249 − 0.84147] / 0.001 ≈ 1.022` (sai số do `h = 0.001` còn lớn; giảm `h = 0.0001` cho ra ≈ 1.0812, gần `1.0806` ✓).

### Ví dụ 3: `y = e^(2x)`

- Lớp trong `u = 2x`, lớp ngoài `y = e^u`.
- `dy/du = e^u`.
- `du/dx = 2`.
- Chain: `dy/dx = e^u · 2 = 2 e^(2x)`.

Verify tại `x = 0`: `y = e^0 = 1`, slope `= 2 · e^0 = 2`. Số: `(e^(0.002) − 1) / 0.001 ≈ (1.002002 − 1) / 0.001 ≈ 2.002` ✓.

### Ví dụ 4: `y = ln(sin x)`

- Lớp trong `u = sin x`, lớp ngoài `y = ln u`.
- `dy/du = 1/u`.
- `du/dx = cos x`.
- Chain: `dy/dx = (1/u) · cos x = cos x / sin x = cot x`.

Tại `x = π/4`: `y = ln(sin(π/4)) = ln(√2/2) ≈ −0.3466`. Slope `= cot(π/4) = 1`. Số: `[ln(sin(π/4 + 0.001)) − ln(sin(π/4))] / 0.001`. `sin(π/4 + 0.001) ≈ 0.70781`, `ln(0.70781) ≈ −0.34561`. So với `ln(√2/2) ≈ −0.34657`: hiệu `≈ 0.00096`, chia `0.001` ≈ `0.96` ≈ `1` (sai số `h`) ✓.

### Ví dụ 5: `y = (x² + 1)^10`

- Lớp trong `u = x² + 1`, lớp ngoài `y = u^10`.
- `dy/du = 10 u^9`.
- `du/dx = 2x`.
- Chain: `dy/dx = 10 u^9 · 2x = 20x (x² + 1)^9`.

Tại `x = 1`: `u = 2`, `y = 2^10 = 1024`, slope `= 20 · 1 · 2^9 = 20 · 512 = 10240`. (Khai triển `(x² + 1)^10` ra polynomial sẽ rất dài — chain rule tiết kiệm thời gian khủng khiếp.)

### Ví dụ 6: `y = e^(sin(x²))` — chain 3 lớp

Đây là composition của 3 hàm. Tách ra:

- `v = x²` (lớp trong cùng).
- `u = sin v` (lớp giữa).
- `y = e^u` (lớp ngoài cùng).

Áp chain rule 2 lần (hoặc dùng dạng tổng quát mục 5):

```
dy/dx = dy/du · du/dv · dv/dx
      = e^u · cos v · 2x
      = e^(sin(x²)) · cos(x²) · 2x
      = 2x · cos(x²) · e^(sin(x²))
```

Tại `x = 1`: `v = 1`, `u = sin 1 ≈ 0.8415`, `y = e^0.8415 ≈ 2.3198`. Slope `= 2 · cos(1) · e^(sin 1) ≈ 2 · 0.5403 · 2.3198 ≈ 2.507`.

### ⚠ Lỗi thường gặp khi áp dụng

| Lỗi | Ví dụ sai | Đúng |
|-----|-----------|------|
| Quên `du/dx` | `(sin(x²))' = cos(x²)` | `= 2x cos(x²)` |
| Sai dấu | `(cos(2x))' = sin(2x) · 2` | `= −2 sin(2x)` |
| Nhầm lớp ngoài/trong | Coi `sin(x²)` là `sin · x²` rồi áp tích | Đây là composition, không phải tích |
| Áp 1 lần khi cần 2 lần | `(e^(sin x²))' = e^(sin x²) · 2x` | Thiếu `cos(x²)`: `= 2x cos(x²) e^(sin x²)` |
| Không thay `u` về `x` ở bước cuối | Để `dy/du = 2u` mà không nói `u = ?` | Thay rõ `u = 3x + 1` |

### 🔁 Dừng lại tự kiểm tra

**Hỏi 1**: Đạo hàm của `y = cos(3x + 5)` là gì?

<details>
<summary>Đáp án</summary>

`u = 3x + 5`, `y = cos u`. `dy/du = −sin u`, `du/dx = 3`. → `dy/dx = −3 sin(3x + 5)`.
</details>

**Hỏi 2**: Đạo hàm của `y = √(x² + 1)` là gì? (Gợi ý: `√u = u^(1/2)`.)

<details>
<summary>Đáp án</summary>

`u = x² + 1`, `y = u^(1/2)`. `dy/du = (1/2) u^(−1/2) = 1/(2√u)`. `du/dx = 2x`. → `dy/dx = 2x / (2√(x² + 1)) = x / √(x² + 1)`.
</details>

**Hỏi 3**: Đạo hàm của `y = ln(x² + e^x)` là gì?

<details>
<summary>Đáp án</summary>

`u = x² + e^x`, `y = ln u`. `dy/du = 1/u`. `du/dx = 2x + e^x`. → `dy/dx = (2x + e^x) / (x² + e^x)`.
</details>

### 📝 Tóm tắt mục 4

- Quy trình 5 bước: xác định lớp → `dy/du` → `du/dx` → nhân → thay biến.
- Luyện 6 ví dụ từ đơn giản (`(3x+1)²`) đến chain 3 lớp (`e^(sin(x²))`).
- Lỗi hay gặp: quên nhân đạo hàm "bên trong" — luôn check thừa số cuối.

---

## 5. Chain rule nhiều lớp (n-fold composition)

### Công thức tổng quát

Cho composition `n` hàm:

```
y = f_n(f_{n-1}(f_{n-2}(... f_1(x) ...)))
```

Đặt:

- `u_1 = f_1(x)`
- `u_2 = f_2(u_1)`
- ...
- `u_n = f_n(u_{n-1}) = y`

Khi đó chain rule mở rộng:

```
dy/dx = f_n'(u_{n-1}) · f_{n-1}'(u_{n-2}) · ... · f_1'(x)
```

Hay viết bằng Leibniz:

```
dy/dx = (du_n / du_{n-1}) · (du_{n-1} / du_{n-2}) · ... · (du_1 / dx)
```

**Quan sát quan trọng**: là **tích của n thừa số đạo hàm**, mỗi thừa số đánh giá tại điểm `u_{k-1}` tương ứng.

### Walk-through 3 lớp

Bài Ví dụ 6 ở mục 4 đã làm với 3 lớp. Tổng quát hơn:

Cho `f, g, h` khả vi, `y = h(g(f(x)))`. Đặt:

- `u = f(x)` → `du/dx = f'(x)`.
- `v = g(u)` → `dv/du = g'(u)`.
- `y = h(v)` → `dy/dv = h'(v)`.

Chain rule:

```
dy/dx = h'(v) · g'(u) · f'(x)
      = h'(g(f(x))) · g'(f(x)) · f'(x)
```

**Cách đọc**: lấy đạo hàm "ngoài cùng" tại điểm trong cùng đã eval lên, **nhân** đạo hàm "lớp giữa" tại điểm trong, **nhân** đạo hàm "trong cùng" tại `x`.

### Walk-through 5 lớp

Cho `y = ln(cos(sin(e^(x²))))`. Tách lớp từ trong ra ngoài:

- `u_1 = x²` → `du_1/dx = 2x`.
- `u_2 = e^{u_1}` → `du_2/du_1 = e^{u_1}`.
- `u_3 = sin(u_2)` → `du_3/du_2 = cos(u_2)`.
- `u_4 = cos(u_3)` → `du_4/du_3 = −sin(u_3)`.
- `y = ln(u_4)` → `dy/du_4 = 1/u_4`.

Chain:

```
dy/dx = (1/u_4) · (−sin u_3) · cos u_2 · e^{u_1} · 2x
      = (1/cos(sin(e^{x²}))) · (−sin(sin(e^{x²}))) · cos(e^{x²}) · e^{x²} · 2x
```

Trông kinh khủng nhưng máy móc — cứ áp từng lớp.

### ❓ Câu hỏi tự nhiên

- *"Có thể tính chain n lớp song song được không?"* — Trên giấy không, nhưng khi `n` lớn (NN sâu), backprop **lưu các giá trị trung gian** `u_1, u_2, ...` từ forward pass, rồi nhân ngược lại từ phải sang trái. Đó là lý do training cần nhiều RAM — phải giữ activations trung gian.
- *"Nếu một thừa số = 0 thì cả tích = 0?"* — Đúng. Trong NN, nếu activation derivative = 0 ở một lớp (vd ReLU với input âm), gradient flow tới các lớp trước bị **chặn đứt**. Đây là cội nguồn của "dying ReLU".
- *"Tại sao gọi là `dây xích`?"* — Vì hình thức `dy/dx = dy/du · du/dv · dv/dw · ... ` các `du`, `dv` "móc nối" nhau như mắt xích trong một sợi dây xích. Cắt một mắt xích = cắt cả dây.

### 📝 Tóm tắt mục 5

- Chain rule mở rộng cho `n` hàm: `dy/dx = tích của n đạo hàm cấp 1`.
- Mỗi thừa số đánh giá tại "điểm trung gian" tương ứng.
- Trong NN sâu: forward pass tính các `u_k`, backward pass nhân các `f_k'(u_{k-1})` từ phải qua trái.

---

## 6. Chain rule = Backpropagation

**Phần dài và quan trọng nhất bài.** Chúng ta sẽ chứng minh rằng backprop trong NN không có gì hơn chain rule áp dụng máy móc.

### 6.1. Setup: NN 2 lớp với 1 neuron mỗi lớp

Để rõ từng phép, dùng NN nhỏ nhất có thể minh họa: input scalar, hidden 1 neuron, output 1 neuron.

```
x ──[W₁,b₁]──> z₁ ──σ──> a₁ ──[W₂,b₂]──> z₂ = y ──> L = (y − target)²
```

Cụ thể:

- **Forward**:
  - `z₁ = W₁ · x + b₁`
  - `a₁ = σ(z₁)` — `σ` là activation, ta dùng sigmoid `σ(z) = 1/(1 + e^(−z))`.
  - `z₂ = W₂ · a₁ + b₂`
  - `y = z₂` (linear output cho hồi quy).
  - `L = (y − target)²` (loss MSE).

- **Tham số cần học**: `W₁, b₁, W₂, b₂` (4 số).

- **Mục tiêu**: tính `∂L/∂W₁, ∂L/∂b₁, ∂L/∂W₂, ∂L/∂b₂` để cập nhật theo gradient descent:
  ```
  W₁ ← W₁ − η · ∂L/∂W₁
  ```

> Các đạo hàm `∂L/∂W₁` v.v. là **đạo hàm riêng** — chính thức học ở Lesson 06. Lúc này chỉ cần hiểu: "giả vờ các tham số khác cố định, đạo hàm theo 1 biến".

### 6.2. Cần biết: đạo hàm của sigmoid

```
σ(z) = 1 / (1 + e^(−z))
σ'(z) = σ(z) · (1 − σ(z))
```

Chứng minh nhanh: đặt `u = 1 + e^(−z)`, `σ = 1/u`. `du/dz = −e^(−z)`. `dσ/du = −1/u²`. Chain: `σ'(z) = (−1/u²) · (−e^(−z)) = e^(−z) / u² = e^(−z) / (1 + e^(−z))²`. Biến đổi: `e^(−z) = 1/σ − 1 = (1 − σ)/σ`, thay vào: `σ'(z) = (1−σ)/σ · σ² = σ(1−σ)`. □

### 6.3. Áp chain rule từ L ngược về W₁ (backward pass)

Backprop = áp chain rule **từ ngoài vào trong**. Loss `L` là hàm "ngoài cùng" của tất cả; ta đi ngược dần.

Để tiện, ký hiệu `δ_v ≡ ∂L/∂v` cho mỗi biến trung gian `v`. (Trong literature DL, ký hiệu này gọi là "error signal".)

**Bước B1.** Đạo hàm L theo y (lớp ngoài cùng):

```
L = (y − target)²
∂L/∂y = 2(y − target)
```

Đặt `δ_y = 2(y − target)`.

**Bước B2.** Đạo hàm L theo z₂ qua y.

```
y = z₂ ⇒ ∂y/∂z₂ = 1
∂L/∂z₂ = ∂L/∂y · ∂y/∂z₂ = δ_y · 1 = δ_y
```

Đặt `δ_{z₂} = δ_y`.

**Bước B3.** Đạo hàm L theo W₂.

```
z₂ = W₂ · a₁ + b₂ ⇒ ∂z₂/∂W₂ = a₁
∂L/∂W₂ = ∂L/∂z₂ · ∂z₂/∂W₂ = δ_{z₂} · a₁
```

**Đây là gradient cho W₂** — cập nhật: `W₂ ← W₂ − η · δ_{z₂} · a₁`.

**Bước B4.** Đạo hàm L theo b₂.

```
∂z₂/∂b₂ = 1
∂L/∂b₂ = δ_{z₂} · 1 = δ_{z₂}
```

**Bước B5.** Đạo hàm L theo a₁ (đi ngược qua lớp 2).

```
∂z₂/∂a₁ = W₂
∂L/∂a₁ = δ_{z₂} · W₂
```

Đặt `δ_{a₁} = δ_{z₂} · W₂`. **Đây là tín hiệu lỗi propagate ngược về lớp 1.**

**Bước B6.** Đạo hàm L theo z₁ (đi qua activation).

```
a₁ = σ(z₁) ⇒ ∂a₁/∂z₁ = σ'(z₁) = a₁(1 − a₁)
∂L/∂z₁ = δ_{a₁} · σ'(z₁)
```

Đặt `δ_{z₁} = δ_{a₁} · a₁(1 − a₁)`.

**Bước B7.** Đạo hàm L theo W₁.

```
z₁ = W₁ · x + b₁ ⇒ ∂z₁/∂W₁ = x
∂L/∂W₁ = δ_{z₁} · x
```

**Bước B8.** Đạo hàm L theo b₁.

```
∂L/∂b₁ = δ_{z₁} · 1 = δ_{z₁}
```

**Tổng kết các công thức**:

```
δ_y    = 2(y − target)
δ_{z₂} = δ_y
∂L/∂W₂ = δ_{z₂} · a₁
∂L/∂b₂ = δ_{z₂}
δ_{a₁} = δ_{z₂} · W₂
δ_{z₁} = δ_{a₁} · σ'(z₁)  =  δ_{a₁} · a₁(1 − a₁)
∂L/∂W₁ = δ_{z₁} · x
∂L/∂b₁ = δ_{z₁}
```

**Đó là backpropagation.** Không có gì khác — chain rule áp dụng tuần tự ngược từ L về W₁.

### 6.4. Walk-through bằng số cụ thể

Cho input `x = 2`, target `t = 1.5`, tham số ban đầu:

```
W₁ = 0.5,  b₁ = 0.1
W₂ = 1.5,  b₂ = −0.2
```

**Forward pass:**

| Biến | Công thức | Tính |
|------|-----------|------|
| `z₁` | `W₁ x + b₁` | `0.5 · 2 + 0.1 = 1.1` |
| `a₁` | `σ(z₁)` | `1 / (1 + e^(−1.1)) = 1 / (1 + 0.3329) ≈ 0.7503` |
| `z₂` | `W₂ a₁ + b₂` | `1.5 · 0.7503 + (−0.2) = 1.1254 − 0.2 = 0.9254` |
| `y`  | `z₂` | `0.9254` |
| `L`  | `(y − t)²` | `(0.9254 − 1.5)² = (−0.5746)² ≈ 0.3302` |

**Backward pass (áp chain rule):**

| Biến | Công thức | Tính |
|------|-----------|------|
| `δ_y` | `2(y − t)` | `2 · (0.9254 − 1.5) = 2 · (−0.5746) = −1.1492` |
| `δ_{z₂}` | `δ_y` | `−1.1492` |
| `∂L/∂W₂` | `δ_{z₂} · a₁` | `−1.1492 · 0.7503 ≈ −0.8623` |
| `∂L/∂b₂` | `δ_{z₂}` | `−1.1492` |
| `δ_{a₁}` | `δ_{z₂} · W₂` | `−1.1492 · 1.5 ≈ −1.7238` |
| `σ'(z₁)` | `a₁(1−a₁)` | `0.7503 · 0.2497 ≈ 0.1873` |
| `δ_{z₁}` | `δ_{a₁} · σ'(z₁)` | `−1.7238 · 0.1873 ≈ −0.3229` |
| `∂L/∂W₁` | `δ_{z₁} · x` | `−0.3229 · 2 ≈ −0.6458` |
| `∂L/∂b₁` | `δ_{z₁}` | `−0.3229` |

**Cập nhật tham số (1 bước gradient descent, η = 0.1):**

```
W₁ ← 0.5  − 0.1 · (−0.6458) = 0.5  + 0.0646 = 0.5646
b₁ ← 0.1  − 0.1 · (−0.3229) = 0.1  + 0.0323 = 0.1323
W₂ ← 1.5  − 0.1 · (−0.8623) = 1.5  + 0.0862 = 1.5862
b₂ ← −0.2 − 0.1 · (−1.1492) = −0.2 + 0.1149 = −0.0851
```

**Kiểm tra**: forward lại với tham số mới:

```
z₁ = 0.5646 · 2 + 0.1323 = 1.2615
a₁ = σ(1.2615) ≈ 0.7794
z₂ = 1.5862 · 0.7794 + (−0.0851) = 1.2363 − 0.0851 = 1.1512
y  = 1.1512
L  = (1.1512 − 1.5)² ≈ 0.1217
```

Loss giảm từ `0.3302` → `0.1217`. **Gradient descent hoạt động.** Đó là cốt lõi training NN.

### 6.5. Vì sao gọi là "back-prop"?

Nhìn vào chuỗi `δ_y → δ_{z₂} → δ_{a₁} → δ_{z₁}` — tín hiệu lỗi `δ` được **propagate ngược** từ output về input, đi qua từng lớp, **nhân thêm 1 thừa số đạo hàm địa phương** ở mỗi bước.

- Ở lớp output: `δ_y = ∂L/∂y` (đạo hàm của L).
- Đi qua linear `z₂ = W₂ a₁ + b₂` ngược lại: nhân với `W₂` (đạo hàm địa phương `∂z₂/∂a₁`).
- Đi qua activation `a₁ = σ(z₁)` ngược lại: nhân với `σ'(z₁)`.
- Đi qua linear `z₁ = W₁ x + b₁` ngược lại: nhân với `x` để ra gradient W₁ (đạo hàm địa phương `∂z₁/∂W₁`).

**Mỗi cạnh trong computation graph có 1 "local gradient". Chain rule = nhân các local gradient dọc đường từ input tới output.** Backprop = thuật toán hệ thống để làm việc đó.

### 6.6. Tổng quát hóa: NN với vector và ma trận

Khi `x` là vector và mỗi lớp có nhiều neuron, công thức trở thành ma trận:

```
z₁ = W₁ x + b₁      (W₁ là ma trận)
a₁ = σ(z₁)          (σ áp element-wise)
z₂ = W₂ a₁ + b₂     (W₂ là ma trận)
```

Backprop tổng quát:

```
δ_y = ∂L/∂y                      (vector)
δ_{z₂} = δ_y                     (nếu output = z₂)
∂L/∂W₂ = δ_{z₂} a₁ᵀ              (outer product → ma trận, cùng shape W₂)
∂L/∂b₂ = δ_{z₂}                  (vector)
δ_{a₁} = W₂ᵀ δ_{z₂}              (ma trận chuyển vị)
δ_{z₁} = δ_{a₁} ⊙ σ'(z₁)         (Hadamard / element-wise)
∂L/∂W₁ = δ_{z₁} xᵀ               (outer product)
∂L/∂b₁ = δ_{z₁}
```

Vẫn là chain rule — chỉ thay `·` (scalar) bằng phép ma trận (`outer`, transpose, Hadamard). Sẽ học chính thức ở Tầng 4 (Linear Algebra) và Tầng 6 (AI/ML).

> Lúc này chỉ cần ghi nhớ: **Backprop = chain rule**. Linear algebra chỉ là cách viết compact khi nhiều biến.

### ⚠ Lỗi thường gặp trong backprop

| Lỗi | Hậu quả |
|-----|---------|
| Quên nhân `σ'(z₁)` ở activation | Gradient cho lớp 1 sai |
| Dùng `a₁` thay vì `x` ở `∂L/∂W₁` | Sai thừa số cuối |
| Nhầm `W₂` và `W₂ᵀ` (trong NN ma trận) | Shape không khớp, gradient sai |
| Quên reset gradient giữa các batch (PyTorch) | Gradient tích lũy → sai |
| Dùng `δ_{z₂}` thay vì `δ_y` ở output không có activation cuối | Tùy bài, có thể trùng nhưng cần verify |

### 🔁 Dừng lại tự kiểm tra

**Hỏi**: NN cùng kiến trúc mục 6.1, nhưng `x = 1, target = 0, W₁ = 1.0, b₁ = 0, W₂ = 2.0, b₂ = 0`. Tính forward và `∂L/∂W₁`.

<details>
<summary>Đáp án</summary>

Forward:
- `z₁ = 1·1 + 0 = 1`
- `a₁ = σ(1) = 1/(1+e^(−1)) ≈ 0.7311`
- `z₂ = 2·0.7311 + 0 = 1.4621`
- `y = 1.4621`, `L = (1.4621 − 0)² = 2.1378`

Backward:
- `δ_y = 2(1.4621 − 0) = 2.9241`
- `δ_{z₂} = 2.9241`
- `δ_{a₁} = δ_{z₂} · W₂ = 2.9241 · 2 = 5.8483`
- `σ'(1) = 0.7311 · (1 − 0.7311) = 0.7311 · 0.2689 ≈ 0.1966`
- `δ_{z₁} = 5.8483 · 0.1966 ≈ 1.1499`
- `∂L/∂W₁ = δ_{z₁} · x = 1.1499 · 1 = 1.1499`
</details>

### 📝 Tóm tắt mục 6

- Backprop = chain rule áp dụng tuần tự từ loss về tham số.
- Mỗi cạnh trong computation graph có "local gradient"; chain rule = nhân các local gradient.
- Walk-through số: forward 5 dòng → backward 8 dòng → cập nhật 4 tham số. **Đó là cốt lõi 1 step training.**
- Phiên bản ma trận chỉ thay `·` bằng `outer/transpose/Hadamard` — nguyên tắc không đổi.

---

## 7. Autograd: chain rule tự động hóa

### 💡 Trực giác

Người mới học DL thường tưởng tượng PyTorch/TensorFlow có "phép màu" để tính gradient. **Không có phép màu** — chỉ là tự động hóa chain rule.

### Cách autograd hoạt động (mức cao)

Khi bạn viết Python:

```python
import torch
x = torch.tensor(2.0, requires_grad=True)
y = torch.sin(x * x)
y.backward()
print(x.grad)  # → 2*x*cos(x²) tại x=2 ≈ 2*2*cos(4) ≈ -2.6146
```

Bên trong, PyTorch:

1. **Ghi lại computation graph** ở forward pass: `tmp = x * x`, `y = sin(tmp)`. Mỗi node lưu operation đã dùng và các input.
2. **Mỗi operation có "backward function"** đã code sẵn:
   - `mul`: nếu `c = a * b`, thì `∂c/∂a = b`, `∂c/∂b = a`.
   - `sin`: nếu `c = sin(a)`, thì `∂c/∂a = cos(a)`.
3. Gọi `y.backward()` → PyTorch chạy chain rule từ `y` ngược về `x`:
   - `dy/d(tmp) = cos(tmp)` (đạo hàm địa phương của sin).
   - `d(tmp)/dx = 2x` (đạo hàm địa phương của `x*x`, tính ra bằng cách áp dụng product rule: ∂(x·x)/∂x = x + x = 2x).
   - Nhân: `dy/dx = cos(tmp) · 2x = 2x · cos(x²)`.
4. Kết quả gán vào `x.grad`.

**Reverse-mode autodiff** = thuật toán tổng quát hóa backprop cho mọi computation graph. Cùng nguyên tắc — chain rule reverse.

### Tại sao reverse-mode mà không forward-mode?

- **Forward-mode**: tính `∂(mọi biến)/∂(1 input)` trong 1 pass. Hiệu quả khi **ít input, nhiều output**.
- **Reverse-mode (backprop)**: tính `∂(1 output)/∂(mọi biến)` trong 1 pass. Hiệu quả khi **nhiều input, ít output**.

NN có hàng triệu/tỉ tham số (input của graph từ góc nhìn loss) và 1 loss (output). → Reverse-mode rẻ hơn rất nhiều.

### ❓ Câu hỏi tự nhiên

- *"Có phải autograd ghi lại từng phép cộng/nhân không? Tốn RAM khủng khiếp?"* — Có, training NN tốn RAM gấp 2–3 lần inference, vì phải giữ activations để dùng ở backward. Có các kỹ thuật giảm: **gradient checkpointing** (đánh đổi compute lấy memory — tính lại activations khi cần thay vì lưu).
- *"Nếu mình muốn tự cài backprop bằng Go thì có cần code chain rule từng phép?"* — Có. Bạn cần 1 cấu trúc `Tensor` lưu giá trị + `grad` + tham chiếu tới operation đã sinh ra nó, và mỗi operation đăng ký 1 `backward` function. Sẽ thấy ở Tầng 6 khi build linear regression và NN nhỏ from scratch.

### 📝 Tóm tắt mục 7

- Autograd = ghi computation graph + áp chain rule reverse tự động.
- Mỗi operation có "local gradient" đã code sẵn (sin → cos, mul → cấu trúc product, v.v.).
- Reverse-mode = backprop tổng quát hóa; phù hợp NN do nhiều input, ít output.

---

## 8. Bài tập

### Bài 1

Tính `(d/dx)[cos(5x − 1)]`.

### Bài 2

Tính `(d/dx)[(x³ + 2x)^4]`.

### Bài 3

Tính `(d/dx)[e^(x² + 3x)]`.

### Bài 4

Tính `(d/dx)[ln(1 + e^x)]`. (Đây là **softplus**, hàm dùng nhiều trong ML.)

### Bài 5

Tính `(d/dx)[sin(cos(x))]`. Chain 2 lớp.

### Bài 6

NN 2 lớp như mục 6.1. Cho `x = 0.5, target = 0.2, W₁ = −0.3, b₁ = 0.1, W₂ = 1.2, b₂ = 0.05`, activation sigmoid, loss MSE.

(a) Forward pass — tính `z₁, a₁, z₂, y, L`.

(b) Backward pass — tính `∂L/∂W₁, ∂L/∂b₁, ∂L/∂W₂, ∂L/∂b₂`.

(c) Cập nhật tham số với `η = 0.5`, forward lại, verify loss giảm.

---

## Lời giải chi tiết

### Bài 1: `(d/dx)[cos(5x − 1)]`

- Lớp trong `u = 5x − 1`, lớp ngoài `y = cos u`.
- `dy/du = −sin u`, `du/dx = 5`.
- Chain: `dy/dx = −sin u · 5 = −5 sin(5x − 1)`.

**Đáp án**: `−5 sin(5x − 1)`.

### Bài 2: `(d/dx)[(x³ + 2x)^4]`

- `u = x³ + 2x`, `y = u^4`.
- `dy/du = 4u³`, `du/dx = 3x² + 2`.
- Chain: `dy/dx = 4u³ (3x² + 2) = 4(x³ + 2x)³ (3x² + 2)`.

**Đáp án**: `4(3x² + 2)(x³ + 2x)³`.

Verify tại `x = 1`: `u = 3`, `y = 81`. Theo công thức: `4 · 3³ · 5 = 4 · 27 · 5 = 540`. Sanity check số: `h = 0.001`. `(1.001³ + 2 · 1.001)^4` so với `3^4`. `1.001³ ≈ 1.003003`, `1.001³ + 2.002 = 3.005003`. `3.005003^4 ≈ 81.5402`. Hiệu `≈ 0.5402`, chia `h = 0.001` ≈ `540.2`. ✓

### Bài 3: `(d/dx)[e^(x² + 3x)]`

- `u = x² + 3x`, `y = e^u`.
- `dy/du = e^u`, `du/dx = 2x + 3`.
- Chain: `dy/dx = (2x + 3) e^(x² + 3x)`.

**Đáp án**: `(2x + 3) · e^(x² + 3x)`.

### Bài 4: `(d/dx)[ln(1 + e^x)]` — softplus

- `u = 1 + e^x`, `y = ln u`.
- `dy/du = 1/u`, `du/dx = e^x`.
- Chain: `dy/dx = e^x / (1 + e^x)`.

**Quan sát quan trọng**: `e^x / (1 + e^x) = 1 / (1 + e^(−x)) = σ(x)`.

**Tức là đạo hàm của softplus chính là sigmoid.** Đó là lý do softplus được dùng làm "smooth approximation" của ReLU — đạo hàm có dạng đẹp.

**Đáp án**: `σ(x) = 1/(1 + e^(−x))`.

### Bài 5: `(d/dx)[sin(cos(x))]`

- `u = cos x`, `y = sin u`.
- `dy/du = cos u`, `du/dx = −sin x`.
- Chain: `dy/dx = cos u · (−sin x) = −sin x · cos(cos x)`.

**Đáp án**: `−sin x · cos(cos x)`.

Verify tại `x = 0`: `cos 0 = 1`, `sin(1) ≈ 0.8415`. Slope `= −sin 0 · cos(cos 0) = 0 · cos 1 = 0`. Số: tại `x = 0.001`, `y ≈ sin(cos(0.001)) ≈ sin(0.9999995) ≈ 0.84146`. Tại `x = 0`, `y = sin(1) ≈ 0.84147`. Hiệu rất nhỏ → slope ≈ 0 ✓ (cụ thể slope ≈ −0.0008 cho `h = 0.001`).

### Bài 6: Backprop NN 2 lớp

**Tham số**: `x = 0.5, target t = 0.2, W₁ = −0.3, b₁ = 0.1, W₂ = 1.2, b₂ = 0.05`.

**(a) Forward pass**:

| Biến | Công thức | Tính |
|------|-----------|------|
| `z₁` | `W₁ x + b₁` | `−0.3 · 0.5 + 0.1 = −0.15 + 0.1 = −0.05` |
| `a₁` | `σ(z₁) = 1/(1+e^0.05)` | `1/(1 + 1.0513) ≈ 1/2.0513 ≈ 0.4875` |
| `z₂` | `W₂ a₁ + b₂` | `1.2 · 0.4875 + 0.05 = 0.5850 + 0.05 = 0.6350` |
| `y`  | `z₂` | `0.6350` |
| `L`  | `(y − t)²` | `(0.6350 − 0.2)² = 0.4350² ≈ 0.1892` |

**(b) Backward pass**:

| Biến | Công thức | Tính |
|------|-----------|------|
| `δ_y` | `2(y − t)` | `2 · 0.4350 = 0.8700` |
| `δ_{z₂}` | `δ_y · 1` | `0.8700` |
| `∂L/∂W₂` | `δ_{z₂} · a₁` | `0.8700 · 0.4875 ≈ 0.4241` |
| `∂L/∂b₂` | `δ_{z₂}` | `0.8700` |
| `δ_{a₁}` | `δ_{z₂} · W₂` | `0.8700 · 1.2 = 1.0440` |
| `σ'(z₁)` | `a₁(1−a₁)` | `0.4875 · 0.5125 ≈ 0.2498` |
| `δ_{z₁}` | `δ_{a₁} · σ'(z₁)` | `1.0440 · 0.2498 ≈ 0.2608` |
| `∂L/∂W₁` | `δ_{z₁} · x` | `0.2608 · 0.5 ≈ 0.1304` |
| `∂L/∂b₁` | `δ_{z₁}` | `0.2608` |

**(c) Cập nhật với `η = 0.5`**:

```
W₁ ← −0.3 − 0.5 · 0.1304 = −0.3 − 0.0652 = −0.3652
b₁ ←  0.1 − 0.5 · 0.2608 =  0.1 − 0.1304 = −0.0304
W₂ ←  1.2 − 0.5 · 0.4241 =  1.2 − 0.2120 =  0.9880
b₂ ← 0.05 − 0.5 · 0.8700 = 0.05 − 0.4350 = −0.3850
```

**Forward lại để verify loss giảm**:

| Biến | Tính |
|------|------|
| `z₁` | `−0.3652 · 0.5 + (−0.0304) = −0.1826 − 0.0304 = −0.2130` |
| `a₁` | `σ(−0.2130) = 1/(1 + e^0.2130) = 1/(1 + 1.2374) ≈ 0.4470` |
| `z₂` | `0.9880 · 0.4470 + (−0.3850) = 0.4417 − 0.3850 = 0.0567` |
| `y`  | `0.0567` |
| `L`  | `(0.0567 − 0.2)² = (−0.1433)² ≈ 0.0205` |

Loss `0.1892 → 0.0205`, giảm ~9 lần sau 1 step. ✓ Gradient descent hoạt động.

### 📝 Tóm tắt phần bài tập

- Quy trình áp chain rule luôn giống nhau: tách lớp, tính từng đạo hàm, nhân.
- Bài 4 cho thấy 2 hàm quen thuộc trong ML (softplus, sigmoid) liên hệ qua đạo hàm.
- Bài 6 cho thấy backprop từ A-Z: forward → backward → cập nhật → verify. **Đây là 1 step training NN.**

---

## 9. Liên hệ thực tế và preview các tầng sau

### 9.1. Trong PyTorch (preview Tầng 6)

```python
import torch

# Cùng setup bài 6
x = torch.tensor(0.5)
t = torch.tensor(0.2)
W1 = torch.tensor(-0.3, requires_grad=True)
b1 = torch.tensor(0.1, requires_grad=True)
W2 = torch.tensor(1.2, requires_grad=True)
b2 = torch.tensor(0.05, requires_grad=True)

# Forward
z1 = W1 * x + b1
a1 = torch.sigmoid(z1)
z2 = W2 * a1 + b2
y = z2
L = (y - t) ** 2

# Backward
L.backward()
print(W1.grad)  # ≈ 0.1304 — khớp với tính tay ở Bài 6!
```

PyTorch chạy đúng các bước chain rule chúng ta đã tính tay. Không có phép màu.

### 9.2. Sẽ gặp lại ở các tầng sau

- **Tầng 4 — Linear Algebra**: chain rule cho hàm vector → ma trận. Công thức trở thành: `∂L/∂W = δ · aᵀ`, `δ_{prev} = Wᵀ δ`. Cùng nguyên lý.
- **Tầng 5 — Probability**: gradient của log-likelihood (MLE) tính bằng chain rule. Cross-entropy + softmax có đạo hàm đẹp gọn `y − target` — kết quả từ chain rule.
- **Tầng 6 — AI/ML**:
  - Build NN nhỏ from scratch — tự code backprop bằng Go/Python.
  - Embedding training (word2vec, CLIP) — chain rule trên loss `−log σ(x · y)`.
  - Transformer attention — chain rule qua softmax, multi-head, layer norm.

Hiểu chắc chain rule = hiểu mọi training algorithm sẽ gặp.

### 9.3. Vanishing / Exploding gradient — preview

NN sâu `n` lớp, chain rule cho `∂L/∂W_1` chứa **tích `n` đạo hàm**:

```
∂L/∂W_1 = δ_y · W_n · σ'(z_{n-1}) · W_{n-1} · σ'(z_{n-2}) · ... · σ'(z_1) · x
```

Với sigmoid, `σ'(z) ≤ 0.25` (max tại `z = 0`). Tích `n` thừa số `≤ 0.25` → cực nhỏ khi `n` lớn → **vanishing gradient**. Đây là lý do sigmoid bị thay bằng ReLU/GELU trong NN sâu hiện đại.

Ngược lại, nếu `|W_k|` lớn, tích phồng lên → **exploding gradient**. Giải pháp: gradient clipping, careful initialization.

Cả 2 vấn đề **trực tiếp đến từ tính chất nhân của chain rule**.

---

## Tham khảo và liên kết

- **Bài trước**: [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — Sum, product, quotient rule và đạo hàm hàm sơ cấp.
- **Bài tiếp**: [Lesson 05 — Cực trị 1 biến](../lesson-05-optimization-1d/) — Tìm `f'(x) = 0`, ứng dụng minimize loss.
- **Sẽ học kỹ ở Tầng 6**: backprop với ma trận, autograd implementation, transformer training.
- **Algebra L05 (composition)**: [`../../Algebra/lesson-05-functions/`](../../Algebra/lesson-05-functions/).

---

## Visualization

Mở [`./visualization.html`](./visualization.html) để xem 4 component tương tác:

1. **Composition visualizer** — chọn f, g, kéo slider x, thấy `x → f(x) → g(f(x))` và đạo hàm tổng.
2. **Step-by-step chain rule** — input expression, break thành các lớp, đạo hàm từng lớp.
3. **Backprop demo** — NN 2 lớp, slider tham số, animation gradient flow ngược.
4. **Multi-layer chain** — chain 3-5 hàm, đạo hàm = tích các đạo hàm con, thấy vanishing/exploding bằng số.
