# AI-ML — Học máy & Trí tuệ nhân tạo ứng dụng

Lĩnh vực này **ráp toán nền** (`Math`, `Vectors`, `Statistics`) thành các thuật toán ML thật, từ linear regression cổ điển tới RAG và CLIP multimodal hiện đại.

Trước đây nằm trong `Vectors/06-AI-ML` (Tầng 6 của lộ trình toán cho ML). Tách thành lĩnh vực riêng để: (a) dễ tìm hơn, (b) mở rộng được — nếu sau này có lĩnh vực `MachineLearning/` đầy đủ hơn thì `AI-ML/` đóng vai trò "ứng dụng nhanh", còn `MachineLearning/` đào sâu phương pháp.

## Mục tiêu tổng quát

- Hiểu pipeline ML end-to-end: data → feature → model → loss → train → evaluate.
- Implement được linear regression, logistic regression, neural network 1-hidden-layer bằng tay (không framework).
- Hiểu word embedding: vì sao `king − man + woman ≈ queen` có nghĩa.
- Build được RAG pipeline cơ bản (vector DB + retrieve + generate).
- Hiểu CLIP và multimodal alignment.

## Lộ trình 8 bài

| # | Bài | Khái niệm chính |
|---|-----|-----------------|
| 01 | [Pipeline ML end-to-end](./lesson-01-ml-pipeline/) | Data → feature → model → loss → train → evaluate; train/val/test split; bias-variance |
| 02 | [Linear regression](./lesson-02-linear-regression/) | y = Xw + b, MSE, closed-form vs gradient descent, R² |
| 03 | [Logistic regression](./lesson-03-logistic-regression/) | Sigmoid, binary classification, cross-entropy loss |
| 04 | [Neural network](./lesson-04-neural-network/) | 1-hidden-layer, forward + backprop bằng tay (chain rule) |
| 05 | [Text vectorization](./lesson-05-text-vectorization/) | One-hot, Bag-of-Words, TF-IDF |
| 06 | [Word embeddings](./lesson-06-word-embeddings/) | Word2Vec (skip-gram, CBOW), GloVe, vector arithmetic |
| 07 | [Vector DB + RAG](./lesson-07-vector-db-rag/) | HNSW, FAISS, retrieve-augment-generate pipeline |
| 08 | [CLIP multimodal](./lesson-08-clip-multimodal/) | Ảnh + text cùng không gian, contrastive learning |

## Kiến thức tiền đề

- **Bắt buộc**: [`Vectors/04-LinearAlgebra`](../Vectors/04-LinearAlgebra/) (vector, matrix, dot product), [`Vectors/03-Calculus`](../Vectors/03-Calculus/) (đạo hàm, chain rule), [`Vectors/05-Probability`](../Vectors/05-Probability/) (MLE, cross-entropy).
- **Khuyến nghị**: [`Statistics/02-Inferential`](../Statistics/02-Inferential/) (hypothesis test cho model evaluation), [`Math/04-Calculus-1var`](../Math/04-Calculus-1var/) (đạo hàm cơ bản).
- **Bổ trợ**: [`DataFoundations/`](../DataFoundations/), [`Algorithms/`](../Algorithms/) (complexity cho gradient descent).

## Liên kết chéo

| Bài | Link sang |
|-----|-----------|
| L02 (linear regression) | [`Statistics/01-Descriptive/lesson-05-bivariate-correlation`](../Statistics/01-Descriptive/lesson-05-bivariate-correlation/), [`Statistics/02-Inferential/lesson-03-hypothesis-testing-1sample`](../Statistics/02-Inferential/lesson-03-hypothesis-testing-1sample/) |
| L03 (logistic) | [`Vectors/05-Probability/lesson-07-mle`](../Vectors/05-Probability/lesson-07-mle/), [`Vectors/05-Probability/lesson-08-cross-entropy-kl`](../Vectors/05-Probability/lesson-08-cross-entropy-kl/) |
| L04 (neural net) | [`Vectors/03-Calculus`](../Vectors/03-Calculus/) (chain rule), [`Vectors/04-LinearAlgebra`](../Vectors/04-LinearAlgebra/) |
| L07 (vector DB) | [`Databases/`](../Databases/) (storage engine, indexing) |

## Cách học hiệu quả

1. **Mở `visualization.html`** từng bài — chơi với pipeline animator, decision boundary, backprop step-by-step.
2. **Đọc README** để hiểu công thức và walk-through bằng tay.
3. **Làm bài tập** cuối README.

Bắt đầu: [Lesson 01 — Pipeline ML end-to-end](./lesson-01-ml-pipeline/).
