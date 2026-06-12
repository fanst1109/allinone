// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-04-derivative-rules/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Quy tắc đạo hàm

## Mục tiêu

- Thuộc **bảng đạo hàm cơ bản** ($x^n$, $\\sin$, $\\cos$, $e^x$, $\\ln x$, ...).
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
| $x^n$ | $n\\cdot x^{n-1}$ | $n$ bất kỳ thực |
| $\\sqrt{x}$ | $\\dfrac{1}{2\\sqrt{x}}$ | $= \\frac{1}{2}\\cdot x^{-1/2}$ |
| $\\dfrac{1}{x}$ | $-\\dfrac{1}{x^2}$ | |
| $e^x$ | $e^x$ | đẹp nhất! |
| $a^x$ | $a^x \\cdot \\ln a$ | |
| $\\ln x$ | $\\dfrac{1}{x}$ | |
| $\\log_a x$ | $\\dfrac{1}{x\\cdot \\ln a}$ | |
| $\\sin x$ | $\\cos x$ | |
| $\\cos x$ | $-\\sin x$ | |
| $\\tan x$ | $\\dfrac{1}{\\cos^2 x} = \\sec^2 x$ | |
| $\\cot x$ | $-\\dfrac{1}{\\sin^2 x}$ | |
| $\\arcsin x$ | $\\dfrac{1}{\\sqrt{1-x^2}}$ | $-1<x<1$ |
| $\\arccos x$ | $-\\dfrac{1}{\\sqrt{1-x^2}}$ | |
| $\\arctan x$ | $\\dfrac{1}{1+x^2}$ | |

💡 **Phải thuộc**. Có thể chứng minh từ định nghĩa, nhưng dùng nhiều thì nhớ.

**4 ví dụ số đa dạng (dùng $(x^n)' = n\\cdot x^{n-1}$)**:
- $n$ nguyên dương: $(x^5)' = 5x^4$.
- $n$ âm: $(x^{-2})' = -2x^{-3} = -\\frac{2}{x^3}$ (khớp $(1/x^2)'$).
- $n$ phân số: $(x^{1/2})' = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$ (khớp $(\\sqrt{x})'$).
- $n = 1$: $(x^1)' = 1\\cdot x^0 = 1$.

### 1.1. Bảng này từ đâu ra? — Dẫn 3 công thức quan trọng nhất

Bảng trên không phải "trời cho" — mỗi dòng đều suy được từ **định nghĩa đạo hàm** $f'(x) = \\lim\\limits_{h\\to 0}\\dfrac{f(x+h)-f(x)}{h}$ (Lesson 03). Dưới đây dẫn 3 công thức xương sống từng bước, không bỏ bước.

#### (a) Dẫn $(x^n)' = n\\cdot x^{n-1}$ — power rule (cho $n$ nguyên dương)

Dùng **khai triển nhị thức Newton** $(x+h)^n = x^n + n\\,x^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots + h^n$:

$$\\begin{aligned}
(x^n)' &= \\lim_{h\\to 0}\\frac{(x+h)^n - x^n}{h} \\\\[4pt]
       &= \\lim_{h\\to 0}\\frac{\\big(x^n + n\\,x^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots + h^n\\big) - x^n}{h} \\\\[4pt]
       &= \\lim_{h\\to 0}\\frac{n\\,x^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots + h^n}{h} \\\\[4pt]
       &= \\lim_{h\\to 0}\\Big(n\\,x^{n-1} + \\underbrace{\\binom{n}{2}x^{n-2}h + \\cdots + h^{n-1}}_{\\text{mọi số hạng còn } h}\\Big) \\\\[4pt]
       &= n\\,x^{n-1}.
\\end{aligned}$$

Mọi số hạng còn nhân với $h$ đều $\\to 0$ khi $h\\to 0$, chỉ còn $n\\,x^{n-1}$. **Walk-through số** với $n=3$, $x=2$: công thức cho $3\\cdot 2^2 = 12$. Kiểm tra bằng định nghĩa với $h=0{,}001$: $\\dfrac{2{,}001^3 - 2^3}{0{,}001} = \\dfrac{8{,}012006 - 8}{0{,}001} = 12{,}006 \\approx 12$ ✓.

#### (b) Dẫn $(\\sin x)' = \\cos x$

Dùng công thức cộng $\\sin(x+h) = \\sin x\\cos h + \\cos x\\sin h$ và hai giới hạn đặc biệt (Lesson 01): $\\lim\\limits_{h\\to 0}\\dfrac{\\sin h}{h} = 1$ và $\\lim\\limits_{h\\to 0}\\dfrac{1-\\cos h}{h} = 0$.

$$\\begin{aligned}
(\\sin x)' &= \\lim_{h\\to 0}\\frac{\\sin(x+h) - \\sin x}{h} \\\\[4pt]
          &= \\lim_{h\\to 0}\\frac{\\sin x\\cos h + \\cos x\\sin h - \\sin x}{h} \\\\[4pt]
          &= \\lim_{h\\to 0}\\frac{\\sin x\\,(\\cos h - 1) + \\cos x\\sin h}{h} \\\\[4pt]
          &= \\sin x\\cdot\\underbrace{\\lim_{h\\to 0}\\frac{\\cos h - 1}{h}}_{=\\,0} + \\cos x\\cdot\\underbrace{\\lim_{h\\to 0}\\frac{\\sin h}{h}}_{=\\,1} \\\\[4pt]
          &= \\sin x\\cdot 0 + \\cos x\\cdot 1 = \\cos x.
\\end{aligned}$$

**Walk-through số** tại $x = 0$: công thức cho $\\cos 0 = 1$. Định nghĩa với $h = 0{,}001$: $\\dfrac{\\sin(0{,}001) - \\sin 0}{0{,}001} = \\dfrac{0{,}0009999998}{0{,}001} \\approx 1{,}000$ ✓. Tại $x = \\pi/2$: $\\cos(\\pi/2) = 0$ — đỉnh đồ thị sin, tiếp tuyến nằm ngang, slope $= 0$, hợp lý.

Tương tự (đối xứng), $(\\cos x)' = -\\sin x$: dùng $\\cos(x+h) = \\cos x\\cos h - \\sin x\\sin h$, ra $-\\sin x$ (dấu trừ đến từ $-\\sin x\\sin h$).

#### (c) Dẫn $(e^x)' = e^x$

Dùng định nghĩa $e$ qua giới hạn $\\lim\\limits_{h\\to 0}\\dfrac{e^h - 1}{h} = 1$ (đây chính là **lý do** $e$ được chọn làm cơ số tự nhiên — xem Algebra lũy thừa/log):

$$\\begin{aligned}
(e^x)' &= \\lim_{h\\to 0}\\frac{e^{x+h} - e^x}{h} = \\lim_{h\\to 0}\\frac{e^x\\cdot e^h - e^x}{h} \\\\[4pt]
       &= e^x\\cdot\\lim_{h\\to 0}\\frac{e^h - 1}{h} = e^x\\cdot 1 = e^x.
\\end{aligned}$$

Hằng số $e^x$ "lôi ra ngoài" giới hạn vì không phụ thuộc $h$. Phần còn lại đúng bằng 1 — đó là toàn bộ phép màu của $e$. **Walk-through số** tại $x = 0$: $(e^x)'|_0 = e^0 = 1$. Định nghĩa với $h=0{,}001$: $\\dfrac{e^{0{,}001}-1}{0{,}001} = \\dfrac{0{,}0010005}{0{,}001} \\approx 1{,}0005 \\approx 1$ ✓.

Với cơ số khác $a$: $a^h = e^{h\\ln a}$ nên $\\lim\\limits_{h\\to 0}\\dfrac{a^h-1}{h} = \\ln a$, dẫn ra $(a^x)' = a^x\\ln a$. Thay $a=e$, $\\ln e = 1$ → quay lại $(e^x)' = e^x$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $(e^x)' = e^x$ mà $(a^x)' = a^x\\cdot \\ln a$?"* Vì $e$ là cơ số "tự nhiên" mà $\\ln e = 1$. Tổng quát $(a^x)' = a^x\\cdot \\ln a$; thay $a = e$ thì $\\ln e = 1$ triệt tiêu → $(e^x)' = e^x$. Đây chính là lý do $e$ đặc biệt.
- *"$(\\ln x)' = \\frac{1}{x}$ chỉ đúng khi $x > 0$?"* $\\ln x$ chỉ xác định khi $x > 0$. Khi cần đạo hàm $\\ln|x|$ (cả $x < 0$), kết quả vẫn là $\\frac{1}{x}$ — chi tiết này quan trọng ở phần nguyên hàm $\\int \\frac{1}{x}\\,dx = \\ln|x| + C$ (L06).

⚠ **Lỗi thường gặp — $(x^n)' = n\\cdot x^{n-1}$ nhưng $(a^x)' \\neq x\\cdot a^{x-1}$**. Khi **biến nằm ở số mũ** (như $2^x$), KHÔNG dùng quy tắc lũy thừa. $(2^x)' = 2^x\\cdot \\ln 2$, không phải $x\\cdot 2^{x-1}$. Phân biệt "biến ở cơ số" ($x^n$) với "biến ở số mũ" ($a^x$).

🔁 **Dừng lại tự kiểm tra**

1. $(x^{-3})' = ?$
2. $(3^x)' = ?$ và $(x^3)' = ?$ — khác nhau thế nào?

<details><summary>Đáp án</summary>

1. $-3x^{-4} = -\\frac{3}{x^4}$.
2. $(3^x)' = 3^x\\cdot \\ln 3$ (biến ở mũ); $(x^3)' = 3x^2$ (biến ở cơ số). Hoàn toàn khác công thức.

</details>

### 📝 Tóm tắt mục 1

- Thuộc bảng: $(x^n)' = n\\cdot x^{n-1}$, $(e^x)' = e^x$, $(\\ln x)' = \\frac{1}{x}$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$.
- $(a^x)' = a^x\\cdot \\ln a$; thay $a = e$ → $(e^x)' = e^x$ (vì $\\ln e = 1$).
- Phân biệt biến ở **cơ số** ($x^n$) với biến ở **số mũ** ($a^x$) — hai công thức khác hẳn.

---

## 2. Năm quy tắc đại số

### 2.1. Hằng nhân
$$(c\\cdot f)' = c\\cdot f'$$
**Ví dụ**: $(5x^3)' = 5\\cdot (x^3)' = 5\\cdot 3x^2 = 15x^2$.

### 2.2. Tổng / hiệu
$$(f \\pm g)' = f' \\pm g'$$
**Ví dụ**: $(x^2 + \\sin x)' = 2x + \\cos x$.

### 2.3. Tích (Product rule)
$$(f\\cdot g)' = f'\\cdot g + f\\cdot g'$$

💡 **Trực giác — diện tích hình chữ nhật**: coi $f$ là chiều dài, $g$ là chiều rộng → tích $f\\cdot g$ là **diện tích** hình chữ nhật. Khi $x$ nhích thêm $\\Delta x$: chiều dài tăng $f'\\Delta x$, chiều rộng tăng $g'\\Delta x$. Diện tích thêm vào gồm: "viền dưới" $f'\\Delta x\\cdot g$, "viền cạnh" $f\\cdot g'\\Delta x$, và một **góc vuông tí hon** $f'\\Delta x\\cdot g'\\Delta x = f'g'(\\Delta x)^2$. Khi $\\Delta x\\to 0$, góc tí hon (bậc $(\\Delta x)^2$) biến mất nhanh hơn → còn lại đúng $f'g + fg'$.

\`\`\`
        f                f'·Δx
   ┌──────────┬──────────┐
   │          │  f·g'·Δx │  ← viền cạnh (g nở ra)
 g │   f·g    ├──────────┤  ─┐
   │          │ f'g'·(Δx)²│   │ góc tí hon → 0
   ├──────────┼──────────┘  ─┘
g'·Δx │ f'·Δx·g │              ← viền dưới (f dài ra)
   └──────────┘
\`\`\`

#### Chứng minh từ định nghĩa (từng bước, không bỏ bước)

Mẹo then chốt: **cộng rồi trừ** $f(x+h)\\,g(x)$ để tách tử số thành 2 cụm.

$$\\begin{aligned}
(fg)'(x) &= \\lim_{h\\to 0}\\frac{f(x+h)g(x+h) - f(x)g(x)}{h} \\\\[4pt]
&= \\lim_{h\\to 0}\\frac{f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x)}{h} \\\\[4pt]
&= \\lim_{h\\to 0}\\left[\\,f(x+h)\\cdot\\frac{g(x+h)-g(x)}{h} + g(x)\\cdot\\frac{f(x+h)-f(x)}{h}\\,\\right] \\\\[4pt]
&= \\underbrace{\\lim_{h\\to 0}f(x+h)}_{=\\,f(x)}\\cdot\\underbrace{\\lim_{h\\to 0}\\frac{g(x+h)-g(x)}{h}}_{=\\,g'(x)} + g(x)\\cdot\\underbrace{\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}}_{=\\,f'(x)} \\\\[4pt]
&= f(x)\\,g'(x) + g(x)\\,f'(x) = f'g + fg'.
\\end{aligned}$$

Bước $f(x+h)\\to f(x)$ dùng tính **liên tục** của $f$ (khả vi $\\Rightarrow$ liên tục). Không có bước nào "dễ thấy" — mọi giới hạn đều tách ra rõ ràng.

#### Walk-through 4 ví dụ — product rule

**Ví dụ 1**: $f = x^2\\cdot\\sin x$. Đặt $u = x^2$ ($u' = 2x$), $v = \\sin x$ ($v' = \\cos x$).
$$f' = u'v + uv' = 2x\\sin x + x^2\\cos x.$$

**Ví dụ 2**: $f = e^x\\cdot x^3$. $u = e^x$ ($u' = e^x$), $v = x^3$ ($v' = 3x^2$).
$$f' = e^x x^3 + e^x\\cdot 3x^2 = x^2 e^x(x + 3).$$

**Ví dụ 3**: $f = x\\cdot\\ln x$. $u = x$ ($u' = 1$), $v = \\ln x$ ($v' = 1/x$).
$$f' = 1\\cdot\\ln x + x\\cdot\\frac{1}{x} = \\ln x + 1.$$

**Ví dụ 4 — verify bằng cách khai triển**: $f = (2x+1)(3x-2)$.
- Product rule: $f' = 2(3x-2) + (2x+1)\\cdot 3 = 6x-4 + 6x+3 = 12x - 1$.
- Khai triển trước: $f = 6x^2 - x - 2 \\Rightarrow f' = 12x - 1$ ✓. Hai cách trùng → quy tắc đúng.

⚠ **Lỗi #1 của người mới — $(f\\cdot g)' \\neq f'\\cdot g'$**. Đây KHÔNG phải lũy thừa, đạo hàm không "phân phối qua phép nhân". Phản chứng số: lấy $f = x^2$, $g = x^3$, vậy $fg = x^5$.
- Đúng (power rule): $(x^5)' = 5x^4$.
- Sai ($f'g'$): $(x^2)'(x^3)' = 2x\\cdot 3x^2 = 6x^3 \\neq 5x^4$.
- Đúng (product rule): $2x\\cdot x^3 + x^2\\cdot 3x^2 = 2x^4 + 3x^4 = 5x^4$ ✓.

❓ **Câu hỏi tự nhiên**: *"Mở rộng cho 3 hàm thì sao?"* Nhóm $(fg)\\cdot h$ rồi áp product rule hai lần: $(fgh)' = f'gh + fg'h + fgh'$ — mỗi số hạng "đạo hàm đúng một thừa số, giữ nguyên hai cái còn lại". Vd $(x\\cdot e^x\\cdot\\sin x)' = e^x\\sin x + xe^x\\sin x + xe^x\\cos x$.

### 2.4. Thương (Quotient rule)
$$(f/g)' = \\frac{f'\\cdot g - f\\cdot g'}{g^2}$$

**Mẹo nhớ "low-d-high − high-d-low" / "square the low"**:
- Mẫu × đạo hàm tử − tử × đạo hàm mẫu, tất cả chia cho mẫu bình phương.

#### Chứng minh ngắn (từ product rule)

Đặt $q = f/g \\Rightarrow f = q\\cdot g$. Đạo hàm hai vế bằng product rule:
$$\\begin{aligned}
f' &= q'g + qg' = q'g + \\frac{f}{g}\\,g' \\\\[4pt]
q'g &= f' - \\frac{f\\,g'}{g} = \\frac{f'g - fg'}{g} \\\\[4pt]
q' &= \\frac{f'g - fg'}{g^2}.
\\end{aligned}$$

#### Walk-through 4 ví dụ — quotient rule

**Ví dụ 1**: $\\left(\\dfrac{\\sin x}{x}\\right)' = \\dfrac{\\cos x\\cdot x - \\sin x\\cdot 1}{x^2} = \\dfrac{x\\cos x - \\sin x}{x^2}$.

**Ví dụ 2**: $f = \\dfrac{x}{x+1}$. $u = x$ ($u'=1$), $v = x+1$ ($v'=1$).
$$f' = \\frac{1\\cdot(x+1) - x\\cdot 1}{(x+1)^2} = \\frac{1}{(x+1)^2}.$$

**Ví dụ 3 — dẫn $(\\tan x)' = \\sec^2 x$**: $\\tan x = \\dfrac{\\sin x}{\\cos x}$, $u = \\sin x$ ($u' = \\cos x$), $v = \\cos x$ ($v' = -\\sin x$).
$$(\\tan x)' = \\frac{\\cos x\\cos x - \\sin x(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x.$$
(Dùng identity $\\sin^2 + \\cos^2 = 1$ — đây là cách chứng minh kinh điển dòng $(\\tan x)'$ trong bảng mục 1.)

**Ví dụ 4 — verify bằng cách khác**: $f = \\dfrac{x^2+1}{x}$. Quotient rule: $\\dfrac{2x\\cdot x - (x^2+1)\\cdot 1}{x^2} = \\dfrac{x^2-1}{x^2}$. Verify bằng cách chia trước: $f = x + \\dfrac{1}{x} \\Rightarrow f' = 1 - \\dfrac{1}{x^2} = \\dfrac{x^2-1}{x^2}$ ✓.

⚠ **Lỗi thường gặp với thương**:
- **Quên bình phương mẫu** (viết $g$ thay vì $g^2$).
- **Đảo dấu/thứ tự tử số** (viết $fg' - f'g$ là sai dấu). Nhớ: đạo hàm **tử nhân mẫu trước**, rồi mới trừ.

### 2.5. Chuỗi (Chain rule) — QUAN TRỌNG NHẤT

$$(f(g(x)))' = f'(g(x)) \\cdot g'(x)$$

💡 **Trực giác**: Hàm trong hàm. Đạo hàm = (đạo hàm ngoài tại $g(x)$) $\\times$ (đạo hàm trong).

> 📐 **Định nghĩa đầy đủ — Chain rule**
>
> **(a) Là gì**: Khi $y = f(g(x))$ là hàm hợp (g trong f), thì $\\frac{dy}{dx} = \\frac{df}{du} \\cdot \\frac{du}{dx}$ với $u = g(x)$. Theo ký hiệu Leibniz: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ — như "nhân phân số" (chứ thực ra là 1 định lý).
>
> **(b) Vì sao cần**: Vì 90% hàm trong thực tế là hàm hợp — $\\sin(2x+1)$, $e^{-x^2}$, $\\ln(\\cos x)$, v.v. Không có chain rule = không thể tính đạo hàm chúng. Đặc biệt quan trọng trong **AI/ML**: backpropagation trong neural network = chain rule áp dụng nhiều lớp. ChatGPT, Stable Diffusion... đều chạy được nhờ chain rule. Đây là rule "đóng vai trò xương sống" trong tính toán symbolic.
>
> **(c) Ví dụ số**: $y = \\sin(x^2)$. Ngoài: $f(u) = \\sin u$, $f'(u) = \\cos u$. Trong: $u = x^2$, $u' = 2x$. $y' = \\cos(x^2)\\cdot 2x$. Tại $x = 1$: $y'(1) = \\cos(1)\\cdot 2 \\approx$ **1.0806**. $y = e^{3x}$: ngoài $e^u$, trong $3x$ → $y' = e^{3x}\\cdot 3 = 3e^{3x}$. $y = \\ln(\\cos x)$: $y' = \\frac{1}{\\cos x}\\cdot(-\\sin x) = -\\tan x$. $y = (2x+1)^5$: $y' = 5(2x+1)^4\\cdot 2 = 10(2x+1)^4$. Hợp 3 lớp $y = \\sin(\\ln(x^2))$: $y' = \\cos(\\ln(x^2)) \\cdot \\frac{1}{x^2} \\cdot 2x = \\frac{2\\cos(\\ln(x^2))}{x}$.

#### Chứng minh (sketch chặt chẽ) — vì sao nhân đạo hàm hai lớp

Đặt $u = g(x)$. Ý tưởng cốt lõi: viết tỉ sai phân của hàm hợp rồi **chèn $\\Delta u$** vào tử lẫn mẫu:
$$\\frac{\\Delta y}{\\Delta x} = \\frac{f(g(x+\\Delta x)) - f(g(x))}{\\Delta x} = \\underbrace{\\frac{f(u+\\Delta u) - f(u)}{\\Delta u}}_{\\to\\, f'(u)}\\cdot\\underbrace{\\frac{\\Delta u}{\\Delta x}}_{\\to\\, g'(x)},$$
với $\\Delta u = g(x+\\Delta x) - g(x)$. Khi $\\Delta x\\to 0$: vì $g$ liên tục, $\\Delta u\\to 0$, nên thừa số đầu $\\to f'(u) = f'(g(x))$ và thừa số sau $\\to g'(x)$. Nhân lại:
$$(f\\circ g)'(x) = f'(g(x))\\cdot g'(x).$$

> 📝 *Lưu ý kỹ thuật*: bước "chia cho $\\Delta u$" giả định $\\Delta u \\neq 0$ quanh điểm xét. Khi $\\Delta u = 0$ tại vô số điểm gần $x$ cần lý luận tinh hơn (định nghĩa hàm sai số $\\varepsilon(\\Delta u)$), nhưng kết quả cuối **không đổi**. Ở mức Calculus 1, sketch trên đủ nắm trực giác.

Theo ký hiệu **Leibniz** (dễ nhớ nhất): với $y = f(u)$, $u = g(x)$,
$$\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}.$$
Nhìn như "rút gọn $du$" của hai phân số — không phải tình cờ, đó chính là nội dung định lý.

#### Walk-through 4 ví dụ — chain rule (1 lớp)

**Ví dụ 1**: $y = \\sin(x^2)$. Ngoài $f(u)=\\sin u\\,(f'=\\cos u)$, trong $u = x^2\\,(u'=2x)$ → $y' = \\cos(x^2)\\cdot 2x$.

**Ví dụ 2**: $y = e^{3x+1}$. Ngoài $e^u$, trong $3x+1\\,(u'=3)$ → $y' = e^{3x+1}\\cdot 3 = 3e^{3x+1}$.

**Ví dụ 3**: $y = (2x+1)^5$. Ngoài $u^5\\,(5u^4)$, trong $2x+1\\,(u'=2)$ → $y' = 5(2x+1)^4\\cdot 2 = 10(2x+1)^4$.

**Ví dụ 4**: $y = \\ln(\\cos x)$. Ngoài $\\ln u\\,(1/u)$, trong $\\cos x\\,(u'=-\\sin x)$ → $y' = \\dfrac{1}{\\cos x}\\cdot(-\\sin x) = -\\tan x$.

#### Walk-through hợp NHIỀU lớp (≥2 ví dụ) — "bóc hành"

Quy tắc: **từ ngoài vào trong, mỗi lớp nhân thêm đạo hàm lớp đó**, đối số giữ nguyên cho tới khi tới lớp đó.

**Ví dụ A — 3 lớp**: $y = \\ln(\\sin(x^2))$. Bóc từng lớp:
$$\\begin{aligned}
y' &= \\underbrace{\\frac{1}{\\sin(x^2)}}_{\\text{đạo hàm }\\ln,\\ \\text{giữ }\\sin(x^2)} \\cdot \\underbrace{\\cos(x^2)}_{\\text{đạo hàm }\\sin,\\ \\text{giữ }x^2} \\cdot \\underbrace{2x}_{\\text{đạo hàm }x^2} \\\\[4pt]
   &= \\frac{2x\\cos(x^2)}{\\sin(x^2)} = 2x\\cot(x^2).
\\end{aligned}$$

**Ví dụ B — 3 lớp**: $y = e^{\\sin(3x)}$.
$$y' = \\underbrace{e^{\\sin(3x)}}_{(e^u)'}\\cdot\\underbrace{\\cos(3x)}_{(\\sin)'}\\cdot\\underbrace{3}_{(3x)'} = 3\\cos(3x)\\,e^{\\sin(3x)}.$$

**Ví dụ C — 4 lớp**: $y = \\sqrt{\\,\\ln(\\cos(2x))\\,}$. Đặt lớp ngoài $\\sqrt{u}\\,(\\tfrac{1}{2\\sqrt u})$:
$$y' = \\frac{1}{2\\sqrt{\\ln(\\cos 2x)}}\\cdot\\frac{1}{\\cos 2x}\\cdot(-\\sin 2x)\\cdot 2 = \\frac{-2\\tan(2x)}{2\\sqrt{\\ln(\\cos 2x)}} = \\frac{-\\tan(2x)}{\\sqrt{\\ln(\\cos 2x)}}.$$

#### 🔗 Liên hệ backpropagation (AI/ML)

Một neural network là một **hàm hợp khổng lồ**: $\\text{loss} = L(f_n(\\cdots f_2(f_1(x))\\cdots))$ với mỗi $f_i$ là một lớp (layer). Để cập nhật trọng số, ta cần $\\dfrac{\\partial L}{\\partial w}$ ở từng lớp — và đó **chính xác là chain rule áp dụng từ lớp ngoài (loss) vào trong**:
$$\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial f_n}\\cdot\\frac{\\partial f_n}{\\partial f_{n-1}}\\cdots\\frac{\\partial f_2}{\\partial f_1}\\cdot\\frac{\\partial f_1}{\\partial w_1}.$$
"Backprop" = bóc hành theo đúng thứ tự ngoài→trong như Ví dụ A/B/C, chỉ khác là làm cho hàng triệu biến cùng lúc. Ví dụ C ("4 lớp") là phiên bản 1 biến của một mạng 4 layer. Đây là lý do CLAUDE.md gọi chain rule là "xương sống" — không có nó, không train được model nào.

⟶ **Quy tắc**: từ ngoài vào trong, mỗi lớp nhân thêm đạo hàm.

**Verify product rule bằng số** — $(x^2\\cdot \\sin x)' = 2x\\cdot \\sin x + x^2\\cdot \\cos x$ tại $x = 1$:
- Công thức: $2\\cdot 1\\cdot \\sin 1 + 1\\cdot \\cos 1 = 2\\cdot 0.8415 + 0.5403 = 2.223$.
- Xấp xỉ định nghĩa: $\\frac{f(1.001) - f(1)}{0.001} \\approx \\frac{1.002001\\cdot \\sin 1.001 - \\sin 1}{0.001} \\approx 2.224$ ✓ (sai số do bước hữu hạn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tích KHÔNG phải $f'\\cdot g'$?"* Vì khi $f\\cdot g$ thay đổi, đóng góp đến từ **hai nguồn**: $f$ đổi (giữ $g$) cho $f'\\cdot g$, và $g$ đổi (giữ $f$) cho $f\\cdot g'$. Cộng lại: $f'g + fg'$. Phản ví dụ số: $(x\\cdot x)' = (x^2)' = 2x$, nhưng $f'\\cdot g' = 1\\cdot 1 = 1 \\neq 2x$.
- *"Khi nào dùng chain rule?"* Bất cứ khi nào có "hàm trong hàm" — $\\sin(2x)$, $e^{x^2}$, $(3x+1)^5$. Hỏi "có lớp ngoài và lớp trong không?". Nếu có → chain rule, nhân thêm đạo hàm lớp trong.
- *"Thứ tự áp dụng nhiều quy tắc?"* Từ ngoài vào: nhận diện cấu trúc ngoài cùng (tích? thương? hợp?) rồi áp quy tắc tương ứng, các phần con xử lý đệ quy.

⚠ **Lỗi thường gặp — quên đạo hàm lớp trong của chain rule**. Viết $(\\sin(2x))' = \\cos(2x)$ là **thiếu** — đúng phải $\\cos(2x)\\cdot 2 = 2\\cos(2x)$. Verify: tại $x=0$, định nghĩa cho slope $\\approx \\frac{\\sin(0.002)-0}{0.001} = 2$, khớp $2\\cos 0 = 2$, không phải $\\cos 0 = 1$.

🔁 **Dừng lại tự kiểm tra**

1. $(x^3\\cdot e^x)' = ?$
2. $(e^{x^2})' = ?$ (đừng quên lớp trong)

<details><summary>Đáp án</summary>

1. Tích: $3x^2\\cdot e^x + x^3\\cdot e^x = x^2\\cdot e^x\\cdot(3 + x)$.
2. Chain: lớp ngoài $e^u \\to e^u$, lớp trong $x^2 \\to 2x$ → $e^{x^2}\\cdot 2x = 2x\\cdot e^{x^2}$.

</details>

### 📝 Tóm tắt mục 2

- Hằng nhân $(cf)' = cf'$; tổng $(f\\pm g)' = f'\\pm g'$.
- Tích $(fg)' = f'g + fg'$ (KHÔNG $f'g'$); thương $(f/g)' = \\frac{f'g - fg'}{g^2}$.
- Chain $(f(g(x)))' = f'(g(x))\\cdot g'(x)$ — quan trọng nhất, **đừng quên đạo hàm lớp trong**.

---

## 3. Đạo hàm hàm ngược

Nếu $y = f(x)$ và $x = f^{-1}(y)$, thì:

$$(f^{-1})'(y) = \\frac{1}{f'(x)}$$

💡 **Hệ quả**: Đồ thị $y = f(x)$ và $y = f^{-1}(x)$ đối xứng qua $y = x$ → slope nghịch đảo nhau.

**Ví dụ**: Chứng minh $(\\arcsin x)' = \\dfrac{1}{\\sqrt{1-x^2}}$.
- $y = \\arcsin x \\iff x = \\sin y$.
- $(\\sin y)'$ theo $y = \\cos y$.
- → $(\\arcsin)' = \\dfrac{1}{\\cos y} = \\dfrac{1}{\\sqrt{1-\\sin^2 y}} = \\mathbf{\\dfrac{1}{\\sqrt{1-x^2}}}$ ✓.

💡 **Trực giác**: đồ thị $f$ và $f^{-1}$ đối xứng qua đường $y = x$ (lật chéo). Khi lật, đường dốc thoải ($f'$ nhỏ) thành dốc đứng ($(f^{-1})'$ lớn) và ngược lại → slope **nghịch đảo** nhau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$(f^{-1})'(y) = \\dfrac{1}{f'(x)}$ — $x$ ở đây là gì?"* Là điểm sao cho $f(x) = y$ (tức $x = f^{-1}(y)$). Phải tính đạo hàm $f'$ **tại điểm $x$ tương ứng**, không phải tại $y$. Vd $f(x)=x^2$ ($x>0$), $f^{-1}(y)=\\sqrt{y}$: tại $y=4$ thì $x=2$, $(f^{-1})'(4) = \\dfrac{1}{f'(2)} = \\dfrac{1}{2\\cdot 2} = \\dfrac{1}{4}$, khớp $(\\sqrt{y})'|_{y=4} = \\dfrac{1}{2\\sqrt{4}} = \\dfrac{1}{4}$ ✓.
- *"Cần điều kiện gì để công thức đúng?"* Cần $f'(x) \\neq 0$ (nếu $f'(x) = 0$, tiếp tuyến của $f$ nằm ngang → tiếp tuyến của $f^{-1}$ đứng → đạo hàm không tồn tại).

⚠ **Lỗi thường gặp — quên $f'$ phải tính tại $x$ chứ không tại $y$**. Viết $(f^{-1})'(y) = \\dfrac{1}{f'(y)}$ là sai. Phải tìm $x = f^{-1}(y)$ trước rồi mới thay vào $f'$.

🔁 **Dừng lại tự kiểm tra**

1. $(\\arctan x)'$ — dùng $y = \\arctan x \\iff x = \\tan y$ và $(\\tan y)' = \\dfrac{1}{\\cos^2 y}$.
2. $f(x) = x^3$, $f^{-1}(y) = \\sqrt[3]{y}$. Tính $(f^{-1})'(8)$ qua công thức hàm ngược.

<details><summary>Đáp án</summary>

1. $(\\arctan)' = \\dfrac{1}{(\\tan y)'} = \\cos^2 y = \\dfrac{1}{1+\\tan^2 y} = \\dfrac{1}{1+x^2}$ ✓.
2. $y=8 \\to x=2$. $f'(x)=3x^2$, $f'(2)=12$ → $(f^{-1})'(8) = \\dfrac{1}{12}$. Khớp $(\\sqrt[3]{y})'|_8 = \\dfrac{1}{3}\\cdot 8^{-2/3} = \\dfrac{1}{12}$ ✓.

</details>

### 📝 Tóm tắt mục 3

- $(f^{-1})'(y) = \\dfrac{1}{f'(x)}$ với $x = f^{-1}(y)$ (tính $f'$ tại $x$, KHÔNG tại $y$).
- Trực giác: đồ thị đối xứng qua $y = x$ → slope nghịch đảo.
- Điều kiện $f'(x) \\neq 0$; dùng để suy $(\\arcsin)', (\\arctan)'$...

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

- *"Đạo hàm của đa thức bậc $n$ đến lúc nào thì bằng 0?"* Sau $n+1$ lần. Vd $x^4$: $4x^3 \\to 12x^2 \\to 24x \\to 24 \\to 0$. Mỗi lần đạo hàm hạ bậc đi 1; bậc 0 (hằng) thì đạo hàm tiếp ra 0.
- *"$f''$ dùng để làm gì?"* Xác định lồi/lõm và phân loại cực trị (L05): $f'' > 0$ → lõm lên (cực tiểu), $f'' < 0$ → lõm xuống (cực đại). Trong vật lý là gia tốc.

⚠ **Lỗi thường gặp — tính $f''$ mà bỏ quy tắc tích/chuỗi ở bước hai**. $f'$ thường vẫn là tích/hợp, nên đạo hàm tiếp phải áp lại đầy đủ quy tắc. Vd $f = x\\cdot e^x$ → $f' = e^x(x+1)$ (tích) → $f'' = e^x(x+1) + e^x = e^x(x+2)$ — bước hai vẫn cần product rule, không "đạo hàm thẳng".

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^5$. Tính $f'''(x)$.
2. $f(x) = \\sin x$. $f''(x) = ?$ và $f^{(4)}(x) = ?$

<details><summary>Đáp án</summary>

1. $f' = 5x^4$, $f'' = 20x^3$, $f''' = 60x^2$.
2. $f' = \\cos x$, $f'' = -\\sin x$, $f''' = -\\cos x$, $f^{(4)} = \\sin x$ (chu kỳ 4).

</details>

### 📝 Tóm tắt mục 4

- $f''(x) = (f'(x))'$ — đạo hàm của đạo hàm; tiếp tục cho $f''', f^{(n)}$.
- Đa thức bậc $n$ → đạo hàm thứ $n+1$ bằng 0.
- Ý nghĩa: vị trí → vận tốc ($f'$) → gia tốc ($f''$); $\\sin x$ lặp chu kỳ 4.

---

## 5. Đạo hàm ẩn (Implicit differentiation)

Không phải hàm nào cũng cho dưới dạng tường minh $y = f(x)$. Đường tròn $x^2 + y^2 = 25$ định nghĩa $y$ **một cách ẩn** theo $x$ (mỗi $x$ ứng với 2 giá trị $y$). Vẫn tính được slope tiếp tuyến mà không cần giải $y$ ra.

💡 **Trực giác**: coi $y$ là "một hàm bí mật của $x$" — $y = y(x)$. Đạo hàm **cả hai vế** theo $x$; mỗi khi gặp $y$ thì áp **chain rule** (vì $y$ là hàm của $x$): $\\dfrac{d}{dx}[y^n] = n\\,y^{n-1}\\cdot y'$. Rồi giải $y'$ ra như giải phương trình.

#### Walk-through ví dụ — đường tròn $x^2 + y^2 = 25$

Đạo hàm hai vế theo $x$:
$$\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[25] \\;\\Longrightarrow\\; 2x + 2y\\cdot y' = 0 \\;\\Longrightarrow\\; y' = -\\frac{x}{y}.$$
Số hạng $2y\\cdot y'$ là chain rule: ngoài $u^2\\to 2u$, trong $y\\to y'$. **Walk-through số** tại điểm $(3,4)$ trên đường tròn: $y' = -\\dfrac{3}{4} = -0{,}75$. Kiểm tra: giải tường minh nhánh trên $y = \\sqrt{25 - x^2}$ → $y' = \\dfrac{-x}{\\sqrt{25-x^2}}$, tại $x=3$ cho $\\dfrac{-3}{\\sqrt{16}} = -\\dfrac{3}{4}$ ✓.

#### Walk-through ví dụ — $x^3 + y^3 = 6xy$ (lá Descartes)

$$3x^2 + 3y^2 y' = 6y + 6x\\,y' \\;\\Longrightarrow\\; y'(3y^2 - 6x) = 6y - 3x^2 \\;\\Longrightarrow\\; y' = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}.$$
Vế phải $6xy$ phải dùng product rule: $(6xy)' = 6y + 6x\\,y'$ — đừng quên $y'$ ở thừa số $y$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\\dfrac{d}{dx}[y^2] = 2y\\cdot y'$ chứ không phải $2y$?"* Vì $y$ là hàm của $x$, không phải hằng số. Đây đúng là chain rule: lớp ngoài $u^2$, lớp trong $y(x)$. Quên $y'$ là lỗi phổ biến nhất của đạo hàm ẩn.
- *"Khi nào bắt buộc dùng đạo hàm ẩn?"* Khi không giải nổi $y$ theo $x$ (như lá Descartes), hoặc khi giải ra rồi nhưng đạo hàm ẩn nhanh hơn. Cũng là công cụ để **dẫn** $(\\ln x)'$ và đạo hàm hàm ngược (mục 3).

#### Bonus — dẫn $(\\ln x)' = \\dfrac{1}{x}$ bằng đạo hàm ẩn

$y = \\ln x \\iff x = e^y$. Đạo hàm hai vế theo $x$ (vế phải dùng chain rule):
$$1 = e^y\\cdot y' = x\\cdot y' \\;\\Longrightarrow\\; y' = \\frac{1}{x}.$$
Gọn hơn dùng định nghĩa giới hạn — đây là lý do đạo hàm ẩn hữu ích.

⚠ **Lỗi thường gặp — quên nhân $y'$ khi đạo hàm số hạng chứa $y$**. Viết $\\dfrac{d}{dx}[y^3] = 3y^2$ là **thiếu** — đúng phải $3y^2\\,y'$. Triệu chứng: phương trình sau khi đạo hàm không còn $y'$ để giải. Nếu thấy "không có $y'$ nào để giải" → chắc chắn đã quên chain rule.

🔁 **Dừng lại tự kiểm tra**

1. Cho $x^2 + xy + y^2 = 7$. Tính $y'$.
2. Cho $\\sin(xy) = x$. Tính $y'$.

<details><summary>Đáp án</summary>

1. Đạo hàm: $2x + (y + x y') + 2y y' = 0$ (số hạng $xy$ dùng product rule). Giải: $y'(x + 2y) = -(2x + y) \\Rightarrow y' = -\\dfrac{2x + y}{x + 2y}$.
2. $\\cos(xy)\\cdot(y + x y') = 1 \\Rightarrow y'\\cdot x\\cos(xy) = 1 - y\\cos(xy) \\Rightarrow y' = \\dfrac{1 - y\\cos(xy)}{x\\cos(xy)}$.

</details>

### 📝 Tóm tắt mục 5

- Đạo hàm ẩn: coi $y = y(x)$, đạo hàm cả hai vế, mỗi số hạng chứa $y$ nhân thêm $y'$ (chain rule), rồi giải $y'$.
- $\\dfrac{d}{dx}[y^n] = n y^{n-1} y'$; số hạng $x\\cdot y$ cần cả product rule lẫn chain rule.
- Dùng khi không giải nổi $y$ tường minh, hoặc để dẫn $(\\ln x)'$, đạo hàm hàm ngược.

---

## 6. Bài tập đa quy tắc

### Bài tập

**Bài 1**: Tính đạo hàm của $f(x) = (x^2 + 1)\\cdot \\cos x$.

**Bài 2**: Tính $(e^{2x}\\cdot \\sin x)'$.

**Bài 3**: Tính đạo hàm của $f(x) = \\dfrac{x^2 + 1}{x - 3}$.

**Bài 4**: Tính $(\\sin(\\cos(x^2)))'$.

**Bài 5**: Tính $f''(x)$ khi $f(x) = e^{2x}\\cdot x$.

**Bài 6** (đạo hàm ẩn): Cho $x^2 y + y^3 = 10$. Tính $y'$ tại điểm $(3, 1)$.

**Bài 7** (chain nhiều lớp): Tính $\\big(\\cos(e^{2x})\\big)'$.

### Lời giải

**Bài 1**: Tích: $(2x)\\cdot \\cos x + (x^2+1)\\cdot (-\\sin x) = \\mathbf{2x\\cdot \\cos x - (x^2+1)\\cdot \\sin x}$.

**Bài 2**: Tích + chuỗi: $(e^{2x})' = 2e^{2x}$. $f' = 2e^{2x}\\cdot \\sin x + e^{2x}\\cdot \\cos x = \\mathbf{e^{2x}\\cdot (2\\sin x + \\cos x)}$.

**Bài 3**: Thương: $f' = \\dfrac{(2x)\\cdot (x-3) - (x^2+1)\\cdot 1}{(x-3)^2} = \\dfrac{2x^2 - 6x - x^2 - 1}{(x-3)^2} = \\mathbf{\\dfrac{x^2 - 6x - 1}{(x-3)^2}}$.

**Bài 4**: 3 lớp:  
- Lớp ngoài: $\\sin(u) \\to \\cos(u)$.  
- Lớp giữa: $\\cos(v) \\to -\\sin(v)$.  
- Lớp trong: $x^2 \\to 2x$.  
- Kết quả: $\\mathbf{\\cos(\\cos(x^2)) \\cdot (-\\sin(x^2)) \\cdot 2x = -2x\\cdot \\sin(x^2)\\cdot \\cos(\\cos(x^2))}$.

**Bài 5**: $f' = 2e^{2x}\\cdot x + e^{2x}\\cdot 1 = e^{2x}\\cdot (2x+1)$.  
- $f'' = (e^{2x}\\cdot (2x+1))' = 2e^{2x}\\cdot (2x+1) + e^{2x}\\cdot 2 = \\mathbf{e^{2x}\\cdot (4x + 4) = 4e^{2x}\\cdot (x+1)}$.

**Bài 6** (đạo hàm ẩn): Đạo hàm hai vế $x^2 y + y^3 = 10$ theo $x$. Số hạng $x^2 y$ dùng product rule:
$$\\underbrace{2xy + x^2 y'}_{(x^2 y)'} + \\underbrace{3y^2 y'}_{(y^3)'} = 0 \\;\\Longrightarrow\\; y'(x^2 + 3y^2) = -2xy \\;\\Longrightarrow\\; y' = \\frac{-2xy}{x^2 + 3y^2}.$$
Tại $(3, 1)$: $y' = \\dfrac{-2\\cdot 3\\cdot 1}{9 + 3} = \\dfrac{-6}{12} = \\mathbf{-\\dfrac{1}{2}}$. (Kiểm tra điểm nằm trên đường cong: $9\\cdot 1 + 1 = 10$ ✓.)

**Bài 7** (chain 2 lớp): $\\big(\\cos(e^{2x})\\big)'$. Bóc hành: ngoài $\\cos u\\,(-\\sin u)$, giữa $e^{2x}$, trong $2x\\,(2)$:
$$\\big(\\cos(e^{2x})\\big)' = -\\sin(e^{2x})\\cdot e^{2x}\\cdot 2 = \\mathbf{-2e^{2x}\\sin(e^{2x})}.$$

---

## 7. Bài tiếp theo

[Lesson 05 — Ứng dụng đạo hàm](../lesson-05-derivative-applications/).

## 📝 Tổng kết

1. **Bảng đạo hàm**: thuộc $x^n$, $e^x$, $\\ln$, $\\sin/\\cos/\\tan$, $\\arcsin/\\arctan$ — mỗi dòng dẫn được từ định nghĩa giới hạn (mục 1.1: power rule qua nhị thức Newton, $(\\sin)'=\\cos$ qua công thức cộng, $(e^x)'=e^x$ qua $\\lim\\frac{e^h-1}{h}=1$).
2. **5 quy tắc**: hằng nhân, tổng, **tích $f'g+fg'$** (chứng minh: cộng-trừ $f(x+h)g(x)$), **thương $(f'g-fg')/g^2$**, **chuỗi $f'(g)\\cdot g'$**.
3. **Chain rule** quan trọng nhất — từ ngoài vào trong, mỗi lớp nhân đạo hàm; hợp nhiều lớp = "bóc hành"; chính là **backpropagation** trong AI/ML.
4. **Hàm ngược**: $(f^{-1})'(y) = 1/f'(x)$ với $x = f^{-1}(y)$ (tính $f'$ tại $x$, không tại $y$).
5. **Đạo hàm bậc cao**: $f'' = $ vận tốc đổi (= gia tốc); đa thức bậc $n$ → đạo hàm thứ $n+1$ bằng 0.
6. **Đạo hàm ẩn**: coi $y = y(x)$, đạo hàm hai vế, số hạng chứa $y$ nhân thêm $y'$ (chain rule), rồi giải $y'$.
`;
