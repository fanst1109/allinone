# Lesson 03 — Trị riêng & Vector riêng

## Mục tiêu

- Hiểu **trị riêng λ** và **vector riêng v** của ma trận.
- Phương trình đặc trưng: det(A - λI) = 0.
- Áp dụng: chéo hóa ma trận, lũy thừa ma trận nhanh, PCA.

## Kiến thức tiền đề

- [Lesson 02 — Định thức](../lesson-02-determinants-linear-systems/).

---

## 1. Định nghĩa

💡 **Trực giác**: Vector v ≠ 0 được gọi là **vector riêng** của A nếu A·v = λ·v với λ là 1 số (gọi là **trị riêng**).

```
A·v = λ·v   (v ≠ 0)
```

Ý nghĩa: A biến v thành **bội** của v — **không đổi hướng**, chỉ co/giãn theo hệ số λ.

**Ví dụ**: A = [[3,1],[0,2]]. v = (1, 0).
- A·v = (3, 0) = 3·v. → λ = 3, v là vector riêng.

---

## 2. Tìm trị riêng — Phương trình đặc trưng

Từ A·v = λ·v ⟺ (A - λI)·v = 0 ⟺ v thuộc null space của (A - λI).

⟶ Để có v ≠ 0, cần (A - λI) **không khả nghịch**:
```
det(A - λI) = 0
```

Đây là **phương trình đặc trưng** (characteristic equation), bậc n. Nghiệm = trị riêng.

### Ví dụ 2×2

A = [[2, 1], [1, 2]].

det(A - λI) = det [[2-λ, 1], [1, 2-λ]] = (2-λ)² - 1 = λ² - 4λ + 3 = 0.

⟶ λ = 1 hoặc λ = 3.

### Tìm vector riêng

**Với λ = 1**: (A - I)·v = 0.
- [[1, 1], [1, 1]]·v = 0.
- v₁ + v₂ = 0 → v = (1, -1) (hoặc bội).

**Với λ = 3**: (A - 3I)·v = 0.
- [[-1, 1], [1, -1]]·v = 0.
- v = (1, 1).

---

## 3. Chéo hóa ma trận

Nếu A có n trị riêng và n vector riêng độc lập tuyến tính, A "chéo hóa được":
```
A = P · D · P⁻¹
```

trong đó:
- **P** = ma trận có các vector riêng là cột.
- **D** = ma trận đường chéo với trị riêng λ₁, ..., λₙ.

### Lợi ích — Tính A^n nhanh

```
A^n = P · D^n · P⁻¹
```

D^n dễ tính (chỉ cần λᵢ^n trên đường chéo).

**Ví dụ**: A = [[2,1],[1,2]]. Trị riêng λ = 1, 3.
- P = [[1, 1], [-1, 1]]. D = [[1, 0], [0, 3]].
- A^10 = P·D^10·P⁻¹ = P·[[1,0],[0,59049]]·P⁻¹.

⟶ Khỏi nhân ma trận A với chính nó 10 lần.

---

## 4. Áp dụng — PCA (Principal Component Analysis)

🎯 **PCA**: giảm chiều dữ liệu trong AI/ML.
1. Tính **ma trận hiệp phương sai** C của dữ liệu.
2. Tìm trị riêng & vector riêng của C.
3. Chọn k vector riêng ứng với k trị riêng lớn nhất.
4. Chiếu dữ liệu lên không gian con này.

⟶ **Vector riêng = trục chính** của dữ liệu. **Trị riêng = độ "rộng"** theo trục đó.

Đây là 1 trong những thuật toán quan trọng nhất ML — cốt lõi của face recognition (Eigenfaces), nén ảnh, ...

---

## 5. Một số tính chất

- **Trace** = tổng trị riêng. Tr(A) = Σ λᵢ.
- **Det** = tích trị riêng. det(A) = ∏ λᵢ.
- **Ma trận đối xứng** (A = A^T): trị riêng đều là số thực, vector riêng trực giao nhau.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tìm trị riêng của A = [[4, 1], [2, 3]].

**Bài 2**: Tìm vector riêng tương ứng của A ở Bài 1.

**Bài 3**: Cho A = [[5, 0], [0, -2]]. Tính trace và det. So sánh với tổng & tích trị riêng.

**Bài 4**: Ma trận A có trị riêng λ = 2 (bội 1) và λ = -1. Tính det(A).

**Bài 5**: A là ma trận quay 90° R(π/2) = [[0, -1], [1, 0]]. Tính trị riêng. Nhận xét?

### Lời giải

**Bài 1**: det([[4-λ, 1], [2, 3-λ]]) = (4-λ)(3-λ) - 2 = λ² - 7λ + 10 = 0. → λ = 2, 5.

**Bài 2**:  
- λ = 2: (A-2I)·v = 0 → [[2, 1], [2, 1]]v = 0 → 2v₁ + v₂ = 0 → v = (1, -2).  
- λ = 5: (A-5I)·v = 0 → [[-1, 1], [2, -2]]v = 0 → v₁ = v₂ → v = (1, 1).

**Bài 3**: Trace = 5 + (-2) = 3. Det = -10. Trị riêng = 5, -2. Σ = 3 ✓. ∏ = -10 ✓.

**Bài 4**: det = 2·(-1) = -2.

**Bài 5**: det(R - λI) = λ² + 1 = 0 → λ = ±i (số phức!). → R không chéo hóa được trên ℝ, chỉ trên ℂ. Hợp lý: quay 90° không có vector nào "bất biến hướng" trong ℝ².

---

## 7. Bài tiếp theo

[Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/).

## 📝 Tổng kết

1. **A·v = λ·v** với v ≠ 0. λ = trị riêng, v = vector riêng.
2. **det(A - λI) = 0** → tìm trị riêng. Sau đó giải (A - λI)v = 0 → vector riêng.
3. **Chéo hóa**: A = PDP⁻¹. Tính A^n nhanh.
4. **Trace = Σ λ, Det = ∏ λ**.
5. Ứng dụng: **PCA, Eigenfaces, dynamic systems**.
