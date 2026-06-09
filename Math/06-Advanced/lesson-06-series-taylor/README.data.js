// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-06-series-taylor/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Chuỗi & Khai triển Taylor

## Mục tiêu

- Hiểu **chuỗi số** $\\sum a_n$ — hội tụ/phân kỳ.
- Các tiêu chí hội tụ: so sánh, tỉ số (d'Alembert), Cauchy.
- **Chuỗi luỹ thừa** & bán kính hội tụ.
- **Khai triển Taylor** — xấp xỉ hàm bằng đa thức.

## Kiến thức tiền đề

- [T4 L01 — Giới hạn dãy](../../04-Calculus-1var/lesson-01-sequences-limits/), L03-04 đạo hàm.

---

## 1. Chuỗi số

💡 **Trực giác / Hình dung**: cộng vô hạn số — kết quả có thể là **số hữu hạn** (hội tụ) hay **vô cùng / không ổn định** (phân kỳ). Nghịch lý? Hình dung đi bộ: bước 1/2, rồi 1/4, rồi 1/8... tổng tiến tới đúng 1 dù vô hạn bước. Nhưng cộng 1+1+1+... thì lớn vô hạn. Chuỗi hội tụ = "các số hạng nhỏ đủ nhanh để tổng dừng lại".

$$\\sum_{n=1}^\\infty a_n = a_1 + a_2 + a_3 + \\dots$$

**Tổng riêng** $S_N = a_1 + \\dots + a_N$. Nếu $S_N$ có giới hạn $S$ khi $N \\to \\infty$, chuỗi **hội tụ** với tổng $S$. Ngược lại **phân kỳ**.

### Ví dụ kinh điển

**Cấp số nhân**: $\\sum_{n=0}^\\infty a\\cdot r^n = \\dfrac{a}{1-r}$ khi $|r| < 1$.
- $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots = \\dfrac{1}{1-1/2} = \\mathbf{2}$.
- $1 + 1 + 1 + \\dots =$ phân kỳ.

**Chuỗi điều hòa**: $\\sum \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots \\to$ **phân kỳ** (mặc dù $a_n \\to 0$).

**Chuỗi p**: $\\sum \\frac{1}{n^p}$ hội tụ $\\iff p > 1$.
- $p = 1$: phân kỳ (điều hòa).
- $p = 2$: hội tụ. $\\sum \\frac{1}{n^2} = \\frac{\\pi^2}{6}$ (Euler).

**4 ví dụ số đa dạng** (phân loại hội tụ/phân kỳ):
- $\\sum \\left(\\frac{1}{2}\\right)^n = 1 + \\frac{1}{2} + \\frac{1}{4} + \\dots = \\mathbf{2}$ (hội tụ, $|r| < 1$).
- $\\sum \\frac{1}{n^2} = 1 + \\frac{1}{4} + \\frac{1}{9} + \\dots = \\mathbf{\\dfrac{\\pi^2}{6} \\approx 1.645}$ (hội tụ, $p = 2 > 1$).
- $\\sum \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots = \\mathbf{\\infty}$ (phân kỳ, điều hòa $p = 1$).
- $\\sum 2^n = 1 + 2 + 4 + \\dots = \\mathbf{\\infty}$ (phân kỳ, $r = 2 > 1$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$a_n \\to 0$ thì chuỗi hội tụ chứ?"* **Không đủ!** Chuỗi điều hòa $\\sum 1/n$ có $1/n \\to 0$ nhưng vẫn phân kỳ. $a_n \\to 0$ chỉ là điều kiện **cần**, không đủ.
- *"Cấp số nhân hội tụ khi nào?"* $|r| < 1$. Tổng $= \\frac{a}{1-r}$. Vd $r = 1/3$: hội tụ; $r = 1$ hoặc $r \\ge 1$: phân kỳ.

⚠ **Lỗi thường gặp — kết luận hội tụ chỉ vì các số hạng nhỏ dần**. Phản ví dụ: $\\sum 1/n$ có số hạng nhỏ dần về 0 nhưng tổng $\\to \\infty$ (phân kỳ). Tốc độ nhỏ dần phải **đủ nhanh** (như $1/n^2$ hoặc $r^n$ với $|r|<1$).

🔁 **Dừng lại tự kiểm tra**

1. $\\sum (1/4)^n$ ($n$ từ 0) hội tụ về bao nhiêu?
2. $\\sum 1/n^{1/2}$ hội tụ hay phân kỳ?

<details><summary>Đáp án</summary>

1. $a = 1$, $r = 1/4$ → tổng $= \\dfrac{1}{1-1/4} = \\dfrac{1}{3/4} = \\mathbf{\\dfrac{4}{3}}$.
2. $p = 1/2 \\le 1$ → **phân kỳ** (chuỗi p chỉ hội tụ khi $p > 1$).

</details>

### 📝 Tóm tắt mục 1

- Chuỗi hội tụ $\\iff$ tổng riêng $S_N$ có giới hạn hữu hạn.
- Cấp số nhân $\\sum r^n$ hội tụ $\\iff |r| < 1$, tổng $\\frac{a}{1-r}$; chuỗi p $\\sum 1/n^p$ hội tụ $\\iff p > 1$.
- $a_n \\to 0$ là **cần nhưng không đủ** (điều hòa phản ví dụ).

---

## 2. Tiêu chí hội tụ

💡 **Trực giác / Hình dung**: vì không cộng được vô hạn số bằng tay, ta cần "máy dò" báo hội tụ/phân kỳ mà **không cần tính tổng**. Tiêu chí tỉ số nhìn "mỗi số hạng nhỏ đi bao nhiêu lần so với số trước" (như cấp số nhân ngầm): co lại (< 1) → hội tụ; phình ra (> 1) → phân kỳ.

### 2.1. Điều kiện cần
$\\sum a_n$ hội tụ $\\implies a_n \\to 0$.

⚠ **Ngược không đúng**: $a_n \\to 0$ không kết luận được. (VD chuỗi điều hòa.)

### 2.2. So sánh
$0 \\le a_n \\le b_n$. Nếu $\\sum b_n$ hội tụ → $\\sum a_n$ hội tụ.

### 2.3. Tỉ số (D'Alembert)
Tính $L = \\lim \\left|\\dfrac{a_{n+1}}{a_n}\\right|$.
- $L < 1$: hội tụ.
- $L > 1$: phân kỳ.
- $L = 1$: chưa kết luận được.

**Ví dụ**: $\\sum \\frac{n!}{n^n}$. $\\dfrac{a_{n+1}}{a_n} = \\dfrac{(n+1)!\\cdot n^n}{(n+1)^{n+1}\\cdot n!} = \\dfrac{n^n}{(n+1)^n} = \\left(\\dfrac{n}{n+1}\\right)^n \\to \\dfrac{1}{e} < 1$. **Hội tụ**.

### 2.4. Cauchy (căn)
$L = \\lim \\sqrt[n]{|a_n|}$. $L < 1$: hội tụ; $L > 1$: phân kỳ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$L = 1$ thì sao?"* Tiêu chí tỉ số/căn **bất lực** (chưa kết luận). Phải dùng cách khác (so sánh, chuỗi p). Vd $\\sum 1/n$ và $\\sum 1/n^2$ đều cho $L = 1$ nhưng 1 phân kỳ, 1 hội tụ.
- *"Khi nào dùng tỉ số vs so sánh?"* Tỉ số rất hợp khi có **giai thừa hoặc lũy thừa** ($n!$, $r^n$) vì chúng rút gọn đẹp. So sánh hợp khi $a_n$ giống 1 chuỗi đã biết ($1/n$, $1/n^2$).

⚠ **Lỗi thường gặp — quên lấy trị tuyệt đối**. Tiêu chí tỉ số dùng $\\left|\\frac{a_{n+1}}{a_n}\\right|$, không phải $\\frac{a_{n+1}}{a_n}$. Với chuỗi đan dấu (vd $(-1)^n/n$), bỏ trị tuyệt đối sẽ ra số âm và kết luận sai.

🔁 **Dừng lại tự kiểm tra**

1. Dùng tiêu chí tỉ số cho $\\sum 1/n!$. Hội tụ?

<details><summary>Đáp án</summary>

$\\dfrac{a_{n+1}}{a_n} = \\dfrac{n!}{(n+1)!} = \\dfrac{1}{n+1} \\to 0 < 1$ khi $n \\to \\infty$ → **hội tụ** (thực ra tổng $= e - 1 \\approx 1.718$).

</details>

### 📝 Tóm tắt mục 2

- Điều kiện cần: $a_n \\to 0$ (không đủ).
- Tỉ số (D'Alembert): $L = \\lim\\left|\\frac{a_{n+1}}{a_n}\\right|$; $< 1$ hội tụ, $> 1$ phân kỳ, $= 1$ bất lực.
- Tỉ số/căn hợp với $n!$, $r^n$; so sánh hợp khi giống chuỗi đã biết. Luôn lấy trị tuyệt đối.

---

## 3. Chuỗi luỹ thừa

💡 **Trực giác / Hình dung**: chuỗi lũy thừa = "đa thức vô hạn" theo $x$. Khác chuỗi số (cố định), nó hội tụ hay không **tùy giá trị $x$**. Vùng $x$ làm nó hội tụ là 1 khoảng đối xứng quanh 0 với "bán kính" $R$: gần 0 ($|x| < R$) thì các số hạng $x^n$ đủ nhỏ → hội tụ; xa quá ($|x| > R$) thì $x^n$ phình → phân kỳ. $R$ như "tầm với" của chuỗi.

$$\\sum a_n\\cdot x^n = a_0 + a_1\\cdot x + a_2\\cdot x^2 + \\dots$$

**Bán kính hội tụ $R$**: chuỗi hội tụ với $|x| < R$, phân kỳ với $|x| > R$.
- Tính: $\\frac{1}{R} = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right|$ (hoặc $\\lim \\sqrt[n]{|a_n|}$).

**4 ví dụ số đa dạng**:
- $\\sum x^n/n!$: $R = \\infty$ (hội tụ mọi $x$ — đây là $e^x$).
- $\\sum x^n$: $\\frac{1}{R} = \\lim|1/1| = 1 \\to R = 1$ (cấp số nhân, hội tụ $|x| < 1$).
- $\\sum x^n/n$: $\\frac{1}{R} = \\lim \\frac{n}{n+1} = 1 \\to R = \\mathbf{1}$.
- $\\sum n!\\cdot x^n$: $\\frac{1}{R} = \\lim \\frac{(n+1)!}{n!} = \\lim(n+1) = \\infty \\to R = \\mathbf{0}$ (chỉ hội tụ tại $x = 0$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại biên $|x| = R$ thì sao?"* Tiêu chí không kết luận — phải xét riêng từng đầu mút. Vd $\\sum x^n/n$: tại $x = -1$ hội tụ (đan dấu), tại $x = 1$ phân kỳ (điều hòa).
- *"$R = \\infty$ và $R = 0$ nghĩa là gì?"* $R = \\infty$: hội tụ với mọi $x$ (như $e^x$, $\\sin x$). $R = 0$: chỉ hội tụ đúng tại $x = 0$ (vô dụng để xấp xỉ).

⚠ **Lỗi thường gặp — nhầm $1/R$ với $R$**. Công thức cho **$1/R$** $= \\lim\\left|\\frac{a_{n+1}}{a_n}\\right|$, phải nghịch đảo để ra $R$. Phản ví dụ: $\\sum n!x^n$ cho $\\lim = \\infty = 1/R \\to R = 0$ (KHÔNG phải $R = \\infty$).

🔁 **Dừng lại tự kiểm tra**

1. Tìm bán kính hội tụ của $\\sum x^n/2^n$.

<details><summary>Đáp án</summary>

$a_n = 1/2^n$. $\\frac{1}{R} = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim \\frac{2^n}{2^{n+1}} = \\frac{1}{2} \\to R = \\mathbf{2}$ (hội tụ với $|x| < 2$).

</details>

### 📝 Tóm tắt mục 3

- Chuỗi lũy thừa = "đa thức vô hạn" theo $x$; hội tụ trong $|x| < R$.
- $\\frac{1}{R} = \\lim\\left|\\frac{a_{n+1}}{a_n}\\right|$ → nhớ **nghịch đảo** để ra $R$.
- $R = \\infty$ (mọi $x$), $R = 0$ (chỉ $x=0$); biên $|x|=R$ xét riêng.

---

## 4. Khai triển Taylor

🎯 **Phát biểu**: Hàm $f$ có đạo hàm vô hạn lần tại điểm $a$ có thể (đôi khi) viết:

$$\\begin{aligned}
f(x) &= f(a) + f'(a)(x-a) + \\frac{f''(a)(x-a)^2}{2!} + \\frac{f'''(a)(x-a)^3}{3!} + \\dots \\\\
&= \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x-a)^n
\\end{aligned}$$

⟶ **Xấp xỉ hàm phức tạp bằng đa thức**.

> 📐 **Định nghĩa đầy đủ — Khai triển Taylor**
>
> **(a) Là gì**: Cách viết 1 hàm "đẹp" $f(x)$ thành 1 **tổng đa thức vô hạn** quanh điểm $a$: $f(x) = \\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n$. Hệ số đa thức là các đạo hàm bậc $n$ của $f$ tại $a$, chia $n!$. Khai triển quanh $a=0$ gọi là Maclaurin.
>
> **(b) Vì sao cần**: Máy tính, máy bỏ túi không "biết" $\\sin x$, $e^x$ trực tiếp — chúng tính qua **vài số hạng đầu của Taylor**. Trong vật lý: xấp xỉ "tuyến tính" (giữ chỉ $x$), "bậc 2" (thêm $x^2$) đủ cho hầu hết tính toán gần điểm cân bằng (con lắc nhỏ → $\\sin\\theta \\approx \\theta$ → dao động điều hoà). Trong ML: Taylor bậc 2 cho phương pháp Newton-Raphson, quasi-Newton (BFGS), Hessian. Quan trọng nhất — Taylor cho cầu nối **giải tích ↔ đại số**: hàm bất kỳ → "đa thức vô hạn".
>
> **(c) Ví dụ số**: $e^x = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\frac{x^4}{24} + \\dots$. Tính $e^{0.5}$ với 4 số hạng: $1+0.5+0.125+0.0208 \\approx 1.6458$. Giá trị thật: $1.6487$ (sai $\\sim 0.0029$). $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$ $\\sin(0.1) \\approx 0.1 - 0.000167 = 0.0998334$. Thật: $0.0998334$ ✓. $\\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\dots$. $\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$ (chỉ hội tụ $|x|\\le 1$). $\\frac{1}{1-x} = 1 + x + x^2 + \\dots$ (cấp số nhân). Euler: $e^{i\\pi} = 1 + i\\pi + \\frac{(i\\pi)^2}{2} + \\dots = \\cos\\pi + i\\sin\\pi = -1$.

**Tại $a = 0$** (Maclaurin):

$$f(x) = f(0) + f'(0)\\cdot x + \\frac{f''(0)\\cdot x^2}{2!} + \\dots$$

### Khai triển nổi tiếng

| $f(x)$ | Khai triển Maclaurin | Hội tụ |
|------|----------------------|--------|
| $e^x$ | $1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$ | $\\forall x$ |
| $\\sin x$ | $x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$ | $\\forall x$ |
| $\\cos x$ | $1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$ | $\\forall x$ |
| $\\ln(1+x)$ | $x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$ | $-1 < x \\le 1$ |
| $\\frac{1}{1-x}$ | $1 + x + x^2 + x^3 + \\dots$ | $\\lvert x\\rvert < 1$ |

💡 **Ứng dụng**: Máy tính tính $\\sin$, $\\cos$, $e^x$ bằng vài số hạng Taylor.

**Ví dụ**: tính $e^{0.5}$.
- $1 + 0.5 + 0.125 + 0.0208 + 0.0026 \\approx \\mathbf{1.6484}$.
- Giá trị thật: $1.6487$. Sai $0.0003$ với chỉ 5 số hạng.

**Verify $\\sin(0.1)$ bằng Taylor**: $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$ Tại $x = 0.1$: $0.1 - 0.001/6 + \\dots = 0.1 - 0.0001667 = \\mathbf{0.0998333}$. Máy tính: $\\sin(0.1) = 0.0998334$ ✓ (sai $< 10^{-6}$ với 2 số hạng — vì $x$ nhỏ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Lấy bao nhiêu số hạng là đủ?"* Tùy độ chính xác cần + $x$ gần $a$ tới đâu. $x$ càng gần $a$ (điểm khai triển), hội tụ càng nhanh. Vd $e^x$ tại $x = 0.5$ chỉ cần $\\sim 5$ số hạng; tại $x = 10$ cần rất nhiều.
- *"Hàm nào cũng khai triển Taylor được?"* Cần $f$ khả vi vô hạn lần tại $a$. Và chuỗi phải **hội tụ về đúng $f$** (hầu hết hàm quen thuộc thỏa, vài hàm bệnh lý không).
- *"Vì sao chia $n!$?"* Để đạo hàm bậc $n$ của vế phải tại $a$ khớp đúng $f^{(n)}(a)$. Đạo hàm $x^n$ $n$ lần ra $n!$ → chia $n!$ để triệt tiêu.

⚠ **Lỗi thường gặp — sai dấu xen kẽ trong sin/cos**. $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$ dấu **+ − + −**. Nếu cộng hết dấu +: $\\sin(0.1) \\approx 0.1 + 0.000167 = 0.100167$ (sai). Tương tự $\\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\dots$

🔁 **Dừng lại tự kiểm tra**

1. Viết 3 số hạng đầu của $e^x$ và tính $e^{0.1}$.
2. $\\cos x$ đến bậc 4 là gì?

<details><summary>Đáp án</summary>

1. $e^x \\approx 1 + x + \\frac{x^2}{2}$. Tại $0.1$: $1 + 0.1 + 0.005 = \\mathbf{1.105}$ (thật: $1.10517$ ✓).
2. $\\cos x \\approx 1 - \\frac{x^2}{2} + \\frac{x^4}{24}$.

</details>

### 📝 Tóm tắt mục 4

- Taylor: $f(x) = \\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n$ — xấp xỉ hàm bằng đa thức quanh $a$.
- Hệ số chia $n!$ để đạo hàm khớp; $x$ gần $a$ → hội tụ nhanh.
- Nhớ dấu xen kẽ của $\\sin$ ($x - \\frac{x^3}{6} + \\dots$) và $\\cos$ ($1 - \\frac{x^2}{2} + \\dots$).

---

## 5. Công thức Euler (lại)

💡 **Trực giác / Hình dung**: Euler là "phép màu" nối hàm mũ với lượng giác. Khai triển Taylor của $e^x$, $\\cos x$, $\\sin x$ là 3 chuỗi riêng. Nhưng khi cắm $x = i\\theta$ vào $e^x$, các lũy thừa của $i$ ($i^2 = -1$, $i^3 = -i$, $i^4 = 1\\dots$) **tự động tách** chuỗi thành phần thực ($= \\cos\\theta$) và phần ảo ($= \\sin\\theta$). 3 hàm hóa ra là 1 gia đình.

Từ Taylor:

$$\\begin{aligned}
e^{i\\theta} &= 1 + i\\theta + \\frac{(i\\theta)^2}{2!} + \\frac{(i\\theta)^3}{3!} + \\dots \\\\
&= \\left(1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\dots\\right) + i\\left(\\theta - \\frac{\\theta^3}{3!} + \\dots\\right) \\\\
&= \\cos\\theta + i\\sin\\theta
\\end{aligned}$$

Đã CM ở [T3 L06](../../03-Trig-Complex/lesson-06-complex-polar-euler/).

**Walk-through chứng minh từng bước** (gom theo thực/ảo):
- $(i\\theta)^0 = 1$, $(i\\theta)^1 = i\\theta$, $(i\\theta)^2 = -\\theta^2$, $(i\\theta)^3 = -i\\theta^3$, $(i\\theta)^4 = \\theta^4$, ...
- Phần không có $i$ (lũy thừa chẵn): $1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\dots = \\cos\\theta$.
- Phần có $i$ (lũy thừa lẻ): $i\\left(\\theta - \\frac{\\theta^3}{3!} + \\frac{\\theta^5}{5!} - \\dots\\right) = i\\sin\\theta$.
- Cộng lại: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$e^{i\\pi} = -1$ nghĩa là gì?"* Cắm $\\theta = \\pi$: $\\cos\\pi + i\\sin\\pi = -1 + 0 = \\mathbf{-1}$. Đẳng thức Euler $e^{i\\pi} + 1 = 0$ nối 5 hằng số đẹp nhất ($e$, $i$, $\\pi$, $1$, $0$).
- *"Vì sao tách được thực/ảo gọn vậy?"* Vì $i^2 = -1$ tạo dấu xen kẽ đúng khớp với dấu của chuỗi $\\cos$, $\\sin$. Không trùng hợp — đó là lý do sâu xa sin/cos "dao động".

⚠ **Lỗi thường gặp — quên $(i\\theta)^2 = -\\theta^2$**, viết thành $+\\theta^2$. Phản ví dụ: nếu $(i\\theta)^2 = +\\theta^2$ thì phần thực thành $1 + \\frac{\\theta^2}{2} + \\dots = \\cosh\\theta$ (sai), không ra $\\cos\\theta$.

🔁 **Dừng lại tự kiểm tra**

1. Tính $e^{i\\pi/2}$ bằng công thức Euler.

<details><summary>Đáp án</summary>

$e^{i\\pi/2} = \\cos(\\pi/2) + i\\sin(\\pi/2) = 0 + i\\cdot 1 = \\mathbf{i}$.

</details>

### 📝 Tóm tắt mục 5

- Euler: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, suy ra từ khai triển Taylor.
- Lũy thừa của $i$ ($i^2=-1\\dots$) tách chuỗi thành phần thực ($\\cos$) và ảo ($\\sin$).
- $e^{i\\pi} = -1$; nối hàm mũ với lượng giác.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính tổng cấp số nhân $\\sum_{n=0}^\\infty 2\\cdot(1/3)^n$.

**Bài 2**: Chuỗi $\\sum \\frac{n+1}{n^2+1}$ hội tụ hay phân kỳ?

**Bài 3**: Tính bán kính hội tụ của $\\sum x^n/n$.

**Bài 4**: Viết khai triển Taylor của $\\cos x$ đến bậc 6.

**Bài 5**: Dùng Taylor xấp xỉ $\\sqrt{1 + 0.1}$ đến bậc 2.

### Lời giải

**Bài 1**: $a = 2$, $r = 1/3$. Tổng $= \\dfrac{2}{1-1/3} = \\mathbf{3}$.

**Bài 2**: $\\frac{n+1}{n^2+1} \\approx \\frac{1}{n}$ khi $n$ lớn → so sánh với điều hòa → **phân kỳ**.

**Bài 3**: $a_n = 1/n$. $\\lim \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim \\frac{n}{n+1} = 1 \\to R = \\mathbf{1}$.

**Bài 4**: $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots = \\mathbf{1 - \\dfrac{x^2}{2} + \\dfrac{x^4}{24} - \\dfrac{x^6}{720}}$.

**Bài 5**: $(1+x)^{1/2} \\approx 1 + \\frac{x}{2} - \\frac{x^2}{8}$. Với $x = 0.1$: $1 + 0.05 - 0.00125 = \\mathbf{1.04875}$. Thật: $1.04881$.

---

## 7. Bài tiếp theo

[Lesson 07 — Phương trình vi phân](../lesson-07-differential-equations/).

## 📝 Tổng kết

1. **Chuỗi hội tụ**: tổng riêng có giới hạn. **Điều kiện cần**: $a_n \\to 0$ (không đủ).
2. **Tiêu chí tỉ số (D'Alembert)**: $\\lim \\left|\\frac{a_{n+1}}{a_n}\\right| < 1$.
3. **Cấp số nhân** $\\sum r^n$ hội tụ $\\iff |r| < 1$.
4. **Chuỗi p** $\\sum 1/n^p$ hội tụ $\\iff p > 1$.
5. **Taylor**: xấp xỉ hàm bằng đa thức. $e^x$, $\\sin x$, $\\cos x$, $\\ln(1+x)$ khai triển được.
`;
