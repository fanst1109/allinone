# Lesson 06 — Chuỗi & Khai triển Taylor

## Mục tiêu

- Hiểu **chuỗi số** Σ aₙ — hội tụ/phân kỳ.
- Các tiêu chí hội tụ: so sánh, tỉ số (d'Alembert), Cauchy.
- **Chuỗi luỹ thừa** & bán kính hội tụ.
- **Khai triển Taylor** — xấp xỉ hàm bằng đa thức.

## Kiến thức tiền đề

- [T4 L01 — Giới hạn dãy](../../04-Calculus-1var/lesson-01-sequences-limits/), L03-04 đạo hàm.

---

## 1. Chuỗi số

```
Σ_{n=1}^∞ aₙ = a₁ + a₂ + a₃ + ...
```

**Tổng riêng** S_N = a₁ + ... + a_N. Nếu S_N có giới hạn S khi N → ∞, chuỗi **hội tụ** với tổng S. Ngược lại **phân kỳ**.

### Ví dụ kinh điển

**Cấp số nhân**: Σ a·r^n (n=0..∞) = a/(1-r) khi |r| < 1.
- 1 + 1/2 + 1/4 + 1/8 + ... = 1/(1-1/2) = **2**.
- 1 + 1 + 1 + ... = phân kỳ.

**Chuỗi điều hòa**: Σ 1/n = 1 + 1/2 + 1/3 + ... → **phân kỳ** (mặc dù aₙ → 0).

**Chuỗi p**: Σ 1/n^p hội tụ ⟺ p > 1.
- p = 1: phân kỳ (điều hòa).
- p = 2: hội tụ. Σ 1/n² = π²/6 (Euler).

---

## 2. Tiêu chí hội tụ

### 2.1. Điều kiện cần
Σ aₙ hội tụ ⟹ aₙ → 0.

⚠ **Ngược không đúng**: aₙ → 0 không kết luận được. (VD chuỗi điều hòa.)

### 2.2. So sánh
0 ≤ aₙ ≤ bₙ. Nếu Σ bₙ hội tụ → Σ aₙ hội tụ.

### 2.3. Tỉ số (D'Alembert)
Tính L = lim |aₙ₊₁/aₙ|.
- L < 1: hội tụ.
- L > 1: phân kỳ.
- L = 1: chưa kết luận được.

**Ví dụ**: Σ n!/n^n. aₙ₊₁/aₙ = (n+1)!·n^n / ((n+1)^(n+1)·n!) = n^n/(n+1)^n = (n/(n+1))^n → 1/e < 1. **Hội tụ**.

### 2.4. Cauchy (căn)
L = lim ⁿ√|aₙ|. L < 1: hội tụ; L > 1: phân kỳ.

---

## 3. Chuỗi luỹ thừa

```
Σ aₙ·x^n  =  a₀ + a₁·x + a₂·x² + ...
```

**Bán kính hội tụ R**: chuỗi hội tụ với |x| < R, phân kỳ với |x| > R.
- Tính: 1/R = lim |aₙ₊₁/aₙ| (hoặc lim ⁿ√|aₙ|).

**Ví dụ**: Σ x^n/n!. aₙ = 1/n!. R = lim n! / (n+1)! ⁻¹ → 0 vế phải → 1/R = 0 → R = **∞**. Hội tụ ∀x.

---

## 4. Khai triển Taylor

🎯 **Phát biểu**: Hàm f có đạo hàm vô hạn lần tại điểm a có thể (đôi khi) viết:
```
f(x) = f(a) + f'(a)(x-a) + f''(a)(x-a)²/2! + f'''(a)(x-a)³/3! + ...
     = Σ_{n=0}^∞ f^(n)(a)/n! · (x-a)^n
```

⟶ **Xấp xỉ hàm phức tạp bằng đa thức**.

> 📐 **Định nghĩa đầy đủ — Khai triển Taylor**
>
> **(a) Là gì**: Cách viết 1 hàm "đẹp" f(x) thành 1 **tổng đa thức vô hạn** quanh điểm a: f(x) = Σ f^(n)(a)/n! · (x−a)^n. Hệ số đa thức là các đạo hàm bậc n của f tại a, chia n!. Khai triển quanh a=0 gọi là Maclaurin.
>
> **(b) Vì sao cần**: Máy tính, máy bỏ túi không "biết" sin x, e^x trực tiếp — chúng tính qua **vài số hạng đầu của Taylor**. Trong vật lý: xấp xỉ "tuyến tính" (giữ chỉ x), "bậc 2" (thêm x²) đủ cho hầu hết tính toán gần điểm cân bằng (con lắc nhỏ → sin θ ≈ θ → dao động điều hoà). Trong ML: Taylor bậc 2 cho phương pháp Newton-Raphson, quasi-Newton (BFGS), Hessian. Quan trọng nhất — Taylor cho cầu nối **giải tích ↔ đại số**: hàm bất kỳ → "đa thức vô hạn".
>
> **(c) Ví dụ số**: e^x = 1 + x + x²/2 + x³/6 + x⁴/24 + .... Tính e^0.5 với 4 số hạng: 1+0.5+0.125+0.0208 ≈ 1.6458. Giá trị thật: 1.6487 (sai ~0.0029). sin x = x − x³/6 + x⁵/120 − ... sin(0.1) ≈ 0.1 − 0.000167 = 0.0998334. Thật: 0.0998334 ✓. cos x = 1 − x²/2 + x⁴/24 − .... ln(1+x) = x − x²/2 + x³/3 − ... (chỉ hội tụ |x|≤1). 1/(1−x) = 1 + x + x² + ... (cấp số nhân). Euler: e^(iπ) = 1 + iπ + (iπ)²/2 + ... = cos π + i·sin π = −1.

**Tại a = 0** (Maclaurin):
```
f(x) = f(0) + f'(0)·x + f''(0)·x²/2! + ...
```

### Khai triển nổi tiếng

| f(x) | Khai triển Maclaurin | Hội tụ |
|------|----------------------|--------|
| e^x | 1 + x + x²/2! + x³/3! + ... | ∀x |
| sin x | x - x³/3! + x⁵/5! - ... | ∀x |
| cos x | 1 - x²/2! + x⁴/4! - ... | ∀x |
| ln(1+x) | x - x²/2 + x³/3 - ... | -1 < x ≤ 1 |
| 1/(1-x) | 1 + x + x² + x³ + ... | |x| < 1 |

💡 **Ứng dụng**: Máy tính tính sin, cos, e^x bằng vài số hạng Taylor.

**Ví dụ**: tính e^0.5.
- 1 + 0.5 + 0.125 + 0.0208 + 0.0026 ≈ **1.6484**.
- Giá trị thật: 1.6487. Sai 0.0003 với chỉ 5 số hạng.

---

## 5. Công thức Euler (lại)

Từ Taylor:
- e^(iθ) = 1 + iθ + (iθ)²/2! + (iθ)³/3! + ...
- = (1 - θ²/2! + θ⁴/4! - ...) + i(θ - θ³/3! + ...)
- = **cos θ + i·sin θ**

Đã CM ở [T3 L06](../../03-Trig-Complex/lesson-06-complex-polar-euler/).

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính tổng cấp số nhân Σ 2·(1/3)^n (n=0..∞).

**Bài 2**: Chuỗi Σ (n+1)/(n²+1) hội tụ hay phân kỳ?

**Bài 3**: Tính bán kính hội tụ của Σ x^n/n.

**Bài 4**: Viết khai triển Taylor của cos x đến bậc 6.

**Bài 5**: Dùng Taylor xấp xỉ √(1 + 0.1) đến bậc 2.

### Lời giải

**Bài 1**: a = 2, r = 1/3. Tổng = 2/(1-1/3) = **3**.

**Bài 2**: (n+1)/(n²+1) ≈ 1/n khi n lớn → so sánh với điều hòa → **phân kỳ**.

**Bài 3**: aₙ = 1/n. lim |aₙ₊₁/aₙ| = lim n/(n+1) = 1 → R = **1**.

**Bài 4**: cos x = 1 - x²/2! + x⁴/4! - x⁶/6! + ... = **1 - x²/2 + x⁴/24 - x⁶/720**.

**Bài 5**: (1+x)^(1/2) ≈ 1 + x/2 - x²/8. Với x = 0.1: 1 + 0.05 - 0.00125 = **1.04875**. Thật: 1.04881.

---

## 7. Bài tiếp theo

[Lesson 07 — Phương trình vi phân](../lesson-07-differential-equations/).

## 📝 Tổng kết

1. **Chuỗi hội tụ**: tổng riêng có giới hạn. **Điều kiện cần**: aₙ → 0 (không đủ).
2. **Tiêu chí tỉ số (D'Alembert)**: lim |aₙ₊₁/aₙ| < 1.
3. **Cấp số nhân** Σ r^n hội tụ ⟺ |r| < 1.
4. **Chuỗi p** Σ 1/n^p hội tụ ⟺ p > 1.
5. **Taylor**: xấp xỉ hàm bằng đa thức. e^x, sin x, cos x, ln(1+x) khai triển được.
