// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/03-Unsupervised/lesson-01-kmeans-hierarchical/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson T3-01 — K-means & Hierarchical Clustering

> **Câu hỏi mở bài**: Cho 150 bông hoa iris với 4 đặc trưng (chiều dài/rộng cánh hoa, đài hoa) — *không có nhãn*. Làm thế nào tự động phân chúng thành 3 nhóm? Và làm sao biết 3 là con số đúng, không phải 2 hay 4?

Bài này giải đáp cả hai câu hỏi bằng **K-means** (Lloyd's algorithm) và **hierarchical clustering**.

## Mục tiêu học tập

Sau bài này, bạn sẽ:
- Mô tả 4 bước của Lloyd's algorithm và chứng minh nó hội tụ (convergence).
- Giải thích K-means++ cải thiện khởi tạo như thế nào — và tại sao quan trọng.
- Tính **inertia** (within-cluster SSE) và **silhouette score** để chọn k.
- Thực hiện agglomerative hierarchical clustering bằng tay trên 5 điểm.
- Đọc **dendrogram** và biết cắt ở đâu để ra k clusters.
- Nhận ra khi nào K-means thất bại và cần dùng phương pháp khác.

## Kiến thức tiền đề

- [T1-L02: Gradient Descent](../../01-Foundations/lesson-02-linear-regression/) — hiểu tư duy tối ưu hoá lặp.
- [Vectors/Linear Algebra: khoảng cách Euclidean, trung bình vector](../../../Vectors/): $\\|a - b\\|_2$, mean vector.
- [T2-L01: Regression](../../02-ClassicalMethods/) — biết train/eval loop.

---

## 1. K-means — Lloyd's Algorithm

### 1.1. Trực giác

> 💡 **Hình dung**: Bạn có 100 cái chấm trên bảng trắng và cần sơn chúng thành 3 màu sao cho mỗi màu tạo thành một cụm gọn. Bạn đặt 3 người đứng ở 3 vị trí bất kỳ (centroid khởi tạo). Mỗi chấm chạy đến người gần nhất (assign). Sau đó mỗi người *đi tới trung điểm* của nhóm mình (update). Lặp đến khi không ai di chuyển nữa.

### 1.2. Algorithm chính thức — 4 bước

**Input**: tập điểm $X = \\{x_1, \\ldots, x_n\\} \\in \\mathbb{R}^d$, số cluster $k$.

**Bước 1 — Khởi tạo**: chọn k centroids $\\mu_1, \\ldots, \\mu_k$ (random hoặc K-means++).

**Bước 2 — Assign**: gán mỗi điểm cho centroid gần nhất:
\`\`\`
cᵢ = argmin_{j=1..k}  ‖xᵢ − μⱼ‖₂²
\`\`\`

**Bước 3 — Update centroid**: tính lại centroid của mỗi cluster:
\`\`\`
μⱼ = (1/|Sⱼ|) Σ_{i: cᵢ=j}  xᵢ
\`\`\`

**Bước 4 — Lặp** bước 2–3 cho đến khi không có điểm nào đổi cluster (hoặc thay đổi nhỏ hơn threshold).

**Hội tụ**: thuật toán luôn hội tụ vì mỗi bước assign + update đều giảm hoặc giữ nguyên **inertia** (định nghĩa ở mục 1.4). Tổng số phân hoạch hữu hạn → hữu hạn bước.

> ⚠ **Lỗi thường gặp**: "K-means tìm được phân hoạch tối ưu toàn cục." — **SAI**. K-means chỉ đảm bảo **local minimum**. Khởi tạo khác nhau → kết quả khác nhau. Phải chạy nhiều lần (vd \`n_init=10\`) và chọn kết quả inertia nhỏ nhất.

### 1.3. Walk-through số cụ thể — 1D, 4 điểm, k=2

Điểm: $x = [1, 1{,}5, 7, 8]$. Khởi tạo: $\\mu_1 = 1$, $\\mu_2 = 7$.

**Iter 1 — Assign**:
- $x_1=1$: dist(1,1)=0, dist(1,7)=6 → C1
- $x_2=1{,}5$: dist(1.5,1)=0.5, dist(1.5,7)=5.5 → C1
- $x_3=7$: dist(7,1)=6, dist(7,7)=0 → C2
- $x_4=8$: dist(8,1)=7, dist(8,7)=1 → C2

**Iter 1 — Update**:
\`\`\`
μ₁ = (1 + 1.5)/2 = 1.25
μ₂ = (7 + 8)/2   = 7.5
\`\`\`

**Iter 2 — Assign**:
- $x_1=1$: dist(1,1.25)=0.25, dist(1,7.5)=6.5 → C1
- $x_2=1{,}5$: dist(1.5,1.25)=0.25, dist(1.5,7.5)=6 → C1
- $x_3=7$: dist(7,1.25)=5.75, dist(7,7.5)=0.5 → C2
- $x_4=8$: dist(8,1.25)=6.75, dist(8,7.5)=0.5 → C2

**Iter 2 — Update**: $\\mu_1=1{,}25$ (không đổi), $\\mu_2=7{,}5$ (không đổi) → **Hội tụ**.

Kết quả: C1={1, 1.5}, C2={7, 8}. Đúng trực giác!

### 1.4. Inertia — đo chất lượng clustering

**Inertia** (within-cluster sum of squares, WCSS):
\`\`\`
W(k) = Σᵢ ‖xᵢ − μ_{c(i)}‖₂²
\`\`\`

Walk-through với ví dụ trên:
\`\`\`
W = (1-1.25)² + (1.5-1.25)² + (7-7.5)² + (8-7.5)²
  = 0.0625 + 0.0625 + 0.25 + 0.25
  = 0.625
\`\`\`

> ❓ **Câu hỏi tự nhiên**: inertia càng nhỏ càng tốt? Tại sao không dùng k=n (mỗi điểm 1 cluster)?
>
> Với k=n, mỗi điểm là centroid của chính nó → inertia = 0. Nhưng model này **vô dụng** (overfit hoàn toàn). Inertia luôn giảm khi tăng k — không thể dùng làm tiêu chí chọn k trực tiếp. → Cần Elbow method (mục 2).

---

## 2. Chọn k — Elbow Method & Silhouette Score

### 2.1. Elbow Method

Plot inertia W(k) theo k từ 1 đến 10. Tìm điểm "khuỷu tay" — nơi inertia giảm đột ngột rồi chậm lại.

**Ví dụ số**: data gồm 3 blobs rõ ràng (μ₁=0, μ₂=5, μ₃=10, σ=0.5 mỗi blob, 30 điểm mỗi blob):

| k | Inertia (WCSS) |
|---|---:|
| 1 | 1250 |
| 2 | 380 |
| **3** | **22** |
| 4 | 18 |
| 5 | 16 |
| 6 | 14 |

→ Elbow rõ tại k=3: giảm từ 380 xuống 22 (drop lớn), từ 3 lên 4 chỉ giảm từ 22 xuống 18 (nhỏ). Chọn **k=3**.

> ⚠ **Hạn chế Elbow**: elbow không phải lúc nào cũng rõ ràng. Với data thực tế (overlapping cluster), curve smooth → cần Silhouette score.

### 2.2. Silhouette Score

Với mỗi điểm $x_i$:
- $a(i)$ = trung bình khoảng cách từ $x_i$ đến các điểm *cùng cluster*.
- $b(i)$ = trung bình khoảng cách từ $x_i$ đến các điểm của *cluster gần nhất khác*.
- **Silhouette**: $s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$

Giá trị: $s(i) \\in [-1, 1]$.
- $s(i) \\approx 1$: điểm nằm gọn trong cluster của nó, xa cluster khác — tốt.
- $s(i) \\approx 0$: điểm nằm trên ranh giới giữa 2 cluster.
- $s(i) < 0$: điểm bị gán nhầm cluster.

**Mean silhouette** $S(k) = \\text{mean}(s(i))$ — chọn k có $S(k)$ lớn nhất.

**Walk-through số cụ thể** (3 điểm: A=1, B=2, C=8, k=2: {A,B} và {C}):
\`\`\`
a(A) = dist(A,B) = 1          (1 điểm trong cùng cluster)
b(A) = dist(A,C) = 7          (cluster kia chỉ có C)
s(A) = (7 − 1)/max(7,1) = 6/7 ≈ 0.857

a(B) = dist(B,A) = 1
b(B) = dist(B,C) = 6
s(B) = (6 − 1)/max(6,1) = 5/6 ≈ 0.833

a(C) = 0                       (singleton cluster)
b(C) = min(dist(C,A), dist(C,B)) = min(7,6) = 6
s(C) = (6 − 0)/max(6,0) = 1.0

S(k=2) = (0.857 + 0.833 + 1.0)/3 ≈ 0.897  → Rất tốt!
\`\`\`

> 💡 **Khi nào Silhouette tốt hơn Elbow?** Silhouette tính cả "cohesion" lẫn "separation" — có thể tìm k=2 có score cao hơn k=3 dù k=3 thật sự tồn tại nếu 3 cluster overlap nhiều. Dùng cả hai và lấy đồng thuận.

> 🔁 **Kiểm tra nhanh**: Data gồm 5 điểm: {0, 0.1, 0.2, 10, 10.3}. K-means với k=2. Tính inertia và mean silhouette.
> <details><summary>Đáp án</summary>
>
> C1={0, 0.1, 0.2} ($\\mu_1=0{,}1$), C2={10, 10.3} ($\\mu_2=10{,}15$).
>
> Inertia = (0−0.1)²+(0.1−0.1)²+(0.2−0.1)²+(10−10.15)²+(10.3−10.15)² = 0.01+0+0.01+0.0225+0.0225 = 0.065.
>
> a(0)=(0.1+0.2)/2=0.15; b(0)=(10+10.3)/2=10.15; s(0)=(10.15−0.15)/10.15≈0.985. Tương tự các điểm khác ≈0.98. Mean silhouette ≈ 0.98.
> </details>

---

## 3. K-means++ — Khởi Tạo Thông Minh

### 3.1. Vấn đề của random init

Random init có thể đặt nhiều centroid vào cùng một cluster thật → hội tụ về local minimum tệ.

**Ví dụ**: 3 cluster rõ ở (0,0), (5,0), (10,0). Random init đặt cả 3 centroid quanh (0,0) → 2 trong 3 centroid hút về C1, C2/C3 gộp thành 1 cluster duy nhất → kết quả sai.

### 3.2. K-means++ Algorithm

1. Chọn centroid đầu tiên $\\mu_1$ ngẫu nhiên từ X.
2. Với mỗi điểm $x_i$, tính $D(x_i) = \\min_{j \\text{ đã chọn}} \\|x_i - \\mu_j\\|_2^2$.
3. Chọn centroid tiếp theo theo xác suất tỷ lệ $D(x_i)^2$ (điểm xa centroid hiện tại được chọn với xác suất cao hơn).
4. Lặp bước 2–3 cho đến khi đủ k centroids.

**Walk-through số** (3 điểm: A=0, B=5, C=10, k=2):

Bước 1: chọn $\\mu_1 = A = 0$ (ngẫu nhiên).
Bước 2: D(A)=0, D(B)=5²=25, D(C)=10²=100.
Tổng = 125. Xác suất: P(A)=0, P(B)=25/125=0.2, P(C)=100/125=0.8.
→ Rất có khả năng chọn C=10 làm $\\mu_2$ — đúng nhất!

> 💡 **Kết quả thực tế**: K-means++ giảm inertia trung bình 30–50% so với random init (Arthur & Vassilvitskii 2007), đặc biệt khi cluster overlap hoặc có nhiều chiều.

> ❓ **Câu hỏi tự nhiên**: K-means++ có đảm bảo kết quả tối ưu không?
>
> Không — vẫn là local minimum. Nhưng **expectation** của inertia bị chặn trên bởi $O(\\log k) \\times \\text{optimal}$. Tức là về lý thuyết, K-means++ không tệ hơn optimal quá $\\log k$ lần (kỳ vọng).

---

## 4. Hạn chế của K-means

| Hạn chế | Giải thích | Ví dụ thất bại |
|---------|-----------|----------------|
| Cluster phải gần spherical | Objective minimize distance → cắt Voronoi thẳng | 2 nửa mặt trăng (moons) |
| Kích thước cluster tương đương | Centroid bị "kéo" bởi cluster lớn | 1 cluster 200 pt + 1 cluster 10 pt |
| Phải biết trước k | Không có cơ chế tự chọn k | |
| Nhạy với outlier | Outlier kéo centroid xa | 1 điểm ở (1000,0) kéo centroid về phía đó |
| Chỉ tốt với Euclidean | Distance metric cố định | Data categorical (Hamming), text (cosine) |

> 📝 **Tóm tắt mục 1–4**: K-means đơn giản, nhanh ($O(nkd \\cdot \\text{iter})$), hoạt động tốt với cluster spherical, kích thước đều. K-means++ cải thiện init. Dùng Elbow + Silhouette để chọn k. Thất bại với non-convex shape, outlier, unequal cluster size.

---

## 5. Hierarchical Clustering — Agglomerative

### 5.1. Trực giác

> 💡 **Hình dung**: Tưởng tượng 5 người xa lạ trong phòng. Ban đầu mỗi người là 1 nhóm. Bạn liên tục bảo hai người *gần nhau nhất* sáp nhập thành một nhóm. Cuối cùng, tất cả thành 1 nhóm. Quá trình này tạo ra một cây phân cấp — **dendrogram**.

### 5.2. Algorithm Agglomerative

**Input**: n điểm, linkage criterion.

1. Khởi tạo: n clusters, mỗi cluster là 1 điểm.
2. Tính ma trận khoảng cách D (n×n).
3. Tìm cặp (i,j) có dist nhỏ nhất → merge thành cluster mới.
4. Cập nhật D: tính khoảng cách từ cluster mới đến các cluster còn lại.
5. Lặp bước 3–4 cho đến khi còn 1 cluster.

**Linkage criteria** — cách tính khoảng cách giữa 2 cluster A và B:

| Linkage | Công thức | Tính chất |
|---------|-----------|-----------|
| **Single** (min) | $\\min_{a \\in A, b \\in B} d(a,b)$ | Sensitive to outlier, tạo "chain" dài |
| **Complete** (max) | $\\max_{a \\in A, b \\in B} d(a,b)$ | Compact cluster, nhạy với outlier |
| **Average** | $\\frac{1}{|A||B|} \\sum d(a,b)$ | Cân bằng, ít nhạy outlier |
| **Ward** | Minimize tổng variance sau merge | Tạo cluster kích thước đều, thường tốt nhất |

### 5.3. Walk-through số — 5 điểm, 1D

Điểm: $A=1, B=2, C=4, D=8, E=9$. Dùng **single linkage**.

**Ma trận khoảng cách ban đầu** (tóm gọn):
\`\`\`
     A  B  C  D  E
A    0  1  3  7  8
B    1  0  2  6  7
C    3  2  0  4  5
D    7  6  4  0  1
E    8  7  5  1  0
\`\`\`

**Bước 1**: min = dist(A,B)=1 → Merge {A,B}. Centroids: {A,B}=1.5, C=4, D=8, E=9.
\`\`\`
Distance từ {A,B} đến C: min(d(A,C), d(B,C)) = min(3,2) = 2
Distance từ {A,B} đến D: min(d(A,D), d(B,D)) = min(7,6) = 6
Distance từ {A,B} đến E: min(d(A,E), d(B,E)) = min(8,7) = 7
\`\`\`

**Bước 2**: min trong {dist({A,B},C)=2, dist({A,B},D)=6, ..., dist(D,E)=1} = dist(D,E)=1 → Merge {D,E}.

**Bước 3**: Clusters: {A,B}, C, {D,E}. 
\`\`\`
dist({A,B},C) = 2
dist({A,B},{D,E}) = min(7,8,6,7) = 6
dist(C,{D,E}) = min(d(C,D),d(C,E)) = min(4,5) = 4
\`\`\`
min = 2 → Merge {A,B,C}.

**Bước 4**: Clusters: {A,B,C}, {D,E}.
\`\`\`
dist({A,B,C},{D,E}) = min(d(A,D),d(A,E),...,d(C,E)) = min(7,8,6,7,4,5) = 4
\`\`\`
Merge → 1 cluster.

**Dendrogram** (height = khoảng cách lúc merge):
\`\`\`
Height
 6 |          _______________
 4 |      ___|___            |
 2 |   ___|   |   |          |
 1 |  A   B   C  D,E → {D,E}
 0  (điểm ban đầu)
\`\`\`

### 5.4. Cắt Dendrogram

Để ra k clusters, cắt ngang dendrogram ở một height h:
- Cắt ở h=3: clusters = {A,B,C} và {D,E} → **k=2**.
- Cắt ở h=1.5: clusters = {A,B}, {C}, {D,E} → **k=3**.
- Cắt ở h=0.5: clusters = {A,B}, {C}, {D}, {E} → **k=4** (D,E chưa merge ở h=0.5 vì merge tại h=1).

> 💡 **Ưu điểm lớn của Hierarchical**: không cần chọn k trước — nhìn dendrogram rồi quyết định. Cũng thấy được cấu trúc lồng nhau của data.

> ❓ **Câu hỏi tự nhiên**: khi nào dùng hierarchical thay K-means?
>
> - **Hierarchical tốt hơn**: khi muốn xem toàn bộ cấu trúc lồng nhau (taxonomy), data nhỏ (n < 10.000, vì $O(n^2)$ memory/time), muốn thử nhiều k mà không train lại.
> - **K-means tốt hơn**: data lớn (n > 10.000), cần tốc độ, k đã biết, cluster spherical.

> ❓ **Ward linkage vs single linkage**: Ward tốt hơn trong hầu hết trường hợp. Single linkage tạo ra hiệu ứng "chaining" — chain các điểm biên thành 1 cluster dài → cluster không compact. Ward minimize variance → cluster gọn và cân bằng.

> 🔁 **Kiểm tra nhanh**: Trên ví dụ 5 điểm $A=1, B=2, C=4, D=8, E=9$ với single linkage — nếu tôi cắt dendrogram ở height h=3.5, tôi ra mấy cluster và gồm những điểm nào?
> <details><summary>Đáp án</summary>
>
> Tại h=3.5: merge đã xảy ra tại h=1 ({A,B}), h=1 ({D,E}), h=2 ({A,B,C}). Merge h=4 ({A,B,C,D,E}) chưa xảy ra.
> Cắt tại h=3.5 → 2 clusters: **{A,B,C}** và **{D,E}**.
> </details>

---

## 6. So Sánh K-means vs Hierarchical

| Tiêu chí | K-means | Hierarchical |
|---------|---------|-------------|
| Phải chọn k trước | Có | Không |
| Thay đổi k | Phải train lại | Chỉ cắt dendrogram khác |
| Time complexity | $O(nkd \\cdot \\text{iter})$ | $O(n^2 \\log n)$ |
| Space complexity | $O(nk)$ | $O(n^2)$ |
| Cluster shape | Spherical | Linh hoạt hơn (tùy linkage) |
| Reproducible | Không (random init) | Có (deterministic) |
| Data lớn ($n>10^6$) | Khả thi | Không ($O(n^2)$ memory) |

> 📝 **Tóm tắt mục 5–6**: Hierarchical agglomerative: mỗi điểm là 1 cluster, merge cặp gần nhất. Dendrogram cho cái nhìn toàn cục; cắt theo height → ra k clusters tùy chọn. Ward linkage thường tốt nhất. Chi phí $O(n^2)$ — chỉ thực tế với n nhỏ.

---

## 7. Bài Tập

**Bài 1**: Data 1D: $\\{2, 4, 10, 12, 20, 22\\}$. Chạy K-means với k=3, khởi tạo $\\mu_1 = 2, \\mu_2 = 10, \\mu_3 = 20$. Bao nhiêu iteration đến hội tụ? Inertia cuối?

**Bài 2**: Tính silhouette score $s(i)$ cho từng điểm trong ví dụ: $\\{1{,}\\ 1{,}5,\\ 7,\\ 8\\}$ với k=2 (C1={1, 1{,}5}, C2={7, 8}).

**Bài 3**: Agglomerative với complete linkage trên 4 điểm: A=0, B=3, C=7, D=9. Vẽ dendrogram và chỉ ra thứ tự merge.

**Bài 4**: Cho data 2D sau với k=2: $P_1 = (0,0), P_2 = (1,0), P_3 = (5,0), P_4 = (6,0)$. Khởi tạo $\\mu_1 = P_1, \\mu_2 = P_3$. Sau bao nhiêu iteration hội tụ? Vì sao K-means++ có thể chọn init khác?

---

## 8. Lời Giải Chi Tiết

### Bài 1: K-means 1D với k=3

**Init**: μ₁=2, μ₂=10, μ₃=20.

**Iter 1 — Assign**:
- 2: dist(2,μ₁)=0, dist(2,μ₂)=8, dist(2,μ₃)=18 → C1
- 4: dist(4,μ₁)=2, dist(4,μ₂)=6, dist(4,μ₃)=16 → C1
- 10: dist(10,μ₁)=8, dist(10,μ₂)=0, dist(10,μ₃)=10 → C2
- 12: dist(12,μ₁)=10, dist(12,μ₂)=2, dist(12,μ₃)=8 → C2
- 20: dist(20,μ₁)=18, dist(20,μ₂)=10, dist(20,μ₃)=0 → C3
- 22: dist(22,μ₁)=20, dist(22,μ₂)=12, dist(22,μ₃)=2 → C3

**Iter 1 — Update**: μ₁=(2+4)/2=3, μ₂=(10+12)/2=11, μ₃=(20+22)/2=21.

**Iter 2 — Assign** (với μ₁=3, μ₂=11, μ₃=21):
- 2: d(2,3)=1, d(2,11)=9, d(2,21)=19 → C1
- 4: d(4,3)=1, d(4,11)=7, d(4,21)=17 → C1
- 10: d(10,3)=7, d(10,11)=1, d(10,21)=11 → C2
- 12: d(12,3)=9, d(12,11)=1, d(12,21)=9 → C2
- 20: d(20,3)=17, d(20,11)=9, d(20,21)=1 → C3
- 22: d(22,3)=19, d(22,11)=11, d(22,21)=1 → C3

**Update**: μ₁=3, μ₂=11, μ₃=21 (không đổi) → **Hội tụ sau 2 iterations**.

**Inertia** = (2−3)²+(4−3)²+(10−11)²+(12−11)²+(20−21)²+(22−21)² = 1+1+1+1+1+1 = **6**.

### Bài 2: Silhouette score

C1={1, 1.5}, C2={7, 8}. Tất cả khoảng cách Euclidean 1D = |xᵢ−xⱼ|.

**Điểm 1**:
- a(1) = dist(1, 1.5) = 0.5
- b(1) = mean(dist(1,7), dist(1,8)) = (6+7)/2 = 6.5
- s(1) = (6.5−0.5)/max(6.5,0.5) = 6/6.5 ≈ **0.923**

**Điểm 1.5**:
- a(1.5) = dist(1.5, 1) = 0.5
- b(1.5) = mean(dist(1.5,7), dist(1.5,8)) = (5.5+6.5)/2 = 6
- s(1.5) = (6−0.5)/max(6,0.5) = 5.5/6 ≈ **0.917**

**Điểm 7**:
- a(7) = dist(7, 8) = 1
- b(7) = mean(dist(7,1), dist(7,1.5)) = (6+5.5)/2 = 5.75
- s(7) = (5.75−1)/max(5.75,1) = 4.75/5.75 ≈ **0.826**

**Điểm 8**:
- a(8) = dist(8, 7) = 1
- b(8) = mean(dist(8,1), dist(8,1.5)) = (7+6.5)/2 = 6.75
- s(8) = (6.75−1)/max(6.75,1) = 5.75/6.75 ≈ **0.852**

**Mean silhouette** = (0.923+0.917+0.826+0.852)/4 ≈ **0.880**.

### Bài 3: Hierarchical complete linkage

Điểm: A=0, B=3, C=7, D=9.

**Ma trận khoảng cách ban đầu**:
\`\`\`
     A  B  C  D
A    0  3  7  9
B    3  0  4  6
C    7  4  0  2
D    9  6  2  0
\`\`\`

**Bước 1**: min = dist(C,D)=2 → Merge {C,D}.
Complete linkage từ {C,D} đến A: max(d(A,C), d(A,D)) = max(7,9) = 9.
Complete linkage từ {C,D} đến B: max(d(B,C), d(B,D)) = max(4,6) = 6.

**Bước 2**: Clusters {A}, {B}, {C,D}. Distances: d(A,B)=3, d(A,{C,D})=9, d(B,{C,D})=6.
min = d(A,B)=3 → Merge {A,B}.
Complete linkage từ {A,B} đến {C,D}: max(d(A,C),d(A,D),d(B,C),d(B,D)) = max(7,9,4,6) = 9.

**Bước 3**: Clusters {A,B}, {C,D}. d({A,B},{C,D})=9 → Merge.

**Dendrogram heights**: {C,D} tại h=2, {A,B} tại h=3, all tại h=9.

### Bài 4: K-means++ vs random init

**Random init** (μ₁=P1=(0,0), μ₂=P3=(5,0)):

Iter 1 — Assign:
- P1=(0,0): d(P1,μ₁)=0, d(P1,μ₂)=5 → C1
- P2=(1,0): d(P2,μ₁)=1, d(P2,μ₂)=4 → C1
- P3=(5,0): d(P3,μ₁)=5, d(P3,μ₂)=0 → C2
- P4=(6,0): d(P4,μ₁)=6, d(P4,μ₂)=1 → C2

Update: μ₁=mean(0,1)=0.5, μ₂=mean(5,6)=5.5.

Iter 2 — Assign:
- P1=(0,0): d(0,0.5)=0.5, d(0,5.5)=5.5 → C1
- P2=(1,0): d(1,0.5)=0.5, d(1,5.5)=4.5 → C1
- P3=(5,0): d(5,0.5)=4.5, d(5,5.5)=0.5 → C2
- P4=(6,0): d(6,0.5)=5.5, d(6,5.5)=0.5 → C2

Update: μ₁=0.5, μ₂=5.5 (không đổi) → **Hội tụ sau 2 iterations**. C1={P1,P2}, C2={P3,P4}.

**K-means++ init**: Chọn P1 đầu tiên. D²: P1=0, P2=1, P3=25, P4=36. Tổng=62. P(P3)=25/62≈0.40, P(P4)=36/62≈0.58 → Rất có khả năng chọn P4 hoặc P3 làm centroid thứ 2 → cùng kết quả nhưng init "đúng hơn".

---

## 9. Tham Khảo

- **ESL** (Hastie, Tibshirani, Friedman) — *The Elements of Statistical Learning*, Chapter 14: Unsupervised Learning.
- **ISL** — *An Introduction to Statistical Learning*, Chapter 12: Unsupervised Learning.
- Arthur & Vassilvitskii (2007) — *k-means++: The Advantages of Careful Seeding* — paper gốc K-means++.
- Rousseeuw (1987) — *Silhouettes: a graphical aid to the interpretation and validation of cluster analysis*.
- Ward (1963) — *Hierarchical grouping to optimize an objective function* — paper gốc Ward linkage.
- [Visualization tương tác](./visualization.html)

## Bài Tiếp Theo

→ [T3-L02: DBSCAN & Density-based Clustering](../lesson-02-dbscan-density/) — khi K-means thất bại với non-convex shape.
`;
