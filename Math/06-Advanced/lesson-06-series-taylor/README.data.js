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

#### Walk-through tổng riêng bằng số cụ thể

Hội tụ = **dãy tổng riêng** $S_N$ tiến tới một số. Theo dõi $S_N$ của $\\sum (1/2)^n$ (từ $n=0$):

| $N$ | số hạng mới $a_N$ | $S_N = a_0 + \\dots + a_N$ | còn cách 2 |
|---|---|---|---|
| 0 | $1$ | $1$ | $1$ |
| 1 | $0.5$ | $1.5$ | $0.5$ |
| 2 | $0.25$ | $1.75$ | $0.25$ |
| 3 | $0.125$ | $1.875$ | $0.125$ |
| 4 | $0.0625$ | $1.9375$ | $0.0625$ |
| $\\infty$ | $\\to 0$ | $\\to \\mathbf{2}$ | $\\to 0$ |

Khoảng cách tới 2 **giảm một nửa mỗi bước** → $S_N \\to 2$. Đối chiếu công thức: $\\frac{a}{1-r} = \\frac{1}{1-1/2} = 2$ ✓.

Ngược lại, chuỗi điều hòa $\\sum 1/n$ có $S_N$ **tăng không chặn** (dù chậm): $S_1 = 1$, $S_2 = 1.5$, $S_4 \\approx 2.08$, $S_8 \\approx 2.72$, ... mỗi lần gấp đôi $N$ thì tổng tăng thêm $> 1/2$ → leo tới vô cùng → phân kỳ.

### Ví dụ kinh điển

**Cấp số nhân**: $\\sum_{n=0}^\\infty a\\cdot r^n = \\dfrac{a}{1-r}$ khi $|r| < 1$.
- $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots = \\dfrac{1}{1-1/2} = \\mathbf{2}$.
- $1 + 1 + 1 + \\dots =$ phân kỳ.

**Chuỗi điều hòa**: $\\sum \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots \\to$ **phân kỳ** (mặc dù $a_n \\to 0$).

**Chuỗi thu gọn (telescoping)**: $\\sum_{n=1}^\\infty \\dfrac{1}{n(n+1)}$. Tách $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$ → tổng riêng triệt tiêu dây chuyền:
$$S_N = \\left(1 - \\tfrac12\\right) + \\left(\\tfrac12 - \\tfrac13\\right) + \\dots + \\left(\\tfrac1N - \\tfrac1{N+1}\\right) = 1 - \\tfrac1{N+1} \\xrightarrow{N\\to\\infty} \\mathbf{1}.$$
Đây là trường hợp hiếm tính được **tổng đóng** trực tiếp từ $S_N$ (không cần công thức cấp số nhân).

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
$0 \\le a_n \\le b_n$. Nếu $\\sum b_n$ hội tụ → $\\sum a_n$ hội tụ. (Và ngược: nếu $\\sum a_n$ phân kỳ → $\\sum b_n$ phân kỳ — "đè dưới một chuỗi phân kỳ thì cũng phân kỳ".)

💡 **Trực giác**: nếu số hạng của bạn **nhỏ hơn** số hạng của một chuỗi đã biết hội tụ, tổng của bạn bị "kẹp dưới trần hữu hạn" → cũng hội tụ. Như chồng tiền của bạn luôn ít hơn người bên cạnh; nếu họ có tổng hữu hạn thì bạn cũng vậy.

**Walk-through 2 ví dụ**:
- $\\sum \\dfrac{1}{n^2 + 1}$: vì $\\frac{1}{n^2+1} < \\frac{1}{n^2}$ với mọi $n$, mà $\\sum \\frac{1}{n^2}$ hội tụ (chuỗi p, $p=2$) → chuỗi gốc **hội tụ**.
- $\\sum \\dfrac{1}{\\sqrt{n}}$: vì $\\frac{1}{\\sqrt{n}} \\ge \\frac{1}{n}$ với $n \\ge 1$, mà $\\sum \\frac{1}{n}$ phân kỳ → chuỗi gốc **phân kỳ** (đè trên một chuỗi phân kỳ).

### 2.3. Tỉ số (D'Alembert)
Tính $L = \\lim \\left|\\dfrac{a_{n+1}}{a_n}\\right|$.
- $L < 1$: hội tụ.
- $L > 1$: phân kỳ.
- $L = 1$: chưa kết luận được.

**Ví dụ**: $\\sum \\frac{n!}{n^n}$. $\\dfrac{a_{n+1}}{a_n} = \\dfrac{(n+1)!\\cdot n^n}{(n+1)^{n+1}\\cdot n!} = \\dfrac{n^n}{(n+1)^n} = \\left(\\dfrac{n}{n+1}\\right)^n \\to \\dfrac{1}{e} < 1$. **Hội tụ**.

#### Walk-through tiêu chí tỉ số — 4 ví dụ từng bước

Tiêu chí tỉ số mạnh nhất khi $a_n$ có **giai thừa** ($n!$) hoặc **lũy thừa** ($r^n$), vì khi lập tỉ số $\\frac{a_{n+1}}{a_n}$ chúng rút gọn rất gọn. Quy trình 3 bước: (1) viết $a_{n+1}$ bằng cách thay $n \\to n+1$; (2) lập tỉ số $\\left|\\frac{a_{n+1}}{a_n}\\right|$ và rút gọn; (3) lấy giới hạn $n \\to \\infty$ rồi so với 1.

**Ví dụ 1** — chuỗi $\\sum \\dfrac{1}{n!}$:
$$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{1/(n+1)!}{1/n!} = \\frac{n!}{(n+1)!} = \\frac{n!}{(n+1)\\cdot n!} = \\frac{1}{n+1} \\xrightarrow{n\\to\\infty} 0.$$
$L = 0 < 1$ → **hội tụ**. (Đây chính là $e - 1$ nếu bắt đầu từ $n=1$, hay $e$ nếu từ $n=0$.) Verify số hạng: $\\frac{1}{1!}=1$, $\\frac{1}{2!}=0.5$, $\\frac{1}{3!}\\approx 0.167$ — co lại rất nhanh.

**Ví dụ 2** — chuỗi $\\sum \\dfrac{2^n}{n!}$:
$$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{2^{n+1}/(n+1)!}{2^n/n!} = \\frac{2^{n+1}}{2^n}\\cdot\\frac{n!}{(n+1)!} = 2 \\cdot \\frac{1}{n+1} = \\frac{2}{n+1} \\xrightarrow{n\\to\\infty} 0.$$
$L = 0 < 1$ → **hội tụ** (giai thừa $n!$ "thắng" lũy thừa $2^n$). Tổng thực ra là $e^2 \\approx 7.389$.

**Ví dụ 3** — chuỗi $\\sum \\dfrac{3^n}{n^2}$:
$$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{3^{n+1}/(n+1)^2}{3^n/n^2} = 3\\cdot\\frac{n^2}{(n+1)^2} = 3\\left(\\frac{n}{n+1}\\right)^2 \\xrightarrow{n\\to\\infty} 3\\cdot 1 = 3.$$
$L = 3 > 1$ → **phân kỳ** (lũy thừa $3^n$ phình nhanh hơn $n^2$ co).

**Ví dụ 4** — chuỗi $\\sum \\dfrac{n}{2^n}$:
$$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{(n+1)/2^{n+1}}{n/2^n} = \\frac{n+1}{n}\\cdot\\frac{2^n}{2^{n+1}} = \\frac{n+1}{n}\\cdot\\frac{1}{2} \\xrightarrow{n\\to\\infty} 1\\cdot\\frac{1}{2} = \\frac{1}{2}.$$
$L = \\frac{1}{2} < 1$ → **hội tụ**. (Tổng $= 2$, dùng kỹ thuật đạo hàm cấp số nhân.)

> **Mẹo rút gọn giai thừa**: $\\frac{(n+1)!}{n!} = n+1$ và $\\frac{n!}{(n+1)!} = \\frac{1}{n+1}$. Đừng khai triển $n!$ ra số — chỉ cần "bóc 1 thừa số" là đủ.

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

#### Walk-through tìm bán kính hội tụ — 3 ví dụ từng bước

Quy trình: (1) đọc hệ số $a_n$ (số nhân với $x^n$); (2) tính $\\frac{1}{R} = \\lim\\left|\\frac{a_{n+1}}{a_n}\\right|$; (3) **nghịch đảo** để ra $R$. Bước (3) là chỗ hay quên nhất.

**Ví dụ 1** — $\\displaystyle\\sum \\frac{x^n}{3^n}$. Hệ số $a_n = \\dfrac{1}{3^n}$.
$$\\frac{1}{R} = \\lim\\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim \\frac{1/3^{n+1}}{1/3^n} = \\lim\\frac{3^n}{3^{n+1}} = \\frac{1}{3} \\;\\Rightarrow\\; R = \\mathbf{3}.$$
Hội tụ khi $|x| < 3$. (Đây là cấp số nhân ẩn với công bội $\\frac{x}{3}$, hội tụ khi $\\left|\\frac{x}{3}\\right| < 1 \\iff |x| < 3$ — khớp.)

**Ví dụ 2** — $\\displaystyle\\sum \\frac{x^n}{n\\cdot 2^n}$. Hệ số $a_n = \\dfrac{1}{n\\cdot 2^n}$.
$$\\frac{1}{R} = \\lim \\frac{1/[(n+1)2^{n+1}]}{1/[n\\cdot 2^n]} = \\lim \\frac{n\\cdot 2^n}{(n+1)2^{n+1}} = \\lim \\frac{n}{n+1}\\cdot\\frac{1}{2} = 1\\cdot\\frac{1}{2} = \\frac{1}{2} \\;\\Rightarrow\\; R = \\mathbf{2}.$$
Hội tụ khi $|x| < 2$. Thừa số $n$ trong mẫu **không đổi** $R$ (vì $\\frac{n}{n+1}\\to 1$) — chỉ $2^n$ quyết định.

**Ví dụ 3** — $\\displaystyle\\sum \\frac{(2x)^n}{n!} = \\sum \\frac{2^n}{n!}x^n$. Hệ số $a_n = \\dfrac{2^n}{n!}$.
$$\\frac{1}{R} = \\lim \\frac{2^{n+1}/(n+1)!}{2^n/n!} = \\lim 2\\cdot\\frac{1}{n+1} = 0 \\;\\Rightarrow\\; R = \\mathbf{\\infty}.$$
Hội tụ với **mọi** $x$ (giai thừa luôn thắng). Đây là $e^{2x}$.

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

💡 **Trực giác / Hình dung — "xấp xỉ hàm bằng đa thức quanh 1 điểm"**: hình dung bạn đứng tại điểm $x = a$ trên đồ thị của một hàm cong (vd $\\sin x$, $e^x$) và muốn "đoán" hàm chạy thế nào ở gần đó **mà không cần biết công thức gốc** — chỉ dùng những gì đo được **tại chính điểm $a$**: giá trị $f(a)$, độ dốc $f'(a)$, độ cong $f''(a)$, ...

- Bậc 0: dùng 1 số $f(a)$ → xấp xỉ bằng **đường nằm ngang** (hằng số). Chỉ đúng tại đúng điểm $a$.
- Bậc 1: thêm độ dốc $f'(a)$ → xấp xỉ bằng **tiếp tuyến**. Đúng quanh $a$ nếu hàm gần thẳng.
- Bậc 2: thêm độ cong $f''(a)$ → xấp xỉ bằng **parabol** ôm theo đường cong.
- Bậc cao hơn: thêm "độ cong của độ cong" ($f'''$,...) → đa thức **bám càng lâu càng sát**.

Mỗi đạo hàm bậc cao hơn là một "ống nhòm" sắc hơn để nhìn hành vi cục bộ. Taylor = "biết mọi đạo hàm tại 1 điểm thì tái dựng được cả hàm ở lân cận". Như họa sĩ chỉ cần biết tại 1 điểm: cao bao nhiêu, dốc thế nào, cong ra sao, ... để vẽ lại đường cong.

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

#### 4.1. Walk-through dẫn chuỗi Maclaurin từng bước

Chuỗi Maclaurin (Taylor tại $a = 0$) là $f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(0)}{n!}x^n$. Để dựng nó, ta **tính các đạo hàm liên tiếp tại $0$**, chia $n!$, rồi ghép lại. Dưới đây dẫn 3 chuỗi quen thuộc nhất.

**Dẫn $e^x$** — chìa khóa: đạo hàm của $e^x$ là chính nó.

| $n$ | $f^{(n)}(x)$ | $f^{(n)}(0)$ | hệ số $\\dfrac{f^{(n)}(0)}{n!}$ |
|---|---|---|---|
| 0 | $e^x$ | $1$ | $\\dfrac{1}{0!} = 1$ |
| 1 | $e^x$ | $1$ | $\\dfrac{1}{1!} = 1$ |
| 2 | $e^x$ | $1$ | $\\dfrac{1}{2!} = \\dfrac{1}{2}$ |
| 3 | $e^x$ | $1$ | $\\dfrac{1}{3!} = \\dfrac{1}{6}$ |
| 4 | $e^x$ | $1$ | $\\dfrac{1}{4!} = \\dfrac{1}{24}$ |

Ghép: $e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\dfrac{x^4}{24} + \\dots = \\displaystyle\\sum_{n=0}^\\infty \\frac{x^n}{n!}$. Mọi đạo hàm tại 0 đều bằng 1 → hệ số là $\\frac{1}{n!}$ thuần.

**Dẫn $\\sin x$** — đạo hàm chạy vòng tuần hoàn 4 bước: $\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin \\dots$

| $n$ | $f^{(n)}(x)$ | $f^{(n)}(0)$ | hệ số $\\dfrac{f^{(n)}(0)}{n!}$ |
|---|---|---|---|
| 0 | $\\sin x$ | $0$ | $0$ |
| 1 | $\\cos x$ | $1$ | $\\dfrac{1}{1!} = 1$ |
| 2 | $-\\sin x$ | $0$ | $0$ |
| 3 | $-\\cos x$ | $-1$ | $-\\dfrac{1}{3!} = -\\dfrac{1}{6}$ |
| 4 | $\\sin x$ | $0$ | $0$ |
| 5 | $\\cos x$ | $1$ | $\\dfrac{1}{5!} = \\dfrac{1}{120}$ |

Các bậc **chẵn** cho $\\sin 0 = 0$ → biến mất. Còn lại bậc **lẻ**, dấu xen kẽ:
$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\dots = \\sum_{k=0}^\\infty \\frac{(-1)^k}{(2k+1)!}x^{2k+1}.$$

**Dẫn $\\cos x$** — đạo hàm: $\\cos \\to -\\sin \\to -\\cos \\to \\sin \\to \\cos \\dots$ (Hoặc đơn giản: $\\cos x = (\\sin x)'$, đạo hàm chuỗi $\\sin$ theo từng số hạng.)

| $n$ | $f^{(n)}(x)$ | $f^{(n)}(0)$ | hệ số $\\dfrac{f^{(n)}(0)}{n!}$ |
|---|---|---|---|
| 0 | $\\cos x$ | $1$ | $\\dfrac{1}{0!} = 1$ |
| 1 | $-\\sin x$ | $0$ | $0$ |
| 2 | $-\\cos x$ | $-1$ | $-\\dfrac{1}{2!} = -\\dfrac{1}{2}$ |
| 3 | $\\sin x$ | $0$ | $0$ |
| 4 | $\\cos x$ | $1$ | $\\dfrac{1}{4!} = \\dfrac{1}{24}$ |

Lần này bậc **lẻ** biến mất, còn bậc **chẵn** dấu xen kẽ:
$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots = \\sum_{k=0}^\\infty \\frac{(-1)^k}{(2k)!}x^{2k}.$$

> **Liên hệ đẹp**: $\\sin$ chỉ chứa lũy thừa **lẻ** (nó là hàm **lẻ**: $\\sin(-x) = -\\sin x$); $\\cos$ chỉ chứa lũy thừa **chẵn** (hàm **chẵn**). Đối xứng của hàm phản ánh thẳng vào parity số mũ trong chuỗi — xem [hàm chẵn/lẻ ở T1 L07](../../01-Arithmetic-Algebra/lesson-07-functions-intro/).

**Dẫn $\\ln(1+x)$** — đạo hàm tạo ra giai thừa khử bớt $n!$, để lại $\\frac{1}{n}$. Tính tại $0$:

| $n$ | $f^{(n)}(x)$ | $f^{(n)}(0)$ | hệ số $\\dfrac{f^{(n)}(0)}{n!}$ |
|---|---|---|---|
| 0 | $\\ln(1+x)$ | $0$ | $0$ |
| 1 | $(1+x)^{-1}$ | $1$ | $\\dfrac{1}{1!} = 1$ |
| 2 | $-(1+x)^{-2}$ | $-1$ | $-\\dfrac{1}{2!} = -\\dfrac{1}{2}$ |
| 3 | $2(1+x)^{-3}$ | $2$ | $\\dfrac{2}{3!} = \\dfrac{1}{3}$ |
| 4 | $-6(1+x)^{-4}$ | $-6$ | $-\\dfrac{6}{4!} = -\\dfrac{1}{4}$ |

Tử số $f^{(n)}(0) = (-1)^{n-1}(n-1)!$ và mẫu $n!$ rút lại còn $\\frac{(-1)^{n-1}}{n}$:
$$\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\dots = \\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n}x^n.$$
Chuỗi này **chỉ hội tụ khi** $-1 < x \\le 1$ ($R = 1$) — đó là lý do không dùng nó để tính $\\ln 3$ trực tiếp (xem Lỗi 3 bên dưới).

#### 4.2. ASCII — xấp xỉ Taylor bậc tăng dần bám sát đường cong

Lấy $f(x) = e^x$ khai triển tại $0$. Các đa thức Taylor cắt bớt (truncated):
$$P_1 = 1 + x, \\quad P_2 = 1 + x + \\tfrac{x^2}{2}, \\quad P_3 = 1 + x + \\tfrac{x^2}{2} + \\tfrac{x^3}{6}.$$

Bảng số tại vài điểm cho thấy bậc càng cao bám càng sát $e^x$ (sai số giảm dần):

| $x$ | $P_1$ | $P_2$ | $P_3$ | $e^x$ thật |
|---|---|---|---|---|
| $0.5$ | $1.500$ | $1.625$ | $1.6458$ | $1.6487$ |
| $1.0$ | $2.000$ | $2.500$ | $2.6667$ | $2.7183$ |
| $-0.5$ | $0.500$ | $0.625$ | $0.6042$ | $0.6065$ |

Hình dung: gần $x = 0$ cả ba trùng nhau; càng ra xa, bậc thấp "tách" khỏi đường cong sớm hơn.

\`\`\`
   y                                      e^x (đường cong thật)
   |                                  .·'
 3 +                              .·'  ___ P3 (bám lâu nhất)
   |                          .·'  __--
   |                      .·'  _--'      P2 (parabol, tách muộn)
 2 +                  .·'__--'      ____
   |              .·'_--'      ____--      P1 (tiếp tuyến, tách sớm)
   |          .·'-'    ____----
 1 +======·==========------                  ← tại x=0 cả 4 chạm nhau
   |    .·'  P1,P2,P3,e^x trùng quanh gốc
   |
   +----+----+----+----+----+--- x
  -1  -0.5   0   0.5   1   1.5

  Càng xa x=0:  P1 lệch trước  <  P2  <  P3  <  (cộng vô hạn → đúng e^x)
\`\`\`

Tương tự với $\\sin x$ tại $0$: $P_1 = x$ (tiếp tuyến qua gốc), $P_3 = x - \\frac{x^3}{6}$ (uốn xuống bám theo bướu đầu tiên), $P_5 = x - \\frac{x^3}{6} + \\frac{x^5}{120}$ (bám tới gần đỉnh sóng):

\`\`\`
   y                  bướu sin x
 1 +            ___                  P1 = x (cứ đi thẳng lên — tách sớm)
   |         .-'   '-.              /
   |       .'         '.          /
   |     .'    sin x    '.      /
   +---·------------------·---/------ x
   | .'                    '.        P3 = x - x³/6 (uốn xuống bám theo)
   |'                        '·
 -1+
        x=0: P1, P3, P5, sin x đều chạm và cùng độ dốc
\`\`\`

💡 **Ứng dụng**: Máy tính tính $\\sin$, $\\cos$, $e^x$ bằng vài số hạng Taylor.

**Ví dụ**: tính $e^{0.5}$.
- $1 + 0.5 + 0.125 + 0.0208 + 0.0026 \\approx \\mathbf{1.6484}$.
- Giá trị thật: $1.6487$. Sai $0.0003$ với chỉ 5 số hạng.

**Verify $\\sin(0.1)$ bằng Taylor**: $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$ Tại $x = 0.1$: $0.1 - 0.001/6 + \\dots = 0.1 - 0.0001667 = \\mathbf{0.0998333}$. Máy tính: $\\sin(0.1) = 0.0998334$ ✓ (sai $< 10^{-6}$ với 2 số hạng — vì $x$ nhỏ).

#### 4.3. Sai số — phần dư (remainder)

> 📐 **Định nghĩa đầy đủ — Phần dư Lagrange**
>
> **(a) Là gì**: Khi cắt chuỗi Taylor sau bậc $n$ (giữ đa thức $P_n$), phần "bỏ đi" gọi là **phần dư** $R_n(x) = f(x) - P_n(x)$ — đúng bằng sai số xấp xỉ. Dạng Lagrange:
> $$R_n(x) = \\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}, \\quad c \\text{ nằm giữa } a \\text{ và } x.$$
>
> **(b) Vì sao cần**: Xấp xỉ mà không biết sai số thì vô dụng — ta cần **chặn trên** sai số để biết "lấy bao nhiêu số hạng là đủ chính xác". Phần dư cho cận đó: chỉ cần chặn $|f^{(n+1)}|$ trên đoạn là ước lượng được sai số tối đa.
>
> **(c) Ví dụ số**: Xấp xỉ $e^{0.5}$ bằng $P_3$ (bậc 3). Phần dư: $R_3 = \\frac{e^c}{4!}(0.5)^4$ với $0 < c < 0.5$. Vì $e^c < e^{0.5} < 1.65$: $|R_3| < \\frac{1.65}{24}\\cdot 0.0625 \\approx 0.0043$. Thực tế sai số $= 1.6487 - 1.6458 = 0.0029 < 0.0043$ ✓ — cận đúng.

**Walk-through chặn sai số $\\sin(0.1)$ chỉ với 1 số hạng** ($P_1 = x$): $R_1 = \\frac{f''(c)}{2!}x^2 = \\frac{-\\sin c}{2}(0.1)^2$. Vì $|\\sin c| \\le 1$: $|R_1| \\le \\frac{1}{2}(0.01) = 0.005$. Sai số thật $|0.0998334 - 0.1| = 0.0001666 < 0.005$ ✓.

⚠ **Quy luật vàng cho chuỗi đan dấu**: với $\\sin$, $\\cos$, $\\ln(1+x)$ (dấu xen kẽ), sai số khi cắt **nhỏ hơn số hạng đầu tiên bị bỏ**. Vd $\\sin(0.1)$ giữ $P_1 = x$: số hạng bỏ đầu tiên là $\\frac{x^3}{6} = \\frac{0.001}{6} \\approx 0.000167$ → sai số $< 0.000167$. Đỡ phải tính phần dư Lagrange.

#### 4.4. Bốn ứng dụng dùng chuỗi (tính gần đúng & giới hạn)

**Ứng dụng 1 — tính gần đúng $\\sqrt{e} = e^{0.5}$**: dùng $P_4 = 1 + 0.5 + 0.125 + 0.0208 + 0.0026 = 1.6484$. Thật $1.6487$, sai $0.0003$.

**Ứng dụng 2 — tính $\\ln(1.2)$** bằng $\\ln(1+x)$ với $x = 0.2$:
$$\\ln(1.2) \\approx 0.2 - \\frac{0.2^2}{2} + \\frac{0.2^3}{3} - \\frac{0.2^4}{4} = 0.2 - 0.02 + 0.00267 - 0.0004 = \\mathbf{0.18227}.$$
Thật: $\\ln(1.2) = 0.18232$ ✓ (sai $\\sim 5\\cdot 10^{-5}$, vì số hạng tiếp $\\frac{0.2^5}{5} = 0.000064$).

**Ứng dụng 3 — tính giới hạn $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x - x}{x^3}$** (dạng $\\frac{0}{0}$, thường phải L'Hôpital 3 lần):
$$\\sin x - x = \\left(x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots\\right) - x = -\\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$$
$$\\frac{\\sin x - x}{x^3} = -\\frac{1}{6} + \\frac{x^2}{120} - \\dots \\xrightarrow{x\\to 0} \\mathbf{-\\frac{1}{6}}.$$
Chuỗi biến giới hạn khó thành "đọc hệ số" — nhanh hơn L'Hôpital nhiều.

**Ứng dụng 4 — tính giới hạn $\\displaystyle\\lim_{x\\to 0}\\frac{1 - \\cos x}{x^2}$**:
$$1 - \\cos x = 1 - \\left(1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\dots\\right) = \\frac{x^2}{2} - \\frac{x^4}{24} + \\dots$$
$$\\frac{1 - \\cos x}{x^2} = \\frac{1}{2} - \\frac{x^2}{24} + \\dots \\xrightarrow{x\\to 0} \\mathbf{\\frac{1}{2}}.$$

🔁 **Dừng lại tự kiểm tra (ứng dụng)**

1. Dùng chuỗi tính $\\displaystyle\\lim_{x\\to 0}\\frac{e^x - 1 - x}{x^2}$.
2. Xấp xỉ $e^{-0.1}$ bằng 3 số hạng đầu.

<details><summary>Đáp án</summary>

1. $e^x - 1 - x = \\frac{x^2}{2} + \\frac{x^3}{6} + \\dots$ → chia $x^2$ → $\\frac{1}{2} + \\frac{x}{6} + \\dots \\to \\mathbf{\\frac{1}{2}}$.
2. $e^{-0.1} \\approx 1 + (-0.1) + \\frac{(-0.1)^2}{2} = 1 - 0.1 + 0.005 = \\mathbf{0.905}$ (thật: $0.90484$ ✓).

</details>

❓ **Câu hỏi tự nhiên của người đọc**

- *"Lấy bao nhiêu số hạng là đủ?"* Tùy độ chính xác cần + $x$ gần $a$ tới đâu. $x$ càng gần $a$ (điểm khai triển), hội tụ càng nhanh. Vd $e^x$ tại $x = 0.5$ chỉ cần $\\sim 5$ số hạng; tại $x = 10$ cần rất nhiều.
- *"Hàm nào cũng khai triển Taylor được?"* Cần $f$ khả vi vô hạn lần tại $a$. Và chuỗi phải **hội tụ về đúng $f$** (hầu hết hàm quen thuộc thỏa, vài hàm bệnh lý không).
- *"Vì sao chia $n!$?"* Để đạo hàm bậc $n$ của vế phải tại $a$ khớp đúng $f^{(n)}(a)$. Đạo hàm $x^n$ $n$ lần ra $n!$ → chia $n!$ để triệt tiêu.

⚠ **Bốn lỗi thường gặp với Taylor**

**Lỗi 1 — sai dấu xen kẽ trong sin/cos**. $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$ dấu **+ − + −**. Nếu cộng hết dấu +: $\\sin(0.1) \\approx 0.1 + 0.000167 = 0.100167$ (sai). Tương tự $\\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\dots$

**Lỗi 2 — quên giai thừa ở mẫu**. Viết $e^x = 1 + x + x^2 + x^3 + \\dots$ (thiếu $n!$) là **sai** — đó là $\\frac{1}{1-x}$ chứ không phải $e^x$. Phản chứng tại $x = 1$: bản sai cho $1+1+1+\\dots = \\infty$, còn $e^1 = 2.718$. Hệ số đúng phải chia $n!$: $1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\dots$

**Lỗi 3 — dùng chuỗi ngoài bán kính hội tụ**. $\\ln(1+x) = x - \\frac{x^2}{2} + \\dots$ chỉ hội tụ khi $-1 < x \\le 1$. Cắm $x = 2$ để tính $\\ln 3$: $2 - 2 + \\frac{8}{3} - 4 + \\dots$ — các số hạng **phình to**, không hội tụ, cho rác. Cũng vậy $\\frac{1}{1-x}$ chỉ đúng khi $|x| < 1$: cắm $x = 2$ ra $1+2+4+\\dots = \\infty \\neq \\frac{1}{1-2} = -1$.

**Lỗi 4 — nhầm bậc đa thức với số số hạng khác 0**. $\\cos x$ "đến bậc 4" là $1 - \\frac{x^2}{2} + \\frac{x^4}{24}$ — chỉ **3** số hạng khác 0 (bậc 1, 3 bằng 0). Đếm nhầm thành 5 số hạng sẽ thêm số hạng sai.

🔁 **Dừng lại tự kiểm tra**

1. Viết 3 số hạng đầu của $e^x$ và tính $e^{0.1}$.
2. $\\cos x$ đến bậc 4 là gì?

<details><summary>Đáp án</summary>

1. $e^x \\approx 1 + x + \\frac{x^2}{2}$. Tại $0.1$: $1 + 0.1 + 0.005 = \\mathbf{1.105}$ (thật: $1.10517$ ✓).
2. $\\cos x \\approx 1 - \\frac{x^2}{2} + \\frac{x^4}{24}$.

</details>

### 📝 Tóm tắt mục 4

- Taylor: $f(x) = \\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n$ — xấp xỉ hàm bằng đa thức quanh $a$; bậc càng cao bám càng sát.
- Dẫn chuỗi: tính đạo hàm liên tiếp tại $a$, chia $n!$, ghép lại. $e^x$ (mọi đạo hàm = 1), $\\sin$ (bậc lẻ), $\\cos$ (bậc chẵn).
- Hệ số chia $n!$ để đạo hàm khớp; $x$ gần $a$ → hội tụ nhanh. Nhớ dấu xen kẽ $\\sin$ ($x - \\frac{x^3}{6} + \\dots$), $\\cos$ ($1 - \\frac{x^2}{2} + \\dots$).
- Phần dư $R_n = \\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ chặn sai số; chuỗi đan dấu: sai số < số hạng đầu bị bỏ.
- Chuỗi giải giới hạn $\\frac{0}{0}$ (đọc hệ số, thay L'Hôpital) và tính gần đúng ($e^{0.5}$, $\\ln 1.2$). Lỗi: quên $n!$, dùng ngoài bán kính.

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

**Bài 6**: Dùng tiêu chí tỉ số xét hội tụ của $\\sum \\dfrac{5^n}{n!}$.

**Bài 7**: Dùng chuỗi Maclaurin tính giới hạn $\\displaystyle\\lim_{x\\to 0}\\frac{\\tan x - x}{x^3}$ (gợi ý: $\\tan x = x + \\frac{x^3}{3} + \\dots$).

**Bài 8**: Tính bán kính hội tụ của $\\sum \\dfrac{x^n}{n\\cdot 4^n}$.

### Lời giải

**Bài 1**: $a = 2$, $r = 1/3$. Tổng $= \\dfrac{2}{1-1/3} = \\mathbf{3}$.

**Bài 2**: $\\frac{n+1}{n^2+1} \\approx \\frac{1}{n}$ khi $n$ lớn → so sánh với điều hòa → **phân kỳ**.

**Bài 3**: $a_n = 1/n$. $\\lim \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim \\frac{n}{n+1} = 1 \\to R = \\mathbf{1}$.

**Bài 4**: $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots = \\mathbf{1 - \\dfrac{x^2}{2} + \\dfrac{x^4}{24} - \\dfrac{x^6}{720}}$.

**Bài 5**: $(1+x)^{1/2} \\approx 1 + \\frac{x}{2} - \\frac{x^2}{8}$. Với $x = 0.1$: $1 + 0.05 - 0.00125 = \\mathbf{1.04875}$. Thật: $1.04881$.

**Bài 6**: $a_n = \\dfrac{5^n}{n!}$. Lập tỉ số:
$$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{5^{n+1}/(n+1)!}{5^n/n!} = 5\\cdot\\frac{n!}{(n+1)!} = \\frac{5}{n+1} \\xrightarrow{n\\to\\infty} 0.$$
$L = 0 < 1$ → **hội tụ** (tổng $= e^5$). Giai thừa luôn thắng lũy thừa cố định.

**Bài 7**: Thay chuỗi $\\tan x = x + \\frac{x^3}{3} + \\frac{2x^5}{15} + \\dots$:
$$\\frac{\\tan x - x}{x^3} = \\frac{\\frac{x^3}{3} + \\frac{2x^5}{15} + \\dots}{x^3} = \\frac{1}{3} + \\frac{2x^2}{15} + \\dots \\xrightarrow{x\\to 0} \\mathbf{\\frac{1}{3}}.$$

**Bài 8**: $a_n = \\dfrac{1}{n\\cdot 4^n}$.
$$\\frac{1}{R} = \\lim\\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim \\frac{n\\cdot 4^n}{(n+1)4^{n+1}} = \\lim\\frac{n}{n+1}\\cdot\\frac{1}{4} = \\frac{1}{4} \\;\\Rightarrow\\; R = \\mathbf{4}.$$
Hội tụ khi $|x| < 4$. Thừa số $n$ không đổi $R$.

---

## 7. Bài tiếp theo

[Lesson 07 — Phương trình vi phân](../lesson-07-differential-equations/).

## 📝 Tổng kết

1. **Chuỗi hội tụ**: tổng riêng $S_N$ có giới hạn hữu hạn. **Điều kiện cần**: $a_n \\to 0$ (không đủ — điều hòa phản chứng). Telescoping cho tổng đóng từ $S_N$.
2. **Tiêu chí tỉ số (D'Alembert)**: $L = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right|$; $<1$ hội tụ, $>1$ phân kỳ, $=1$ bất lực. Mạnh với $n!$, $r^n$ (rút gọn giai thừa: $\\frac{(n+1)!}{n!} = n+1$). So sánh hợp khi giống chuỗi đã biết.
3. **Cấp số nhân** $\\sum r^n$ hội tụ $\\iff |r| < 1$, tổng $\\frac{a}{1-r}$. **Chuỗi p** $\\sum 1/n^p$ hội tụ $\\iff p > 1$.
4. **Chuỗi lũy thừa**: hội tụ trong $|x| < R$; $\\frac{1}{R} = \\lim\\left|\\frac{a_{n+1}}{a_n}\\right|$ → nhớ **nghịch đảo**. Biên $|x|=R$ xét riêng.
5. **Taylor**: $f(x) = \\sum \\frac{f^{(n)}(a)}{n!}(x-a)^n$ — xấp xỉ hàm bằng đa thức quanh $a$, bậc cao bám sát hơn. Dẫn bằng đạo hàm liên tiếp tại $a$: $e^x$, $\\sin x$ (bậc lẻ), $\\cos x$ (bậc chẵn), $\\ln(1+x)$, $\\frac{1}{1-x}$.
6. **Sai số**: phần dư Lagrange $R_n = \\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$; chuỗi đan dấu sai số < số hạng đầu bị bỏ. Chuỗi giải giới hạn $\\frac{0}{0}$ và tính gần đúng. Lỗi cốt lõi: quên $n!$, dùng ngoài bán kính hội tụ, sai dấu xen kẽ.
7. **Euler**: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ — 3 chuỗi Taylor là một gia đình.
`;
