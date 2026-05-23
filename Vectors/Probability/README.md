# Tầng 5 — Probability (Xác suất & Thống kê)

ML không có xác suất là không có gì. Tầng này dạy bạn:
- **Xác suất cơ bản** và **định lý Bayes** — nền cho Bayesian inference.
- **Biến ngẫu nhiên** (rời rạc và liên tục) và **phân phối** (Bernoulli, Binomial, Gaussian).
- **Kỳ vọng, phương sai, hiệp phương sai** — đo "trung bình" và "phân tán".
- **MLE (Maximum Likelihood Estimation)** — phương pháp train chuẩn cho mọi model.
- **Cross-entropy và KL divergence** — loss function của classification và LLM.

## Mục tiêu tổng quát

- Hiểu xác suất ở 2 góc: cổ điển (đếm) và Bayesian (cập nhật niềm tin).
- Phân biệt được biến rời rạc vs liên tục, PDF vs PMF.
- Tính được kỳ vọng, phương sai cho cả phân phối rời rạc và liên tục.
- Dẫn được loss cross-entropy từ MLE.
- Hiểu KL divergence là "khoảng cách" giữa 2 phân phối.

## Lộ trình 8 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-probability-basics/) | Xác suất cơ bản | Không gian mẫu, biến cố, các tiên đề, đếm |
| [Lesson 02](./lesson-02-conditional-bayes/) | Xác suất có điều kiện + Bayes | P(A\|B), Bayes' theorem, ứng dụng |
| [Lesson 03](./lesson-03-discrete-rv/) | Biến ngẫu nhiên rời rạc | PMF, Bernoulli, Binomial, Poisson |
| [Lesson 04](./lesson-04-continuous-rv/) | Biến ngẫu nhiên liên tục | PDF, CDF, đổi biến |
| [Lesson 05](./lesson-05-normal-distribution/) | Phân phối chuẩn (Gaussian) | μ, σ², định lý giới hạn trung tâm (CLT) |
| [Lesson 06](./lesson-06-expectation-variance/) | Kỳ vọng, phương sai, covariance | E[X], Var[X], Cov, correlation |
| [Lesson 07](./lesson-07-mle/) | Maximum Likelihood Estimation | MLE = argmax log-likelihood |
| [Lesson 08](./lesson-08-cross-entropy-kl/) | Cross-entropy + KL divergence | Loss của classification và LLM |

## Trang chính của tầng

[`index.html`](./index.html) — danh sách card cho 8 bài.

## Kiến thức tiền đề

- [Tầng 3 Calculus](../03-Calculus/): tích phân (Lesson 08) — cần cho PDF.
- [Tầng 4 Linear Algebra](../04-LinearAlgebra/): vector và ma trận — cần cho covariance matrix.

## Sau khi xong tầng này

Sang **Tầng 6 — AI/ML** để ráp tất cả nền toán thành các thuật toán ML thật: linear regression, neural network, embedding, RAG, CLIP.
