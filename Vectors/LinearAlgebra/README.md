# Tầng 4 — Linear Algebra (Đại số tuyến tính)

Đây là **trái tim** của lộ trình. Mọi thứ ở Tầng 1-3 hội tụ về đây: số → tuple số có thứ tự = **vector**. Tầng này dạy bạn:
- **Vector** chính thức: đối tượng có phép cộng, scalar multiplication, norm, dot product.
- **Ma trận**: hàm biến đổi vector (linear transformation).
- **Eigenvector & eigenvalue**: hướng "không bị xoay" — nền của PCA, PageRank, spectral methods.
- **PCA & SVD**: giảm chiều dữ liệu — kỹ thuật nền của LSA, recommendation system, image compression.

## Mục tiêu tổng quát

- Phân biệt vector hình học (mũi tên) và đại số (mảng số) — biết cả 2 nhìn vào cùng đối tượng.
- Tính toán thành thạo dot product, norm, cosine similarity, projection.
- Hiểu ma trận như "hàm biến đổi vector" — đọc được `Ax = b`.
- Áp dụng được PCA và SVD bằng tay cho dataset nhỏ.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-vectors/) | Vector chính thức | Định nghĩa, phép toán cơ bản, không gian ℝⁿ |
| [Lesson 02](./lesson-02-dot-product/) | Dot product + cosine similarity | u·v, góc giữa vector, **cosine sim chính thức** |
| [Lesson 03](./lesson-03-norm-distance/) | Norm và khoảng cách | L1, L2, L∞, projection |
| [Lesson 04](./lesson-04-linear-independence/) | Độc lập tuyến tính, basis | Span, basis, dimension |
| [Lesson 05](./lesson-05-matrices/) | Ma trận: phép toán | Cộng, nhân, transpose, inverse |
| [Lesson 06](./lesson-06-matrix-as-transform/) | Ma trận = biến đổi | Linear map, kernel, image, rank |
| [Lesson 07](./lesson-07-eigenvectors/) | Eigenvector & eigenvalue | Hướng "không bị xoay", spectral |
| [Lesson 08](./lesson-08-pca-svd/) | PCA và SVD | Giảm chiều, latent semantic, image compression |

## Trang chính của tầng

[`index.html`](./index.html) — danh sách card cho 8 bài.

## Kiến thức tiền đề

- [Tầng 1 Algebra](../Algebra/): hàm số, hệ phương trình tuyến tính (Lesson 08).
- [Tầng 2 Trigonometry](../Trigonometry/): rotation matrix (Lesson 06), cosine similarity preview (Lesson 05).
- [Tầng 3 Calculus](../Calculus/): gradient (Lesson 06), gradient descent (Lesson 07).

## Sau khi xong tầng này

Sang **Tầng 5 — Probability** để học xác suất, Bayes, MLE, cross-entropy — kết hợp với linear algebra để tạo nên backbone của ML.
