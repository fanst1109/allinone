# Lesson 03 — Quy tắc đạo hàm (Derivative Rules)

> **Tầng 3 — Calculus** · Bài 03/08
> Prerequisite: [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/)
> Tiếp theo: [Lesson 04 — Chain rule](../lesson-04-chain-rule/)

## Mục tiêu học tập

Sau bài này bạn có thể:

1. **Tính đạo hàm "bằng quy tắc"** mà không cần quay lại định nghĩa giới hạn — nhanh hơn 10-100 lần.
2. **Áp dụng 4 quy tắc tổ hợp**: tổng, hằng nhân, tích, thương — biết khi nào dùng cái nào.
3. **Power rule mở rộng** cho mọi số mũ thực (kể cả $\sqrt{x}$, $1/x$, $x^\pi$).
4. **Đạo hàm hàm sơ cấp**: $a^x$, $\log_b x$, đầy đủ 6 hàm lượng giác (sin, cos, tan, cot, sec, csc).
5. **Đạo hàm hàm ngược**: arcsin, arccos, arctan.
6. **Verify "trick đẹp" của sigmoid**: $\sigma'(x) = \sigma(x)(1 - \sigma(x))$ — công thức gặp hàng ngày trong backprop.

## Kiến thức tiền đề

- [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/): định nghĩa qua giới hạn, slope tiếp tuyến, đạo hàm $(x^2)' = 2x$, $(\sin x)' = \cos x$.
- [Lesson 01 — Giới hạn](../lesson-01-limits/): các giới hạn đặc biệt $\lim_{h \to 0} \frac{\sin h}{h} = 1$, $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$.
- [Algebra Lesson 07 — Lũy thừa và log](../../01-Algebra/lesson-07-exponentials-logs/): tính chất $a^x = e^{x \cdot \ln a}$.
- [Trigonometry Lesson 04 — Trig graphs](../../02-Trigonometry/lesson-04-trig-graphs/): hình dạng sin, cos, tan.

## Bối cảnh — vì sao cần "quy tắc"?

Trong Lesson 02 ta đã tính $f'(x)$ cho vài hàm bằng định nghĩa:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

Cách này **đúng nhưng chậm và mỏi**. Thử tính đạo hàm của $f(x) = x^2 \cdot \sin x + \frac{x+1}{x^2+1}$ bằng định nghĩa giới hạn — bạn sẽ phải khai triển một biểu thức hàng chục dòng.

**Giải pháp**: nếu ta đã chứng minh sẵn $(x^2)' = 2x$, $(\sin x)' = \cos x$ cho **từng khối nhỏ**, rồi có **quy tắc** ghép chúng lại theo các phép tổ hợp (tổng, tích, thương, composition), thì:

- Tính đạo hàm của hàm phức tạp = tra bảng + áp quy tắc, mỗi bước cơ học.
- Không bao giờ cần quay lại định nghĩa giới hạn nữa (trừ khi muốn chứng minh quy tắc mới).

Bài này dạy đúng 4 quy tắc tổ hợp + đạo hàm chuẩn của các hàm sơ cấp. Bài sau (Lesson 04) dạy quy tắc thứ 5 và quan trọng nhất — **chain rule** cho composition.

> 💡 **Trực giác**: hãy nghĩ đạo hàm như **một phép biến đổi** trên hàm số. Ta có vài "công thức nguyên tử" (đạo hàm của $x^n$, $\sin x$, $e^x$, ...) và vài "quy tắc lắp ráp" (cộng, nhân, chia, ghép). Mọi hàm sơ cấp đều ráp được từ các viên gạch đó → mọi đạo hàm cũng tính được cơ học.

---

## 1. Quy tắc tuyến tính (Sum rule + Constant multiple)

### 1.1 Phát biểu

Nếu $f(x)$ và $g(x)$ đều khả vi tại $x$, và $c$ là hằng số, thì:

$$\begin{aligned}
(f + g)'(x) &= f'(x) + g'(x) &&\text{(Sum rule)} \\[4pt]
(c \cdot f)'(x) &= c \cdot f'(x) &&\text{(Constant multiple)}
\end{aligned}$$

Gộp hai cái lại được **quy tắc tuyến tính**:

$$(c_1 \cdot f + c_2 \cdot g)' = c_1 \cdot f' + c_2 \cdot g'$$

> 💡 **Trực giác**: nếu $f$ đang tăng tốc $f'$ và $g$ đang tăng tốc $g'$, thì tổng $f+g$ tăng tốc đúng bằng $f' + g'$ — không có "tương tác chéo". Đây chính là tính chất **tuyến tính** mà Tầng 4 (Linear Algebra) sẽ định nghĩa chính thức: đạo hàm là một **toán tử tuyến tính**.

### 1.2 Chứng minh (sum rule)

Từ định nghĩa:

$$\begin{aligned}
(f+g)'(x) &= \lim_{h \to 0} \frac{(f+g)(x+h) - (f+g)(x)}{h} \\[4pt]
          &= \lim_{h \to 0} \frac{\big(f(x+h) - f(x)\big) + \big(g(x+h) - g(x)\big)}{h} \\[4pt]
          &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} + \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} \\[4pt]
          &= f'(x) + g'(x)
\end{aligned}$$

Bước tách giới hạn dùng tính chất "giới hạn của tổng bằng tổng giới hạn" (Lesson 01, mục 4). Constant multiple chứng minh tương tự.

### 1.3 Walk-through 4 ví dụ

**Ví dụ 1**: $f(x) = 3x^2 + 5x$.

$$f'(x) = (3x^2)' + (5x)' = 3 \cdot (x^2)' + 5 \cdot (x)' = 3 \cdot 2x + 5 \cdot 1 = 6x + 5$$

**Ví dụ 2**: $f(x) = 4 \sin x - 2 \cos x + 7$.

$$\begin{aligned}
f'(x) &= 4 \cdot (\sin x)' - 2 \cdot (\cos x)' + (7)' \\[4pt]
      &= 4 \cdot \cos x - 2 \cdot (-\sin x) + 0 \\[4pt]
      &= 4 \cos x + 2 \sin x
\end{aligned}$$

**Ví dụ 3**: $f(x) = x^3 - 6x^2 + 11x - 6$.

$$f'(x) = 3x^2 - 12x + 11$$

**Ví dụ 4**: $f(x) = \frac{1}{2}x^4 + 7e^x$.

$$f'(x) = \frac{1}{2} \cdot 4x^3 + 7 \cdot e^x = 2x^3 + 7e^x$$

> ⚠ **Lỗi thường gặp**:
> - $(c)' = 0$ (hằng số có đạo hàm bằng 0) chứ KHÔNG phải $c$. Vd $(7)' = 0$, không phải $7$.
> - Đừng quên dấu trừ trước $\cos x$ khi viết $(\cos x)' = -\sin x$.

> 🔁 **Tự kiểm tra**: Tính $f'(x)$ cho $f(x) = 5x^3 - 4 \sin x$.
> <details><summary>Đáp án</summary>
> $15x^2 - 4 \cos x$.
> </details>

---

## 2. Power rule cho số mũ nguyên dương

Đã chứng minh trong Lesson 02 cho $n = 2$. Tổng quát:

$$(x^n)' = n \cdot x^{n-1} \qquad \text{với } n \in \mathbb{N}$$

Chứng minh bằng nhị thức Newton (Lesson 02 đã làm cho $n=2$ và sketch cho $n$ tổng quát). Kết quả áp dụng cho mọi số tự nhiên $n \geq 1$:

| n | $x^n$ | $(x^n)'$ |
|---|-------|----------|
| 1 | $x$     | $1$        |
| 2 | $x^2$    | $2x$       |
| 3 | $x^3$    | $3x^2$      |
| 4 | $x^4$    | $4x^3$      |
| 5 | $x^5$    | $5x^4$      |
| 10 | $x^{10}$  | $10x^9$    |

Mục 6 sẽ mở rộng cho mọi $n \in \mathbb{R}$ (kể cả $-2$, $1/2$, $\pi$).

---

## 3. Product rule (Quy tắc tích)

### 3.1 Phát biểu

$$(f \cdot g)'(x) = f'(x) \cdot g(x) + f(x) \cdot g'(x)$$

Hoặc viết tắt: $(fg)' = f'g + fg'$.

> 💡 **Trực giác**: tưởng tượng $f$ là chiều dài, $g$ là chiều rộng của hình chữ nhật — diện tích $S = f \cdot g$. Khi $x$ tăng một chút, chiều dài tăng $f' \cdot \Delta x$, chiều rộng tăng $g' \cdot \Delta x$. Diện tích thêm vào $\approx$ "một lớp dài viền dưới" ($f' \cdot \Delta x \cdot g$) + "một lớp viền cạnh" ($f \cdot g' \cdot \Delta x$) + một góc nhỏ vô cùng bé ($f' \cdot g' \cdot (\Delta x)^2$). Khi $\Delta x \to 0$, góc nhỏ biến mất, để lại đúng $f'g + fg'$.

### 3.2 Chứng minh từ định nghĩa

$$(fg)'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}$$

**Mẹo**: cộng và trừ $f(x+h) \cdot g(x)$ để tách tử số.

$$\begin{aligned}
&f(x+h)g(x+h) - f(x)g(x) \\[4pt]
&\quad = f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x) \\[4pt]
&\quad = f(x+h) \cdot [g(x+h) - g(x)] + g(x) \cdot [f(x+h) - f(x)]
\end{aligned}$$

Chia cho $h$:

$$= f(x+h) \cdot \frac{g(x+h) - g(x)}{h} + g(x) \cdot \frac{f(x+h) - f(x)}{h}$$

Cho $h \to 0$:
- $f(x+h) \to f(x)$ (vì $f$ liên tục — khả vi suy ra liên tục).
- $\frac{g(x+h) - g(x)}{h} \to g'(x)$.
- $\frac{f(x+h) - f(x)}{h} \to f'(x)$.

Vậy: $(fg)'(x) = f(x) \cdot g'(x) + g(x) \cdot f'(x) = f'g + fg'$. ✓

### 3.3 Walk-through 4 ví dụ

**Ví dụ 1**: $f(x) = x^2 \cdot \sin x$.

Đặt $u = x^2$ ($\to u' = 2x$) và $v = \sin x$ ($\to v' = \cos x$).

$$(u \cdot v)' = u' \cdot v + u \cdot v' = 2x \cdot \sin x + x^2 \cdot \cos x$$

**Ví dụ 2**: $f(x) = e^x \cdot x^3$.

$u = e^x$ ($u' = e^x$), $v = x^3$ ($v' = 3x^2$).

$$f'(x) = e^x \cdot x^3 + e^x \cdot 3x^2 = e^x \cdot (x^3 + 3x^2) = x^2 \cdot e^x \cdot (x + 3)$$

**Ví dụ 3**: $f(x) = x \cdot \ln x$.

$u = x$ ($u' = 1$), $v = \ln x$ ($v' = 1/x$).

$$f'(x) = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$$

**Ví dụ 4**: $f(x) = (2x+1)(3x-2)$.

Hai cách:

**Cách A — product rule**: $u = 2x+1$ ($u' = 2$), $v = 3x-2$ ($v' = 3$).

$$f'(x) = 2 \cdot (3x-2) + (2x+1) \cdot 3 = 6x - 4 + 6x + 3 = 12x - 1$$

**Cách B — khai triển trước**: $f(x) = 6x^2 - 4x + 3x - 2 = 6x^2 - x - 2$.

$$f'(x) = 12x - 1 \quad \checkmark$$

Hai cách cho cùng kết quả → product rule đúng.

### 3.4 Lỗi thường gặp: `(fg)' ≠ f'·g'`

Đây là **lỗi #1** của người mới. Verify bằng phản chứng:

Lấy $f = x^2$, $g = x^3$, vậy $f \cdot g = x^5$.

- **Đáp án đúng** (power rule): $(x^5)' = 5x^4$.
- **Đáp án sai** ($f' \cdot g'$): $(x^2)' \cdot (x^3)' = 2x \cdot 3x^2 = 6x^3 \neq 5x^4$.
- **Đáp án đúng** (product rule): $2x \cdot x^3 + x^2 \cdot 3x^2 = 2x^4 + 3x^4 = 5x^4$ ✓.

> ⚠ **Quy tắc**: đạo hàm KHÔNG "phân phối qua phép nhân" như cách phép cộng phân phối. Phải luôn dùng product rule.

> ❓ **Câu hỏi tự nhiên**:
> - *"Có thể tổng quát product rule cho 3 hàm không?"* Có: $(fgh)' = f'gh + fg'h + fgh'$. Chứng minh: nhóm $(fg) \cdot h$ rồi áp product rule hai lần.
> - *"Sao công thức đối xứng giữa f và g mà không thay đổi gì?"* Vì phép nhân giao hoán: $f \cdot g = g \cdot f$, nên đạo hàm cũng phải đối xứng. Đó là cách kiểm tra nhanh khi quên dấu.

> 🔁 **Tự kiểm tra**: Tính $(x \cdot \cos x)'$.
> <details><summary>Đáp án</summary>
> $u = x$, $v = \cos x$. $f'(x) = 1 \cdot \cos x + x \cdot (-\sin x) = \cos x - x \sin x$.
> </details>

---

## 4. Quotient rule (Quy tắc thương)

### 4.1 Phát biểu

$$(f/g)'(x) = \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}$$

Tử số là $f'g - fg'$ (chú ý dấu trừ + thứ tự). Mẫu số là $g^2$.

> 💡 **Trực giác (mnemonic)**: "low D-high minus high D-low, over the square of what's below" — tử số: thấp (mẫu) nhân đạo hàm cao (tử) trừ cao nhân đạo hàm thấp, mẫu số là bình phương "ở dưới". (Một số sách viết ngược thứ tự $fg' - f'g$ rồi đổi dấu — kết quả như nhau, miễn nhớ chính xác một dạng.)

### 4.2 Chứng minh ngắn (từ product rule)

Đặt $q(x) = f(x)/g(x) \Rightarrow f(x) = q(x) \cdot g(x)$. Áp product rule cho vế phải:

$$\begin{aligned}
f'(x) &= q'(x) \cdot g(x) + q(x) \cdot g'(x) \\[4pt]
      &= q'(x) \cdot g(x) + \frac{f(x)}{g(x)} \cdot g'(x)
\end{aligned}$$

Giải $q'(x)$:

$$\begin{aligned}
q'(x) \cdot g(x) &= f'(x) - \frac{f(x) \cdot g'(x)}{g(x)} \\[4pt]
q'(x) &= \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}
\end{aligned}$$

### 4.3 Walk-through 4 ví dụ

**Ví dụ 1**: $f(x) = \frac{x}{x+1}$.

$u = x$ ($u' = 1$), $v = x+1$ ($v' = 1$).

$$f'(x) = \frac{1 \cdot (x+1) - x \cdot 1}{(x+1)^2} = \frac{x + 1 - x}{(x+1)^2} = \frac{1}{(x+1)^2}$$

**Ví dụ 2**: $f(x) = \frac{x^2 + 1}{x}$. (Có thể chia trước, nhưng làm bằng quotient rule để luyện.)

$u = x^2+1$ ($u' = 2x$), $v = x$ ($v' = 1$).

$$f'(x) = \frac{2x \cdot x - (x^2+1) \cdot 1}{x^2} = \frac{2x^2 - x^2 - 1}{x^2} = \frac{x^2 - 1}{x^2}$$

Verify: $\frac{x^2 + 1}{x} = x + \frac{1}{x}$. Đạo hàm: $1 - \frac{1}{x^2} = \frac{x^2 - 1}{x^2}$ ✓.

**Ví dụ 3**: $\tan x = \frac{\sin x}{\cos x}$.

$u = \sin x$ ($u' = \cos x$), $v = \cos x$ ($v' = -\sin x$).

$$\begin{aligned}
(\tan x)' &= \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^2 x} \\[4pt]
          &= \frac{\cos^2 x + \sin^2 x}{\cos^2 x} \\[4pt]
          &= \frac{1}{\cos^2 x} \\[4pt]
          &= \sec^2 x
\end{aligned}$$

(Dùng identity $\sin^2 + \cos^2 = 1$.) Đây là cách chứng minh kinh điển $(\tan x)' = \sec^2 x$.

**Ví dụ 4**: $f(x) = \frac{e^x}{x^2 + 1}$.

$u = e^x$ ($u' = e^x$), $v = x^2+1$ ($v' = 2x$).

$$\begin{aligned}
f'(x) &= \frac{e^x \cdot (x^2+1) - e^x \cdot 2x}{(x^2+1)^2} \\[4pt]
      &= \frac{e^x \cdot (x^2 - 2x + 1)}{(x^2+1)^2} \\[4pt]
      &= \frac{e^x \cdot (x - 1)^2}{(x^2+1)^2}
\end{aligned}$$

> ⚠ **Lỗi thường gặp**:
> - Quên bình phương mẫu số (viết $g$ thay vì $g^2$).
> - Đảo dấu trong tử số (viết $f \cdot g' - f' \cdot g$).
> - Mẹo nhớ: tử số $f/g$ mở rộng đẹp nhất là **đạo hàm tử nhân mẫu trước**, rồi mới trừ.

> 🔁 **Tự kiểm tra**: Tính $(1/x)'$ bằng quotient rule.
> <details><summary>Đáp án</summary>
> $u = 1$, $u' = 0$, $v = x$, $v' = 1$. $(1/x)' = \frac{0 \cdot x - 1 \cdot 1}{x^2} = -\frac{1}{x^2}$. Khớp với power rule mở rộng (mục 6): $(x^{-1})' = -1 \cdot x^{-2} = -\frac{1}{x^2}$. ✓
> </details>

---

## 5. Đạo hàm của nghịch đảo `1/g(x)`

Trường hợp đặc biệt của quotient rule với $f = 1$:

$$(1/g)' = \frac{0 \cdot g - 1 \cdot g'}{g^2} = -\frac{g'}{g^2}$$

Vd: $(1/\cos x)' = \frac{\sin x}{\cos^2 x} = \sec x \cdot \tan x$ (= $(\sec x)'$, sẽ thấy ở mục 8).

---

## 6. Power rule mở rộng cho mũ thực

### 6.1 Phát biểu tổng quát

$$(x^n)' = n \cdot x^{n-1} \qquad \text{với } n \in \mathbb{R},\ x > 0$$

(Khi $x \leq 0$ cần chú ý miền xác định: $\sqrt{x}$ chỉ định nghĩa với $x \geq 0$, $x^{1/3}$ định nghĩa cả với $x < 0$, ...)

Chứng minh trường hợp tổng quát dùng identity $x^n = e^{n \cdot \ln x}$ rồi áp chain rule (xem Lesson 04).

### 6.2 Walk-through 4 ví dụ với mũ "không nguyên dương"

**Ví dụ 1**: $f(x) = \sqrt{x} = x^{1/2}$.

$$f'(x) = \frac{1}{2} \cdot x^{1/2 - 1} = \frac{1}{2} \cdot x^{-1/2} = \frac{1}{2\sqrt{x}}$$

Verify bằng định nghĩa (Lesson 02 mục 7) — kết quả giống nhau.

**Ví dụ 2**: $f(x) = \frac{1}{x^2} = x^{-2}$.

$$f'(x) = -2 \cdot x^{-3} = -\frac{2}{x^3}$$

**Ví dụ 3**: $f(x) = x^{2/3}$ (căn bậc 3 của bình phương).

$$f'(x) = \frac{2}{3} \cdot x^{-1/3} = \frac{2}{3 \sqrt[3]{x}}$$

**Ví dụ 4**: $f(x) = x^\pi$ (mũ là số vô tỉ).

$$f'(x) = \pi \cdot x^{\pi - 1}$$

Số mũ không cần là số nguyên hay phân số — công thức vẫn đúng.

> ❓ **Câu hỏi tự nhiên**: *"Tại sao công thức cho $n$ nguyên dương lại đúng cả khi $n$ âm hoặc thực?"*
>
> **Trả lời**: Vì cách định nghĩa lũy thừa với số mũ thực: $x^n = e^{n \cdot \ln x}$. Đạo hàm theo chain rule (Lesson 04): $(e^{n \ln x})' = e^{n \ln x} \cdot (n \ln x)' = x^n \cdot \frac{n}{x} = n \cdot x^{n-1}$. Cùng một công thức cho mọi $n$.

### 6.3 Bảng đối chiếu

| Hàm                 | Viết dạng $x^n$ | Đạo hàm                  |
|---------------------|-----------------|--------------------------|
| $\sqrt{x}$                | $x^{1/2}$       | $\frac{1}{2\sqrt{x}}$                |
| $\sqrt[3]{x}$                | $x^{1/3}$       | $\frac{1}{3 \cdot x^{2/3}}$          |
| $1/x$               | $x^{-1}$        | $-\frac{1}{x^2}$                  |
| $1/x^2$              | $x^{-2}$        | $-\frac{2}{x^3}$                  |
| $1/\sqrt{x}$              | $x^{-1/2}$      | $-\frac{1}{2 \cdot x^{3/2}}$         |
| $x \cdot \sqrt{x} = x^{3/2}$  | $x^{3/2}$       | $\frac{3}{2}\sqrt{x}$               |

> 🔁 **Tự kiểm tra**: Tính $(1/\sqrt{x})'$.
> <details><summary>Đáp án</summary>
> $(x^{-1/2})' = -\frac{1}{2} \cdot x^{-3/2} = -\frac{1}{2 \cdot x^{3/2}} = -\frac{1}{2x\sqrt{x}}$.
> </details>

---

## 7. Đạo hàm của `a^x` và `log_b x`

### 7.1 Đạo hàm của `e^x`

Lesson 02 đã thừa nhận / chứng minh sơ lược: $(e^x)' = e^x$. Đây là **đặc trưng duy nhất** của hàm $e^x$ — không hàm sơ cấp nào khác bằng đúng đạo hàm của chính nó (sai khác hằng số).

### 7.2 Đạo hàm của `aˣ` (a > 0)

> 💡 **Trực giác**: $a^x$ là hàm mũ tổng quát. Viết qua $e$: $a = e^{\ln a}$, suy ra $a^x = (e^{\ln a})^x = e^{x \cdot \ln a}$. Đặt $u = x \cdot \ln a$ ($u' = \ln a$), áp chain rule (Lesson 04):
>
> $$(a^x)' = e^u \cdot u' = a^x \cdot \ln a$$

**Công thức**:

$$(a^x)' = a^x \cdot \ln a$$

Kiểm tra với $a = e$: $(e^x)' = e^x \cdot \ln e = e^x \cdot 1 = e^x$ ✓.

**Walk-through ví dụ**:

- $(2^x)' = 2^x \cdot \ln 2 \approx 0.693 \cdot 2^x$.
- $(10^x)' = 10^x \cdot \ln 10 \approx 2.303 \cdot 10^x$.
- $\left(\left(\tfrac{1}{2}\right)^x\right)' = \left(\tfrac{1}{2}\right)^x \cdot \ln\tfrac{1}{2} = -\left(\tfrac{1}{2}\right)^x \cdot \ln 2$ (đạo hàm âm — hàm giảm).

### 7.3 Đạo hàm của `ln x`

Đã thừa nhận (Lesson 02 mục 9): $(\ln x)' = \frac{1}{x}$ với $x > 0$.

Chứng minh phác: $y = \ln x \iff x = e^y$. Đạo hàm 2 vế theo $x$: $1 = e^y \cdot y' = x \cdot y'$. Suy ra $y' = \frac{1}{x}$. (Phép "đạo hàm 2 vế" là **implicit differentiation** — sẽ gặp lại ở Lesson 06.)

### 7.4 Đạo hàm của `log_b x`

Đổi cơ số sang $\ln$: $\log_b x = \frac{\ln x}{\ln b}$. $\ln b$ là **hằng số**.

$$(\log_b x)' = \frac{1}{\ln b} \cdot (\ln x)' = \frac{1}{x \cdot \ln b}$$

**Walk-through**:

- $(\log_{10} x)' = \frac{1}{x \cdot \ln 10} \approx \frac{0.4343}{x}$.
- $(\log_2 x)' = \frac{1}{x \cdot \ln 2} \approx \frac{1.4427}{x}$.

> ⚠ **Lỗi thường gặp**: nhầm $(\ln x)' = \frac{1}{x}$ (đúng) với $(\log_{10} x)' = \frac{1}{x}$ (SAI — phải có $\ln 10$ ở mẫu). Trong toán cao cấp và machine learning, **log mặc định = ln** (logarit tự nhiên), nên thường không thấy $\ln b$ xuất hiện. Nhưng nếu là $\log_{10}$ cụ thể thì không bỏ được hằng số.

> 🔁 **Tự kiểm tra**: Đạo hàm của $3^x$ tại $x = 0$ là bao nhiêu?
> <details><summary>Đáp án</summary>
> $(3^x)' = 3^x \cdot \ln 3$. Tại $x=0$: $3^0 \cdot \ln 3 = \ln 3 \approx 1.0986$.
> </details>

---

## 8. Đạo hàm đầy đủ của 6 hàm lượng giác

Đã biết $(\sin x)' = \cos x$ và $(\cos x)' = -\sin x$ (Lesson 02). Bốn hàm còn lại — $\tan, \cot, \sec, \csc$ — đều suy ra qua quotient rule.

### 8.1 `(tan x)' = sec² x`

Đã chứng minh ở Ví dụ 3, mục 4.3. Tóm lại:

$$\begin{aligned}
\tan x &= \frac{\sin x}{\cos x} \\[4pt]
(\tan x)' &= \frac{\cos^2 x + \sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x} = \sec^2 x
\end{aligned}$$

### 8.2 `(cot x)' = −csc² x`

$$\begin{aligned}
\cot x &= \frac{\cos x}{\sin x} \\[4pt]
(\cot x)' &= \frac{(-\sin x) \cdot \sin x - \cos x \cdot \cos x}{\sin^2 x} \\[4pt]
          &= -\frac{\sin^2 x + \cos^2 x}{\sin^2 x} \\[4pt]
          &= -\frac{1}{\sin^2 x} = -\csc^2 x
\end{aligned}$$

### 8.3 `(sec x)' = sec x · tan x`

$$\begin{aligned}
\sec x &= \frac{1}{\cos x} \\[4pt]
(\sec x)' &= -\frac{(\cos x)'}{\cos^2 x} = -\frac{-\sin x}{\cos^2 x} = \frac{\sin x}{\cos^2 x} \\[4pt]
          &= \frac{1}{\cos x} \cdot \frac{\sin x}{\cos x} = \sec x \cdot \tan x
\end{aligned}$$

### 8.4 `(csc x)' = −csc x · cot x`

Tương tự:

$$\begin{aligned}
\csc x &= \frac{1}{\sin x} \\[4pt]
(\csc x)' &= -\frac{\cos x}{\sin^2 x} = -\frac{1}{\sin x} \cdot \frac{\cos x}{\sin x} = -\csc x \cdot \cot x
\end{aligned}$$

### 8.5 Bảng tổng kết 6 hàm trig

| Hàm        | Đạo hàm           |
|------------|-------------------|
| $\sin x$    | $\cos x$           |
| $\cos x$    | $-\sin x$          |
| $\tan x$    | $\sec^2 x$          |
| $\cot x$    | $-\csc^2 x$         |
| $\sec x$    | $\sec x \cdot \tan x$   |
| $\csc x$    | $-\csc x \cdot \cot x$  |

> 💡 **Mẹo nhớ**: 3 hàm bắt đầu bằng "co-" ($\cos$, $\cot$, $\csc$) đều có **dấu trừ** trong đạo hàm. 3 hàm còn lại dương. Cặp đối: $\sin \leftrightarrow \cos$, $\tan \leftrightarrow \cot$, $\sec \leftrightarrow \csc$ — đạo hàm của hàm "co-" là đạo hàm của hàm gốc đổi dấu và đổi tên cặp.

> ❓ **Câu hỏi tự nhiên**: *"Tại sao $(\tan x)' = \sec^2 x$ luôn dương?"*
>
> **Trả lời**: Vì $\sec^2 x = \frac{1}{\cos^2 x} \geq 1$ (bằng 1 khi $\cos x = \pm 1$). Vậy $\tan$ là hàm **luôn tăng** trên mỗi đoạn liên tục — khớp với hình dạng đồ thị tan trong Trigonometry Lesson 04 (luôn đi lên giữa hai tiệm cận).

---

## 9. Đạo hàm hàm ngược (Inverse function)

### 9.1 Công thức tổng quát

Nếu $f$ khả vi và đơn ánh, có hàm ngược $f^{-1}$, thì:

$$(f^{-1})'(y) = \frac{1}{f'(f^{-1}(y))}$$

> 💡 **Trực giác**: nếu $f$ "kéo dài" theo hệ số $f'(x)$ tại điểm $x$, thì hàm ngược phải "co lại" theo cùng hệ số — nên đạo hàm hàm ngược là **nghịch đảo** của đạo hàm hàm gốc, lấy ở **điểm tương ứng**.

Chứng minh ngắn: $f(f^{-1}(y)) = y$. Đạo hàm 2 vế theo $y$, áp chain rule:

$$\begin{aligned}
f'(f^{-1}(y)) \cdot (f^{-1})'(y) &= 1 \\[4pt]
\Rightarrow (f^{-1})'(y) &= \frac{1}{f'(f^{-1}(y))}
\end{aligned}$$

### 9.2 Ví dụ: `(arcsin)'(x)`

$f(x) = \sin x$ trên $[-\pi/2, \pi/2]$, hàm ngược $f^{-1}(y) = \arcsin y$. Ta có $f'(x) = \cos x$.

$$(\arcsin)'(y) = \frac{1}{\cos(\arcsin y)}$$

Tính $\cos(\arcsin y)$: đặt $\theta = \arcsin y \Rightarrow \sin\theta = y$. Vẽ tam giác vuông với cạnh đối $y$, huyền $1 \Rightarrow$ cạnh kề $\sqrt{1-y^2}$. Suy ra $\cos\theta = \sqrt{1-y^2}$.

$$(\arcsin)'(y) = \frac{1}{\sqrt{1 - y^2}} \qquad (|y| < 1)$$

Đổi biến $y \to x$: $(\arcsin x)' = \frac{1}{\sqrt{1 - x^2}}$.

### 9.3 Ví dụ: `(arctan)'(x)`

$f(x) = \tan x$, $f'(x) = \sec^2 x = 1 + \tan^2 x$. Đặt $\theta = \arctan y \Rightarrow \tan\theta = y \Rightarrow f'(\theta) = 1 + y^2$.

$$(\arctan)'(y) = \frac{1}{1 + y^2}$$

Hay: $(\arctan x)' = \frac{1}{1 + x^2}$.

### 9.4 Bảng đạo hàm hàm trig ngược

| Hàm                 | Đạo hàm               | Miền          |
|---------------------|-----------------------|---------------|
| $\arcsin x$          | $\frac{1}{\sqrt{1 - x^2}}$         | $\lvert x \rvert < 1$     |
| $\arccos x$          | $-\frac{1}{\sqrt{1 - x^2}}$        | $\lvert x \rvert < 1$     |
| $\arctan x$          | $\frac{1}{1 + x^2}$          | $\mathbb{R}$           |
| $\operatorname{arccot} x$          | $-\frac{1}{1 + x^2}$         | $\mathbb{R}$           |

> ⚠ **Lỗi thường gặp**: nhầm dấu giữa $\arcsin$ (dương) và $\arccos$ (âm). Lý do: $\arccos x = \frac{\pi}{2} - \arcsin x$, lấy đạo hàm sẽ ra $0 - \frac{1}{\sqrt{1-x^2}} = -\frac{1}{\sqrt{1-x^2}}$.

> 🔁 **Tự kiểm tra**: Tính $(\arctan x)'$ tại $x = 1$.
> <details><summary>Đáp án</summary>
> $\frac{1}{1 + 1^2} = \frac{1}{2}$.
> </details>

---

## 10. Ứng dụng ML/AI — Đạo hàm Sigmoid

### 10.1 Sigmoid là gì?

Trong machine learning, **hàm sigmoid** (logistic) định nghĩa:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

Tính chất:
- $\sigma(0) = \frac{1}{2}$.
- $\sigma(x) \to 1$ khi $x \to +\infty$, $\sigma(x) \to 0$ khi $x \to -\infty$.
- Đồ thị hình chữ "S" — chuyển đổi mượt từ 0 sang 1, dùng để biểu diễn **xác suất**.

Sigmoid xuất hiện ở:
- **Logistic regression** — phân loại nhị phân.
- **Activation function** của neural network (ngày xưa rất phổ biến, hiện nay ít dùng cho hidden layer nhưng vẫn dùng cho output layer khi cần xác suất).
- **Attention gating** trong các kiến trúc như LSTM, GRU.

### 10.2 Đạo hàm có "trick đẹp"

Áp công thức $(1/g)' = -\frac{g'}{g^2}$ với $g(x) = 1 + e^{-x}$:

- $g'(x) = (1)' + (e^{-x})' = 0 + e^{-x} \cdot (-1) = -e^{-x}$ (dùng chain rule sơ bộ với $-x$).
- $\sigma'(x) = -\frac{g'}{g^2} = \frac{-(-e^{-x})}{(1 + e^{-x})^2} = \frac{e^{-x}}{(1 + e^{-x})^2}$.

Đến đây mới là "công thức thô". Trick đẹp: viết lại theo $\sigma$.

$$\begin{aligned}
\sigma'(x) &= \frac{e^{-x}}{(1 + e^{-x})^2} \\[4pt]
           &= \frac{1}{1 + e^{-x}} \cdot \frac{e^{-x}}{1 + e^{-x}} \\[4pt]
           &= \sigma(x) \cdot \frac{e^{-x}}{1 + e^{-x}}
\end{aligned}$$

Phần thứ 2 = $1 - \sigma(x)$, vì:

$$\begin{aligned}
1 - \sigma(x) &= 1 - \frac{1}{1 + e^{-x}} \\[4pt]
              &= \frac{(1 + e^{-x}) - 1}{1 + e^{-x}} \\[4pt]
              &= \frac{e^{-x}}{1 + e^{-x}}
\end{aligned}$$

**Kết luận**:

$$\sigma'(x) = \sigma(x) \cdot (1 - \sigma(x))$$

### 10.3 Verify bằng số cụ thể

| x      | $\sigma(x)$      | $1 - \sigma(x)$  | $\sigma(x)(1-\sigma(x))$ | $\sigma'(x)$ "thô" $\frac{e^{-x}}{(1+e^{-x})^2}$ |
|--------|-------------|-------------|------------------|-----------------------------------|
| $-2$   | $0.1192$    | $0.8808$    | $0.1050$         | $\frac{e^2}{(1+e^2)^2} = \frac{7.389}{70.69} \approx 0.1050$ ✓ |
| $0$    | $0.5$       | $0.5$       | $0.25$           | $\frac{1}{2^2} = 0.25$ ✓                 |
| $1$    | $0.7311$    | $0.2689$    | $0.1966$         | $\frac{e^{-1}}{(1+e^{-1})^2} \approx \frac{0.3679}{1.871} \approx 0.1966$ ✓ |
| $3$    | $0.9526$    | $0.0474$    | $0.0451$         | $\frac{e^{-3}}{(1+e^{-3})^2} \approx \frac{0.0498}{1.103} \approx 0.0451$ ✓ |

Hai cột cuối khớp tới 4 chữ số thập phân → công thức $\sigma' = \sigma(1-\sigma)$ đúng.

### 10.4 Vì sao "trick đẹp" này quan trọng?

Khi train neural network bằng **backpropagation** (Lesson 04 + 07 sẽ học chi tiết), ta cần đạo hàm của activation function tại mỗi nơron. Nếu activation là sigmoid:

- **Forward pass**: tính $a = \sigma(z)$, lưu lại $a$.
- **Backward pass**: cần $\sigma'(z)$ — thay vì tính lại $\frac{e^{-z}}{(1+e^{-z})^2}$ (đắt vì có exp), ta dùng giá trị $a$ đã có: $\sigma'(z) = a \cdot (1 - a)$. **Chỉ 1 phép nhân và 1 phép trừ.**

Đây là một trong những lý do sigmoid (và cả $\tanh$) phổ biến thời kỳ đầu của deep learning. **ReLU** sau này thậm chí còn rẻ hơn (đạo hàm = 0 hoặc 1), nhưng "trick đẹp" của sigmoid vẫn rất kinh điển và đáng học vì nó cho thấy: chọn **biểu diễn hàm hợp lý** có thể biến đạo hàm phức tạp thành công thức 2 phép toán.

> ❓ **Câu hỏi tự nhiên**:
> - *"$\sigma'(x)$ lớn nhất tại đâu?"* Vì $\sigma'(x) = \sigma(1-\sigma)$ là parabola theo $\sigma$, đạt max tại $\sigma = \frac{1}{2}$, tức tại $x = 0$. Max bằng $\frac{1}{4} = 0.25$.
> - *"Tại sao đạo hàm bé khi $|x|$ lớn?"* Vì khi đó $\sigma \approx 0$ hoặc $\sigma \approx 1$, tích $\sigma(1-\sigma) \approx 0$. Hệ quả thực tế: gradient gần như tắt — đây là **vanishing gradient problem** mà neural network sâu gặp phải khi dùng sigmoid → lý do ReLU thắng thế.

---

## 📝 Tóm tắt lý thuyết

### Bảng quy tắc tổ hợp

| Tên           | Công thức                                            |
|---------------|------------------------------------------------------|
| Sum           | $(f + g)' = f' + g'$                                 |
| Constant      | $(c \cdot f)' = c \cdot f'$                                      |
| Product       | $(fg)' = f'g + fg'$                                  |
| Quotient      | $(f/g)' = \frac{f'g - fg'}{g^2}$                            |
| Reciprocal    | $(1/g)' = -\frac{g'}{g^2}$                                    |

### Bảng đạo hàm hàm sơ cấp

| Hàm           | Đạo hàm                |
|---------------|------------------------|
| $c$ (hằng)    | $0$                    |
| $x^n$         | $n \cdot x^{n-1}$            |
| $e^x$         | $e^x$                  |
| $a^x$         | $a^x \cdot \ln a$           |
| $\ln x$        | $\frac{1}{x}$                  |
| $\log_b x$     | $\frac{1}{x \cdot \ln b}$         |
| $\sin x$       | $\cos x$                |
| $\cos x$       | $-\sin x$               |
| $\tan x$       | $\sec^2 x$               |
| $\cot x$       | $-\csc^2 x$              |
| $\sec x$       | $\sec x \cdot \tan x$        |
| $\csc x$       | $-\csc x \cdot \cot x$       |
| $\arcsin x$    | $\frac{1}{\sqrt{1-x^2}}$            |
| $\arccos x$    | $-\frac{1}{\sqrt{1-x^2}}$           |
| $\arctan x$    | $\frac{1}{1+x^2}$             |
| $\sigma(x)$        | $\sigma(x)(1-\sigma(x))$        |

Hai bảng này + **chain rule** (Lesson 04) là đủ để đạo hàm mọi hàm sơ cấp trong machine learning.

---

## Bài tập

### Bài 1 (Linear + Power)
Tính đạo hàm: $f(x) = 4x^5 - 3x^3 + 2x - 7$.

### Bài 2 (Product rule)
Tính: $f(x) = x^3 \cdot \cos x$.

### Bài 3 (Quotient rule)
Tính: $f(x) = \frac{x^2 - 1}{x^2 + 1}$. Sau đó tính $f'(0)$.

### Bài 4 (Power rule mở rộng)
Tính: $f(x) = \sqrt{x} + \frac{1}{x^2}$. Tính $f'(4)$.

### Bài 5 (Trig + log)
Tính: $f(x) = \tan x \cdot \ln x$ tại $x = \pi/4$.

### Bài 6 (Sigmoid verify)
Cho $\sigma(x) = \frac{1}{1+e^{-x}}$. Bằng product/quotient rule, chứng minh trực tiếp $\sigma'(0) = \frac{1}{4}$ mà không dùng công thức $\sigma(1-\sigma)$.

---

## Lời giải chi tiết

### Bài 1

$f(x) = 4x^5 - 3x^3 + 2x - 7$. Áp linear + power rule:

$$f'(x) = 4 \cdot 5x^4 - 3 \cdot 3x^2 + 2 \cdot 1 - 0 = 20x^4 - 9x^2 + 2$$

### Bài 2

$f(x) = x^3 \cdot \cos x$. Đặt $u = x^3$ ($u' = 3x^2$), $v = \cos x$ ($v' = -\sin x$).

$$f'(x) = u'v + uv' = 3x^2 \cdot \cos x + x^3 \cdot (-\sin x) = 3x^2 \cos x - x^3 \sin x$$

### Bài 3

$f(x) = \frac{x^2 - 1}{x^2 + 1}$. $u = x^2-1$ ($u' = 2x$), $v = x^2+1$ ($v' = 2x$).

$$\begin{aligned}
f'(x) &= \frac{2x \cdot (x^2+1) - (x^2-1) \cdot 2x}{(x^2+1)^2} \\[4pt]
      &= \frac{2x \cdot [(x^2+1) - (x^2-1)]}{(x^2+1)^2} \\[4pt]
      &= \frac{2x \cdot 2}{(x^2+1)^2} \\[4pt]
      &= \frac{4x}{(x^2+1)^2}
\end{aligned}$$

Tại $x = 0$: $f'(0) = 0$. (Hợp lý: $f$ là hàm chẵn, đạt min tại 0.)

### Bài 4

$f(x) = x^{1/2} + x^{-2}$. Linear + power rule:

$$f'(x) = \frac{1}{2} \cdot x^{-1/2} + (-2) \cdot x^{-3} = \frac{1}{2\sqrt{x}} - \frac{2}{x^3}$$

Tại $x = 4$:

$$f'(4) = \frac{1}{2 \cdot 2} - \frac{2}{64} = \frac{1}{4} - \frac{1}{32} = \frac{8}{32} - \frac{1}{32} = \frac{7}{32} = 0.21875$$

### Bài 5

$f(x) = \tan x \cdot \ln x$. Product rule: $u = \tan x$ ($u' = \sec^2 x$), $v = \ln x$ ($v' = 1/x$).

$$f'(x) = \sec^2 x \cdot \ln x + \tan x \cdot \frac{1}{x}$$

Tại $x = \pi/4$:
- $\tan(\pi/4) = 1$, $\sec^2(\pi/4) = \frac{1}{\cos^2(\pi/4)} = \frac{1}{1/2} = 2$.
- $\ln(\pi/4) \approx \ln(0.7854) \approx -0.2416$.
- $\frac{1}{x} = \frac{4}{\pi} \approx 1.2732$.

$$f'(\pi/4) \approx 2 \cdot (-0.2416) + 1 \cdot 1.2732 \approx -0.4832 + 1.2732 \approx 0.7900$$

### Bài 6

$\sigma(x) = \frac{1}{1 + e^{-x}}$. Đặt $g(x) = 1 + e^{-x}$, vậy $g'(x) = -e^{-x}$ (sẽ verify sau bằng chain rule, ở đây ta thừa nhận đạo hàm của $e^{-x}$ là $-e^{-x}$).

Áp $(1/g)' = -\frac{g'}{g^2}$:

$$\sigma'(x) = \frac{-(-e^{-x})}{(1 + e^{-x})^2} = \frac{e^{-x}}{(1 + e^{-x})^2}$$

Tại $x = 0$: $e^0 = 1$, $(1 + 1)^2 = 4$.

$$\sigma'(0) = \frac{1}{4} \quad \checkmark$$

Kết quả khớp với công thức trick đẹp: $\sigma(0) \cdot (1-\sigma(0)) = \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}$.

---

## Liên kết

- ⬅ Lesson trước: [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/)
- ➡ Lesson tiếp theo: [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — quy tắc đạo hàm cho composition $f(g(x))$, **chìa khóa của backpropagation**.
- 🔗 Liên quan:
  - [Algebra Lesson 07 — Lũy thừa và log](../../01-Algebra/lesson-07-exponentials-logs/)
  - [Trigonometry Lesson 04 — Trig graphs](../../02-Trigonometry/lesson-04-trig-graphs/)
  - [Trigonometry Lesson 05 — Identities](../../02-Trigonometry/lesson-05-identities-cosine-law/) — định lý Pythagore $\sin^2 + \cos^2 = 1$ dùng trong chứng minh $(\tan)' = \sec^2$.
- 🔭 Sẽ gặp lại:
  - Lesson 04 — chain rule + đạo hàm sigmoid bằng cách dùng chain trên $e^{-x}$.
  - Lesson 07 — gradient descent + backprop — dùng đạo hàm sigmoid $\sigma(1-\sigma)$ ngay trong vòng lặp huấn luyện.
  - Tầng 5 — Probability: hàm logistic xuất hiện trong cross-entropy loss và logistic regression.
  - Tầng 6 — AI/ML: sigmoid trong attention gating của RNN/LSTM, output của classifier nhị phân.

[▶ Mở visualization](./visualization.html)
