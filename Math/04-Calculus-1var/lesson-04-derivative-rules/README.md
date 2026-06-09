# Lesson 04 — Quy tắc đạo hàm

## Mục tiêu

- Thuộc **bảng đạo hàm cơ bản** ($x^n$, $\sin$, $\cos$, $e^x$, $\ln x$, ...).
- Áp dụng **5 quy tắc đại số**: hằng nhân, tổng/hiệu, tích, thương, chuỗi.
- Đặc biệt: **Quy tắc chuỗi** (chain rule) — quan trọng nhất Calculus.
- Đạo hàm **hàm hợp** và **hàm ngược**.

## Kiến thức tiền đề

- [Lesson 03 — Định nghĩa đạo hàm](../lesson-03-derivative-definition/).

---

## 1. Bảng đạo hàm cơ bản

| $f(x)$ | $f'(x)$ | Ghi chú |
|------|-------|---------|
| $c$ (hằng) | $0$ | |
| $x$ | $1$ | |
| $x^n$ | $n\cdot x^{n-1}$ | $n$ bất kỳ thực |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $= \frac{1}{2}\cdot x^{-1/2}$ |
| $\dfrac{1}{x}$ | $-\dfrac{1}{x^2}$ | |
| $e^x$ | $e^x$ | đẹp nhất! |
| $a^x$ | $a^x \cdot \ln a$ | |
| $\ln x$ | $\dfrac{1}{x}$ | |
| $\log_a x$ | $\dfrac{1}{x\cdot \ln a}$ | |
| $\sin x$ | $\cos x$ | |
| $\cos x$ | $-\sin x$ | |
| $\tan x$ | $\dfrac{1}{\cos^2 x} = \sec^2 x$ | |
| $\cot x$ | $-\dfrac{1}{\sin^2 x}$ | |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $-1<x<1$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ | |

💡 **Phải thuộc**. Có thể chứng minh từ định nghĩa, nhưng dùng nhiều thì nhớ.

**4 ví dụ số đa dạng (dùng $(x^n)' = n\cdot x^{n-1}$)**:
- $n$ nguyên dương: $(x^5)' = 5x^4$.
- $n$ âm: $(x^{-2})' = -2x^{-3} = -\frac{2}{x^3}$ (khớp $(1/x^2)'$).
- $n$ phân số: $(x^{1/2})' = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$ (khớp $(\sqrt{x})'$).
- $n = 1$: $(x^1)' = 1\cdot x^0 = 1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $(e^x)' = e^x$ mà $(a^x)' = a^x\cdot \ln a$?"* Vì $e$ là cơ số "tự nhiên" mà $\ln e = 1$. Tổng quát $(a^x)' = a^x\cdot \ln a$; thay $a = e$ thì $\ln e = 1$ triệt tiêu → $(e^x)' = e^x$. Đây chính là lý do $e$ đặc biệt.
- *"$(\ln x)' = \frac{1}{x}$ chỉ đúng khi $x > 0$?"* $\ln x$ chỉ xác định khi $x > 0$. Khi cần đạo hàm $\ln|x|$ (cả $x < 0$), kết quả vẫn là $\frac{1}{x}$ — chi tiết này quan trọng ở phần nguyên hàm $\int \frac{1}{x}\,dx = \ln|x| + C$ (L06).

⚠ **Lỗi thường gặp — $(x^n)' = n\cdot x^{n-1}$ nhưng $(a^x)' \neq x\cdot a^{x-1}$**. Khi **biến nằm ở số mũ** (như $2^x$), KHÔNG dùng quy tắc lũy thừa. $(2^x)' = 2^x\cdot \ln 2$, không phải $x\cdot 2^{x-1}$. Phân biệt "biến ở cơ số" ($x^n$) với "biến ở số mũ" ($a^x$).

🔁 **Dừng lại tự kiểm tra**

1. $(x^{-3})' = ?$
2. $(3^x)' = ?$ và $(x^3)' = ?$ — khác nhau thế nào?

<details><summary>Đáp án</summary>

1. $-3x^{-4} = -\frac{3}{x^4}$.
2. $(3^x)' = 3^x\cdot \ln 3$ (biến ở mũ); $(x^3)' = 3x^2$ (biến ở cơ số). Hoàn toàn khác công thức.

</details>

### 📝 Tóm tắt mục 1

- Thuộc bảng: $(x^n)' = n\cdot x^{n-1}$, $(e^x)' = e^x$, $(\ln x)' = \frac{1}{x}$, $(\sin x)' = \cos x$, $(\cos x)' = -\sin x$.
- $(a^x)' = a^x\cdot \ln a$; thay $a = e$ → $(e^x)' = e^x$ (vì $\ln e = 1$).
- Phân biệt biến ở **cơ số** ($x^n$) với biến ở **số mũ** ($a^x$) — hai công thức khác hẳn.

---

## 2. Năm quy tắc đại số

### 2.1. Hằng nhân
$$(c\cdot f)' = c\cdot f'$$
**Ví dụ**: $(5x^3)' = 5\cdot (x^3)' = 5\cdot 3x^2 = 15x^2$.

### 2.2. Tổng / hiệu
$$(f \pm g)' = f' \pm g'$$
**Ví dụ**: $(x^2 + \sin x)' = 2x + \cos x$.

### 2.3. Tích (Product rule)
$$(f\cdot g)' = f'\cdot g + f\cdot g'$$

💡 **Vì sao**: Khai triển định nghĩa, một phần tăng do f tăng, phần kia do g tăng.

**Ví dụ**: $(x^2\cdot \sin x)' = 2x\cdot \sin x + x^2\cdot \cos x$.

⚠ **Lỗi thường gặp**: $(f\cdot g)' \neq f'\cdot g'$. Đây không phải lũy thừa.

### 2.4. Thương (Quotient rule)
$$(f/g)' = \frac{f'\cdot g - f\cdot g'}{g^2}$$

**Mẹo nhớ "low-d-high - high-d-low" / "square the low"**:
- Mẫu × đạo hàm tử − tử × đạo hàm mẫu, tất cả chia cho mẫu bình phương.

**Ví dụ**: $(\sin x / x)' = \dfrac{\cos x \cdot x - \sin x \cdot 1}{x^2} = \dfrac{x\cdot \cos x - \sin x}{x^2}$.

### 2.5. Chuỗi (Chain rule) — QUAN TRỌNG NHẤT

$$(f(g(x)))' = f'(g(x)) \cdot g'(x)$$

💡 **Trực giác**: Hàm trong hàm. Đạo hàm = (đạo hàm ngoài tại $g(x)$) $\times$ (đạo hàm trong).

> 📐 **Định nghĩa đầy đủ — Chain rule**
>
> **(a) Là gì**: Khi $y = f(g(x))$ là hàm hợp (g trong f), thì $\frac{dy}{dx} = \frac{df}{du} \cdot \frac{du}{dx}$ với $u = g(x)$. Theo ký hiệu Leibniz: $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$ — như "nhân phân số" (chứ thực ra là 1 định lý).
>
> **(b) Vì sao cần**: Vì 90% hàm trong thực tế là hàm hợp — $\sin(2x+1)$, $e^{-x^2}$, $\ln(\cos x)$, v.v. Không có chain rule = không thể tính đạo hàm chúng. Đặc biệt quan trọng trong **AI/ML**: backpropagation trong neural network = chain rule áp dụng nhiều lớp. ChatGPT, Stable Diffusion... đều chạy được nhờ chain rule. Đây là rule "đóng vai trò xương sống" trong tính toán symbolic.
>
> **(c) Ví dụ số**: $y = \sin(x^2)$. Ngoài: $f(u) = \sin u$, $f'(u) = \cos u$. Trong: $u = x^2$, $u' = 2x$. $y' = \cos(x^2)\cdot 2x$. Tại $x = 1$: $y'(1) = \cos(1)\cdot 2 \approx$ **1.0806**. $y = e^{3x}$: ngoài $e^u$, trong $3x$ → $y' = e^{3x}\cdot 3 = 3e^{3x}$. $y = \ln(\cos x)$: $y' = \frac{1}{\cos x}\cdot(-\sin x) = -\tan x$. $y = (2x+1)^5$: $y' = 5(2x+1)^4\cdot 2 = 10(2x+1)^4$. Hợp 3 lớp $y = \sin(\ln(x^2))$: $y' = \cos(\ln(x^2)) \cdot \frac{1}{x^2} \cdot 2x = \frac{2\cos(\ln(x^2))}{x}$.

**Ví dụ 1**: $y = \sin(x^2)$.
- $f(u) = \sin u$, $g(x) = x^2$.
- $y' = \cos(x^2) \cdot 2x$.

**Ví dụ 2**: $y = e^{3x+1}$.
- $f(u) = e^u$, $g = 3x+1$.
- $y' = e^{3x+1} \cdot 3$.

**Ví dụ 3** (hợp 3 lớp): $y = \ln(\sin(x^2))$.
- $y' = \frac{1}{\sin(x^2)} \cdot \cos(x^2) \cdot 2x = \frac{2x\cdot \cos(x^2)}{\sin(x^2)} = 2x\cdot \cot(x^2)$.

⟶ **Quy tắc**: từ ngoài vào trong, mỗi lớp nhân thêm đạo hàm.

**Verify product rule bằng số** — $(x^2\cdot \sin x)' = 2x\cdot \sin x + x^2\cdot \cos x$ tại $x = 1$:
- Công thức: $2\cdot 1\cdot \sin 1 + 1\cdot \cos 1 = 2\cdot 0.8415 + 0.5403 = 2.223$.
- Xấp xỉ định nghĩa: $\frac{f(1.001) - f(1)}{0.001} \approx \frac{1.002001\cdot \sin 1.001 - \sin 1}{0.001} \approx 2.224$ ✓ (sai số do bước hữu hạn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tích KHÔNG phải $f'\cdot g'$?"* Vì khi $f\cdot g$ thay đổi, đóng góp đến từ **hai nguồn**: $f$ đổi (giữ $g$) cho $f'\cdot g$, và $g$ đổi (giữ $f$) cho $f\cdot g'$. Cộng lại: $f'g + fg'$. Phản ví dụ số: $(x\cdot x)' = (x^2)' = 2x$, nhưng $f'\cdot g' = 1\cdot 1 = 1 \neq 2x$.
- *"Khi nào dùng chain rule?"* Bất cứ khi nào có "hàm trong hàm" — $\sin(2x)$, $e^{x^2}$, $(3x+1)^5$. Hỏi "có lớp ngoài và lớp trong không?". Nếu có → chain rule, nhân thêm đạo hàm lớp trong.
- *"Thứ tự áp dụng nhiều quy tắc?"* Từ ngoài vào: nhận diện cấu trúc ngoài cùng (tích? thương? hợp?) rồi áp quy tắc tương ứng, các phần con xử lý đệ quy.

⚠ **Lỗi thường gặp — quên đạo hàm lớp trong của chain rule**. Viết $(\sin(2x))' = \cos(2x)$ là **thiếu** — đúng phải $\cos(2x)\cdot 2 = 2\cos(2x)$. Verify: tại $x=0$, định nghĩa cho slope $\approx \frac{\sin(0.002)-0}{0.001} = 2$, khớp $2\cos 0 = 2$, không phải $\cos 0 = 1$.

🔁 **Dừng lại tự kiểm tra**

1. $(x^3\cdot e^x)' = ?$
2. $(e^{x^2})' = ?$ (đừng quên lớp trong)

<details><summary>Đáp án</summary>

1. Tích: $3x^2\cdot e^x + x^3\cdot e^x = x^2\cdot e^x\cdot(3 + x)$.
2. Chain: lớp ngoài $e^u \to e^u$, lớp trong $x^2 \to 2x$ → $e^{x^2}\cdot 2x = 2x\cdot e^{x^2}$.

</details>

### 📝 Tóm tắt mục 2

- Hằng nhân $(cf)' = cf'$; tổng $(f\pm g)' = f'\pm g'$.
- Tích $(fg)' = f'g + fg'$ (KHÔNG $f'g'$); thương $(f/g)' = \frac{f'g - fg'}{g^2}$.
- Chain $(f(g(x)))' = f'(g(x))\cdot g'(x)$ — quan trọng nhất, **đừng quên đạo hàm lớp trong**.

---

## 3. Đạo hàm hàm ngược

Nếu $y = f(x)$ và $x = f^{-1}(y)$, thì:

$$(f^{-1})'(y) = \frac{1}{f'(x)}$$

💡 **Hệ quả**: Đồ thị $y = f(x)$ và $y = f^{-1}(x)$ đối xứng qua $y = x$ → slope nghịch đảo nhau.

**Ví dụ**: Chứng minh $(\arcsin x)' = \dfrac{1}{\sqrt{1-x^2}}$.
- $y = \arcsin x \iff x = \sin y$.
- $(\sin y)'$ theo $y = \cos y$.
- → $(\arcsin)' = \dfrac{1}{\cos y} = \dfrac{1}{\sqrt{1-\sin^2 y}} = \mathbf{\dfrac{1}{\sqrt{1-x^2}}}$ ✓.

💡 **Trực giác**: đồ thị $f$ và $f^{-1}$ đối xứng qua đường $y = x$ (lật chéo). Khi lật, đường dốc thoải ($f'$ nhỏ) thành dốc đứng ($(f^{-1})'$ lớn) và ngược lại → slope **nghịch đảo** nhau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$(f^{-1})'(y) = \dfrac{1}{f'(x)}$ — $x$ ở đây là gì?"* Là điểm sao cho $f(x) = y$ (tức $x = f^{-1}(y)$). Phải tính đạo hàm $f'$ **tại điểm $x$ tương ứng**, không phải tại $y$. Vd $f(x)=x^2$ ($x>0$), $f^{-1}(y)=\sqrt{y}$: tại $y=4$ thì $x=2$, $(f^{-1})'(4) = \dfrac{1}{f'(2)} = \dfrac{1}{2\cdot 2} = \dfrac{1}{4}$, khớp $(\sqrt{y})'|_{y=4} = \dfrac{1}{2\sqrt{4}} = \dfrac{1}{4}$ ✓.
- *"Cần điều kiện gì để công thức đúng?"* Cần $f'(x) \neq 0$ (nếu $f'(x) = 0$, tiếp tuyến của $f$ nằm ngang → tiếp tuyến của $f^{-1}$ đứng → đạo hàm không tồn tại).

⚠ **Lỗi thường gặp — quên $f'$ phải tính tại $x$ chứ không tại $y$**. Viết $(f^{-1})'(y) = \dfrac{1}{f'(y)}$ là sai. Phải tìm $x = f^{-1}(y)$ trước rồi mới thay vào $f'$.

🔁 **Dừng lại tự kiểm tra**

1. $(\arctan x)'$ — dùng $y = \arctan x \iff x = \tan y$ và $(\tan y)' = \dfrac{1}{\cos^2 y}$.
2. $f(x) = x^3$, $f^{-1}(y) = \sqrt[3]{y}$. Tính $(f^{-1})'(8)$ qua công thức hàm ngược.

<details><summary>Đáp án</summary>

1. $(\arctan)' = \dfrac{1}{(\tan y)'} = \cos^2 y = \dfrac{1}{1+\tan^2 y} = \dfrac{1}{1+x^2}$ ✓.
2. $y=8 \to x=2$. $f'(x)=3x^2$, $f'(2)=12$ → $(f^{-1})'(8) = \dfrac{1}{12}$. Khớp $(\sqrt[3]{y})'|_8 = \dfrac{1}{3}\cdot 8^{-2/3} = \dfrac{1}{12}$ ✓.

</details>

### 📝 Tóm tắt mục 3

- $(f^{-1})'(y) = \dfrac{1}{f'(x)}$ với $x = f^{-1}(y)$ (tính $f'$ tại $x$, KHÔNG tại $y$).
- Trực giác: đồ thị đối xứng qua $y = x$ → slope nghịch đảo.
- Điều kiện $f'(x) \neq 0$; dùng để suy $(\arcsin)', (\arctan)'$...

---

## 4. Đạo hàm bậc cao

$f''(x) = (f'(x))'$. Đạo hàm của đạo hàm.

**Ví dụ**: $f(x) = x^4$.
- $f'(x) = 4x^3$.
- $f''(x) = 12x^2$.
- $f'''(x) = 24x$.
- $f^{(4)}(x) = 24$.
- $f^{(5)}(x) = 0$.

**Ý nghĩa vật lý**:
- $s(t)$ = vị trí.
- $v(t) = s'(t)$ = vận tốc.
- $a(t) = v'(t) = s''(t)$ = **gia tốc**.

💡 **Trực giác**: $f'$ đo "tốc độ đổi của $f$", $f''$ đo "tốc độ đổi của $f'$" — tức độ cong/gia tốc. Nếu $f$ là vị trí, $f'$ là vận tốc (nhanh chậm), $f''$ là gia tốc (đang tăng tốc hay phanh).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đạo hàm của đa thức bậc $n$ đến lúc nào thì bằng 0?"* Sau $n+1$ lần. Vd $x^4$: $4x^3 \to 12x^2 \to 24x \to 24 \to 0$. Mỗi lần đạo hàm hạ bậc đi 1; bậc 0 (hằng) thì đạo hàm tiếp ra 0.
- *"$f''$ dùng để làm gì?"* Xác định lồi/lõm và phân loại cực trị (L05): $f'' > 0$ → lõm lên (cực tiểu), $f'' < 0$ → lõm xuống (cực đại). Trong vật lý là gia tốc.

⚠ **Lỗi thường gặp — tính $f''$ mà bỏ quy tắc tích/chuỗi ở bước hai**. $f'$ thường vẫn là tích/hợp, nên đạo hàm tiếp phải áp lại đầy đủ quy tắc. Vd $f = x\cdot e^x$ → $f' = e^x(x+1)$ (tích) → $f'' = e^x(x+1) + e^x = e^x(x+2)$ — bước hai vẫn cần product rule, không "đạo hàm thẳng".

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^5$. Tính $f'''(x)$.
2. $f(x) = \sin x$. $f''(x) = ?$ và $f^{(4)}(x) = ?$

<details><summary>Đáp án</summary>

1. $f' = 5x^4$, $f'' = 20x^3$, $f''' = 60x^2$.
2. $f' = \cos x$, $f'' = -\sin x$, $f''' = -\cos x$, $f^{(4)} = \sin x$ (chu kỳ 4).

</details>

### 📝 Tóm tắt mục 4

- $f''(x) = (f'(x))'$ — đạo hàm của đạo hàm; tiếp tục cho $f''', f^{(n)}$.
- Đa thức bậc $n$ → đạo hàm thứ $n+1$ bằng 0.
- Ý nghĩa: vị trí → vận tốc ($f'$) → gia tốc ($f''$); $\sin x$ lặp chu kỳ 4.

---

## 5. Bài tập đa quy tắc

### Bài tập

**Bài 1**: Tính đạo hàm của $f(x) = (x^2 + 1)\cdot \cos x$.

**Bài 2**: Tính $(e^{2x}\cdot \sin x)'$.

**Bài 3**: Tính đạo hàm của $f(x) = \dfrac{x^2 + 1}{x - 3}$.

**Bài 4**: Tính $(\sin(\cos(x^2)))'$.

**Bài 5**: Tính $f''(x)$ khi $f(x) = e^{2x}\cdot x$.

### Lời giải

**Bài 1**: Tích: $(2x)\cdot \cos x + (x^2+1)\cdot (-\sin x) = \mathbf{2x\cdot \cos x - (x^2+1)\cdot \sin x}$.

**Bài 2**: Tích + chuỗi: $(e^{2x})' = 2e^{2x}$. $f' = 2e^{2x}\cdot \sin x + e^{2x}\cdot \cos x = \mathbf{e^{2x}\cdot (2\sin x + \cos x)}$.

**Bài 3**: Thương: $f' = \dfrac{(2x)\cdot (x-3) - (x^2+1)\cdot 1}{(x-3)^2} = \dfrac{2x^2 - 6x - x^2 - 1}{(x-3)^2} = \mathbf{\dfrac{x^2 - 6x - 1}{(x-3)^2}}$.

**Bài 4**: 3 lớp:  
- Lớp ngoài: $\sin(u) \to \cos(u)$.  
- Lớp giữa: $\cos(v) \to -\sin(v)$.  
- Lớp trong: $x^2 \to 2x$.  
- Kết quả: $\mathbf{\cos(\cos(x^2)) \cdot (-\sin(x^2)) \cdot 2x = -2x\cdot \sin(x^2)\cdot \cos(\cos(x^2))}$.

**Bài 5**: $f' = 2e^{2x}\cdot x + e^{2x}\cdot 1 = e^{2x}\cdot (2x+1)$.  
- $f'' = (e^{2x}\cdot (2x+1))' = 2e^{2x}\cdot (2x+1) + e^{2x}\cdot 2 = \mathbf{e^{2x}\cdot (4x + 4) = 4e^{2x}\cdot (x+1)}$.

---

## 6. Bài tiếp theo

[Lesson 05 — Ứng dụng đạo hàm](../lesson-05-derivative-applications/).

## 📝 Tổng kết

1. **Bảng đạo hàm**: thuộc $x^n$, $e^x$, $\ln$, $\sin/\cos/\tan$, $\arcsin/\arctan$.
2. **5 quy tắc**: hằng nhân, tổng, **tích $f'g+fg'$**, **thương $(f'g-fg')/g^2$**, **chuỗi $f'(g)\cdot g'$**.
3. **Chain rule** quan trọng nhất — từ ngoài vào trong, mỗi lớp nhân đạo hàm.
4. **Hàm ngược**: $(f^{-1})' = 1/f'$.
5. **Đạo hàm bậc cao**: $f'' = $ vận tốc đổi (= gia tốc).
