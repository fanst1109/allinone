// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/lesson-01-ml-pipeline/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Pipeline ML end-to-end

> **Tầng 6 — AI/ML · Bài đầu tiên.** Đây là bài "ráp khung". Ta chưa code một model phức tạp — ta vẽ ra **bản đồ** mà mọi model ML đều đi qua: data → feature → model → loss → train → evaluate. Tất cả các bài sau (Lesson 02 linear regression, Lesson 04 neural network, Lesson 08 CLIP) đều là các *biến thể* của cùng pipeline 6 bước này.

## Mục tiêu học tập

Sau bài này bạn phải:

1. Phát biểu được **6 bước** của một pipeline ML và vai trò của mỗi bước.
2. Hiểu vì sao phải **tách dữ liệu** thành train / validation / test, và đâu là *data leakage*.
3. Biết 2 nhóm **loss function** chính (MSE cho regression, cross-entropy cho classification) và bấm tay được trên ví dụ nhỏ.
4. Liên hệ **gradient descent** (đã học ở Tầng 3 Lesson 07) với "Step 5 — Train".
5. Đọc được **confusion matrix** và tính tay accuracy, precision, recall, F1.
6. Phân biệt **overfit / underfit**, biết khi nào dùng L1, L2, dropout, early stopping.
7. Hiểu **k-fold cross-validation** và lý do nó tin cậy hơn một split duy nhất.

## Kiến thức tiền đề

| Tầng | Lesson | Dùng ở đâu trong bài này |
|------|--------|--------------------------|
| 3 — Calculus | [L06 Gradient](../../03-Calculus/lesson-06-partial-gradient/) | Step 5 (Train): gradient của loss theo \`θ\` |
| 3 — Calculus | [L07 Gradient descent](../../03-Calculus/lesson-07-gradient-descent/) | Step 5: vòng lặp \`θ ← θ − η·∇L\` |
| 4 — Linear Algebra | [L01 Vectors](../../04-LinearAlgebra/lesson-01-vectors/) | Feature vector \`x = (x₁, x₂, …, xₙ)\` |
| 4 — Linear Algebra | [L05 Matrices](../../04-LinearAlgebra/lesson-05-matrices/) | Batch data \`X\` là ma trận N×d |
| 5 — Probability | [L06 Expectation/Variance](../../05-Probability/lesson-06-expectation-variance/) | Bias-variance tradeoff |
| 5 — Probability | [L07 MLE](../../05-Probability/lesson-07-mle/) | Vì sao tối thiểu hóa loss = tối đa hóa likelihood |
| 5 — Probability | [L08 Cross-entropy + KL](../../05-Probability/lesson-08-cross-entropy-kl/) | Loss cho classification |

> Nếu bạn chưa quen với gradient hoặc cross-entropy, **dừng lại và đọc trước** rồi quay lại. Bài này không định nghĩa lại các khái niệm đó — chỉ *gọi tên* và *xếp vị trí* cho chúng.

---

## 1. ML là gì? — Học từ dữ liệu thay vì code rule cứng

### 1.1 Hai cách giải bài toán

**Bài toán quen thuộc**: phân loại email là *spam* hay *không spam*.

#### Cách 1 — Lập trình cổ điển (rule-based)

Lập trình viên ngồi nghĩ ra các **luật**:

\`\`\`
nếu email chứa "miễn phí" và "click ngay" → spam
nếu người gửi không có trong danh bạ và có > 3 link → spam
nếu tiêu đề viết hoa toàn bộ → spam
…
\`\`\`

Vấn đề:

- Spammer thay đổi thủ đoạn → ta phải viết luật mới mãi mãi.
- Một số email hợp lệ vẫn dính "miễn phí" (vd thông báo bảo hành) → sai.
- Hàng nghìn luật, không ai bảo trì nổi.

#### Cách 2 — Machine Learning

Ta KHÔNG viết luật. Ta đưa cho máy **một đống email đã gán nhãn** (10.000 cái spam, 10.000 cái không spam), và bảo: *"tự tìm pattern phân biệt đi"*. Máy điều chỉnh **tham số** cho tới khi nó phân loại đúng phần lớn email mẫu. Khi gặp email mới, nó áp dụng những pattern đó để đoán.

\`\`\`
data (email + nhãn)  →  [thuật toán học]  →  model f_θ
                                                 ↓
                            email mới  →  f_θ(email mới)  →  spam? / không?
\`\`\`

> **💡 Trực giác.** ML giống dạy trẻ con nhận mặt mèo: bạn không liệt kê "mèo có 4 chân, có ria…". Bạn chỉ vào 50 con mèo và 50 con không-mèo, đứa trẻ tự rút ra. ML cũng vậy — chỉ máy "rút ra" bằng số (gradient descent) thay vì rút ra bằng trực giác.

### 1.2 Khi nào dùng ML, khi nào không

| Dùng ML khi… | Không dùng ML khi… |
|--------------|---------------------|
| Có nhiều dữ liệu nhưng rule khó viết tay (ảnh, ngôn ngữ, tiếng nói) | Rule rõ ràng, có thể code thẳng (kiểm tra mật khẩu ≥ 8 ký tự) |
| Vấn đề thay đổi theo thời gian (spam, tài chính) | Vấn đề tĩnh, một lần xong (chuyển đổi đơn vị tiền tệ) |
| Sai một chút chấp nhận được (gợi ý phim) | Phải đúng 100% (kế toán, mật mã) |
| Có thể đo "đúng/sai" bằng số (loss) | Không có cách đo (vd thẩm mỹ thuần túy) |

### 1.3 Ba kiểu học (supervised / unsupervised / reinforcement)

| Kiểu | Đầu vào | Đầu ra | Ví dụ |
|------|---------|--------|-------|
| **Supervised** (có giám sát) | \`(x, y)\` — input + nhãn | Hàm \`f(x) ≈ y\` | Phân loại email, dự đoán giá nhà |
| **Unsupervised** (không giám sát) | Chỉ \`x\`, không có nhãn | Cấu trúc trong data (cụm, chiều thấp) | Phân nhóm khách hàng, PCA |
| **Reinforcement** (học tăng cường) | Môi trường + phần thưởng | Chính sách hành động | AlphaGo, robot đi bộ |

Bài này tập trung vào **supervised**, vì pipeline 6 bước rõ ràng nhất ở đây. Lesson 02–04 sẽ làm thực chất với linear regression, logistic regression, neural network — đều là supervised.

> **❓ Người mới hay hỏi.**
> - *"Vậy ML có 'thông minh' không?"* — Không theo nghĩa con người. Nó chỉ là **tối ưu hóa số** trên một hàm. Nhưng khi data đủ lớn và model đủ linh hoạt, hành vi nhìn từ ngoài giống "thông minh".
> - *"Sao không học hết quy luật vũ trụ rồi mới đoán?"* — Vì ta không biết quy luật. ML "cài đặt" quy luật ngầm từ dữ liệu mà không cần ta viết ra.

> **📝 Tóm tắt mục 1.**
> - ML = học pattern từ data thay vì code rule.
> - Dùng khi dữ liệu nhiều, rule khó viết tay, đo được đúng/sai.
> - Có 3 kiểu chính; bài này nói về supervised.

---

## 2. Pipeline 6 bước — Bản đồ lớn

Mọi pipeline ML đều có dạng:

\`\`\`
┌─────────┐   ┌──────────┐   ┌────────┐   ┌──────┐   ┌────────┐   ┌──────────┐
│ 1. Data │ → │ 2. Feature│ → │ 3. Model│ → │4. Loss│ → │ 5. Train│ → │6. Evaluate│
└─────────┘   └──────────┘   └────────┘   └──────┘   └────────┘   └──────────┘
                                                          │              │
                                                          └──────────────┘
                                                           (lặp tới khi tốt)
\`\`\`

| Bước | Câu hỏi | Output |
|------|---------|--------|
| 1. Data | Lấy data ở đâu? Tách thế nào? | \`(X_train, y_train), (X_val, y_val), (X_test, y_test)\` |
| 2. Feature | Biểu diễn input thế nào để máy "hiểu"? | Vector số \`x ∈ ℝᵈ\` cho mỗi mẫu |
| 3. Model | Hàm dự đoán có dạng gì? | \`ŷ = f_θ(x)\` với params \`θ\` |
| 4. Loss | Đo sai bao nhiêu? | Số thực \`L(θ) ≥ 0\` |
| 5. Train | Điều chỉnh \`θ\` ra sao? | \`θ*\` (tham số tối ưu) |
| 6. Evaluate | Model có thật sự tốt không? | Metric (accuracy, F1, …) trên test set |

### 2.1 Walk-through bằng ví dụ Iris

[Iris](https://en.wikipedia.org/wiki/Iris_flower_data_set) là dataset cổ điển: 150 bông hoa diên vĩ, mỗi bông đo 4 chiều (chiều dài/rộng cánh hoa, đài hoa), nhãn là 1 trong 3 loài (\`setosa\`, \`versicolor\`, \`virginica\`). Mục tiêu: nhìn vào 4 số → đoán loài.

| # | Sepal length (cm) | Sepal width | Petal length | Petal width | Loài |
|---|---|---|---|---|---|
| 1 | 5.1 | 3.5 | 1.4 | 0.2 | setosa |
| 2 | 7.0 | 3.2 | 4.7 | 1.4 | versicolor |
| 3 | 6.3 | 3.3 | 6.0 | 2.5 | virginica |
| … | … | … | … | … | … |

**Áp dụng 6 bước:**

1. **Data.** 150 dòng → tách 90/30/30 (train/val/test).
2. **Feature.** Đã là vector số \`x = (5.1, 3.5, 1.4, 0.2) ∈ ℝ⁴\`. Standardize từng cột về mean 0, std 1.
3. **Model.** Dùng *logistic regression* multinomial — \`ŷ = softmax(Wx + b)\` với \`W ∈ ℝ³ˣ⁴\`, \`b ∈ ℝ³\`. Params \`θ = (W, b)\` gồm 15 số.
4. **Loss.** Cross-entropy: \`L = −Σ y·log(ŷ)\`.
5. **Train.** Gradient descent 500 epoch, \`η = 0.1\`, batch size 32.
6. **Evaluate.** Trên test set 30 mẫu, đếm số đúng → accuracy ≈ 96.7% (29/30 đúng).

Mỗi bước sẽ được mổ xẻ ở Mục 3–8 dưới đây. Iris là *toy example* — production thật to và nhiều bước hơn, nhưng khung 6 bước **không đổi**.

> **⚠ Toy example warning.** Iris có 150 mẫu, 4 chiều, 3 lớp — quá nhỏ và quá dễ. Production thật: 10⁶–10⁹ mẫu, hàng nghìn chiều, hàng chục đến hàng nghìn lớp. Mọi vấn đề khó (data leakage, imbalance, distribution shift) đều ẩn đi ở Iris. Bạn sẽ gặp lại ở Lesson 02–08.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Trong pipeline 6 bước, bước nào dùng **dữ liệu test**?
> 2. Tham số \`θ\` xuất hiện ở bước nào?
>
> <details><summary>Đáp án</summary>
>
> 1. Chỉ bước **6 — Evaluate**. Tuyệt đối không đụng tới test set ở Step 1-5. Nếu dùng test để chọn model thì test set không còn "sạch" và đo sai năng lực thật.
> 2. Step 3 (định nghĩa \`f_θ\`), Step 4 (loss \`L(θ)\` phụ thuộc \`θ\`), Step 5 (cập nhật \`θ\`). Step 1, 2, 6 không động vào \`θ\`.
> </details>

> **📝 Tóm tắt mục 2.**
> - Pipeline ML = 6 bước cố định: Data → Feature → Model → Loss → Train → Evaluate.
> - Step 5 và Step 4 nối nhau thành vòng lặp (gradient descent).
> - Iris là toy example để minh họa; sẽ tinh chỉnh dần qua Lesson 02–08.

---

## 3. Step 1 — Data: Tách train / validation / test

### 3.1 Vì sao phải tách

Đây là **sai lầm số một** của người mới: dùng cùng một dataset để train và để đo. Nó giống ra đề thi rồi cho học sinh xem trước đề trước hôm thi — điểm cao mà không biết gì.

> **💡 Trực giác.** Train set = "bài tập về nhà" (model nhìn, học, được phép sai và chỉnh). Validation set = "đề kiểm tra giữa kỳ" (dùng để chọn model nào tốt, tinh chỉnh hyperparameter). Test set = "đề thi cuối kỳ" — chỉ chấm **một lần duy nhất** ở cuối, không dùng để chỉnh gì.

### 3.2 Các tỉ lệ phổ biến

| Tỉ lệ | Khi nào dùng |
|------|-------------|
| **60 / 20 / 20** | Dataset nhỏ-trung (< 100k mẫu). Cần val và test đủ to để đo tin cậy. |
| **80 / 10 / 10** | Dataset trung (100k–1M). Train cần nhiều, val/test 10% vẫn dư. |
| **98 / 1 / 1** | Dataset rất lớn (> 10M). 1% của 10M vẫn là 100k mẫu — quá đủ. |
| **k-fold CV** | Dataset nhỏ (< 5k). Không cần val cố định — xem Mục 11. |

**Ví dụ Iris (150 mẫu):**

- 60/20/20: 90 train + 30 val + 30 test.
- 80/10/10: 120 train + 15 val + 15 test. **15 mẫu val** = chỉ 1 sai cũng 6.7% lỗi → không tin cậy.
- → Iris quá nhỏ, dùng **k-fold** thực tế hơn.

### 3.3 Tách thế nào (random vs stratified)

#### Random split

Xáo 150 mẫu, lấy 90 đầu làm train, 30 sau làm val, 30 cuối làm test.

**Rủi ro**: nếu nhãn lệch (vd 90% spam, 10% non-spam) và xui, validation toàn spam → đo không có nghĩa.

#### Stratified split

Tách *trong từng lớp*. Iris có 50 setosa + 50 versicolor + 50 virginica → tỉ lệ 60/20/20:

- Setosa: 30 train + 10 val + 10 test.
- Versicolor: 30 train + 10 val + 10 test.
- Virginica: 30 train + 10 val + 10 test.

→ tỉ lệ lớp trong mỗi tập là **giống nhau**.

**Khi nào bắt buộc stratified**: classification, đặc biệt khi nhãn imbalance (vd phát hiện gian lận: 99.9% bình thường, 0.1% gian lận).

### 3.4 Data leakage — kẻ thù vô hình

**Data leakage** = thông tin từ test set "rò rỉ" sang train, làm model "biết trước đáp án" mà không hề hay biết. Hậu quả: accuracy trên test rất cao, deploy thực tế thì hỏng.

#### Ví dụ leakage 1 — chia random ngày tháng

Bài toán: dự đoán giá nhà tháng 12/2024.

- **Cách sai**: lấy data 2020–2024, xáo, tách 80/20.
- **Tại sao sai**: train set có nhà bán tháng 1/2025, test có nhà bán tháng 1/2024. Model "biết tương lai" — học pattern 2025 rồi dùng để đoán 2024.
- **Cách đúng**: tách **theo thời gian**. Train = 2020–2023. Val = 6 tháng đầu 2024. Test = 6 tháng cuối 2024. Đúng kịch bản deploy.

#### Ví dụ leakage 2 — preprocess sai chỗ

\`\`\`python
# SAI
X_all = standardize(X_all)        # tính mean/std trên TOÀN BỘ data
X_train, X_test = split(X_all)
\`\`\`

\`mean\` và \`std\` được tính có cả thông tin từ test → đã "rò rỉ".

\`\`\`python
# ĐÚNG
X_train, X_test = split(X_all)
mean, std = compute_stats(X_train)   # CHỈ train
X_train = (X_train - mean) / std
X_test  = (X_test  - mean) / std     # áp dụng cùng mean/std
\`\`\`

#### Ví dụ leakage 3 — target leak

Bài toán: dự đoán khách hàng có hủy đăng ký (\`churn\`) hay không.

- **Feature sai**: \`số_ngày_kể_từ_khi_hủy\`. Feature này CHỈ tồn tại sau khi đã hủy → model "đoán" được 100% vì đáp án nằm sẵn trong feature.
- **Phát hiện**: nếu accuracy > 99% trên problem khó, hãy nghi target leak. Kiểm tra mọi feature: *"feature này có lấy được TẠI THỜI ĐIỂM dự đoán không?"*

> **❓ Người mới hay hỏi.**
> - *"Tôi có thể trộn val và test không?"* Không. Val dùng cho hyperparameter tuning → bị "thấy" rất nhiều lần qua nhiều thí nghiệm. Test phải còn nguyên cho lần đo cuối.
> - *"Sau khi test xong, có thể train lại trên cả test set?"* Được — nhưng phải báo cáo metric trên test set TRƯỚC KHI train lại. Sau khi train lại không còn cách đo độ tổng quát.

### 3.5 Walk-through số: tách Iris 60/20/20 stratified

| Lớp | Train | Val | Test | Tổng |
|-----|-------|-----|------|------|
| setosa | 30 | 10 | 10 | 50 |
| versicolor | 30 | 10 | 10 | 50 |
| virginica | 30 | 10 | 10 | 50 |
| **Tổng** | **90** | **30** | **30** | **150** |

Kiểm tra tỉ lệ trong train: 30/90 = 33.3% mỗi lớp ✓. Cân bằng.

> **🔁 Dừng lại tự kiểm tra.**
> Bạn có 10.000 ảnh chó/mèo. 9.500 ảnh chụp năm 2020, 500 ảnh năm 2024. Bạn nên tách theo cách nào?
>
> <details><summary>Đáp án</summary>
> Nếu mục tiêu là deploy năm 2025+, tách **theo thời gian**: train = ảnh trước 2024, test = 500 ảnh 2024. Như vậy đo được khả năng tổng quát sang phân phối mới. Nếu trộn random, test sẽ có ảnh 2020 — không đo được điều ta cần.
> </details>

> **📝 Tóm tắt mục 3.**
> - Train (học) / val (chọn model) / test (đo lần cuối).
> - Stratified khi nhãn imbalance hoặc số mẫu nhỏ.
> - Data leakage là kẻ thù vô hình: tách theo thời gian khi có chiều thời gian, preprocess sau khi tách, kiểm tra mọi feature có "rò" target không.

---

## 4. Step 2 — Feature engineering

### 4.1 Feature là gì

**Feature** = một con số (hoặc vector số) biểu diễn một khía cạnh của mẫu. Mỗi mẫu → một vector \`x ∈ ℝᵈ\`.

Iris đã có sẵn 4 feature số. Nhưng dữ liệu thật ít khi đẹp vậy:

| Raw input | Feature engineering | Kết quả |
|-----------|---------------------|---------|
| Email text | TF-IDF, word embedding | Vector vài trăm chiều |
| Ảnh 224×224×3 | Pixel hoặc CNN output | Vector 150.528 hoặc 2048 chiều |
| Ngày \`2024-12-23\` | day_of_week, is_weekend, month | 3-7 feature số |
| Categorical "màu = đỏ" | One-hot \`[1, 0, 0]\` | 3 chiều nhị phân |

### 4.2 Scaling: vì sao bắt buộc

Khoảng cách \`||x − x'||\` (sẽ học ở Lesson 02-04) phụ thuộc thang đo. Nếu một feature là *thu nhập* (0–100.000.000 VND) và một feature khác là *tuổi* (0–100), feature thu nhập sẽ **át toàn bộ** vì độ lớn cao hơn 6 chữ số.

#### Standardize (Z-score)

\`\`\`
x' = (x − μ) / σ
\`\`\`

với \`μ\`, \`σ\` tính trên **train set**. Sau standardize: mean ≈ 0, std ≈ 1.

**Ví dụ.** Tuổi của 5 người: \`[20, 30, 40, 50, 60]\`.

- \`μ = (20+30+40+50+60)/5 = 200/5 = 40\`.
- \`σ² = ((20-40)² + (30-40)² + (40-40)² + (50-40)² + (60-40)²)/5 = (400+100+0+100+400)/5 = 200\`. \`σ = √200 ≈ 14.14\`.
- Sau standardize: \`[-1.41, -0.71, 0, 0.71, 1.41]\`. Mean = 0 ✓. Var = 1 ✓ (\`(2·1.41² + 2·0.71²)/5 = (2·2 + 2·0.5)/5 = 5/5 = 1\` ✓).

#### Min-max normalize

\`\`\`
x' = (x − x_min) / (x_max − x_min) ∈ [0, 1]
\`\`\`

Cùng ví dụ tuổi:

- \`x_min = 20\`, \`x_max = 60\`, range = 40.
- \`[20, 30, 40, 50, 60]\` → \`[(20-20)/40, (30-20)/40, …, (60-20)/40]\` = \`[0, 0.25, 0.5, 0.75, 1.0]\`.

| Khi nào dùng standardize | Khi nào dùng min-max |
|--------------------------|----------------------|
| Phân phối gần Gaussian | Có biên rõ ràng (ảnh: 0–255) |
| Có outlier (standardize ít bị ảnh hưởng hơn) | Không có outlier |
| Model dùng gradient (NN, logistic) | Model cần input ∈ [0,1] (vài loại neural) |

### 4.3 Encoding categorical

#### One-hot encoding

Feature \`màu ∈ {đỏ, vàng, xanh}\` → 3 cột nhị phân:

| Mẫu | đỏ | vàng | xanh |
|-----|----|------|------|
| #1 đỏ | 1 | 0 | 0 |
| #2 xanh | 0 | 0 | 1 |
| #3 vàng | 0 | 1 | 0 |

**⚠ Lỗi thường gặp.** Đừng map thành số ordinal: \`đỏ=1, vàng=2, xanh=3\`. Điều này ngầm áp đặt "xanh = 3·đỏ" — vô nghĩa.

#### Label encoding (chỉ khi có thứ tự thật)

\`size ∈ {S, M, L, XL}\` có thứ tự tự nhiên → có thể dùng \`S=0, M=1, L=2, XL=3\` (ordinal encoding).

#### Embedding (cho categorical có rất nhiều giá trị)

Nếu feature \`user_id\` có 10⁶ giá trị, one-hot tạo 10⁶ chiều → quá nhiều. Thay vào, học một **embedding** chiều thấp (vd 64-d) — chuyên đề Lesson 06.

### 4.4 Feature engineering cho Iris (đã có sẵn 4 feature)

Sau standardize trên train set:

\`\`\`
sepal_length: μ=5.84, σ=0.83 → x₁' = (x₁ − 5.84) / 0.83
sepal_width:  μ=3.05, σ=0.43 → x₂' = (x₂ − 3.05) / 0.43
petal_length: μ=3.76, σ=1.76 → x₃' = (x₃ − 3.76) / 1.76
petal_width:  μ=1.20, σ=0.76 → x₄' = (x₄ − 1.20) / 0.76
\`\`\`

Mẫu #1 raw = \`(5.1, 3.5, 1.4, 0.2)\` → standardized:

- \`(5.1 − 5.84)/0.83 = −0.74/0.83 ≈ −0.89\`
- \`(3.5 − 3.05)/0.43 = 0.45/0.43 ≈ 1.05\`
- \`(1.4 − 3.76)/1.76 = −2.36/1.76 ≈ −1.34\`
- \`(0.2 − 1.20)/0.76 = −1.00/0.76 ≈ −1.32\`

→ \`x' = (−0.89, 1.05, −1.34, −1.32)\`. Mỗi chiều giờ trong khoảng [−2, 2].

> **⚠ Lỗi thường gặp 1.** Standardize VAL/TEST bằng \`μ, σ\` của chính val/test → leakage. Phải dùng \`μ_train, σ_train\`.
>
> **⚠ Lỗi thường gặp 2.** One-hot cho feature có *quá nhiều giá trị* (ZIP code → 41.000 cột). Thay bằng embedding hoặc target encoding.

> **🔁 Dừng lại tự kiểm tra.**
> Cột \`petal_length\` có giá trị \`[1.4, 4.5, 1.3, 5.1, 4.7]\`. Standardize cột này (tính tay \`μ\`, \`σ\`, rồi giá trị mới).
>
> <details><summary>Đáp án</summary>
>
> - \`μ = (1.4 + 4.5 + 1.3 + 5.1 + 4.7)/5 = 17.0/5 = 3.4\`.
> - Lệch bình phương: \`(1.4-3.4)² + (4.5-3.4)² + (1.3-3.4)² + (5.1-3.4)² + (4.7-3.4)²\` = \`4 + 1.21 + 4.41 + 2.89 + 1.69 = 14.20\`.
> - \`σ² = 14.20/5 = 2.84\`, \`σ = √2.84 ≈ 1.685\`.
> - Giá trị mới: \`(1.4-3.4)/1.685 ≈ -1.187\`, \`(4.5-3.4)/1.685 ≈ 0.653\`, \`(1.3-3.4)/1.685 ≈ -1.246\`, \`(5.1-3.4)/1.685 ≈ 1.009\`, \`(4.7-3.4)/1.685 ≈ 0.772\`.
> - Kiểm: tổng ≈ 0 ✓, var ≈ 1 ✓.
> </details>

> **📝 Tóm tắt mục 4.**
> - Feature = vector số. Mọi raw input cuối cùng phải thành \`x ∈ ℝᵈ\`.
> - Scaling (standardize/min-max) bắt buộc cho model dùng khoảng cách hoặc gradient.
> - Categorical → one-hot (giá trị ít) hoặc embedding (giá trị nhiều).
> - Tính \`μ, σ\` trên **train** rồi áp dụng cho val/test — không tính lại.

---

## 5. Step 3 — Model: hàm \`f_θ(x)\` với tham số \`θ\`

### 5.1 Model là một hàm có tham số

Một model \`f_θ: ℝᵈ → ℝᵏ\` là **hàm** biến input thành prediction. \`θ\` là vector tham số mà ta sẽ điều chỉnh.

| Model | Dạng \`f_θ\` | Số params |
|-------|-----------|-----------|
| Linear regression | \`f_θ(x) = wᵀx + b\` | \`d + 1\` |
| Logistic regression nhị phân | \`f_θ(x) = σ(wᵀx + b)\` | \`d + 1\` |
| Logistic regression k-lớp | \`f_θ(x) = softmax(Wx + b)\`, \`W ∈ ℝᵏˣᵈ\` | \`k·d + k\` |
| Neural network 1 hidden | \`f_θ(x) = W₂·ReLU(W₁x + b₁) + b₂\` | \`h·d + h + k·h + k\` |
| Transformer-base (BERT) | (rất phức tạp) | ~110 triệu |
| GPT-4 | (rất phức tạp) | ~1.7 nghìn tỷ (ước lượng) |

> **💡 Trực giác.** Mỗi giá trị \`θ\` cụ thể là một "phiên bản model" khác. Tập tất cả model có dạng \`f_θ\` (khi \`θ\` chạy khắp \`ℝᵖ\`) gọi là **hypothesis space**. Training = chọn \`θ*\` tốt nhất trong không gian đó.

### 5.2 Inductive bias — model "đoán trước" về cấu trúc

Mỗi loại model có một **giả định ngầm** về cách thế giới vận hành:

| Model | Giả định ngầm |
|-------|---------------|
| Linear regression | Quan hệ đầu ra với feature là **tuyến tính** |
| Polynomial degree d | Quan hệ là đa thức bậc ≤ d |
| Neural network | Bất kỳ hàm trơn nào (universal approximator) |
| CNN | Có cấu trúc không gian địa phương (ảnh) |
| RNN/Transformer | Có cấu trúc tuần tự / quan hệ phụ thuộc |

Chọn model = chọn inductive bias **khớp với dữ liệu**. Dùng linear regression trên data hình parabola → underfit. Dùng polynomial bậc 50 trên data thẳng → overfit (xem Mục 10).

### 5.3 Walk-through: logistic regression cho Iris

Có 3 lớp → multinomial logistic. Model:

\`\`\`
z = Wx + b           (z ∈ ℝ³, W ∈ ℝ³ˣ⁴, b ∈ ℝ³)
ŷ = softmax(z)       (ŷ ∈ ℝ³, mỗi phần tử ≥ 0, tổng = 1)
\`\`\`

\`softmax(z)ᵢ = e^zᵢ / Σⱼ e^zⱼ\`.

**Ví dụ một mẫu.** Lấy \`x' = (−0.89, 1.05, −1.34, −1.32)\` từ Mục 4.4. Giả sử params hiện tại (sau vài epoch):

\`\`\`
W = [[ 0.5,  0.4, −1.5, −1.4],   # row cho setosa
     [ 0.1, −0.2,  0.3,  0.4],   # row cho versicolor
     [−0.6, −0.2,  1.2,  1.0]]   # row cho virginica
b = [0.2, 0.0, −0.2]
\`\`\`

Tính \`z\`:

- \`z₀ = 0.5·(−0.89) + 0.4·1.05 + (−1.5)·(−1.34) + (−1.4)·(−1.32) + 0.2\`
  \`= −0.445 + 0.420 + 2.010 + 1.848 + 0.200 = 4.033\`
- \`z₁ = 0.1·(−0.89) + (−0.2)·1.05 + 0.3·(−1.34) + 0.4·(−1.32) + 0.0\`
  \`= −0.089 − 0.210 − 0.402 − 0.528 + 0.0 = −1.229\`
- \`z₂ = (−0.6)·(−0.89) + (−0.2)·1.05 + 1.2·(−1.34) + 1.0·(−1.32) + (−0.2)\`
  \`= 0.534 − 0.210 − 1.608 − 1.320 − 0.200 = −2.804\`

Tính softmax:

- \`e^z₀ = e^4.033 ≈ 56.45\`
- \`e^z₁ = e^(−1.229) ≈ 0.293\`
- \`e^z₂ = e^(−2.804) ≈ 0.0607\`
- Tổng \`≈ 56.81\`.
- \`ŷ = (56.45/56.81, 0.293/56.81, 0.0607/56.81) ≈ (0.9937, 0.0052, 0.0011)\`.

→ Model đoán **setosa** với xác suất 99.4%. Đúng (mẫu này thực sự là setosa).

> **❓ Người mới hay hỏi.**
> - *"Tại sao softmax mà không chia thẳng \`zᵢ / Σ zⱼ\`?"* — \`zᵢ\` có thể âm, làm chia ra số âm hoặc chia 0. \`e^zᵢ\` luôn dương + có tính chất "lớn lên rất nhanh" → phân biệt rõ class thắng.
> - *"Vì sao 3 lớp Iris không dùng 3 logistic nhị phân?"* — Có thể (one-vs-rest), nhưng softmax cho ra phân phối xác suất hợp lệ trên 3 lớp (tổng = 1), thuận tiện cho cross-entropy.

> **📝 Tóm tắt mục 5.**
> - Model = hàm \`f_θ(x)\` với tham số \`θ\`.
> - Mỗi loại model có inductive bias riêng.
> - Logistic regression k-lớp: \`softmax(Wx + b)\` — sẽ học kỹ Lesson 03.

---

## 6. Step 4 — Loss: đo "sai bao nhiêu"

### 6.1 Vì sao cần loss

Để **tối ưu** ta cần một con số đo độ sai. Loss \`L(θ)\` là hàm từ params \`θ\` → số thực \`≥ 0\`. Mục tiêu: tìm \`θ*\` cực tiểu hóa \`L\`.

> **💡 Trực giác.** Loss là *la bàn*. Không có nó, gradient descent không biết đi đâu. Chọn loss = quyết định "thế nào là sai" — nó định nghĩa toàn bộ bài toán.

### 6.2 Hai họ loss chính

| Bài toán | Loss phổ biến | Công thức |
|----------|---------------|-----------|
| Regression (đầu ra số thực) | MSE | \`L = (1/N) Σ (ŷᵢ − yᵢ)²\` |
| Regression (robust với outlier) | MAE | \`L = (1/N) Σ \\|ŷᵢ − yᵢ\\|\` |
| Classification (k lớp) | Cross-entropy | \`L = −(1/N) Σ Σ yᵢₖ log ŷᵢₖ\` |
| Classification (margin-based) | Hinge | \`L = max(0, 1 − y·ŷ)\` |

### 6.3 MSE — Mean Squared Error

Bài toán: dự đoán giá nhà. Nhãn thật \`y = (300, 450, 200)\` (triệu VND), dự đoán \`ŷ = (310, 440, 220)\`.

- Sai từng mẫu: \`310−300 = 10\`, \`440−450 = −10\`, \`220−200 = 20\`.
- Bình phương: \`100, 100, 400\`.
- Trung bình: \`(100 + 100 + 400)/3 = 600/3 = 200\`.

→ MSE = 200. Đơn vị: (triệu VND)². RMSE = √200 ≈ 14.14 — dùng cùng đơn vị gốc cho dễ diễn giải.

**Vì sao bình phương?**

1. Loại bỏ dấu (sai +10 và −10 đều xấu).
2. Phạt nặng sai lớn (sai 20 → đóng góp 400, sai 10 → đóng góp 100; sai 20 đắt gấp 4 sai 10, không phải gấp 2).
3. Khả vi mọi nơi → dễ tính gradient.

**Liên hệ MLE (Tầng 5 Lesson 07)**: nếu giả định nhiễu Gaussian, MLE → minimize MSE.

### 6.4 Cross-entropy — cho classification

Một mẫu Iris thật là setosa, ta encode \`y = (1, 0, 0)\` (one-hot). Model dự đoán \`ŷ = (0.99, 0.005, 0.005)\`.

Cross-entropy cho mẫu này:

\`\`\`
H(y, ŷ) = −Σ yₖ log ŷₖ
        = −(1·log 0.99 + 0·log 0.005 + 0·log 0.005)
        = −log 0.99 ≈ −(−0.01005) ≈ 0.01005
\`\`\`

→ Sai số rất bé (model gần đúng).

Giả sử model đoán sai: \`ŷ = (0.1, 0.8, 0.1)\` (đoán versicolor).

\`\`\`
H(y, ŷ) = −log 0.1 ≈ 2.303
\`\`\`

→ Loss lớn gấp 229 lần. Cross-entropy phạt **rất nặng** khi model tự tin sai.

**Trường hợp cực đoan**: model đoán \`ŷ_setosa = 0\` → \`−log 0 = +∞\`. Vì vậy thực tế softmax không bao giờ trả về 0 chính xác, và ta thường clip xuống \`1e-7\` để tránh overflow.

**Liên hệ Tầng 5 Lesson 08**: cross-entropy = \`H(p) + KL(p || q)\`, đo "p đẹp" giữa nhãn thật \`p = y\` và prediction \`q = ŷ\`.

### 6.5 Bảng walk-through full Iris (3 mẫu)

| # | Lớp thật \`y\` | Prediction \`ŷ\` | Cross-entropy |
|---|---|---|---|
| 1 | setosa (1,0,0) | (0.99, 0.005, 0.005) | −log(0.99) = 0.01005 |
| 2 | versicolor (0,1,0) | (0.05, 0.85, 0.10) | −log(0.85) = 0.16252 |
| 3 | virginica (0,0,1) | (0.30, 0.30, 0.40) | −log(0.40) = 0.91629 |

Loss tổng: \`L = (0.01005 + 0.16252 + 0.91629)/3 = 1.08886/3 ≈ 0.36295\`.

→ Mẫu #3 đóng góp ~84% loss. Gradient descent sẽ "kéo" model điều chỉnh chủ yếu vì #3.

> **⚠ Lỗi thường gặp.** Dùng MSE cho classification 3+ lớp. MSE không phạt đủ nặng khi model tự tin sai, và gradient bão hòa (đi rất chậm) khi \`ŷ\` gần 0/1. → Cross-entropy luôn ưu việt hơn cho classification.

> **🔁 Dừng lại tự kiểm tra.**
> Nhãn thật \`y = 0\` (lớp 0 trong 3 lớp). Prediction softmax \`ŷ = (0.7, 0.2, 0.1)\`. Tính cross-entropy.
>
> <details><summary>Đáp án</summary>
>
> \`−log 0.7 ≈ −(−0.3567) = 0.3567\`. Kiểm: model gần đúng (0.7 > 0.2, 0.1 nhưng chưa "tự tin"), nên loss vừa phải.
> </details>

> **📝 Tóm tắt mục 6.**
> - Loss = thước đo "sai bao nhiêu", càng nhỏ càng tốt.
> - Regression: MSE (\`(ŷ−y)²\` trung bình).
> - Classification: cross-entropy (\`−Σ y log ŷ\`), phạt nặng tự tin sai.

---

## 7. Step 5 — Train: gradient descent

### 7.1 Gọi lại gradient descent (Tầng 3 Lesson 07)

\`L(θ)\` là hàm của params. Để minimize, lặp:

\`\`\`
θ ← θ − η · ∇L(θ)
\`\`\`

- \`∇L(θ)\` = gradient của loss theo \`θ\` (đã học tính ở Tầng 3 L06-L07).
- \`η\` (eta) = **learning rate**, độ dài bước.

Tại sao hướng \`−∇L\`? Vì \`∇L\` chỉ về hướng **tăng** nhanh nhất; lấy âm để đi xuống nhanh nhất.

### 7.2 Ba từ khóa: epoch, batch, learning rate

| Thuật ngữ | Định nghĩa | Walk-through |
|----------|-----------|--------------|
| **Epoch** | 1 lượt đi qua toàn bộ train set | Iris 90 train, batch 32 → 1 epoch = 3 batch (32+32+26) |
| **Batch** | Một nhóm mẫu để tính gradient ước lượng | Mỗi batch tính một gradient → cập nhật \`θ\` một lần |
| **Iteration / Step** | Một lần cập nhật \`θ\` | 1 epoch = \`⌈N/batch⌉\` iteration |
| **Learning rate \`η\`** | Độ dài bước | \`0.001\` (chậm an toàn), \`0.1\` (nhanh nhưng dễ nổ) |

#### Walk-through số: 500 epoch trên Iris

- \`N = 90\`, batch = 32 → 3 iter/epoch.
- 500 epoch × 3 = **1500 iteration** cập nhật \`θ\`.
- Loss curve điển hình:
  - Epoch 1: loss ≈ 1.10 (gần \`log 3 ≈ 1.10\` — random).
  - Epoch 50: loss ≈ 0.30.
  - Epoch 200: loss ≈ 0.10.
  - Epoch 500: loss ≈ 0.05 (hội tụ).

### 7.3 Ba kiểu batch

| Kiểu | Batch size | Ưu | Nhược |
|------|-----------|----|-------|
| **Batch GD** | N (toàn bộ) | Gradient chính xác | Chậm, không scale dataset lớn |
| **Stochastic GD (SGD)** | 1 | Cập nhật rất nhanh | Gradient rất noisy, dao động mạnh |
| **Mini-batch SGD** | 32, 64, 128, 256 | Cân bằng tốc độ + ổn định, dùng GPU hiệu quả | Cần chọn batch size |

Production gần như luôn dùng **mini-batch SGD** với batch size là lũy thừa 2 (32/64/128/256).

### 7.4 Learning rate: chọn sai = hỏng

| \`η\` | Hành vi | Loss curve |
|-----|---------|-----------|
| Quá nhỏ (1e-6) | Hội tụ siêu chậm | Loss giảm chậm, có thể dừng trước khi hội tụ |
| Vừa (1e-2 ~ 1e-3) | Hội tụ ổn định | Loss giảm trơn |
| Quá lớn (1.0) | Bước nhảy quá xa, "vọt qua" cực tiểu | Loss dao động, hoặc tăng → NaN |

**Trick thực tế**:

- **LR schedule**: bắt đầu lớn (\`0.1\`), giảm dần (\`× 0.1\` mỗi 100 epoch).
- **Warmup**: 5 epoch đầu tăng \`η\` từ 0 lên \`η_max\`, sau đó schedule giảm.
- **Adam optimizer**: tự động điều chỉnh \`η\` cho từng tham số (thay cho SGD thuần).

### 7.5 Gradient cho cross-entropy + softmax

Ở Lesson 03 ta sẽ chứng minh: với softmax + cross-entropy, gradient theo \`z\` rất đẹp:

\`\`\`
∂L/∂z = ŷ − y
\`\`\`

Áp dụng cho mẫu #3 Iris (Mục 6.5): \`y = (0, 0, 1)\`, \`ŷ = (0.30, 0.30, 0.40)\`. Gradient:

\`\`\`
∂L/∂z = (0.30 − 0, 0.30 − 0, 0.40 − 1) = (0.30, 0.30, −0.60)
\`\`\`

Diễn giải: nâng \`z₂\` lên (gradient âm theo \`z₂\` → tăng \`z₂\` để giảm loss), hạ \`z₀, z₁\` xuống. Đúng trực giác: model nên tự tin hơn vào lớp 2.

### 7.6 Khi nào dừng?

Ba tiêu chí:

1. **Đạt số epoch cố định** (vd 500).
2. **Loss val không giảm thêm K epoch liên tiếp** (early stopping — xem Mục 10.4).
3. **Gradient norm < ε** (hiếm dùng trong DL vì không bao giờ thật sự = 0).

> **❓ Người mới hay hỏi.**
> - *"Tăng epoch thì lúc nào cũng tốt hơn?"* Không. Sau một mức nào đó, train loss vẫn giảm nhưng val loss tăng — đó là overfitting. Dừng đúng lúc (Mục 10.4).
> - *"Batch size to thì training nhanh hơn?"* Đúng (mỗi epoch ít iter hơn), nhưng gradient mỗi step quá "trung bình hóa" → có thể giảm chất lượng. Batch quá nhỏ thì noisy. 32-256 là sweet spot.

> **📝 Tóm tắt mục 7.**
> - Train = lặp \`θ ← θ − η·∇L(θ)\`.
> - Epoch = 1 lượt qua data. Batch = nhóm để tính gradient ước lượng.
> - Learning rate \`η\` phải vừa: quá lớn → nổ, quá nhỏ → chậm.
> - Mini-batch SGD (batch 32-256) là chuẩn thực tế.

---

## 8. Step 6 — Evaluate: metrics

### 8.1 Vì sao không chỉ đo loss?

Loss là cho training (cần khả vi). Người dùng cuối cần **metric** dễ diễn giải:

- "Accuracy 95%" → ai cũng hiểu.
- "Cross-entropy 0.123" → ai hiểu?

Metric thường **không khả vi** (không tối ưu trực tiếp được), nhưng đúng câu hỏi business.

### 8.2 Confusion matrix (cho binary classification)

Bài toán: phát hiện gian lận giao dịch. \`y = 1\` = gian lận, \`y = 0\` = bình thường.

|  | Predicted 1 (gian lận) | Predicted 0 (bình thường) |
|--|------|------|
| **Actual 1** | TP (True Positive) | FN (False Negative) |
| **Actual 0** | FP (False Positive) | TN (True Negative) |

- **TP**: thật là gian lận, đoán đúng là gian lận.
- **TN**: thật là bình thường, đoán đúng là bình thường.
- **FP**: thật là bình thường, đoán nhầm là gian lận (báo động giả).
- **FN**: thật là gian lận, đoán nhầm là bình thường (bỏ sót — nguy hiểm).

### 8.3 4 metric phổ biến

Cho ví dụ cụ thể: test 1000 giao dịch, 50 thật sự gian lận. Model phát hiện 60 cái là gian lận, trong đó 40 đúng.

- TP = 40, FN = 50 − 40 = 10, FP = 60 − 40 = 20, TN = 1000 − 50 − 20 = 930.

#### Accuracy

\`\`\`
Acc = (TP + TN) / total = (40 + 930) / 1000 = 970/1000 = 0.970 = 97.0%
\`\`\`

**⚠ Cẩn thận**: với data imbalance, accuracy rất "lừa". Model luôn đoán "bình thường" → Acc = 950/1000 = 95%, nhưng *bỏ sót 100% gian lận*.

#### Precision (độ chính xác của cảnh báo)

\`\`\`
Prec = TP / (TP + FP) = 40 / (40 + 20) = 40/60 ≈ 0.667 = 66.7%
\`\`\`

"Trong các cái model bảo là gian lận, bao nhiêu phần đúng?" Cao precision = ít báo động giả.

#### Recall / Sensitivity (mức độ không bỏ sót)

\`\`\`
Rec = TP / (TP + FN) = 40 / (40 + 10) = 40/50 = 0.800 = 80.0%
\`\`\`

"Trong các cái thật sự gian lận, model bắt được bao nhiêu?" Cao recall = ít bỏ sót.

#### F1 — trung bình điều hòa của precision và recall

\`\`\`
F1 = 2·(Prec·Rec)/(Prec + Rec) = 2·(0.667·0.800)/(0.667 + 0.800) = 2·0.5336/1.467 = 1.0672/1.467 ≈ 0.7273
\`\`\`

F1 cao chỉ khi cả precision lẫn recall đều cao. Hữu ích khi data imbalance.

### 8.4 Precision-recall tradeoff

Hạ ngưỡng quyết định (vd từ 0.5 xuống 0.3 → dễ "kêu gian lận"):

- Recall ↑ (bắt được nhiều gian lận hơn).
- Precision ↓ (nhiều báo động giả hơn).

Mỗi business case có tradeoff khác:

- **Phát hiện ung thư**: recall quan trọng hơn (bỏ sót nguy hiểm) → hạ ngưỡng.
- **Spam filter**: precision quan trọng hơn (lỡ chặn email thật phiền) → nâng ngưỡng.

### 8.5 ROC & AUC

**ROC curve** vẽ TPR (= recall) theo FPR (= FP/(FP+TN)) khi thay đổi ngưỡng từ 0 → 1.

**AUC (Area Under Curve)**: diện tích dưới ROC.

- AUC = 0.5 → random guess (đường chéo).
- AUC = 1.0 → perfect.
- AUC = 0.85 → khá tốt.

AUC = xác suất model xếp một positive ngẫu nhiên cao hơn một negative ngẫu nhiên.

### 8.6 Metric cho multi-class

Iris có 3 lớp → confusion matrix 3×3. Mỗi metric (precision, recall, F1) có thể tính:

- **Per-class**: precision_setosa, precision_versicolor, precision_virginica.
- **Macro average**: trung bình cộng đơn giản.
- **Weighted average**: trung bình có trọng số theo số mẫu mỗi lớp (dùng khi imbalance).

### 8.7 Metric cho regression

| Metric | Công thức | Diễn giải |
|--------|-----------|----------|
| MSE | \`(1/N)Σ(ŷ−y)²\` | Sai bình phương trung bình |
| RMSE | \`√MSE\` | Cùng đơn vị với \`y\` |
| MAE | \`(1/N)Σ\\|ŷ−y\\|\` | Robust với outlier |
| R² | \`1 − SS_res/SS_tot\` | Phần trăm variance giải thích được, ∈ (−∞, 1] |

**Ví dụ R²**: thật \`y = (300, 450, 200)\`, dự đoán \`ŷ = (310, 440, 220)\`.

- \`ȳ = (300+450+200)/3 = 316.67\`.
- \`SS_tot = (300−316.67)² + (450−316.67)² + (200−316.67)² = 277.7 + 17777.7 + 13611.1 ≈ 31666.5\`.
- \`SS_res = (300−310)² + (450−440)² + (200−220)² = 100 + 100 + 400 = 600\`.
- \`R² = 1 − 600/31666.5 ≈ 1 − 0.0190 ≈ 0.981\` → giải thích được 98.1% biến động.

> **⚠ Lỗi thường gặp.** Báo cáo chỉ accuracy với data imbalance. Phải kèm precision/recall/F1 và confusion matrix.

> **🔁 Dừng lại tự kiểm tra.**
> Có TP=80, FP=20, FN=40, TN=860. Tính accuracy, precision, recall, F1.
>
> <details><summary>Đáp án</summary>
>
> - Acc = (80 + 860)/(80+20+40+860) = 940/1000 = 0.940.
> - Prec = 80/(80+20) = 80/100 = 0.800.
> - Rec = 80/(80+40) = 80/120 ≈ 0.667.
> - F1 = 2·(0.8·0.667)/(0.8+0.667) = 2·0.5336/1.467 ≈ 0.7273.
> </details>

> **📝 Tóm tắt mục 8.**
> - Loss để train (cần khả vi); metric để báo cáo (cần diễn giải).
> - Confusion matrix: TP/FP/TN/FN — gốc của mọi metric phân loại.
> - Accuracy lừa khi imbalance. Dùng precision/recall/F1 và ROC-AUC.

---

## 9. Bài toán quan trọng nhất: Overfit vs Underfit

### 9.1 Định nghĩa

- **Underfit**: model quá đơn giản → sai cả trên train lẫn val. Bias cao.
- **Overfit**: model quá phức tạp → đúng gần như tuyệt đối trên train nhưng sai trên val. Variance cao.
- **Just right**: train loss thấp ~ val loss thấp.

| Tình huống | Train loss | Val loss | Triệu chứng |
|-----------|-----------|----------|-------------|
| Underfit | Cao | Cao | Cần model phức tạp hơn / feature tốt hơn |
| Overfit | Rất thấp | Cao | Cần regularization / nhiều data / model đơn giản hơn |
| Just right | Thấp | Thấp (≈ train) | OK, deploy được |

### 9.2 Bias-variance tradeoff (Tầng 5 Lesson 06)

Decompose expected error:

\`\`\`
E[(ŷ − y)²] = (bias)² + variance + irreducible_noise
\`\`\`

- **Bias** = sai số do giả định model sai (vd dùng đường thẳng fit data parabola).
- **Variance** = sai số do model "nhảy" theo nhiễu mỗi lần resample data.
- **Irreducible noise** = nhiễu vốn có trong data, không thể giảm.

| Model | Bias | Variance |
|-------|------|----------|
| Linear regression | Cao | Thấp |
| Polynomial bậc 2 | Trung bình | Trung bình |
| Polynomial bậc 15 | Thấp | **Rất cao** |
| Neural network lớn | Thấp | Cao (nhưng có thể giảm bằng regularization) |

#### Walk-through bằng số (giả lập)

Hàm thật: \`y = sin(x)\` với nhiễu \`ε ~ N(0, 0.1)\`. Fit bằng polynomial bậc 1, 3, 15:

| Bậc | Train MSE | Test MSE | Bias² | Variance | Tổng |
|-----|-----------|----------|-------|----------|------|
| 1 | 0.21 | 0.22 | 0.20 | 0.01 | 0.21 |
| 3 | 0.012 | 0.015 | 0.005 | 0.008 | 0.013 |
| 15 | 0.0001 | 0.45 | 0.0001 | 0.43 | 0.43 |

Bậc 1: underfit (cả train + test cao). Bậc 3: just right. Bậc 15: overfit (train cực thấp, test thảm họa).

### 9.3 Cách chống overfit

| Kỹ thuật | Cách hoạt động | Hyperparameter |
|----------|---------------|----------------|
| **More data** | Variance giảm tự nhiên khi N tăng | (Không) |
| **Simpler model** | Giảm hypothesis space | (Cấu trúc model) |
| **L2 regularization** | Cộng \`λ·‖θ‖²\` vào loss → params bị "kéo" về 0 | \`λ\` |
| **L1 regularization** | Cộng \`λ·‖θ‖₁\` → ép một số params = 0 (sparse) | \`λ\` |
| **Dropout** | Trong NN, mỗi step ngẫu nhiên "tắt" p% neuron | \`p\` (thường 0.1-0.5) |
| **Early stopping** | Dừng khi val loss bắt đầu tăng | \`patience\` |
| **Data augmentation** | Tạo thêm data bằng phép biến đổi (xoay, lật ảnh) | (Tùy domain) |
| **Batch norm** | Chuẩn hóa activation, ngầm có hiệu ứng regularize | (Có/không) |

#### L2 — chi tiết

Loss mới: \`L_total = L_data + λ · ‖θ‖²\`.

**Ví dụ**: linear regression \`y = wx + b\`. Loss data trung bình \`0.05\`, \`w = 3.0\`, \`b = 0.5\`, \`λ = 0.1\`.

- Penalty L2 = \`0.1·(3.0² + 0.5²) = 0.1·9.25 = 0.925\`.
- Tổng loss = \`0.05 + 0.925 = 0.975\`.

→ Penalty lớn hơn loss data nhiều. Gradient descent sẽ ưu tiên kéo \`w\` về gần 0. Có thể \`w\` hội tụ về \`1.5\` thay vì \`3.0\` — model "êm" hơn, ít overfit.

**Trực giác**: model có params nhỏ thường "trơn tru" hơn, ít zigzag theo data nhiễu.

**Liên hệ Tầng 4 Lesson 03**: \`‖θ‖²\` chính là bình phương của norm L2 — đã học ở bài về norm và khoảng cách.

#### L1 — chi tiết

Loss mới: \`L_total = L_data + λ · ‖θ‖₁ = L_data + λ·Σ|θᵢ|\`.

Khác L2: L1 đẩy một số params về **đúng bằng 0** (sparse), L2 chỉ làm nhỏ chứ ít khi = 0.

→ L1 hữu ích khi muốn **feature selection tự động**: param = 0 nghĩa là feature đó không dùng.

#### Dropout

Trong NN, ở mỗi training step, mỗi neuron có xác suất \`p\` bị "tắt" (output × 0). Khi inference, không drop, nhưng scale output × \`(1−p)\` để giữ kỳ vọng.

**Vì sao chống overfit**: ép network không phụ thuộc quá nặng vào một neuron nào → distributed representation, ổn định hơn.

#### Early stopping

Theo dõi val loss mỗi epoch. Nếu val loss không giảm trong \`patience\` epoch liên tiếp (vd 20), dừng. Lưu params tại epoch val loss tốt nhất.

\`\`\`
Epoch:    1   10  50  100 150 200 250 300  ← train tiếp
Train L: 1.1  0.5 0.3 0.2 0.15 0.1 0.05 0.02
Val L:   1.0  0.4 0.2 0.18 0.19 0.22 0.28 0.35
                              ↑
                              val loss bắt đầu tăng — dừng quanh đây
\`\`\`

### 9.4 Walk-through chọn \`λ\` bằng val set

Thử \`λ ∈ {0.001, 0.01, 0.1, 1.0, 10}\`. Train với mỗi \`λ\` trên train set, đo val loss:

| λ | Train loss | Val loss |
|---|-----------|----------|
| 0.001 | 0.02 | 0.30 ← overfit |
| 0.01 | 0.05 | 0.18 |
| 0.1 | 0.10 | **0.12** ← min, chọn |
| 1.0 | 0.25 | 0.28 |
| 10 | 0.80 | 0.85 ← underfit |

→ Chọn \`λ = 0.1\`, train lại trên train+val (tùy chuẩn) rồi report test loss.

> **❓ Người mới hay hỏi.**
> - *"Sao không thử mọi \`λ\` rồi chọn theo test set?"* Không. Test set chỉ dùng MỘT lần ở cuối. Dùng test để chọn \`λ\` = data leakage cấp thấp → test loss bị biased lạc quan.
> - *"Có bắt buộc dùng regularization không?"* Không nếu model đã đơn giản hoặc data đủ lớn. Linear regression với N=10⁶ thường không cần. Deep NN gần như luôn cần.

> **📝 Tóm tắt mục 9.**
> - Overfit = train tốt, val tệ. Underfit = cả hai tệ.
> - Bias-variance tradeoff: model phức tạp → variance ↑, bias ↓.
> - Chống overfit: more data, simpler model, L1/L2, dropout, early stopping, augmentation.

---

## 10. Cross-validation: khi data ít

### 10.1 Vấn đề với một val set duy nhất

Iris 150 mẫu, val = 30. **Nếu val xui gặp 30 mẫu khó** → đo \`val_loss = 0.5\`. Nếu gặp 30 mẫu dễ → \`val_loss = 0.1\`. Đo không tin cậy.

### 10.2 k-fold cross-validation

Chia train set thành **k phần** bằng nhau (gọi là *fold*). Lặp k lần: mỗi lần dùng 1 fold làm val, k−1 fold còn lại làm train. Trung bình k val loss.

#### Walk-through k=5 trên 90 mẫu train Iris

- Chia 90 thành 5 fold, mỗi fold 18 mẫu.
- Lần 1: val = fold 1, train = fold 2-5 (72 mẫu) → val_loss₁ = 0.15.
- Lần 2: val = fold 2, train = fold 1, 3-5 → val_loss₂ = 0.12.
- Lần 3: val = fold 3, train = ... → val_loss₃ = 0.18.
- Lần 4: val_loss₄ = 0.10.
- Lần 5: val_loss₅ = 0.14.
- CV score = \`(0.15 + 0.12 + 0.18 + 0.10 + 0.14)/5 = 0.69/5 = 0.138\`.
- Độ lệch: \`std ≈ 0.030\`.

→ **CV mean ± std** đáng tin hơn 1 val set đơn lẻ.

### 10.3 Các biến thể

| Loại | Khi dùng |
|------|---------|
| **k-fold** (k=5 hoặc 10) | Mặc định |
| **Stratified k-fold** | Classification — giữ tỉ lệ lớp trong mỗi fold |
| **Leave-one-out (LOOCV)** | k = N. Rất chính xác nhưng tốn → chỉ khi N nhỏ (< 200) |
| **TimeSeries CV** | Data có thứ tự thời gian — train luôn ở quá khứ, val ở tương lai |
| **Group k-fold** | Khi mẫu cùng nhóm phải cùng phía (vd ảnh cùng bệnh nhân) |

### 10.4 Hyperparameter tuning với CV

\`\`\`
for λ in [0.001, 0.01, 0.1, 1.0]:
    cv_score = cross_validate(model_with_λ, X_train, y_train, k=5)
    print(λ, cv_score)
chọn λ với cv_score tốt nhất → retrain trên toàn bộ X_train → report trên X_test
\`\`\`

> **🔁 Dừng lại tự kiểm tra.**
> Tại sao LOOCV gần như không bao giờ dùng trên dataset 1 triệu mẫu?
>
> <details><summary>Đáp án</summary>
>
> Vì k = N = 1.000.000 — phải train model 1 triệu lần. Nếu mỗi lần train mất 10 phút thì tổng = 10⁷ phút ≈ 19 năm. Với dataset lớn, k=5 hoặc k=10 đã đủ tin cậy.
> </details>

> **📝 Tóm tắt mục 10.**
> - 1 val set duy nhất noisy → dùng k-fold (k=5 hoặc 10).
> - Stratified k-fold cho classification.
> - TimeSeries CV khi có chiều thời gian.

---

## 11. Liên hệ các lesson sau

Pipeline 6 bước là **khung chung**. Mỗi lesson sau ép cho khung này một dạng cụ thể:

| Lesson | Đổi gì? |
|--------|---------|
| **L02 Linear regression** | Model \`wᵀx + b\`, loss MSE, closed-form solution + GD. |
| **L03 Logistic regression** | Model \`σ(wᵀx + b)\`, loss cross-entropy binary, sigmoid. |
| **L04 Neural network** | Model nhiều tầng \`f = W₂·act(W₁x + b₁) + b₂\`, backprop. |
| **L05 Text vectorization** | Step 2 chuyên sâu cho text: BoW, TF-IDF. |
| **L06 Word embeddings** | Step 2 + Step 3 hợp nhất: học feature & model cùng lúc (Word2Vec). |
| **L07 Vector DB + RAG** | Skip Step 5 — dùng embedding pretrained, build retrieval. |
| **L08 CLIP** | Step 4 đặc biệt: contrastive loss giữa ảnh + text. |

Mỗi khi gặp khái niệm mới ở các lesson sau, **quay về 6 bước** và hỏi "kỹ thuật này thay đổi bước nào?".

---

## 12. Bài tập

### Bài 1 — Đúng/Sai (Data split)

Với mỗi câu, chọn Đ/S và giải thích:

1. *"Có thể chia train/test ngẫu nhiên cho dữ liệu chuỗi thời gian."*
2. *"Standardize bằng mean/std tính trên toàn bộ data (train + test) rồi mới chia."*
3. *"Test set có thể dùng nhiều lần để so sánh các model."*

### Bài 2 — Tính tay (Scaling)

Cột \`tuổi = [25, 30, 35, 40, 45, 50]\`. Tính standardized và min-max normalized.

### Bài 3 — Tính tay (Softmax + cross-entropy)

Cho \`z = (2.0, 1.0, 0.1)\` và nhãn thật là lớp 0 (one-hot \`y = (1, 0, 0)\`).

1. Tính \`ŷ = softmax(z)\`.
2. Tính cross-entropy.
3. Tính \`∂L/∂z = ŷ − y\`.

### Bài 4 — Confusion matrix

Model gian lận: TP=120, FP=30, FN=80, TN=770.

1. Tính accuracy, precision, recall, F1.
2. Nếu sếp yêu cầu "đừng bỏ sót gian lận", nên ưu tiên metric nào? Đề xuất thay đổi.

### Bài 5 — Bias-variance

Dataset có hàm thật \`y = x²\` (parabola). Fit bằng:
1. Linear \`y = ax + b\`.
2. Polynomial bậc 2 \`y = ax² + bx + c\`.
3. Polynomial bậc 20.

Xếp 3 model theo bias (từ thấp tới cao) và variance (từ thấp tới cao). Cái nào là "just right"?

### Bài 6 — Chọn λ bằng val set

Train logistic regression với 5 giá trị \`λ\`:

| λ | Train acc | Val acc |
|---|-----------|---------|
| 0.001 | 0.99 | 0.82 |
| 0.01 | 0.95 | 0.88 |
| 0.1 | 0.92 | 0.91 |
| 1.0 | 0.85 | 0.85 |
| 10 | 0.70 | 0.71 |

Chọn \`λ\` nào? Giải thích.

---

## 13. Lời giải chi tiết

### Bài 1

1. **Sai**. Dữ liệu chuỗi thời gian phải tách theo thời gian (train ở quá khứ, test ở tương lai). Tách ngẫu nhiên = data leakage.
2. **Sai**. Phải tính \`μ, σ\` chỉ trên train set, sau đó áp dụng cùng \`μ, σ\` cho test. Tính trên toàn bộ → leakage.
3. **Sai**. Test chỉ dùng MỘT lần ở cuối. Dùng nhiều lần để so sánh = test set bị "rò" thông tin qua mỗi lần xem.

### Bài 2

**Standardize**:

- \`μ = (25+30+35+40+45+50)/6 = 225/6 = 37.5\`.
- Bình phương lệch: \`(25-37.5)² + ... + (50-37.5)²\` = \`156.25 + 56.25 + 6.25 + 6.25 + 56.25 + 156.25 = 437.5\`.
- \`σ² = 437.5/6 ≈ 72.917\`, \`σ ≈ 8.539\`.
- Kết quả: \`[(25-37.5)/8.539, ...]\` = \`[-1.464, -0.879, -0.293, 0.293, 0.879, 1.464]\`.
- Kiểm: tổng ≈ 0 ✓, var ≈ 1 ✓.

**Min-max** với \`[25, 50]\`, range 25:

- \`[(25-25)/25, (30-25)/25, (35-25)/25, (40-25)/25, (45-25)/25, (50-25)/25]\`
- \`= [0, 0.2, 0.4, 0.6, 0.8, 1.0]\`.

### Bài 3

1. **Softmax**:
   - \`e^2.0 ≈ 7.389\`, \`e^1.0 ≈ 2.718\`, \`e^0.1 ≈ 1.105\`.
   - Tổng \`≈ 11.212\`.
   - \`ŷ = (7.389/11.212, 2.718/11.212, 1.105/11.212) ≈ (0.659, 0.242, 0.099)\`.
   - Kiểm: tổng = 0.659 + 0.242 + 0.099 = 1.000 ✓.

2. **Cross-entropy**: \`−log(ŷ₀) = −log(0.659) ≈ −(−0.417) = 0.417\`.

3. **Gradient**: \`∂L/∂z = ŷ − y = (0.659 − 1, 0.242 − 0, 0.099 − 0) = (−0.341, 0.242, 0.099)\`.
   - Diễn giải: tăng \`z₀\` (gradient âm), giảm \`z₁, z₂\` (gradient dương).

### Bài 4

1. - Tổng = 120 + 30 + 80 + 770 = 1000.
   - Acc = (120 + 770)/1000 = 890/1000 = 0.890.
   - Prec = 120/(120 + 30) = 120/150 = 0.800.
   - Rec = 120/(120 + 80) = 120/200 = 0.600.
   - F1 = 2·(0.8·0.6)/(0.8+0.6) = 2·0.48/1.4 ≈ 0.6857.

2. "Đừng bỏ sót" = giảm FN = tăng **recall**. Hiện recall = 60% quá thấp.
   - **Đề xuất**: hạ ngưỡng quyết định (vd từ 0.5 xuống 0.3). Sẽ tăng TP và giảm FN, nhưng tăng FP. Chấp nhận tradeoff. Có thể thêm trọng số lớp khi training (class weight) để model "ưu tiên" phát hiện gian lận.

### Bài 5

- Linear \`y = ax + b\`: không bao giờ fit được \`x²\` → **bias cao**, **variance thấp** (mỗi lần resample data, đường thẳng cũng không đổi nhiều).
- Polynomial bậc 2: chính là dạng \`y = x²\` → **bias = 0** (về lý thuyết), **variance thấp** (3 tham số đủ stable).
- Polynomial bậc 20: thừa rất nhiều bậc → bias gần 0 nhưng **variance rất cao** (overfit noise).

| Model | Bias | Variance |
|-------|------|----------|
| Linear | Cao | Thấp |
| Poly 2 | Rất thấp | Thấp |
| Poly 20 | Rất thấp | Rất cao |

**Just right**: polynomial bậc 2 — khớp đúng giả định bài toán, ít tham số nhất đủ biểu diễn.

### Bài 6

- λ = 0.001: train 99%, val 82% → khoảng cách 17% → **overfit nặng**.
- λ = 0.01: vẫn overfit nhẹ (95% vs 88%).
- **λ = 0.1**: train 92%, val 91% → khoảng cách rất nhỏ, val cao nhất → **chọn**.
- λ = 1.0: bắt đầu underfit (cả train + val xuống).
- λ = 10: underfit nặng.

→ **Chọn λ = 0.1**. Retrain trên toàn bộ X_train (có thể bao gồm cả val), sau đó report accuracy trên test set.

---

## Bài tiếp theo

[Lesson 02 — Linear regression](../lesson-02-linear-regression/): áp dụng pipeline 6 bước vào model đơn giản nhất, đi sâu vào MSE, gradient analytical, closed-form vs gradient descent.

## Tham khảo

- Bishop, *Pattern Recognition and Machine Learning*, Chương 1, 3.
- Hastie, Tibshirani, Friedman, *Elements of Statistical Learning*, Chương 7 (Model assessment & selection).
- Goodfellow, Bengio, Courville, *Deep Learning*, Chương 5 (ML basics).
- Andrew Ng, *Machine Learning Yearning* — chiến lược chống overfit.
`;
