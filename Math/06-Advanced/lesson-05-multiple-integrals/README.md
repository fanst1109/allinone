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

💡 **Trực giác — cộng các cột mỏng trên miền 2D**: Tích phân 1 biến $\int_a^b f(x)\,dx$ = diện tích dưới đồ thị (cộng các **dải mỏng** chiều rộng $dx$, chiều cao $f(x)$). **Tích phân kép** $\iint_D f(x,y)\,dA$ = **thể tích** dưới mặt cong $z = f(x,y)$ trên miền $D \subset \mathbb{R}^2$. Hình dung: trên mỗi ô nhỏ $dA = dx\,dy$ của sàn nhà (miền $D$), dựng một **cột** cao $f(x,y)$ — như một cột nước/cột gỗ tí hon. Tích phân kép = **cộng thể tích tất cả các cột** đó. Ô càng nhỏ, tổng càng chính xác; cho ô $\to 0$ thì tổng $\to$ thể tích thật.

```
   z = f(x,y)  (mặt cong, "nóc nhà")
        _____
      /      \___          ← mỗi cột: đáy dA, cao f(x,y)
     /  ▒▒▒▒▒▒▒ \           ∬f dA = cộng thể tích mọi cột
    /  ▒▒▒▒▒▒▒▒▒ \
   /__▒▒▒▒▒▒▒▒▒▒▒_\
   ░░░░░░░░░░░░░░░░  ← miền D trên mặt phẳng xy ("sàn nhà"), chia ô dA
```

So với tích phân đơn: $\int_a^b f\,dx$ cộng **dải** (2D, ra diện tích); $\iint_D f\,dA$ cộng **cột** (3D, ra thể tích). Tăng 1 chiều ở cả input (miền) lẫn output (đo lường).

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

#### Bảng đối chiếu: tích phân đơn vs kép vs ba

| Loại | Ký hiệu | Miền tích phân | $f=1$ cho ra | Phần tử | "Cộng" cái gì |
|------|---------|----------------|--------------|---------|---------------|
| Đơn | $\int_a^b f\,dx$ | đoạn $[a,b]$ (1D) | độ dài $b-a$ | $dx$ | dải mỏng (diện tích) |
| Kép | $\iint_D f\,dA$ | miền $D$ (2D) | diện tích $D$ | $dA = dx\,dy$ | cột mỏng (thể tích) |
| Ba | $\iiint_V f\,dV$ | khối $V$ (3D) | thể tích $V$ | $dV = dx\,dy\,dz$ | "hộp" 4D (siêu thể tích) |

Mỗi lần tăng 1 chiều: miền tăng 1 chiều, và khi $f=1$ thì kết quả là "kích thước" của miền (độ dài → diện tích → thể tích).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân kép khác gì 2 lần tích phân đơn?"* Tích phân kép quét trên **cả miền 2D** (cộng $f\cdot\Delta A$ của mọi ô nhỏ). Fubini cho phép tính nó **bằng** 2 tích phân đơn lồng nhau — đó là kỹ thuật tính, còn ý nghĩa là tổng trên 2D.
- *"$f$ âm thì $\iint$ ra gì?"* Phần $f < 0$ đóng góp **âm** (thể tích "dưới mặt xy" tính trừ). Nếu cần thể tích thực luôn dương, lấy $\iint|f|$.
- *"Vì sao viết $dA$ chứ không luôn là $dx\,dy$?"* $dA$ là **phần tử diện tích** trừu tượng, không gắn với hệ tọa độ nào. Trong Descartes $dA = dx\,dy$; trong cực $dA = r\,dr\,d\theta$. Viết $dA$ để công thức đúng với mọi hệ, rồi mới thay biểu thức cụ thể khi tính (xem mục 4).

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

💡 **Trực giác / Hình dung — tích phân từng lớp**: cắt khối thể tích thành các "lát mỏng". Với mỗi $x$ cố định, lát theo $y$ có diện tích $A(x) = \int f\,dy$. Cộng tất cả các lát ($\int A(x)\,dx$) ra thể tích. Giống đo thể tích ổ bánh mì bằng cách cộng diện tích từng lát cắt × độ dày.

```
  Khối 3D dưới mặt cong          Cắt thành lát theo x:
       _______                    mỗi lát = mặt phẳng x = const
      /      /|                    diện tích lát = A(x) = ∫ f(x,y) dy
     /______/ |        →          ┃   ┃   ┃   ┃   ┃   ┃
     |      | /                   ┃ A ┃ A ┃ A ┃ A ┃ A ┃  ← cộng A(x)·dx
     |______|/                    ┗━━━┻━━━┻━━━┻━━━┻━━━┛    ra thể tích
                                  a                   b  (trục x)
```

Hai bước rời rạc: **(1)** "tích phân trong" $\int_c^d f\,dy$ — coi $x$ là **hằng số** — ra diện tích lát $A(x)$, một biểu thức theo $x$; **(2)** "tích phân ngoài" $\int_a^b A(x)\,dx$ — cộng mọi lát — ra một **số**. Đổi thứ tự = cắt lát theo $y$ thay vì theo $x$; cùng khối nên cùng thể tích.

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

#### Walk-through 4 ví dụ tích phân kép trên hình chữ nhật

Chạy đủ 2 bước (trong → ngoài) trên miền chữ nhật, để thấy quy trình ổn định với nhiều dạng hàm khác nhau.

**Ví dụ 1 (hàm hằng)**: $\iint_{[0,3]\times[0,2]} 5\,dA$.
- Trong (theo $y$, coi $x$ hằng): $\int_0^2 5\,dy = \left[5y\right]_0^2 = 10$.
- Ngoài (theo $x$): $\int_0^3 10\,dx = \left[10x\right]_0^3 = \mathbf{30}$.
- **Kiểm tra ý nghĩa**: hàm hằng $f = 5$ trên đáy diện tích $3\times 2 = 6$ → khối hộp thể tích $5\cdot 6 = 30$ ✓. Hàm hằng = "nóc nhà phẳng".

**Ví dụ 2 (tách được — separable)**: $\iint_{[0,1]\times[0,3]} x^2 y\,dA$.
- Trong (theo $y$): $\int_0^3 x^2 y\,dy = x^2\left[\frac{y^2}{2}\right]_0^3 = x^2\cdot\frac{9}{2} = \frac{9x^2}{2}$.
- Ngoài (theo $x$): $\int_0^1 \frac{9x^2}{2}\,dx = \frac{9}{2}\left[\frac{x^3}{3}\right]_0^1 = \frac{9}{2}\cdot\frac{1}{3} = \mathbf{\dfrac{3}{2}}$.
- **Mẹo separable**: vì $f = x^2\cdot y$ tách thành (hàm chỉ theo $x$)×(hàm chỉ theo $y$) trên hình chữ nhật, tích phân kép **bằng tích 2 tích phân đơn**: $\left(\int_0^1 x^2 dx\right)\left(\int_0^3 y\,dy\right) = \frac{1}{3}\cdot\frac{9}{2} = \frac{3}{2}$ ✓.

**Ví dụ 3 (chứa $e^x$, tách được)**: $\iint_{[0,1]\times[0,1]} e^x\cos y\,dA$.
- Trong (theo $y$): $\int_0^1 e^x\cos y\,dy = e^x\left[\sin y\right]_0^1 = e^x\sin 1$.
- Ngoài (theo $x$): $\int_0^1 e^x\sin 1\,dx = \sin 1\left[e^x\right]_0^1 = \sin 1\,(e - 1) \approx 0.8415\cdot 1.718 \approx \mathbf{1.446}$.

**Ví dụ 4 (không tách được — phải tích phân lồng)**: $\iint_{[0,2]\times[0,1]} (x + y)^2\,dA$.
- Trong (theo $y$, $x$ hằng): $\int_0^1 (x+y)^2\,dy = \left[\frac{(x+y)^3}{3}\right]_0^1 = \frac{(x+1)^3 - x^3}{3}$.
- Khai triển tử: $(x+1)^3 - x^3 = (x^3 + 3x^2 + 3x + 1) - x^3 = 3x^2 + 3x + 1$. Vậy lát $A(x) = \frac{3x^2 + 3x + 1}{3} = x^2 + x + \frac{1}{3}$.
- Ngoài (theo $x$): $\int_0^2 \left(x^2 + x + \frac{1}{3}\right)dx = \left[\frac{x^3}{3} + \frac{x^2}{2} + \frac{x}{3}\right]_0^2 = \frac{8}{3} + 2 + \frac{2}{3} = \frac{10}{3} + 2 = \mathbf{\dfrac{16}{3}}$.
- **Vì sao không tách**: $(x+y)^2 = x^2 + 2xy + y^2$ có hạng tử chéo $2xy$ — không viết được thành (hàm $x$)×(hàm $y$), nên không dùng mẹo separable mà phải tích phân lồng đầy đủ.

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

ASCII miền $T$ và cách quét cột (cố định $x$, $y$ chạy từ $0$ lên đường $y = x$):

```
   y
   |          (1,1)
 1 +         *
   |       / |
   |     /   |  ← cột tại x: y chạy từ y=0 (Ox)
   |   /  ↑  |    lên y=x (cạnh huyền)
   | /   ┊   |
 0 *━━━━━┻━━━*━━ x
  (0,0)  x  (1,0)
        cận: 0 ≤ y ≤ x
```

#### Walk-through thêm 3 ví dụ miền tổng quát

Mỗi ví dụ: **(i)** vẽ/mô tả miền, **(ii)** quét cột tìm cận biến trong, **(iii)** tích phân trong → ngoài.

**Ví dụ A (miền dưới parabol)**: $\iint_D 2x\,dA$, $D = \{0 \le x \le 2,\ 0 \le y \le x^2\}$.
- Cận: cố định $x$, $y$ đi từ $0$ (trục Ox) lên $x^2$ (đường parabol).

```
   y
 4 +              * (2,4)
   |           __/
   |        __/ |   y = x²
   |     __/  ↑ |   ← cột: 0 ≤ y ≤ x²
 0 *══════════━━*━━ x
  0           2
```

- Trong (theo $y$): $\int_0^{x^2} 2x\,dy = 2x\left[y\right]_0^{x^2} = 2x\cdot x^2 = 2x^3$.
- Ngoài (theo $x$): $\int_0^2 2x^3\,dx = \left[\frac{x^4}{2}\right]_0^2 = \frac{16}{2} = \mathbf{8}$.

**Ví dụ B (miền giữa 2 đường cong)**: $\iint_D 1\,dA$, $D$ kẹp giữa $y = x^2$ (dưới) và $y = x$ (trên), với $0 \le x \le 1$. (Đây cũng là diện tích vùng kẹp.)
- Trên $[0,1]$ thì $x \ge x^2$ (vd $x=0.5$: $0.5 > 0.25$), nên $y$ chạy từ biên dưới $x^2$ lên biên trên $x$.

```
   y
 1 +        *(1,1)   ← y = x (trên)
   |      / |
   |    /▒▒/        ▒ = miền D (kẹp giữa)
   |  /▒▒/  y = x² (dưới)
 0 *━━━━━━━━━ x
  0        1
```

- Trong (theo $y$): $\int_{x^2}^{x} 1\,dy = \left[y\right]_{x^2}^{x} = x - x^2$.
- Ngoài (theo $x$): $\int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \mathbf{\dfrac{1}{6}}$.

**Ví dụ C (cận theo chiều ngang — quét theo $y$)**: $\iint_D y\,dA$, $D$ = tam giác $(0,0)$, $(0,2)$, $(1,2)$. Lần này cố định $y$, cho $x$ chạy.
- Cạnh xiên nối $(0,0)$–$(1,2)$ có phương trình $y = 2x$, tức $x = y/2$. Với $y$ cố định trong $[0,2]$: $x$ đi từ $0$ (trục Oy) tới $y/2$ (cạnh xiên).

```
   y
 2 +━━━━━*(1,2)
   |▒▒▒/ |
   |▒▒/  ← hàng tại y: x chạy 0 → y/2
   |▒/   x = y/2 (cạnh xiên)
 0 *━━━ x
  0   1
```

- Trong (theo $x$): $\int_0^{y/2} y\,dx = y\left[x\right]_0^{y/2} = y\cdot\frac{y}{2} = \frac{y^2}{2}$.
- Ngoài (theo $y$): $\int_0^2 \frac{y^2}{2}\,dy = \frac{1}{2}\left[\frac{y^3}{3}\right]_0^2 = \frac{1}{2}\cdot\frac{8}{3} = \mathbf{\dfrac{4}{3}}$.
- **Ghi nhớ**: chọn quét theo cột (cố định $x$) hay theo hàng (cố định $y$) tùy miền — cái nào cho cận đơn giản hơn thì chọn (xem mục 3.5 về đổi thứ tự).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao tìm cận $g(x)$, $h(x)$?"* Vẽ miền $D$, cố định 1 giá trị $x$, xem $y$ chạy từ biên nào tới biên nào. Vd tam giác trên: tại $x$ cố định, $y$ đi từ trục Ox ($y=0$) lên đường $y=x$.
- *"Tích phân trong còn ra số không?"* Không — ra **biểu thức theo $x$** (vì cận phụ thuộc $x$), rồi tích phân ngoài mới khử hết thành số.

⚠ **Lỗi thường gặp — đặt cận biến trong là hằng số thay vì hàm**. Trên miền cong, cận tích phân **trong** phải là hàm của biến ngoài. Phản ví dụ: tam giác $T$ ở trên, nếu đặt nhầm $0 \le y \le 1$ (cố định) thì tính ra diện tích hình vuông, không phải tam giác → sai miền.

🔁 **Dừng lại tự kiểm tra**

1. Mô tả cận cho miền $D$ dưới parabol $y = x^2$, trên trục Ox, từ $x = 0$ đến $x = 2$.

<details><summary>Đáp án</summary>

$0 \le x \le 2$, $\mathbf{0 \le y \le x^2}$. $\iint_D f\,dA = \int_0^2 \int_0^{x^2} f\,dy\,dx$ (cận trên của $y$ là hàm $x^2$).

</details>

### 3.5. Đổi thứ tự tích phân

💡 **Trực giác / Hình dung**: cùng một khối, cắt lát **theo $x$** (dọc) hay **theo $y$** (ngang) đều ra cùng thể tích — nhưng cận hai cách **khác hẳn nhau**. Đổi thứ tự = mô tả lại **cùng miền $D$** từ góc nhìn biến kia. Quy trình: **(1)** vẽ miền $D$, **(2)** đọc lại cận theo biến mới (quét hàng thay vì cột, hoặc ngược lại), **(3)** tính.

**Vì sao cần đổi?** Hai lý do: (a) tích phân trong theo thứ tự cũ **không tính được bằng tay** (vd $\int e^{x^2}dx$ không có nguyên hàm sơ cấp) nhưng đổi thứ tự thì tính được; (b) một thứ tự cần **tách miền thành nhiều phần**, thứ tự kia chỉ cần **một** tích phân.

⚠ **Lỗi thường gặp — giữ nguyên cận khi đổi thứ tự.** KHÔNG được chỉ hoán hai dấu $\int$ rồi giữ y nguyên cận cũ. Cận **phải đọc lại từ hình**. Phản ví dụ: $\int_0^1\int_0^x f\,dy\,dx$ (tam giác dưới đường $y=x$) đổi thành $\int_0^1\int_0^y f\,dx\,dy$ là **SAI** — cận đúng phải là $\int_0^1\int_y^1 f\,dx\,dy$ (xem Ví dụ 1 ngay dưới).

**Ví dụ 1 (tam giác — đọc lại cận)**: đổi thứ tự cho $\displaystyle\int_0^1\int_0^x f(x,y)\,dy\,dx$.

Miền: $0 \le x \le 1$, $0 \le y \le x$ — tam giác dưới đường $y = x$.

```
  Thứ tự cũ (dy dx): quét CỘT      Thứ tự mới (dx dy): quét HÀNG
   y                                y
 1 +      *(1,1)                  1 +      *(1,1)
   |    / |  cố định x:             |▒▒▒▒/   cố định y:
   |  / ↑ |  y: 0 → x               |▒▒▒/    x: y → 1
   |/   ┊ |                         |▒▒/ →
 0 *━━━━━*━ x                     0 *━━━━━*━ x
  0      1                          0      1
```

- Đọc lại cận theo $y$: với mỗi $y \in [0,1]$ cố định, điểm trong tam giác có $x$ chạy từ đường $x = y$ (cạnh huyền) tới $x = 1$ (cạnh phải). Vậy $y \le x \le 1$.
- **Kết quả**: $\displaystyle\int_0^1\int_0^x f\,dy\,dx = \int_0^1\int_y^1 f\,dx\,dy$.
- **Verify bằng số** với $f = 1$ (ra diện tích tam giác $= \frac12$): cũ $\int_0^1 x\,dx = \frac12$; mới $\int_0^1 (1-y)\,dy = \left[y - \frac{y^2}{2}\right]_0^1 = \frac12$ ✓.

**Ví dụ 2 (đổi thứ tự để tính được — kinh điển)**: tính $\displaystyle\int_0^1\int_x^1 e^{y^2}\,dy\,dx$.

Thử tính trực tiếp: tích phân trong $\int_x^1 e^{y^2}\,dy$ — hàm $e^{y^2}$ **không có nguyên hàm sơ cấp**, bế tắc. Đổi thứ tự.

Miền: $0 \le x \le 1$, $x \le y \le 1$ — tam giác **trên** đường $y = x$.

```
  Cũ (dy dx): cột, y: x → 1       Mới (dx dy): hàng, x: 0 → y
   y                               y
 1 +━━━━━*(1,1)                   1 +━━━━━*
   |▒▒▒/ |                          |▒▒▒/ |
   |▒▒/ ↑| y: x→1                   |▒▒/  | x: 0→y
   |▒/   |                          |▒/ → |
 0 *━━━━━* x                      0 *━━━━━* x
  0      1                          0      1
```

- Đọc lại: với $y$ cố định trong $[0,1]$, $x$ chạy từ $0$ tới $y$. Vậy $0 \le x \le y$.
- Đổi: $\displaystyle\int_0^1\int_0^y e^{y^2}\,dx\,dy$. Bây giờ tích phân trong **theo $x$**, mà $e^{y^2}$ là hằng theo $x$:
$$\int_0^y e^{y^2}\,dx = e^{y^2}\left[x\right]_0^y = y\,e^{y^2}.$$
- Ngoài (theo $y$, đặt $u = y^2$, $du = 2y\,dy$): $\displaystyle\int_0^1 y\,e^{y^2}\,dy = \left[\frac{1}{2}e^{y^2}\right]_0^1 = \frac{1}{2}(e - 1) \approx \mathbf{0.859}$.
- **Bài học**: thừa số $y$ xuất hiện tự nhiên sau khi đổi thứ tự, biến tích phân bế tắc thành tích phân dễ. Đây là lý do quan trọng nhất để biết đổi thứ tự.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết khi nào nên đổi thứ tự?"* Ba dấu hiệu: (1) tích phân trong không có nguyên hàm sơ cấp ($e^{y^2}$, $\sin(y^2)$, $\frac{\sin y}{y}$...); (2) cận thứ tự hiện tại buộc tách miền thành nhiều mảnh; (3) cận biến trong xấu, đổi sang thì gọn.
- *"Đổi thứ tự có làm đổi đáp số không?"* **Không** — cùng miền, cùng $f$ → cùng thể tích (Fubini). Chỉ đổi cách tính. Nếu hai cách ra hai số khác nhau, chắc chắn đọc sai cận một bên.

🔁 **Dừng lại tự kiểm tra**

1. Viết lại $\displaystyle\int_0^2\int_0^{x} f\,dy\,dx$ theo thứ tự $dx\,dy$.

<details><summary>Đáp án</summary>

Miền: $0 \le x \le 2$, $0 \le y \le x$ — tam giác dưới $y=x$, đỉnh $(2,2)$. Đọc lại theo $y$: $0 \le y \le 2$, và $x$ chạy từ $x=y$ tới $x=2$. Vậy $\displaystyle\int_0^2\int_y^2 f\,dx\,dy$. Verify $f=1$: cũ $\int_0^2 x\,dx = 2$; mới $\int_0^2 (2-y)\,dy = [2y - \frac{y^2}{2}]_0^2 = 4-2 = 2$ ✓.

</details>

### 📝 Tóm tắt mục 3

- Miền cong: cận biến trong là **hàm** của biến ngoài (men theo biên).
- Tích phân trong ra biểu thức theo biến ngoài, rồi tích phân ngoài khử thành số.
- Vẽ miền + quét cột để xác định cận $g(x)$, $h(x)$.
- **Đổi thứ tự tích phân**: vẽ miền → đọc lại cận theo biến kia (KHÔNG giữ cận cũ). Dùng khi tích phân trong bế tắc ($e^{y^2}$) hoặc cận xấu; đáp số không đổi.

---

## 4. Đổi biến — Tọa độ cực

💡 **Trực giác / Hình dung**: với miền tròn, dùng $(x, y)$ khiến cận xấu (đường tròn $x^2+y^2 = R^2$). Đổi sang $(r, \theta)$ — "khoảng cách tới tâm" và "góc" — thì hình tròn thành hình chữ nhật đơn giản ($0 \le r \le R$, $0 \le \theta \le 2\pi$). Thừa số **$r$** trong $dA = r\,dr\,d\theta$ là vì ô lưới cực ở xa tâm thì **to hơn** (cung dài hơn): diện tích ô $\approx r\,dr\,d\theta$.

Với miền tròn / đối xứng quay, dùng tọa độ cực:

$$x = r\cos\theta, \quad y = r\sin\theta, \quad dA = r\,dr\,d\theta$$

(Yếu tố Jacobian $= r$.)

#### Vì sao có thừa số $r$ — derivation bằng hình

Ô lưới cực không phải hình vuông mà là hình "rẻ quạt nhỏ", giới hạn bởi 2 bán kính (cách nhau góc $d\theta$) và 2 cung tròn (cách nhau $dr$):

```
        ╱ cung ngoài, dài (r+dr)·dθ ≈ r·dθ
       ╱┄┄┄┄┄┄┄┄
      ╱ ▒▒▒▒▒▒ │ dr   ← ô cực: dày dr, rộng (cung) r·dθ
     ╱ ▒▒▒▒▒▒┄┄┘       diện tích ≈ dr × (r·dθ) = r dr dθ
    ╱_θ___ cung trong, dài r·dθ
   O (tâm)
   xa tâm (r lớn) → cung dài hơn → ô TO hơn
```

Cung tròn dài = bán kính × góc $= r\,d\theta$ (công thức độ dài cung). Ô cực ≈ chữ nhật cạnh $dr$ và $r\,d\theta$ → **diện tích $= r\,dr\,d\theta$**. Thừa số $r$ chính là **Jacobian** của phép đổi biến: ô ở xa tâm (r lớn) to hơn ô gần tâm, nên phải nhân trọng số $r$ để "đếm" thể tích cho đúng.

**Ví dụ 1**: Tính $\iint_D (x^2 + y^2)\,dA$, $D$ = đĩa bán kính $R$.
- $D$: $0 \le r \le R$, $0 \le \theta \le 2\pi$.
- $x^2 + y^2 = r^2$ (đổi biểu thức sang cực — gọn hẳn).
- $\displaystyle = \int_0^{2\pi} \int_0^R \underbrace{r^2}_{f}\cdot \underbrace{r}_{\text{Jac}}\,dr\,d\theta = \int_0^{2\pi} \left[\frac{r^4}{4}\right]_0^R d\theta = \int_0^{2\pi} \frac{R^4}{4}\,d\theta = \mathbf{\dfrac{\pi R^4}{2}}$.

**Ví dụ 2 (tích phân Gauss — không tính được trong Descartes)**: tính $\displaystyle I^2 = \iint_{\mathbb{R}^2} e^{-(x^2+y^2)}\,dA$, từ đó suy ra $I = \int_{-\infty}^{\infty} e^{-x^2}\,dx$.
- Trong Descartes, $\int e^{-x^2}dx$ không có nguyên hàm sơ cấp — bế tắc. Đổi sang cực: $x^2 + y^2 = r^2$, miền $\mathbb{R}^2$ thành $0 \le r < \infty$, $0 \le \theta \le 2\pi$.
$$I^2 = \int_0^{2\pi}\int_0^{\infty} e^{-r^2}\cdot r\,dr\,d\theta.$$
- Trong (theo $r$, đặt $u = r^2$, $du = 2r\,dr$): $\displaystyle\int_0^{\infty} e^{-r^2} r\,dr = \left[-\frac{1}{2}e^{-r^2}\right]_0^{\infty} = 0 - \left(-\frac{1}{2}\right) = \frac{1}{2}$.
- Ngoài: $\displaystyle\int_0^{2\pi}\frac{1}{2}\,d\theta = \pi$. Vậy $I^2 = \pi \Rightarrow I = \sqrt{\pi}$.
- **Điểm mấu chốt**: chính thừa số $r$ (Jacobian) tạo ra $r\,e^{-r^2}$ tích phân được dễ dàng — trong khi $e^{-x^2}$ thì không. Kết quả $\int_{-\infty}^\infty e^{-x^2}dx = \sqrt{\pi}$ là nền tảng của phân phối chuẩn (Gauss) trong xác suất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $dA = r\,dr\,d\theta$ chứ không phải $dr\,d\theta$?"* Ô lưới cực hình "rẻ quạt" có 2 cạnh: bề dày $dr$ và cung $r\,d\theta$ (cung = bán kính $\times$ góc). Diện tích ô $\approx dr \times (r\,d\theta) = r\,dr\,d\theta$. Thừa số $r$ là Jacobian của phép đổi biến.
- *"Khi nào nên đổi sang cực?"* Khi miền tròn/quạt/vành khăn HOẶC biểu thức chứa $x^2+y^2$ (thành $r^2$, gọn hẳn).

⚠ **Lỗi thường gặp — quên thừa số $r$**. Đây là lỗi #1 với tọa độ cực. Phản ví dụ: diện tích đĩa bán kính $R = \iint r\,dr\,d\theta = \pi R^2$. Nếu quên $r$: $\iint dr\,d\theta = R\cdot 2\pi = 2\pi R$ (sai cả thứ nguyên — ra chu vi-ish chứ không phải diện tích).

🔁 **Dừng lại tự kiểm tra**

1. Tính diện tích đĩa bán kính 2 bằng tọa độ cực.

<details><summary>Đáp án</summary>

$\int_0^{2\pi}\int_0^2 r\,dr\,d\theta = \int_0^{2\pi} \left[\frac{r^2}{2}\right]_0^2 d\theta = \int_0^{2\pi} 2\,d\theta = 4\pi$. Khớp $\pi R^2 = \pi\cdot 4 = \mathbf{4\pi}$ ✓.

</details>

2. Tính diện tích **một phần tư đĩa** (góc phần tư thứ nhất) bán kính 3 bằng tọa độ cực.

<details><summary>Đáp án</summary>

Cận góc chỉ còn $0 \le \theta \le \frac{\pi}{2}$, bán kính $0 \le r \le 3$: $\int_0^{\pi/2}\int_0^3 r\,dr\,d\theta = \int_0^{\pi/2}\frac{9}{2}\,d\theta = \frac{9}{2}\cdot\frac{\pi}{2} = \mathbf{\dfrac{9\pi}{4}}$. Khớp $\frac{1}{4}\pi R^2 = \frac{1}{4}\cdot 9\pi = \frac{9\pi}{4}$ ✓ (đúng một phần tư diện tích đĩa $9\pi$).

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

#### Walk-through tích phân ba trên hình hộp (Descartes)

**Ví dụ (hộp)**: $\displaystyle\iiint_V xyz\,dV$, $V = [0,1]\times[0,2]\times[0,3]$. Tích phân lồng 3 lớp, mỗi lớp coi 2 biến kia là hằng:
- Trong nhất (theo $z$): $\int_0^3 xyz\,dz = xy\left[\frac{z^2}{2}\right]_0^3 = xy\cdot\frac{9}{2} = \frac{9xy}{2}$.
- Giữa (theo $y$): $\int_0^2 \frac{9xy}{2}\,dy = \frac{9x}{2}\left[\frac{y^2}{2}\right]_0^2 = \frac{9x}{2}\cdot 2 = 9x$.
- Ngoài (theo $x$): $\int_0^1 9x\,dx = 9\left[\frac{x^2}{2}\right]_0^1 = \mathbf{\dfrac{9}{2}}$.
- **Mẹo separable** (kiểm tra): $\left(\int_0^1 x\,dx\right)\left(\int_0^2 y\,dy\right)\left(\int_0^3 z\,dz\right) = \frac{1}{2}\cdot 2\cdot\frac{9}{2} = \frac{9}{2}$ ✓.

#### Walk-through tích phân ba trên miền tổng quát (cận z phụ thuộc x, y)

Khi $V$ không phải hộp, cận cũng "men theo biên" như miền 2D — chỉ là **3 lớp** thay vì 2. Quy ước thường gặp: cận $z$ là hàm theo $(x,y)$, chiếu xuống mặt phẳng $xy$ ra miền 2D $D$, rồi tích phân $D$ như mục 3.

**Ví dụ (tứ diện)**: $\displaystyle\iiint_V 1\,dV$ trên tứ diện chặn bởi 3 mặt tọa độ và mặt phẳng $x+y+z = 1$ (các giao $\ge 0$). Đây là thể tích tứ diện.
- **Cận $z$**: cố định $(x,y)$, $z$ chạy từ $0$ (mặt $xy$) lên $1-x-y$ (mặt phẳng nghiêng).
- **Chiếu xuống $xy$** ($z=0$): miền $D$ là tam giác $x+y\le 1$, tức $0\le x\le 1$, $0\le y\le 1-x$.
$$V = \int_0^1\int_0^{1-x}\int_0^{1-x-y} 1\,dz\,dy\,dx.$$
- Trong nhất (theo $z$): $\int_0^{1-x-y} dz = 1-x-y$.
- Giữa (theo $y$): $\int_0^{1-x} (1-x-y)\,dy = \left[(1-x)y - \frac{y^2}{2}\right]_0^{1-x} = (1-x)^2 - \frac{(1-x)^2}{2} = \frac{(1-x)^2}{2}$.
- Ngoài (theo $x$): $\int_0^1 \frac{(1-x)^2}{2}\,dx = \frac{1}{2}\left[-\frac{(1-x)^3}{3}\right]_0^1 = \frac{1}{2}\cdot\frac{1}{3} = \mathbf{\dfrac{1}{6}}$.
- **Kiểm tra**: tứ diện vuông cạnh $1$ có thể tích $\frac{1}{6}$ (= $\frac{1}{6}$ khối lập phương đơn vị) ✓.

#### Walk-through tọa độ trụ — thể tích hình trụ

**Ví dụ (trụ)**: thể tích hình trụ bán kính $a$, cao $h$, dùng $dV = r\,dr\,d\theta\,dz$ với $f = 1$:
$$V = \int_0^h\int_0^{2\pi}\int_0^a r\,dr\,d\theta\,dz.$$
- Theo $r$: $\int_0^a r\,dr = \frac{a^2}{2}$. Theo $\theta$: $\int_0^{2\pi} d\theta = 2\pi$. Theo $z$: $\int_0^h dz = h$.
- Tích $= \frac{a^2}{2}\cdot 2\pi\cdot h = \mathbf{\pi a^2 h}$ ✓ (đúng công thức "diện tích đáy × chiều cao").

**Verify thể tích cầu bán kính $R$** (tọa độ cầu, $f = 1$):
- $\int_0^{2\pi}\int_0^\pi\int_0^R \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$.
- Theo $\rho$: $\int_0^R \rho^2\,d\rho = \frac{R^3}{3}$. Theo $\varphi$: $\int_0^\pi \sin\varphi\,d\varphi = \left[-\cos\varphi\right]_0^\pi = -(-1)-(-1) = 2$. Theo $\theta$: $\int_0^{2\pi} d\theta = 2\pi$.
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

Đại lượng quan trọng trong cơ học: $I_z$ đo **độ "khó quay"** của vật quanh trục $z$ — khối lượng càng xa trục (thừa số $x^2+y^2$ lớn) thì đóng góp càng nhiều. Cùng khối lượng, vật phân bố ở rìa khó quay hơn vật dồn vào tâm.

**Walk-through — momen quán tính đĩa đặc**: đĩa bán kính $R$, mật độ đều $\rho$, quay quanh trục qua tâm. Dùng tọa độ cực ($x^2+y^2=r^2$, $dA = r\,dr\,d\theta$):
$$I_z = \int_0^{2\pi}\int_0^R r^2\cdot\rho\cdot r\,dr\,d\theta = \rho\int_0^{2\pi}\left[\frac{r^4}{4}\right]_0^R d\theta = \rho\cdot\frac{R^4}{4}\cdot 2\pi = \frac{\pi\rho R^4}{2}.$$
Khối lượng đĩa $M = \rho\cdot\pi R^2$, nên $I_z = \frac{\pi\rho R^4}{2} = \frac{1}{2}(\rho\pi R^2)R^2 = \mathbf{\dfrac{1}{2}MR^2}$ — đúng công thức momen quán tính đĩa trong sách vật lý ✓.

💡 **Trực giác / Hình dung**: cùng 1 công cụ tích phân kép/bội, đổi hàm $f$ là ra đại lượng khác. $f = 1$ → diện tích/thể tích. $f = \rho$ (mật độ) → khối lượng. $f = x\cdot\rho$ → "momen" để tính khối tâm. $f = (x^2+y^2)\cdot\rho$ → momen quán tính (đo "khó quay" của vật). Khối tâm = vị trí trung bình có trọng số theo mật độ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khối tâm chia cho $\iint\rho\,dA$?"* Vì đó là **trung bình có trọng số**: tử = tổng (vị trí $\times$ khối lượng nhỏ), mẫu = tổng khối lượng. Chia ra vị trí trung bình. Mật độ đều thì $\rho$ rút gọn → khối tâm = trọng tâm hình học.

#### Walk-through khối tâm — mật độ KHÔNG đều

**Ví dụ**: tấm hình vuông $D = [0,1]\times[0,1]$, mật độ $\rho(x,y) = x$ (bên phải nặng hơn). Tìm $\bar{x}$.
- **Khối lượng** (mẫu số): $M = \iint_D x\,dA = \int_0^1\int_0^1 x\,dy\,dx = \int_0^1 x\,dx = \frac{1}{2}$.
- **Momen theo $x$** (tử số): $M_y = \iint_D x\cdot\rho\,dA = \iint_D x\cdot x\,dA = \int_0^1\int_0^1 x^2\,dy\,dx = \int_0^1 x^2\,dx = \frac{1}{3}$.
- $\bar{x} = \dfrac{M_y}{M} = \dfrac{1/3}{1/2} = \mathbf{\dfrac{2}{3}}$.
- **Kiểm tra trực giác**: mật độ tăng theo $x$ (phải nặng hơn) nên khối tâm lệch sang phải, $\bar{x} = \frac{2}{3} > \frac{1}{2}$ (tâm hình học) ✓. Nếu mật độ đều, $\bar{x}$ sẽ là $\frac{1}{2}$.
- $\bar{y}$: vì $\rho = x$ không phụ thuộc $y$ và miền đối xứng theo $y$ → $\bar{y} = \frac{1}{2}$.

⚠ **Lỗi thường gặp — quên chia cho tổng khối lượng khi tính khối tâm**. $\bar{x} = \dfrac{\iint x\rho\,dA}{\iint \rho\,dA}$. Quên mẫu số → ra "momen" chứ không phải tọa độ (sai thứ nguyên). Ví dụ trên: nếu chỉ tính tử $\frac{1}{3}$ rồi báo "$\bar{x} = \frac{1}{3}$" là sai — phải chia cho $M = \frac{1}{2}$ ra $\frac{2}{3}$.

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

**Bài 6**: Đổi thứ tự tích phân của $\displaystyle\int_0^1\int_{\sqrt{x}}^{1} f(x,y)\,dy\,dx$ sang thứ tự $dx\,dy$.

**Bài 7**: Tính $\displaystyle\int_0^1\int_y^1 \sin(x^2)\,dx\,dy$ bằng cách đổi thứ tự tích phân.

**Bài 8**: Tính $\iint_D (x^2+y^2)\,dA$ trên vành khăn (annulus) $1 \le x^2+y^2 \le 4$ bằng tọa độ cực.

### Lời giải

**Bài 1**: Trong (theo $y$): $\int_0^2 3x^2\cdot y\,dy = 3x^2\cdot\left[\frac{y^2}{2}\right]_0^2 = 6x^2$. Ngoài: $\int_0^1 6x^2\,dx = \mathbf{2}$.

**Bài 2**: $\int_0^1 \int_x^1 x\,dy\,dx = \int_0^1 x(1-x)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \mathbf{\dfrac{1}{6}}$.

**Bài 3**: $V = \int_0^{2\pi} \int_0^\pi \int_0^R \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta = \frac{R^3}{3}\cdot 2\cdot 2\pi = \mathbf{\dfrac{4}{3}\pi R^3}$ ✓.

**Bài 4**: Diện tích đĩa $= \int_0^{2\pi} \int_0^3 r\,dr\,d\theta = \int_0^{2\pi} \frac{9}{2}\,d\theta = \mathbf{9\pi}$. Khớp $\pi R^2 = 9\pi$ ✓.

**Bài 5**: $D$: $0 \le x \le 1$, $0 \le y \le 1-x$. $S(D) = \frac{1}{2}$.  
- $\iint x\,dA = \int_0^1 x(1-x)\,dx = \frac{1}{6}$. $\bar{x} = \dfrac{1/6}{1/2} = \mathbf{\dfrac{1}{3}}$.  
- Tương tự $\bar{y} = \mathbf{\dfrac{1}{3}}$. → khối tâm $\left(\frac{1}{3}, \frac{1}{3}\right)$.

**Bài 6**: Miền cũ: $0 \le x \le 1$, $\sqrt{x} \le y \le 1$ — vùng giữa đường $y=\sqrt{x}$ (dưới) và $y=1$ (trên).

```
   y
 1 +━━━━━━━━*(1,1)
   |▒▒▒▒▒/         y = √x  (biên dưới)
   |▒▒▒/    miền: trên đường √x, dưới y=1
   |▒/
 0 *━━━━━━━ x
  0        1
```

Đọc lại theo $y$: với $y \in [0,1]$ cố định, biên $y = \sqrt{x} \Leftrightarrow x = y^2$. Trong miền, $x$ chạy từ $0$ tới $y^2$ (vì miền ở **bên trái** đường $y=\sqrt{x}$, tức $x \le y^2$). Vậy $0 \le x \le y^2$ và $0 \le y \le 1$:
$$\int_0^1\int_{\sqrt{x}}^1 f\,dy\,dx = \mathbf{\int_0^1\int_0^{y^2} f\,dx\,dy}.$$
Verify $f=1$ (diện tích): cũ $\int_0^1 (1-\sqrt{x})\,dx = \left[x - \frac{2}{3}x^{3/2}\right]_0^1 = 1 - \frac23 = \frac13$; mới $\int_0^1 y^2\,dy = \frac13$ ✓.

**Bài 7**: Tích phân trong $\int\sin(x^2)\,dx$ không có nguyên hàm sơ cấp → đổi thứ tự. Miền: $0\le y\le 1$, $y\le x\le 1$ — tam giác trên đường $y=x$. Đọc lại theo $x$: $0\le x\le 1$, $0\le y\le x$. Đổi:
$$\int_0^1\int_0^x \sin(x^2)\,dy\,dx.$$
Trong (theo $y$, $\sin(x^2)$ hằng): $\int_0^x \sin(x^2)\,dy = x\sin(x^2)$. Ngoài (đặt $u=x^2$, $du=2x\,dx$): $\int_0^1 x\sin(x^2)\,dx = \left[-\frac{1}{2}\cos(x^2)\right]_0^1 = \frac{1}{2}(1 - \cos 1) \approx \frac{1}{2}(1 - 0.5403) \approx \mathbf{0.230}$.

**Bài 8**: Vành khăn: $1 \le r \le 2$, $0 \le \theta \le 2\pi$; $x^2+y^2 = r^2$; $dA = r\,dr\,d\theta$.
$$\int_0^{2\pi}\int_1^2 r^2\cdot r\,dr\,d\theta = \int_0^{2\pi}\left[\frac{r^4}{4}\right]_1^2 d\theta = \int_0^{2\pi}\frac{16-1}{4}\,d\theta = \frac{15}{4}\cdot 2\pi = \mathbf{\dfrac{15\pi}{2}}.$$
(Kiểm tra: bằng kết quả đĩa $R=2$ trừ đĩa $R=1$: $\frac{\pi\cdot 2^4}{2} - \frac{\pi\cdot 1^4}{2} = 8\pi - \frac{\pi}{2} = \frac{15\pi}{2}$ ✓.)

---

## 8. Bài tiếp theo

[Lesson 06 — Chuỗi & Taylor](../lesson-06-series-taylor/).

## 📝 Tổng kết

1. **$\iint_D f\,dA$** = thể tích dưới mặt cong $f(x,y)$ trên miền $D$ (cộng các cột mỏng $f\cdot dA$).
2. **Fubini**: tính tích phân lặp (trong → ngoài, cắt lát từng lớp), thứ tự đổi được khi $f$ "đẹp". Hàm tách được → tích 2 tích phân đơn.
3. **Miền tổng quát**: cận biến trong là hàm của biến ngoài (quét cột/hàng). **Đổi thứ tự tích phân**: vẽ miền, đọc lại cận (KHÔNG giữ cận cũ) — cứu các tích phân bế tắc ($e^{y^2}$, $\sin x^2$).
4. **Tọa độ cực**: $dA = r\,dr\,d\theta$ (đừng quên Jacobian $r$). Cho miền tròn / biểu thức $x^2+y^2$; nhờ $r$ mà tính được tích phân Gauss $\int e^{-x^2}dx = \sqrt{\pi}$.
5. **Cầu, trụ**: 3 chiều đối xứng quay — trụ $dV = r\,dr\,d\theta\,dz$, cầu $dV = \rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$.
6. **Ứng dụng**: diện tích ($f=1$), thể tích, khối lượng ($f=\rho$), khối tâm (trung bình có trọng số — nhớ chia tổng khối lượng), momen quán tính.
