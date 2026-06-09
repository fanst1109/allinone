# Lesson 05 — Tích phân kép & bội

## Mục tiêu

- Hiểu **tích phân kép** $\iint f(x,y)\,dA$ — thể tích dưới mặt cong.
- Tính tích phân kép bằng tích phân lặp.
- Đổi biến (tọa độ cực).
- Tích phân bội (3 biến trở lên).

## Kiến thức tiền đề

- [Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/), [T4 L07-08 — Tích phân](../../04-Calculus-1var/lesson-07-definite-integral/).

---

## 1. Tích phân kép — Định nghĩa

💡 **Trực giác**: Tích phân 1 biến $\int_a^b f(x)\,dx$ = diện tích dưới đồ thị. **Tích phân kép** $\iint_D f(x,y)\,dA$ = **thể tích** dưới mặt cong $z = f(x,y)$ trên miền $D \subset \mathbb{R}^2$.

### Định nghĩa Riemann

Chia $D$ thành $n\times n$ ô vuông nhỏ $\Delta A$. Lấy tổng $f\cdot\Delta A$. Khi $n \to \infty$:

$$\iint_D f(x, y)\,dA = \lim_{n\to\infty} \sum f(x_i, y_j)\cdot\Delta A$$

> 📐 **Định nghĩa đầy đủ — Tích phân kép $\iint_D f\,dA$**
>
> **(a) Là gì**: Mở rộng tích phân 1 biến lên 2 biến. Tổng Riemann 2D: chia miền $D$ thành $n^2$ ô nhỏ $\Delta A$, cộng $f\cdot\Delta A$, lấy giới hạn $n \to \infty$. Hình học = **thể tích** khối nằm dưới mặt cong $z = f(x,y)$ trên miền $D$ (nếu $f \ge 0$; có thể âm).
>
> **(b) Vì sao cần**: Rất nhiều đại lượng "phân bố trên 1 miền 2D" cần tổng hợp: khối lượng tấm phẳng có mật độ $\rho(x,y)$, tổng nhiệt năng trên 1 vùng, lượng nước rơi trên 1 vùng theo mật độ mưa, xác suất $P(X,Y \in D)$ trong xác suất nhiều biến. Tích phân 1 biến không đủ — phải mở rộng. Fubini cho phép biến tích phân kép thành 2 tích phân lặp (đơn) — tính được.
>
> **(c) Ví dụ số**: $\iint_{[0,1]\times[0,2]} (x+2y)\,dA$. Trong (theo $y$): $\int_0^2 (x+2y)\,dy = 2x + 4$. Ngoài (theo $x$): $\int_0^1 (2x+4)\,dx = \mathbf{5}$. Diện tích đĩa bán kính 3: $\iint_D 1\,dA$ dùng tọa độ cực $= \int_0^{2\pi}\int_0^3 r\,dr\,d\theta = \pi\cdot 9 = \mathbf{9\pi}$ ✓ ($= \pi R^2$). Thể tích cầu $R$: $\iiint 1\,dV$ bằng toạ độ cầu $= \frac{4}{3}\pi R^3$. Khối lượng đĩa mật độ $\rho = r$ (đặc hơn ở rìa): $M = \int_0^{2\pi}\int_0^R r\cdot r\,dr\,d\theta = \frac{2\pi}{3}R^3$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân kép khác gì 2 lần tích phân đơn?"* Tích phân kép quét trên **cả miền 2D** (cộng $f\cdot\Delta A$ của mọi ô nhỏ). Fubini cho phép tính nó **bằng** 2 tích phân đơn lồng nhau — đó là kỹ thuật tính, còn ý nghĩa là tổng trên 2D.
- *"$f$ âm thì $\iint$ ra gì?"* Phần $f < 0$ đóng góp **âm** (thể tích "dưới mặt xy" tính trừ). Nếu cần thể tích thực luôn dương, lấy $\iint|f|$.

⚠ **Lỗi thường gặp — quên $dA = dx\cdot dy$ (hệ tọa độ Descartes), nhầm sang cực mà bỏ r**. Trong tọa độ cực $dA = \mathbf{r\cdot dr\cdot d\theta}$ (có thừa số $r$), KHÔNG phải $dr\cdot d\theta$. Phản ví dụ: diện tích đĩa bán kính 3 $= \iint r\,dr\,d\theta = 9\pi$; nếu quên $r$: $\iint dr\,d\theta = 3\cdot 2\pi = 6\pi$ (sai).

🔁 **Dừng lại tự kiểm tra**

1. $\iint_D 1\,dA$ với $D$ = hình chữ nhật $[0,2]\times[0,3]$ bằng bao nhiêu?

<details><summary>Đáp án</summary>

= diện tích hình chữ nhật $= 2\cdot 3 = \mathbf{6}$. ($\int_0^2\int_0^3 1\,dy\,dx = \int_0^2 3\,dx = 6$.)

</details>

### 📝 Tóm tắt mục 1

- $\iint_D f\,dA$ = tổng $f\cdot\Delta A$ trên cả miền 2D = thể tích dưới mặt cong (nếu $f \ge 0$).
- Fubini biến tích phân kép thành 2 tích phân đơn lồng nhau.
- $\iint_D 1\,dA$ = diện tích $D$; phần $f < 0$ đóng góp âm.

---

## 2. Tính bằng tích phân lặp (iterated integral)

💡 **Trực giác / Hình dung**: cắt khối thể tích thành các "lát mỏng". Với mỗi $x$ cố định, lát theo $y$ có diện tích $A(x) = \int f\,dy$. Cộng tất cả các lát ($\int A(x)\,dx$) ra thể tích. Giống đo thể tích ổ bánh mì bằng cách cộng diện tích từng lát cắt × độ dày.

🎯 **Định lý Fubini**: Nếu $f$ đủ "đẹp" và $D = [a,b] \times [c,d]$ (hình chữ nhật):

$$\iint_D f\,dA = \int_a^b \left[\int_c^d f(x, y)\,dy\right] dx = \int_c^d \left[\int_a^b f(x, y)\,dx\right] dy$$

Tính tích phân trong trước (theo 1 biến, biến kia hằng), rồi tích phân ngoài.

### Ví dụ

$$\iint_{[0,1]\times[0,2]} (x + 2y)\,dA$$

Tính trong (theo $y$):

$$\int_0^2 (x + 2y)\,dy = \left[xy + y^2\right]_0^2 = 2x + 4$$

Tính ngoài (theo $x$):

$$\int_0^1 (2x + 4)\,dx = \left[x^2 + 4x\right]_0^1 = 5$$

⟶ Kết quả = **5**.

**Verify đổi thứ tự** (Fubini nói kết quả không đổi): tính trong theo $x$ trước. $\int_0^1 (x+2y)\,dx = \left[\frac{x^2}{2} + 2yx\right]_0^1 = \frac{1}{2} + 2y$. Ngoài theo $y$: $\int_0^2 \left(\frac{1}{2} + 2y\right)\,dy = \left[\frac{y}{2} + y^2\right]_0^2 = 1 + 4 = \mathbf{5}$ ✓. Hai thứ tự cho cùng đáp số.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi thứ tự tích phân luôn cho cùng kết quả?"* Trên hình chữ nhật và $f$ "đẹp": **luôn** (Fubini). Trên miền cong, đổi thứ tự thì **cận tích phân thay đổi** theo (xem mục 3) — phải tính lại cận, nhưng kết quả cuối vẫn bằng nhau.
- *"Khi nào chọn thứ tự nào?"* Chọn thứ tự khiến tích phân **trong dễ tính hơn** hoặc cận đơn giản hơn. Đây là kỹ năng quan trọng khi gặp miền cong.

⚠ **Lỗi thường gặp — coi biến ngoài là hằng nhưng quên thế cận đúng**. Khi tính tích phân trong, biến ngoài là **hằng** (giữ nguyên trong biểu thức), nhưng cận của tích phân trong có thể **phụ thuộc** biến ngoài (miền cong). Trên hình chữ nhật thì cận là số cố định.

🔁 **Dừng lại tự kiểm tra**

1. Tính $\int_0^1 \int_0^1 (x + y)\,dy\,dx$.

<details><summary>Đáp án</summary>

Trong: $\int_0^1 (x+y)\,dy = \left[xy + \frac{y^2}{2}\right]_0^1 = x + \frac{1}{2}$. Ngoài: $\int_0^1 \left(x + \frac{1}{2}\right)\,dx = \left[\frac{x^2}{2} + \frac{x}{2}\right]_0^1 = \frac{1}{2} + \frac{1}{2} = \mathbf{1}$.

</details>

### 📝 Tóm tắt mục 2

- Fubini: tính tích phân trong (1 biến, biến kia hằng) rồi tích phân ngoài.
- Đổi thứ tự cho cùng kết quả (hình chữ nhật, $f$ đẹp); chọn thứ tự dễ tính hơn.
- Tích phân trong: biến ngoài là hằng, nhưng cận có thể phụ thuộc nó (miền cong).

---

## 3. Miền không-chữ-nhật

💡 **Trực giác / Hình dung**: với miền cong (tam giác, hình quạt...), cận của biến trong **không cố định** mà "men theo đường biên". Cố định $x$, biến $y$ chạy từ biên dưới $g(x)$ tới biên trên $h(x)$ — cận là **hàm của $x$**. Như quét từng cột dọc qua hình, mỗi cột cao thấp khác nhau.

Nếu $D = \{(x, y) : a \le x \le b,\ g(x) \le y \le h(x)\}$ (đường biên $y = g, h$):

$$\iint_D f\,dA = \int_a^b \left[\int_{g(x)}^{h(x)} f(x, y)\,dy\right] dx$$

**Ví dụ**: Tính $\iint_T x\cdot y\,dA$, $T$ = tam giác $(0,0)$, $(1,0)$, $(1,1)$.
- $T$: $0 \le x \le 1$, $0 \le y \le x$.
- Trong: $\int_0^x x\cdot y\,dy = x\cdot\left[\frac{y^2}{2}\right]_0^x = \frac{x^3}{2}$.
- Ngoài: $\int_0^1 \frac{x^3}{2}\,dx = \frac{1}{8}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao tìm cận $g(x)$, $h(x)$?"* Vẽ miền $D$, cố định 1 giá trị $x$, xem $y$ chạy từ biên nào tới biên nào. Vd tam giác trên: tại $x$ cố định, $y$ đi từ trục Ox ($y=0$) lên đường $y=x$.
- *"Tích phân trong còn ra số không?"* Không — ra **biểu thức theo $x$** (vì cận phụ thuộc $x$), rồi tích phân ngoài mới khử hết thành số.

⚠ **Lỗi thường gặp — đặt cận biến trong là hằng số thay vì hàm**. Trên miền cong, cận tích phân **trong** phải là hàm của biến ngoài. Phản ví dụ: tam giác $T$ ở trên, nếu đặt nhầm $0 \le y \le 1$ (cố định) thì tính ra diện tích hình vuông, không phải tam giác → sai miền.

🔁 **Dừng lại tự kiểm tra**

1. Mô tả cận cho miền $D$ dưới parabol $y = x^2$, trên trục Ox, từ $x = 0$ đến $x = 2$.

<details><summary>Đáp án</summary>

$0 \le x \le 2$, $\mathbf{0 \le y \le x^2}$. $\iint_D f\,dA = \int_0^2 \int_0^{x^2} f\,dy\,dx$ (cận trên của $y$ là hàm $x^2$).

</details>

### 📝 Tóm tắt mục 3

- Miền cong: cận biến trong là **hàm** của biến ngoài (men theo biên).
- Tích phân trong ra biểu thức theo biến ngoài, rồi tích phân ngoài khử thành số.
- Vẽ miền + quét cột để xác định cận $g(x)$, $h(x)$.

---

## 4. Đổi biến — Tọa độ cực

💡 **Trực giác / Hình dung**: với miền tròn, dùng $(x, y)$ khiến cận xấu (đường tròn $x^2+y^2 = R^2$). Đổi sang $(r, \theta)$ — "khoảng cách tới tâm" và "góc" — thì hình tròn thành hình chữ nhật đơn giản ($0 \le r \le R$, $0 \le \theta \le 2\pi$). Thừa số **$r$** trong $dA = r\,dr\,d\theta$ là vì ô lưới cực ở xa tâm thì **to hơn** (cung dài hơn): diện tích ô $\approx r\,dr\,d\theta$.

Với miền tròn / đối xứng quay, dùng tọa độ cực:

$$x = r\cos\theta, \quad y = r\sin\theta, \quad dA = r\,dr\,d\theta$$

(Yếu tố Jacobian $= r$.)

**Ví dụ**: Tính $\iint_D (x^2 + y^2)\,dA$, $D$ = đĩa bán kính $R$.
- $D$: $0 \le r \le R$, $0 \le \theta \le 2\pi$.
- $x^2 + y^2 = r^2$.
- $\displaystyle = \int_0^{2\pi} \int_0^R r^2\cdot r\,dr\,d\theta = \int_0^{2\pi} \left[\frac{r^4}{4}\right]_0^R d\theta = \int_0^{2\pi} \frac{R^4}{4}\,d\theta = \mathbf{\dfrac{\pi R^4}{2}}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $dA = r\,dr\,d\theta$ chứ không phải $dr\,d\theta$?"* Ô lưới cực hình "rẻ quạt" có 2 cạnh: bề dày $dr$ và cung $r\,d\theta$ (cung = bán kính $\times$ góc). Diện tích ô $\approx dr \times (r\,d\theta) = r\,dr\,d\theta$. Thừa số $r$ là Jacobian của phép đổi biến.
- *"Khi nào nên đổi sang cực?"* Khi miền tròn/quạt/vành khăn HOẶC biểu thức chứa $x^2+y^2$ (thành $r^2$, gọn hẳn).

⚠ **Lỗi thường gặp — quên thừa số $r$**. Đây là lỗi #1 với tọa độ cực. Phản ví dụ: diện tích đĩa bán kính $R = \iint r\,dr\,d\theta = \pi R^2$. Nếu quên $r$: $\iint dr\,d\theta = R\cdot 2\pi = 2\pi R$ (sai cả thứ nguyên — ra chu vi-ish chứ không phải diện tích).

🔁 **Dừng lại tự kiểm tra**

1. Tính diện tích đĩa bán kính 2 bằng tọa độ cực.

<details><summary>Đáp án</summary>

$\int_0^{2\pi}\int_0^2 r\,dr\,d\theta = \int_0^{2\pi} \left[\frac{r^2}{2}\right]_0^2 d\theta = \int_0^{2\pi} 2\,d\theta = 4\pi$. Khớp $\pi R^2 = \pi\cdot 4 = \mathbf{4\pi}$ ✓.

</details>

### 📝 Tóm tắt mục 4

- Tọa độ cực: $x = r\cos\theta$, $y = r\sin\theta$; miền tròn → hình chữ nhật trong $(r,\theta)$.
- **$dA = r\,dr\,d\theta$** (đừng quên $r$ — Jacobian).
- Dùng khi miền tròn/quạt hoặc biểu thức chứa $x^2+y^2 = r^2$.

---

## 5. Tích phân bội (n biến)

💡 **Trực giác / Hình dung**: tích phân kép cộng f trên miền 2D (diện tích), tích phân bội 3 cộng f trên khối 3D (thể tích). Nếu f = mật độ, tích phân = khối lượng cả vật. Tọa độ trụ (cho hình trụ) và cầu (cho hình cầu) là các "hệ tọa độ thuận" giống tọa độ cực nhưng cho 3D — mỗi cái có Jacobian riêng.

**3 biến**: $\iiint_V f(x, y, z)\,dV$ — tích phân trên khối $V$ trong $\mathbb{R}^3$.

$$\iiint_V f\,dV = \int_a^b \int_c^d \int_e^f f(x, y, z)\,dz\,dy\,dx$$

(Thứ tự lặp tùy chọn.)

### Tọa độ trụ và cầu

- **Trụ**: $x = r\cos\theta$, $y = r\sin\theta$, $z = z$. $dV = r\,dr\,d\theta\,dz$.
- **Cầu**: $x = \rho\sin\varphi\cos\theta$, $y = \rho\sin\varphi\sin\theta$, $z = \rho\cos\varphi$. $dV = \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$.

**Verify thể tích cầu bán kính $R$** (tọa độ cầu, $f = 1$):
- $\int_0^{2\pi}\int_0^\pi\int_0^R \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$.
- Theo $\rho$: $\int_0^R \rho^2\,d\rho = \frac{R^3}{3}$. Theo $\varphi$: $\int_0^\pi \sin\varphi\,d\varphi = 2$. Theo $\theta$: $\int_0^{2\pi} d\theta = 2\pi$.
- Tích $= \frac{R^3}{3}\cdot 2\cdot 2\pi = \mathbf{\dfrac{4}{3}\pi R^3}$ ✓ (đúng công thức thể tích cầu).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Jacobian trụ và cầu khác nhau thế nào?"* Trụ: **$r$** (giống cực, thêm $z$ không đổi). Cầu: **$\rho^2\sin\varphi$** (phức tạp hơn vì cả 2 góc cong). Nhớ sai Jacobian → sai toàn bộ.
- *"Khi nào dùng trụ vs cầu?"* Trụ cho vật có trục đối xứng (lon, ống). Cầu cho vật đối xứng quanh 1 điểm (quả bóng, hành tinh).

⚠ **Lỗi thường gặp — dùng nhầm Jacobian giữa trụ và cầu**. $dV$ cầu là $\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$, KHÔNG phải $\rho\cdot...$ Phản ví dụ: tính thể tích cầu mà dùng Jacobian $= \rho$ (như trụ) → ra $(\pi R^3)\cdot...$ sai hệ số, không khớp $\frac{4}{3}\pi R^3$.

🔁 **Dừng lại tự kiểm tra**

1. Jacobian (dV) trong tọa độ cầu là gì?

<details><summary>Đáp án</summary>

$dV = \mathbf{\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta}$. ($\rho^2$ vì khối cách tâm xa thì lớn hơn; $\sin\varphi$ điều chỉnh theo góc cực.)

</details>

### 📝 Tóm tắt mục 5

- $\iiint_V f\,dV$ cộng $f$ trên khối 3D (= khối lượng nếu $f$ = mật độ).
- Trụ: $dV = r\,dr\,d\theta\,dz$ (trục đối xứng); cầu: $dV = \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$ (đối xứng điểm).
- Chọn đúng hệ tọa độ + đúng Jacobian là then chốt.

---

## 6. Ứng dụng

### 6.1. Diện tích & thể tích

- Diện tích $D = \iint_D 1\,dA$.
- Thể tích vật khối $V = \iiint_V 1\,dV$.

### 6.2. Khối tâm

$$\bar{x} = \frac{\iint_D x\cdot\rho\,dA}{\iint_D \rho\,dA}, \qquad \bar{y} = \frac{\iint_D y\cdot\rho\,dA}{\iint_D \rho\,dA}$$

$\rho(x, y)$ = mật độ.

### 6.3. Momen quán tính

$$I_z = \iint_D (x^2 + y^2)\cdot\rho\,dA$$

Đại lượng quan trọng trong cơ học.

💡 **Trực giác / Hình dung**: cùng 1 công cụ tích phân kép/bội, đổi hàm $f$ là ra đại lượng khác. $f = 1$ → diện tích/thể tích. $f = \rho$ (mật độ) → khối lượng. $f = x\cdot\rho$ → "momen" để tính khối tâm. $f = (x^2+y^2)\cdot\rho$ → momen quán tính (đo "khó quay" của vật). Khối tâm = vị trí trung bình có trọng số theo mật độ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khối tâm chia cho $\iint\rho\,dA$?"* Vì đó là **trung bình có trọng số**: tử = tổng (vị trí $\times$ khối lượng nhỏ), mẫu = tổng khối lượng. Chia ra vị trí trung bình. Mật độ đều thì $\rho$ rút gọn → khối tâm = trọng tâm hình học.

⚠ **Lỗi thường gặp — quên chia cho tổng khối lượng khi tính khối tâm**. $\bar{x} = \dfrac{\iint x\rho\,dA}{\iint \rho\,dA}$. Quên mẫu số → ra "momen" chứ không phải tọa độ (sai thứ nguyên).

🔁 **Dừng lại tự kiểm tra**

1. Khối tâm của hình vuông [0,2]×[0,2] mật độ đều nằm ở đâu?

<details><summary>Đáp án</summary>

Mật độ đều → khối tâm = tâm hình học = $\mathbf{(1, 1)}$ (trung điểm theo cả 2 trục).

</details>

### 📝 Tóm tắt mục 6

- Đổi hàm $f$ → đại lượng khác: $f=1$ (diện tích/thể tích), $f=\rho$ (khối lượng), $f=(x^2+y^2)\rho$ (momen quán tính).
- Khối tâm = trung bình vị trí có trọng số mật độ: $\bar{x} = \dfrac{\iint x\rho\,dA}{\iint\rho\,dA}$.
- Mật độ đều → khối tâm = trọng tâm hình học.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính $\int_0^1 \int_0^2 (3x^2\cdot y)\,dy\,dx$.

**Bài 2**: Tính $\iint_D x\,dA$ trên $D = \{(x,y) : 0 \le x \le 1,\ x \le y \le 1\}$.

**Bài 3**: Tính thể tích hình cầu bán kính $R$ bằng tích phân.

**Bài 4**: Tính $\iint_D dA$ trên $D$ = đĩa bán kính 3.

**Bài 5**: Khối tâm tam giác đỉnh $(0,0)$, $(1,0)$, $(0,1)$ (mật độ đều).

### Lời giải

**Bài 1**: Trong (theo $y$): $\int_0^2 3x^2\cdot y\,dy = 3x^2\cdot\left[\frac{y^2}{2}\right]_0^2 = 6x^2$. Ngoài: $\int_0^1 6x^2\,dx = \mathbf{2}$.

**Bài 2**: $\int_0^1 \int_x^1 x\,dy\,dx = \int_0^1 x(1-x)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \mathbf{\dfrac{1}{6}}$.

**Bài 3**: $V = \int_0^{2\pi} \int_0^\pi \int_0^R \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta = \frac{R^3}{3}\cdot 2\cdot 2\pi = \mathbf{\dfrac{4}{3}\pi R^3}$ ✓.

**Bài 4**: Diện tích đĩa $= \int_0^{2\pi} \int_0^3 r\,dr\,d\theta = \int_0^{2\pi} \frac{9}{2}\,d\theta = \mathbf{9\pi}$. Khớp $\pi R^2 = 9\pi$ ✓.

**Bài 5**: $D$: $0 \le x \le 1$, $0 \le y \le 1-x$. $S(D) = \frac{1}{2}$.  
- $\iint x\,dA = \int_0^1 x(1-x)\,dx = \frac{1}{6}$. $\bar{x} = \dfrac{1/6}{1/2} = \mathbf{\dfrac{1}{3}}$.  
- Tương tự $\bar{y} = \mathbf{\dfrac{1}{3}}$. → khối tâm $\left(\frac{1}{3}, \frac{1}{3}\right)$.

---

## 8. Bài tiếp theo

[Lesson 06 — Chuỗi & Taylor](../lesson-06-series-taylor/).

## 📝 Tổng kết

1. **$\iint_D f\,dA$** = thể tích dưới mặt cong $f(x,y)$ trên miền $D$.
2. **Fubini**: tính tích phân lặp, thứ tự đổi được khi $f$ "đẹp".
3. **Tọa độ cực**: $dA = r\,dr\,d\theta$. Cho miền tròn.
4. **Cầu, trụ**: cho 3 chiều với đối xứng quay.
5. **Ứng dụng**: diện tích, thể tích, khối tâm, momen quán tính.
