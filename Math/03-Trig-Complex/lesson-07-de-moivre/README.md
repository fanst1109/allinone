# Lesson 07 — Công thức De Moivre & căn bậc n

## Mục tiêu

- Hiểu **công thức De Moivre**: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$.
- Tính lũy thừa số phức nhanh (kể cả lũy thừa âm) bằng quy trình 3 bước.
- Tìm **n căn bậc n của 1** và của số phức bất kỳ bằng quy trình 4 bước.
- Hình dung n căn = n đỉnh đa giác đều nội tiếp đường tròn.
- Hiểu **nghiệm đơn vị (roots of unity)**, căn nguyên thủy $\omega$, và vai trò trong FFT.
- Dùng De Moivre như "máy sinh" công thức nhân đôi/nhân ba lượng giác.

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

### 1.1. Quy trình tính $z^n$ dạng cực — 3 bước

Mỗi khi cần tính lũy thừa số phức, đừng nhân trực tiếp. Chạy 3 bước:

> **Bước 1 — đổi sang dạng cực**: viết $z = a + bi$ thành $z = re^{i\theta}$, với $r = \sqrt{a^2+b^2}$ (mô-đun) và $\theta = \operatorname{atan2}(b, a)$ (argument).
>
> **Bước 2 — áp De Moivre**: $z^n = r^n e^{in\theta}$ — **nâng mô-đun lên mũ n**, **nhân n vào góc**.
>
> **Bước 3 — rút gọn góc + đổi về đại số** (nếu cần): trừ bớt bội của $2\pi$ cho $n\theta$ về $[0, 2\pi)$, rồi $z^n = r^n(\cos n\theta + i\sin n\theta)$.

#### 1.1.1. Walk-through 3 ví dụ tính $z^n$

**Ví dụ 1** — $(1+i)^{10}$ (đã nêu trên, làm lại đủ 3 bước):
- Bước 1: $r = \sqrt{1^2+1^2} = \sqrt{2}$, $\theta = \operatorname{atan2}(1,1) = \dfrac{\pi}{4}$ → $1+i = \sqrt{2}\,e^{i\pi/4}$.
- Bước 2: $(1+i)^{10} = (\sqrt{2})^{10}\,e^{i\cdot 10\cdot\pi/4} = 32\,e^{i\cdot 5\pi/2}$. Mô-đun $(\sqrt{2})^{10} = 2^5 = 32$ ✓.
- Bước 3: rút gọn góc $\dfrac{5\pi}{2} = 2\pi + \dfrac{\pi}{2}$ → $32\,e^{i\pi/2} = 32(\cos 90^\circ + i\sin 90^\circ) = 32(0 + i) =$ **$32i$**.
- Kiểm tra độc lập: $(1+i)^2 = 1 + 2i + i^2 = 2i$; $(2i)^5 = 2^5 i^5 = 32\cdot i = 32i$ ✓.

**Ví dụ 2** — $(\sqrt{3} + i)^6$:
- Bước 1: $r = \sqrt{3 + 1} = 2$, $\theta = \operatorname{atan2}(1, \sqrt{3}) = \dfrac{\pi}{6}$ (vì $\tan\theta = \dfrac{1}{\sqrt{3}}$) → $\sqrt{3}+i = 2e^{i\pi/6}$.
- Bước 2: $(\sqrt{3}+i)^6 = 2^6 e^{i\cdot 6\cdot\pi/6} = 64\,e^{i\pi}$.
- Bước 3: $64\,e^{i\pi} = 64(\cos 180^\circ + i\sin 180^\circ) = 64(-1 + 0) =$ **$-64$**.
- Kiểm tra: $(\sqrt 3 + i)^2 = 3 + 2\sqrt3\,i + i^2 = 2 + 2\sqrt3\,i$; mô-đun $|2+2\sqrt3 i| = \sqrt{4+12} = 4 = 2^2$ ✓ (khớp $r^2$).

**Ví dụ 3** — $(2e^{i\pi/3})^4$ (đã ở dạng cực sẵn → bỏ qua bước 1):
- Bước 2: $= 2^4 e^{i\cdot 4\cdot\pi/3} = 16\,e^{i\cdot 4\pi/3}$.
- Bước 3: $\dfrac{4\pi}{3} = 240^\circ$ → $16(\cos 240^\circ + i\sin 240^\circ) = 16\left(-\dfrac{1}{2} - i\dfrac{\sqrt 3}{2}\right) =$ **$-8 - 8\sqrt 3\,i$**.

**Ví dụ 4** — lũy thừa **âm** $(1+i)^{-2}$ (De Moivre đúng với n nguyên âm):
- $(1+i)^{-2} = (\sqrt 2\,e^{i\pi/4})^{-2} = (\sqrt 2)^{-2} e^{-i\pi/2} = \dfrac{1}{2}\,e^{-i\pi/2} = \dfrac{1}{2}(\cos(-90^\circ) + i\sin(-90^\circ)) = \dfrac{1}{2}(0 - i) =$ **$-\dfrac{i}{2}$**.
- Kiểm tra: $(1+i)^2 = 2i$ nên $(1+i)^{-2} = \dfrac{1}{2i} = \dfrac{1}{2i}\cdot\dfrac{-i}{-i} = \dfrac{-i}{2}$ ✓.

⚠ **Lỗi thường gặp**: Quên nhân n vào θ. $(e^{i\theta})^n = e^{in\theta}$, KHÔNG phải $e^{i\theta}$.

⚠ **Lỗi thường gặp 2 — quên nâng cả mô-đun lên lũy thừa n**. $(re^{i\theta})^n = r^n e^{in\theta}$ — mô-đun thành $r^n$, KHÔNG giữ nguyên r. Phản ví dụ: $(1+i)^4 = (\sqrt{2}\,e^{i\pi/4})^4 = (\sqrt{2})^4 e^{i\pi} = 4\cdot(-1) = -4$; nếu quên mũ mô-đun ra $\sqrt{2}\,e^{i\pi} = -\sqrt{2}$ → sai.

⚠ **Lỗi thường gặp 3 — quên rút gọn góc về $[0, 2\pi)$**. Sau khi nhân $n\theta$ thường ra góc lớn (vd $\dfrac{5\pi}{2}$, $\dfrac{13\pi}{3}$). Phải trừ bội $2\pi$ trước khi đọc $\cos/\sin$. Phản ví dụ: $\cos\dfrac{5\pi}{2}$ — nếu không rút về $\dfrac{\pi}{2}$ mà bấm máy nhầm $\dfrac{5\pi}{2}\approx 7.85$ rad theo độ → sai. Đúng: $\dfrac{5\pi}{2} - 2\pi = \dfrac{\pi}{2}$ → $\cos = 0$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"De Moivre đúng với n âm hay phân số không?"* Với **n nguyên** (cả âm) luôn đúng. Với n phân số ($1/k$) thì cho **một** trong nhiều căn — phải dùng công thức căn (mục 4) để lấy đủ tất cả nghiệm.
- *"Vì sao De Moivre nhanh hơn nhân trực tiếp?"* Nhân $(a+bi)^{10}$ trực tiếp phải khai triển 10 lần, bùng nổ số hạng. De Moivre chỉ cần $r^{10}$ và $10\theta$ — 3 dòng.

🔁 **Dừng lại tự kiểm tra**

1. Tính $(\cos 20^\circ + i\sin 20^\circ)^9$.
2. Tính $(2e^{i\pi/6})^3$.
3. Tính $(1 - i\sqrt 3)^4$ (đổi sang cực rồi De Moivre).

<details><summary>Đáp án</summary>

1. $= \cos(9\cdot 20^\circ) + i\sin(9\cdot 20^\circ) = \cos 180^\circ + i\sin 180^\circ = -1$.
2. $= 2^3 e^{i\cdot 3\cdot\pi/6} = 8e^{i\pi/2} = 8i$.
3. $1 - i\sqrt 3$: $r = \sqrt{1+3} = 2$, $\theta = \operatorname{atan2}(-\sqrt3, 1) = -\dfrac{\pi}{3}$ → $2e^{-i\pi/3}$. Lũy thừa 4: $2^4 e^{-i\cdot 4\pi/3} = 16\,e^{-i\cdot 4\pi/3}$. Rút gọn: $-\dfrac{4\pi}{3} + 2\pi = \dfrac{2\pi}{3}$ → $16(\cos 120^\circ + i\sin 120^\circ) = 16\left(-\dfrac{1}{2} + i\dfrac{\sqrt3}{2}\right) = -8 + 8\sqrt3\,i$.

</details>

### 📝 Tóm tắt mục 1

- $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$; tổng quát $(re^{i\theta})^n = r^n e^{in\theta}$.
- Là hệ quả trực tiếp của Euler; lũy thừa = quay n lần = nhân góc.
- Nhớ nâng **cả mô-đun** lên mũ n và **nhân n vào θ**.

---

## 2. Khai triển cos(nθ), sin(nθ) qua sin/cos

💡 **Trực giác / Hình dung**: De Moivre cho hai cách viết cùng một số phức $(\cos\theta + i\sin\theta)^n$. Vế trái khai triển bằng nhị thức Newton thành đa thức của $\sin\theta$, $\cos\theta$. Vế phải là $\cos n\theta + i\sin n\theta$. **So phần thực với phần thực, phần ảo với phần ảo** → tự rơi ra công thức nhân n. Đây là "máy sinh công thức" lượng giác.

Áp dụng De Moivre + nhị thức Newton để chứng minh các đồng nhất thức nhân đôi, nhân ba...

### 2.1. Quy trình "máy sinh công thức" — 4 bước

> **Bước 1**: viết $(\cos\theta + i\sin\theta)^n$, khai triển vế trái bằng **nhị thức Newton** $\displaystyle\sum_{k=0}^{n}\binom{n}{k}\cos^{n-k}\theta\,(i\sin\theta)^k$.
>
> **Bước 2**: thay $i^k$ theo chu kỳ 4: $i^0=1,\ i^1=i,\ i^2=-1,\ i^3=-i,\ i^4=1,\ldots$
>
> **Bước 3**: gom **phần thực** (các số hạng $i^{\text{chẵn}}$) và **phần ảo** (các số hạng $i^{\text{lẻ}}$).
>
> **Bước 4**: đối chiếu với vế phải $\cos n\theta + i\sin n\theta$ → phần thực $= \cos n\theta$, phần ảo $= \sin n\theta$.

Bảng tra $i^k$ (dùng ở bước 2):

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|---|
| $i^k$ | $1$ | $i$ | $-1$ | $-i$ | $1$ | $i$ | $-1$ |
| Thuộc về | thực | ảo | thực | ảo | thực | ảo | thực |

### 2.2. Walk-through: dẫn $\cos 2\theta$, $\sin 2\theta$ (n = 2)

$$\begin{aligned}
(\cos\theta + i\sin\theta)^2 &= \cos^2\theta + 2\cos\theta(i\sin\theta) + (i\sin\theta)^2 \\
&= \cos^2\theta + 2i\cos\theta\sin\theta + i^2\sin^2\theta \\
&= \underbrace{(\cos^2\theta - \sin^2\theta)}_{\text{phần thực}} + i\,\underbrace{(2\cos\theta\sin\theta)}_{\text{phần ảo}}
\end{aligned}$$

Đối chiếu với $\cos 2\theta + i\sin 2\theta$:
- **$\cos 2\theta = \cos^2\theta - \sin^2\theta$** (và biến thể $= 2\cos^2\theta - 1 = 1 - 2\sin^2\theta$).
- **$\sin 2\theta = 2\sin\theta\cos\theta$**.

**Verify bằng số ($\theta = 30^\circ$)**: $\sin 60^\circ = \dfrac{\sqrt3}{2}$; vế phải $2\sin 30^\circ\cos 30^\circ = 2\cdot\dfrac12\cdot\dfrac{\sqrt3}{2} = \dfrac{\sqrt3}{2}$ ✓.

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

Chú thích bước thay $i^k$: số hạng thứ 2 có $i^1 = i$ (→ ảo), số hạng thứ 3 có $i^2 = -1$ (→ thực, đổi dấu), số hạng cuối có $i^3 = -i$ (→ ảo, đổi dấu). Đó là vì sao $-3\cos\theta\sin^2\theta$ (từ $i^2$) rơi vào $\cos 3\theta$, còn $-\sin^3\theta$ (từ $i^3$) rơi vào $\sin 3\theta$.

Để ra dạng "thuần một hàm", dùng $\sin^2\theta = 1 - \cos^2\theta$ và $\cos^2\theta = 1 - \sin^2\theta$:
$$\cos 3\theta = \cos^3\theta - 3\cos\theta(1-\cos^2\theta) = 4\cos^3\theta - 3\cos\theta, \quad \sin 3\theta = 3(1-\sin^2\theta)\sin\theta - \sin^3\theta = 3\sin\theta - 4\sin^3\theta.$$

**Verify $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ bằng số** — thử 4 giá trị:
- $\theta = 0$: vế trái $\cos 0 = 1$; vế phải $4\cdot 1^3 - 3\cdot 1 = 1$ ✓.
- $\theta = \dfrac{\pi}{3}$: vế trái $\cos\pi = -1$; vế phải $4\left(\dfrac{1}{2}\right)^3 - 3\left(\dfrac{1}{2}\right) = \dfrac{1}{2} - \dfrac{3}{2} = -1$ ✓.
- $\theta = \dfrac{\pi}{2}$: vế trái $\cos\dfrac{3\pi}{2} = 0$; vế phải $4\cdot 0^3 - 3\cdot 0 = 0$ ✓.
- $\theta = \dfrac{\pi}{6}$: vế trái $\cos\dfrac{\pi}{2} = 0$; vế phải $4\left(\dfrac{\sqrt3}{2}\right)^3 - 3\cdot\dfrac{\sqrt3}{2} = 4\cdot\dfrac{3\sqrt3}{8} - \dfrac{3\sqrt3}{2} = \dfrac{3\sqrt3}{2} - \dfrac{3\sqrt3}{2} = 0$ ✓.

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

**ASCII — 3 căn bậc 3 của 1 trên đường tròn đơn vị** (cách đều $120^\circ$):

```
                 Im
                 │
       z₁ •......│           z₁ = e^{i120°} = −½ + (√3/2)i
        (120°)\  │
               \ │
   ─────────────●──────•──── Re
               /│      z₀ = e^{i0°} = 1
              / │
       z₂ •.../  │           z₂ = e^{i240°} = −½ − (√3/2)i
        (240°)  │

   3 đỉnh tam giác đều · cách nhau 360°/3 = 120° · cùng bán kính 1
```

❓ **Vì sao đa giác đều?** Vì n căn cùng mô-đun $r=1$, argument chia đều quanh đường tròn cứ $\dfrac{2\pi}{n}$.

### Trường hợp n=4:
$z = 1, i, -1, -i$ → 4 đỉnh hình vuông. Walk-through: $z^4 = 1 = e^{i\cdot 0}$ → $z_k = e^{i\cdot 2k\pi/4} = e^{i k\pi/2}$, $k=0,1,2,3$:
- $z_0 = e^{i0} = 1$; $z_1 = e^{i\pi/2} = i$; $z_2 = e^{i\pi} = -1$; $z_3 = e^{i\cdot 3\pi/2} = -i$.

```
              Im
              │ • z₁ = i
              │
   z₂ = −1 •──●──• z₀ = 1   Re
              │
              │ • z₃ = −i
       4 đỉnh hình vuông · cách nhau 90°
```

### Trường hợp n=6:
$z = e^{i\cdot k\pi/3}$, $k=0..5$ → 6 đỉnh lục giác đều: $1,\ \dfrac12+\dfrac{\sqrt3}{2}i,\ -\dfrac12+\dfrac{\sqrt3}{2}i,\ -1,\ -\dfrac12-\dfrac{\sqrt3}{2}i,\ \dfrac12-\dfrac{\sqrt3}{2}i$, cách nhau $60^\circ$.

### 3.1. Nghiệm đơn vị (roots of unity) — ký hiệu $\omega$ và tính chất

💡 **Trực giác**: trong n căn bậc n của 1, nghiệm $z_1 = e^{i\cdot 2\pi/n}$ đóng vai trò "bước quay đơn vị" — nhân thêm $z_1$ = quay tiếp một góc $\dfrac{2\pi}{n}$. Mọi nghiệm khác chỉ là **lũy thừa** của nó. Đặt $\omega = e^{i\cdot 2\pi/n}$ (gọi là **căn nguyên thủy**, primitive root of unity), thì:

$$z_k = \omega^k, \quad k = 0, 1, \ldots, n-1 \quad\Rightarrow\quad \{1, \omega, \omega^2, \ldots, \omega^{n-1}\}.$$

> 📐 **Định nghĩa đầy đủ — căn nguyên thủy bậc n của 1**
>
> **(a) Là gì**: $\omega = e^{i\cdot 2\pi/n}$ — nghiệm "đầu tiên sau số 1", có argument nhỏ nhất dương. Quay nó liên tiếp sinh ra **toàn bộ** n nghiệm.
>
> **(b) Vì sao cần**: thay vì viết n biểu thức $e^{i\cdot 2k\pi/n}$ rời rạc, gói gọn thành lũy thừa $\omega^k$ — đại số gọn, phơi bày cấu trúc nhóm tuần hoàn (cyclic group). Đây chính là cấu trúc mà **FFT** khai thác để chia-để-trị $O(n\log n)$.
>
> **(c) Ví dụ số**: $n=4$ → $\omega = e^{i\pi/2} = i$, nên 4 nghiệm là $\{i^0, i^1, i^2, i^3\} = \{1, i, -1, -i\}$ ✓. $n=3$ → $\omega = e^{i\cdot 2\pi/3} = -\dfrac12 + \dfrac{\sqrt3}{2}i$, 3 nghiệm $\{1, \omega, \omega^2\}$.

**Walk-through ví dụ 1 — sinh 3 nghiệm bằng lũy thừa $\omega$ ($n=3$)**: $\omega = e^{i\cdot 2\pi/3}$.
- $\omega^0 = 1$.
- $\omega^1 = e^{i\cdot 2\pi/3} = -\dfrac12 + \dfrac{\sqrt3}{2}i$.
- $\omega^2 = e^{i\cdot 4\pi/3} = -\dfrac12 - \dfrac{\sqrt3}{2}i$.
- $\omega^3 = e^{i\cdot 2\pi} = 1 = \omega^0$ → quay lại đầu (chu kỳ n).

**Walk-through ví dụ 2 — sinh 4 nghiệm bằng lũy thừa $\omega$ ($n=4$)**: $\omega = i$.
- $i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$ (lặp lại). Đúng 4 nghiệm phân biệt.

**Hai tính chất quan trọng** (verify bằng số dưới):
1. **Tổng bằng 0** ($n\ge 2$): $1 + \omega + \omega^2 + \cdots + \omega^{n-1} = 0$. Lý do đại số: tổng cấp số nhân $\dfrac{\omega^n - 1}{\omega - 1} = \dfrac{1-1}{\omega-1} = 0$ (vì $\omega^n = 1$). Lý do hình học: n vector đối xứng quanh tâm triệt tiêu.
2. **Tích các nghiệm**: $\displaystyle\prod_{k=0}^{n-1}\omega^k = \omega^{0+1+\cdots+(n-1)} = \omega^{n(n-1)/2}$.

⚠ **Lỗi thường gặp — nghĩ "căn nguyên thủy là số 1"**. Số $1 = \omega^0$ KHÔNG nguyên thủy (quay $1$ mãi vẫn ra $1$, không sinh được nghiệm khác). Căn nguyên thủy phải có chu kỳ đúng bằng n. Vd $n=4$: $\omega = i$ nguyên thủy (chu kỳ 4), nhưng $-1 = \omega^2$ chỉ chu kỳ 2 → không nguyên thủy.

⚠ **Lỗi thường gặp — chỉ lấy 1 nghiệm thực (= 1) mà bỏ các nghiệm phức**. $z^n = 1$ có **n** nghiệm, không phải 1. Phản ví dụ: $z^3 = 1$ không chỉ có $z = 1$ — còn $z = -\dfrac{1}{2} \pm \dfrac{\sqrt{3}}{2}i$. Kiểm: $\left(-\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}i\right)^3 = 1$ (quay 120° ba lần = 360° về 1). Bỏ chúng là mất 2/3 nghiệm.

⚠ **Lỗi thường gặp 2 — cho k chạy tới n (lặp nghiệm)**. k chỉ chạy $0, 1, \ldots, n-1$ (đúng n giá trị). Tại $k = n$: $e^{i\cdot 2n\pi/n} = e^{i2\pi} = 1 = z_0$ — trùng lại. Đừng đếm dư.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tổng tất cả n căn bậc n của 1 bằng mấy?"* Bằng **0** (với $n \ge 2$) — vì các đỉnh đa giác đều phân bố đối xứng quanh tâm, vector cộng triệt tiêu. Vd n=3: $1 + \left(-\dfrac{1}{2}+\dfrac{\sqrt{3}}{2}i\right) + \left(-\dfrac{1}{2}-\dfrac{\sqrt{3}}{2}i\right) = 0$.
- *"Căn bậc n của 1 dùng để làm gì thực tế?"* Là "root of unity" — nền tảng của **FFT** (biến đổi Fourier nhanh, dùng trong nén ảnh/nhạc, xử lý tín hiệu).

🔁 **Dừng lại tự kiểm tra**

1. Liệt kê 4 căn bậc 4 của 1.
2. Tổng 4 căn đó bằng mấy?
3. Với $n=3$, viết $\omega^4$ về dạng $\omega^k$ với $0\le k<3$.
4. Verify tổng 3 căn bậc 3 của 1 bằng 0 bằng số.

<details><summary>Đáp án</summary>

1. $z_k = e^{i\cdot k\pi/2}$, $k=0..3$ → $1, i, -1, -i$.
2. $1 + i + (-1) + (-i) = 0$.
3. $\omega^4 = \omega^{4 \bmod 3} = \omega^1 = \omega$ (chu kỳ 3).
4. $1 + \left(-\dfrac12+\dfrac{\sqrt3}{2}i\right) + \left(-\dfrac12-\dfrac{\sqrt3}{2}i\right) = (1 - \dfrac12 - \dfrac12) + i(\dfrac{\sqrt3}{2} - \dfrac{\sqrt3}{2}) = 0 + 0i = 0$ ✓.

</details>

### 📝 Tóm tắt mục 3

- $z^n = 1$ có **n** nghiệm: $z_k = e^{i\cdot 2k\pi/n}$, $k = 0..n-1$.
- n nghiệm cách đều quanh đường tròn đơn vị = n đỉnh đa giác đều.
- Gọn lại: $z_k = \omega^k$ với $\omega = e^{i\cdot 2\pi/n}$ (căn nguyên thủy).
- Tổng n căn ($n\ge 2$) = 0; là "root of unity", nền của FFT.

---

## 4. Căn bậc n của số phức bất kỳ

💡 **Trực giác / Hình dung**: căn bậc n của một số phức $w$ = "ngược" phép lũy thừa: tìm các z mà $z^n = w$. Hình học: tất cả nằm trên đường tròn bán kính $R^{1/n}$ (căn bậc n thực của mô-đun w), chia đều argument. Giống căn của 1 nhưng (a) đường tròn không nhất thiết bán kính 1, (b) "đỉnh đầu tiên" lệch đi $\dfrac{\varphi}{n}$ thay vì 0.

**Tổng quát**: $z^n = w$ (với $w = Re^{i\varphi}$).

**n nghiệm**:

$$z_k = R^{1/n} \, e^{i(\varphi + 2k\pi)/n}, \quad k = 0, 1, \ldots, n-1$$

- Mô-đun: tất cả đều bằng **$R^{1/n}$** (căn bậc n thực của R).
- Argument: chia đều quanh đường tròn, mỗi nghiệm cách nhau $\dfrac{2\pi}{n}$.

### 4.1. Quy trình tìm n căn bậc n — 4 bước

> **Bước 1 — đổi w sang cực**: $w = Re^{i\varphi}$ với $R = |w|$, $\varphi = \arg w$.
>
> **Bước 2 — mô-đun nghiệm**: mọi nghiệm có cùng mô-đun $\rho = R^{1/n}$ (căn bậc n **thực** của R).
>
> **Bước 3 — góc nghiệm đầu + bước đều**: nghiệm đầu có góc $\dfrac{\varphi}{n}$; mỗi nghiệm tiếp theo cộng thêm $\dfrac{2\pi}{n}$. Tổng quát góc thứ k là $\dfrac{\varphi + 2k\pi}{n}$, $k = 0..n-1$.
>
> **Bước 4 — viết ra n nghiệm** (đổi về đại số nếu cần).

So với căn của 1 (mục 3): chỉ khác ở **bán kính** ($R^{1/n}$ thay vì 1) và **góc lệch ban đầu** ($\dfrac{\varphi}{n}$ thay vì 0). "Bước đều" $\dfrac{2\pi}{n}$ thì y hệt.

#### 4.1.1. Walk-through ví dụ 1 — căn bậc 3 của $-8$

- Bước 1: $-8 = 8e^{i\pi}$ → $R = 8$, $\varphi = \pi$.
- Bước 2: $\rho = 8^{1/3} = 2$.
- Bước 3: góc đầu $\dfrac{\pi}{3}$, bước đều $\dfrac{2\pi}{3}$ → $z_k = 2e^{i(\pi + 2k\pi)/3} = 2e^{i(2k+1)\pi/3}$, $k=0,1,2$.
- Bước 4:
  - $z_0 = 2e^{i\pi/3} = 2\left(\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}\right) =$ **$1 + i\sqrt{3}$**.
  - $z_1 = 2e^{i\pi} =$ **$-2$**.
  - $z_2 = 2e^{i\cdot 5\pi/3} =$ **$1 - i\sqrt{3}$**.

**Kiểm tra**: $(-2)^3 = -8$ ✓. $(1+i\sqrt{3})^3$: mô-đun $2^3 = 8$, góc $3\cdot 60^\circ = 180^\circ$ → $8e^{i\pi} = -8$ ✓.

**ASCII — 3 căn bậc 3 của $-8$** (bán kính $\rho = 2$, cách đều $120^\circ$):

```
                 Im
                 │   • z₀ = 1 + √3·i   (góc 60°)
                 │  /
                 │ /
   z₁ = −2 •─────●─────  Re   (bán kính = ∛8 = 2)
                 │ \
                 │  \
                 │   • z₂ = 1 − √3·i   (góc 300°)

   3 đỉnh tam giác đều · bán kính 2 (KHÁC 1) · cách nhau 120°
```

#### 4.1.2. Walk-through ví dụ 2 — căn bậc 4 của $-16$

- Bước 1: $-16 = 16e^{i\pi}$ → $R = 16$, $\varphi = \pi$.
- Bước 2: $\rho = 16^{1/4} = 2$.
- Bước 3: góc đầu $\dfrac{\pi}{4}$, bước đều $\dfrac{2\pi}{4} = \dfrac{\pi}{2}$ → $z_k = 2e^{i(\pi + 2k\pi)/4}$, $k=0,1,2,3$.
- Bước 4:
  - $z_0 = 2e^{i\pi/4} = 2\left(\dfrac{\sqrt2}{2}+\dfrac{\sqrt2}{2}i\right) = \sqrt2 + \sqrt2\,i$.
  - $z_1 = 2e^{i\cdot 3\pi/4} = -\sqrt2 + \sqrt2\,i$.
  - $z_2 = 2e^{i\cdot 5\pi/4} = -\sqrt2 - \sqrt2\,i$.
  - $z_3 = 2e^{i\cdot 7\pi/4} = \sqrt2 - \sqrt2\,i$.
- Kiểm tra $z_0$: $(\sqrt2+\sqrt2 i)^2 = 2 + 4i + 2i^2 = 4i$; $(4i)^2 = -16$ ✓.

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

### 5.1. Hạ bậc lũy thừa lượng giác (power reduction) bằng công thức mũ

💡 **Trực giác**: muốn tích phân $\cos^2\theta$, $\cos^3\theta$, ... ta cần hạ chúng về tổng các $\cos(k\theta)$ bậc 1. Thay $\cos\theta = \dfrac{e^{i\theta}+e^{-i\theta}}{2}$ rồi khai triển — De Moivre lại làm "máy biến đổi" theo chiều ngược.

**Walk-through — hạ $\cos^2\theta$**:
$$\begin{aligned}
\cos^2\theta &= \left(\frac{e^{i\theta}+e^{-i\theta}}{2}\right)^2 = \frac{e^{2i\theta} + 2 + e^{-2i\theta}}{4} \\
&= \frac{1}{4}\left(\underbrace{e^{2i\theta}+e^{-2i\theta}}_{2\cos 2\theta} + 2\right) = \frac{2\cos 2\theta + 2}{4} = \frac{1 + \cos 2\theta}{2}.
\end{aligned}$$
**Verify ($\theta = 0$)**: vế trái $\cos^2 0 = 1$; vế phải $\dfrac{1 + \cos 0}{2} = \dfrac{1+1}{2} = 1$ ✓. ($\theta = \dfrac{\pi}{2}$): vế trái $0$; vế phải $\dfrac{1 + \cos\pi}{2} = \dfrac{1-1}{2} = 0$ ✓.

### 5.2. Ứng dụng — nghiệm đơn vị là trái tim của FFT

💡 **Vì sao "căn bậc n của 1" lại quan trọng đến mức có hẳn thuật toán riêng?** Biến đổi Fourier rời rạc (DFT) tính $X_k = \sum_{j=0}^{n-1} x_j\,\omega^{-jk}$ với $\omega = e^{i\cdot 2\pi/n}$ — đúng các nghiệm đơn vị ở mục 3.1. Trực tiếp tốn $O(n^2)$. **FFT** khai thác tính chất $\omega^{2} = $ căn nguyên thủy bậc $n/2$ (chia đôi bài toán đệ quy) → chỉ còn $O(n\log n)$. Đó là lý do nén ảnh JPEG, nén nhạc MP3, lọc tín hiệu, nhân số nguyên lớn... đều chạy được nhanh. Tất cả bắt rễ từ n điểm cách đều trên đường tròn đơn vị mà bài này dựng ra.

| Lĩnh vực | Vai trò của nghiệm đơn vị |
|---|---|
| FFT / DFT | $\omega^{jk}$ là "hệ số xoay" (twiddle factor) |
| Nén JPEG/MP3 | DCT/DFT phân tích tín hiệu thành tần số |
| Nhân đa thức nhanh | Tích chập qua FFT, $O(n\log n)$ |
| Mật mã (NTT) | Biến thể FFT trên trường hữu hạn |

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

**Bài 6**: Tính $(\sqrt 3 + i)^5$ (đổi sang cực rồi De Moivre).

**Bài 7**: Tính $(1+i)^{-4}$ (lũy thừa nguyên âm).

**Bài 8**: Tìm các căn bậc 4 của $-1$ (viết dạng đại số) và mô tả vị trí trên đường tròn.

**Bài 9**: Cho $\omega = e^{i\cdot 2\pi/5}$ (căn nguyên thủy bậc 5 của 1). Tính tổng $1 + \omega + \omega^2 + \omega^3 + \omega^4$ và giải thích bằng hình học.

**Bài 10**: Dùng De Moivre, dẫn công thức $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$.

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

**Bài 6**: $\sqrt 3 + i = 2e^{i\pi/6}$ ($r = 2$, $\theta = 30^\circ$). $(\sqrt3+i)^5 = 2^5 e^{i\cdot 5\pi/6} = 32\,e^{i\cdot 150^\circ} = 32\left(-\dfrac{\sqrt3}{2} + \dfrac{1}{2}i\right) =$ **$-16\sqrt3 + 16i$**.

**Bài 7**: $1+i = \sqrt2\,e^{i\pi/4}$. $(1+i)^{-4} = (\sqrt2)^{-4} e^{-i\pi} = \dfrac{1}{4}(-1) =$ **$-\dfrac{1}{4}$**. Kiểm: $(1+i)^2 = 2i$, $(1+i)^4 = (2i)^2 = -4$, nghịch đảo $= -\dfrac14$ ✓.

**Bài 8**: $-1 = 1\cdot e^{i\pi}$. $z_k = 1^{1/4} e^{i(\pi + 2k\pi)/4} = e^{i(2k+1)\pi/4}$, $k=0,1,2,3$:
- $z_0 = e^{i\pi/4} = \dfrac{\sqrt2}{2} + \dfrac{\sqrt2}{2}i$.
- $z_1 = e^{i\cdot 3\pi/4} = -\dfrac{\sqrt2}{2} + \dfrac{\sqrt2}{2}i$.
- $z_2 = e^{i\cdot 5\pi/4} = -\dfrac{\sqrt2}{2} - \dfrac{\sqrt2}{2}i$.
- $z_3 = e^{i\cdot 7\pi/4} = \dfrac{\sqrt2}{2} - \dfrac{\sqrt2}{2}i$.

→ 4 đỉnh hình vuông trên đường tròn đơn vị, **xoay $45^\circ$** so với 4 căn bậc 4 của 1 (vì góc đầu $\dfrac{\pi}{4}$ thay vì 0). Kiểm $z_0^4$: góc $4\cdot 45^\circ = 180^\circ$, mô-đun 1 → $e^{i\pi} = -1$ ✓.

**Bài 9**: Tổng $= 0$. Đại số: cấp số nhân $\dfrac{\omega^5 - 1}{\omega - 1} = \dfrac{1 - 1}{\omega - 1} = 0$ (vì $\omega^5 = e^{i\cdot 2\pi} = 1$). Hình học: 5 đỉnh ngũ giác đều phân bố đối xứng quanh tâm O → tổng các vector vị trí triệt tiêu (trọng tâm trùng tâm).

**Bài 10**: Khai triển $(\cos\theta + i\sin\theta)^3$ (như mục 2):
$$(\cos\theta+i\sin\theta)^3 = (\cos^3\theta - 3\cos\theta\sin^2\theta) + i(3\cos^2\theta\sin\theta - \sin^3\theta).$$
Phần ảo $= \sin 3\theta = 3\cos^2\theta\sin\theta - \sin^3\theta$. Thay $\cos^2\theta = 1 - \sin^2\theta$:
$$\sin 3\theta = 3(1-\sin^2\theta)\sin\theta - \sin^3\theta = 3\sin\theta - 3\sin^3\theta - \sin^3\theta = 3\sin\theta - 4\sin^3\theta.$$
**Verify ($\theta = 30^\circ$)**: vế trái $\sin 90^\circ = 1$; vế phải $3\cdot\dfrac12 - 4\cdot\dfrac18 = \dfrac32 - \dfrac12 = 1$ ✓.

---

## 7. Bài tiếp theo

[Lesson 08 — Ứng dụng](../lesson-08-trig-applications/).

## 📝 Tổng kết

1. **De Moivre**: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$. Hệ quả từ Euler. Đúng với n nguyên (cả âm).
2. **Lũy thừa cực**: $(re^{i\theta})^n = r^n e^{in\theta}$ — nâng cả mô-đun lên mũ n, nhân n vào góc, nhớ rút gọn góc về $[0,2\pi)$.
3. **n căn bậc n của z**: n nghiệm cách đều quanh đường tròn $r = |z|^{1/n}$; góc đầu $\dfrac{\varphi}{n}$, bước đều $\dfrac{2\pi}{n}$.
4. **Căn của 1**: n đỉnh đa giác đều nội tiếp đường tròn đơn vị; gọn lại $z_k = \omega^k$ với $\omega = e^{i\cdot 2\pi/n}$ (căn nguyên thủy).
5. **Máy sinh công thức**: khai triển $(\cos\theta+i\sin\theta)^n$ + đối chiếu phần thực/ảo → mọi công thức nhân đôi, nhân ba.
6. **Ứng dụng**: tổng n căn $= 0$; nghiệm đơn vị là nền của **FFT** ($O(n\log n)$), nén JPEG/MP3, nhân đa thức nhanh.
