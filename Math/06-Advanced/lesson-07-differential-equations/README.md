# Lesson 07 — Phương trình vi phân (ODE)

## Mục tiêu

- Hiểu **PT vi phân thường (ODE)**: PT chứa hàm và đạo hàm.
- Giải ODE bậc 1: tách biến, tuyến tính.
- ODE bậc 2 tuyến tính hệ số hằng.
- Mô hình hóa: dao động, tăng trưởng dân số, RC circuit.

## Kiến thức tiền đề

- [T4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. PT vi phân là gì?

💡 **Định nghĩa**: PT chứa hàm chưa biết $y(x)$ và **đạo hàm** của nó: $y'$, $y''$, ...

**Bậc** = bậc đạo hàm cao nhất.

**Ví dụ**:
- $y' = 2x$: bậc 1.
- $y'' + y = 0$: bậc 2.
- $(y')^2 + y = x$: phi tuyến (do bình phương $y'$).

### Vì sao quan trọng?

Tự nhiên thường mô tả qua **tốc độ thay đổi**, không phải giá trị trực tiếp:
- Vận tốc = đạo hàm vị trí: $v = \frac{ds}{dt}$.
- Gia tốc = đạo hàm vận tốc: $F = ma \to a = F/m \to \frac{d^2s}{dt^2} = F/m$.
- Phóng xạ: $\frac{dN}{dt} = -\lambda\cdot N$ (tốc độ phân rã tỉ lệ $N$).
- Nguội: $\frac{dT}{dt} = -k(T - T_{\text{phòng}})$.

⟶ ODE = **ngôn ngữ của khoa học**.

> 📐 **Định nghĩa đầy đủ — Phương trình vi phân thường (ODE)**
>
> **(a) Là gì**: PT trong đó **ẩn số là 1 hàm** $y(x)$ (không phải 1 số), và PT có chứa các đạo hàm của hàm đó. "Giải ODE" = tìm hàm $y(x)$ thoả PT, thường có 1 hằng số tự do (cần điều kiện đầu $y(x_0) = y_0$ để xác định cụ thể).
>
> **(b) Vì sao cần**: Hầu hết quy luật khoa học không phát biểu trực tiếp về **giá trị** mà về **tốc độ thay đổi**. Newton định luật 2: $F = ma = m\cdot\frac{d^2s}{dt^2}$ (PT vi phân bậc 2 cho $s(t)$). Phóng xạ: $\frac{dN}{dt} = -\lambda N$ (tốc độ phân rã tỉ lệ $N$). RC mạch: $V = R\cdot\frac{dq}{dt} + \frac{q}{C}$. Logistic dân số: $\frac{dN}{dt} = rN(1-N/K)$. Cơ học lượng tử: Schrödinger PT là PT vi phân riêng phần. Mô hình hoá COVID, kinh tế, khí hậu — tất cả đều ODE/PDE. Giải ODE = "tích phân" hàm theo thời gian/không gian.
>
> **(c) Ví dụ số**: $y' = 2x \to y = x^2 + C$ (nguyên hàm). $y(0) = 5 \to C = 5 \to y = x^2+5$. $\frac{dN}{dt} = -0.1N \to N(t) = N_0\cdot e^{-0.1t}$. Nếu $N_0 = 1000$, sau 10 đơn vị thời gian: $N(10) = 1000\cdot e^{-1} \approx 368$. Con lắc nhỏ: $\theta'' + (g/L)\cdot\theta = 0 \to \theta(t) = A\cos(\omega t+\varphi)$ với $\omega = \sqrt{g/L}$. $L = 1$m, $g = 9.8 \to \omega \approx 3.13$ rad/s, chu kỳ $T \approx \mathbf{2.01}$s. Lò xo $m=1$kg, $k=100$ N/m: $\omega = 10$ rad/s, $T = 0.628$s.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nghiệm ODE là số hay hàm?"* Là **hàm** $y(x)$, không phải 1 con số. Vd $y' = 2x$ có nghiệm $y = x^2 + C$ (cả họ hàm). Đây là khác biệt cốt lõi với phương trình đại số.
- *"Vì sao có hằng số C?"* Vì "tích phân" mất thông tin hằng số. Cần thêm **điều kiện đầu** (vd $y(0) = 5$) để chốt $C$, ra 1 nghiệm cụ thể.

⚠ **Lỗi thường gặp — quên hằng số C khi giải**. Mỗi lần tích phân sinh 1 hằng số. ODE bậc 1 → 1 hằng số; bậc 2 → 2 hằng số. Phản ví dụ: $y' = 2x \to$ viết $y = x^2$ (thiếu $C$) là sai; phải $y = x^2 + C$, rồi dùng điều kiện đầu tìm $C$.

🔁 **Dừng lại tự kiểm tra**

1. $y = 3e^{2x}$ có là nghiệm của $y' = 2y$ không?
2. Bậc của $y''' + y' = x$ là mấy?

<details><summary>Đáp án</summary>

1. $y' = 6e^{2x} = 2\cdot(3e^{2x}) = 2y$ ✓ → **có**.
2. **Bậc 3** (đạo hàm cao nhất là $y'''$).

</details>

### 📝 Tóm tắt mục 1

- ODE: phương trình chứa hàm chưa biết $y(x)$ và đạo hàm của nó; nghiệm là **hàm**.
- Bậc = bậc đạo hàm cao nhất; giải = tìm họ hàm + dùng điều kiện đầu chốt hằng số.
- ODE là "ngôn ngữ" mô tả quy luật qua tốc độ thay đổi.

---

## 2. ODE bậc 1 — Tách biến (Separable)

💡 **Trực giác / Hình dung**: nếu vế phải "tách" được thành phần chỉ-x nhân phần chỉ-y, ta dồn mọi thứ y về 1 vế, mọi thứ x về vế kia, rồi tích phân từng vế độc lập. Như phân loại đồ vào 2 ngăn rồi xử lý riêng.

Dạng:

$$\frac{dy}{dx} = f(x)\cdot g(y)$$

**Cách giải**: tách 2 vế:

$$\frac{dy}{g(y)} = f(x)\,dx$$

Tích phân 2 vế.

**Ví dụ 1**: $\frac{dy}{dx} = -2x\cdot y$.
- $\frac{dy}{y} = -2x\,dx$.
- $\int \frac{dy}{y} = -\int 2x\,dx \to \ln|y| = -x^2 + C$.
- → $\mathbf{y = A\cdot e^{-x^2}}$ ($A = e^C$).

**Ví dụ 2 — Tăng trưởng dân số**: $\frac{dN}{dt} = k\cdot N$.
- $\frac{dN}{N} = k\,dt \to \ln|N| = kt + C \to \mathbf{N(t) = N_0\cdot e^{kt}}$.

→ Tăng trưởng cấp số nhân. Nếu $k > 0$ (sinh nhiều hơn chết) thì bùng nổ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi ODE bậc 1 đều tách biến được?"* Không. Chỉ khi vế phải $= f(x)\cdot g(y)$. Vd $\frac{dy}{dx} = x + y$ KHÔNG tách được (phải dùng phương pháp tuyến tính, mục 3).
- *"Vì sao $\frac{dN}{dt} = kN$ ra hàm mũ?"* Vì "tốc độ tỉ lệ với lượng hiện có" = đặc trưng của hàm mũ (càng nhiều càng tăng nhanh). Đây là mô hình lãi kép, dân số, phóng xạ ($k < 0$).

⚠ **Lỗi thường gặp — quên $|y|$ và hằng số khi tích phân $1/y$**. $\int \frac{dy}{y} = \ln|y| + C$ (có trị tuyệt đối). Quên $C$ → mất họ nghiệm; quên $|\cdot|$ → sai miền. Sau khi mũ hóa: $y = \pm e^C\cdot e^{...} = A\cdot e^{...}$, $A$ gói cả dấu.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\frac{dy}{dx} = 3y$ với $y(0) = 2$.

<details><summary>Đáp án</summary>

$\frac{dy}{y} = 3\,dx \to \ln|y| = 3x + C \to y = A\cdot e^{3x}$. $y(0) = A = 2 \to \mathbf{y = 2e^{3x}}$.

</details>

### 📝 Tóm tắt mục 2

- Tách biến: dồn $y$ về 1 vế, $x$ về vế kia, tích phân từng vế.
- Áp dụng khi $\frac{dy}{dx} = f(x)\cdot g(y)$; $\frac{dN}{dt} = kN \to N_0\cdot e^{kt}$ (tăng trưởng/phân rã mũ).
- Nhớ $|y|$ và hằng số $C$ khi tích phân.

---

## 3. ODE bậc 1 tuyến tính

💡 **Trực giác / Hình dung**: khi không tách biến được, ta nhân cả phương trình với 1 "thừa số phép thuật" $\mu(x)$ khiến vế trái gập lại thành đạo hàm của 1 tích $(\mu\cdot y)'$. Rồi chỉ việc tích phân ngược. $\mu$ được thiết kế đúng để $(\mu y)' = \mu y' + \mu'y$ khớp với vế trái.

Dạng:

$$y' + P(x)\cdot y = Q(x)$$

**Phương pháp thừa số tích phân**: nhân 2 vế với $\mu(x) = e^{\int P(x)\,dx}$:

$$\begin{aligned}
(\mu\cdot y)' &= \mu\cdot Q \\
\mu\cdot y &= \int \mu\cdot Q\,dx \\
y &= \frac{1}{\mu} \int \mu\cdot Q\,dx
\end{aligned}$$

**Ví dụ**: $y' + 2y = 4$.
- $P = 2$, $Q = 4$. $\mu = e^{2x}$.
- $e^{2x}\cdot y = \int 4\cdot e^{2x}\,dx = 2\cdot e^{2x} + C$.
- → $\mathbf{y = 2 + C\cdot e^{-2x}}$.

Khi $t \to \infty$: $y \to 2$ (cân bằng).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\mu = e^{\int P\,dx}$?"* Để $\mu' = P\cdot\mu$, khi đó $\mu y' + P\mu y = \mu y' + \mu'y = (\mu y)'$ — gập lại thành đạo hàm tích. Đó là yêu cầu thiết kế $\mu$.
- *"Nghiệm gồm 2 phần: 2 và $C\cdot e^{-2x}$, nghĩa là gì?"* "2" là nghiệm riêng (trạng thái cân bằng lâu dài); $C\cdot e^{-2x}$ là phần phụ tắt dần về 0. Cấu trúc "cân bằng + transient" rất phổ biến trong vật lý/kỹ thuật.

⚠ **Lỗi thường gặp — quên nhân $Q$ với $\mu$ ở vế phải**. Sau khi nhân $\mu$, vế phải phải là $\mu\cdot Q$ (cả hai vế nhân $\mu$). Phản ví dụ: $y'+2y=4$, $\mu=e^{2x}$. Vế phải đúng $\int 4e^{2x}\,dx$; nếu quên $\mu$, tích $\int 4\,dx = 4x$ → nghiệm sai.

🔁 **Dừng lại tự kiểm tra**

1. Tìm thừa số tích phân $\mu$ cho $y' + 3y = x$.

<details><summary>Đáp án</summary>

$P = 3 \to \mu = e^{\int 3\,dx} = \mathbf{e^{3x}}$.

</details>

### 📝 Tóm tắt mục 3

- Dạng $y' + P(x)y = Q(x)$; nhân $\mu = e^{\int P\,dx}$ → vế trái $= (\mu y)'$.
- Giải: $\mu y = \int \mu Q\,dx \to y = \frac{1}{\mu}\int \mu Q\,dx$ (nhớ nhân $Q$ với $\mu$).
- Nghiệm thường = cân bằng + phần transient tắt dần.

---

## 4. ODE bậc 2 tuyến tính hệ số hằng

💡 **Trực giác / Hình dung**: đoán nghiệm dạng $y = e^{rx}$ (vì đạo hàm của mũ lại ra mũ). Thay vào, phương trình rút gọn thành PT bậc 2 cho $r$ (PT đặc trưng). $\Delta$ quyết định "tính cách" nghiệm: 2 nghiệm thực → tắt dần không dao động; nghiệm phức → **dao động** (sin/cos); nghiệm kép → trường hợp tới hạn. Đây là toán học của lò xo, mạch điện, con lắc.

$$y'' + a\cdot y' + b\cdot y = 0$$

(Thuần nhất — vế phải $= 0$.)

**Phương pháp**: tìm nghiệm dạng $y = e^{rx}$. Thay vào → **PT đặc trưng**:

$$r^2 + a\cdot r + b = 0$$

3 trường hợp theo $\Delta = a^2 - 4b$:

### TH1: $\Delta > 0$ — 2 nghiệm thực $r_1, r_2$

$$y = C_1\cdot e^{r_1 x} + C_2\cdot e^{r_2 x}$$

### TH2: $\Delta = 0$ — nghiệm kép $r$

$$y = (C_1 + C_2\cdot x)\cdot e^{rx}$$

### TH3: $\Delta < 0$ — 2 nghiệm phức $\alpha \pm \beta i$

$$y = e^{\alpha x}\cdot(C_1\cos(\beta x) + C_2\sin(\beta x))$$

→ **Dao động**.

**Walk-through 3 trường hợp** (mỗi TH 1 ví dụ):
- $\Delta > 0$: $y'' - 3y' + 2y = 0 \to r^2 - 3r + 2 = 0 \to r = 1, 2 \to y = C_1 e^x + C_2 e^{2x}$.
- $\Delta = 0$: $y'' - 4y' + 4y = 0 \to r^2 - 4r + 4 = 0 \to r = 2$ (kép) $\to y = (C_1 + C_2 x)e^{2x}$.
- $\Delta < 0$: $y'' + 4y = 0 \to r^2 + 4 = 0 \to r = \pm 2i \to y = C_1\cos(2x) + C_2\sin(2x)$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nghiệm phức lại cho dao động (cos, sin)?"* Vì $e^{i\beta x} = \cos\beta x + i\sin\beta x$ (Euler, Lesson 06). Nghiệm mũ phức "biến" thành dao động thực. Phần thực $\alpha$ của nghiệm cho biên độ tăng/tắt ($e^{\alpha x}$).
- *"Vì sao bậc 2 cần 2 hằng số $C_1, C_2$?"* Vì cần 2 điều kiện đầu (vd $y(0)$ và $y'(0)$) — như ném vật cần biết vị trí và vận tốc ban đầu.

⚠ **Lỗi thường gặp — dùng nhầm công thức nghiệm khi $\Delta = 0$**. Nghiệm kép KHÔNG phải $y = C_1 e^{rx} + C_2 e^{rx}$ (gộp thành 1 hằng số, mất nghiệm). Phải có **nhân $x$**: $y = (C_1 + C_2\cdot x)e^{rx}$. Phản ví dụ: $y''-4y'+4y=0$, nếu viết $y = Ce^{2x}$ thì chỉ 1 hằng số, không đủ cho bài toán 2 điều kiện đầu.

🔁 **Dừng lại tự kiểm tra**

1. Giải $y'' - 5y' + 6y = 0$.

<details><summary>Đáp án</summary>

$r^2 - 5r + 6 = 0 \to r = 2, 3$ ($\Delta = 1 > 0$) $\to y = \mathbf{C_1 e^{2x} + C_2 e^{3x}}$.

</details>

### 📝 Tóm tắt mục 4

- Đoán $y = e^{rx}$ → PT đặc trưng $r^2 + ar + b = 0$.
- $\Delta > 0$: $C_1 e^{r_1 x}+C_2 e^{r_2 x}$; $\Delta = 0$: $(C_1+C_2 x)e^{rx}$ (nhớ nhân $x$); $\Delta < 0$: $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$ → dao động.
- Bậc 2 → 2 hằng số → cần 2 điều kiện đầu.

---

## 5. Ví dụ — Con lắc đơn (linearized)

💡 **Trực giác / Hình dung**: con lắc nhỏ là TH3 ($\Delta < 0$) điển hình — không có ma sát nên $\alpha = 0$ (biên độ không tắt), nghiệm thuần dao động cos/sin với tần số $\omega = \sqrt{g/L}$. Đây là vì sao đồng hồ quả lắc giữ nhịp đều.

$$m\cdot\theta'' + \frac{mg}{L}\cdot\theta = 0 \quad\to\quad \theta'' + \frac{g}{L}\cdot\theta = 0$$

PT đặc trưng: $r^2 + g/L = 0 \to r = \pm i\cdot\sqrt{g/L} = \pm i\omega$.

Nghiệm: $\mathbf{\theta(t) = C_1\cos(\omega t) + C_2\sin(\omega t)} = A\cos(\omega t + \varphi)$.

→ Dao động điều hòa, chu kỳ $T = \frac{2\pi}{\omega} = 2\pi\sqrt{L/g}$.

(Đã gặp ở [T3 L08](../../03-Trig-Complex/lesson-08-trig-applications/) — dao động điều hòa.)

---

## 6. Ví dụ — Mạch RC

💡 **Trực giác / Hình dung**: tụ điện nạp như đổ nước vào bình qua ống hẹp — lúc đầu nhanh (chênh lệch lớn), càng đầy càng chậm, tiệm cận giá trị tối đa $C\cdot V$. "Thời hằng" $\tau = RC$ đo tốc độ nạp: sau $\tau$ giây nạp được $\sim 63\%$, sau $5\tau$ coi như đầy.

PT: $R\cdot\frac{dq}{dt} + \frac{q}{C} = V$ (nguồn không đổi).

- Đây là tuyến tính bậc 1. Giải: $q(t) = C\cdot V\cdot(1 - e^{-t/(RC)})$.
- → Tụ nạp đến giá trị $C\cdot V$ theo hàm mũ. Thời hằng $\tau = RC$.

**Verify bằng số** ($R = 1$kΩ, $C = 1$mF $\to \tau = RC = 1$s, $V = 5$V, $q_{\max} = CV = 5$mC):
- $t = 0$: $q = 5\cdot(1 - e^0) = 5\cdot 0 = 0$ (tụ rỗng ban đầu) ✓.
- $t = \tau = 1$s: $q = 5\cdot(1 - e^{-1}) = 5\cdot 0.632 = \mathbf{3.16}$ mC ($\sim 63\%$).
- $t \to \infty$: $q \to 5\cdot(1 - 0) = 5$ mC (nạp đầy) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tụ không nạp đầy ngay lập tức?"* Vì điện trở $R$ cản dòng. $R$ lớn → ống hẹp → nạp chậm ($\tau = RC$ lớn).
- *"$\tau = RC$ có ý nghĩa thực tế gì?"* Là "đồng hồ" của mạch: thiết kế bộ định thời, lọc tín hiệu đều dựa $\tau$. Sau $5\tau$ tụ coi như đầy ($>99\%$).

⚠ **Lỗi thường gặp — nhầm dấu trong hàm mũ nạp/xả**. Nạp: $q = CV(1 - e^{-t/\tau})$ (tăng từ 0). Xả: $q = q_0\cdot e^{-t/\tau}$ (giảm về 0). Lẫn 2 công thức → mô tả sai chiều biến thiên.

🔁 **Dừng lại tự kiểm tra**

1. Mạch RC có $\tau = 2$s, $V = 10$V, $C = 1$mF. Tính $q$ tại $t = 2$s.

<details><summary>Đáp án</summary>

$q_{\max} = CV = 10$ mC. $q(2) = 10\cdot(1 - e^{-2/2}) = 10\cdot(1 - e^{-1}) = 10\cdot 0.632 = \mathbf{6.32}$ mC.

</details>

### 📝 Tóm tắt mục 6

- Mạch RC = ODE bậc 1 tuyến tính: $q(t) = CV(1 - e^{-t/\tau})$, nạp đầy dần.
- Thời hằng $\tau = RC$: sau $\tau$ nạp $\sim 63\%$, sau $5\tau$ coi như đầy.
- Nạp: $(1 - e^{-t/\tau})$ tăng; xả: $e^{-t/\tau}$ giảm — đừng nhầm dấu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Giải $y' = 3x^2$.

**Bài 2**: Giải $y' = -y$ với $y(0) = 5$.

**Bài 3**: Giải $y'' + 4y = 0$.

**Bài 4**: PT phân rã phóng xạ $\frac{dN}{dt} = -\lambda N$ với chu kỳ bán rã $T_{1/2} = 5730$ năm (C-14). Tìm $\lambda$.

**Bài 5**: Giải $y' + y = e^x$ với $y(0) = 1$.

### Lời giải

**Bài 1**: $y = \int 3x^2\,dx = \mathbf{x^3 + C}$.

**Bài 2**: $\frac{dy}{y} = -dx \to \ln y = -x + C \to y = A\cdot e^{-x}$. $y(0) = A = 5$. → $\mathbf{y = 5\cdot e^{-x}}$.

**Bài 3**: $r^2 + 4 = 0 \to r = \pm 2i$. → $\mathbf{y = C_1\cos(2x) + C_2\sin(2x)}$.

**Bài 4**: $N(t) = N_0\cdot e^{-\lambda t}$. $N(T_{1/2}) = N_0/2 \to e^{-\lambda T} = 1/2 \to \lambda T = \ln 2 \to \mathbf{\lambda = \dfrac{\ln 2}{5730} \approx 1.21\cdot 10^{-4}}$ /năm.

**Bài 5**: $\mu = e^x$. $e^x\cdot y = \int e^x\cdot e^x\,dx = \frac{e^{2x}}{2} + C \to y = \frac{e^x}{2} + C\cdot e^{-x}$. $y(0) = \frac{1}{2} + C = 1 \to C = \frac{1}{2}$. → $\mathbf{y = \dfrac{e^x + e^{-x}}{2} = \cosh x}$.

---

## 8. Bài tiếp theo

[Lesson 08 — Xác suất & thống kê](../lesson-08-probability-statistics/).

## 📝 Tổng kết

1. **ODE**: PT chứa hàm + đạo hàm. Bậc = bậc cao nhất của đạo hàm.
2. **Bậc 1 tách biến**: $\frac{dy}{g(y)} = f(x)\,dx$.
3. **Bậc 1 tuyến tính**: dùng thừa số tích phân $\mu = e^{\int P}$.
4. **Bậc 2 tuyến tính**: PT đặc trưng $r^2 + ar + b = 0$. 3 dạng nghiệm theo $\Delta$.
5. **Ứng dụng**: dao động, phóng xạ, RC, dân số.
