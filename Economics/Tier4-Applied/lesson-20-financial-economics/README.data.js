// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier4-Applied/lesson-20-financial-economics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 20 — Financial Economics

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **rủi ro vs lợi suất** — quan hệ cơ bản của tài chính.
- Tính được **lợi suất kỳ vọng** và **độ lệch chuẩn** của một danh mục đầu tư.
- Hiểu **diversification** — vì sao "không bỏ tất cả trứng vào một giỏ" có cơ sở toán học.
- Áp dụng **CAPM (Capital Asset Pricing Model)** để định giá tài sản: $E(R) = R_f + \\beta \\cdot (E(R_m) - R_f)$.
- Hiểu **Efficient Market Hypothesis (EMH)** ở 3 dạng (yếu, trung bình, mạnh) và hệ quả thực tế.
- Phân biệt **bong bóng (bubble)** với giá hợp lý — và vì sao bong bóng tồn tại trong thực tế.

## Kiến thức tiền đề

- [Lesson 10](../../Tier2-Microeconomics/lesson-10-labor-capital/): PV, NPV, lãi kép.
- Lesson 17: behavioral economics.
- Toán: trung bình, phương sai, covariance.

## 1. Rủi ro và Lợi suất

### 1.1. Lợi suất kỳ vọng

$$E(R) = \\sum p_i \\cdot R_i$$

Walk-through: cổ phiếu X có 3 kịch bản:

| Kịch bản | Xác suất | Lợi suất |
|---------|---------|----------|
| Tốt | 0.3 | 30% |
| Bình thường | 0.5 | 10% |
| Xấu | 0.2 | -20% |

$E(R) = 0.3 \\times 30 + 0.5 \\times 10 + 0.2 \\times (-20) = 9 + 5 - 4 = 10\\%$.

### 1.2. Rủi ro = Độ lệch chuẩn

$$\\begin{aligned}
\\sigma^2 &= \\sum p_i \\cdot (R_i - E(R))^2 \\\\
\\sigma &= \\sqrt{\\sigma^2}
\\end{aligned}$$

$\\sigma^2 = 0.3 \\times (30-10)^2 + 0.5 \\times (10-10)^2 + 0.2 \\times (-20-10)^2 = 0.3 \\times 400 + 0 + 0.2 \\times 900 = 120 + 180 = 300$.
$\\sigma = \\sqrt{300} \\approx 17.3\\%$.

### 1.3. Trade-off

Quan sát thực tế: tài sản lợi suất kỳ vọng cao → rủi ro cao.

| Loại | $E(R)$ | $\\sigma$ |
|------|------|---|
| Trái phiếu chính phủ Mỹ | ~3-5% | ~3% |
| Trái phiếu DN | ~5-8% | ~7% |
| Cổ phiếu S&P 500 | ~10% | ~16% |
| Cổ phiếu công nghệ nhỏ | ~12-15% | ~25% |
| Bitcoin | ~50% (?) | ~80% |

Nhà đầu tư *risk-averse* sẽ đòi lợi suất cao hơn để bù rủi ro cao.

## 2. Diversification

### 2.1. Lợi ích toán học

Lợi suất danh mục $R_p = w_1 R_1 + w_2 R_2$ (với $w_1 + w_2 = 1$).

$E(R_p) = w_1 E(R_1) + w_2 E(R_2)$.

$\\sigma^2_p = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\rho\\, \\sigma_1 \\sigma_2$.

$\\rho$ = correlation giữa 2 tài sản. Nếu $\\rho < 1$ → $\\sigma_p < \\text{trung bình}$ của các $\\sigma$ riêng — diversification giảm rủi ro mà *không* giảm lợi suất kỳ vọng.

### 2.2. Walk-through

Cổ phiếu A: $E(R) = 10\\%, \\sigma = 20\\%$. Cổ phiếu B: $E(R) = 10\\%, \\sigma = 20\\%$. $\\rho = 0$ (không tương quan).

Chia đều 50/50: $E(R_p) = 10\\%$. $\\sigma^2_p = 0.25 \\times 400 + 0.25 \\times 400 + 0 = 200$. $\\sigma_p \\approx 14.1\\%$.

→ Lợi suất giữ nguyên, rủi ro giảm từ 20% → 14.1%. *Free lunch* của diversification.

Nếu $\\rho = 1$ (giống hệt): $\\sigma_p = 20\\%$, không có lợi.
Nếu $\\rho = -1$ (ngược chiều): $\\sigma_p = 0$, rủi ro biến mất hoàn toàn.

### 2.3. Hệ quả thực tế

- Danh mục đa dạng (vd S&P 500 — 500 cổ phiếu) → loại bỏ phần lớn rủi ro *idiosyncratic* (rủi ro riêng từng cổ phiếu).
- Còn lại **rủi ro hệ thống** (market risk) — không thể diversify (vd toàn thị trường rớt).

## 3. CAPM

### 3.1. Mô hình

Cốt lõi của định giá tài sản hiện đại:

$$E(R_i) = R_f + \\beta_i \\cdot (E(R_m) - R_f)$$

- $R_f$ = lợi suất tài sản phi rủi ro (trái phiếu chính phủ).
- $R_m$ = lợi suất thị trường.
- $\\beta_i$ = beta — đo độ nhạy của tài sản $i$ với thị trường.

### 3.2. Beta

$$\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}$$

- $\\beta > 1$: nhạy hơn thị trường (tech stocks, vd Tesla $\\beta \\approx 2$).
- $\\beta = 1$: đi cùng thị trường.
- $\\beta < 1$: ít nhạy (utilities, tiêu dùng cơ bản, vd P&G $\\beta \\approx 0.5$).
- $\\beta = 0$: phi rủi ro.
- $\\beta < 0$: ngược thị trường (vàng đôi khi).

### 3.3. Walk-through

$R_f = 4\\%, E(R_m) = 12\\%$. Cổ phiếu có $\\beta = 1.5$:

$$E(R) = 4 + 1.5 \\times (12 - 4) = 4 + 12 = 16\\%$$

Nhà đầu tư đòi lợi suất 16% để gánh rủi ro $\\beta = 1.5$. Nếu thực tế chỉ 14% → không đáng mua. Nếu 18% → có lợi (mua, kéo giá lên → lợi suất giảm về 16%).

## 4. Efficient Market Hypothesis (EMH)

### 4.1. Định nghĩa

**EMH** = giá tài sản phản ánh *tất cả thông tin sẵn có*. → Không thể "đánh bại thị trường" liên tục bằng cách dùng thông tin công khai.

### 4.2. 3 dạng

1. **Yếu (weak-form)**: giá phản ánh dữ liệu giá quá khứ → *technical analysis* (đoán giá từ chart) không hoạt động.
2. **Trung bình (semi-strong)**: giá phản ánh mọi thông tin công khai → *fundamental analysis* (P/E, doanh thu) không cho lợi suất bất thường.
3. **Mạnh (strong)**: giá phản ánh cả thông tin insider → kể cả insider trading không lợi.

### 4.3. Bằng chứng

- Weak: ủng hộ mạnh — random walk được thấy ở giá.
- Semi-strong: ủng hộ vừa — phần lớn quỹ chủ động *thua* thị trường sau phí. Warren Buffett là một trong số ít exception (và ông gặp may + giỏi).
- Strong: bác — insider có lợi (vd vụ Martha Stewart).

### 4.4. Hệ quả thực tế

- **Đầu tư passive** (index fund) thường tốt hơn active sau phí.
- Diversification + cost minimization > stock picking với hầu hết nhà đầu tư.

### 4.5. Anomalies

Một số "lỗ hổng" được phát hiện:
- **Momentum**: cổ phiếu tăng gần đây tiếp tục tăng.
- **Value premium**: cổ phiếu P/E thấp (value) outperform.
- **Size premium**: small cap outperform.

→ Mô hình mở rộng *Fama-French 3-factor* / *5-factor* để giải thích.

## 5. Bubbles

### 5.1. Khi EMH thất bại

Bubble = giá *vượt xa* giá trị nội tại + tiếp tục tăng do *kỳ vọng giá tiếp tăng* → cuối cùng sụp đổ.

Lịch sử nổi tiếng:
- **Tulip mania** Hà Lan 1637.
- **South Sea bubble** 1720.
- **Dotcom bubble** 1999-2000.
- **US housing bubble** 2006-2008.
- **Crypto** 2017, 2021.

### 5.2. Vì sao bubbles tồn tại?

Vi phạm EMH thông qua:
- **Limits to arbitrage**: short stock đắt (cost cao, không có ngày hết hạn).
- **Behavioral biases**: herding, overconfidence, recency bias.
- **Coordination**: ai cũng biết bubble, nhưng vẫn mua vì *tin rằng người khác cũng sẽ mua*.

Keynes: *"thị trường có thể vô lý lâu hơn bạn có thể giữ solvent."*

## 6. Bài tập

### Bài 1 — Lợi suất + rủi ro

Cổ phiếu Y: 3 kịch bản (0.4 tốt = 40%, 0.4 bình = 5%, 0.2 xấu = -30%). Tính $E(R), \\sigma$.

### Bài 2 — Diversification

A: $\\sigma = 30\\%$. B: $\\sigma = 20\\%$. $\\rho = 0.3$. Danh mục 60% A + 40% B. Tính $\\sigma_p$.

### Bài 3 — CAPM

$R_f = 3\\%, E(R_m) = 10\\%$. Cổ phiếu có $\\beta = 0.8$. $E(R)$ theo CAPM?

Nếu giá hiện tại cho lợi suất kỳ vọng 12% (cao hơn CAPM dự đoán) → bạn nên làm gì?

### Bài 4 — EMH

Bạn đọc tin "Apple công bố doanh thu Q1 vượt kỳ vọng" trên báo. Có nên mua APPL ngay?

## 7. Lời giải

### Lời giải Bài 1

$E(R) = 0.4 \\times 40 + 0.4 \\times 5 + 0.2 \\times (-30) = 16 + 2 - 6 = 12\\%$.

$\\sigma^2 = 0.4 \\times (40-12)^2 + 0.4 \\times (5-12)^2 + 0.2 \\times (-30-12)^2 = 0.4 \\times 784 + 0.4 \\times 49 + 0.2 \\times 1764 = 313.6 + 19.6 + 352.8 = 686$.

$\\sigma \\approx 26.2\\%$.

### Lời giải Bài 2

$\\sigma^2_p = 0.36 \\times 900 + 0.16 \\times 400 + 2 \\times 0.6 \\times 0.4 \\times 0.3 \\times 30 \\times 20 = 324 + 64 + 86.4 = 474.4$.

$\\sigma_p \\approx 21.8\\%$ — thấp hơn cả tài sản B (20%)? Kiểm tra: $21.8 > 20$ thực ra cao hơn B chút, nhưng thấp hơn A nhiều (30%). Trung bình có trọng $0.6 \\times 30 + 0.4 \\times 20 = 26\\%$ — danh mục cho $21.8\\%$, thấp hơn → diversification có lợi.

### Lời giải Bài 3

$E(R) = 3 + 0.8 \\times (10 - 3) = 3 + 5.6 = 8.6\\%$.

Nếu thực tế 12% > 8.6% → **mua** (lợi suất cao hơn CAPM mong đợi, "undervalued"). Cầu tăng → giá tăng → lợi suất tương lai giảm về 8.6%.

### Lời giải Bài 4

Theo EMH (semi-strong): tin tức công khai đã được phản ánh vào giá *ngay lập tức*. Đến lúc bạn đọc báo, giá APPL đã điều chỉnh. Mua không cho lợi suất bất thường.

Trừ khi:
- Bạn có lý do tin EMH yếu (thị trường chậm phản ứng).
- Bạn không vì mua nhanh mà vì *long-term hold* (lý do khác).

## 8. Liên kết

- **Bài trước**: [Lesson 19 — Econometrics](../lesson-19-econometrics-intro/).
- **Hoàn thành Tier 4 + cả lộ trình Economics.** Quay về [Economics roadmap](../../README.md) để xem tổng thể.
- **Minh họa**: [visualization.html](./visualization.html) — CAPM, diversification, mô phỏng Random Walk + EMH.
`;
