// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/03-Unsupervised/lesson-04-tsne-umap/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson T3-04 — t-SNE & UMAP

> **Câu hỏi mở bài**: PCA chiếu MNIST 784D xuống 2D — nhưng các cluster digit chồng chéo, khó phân biệt. Làm thế nào hiển thị 10.000 ảnh trên màn hình 2D sao cho **các chữ số giống nhau tụm lại, khác nhau tách ra**? t-SNE và UMAP giải quyết chính xác bài toán này — không phải bằng cách maximize variance (như PCA), mà bằng cách **preserve neighborhood structure**.

## Mục tiêu học tập

Sau bài này, bạn sẽ:
- Giải thích t-SNE học gì: $P(j|i)$ trong high-dim và $Q_{ij}$ trong low-dim, minimize KL divergence.
- Biết tại sao t-SNE dùng t-distribution (heavy tail) thay vì Gaussian trong low-dim space.
- Chọn hyperparameter perplexity hợp lý và hiểu ảnh hưởng.
- Nhận ra 4 pitfall phổ biến khi đọc t-SNE plot.
- So sánh UMAP với t-SNE: nhanh hơn, global structure tốt hơn.
- Biết khi nào dùng PCA → t-SNE pipeline thay vì t-SNE trực tiếp.

## Kiến thức tiền đề

- [T3-L03: PCA & SVD](../lesson-03-pca-svd/) — hiểu dimensionality reduction.
- Xác suất: Gaussian distribution, KL divergence — $\\text{KL}(P\\|Q) = \\sum P \\log(P/Q)$.
- Gradient descent (T1 Foundations): minimize loss bằng GD.

---

## 1. Vấn Đề Của PCA Với High-Dim Data

### 1.1. PCA Chỉ Bắt Linear Structure

PCA maximize variance dọc theo các hướng tuyến tính. Data MNIST:
- Digit "1" và "7" trông giống nhau trong một số hướng linear → PCA đặt chúng gần nhau.
- Digit "0" và "6" có shape giống nhau → chồng nhau trong PCA 2D projection.
- Non-linear manifold (Swiss roll, MNIST "đa tạp") → PCA không "mở phẳng" được.

> 💡 **Hình dung**: MNIST digits nằm trên một **manifold** (đa tạp) 20–50 chiều nhúng trong 784D. PCA chiếu theo hướng variance lớn nhất trong 784D space — không theo cấu trúc của manifold. t-SNE và UMAP cố "theo dọc" manifold đó.

### 1.2. Mục Tiêu Của Non-Linear Dim Reduction

**Preserve neighborhood**: điểm gần nhau trong high-dim space phải gần nhau trong 2D representation. Điểm xa nhau có thể xa hoặc gần trong 2D — điều này không đảm bảo (chỉ local, không global).

---

## 2. t-SNE — t-distributed Stochastic Neighbor Embedding

### 2.1. Ý Tưởng Cốt Lõi

t-SNE (van der Maaten & Hinton, 2008) học một embedding Y = {y₁,…,yₙ} ∈ ℝ² sao cho "quan hệ xác suất hàng xóm" trong Y ≈ "quan hệ xác suất hàng xóm" trong X.

**Bước 1 — Xác suất trong high-dim** (dùng Gaussian):
\`\`\`
P(j|i) = exp(−‖xᵢ−xⱼ‖²/2σᵢ²) / Σₖ≠ᵢ exp(−‖xᵢ−xₖ‖²/2σᵢ²)
\`\`\`
$\\sigma_i$ được chọn tự động sao cho **perplexity** = $2^{H(P_i)}$ ≈ perplexity tham số ($H$ = entropy của $P_i$).

Đối xứng: $P_{ij} = (P(j|i) + P(i|j)) / 2n$.

**Bước 2 — Xác suất trong low-dim** (dùng t-distribution với 1 degree of freedom = Cauchy):
\`\`\`
Q_ij = (1 + ‖yᵢ−yⱼ‖²)⁻¹ / Σₖ≠ₗ (1 + ‖yₖ−yₗ‖²)⁻¹
\`\`\`

**Bước 3 — Minimize KL divergence**:
\`\`\`
Loss = KL(P || Q) = Σᵢⱼ Pᵢⱼ log(Pᵢⱼ / Qᵢⱼ)
\`\`\`

Tối ưu bằng **gradient descent** trên Y (các tọa độ 2D).

**Gradient**:
\`\`\`
∂KL/∂yᵢ = 4 Σⱼ (Pᵢⱼ − Qᵢⱼ)(yᵢ − yⱼ)(1 + ‖yᵢ−yⱼ‖²)⁻¹
\`\`\`

> 💡 **Tại sao t-distribution thay vì Gaussian trong low-dim?** — "Crowding problem". Trong 784D, một điểm có thể có nhiều hàng xóm "vừa gần vừa xa" đồng thời (nhiều chiều). Trong 2D, không đủ "diện tích" để đặt tất cả. Gaussian trong 2D → khoảng cách trung bình nhỏ → các điểm bị ép chặt. **t-distribution có heavy tail** → cho phép điểm "hơi xa" vẫn có $Q_{ij}$ đáng kể → map giải nén, cluster tách xa nhau hơn.

### 2.2. Walk-through Số Cụ Thể (Đơn Giản Hóa)

4 điểm high-dim (chỉ dùng scalar để đơn giản): x = [0, 1, 10, 11]. Perplexity = 2 (muốn 2 hàng xóm gần).

**Tính P(j|i) với σ=1 cho mọi i** (đơn giản hóa):

P(2|1), P(3|1), P(4|1) với x₁=0:
\`\`\`
exp(−1²/2) = exp(−0.5) ≈ 0.607   (j=2, dist=1)
exp(−10²/2) = exp(−50) ≈ 0       (j=3, dist=10)
exp(−11²/2) = exp(−60.5) ≈ 0     (j=4, dist=11)
Normalize: P(2|1) ≈ 1.0, P(3|1)≈0, P(4|1)≈0
\`\`\`

$P(1|2) \\approx 1{,}0$ ($x_2 = 1$, gần $x_1 = 0$). $P(3|2) \\approx \\exp(-40{,}5)/\\ldots \\approx 0$.

→ $P_{12} = (1+1)/(2 \\times 4) = 0{,}25$ (đối xứng, chia $2n = 8$).
$P_{34} = (1+1)/8 = 0{,}25$ tương tự.
$P_{13} \\approx 0$, $P_{24} \\approx 0$, v.v.

**Gradient descent** sẽ học $Y = \\{y_1, y_2, y_3, y_4\\}$ sao cho:
- $y_1, y_2$ gần nhau ($P_{12}$ lớn → attract).
- $y_3, y_4$ gần nhau ($P_{34}$ lớn).
- $\\{y_1, y_2\\}$ và $\\{y_3, y_4\\}$ xa nhau ($P_{13}, P_{23}, P_{14}, P_{24} \\approx 0$ → repel do $Q_{13} > P_{13}$).

> ❓ **Câu hỏi tự nhiên**: tại sao minimize KL(P||Q) chứ không phải KL(Q||P)?
>
> KL(P||Q) penalize nặng khi P lớn mà Q nhỏ (điểm gần trong high-dim mà xa trong low-dim → bad). Bỏ qua khi P nhỏ mà Q lớn (điểm xa trong high-dim mà gần trong low-dim → OK, vì 2D không đủ không gian). Đây là **asymmetric** — ưu tiên preserve closeness hơn farness.

### 2.3. Perplexity — Hyperparameter Quan Trọng Nhất

**Perplexity** ≈ số hàng xóm "hiệu dụng" mà model xem xét cho mỗi điểm.

$\\text{Perplexity} = 2^{H(P_i)}$ — exponential của Shannon entropy của distribution $P_i$.

| Perplexity | Ảnh hưởng |
|------------|-----------|
| Quá nhỏ (5) | Chỉ xem xét vài hàng xóm → noisy, structure bị phá vỡ, nhiều cluster nhỏ ảo |
| Vừa (30–50) | Cân bằng local/global → thường tốt nhất |
| Quá lớn (100+) | Xem quá nhiều hàng xóm → blur, cluster hợp nhau |

**Rule of thumb**: perplexity ∈ [5, 50]. Wattenberg et al. (distill.pub) khuyến nghị thử 3–4 giá trị và lấy đồng thuận.

**Walk-through số** — 3 cluster với 10 điểm mỗi cluster (30 điểm tổng):
- Perplexity=5: mỗi điểm chỉ xem 5 hàng xóm → cluster sub-divide → có thể thấy 6 cluster ảo.
- Perplexity=30: 30 hàng xóm ≈ toàn bộ 1 cluster → 3 cluster rõ ràng.
- Perplexity=50: overlap giữa cluster → 2-3 cluster mờ.

---

## 3. Pitfalls của t-SNE (Wattenberg et al., distill.pub)

> ⚠ **QUAN TRỌNG**: t-SNE rất dễ bị hiểu sai. Bốn pitfall dưới đây **đã gây ra nhiều kết luận sai trong nghiên cứu**.

### Pitfall 1: Cluster Sizes Vô Nghĩa

Cluster A có 100 điểm dense, cluster B có 100 điểm sparse. Trong t-SNE output, cả hai hiển thị với **kích thước tương đương**.

**Lý do**: t-SNE tự normalize trong từng cluster — density thật sự không được preserve.

> ⚠ Đừng suy luận rằng hai cluster có "tầm quan trọng bằng nhau" hay "số lượng tương đương" chỉ từ kích thước trong t-SNE plot.

### Pitfall 2: Khoảng Cách Giữa Cluster Vô Nghĩa

Cluster A và B trông "xa" trong t-SNE → chúng thật sự xa nhau trong high-dim? **Không chắc**.

**Lý do**: t-SNE chỉ đảm bảo local neighborhood. Global distances phụ thuộc vào random initialization, learning rate, số iterations.

**Demo**: cùng data, 2 random seed khác nhau → cluster A và B có thể gần hoặc xa nhau tùy lần chạy.

> ⚠ Không kết luận "nhóm A và B không liên quan" chỉ vì chúng xa nhau trong t-SNE.

### Pitfall 3: Cluster Ảo Từ Noise

Data hoàn toàn uniform random (không có cluster nào) → t-SNE thường **tạo ra cluster trông thật sự**.

**Lý do**: gradient descent tìm local minima → tạo "nhóm" ngay cả khi không có cấu trúc.

**Kiểm chứng**: chạy t-SNE nhiều lần, so sánh. Cũng nên chạy PCA để cross-check.

> ⚠ Không báo cáo cluster trong t-SNE mà chưa validate bằng phương pháp khác (K-means, thống kê).

### Pitfall 4: Topology Không Preserve

t-SNE có thể xé toạc một cluster thật thành 2 phần, hoặc hợp nhất 2 cluster khác nhau.

**Walk-through**: 3D data hình bánh donut (torus). PCA chiếu về 2D giữ được hình tròn. t-SNE có thể xé torus thành nhiều "mảnh" rời nhau vì torus có topology phức tạp.

> 📝 **Tóm tắt pitfalls**: 4 điều KHÔNG được kết luận từ t-SNE: (1) kích thước cluster = density/số lượng, (2) khoảng cách giữa cluster = similarity thật, (3) cluster = cluster thật (có thể noise), (4) topology của data được preserve.

---

## 4. UMAP — Uniform Manifold Approximation and Projection

### 4.1. So Sánh Với t-SNE

**UMAP** (McInnes et al., 2018) dựa trên lý thuyết topology (Riemannian manifold, fuzzy sets) nhưng về mặt thực hành:

| Tiêu chí | t-SNE | UMAP |
|---------|-------|------|
| Tốc độ (n=10.000) | ~1-5 phút | ~10-30 giây |
| Global structure | Kém (cluster distances vô nghĩa) | Tốt hơn (relative cluster positions có ý nghĩa hơn) |
| Local structure | Rất tốt | Tốt |
| Hyperparameters | perplexity, lr, n_iter | n_neighbors, min_dist |
| Deterministic | Không | Không (nhưng ít noise hơn t-SNE) |
| Downstream tasks | Chỉ viz | Có thể dùng cho clustering, classification |

### 4.2. Hyperparameters UMAP

**n_neighbors**: tương tự perplexity — số hàng xóm để xây dựng graph.
- Nhỏ (5): tập trung local structure, nhiều cluster nhỏ.
- Lớn (50): tập trung global structure, cluster gộp lại.

**min_dist**: khoảng cách tối thiểu giữa các điểm trong embedding.
- Nhỏ (0.0): cluster rất gọn, dense.
- Lớn (0.5): điểm spread ra, không dense.

### 4.3. Pipeline Tốt Nhất

Với high-dim data (d > 100):
1. PCA → 50D (loại noise, speedup).
2. t-SNE hoặc UMAP trên 50D.

Lý do: t-SNE/UMAP O(n²) hoặc O(n log n) theo n điểm nhưng cũng chậm theo d. PCA → 50D giảm d đáng kể mà giữ ~90% variance.

**MNIST pipeline cụ thể**:
- Raw: 60.000 × 784.
- Sau PCA (50D): 60.000 × 50, giữ ~90% variance, nhanh hơn 15x.
- Sau UMAP (2D): ~2 phút thay vì >30 phút nếu chạy trực tiếp.

> ❓ **Câu hỏi tự nhiên**: khi nào không nên dùng t-SNE/UMAP?
>
> - Khi cần **interpretable dimensions**: PCA cho biết PC1 = "tổ hợp tuyến tính của feature gốc". t-SNE/UMAP không cho biết ý nghĩa của trục x,y.
> - Khi cần **reproducible**: mỗi lần chạy cho kết quả khác nhau.
> - Khi cần **inverse transform**: không thể map từ 2D về high-dim với t-SNE.
> - Khi cần **thêm điểm mới** (out-of-sample): t-SNE không có transform cho điểm mới (UMAP có thể dùng \`transform()\`).

---

## 5. Chọn Phương Pháp: PCA vs t-SNE vs UMAP

| Câu hỏi | Phương pháp |
|---------|------------|
| "Tôi muốn biết feature nào quan trọng" | PCA |
| "Tôi muốn visualize cluster" | t-SNE hoặc UMAP |
| "Tôi cần nhanh" | UMAP |
| "Tôi cần global structure" | UMAP |
| "Tôi cần dùng embedding cho downstream" | UMAP |
| "Tôi muốn denoise hoặc compress" | PCA |
| "Data có linear structure" | PCA |
| "Data có non-linear manifold" | UMAP |

> 📝 **Tóm tắt toàn bài**: t-SNE minimize KL(P||Q) bằng GD, dùng Gaussian cho high-dim, t-dist cho low-dim. Perplexity ≈ số hàng xóm. 4 pitfall: size/distance/cluster/topology vô nghĩa. UMAP: nhanh hơn, global structure tốt hơn, hyperparams n_neighbors và min_dist. Pipeline: PCA → UMAP cho data >100D.

---

## 6. Bài Tập

**Bài 1**: Tại sao t-SNE dùng t-distribution (Cauchy) trong low-dim thay vì Gaussian? Giải thích "crowding problem" bằng ví dụ trực giác.

**Bài 2**: Cho t-SNE output với perplexity=5 cho thấy 15 cluster nhỏ, perplexity=30 cho 3 cluster, perplexity=100 cho 1 cluster mờ. Bạn kết luận data có bao nhiêu cluster? Vì sao?

**Bài 3**: Đồng nghiệp vẽ t-SNE của 500 tế bào đơn (single-cell RNA-seq), thấy 3 cluster A, B, C trong đó A và C to bằng nhau còn B nhỏ hơn. Họ kết luận: "Loại A và C phổ biến nhất." Lỗi gì?

**Bài 4**: Dataset 10.000 điểm × 200 chiều. Bạn muốn chạy UMAP. Đề xuất pipeline hoàn chỉnh (bước 1-3) và nêu lý do từng bước.

---

## 7. Lời Giải Chi Tiết

### Bài 1: Crowding Problem

**Crowding problem**: trong 2D, "diện tích" tăng linear với bán kính ($A = \\pi r^2$). Trong 10D, "thể tích" tăng như $r^{10}$ → rất nhiều điểm ở khoảng cách "vừa vừa" trong high-dim mà không thể đặt tất cả ở khoảng cách vừa vừa trong 2D.

**Ví dụ số**: trong 10D, điểm trên hypersphere r=1 có thể có 1000 hàng xóm. Nếu map về 2D với Gaussian → cần đặt 1000 điểm trong hình tròn r≈1 (mật độ cao) → ép chặt.

**Giải pháp t-distribution**: Cauchy distribution $Q = (1 + d^2)^{-1}$ có **heavy tail** — khoảng cách lớn vẫn có xác suất đáng kể. Vì vậy gradient đẩy điểm "vừa gần vừa xa" ra xa hơn trong 2D → cluster tách biệt hơn.

Cụ thể: nếu $P_{12} = 0{,}1$ (gần trong high-dim), model cần $Q_{12} \\approx 0{,}1$. Với Gaussian trong 2D: $Q = 0{,}1 \\to d_{2D} \\approx 0{,}1$ (rất gần). Với Cauchy: $Q = 0{,}1 \\to (1 + d^2) = 10 \\to d \\approx 3$ (xa hơn nhiều, cho phép cluster tách biệt).

### Bài 2: Chọn số clusters từ nhiều perplexity

Kết luận: **3 cluster** (từ perplexity=30).

Lý do:
- Perplexity=5 quá nhỏ → mỗi điểm chỉ xem 5 hàng xóm → sub-divide cluster thật → 15 cluster ảo.
- Perplexity=30 trong range khuyến nghị [5,50] → kết quả ổn định.
- Perplexity=100 quá lớn → xem quá nhiều hàng xóm → blur boundary → 1 cluster.

Rule: lấy kết quả ổn định ở perplexity trung bình làm ground truth. Thử perplexity 20, 30, 50 nếu cả 3 đều cho 3 cluster → confirm.

### Bài 3: Lỗi khi diễn giải kích thước cluster

**Pitfall 1 — Cluster size vô nghĩa**.

t-SNE normalize local density trong từng cluster → cluster A có 300 tế bào và cluster B có 30 tế bào có thể hiển thị cùng kích thước (vì t-SNE "co" cluster dày đặc và "giãn" cluster thưa).

**Kết luận đúng**: không thể suy ra số lượng hay mật độ từ kích thước cluster trong t-SNE. Phải đếm điểm thực tế: \`len(labels==A)\`, \`len(labels==B)\`, \`len(labels==C)\`.

### Bài 4: Pipeline cho 10.000 × 200D

**Bước 1: PCA → 50D**
- Lý do: giảm chiều từ 200 → 50, loại noise (variance nhỏ), tăng tốc UMAP ~4x.
- Giữ ~90% variance thường đủ.
- Code: \`pca = PCA(n_components=50); X50 = pca.fit_transform(X_scaled)\`.

**Bước 2: UMAP → 2D**
- Trên X50 (10.000 × 50).
- Hyperparams: n_neighbors=15 (thường tốt), min_dist=0.1.
- Lý do chọn UMAP thay t-SNE: 10.000 điểm × 50D → UMAP ~30s, t-SNE ~5 phút.
- Code: \`umap_model = UMAP(n_neighbors=15, min_dist=0.1, random_state=42); Y = umap_model.fit_transform(X50)\`.

**Bước 3: Validate và visualize**
- Plot Y với color = known labels hoặc K-means cluster assignments.
- Cross-check: chạy K-means trên X50 và so sánh cluster assignments với UMAP visual.
- Chạy 3 random seeds khác nhau → xem clusters có ổn định không.

---

## 8. Tham Khảo

- van der Maaten & Hinton (2008) — *Visualizing Data using t-SNE* (JMLR) — paper gốc.
- McInnes et al. (2018) — *UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction* — paper gốc UMAP.
- Wattenberg, Viégas, Johnson (2016) — *How to Use t-SNE Effectively* — distill.pub (pitfalls quan trọng).
- **ESL** Chapter 14.9 — Non-linear Dimensionality Reduction.
- **ISL** không cover t-SNE/UMAP (phiên bản 2021), tham khảo blog posts thay thế.
- [Visualization tương tác](./visualization.html)

## Bài Tiếp Theo

→ [T4-L01: Neural Network](../../04-DeepLearning/lesson-01-neural-network/) — đặt nền móng cho deep learning.
`;
