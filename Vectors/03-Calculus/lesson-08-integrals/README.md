# Lesson 08 — Tích phân (Integrals)

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

- [Lesson 01 — Giới hạn](../lesson-01-limits/) — tích phân định nghĩa qua giới hạn $n \to \infty$.
- [Lesson 02 — Đạo hàm](../lesson-02-derivatives/) — tích phân là phép ngược; FTC cần đạo hàm để phát biểu.
- [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — bảng nguyên hàm chính là "đọc ngược" bảng đạo hàm.
- [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — đổi biến trong tích phân chính là chain rule chạy ngược.
- [Tầng 1 — Algebra Lesson 07: Hàm mũ và hàm log](../../01-Algebra/lesson-07-exp-log-functions/) — $\int \frac{1}{x}\,dx = \ln|x|$, $\int e^x\,dx = e^x$.

---

## 1. Trực giác — Diện tích dưới đường cong

> **💡 Trực giác.** Tưởng tượng bạn lái xe trên đường thẳng. Bảng đồng hồ chỉ vận tốc $v(t)$. Sau $T$ giây bạn đi được bao xa? Nếu vận tốc không đổi $v(t) = v_0$ thì câu trả lời quá dễ: $\text{quãng đường} = v_0 \cdot T$. Nhưng nếu vận tốc thay đổi liên tục thì sao? Trực giác: vẽ đồ thị $v(t)$, "diện tích" dưới đồ thị từ $t = 0$ đến $t = T$ chính là quãng đường. Đó là **tích phân**.

### 1.1. Định nghĩa "diện tích" cho hình không vuông vắn

Diện tích hình chữ nhật = dài × rộng. Diện tích tam giác = (đáy × chiều cao) / 2. Diện tích hình tròn = $\pi r^2$. Ổn — nhưng còn diện tích dưới một đường cong bất kỳ, ví dụ $f(x) = x^2$ từ $x = 0$ đến $x = 1$?

Trực giác cổ điển (Eudoxus, Archimedes, thế kỷ 4 TCN): **lấp đầy hình bằng các hình chữ nhật càng lúc càng nhỏ**, cộng diện tích của chúng, rồi cho số hình chữ nhật $\to \infty$. Đây là phương pháp **vét cạn (method of exhaustion)** — ý tưởng tiền thân của tích phân.

### 1.2. Ký hiệu

Ta viết:

$$\int_a^b f(x)\,dx$$

Đọc là: "tích phân của $f(x)$ từ $a$ đến $b$". Nếu $f(x) \geq 0$ trên $[a, b]$, đại lượng này = **diện tích vùng nằm dưới đồ thị $f$ và trên trục Ox**, giữa hai đường $x = a$ và $x = b$.

Tại sao ký hiệu kỳ lạ vậy?
- $\int$ là chữ $S$ kéo dài — viết tắt của **Sum** (tổng). Leibniz chọn năm 1675.
- $dx$ là "phần tử vô cùng nhỏ" theo trục $x$ — bề rộng của một dải chữ nhật vô cùng mỏng.
- $f(x)\,dx$ = chiều cao × bề rộng của dải đó.
- $\int_a^b$ = tổng tất cả các dải khi bề rộng $\to 0$.

> **❓ Câu hỏi tự nhiên: "Nếu $f(x) < 0$ thì sao?"** Khi đó $f(x)\,dx < 0$, nên tích phân ra số âm. Diện tích "vật lý" thì luôn dương, nhưng tích phân coi vùng nằm dưới trục Ox là **diện tích có dấu âm**. Ví dụ $\int_0^{2\pi} \sin(x)\,dx = 0$ — phần trên trục Ox (từ 0 đến $\pi$) và phần dưới (từ $\pi$ đến $2\pi$) triệt tiêu nhau.

---

## 2. Riemann sum — xấp xỉ diện tích bằng hình chữ nhật

Ý tưởng vét cạn cụ thể hóa thành Riemann sum (Bernhard Riemann, 1854).

### 2.1. Quy trình

Cho hàm $f$ xác định trên $[a, b]$. Để xấp xỉ diện tích:

1. **Chia** $[a, b]$ thành $n$ đoạn nhỏ bằng nhau, mỗi đoạn rộng:

$$\Delta x = \frac{b - a}{n}$$

2. Các điểm chia: $x_0 = a$, $x_1 = a + \Delta x$, $x_2 = a + 2\Delta x$, …, $x_n = b$.
3. Trên mỗi đoạn thứ $i$ (từ $x_{i-1}$ đến $x_i$), chọn **một điểm bất kỳ** $x_i^* \in [x_{i-1}, x_i]$.
4. Vẽ hình chữ nhật cao $f(x_i^*)$ và rộng $\Delta x$. Diện tích nó $= f(x_i^*) \cdot \Delta x$.
5. Cộng $n$ hình chữ nhật lại:

$$S_n = \sum_{i=1}^{n} f(x_i^*) \cdot \Delta x$$

$S_n$ là **tổng Riemann**. Khi $n$ càng lớn, hình chữ nhật càng mỏng, $S_n$ càng sát diện tích thật.

### 2.2. 3 cách chọn `xᵢ*` phổ biến

Cùng một $n$, kết quả khác nhau tùy chỗ chọn:

| Cách chọn | $x_i^*$ | Đặc điểm |
|-----------|-------|----------|
| **Trái (Left)** | $x_{i-1}$ | Nếu $f$ tăng: underestimate (thấp hơn thật). |
| **Phải (Right)** | $x_i$ | Nếu $f$ tăng: overestimate (cao hơn thật). |
| **Giữa (Midpoint)** | $\frac{x_{i-1} + x_i}{2}$ | Thường chính xác nhất với cùng $n$. |

Bất kể chọn cách nào, khi $n \to \infty$ cả ba đều tiến về cùng một số — đó là **tích phân xác định**.

### 2.3. Định nghĩa tích phân xác định

$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \cdot \Delta x$$

Hàm $f$ được gọi là **khả tích (integrable)** trên $[a, b]$ nếu giới hạn này tồn tại và không phụ thuộc vào cách chọn $x_i^*$. Mọi hàm liên tục trên $[a, b]$ đều khả tích — đây là kết quả chuẩn của giải tích, chứng minh ở mức trừu tượng hơn.

> **💡 Trực giác.** "Tích phân" = "tổng vô hạn các phần tử vô cùng nhỏ". $\sum$ (sigma) là tổng hữu hạn, $\int$ (s dài) là tổng vô hạn liên tục. $\Delta x$ là bước rời rạc, $dx$ là bước "vô cùng nhỏ".

---

## 3. Walk-through Riemann sum — bốn ví dụ cụ thể

Đến phần thật. Tính số bằng tay, từng bước.

### 3.1. `f(x) = x` trên `[0, 1]` với `n = 4`, chọn điểm **phải**

$\Delta x = \frac{1 - 0}{4} = 0.25$. Các điểm chia: $0, 0.25, 0.5, 0.75, 1$.

Chọn điểm phải: $x_i^* = x_i = 0.25, 0.5, 0.75, 1$.

| $i$ | $x_i^*$ | $f(x_i^*) = x_i^*$ | $f(x_i^*) \cdot \Delta x$ |
|-----|-------|----------------|--------------|
| 1 | 0.25 | 0.25 | 0.0625 |
| 2 | 0.50 | 0.50 | 0.1250 |
| 3 | 0.75 | 0.75 | 0.1875 |
| 4 | 1.00 | 1.00 | 0.2500 |
| | | **S₄ (right)** | **0.625** |

Chọn điểm trái: $x_i^* = x_{i-1} = 0, 0.25, 0.5, 0.75$. Tính tương tự → $S_4 \text{ (left)} = 0.375$.

Chọn điểm giữa: $x_i^* = 0.125, 0.375, 0.625, 0.875$. → $S_4 \text{ (mid)} = 0.5$ (chính xác!).

**Diện tích thật**: vùng dưới $y = x$ từ $0$ đến $1$ là tam giác vuông có hai cạnh góc vuông = 1, diện tích $= \frac{1 \cdot 1}{2} = 0.5$. Khớp với midpoint, và trung bình $\frac{\text{left} + \text{right}}{2} = 0.5$.

Khi $n \to \infty$:
- $S_n \text{ (right)} = \sum_{i=1}^{n} \frac{i}{n} \cdot \frac{1}{n} = \frac{1}{n^2} \cdot \frac{n(n+1)}{2} = \frac{n+1}{2n} \to \frac{1}{2}$.
- $S_n \text{ (left)} = \frac{n-1}{2n} \to \frac{1}{2}$.

Cả hai hội tụ về **0.5**. ✓

### 3.2. `f(x) = x²` trên `[0, 1]` với `n = 4`, chọn điểm **giữa**

$\Delta x = 0.25$. Điểm giữa: $0.125, 0.375, 0.625, 0.875$.

| $i$ | $x_i^*$ | $f(x_i^*) = (x_i^*)^2$ | $f(x_i^*) \cdot \Delta x$ |
|-----|-------|----------------|--------------|
| 1 | 0.125 | 0.015625 | 0.00390625 |
| 2 | 0.375 | 0.140625 | 0.03515625 |
| 3 | 0.625 | 0.390625 | 0.09765625 |
| 4 | 0.875 | 0.765625 | 0.19140625 |
| | | **S₄ (mid)** | **0.328125** |

Tăng $n$:

| $n$ | Phương pháp | $S_n$ |
|-----|-------------|-------|
| 4 | midpoint | 0.328125 |
| 10 | midpoint | 0.33250000... |
| 100 | midpoint | 0.33332500... |
| 1000 | midpoint | 0.33333325... |

Tiến về $\frac{1}{3} \approx 0.33333\ldots$ Có công thức đóng:

$$\begin{aligned}
S_n \text{ (right)} &= \sum_{i=1}^{n} \left(\frac{i}{n}\right)^2 \cdot \frac{1}{n} = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6} \\[4pt]
&= \frac{(n+1)(2n+1)}{6n^2} \\[4pt]
&\to \frac{2}{6} = \frac{1}{3} \quad \text{khi } n \to \infty
\end{aligned}$$

Khẳng định lại: $\int_0^1 x^2\,dx = \frac{1}{3}$.

### 3.3. `f(x) = 1/x` trên `[1, 2]` với `n = 10`, chọn điểm **giữa**

$\Delta x = \frac{2 - 1}{10} = 0.1$. Điểm giữa: $1.05, 1.15, 1.25, \ldots, 1.95$.

Tính $f(x_i^*) = \frac{1}{x_i^*}$ rồi nhân $0.1$:

| $x_i^*$ | $1/x_i^*$ |
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

$S_{10} \text{ (mid)} = 6.928353 \cdot 0.1 = 0.6928353$.

Giá trị thật: $\int_1^2 \frac{1}{x}\,dx = \ln(2) - \ln(1) = \ln 2 \approx 0.693147$.

Sai số: $|0.6928353 - 0.693147| \approx 0.00031$. Midpoint với $n = 10$ đã sát đến 3 chữ số thập phân. Khá ổn.

### 3.4. `f(x) = sin(x)` trên `[0, π]` với `n = 6`, chọn điểm **giữa**

$\Delta x = \frac{\pi}{6} \approx 0.5236$. Điểm giữa: $\frac{\pi}{12}, \frac{3\pi}{12}, \frac{5\pi}{12}, \frac{7\pi}{12}, \frac{9\pi}{12}, \frac{11\pi}{12}$.

Quy về radian:

| $x_i^*$ | $\sin(x_i^*)$ |
|-------|------------|
| $\pi/12 \approx 0.2618$ | 0.2588 |
| $3\pi/12 = \pi/4 \approx 0.7854$ | 0.7071 |
| $5\pi/12 \approx 1.3090$ | 0.9659 |
| $7\pi/12 \approx 1.8326$ | 0.9659 |
| $9\pi/12 = 3\pi/4 \approx 2.3562$ | 0.7071 |
| $11\pi/12 \approx 2.8798$ | 0.2588 |
| **Σ** | **3.8636** |

$S_6 \text{ (mid)} = 3.8636 \cdot \frac{\pi}{6} \approx 3.8636 \cdot 0.5236 \approx 2.0233$.

Giá trị thật: $\int_0^\pi \sin(x)\,dx = [-\cos x]_0^\pi = -\cos \pi + \cos 0 = 1 + 1 = 2$.

Sai số $\approx 0.023$. Tăng $n$ lên 100 → sai số $< 10^{-4}$.

> **⚠ Lỗi thường gặp.** Quên rằng $\Delta x = \frac{b - a}{n}$ chứ không phải $\frac{1}{n}$. Khi $b - a \neq 1$ thì nhân lộn ngay. Vd với $[1, 2]$ thì $\Delta x = 0.1$ khi $n = 10$, còn với $[0, \pi]$ thì $\Delta x = \frac{\pi}{n}$.

### 3.5. So sánh tốc độ hội tụ của 3 cách chọn — cùng hàm `x²` trên `[0, 1]`

| $n$ | Left | Right | Mid | Sai số mid |
|-----|------|-------|-----|------------|
| 4   | 0.21875  | 0.46875  | 0.328125 | 0.0052 |
| 10  | 0.285000 | 0.385000 | 0.332500 | 0.0008 |
| 50  | 0.323400 | 0.343400 | 0.333300 | 3.3e-5  |
| 100 | 0.328350 | 0.338350 | 0.333325 | 8.3e-6  |
| 1000| 0.332833 | 0.333833 | 0.333333 | 8.3e-8  |

Nhận xét quan trọng:
- **Left và Right hội tụ tuyến tính**: sai số $\sim O(1/n)$. Tăng $n$ gấp 10 → sai số giảm 10 lần.
- **Mid hội tụ bậc 2**: sai số $\sim O(1/n^2)$. Tăng $n$ gấp 10 → sai số giảm 100 lần.
- **Left + Right $\approx 2\cdot$Mid** (chính xác với hàm tuyến tính) — đây là gốc của công thức Trapezoid (mục 11.1).

> **💡 Trực giác.** Mid "tốt hơn" vì sai lệch ở nửa trái và nửa phải mỗi hình chữ nhật **triệt tiêu nhau** khi $f$ không quá cong trong đoạn. Left/Right luôn lệch theo một hướng cố định khi $f$ đơn điệu.

### 3.6. Vì sao cứ ngồi cộng tay mãi không xong?

Riemann sum giúp ta **định nghĩa** tích phân, và giúp tính bằng số. Nhưng để tính giải tích (lấy ra một biểu thức đóng), ta cần một công cụ mạnh hơn: **Định lý cơ bản của giải tích**.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Cho $f(x) = 2x$ trên $[0, 3]$ với $n = 3$, điểm phải. Tính $S_3$ và so sánh với diện tích tam giác.
> <details><summary>Đáp án</summary>
> $\Delta x = 1$. $x_i^* = 1, 2, 3$. $f(x_i^*) = 2, 4, 6$. $S_3 = (2 + 4 + 6) \cdot 1 = 12$. Diện tích thật của tam giác đáy 3, cao 6 $= \frac{3 \cdot 6}{2} = 9$. Right Riemann overestimate vì $f$ tăng.
> </details>
>
> 2. Cùng hàm trên cùng đoạn, dùng điểm giữa. Kết quả?
> <details><summary>Đáp án</summary>
> $x_i^* = 0.5, 1.5, 2.5$. $f(x_i^*) = 1, 3, 5$. $S_3 \text{ (mid)} = 1 + 3 + 5 = 9$. Khớp chính xác!
> </details>

---

## 4. Định lý cơ bản của giải tích (Fundamental Theorem of Calculus — FTC)

Đây là định lý đẹp nhất giải tích. Nó nói: **tích phân và đạo hàm là hai phép toán ngược nhau**.

### 4.1. Phát biểu

**Phần 1 — Tính tích phân qua nguyên hàm.**

Cho $f$ liên tục trên $[a, b]$. Nếu $F$ là một **nguyên hàm** của $f$ trên đoạn đó (tức là $F'(x) = f(x)$ với mọi $x \in [a, b]$), thì:

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

Ký hiệu: $F(b) - F(a)$ thường viết gọn là $[F(x)]_a^b$.

**Phần 2 — Hàm "tích phân theo cận trên".**

Định nghĩa $G(x) = \int_a^x f(t)\,dt$ (cận trên là biến $x$, cận dưới cố định $a$). Khi đó:

$$G'(x) = f(x)$$

Tức là **đạo hàm của "diện tích tích lũy" là chính hàm gốc**.

### 4.2. Trực giác — vì sao FTC đúng?

> **💡 Trực giác.** Quay lại ví dụ xe chạy. $v(t)$ là vận tốc. $G(t)$ = quãng đường đã đi tính đến thời điểm $t$. Hai mệnh đề rõ ràng:
> - $G'(t) = v(t)$: tốc độ thay đổi quãng đường = vận tốc.
> - $G(T) - G(0)$ = tổng quãng đường đi được = $\int_0^T v(t)\,dt$ (diện tích dưới đồ thị vận tốc).
> Hai điều này gộp lại = FTC.

**Lập luận cụ thể cho Phần 2**: Xét $G(x + h) - G(x)$. Đó là diện tích dưới $f$ từ $x$ đến $x + h$. Nếu $h$ rất nhỏ, vùng đó gần như hình chữ nhật chiều rộng $h$ và chiều cao $f(x)$, nên $G(x + h) - G(x) \approx f(x) \cdot h$. Chia cho $h$:

$$\frac{G(x + h) - G(x)}{h} \approx f(x)$$

Cho $h \to 0$: theo định nghĩa đạo hàm, vế trái $\to G'(x)$. Vậy $G'(x) = f(x)$. ✓

**Phần 1 suy ra từ Phần 2.** Nếu $F$ là nguyên hàm bất kỳ và $G$ là nguyên hàm "diện tích tích lũy", thì $(F - G)'(x) = 0$ trên $[a, b]$, nên $F - G$ = hằng số. Suy ra $F(b) - F(a) = G(b) - G(a) = G(b) - 0 = \int_a^b f(x)\,dx$.

### 4.3. Walk-through — tính `∫_0^1 x² dx` bằng FTC

**Bước 1: tìm nguyên hàm $F$ của $f(x) = x^2$.**

Cần $F$ sao cho $F'(x) = x^2$. Nhớ rằng $(x^3)' = 3x^2$, nên $\left(\frac{x^3}{3}\right)' = x^2$. Vậy:

$$F(x) = \frac{x^3}{3}$$

**Bước 2: áp dụng FTC.**

$$\int_0^1 x^2\,dx = F(1) - F(0) = \frac{1^3}{3} - \frac{0^3}{3} = \frac{1}{3}$$

**Verify với Riemann sum** (mục 3.2): cùng ra $\frac{1}{3}$. ✓

### 4.4. Walk-through chi tiết — `∫_0^π sin x dx` bằng FTC

Hỏi: vùng dưới $\sin x$ từ 0 đến $\pi$ có diện tích bằng bao nhiêu?

**Bước 1: tìm nguyên hàm.** Cần $F(x)$ sao cho $F'(x) = \sin x$. Nhớ rằng $(\cos x)' = -\sin x$, nên $(-\cos x)' = \sin x$. Vậy:

$$F(x) = -\cos x$$

**Bước 2: tính $F(\pi) - F(0)$.**

$$\begin{aligned}
F(\pi) &= -\cos(\pi) = -(-1) = 1 \\[4pt]
F(0) &= -\cos(0) = -1 \\[4pt]
F(\pi) - F(0) &= 1 - (-1) = 2
\end{aligned}$$

**Verify với Riemann** (mục 3.4 đã làm): với $n = 6$, midpoint cho $\approx 2.0233$. Tăng $n = 1000$ → kết quả $\approx 1.99999958$. Hội tụ về 2. ✓

> **⚠ Lỗi thường gặp.** Quên dấu trừ: viết $F(x) = \cos x$ cho $f(x) = \sin x$ là **sai**. Verify: $(\cos x)' = -\sin x \neq \sin x$. Khi không chắc, đạo hàm ngược nguyên hàm để kiểm tra.

### 4.5. Vài ví dụ thêm

| Tích phân | Nguyên hàm $F(x)$ | Kết quả |
|-----------|-------------------|---------|
| $\int_0^2 x\,dx$ | $\frac{x^2}{2}$ | $\frac{4}{2} - 0 = 2$ |
| $\int_0^1 x^3\,dx$ | $\frac{x^4}{4}$ | $\frac{1}{4} - 0 = \frac{1}{4}$ |
| $\int_1^e \frac{1}{x}\,dx$ | $\ln x$ | $\ln e - \ln 1 = 1 - 0 = 1$ |
| $\int_0^1 e^x\,dx$ | $e^x$ | $e^1 - e^0 = e - 1 \approx 1.718$ |
| $\int_0^{\pi/2} \cos x\,dx$ | $\sin x$ | $\sin(\pi/2) - \sin 0 = 1$ |
| $\int_0^{\pi} \sin x\,dx$ | $-\cos x$ | $-\cos \pi - (-\cos 0) = 1 + 1 = 2$ |

> **❓ Câu hỏi tự nhiên: "Mỗi hàm có duy nhất một nguyên hàm không?"** Không! Nếu $F'(x) = f(x)$, thì $(F + C)' = F' + 0 = f$ cũng đúng với mọi hằng số $C$. Nên **nguyên hàm chỉ duy nhất tới một hằng số $C$**. Khi tính tích phân **xác định**, $C$ bị triệt tiêu: $(F(b) + C) - (F(a) + C) = F(b) - F(a)$. Khi viết nguyên hàm chung, phải kèm $+ C$.

---

## 5. Nguyên hàm (Antiderivative) — bảng cơ bản

Vì FTC là "đảo ngược đạo hàm", **bảng nguyên hàm chính là bảng đạo hàm đọc ngược**.

### 5.1. Bảng 10 hàm sơ cấp

| $f(x)$ | Nguyên hàm $F(x)$ (kèm $+ C$) | Ghi chú |
|--------|-------------------------------|---------|
| $x^n$ ($n \neq -1$) | $\frac{x^{n+1}}{n+1} + C$ | Tăng số mũ lên 1, chia cho số mũ mới. |
| $\frac{1}{x}$ | $\ln\lvert x\rvert + C$ | Trường hợp đặc biệt khi $n = -1$. |
| $e^x$ | $e^x + C$ | "Hàm tự nguyên hàm". |
| $a^x$ ($a > 0, a \neq 1$) | $\frac{a^x}{\ln a} + C$ | Tổng quát hóa hàm mũ. |
| $\sin x$ | $-\cos x + C$ | Chú ý dấu trừ! |
| $\cos x$ | $\sin x + C$ | |
| $\sec^2 x$ | $\tan x + C$ | Vì $(\tan x)' = \sec^2 x$. |
| $\frac{1}{\sqrt{1 - x^2}}$ | $\arcsin x + C$ | (Hữu ích trong xác suất.) |
| $\frac{1}{1 + x^2}$ | $\arctan x + C$ | Dùng trong phân phối Cauchy. |
| $\cosh x$ (hiếm) | $\sinh x + C$ | Hàm hyperbolic. |

> **⚠ Lỗi thường gặp.**
> - **Quên $+ C$** khi viết nguyên hàm tổng quát. Chỉ bỏ được khi tính tích phân xác định.
> - Áp dụng công thức $\frac{x^{n+1}}{n+1}$ cho $n = -1$ → chia cho 0! Trường hợp này phải dùng $\ln|x|$.
> - Nhầm dấu: $(\sin x)' = \cos x$ nhưng $\int \sin x\,dx = -\cos x + C$ (dấu trừ).

### 5.2. Tính chất tuyến tính của tích phân

Hai tính chất cực kỳ tiện:

1. **Hệ số hằng**: $\int k \cdot f(x)\,dx = k \cdot \int f(x)\,dx$.
2. **Tổng**: $\int [f(x) + g(x)]\,dx = \int f(x)\,dx + \int g(x)\,dx$.

Walk-through: $\int_0^1 (3x^2 + 5)\,dx$.

$$\begin{aligned}
\int_0^1 (3x^2 + 5)\,dx &= \int_0^1 3x^2\,dx + \int_0^1 5\,dx \\[4pt]
&= 3 \cdot \int_0^1 x^2\,dx + 5 \cdot \int_0^1 1\,dx \\[4pt]
&= 3 \cdot \frac{1}{3} + 5 \cdot (1 - 0) \\[4pt]
&= 1 + 5 = 6
\end{aligned}$$

Verify bằng FTC trực tiếp: $F(x) = x^3 + 5x$. $F(1) - F(0) = (1 + 5) - 0 = 6$. ✓

---

## 6. Kỹ thuật tích phân cơ bản

Đa số tích phân thực tế **không** trùng bảng. Cần biến đổi để đưa về dạng đơn giản.

### 6.1. Đổi biến (Substitution / u-substitution) — chain rule chạy ngược

Đây là kỹ thuật quan trọng nhất. Nó chính là **chain rule** ([Lesson 04](../lesson-04-chain-rule/)) đọc ngược.

**Công thức**: nếu $u = g(x)$ thì $du = g'(x)\,dx$. Khi đó:

$$\int f(g(x)) \cdot g'(x)\,dx = \int f(u)\,du$$

**Walk-through 1: $\int 2x \cdot \cos(x^2)\,dx$.**

Đặt $u = x^2$. Đạo hàm: $\frac{du}{dx} = 2x$, nên $du = 2x\,dx$.

Tích phân gốc viết lại:

$$\int \cos(x^2) \cdot (2x\,dx) = \int \cos(u)\,du = \sin u + C = \sin(x^2) + C$$

**Verify**: $\frac{d}{dx}[\sin(x^2)] = \cos(x^2) \cdot 2x$ ✓ (đúng chain rule).

**Walk-through 2: $\int_0^1 x \cdot e^{x^2}\,dx$.**

Đặt $u = x^2$, $du = 2x\,dx$, tức $x\,dx = \frac{du}{2}$. Khi $x = 0 \to u = 0$; khi $x = 1 \to u = 1$ (đổi luôn cận).

$$\int_0^1 x \cdot e^{x^2}\,dx = \int_0^1 e^u \cdot \frac{du}{2} = \frac{1}{2} \cdot [e^u]_0^1 = \frac{1}{2}(e - 1) \approx 0.859$$

### 6.2. Tích phân từng phần (Integration by parts)

Đây là **product rule** chạy ngược. Nhớ: $(uv)' = u'v + uv'$. Lấy tích phân hai vế: $uv = \int u'v\,dx + \int uv'\,dx$. Sắp lại:

$$\int u\,dv = u \cdot v - \int v\,du$$

**Walk-through: $\int x \cdot e^x\,dx$.**

Chọn $u = x$ (vì đạo hàm $u' = 1$ đơn giản), $dv = e^x\,dx$ (vì nguyên hàm $v = e^x$ dễ).

Khi đó: $du = dx$, $v = e^x$.

$$\int x \cdot e^x\,dx = x \cdot e^x - \int e^x \cdot dx = x \cdot e^x - e^x + C = (x - 1)e^x + C$$

**Verify**: $\frac{d}{dx}[(x-1)e^x] = 1 \cdot e^x + (x-1) \cdot e^x = (1 + x - 1) e^x = x \cdot e^x$ ✓

> **❓ Câu hỏi tự nhiên: "Chọn $u$ và $dv$ thế nào?"** Mẹo LIATE — ưu tiên $u$ theo thứ tự: **L**ogarithm > **I**nverse trig > **A**lgebraic > **T**rig > **E**xponential. Trong ví dụ trên, $x$ là Algebraic, $e^x$ là Exponential → chọn $u = x$. Quy tắc này không tuyệt đối nhưng đúng phần lớn.

### 6.3. Tích phân từng phần lặp — `∫ x² eˣ dx`

Đôi khi phải áp by-parts **hai lần**. Lấy $u = x^2$ (vì đạo hàm 2 lần thì còn hằng số), $dv = e^x\,dx$.

Lần 1: $du = 2x\,dx$, $v = e^x$.

$$\int x^2 e^x\,dx = x^2 e^x - \int 2x \cdot e^x\,dx = x^2 e^x - 2 \int x e^x\,dx$$

Từ mục 6.2: $\int x e^x\,dx = (x - 1) e^x + C$. Thế vào:

$$\int x^2 e^x\,dx = x^2 e^x - 2(x - 1) e^x + C = (x^2 - 2x + 2) e^x + C$$

Verify: $\frac{d}{dx}[(x^2 - 2x + 2) e^x] = (2x - 2) e^x + (x^2 - 2x + 2) e^x = (x^2 + 0x + 0) e^x = x^2 e^x$. ✓

### 6.4. Đối xứng — kỹ thuật "lười" nhưng cực hữu ích

Khi đoạn $[-a, a]$ đối xứng quanh 0, kiểm tra ngay xem $f$ có **lẻ** hoặc **chẵn** không:
- $f$ lẻ → tích phân = 0 (không cần làm gì thêm!).
- $f$ chẵn → tích phân $= 2 \cdot \int_0^a f(x)\,dx$ (chỉ cần làm một nửa).

**Ví dụ tiết kiệm**: $\int_{-1}^1 x^5 \cos x\,dx$. Cả $x^5$ và $\cos x$ đều có tính đối xứng, tích chúng là **hàm lẻ** ($(-x)^5 \cos(-x) = -x^5 \cos x$). Kết quả = 0 ngay, không cần biến đổi.

---

## 7. Tích phân không xác định và tích phân xác định

| | Tích phân không xác định | Tích phân xác định |
|---|--------------------------|---------------------|
| Ký hiệu | $\int f(x)\,dx$ | $\int_a^b f(x)\,dx$ |
| Kết quả | Một **hàm số** (họ nguyên hàm) $+ C$ | Một **số** |
| Ý nghĩa | "Tìm nguyên hàm" | "Tính diện tích có dấu trên $[a, b]$" |
| Ví dụ | $\int x^2\,dx = \frac{x^3}{3} + C$ | $\int_0^1 x^2\,dx = \frac{1}{3}$ |

Quan hệ: nếu biết tích phân không xác định, áp FTC ra tích phân xác định.

> **💡 Trực giác.** Tích phân không xác định = công thức tổng quát. Tích phân xác định = công thức đó áp lên một đoạn cụ thể, ra một con số.

---

## 8. Tích phân nhiều biến — giới thiệu

Khi $f(x, y)$ là hàm hai biến, tích phân **kép** là:

$$\iint_D f(x, y)\,dA$$

Diễn giải: chia miền $D$ trong mặt phẳng $Oxy$ thành các ô vuông nhỏ diện tích $dA = dx\,dy$, cộng $f \cdot dA$ cho từng ô. Khi ô $\to$ vô cùng nhỏ $\to$ tích phân kép. Nếu $f \geq 0$, đại lượng này = **thể tích** vùng dưới mặt $z = f(x, y)$.

Cách tính: lặp lại tích phân 1 biến — tích phân $f(x, y)$ theo $y$ (giữ $x$ cố định) rồi tích phân kết quả theo $x$:

$$\iint_{[a,b]\times[c,d]} f(x, y)\,dA = \int_a^b \left[ \int_c^d f(x, y)\,dy \right] dx$$

Đây là **định lý Fubini**. Bài này chỉ giới thiệu, chi tiết sẽ gặp ở **Tầng 5 — Probability** (phân phối nhiều biến, joint PDF) và Tầng 6 (loss của batch mẫu).

**Ví dụ siêu nhanh**: $\iint_{[0,1]\times[0,1]} xy\,dA$.

$$\begin{aligned}
\iint_{[0,1]\times[0,1]} xy\,dA &= \int_0^1 \left[ \int_0^1 xy\,dy \right] dx \\[4pt]
&= \int_0^1 \left[ x \cdot \frac{y^2}{2} \right]_0^1 dx \\[4pt]
&= \int_0^1 \frac{x}{2}\,dx \\[4pt]
&= \frac{1}{2} \cdot \left[\frac{x^2}{2}\right]_0^1 = \frac{1}{4}
\end{aligned}$$

---

## 9. Liên hệ ML/AI — Xác suất liên tục

Đây là **lý do chính** ta học tích phân cho ML. Mọi xác suất liên tục đều phát biểu bằng tích phân.

### 9.1. Probability Density Function (PDF) — hàm mật độ xác suất

Với biến rời rạc (vd kết quả gieo xúc xắc), ta liệt kê được $P(X = 1) = \frac{1}{6}$, $P(X = 2) = \frac{1}{6}$, … và xác suất là một **bảng**.

Với biến **liên tục** (vd chiều cao của một người), $P(X = 1.70\text{m}) = 0$ vì có vô số giá trị! Thay vì gán xác suất cho mỗi điểm, ta định nghĩa một **hàm mật độ $p(x)$** sao cho:

$$P(a \leq X \leq b) = \int_a^b p(x)\,dx$$

$p(x)$ không phải là xác suất (nó có thể $> 1$!), mà là **mật độ** — bao nhiêu "xác suất" trên một đơn vị độ dài. Để biến $p(x)$ thành xác suất, ta nhân với độ rộng vô cùng nhỏ $dx$, rồi cộng dồn (tức tích phân).

### 9.2. Tổng xác suất = 1

Vì $X$ chắc chắn rơi đâu đó:

$$\int_{-\infty}^{+\infty} p(x)\,dx = 1$$

Đây là **điều kiện chuẩn hóa**. Mọi PDF hợp lệ phải thỏa.

### 9.3. Walk-through — phân phối đều `Uniform[a, b]`

Định nghĩa: $p(x) = \frac{1}{b - a}$ nếu $a \leq x \leq b$, ngược lại $p(x) = 0$.

**Kiểm tra chuẩn hóa**:

$$\int_{-\infty}^{+\infty} p(x)\,dx = \int_a^b \frac{1}{b-a}\,dx = \frac{1}{b-a} \cdot (b - a) = 1 \quad ✓$$

**Tính xác suất** $X$ nằm trong $[c, d] \subset [a, b]$:

$$P(c \leq X \leq d) = \int_c^d \frac{1}{b-a}\,dx = \frac{d - c}{b - a}$$

Ví dụ $\text{Uniform}[0, 10]$, xác suất $X \in [3, 5]$ $= \frac{5 - 3}{10} = 0.2$. Đúng trực giác — "ô" rộng 2 chiếm 20% của đoạn dài 10.

### 9.4. Kỳ vọng (Expectation / Mean)

Trung bình "có trọng số mật độ":

$$E[X] = \int_{-\infty}^{+\infty} x \cdot p(x)\,dx$$

Walk-through cho $\text{Uniform}[a, b]$:

$$\begin{aligned}
E[X] &= \int_a^b x \cdot \frac{1}{b-a}\,dx \\[4pt]
&= \frac{1}{b-a} \cdot \left[\frac{x^2}{2}\right]_a^b \\[4pt]
&= \frac{1}{b-a} \cdot \frac{b^2 - a^2}{2} \\[4pt]
&= \frac{b + a}{2}
\end{aligned}$$

Tức điểm giữa đoạn $[a, b]$. Cực kỳ trực giác.

Ví dụ $\text{Uniform}[0, 10]$: $E[X] = 5$. ✓

### 9.5. Phương sai (Variance)

$$\text{Var}(X) = E[(X - \mu)^2] = \int (x - \mu)^2 \cdot p(x)\,dx$$

trong đó $\mu = E[X]$. Đo độ phân tán.

Walk-through cho $\text{Uniform}[a, b]$ với $\mu = \frac{a+b}{2}$:

$$\begin{aligned}
\text{Var}(X) &= \int_a^b (x - \mu)^2 \cdot \frac{1}{b-a}\,dx \\[4pt]
&= \frac{1}{b-a} \cdot \left[ \frac{(x - \mu)^3}{3} \right]_a^b \\[4pt]
&= \frac{(b - a)^2}{12}
\end{aligned}$$

Ví dụ $\text{Uniform}[0, 1]$: $\text{Var} = \frac{1}{12} \approx 0.0833$. Độ lệch chuẩn $\sigma \approx 0.289$.

### 9.6. Phân phối Gaussian (Normal) — preview Tầng 5

Phân phối quan trọng nhất ML:

$$p(x) = \frac{1}{\sqrt{2\pi \sigma^2}} \cdot \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)$$

Tích phân toàn miền = 1 (kiểm chứng bằng tích phân Gaussian — kỹ thuật hay nhưng phức tạp). $E[X] = \mu$, $\text{Var}(X) = \sigma^2$.

**Chuyện thú vị**: $\exp(-x^2)$ **không** có nguyên hàm dạng đóng — nghĩa là **không** tồn tại một biểu thức bằng hàm sơ cấp cho $\int \exp(-x^2)\,dx$. Ta phải dùng:
- Định nghĩa hàm mới: $\text{erf}(x) = \frac{2}{\sqrt{\pi}} \int_0^x \exp(-t^2)\,dt$.
- Hoặc tính bằng phương pháp số (mục 11).

Sẽ học chi tiết phân phối Gaussian ở Tầng 5.

### 9.7. Cross-entropy liên tục — preview Tầng 6

Trong Tầng 5 ta sẽ học **cross-entropy** cho biến rời rạc:

$$H(p, q) = -\sum_i p(i) \log q(i)$$

Phiên bản **liên tục** là tích phân:

$$H(p, q) = -\int p(x) \log q(x)\,dx$$

Dùng khi cả $p$ (phân phối thật) và $q$ (phân phối model dự đoán) đều là PDF — ví dụ các mô hình sinh ảnh, VAE, normalizing flow.

> **❓ Câu hỏi tự nhiên: "Tại sao ML không chỉ dùng rời rạc cho gọn?"** Vì rất nhiều biến tự nhiên là liên tục: ảnh (pixel là [0, 255], chia mịn thành float), âm thanh, embedding vector. Nếu chỉ dùng rời rạc, model phải "rời rạc hóa" liên tục — mất thông tin và phải chọn lưới phù hợp. Tích phân cho ta công cụ làm việc trực tiếp với continuous distribution.

---

## 10. Tích phân suy rộng (Improper integral) — cận vô cực

Khi cận tích phân là $\pm\infty$ hoặc hàm có điểm vô cực bên trong:

$$\int_{-\infty}^{+\infty} f(x)\,dx = \lim_{R \to \infty} \int_{-R}^{R} f(x)\,dx$$

Walk-through: $\int_1^{+\infty} \frac{1}{x^2}\,dx$.

$$\begin{aligned}
\int_1^{+\infty} \frac{1}{x^2}\,dx &= \lim_{R \to \infty} \int_1^R x^{-2}\,dx \\[4pt]
&= \lim_{R \to \infty} \left[ -\frac{1}{x} \right]_1^R \\[4pt]
&= \lim_{R \to \infty} \left(-\frac{1}{R} + 1\right) \\[4pt]
&= 0 + 1 = 1
\end{aligned}$$

Tích phân **hội tụ** (ra số hữu hạn) — dù miền dài vô tận, hàm tắt đủ nhanh nên tổng có giới hạn.

Ngược lại: $\int_1^{+\infty} \frac{1}{x}\,dx = \lim \ln R = +\infty$ — **phân kỳ**. Đây là sự khác biệt tế nhị: $\frac{1}{x^2}$ tắt nhanh hơn $\frac{1}{x}$ đủ để diện tích vô tận vẫn hữu hạn.

Tích phân Gaussian $\int_{-\infty}^{+\infty} \exp(-x^2/2)\,dx = \sqrt{2\pi}$ cũng là tích phân suy rộng (hội tụ).

---

## 11. Numerical Integration — khi không có nguyên hàm dạng đóng

Một số tích phân thực tế (Gaussian PDF, integrate qua model neural network) không có nguyên hàm sơ cấp. Phải tính **bằng số**.

### 11.1. Trapezoidal rule (quy tắc hình thang)

Thay vì xấp xỉ bằng hình chữ nhật, dùng **hình thang** nối các điểm $(x_i, f(x_i))$:

$$\int_a^b f(x)\,dx \approx \frac{\Delta x}{2} \cdot \left[ f(x_0) + 2f(x_1) + 2f(x_2) + \cdots + 2f(x_{n-1}) + f(x_n) \right]$$

Trực giác: trên mỗi đoạn $[x_{i-1}, x_i]$, diện tích hình thang $= \frac{f(x_{i-1}) + f(x_i)}{2} \cdot \Delta x$. Cộng hết → công thức trên (các điểm giữa được tính 2 lần nên có hệ số 2).

**Sai số**: $O(1/n^2)$ — tốt hơn Riemann left/right $O(1/n)$.

**Pseudo-code (Go-style)**:
```go
func Trapezoid(f func(float64) float64, a, b float64, n int) float64 {
    dx := (b - a) / float64(n)
    sum := (f(a) + f(b)) / 2
    for i := 1; i < n; i++ {
        x := a + float64(i)*dx
        sum += f(x)
    }
    return sum * dx
}
```

### 11.2. Simpson's rule (quy tắc Simpson)

Thay xấp xỉ tuyến tính (thang) bằng **parabol** đi qua 3 điểm liên tiếp:

$$\int_a^b f(x)\,dx \approx \frac{\Delta x}{3} \cdot \left[ f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \cdots + 4f(x_{n-1}) + f(x_n) \right]$$

(yêu cầu $n$ chẵn). Hệ số xen kẽ $1, 4, 2, 4, 2, \ldots, 4, 1$.

**Sai số**: $O(1/n^4)$ — siêu nhanh. Với $n = 100$ đã có 8 chữ số thập phân chính xác cho hầu hết hàm trơn.

**Pseudo-code**:
```go
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
```

### 11.3. So sánh hội tụ — `∫_0^1 x² dx`

Giá trị thật: $\frac{1}{3} \approx 0.333333\ldots$

| $n$ | Left | Right | Mid | Trapezoid | Simpson |
|-----|------|-------|-----|-----------|---------|
| 4   | 0.21875 | 0.46875 | 0.328125 | 0.34375 | 0.3333333... |
| 10  | 0.285 | 0.385 | 0.3325 | 0.335 | 0.3333333... |
| 100 | 0.32835 | 0.33835 | 0.333325 | 0.333350 | 0.3333333... |

Simpson "chạm đáy" ngay vì $x^2$ là polynomial bậc 2 — chính xác là đa thức mà Simpson dùng để xấp xỉ. Trapezoid cần $n$ lớn hơn. Riemann left/right tệ nhất.

> **⚠ Lỗi thường gặp với numerical integration.** Khi hàm có điểm gián đoạn hoặc dao động mạnh (vd $\sin(1/x)$ quanh 0), mọi phương pháp lưới đều phá sản. Phải dùng **adaptive quadrature** — chia mịn ở chỗ hàm dao động, thưa ở chỗ trơn. Các thư viện như `scipy.integrate.quad` (Python) hoặc `gonum.integrate` (Go) dùng adaptive.

### 11.4. Khi nào dùng phương pháp nào? — bảng quyết định

| Tình huống | Phương pháp |
|------------|-------------|
| Hàm trơn (smooth), ít dao động, miền hữu hạn | **Simpson** — hiệu quả, sai số $O(1/n^4)$ |
| Hàm gần tuyến tính | **Trapezoid** — đơn giản, đủ dùng |
| Hàm dao động mạnh hoặc có đỉnh nhọn | **Adaptive** (Gauss-Kronrod, vd `scipy.quad`) |
| Tích phân nhiều chiều ($d \geq 4$) | **Monte Carlo** — sai số $O(1/\sqrt{N})$ không phụ thuộc $d$ |
| Tích phân kỳ vọng trong ML | **Monte Carlo** với samples từ phân phối |

> **💡 Trực giác Monte Carlo.** Thay vì chia lưới đều, **lấy mẫu ngẫu nhiên** $x_1, \ldots, x_N$ từ miền, tính $\frac{1}{N} \sum f(x_i) \cdot |D|$. Khi $N \to \infty$, hội tụ về tích phân thật. Tốc độ chậm ($O(1/\sqrt{N})$) nhưng **không phụ thuộc số chiều** — đó là siêu năng lực của Monte Carlo, lý do nó là vũ khí chính của ML khi có chiều cao ($d = 1000, 10000\ldots$). Sẽ học cụ thể ở Tầng 5 & 6.

### 11.5. Walk-through Monte Carlo — `∫_0^1 e^{−x²} dx`

Giá trị tham chiếu: $\approx 0.7468$.

**Pseudo-code**:
```go
func MonteCarlo(f func(float64) float64, a, b float64, N int) float64 {
    sum := 0.0
    for i := 0; i < N; i++ {
        x := a + rand.Float64() * (b - a)
        sum += f(x)
    }
    return sum / float64(N) * (b - a)
}
```

Kết quả mong đợi với các `N` khác nhau (chỉ là ví dụ, sẽ dao động):

| $N$ | Ước lượng | Sai số tuyệt đối |
|-----|-----------|------------------|
| 100   | ~0.74 | ~0.01 |
| 10,000  | ~0.747 | ~0.001 |
| 1,000,000 | ~0.7468 | ~0.0001 |

Chậm hơn Simpson nhiều với hàm 1D này. Nhưng nếu thay bằng tích phân 1000 chiều, Simpson đòi $n^{1000}$ mẫu (không khả thi) trong khi Monte Carlo vẫn dùng $N = 10^6$ được. Đó là "curse of dimensionality" — và Monte Carlo phá lời nguyền.

---

## 12. Câu hỏi tự nhiên (gom mục lớn)

> **❓ "Tại sao tích phân lại bằng phép ngược của đạo hàm? Có vẻ đột ngột."**
> Vì nếu $G(x) = \text{"diện tích tích lũy"} = \int_a^x f(t)\,dt$, thì khi tăng $x$ lên $dx$, diện tích tăng thêm chính bằng dải mới rộng $dx$, cao $f(x)$, tức $dG = f(x)\,dx$, hay $G'(x) = f(x)$. Đó là lý do FTC đúng. Không phải sự trùng hợp.

> **❓ "Mọi hàm liên tục đều có nguyên hàm — vậy có công thức luôn không?"**
> Có nguyên hàm (theo Phần 2 của FTC), nhưng **không phải** lúc nào cũng biểu diễn được bằng các hàm sơ cấp (polynomial, exp, log, trig, hợp thành). Ví dụ kinh điển: $\exp(-x^2)$, $\frac{\sin(x)}{x}$, $\frac{1}{\log x}$. Phải định nghĩa hàm mới (erf, Si, Li) hoặc dùng tính số.

> **❓ "Hằng số $C$ quan trọng đến đâu?"**
> Trong tích phân **xác định** → triệt tiêu, không quan trọng. Trong tích phân **không xác định** → quan trọng nếu bài toán có **điều kiện ban đầu**. Ví dụ giải $y'(x) = x$ với $y(0) = 3$ → $y(x) = \frac{x^2}{2} + C$, dùng $y(0) = 3 \Rightarrow C = 3$. Trong ML, $C$ thường không quan trọng vì ta thường chỉ quan tâm tới hiệu giữa hai điểm (gradient, KL divergence relative).

> **❓ "Tích phân có 'tuyến tính' giống đạo hàm không?"**
> Có (mục 5.2). Nhưng **không có** quy tắc tích/thương đơn giản tương tự đạo hàm. $\int f \cdot g\,dx \neq \int f\,dx \cdot \int g\,dx$. Đây là lý do integration khó hơn differentiation — không có "algorithm cơ học" nào tính được mọi tích phân.

> **❓ "Tích phân Riemann có vấn đề gì với hàm 'xấu' không?"**
> Có. Tích phân Riemann không xử lý nổi một số hàm gián đoạn dày đặc (vd hàm Dirichlet). Toán học thật dùng **tích phân Lebesgue** — tổng quát hơn, cho phép tích phân các hàm phức tạp hơn. Trong ML và kỹ thuật, Riemann/Lebesgue cho cùng kết quả với mọi hàm "đẹp" ta gặp, nên không cần lo.

---

## 12.5. Các tính chất cơ bản của tích phân — không thể bỏ qua

Bộ "luật chơi" gọn nhưng dùng đi dùng lại liên tục trong phần còn lại của giải tích và xác suất.

### 12.5.1. Tuyến tính

$$\int_a^b [\alpha f(x) + \beta g(x)]\,dx = \alpha \int_a^b f(x)\,dx + \beta \int_a^b g(x)\,dx$$

**Ví dụ verify**: cho $f(x) = x$, $g(x) = x^2$, $[a, b] = [0, 1]$, $\alpha = 2$, $\beta = 3$.
- Vế trái: $\int_0^1 (2x + 3x^2)\,dx = [x^2 + x^3]_0^1 = 1 + 1 = 2$.
- Vế phải: $2 \cdot \int_0^1 x\,dx + 3 \cdot \int_0^1 x^2\,dx = 2 \cdot \frac{1}{2} + 3 \cdot \frac{1}{3} = 1 + 1 = 2$. ✓

### 12.5.2. Đảo cận

$$\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$$

Nếu hoán đổi cận $a \leftrightarrow b$, tích phân đổi dấu. Trực giác: $\Delta x$ đổi dấu khi $a > b$.

**Ví dụ**: $\int_1^0 x\,dx = -\int_0^1 x\,dx = -\frac{1}{2}$.

### 12.5.3. Cộng đoạn (additivity)

$$\int_a^c f(x)\,dx = \int_a^b f(x)\,dx + \int_b^c f(x)\,dx$$

Tách miền tích phân thành 2 đoạn liên tiếp. Hữu ích khi $f$ thay đổi quy luật giữa chừng (vd hàm có nhiều "nhánh" như $|x|$).

**Ví dụ**: $\int_{-1}^1 |x|\,dx = \int_{-1}^0 (-x)\,dx + \int_0^1 x\,dx = \frac{1}{2} + \frac{1}{2} = 1$.

### 12.5.4. So sánh

Nếu $f(x) \leq g(x)$ trên $[a, b]$ thì $\int_a^b f\,dx \leq \int_a^b g\,dx$. Trực giác: vùng nhỏ hơn → diện tích nhỏ hơn.

Hệ quả: nếu $m \leq f(x) \leq M$ trên $[a, b]$ thì $m(b - a) \leq \int_a^b f\,dx \leq M(b - a)$ — kẹp giá trị tích phân trong "hộp" hình chữ nhật.

### 12.5.5. Tích phân của hàm chẵn / lẻ

- Nếu $f$ là **hàm lẻ** ($f(-x) = -f(x)$): $\int_{-a}^a f(x)\,dx = 0$. Hai phần đối xứng triệt tiêu.
- Nếu $f$ là **hàm chẵn** ($f(-x) = f(x)$): $\int_{-a}^a f(x)\,dx = 2 \cdot \int_0^a f(x)\,dx$.

**Ví dụ tiết kiệm công sức**: $\int_{-\pi}^\pi \sin x\,dx = 0$ ($\sin$ là hàm lẻ — không cần tính nguyên hàm). $\int_{-1}^1 x^3\,dx = 0$ ($x^3$ lẻ).

> **⚠ Lỗi thường gặp.** Áp dụng tính chất "lẻ" cho hàm KHÔNG lẻ. Vd $\int_{-1}^1 x^2\,dx \neq 0$ ($x^2$ là hàm chẵn). Phải verify tính chẵn/lẻ trước.

---

## 12.6. Quay lại liên hệ ML — log-likelihood liên tục

Khi train một model sinh dữ liệu (vd VAE, normalizing flow), ta thường có:

- Tập huấn luyện $\{x_1, x_2, \ldots, x_N\}$ — N quan sát thực.
- Model định nghĩa một PDF $q_\theta(x)$ ($\theta$ là tham số).
- **Mục tiêu**: tối đa hóa **log-likelihood**:

$$L(\theta) = \sum_i \log q_\theta(x_i) \quad \text{(rời rạc trên N mẫu)}$$

Khi $N \to \infty$, theo luật số lớn:

$$\frac{1}{N} \sum_i \log q_\theta(x_i) \to E_{x \sim p_\text{data}}[\log q_\theta(x)] = \int p_\text{data}(x) \cdot \log q_\theta(x)\,dx$$

Đó chính là **cross-entropy âm**: $-H(p_\text{data}, q_\theta)$. Vậy:
- **Maximize log-likelihood ↔ Minimize cross-entropy**.
- Cross-entropy ở dạng tích phân — chính là lý do ta cần học tích phân.

Sẽ trở lại đầy đủ ở Tầng 5/6.

---

## 12.7. Volumetric integration — preview Tầng 4-5

Khi $x$ là vector $n$ chiều (ảnh, embedding), tích phân trở thành **tích phân nhiều biến**:

$$\int_{\mathbb{R}^n} f(x)\,dx$$

Đối với phân phối Gaussian đa biến $N(\mu, \Sigma)$:

$$p(x) = \frac{1}{\sqrt{(2\pi)^n |\Sigma|}} \cdot \exp\left(-\tfrac{1}{2} (x - \mu)^\top \Sigma^{-1} (x - \mu)\right)$$

Bạn sẽ gặp $\Sigma$ (ma trận covariance) ở Tầng 4 và toàn bộ machinery của đại số tuyến tính sẽ làm chuyện tính toán này thành tự nhiên. Hôm nay chỉ cần nhớ: **mọi xác suất đa chiều cũng vẫn là tích phân, chỉ là tích phân nhiều biến**.

---

## 13. Bài tập

1. **Bằng tay**: Tính Riemann sum của $f(x) = 2x + 1$ trên $[0, 2]$ với $n = 4$, điểm phải.
2. **FTC**: Tính $\int_0^2 (3x^2 - 2x + 1)\,dx$ bằng nguyên hàm. Verify bằng Riemann sum $n = 100$ qua nhẩm (xấp xỉ).
3. **Đổi biến**: Tính $\int x \cdot \cos(x^2)\,dx$.
4. **Đổi biến với cận**: Tính $\int_0^2 x \cdot \sqrt{1 + x^2}\,dx$.
5. **Tích phân từng phần**: Tính $\int x \cdot \ln x\,dx$.
6. **PDF**: Cho $p(x) = 3x^2$ trên $[0, 1]$, 0 ngoài đoạn đó. Kiểm tra đó có là PDF không, tính $P(0.5 \leq X \leq 0.8)$, và $E[X]$.
7. **Hàm lẻ/chẵn**: Tính $\int_{-\pi/2}^{\pi/2} (\sin x + \cos x)\,dx$ bằng cách tách thành 2 tích phân, dùng tính chất chẵn/lẻ.
8. **Tích phân suy rộng**: Kiểm tra xem $\int_0^{+\infty} e^{-x}\,dx$ có hội tụ không, tính kết quả.
9. **Numerical**: Cài đặt tay Simpson với $n = 4$ cho $\int_0^1 e^{-x^2}\,dx$. So với giá trị tham chiếu $\approx 0.7468$.
10. **Ứng dụng ML**: Cho $p(x) = e^{-x}$ (Exponential, $\lambda=1$) trên $[0, +\infty)$. Tính $E[X]$ và $\text{Var}(X)$.

---

## 14. Lời giải chi tiết

### Bài 1 — Riemann sum của `f(x) = 2x + 1` trên `[0, 2]`, `n = 4`, điểm phải

**Cách tiếp cận**: tính $\Delta x$, liệt kê $x_i$, lập bảng $f(x_i)$, cộng nhân $\Delta x$.

$\Delta x = \frac{2 - 0}{4} = 0.5$. Điểm phải: $x_1 = 0.5, x_2 = 1.0, x_3 = 1.5, x_4 = 2.0$.

| $i$ | $x_i$ | $f(x_i) = 2x_i + 1$ |
|-----|------|--------------------|
| 1 | 0.5 | 2 |
| 2 | 1.0 | 3 |
| 3 | 1.5 | 4 |
| 4 | 2.0 | 5 |
| **Σ** | | **14** |

$S_4 \text{ (right)} = 14 \cdot 0.5 = 7$.

**Giá trị thật** (qua FTC): $F(x) = x^2 + x$. $F(2) - F(0) = (4 + 2) - 0 = 6$. Right Riemann overestimate (vì $f$ tăng), khớp trực giác.

**Độ phức tạp**: $O(n)$ tổng, hoàn toàn cộng đơn giản.

### Bài 2 — `∫_0^2 (3x² − 2x + 1) dx`

**Nguyên hàm**: $F(x) = x^3 - x^2 + x$ (vì $(x^3)' = 3x^2$, $(x^2)' = 2x$, $(x)' = 1$).

$$\begin{aligned}
\int_0^2 (3x^2 - 2x + 1)\,dx &= F(2) - F(0) \\[4pt]
&= (8 - 4 + 2) - 0 \\[4pt]
&= 6
\end{aligned}$$

**Verify với Riemann nhẩm**: lấy $n = 4$, $\Delta x = 0.5$, điểm giữa $0.25, 0.75, 1.25, 1.75$.

| $x$ | $3x^2 - 2x + 1$ |
|-----|-----------------|
| 0.25 | $0.1875 - 0.5 + 1 = 0.6875$ |
| 0.75 | $1.6875 - 1.5 + 1 = 1.1875$ |
| 1.25 | $4.6875 - 2.5 + 1 = 3.1875$ |
| 1.75 | $9.1875 - 3.5 + 1 = 6.6875$ |
| Σ | 11.75 |

$S_4 \text{ (mid)} = 11.75 \cdot 0.5 = 5.875$. Khá gần 6. Tăng $n$ → sát hơn.

### Bài 3 — `∫ x · cos(x²) dx`

**Đổi biến**: $u = x^2$, $du = 2x\,dx$, tức $x\,dx = \frac{du}{2}$.

$$\begin{aligned}
\int x \cdot \cos(x^2)\,dx &= \int \cos(u) \cdot \frac{du}{2} \\[4pt]
&= \frac{1}{2} \cdot \sin(u) + C \\[4pt]
&= \frac{1}{2} \sin(x^2) + C
\end{aligned}$$

**Verify**: $\frac{d}{dx}\left[\frac{1}{2} \sin(x^2)\right] = \frac{1}{2} \cos(x^2) \cdot 2x = x \cos(x^2)$ ✓

### Bài 4 — `∫_0^2 x · √(1 + x²) dx`

**Đổi biến**: $u = 1 + x^2$, $du = 2x\,dx$, $x\,dx = \frac{du}{2}$.

Đổi cận: $x = 0 \to u = 1$, $x = 2 \to u = 5$.

$$\begin{aligned}
\int_0^2 x \sqrt{1 + x^2}\,dx &= \int_1^5 \sqrt{u} \cdot \frac{du}{2} \\[4pt]
&= \frac{1}{2} \cdot \left[\frac{u^{3/2}}{3/2}\right]_1^5 \\[4pt]
&= \frac{1}{2} \cdot \frac{2}{3} \cdot [u^{3/2}]_1^5 \\[4pt]
&= \frac{1}{3} \cdot (5^{3/2} - 1) \\[4pt]
&= \frac{1}{3} \cdot (5\sqrt{5} - 1) \\[4pt]
&\approx \frac{1}{3} \cdot (11.180 - 1) \\[4pt]
&\approx 3.394
\end{aligned}$$

### Bài 5 — `∫ x · ln x dx`

**Tích phân từng phần** với $u = \ln x$, $dv = x\,dx$. (Theo LIATE — Logarithm có thứ tự ưu tiên cao hơn Algebraic, nên chọn $u = \ln x$.)

Khi đó: $du = \frac{1}{x}\,dx$, $v = \frac{x^2}{2}$.

$$\begin{aligned}
\int x \cdot \ln x\,dx &= u \cdot v - \int v \cdot du \\[4pt]
&= (\ln x) \cdot \frac{x^2}{2} - \int \frac{x^2}{2} \cdot \frac{1}{x}\,dx \\[4pt]
&= \frac{x^2}{2} \ln x - \int \frac{x}{2}\,dx \\[4pt]
&= \frac{x^2}{2} \ln x - \frac{x^2}{4} + C \\[4pt]
&= \frac{x^2}{4} (2 \ln x - 1) + C
\end{aligned}$$

**Verify**:

$$\begin{aligned}
\frac{d}{dx}\left[\frac{x^2}{2} \ln x - \frac{x^2}{4}\right]
&= x \cdot \ln x + \frac{x^2}{2} \cdot \frac{1}{x} - \frac{x}{2} \\[4pt]
&= x \ln x + \frac{x}{2} - \frac{x}{2} \\[4pt]
&= x \ln x \quad ✓
\end{aligned}$$

### Bài 6 — `p(x) = 3x²` trên `[0, 1]`

**Kiểm tra chuẩn hóa**:

$$\int_0^1 3x^2\,dx = [x^3]_0^1 = 1 - 0 = 1 \quad ✓$$

Vậy $p$ là PDF hợp lệ.

**Xác suất**:

$$\begin{aligned}
P(0.5 \leq X \leq 0.8) &= \int_{0.5}^{0.8} 3x^2\,dx \\[4pt]
&= [x^3]_{0.5}^{0.8} \\[4pt]
&= 0.512 - 0.125 = 0.387
\end{aligned}$$

**Kỳ vọng**:

$$\begin{aligned}
E[X] &= \int_0^1 x \cdot 3x^2\,dx = \int_0^1 3x^3\,dx \\[4pt]
&= 3 \cdot \left[\frac{x^4}{4}\right]_0^1 \\[4pt]
&= \frac{3}{4} = 0.75
\end{aligned}$$

(Trực giác: mật độ tập trung về phía $x = 1$ vì $p(x) = 3x^2$ lớn dần, nên trung bình lệch phải so với 0.5.)

### Bài 7 — `∫_{−π/2}^{π/2} (sin x + cos x) dx`

Tách:

$$\int_{-\pi/2}^{\pi/2} \sin x\,dx + \int_{-\pi/2}^{\pi/2} \cos x\,dx$$

$\sin x$ là hàm **lẻ** → tích phân trên đoạn đối xứng quanh 0 bằng 0.

$\cos x$ là hàm **chẵn** → $\int_{-\pi/2}^{\pi/2} \cos x\,dx = 2 \int_0^{\pi/2} \cos x\,dx = 2 \cdot [\sin x]_0^{\pi/2} = 2 \cdot (1 - 0) = 2$.

**Kết quả**: $0 + 2 = 2$.

Verify thẳng (không dùng đối xứng): nguyên hàm là $-\cos x + \sin x$.
- Tại $\pi/2$: $-\cos(\pi/2) + \sin(\pi/2) = 0 + 1 = 1$.
- Tại $-\pi/2$: $-\cos(-\pi/2) + \sin(-\pi/2) = 0 - 1 = -1$.
- Hiệu: $1 - (-1) = 2$. ✓

### Bài 8 — `∫_0^{+∞} e^{−x} dx`

Đây là tích phân suy rộng. Định nghĩa qua giới hạn:

$$\begin{aligned}
\int_0^{+\infty} e^{-x}\,dx &= \lim_{R \to \infty} \int_0^R e^{-x}\,dx \\[4pt]
&= \lim_{R \to \infty} [-e^{-x}]_0^R \\[4pt]
&= \lim_{R \to \infty} (-e^{-R} + e^0) \\[4pt]
&= 0 + 1 = 1
\end{aligned}$$

**Kết luận**: hội tụ, giá trị = 1. Đây là PDF của phân phối Exponential($\lambda=1$) — tích phân toàn miền phải = 1. ✓

### Bài 9 — Simpson cho `∫_0^1 e^{−x²} dx`

$n = 4$, $\Delta x = 0.25$. Các điểm $x = 0, 0.25, 0.5, 0.75, 1$.

Tính $f(x) = e^{-x^2}$:

| $x$ | $-x^2$ | $e^{-x^2}$ |
|-----|-------|-----------|
| 0    | 0       | 1.000000 |
| 0.25 | $-0.0625$ | 0.939413 |
| 0.5  | $-0.25$   | 0.778801 |
| 0.75 | $-0.5625$ | 0.569783 |
| 1.0  | $-1$      | 0.367879 |

Simpson: $\frac{\Delta x}{3} \cdot [f_0 + 4f_1 + 2f_2 + 4f_3 + f_4]$.

$$\begin{aligned}
&= \frac{0.25}{3} \cdot [1 + 4(0.939413) + 2(0.778801) + 4(0.569783) + 0.367879] \\[4pt]
&= 0.083333 \cdot [1 + 3.757652 + 1.557602 + 2.279132 + 0.367879] \\[4pt]
&= 0.083333 \cdot 8.962265 \\[4pt]
&= 0.746855
\end{aligned}$$

Giá trị tham chiếu: $\approx 0.74682$. Sai số $\approx 0.00003$ — chỉ với $n = 4$! Simpson rất hiệu quả.

Lưu ý: $e^{-x^2}$ không có nguyên hàm sơ cấp — đây là **lý do** ta cần phương pháp số.

### Bài 10 — Exponential `p(x) = e^{−x}` trên `[0, +∞)`

**E[X]**: dùng tích phân từng phần.

$$E[X] = \int_0^{+\infty} x \cdot e^{-x}\,dx$$

Với $u = x$, $dv = e^{-x}\,dx \to du = dx$, $v = -e^{-x}$.

$$\begin{aligned}
&= [-x e^{-x}]_0^{+\infty} - \int_0^{+\infty} (-e^{-x})\,dx \\[4pt]
&= 0 - 0 + \int_0^{+\infty} e^{-x}\,dx \\[4pt]
&= 0 + 1 = 1
\end{aligned}$$

(Cận trên $-x e^{-x} \to 0$ khi $x \to \infty$ vì $e^{-x}$ tắt nhanh hơn $x$ tăng.)

**E[X²]**: tích phân từng phần lần 2.

$$E[X^2] = \int_0^{+\infty} x^2 \cdot e^{-x}\,dx$$

$u = x^2$, $dv = e^{-x}\,dx \to du = 2x\,dx$, $v = -e^{-x}$.

$$\begin{aligned}
&= [-x^2 e^{-x}]_0^{+\infty} + \int_0^{+\infty} 2x e^{-x}\,dx \\[4pt]
&= 0 + 2 \cdot E[X] = 2
\end{aligned}$$

**Var(X)** $= E[X^2] - (E[X])^2 = 2 - 1 = 1$.

Kết quả khớp công thức chuẩn của Exponential($\lambda$): $E[X] = \frac{1}{\lambda} = 1$, $\text{Var} = \frac{1}{\lambda^2} = 1$. ✓

---

## 15. Tóm tắt

> **📝 Tóm tắt Lesson 08**
> - **Tích phân xác định** $\int_a^b f(x)\,dx$ = giới hạn của Riemann sum khi $n \to \infty$ = "diện tích có dấu" dưới đồ thị.
> - **FTC** kết nối đạo hàm và tích phân: nếu $F' = f$ thì $\int_a^b f\,dx = F(b) - F(a)$. Đây là cây cầu trung tâm của giải tích.
> - **Bảng nguyên hàm** là bảng đạo hàm đọc ngược. Nhớ $+ C$ cho tích phân không xác định.
> - **2 kỹ thuật cơ bản**: u-substitution (chain rule ngược) và integration by parts (product rule ngược).
> - **PDF, kỳ vọng, phương sai, cross-entropy liên tục** — tất cả đều là tích phân. Đây là cây cầu sang Tầng 5 — Probability.
> - **Numerical integration** (Trapezoid, Simpson) cần thiết khi không có nguyên hàm dạng đóng — phổ biến trong ML.
> - **Cảnh báo nhẹ**: tích phân khó hơn đạo hàm vì **không có algorithm cơ học** tổng quát; chỉ có bộ mẹo (substitution, by parts, đối xứng…).

---

## 16. Tiếp theo

Đây là **bài cuối Tầng 3 — Calculus**. Bạn đã có đủ giải tích để hiểu mọi loss function và optimizer hiện đại của ML.

**Tầng tiếp theo — [Tầng 4 — Linear Algebra](../../)** (sắp ra): vector, ma trận chính thức, eigenvector, PCA, SVD. Bạn sẽ gặp lại "gradient là vector" trong toàn bộ machinery của linear algebra. Phép biến đổi tuyến tính, không gian con — tất cả đều có gốc rễ từ vector trong Calculus mà bạn vừa học.

**Sau Linear Algebra là Tầng 5 — Probability** — nơi bạn sẽ thấy tích phân vừa học bùng nổ: phân phối Gaussian, MLE (maximum likelihood estimation), cross-entropy, KL divergence. Tất cả đều dựa trên $\int$.

Code minh họa: bài này không có `solutions.go` — toàn bộ tương tác nằm ở **[visualization.html](./visualization.html)** (Riemann sum visualizer, FTC demo, bảng nguyên hàm, PDF + kỳ vọng).
