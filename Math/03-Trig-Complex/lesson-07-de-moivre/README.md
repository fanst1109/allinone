# Lesson 07 — Công thức De Moivre & căn bậc n

## Mục tiêu

- Hiểu **công thức De Moivre**: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$.
- Tính lũy thừa số phức nhanh.
- Tìm **n căn bậc n của 1** và của số phức bất kỳ.
- Hình dung n căn = n đỉnh đa giác đều nội tiếp đường tròn.

## Kiến thức tiền đề

- [Lesson 06 — Euler](../lesson-06-complex-polar-euler/).

---

## 1. Công thức De Moivre

💡 **Trực giác / Hình dung**: nâng số phức (mô-đun 1) lên lũy thừa n = **quay n lần liên tiếp**. Mỗi lần nhân cộng thêm góc θ → sau n lần góc thành nθ. Đó là toàn bộ ý tưởng: lũy thừa = quay nhiều lần = nhân góc.

$$(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$$

💡 **Dùng Euler**: $(e^{i\theta})^n = e^{in\theta}$. Đó là tất cả!

⟶ **Lũy thừa số phức dạng cực**:

$$(re^{i\theta})^n = r^n e^{in\theta}$$

**Ví dụ**: Tính $(1+i)^{10}$.
- $1+i = \sqrt{2}\,e^{i\pi/4}$.
- $(1+i)^{10} = (\sqrt{2})^{10}e^{i\cdot 10\pi/4} = 32e^{i\cdot 5\pi/2} = 32e^{i\pi/2}$ (vì $\dfrac{5\pi}{2} = 2\pi + \dfrac{\pi}{2}$) $=$ **$32i$**.

Cách trực tiếp (đại số) sẽ phải nhân 10 lần → vô cùng phiền. De Moivre giải quyết trong 3 dòng.

> 📐 **Định nghĩa đầy đủ — Công thức De Moivre**
>
> **(a) Là gì**: Quy tắc lũy thừa số phức dưới dạng cực: nâng $(\cos\theta + i\sin\theta)$ lên bậc n = chỉ cần **nhân n vào argument**. Hệ quả trực tiếp của Euler $(e^{i\theta})^n = e^{in\theta}$.
>
> **(b) Vì sao cần**: Lũy thừa số phức dạng đại số $(a+bi)^n$ đòi hỏi nhân n lần — bùng nổ số hạng. De Moivre cho công thức **đóng** (closed-form) chỉ cần $r^n + n\theta$. Quan trọng hơn — nó cho công cụ **giải PT** $z^n = w$ trong $\mathbb{C}$: n căn bậc n nằm đều quanh đường tròn = n đỉnh đa giác đều. Ứng dụng: tìm tất cả căn của 1 (root of unity) — nền tảng FFT (Fast Fourier Transform), cryptography, đa thức nội suy.
>
> **(c) Ví dụ số**: $(\cos 30^\circ + i\sin 30^\circ)^4 = \cos 120^\circ + i\sin 120^\circ = -\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}$. Verify: $30^\circ\cdot 4 = 120^\circ$ ✓. $(1+i)^{10}$: viết $= (\sqrt{2}\,e^{i\pi/4})^{10} = 32e^{i\cdot 10\pi/4} = 32e^{i\pi/2} =$ **$32i$**. Kiểm: $(1+i)^2 = 2i$, $(2i)^5 = 32i^5 = 32i$ ✓. n căn bậc 4 của 1: $z^4 = 1 = e^0$ → $z_k = e^{i\cdot k\cdot 2\pi/4}$, $k=0,1,2,3$ → $\{1, i, -1, -i\}$ (4 đỉnh hình vuông).

⚠ **Lỗi thường gặp**: Quên nhân n vào θ. $(e^{i\theta})^n = e^{in\theta}$, KHÔNG phải $e^{i\theta}$.

⚠ **Lỗi thường gặp 2 — quên nâng cả mô-đun lên lũy thừa n**. $(re^{i\theta})^n = r^n e^{in\theta}$ — mô-đun thành $r^n$, KHÔNG giữ nguyên r. Phản ví dụ: $(1+i)^4 = (\sqrt{2}\,e^{i\pi/4})^4 = (\sqrt{2})^4 e^{i\pi} = 4\cdot(-1) = -4$; nếu quên mũ mô-đun ra $\sqrt{2}\,e^{i\pi} = -\sqrt{2}$ → sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"De Moivre đúng với n âm hay phân số không?"* Với **n nguyên** (cả âm) luôn đúng. Với n phân số ($1/k$) thì cho **một** trong nhiều căn — phải dùng công thức căn (mục 4) để lấy đủ tất cả nghiệm.
- *"Vì sao De Moivre nhanh hơn nhân trực tiếp?"* Nhân $(a+bi)^{10}$ trực tiếp phải khai triển 10 lần, bùng nổ số hạng. De Moivre chỉ cần $r^{10}$ và $10\theta$ — 3 dòng.

🔁 **Dừng lại tự kiểm tra**

1. Tính $(\cos 20^\circ + i\sin 20^\circ)^9$.
2. Tính $(2e^{i\pi/6})^3$.

<details><summary>Đáp án</summary>

1. $= \cos(9\cdot 20^\circ) + i\sin(9\cdot 20^\circ) = \cos 180^\circ + i\sin 180^\circ = -1$.
2. $= 2^3 e^{i\cdot 3\cdot\pi/6} = 8e^{i\pi/2} = 8i$.

</details>

### 📝 Tóm tắt mục 1

- $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$; tổng quát $(re^{i\theta})^n = r^n e^{in\theta}$.
- Là hệ quả trực tiếp của Euler; lũy thừa = quay n lần = nhân góc.
- Nhớ nâng **cả mô-đun** lên mũ n và **nhân n vào θ**.

---

## 2. Khai triển cos(nθ), sin(nθ) qua sin/cos

💡 **Trực giác / Hình dung**: De Moivre cho hai cách viết cùng một số phức $(\cos\theta + i\sin\theta)^n$. Vế trái khai triển bằng nhị thức Newton thành đa thức của $\sin\theta$, $\cos\theta$. Vế phải là $\cos n\theta + i\sin n\theta$. **So phần thực với phần thực, phần ảo với phần ảo** → tự rơi ra công thức nhân n. Đây là "máy sinh công thức" lượng giác.

Áp dụng De Moivre + nhị thức Newton để chứng minh các đồng nhất thức nhân đôi, nhân ba...

**Ví dụ**: Khai triển $(\cos\theta + i\sin\theta)^3$.

$$\begin{aligned}
(\cos\theta + i\sin\theta)^3 &= \cos^3\theta + 3\cos^2\theta(i\sin\theta) + 3\cos\theta(i\sin\theta)^2 + (i\sin\theta)^3 \\
&= \cos^3\theta + 3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta \\
&= (\cos^3\theta - 3\cos\theta\sin^2\theta) + i(3\cos^2\theta\sin\theta - \sin^3\theta)
\end{aligned}$$

Vế trái cũng $= \cos 3\theta + i\sin 3\theta$. Đối chiếu:
- **$\cos 3\theta = \cos^3\theta - 3\cos\theta\sin^2\theta = 4\cos^3\theta - 3\cos\theta$**.
- **$\sin 3\theta = 3\cos^2\theta\sin\theta - \sin^3\theta = 3\sin\theta - 4\sin^3\theta$**.

⟶ De Moivre **sinh ra** các công thức nhân ba (và mọi bậc).

**Verify $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ bằng số ($\theta = 0$)**: vế trái $\cos 0 = 1$; vế phải $4\cdot 1^3 - 3\cdot 1 = 1$ ✓. Thử $\theta = \dfrac{\pi}{3}$: vế trái $\cos\pi = -1$; vế phải $4\left(\dfrac{1}{2}\right)^3 - 3\left(\dfrac{1}{2}\right) = \dfrac{4}{8} - \dfrac{3}{2} = \dfrac{1}{2} - \dfrac{3}{2} = -1$ ✓.

⚠ **Lỗi thường gặp — đối chiếu nhầm phần thực/ảo**. Phần thực của vế trái cho $\cos n\theta$, phần ảo cho $\sin n\theta$. Phản ví dụ: trong khai triển $(\cos\theta + i\sin\theta)^3$, hạng tử $3i\cos^2\theta\sin\theta$ thuộc **phần ảo** (góp vào $\sin 3\theta$), KHÔNG được gộp nhầm vào $\cos 3\theta$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$i^k$ trong nhị thức xử lý sao?"* Dùng chu kỳ 4 của i: $i^0=1, i^1=i, i^2=-1, i^3=-i$. Các số hạng $i^{\text{chẵn}}$ cho phần thực, $i^{\text{lẻ}}$ cho phần ảo.
- *"Có cần thuộc công thức nhân ba?"* Không bắt buộc — nhớ cách **suy ra** từ De Moivre quan trọng hơn thuộc lòng.

🔁 **Dừng lại tự kiểm tra**

1. Phần ảo khi khai triển $(\cos\theta + i\sin\theta)^2$ cho công thức nào?
2. $\sin 3\theta$ viết qua $\sin\theta$ là gì?

<details><summary>Đáp án</summary>

1. $(\cos\theta + i\sin\theta)^2 = \cos^2\theta + 2i\sin\theta\cos\theta - \sin^2\theta$; phần ảo $2\sin\theta\cos\theta = \sin 2\theta$.
2. $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$.

</details>

### 📝 Tóm tắt mục 2

- Khai triển $(\cos\theta+i\sin\theta)^n$ bằng nhị thức, đối chiếu với $\cos n\theta + i\sin n\theta$.
- Phần thực → $\cos n\theta$, phần ảo → $\sin n\theta$.
- De Moivre là "máy sinh" mọi công thức nhân n của lượng giác.

---

## 3. Căn bậc n của 1

💡 **Trực giác / Hình dung**: tìm "căn bậc n của 1" = tìm những số mà quay n lần (mỗi lần góc đều) thì về đúng vị trí 1 (góc 0, tức bội của 2π). Cách duy nhất: chia vòng tròn `2π` thành n phần bằng nhau. Vì vậy n nghiệm nằm **cách đều** quanh đường tròn đơn vị → tạo thành **đa giác đều n cạnh**.

**Hỏi**: PT $z^n = 1$ có bao nhiêu nghiệm trong $\mathbb{C}$?

**Đáp**: **n nghiệm**, mỗi nghiệm tương ứng 1 đỉnh **đa giác đều n cạnh** nội tiếp đường tròn đơn vị.

**Công thức**:

$$z_k = e^{i\cdot 2k\pi/n}, \quad k = 0, 1, 2, \ldots, n-1$$

**Ví dụ n=3 (căn bậc 3 của 1)**:
- $z_0 = e^0 =$ **$1$**.
- $z_1 = e^{i\cdot 2\pi/3} = \cos 120^\circ + i\sin 120^\circ =$ **$-\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}$**.
- $z_2 = e^{i\cdot 4\pi/3} =$ **$-\dfrac{1}{2} - i\dfrac{\sqrt{3}}{2}$**.

⟶ 3 nghiệm là 3 đỉnh tam giác đều nội tiếp đường tròn $r=1$.

**Kiểm tra**: $z_1^3 = (e^{i\cdot 2\pi/3})^3 = e^{i\cdot 2\pi} = 1$ ✓.

❓ **Vì sao đa giác đều?** Vì n căn cùng mô-đun $r=1$, argument chia đều quanh đường tròn cứ $\dfrac{2\pi}{n}$.

### Trường hợp n=4:
$z = 1, i, -1, -i$ → 4 đỉnh hình vuông.

### Trường hợp n=6:
$z = e^{i\cdot k\pi/3}$, $k=0..5$ → 6 đỉnh lục giác đều.

⚠ **Lỗi thường gặp — chỉ lấy 1 nghiệm thực (= 1) mà bỏ các nghiệm phức**. $z^n = 1$ có **n** nghiệm, không phải 1. Phản ví dụ: $z^3 = 1$ không chỉ có $z = 1$ — còn $z = -\dfrac{1}{2} \pm \dfrac{\sqrt{3}}{2}i$. Kiểm: $\left(-\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}i\right)^3 = 1$ (quay 120° ba lần = 360° về 1). Bỏ chúng là mất 2/3 nghiệm.

⚠ **Lỗi thường gặp 2 — cho k chạy tới n (lặp nghiệm)**. k chỉ chạy $0, 1, \ldots, n-1$ (đúng n giá trị). Tại $k = n$: $e^{i\cdot 2n\pi/n} = e^{i2\pi} = 1 = z_0$ — trùng lại. Đừng đếm dư.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tổng tất cả n căn bậc n của 1 bằng mấy?"* Bằng **0** (với $n \ge 2$) — vì các đỉnh đa giác đều phân bố đối xứng quanh tâm, vector cộng triệt tiêu. Vd n=3: $1 + \left(-\dfrac{1}{2}+\dfrac{\sqrt{3}}{2}i\right) + \left(-\dfrac{1}{2}-\dfrac{\sqrt{3}}{2}i\right) = 0$.
- *"Căn bậc n của 1 dùng để làm gì thực tế?"* Là "root of unity" — nền tảng của **FFT** (biến đổi Fourier nhanh, dùng trong nén ảnh/nhạc, xử lý tín hiệu).

🔁 **Dừng lại tự kiểm tra**

1. Liệt kê 4 căn bậc 4 của 1.
2. Tổng 4 căn đó bằng mấy?

<details><summary>Đáp án</summary>

1. $z_k = e^{i\cdot k\pi/2}$, $k=0..3$ → $1, i, -1, -i$.
2. $1 + i + (-1) + (-i) = 0$.

</details>

### 📝 Tóm tắt mục 3

- $z^n = 1$ có **n** nghiệm: $z_k = e^{i\cdot 2k\pi/n}$, $k = 0..n-1$.
- n nghiệm cách đều quanh đường tròn đơn vị = n đỉnh đa giác đều.
- Tổng n căn ($n\ge 2$) = 0; là "root of unity", nền của FFT.

---

## 4. Căn bậc n của số phức bất kỳ

💡 **Trực giác / Hình dung**: căn bậc n của một số phức $w$ = "ngược" phép lũy thừa: tìm các z mà $z^n = w$. Hình học: tất cả nằm trên đường tròn bán kính $R^{1/n}$ (căn bậc n thực của mô-đun w), chia đều argument. Giống căn của 1 nhưng (a) đường tròn không nhất thiết bán kính 1, (b) "đỉnh đầu tiên" lệch đi $\dfrac{\varphi}{n}$ thay vì 0.

**Tổng quát**: $z^n = w$ (với $w = Re^{i\varphi}$).

**n nghiệm**:

$$z_k = R^{1/n} \, e^{i(\varphi + 2k\pi)/n}, \quad k = 0, 1, \ldots, n-1$$

- Mô-đun: tất cả đều bằng **$R^{1/n}$** (căn bậc n thực của R).
- Argument: chia đều quanh đường tròn, mỗi nghiệm cách nhau $\dfrac{2\pi}{n}$.

**Ví dụ**: Tìm các căn bậc 3 của $-8$.
- $-8 = 8e^{i\pi}$.
- $z_k = 8^{1/3} e^{i(\pi + 2k\pi)/3} = 2e^{i(2k+1)\pi/3}$, $k=0,1,2$.
- $z_0 = 2e^{i\pi/3} = 2\left(\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}\right) =$ **$1 + i\sqrt{3}$**.
- $z_1 = 2e^{i\pi} =$ **$-2$**.
- $z_2 = 2e^{i\cdot 5\pi/3} =$ **$1 - i\sqrt{3}$**.

**Kiểm tra**: $(-2)^3 = -8$ ✓. $(1+i\sqrt{3})^3 = \ldots = -8$ (tính bằng De Moivre).

⚠ **Lỗi thường gặp — quên $+2k\pi$ trong argument trước khi chia cho n**. Phải dùng $\dfrac{\varphi + 2k\pi}{n}$, không chỉ $\dfrac{\varphi}{n}$. Phản ví dụ: căn bậc 3 của $-8$ ($\varphi = \pi$). Nếu chỉ lấy $\dfrac{\varphi}{3} = \dfrac{\pi}{3}$ ra **một** nghiệm $1 + i\sqrt{3}$; bỏ $+2k\pi$ thì mất hai nghiệm còn lại $-2$ và $1 - i\sqrt{3}$. Phải cho $k = 0, 1, 2$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mô-đun tất cả các căn bằng nhau?"* Vì $|z_k| = R^{1/n}$ không phụ thuộc k — chỉ argument thay đổi. Nên chúng nằm trên cùng một đường tròn.
- *"Khoảng cách góc giữa hai căn liên tiếp là bao nhiêu?"* Đúng $\dfrac{2\pi}{n}$ (chia đều vòng tròn). Vd căn bậc 3 cách nhau 120°.

🔁 **Dừng lại tự kiểm tra**

1. Tìm các căn bậc 2 của $i$.
2. Mô-đun chung của các căn bậc 4 của $16$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. $i = e^{i\pi/2}$. $z_k = e^{i(\pi/2 + 2k\pi)/2}$, $k=0,1$ → $z_0 = e^{i\pi/4} = \dfrac{\sqrt{2}}{2} + \dfrac{\sqrt{2}}{2}i$, $z_1 = e^{i\cdot 5\pi/4} = -\dfrac{\sqrt{2}}{2} - \dfrac{\sqrt{2}}{2}i$.
2. $16^{1/4} = 2$.

</details>

### 📝 Tóm tắt mục 4

- $z^n = w$ ($w = Re^{i\varphi}$): $z_k = R^{1/n} e^{i(\varphi+2k\pi)/n}$, $k=0..n-1$.
- Mọi căn cùng mô-đun $R^{1/n}$; argument cách đều $\dfrac{2\pi}{n}$.
- Bắt buộc có $+2k\pi$ để lấy đủ n nghiệm.

---

## 5. Ứng dụng — chứng minh đồng nhất thức trắc đẹp

💡 **Trực giác / Hình dung**: $e^{i\theta}$ và $e^{-i\theta}$ là hai điểm đối xứng qua trục thực (góc $+\theta$ và $-\theta$). **Cộng** chúng → phần ảo triệt tiêu, còn $2\cos\theta$ (gấp đôi hoành độ). **Trừ** chúng → phần thực triệt tiêu, còn $2i\sin\theta$. Vì thế sin/cos viết lại được hoàn toàn qua hàm mũ — cầu nối sang giải tích & Fourier.

Phép biến đổi từ $\mathbb{C}$ về $\mathbb{R}$ thường cho công thức ngắn gọn:
- **$\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$** (từ Euler).
- **$\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$**.

**Chứng minh từng bước $\cos\theta = \dfrac{e^{i\theta}+e^{-i\theta}}{2}$**: từ Euler, $e^{i\theta} = \cos\theta + i\sin\theta$ và $e^{-i\theta} = \cos(-\theta) + i\sin(-\theta) = \cos\theta - i\sin\theta$. Cộng: $e^{i\theta} + e^{-i\theta} = 2\cos\theta$ (hai $i\sin\theta$ triệt tiêu). Chia 2 → đpcm.

**Verify bằng số ($\theta = \dfrac{\pi}{3}$)**: $\cos\dfrac{\pi}{3} = \dfrac{1}{2}$. Vế phải $\dfrac{e^{i\pi/3} + e^{-i\pi/3}}{2} = \dfrac{\left(\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}i\right) + \left(\dfrac{1}{2} - \dfrac{\sqrt{3}}{2}i\right)}{2} = \dfrac{1}{2}$ ✓.

⟶ Đây là cầu nối sang **Fourier** (Tier 5/6) — mọi tín hiệu = tổng các $e^{i\omega t}$.

⚠ **Lỗi thường gặp — quên $i$ ở mẫu công thức sin**. $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$ — mẫu là $2i$, KHÔNG phải $2$. Phản ví dụ $\theta = \dfrac{\pi}{2}$: $e^{i\pi/2} - e^{-i\pi/2} = i - (-i) = 2i$; chia $2i$ ra $1 = \sin\dfrac{\pi}{2}$ ✓; nếu chia $2$ ra $i$ (số ảo) → vô lý vì sin phải thực.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai công thức này dùng ở đâu?"* Trong tích phân (biến $\cos$ thành mũ dễ tích phân hơn), và trong **biến đổi Fourier** — phân tích tín hiệu thành tổng $e^{i\omega t}$.
- *"Có công thức tương tự cho tan không?"* Có, suy ra: $\tan\theta = \dfrac{e^{i\theta}-e^{-i\theta}}{i(e^{i\theta}+e^{-i\theta})}$, nhưng ít dùng vì rườm rà.

🔁 **Dừng lại tự kiểm tra**

1. Dùng công thức mũ, tính $\cos 0$.
2. Viết $2\cos\theta$ qua $e^{i\theta}$.

<details><summary>Đáp án</summary>

1. $\dfrac{e^0 + e^0}{2} = \dfrac{1+1}{2} = 1 = \cos 0$ ✓.
2. $2\cos\theta = e^{i\theta} + e^{-i\theta}$.

</details>

### 📝 Tóm tắt mục 5

- $\cos\theta = \dfrac{e^{i\theta}+e^{-i\theta}}{2}$, $\sin\theta = \dfrac{e^{i\theta}-e^{-i\theta}}{2i}$ (chú ý $i$ ở mẫu sin).
- Cộng/trừ hai điểm đối xứng $\pm\theta$ → triệt tiêu phần ảo/thực.
- Là cầu nối sang Fourier — tín hiệu = tổng các $e^{i\omega t}$.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính $\left(\cos\dfrac{\pi}{6} + i\sin\dfrac{\pi}{6}\right)^{12}$.

**Bài 2**: Tính $(1 - i)^8$.

**Bài 3**: Tìm các căn bậc 4 của 1.

**Bài 4**: Tìm các căn bậc 3 của $8i$.

**Bài 5**: Chứng minh $\cos 2\theta = 2\cos^2\theta - 1$ dùng De Moivre.

### Lời giải

**Bài 1**: $(e^{i\pi/6})^{12} = e^{i\cdot 2\pi} =$ **$1$**.

**Bài 2**: $1-i = \sqrt{2}\,e^{-i\pi/4}$. $(\sqrt{2}\,e^{-i\pi/4})^8 = (\sqrt{2})^8 e^{-i\cdot 2\pi} = 16\cdot 1 =$ **$16$**.

**Bài 3**: $z_k = e^{i\cdot k\pi/2}$, $k=0,1,2,3$ → **$\{1, i, -1, -i\}$**.

**Bài 4**: $8i = 8e^{i\pi/2}$. $z_k = 2e^{i(\pi/2 + 2k\pi)/3}$, $k=0,1,2$.  
- $z_0 = 2e^{i\pi/6} = 2\left(\dfrac{\sqrt{3}}{2} + \dfrac{i}{2}\right) =$ **$\sqrt{3} + i$**.  
- $z_1 = 2e^{i\cdot 5\pi/6} =$ **$-\sqrt{3} + i$**.  
- $z_2 = 2e^{i\cdot 9\pi/6} = 2e^{i\cdot 3\pi/2} =$ **$-2i$**.

**Bài 5**: Khai triển $(\cos\theta + i\sin\theta)^2 = \cos^2\theta + 2i\sin\theta\cos\theta - \sin^2\theta$.  
Vế trái $= \cos 2\theta + i\sin 2\theta$.  
Đối chiếu phần thực: **$\cos 2\theta = \cos^2\theta - \sin^2\theta = \cos^2\theta - (1 - \cos^2\theta) = 2\cos^2\theta - 1$** ✓.

---

## 7. Bài tiếp theo

[Lesson 08 — Ứng dụng](../lesson-08-trig-applications/).

## 📝 Tổng kết

1. **De Moivre**: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$. Hệ quả từ Euler.
2. **Lũy thừa cực**: $(re^{i\theta})^n = r^n e^{in\theta}$.
3. **n căn bậc n của z**: n nghiệm cách đều quanh đường tròn $r = |z|^{1/n}$.
4. **Căn của 1**: n đỉnh đa giác đều nội tiếp đường tròn đơn vị.
