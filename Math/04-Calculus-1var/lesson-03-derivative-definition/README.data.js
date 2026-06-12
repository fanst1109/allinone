// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-03-derivative-definition/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đạo hàm: Định nghĩa & ý nghĩa hình học

## Mục tiêu

- Hiểu **đạo hàm** là gì qua 2 hình ảnh: **vận tốc tức thời** và **slope tiếp tuyến**.
- Định nghĩa hình thức bằng giới hạn.
- Tính đạo hàm bằng định nghĩa cho vài hàm cơ bản.
- Hiểu sự khác biệt: $f$ khả vi $\\implies f$ liên tục (nhưng ngược lại không đúng).

## Kiến thức tiền đề

- [Lesson 02 — Giới hạn hàm](../lesson-02-function-limits-continuity/).

---

## 1. Đạo hàm là gì — 2 hình ảnh trực giác

### 1.1. Hình ảnh "vận tốc tức thời" (động lực học)

Một vật chuyển động: vị trí $s(t)$ tại thời điểm $t$. Vận tốc trung bình từ $t$ đến $t+\\Delta t$:

$$v_{tb} = \\frac{s(t+\\Delta t) - s(t)}{\\Delta t}$$

⟶ Khi $\\Delta t \\to 0$, ta được **vận tốc tức thời** tại thời điểm $t$.

$$v(t) = \\lim_{\\Delta t \\to 0} \\frac{s(t+\\Delta t) - s(t)}{\\Delta t} = s'(t)$$

💡 **Trực giác — tốc kế xe hơi.** Bạn lái xe, quãng đường đi được là $s(t)$. Nếu cảnh sát hỏi *"ngay tại giây thứ 20 anh chạy bao nhiêu km/h?"*, bạn không thể trả lời bằng "trung bình cả chuyến" — phải là con số **tốc kế đang chỉ ngay khoảnh khắc đó**. Đó chính là đạo hàm $s'(20)$. Đạo hàm = số mà tốc kế hiển thị: tốc độ thay đổi **ngay bây giờ**, không phải trung bình.

Cụ thể, giả sử bảng quãng đường (vật rơi $s(t) = 5t^2$ mét):

| $t$ (giây) | $s(t)$ (mét) |
|-----------|--------------|
| 0  | 0    |
| 1  | 5    |
| 2  | 20   |
| 3  | 45   |
| 4  | 80   |

- Vận tốc **trung bình** từ giây 1 đến giây 3: $\\frac{45 - 5}{3 - 1} = \\frac{40}{2} = 20$ m/s.
- Nhưng "tức thời tại $t = 2$" là bao nhiêu? Thu hẹp khoảng quanh $t = 2$:

| Khoảng                | $\\dfrac{\\Delta s}{\\Delta t}$            | = (m/s) |
|-----------------------|-----------------------------------------|---------|
| $[2,\\,3]$             | $\\frac{45 - 20}{1}$                     | $25$    |
| $[2,\\,2.1]$           | $\\frac{5(2.1)^2 - 20}{0.1} = \\frac{2.05}{0.1}$ | $20.5$  |
| $[2,\\,2.01]$          | $\\frac{5(2.01)^2 - 20}{0.01}$           | $20.05$ |
| $[1.99,\\,2]$          | $\\frac{20 - 5(1.99)^2}{0.01}$           | $19.95$ |
| $[1.9,\\,2]$           | $\\frac{20 - 5(1.9)^2}{0.1}$             | $19.5$  |

Hai phía hội tụ về **20 m/s** ⟶ $v(2) = s'(2) = 20$. Kiểm bằng công thức: $s'(t) = 10t \\to s'(2) = 20$ ✓. Đây là cùng một "$\\Delta t \\to 0$" như slope tiếp tuyến — chỉ khác cách kể chuyện.

### 1.2. Hình ảnh "slope tiếp tuyến" (hình học)

Trên đồ thị $y = f(x)$:
- Chọn 2 điểm $A(x, f(x))$ và $B(x+h, f(x+h))$.
- Đường thẳng $AB$ có hệ số góc $\\dfrac{f(x+h) - f(x)}{h}$ (= cát tuyến).
- Khi $h \\to 0$, $B$ trượt về $A$ → cát tuyến trở thành **tiếp tuyến**.
- Hệ số góc tiếp tuyến = $f'(x)$.

#### Hình dung cát tuyến "trượt" thành tiếp tuyến (ASCII)

Đồ thị $f(x) = x^2$. Cố định $A = (1, 1)$, cho $B = (1+h, (1+h)^2)$ trượt dần về $A$ khi $h$ nhỏ lại. Mỗi cát tuyến $AB$ dốc hơn/thoải hơn tới khi "khít" vào đường cong tại $A$:

\`\`\`
  y
  |                              .B   (h lớn: cát tuyến CẮT rõ 2 điểm,
  |                           . /          dốc dư so với đường cong tại A)
  |                       .   /
  |                   .     B'   (h nhỏ hơn: cát tuyến gần đường cong hơn)
  |               .       //
  |           .        B''       (h rất nhỏ: gần như CHẠM, 1 điểm)
  |        .         ///
  |     .        A*========== tiếp tuyến (h → 0): slope = f'(1) = 2
  |   .       ///
  |  .     ///
  | .   ///
  |._///________________________ x
       1
\`\`\`

Mấu chốt: cát tuyến luôn cắt 2 điểm $A, B$; khi $B \\to A$ nó **xoay quanh** $A$ và hội tụ về một đường duy nhất — **tiếp tuyến**. Slope của nó = $f'(1)$.

#### Bảng slope hội tụ (walk-through bằng số thật)

Vẫn $f(x) = x^2$ tại $A = (1, 1)$. Slope cát tuyến $= \\dfrac{f(1+h) - f(1)}{h} = \\dfrac{(1+h)^2 - 1}{h}$. Tính cho $h$ nhỏ dần từ cả 2 phía:

| $h$       | $f(1+h)$    | slope cát tuyến $= \\dfrac{f(1+h)-1}{h}$ |
|-----------|-------------|-----------------------------------------|
| $+1$      | $4$         | $3$                                     |
| $+0.5$    | $2.25$      | $2.5$                                   |
| $+0.1$    | $1.21$      | $2.1$                                   |
| $+0.01$   | $1.0201$    | $2.01$                                  |
| $+0.001$  | $1.002001$  | $2.001$                                 |
| $-0.001$  | $0.998001$  | $1.999$                                 |
| $-0.01$   | $0.9801$    | $1.99$                                  |
| $-0.1$    | $0.81$      | $1.9$                                   |

Hai phía cùng **hội tụ về $2$** ⟶ slope tiếp tuyến tại $x=1$ là $2$, tức $f'(1) = 2$. Khớp công thức $(x^2)' = 2x \\to 2\\cdot 1 = 2$ ✓. Để ý: với $h>0$ slope luôn $>2$ (cát tuyến hơi dốc dư), với $h<0$ slope luôn $<2$ — tiếp tuyến nằm "ở giữa".

💡 **Cả 2 hình ảnh dẫn đến cùng 1 định nghĩa**: đạo hàm.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không lấy $\\Delta t = 0$ luôn cho gọn?"* Vì $\\Delta t = 0$ cho $\\frac{0}{0}$ vô nghĩa (không có khoảng để chia quãng đường). Mẹo của giải tích: cho $\\Delta t$ **tiến tới** 0 chứ không **bằng** 0 — tỉ số xấp xỉ ngày càng tốt và hội tụ về một số duy nhất.
- *"Vận tốc tức thời với slope tiếp tuyến có thật sự là một thứ?"* Đúng. Nếu vẽ đồ thị vị trí $s(t)$, độ dốc của tiếp tuyến tại thời điểm $t$ chính là vận tốc tức thời tại $t$. Cùng một phép tính $\\lim \\frac{\\Delta s}{\\Delta t}$, chỉ khác cách diễn giải (hình học vs vật lý).

⚠ **Lỗi thường gặp — nhầm vận tốc trung bình với tức thời**. $v_{tb} = \\frac{\\Delta s}{\\Delta t}$ là trung bình trên cả khoảng; vận tốc tức thời là giới hạn khi $\\Delta t \\to 0$. Vd $s(t) = t^2$: từ $t=2$ đến $t=3$, $v_{tb} = \\frac{9-4}{1} = 5$, nhưng vận tốc tức thời tại $t=2$ là $s'(2) = 4$ — khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. $s(t) = t^2$. Vận tốc trung bình từ $t = 1$ đến $t = 1.1$ là bao nhiêu? Đoán vận tốc tức thời tại $t = 1$.
2. Cát tuyến qua hai điểm trên đồ thị trở thành gì khi hai điểm trùng nhau?

<details><summary>Đáp án</summary>

1. $v_{tb} = \\frac{1.21 - 1}{0.1} = \\frac{0.21}{0.1} = 2.1$. Khi $\\Delta t \\to 0$ → tiến tới $2$ = vận tốc tức thời tại $t=1$ ($s'(1) = 2$).
2. Trở thành **tiếp tuyến** tại điểm đó; slope cát tuyến → slope tiếp tuyến = đạo hàm.

</details>

### 📝 Tóm tắt mục 1

- Đạo hàm = giới hạn của tỉ số biến thiên $\\frac{\\Delta f}{\\Delta x}$ khi $\\Delta x \\to 0$.
- Hai cách hiểu cùng một thứ: **vận tốc tức thời** (vật lý) và **slope tiếp tuyến** (hình học).
- Cho biến tiến 0 (không bằng 0) để né $\\frac{0}{0}$ và thu được một số duy nhất.

---

## 2. Định nghĩa hình thức

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

Cách viết khác (kế Leibniz):

$$\\frac{df}{dx} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$$

**Ý nghĩa hình học**: $f'(a)$ = slope tiếp tuyến với đồ thị $y = f(x)$ tại điểm $(a, f(a))$.

**Phương trình tiếp tuyến tại $(a, f(a))$**:

$$y = f(a) + f'(a)\\cdot(x - a)$$

**Walk-through PT tiếp tuyến — $f(x) = x^2$ tại $a = 3$ (từng bước):**

1. Điểm tiếp xúc: $f(3) = 9 \\to (3, 9)$.
2. Slope: $f'(x) = 2x \\to f'(3) = 6$.
3. Thay vào công thức điểm–slope: $y = 9 + 6(x - 3) = 6x - 18 + 9 = 6x - 9$.
4. **Kiểm**: tại $x = 3$, $y = 6\\cdot3 - 9 = 9$ ✓ (đường thẳng chạm đồ thị tại $(3,9)$). Slope đường thẳng $= 6 = f'(3)$ ✓.

Thêm 3 ví dụ nhanh (verify công thức):

| Hàm        | $a$ | $f(a)$ | $f'(a)$ | PT tiếp tuyến $y = f(a)+f'(a)(x-a)$ |
|------------|-----|--------|---------|-------------------------------------|
| $x^2$      | $-1$| $1$    | $-2$    | $y = 1 - 2(x+1) = -2x - 1$           |
| $\\sqrt{x}$ | $4$ | $2$    | $\\tfrac14$ | $y = 2 + \\tfrac14(x - 4) = \\tfrac14 x + 1$ |
| $1/x$      | $2$ | $0.5$  | $-0.25$ | $y = 0.5 - 0.25(x - 2) = -0.25x + 1$ |

> 📐 **Định nghĩa đầy đủ — Đạo hàm $f'(x)$**
>
> **(a) Là gì**: Giới hạn của tỉ số "biến thiên hàm/biến thiên biến" khi biến biến thiên → 0. Đo "tốc độ tức thời $f$ thay đổi khi $x$ thay đổi" tại đúng 1 điểm. Hình học = slope tiếp tuyến. Vật lý = vận tốc tức thời (nếu $x$ = thời gian, $f$ = vị trí).
>
> **(b) Vì sao cần**: Trước Newton/Leibniz (~1670), không có cách nói chính xác "vận tốc tại 1 thời điểm" (cần khoảng thời gian $\\Delta t$ để chia khoảng cách, nhưng $\\Delta t = 0$ thì chia 0 vô nghĩa). Giới hạn $\\lim_{h \\to 0}$ giải quyết — cho ra 1 số duy nhất khi $h$ tiến 0 đúng cách. Đạo hàm trở thành công cụ trung tâm: tối ưu hoá ($f' = 0$ tại cực trị), mô hình hoá (ODE), xấp xỉ (Taylor), ML (gradient descent).
>
> **(c) Ví dụ số**: $f(x) = x^2$, tại $x = 3$. Tỉ số $= \\frac{(3+h)^2 - 9}{h} = \\frac{6h+h^2}{h} = 6+h$. Cho $h \\to 0$ → $f'(3) = 6$. Verify công thức $(x^2)' = 2x \\to 2\\cdot 3 = 6$ ✓. $f(x) = x^3$ tại $x = 2$: $f'(2) = 3\\cdot 4 = 12$. $f(x) = \\frac{1}{x}$ tại $x = 2$: $f'(2) = -\\frac{1}{4} = -0.25$. Hàm hằng $f(x) = 5$: $f'(x) = 0\\ \\forall x$ (slope tiếp tuyến của đường ngang = 0). $f(x) = |x|$ tại $x = 0$: **không tồn tại** (slope trái $= -1$, slope phải $= +1$).

### 2.1. Đạo hàm = tốc độ biến thiên tức thời (rate of change)

> 💡 **Trực giác.** Bỏ "hình học" và "vật lý" sang một bên, đạo hàm trả lời đúng MỘT câu: *"ngay tại điểm này, khi $x$ tăng thêm một chút, $y$ thay đổi nhanh hay chậm, theo hướng nào?"*. $f'(a) = 3$ nghĩa là: quanh $x = a$, mỗi đơn vị $x$ tăng kéo $y$ tăng $\\approx 3$ đơn vị. $f'(a) = -0.5$: $y$ **giảm** $\\approx 0.5$ đơn vị/đơn vị $x$.

Dấu và độ lớn của $f'$ nói lên hành vi tức thời của hàm:

| $f'(a)$       | Ý nghĩa tại $a$                         | Hình học        |
|---------------|-----------------------------------------|-----------------|
| $f'(a) > 0$   | $f$ đang **tăng** (đi lên)               | tiếp tuyến dốc lên |
| $f'(a) < 0$   | $f$ đang **giảm** (đi xuống)             | tiếp tuyến dốc xuống |
| $f'(a) = 0$   | $f$ "phẳng" tại $a$ (nghi cực trị)       | tiếp tuyến nằm ngang |
| $|f'(a)|$ lớn | $f$ thay đổi **nhanh** (đồ thị dốc đứng) | tiếp tuyến gần đứng |
| $|f'(a)|$ nhỏ | $f$ thay đổi **chậm** (đồ thị thoải)     | tiếp tuyến gần ngang |

**Ví dụ đa dạng (4 ngữ cảnh, cùng một khái niệm):**

1. **Vật lý**: $s(t)$ vị trí → $s'(t)$ = vận tốc; $s''(t)$ = gia tốc.
2. **Kinh tế**: $C(q)$ chi phí sản xuất $q$ món → $C'(q)$ = *chi phí biên* (marginal cost), tiền tốn thêm để làm món thứ $q{+}1$.
3. **Sinh học**: $P(t)$ dân số → $P'(t)$ = tốc độ tăng dân tức thời (cá thể/năm).
4. **ML / tối ưu**: $L(w)$ hàm mất mát theo trọng số $w$ → $L'(w)$ cho biết chỉnh $w$ tăng hay giảm để $L$ giảm (nền tảng gradient descent — học kỹ sau).

🔁 **Dừng lại tự kiểm tra**

1. $f'(5) = 0$ và $f'(4) > 0$, $f'(6) < 0$. Tại $x = 5$ hàm đang làm gì?
2. Chi phí $C(q) = q^2$ (nghìn đồng). Chi phí biên tại $q = 10$ là bao nhiêu (dùng $C'(q) = 2q$)?

<details><summary>Đáp án</summary>

1. Tăng trước $5$, giảm sau $5$, phẳng tại $5$ → $x=5$ là **điểm cực đại** (đỉnh).
2. $C'(10) = 2\\cdot 10 = 20$ nghìn đồng — làm món thứ 11 tốn thêm $\\approx 20$ nghìn.

</details>

❓ **Câu hỏi tự nhiên của người đọc**

- *"$f'(x)$ là một số hay một hàm?"* Cả hai, tùy ngữ cảnh. $f'(a)$ (thay số cụ thể) là **một số** (slope tại điểm $a$). $f'(x)$ (để nguyên biến) là một **hàm** cho slope tại mọi điểm. Vd $(x^2)' = 2x$ là hàm; $f'(3) = 6$ là số.
- *"Tại sao công thức tiếp tuyến là $y = f(a) + f'(a)(x-a)$?"* Đây là đường thẳng qua điểm $(a, f(a))$ với hệ số góc $f'(a)$. Dạng "điểm–slope" của đường thẳng $y - y_0 = m(x - x_0)$, với $m = f'(a)$.

⚠ **Lỗi thường gặp — quên rằng $f'(a)$ có thể không tồn tại**. Đạo hàm là một giới hạn; giới hạn này có thể không tồn tại (góc nhọn như $|x|$ tại 0, hoặc tiếp tuyến đứng như $\\sqrt[3]{x}$ tại 0). Không phải hàm nào cũng khả vi tại mọi điểm.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$. Viết phương trình tiếp tuyến tại $x = 1$.
2. $f'(2) = 12$ cho hàm $x^3$ — nghĩa hình học của số $12$ này là gì?

<details><summary>Đáp án</summary>

1. $f(1) = 1$, $f'(1) = 2$ → $y = 1 + 2(x-1) = 2x - 1$.
2. Slope của tiếp tuyến với đồ thị $y = x^3$ tại điểm $(2, 8)$ bằng $12$ (đồ thị dốc đứng tại đó).

</details>

### 📝 Tóm tắt mục 2

- $f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$ — slope tiếp tuyến = vận tốc tức thời.
- Tiếp tuyến tại $(a, f(a))$: $y = f(a) + f'(a)(x - a)$.
- $f'(a)$ là **số** (slope tại 1 điểm); $f'(x)$ là **hàm**; có thể không tồn tại tại vài điểm.

---

## 3. Tính đạo hàm bằng định nghĩa

### 3.1. $f(x) = x^2$ (ví dụ kinh điển)

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{x^2 + 2xh + h^2 - x^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{2xh + h^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} (2x + h) = 2x
\\end{aligned}$$

⟶ $(x^2)' = 2x$.

### 3.2. $f(x) = \\dfrac{1}{x}$

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h}
= \\lim_{h \\to 0} \\frac{\\frac{x - (x+h)}{x(x+h)}}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{-h}{h\\,x(x+h)}
= \\lim_{h \\to 0} \\frac{-1}{x(x+h)} = -\\frac{1}{x^2}
\\end{aligned}$$

⟶ $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.

### 3.3. $f(x) = \\sqrt{x}$

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\sqrt{x+h} - \\sqrt{x}}{h}
= \\lim_{h \\to 0} \\frac{(\\sqrt{x+h} - \\sqrt{x})(\\sqrt{x+h} + \\sqrt{x})}{h(\\sqrt{x+h} + \\sqrt{x})} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{h}{h(\\sqrt{x+h} + \\sqrt{x})}
= \\lim_{h \\to 0} \\frac{1}{\\sqrt{x+h} + \\sqrt{x}} = \\frac{1}{2\\sqrt{x}}
\\end{aligned}$$

⟶ $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$.

### 3.4. $f(x) = \\sin x$

Dùng đồng nhất thức $\\sin(x+h) - \\sin x = 2\\cos\\!\\left(x+\\frac{h}{2}\\right)\\sin\\!\\left(\\frac{h}{2}\\right)$ và $\\lim \\dfrac{\\sin(h/2)}{h/2} = 1$:

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\sin(x+h) - \\sin x}{h}
= \\lim_{h \\to 0} \\frac{2\\cos\\!\\left(x+\\frac{h}{2}\\right)\\sin\\!\\left(\\frac{h}{2}\\right)}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\cos\\!\\left(x+\\frac{h}{2}\\right) \\cdot \\frac{\\sin(h/2)}{h/2}
= \\cos(x) \\cdot 1 = \\cos x
\\end{aligned}$$

⟶ $(\\sin x)' = \\cos x$.

### 3.5. $f(x) = x^3$ (khai triển lập phương, từng bước)

Đây là ví dụ thứ 4 tính **đầy đủ bằng định nghĩa**, dùng nhị thức $(x+h)^3 = x^3 + 3x^2 h + 3x h^2 + h^3$:

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{(x+h)^3 - x^3}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{x^3 + 3x^2 h + 3x h^2 + h^3 - x^3}{h} && \\text{(khai triển lập phương)} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{3x^2 h + 3x h^2 + h^3}{h} && \\text{(triệt tiêu } x^3\\text{)} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{h\\,(3x^2 + 3x h + h^2)}{h} && \\text{(đặt } h \\text{ làm thừa số chung)} \\\\[4pt]
&= \\lim_{h \\to 0} (3x^2 + 3x h + h^2) && \\text{(rút gọn } h \\text{ vì } h \\neq 0 \\text{ khi đang tiến)} \\\\[4pt]
&= 3x^2 && \\text{(thế } h = 0 \\text{ vào biểu thức đã liên tục)}
\\end{aligned}$$

⟶ $(x^3)' = 3x^2$.

### 3.6. Tổng hợp 4 đạo hàm tính bằng định nghĩa — verify bằng số

Mỗi công thức vừa chứng minh, ta kiểm lại bằng cát tuyến với $h = 0.001$ (slope số $\\approx$ đạo hàm thật):

| Hàm $f(x)$        | $f'(x)$ (đã CM)        | Điểm $x$ | $f'(x)$ lý thuyết | Slope số $\\frac{f(x+0.001)-f(x)}{0.001}$ |
|-------------------|-----------------------|----------|-------------------|------------------------------------------|
| $x^2$             | $2x$                  | $3$      | $6$               | $\\frac{9.006001 - 9}{0.001} = 6.001$     |
| $x^3$             | $3x^2$                | $2$      | $12$              | $\\frac{8.012006001 - 8}{0.001} = 12.006$ |
| $\\dfrac{1}{x}$    | $-\\dfrac{1}{x^2}$     | $2$      | $-0.25$           | $\\frac{0.49975\\ldots - 0.5}{0.001} = -0.24994$ |
| $\\sqrt{x}$        | $\\dfrac{1}{2\\sqrt{x}}$| $4$      | $0.25$            | $\\frac{2.0002499\\ldots - 2}{0.001} = 0.24998$ |

Mọi slope số xấp xỉ rất sát giá trị lý thuyết — bằng chứng "đo được" rằng các công thức đúng. Sai số nhỏ chính là vì $h = 0.001 \\neq 0$ (cát tuyến chưa hẳn là tiếp tuyến); cho $h$ nhỏ hơn nữa, sai số tiến về 0.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao luôn xuất hiện trò 'nhân liên hợp' hay 'rút gọn $h$'?"* Vì tỉ số $\\frac{f(x+h)-f(x)}{h}$ luôn là dạng $\\frac{0}{0}$ khi $h \\to 0$ (tử và mẫu cùng tiến 0). Mục tiêu mọi phép biến đổi là **triệt tiêu $h$ ở mẫu** trước khi cho $h \\to 0$, để không còn chia 0.
- *"Tính bằng định nghĩa cực dài — có phải làm vậy mãi không?"* Không. Ta tính một lần để **chứng minh** công thức, sau đó dùng bảng đạo hàm + quy tắc (L04) cho nhanh. Định nghĩa là nền móng, không phải công cụ hằng ngày.

⚠ **Lỗi thường gặp — cho $h = 0$ quá sớm**. Nếu thay $h = 0$ ngay vào $\\frac{(x+h)^2-x^2}{h}$ được $\\frac{0}{0}$ vô nghĩa. Phải khai triển và rút gọn $h$ ($= 2x + h$) **trước**, rồi mới cho $h \\to 0$.

🔁 **Dừng lại tự kiểm tra**

1. Dùng định nghĩa, chứng minh $(x^3)' = 3x^2$ (gợi ý $(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$).
2. Trong bước rút gọn của $(\\sqrt{x})'$, vì sao phải nhân liên hợp?

<details><summary>Đáp án</summary>

1. $\\frac{(x+h)^3-x^3}{h} = \\frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2 \\to 3x^2$ khi $h\\to 0$.
2. Để biến tử $\\sqrt{x+h}-\\sqrt{x}$ thành $(x+h)-x = h$, qua đó triệt tiêu $h$ ở mẫu (nếu không thì kẹt dạng $\\frac{0}{0}$).

</details>

### 📝 Tóm tắt mục 3

- Quy trình: lập tỉ số $\\frac{f(x+h)-f(x)}{h}$, biến đổi để **triệt tiêu $h$**, rồi cho $h \\to 0$.
- Kết quả nền tảng: $(x^2)' = 2x$, $\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2}$, $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$.
- Chỉ tính bằng định nghĩa để **chứng minh**; sau đó dùng bảng + quy tắc (L04).

---

## 4. Ký hiệu khác nhau cho đạo hàm

- **Newton**: $f'(x)$, $y'$.
- **Leibniz**: $\\dfrac{df}{dx}$, $\\dfrac{dy}{dx}$ — "tỉ số vi phân".
- **Lagrange cấp cao**: $f''(x)$, $f'''(x)$, $f^{(n)}(x)$.
- **Leibniz cấp cao**: $\\dfrac{d^2y}{dx^2}$, $\\dfrac{d^n y}{dx^n}$.

💡 **Khi nào dùng cái nào**:
- $f'(x)$: nhanh, gọn (thường dùng).
- $\\dfrac{dy}{dx}$: nhấn mạnh đạo hàm theo BIẾN nào (quan trọng khi nhiều biến).

#### Bảng đối chiếu ký hiệu — cùng một thứ, 4 cách viết

Với $y = f(x) = x^2$, bốn dòng sau **nói cùng một điều** ($\\frac{d y}{d x} = 2x$):

| Ký hiệu                | Đọc                          | Trường phái | Tiện khi nào                          |
|------------------------|------------------------------|-------------|----------------------------------------|
| $f'(x) = 2x$           | "f phẩy của x"               | Lagrange    | Viết tay nhanh, hàm một biến          |
| $\\dfrac{dy}{dx} = 2x$  | "đy trên đêx"                | Leibniz     | Chain rule, đổi biến, vật lý          |
| $\\dfrac{d}{dx}(x^2)=2x$| "đạo hàm theo x của $x^2$"   | Leibniz toán tử | Khi không muốn đặt tên hàm        |
| $D(x^2) = 2x$          | "D của $x^2$"                | Euler       | Ít gặp, hay trong lý thuyết toán tử   |

⚠ **Lỗi thường gặp — coi $\\dfrac{dy}{dx}$ là phép chia $dy \\div dx$**. Theo định nghĩa hình thức, $\\frac{dy}{dx}$ là **ký hiệu cho một giới hạn** $\\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}$, KHÔNG phải thương của hai số $dy$ và $dx$. Nó "cư xử như" phân số trong nhiều thao tác (chain rule $\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}$, đổi biến tích phân) — đó là lý do Leibniz chọn ký hiệu này — nhưng đừng tách rời $dy$, $dx$ ra như hai số độc lập rồi "rút gọn" bừa. Bản chất vẫn là một giới hạn duy nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\frac{dy}{dx}$ có phải phân số $dy$ chia $dx$ không?"* Theo nghĩa chặt, đây là **ký hiệu cho một giới hạn**, không phải phép chia thật. Nhưng nó "cư xử như" phân số trong nhiều trường hợp (đổi biến, chain rule) — đó là lý do Leibniz chọn ký hiệu này, rất tiện thao tác.
- *"$f''(x)$ nghĩa là gì?"* Đạo hàm của đạo hàm — tốc độ thay đổi của slope. Vd $s''(t)$ = gia tốc (tốc độ thay đổi của vận tốc). Sẽ dùng nhiều ở L04, L05.

🔁 **Dừng lại tự kiểm tra**

1. Viết đạo hàm cấp 2 của $y$ theo $x$ bằng cả ký hiệu Lagrange và Leibniz.
2. $\\frac{dy}{dt}$ khác $\\frac{dy}{dx}$ ở chỗ nào?

<details><summary>Đáp án</summary>

1. Lagrange: $y''$ (hay $f''(x)$); Leibniz: $\\frac{d^2y}{dx^2}$.
2. Khác **biến** lấy đạo hàm theo: một theo thời gian $t$, một theo $x$. Quan trọng khi $y$ phụ thuộc nhiều biến.

</details>

### 📝 Tóm tắt mục 4

- Lagrange $f'(x), f''(x)$: gọn, dùng phổ biến.
- Leibniz $\\frac{dy}{dx}, \\frac{d^2y}{dx^2}$: nhấn mạnh biến lấy đạo hàm; "cư xử như" phân số.
- Cùng một khái niệm, chọn ký hiệu theo ngữ cảnh.

---

## 5. Khả vi & Liên tục

**Định lý**: Nếu $f$ khả vi tại $a$ ($f'(a)$ tồn tại) thì $f$ liên tục tại $a$.

**Chiều ngược KHÔNG đúng**: $f$ liên tục không nhất thiết khả vi.

**Ví dụ**: $f(x) = |x|$ liên tục tại 0 nhưng KHÔNG khả vi.
- $\\lim$ trái: $f'(0^-) = -1$.
- $\\lim$ phải: $f'(0^+) = 1$.
- Khác nhau → $f'(0)$ không tồn tại (góc "nhọn" tại $x=0$).

#### Walk-through bằng số — vì sao $|x|$ không khả vi tại 0

Lập tỉ số $\\frac{|0+h| - |0|}{h} = \\frac{|h|}{h}$ và cho $h$ tiến 0 từ 2 phía:

| $h$       | $|h|$    | $\\dfrac{|h|}{h}$ |
|-----------|----------|------------------|
| $+0.1$    | $0.1$    | $+1$             |
| $+0.001$  | $0.001$  | $+1$             |
| $-0.001$  | $0.001$  | $-1$             |
| $-0.1$    | $0.1$    | $-1$             |

Bên phải tỉ số **luôn $+1$**, bên trái **luôn $-1$** — hai phía không gặp nhau ⟶ giới hạn không tồn tại ⟶ $f'(0)$ không tồn tại. Hình học: đồ thị $|x|$ có "góc nhọn" tại 0, không có một tiếp tuyến duy nhất.

#### 3 kiểu đạo hàm không tồn tại (dù hàm vẫn liên tục)

| Kiểu | Ví dụ | Lý do $f'$ không tồn tại |
|------|-------|---------------------------|
| **Góc nhọn** (corner) | $|x|$ tại 0 | Slope trái $-1 \\neq$ slope phải $+1$ |
| **Tiếp tuyến đứng** (vertical tangent) | $\\sqrt[3]{x}$ tại 0 | Slope $\\to +\\infty$, tiếp tuyến thẳng đứng (không có hệ số góc hữu hạn) |
| **Cusp / điểm nhọn dựng** | $x^{2/3}$ tại 0 | Slope trái $\\to -\\infty$, slope phải $\\to +\\infty$ |

(Gián đoạn cũng làm mất khả vi, nhưng đó là vì hàm KHÔNG liên tục — 3 kiểu trên là các hàm vẫn liên tục mà vẫn không khả vi.)

ASCII 3 kiểu (mỗi hình là đồ thị gần $x=0$):

\`\`\`
  góc nhọn |x|        tiếp tuyến đứng ∛x      cusp x^(2/3)
   \\      /                  |                  \\      /
    \\    /                   |                   \\    /
     \\  /                ____|____                \\  /
      \\/                     |                     \\/   <- 2 nhánh dựng đứng
   ---------              (slope→∞)              ---------
\`\`\`

💡 **Tóm tắt**:
- Khả vi $\\implies$ Liên tục.
- Liên tục $\\nRightarrow$ Khả vi (đồ thị có "góc nhọn", tiếp tuyến đứng, hoặc cusp).

⚠ **Cực đoan**: Hàm Weierstrass — liên tục mọi nơi nhưng không khả vi tại bất kỳ điểm nào!

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khả vi LẠI kéo theo liên tục?"* Chứng minh từng bước: ta cần $\\lim_{h \\to 0} [f(a+h) - f(a)] = 0$ (định nghĩa liên tục). Viết $f(a+h) - f(a) = \\frac{f(a+h)-f(a)}{h} \\cdot h$. Cho $h \\to 0$: thừa số đầu → $f'(a)$ (hữu hạn vì khả vi), thừa số sau $h \\to 0$. Tích $= f'(a) \\cdot 0 = 0$. Vậy $\\lim f(a+h) = f(a)$ → liên tục. (Mấu chốt: $f'(a)$ hữu hạn nên không "kéo" tích đi đâu được.)
- *"Có hàm liên tục mà không khả vi tại nhiều điểm không?"* Có. $|\\sin x|$ có góc nhọn tại mọi $x = k\\pi$ — liên tục khắp nơi, không khả vi tại vô số điểm. Cực đoan hơn là hàm Weierstrass (không khả vi tại **mọi** điểm).

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = |x - 3|$. Khả vi tại $x = 3$ không? Tại $x = 5$ không?
2. Một hàm khả vi tại $a$ thì có chắc liên tục tại $a$ không?

<details><summary>Đáp án</summary>

1. Tại $x=3$: **không** (góc nhọn, slope trái $-1$ ≠ phải $+1$). Tại $x=5$: **có** (xa góc nhọn, $f = x-3$, $f' = 1$).
2. Chắc chắn có — theo định lý "khả vi $\\implies$ liên tục" (chứng minh ở trên).

</details>

### 📝 Tóm tắt mục 5

- **Khả vi $\\implies$ liên tục** (chứng minh: $f(a+h)-f(a) = (\\text{tỉ số})\\cdot h \\to f'(a)\\cdot 0 = 0$).
- Chiều ngược **sai**: liên tục không kéo theo khả vi (góc nhọn $|x|$ tại 0).
- Cực đoan: hàm Weierstrass liên tục mọi nơi nhưng không khả vi ở đâu cả.

---

## 6. Đạo hàm 1 bên

Tương tự giới hạn 1 bên:

$$f'(a^-) = \\lim_{h \\to 0^-} \\frac{f(a+h) - f(a)}{h}, \\qquad
f'(a^+) = \\lim_{h \\to 0^+} \\frac{f(a+h) - f(a)}{h}$$

$f$ khả vi tại $a \\iff f'(a^-) = f'(a^+)$.

💡 **Trực giác**: giống giới hạn một bên cho hàm — slope nhìn từ bên trái và bên phải. Khả vi đòi hỏi hai slope này gặp nhau (đồ thị "trơn", không gấp khúc).

#### Walk-through đầy đủ — hàm chia khúc dán trơn vs dán gãy

Xét $f(x) = \\begin{cases} x^2 & x \\le 1 \\\\ 2x - 1 & x > 1 \\end{cases}$. Kiểm khả vi tại $x = 1$ theo **2 bước bắt buộc**:

**Bước 1 — liên tục tại 1?** Nhánh trái tại 1: $1^2 = 1$. Nhánh phải tại $1^+$: $2(1) - 1 = 1$. Bằng nhau ⟶ **liên tục** ✓ (qua được bước 1).

**Bước 2 — hai đạo hàm một bên?** Tính từng phía bằng định nghĩa:

$$\\begin{aligned}
f'(1^-) &= \\lim_{h \\to 0^-} \\frac{(1+h)^2 - 1}{h} = \\lim_{h \\to 0^-}\\frac{2h + h^2}{h} = \\lim_{h \\to 0^-}(2 + h) = 2 \\\\[4pt]
f'(1^+) &= \\lim_{h \\to 0^+} \\frac{[2(1+h) - 1] - 1}{h} = \\lim_{h \\to 0^+}\\frac{2h}{h} = 2
\\end{aligned}$$

$f'(1^-) = f'(1^+) = 2$ ⟶ **khả vi tại 1**, $f'(1) = 2$. Đồ thị "dán trơn" tại $x=1$.

Bây giờ đổi nhánh phải thành $3x - 2$ (vẫn liên tục: $3(1)-2 = 1$ ✓), nhưng:

$$f'(1^+) = \\lim_{h \\to 0^+}\\frac{[3(1+h) - 2] - 1}{h} = \\lim_{h \\to 0^+}\\frac{3h}{h} = 3 \\neq 2 = f'(1^-).$$

⟶ **không khả vi** tại 1 dù liên tục — đồ thị có "góc gãy" (đổi slope đột ngột $2 \\to 3$).

ASCII so sánh:

\`\`\`
   dán TRƠN (khả vi)            dán GÃY (chỉ liên tục)
        /                            /
       /  slope đổi mượt            /   <- slope nhảy 2 → 3 đột ngột
   ___/   2 → 2                 ___/        (góc gãy tại x=1)
      ●                            ●
      1                            1
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào cần tính đạo hàm một bên?"* Khi hàm chia khúc (đổi công thức qua $a$), có $|\\cdot|$, hoặc tại biên miền. Vd kiểm $|x|$ khả vi tại 0: $f'(0^-) = -1$, $f'(0^+) = +1$ → lệch → không khả vi.
- *"Đạo hàm một bên bằng nhau nhưng hàm gián đoạn — khả vi không?"* Không thể xảy ra: khả vi $\\implies$ liên tục, nên nếu gián đoạn thì đã không khả vi. Phải liên tục trước rồi mới xét hai slope.

⚠ **Lỗi thường gặp — chỉ so hai công thức đạo hàm mà quên kiểm liên tục**. Vd $f(x) = x^2$ nếu $x<1$, $f(x) = 2x$ nếu $x\\ge 1$: hai nhánh có $f'$ lần lượt $2x \\to 2$ và $2$, "bằng nhau", nhưng hàm **gián đoạn** tại 1 ($1 \\neq 2$) → KHÔNG khả vi. Phải kiểm liên tục tại $a$ trước.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$ nếu $x \\le 1$, $f(x) = 2x - 1$ nếu $x > 1$. Khả vi tại $x = 1$ không?
2. Đạo hàm một bên của $f(x) = |x|$ tại 0 là gì?

<details><summary>Đáp án</summary>

1. Liên tục: trái $1^2=1$, phải $2-1=1$ ✓. Slope: trái $2x|_{x=1}=2$, phải $2$. Bằng nhau → **khả vi**, $f'(1)=2$.
2. $f'(0^-) = -1$, $f'(0^+) = +1$ → lệch → không khả vi tại 0.

</details>

### 📝 Tóm tắt mục 6

- Đạo hàm một bên: $f'(a^-), f'(a^+)$ = slope nhìn từ trái/phải.
- Khả vi tại $a \\iff$ **liên tục tại $a$** và $f'(a^-) = f'(a^+)$.
- Luôn kiểm liên tục trước; hai slope bằng nhau chưa đủ nếu hàm gián đoạn.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính đạo hàm của $f(x) = 3x^2 + 1$ bằng định nghĩa.

**Bài 2**: Tính $f'(x)$ của $f(x) = \\cos x$ bằng định nghĩa.

**Bài 3**: Viết PT tiếp tuyến của $y = x^2$ tại điểm $(3, 9)$.

**Bài 4**: $f(x) = |x-2|$. Hỏi $f$ khả vi tại $x = 2$ không?

**Bài 5**: Vận tốc $s(t) = 5t^2$ (m, s). Tìm vận tốc tại $t = 3$.

**Bài 6**: Tính $\\left(\\dfrac{1}{x^2}\\right)'$ bằng định nghĩa.

**Bài 7**: Bằng định nghĩa, tính đạo hàm của $f(x) = x^2 + 3x$ tại $x = 2$, rồi viết phương trình tiếp tuyến tại điểm $(2, f(2))$.

**Bài 8**: $f(x) = \\sqrt[3]{x}$. Dùng bảng slope cát tuyến ($h = 0.001$) tại $x = 0$ để giải thích vì sao $f$ **không** khả vi tại 0.

**Bài 9**: $f(x) = x^2$ nếu $x \\le 1$; $f(x) = ax + b$ nếu $x > 1$. Tìm $a, b$ để $f$ vừa liên tục vừa khả vi tại $x = 1$.

### Lời giải

**Bài 1**: $f(x+h) - f(x) = 3(x+h)^2 + 1 - 3x^2 - 1 = 6xh + 3h^2$. → $f' = \\lim (6x + 3h) = 6x$.

**Bài 2**: $\\cos(x+h) - \\cos x = -2\\sin\\!\\left(x+\\frac{h}{2}\\right)\\sin\\!\\left(\\frac{h}{2}\\right)$. → $f' = \\lim \\left[-\\sin\\!\\left(x+\\frac{h}{2}\\right)\\cdot\\frac{\\sin(h/2)}{h/2}\\right] = -\\sin x$.

**Bài 3**: $f'(x) = 2x \\to f'(3) = 6$. PT: $y = 9 + 6(x-3) = 6x - 9$.

**Bài 4**: $x < 2$: $f = -(x-2)$, $f' = -1$. $x > 2$: $f = x-2$, $f' = 1$. Khác → **không khả vi** tại $x=2$.

**Bài 5**: $v(t) = s'(t) = 10t \\to v(3) = 30$ m/s.

**Bài 6**: Lập tỉ số và quy đồng tử:

$$\\begin{aligned}
f'(x) &= \\lim_{h \\to 0} \\frac{\\frac{1}{(x+h)^2} - \\frac{1}{x^2}}{h}
= \\lim_{h \\to 0} \\frac{1}{h}\\cdot\\frac{x^2 - (x+h)^2}{x^2(x+h)^2} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{1}{h}\\cdot\\frac{-2xh - h^2}{x^2(x+h)^2}
= \\lim_{h \\to 0} \\frac{-2x - h}{x^2(x+h)^2} = \\frac{-2x}{x^4} = -\\frac{2}{x^3}
\\end{aligned}$$

⟶ $\\left(\\dfrac{1}{x^2}\\right)' = -\\dfrac{2}{x^3}$. (Khớp công thức lũy thừa $(x^{-2})' = -2x^{-3}$ học ở L04.)

**Bài 7**: $f(2) = 4 + 6 = 10$. Tính $f'(2)$ bằng định nghĩa:

$$\\frac{(2+h)^2 + 3(2+h) - 10}{h} = \\frac{4 + 4h + h^2 + 6 + 3h - 10}{h} = \\frac{7h + h^2}{h} = 7 + h \\xrightarrow{h\\to0} 7.$$

Vậy $f'(2) = 7$. PT tiếp tuyến tại $(2, 10)$: $y = 10 + 7(x - 2) = 7x - 4$.

**Bài 8**: $\\frac{f(0+h) - f(0)}{h} = \\frac{\\sqrt[3]{h}}{h} = h^{1/3 - 1} = h^{-2/3} = \\dfrac{1}{h^{2/3}}$.

| $h$       | $\\dfrac{1}{h^{2/3}}$ (slope cát tuyến) |
|-----------|----------------------------------------|
| $0.1$     | $\\approx 4.64$                         |
| $0.001$   | $= 100$                                |
| $0.000001$| $= 10000$                              |

Slope **tăng vô hạn** khi $h \\to 0$ (không hội tụ về số hữu hạn) ⟶ tiếp tuyến thẳng đứng ⟶ $f'(0)$ không tồn tại, dù $\\sqrt[3]{x}$ liên tục tại 0. Đây là kiểu "tiếp tuyến đứng" ở mục 5.

**Bài 9**: *Liên tục tại 1*: nhánh trái $1^2 = 1$, nhánh phải $a\\cdot 1 + b = a + b$ → cần $a + b = 1$. *Khả vi tại 1*: slope trái $= (x^2)'|_{x=1} = 2$, slope phải $= (ax+b)'|_{x=1} = a$ → cần $a = 2$. Thế vào: $b = 1 - a = -1$. Vậy $a = 2, b = -1$ (nhánh phải là $y = 2x - 1$, đúng là tiếp tuyến của $x^2$ tại $x=1$ — trơn khít).

---

## 8. Bài tiếp theo

[Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

## 📝 Tổng kết

1. $f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$ — slope tiếp tuyến = vận tốc tức thời.
2. PT tiếp tuyến tại $(a, f(a))$: $y = f(a) + f'(a)\\cdot(x - a)$.
3. **Khả vi $\\implies$ Liên tục**, không ngược.
4. Hàm $|x|$ liên tục tại 0, **không khả vi** (góc nhọn).
5. Đạo hàm cơ bản: $(x^2)' = 2x$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$, $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.
`;
