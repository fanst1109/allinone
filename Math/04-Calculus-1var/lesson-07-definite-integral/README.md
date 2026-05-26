# Lesson 07 — Tích phân xác định

## Mục tiêu

- Hiểu **tích phân xác định** ∫_a^b f(x) dx như diện tích dưới đồ thị.
- Định nghĩa qua **tổng Riemann**.
- **Định lý cơ bản giải tích** (FTC) — kết nối đạo hàm và tích phân.
- Tính chất của tích phân xác định.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

---

## 1. Vấn đề diện tích

💡 **Câu hỏi**: Diện tích hình giới hạn bởi y = x², trục Ox, và 2 đường thẳng x = 0, x = 1 là bao nhiêu?

Đây là hình **cong** — không có công thức diện tích thẳng. Phải dùng tích phân.

---

## 2. Tổng Riemann — Định nghĩa tích phân

💡 **Ý tưởng**: Chia khoảng [a, b] thành n đoạn nhỏ, mỗi đoạn rộng Δx = (b-a)/n. Trên mỗi đoạn, **xấp xỉ diện tích bằng hình chữ nhật** chiều cao f(x_i).

```
Tổng Riemann: S_n = Σ_{i=1}^n f(x_i) · Δx
```

Khi n → ∞ (mảnh càng mỏng), tổng → diện tích thật.

```
∫_a^b f(x) dx = lim_{n→∞} Σ f(x_i) · Δx
```

### Ví dụ số: ∫_0^1 x² dx

Chia [0, 1] thành n đoạn, dùng cận phải. x_i = i/n, Δx = 1/n.

```
S_n = Σ_{i=1}^n (i/n)² · (1/n) = (1/n³)·Σ i²
```

Dùng công thức Σ i² = n(n+1)(2n+1)/6:
```
S_n = n(n+1)(2n+1)/(6n³) = (1 + 1/n)(2 + 1/n)/6
```

Khi n → ∞: S_n → (1·2)/6 = **1/3**.

⟶ ∫_0^1 x² dx = **1/3**.

**Kiểm tra bằng số**:
- n=10: S ≈ 0.385.
- n=100: S ≈ 0.3383.
- n=1000: S ≈ 0.3338.
- → 1/3 ≈ 0.3333.

---

## 3. Định lý cơ bản giải tích (Fundamental Theorem of Calculus)

🎯 **Đây là định lý quan trọng nhất Calculus**, kết nối đạo hàm và tích phân.

### Phần 1 (FTC1)
Nếu f liên tục trên [a, b] và F(x) = ∫_a^x f(t) dt, thì **F'(x) = f(x)**.

💡 Đọc: "Đạo hàm của tích phân = chính hàm". Đạo hàm và tích phân là **2 phép toán ngược nhau**.

### Phần 2 (FTC2) — Cách tính tích phân thực tế
Nếu F là **nguyên hàm** của f (F' = f), thì:
```
∫_a^b f(x) dx = F(b) - F(a)
```

Viết tắt: F(b) - F(a) thường ghi là [F(x)]_a^b hoặc F(x)|_a^b.

💡 **Quy trình tính tích phân**:
1. Tìm nguyên hàm F(x) (như L06).
2. Tính F(b) - F(a).

**Ví dụ**: ∫_0^1 x² dx.
- F(x) = x³/3 (1 nguyên hàm bất kỳ, không cần +C vì cancel khi trừ).
- F(1) - F(0) = 1/3 - 0 = **1/3** ✓.

Khớp với kết quả tổng Riemann!

---

## 4. Tính chất tích phân xác định

| Tính chất | Công thức |
|-----------|-----------|
| Hằng nhân | ∫ c·f dx = c·∫ f dx |
| Tổng | ∫ (f + g) dx = ∫ f dx + ∫ g dx |
| Cộng đoạn | ∫_a^b = ∫_a^c + ∫_c^b |
| Đảo cận | ∫_a^b = -∫_b^a |
| Trùng cận | ∫_a^a = 0 |
| Diện tích âm | f < 0 → tích phân âm |

⚠ **Tích phân có thể âm**: ∫_a^b f dx **không phải lúc nào cũng = diện tích**. Là **diện tích đại số** — phần trên Ox cộng, phần dưới trừ.

**Ví dụ**: ∫_0^{2π} sin x dx = [-cos x]_0^{2π} = -cos(2π) + cos(0) = -1 + 1 = **0**. (Phần dương từ 0-π và phần âm từ π-2π triệt tiêu nhau.)

Nếu muốn **diện tích thật**: ∫_0^{2π} |sin x| dx = 4.

---

## 5. Đổi biến trong tích phân xác định

```
∫_a^b f(g(x))·g'(x) dx = ∫_{g(a)}^{g(b)} f(u) du
```

⚠ **Lưu ý**: Phải **đổi cả cận** theo u.

**Ví dụ**: ∫_0^1 2x·e^(x²) dx.
- Đặt u = x², du = 2x dx.
- x = 0 → u = 0; x = 1 → u = 1.
- = ∫_0^1 e^u du = e - 1 ≈ 1.718.

---

## 6. Tích phân từng phần xác định

```
∫_a^b u dv = [u·v]_a^b - ∫_a^b v du
```

**Ví dụ**: ∫_0^π x·sin x dx.
- u = x, dv = sin x dx. v = -cos x.
- = [-x·cos x]_0^π + ∫_0^π cos x dx
- = -π·cos π + 0 + [sin x]_0^π
- = π + 0 - 0 = **π**.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính ∫_1^3 (2x + 1) dx.

**Bài 2**: Tính ∫_0^{π/2} cos x dx.

**Bài 3**: Tính ∫_{-2}^2 x³ dx. Giải thích kết quả.

**Bài 4**: Tính ∫_0^1 x·e^x dx.

**Bài 5**: Tính ∫_1^e (ln x)/x dx.

### Lời giải

**Bài 1**: F(x) = x² + x. F(3) - F(1) = 12 - 2 = **10**.

**Bài 2**: F(x) = sin x. sin(π/2) - sin 0 = **1**.

**Bài 3**: F(x) = x⁴/4. F(2) - F(-2) = 4 - 4 = **0**. Vì x³ là hàm lẻ, đối xứng qua O → phần âm và dương triệt tiêu.

**Bài 4**: Từng phần. u=x, dv=e^x dx → v=e^x. [x·e^x]_0^1 - ∫_0^1 e^x dx = e - [e^x]_0^1 = e - (e-1) = **1**.

**Bài 5**: Đổi biến u = ln x, du = dx/x. x=1→u=0, x=e→u=1. = ∫_0^1 u du = **1/2**.

---

## 8. Bài tiếp theo

[Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/).

## 📝 Tổng kết

1. **Tổng Riemann**: S_n = Σ f(x_i)Δx. n → ∞ → ∫_a^b f dx.
2. **FTC**: nếu F' = f thì ∫_a^b f = F(b) - F(a). Đạo hàm & tích phân là ngược nhau.
3. **Tính chất**: cộng đoạn, đảo cận, ∫_a^a = 0.
4. ∫ có thể âm — là diện tích đại số.
5. Đổi biến **phải đổi cận**. Từng phần áp dụng được.
