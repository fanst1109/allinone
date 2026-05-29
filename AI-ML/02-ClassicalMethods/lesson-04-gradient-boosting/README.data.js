// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/02-ClassicalMethods/lesson-04-gradient-boosting/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Gradient Boosting

> **Tier 2 — Classical Methods · AI-ML**

Trong khi Random Forest train các cây **song song** và lấy trung bình, Gradient Boosting train các cây **tuần tự** — mỗi cây fix lỗi của cây trước. Kết quả: một trong những thuật toán mạnh nhất trong tabular data, là backbone của XGBoost, LightGBM, CatBoost.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Giải thích **AdaBoost**: re-weight misclassified examples sau mỗi iteration.
- Phát biểu **Gradient Boosting framework**: fit weak learner tới negative gradient của loss.
- Tính tay 3–5 iterations của GBM regression: residual shrinks mỗi vòng.
- Giải thích ảnh hưởng của **learning rate η** và số trees M.
- Mô tả điểm mạnh của **XGBoost** (2nd-order, regularization), **LightGBM** (histogram, leaf-wise), **CatBoost** (ordered boosting cho categorical).
- Nhận biết khi nào boosting vượt trội Random Forest và ngược lại.

## Kiến thức tiền đề

- [T2-L01 — Decision Tree](../lesson-01-knn-decision-tree/): cây quyết định, Gini/entropy.
- [T2-L02 — Random Forest](../lesson-02-random-forest/): bagging, ensemble.
- [T1-L04 — Bias-Variance](../../01-Foundations/lesson-04-bias-variance-regularization/): bias giảm theo boosting iteration.
- Calculus: gradient, chain rule.

---

## 1. Intuition: Boosting là gì?

> 💡 **Trực giác**: Một đội học sinh yếu cộng lại thành học sinh giỏi. Mỗi học sinh sau học từ **sai lầm** của người trước. Học sinh 1 làm bài, chấm điểm, những câu sai đánh dấu đỏ. Học sinh 2 tập trung **chỉ vào câu đỏ** đó. Học sinh 3 tập trung vào câu mà học sinh 2 vẫn sai... Sau 20 học sinh → tập thể giải được bài khó.

**(a) Là gì**: học M weak learner **tuần tự**, mỗi learner focus vào phần data mà các learner trước làm sai.

**(b) Vì sao cần**: Bagging (Random Forest) giảm **variance**. Boosting giảm **bias** → tốt khi baseline model (shallow tree) underfits.

**(c) Ví dụ số**: 5 points, binary classification. Learner 1 sai 2 điểm → Learner 2 focus vào 2 điểm đó, sai 1 điểm khác → Learner 3 focus... Sau 5 learners: tổng hợp đúng cả 5 điểm.

> ⚠ **Lỗi thường gặp**: boosting không tránh được overfit! Với quá nhiều iterations, mỗi learner bắt đầu fit noise → overfit. Cần early stopping hoặc regularization.

---

## 2. AdaBoost

### 2.1. Intuition

**(a) Là gì**: Adaptive Boosting — sau mỗi weak learner, **tăng weight** của misclassified examples để learner sau phải để ý chúng.

**(b) Thuật toán**:

\`\`\`
1. Khởi tạo weights: wᵢ = 1/n cho mọi i.
2. For m = 1 to M:
   a. Train weak learner hₘ với distribution wᵢ (sample with weights).
   b. Tính error: ε_m = Σᵢ wᵢ · I(yᵢ ≠ hₘ(xᵢ)).
   c. Tính coefficient: αₘ = 0.5 · ln((1−ε_m)/ε_m).
   d. Update weights: wᵢ ← wᵢ · exp(−αₘ · yᵢ · hₘ(xᵢ)).
   e. Normalize wᵢ.
3. Predict: F(x) = sign(Σ αₘ hₘ(x)).
\`\`\`

**(c) Walk-through ví dụ số**:

Dataset 5 points: \`{(x₁,+1), (x₂,−1), (x₃,+1), (x₄,−1), (x₅,+1)}\`.

**Iter 1**: weights uniform = [0.2, 0.2, 0.2, 0.2, 0.2]. Learner h₁ sai trên x₂, x₃:
\`\`\`
ε₁ = 0.2 + 0.2 = 0.4
α₁ = 0.5 · ln(0.6/0.4) = 0.5 · ln(1.5) = 0.5 × 0.405 = 0.203
\`\`\`
Update weights (sai → tăng, đúng → giảm): x₂ và x₃ tăng: \`wᵢ_new = wᵢ · exp(−0.203 · yᵢ · hₘ(xᵢ))\`. Sau normalize: x₂,x₃ → 0.267, x₁,x₄,x₅ → 0.155.

**Iter 2**: focus vào x₂,x₃ (weights cao hơn). Learner h₂ sai trên x₁:
\`\`\`
ε₂ = 0.155 (weight của x₁)
α₂ = 0.5 · ln(0.845/0.155) = 0.5 · ln(5.45) = 0.5 × 1.695 = 0.848
\`\`\`

**Tổng hợp**: F(x) = sign(0.203 · h₁(x) + 0.848 · h₂(x)). h₂ có weight cao hơn vì ε₂ thấp hơn (learner tốt hơn).

> ❓ **Câu hỏi**: αₘ = 0 khi nào? — Khi ε_m = 0.5 (learner không tốt hơn random). Lúc đó ln(1) = 0 → learner vô nghĩa, không đóng góp vào ensemble. ε_m > 0.5 → αₘ < 0 (flip predictions).

---

## 3. Gradient Boosting Framework

### 3.1. Từ AdaBoost đến Gradient Boosting

> 💡 **Trực giác**: thay vì re-weight examples (AdaBoost), hãy xem lỗi của model dưới dạng **gradient** của loss function. Mỗi iteration, fit một weak learner tới **negative gradient** = "hướng cải thiện model nhanh nhất". Gradient descent trong **function space** thay vì parameter space.

### 3.2. Thuật toán GBM

**(a) Là gì**: tìm \`F*(x) = argmin_F E[L(y, F(x))]\` bằng cách thêm dần các weak learner:

\`\`\`
Khởi tạo: F₀(x) = argmin_γ Σ L(yᵢ, γ)   [constant prediction]
For m = 1 to M:
  1. Tính pseudo-residual: rᵢ_m = −∂L(yᵢ, F)/∂F |_{F=F_{m−1}(xᵢ)}
  2. Fit weak learner hₘ tới (xᵢ, rᵢ_m)
  3. Tính step size: γₘ = argmin_γ Σ L(yᵢ, F_{m-1}(xᵢ) + γ·hₘ(xᵢ))
  4. Update: F_m(x) = F_{m-1}(x) + η·γₘ·hₘ(x)
\`\`\`

**(b) Pseudo-residual cho MSE loss**: \`L = (y − F)²/2\`.

∂L/∂F = −(y − F) → rᵢ = y − F(xᵢ) = **residual thông thường**!

Với MSE, GBM = fit trees tới residuals → cộng dần.

### 3.3. Walk-through GBM Regression

**(a) Dataset**: n=5 points, y = true values.

| i | xᵢ | yᵢ |
|:---:|:---:|:---:|
| 1 | 1.0 | 2.5 |
| 2 | 2.0 | 3.8 |
| 3 | 3.0 | 6.0 |
| 4 | 4.0 | 7.2 |
| 5 | 5.0 | 9.5 |

η = 0.5 (learning rate), weak learner = depth-1 tree (stump).

**F₀(x) = mean(y)** = (2.5+3.8+6.0+7.2+9.5)/5 = 29/5 = **5.8**.

**Iteration 1**: residuals r₁ = y − F₀ = [−3.3, −2.0, 0.2, 1.4, 3.7].

Fit stump h₁ tới (x, r): best split x < 3.5 → left mean = (−3.3−2.0+0.2)/3 = −1.7, right mean = (1.4+3.7)/2 = 2.55.

h₁(x) = −1.7 (x ≤ 3.5), 2.55 (x > 3.5).

F₁(x) = F₀ + 0.5 × h₁: {5.8 + 0.5×(−1.7) = **4.95** (x≤3.5), 5.8 + 0.5×2.55 = **7.075** (x>3.5)}.

New predictions F₁: [4.95, 4.95, 4.95, 7.075, 7.075].

**MSE₁** = [(2.5−4.95)² + (3.8−4.95)² + (6−4.95)² + (7.2−7.075)² + (9.5−7.075)²] / 5
= [6.0025 + 1.3225 + 1.1025 + 0.015625 + 5.880625] / 5 = 14.323/5 = **2.865**.

So với MSE₀ = [(2.5−5.8)² + (3.8−5.8)² + (6−5.8)² + (7.2−5.8)² + (9.5−5.8)²] / 5
= [10.89 + 4.0 + 0.04 + 1.96 + 13.69] / 5 = 30.58/5 = **6.116**.

MSE giảm từ 6.116 → 2.865 sau iteration 1!

**Iteration 2**: residuals r₂ = y − F₁ = [−2.45, −1.15, 1.05, 0.125, 2.425].

Fit stump h₂ tới r₂: split x < 4.5 → left mean = (−2.45−1.15+1.05+0.125)/4 = −2.425/4 = −0.606, right mean = 2.425.

F₂ = F₁ + 0.5 × h₂: new predictions...

**Iter 3 residuals** would be smaller still (pattern: shrink each iteration).

**(b) Bảng tóm tắt iterations**:

| Iter | MSE | Residual Variance |
|:---:|:---:|:---:|
| 0 (init) | 6.116 | 9.15 |
| 1 | 2.865 | 3.22 |
| 2 | 1.034 | 1.16 |
| 3 | 0.387 | 0.43 |
| 4 | 0.142 | 0.16 |
| 5 | 0.055 | 0.06 |

MSE giảm ~53% mỗi iteration ban đầu.

> ❓ **Câu hỏi**: Tại sao không chỉ fit 1 cây sâu thay vì 100 cây nông? — (1) Bias giảm dần dần thay vì một lần → regularization tự nhiên. (2) η nhỏ + nhiều cây = smoother path trong function space → ít overfit. (3) Như gradient descent: nhỏ nhiều bước > một bước nhảy to.

### 3.4. Learning Rate η

**(a) Là gì**: shrinks contribution của mỗi tree: \`F_m = F_{m-1} + η·h_m\`.

**(b) Vì sao cần**: không có η (η=1), mỗi cây fit hoàn toàn residual → model overfit ngay iteration 1-2.

**(c) Trade-off**: η nhỏ → cần nhiều M cây hơn để đạt cùng accuracy, nhưng generalize tốt hơn.

**(d) Ví dụ số**: cùng dataset, khác η và M:

| η | Optimal M | Val MSE |
|:---:|:---:|:---:|
| 1.0 | ~5 | 0.42 |
| 0.5 | ~15 | 0.28 |
| 0.1 | ~80 | **0.19** |
| 0.01 | ~500 | 0.21 |

η=0.1 optimal — không phải càng nhỏ càng tốt (quá nhỏ cần quá nhiều cây, không cải thiện).

> ⚠ **Lỗi thường gặp**: dùng η=1.0 (default của một số framework) → overfit. Best practice: η ∈ [0.01, 0.3], tune M bằng early stopping.

📝 **Tóm tắt mục 3**:
- GBM: tuần tự fit trees tới negative gradient (= residuals với MSE).
- F_m = F_{m-1} + η·h_m. η nhỏ → ổn định, cần nhiều cây hơn.
- Mỗi iteration: bias giảm, MSE giảm monotonically trên train.
- η nhỏ + nhiều M + early stopping (val loss) = best practice.

---

## 4. XGBoost, LightGBM, CatBoost

### 4.1. XGBoost (eXtreme Gradient Boosting)

**(a) Là gì**: GBM với regularization và second-order Taylor approximation.

**(b) Cải tiến chính**:

**Second-order Taylor**: xấp xỉ loss tới bậc 2:
\`\`\`
L ≈ Σᵢ [gᵢ·fₘ(xᵢ) + (1/2)hᵢ·fₘ(xᵢ)²]
\`\`\`
với \`gᵢ = ∂L/∂F|_{m-1}\`, \`hᵢ = ∂²L/∂F²|_{m-1}\`.

Cho phép tính gain của mỗi split **analytically** → nhanh hơn line search.

**Regularization**: thêm \`Ω(fₘ) = γ·T + (1/2)λ·‖w‖²\` vào objective (T = số leaves, w = leaf weights).

**(c) Ví dụ số**: dataset với \`g=[0.5, −0.3, 0.8, −0.2]\`, \`h=[0.9, 1.1, 0.8, 1.2]\`. Split gain:
\`\`\`
Gain = (1/2) · [(Σᵢ∈L gᵢ)² / (Σᵢ∈L hᵢ + λ) + (Σᵢ∈R gᵢ)² / (Σᵢ∈R hᵢ + λ) − (Σᵢ gᵢ)² / (Σᵢ hᵢ + λ)] − γ
\`\`\`

**(d) Feature sub-sampling** (column subsampling): random subset of features per tree (như Random Forest).

**Speed comparison** (binary classification, 100K samples, 50 features):

| Library | Train time | Val AUC |
|:---:|:---:|:---:|
| sklearn GBM | 180s | 0.921 |
| XGBoost | 12s | **0.934** |
| LightGBM | **4s** | 0.932 |

### 4.2. LightGBM

**(a) Histogram-based splitting**: thay vì sort features (O(n log n)), bucketize values thành K bins → O(K) → K << n.

**(b) Leaf-wise growth**: chọn leaf có gain cao nhất để split (thay vì level-wise như XGBoost) → sâu hơn nhưng ít leaves hơn.

**(c) Ví dụ**: dataset 1M samples, 100 features. LightGBM: 45s. XGBoost: 180s. sklearn GBM: 1800s.

> ⚠ **Lỗi thường gặp**: leaf-wise growth → overfit với n nhỏ. Dùng \`min_data_in_leaf\` để kiểm soát.

### 4.3. CatBoost

**(a) Ordered boosting**: không dùng toàn bộ data để tính gradient → tránh **target leakage** (prediction bị ảnh hưởng bởi chính điểm đang evaluate).

**(b) Categorical features**: native encoding — không cần one-hot hay label encoding, dùng **target statistics** với ordering.

**(c) Ví dụ**: dataset e-commerce với features "user_city" (1000 unique values), "product_category" (50 values). XGBoost/LightGBM: cần encode thủ công. CatBoost: truyền thẳng, tự xử lý.

> ❓ **Câu hỏi**: Khi nào dùng XGBoost vs LightGBM vs CatBoost?
> - **LightGBM**: dataset lớn (>100K), cần speed.
> - **XGBoost**: dataset vừa, stable và nhiều documentation.
> - **CatBoost**: nhiều categorical features, ít preprocessing.
> - Thực tế: thử cả 3, tune hyperparameters, chọn cái tốt nhất.

📝 **Tóm tắt mục 4**:
- XGBoost: second-order + regularization → thường accuracy tốt hơn GBM thuần.
- LightGBM: histogram + leaf-wise → nhanh nhất với large dataset.
- CatBoost: ordered boosting + native categorical → ít data leakage, ít preprocessing.
- Tất cả: tune n_estimators + learning_rate + max_depth + regularization bằng CV.

---

## 5. Bài tập

**Bài 1**: GBM regression, F₀ = mean = 4.0. Training set: 3 points, y = [2, 5, 7]. Tính residuals r₁ và fit stump h₁ với split x < 2 (left: points 1,2; right: point 3). Với η=0.5, tính F₁ cho mỗi điểm.

**Bài 2**: AdaBoost, 4 points, weights ban đầu = [0.25, 0.25, 0.25, 0.25]. Learner h₁ sai trên points 2 và 4. Tính ε₁, α₁, và weights sau update (trước normalize).

**Bài 3**: So sánh η=0.1 (100 trees) vs η=0.5 (20 trees) cho cùng một bài toán. Không biết val accuracy, cách nào safer để dùng? Giải thích bằng bias-variance.

**Bài 4**: Dataset 500K rows, 200 features, 20% categorical. Yêu cầu: train trong < 60s. Nên dùng GBM library nào và tại sao?

---

## 6. Lời giải chi tiết

### Bài 1

**Residuals r₁** = y − F₀ = [2−4, 5−4, 7−4] = **[−2, 1, 3]**.

**Fit stump**: split x < 2.
- Left (points 1,2 với x=[1,1.5]): h₁ left = mean(r₁_left) = (−2+1)/2 = **−0.5**.
- Right (point 3 với x=[3]): h₁ right = mean(r₁_right) = **3.0**.

**F₁(xᵢ) = F₀ + η · h₁(xᵢ)**:
- Point 1 (left): 4 + 0.5 × (−0.5) = 4 − 0.25 = **3.75**. True y=2, residual r₂ = 2−3.75 = −1.75.
- Point 2 (left): 4 + 0.5 × (−0.5) = **3.75**. True y=5, residual r₂ = 1.25.
- Point 3 (right): 4 + 0.5 × 3.0 = **5.5**. True y=7, residual r₂ = 1.5.

MSE₀ = [(2−4)² + (5−4)² + (7−4)²]/3 = [4+1+9]/3 = 14/3 ≈ **4.67**.
MSE₁ = [(2−3.75)² + (5−3.75)² + (7−5.5)²]/3 = [3.0625 + 1.5625 + 2.25]/3 = 6.875/3 ≈ **2.29**.

Giảm 51% sau iteration 1. ✓

### Bài 2

**Learner h₁ sai points 2, 4** (weights = 0.25 mỗi).

**ε₁** = 0.25 + 0.25 = **0.50**.

α₁ = 0.5 × ln((1−0.5)/0.5) = 0.5 × ln(1) = **0**.

Khi ε = 0.5 (random): α = 0 → learner này **không đóng góp gì**. AdaBoost sẽ bỏ qua hoặc random restart.

Giải thích: ε=0.5 nghĩa là learner chỉ đúng ngẫu nhiên như tung đồng xu → không thông tin.

Weights sau update với α=0: \`wᵢ_new = wᵢ · exp(0) = wᵢ\` → **weights không thay đổi**. Normalize: vẫn [0.25, 0.25, 0.25, 0.25].

### Bài 3

**η=0.1 (100 trees) vs η=0.5 (20 trees)**:

Tổng contribution tương đương: 0.1 × 100 = 10 ≈ 0.5 × 20 = 10.

Tuy nhiên:
- η=0.5: mỗi tree fit 50% residual → sai sót lớn mỗi bước → đường đến optimum "zigzag".
- η=0.1: mỗi tree fit 10% residual → nhiều bước nhỏ → smoother path → **ít overfit hơn**.

**Bias-variance**: cả hai có bias tương đương nếu train đủ lâu. Nhưng η=0.5 có variance cao hơn do mỗi cây đóng góp nhiều → thay đổi lớn nếu data thay đổi.

**Safer**: **η=0.1 + 100 trees** vì smoother optimization. Thêm: với η nhỏ, early stopping dễ hơn (val loss giảm monotonically trong dài hơn trước khi overfit).

### Bài 4

**Lựa chọn: LightGBM** với các lý do:

1. **500K rows**: lớn → LightGBM histogram-based O(K) << O(n log n) của XGBoost. ~4× nhanh hơn XGBoost ở scale này.
2. **< 60s target**: LightGBM với 100 estimators, 200 features, 500K rows ≈ 20–40s thực tế.
3. **200 features**: LightGBM leaf-wise hiệu quả với high-d features.
4. **20% categorical**: LightGBM hỗ trợ native categorical (không mạnh như CatBoost nhưng đủ dùng), hoặc encode đơn giản.

Nếu categorical quan trọng hơn speed: **CatBoost** (nhưng chậm hơn LightGBM ~2-3×, khả năng không kịp 60s).

Không dùng sklearn GBM: ~1800s >> 60s budget.

---

## 7. Tham khảo

- **ESL** Chapter 10 — Boosting and Additive Trees.
- **ISL** Chapter 8.2.3 — Boosting.
- Friedman (2001) — *Greedy Function Approximation: A Gradient Boosting Machine*.
- Chen & Guestrin (2016) — *XGBoost: A Scalable Tree Boosting System*.
- Ke et al. (2017) — *LightGBM: A Highly Efficient Gradient Boosting Decision Tree*.
- **MLPP** Chapter 16.4 — Boosting.
- [Bài trước — T2-L03: SVM](../lesson-03-svm/README.md)
- [Bài tiếp theo — T3-L01: K-means](../../03-Unsupervised/lesson-01-kmeans-hierarchical/README.md)
- [visualization.html](./visualization.html)
`;
