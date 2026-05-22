# Economics — Lộ trình học Kinh tế học

Lộ trình đi từ tư duy nền tảng của nhà kinh tế tới các mô hình microeconomics, macroeconomics, và các chuyên đề ứng dụng (international trade, behavioral, development, econometrics, finance).

## Triết lý

Khác với toán hay lập trình, kinh tế học là *khoa học về lựa chọn dưới khan hiếm*. Lộ trình này nhấn mạnh:

- **Tư duy biên** (marginal) thay vì all-or-nothing.
- **Chi phí cơ hội** ở mọi quyết định — không chỉ "chi phí trực tiếp".
- **Incentive matters** — mọi chính sách / quyết định cần phân tích phản ứng hành vi.
- **Mô hình hóa bằng số cụ thể** — mỗi khái niệm có walk-through bằng con số, không chỉ công thức trừu tượng.

## Mục tiêu tổng quát

Sau toàn bộ lộ trình, bạn sẽ:

- Đọc hiểu được tin tức kinh tế (lạm phát, GDP, lãi suất, tỉ giá) mà không bị thuật ngữ làm khó.
- Phân tích được một chính sách công (thuế, trợ cấp, lương tối thiểu) bằng công cụ cung-cầu + thặng dư + deadweight loss.
- Hiểu được các mô hình cơ bản của microeconomics (lý thuyết tiêu dùng, sản xuất, game theory) và macroeconomics (IS-LM, AD-AS, Solow).
- Bước đầu vào econometrics — biết hồi quy là gì, biết đọc kết quả nghiên cứu định lượng.

## Cấu trúc lộ trình — 4 tier

Mỗi tier là một thư mục con, lesson được đánh số tăng dần *xuyên suốt 4 tier* (không reset về 01 ở mỗi tier).

### [Tier 1 — Foundations](./Tier1-Foundations/) (Nền tảng tư duy kinh tế)

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./Tier1-Foundations/lesson-01-thinking-like-economist/) | Tư duy như nhà kinh tế | Khan hiếm, đánh đổi, chi phí cơ hội, tư duy biên, incentives |
| Lesson 02 | Cung và cầu | Đường cung-cầu, điểm cân bằng, dịch chuyển vs di chuyển dọc đường |
| Lesson 03 | Độ co giãn | Co giãn cầu theo giá / thu nhập, co giãn cung, ứng dụng thuế |
| Lesson 04 | Thặng dư tiêu dùng & sản xuất | Welfare, deadweight loss |
| Lesson 05 | Market failures | Externality, public goods, asymmetric information |

### Tier 2 — Microeconomics (sắp ra)

| Bài | Chủ đề |
|-----|--------|
| Lesson 06 | Consumer theory — utility, đường bàng quan, budget constraint |
| Lesson 07 | Production & cost — hàm sản xuất, MC/AC, returns to scale |
| Lesson 08 | Market structures — cạnh tranh hoàn hảo, độc quyền, oligopoly |
| Lesson 09 | Game theory — Nash equilibrium, prisoner's dilemma, signaling |
| Lesson 10 | Labor & capital — thị trường lao động, PV/NPV, lãi suất |

### Tier 3 — Macroeconomics (sắp ra)

| Bài | Chủ đề |
|-----|--------|
| Lesson 11 | GDP & các thước đo — nominal vs real, CPI, deflator |
| Lesson 12 | Growth models — Solow, TFP, convergence |
| Lesson 13 | IS-LM / AD-AS — chu kỳ kinh tế |
| Lesson 14 | Monetary & fiscal policy — NHTW, Taylor rule, chính sách tài khóa |
| Lesson 15 | Inflation & unemployment — Phillips curve, kỳ vọng, stagflation |

### Tier 4 — Applied (Chuyên đề ứng dụng — sắp ra)

| Bài | Chủ đề |
|-----|--------|
| Lesson 16+ | International trade — lợi thế so sánh, tỉ giá |
| | Behavioral economics — biases, prospect theory, nudge |
| | Development economics — thể chế, RCT |
| | Econometrics intro — hồi quy, IV, DiD |
| | Financial economics — CAPM, EMH, định giá tài sản |

## Cấu trúc mỗi bài

- **README.md**: lý thuyết + walk-through bằng số + bài tập + lời giải chi tiết. Đầy đủ callout 💡, ❓, ⚠, 🔁, 📝.
- **visualization.html**: trang tương tác mở trực tiếp trong trình duyệt — máy tính chi phí cơ hội, PPF, mô phỏng quyết định biên, v.v. Có nút **📖 Đọc README** xem lý thuyết song song.
- *solutions.go* chỉ có khi user yêu cầu rõ ràng — không mặc định.

## Liên hệ với các lĩnh vực khác trong repo

- **Toán cần có**: đạo hàm cho tối ưu (sẽ học kỹ ở `Vectors/Calculus/`), xác suất cơ bản, đại số tuyến tính nhẹ.

## Quay về

[← Trang chính kho học thuật](../index.html)
