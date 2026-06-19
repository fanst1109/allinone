# Statistics — Thống kê

Thống kê là **khoa học rút ra kết luận từ dữ liệu**: mô tả tập dữ liệu hiện có, suy luận về tổng thể từ một mẫu, và kiểm định xem một hiệu ứng có thực hay chỉ do ngẫu nhiên.

Lĩnh vực này bổ trợ — không trùng — với [`Vectors/05-Probability`](../Vectors/05-Probability/) (lý thuyết xác suất) và [`AI-ML`](../AI-ML/) (hồi quy & ML). Probability dạy *"nếu tung xúc xắc công bằng, xác suất ra mặt 6 là 1/6"* — đi từ mô hình ra dữ liệu. Thống kê đi ngược lại: *"tôi tung 1000 lần ra 240 mặt 6, xúc xắc có công bằng không?"* — đi từ dữ liệu ra mô hình.

## Triết lý

- **Mô tả → suy luận → ra quyết định**: ba bước tự nhiên của bất kỳ phân tích dữ liệu nào.
- **Lượng hóa bằng số thật**: mỗi định nghĩa kèm ≥ 4 ví dụ số (tham chiếu `CLAUDE.md`).
- **Trực giác trước công thức**: hiểu *vì sao* trước khi áp công thức (vd CLT, p-value).
- **Tránh hiểu sai phổ biến**: p-value không phải xác suất H₀ đúng; correlation ≠ causation; "có ý nghĩa thống kê" ≠ "có ý nghĩa thực tiễn".
- **Mở rộng từ probability**: sampling distribution, CLT, MLE đã có ở `Vectors/05` — ở đây dùng làm công cụ.

## Lộ trình 3 tầng × 18 bài

### Tầng 1 — Mô tả & khám phá dữ liệu (Descriptive Statistics) — 5 bài

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Loại dữ liệu & tổng quan](./01-Descriptive/lesson-01-data-types-overview/) | Population vs sample; nominal/ordinal/interval/ratio; vai trò của thống kê |
| 02 | [Đo lường trung tâm](./01-Descriptive/lesson-02-central-tendency/) | Mean, median, mode — khi nào dùng cái nào, ảnh hưởng outlier |
| 03 | [Đo lường phân tán](./01-Descriptive/lesson-03-dispersion/) | Range, variance, SD, IQR, MAD, CV |
| 04 | [Trực quan hoá phân phối](./01-Descriptive/lesson-04-distribution-viz/) | Histogram, boxplot, violin, Q-Q plot, ECDF |
| 05 | [Mối quan hệ 2 biến](./01-Descriptive/lesson-05-bivariate-correlation/) | Covariance, Pearson, Spearman, Kendall, Anscombe |

### Tầng 2 — Suy luận thống kê (Inferential) — 10 bài

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Sampling & CLT](./02-Inferential/lesson-01-sampling-clt/) | Sampling distribution, standard error, Định lý giới hạn trung tâm |
| 02 | [Khoảng tin cậy](./02-Inferential/lesson-02-confidence-interval/) | CI 95%, t vs z, bootstrap CI |
| 03 | [Kiểm định 1 mẫu](./02-Inferential/lesson-03-hypothesis-testing-1sample/) | H₀/H₁, α, β, z-test, t-test, p-value |
| 04 | [Kiểm định 2 mẫu](./02-Inferential/lesson-04-two-sample-tests/) | Independent t-test, paired t-test, Welch |
| 05 | [ANOVA & Chi-square](./02-Inferential/lesson-05-anova-chisquare/) | One-way ANOVA, χ² goodness-of-fit, independence |
| 06 | [P-value, power, effect size](./02-Inferential/lesson-06-pvalue-power-effect/) | Đọc đúng p-value, power, sample size, Cohen's d, multiple testing |
| 07 | [Resampling](./02-Inferential/lesson-07-resampling/) | Bootstrap, permutation test — non-parametric inference |
| 08 | [Linear Regression](./02-Inferential/lesson-08-linear-regression/) | OLS, least squares, R², residual, giả định, kiểm định hệ số |
| 09 | [Multiple Regression](./02-Inferential/lesson-09-multiple-regression/) | Nhiều biến, β=(XᵀX)⁻¹Xᵀy, adjusted R², đa cộng tuyến, dummy, overfitting |
| 10 | [Logistic Regression](./02-Inferential/lesson-10-logistic-regression/) | Phân loại nhị phân, sigmoid, odds/log-odds, decision boundary, confusion matrix |

### Tầng 3 — Nâng cao & ứng dụng (Advanced) — 3 bài

| # | Bài | Chủ đề |
|---|------|--------|
| 01 | [Bayesian statistics](./03-Advanced/lesson-01-bayesian-stats/) | Prior, likelihood, posterior, conjugate (Beta–Binomial), Bayes Factor |
| 02 | [Suy luận nhân quả](./03-Advanced/lesson-02-causal-inference/) | Correlation ≠ causation, confounder, Simpson's paradox, RCT, DAG |
| 03 | [Time series cơ bản](./03-Advanced/lesson-03-time-series-basics/) | Trend, seasonality, stationarity, ACF/PACF, AR/MA/ARIMA intro |

## Kiến thức tiền đề

- **Bắt buộc**: [`Math/01-Arithmetic-Algebra`](../Math/01-Arithmetic-Algebra/) (đại số, hàm số), [`Vectors/05-Probability`](../Vectors/05-Probability/) (RV, distribution, expectation, MLE).
- **Khuyến nghị**: [`Vectors/03-Calculus`](../Vectors/03-Calculus/) (tích phân — cho liên tục), [`Math/06-Advanced`](../Math/06-Advanced/) (giới hạn — cho CLT).
- **Không cần**: lập trình. Code chỉ là minh hoạ phụ; visualization HTML là kênh chính.

## Liên kết chéo

- `Vectors/05-Probability` → cung cấp lý thuyết RV, normal, MLE mà Tầng 2 sẽ dùng.
- `AI-ML/01-Foundations/lesson-02-linear-regression` → bài này dùng nhiều khái niệm từ Tầng 1 & 2 (residual, hypothesis test, R²).
- `Economics/` → econometrics dùng heavy hypothesis testing & causal inference.
- `Biology/02-Genetics-Evolution` → di truyền quần thể (Hardy–Weinberg) là ứng dụng thống kê.

## Cách học hiệu quả

1. **Mở `visualization.html`** trước khi đọc README — chơi với simulator, xây trực giác.
2. **Đọc README** để học định nghĩa hình thức và walk-through số.
3. **Làm bài tập** ở cuối README, đối chiếu với *Lời giải chi tiết*.
4. **Quay lại viz** để verify trực quan.

Bắt đầu: [`Tầng 1 — Descriptive`](./01-Descriptive/index.html).
