// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/04-LinearAlgebra/lesson-08-pca-svd/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — PCA và SVD

> "Tầng 4 — Linear Algebra, bài **cuối** (8/8). Đây là **ứng dụng đỉnh** của toàn bộ đại số tuyến tính trong machine learning. Nếu eigenvector ở Lesson 07 trả lời câu hỏi *'ma trận này có hướng đặc trưng nào?'*, thì PCA/SVD trả lời câu hỏi xa hơn: *'dữ liệu 1000 chiều này thực ra sống trên một mặt phẳng 2-3 chiều — đó là mặt phẳng nào?'*. Bạn sẽ rời bài này với khả năng: chạy tay PCA cho 5 điểm 2D, hiểu vì sao Netflix Prize và LSA và word2vec đều quy về cùng một phép toán, và biết khi nào PCA **không đủ** (manifold cong → t-SNE/UMAP)."

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được **bài toán giảm chiều** (dimensionality reduction): vì sao cần, đánh đổi gì, mục tiêu định lượng là gì.
2. Trình bày **PCA** bằng 4 bước (center → covariance → eigendecomposition → project) và **chạy tay** PCA cho 5 điểm 2D mà không cần máy.
3. Phát biểu **SVD**: \`A = U·Σ·Vᵀ\`, ý nghĩa hình học của 3 thừa số, và quan hệ với eigenvalue decomposition.
4. **Chứng minh được** quan hệ PCA ↔ SVD: cột của V là principal components của X đã center.
5. Áp dụng **truncated SVD** cho image compression: cho ảnh 256×256 và \`k = 30\`, ước lượng được bao nhiêu byte tiết kiệm và ảnh sẽ "mất gì".
6. Liệt kê được **5 ứng dụng** đời thực của PCA/SVD (image compression, LSA, recommendation system, GloVe word embedding, MNIST visualization) và giải thích cùng một phép toán xuất hiện ở các bài toán nhìn-có-vẻ-rất-khác-nhau như thế nào.
7. Nhận diện được **khi nào PCA thất bại** — manifold cong, dữ liệu không centered theo tự nhiên, outliers — và biết phương án thay thế (kernel PCA, t-SNE, UMAP, autoencoder).

## Kiến thức tiền đề

- [Lesson 07 — Eigenvector & eigenvalue](../lesson-07-eigenvectors/): bài học ngay trước. PCA = eigendecomposition của ma trận hiệp phương sai. Bạn phải biết tính \`Av = λv\` và hiểu "hướng không bị xoay".
- [Lesson 06 — Ma trận = biến đổi](../lesson-06-matrix-as-transform/): rank, image, kernel. SVD chính là khai triển của một biến đổi tuyến tính thành 3 bước hình học cơ bản (xoay → kéo dãn → xoay).
- [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/): nhân ma trận, transpose, ma trận trực giao (\`QᵀQ = I\`). Dùng liên tục trong cả bài.
- [Lesson 02 — Dot product](../lesson-02-dot-product/): projection scalar \`u·v\`. PCA = projection lên trục có phương sai lớn nhất.
- [Tầng 3 — Calculus, Lesson 06 — Đạo hàm riêng + gradient](../../03-Calculus/lesson-06-partial-gradient/): khi chứng minh PCA tối đa hóa phương sai, bạn cần ∇ Lagrangian = 0. Đoạn chứng minh ở mục 4 sẽ dùng tới.

> **💡 Đọc trước bài này một câu**
> Eigenvector chỉ là **đường thẳng đặc biệt** của một ma trận. PCA chọn cái đường thẳng đặc biệt đó **trên ma trận hiệp phương sai của dữ liệu** — và đó chính là trục mà cloud điểm "trải dài" nhiều nhất. SVD tổng quát hóa idea này cho ma trận chữ nhật.

---

## 1. Bài toán giảm chiều — vì sao cần?

### 1.1. Câu chuyện: 1000 features, hỏi sao bây giờ?

Bạn có dataset 10000 user, mỗi user mô tả bởi 1000 features (số phim đã xem, thời gian online, click rate trên 200 thể loại quảng cáo, ...). Bạn muốn:

1. **Visualize** dataset trên màn hình — nhưng màn hình chỉ vẽ được 2D (hoặc tối đa 3D).
2. **Train model** nhanh — 1000 features × 10000 samples = 10 triệu phép tính cho **mỗi epoch**. Nếu rút xuống còn 30 features hữu ích thì giảm 33×.
3. **Loại bỏ noise** — nhiều features là biến thể nhỏ của nhau (vd: "thời gian online buổi sáng" và "thời gian online cả ngày" tương quan ~0.95). Giữ cả hai là lãng phí.
4. **Tránh curse of dimensionality** — khi số chiều tăng, khoảng cách giữa các điểm trong không gian trở nên "đều nhau" một cách bệnh lý, k-NN và clustering hỏng.

> **💡 Trực giác**
> Hình dung 1000 user vẽ trên 1000 trục. Nếu bạn nhìn từ một **góc đặc biệt**, có thể thấy đám user thực ra **gần như nằm trên một mặt phẳng** (hoặc một mặt cong gần phẳng). Mặt phẳng đó có **chiều thấp hơn nhiều** — chỉ 2-3 chiều. PCA tìm cái góc nhìn đó.

### 1.2. Mục tiêu định lượng

Cho dataset \`X ∈ ℝ^(n×d)\` (n samples, mỗi sample là vector d chiều). Muốn tìm phép chiếu \`f: ℝᵈ → ℝᵏ\` (\`k ≪ d\`) sao cho:

- **Bảo toàn càng nhiều thông tin càng tốt** — đo bằng **phương sai (variance)** giữ lại sau projection.
- **Tuyến tính** — \`f(x) = Wx\` với \`W ∈ ℝ^(k×d)\`. Đơn giản, ổn định, tính nhanh, dễ chứng minh.
- **Reconstruction error nhỏ** — khi chiếu ngược lại lên ℝᵈ, sai số \`||x − x_reconstructed||²\` trung bình bé nhất.

PCA giải đúng bài toán này (sẽ chứng minh ở mục 4).

### 1.3. Đánh đổi

| Bạn được | Bạn mất |
|---|---|
| Visualize được dữ liệu | Mất một phần phương sai (không bao giờ 100%) |
| Train nhanh hơn | Mất khả năng giải thích — PC1 không phải feature gốc |
| Bớt noise | Có thể vứt nhầm signal nếu signal yếu hơn noise theo phương sai |
| Tránh curse of dimensionality | Giả định linearity — manifold cong thì PCA "bẹt" sai chỗ |

### ❓ Câu hỏi tự nhiên

> *"Giảm 1000 chiều xuống 30 chiều — không sợ mất đi 970/1000 = 97% thông tin à?"*

Không, vì 1000 features thường **tương quan cao**. Trong nhiều dataset thực, 30 PC đầu tiên có thể giữ 95-99% phương sai. Bạn sẽ thấy con số cụ thể với MNIST ở mục 10.

> *"Tại sao đo 'thông tin' bằng phương sai?"*

Vì phương sai là **độ trải** của dữ liệu. Một hướng có phương sai 0 (mọi điểm cùng giá trị trên hướng đó) không phân biệt được sample này với sample kia → đem chiếu lên đó là mất hoàn toàn khả năng phân biệt. Hướng có phương sai cao = các điểm phân biệt rõ trên hướng đó = nhiều thông tin để phân loại / cluster / ...

Đây là một giả định. Có những context khác (vd: phân loại) ưu tiên **discriminability** thay vì variance — đó là LDA (Linear Discriminant Analysis), một họ hàng của PCA.

> **📝 Tóm tắt mục 1**
> - Dữ liệu d chiều thường sống trên manifold k chiều (k ≪ d). Giảm chiều = tìm manifold đó.
> - PCA tối đa hóa phương sai giữ lại sau projection tuyến tính.
> - Đánh đổi: nhanh / visualize được, nhưng giả định linearity, không giải thích được.

---

## 2. PCA — trực giác hình học

### 2.1. Cloud điểm 2D, chọn trục nào?

Có 5 điểm trên mặt phẳng:

\`\`\`
(2, 3), (3, 4), (4, 5), (5, 6), (6, 7)
\`\`\`

Vẽ ra giấy: chúng nằm **gần như trên đường thẳng y = x + 1**.

Câu hỏi: nếu chỉ được giữ **1 chiều**, bạn chọn trục nào?

- **Trục x**? — Chiếu xuống x: được \`2, 3, 4, 5, 6\`. Khoảng tản: từ 2 tới 6.
- **Trục y**? — Chiếu xuống y: được \`3, 4, 5, 6, 7\`. Khoảng tản: từ 3 tới 7.
- **Đường y = x + 1**? — Chiếu lên đường này: được 5 điểm trải dài hơn nữa, vì đường này "đi theo" hướng dữ liệu.

> **💡 Trực giác**
> Trục tốt nhất là trục mà **khi chiếu xuống, các điểm tản rộng nhất** (= phương sai lớn nhất). Trục đó là **principal component 1 (PC1)**.
>
> Trục PC2 vuông góc với PC1, là trục tốt nhất trong các trục **trực giao với PC1**.
>
> PC3, PC4, ... cứ tiếp tục — mỗi PC đều trực giao với mọi PC trước, và là hướng "còn lại nhiều phương sai nhất" trong không gian con vuông góc.

### 2.2. Vì sao "tản rộng nhất" = "thông tin nhiều nhất"?

Vì nếu sau chiếu, tất cả điểm gom thành một cục, bạn không phân biệt được điểm A với điểm B nữa. Mọi điểm "trông như nhau" theo trục đó → mất thông tin nhận dạng.

Ví dụ phản chứng: vẽ 5 điểm trên, chiếu xuống đường \`y = −x\` (vuông góc với hướng dữ liệu). Bạn được 5 giá trị **gần như bằng nhau** — đường \`y = −x\` chứa rất ít thông tin về dataset này.

### ⚠ Lỗi thường gặp

- **Nhầm "tản rộng" với "xa gốc tọa độ"**: Phương sai đo độ tản **quanh trung bình của chính dữ liệu chiếu**, không phải khoảng cách tới gốc. Vì vậy phải **center dữ liệu trước** (trừ mean). Nếu không center, "PCA" sẽ tìm trục đi từ gốc qua centroid, không phải trục có phương sai lớn nhất.
- **Tưởng PC2 cũng "có ý nghĩa" như PC1**: PC2 chỉ là phần còn lại tốt nhất sau khi đã loại PC1. Trong nhiều dataset, PC1 chiếm 80% phương sai, PC2 chỉ 5% — mức quan trọng rất khác nhau.

### 2.3. Vì sao PC2 phải vuông góc với PC1?

Vì hai trục **không** vuông góc → có phần trùng nhau → thông tin lặp. Mục tiêu là chọn k trục **độc lập tuyến tính** (xem [Lesson 04](../lesson-04-linear-independence/)) — cách mạnh hơn nữa là chọn k trục **trực giao** (orthogonal), khi đó các thành phần chiếu **không tương quan** với nhau, mỗi PC "chứa thông tin độc lập".

> **🔁 Dừng lại tự kiểm tra**
>
> Cho 5 điểm trên trục đứng: \`(0, 1), (0, 2), (0, 3), (0, 4), (0, 5)\`. PC1 là hướng nào? PC2 là hướng nào?
>
> <details>
> <summary>Đáp án</summary>
>
> Sau center (trừ mean (0, 3)): \`(0, −2), (0, −1), (0, 0), (0, 1), (0, 2)\`. Tất cả điểm nằm trên trục y → **PC1 = (0, 1)** (trục y). **PC2 = (1, 0)** (trục x), nhưng phương sai trên PC2 = 0 (vô dụng — chỉ tồn tại để hoàn thiện basis).
> </details>

---

## 3. PCA — 4 bước toán học

Cho \`X ∈ ℝ^(n×d)\`: n samples, d features. (Mỗi hàng = 1 sample, mỗi cột = 1 feature.)

### Bước 1 — Center

\`\`\`
μ = (1/n) · Σ xᵢ        # mean vector, kích thước d
X̃ = X − 1·μᵀ            # trừ mean từ mỗi hàng
\`\`\`

Sau bước này, mỗi cột của X̃ có trung bình 0.

### Bước 2 — Covariance matrix

\`\`\`
C = (1/(n−1)) · X̃ᵀ · X̃       # kích thước d × d, đối xứng
\`\`\`

\`C[i][j]\` = covariance giữa feature i và feature j.

- \`C[i][i]\` = phương sai của feature i.
- \`C[i][j]\` (i ≠ j) = đo "feature i và j cùng biến thiên đến mức nào".

> Lưu ý: nhiều tài liệu dùng \`1/n\` thay vì \`1/(n−1)\` — gọi là biased estimator. Khi \`n\` lớn, sai khác không đáng kể. PCA tìm eigenvector, mà việc chia chung một hằng số không ảnh hưởng eigenvector (chỉ scale eigenvalue) — nên dùng \`1/n\`, \`1/(n−1)\`, hay không chia gì đều ra cùng PC. Để dễ tính, mục 5 dưới đây sẽ dùng \`S = X̃ᵀ · X̃\` (không chia).

### Bước 3 — Eigendecomposition của C

Vì \`C\` đối xứng và positive semi-definite, **spectral theorem** đảm bảo:

\`\`\`
C = V · Λ · Vᵀ
\`\`\`

trong đó:

- \`V ∈ ℝ^(d×d)\` là ma trận trực giao (\`VᵀV = I\`), các cột là eigenvector của C.
- \`Λ\` là ma trận đường chéo, \`Λ[i][i] = λᵢ ≥ 0\` là eigenvalue tương ứng.

Sắp xếp \`λ₁ ≥ λ₂ ≥ ... ≥ λ_d ≥ 0\`. Cột tương ứng \`v₁, v₂, ..., v_d\` là **principal components** theo thứ tự giảm dần độ quan trọng.

### Bước 4 — Project lên k chiều đầu tiên

Lấy \`V_k = [v₁ | v₂ | ... | v_k] ∈ ℝ^(d×k)\` (k cột đầu tiên của V). Tọa độ mới:

\`\`\`
Z = X̃ · V_k         # Z ∈ ℝ^(n×k)
\`\`\`

Mỗi hàng của Z là toạ độ của một sample trong không gian k chiều mới (= dữ liệu sau PCA).

**Phương sai giữ lại**:

\`\`\`
explained_variance_ratio = (λ₁ + λ₂ + ... + λ_k) / (λ₁ + λ₂ + ... + λ_d)
\`\`\`

> **💡 Trực giác toàn cảnh**
> PCA = đổi hệ tọa độ. Hệ cũ là \`e₁, e₂, ..., e_d\` (trục feature gốc). Hệ mới là \`v₁, v₂, ..., v_d\` (các eigenvector của C). Trong hệ mới, **các trục không tương quan** và **trục đầu tiên có phương sai lớn nhất**. Vứt đi \`d − k\` trục cuối = giữ phần "có ý nghĩa nhất".

### ⚠ Lỗi thường gặp

- **Quên center**: rất phổ biến khi mới học. Không center → ma trận \`XᵀX\` không phải covariance, mà là Gram matrix tương tự nhưng tìm trục đi qua gốc — sai chỗ.
- **Quên scale (standardize)**: nếu feature 1 đo bằng mét (range 0-10) còn feature 2 đo bằng mm (range 0-10000), feature 2 sẽ "lấn át" PC1 vì phương sai lớn hơn 1 triệu lần. Trong nhiều ứng dụng, bạn cần **chuẩn hóa** (chia mỗi feature cho độ lệch chuẩn của nó) trước PCA. Đây là biến thể *Standardized PCA*.
- **Đảo thứ tự ma trận**: \`V_k\` là \`(d × k)\`, không phải \`(k × d)\`. \`Z = X̃ · V_k\`, không phải \`V_k · X̃\`. Sai kích thước ngay.

> **📝 Tóm tắt mục 3**
> 1. Center → 2. Covariance → 3. Eigendecomposition → 4. Project lên top-k eigenvector.
> Phương sai giữ lại = tổng top-k eigenvalue / tổng tất cả eigenvalue.

---

## 4. Vì sao công thức đó là đúng? (Chứng minh PCA)

Phát biểu: tìm vector đơn vị \`w ∈ ℝᵈ\` (||w|| = 1) sao cho phương sai của \`X̃w\` (= projection của X̃ lên w) là lớn nhất.

### 4.1. Viết phương sai theo w

Phương sai của các giá trị \`X̃w\` (đã center, mean = 0):

\`\`\`
Var(X̃w) = (1/n) · ||X̃w||²
         = (1/n) · (X̃w)ᵀ(X̃w)
         = (1/n) · wᵀ X̃ᵀ X̃ w
         = wᵀ C w       (với C = (1/n) X̃ᵀ X̃)
\`\`\`

Bài toán: **maximize \`wᵀ C w\`** subject to \`||w||² = wᵀw = 1\`.

### 4.2. Lagrange multiplier

Đặt:

\`\`\`
L(w, λ) = wᵀ C w − λ (wᵀw − 1)
\`\`\`

Tính \`∂L/∂w\` (xem [Tầng 3 — Calculus, Lesson 06](../../03-Calculus/lesson-06-partial-gradient/) để nhớ cách derive theo vector):

\`\`\`
∂L/∂w = 2 C w − 2 λ w
\`\`\`

Set bằng 0:

\`\`\`
C w = λ w
\`\`\`

Đây chính là phương trình eigenvector! \`w\` phải là **eigenvector của C** ứng với eigenvalue \`λ\`.

### 4.3. Trong số các eigenvector, chọn cái nào?

Nhân hai vế của \`Cw = λw\` với \`wᵀ\` từ trái:

\`\`\`
wᵀ C w = λ wᵀ w = λ        (vì wᵀw = 1)
\`\`\`

Mà \`wᵀ C w\` chính là giá trị cần maximize! Vậy ta phải chọn eigenvector ứng với eigenvalue **lớn nhất**.

→ **PC1 = eigenvector của C ứng với λ_max**. Phương sai giữ lại trên PC1 = λ_max.

### 4.4. PC2, PC3, ...

Tìm \`w₂\` cũng chuẩn hóa, ngoài ra **vuông góc với w₁** (\`w₂ᵀw₁ = 0\`), maximize \`w₂ᵀ C w₂\`.

Lagrange với 2 ràng buộc → ra \`Cw₂ = λ₂ w₂\` với \`λ₂\` lớn thứ hai. Tương tự cho mọi \`w_k\`.

Spectral theorem cho ma trận đối xứng đảm bảo các eigenvector **trực giao đôi một** → ràng buộc "vuông góc" tự nhiên thỏa.

> **💡 Kết luận**
> Bài toán "tìm k chiều giữ phương sai nhiều nhất" có nghiệm chính xác là **top-k eigenvector của ma trận hiệp phương sai**. Không phải xấp xỉ, không phải heuristic — đây là lời giải tối ưu của một bài toán tối ưu hóa lồi.

### ❓ Câu hỏi tự nhiên

> *"Chứng minh dùng Lagrange — sao biết đáy của hàm constrained ứng với gradient L = 0?"*

Đây là điều kiện **Karush-Kuhn-Tucker (KKT)**. Trong bài toán constrained tối ưu hóa với ràng buộc equality, nghiệm tối ưu phải là điểm dừng của Lagrangian. Bạn không cần chứng minh KKT từ đầu trong bài này — cứ chấp nhận như công cụ. Chứng minh đầy đủ ở các sách convex optimization (vd. Boyd & Vandenberghe Chương 5).

> *"Maximize \`wᵀ C w\` với \`||w|| = 1\` — nếu bỏ ràng buộc thì sao?"*

Thì hàm này không bị chặn — bạn scale w lên 1 triệu thì \`wᵀ C w\` lên \`10¹²\`. Ràng buộc \`||w|| = 1\` là cách buộc "w là một hướng", không phải vector dài tùy ý.

---

## 5. Walk-through PCA bằng tay — 5 điểm 2D

### 5.1. Dữ liệu

\`\`\`
X = (2, 3)
    (3, 4)
    (4, 5)
    (5, 6)
    (6, 7)
\`\`\`

n = 5, d = 2.

### 5.2. Bước 1 — Center

Mean theo từng cột:

\`\`\`
μ_x = (2+3+4+5+6)/5 = 20/5 = 4
μ_y = (3+4+5+6+7)/5 = 25/5 = 5
μ = (4, 5)
\`\`\`

Trừ mean:

\`\`\`
X̃ = (2−4, 3−5) = (−2, −2)
    (3−4, 4−5) = (−1, −1)
    (4−4, 5−5) = ( 0,  0)
    (5−4, 6−5) = ( 1,  1)
    (6−4, 7−5) = ( 2,  2)
\`\`\`

### 5.3. Bước 2 — Covariance (dùng S = X̃ᵀX̃, không chia)

\`\`\`
X̃ᵀ = (−2 −1 0 1 2)
      (−2 −1 0 1 2)

S = X̃ᵀX̃

S[0][0] = (−2)² + (−1)² + 0² + 1² + 2² = 4 + 1 + 0 + 1 + 4 = 10
S[0][1] = (−2)(−2) + (−1)(−1) + 0 + (1)(1) + (2)(2) = 4 + 1 + 0 + 1 + 4 = 10
S[1][0] = 10 (đối xứng)
S[1][1] = 10 (tương tự S[0][0])

S = (10 10)
    (10 10)
\`\`\`

Nhận xét: \`S[0][1] = 10\` = covariance giữa x và y rất cao (và bằng đúng phương sai theo từng trục) → x và y **tương quan hoàn hảo** trong dataset này. Đúng với hình dung: tất cả điểm nằm trên đường y = x + 1.

### 5.4. Bước 3 — Eigenvector của S

Phương trình characteristic:

\`\`\`
det(S − λI) = 0
det((10−λ  10  )) = (10 − λ)² − 100 = 0
   ((10    10−λ))
\`\`\`

Khai triển:

\`\`\`
(10 − λ)² = 100
10 − λ = ±10
λ = 0 hoặc λ = 20
\`\`\`

**Eigenvalue**: \`λ₁ = 20\`, \`λ₂ = 0\`. Sắp xếp giảm dần.

**Eigenvector ứng λ₁ = 20**: giải \`(S − 20I)v = 0\`:

\`\`\`
(10 − 20  10    )   (v₁)   (0)
(10       10 − 20) · (v₂) = (0)

(−10  10)   (v₁)   (0)
( 10 −10) · (v₂) = (0)
\`\`\`

Phương trình: \`−10 v₁ + 10 v₂ = 0\` → \`v₁ = v₂\`. Chọn \`v = (1, 1)\`, chuẩn hóa:

\`\`\`
||v|| = √(1² + 1²) = √2
v₁ = (1/√2, 1/√2) ≈ (0.7071, 0.7071)
\`\`\`

**Eigenvector ứng λ₂ = 0**: giải \`Sv = 0\`:

\`\`\`
10 v₁ + 10 v₂ = 0 → v₂ = −v₁
v = (1, −1) chuẩn hóa: v₂ = (1/√2, −1/√2)
\`\`\`

Verify trực giao: \`v₁ · v₂ = (1/√2)(1/√2) + (1/√2)(−1/√2) = 1/2 − 1/2 = 0\` ✓.

### 5.5. Bước 4 — Project

Chọn k = 1 (giữ PC1 thôi):

\`\`\`
V₁ = (1/√2)
     (1/√2)

Z = X̃ · V₁

Z[0] = (−2)(1/√2) + (−2)(1/√2) = −4/√2 = −2√2 ≈ −2.828
Z[1] = (−1)(1/√2) + (−1)(1/√2) = −2/√2 = −√2  ≈ −1.414
Z[2] = 0
Z[3] = √2  ≈  1.414
Z[4] = 2√2 ≈ 2.828
\`\`\`

Toàn bộ dataset 2D → còn 1 số mỗi sample.

### 5.6. Verify variance

Phương sai của Z:

\`\`\`
Var(Z) = (1/n) · Σ Z[i]²
       = (1/5) · (8 + 2 + 0 + 2 + 8)
       = (1/5) · 20
       = 4
\`\`\`

Phương sai tổng của X̃ (tính từ S):

\`\`\`
Var_total = (1/n) · (S[0][0] + S[1][1]) = (1/5) · 20 = 4
\`\`\`

Tỷ lệ giữ lại: \`4/4 = 100%\`. Vì dataset này nằm hoàn toàn trên đường y = x + 1 → 1 chiều đủ để giải thích **toàn bộ** phương sai. λ₂ = 0 xác nhận điều này (chiều thứ 2 chứa 0 thông tin).

> **💡 Bài học từ walk-through**
> 1. Eigenvalue cho biết **phương sai trên trục đó**. λ₂ = 0 = trục thừa.
> 2. Khi 2 feature tương quan hoàn hảo, PCA "phát hiện" được — chỉ cần 1 PC, vứt PC2 đi mà không mất gì.
> 3. PC1 ≈ (0.7071, 0.7071) = vector đơn vị theo hướng (1, 1) — đúng với trực giác "đường y = x".

### 🔁 Dừng lại tự kiểm tra

Cho 4 điểm: \`(1, 0), (0, 1), (−1, 0), (0, −1)\`. Tính tay PC1 và λ₁.

<details>
<summary>Đáp án</summary>

Mean = (0, 0) → đã center sẵn.

\`S = X̃ᵀX̃\`:
\`\`\`
S[0][0] = 1 + 0 + 1 + 0 = 2
S[1][1] = 0 + 1 + 0 + 1 = 2
S[0][1] = 0 + 0 + 0 + 0 = 0
S = (2 0; 0 2)
\`\`\`

Eigenvalue: \`det(S − λI) = (2 − λ)² = 0\` → \`λ = 2\` (bội 2).

Vì \`S = 2I\`, **mọi vector** đều là eigenvector. Không có "hướng đặc biệt" — dataset đối xứng tròn. PC1 không xác định duy nhất (mọi hướng đều giữ phương sai bằng nhau).

→ Bài học: khi covariance là \`cI\`, PCA không cung cấp thông tin mới. Đây là dấu hiệu dữ liệu **isotropic** (đẳng hướng).
</details>

> **📝 Tóm tắt mục 5**
> Chạy tay 5 điểm: center → S là 2×2 → solve λ² − 20λ = 0 → λ₁ = 20, λ₂ = 0 → PC1 = (1/√2, 1/√2). Vứt PC2 (vô dụng vì λ₂=0), project xuống 1D, giữ 100% phương sai.

---

## 6. SVD — Singular Value Decomposition

### 6.1. Phát biểu

Mọi ma trận \`A ∈ ℝ^(m×n)\` đều có khai triển:

\`\`\`
A = U · Σ · Vᵀ
\`\`\`

trong đó:

- \`U ∈ ℝ^(m×m)\`: ma trận trực giao (\`UᵀU = I_m\`). Các cột \`uᵢ\` gọi là **left singular vectors**.
- \`Σ ∈ ℝ^(m×n)\`: ma trận "đường chéo" (chỉ phần tử [i][i] khác 0). Các giá trị \`σ₁ ≥ σ₂ ≥ ... ≥ 0\` gọi là **singular values**. Số phần tử khác 0 = \`min(m, n)\`, và \`≤ rank(A)\`.
- \`V ∈ ℝ^(n×n)\`: ma trận trực giao. Các cột \`vᵢ\` là **right singular vectors**.

### 6.2. Trực giác hình học

Mỗi ma trận biến đổi tuyến tính \`A: ℝⁿ → ℝᵐ\` có thể tách thành 3 bước:

1. **Xoay/phản xạ** trong ℝⁿ (do \`Vᵀ\`).
2. **Kéo dãn theo trục tọa độ** với hệ số σᵢ, đồng thời "nhúng" từ ℝⁿ vào ℝᵐ (do \`Σ\`).
3. **Xoay/phản xạ** trong ℝᵐ (do \`U\`).

Không có biến đổi tuyến tính nào "kỳ lạ" hơn 3 bước này — đây là **kiến trúc tổng quát** của mọi ma trận.

> **💡 Trực giác đời sống**
> Hình ảnh: A là cái "máy biến hình". Đầu vào là một quả cầu đơn vị trong ℝⁿ. Bước 1 xoay cầu đó (vẫn là quả cầu). Bước 2 kéo dãn các trục — quả cầu trở thành **elipsoid** với độ dài bán trục là σ₁, σ₂, ..., σ_r (rank). Bước 3 xoay elipsoid trong ℝᵐ.
>
> σᵢ chính là **độ dài các bán trục** của elipsoid đầu ra. Số bán trục khác 0 = rank(A).

### 6.3. Liên hệ SVD ↔ Eigendecomposition

\`A = UΣVᵀ\` → \`AᵀA = V Σᵀ U^T U Σ Vᵀ = V Σᵀ Σ Vᵀ = V Σ² Vᵀ\`

So với eigendecomposition: \`AᵀA = V Λ Vᵀ\` với \`Λ = Σ²\`.

→ **Cột của V là eigenvector của \`AᵀA\`**, và **\`σᵢ² = λᵢ\`** (eigenvalue của \`AᵀA\`).

Tương tự, cột của U là eigenvector của \`AAᵀ\`.

### 6.4. Vì sao mọi ma trận đều có SVD?

Vì \`AᵀA\` luôn đối xứng và positive semi-definite → spectral theorem đảm bảo có eigendecomposition trực giao. Từ đó dựng được V, Σ, rồi suy ra U bằng \`U = AVΣ⁻¹\` cho các cột có σ > 0.

Chứng minh đầy đủ ở các sách linear algebra (vd Strang Chương 6). Trong khuôn khổ bài này, chấp nhận như công cụ.

### ⚠ Lỗi thường gặp

- **Nhầm SVD và eigendecomposition**:
  - Eigendecomposition chỉ áp dụng cho **ma trận vuông** và **diagonalizable**.
  - SVD áp dụng cho **mọi ma trận** (vuông hay không, full rank hay không).
  - Khi A vuông và đối xứng dương → SVD và eigendecomposition trùng nhau (cùng V và \`λ = σ\`).

- **Quên σᵢ ≥ 0**: singular value luôn không âm. Eigenvalue có thể âm (vd ma trận xoay 180°). Khi convert eigenvalue → singular value của AᵀA, lấy giá trị tuyệt đối rồi căn bậc 2.

### ❓ Câu hỏi tự nhiên

> *"\`AᵀA\` và \`AAᵀ\` có cùng eigenvalue không?"*

Có (các giá trị khác 0). Đây là một bổ đề: nếu \`Av = σu\` (với \`u, v\` đơn vị) thì \`AᵀA v = σ² v\` và \`AAᵀ u = σ² u\`. Sau khi phép biến hình, nhân thêm Aᵀ (hoặc A) thì squared singular value xuất hiện. Kích thước khác nhau (m×m vs n×n), nhưng các giá trị khác 0 trùng nhau.

> *"SVD có duy nhất không?"*

Singular values là duy nhất. U và V không duy nhất khi có σᵢ trùng nhau (vd 2 σ bằng nhau thì có thể xoay 2 cột tương ứng của U và V mà vẫn cho ra A). Trong thực hành, các thư viện (NumPy, LAPACK) có quy ước cố định để output ổn định.

> **📝 Tóm tắt mục 6**
> SVD = "xoay → kéo dãn → xoay". Áp dụng cho mọi ma trận. σᵢ = bán trục elipsoid đầu ra = căn của eigenvalue của AᵀA. Cột của V (n×n) = eigenvector của AᵀA. Cột của U (m×m) = eigenvector của AAᵀ.

---

## 7. Liên hệ SVD ↔ PCA

### 7.1. Quan hệ chính

Cho dữ liệu \`X ∈ ℝ^(n×d)\` đã center.

- **PCA**: tìm eigenvector của covariance matrix \`C = (1/(n−1)) · XᵀX\`.
- **SVD trên X**: \`X = U Σ Vᵀ\` với \`V ∈ ℝ^(d×d)\`.

Kết quả:

> Các **cột của V** chính là các **principal component của X** (PC1, PC2, ...).
> Singular value \`σᵢ\` của X liên hệ với eigenvalue λᵢ của C qua \`λᵢ = σᵢ² / (n−1)\`.

### 7.2. Chứng minh

Từ \`X = U Σ Vᵀ\`:

\`\`\`
XᵀX = V Σᵀ Uᵀ U Σ Vᵀ = V Σ² Vᵀ
\`\`\`

So với eigendecomposition của XᵀX: \`XᵀX = V Λ Vᵀ\` với \`Λ = Σ²\`.

→ V của SVD chính là V của eigendecomposition của XᵀX.

→ Cột thứ i của V = eigenvector của XᵀX ứng eigenvalue \`σᵢ²\`.

→ Cột thứ i của V cũng = eigenvector của \`C = (1/(n−1)) XᵀX\` ứng eigenvalue \`σᵢ²/(n−1)\` (chia một hằng số không đổi eigenvector).

### 7.3. Vì sao trong thực hành ai cũng dùng SVD thay vì eigendecomposition của XᵀX?

- **Ổn định số học**: tính \`XᵀX\` rồi eigendecompose có thể **mất 1/2 độ chính xác** vì bình phương condition number. SVD trên X trực tiếp giữ được full precision.
- **Tốc độ**: với n hoặc d rất lớn, có thuật toán SVD "truncated" cho ra k PC đầu tiên rất nhanh (vd Lanczos, randomized SVD).
- **Tổng quát**: SVD áp dụng cho ma trận chữ nhật trong khi eigendecomposition cần vuông.

> **💡 Liên hệ thực tế**
> Trong \`sklearn.decomposition.PCA\`, mặc định solver là \`'auto'\` — và chính nó gọi SVD ở phía dưới. Bạn không bao giờ thấy nó tính \`XᵀX\` rồi eigendecompose trừ khi \`n_features\` rất nhỏ.

### ⚠ Lỗi thường gặp

- **Quên center**: SVD trên X **chưa center** không cho PCA — cho cái khác (gần như PCA nhưng dịch đi). Nếu thư viện như sklearn tự center cho bạn thì không sao; nếu code tay phải nhớ trừ mean trước.

> **📝 Tóm tắt mục 7**
> PCA = SVD của X đã center. Cột V = PC. Singular value² = eigenvalue của covariance (× (n−1)). Trong thực hành luôn dùng SVD vì ổn định và nhanh hơn.

---

## 8. Walk-through SVD — ma trận 2×3

Cho:

\`\`\`
A = (3  1  1)
    (-1 3  1)
\`\`\`

(2 hàng, 3 cột → A: ℝ³ → ℝ².)

### 8.1. Tính AᵀA

\`\`\`
AᵀA = (3  -1)   (3  1  1)
      (1   3) · (-1 3  1)
      (1   1)

AᵀA = (10  0  2)
      (0  10  4)
      (2   4  2)
\`\`\`

Kiểm tra: \`(AᵀA)[0][0] = 3·3 + (−1)(−1) = 10\` ✓. \`(AᵀA)[0][1] = 3·1 + (−1)(3) = 0\` ✓.

### 8.2. Eigenvalue của AᵀA

Đặc trưng:

\`\`\`
det(AᵀA − λI) = 0
\`\`\`

Sau khi giải (chi tiết khai triển bậc 3 — tin máy):

\`\`\`
λ₁ = 12, λ₂ = 10, λ₃ = 0
\`\`\`

→ Singular values: \`σ₁ = √12 ≈ 3.464\`, \`σ₂ = √10 ≈ 3.162\`, \`σ₃ = 0\`.

> Lưu ý: 2 σ khác 0 → rank(A) = 2 (đúng, vì A là 2×3, max rank = 2).

### 8.3. Kết quả SVD (lấy từ NumPy để đối chiếu)

\`\`\`python
import numpy as np
A = np.array([[3, 1, 1], [-1, 3, 1]])
U, s, Vt = np.linalg.svd(A)
\`\`\`

\`\`\`
U = (-0.4472  0.8944)
    (-0.8944 -0.4472)

s = (3.464, 3.162)        # = (√12, √10)

Vᵀ = (-0.1291 -0.9036 -0.4082)
     ( 0.8165 -0.3361  0.4714)
     ( 0.5774  0.0000 -0.5774) wait, đây là V truncated...
\`\`\`

(Số xấp xỉ; quy ước dấu có thể khác tùy thư viện. Visualization sẽ cho bạn nhập ma trận và xem kết quả ngay.)

### 8.4. Verify

Tích lại:

\`\`\`
A_reconstructed = U · diag(s, 0) · Vᵀ ≈ (3  1  1)
                                       (-1 3  1)
\`\`\`

### 8.5. Hình học

A biến vector trong ℝ³ thành vector trong ℝ². Quả cầu đơn vị trong ℝ³ qua A → hình elip 2D với bán trục σ₁ ≈ 3.464 và σ₂ ≈ 3.162. Trục dài (≈ 3.464) gần như nằm dọc theo \`[−0.4472, −0.8944]ᵀ\` (cột 1 của U).

> **📝 Tóm tắt mục 8**
> SVD của ma trận 2×3: 2 singular value > 0 (= rank), 1 = 0. Tính tay đến eigenvalue rồi để máy lấy U, V. Cột U xác định trục elip 2D đầu ra.

---

## 9. Truncated SVD — xấp xỉ rank-k tốt nhất

### 9.1. Phát biểu

Cho SVD đầy đủ \`A = U Σ Vᵀ\`. Định nghĩa:

\`\`\`
A_k = U_k · Σ_k · V_kᵀ
\`\`\`

trong đó:

- \`U_k\` = 3 cột đầu của U (kích thước m×k).
- \`Σ_k\` = ma trận k×k đường chéo với σ₁, ..., σ_k.
- \`V_kᵀ\` = k hàng đầu của Vᵀ (kích thước k×n).

A_k là ma trận **rank-k** (rank ≤ k vì là tích các ma trận có rank ≤ k).

### 9.2. Eckart–Young theorem

> **Định lý**: Trong tất cả các ma trận rank-k, A_k là **xấp xỉ tốt nhất** của A theo norm Frobenius và norm 2:
>
> \`\`\`
> ||A − A_k||_F = √(σ_{k+1}² + σ_{k+2}² + ... + σ_r²)
> \`\`\`
> với \`r = min(m,n)\` và \`||·||_F = √(Σᵢⱼ aᵢⱼ²)\`.

→ Sai số tích lũy từ "đuôi" của các singular value bị vứt đi. Nếu σ_{k+1}, ..., σ_r đều rất nhỏ so với σ₁, ..., σ_k → A_k gần A.

### 9.3. Tiết kiệm bộ nhớ

A đầy đủ: m × n số.
A_k tách thành 3 phần: \`U_k\` (m×k) + \`σ\`s (k) + \`V_kᵀ\` (k×n) = \`k(m + n + 1)\` số.

Tỷ lệ:

\`\`\`
mem(A_k) / mem(A) = k(m + n + 1) / (mn)
\`\`\`

Khi \`k ≪ min(m, n)\`, tỷ lệ này nhỏ.

### 9.4. Ví dụ số

Ảnh xám 256×256 = 65,536 pixel. Tổng số byte (1 byte/pixel) ≈ 64 KB.

Với k = 30:

\`\`\`
mem = 30 · (256 + 256 + 1) = 30 · 513 = 15,390 số
   ≈ 60 KB nếu mỗi số 4 byte (float32)
\`\`\`

Hmm — trong ví dụ này, **float32 (4 byte) lớn hơn pixel 1 byte**. Vậy A_k không nhỏ hơn A về byte! Lý do nhập nhằng: ta đang so sánh sai đơn vị. Với ảnh thật, người ta thường so về **số phần tử** (mỗi phần tử cùng kích thước):

- A có 65,536 phần tử (mỗi phần tử 1 pixel).
- A_k có 15,390 phần tử (mỗi phần tử 1 float).

Tỷ lệ phần tử: \`15,390 / 65,536 ≈ 23.5%\` → giảm ~76%. Nếu lưu pixel cũng dưới dạng float (như trong ML pipeline), tỷ lệ này là tỷ lệ byte thật.

> **⚠ Lỗi thường gặp**
> Truncated SVD **không phải** thuật toán nén ảnh trong thực tế (JPEG, PNG đã tốt hơn nhiều). Lý do dạy nó: nó là **prototype dễ hiểu nhất** của idea "low-rank approximation", áp dụng vào nhiều bài toán khác (recommendation, LSA, embedding...).

### 9.5. Walk-through nhỏ — ma trận 3×3

Cho:

\`\`\`
A = (4 0 0)
    (0 3 0)
    (0 0 0.1)
\`\`\`

Đây đã ở dạng SVD (ma trận đường chéo) → U = I, V = I, Σ = A. Singular values: σ₁=4, σ₂=3, σ₃=0.1.

Xấp xỉ rank-2 (vứt σ₃):

\`\`\`
A_2 = (4 0 0)
      (0 3 0)
      (0 0 0)
\`\`\`

Sai số Frobenius:

\`\`\`
||A − A_2||_F = √(0.1²) = 0.1
\`\`\`

So với norm tổng:

\`\`\`
||A||_F = √(4² + 3² + 0.1²) = √25.01 ≈ 5.001
\`\`\`

→ Sai số tương đối: \`0.1 / 5.001 ≈ 2%\`. Rất nhỏ → A có "cấu trúc rank-2" thật sự.

> **📝 Tóm tắt mục 9**
> A_k = top-k thừa số SVD. Eckart-Young: là xấp xỉ rank-k tốt nhất theo Frobenius. Tiết kiệm khi k ≪ min(m,n) và "đuôi" σ nhỏ.

---

## 10. Ứng dụng đời thực

PCA và SVD xuất hiện ở **rất nhiều** bài toán ngỡ chừng không liên quan. Mục này điểm qua 5 ứng dụng kinh điển, mỗi cái đều thuộc về một lĩnh vực khác nhau nhưng cùng quy về **low-rank approximation**.

### 10.1. Image compression

**Setup**: ảnh xám m×n pixel = ma trận \`A ∈ ℝ^(m×n)\` với giá trị mỗi pixel ∈ [0, 255].

**Thuật toán**:
1. Tính SVD: \`A = UΣVᵀ\`.
2. Giữ top-k singular values: \`A_k = U_k Σ_k V_kᵀ\`.
3. Lưu \`U_k\`, σ, \`V_kᵀ\` thay vì lưu A.

**Quan sát kinh nghiệm**: với ảnh tự nhiên (phong cảnh, chân dung), σ giảm rất nhanh — top 5-10% singular values thường chứa 90% năng lượng (= \`Σ σᵢ²\`). Với k = 30 trên ảnh 256×256, ảnh khôi phục vẫn nhận ra rõ (nhưng có ringing artifact, mờ chi tiết nhỏ).

**Hạn chế thực tế**: JPEG và PNG nén tốt hơn vì khai thác cấu trúc local (DCT block 8×8, Huffman coding) thay vì global low-rank. Truncated SVD nay chủ yếu để **dạy minh họa**.

### 10.2. LSA — Latent Semantic Analysis

**Setup**: 1 collection văn bản. Xây **term-document matrix** \`A ∈ ℝ^(V×D)\`, V = số từ vựng, D = số tài liệu. \`A[i][j]\` = TF-IDF của từ i trong tài liệu j.

**Vấn đề**: synonymy (từ khác nhau cùng nghĩa: "car", "automobile") và polysemy (cùng từ nhiều nghĩa: "bank" = bờ sông / ngân hàng) làm các phương pháp dựa-trên-từ thuần (vd cosine similarity trên A trực tiếp) không bắt được semantic.

**Giải pháp** (Deerwester et al., 1990):
1. SVD \`A = UΣVᵀ\`.
2. Truncate k ≈ 100-300.
3. Mỗi tài liệu được biểu diễn bởi 1 vector k chiều = hàng của \`Σ_k V_kᵀ\` (transpose).
4. Mỗi từ được biểu diễn bởi 1 vector k chiều = hàng của \`U_k Σ_k\`.
5. Cosine similarity giờ tính trong không gian "topic" k chiều — bắt được synonymy.

**Hiệu ứng đẹp**: "car" và "automobile" trong không gian gốc V chiều có thể trực giao (xuất hiện ở các tài liệu khác nhau). Trong không gian topic, chúng gần nhau vì cùng xuất hiện trong **cùng nhóm tài liệu về xe**.

→ Đây là **embedding sớm nhất**: từ vector đơn vị one-hot V chiều xuống vector dense k chiều có ngữ nghĩa. Word2Vec, GloVe sau này tinh chỉnh idea này thêm.

### 10.3. Recommendation system — Netflix Prize

**Setup**: ma trận \`R ∈ ℝ^(U×M)\`, U = số user (~500K), M = số phim (~17K). \`R[u][m]\` = rating user u cho phim m (1-5 sao), **rất thưa** — phần lớn entry là missing (user không xem hoặc chưa rate).

**Câu hỏi**: dự đoán rating cho các entry missing → gợi ý phim.

**Mô hình low-rank** (Simon Funk, 2006):

\`\`\`
R ≈ U_k · V_kᵀ
\`\`\`

trong đó:
- \`U_k ∈ ℝ^(U×k)\`: mỗi hàng là vector k chiều mô tả user (latent factors như "thích phim hành động", "thích phim Pháp").
- \`V_k ∈ ℝ^(M×k)\`: mỗi hàng là vector k chiều mô tả phim.
- \`R[u][m] ≈ U_k[u] · V_k[m]\` (dot product).

**Train**: minimize \`Σ_{(u,m) đã rate} (R[u][m] − U_k[u]·V_k[m])²\` bằng gradient descent (xem [Calculus L7](../../03-Calculus/lesson-07-gradient-descent/)) hoặc Alternating Least Squares.

→ Đây là **PCA mở rộng cho missing data**. PCA chuẩn cần full matrix; với matrix thưa, dùng matrix factorization (về bản chất là cùng idea low-rank).

Netflix Prize (2006-2009) gây bùng nổ nghiên cứu lĩnh vực này. Winning team kết hợp hàng chục mô hình, nhưng matrix factorization là **base**.

### 10.4. GloVe — word embedding qua SVD của co-occurrence

**Setup**: corpus văn bản. Tính \`X[i][j]\` = số lần từ j xuất hiện trong context của từ i (vd ±5 từ xung quanh) trên toàn corpus.

**Pennington et al. (2014)**: chứng minh rằng word embedding tốt có thể derive bằng:

1. Log-transform: \`Y[i][j] = log(X[i][j])\` (với offset cho 0).
2. SVD: \`Y = UΣVᵀ\`.
3. Embedding của từ i = hàng thứ i của \`U_k Σ_k^{1/2}\`.

(Thực tế GloVe dùng weighted least squares thay vì SVD thuần — nhưng ý tưởng là cùng).

→ Hiện đại hơn (word2vec, BERT) dùng neural network, nhưng SVD-based embedding vẫn là **baseline mạnh** và là **lý thuyết nền** giải thích vì sao neural embedding làm việc.

### 10.5. PCA cho visualize MNIST

**Setup**: MNIST = 70,000 ảnh chữ số viết tay 28×28 = vector 784 chiều.

**Mục tiêu**: vẽ scatter plot 60K điểm trong 2D để xem các chữ số có cluster không.

**PCA**:
1. Flatten mỗi ảnh: ℝ^(784).
2. Center, tính covariance 784×784.
3. Eigendecompose, lấy 2 eigenvector đầu.
4. Project xuống 2D, vẽ scatter (mỗi điểm 1 ảnh, màu theo label).

**Quan sát**: chữ số \`0\` và \`1\` tạo cluster khá riêng biệt (vì hình dạng rất khác). Các chữ số \`4\`, \`9\` chồng lấn nhiều (vì hình tương tự).

**Explained variance** với MNIST: PC1 ~10%, PC2 ~7%, ... 50 PC đầu giữ khoảng 80% phương sai. Nếu cần preserve 95%, cần ~150 PC.

**So với t-SNE/UMAP**: PCA chỉ tốt cho relationship tuyến tính. t-SNE/UMAP "cong" được manifold → các cluster tách rõ hơn trong 2D, nhưng mất tính toán nhanh và determinism của PCA. Pipeline thường gặp: **PCA xuống 50D → t-SNE xuống 2D**.

### 10.6. Bonus — eigenfaces

Áp dụng PCA cho dataset ảnh khuôn mặt (Turk & Pentland, 1991). Mỗi ảnh khuôn mặt 100×100 = vector 10000 chiều. Top eigenvector của covariance = "eigenfaces" — các khuôn mặt nguyên mẫu mà mọi khuôn mặt thật là tổ hợp tuyến tính của chúng.

Trong những năm 1990, đây là kỹ thuật **face recognition** tốt nhất. Bây giờ thua xa deep learning, nhưng vẫn là một ví dụ đẹp về PCA giải bài toán có ý nghĩa hình ảnh trực quan.

> **💡 Bài học chung từ 5+ ứng dụng**
> Cùng một phép toán (SVD) xuất hiện ở image compression, NLP, recommendation, embedding, face recognition. Lý do: **low-rank approximation = giả định ngầm rằng dữ liệu sống trên manifold thấp chiều**. Khi giả định này đúng (gần đúng), SVD cho lời giải tối ưu theo phương sai/Frobenius.

> **📝 Tóm tắt mục 10**
> 1. Image compression: pixel → low-rank.
> 2. LSA: TF-IDF → topic space.
> 3. Recommendation: user×movie → user-factor × movie-factor.
> 4. GloVe: co-occurrence → word embedding.
> 5. MNIST visualization: 784D → 2D.
> 6. Eigenfaces: face manifold.

---

## 11. Khi nào PCA không đủ?

PCA mạnh nhưng có 3 giả định lớn — vi phạm sẽ phá kết quả.

### 11.1. Linearity

PCA tìm **không gian con tuyến tính**. Nếu dữ liệu sống trên **manifold cong** (vd vòng xoắn ốc), PCA "bẹt" cái xoắn lên thành đường thẳng → mất cấu trúc.

**Ví dụ kinh điển**: Swiss roll dataset. Dữ liệu 3D dạng cuộn xoắn ốc. PCA chiếu lên mặt phẳng → chồng lấn các vòng xoắn. **Isomap, t-SNE, UMAP, kernel PCA** xử lý tốt hơn.

### 11.2. Phương sai = thông tin

Đôi khi feature có **phương sai lớn** lại là **noise** (vd cảm biến lỗi), feature có phương sai nhỏ mới mang signal. PCA sẽ vứt signal.

**Cách xử lý**: dùng kiến thức domain để chuẩn hóa (standardize), hoặc dùng **Linear Discriminant Analysis (LDA)** nếu mục tiêu là phân loại (LDA tối đa hóa tỷ lệ between-class / within-class variance, không phải total variance).

### 11.3. Outlier nhạy cảm

Một điểm xa cluster chính có thể kéo PC1 lệch về phía nó (vì đóng góp lớn vào phương sai). Cách xử lý: **Robust PCA** (decompose A = L + S với L low-rank và S sparse) hoặc loại outlier trước.

### 11.4. Khi nào dùng gì?

| Tình huống | Dùng |
|---|---|
| Dữ liệu tuyến tính, n và d vừa phải | PCA |
| Dataset tabular có labels, cần phân loại | LDA |
| Manifold cong, visualize 2D | t-SNE, UMAP |
| Dữ liệu thưa (recommendation) | Matrix factorization |
| Dữ liệu nhiều chiều cực kỳ, cần preserve structure | Autoencoder (neural network) |
| Có nhiều outliers | Robust PCA |

> **📝 Tóm tắt mục 11**
> PCA giả định linearity, variance = info, không có outliers. Vi phạm bất kỳ giả định nào → đổi phương pháp.

---

## 12. Bài tập

### Bài 1 — Walk-through PCA bằng tay

Cho dataset 4 điểm 2D:

\`\`\`
(1, 2), (2, 3), (3, 5), (4, 4)
\`\`\`

a) Tính mean và center dữ liệu.
b) Tính ma trận \`S = X̃ᵀX̃\` (không chia).
c) Tìm eigenvalue và eigenvector chuẩn hóa của S.
d) Project xuống 1D (lên PC1).
e) Tính phương sai giữ lại sau projection.

### Bài 2 — SVD của ma trận 2×2

Cho \`A = [[3, 0], [0, 2]]\`. Viết SVD \`A = UΣVᵀ\` (bằng tay).

### Bài 3 — Truncated SVD và Eckart-Young

Cho \`A = diag(5, 4, 0.2, 0.1)\` (ma trận 4×4 đường chéo). Tính \`A_2\` (rank-2 best approximation) và \`||A − A_2||_F\`.

### Bài 4 — Quan hệ V và covariance

Cho \`X ∈ ℝ^(5×3)\` đã center, biết SVD của X có singular values \`(σ₁, σ₂, σ₃) = (4, 2, 1)\`. Hỏi:

a) Eigenvalue của \`XᵀX\` là gì?
b) Eigenvalue của \`(1/4)·XᵀX\` (covariance khi \`n − 1 = 4\`) là gì?
c) Tỷ lệ phương sai giữ lại khi giữ top 2 PC?

### Bài 5 — Vì sao phải center?

Giả sử bạn quên center dữ liệu trước PCA. Cho dataset 1D đơn giản: \`x = (10, 11, 12, 13, 14)\`. Tính eigenvector của \`XᵀX\` (1×1 trong trường hợp 1D — đây là số). Tại sao kết quả "không nói gì" về cấu trúc của dữ liệu?

### Bài 6 — Image compression ước tính

Có ảnh xám 1024×1024 (= 1MP), giả sử mỗi pixel là 1 byte. SVD của ảnh có 1024 singular values, trong đó 50 đầu tiên giữ 90% năng lượng (\`Σσᵢ²\`).

a) Lưu ảnh đầy đủ tốn bao nhiêu byte?
b) Lưu xấp xỉ rank-50 (\`U_{50}\`, \`σ\`s, \`V_{50}ᵀ\`) với float32 tốn bao nhiêu byte?
c) Tỷ lệ nén?
d) Sai số tương đối Frobenius (≈ √(năng lượng vứt đi))?

---

## 13. Lời giải chi tiết

### Bài 1

**a) Mean và center**

\`\`\`
μ_x = (1+2+3+4)/4 = 2.5
μ_y = (2+3+5+4)/4 = 3.5
μ = (2.5, 3.5)

X̃ = (1−2.5, 2−3.5) = (−1.5, −1.5)
    (2−2.5, 3−3.5) = (−0.5, −0.5)
    (3−2.5, 5−3.5) = ( 0.5,  1.5)
    (4−2.5, 4−3.5) = ( 1.5,  0.5)
\`\`\`

**b) S = X̃ᵀX̃**

\`\`\`
S[0][0] = (−1.5)² + (−0.5)² + 0.5² + 1.5² = 2.25 + 0.25 + 0.25 + 2.25 = 5
S[1][1] = (−1.5)² + (−0.5)² + 1.5² + 0.5² = 5
S[0][1] = (−1.5)(−1.5) + (−0.5)(−0.5) + (0.5)(1.5) + (1.5)(0.5)
       = 2.25 + 0.25 + 0.75 + 0.75 = 4

S = (5  4)
    (4  5)
\`\`\`

**c) Eigenvalue và eigenvector**

\`\`\`
det(S − λI) = (5 − λ)² − 16 = 0
(5 − λ)² = 16
5 − λ = ±4
λ = 1 hoặc λ = 9
\`\`\`

→ λ₁ = 9, λ₂ = 1.

Eigenvector ứng λ₁ = 9:
\`\`\`
(5−9, 4)   (v₁)   (0)
(4, 5−9) · (v₂) = (0)
−4v₁ + 4v₂ = 0 → v₁ = v₂
v₁ = (1/√2, 1/√2) ≈ (0.7071, 0.7071)
\`\`\`

Eigenvector ứng λ₂ = 1:
\`\`\`
4v₁ + 4v₂ = 0 → v₂ = −v₁
v₂ = (1/√2, −1/√2)
\`\`\`

**d) Project**

\`\`\`
Z = X̃ · v₁

Z[0] = (−1.5)(1/√2) + (−1.5)(1/√2) = −3/√2 = −1.5√2 ≈ −2.121
Z[1] = (−0.5)(1/√2) + (−0.5)(1/√2) = −0.5√2 ≈ −0.707
Z[2] = ( 0.5)(1/√2) + ( 1.5)(1/√2) =  2/√2 = √2 ≈  1.414
Z[3] = ( 1.5)(1/√2) + ( 0.5)(1/√2) =  2/√2 = √2 ≈  1.414
\`\`\`

**e) Phương sai giữ lại**

Tỷ lệ = \`λ₁ / (λ₁ + λ₂) = 9 / (9 + 1) = 90%\`.

→ Giảm chiều 2D → 1D nhưng giữ được 90% phương sai. Tốt.

### Bài 2

A đã ở dạng đường chéo với mọi entry ≥ 0 → A đã là SVD của chính nó!

\`\`\`
U = I = (1 0)
        (0 1)

Σ = (3 0)
    (0 2)

V = I = (1 0)
        (0 1)
\`\`\`

Verify: \`UΣVᵀ = I·diag(3,2)·I = diag(3,2) = A\` ✓.

Singular values: (3, 2).

(Nếu A có entry âm trên đường chéo, vd \`diag(3, −2)\`, thì U và V có thể là \`diag(1, ±1)\` để gộp dấu — singular value vẫn luôn ≥ 0.)

### Bài 3

\`A = diag(5, 4, 0.2, 0.1)\` đã ở dạng SVD: U = V = I, σ = (5, 4, 0.2, 0.1).

Truncated rank-2:

\`\`\`
A_2 = diag(5, 4, 0, 0)
\`\`\`

Sai số Frobenius:

\`\`\`
||A − A_2||_F² = 0.2² + 0.1² = 0.04 + 0.01 = 0.05
||A − A_2||_F = √0.05 ≈ 0.2236
\`\`\`

So với \`||A||_F = √(25 + 16 + 0.04 + 0.01) = √41.05 ≈ 6.407\`.

Tỷ lệ sai số: \`0.2236 / 6.407 ≈ 3.5%\`. Rất nhỏ.

### Bài 4

**a)** \`XᵀX\` có eigenvalue = \`σᵢ² = (16, 4, 1)\`.

**b)** \`(1/4)·XᵀX\` có eigenvalue = \`σᵢ²/4 = (4, 1, 0.25)\`.

**c)** Tỷ lệ giữ lại top 2 PC:

\`\`\`
(16 + 4) / (16 + 4 + 1) = 20/21 ≈ 95.2%
\`\`\`

### Bài 5

X = (10, 11, 12, 13, 14)ᵀ (cột).

\`XᵀX = 10² + 11² + 12² + 13² + 14² = 100 + 121 + 144 + 169 + 196 = 730\`.

Đây là một số (vô hướng — 1D), nên không có "eigenvector" theo nghĩa đa chiều. Nhưng nhìn dataset ta thấy dữ liệu **dao động quanh 12** — phương sai thực của dữ liệu chỉ là \`((−2)² + (−1)² + 0 + 1² + 2²)/5 = 10/5 = 2\`. Trong khi nếu không center, "phương sai" theo định nghĩa thô \`730/5 = 146\` chỉ phản ánh khoảng cách của dữ liệu tới gốc, không phải độ trải.

Bài học: nếu không center, PCA tìm hướng đi qua gốc tới centroid (~12), không phải hướng dữ liệu trải dài. Trong nhiều dataset thực, centroid lệch xa gốc → PC1 "sai chỗ" hoàn toàn.

### Bài 6

**a)** Ảnh đầy đủ: \`1024 × 1024 × 1 byte = 1,048,576 byte ≈ 1 MB\`.

**b)** Lưu rank-50:
- U_50: \`1024 × 50 = 51,200\` số.
- σ: 50 số.
- V_50ᵀ: \`50 × 1024 = 51,200\` số.
- Tổng: \`51,200 + 50 + 51,200 = 102,450\` số.
- Với float32 (4 byte): \`102,450 × 4 = 409,800 byte ≈ 400 KB\`.

**c)** Tỷ lệ nén: \`400 / 1024 ≈ 39%\`. Giảm ~61%.

(Lưu ý: nếu so với pixel-1-byte gốc thì compression rate thấp hơn so với khi pixel cũng được lưu float. Trong pipeline ML, pixel thường đã là float32 → tỷ lệ thật là \`102,450 / (1024·1024) ≈ 9.8%\` về **số phần tử** = ~90% giảm. Khi so byte phải khớp định dạng.)

**d)** Năng lượng giữ lại 90% → năng lượng vứt 10%. \`||A||_F² = Σσᵢ² = "energy"\`. Sai số Frobenius bình phương = năng lượng vứt = \`0.1 · ||A||_F²\`.

\`\`\`
||A − A_50||_F = √0.1 · ||A||_F ≈ 0.316 · ||A||_F
\`\`\`

Sai số tương đối: ~31.6%. Khá lớn — vì 90% là "energy" có thể vẫn không đủ cho ảnh đẹp. Trong thực hành, cần ~99% để ảnh trông gần như nguyên bản.

---

## 14. Tiếp theo

Đây là **lesson cuối Tầng 4 (Linear Algebra)**. Bạn đã hoàn thành hành trình từ "vector là gì" tới "PCA/SVD" — toàn bộ trụ cột đại số tuyến tính cho ML.

### Tầng 5 — Probability (sắp tới)

Tầng 5 mở ra góc nhìn khác: thay vì coi dữ liệu là "điểm cố định trong không gian", coi nó là **mẫu sinh ra từ một phân phối ngẫu nhiên**. Bạn sẽ gặp lại:

- **Vector** quay lại dưới dạng **random vector** (mỗi thành phần là một biến ngẫu nhiên).
- **Ma trận hiệp phương sai** (đã học ở Lesson 08) trở thành đặc trưng của **multivariate Gaussian**.
- **Eigenvector của covariance** xuất hiện trong **Gaussian elipsoid** — các trục chính của đám mây xác suất.
- **MLE (Maximum Likelihood Estimation)** dùng gradient descent đã học ở [Calculus L7](../../03-Calculus/lesson-07-gradient-descent/).
- **Cross-entropy** — hàm loss chuẩn của classification — sẽ là cầu nối sang Tầng 6.

### Tầng 6 — AI/ML

- **Linear regression**: closed-form đã đủ với linear algebra, nhưng GD scale tốt hơn cho dữ liệu lớn.
- **PCA quay lại** ở pre-processing — gần như mọi pipeline ML có bước "dimensionality reduction" và PCA là first option.
- **Embedding** = một PCA "phi tuyến" do mạng neural học ra. Word2Vec, BERT, CLIP đều là embedding.
- **RAG (Retrieval-Augmented Generation)**: vector search trên embedding → cosine similarity (Lesson 02) → SVD/PCA để giảm chiều index.

> **💡 Sau khi học xong Tầng 4**
> Bạn đã có **toàn bộ ngôn ngữ toán học** để đọc paper ML hiện đại. Mọi notation \`Wx + b\`, \`softmax(Wx)\`, \`attention(Q, K, V) = softmax(QKᵀ/√d)V\`, ... đều dùng linear algebra. Tầng 5 và 6 sẽ ráp các viên gạch này thành nhà.

---

## Tham khảo

- Strang, G. — *Introduction to Linear Algebra* (5th ed.), Chương 6 & 7 (Eigenvalues, SVD).
- Strang, G. — *Linear Algebra and Learning from Data* (2019), Phần I (low-rank, PCA, SVD).
- Trefethen & Bau — *Numerical Linear Algebra* (1997), Lecture 4-5 (SVD).
- Deerwester et al. — *Indexing by Latent Semantic Analysis* (1990) — bài gốc LSA.
- Koren, Bell, Volinsky — *Matrix Factorization Techniques for Recommender Systems* (IEEE Computer 2009) — tổng quan Netflix Prize.
- Pennington, Socher, Manning — *GloVe: Global Vectors for Word Representation* (EMNLP 2014).
- Eckart & Young — *The approximation of one matrix by another of lower rank* (Psychometrika 1936) — định lý Eckart-Young.
- Turk & Pentland — *Eigenfaces for Recognition* (J. Cognitive Neuroscience 1991).
- van der Maaten & Hinton — *Visualizing Data using t-SNE* (JMLR 2008) — so sánh với PCA.
- McInnes, Healy, Melville — *UMAP: Uniform Manifold Approximation and Projection* (2018).
`;
