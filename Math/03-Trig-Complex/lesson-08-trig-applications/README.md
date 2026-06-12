# Lesson 08 — Ứng dụng: dao động, sóng, Fourier preview

## Mục tiêu

- Áp dụng số phức và lượng giác vào **dao động điều hòa, sóng, mạch điện AC**.
- Hiểu **phasor** — biểu diễn dao động bằng số phức.
- Giới thiệu **chuỗi Fourier**: mọi hàm tuần hoàn = tổng sin/cos.

## Kiến thức tiền đề

- [Lesson 07 — De Moivre](../lesson-07-de-moivre/).

---

## 1. Dao động điều hòa (Simple Harmonic Motion)

💡 **Là gì**: Chuyển động lặp đi lặp lại quanh vị trí cân bằng, ví dụ con lắc lò xo, con lắc đơn.

**Phương trình**:

$$x(t) = A\cos(\omega t + \varphi)$$

- **$A$** = biên độ (max displacement).
- **$\omega$** = tần số góc (rad/s). Liên quan tần số f: $\omega = 2\pi f$.
- **$\varphi$** = pha ban đầu.
- **Chu kỳ T** $= \dfrac{2\pi}{\omega}$.

**Ví dụ**: Lò xo k, khối lượng m. $\omega = \sqrt{\dfrac{k}{m}}$. Nếu $k = 100$ N/m, $m = 1$ kg → $\omega = 10$ rad/s, $T = \dfrac{2\pi}{10} \approx 0.628$s.

**4 ví dụ số đa dạng**:
- $x(t) = 2\cos(\pi t)$: $A = 2$, $\omega = \pi$ → $T = \dfrac{2\pi}{\pi} = 2$s, $f = \dfrac{1}{T} = 0.5$ Hz.
- $x(t) = 0.1\cos(20\pi t)$: $A = 0.1$, $\omega = 20\pi$ → $T = 0.1$s, $f = 10$ Hz.
- Con lắc lò xo $k = 400$, $m = 4$: $\omega = \sqrt{\dfrac{400}{4}} = \sqrt{100} = 10$ rad/s, $T \approx 0.628$s.
- $x(t) = 5\cos\left(2t + \dfrac{\pi}{2}\right) = -5\sin(2t)$: $A = 5$, $T = \pi$ (pha π/2 biến cos thành −sin).

⚠ **Lỗi thường gặp — lẫn tần số $f$ (Hz) với tần số góc $\omega$ (rad/s)**. Liên hệ: $\omega = 2\pi f$. Phản ví dụ: dao động "50 Hz" có $\omega = 2\pi\cdot 50 = 100\pi \approx 314$ rad/s, KHÔNG phải $\omega = 50$. Nhầm hai đại lượng làm sai chu kỳ gấp ~6.28 lần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cos hay sin để mô tả dao động?"* Cả hai đều được — chỉ khác pha π/2. Quy ước phổ biến dùng cos vì tại t=0 cho ngay biên độ. $\sin(\omega t) = \cos\left(\omega t - \dfrac{\pi}{2}\right)$.
- *"Chu kỳ T và tần số f liên hệ sao?"* $f = \dfrac{1}{T}$ (số dao động mỗi giây) và $\omega = \dfrac{2\pi}{T} = 2\pi f$. Ba đại lượng quy về nhau.

🔁 **Dừng lại tự kiểm tra**

1. Dao động $x(t) = 3\cos(4\pi t)$. Chu kỳ và tần số?
2. Con lắc lò xo $k = 100$, $m = 0.25$. $\omega$ bằng mấy?

<details><summary>Đáp án</summary>

1. $\omega = 4\pi$ → $T = \dfrac{2\pi}{4\pi} = 0.5$s, $f = \dfrac{1}{0.5} = 2$ Hz.
2. $\omega = \sqrt{\dfrac{100}{0.25}} = \sqrt{400} = 20$ rad/s.

</details>

### 1.1. Walk-through đọc A / ω / φ / chu kỳ từ phương trình — 3 ví dụ

Cho một dao động dạng $x(t) = A\cos(\omega t + \varphi)$, "đọc" 4 đại lượng là kỹ năng nền. Quy trình:

> **Bước 1** — hệ số trước $\cos$/$\sin$ là **biên độ $A$** (luôn lấy giá trị dương).
> **Bước 2** — hệ số nhân $t$ bên trong là **tần số góc $\omega$** (đơn vị rad/s).
> **Bước 3** — hằng số cộng bên trong là **pha ban đầu $\varphi$** (rad).
> **Bước 4** — suy ra $T = \dfrac{2\pi}{\omega}$, $f = \dfrac{1}{T} = \dfrac{\omega}{2\pi}$.

**Ví dụ 1** — $x(t) = 4\cos\left(3t + \dfrac{\pi}{6}\right)$ (đơn vị cm, t giây):
- Bước 1: $A = 4$ cm.
- Bước 2: $\omega = 3$ rad/s.
- Bước 3: $\varphi = \dfrac{\pi}{6}$ rad $= 30^\circ$.
- Bước 4: $T = \dfrac{2\pi}{3} \approx 2.094$ s; $f = \dfrac{3}{2\pi} \approx 0.477$ Hz.
- Verify vị trí ban đầu: $x(0) = 4\cos\dfrac{\pi}{6} = 4\cdot\dfrac{\sqrt{3}}{2} = 2\sqrt{3} \approx 3.46$ cm ✓ (chưa ở biên vì $\varphi \neq 0$).

**Ví dụ 2** — $x(t) = 0.05\sin\left(100\pi t\right)$ (dạng sin):
- Đổi về cos: $\sin\theta = \cos\left(\theta - \dfrac{\pi}{2}\right)$ → $x(t) = 0.05\cos\left(100\pi t - \dfrac{\pi}{2}\right)$.
- $A = 0.05$ m, $\omega = 100\pi$ rad/s, $\varphi = -\dfrac{\pi}{2}$.
- $T = \dfrac{2\pi}{100\pi} = 0.02$ s; $f = 50$ Hz (đây là tần số lưới điện châu Âu/VN).

**Ví dụ 3** — dao động viết ở dạng cộng: $x(t) = 3\cos(2t) + 4\sin(2t)$. Đại lượng A, φ KHÔNG đọc trực tiếp được — phải gộp:
$$\begin{aligned}
a\cos\theta + b\sin\theta &= R\cos(\theta - \delta), \quad R = \sqrt{a^2 + b^2},\ \tan\delta = \dfrac{b}{a} \\
R &= \sqrt{3^2 + 4^2} = 5, \quad \tan\delta = \dfrac{4}{3} \Rightarrow \delta \approx 53.13^\circ
\end{aligned}$$
→ $x(t) = 5\cos(2t - 53.13^\circ)$. Vậy $A = 5$, $\omega = 2$, $\varphi = -53.13^\circ \approx -0.927$ rad, $T = \pi \approx 3.14$ s. Verify $t=0$: dạng gốc cho $3 + 0 = 3$; dạng gộp cho $5\cos(-53.13^\circ) = 5\cdot 0.6 = 3$ ✓.

🔁 **Dừng lại tự kiểm tra**

1. $x(t) = 6\cos\left(\dfrac{\pi}{2}t\right)$. Đọc A, ω, T, f.
2. Gộp $x(t) = \cos(\omega t) + \sqrt{3}\sin(\omega t)$ về dạng $R\cos(\omega t - \delta)$.

<details><summary>Đáp án</summary>

1. $A = 6$, $\omega = \dfrac{\pi}{2}$ → $T = \dfrac{2\pi}{\pi/2} = 4$ s, $f = 0.25$ Hz.
2. $R = \sqrt{1 + 3} = 2$, $\tan\delta = \dfrac{\sqrt 3}{1} \Rightarrow \delta = 60^\circ$ → $x(t) = 2\cos\left(\omega t - 60^\circ\right)$.

</details>

### 📝 Tóm tắt mục 1

- SHM: $x(t) = A\cos(\omega t + \varphi)$; A = biên độ, ω = tần số góc, φ = pha.
- $T = \dfrac{2\pi}{\omega}$, $f = \dfrac{1}{T}$, $\omega = 2\pi f$ (đừng lẫn f và ω).
- Lò xo: $\omega = \sqrt{\dfrac{k}{m}}$.
- Đọc A/ω/φ theo 4 bước; dạng $a\cos + b\sin$ phải gộp về $R\cos(\theta-\delta)$ với $R = \sqrt{a^2+b^2}$.

---

## 2. Biểu diễn dao động bằng số phức (Phasor)

💡 **Mẹo**: Thay vì viết $\cos(\omega t + \varphi)$, ta viết **phần thực của $e^{i(\omega t+\varphi)}$** $= Ae^{i\varphi}e^{i\omega t}$.

⟶ Phần phasor $Ae^{i\varphi}$ là **số phức cố định** (không phụ thuộc t), gọi là **phasor**.

**Cộng 2 dao động** cùng tần số:
- $x_1(t) = A_1\cos(\omega t + \varphi_1)$, phasor $Z_1 = A_1 e^{i\varphi_1}$.
- $x_2(t) = A_2\cos(\omega t + \varphi_2)$, phasor $Z_2 = A_2 e^{i\varphi_2}$.
- Tổng $x_1 + x_2$ tương ứng phasor **$Z = Z_1 + Z_2$** (cộng số phức).

⟶ Cộng dao động đã quy về **cộng số phức** — đơn giản hơn nhiều cộng cos.

> 📐 **Định nghĩa đầy đủ — Phasor**
>
> **(a) Là gì**: Số phức **cố định** $Ae^{i\varphi}$ đại diện cho dao động $A\cos(\omega t + \varphi)$ khi tần số ω đã biết. Phasor "thu gọn" 1 hàm thời gian thành 1 số phức — chỉ giữ lại 2 thông tin quan trọng: biên độ A và pha φ.
>
> **(b) Vì sao cần**: Khi nhiều dao động cùng tần số cộng nhau (mạch điện AC, giao thoa sóng), tính trực tiếp $A_1\cos(\omega t+\varphi_1) + A_2\cos(\omega t+\varphi_2)$ cần công thức cộng — rối. Phasor biến phép này thành **cộng vector số phức** $Z_1 + Z_2$ — đơn giản, hiển thị trên Argand. Nguyên lý cốt lõi của: kỹ thuật điện (giải mạch AC bằng phasor thay vì PT vi phân), tín hiệu số (DSP), antenna engineering.
>
> **(c) Ví dụ số**: 2 dao động cùng ω: $x_1 = 3\cos(\omega t)$, $x_2 = 4\cos\left(\omega t + \dfrac{\pi}{2}\right)$. Phasor $Z_1 = 3$, $Z_2 = 4e^{i\pi/2} = 4i$. Tổng $Z = 3 + 4i$ → $|Z| = 5$, $\arg = \arctan\dfrac{4}{3} \approx 53.13^\circ$. Vậy $x_1+x_2 =$ **$5\cos(\omega t + 53.13^\circ)$** (KHÔNG phải $7\cos$ — biên độ tổng không cộng đơn giản!). Verify số: tại $t = 0$, $x_1+x_2 = 3 + 0 = 3$ và $5\cos(53.13^\circ) = 5\cdot 0.6 = 3$ ✓.

**Ví dụ thực tế**: Mạch điện AC.
- $U_1 = 10\cos(100\pi t)$, phasor $Z_1 = 10$.
- $U_2 = 10\cos\left(100\pi t + \dfrac{\pi}{2}\right)$, phasor $Z_2 = 10e^{i\pi/2} = 10i$.
- Tổng phasor $= 10 + 10i$. $|Z| = 10\sqrt{2}$, $\arg = \dfrac{\pi}{4}$.
- → $U_{\text{tổng}} = 10\sqrt{2}\cos\left(100\pi t + \dfrac{\pi}{4}\right)$. Biên độ tổng $= 10\sqrt{2}$ chứ không phải 20.

⚠ **Lỗi thường gặp — cộng biên độ trực tiếp $A_1 + A_2$**. Hai dao động cùng tần số nhưng **lệch pha** cộng theo kiểu vector (qua phasor), không cộng số học. Phản ví dụ: $3\cos(\omega t) + 4\cos\left(\omega t + \dfrac{\pi}{2}\right)$ cho biên độ $|3 + 4i| = 5$, KHÔNG phải 7. Chỉ khi **cùng pha** ($\varphi_1 = \varphi_2$) mới được cộng thẳng $A_1+A_2$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phasor bỏ được $e^{i\omega t}$?"* Vì khi mọi dao động **cùng ω**, thừa số $e^{i\omega t}$ chung cho tất cả, có thể đặt ra ngoài tổng → chỉ còn cộng các phasor cố định. Tách xong cộng lại sau.
- *"Hai dao động khác tần số có dùng phasor được không?"* **Không** trực tiếp — phasor chỉ gọn khi cùng ω. Khác tần số phải xử lý riêng (hoặc Fourier).
- *"Khi nào tổng hai dao động cùng biên độ bằng 0?"* Khi ngược pha (lệch π) và cùng biên độ: $A\cos(\omega t) + A\cos(\omega t+\pi) = A - A = 0$ (giao thoa triệt tiêu).

🔁 **Dừng lại tự kiểm tra**

1. Phasor của $6\cos\left(\omega t + \dfrac{\pi}{2}\right)$ là gì?
2. Cộng $x_1 = 5\cos(\omega t)$ và $x_2 = 5\cos(\omega t + \pi)$. Biên độ tổng?

<details><summary>Đáp án</summary>

1. $Z = 6e^{i\pi/2} = 6i$.
2. $Z = 5 + 5e^{i\pi} = 5 - 5 = 0$ → biên độ tổng = **0** (triệt tiêu hoàn toàn).

</details>

### 📝 Tóm tắt mục 2

- Phasor $Ae^{i\varphi}$ thu gọn dao động $A\cos(\omega t+\varphi)$ (khi ω cố định).
- Cộng dao động cùng tần số = **cộng phasor** (cộng vector số phức), KHÔNG cộng biên độ thẳng.
- Biên độ tổng = mô-đun phasor tổng; chỉ dùng được khi các dao động cùng ω.

---

## 3. Sóng (Wave)

💡 **Trực giác / Hình dung**: dao động ở mục 1 chỉ "lên xuống tại chỗ" (phụ thuộc thời gian t). Sóng là dao động **lan ra không gian** — mỗi điểm x dao động, nhưng lệch pha so với điểm bên cạnh, tạo "vệt" di chuyển. Vì thế hàm sóng phụ thuộc **cả x lẫn t**: $y(x,t)$. Số sóng k đo "dao động theo không gian", ω đo "dao động theo thời gian".

Sóng = dao động truyền theo không gian:

$$y(x, t) = A\sin(kx - \omega t + \varphi)$$

- **$k$** = số sóng (rad/m). $\lambda = \dfrac{2\pi}{k}$ = bước sóng.
- **$\omega$** = tần số góc (rad/s).
- **vận tốc sóng $v = \dfrac{\omega}{k} = \lambda f$**.

**Ví dụ**: Sóng âm 440 Hz (nốt La). $f = 440$ → $\omega = 880\pi$. Trong không khí $v \approx 340$ m/s → $\lambda = \dfrac{340}{440} \approx 0.77$ m.

⚠ **Lỗi thường gặp — lẫn bước sóng λ với chu kỳ T**. λ là chu kỳ **theo không gian** (mét), T là chu kỳ **theo thời gian** (giây). Liên hệ: $v = \dfrac{\lambda}{T} = \lambda f$. Phản ví dụ: sóng 440 Hz có $T = \dfrac{1}{440} \approx 0.00227$s (thời gian) nhưng $\lambda \approx 0.77$m (không gian) — hai con số khác hẳn, đừng trộn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tần số cao thì bước sóng dài hay ngắn?"* Ngắn. Vì $\lambda = \dfrac{v}{f}$ (v cố định), f tăng → λ giảm. Nốt cao (f lớn) có bước sóng ngắn.
- *"Vì sao trong $kx - \omega t$ lại có dấu trừ?"* Dấu trừ cho sóng chạy **sang phải** (chiều +x). Dấu cộng ($kx + \omega t$) cho sóng chạy sang trái.

🔁 **Dừng lại tự kiểm tra**

1. Sóng âm 170 Hz trong không khí ($v = 340$ m/s). Bước sóng?
2. Bước sóng 2m, vận tốc 340 m/s. Tần số bao nhiêu?

<details><summary>Đáp án</summary>

1. $\lambda = \dfrac{v}{f} = \dfrac{340}{170} = 2$m.
2. $f = \dfrac{v}{\lambda} = \dfrac{340}{2} = 170$ Hz.

</details>

### 📝 Tóm tắt mục 3

- Sóng $y(x,t) = A\sin(kx - \omega t + \varphi)$ phụ thuộc cả không gian x và thời gian t.
- k = số sóng ($\lambda = \dfrac{2\pi}{k}$), ω = tần số góc; $v = \dfrac{\omega}{k} = \lambda f$.
- λ (không gian, mét) ≠ T (thời gian, giây) — đừng lẫn; f cao → λ ngắn.

---

## 4. Chuỗi Fourier — Preview

💡 **Trực giác / Hình dung**: tưởng tượng một "thợ lắp ráp âm thanh". Cho bất kỳ hình sóng tuần hoàn nào (kể cả sóng vuông có góc cạnh), Fourier nói: chỉ cần **chồng nhiều sóng sin/cos thuần** với tần số bội nhau (1×, 2×, 3×...) và biên độ thích hợp là tái tạo được. Sin/cos là "viên gạch lego" của mọi tín hiệu tuần hoàn.

🎯 **Định lý Fourier (1822)**: Mọi hàm tuần hoàn $f(x)$ chu kỳ 2π "đủ tốt" đều có thể viết:

$$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left[a_n\cos(nx) + b_n\sin(nx)\right]$$

Trong đó:
- $a_n = \dfrac{1}{\pi} \displaystyle\int_{-\pi}^{\pi} f(x)\cos(nx)\,dx$.
- $b_n = \dfrac{1}{\pi} \displaystyle\int_{-\pi}^{\pi} f(x)\sin(nx)\,dx$.

⟶ **Mọi tín hiệu = tổng các sóng sin/cos cơ bản**. Đây là nền tảng cho:
- **Nén ảnh JPEG** (Discrete Cosine Transform).
- **Nén nhạc MP3** (FFT).
- **Phân tích phổ** trong vật lý, kỹ thuật.

### Ví dụ trực quan: Sóng vuông

Hàm sóng vuông (square wave) $f(x) = 1$ nếu $0 < x < \pi$, $-1$ nếu $\pi < x < 2\pi$. Khai triển Fourier:

$$f(x) = \frac{4}{\pi}\left[\sin x + \frac{1}{3}\sin 3x + \frac{1}{5}\sin 5x + \frac{1}{7}\sin 7x + \ldots\right]$$

⟶ Càng nhiều số hạng, càng gần sóng vuông. Visualization sẽ minh họa điều này.

❓ **Vì sao kỳ lạ vậy?** Sin là hàm "mềm" mà tổng vô hạn cho ra hàm "có góc vuông"? Đáp: Hội tụ trong nghĩa trung bình, không hội tụ đều. Hiện tượng **Gibbs** — tại điểm gián đoạn, tổng riêng luôn dao động khoảng ~9% biên độ.

⚠ **Lỗi thường gặp — bỏ hệ số $\dfrac{a_0}{2}$ (thành phần một chiều)**. $\dfrac{a_0}{2}$ là **giá trị trung bình** của hàm trên một chu kỳ. Phản ví dụ: hàm $f(x) = 3 + \sin x$ có trung bình 3 → $\dfrac{a_0}{2} = 3$. Nếu bỏ, chuỗi Fourier dao động quanh 0 thay vì quanh 3 — sai mức nền.

❓ **Câu hỏi tự nhiên của người đọc (bổ sung)**

- *"Vì sao hàm lẻ chỉ có sin, hàm chẵn chỉ có cos?"* Hàm lẻ ($f(-x) = -f(x)$) đối xứng tâm như sin → các hệ số $a_n$ (của cos, vốn chẵn) đều bằng 0. Ngược lại hàm chẵn chỉ còn cos. Mẹo này giảm nửa khối lượng tính.
- *"'Đủ tốt' nghĩa là gì?"* Điều kiện Dirichlet: hàm bị chặn, có hữu hạn cực trị và điểm gián đoạn trong một chu kỳ. Hầu hết tín hiệu thực tế đều thỏa.

🔁 **Dừng lại tự kiểm tra**

1. Hàm $f(x) = x$ trên $[-\pi, \pi]$ là chẵn hay lẻ? Chuỗi Fourier chỉ chứa sin hay cos?
2. Trong khai triển sóng vuông, hệ số của $\sin 5x$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. Lẻ ($(-x) = -x$) → chỉ chứa **sin** (mọi $a_n = 0$).
2. $\dfrac{4}{\pi}\cdot\dfrac{1}{5} = \dfrac{4}{5\pi}$ (từ chuỗi $\dfrac{4}{\pi}\left[\sin x + \dfrac{\sin 3x}{3} + \dfrac{\sin 5x}{5} + \ldots\right]$).

</details>

### 📝 Tóm tắt mục 4

- Fourier: mọi hàm tuần hoàn "đủ tốt" $= \dfrac{a_0}{2} + \sum(a_n\cos nx + b_n\sin nx)$.
- $\dfrac{a_0}{2}$ = giá trị trung bình (đừng bỏ); hàm lẻ → chỉ sin, hàm chẵn → chỉ cos.
- Nền của JPEG, MP3, phân tích phổ; hiện tượng Gibbs (~9%) tại điểm gián đoạn.

---

## 5. Giải tam giác trong thực tế — góc nâng / góc hạ, đo đạc, điều hướng

Trước khi dao động và sóng dùng tới lượng giác "động" (theo thời gian), lượng giác trước hết dùng để **đo cái không với tới được**: chiều cao tòa nhà, khoảng cách qua sông, bề rộng hẻm núi. Công cụ là hai định lý đã học ở các lesson trước, áp vào tam giác **thật** trong bài toán.

💡 **Trực giác / Hình dung**: bạn đứng dưới đất, ngước nhìn đỉnh tháp. Bạn KHÔNG cầm thước leo lên đo được chiều cao tháp. Nhưng bạn đo được **khoảng cách tới chân tháp** (đi bộ, đếm bước) và đo được **góc ngước nhìn** (bằng giác kế / điện thoại). Lượng giác biến hai số "đo được dưới đất" thành chiều cao "không với tới" — vì trong tam giác vuông, $\tan(\text{góc}) = \dfrac{\text{cao}}{\text{xa}}$, biết góc và "xa" thì suy ra "cao".

### 5.1. Góc nâng và góc hạ (angle of elevation / depression)

> **Góc nâng (elevation)**: góc giữa **đường ngang** (tầm mắt) và **đường ngắm lên** một vật ở cao hơn.
> **Góc hạ (depression)**: góc giữa **đường ngang** và **đường ngắm xuống** một vật ở thấp hơn.

```
   Góc nâng (nhìn LÊN đỉnh cây)          Góc hạ (từ tháp nhìn XUỐNG thuyền)
                                                        
                  *  đỉnh                    mắt ●─────────  (đường ngang)
                 /|                              |⟍  θ  ← góc hạ đo TỪ đường ngang
                / |                              |  ⟍       xuống tầm ngắm
               /  | h (cao)                    H |    ⟍
              /θ  |  ← góc nâng                   |      ⟍
    mắt ●────────── (đường ngang)                 |        ⟍
        |←── d ──→|                          chân tháp     ● thuyền
                                                    |←── d ──→|
```

⚠ **Lỗi thường gặp #1 — nhầm góc nâng với góc hạ**. Cả hai đều đo **từ đường ngang**, KHÔNG phải từ đường thẳng đứng. Phản ví dụ: "tháp cao, nhìn xuống thuyền góc hạ $30^\circ$" nghĩa là đường ngắm chếch $30^\circ$ **dưới phương ngang** — góc giữa đường ngắm và **phương đứng** là $60^\circ$, đừng dùng nhầm $60^\circ$ vào $\tan$.

⚠ **Lỗi thường gặp #2 — góc hạ từ A xuống B = góc nâng từ B lên A**. Hai đường ngang (ở A và ở B) song song, đường ngắm AB là cát tuyến → hai góc **so le trong bằng nhau**. Tận dụng tính chất này để chuyển bài "nhìn xuống" thành "nhìn lên" khi tiện hơn.

### 5.2. Walk-through 4 bài toán thực tế — từng bước

**Bài toán 1 — chiều cao tòa nhà (tam giác vuông, dùng tan).** Đứng cách chân tòa nhà $d = 50$ m, đo góc nâng tới đỉnh là $\theta = 35^\circ$. Mắt người cao $1.6$ m. Tòa nhà cao bao nhiêu?

```
              * đỉnh
             /|
            / | h₁
           /  |
   mắt ●──────  ← cao 1.6 m so với đất
   35°  |← 50→|
```

- Trong tam giác vuông: $\tan 35^\circ = \dfrac{h_1}{d} \Rightarrow h_1 = d\tan 35^\circ = 50 \times 0.7002 = 35.01$ m.
- Đây là chiều cao **so với tầm mắt**. Cộng chiều cao mắt: $H = h_1 + 1.6 = 35.01 + 1.6 \approx \mathbf{36.6}$ m.
- Verify ngược: nếu $H = 36.6$, $h_1 = 35.0$, thì $\tan^{-1}(35.0/50) = \tan^{-1}(0.700) = 35.0^\circ$ ✓.

**Bài toán 2 — khoảng cách giữa 2 điểm qua sông (định lý sin).** Muốn đo khoảng cách $AB$ qua sông mà không bơi qua. Đứng tại C trên bờ, đo: $AC = 120$ m (đo dọc bờ), $\angle A = 65^\circ$, $\angle C = 78^\circ$. Tìm $AB$.

```
   A ●─────────────● C   bờ này
      ⟍ 65°    78°╱
        ⟍       ╱
          ⟍   ╱
            ● B   (bờ kia)
```

- Tổng 3 góc tam giác $= 180^\circ \Rightarrow \angle B = 180 - 65 - 78 = 37^\circ$.
- **Định lý sin**: $\dfrac{AB}{\sin C} = \dfrac{AC}{\sin B}$ (cạnh đối góc tương ứng).
$$AB = \dfrac{AC \cdot \sin C}{\sin B} = \dfrac{120 \times \sin 78^\circ}{\sin 37^\circ} = \dfrac{120 \times 0.9781}{0.6018} = \dfrac{117.4}{0.6018} \approx \mathbf{195.0}\text{ m}$$
- Verify hợp lý: $AB$ đối góc lớn ($78^\circ$) còn $AC$ đối góc nhỏ ($37^\circ$) → $AB > AC$, đúng ($195 > 120$).

**Bài toán 3 — góc giữa hai cạnh đã biết 3 cạnh (định lý cos).** Một mảnh đất tam giác 3 cạnh $a = 8$ m, $b = 6$ m, $c = 10$ m. Tìm góc $C$ (đối cạnh $c$).

- **Định lý cos**: $c^2 = a^2 + b^2 - 2ab\cos C \Rightarrow \cos C = \dfrac{a^2 + b^2 - c^2}{2ab}$.
$$\cos C = \dfrac{8^2 + 6^2 - 10^2}{2 \times 8 \times 6} = \dfrac{64 + 36 - 100}{96} = \dfrac{0}{96} = 0 \Rightarrow C = 90^\circ$$
- Đây chính là tam giác $3$-$4$-$5$ phóng to ($6$-$8$-$10$) → tam giác vuông. Định lý cos tự "phát hiện" ra góc vuông. Verify Pythagoras: $6^2 + 8^2 = 36 + 64 = 100 = 10^2$ ✓.

**Bài toán 4 — chiều cao núi đo từ 2 điểm (không tới được chân).** Không tới được chân núi. Đứng tại A đo góc nâng đỉnh $= 30^\circ$. Đi thẳng về phía núi $200$ m tới B, đo lại góc nâng $= 45^\circ$. Tìm chiều cao $h$.

```
                          * đỉnh
                        ╱ |
                      ╱   |
                    ╱     | h
                  ╱45°    |
   A ●─────────● B────────┘
   30°  200m   ←─ x ─→  (x = khoảng cách B→chân)
```

- Gọi $x$ = khoảng cách từ B tới chân núi. Hai tam giác vuông:
  - Từ B: $\tan 45^\circ = \dfrac{h}{x} \Rightarrow h = x$ (vì $\tan 45^\circ = 1$).
  - Từ A: $\tan 30^\circ = \dfrac{h}{x + 200} \Rightarrow h = (x + 200)\tan 30^\circ$.
- Thay $x = h$: $h = (h + 200) \times \dfrac{1}{\sqrt 3} \Rightarrow h\sqrt 3 = h + 200 \Rightarrow h(\sqrt 3 - 1) = 200$.
$$h = \dfrac{200}{\sqrt 3 - 1} = \dfrac{200(\sqrt 3 + 1)}{(\sqrt 3 - 1)(\sqrt 3 + 1)} = \dfrac{200(\sqrt 3 + 1)}{2} = 100(\sqrt 3 + 1) \approx \mathbf{273.2}\text{ m}$$
- Verify: $x = h = 273.2$. Từ A: $(273.2 + 200)\tan 30^\circ = 473.2 \times 0.5774 = 273.2$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng định lý sin, khi nào định lý cos?"* Quy tắc nhanh: biết **2 góc + 1 cạnh (AAS/ASA)** hoặc **2 cạnh + 1 góc đối (SSA)** → định lý sin. Biết **3 cạnh (SSS)** hoặc **2 cạnh + góc xen giữa (SAS)** → định lý cos. Mẹo: cos "mở khóa" được khi không có cặp (cạnh, góc đối) sẵn.
- *"Vì sao bài toán 4 cần đo từ 2 điểm?"* Vì không tới được chân núi nên không biết khoảng cách "xa" — một góc nâng đơn lẻ thiếu thông tin. Đo thêm điểm thứ hai cho phương trình thứ hai → giải được cả $h$ lẫn $x$.

### 5.3. Trường hợp mơ hồ SSA (ambiguous case)

⚠ **Lỗi thường gặp #3 — dùng định lý sin với SSA mà quên có thể 2 nghiệm**. Khi biết 2 cạnh và 1 **góc không xen giữa** (SSA), $\sin$ trả về một giá trị nhưng **hai góc** đều có cùng sin: $\sin\theta = \sin(180^\circ - \theta)$. Phải kiểm tra cả hai.

**Ví dụ số**: tam giác có $a = 7$, $b = 10$, $\angle A = 30^\circ$ (góc đối $a$). Tìm $\angle B$.
$$\dfrac{\sin B}{b} = \dfrac{\sin A}{a} \Rightarrow \sin B = \dfrac{b\sin A}{a} = \dfrac{10 \times 0.5}{7} = \dfrac{5}{7} \approx 0.714$$
- Nghiệm 1: $B = \arcsin(0.714) \approx 45.6^\circ$. Khi đó $\angle C = 180 - 30 - 45.6 = 104.4^\circ$ — hợp lệ.
- Nghiệm 2: $B = 180 - 45.6 = 134.4^\circ$. Khi đó $\angle C = 180 - 30 - 134.4 = 15.6^\circ$ — vẫn $> 0$, **cũng hợp lệ**!
- → Bài toán có **2 tam giác** thỏa. Nếu chỉ lấy $45.6^\circ$ là bỏ sót một đáp án. (Nghiệm 2 bị loại chỉ khi tổng góc vượt $180^\circ$.)

### 5.4. Điều hướng (bearing) và phân tích lực (vector)

**Bearing (phương vị)** = góc đo **theo chiều kim đồng hồ từ hướng Bắc**, viết 3 chữ số: hướng Đông là $090°$, Nam $180°$, Tây $270°$.

💡 Bài toán điều hướng = ghép các đoạn di chuyển thành tam giác/đa giác, rồi dùng định lý cos/sin tìm khoảng cách & hướng tổng.

**Ví dụ**: tàu đi $30$ km theo bearing $060°$, rồi $40$ km theo bearing $150°$. Hai hướng lệch nhau $150° - 60° = 90°$ → góc trong tại điểm rẽ là $90°$. Khoảng cách thẳng từ đầu tới cuối:
$$d = \sqrt{30^2 + 40^2} = \sqrt{900 + 1600} = \sqrt{2500} = 50\text{ km (Pythagoras vì góc }90°).$$

**Phân tích lực** — một lực $F$ nghiêng góc $\theta$ so với phương ngang tách thành 2 thành phần vuông góc:
$$F_x = F\cos\theta \quad (\text{ngang}), \qquad F_y = F\sin\theta \quad (\text{đứng}).$$
Ví dụ kéo vali bằng lực $F = 100$ N, tay cầm nghiêng $\theta = 30°$: thành phần kéo ngang $F_x = 100\cos 30° = 100 \times 0.866 = 86.6$ N (phần "thực sự kéo đi"); thành phần nâng $F_y = 100\sin 30° = 50$ N (phần "nhấc lên"). Verify: $\sqrt{86.6^2 + 50^2} = \sqrt{7500 + 2500} = \sqrt{10000} = 100$ N ✓ (khôi phục lại độ lớn lực).

⚠ **Lỗi thường gặp #4 — gắn $\cos$ cho đứng, $\sin$ cho ngang**. Quy ước chuẩn: thành phần **cùng phương với cạnh kề góc** dùng $\cos$, thành phần **đối góc** dùng $\sin$. Khi $\theta$ đo từ phương ngang → ngang là cạnh kề → $F_x = F\cos\theta$. Nếu lỡ đo $\theta$ từ phương đứng thì đảo lại — luôn vẽ hình trước.

🔁 **Dừng lại tự kiểm tra**

1. Đứng cách cột cờ $d = 30$ m, góc nâng đỉnh $40°$. Cột cao bao nhiêu (bỏ qua chiều cao mắt)?
2. Tam giác có $a = 5$, $b = 7$, $\angle C = 60°$ (góc xen giữa). Tìm cạnh $c$.
3. Lực $F = 200$ N nghiêng $53°$ so với ngang. Thành phần ngang?

<details><summary>Đáp án</summary>

1. $h = 30\tan 40° = 30 \times 0.8391 \approx 25.2$ m.
2. SAS → định lý cos: $c^2 = 5^2 + 7^2 - 2\cdot 5\cdot 7\cos 60° = 25 + 49 - 70\times 0.5 = 74 - 35 = 39 \Rightarrow c = \sqrt{39} \approx 6.24$.
3. $F_x = 200\cos 53° = 200 \times 0.6018 \approx 120.4$ N.

</details>

### 📝 Tóm tắt mục 5

- Góc nâng/hạ đo **từ phương ngang**; góc hạ A→B = góc nâng B→A (so le trong).
- Tam giác vuông: $\tan(\text{góc}) = \dfrac{\text{đối}}{\text{kề}}$ → đo chiều cao/khoảng cách "không với tới".
- AAS/ASA/SSA → **định lý sin**; SSS/SAS → **định lý cos**. SSA có thể cho **2 nghiệm** (ambiguous).
- Bearing đo theo kim đồng hồ từ Bắc (3 chữ số); phân tích lực: $F_x = F\cos\theta$, $F_y = F\sin\theta$.

---

## 6. Liên hệ Fourier ⟶ xử lý tín hiệu (preview)

💡 **Trực giác / Hình dung**: vì sao chỉ với sin/cos lại đủ làm nền cho cả ngành xử lý tín hiệu? Vì sin là **hàm riêng (eigenfunction)** của hầu hết hệ vật lý tuyến tính (lò xo, mạch RLC, dây đàn): cho một sin vào, ra vẫn là sin **cùng tần số** (chỉ đổi biên độ và pha). Không hình dạng nào khác có tính "bất biến hình dạng" này. Do đó phân tích bất kỳ tín hiệu nào thành tổng sin (Fourier) = phân tích thành các "viên gạch" mà hệ xử lý độc lập từng cái.

**Mạch tuần hoàn xử lý tín hiệu thực tế:**

1. **Lấy mẫu (sampling)**: thu âm = ghi giá trị sóng âm tại $44\,100$ điểm/giây (CD chuẩn). Định lý Nyquist: muốn ghi được tần số tối đa $f_{\max}$, phải lấy mẫu $\geq 2 f_{\max}$. Tai người nghe tới ~$20$ kHz → cần $\geq 40$ kHz → chọn $44.1$ kHz.
2. **Biến đổi Fourier (FFT)**: chuyển dãy mẫu theo **thời gian** thành phổ theo **tần số** — biết tín hiệu chứa các tần số nào, biên độ bao nhiêu. Đây là bước "tách màu" của âm thanh.
3. **Xử lý trong miền tần số**: tăng/giảm bass (boost tần thấp), lọc nhiễu (cắt tần không mong muốn), nén (bỏ tần tai không nghe rõ — nguyên lý MP3).
4. **Biến đổi ngược**: ghép tần số đã chỉnh trở lại sóng theo thời gian để phát ra loa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"FFT khác chuỗi Fourier ở mục 4 thế nào?"* Chuỗi Fourier dành cho hàm **liên tục, tuần hoàn** (tích phân). FFT (Fast Fourier Transform) là phiên bản **rời rạc, hữu hạn mẫu** (tổng hữu hạn), chạy nhanh $O(N\log N)$ thay vì $O(N^2)$ — đây là thuật toán làm cho DSP thời gian thực khả thi.
- *"Vì sao nén MP3 bỏ được dữ liệu mà tai không nhận ra?"* Vì sau FFT, có thể nhìn thấy các tần số bị **che (masking)** bởi tần số mạnh hơn ở gần — tai không phân biệt được, nên loại bỏ chúng không gây mất mát cảm nhận. Không có Fourier thì không "thấy" được phần thừa này.

### 📝 Tóm tắt mục 6

- Sin là eigenfunction của hệ tuyến tính → Fourier là công cụ phân tích tự nhiên.
- Chuỗi xử lý: lấy mẫu (Nyquist $\geq 2f_{\max}$) → FFT (thời gian → tần số) → xử lý → ngược lại.
- FFT = bản rời rạc $O(N\log N)$ của chuỗi Fourier; nền của MP3/JPEG/equalizer/lọc nhiễu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Dao động $x(t) = 5\cos\left(2\pi t + \dfrac{\pi}{3}\right)$. Tìm biên độ, chu kỳ, tần số.

**Bài 2**: Cộng 2 dao động $x_1 = 3\cos(\omega t)$, $x_2 = 4\cos\left(\omega t + \dfrac{\pi}{2}\right)$. Tìm biên độ dao động tổng.

**Bài 3**: Sóng âm 880 Hz (nốt La cao 1 quãng tám). Bước sóng trong không khí ($v = 340$ m/s)?

**Bài 4**: Phasor của dao động $2\cos\left(\omega t + \dfrac{\pi}{4}\right)$?

**Bài 5**: Khai triển Fourier của $f(x) = x$ trên $[-\pi, \pi]$?

**Bài 6** (góc nâng): Đứng cách chân tháp $d = 80$ m, đo góc nâng tới đỉnh $= 28°$. Mắt cao $1.5$ m. Tháp cao bao nhiêu?

**Bài 7** (định lý cos — SAS): Tam giác có $a = 9$, $b = 12$, góc xen giữa $\angle C = 110°$. Tìm cạnh $c$.

**Bài 8** (ambiguous SSA): Tam giác có $a = 6$, $b = 8$, $\angle A = 40°$. Tìm các giá trị có thể của $\angle B$. Có mấy tam giác?

**Bài 9** (phân tích lực): Lực $F = 150$ N nghiêng $40°$ so với phương ngang. Tìm thành phần ngang $F_x$ và đứng $F_y$, rồi verify khôi phục độ lớn.

### Lời giải

**Bài 1**: $A = 5$, $T = \dfrac{2\pi}{2\pi} = 1$s, $f = 1$ Hz.

**Bài 2**: Phasor: $Z_1 = 3$, $Z_2 = 4i$. $Z = 3 + 4i$. $|Z| = \sqrt{9+16} =$ **$5$**. Biên độ tổng $= 5$.

**Bài 3**: $\lambda = \dfrac{v}{f} = \dfrac{340}{880} \approx$ **$0.386$ m** (cao gấp đôi nốt La 440 → bước sóng giảm đôi).

**Bài 4**: $Z =$ **$2e^{i\pi/4} = \sqrt{2} + i\sqrt{2}$**.

**Bài 5**: f lẻ → $a_n = 0$. $b_n = \dfrac{1}{\pi}\displaystyle\int_{-\pi}^{\pi} x\sin(nx)\,dx = \dfrac{2(-1)^{n+1}}{n}$.  
→ $x = 2\left[\sin x - \dfrac{\sin 2x}{2} + \dfrac{\sin 3x}{3} - \ldots\right]$.

**Bài 6**: Tam giác vuông, $\tan 28° = \dfrac{h_1}{d} \Rightarrow h_1 = 80\tan 28° = 80 \times 0.5317 = 42.54$ m (so với tầm mắt). Cộng chiều cao mắt: $H = 42.54 + 1.5 \approx \mathbf{44.0}$ m. Verify: $\tan^{-1}(42.54/80) = \tan^{-1}(0.5317) = 28°$ ✓.

**Bài 7**: SAS → định lý cos.
$$c^2 = a^2 + b^2 - 2ab\cos C = 9^2 + 12^2 - 2\cdot 9\cdot 12\cos 110° = 81 + 144 - 216\times(-0.3420) = 225 + 73.9 = 298.9$$
→ $c = \sqrt{298.9} \approx \mathbf{17.29}$. (Góc tù $> 90°$ cho $\cos < 0$ nên $c$ lớn hơn cả $a, b$ — hợp lý.)

**Bài 8**: SSA. $\sin B = \dfrac{b\sin A}{a} = \dfrac{8\sin 40°}{6} = \dfrac{8\times 0.6428}{6} = \dfrac{5.142}{6} \approx 0.857$.
- Nghiệm 1: $B = \arcsin(0.857) \approx 58.99°$ → $\angle C = 180 - 40 - 59 = 81°$ (hợp lệ).
- Nghiệm 2: $B = 180 - 58.99 \approx 121.0°$ → $\angle C = 180 - 40 - 121 = 19°$ (vẫn $> 0$, hợp lệ).
- → Có **2 tam giác** thỏa ($B \approx 59°$ hoặc $B \approx 121°$). Đây là trường hợp mơ hồ — không bỏ sót nghiệm thứ hai.

**Bài 9**: $F_x = 150\cos 40° = 150 \times 0.766 = \mathbf{114.9}$ N; $F_y = 150\sin 40° = 150 \times 0.6428 = \mathbf{96.4}$ N. Verify: $\sqrt{114.9^2 + 96.4^2} = \sqrt{13202 + 9293} = \sqrt{22495} \approx 150.0$ N ✓.

---

## 8. 🎉 HOÀN THÀNH TIER 3 — TRIG & COMPLEX (8/8)!

Tiếp theo: **Tier 4 — Calculus 1-var** (giới hạn, đạo hàm, tích phân).

## 📝 Tổng kết Tier 3

1. **Radian** = ngôn ngữ chuẩn. $180^\circ = \pi$ rad.
2. **sin, cos, tan** qua đường tròn lượng giác.
3. **Đồng nhất thức**: cộng, nhân đôi, hạ bậc, tích↔tổng.
4. **PT lượng giác**: vô số nghiệm, $x = \alpha + k\cdot 2\pi$.
5. **Số phức**: $i^2 = -1$, $\mathbb{C}$ đóng cho mọi PT đa thức.
6. **Euler**: $e^{i\theta} = \cos\theta + i\sin\theta$. Đẹp nhất: $e^{i\pi} + 1 = 0$.
7. **De Moivre**: lũy thừa & căn → đa giác đều.
8. **Ứng dụng**: giải tam giác thực tế (góc nâng/hạ, định lý sin/cos, navigation, phân tích lực), dao động, sóng, phasor, Fourier ⟶ DSP (preview).

🎉 Đây là **nền tảng vào Calculus**. Tier 4 sẽ dùng radian + lượng giác liên tục.
