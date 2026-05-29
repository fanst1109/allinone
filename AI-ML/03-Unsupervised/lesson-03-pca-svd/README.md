# Lesson T3-03 — PCA & SVD

> **Câu hỏi mở bài**: Bạn có dataset iris 150 điểm × 4 chiều (sepal_length, sepal_width, petal_length, petal_width). Không thể vẽ lên màn hình 2D. Làm thế nào **nén xuống 2 chiều mà giữ tối đa thông tin**? Và 2 chiều đó có nghĩa gì — chúng là gì trong không gian gốc?

PCA trả lời: tìm 2 hướng mà data "spread" nhiều nhất (variance lớn nhất), chiếu data lên 2 hướng đó. 95% variance được giữ lại, mất 5% — trade-off chấp nhận được.

## Mục tiêu học tập

Sau bài này, bạn sẽ:
- Thực hiện PCA via eigendecomposition của covariance matrix, từng bước với số thực.
- Giải thích tại sao PCA chọn eigenvector → eigenvalue lớn nhất = hướng variance lớn nhất.
- Liên hệ PCA với SVD: X̃ = UΣVᵀ và principal components = columns of V.
- Đọc **scree plot** và **variance explained** để chọn số component k.
- Tính reconstruction error (bao nhiêu thông tin mất đi khi dùng k < d).
- Nhận ra hạn chế của PCA (linear only) và khi nào cần t-SNE/UMAP.

## Kiến thức tiền đề

- [Vectors/Linear Algebra: eigenvector, eigenvalue, SVD](../../../Vectors/) — cốt lõi của bài này.
- Covariance matrix: `Cov(X) = (1/n) X̃ᵀ X̃`, centered data `X̃ = X − μ`.
- [T3-L01: K-means](../lesson-01-kmeans-hierarchical/) — biết tại sao cần giảm chiều trước khi cluster.

---

## 1. Động Lực — Tại Sao Giảm Chiều?

### 1.1. Ba Lý Do Chính

**Lý do 1 — Visualization**: data >3D không thể plot trực tiếp. PCA nén về 2D/3D để nhìn cấu trúc.

**Lý do 2 — Curse of dimensionality**: với d chiều lớn, mọi điểm trở nên "cách đều nhau" → distance metrics mất ý nghĩa → K-means, KNN kém. PCA loại bỏ chiều dư thừa.

**Lý do 3 — Noise reduction**: nhiều chiều chứa noise hơn signal. PCA giữ lại các hướng có variance lớn (signal) và loại bỏ hướng variance nhỏ (noise).

> 💡 **Hình dung**: tưởng tượng 1 đám mây điểm hình elip nghiêng 45° trong không gian 2D. Trục dài của elip = PC1 (hướng spread nhiều nhất). Trục ngắn = PC2 (hướng vuông góc, spread ít hơn). Nếu elip rất dẹt, chiếu xuống PC1 giữ ~90% variance → 1D là đủ.

### 1.2. Ví Dụ Giá Nhà 2D → 1D

Đặc trưng: diện tích (x₁) và số phòng (x₂) — tương quan cao vì nhà lớn có nhiều phòng hơn.

Data 5 điểm: (50,2), (80,3), (100,4), (130,5), (150,6).

PCA sẽ tìm ra PC1 ≈ hướng (0.7, 0.7) — tổ hợp tuyến tính của diện tích và số phòng. PC2 ≈ hướng (0.7, −0.7) — sự khác biệt giữa diện tích và số phòng (chiều này variance nhỏ hơn nhiều).

---

## 2. PCA via Eigendecomposition

### 2.1. 5 Bước Thuật Toán

**Input**: ma trận data X (n×d).

**Bước 1 — Centering**:
```
X̃ = X − μ,   μ = (1/n) Σᵢ xᵢ   (mean của từng feature)
```

**Bước 2 — Covariance matrix**:
```
C = (1/n) X̃ᵀ X̃     (d×d, symmetric positive semi-definite)
```

**Bước 3 — Eigendecomposition**:
```
C = V Λ Vᵀ
```
- V = ma trận eigenvector, mỗi cột là 1 eigenvector.
- Λ = ma trận diagonal chứa eigenvalue λ₁ ≥ λ₂ ≥ … ≥ λ_d.

**Bước 4 — Sort**: sắp xếp eigenvector theo eigenvalue giảm dần.

**Bước 5 — Project**:
```
Z = X̃ · V_k     (n×k, V_k là k cột đầu của V)
```

### 2.2. Walk-through Số Cụ Thể — 2D Data

Data 4 điểm: P1=(2,1), P2=(3,2), P3=(4,3), P4=(5,4).

**Bước 1 — Centering**:
```
μ = ((2+3+4+5)/4, (1+2+3+4)/4) = (3.5, 2.5)

X̃:
P1: (2−3.5, 1−2.5) = (−1.5, −1.5)
P2: (3−3.5, 2−2.5) = (−0.5, −0.5)
P3: (4−3.5, 3−2.5) = (0.5, 0.5)
P4: (5−3.5, 4−2.5) = (1.5, 1.5)
```

**Bước 2 — Covariance matrix**:
```
C = (1/4) × [[-1.5,-0.5,0.5,1.5],  [-1.5,-0.5,0.5,1.5]]ᵀ × ...

C = (1/4) Σ x̃ᵢ x̃ᵢᵀ
  = (1/4) [(-1.5)²+(-0.5)²+(0.5)²+(1.5)²,    (-1.5)(-1.5)+...   ]
  = (1/4) [           5.0,                      5.0                ]
          [           5.0,                      5.0                ]
  = [[1.25, 1.25],
     [1.25, 1.25]]
```

Verify: `C[0,0] = (1/4)((-1.5)²+(-0.5)²+(0.5)²+(1.5)²) = (1/4)(2.25+0.25+0.25+2.25) = 5/4 = 1.25` ✓

**Bước 3 — Eigendecomposition** của C = [[1.25,1.25],[1.25,1.25]]:

`det(C - λI) = (1.25-λ)² - 1.25² = 0`
`(1.25-λ)² = 1.5625`
`1.25-λ = ±1.25`
`λ₁ = 2.5,  λ₂ = 0`

Eigenvector cho λ₁=2.5:
`(C − 2.5I)v = 0 → [[-1.25,1.25],[1.25,-1.25]]v = 0 → v₁ = (1/√2, 1/√2) ≈ (0.707, 0.707)`

Eigenvector cho λ₂=0:
`v₂ = (1/√2, −1/√2) ≈ (0.707, −0.707)`

> 💡 **Giải thích**: tất cả 4 điểm nằm trên đường thẳng y=x−1.5 → chỉ có 1 hướng có variance (hướng (1,1) normalize). Hướng vuông góc (1,−1) không có variance nào → λ₂=0. PCA phát hiện đúng!

**Bước 5 — Project lên PC1** (k=1):
```
Z = X̃ · v₁
z(P1) = (-1.5)(0.707) + (-1.5)(0.707) = -2.121
z(P2) = (-0.5)(0.707) + (-0.5)(0.707) = -0.707
z(P3) = (0.5)(0.707) + (0.5)(0.707)   = 0.707
z(P4) = (1.5)(0.707) + (1.5)(0.707)   = 2.121
```

**Variance explained**: λ₁/(λ₁+λ₂) = 2.5/(2.5+0) = **100%** — hoàn toàn hợp lý vì data nằm trên đường thẳng.

### 2.3. Variance Explained và Scree Plot

**Variance explained** của component j:
```
VE(j) = λⱼ / Σₖ λₖ
```

**Cumulative variance explained** (CVE):
```
CVE(m) = Σⱼ₌₁ᵐ λⱼ / Σₖ λₖ
```

**Ví dụ iris dataset** (4 features, eigenvalues: λ₁=2.918, λ₂=0.914, λ₃=0.147, λ₄=0.021, tổng=4.0):

| Component | Eigenvalue | VE(%) | CVE(%) |
|-----------|-----------|-------|--------|
| PC1 | 2.918 | 72.96 | 72.96 |
| PC2 | 0.914 | 22.85 | 95.81 |
| PC3 | 0.147 | 3.67  | 99.48 |
| PC4 | 0.021 | 0.52  | 100.00 |

→ **2 components** giữ 95.81% variance — đủ tốt! Scree plot cho thấy elbow sau PC2.

> 🔁 **Kiểm tra nhanh**: Nếu iris có eigenvalues [3.5, 0.3, 0.1, 0.1], cần bao nhiêu components để đạt 90% variance?
> <details><summary>Đáp án</summary>
>
> Tổng = 4.0. PC1 = 3.5/4.0 = 87.5%. PC1+PC2 = (3.5+0.3)/4.0 = 95% ≥ 90%. → Cần **2 components** (CVE 95%).
> </details>

---

## 3. PCA via SVD

### 3.1. Tại Sao Dùng SVD?

Eigendecomposition của C = (1/n)X̃ᵀX̃ có thể bị **numerically unstable** khi X̃ có điều kiện số xấu (small eigenvalues → floating point errors). SVD on X̃ trực tiếp là numerically stable hơn.

### 3.2. Kết Nối X̃ = UΣVᵀ với PCA

```
X̃ = U Σ Vᵀ     (thin SVD: U n×k, Σ k×k diagonal, V d×k)
```

Lúc đó:
```
X̃ᵀ X̃ = (UΣVᵀ)ᵀ (UΣVᵀ) = VΣUᵀUΣVᵀ = VΣ²Vᵀ
```

Vì `UᵀU = I` (U orthonormal). So sánh với eigendecomposition `C = VΛVᵀ`:

→ **V từ SVD = eigenvector matrix V từ eigendecomp**, và `λⱼ = σⱼ²/n` (σⱼ là singular value).

**Walk-through số** — kiểm chứng với ví dụ 2D ở trên:

X̃ = [[-1.5,-1.5],[-0.5,-0.5],[0.5,0.5],[1.5,1.5]] (4×2 matrix).

SVD: X̃ = UΣVᵀ. Vì X̃ = c·[1,1]ᵀ·[coefficients] (rank-1 matrix):

σ₁ = ‖X̃‖_F = √(1.5²+1.5²+0.5²+0.5²+0.5²+0.5²+1.5²+1.5²) = √10 ≈ 3.162.

V[:,0] = (1/√2, 1/√2) = (0.707, 0.707) ✓ — khớp với eigenvector PC1.

λ₁ = σ₁²/n = 10/4 = 2.5 ✓ — khớp với eigenvalue.

> ❓ **Câu hỏi tự nhiên**: sklearn dùng method nào, eigendecomp hay SVD?
>
> **`sklearn.decomposition.PCA`** dùng SVD (LAPACK `_gesdd`). Lý do: stable hơn, không cần tính X̃ᵀX̃ (tránh squaring condition number). Với large n, thin SVD = full covariance eigendecomp nhưng hiệu quả hơn.

### 3.3. Reconstruction và Reconstruction Error

**Reconstruction** (từ k components về d chiều):
```
X̂ = Z · Vₖᵀ + μ     (Z = X̃ Vₖ là projected data)
```

**Reconstruction error**:
```
E_k = Σⱼ₌ₖ₊₁ᵈ λⱼ / Σⱼ₌₁ᵈ λⱼ  =  1 − CVE(k)
```

**Ví dụ iris**: dùng k=2 components → reconstruction error = 1 − 0.9581 = 4.19%. Dùng k=3 → error = 0.52%.

> ⚠ **Hạn chế quan trọng của PCA**: PCA chỉ bắt được **linear relationships**. Nếu data có cấu trúc phi tuyến (hình xoắn ốc, moons, Swiss roll), PCA không giữ được cấu trúc cục bộ → cần t-SNE hoặc UMAP (Lesson T3-04).

---

## 4. Ứng Dụng Thực Tế

### 4.1. PCA trên MNIST (784D → 50D)

MNIST: 60,000 ảnh 28×28 = 784 pixel mỗi ảnh. Dùng d=784 chiều cho KNN rất chậm.

Eigenvalues của MNIST covariance matrix:
- PC1-PC50 tổng cộng: ~90% variance.
- PC1-PC100: ~95% variance.

→ PCA → 50D rồi KNN trên 50D: nhanh hơn ~15x, accuracy giảm ít (<1%) so với KNN trên 784D.

### 4.2. PCA cho Denoising

Nếu data = signal + noise (noise ở các chiều có variance nhỏ):
1. PCA → giữ top-k components (signal).
2. Reconstruct từ k components → noise bị bỏ.

**Walk-through**: đường thẳng y=2x với noise Gaussian σ=0.3. PCA → PC1 là hướng y=2x, PC2 là hướng vuông góc (noise). Reconstruct từ PC1 → smoother curve, noise giảm đáng kể.

### 4.3. Whitening (PCA Whitening)

Sau PCA, nếu chia thêm các component cho √λⱼ:
```
Z_white[:,j] = Z[:,j] / √λⱼ
```

→ Mỗi component có variance = 1. Hữu ích cho preprocessing trước neural network, Gaussian mixture model.

> 📝 **Tóm tắt**: PCA = find directions of maximum variance. Eigendecomp của covariance matrix hoặc SVD của centered data X̃ — cùng kết quả. Scree plot chọn k. Reconstruction error = 1 − CVE(k). Linear only → không bắt non-linear structure.

---

## 5. Bài Tập

**Bài 1**: Data 3 điểm 2D: A=(0,0), B=(2,0), C=(1,1). Tính centroid μ, ma trận X̃, covariance matrix C, và eigenvector PC1.

**Bài 2**: Eigenvalues của một dataset: [5.2, 2.1, 1.3, 0.8, 0.4, 0.2]. Tổng = 10. Cần bao nhiêu component để đạt (a) 80% và (b) 95% variance? Tính CVE từng bước.

**Bài 3**: Tại sao PCA thất bại với data hình tròn đồng tâm (concentric circles)? Minh họa bằng 4 điểm.

**Bài 4**: Cho X̃ = [[3,0],[0,1],[-3,0],[0,-1]] (4×2 centered matrix). Tính SVD thủ công (singular values và right singular vectors V).

---

## 6. Lời Giải Chi Tiết

### Bài 1: PCA tay — 3 điểm 2D

**Centroid**: μ = ((0+2+1)/3, (0+0+1)/3) = (1, 1/3).

**Centered matrix X̃**:
```
A: (0−1, 0−1/3) = (−1, −1/3)
B: (2−1, 0−1/3) = (1, −1/3)
C: (1−1, 1−1/3) = (0, 2/3)
```

**Covariance matrix** C = (1/3)X̃ᵀX̃:
```
C[0,0] = (1/3)((-1)²+1²+0²) = 2/3 ≈ 0.667
C[0,1] = (1/3)((-1)(-1/3)+(1)(-1/3)+(0)(2/3)) = (1/3)(1/3−1/3) = 0
C[1,1] = (1/3)((-1/3)²+(-1/3)²+(2/3)²) = (1/3)(1/9+1/9+4/9) = (1/3)(6/9) = 2/9 ≈ 0.222

C = [[0.667, 0],
     [0,    0.222]]
```

**Eigenvalues**: C diagonal → λ₁=0.667, λ₂=0.222. **PC1 = (1,0)** (x-axis). VE(PC1) = 0.667/(0.667+0.222) = 0.667/0.889 ≈ **75%**.

Nhận xét: data spread theo trục x nhiều hơn trục y (range x: [0,2], range y: [0,1]) → kết quả hợp lý.

### Bài 2: Chọn số components

Eigenvalues: [5.2, 2.1, 1.3, 0.8, 0.4, 0.2], tổng=10.

| m | Σλ | CVE(%) |
|---|-----|--------|
| 1 | 5.2 | 52.0   |
| 2 | 7.3 | 73.0   |
| **3** | **8.6** | **86.0** |
| **4** | **9.4** | **94.0** |
| **5** | **9.8** | **98.0** |

(a) 80%: CVE(3)=86% ≥ 80% → cần **3 components**.
(b) 95%: CVE(4)=94% < 95%, CVE(5)=98% ≥ 95% → cần **5 components**.

### Bài 3: PCA thất bại với concentric circles

4 điểm 2D: inner ring: (1,0),(−1,0); outer ring: (2,0),(−2,0).

Centered (μ=0): X̃ = X. Covariance:
```
C[0,0] = (1²+(−1)²+2²+(−2)²)/4 = (1+1+4+4)/4 = 10/4 = 2.5
C[0,1] = 0, C[1,1] = 0
```

PC1 = (1,0) với λ₁=2.5. Chiếu tất cả lên PC1: inner ring → {1,−1}, outer ring → {2,−2}. **Vẫn chồng nhau theo một chiều** — nhưng thực tế 2 inner và 2 outer vẫn được phân chia bởi magnitude.

Vấn đề thực sự: với 8 điểm trên 2 circles có tâm chung, PCA chiếu xuống 1D không phân biệt được inner (r=1) và outer (r=2) nếu phân bố đều → cần radius = distance to center, là thông tin non-linear.

### Bài 4: SVD thủ công

X̃ = [[3,0],[0,1],[−3,0],[0,−1]].

X̃ᵀ X̃ = [[3²+0+3²+0, 0],[0, 0+1+0+1]] = [[18,0],[0,2]].

SVD: X̃ᵀX̃ diagonal → singular values² = eigenvalues = [18, 2].
- **σ₁ = √18 = 3√2 ≈ 4.243**, V[:,0] = (1,0).
- **σ₂ = √2 ≈ 1.414**, V[:,1] = (0,1).

Variance explained: PC1 = 18/(18+2) = 90%, PC2 = 10%.

Eigenvalues của C = X̃ᵀX̃/4: λ₁=18/4=4.5, λ₂=2/4=0.5.

---

## 7. Tham Khảo

- **ESL** Chapter 14.5 — Principal Components, Curves, and Surfaces.
- **ISL** Chapter 12.2 — Principal Components Analysis.
- Jolliffe (2002) — *Principal Component Analysis* (textbook kinh điển).
- Wattenberg et al. (2016) — *How to Use t-SNE Effectively* (distill.pub) — so sánh PCA, t-SNE.
- [Visualization tương tác](./visualization.html)
- Bridge: [Vectors/Linear Algebra — Eigenvectors & SVD](../../../Vectors/)

## Bài Tiếp Theo

→ [T3-L04: t-SNE & UMAP](../lesson-04-tsne-umap/) — non-linear dimensionality reduction cho visualization.
