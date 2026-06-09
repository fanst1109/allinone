# Lesson 06 — Nguyên hàm (Antiderivatives)

## Mục tiêu

- Hiểu **nguyên hàm** $F(x)$ là gì — đạo hàm ngược của $f(x)$.
- Thuộc **bảng nguyên hàm cơ bản**.
- 2 kỹ thuật chính: **đổi biến** (u-substitution), **từng phần** (integration by parts).
- Phân biệt nguyên hàm (vô định) và tích phân xác định (sẽ học ở L07).

## Kiến thức tiền đề

- [Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

---

## 1. Nguyên hàm là gì?

💡 **Định nghĩa**: $F(x)$ là nguyên hàm của $f(x)$ trên $(a, b)$ nếu **$F'(x) = f(x)$** với mọi $x$.

**Ký hiệu**: $\int f(x)\,dx = F(x) + C$ ($C$ = hằng số bất kỳ).

⚠ **Vì sao có +C**: Vì đạo hàm của hằng số = 0. Nếu $F$ là 1 nguyên hàm thì $F + 1$, $F + \pi$, $F + (-5)$ cũng đều là nguyên hàm. Tập hợp tất cả $= F + C$.

**Ví dụ**: $f(x) = 2x$.
- $F(x) = x^2$ là nguyên hàm (vì $(x^2)' = 2x$).
- $F(x) = x^2 + 7$ cũng là.
- Tổng quát: $\int 2x\,dx =$ **$x^2 + C$**.

> 📐 **Định nghĩa đầy đủ — Nguyên hàm**
>
> **(a) Là gì**: $F(x)$ là **nguyên hàm** của $f(x)$ khi đạo hàm $F'(x) = f(x)$. Tập hợp tất cả nguyên hàm $= F(x) + C$ với $C \in \mathbb{R}$ tùy ý — vì đạo hàm "xoá" hằng số. Ký hiệu $\int f\,dx = F + C$ đại diện cho **họ vô hạn** đường cong song song.
>
> **(b) Vì sao cần**: Đạo hàm cho slope, nhưng nhiều bài toán đi ngược — biết tốc độ thay đổi, tìm hàm. Vận tốc $\to$ vị trí, gia tốc $\to$ vận tốc, mật độ $\to$ khối lượng, lãi suất $\to$ số dư. Đây là **đảo ngược của đạo hàm**, và là bước đầu cho tích phân xác định (FTC sẽ liên kết). Không có nguyên hàm, không tính được diện tích, thể tích, công, lưu lượng, v.v. $\int f\,dx$ tồn tại với mọi $f$ liên tục (Định lý cơ bản giải tích).
>
> **(c) Ví dụ số**: $\int 2x\,dx = x^2 + C$. Verify: $(x^2 + C)' = 2x$ ✓. $\int \cos x\,dx = \sin x + C$ (vì $(\sin x)' = \cos x$). $\int \frac{1}{x}\,dx = \ln|x| + C$. Bài toán: nếu $v(t) = 9.8t$ (vận tốc rơi tự do), thì vị trí $s(t) = \int 9.8t\,dt = 4.9t^2 + C$. Với $s(0) = 0 \to C = 0 \to$ **$s(t) = 4.9t^2$** (công thức rơi quen thuộc). $\int (x^2 + 3x + 1)\,dx = \frac{x^3}{3} + \frac{3x^2}{2} + x + C$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết mình tìm nguyên hàm đúng?"* **Đạo hàm ngược lại** để kiểm! Nếu $(F(x))' = f(x)$ thì đúng. Đây là cách tự kiểm mọi bài nguyên hàm — luôn làm được vì đạo hàm dễ hơn nguyên hàm.
- *"`+C` có thật sự quan trọng không, hay chỉ là quy ước?"* Rất quan trọng. Nó biểu thị **họ vô hạn** nguyên hàm. Trong bài toán thực (vd vận tốc → vị trí), $C$ được xác định bởi **điều kiện ban đầu** (vd $s(0)=0$). Bỏ $C$ = mất thông tin.
- *"Mọi hàm đều có nguyên hàm?"* Mọi hàm **liên tục** đều có (theo FTC, L07). Nhưng nguyên hàm không phải lúc nào cũng viết được bằng hàm sơ cấp — vd $\int e^{-x^2}\,dx$ tồn tại nhưng không có công thức sơ cấp.

⚠ **Lỗi thường gặp — quên `+C`**. Viết $\int 2x\,dx = x^2$ là **thiếu**. Mọi nguyên hàm bất định phải có `+C`. Đây là lỗi #1 của người mới học tích phân.

🔁 **Dừng lại tự kiểm tra**

1. $\int 3x^2\,dx = \,?$ (nhớ `+C`). Kiểm bằng đạo hàm.
2. $F(x) = x^2 + 5$ và $G(x) = x^2 - 3$ đều là nguyên hàm của hàm nào?

<details><summary>Đáp án</summary>

1. $x^3 + C$. Kiểm: $(x^3 + C)' = 3x^2$ ✓.
2. Cả hai là nguyên hàm của $2x$ (vì $(x^2+5)' = (x^2-3)' = 2x$); chúng khác nhau đúng một hằng số.

</details>

### 📝 Tóm tắt mục 1

- $F$ là nguyên hàm của $f$ $\iff F' = f$; $\int f\,dx = F + C$ là **họ vô hạn** đường cong.
- **Luôn kèm `+C`** (lỗi phổ biến nhất khi quên); $C$ xác định bởi điều kiện ban đầu.
- Kiểm kết quả bằng cách **đạo hàm ngược lại**; mọi hàm liên tục đều có nguyên hàm.

---

## 2. Bảng nguyên hàm cơ bản

Tra ngược bảng đạo hàm (L04):

| $f(x)$ | $\int f\,dx$ |
|------|--------|
| $0$ | $C$ |
| $1$ | $x + C$ |
| $x^n$ ($n \neq -1$) | $\dfrac{x^{n+1}}{n+1} + C$ |
| $\dfrac{1}{x}$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\dfrac{1}{\cos^2 x}$ | $\tan x + C$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x + C$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + C$ |

💡 **Phải thuộc bảng**. Tích phân = "đảo bảng đạo hàm".

⚠ **Quan trọng**: $\int \frac{1}{x}\,dx = \ln$**$|x|$**$+ C$, không phải $\ln x$ (vì miền âm phải có $|x|$).

**Verify vài dòng bảng bằng đạo hàm ngược**:
- $\int x^n\,dx = \frac{x^{n+1}}{n+1}$: $\left(\frac{x^{n+1}}{n+1}\right)' = \frac{(n+1)x^n}{n+1} = x^n$ ✓.
- $\int e^x\,dx = e^x + C$: $(e^x)' = e^x$ ✓.
- $\int \frac{1}{1+x^2}\,dx = \arctan x + C$: $(\arctan x)' = \frac{1}{1+x^2}$ ✓ (từ L04).
- $\int \sin x\,dx = -\cos x + C$: $(-\cos x)' = -(-\sin x) = \sin x$ ✓ (chú ý **dấu trừ**).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\int x^n\,dx$ loại trừ $n = -1$?"* Vì công thức $\frac{x^{n+1}}{n+1}$ chia cho $n+1 = 0$ khi $n = -1$ → vô nghĩa. Trường hợp $n = -1$ (tức $\int \frac{1}{x}$) có nguyên hàm riêng là $\ln|x| + C$ — một ngoại lệ đặc biệt.
- *"$\int \sin x = -\cos x$ sao lại có dấu trừ?"* Vì $(\cos x)' = -\sin x$, nên để đạo hàm ra $+\sin x$ cần $-\cos x$. Đây là chỗ rất hay sai dấu — kiểm bằng đạo hàm ngược là chắc.

🔁 **Dừng lại tự kiểm tra**

1. $\int \cos x\,dx = \,?$ $\int \sin x\,dx = \,?$ (chú ý dấu)
2. $\int x^3\,dx = \,?$

<details><summary>Đáp án</summary>

1. $\int \cos x = \sin x + C$; $\int \sin x = -\cos x + C$. (Đạo hàm tạo dấu trừ với cos; nguyên hàm "trả" dấu trừ cho sin.)
2. $\frac{x^4}{4} + C$ (kiểm: $\left(\frac{x^4}{4}\right)' = x^3$ ✓).

</details>

### 📝 Tóm tắt mục 2

- Bảng nguyên hàm = đảo bảng đạo hàm; thuộc $x^n, e^x, \frac{1}{x}, \sin/\cos, \frac{1}{1+x^2}$.
- $\int x^n = \frac{x^{n+1}}{n+1}$ (trừ $n=-1$); $\int \frac{1}{x} = \ln|x| + C$ (có $|\cdot|$).
- Cẩn thận **dấu** ở $\int \sin x = -\cos x$; luôn kiểm bằng đạo hàm ngược.

---

## 3. Quy tắc cơ bản

$$\begin{aligned}
\int c\cdot f(x)\,dx &= c\cdot\int f(x)\,dx \\
\int (f + g)\,dx &= \int f\,dx + \int g\,dx
\end{aligned}$$

⚠ **Không có quy tắc cho tích và thương** (khác đạo hàm). Phải dùng kỹ thuật đổi biến/từng phần.

**Ví dụ**: $\int (3x^2 + 2\sin x)\,dx = 3\cdot\frac{x^3}{3} + 2\cdot(-\cos x) + C =$ **$x^3 - 2\cos x + C$**.

💡 **Trực giác**: nguyên hàm "thừa hưởng" tính tuyến tính từ đạo hàm. Vì $(F+G)' = F'+G'$ và $(cF)' = cF'$, đảo ngược lại thì tích phân cũng tách qua tổng và rút hằng số ra ngoài.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có quy tắc tổng mà không có quy tắc tích?"* Vì đạo hàm tích là $f'g + fg'$ (rối, không tách gọn), nên đảo ngược không cho công thức đơn giản. Tích/thương phải dùng kỹ thuật (đổi biến, từng phần) — đó là lý do tích phân **khó hơn** đạo hàm.
- *"$\int f\cdot g\,dx = \int f \cdot \int g$ đúng không?"* SAI hoàn toàn. Phản ví dụ: $\int x\cdot x\,dx = \int x^2\,dx = \frac{x^3}{3}$, nhưng $\int x \cdot \int x = \frac{x^2}{2}\cdot\frac{x^2}{2} = \frac{x^4}{4}$. Khác nhau.

⚠ **Lỗi thường gặp — bịa quy tắc nhân/chia cho tích phân**. Không tồn tại $\int fg = \int f\cdot\int g$ hay $\int \frac{f}{g} = \frac{\int f}{\int g}$. Gặp tích/thương phải nghĩ tới đổi biến (mục 4) hoặc từng phần (mục 5).

🔁 **Dừng lại tự kiểm tra**

1. $\int (4x^3 - 6x + 2)\,dx = \,?$
2. $\int x^2\cdot\cos x\,dx$ — tách thành $\int x^2 \cdot \int \cos x$ được không?

<details><summary>Đáp án</summary>

1. $x^4 - 3x^2 + 2x + C$ (tách tổng + rút hằng số).
2. **Không** — không có quy tắc tích cho tích phân; phải dùng từng phần (mục 5).

</details>

### 📝 Tóm tắt mục 3

- Tích phân **tuyến tính**: $\int(f\pm g) = \int f \pm \int g$, $\int cf = c\int f$.
- **Không** có quy tắc cho tích/thương (khác đạo hàm) → dùng đổi biến/từng phần.
- Đừng bịa $\int fg = \int f\cdot\int g$ — sai (phản ví dụ $\int x\cdot x$).

---

## 4. Đổi biến — u-substitution

🎯 **Mục đích**: Tìm 1 phần biểu thức là $g(x)$ và đạo hàm của nó cũng có mặt → đặt $u = g(x)$ → đơn giản.

$$\int f(g(x))\cdot g'(x)\,dx = \int f(u)\,du \qquad (\text{đặt } u = g(x),\ du = g'(x)\,dx)$$

💡 **Trực giác**: Đây là **đảo ngược chain rule**.

**Ví dụ 1**: $\int 2x\cdot\cos(x^2)\,dx$.
- Đặt $u = x^2$, $du = 2x\,dx$ → $\int \cos(u)\,du = \sin(u) + C =$ **$\sin(x^2) + C$**.

**Kiểm tra**: $(\sin x^2)' = \cos(x^2)\cdot 2x$ ✓.

**Ví dụ 2**: $\int \frac{x}{x^2+1}\,dx$.
- Đặt $u = x^2+1$, $du = 2x\,dx$ → $x\,dx = \frac{du}{2}$.
- $\int \frac{1}{u}\cdot\frac{du}{2} = \frac{1}{2}\cdot\ln|u| + C =$ **$\frac{1}{2}\cdot\ln(x^2+1) + C$**.

**Ví dụ 3**: $\int e^{3x}\,dx$.
- $u = 3x$, $du = 3\,dx$ → $dx = \frac{du}{3}$.
- $\int e^u \cdot \frac{du}{3} = \frac{1}{3}\cdot e^u + C =$ **$\frac{1}{3}\cdot e^{3x} + C$**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn $u$ là phần nào?"* Chọn $u = g(x)$ sao cho $g'(x)$ (đạo hàm của nó) **cũng xuất hiện** trong biểu thức (sai khác hằng số). Ở ví dụ 1, $u = x^2$ vì $2x$ có sẵn. Nếu không thấy $g'$ → đổi biến không trực tiếp dùng được.
- *"Phải đổi cả $dx$ thành $du$?"* Đúng — không được để lẫn $x$ và $u$. Sau khi đặt $u = g(x)$, mọi $x$ và $dx$ phải biến hết thành $u$ và $du$. Cuối cùng thay $u = g(x)$ trở lại.

⚠ **Lỗi thường gặp — quên đổi $dx$ hoặc để sót $x$**. $\int 2x\cdot\cos(x^2)\,dx$: nếu chỉ thay $\cos(x^2) \to \cos u$ mà giữ $2x\,dx$ thì sai. Phải dùng $du = 2x\,dx$ để **nuốt trọn** $2x\,dx$, kết quả $\int \cos u\,du$. Nếu sau khi đặt còn $x$ lẻ loi → chọn $u$ chưa đúng.

🔁 **Dừng lại tự kiểm tra**

1. $\int 3x^2\cdot(x^3+1)^5\,dx$ — đặt $u = \,?$
2. Kiểm $\int e^{3x}\,dx = \frac{1}{3}e^{3x} + C$ bằng đạo hàm.

<details><summary>Đáp án</summary>

1. $u = x^3+1$, $du = 3x^2\,dx$ → $\int u^5\,du = \frac{u^6}{6} + C = \frac{(x^3+1)^6}{6} + C$.
2. $\left(\frac{1}{3}e^{3x}\right)' = \frac{1}{3}\cdot e^{3x}\cdot 3 = e^{3x}$ ✓.

</details>

### 📝 Tóm tắt mục 4

- Đổi biến = **đảo chain rule**: $\int f(g(x))\cdot g'(x)\,dx = \int f(u)\,du$.
- Chọn $u = g(x)$ sao cho $g'(x)$ có mặt; đổi **cả** $x$ và $dx$ sang $u, du$.
- Cuối cùng thay $u = g(x)$ trở lại; nếu còn $x$ lẻ → chọn $u$ sai.

---

## 5. Từng phần — Integration by parts

$$\int u\,dv = u\cdot v - \int v\,du$$

💡 **Trực giác**: Đây là **đảo ngược product rule** $(uv)' = u'v + uv' \to \int uv' = uv - \int u'v$.

**Mẹo chọn u, dv**: chọn $u$ là phần khi đạo hàm sẽ **đơn giản** (vd: $x$, $\ln x$), $dv$ là phần dễ tích phân.

### Quy tắc nhớ "LIATE"

Ưu tiên chọn u theo thứ tự:
- **L**ogarith ($\ln$, $\log$)
- **I**nverse trig ($\arcsin$, $\arctan$)
- **A**lgebra ($x$, $x^2$, ...)
- **T**rig ($\sin$, $\cos$)
- **E**xponential ($e^x$, $a^x$)

**Ví dụ 1**: $\int x\cdot e^x\,dx$.
- $u = x$ (A), $dv = e^x\,dx$ (E). $du = dx$, $v = e^x$.
- $= x\cdot e^x - \int e^x\,dx = x\cdot e^x - e^x + C =$ **$e^x\cdot(x - 1) + C$**.

**Ví dụ 2**: $\int \ln x\,dx$.
- $u = \ln x$, $dv = dx$. $du = \frac{dx}{x}$, $v = x$.
- $= x\cdot\ln x - \int x\cdot\frac{1}{x}\,dx = x\cdot\ln x - x + C =$ **$x\cdot(\ln x - 1) + C$**.

**Ví dụ 3**: $\int x\cdot\cos x\,dx$.
- $u = x$ (A), $dv = \cos x\,dx$ (T). $du = dx$, $v = \sin x$.
- $= x\cdot\sin x - \int \sin x\,dx =$ **$x\cdot\sin x + \cos x + C$**.

**Verify ví dụ 1 bằng đạo hàm ngược** — $\int x\cdot e^x\,dx = e^x(x-1) + C$:
- $(e^x(x-1))' = e^x(x-1) + e^x\cdot 1 = e^x(x-1+1) = e^x\cdot x = x\cdot e^x$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao chọn $u$ theo LIATE?"* Vì ta muốn $\int v\,du$ (tích phân còn lại) **đơn giản hơn** ban đầu. Chọn $u$ là phần khi đạo hàm sẽ "teo nhỏ" ($\ln x \to \frac{1}{x}$, $x \to 1$), $dv$ là phần dễ lấy nguyên hàm. LIATE xếp thứ tự ưu tiên đó.
- *"Gặp $\int \ln x\,dx$ không có 'dv' rõ ràng thì sao?"* Đặt $u = \ln x$, $dv = dx$ (coi như nhân 1). Khi đó $v = x$, ra $x \ln x - \int x\cdot\frac{1}{x}\,dx = x \ln x - x + C$. Mẹo "dv = dx" rất hay dùng cho $\ln x$, $\arctan x$.

⚠ **Lỗi thường gặp — chọn $u, dv$ ngược làm bài khó hơn**. $\int x\cdot e^x\,dx$: nếu chọn $u = e^x$, $dv = x\,dx$ thì $\int v\,du = \int \frac{x^2}{2}e^x\,dx$ — **phức tạp hơn** ban đầu. Đúng phải chọn $u = x$ (theo LIATE: A trước E) để $du = dx$ làm tích phân teo lại.

🔁 **Dừng lại tự kiểm tra**

1. $\int x\cdot e^{2x}\,dx = \,?$ (chọn $u = x$, $dv = e^{2x}\,dx$).
2. Trong $\int \ln x\,dx$, vì sao đặt $dv = dx$?

<details><summary>Đáp án</summary>

1. $u=x, du=dx$; $dv=e^{2x}\,dx, v=\frac{1}{2}e^{2x}$. $= \frac{x}{2}e^{2x} - \int\frac{1}{2}e^{2x}\,dx = \frac{x}{2}e^{2x} - \frac{1}{4}e^{2x} + C$.
2. Vì $\ln x$ không có nguyên hàm hiển nhiên để làm $dv$; đặt $dv=dx$ cho $v=x$, còn $u=\ln x$ đạo hàm thành $\frac{1}{x}$ đơn giản.

</details>

### 📝 Tóm tắt mục 5

- Từng phần = **đảo product rule**: $\int u\,dv = uv - \int v\,du$.
- Chọn $u$ theo **LIATE** (Log, Inverse trig, Algebra, Trig, Exp) để $\int v\,du$ gọn hơn.
- Mẹo $dv = dx$ cho $\int \ln x$, $\int \arctan x$; chọn ngược sẽ làm bài khó hơn.

---

## 6. Các dạng đặc biệt

### 6.1. $\int \frac{1}{ax+b}\,dx$

$$= \frac{1}{a}\cdot\ln|ax + b| + C$$

### 6.2. $\int \frac{1}{x^2 + a^2}\,dx$

$$= \frac{1}{a}\cdot\arctan\frac{x}{a} + C$$

### 6.3. $\int \tan x\,dx$

$$= -\ln|\cos x| + C$$

(Đổi biến $u = \cos x$, $du = -\sin x\,dx$).

💡 **Trực giác**: ba dạng này là "mẫu thường gặp" mà mọi người thuộc lòng — đều suy ra được từ đổi biến hoặc bảng cơ bản, nhưng nhớ sẵn giúp tiết kiệm thời gian.

**Verify từng dạng bằng đạo hàm ngược**:
- $\int \frac{1}{ax+b}\,dx = \frac{1}{a}\ln|ax+b|$: $\left(\frac{1}{a}\ln|ax+b|\right)' = \frac{1}{a}\cdot\frac{a}{ax+b} = \frac{1}{ax+b}$ ✓.
- $\int \frac{1}{x^2+a^2}\,dx = \frac{1}{a}\arctan\frac{x}{a}$: $\left(\frac{1}{a}\arctan\frac{x}{a}\right)' = \frac{1}{a}\cdot\frac{1/a}{1+(x/a)^2} = \frac{1}{a^2+x^2}$ ✓.
- $\int \tan x\,dx = -\ln|\cos x|$: $(-\ln|\cos x|)' = -\frac{1}{\cos x}\cdot(-\sin x) = \frac{\sin x}{\cos x} = \tan x$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\int \frac{1}{x^2+a^2}$ và $\int \frac{1}{a^2-x^2}$ có giống nhau không?"* Khác hẳn. Dạng $+$ ra $\arctan$; dạng $-$ (hiệu) ra $\ln$ (phân tích phân thức). Để ý dấu giữa hai hạng tử.
- *"Phải thuộc hết các dạng đặc biệt?"* Nên nhớ ba dạng trên vì rất hay gặp. Khi quên, vẫn suy lại được bằng đổi biến (vd $\tan x$ qua $u = \cos x$).

⚠ **Lỗi thường gặp — thiếu hệ số $\frac{1}{a}$**. $\int \frac{1}{x^2+4}\,dx = \frac{1}{2}\arctan\frac{x}{2}$, KHÔNG phải $\arctan\frac{x}{2}$. Hệ số $\frac{1}{a}$ (ở đây $a=2$) rất dễ rơi rớt — verify bằng đạo hàm sẽ phát hiện ngay.

🔁 **Dừng lại tự kiểm tra**

1. $\int \frac{1}{x^2+9}\,dx = \,?$
2. $\int \frac{1}{2x+5}\,dx = \,?$

<details><summary>Đáp án</summary>

1. $a=3$ → $\frac{1}{3}\arctan\frac{x}{3} + C$.
2. $\frac{1}{2}\ln|2x+5| + C$.

</details>

### 📝 Tóm tắt mục 6

- $\int \frac{1}{ax+b}\,dx = \frac{1}{a}\ln|ax+b| + C$; $\int \frac{1}{x^2+a^2}\,dx = \frac{1}{a}\arctan\frac{x}{a} + C$.
- $\int \tan x\,dx = -\ln|\cos x| + C$ (đổi biến $u = \cos x$).
- Đừng quên hệ số $\frac{1}{a}$; verify bằng đạo hàm ngược.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính $\int (x^4 + 3x^2 - 5)\,dx$.

**Bài 2**: Tính $\int \sin(2x)\,dx$.

**Bài 3**: Tính $\int x^2\cdot e^{x^3}\,dx$.

**Bài 4**: Tính $\int x\cdot\sin x\,dx$.

**Bài 5**: Tính $\int \frac{1}{x^2+4}\,dx$.

### Lời giải

**Bài 1**: $\frac{x^5}{5} + x^3 - 5x + C$.

**Bài 2**: $u = 2x$ → $\int \sin u \cdot \frac{du}{2} = -\frac{1}{2}\cdot\cos u + C =$ **$-\frac{1}{2}\cdot\cos(2x) + C$**.

**Bài 3**: $u = x^3$, $du = 3x^2\,dx$ → $x^2\,dx = \frac{du}{3}$. → $\frac{1}{3}\cdot\int e^u\,du =$ **$\frac{1}{3}\cdot e^{x^3} + C$**.

**Bài 4**: Từng phần: $u = x$, $dv = \sin x\,dx$. $v = -\cos x$. → $-x\cdot\cos x + \int \cos x\,dx =$ **$-x\cdot\cos x + \sin x + C$**.

**Bài 5**: Dạng $\frac{1}{x^2+a^2}$ với $a=2$ → **$\frac{1}{2}\cdot\arctan\frac{x}{2} + C$**.

---

## 8. Bài tiếp theo

[Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

## 📝 Tổng kết

1. **$\int f\,dx = F + C$** với $F' = f$. **Phải có +C** vì hằng số mất khi đạo hàm.
2. **Bảng cơ bản**: thuộc $x^n$, $\sin/\cos$, $e^x$, $\frac{1}{x}$, $\frac{1}{1+x^2}$.
3. **Đổi biến** = đảo chain rule. Đặt $u = $ phần "khó", $du$ có sẵn trong biểu thức.
4. **Từng phần** = đảo product rule: $\int u\,dv = uv - \int v\,du$. Chọn $u$ theo LIATE.
5. Không có quy tắc nhân/chia trực tiếp như đạo hàm.
