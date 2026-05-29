// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/01-Foundations/lesson-04-bias-variance-regularization/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Bias-Variance & Regularization

> **Tier 1 — Foundations · AI-ML**

Mô hình ML không chỉ cần "khớp data huấn luyện" — nó cần **tổng quát hoá** sang data mới. Bài này giải thích tại sao có model quá đơn giản (underfit) và model quá phức tạp (overfit), cách đo lường qua bias-variance decomposition, và cách kiểm soát qua regularization.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Phát biểu được **bias-variance decomposition**: \`E[(ŷ − y)²] = Bias² + Variance + Irreducible noise\`.
- Vẽ được sơ đồ U-shape của validation error theo model complexity.
- Giải thích **L2 Ridge** và **L1 Lasso** khác nhau ở chỗ nào và khi nào dùng cái nào.
- Tính được hệ số shrinkage của Ridge với ví dụ số cụ thể.
- Giải thích tại sao Lasso tạo **sparse weights** (một số coefficient = 0).
- Mô tả Elastic Net, Dropout, Early stopping là regularization theo nghĩa nào.
- Thực hiện **k-fold cross-validation** và đọc được kết quả \`mean ± std\`.

## Kiến thức tiền đề

- [Lesson 02 — Linear Regression](../lesson-02-linear-regression/): linear model, loss function MSE, gradient descent.
- [Lesson 03 — Logistic Regression](../lesson-03-logistic-regression/): classification, overfitting cơ bản.
- Calculus: đạo hàm riêng, norm vector.

---

## 1. Bài toán đặt ra: Generalization gap

### 1.1. Hiện tượng

Bạn train polynomial regression trên 20 điểm:

- **Degree 1** (đường thẳng): training MSE = 0.65, validation MSE = 0.68. *Tạm được nhưng chưa capture được pattern phi tuyến.*
- **Degree 3**: training MSE = 0.12, validation MSE = 0.14. *Khớp tốt cả hai.*
- **Degree 10**: training MSE = 0.001, validation MSE = 8.7. *Training gần như 0, nhưng validation cực tệ.*

> 💡 **Trực giác**: Degree 10 giống một sinh viên **học vẹt**: nhớ toàn bộ 20 câu hỏi trong đề luyện tập nhưng không hiểu quy luật → gặp câu mới là sai.

**Generalization gap** = \`val MSE − train MSE\`. Degree 10: gap = 8.699.

### 1.2. Câu hỏi mở bài

- **Vì sao** degree 10 lại "nhớ" data thay vì "học" quy luật?
- **Làm sao đo** mức độ overfit/underfit một cách có nguyên lý, không chỉ nhìn đồ thị?
- **Làm sao ép** model phức tạp phải tổng quát hoá mà không giảm degree?

Ba câu hỏi này sẽ được trả lời ở mục 2, 3, và 4 tương ứng.

---

## 2. Bias-Variance Decomposition

### 2.1. Định nghĩa

> 💡 **Trực giác**: Tưởng tượng bạn có 100 bộ data khác nhau, mỗi bộ 20 điểm, cùng rút từ phân phối thật. Train model trên mỗi bộ → 100 đường cong khác nhau. **Bias** đo xem trung bình 100 đường cong đó có trúng target không. **Variance** đo xem 100 đường cong đó có giống nhau không.

**(a) Là gì**: với model \`f̂\` học từ tập train ngẫu nhiên và target \`y = f(x) + ε\`:

\`\`\`
E[(ŷ(x) − y)²] = [f(x) − Ef̂(x)]² + Var[f̂(x)] + Var[ε]
                =      Bias²        +   Variance   + σ²_noise
\`\`\`

- **Bias²**: sai lệch hệ thống — trung bình dự đoán của model cách xa giá trị thật bao nhiêu.
- **Variance**: sự dao động của dự đoán khi train trên các dataset khác nhau.
- **Irreducible noise σ²**: nhiễu trong data, không model nào loại bỏ được.

**(b) Vì sao cần**: giúp **chuẩn đoán** model đang bị lỗi gì:
- Bias cao → model quá đơn giản → thêm features, tăng complexity.
- Variance cao → model quá phức tạp → giảm complexity, thêm data, dùng regularization.
- Nếu không biết nguồn gốc lỗi → sửa sai hướng → lãng phí công sức.

**(c) Ví dụ số**: polynomial regression trên hàm \`y = sin(πx) + ε, ε ~ N(0, 0.1)\`, n=20 điểm:

| Degree | Bias² | Variance | Total Expected MSE |
|:---:|:---:|:---:|:---:|
| 1 | 0.42 | 0.01 | 0.43 + σ² |
| 3 | 0.08 | 0.05 | 0.13 + σ² |
| 7 | 0.01 | 0.31 | 0.32 + σ² |
| 10 | 0.001 | 1.42 | 1.42 + σ² |

**Nhận xét**: degree 3 là điểm tối ưu — bias² và variance đều thấp. Degree 10: bias gần 0 nhưng variance bùng nổ.

> ❓ **Câu hỏi**: Tại sao variance tăng khi degree tăng? — Vì polynomial bậc cao có nhiều parameter hơn → mỗi parameter nhạy cảm với từng điểm cụ thể trong training set → khi data thay đổi, toàn bộ đường cong thay đổi lớn.

> ❓ **Câu hỏi**: Có thể giảm cả bias lẫn variance không? — Về mặt lý thuyết: **thêm data** là cách duy nhất giảm cả hai. Thêm data → variance giảm (trung bình ổn hơn) → có thể dùng model phức tạp hơn (bias giảm) mà variance vẫn kiểm soát được.

> ⚠ **Lỗi thường gặp**: nhiều người hiểu "bias-variance tradeoff" là **luôn luôn** phải hi sinh cái này để có cái kia. **Sai**: ensemble methods (Random Forest, boosting) giảm variance mà không tăng bias đáng kể; deep learning với regularization tốt giảm cả hai khi có đủ data.

### 2.2. U-Shape: Validation MSE theo Model Complexity

\`\`\`
MSE
 ^
 |          * (train MSE)
 |         **
 |    ****   * * *  *  *  (val MSE giảm rồi tăng → U-shape)
 |  **  
 | *
 +-------------------------------------> degree
     1   2   3   4   5   6  ... 10
           ^
           optimal
\`\`\`

| Degree | Train MSE | Val MSE | Nhận xét |
|:---:|:---:|:---:|:---|
| 1 | 0.65 | 0.68 | Underfit — high bias |
| 2 | 0.25 | 0.27 | Tốt hơn |
| 3 | 0.12 | 0.14 | **Sweet spot** |
| 5 | 0.05 | 0.22 | Bắt đầu overfit |
| 7 | 0.02 | 1.10 | Overfit rõ |
| 10 | 0.001 | 8.70 | Overfit nghiêm trọng |

> 🔁 **Kiểm tra**: Nếu train MSE = 0.1 và val MSE = 0.12 → model đang bị gì?

<details><summary>Đáp án</summary>

Cả hai đều cao (tương đối), val cao hơn train một chút. Khả năng: **high bias** (underfit). Cần tăng complexity. Nếu train MSE thấp (ví dụ 0.01) và val MSE = 0.12 → **high variance** (overfit).

</details>

📝 **Tóm tắt mục 2**:
- Expected MSE = Bias² + Variance + σ²_irreducible.
- Bias cao: model quá đơn giản → underfit.
- Variance cao: model quá phức tạp → overfit.
- Val MSE vẽ U-shape theo degree: sweet spot ở giữa.
- Cả hai giảm khi thêm data; regularization giảm variance.

---

## 3. Regularization: ép Variance về

> 💡 **Trực giác**: Thay vì giảm degree (bỏ đi khả năng của model), regularization **phạt** model nếu dùng coefficients lớn. Giống như ra đề thi: bạn được dùng calculator (tăng capacity), nhưng mỗi lần nhấn một phím bị trừ 0.01 điểm — bạn sẽ chỉ dùng khi thật sự cần.

### 3.1. L2 Regularization — Ridge Regression

**(a) Là gì**: thêm penalty \`λ·‖w‖²\` vào loss:

\`\`\`
L_ridge(w) = MSE(w) + λ · Σ wⱼ²
           = (1/n)‖Xw − y‖² + λ·‖w‖²
\`\`\`

**(b) Vì sao cần**: polynomial degree 10 với coefficients lớn → đường cong dao động mạnh. Ridge ép coefficients nhỏ lại → đường cong mượt hơn.

**(c) Ví dụ số**: Linear regression với 4 features: \`w = [3.5, −2.1, 4.8, −1.3]\`:
- \`‖w‖² = 3.5² + 2.1² + 4.8² + 1.3² = 12.25 + 4.41 + 23.04 + 1.69 = 41.39\`

Ridge closed-form: \`w* = (XᵀX + λI)⁻¹Xᵀy\`.

Bảng shrinkage theo λ (n=20 điểm, giữ nguyên features):

| λ | w₁ | w₂ | w₃ | w₄ | ‖w‖² |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 3.50 | −2.10 | 4.80 | −1.30 | 41.39 |
| 0.1 | 3.21 | −1.93 | 4.40 | −1.19 | 34.80 |
| 1.0 | 2.18 | −1.31 | 2.99 | −0.81 | 16.05 |
| 10 | 0.72 | −0.43 | 0.98 | −0.27 | 1.75 |

**Nhận xét**: λ tăng → ‖w‖² giảm **monotonically**. Không có coefficient nào = 0 chính xác — Ridge **shrink** về 0 nhưng không bằng 0.

> ❓ **Câu hỏi**: Tại sao \`(XᵀX + λI)\` luôn invertible? — Vì \`XᵀX\` positive semi-definite, cộng \`λI\` (λ > 0) → positive definite → luôn invertible. Đây là lý do Ridge cũng dùng để giải quyết **ill-conditioned** systems.

### 3.2. L1 Regularization — Lasso Regression

**(a) Là gì**: penalty là \`λ·‖w‖₁\` = \`λ · Σ|wⱼ|\`:

\`\`\`
L_lasso(w) = (1/n)‖Xw − y‖² + λ · Σ|wⱼ|
\`\`\`

**(b) Vì sao cần**: khi **nhiều feature nhưng ít cái thật sự quan trọng** (sparse ground truth). Lasso tự động chọn feature bằng cách đặt coefficient của feature irrelevant = 0.

**(c) Ví dụ số**: cùng dataset 4 features, chỉ feature 1 và 3 thực sự ảnh hưởng y:

| λ | w₁ | w₂ | w₃ | w₄ | Non-zero |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 3.50 | −2.10 | 4.80 | −1.30 | 4 |
| 0.1 | 3.12 | −1.31 | 4.38 | −0.47 | 4 |
| 0.5 | 2.61 | −0.00 | 3.87 | −0.00 | 2 |
| 1.0 | 1.89 | −0.00 | 3.12 | −0.00 | 2 |
| 2.0 | 0.81 | −0.00 | 1.43 | −0.00 | 2 |

λ = 0.5 → w₂ và w₄ trở thành 0 chính xác → **feature selection tự động**.

> 💡 **Tại sao L1 tạo sparsity còn L2 thì không?**: Hình học!
> - L1 constraint: vùng khả thi \`|w₁| + |w₂| ≤ t\` là hình thoi → các góc của hình thoi nằm trên trục toạ độ → solution hay nằm tại góc → một số wⱼ = 0 chính xác.
> - L2 constraint: \`w₁² + w₂² ≤ t\` là hình tròn → không có góc → solution trượt trên cạnh tròn → wⱼ → 0 nhưng không bằng 0.

> ⚠ **Lỗi thường gặp**: nghĩ Lasso "tốt hơn" Ridge vì tạo sparsity. **Sai**: nếu nhiều feature đều quan trọng, Lasso xoá bỏ arbitrarily → mất thông tin. Ridge giữ tất cả với trọng số nhỏ hơn. Chọn tuỳ bài toán.

### 3.3. Elastic Net

**(a) Là gì**: kết hợp L1 + L2:

\`\`\`
L_en(w) = MSE + λ₁·‖w‖₁ + λ₂·‖w‖²
\`\`\`

**(b) Vì sao cần**: khi có **nhiều feature tương quan cao** (correlated features). Lasso chọn ngẫu nhiên một trong các feature tương quan → không ổn định. Ridge giữ tất cả → không sparse. Elastic Net vừa tạo sparsity vừa xử lý correlation.

**(c) Ví dụ**: \`x₁ ≈ x₂\` (correlation 0.95). Lasso: chọn x₁ bỏ x₂. Ridge: giữ cả hai với w nhỏ. Elastic Net: giữ cả hai nhưng với trọng số tương đương nhau.

### 3.4. Regularization cho Neural Networks: Dropout

**(a) Là gì**: trong mỗi forward pass training, **ngẫu nhiên tắt** p% neurons (set activation = 0).

**(b) Vì sao cần**: neural network dễ dàng học cách "cheat" bằng một vài neuron "siêu mạnh" (co-adaptation). Dropout buộc mỗi neuron phải tự học feature hữu ích — không dựa vào neuron khác.

**(c) Ví dụ**: layer 100 neurons, dropout rate = 0.5. Training forward pass: ngẫu nhiên tắt ~50 neurons. Test time: tắt dropout, nhân tất cả weights bởi (1 − p) = 0.5 để có cùng scale.

> ❓ **Câu hỏi**: Dropout có ảnh hưởng inference không? — Không tắt neuron nào lúc inference. Scale adjustment: nhân output bởi (1−p), hoặc dùng **inverted dropout** (scale 1/p lúc train, không scale lúc test) — PyTorch dùng inverted dropout.

### 3.5. Early Stopping

**(a) Là gì**: dừng training khi validation loss không cải thiện sau \`patience\` epochs.

**(b) Vì sao cần**: neural network training: train loss giảm monotonically, nhưng val loss giảm rồi tăng. Điểm tăng trở lại = bắt đầu overfit. Early stopping tự động dừng ở điểm tốt nhất.

**(c) Ví dụ số**:

| Epoch | Train Loss | Val Loss | Action |
|:---:|:---:|:---:|:---|
| 10 | 0.42 | 0.45 | Continue |
| 20 | 0.31 | 0.38 | Continue |
| 30 | 0.21 | 0.35 | **Best model saved** |
| 40 | 0.14 | 0.38 | patience 1/3 |
| 50 | 0.10 | 0.42 | patience 2/3 |
| 60 | 0.07 | 0.47 | patience 3/3 → **STOP** |

Restore weights từ epoch 30.

> 🔁 **Kiểm tra**: Tại epoch 30 train=0.21, val=0.35. Tại epoch 60 train=0.07, val=0.47. Tính generalization gap và kết luận.

<details><summary>Đáp án</summary>

- Epoch 30: gap = 0.35 − 0.21 = 0.14.
- Epoch 60: gap = 0.47 − 0.07 = 0.40.

Gap tăng 3×: rõ ràng đã overfit từ epoch 30 trở đi. Early stopping đúng khi save ở epoch 30.

</details>

📝 **Tóm tắt mục 3**:
- Ridge (L2): shrink coefficients về 0, không bằng 0. Giải quyết ill-conditioning. Dùng khi nhiều feature đều quan trọng.
- Lasso (L1): một số coefficients = 0 chính xác → feature selection. Dùng khi sparse ground truth.
- Elastic Net: kết hợp, tốt với correlated features.
- Dropout: tắt ngẫu nhiên neurons lúc train → neural net phải tự học. Scale lúc test.
- Early stopping: dừng khi val loss tăng trở lại.

---

## 4. Cross-Validation

### 4.1. Vấn đề của train/val split đơn

> 💡 **Trực giác**: chọn model dựa trên một val set duy nhất giống như chấm điểm toàn bộ khoá học bằng một bài kiểm tra ngẫu nhiên. Kết quả phụ thuộc nhiều vào may mắn: 20 điểm "dễ" hay "khó" trong val set.

Giải pháp: **cross-validation** — dùng nhiều splits, lấy trung bình.

### 4.2. k-Fold Cross-Validation

**(a) Là gì**: chia data thành k phần (folds) bằng nhau. Train trên k−1 folds, validate trên fold còn lại. Lặp k lần → k scores → lấy mean ± std.

**(b) Vì sao cần**: mỗi điểm data được dùng làm validation **đúng 1 lần** → estimate unbiased hơn. Với k=5: dùng 80% data train, 20% validate, không lãng phí.

**(c) Ví dụ số**: 5-fold CV trên Iris dataset (150 samples, 3 classes):

| Fold | Train size | Val size | Accuracy |
|:---:|:---:|:---:|:---:|
| 1 | 120 | 30 | 0.967 |
| 2 | 120 | 30 | 0.933 |
| 3 | 120 | 30 | 0.967 |
| 4 | 120 | 30 | 0.900 |
| 5 | 120 | 30 | 0.967 |

**Mean = 0.947, Std = 0.025.**

Report: "K-NN (k=5) đạt **94.7% ± 2.5%** trên 5-fold CV."

> ❓ **Câu hỏi**: Tại sao Fold 4 thấp hơn? — Ngẫu nhiên: fold 4 có thể rơi vào nhiều điểm boundary khó phân loại. Đây là lý do cần std — std = 0.025 là chấp nhận được, cho thấy kết quả ổn định.

### 4.3. Stratified k-Fold

**(a) Là gì**: mỗi fold giữ nguyên tỷ lệ class như toàn bộ dataset.

**(b) Vì sao cần**: nếu dataset imbalanced (10% positive, 90% negative), một fold ngẫu nhiên có thể không có positive nào → val score vô nghĩa.

**(c) Ví dụ**: 100 samples: 10 positive, 90 negative. 5-fold stratified: mỗi fold có 2 positive và 18 negative. Regular k-fold: có thể fold nào đó có 0 positive.

### 4.4. Nested Cross-Validation

**(a) Là gì**: CV vòng ngoài để ước lượng generalization error; CV vòng trong để tune hyperparameter.

\`\`\`
Outer loop (5-fold): estimate generalization error
  Inner loop (3-fold): select best hyperparameter λ
\`\`\`

**(b) Vì sao cần**: nếu dùng cùng một val set để cả chọn λ và đánh giá model → **data leakage** → estimate optimistically biased.

**(c) Ví dụ số**: outer 5-fold × inner 3-fold = 15 fits để tìm hyperparameter + 5 fits để estimate. Total 20 model fits per hyperparameter candidate.

> ⚠ **Lỗi thường gặp**: tune hyperparameter trên val set rồi dùng cùng val set để báo cáo accuracy. Kết quả bị lạc quan (optimistic bias). Đúng: **dùng test set hoàn toàn riêng**, không đụng tới cho đến cuối.

> 🔁 **Kiểm tra**: Bạn có 1000 samples, muốn tune λ ∈ {0.01, 0.1, 1, 10} bằng 5-fold CV, rồi báo cáo test accuracy. Phác thảo quy trình đúng.

<details><summary>Đáp án</summary>

1. Tách 20% (200 samples) ra làm **test set** — cất đi, không đụng cho đến bước cuối.
2. Với 800 samples còn lại, chạy 5-fold CV cho mỗi λ ∈ {0.01, 0.1, 1, 10}.
3. Chọn λ* có val MSE thấp nhất trung bình.
4. Train lại model với λ* trên toàn bộ 800 samples.
5. Đánh giá trên 200 test samples → báo cáo test accuracy.

Tổng số model fit: 4 × 5 = 20 (step 2) + 1 (step 4) = 21.

</details>

📝 **Tóm tắt mục 4**:
- k-Fold CV: k splits, mỗi điểm validate đúng 1 lần, report mean ± std.
- Stratified: giữ nguyên class ratio trong mỗi fold.
- Nested CV: tách riêng hyperparameter selection và generalization estimation.
- **Không bao giờ dùng test set để tune hyperparameter**.

---

## 5. Chọn λ: Bias-Variance qua Lens Regularization

### 5.1. Hiệu ứng của λ

| λ nhỏ | λ lớn |
|:---|:---|
| Ít regularize | Regularize mạnh |
| Coefficients lớn | Coefficients nhỏ |
| Variance cao | Variance thấp |
| Bias thấp | Bias cao |
| Overfit | Underfit |

### 5.2. Grid search + CV

Quy trình chuẩn:

\`\`\`python
# Pseudocode
lambdas = [1e-4, 1e-3, 1e-2, 0.1, 1, 10, 100]
for λ in lambdas:
    scores = []
    for fold in k_folds(X_train, y_train, k=5):
        model.fit(fold.train, λ=λ)
        scores.append(model.score(fold.val))
    mean_cv[λ] = mean(scores)
best_λ = argmax(mean_cv)
\`\`\`

**Ví dụ số**: Ridge trên toy dataset, 5-fold CV:

| λ | CV MSE | Std |
|:---:|:---:|:---:|
| 0.001 | 0.195 | 0.041 |
| 0.01 | 0.142 | 0.028 |
| 0.1 | **0.118** | **0.019** |
| 1.0 | 0.131 | 0.017 |
| 10 | 0.178 | 0.015 |

Best λ = 0.1. Std giảm đều (regularization ổn định predictions), nhưng CV MSE có điểm tối ưu.

---

## 6. Bài tập

**Bài 1**: Cho polynomial regression trên n=30 điểm, degree 1 cho train MSE = 0.8, val MSE = 0.82. Degree 6 cho train MSE = 0.05, val MSE = 0.9. Theo bias-variance, degree nào bị high bias? High variance? Gợi ý thêm data hoặc thêm regularization cho trường hợp nào?

**Bài 2**: Ridge regression với features \`w = [5, 0.1, 8, −3]\` và λ = 2. Biết rằng \`(XᵀX + λI)⁻¹Xᵀy\` cho \`w_ridge = w / (1 + 2λ/‖w‖₂)\` (approximation trong trường hợp orthogonal features). Tính ‖w‖² và ‖w_ridge‖² với λ=2.

**Bài 3**: Lasso trên dataset 5 features. Với λ=0.3, kết quả: \`w = [2.1, 0, 3.4, 0, −1.2]\`. Tính L1 norm \`‖w‖₁\`. Nếu tăng λ lên 0.6 và features 1, 3, 5 thật sự quan trọng, dự đoán \`‖w_new‖₁\` sẽ tăng hay giảm? Feature nào likely thành 0 đầu tiên?

**Bài 4**: 5-fold CV trên dataset 500 samples. Kết quả accuracy: [0.84, 0.87, 0.82, 0.86, 0.85]. Tính mean ± std. Nếu thêm một model thứ hai có CV [0.83, 0.83, 0.84, 0.83, 0.83], model nào tốt hơn và vì sao?

---

## 7. Lời giải chi tiết

### Bài 1

**Nhận diện vấn đề**:
- Degree 1: train MSE = 0.8, val MSE = 0.82. Gap = 0.02 (rất nhỏ). Cả hai đều cao → **high bias**, model quá đơn giản không capture được pattern.
- Degree 6: train MSE = 0.05 (rất thấp), val MSE = 0.9 (rất cao). Gap = 0.85 (khổng lồ) → **high variance**, model overfit.

**Hành động**:
- Degree 1 (high bias): tăng complexity (tăng degree, thêm feature), KHÔNG phải thêm data (thêm data không giúp model đơn giản fit tốt hơn).
- Degree 6 (high variance): **thêm regularization** (Ridge/Lasso) HOẶC thêm data (30 điểm quá ít cho 7 parameters). Thêm data giảm variance của mô hình phức tạp.

### Bài 2

**Tính ‖w‖²**:
\`\`\`
‖w‖² = 5² + 0.1² + 8² + (−3)²
     = 25 + 0.01 + 64 + 9 = 98.01
\`\`\`

**Tính w_ridge** (approximation orthogonal features, scale factor \`s = ‖w‖₂ / (‖w‖₂ + 2λ)\`):
\`\`\`
‖w‖₂ = √98.01 ≈ 9.90
s = 9.90 / (9.90 + 2×2) = 9.90 / 13.90 ≈ 0.712
w_ridge ≈ s × w = [3.56, 0.071, 5.70, −2.14]
‖w_ridge‖² = 3.56² + 0.071² + 5.70² + 2.14²
           = 12.67 + 0.005 + 32.49 + 4.58 ≈ 49.74
\`\`\`

Verify: ‖w_ridge‖² ≈ 49.74 ≈ 98.01 × 0.712² ≈ 98.01 × 0.507 ≈ 49.7. ✓

Ridge giảm ‖w‖² từ 98.01 xuống ~49.7, tức giảm ~50% với λ=2.

### Bài 3

**Tính ‖w‖₁**:
\`\`\`
‖w‖₁ = |2.1| + |0| + |3.4| + |0| + |−1.2|
     = 2.1 + 0 + 3.4 + 0 + 1.2 = 6.7
\`\`\`

**Dự đoán khi tăng λ**: L1 norm giảm (shrinkage mạnh hơn). Features 1, 3 quan trọng → khó về 0. Feature 5 có coefficient nhỏ nhất (|−1.2| < |2.1| < |3.4|) → likely trở thành 0 đầu tiên. Tiếp theo: feature 1 (2.1), cuối cùng mới đến feature 3 (3.4 — lớn nhất).

**\`‖w_new‖₁\` giảm** vì λ tăng luôn tạo shrinkage thêm.

### Bài 4

**Tính mean và std**:
\`\`\`
scores = [0.84, 0.87, 0.82, 0.86, 0.85]
mean = (0.84 + 0.87 + 0.82 + 0.86 + 0.85) / 5 = 4.24 / 5 = 0.848

variance = [(0.84−0.848)² + (0.87−0.848)² + (0.82−0.848)² + (0.86−0.848)² + (0.85−0.848)²] / 4
         = [0.000064 + 0.000484 + 0.000784 + 0.000144 + 0.000004] / 4
         = 0.001480 / 4 = 0.00037
std = √0.00037 ≈ 0.0192

Model 1: 84.8% ± 1.9%
\`\`\`

**Model 2**: mean = 0.832, std = 0.004.

**So sánh**:
- Model 1: mean cao hơn (84.8% > 83.2%). Nhưng std cao hơn (1.9% > 0.4%).
- Sự khác biệt mean: 1.6% — đáng kể trong nhiều bài toán.
- Model 1 **tốt hơn** về expected performance (mean cao hơn rõ ràng). Model 2 ổn định hơn nhưng consistently thấp hơn.

**Kết luận**: chọn Model 1 nếu muốn maximize accuracy. Chọn Model 2 nếu cần predictability (std thấp quan trọng hơn, ví dụ production system cần stable).

---

## 8. Tham khảo

- **ESL** (Hastie, Tibshirani, Friedman) — *The Elements of Statistical Learning* (2nd ed.), Chapter 2 (Bias-Variance), Chapter 3 (Ridge/Lasso).
- **ISL** (James, Witten, Hastie, Tibshirani) — *Introduction to Statistical Learning*, Chapter 6 (Model Selection, Regularization).
- **MLPP** (Murphy) — *Machine Learning: A Probabilistic Perspective*, Chapter 7 (Linear Regression), Chapter 13 (Sparse Linear Models).
- [Bài tiếp theo — T2-L01: KNN & Decision Tree](../../02-ClassicalMethods/lesson-01-knn-decision-tree/README.md)
- [visualization.html](./visualization.html)
`;
