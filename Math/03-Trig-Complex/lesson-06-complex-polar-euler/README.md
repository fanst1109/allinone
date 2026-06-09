# Lesson 06 — Dạng lượng giác & Công thức Euler

## Mục tiêu

- Hiểu **dạng lượng giác** $z = r(\cos\theta + i\sin\theta)$.
- Biết **công thức Euler**: $e^{i\theta} = \cos\theta + i\sin\theta$.
- Hiểu vì sao Euler là **công thức đẹp nhất toán học**: $e^{i\pi} + 1 = 0$.
- Nhân/chia số phức dưới dạng lượng giác — nhân mô-đun, cộng argument.

## Kiến thức tiền đề

- [Lesson 05 — Số phức](../lesson-05-complex-numbers/).

---

## 1. Dạng lượng giác (Polar form)

💡 **Hình dung**: Thay vì xác định điểm bằng tọa độ $(a, b)$, ta xác định bằng **độ dài** $r$ và **góc** $\theta$. Như đi từ "tọa độ Đề-các" sang "tọa độ cực".

$$z = r(\cos\theta + i\sin\theta)$$

trong đó:
- **$r = |z|$** $= \sqrt{a^2 + b^2}$ — mô-đun.
- **$\theta = \arg(z)$** — argument (góc tính từ trục thực dương, ngược chiều kim đồng hồ).

**Chuyển đổi**:
- Đại số → lượng giác: $r = \sqrt{a^2+b^2}$, $\theta = \operatorname{atan2}(b, a)$.
- Lượng giác → đại số: $a = r\cos\theta$, $b = r\sin\theta$.

**Ví dụ**: $z = 1 + i$.
- $r = \sqrt{2}$.
- $\theta = \dfrac{\pi}{4}$.
- → $z = \sqrt{2}\left(\cos\dfrac{\pi}{4} + i\sin\dfrac{\pi}{4}\right)$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có dạng này?"* Vì khi nhân/chia số phức, dạng lượng giác **đơn giản hơn nhiều** dạng đại số (xem mục 3) — nhân = cộng góc.
- *"argument có duy nhất không?"* Không — $\theta$ và $\theta + 2k\pi$ cùng chỉ một điểm. Thường chọn **argument chính** trong $(-\pi, \pi]$ để tránh nhập nhằng.
- *"Vì sao dùng $\operatorname{atan2}(b, a)$ mà không phải $\arctan(b/a)$?"* Vì $\arctan(b/a)$ không phân biệt phần tư (mất dấu). $\operatorname{atan2}$ xét dấu cả a và b → cho đúng góc trong cả 4 phần tư.

⚠ **Lỗi thường gặp — tính argument bằng $\arctan(b/a)$ rồi quên chỉnh phần tư**. Phản ví dụ: $z = -1 - i$ (phần tư III). $\arctan(b/a) = \arctan\left(\dfrac{-1}{-1}\right) = \arctan(1) = \dfrac{\pi}{4}$ (phần tư I) — **sai**. Đúng phải cộng π: $\theta = \dfrac{\pi}{4} + \pi = \dfrac{5\pi}{4}$ (hoặc $-\dfrac{3\pi}{4}$). Luôn kiểm điểm thực sự nằm ở phần tư nào.

**4 ví dụ số đa dạng (đại số → lượng giác)**:
- $z = 1 + i$: $r = \sqrt{2}$, $\theta = \dfrac{\pi}{4}$ → $\sqrt{2}\left(\cos\dfrac{\pi}{4} + i\sin\dfrac{\pi}{4}\right)$.
- $z = 2i$: $r = 2$, $\theta = \dfrac{\pi}{2}$ → $2\left(\cos\dfrac{\pi}{2} + i\sin\dfrac{\pi}{2}\right)$.
- $z = -3$: $r = 3$, $\theta = \pi$ → $3(\cos\pi + i\sin\pi)$.
- $z = 1 - \sqrt{3}\,i$: $r = \sqrt{1+3} = 2$, $\theta = -\dfrac{\pi}{3}$ (phần tư IV) → $2\left(\cos\left(-\dfrac{\pi}{3}\right) + i\sin\left(-\dfrac{\pi}{3}\right)\right)$.

🔁 **Dừng lại tự kiểm tra**

1. Viết $z = \sqrt{3} + i$ dưới dạng lượng giác.
2. Mô-đun và argument của $z = -2i$?

<details><summary>Đáp án</summary>

1. $r = \sqrt{3+1} = 2$, $\theta = \arctan\left(\dfrac{1}{\sqrt{3}}\right) = \dfrac{\pi}{6}$ (phần tư I) → $2\left(\cos\dfrac{\pi}{6} + i\sin\dfrac{\pi}{6}\right)$.
2. $r = 2$, $\theta = -\dfrac{\pi}{2}$ (trỏ thẳng xuống dưới).

</details>

### 📝 Tóm tắt mục 1

- Dạng lượng giác: $z = r(\cos\theta + i\sin\theta)$ với $r = |z|$, $\theta = \arg(z)$.
- Đổi đại số → cực: $r = \sqrt{a^2+b^2}$, $\theta = \operatorname{atan2}(b, a)$ (chú ý phần tư).
- argument xác định sai khác $2k\pi$; chọn argument chính trong $(-\pi, \pi]$.

---

## 2. Công thức Euler

$$e^{i\theta} = \cos\theta + i\sin\theta$$

⟶ Số phức trên đường tròn đơn vị có argument θ chính là **$e^{i\theta}$**.

**Tổng quát**: Mọi số phức:

$$z = re^{i\theta}$$

> 📐 **Định nghĩa đầy đủ — Công thức Euler $e^{i\theta} = \cos\theta + i\sin\theta$**
>
> **(a) Là gì**: 1 đẳng thức **gây sốc** — hàm mũ (vốn cho đại lượng tăng/giảm) gặp số phức i thì biến thành **$\cos + i\sin$** (vốn cho dao động). Hai khái niệm tưởng khác hoàn toàn lại là 2 mặt của 1 hiện tượng.
>
> **(b) Vì sao cần**: Vì làm cho mọi phép toán số phức trở nên **đơn giản như đại số mũ**: nhân/chia số phức = cộng/trừ argument ($e^{i\alpha}\cdot e^{i\beta} = e^{i(\alpha+\beta)}$), lũy thừa = nhân argument (De Moivre). Cốt lõi của **Fourier analysis** (tín hiệu = tổng các $e^{i\omega t}$), **mạch điện AC** (phasor), **cơ học lượng tử** (hàm sóng $e^{i(kx-\omega t)}$). Đặc biệt $e^{i\pi} = -1$ → $e^{i\pi} + 1 = 0$ liên kết 5 hằng số quan trọng nhất toán ($0, 1, \pi, e, i$) — được mệnh danh "công thức đẹp nhất toán học".
>
> **(c) Ví dụ số**: $\theta = 0$: $e^0 = 1 = \cos 0 + i\sin 0 = 1 + 0$ ✓. $\theta = \dfrac{\pi}{2}$: $e^{i\pi/2} = \cos\dfrac{\pi}{2} + i\sin\dfrac{\pi}{2} = 0 + i =$ **$i$** (nhân với i = quay 90°!). $\theta = \pi$: $e^{i\pi} = \cos\pi + i\sin\pi = -1 + 0 =$ **$-1$**. $\theta = 2\pi$: $e^{i\cdot 2\pi} = 1$ (tuần hoàn!). $z = 1+i$: $r = \sqrt{2}$, $\theta = \dfrac{\pi}{4}$ → $z = \sqrt{2}\,e^{i\pi/4}$. $z^2 = 2e^{i\pi/2} = 2i$ ✓ (kiểm: $(1+i)^2 = 1+2i+i^2 = 2i$ ✓).

💡 **Vì sao đúng?** Khai triển Taylor của $e^x$, $\sin x$, $\cos x$:

$$\begin{aligned}
e^x &= 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \ldots \\
\sin x &= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \ldots \\
\cos x &= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \ldots
\end{aligned}$$

Thay $x = i\theta$ vào $e^x$ và dùng $i^2 = -1$, $i^3 = -i$, $i^4 = 1, \ldots$:

$$\begin{aligned}
e^{i\theta} &= 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} - \ldots \\
&= \left(1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \ldots\right) + i\left(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \ldots\right) \\
&= \cos\theta + i\sin\theta \;\checkmark
\end{aligned}$$

**Đặc biệt** ($\theta = \pi$):

$$e^{i\pi} = \cos\pi + i\sin\pi = -1 + 0i = -1$$

⟶ **$e^{i\pi} + 1 = 0$** — kết nối 5 hằng số quan trọng nhất: $0, 1, \pi, e, i$. Được mệnh danh "công thức đẹp nhất toán học".

⚠ **Lỗi thường gặp — quên $\theta$ trong Euler là RADIAN**. $e^{i\theta} = \cos\theta + i\sin\theta$ chỉ đúng khi θ tính bằng radian. Phản ví dụ: $e^{i\pi} = -1$, nhưng nếu hiểu nhầm $\pi \approx 3.14$ là "độ" thì $\cos 3.14^\circ + i\sin 3.14^\circ \approx 0.9985 + 0.0548i \neq -1$. Luôn dùng radian.

⚠ **Lỗi thường gặp 2 — viết $e^{i\theta}$ có mô-đun khác 1**. $|e^{i\theta}| = \sqrt{\cos^2\theta + \sin^2\theta} = 1$ **luôn** — nó nằm trên đường tròn đơn vị. Mọi số phức là $re^{i\theta}$; phần $r$ mới mang độ lớn, $e^{i\theta}$ chỉ mang hướng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mũ (tăng trưởng) lại biến thành cos/sin (dao động)?"* Vì nhân với $i$ = quay 90°. Khi mũ "đẩy" theo hướng vuông góc liên tục, quỹ đạo không phình ra mà **cuộn tròn** → ra dao động. Chứng minh chặt là khai triển Taylor ở trên.
- *"$e^{i\theta}$ có thể bằng số thực không?"* Có, khi $\sin\theta = 0$, tức $\theta = k\pi$: $e^{i\cdot 0} = 1$, $e^{i\pi} = -1$, $e^{i\cdot 2\pi} = 1\ldots$

🔁 **Dừng lại tự kiểm tra**

1. $e^{i\pi/2}$ bằng số phức nào?
2. $|e^{i\cdot 1.234}|$ bằng mấy?

<details><summary>Đáp án</summary>

1. $\cos\dfrac{\pi}{2} + i\sin\dfrac{\pi}{2} = 0 + i = i$.
2. Bằng **1** (mọi $e^{i\theta}$ đều có mô-đun 1).

</details>

### 📝 Tóm tắt mục 2

- $e^{i\theta} = \cos\theta + i\sin\theta$ (θ radian); mọi $z = re^{i\theta}$.
- $|e^{i\theta}| = 1$ (nằm trên đường tròn đơn vị); chứng minh qua Taylor.
- $e^{i\pi} + 1 = 0$ nối 5 hằng số $0, 1, \pi, e, i$.

---

## 3. Nhân / chia số phức dạng lượng giác

Cho $z_1 = r_1 e^{i\theta_1}$, $z_2 = r_2 e^{i\theta_2}$.

$$\begin{aligned}
z_1 \cdot z_2 &= r_1 r_2 \, e^{i(\theta_1 + \theta_2)} \\
\frac{z_1}{z_2} &= \frac{r_1}{r_2} \, e^{i(\theta_1 - \theta_2)}
\end{aligned}$$

💡 **Quy tắc dễ nhớ**:
- **Nhân**: mô-đun nhân, argument cộng.
- **Chia**: mô-đun chia, argument trừ.

⟶ Quá đẹp! So với cách nhân đại số $(ac-bd) + (ad+bc)i$ thì dạng lượng giác trực quan hơn nhiều.

**Ví dụ số**: $z_1 = 2e^{i\pi/3}$, $z_2 = 3e^{i\pi/6}$.
- $z_1\cdot z_2 = 6e^{i(\pi/3+\pi/6)} = 6e^{i\pi/2} = 6i$.
- Kiểm tra đại số: $z_1 = 2\left(\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}\right) = 1 + i\sqrt{3}$. $z_2 = 3\left(\dfrac{\sqrt{3}}{2} + \dfrac{i}{2}\right) = \dfrac{3\sqrt{3}}{2} + \dfrac{3}{2}i$.
- $z_1\cdot z_2 = (1 + i\sqrt{3})\left(\dfrac{3\sqrt{3}}{2} + \dfrac{3}{2}i\right) = \left(\dfrac{3\sqrt{3}}{2} - \dfrac{3\sqrt{3}}{2}\right) + i\left(\dfrac{3}{2} + \dfrac{9}{2}\right) = 0 + 6i$ ✓.

⚠ **Lỗi thường gặp — nhân mô-đun nhưng quên cộng argument (hoặc ngược lại)**. Khi nhân: **mô-đun nhân, argument cộng**. Phản ví dụ: $z_1 = 2e^{i\pi/3}$, $z_2 = 3e^{i\pi/6}$. Tích đúng $6e^{i\pi/2}$; nếu lỡ cộng cả mô-đun ra $5e^{i\ldots}$ hoặc nhân cả argument ra $6e^{i\pi^2/18}$ đều sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu argument cộng vượt quá 2π thì sao?"* Trừ bớt 2π để đưa về $(-\pi, \pi]$. Vd $\theta = \dfrac{7\pi}{4} \equiv \dfrac{7\pi}{4} - 2\pi = -\dfrac{\pi}{4}$. Cùng điểm.
- *"Dạng lượng giác có lợi hơn đại số nhiều không?"* Cho **cộng/trừ** thì dạng đại số tiện hơn (cộng từng phần). Cho **nhân/chia/lũy thừa/căn** thì dạng cực vượt trội. Chọn dạng theo phép toán.

🔁 **Dừng lại tự kiểm tra**

1. $z_1 = 4e^{i\pi/2}$, $z_2 = 2e^{i\pi/4}$. Tính $z_1\cdot z_2$ và $\dfrac{z_1}{z_2}$ dạng cực.
2. $(3e^{i\pi/3})\cdot(e^{i\cdot 2\pi/3})$ bằng gì?

<details><summary>Đáp án</summary>

1. $z_1\cdot z_2 = 8e^{i\cdot 3\pi/4}$; $\dfrac{z_1}{z_2} = 2e^{i\pi/4}$.
2. Mô-đun $3\cdot 1 = 3$, argument $\dfrac{\pi}{3} + \dfrac{2\pi}{3} = \pi$ → $3e^{i\pi} = -3$.

</details>

### 📝 Tóm tắt mục 3

- Nhân: **mô-đun nhân, argument cộng** ($r_1 r_2 \, e^{i(\theta_1+\theta_2)}$).
- Chia: **mô-đun chia, argument trừ**.
- Dạng cực thắng tuyệt đối ở nhân/chia/lũy thừa; đại số tiện cho cộng/trừ.

---

## 4. Ý nghĩa hình học của nhân số phức

💡 **Nhân z với $e^{i\theta}$ = quay z đi 1 góc θ quanh O**.

**Đặc biệt**:
- **Nhân với i** ($= e^{i\pi/2}$) = quay 90° ngược chiều kim đồng hồ.
- **Nhân với -1** ($= e^{i\pi}$) = quay 180° (đối xứng tâm O).
- **Nhân với $re^{i\theta}$** = phóng to r lần + quay θ.

⟶ **Số phức = phép biến hình đồng dạng**. Đó là lý do nó hữu ích cho hình học, kỹ thuật.

**Ví dụ**: Quay điểm $A(3, 4)$ ($\equiv 3+4i$) đi 90° quanh O.
- Nhân với i: $(3+4i)\cdot i = 3i + 4i^2 = -4 + 3i$ → điểm $(-4, 3)$.

Khớp với công thức quay ở L08-T2: $(x,y) \to (-y, x)$. ✓

⚠ **Lỗi thường gặp — nhân với $re^{i\theta}$ mà quên phần phóng to r**. Nhân với một số phức mô-đun $\neq 1$ vừa **quay** vừa **co giãn**. Phản ví dụ: nhân z với $2i = 2e^{i\pi/2}$ không chỉ quay 90° mà còn **phóng to gấp 2**. Nếu chỉ muốn quay (giữ độ lớn), nhân với $e^{i\theta}$ (mô-đun 1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nhân với số thực dương k thì sao?"* $k = ke^{i\cdot 0}$ → quay 0° (không quay), chỉ **phóng to k lần**. Khớp trực giác: nhân với 2 làm vector dài gấp đôi.
- *"Quay theo chiều kim đồng hồ thì nhân với gì?"* Nhân với $e^{-i\theta}$ (argument âm). Vd quay −90° = nhân với $-i$.

🔁 **Dừng lại tự kiểm tra**

1. Nhân $z = 2 + i$ với $i$. Kết quả? Ý nghĩa hình học?
2. Muốn quay một điểm 180° quanh O thì nhân với số nào?

<details><summary>Đáp án</summary>

1. $(2+i)\cdot i = 2i + i^2 = -1 + 2i$ → điểm $(2,1)$ quay 90° thành $(-1, 2)$.
2. Nhân với $-1$ ($= e^{i\pi}$), tức đối xứng qua gốc O.

</details>

### 📝 Tóm tắt mục 4

- Nhân với $e^{i\theta}$ = quay góc θ (giữ độ lớn); nhân với $re^{i\theta}$ = quay θ + phóng to r.
- Nhân với i = quay 90°; với −1 = quay 180°; với số thực $k>0$ = chỉ phóng to.
- Số phức ≡ phép biến hình đồng dạng (quay + co giãn) trên mặt phẳng.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Viết $z = -1 + i$ dưới dạng lượng giác.

**Bài 2**: Tính $\left(\cos\dfrac{\pi}{4} + i\sin\dfrac{\pi}{4}\right)^4$ dùng Euler.

**Bài 3**: Cho $z_1 = 2\left(\cos\dfrac{\pi}{6} + i\sin\dfrac{\pi}{6}\right)$, $z_2 = 3\left(\cos\dfrac{\pi}{3} + i\sin\dfrac{\pi}{3}\right)$. Tính $z_1\cdot z_2$ dạng lượng giác.

**Bài 4**: Tính $e^{i\cdot 2\pi}$.

**Bài 5**: Quay $z = 1 + i$ đi 60° quanh O.

### Lời giải

**Bài 1**: $r = \sqrt{2}$, $\theta = \pi - \dfrac{\pi}{4} = \dfrac{3\pi}{4}$ (góc phần tư II). → **$z = \sqrt{2}\left(\cos\dfrac{3\pi}{4} + i\sin\dfrac{3\pi}{4}\right) = \sqrt{2}\,e^{i\cdot 3\pi/4}$**.

**Bài 2**: $(e^{i\pi/4})^4 = e^{i\pi} =$ **$-1$**.

**Bài 3**: $r = 2\cdot 3 = 6$, $\theta = \dfrac{\pi}{6} + \dfrac{\pi}{3} = \dfrac{\pi}{2}$. → **$6\left(\cos\dfrac{\pi}{2} + i\sin\dfrac{\pi}{2}\right) = 6i$**.

**Bài 4**: $e^{2\pi i} = \cos 2\pi + i\sin 2\pi = 1 + 0i =$ **$1$**. (Tuần hoàn chu kỳ 2π!)

**Bài 5**: Quay 60° = nhân với $e^{i\pi/3} = \dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}$.  
$(1+i)\left(\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}\right) = \dfrac{1}{2} + i\dfrac{\sqrt{3}}{2} + \dfrac{i}{2} + i^2\dfrac{\sqrt{3}}{2} = \left(\dfrac{1}{2} - \dfrac{\sqrt{3}}{2}\right) + i\left(\dfrac{\sqrt{3}}{2} + \dfrac{1}{2}\right) \approx$ **$-0.366 + 1.366i$**.

---

## 6. Bài tiếp theo

[Lesson 07 — De Moivre](../lesson-07-de-moivre/) — lũy thừa & căn của số phức.

## 📝 Tổng kết

1. **$z = r(\cos\theta + i\sin\theta) = re^{i\theta}$**.
2. **Euler**: $e^{i\theta} = \cos\theta + i\sin\theta$. $e^{i\pi} = -1$.
3. **Nhân**: mô-đun nhân, argument cộng.
4. **Chia**: mô-đun chia, argument trừ.
5. **Nhân với $e^{i\theta}$ = quay góc θ** — ý nghĩa hình học.
