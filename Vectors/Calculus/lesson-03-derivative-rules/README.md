# Lesson 03 — Quy tắc đạo hàm (Derivative Rules)

> **Tầng 3 — Calculus** · Bài 03/08
> Prerequisite: [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/)
> Tiếp theo: [Lesson 04 — Chain rule](../lesson-04-chain-rule/)

## Mục tiêu học tập

Sau bài này bạn có thể:

1. **Tính đạo hàm "bằng quy tắc"** mà không cần quay lại định nghĩa giới hạn — nhanh hơn 10-100 lần.
2. **Áp dụng 4 quy tắc tổ hợp**: tổng, hằng nhân, tích, thương — biết khi nào dùng cái nào.
3. **Power rule mở rộng** cho mọi số mũ thực (kể cả `√x`, `1/x`, `x^π`).
4. **Đạo hàm hàm sơ cấp**: `a^x`, `log_b x`, đầy đủ 6 hàm lượng giác (sin, cos, tan, cot, sec, csc).
5. **Đạo hàm hàm ngược**: arcsin, arccos, arctan.
6. **Verify "trick đẹp" của sigmoid**: `σ'(x) = σ(x)(1 − σ(x))` — công thức gặp hàng ngày trong backprop.

## Kiến thức tiền đề

- [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/): định nghĩa qua giới hạn, slope tiếp tuyến, đạo hàm `(x²)' = 2x`, `(sin x)' = cos x`.
- [Lesson 01 — Giới hạn](../lesson-01-limits/): các giới hạn đặc biệt `lim_{h→0} (sin h)/h = 1`, `lim_{h→0} (e^h − 1)/h = 1`.
- [Algebra Lesson 07 — Lũy thừa và log](../../Algebra/lesson-07-exponentials-logs/): tính chất `a^x = e^(x·ln a)`.
- [Trigonometry Lesson 04 — Trig graphs](../../Trigonometry/lesson-04-trig-graphs/): hình dạng sin, cos, tan.

## Bối cảnh — vì sao cần "quy tắc"?

Trong Lesson 02 ta đã tính `f'(x)` cho vài hàm bằng định nghĩa:

```
f'(x) = lim_{h→0} [f(x+h) − f(x)] / h
```

Cách này **đúng nhưng chậm và mỏi**. Thử tính đạo hàm của `f(x) = x² · sin x + (x+1)/(x²+1)` bằng định nghĩa giới hạn — bạn sẽ phải khai triển một biểu thức hàng chục dòng.

**Giải pháp**: nếu ta đã chứng minh sẵn `(x²)' = 2x`, `(sin x)' = cos x` cho **từng khối nhỏ**, rồi có **quy tắc** ghép chúng lại theo các phép tổ hợp (tổng, tích, thương, composition), thì:

- Tính đạo hàm của hàm phức tạp = tra bảng + áp quy tắc, mỗi bước cơ học.
- Không bao giờ cần quay lại định nghĩa giới hạn nữa (trừ khi muốn chứng minh quy tắc mới).

Bài này dạy đúng 4 quy tắc tổ hợp + đạo hàm chuẩn của các hàm sơ cấp. Bài sau (Lesson 04) dạy quy tắc thứ 5 và quan trọng nhất — **chain rule** cho composition.

> 💡 **Trực giác**: hãy nghĩ đạo hàm như **một phép biến đổi** trên hàm số. Ta có vài "công thức nguyên tử" (đạo hàm của `x^n`, `sin x`, `e^x`, ...) và vài "quy tắc lắp ráp" (cộng, nhân, chia, ghép). Mọi hàm sơ cấp đều ráp được từ các viên gạch đó → mọi đạo hàm cũng tính được cơ học.

---

## 1. Quy tắc tuyến tính (Sum rule + Constant multiple)

### 1.1 Phát biểu

Nếu `f(x)` và `g(x)` đều khả vi tại `x`, và `c` là hằng số, thì:

```
(f + g)'(x) = f'(x) + g'(x)        ← Sum rule
(c · f)'(x) = c · f'(x)            ← Constant multiple
```

Gộp hai cái lại được **quy tắc tuyến tính**:

```
(c₁ · f + c₂ · g)' = c₁ · f' + c₂ · g'
```

> 💡 **Trực giác**: nếu `f` đang tăng tốc `f'` và `g` đang tăng tốc `g'`, thì tổng `f+g` tăng tốc đúng bằng `f' + g'` — không có "tương tác chéo". Đây chính là tính chất **tuyến tính** mà Tầng 4 (Linear Algebra) sẽ định nghĩa chính thức: đạo hàm là một **toán tử tuyến tính**.

### 1.2 Chứng minh (sum rule)

Từ định nghĩa:

```
(f+g)'(x) = lim_{h→0} [(f+g)(x+h) − (f+g)(x)] / h
          = lim_{h→0} [(f(x+h) − f(x)) + (g(x+h) − g(x))] / h
          = lim_{h→0} (f(x+h) − f(x))/h + lim_{h→0} (g(x+h) − g(x))/h
          = f'(x) + g'(x)
```

Bước tách giới hạn dùng tính chất "giới hạn của tổng bằng tổng giới hạn" (Lesson 01, mục 4). Constant multiple chứng minh tương tự.

### 1.3 Walk-through 4 ví dụ

**Ví dụ 1**: `f(x) = 3x² + 5x`.
```
f'(x) = (3x²)' + (5x)' = 3·(x²)' + 5·(x)' = 3·2x + 5·1 = 6x + 5
```

**Ví dụ 2**: `f(x) = 4 sin x − 2 cos x + 7`.
```
f'(x) = 4·(sin x)' − 2·(cos x)' + (7)'
      = 4·cos x − 2·(−sin x) + 0
      = 4 cos x + 2 sin x
```

**Ví dụ 3**: `f(x) = x³ − 6x² + 11x − 6`.
```
f'(x) = 3x² − 12x + 11
```

**Ví dụ 4**: `f(x) = (1/2)x⁴ + 7e^x`.
```
f'(x) = (1/2)·4x³ + 7·e^x = 2x³ + 7e^x
```

> ⚠ **Lỗi thường gặp**:
> - `(c)' = 0` (hằng số có đạo hàm bằng 0) chứ KHÔNG phải `c`. Vd `(7)' = 0`, không phải `7`.
> - Đừng quên dấu trừ trước `cos x` khi viết `(cos x)' = −sin x`.

> 🔁 **Tự kiểm tra**: Tính `f'(x)` cho `f(x) = 5x³ − 4 sin x`.
> <details><summary>Đáp án</summary>
> `15x² − 4 cos x`.
> </details>

---

## 2. Power rule cho số mũ nguyên dương

Đã chứng minh trong Lesson 02 cho `n = 2`. Tổng quát:

```
(x^n)' = n · x^(n−1)        với n ∈ ℕ
```

Chứng minh bằng nhị thức Newton (Lesson 02 đã làm cho n=2 và sketch cho n tổng quát). Kết quả áp dụng cho mọi số tự nhiên `n ≥ 1`:

| n | `x^n` | `(x^n)'` |
|---|-------|----------|
| 1 | x     | 1        |
| 2 | x²    | 2x       |
| 3 | x³    | 3x²      |
| 4 | x⁴    | 4x³      |
| 5 | x⁵    | 5x⁴      |
| 10 | x¹⁰  | 10 x⁹    |

Mục 6 sẽ mở rộng cho mọi `n ∈ ℝ` (kể cả `−2`, `1/2`, `π`).

---

## 3. Product rule (Quy tắc tích)

### 3.1 Phát biểu

```
(f · g)'(x) = f'(x) · g(x) + f(x) · g'(x)
```

Hoặc viết tắt: `(fg)' = f'g + fg'`.

> 💡 **Trực giác**: tưởng tượng `f` là chiều dài, `g` là chiều rộng của hình chữ nhật — diện tích `S = f·g`. Khi `x` tăng một chút, chiều dài tăng `f'·Δx`, chiều rộng tăng `g'·Δx`. Diện tích thêm vào ≈ "một lớp dài viền dưới" (`f' · Δx · g`) + "một lớp viền cạnh" (`f · g' · Δx`) + một góc nhỏ vô cùng bé (`f' · g' · (Δx)²`). Khi `Δx → 0`, góc nhỏ biến mất, để lại đúng `f'g + fg'`.

### 3.2 Chứng minh từ định nghĩa

```
(fg)'(x) = lim_{h→0} [f(x+h)g(x+h) − f(x)g(x)] / h
```

**Mẹo**: cộng và trừ `f(x+h)·g(x)` để tách tử số.

```
f(x+h)g(x+h) − f(x)g(x)
  = f(x+h)g(x+h) − f(x+h)g(x) + f(x+h)g(x) − f(x)g(x)
  = f(x+h)·[g(x+h) − g(x)] + g(x)·[f(x+h) − f(x)]
```

Chia cho `h`:
```
= f(x+h) · [g(x+h) − g(x)]/h + g(x) · [f(x+h) − f(x)]/h
```

Cho `h → 0`:
- `f(x+h) → f(x)` (vì `f` liên tục — khả vi suy ra liên tục).
- `[g(x+h) − g(x)]/h → g'(x)`.
- `[f(x+h) − f(x)]/h → f'(x)`.

Vậy: `(fg)'(x) = f(x) · g'(x) + g(x) · f'(x) = f'g + fg'`. ✓

### 3.3 Walk-through 4 ví dụ

**Ví dụ 1**: `f(x) = x² · sin x`.

Đặt `u = x²` (→ `u' = 2x`) và `v = sin x` (→ `v' = cos x`).
```
(u·v)' = u'·v + u·v' = 2x · sin x + x² · cos x
```

**Ví dụ 2**: `f(x) = e^x · x³`.

`u = e^x` (`u' = e^x`), `v = x³` (`v' = 3x²`).
```
f'(x) = e^x · x³ + e^x · 3x² = e^x · (x³ + 3x²) = x²·e^x·(x + 3)
```

**Ví dụ 3**: `f(x) = x · ln x`.

`u = x` (`u' = 1`), `v = ln x` (`v' = 1/x`).
```
f'(x) = 1 · ln x + x · (1/x) = ln x + 1
```

**Ví dụ 4**: `f(x) = (2x+1)(3x−2)`.

Hai cách:

**Cách A — product rule**: `u = 2x+1` (`u' = 2`), `v = 3x−2` (`v' = 3`).
```
f'(x) = 2·(3x−2) + (2x+1)·3 = 6x − 4 + 6x + 3 = 12x − 1
```

**Cách B — khai triển trước**: `f(x) = 6x² − 4x + 3x − 2 = 6x² − x − 2`.
```
f'(x) = 12x − 1  ✓
```

Hai cách cho cùng kết quả → product rule đúng.

### 3.4 Lỗi thường gặp: `(fg)' ≠ f'·g'`

Đây là **lỗi #1** của người mới. Verify bằng phản chứng:

Lấy `f = x²`, `g = x³`, vậy `f·g = x⁵`.

- **Đáp án đúng** (power rule): `(x⁵)' = 5x⁴`.
- **Đáp án sai** (`f'·g'`): `(x²)' · (x³)' = 2x · 3x² = 6x³` ≠ `5x⁴`.
- **Đáp án đúng** (product rule): `2x · x³ + x² · 3x² = 2x⁴ + 3x⁴ = 5x⁴` ✓.

> ⚠ **Quy tắc**: đạo hàm KHÔNG "phân phối qua phép nhân" như cách phép cộng phân phối. Phải luôn dùng product rule.

> ❓ **Câu hỏi tự nhiên**:
> - *"Có thể tổng quát product rule cho 3 hàm không?"* Có: `(fgh)' = f'gh + fg'h + fgh'`. Chứng minh: nhóm `(fg)·h` rồi áp product rule hai lần.
> - *"Sao công thức đối xứng giữa f và g mà không thay đổi gì?"* Vì phép nhân giao hoán: `f·g = g·f`, nên đạo hàm cũng phải đối xứng. Đó là cách kiểm tra nhanh khi quên dấu.

> 🔁 **Tự kiểm tra**: Tính `(x · cos x)'`.
> <details><summary>Đáp án</summary>
> `u = x, v = cos x`. `f'(x) = 1·cos x + x·(−sin x) = cos x − x sin x`.
> </details>

---

## 4. Quotient rule (Quy tắc thương)

### 4.1 Phát biểu

```
(f/g)'(x) = [f'(x)·g(x) − f(x)·g'(x)] / [g(x)]²
```

Tử số là `f'g − fg'` (chú ý dấu trừ + thứ tự). Mẫu số là `g²`.

> 💡 **Trực giác (mnemonic)**: "low D-high minus high D-low, over the square of what's below" — tử số: thấp (mẫu) nhân đạo hàm cao (tử) trừ cao nhân đạo hàm thấp, mẫu số là bình phương "ở dưới". (Một số sách viết ngược thứ tự `fg' − f'g` rồi đổi dấu — kết quả như nhau, miễn nhớ chính xác một dạng.)

### 4.2 Chứng minh ngắn (từ product rule)

Đặt `q(x) = f(x)/g(x)` ⇒ `f(x) = q(x) · g(x)`. Áp product rule cho vế phải:

```
f'(x) = q'(x)·g(x) + q(x)·g'(x)
      = q'(x)·g(x) + [f(x)/g(x)]·g'(x)
```

Giải `q'(x)`:
```
q'(x)·g(x) = f'(x) − f(x)·g'(x)/g(x)
q'(x) = [f'(x)·g(x) − f(x)·g'(x)] / [g(x)]²
```

### 4.3 Walk-through 4 ví dụ

**Ví dụ 1**: `f(x) = x / (x+1)`.

`u = x` (`u' = 1`), `v = x+1` (`v' = 1`).
```
f'(x) = [1·(x+1) − x·1] / (x+1)² = (x + 1 − x) / (x+1)² = 1/(x+1)²
```

**Ví dụ 2**: `f(x) = (x² + 1) / x`. (Có thể chia trước, nhưng làm bằng quotient rule để luyện.)

`u = x²+1` (`u' = 2x`), `v = x` (`v' = 1`).
```
f'(x) = [2x · x − (x²+1) · 1] / x² = (2x² − x² − 1) / x² = (x² − 1)/x²
```

Verify: `(x² + 1)/x = x + 1/x`. Đạo hàm: `1 − 1/x² = (x² − 1)/x²` ✓.

**Ví dụ 3**: `tan x = sin x / cos x`.

`u = sin x` (`u' = cos x`), `v = cos x` (`v' = −sin x`).
```
(tan x)' = [cos x · cos x − sin x · (−sin x)] / cos² x
         = (cos² x + sin² x) / cos² x
         = 1 / cos² x
         = sec² x
```

(Dùng identity `sin² + cos² = 1`.) Đây là cách chứng minh kinh điển `(tan x)' = sec² x`.

**Ví dụ 4**: `f(x) = (e^x) / (x² + 1)`.

`u = e^x` (`u' = e^x`), `v = x²+1` (`v' = 2x`).
```
f'(x) = [e^x · (x²+1) − e^x · 2x] / (x²+1)²
      = e^x · (x² − 2x + 1) / (x²+1)²
      = e^x · (x − 1)² / (x²+1)²
```

> ⚠ **Lỗi thường gặp**:
> - Quên bình phương mẫu số (viết `g` thay vì `g²`).
> - Đảo dấu trong tử số (viết `f·g' − f'·g`).
> - Mẹo nhớ: tử số `f/g` mở rộng đẹp nhất là **đạo hàm tử nhân mẫu trước**, rồi mới trừ.

> 🔁 **Tự kiểm tra**: Tính `(1/x)'` bằng quotient rule.
> <details><summary>Đáp án</summary>
> `u = 1, u' = 0, v = x, v' = 1`. `(1/x)' = (0·x − 1·1)/x² = −1/x²`. Khớp với power rule mở rộng (mục 6): `(x^(−1))' = −1·x^(−2) = −1/x²`. ✓
> </details>

---

## 5. Đạo hàm của nghịch đảo `1/g(x)`

Trường hợp đặc biệt của quotient rule với `f = 1`:

```
(1/g)' = (0·g − 1·g')/g² = −g'/g²
```

Vd: `(1/cos x)' = (sin x)/cos² x = sec x · tan x` (= `(sec x)'`, sẽ thấy ở mục 8).

---

## 6. Power rule mở rộng cho mũ thực

### 6.1 Phát biểu tổng quát

```
(x^n)' = n · x^(n−1)         với n ∈ ℝ, x > 0
```

(Khi `x ≤ 0` cần chú ý miền xác định: `√x` chỉ định nghĩa với `x ≥ 0`, `x^(1/3)` định nghĩa cả với `x < 0`, ...)

Chứng minh trường hợp tổng quát dùng identity `x^n = e^(n·ln x)` rồi áp chain rule (xem Lesson 04).

### 6.2 Walk-through 4 ví dụ với mũ "không nguyên dương"

**Ví dụ 1**: `f(x) = √x = x^(1/2)`.
```
f'(x) = (1/2) · x^(1/2 − 1) = (1/2) · x^(−1/2) = 1/(2√x)
```

Verify bằng định nghĩa (Lesson 02 mục 7) — kết quả giống nhau.

**Ví dụ 2**: `f(x) = 1/x² = x^(−2)`.
```
f'(x) = −2 · x^(−3) = −2/x³
```

**Ví dụ 3**: `f(x) = x^(2/3)` (căn bậc 3 của bình phương).
```
f'(x) = (2/3) · x^(−1/3) = 2/(3·∛x)
```

**Ví dụ 4**: `f(x) = x^π` (mũ là số vô tỉ).
```
f'(x) = π · x^(π−1)
```

Số mũ không cần là số nguyên hay phân số — công thức vẫn đúng.

> ❓ **Câu hỏi tự nhiên**: *"Tại sao công thức cho `n` nguyên dương lại đúng cả khi `n` âm hoặc thực?"*
>
> **Trả lời**: Vì cách định nghĩa lũy thừa với số mũ thực: `x^n = e^(n·ln x)`. Đạo hàm theo chain rule (Lesson 04): `(e^(n ln x))' = e^(n ln x) · (n ln x)' = x^n · (n/x) = n·x^(n−1)`. Cùng một công thức cho mọi `n`.

### 6.3 Bảng đối chiếu

| Hàm                 | Viết dạng `x^n` | Đạo hàm                  |
|---------------------|-----------------|--------------------------|
| `√x`                | `x^(1/2)`       | `1/(2√x)`                |
| `∛x`                | `x^(1/3)`       | `1/(3·x^(2/3))`          |
| `1/x`               | `x^(−1)`        | `−1/x²`                  |
| `1/x²`              | `x^(−2)`        | `−2/x³`                  |
| `1/√x`              | `x^(−1/2)`      | `−1/(2·x^(3/2))`         |
| `x · √x = x^(3/2)`  | `x^(3/2)`       | `(3/2)·√x`               |

> 🔁 **Tự kiểm tra**: Tính `(1/√x)'`.
> <details><summary>Đáp án</summary>
> `(x^(−1/2))' = (−1/2)·x^(−3/2) = −1/(2·x^(3/2)) = −1/(2x√x)`.
> </details>

---

## 7. Đạo hàm của `a^x` và `log_b x`

### 7.1 Đạo hàm của `e^x`

Lesson 02 đã thừa nhận / chứng minh sơ lược: `(e^x)' = e^x`. Đây là **đặc trưng duy nhất** của hàm `e^x` — không hàm sơ cấp nào khác bằng đúng đạo hàm của chính nó (sai khác hằng số).

### 7.2 Đạo hàm của `a^x` (`a > 0`)

> 💡 **Trực giác**: `a^x` là hàm mũ tổng quát. Viết qua `e`: `a = e^(ln a)`, suy ra `a^x = (e^(ln a))^x = e^(x · ln a)`. Đặt `u = x·ln a` (`u' = ln a`), áp chain rule (Lesson 04):
> ```
> (a^x)' = e^u · u' = a^x · ln a
> ```

**Công thức**:
```
(a^x)' = a^x · ln a
```

Kiểm tra với `a = e`: `(e^x)' = e^x · ln e = e^x · 1 = e^x` ✓.

**Walk-through ví dụ**:

- `(2^x)' = 2^x · ln 2 ≈ 0.693 · 2^x`.
- `(10^x)' = 10^x · ln 10 ≈ 2.303 · 10^x`.
- `((1/2)^x)' = (1/2)^x · ln(1/2) = −(1/2)^x · ln 2` (đạo hàm âm — hàm giảm).

### 7.3 Đạo hàm của `ln x`

Đã thừa nhận (Lesson 02 mục 9): `(ln x)' = 1/x` với `x > 0`.

Chứng minh phác: `y = ln x ⇔ x = e^y`. Đạo hàm 2 vế theo `x`: `1 = e^y · y' = x · y'`. Suy ra `y' = 1/x`. (Phép "đạo hàm 2 vế" là **implicit differentiation** — sẽ gặp lại ở Lesson 06.)

### 7.4 Đạo hàm của `log_b x`

Đổi cơ số sang `ln`: `log_b x = ln x / ln b`. `ln b` là **hằng số**.
```
(log_b x)' = (1/ln b) · (ln x)' = 1/(x · ln b)
```

**Walk-through**:

- `(log₁₀ x)' = 1/(x · ln 10) ≈ 0.4343/x`.
- `(log₂ x)' = 1/(x · ln 2) ≈ 1.4427/x`.

> ⚠ **Lỗi thường gặp**: nhầm `(ln x)' = 1/x` (đúng) với `(log₁₀ x)' = 1/x` (SAI — phải có `ln 10` ở mẫu). Trong toán cao cấp và machine learning, **log mặc định = ln** (logarit tự nhiên), nên thường không thấy `ln b` xuất hiện. Nhưng nếu là `log₁₀` cụ thể thì không bỏ được hằng số.

> 🔁 **Tự kiểm tra**: Đạo hàm của `3^x` tại `x = 0` là bao nhiêu?
> <details><summary>Đáp án</summary>
> `(3^x)' = 3^x · ln 3`. Tại `x=0`: `3^0 · ln 3 = ln 3 ≈ 1.0986`.
> </details>

---

## 8. Đạo hàm đầy đủ của 6 hàm lượng giác

Đã biết `(sin x)' = cos x` và `(cos x)' = −sin x` (Lesson 02). Bốn hàm còn lại — `tan, cot, sec, csc` — đều suy ra qua quotient rule.

### 8.1 `(tan x)' = sec² x`

Đã chứng minh ở Ví dụ 3, mục 4.3. Tóm lại:
```
tan x = sin x / cos x
(tan x)' = (cos²x + sin²x)/cos²x = 1/cos²x = sec² x
```

### 8.2 `(cot x)' = −csc² x`

```
cot x = cos x / sin x
(cot x)' = [(−sin x)·sin x − cos x·cos x]/sin²x
         = −(sin²x + cos²x)/sin²x
         = −1/sin²x = −csc² x
```

### 8.3 `(sec x)' = sec x · tan x`

```
sec x = 1/cos x
(sec x)' = −(cos x)'/cos²x = −(−sin x)/cos²x = sin x / cos²x
         = (1/cos x)·(sin x / cos x) = sec x · tan x
```

### 8.4 `(csc x)' = −csc x · cot x`

Tương tự:
```
csc x = 1/sin x
(csc x)' = −(cos x)/sin²x = −(1/sin x)·(cos x / sin x) = −csc x · cot x
```

### 8.5 Bảng tổng kết 6 hàm trig

| Hàm        | Đạo hàm           |
|------------|-------------------|
| `sin x`    | `cos x`           |
| `cos x`    | `−sin x`          |
| `tan x`    | `sec² x`          |
| `cot x`    | `−csc² x`         |
| `sec x`    | `sec x · tan x`   |
| `csc x`    | `−csc x · cot x`  |

> 💡 **Mẹo nhớ**: 3 hàm bắt đầu bằng "co-" (`cos`, `cot`, `csc`) đều có **dấu trừ** trong đạo hàm. 3 hàm còn lại dương. Cặp đối: `sin ↔ cos`, `tan ↔ cot`, `sec ↔ csc` — đạo hàm của hàm "co-" là đạo hàm của hàm gốc đổi dấu và đổi tên cặp.

> ❓ **Câu hỏi tự nhiên**: *"Tại sao `(tan x)' = sec² x` luôn dương?"*
>
> **Trả lời**: Vì `sec² x = 1/cos² x ≥ 1` (bằng 1 khi `cos x = ±1`). Vậy `tan` là hàm **luôn tăng** trên mỗi đoạn liên tục — khớp với hình dạng đồ thị tan trong Trigonometry Lesson 04 (luôn đi lên giữa hai tiệm cận).

---

## 9. Đạo hàm hàm ngược (Inverse function)

### 9.1 Công thức tổng quát

Nếu `f` khả vi và đơn ánh, có hàm ngược `f^(−1)`, thì:

```
(f^(−1))'(y) = 1 / f'(f^(−1)(y))
```

> 💡 **Trực giác**: nếu `f` "kéo dài" theo hệ số `f'(x)` tại điểm `x`, thì hàm ngược phải "co lại" theo cùng hệ số — nên đạo hàm hàm ngược là **nghịch đảo** của đạo hàm hàm gốc, lấy ở **điểm tương ứng**.

Chứng minh ngắn: `f(f^(−1)(y)) = y`. Đạo hàm 2 vế theo `y`, áp chain rule:
```
f'(f^(−1)(y)) · (f^(−1))'(y) = 1
⇒ (f^(−1))'(y) = 1/f'(f^(−1)(y))
```

### 9.2 Ví dụ: `(arcsin)'(x)`

`f(x) = sin x` trên `[−π/2, π/2]`, hàm ngược `f^(−1)(y) = arcsin y`. Ta có `f'(x) = cos x`.

```
(arcsin)'(y) = 1/cos(arcsin y)
```

Tính `cos(arcsin y)`: đặt `θ = arcsin y` ⇒ `sin θ = y`. Vẽ tam giác vuông với cạnh đối `y`, huyền `1` ⇒ cạnh kề `√(1−y²)`. Suy ra `cos θ = √(1−y²)`.

```
(arcsin)'(y) = 1/√(1 − y²)            (|y| < 1)
```

Đổi biến `y → x`: `(arcsin x)' = 1/√(1 − x²)`.

### 9.3 Ví dụ: `(arctan)'(x)`

`f(x) = tan x`, `f'(x) = sec² x = 1 + tan² x`. Đặt `θ = arctan y` ⇒ `tan θ = y` ⇒ `f'(θ) = 1 + y²`.

```
(arctan)'(y) = 1/(1 + y²)
```

Hay: `(arctan x)' = 1/(1 + x²)`.

### 9.4 Bảng đạo hàm hàm trig ngược

| Hàm                 | Đạo hàm               | Miền          |
|---------------------|-----------------------|---------------|
| `arcsin x`          | `1/√(1 − x²)`         | `|x| < 1`     |
| `arccos x`          | `−1/√(1 − x²)`        | `|x| < 1`     |
| `arctan x`          | `1/(1 + x²)`          | `ℝ`           |
| `arccot x`          | `−1/(1 + x²)`         | `ℝ`           |

> ⚠ **Lỗi thường gặp**: nhầm dấu giữa `arcsin` (dương) và `arccos` (âm). Lý do: `arccos x = π/2 − arcsin x`, lấy đạo hàm sẽ ra `0 − 1/√(1−x²) = −1/√(1−x²)`.

> 🔁 **Tự kiểm tra**: Tính `(arctan x)'` tại `x = 1`.
> <details><summary>Đáp án</summary>
> `1/(1 + 1²) = 1/2`.
> </details>

---

## 10. Ứng dụng ML/AI — Đạo hàm Sigmoid

### 10.1 Sigmoid là gì?

Trong machine learning, **hàm sigmoid** (logistic) định nghĩa:
```
σ(x) = 1 / (1 + e^(−x))
```

Tính chất:
- `σ(0) = 1/2`.
- `σ(x) → 1` khi `x → +∞`, `σ(x) → 0` khi `x → −∞`.
- Đồ thị hình chữ "S" — chuyển đổi mượt từ 0 sang 1, dùng để biểu diễn **xác suất**.

Sigmoid xuất hiện ở:
- **Logistic regression** — phân loại nhị phân.
- **Activation function** của neural network (ngày xưa rất phổ biến, hiện nay ít dùng cho hidden layer nhưng vẫn dùng cho output layer khi cần xác suất).
- **Attention gating** trong các kiến trúc như LSTM, GRU.

### 10.2 Đạo hàm có "trick đẹp"

Áp công thức `(1/g)' = −g'/g²` với `g(x) = 1 + e^(−x)`:

- `g'(x) = (1)' + (e^(−x))' = 0 + e^(−x) · (−1) = −e^(−x)` (dùng chain rule sơ bộ với `−x`).
- `(σ)' = −g'/g² = −(−e^(−x)) / (1 + e^(−x))² = e^(−x) / (1 + e^(−x))²`.

Đến đây mới là "công thức thô". Trick đẹp: viết lại theo `σ`.

```
σ'(x) = e^(−x) / (1 + e^(−x))²
      = [1 / (1 + e^(−x))] · [e^(−x) / (1 + e^(−x))]
      = σ(x) · [e^(−x) / (1 + e^(−x))]
```

Phần thứ 2 = `1 − σ(x)`, vì:
```
1 − σ(x) = 1 − 1/(1 + e^(−x))
         = [(1 + e^(−x)) − 1] / (1 + e^(−x))
         = e^(−x) / (1 + e^(−x))
```

**Kết luận**:
```
σ'(x) = σ(x) · (1 − σ(x))
```

### 10.3 Verify bằng số cụ thể

| x      | `σ(x)`      | `1 − σ(x)`  | `σ(x)·(1−σ(x))` | `σ'(x)` "thô" `e^(−x)/(1+e^(−x))²` |
|--------|-------------|-------------|------------------|-----------------------------------|
| `−2`   | `0.1192`    | `0.8808`    | `0.1050`         | `e²/(1+e²)² = 7.389/70.69 ≈ 0.1050` ✓ |
| `0`    | `0.5`       | `0.5`       | `0.25`           | `1/(2)² = 0.25` ✓                 |
| `1`    | `0.7311`    | `0.2689`    | `0.1966`         | `e^(−1)/(1+e^(−1))² ≈ 0.3679/1.871 ≈ 0.1966` ✓ |
| `3`    | `0.9526`    | `0.0474`    | `0.0451`         | `e^(−3)/(1+e^(−3))² ≈ 0.0498/1.103 ≈ 0.0451` ✓ |

Hai cột cuối khớp tới 4 chữ số thập phân → công thức `σ' = σ(1−σ)` đúng.

### 10.4 Vì sao "trick đẹp" này quan trọng?

Khi train neural network bằng **backpropagation** (Lesson 04 + 07 sẽ học chi tiết), ta cần đạo hàm của activation function tại mỗi nơron. Nếu activation là sigmoid:

- **Forward pass**: tính `a = σ(z)`, lưu lại `a`.
- **Backward pass**: cần `σ'(z)` — thay vì tính lại `e^(−z)/(1+e^(−z))²` (đắt vì có exp), ta dùng giá trị `a` đã có: `σ'(z) = a · (1 − a)`. **Chỉ 1 phép nhân và 1 phép trừ.**

Đây là một trong những lý do sigmoid (và cả `tanh`) phổ biến thời kỳ đầu của deep learning. **ReLU** sau này thậm chí còn rẻ hơn (đạo hàm = 0 hoặc 1), nhưng "trick đẹp" của sigmoid vẫn rất kinh điển và đáng học vì nó cho thấy: chọn **biểu diễn hàm hợp lý** có thể biến đạo hàm phức tạp thành công thức 2 phép toán.

> ❓ **Câu hỏi tự nhiên**:
> - *"`σ'(x)` lớn nhất tại đâu?"* Vì `σ'(x) = σ(1−σ)` là parabola theo `σ`, đạt max tại `σ = 1/2`, tức tại `x = 0`. Max bằng `1/4 = 0.25`.
> - *"Tại sao đạo hàm bé khi `|x|` lớn?"* Vì khi đó `σ ≈ 0` hoặc `σ ≈ 1`, tích `σ(1−σ) ≈ 0`. Hệ quả thực tế: gradient gần như tắt — đây là **vanishing gradient problem** mà neural network sâu gặp phải khi dùng sigmoid → lý do ReLU thắng thế.

---

## 📝 Tóm tắt lý thuyết

### Bảng quy tắc tổ hợp

| Tên           | Công thức                                            |
|---------------|------------------------------------------------------|
| Sum           | `(f + g)' = f' + g'`                                 |
| Constant      | `(c·f)' = c·f'`                                      |
| Product       | `(fg)' = f'g + fg'`                                  |
| Quotient      | `(f/g)' = (f'g − fg')/g²`                            |
| Reciprocal    | `(1/g)' = −g'/g²`                                    |

### Bảng đạo hàm hàm sơ cấp

| Hàm           | Đạo hàm                |
|---------------|------------------------|
| `c` (hằng)    | `0`                    |
| `x^n`         | `n·x^(n−1)`            |
| `e^x`         | `e^x`                  |
| `a^x`         | `a^x · ln a`           |
| `ln x`        | `1/x`                  |
| `log_b x`     | `1/(x · ln b)`         |
| `sin x`       | `cos x`                |
| `cos x`       | `−sin x`               |
| `tan x`       | `sec² x`               |
| `cot x`       | `−csc² x`              |
| `sec x`       | `sec x · tan x`        |
| `csc x`       | `−csc x · cot x`       |
| `arcsin x`    | `1/√(1−x²)`            |
| `arccos x`    | `−1/√(1−x²)`           |
| `arctan x`    | `1/(1+x²)`             |
| `σ(x)`        | `σ(x)·(1−σ(x))`        |

Hai bảng này + **chain rule** (Lesson 04) là đủ để đạo hàm mọi hàm sơ cấp trong machine learning.

---

## Bài tập

### Bài 1 (Linear + Power)
Tính đạo hàm: `f(x) = 4x⁵ − 3x³ + 2x − 7`.

### Bài 2 (Product rule)
Tính: `f(x) = x³ · cos x`.

### Bài 3 (Quotient rule)
Tính: `f(x) = (x² − 1)/(x² + 1)`. Sau đó tính `f'(0)`.

### Bài 4 (Power rule mở rộng)
Tính: `f(x) = √x + 1/x²`. Tính `f'(4)`.

### Bài 5 (Trig + log)
Tính: `f(x) = tan x · ln x` tại `x = π/4`.

### Bài 6 (Sigmoid verify)
Cho `σ(x) = 1/(1+e^(−x))`. Bằng product/quotient rule, chứng minh trực tiếp `σ'(0) = 1/4` mà không dùng công thức `σ(1−σ)`.

---

## Lời giải chi tiết

### Bài 1

`f(x) = 4x⁵ − 3x³ + 2x − 7`. Áp linear + power rule:
```
f'(x) = 4·5x⁴ − 3·3x² + 2·1 − 0 = 20x⁴ − 9x² + 2
```

### Bài 2

`f(x) = x³ · cos x`. Đặt `u = x³` (`u' = 3x²`), `v = cos x` (`v' = −sin x`).
```
f'(x) = u'v + uv' = 3x² · cos x + x³ · (−sin x) = 3x² cos x − x³ sin x
```

### Bài 3

`f(x) = (x² − 1)/(x² + 1)`. `u = x²−1` (`u' = 2x`), `v = x²+1` (`v' = 2x`).
```
f'(x) = [2x · (x²+1) − (x²−1) · 2x] / (x²+1)²
      = 2x · [(x²+1) − (x²−1)] / (x²+1)²
      = 2x · 2 / (x²+1)²
      = 4x / (x²+1)²
```
Tại `x = 0`: `f'(0) = 0`. (Hợp lý: `f` là hàm chẵn, đạt min tại 0.)

### Bài 4

`f(x) = x^(1/2) + x^(−2)`. Linear + power rule:
```
f'(x) = (1/2)·x^(−1/2) + (−2)·x^(−3) = 1/(2√x) − 2/x³
```
Tại `x = 4`:
```
f'(4) = 1/(2·2) − 2/64 = 1/4 − 1/32 = 8/32 − 1/32 = 7/32 = 0.21875
```

### Bài 5

`f(x) = tan x · ln x`. Product rule: `u = tan x` (`u' = sec² x`), `v = ln x` (`v' = 1/x`).
```
f'(x) = sec² x · ln x + tan x · (1/x)
```
Tại `x = π/4`:
- `tan(π/4) = 1`, `sec²(π/4) = 1/cos²(π/4) = 1/(1/2) = 2`.
- `ln(π/4) ≈ ln(0.7854) ≈ −0.2416`.
- `1/x = 4/π ≈ 1.2732`.
```
f'(π/4) ≈ 2·(−0.2416) + 1·1.2732 ≈ −0.4832 + 1.2732 ≈ 0.7900
```

### Bài 6

`σ(x) = 1/(1 + e^(−x))`. Đặt `g(x) = 1 + e^(−x)`, vậy `g'(x) = −e^(−x)` (sẽ verify sau bằng chain rule, ở đây ta thừa nhận đạo hàm của `e^(−x)` là `−e^(−x)`).

Áp `(1/g)' = −g'/g²`:
```
σ'(x) = −(−e^(−x)) / (1 + e^(−x))² = e^(−x) / (1 + e^(−x))²
```
Tại `x = 0`: `e^0 = 1`, `(1 + 1)² = 4`.
```
σ'(0) = 1/4 ✓
```

Kết quả khớp với công thức trick đẹp: `σ(0)·(1−σ(0)) = (1/2)·(1/2) = 1/4`.

---

## Liên kết

- ⬅ Lesson trước: [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/)
- ➡ Lesson tiếp theo: [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — quy tắc đạo hàm cho composition `f(g(x))`, **chìa khóa của backpropagation**.
- 🔗 Liên quan:
  - [Algebra Lesson 07 — Lũy thừa và log](../../Algebra/lesson-07-exponentials-logs/)
  - [Trigonometry Lesson 04 — Trig graphs](../../Trigonometry/lesson-04-trig-graphs/)
  - [Trigonometry Lesson 05 — Identities](../../Trigonometry/lesson-05-identities-cosine-law/) — định lý Pythagore `sin² + cos² = 1` dùng trong chứng minh `(tan)' = sec²`.
- 🔭 Sẽ gặp lại:
  - Lesson 04 — chain rule + đạo hàm sigmoid bằng cách dùng chain trên `e^(−x)`.
  - Lesson 07 — gradient descent + backprop — dùng đạo hàm sigmoid `σ(1−σ)` ngay trong vòng lặp huấn luyện.
  - Tầng 5 — Probability: hàm logistic xuất hiện trong cross-entropy loss và logistic regression.
  - Tầng 6 — AI/ML: sigmoid trong attention gating của RNN/LSTM, output của classifier nhị phân.

[▶ Mở visualization](./visualization.html)
