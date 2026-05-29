# Lesson T3-02 — DBSCAN & Density-Based Clustering

> **Câu hỏi mở bài**: Hãy nhìn bản đồ đêm của một thành phố lớn — ánh đèn tụ thành cụm ở trung tâm, thưa dần ra ngoại ô, thậm chí có những điểm đèn lẻ loi ngoài đồng. K-means sẽ phân chia theo ranh giới Voronoi thẳng tắp và bỏ sót cấu trúc hình dạng bất thường. **DBSCAN** — Density-Based Spatial Clustering of Applications with Noise — bắt chính xác cấu trúc này: cluster hình dạng tùy ý, và tự nhận diện điểm noise.

## Mục tiêu học tập

Sau bài này, bạn sẽ:
- Phân biệt **core point**, **border point**, **noise point** và giải thích khi nào mỗi loại xuất hiện.
- Thực hiện DBSCAN algorithm từng bước tay trên 8 điểm với eps và minPts cụ thể.
- Lý giải tại sao DBSCAN bắt được non-convex cluster (moons, rings) nhưng K-means thì không.
- Điều chỉnh eps và minPts hợp lý: eps quá nhỏ → all noise; eps quá lớn → 1 cluster duy nhất.
- Dùng DBSCAN như một **outlier detector** (anomaly detection).
- Nắm ý tưởng HDBSCAN cho data có variable density.

## Kiến thức tiền đề

- [T3-L01: K-means & Hierarchical](../lesson-01-kmeans-hierarchical/) — biết K-means để so sánh.
- Khoảng cách Euclidean, khái niệm "hàng xóm" trong không gian.

---

## 1. Các Khái Niệm Cơ Bản

### 1.1. Hai Hyperparameter

DBSCAN có 2 hyperparameter duy nhất:
- **ε (eps)**: bán kính vùng lân cận — một điểm `xᵢ` có "hàng xóm" là tất cả điểm trong hình cầu bán kính ε.
- **minPts**: ngưỡng mật độ tối thiểu — cần ít nhất minPts điểm trong ε-neighborhood để tạo thành vùng dày đặc.

> 💡 **Hình dung**: eps là kích thước cái lưới của bạn — thả lưới bán kính eps quanh mỗi điểm. minPts = ngưỡng "cái lưới phải bắt được ít nhất bao nhiêu điểm thì mới gọi là đây là vùng đông dân".

### 1.2. Ba Loại Điểm

**Core point**: điểm `p` là core nếu `|N_ε(p)| ≥ minPts`, trong đó `N_ε(p)` là tập hàng xóm của `p` trong bán kính ε (bao gồm chính `p`).

**Border point**: điểm `q` là border nếu `|N_ε(q)| < minPts` nhưng `q` nằm trong ε-neighborhood của một core point.

**Noise point**: không phải core, không phải border. Không thuộc cluster nào.

**Walk-through số cụ thể** — 6 điểm 1D, eps=2, minPts=3:
```
Điểm:  A=1, B=2, C=3, D=4, E=7, F=10
```

Hàng xóm của từng điểm (|d(p,q)| ≤ 2):
```
N(A)={A,B,C}         |3| ≥ 3 → Core
N(B)={A,B,C,D}       |4| ≥ 3 → Core
N(C)={A,B,C,D}       |4| ≥ 3 → Core
N(D)={B,C,D,E?} → D=4, E=7, d=3 > 2 → N(D)={B,C,D} |3| ≥ 3 → Core
N(E)={E}              |1| < 3, và không có core nào trong N(E) → Noise
N(F)={F}              |1| < 3, không có core nào → Noise
```

Cluster = {A, B, C, D} (connected qua core points). Noise = {E, F}.

> ❓ **Câu hỏi tự nhiên**: nếu E=5 (thay vì 7), điều gì xảy ra?
>
> N(D) = {B,C,D,E} (d(D,E)=1≤2) → |4| ≥ 3 → D vẫn core. N(E) = {C,D,E,F?} → d(E,F)=5>2 → N(E)={C,D,E} → |3| ≥ 3 → E trở thành Core! E kết nối vào cluster {A,B,C,D,E}. F vẫn noise.

### 1.3. Density-Reachability & Density-Connectivity

**Directly density-reachable**: `q` directly reachable từ core `p` nếu `q ∈ N_ε(p)`.

**Density-reachable**: `q` reachable từ `p` nếu tồn tại chain `p = p₀ → p₁ → … → pₙ = q` trong đó mỗi `pᵢ₊₁` directly reachable từ core `pᵢ`.

**Density-connected**: `p` và `q` density-connected nếu tồn tại điểm `o` sao cho cả hai đều density-reachable từ `o`.

> 💡 **Tại sao cần "chain"?** Vì DBSCAN cluster có thể dài và uốn khúc — điểm ở đầu và cuối không directly reachable với nhau nhưng kết nối qua chain core points. Đây là lý do DBSCAN bắt được hình dạng phi tuyến.

---

## 2. DBSCAN Algorithm

### 2.1. Pseudocode

```
DBSCAN(X, eps, minPts):
  cluster_id = 0
  labels = [-1] * n          # -1 = unvisited

  for each point p in X:
    if labels[p] != -1: continue    # đã xử lý

    N = rangeQuery(X, p, eps)       # tìm hàng xóm
    if |N| < minPts:
      labels[p] = NOISE              # đánh dấu noise (tạm)
      continue

    # p là core point
    cluster_id++
    labels[p] = cluster_id
    Q = queue(N)                    # hàng đợi mở rộng

    while Q not empty:
      q = Q.dequeue()
      if labels[q] == NOISE: labels[q] = cluster_id    # noise → border
      if labels[q] != -1: continue                       # đã xử lý
      labels[q] = cluster_id
      N2 = rangeQuery(X, q, eps)
      if |N2| >= minPts: Q.enqueue(N2)                  # q là core, expand

  return labels
```

### 2.2. Walk-through số cụ thể — 2D, 8 điểm, eps=2, minPts=3

Điểm (toạ độ 2D):
```
P1=(1,1), P2=(1.5,1.5), P3=(2,1), P4=(2.5,2),
P5=(6,6), P6=(6.5,6.5), P7=(7,6.5), P8=(10,10)
```

**Bước 1: Tính hàng xóm** (eps=2, tính dist Euclidean):
```
d(P1,P2) = √(0.25+0.25) = 0.71
d(P1,P3) = √(1+0) = 1.00
d(P1,P4) = √(2.25+1) = 1.80
d(P1,P5) = √(25+25) = 7.07

N(P1) = {P1,P2,P3,P4}  → |4| ≥ 3 → Core
N(P2) = {P1,P2,P3,P4}  → |4| ≥ 3 → Core
N(P3) = {P1,P2,P3,P4}  → |4| ≥ 3 → Core
N(P4) = {P1,P2,P3,P4}  → |4| ≥ 3 → Core
N(P5) = {P5,P6,P7}     → |3| ≥ 3 → Core
N(P6) = {P5,P6,P7}     → |3| ≥ 3 → Core
N(P7) = {P5,P6,P7}     → |3| ≥ 3 → Core
N(P8) = {P8}            → |1| < 3 → Noise
```

**Bước 2: Expand clusters**:
- Pick P1 (unvisited, core) → Cluster 1. Expand: add P2, P3, P4. Cả 3 cũng là core → tiếp tục expand nhưng không tìm thêm điểm mới → Cluster 1 = {P1,P2,P3,P4}.
- Pick P5 (unvisited, core) → Cluster 2. Expand: add P6, P7. Đều là core nhưng không mở rộng thêm → Cluster 2 = {P5,P6,P7}.
- P8 → Noise.

**Kết quả**: Cluster 1={P1,P2,P3,P4}, Cluster 2={P5,P6,P7}, Noise={P8}.

> 🔁 **Kiểm tra nhanh**: Với cùng data nhưng eps=3.5, minPts=3, tính lại N(P4), N(P5):
> <details><summary>Đáp án</summary>
>
> d(P4,P5)=√(12.25+16)=√28.25≈5.3 > 3.5. Vẫn 2 cluster riêng biệt.
>
> Nhưng nếu eps=5.5: d(P4,P5)≈5.3 ≤ 5.5 → P4 và P5 trong cùng hàng xóm nhau → 2 cluster hợp thành 1!
> </details>

---

## 3. Tại Sao DBSCAN Bắt Non-Convex Shapes?

### 3.1. K-means và ranh giới Voronoi

K-means phân chia không gian thành các vùng Voronoi (ranh giới thẳng giữa các centroid). Data hình mặt trăng (moons) hay đồng tâm (concentric) không thể phân chia bằng Voronoi thẳng → K-means **luôn thất bại**.

**Ví dụ cụ thể** (moons dataset, 2 nửa vòng tròn):
```
Nửa trên (cluster A): (0,0) → (π,0) trên đường tròn r=1
Nửa dưới (cluster B): (π,0) → (2π,0) trên đường tròn r=1, dịch (0.5,0.3)
```

K-means centroid cho A: ≈(0.6, 0.4). Centroid cho B: ≈(1.1, -0.2). Ranh giới Voronoi là đường thẳng giữa 2 centroid → cắt ngang CẢ HAI nửa trăng → **sai hoàn toàn**.

DBSCAN với eps đủ nhỏ (≈ khoảng cách giữa các điểm trong cùng nửa trăng): chain core points theo từng nửa → 2 cluster đúng.

### 3.2. So Sánh K-means vs DBSCAN

| Tiêu chí | K-means | DBSCAN |
|---------|---------|--------|
| Hình dạng cluster | Spherical (Voronoi) | Bất kỳ (density-connected) |
| Số cluster k | Phải biết trước | Tự detect |
| Outlier | Gán vào cluster gần nhất | Mark là Noise |
| Data có cluster size khác nhau | Kém | Ổn |
| Convex cluster rõ ràng | Tốt | Tốt |
| Non-convex (moons, rings) | Thất bại | Tốt |
| Variable density | Ổn | Khó (HDBSCAN) |
| Time complexity | O(nkd·iter) | O(n²) naive / O(n log n) với KD-tree |
| Hyperparameters | k | eps, minPts |

### 3.3. Chọn eps và minPts

**minPts**: thường chọn `minPts = 2×d` (d = số chiều) hoặc ≥ 3.

**eps**: dùng **k-distance plot** — với mỗi điểm, tính khoảng cách đến điểm hàng xóm thứ minPts, sort tăng dần. Tìm "khuỷu tay" → đó là eps tốt.

**Walk-through eps selection**:
- Eps quá nhỏ (eps→0): mọi điểm đều có 1 hàng xóm = chính nó → |N|=1 < minPts → **tất cả là Noise**.
- Eps quá lớn (eps→∞): mọi điểm trong hàng xóm nhau → 1 cluster khổng lồ → **không học được gì**.
- Eps đúng: cluster tách biệt, noise ít.

> ⚠ **Hạn chế lớn nhất của DBSCAN**: data có **variable density** (cluster dày đặc khác nhau). DBSCAN dùng eps toàn cục → cluster thưa không đủ điểm trong eps → bị mark là Noise dù thực ra là cluster. HDBSCAN giải quyết vấn đề này.

---

## 4. DBSCAN Làm Outlier Detection

DBSCAN mark noise points = **outlier candidates**. Trong anomaly detection, anomaly chính là điểm không thuộc bất kỳ cluster đông dân nào.

**Ứng dụng thực tế**:
- Giao dịch ngân hàng bất thường: hầu hết transaction tụm thành cluster (mua hàng thông thường), transaction lạ → noise.
- Sensor data: đọc cảm biến bình thường tạo cluster dày đặc; reading bất thường (nhiễu, lỗi) → noise.
- Network intrusion: traffic bình thường tạo pattern dày đặc; attack traffic → outlier.

**Walk-through số** — chuỗi 10 giao dịch (số tiền, triệu VND): 
```
{1.2, 1.5, 1.3, 1.8, 1.6, 1.4, 1.1, 1.9, 50.0, 2.1}
eps=2, minPts=4
```
N(50.0) = {50.0} → |1| < 4 → Noise = outlier! Giao dịch 50 triệu bất thường so với cluster {1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 1.9, 2.1}.

> ❓ **Câu hỏi tự nhiên**: nếu có 3 giao dịch 50 triệu thay vì 1, kết quả thay đổi như thế nào?
>
> N({50, 50, 50}) với eps=2: dist giữa 3 giao dịch ≈ 0 ≤ 2 → N(50₁) = {50₁, 50₂, 50₃} → |3| < 4 (minPts=4) → vẫn noise. Cần thêm 1 điểm nữa mới thành cluster.

---

## 5. HDBSCAN — Variable Density

**HDBSCAN** (Hierarchical DBSCAN, Campello et al. 2013):

Ý tưởng: thay vì một eps cố định, HDBSCAN xây dựng một **hierarchy** của cluster ở tất cả eps — rồi chọn cluster ổn định nhất theo lý thuyết stability.

**Khái niệm core distance**: `core_dist_k(p)` = khoảng cách từ `p` đến điểm hàng xóm thứ k.

**Mutual reachability distance**: `mrd(p,q) = max(core_dist(p), core_dist(q), dist(p,q))`.

→ Điểm trong vùng thưa có core_dist lớn → mutual reachability lớn → phải "gần hơn thật sự" để join cluster. Điểm trong vùng dày → core_dist nhỏ.

**Ưu điểm**: robust với variable density, chỉ cần 1 hyperparameter `min_cluster_size`.

> 📝 **Tóm tắt mục 1–5**: DBSCAN có 2 hyperparameter (eps, minPts), classify điểm thành core/border/noise, bắt cluster bất kỳ hình dạng qua density-reachability. Tốt cho non-convex, outlier detection. Kém cho variable density → dùng HDBSCAN.

---

## 6. Time Complexity

**Naive**: DBSCAN naive (brute-force rangeQuery): O(n²) — mỗi điểm query mất O(n).

**Với spatial index (KD-tree / Ball-tree)**:
- Build: O(n log n).
- Query mỗi điểm: O(log n) average → tổng O(n log n).
- **Không khả thi với chiều cao** (d > 20) vì KD-tree bị "curse of dimensionality" → phải dùng approximate NN.

**So sánh thực tế**:
| n | DBSCAN naive | DBSCAN KD-tree |
|---|---|---|
| 1,000 | ~1M ops | ~10K ops |
| 10,000 | ~100M ops | ~130K ops |
| 100,000 | ~10B ops | ~1.7M ops |

> ⚠ **Khi nào DBSCAN naive là OK?** n < 5,000 và không có spatial index library. Với n > 50,000: bắt buộc dùng KD-tree (sklearn tự dùng nếu n_jobs=-1).

---

## 7. Bài Tập

**Bài 1**: 5 điểm 1D: A=0, B=1, C=2, D=5, E=6. Với eps=1.5, minPts=2. Liệt kê core/border/noise và các clusters.

**Bài 2**: Tại sao DBSCAN với eps=0.5, minPts=3 sẽ fail trên dataset sau (2D): cluster 1 có mật độ cao (khoảng cách trung bình 0.2) và cluster 2 có mật độ thấp (khoảng cách trung bình 1.0)?

**Bài 3**: Bạn có sensor data 1D: {10, 10.5, 11, 10.8, 9.9, 10.2, 100, 102}. Chọn eps và minPts hợp lý để detect outlier (2 điểm cuối). Tính thủ công.

**Bài 4**: Giải thích tại sao DBSCAN phù hợp cho bài toán "phân vùng địa lý dân cư" hơn K-means. Nêu 2 hạn chế của DBSCAN trong bài toán này.

---

## 8. Lời Giải Chi Tiết

### Bài 1: DBSCAN 1D

eps=1.5, minPts=2. Khoảng cách ≤ 1.5 là hàng xóm:
```
N(A=0)  = {A, B}  (d(A,B)=1≤1.5) → |2| ≥ 2 → Core
N(B=1)  = {A, B, C} (d=1,1) → |3| ≥ 2 → Core
N(C=2)  = {B, C}  (d(B,C)=1≤1.5, d(C,D)=3>1.5) → |2| ≥ 2 → Core
N(D=5)  = {D, E}  (d(D,E)=1≤1.5) → |2| ≥ 2 → Core
N(E=6)  = {D, E}  (d=1) → |2| ≥ 2 → Core
```

Expand: A→core, thêm B vào Cluster 1. B→core thêm C. C→core không thêm được D (d(C,D)=3>1.5). Cluster 1={A,B,C}.
D→core Cluster 2, thêm E. Cluster 2={D,E}.

Không có noise. Kết quả: **Cluster 1={A,B,C}, Cluster 2={D,E}**.

### Bài 2: Variable Density

Cluster 1 có khoảng cách trung bình 0.2 → các điểm trong cluster 1 cần eps≥0.2 để "thấy" nhau. Với eps=0.5, đủ để cluster 1 hoạt động (0.5 > 0.2).

Cluster 2 có khoảng cách trung bình 1.0 → điểm trong cluster 2 cách nhau ~1.0. Với eps=0.5 < 1.0, mỗi điểm trong cluster 2 có ít hàng xóm → |N| < minPts=3 → bị mark là Noise dù thực tế là cluster!

→ Đây là **variable density problem**: eps toàn cục không thỏa mãn cả hai density.

### Bài 3: Outlier Detection Sensor

Data: {10, 10.5, 11, 10.8, 9.9, 10.2, 100, 102}.

Chọn eps=2, minPts=3 (cần ít nhất 3 đọc bình thường gần nhau):
```
Điểm bình thường: 9.9,10,10.2,10.5,10.8,11 — gần nhau trong khoảng [9.9,11]=1.1 ≤ 2
N(10) = {9.9,10,10.2,10.5,10.8,11} → |6| ≥ 3 → Core
... tương tự mọi điểm "bình thường" đều core → 1 cluster

N(100) = {100, 102} (d=2≤2) → |2| < 3 → không đủ minPts
N(102) = {100, 102} → |2| < 3
```

→ {100, 102} cả hai đều **Noise** = **outlier detected**. ✅

Nếu eps=3: N(100)={100,102} vẫn |2|<3 → vẫn noise. Nếu minPts=2: N(100)={100,102} → |2| ≥ 2 → core → sẽ không detect được. Vậy chọn **eps=2, minPts=3** là hợp lý.

### Bài 4: DBSCAN cho phân vùng địa lý

**Tại sao DBSCAN phù hợp hơn K-means**:
1. Khu dân cư có hình dạng phi tuyến (dọc theo sông, đường, bờ biển) — K-means chỉ bắt được hình tròn.
2. Vùng nông thôn thưa dân cư tự động được mark là noise (không thuộc cluster nào) — K-means buộc phải gán vào cluster gần nhất.
3. Không cần biết trước số lượng vùng dân cư (k).

**Hạn chế của DBSCAN trong bài toán này**:
1. **Variable density**: mật độ dân số khác nhau rất nhiều giữa thành thị và nông thôn → một eps toàn cục không thể bắt cả hai. Cần HDBSCAN.
2. **Chọn eps khó**: bản đồ thực tế có nhiều scale — khu phố (eps nhỏ) vs tỉnh thành (eps lớn). Không có "đúng/sai" tuyệt đối.

---

## 9. Tham Khảo

- **ESL** Chapter 14.3 — Cluster Analysis (K-means + DBSCAN comparison).
- **ISL** Chapter 12.4 — Clustering Methods.
- Ester et al. (1996) — *A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise* — paper gốc DBSCAN.
- Campello et al. (2013) — *Density-Based Clustering Based on Hierarchical Density Estimates* — HDBSCAN.
- Wattenberg et al. (2016) — *How to Use t-SNE Effectively* (distill.pub) — so sánh các phương pháp clustering.
- [Visualization tương tác](./visualization.html)

## Bài Tiếp Theo

→ [T3-L03: PCA & SVD](../lesson-03-pca-svd/) — khi data có quá nhiều chiều, cần giảm xuống 2D/3D để clustering hoặc visualization hoạt động tốt.
