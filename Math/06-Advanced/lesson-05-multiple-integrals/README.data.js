// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-05-multiple-integrals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Tích phân kép & bội

## Mục tiêu

- Hiểu **tích phân kép** ∫∫ f(x,y) dA — thể tích dưới mặt cong.
- Tính tích phân kép bằng tích phân lặp.
- Đổi biến (tọa độ cực).
- Tích phân bội (3 biến trở lên).

## Kiến thức tiền đề

- [Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/), [T4 L07-08 — Tích phân](../../04-Calculus-1var/lesson-07-definite-integral/).

---

## 1. Tích phân kép — Định nghĩa

💡 **Trực giác**: Tích phân 1 biến ∫_a^b f(x) dx = diện tích dưới đồ thị. **Tích phân kép** ∫∫_D f(x,y) dA = **thể tích** dưới mặt cong z = f(x,y) trên miền D ⊂ ℝ².

### Định nghĩa Riemann

Chia D thành n×n ô vuông nhỏ ΔA. Lấy tổng f·ΔA. Khi n → ∞:
\`\`\`
∫∫_D f(x, y) dA = lim_{n→∞} Σ f(xᵢ, yⱼ)·ΔA
\`\`\`

---

## 2. Tính bằng tích phân lặp (iterated integral)

🎯 **Định lý Fubini**: Nếu f đủ "đẹp" và D = [a,b] × [c,d] (hình chữ nhật):
\`\`\`
∫∫_D f dA = ∫_a^b [∫_c^d f(x, y) dy] dx = ∫_c^d [∫_a^b f(x, y) dx] dy
\`\`\`

Tính tích phân trong trước (theo 1 biến, biến kia hằng), rồi tích phân ngoài.

### Ví dụ

\`\`\`
∫∫_{[0,1]×[0,2]} (x + 2y) dA
\`\`\`

Tính trong (theo y):
\`\`\`
∫_0^2 (x + 2y) dy = [xy + y²]_0^2 = 2x + 4
\`\`\`

Tính ngoài (theo x):
\`\`\`
∫_0^1 (2x + 4) dx = [x² + 4x]_0^1 = 5
\`\`\`

⟶ Kết quả = **5**.

---

## 3. Miền không-chữ-nhật

Nếu D = {(x, y) : a ≤ x ≤ b, g(x) ≤ y ≤ h(x)} (đường biên y = g, h):
\`\`\`
∫∫_D f dA = ∫_a^b [∫_{g(x)}^{h(x)} f(x, y) dy] dx
\`\`\`

**Ví dụ**: Tính ∫∫_T x·y dA, T = tam giác (0,0), (1,0), (1,1).
- T: 0 ≤ x ≤ 1, 0 ≤ y ≤ x.
- Trong: ∫_0^x x·y dy = x·[y²/2]_0^x = x³/2.
- Ngoài: ∫_0^1 x³/2 dx = 1/8.

---

## 4. Đổi biến — Tọa độ cực

Với miền tròn / đối xứng quay, dùng tọa độ cực:
\`\`\`
x = r·cos θ, y = r·sin θ
dA = r·dr·dθ
\`\`\`

(Yếu tố Jacobian = r.)

**Ví dụ**: Tính ∫∫_D (x² + y²) dA, D = đĩa bán kính R.
- D: 0 ≤ r ≤ R, 0 ≤ θ ≤ 2π.
- x² + y² = r².
- = ∫_0^{2π} ∫_0^R r²·r dr dθ = ∫_0^{2π} [r⁴/4]_0^R dθ = ∫_0^{2π} R⁴/4 dθ = **π·R⁴/2**.

---

## 5. Tích phân bội (n biến)

**3 biến**: ∫∫∫_V f(x, y, z) dV — tích phân trên khối V trong ℝ³.

\`\`\`
∫∫∫_V f dV = ∫_a^b ∫_c^d ∫_e^f f(x, y, z) dz dy dx
\`\`\`

(Thứ tự lặp tùy chọn.)

### Tọa độ trụ và cầu

- **Trụ**: x = r·cos θ, y = r·sin θ, z = z. dV = r·dr·dθ·dz.
- **Cầu**: x = ρ·sin φ·cos θ, y = ρ·sin φ·sin θ, z = ρ·cos φ. dV = ρ²·sin φ·dρ·dφ·dθ.

---

## 6. Ứng dụng

### 6.1. Diện tích & thể tích

- Diện tích D = ∫∫_D 1 dA.
- Thể tích vật khối V = ∫∫∫_V 1 dV.

### 6.2. Khối tâm

\`\`\`
x̄ = ∫∫_D x·ρ dA / ∫∫_D ρ dA
ȳ = ∫∫_D y·ρ dA / ∫∫_D ρ dA
\`\`\`

ρ(x, y) = mật độ.

### 6.3. Momen quán tính

\`\`\`
I_z = ∫∫_D (x² + y²)·ρ dA
\`\`\`

Đại lượng quan trọng trong cơ học.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính ∫_0^1 ∫_0^2 (3x²·y) dy dx.

**Bài 2**: Tính ∫∫_D x dA trên D = {(x,y) : 0 ≤ x ≤ 1, x ≤ y ≤ 1}.

**Bài 3**: Tính thể tích hình cầu bán kính R bằng tích phân.

**Bài 4**: Tính ∫∫_D dA trên D = đĩa bán kính 3.

**Bài 5**: Khối tâm tam giác đỉnh (0,0), (1,0), (0,1) (mật độ đều).

### Lời giải

**Bài 1**: Trong (theo y): ∫_0^2 3x²·y dy = 3x²·[y²/2]_0^2 = 6x². Ngoài: ∫_0^1 6x² dx = **2**.

**Bài 2**: ∫_0^1 ∫_x^1 x dy dx = ∫_0^1 x(1-x) dx = [x²/2 - x³/3]_0^1 = 1/2 - 1/3 = **1/6**.

**Bài 3**: V = ∫_0^{2π} ∫_0^π ∫_0^R ρ²·sin φ dρ dφ dθ = (R³/3)·2·(2π) = **(4/3)·π·R³** ✓.

**Bài 4**: Diện tích đĩa = ∫_0^{2π} ∫_0^3 r dr dθ = ∫_0^{2π} (9/2) dθ = **9π**. Khớp πR² = 9π ✓.

**Bài 5**: D: 0 ≤ x ≤ 1, 0 ≤ y ≤ 1-x. S(D) = 1/2.  
- ∫∫ x dA = ∫_0^1 x(1-x) dx = 1/6. x̄ = (1/6)/(1/2) = **1/3**.  
- Tương tự ȳ = **1/3**. → khối tâm (1/3, 1/3).

---

## 8. Bài tiếp theo

[Lesson 06 — Chuỗi & Taylor](../lesson-06-series-taylor/).

## 📝 Tổng kết

1. **∫∫_D f dA** = thể tích dưới mặt cong f(x,y) trên miền D.
2. **Fubini**: tính tích phân lặp, thứ tự đổi được khi f "đẹp".
3. **Tọa độ cực**: dA = r·dr·dθ. Cho miền tròn.
4. **Cầu, trụ**: cho 3 chiều với đối xứng quay.
5. **Ứng dụng**: diện tích, thể tích, khối tâm, momen quán tính.
`;
