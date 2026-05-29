# Lesson 02 — Random Forest

> **Tier 2 — Classical Methods · AI-ML**

Một cây Decision Tree đơn lẻ overfit rất dễ. Random Forest giải quyết vấn đề này bằng cách train hàng trăm cây trên các subset khác nhau của data, rồi tổng hợp kết quả — "đám đông" thông minh hơn cá nhân.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Giải thích **Bagging** (Bootstrap AGGregatING) và tại sao nó giảm variance.
- Mô tả cơ chế **random feature subsampling** tạo diversity giữa các cây.
- Tính được xác suất bootstrap P(một điểm có mặt) ≈ 1 − e⁻¹ ≈ 0.632.
- Giải thích **OOB error** là gì và tại sao nó là "free validation".
- Tính **feature importance** theo mean decrease in impurity.
- So sánh Random Forest với single Decision Tree về bias-variance.
- Phân biệt Random Forest, ExtraTrees, và các biến thể.

## Kiến thức tiền đề

- [T2-L01 — KNN & Decision Tree](../lesson-01-knn-decision-tree/): Decision Tree, entropy, Gini.
- [T1-L04 — Bias-Variance](../../01-Foundations/lesson-04-bias-variance-regularization/): ensemble giảm variance.
- Xác suất cơ bản: P(A ∩ B), P(Aᶜ), giới hạn.

---

## 1. Bagging — Bootstrap AGGregatING

### 1.1. Vấn đề cần giải quyết

Decision Tree đơn lẻ có **variance cao**: train trên 100 samples ngẫu nhiên khác nhau từ cùng phân phối → 100 cây rất khác nhau → dự đoán không ổn định.

> 💡 **Trực giác**: bạn hỏi 1 chuyên gia → câu trả lời phụ thuộc nhiều vào kinh nghiệm riêng của người đó. Hỏi 100 chuyên gia → lấy trung bình → câu trả lời ổn định hơn, ít bị ảnh hưởng bởi "outlier" chuyên gia.

### 1.2. Bootstrap Sampling

**(a) Là gì**: tạo B tập train "giả lập" từ tập train gốc bằng cách **sample with replacement** (lấy lại):
- Tập gốc: n = 5 points {A, B, C, D, E}.
- Bootstrap sample 1: {A, C, C, D, A} — A xuất hiện 2×, B và E không xuất hiện.
- Bootstrap sample 2: {B, B, C, E, D} — B xuất hiện 2×, A không xuất hiện.

**(b) Xác suất một điểm KHÔNG có mặt trong bootstrap**:

P(điểm i KHÔNG được chọn trong 1 lần lấy) = 1 − 1/n.

P(không được chọn trong n lần) = (1 − 1/n)ⁿ.

Khi n → ∞: lim (1 − 1/n)ⁿ = **e⁻¹ ≈ 0.368**.

→ Xác suất **có mặt** = 1 − e⁻¹ ≈ **0.632** (63.2% data trong mỗi bootstrap).

**(c) Ví dụ số cụ thể**:
- n=10: (1 − 1/10)¹⁰ = 0.9¹⁰ = 0.349 (34.9% không xuất hiện).
- n=50: (1 − 1/50)⁵⁰ = 0.98⁵⁰ ≈ 0.364.
- n=100: (1 − 1/100)¹⁰⁰ = 0.99¹⁰⁰ ≈ 0.366.
- n=1000: (1 − 1/1000)¹⁰⁰⁰ ≈ 0.368.

Hội tụ rất nhanh về e⁻¹ ≈ 0.3679 ngay từ n nhỏ.

**(d) Aggregate**: train B cây, mỗi cây trên 1 bootstrap sample → dự đoán:
- Classification: **majority vote** qua B cây.
- Regression: **mean** của B dự đoán.

> ❓ **Câu hỏi**: tại sao bagging giảm variance? — Vì `Var(mean of B independent variables) = Var(X)/B`. B cây "độc lập" → variance giảm B lần. Cây không hoàn toàn độc lập, nhưng vẫn giảm đáng kể.

> ⚠ **Lỗi thường gặp**: nghĩ bagging giảm bias. **Không**: bias của mỗi cây không đổi → mean bias không đổi. Bagging **chỉ giảm variance**. Nếu mỗi cây underfit (high bias) → forest vẫn underfit.

### 1.3. OOB Error — Free Validation

**(a) Là gì**: ~37% samples không có mặt trong bootstrap → dùng chúng để validate cây đó mà không cần CV riêng.

**(b) Vì sao cần**: với dataset lớn, 5-fold CV tốn 5× training time. OOB validation "free" vì nó đã tự nhiên tách ra trong quá trình bootstrap.

**(c) Cách tính**:

```
For each sample i:
  trees_not_contain_i = {trees trained on bootstraps NOT including i}
  oob_prediction[i] = majority_vote(trees_not_contain_i, x_i)
OOB_error = fraction(oob_prediction[i] ≠ y_i)
```

**(d) Ví dụ số**: 100 trees, n=500 samples, B=100:
- Mỗi sample i: trung bình 100 × 0.368 ≈ 37 trees không chứa i → dùng 37 trees để validate i.
- OOB error ≈ 5.2% so với 5-fold CV error ≈ 5.4% trên Iris → **gần nhau**, OOB là approximation tốt.

> ❓ **Câu hỏi**: OOB error khác CV error không? — OOB estimate hơi lạc quan (optimistic) một chút vì mỗi cây chỉ train 63% data thay vì 80% (5-fold). Nhưng chênh lệch rất nhỏ trong thực tế.

📝 **Tóm tắt mục 1**:
- Bootstrap: n samples with replacement → ~63% unique, ~37% "out-of-bag".
- Bagging: B trees trên B bootstrap → majority vote/mean.
- Bagging giảm variance, không giảm bias.
- OOB error: free validation dùng ~37% out-of-bag samples.

---

## 2. Random Forest = Bagging + Feature Subsampling

### 2.1. Thêm Randomness: Random Feature Subset

> 💡 **Trực giác**: Bagging đã tạo diversity về **data**, nhưng nếu có một feature rất mạnh (ví dụ "Outlook" trong Play Tennis), tất cả cây sẽ dùng feature đó làm root → các cây vẫn tương quan cao → không giảm variance nhiều. Random Forest thêm diversity về **features**: mỗi lần split, chỉ xem xét `m` features ngẫu nhiên thay vì toàn bộ `d`.

**(a) Là gì**: ở mỗi node split, **chọn ngẫu nhiên m features** (không phải toàn bộ d features) → chọn best split trong m features đó.

**(b) Vì sao cần**: khi m < d, các cây sẽ split theo các features khác nhau → ít correlated → averaging giảm variance nhiều hơn.

**(c) Rule of thumb**:
- Classification: `m = √d` (ví dụ d=100 → m=10).
- Regression: `m = d/3` (ví dụ d=100 → m=33).

**(d) Ví dụ số**: d=4 features (Iris: sepal_l, sepal_w, petal_l, petal_w), m=√4=2.

Mỗi split: ngẫu nhiên chọn 2 trong 4 features, ví dụ:
- Node 1: {petal_l, sepal_w} → best split: petal_l < 2.45.
- Node 2: {petal_w, sepal_l} → best split: petal_w < 1.75.

→ Các cây khác nhau thậm chí khi có feature strong như petal_l/petal_w.

### 2.2. So sánh Bias-Variance

| Model | Bias | Variance | Khi nào dùng |
|:---|:---:|:---:|:---|
| Single deep tree | Thấp | Cao | Visualize, interpret |
| Bagging (B trees) | Thấp | Trung bình | Đơn giản, ít features |
| **Random Forest** | **Thấp** | **Thấp** | **Mặc định go-to** |
| Single shallow tree | Cao | Thấp | Interpretable baseline |

> ⚠ **Lỗi thường gặp**: tăng B (số cây) quá nhiều vô nghĩa về accuracy. Sau B≈200–500 cây, OOB error hội tụ. Tăng thêm chỉ tốn compute. Single tree thêm cây = diminishing returns.

### 2.3. Ví dụ số: Toy Dataset

**Bài toán**: 2D classification, n=100 points, 2 classes.

| Model | Train Acc | Val Acc | Std (5-fold) |
|:---|:---:|:---:|:---:|
| Single tree (max) | 100% | 82% | ±6% |
| 10-tree forest | 98% | 90% | ±3% |
| 100-tree forest | 97% | 94% | ±1.5% |
| 500-tree forest | 96% | **94.3%** | ±1.2% |

Từ 100 → 500 cây: +0.3% accuracy, đáng không? Phụ thuộc trade-off compute vs accuracy.

---

## 3. Feature Importance

### 3.1. Mean Decrease in Impurity (MDI)

**(a) Là gì**: mỗi khi feature j được dùng để split, tính tổng giảm Gini impurity × số samples → feature importance của j.

**(b) Vì sao cần**: sau khi train, biết feature nào quan trọng → dimensionality reduction, feature engineering, giải thích model cho non-technical audience.

**(c) Ví dụ số**: 100 cây trên Iris (4 features, 150 samples):

| Feature | Avg Impurity Decrease | Normalized |
|:---:|:---:|:---:|
| petal_length | 0.421 | 44.2% |
| petal_width | 0.347 | 36.4% |
| sepal_length | 0.115 | 12.1% |
| sepal_width | 0.068 | 7.1% |

Petal features quan trọng hơn sepal → phù hợp với domain knowledge (nhìn cánh hoa dễ phân loại iris hơn nhìn đài hoa).

**(d) 4 ví dụ để verify trực giác**:

1. **Toy binary**: X = [important, noise1, noise2, noise3]. Random Forest → importance: [0.85, 0.05, 0.06, 0.04]. Đúng.
2. **Correlated features**: X₁ ≈ X₂ (correlation 0.95). Importance chia đều: [0.45, 0.45, 0.05, 0.05] — MDI chia đôi thay vì chọn một.
3. **High cardinality categorical**: zipcode (10000 values) → MDI overestimates! Dùng permutation importance thay thế.
4. **Toy regression**: y = 3x₁ + 0.1x₂. Linear regression coeff = [3, 0.1]. Random Forest MDI = [0.92, 0.08]. Tỷ lệ tương đương.

### 3.2. Permutation Importance

**(a) Là gì**: shuffle từng feature j (phá vỡ mọi relationship giữa j và y), đo accuracy giảm bao nhiêu.

**(b) Vì sao cần**: MDI bị bias với high-cardinality features. Permutation importance unbiased nhưng tốn compute (shuffle mỗi feature nhiều lần).

**(c) Ví dụ**: Iris, permutation importance:
- Shuffle petal_length → accuracy giảm 31% → importance = 0.31.
- Shuffle petal_width → accuracy giảm 25% → importance = 0.25.
- Shuffle sepal_length → accuracy giảm 5%.
- Shuffle sepal_width → accuracy giảm 2%.

> 🔁 **Kiểm tra**: Random Forest có 3 trees trên bootstrap samples. Tree 1 predict class A, Tree 2 predict class B, Tree 3 predict class A. Output cuối là gì?

<details><summary>Đáp án</summary>

Majority vote: class A = 2 votes, class B = 1 vote → **predict class A**.

Nếu là regression (predict số): average = (tree1 + tree2 + tree3) / 3.

</details>

---

## 4. ExtraTrees và Variants

### 4.1. ExtraTrees (Extremely Randomized Trees)

**(a) Là gì**: thêm randomness vào threshold selection: thay vì tìm **best** threshold cho feature được chọn, **random** threshold.

**(b) So sánh Random Forest vs ExtraTrees**:

| | Random Forest | ExtraTrees |
|:---|:---:|:---:|
| Data sampling | Bootstrap (w/ replacement) | Toàn bộ |
| Feature selection | Random m features | Random m features |
| Threshold | Best threshold | **Random threshold** |
| Variance | Thấp | **Thấp hơn** |
| Bias | Thấp | **Cao hơn một chút** |
| Train speed | Chậm hơn | **Nhanh hơn** |

**(c) Ví dụ số**: trên Iris, so sánh:
- RF (100 trees): Val Acc = 96.7%, Train time = 0.08s.
- ExtraTrees (100 trees): Val Acc = 96.0%, Train time = 0.03s.

ExtraTrees nhanh hơn ~2.7×, accuracy gần bằng.

---

## 5. Bài tập

**Bài 1**: Dataset n=1000 samples. Tính xác suất chính xác một điểm cụ thể i KHÔNG có mặt trong bootstrap sample (với replacement). Dùng công thức chính xác và gần đúng e⁻¹.

**Bài 2**: Random Forest 50 trees trên Iris (4 features). Hỏi: tại mỗi split, bao nhiêu features được xem xét (m)? Tổng số "split decisions" trong toàn bộ forest nếu mỗi cây có depth=4 và là binary tree là bao nhiêu?

**Bài 3**: Single Decision Tree đạt Train=100%, Val=79%. Random Forest 100 cây đạt Train=97%, Val=94%. Theo bias-variance, giải thích tại sao Forest không 100% train accuracy mà val accuracy lại cao hơn.

**Bài 4**: Feature importance (MDI) trên dataset 5 features: [0.40, 0.05, 0.08, 0.42, 0.05]. Feature nào quan trọng nhất? Nếu features 1 và 4 là correlated (r=0.9), nhận xét gì về kết quả?

---

## 6. Lời giải chi tiết

### Bài 1

**Công thức chính xác**: P(điểm i không có mặt) = (1 − 1/n)ⁿ.
Với n=1000: (1 − 1/1000)¹⁰⁰⁰ = (0.999)¹⁰⁰⁰.

Dùng ln: ln(0.999) ≈ −0.001001 → ln((0.999)¹⁰⁰⁰) ≈ −1.001 → P ≈ e⁻¹·⁰⁰¹ ≈ 0.3677.

**Gần đúng e⁻¹** = 0.3679. Sai số: |0.3677 − 0.3679| = 0.0002 (< 0.1%).

P(có mặt) = 1 − 0.3677 = **0.6323 ≈ 63.2%**.

### Bài 2

**m tại mỗi split**: m = √d = √4 = 2 features.

**Số splits**: binary tree depth 4 → số internal nodes = 2⁰ + 2¹ + 2² + 2³ = 1+2+4+8 = 15 splits/cây.

50 trees × 15 splits = **750 split decisions** trong toàn bộ forest.

Mỗi split: chỉ xem xét m=2 thay vì d=4 features → 750 × 2 = 1500 "feature evaluations" thay vì 750 × 4 = 3000 → tiết kiệm 50% compute.

### Bài 3

**Nguyên nhân forest không đạt 100% train accuracy**:

1. **Mỗi cây train trên bootstrap (63% data)**, không phải toàn bộ. Những 37% OOB samples của mỗi cây "mới" với cây đó → có thể predict sai.
2. **Random feature subsampling**: mỗi split không nhìn toàn bộ features → mỗi cây đơn lẻ "chủ động" kém hơn single tree.
3. Voting: ngay cả với training data, đôi khi minority trees bỏ phiếu sai → train accuracy < 100%.

**Vì sao val accuracy cao hơn (bias-variance)**:
- Single tree: variance cao → "nhớ" training data, sai với new data.
- Forest: variance thấp → predictions ổn định → tổng quát hoá tốt hơn.
- Bias tương đương nhau → val accuracy tăng nhờ giảm variance, không phải giảm bias.

### Bài 4

**Feature quan trọng nhất**: Feature 4 (importance 0.42, gần bằng feature 1).

Feature 1 và 4 cộng lại: 0.40 + 0.42 = 0.82 (82% total importance).

**Nhận xét về correlation**: Khi features 1 và 4 correlated mạnh (r=0.9), MDI **chia đều** importance giữa hai features thay vì gán toàn bộ cho một feature. Điều này phản ánh đúng thực tế (cả hai đều mang thông tin tương tự) nhưng có thể gây nhầm nếu người đọc nghĩ "feature 1 và feature 4 là hai sources thông tin độc lập".

Trong trường hợp này: có thể drop một trong hai (PCA, VIF analysis) mà không mất nhiều thông tin.

---

## 7. Tham khảo

- **ESL** Chapter 15 — Random Forests.
- **ISL** Chapter 8.2 — Random Forests.
- Breiman (2001) — *Random Forests*, Machine Learning.
- **MLPP** Chapter 16.6 — Random Forests.
- [Bài trước — T2-L01: KNN & Decision Tree](../lesson-01-knn-decision-tree/README.md)
- [Bài tiếp theo — T2-L03: SVM](../lesson-03-svm/README.md)
- [visualization.html](./visualization.html)
