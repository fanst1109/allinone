# Tầng 6 — AI/ML (Ứng dụng)

Tầng cuối: ráp tất cả nền toán Tầng 1-5 thành các thuật toán ML thật. Tầng này dạy bạn:
- **Linear & logistic regression** — ML cổ điển, nền cho mọi model phức tạp hơn.
- **Neural network** — forward + backprop, ráp chain rule (Tầng 3) với linear algebra (Tầng 4).
- **Word & sentence embedding** — Word2Vec, sentence-transformers, OpenAI embedding API.
- **Vector database + RAG** — HNSW, FAISS, retrieve-augment-generate pipeline.
- **CLIP** — multimodal embedding (ảnh + text cùng không gian).

## Mục tiêu tổng quát

- Hiểu pipeline ML end-to-end: data → feature → model → loss → train → evaluate.
- Implement được linear regression, logistic regression, neural network 1-hidden-layer.
- Hiểu word embedding: vì sao `king - man + woman ≈ queen` có nghĩa.
- Build được RAG pipeline cơ bản.
- Hiểu CLIP và multimodal alignment.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-ml-pipeline/) | Pipeline ML end-to-end | Data → feature → model → loss → train → evaluate |
| [Lesson 02](./lesson-02-linear-regression/) | Linear regression | y = Xw + b, MSE, closed-form vs gradient descent |
| [Lesson 03](./lesson-03-logistic-regression/) | Logistic regression | Sigmoid, binary classification, cross-entropy |
| [Lesson 04](./lesson-04-neural-network/) | Neural network 1-hidden-layer | Forward + backprop bằng tay |
| [Lesson 05](./lesson-05-text-vectorization/) | Text vectorization cổ điển | One-hot, BoW, TF-IDF |
| [Lesson 06](./lesson-06-word-embeddings/) | Word embedding | Word2Vec (skip-gram, CBOW), GloVe, `king - man + woman ≈ queen` |
| [Lesson 07](./lesson-07-vector-db-rag/) | Vector DB + RAG | HNSW, FAISS, RAG pipeline |
| [Lesson 08](./lesson-08-clip-multimodal/) | CLIP multimodal | Ảnh + text cùng không gian, contrastive learning |

## Trang chính của tầng

[`index.html`](./index.html) — danh sách card cho 8 bài.

## Kiến thức tiền đề

- Tất cả 5 tầng trước. Đặc biệt:
  - [Tầng 4 Linear Algebra](../04-LinearAlgebra/): vector, dot product, cosine similarity, ma trận.
  - [Tầng 3 Calculus](../03-Calculus/): gradient, chain rule, gradient descent.
  - [Tầng 5 Probability](../05-Probability/): cross-entropy, MLE.

## Sau khi xong tầng này

Bạn đã hoàn thành lộ trình **Vectors**. Bước tiếp theo:
- Đọc paper gốc của các kỹ thuật trong tầng này (Word2Vec 2013, BERT 2018, GPT 2018, CLIP 2021).
- Implement lại bằng PyTorch/TensorFlow.
- Áp dụng vào project cá nhân.
