// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-01-vectors-matrices/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Vector & Ma trận

## Mục tiêu

- **Vector** trong ℝⁿ: phép toán cộng, nhân vô hướng, tích vô hướng.
- **Ma trận**: cộng, nhân ma trận-vector, nhân ma trận-ma trận.
- Hiểu ma trận như **phép biến đổi tuyến tính**.
- Kết nối với Vectors tier riêng (đã có).

## Kiến thức tiền đề

- [Tier 2 L08 — Biến hình & vector hình học](../../02-Geometry/lesson-08-transformations-vector-geo/).
- Có thể tham khảo [Vectors tier riêng](../../../Vectors/01-Algebra/) cho phần ứng dụng AI/ML.

---

## 1. Vector trong ℝⁿ

💡 **Định nghĩa**: Vector n chiều = bộ n số thực, viết theo cột:
\`\`\`
v = (v₁, v₂, ..., vₙ)
\`\`\`

**Phép toán**:
- Cộng: u + v = (u₁+v₁, ..., uₙ+vₙ).
- Nhân vô hướng: c·v = (c·v₁, ..., c·vₙ).
- **Tích vô hướng** (dot product): u · v = u₁v₁ + ... + uₙvₙ (= 1 số).
- **Độ dài (chuẩn)**: ||v|| = √(v · v) = √(v₁² + ... + vₙ²).

**Ví dụ**: u = (1, 2, 3), v = (4, -1, 2).
- u + v = (5, 1, 5).
- u · v = 4 - 2 + 6 = 8.
- ||u|| = √14.

### Góc giữa 2 vector

\`\`\`
cos θ = (u · v) / (||u||·||v||)
\`\`\`

⟶ u · v = 0 ⟺ u ⊥ v.

---

## 2. Ma trận

**Ma trận** m × n = bảng số có m hàng, n cột:
\`\`\`
A = [a₁₁ a₁₂ ... a₁ₙ]
    [a₂₁ a₂₂ ... a₂ₙ]
    [...        ...]
    [aₘ₁ aₘ₂ ... aₘₙ]
\`\`\`

### Cộng / nhân vô hướng

Tương tự vector — cộng từng phần tử, nhân số.

### Nhân ma trận-vector

Nếu A là m×n và x ∈ ℝⁿ:
\`\`\`
y = A·x ∈ ℝᵐ
yᵢ = Σⱼ aᵢⱼ·xⱼ
\`\`\`

Mỗi thành phần y_i = tích vô hướng của hàng i của A với x.

**Ví dụ**: A = [[1,2],[3,4]], x = (5, 6).
- y₁ = 1·5 + 2·6 = 17.
- y₂ = 3·5 + 4·6 = 39.
- y = (17, 39).

### Nhân ma trận-ma trận

A m×n, B n×p → AB là m×p.
\`\`\`
(AB)ᵢⱼ = Σₖ aᵢₖ · bₖⱼ
\`\`\`

= tích vô hướng hàng i của A với cột j của B.

⚠ **Nhân ma trận KHÔNG giao hoán**: AB ≠ BA (nói chung).

---

## 3. Ma trận = Phép biến đổi tuyến tính

💡 **Ý tưởng quan trọng**: Ma trận A m×n định nghĩa 1 ánh xạ tuyến tính:
\`\`\`
T: ℝⁿ → ℝᵐ
T(x) = A·x
\`\`\`

**Tính chất tuyến tính**:
- T(x + y) = T(x) + T(y).
- T(c·x) = c·T(x).

### Ví dụ — Phép quay 2D

Ma trận quay góc θ:
\`\`\`
R(θ) = [cos θ  -sin θ]
       [sin θ   cos θ]
\`\`\`

Đã gặp ở [Tier 2 L08](../../02-Geometry/lesson-08-transformations-vector-geo/).

### Ví dụ — Phép vị tự

Ma trận k·I = [[k,0],[0,k]] biến (x, y) → (kx, ky).

---

## 4. Ma trận đặc biệt

| Tên | Định nghĩa | Ví dụ 2×2 |
|-----|------------|-----------|
| Đơn vị I | aᵢⱼ = 1 nếu i=j, 0 otherwise | [[1,0],[0,1]] |
| Đối xứng | A^T = A | [[1,2],[2,3]] |
| Tam giác trên | aᵢⱼ = 0 khi i > j | [[1,2],[0,3]] |
| Khả nghịch | ∃A⁻¹: A·A⁻¹ = I | det ≠ 0 |
| Trực giao | A^T = A⁻¹ | R(θ) (quay) |

**Chuyển vị** A^T: đổi hàng ↔ cột. (A^T)ᵢⱼ = aⱼᵢ.

---

## 5. Quy tắc đại số ma trận

- A + B = B + A (giao hoán cộng).
- (AB)C = A(BC) (kết hợp).
- A(B+C) = AB + AC (phân phối).
- AB ≠ BA (không giao hoán).
- (AB)^T = B^T · A^T (đảo thứ tự).
- I·A = A·I = A.

---

## 6. Bài tập

### Bài tập

**Bài 1**: u = (1, 2, -1), v = (3, 0, 2). Tính u · v và ||u||.

**Bài 2**: A = [[1, 2], [3, 4]], B = [[0, 1], [1, 0]]. Tính AB và BA.

**Bài 3**: Cho A = [[2, 1], [1, 3]], x = (1, 2). Tính Ax.

**Bài 4**: Tính tích vô hướng (1, 2, 3, 4) · (5, 6, 7, 8).

**Bài 5**: Ma trận đối xứng A 2×2 có dạng nào tổng quát?

### Lời giải

**Bài 1**: u·v = 3 + 0 - 2 = **1**. ||u|| = √(1+4+1) = **√6**.

**Bài 2**:  
- AB: hàng 1 nhân cột B: [1·0+2·1, 1·1+2·0] = [2, 1]. Hàng 2: [3·0+4·1, 3·1+4·0] = [4, 3].  
- AB = [[2,1],[4,3]].  
- BA = [[3,4],[1,2]].  
- ≠ → không giao hoán.

**Bài 3**: y₁ = 2·1+1·2 = 4. y₂ = 1·1+3·2 = 7. → **y = (4, 7)**.

**Bài 4**: 5+12+21+32 = **70**.

**Bài 5**: A = [[a, b], [b, c]] với a, b, c bất kỳ. (Đường chéo phụ đối xứng.)

---

## 7. Bài tiếp theo

[Lesson 02 — Định thức & hệ tuyến tính](../lesson-02-determinants-linear-systems/).

## 📝 Tổng kết

1. **Vector ℝⁿ**: cộng, nhân vô hướng, tích vô hướng, chuẩn.
2. **Ma trận**: cộng, nhân, **không giao hoán**.
3. **Nhân ma trận-vector**: y_i = hàng i của A · x.
4. **Ma trận = phép biến đổi tuyến tính** T: ℝⁿ → ℝᵐ.
5. **Quay**, **vị tự**, **chiếu**, ... đều là ma trận.
`;
