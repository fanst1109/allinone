// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier4-Applied/lesson-19-econometrics-intro/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 19 — Econometrics Intro

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hồi quy tuyến tính (linear regression)** — công cụ cốt lõi của econometrics — ước lượng quan hệ giữa biến.
- Biết đọc kết quả hồi quy: hệ số \`β\`, sai số chuẩn (SE), p-value, R².
- Hiểu khái niệm **causation vs correlation** — vì sao hồi quy đơn giản không đủ để nói nguyên nhân.
- Áp dụng **Instrumental Variables (IV)** — cách giải quyết khi có endogeneity.
- Áp dụng **Difference-in-Differences (DiD)** — phương pháp natural experiment phổ biến.

## Kiến thức tiền đề

- Toán: trung bình, phương sai, hệ số tương quan.
- [Lesson 18](../lesson-18-development-economics/): RCT — chuẩn vàng cho causation.

## 1. Hồi quy tuyến tính đơn giản

### 1.1. Mô hình

\`\`\`
y = β₀ + β₁ · x + ε
\`\`\`

- \`y\` = biến phụ thuộc (dependent).
- \`x\` = biến giải thích (explanatory).
- \`β₀\` = intercept; \`β₁\` = slope (hệ số quan tâm).
- \`ε\` = sai số (error term) — chứa mọi thứ khác ảnh hưởng \`y\`.

**Ý nghĩa \`β₁\`**: tăng \`x\` lên 1 đơn vị → \`y\` tăng trung bình \`β₁\` đơn vị (giữ mọi thứ khác).

### 1.2. OLS (Ordinary Least Squares)

Phương pháp ước lượng: chọn \`β₀, β₁\` *tối thiểu hóa tổng bình phương sai số*:
\`\`\`
min Σ (y_i − β₀ − β₁ · x_i)²
\`\`\`

Lời giải:
\`\`\`
β₁_hat = Cov(x, y) / Var(x)
β₀_hat = mean(y) − β₁_hat · mean(x)
\`\`\`

### 1.3. Walk-through bằng số

| x | y |
|---|---|
| 1 | 3 |
| 2 | 5 |
| 3 | 7 |
| 4 | 8 |
| 5 | 11 |

mean(x) = 3, mean(y) = 6.8.

| x−mean | y−mean | tích |
|--------|--------|------|
| -2 | -3.8 | 7.6 |
| -1 | -1.8 | 1.8 |
| 0 | 0.2 | 0 |
| 1 | 1.2 | 1.2 |
| 2 | 4.2 | 8.4 |

Cov = 18.0/5 = 3.6. Var(x) = (4+1+0+1+4)/5 = 2.

\`β₁ = 3.6/2 = 1.8\`. \`β₀ = 6.8 − 1.8 × 3 = 1.4\`.

Phương trình hồi quy: \`y = 1.4 + 1.8·x\`.

### 1.4. R² — Mức độ giải thích

\`R² ∈ [0, 1]\` đo phần trăm biến thiên của \`y\` được giải thích bởi \`x\`.

\`\`\`
R² = 1 − SSR/SST
\`\`\`

- SSR = Σ(y_i − y_hat_i)² — biến thiên còn lại sau hồi quy.
- SST = Σ(y_i − mean(y))² — tổng biến thiên của y.

\`R² = 0.9\` → 90% biến thiên giải thích được. \`R² = 0.1\` → rất ít.

### 1.5. Standard Error và p-value

\`β₁_hat\` là một *ước lượng*, có sai số. **Standard error** đo độ chính xác. Lý thuyết:
\`\`\`
SE(β₁) = σ / √(Σ(x − mean(x))²)
\`\`\`
\`σ\` = độ lệch chuẩn của ε.

**t-statistic** = \`β₁_hat / SE(β₁)\`. Nếu \`|t| > 1.96\` → \`p < 0.05\` → "có ý nghĩa thống kê" → tự tin \`β₁ ≠ 0\`.

## 2. Multiple Regression

\`\`\`
y = β₀ + β₁·x₁ + β₂·x₂ + ... + βₖ·xₖ + ε
\`\`\`

\`β_j\` = tác động của \`x_j\` lên \`y\` *giữ mọi \`x_i\` khác cố định*.

**Ví dụ**: nghiên cứu ảnh hưởng giáo dục lên lương.
- Hồi quy đơn: \`lương = β₀ + β₁ · năm_học\`. β₁ có thể quá lớn vì *người giàu thường đi học hơn* (confounding).
- Hồi quy bội: \`lương = β₀ + β₁ · năm_học + β₂ · iq + β₃ · cha_mẹ_thu_nhập\`. β₁ ổn định hơn vì *kiểm soát* các yếu tố khác.

## 3. Correlation vs Causation

### 3.1. Vấn đề

Hồi quy chỉ cho biết *quan hệ*, không *nhân quả*. 3 lý do có thể gây sai:

1. **Reverse causality**: \`y\` gây \`x\`, không phải ngược.
2. **Confounding (omitted variable)**: một biến \`z\` ảnh hưởng cả \`x\` và \`y\`.
3. **Selection bias**: mẫu không ngẫu nhiên.

**Ví dụ**: kem và đuối nước tương quan dương. Không phải kem gây đuối — biến \`z\` = mùa hè (gây cả 2).

### 3.2. Cách giải quyết

1. **RCT**: ngẫu nhiên hóa \`x\` → loại bỏ confounding (Lesson 18).
2. **Instrumental Variables**.
3. **Difference-in-Differences**.
4. **Regression Discontinuity**.

## 4. Instrumental Variables (IV)

### 4.1. Ý tưởng

Tìm biến \`z\` (instrument) thỏa:

- (a) Tương quan với \`x\` (relevance).
- (b) Ảnh hưởng \`y\` *chỉ qua* \`x\` (exclusion restriction).

Khi đó dùng \`z\` để "lọc" phần \`x\` ngoại sinh → ước lượng causation.

### 4.2. Ví dụ Angrist-Krueger (1991)

Câu hỏi: học thêm 1 năm → lương tăng bao nhiêu?

Hồi quy thô có vấn đề confounding (IQ, gia đình, ...).

**Instrument**: *quý sinh* (quý 1, 2, 3, 4). Vì luật bắt đi học từ 6 tuổi và bỏ học lúc 16, quý sinh ảnh hưởng *số năm học* (relevance) — sinh đầu năm vào học muộn, đủ tuổi nghỉ sớm hơn.

Quý sinh *ngẫu nhiên* (gần như) đối với IQ, gia đình → loại confounding.

Kết quả: 1 năm học thêm ≈ tăng lương 7-10%.

## 5. Difference-in-Differences (DiD)

### 5.1. Setup

Có 2 nhóm, 2 thời điểm. Nhóm A (treatment) nhận chính sách ở \`t=2\`. Nhóm B (control) không.

\`\`\`
DiD = (y_A_t2 − y_A_t1) − (y_B_t2 − y_B_t1)
\`\`\`

= thay đổi trong nhóm A − thay đổi trong nhóm B.

Logic: nếu không có chính sách, A và B sẽ thay đổi cùng cách → khác biệt = tác động chính sách.

### 5.2. Walk-through — Card-Krueger (1994)

Câu hỏi: tăng lương tối thiểu có giảm việc làm?

- **Treatment**: New Jersey (tăng min wage 1992).
- **Control**: Pennsylvania (không thay đổi).
- **Outcome**: việc làm ngành fast food.

Trước (Q1 1992): NJ ~20 việc, PA ~21 việc.
Sau (Q4 1992): NJ ~21 việc, PA ~19 việc.

\`DiD = (21 − 20) − (19 − 21) = 1 − (−2) = +3\`.

Kết quả gây sốc: tăng min wage *không* giảm (thậm chí tăng) việc làm. Bóp méo lý thuyết kinh tế cổ điển. Khả năng giải thích: monopsony power (Lesson 10).

### 5.3. Giả định "parallel trends"

DiD chỉ hợp lệ nếu nhóm A và B có *xu hướng song song* trong absence của chính sách. Kiểm tra bằng dữ liệu trước.

## 6. Bài tập

### Bài 1 — Tính hồi quy bằng tay

Dữ liệu 5 điểm: \`(1, 2), (2, 4), (3, 5), (4, 8), (5, 9)\`. Tính \`β₀, β₁\`.

### Bài 2 — Phân tích kết quả

Bạn hồi quy \`lương = β₀ + β₁ · năm_học + ε\` và được \`β₁_hat = 800\` (USD/năm), SE = 200.

- (a) Tính t-stat.
- (b) Có ý nghĩa thống kê (5%)?
- (c) Interpret hệ số.

### Bài 3 — Confounding

Bạn quan sát: "Người uống cà phê nhiều có thu nhập cao hơn". Đề xuất 3 confounders có thể giải thích quan hệ này mà không cần cà phê *gây ra* thu nhập.

### Bài 4 — DiD

| | Trước | Sau |
|---|-------|-----|
| Treatment | 50 | 60 |
| Control | 40 | 45 |

Tính DiD. Diễn giải.

## 7. Lời giải

### Lời giải Bài 1

mean(x) = 3, mean(y) = 5.6.

| x−mean | y−mean | tích | (x−mean)² |
|--------|--------|------|-----------|
| -2 | -3.6 | 7.2 | 4 |
| -1 | -1.6 | 1.6 | 1 |
| 0 | -0.6 | 0 | 0 |
| 1 | 2.4 | 2.4 | 1 |
| 2 | 3.4 | 6.8 | 4 |

Tổng tích = 18.0. Tổng (x−mean)² = 10. β₁ = 18/10 = 1.8. β₀ = 5.6 − 1.8×3 = 0.2.

\`y = 0.2 + 1.8·x\`.

### Lời giải Bài 2

(a) t = \`800/200 = 4\`.
(b) \`|t| = 4 > 1.96\` → có ý nghĩa, p < 0.05.
(c) Mỗi năm học thêm liên hệ với lương cao hơn \`~800 USD/năm\` (giả định không có confounding nghiêm trọng).

### Lời giải Bài 3

3 confounders:
1. **Tuổi**: người lớn tuổi thường thu nhập cao + uống cà phê nhiều hơn.
2. **Văn phòng + thành thị**: dân văn phòng thành thị uống cà phê + thu nhập cao hơn nông thôn.
3. **Giáo dục**: học cao → uống cà phê nhiều (sinh viên, chuyên gia) + thu nhập cao.

→ Hồi quy đơn giản giữa cà phê và thu nhập sẽ thổi phồng quan hệ.

### Lời giải Bài 4

\`DiD = (60 − 50) − (45 − 40) = 10 − 5 = +5\`.

Diễn giải: chính sách làm tăng outcome thêm **5 đơn vị** so với điều gì sẽ xảy ra nếu không có chính sách (sử dụng nhóm control làm baseline cho xu hướng).

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 20 — Financial Economics](../lesson-20-financial-economics/).
- **Bài trước**: [Lesson 18 — Development Economics](../lesson-18-development-economics/).
- **Minh họa**: [visualization.html](./visualization.html) — kéo các điểm dữ liệu, xem đường hồi quy cập nhật.
`;
