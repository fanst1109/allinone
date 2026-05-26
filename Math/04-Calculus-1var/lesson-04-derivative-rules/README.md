# Lesson 04 — Quy tắc đạo hàm

## Mục tiêu

- Thuộc **bảng đạo hàm cơ bản** (x^n, sin, cos, e^x, ln x, ...).
- Áp dụng **5 quy tắc đại số**: hằng nhân, tổng/hiệu, tích, thương, chuỗi.
- Đặc biệt: **Quy tắc chuỗi** (chain rule) — quan trọng nhất Calculus.
- Đạo hàm **hàm hợp** và **hàm ngược**.

## Kiến thức tiền đề

- [Lesson 03 — Định nghĩa đạo hàm](../lesson-03-derivative-definition/).

---

## 1. Bảng đạo hàm cơ bản

| f(x) | f'(x) | Ghi chú |
|------|-------|---------|
| c (hằng) | 0 | |
| x | 1 | |
| x^n | n·x^(n-1) | n bất kỳ thực |
| √x | 1/(2√x) | = (1/2)·x^(-1/2) |
| 1/x | -1/x² | |
| e^x | e^x | đẹp nhất! |
| a^x | a^x · ln a | |
| ln x | 1/x | |
| log_a x | 1/(x·ln a) | |
| sin x | cos x | |
| cos x | -sin x | |
| tan x | 1/cos²x = sec²x | |
| cot x | -1/sin²x | |
| arcsin x | 1/√(1-x²) | -1<x<1 |
| arccos x | -1/√(1-x²) | |
| arctan x | 1/(1+x²) | |

💡 **Phải thuộc**. Có thể chứng minh từ định nghĩa, nhưng dùng nhiều thì nhớ.

---

## 2. Năm quy tắc đại số

### 2.1. Hằng nhân
```
(c·f)' = c·f'
```
**Ví dụ**: (5x³)' = 5·(x³)' = 5·3x² = 15x².

### 2.2. Tổng / hiệu
```
(f ± g)' = f' ± g'
```
**Ví dụ**: (x² + sin x)' = 2x + cos x.

### 2.3. Tích (Product rule)
```
(f·g)' = f'·g + f·g'
```

💡 **Vì sao**: Khai triển định nghĩa, một phần tăng do f tăng, phần kia do g tăng.

**Ví dụ**: (x²·sin x)' = 2x·sin x + x²·cos x.

⚠ **Lỗi thường gặp**: (f·g)' ≠ f'·g'. Đây không phải lũy thừa.

### 2.4. Thương (Quotient rule)
```
(f/g)' = (f'·g - f·g') / g²
```

**Mẹo nhớ "low-d-high - high-d-low" / "square the low"**:
- Mẫu × đạo hàm tử − tử × đạo hàm mẫu, tất cả chia cho mẫu bình phương.

**Ví dụ**: (sin x / x)' = (cos x · x - sin x · 1) / x² = (x·cos x - sin x) / x².

### 2.5. Chuỗi (Chain rule) — QUAN TRỌNG NHẤT

```
(f(g(x)))' = f'(g(x)) · g'(x)
```

💡 **Trực giác**: Hàm trong hàm. Đạo hàm = (đạo hàm ngoài tại g(x)) × (đạo hàm trong).

**Ví dụ 1**: y = sin(x²).
- f(u) = sin u, g(x) = x².
- y' = cos(x²) · 2x.

**Ví dụ 2**: y = e^(3x+1).
- f(u) = e^u, g = 3x+1.
- y' = e^(3x+1) · 3.

**Ví dụ 3** (hợp 3 lớp): y = ln(sin(x²)).
- y' = (1/sin(x²)) · cos(x²) · 2x = 2x·cos(x²)/sin(x²) = 2x·cot(x²).

⟶ **Quy tắc**: từ ngoài vào trong, mỗi lớp nhân thêm đạo hàm.

---

## 3. Đạo hàm hàm ngược

Nếu y = f(x) và x = f^(-1)(y), thì:
```
(f^(-1))'(y) = 1 / f'(x)
```

💡 **Hệ quả**: Đồ thị y = f(x) và y = f^(-1)(x) đối xứng qua y = x → slope nghịch đảo nhau.

**Ví dụ**: Chứng minh (arcsin x)' = 1/√(1-x²).
- y = arcsin x ⟺ x = sin y.
- (sin y)' theo y = cos y.
- → (arcsin)' = 1/cos y = 1/√(1-sin²y) = **1/√(1-x²)** ✓.

---

## 4. Đạo hàm bậc cao

f''(x) = (f'(x))'. Đạo hàm của đạo hàm.

**Ví dụ**: f(x) = x⁴.
- f'(x) = 4x³.
- f''(x) = 12x².
- f'''(x) = 24x.
- f⁽⁴⁾(x) = 24.
- f⁽⁵⁾(x) = 0.

**Ý nghĩa vật lý**:
- s(t) = vị trí.
- v(t) = s'(t) = vận tốc.
- a(t) = v'(t) = s''(t) = **gia tốc**.

---

## 5. Bài tập đa quy tắc

### Bài tập

**Bài 1**: Tính đạo hàm của f(x) = (x² + 1)·cos x.

**Bài 2**: Tính (e^(2x)·sin x)'.

**Bài 3**: Tính đạo hàm của f(x) = (x² + 1) / (x - 3).

**Bài 4**: Tính (sin(cos(x²)))'.

**Bài 5**: Tính f''(x) khi f(x) = e^(2x)·x.

### Lời giải

**Bài 1**: Tích: (2x)·cos x + (x²+1)·(-sin x) = **2x·cos x - (x²+1)·sin x**.

**Bài 2**: Tích + chuỗi: (e^(2x))' = 2e^(2x). f' = 2e^(2x)·sin x + e^(2x)·cos x = **e^(2x)·(2sin x + cos x)**.

**Bài 3**: Thương: f' = [(2x)·(x-3) - (x²+1)·1] / (x-3)² = (2x² - 6x - x² - 1)/(x-3)² = **(x² - 6x - 1)/(x-3)²**.

**Bài 4**: 3 lớp:  
- Lớp ngoài: sin(u) → cos(u).  
- Lớp giữa: cos(v) → -sin(v).  
- Lớp trong: x² → 2x.  
- Kết quả: **cos(cos(x²)) · (-sin(x²)) · 2x = -2x·sin(x²)·cos(cos(x²))**.

**Bài 5**: f' = 2e^(2x)·x + e^(2x)·1 = e^(2x)·(2x+1).  
- f'' = (e^(2x)·(2x+1))' = 2e^(2x)·(2x+1) + e^(2x)·2 = **e^(2x)·(4x + 4) = 4e^(2x)·(x+1)**.

---

## 6. Bài tiếp theo

[Lesson 05 — Ứng dụng đạo hàm](../lesson-05-derivative-applications/).

## 📝 Tổng kết

1. **Bảng đạo hàm**: thuộc x^n, e^x, ln, sin/cos/tan, arcsin/arctan.
2. **5 quy tắc**: hằng nhân, tổng, **tích f'g+fg'**, **thương (f'g-fg')/g²**, **chuỗi f'(g)·g'**.
3. **Chain rule** quan trọng nhất — từ ngoài vào trong, mỗi lớp nhân đạo hàm.
4. **Hàm ngược**: (f⁻¹)' = 1/f'.
5. **Đạo hàm bậc cao**: f'' = vận tốc đổi (= gia tốc).
