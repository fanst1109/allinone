// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Algebra/lesson-07-exp-log-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Hàm mũ và hàm log (exponential & logarithm functions)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu định nghĩa và đặc tính của hàm mũ \`f(x) = a^x\` và hàm log \`f(x) = log_a(x)\`.
- Biết vì sao **cơ số e ≈ 2.71828** lại đặc biệt — không phải con số ngẫu nhiên.
- Hình dung được **tốc độ tăng** của hàm mũ so với polynomial, và vì sao log tăng cực chậm.
- Biết khi nào nên vẽ ở **log scale** thay vì linear scale.
- Hiểu mối quan hệ ngược giữa \`e^x\` và \`ln x\`, và vì sao ML/AI dùng cặp này khắp nơi (sigmoid, softmax, cross-entropy, log-likelihood).
- Cài được \`sigmoid\` và \`softmax\` ổn định số bằng Go.

## Kiến thức tiền đề

- [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/): nắm vững \`a^n\`, \`log_a(x)\` và các quy tắc.
- [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/): hiểu khái niệm hàm, đồ thị, đỉnh, giao điểm.

Bài này gắn \`a^n\` thành một **hàm liên tục** \`a^x\` (cho x là số thực bất kỳ, không chỉ số nguyên) và nâng \`log\` thành công cụ phân tích dữ liệu.

---

## PHẦN A — Hàm mũ (exponential function)

### A.1. Định nghĩa

Cho \`a > 0, a ≠ 1\`, hàm mũ cơ số \`a\` là:

\`\`\`
f(x) = a^x
\`\`\`

Điểm cốt lõi: **biến \`x\` ở vị trí số mũ**, còn cơ số \`a\` cố định. Đây là điểm khác hẳn hàm bậc 1 (\`ax + b\`) hay bậc 2 (\`ax² + bx + c\`) — ở đó \`x\` nằm ở vị trí cơ số, số mũ cố định.

| Hàm | Vị trí của x | Ví dụ |
|---|---|---|
| Bậc 1 | trong cơ số, mũ = 1 | \`3x + 5\` |
| Bậc 2 | trong cơ số, mũ = 2 | \`2x² + x\` |
| Bậc k | trong cơ số, mũ = k cố định | \`x^5\` |
| **Mũ** | **trong số mũ**, cơ số cố định | \`2^x\`, \`e^x\`, \`10^x\` |

Vì sao loại trừ \`a = 1\`? Vì \`1^x = 1\` với mọi x — thành hằng số, không thú vị.
Vì sao loại trừ \`a ≤ 0\`? Vì \`(-2)^0.5 = √(-2)\` không phải số thực; \`0^(-1) = 1/0\` không xác định. Loại trừ cho gọn miền xác định.

### A.2. Đặc tính

Với \`a > 1\` (vd \`a = 2, e, 10\`):

- **Luôn dương**: \`a^x > 0\` với mọi x ∈ ℝ. Không bao giờ chạm 0 hay xuống âm.
- **Tăng nghiêm ngặt**: x lớn hơn → \`a^x\` lớn hơn.
- **Đi qua điểm (0, 1)**: vì \`a^0 = 1\` với mọi a.
- **Tiệm cận với trục Ox khi x → -∞**: \`2^(-10) = 1/1024 ≈ 0.001\`, \`2^(-30) ≈ 10^(-9)\` — về rất gần 0 nhưng không bao giờ chạm.
- **Bùng nổ khi x → +∞**: \`2^10 ≈ 10³\`, \`2^30 ≈ 10⁹\`, \`2^60 ≈ 10^18\`.

Với \`0 < a < 1\` (vd \`a = 0.5\`):

- Vẫn luôn dương, đi qua (0, 1), nhưng **giảm** khi x tăng.
- Tiệm cận với Ox khi x → +∞ (ngược lại với trường hợp \`a > 1\`).
- Đây thực ra là cùng một họ: \`(1/2)^x = 2^(-x)\`. Đảo dấu mũ thì ngang bằng đảo cơ số \`a ↔ 1/a\`.

### A.3. Cơ số đặc biệt \`e ≈ 2.71828\`

Câu hỏi tự nhiên: tại sao toán/khoa học/ML đều dùng \`e\` mà không phải \`2\` hay \`10\`?

**Trực giác**: \`e\` là cơ số duy nhất mà hàm \`f(x) = a^x\` có đạo hàm bằng chính nó. Nghĩa là **độ dốc của \`e^x\` tại mọi điểm x đúng bằng giá trị \`e^x\` tại điểm đó**:

\`\`\`
(e^x)' = e^x
\`\`\`

Tại x = 0: \`e^0 = 1\`, độ dốc = 1.
Tại x = 1: \`e^1 ≈ 2.718\`, độ dốc cũng ≈ 2.718.

Đây là tính chất khiến \`e\` xuất hiện tự nhiên trong mọi bài toán liên quan đến **tốc độ thay đổi tỷ lệ với giá trị hiện tại** — lãi kép liên tục, dân số, phân rã phóng xạ, mạch RC, etc.

**Định nghĩa hình thức 1 — qua giới hạn**:

\`\`\`
e = lim (1 + 1/n)^n  khi n → ∞
\`\`\`

Đến từ bài toán lãi kép: nếu lãi \`100%/năm\` chia thành \`n\` kỳ, mỗi kỳ \`1/n\`, ta có \`(1 + 1/n)^n\`. Khi \`n → ∞\` (lãi gộp liên tục), số ấy tiến về \`e\`.

Tính cụ thể cho vài giá trị \`n\`:

| n | (1 + 1/n)^n |
|---|---|
| 1 | (1 + 1)^1 = 2 |
| 2 | (1.5)^2 = 2.25 |
| 5 | (1.2)^5 ≈ 2.488 |
| 10 | (1.1)^10 ≈ 2.594 |
| 100 | (1.01)^100 ≈ 2.7048 |
| 1 000 | ≈ 2.7169 |
| 10 000 | ≈ 2.71815 |
| 100 000 | ≈ 2.71827 |
| ∞ | e ≈ 2.7182818... |

Hội tụ nhưng chậm.

**Định nghĩa hình thức 2 — qua chuỗi** (không bắt buộc thuộc, chỉ giới thiệu):

\`\`\`
e = Σ_{k=0}^{∞} 1/k! = 1 + 1 + 1/2 + 1/6 + 1/24 + ...
\`\`\`

Tính 5 số hạng đầu: \`1 + 1 + 0.5 + 0.1667 + 0.0417 = 2.7083\`. 10 số hạng đầu cho 7 chữ số đúng. Chuỗi này hội tụ rất nhanh — chính nó là cách máy tính thực sự tính \`e^x\`.

**Câu hỏi tự nhiên**: nếu \`e ≈ 2.718\` thì sao không dùng luôn \`2\`? Câu trả lời: dùng được, nhưng đạo hàm của \`2^x\` không phải \`2^x\` mà là \`2^x · ln 2 ≈ 0.693 · 2^x\`. Mỗi lần đạo hàm sinh thêm hằng số rác. Chọn \`e\` để các công thức gọn nhất.

### A.4. Tốc độ tăng — exponential thắng mọi polynomial

So sánh \`x²\`, \`x³\`, \`2^x\`, \`e^x\` tại các giá trị x:

| x | x² | x³ | 2^x | e^x |
|---|---|---|---|---|
| 1 | 1 | 1 | 2 | 2.72 |
| 5 | 25 | 125 | 32 | 148.4 |
| 10 | 100 | 1 000 | 1 024 | 22 026 |
| 20 | 400 | 8 000 | 1 048 576 | ~4.85 · 10⁸ |
| 50 | 2 500 | 125 000 | ~10^15 | ~5.18 · 10²¹ |

Quan sát:

- Tại x = 5, \`x³ = 125\` còn lớn hơn \`2^x = 32\`. Polynomial đang dẫn.
- Tại x = 10, \`2^x = 1024\` đã vượt \`x³ = 1000\`. Exponential bắt đầu thắng.
- Tại x = 20, \`2^x ≈ 10⁶\` còn \`x³ = 8000\` — exponential bỏ xa.
- Tại x = 50, khoảng cách là \`10^11\` lần.

**Định lý nền tảng** (sẽ chứng minh ở tầng Calculus): với mọi hằng số \`k > 0\` và mọi \`a > 1\`,

\`\`\`
lim (x^k / a^x) = 0  khi x → +∞
\`\`\`

Diễn dịch: **bất kể polynomial bậc bao nhiêu, exponential luôn vượt mặt khi x đủ lớn**.

**Hệ quả thực tế trong CS**: thuật toán có độ phức tạp \`O(2^n)\` (vd duyệt mọi subset của n phần tử) sẽ **luôn** tệ hơn \`O(n^k)\` cho mọi \`k\` cố định, khi \`n\` đủ lớn. Cụ thể:

- Sắp xếp 100 phần tử bằng \`O(n²)\`: ~10 000 phép.
- Duyệt mọi subset của 100 phần tử bằng \`O(2^n)\`: \`2^100 ≈ 1.27 · 10^30\` phép — máy nhanh nhất hành tinh cũng không kịp trước khi vũ trụ kết thúc.

Đây là vì sao "exponential blowup" là từ khóa đáng sợ trong tối ưu hóa và NP-hardness.

### A.5. Ứng dụng

**(a) Lãi kép (compound interest)** — gốc gác lịch sử của \`e\`.

- Gửi \`P\` triệu, lãi \`r/năm\`, gộp 1 lần/năm, sau \`t\` năm: \`A = P(1 + r)^t\`.
- Nếu gộp \`n\` lần/năm: \`A = P(1 + r/n)^(nt)\`.
- Gộp liên tục (\`n → ∞\`): \`A = P · e^(rt)\`.

Vd \`P = 100, r = 0.05, t = 30\`:
- Discrete (gộp 1 lần/năm): \`100 · 1.05^30 ≈ 432.19\`.
- Continuous: \`100 · e^(0.05·30) = 100 · e^1.5 ≈ 448.17\`.
Chênh ~16 triệu — không nhiều, nhưng càng nhiều kỳ thì kết quả càng gần \`e^(rt)\`.

**(b) Tăng trưởng dân số / lan truyền dịch bệnh**: trong giai đoạn đầu, khi chưa chạm trần tài nguyên / miễn dịch cộng đồng, số ca nhiễm tăng theo \`N₀ · e^(kt)\`. Đây là vì sao dịch bệnh "vô hại" trong tuần 1 lại "kinh hoàng" trong tuần 6 — đường cong cùng một dạng, chỉ là bạn đang ở khúc nào.

**(c) Phân rã (decay)** — ngược dấu của tăng trưởng:

\`\`\`
N(t) = N₀ · e^(-λt)
\`\`\`

\`λ > 0\` là hằng số phân rã. Chu kỳ bán rã \`T₁/₂\` là thời gian để \`N\` giảm còn nửa:

\`\`\`
N₀/2 = N₀ · e^(-λT₁/₂)  →  T₁/₂ = ln 2 / λ ≈ 0.693 / λ
\`\`\`

Vd Carbon-14 có \`T₁/₂ ≈ 5730\` năm — đó là cơ sở của radiocarbon dating.

**(d) Trong Machine Learning**:

- **Sigmoid** \`σ(x) = 1 / (1 + e^(-x))\`: ép giá trị thực bất kỳ về khoảng \`(0, 1)\`, dùng làm xác suất. Cốt lõi của logistic regression và là activation function cũ của neural network.
  - \`σ(0) = 0.5\`, \`σ(-∞) → 0\`, \`σ(+∞) → 1\`.
- **Softmax** \`softmax(x_i) = e^(x_i) / Σ_j e^(x_j)\`: chuẩn hóa vector số thực thành phân phối xác suất (mỗi phần tử ∈ (0, 1), tổng = 1). Dùng ở lớp cuối mọi mô hình phân loại nhiều lớp.
- **Logistic regression**: kết hợp linear + sigmoid + log-likelihood loss.

Tất cả đều quay quanh \`e^x\`. Vì sao? Vì đạo hàm gọn, vì kết quả luôn dương (chia ra xác suất hợp lệ), vì tính chất "small wins, big wins" của exponential (logit chênh 1 → xác suất chênh ~e lần).

---

## PHẦN B — Hàm logarit (logarithm function)

### B.1. Định nghĩa

\`log_a(x)\` là **hàm ngược** của \`a^x\`:

\`\`\`
y = log_a(x)  ⇔  a^y = x
\`\`\`

Diễn dịch: "log_a của x" trả lời câu hỏi *"phải nâng \`a\` lên lũy thừa bao nhiêu để được x?"*

Vì là hàm ngược, đồ thị \`y = log_a(x)\` chính là đồ thị \`y = a^x\` **lật qua đường y = x**. Mọi điểm \`(p, q)\` trên đồ thị mũ tương ứng \`(q, p)\` trên đồ thị log.

### B.2. Đặc tính

- **Domain**: \`x > 0\`. Không có \`log\` của 0 hay số âm trong số thực — vì \`a^y\` không bao giờ bằng số ≤ 0.
- **Range**: tất cả ℝ. Có thể là số âm (vd \`log_2(0.25) = -2\`), số 0 (\`log_a(1) = 0\`), hay rất lớn.
- **Đi qua (1, 0)**: \`log_a(1) = 0\` vì \`a^0 = 1\`.
- **Đi qua (a, 1)**: \`log_a(a) = 1\` vì \`a^1 = a\`.
- **Tăng** nếu \`a > 1\`, **giảm** nếu \`0 < a < 1\` — chậm hơn bất kỳ polynomial nào.
- **Tiệm cận với trục Oy** khi \`x → 0⁺\`: \`log_2(0.001) ≈ -10\`, \`log_2(10⁻⁹) ≈ -30\`.

### B.3. Ba log đặc biệt

| Ký hiệu | Cơ số | Tên | Dùng nhiều ở đâu |
|---|---|---|---|
| \`ln x\` | e | log tự nhiên | Toán, ML, mọi nơi có đạo hàm |
| \`log x\` | 10 | log thập phân | Khoa học, kỹ thuật (dB, pH, Richter) |
| \`log₂ x\` | 2 | log nhị phân | Computer Science (độ phức tạp, entropy bit) |

Quy ước viết tắt khác nhau theo ngành — sách toán phổ thông \`log\` thường = \`log_10\`, trong ML/CS \`log\` thường = \`ln\`. Khi đọc paper, kiểm tra context.

**Đổi cơ số** (từ Lesson 04):

\`\`\`
log_a(x) = ln(x) / ln(a)
\`\`\`

Nên thực ra ba log trên chỉ khác nhau bởi một hằng số nhân:
- \`log_2(x) = ln(x) / ln(2) ≈ ln(x) / 0.693 ≈ 1.4427 · ln(x)\`
- \`log_10(x) = ln(x) / ln(10) ≈ ln(x) / 2.303 ≈ 0.4343 · ln(x)\`

### B.4. Tốc độ tăng — log tăng cực chậm

| x | log₂(x) | log₁₀(x) | ln(x) |
|---|---|---|---|
| 1 | 0 | 0 | 0 |
| 10 | 3.32 | 1 | 2.30 |
| 100 | 6.64 | 2 | 4.61 |
| 1 000 | 9.97 | 3 | 6.91 |
| 10 000 | 13.29 | 4 | 9.21 |
| 1 000 000 | 19.93 | 6 | 13.82 |
| 1 000 000 000 (1 tỷ) | 29.90 | 9 | 20.72 |

Quan sát: từ 1 tới 1 tỷ — \`x\` nhân lên 10⁹ lần, \`log_2(x)\` chỉ tăng từ 0 lên ~30.

**Hệ quả CS**: binary search trên mảng 1 tỷ phần tử chỉ cần ~30 phép so sánh. Đó là vì mỗi bước cắt nửa, sau k bước còn \`n / 2^k\` phần tử — giải \`n / 2^k = 1\` ta được \`k = log_2(n)\`.

Tương tự: cây cân bằng (AVL, Red-Black, B-tree) lưu n phần tử có chiều cao \`O(log n)\`. Tra cứu trên 1 tỷ key ở B-tree với fanout 100 cao \`log_100(10^9) ≈ 4.5\` — đọc đĩa 5 lần là xong.

### B.5. Log scale plot — vì sao đôi khi vẽ ở log scale

Dữ liệu **trải nhiều order of magnitude** (vd thu nhập từ 1 nghìn → 1 tỷ, dân số từ 100 → 10 tỷ, tần số âm thanh từ 20 Hz → 20 000 Hz):

- **Linear scale**: số nhỏ "biến mất". 1, 10, 100 ở cạnh 10⁹ thì xem như 0.
- **Log scale**: mỗi tick là một bội cố định (vd 1, 10, 100, 1000, ...). Mọi quy mô đều thấy được.

Cụ thể: vẽ thu nhập 5 người \`{1k, 10k, 100k, 1M, 1B}\` ở linear scale → 4 cột đầu lùn tịt, cột cuối ngất ngưởng. Ở log scale → 5 cột đều bậc thang, dễ so sánh.

**Khi nào dùng**: data lệch (skewed), phổ tần số, biểu đồ tăng trưởng dài hạn, dây vẽ thuật toán O(n) vs O(log n) vs O(n²).

**Quy ước**: trục đánh dấu \`10⁰, 10¹, 10², 10³, ...\`; giữa các tick không phải tỷ lệ tuyến tính. Nếu data có giá trị 0 hoặc âm, log scale không vẽ được — phải shift hoặc dùng symlog.

---

## PHẦN C — Mối quan hệ và ứng dụng ML

### C.1. \`e^x\` và \`ln x\` là hàm ngược

\`\`\`
e^(ln x) = x   (với x > 0)
ln(e^x) = x    (với mọi x ∈ ℝ)
\`\`\`

Đây không phải mẹo — đây là định nghĩa: \`ln\` được dựng ra để là hàm ngược của \`e^x\`.

Hệ quả thường dùng: chuyển nhân thành cộng, mũ thành nhân.

\`\`\`
ln(a · b) = ln a + ln b
ln(a^b) = b · ln a
e^(a + b) = e^a · e^b
e^(a · b) = (e^a)^b
\`\`\`

**Ứng dụng trong ML**: log-likelihood. Nếu xác suất quan sát \`n\` mẫu độc lập là tích \`p₁ · p₂ · ... · p_n\` — số rất nhỏ (vd \`10⁻³⁰⁰\`), máy tính underflow về 0. Lấy log:

\`\`\`
log(p₁ · p₂ · ... · p_n) = log p₁ + log p₂ + ... + log p_n
\`\`\`

Tổng các log là số âm vừa phải (vd -700), tính được trơn tru. Mọi MLE / Bayesian inference thực tế đều làm trong log-space.

### C.2. Đạo hàm — giới thiệu, chi tiết ở Tầng 3 Calculus

\`\`\`
(e^x)' = e^x            (đạo hàm chính nó — duy nhất e mới có)
(ln x)' = 1/x           (với x > 0)
(a^x)' = a^x · ln a
(log_a x)' = 1/(x · ln a)
\`\`\`

Quan sát: \`(ln x)' = 1/x\` — đạo hàm ra một hàm "đơn giản hơn" \`ln\`. Chính vì vậy \`ln\` xuất hiện ở mọi nơi: bất kỳ khi nào cần tính \`∫ 1/x dx\`, ra \`ln |x|\`.

### C.3. Vì sao ML dùng \`e\` / \`ln\` nhiều

**(a) Sigmoid và logistic regression**

\`\`\`
σ(x) = 1 / (1 + e^(-x))
\`\`\`

Đạo hàm có dạng cực gọn:

\`\`\`
σ'(x) = σ(x) · (1 - σ(x))
\`\`\`

Không cần tính lại từ đầu — chỉ cần giá trị \`σ(x)\` hiện có là ra đạo hàm. Đây là vì sao logistic regression train được hiệu quả bằng gradient descent.

**(b) Softmax — phân loại nhiều lớp**

Với vector logit \`(z₁, z₂, ..., z_K)\`:

\`\`\`
softmax(z_i) = e^(z_i) / Σ_j e^(z_j)
\`\`\`

Tính chất:
- Mỗi \`softmax(z_i) ∈ (0, 1)\` (vì exponential dương, mẫu là tổng dương lớn hơn tử).
- \`Σ_i softmax(z_i) = 1\` (mẫu chính là tổng tử).
- → Là phân phối xác suất hợp lệ.

**Lưu ý ổn định số** — đây là pattern phải nhớ: nếu \`z_i\` lớn (vd 1000), \`e^1000\` overflow → NaN. Trick: trừ max trước:

\`\`\`
m = max(z)
softmax(z_i) = e^(z_i - m) / Σ_j e^(z_j - m)
\`\`\`

Kết quả không đổi (do cả tử/mẫu cùng chia \`e^m\`) nhưng mọi \`z_i - m ≤ 0\`, exponential nằm trong \`(0, 1]\`, không overflow.

**(c) Cross-entropy loss** — kết nối log và xác suất

Với phân loại \`K\` lớp, ground truth one-hot \`y\` và dự đoán \`p\` (qua softmax):

\`\`\`
L = - Σ_i y_i · log(p_i)
\`\`\`

Nếu \`y\` one-hot — chỉ một \`y_i = 1\`, còn lại = 0 — thì \`L = -log(p_correct)\`.

- Dự đoán đúng với xác suất 0.99 → \`L = -log(0.99) ≈ 0.01\` (loss nhỏ).
- Dự đoán đúng với xác suất 0.01 → \`L = -log(0.01) ≈ 4.6\` (loss lớn).
- Dự đoán đúng với xác suất 0 → \`L = -log(0) = +∞\` (loss vô cực — bị phạt cực gắt vì "tự tin sai").

Sẽ học sâu ở Tầng 5 (Information Theory).

**(d) Entropy, KL divergence** — nền của information theory:

\`\`\`
H(p) = - Σ p_i · log(p_i)            (entropy của phân phối p)
KL(p ‖ q) = Σ p_i · log(p_i / q_i)    (khoảng cách Kullback-Leibler)
\`\`\`

\`log\` ở đây vẫn là \`ln\` (hoặc \`log_2\` nếu đo bằng bit). Lý do dùng log: nó biến tích thành tổng (giả thiết độc lập → entropy cộng được).

---

## Bài tập

### Bài 1 — Giá trị cơ bản

Tính (ước lượng nếu cần): \`e^0\`, \`e^1\`, \`e^2\`, \`ln(1)\`, \`ln(e)\`, \`ln(e^5)\`, \`ln(0)\`.

### Bài 2 — Sắp xếp tốc độ tăng

Tại \`x = 20\`, sắp xếp các giá trị sau theo thứ tự **tăng dần**:

\`20\`, \`20²\`, \`2^20\`, \`e^20\`, \`20 · ln(20)\`, \`log₂(20)\`.

### Bài 3 — Sigmoid

Cho \`σ(x) = 1 / (1 + e^(-x))\`. Tính (làm tròn 4 chữ số):

\`σ(0)\`, \`σ(1)\`, \`σ(-1)\`, \`σ(10)\`, \`σ(-10)\`.

Range của sigmoid là gì? Sigmoid có đối xứng qua điểm nào không?

### Bài 4 — Softmax 3 lớp

Cho \`logits = [2, 1, 0]\`. Tính \`softmax(logits)\` — ba xác suất. Tổng = ? Lớp nào xác suất cao nhất?

### Bài 5 — Lãi kép

Gửi \`P = 100\` triệu, lãi \`r = 5%/năm\`. Tính số tiền sau 1, 5, 10, 30 năm theo hai công thức:

- Discrete (gộp 1 lần/năm): \`A = P · (1 + r)^t\`
- Continuous: \`A = P · e^(rt)\`

So sánh hai kết quả tại \`t = 30\`.

### Bài 6 — Code Go

Viết các hàm:

1. \`sigmoid(x float64) float64\`.
2. \`softmax(logits []float64) []float64\` — implementation **ổn định số** bằng cách trừ max.
3. Demo: sinh 1000 datapoint (mỗi datapoint là 3 logit float ngẫu nhiên trong \`[-10, 10]\`). Áp softmax cho từng datapoint. In min/max của tất cả giá trị softmax và kiểm tra tổng từng vector = 1 (sai số ≤ \`1e-9\`). In min/max của \`sigmoid\` áp lên 1000 input ngẫu nhiên.

---

## Lời giải chi tiết

### Lời giải bài 1

| Biểu thức | Giá trị | Lý do |
|---|---|---|
| \`e^0\` | 1 | mọi cơ số mũ 0 đều = 1 |
| \`e^1\` | e ≈ 2.71828 | định nghĩa |
| \`e^2\` | ≈ 7.389 | \`e · e ≈ 2.718²\` |
| \`ln(1)\` | 0 | \`e^0 = 1\` |
| \`ln(e)\` | 1 | \`e^1 = e\` |
| \`ln(e^5)\` | 5 | \`ln(e^x) = x\` (hàm ngược) |
| \`ln(0)\` | **undefined** (→ -∞) | không tồn tại y nào để \`e^y = 0\`; khi \`x → 0⁺\` thì \`ln x → -∞\` |

Lưu ý \`ln(0)\` không phải số — trong code Go, \`math.Log(0) = -Inf\`. Tránh truyền 0 hoặc số âm vào \`ln\` trong tính toán thực tế (vd cross-entropy: phải clamp xác suất tối thiểu là \`1e-12\`).

### Lời giải bài 2

Tính từng giá trị tại \`x = 20\`:

| Biểu thức | Giá trị |
|---|---|
| \`log₂(20)\` | ≈ 4.32 |
| \`20\` | 20 |
| \`20 · ln(20)\` | 20 · 2.996 ≈ 59.91 |
| \`20²\` | 400 |
| \`2^20\` | 1 048 576 (≈ 10⁶) |
| \`e^20\` | ≈ 4.85 · 10⁸ |

**Thứ tự tăng dần**: \`log₂(20) < 20 < 20·ln(20) < 20² < 2^20 < e^20\`.

Quan sát: tại \`x = 20\`, \`e^x\` đã thắng \`2^x\` khoảng ~463 lần — chỉ vì cơ số \`e ≈ 2.72 > 2\`, và khoảng cách bị mũ hóa lên.

### Lời giải bài 3

\`σ(x) = 1 / (1 + e^(-x))\`:

| x | \`e^(-x)\` | \`σ(x)\` |
|---|---|---|
| 0 | 1 | 1/2 = **0.5** |
| 1 | 0.368 | 1/1.368 ≈ **0.7311** |
| -1 | 2.718 | 1/3.718 ≈ **0.2689** |
| 10 | ≈ 4.54·10⁻⁵ | ≈ **0.99995** |
| -10 | ≈ 22 026 | ≈ **0.0000454** |

**Range**: \`(0, 1)\` — không bao giờ đạt 0 hay 1 chính xác (chỉ tiệm cận).

**Đối xứng**: qua điểm \`(0, 0.5)\`. Cụ thể \`σ(-x) = 1 - σ(x)\`. Kiểm: \`σ(1) + σ(-1) = 0.7311 + 0.2689 = 1\`. ✓

### Lời giải bài 4

\`logits = [2, 1, 0]\`. Để ổn định số, trừ max = 2:

\`\`\`
adjusted = [0, -1, -2]
exps = [e^0, e^(-1), e^(-2)] = [1, 0.3679, 0.1353]
sum = 1 + 0.3679 + 0.1353 = 1.5032
softmax = [1/1.5032, 0.3679/1.5032, 0.1353/1.5032]
       = [0.6652, 0.2447, 0.0900]
\`\`\`

- Tổng = \`0.6652 + 0.2447 + 0.0900 = 0.9999\` ≈ 1 ✓ (chênh 0.0001 do làm tròn).
- Lớp 0 (logit 2) xác suất cao nhất.

Quan sát: logit chênh nhau 1 đơn vị, xác suất tương ứng chênh nhau hệ số \`e ≈ 2.72\` lần. Đó là "small logit difference = big probability difference" của softmax.

### Lời giải bài 5

\`P = 100\`, \`r = 0.05\`.

| t (năm) | Discrete \`100 · 1.05^t\` | Continuous \`100 · e^(0.05t)\` | Chênh |
|---|---|---|---|
| 1 | 105.00 | 100 · e^0.05 ≈ 105.13 | 0.13 |
| 5 | 100 · 1.05^5 ≈ 127.63 | 100 · e^0.25 ≈ 128.40 | 0.78 |
| 10 | 100 · 1.05^10 ≈ 162.89 | 100 · e^0.5 ≈ 164.87 | 1.98 |
| 30 | 100 · 1.05^30 ≈ 432.19 | 100 · e^1.5 ≈ 448.17 | 15.98 |

Continuous luôn lớn hơn discrete (lãi gộp dày hơn). Chênh càng tăng theo \`t\` và \`r\`. Tỷ lệ: \`e^r / (1 + r) ≈ e^0.05 / 1.05 ≈ 1.00127\` mỗi năm — tức continuous nhanh hơn ~0.127%/năm.

### Lời giải bài 6

Xem file [solutions.go](./solutions.go). Tóm tắt approach:

**\`sigmoid\`**: tính trực tiếp, nhưng dùng \`math.Exp\` cẩn thận. Với \`x\` rất âm, \`e^(-x)\` overflow → trả về 0; thực tế Go xử lý hợp lý (\`Inf\`, rồi \`1/(1+Inf) = 0\`), nhưng nên kiểm.

**\`softmax\` ổn định số**:
1. Tìm \`m = max(logits)\`.
2. Tính \`exp(z_i - m)\` cho từng phần tử (mọi giá trị này nằm trong \`(0, 1]\`).
3. Tổng các giá trị đó.
4. Chia mỗi cái cho tổng.

Vì sao trừ max được phép: \`e^(z_i) / Σ e^(z_j) = (e^(z_i)/e^m) / (Σ e^(z_j)/e^m) = e^(z_i - m) / Σ e^(z_j - m)\`. Cùng giá trị, tránh overflow.

**Độ phức tạp**: \`softmax\` \`O(K)\` (\`K\` = số lớp). Sigmoid \`O(1)\`.

**Kết quả demo** (sẽ in ra khi chạy \`go run solutions.go\`):
- Min/max sigmoid áp lên 1000 input random ∈ \`[-10, 10]\`: gần \`(0, 1)\`.
- Mọi tổng softmax 3-vector: 1.0 ± \`1e-12\`.

---

## Tiếp theo

- File code: [solutions.go](./solutions.go)
- Minh họa tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 06 — Hàm bậc 1 và bậc 2](../lesson-06-linear-quadratic/)
- Bài sau: [Lesson 08 — Hệ phương trình tuyến tính](../lesson-08-linear-systems/)
- Quay lại lộ trình Algebra: [Tầng 1 Algebra](../)
`;
