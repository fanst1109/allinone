// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-01-sequences-limits/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Dãy số & Giới hạn dãy

## Mục tiêu

- Hiểu **dãy số** (sequence) — danh sách số có thứ tự.
- Định nghĩa **giới hạn dãy** một cách trực giác và hình thức ($\\varepsilon$-N).
- Quy tắc tính giới hạn: tổng, hiệu, tích, thương.
- Hai giới hạn nổi tiếng: $\\left(1 + \\frac{1}{n}\\right)^n \\to$ **e**, $\\frac{\\sin(1/n)}{1/n} \\to 1$.

## Kiến thức tiền đề

- [Tier 1 — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/).

---

## 1. Dãy số là gì?

💡 **Trực giác**: Dãy số = một danh sách các số đánh số 1, 2, 3, ... vô hạn.

**Ký hiệu**: $(a_n)_{n=1}^{\\infty}$ hoặc gọn hơn $a_n$.

**Ví dụ**:
- $a_n = \\frac{1}{n}$: $1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\ldots \\to$ tiến dần về 0.
- $b_n = n^2$: $1, 4, 9, 16, \\ldots \\to$ tăng vô hạn.
- $c_n = (-1)^n$: $-1, 1, -1, 1, \\ldots \\to$ dao động.
- $d_n = \\left(1 + \\frac{1}{n}\\right)^n$: $2, 2.25, 2.37, 2.44, \\ldots \\to$ tiến về **$e \\approx 2.718$**.

⟶ Câu hỏi: dãy "dẫn về đâu" khi $n$ rất lớn?

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dãy số khác hàm số ở chỗ nào?"* Dãy chỉ nhận đầu vào là số nguyên dương $n \\in \\{1, 2, 3, \\ldots\\}$, còn hàm số nhận đầu vào là số thực bất kỳ. Dãy $a_n = \\frac{1}{n}$ chỉ định nghĩa tại $n = 1, 2, 3$ (cho $1, \\frac{1}{2}, \\frac{1}{3}$), không có $a_{1.5}$. Có thể coi dãy là "hàm số mà miền xác định là $\\mathbb{N}$".
- *"Dãy phải có công thức không?"* Không bắt buộc. Dãy Fibonacci $1, 1, 2, 3, 5, 8, \\ldots$ định nghĩa bằng quy luật $a_n = a_{n-1} + a_{n-2}$ (đệ quy), không có công thức trực tiếp đơn giản. Miễn mỗi $n$ ứng với đúng 1 số là một dãy hợp lệ.

⚠ **Lỗi thường gặp — "vài số hạng đầu giống nhau" KHÔNG có nghĩa hai dãy bằng nhau**. Dãy $a_n = n$ cho $1, 2, 3, 4, \\ldots$ và dãy $b_n = n + (n-1)(n-2)(n-3)(n-4)$ cũng cho $1, 2, 3, 4$ ở 4 số hạng đầu, nhưng $b_5 = 5 + 24 = 29 \\neq 5$. Nhìn vài số đầu rồi "đoán quy luật" là không chặt chẽ — luôn cần công thức/định nghĩa rõ ràng.

🔁 **Dừng lại tự kiểm tra**

1. Viết 4 số hạng đầu của dãy $a_n = \\frac{(-1)^n}{n}$.
2. Dãy $a_n = 2^n$ tiến về đâu khi $n \\to \\infty$?

<details><summary>Đáp án</summary>

1. $a_1 = -1, a_2 = \\frac{1}{2}, a_3 = -\\frac{1}{3}, a_4 = \\frac{1}{4}$. Dấu xen kẽ, độ lớn giảm dần → tiến về 0.
2. $2, 4, 8, 16, \\ldots$ tăng vô hạn → phân kỳ về $+\\infty$ (không có giới hạn hữu hạn).

</details>

### 📝 Tóm tắt mục 1

- Dãy số = hàm số có miền xác định là $\\mathbb{N}$; mỗi $n$ ứng với đúng 1 số $a_n$.
- Ký hiệu $(a_n)$ hoặc $a_n$; định nghĩa bằng công thức trực tiếp hoặc đệ quy.
- Câu hỏi trung tâm: khi $n$ rất lớn, dãy "dẫn về đâu" → khái niệm giới hạn.

---

## 2. Giới hạn dãy — Định nghĩa trực giác

💡 **Là gì**: Số $L$ được gọi là giới hạn của dãy $a_n$ nếu khi $n$ đủ lớn, $a_n$ **gần $L$ tùy ý**.

**Ký hiệu**: $\\lim_{n \\to \\infty} a_n = L$ hoặc $a_n \\to L$.

**Ví dụ số cụ thể** ($a_n = \\frac{1}{n}$):
- $n=10 \\to a = 0.1$.
- $n=100 \\to a = 0.01$.
- $n=1000 \\to a = 0.001$.
- $n=10^6 \\to a = 10^{-6}$.
- ⟶ **$\\lim \\frac{1}{n} = 0$**.

❓ **"Đủ gần" nghĩa là gì?** Đáp: với mọi sai số $\\varepsilon > 0$ (dù nhỏ), tồn tại $N$ sao cho mọi $n \\ge N$ thì $|a_n - L| < \\varepsilon$.

### Định nghĩa hình thức ($\\varepsilon$-N) — Cauchy

$$\\lim_{n \\to \\infty} a_n = L \\iff \\forall \\varepsilon > 0,\\ \\exists N \\in \\mathbb{N},\\ \\forall n \\ge N : |a_n - L| < \\varepsilon$$

💡 **Đọc trực giác**: "Cho dù tôi đòi sai số bé đến đâu ($\\varepsilon$), bạn luôn tìm được một mốc $N$ để từ $N$ trở đi, dãy nằm trong khoảng $(L-\\varepsilon, L+\\varepsilon)$."

⟶ Đây là **một trong những định nghĩa quan trọng nhất của Toán cấp cao**. Nó làm cho khái niệm "đủ gần" trở nên chính xác, không còn mơ hồ.

> 📐 **Định nghĩa đầy đủ — Giới hạn dãy ($\\varepsilon$-N)**
>
> **(a) Là gì**: Phát biểu chính xác bằng logic: cho mọi sai số $\\varepsilon > 0$ (dù nhỏ thế nào tùy chọn), TỒN TẠI 1 mốc $N$ sao cho mọi $a_n$ với $n \\ge N$ đều nằm trong khoảng $(L-\\varepsilon, L+\\varepsilon)$. "Game" giữa người đòi sai số và người phải đáp ứng.
>
> **(b) Vì sao cần**: Trước Cauchy (~1820), giới hạn được hiểu mơ hồ "tiến gần dần" — không thể chứng minh nghiêm túc. Định nghĩa $\\varepsilon$-N biến mơ hồ thành 1 mệnh đề logic kiểm tra được. Đây là **nền tảng toàn bộ Giải tích** — không có nó, không có đạo hàm, tích phân, chuỗi, không gian Banach... Cuộc cách mạng "rigorisation" của Toán thế kỷ 19 bắt đầu từ đây.
>
> **(c) Ví dụ số**: Chứng minh $\\lim \\frac{1}{n} = 0$. Cho $\\varepsilon = 0.01$: cần $\\left|\\frac{1}{n} - 0\\right| < 0.01 \\to n > 100$. Chọn $N = 101 \\to$ mọi $n \\ge 101$ thoả. Cho $\\varepsilon = 10^{-6}$: cần $n > 10^6$. Chọn $N = 10^6+1$ thoả. Cho $\\varepsilon$ bất kỳ $> 0$: chọn $N = \\lceil 1/\\varepsilon \\rceil + 1 \\to$ xong. Vậy $\\lim = 0$ ✓. Phản ví dụ: dãy $(-1)^n$ không hội tụ — chọn $\\varepsilon = 0.5$, không $N$ nào làm $|(-1)^n - L| < 0.5\\ \\forall n \\ge N$ (vì dãy nhảy giữa $\\pm 1$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phải $\\forall \\varepsilon$ rồi mới $\\exists N$ — đảo thứ tự được không?"* Không. Thứ tự "với MỌI $\\varepsilon$, TỒN TẠI $N$" nghĩa là $N$ được phép **phụ thuộc vào $\\varepsilon$** ($\\varepsilon$ nhỏ hơn → cần $N$ lớn hơn). Nếu đảo thành "$\\exists N, \\forall \\varepsilon$" thì 1 mốc $N$ phải thoả mọi $\\varepsilon$ — quá mạnh, gần như không dãy nào đạt. Thứ tự lượng từ là linh hồn của định nghĩa.
- *"Giới hạn có thể có 2 giá trị khác nhau không?"* Không — giới hạn nếu tồn tại thì **duy nhất**. Giả sử dãy hội tụ về cả $L_1$ và $L_2$ với $L_1 \\neq L_2$: chọn $\\varepsilon = \\frac{|L_1 - L_2|}{2}$, thì từ một mốc nào đó dãy phải đồng thời nằm trong hai khoảng rời nhau quanh $L_1$ và $L_2$ — vô lý.
- *"$a_n$ có cần thực sự 'đạt' tới $L$ không?"* Không. $\\frac{1}{n}$ không bao giờ bằng đúng 0, nhưng vẫn $\\lim = 0$. Giới hạn nói về xu hướng tiến gần, không phải về việc chạm tới.

⚠ **Lỗi thường gặp — nhầm "có vô hạn số hạng gần $L$" với "hội tụ về $L$"**. Dãy $0, 1, 0, \\frac{1}{2}, 0, \\frac{1}{3}, \\ldots$ (các số hạng lẻ $= 0$, chẵn $= \\frac{1}{k}$) có vô hạn số hạng bằng 0, nhưng KHÔNG hội tụ về 0: với $\\varepsilon = 0.4$, dãy vẫn có vô hạn số hạng (các $\\frac{1}{k}$ đầu) nằm ngoài $(-0.4, 0.4)$. Hội tụ đòi hỏi **từ $N$ trở đi TẤT CẢ** nằm trong, không phải "có nhiều".

🔁 **Dừng lại tự kiểm tra**

1. Với dãy $a_n = \\frac{1}{n}$ và $\\varepsilon = 0.02$, mốc $N$ nhỏ nhất thoả $|a_n| < \\varepsilon$ với mọi $n \\ge N$ là bao nhiêu?
2. Dãy hằng $a_n = 7$ có hội tụ không? Về đâu?

<details><summary>Đáp án</summary>

1. Cần $\\frac{1}{n} < 0.02 \\iff n > 50$. Vậy $N = 51$ (từ $n = 51$ trở đi $\\frac{1}{n} < 0.02$).
2. Có, $\\lim = 7$. Với mọi $\\varepsilon > 0$, $|7 - 7| = 0 < \\varepsilon$ đúng với mọi $n$ → chọn $N = 1$.

</details>

### 📝 Tóm tắt mục 2

- $\\lim a_n = L$: khi $n$ đủ lớn, $a_n$ gần $L$ tùy ý.
- Định nghĩa $\\varepsilon$-N: $\\forall \\varepsilon > 0, \\exists N, \\forall n \\ge N: |a_n - L| < \\varepsilon$ — thứ tự lượng từ là cốt lõi.
- Giới hạn nếu tồn tại thì **duy nhất**; dãy không cần "đạt" tới $L$, chỉ cần tiến gần.

---

## 3. Phân loại dãy

| Loại | Ý nghĩa | Ví dụ |
|------|---------|-------|
| **Hội tụ** | $\\lim$ tồn tại, hữu hạn | $\\frac{1}{n} \\to 0$ |
| **Phân kỳ về $\\pm\\infty$** | $a_n \\to \\infty$ hoặc $-\\infty$ | $n^2 \\to +\\infty$ |
| **Phân kỳ (dao động)** | không có $\\lim$ | $(-1)^n$ |

💡 **Trực giác**: ba loại tương ứng ba "số phận" của dãy khi $n \\to \\infty$: ổn định lại tại 1 số (hội tụ), bay ra vô cực (phân kỳ $\\pm\\infty$), hay mắc kẹt nhảy qua nhảy lại không bao giờ ổn định (dao động).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phân kỳ về $+\\infty$ và dao động — đều không có giới hạn hữu hạn, sao tách ra?"* Vì hành vi khác hẳn: $n^2$ đi theo MỘT hướng rõ ràng (lớn dần mãi), ta nói $\\lim = +\\infty$ (giới hạn vô cực — vẫn dự đoán được). Còn $(-1)^n$ không theo hướng nào — không gán được cả $\\pm\\infty$.
- *"Dãy $(-1)^n \\cdot n$ thuộc loại nào?"* Cho $-1, 2, -3, 4, -5, \\ldots$: độ lớn ra vô cực nhưng dấu đổi → **dao động không bị chặn**, không có giới hạn (kể cả vô cực).

⚠ **Lỗi thường gặp — tưởng "bị chặn" thì "hội tụ"**. $(-1)^n$ bị chặn (luôn nằm trong $[-1, 1]$) nhưng KHÔNG hội tụ. Bị chặn chỉ là điều kiện cần, không đủ. (Điều kiện đủ kinh điển: bị chặn **và** đơn điệu → hội tụ.)

🔁 **Dừng lại tự kiểm tra**

1. Dãy $a_n = (-1)^n \\cdot \\frac{1}{n}$ ($-1, \\frac{1}{2}, -\\frac{1}{3}, \\ldots$) thuộc loại nào?
2. Dãy $a_n = n - \\frac{1}{n}$ thuộc loại nào?

<details><summary>Đáp án</summary>

1. **Hội tụ** về 0 (dù dấu xen kẽ, độ lớn $\\frac{1}{n} \\to 0$, bị kẹp giữa $-\\frac{1}{n}$ và $\\frac{1}{n}$).
2. **Phân kỳ về $+\\infty$** ($n$ áp đảo, $\\frac{1}{n} \\to 0$).

</details>

### 📝 Tóm tắt mục 3

- 3 loại: hội tụ ($\\lim$ hữu hạn), phân kỳ $\\pm\\infty$ (đi 1 hướng ra vô cực), dao động (không hướng).
- Bị chặn là điều kiện **cần** chứ không **đủ** để hội tụ ($(-1)^n$ phản ví dụ).
- "Phân kỳ về $+\\infty$" vẫn có dự đoán được; "dao động" thì không.

---

## 4. Quy tắc tính giới hạn

Cho $a_n \\to A$, $b_n \\to B$ (hữu hạn):

$$\\begin{aligned}
\\lim(a_n + b_n) &= A + B \\\\
\\lim(a_n - b_n) &= A - B \\\\
\\lim(a_n \\cdot b_n) &= A \\cdot B \\\\
\\lim(a_n / b_n) &= A / B \\quad (\\text{nếu } B \\neq 0) \\\\
\\lim(c \\cdot a_n) &= c \\cdot A
\\end{aligned}$$

⟶ Giống như "đại số bình thường" — cộng/trừ/nhân/chia tự nhiên.

⚠ **Dạng không xác định** (cần biến đổi):
- $\\infty - \\infty$, $0 \\cdot \\infty$, $\\frac{\\infty}{\\infty}$, $\\frac{0}{0}$, $1^\\infty$, $0^0$, $\\infty^0$.

💡 **Trực giác — vì sao quy tắc đúng**: nếu $a_n$ ổn định quanh $A$ và $b_n$ quanh $B$ thì $a_n + b_n$ ổn định quanh $A + B$ (sai số tổng = tổng sai số, vẫn nhỏ tùy ý). Đây là lý do "đại số giới hạn" hoạt động như đại số số thực bình thường — nhưng **chỉ khi cả hai giới hạn hữu hạn và tồn tại**.

**Verify quy tắc bằng số** ($a_n = 2 + \\frac{1}{n} \\to 2$, $b_n = 3 - \\frac{1}{n^2} \\to 3$):
- $a_n + b_n = 5 + \\frac{1}{n} - \\frac{1}{n^2}$: tại $n=1000 \\approx 5.000999 \\to \\lim = 5 = 2+3$ ✓.
- $a_n \\cdot b_n$: tại $n=1000 \\approx 2.001 \\cdot 2.999999 \\approx 6.00198 \\to \\lim = 6 = 2 \\cdot 3$ ✓.
- $a_n / b_n$: tại $n=1000 \\approx 2.001/2.999999 \\approx 0.66700 \\to \\lim = \\frac{2}{3} \\approx 0.6667$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao $\\infty - \\infty$ lại 'không xác định' — chẳng phải bằng 0?"* Không. Nó tùy biểu thức cụ thể: $(n+5) - n = 5 \\to 5$; $n^2 - n \\to +\\infty$; $n - (n - 7) = 7 \\to 7$. Cùng dạng $\\infty - \\infty$ mà ra ba kết quả khác nhau → phải biến đổi trước khi kết luận.
- *"Quy tắc thương cần $B \\neq 0$ — nếu $B = 0$ thì sao?"* Rơi vào dạng vô định $\\frac{0}{0}$ (nếu $A = 0$) hoặc tiến ra $\\pm\\infty$ (nếu $A \\neq 0$). Cả hai trường hợp đều cần xử lý riêng, không dùng được quy tắc thương trực tiếp.

⚠ **Lỗi thường gặp — áp quy tắc khi giới hạn KHÔNG tồn tại**. $\\lim[(-1)^n + (-1)^{n+1}]$: từng hạng không có giới hạn, nhưng tổng $= 0$ với mọi $n \\to \\lim = 0$. Không được viết "$= \\lim(-1)^n + \\lim(-1)^{n+1}$" vì hai $\\lim$ đó không tồn tại — quy tắc tổng chỉ áp khi cả hai $\\lim$ tồn tại.

🔁 **Dừng lại tự kiểm tra**

1. Tính $\\lim (5 - \\frac{3}{n})(2 + \\frac{1}{n})$.
2. Dạng của $\\lim (n^2 - n)$ khi $n \\to \\infty$ là gì, và bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. $= 5 \\cdot 2 = 10$ (cả hai thừa số hội tụ → dùng quy tắc tích).
2. Dạng $\\infty - \\infty$; biến đổi $n^2 - n = n(n-1) \\to +\\infty$.

</details>

### 📝 Tóm tắt mục 4

- Khi $a_n \\to A$, $b_n \\to B$ hữu hạn: $\\lim$ phân phối qua $+, -, \\cdot, /$ (thương cần $B \\neq 0$).
- Quy tắc chỉ áp khi **cả hai giới hạn tồn tại** — không thì phải biến đổi trước.
- 7 dạng vô định ($\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0 \\cdot \\infty$, $1^\\infty$, $0^0$, $\\infty^0$) cần xử lý riêng.

---

## 5. Hai giới hạn nổi tiếng

### 5.1. $\\left(1 + \\frac{1}{n}\\right)^n \\to e$

$$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2.71828\\ldots$$

**Tính cụ thể**:
- $n=1$: $(1+1)^1 = 2$.
- $n=10$: $1.1^{10} \\approx 2.5937$.
- $n=100$: $1.01^{100} \\approx 2.7048$.
- $n=1000$: $\\approx 2.7169$.
- $n=10^6$: $\\approx 2.71828$.

💡 **Vì sao quan trọng**: Định nghĩa số $e$. Liên quan đến lãi kép, $e^x$ là duy nhất hàm có đạo hàm = chính nó.

### 5.2. $\\frac{\\sin x}{x} \\to 1$ khi $x \\to 0$

(Áp dụng cho dãy $x_n \\to 0$):

$$\\lim \\frac{\\sin x}{x} = 1 \\quad \\text{khi } x \\to 0$$

**Hệ quả** (dùng nhiều khi tính đạo hàm $\\sin x$):
- $\\lim \\frac{1 - \\cos x}{x} = 0$.
- $\\lim \\frac{\\tan x}{x} = 1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\left(1 + \\frac{1}{n}\\right)^n$ là dạng $1^\\infty$ — sao không bằng 1?"* Vì đây đúng là dạng **vô định**: cơ số $1 + \\frac{1}{n}$ tiến tới 1 (đẩy kết quả về 1) nhưng số mũ $n$ ra vô cực (đẩy kết quả lên). Hai lực đối nghịch "cân bằng" tại $e \\approx 2.718$, không phải 1 cũng không phải $\\infty$. Bảng số ở trên cho thấy nó hội tụ chầm chậm về 2.718.
- *"$\\frac{\\sin x}{x}$ tại $x = 0$ là $\\frac{0}{0}$ — sao bằng 1?"* Vì khi $x$ rất nhỏ (radian), $\\sin x \\approx x$ (cung gần bằng dây). Tại $x = 0.01$: $\\frac{\\sin(0.01)}{0.01} = \\frac{0.00999983}{0.01} \\approx 0.99998 \\to$ tiến 1. **Bắt buộc dùng radian**, không phải độ.

⚠ **Lỗi thường gặp — dùng độ thay vì radian cho $\\frac{\\sin x}{x}$**. Nếu $x$ tính bằng độ, $\\frac{\\sin(1^\\circ)}{1} = \\frac{0.01745\\ldots}{1} \\approx 0.01745$, KHÔNG tiến về 1. Giới hạn $\\frac{\\sin x}{x} \\to 1$ chỉ đúng với **radian** — đây là một trong các lý do giải tích luôn dùng radian.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim \\left(1 + \\frac{1}{n}\\right)^{2n} = ?$
2. $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x} = ?$

<details><summary>Đáp án</summary>

1. $\\left(1+\\frac{1}{n}\\right)^{2n} = \\left[\\left(1+\\frac{1}{n}\\right)^n\\right]^2 \\to e^2 \\approx 7.389$.
2. Viết $\\frac{\\sin(5x)}{x} = 5 \\cdot \\frac{\\sin(5x)}{5x} \\to 5 \\cdot 1 = 5$.

</details>

### 📝 Tóm tắt mục 5

- $\\left(1 + \\frac{1}{n}\\right)^n \\to e \\approx 2.71828$ — dạng vô định $1^\\infty$, định nghĩa số $e$.
- $\\frac{\\sin x}{x} \\to 1$ khi $x \\to 0$ (radian); kéo theo $\\frac{1-\\cos x}{x} \\to 0$, $\\frac{\\tan x}{x} \\to 1$.
- Hai giới hạn này là nền tảng cho đạo hàm hàm mũ và lượng giác (L03).

---

## 6. Định lý kẹp (Squeeze Theorem)

Nếu $a_n \\le b_n \\le c_n$ và $\\lim a_n = \\lim c_n = L$, thì **$\\lim b_n = L$**.

💡 **Trực giác**: Nếu $b$ bị "kẹp" giữa 2 dãy đều dần về $L$, thì $b$ cũng phải dần về $L$.

**Ví dụ**: Tính $\\lim \\frac{\\sin(n)}{n}$.
- $|\\sin n| \\le 1 \\to -\\frac{1}{n} \\le \\frac{\\sin(n)}{n} \\le \\frac{1}{n}$.
- Cả 2 đầu $\\to 0$. ⟶ $\\lim \\frac{\\sin(n)}{n} =$ **0**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không tính $\\lim \\sin(n)$ trực tiếp rồi chia cho $\\lim n$?"* Vì $\\lim \\sin(n)$ KHÔNG tồn tại ($\\sin n$ dao động vô tận trong $[-1,1]$ khi $n$ chạy), còn $\\lim n = \\infty \\to$ rơi vào dạng vô định. Định lý kẹp né hẳn việc đó: ta không cần biết $\\frac{\\sin(n)}{n}$ xử sự ra sao, chỉ cần hai dãy chặn đều về 0.
- *"Hai dãy chặn phải về CÙNG một giới hạn?"* Đúng, bắt buộc. Nếu $\\lim a_n = 0$ nhưng $\\lim c_n = 1$ thì định lý không kết luận gì — $b_n$ có thể lảng vảng bất kỳ đâu trong $[0, 1]$.

⚠ **Lỗi thường gặp — chặn không đúng chiều hoặc hai cận khác giới hạn**. Muốn kẹp $b_n$, phải có $a_n \\le b_n \\le c_n$ **đúng từ một mốc trở đi** và $\\lim a_n = \\lim c_n$. Vd chặn $\\frac{\\sin(n)}{n}$ bằng $-1 \\le \\frac{\\sin(n)}{n} \\le 1$ là vô dụng (hai cận $-1, 1$ không bằng nhau) — phải chia thêm $n$ để có $-\\frac{1}{n} \\le \\ldots \\le \\frac{1}{n}$.

🔁 **Dừng lại tự kiểm tra**

1. Dùng định lý kẹp tính $\\lim \\frac{\\cos(n^2)}{n}$.
2. Tại sao không kẹp được $\\lim \\sin(n)$ (không chia $n$)?

<details><summary>Đáp án</summary>

1. $-\\frac{1}{n} \\le \\frac{\\cos(n^2)}{n} \\le \\frac{1}{n}$, hai cận $\\to 0 \\to \\lim = 0$.
2. Cận tự nhiên là $-1 \\le \\sin(n) \\le 1$ nhưng $\\lim(-1) = -1 \\neq 1 = \\lim(1) \\to$ không kẹp được; thực tế $\\lim \\sin(n)$ không tồn tại.

</details>

### 📝 Tóm tắt mục 6

- Định lý kẹp: $a_n \\le b_n \\le c_n$ và $\\lim a_n = \\lim c_n = L \\implies \\lim b_n = L$.
- Dùng cho dãy "khó trực tiếp" nhưng bị chặn giữa hai dãy đơn giản (vd có $\\sin n$, $\\cos n$).
- Hai cận **bắt buộc cùng giới hạn**; chặn lệch chiều/khác $L$ là vô dụng.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính $\\lim \\frac{3n + 5}{2n - 1}$.

**Bài 2**: Tính $\\lim \\frac{n^2 + 2}{n^3}$.

**Bài 3**: Tính $\\lim (\\sqrt{n^2+1} - n)$. (Gợi ý: nhân liên hợp.)

**Bài 4**: Tính $\\lim \\left(1 + \\frac{2}{n}\\right)^n$.

**Bài 5**: Dãy $a_n = \\frac{\\cos(n\\pi/3)}{n}$. Tính $\\lim a_n$.

### Lời giải

**Bài 1**: Chia tử mẫu cho $n$: $\\lim \\frac{3 + 5/n}{2 - 1/n} = \\frac{3+0}{2-0} =$ **$\\frac{3}{2}$**.

**Bài 2**: Chia cho $n^3$: $\\lim \\left(\\frac{1}{n} + \\frac{2}{n^3}\\right) = 0 + 0 =$ **0**.

**Bài 3**: $\\frac{(\\sqrt{n^2+1} - n)(\\sqrt{n^2+1} + n)}{\\sqrt{n^2+1} + n} = \\frac{n^2+1 - n^2}{\\sqrt{n^2+1} + n} = \\frac{1}{\\sqrt{n^2+1} + n} \\to \\frac{1}{\\infty+\\infty} =$ **0**.

**Bài 4**: $\\left(1 + \\frac{2}{n}\\right)^n = \\left[\\left(1 + \\frac{1}{n/2}\\right)^{n/2}\\right]^2 \\to e^2 \\approx$ **7.389**.

**Bài 5**: $|\\cos(n\\pi/3)| \\le 1 \\to -\\frac{1}{n} \\le a_n \\le \\frac{1}{n} \\to$ kẹp về **0**.

---

## 8. Bài tiếp theo

[Lesson 02 — Giới hạn hàm & liên tục](../lesson-02-function-limits-continuity/).

## 📝 Tổng kết

1. **Dãy số**: $a_n =$ một số ứng với mỗi $n \\in \\mathbb{N}$.
2. **Giới hạn**: $\\lim a_n = L$ ($\\forall \\varepsilon > 0, \\exists N, \\forall n \\ge N: |a_n - L| < \\varepsilon$).
3. **3 loại dãy**: hội tụ, phân kỳ $\\pm\\infty$, dao động.
4. **$\\left(1+\\frac{1}{n}\\right)^n \\to e$**, **$\\frac{\\sin x}{x} \\to 1$**.
5. **Định lý kẹp** cho dãy phức tạp bị kẹp giữa 2 dãy đơn giản.
`;
