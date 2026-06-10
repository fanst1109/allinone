# Lesson 05 — Phân phối chuẩn (Gaussian / Normal Distribution)

> Tầng 5 (Probability) — Bài 5/8.
> Phân phối chuẩn là **trung tâm vũ trụ** của xác suất ứng dụng. Mọi loss function, mọi weight initialization, mọi noise model trong ML đều quay về Gaussian. Bài này dạy bạn "vì sao" và "dùng ra sao".

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Viết được PDF của Gaussian $N(\mu, \sigma^2)$ và giải thích vai trò từng tham số.
2. Chuẩn hoá (standardize) một biến $X \sim N(\mu, \sigma^2)$ về $Z \sim N(0, 1)$.
3. Áp dụng quy tắc **68-95-99.7** để ước lượng xác suất nhanh trong đầu.
4. Dùng bảng z-score (hoặc $\Phi(z)$) để tính $P(X \le x)$ cho Gaussian bất kỳ.
5. Phát biểu và áp dụng **Định lý giới hạn trung tâm (CLT)** — vì sao trung bình mẫu luôn Gaussian.
6. Đọc được Gaussian đa biến $N(\mu, \Sigma)$ và biết iso-density là ellipse.
7. Liên hệ Gaussian với các thuật toán ML thật: MSE, Xavier init, VAE, diffusion.

## Kiến thức tiền đề

- **[Lesson 04 — Biến ngẫu nhiên liên tục](../lesson-04-continuous-rv/)**: PDF, CDF, $\int f(x)\, dx = 1$, $P(a \le X \le b) = \int_a^b f(x)\, dx$.
- **[Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/)**: trực giác về mean, variance.
- **[Tầng 3 — Calculus](../../03-Calculus/)**: tích phân, hàm $\exp$, đạo hàm.
- **[Tầng 4 — Linear Algebra](../../04-LinearAlgebra/)**: covariance matrix $\Sigma$, định thức, ma trận xác định dương — cần cho mục 8 (Gaussian đa biến).
- **[Tầng 1 — Algebra, Lesson 07 (luỹ thừa & log)](../../01-Algebra/lesson-07-exponentials-logs/)**: tính chất $\exp(a+b) = \exp(a)\cdot\exp(b)$.

> **Lời hứa của bài**: cuối bài bạn sẽ trả lời được câu hỏi *"vì sao một phân phối có công thức xấu xí với $\exp(-x^2/2)$ lại xuất hiện ở khắp mọi nơi trong tự nhiên và ML?"* — câu trả lời nằm ở **CLT** và **maximum entropy**, mục 7 và mục 10.

---

## 1. Định nghĩa Gaussian `N(μ, σ²)`

### 💡 Trực giác trước công thức

Hãy hình dung **chiều cao** của 10 000 nam giới trưởng thành Việt Nam. Nếu vẽ histogram (cột tần suất):

- Phần lớn tập trung quanh 165 cm — đỉnh cao nhất ở giữa.
- Càng xa 165 cm theo cả 2 phía, số người càng giảm dần.
- Hình dạng đối xứng, "hai vai" cong xuống mượt như chuông úp ngược.

Đó là Gaussian. Hai tham số kiểm soát hình:

- **$\mu$ (mu — mean / kỳ vọng)**: vị trí đỉnh trên trục $x$. Ở ví dụ chiều cao, $\mu \approx 165$ cm.
- **$\sigma$ (sigma — standard deviation / độ lệch chuẩn)**: "độ tròe" của chuông. $\sigma$ nhỏ → chuông cao nhọn, phân tán ít. $\sigma$ lớn → chuông thấp dẹt, phân tán nhiều.
- **$\sigma^2$ (variance / phương sai)**: bình phương của $\sigma$. Là đại lượng "kế toán" trong các công thức (vì nó cộng được — sẽ thấy ở Lesson 06).

### Công thức PDF

Một biến ngẫu nhiên liên tục $X$ có phân phối chuẩn (Gaussian / Normal) với tham số $\mu \in \mathbb{R}$ và $\sigma > 0$, ký hiệu $X \sim N(\mu, \sigma^2)$, nếu PDF của nó là:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left( -\frac{(x - \mu)^2}{2\sigma^2} \right).$$

Hoặc viết gọn:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}.$$

### Giải mã từng phần của công thức

Đừng nhìn cả công thức một lần — chia thành 3 mảnh:

1. **$(x - \mu)^2$** ở tử số trong exp: đo "khoảng cách bình phương từ $x$ đến đỉnh $\mu$". Khi $x = \mu$ thì giá trị này $= 0$ → $\exp(0) = 1$ → đạt cực đại. Khi $x$ rời xa $\mu$, số mũ ngày càng âm → $\exp(\text{số âm})$ → giảm về 0.
2. **$2\sigma^2$** ở mẫu: chia khoảng cách bình phương cho "thước đo phân tán". Nếu $\sigma$ lớn, mẫu lớn → tỉ lệ nhỏ → exp giảm chậm → chuông dẹt. Nếu $\sigma$ nhỏ, mẫu nhỏ → tỉ lệ lớn → exp giảm nhanh → chuông nhọn.
3. **$\frac{1}{\sigma\sqrt{2\pi}}$** đứng trước: hằng số chuẩn hoá để tổng diện tích dưới đường cong $= 1$ (luật PDF, [Lesson 04](../lesson-04-continuous-rv/)). Tại sao chính xác là $\sigma\sqrt{2\pi}$? Vì $\int_{-\infty}^{\infty} \exp(-u^2/2)\, du = \sqrt{2\pi}$ — một kết quả "Gaussian integral" nổi tiếng (chứng minh dùng toạ độ cực, để dành cho lesson nâng cao).

### Kiểm tra cơ học: tại sao $f(\mu) = \frac{1}{\sigma\sqrt{2\pi}}$?

Thay $x = \mu$ vào:

$$\begin{aligned}
f(\mu) &= \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left( -\frac{(\mu - \mu)^2}{2\sigma^2} \right) \\
&= \frac{1}{\sigma\sqrt{2\pi}} \exp(0) \\
&= \frac{1}{\sigma\sqrt{2\pi}} \cdot 1 \\
&= \frac{1}{\sigma\sqrt{2\pi}}.
\end{aligned}$$

Đây là **giá trị lớn nhất** của PDF — đỉnh chuông.

### Tính chất quan trọng (sẽ chứng minh từng phần ở các mục sau)

| Tính chất | Phát biểu |
|-----------|-----------|
| Đối xứng | $f(\mu + d) = f(\mu - d)$ với mọi $d \ge 0$. |
| Đỉnh | Đạt cực đại tại $x = \mu$. |
| Điểm uốn | Tại $x = \mu \pm \sigma$ (đạo hàm bậc 2 đổi dấu). |
| Tổng diện tích | $\int_{-\infty}^{\infty} f(x)\, dx = 1$. |
| $E[X]$ | $\mu$. |
| $\mathrm{Var}(X)$ | $\sigma^2$. |

### ⚠ Lỗi thường gặp ngay từ đầu

- **Nhầm $\sigma$ và $\sigma^2$**. Khi đề bài viết $N(0, 4)$, có hai cách hiểu phổ biến:
  - Quy ước phổ biến (sách thống kê chuẩn, scipy, numpy `loc`, `scale`): tham số thứ hai là **variance $\sigma^2$**. Vậy $N(0, 4)$ có $\sigma^2 = 4$, $\sigma = 2$.
  - Một số tài liệu (đặc biệt sách kỹ thuật cũ) coi tham số thứ hai là $\sigma$. Vậy $N(0, 4)$ có $\sigma = 4$, $\sigma^2 = 16$.
  Trong bài này **luôn dùng quy ước variance** — $N(\mu, \sigma^2)$ nghĩa là tham số thứ hai là $\sigma^2$. Trong code numpy/scipy phải nhớ: `scipy.stats.norm(loc=μ, scale=σ)` — scipy dùng $\sigma$ (không phải $\sigma^2$). Sai một chỗ là lệch toàn bộ kết quả.
- **Coi $f(x)$ là xác suất**. Nó là **mật độ**, có thể $> 1$ (ví dụ $N(0, 0.01^2)$ có $f(0) \approx 39.9$). Xác suất là $\int f(x)\, dx$ trên một khoảng — xem [Lesson 04](../lesson-04-continuous-rv/) nhắc lại.

### ❓ Câu hỏi tự nhiên

- *"Sao công thức lại có $2\pi$? $\pi$ của hình tròn liên quan gì tới Gaussian?"* → Đến từ tích phân $\int \exp(-x^2)\, dx$ chuyển sang toạ độ cực có yếu tố $2\pi$ của góc đầy. Không phải trùng hợp, mà là biểu hiện của tính đẳng hướng (rotation-invariant) của Gaussian 2D — sẽ thấy lại ở mục 8.
- *"Tại sao mũ là $-(x-\mu)^2/(2\sigma^2)$ mà không phải bậc 4 hoặc bậc khác?"* → Bậc 2 là lựa chọn của **maximum entropy** dưới ràng buộc cố định mean & variance. Bài 10 (Q&A) sẽ giải đáp.

---

## 2. Walk-through 4 ví dụ với `(μ, σ)` khác nhau

Mục tiêu: tính $f(x)$ tại vài điểm để cảm nhận shape thay đổi thế nào khi đổi $\mu$, $\sigma$.

### Ví dụ 1 — $N(0, 1^2)$ (Standard Normal)

$\mu = 0$, $\sigma = 1$, $\sigma^2 = 1$. PDF:

$$f(x) = \frac{1}{\sqrt{2\pi}} \exp\!\left(-\frac{x^2}{2}\right), \quad \frac{1}{\sqrt{2\pi}} \approx 0.3989.$$

Tính tay:

| $x$ | $x^2/2$ | $\exp(-x^2/2)$ | $f(x) = 0.3989\cdot\exp(\dots)$ |
|-----|--------|--------------|--------------------------|
| 0   | 0      | 1            | **0.3989**               |
| 1   | 0.5    | 0.6065       | 0.2420                   |
| 2   | 2      | 0.1353       | 0.0540                   |
| 3   | 4.5    | 0.0111       | 0.0044                   |
| −2  | 2      | 0.1353       | 0.0540 (đối xứng)        |

Đỉnh $f(0) = 0.3989$. Tại $x = \pm\sigma = \pm 1$, $f(\pm 1) \approx 0.2420$ (= 60.7% so với đỉnh, đúng điểm uốn).

### Ví dụ 2 — $N(0, 2^2)$ (lệch chuẩn lớn gấp đôi)

$\mu = 0$, $\sigma = 2$, $\sigma^2 = 4$. Hệ số chuẩn hoá: $\frac{1}{2\sqrt{2\pi}} \approx 0.1995$. PDF:

$$f(x) = 0.1995 \cdot \exp\!\left(-\frac{x^2}{8}\right).$$

| $x$ | $x^2/8$ | $\exp(-x^2/8)$ | $f(x) = 0.1995\cdot\exp(\dots)$ |
|-----|--------|--------------|--------------------------|
| 0   | 0      | 1            | **0.1995**               |
| 1   | 0.125  | 0.8825       | 0.1760                   |
| 2   | 0.5    | 0.6065       | 0.1210                   |
| 4   | 2      | 0.1353       | 0.0270                   |

So với ví dụ 1: đỉnh giảm còn **một nửa** (0.1995 vs 0.3989). Chuông thấp hơn và dẹt hơn — đúng trực giác $\sigma$ lớn → phân tán nhiều.

### Ví dụ 3 — $N(5, 1^2)$ (dịch sang phải)

$\mu = 5$, $\sigma = 1$. PDF:

$$f(x) = 0.3989 \cdot \exp\!\left(-\frac{(x-5)^2}{2}\right).$$

| $x$ | $(x-5)^2/2$ | $\exp(\dots)$  | $f(x)$     |
|-----|------------|-----------|------------|
| 5   | 0          | 1         | **0.3989** |
| 6   | 0.5        | 0.6065    | 0.2420     |
| 7   | 2          | 0.1353    | 0.0540     |
| 3   | 2          | 0.1353    | 0.0540     |

Cùng **shape** với ví dụ 1, nhưng đỉnh **dịch** sang $x = 5$. $\mu$ chỉ chuyển đường cong sang trái/phải, không đổi shape.

### Ví dụ 4 — $N(100, 15^2)$ (IQ-style)

Đây là phân phối IQ truyền thống: $\mu = 100$, $\sigma = 15$. Hệ số: $\frac{1}{15\sqrt{2\pi}} \approx 0.02660$. PDF:

$$f(x) = 0.02660 \cdot \exp\!\left(-\frac{(x-100)^2}{450}\right).$$

| $x$ | $(x-100)^2$ | $(x-100)^2/450$ | $\exp(\dots)$  | $f(x)$     |
|-----|------------|----------------|-----------|------------|
| 100 | 0          | 0              | 1         | **0.02660** |
| 115 | 225        | 0.5            | 0.6065    | 0.01614    |
| 130 | 900        | 2              | 0.1353    | 0.00360    |
| 145 | 2025       | 4.5            | 0.0111    | 0.00030    |
| 70  | 900        | 2              | 0.1353    | 0.00360    |

Đỉnh **rất thấp** ($0.02660$) so với ví dụ 1 ($0.3989$) — vì diện tích phải $= 1$, nên $\sigma = 15$ dàn diện tích ra rộng, chiều cao đỉnh giảm.

### 🔁 Dừng lại tự kiểm tra

Với $N(2, 3^2)$, tính $f(2)$ và $f(5)$. Kết quả $f(5)$ bằng bao nhiêu lần $f(2)$?

<details>
<summary>Lời giải</summary>

$\mu = 2$, $\sigma = 3$, hệ số $\frac{1}{3\sqrt{2\pi}} \approx 0.1330$.

- $f(2) = 0.1330 \cdot \exp(0) =$ **0.1330**.
- $f(5) = 0.1330 \cdot \exp\!\left(-\frac{(5-2)^2}{2\cdot 9}\right) = 0.1330 \cdot \exp(-9/18) = 0.1330 \cdot \exp(-0.5) = 0.1330 \cdot 0.6065 \approx$ **0.0807**.
- Tỉ lệ $f(5)/f(2) = \exp(-0.5) \approx 0.6065$ (đúng 60.65%, tương ứng vị trí $\mu + \sigma$).

</details>

### 📝 Tóm tắt mục 2

- $\mu$ dịch chuông sang trái/phải, **không** đổi shape.
- $\sigma$ lớn → chuông dẹt và thấp hơn (đỉnh $= \frac{1}{\sigma\sqrt{2\pi}}$).
- Mọi Gaussian đều **đối xứng** quanh $\mu$ và **đỉnh duy nhất** tại $x = \mu$.
- Tỉ lệ $f(x)/f(\mu) = \exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$ — chỉ phụ thuộc khoảng cách tính bằng $\sigma$.

---

## 3. Standard Normal `N(0, 1)` và phép chuẩn hoá (standardization)

### Định nghĩa Standard Normal

$Z \sim N(0, 1)$ là Gaussian với $\mu = 0$, $\sigma = 1$. Ký hiệu PDF riêng là $\varphi(z)$:

$$\varphi(z) = \frac{1}{\sqrt{2\pi}} \exp\!\left(-\frac{z^2}{2}\right).$$

Lý do quan trọng:

1. **Có bảng tra cứu sẵn** — $\Phi(z)$ (CDF) được lập bảng từ thế kỷ 19, mọi thầy cô đều phát cho học sinh.
2. **Tham chiếu phổ quát** — mọi câu hỏi về Gaussian tổng quát đều có thể quy về $N(0, 1)$ bằng phép chuẩn hoá.

### Phép chuẩn hoá (standardization)

Nếu $X \sim N(\mu, \sigma^2)$, định nghĩa:

$$Z = \frac{X - \mu}{\sigma}.$$

Thì $Z \sim N(0, 1)$. Đây là một trong những công cụ mạnh nhất trong xác suất ứng dụng.

#### Chứng minh nhanh (không dùng "dễ thấy"):

- **Bước 1: $E[Z] = 0$.** $E[Z] = E\!\left[\frac{X - \mu}{\sigma}\right] = \frac{E[X] - \mu}{\sigma} = \frac{\mu - \mu}{\sigma} = 0$. ✓
- **Bước 2: $\mathrm{Var}(Z) = 1$.** $\mathrm{Var}(Z) = \mathrm{Var}\!\left(\frac{X - \mu}{\sigma}\right) = \frac{1}{\sigma^2} \cdot \mathrm{Var}(X - \mu) = \frac{1}{\sigma^2} \cdot \mathrm{Var}(X) = \frac{\sigma^2}{\sigma^2} = 1$ (vì $\mathrm{Var}(c) = 0$ cho hằng số $c = \mu$, và $\mathrm{Var}(aY) = a^2\mathrm{Var}(Y)$ — sẽ chứng minh ở [Lesson 06](../lesson-06-expectation-variance/)). ✓
- **Bước 3: Z vẫn là Gaussian.** Đây là **tính chất bảo toàn** của Gaussian: nếu $X \sim N(\mu, \sigma^2)$ và $Y = aX + b$ ($a \ne 0$), thì $Y \sim N(a\mu + b, a^2\sigma^2)$. Áp dụng $a = 1/\sigma$, $b = -\mu/\sigma$ → $Z \sim N(0, 1)$. Tính chất này dùng **change of variables** cho PDF, có ở [Lesson 04](../lesson-04-continuous-rv/) mục đổi biến.

### Walk-through chuẩn hoá

**Ví dụ**: chiều cao nam giới $X \sim N(165, 5^2)$ (cm). Một người cao 175 cm có giá trị $Z$ là bao nhiêu?

$$Z = \frac{175 - 165}{5} = \frac{10}{5} = 2.$$

Nghĩa là người đó cao hơn trung bình **đúng 2 độ lệch chuẩn**. Sau khi chuẩn hoá, ta không quan tâm đơn vị (cm, kg, USD, IQ...) — chỉ quan tâm "cách $\mu$ bao nhiêu $\sigma$".

**Ví dụ 2**: IQ $X \sim N(100, 15^2)$. Người có IQ = 130 có $Z = \frac{130 - 100}{15} = 2$. Người có IQ = 70 có $Z = \frac{70 - 100}{15} = -2$. Cả hai đều "cách trung bình $2\sigma$" — chỉ khác chiều.

### Suy ngược: tính xác suất

Để tính $P(X \le x)$ cho $X \sim N(\mu, \sigma^2)$:

$$P(X \le x) = P\!\left(\frac{X - \mu}{\sigma} \le \frac{x - \mu}{\sigma}\right) = P(Z \le z) = \Phi(z), \quad z = \frac{x - \mu}{\sigma}.$$

Ví dụ với IQ ở trên: tỉ lệ người có IQ $\le 130$ là $\Phi(2) \approx 0.9772$ → **97.72%** dân số có IQ $\le 130$, tức chỉ ~2.28% có IQ $> 130$.

### ⚠ Lỗi thường gặp

- **Quên chia cho $\sigma$**, chỉ trừ đi $\mu$. Sai. $Z = \frac{X - \mu}{\sigma}$, không phải $X - \mu$.
- **Khi $\sigma$ đo bằng đơn vị khác $(X - \mu)$** — luôn kiểm tra đơn vị. Nếu $X$ tính cm thì $\sigma$ cũng cm; $Z$ không đơn vị (vô thứ nguyên).

### 🔁 Dừng lại tự kiểm tra

Cho $X \sim N(50, 10^2)$. Tính $Z$ ứng với $x = 65$, $x = 30$, $x = 50$.

<details>
<summary>Lời giải</summary>

- $x = 65$: $Z = \frac{65 - 50}{10} = 1.5$.
- $x = 30$: $Z = \frac{30 - 50}{10} = -2$.
- $x = 50$: $Z = \frac{50 - 50}{10} = 0$. (Đúng giá trị $\mu$ → $Z = 0$.)

</details>

### 📝 Tóm tắt mục 3

- $N(0, 1)$ là Gaussian "tham chiếu" với PDF $\varphi(z) = \frac{1}{\sqrt{2\pi}}\exp(-z^2/2)$.
- $Z = \frac{X - \mu}{\sigma}$ chuyển mọi Gaussian về Standard Normal.
- Sau chuẩn hoá, mọi câu hỏi về $X$ đều dùng bảng $\Phi(z)$ để tra cứu.

---

## 4. Quy tắc 68-95-99.7 (Empirical Rule)

### Phát biểu

Cho $X \sim N(\mu, \sigma^2)$:

| Khoảng | Xác suất chứa X |
|--------|-----------------|
| $[\mu - \sigma, \mu + \sigma]$ | ≈ **68.27%** |
| $[\mu - 2\sigma, \mu + 2\sigma]$ | ≈ **95.45%** |
| $[\mu - 3\sigma, \mu + 3\sigma]$ | ≈ **99.73%** |

Gọi tắt là **quy tắc 68-95-99.7**.

### Vì sao có những con số này — walk-through

Dùng phép chuẩn hoá: $P(\mu - \sigma \le X \le \mu + \sigma) = P(-1 \le Z \le 1) = \Phi(1) - \Phi(-1)$.

Tra bảng:

- $\Phi(1) \approx 0.84134$.
- $\Phi(-1) = 1 - \Phi(1) \approx 0.15866$ (do đối xứng).
- Hiệu: $0.84134 - 0.15866 = 0.68268 \approx$ **68.27%**. ✓

Tương tự:

- $\Phi(2) \approx 0.97725$, $\Phi(-2) \approx 0.02275$ → hiệu $= 0.95450 \approx$ **95.45%**. ✓
- $\Phi(3) \approx 0.99865$, $\Phi(-3) \approx 0.00135$ → hiệu $= 0.99730 \approx$ **99.73%**. ✓

### Ứng dụng nhanh

**Ví dụ 1**: chiều cao $X \sim N(165, 5^2)$. Khoảng nào chứa ~68% dân số?

$[165 - 5, 165 + 5] = [160, 170]$ (cm). 95% rơi trong $[155, 175]$, 99.7% rơi trong $[150, 180]$.

**Ví dụ 2**: chế tạo bu-lông, đường kính $X \sim N(10, 0.05^2)$ (mm). Spec cho phép $10 \pm 0.10$ mm (tức $\pm 2\sigma$). Tỉ lệ phế phẩm?

Tỉ lệ trong spec $= P(|X - 10| \le 0.10) = P(|Z| \le 2) \approx 95.45\%$.
Tỉ lệ ngoài spec (phế phẩm) ≈ **4.55%**.

Nếu nhà máy muốn giảm phế phẩm xuống dưới 0.3%, phải mở rộng spec lên $\pm 3\sigma = \pm 0.15$ mm (hoặc cải tiến công nghệ để giảm $\sigma$).

**Ví dụ 3 — Six Sigma**: triết lý "chất lượng $6\sigma$" của Motorola: muốn lỗi $< 3.4$ phần triệu ($< 0.00034\%$). Mở rộng spec $\pm 6\sigma$ → $P(|Z| > 6) \approx 2 \cdot 10^{-9}$ — quá khắt khe, thực tế họ chấp nhận shift $1.5\sigma$, ra con số 3.4 ppm.

### ⚠ Lỗi thường gặp

- **Nhầm 68% thành xác suất cho khoảng đối xứng $[\mu, \mu + \sigma]$ (một phía)**. Đúng là **hai phía**, $[\mu - \sigma, \mu + \sigma]$. Một phía là 34.13%.
- **Áp dụng quy tắc cho non-Gaussian**. Quy tắc 68-95-99.7 chỉ đúng với Gaussian. Phân phối khác (đặc biệt heavy-tail như Cauchy) có thể có $P(|X - \mu| \le \sigma)$ khác xa.

### ❓ Câu hỏi tự nhiên

- *"Sao 68 mà không phải 70 cho dễ nhớ?"* → Vì đó là kết quả của tích phân $\int_{-1}^{1} \frac{1}{\sqrt{2\pi}}\exp(-z^2/2)\, dz = 0.6827$, không tròn được. Nhớ con số chính xác nếu cần, hoặc nhớ "khoảng 2/3".
- *"Nếu cần xác suất chính xác 95%, dùng z nào?"* → Không phải $z = 2$ mà là **$z = 1.96$**. $P(|Z| \le 1.96) = 0.95000$. Đây là số "kinh thánh" của thống kê (95% confidence interval).
- *"Tại sao ML hay nói $\pm 3\sigma$?"* → Vì 99.7% gần như "chắc chắn"; phát hiện outlier (anomaly detection) thường lấy ngưỡng $|Z| > 3$.

### 🔁 Dừng lại tự kiểm tra

Điểm thi $X \sim N(70, 10^2)$. Xác suất một thí sinh ngẫu nhiên đạt:
(a) Điểm trong $[60, 80]$?
(b) Điểm trên 90?

<details>
<summary>Lời giải</summary>

(a) $[60, 80] = [70 - 10, 70 + 10] = [\mu - \sigma, \mu + \sigma]$ → $P \approx$ **68.27%**.

(b) $P(X > 90) = P\!\left(Z > \frac{90-70}{10}\right) = P(Z > 2) = 1 - \Phi(2) \approx 1 - 0.97725 = 0.02275$ → ~**2.28%**.

</details>

### 📝 Tóm tắt mục 4

- 68% ≈ $1\sigma$, 95% ≈ $2\sigma$, 99.7% ≈ $3\sigma$ — quy tắc "trong đầu".
- 95% chính xác ứng với $z = 1.96$ (không phải 2).
- Six Sigma = chấp nhận phế phẩm cực thấp dựa trên đuôi Gaussian.

---

## 5. CDF Φ(z) và bảng z-score

### Định nghĩa Φ(z)

CDF (cumulative distribution function) của Standard Normal:

$$\Phi(z) = P(Z \le z) = \int_{-\infty}^{z} \frac{1}{\sqrt{2\pi}} \exp\!\left(-\frac{t^2}{2}\right) dt.$$

**Tính chất**:

- $\Phi(-\infty) = 0$, $\Phi(+\infty) = 1$.
- $\Phi(0) = 0.5$ (đối xứng → đỉnh CDF qua 1/2 tại trung điểm).
- $\Phi(-z) = 1 - \Phi(z)$ (đối xứng).
- Không có biểu thức "khép kín" qua hàm sơ cấp — phải dùng bảng hoặc xấp xỉ số. Hàm $\mathrm{erf}$ có liên hệ: $\Phi(z) = 0.5 \cdot \left(1 + \mathrm{erf}\!\left(\frac{z}{\sqrt{2}}\right)\right)$.

### Bảng z-score (extract)

| z     | $\Phi(z)$    | z    | $\Phi(z)$    |
|-------|---------|------|---------|
| 0.00  | 0.5000  | 1.60 | 0.9452  |
| 0.25  | 0.5987  | 1.65 | 0.9505  |
| 0.50  | 0.6915  | 1.96 | 0.9750  |
| 0.75  | 0.7734  | 2.00 | 0.9772  |
| 1.00  | 0.8413  | 2.33 | 0.9901  |
| 1.28  | 0.8997  | 2.58 | 0.9951  |
| 1.50  | 0.9332  | 3.00 | 0.9987  |

(Cho $z < 0$: dùng $\Phi(-z) = 1 - \Phi(z)$.)

### Quy trình tính xác suất tổng quát

**Bài toán**: cho $X \sim N(\mu, \sigma^2)$, tính $P(a \le X \le b)$.

**Bước 1**: Chuẩn hoá hai cận.

$$z_a = \frac{a - \mu}{\sigma}, \qquad z_b = \frac{b - \mu}{\sigma}.$$

**Bước 2**: Tra bảng.

$$P(a \le X \le b) = \Phi(z_b) - \Phi(z_a).$$

### Walk-through tổng hợp

**Bài toán**: $X \sim N(165, 5^2)$. Tính $P(160 \le X \le 175)$.

- $z_a = \frac{160 - 165}{5} = -1$.
- $z_b = \frac{175 - 165}{5} = +2$.
- $\Phi(z_b) = \Phi(2) = 0.9772$.
- $\Phi(z_a) = \Phi(-1) = 1 - \Phi(1) = 1 - 0.8413 = 0.1587$.
- $P = 0.9772 - 0.1587 = 0.8185 \approx$ **81.85%**.

Kiểm tra trực giác: khoảng $[160, 175]$ bao phủ "$1\sigma$ phía trái $+ 2\sigma$ phía phải". $34.13\% + 47.73\% = 81.86\% \approx$ kết quả tính (lệch do làm tròn). ✓

### Tính một phía

- $P(X \ge x)$: dùng $1 - \Phi(z)$.
- Ví dụ: $P(X \ge 180)$ với $X \sim N(165, 5^2)$. $z = 3$. $P = 1 - \Phi(3) = 1 - 0.9987 = 0.0013$ → ~0.13%.

### ⚠ Lỗi thường gặp

- **Nhầm $\Phi$ với PDF $\varphi$** — $\Phi$ (CDF, hoa) là tích phân tích lũy; $\varphi$ (PDF, thường) là mật độ.
- **Quên $\Phi(-z) = 1 - \Phi(z)$** — nhiều bảng chỉ liệt kê $z \ge 0$, phải tự suy.
- **Quên cận** — $P(X \le x)$ khác $P(X < x)$? Với phân phối liên tục, **bằng nhau** (xem [Lesson 04](../lesson-04-continuous-rv/)).

### 📝 Tóm tắt mục 5

- $\Phi(z) = P(Z \le z)$ là CDF của Standard Normal, không có công thức kín nhưng có bảng.
- Tính $P(a \le X \le b) = \Phi(z_b) - \Phi(z_a)$ sau khi chuẩn hoá.
- $\Phi(-z) = 1 - \Phi(z)$ — luôn nhớ tính đối xứng.

---

## 6. Định lý giới hạn trung tâm (Central Limit Theorem — CLT)

CLT là **lý do** Gaussian xuất hiện khắp nơi. Đây là phần quan trọng nhất của bài.

### 💡 Trực giác trước khi vào công thức

Bạn tung 1 con xúc xắc 6 mặt. Kết quả $X$ có phân phối đều ($P(X = k) = 1/6$ với $k = 1, \dots, 6$) — không phải Gaussian, mà là phẳng.

Bây giờ tung **2 con** và lấy trung bình $\bar{X} = (X_1 + X_2)/2$. Phân phối của $\bar{X}$ là gì? Không còn đều — đỉnh ở 3.5, hai bên giảm dần (giống tam giác).

Tung **30 con** và lấy trung bình. Phân phối của $\bar{X}$ là gì? **Gần như Gaussian hoàn hảo** quanh $\mu = 3.5$.

**Điều kỳ lạ**: phân phối gốc (uniform) hoàn toàn không phải Gaussian, nhưng **trung bình** lại Gaussian. Và quy luật này không phụ thuộc loại phân phối gốc — Bernoulli, Exponential, lognormal..., tất cả khi lấy trung bình đủ nhiều sample đều cho ra Gaussian.

Đó là CLT.

### Phát biểu chính xác

Cho $X_1, X_2, \dots, X_n$ là các biến ngẫu nhiên **iid** (independent and identically distributed) với:

- Mean $E[X_i] = \mu$ (hữu hạn).
- Variance $\mathrm{Var}(X_i) = \sigma^2$ (hữu hạn, $\sigma > 0$).

Gọi $\bar{X}_n = (X_1 + X_2 + \dots + X_n)/n$ là trung bình mẫu. Khi $n \to \infty$:

$$\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \longrightarrow N(0, 1) \quad \text{(hội tụ về phân phối, in distribution)}.$$

Tương đương: với $n$ lớn,

$$\bar{X}_n \approx N\!\left(\mu, \frac{\sigma^2}{n}\right).$$

Sai số chuẩn của trung bình mẫu là $\sigma/\sqrt{n}$ — giảm theo $\sqrt{n}$ (đây là "luật $\sqrt{n}$" cơ bản của thống kê).

### Walk-through CLT với Uniform[0, 1]

Cho mỗi $X_i \sim \text{Uniform}[0, 1]$. Biết:

- $\mu = E[X] = 0.5$.
- $\sigma^2 = \mathrm{Var}(X) = 1/12 \approx 0.0833$. (Sẽ chứng minh ở [Lesson 06](../lesson-06-expectation-variance/), tạm chấp nhận: tích phân $\int_0^1 (x - 0.5)^2\, dx = 1/12$.)
- $\sigma = 1/\sqrt{12} \approx 0.2887$.

#### $n = 1$: phân phối là Uniform — phẳng.

$f(x) = 1$ trên $[0, 1]$. Đỉnh phẳng từ 0 đến 1, không có dạng chuông.

#### $n = 2$: phân phối là tam giác.

$\bar{X}_2 = (X_1 + X_2)/2$. PDF của $\bar{X}_2$ có dạng tam giác:
- Đỉnh tại $\bar{x} = 0.5$ với giá trị PDF $= 2$.
- Giá trị tại biên $\bar{x} = 0$ và $\bar{x} = 1$ là 0.

Còn chưa phải Gaussian, nhưng đã có dáng "đỉnh ở giữa, giảm dần ra biên".

#### $n = 12$: gần như Gaussian.

CLT nói $\bar{X}_{12} \approx N(0.5, (1/12)/12) = N(0.5, 1/144)$. Vậy $\sigma$ của $\bar{X}_{12} \approx 1/12 \approx 0.0833$.

Lấy mẫu mô phỏng (1 triệu lần) → vẽ histogram → trùng khít với $N(0.5, 1/144)$.

#### $n = 30$: cực kỳ Gaussian.

$\bar{X}_{30} \approx N(0.5, 1/360)$, $\sigma \approx 0.0527$. Hình dạng gần như indistinguishable với Gaussian thật.

### Sample numeric: kiểm tra CLT bằng tay

Lấy 5 lần mẫu $n = 4$ từ Uniform[0,1] (giả lập):

| Lần | $X_1$    | $X_2$    | $X_3$    | $X_4$    | $\bar{X}$ |
|-----|-------|-------|-------|-------|--------|
| 1   | 0.23  | 0.81  | 0.45  | 0.67  | 0.540  |
| 2   | 0.91  | 0.12  | 0.55  | 0.40  | 0.495  |
| 3   | 0.05  | 0.78  | 0.62  | 0.30  | 0.4375 |
| 4   | 0.66  | 0.50  | 0.21  | 0.89  | 0.565  |
| 5   | 0.34  | 0.42  | 0.71  | 0.50  | 0.4925 |

Trung bình của 5 giá trị $\bar{X}$: $(0.540 + 0.495 + 0.4375 + 0.565 + 0.4925)/5 = 0.506$ (rất gần $\mu = 0.5$). Variance giảm so với mẫu đơn lẻ — đúng $\sigma^2/n = 1/48$.

Với mô phỏng thật (xem viz), 5 lần là chưa đủ thấy Gaussian — cần hàng nghìn mẫu để histogram lộ shape chuông.

### Walk-through CLT với Bernoulli

$X_i \sim \text{Bernoulli}(p = 0.3)$, $\mu = 0.3$, $\sigma^2 = p(1-p) = 0.21$, $\sigma \approx 0.458$.

Sum $S_n = X_1 + \dots + X_n \sim \text{Binomial}(n, p)$. CLT nói:

$$S_n \approx N(np, np(1-p)) \quad \text{(với n đủ lớn)}.$$

Với $n = 100$, $p = 0.3$: $S_n \approx N(30, 21)$. Standard deviation $\sqrt{21} \approx 4.58$.

Xác suất $P(S_{100} \le 25)$? Chuẩn hoá: $z = \frac{25 - 30}{4.58} \approx -1.09$. $\Phi(-1.09) \approx 0.1379$ → ~13.79%. (So với tính chính xác từ Binomial — gần như y hệt.)

Đây là cách xấp xỉ Binomial bằng Normal — kỹ thuật "**Normal approximation to Binomial**", chuẩn cho $np \ge 5$ và $n(1-p) \ge 5$.

### Walk-through CLT với Exponential

$X_i \sim \text{Exp}(\lambda = 1)$. $\mu = 1/\lambda = 1$, $\sigma = 1/\lambda = 1$ (Exponential có tail dài, không đối xứng).

$n = 1$: PDF $f(x) = e^{-x}$ — heavily right-skewed, không Gaussian.
$n = 30$: $\bar{X}_{30} \approx N(1, 1/30)$. Skewness gần như biến mất, chuông đối xứng quanh 1.

Đây là lý do CLT mạnh: **bất kể** distribution gốc skew thế nào, đủ sample là ra Gaussian.

### Khi nào CLT "hết hiệu lực"?

CLT yêu cầu mean và variance hữu hạn. Một số phân phối heavy-tail vi phạm:

- **Cauchy distribution**: PDF $f(x) = \frac{1}{\pi(1+x^2)}$. Mean **không tồn tại** (tích phân phân kỳ). Trung bình của n samples Cauchy vẫn là Cauchy, KHÔNG hội tụ Gaussian. Đây là phản ví dụ kinh điển.
- **Pareto với $\alpha \le 2$**: variance vô hạn → CLT cổ điển fail, phải dùng **CLT tổng quát** (stable distributions).

### ❓ Câu hỏi tự nhiên

- *"$n$ phải lớn cỡ nào để dùng CLT?"* — Rule of thumb: $n \ge 30$ cho phân phối "không quá lệch"; $n \ge 100$ cho phân phối lệch mạnh (Exponential, lognormal). Với Bernoulli kiểm tra $np \ge 5$ và $n(1-p) \ge 5$.
- *"Tại sao là $\sqrt{n}$ mà không phải $n$?"* — Vì $\mathrm{Var}(S_n) = n\sigma^2$ (cộng độc lập) → $\mathrm{Var}(\bar{X}_n) = \sigma^2/n$ → $\mathrm{SD}(\bar{X}_n) = \sigma/\sqrt{n}$. Đó là gốc rễ của "luật $\sqrt{n}$" — muốn giảm sai số 10 lần phải lấy 100 lần dữ liệu.
- *"Tại sao CLT lại là Gaussian, không phải phân phối khác?"* — Vì Gaussian là **fixed point** của phép "trộn nhiều biến iid". Tổng 2 Gaussian vẫn Gaussian (sẽ thấy sau). Theorem rộng hơn: **stable distributions** — Gaussian là một trường hợp đặc biệt ($\alpha = 2$) của họ stable.

### 🔁 Dừng lại tự kiểm tra

Một cuộc thăm dò: hỏi 400 người "có dùng smartphone không?". Tỉ lệ thật trong dân số là $p = 0.7$.

(a) Phân phối số người trả lời "có" $S_{400} \sim ?$
(b) Xấp xỉ Gaussian — viết phân phối.
(c) $P(S_{400} \ge 290) \approx ?$

<details>
<summary>Lời giải</summary>

(a) $S_{400} \sim \text{Binomial}(400, 0.7)$.

(b) $np = 280$, $np(1-p) = 84$. $S_{400} \approx N(280, 84)$, $\sigma \approx 9.17$.

(c) $z = \frac{290 - 280}{9.17} \approx 1.09$. $P(S \ge 290) = 1 - \Phi(1.09) \approx 1 - 0.8621 = 0.1379$ → ~**13.79%**.

</details>

### 📝 Tóm tắt mục 6

- CLT: trung bình của n iid samples với mean $\mu$, variance $\sigma^2$ → $N(\mu, \sigma^2/n)$ khi $n \to \infty$.
- Sai số chuẩn của trung bình mẫu $= \sigma/\sqrt{n}$ ("luật $\sqrt{n}$").
- Bất kể phân phối gốc (nếu mean & variance hữu hạn), trung bình mẫu luôn Gaussian.
- Phản ví dụ: Cauchy (mean không tồn tại) — CLT fail.

---

## 7. Gaussian đa biến `N(μ, Σ)` — giới thiệu nhẹ

Bài [Tầng 4 — Linear Algebra](../../04-LinearAlgebra/) đã giới thiệu **covariance matrix $\Sigma$**. Bây giờ ta dùng nó để định nghĩa Gaussian trong không gian nhiều chiều.

### 💡 Trực giác

Gaussian 1D là chuông. Gaussian 2D là **đỉnh đồi**: nhìn từ trên xuống thấy các **iso-density contour** (đường cùng mật độ) là **ellipse**. Hai trường hợp:

- Nếu hai chiều **độc lập** (covariance $= 0$) và cùng $\sigma$: contour là **hình tròn** (Gaussian "isotropic").
- Nếu hai chiều có correlation: contour là **ellipse nghiêng**.

### Công thức PDF

Cho vector ngẫu nhiên $X = (X_1, \dots, X_d)^\top$ trong $\mathbb{R}^d$. $X \sim N(\mu, \Sigma)$ với:

- $\mu \in \mathbb{R}^d$ là vector kỳ vọng.
- $\Sigma \in \mathbb{R}^{d\times d}$ là covariance matrix, đối xứng và xác định dương.

PDF:

$$f(x) = \frac{1}{(2\pi)^{d/2} \, |\Sigma|^{1/2}} \exp\!\left( -\frac{1}{2} (x - \mu)^\top \Sigma^{-1} (x - \mu) \right).$$

Trong đó $|\Sigma|$ là **định thức** (xem [Tầng 4](../../04-LinearAlgebra/)), $\Sigma^{-1}$ là **nghịch đảo** ma trận hiệp phương sai.

### So sánh với 1D

Khi $d = 1$: $\Sigma$ thu lại thành $[\sigma^2]$ (1×1). $|\Sigma| = \sigma^2$, $|\Sigma|^{1/2} = \sigma$. $\Sigma^{-1} = 1/\sigma^2$. $(x - \mu)^\top \Sigma^{-1} (x - \mu) = (x - \mu)^2/\sigma^2$. Thay vào:

$$\begin{aligned}
f(x) &= \frac{1}{(2\pi)^{1/2} \, \sigma} \exp\!\left( -\frac{1}{2} \cdot \frac{(x - \mu)^2}{\sigma^2} \right) \\
&= \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left( -\frac{(x - \mu)^2}{2\sigma^2} \right).
\end{aligned}$$

Đúng công thức Gaussian 1D ở mục 1. ✓ Không phải trùng hợp — multivariate là tổng quát hoá tự nhiên.

### Ví dụ 2D cụ thể

$d = 2$, $\mu = (0, 0)$, $\Sigma = \begin{bmatrix} 1 & 0.6 \\ 0.6 & 1 \end{bmatrix}$ (correlation $\rho = 0.6$).

- $|\Sigma| = 1\cdot 1 - 0.6\cdot 0.6 = 1 - 0.36 = 0.64$. $|\Sigma|^{1/2} = 0.8$.
- $\Sigma^{-1} = \frac{1}{0.64} \begin{bmatrix} 1 & -0.6 \\ -0.6 & 1 \end{bmatrix} \approx \begin{bmatrix} 1.5625 & -0.9375 \\ -0.9375 & 1.5625 \end{bmatrix}$.
- Tại $x = (0, 0)$: $f(0,0) = \frac{1}{2\pi \cdot 0.8} \approx 0.199$.
- Tại $x = (1, 1)$: số mũ $= -0.5 \cdot (1\cdot 1.5625\cdot 1 + 2\cdot 1\cdot(-0.9375)\cdot 1 + 1\cdot 1.5625\cdot 1) = -0.5 \cdot (1.5625 - 1.875 + 1.5625) = -0.5 \cdot 1.25 = -0.625$. $f(1, 1) = 0.199 \cdot \exp(-0.625) \approx 0.199 \cdot 0.535 \approx 0.107$.
- Tại $x = (1, -1)$ (đi ngược correlation): số mũ $= -0.5 \cdot (1.5625 + 2\cdot(-0.9375)\cdot(-1) + 1.5625) = -0.5 \cdot (1.5625 + 1.875 + 1.5625) = -0.5 \cdot 5 = -2.5$. $f(1, -1) = 0.199 \cdot \exp(-2.5) \approx 0.199 \cdot 0.0821 \approx 0.0163$.

So sánh: $f(1, 1)$ lớn hơn $f(1, -1)$ ~ 6.5 lần. Vì $\rho = 0.6 > 0$ → hai chiều có xu hướng cùng dấu, nên $(1, 1)$ "hợp xu hướng" hơn $(1, -1)$.

### Iso-density ellipse

$f(x) = c$ (hằng số) $\iff (x - \mu)^\top \Sigma^{-1} (x - \mu) = \text{const}$. Đây là phương trình ellipse trong $\mathbb{R}^d$. Trục chính của ellipse trùng với **eigenvectors** của $\Sigma$, độ dài bán trục tỉ lệ với $\sqrt{\text{eigenvalue}}$. (Liên hệ thẳng với PCA — xem [Tầng 4](../../04-LinearAlgebra/).)

### Liên hệ sẽ gặp lại

- **Lesson 06 (Tầng 5)**: $\Sigma_{ij} = \mathrm{Cov}(X_i, X_j)$. Định nghĩa chính thức của hiệp phương sai.
- **Tầng 6 — AI/ML**: GMM (Gaussian Mixture Model), VAE, các mô hình generative — đều cần multivariate Gaussian.

### 📝 Tóm tắt mục 7

- $N(\mu, \Sigma)$ tổng quát Gaussian sang $\mathbb{R}^d$.
- $\Sigma$ đối xứng xác định dương, kiểm soát "shape ellipse" của iso-density.
- Trục chính của ellipse = eigenvectors của $\Sigma$ (cầu nối với PCA).

---

## 8. Liên hệ với Machine Learning

Tại sao Gaussian "chiếm sóng" toàn bộ ML?

### 8.1. Linear Regression với Gaussian noise → MSE

Mô hình:

$$y = wx + b + \varepsilon, \quad \varepsilon \sim N(0, \sigma^2).$$

Tức là cho mỗi $x$, $y$ lệch khỏi đường thẳng $wx + b$ một sai số Gaussian. Likelihood của dataset $\{(x_i, y_i)\}$:

$$\begin{aligned}
L(w, b) &= \prod_i f(y_i \mid x_i; w, b) \\
&= \prod_i \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left( -\frac{(y_i - wx_i - b)^2}{2\sigma^2} \right).
\end{aligned}$$

Log-likelihood (chuyển tích thành tổng):

$$\log L = -n\log(\sigma\sqrt{2\pi}) - \frac{1}{2\sigma^2} \sum_i (y_i - wx_i - b)^2.$$

Maximum likelihood (chọn $w, b$ để $\log L$ lớn nhất) $\iff$ minimum $\sum_i (y_i - wx_i - b)^2$ (vì các hằng số khác không phụ thuộc $w, b$). Đó chính là **Mean Squared Error (MSE)**.

**Kết luận**: chọn MSE làm loss = giả định ngầm "noise là Gaussian". Đây là một trong những liên kết quan trọng nhất giữa thống kê và ML. Sẽ chứng minh chi tiết ở [Lesson 07 — MLE](../lesson-07-mle/).

### 8.2. Weight initialization (Xavier, He)

Khi khởi tạo weights của neural network, ta dùng Gaussian (hoặc Uniform tương đương).

- **Xavier (Glorot) init**: $W \sim N(0, 1/n_{\text{in}})$ — giữ variance signal không co/giãn qua lớp tuyến tính.
- **He init**: $W \sim N(0, 2/n_{\text{in}})$ — phiên bản cho ReLU (chỉ một nửa neuron active).

Tại sao Gaussian? Tại sao không Uniform? Vì:

1. CLT — tổng nhiều weight Gaussian sau khi nhân input → kết quả vẫn Gaussian. Dễ tracking variance.
2. Symmetric → tránh bias systematique.
3. Khả vi mượt → tốt cho gradient descent.

Sẽ thấy Xavier/He vận hành thực tế ở Tầng 6.

### 8.3. Diffusion models — forward process

Diffusion (Stable Diffusion, Sora, ...) dùng Gaussian noise theo cách rất đẹp:

- Bắt đầu với ảnh $x_0$.
- Mỗi step $t$: thêm Gaussian noise nhỏ. $x_t = \sqrt{1 - \beta_t} \cdot x_{t-1} + \sqrt{\beta_t} \cdot \varepsilon$, $\varepsilon \sim N(0, I)$.
- Sau đủ T bước (~ 1000): $x_T \approx N(0, I)$ — ảnh biến thành pure noise.
- Train neural network để **đảo ngược** quá trình: từ noise tạo lại ảnh.

Sức mạnh: vì Gaussian "stable" (tổng các Gaussian là Gaussian), ta có closed-form $q(x_t \mid x_0) = N(\sqrt{\bar{\alpha}_t} \cdot x_0, (1 - \bar{\alpha}_t)I)$ — không cần mô phỏng từng bước.

### 8.4. Variational Autoencoder (VAE)

Latent space của VAE: mỗi data point $x$ ánh xạ thành phân phối hậu nghiệm $q(z \mid x) \approx N(\mu(x), \Sigma(x))$, được "kéo" về prior $N(0, I)$ qua KL divergence ([Lesson 08](../lesson-08-cross-entropy-kl/) sẽ học).

Tại sao Gaussian? Vì KL giữa hai Gaussian có **công thức kín** — không cần Monte Carlo. Loss VAE differentiable end-to-end.

### 8.5. Anomaly detection

Trong nhiều bài toán phát hiện bất thường, giả định "data bình thường ~ Gaussian" rồi cảnh báo khi $|Z| > 3$ (xác suất $< 0.27\%$). Đơn giản, hiệu quả khi data thực sự gần Gaussian.

### 8.6. Gaussian Process Regression

Mỗi điểm dự đoán $f(x^*)$ không phải 1 con số mà là một phân phối Gaussian (mean + variance). Dùng cho hyperparameter tuning, Bayesian optimization.

### 📝 Tóm tắt mục 8

- MSE ⟺ giả định Gaussian noise. Đây là "secret" của linear regression.
- Weight init dùng Gaussian vì CLT + symmetry.
- Diffusion models tận dụng tính chất "stable" của Gaussian để có closed-form.
- VAE / Bayesian methods dùng Gaussian vì KL giữa Gaussian có công thức kín.

---

## 9. Phép biến đổi quan trọng giữa Gaussian

(Đây là phần "công cụ" cần thuộc — sẽ dùng liên tục từ Lesson 06 trở đi.)

### 9.1. Linear transform của 1 Gaussian

Nếu $X \sim N(\mu, \sigma^2)$ và $Y = aX + b$ ($a \ne 0$), thì:

$$Y \sim N(a\mu + b, a^2\sigma^2).$$

**Chứng minh**:

- $E[Y] = E[aX + b] = a\cdot E[X] + b = a\mu + b$. ✓
- $\mathrm{Var}(Y) = \mathrm{Var}(aX + b) = a^2\cdot\mathrm{Var}(X) = a^2\sigma^2$. ✓
- $Y$ vẫn Gaussian: dùng change of variables. PDF của $Y$ là $f_Y(y) = f_X\!\left(\frac{y - b}{a}\right) \cdot \frac{1}{|a|}$. Thay vào công thức Gaussian → ra đúng dạng $N(a\mu + b, a^2\sigma^2)$. ✓

**Ví dụ**: $X \sim N(0, 1)$. $Y = 3X + 5$ → $Y \sim N(5, 9)$.

### 9.2. Tổng hai Gaussian độc lập

Nếu $X \sim N(\mu_X, \sigma_X^2)$ và $Y \sim N(\mu_Y, \sigma_Y^2)$ **độc lập**, thì:

$$X + Y \sim N(\mu_X + \mu_Y, \sigma_X^2 + \sigma_Y^2).$$

**Chìa khoá**: variance cộng được khi độc lập. SD **không cộng được**: $\sigma_{X+Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}$, không phải $\sigma_X + \sigma_Y$.

**Ví dụ**: $X \sim N(2, 4)$, $Y \sim N(3, 9)$, độc lập. $X + Y \sim N(5, 13)$. SD $= \sqrt{13} \approx 3.61$.

Lưu ý nếu không độc lập: $\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2\cdot\mathrm{Cov}(X, Y)$. Học chi tiết ở [Lesson 06](../lesson-06-expectation-variance/).

### 9.3. Trung bình của n Gaussian iid

$X_i \sim N(\mu, \sigma^2)$ iid ($i = 1, \dots, n$). $\bar{X} = \frac{1}{n}\sum X_i$.

- $\bar{X} \sim N(\mu, \sigma^2/n)$ **chính xác** (không cần CLT, vì Gaussian + Gaussian là Gaussian).

Đây là kết quả "luật $\sqrt{n}$" trong trường hợp đặc biệt — Gaussian iid cho ra Gaussian, không phải xấp xỉ.

### 9.4. Affine transform multivariate

Nếu $X \sim N(\mu, \Sigma)$ trong $\mathbb{R}^d$ và $Y = AX + b$ (A là ma trận $k \times d$), thì:

$$Y \sim N(A\mu + b, A\Sigma A^\top).$$

Tính chất này là nền tảng của Kalman filter, PCA-whitening, GMM training, ...

### 📝 Tóm tắt mục 9

- Gaussian "đóng" dưới linear transform và tổng độc lập.
- Variance cộng được; SD không cộng được.
- Trung bình $n$ Gaussian iid vẫn Gaussian, variance $\sigma^2/n$ — chính xác, không phải xấp xỉ.

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

Trong tất cả các phân phối có **mean $\mu$ và variance $\sigma^2$ cho trước**, **Gaussian là phân phối có entropy lớn nhất**. Tức là Gaussian là lựa chọn "ít giả định nhất" khi ta chỉ biết hai moment đầu tiên.

Đây là nguyên lý "**maximum entropy**" (E.T. Jaynes): chọn phân phối ít bias nhất phù hợp với ràng buộc.

Hệ quả: khi bạn không biết phân phối thực, chỉ biết mean & variance → giả định Gaussian là **lựa chọn khách quan nhất**. Không phải vì Gaussian "đúng", mà vì nó "ít sai" theo nghĩa thông tin.

### 10.3. Tính toán đẹp — câu trả lời kỹ thuật

Gaussian có hàng loạt tính chất "vàng" mà không phân phối nào khác có:

- **Đóng dưới linear transform**: $Y = AX + b$ còn Gaussian.
- **Đóng dưới phép cộng độc lập**: $X + Y$ còn Gaussian.
- **Đóng dưới marginal**: trong multivariate, các thành phần marginal vẫn Gaussian.
- **Đóng dưới conditional**: $(X \mid Y)$ còn Gaussian.
- **MLE = MSE**: dẫn ra OLS đơn giản.
- **Conjugate prior trong Bayesian**: posterior vẫn Gaussian.
- **KL giữa hai Gaussian có closed-form**.

Nhờ vậy, mọi tính toán có Gaussian đều có công thức kín — không cần Monte Carlo.

### 10.4. Stability — câu trả lời toán cao cấp

Gaussian là điểm bất động (fixed point) của phép "average ra $\sqrt{n}$ samples". Trong họ **stable distributions**, Gaussian là trường hợp duy nhất có variance hữu hạn. Các stable khác (Cauchy, Lévy) có heavy tail, dùng trong tài chính, vật lý phức tạp.

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
| Nhầm $\sigma$ và $\sigma^2$ — đặc biệt khi nhập vào `scipy.stats.norm(scale=…)`. | Scipy dùng $\sigma$ (std), KHÔNG phải variance. Numpy `np.random.normal(loc, scale)` cũng dùng $\sigma$. |
| Coi $f(x) > 1$ là sai vì "xác suất phải $\le 1$". | $f$ là **mật độ**, không phải xác suất. Hoàn toàn có thể $> 1$. |
| Dùng $z = 2$ cho confidence interval 95%. | Đúng là $z = 1.96$. $z = 2$ cho ~95.45%. |
| Áp dụng 68-95-99.7 cho phân phối non-Gaussian. | Chỉ đúng cho Gaussian (hoặc gần Gaussian). |
| Cộng SD: $\sigma_{X+Y} = \sigma_X + \sigma_Y$. | Sai! Cộng variance, rồi mới căn: $\sigma_{X+Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}$ (khi độc lập). |
| Quên kiểm tra điều kiện CLT (mean & variance hữu hạn). | Cauchy không có CLT cổ điển. Heavy tail cần kiểm tra. |
| Dùng CLT khi $n$ quá nhỏ. | $n \ge 30$ là rule of thumb; phân phối lệch mạnh cần $n$ lớn hơn. |
| Nhầm $\Phi$ (CDF, chữ hoa) với $\varphi$ (PDF, chữ thường). | $\Phi(z) = P(Z \le z)$; $\varphi(z) = \frac{1}{\sqrt{2\pi}}\exp(-z^2/2)$. |

---

## 12. Bài tập

### Bài 1 — Tính $f(x)$ cho Gaussian

Cho $X \sim N(10, 4^2)$. Tính $f(10)$, $f(14)$, $f(6)$. So sánh và giải thích.

### Bài 2 — Standardization

Cho $X \sim N(50, 8^2)$. Tính $Z$ ứng với $x = 66$. Tỉ lệ phần trăm dân số có $X \le 66$?

### Bài 3 — Áp dụng 68-95-99.7

Mức cholesterol người trưởng thành: $X \sim N(200, 30^2)$ (mg/dL).
(a) Khoảng nào chứa ~68% dân số?
(b) Tỉ lệ người có cholesterol $> 260$?
(c) Bác sĩ cảnh báo "cao nguy hiểm" khi cholesterol $> \mu + 2\sigma$. Ngưỡng cụ thể là bao nhiêu, và bao nhiêu % dân số bị cảnh báo?

### Bài 4 — Tính xác suất với bảng z-score

$X \sim N(170, 7^2)$. Tính $P(160 \le X \le 180)$ dùng bảng (làm tròn z đến 2 chữ số).

### Bài 5 — CLT walk-through

Một máy đóng gói gạo: mỗi gói có khối lượng $X \sim ?$ với $\mu = 5.0$ kg, $\sigma = 0.1$ kg (phân phối lệch nhẹ, không Gaussian). Lấy mẫu 36 gói.
(a) Phân phối của trung bình mẫu $\bar{X}$?
(b) $P(\bar{X} \ge 5.05) \approx ?$
(c) Nếu cần $P(|\bar{X} - 5.0| \le 0.01) \ge 0.95$, phải lấy bao nhiêu gói?

### Bài 6 — Multivariate Gaussian 2D

Cho $(X, Y) \sim N(\mu, \Sigma)$ với $\mu = (1, 2)$, $\Sigma = \begin{bmatrix} 4 & 2 \\ 2 & 1 \end{bmatrix}$.
(a) $|\Sigma| = ?$. Tính được không?
(b) Phân phối marginal của $X$? (Hint: marginal của multivariate Gaussian vẫn Gaussian.)
(c) Mô tả shape iso-density contour (tròn, ellipse, hay degenerate).

---

## 13. Lời giải chi tiết

### Bài 1

$\sigma = 4$, hệ số $\frac{1}{4\sqrt{2\pi}} = \frac{1}{4\cdot 2.5066} \approx 0.09974$.

- $f(10) = 0.09974 \cdot \exp(0) = 0.09974$.
- $f(14) = 0.09974 \cdot \exp\!\left(-\frac{(14-10)^2}{2\cdot 16}\right) = 0.09974 \cdot \exp(-16/32) = 0.09974 \cdot \exp(-0.5) \approx 0.09974 \cdot 0.6065 \approx 0.0605$.
- $f(6) = 0.09974 \cdot \exp\!\left(-\frac{(6-10)^2}{32}\right) = 0.09974 \cdot 0.6065 \approx 0.0605$ (đối xứng với $f(14)$).

**Giải thích**: $f(14) = f(6)$ vì cả hai cách $\mu = 10$ đúng $1\sigma$; PDF đối xứng quanh $\mu$.

### Bài 2

$Z = \frac{66 - 50}{8} = \frac{16}{8} = 2$.
$P(X \le 66) = \Phi(2) \approx 0.9772$ → ~**97.72%** dân số có $X \le 66$.

### Bài 3

$\mu = 200$, $\sigma = 30$.

(a) $[\mu - \sigma, \mu + \sigma] = [170, 230]$ chứa ~68%.

(b) $z = \frac{260 - 200}{30} = 2$. $P(X > 260) = 1 - \Phi(2) \approx 1 - 0.9772 = 0.0228$ → **2.28%**.

(c) Ngưỡng $\mu + 2\sigma = 200 + 60 = 260$ mg/dL. Theo (b), khoảng **2.28%** dân số bị cảnh báo.

### Bài 4

$z_a = \frac{160 - 170}{7} = -\frac{10}{7} \approx -1.43$.
$z_b = \frac{180 - 170}{7} = \frac{10}{7} \approx 1.43$.
$\Phi(1.43) \approx 0.9236$ (tra bảng đầy đủ; trong bảng rút gọn dùng $\Phi(1.44) \approx 0.9251$ hoặc nội suy).
$\Phi(-1.43) = 1 - 0.9236 = 0.0764$.
$P = 0.9236 - 0.0764 = 0.8472 \approx$ **84.72%**.

### Bài 5

$\mu = 5.0$, $\sigma = 0.1$. $n = 36$.

(a) Theo CLT: $\bar{X} \approx N(5.0, \sigma^2/n) = N(5.0, 0.01/36) = N(5.0, (0.1/6)^2)$. Vậy $\bar{X} \approx N(5.0, (0.01667)^2)$. Standard deviation của $\bar{X} = \frac{0.1}{\sqrt{36}} = 0.01667$ kg.

(b) $z = \frac{5.05 - 5.0}{0.01667} = 3$. $P(\bar{X} \ge 5.05) = 1 - \Phi(3) \approx 1 - 0.9987 = 0.0013$ → ~**0.13%**.

(c) Cần $P(|\bar{X} - \mu| \le 0.01) \ge 0.95$. Tương đương $P(|Z| \le 0.01\cdot\sqrt{n}/\sigma) \ge 0.95$. Mà $P(|Z| \le 1.96) = 0.95$. Vậy:

$$\begin{aligned}
\frac{0.01\cdot\sqrt{n}}{0.1} &\ge 1.96 \\
\sqrt{n} &\ge 19.6 \\
n &\ge 19.6^2 = 384.16.
\end{aligned}$$

Vậy phải lấy ít nhất **$n = 385$** gói.

**Tổng quát "luật $\sqrt{n}$"**: muốn sai số $\le \varepsilon$ với confidence 95%, cần $n \ge (1.96\sigma/\varepsilon)^2$.

### Bài 6

$\Sigma = \begin{bmatrix} 4 & 2 \\ 2 & 1 \end{bmatrix}$.

(a) $|\Sigma| = 4\cdot 1 - 2\cdot 2 = 4 - 4 = 0$. **Định thức bằng 0 → ma trận $\Sigma$ suy biến (singular)**, KHÔNG xác định dương → đây **không phải** Gaussian đa biến hợp lệ. Nói cách khác, $X$ và $Y$ correlation $\rho = \frac{2}{\sqrt{4\cdot 1}} = 1$ — tương quan hoàn hảo, $Y = X/2$ deterministic. Phân phối "thu hẹp" về 1 chiều (degenerate Gaussian).

(b) Marginal $X \sim N(1, 4)$. (Quy tắc marginal: lấy thành phần tương ứng của $\mu$ và đường chéo của $\Sigma$.) $X \sim N(1, 2^2)$.

(c) Vì $\Sigma$ singular, "ellipse" degenerate thành **một đường thẳng** trên mặt phẳng $(x, y)$. Mọi xác suất tập trung trên đường thẳng $y - 2 = 0.5\cdot(x - 1)$ (tức $y = 0.5x + 1.5$). Đây là phản ví dụ quan trọng: covariance matrix phải xác định dương (strict) để có Gaussian non-degenerate.

**Lưu ý**: Trong thực hành, nếu gặp $\Sigma$ gần singular (eigenvalue rất nhỏ), thường thêm $\varepsilon I$ (regularization) để tránh nghịch đảo phát nổ.

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

- [`visualization.html`](./visualization.html) — 4 component tương tác: Gaussian shape, z-score calculator, CLT demo, Multivariate 2D contour.
