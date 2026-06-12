# Lesson 01 — Dãy số & Giới hạn dãy

## Mục tiêu

- Hiểu **dãy số** (sequence) — danh sách số có thứ tự.
- Định nghĩa **giới hạn dãy** một cách trực giác và hình thức ($\varepsilon$-N).
- Quy tắc tính giới hạn: tổng, hiệu, tích, thương.
- Hai giới hạn nổi tiếng: $\left(1 + \frac{1}{n}\right)^n \to$ **e**, $\frac{\sin(1/n)}{1/n} \to 1$.

## Kiến thức tiền đề

- [Tier 1 — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/).

---

## 1. Dãy số là gì?

💡 **Trực giác**: Dãy số = một danh sách các số đánh số 1, 2, 3, ... vô hạn.

**Ký hiệu**: $(a_n)_{n=1}^{\infty}$ hoặc gọn hơn $a_n$.

**Ví dụ**:
- $a_n = \frac{1}{n}$: $1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \ldots \to$ tiến dần về 0.
- $b_n = n^2$: $1, 4, 9, 16, \ldots \to$ tăng vô hạn.
- $c_n = (-1)^n$: $-1, 1, -1, 1, \ldots \to$ dao động.
- $d_n = \left(1 + \frac{1}{n}\right)^n$: $2, 2.25, 2.37, 2.44, \ldots \to$ tiến về **$e \approx 2.718$**.

⟶ Câu hỏi: dãy "dẫn về đâu" khi $n$ rất lớn?

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dãy số khác hàm số ở chỗ nào?"* Dãy chỉ nhận đầu vào là số nguyên dương $n \in \{1, 2, 3, \ldots\}$, còn hàm số nhận đầu vào là số thực bất kỳ. Dãy $a_n = \frac{1}{n}$ chỉ định nghĩa tại $n = 1, 2, 3$ (cho $1, \frac{1}{2}, \frac{1}{3}$), không có $a_{1.5}$. Có thể coi dãy là "hàm số mà miền xác định là $\mathbb{N}$".
- *"Dãy phải có công thức không?"* Không bắt buộc. Dãy Fibonacci $1, 1, 2, 3, 5, 8, \ldots$ định nghĩa bằng quy luật $a_n = a_{n-1} + a_{n-2}$ (đệ quy), không có công thức trực tiếp đơn giản. Miễn mỗi $n$ ứng với đúng 1 số là một dãy hợp lệ.

⚠ **Lỗi thường gặp — "vài số hạng đầu giống nhau" KHÔNG có nghĩa hai dãy bằng nhau**. Dãy $a_n = n$ cho $1, 2, 3, 4, \ldots$ và dãy $b_n = n + (n-1)(n-2)(n-3)(n-4)$ cũng cho $1, 2, 3, 4$ ở 4 số hạng đầu, nhưng $b_5 = 5 + 24 = 29 \neq 5$. Nhìn vài số đầu rồi "đoán quy luật" là không chặt chẽ — luôn cần công thức/định nghĩa rõ ràng.

🔁 **Dừng lại tự kiểm tra**

1. Viết 4 số hạng đầu của dãy $a_n = \frac{(-1)^n}{n}$.
2. Dãy $a_n = 2^n$ tiến về đâu khi $n \to \infty$?

<details><summary>Đáp án</summary>

1. $a_1 = -1, a_2 = \frac{1}{2}, a_3 = -\frac{1}{3}, a_4 = \frac{1}{4}$. Dấu xen kẽ, độ lớn giảm dần → tiến về 0.
2. $2, 4, 8, 16, \ldots$ tăng vô hạn → phân kỳ về $+\infty$ (không có giới hạn hữu hạn).

</details>

### 📝 Tóm tắt mục 1

- Dãy số = hàm số có miền xác định là $\mathbb{N}$; mỗi $n$ ứng với đúng 1 số $a_n$.
- Ký hiệu $(a_n)$ hoặc $a_n$; định nghĩa bằng công thức trực tiếp hoặc đệ quy.
- Câu hỏi trung tâm: khi $n$ rất lớn, dãy "dẫn về đâu" → khái niệm giới hạn.

---

## 2. Giới hạn dãy — Định nghĩa trực giác

💡 **Là gì**: Số $L$ được gọi là giới hạn của dãy $a_n$ nếu khi $n$ đủ lớn, $a_n$ **gần $L$ tùy ý**.

**Ký hiệu**: $\lim_{n \to \infty} a_n = L$ hoặc $a_n \to L$.

**Ví dụ số cụ thể** ($a_n = \frac{1}{n}$):
- $n=10 \to a = 0.1$.
- $n=100 \to a = 0.01$.
- $n=1000 \to a = 0.001$.
- $n=10^6 \to a = 10^{-6}$.
- ⟶ **$\lim \frac{1}{n} = 0$**.

❓ **"Đủ gần" nghĩa là gì?** Đáp: với mọi sai số $\varepsilon > 0$ (dù nhỏ), tồn tại $N$ sao cho mọi $n \ge N$ thì $|a_n - L| < \varepsilon$.

### Định nghĩa hình thức ($\varepsilon$-N) — Cauchy

$$\lim_{n \to \infty} a_n = L \iff \forall \varepsilon > 0,\ \exists N \in \mathbb{N},\ \forall n \ge N : |a_n - L| < \varepsilon$$

💡 **Đọc trực giác**: "Cho dù tôi đòi sai số bé đến đâu ($\varepsilon$), bạn luôn tìm được một mốc $N$ để từ $N$ trở đi, dãy nằm trong khoảng $(L-\varepsilon, L+\varepsilon)$."

⟶ Đây là **một trong những định nghĩa quan trọng nhất của Toán cấp cao**. Nó làm cho khái niệm "đủ gần" trở nên chính xác, không còn mơ hồ.

> 📐 **Định nghĩa đầy đủ — Giới hạn dãy ($\varepsilon$-N)**
>
> **(a) Là gì**: Phát biểu chính xác bằng logic: cho mọi sai số $\varepsilon > 0$ (dù nhỏ thế nào tùy chọn), TỒN TẠI 1 mốc $N$ sao cho mọi $a_n$ với $n \ge N$ đều nằm trong khoảng $(L-\varepsilon, L+\varepsilon)$. "Game" giữa người đòi sai số và người phải đáp ứng.
>
> **(b) Vì sao cần**: Trước Cauchy (~1820), giới hạn được hiểu mơ hồ "tiến gần dần" — không thể chứng minh nghiêm túc. Định nghĩa $\varepsilon$-N biến mơ hồ thành 1 mệnh đề logic kiểm tra được. Đây là **nền tảng toàn bộ Giải tích** — không có nó, không có đạo hàm, tích phân, chuỗi, không gian Banach... Cuộc cách mạng "rigorisation" của Toán thế kỷ 19 bắt đầu từ đây.
>
> **(c) Ví dụ số**: Chứng minh $\lim \frac{1}{n} = 0$. Cho $\varepsilon = 0.01$: cần $\left|\frac{1}{n} - 0\right| < 0.01 \to n > 100$. Chọn $N = 101 \to$ mọi $n \ge 101$ thoả. Cho $\varepsilon = 10^{-6}$: cần $n > 10^6$. Chọn $N = 10^6+1$ thoả. Cho $\varepsilon$ bất kỳ $> 0$: chọn $N = \lceil 1/\varepsilon \rceil + 1 \to$ xong. Vậy $\lim = 0$ ✓. Phản ví dụ: dãy $(-1)^n$ không hội tụ — chọn $\varepsilon = 0.5$, không $N$ nào làm $|(-1)^n - L| < 0.5\ \forall n \ge N$ (vì dãy nhảy giữa $\pm 1$).

### Walk-through ε-N từng bước — chứng minh $\lim \frac{2n+1}{n} = 2$

Đây là cách trình bày một chứng minh $\varepsilon$-N **đầy đủ, không lươn lẹo**, đúng quy trình mà mọi bài tập giải tích đòi hỏi. Dãy $a_n = \frac{2n+1}{n} = 2 + \frac{1}{n}$, ta đoán $L = 2$.

> **Bước 1 — viết $|a_n - L|$ gọn lại.**
> $$|a_n - 2| = \left|\,2 + \tfrac{1}{n} - 2\,\right| = \left|\tfrac{1}{n}\right| = \tfrac{1}{n} \quad (\text{vì } n \ge 1 > 0).$$
>
> **Bước 2 — đặt yêu cầu $< \varepsilon$ rồi giải ra $n$.** Cho trước $\varepsilon > 0$ tùy ý. Ta cần
> $$\tfrac{1}{n} < \varepsilon \iff n > \tfrac{1}{\varepsilon}.$$
>
> **Bước 3 — chọn mốc $N$.** Lấy $N = \left\lceil \tfrac{1}{\varepsilon} \right\rceil + 1$ (làm tròn lên rồi cộng 1 cho chắc). Khi đó mọi $n \ge N$ đều có $n > \tfrac{1}{\varepsilon}$, suy ra $|a_n - 2| = \tfrac{1}{n} < \varepsilon$. ∎

**Thử với số cụ thể** để thấy "game" vận hành:

| $\varepsilon$ người đòi | cần $n > 1/\varepsilon$ | mốc $N$ chọn | kiểm tra $a_N = 2 + \frac{1}{N}$ |
|---|---|---|---|
| $0.1$ | $n > 10$ | $N = 12$ | $a_{12} = 2.0833$, sai số $0.083 < 0.1$ ✓ |
| $0.01$ | $n > 100$ | $N = 102$ | $a_{102} = 2.0098$, sai số $0.0098 < 0.01$ ✓ |
| $0.001$ | $n > 1000$ | $N = 1002$ | $a_{1002} = 2.000998$, sai số $0.000998 < 0.001$ ✓ |
| $10^{-6}$ | $n > 10^6$ | $N = 10^6 + 2$ | sai số $< 10^{-6}$ ✓ |

Người đòi $\varepsilon$ nhỏ tới đâu, ta luôn có công thức $N = \lceil 1/\varepsilon\rceil + 1$ đáp lại — đó chính là ý nghĩa "$\forall \varepsilon\ \exists N$".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phải $\forall \varepsilon$ rồi mới $\exists N$ — đảo thứ tự được không?"* Không. Thứ tự "với MỌI $\varepsilon$, TỒN TẠI $N$" nghĩa là $N$ được phép **phụ thuộc vào $\varepsilon$** ($\varepsilon$ nhỏ hơn → cần $N$ lớn hơn — đúng như cột "$N$ chọn" tăng dần trong bảng trên). Nếu đảo thành "$\exists N, \forall \varepsilon$" thì 1 mốc $N$ phải thoả mọi $\varepsilon$ — quá mạnh, gần như không dãy nào đạt. Thứ tự lượng từ là linh hồn của định nghĩa.
- *"Giới hạn có thể có 2 giá trị khác nhau không?"* Không — giới hạn nếu tồn tại thì **duy nhất**. Giả sử dãy hội tụ về cả $L_1$ và $L_2$ với $L_1 \neq L_2$: chọn $\varepsilon = \frac{|L_1 - L_2|}{2}$, thì từ một mốc nào đó dãy phải đồng thời nằm trong hai khoảng rời nhau quanh $L_1$ và $L_2$ — vô lý.
- *"$a_n$ có cần thực sự 'đạt' tới $L$ không?"* Không. $\frac{1}{n}$ không bao giờ bằng đúng 0, nhưng vẫn $\lim = 0$. Giới hạn nói về xu hướng tiến gần, không phải về việc chạm tới.

⚠ **Lỗi thường gặp — nhầm "có vô hạn số hạng gần $L$" với "hội tụ về $L$"**. Dãy $0, 1, 0, \frac{1}{2}, 0, \frac{1}{3}, \ldots$ (các số hạng lẻ $= 0$, chẵn $= \frac{1}{k}$) có vô hạn số hạng bằng 0, nhưng KHÔNG hội tụ về 0: với $\varepsilon = 0.4$, dãy vẫn có vô hạn số hạng (các $\frac{1}{k}$ đầu) nằm ngoài $(-0.4, 0.4)$. Hội tụ đòi hỏi **từ $N$ trở đi TẤT CẢ** nằm trong, không phải "có nhiều".

🔁 **Dừng lại tự kiểm tra**

1. Với dãy $a_n = \frac{1}{n}$ và $\varepsilon = 0.02$, mốc $N$ nhỏ nhất thoả $|a_n| < \varepsilon$ với mọi $n \ge N$ là bao nhiêu?
2. Dãy hằng $a_n = 7$ có hội tụ không? Về đâu?

<details><summary>Đáp án</summary>

1. Cần $\frac{1}{n} < 0.02 \iff n > 50$. Vậy $N = 51$ (từ $n = 51$ trở đi $\frac{1}{n} < 0.02$).
2. Có, $\lim = 7$. Với mọi $\varepsilon > 0$, $|7 - 7| = 0 < \varepsilon$ đúng với mọi $n$ → chọn $N = 1$.

</details>

### 📝 Tóm tắt mục 2

- $\lim a_n = L$: khi $n$ đủ lớn, $a_n$ gần $L$ tùy ý.
- Định nghĩa $\varepsilon$-N: $\forall \varepsilon > 0, \exists N, \forall n \ge N: |a_n - L| < \varepsilon$ — thứ tự lượng từ là cốt lõi.
- Giới hạn nếu tồn tại thì **duy nhất**; dãy không cần "đạt" tới $L$, chỉ cần tiến gần.

---

## 3. Phân loại dãy

| Loại | Ý nghĩa | Ví dụ |
|------|---------|-------|
| **Hội tụ** | $\lim$ tồn tại, hữu hạn | $\frac{1}{n} \to 0$ |
| **Phân kỳ về $\pm\infty$** | $a_n \to \infty$ hoặc $-\infty$ | $n^2 \to +\infty$ |
| **Phân kỳ (dao động)** | không có $\lim$ | $(-1)^n$ |

💡 **Trực giác**: ba loại tương ứng ba "số phận" của dãy khi $n \to \infty$: ổn định lại tại 1 số (hội tụ), bay ra vô cực (phân kỳ $\pm\infty$), hay mắc kẹt nhảy qua nhảy lại không bao giờ ổn định (dao động).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phân kỳ về $+\infty$ và dao động — đều không có giới hạn hữu hạn, sao tách ra?"* Vì hành vi khác hẳn: $n^2$ đi theo MỘT hướng rõ ràng (lớn dần mãi), ta nói $\lim = +\infty$ (giới hạn vô cực — vẫn dự đoán được). Còn $(-1)^n$ không theo hướng nào — không gán được cả $\pm\infty$.
- *"Dãy $(-1)^n \cdot n$ thuộc loại nào?"* Cho $-1, 2, -3, 4, -5, \ldots$: độ lớn ra vô cực nhưng dấu đổi → **dao động không bị chặn**, không có giới hạn (kể cả vô cực).

⚠ **Lỗi thường gặp — tưởng "bị chặn" thì "hội tụ"**. $(-1)^n$ bị chặn (luôn nằm trong $[-1, 1]$) nhưng KHÔNG hội tụ. Bị chặn chỉ là điều kiện cần, không đủ. (Điều kiện đủ kinh điển: bị chặn **và** đơn điệu → hội tụ.)

🔁 **Dừng lại tự kiểm tra**

1. Dãy $a_n = (-1)^n \cdot \frac{1}{n}$ ($-1, \frac{1}{2}, -\frac{1}{3}, \ldots$) thuộc loại nào?
2. Dãy $a_n = n - \frac{1}{n}$ thuộc loại nào?

<details><summary>Đáp án</summary>

1. **Hội tụ** về 0 (dù dấu xen kẽ, độ lớn $\frac{1}{n} \to 0$, bị kẹp giữa $-\frac{1}{n}$ và $\frac{1}{n}$).
2. **Phân kỳ về $+\infty$** ($n$ áp đảo, $\frac{1}{n} \to 0$).

</details>

### 📝 Tóm tắt mục 3

- 3 loại: hội tụ ($\lim$ hữu hạn), phân kỳ $\pm\infty$ (đi 1 hướng ra vô cực), dao động (không hướng).
- Bị chặn là điều kiện **cần** chứ không **đủ** để hội tụ ($(-1)^n$ phản ví dụ).
- "Phân kỳ về $+\infty$" vẫn có dự đoán được; "dao động" thì không.

---

## 4. Quy tắc tính giới hạn

Cho $a_n \to A$, $b_n \to B$ (hữu hạn):

$$\begin{aligned}
\lim(a_n + b_n) &= A + B \\
\lim(a_n - b_n) &= A - B \\
\lim(a_n \cdot b_n) &= A \cdot B \\
\lim(a_n / b_n) &= A / B \quad (\text{nếu } B \neq 0) \\
\lim(c \cdot a_n) &= c \cdot A
\end{aligned}$$

⟶ Giống như "đại số bình thường" — cộng/trừ/nhân/chia tự nhiên.

⚠ **Dạng không xác định** (cần biến đổi):
- $\infty - \infty$, $0 \cdot \infty$, $\frac{\infty}{\infty}$, $\frac{0}{0}$, $1^\infty$, $0^0$, $\infty^0$.

💡 **Trực giác — vì sao quy tắc đúng**: nếu $a_n$ ổn định quanh $A$ và $b_n$ quanh $B$ thì $a_n + b_n$ ổn định quanh $A + B$ (sai số tổng = tổng sai số, vẫn nhỏ tùy ý). Đây là lý do "đại số giới hạn" hoạt động như đại số số thực bình thường — nhưng **chỉ khi cả hai giới hạn hữu hạn và tồn tại**.

**Verify quy tắc bằng số** ($a_n = 2 + \frac{1}{n} \to 2$, $b_n = 3 - \frac{1}{n^2} \to 3$):
- $a_n + b_n = 5 + \frac{1}{n} - \frac{1}{n^2}$: tại $n=1000 \approx 5.000999 \to \lim = 5 = 2+3$ ✓.
- $a_n \cdot b_n$: tại $n=1000 \approx 2.001 \cdot 2.999999 \approx 6.00198 \to \lim = 6 = 2 \cdot 3$ ✓.
- $a_n / b_n$: tại $n=1000 \approx 2.001/2.999999 \approx 0.66700 \to \lim = \frac{2}{3} \approx 0.6667$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao $\infty - \infty$ lại 'không xác định' — chẳng phải bằng 0?"* Không. Nó tùy biểu thức cụ thể: $(n+5) - n = 5 \to 5$; $n^2 - n \to +\infty$; $n - (n - 7) = 7 \to 7$. Cùng dạng $\infty - \infty$ mà ra ba kết quả khác nhau → phải biến đổi trước khi kết luận.
- *"Quy tắc thương cần $B \neq 0$ — nếu $B = 0$ thì sao?"* Rơi vào dạng vô định $\frac{0}{0}$ (nếu $A = 0$) hoặc tiến ra $\pm\infty$ (nếu $A \neq 0$). Cả hai trường hợp đều cần xử lý riêng, không dùng được quy tắc thương trực tiếp.

⚠ **Lỗi thường gặp — áp quy tắc khi giới hạn KHÔNG tồn tại**. $\lim[(-1)^n + (-1)^{n+1}]$: từng hạng không có giới hạn, nhưng tổng $= 0$ với mọi $n \to \lim = 0$. Không được viết "$= \lim(-1)^n + \lim(-1)^{n+1}$" vì hai $\lim$ đó không tồn tại — quy tắc tổng chỉ áp khi cả hai $\lim$ tồn tại.

### 4.1. Walk-through 5 ví dụ tính giới hạn — từng bước

Đây là "bộ kỹ thuật" cốt lõi. Quy tắc chung khi gặp $\frac{\infty}{\infty}$: **chia tử và mẫu cho lũy thừa $n$ cao nhất** xuất hiện. Khi gặp $\infty - \infty$ có căn: **nhân liên hợp**.

**Ví dụ 1 — phân thức cùng bậc (bậc tử = bậc mẫu).** $\displaystyle\lim_{n\to\infty} \frac{3n^2 + 2n}{5n^2 - 1}$.

Dạng $\frac{\infty}{\infty}$. Lũy thừa cao nhất là $n^2$, chia cả tử mẫu cho $n^2$:
$$\frac{3n^2 + 2n}{5n^2 - 1} = \frac{3 + \frac{2}{n}}{5 - \frac{1}{n^2}} \xrightarrow{n\to\infty} \frac{3 + 0}{5 - 0} = \frac{3}{5}.$$
**Quy luật**: bậc tử = bậc mẫu → giới hạn = **tỉ số hệ số bậc cao nhất** ($3/5$). Verify $n=1000$: $\frac{3\,002\,000}{4\,999\,999} \approx 0.60040 \approx \frac{3}{5}$ ✓.

**Ví dụ 2 — bậc mẫu cao hơn (tử nhỏ hơn).** $\displaystyle\lim \frac{4n + 7}{n^2 + 1}$.

Chia cho $n^2$: $\dfrac{\frac{4}{n} + \frac{7}{n^2}}{1 + \frac{1}{n^2}} \to \dfrac{0 + 0}{1 + 0} = \mathbf{0}$. **Quy luật**: bậc tử $<$ bậc mẫu → giới hạn $= 0$. Verify $n=1000$: $\frac{4007}{1\,000\,001} \approx 0.004 \to 0$ ✓.

**Ví dụ 3 — bậc tử cao hơn (phân kỳ).** $\displaystyle\lim \frac{n^2 + 1}{2n + 3}$.

Chia cho $n$ (bậc cao của mẫu): $\dfrac{n + \frac{1}{n}}{2 + \frac{3}{n}} \to \dfrac{+\infty}{2} = +\infty$. **Quy luật**: bậc tử $>$ bậc mẫu → phân kỳ ra $\pm\infty$. Verify $n=1000$: $\frac{1\,000\,001}{2003} \approx 499.3$ — lớn dần ✓.

**Ví dụ 4 — nhân liên hợp ($\infty - \infty$).** $\displaystyle\lim \left(\sqrt{n^2 + n} - n\right)$.

Trực tiếp là $\infty - \infty$ (vô định). Nhân và chia cho liên hợp $\sqrt{n^2+n} + n$:
$$\begin{aligned}
\sqrt{n^2+n} - n &= \frac{(\sqrt{n^2+n} - n)(\sqrt{n^2+n} + n)}{\sqrt{n^2+n} + n} \\
&= \frac{(n^2 + n) - n^2}{\sqrt{n^2+n} + n} = \frac{n}{\sqrt{n^2+n} + n}.
\end{aligned}$$
Chia tử mẫu cho $n$ (lưu ý $\sqrt{n^2+n} = n\sqrt{1 + \frac{1}{n}}$):
$$= \frac{1}{\sqrt{1 + \frac{1}{n}} + 1} \xrightarrow{n\to\infty} \frac{1}{\sqrt{1} + 1} = \frac{1}{2}.$$
Verify $n=1000$: $\sqrt{1\,001\,000} - 1000 \approx 1000.4998 - 1000 = 0.4998 \to \frac12$ ✓. (Khác hẳn ví dụ 3 ở mục Bài tập với $\sqrt{n^2+1}-n \to 0$ — chi tiết bên trong căn quyết định kết quả.)

**Ví dụ 5 — biến tấu của $\left(1+\frac1n\right)^n$.** $\displaystyle\lim \left(1 - \frac{1}{n}\right)^n$.

Đây là dạng $1^\infty$. Viết lại để lộ dạng chuẩn: đặt $m = -n$, hoặc dùng kết quả tổng quát $\left(1 + \frac{a}{n}\right)^n \to e^a$. Ở đây $a = -1$ nên
$$\lim \left(1 - \frac{1}{n}\right)^n = e^{-1} = \frac{1}{e} \approx 0.3679.$$
Verify $n=1000$: $0.999^{1000} \approx 0.3677 \to \frac1e$ ✓. (Đối lập với $\left(1+\frac1n\right)^n \to e \approx 2.718$ — dấu của $a$ quyết định kết quả nằm trên hay dưới 1.)

📝 **Bảng quy luật phân thức** (ghi nhớ nhanh, $P,Q$ là đa thức):

| Quan hệ bậc | $\lim \frac{P(n)}{Q(n)}$ | Ví dụ |
|---|---|---|
| bậc $P$ < bậc $Q$ | $0$ | $\frac{4n+7}{n^2+1} \to 0$ |
| bậc $P$ = bậc $Q$ | tỉ số hệ số đầu | $\frac{3n^2+2n}{5n^2-1} \to \frac{3}{5}$ |
| bậc $P$ > bậc $Q$ | $\pm\infty$ (phân kỳ) | $\frac{n^2+1}{2n+3} \to +\infty$ |

🔁 **Dừng lại tự kiểm tra**

1. Tính $\lim (5 - \frac{3}{n})(2 + \frac{1}{n})$.
2. Dạng của $\lim (n^2 - n)$ khi $n \to \infty$ là gì, và bằng bao nhiêu?
3. Tính $\lim \frac{2n^3 - n}{4n^3 + n^2}$ bằng quy luật bậc.
4. Tính $\lim \left(1 + \frac{3}{n}\right)^n$.

<details><summary>Đáp án</summary>

1. $= 5 \cdot 2 = 10$ (cả hai thừa số hội tụ → dùng quy tắc tích).
2. Dạng $\infty - \infty$; biến đổi $n^2 - n = n(n-1) \to +\infty$.
3. Bậc tử = bậc mẫu $= 3$ → tỉ số hệ số đầu $= \frac{2}{4} = \frac{1}{2}$.
4. Dạng $\left(1 + \frac{a}{n}\right)^n \to e^a$ với $a = 3$ → $e^3 \approx 20.09$.

</details>

### 📝 Tóm tắt mục 4

- Khi $a_n \to A$, $b_n \to B$ hữu hạn: $\lim$ phân phối qua $+, -, \cdot, /$ (thương cần $B \neq 0$).
- Quy tắc chỉ áp khi **cả hai giới hạn tồn tại** — không thì phải biến đổi trước.
- 7 dạng vô định ($\frac{0}{0}$, $\frac{\infty}{\infty}$, $\infty-\infty$, $0 \cdot \infty$, $1^\infty$, $0^0$, $\infty^0$) cần xử lý riêng.

---

## 5. Hai giới hạn nổi tiếng

### 5.1. $\left(1 + \frac{1}{n}\right)^n \to e$

$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e \approx 2.71828\ldots$$

**Tính cụ thể**:
- $n=1$: $(1+1)^1 = 2$.
- $n=10$: $1.1^{10} \approx 2.5937$.
- $n=100$: $1.01^{100} \approx 2.7048$.
- $n=1000$: $\approx 2.7169$.
- $n=10^6$: $\approx 2.71828$.

💡 **Vì sao quan trọng**: Định nghĩa số $e$. Liên quan đến lãi kép, $e^x$ là duy nhất hàm có đạo hàm = chính nó.

### 5.2. $\frac{\sin x}{x} \to 1$ khi $x \to 0$

(Áp dụng cho dãy $x_n \to 0$):

$$\lim \frac{\sin x}{x} = 1 \quad \text{khi } x \to 0$$

**Hệ quả** (dùng nhiều khi tính đạo hàm $\sin x$):
- $\lim \frac{1 - \cos x}{x} = 0$.
- $\lim \frac{\tan x}{x} = 1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\left(1 + \frac{1}{n}\right)^n$ là dạng $1^\infty$ — sao không bằng 1?"* Vì đây đúng là dạng **vô định**: cơ số $1 + \frac{1}{n}$ tiến tới 1 (đẩy kết quả về 1) nhưng số mũ $n$ ra vô cực (đẩy kết quả lên). Hai lực đối nghịch "cân bằng" tại $e \approx 2.718$, không phải 1 cũng không phải $\infty$. Bảng số ở trên cho thấy nó hội tụ chầm chậm về 2.718.
- *"$\frac{\sin x}{x}$ tại $x = 0$ là $\frac{0}{0}$ — sao bằng 1?"* Vì khi $x$ rất nhỏ (radian), $\sin x \approx x$ (cung gần bằng dây). Tại $x = 0.01$: $\frac{\sin(0.01)}{0.01} = \frac{0.00999983}{0.01} \approx 0.99998 \to$ tiến 1. **Bắt buộc dùng radian**, không phải độ.

⚠ **Lỗi thường gặp — dùng độ thay vì radian cho $\frac{\sin x}{x}$**. Nếu $x$ tính bằng độ, $\frac{\sin(1^\circ)}{1} = \frac{0.01745\ldots}{1} \approx 0.01745$, KHÔNG tiến về 1. Giới hạn $\frac{\sin x}{x} \to 1$ chỉ đúng với **radian** — đây là một trong các lý do giải tích luôn dùng radian.

🔁 **Dừng lại tự kiểm tra**

1. $\lim \left(1 + \frac{1}{n}\right)^{2n} = ?$
2. $\lim_{x \to 0} \frac{\sin(5x)}{x} = ?$

<details><summary>Đáp án</summary>

1. $\left(1+\frac{1}{n}\right)^{2n} = \left[\left(1+\frac{1}{n}\right)^n\right]^2 \to e^2 \approx 7.389$.
2. Viết $\frac{\sin(5x)}{x} = 5 \cdot \frac{\sin(5x)}{5x} \to 5 \cdot 1 = 5$.

</details>

### 📝 Tóm tắt mục 5

- $\left(1 + \frac{1}{n}\right)^n \to e \approx 2.71828$ — dạng vô định $1^\infty$, định nghĩa số $e$.
- $\frac{\sin x}{x} \to 1$ khi $x \to 0$ (radian); kéo theo $\frac{1-\cos x}{x} \to 0$, $\frac{\tan x}{x} \to 1$.
- Hai giới hạn này là nền tảng cho đạo hàm hàm mũ và lượng giác (L03).

---

## 6. Định lý kẹp (Squeeze Theorem)

Nếu $a_n \le b_n \le c_n$ và $\lim a_n = \lim c_n = L$, thì **$\lim b_n = L$**.

💡 **Trực giác**: Nếu $b$ bị "kẹp" giữa 2 dãy đều dần về $L$, thì $b$ cũng phải dần về $L$.

**Ví dụ**: Tính $\lim \frac{\sin(n)}{n}$.
- $|\sin n| \le 1 \to -\frac{1}{n} \le \frac{\sin(n)}{n} \le \frac{1}{n}$.
- Cả 2 đầu $\to 0$. ⟶ $\lim \frac{\sin(n)}{n} =$ **0**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không tính $\lim \sin(n)$ trực tiếp rồi chia cho $\lim n$?"* Vì $\lim \sin(n)$ KHÔNG tồn tại ($\sin n$ dao động vô tận trong $[-1,1]$ khi $n$ chạy), còn $\lim n = \infty \to$ rơi vào dạng vô định. Định lý kẹp né hẳn việc đó: ta không cần biết $\frac{\sin(n)}{n}$ xử sự ra sao, chỉ cần hai dãy chặn đều về 0.
- *"Hai dãy chặn phải về CÙNG một giới hạn?"* Đúng, bắt buộc. Nếu $\lim a_n = 0$ nhưng $\lim c_n = 1$ thì định lý không kết luận gì — $b_n$ có thể lảng vảng bất kỳ đâu trong $[0, 1]$.

⚠ **Lỗi thường gặp — chặn không đúng chiều hoặc hai cận khác giới hạn**. Muốn kẹp $b_n$, phải có $a_n \le b_n \le c_n$ **đúng từ một mốc trở đi** và $\lim a_n = \lim c_n$. Vd chặn $\frac{\sin(n)}{n}$ bằng $-1 \le \frac{\sin(n)}{n} \le 1$ là vô dụng (hai cận $-1, 1$ không bằng nhau) — phải chia thêm $n$ để có $-\frac{1}{n} \le \ldots \le \frac{1}{n}$.

🔁 **Dừng lại tự kiểm tra**

1. Dùng định lý kẹp tính $\lim \frac{\cos(n^2)}{n}$.
2. Tại sao không kẹp được $\lim \sin(n)$ (không chia $n$)?

<details><summary>Đáp án</summary>

1. $-\frac{1}{n} \le \frac{\cos(n^2)}{n} \le \frac{1}{n}$, hai cận $\to 0 \to \lim = 0$.
2. Cận tự nhiên là $-1 \le \sin(n) \le 1$ nhưng $\lim(-1) = -1 \neq 1 = \lim(1) \to$ không kẹp được; thực tế $\lim \sin(n)$ không tồn tại.

</details>

### 📝 Tóm tắt mục 6

- Định lý kẹp: $a_n \le b_n \le c_n$ và $\lim a_n = \lim c_n = L \implies \lim b_n = L$.
- Dùng cho dãy "khó trực tiếp" nhưng bị chặn giữa hai dãy đơn giản (vd có $\sin n$, $\cos n$).
- Hai cận **bắt buộc cùng giới hạn**; chặn lệch chiều/khác $L$ là vô dụng.

---

## 7. Dãy đơn điệu & bị chặn → hội tụ

💡 **Trực giác — leo cầu thang có trần.** Hình dung dãy như một người **chỉ đi lên** (không bao giờ lùi) nhưng phía trên có một **cái trần** không thể vượt. Người đó càng leo càng chậm lại sát trần, không thể đi mãi (trần chặn) cũng không quay đầu (chỉ tăng) → buộc phải **ổn định lại** tại một độ cao nào đó $\le$ trần. Đó chính là lý do dãy tăng và bị chặn trên thì hội tụ.

> 📐 **Định nghĩa — Đơn điệu (monotone) và Bị chặn (bounded)**
>
> **(a) Là gì**:
> - Dãy **tăng** (increasing) nếu $a_{n+1} \ge a_n$ với mọi $n$; **giảm** (decreasing) nếu $a_{n+1} \le a_n$. Gọi chung là **đơn điệu**.
> - Dãy **bị chặn trên** nếu $\exists M: a_n \le M\ \forall n$; **bị chặn dưới** nếu $\exists m: a_n \ge m$; **bị chặn** nếu cả hai.
>
> **(b) Vì sao cần**: $\varepsilon$-N chứng minh được hội tụ nhưng **đòi phải biết trước $L$**. Với dãy đệ quy (vd lãi kép, lặp Newton) ta thường **không biết $L$ là số nào**. Định lý đơn điệu + bị chặn cho phép kết luận "dãy hội tụ" mà **chưa cần tìm $L$** — một công cụ tồn tại (existence) cực mạnh.
>
> **(c) Định lý hội tụ đơn điệu**: *Dãy tăng và bị chặn trên thì hội tụ (về cận trên đúng — supremum). Dãy giảm và bị chặn dưới thì hội tụ (về cận dưới đúng).*

**Walk-through 4 ví dụ**:

**Ví dụ 1 — $a_n = 1 - \frac{1}{n}$**: $1, \frac12, \frac23, \frac34, \ldots$ (tức $0, 0.5, 0.667, 0.75, \ldots$). Tăng vì $a_{n+1} - a_n = \frac1n - \frac1{n+1} = \frac{1}{n(n+1)} > 0$; bị chặn trên bởi $1$ (vì $\frac1n > 0$). → Hội tụ, $\lim = 1$.

**Ví dụ 2 — $a_n = \frac{n}{n+1}$**: $\frac12, \frac23, \frac34, \ldots \to$ giống ví dụ 1, tăng và chặn trên bởi $1$ → hội tụ về $1$. Verify: $a_{1000} = \frac{1000}{1001} \approx 0.999$ ✓.

**Ví dụ 3 — dãy đệ quy $a_1 = 1,\ a_{n+1} = \sqrt{2 + a_n}$**: $1, \sqrt3 \approx 1.732, \sqrt{3.732}\approx 1.932, 1.983, 1.996, \ldots$
- *Tăng?* Bằng quy nạp: $a_2 = 1.732 > 1 = a_1$; giả sử $a_n > a_{n-1}$ thì $a_{n+1} = \sqrt{2+a_n} > \sqrt{2+a_{n-1}} = a_n$. → tăng.
- *Bị chặn trên bởi $2$?* $a_1 = 1 < 2$; nếu $a_n < 2$ thì $a_{n+1} = \sqrt{2+a_n} < \sqrt{2+2} = 2$. → chặn bởi $2$.
- → Hội tụ. **Tìm $L$**: lấy $\lim$ hai vế $L = \sqrt{2+L} \Rightarrow L^2 = 2 + L \Rightarrow L^2 - L - 2 = 0 \Rightarrow (L-2)(L+1)=0 \Rightarrow L = 2$ (loại $L=-1$ vì dãy dương). Khớp bảng số ✓.

**Ví dụ 4 — chính $\left(1 + \frac{1}{n}\right)^n$ (mục 5) hội tụ về $e$ vì sao?** Chứng minh chuẩn dùng đúng định lý này: dãy này **tăng** và **bị chặn trên bởi $3$**, nên hội tụ — và giới hạn được đặt tên là $e$. Bảng $2, 2.25, 2.37, 2.44, \ldots < 3$ minh họa.

⚠ **Lỗi thường gặp — bỏ một trong hai điều kiện.**
- Chỉ **tăng** mà **không chặn**: $a_n = n$ tăng nhưng $\to +\infty$, **không hội tụ**.
- Chỉ **bị chặn** mà **không đơn điệu**: $(-1)^n$ bị chặn trong $[-1,1]$ nhưng dao động, **không hội tụ** (đã gặp ở mục 3). → Cần **CẢ HAI** điều kiện; thiếu một là phản ví dụ ngay.

🔁 **Dừng lại tự kiểm tra**

1. Dãy $a_n = \frac{2n-1}{n}$ có đơn điệu và bị chặn không? Hội tụ về đâu?
2. Dãy đệ quy $a_1 = 2,\ a_{n+1} = \frac{a_n}{2} + 1$ — chứng minh hội tụ rồi tìm $\lim$.

<details><summary>Đáp án</summary>

1. $a_n = 2 - \frac1n$: tăng (vì $-\frac1n$ tăng), chặn trên bởi $2$ → hội tụ, $\lim = 2$.
2. $a_1 = 2, a_2 = 2, a_3 = 2, \ldots$ — thực ra hằng $= 2$ (vì $\frac22 + 1 = 2$). Hội tụ về $2$. Tổng quát: giải $L = \frac L2 + 1 \Rightarrow L = 2$.

</details>

### 📝 Tóm tắt mục 7

- **Định lý hội tụ đơn điệu**: tăng + chặn trên → hội tụ; giảm + chặn dưới → hội tụ.
- Sức mạnh: chứng minh **tồn tại** giới hạn **mà chưa cần biết $L$** — rồi tìm $L$ bằng $L = f(L)$ với dãy đệ quy $a_{n+1} = f(a_n)$.
- Cần **CẢ HAI** điều kiện: chỉ tăng ($n$) hoặc chỉ chặn ($(-1)^n$) đều có thể không hội tụ.

---

## 8. Dãy con (subsequence)

💡 **Trực giác — chọn lọc một số ghế.** Từ dãy gốc $a_1, a_2, a_3, \ldots$, ta **lấy ra một số phần tử theo thứ tự tăng dần của chỉ số** (bỏ bớt, không đảo). Vd từ $a_1, a_2, a_3, a_4, \ldots$ lấy các chỉ số chẵn → dãy con $a_2, a_4, a_6, \ldots$ Ký hiệu $(a_{n_k})$ với $n_1 < n_2 < n_3 < \cdots$

**Ví dụ** với dãy gốc $c_n = (-1)^n$: $-1, 1, -1, 1, \ldots$
- Dãy con chỉ số **chẵn** $c_{2k} = (-1)^{2k} = 1$: $1, 1, 1, \ldots \to 1$.
- Dãy con chỉ số **lẻ** $c_{2k-1} = -1$: $-1, -1, \ldots \to -1$.

> 📐 **Định lý (liên hệ dãy con ↔ hội tụ)**: Nếu $a_n \to L$ thì **mọi** dãy con cũng $\to L$. Hệ quả (đảo ngược dùng để chứng minh **phân kỳ**): nếu tìm được **hai dãy con tiến về hai giới hạn khác nhau**, dãy gốc **không hội tụ**.

**Đây là công cụ chứng minh phân kỳ gọn nhất.** Với $(-1)^n$: dãy con chẵn $\to 1$, dãy con lẻ $\to -1$, $1 \neq -1$ → $(-1)^n$ **không hội tụ** (không cần $\varepsilon$-N). So với cách ở mục 2 (chọn $\varepsilon = 0.5$) thì cách dãy con trực quan hơn.

**4 ví dụ áp dụng**:

| Dãy gốc | Dãy con chẵn $a_{2k}$ | Dãy con lẻ $a_{2k-1}$ | Kết luận |
|---|---|---|---|
| $(-1)^n$ | $\to 1$ | $\to -1$ | phân kỳ (2 limit khác) |
| $(-1)^n \frac{1}{n}$ | $\frac{1}{2k} \to 0$ | $-\frac{1}{2k-1} \to 0$ | hội tụ về $0$ (2 limit bằng) |
| $\sin\frac{n\pi}{2}$: $1,0,-1,0,\ldots$ | $0,0,\ldots \to 0$ | $1,-1,1,\ldots$ phân kỳ | phân kỳ |
| $\frac{1}{n}$ | $\frac{1}{2k}\to 0$ | $\frac{1}{2k-1}\to 0$ | hội tụ về $0$ |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai dãy con cùng giới hạn thì dãy gốc có hội tụ không?"* **Chưa chắc, trừ khi chúng phủ hết.** Nếu dãy con chẵn và dãy con lẻ **cùng** $\to L$ thì vì hai dãy con này gộp lại đúng bằng toàn bộ dãy gốc nên dãy gốc $\to L$ (vd dòng 2 và 4 trong bảng). Nhưng nếu chỉ một dãy con $\to L$ thì không kết luận được gì cho dãy gốc.
- *"Dãy bị chặn có luôn chứa dãy con hội tụ không?"* **Có** — đó là **định lý Bolzano–Weierstrass**: mọi dãy số thực **bị chặn** đều có **ít nhất một dãy con hội tụ**. Vd $(-1)^n$ bị chặn, tuy không hội tụ nhưng có dãy con chẵn $\to 1$. Đây là một trụ cột của giải tích, sẽ gặp lại khi học tính compact.

⚠ **Lỗi thường gặp — tưởng "có MỘT dãy con hội tụ thì dãy gốc hội tụ".** Sai. $(-1)^n$ có dãy con chẵn hội tụ về $1$ nhưng bản thân nó phân kỳ. Một dãy con hội tụ chỉ chứng minh "tồn tại điểm tụ", không chứng minh dãy gốc hội tụ.

🔁 **Dừng lại tự kiểm tra**

1. Dùng dãy con chứng minh $a_n = \cos(n\pi)$ phân kỳ.
2. Dãy $a_n = \frac{(-1)^n n}{n+1}$ có hội tụ không?

<details><summary>Đáp án</summary>

1. $\cos(n\pi) = (-1)^n$: dãy con chẵn $\to 1$, lẻ $\to -1$ → phân kỳ.
2. Dãy con chẵn $\frac{2k}{2k+1} \to 1$, dãy con lẻ $\frac{-(2k-1)}{2k} \to -1$. Hai limit khác → **phân kỳ**.

</details>

### 📝 Tóm tắt mục 8

- Dãy con = lấy bớt phần tử theo thứ tự chỉ số tăng $(a_{n_k})$.
- $a_n \to L \Rightarrow$ mọi dãy con $\to L$; **ngược lại** dùng để chứng minh phân kỳ: 2 dãy con khác limit → gốc phân kỳ.
- **Bolzano–Weierstrass**: dãy bị chặn luôn có dãy con hội tụ.

---

## 9. Cấp số cộng & cấp số nhân

Hai họ dãy đặc biệt, xuất hiện khắp nơi (lãi kép, khấu hao, chuỗi hình học). Chúng có **công thức tổng** đẹp — nền tảng cho chuỗi (series) sau này.

### 9.1. Cấp số cộng (arithmetic progression)

💡 **Trực giác — bước đều.** Mỗi số hơn số trước một lượng **cố định** $d$ (công sai). Như leo cầu thang mỗi bậc cao đúng $d$ cm.

> 📐 **Định nghĩa**: $a_{n+1} = a_n + d$. Số hạng tổng quát: $a_n = a_1 + (n-1)d$. Tổng $n$ số hạng đầu:
> $$S_n = a_1 + a_2 + \cdots + a_n = \frac{n(a_1 + a_n)}{2} = \frac{n\big(2a_1 + (n-1)d\big)}{2}.$$

💡 **Vì sao công thức tổng đúng — mẹo Gauss.** Viết tổng xuôi rồi ngược, cộng theo cột:
$$\begin{aligned}
S_n &= a_1 + a_2 + \cdots + a_n \\
S_n &= a_n + a_{n-1} + \cdots + a_1 \\
\hline
2S_n &= \underbrace{(a_1+a_n) + (a_1+a_n) + \cdots + (a_1+a_n)}_{n \text{ cặp, mỗi cặp} = a_1 + a_n}
\end{aligned}$$
→ $2S_n = n(a_1 + a_n) \Rightarrow S_n = \frac{n(a_1+a_n)}{2}$. (Gauss lúc 9 tuổi tính $1+2+\cdots+100 = \frac{100\cdot 101}{2} = 5050$ kiểu này.)

**4 ví dụ**:

1. **$1, 2, 3, \ldots, 100$** ($a_1=1, d=1$): $S_{100} = \frac{100(1+100)}{2} = 5050$.
2. **$2, 5, 8, 11, \ldots$** ($a_1=2, d=3$): số hạng thứ $10$ là $a_{10} = 2 + 9\cdot 3 = 29$; tổng $10$ số đầu $S_{10} = \frac{10(2+29)}{2} = 155$.
3. **Số lẻ $1, 3, 5, \ldots, (2n-1)$** ($a_1=1, d=2$): $S_n = \frac{n(1 + (2n-1))}{2} = \frac{n\cdot 2n}{2} = n^2$. (Tổng $n$ số lẻ đầu $= n^2$ — vd $1+3+5+7 = 16 = 4^2$ ✓.)
4. **Giảm $20, 17, 14, \ldots$** ($a_1=20, d=-3$): $a_5 = 20 + 4(-3) = 8$; $S_5 = \frac{5(20+8)}{2} = 70$.

⚠ **Lỗi thường gặp — nhầm $(n-1)$ thành $n$ trong $a_n$.** Số hạng thứ $n$ là $a_1 + (n-1)d$, **không** phải $a_1 + nd$. Phản chứng: $2,5,8,\ldots$ thì $a_1 = 2 = 2 + 0\cdot 3$ (đúng), còn $2 + 1\cdot 3 = 5 = a_2$ (lệch 1 chỉ số). Số hạng đầu ứng với $(n-1) = 0$.

### 9.2. Cấp số nhân (geometric progression)

💡 **Trực giác — nhân đều.** Mỗi số bằng số trước nhân với **công bội** $r$ cố định. Như tế bào phân đôi ($r=2$) hay phóng xạ giảm nửa ($r = \frac12$).

> 📐 **Định nghĩa**: $a_{n+1} = a_n \cdot r$. Số hạng tổng quát: $a_n = a_1 \cdot r^{n-1}$. Tổng $n$ số hạng đầu (với $r \neq 1$):
> $$S_n = a_1 \frac{1 - r^n}{1 - r}.$$
> **Tổng vô hạn** (chỉ khi $|r| < 1$, vì khi đó $r^n \to 0$):
> $$S_\infty = \lim_{n\to\infty} S_n = \frac{a_1}{1 - r}.$$

💡 **Vì sao công thức $S_n$ đúng.** Nhân $S_n$ với $r$ rồi trừ:
$$\begin{aligned}
S_n &= a_1 + a_1 r + a_1 r^2 + \cdots + a_1 r^{n-1} \\
r S_n &= \phantom{a_1 +{}} a_1 r + a_1 r^2 + \cdots + a_1 r^{n-1} + a_1 r^n \\
\hline
S_n - rS_n &= a_1 - a_1 r^n
\end{aligned}$$
→ $S_n(1 - r) = a_1(1 - r^n) \Rightarrow S_n = a_1\frac{1-r^n}{1-r}$. Các hạng giữa triệt tiêu hết (telescoping).

**4 ví dụ**:

1. **$1, 2, 4, 8, \ldots$** ($a_1=1, r=2$): $a_8 = 1\cdot 2^7 = 128$; $S_8 = 1\cdot\frac{1 - 2^8}{1-2} = \frac{-255}{-1} = 255$. ($|r|=2>1$ → **không** có tổng vô hạn.)
2. **$1, \frac12, \frac14, \frac18, \ldots$** ($a_1=1, r=\frac12$): $S_4 = \frac{1 - (1/2)^4}{1 - 1/2} = \frac{15/16}{1/2} = \frac{15}{8} = 1.875$; tổng vô hạn $S_\infty = \frac{1}{1 - 1/2} = 2$. (Nghịch lý Zeno: $\frac12 + \frac14 + \frac18 + \cdots = 1$, tức $S_\infty - a_1 = 2 - 1 = 1$.)
3. **$3, -6, 12, -24, \ldots$** ($a_1=3, r=-2$): $S_4 = 3\cdot\frac{1 - (-2)^4}{1-(-2)} = 3\cdot\frac{1-16}{3} = -15$. Kiểm tra: $3 - 6 + 12 - 24 = -15$ ✓.
4. **$100, 10, 1, 0.1, \ldots$** ($a_1=100, r=\frac{1}{10}$): tổng vô hạn $S_\infty = \frac{100}{1 - 0.1} = \frac{100}{0.9} = \frac{1000}{9} \approx 111.11$. (Chính là $111.111\ldots$ — số $0.\overline{1}\times 1000$.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tổng vô hạn chỉ có khi $|r| < 1$?"* Vì $S_n = a_1\frac{1-r^n}{1-r}$, mà phần $r^n$: nếu $|r|<1$ thì $r^n \to 0$ → $S_n \to \frac{a_1}{1-r}$ (hữu hạn). Nếu $|r| \ge 1$ thì $r^n$ **không** dần về 0 (vd $2^n \to \infty$, $(-1)^n$ dao động) → tổng phân kỳ. Đây là cầu nối tới chuỗi (series) ở các lesson sau.
- *"$0.999\ldots$ có thật sự bằng $1$?"* Có. $0.999\ldots = \frac{9}{10} + \frac{9}{100} + \cdots$ là cấp số nhân $a_1 = \frac{9}{10}, r = \frac{1}{10}$, tổng $= \frac{9/10}{1 - 1/10} = \frac{9/10}{9/10} = 1$. Cấp số nhân giải thích chính xác bằng giới hạn, không phải "xấp xỉ".

⚠ **Lỗi thường gặp — áp công thức tổng vô hạn khi $|r| \ge 1$.** $1 + 2 + 4 + 8 + \cdots$ có $r = 2$; viết "$\frac{1}{1-2} = -1$" là **sai bét** (tổng các số dương không thể âm). Công thức $\frac{a_1}{1-r}$ **chỉ** hợp lệ khi $|r| < 1$. Luôn kiểm tra $|r|$ trước.

🔁 **Dừng lại tự kiểm tra**

1. Cấp số cộng $a_1 = 3, d = 4$. Tính $a_{10}$ và $S_{10}$.
2. Cấp số nhân $a_1 = 2, r = \frac13$. Tính tổng vô hạn.
3. Đổi $0.4545\ldots$ ($= 0.\overline{45}$) thành phân số bằng cấp số nhân.

<details><summary>Đáp án</summary>

1. $a_{10} = 3 + 9\cdot 4 = 39$; $S_{10} = \frac{10(3 + 39)}{2} = 210$.
2. $S_\infty = \frac{2}{1 - 1/3} = \frac{2}{2/3} = 3$.
3. $0.\overline{45} = \frac{45}{100} + \frac{45}{10000} + \cdots$, $a_1 = \frac{45}{100}, r = \frac{1}{100}$ → $S = \frac{45/100}{1 - 1/100} = \frac{45/100}{99/100} = \frac{45}{99} = \frac{5}{11}$.

</details>

### 📝 Tóm tắt mục 9

- **Cấp số cộng**: $a_n = a_1 + (n-1)d$; $S_n = \frac{n(a_1+a_n)}{2}$ (mẹo Gauss xuôi-ngược).
- **Cấp số nhân**: $a_n = a_1 r^{n-1}$; $S_n = a_1\frac{1-r^n}{1-r}$; tổng vô hạn $S_\infty = \frac{a_1}{1-r}$ **chỉ khi** $|r| < 1$.
- Ứng dụng: lãi kép, nghịch lý Zeno, đổi số thập phân vô hạn tuần hoàn ↔ phân số.

---

## 10. Bài tập

### Bài tập

**Bài 1**: Tính $\lim \frac{3n + 5}{2n - 1}$.

**Bài 2**: Tính $\lim \frac{n^2 + 2}{n^3}$.

**Bài 3**: Tính $\lim (\sqrt{n^2+1} - n)$. (Gợi ý: nhân liên hợp.)

**Bài 4**: Tính $\lim \left(1 + \frac{2}{n}\right)^n$.

**Bài 5**: Dãy $a_n = \frac{\cos(n\pi/3)}{n}$. Tính $\lim a_n$.

**Bài 6**: Dãy đệ quy $a_1 = 1,\ a_{n+1} = \sqrt{6 + a_n}$. Chứng minh dãy hội tụ và tìm $\lim$.

**Bài 7**: Dùng dãy con chứng minh $a_n = (-1)^n \cdot \frac{n+1}{n}$ phân kỳ.

**Bài 8**: Cấp số cộng có $a_3 = 7$ và $a_7 = 19$. Tìm $a_1$, công sai $d$, và tổng $S_{10}$.

**Bài 9**: Tính tổng vô hạn $\frac{2}{3} + \frac{2}{9} + \frac{2}{27} + \cdots$.

**Bài 10**: Đổi số thập phân tuần hoàn $0.\overline{27} = 0.272727\ldots$ thành phân số.

### Lời giải

**Bài 1**: Chia tử mẫu cho $n$: $\lim \frac{3 + 5/n}{2 - 1/n} = \frac{3+0}{2-0} =$ **$\frac{3}{2}$**.

**Bài 2**: Chia cho $n^3$: $\lim \left(\frac{1}{n} + \frac{2}{n^3}\right) = 0 + 0 =$ **0**.

**Bài 3**: $\frac{(\sqrt{n^2+1} - n)(\sqrt{n^2+1} + n)}{\sqrt{n^2+1} + n} = \frac{n^2+1 - n^2}{\sqrt{n^2+1} + n} = \frac{1}{\sqrt{n^2+1} + n} \to \frac{1}{\infty+\infty} =$ **0**.

**Bài 4**: $\left(1 + \frac{2}{n}\right)^n = \left[\left(1 + \frac{1}{n/2}\right)^{n/2}\right]^2 \to e^2 \approx$ **7.389**.

**Bài 5**: $|\cos(n\pi/3)| \le 1 \to -\frac{1}{n} \le a_n \le \frac{1}{n} \to$ kẹp về **0**.

**Bài 6**: (dùng định lý hội tụ đơn điệu, mục 7)
- *Bị chặn trên bởi $3$*: $a_1 = 1 < 3$; nếu $a_n < 3$ thì $a_{n+1} = \sqrt{6 + a_n} < \sqrt{6+3} = 3$ (quy nạp).
- *Tăng*: $a_2 = \sqrt{7} \approx 2.646 > 1 = a_1$; nếu $a_n > a_{n-1}$ thì $\sqrt{6+a_n} > \sqrt{6+a_{n-1}}$, tức $a_{n+1} > a_n$.
- Tăng + chặn trên → **hội tụ**. Tìm $L$: $L = \sqrt{6+L} \Rightarrow L^2 - L - 6 = 0 \Rightarrow (L-3)(L+2) = 0 \Rightarrow L = 3$ (loại $-2$). Bảng: $1, 2.646, 2.940, 2.990, \ldots \to$ **3** ✓.

**Bài 7**: Xét hai dãy con.
- Chỉ số chẵn $a_{2k} = (+1)\cdot\frac{2k+1}{2k} \to 1$.
- Chỉ số lẻ $a_{2k-1} = (-1)\cdot\frac{2k}{2k-1} \to -1$.
- Hai dãy con tiến về $1$ và $-1$ ($\neq$ nhau) → dãy gốc **phân kỳ**.

**Bài 8**: Cấp số cộng $a_n = a_1 + (n-1)d$.
- $a_7 - a_3 = (a_1 + 6d) - (a_1 + 2d) = 4d = 19 - 7 = 12 \Rightarrow d = 3$.
- $a_3 = a_1 + 2d = a_1 + 6 = 7 \Rightarrow a_1 = 1$.
- $a_{10} = 1 + 9\cdot 3 = 28$; $S_{10} = \frac{10(a_1 + a_{10})}{2} = \frac{10(1 + 28)}{2} =$ **145**.

**Bài 9**: Cấp số nhân $a_1 = \frac23, r = \frac13$ ($|r| < 1$ → có tổng vô hạn). $S_\infty = \frac{a_1}{1-r} = \frac{2/3}{1 - 1/3} = \frac{2/3}{2/3} =$ **1**.

**Bài 10**: $0.\overline{27} = \frac{27}{100} + \frac{27}{10000} + \cdots$ là cấp số nhân $a_1 = \frac{27}{100}, r = \frac{1}{100}$. $S = \frac{27/100}{1 - 1/100} = \frac{27/100}{99/100} = \frac{27}{99} = $ **$\frac{3}{11}$**. Kiểm tra: $3 \div 11 = 0.2727\ldots$ ✓.

---

## 11. Bài tiếp theo

[Lesson 02 — Giới hạn hàm & liên tục](../lesson-02-function-limits-continuity/).

## 📝 Tổng kết

1. **Dãy số**: $a_n =$ một số ứng với mỗi $n \in \mathbb{N}$.
2. **Giới hạn**: $\lim a_n = L$ ($\forall \varepsilon > 0, \exists N, \forall n \ge N: |a_n - L| < \varepsilon$); chứng minh $\varepsilon$-N theo 3 bước (gọn $|a_n-L|$ → giải $n$ → chọn $N$).
3. **3 loại dãy**: hội tụ, phân kỳ $\pm\infty$, dao động.
4. **Tính giới hạn**: phân thức theo quy luật bậc (tử $<$ mẫu $\to 0$; bằng $\to$ tỉ số hệ số; tử $>$ mẫu $\to \pm\infty$); $\infty - \infty$ có căn → nhân liên hợp.
5. **$\left(1+\frac{1}{n}\right)^n \to e$** (tổng quát $\left(1+\frac{a}{n}\right)^n \to e^a$), **$\frac{\sin x}{x} \to 1$**.
6. **Định lý kẹp** cho dãy phức tạp bị kẹp giữa 2 dãy đơn giản.
7. **Hội tụ đơn điệu**: tăng + chặn trên (hoặc giảm + chặn dưới) → hội tụ; tìm $L$ qua $L = f(L)$ cho dãy đệ quy.
8. **Dãy con**: $a_n \to L \Rightarrow$ mọi dãy con $\to L$; 2 dãy con khác limit → phân kỳ; Bolzano–Weierstrass (dãy bị chặn có dãy con hội tụ).
9. **Cấp số cộng** $S_n = \frac{n(a_1+a_n)}{2}$; **cấp số nhân** $S_n = a_1\frac{1-r^n}{1-r}$, tổng vô hạn $\frac{a_1}{1-r}$ khi $|r|<1$.
