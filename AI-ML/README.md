# AI-ML — Học máy & Trí tuệ nhân tạo

Lĩnh vực này gộp **toolbox đầy đủ của ML** — từ pipeline cơ bản qua classical methods (tree/SVM/boosting), unsupervised learning, deep learning (CNN/RNN/Transformer) tới ứng dụng NLP & multimodal (embeddings, RAG, CLIP).

Trước đây là 8 bài flat (focus applied/cookbook). Sau khi gộp với "MachineLearning" plan, đã restructure thành **5 tier × 20 bài** để cover cả "applied" lẫn "methods deep".

## Triết lý

- **Pipeline trước, model sau**: hiểu ML project structure trước khi đi sâu thuật toán.
- **Classical chưa lỗi thời**: tree-based và SVM vẫn dominate tabular data; chỉ deep learning thắng ở image/text/audio.
- **Methods + Apps cùng track**: học method (T2-T4) song song với ứng dụng (T5).
- **Định lượng**: ≥ 4 ví dụ số mỗi định nghĩa; walk-through đầy đủ (theo CLAUDE.md).

## Lộ trình 5 tier × 4 bài

### Tier 1 — Foundations (4 bài)

| # | Bài | Nội dung |
|---|-----|----------|
| 01 | [Pipeline ML end-to-end](./01-Foundations/lesson-01-ml-pipeline/) | Data → feature → model → loss → train → evaluate; train/val/test split |
| 02 | [Linear regression](./01-Foundations/lesson-02-linear-regression/) | y = Xw + b, MSE; closed-form (normal equation) vs gradient descent; ridge/lasso |
| 03 | [Logistic regression](./01-Foundations/lesson-03-logistic-regression/) | Sigmoid, cross-entropy; multi-class softmax; calibration, ROC/AUC |
| 04 | [Bias-variance & regularization](./01-Foundations/lesson-04-bias-variance-regularization/) | Bias-variance trade-off; L1/L2, dropout, early stopping; cross-validation |

### Tier 2 — Classical Methods (4 bài)

| # | Bài | Nội dung |
|---|-----|----------|
| 01 | [KNN & Decision tree](./02-ClassicalMethods/lesson-01-knn-decision-tree/) | Distance metrics, curse of dim; entropy, info gain, CART, pruning |
| 02 | [Random forest & bagging](./02-ClassicalMethods/lesson-02-random-forest/) | Bagging, OOB error, feature importance; bias-variance interpretation |
| 03 | [SVM](./02-ClassicalMethods/lesson-03-svm/) | Margin maximization, kernel trick (RBF/poly), soft margin C |
| 04 | [Gradient boosting](./02-ClassicalMethods/lesson-04-gradient-boosting/) | AdaBoost → GBM → XGBoost/LightGBM/CatBoost brief |

### Tier 3 — Unsupervised Learning (4 bài)

| # | Bài | Nội dung |
|---|-----|----------|
| 01 | [K-means & hierarchical](./03-Unsupervised/lesson-01-kmeans-hierarchical/) | Lloyd's algo, elbow/silhouette; dendrogram, agglomerative |
| 02 | [DBSCAN & density](./03-Unsupervised/lesson-02-dbscan-density/) | Density-reachable, eps/minPts; non-convex; outlier detection |
| 03 | [PCA & SVD](./03-Unsupervised/lesson-03-pca-svd/) | Eigendecomposition, variance explained, scree plot — bridge `Vectors/04` |
| 04 | [t-SNE & UMAP](./03-Unsupervised/lesson-04-tsne-umap/) | Perplexity, KL divergence, UMAP advantages, pitfalls |

### Tier 4 — Deep Learning (4 bài)

| # | Bài | Nội dung |
|---|-----|----------|
| 01 | [Neural network](./04-DeepLearning/lesson-01-neural-network/) | MLP, forward + backprop; optimizers (SGD/Adam), batchnorm, init |
| 02 | [CNN](./04-DeepLearning/lesson-02-cnn/) | Convolution, pooling, receptive field; LeNet → AlexNet → ResNet |
| 03 | [RNN / LSTM](./04-DeepLearning/lesson-03-rnn-lstm/) | RNN, vanishing gradient, LSTM/GRU gates; seq2seq |
| 04 | [Transformer & attention](./04-DeepLearning/lesson-04-transformer-attention/) | Self-attention Q/K/V, multi-head, positional encoding |

### Tier 5 — NLP & Multimodal Applications (4 bài)

| # | Bài | Nội dung |
|---|-----|----------|
| 01 | [Text vectorization](./05-NLP-Applied/lesson-01-text-vectorization/) | One-hot, Bag-of-Words, TF-IDF |
| 02 | [Word embeddings](./05-NLP-Applied/lesson-02-word-embeddings/) | Word2Vec (skip-gram, CBOW), GloVe, vector arithmetic |
| 03 | [Vector DB + RAG](./05-NLP-Applied/lesson-03-vector-db-rag/) | HNSW, FAISS, retrieve-augment-generate pipeline |
| 04 | [CLIP multimodal](./05-NLP-Applied/lesson-04-clip-multimodal/) | Ảnh + text cùng không gian, contrastive learning |

## Kiến thức tiền đề

- **Bắt buộc**: [`Vectors/04-LinearAlgebra`](../Vectors/04-LinearAlgebra/), [`Vectors/03-Calculus`](../Vectors/03-Calculus/), [`Vectors/05-Probability`](../Vectors/05-Probability/), [`Math/01-Arithmetic-Algebra`](../Math/01-Arithmetic-Algebra/).
- **Khuyến nghị**: [`Statistics/01-Descriptive`](../Statistics/01-Descriptive/), [`Statistics/02-Inferential`](../Statistics/02-Inferential/) (hypothesis test cho model evaluation, A/B test).
- **Bổ trợ**: [`DataStructures/`](../DataStructures/) (tree, heap cho boosting), [`Algorithms/`](../Algorithms/) (complexity).

## Liên kết chéo

| Bài | Link sang |
|-----|-----------|
| T1-L02 | [`Statistics/01-Descriptive/lesson-05-bivariate-correlation`](../Statistics/01-Descriptive/lesson-05-bivariate-correlation/) |
| T1-L03 | [`Vectors/05-Probability/lesson-07-mle`](../Vectors/05-Probability/lesson-07-mle/), [`Vectors/05-Probability/lesson-08-cross-entropy-kl`](../Vectors/05-Probability/lesson-08-cross-entropy-kl/) |
| T2-L02 (random forest) | [`DataStructures/`](../DataStructures/) (tree) |
| T3-L03 (PCA) | [`Vectors/04-LinearAlgebra`](../Vectors/04-LinearAlgebra/) (eigenvector, SVD) |
| T4-L01 (NN training) | [`Vectors/03-Calculus`](../Vectors/03-Calculus/) (chain rule, gradient) |
| T5-L03 (vector DB) | [`Databases/`](../Databases/) (indexing, storage) |
| Methods | [`Statistics/02-Inferential`](../Statistics/02-Inferential/) (model evaluation, statistical tests) |

## Cách học hiệu quả

1. **Mở `visualization.html`** từng bài — chơi với pipeline animator, decision boundary, gradient descent, attention heatmap.
2. **Đọc README** để hiểu công thức + walk-through bằng tay.
3. **Làm bài tập** cuối README.

Bắt đầu: [Tier 1 — Foundations](./01-Foundations/index.html).
