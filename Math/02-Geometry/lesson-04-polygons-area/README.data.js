// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-04-polygons-area/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Đa giác & Diện tích

## Mục tiêu

- Hiểu khái niệm **đa giác** (lồi vs lõm, đều vs thường).
- Tính tổng các **góc trong** và **góc ngoài** của đa giác.
- Biết công thức diện tích các hình phẳng phổ biến: tam giác, hình vuông, hình chữ nhật, hình thoi, hình thang, hình bình hành, lục giác đều, đường tròn.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/), [Lesson 03 — Đường tròn](../lesson-03-circles/).

---

## 1. Đa giác

**Đa giác** = hình phẳng đóng tạo bởi các đoạn thẳng (gọi là **cạnh**) nối nhau tại các **đỉnh**.

### 1.1. Phân loại

- **Đều (regular)**: mọi cạnh + mọi góc đều bằng nhau. Vd tam giác đều, hình vuông, lục giác đều.
- **Lồi (convex)**: mọi góc trong < 180°. Đường thẳng nối 2 điểm bất kỳ trong đa giác đều nằm bên trong.
- **Lõm (concave)**: có ít nhất 1 góc trong > 180° (có "lỗi vào").

### 1.2. Tổng góc trong

Đa giác **n cạnh** có:
\`\`\`
Tổng góc trong = (n − 2) · 180°
\`\`\`

💡 **Vì sao?** Vì n-giác có thể chia thành **(n−2) tam giác** bằng các đường chéo từ 1 đỉnh → tổng góc trong = (n−2)·180°.

> 📐 **Định nghĩa đầy đủ — Tổng góc trong đa giác**
>
> **(a) Là gì**: Quy luật tuyến tính theo số cạnh n. Cộng tất cả n góc trong của 1 đa giác lồi luôn ra đúng (n−2)·180°. Không phụ thuộc hình cụ thể — đều, không đều đều như nhau.
>
> **(b) Vì sao cần**: Vì cho phép tính nhanh góc của đa giác mà không cần đo. Ngược lại, dùng để xác định **đa giác đều** mỗi góc bao nhiêu, suy ra n từ số đo góc. Cũng là nền cho bài toán "lát mặt phẳng" (tessellation) — chỉ tam giác, tứ giác, lục giác đều lát được vì góc của chúng chia đều 360°.
>
> **(c) Ví dụ số**: Tam giác (n=3): (3-2)·180 = **180°** ✓. Tứ giác (n=4): 2·180 = **360°** ✓ (4 góc 90° trong hình chữ nhật). Ngũ giác đều: 3·180 = 540°, mỗi góc = 540/5 = **108°**. Lục giác đều: 4·180 = 720°, mỗi góc = 120°. Bát giác đều (như đường giao thông STOP): 6·180 = 1080°, mỗi góc = 135°.

**Đa giác đều n cạnh**: mỗi góc trong = (n−2)·180°/n.

| n | Tên | Mỗi góc trong (đều) |
|---|-----|---------------------|
| 3 | Tam giác | 60° |
| 4 | Tứ giác | 90° |
| 5 | Ngũ giác | 108° |
| 6 | Lục giác | 120° |
| 8 | Bát giác | 135° |
| 12 | Thập nhị giác | 150° |
| ∞ | (đường tròn) | 180° (giới hạn) |

### 1.3. Tổng góc ngoài

\`\`\`
Tổng góc ngoài (bất kỳ đa giác lồi) = 360°
\`\`\`

(Vì đi 1 vòng quanh đa giác = xoay 360°.)

---

## 2. Diện tích các hình

### 2.1. Bảng công thức

| Hình | Diện tích |
|------|-----------|
| Hình vuông cạnh a | **a²** |
| Hình chữ nhật cạnh a, b | **a · b** |
| Tam giác đáy a, cao h | **(1/2) · a · h** |
| Hình bình hành đáy a, cao h | **a · h** |
| Hình thang đáy a, b, cao h | **(1/2)(a + b)·h** |
| Hình thoi 2 đường chéo d₁, d₂ | **(1/2) · d₁ · d₂** |
| Đường tròn bán kính R | **π · R²** |
| Lục giác đều cạnh a | **(3√3/2) · a²** |

### 2.2. Diện tích tam giác đều cạnh a

S = (a · cao)/2 = (a · (a√3/2))/2 = **(√3/4) · a²**.

### 2.3. Walk-through — Lục giác đều

Lục giác đều cạnh a = **6 tam giác đều** ghép lại (mỗi tam giác cạnh a).
- S_lục_giác = 6 · (√3/4)·a² = **(3√3/2)·a²**.

Cách khác: bán kính đường tròn ngoại tiếp = a (vì 6 tam giác đều có cạnh = bán kính). Hữu ích trong thực tế (mặt cắt tổ ong, bu-lông).

---

## 3. Bài tập

### Bài tập

**Bài 1**: Tổng góc trong của bát giác (8 cạnh).

**Bài 2**: Mỗi góc trong của thập giác đều.

**Bài 3**: Hình thang cân, 2 đáy 5 và 11, cao 4. Tính diện tích.

**Bài 4**: Hình thoi 2 đường chéo 6 và 8. Tính diện tích và độ dài cạnh.

**Bài 5**: Sân bóng đá hình chữ nhật 105m × 68m. Diện tích bao nhiêu m²?

**Bài 6**: Lục giác đều cạnh 4 cm. Tính diện tích.

### Lời giải

**Bài 1**: (8−2) · 180 = **1080°**.

**Bài 2**: (10−2)·180/10 = 1440/10 = **144°**.

**Bài 3**: S = (1/2)(5 + 11)·4 = (1/2)·16·4 = **32**.

**Bài 4**: S = (1/2)·6·8 = **24**. Cạnh = √((6/2)² + (8/2)²) = √(9+16) = **5** (vì 2 đường chéo cắt nhau ⊥ tại trung điểm).

**Bài 5**: 105 × 68 = **7,140 m²**.

**Bài 6**: S = (3√3/2)·16 = 24√3 ≈ **41.57 cm²**.

---

## 4. Bài tiếp theo

[Lesson 05 — Hình học không gian](../lesson-05-solid-geometry/).

## 📝 Tổng kết

1. **Đa giác**: lồi/lõm, đều/thường.
2. **Tổng góc trong** = (n−2)·180°. **Tổng góc ngoài** = 360°.
3. **Diện tích**: nhớ công thức 7-8 hình phổ biến.
4. **Lục giác đều** = 6 tam giác đều ghép.
`;
