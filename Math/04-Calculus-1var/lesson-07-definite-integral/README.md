# Lesson 07 — Tích phân xác định

## Mục tiêu

- Hiểu **tích phân xác định** $\int_a^b f(x)\,dx$ như diện tích dưới đồ thị.
- Định nghĩa qua **tổng Riemann**.
- **Định lý cơ bản giải tích** (FTC) — kết nối đạo hàm và tích phân.
- Tính chất của tích phân xác định.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

---

## 1. Vấn đề diện tích

💡 **Câu hỏi**: Diện tích hình giới hạn bởi $y = x^2$, trục Ox, và 2 đường thẳng $x = 0$, $x = 1$ là bao nhiêu?

Đây là hình **cong** — không có công thức diện tích thẳng. Phải dùng tích phân.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng công thức hình học quen thuộc?"* Vì cạnh trên là đường cong $y = x^2$, không phải đoạn thẳng — không có công thức diện tích đa giác/hình tròn nào áp được. Ý tưởng giải tích: **xấp xỉ** bằng nhiều hình chữ nhật mỏng rồi cho số hình $\to \infty$.
- *"Diện tích này có ra số cụ thể không?"* Có, và bằng đúng $\frac{1}{3}$ (sẽ tính ở mục 2 + 3). Đường cong vẫn cho diện tích hữu hạn xác định.

### 📝 Tóm tắt mục 1

- Diện tích dưới đường **cong** không có công thức hình học trực tiếp.
- Giải pháp: xấp xỉ bằng hình chữ nhật mỏng, lấy giới hạn → tích phân.
- Ví dụ dẫn dắt $\int_0^1 x^2\,dx = \frac{1}{3}$ (tính ở mục 2-3).

---

## 2. Tổng Riemann — Định nghĩa tích phân

💡 **Ý tưởng**: Chia khoảng $[a, b]$ thành $n$ đoạn nhỏ, mỗi đoạn rộng $\Delta x = (b-a)/n$. Trên mỗi đoạn, **xấp xỉ diện tích bằng hình chữ nhật** chiều cao $f(x_i)$.

$$\text{Tổng Riemann: } S_n = \sum_{i=1}^n f(x_i) \cdot \Delta x$$

Khi $n \to \infty$ (mảnh càng mỏng), tổng $\to$ diện tích thật.

$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum f(x_i) \cdot \Delta x$$

### Ví dụ số: $\int_0^1 x^2\,dx$

Chia $[0, 1]$ thành $n$ đoạn, dùng cận phải. $x_i = i/n$, $\Delta x = 1/n$.

$$S_n = \sum_{i=1}^n \left(\frac{i}{n}\right)^2 \cdot \frac{1}{n} = \frac{1}{n^3} \cdot \sum i^2$$

Dùng công thức $\sum i^2 = n(n+1)(2n+1)/6$:

$$S_n = \frac{n(n+1)(2n+1)}{6n^3} = \frac{(1 + 1/n)(2 + 1/n)}{6}$$

Khi $n \to \infty$: $S_n \to (1 \cdot 2)/6 =$ **$\frac{1}{3}$**.

$\to \int_0^1 x^2\,dx =$ **$\frac{1}{3}$**.

**Kiểm tra bằng số**:
- $n=10$: $S \approx 0.385$.
- $n=100$: $S \approx 0.3383$.
- $n=1000$: $S \approx 0.3338$.
- $\to \frac{1}{3} \approx 0.3333$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cận trái hay cận phải của mỗi đoạn?"* Với hàm liên tục, khi $n \to \infty$ cả hai (và điểm bất kỳ trong đoạn) cho **cùng** giới hạn. Vd $\int_0^1 x^2\,dx$: cận phải cho $0.385$ ($n=10$), cận trái cho $0.285$ — nhưng cả hai $\to \frac{1}{3}$. Chọn cận nào chỉ ảnh hưởng tốc độ hội tụ.
- *"Vì sao $\sum i^2 = n(n+1)(2n+1)/6$?"* Đây là công thức tổng bình phương đã biết (chứng minh bằng quy nạp). Kiểm $n=3$: $1+4+9 = 14$, công thức $3 \cdot 4 \cdot 7/6 = 84/6 = 14$ ✓. Nó cho phép biến tổng Riemann thành biểu thức đóng rồi mới lấy giới hạn.

⚠ **Lỗi thường gặp — quên nhân $\Delta x$**. Tổng Riemann là $\sum f(x_i) \cdot \Delta x$, KHÔNG phải $\sum f(x_i)$. Thiếu $\Delta x$ (= bề rộng hình chữ nhật) thì kết quả không phải diện tích. Vd quên $1/n$ ở trên sẽ ra $\infty$ thay vì $\frac{1}{3}$.

🔁 **Dừng lại tự kiểm tra**

1. Với $\int_0^1 x^2\,dx$, công thức $S_n = (1+1/n)(2+1/n)/6$. Tính $S_n$ khi $n = 2$.
2. Khi $n \to \infty$, mỗi hình chữ nhật rộng $\Delta x$ tiến về đâu?

<details><summary>Đáp án</summary>

1. $(1+0.5)(2+0.5)/6 = (1.5 \cdot 2.5)/6 = 3.75/6 = 0.625$ (xấp xỉ thô vì $n$ nhỏ).
2. $\Delta x = 1/n \to 0$ (hình chữ nhật càng mỏng, xấp xỉ càng khít đường cong).

</details>

### 📝 Tóm tắt mục 2

- Tổng Riemann $S_n = \sum f(x_i) \cdot \Delta x$ xấp xỉ diện tích bằng $n$ hình chữ nhật.
- $\int_a^b f\,dx = \lim_{n \to \infty} S_n$ — giới hạn khi hình chữ nhật mỏng vô hạn.
- **Đừng quên $\Delta x$**; cận trái/phải đều cho cùng giới hạn với hàm liên tục.

---

## 3. Định lý cơ bản giải tích (Fundamental Theorem of Calculus)

🎯 **Đây là định lý quan trọng nhất Calculus**, kết nối đạo hàm và tích phân.

### Phần 1 (FTC1)
Nếu $f$ liên tục trên $[a, b]$ và $F(x) = \int_a^x f(t)\,dt$, thì **$F'(x) = f(x)$**.

💡 Đọc: "Đạo hàm của tích phân = chính hàm". Đạo hàm và tích phân là **2 phép toán ngược nhau**.

### Phần 2 (FTC2) — Cách tính tích phân thực tế
Nếu $F$ là **nguyên hàm** của $f$ ($F' = f$), thì:

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

> 📐 **Định nghĩa đầy đủ — Định lý cơ bản giải tích (FTC)**
>
> **(a) Là gì**: Cây cầu nối **đạo hàm và tích phân**. Phần 1: nếu ta tích phân $f$ rồi đạo hàm, ta được lại $f$ (ngược nhau). Phần 2: tích phân xác định = hiệu nguyên hàm ở 2 đầu, $F(b) - F(a)$. Không cần tính tổng Riemann vô hạn nữa.
>
> **(b) Vì sao cần**: Trước Newton/Leibniz, tính diện tích = tổng Riemann thủ công, **cực kỳ khó** với hàm bất kỳ. Archimedes đã làm cho parabol bằng tổng Riemann, mất nhiều trang giấy chỉ cho 1 hàm. FTC biến phép tính diện tích thành 2 phép tính nguyên hàm + trừ — đơn giản hơn vô số lần. Đây là **lý do** Calculus tạo ra cách mạng khoa học thế kỷ 17: từ nay tính diện tích, thể tích, công, lưu lượng... trở nên hệ thống. Là đỉnh cao của toán THPT.
>
> **(c) Ví dụ số**: $\int_0^1 x^2\,dx$. $F(x) = x^3/3$. $F(1) - F(0) = 1/3 - 0 =$ **$\frac{1}{3}$**. Verify bằng tổng Riemann ($n \to \infty$ cho cùng kết quả $\approx 0.333$). $\int_0^\pi \sin x\,dx = \left.-\cos x\right|_0^\pi = -\cos \pi + \cos 0 = 1+1 =$ **2**. $\int_1^e (1/x)\,dx = \ln e - \ln 1 =$ **1**. $\int_0^1 e^x\,dx = e^1 - e^0 = e - 1 \approx$ **1.718**. Diện tích dưới đường thẳng $y = 2x$ trên $[0, 5]$: $\int_0^5 2x\,dx = \left.x^2\right|_0^5 = 25$ ✓ (= tam giác đáy 5 cao 10 $\to \frac{1}{2} \cdot 5 \cdot 10 = 25$).

Viết tắt: $F(b) - F(a)$ thường ghi là $\left[F(x)\right]_a^b$ hoặc $\left.F(x)\right|_a^b$.

💡 **Quy trình tính tích phân**:
1. Tìm nguyên hàm $F(x)$ (như L06).
2. Tính $F(b) - F(a)$.

**Ví dụ**: $\int_0^1 x^2\,dx$.
- $F(x) = x^3/3$ (1 nguyên hàm bất kỳ, không cần $+C$ vì cancel khi trừ).
- $F(1) - F(0) = 1/3 - 0 =$ **$\frac{1}{3}$** ✓.

Khớp với kết quả tổng Riemann!

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không cần $+C$ ở tích phân xác định?"* Vì khi tính $F(b) - F(a)$, hằng số bị triệt tiêu: $(F(b)+C) - (F(a)+C) = F(b) - F(a)$. Tích phân **bất định** (nguyên hàm) cần $+C$, nhưng tích phân **xác định** thì không.
- *"FTC1 và FTC2 liên hệ thế nào?"* FTC1 nói "tích phân rồi đạo hàm $\to$ trở lại hàm gốc" (chứng minh đạo hàm và tích phân ngược nhau). FTC2 là **hệ quả tính toán**: dùng nguyên hàm để tính tích phân xác định mà không cần tổng Riemann.
- *"Chọn nguyên hàm nào trong FTC2?"* Bất kỳ một nguyên hàm nào cũng được (hằng số tự triệt tiêu). Thường chọn cái đơn giản nhất với $C = 0$.

⚠ **Lỗi thường gặp — tính $F(a) - F(b)$ thay vì $F(b) - F(a)$**. Thứ tự là **cận trên trừ cận dưới**. Đảo lại sẽ ra dấu ngược. Vd $\int_0^1 x^2\,dx = F(1)-F(0) = 1/3$, nếu viết $F(0)-F(1) = -1/3$ là sai dấu.

🔁 **Dừng lại tự kiểm tra**

1. $\int_0^2 3x^2\,dx = ?$ (dùng FTC2).
2. $\int_1^3 (1/x)\,dx = ?$

<details><summary>Đáp án</summary>

1. $F(x) = x^3 \to F(2) - F(0) = 8 - 0 = 8$.
2. $F(x) = \ln|x| \to \ln 3 - \ln 1 = \ln 3 \approx 1.0986$.

</details>

### 📝 Tóm tắt mục 3

- FTC1: $\dfrac{d}{dx} \int_a^x f(t)\,dt = f(x)$ — đạo hàm và tích phân ngược nhau.
- FTC2: $\int_a^b f\,dx = F(b) - F(a)$ với $F' = f$ — tính tích phân qua nguyên hàm.
- Không cần $+C$ (triệt tiêu khi trừ); thứ tự **trên trừ dưới**.

---

## 4. Tính chất tích phân xác định

| Tính chất | Công thức |
|-----------|-----------|
| Hằng nhân | $\int c \cdot f\,dx = c \cdot \int f\,dx$ |
| Tổng | $\int (f + g)\,dx = \int f\,dx + \int g\,dx$ |
| Cộng đoạn | $\int_a^b = \int_a^c + \int_c^b$ |
| Đảo cận | $\int_a^b = -\int_b^a$ |
| Trùng cận | $\int_a^a = 0$ |
| Diện tích âm | $f < 0 \to$ tích phân âm |

⚠ **Tích phân có thể âm**: $\int_a^b f\,dx$ **không phải lúc nào cũng = diện tích**. Là **diện tích đại số** — phần trên Ox cộng, phần dưới trừ.

**Ví dụ**: $\int_0^{2\pi} \sin x\,dx = \left.-\cos x\right|_0^{2\pi} = -\cos(2\pi) + \cos(0) = -1 + 1 =$ **0**. (Phần dương từ $0$-$\pi$ và phần âm từ $\pi$-$2\pi$ triệt tiêu nhau.)

Nếu muốn **diện tích thật**: $\int_0^{2\pi} |\sin x|\,dx = 4$.

💡 **Trực giác**: tích phân xác định là **diện tích có dấu** — phần đồ thị trên trục Ox đóng góp dương, phần dưới đóng góp âm. Như "lãi và lỗ" cộng dồn: tổng đại số có thể nhỏ hơn tổng độ lớn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân bằng 0 có nghĩa hàm bằng 0?"* Không. $\int_0^{2\pi} \sin x\,dx = 0$ nhưng $\sin x$ không hề bằng 0 khắp nơi — phần dương và âm **triệt tiêu**. Tích phân = 0 chỉ nói tổng đại số bằng 0.
- *"Khi nào dùng tính chất cộng đoạn?"* Khi hàm đổi công thức/đổi dấu giữa chừng, hoặc muốn tách $\int_a^b = \int_a^c + \int_c^b$ để xử lý từng phần. Rất hữu ích với hàm chia khúc hay $|f(x)|$.

⚠ **Lỗi thường gặp — lẫn tích phân với diện tích thật**. Để tính **diện tích** giữa đường và trục khi hàm đổi dấu, phải lấy $\int|f|$ (chia đoạn theo dấu), KHÔNG phải $\int f$. Vd diện tích của $\sin x$ trên $[0, 2\pi]$ là $4$, không phải $0$.

🔁 **Dừng lại tự kiểm tra**

1. $\int_{-1}^1 x\,dx = ?$ Giải thích.
2. Tách $\int_0^4 f\,dx$ qua điểm $c = 2$ như thế nào?

<details><summary>Đáp án</summary>

1. $\left.x^2/2\right|_{-1}^1 = 1/2 - 1/2 = 0$ (hàm lẻ, phần âm $[-1,0]$ triệt tiêu phần dương $[0,1]$).
2. $\int_0^4 f\,dx = \int_0^2 f\,dx + \int_2^4 f\,dx$ (cộng đoạn).

</details>

### 📝 Tóm tắt mục 4

- Tích phân tuyến tính, cộng đoạn $\int_a^b = \int_a^c + \int_c^b$, đảo cận đổi dấu, $\int_a^a = 0$.
- Tích phân là **diện tích có dấu** — phần dưới Ox âm; có thể bằng 0 dù hàm $\neq 0$.
- Muốn **diện tích thật** khi hàm đổi dấu: dùng $\int|f|$.

---

## 5. Đổi biến trong tích phân xác định

$$\int_a^b f(g(x)) \cdot g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du$$

⚠ **Lưu ý**: Phải **đổi cả cận** theo $u$.

**Ví dụ**: $\int_0^1 2x \cdot e^{x^2}\,dx$.
- Đặt $u = x^2$, $du = 2x\,dx$.
- $x = 0 \to u = 0$; $x = 1 \to u = 1$.
- $= \int_0^1 e^u\,du = e - 1 \approx 1.718$.

💡 **Trực giác**: giống đổi biến cho nguyên hàm, nhưng cận tích phân là "vị trí trên trục x" — khi đổi sang biến $u$, các vị trí đó cũng phải dịch sang giá trị $u$ tương ứng. Đổi cận giúp **không cần** thay $u$ trở lại $x$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi cận rồi có cần thay $u$ về $x$ không?"* Không. Khi đã đổi cận sang $u$, tính thẳng $\int_{g(a)}^{g(b)} f(u)\,du$ rồi áp FTC2 với biến $u$. Đỡ một bước so với nguyên hàm bất định.
- *"Nếu quên đổi cận thì sao?"* Sẽ tính $\left[F(u)\right]$ với cận $x$ cũ → kết quả sai. Phải chọn một trong hai: đổi cận theo $u$, **hoặc** thay $u$ về $x$ rồi dùng cận $x$ gốc — không trộn.

⚠ **Lỗi thường gặp — đổi biến nhưng giữ nguyên cận $x$**. $\int_0^1 2x \cdot e^{x^2}\,dx$: sau khi đặt $u = x^2$, nếu vẫn viết $\int_0^1 e^u\,du$ với cận $x$ cũ thì... ở đây trùng hợp $0 \to 0, 1 \to 1$ nên đúng; nhưng $\int_1^2 2x \cdot e^{x^2}\,dx$ thì $u$ chạy $1 \to 4$, giữ cận $1 \to 2$ sẽ sai. Luôn đổi cận theo $u = g(x)$.

🔁 **Dừng lại tự kiểm tra**

1. $\int_0^2 2x \cdot e^{x^2}\,dx$ — cận $u$ mới là gì? Tính kết quả.
2. Vì sao đổi cận tiện hơn thay $u$ về $x$?

<details><summary>Đáp án</summary>

1. $u = x^2$: $x=0 \to u=0$, $x=2 \to u=4$. $\int_0^4 e^u\,du = e^4 - 1 \approx 53.6$.
2. Vì tránh được bước thay $u = g(x)$ ngược lại — tính trực tiếp trên biến $u$ với cận mới.

</details>

### 📝 Tóm tắt mục 5

- Đổi biến tích phân xác định: $\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du$.
- **Phải đổi cả cận** theo $u = g(x)$; sau đó không cần thay $u$ về $x$.
- Hoặc đổi cận, hoặc thay $u$ về $x$ rồi dùng cận gốc — không trộn lẫn.

---

## 6. Tích phân từng phần xác định

$$\int_a^b u\,dv = \left[u \cdot v\right]_a^b - \int_a^b v\,du$$

**Ví dụ**: $\int_0^\pi x \cdot \sin x\,dx$.
- $u = x$, $dv = \sin x\,dx$. $v = -\cos x$.
- $= \left[-x \cdot \cos x\right]_0^\pi + \int_0^\pi \cos x\,dx$
- $= -\pi \cdot \cos \pi + 0 + \left[\sin x\right]_0^\pi$
- $= \pi + 0 - 0 =$ **$\pi$**.

💡 **Trực giác**: công thức giống nguyên hàm $\int u\,dv = uv - \int v\,du$, chỉ thêm việc **đánh giá $uv$ tại hai cận** ngay. Phần $\left[uv\right]_a^b$ lấy giá trị ở hai đầu, phần $\int_a^b v\,du$ vẫn là tích phân xác định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\left[u \cdot v\right]_a^b$ tính thế nào?"* Thay cận trên trừ cận dưới vào tích $u \cdot v$. Ví dụ trên: $\left[-x \cdot \cos x\right]_0^\pi = (-\pi \cdot \cos \pi) - (-0 \cdot \cos 0) = (-\pi \cdot (-1)) - 0 = \pi$.
- *"Chọn $u, dv$ có khác nguyên hàm không?"* Không, vẫn theo **LIATE** như L06. Chỉ thêm bước đánh giá tại cận.

⚠ **Lỗi thường gặp — quên đánh giá phần $\left[uv\right]$ tại cận**. Viết $\int_0^\pi x \sin x\,dx = -\int_0^\pi \cos x\,dx$ (bỏ luôn $\left[-x \cos x\right]_0^\pi$) là thiếu hẳn một phần. Cả $\left[uv\right]_a^b$ lẫn $\int v\,du$ đều phải đánh giá tại cận.

🔁 **Dừng lại tự kiểm tra**

1. $\int_0^1 x \cdot e^x\,dx = ?$
2. Tính $\left[x \cdot \sin x\right]_0^{\pi/2}$.

<details><summary>Đáp án</summary>

1. $u=x, dv=e^x\,dx, v=e^x$: $\left[x e^x\right]_0^1 - \int_0^1 e^x\,dx = e - \left[e^x\right]_0^1 = e - (e-1) = 1$.
2. $(\pi/2) \cdot \sin(\pi/2) - 0 \cdot \sin 0 = (\pi/2) \cdot 1 - 0 = \pi/2$.

</details>

### 📝 Tóm tắt mục 6

- Từng phần xác định: $\int_a^b u\,dv = \left[uv\right]_a^b - \int_a^b v\,du$.
- Đánh giá **cả** $\left[uv\right]$ tại hai cận **lẫn** tích phân còn lại; chọn $u, dv$ theo LIATE.
- Đừng bỏ sót phần $\left[uv\right]_a^b$.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính $\int_1^3 (2x + 1)\,dx$.

**Bài 2**: Tính $\int_0^{\pi/2} \cos x\,dx$.

**Bài 3**: Tính $\int_{-2}^2 x^3\,dx$. Giải thích kết quả.

**Bài 4**: Tính $\int_0^1 x \cdot e^x\,dx$.

**Bài 5**: Tính $\int_1^e (\ln x)/x\,dx$.

### Lời giải

**Bài 1**: $F(x) = x^2 + x$. $F(3) - F(1) = 12 - 2 =$ **10**.

**Bài 2**: $F(x) = \sin x$. $\sin(\pi/2) - \sin 0 =$ **1**.

**Bài 3**: $F(x) = x^4/4$. $F(2) - F(-2) = 4 - 4 =$ **0**. Vì $x^3$ là hàm lẻ, đối xứng qua O → phần âm và dương triệt tiêu.

**Bài 4**: Từng phần. $u=x, dv=e^x\,dx \to v=e^x$. $\left[x \cdot e^x\right]_0^1 - \int_0^1 e^x\,dx = e - \left[e^x\right]_0^1 = e - (e-1) =$ **1**.

**Bài 5**: Đổi biến $u = \ln x$, $du = dx/x$. $x=1 \to u=0$, $x=e \to u=1$. $= \int_0^1 u\,du =$ **$\frac{1}{2}$**.

---

## 8. Bài tiếp theo

[Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/).

## 📝 Tổng kết

1. **Tổng Riemann**: $S_n = \sum f(x_i)\Delta x$. $n \to \infty \to \int_a^b f\,dx$.
2. **FTC**: nếu $F' = f$ thì $\int_a^b f = F(b) - F(a)$. Đạo hàm & tích phân là ngược nhau.
3. **Tính chất**: cộng đoạn, đảo cận, $\int_a^a = 0$.
4. $\int$ có thể âm — là diện tích đại số.
5. Đổi biến **phải đổi cận**. Từng phần áp dụng được.
