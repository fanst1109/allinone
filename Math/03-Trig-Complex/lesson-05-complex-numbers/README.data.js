// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-05-complex-numbers/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Số phức

## Mục tiêu

- Hiểu **vì sao cần số phức** (giải được mọi PT đa thức).
- Định nghĩa **i**, dạng đại số z = a + bi.
- 4 phép toán: cộng, trừ, nhân, chia.
- **Mặt phẳng phức** Argand, **mô-đun**, **liên hợp**.

## Kiến thức tiền đề

- [Lesson 04 — PT bậc 2](../../01-Arithmetic-Algebra/lesson-04-quadratic-equations/) (Δ < 0).

---

## 1. Vì sao cần số phức?

💡 **Câu chuyện**: Toán phổ thông học rằng x² + 1 = 0 **vô nghiệm** trong ℝ (vì x² ≥ 0).

Nhưng các nhà toán học Ý thế kỷ 16 (Cardano, Bombelli) khi giải PT bậc 3 phát hiện: trong các bước trung gian, phải lấy căn của số âm — kể cả khi nghiệm cuối là số thực! Họ "phát minh" ra **i** với tính chất:

\`\`\`
i² = -1
\`\`\`

Lúc đầu coi là "ảo" (imaginary), nhưng hóa ra **i thật sự có ý nghĩa hình học**: là phép quay 90° trong mặt phẳng (xem L08).

**Hệ quả**: Mọi PT đa thức bậc n trong ℂ có **đúng n nghiệm** (Định lý đại số cơ bản — Gauss).

---

## 2. Định nghĩa

**Số phức** là biểu thức dạng:
\`\`\`
z = a + bi
\`\`\`
- **a** = phần thực (real part), ký hiệu Re(z).
- **b** = phần ảo (imaginary part), ký hiệu Im(z).
- **i** = đơn vị ảo, i² = -1.

**Ví dụ**: z = 3 + 4i. Re(z) = 3, Im(z) = 4.

**Trường hợp đặc biệt**:
- b = 0: z là số thực (ℝ ⊂ ℂ).
- a = 0: z là số thuần ảo (vd 5i).

---

## 3. Mặt phẳng phức (Argand)

💡 **Trực giác**: Coi z = a + bi như **điểm M(a, b)** trên mặt phẳng. Trục hoành = phần thực, trục tung = phần ảo.

\`\`\`
   ●(3+4i)
   │
   │
   ●(2)        ●(5)            (trục thực)
   │
   ●(-3i)                       (trục ảo)
\`\`\`

**Mô-đun** (độ dài vector OM):
\`\`\`
|z| = √(a² + b²)
\`\`\`

**Liên hợp** (lật qua trục thực):
\`\`\`
z̄ = a - bi
\`\`\`

**Tính chất**:
- z · z̄ = (a+bi)(a-bi) = a² + b² = |z|².
- z + z̄ = 2a = 2·Re(z).
- z - z̄ = 2bi.

---

## 4. Bốn phép toán

### 4.1. Cộng / trừ

\`\`\`
(a + bi) + (c + di) = (a+c) + (b+d)·i
(a + bi) - (c + di) = (a-c) + (b-d)·i
\`\`\`

**Ví dụ**: (3+2i) + (1-4i) = **4 - 2i**.

💡 **Hình học**: Cộng số phức = **cộng vector**.

### 4.2. Nhân

Phân phối, dùng i² = -1:
\`\`\`
(a+bi)(c+di) = ac + adi + bci + bd·i² = (ac - bd) + (ad + bc)i
\`\`\`

**Ví dụ**: (3+2i)(1-4i) = 3 - 12i + 2i - 8i² = 3 - 10i + 8 = **11 - 10i**.

⚠ **Lỗi thường gặp**: Quên i² = -1, để nguyên 8i² → kết quả sai 3 - 10i thay vì 11 - 10i.

### 4.3. Chia

**Mẹo**: Nhân tử và mẫu với liên hợp của mẫu (để mẫu thành số thực).

\`\`\`
(a+bi) / (c+di) = (a+bi)(c-di) / [(c+di)(c-di)] = (a+bi)(c-di) / (c²+d²)
\`\`\`

**Ví dụ**: (3+2i) / (1+i).
- Nhân với (1-i):
- Tử: (3+2i)(1-i) = 3 - 3i + 2i - 2i² = 3 - i + 2 = 5 - i.
- Mẫu: (1+i)(1-i) = 1² + 1² = 2.
- → **(5-i)/2 = 5/2 - (1/2)i**.

---

## 5. Lũy thừa của i

| n | i^n |
|---|-----|
| 0 | 1 |
| 1 | i |
| 2 | -1 |
| 3 | -i |
| 4 | 1 |
| 5 | i |
| ... | tuần hoàn chu kỳ 4 |

⟶ **i^n = i^(n mod 4)**.

**Ví dụ**: i^2023 = i^(2023 mod 4) = i^3 = **-i**.

---

## 6. PT bậc 2 với Δ < 0

Trước đây vô nghiệm. Nay luôn có 2 nghiệm phức.

**Ví dụ**: x² + 4x + 13 = 0. Δ = 16 - 52 = -36.
- √Δ = √(-36) = 6i.
- x = (-4 ± 6i) / 2 = **-2 ± 3i**.

**Kiểm tra**: (-2+3i)² + 4(-2+3i) + 13 = 4 - 12i - 9 - 8 + 12i + 13 = 0 ✓.

---

## 7. Định lý đại số cơ bản

**Phát biểu**: Mọi PT đa thức bậc n ≥ 1 với hệ số phức **có đúng n nghiệm phức** (đếm cả bội).

⟶ ℂ là "đóng" cho đại số. Đó là lý do số phức quan trọng dù "ảo" — chúng làm cho hệ thống số hoàn chỉnh.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Cho z = 4 - 3i. Tính Re(z), Im(z), |z|, z̄.

**Bài 2**: Tính (2+i)(3-2i).

**Bài 3**: Tính (1+i)/(1-i).

**Bài 4**: Giải x² + 9 = 0 trong ℂ.

**Bài 5**: Tính i^100.

### Lời giải

**Bài 1**: Re = 4, Im = -3, |z| = √(16+9) = **5**, z̄ = **4 + 3i**.

**Bài 2**: (2+i)(3-2i) = 6 - 4i + 3i - 2i² = 6 - i + 2 = **8 - i**.

**Bài 3**: Nhân tử mẫu với (1+i):  
- Tử: (1+i)² = 1 + 2i + i² = 2i.  
- Mẫu: (1-i)(1+i) = 2.  
- → **i**.

**Bài 4**: x² = -9 → x = ±√(-9) = **±3i**.

**Bài 5**: 100 = 4·25 → i^100 = (i^4)^25 = 1^25 = **1**.

---

## 9. Bài tiếp theo

[Lesson 06 — Dạng lượng giác & Euler](../lesson-06-complex-polar-euler/).

## 📝 Tổng kết

1. **i² = -1**. ℂ = {a + bi : a, b ∈ ℝ}.
2. **|z| = √(a²+b²)**, **z̄ = a - bi**, z·z̄ = |z|².
3. 4 phép toán: cộng/trừ theo phần thực/ảo, nhân phân phối với i² = -1, chia nhân liên hợp.
4. **Định lý đại số cơ bản**: PT bậc n có đúng n nghiệm trong ℂ.
`;
