// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Calculus/lesson-08-integrals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Tích phân (Integrals)

> Bài **cuối cùng của Tầng 3 — Calculus**. Sau bài này bạn bước sang Tầng 4 — Linear Algebra.

Lesson 02 dạy đạo hàm — "tốc độ thay đổi" của hàm số. Bài này dạy **phép ngược** của đạo hàm: **tích phân** — câu trả lời cho câu hỏi "diện tích dưới đường cong là bao nhiêu?". Hai phép toán này gắn với nhau bởi một định lý đẹp nhất giải tích: **Định lý cơ bản của giải tích (FTC)**.

Và quan trọng nhất với ML/AI: tích phân là **ngôn ngữ của xác suất liên tục**. Mọi PDF (probability density function), kỳ vọng E[X], cross-entropy phiên bản liên tục — đều là tích phân. Đây là cây cầu nối sang **Tầng 5 — Probability** và xa hơn nữa là loss function của các mô hình ML hiện đại.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu được tích phân xác định qua **Riemann sum** và hiểu vì sao "diện tích" là một giới hạn.
- Tính tích phân của các hàm sơ cấp bằng **bảng nguyên hàm**.
- Áp dụng **Định lý cơ bản của giải tích (FTC)** — kết nối đạo hàm và tích phân.
- Dùng được 2 kỹ thuật cơ bản: **đổi biến** và **tích phân từng phần**.
- Hiểu vì sao **xác suất liên tục cần tích phân**, và sẽ gặp lại ở Tầng 5.
- Biết khi nào phải dùng **numerical integration** (Trapezoid, Simpson) vì không tìm được nguyên hàm dạng đóng.

## Kiến thức tiền đề

- [Lesson 01 — Giới hạn](../lesson-01-limits/) — tích phân định nghĩa qua giới hạn \`n → ∞\`.
- [Lesson 02 — Đạo hàm](../lesson-02-derivatives/) — tích phân là phép ngược; FTC cần đạo hàm để phát biểu.
- [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — bảng nguyên hàm chính là "đọc ngược" bảng đạo hàm.
- [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — đổi biến trong tích phân chính là chain rule chạy ngược.
- [Tầng 1 — Algebra Lesson 07: Hàm mũ và hàm log](../../Algebra/lesson-07-exp-log-functions/) — \`∫ 1/x dx = ln|x|\`, \`∫ e^x dx = e^x\`.

---

## 1. Trực giác — Diện tích dưới đường cong

> **💡 Trực giác.** Tưởng tượng bạn lái xe trên đường thẳng. Bảng đồng hồ chỉ vận tốc \`v(t)\`. Sau \`T\` giây bạn đi được bao xa? Nếu vận tốc không đổi \`v(t) = v₀\` thì câu trả lời quá dễ: \`quãng đường = v₀ · T\`. Nhưng nếu vận tốc thay đổi liên tục thì sao? Trực giác: vẽ đồ thị \`v(t)\`, "diện tích" dưới đồ thị từ \`t = 0\` đến \`t = T\` chính là quãng đường. Đó là **tích phân**.

### 1.1. Định nghĩa "diện tích" cho hình không vuông vắn

Diện tích hình chữ nhật = dài × rộng. Diện tích tam giác = (đáy × chiều cao) / 2. Diện tích hình tròn = \`π r²\`. Ổn — nhưng còn diện tích dưới một đường cong bất kỳ, ví dụ \`f(x) = x²\` từ \`x = 0\` đến \`x = 1\`?

Trực giác cổ điển (Eudoxus, Archimedes, thế kỷ 4 TCN): **lấp đầy hình bằng các hình chữ nhật càng lúc càng nhỏ**, cộng diện tích của chúng, rồi cho số hình chữ nhật → ∞. Đây là phương pháp **vét cạn (method of exhaustion)** — ý tưởng tiền thân của tích phân.

### 1.2. Ký hiệu

Ta viết:
\`\`\`
∫_a^b f(x) dx
\`\`\`
Đọc là: "tích phân của \`f(x)\` từ \`a\` đến \`b\`". Nếu \`f(x) ≥ 0\` trên \`[a, b]\`, đại lượng này = **diện tích vùng nằm dưới đồ thị \`f\` và trên trục Ox**, giữa hai đường \`x = a\` và \`x = b\`.

Tại sao ký hiệu kỳ lạ vậy?
- \`∫\` là chữ \`S\` kéo dài — viết tắt của **Sum** (tổng). Leibniz chọn năm 1675.
- \`dx\` là "phần tử vô cùng nhỏ" theo trục \`x\` — bề rộng của một dải chữ nhật vô cùng mỏng.
- \`f(x) dx\` = chiều cao × bề rộng của dải đó.
- \`∫_a^b\` = tổng tất cả các dải khi bề rộng \`→ 0\`.

> **❓ Câu hỏi tự nhiên: "Nếu \`f(x) < 0\` thì sao?"** Khi đó \`f(x) dx < 0\`, nên tích phân ra số âm. Diện tích "vật lý" thì luôn dương, nhưng tích phân coi vùng nằm dưới trục Ox là **diện tích có dấu âm**. Ví dụ \`∫_0^{2π} sin(x) dx = 0\` — phần trên trục Ox (từ 0 đến π) và phần dưới (từ π đến 2π) triệt tiêu nhau.

---

## 2. Riemann sum — xấp xỉ diện tích bằng hình chữ nhật

Ý tưởng vét cạn cụ thể hóa thành Riemann sum (Bernhard Riemann, 1854).

### 2.1. Quy trình

Cho hàm \`f\` xác định trên \`[a, b]\`. Để xấp xỉ diện tích:

1. **Chia** \`[a, b]\` thành \`n\` đoạn nhỏ bằng nhau, mỗi đoạn rộng:
   \`\`\`
   Δx = (b − a) / n
   \`\`\`
2. Các điểm chia: \`x₀ = a\`, \`x₁ = a + Δx\`, \`x₂ = a + 2Δx\`, …, \`xₙ = b\`.
3. Trên mỗi đoạn thứ \`i\` (từ \`x_{i−1}\` đến \`xᵢ\`), chọn **một điểm bất kỳ** \`xᵢ*\` ∈ \`[x_{i−1}, xᵢ]\`.
4. Vẽ hình chữ nhật cao \`f(xᵢ*)\` và rộng \`Δx\`. Diện tích nó = \`f(xᵢ*) · Δx\`.
5. Cộng \`n\` hình chữ nhật lại:
   \`\`\`
   S_n = Σᵢ₌₁ⁿ f(xᵢ*) · Δx
   \`\`\`

\`S_n\` là **tổng Riemann**. Khi \`n\` càng lớn, hình chữ nhật càng mỏng, \`S_n\` càng sát diện tích thật.

### 2.2. 3 cách chọn \`xᵢ*\` phổ biến

Cùng một \`n\`, kết quả khác nhau tùy chỗ chọn:

| Cách chọn | \`xᵢ*\` | Đặc điểm |
|-----------|-------|----------|
| **Trái (Left)** | \`x_{i−1}\` | Nếu \`f\` tăng: underestimate (thấp hơn thật). |
| **Phải (Right)** | \`xᵢ\` | Nếu \`f\` tăng: overestimate (cao hơn thật). |
| **Giữa (Midpoint)** | \`(x_{i−1} + xᵢ) / 2\` | Thường chính xác nhất với cùng \`n\`. |

Bất kể chọn cách nào, khi \`n → ∞\` cả ba đều tiến về cùng một số — đó là **tích phân xác định**.

### 2.3. Định nghĩa tích phân xác định

\`\`\`
∫_a^b f(x) dx  =  lim (n → ∞)  Σᵢ₌₁ⁿ f(xᵢ*) · Δx
\`\`\`

Hàm \`f\` được gọi là **khả tích (integrable)** trên \`[a, b]\` nếu giới hạn này tồn tại và không phụ thuộc vào cách chọn \`xᵢ*\`. Mọi hàm liên tục trên \`[a, b]\` đều khả tích — đây là kết quả chuẩn của giải tích, chứng minh ở mức trừu tượng hơn.

> **💡 Trực giác.** "Tích phân" = "tổng vô hạn các phần tử vô cùng nhỏ". \`Σ\` (sigma) là tổng hữu hạn, \`∫\` (s dài) là tổng vô hạn liên tục. \`Δx\` là bước rời rạc, \`dx\` là bước "vô cùng nhỏ".

---

## 3. Walk-through Riemann sum — bốn ví dụ cụ thể

Đến phần thật. Tính số bằng tay, từng bước.

### 3.1. \`f(x) = x\` trên \`[0, 1]\` với \`n = 4\`, chọn điểm **phải**

\`Δx = (1 − 0) / 4 = 0.25\`. Các điểm chia: \`0, 0.25, 0.5, 0.75, 1\`.

Chọn điểm phải: \`xᵢ* = xᵢ = 0.25, 0.5, 0.75, 1\`.

| \`i\` | \`xᵢ*\` | \`f(xᵢ*) = xᵢ*\` | \`f(xᵢ*) · Δx\` |
|-----|-------|----------------|--------------|
| 1 | 0.25 | 0.25 | 0.0625 |
| 2 | 0.50 | 0.50 | 0.1250 |
| 3 | 0.75 | 0.75 | 0.1875 |
| 4 | 1.00 | 1.00 | 0.2500 |
| | | **S₄ (right)** | **0.625** |

Chọn điểm trái: \`xᵢ* = x_{i−1} = 0, 0.25, 0.5, 0.75\`. Tính tương tự → \`S₄ (left) = 0.375\`.

Chọn điểm giữa: \`xᵢ* = 0.125, 0.375, 0.625, 0.875\`. → \`S₄ (mid) = 0.5\` (chính xác!).

**Diện tích thật**: vùng dưới \`y = x\` từ \`0\` đến \`1\` là tam giác vuông có hai cạnh góc vuông = 1, diện tích = \`1 · 1 / 2 = 0.5\`. Khớp với midpoint, và trung bình \`(left + right) / 2 = 0.5\`.

Khi \`n → ∞\`:
- \`S_n (right) = Σᵢ₌₁ⁿ (i/n) · (1/n) = (1/n²) · n(n+1)/2 = (n+1)/(2n) → 1/2\`.
- \`S_n (left) = (n−1)/(2n) → 1/2\`.

Cả hai hội tụ về **0.5**. ✓

### 3.2. \`f(x) = x²\` trên \`[0, 1]\` với \`n = 4\`, chọn điểm **giữa**

\`Δx = 0.25\`. Điểm giữa: \`0.125, 0.375, 0.625, 0.875\`.

| \`i\` | \`xᵢ*\` | \`f(xᵢ*) = (xᵢ*)²\` | \`f(xᵢ*) · Δx\` |
|-----|-------|----------------|--------------|
| 1 | 0.125 | 0.015625 | 0.00390625 |
| 2 | 0.375 | 0.140625 | 0.03515625 |
| 3 | 0.625 | 0.390625 | 0.09765625 |
| 4 | 0.875 | 0.765625 | 0.19140625 |
| | | **S₄ (mid)** | **0.328125** |

Tăng \`n\`:

| \`n\` | Phương pháp | \`S_n\` |
|-----|-------------|-------|
| 4 | midpoint | 0.328125 |
| 10 | midpoint | 0.33250000... |
| 100 | midpoint | 0.33332500... |
| 1000 | midpoint | 0.33333325... |

Tiến về **1/3 ≈ 0.33333...** Có công thức đóng:
\`\`\`
S_n (right) = Σᵢ₌₁ⁿ (i/n)² · (1/n) = (1/n³) · n(n+1)(2n+1)/6
            = (n+1)(2n+1) / (6n²)
            → 2 / 6 = 1/3 khi n → ∞
\`\`\`

Khẳng định lại: \`∫_0^1 x² dx = 1/3\`.

### 3.3. \`f(x) = 1/x\` trên \`[1, 2]\` với \`n = 10\`, chọn điểm **giữa**

\`Δx = (2 − 1) / 10 = 0.1\`. Điểm giữa: \`1.05, 1.15, 1.25, …, 1.95\`.

Tính \`f(xᵢ*) = 1/xᵢ*\` rồi nhân \`0.1\`:

| \`xᵢ*\` | \`1/xᵢ*\` |
|-------|---------|
| 1.05 | 0.952381 |
| 1.15 | 0.869565 |
| 1.25 | 0.800000 |
| 1.35 | 0.740741 |
| 1.45 | 0.689655 |
| 1.55 | 0.645161 |
| 1.65 | 0.606061 |
| 1.75 | 0.571429 |
| 1.85 | 0.540541 |
| 1.95 | 0.512821 |
| **Σ** | **6.928353** |

\`S₁₀ (mid) = 6.928353 · 0.1 = 0.6928353\`.

Giá trị thật: \`∫_1^2 (1/x) dx = ln(2) − ln(1) = ln 2 ≈ 0.693147\`.

Sai số: \`|0.6928353 − 0.693147| ≈ 0.00031\`. Midpoint với \`n = 10\` đã sát đến 3 chữ số thập phân. Khá ổn.

### 3.4. \`f(x) = sin(x)\` trên \`[0, π]\` với \`n = 6\`, chọn điểm **giữa**

\`Δx = π/6 ≈ 0.5236\`. Điểm giữa: \`π/12, 3π/12, 5π/12, 7π/12, 9π/12, 11π/12\`.

Quy về radian:

| \`xᵢ*\` | \`sin(xᵢ*)\` |
|-------|------------|
| π/12 ≈ 0.2618 | 0.2588 |
| 3π/12 = π/4 ≈ 0.7854 | 0.7071 |
| 5π/12 ≈ 1.3090 | 0.9659 |
| 7π/12 ≈ 1.8326 | 0.9659 |
| 9π/12 = 3π/4 ≈ 2.3562 | 0.7071 |
| 11π/12 ≈ 2.8798 | 0.2588 |
| **Σ** | **3.8636** |

\`S₆ (mid) = 3.8636 · π/6 ≈ 3.8636 · 0.5236 ≈ 2.0233\`.

Giá trị thật: \`∫_0^π sin(x) dx = [−cos x]_0^π = −cos π + cos 0 = 1 + 1 = 2\`.

Sai số ≈ 0.023. Tăng \`n\` lên 100 → sai số \`< 10⁻⁴\`.

> **⚠ Lỗi thường gặp.** Quên rằng \`Δx = (b − a) / n\` chứ không phải \`1/n\`. Khi \`b − a ≠ 1\` thì nhân lộn ngay. Vd với \`[1, 2]\` thì \`Δx = 0.1\` khi \`n = 10\`, còn với \`[0, π]\` thì \`Δx = π/n\`.

### 3.5. So sánh tốc độ hội tụ của 3 cách chọn — cùng hàm \`x²\` trên \`[0, 1]\`

| \`n\` | Left | Right | Mid | Sai số mid |
|-----|------|-------|-----|------------|
| 4   | 0.21875  | 0.46875  | 0.328125 | 0.0052 |
| 10  | 0.285000 | 0.385000 | 0.332500 | 0.0008 |
| 50  | 0.323400 | 0.343400 | 0.333300 | 3.3e-5  |
| 100 | 0.328350 | 0.338350 | 0.333325 | 8.3e-6  |
| 1000| 0.332833 | 0.333833 | 0.333333 | 8.3e-8  |

Nhận xét quan trọng:
- **Left và Right hội tụ tuyến tính**: sai số ~ \`O(1/n)\`. Tăng \`n\` gấp 10 → sai số giảm 10 lần.
- **Mid hội tụ bậc 2**: sai số ~ \`O(1/n²)\`. Tăng \`n\` gấp 10 → sai số giảm 100 lần.
- **Left + Right ≈ 2·Mid** (chính xác với hàm tuyến tính) — đây là gốc của công thức Trapezoid (mục 11.1).

> **💡 Trực giác.** Mid "tốt hơn" vì sai lệch ở nửa trái và nửa phải mỗi hình chữ nhật **triệt tiêu nhau** khi \`f\` không quá cong trong đoạn. Left/Right luôn lệch theo một hướng cố định khi \`f\` đơn điệu.

### 3.6. Vì sao cứ ngồi cộng tay mãi không xong?

Riemann sum giúp ta **định nghĩa** tích phân, và giúp tính bằng số. Nhưng để tính giải tích (lấy ra một biểu thức đóng), ta cần một công cụ mạnh hơn: **Định lý cơ bản của giải tích**.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Cho \`f(x) = 2x\` trên \`[0, 3]\` với \`n = 3\`, điểm phải. Tính \`S₃\` và so sánh với diện tích tam giác.
> <details><summary>Đáp án</summary>
> \`Δx = 1\`. \`xᵢ* = 1, 2, 3\`. \`f(xᵢ*) = 2, 4, 6\`. \`S₃ = (2 + 4 + 6) · 1 = 12\`. Diện tích thật của tam giác đáy 3, cao 6 = \`3·6/2 = 9\`. Right Riemann overestimate vì \`f\` tăng.
> </details>
>
> 2. Cùng hàm trên cùng đoạn, dùng điểm giữa. Kết quả?
> <details><summary>Đáp án</summary>
> \`xᵢ* = 0.5, 1.5, 2.5\`. \`f(xᵢ*) = 1, 3, 5\`. \`S₃ (mid) = 1 + 3 + 5 = 9\`. Khớp chính xác!
> </details>

---

## 4. Định lý cơ bản của giải tích (Fundamental Theorem of Calculus — FTC)

Đây là định lý đẹp nhất giải tích. Nó nói: **tích phân và đạo hàm là hai phép toán ngược nhau**.

### 4.1. Phát biểu

**Phần 1 — Tính tích phân qua nguyên hàm.**

Cho \`f\` liên tục trên \`[a, b]\`. Nếu \`F\` là một **nguyên hàm** của \`f\` trên đoạn đó (tức là \`F'(x) = f(x)\` với mọi \`x ∈ [a, b]\`), thì:

\`\`\`
∫_a^b f(x) dx = F(b) − F(a)
\`\`\`

Ký hiệu: \`F(b) − F(a)\` thường viết gọn là \`[F(x)]_a^b\`.

**Phần 2 — Hàm "tích phân theo cận trên".**

Định nghĩa \`G(x) = ∫_a^x f(t) dt\` (cận trên là biến \`x\`, cận dưới cố định \`a\`). Khi đó:

\`\`\`
G'(x) = f(x)
\`\`\`

Tức là **đạo hàm của "diện tích tích lũy" là chính hàm gốc**.

### 4.2. Trực giác — vì sao FTC đúng?

> **💡 Trực giác.** Quay lại ví dụ xe chạy. \`v(t)\` là vận tốc. \`G(t)\` = quãng đường đã đi tính đến thời điểm \`t\`. Hai mệnh đề rõ ràng:
> - \`G'(t) = v(t)\`: tốc độ thay đổi quãng đường = vận tốc.
> - \`G(T) − G(0)\` = tổng quãng đường đi được = \`∫_0^T v(t) dt\` (diện tích dưới đồ thị vận tốc).
> Hai điều này gộp lại = FTC.

**Lập luận cụ thể cho Phần 2**: Xét \`G(x + h) − G(x)\`. Đó là diện tích dưới \`f\` từ \`x\` đến \`x + h\`. Nếu \`h\` rất nhỏ, vùng đó gần như hình chữ nhật chiều rộng \`h\` và chiều cao \`f(x)\`, nên \`G(x + h) − G(x) ≈ f(x) · h\`. Chia cho \`h\`:
\`\`\`
[G(x + h) − G(x)] / h ≈ f(x)
\`\`\`
Cho \`h → 0\`: theo định nghĩa đạo hàm, vế trái → \`G'(x)\`. Vậy \`G'(x) = f(x)\`. ✓

**Phần 1 suy ra từ Phần 2.** Nếu \`F\` là nguyên hàm bất kỳ và \`G\` là nguyên hàm "diện tích tích lũy", thì \`(F − G)'(x) = 0\` trên \`[a, b]\`, nên \`F − G\` = hằng số. Suy ra \`F(b) − F(a) = G(b) − G(a) = G(b) − 0 = ∫_a^b f(x) dx\`.

### 4.3. Walk-through — tính \`∫_0^1 x² dx\` bằng FTC

**Bước 1: tìm nguyên hàm \`F\` của \`f(x) = x²\`.**

Cần \`F\` sao cho \`F'(x) = x²\`. Nhớ rằng \`(x³)' = 3x²\`, nên \`(x³/3)' = x²\`. Vậy:
\`\`\`
F(x) = x³/3
\`\`\`

**Bước 2: áp dụng FTC.**
\`\`\`
∫_0^1 x² dx = F(1) − F(0) = 1³/3 − 0³/3 = 1/3
\`\`\`

**Verify với Riemann sum** (mục 3.2): cùng ra \`1/3\`. ✓

### 4.4. Vài ví dụ thêm

| Tích phân | Nguyên hàm \`F(x)\` | Kết quả |
|-----------|-------------------|---------|
| \`∫_0^2 x dx\` | \`x²/2\` | \`4/2 − 0 = 2\` |
| \`∫_0^1 x³ dx\` | \`x⁴/4\` | \`1/4 − 0 = 1/4\` |
| \`∫_1^e (1/x) dx\` | \`ln x\` | \`ln e − ln 1 = 1 − 0 = 1\` |
| \`∫_0^1 eˣ dx\` | \`eˣ\` | \`e¹ − e⁰ = e − 1 ≈ 1.718\` |
| \`∫_0^{π/2} cos x dx\` | \`sin x\` | \`sin(π/2) − sin 0 = 1\` |
| \`∫_0^{π} sin x dx\` | \`−cos x\` | \`−cos π − (−cos 0) = 1 + 1 = 2\` |

> **❓ Câu hỏi tự nhiên: "Mỗi hàm có duy nhất một nguyên hàm không?"** Không! Nếu \`F'(x) = f(x)\`, thì \`(F + C)' = F' + 0 = f\` cũng đúng với mọi hằng số \`C\`. Nên **nguyên hàm chỉ duy nhất tới một hằng số \`C\`**. Khi tính tích phân **xác định**, \`C\` bị triệt tiêu: \`(F(b) + C) − (F(a) + C) = F(b) − F(a)\`. Khi viết nguyên hàm chung, phải kèm \`+ C\`.

---

## 5. Nguyên hàm (Antiderivative) — bảng cơ bản

Vì FTC là "đảo ngược đạo hàm", **bảng nguyên hàm chính là bảng đạo hàm đọc ngược**.

### 5.1. Bảng 10 hàm sơ cấp

| \`f(x)\` | Nguyên hàm \`F(x)\` (kèm \`+ C\`) | Ghi chú |
|--------|-------------------------------|---------|
| \`xⁿ\` (n ≠ −1) | \`x^{n+1}/(n+1) + C\` | Tăng số mũ lên 1, chia cho số mũ mới. |
| \`1/x\` | \`ln|x| + C\` | Trường hợp đặc biệt khi \`n = −1\`. |
| \`eˣ\` | \`eˣ + C\` | "Hàm tự nguyên hàm". |
| \`aˣ\` (a > 0, a ≠ 1) | \`aˣ / ln a + C\` | Tổng quát hóa hàm mũ. |
| \`sin x\` | \`−cos x + C\` | Chú ý dấu trừ! |
| \`cos x\` | \`sin x + C\` | |
| \`sec² x\` | \`tan x + C\` | Vì \`(tan x)' = sec² x\`. |
| \`1 / √(1 − x²)\` | \`arcsin x + C\` | (Hữu ích trong xác suất.) |
| \`1 / (1 + x²)\` | \`arctan x + C\` | Dùng trong phân phối Cauchy. |
| \`cosh x\` (hiếm) | \`sinh x + C\` | Hàm hyperbolic. |

> **⚠ Lỗi thường gặp.**
> - **Quên \`+ C\`** khi viết nguyên hàm tổng quát. Chỉ bỏ được khi tính tích phân xác định.
> - Áp dụng công thức \`x^{n+1}/(n+1)\` cho \`n = −1\` → chia cho 0! Trường hợp này phải dùng \`ln|x|\`.
> - Nhầm dấu: \`(sin x)' = cos x\` nhưng \`∫ sin x dx = −cos x + C\` (dấu trừ).

### 5.2. Tính chất tuyến tính của tích phân

Hai tính chất cực kỳ tiện:

1. **Hệ số hằng**: \`∫ k · f(x) dx = k · ∫ f(x) dx\`.
2. **Tổng**: \`∫ [f(x) + g(x)] dx = ∫ f(x) dx + ∫ g(x) dx\`.

Walk-through: \`∫_0^1 (3x² + 5) dx\`.

\`\`\`
= ∫_0^1 3x² dx + ∫_0^1 5 dx
= 3·∫_0^1 x² dx + 5·∫_0^1 1 dx
= 3·(1/3) + 5·(1 − 0)
= 1 + 5 = 6
\`\`\`

Verify bằng FTC trực tiếp: \`F(x) = x³ + 5x\`. \`F(1) − F(0) = (1 + 5) − 0 = 6\`. ✓

---

## 6. Kỹ thuật tích phân cơ bản

Đa số tích phân thực tế **không** trùng bảng. Cần biến đổi để đưa về dạng đơn giản.

### 6.1. Đổi biến (Substitution / u-substitution) — chain rule chạy ngược

Đây là kỹ thuật quan trọng nhất. Nó chính là **chain rule** ([Lesson 04](../lesson-04-chain-rule/)) đọc ngược.

**Công thức**: nếu \`u = g(x)\` thì \`du = g'(x) dx\`. Khi đó:
\`\`\`
∫ f(g(x)) · g'(x) dx = ∫ f(u) du
\`\`\`

**Walk-through 1: \`∫ 2x · cos(x²) dx\`.**

Đặt \`u = x²\`. Đạo hàm: \`du/dx = 2x\`, nên \`du = 2x dx\`.

Tích phân gốc viết lại:
\`\`\`
∫ cos(x²) · (2x dx) = ∫ cos(u) du = sin u + C = sin(x²) + C
\`\`\`

**Verify**: \`d/dx [sin(x²)] = cos(x²) · 2x\` ✓ (đúng chain rule).

**Walk-through 2: \`∫_0^1 x · e^{x²} dx\`.**

Đặt \`u = x²\`, \`du = 2x dx\`, tức \`x dx = du/2\`. Khi \`x = 0\` → \`u = 0\`; khi \`x = 1\` → \`u = 1\` (đổi luôn cận).

\`\`\`
∫_0^1 x · e^{x²} dx = ∫_0^1 e^u · (du/2) = (1/2) · [eᵘ]_0^1
                   = (1/2)(e − 1) ≈ 0.859
\`\`\`

### 6.2. Tích phân từng phần (Integration by parts)

Đây là **product rule** chạy ngược. Nhớ: \`(uv)' = u'v + uv'\`. Lấy tích phân hai vế: \`uv = ∫ u'v dx + ∫ uv' dx\`. Sắp lại:

\`\`\`
∫ u dv = u · v − ∫ v du
\`\`\`

**Walk-through: \`∫ x · eˣ dx\`.**

Chọn \`u = x\` (vì đạo hàm \`u' = 1\` đơn giản), \`dv = eˣ dx\` (vì nguyên hàm \`v = eˣ\` dễ).

Khi đó: \`du = dx\`, \`v = eˣ\`.

\`\`\`
∫ x · eˣ dx = x · eˣ − ∫ eˣ · dx = x · eˣ − eˣ + C = (x − 1)eˣ + C
\`\`\`

**Verify**: \`d/dx [(x−1)eˣ] = 1 · eˣ + (x−1) · eˣ = (1 + x − 1) eˣ = x · eˣ\` ✓

> **❓ Câu hỏi tự nhiên: "Chọn \`u\` và \`dv\` thế nào?"** Mẹo LIATE — ưu tiên \`u\` theo thứ tự: **L**ogarithm > **I**nverse trig > **A**lgebraic > **T**rig > **E**xponential. Trong ví dụ trên, \`x\` là Algebraic, \`eˣ\` là Exponential → chọn \`u = x\`. Quy tắc này không tuyệt đối nhưng đúng phần lớn.

---

## 7. Tích phân không xác định và tích phân xác định

| | Tích phân không xác định | Tích phân xác định |
|---|--------------------------|---------------------|
| Ký hiệu | \`∫ f(x) dx\` | \`∫_a^b f(x) dx\` |
| Kết quả | Một **hàm số** (họ nguyên hàm) + C | Một **số** |
| Ý nghĩa | "Tìm nguyên hàm" | "Tính diện tích có dấu trên \`[a, b]\`" |
| Ví dụ | \`∫ x² dx = x³/3 + C\` | \`∫_0^1 x² dx = 1/3\` |

Quan hệ: nếu biết tích phân không xác định, áp FTC ra tích phân xác định.

> **💡 Trực giác.** Tích phân không xác định = công thức tổng quát. Tích phân xác định = công thức đó áp lên một đoạn cụ thể, ra một con số.

---

## 8. Tích phân nhiều biến — giới thiệu

Khi \`f(x, y)\` là hàm hai biến, tích phân **kép** là:
\`\`\`
∫∫_D f(x, y) dA
\`\`\`
Diễn giải: chia miền \`D\` trong mặt phẳng \`Oxy\` thành các ô vuông nhỏ diện tích \`dA = dx dy\`, cộng \`f · dA\` cho từng ô. Khi ô → vô cùng nhỏ → tích phân kép. Nếu \`f ≥ 0\`, đại lượng này = **thể tích** vùng dưới mặt \`z = f(x, y)\`.

Cách tính: lặp lại tích phân 1 biến — tích phân \`f(x, y)\` theo \`y\` (giữ \`x\` cố định) rồi tích phân kết quả theo \`x\`:
\`\`\`
∫∫_{[a,b]×[c,d]} f(x, y) dA = ∫_a^b [ ∫_c^d f(x, y) dy ] dx
\`\`\`

Đây là **định lý Fubini**. Bài này chỉ giới thiệu, chi tiết sẽ gặp ở **Tầng 5 — Probability** (phân phối nhiều biến, joint PDF) và Tầng 6 (loss của batch mẫu).

**Ví dụ siêu nhanh**: \`∫∫_{[0,1]×[0,1]} xy dA\`.
\`\`\`
= ∫_0^1 [ ∫_0^1 xy dy ] dx
= ∫_0^1 [ x · y²/2 ]_0^1 dx
= ∫_0^1 (x/2) dx
= (1/2) · [x²/2]_0^1 = 1/4
\`\`\`

---

## 9. Liên hệ ML/AI — Xác suất liên tục

Đây là **lý do chính** ta học tích phân cho ML. Mọi xác suất liên tục đều phát biểu bằng tích phân.

### 9.1. Probability Density Function (PDF) — hàm mật độ xác suất

Với biến rời rạc (vd kết quả gieo xúc xắc), ta liệt kê được \`P(X = 1) = 1/6\`, \`P(X = 2) = 1/6\`, … và xác suất là một **bảng**.

Với biến **liên tục** (vd chiều cao của một người), \`P(X = 1.70m) = 0\` vì có vô số giá trị! Thay vì gán xác suất cho mỗi điểm, ta định nghĩa một **hàm mật độ \`p(x)\`** sao cho:

\`\`\`
P(a ≤ X ≤ b) = ∫_a^b p(x) dx
\`\`\`

\`p(x)\` không phải là xác suất (nó có thể \`> 1\`!), mà là **mật độ** — bao nhiêu "xác suất" trên một đơn vị độ dài. Để biến \`p(x)\` thành xác suất, ta nhân với độ rộng vô cùng nhỏ \`dx\`, rồi cộng dồn (tức tích phân).

### 9.2. Tổng xác suất = 1

Vì \`X\` chắc chắn rơi đâu đó:
\`\`\`
∫_{−∞}^{+∞} p(x) dx = 1
\`\`\`

Đây là **điều kiện chuẩn hóa**. Mọi PDF hợp lệ phải thỏa.

### 9.3. Walk-through — phân phối đều \`Uniform[a, b]\`

Định nghĩa: \`p(x) = 1/(b − a)\` nếu \`a ≤ x ≤ b\`, ngược lại \`p(x) = 0\`.

**Kiểm tra chuẩn hóa**:
\`\`\`
∫_{−∞}^{+∞} p(x) dx = ∫_a^b 1/(b−a) dx
                    = 1/(b−a) · (b − a) = 1 ✓
\`\`\`

**Tính xác suất** \`X\` nằm trong \`[c, d] ⊂ [a, b]\`:
\`\`\`
P(c ≤ X ≤ d) = ∫_c^d 1/(b−a) dx = (d − c)/(b − a)
\`\`\`

Ví dụ \`Uniform[0, 10]\`, xác suất \`X ∈ [3, 5]\` = \`(5 − 3)/10 = 0.2\`. Đúng trực giác — "ô" rộng 2 chiếm 20% của đoạn dài 10.

### 9.4. Kỳ vọng (Expectation / Mean)

Trung bình "có trọng số mật độ":
\`\`\`
E[X] = ∫_{−∞}^{+∞} x · p(x) dx
\`\`\`

Walk-through cho \`Uniform[a, b]\`:
\`\`\`
E[X] = ∫_a^b x · 1/(b−a) dx
     = 1/(b−a) · [x²/2]_a^b
     = 1/(b−a) · (b² − a²)/2
     = (b + a)/2
\`\`\`
Tức điểm giữa đoạn \`[a, b]\`. Cực kỳ trực giác.

Ví dụ \`Uniform[0, 10]\`: \`E[X] = 5\`. ✓

### 9.5. Phương sai (Variance)

\`\`\`
Var(X) = E[(X − μ)²] = ∫ (x − μ)² · p(x) dx
\`\`\`
trong đó \`μ = E[X]\`. Đo độ phân tán.

Walk-through cho \`Uniform[a, b]\` với \`μ = (a+b)/2\`:
\`\`\`
Var(X) = ∫_a^b (x − μ)² · 1/(b−a) dx
       = 1/(b−a) · [ (x − μ)³ / 3 ]_a^b
       = (b − a)² / 12
\`\`\`
Ví dụ \`Uniform[0, 1]\`: \`Var = 1/12 ≈ 0.0833\`. Độ lệch chuẩn \`σ ≈ 0.289\`.

### 9.6. Phân phối Gaussian (Normal) — preview Tầng 5

Phân phối quan trọng nhất ML:
\`\`\`
p(x) = (1 / √(2π σ²)) · exp(−(x − μ)² / (2σ²))
\`\`\`

Tích phân toàn miền = 1 (kiểm chứng bằng tích phân Gaussian — kỹ thuật hay nhưng phức tạp). \`E[X] = μ\`, \`Var(X) = σ²\`.

**Chuyện thú vị**: \`exp(−x²)\` **không** có nguyên hàm dạng đóng — nghĩa là **không** tồn tại một biểu thức bằng hàm sơ cấp cho \`∫ exp(−x²) dx\`. Ta phải dùng:
- Định nghĩa hàm mới: \`erf(x) = (2/√π) ∫_0^x exp(−t²) dt\`.
- Hoặc tính bằng phương pháp số (mục 11).

Sẽ học chi tiết phân phối Gaussian ở Tầng 5.

### 9.7. Cross-entropy liên tục — preview Tầng 6

Trong Tầng 5 ta sẽ học **cross-entropy** cho biến rời rạc:
\`\`\`
H(p, q) = −Σᵢ p(i) log q(i)
\`\`\`

Phiên bản **liên tục** là tích phân:
\`\`\`
H(p, q) = −∫ p(x) log q(x) dx
\`\`\`

Dùng khi cả \`p\` (phân phối thật) và \`q\` (phân phối model dự đoán) đều là PDF — ví dụ các mô hình sinh ảnh, VAE, normalizing flow.

> **❓ Câu hỏi tự nhiên: "Tại sao ML không chỉ dùng rời rạc cho gọn?"** Vì rất nhiều biến tự nhiên là liên tục: ảnh (pixel là [0, 255], chia mịn thành float), âm thanh, embedding vector. Nếu chỉ dùng rời rạc, model phải "rời rạc hóa" liên tục — mất thông tin và phải chọn lưới phù hợp. Tích phân cho ta công cụ làm việc trực tiếp với continuous distribution.

---

## 10. Tích phân suy rộng (Improper integral) — cận vô cực

Khi cận tích phân là \`±∞\` hoặc hàm có điểm vô cực bên trong:

\`\`\`
∫_{−∞}^{+∞} f(x) dx  =  lim (R → ∞)  ∫_{−R}^{R} f(x) dx
\`\`\`

Walk-through: \`∫_1^{+∞} (1/x²) dx\`.
\`\`\`
= lim (R → ∞) ∫_1^R x^{−2} dx
= lim (R → ∞) [ −1/x ]_1^R
= lim (R → ∞) (−1/R + 1)
= 0 + 1 = 1
\`\`\`

Tích phân **hội tụ** (ra số hữu hạn) — dù miền dài vô tận, hàm tắt đủ nhanh nên tổng có giới hạn.

Ngược lại: \`∫_1^{+∞} (1/x) dx = lim ln R = +∞\` — **phân kỳ**. Đây là sự khác biệt tế nhị: \`1/x²\` tắt nhanh hơn \`1/x\` đủ để diện tích vô tận vẫn hữu hạn.

Tích phân Gaussian \`∫_{−∞}^{+∞} exp(−x²/2) dx = √(2π)\` cũng là tích phân suy rộng (hội tụ).

---

## 11. Numerical Integration — khi không có nguyên hàm dạng đóng

Một số tích phân thực tế (Gaussian PDF, integrate qua model neural network) không có nguyên hàm sơ cấp. Phải tính **bằng số**.

### 11.1. Trapezoidal rule (quy tắc hình thang)

Thay vì xấp xỉ bằng hình chữ nhật, dùng **hình thang** nối các điểm \`(xᵢ, f(xᵢ))\`:

\`\`\`
∫_a^b f(x) dx ≈ (Δx / 2) · [ f(x₀) + 2f(x₁) + 2f(x₂) + … + 2f(x_{n−1}) + f(xₙ) ]
\`\`\`

Trực giác: trên mỗi đoạn \`[x_{i−1}, xᵢ]\`, diện tích hình thang = \`(f(x_{i−1}) + f(xᵢ))/2 · Δx\`. Cộng hết → công thức trên (các điểm giữa được tính 2 lần nên có hệ số 2).

**Sai số**: \`O(1/n²)\` — tốt hơn Riemann left/right \`O(1/n)\`.

**Pseudo-code (Go-style)**:
\`\`\`go
func Trapezoid(f func(float64) float64, a, b float64, n int) float64 {
    dx := (b - a) / float64(n)
    sum := (f(a) + f(b)) / 2
    for i := 1; i < n; i++ {
        x := a + float64(i)*dx
        sum += f(x)
    }
    return sum * dx
}
\`\`\`

### 11.2. Simpson's rule (quy tắc Simpson)

Thay xấp xỉ tuyến tính (thang) bằng **parabol** đi qua 3 điểm liên tiếp:

\`\`\`
∫_a^b f(x) dx ≈ (Δx / 3) · [ f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + … + 4f(x_{n−1}) + f(xₙ) ]
\`\`\`
(yêu cầu \`n\` chẵn). Hệ số xen kẽ \`1, 4, 2, 4, 2, …, 4, 1\`.

**Sai số**: \`O(1/n⁴)\` — siêu nhanh. Với \`n = 100\` đã có 8 chữ số thập phân chính xác cho hầu hết hàm trơn.

**Pseudo-code**:
\`\`\`go
func Simpson(f func(float64) float64, a, b float64, n int) float64 {
    if n%2 != 0 { n++ }
    dx := (b - a) / float64(n)
    sum := f(a) + f(b)
    for i := 1; i < n; i++ {
        x := a + float64(i)*dx
        if i%2 == 0 {
            sum += 2 * f(x)
        } else {
            sum += 4 * f(x)
        }
    }
    return sum * dx / 3
}
\`\`\`

### 11.3. So sánh hội tụ — \`∫_0^1 x² dx\`

Giá trị thật: \`1/3 ≈ 0.333333...\`.

| \`n\` | Left | Right | Mid | Trapezoid | Simpson |
|-----|------|-------|-----|-----------|---------|
| 4   | 0.21875 | 0.46875 | 0.328125 | 0.34375 | 0.3333333... |
| 10  | 0.285 | 0.385 | 0.3325 | 0.335 | 0.3333333... |
| 100 | 0.32835 | 0.33835 | 0.333325 | 0.333350 | 0.3333333... |

Simpson "chạm đáy" ngay vì \`x²\` là polynomial bậc 2 — chính xác là đa thức mà Simpson dùng để xấp xỉ. Trapezoid cần \`n\` lớn hơn. Riemann left/right tệ nhất.

> **⚠ Lỗi thường gặp với numerical integration.** Khi hàm có điểm gián đoạn hoặc dao động mạnh (vd \`sin(1/x)\` quanh 0), mọi phương pháp lưới đều phá sản. Phải dùng **adaptive quadrature** — chia mịn ở chỗ hàm dao động, thưa ở chỗ trơn. Các thư viện như \`scipy.integrate.quad\` (Python) hoặc \`gonum.integrate\` (Go) dùng adaptive.

---

## 12. Câu hỏi tự nhiên (gom mục lớn)

> **❓ "Tại sao tích phân lại bằng phép ngược của đạo hàm? Có vẻ đột ngột."**
> Vì nếu \`G(x) = "diện tích tích lũy" ∫_a^x f(t) dt\`, thì khi tăng \`x\` lên \`dx\`, diện tích tăng thêm chính bằng dải mới rộng \`dx\`, cao \`f(x)\`, tức \`dG = f(x) dx\`, hay \`G'(x) = f(x)\`. Đó là lý do FTC đúng. Không phải sự trùng hợp.

> **❓ "Mọi hàm liên tục đều có nguyên hàm — vậy có công thức luôn không?"**
> Có nguyên hàm (theo Phần 2 của FTC), nhưng **không phải** lúc nào cũng biểu diễn được bằng các hàm sơ cấp (polynomial, exp, log, trig, hợp thành). Ví dụ kinh điển: \`exp(−x²)\`, \`sin(x)/x\`, \`1/log x\`. Phải định nghĩa hàm mới (erf, Si, Li) hoặc dùng tính số.

> **❓ "Hằng số \`C\` quan trọng đến đâu?"**
> Trong tích phân **xác định** → triệt tiêu, không quan trọng. Trong tích phân **không xác định** → quan trọng nếu bài toán có **điều kiện ban đầu**. Ví dụ giải \`y'(x) = x\` với \`y(0) = 3\` → \`y(x) = x²/2 + C\`, dùng \`y(0) = 3\` ⇒ \`C = 3\`. Trong ML, \`C\` thường không quan trọng vì ta thường chỉ quan tâm tới hiệu giữa hai điểm (gradient, KL divergence relative).

> **❓ "Tích phân có 'tuyến tính' giống đạo hàm không?"**
> Có (mục 5.2). Nhưng **không có** quy tắc tích/thương đơn giản tương tự đạo hàm. \`∫ f · g dx ≠ ∫ f dx · ∫ g dx\`. Đây là lý do integration khó hơn differentiation — không có "algorithm cơ học" nào tính được mọi tích phân.

> **❓ "Tích phân Riemann có vấn đề gì với hàm 'xấu' không?"**
> Có. Tích phân Riemann không xử lý nổi một số hàm gián đoạn dày đặc (vd hàm Dirichlet). Toán học thật dùng **tích phân Lebesgue** — tổng quát hơn, cho phép tích phân các hàm phức tạp hơn. Trong ML và kỹ thuật, Riemann/Lebesgue cho cùng kết quả với mọi hàm "đẹp" ta gặp, nên không cần lo.

---

## 12.5. Các tính chất cơ bản của tích phân — không thể bỏ qua

Bộ "luật chơi" gọn nhưng dùng đi dùng lại liên tục trong phần còn lại của giải tích và xác suất.

### 12.5.1. Tuyến tính

\`\`\`
∫_a^b [α f(x) + β g(x)] dx = α ∫_a^b f(x) dx + β ∫_a^b g(x) dx
\`\`\`

**Ví dụ verify**: cho \`f(x) = x\`, \`g(x) = x²\`, \`[a, b] = [0, 1]\`, \`α = 2\`, \`β = 3\`.
- Vế trái: \`∫_0^1 (2x + 3x²) dx = [x² + x³]_0^1 = 1 + 1 = 2\`.
- Vế phải: \`2·∫_0^1 x dx + 3·∫_0^1 x² dx = 2·(1/2) + 3·(1/3) = 1 + 1 = 2\`. ✓

### 12.5.2. Đảo cận

\`\`\`
∫_b^a f(x) dx = − ∫_a^b f(x) dx
\`\`\`

Nếu hoán đổi cận \`a ↔ b\`, tích phân đổi dấu. Trực giác: \`Δx\` đổi dấu khi \`a > b\`.

**Ví dụ**: \`∫_1^0 x dx = − ∫_0^1 x dx = −1/2\`.

### 12.5.3. Cộng đoạn (additivity)

\`\`\`
∫_a^c f(x) dx = ∫_a^b f(x) dx + ∫_b^c f(x) dx
\`\`\`

Tách miền tích phân thành 2 đoạn liên tiếp. Hữu ích khi \`f\` thay đổi quy luật giữa chừng (vd hàm có nhiều "nhánh" như \`|x|\`).

**Ví dụ**: \`∫_{-1}^1 |x| dx = ∫_{-1}^0 (−x) dx + ∫_0^1 x dx = 1/2 + 1/2 = 1\`.

### 12.5.4. So sánh

Nếu \`f(x) ≤ g(x)\` trên \`[a, b]\` thì \`∫_a^b f dx ≤ ∫_a^b g dx\`. Trực giác: vùng nhỏ hơn → diện tích nhỏ hơn.

Hệ quả: nếu \`m ≤ f(x) ≤ M\` trên \`[a, b]\` thì \`m(b − a) ≤ ∫_a^b f dx ≤ M(b − a)\` — kẹp giá trị tích phân trong "hộp" hình chữ nhật.

### 12.5.5. Tích phân của hàm chẵn / lẻ

- Nếu \`f\` là **hàm lẻ** (\`f(−x) = −f(x)\`): \`∫_{−a}^a f(x) dx = 0\`. Hai phần đối xứng triệt tiêu.
- Nếu \`f\` là **hàm chẵn** (\`f(−x) = f(x)\`): \`∫_{−a}^a f(x) dx = 2·∫_0^a f(x) dx\`.

**Ví dụ tiết kiệm công sức**: \`∫_{−π}^π sin x dx = 0\` (sin là hàm lẻ — không cần tính nguyên hàm). \`∫_{−1}^1 x³ dx = 0\` (x³ lẻ).

> **⚠ Lỗi thường gặp.** Áp dụng tính chất "lẻ" cho hàm KHÔNG lẻ. Vd \`∫_{-1}^1 x² dx ≠ 0\` (x² là hàm chẵn). Phải verify tính chẵn/lẻ trước.

---

## 12.6. Quay lại liên hệ ML — log-likelihood liên tục

Khi train một model sinh dữ liệu (vd VAE, normalizing flow), ta thường có:

- Tập huấn luyện \`{x_1, x_2, …, x_N}\` — N quan sát thực.
- Model định nghĩa một PDF \`q_θ(x)\` (θ là tham số).
- **Mục tiêu**: tối đa hóa **log-likelihood**:
  \`\`\`
  L(θ) = Σᵢ log q_θ(xᵢ)   (rời rạc trên N mẫu)
  \`\`\`

Khi \`N → ∞\`, theo luật số lớn:
\`\`\`
(1/N) Σᵢ log q_θ(xᵢ)  →  E_{x ~ p_data}[log q_θ(x)]  =  ∫ p_data(x) · log q_θ(x) dx
\`\`\`

Đó chính là **cross-entropy âm**: \`−H(p_data, q_θ)\`. Vậy:
- **Maximize log-likelihood ↔ Minimize cross-entropy**.
- Cross-entropy ở dạng tích phân — chính là lý do ta cần học tích phân.

Sẽ trở lại đầy đủ ở Tầng 5/6.

---

## 12.7. Volumetric integration — preview Tầng 4-5

Khi \`x\` là vector \`n\` chiều (ảnh, embedding), tích phân trở thành **tích phân nhiều biến**:
\`\`\`
∫_{ℝⁿ} f(x) dx
\`\`\`
Đối với phân phối Gaussian đa biến \`N(μ, Σ)\`:
\`\`\`
p(x) = (1 / √((2π)ⁿ |Σ|)) · exp(−½ (x − μ)ᵀ Σ⁻¹ (x − μ))
\`\`\`
Bạn sẽ gặp \`Σ\` (ma trận covariance) ở Tầng 4 và toàn bộ machinery của đại số tuyến tính sẽ làm chuyện tính toán này thành tự nhiên. Hôm nay chỉ cần nhớ: **mọi xác suất đa chiều cũng vẫn là tích phân, chỉ là tích phân nhiều biến**.

---

## 13. Bài tập

1. **Bằng tay**: Tính Riemann sum của \`f(x) = 2x + 1\` trên \`[0, 2]\` với \`n = 4\`, điểm phải.
2. **FTC**: Tính \`∫_0^2 (3x² − 2x + 1) dx\` bằng nguyên hàm. Verify bằng Riemann sum \`n = 100\` qua nhẩm (xấp xỉ).
3. **Đổi biến**: Tính \`∫ x · cos(x²) dx\`.
4. **Đổi biến với cận**: Tính \`∫_0^2 x · √(1 + x²) dx\`.
5. **Tích phân từng phần**: Tính \`∫ x · ln x dx\`.
6. **PDF**: Cho \`p(x) = 3x²\` trên \`[0, 1]\`, 0 ngoài đoạn đó. Kiểm tra đó có là PDF không, tính \`P(0.5 ≤ X ≤ 0.8)\`, và \`E[X]\`.
7. **Hàm lẻ/chẵn**: Tính \`∫_{−π/2}^{π/2} (sin x + cos x) dx\` bằng cách tách thành 2 tích phân, dùng tính chất chẵn/lẻ.
8. **Tích phân suy rộng**: Kiểm tra xem \`∫_0^{+∞} e^{−x} dx\` có hội tụ không, tính kết quả.
9. **Numerical**: Cài đặt tay Simpson với \`n = 4\` cho \`∫_0^1 e^{−x²} dx\`. So với giá trị tham chiếu \`≈ 0.7468\`.
10. **Ứng dụng ML**: Cho \`p(x) = e^{−x}\` (Exponential, λ=1) trên \`[0, +∞)\`. Tính \`E[X]\` và \`Var(X)\`.

---

## 14. Lời giải chi tiết

### Bài 1 — Riemann sum của \`f(x) = 2x + 1\` trên \`[0, 2]\`, \`n = 4\`, điểm phải

**Cách tiếp cận**: tính \`Δx\`, liệt kê \`xᵢ\`, lập bảng \`f(xᵢ)\`, cộng nhân \`Δx\`.

\`Δx = (2 − 0)/4 = 0.5\`. Điểm phải: \`x₁ = 0.5, x₂ = 1.0, x₃ = 1.5, x₄ = 2.0\`.

| \`i\` | \`xᵢ\` | \`f(xᵢ) = 2xᵢ + 1\` |
|-----|------|--------------------|
| 1 | 0.5 | 2 |
| 2 | 1.0 | 3 |
| 3 | 1.5 | 4 |
| 4 | 2.0 | 5 |
| **Σ** | | **14** |

\`S₄ (right) = 14 · 0.5 = 7\`.

**Giá trị thật** (qua FTC): \`F(x) = x² + x\`. \`F(2) − F(0) = (4 + 2) − 0 = 6\`. Right Riemann overestimate (vì \`f\` tăng), khớp trực giác.

**Độ phức tạp**: \`O(n)\` tổng, hoàn toàn cộng đơn giản.

### Bài 2 — \`∫_0^2 (3x² − 2x + 1) dx\`

**Nguyên hàm**: \`F(x) = x³ − x² + x\` (vì \`(x³)' = 3x²\`, \`(x²)' = 2x\`, \`(x)' = 1\`).

\`\`\`
∫_0^2 (3x² − 2x + 1) dx = F(2) − F(0)
                       = (8 − 4 + 2) − 0
                       = 6
\`\`\`

**Verify với Riemann nhẩm**: lấy \`n = 4\`, \`Δx = 0.5\`, điểm giữa \`0.25, 0.75, 1.25, 1.75\`.

| \`x\` | \`3x² − 2x + 1\` |
|-----|-----------------|
| 0.25 | \`0.1875 − 0.5 + 1 = 0.6875\` |
| 0.75 | \`1.6875 − 1.5 + 1 = 1.1875\` |
| 1.25 | \`4.6875 − 2.5 + 1 = 3.1875\` |
| 1.75 | \`9.1875 − 3.5 + 1 = 6.6875\` |
| Σ | 11.75 |

\`S₄ (mid) = 11.75 · 0.5 = 5.875\`. Khá gần 6. Tăng \`n\` → sát hơn.

### Bài 3 — \`∫ x · cos(x²) dx\`

**Đổi biến**: \`u = x²\`, \`du = 2x dx\`, tức \`x dx = du/2\`.

\`\`\`
∫ x · cos(x²) dx = ∫ cos(u) · (du/2)
                = (1/2) · sin(u) + C
                = (1/2) sin(x²) + C
\`\`\`

**Verify**: \`d/dx [(1/2) sin(x²)] = (1/2) cos(x²) · 2x = x cos(x²)\` ✓

### Bài 4 — \`∫_0^2 x · √(1 + x²) dx\`

**Đổi biến**: \`u = 1 + x²\`, \`du = 2x dx\`, \`x dx = du/2\`.

Đổi cận: \`x = 0 → u = 1\`, \`x = 2 → u = 5\`.

\`\`\`
∫_0^2 x √(1 + x²) dx = ∫_1^5 √u · (du/2)
                    = (1/2) · [u^{3/2} / (3/2)]_1^5
                    = (1/2) · (2/3) · [u^{3/2}]_1^5
                    = (1/3) · (5^{3/2} − 1)
                    = (1/3) · (5√5 − 1)
                    ≈ (1/3) · (11.180 − 1)
                    ≈ 3.394
\`\`\`

### Bài 5 — \`∫ x · ln x dx\`

**Tích phân từng phần** với \`u = ln x\`, \`dv = x dx\`. (Theo LIATE — Logarithm có thứ tự ưu tiên cao hơn Algebraic, nên chọn \`u = ln x\`.)

Khi đó: \`du = (1/x) dx\`, \`v = x²/2\`.

\`\`\`
∫ x · ln x dx = u · v − ∫ v · du
              = (ln x) · (x²/2) − ∫ (x²/2) · (1/x) dx
              = (x²/2) ln x − ∫ (x/2) dx
              = (x²/2) ln x − x²/4 + C
              = (x²/4) (2 ln x − 1) + C
\`\`\`

**Verify**: 
\`\`\`
d/dx [(x²/2) ln x − x²/4]
  = x · ln x + (x²/2) · (1/x) − x/2
  = x ln x + x/2 − x/2
  = x ln x ✓
\`\`\`

### Bài 6 — \`p(x) = 3x²\` trên \`[0, 1]\`

**Kiểm tra chuẩn hóa**:
\`\`\`
∫_0^1 3x² dx = [x³]_0^1 = 1 − 0 = 1 ✓
\`\`\`
Vậy \`p\` là PDF hợp lệ.

**Xác suất**:
\`\`\`
P(0.5 ≤ X ≤ 0.8) = ∫_{0.5}^{0.8} 3x² dx
                 = [x³]_{0.5}^{0.8}
                 = 0.512 − 0.125 = 0.387
\`\`\`

**Kỳ vọng**:
\`\`\`
E[X] = ∫_0^1 x · 3x² dx = ∫_0^1 3x³ dx
     = 3 · [x⁴/4]_0^1
     = 3/4 = 0.75
\`\`\`

(Trực giác: mật độ tập trung về phía \`x = 1\` vì \`p(x) = 3x²\` lớn dần, nên trung bình lệch phải so với 0.5.)

### Bài 7 — \`∫_{−π/2}^{π/2} (sin x + cos x) dx\`

Tách:
\`\`\`
∫_{−π/2}^{π/2} sin x dx + ∫_{−π/2}^{π/2} cos x dx
\`\`\`

\`sin x\` là hàm **lẻ** → tích phân trên đoạn đối xứng quanh 0 bằng 0.

\`cos x\` là hàm **chẵn** → \`∫_{−π/2}^{π/2} cos x dx = 2 ∫_0^{π/2} cos x dx = 2 · [sin x]_0^{π/2} = 2 · (1 − 0) = 2\`.

**Kết quả**: \`0 + 2 = 2\`.

Verify thẳng (không dùng đối xứng): nguyên hàm là \`−cos x + sin x\`.
- Tại \`π/2\`: \`−cos(π/2) + sin(π/2) = 0 + 1 = 1\`.
- Tại \`−π/2\`: \`−cos(−π/2) + sin(−π/2) = 0 − 1 = −1\`.
- Hiệu: \`1 − (−1) = 2\`. ✓

### Bài 8 — \`∫_0^{+∞} e^{−x} dx\`

Đây là tích phân suy rộng. Định nghĩa qua giới hạn:
\`\`\`
∫_0^{+∞} e^{−x} dx = lim (R → ∞) ∫_0^R e^{−x} dx
                   = lim (R → ∞) [ −e^{−x} ]_0^R
                   = lim (R → ∞) (−e^{−R} + e⁰)
                   = 0 + 1 = 1
\`\`\`

**Kết luận**: hội tụ, giá trị = 1. Đây là PDF của phân phối Exponential(λ=1) — tích phân toàn miền phải = 1. ✓

### Bài 9 — Simpson cho \`∫_0^1 e^{−x²} dx\`

\`n = 4\`, \`Δx = 0.25\`. Các điểm \`x = 0, 0.25, 0.5, 0.75, 1\`.

Tính \`f(x) = e^{−x²}\`:

| \`x\` | \`−x²\` | \`e^{−x²}\` |
|-----|-------|-----------|
| 0    | 0       | 1.000000 |
| 0.25 | −0.0625 | 0.939413 |
| 0.5  | −0.25   | 0.778801 |
| 0.75 | −0.5625 | 0.569783 |
| 1.0  | −1      | 0.367879 |

Simpson: \`(Δx/3) · [f₀ + 4f₁ + 2f₂ + 4f₃ + f₄]\`.

\`\`\`
= (0.25 / 3) · [1 + 4(0.939413) + 2(0.778801) + 4(0.569783) + 0.367879]
= (0.083333) · [1 + 3.757652 + 1.557602 + 2.279132 + 0.367879]
= (0.083333) · 8.962265
= 0.746855
\`\`\`

Giá trị tham chiếu: \`≈ 0.74682\`. Sai số \`≈ 0.00003\` — chỉ với \`n = 4\`! Simpson rất hiệu quả.

Lưu ý: \`e^{−x²}\` không có nguyên hàm sơ cấp — đây là **lý do** ta cần phương pháp số.

### Bài 10 — Exponential \`p(x) = e^{−x}\` trên \`[0, +∞)\`

**E[X]**: dùng tích phân từng phần.
\`\`\`
E[X] = ∫_0^{+∞} x · e^{−x} dx
\`\`\`
Với \`u = x\`, \`dv = e^{−x} dx\` → \`du = dx\`, \`v = −e^{−x}\`.
\`\`\`
= [−x e^{−x}]_0^{+∞} − ∫_0^{+∞} (−e^{−x}) dx
= 0 − 0 + ∫_0^{+∞} e^{−x} dx
= 0 + 1 = 1
\`\`\`
(Cận trên \`−x e^{−x} → 0\` khi \`x → ∞\` vì \`e^{−x}\` tắt nhanh hơn \`x\` tăng.)

**E[X²]**: tích phân từng phần lần 2.
\`\`\`
E[X²] = ∫_0^{+∞} x² · e^{−x} dx
\`\`\`
\`u = x²\`, \`dv = e^{−x} dx\` → \`du = 2x dx\`, \`v = −e^{−x}\`.
\`\`\`
= [−x² e^{−x}]_0^{+∞} + ∫_0^{+∞} 2x e^{−x} dx
= 0 + 2 · E[X] = 2
\`\`\`

**Var(X)** = \`E[X²] − (E[X])²\` = \`2 − 1 = 1\`.

Kết quả khớp công thức chuẩn của Exponential(λ): \`E[X] = 1/λ = 1\`, \`Var = 1/λ² = 1\`. ✓

---

## 15. Tóm tắt

> **📝 Tóm tắt Lesson 08**
> - **Tích phân xác định** \`∫_a^b f(x) dx\` = giới hạn của Riemann sum khi \`n → ∞\` = "diện tích có dấu" dưới đồ thị.
> - **FTC** kết nối đạo hàm và tích phân: nếu \`F' = f\` thì \`∫_a^b f dx = F(b) − F(a)\`. Đây là cây cầu trung tâm của giải tích.
> - **Bảng nguyên hàm** là bảng đạo hàm đọc ngược. Nhớ \`+ C\` cho tích phân không xác định.
> - **2 kỹ thuật cơ bản**: u-substitution (chain rule ngược) và integration by parts (product rule ngược).
> - **PDF, kỳ vọng, phương sai, cross-entropy liên tục** — tất cả đều là tích phân. Đây là cây cầu sang Tầng 5 — Probability.
> - **Numerical integration** (Trapezoid, Simpson) cần thiết khi không có nguyên hàm dạng đóng — phổ biến trong ML.
> - **Cảnh báo nhẹ**: tích phân khó hơn đạo hàm vì **không có algorithm cơ học** tổng quát; chỉ có bộ mẹo (substitution, by parts, đối xứng…).

---

## 16. Tiếp theo

Đây là **bài cuối Tầng 3 — Calculus**. Bạn đã có đủ giải tích để hiểu mọi loss function và optimizer hiện đại của ML.

**Tầng tiếp theo — [Tầng 4 — Linear Algebra](../../)** (sắp ra): vector, ma trận chính thức, eigenvector, PCA, SVD. Bạn sẽ gặp lại "gradient là vector" trong toàn bộ machinery của linear algebra. Phép biến đổi tuyến tính, không gian con — tất cả đều có gốc rễ từ vector trong Calculus mà bạn vừa học.

**Sau Linear Algebra là Tầng 5 — Probability** — nơi bạn sẽ thấy tích phân vừa học bùng nổ: phân phối Gaussian, MLE (maximum likelihood estimation), cross-entropy, KL divergence. Tất cả đều dựa trên \`∫\`.

Code minh họa: bài này không có \`solutions.go\` — toàn bộ tương tác nằm ở **[visualization.html](./visualization.html)** (Riemann sum visualizer, FTC demo, bảng nguyên hàm, PDF + kỳ vọng).
`;
