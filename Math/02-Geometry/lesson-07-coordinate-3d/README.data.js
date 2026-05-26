// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-07-coordinate-3d/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Tọa độ Oxyz

## Mục tiêu

- Hiểu **hệ tọa độ 3 chiều Oxyz**.
- Tính **khoảng cách** trong không gian 3D.
- Viết **phương trình mặt phẳng** và **phương trình đường thẳng** trong không gian.
- Tính khoảng cách điểm-mặt-đường.

## Kiến thức tiền đề

- [Lesson 06 — Tọa độ Oxy](../lesson-06-coordinate-plane-conics/) — biết khái niệm tọa độ 2D.

---

## 1. Hệ tọa độ 3D

**Hệ tọa độ Oxyz**: 3 trục Ox, Oy, Oz đôi một vuông góc, cắt nhau tại O.

Mỗi điểm M có 3 tọa độ **(x, y, z)** = hoành độ, tung độ, **cao độ**.

### Khoảng cách 2 điểm A(x₁, y₁, z₁), B(x₂, y₂, z₂)

\`\`\`
d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²)
\`\`\`

(Pythagoras mở rộng 3D.)

### Vector

**Vector AB** = (x₂−x₁, y₂−y₁, z₂−z₁).

**Tích vô hướng** u · v = u₁v₁ + u₂v₂ + u₃v₃.

**Độ lớn** |u| = √(u₁² + u₂² + u₃²).

**Góc**: cos(θ) = (u·v)/(|u|·|v|).

---

## 2. Phương trình mặt phẳng

Mặt phẳng có **vector pháp tuyến** n = (A, B, C) đi qua điểm M₀(x₀, y₀, z₀):
\`\`\`
A(x − x₀) + B(y − y₀) + C(z − z₀) = 0
\`\`\`

Hoặc dạng tổng quát:
\`\`\`
Ax + By + Cz + D = 0
\`\`\`

💡 **Ý nghĩa**: vector pháp tuyến n ⊥ với mọi vector nằm trong mặt phẳng.

> 📐 **Định nghĩa đầy đủ — Phương trình mặt phẳng Ax+By+Cz+D=0**
>
> **(a) Là gì**: Tập điểm (x,y,z) trong ℝ³ thoả 1 PT tuyến tính 3 biến. Hệ số (A, B, C) **không phải tùy ý** — chúng là vector pháp tuyến **n** vuông góc với mặt phẳng đó.
>
> **(b) Vì sao cần**: Vì mặt phẳng là "1D ít hơn không gian" — cần 1 hạn chế (1 PT) để xác định. Vector pháp tuyến đóng vai trò "hướng" thay cho điểm — biết hướng vuông góc thì biết được mặt phẳng. Trong đồ hoạ 3D, vật lý (mặt cân bằng lực), tối ưu hoá (siêu phẳng phân lớp trong SVM), mặt phẳng là nguyên thuỷ cơ bản. Hằng số D quy định mặt phẳng "dời" khỏi gốc bao xa.
>
> **(c) Ví dụ số**: Mặt phẳng 2x + y + 2z = 6 có **n = (2, 1, 2)** (vector pháp tuyến). Điểm (1, 2, 1) có thuộc không? 2·1+2+2·1 = 6 ✓ → có. Điểm (0,0,0): 0 ≠ 6 → không thuộc. Khoảng cách từ O đến mặt phẳng: |0+0+0−6|/√(4+1+4) = 6/3 = **2**. Mặt phẳng song song x+y+z = 0 và x+y+z = 5: cùng n = (1,1,1) → khoảng cách = |0−5|/√3 = 5/√3 ≈ 2.89.

**Khoảng cách từ điểm P(x₀, y₀, z₀) đến mặt Ax + By + Cz + D = 0**:
\`\`\`
d = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)
\`\`\`

---

## 3. Phương trình đường thẳng

Đường thẳng qua M₀(x₀, y₀, z₀) với **vector chỉ phương** u = (a, b, c):

**Tham số**:
\`\`\`
x = x₀ + a·t
y = y₀ + b·t
z = z₀ + c·t
\`\`\`

**Chính tắc** (nếu a, b, c ≠ 0):
\`\`\`
(x − x₀)/a = (y − y₀)/b = (z − z₀)/c
\`\`\`

---

## 4. Vị trí tương đối

### 2 đường thẳng

- **Song song**: vector chỉ phương u₁ // u₂, không có điểm chung.
- **Trùng nhau**: u₁ // u₂, có điểm chung.
- **Cắt nhau**: có điểm chung duy nhất.
- **Chéo nhau**: không cùng mặt phẳng (đặc thù 3D, không có ở 2D).

### Đường thẳng và mặt phẳng

- **Vuông góc**: u // n.
- **Song song**: u ⊥ n và đường không trên mặt.
- **Cắt**: tại 1 điểm.

### 2 mặt phẳng

- **Song song**: n₁ // n₂.
- **Trùng**: n₁ // n₂, cùng D (so với chuẩn hóa).
- **Cắt**: tạo đường giao tuyến.

---

## 5. Bài tập

### Bài tập

**Bài 1**: A(1, 2, 3), B(4, 6, 8). Tính khoảng cách.

**Bài 2**: Viết PT mặt phẳng qua A(2, 1, 3) với vector pháp tuyến n = (1, 2, 1).

**Bài 3**: Tính khoảng cách từ O(0,0,0) đến mặt phẳng 2x + y + 2z − 6 = 0.

**Bài 4**: Cho u = (1, 2, 2) và v = (2, 1, −1). Tính u·v và góc.

**Bài 5**: Viết PT tham số đường thẳng qua A(1, 2, 0) với vector chỉ phương (3, 1, 4).

### Lời giải

**Bài 1**: d = √(9 + 16 + 25) = √50 = **5√2 ≈ 7.07**.

**Bài 2**: 1(x−2) + 2(y−1) + 1(z−3) = 0 → **x + 2y + z − 7 = 0**.

**Bài 3**: d = |0 + 0 + 0 − 6| / √(4+1+4) = 6/3 = **2**.

**Bài 4**: u·v = 2 + 2 − 2 = 2. |u| = √9 = 3. |v| = √6. cos θ = 2/(3√6) ≈ 0.272 → θ ≈ **74.2°**.

**Bài 5**: x = 1 + 3t, y = 2 + t, z = 4t.

---

## 6. Bài tiếp theo

[Lesson 08 — Biến hình & Vector](../lesson-08-transformations-vector-geo/).

## 📝 Tổng kết

1. **Oxyz**: mỗi điểm = (x, y, z). d = √(Δx² + Δy² + Δz²).
2. **Mặt phẳng**: Ax + By + Cz + D = 0. Vector pháp n = (A,B,C).
3. **Đường thẳng**: tham số x = x₀ + at, y = y₀ + bt, z = z₀ + ct.
4. **Khoảng cách điểm-mặt**: |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²).
5. **Đặc thù 3D**: 2 đường có thể **chéo nhau** (không có ở 2D).
`;
