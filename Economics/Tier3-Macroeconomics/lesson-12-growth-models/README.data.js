// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Economics/Tier3-Macroeconomics/lesson-12-growth-models/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 12 — Growth Models (Mô hình tăng trưởng)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **tăng trưởng kinh tế dài hạn** quan trọng — sự khác biệt nhỏ về tốc độ tích lũy thành chênh lệch khổng lồ qua thế hệ.
- Phân tích **mô hình Solow** — cách tích lũy vốn (K), lao động (L), và công nghệ (A) thúc đẩy tăng trưởng.
- Hiểu khái niệm **steady state** (trạng thái dừng) và **convergence** (hội tụ kinh tế).
- Phân biệt **tăng trưởng vốn** (capital deepening) với **tăng trưởng công nghệ (TFP)**.
- Giải thích vì sao tăng trưởng dài hạn cuối cùng phụ thuộc *công nghệ*, không phải *tiết kiệm*.

## Kiến thức tiền đề

- [Lesson 07](../../Tier2-Microeconomics/lesson-07-production-cost/): hàm sản xuất.
- [Lesson 10](../../Tier2-Microeconomics/lesson-10-labor-capital/): lãi kép.
- [Lesson 11](../lesson-11-gdp-measurement/): GDP, real GDP.

## 1. Vì sao tăng trưởng quan trọng

### 1.1. Sức mạnh của tăng trưởng lũy thừa

Quy tắc 72: thu nhập nhân đôi sau \`72/g\` năm (với \`g\` = % tăng trưởng).

| g | Năm nhân đôi | Sau 50 năm | Sau 100 năm |
|---|------|------|------|
| 1% | 72 | × 1.65 | × 2.7 |
| 2% | 36 | × 2.7 | × 7.2 |
| 3% | 24 | × 4.4 | × 19.2 |
| 5% | 14.4 | × 11.5 | × 131.5 |
| 7% | 10.3 | × 29.5 | × 868 |

**Walk-through**: hai nước cùng GDP/người \`5.000\` USD năm 1970.
- A tăng 2%/năm: 2020 = \`5000 × 1.02^50 ≈ 13.500\` USD.
- B tăng 5%/năm: 2020 = \`5000 × 1.05^50 ≈ 57.300\` USD.

Chênh lệch hơn 4 lần — đây chính là khác biệt giữa các nước.

### 1.2. Hiện tượng quan sát

- Hàn Quốc 1960: GDP/người \`~150\` USD. 2024: \`~33.000\` USD. Tăng 220 lần.
- Việt Nam 1990: \`~100\` USD. 2024: \`~4.300\` USD. Tăng 43 lần.
- Argentina 1900: top 10 thế giới. 2024: hạng 60. Tăng trưởng kém → tụt hậu.

## 2. Mô hình Solow — Một biến (K)

### 2.1. Cài đặt cơ bản

Hàm sản xuất Cobb-Douglas (CRS):
\`\`\`
Y = F(K, L) = K^α · L^(1−α)
\`\`\`

Tính trên đầu người: \`y = Y/L = (K/L)^α = k^α\`.

- \`y\` = sản lượng/người.
- \`k\` = vốn/người.
- \`α ∈ (0, 1)\`, thường ~\`1/3\` (chia sẻ vốn trong thu nhập).

### 2.2. Tích lũy vốn

\`\`\`
Δk = s · y − δ · k
\`\`\`

- \`s\` = tỉ lệ tiết kiệm (saving rate). Đầu tư = \`s · y\`.
- \`δ\` = tỉ lệ khấu hao.

**Walk-through**: \`α = 1/3, s = 0.2, δ = 0.05\`. \`k = 8\`:
- \`y = 8^(1/3) = 2\`.
- Đầu tư = \`0.2 × 2 = 0.4\`.
- Khấu hao = \`0.05 × 8 = 0.4\`.
- \`Δk = 0\` → **steady state** (k không đổi).

### 2.3. Steady state

\`\`\`
Δk = 0  ⟺  s · k^α = δ · k  ⟺  k* = (s/δ)^(1/(1−α))
\`\`\`

Với \`α = 1/3, s = 0.2, δ = 0.05\`: \`k* = (0.2/0.05)^(3/2) = 4^1.5 = 8\`. \`y* = 2\`.

#### 💡 Trực giác

Tại sao có steady state? Vì:
- **Tiết kiệm** tuyến tính với \`y = k^α\` → tăng với α < 1 nên *chậm dần*.
- **Khấu hao** tuyến tính với \`k\`.
- Hai đường cắt nhau → cân bằng.

**Quan trọng**: tăng \`s\` → tăng \`k*\` (giàu hơn), NHƯNG *tốc độ tăng trưởng dài hạn = 0* ở steady state. Càng cố tiết kiệm chỉ thay đổi *mức* steady state, không thay đổi *tốc độ tăng* dài hạn.

### 2.4. Convergence

Nước nghèo có \`k\` thấp → \`MP_K\` cao → tăng trưởng cao hơn. Khi \`k\` tiến về \`k*\`, tăng trưởng giảm dần.

**Hệ quả**: các nước có cùng \`s, δ\` sẽ *hội tụ* về cùng \`y*\` — gọi là **conditional convergence**.

Quan sát thực: trong nhóm OECD, các nước hội tụ. Toàn cầu, không hoàn toàn — do \`s, δ, công nghệ, thể chế\` khác nhau.

## 3. Đưa công nghệ A vào

\`\`\`
Y = A · K^α · L^(1−α)
\`\`\`

\`A\` = năng suất tổng hợp (TFP — Total Factor Productivity).

Trong dài hạn, *chỉ có tăng A* mới duy trì tăng trưởng \`y\` — vì K tích lũy có giới hạn (steady state), nhưng A có thể tăng vô hạn (về lý thuyết).

**Hệ quả chính sách**:

- **Đầu tư R&D** → tăng A.
- **Giáo dục, vốn con người (human capital)**.
- **Thể chế** thúc đẩy đổi mới (bằng sáng chế, môi trường khởi nghiệp).

Đây là vì sao Mỹ vẫn tăng trưởng dù đã giàu — không phải tiết kiệm thêm mà nhờ liên tục đổi mới (Silicon Valley, R&D).

## 4. Growth Accounting

Phân tách tăng trưởng GDP thành đóng góp từ K, L, A:

\`\`\`
ΔY/Y ≈ α(ΔK/K) + (1−α)(ΔL/L) + ΔA/A
\`\`\`

Số dư \`ΔA/A\` (Solow residual) đo *tăng năng suất* không giải thích được bằng tăng K hay L.

**Walk-through**: Mỹ giai đoạn 1948-1973 — Y tăng 3.6%/năm. Phân tích cho thấy A tăng ~1.6%/năm chiếm gần một nửa. Phần còn lại từ K (~1%) và L (~1%).

## 5. Bài tập thực hành

### Bài 1 — Steady state Solow

\`α = 0.3, s = 0.25, δ = 0.05\`. Tìm \`k*\` và \`y*\`.

### Bài 2 — Tăng tỉ lệ tiết kiệm

Cùng tham số, \`s\` tăng từ \`0.2\` lên \`0.3\`. \`k*\` và \`y*\` mới?

### Bài 3 — Convergence

Hai nước có cùng \`s, δ, α\` nhưng khác \`k\`: nước A có \`k = 1\`, nước B có \`k = k* = 8\`. Dự đoán tăng trưởng năm tới?

### Bài 4 — Quy tắc 72

Tăng trưởng trung bình của Việt Nam ~6.5%/năm. Bao lâu thu nhập nhân đôi? Sau 30 năm thì gấp bao nhiêu lần?

## 6. Lời giải chi tiết

### Lời giải Bài 1

\`k* = (s/δ)^(1/(1−α)) = (0.25/0.05)^(1/0.7) = 5^1.429 ≈ 9.52\`. \`y* = k*^α = 9.52^0.3 ≈ 1.95\`.

### Lời giải Bài 2

\`k* = (0.3/0.05)^1.429 = 6^1.429 ≈ 11.92\`. \`y* = 11.92^0.3 ≈ 2.10\`. Cả \`k*\` và \`y*\` tăng — nhưng *tốc độ tăng dài hạn* vẫn = 0 ở steady state.

### Lời giải Bài 3

Nước A \`k = 1\`, xa steady state → MPK cao → tăng trưởng nhanh hơn. Nước B đã ở steady state → tăng trưởng = 0 (chỉ do khấu hao đuổi tiết kiệm). Đây là *conditional convergence*: A đuổi B.

### Lời giải Bài 4

Quy tắc 72: \`72/6.5 ≈ 11.1\` năm để nhân đôi. Sau 30 năm: \`1.065^30 ≈ 6.6 lần\`. Đây là vì sao Việt Nam đi từ nước nghèo lên trung bình thấp chỉ trong 30 năm.

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 13 — IS-LM / AD-AS](../lesson-13-is-lm-ad-as/).
- **Bài trước**: [Lesson 11 — GDP & Các thước đo](../lesson-11-gdp-measurement/).
- **Minh họa**: [visualization.html](./visualization.html) — mô phỏng Solow theo thời gian, hội tụ về steady state.
`;
