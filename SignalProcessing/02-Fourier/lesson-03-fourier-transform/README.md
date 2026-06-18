# Lesson 08 — Biến đổi Fourier (Fourier Transform)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** tín hiệu không tuần hoàn (xung một lần, tiếng vỗ tay) cần một **phổ liên tục** thay vì các vạch rời rạc của chuỗi Fourier.
- Suy ra biến đổi Fourier (Fourier Transform — FT) từ chuỗi Fourier bằng giới hạn $T \to \infty$ (tổng → tích phân).
- Thuộc định nghĩa cặp thuận/nghịch và 4 cặp biến đổi cốt lõi: xung vuông ↔ sinc, Gaussian ↔ Gaussian, delta ↔ hằng, cos ↔ 2 delta.
- Áp dụng các tính chất: tuyến tính, dịch thời gian ↔ đổi pha, scale (hẹp thời gian ↔ rộng tần số), đối ngẫu.
- Hiểu và chứng minh **định lý tích chập** ($x*h \leftrightarrow X\cdot H$) — đóng câu hỏi treo từ [Tier1 L04](../../01-Foundations/lesson-04-convolution/).
- Hiểu **định lý Parseval** (bảo toàn năng lượng) — đóng câu hỏi treo từ [Tier1 L05](../../01-Foundations/lesson-05-correlation-energy/).
- Đọc được **phổ biên độ** $|X(f)|$ và **phổ pha** $\angle X(f)$.

## Kiến thức tiền đề

- [L06 — Chuỗi Fourier](../lesson-01-fourier-series/) — bắt buộc; FT là giới hạn của chuỗi Fourier.
- [L07 — Epicycle & Euler](../lesson-02-epicycles-euler/) — bắt buộc; cần $e^{i\theta} = \cos\theta + i\sin\theta$ và vector quay.
- [Tier1 L04 — Tích chập](../../01-Foundations/lesson-04-convolution/) — để hiểu mục §5 đóng câu hỏi gì.
- [Tier1 L05 — Tương quan & Năng lượng](../../01-Foundations/lesson-05-correlation-energy/) — để hiểu mục §6 đóng câu hỏi gì.

---

## 1. Vì sao cần biến đổi Fourier?

> **Câu hỏi mở bài:** Một **tiếng vỗ tay** vang lên đúng **một lần** rồi tắt — nó không lặp lại bao giờ. Chuỗi Fourier chỉ phân tích được tín hiệu **tuần hoàn** thành các vạch tần số rời rạc $f_0, 2f_0, 3f_0,\ldots$. Vậy "phổ tần số" của một tiếng vỗ tay **không tuần hoàn** là gì?

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng chuỗi Fourier như một cái **lược tần số**: các răng lược đặt cách nhau đúng $f_0 = 1/T$ Hz. Tín hiệu tuần hoàn chu kỳ $T$ chỉ "sống" ở các răng lược này. Bây giờ kéo dài chu kỳ: $T = 1$ s → răng cách 1 Hz; $T = 10$ s → răng cách 0.1 Hz; $T = 1000$ s → răng cách 0.001 Hz. Khi $T \to \infty$ (tín hiệu **không bao giờ** lặp lại), các răng lược **sít vào nhau** thành một **đường liền** — phổ rời rạc trở thành **phổ liên tục** $X(f)$. Đó chính là biến đổi Fourier.

### 1.1. Suy ra FT từ chuỗi Fourier (cho $T \to \infty$)

Nhắc lại từ [L06](../lesson-01-fourier-series/): một tín hiệu tuần hoàn chu kỳ $T$ viết được dưới dạng chuỗi Fourier phức:

$$x(t) = \sum_{n=-\infty}^{\infty} c_n\, e^{i 2\pi n f_0 t}, \qquad c_n = \frac{1}{T}\int_{-T/2}^{T/2} x(t)\, e^{-i 2\pi n f_0 t}\, dt$$

với $f_0 = 1/T$ là tần số cơ bản. Mỗi hệ số $c_n$ ứng với tần số rời rạc $f_n = n f_0$.

Đặt **mật độ phổ** $X(f_n) = T\, c_n = \int_{-T/2}^{T/2} x(t)\, e^{-i2\pi f_n t}\, dt$. Khi đó:

$$x(t) = \sum_{n=-\infty}^{\infty} \frac{X(f_n)}{T}\, e^{i2\pi f_n t} = \sum_{n=-\infty}^{\infty} X(f_n)\, e^{i2\pi f_n t}\, \underbrace{f_0}_{\Delta f}$$

vì $1/T = f_0 = \Delta f$ chính là **khoảng cách giữa hai răng lược**. Cho $T \to \infty$:

- $\Delta f = f_0 \to 0$ (răng lược sít lại),
- tổng Riemann $\sum (\cdots)\,\Delta f$ → tích phân $\int (\cdots)\, df$,
- $f_n$ rời rạc → biến liên tục $f$.

$$\boxed{\; X(f) = \int_{-\infty}^{\infty} x(t)\, e^{-i2\pi f t}\, dt \qquad\Longleftrightarrow\qquad x(t) = \int_{-\infty}^{\infty} X(f)\, e^{i2\pi f t}\, df \;}$$

Tổng đếm vạch ($\sum_n$) đã biến thành **tích phân quét liên tục** ($\int df$). Đó là toàn bộ ý tưởng.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao tín hiệu **không tuần hoàn** lại cần phổ **liên tục**, còn tuần hoàn thì rời rạc?
> <details><summary>Đáp án</summary>
> Tuần hoàn chu kỳ $T$ ⇒ chỉ chứa các tần số là bội của $f_0 = 1/T$ (răng lược cách $f_0$). Không tuần hoàn = "chu kỳ vô hạn" ⇒ $f_0 = 1/T \to 0$ ⇒ răng lược sít lại thành liên tục. Một xung đơn chứa **mọi** tần số một chút, nên phổ là một hàm liên tục, không phải vài vạch.
> </details>

> 📝 **Tóm tắt §1.** (1) Chuỗi Fourier = phổ rời rạc cho tín hiệu tuần hoàn. (2) Cho $T\to\infty$, vạch sít lại → tích phân. (3) FT cho **phổ liên tục** $X(f)$ của tín hiệu không tuần hoàn (xung, tiếng vỗ tay). (4) Tiếng vỗ tay không có "vài tần số" mà có **cả một dải tần số liền** — đó là $|X(f)|$.

---

## 2. Định nghĩa biến đổi Fourier

### 2.1. Cặp thuận / nghịch

$$X(f) = \int_{-\infty}^{\infty} x(t)\, e^{-i2\pi f t}\, dt \qquad\text{(thuận — phân tích)}$$

$$x(t) = \int_{-\infty}^{\infty} X(f)\, e^{i2\pi f t}\, df \qquad\text{(nghịch — tổng hợp)}$$

Ta viết tắt cặp này là $x(t) \leftrightarrow X(f)$, hoặc $X = \mathcal{F}\{x\}$, $x = \mathcal{F}^{-1}\{X\}$.

> 💡 **Trực giác từng phần.** Hãy đọc tích phân thuận như một **phép thử cộng hưởng**: với mỗi tần số $f$, ta lấy tín hiệu $x(t)$ nhân với "cây thước quay ngược" $e^{-i2\pi f t}$ rồi cộng dồn (tích phân). Nếu $x(t)$ **có** thành phần dao động ở tần số $f$, hai cái sẽ "khóa pha" và tích phân ra lớn; nếu không, các vòng quay triệt tiêu nhau và tích phân ≈ 0. $X(f)$ đo "lượng tần số $f$" có trong tín hiệu.

**Định nghĩa 3 phần của $X(f)$ — biến đổi Fourier:**

- **(a) Là gì.** $X(f)$ là một hàm **phức** của biến tần số $f$ (Hz). Module $|X(f)|$ = **biên độ** (độ mạnh) của tần số $f$ trong tín hiệu; argument $\angle X(f)$ = **pha** (lệch pha) của tần số đó. Đơn vị của $X(f)$ là "[đơn vị của $x$] × giây" — nên nó là **mật độ** phổ, không phải biên độ thuần.
- **(b) Vì sao cần.** Miền thời gian $x(t)$ trả lời "tại thời điểm $t$, giá trị bao nhiêu?"; nhưng nhiều câu hỏi (lọc nhiễu, nén MP3, dò nốt nhạc) tự nhiên hơn ở **miền tần số**: "tín hiệu này có những tần số nào, mạnh yếu ra sao?". Chuỗi Fourier chỉ làm được điều này cho tín hiệu tuần hoàn; FT mở rộng cho **mọi** tín hiệu khả tích.
- **(c) Ví dụ trực giác bằng số.** Lấy $x(t) = \cos(2\pi\cdot 5 t)$ (sóng cos 5 Hz). FT của nó là **hai vạch** (delta) ở $f = +5$ và $f = -5$ Hz, mỗi vạch khối lượng $\tfrac12$ (§3.4). Nghĩa là: "tín hiệu này thuần một tần số 5 Hz" — $|X(f)|$ bằng 0 ở mọi nơi trừ $\pm5$ Hz. Đúng trực giác.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao có tần số âm $f = -5$ Hz?"* — Vì ta dùng cơ sở phức $e^{i2\pi f t}$ (vector quay, [L07](../lesson-02-epicycles-euler/)). $\cos\theta = \tfrac12(e^{i\theta} + e^{-i\theta})$ = vector quay thuận + vector quay ngược. Tần số âm = quay ngược chiều. Với tín hiệu thực, phổ đối xứng: $X(-f) = \overline{X(f)}$, nên tần số âm không thêm thông tin, chỉ là cách kế toán gọn của toán phức.
> - *"$X(f)$ phức thì vẽ thế nào?"* — Vẽ riêng phổ biên độ $|X(f)|$ và phổ pha $\angle X(f)$ (§7).
> - *"Có quy ước nào khác không?"* — Có. Một số sách dùng tần số góc $\omega = 2\pi f$ và thêm hệ số $\tfrac{1}{2\pi}$. Ở đây ta dùng quy ước **$f$ (Hz)** vì cặp thuận/nghịch đối xứng đẹp (không có hằng số thừa).

> 📝 **Tóm tắt §2.** $X(f)=\int x\, e^{-i2\pi ft}dt$ (phân tích), $x(t)=\int X\, e^{i2\pi ft}df$ (tổng hợp). $X(f)$ phức: $|X|$ = mạnh yếu, $\angle X$ = pha. Tần số âm là hệ quả của cơ sở phức, với tín hiệu thực thì phổ đối xứng liên hợp.

---

## 3. Bốn cặp biến đổi cốt lõi

Bốn cặp này xuất hiện khắp nơi — thuộc lòng chúng tiết kiệm rất nhiều công.

### 3.1. Xung vuông ↔ sinc (walk-through đầy đủ)

Cho xung vuông rộng $T$, cao 1, đối xứng quanh 0:

$$x(t) = \mathrm{rect}_T(t) = \begin{cases} 1 & |t| \le T/2 \\ 0 & |t| > T/2 \end{cases}$$

Tính FT trực tiếp:

$$\begin{aligned}
X(f) &= \int_{-\infty}^{\infty} \mathrm{rect}_T(t)\, e^{-i2\pi f t}\, dt = \int_{-T/2}^{T/2} e^{-i2\pi f t}\, dt \\
&= \left[\frac{e^{-i2\pi f t}}{-i2\pi f}\right]_{-T/2}^{T/2} = \frac{e^{-i\pi f T} - e^{i\pi f T}}{-i2\pi f} \\
&= \frac{e^{i\pi f T} - e^{-i\pi f T}}{i2\pi f} = \frac{2i\sin(\pi f T)}{i2\pi f} = \frac{\sin(\pi f T)}{\pi f}
\end{aligned}$$

Dùng định nghĩa $\operatorname{sinc}(u) = \dfrac{\sin(\pi u)}{\pi u}$:

$$\boxed{\;\mathrm{rect}_T(t) \;\leftrightarrow\; T\,\operatorname{sinc}(fT)\;}$$

**Kiểm tra giá trị thật ($T = 1$):**

| $f$ | $\sin(\pi f)$ | $X(f) = \sin(\pi f)/(\pi f)$ |
|---|---|---|
| $0$ | $0$ | $1$ (giới hạn: $\sin u/u \to 1$) |
| $0.5$ | $\sin(\pi/2)=1$ | $1/(0.5\pi) \approx 0.637$ |
| $1$ | $\sin\pi = 0$ | $0$ (zero đầu tiên!) |
| $1.5$ | $\sin(1.5\pi) = -1$ | $-1/(1.5\pi) \approx -0.212$ |
| $2$ | $\sin 2\pi = 0$ | $0$ |

Các zero của sinc nằm ở $f = 1, 2, 3,\ldots$ Hz (= $1/T, 2/T,\ldots$). **Xung càng hẹp ($T$ nhỏ) thì zero đầu tiên $1/T$ càng xa** → phổ càng rộng. Đây là hạt giống của nguyên lý bất định (§4.3).

### 3.2. Gaussian ↔ Gaussian (walk-through)

Cho $x(t) = e^{-\pi t^2}$ (Gaussian chuẩn hóa). Một kết quả đẹp:

$$\boxed{\; e^{-\pi t^2} \;\leftrightarrow\; e^{-\pi f^2} \;}$$

**Phác chứng minh (đủ bước):** Đặt $X(f) = \int_{-\infty}^{\infty} e^{-\pi t^2} e^{-i2\pi f t}\, dt$. Gộp số mũ rồi hoàn thành bình phương:

$$-\pi t^2 - i2\pi f t = -\pi\left(t^2 + i2 f t\right) = -\pi\left[(t + i f)^2 + f^2\right] = -\pi(t+if)^2 - \pi f^2.$$

Vậy $X(f) = e^{-\pi f^2}\displaystyle\int_{-\infty}^{\infty} e^{-\pi(t+if)^2}\, dt$. Tích phân còn lại (đổi biến $u = t + if$, dùng tích phân Gauss $\int e^{-\pi u^2}du = 1$) bằng $1$. Do đó $X(f) = e^{-\pi f^2}$. **Gaussian là hàm riêng của FT** — biến đổi xong vẫn là chính nó.

Tổng quát hơn, Gaussian "rộng" trong thời gian → Gaussian "hẹp" trong tần số: nếu $x(t) = e^{-t^2/(2\sigma^2)}$ thì $X(f) \propto e^{-2\pi^2\sigma^2 f^2}$, độ rộng tần số $\propto 1/\sigma$. Lại là uncertainty.

### 3.3. Delta ↔ hằng (và ngược lại)

$$\delta(t) \;\leftrightarrow\; 1 \qquad\text{và}\qquad 1 \;\leftrightarrow\; \delta(f)$$

**Chứng minh chiều thứ nhất** (dùng tính chất sàng của delta: $\int \delta(t) g(t)\, dt = g(0)$):

$$X(f) = \int_{-\infty}^{\infty} \delta(t)\, e^{-i2\pi f t}\, dt = e^{-i2\pi f\cdot 0} = 1 \quad\text{với mọi } f.$$

**Diễn giải:** một xung **cực hẹp** (delta) chứa **mọi** tần số với biên độ bằng nhau → phổ phẳng = 1. Ngược lại, một tín hiệu **DC** (hằng số, "tần số 0") chỉ có thành phần ở $f = 0$ → phổ là một delta tại gốc. Đây là biểu hiện cực đoan nhất của uncertainty: hẹp nhất ↔ rộng nhất.

### 3.4. Cos ↔ 2 delta (và sin)

$$\cos(2\pi f_0 t) \;\leftrightarrow\; \tfrac12\big[\delta(f - f_0) + \delta(f + f_0)\big]$$

**Suy ra từ Euler** ([L07](../lesson-02-epicycles-euler/)): $\cos(2\pi f_0 t) = \tfrac12 e^{i2\pi f_0 t} + \tfrac12 e^{-i2\pi f_0 t}$. Mỗi $e^{i2\pi f_0 t}$ là một "tần số thuần" → FT là delta tại đúng $f_0$ (vì $e^{i2\pi f_0 t} \leftrightarrow \delta(f - f_0)$). Tuyến tính (§4.1) cho ra hai delta tại $\pm f_0$ với khối lượng $\tfrac12$. Tương tự:

$$\sin(2\pi f_0 t) \;\leftrightarrow\; \tfrac{1}{2i}\big[\delta(f - f_0) - \delta(f + f_0)\big].$$

Khác biệt cos vs sin nằm ở **pha**: cos cho hai delta cùng pha (thực), sin cho delta lệch pha $90°$ (ảo). Phổ **biên độ** giống nhau, phổ **pha** khác.

> **Bảng tổng hợp 4 cặp:**
>
> | $x(t)$ | $X(f)$ | Hẹp thời gian → | Rộng tần số? |
> |---|---|---|---|
> | $\mathrm{rect}_T$ (xung vuông) | $T\operatorname{sinc}(fT)$ | $T$ nhỏ | ✓ zero đầu xa $1/T$ |
> | $e^{-\pi t^2}$ (Gaussian) | $e^{-\pi f^2}$ | $\sigma$ nhỏ | ✓ độ rộng $\propto 1/\sigma$ |
> | $\delta(t)$ | $1$ | hẹp nhất | ✓ phẳng vô hạn |
> | $\cos 2\pi f_0 t$ | $\tfrac12[\delta(f{-}f_0){+}\delta(f{+}f_0)]$ | trải vô hạn theo $t$ | hẹp nhất (2 vạch) |

> ⚠ **Time–frequency uncertainty (lỗi/hiểu lầm thường gặp).** Không có tín hiệu nào **vừa** hẹp trong thời gian **vừa** hẹp trong tần số. Cứ ép $x(t)$ ngắn lại (xung sắc) thì $X(f)$ phình rộng ra, và ngược lại. Cực đoan: delta (cực hẹp thời gian) ↔ hằng (cực rộng tần số). Đây **không phải** hạn chế đo đạc mà là tính chất toán học của FT. Hệ quả thực tế: muốn định vị **thời điểm** chính xác (gõ trống) thì phải hy sinh độ phân giải **tần số**, và ngược lại (đây là lý do tồn tại của short-time FT / wavelet).

> 🔁 **Dừng lại tự kiểm tra.** Xung vuông rộng $T = 0.5$ s. Zero đầu tiên của $|X(f)|$ ở tần số nào?
> <details><summary>Đáp án</summary>
> Zero đầu tiên ở $f = 1/T = 1/0.5 = 2$ Hz. Xung hẹp hơn (T=0.5 < 1) ⇒ zero xa hơn ⇒ phổ rộng hơn. Đúng uncertainty.
> </details>

> 📝 **Tóm tắt §3.** rect↔sinc, Gauss↔Gauss, delta↔hằng, cos↔2delta. Mọi cặp đều minh họa: **hẹp một miền ⇒ rộng miền kia**. Gaussian là hàm riêng (biến đổi không đổi dạng).

---

## 4. Các tính chất của biến đổi Fourier

Giả sử $x(t) \leftrightarrow X(f)$ và $h(t) \leftrightarrow H(f)$.

### 4.1. Tuyến tính

$$a\,x(t) + b\,h(t) \;\leftrightarrow\; a\,X(f) + b\,H(f).$$

Hiển nhiên từ tính tuyến tính của tích phân. **Ví dụ:** tín hiệu $3\cos(2\pi\cdot 5t) + 2\cos(2\pi\cdot 12t)$ có phổ = $\tfrac32$ cặp delta ở $\pm5$ + $1$ cặp delta ở $\pm12$. Đọc phổ là đọc trực tiếp "có 5 Hz mạnh hơn 12 Hz".

### 4.2. Dịch thời gian ↔ đổi pha

$$x(t - t_0) \;\leftrightarrow\; X(f)\, e^{-i2\pi f t_0}.$$

**Chứng minh:** đổi biến $u = t - t_0$ trong tích phân thuận, $e^{-i2\pi f t} = e^{-i2\pi f u}e^{-i2\pi f t_0}$, rút hằng số $e^{-i2\pi f t_0}$ ra ngoài. **Ý nghĩa:** dịch tín hiệu trong thời gian **không đổi biên độ** $|X(f)|$ (vì $|e^{-i2\pi f t_0}| = 1$) mà chỉ **xoay pha** một lượng $-2\pi f t_0$ tỉ lệ với $f$.

**Ví dụ số:** dịch $t_0 = 0.1$ s. Tại $f = 5$ Hz, pha thêm $-2\pi\cdot 5\cdot 0.1 = -\pi$ rad ($-180°$). Tại $f = 2.5$ Hz, pha thêm $-2\pi\cdot 2.5\cdot 0.1 = -\pi/2$ ($-90°$). Tần số cao bị xoay pha nhiều hơn.

### 4.3. Scale (co giãn) — hẹp thời gian ↔ rộng tần số

$$x(a t) \;\leftrightarrow\; \frac{1}{|a|}\, X\!\left(\frac{f}{a}\right), \qquad a \ne 0.$$

**Chứng minh:** đổi biến $u = at$, $du = a\, dt$. Hệ số $1/|a|$ giữ năng lượng. **Ý nghĩa định lượng:** nén tín hiệu theo thời gian $a = 2$ (nhanh gấp đôi, hẹp một nửa) → phổ **giãn gấp đôi** ($X(f/2)$, rộng gấp đôi) và **thấp xuống** ($\times\tfrac12$). Đây chính là time–frequency uncertainty viết thành công thức: **tích** độ rộng thời gian × độ rộng tần số là hằng số.

**Ví dụ số:** rect rộng $T = 1$ có zero đầu ở $1$ Hz. Nén thành $T = 0.25$ ($a = 4$): zero đầu nhảy ra $4$ Hz — rộng gấp 4. Khớp §3.1.

### 4.4. Đối ngẫu (duality)

$$\text{Nếu } x(t) \leftrightarrow X(f) \text{ thì } X(t) \leftrightarrow x(-f).$$

Vì cặp thuận/nghịch gần như đối xứng (chỉ khác dấu mũ), **vai trò thời gian và tần số có thể đổi chỗ**. **Ví dụ:** từ $\mathrm{rect}(t) \leftrightarrow \operatorname{sinc}(f)$, đối ngẫu cho ngay $\operatorname{sinc}(t) \leftrightarrow \mathrm{rect}(-f) = \mathrm{rect}(f)$ (rect chẵn). Một sinc trong thời gian (đáp ứng bộ lọc lý tưởng) có phổ là một xung vuông — đúng định nghĩa "bộ lọc thông thấp lý tưởng cắt ngọt ở tần số biên".

> ❓ **Câu hỏi tự nhiên.** *"Tính chất nào hay dùng nhất khi xử lý tín hiệu thực?"* — Dịch thời gian (xác định độ trễ qua pha), scale (đổi tốc độ phát / lấy mẫu), và **tích chập** (§5, lọc). Đối ngẫu thì hay dùng để **suy nhanh** một cặp biến đổi mới từ cặp đã biết, khỏi tính tích phân.

> 📝 **Tóm tắt §4.** Tuyến tính (cộng phổ). Dịch thời gian → chỉ xoay pha, giữ biên độ. Scale → hẹp↔rộng (uncertainty thành công thức). Đối ngẫu → đổi vai trò $t \leftrightarrow f$, suy cặp mới miễn phí.

---

## 5. Định lý tích chập — đóng câu hỏi từ Tier1 L04

> **Nhắc câu hỏi treo:** Trong [Tier1 L04 — Tích chập](../../01-Foundations/lesson-04-convolution/), ta tính đầu ra bộ lọc bằng tích chập $y(t) = (x * h)(t) = \int x(\tau)\, h(t-\tau)\, d\tau$ — một phép tính trượt-nhân-cộng tốn kém. Câu hỏi để treo lúc đó là: *"có cách nào nhanh và sáng tỏ hơn không?"* Câu trả lời nằm ở đây.

### 5.1. Phát biểu

$$\boxed{\;(x * h)(t) \;\leftrightarrow\; X(f)\cdot H(f)\;}$$

**Tích chập trong miền thời gian = phép nhân thông thường trong miền tần số.** Và đối ngẫu (nhân thời gian = tích chập tần số):

$$x(t)\cdot h(t) \;\leftrightarrow\; (X * H)(f).$$

### 5.2. Walk-through chứng minh (đủ bước)

$$\begin{aligned}
\mathcal{F}\{x * h\}(f) &= \int_{-\infty}^{\infty}\left[\int_{-\infty}^{\infty} x(\tau)\, h(t-\tau)\, d\tau\right] e^{-i2\pi f t}\, dt \\
&= \int_{-\infty}^{\infty} x(\tau)\left[\int_{-\infty}^{\infty} h(t-\tau)\, e^{-i2\pi f t}\, dt\right] d\tau \quad\text{(đổi thứ tự tích phân)} \\
&= \int_{-\infty}^{\infty} x(\tau)\, \big[H(f)\, e^{-i2\pi f \tau}\big]\, d\tau \quad\text{(tính chất dịch §4.2)} \\
&= H(f)\int_{-\infty}^{\infty} x(\tau)\, e^{-i2\pi f \tau}\, d\tau = H(f)\cdot X(f).
\end{aligned}$$

Bước 3 dùng đúng tính chất dịch thời gian: tích phân trong là FT của $h$ bị dịch $\tau$ giây, bằng $H(f)e^{-i2\pi f\tau}$.

### 5.3. Ví dụ số minh họa

Lọc thông thấp lý tưởng: $H(f) = 1$ với $|f| \le 10$ Hz, bằng $0$ ngoài đó. Đưa tín hiệu $x(t)$ chứa cả 5 Hz và 50 Hz qua bộ lọc.

- **Cách tích chập (miền thời gian):** $y = x * h$ với $h = \mathcal{F}^{-1}\{H\} = 20\operatorname{sinc}(20t)$ — phải trượt-nhân-cộng trên toàn trục.
- **Cách nhân phổ (miền tần số):** $Y(f) = X(f)\cdot H(f)$. Tại $f = 5$: $Y = X\cdot 1 = X$ (giữ). Tại $f = 50$: $Y = X\cdot 0 = 0$ (cắt). Chỉ một phép **nhân điểm-điểm**.

> 💡 **Trực giác.** Lọc = "nhân với mặt nạ phổ". Trong miền tần số, bộ lọc chỉ là một **mặt nạ** $H(f)$: nhân với 1 ở dải muốn giữ, 0 ở dải muốn bỏ. Tích chập rối rắm trong thời gian biến thành phép nhân tầm thường trong tần số — đây là lý do FFT (sẽ học ở [L09 DFT](../lesson-04-dft/)) làm tích chập nhanh: thay $O(N^2)$ trượt bằng $O(N\log N)$ biến đổi + $O(N)$ nhân.

> 🔁 **Dừng lại tự kiểm tra.** Nhân hai tín hiệu trong thời gian tương ứng phép gì trong tần số?
> <details><summary>Đáp án</summary>
> Tích chập trong tần số: $x\cdot h \leftrightarrow X * H$ (đối ngẫu của định lý tích chập). Ví dụ: nhân tín hiệu với cửa sổ (windowing) ⇒ phổ bị "bôi nhòe" (convolve với phổ của cửa sổ) — gốc của hiện tượng spectral leakage.
> </details>

> 📝 **Tóm tắt §5.** $x*h \leftrightarrow X\cdot H$: tích chập (lọc) trong thời gian = nhân phổ trong tần số. Đây là lý do biến đổi Fourier là công cụ trung tâm của lọc và là động lực cho FFT.

---

## 6. Định lý Parseval — đóng câu hỏi từ Tier1 L05

> **Nhắc câu hỏi treo:** Trong [Tier1 L05 — Tương quan & Năng lượng](../../01-Foundations/lesson-05-correlation-energy/), ta định nghĩa năng lượng tín hiệu $E = \int |x(t)|^2\, dt$ và hỏi: *"năng lượng phân bố trên các tần số như thế nào, và tổng có bảo toàn khi sang miền tần số không?"* Đáp án:

### 6.1. Phát biểu

$$\boxed{\;\int_{-\infty}^{\infty} |x(t)|^2\, dt \;=\; \int_{-\infty}^{\infty} |X(f)|^2\, df\;}$$

**Năng lượng tính trong miền thời gian = năng lượng tính trong miền tần số.** Đại lượng $|X(f)|^2$ gọi là **mật độ phổ năng lượng** (energy spectral density) — cho biết năng lượng tập trung ở dải tần nào.

### 6.2. Walk-through chứng minh

$$\begin{aligned}
\int |x(t)|^2 dt &= \int x(t)\,\overline{x(t)}\, dt = \int x(t)\left[\overline{\int X(f) e^{i2\pi f t} df}\right] dt \\
&= \int x(t)\left[\int \overline{X(f)}\, e^{-i2\pi f t}\, df\right] dt \\
&= \int \overline{X(f)}\left[\int x(t)\, e^{-i2\pi f t}\, dt\right] df \quad\text{(đổi thứ tự)} \\
&= \int \overline{X(f)}\, X(f)\, df = \int |X(f)|^2\, df.
\end{aligned}$$

Bước trong cùng nhận ra tích phân theo $t$ chính là $X(f)$ (định nghĩa thuận).

### 6.3. Ví dụ số

Xét $x(t) = \cos(2\pi\cdot 5t)$ trên một chu kỳ $T_0 = 0.2$ s (dạng power, dùng trung bình). Năng lượng/công suất trung bình thời gian: $\frac{1}{T_0}\int_0^{T_0}\cos^2(2\pi 5t)\, dt = \tfrac12$. Trong miền tần số, phổ là 2 vạch ở $\pm5$ Hz, mỗi vạch đóng góp $|c|^2 = (\tfrac12)^2$... cộng lại $2\times\tfrac14 = \tfrac12$. **Hai vế khớp $\tfrac12$.** Năng lượng bảo toàn — chỉ đổi cách kế toán: theo thời điểm vs theo tần số.

> ❓ **Câu hỏi tự nhiên.** *"Parseval dùng để làm gì trong thực tế?"* — (1) Tính năng lượng nhanh ở miền tiện hơn. (2) Nền của **nén có mất mát**: nếu $|X(f)|^2$ nhỏ ở dải nào, bỏ dải đó chỉ mất ít năng lượng → tai gần như không nghe khác (nguyên lý MP3). (3) Kiểm tra cài đặt FFT đúng (năng lượng vào = năng lượng ra).

> 📝 **Tóm tắt §6.** Parseval: $\int|x|^2 dt = \int|X|^2 df$ — năng lượng bảo toàn qua FT. $|X(f)|^2$ = mật độ phổ năng lượng, cho biết năng lượng nằm ở tần số nào. Nền của nén tín hiệu.

---

## 7. Phổ biên độ, phổ pha và ứng dụng

Vì $X(f)$ phức, ta tách thành hai đồ thị thực:

- **Phổ biên độ** $|X(f)| = \sqrt{\operatorname{Re}^2 + \operatorname{Im}^2}$ — "tần số nào mạnh". Đây là cái mắt thường quen nhìn (equalizer, spectrogram).
- **Phổ pha** $\angle X(f) = \operatorname{atan2}(\operatorname{Im}, \operatorname{Re})$ — "tần số đó lệch pha bao nhiêu". Quyết định **hình dạng** sóng và **thời điểm** các đỉnh xếp chồng.

> 💡 **Trực giác về pha.** Hai tín hiệu có **cùng** phổ biên độ nhưng **khác** phổ pha nghe/nhìn rất khác. Pha mã hóa "khi nào" các tần số cộng hưởng — bỏ pha thì một tiếng trống (gõ đúng lúc) biến thành tiếng ù lan tỏa, vì các tần số mất sự đồng bộ thời điểm. Câu nói nổi tiếng trong xử lý ảnh: "phase carries the shape" — giữ pha ảnh A + biên độ ảnh B, ảnh tái tạo trông giống A.

**Ứng dụng tổng hợp:**

- **Lọc nhiễu:** xem $|X(f)|$, tìm dải nhiễu (vd hum 50/60 Hz), nhân $H(f)$ để dập (định lý tích chập §5).
- **Nén (MP3/JPEG):** bỏ các tần số có $|X|^2$ nhỏ (Parseval §6 đảm bảo mất ít năng lượng).
- **Dò tần số / nhận dạng:** đỉnh trong $|X(f)|$ = nốt nhạc / sóng mang / nhịp tim.
- **Đo độ trễ:** độ dốc của phổ pha theo $f$ cho độ trễ thời gian (§4.2).

> 📝 **Tóm tắt §7.** $X(f)$ phức ⇒ tách phổ biên độ $|X|$ (mạnh yếu) và phổ pha $\angle X$ (đồng bộ thời điểm/hình dạng). Cùng biên độ khác pha = tín hiệu khác hẳn. Phổ biên độ là nền của lọc/nén/nhận dạng; phổ pha là nền của định vị thời gian/hình dạng.

---

## 8. Bài tập

1. **Suy phổ cos lệch tần.** Cho $x(t) = \cos(2\pi\cdot 8 t)$. Viết $X(f)$ theo delta và vẽ phác phổ biên độ.
2. **Dịch ↔ pha.** Tín hiệu $x(t) \leftrightarrow X(f)$ bị dịch trễ $t_0 = 0.25$ s. Tính lượng pha thêm tại $f = 1$ Hz và $f = 4$ Hz. Biên độ $|X|$ có đổi không?
3. **Scale và uncertainty.** Xung vuông rộng $T = 2$ s. (a) Zero đầu tiên của $|X(f)|$ ở đâu? (b) Nén còn $T = 0.5$ s thì zero đầu dời tới đâu, phổ rộng ra hay hẹp lại?
4. **Định lý tích chập.** Bộ lọc thông thấp lý tưởng $H(f) = 1$ với $|f|\le 6$, $0$ ngoài đó. Tín hiệu vào $x(t) = \cos(2\pi\cdot 3t) + \cos(2\pi\cdot 20t)$. Đầu ra $y(t)$ là gì? Dùng định lý tích chập, **không** tích chập tay.
5. **Parseval.** Cho xung vuông $\mathrm{rect}_1(t)$ (rộng 1, cao 1). (a) Tính năng lượng miền thời gian $\int|x|^2 dt$. (b) Biết $X(f) = \operatorname{sinc}(f)$, hãy phát biểu năng lượng miền tần số mà Parseval khẳng định bằng kết quả (a) (không cần tính tích phân sinc²).
6. **(Nâng cao) Đối ngẫu.** Từ cặp $\delta(t) \leftrightarrow 1$, dùng tính chất đối ngẫu §4.4 để suy cặp biến đổi của hằng số $1$. Kết quả có khớp §3.3 không?

---

## 9. Lời giải chi tiết

### Bài 1
$\cos(2\pi\cdot 8t) = \tfrac12 e^{i2\pi 8t} + \tfrac12 e^{-i2\pi 8t}$ ⇒
$$X(f) = \tfrac12\,\delta(f - 8) + \tfrac12\,\delta(f + 8).$$
Phổ biên độ: hai vạch cao $\tfrac12$ tại $f = +8$ và $f = -8$ Hz, mọi nơi khác bằng 0. (Tín hiệu thực ⇒ phổ đối xứng qua trục tung.)

### Bài 2
Dịch trễ ⇒ nhân phổ với $e^{-i2\pi f t_0}$ (§4.2), lượng pha thêm $\Delta\phi(f) = -2\pi f t_0$.
- Tại $f = 1$: $\Delta\phi = -2\pi\cdot 1\cdot 0.25 = -\pi/2$ rad $= -90°$.
- Tại $f = 4$: $\Delta\phi = -2\pi\cdot 4\cdot 0.25 = -2\pi$ rad $= -360°$ (≡ $0°$).
Biên độ **không đổi** vì $|e^{-i2\pi f t_0}| = 1$. Dịch thời gian chỉ xoay pha, không đụng $|X|$.

### Bài 3
Zero đầu tiên của $\operatorname{sinc}(fT)$ ở $f = 1/T$.
- (a) $T = 2$ ⇒ zero đầu ở $f = 1/2 = 0.5$ Hz.
- (b) $T = 0.5$ ⇒ zero đầu ở $f = 1/0.5 = 2$ Hz. Zero dời **ra xa** (0.5 → 2 Hz) ⇒ phổ **rộng ra**. Xung hẹp hơn trong thời gian ⇒ phổ rộng hơn trong tần số (uncertainty §4.3).

### Bài 4
Phổ vào: $X(f) = \tfrac12[\delta(f{\pm}3)] + \tfrac12[\delta(f{\pm}20)]$ (2 cặp delta ở $\pm3$ và $\pm20$).
Nhân mặt nạ $H$: tại $\pm3$ ($\le 6$) ⇒ $H = 1$ giữ; tại $\pm20$ ($>6$) ⇒ $H = 0$ cắt.
$$Y(f) = X(f)H(f) = \tfrac12[\delta(f{-}3) + \delta(f{+}3)] \;\Rightarrow\; y(t) = \cos(2\pi\cdot 3t).$$
Thành phần 20 Hz bị loại sạch, chỉ còn cos 3 Hz. (Tích chập miền thời gian phức tạp đã thay bằng một phép nhân điểm — đúng tinh thần §5.)

### Bài 5
(a) $\int_{-\infty}^{\infty}|\mathrm{rect}_1(t)|^2 dt = \int_{-1/2}^{1/2} 1^2\, dt = 1$.
(b) Parseval khẳng định:
$$\int_{-\infty}^{\infty} |\operatorname{sinc}(f)|^2\, df = \int_{-\infty}^{\infty} \frac{\sin^2(\pi f)}{(\pi f)^2}\, df = 1.$$
Tức là tích phân của sinc² bằng đúng năng lượng thời gian = 1 — không cần tính trực tiếp tích phân sinc² (vốn khó), Parseval cho ngay giá trị.

### Bài 6
Đối ngẫu §4.4: nếu $x(t)\leftrightarrow X(f)$ thì $X(t)\leftrightarrow x(-f)$.
Lấy cặp $\delta(t) \leftrightarrow 1$, tức $x = \delta$, $X = 1$. Đối ngẫu: $X(t) = 1 \leftrightarrow x(-f) = \delta(-f) = \delta(f)$ (delta chẵn).
Vậy $1 \leftrightarrow \delta(f)$ — **khớp** chính xác §3.3 (hằng số DC ⇒ delta tại tần số 0). Đối ngẫu cho kết quả miễn phí, không cần tính tích phân.

---

## 10. Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác: (1) cặp time↔freq với chọn dạng sóng & chỉnh độ rộng (thấy uncertainty); (2) dịch & scale (pha và độ rộng phổ); (3) định lý tích chập ($x*h$ so với $X\cdot H$).

## 11. Tham khảo & Bài tiếp theo

- Tiền đề: [L06 Chuỗi Fourier](../lesson-01-fourier-series/) · [L07 Epicycle & Euler](../lesson-02-epicycles-euler/) · [Tier1 L04 Tích chập](../../01-Foundations/lesson-04-convolution/) · [Tier1 L05 Tương quan & Năng lượng](../../01-Foundations/lesson-05-correlation-energy/).
- **Bài tiếp theo:** [L09 — DFT (Discrete Fourier Transform)](../lesson-04-dft/) — phiên bản **rời rạc, hữu hạn** của FT để chạy trên máy tính, và FFT làm nó nhanh $O(N\log N)$ (động lực đã thấy ở định lý tích chập §5).
