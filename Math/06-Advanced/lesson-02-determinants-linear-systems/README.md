# Lesson 02 — Định thức & Hệ tuyến tính

## Mục tiêu

- Tính **định thức** ma trận 2×2, 3×3.
- Ý nghĩa hình học: **tỉ lệ phóng đại diện tích/thể tích**.
- Giải **hệ tuyến tính** bằng Cramer, Gauss.
- Ma trận khả nghịch ⟺ det ≠ 0.

## Kiến thức tiền đề

- [Lesson 01 — Vector & ma trận](../lesson-01-vectors-matrices/).

---

## 1. Định thức 2×2

```
det [a b]  =  a·d - b·c
    [c d]
```

**Ví dụ**: det([[1, 2], [3, 4]]) = 1·4 - 2·3 = -2.

### Ý nghĩa hình học

|det(A)| = **tỉ lệ phóng đại diện tích** khi A biến đổi mặt phẳng.

- |det| > 1: phóng to.
- |det| = 1: bảo toàn diện tích.
- |det| < 1: thu nhỏ.
- det = 0: vắt phẳng (collapse) — chiều giảm.
- det < 0: lật (reverse orientation).

**Ví dụ**: Ma trận quay R(θ) có det = cos²θ + sin²θ = **1** → bảo toàn diện tích, không lật.

---

## 2. Định thức 3×3

```
det [a b c]
    [d e f]  =  a·(ei-fh) - b·(di-fg) + c·(dh-eg)
    [g h i]
```

(Khai triển theo hàng 1.)

⟶ Tổng quát: định thức tổng quát có **n!** số hạng — tăng nhanh.

---

## 3. Tính chất định thức

1. **det(I) = 1**.
2. **det(A·B) = det(A)·det(B)** (rất quan trọng).
3. **det(A^T) = det(A)**.
4. **det(c·A) = cⁿ·det(A)** (A n×n, c số).
5. Đổi 2 hàng → det đổi dấu.
6. 2 hàng giống nhau → det = 0.
7. Hàng nhân c → det nhân c.

---

## 4. Hệ tuyến tính — A·x = b

**Mẫu**: cho ma trận A (n×n), vector b. Tìm x.

```
A·x = b
```

**Trường hợp khả nghịch**: A⁻¹ tồn tại ⟺ det(A) ≠ 0. Khi đó:
```
x = A⁻¹·b
```

---

## 5. Quy tắc Cramer

🎯 **Phát biểu**: Cho A khả nghịch (det ≠ 0):
```
xᵢ = det(Aᵢ) / det(A)
```

trong đó **Aᵢ** = ma trận A với cột thứ i thay bằng b.

**Ví dụ**: Giải hệ:
```
2x + y = 5
x + 3y = 10
```

A = [[2,1],[1,3]], b = (5, 10). det(A) = 6 - 1 = 5.

- A₁ = [[5,1],[10,3]] → det = 15 - 10 = 5. x = 5/5 = **1**.
- A₂ = [[2,5],[1,10]] → det = 20 - 5 = 15. y = 15/5 = **3**.

**Kiểm tra**: 2·1 + 3 = 5 ✓. 1 + 9 = 10 ✓.

---

## 6. Phương pháp Gauss — Khử biến

🎯 **Ý tưởng**: Biến đổi hàng để đưa ma trận về dạng **tam giác trên**, rồi giải ngược.

**3 phép biến đổi hàng cơ bản**:
1. Đổi 2 hàng.
2. Nhân hàng với số ≠ 0.
3. Cộng hàng vào hàng khác (sau khi nhân hằng).

### Ví dụ
```
2x + y + z = 5
x + 3y + 2z = 11
3x + y + 4z = 12
```

Bước 1 (hàng 1 chia 2):
```
x + 0.5y + 0.5z = 2.5
x + 3y + 2z = 11
3x + y + 4z = 12
```

Bước 2 (hàng 2 trừ hàng 1, hàng 3 trừ 3·hàng 1):
```
x + 0.5y + 0.5z = 2.5
2.5y + 1.5z = 8.5
-0.5y + 2.5z = 4.5
```

Bước 3 (hàng 2 chia 2.5):
```
y + 0.6z = 3.4
-0.5y + 2.5z = 4.5
```

Bước 4 (hàng 3 cộng 0.5·hàng 2):
```
y + 0.6z = 3.4
2.8z = 6.2
```

Giải ngược: z = 6.2/2.8 ≈ 2.214. y = 3.4 - 0.6·2.214 ≈ 2.07. x = 2.5 - 0.5·2.07 - 0.5·2.214 ≈ 0.36.

⟶ Gauss luôn giải được, không cần tính định thức.

---

## 7. Phân loại nghiệm hệ A·x = b

| det(A) | b | Số nghiệm |
|--------|---|-----------|
| ≠ 0 | bất kỳ | **1 nghiệm duy nhất** |
| = 0 | thuộc Image(A) | **vô số nghiệm** |
| = 0 | không thuộc Image(A) | **vô nghiệm** |

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính det([[3, 1], [4, 2]]).

**Bài 2**: Tính det([[1, 2, 3], [0, 1, 4], [5, 6, 0]]).

**Bài 3**: Dùng Cramer giải: 3x + 2y = 11, x - y = -2.

**Bài 4**: Ma trận A có det = 0 nghĩa là gì hình học?

**Bài 5**: A và B đều n×n. det(A) = 3, det(B) = -2. Tính det(A·B), det(2A), det(A^T).

### Lời giải

**Bài 1**: 3·2 - 1·4 = **2**.

**Bài 2**: Khai triển hàng 1:  
- 1·(1·0 - 4·6) - 2·(0·0 - 4·5) + 3·(0·6 - 1·5)  
- = 1·(-24) - 2·(-20) + 3·(-5) = -24 + 40 - 15 = **1**.

**Bài 3**: det = -3 - 2 = -5. det A₁ = -11 - (-4) = -7 → x = -7/-5 = **7/5**. det A₂ = -6 - 11 = -17 → y = -17/-5 = **17/5**.

**Bài 4**: A biến đổi "vắt phẳng" — diện tích thành 0. Ảnh nằm trên đường thẳng (2D) hoặc mặt phẳng (3D), chiều giảm.

**Bài 5**:  
- det(AB) = 3·(-2) = **-6**.  
- det(2A) = 2ⁿ · 3 (phụ thuộc n).  
- det(A^T) = **3**.

---

## 9. Bài tiếp theo

[Lesson 03 — Trị riêng & vector riêng](../lesson-03-eigenvalues-eigenvectors/).

## 📝 Tổng kết

1. **det 2×2**: ad - bc. **3×3**: khai triển hàng (Sarrus).
2. **|det|** = tỉ lệ phóng đại diện tích/thể tích. det = 0 → vắt phẳng.
3. **det(AB) = det(A)·det(B)**.
4. **Hệ A·x = b**: Cramer (n nhỏ), Gauss (thực dụng).
5. det ≠ 0 ⟺ A khả nghịch ⟺ hệ có 1 nghiệm duy nhất.
