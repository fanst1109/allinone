// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Probability/lesson-05-normal-distribution/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Phân phối chuẩn (Gaussian / Normal Distribution)

> Tầng 5 (Probability) — Bài 5/8.
> Phân phối chuẩn là **trung tâm vũ trụ** của xác suất ứng dụng. Mọi loss function, mọi weight initialization, mọi noise model trong ML đều quay về Gaussian. Bài này dạy bạn "vì sao" và "dùng ra sao".

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Viết được PDF của Gaussian \`N(μ, σ²)\` và giải thích vai trò từng tham số.
2. Chuẩn hoá (standardize) một biến \`X ~ N(μ, σ²)\` về \`Z ~ N(0, 1)\`.
3. Áp dụng quy tắc **68-95-99.7** để ước lượng xác suất nhanh trong đầu.
4. Dùng bảng z-score (hoặc \`Φ(z)\`) để tính \`P(X ≤ x)\` cho Gaussian bất kỳ.
5. Phát biểu và áp dụng **Định lý giới hạn trung tâm (CLT)** — vì sao trung bình mẫu luôn Gaussian.
6. Đọc được Gaussian đa biến \`N(μ, Σ)\` và biết iso-density là ellipse.
7. Liên hệ Gaussian với các thuật toán ML thật: MSE, Xavier init, VAE, diffusion.

## Kiến thức tiền đề

- **[Lesson 04 — Biến ngẫu nhiên liên tục](../lesson-04-continuous-rv/)**: PDF, CDF, \`∫ f(x) dx = 1\`, \`P(a ≤ X ≤ b) = ∫_a^b f(x) dx\`.
- **[Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/)**: trực giác về mean, variance.
- **[Tầng 3 — Calculus](../../03-Calculus/)**: tích phân, hàm \`exp\`, đạo hàm.
- **[Tầng 4 — Linear Algebra](../../04-LinearAlgebra/)**: covariance matrix \`Σ\`, định thức, ma trận xác định dương — cần cho mục 8 (Gaussian đa biến).
- **[Tầng 1 — Algebra, Lesson 07 (luỹ thừa & log)](../../01-Algebra/lesson-07-exponentials-logs/)**: tính chất \`exp(a+b) = exp(a)·exp(b)\`.

> **Lời hứa của bài**: cuối bài bạn sẽ trả lời được câu hỏi *"vì sao một phân phối có công thức xấu xí với \`exp(-x²/2)\` lại xuất hiện ở khắp mọi nơi trong tự nhiên và ML?"* — câu trả lời nằm ở **CLT** và **maximum entropy**, mục 7 và mục 10.

---

## 1. Định nghĩa Gaussian \`N(μ, σ²)\`

### 💡 Trực giác trước công thức

Hãy hình dung **chiều cao** của 10 000 nam giới trưởng thành Việt Nam. Nếu vẽ histogram (cột tần suất):

- Phần lớn tập trung quanh 165 cm — đỉnh cao nhất ở giữa.
- Càng xa 165 cm theo cả 2 phía, số người càng giảm dần.
- Hình dạng đối xứng, "hai vai" cong xuống mượt như chuông úp ngược.

Đó là Gaussian. Hai tham số kiểm soát hình:

- **\`μ\` (mu — mean / kỳ vọng)**: vị trí đỉnh trên trục \`x\`. Ở ví dụ chiều cao, \`μ ≈ 165 cm\`.
- **\`σ\` (sigma — standard deviation / độ lệch chuẩn)**: "độ tròe" của chuông. \`σ\` nhỏ → chuông cao nhọn, phân tán ít. \`σ\` lớn → chuông thấp dẹt, phân tán nhiều.
- **\`σ²\` (variance / phương sai)**: bình phương của \`σ\`. Là đại lượng "kế toán" trong các công thức (vì nó cộng được — sẽ thấy ở Lesson 06).

### Công thức PDF

Một biến ngẫu nhiên liên tục \`X\` có phân phối chuẩn (Gaussian / Normal) với tham số \`μ ∈ ℝ\` và \`σ > 0\`, ký hiệu \`X ~ N(μ, σ²)\`, nếu PDF của nó là:

\`\`\`
                1              ⎛   (x - μ)²  ⎞
f(x) = ───────────────── · exp ⎜ − ─────────  ⎟
         σ · √(2π)             ⎝     2σ²     ⎠
\`\`\`

Hoặc viết gọn:

\`\`\`
f(x) = (1 / (σ√(2π))) · exp(−(x − μ)² / (2σ²)).
\`\`\`

### Giải mã từng phần của công thức

Đừng nhìn cả công thức một lần — chia thành 3 mảnh:

1. **\`(x − μ)²\`** ở tử số trong exp: đo "khoảng cách bình phương từ \`x\` đến đỉnh \`μ\`". Khi \`x = μ\` thì giá trị này = 0 → \`exp(0) = 1\` → đạt cực đại. Khi \`x\` rời xa \`μ\`, số mũ ngày càng âm → \`exp(số âm)\` → giảm về 0.
2. **\`2σ²\`** ở mẫu: chia khoảng cách bình phương cho "thước đo phân tán". Nếu \`σ\` lớn, mẫu lớn → tỉ lệ nhỏ → exp giảm chậm → chuông dẹt. Nếu \`σ\` nhỏ, mẫu nhỏ → tỉ lệ lớn → exp giảm nhanh → chuông nhọn.
3. **\`1 / (σ√(2π))\`** đứng trước: hằng số chuẩn hoá để tổng diện tích dưới đường cong = 1 (luật PDF, [Lesson 04](../lesson-04-continuous-rv/)). Tại sao chính xác là \`σ√(2π)\`? Vì \`∫_{-∞}^∞ exp(−u²/2) du = √(2π)\` — một kết quả "Gaussian integral" nổi tiếng (chứng minh dùng toạ độ cực, để dành cho lesson nâng cao).

### Kiểm tra cơ học: tại sao \`f(μ) = 1 / (σ√(2π))\`?

Thay \`x = μ\` vào:

\`\`\`
f(μ) = (1 / (σ√(2π))) · exp(−(μ − μ)² / (2σ²))
     = (1 / (σ√(2π))) · exp(0)
     = (1 / (σ√(2π))) · 1
     = 1 / (σ√(2π)).
\`\`\`

Đây là **giá trị lớn nhất** của PDF — đỉnh chuông.

### Tính chất quan trọng (sẽ chứng minh từng phần ở các mục sau)

| Tính chất | Phát biểu |
|-----------|-----------|
| Đối xứng | \`f(μ + d) = f(μ − d)\` với mọi \`d ≥ 0\`. |
| Đỉnh | Đạt cực đại tại \`x = μ\`. |
| Điểm uốn | Tại \`x = μ ± σ\` (đạo hàm bậc 2 đổi dấu). |
| Tổng diện tích | \`∫_{-∞}^∞ f(x) dx = 1\`. |
| \`E[X]\` | \`μ\`. |
| \`Var(X)\` | \`σ²\`. |

### ⚠ Lỗi thường gặp ngay từ đầu

- **Nhầm \`σ\` và \`σ²\`**. Khi đề bài viết \`N(0, 4)\`, có hai cách hiểu phổ biến:
  - Quy ước phổ biến (sách thống kê chuẩn, scipy, numpy \`loc\`, \`scale\`): tham số thứ hai là **variance \`σ²\`**. Vậy \`N(0, 4)\` có \`σ² = 4\`, \`σ = 2\`.
  - Một số tài liệu (đặc biệt sách kỹ thuật cũ) coi tham số thứ hai là \`σ\`. Vậy \`N(0, 4)\` có \`σ = 4\`, \`σ² = 16\`.
  Trong bài này **luôn dùng quy ước variance** — \`N(μ, σ²)\` nghĩa là tham số thứ hai là \`σ²\`. Trong code numpy/scipy phải nhớ: \`scipy.stats.norm(loc=μ, scale=σ)\` — scipy dùng \`σ\` (không phải \`σ²\`). Sai một chỗ là lệch toàn bộ kết quả.
- **Coi \`f(x)\` là xác suất**. Nó là **mật độ**, có thể \`> 1\` (ví dụ \`N(0, 0.01²)\` có \`f(0) ≈ 39.9\`). Xác suất là \`∫ f(x) dx\` trên một khoảng — xem [Lesson 04](../lesson-04-continuous-rv/) nhắc lại.

### ❓ Câu hỏi tự nhiên

- *"Sao công thức lại có \`2π\`? \`π\` của hình tròn liên quan gì tới Gaussian?"* → Đến từ tích phân \`∫ exp(−x²) dx\` chuyển sang toạ độ cực có yếu tố \`2π\` của góc đầy. Không phải trùng hợp, mà là biểu hiện của tính đẳng hướng (rotation-invariant) của Gaussian 2D — sẽ thấy lại ở mục 8.
- *"Tại sao mũ là \`−(x−μ)²/(2σ²)\` mà không phải bậc 4 hoặc bậc khác?"* → Bậc 2 là lựa chọn của **maximum entropy** dưới ràng buộc cố định mean & variance. Bài 10 (Q&A) sẽ giải đáp.

---

## 2. Walk-through 4 ví dụ với \`(μ, σ)\` khác nhau

Mục tiêu: tính \`f(x)\` tại vài điểm để cảm nhận shape thay đổi thế nào khi đổi \`μ\`, \`σ\`.

### Ví dụ 1 — \`N(0, 1²)\` (Standard Normal)

\`μ = 0\`, \`σ = 1\`, \`σ² = 1\`. PDF:

\`\`\`
f(x) = (1 / √(2π)) · exp(−x²/2)   với 1/√(2π) ≈ 0.3989.
\`\`\`

Tính tay:

| \`x\` | \`x²/2\` | \`exp(−x²/2)\` | \`f(x) = 0.3989 · exp(…)\` |
|-----|--------|--------------|--------------------------|
| 0   | 0      | 1            | **0.3989**               |
| 1   | 0.5    | 0.6065       | 0.2420                   |
| 2   | 2      | 0.1353       | 0.0540                   |
| 3   | 4.5    | 0.0111       | 0.0044                   |
| −2  | 2      | 0.1353       | 0.0540 (đối xứng)        |

Đỉnh \`f(0) = 0.3989\`. Tại \`x = ±σ = ±1\`, \`f(±1) ≈ 0.2420\` (= 60.7% so với đỉnh, đúng điểm uốn).

### Ví dụ 2 — \`N(0, 2²)\` (lệch chuẩn lớn gấp đôi)

\`μ = 0\`, \`σ = 2\`, \`σ² = 4\`. Hệ số chuẩn hoá: \`1/(2·√(2π)) ≈ 0.1995\`. PDF:

\`\`\`
f(x) = 0.1995 · exp(−x²/8).
\`\`\`

| \`x\` | \`x²/8\` | \`exp(−x²/8)\` | \`f(x) = 0.1995 · exp(…)\` |
|-----|--------|--------------|--------------------------|
| 0   | 0      | 1            | **0.1995**               |
| 1   | 0.125  | 0.8825       | 0.1760                   |
| 2   | 0.5    | 0.6065       | 0.1210                   |
| 4   | 2      | 0.1353       | 0.0270                   |

So với ví dụ 1: đỉnh giảm còn **một nửa** (0.1995 vs 0.3989). Chuông thấp hơn và dẹt hơn — đúng trực giác \`σ\` lớn → phân tán nhiều.

### Ví dụ 3 — \`N(5, 1²)\` (dịch sang phải)

\`μ = 5\`, \`σ = 1\`. PDF:

\`\`\`
f(x) = 0.3989 · exp(−(x−5)²/2).
\`\`\`

| \`x\` | \`(x−5)²/2\` | \`exp(…)\`  | \`f(x)\`     |
|-----|------------|-----------|------------|
| 5   | 0          | 1         | **0.3989** |
| 6   | 0.5        | 0.6065    | 0.2420     |
| 7   | 2          | 0.1353    | 0.0540     |
| 3   | 2          | 0.1353    | 0.0540     |

Cùng **shape** với ví dụ 1, nhưng đỉnh **dịch** sang \`x = 5\`. \`μ\` chỉ chuyển đường cong sang trái/phải, không đổi shape.

### Ví dụ 4 — \`N(100, 15²)\` (IQ-style)

Đây là phân phối IQ truyền thống: \`μ = 100\`, \`σ = 15\`. Hệ số: \`1/(15·√(2π)) ≈ 0.02660\`. PDF:

\`\`\`
f(x) = 0.02660 · exp(−(x−100)² / 450).
\`\`\`

| \`x\` | \`(x−100)²\` | \`(x−100)²/450\` | \`exp(…)\`  | \`f(x)\`     |
|-----|------------|----------------|-----------|------------|
| 100 | 0          | 0              | 1         | **0.02660** |
| 115 | 225        | 0.5            | 0.6065    | 0.01614    |
| 130 | 900        | 2              | 0.1353    | 0.00360    |
| 145 | 2025       | 4.5            | 0.0111    | 0.00030    |
| 70  | 900        | 2              | 0.1353    | 0.00360    |

Đỉnh **rất thấp** (\`0.02660\`) so với ví dụ 1 (\`0.3989\`) — vì diện tích phải = 1, nên \`σ = 15\` dàn diện tích ra rộng, chiều cao đỉnh giảm.

### 🔁 Dừng lại tự kiểm tra

Với \`N(2, 3²)\`, tính \`f(2)\` và \`f(5)\`. Kết quả \`f(5)\` bằng bao nhiêu lần \`f(2)\`?

<details>
<summary>Lời giải</summary>

\`μ = 2\`, \`σ = 3\`, hệ số \`1/(3√(2π)) ≈ 0.1330\`.

- \`f(2)\` = \`0.1330 · exp(0)\` = **0.1330**.
- \`f(5)\` = \`0.1330 · exp(−(5−2)²/(2·9))\` = \`0.1330 · exp(−9/18)\` = \`0.1330 · exp(−0.5)\` = \`0.1330 · 0.6065\` ≈ **0.0807**.
- Tỉ lệ \`f(5)/f(2) = exp(−0.5) ≈ 0.6065\` (đúng 60.65%, tương ứng vị trí \`μ + σ\`).

</details>

### 📝 Tóm tắt mục 2

- \`μ\` dịch chuông sang trái/phải, **không** đổi shape.
- \`σ\` lớn → chuông dẹt và thấp hơn (đỉnh = \`1/(σ√(2π))\`).
- Mọi Gaussian đều **đối xứng** quanh \`μ\` và **đỉnh duy nhất** tại \`x = μ\`.
- Tỉ lệ \`f(x)/f(μ) = exp(−(x−μ)²/(2σ²))\` — chỉ phụ thuộc khoảng cách tính bằng \`σ\`.

---

## 3. Standard Normal \`N(0, 1)\` và phép chuẩn hoá (standardization)

### Định nghĩa Standard Normal

\`Z ~ N(0, 1)\` là Gaussian với \`μ = 0\`, \`σ = 1\`. Ký hiệu PDF riêng là \`φ(z)\`:

\`\`\`
φ(z) = (1/√(2π)) · exp(−z²/2).
\`\`\`

Lý do quan trọng:

1. **Có bảng tra cứu sẵn** — \`Φ(z)\` (CDF) được lập bảng từ thế kỷ 19, mọi thầy cô đều phát cho học sinh.
2. **Tham chiếu phổ quát** — mọi câu hỏi về Gaussian tổng quát đều có thể quy về \`N(0, 1)\` bằng phép chuẩn hoá.

### Phép chuẩn hoá (standardization)

Nếu \`X ~ N(μ, σ²)\`, định nghĩa:

\`\`\`
Z = (X − μ) / σ.
\`\`\`

Thì \`Z ~ N(0, 1)\`. Đây là một trong những công cụ mạnh nhất trong xác suất ứng dụng.

#### Chứng minh nhanh (không dùng "dễ thấy"):

- **Bước 1: \`E[Z] = 0\`.** \`E[Z] = E[(X − μ)/σ] = (E[X] − μ)/σ = (μ − μ)/σ = 0\`. ✓
- **Bước 2: \`Var(Z) = 1\`.** \`Var(Z) = Var((X − μ)/σ) = (1/σ²) · Var(X − μ) = (1/σ²) · Var(X) = σ²/σ² = 1\` (vì \`Var(c) = 0\` cho hằng số \`c = μ\`, và \`Var(aY) = a²Var(Y)\` — sẽ chứng minh ở [Lesson 06](../lesson-06-expectation-variance/)). ✓
- **Bước 3: Z vẫn là Gaussian.** Đây là **tính chất bảo toàn** của Gaussian: nếu \`X ~ N(μ, σ²)\` và \`Y = aX + b\` (\`a ≠ 0\`), thì \`Y ~ N(aμ + b, a²σ²)\`. Áp dụng \`a = 1/σ\`, \`b = −μ/σ\` → \`Z ~ N(0, 1)\`. Tính chất này dùng **change of variables** cho PDF, có ở [Lesson 04](../lesson-04-continuous-rv/) mục đổi biến.

### Walk-through chuẩn hoá

**Ví dụ**: chiều cao nam giới \`X ~ N(165, 5²)\` (cm). Một người cao 175 cm có giá trị \`Z\` là bao nhiêu?

\`\`\`
Z = (175 − 165) / 5 = 10/5 = 2.
\`\`\`

Nghĩa là người đó cao hơn trung bình **đúng 2 độ lệch chuẩn**. Sau khi chuẩn hoá, ta không quan tâm đơn vị (cm, kg, USD, IQ...) — chỉ quan tâm "cách \`μ\` bao nhiêu \`σ\`".

**Ví dụ 2**: IQ \`X ~ N(100, 15²)\`. Người có IQ = 130 có \`Z = (130 − 100)/15 = 2\`. Người có IQ = 70 có \`Z = (70 − 100)/15 = −2\`. Cả hai đều "cách trung bình 2σ" — chỉ khác chiều.

### Suy ngược: tính xác suất

Để tính \`P(X ≤ x)\` cho \`X ~ N(μ, σ²)\`:

\`\`\`
P(X ≤ x) = P((X − μ)/σ ≤ (x − μ)/σ) = P(Z ≤ z) = Φ(z),

với z = (x − μ)/σ.
\`\`\`

Ví dụ với IQ ở trên: tỉ lệ người có IQ ≤ 130 là \`Φ(2) ≈ 0.9772\` → **97.72%** dân số có IQ ≤ 130, tức chỉ ~2.28% có IQ > 130.

### ⚠ Lỗi thường gặp

- **Quên chia cho \`σ\`**, chỉ trừ đi \`μ\`. Sai. \`Z = (X − μ)/σ\`, không phải \`X − μ\`.
- **Khi \`σ\` đo bằng đơn vị khác \`(X − μ)\`** — luôn kiểm tra đơn vị. Nếu \`X\` tính cm thì \`σ\` cũng cm; \`Z\` không đơn vị (vô thứ nguyên).

### 🔁 Dừng lại tự kiểm tra

Cho \`X ~ N(50, 10²)\`. Tính \`Z\` ứng với \`x = 65\`, \`x = 30\`, \`x = 50\`.

<details>
<summary>Lời giải</summary>

- \`x = 65\`: \`Z = (65 − 50)/10 = 1.5\`.
- \`x = 30\`: \`Z = (30 − 50)/10 = −2\`.
- \`x = 50\`: \`Z = (50 − 50)/10 = 0\`. (Đúng giá trị \`μ\` → \`Z = 0\`.)

</details>

### 📝 Tóm tắt mục 3

- \`N(0, 1)\` là Gaussian "tham chiếu" với PDF \`φ(z) = (1/√(2π))·exp(−z²/2)\`.
- \`Z = (X − μ)/σ\` chuyển mọi Gaussian về Standard Normal.
- Sau chuẩn hoá, mọi câu hỏi về \`X\` đều dùng bảng \`Φ(z)\` để tra cứu.

---

## 4. Quy tắc 68-95-99.7 (Empirical Rule)

### Phát biểu

Cho \`X ~ N(μ, σ²)\`:

| Khoảng | Xác suất chứa X |
|--------|-----------------|
| \`[μ − σ, μ + σ]\` | ≈ **68.27%** |
| \`[μ − 2σ, μ + 2σ]\` | ≈ **95.45%** |
| \`[μ − 3σ, μ + 3σ]\` | ≈ **99.73%** |

Gọi tắt là **quy tắc 68-95-99.7**.

### Vì sao có những con số này — walk-through

Dùng phép chuẩn hoá: \`P(μ − σ ≤ X ≤ μ + σ) = P(−1 ≤ Z ≤ 1) = Φ(1) − Φ(−1)\`.

Tra bảng:

- \`Φ(1) ≈ 0.84134\`.
- \`Φ(−1) = 1 − Φ(1) ≈ 0.15866\` (do đối xứng).
- Hiệu: \`0.84134 − 0.15866 = 0.68268\` ≈ **68.27%**. ✓

Tương tự:

- \`Φ(2) ≈ 0.97725\`, \`Φ(−2) ≈ 0.02275\` → hiệu = \`0.95450\` ≈ **95.45%**. ✓
- \`Φ(3) ≈ 0.99865\`, \`Φ(−3) ≈ 0.00135\` → hiệu = \`0.99730\` ≈ **99.73%**. ✓

### Ứng dụng nhanh

**Ví dụ 1**: chiều cao \`X ~ N(165, 5²)\`. Khoảng nào chứa ~68% dân số?

\`[165 − 5, 165 + 5] = [160, 170]\` (cm). 95% rơi trong \`[155, 175]\`, 99.7% rơi trong \`[150, 180]\`.

**Ví dụ 2**: chế tạo bu-lông, đường kính \`X ~ N(10, 0.05²)\` (mm). Spec cho phép \`10 ± 0.10\` mm (tức ± 2σ). Tỉ lệ phế phẩm?

Tỉ lệ trong spec = \`P(|X − 10| ≤ 0.10) = P(|Z| ≤ 2) ≈ 95.45%\`.
Tỉ lệ ngoài spec (phế phẩm) ≈ **4.55%**.

Nếu nhà máy muốn giảm phế phẩm xuống dưới 0.3%, phải mở rộng spec lên ±3σ = ±0.15 mm (hoặc cải tiến công nghệ để giảm \`σ\`).

**Ví dụ 3 — Six Sigma**: triết lý "chất lượng 6σ" của Motorola: muốn lỗi \`< 3.4\` phần triệu (\`< 0.00034%\`). Mở rộng spec ± 6σ → \`P(|Z| > 6) ≈ 2 · 10⁻⁹\` — quá khắt khe, thực tế họ chấp nhận shift 1.5σ, ra con số 3.4 ppm.

### ⚠ Lỗi thường gặp

- **Nhầm \`68%\` thành xác suất cho khoảng đối xứng \`[μ, μ + σ]\` (một phía)**. Đúng là **hai phía**, \`[μ − σ, μ + σ]\`. Một phía là 34.13%.
- **Áp dụng quy tắc cho non-Gaussian**. Quy tắc 68-95-99.7 chỉ đúng với Gaussian. Phân phối khác (đặc biệt heavy-tail như Cauchy) có thể có \`P(|X − μ| ≤ σ)\` khác xa.

### ❓ Câu hỏi tự nhiên

- *"Sao 68 mà không phải 70 cho dễ nhớ?"* → Vì đó là kết quả của tích phân \`∫_{-1}^{1} (1/√(2π))exp(−z²/2)dz = 0.6827\`, không tròn được. Nhớ con số chính xác nếu cần, hoặc nhớ "khoảng 2/3".
- *"Nếu cần xác suất chính xác 95%, dùng z nào?"* → Không phải \`z = 2\` mà là **\`z = 1.96\`**. \`P(|Z| ≤ 1.96) = 0.95000\`. Đây là số "kinh thánh" của thống kê (95% confidence interval).
- *"Tại sao ML hay nói \`±3σ\`?"* → Vì 99.7% gần như "chắc chắn"; phát hiện outlier (anomaly detection) thường lấy ngưỡng \`|Z| > 3\`.

### 🔁 Dừng lại tự kiểm tra

Điểm thi \`X ~ N(70, 10²)\`. Xác suất một thí sinh ngẫu nhiên đạt:
(a) Điểm trong \`[60, 80]\`?
(b) Điểm trên 90?

<details>
<summary>Lời giải</summary>

(a) \`[60, 80] = [70 − 10, 70 + 10] = [μ − σ, μ + σ]\` → P ≈ **68.27%**.

(b) \`P(X > 90) = P(Z > (90−70)/10) = P(Z > 2) = 1 − Φ(2) ≈ 1 − 0.97725 = 0.02275\` → ~**2.28%**.

</details>

### 📝 Tóm tắt mục 4

- 68% ≈ 1σ, 95% ≈ 2σ, 99.7% ≈ 3σ — quy tắc "trong đầu".
- 95% chính xác ứng với z = 1.96 (không phải 2).
- Six Sigma = chấp nhận phế phẩm cực thấp dựa trên đuôi Gaussian.

---

## 5. CDF Φ(z) và bảng z-score

### Định nghĩa Φ(z)

CDF (cumulative distribution function) của Standard Normal:

\`\`\`
Φ(z) = P(Z ≤ z) = ∫_{-∞}^{z} (1/√(2π)) · exp(−t²/2) dt.
\`\`\`

**Tính chất**:

- \`Φ(−∞) = 0\`, \`Φ(+∞) = 1\`.
- \`Φ(0) = 0.5\` (đối xứng → đỉnh CDF qua 1/2 tại trung điểm).
- \`Φ(−z) = 1 − Φ(z)\` (đối xứng).
- Không có biểu thức "khép kín" qua hàm sơ cấp — phải dùng bảng hoặc xấp xỉ số. Hàm \`erf\` có liên hệ: \`Φ(z) = 0.5 · (1 + erf(z/√2))\`.

### Bảng z-score (extract)

| z     | Φ(z)    | z    | Φ(z)    |
|-------|---------|------|---------|
| 0.00  | 0.5000  | 1.60 | 0.9452  |
| 0.25  | 0.5987  | 1.65 | 0.9505  |
| 0.50  | 0.6915  | 1.96 | 0.9750  |
| 0.75  | 0.7734  | 2.00 | 0.9772  |
| 1.00  | 0.8413  | 2.33 | 0.9901  |
| 1.28  | 0.8997  | 2.58 | 0.9951  |
| 1.50  | 0.9332  | 3.00 | 0.9987  |

(Cho \`z < 0\`: dùng \`Φ(−z) = 1 − Φ(z)\`.)

### Quy trình tính xác suất tổng quát

**Bài toán**: cho \`X ~ N(μ, σ²)\`, tính \`P(a ≤ X ≤ b)\`.

**Bước 1**: Chuẩn hoá hai cận.
\`\`\`
z_a = (a − μ)/σ,   z_b = (b − μ)/σ.
\`\`\`

**Bước 2**: Tra bảng.
\`\`\`
P(a ≤ X ≤ b) = Φ(z_b) − Φ(z_a).
\`\`\`

### Walk-through tổng hợp

**Bài toán**: \`X ~ N(165, 5²)\`. Tính \`P(160 ≤ X ≤ 175)\`.

- \`z_a = (160 − 165)/5 = −1\`.
- \`z_b = (175 − 165)/5 = +2\`.
- \`Φ(z_b) = Φ(2) = 0.9772\`.
- \`Φ(z_a) = Φ(−1) = 1 − Φ(1) = 1 − 0.8413 = 0.1587\`.
- \`P = 0.9772 − 0.1587 = 0.8185\` ≈ **81.85%**.

Kiểm tra trực giác: khoảng [160, 175] bao phủ "1σ phía trái + 2σ phía phải". \`34.13% + 47.73% = 81.86%\` ≈ kết quả tính (lệch do làm tròn). ✓

### Tính một phía

- \`P(X ≥ x)\`: dùng \`1 − Φ(z)\`.
- Ví dụ: \`P(X ≥ 180)\` với \`X ~ N(165, 5²)\`. \`z = 3\`. \`P = 1 − Φ(3) = 1 − 0.9987 = 0.0013\` → ~0.13%.

### ⚠ Lỗi thường gặp

- **Nhầm \`Φ\` với PDF \`φ\`** — \`Φ\` (CDF, hoa) là tích phân tích lũy; \`φ\` (PDF, thường) là mật độ.
- **Quên \`Φ(−z) = 1 − Φ(z)\`** — nhiều bảng chỉ liệt kê z ≥ 0, phải tự suy.
- **Quên cận** — \`P(X ≤ x)\` khác \`P(X < x)\`? Với phân phối liên tục, **bằng nhau** (xem [Lesson 04](../lesson-04-continuous-rv/)).

### 📝 Tóm tắt mục 5

- \`Φ(z) = P(Z ≤ z)\` là CDF của Standard Normal, không có công thức kín nhưng có bảng.
- Tính \`P(a ≤ X ≤ b)\` = \`Φ(z_b) − Φ(z_a)\` sau khi chuẩn hoá.
- \`Φ(−z) = 1 − Φ(z)\` — luôn nhớ tính đối xứng.

---

## 6. Định lý giới hạn trung tâm (Central Limit Theorem — CLT)

CLT là **lý do** Gaussian xuất hiện khắp nơi. Đây là phần quan trọng nhất của bài.

### 💡 Trực giác trước khi vào công thức

Bạn tung 1 con xúc xắc 6 mặt. Kết quả \`X\` có phân phối đều (\`P(X = k) = 1/6\` với \`k = 1, ..., 6\`) — không phải Gaussian, mà là phẳng.

Bây giờ tung **2 con** và lấy trung bình \`X̄ = (X₁ + X₂)/2\`. Phân phối của \`X̄\` là gì? Không còn đều — đỉnh ở 3.5, hai bên giảm dần (giống tam giác).

Tung **30 con** và lấy trung bình. Phân phối của \`X̄\` là gì? **Gần như Gaussian hoàn hảo** quanh \`μ = 3.5\`.

**Điều kỳ lạ**: phân phối gốc (uniform) hoàn toàn không phải Gaussian, nhưng **trung bình** lại Gaussian. Và quy luật này không phụ thuộc loại phân phối gốc — Bernoulli, Exponential, lognormal..., tất cả khi lấy trung bình đủ nhiều sample đều cho ra Gaussian.

Đó là CLT.

### Phát biểu chính xác

Cho \`X₁, X₂, ..., X_n\` là các biến ngẫu nhiên **iid** (independent and identically distributed) với:

- Mean \`E[Xᵢ] = μ\` (hữu hạn).
- Variance \`Var(Xᵢ) = σ²\` (hữu hạn, \`σ > 0\`).

Gọi \`X̄ₙ = (X₁ + X₂ + ... + Xₙ)/n\` là trung bình mẫu. Khi \`n → ∞\`:

\`\`\`
(X̄ₙ − μ) / (σ/√n)   ⟶   N(0, 1)   (hội tụ về phân phối, in distribution).
\`\`\`

Tương đương: với \`n\` lớn,

\`\`\`
X̄ₙ  ≈  N(μ, σ²/n).
\`\`\`

Sai số chuẩn của trung bình mẫu là \`σ/√n\` — giảm theo \`√n\` (đây là "luật \`√n\`" cơ bản của thống kê).

### Walk-through CLT với Uniform[0, 1]

Cho mỗi \`Xᵢ ~ Uniform[0, 1]\`. Biết:

- \`μ = E[X] = 0.5\`.
- \`σ² = Var(X) = 1/12 ≈ 0.0833\`. (Sẽ chứng minh ở [Lesson 06](../lesson-06-expectation-variance/), tạm chấp nhận: tích phân \`∫₀¹ (x − 0.5)² dx = 1/12\`.)
- \`σ = 1/√12 ≈ 0.2887\`.

#### \`n = 1\`: phân phối là Uniform — phẳng.

\`f(x) = 1\` trên \`[0, 1]\`. Đỉnh phẳng từ 0 đến 1, không có dạng chuông.

#### \`n = 2\`: phân phối là tam giác.

\`X̄₂ = (X₁ + X₂)/2\`. PDF của \`X̄₂\` có dạng tam giác:
- Đỉnh tại \`x̄ = 0.5\` với giá trị PDF = 2.
- Giá trị tại biên \`x̄ = 0\` và \`x̄ = 1\` là 0.

Còn chưa phải Gaussian, nhưng đã có dáng "đỉnh ở giữa, giảm dần ra biên".

#### \`n = 12\`: gần như Gaussian.

CLT nói \`X̄₁₂ ≈ N(0.5, (1/12)/12) = N(0.5, 1/144)\`. Vậy σ của \`X̄₁₂\` ≈ \`1/12 ≈ 0.0833\`.

Lấy mẫu mô phỏng (1 triệu lần) → vẽ histogram → trùng khít với \`N(0.5, 1/144)\`.

#### \`n = 30\`: cực kỳ Gaussian.

\`X̄₃₀ ≈ N(0.5, 1/360)\`, σ ≈ \`0.0527\`. Hình dạng gần như indistinguishable với Gaussian thật.

### Sample numeric: kiểm tra CLT bằng tay

Lấy 5 lần mẫu \`n = 4\` từ Uniform[0,1] (giả lập):

| Lần | X₁    | X₂    | X₃    | X₄    | \`X̄\` |
|-----|-------|-------|-------|-------|--------|
| 1   | 0.23  | 0.81  | 0.45  | 0.67  | 0.540  |
| 2   | 0.91  | 0.12  | 0.55  | 0.40  | 0.495  |
| 3   | 0.05  | 0.78  | 0.62  | 0.30  | 0.4375 |
| 4   | 0.66  | 0.50  | 0.21  | 0.89  | 0.565  |
| 5   | 0.34  | 0.42  | 0.71  | 0.50  | 0.4925 |

Trung bình của 5 giá trị \`X̄\`: \`(0.540 + 0.495 + 0.4375 + 0.565 + 0.4925)/5 = 0.506\` (rất gần \`μ = 0.5\`). Variance giảm so với mẫu đơn lẻ — đúng \`σ²/n = 1/48\`.

Với mô phỏng thật (xem viz), 5 lần là chưa đủ thấy Gaussian — cần hàng nghìn mẫu để histogram lộ shape chuông.

### Walk-through CLT với Bernoulli

\`Xᵢ ~ Bernoulli(p = 0.3)\`, \`μ = 0.3\`, \`σ² = p(1−p) = 0.21\`, \`σ ≈ 0.458\`.

Sum \`Sₙ = X₁ + ... + Xₙ ~ Binomial(n, p)\`. CLT nói:

\`\`\`
Sₙ ≈ N(np, np(1−p))    (với n đủ lớn).
\`\`\`

Với \`n = 100\`, \`p = 0.3\`: \`Sₙ ≈ N(30, 21)\`. Standard deviation \`√21 ≈ 4.58\`.

Xác suất \`P(S₁₀₀ ≤ 25)\`? Chuẩn hoá: \`z = (25 − 30)/4.58 ≈ −1.09\`. \`Φ(−1.09) ≈ 0.1379\` → ~13.79%. (So với tính chính xác từ Binomial — gần như y hệt.)

Đây là cách xấp xỉ Binomial bằng Normal — kỹ thuật "**Normal approximation to Binomial**", chuẩn cho \`np ≥ 5\` và \`n(1−p) ≥ 5\`.

### Walk-through CLT với Exponential

\`Xᵢ ~ Exp(λ = 1)\`. \`μ = 1/λ = 1\`, \`σ = 1/λ = 1\` (Exponential có tail dài, không đối xứng).

\`n = 1\`: PDF \`f(x) = e^{−x}\` — heavily right-skewed, không Gaussian.
\`n = 30\`: \`X̄₃₀ ≈ N(1, 1/30)\`. Skewness gần như biến mất, chuông đối xứng quanh 1.

Đây là lý do CLT mạnh: **bất kể** distribution gốc skew thế nào, đủ sample là ra Gaussian.

### Khi nào CLT "hết hiệu lực"?

CLT yêu cầu mean và variance hữu hạn. Một số phân phối heavy-tail vi phạm:

- **Cauchy distribution**: PDF \`f(x) = 1/(π(1+x²))\`. Mean **không tồn tại** (tích phân phân kỳ). Trung bình của n samples Cauchy vẫn là Cauchy, KHÔNG hội tụ Gaussian. Đây là phản ví dụ kinh điển.
- **Pareto với α ≤ 2**: variance vô hạn → CLT cổ điển fail, phải dùng **CLT tổng quát** (stable distributions).

### ❓ Câu hỏi tự nhiên

- *"\`n\` phải lớn cỡ nào để dùng CLT?"* — Rule of thumb: \`n ≥ 30\` cho phân phối "không quá lệch"; \`n ≥ 100\` cho phân phối lệch mạnh (Exponential, lognormal). Với Bernoulli kiểm tra \`np ≥ 5\` và \`n(1−p) ≥ 5\`.
- *"Tại sao là \`√n\` mà không phải \`n\`?"* — Vì \`Var(Sₙ) = nσ²\` (cộng độc lập) → \`Var(X̄ₙ) = σ²/n\` → \`SD(X̄ₙ) = σ/√n\`. Đó là gốc rễ của "luật √n" — muốn giảm sai số 10 lần phải lấy 100 lần dữ liệu.
- *"Tại sao CLT lại là Gaussian, không phải phân phối khác?"* — Vì Gaussian là **fixed point** của phép "trộn nhiều biến iid". Tổng 2 Gaussian vẫn Gaussian (sẽ thấy sau). Theorem rộng hơn: **stable distributions** — Gaussian là một trường hợp đặc biệt (α = 2) của họ stable.

### 🔁 Dừng lại tự kiểm tra

Một cuộc thăm dò: hỏi 400 người "có dùng smartphone không?". Tỉ lệ thật trong dân số là \`p = 0.7\`.

(a) Phân phối số người trả lời "có" \`S₄₀₀ ~ ?\`
(b) Xấp xỉ Gaussian — viết phân phối.
(c) \`P(S₄₀₀ ≥ 290)\` ≈ ?

<details>
<summary>Lời giải</summary>

(a) \`S₄₀₀ ~ Binomial(400, 0.7)\`.

(b) \`np = 280\`, \`np(1−p) = 84\`. \`S₄₀₀ ≈ N(280, 84)\`, \`σ ≈ 9.17\`.

(c) \`z = (290 − 280)/9.17 ≈ 1.09\`. \`P(S ≥ 290) = 1 − Φ(1.09) ≈ 1 − 0.8621 = 0.1379\` → ~**13.79%**.

</details>

### 📝 Tóm tắt mục 6

- CLT: trung bình của n iid samples với mean μ, variance σ² → \`N(μ, σ²/n)\` khi \`n → ∞\`.
- Sai số chuẩn của trung bình mẫu = \`σ/√n\` ("luật √n").
- Bất kể phân phối gốc (nếu mean & variance hữu hạn), trung bình mẫu luôn Gaussian.
- Phản ví dụ: Cauchy (mean không tồn tại) — CLT fail.

---

## 7. Gaussian đa biến \`N(μ, Σ)\` — giới thiệu nhẹ

Bài [Tầng 4 — Linear Algebra](../../04-LinearAlgebra/) đã giới thiệu **covariance matrix \`Σ\`**. Bây giờ ta dùng nó để định nghĩa Gaussian trong không gian nhiều chiều.

### 💡 Trực giác

Gaussian 1D là chuông. Gaussian 2D là **đỉnh đồi**: nhìn từ trên xuống thấy các **iso-density contour** (đường cùng mật độ) là **ellipse**. Hai trường hợp:

- Nếu hai chiều **độc lập** (covariance = 0) và cùng \`σ\`: contour là **hình tròn** (Gaussian "isotropic").
- Nếu hai chiều có correlation: contour là **ellipse nghiêng**.

### Công thức PDF

Cho vector ngẫu nhiên \`X = (X₁, ..., X_d)ᵀ\` trong \`ℝ^d\`. \`X ~ N(μ, Σ)\` với:

- \`μ ∈ ℝ^d\` là vector kỳ vọng.
- \`Σ ∈ ℝ^{d×d}\` là covariance matrix, đối xứng và xác định dương.

PDF:

\`\`\`
f(x) = (1 / ((2π)^{d/2} · |Σ|^{1/2})) · exp(−0.5 · (x − μ)ᵀ Σ⁻¹ (x − μ)).
\`\`\`

Trong đó \`|Σ|\` là **định thức** (xem [Tầng 4](../../04-LinearAlgebra/)), \`Σ⁻¹\` là **nghịch đảo** ma trận hiệp phương sai.

### So sánh với 1D

Khi \`d = 1\`: \`Σ\` thu lại thành \`[σ²]\` (1×1). \`|Σ| = σ²\`, \`|Σ|^{1/2} = σ\`. \`Σ⁻¹ = 1/σ²\`. \`(x − μ)ᵀ Σ⁻¹ (x − μ) = (x − μ)²/σ²\`. Thay vào:

\`\`\`
f(x) = (1 / ((2π)^{1/2} · σ)) · exp(−0.5 · (x − μ)²/σ²)
     = (1 / (σ√(2π))) · exp(−(x − μ)²/(2σ²)).
\`\`\`

Đúng công thức Gaussian 1D ở mục 1. ✓ Không phải trùng hợp — multivariate là tổng quát hoá tự nhiên.

### Ví dụ 2D cụ thể

\`d = 2\`, \`μ = (0, 0)\`, \`Σ = [[1, 0.6], [0.6, 1]]\` (correlation \`ρ = 0.6\`).

- \`|Σ| = 1·1 − 0.6·0.6 = 1 − 0.36 = 0.64\`. \`|Σ|^{1/2} = 0.8\`.
- \`Σ⁻¹ = (1/0.64) · [[1, −0.6], [−0.6, 1]] ≈ [[1.5625, −0.9375], [−0.9375, 1.5625]]\`.
- Tại \`x = (0, 0)\`: \`f(0,0) = 1/((2π)·0.8) ≈ 0.199\`.
- Tại \`x = (1, 1)\`: số mũ = \`−0.5 · (1·1.5625·1 + 2·1·(−0.9375)·1 + 1·1.5625·1) = −0.5 · (1.5625 − 1.875 + 1.5625) = −0.5 · 1.25 = −0.625\`. \`f(1, 1) = 0.199 · exp(−0.625) ≈ 0.199 · 0.535 ≈ 0.107\`.
- Tại \`x = (1, −1)\` (đi ngược correlation): số mũ = \`−0.5 · (1.5625 + 2·(−0.9375)·(−1) + 1.5625) = −0.5 · (1.5625 + 1.875 + 1.5625) = −0.5 · 5 = −2.5\`. \`f(1, −1) = 0.199 · exp(−2.5) ≈ 0.199 · 0.0821 ≈ 0.0163\`.

So sánh: \`f(1, 1)\` lớn hơn \`f(1, −1)\` ~ 6.5 lần. Vì \`ρ = 0.6 > 0\` → hai chiều có xu hướng cùng dấu, nên \`(1, 1)\` "hợp xu hướng" hơn \`(1, −1)\`.

### Iso-density ellipse

\`f(x) = c\` (hằng số) ⟺ \`(x − μ)ᵀ Σ⁻¹ (x − μ) = const\`. Đây là phương trình ellipse trong \`ℝ^d\`. Trục chính của ellipse trùng với **eigenvectors** của \`Σ\`, độ dài bán trục tỉ lệ với \`√(eigenvalue)\`. (Liên hệ thẳng với PCA — xem [Tầng 4](../../04-LinearAlgebra/).)

### Liên hệ sẽ gặp lại

- **Lesson 06 (Tầng 5)**: \`Σᵢⱼ = Cov(Xᵢ, Xⱼ)\`. Định nghĩa chính thức của hiệp phương sai.
- **Tầng 6 — AI/ML**: GMM (Gaussian Mixture Model), VAE, các mô hình generative — đều cần multivariate Gaussian.

### 📝 Tóm tắt mục 7

- \`N(μ, Σ)\` tổng quát Gaussian sang \`ℝ^d\`.
- \`Σ\` đối xứng xác định dương, kiểm soát "shape ellipse" của iso-density.
- Trục chính của ellipse = eigenvectors của \`Σ\` (cầu nối với PCA).

---

## 8. Liên hệ với Machine Learning

Tại sao Gaussian "chiếm sóng" toàn bộ ML?

### 8.1. Linear Regression với Gaussian noise → MSE

Mô hình:

\`\`\`
y = wx + b + ε,    với ε ~ N(0, σ²).
\`\`\`

Tức là cho mỗi \`x\`, \`y\` lệch khỏi đường thẳng \`wx + b\` một sai số Gaussian. Likelihood của dataset \`{(xᵢ, yᵢ)}\`:

\`\`\`
L(w, b) = ∏ᵢ f(yᵢ | xᵢ; w, b)
       = ∏ᵢ (1/(σ√(2π))) · exp(−(yᵢ − wxᵢ − b)² / (2σ²)).
\`\`\`

Log-likelihood (chuyển tích thành tổng):

\`\`\`
log L = −n·log(σ√(2π)) − (1/(2σ²)) · Σᵢ (yᵢ − wxᵢ − b)².
\`\`\`

Maximum likelihood (chọn \`w, b\` để \`log L\` lớn nhất) ⟺ minimum \`Σᵢ (yᵢ − wxᵢ − b)²\` (vì các hằng số khác không phụ thuộc \`w, b\`). Đó chính là **Mean Squared Error (MSE)**.

**Kết luận**: chọn MSE làm loss = giả định ngầm "noise là Gaussian". Đây là một trong những liên kết quan trọng nhất giữa thống kê và ML. Sẽ chứng minh chi tiết ở [Lesson 07 — MLE](../lesson-07-mle/).

### 8.2. Weight initialization (Xavier, He)

Khi khởi tạo weights của neural network, ta dùng Gaussian (hoặc Uniform tương đương).

- **Xavier (Glorot) init**: \`W ~ N(0, 1/n_in)\` — giữ variance signal không co/giãn qua lớp tuyến tính.
- **He init**: \`W ~ N(0, 2/n_in)\` — phiên bản cho ReLU (chỉ một nửa neuron active).

Tại sao Gaussian? Tại sao không Uniform? Vì:

1. CLT — tổng nhiều weight Gaussian sau khi nhân input → kết quả vẫn Gaussian. Dễ tracking variance.
2. Symmetric → tránh bias systematique.
3. Khả vi mượt → tốt cho gradient descent.

Sẽ thấy Xavier/He vận hành thực tế ở Tầng 6.

### 8.3. Diffusion models — forward process

Diffusion (Stable Diffusion, Sora, ...) dùng Gaussian noise theo cách rất đẹp:

- Bắt đầu với ảnh \`x₀\`.
- Mỗi step \`t\`: thêm Gaussian noise nhỏ. \`xₜ = √(1 − βₜ) · xₜ₋₁ + √βₜ · ε\`, \`ε ~ N(0, I)\`.
- Sau đủ T bước (~ 1000): \`x_T ≈ N(0, I)\` — ảnh biến thành pure noise.
- Train neural network để **đảo ngược** quá trình: từ noise tạo lại ảnh.

Sức mạnh: vì Gaussian "stable" (tổng các Gaussian là Gaussian), ta có closed-form \`q(xₜ | x₀) = N(√ᾱₜ · x₀, (1 − ᾱₜ)I)\` — không cần mô phỏng từng bước.

### 8.4. Variational Autoencoder (VAE)

Latent space của VAE: mỗi data point \`x\` ánh xạ thành phân phối hậu nghiệm \`q(z | x) ≈ N(μ(x), Σ(x))\`, được "kéo" về prior \`N(0, I)\` qua KL divergence ([Lesson 08](../lesson-08-cross-entropy-kl/) sẽ học).

Tại sao Gaussian? Vì KL giữa hai Gaussian có **công thức kín** — không cần Monte Carlo. Loss VAE differentiable end-to-end.

### 8.5. Anomaly detection

Trong nhiều bài toán phát hiện bất thường, giả định "data bình thường ~ Gaussian" rồi cảnh báo khi \`|Z| > 3\` (xác suất < 0.27%). Đơn giản, hiệu quả khi data thực sự gần Gaussian.

### 8.6. Gaussian Process Regression

Mỗi điểm dự đoán \`f(x*)\` không phải 1 con số mà là một phân phối Gaussian (mean + variance). Dùng cho hyperparameter tuning, Bayesian optimization.

### 📝 Tóm tắt mục 8

- MSE ⟺ giả định Gaussian noise. Đây là "secret" của linear regression.
- Weight init dùng Gaussian vì CLT + symmetry.
- Diffusion models tận dụng tính chất "stable" của Gaussian để có closed-form.
- VAE / Bayesian methods dùng Gaussian vì KL giữa Gaussian có công thức kín.

---

## 9. Phép biến đổi quan trọng giữa Gaussian

(Đây là phần "công cụ" cần thuộc — sẽ dùng liên tục từ Lesson 06 trở đi.)

### 9.1. Linear transform của 1 Gaussian

Nếu \`X ~ N(μ, σ²)\` và \`Y = aX + b\` (\`a ≠ 0\`), thì:

\`\`\`
Y ~ N(aμ + b, a²σ²).
\`\`\`

**Chứng minh**:

- \`E[Y] = E[aX + b] = a·E[X] + b = aμ + b\`. ✓
- \`Var(Y) = Var(aX + b) = a²·Var(X) = a²σ²\`. ✓
- \`Y\` vẫn Gaussian: dùng change of variables. PDF của \`Y\` là \`f_Y(y) = f_X((y − b)/a) · (1/|a|)\`. Thay vào công thức Gaussian → ra đúng dạng \`N(aμ + b, a²σ²)\`. ✓

**Ví dụ**: \`X ~ N(0, 1)\`. \`Y = 3X + 5\` → \`Y ~ N(5, 9)\`.

### 9.2. Tổng hai Gaussian độc lập

Nếu \`X ~ N(μ_X, σ_X²)\` và \`Y ~ N(μ_Y, σ_Y²)\` **độc lập**, thì:

\`\`\`
X + Y ~ N(μ_X + μ_Y, σ_X² + σ_Y²).
\`\`\`

**Chìa khoá**: variance cộng được khi độc lập. SD **không cộng được**: \`σ_{X+Y} = √(σ_X² + σ_Y²)\`, không phải \`σ_X + σ_Y\`.

**Ví dụ**: \`X ~ N(2, 4)\`, \`Y ~ N(3, 9)\`, độc lập. \`X + Y ~ N(5, 13)\`. SD = \`√13 ≈ 3.61\`.

Lưu ý nếu không độc lập: \`Var(X + Y) = Var(X) + Var(Y) + 2·Cov(X, Y)\`. Học chi tiết ở [Lesson 06](../lesson-06-expectation-variance/).

### 9.3. Trung bình của n Gaussian iid

\`Xᵢ ~ N(μ, σ²)\` iid (\`i = 1, ..., n\`). \`X̄ = (1/n)·ΣXᵢ\`.

- \`X̄ ~ N(μ, σ²/n)\` **chính xác** (không cần CLT, vì Gaussian + Gaussian là Gaussian).

Đây là kết quả "luật √n" trong trường hợp đặc biệt — Gaussian iid cho ra Gaussian, không phải xấp xỉ.

### 9.4. Affine transform multivariate

Nếu \`X ~ N(μ, Σ)\` trong \`ℝ^d\` và \`Y = AX + b\` (A là ma trận \`k × d\`), thì:

\`\`\`
Y ~ N(Aμ + b, AΣAᵀ).
\`\`\`

Tính chất này là nền tảng của Kalman filter, PCA-whitening, GMM training, ...

### 📝 Tóm tắt mục 9

- Gaussian "đóng" dưới linear transform và tổng độc lập.
- Variance cộng được; SD không cộng được.
- Trung bình \`n\` Gaussian iid vẫn Gaussian, variance \`σ²/n\` — chính xác, không phải xấp xỉ.

---

## 10. ❓ Q&A — Vì sao Gaussian xuất hiện khắp nơi?

Câu hỏi đặt ra ở đầu bài. Bây giờ có 4 câu trả lời, mỗi câu một góc.

### 10.1. CLT — câu trả lời cổ điển

Mọi đại lượng đo được trong thế giới thực thường là **tổng (hoặc trung bình) của nhiều thành phần ngẫu nhiên nhỏ độc lập**:

- Chiều cao: ảnh hưởng của hàng trăm gene + dinh dưỡng + môi trường.
- Sai số đo lường: nhiệt độ + rung + electric noise + ...
- Tổng tiền chi tiêu trong tháng: nhiều giao dịch riêng lẻ cộng lại.

CLT bảo: cứ "tổng nhiều thứ nhỏ độc lập" là ra Gaussian.

### 10.2. Maximum Entropy — câu trả lời thông tin

Trong tất cả các phân phối có **mean μ và variance σ² cho trước**, **Gaussian là phân phối có entropy lớn nhất**. Tức là Gaussian là lựa chọn "ít giả định nhất" khi ta chỉ biết hai moment đầu tiên.

Đây là nguyên lý "**maximum entropy**" (E.T. Jaynes): chọn phân phối ít bias nhất phù hợp với ràng buộc.

Hệ quả: khi bạn không biết phân phối thực, chỉ biết mean & variance → giả định Gaussian là **lựa chọn khách quan nhất**. Không phải vì Gaussian "đúng", mà vì nó "ít sai" theo nghĩa thông tin.

### 10.3. Tính toán đẹp — câu trả lời kỹ thuật

Gaussian có hàng loạt tính chất "vàng" mà không phân phối nào khác có:

- **Đóng dưới linear transform**: \`Y = AX + b\` còn Gaussian.
- **Đóng dưới phép cộng độc lập**: \`X + Y\` còn Gaussian.
- **Đóng dưới marginal**: trong multivariate, các thành phần marginal vẫn Gaussian.
- **Đóng dưới conditional**: \`(X | Y)\` còn Gaussian.
- **MLE = MSE**: dẫn ra OLS đơn giản.
- **Conjugate prior trong Bayesian**: posterior vẫn Gaussian.
- **KL giữa hai Gaussian có closed-form**.

Nhờ vậy, mọi tính toán có Gaussian đều có công thức kín — không cần Monte Carlo.

### 10.4. Stability — câu trả lời toán cao cấp

Gaussian là điểm bất động (fixed point) của phép "average ra √n samples". Trong họ **stable distributions**, Gaussian là trường hợp duy nhất có variance hữu hạn. Các stable khác (Cauchy, Lévy) có heavy tail, dùng trong tài chính, vật lý phức tạp.

### 📝 Tóm tắt mục 10

Gaussian phổ biến vì cùng lúc:
- (CLT) là giới hạn của tổng nhiều biến nhỏ iid.
- (Maximum Entropy) là "ít giả định nhất" khi biết mean & variance.
- (Tính toán) đóng dưới mọi phép biến đổi quan trọng.
- (Stability) là fixed point của phép trung bình hoá.

---

## 11. ⚠ Tổng hợp lỗi thường gặp

| Lỗi | Sửa |
|-----|-----|
| Nhầm \`σ\` và \`σ²\` — đặc biệt khi nhập vào \`scipy.stats.norm(scale=…)\`. | Scipy dùng \`σ\` (std), KHÔNG phải variance. Numpy \`np.random.normal(loc, scale)\` cũng dùng \`σ\`. |
| Coi \`f(x) > 1\` là sai vì "xác suất phải ≤ 1". | \`f\` là **mật độ**, không phải xác suất. Hoàn toàn có thể \`> 1\`. |
| Dùng \`z = 2\` cho confidence interval 95%. | Đúng là \`z = 1.96\`. \`z = 2\` cho ~95.45%. |
| Áp dụng 68-95-99.7 cho phân phối non-Gaussian. | Chỉ đúng cho Gaussian (hoặc gần Gaussian). |
| Cộng SD: \`σ_{X+Y} = σ_X + σ_Y\`. | Sai! Cộng variance, rồi mới căn: \`σ_{X+Y} = √(σ_X² + σ_Y²)\` (khi độc lập). |
| Quên kiểm tra điều kiện CLT (mean & variance hữu hạn). | Cauchy không có CLT cổ điển. Heavy tail cần kiểm tra. |
| Dùng CLT khi \`n\` quá nhỏ. | \`n ≥ 30\` là rule of thumb; phân phối lệch mạnh cần \`n\` lớn hơn. |
| Nhầm \`Φ\` (CDF, chữ hoa) với \`φ\` (PDF, chữ thường). | \`Φ(z) = P(Z ≤ z)\`; \`φ(z) = (1/√(2π))exp(−z²/2)\`. |

---

## 12. Bài tập

### Bài 1 — Tính \`f(x)\` cho Gaussian

Cho \`X ~ N(10, 4²)\`. Tính \`f(10)\`, \`f(14)\`, \`f(6)\`. So sánh và giải thích.

### Bài 2 — Standardization

Cho \`X ~ N(50, 8²)\`. Tính \`Z\` ứng với \`x = 66\`. Tỉ lệ phần trăm dân số có \`X ≤ 66\`?

### Bài 3 — Áp dụng 68-95-99.7

Mức cholesterol người trưởng thành: \`X ~ N(200, 30²)\` (mg/dL).
(a) Khoảng nào chứa ~68% dân số?
(b) Tỉ lệ người có cholesterol > 260?
(c) Bác sĩ cảnh báo "cao nguy hiểm" khi cholesterol > μ + 2σ. Ngưỡng cụ thể là bao nhiêu, và bao nhiêu % dân số bị cảnh báo?

### Bài 4 — Tính xác suất với bảng z-score

\`X ~ N(170, 7²)\`. Tính \`P(160 ≤ X ≤ 180)\` dùng bảng (làm tròn z đến 2 chữ số).

### Bài 5 — CLT walk-through

Một máy đóng gói gạo: mỗi gói có khối lượng \`X ~ ?\` với \`μ = 5.0 kg\`, \`σ = 0.1 kg\` (phân phối lệch nhẹ, không Gaussian). Lấy mẫu 36 gói.
(a) Phân phối của trung bình mẫu \`X̄\`?
(b) \`P(X̄ ≥ 5.05)\` ≈ ?
(c) Nếu cần \`P(|X̄ − 5.0| ≤ 0.01) ≥ 0.95\`, phải lấy bao nhiêu gói?

### Bài 6 — Multivariate Gaussian 2D

Cho \`(X, Y) ~ N(μ, Σ)\` với \`μ = (1, 2)\`, \`Σ = [[4, 2], [2, 1]]\`.
(a) \`|Σ| = ?\`. Tính được không?
(b) Phân phối marginal của \`X\`? (Hint: marginal của multivariate Gaussian vẫn Gaussian.)
(c) Mô tả shape iso-density contour (tròn, ellipse, hay degenerate).

---

## 13. Lời giải chi tiết

### Bài 1

\`σ = 4\`, hệ số \`1/(4√(2π)) = 1/(4·2.5066) ≈ 0.09974\`.

- \`f(10) = 0.09974 · exp(0) = 0.09974\`.
- \`f(14) = 0.09974 · exp(−(14−10)²/(2·16)) = 0.09974 · exp(−16/32) = 0.09974 · exp(−0.5) ≈ 0.09974 · 0.6065 ≈ 0.0605\`.
- \`f(6) = 0.09974 · exp(−(6−10)²/32) = 0.09974 · 0.6065 ≈ 0.0605\` (đối xứng với \`f(14)\`).

**Giải thích**: \`f(14) = f(6)\` vì cả hai cách \`μ = 10\` đúng 1σ; PDF đối xứng quanh \`μ\`.

### Bài 2

\`Z = (66 − 50)/8 = 16/8 = 2\`.
\`P(X ≤ 66) = Φ(2) ≈ 0.9772\` → ~**97.72%** dân số có \`X ≤ 66\`.

### Bài 3

\`μ = 200\`, \`σ = 30\`.

(a) \`[μ − σ, μ + σ] = [170, 230]\` chứa ~68%.

(b) \`z = (260 − 200)/30 = 2\`. \`P(X > 260) = 1 − Φ(2) ≈ 1 − 0.9772 = 0.0228\` → **2.28%**.

(c) Ngưỡng \`μ + 2σ = 200 + 60 = 260\` mg/dL. Theo (b), khoảng **2.28%** dân số bị cảnh báo.

### Bài 4

\`z_a = (160 − 170)/7 = −10/7 ≈ −1.43\`.
\`z_b = (180 − 170)/7 = 10/7 ≈ 1.43\`.
\`Φ(1.43) ≈ 0.9236\` (tra bảng đầy đủ; trong bảng rút gọn dùng \`Φ(1.44) ≈ 0.9251\` hoặc nội suy).
\`Φ(−1.43) = 1 − 0.9236 = 0.0764\`.
\`P = 0.9236 − 0.0764 = 0.8472\` ≈ **84.72%**.

### Bài 5

\`μ = 5.0\`, \`σ = 0.1\`. \`n = 36\`.

(a) Theo CLT: \`X̄ ≈ N(5.0, σ²/n) = N(5.0, 0.01/36) = N(5.0, (0.1/6)²)\`. Vậy \`X̄ ≈ N(5.0, (0.01667)²)\`. Standard deviation của \`X̄\` = \`0.1/√36 = 0.01667 kg\`.

(b) \`z = (5.05 − 5.0)/0.01667 = 3\`. \`P(X̄ ≥ 5.05) = 1 − Φ(3) ≈ 1 − 0.9987 = 0.0013\` → ~**0.13%**.

(c) Cần \`P(|X̄ − μ| ≤ 0.01) ≥ 0.95\`. Tương đương \`P(|Z| ≤ 0.01·√n/σ) ≥ 0.95\`. Mà \`P(|Z| ≤ 1.96) = 0.95\`. Vậy:
\`\`\`
0.01·√n / 0.1 ≥ 1.96
√n ≥ 19.6
n ≥ 19.6² = 384.16.
\`\`\`
Vậy phải lấy ít nhất **\`n = 385\`** gói.

**Tổng quát "luật √n"**: muốn sai số \`≤ ε\` với confidence 95%, cần \`n ≥ (1.96σ/ε)²\`.

### Bài 6

\`Σ = [[4, 2], [2, 1]]\`.

(a) \`|Σ| = 4·1 − 2·2 = 4 − 4 = 0\`. **Định thức bằng 0 → ma trận \`Σ\` suy biến (singular)**, KHÔNG xác định dương → đây **không phải** Gaussian đa biến hợp lệ. Nói cách khác, \`X\` và \`Y\` correlation \`ρ = 2/√(4·1) = 1\` — tương quan hoàn hảo, \`Y = X/2\` deterministic. Phân phối "thu hẹp" về 1 chiều (degenerate Gaussian).

(b) Marginal \`X ~ N(1, 4)\`. (Quy tắc marginal: lấy thành phần tương ứng của \`μ\` và đường chéo của \`Σ\`.) \`X ~ N(1, 2²)\`.

(c) Vì \`Σ\` singular, "ellipse" degenerate thành **một đường thẳng** trên mặt phẳng \`(x, y)\`. Mọi xác suất tập trung trên đường thẳng \`y − 2 = 0.5·(x − 1)\` (tức \`y = 0.5x + 1.5\`). Đây là phản ví dụ quan trọng: covariance matrix phải xác định dương (strict) để có Gaussian non-degenerate.

**Lưu ý**: Trong thực hành, nếu gặp \`Σ\` gần singular (eigenvalue rất nhỏ), thường thêm \`εI\` (regularization) để tránh nghịch đảo phát nổ.

---

## 14. Liên kết & tham khảo

- **Trước**: [Lesson 04 — Biến ngẫu nhiên liên tục](../lesson-04-continuous-rv/) (PDF, CDF, đổi biến).
- **Tiếp**: [Lesson 06 — Kỳ vọng, phương sai, covariance](../lesson-06-expectation-variance/) (sẽ chứng minh các tính chất E[X], Var(X), Cov dùng ở bài này).
- **Cross-tier**:
  - [Tầng 3 Calculus](../../03-Calculus/) — tích phân Gaussian.
  - [Tầng 4 Linear Algebra](../../04-LinearAlgebra/) — covariance matrix, eigendecomposition.
- **Đến**: [Lesson 07 — MLE](../lesson-07-mle/) sẽ chứng minh MSE từ Gaussian noise; [Lesson 08 — KL divergence](../lesson-08-cross-entropy-kl/) sẽ có công thức KL giữa hai Gaussian.
- **Tầng 6 (sắp tới)**: GMM, VAE, diffusion — đều dùng nền tảng bài này.

### Tham khảo ngoài

- DeGroot & Schervish, *Probability and Statistics*, chương 5 (Normal distribution).
- Bishop, *Pattern Recognition and Machine Learning*, chương 2 (Gaussian distributions).
- Wikipedia: [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution), [Central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem).
- 3Blue1Brown video: *But what is the Central Limit Theorem?* — giải thích trực quan tuyệt vời.

### File liên quan trong lesson

- [\`visualization.html\`](./visualization.html) — 4 component tương tác: Gaussian shape, z-score calculator, CLT demo, Multivariate 2D contour.
`;
