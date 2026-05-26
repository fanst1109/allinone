# Lesson 04 — Hàm nhiều biến

## Mục tiêu

- Hàm f(x, y), f(x, y, z) — đồ thị mặt cong.
- **Đạo hàm riêng** ∂f/∂x, ∂f/∂y.
- **Gradient** ∇f và ý nghĩa hình học.
- Cực trị 2 biến — định lý Hessian.

## Kiến thức tiền đề

- [Tier 4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. Hàm nhiều biến

💡 **Định nghĩa**: f: ℝⁿ → ℝ. Mỗi điểm (x₁, ..., xₙ) gán 1 số f(x₁, ..., xₙ).

**Ví dụ 2 biến**:
- f(x, y) = x² + y² (parabol tròn xoay).
- f(x, y) = x·y (mặt yên ngựa).
- f(x, y) = sin(x)·cos(y) (sóng 2D).

**Đồ thị**: trong ℝ³, vẽ điểm (x, y, f(x, y)) → mặt cong.

### Đường mức (level curves)

f(x, y) = c (hằng số) → đường cong trong mặt phẳng xy.

⟶ Như **đường đồng mức** trên bản đồ.

---

## 2. Đạo hàm riêng

💡 **Ý tưởng**: Khi tính ∂f/∂x, coi y là **hằng**, đạo hàm theo x.

```
∂f/∂x = lim_{h→0} [f(x+h, y) - f(x, y)] / h
```

**Ví dụ**: f(x, y) = x²·y + 3y.
- ∂f/∂x = 2x·y (coi y hằng).
- ∂f/∂y = x² + 3 (coi x hằng).

**Ví dụ 2**: f(x, y) = sin(x·y).
- ∂f/∂x = y·cos(xy) (chain rule).
- ∂f/∂y = x·cos(xy).

### Ý nghĩa hình học

∂f/∂x tại (a, b) = slope của giao cắt với mặt phẳng y = b.

---

## 3. Gradient

```
∇f = (∂f/∂x, ∂f/∂y)
```

(Hoặc trong n chiều: ∇f = (∂f/∂x₁, ..., ∂f/∂xₙ).)

💡 **Tính chất quan trọng**:
- ∇f chỉ **hướng tăng nhanh nhất** của f.
- ||∇f|| = tốc độ tăng theo hướng đó.
- ∇f **vuông góc với đường mức** f = c.

**Ví dụ**: f(x, y) = x² + y². ∇f = (2x, 2y). Tại (1, 1): ∇f = (2, 2) — chỉ "ra xa O" — đúng vì f tăng theo bán kính.

### Hướng giảm nhanh nhất

= **-∇f**. Đây là nền tảng của **Gradient Descent** trong ML.

---

## 4. Đạo hàm riêng bậc 2 & Ma trận Hessian

**Đạo hàm bậc 2**:
- ∂²f/∂x² = (∂/∂x)(∂f/∂x).
- ∂²f/∂x∂y = (∂/∂y)(∂f/∂x).

**Định lý Schwarz**: Nếu f đủ "đẹp" (đạo hàm liên tục), thì ∂²f/∂x∂y = ∂²f/∂y∂x. Thứ tự đạo hàm không quan trọng.

**Ma trận Hessian** (2 biến):
```
H = [∂²f/∂x²   ∂²f/∂x∂y]
    [∂²f/∂y∂x ∂²f/∂y² ]
```

⟶ H đối xứng (Schwarz).

---

## 5. Cực trị 2 biến

🎯 **Điều kiện cần** (Fermat): Tại cực trị, **∇f = 0**.

⟶ Tìm các điểm (a, b) sao cho ∂f/∂x = 0 và ∂f/∂y = 0. Gọi là **điểm dừng** (critical point).

### Phân loại bằng Hessian (định thức 2nd derivative test)

Tại điểm dừng:
- **det(H) > 0** và **∂²f/∂x² > 0**: **cực tiểu**.
- **det(H) > 0** và **∂²f/∂x² < 0**: **cực đại**.
- **det(H) < 0**: **điểm yên ngựa** (saddle).
- **det(H) = 0**: chưa kết luận.

### Ví dụ

f(x, y) = x² + y² - 4x + 6y.
- ∂f/∂x = 2x - 4 = 0 → x = 2.
- ∂f/∂y = 2y + 6 = 0 → y = -3.
- Điểm dừng: (2, -3).
- H = [[2, 0], [0, 2]]. det = 4 > 0. ∂²f/∂x² = 2 > 0.
- → **Cực tiểu** tại (2, -3). f(2, -3) = 4 + 9 - 8 - 18 = -13.

---

## 6. Ứng dụng

### Gradient Descent
- Hàm cost J(θ) trong ML có nhiều tham số θ = (θ₁, ..., θₙ).
- Cập nhật: θ ← θ - α·∇J(θ) (α = learning rate).
- Tiến dần đến cực tiểu.

### Tối ưu hóa
- Tìm thông số tối ưu của mô hình, mạng nơ-ron, ...

---

## 7. Bài tập

### Bài tập

**Bài 1**: f(x, y) = 3x² + 2xy - y². Tính ∂f/∂x, ∂f/∂y.

**Bài 2**: f(x, y) = e^(x²+y²). Tính ∇f tại (1, 1).

**Bài 3**: Tìm cực trị của f(x, y) = x² + xy + y² - 3x - 3y.

**Bài 4**: f(x, y) = x³ - 3xy + y³. Tìm điểm dừng. Phân loại bằng Hessian.

**Bài 5**: f(x, y) = x² - y². Tìm điểm dừng. Phân loại.

### Lời giải

**Bài 1**: ∂f/∂x = 6x + 2y. ∂f/∂y = 2x - 2y.

**Bài 2**: ∇f = (2x·e^(x²+y²), 2y·e^(x²+y²)). Tại (1,1): (2e², 2e²).

**Bài 3**:  
- ∂f/∂x = 2x + y - 3 = 0.  
- ∂f/∂y = x + 2y - 3 = 0.  
- Giải: 2x + y = 3, x + 2y = 3. Trừ: x - y = 0 → x = y. Thay: 3x = 3 → **x = y = 1**.  
- H = [[2, 1], [1, 2]]. det = 3 > 0. ∂²f/∂x² = 2 > 0 → **cực tiểu** tại (1, 1).

**Bài 4**:  
- ∂f/∂x = 3x² - 3y = 0 → y = x².  
- ∂f/∂y = -3x + 3y² = 0 → x = y².  
- Thay: x = (x²)² = x⁴ → x⁴ - x = 0 → x(x³ - 1) = 0 → x = 0 hoặc x = 1.  
- Điểm dừng: (0, 0), (1, 1).  
- H = [[6x, -3], [-3, 6y]]. det = 36xy - 9.  
- Tại (0,0): det = -9 < 0 → **yên ngựa**.  
- Tại (1,1): det = 27 > 0, ∂²f/∂x² = 6 > 0 → **cực tiểu**.

**Bài 5**: ∂f/∂x = 2x = 0, ∂f/∂y = -2y = 0 → (0, 0). H = [[2, 0], [0, -2]]. det = -4 < 0 → **yên ngựa** (mặt yên ngựa kinh điển).

---

## 8. Bài tiếp theo

[Lesson 05 — Tích phân bội](../lesson-05-multiple-integrals/).

## 📝 Tổng kết

1. **Đạo hàm riêng** ∂f/∂x: coi biến khác hằng.
2. **Gradient** ∇f = (∂f/∂x, ∂f/∂y) chỉ hướng tăng nhanh nhất, vuông góc đường mức.
3. **Cực trị**: tại điểm dừng (∇f = 0). Phân loại bằng Hessian.
4. **Yên ngựa** = det(H) < 0 — cao theo 1 hướng, thấp theo hướng khác.
5. **Gradient Descent** cốt lõi ML.
