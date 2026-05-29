// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/02-ClassicalMethods/lesson-01-knn-decision-tree/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — KNN & Decision Tree

> **Tier 2 — Classical Methods · AI-ML**

Hai thuật toán học máy "trực quan" nhất: KNN hỏi "điểm mới gần ai nhất?", Decision Tree hỏi "câu hỏi nào tốt nhất để chia data?". Cả hai là cơ sở của Random Forest (T2-L02) và nhiều ensemble method.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Mô tả được thuật toán KNN cho classification và regression, tính distance Euclidean/Manhattan/cosine.
- Giải thích **curse of dimensionality** và tại sao KNN kém trong không gian chiều cao.
- Tính được **Entropy** và **Information Gain** tay từ bảng tần số.
- Xây dựng Decision Tree bằng tay trên Play Tennis dataset.
- Phân biệt **ID3** (entropy/IG), **CART** (Gini, binary), **pruning** cost-complexity.
- Biết khi nào chọn KNN vs Decision Tree.

## Kiến thức tiền đề

- [T1-L01 — Pipeline ML](../../01-Foundations/lesson-01-ml-pipeline/): train/test split, evaluation.
- [T1-L04 — Bias-Variance](../../01-Foundations/lesson-04-bias-variance-regularization/): overfitting, k-fold CV.
- Logarithm cơ bản (log₂).

---

## 1. K-Nearest Neighbors (KNN)

### 1.1. Intuition

> 💡 **Trực giác**: Bạn muốn biết một loại quả lạ có ăn được không. Bạn nhìn 5 loại quả quen thuộc **gần nhất** (về hình dạng, màu, mùi) và xem chúng có ăn được không — nếu 4/5 ăn được → quả lạ nhiều khả năng ăn được. Đây chính xác là KNN.

**(a) Là gì**: để dự đoán label của điểm mới \`x\`:
1. Tính khoảng cách từ \`x\` tới tất cả \`n\` điểm training.
2. Chọn \`k\` điểm gần nhất (k-nearest neighbors).
3. **Classification**: majority vote → class có nhiều nhất trong k láng giềng.
4. **Regression**: mean của k giá trị label.

**(b) Vì sao cần**: không cần training phase — KNN là **lazy learner** (non-parametric). Mọi "learning" xảy ra lúc prediction. Phù hợp khi data ít, không biết dạng phân phối.

**(c) Ví dụ số**: 7 điểm training (2D), k=3:

\`\`\`
Points: A(1,2)→class 0, B(2,3)→0, C(3,1)→0, D(5,4)→1, E(6,3)→1, F(4,5)→1, G(5,2)→1
New point: x=(4,3)
\`\`\`

Distances từ x=(4,3):
- d(x,A) = √((4−1)²+(3−2)²) = √(9+1) = √10 ≈ 3.16
- d(x,B) = √((4−2)²+(3−3)²) = √4 = 2.00
- d(x,C) = √((4−3)²+(3−1)²) = √5 ≈ 2.24
- d(x,D) = √((4−5)²+(3−4)²) = √2 ≈ 1.41 **← gần nhất**
- d(x,E) = √((4−6)²+(3−3)²) = √4 = 2.00
- d(x,F) = √((4−4)²+(3−5)²) = √4 = 2.00
- d(x,G) = √((4−5)²+(3−2)²) = √2 ≈ 1.41 **← gần nhất**

k=3 nearest: D(class 1), G(class 1), B(class 0) hoặc E(class 0) hoặc F(class 0) (tie ở khoảng cách 2.0).

Giả sử chọn D, G, E (3 gần nhất): vote = {1: 2, 0: 1} → **predict class 1**. ✓

### 1.2. Distance Metrics

**(a) Euclidean**: \`d(a,b) = √(Σ(aᵢ−bᵢ)²)\` — chuẩn L2.
- Ví dụ: a=(1,3), b=(4,7) → d = √((4−1)²+(7−3)²) = √(9+16) = √25 = 5.

**(b) Manhattan**: \`d(a,b) = Σ|aᵢ−bᵢ|\` — chuẩn L1, "grid distance".
- Cùng ví dụ: d = |4−1| + |7−3| = 3 + 4 = 7.

**(c) Cosine similarity**: \`cos(a,b) = (a·b) / (‖a‖·‖b‖)\` — đo góc, không phụ thuộc độ lớn.
- a=(1,0), b=(3,0) → cos = 3/3 = 1 (hoàn toàn cùng hướng, distance = 0).
- a=(1,0), b=(0,1) → cos = 0 (vuông góc, distance = 1).
- Dùng khi: text documents (bag of words — tần suất khác nhau nhưng topic giống nhau).

> ❓ **Câu hỏi**: khi nào dùng Manhattan thay Euclidean? — Khi data có nhiều **outlier** hoặc **high-dimensional sparse** data. Manhattan ít nhạy cảm hơn với outlier vì không bình phương.

### 1.3. Chọn k: Bias-Variance

| k nhỏ (k=1) | k lớn (k=15) |
|:---|:---|
| Phức tạp — ranh giới ngoằn ngoèo | Đơn giản — ranh giới mượt |
| Variance cao (overfit) | Bias cao (underfit) |
| Nhạy với noise | Smooth nhưng có thể sai |

**k=1 ví dụ số**: A(1,2)→0, B(2,3)→0, C(10,10)→0 bị nhầm → outlier C tạo "đảo class 0" ở vùng class 1. k=5 → outlier bị bỏ phiếu áp đảo.

**Rule of thumb**: k ≈ √n, tuning bằng CV. Chọn k lẻ để tránh tie (binary classification).

### 1.4. Curse of Dimensionality

> 💡 **Trực giác**: Trong 1D, "gần nhất" = gần về đường thẳng. Trong 100D, mọi điểm gần bằng nhau — "láng giềng gần nhất" không gần hơn "láng giềng xa nhất" bao nhiêu.

**(a) Ví dụ số**: unit hypercube [0,1]^d, n=1000 points:

| d (dimensions) | Avg distance to nearest neighbor |
|:---:|:---:|
| 1 | 0.001 |
| 2 | 0.032 |
| 5 | 0.28 |
| 10 | 0.46 |
| 20 | 0.62 |
| 100 | 0.90 |

Ở d=100: nearest neighbor và farthest neighbor đều xa ~0.9 → mọi "neighbour" đều xa như nhau → KNN vô nghĩa.

**(b) Công thức**: để cover volume = ε của unit hypercube d chiều bằng k nearest neighbors, cần \`k ≈ n · ε^(1/d)\` tăng theo hàm mũ. Cần n = 10^d điểm để có density tương đương.

> ⚠ **Lỗi thường gặp**: dùng KNN với raw pixel (784D cho MNIST 28×28) mà không giảm chiều. Fix: PCA xuống ~50D trước rồi mới KNN.

📝 **Tóm tắt mục 1**:
- KNN: k nearest neighbors → majority vote/mean. Không train, chỉ store data.
- k nhỏ: overfit; k lớn: underfit. Tune bằng CV.
- Curse of dimensionality: nearest neighbor distance đồng đều trong high-d → KNN kém.
- Preprocess: normalize features (vì distance nhạy với scale) + giảm chiều nếu d > 20.

---

## 2. Decision Tree

### 2.1. Intuition

> 💡 **Trực giác**: Bạn muốn quyết định "đi chơi tennis hôm nay không?". Bạn tự hỏi: "Trời có mưa không?" — Nếu có mưa → không đi. Nếu không mưa → "Nóng không?" — Nếu rất nóng → không đi... Đây là quy trình ra quyết định bằng câu hỏi yes/no, chính xác là cách Decision Tree hoạt động.

**(a) Là gì**: cấu trúc cây với:
- **Internal node**: câu hỏi về một feature ("Outlook = Sunny?")
- **Branch**: câu trả lời (Sunny / Overcast / Rain)
- **Leaf**: dự đoán cuối cùng (Play: Yes / No)

**(b) Vì sao cần**: interpretable (dễ giải thích cho người không kỹ thuật), xử lý mixed features (cả categorical lẫn numerical), không cần normalize.

**(c) Thuật toán**: ở mỗi node, chọn feature và threshold sao cho **maximize purity** của 2 subset con. Đệ quy cho đến khi leaf thuần (pure) hoặc đạt điều kiện dừng.

### 2.2. Entropy

**(a) Là gì**: đo lường **sự không chắc chắn** (uncertainty / disorder) của một tập labels:

\`\`\`
H(S) = −Σᵢ pᵢ · log₂(pᵢ)
\`\`\`

với \`pᵢ\` là tỉ lệ class i trong tập S.

**(b) Vì sao cần**: để so sánh "độ hỗn tạp" của node trước và sau khi split. Split tốt = entropy giảm nhiều nhất.

**(c) Ví dụ số** (4 trường hợp):
1. **Pure**: S = {+, +, +, +} → p₊=1, p₋=0. \`H = −1·log₂(1) − 0·log₂(0) = 0 + 0 = **0 bit**\`.
2. **Maximum disorder**: S = {+, +, +, +, +, −, −, −, −, −} (5 vs 5) → p₊=0.5, p₋=0.5. \`H = −0.5·log₂(0.5) − 0.5·log₂(0.5) = −0.5·(−1) − 0.5·(−1) = **1.0 bit**\`.
3. **3 classes equal**: p=(⅓, ⅓, ⅓). \`H = −3·(⅓·log₂(⅓)) = −3·(⅓·(−1.585)) = **1.585 bit**\`.
4. **Imbalanced**: S = {+:7, −:3}. p₊=0.7, p₋=0.3. \`H = −0.7·log₂(0.7) − 0.3·log₂(0.3) = −0.7·(−0.515) − 0.3·(−1.737) = 0.360 + 0.521 = **0.881 bit**\`.

> ❓ **Câu hỏi**: Tại sao log₂? — Đơn vị là "bit". Có thể dùng log tự nhiên (nats) hoặc log₁₀. Kết quả giống nhau về thứ tự so sánh, chỉ khác đơn vị. Trong ML, log₂ thông dụng vì dễ đọc với binary split.

### 2.3. Information Gain

**(a) Là gì**: độ giảm entropy sau khi split theo feature A:

\`\`\`
IG(S, A) = H(S) − Σᵥ (|Sᵥ|/|S|) · H(Sᵥ)
\`\`\`

với \`Sᵥ\` là subset có A = v.

**(b) Vì sao cần**: so sánh nhiều candidate features → chọn feature có IG cao nhất tại mỗi node.

**(c) Walk-through: Play Tennis dataset**

Dataset 14 rows (tổng hợp kinh điển):

| # | Outlook | Temp | Humidity | Wind | Play? |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Sunny | Hot | High | Weak | No |
| 2 | Sunny | Hot | High | Strong | No |
| 3 | Overcast | Hot | High | Weak | Yes |
| 4 | Rain | Mild | High | Weak | Yes |
| 5 | Rain | Cool | Normal | Weak | Yes |
| 6 | Rain | Cool | Normal | Strong | No |
| 7 | Overcast | Cool | Normal | Strong | Yes |
| 8 | Sunny | Mild | High | Weak | No |
| 9 | Sunny | Cool | Normal | Weak | Yes |
| 10 | Rain | Mild | Normal | Weak | Yes |
| 11 | Sunny | Mild | Normal | Strong | Yes |
| 12 | Overcast | Mild | High | Strong | Yes |
| 13 | Overcast | Hot | Normal | Weak | Yes |
| 14 | Rain | Mild | High | Strong | No |

S = 14 samples: 9 Yes (+), 5 No (−). \`H(S) = −(9/14)log₂(9/14) − (5/14)log₂(5/14)\`:

\`\`\`
9/14 ≈ 0.643, log₂(0.643) ≈ −0.637
5/14 ≈ 0.357, log₂(0.357) ≈ −1.486
H(S) = 0.643 × 0.637 + 0.357 × 1.486 = 0.410 + 0.530 = 0.940 bit
\`\`\`

**Tính IG(S, Outlook)**:

- Sunny (5 rows): #1,2,8 → No; #9,11 → Yes. p₊=2/5, p₋=3/5. \`H = −(2/5)log₂(2/5) − (3/5)log₂(3/5) = 0.400×1.322 + 0.600×0.737 = 0.529 + 0.442 = 0.971\`.
- Overcast (4 rows): #3,7,12,13 → 4 Yes, 0 No. \`H = 0\` (pure!).
- Rain (5 rows): #4,5,10 → Yes; #6,14 → No. p₊=3/5, p₋=2/5. \`H = 0.971\` (giống Sunny).

\`\`\`
IG(S, Outlook) = 0.940 − [(5/14)·0.971 + (4/14)·0 + (5/14)·0.971]
              = 0.940 − [0.347 + 0 + 0.347]
              = 0.940 − 0.694
              = 0.246 bit
\`\`\`

**Tính IG(S, Humidity)**:

- High (7 rows): #1,2,3,4,8,12,14 → 3 Yes, 4 No. p₊=3/7, p₋=4/7. \`H = −(3/7)log₂(3/7) − (4/7)log₂(4/7) = 0.429×1.222 + 0.571×0.807 = 0.524 + 0.461 = 0.985\`.
- Normal (7 rows): #5,6,7,9,10,11,13 → 6 Yes, 1 No. p₊=6/7, p₋=1/7. \`H = −(6/7)log₂(6/7) − (1/7)log₂(1/7) = 0.857×0.222 + 0.143×2.807 = 0.190 + 0.401 = 0.591\`.

\`\`\`
IG(S, Humidity) = 0.940 − [(7/14)·0.985 + (7/14)·0.591]
               = 0.940 − [0.492 + 0.296]
               = 0.940 − 0.788
               = 0.152 bit
\`\`\`

**Tính IG(S, Wind)**: IG ≈ 0.048 (tính tương tự).

**So sánh**:

| Feature | IG |
|:---:|:---:|
| **Outlook** | **0.246** ← chọn đầu tiên |
| Humidity | 0.152 |
| Temperature | 0.029 |
| Wind | 0.048 |

→ Root node: **Outlook**.

### 2.4. Gini Impurity

**(a) Là gì**: đo xác suất phân loại sai khi label ngẫu nhiên theo phân phối class:

\`\`\`
Gini(S) = 1 − Σᵢ pᵢ²
\`\`\`

**(b) Vì sao cần**: CART (Gini) thường nhanh hơn ID3 (entropy) vì tránh tính log. Kết quả gần như nhau.

**(c) Ví dụ số** (4 trường hợp):
1. Pure: p₊=1 → \`Gini = 1 − 1² = 0\`.
2. 50/50: p=0.5 → \`Gini = 1 − 0.25 − 0.25 = 0.5\` (max).
3. Play Tennis S: p₊=9/14, p₋=5/14 → \`Gini = 1 − (9/14)² − (5/14)² = 1 − 0.413 − 0.128 = 0.459\`.
4. 3 classes equal: p=⅓ × 3 → \`Gini = 1 − 3·(⅓)² = 1 − 3/9 = 0.667\`.

> ⚠ **Lỗi thường gặp**: nhầm Entropy với Gini — Entropy có giá trị lớn hơn (0–log₂(k) bits), Gini chuẩn hoá trong [0, (k-1)/k]. Không so sánh số tuyệt đối giữa Entropy và Gini.

### 2.5. CART và Pruning

**CART** (Classification And Regression Trees): binary split, Gini, xử lý cả categorical và numerical.

**Pruning**: cắt bớt các branch không đáng. **Cost-complexity pruning**:

\`\`\`
Tα(T) = R(T) + α · |T|
\`\`\`
- \`R(T)\` = training error
- \`|T|\` = số leaf nodes
- \`α\` = regularization parameter (như λ trong Ridge)

α = 0 → cây đầy đủ (overfit). α lớn → cây nhỏ hơn (underfit). Tune α bằng CV.

> ❓ **Câu hỏi**: Khi nào dùng Decision Tree thay vì KNN? — Decision Tree: interpretable (giải thích được từng nhánh), xử lý categorical tự nhiên, nhanh hơn lúc predict (O(log n) vs O(n) của KNN). KNN: không cần training, tốt với small dataset, sensitive với local structure.

> 🔁 **Kiểm tra**: Tập S có 8 Yes và 2 No. Tính Entropy và Gini.

<details><summary>Đáp án</summary>

p₊ = 8/10 = 0.8, p₋ = 2/10 = 0.2.

**Entropy**: \`H = −0.8·log₂(0.8) − 0.2·log₂(0.2)\`.
log₂(0.8) = log₂(4/5) = 2 − log₂(5) = 2 − 2.322 = −0.322.
log₂(0.2) = log₂(1/5) = −log₂(5) = −2.322.
\`H = −0.8×(−0.322) − 0.2×(−2.322) = 0.258 + 0.464 = 0.722 bit\`.

**Gini**: \`G = 1 − 0.8² − 0.2² = 1 − 0.64 − 0.04 = 0.32\`.

</details>

📝 **Tóm tắt mục 2**:
- Decision Tree: hỏi câu hỏi tốt nhất ở mỗi node để tối đa hóa purity.
- Entropy H(S): uncertainty, 0 = pure, max = log₂(k).
- Information Gain: giảm entropy sau split — chọn feature có IG cao nhất (ID3).
- Gini Impurity: alternative tới entropy, CART dùng vì không cần log.
- Pruning (cost-complexity): cắt cây overfit bằng α regularization.

---

## 3. Bài tập

**Bài 1**: Dataset: điểm thi A=(60, 70)→Pass, B=(80, 90)→Pass, C=(55, 60)→Fail, D=(85, 75)→Pass, E=(50, 80)→Fail. Điểm mới: x=(70,75). Dự đoán với k=1, k=3 (Euclidean distance).

**Bài 2**: Tính entropy H(S) cho S = {+:4, −:4, ○:2} (3 classes, 10 samples).

**Bài 3**: Feature "Wind" trong Play Tennis có Weak (8 rows: 6 Yes + 2 No) và Strong (6 rows: 3 Yes + 3 No). Tính IG(S, Wind). Biết H(S) = 0.940.

**Bài 4**: Giải thích tại sao Decision Tree depth không giới hạn với training data thường có training accuracy 100% nhưng generalization kém. Cơ chế nào gây ra vấn đề này (theo bias-variance)?

---

## 4. Lời giải chi tiết

### Bài 1

**Tính Euclidean distance từ x=(70,75)**:
\`\`\`
d(x,A) = √((70−60)² + (75−70)²) = √(100+25) = √125 ≈ 11.18
d(x,B) = √((70−80)² + (75−90)²) = √(100+225) = √325 ≈ 18.03
d(x,C) = √((70−55)² + (75−60)²) = √(225+225) = √450 ≈ 21.21
d(x,D) = √((70−85)² + (75−75)²) = √(225+0) = √225 = 15.00
d(x,E) = √((70−50)² + (75−80)²) = √(400+25) = √425 ≈ 20.62
\`\`\`

Thứ tự gần nhất: A (11.18) < D (15.00) < B (18.03) < E (20.62) < C (21.21).

**k=1**: láng giềng gần nhất = A → **Predict: Pass**.
**k=3**: 3 gần nhất = A(Pass), D(Pass), B(Pass) → vote = {Pass:3, Fail:0} → **Predict: Pass**.

### Bài 2

p₊ = 4/10 = 0.4, p₋ = 4/10 = 0.4, p○ = 2/10 = 0.2.

\`\`\`
H = −0.4·log₂(0.4) − 0.4·log₂(0.4) − 0.2·log₂(0.2)
log₂(0.4) = log₂(2/5) = 1 − log₂(5) = 1 − 2.322 = −1.322
log₂(0.2) = −log₂(5) = −2.322
H = −0.4×(−1.322) − 0.4×(−1.322) − 0.2×(−2.322)
  = 0.529 + 0.529 + 0.464 = 1.522 bit
\`\`\`

Verify: max entropy với 3 classes bằng nhau = log₂(3) = 1.585. Dataset 4-4-2 ít đối xứng hơn → H = 1.522 < 1.585. ✓

### Bài 3

Weak (8 rows): 6 Yes, 2 No. p₊=6/8=0.75, p₋=2/8=0.25.
\`\`\`
H(Weak) = −0.75·log₂(0.75) − 0.25·log₂(0.25)
log₂(0.75) = log₂(3/4) = log₂3 − 2 = 1.585 − 2 = −0.415
log₂(0.25) = −2
H(Weak) = 0.75×0.415 + 0.25×2 = 0.311 + 0.500 = 0.811 bit
\`\`\`

Strong (6 rows): 3 Yes, 3 No → p=0.5 → \`H(Strong) = 1.0 bit\`.

\`\`\`
IG(S, Wind) = H(S) − [(8/14)·H(Weak) + (6/14)·H(Strong)]
            = 0.940 − [(8/14)·0.811 + (6/14)·1.0]
            = 0.940 − [0.463 + 0.429]
            = 0.940 − 0.892
            = 0.048 bit
\`\`\`

Wind có IG thấp nhất trong 4 features → Decision Tree ít dùng Wind ở root.

### Bài 4

**Nguyên nhân**: Decision Tree không giới hạn depth tạo leaf node cho mỗi training sample (hoặc nhóm nhỏ). Điều này có nghĩa:

1. **Số parameters** của tree bằng số leaf ≈ số training samples → model "nhớ" từng điểm.
2. **Bias = 0** hoặc rất thấp: training accuracy = 100%.
3. **Variance cao**: cấu trúc tree cực kỳ nhạy với training data. Thêm/bớt 1 điểm → tree thay đổi hoàn toàn.

**Theo bias-variance**: đây là high variance / overfit, không phải high bias. Giải pháp:
- **Pruning**: giới hạn độ sâu hoặc dùng cost-complexity.
- **Min samples per leaf**: leaf phải có ≥ 5 samples → không tạo 1-sample leaf.
- **Ensemble**: Random Forest tổng hợp nhiều tree → variance trung bình thấp hơn (sẽ học ở [T2-L02](../lesson-02-random-forest/)).

---

## 5. Tham khảo

- **ESL** Chapter 9.2 (Tree-Based Methods), Chapter 13 (Nearest Neighbor).
- **ISL** Chapter 8 (Tree-Based Methods).
- **MLPP** Chapter 16 (Adaptive Basis Function Models).
- Quinlan (1986) — *Induction of Decision Trees* (bài báo gốc ID3).
- Breiman et al. (1984) — *Classification and Regression Trees* (CART).
- [Bài tiếp theo — T2-L02: Random Forest](../lesson-02-random-forest/README.md)
- [visualization.html](./visualization.html)
`;
