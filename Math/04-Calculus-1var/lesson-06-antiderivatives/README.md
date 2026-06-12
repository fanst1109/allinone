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

💡 **Trực giác — nguyên hàm là "đi ngược đạo hàm"**. Đạo hàm là một cái máy: bỏ hàm $F$ vào, nó nhả ra slope $f = F'$. Nguyên hàm là **chạy cái máy đó ngược lại**: cho slope $f$, đi tìm hàm $F$ mà nếu đem đạo hàm sẽ trả về đúng $f$.

```
        ĐẠO HÀM (biết F, tìm slope)
   F(x)  ───────────────────────────►  f(x) = F'(x)
   x²    ───────────────────────────►  2x
         ◄───────────────────────────
        NGUYÊN HÀM (biết slope, tìm F)
```

Cũng như phép trừ "tháo" phép cộng, khai căn "tháo" bình phương — nguyên hàm "tháo" đạo hàm. Khác biệt: đạo hàm có **thuật toán cơ học** (cứ áp quy tắc tích/thương/chuỗi là ra); nguyên hàm thì **không có thuật toán tổng quát**, phải nhận dạng "hàm này là đạo hàm của cái gì?" — đó là lý do tích phân khó hơn đạo hàm.

💡 **Định nghĩa**: $F(x)$ là nguyên hàm của $f(x)$ trên $(a, b)$ nếu **$F'(x) = f(x)$** với mọi $x$.

**Ký hiệu**: $\int f(x)\,dx = F(x) + C$ ($C$ = hằng số bất kỳ).

⚠ **Vì sao có +C**: Vì đạo hàm của hằng số = 0. Nếu $F$ là 1 nguyên hàm thì $F + 1$, $F + \pi$, $F + (-5)$ cũng đều là nguyên hàm. Tập hợp tất cả $= F + C$.

💡 **Trực giác `+C` = "họ đường song song"**. Cộng hằng số $C$ vào $F$ chỉ **dịch toàn bộ đồ thị lên/xuống** theo trục $Oy$ — không làm thay đổi slope ở bất kỳ điểm nào. Mà slope chính là $f$. Nên cả một **họ vô hạn** đường cong song song dọc đều có cùng đạo hàm $f$:

```
  y
  │      ╱ x² + 2      ← C = 2
  │     ╱╱ x² + 1      ← C = 1   mỗi đường lệch nhau đúng
  │    ╱╱╱ x²          ← C = 0   một khoảng hằng số,
  │   ╱╱╱╱ x² − 1      ← C = −1  nhưng tại mỗi x chúng
  │  ╱╱╱╱╱              CÙNG slope = 2x
  └──────────────► x
```

Khi vẽ trường slope (slope field), tại mỗi $x$ mọi đường trong họ có **cùng một độ dốc** $f(x)$ — đó là hình ảnh hình học của "$\int f\,dx$ là một họ, không phải một hàm duy nhất".

**Ví dụ**: $f(x) = 2x$.
- $F(x) = x^2$ là nguyên hàm (vì $(x^2)' = 2x$).
- $F(x) = x^2 + 7$ cũng là.
- Tổng quát: $\int 2x\,dx =$ **$x^2 + C$**.

**4 ví dụ "đoán nguyên hàm" — đọc ngược từng quy tắc đạo hàm** (luôn verify bằng cách đạo hàm trở lại):

| $f(x)$ | "Hàm nào đạo hàm ra $f$?" | $\int f\,dx$ | Verify $F'$ |
|--------|---------------------------|--------------|-------------|
| $3x^2$ | $(x^3)' = 3x^2$ | $x^3 + C$ | $(x^3)' = 3x^2$ ✓ |
| $\cos x$ | $(\sin x)' = \cos x$ | $\sin x + C$ | $(\sin x)' = \cos x$ ✓ |
| $e^x$ | $(e^x)' = e^x$ | $e^x + C$ | $(e^x)' = e^x$ ✓ |
| $\dfrac{1}{x}$ | $(\ln\lvert x\rvert)' = \dfrac{1}{x}$ | $\ln\lvert x\rvert + C$ | $(\ln\lvert x\rvert)' = \dfrac{1}{x}$ ✓ |

Mỗi dòng là một câu hỏi ngược: "đạo hàm hàm nào ra được vế trái?". Tìm được hàm đó $\to$ thêm $+C$ $\to$ xong.

🔁 **Dừng lại tự kiểm tra — "đoán ngược"**. Với mỗi $f$, đoán $F$ rồi đạo hàm lại để kiểm:

1. $f(x) = 4x^3$ → $F = \,?$
2. $f(x) = e^x + \cos x$ → $F = \,?$
3. $f(x) = \dfrac{2}{x}$ → $F = \,?$

<details><summary>Đáp án</summary>

1. $F = x^4 + C$ (vì $(x^4)' = 4x^3$).
2. $F = e^x + \sin x + C$ (tách tổng; $(e^x)' = e^x$, $(\sin x)' = \cos x$).
3. $F = 2\ln\lvert x\rvert + C$ (rút hằng số 2 ra; $\int\frac{1}{x} = \ln\lvert x\rvert$ — nhớ trị tuyệt đối).

</details>

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

### 2.1. Dẫn từng dòng bảng từ đạo hàm tương ứng

Không cần học vẹt — mỗi dòng nguyên hàm chỉ là một dòng đạo hàm **viết ngược**. Cột giữa là quy tắc đạo hàm bạn đã biết (L04), cột phải là kết luận nguyên hàm:

| Đạo hàm đã biết (L04) | Đọc ngược | Kết luận nguyên hàm |
|------------------------|-----------|---------------------|
| $\left(\dfrac{x^{n+1}}{n+1}\right)' = x^n$ | "$x^n$ là đạo hàm của $\dfrac{x^{n+1}}{n+1}$" | $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$ |
| $(\ln\lvert x\rvert)' = \dfrac{1}{x}$ | "$\dfrac{1}{x}$ là đạo hàm của $\ln\lvert x\rvert$" | $\int \dfrac{1}{x}\,dx = \ln\lvert x\rvert + C$ |
| $(e^x)' = e^x$ | "$e^x$ tự là đạo hàm của chính nó" | $\int e^x\,dx = e^x + C$ |
| $\left(\dfrac{a^x}{\ln a}\right)' = a^x$ | "$a^x$ là đạo hàm của $\dfrac{a^x}{\ln a}$" | $\int a^x\,dx = \dfrac{a^x}{\ln a} + C$ |
| $(\sin x)' = \cos x$ | "$\cos x$ là đạo hàm của $\sin x$" | $\int \cos x\,dx = \sin x + C$ |
| $(-\cos x)' = \sin x$ | "$\sin x$ là đạo hàm của $-\cos x$" | $\int \sin x\,dx = -\cos x + C$ |
| $(\tan x)' = \dfrac{1}{\cos^2 x}$ | "$\dfrac{1}{\cos^2 x}$ là đạo hàm của $\tan x$" | $\int \dfrac{1}{\cos^2 x}\,dx = \tan x + C$ |
| $(\arctan x)' = \dfrac{1}{1+x^2}$ | "$\dfrac{1}{1+x^2}$ là đạo hàm của $\arctan x$" | $\int \dfrac{1}{1+x^2}\,dx = \arctan x + C$ |

💡 **Trực giác quy tắc lũy thừa** $\int x^n = \frac{x^{n+1}}{n+1}$: đạo hàm **hạ** bậc đi 1 và **nhân** hệ số xuống; nguyên hàm làm ngược — **nâng** bậc lên 1 ($n \to n+1$) rồi **chia** cho bậc mới để khử hệ số sinh ra khi đạo hàm. Hai thao tác đối nhau khít.

**4 ví dụ số cho quy tắc lũy thừa** (đa dạng: bậc cao, hằng số, căn, lũy thừa âm):

1. $\int x^5\,dx = \dfrac{x^6}{6} + C$. Verify: $\left(\dfrac{x^6}{6}\right)' = \dfrac{6x^5}{6} = x^5$ ✓.
2. $\int x^0\,dx = \int 1\,dx = \dfrac{x^1}{1} + C = x + C$ (trường hợp $n=0$). Verify: $(x)' = 1$ ✓.
3. $\int \sqrt{x}\,dx = \int x^{1/2}\,dx = \dfrac{x^{3/2}}{3/2} + C = \dfrac{2}{3}x^{3/2} + C$. Verify: $\left(\dfrac{2}{3}x^{3/2}\right)' = \dfrac{2}{3}\cdot\dfrac{3}{2}x^{1/2} = x^{1/2}$ ✓.
4. $\int \dfrac{1}{x^2}\,dx = \int x^{-2}\,dx = \dfrac{x^{-1}}{-1} + C = -\dfrac{1}{x} + C$ (lũy thừa âm, vẫn dùng công thức vì $n=-2\neq -1$). Verify: $\left(-\dfrac{1}{x}\right)' = -(-x^{-2}) = \dfrac{1}{x^2}$ ✓.

⚠ **Quan trọng — vì sao $\int \frac{1}{x}\,dx = \ln$$|x|$$+ C$ phải có trị tuyệt đối**, không phải $\ln x$. Hàm $\frac{1}{x}$ xác định cả khi $x < 0$ (vd $x = -2$), nhưng $\ln x$ **không** tồn tại với $x \leq 0$. Nếu viết $\ln x$, nguyên hàm chỉ đúng nửa miền $x > 0$. Trị tuyệt đối vá lỗ này:

- Với $x > 0$: $(\ln\lvert x\rvert)' = (\ln x)' = \dfrac{1}{x}$ ✓.
- Với $x < 0$: $\lvert x\rvert = -x$, nên $(\ln\lvert x\rvert)' = (\ln(-x))' = \dfrac{1}{-x}\cdot(-1) = \dfrac{1}{x}$ ✓ (chuỗi rule, dấu trừ tự khử).

Cả hai miền cùng ra $\frac{1}{x}$ → $\ln\lvert x\rvert$ mới là nguyên hàm đúng trên toàn miền xác định. Quên dấu $\lvert\cdot\rvert$ = lỗi rất hay gặp, đặc biệt khi tích phân xác định đi qua vùng âm.

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

**4 ví dụ tuyến tính chi tiết** (tách tổng + rút hằng số ra ngoài), mỗi ví dụ verify bằng đạo hàm ngược:

1. $\int (4x^3 + 6x)\,dx = 4\cdot\dfrac{x^4}{4} + 6\cdot\dfrac{x^2}{2} + C = x^4 + 3x^2 + C$. Verify: $(x^4+3x^2)' = 4x^3+6x$ ✓.
2. $\int \left(\dfrac{5}{x} - 2e^x\right)dx = 5\ln\lvert x\rvert - 2e^x + C$. Verify: $\left(5\ln\lvert x\rvert - 2e^x\right)' = \dfrac{5}{x} - 2e^x$ ✓.
3. $\int (7\cos x - 3)\,dx = 7\sin x - 3x + C$. Verify: $(7\sin x - 3x)' = 7\cos x - 3$ ✓.
4. $\int \dfrac{x^2 + 1}{x}\,dx$ — **chia trước rồi tích phân** (không có quy tắc thương!): $\int\left(x + \dfrac{1}{x}\right)dx = \dfrac{x^2}{2} + \ln\lvert x\rvert + C$. Verify: $\left(\dfrac{x^2}{2}+\ln\lvert x\rvert\right)' = x + \dfrac{1}{x} = \dfrac{x^2+1}{x}$ ✓. (Ví dụ 4 minh họa: gặp thương đôi khi **biến đổi đại số** đưa về tổng còn nhanh hơn đổi biến.)

💡 **Trực giác**: nguyên hàm "thừa hưởng" tính tuyến tính từ đạo hàm. Vì $(F+G)' = F'+G'$ và $(cF)' = cF'$, đảo ngược lại thì tích phân cũng tách qua tổng và rút hằng số ra ngoài.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có quy tắc tổng mà không có quy tắc tích?"* Vì đạo hàm tích là $f'g + fg'$ (rối, không tách gọn), nên đảo ngược không cho công thức đơn giản. Tích/thương phải dùng kỹ thuật (đổi biến, từng phần) — đó là lý do tích phân **khó hơn** đạo hàm.
- *"$\int f\cdot g\,dx = \int f \cdot \int g$ đúng không?"* SAI hoàn toàn. Phản ví dụ: $\int x\cdot x\,dx = \int x^2\,dx = \frac{x^3}{3}$, nhưng $\int x \cdot \int x = \frac{x^2}{2}\cdot\frac{x^2}{2} = \frac{x^4}{4}$. Khác nhau.

⚠ **Lỗi thường gặp — bịa quy tắc nhân/chia cho tích phân**. Không tồn tại $\int fg = \int f\cdot\int g$ hay $\int \frac{f}{g} = \frac{\int f}{\int g}$. Gặp tích/thương phải nghĩ tới đổi biến (mục 4) hoặc từng phần (mục 5).

**Phản ví dụ chi tiết** (hai vế lệch hẳn nhau): $\int x\cos x\,dx$.
- Vế bịa: $\left(\int x\,dx\right)\cdot\left(\int\cos x\,dx\right) = \dfrac{x^2}{2}\cdot\sin x = \dfrac{x^2\sin x}{2}$.
- Vế đúng (từng phần, mục 5): $x\sin x + \cos x + C$.
- Kiểm bằng đạo hàm vế bịa: $\left(\dfrac{x^2\sin x}{2}\right)' = x\sin x + \dfrac{x^2\cos x}{2} \neq x\cos x$ → **sai**. Vế đúng đạo hàm lại đúng ra $x\cos x$. Hai kết quả không bằng nhau ở bất kỳ $x\neq 0$ nào.

💡 So sánh tổng quát **đạo hàm vs nguyên hàm** (vì sao nguyên hàm khó hơn):

| | Đạo hàm | Nguyên hàm |
|---|---------|------------|
| Tổng/hiệu | $(f\pm g)' = f'\pm g'$ | $\int(f\pm g) = \int f \pm \int g$ ✓ giống |
| Hằng số nhân | $(cf)' = cf'$ | $\int cf = c\int f$ ✓ giống |
| **Tích** | $(fg)' = f'g + fg'$ (có quy tắc) | **không** có quy tắc đóng → by-parts |
| **Thương** | $\left(\frac{f}{g}\right)' = \frac{f'g-fg'}{g^2}$ (có) | **không** có → biến đổi/đổi biến |
| **Hàm hợp** | $f(g)' = f'(g)g'$ (chain rule) | **không** tự động → đổi biến nếu may mắn có $g'$ |
| Thuật toán | cơ học, luôn ra | không tổng quát, phải nhận dạng |

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

💡 **Trực giác**: Đây là **đảo ngược chain rule**. Chain rule khi đạo hàm hàm hợp sinh ra một thừa số $g'(x)$ "rơi ra ngoài": $\frac{d}{dx}F(g(x)) = F'(g(x))\cdot g'(x)$. Đổi biến đi ngược — nhận diện thừa số $g'(x)$ đó trong biểu thức, "gói" nó vào $du$, rồi tích phân theo $u$ như thể bài đơn giản một biến.

**Quy trình 4 bước (recipe)**:

```
1. Chọn u = g(x)  — phần "bên trong", thường là cái nằm trong ngoặc / mũ / mẫu.
2. Tính du = g'(x) dx  — kiểm g'(x) có mặt trong biểu thức (sai khác hằng số) không.
3. Thay TOÀN BỘ x và dx bằng u và du  — không để sót x nào.
4. Tích phân theo u (dùng bảng), rồi thay u = g(x) trở lại. Thêm +C.
```

**Ví dụ 1**: $\int 2x\cdot\cos(x^2)\,dx$.
- Đặt $u = x^2$, $du = 2x\,dx$ → $\int \cos(u)\,du = \sin(u) + C =$ **$\sin(x^2) + C$**.

**Kiểm tra**: $(\sin x^2)' = \cos(x^2)\cdot 2x$ ✓.

**Ví dụ 2**: $\int \frac{x}{x^2+1}\,dx$.
- Đặt $u = x^2+1$, $du = 2x\,dx$ → $x\,dx = \frac{du}{2}$.
- $\int \frac{1}{u}\cdot\frac{du}{2} = \frac{1}{2}\cdot\ln|u| + C =$ **$\frac{1}{2}\cdot\ln(x^2+1) + C$**.

**Ví dụ 3**: $\int e^{3x}\,dx$.
- $u = 3x$, $du = 3\,dx$ → $dx = \frac{du}{3}$.
- $\int e^u \cdot \frac{du}{3} = \frac{1}{3}\cdot e^u + C =$ **$\frac{1}{3}\cdot e^{3x} + C$**.

**Ví dụ 4** (mũ bên trong, $g'$ chỉ sai khác hằng số): $\int x\,e^{x^2}\,dx$.
- Đặt $u = x^2$, $du = 2x\,dx$ → $x\,dx = \frac{du}{2}$ (biểu thức có sẵn $x\,dx$, chỉ thiếu hệ số 2 — rút ra ngoài được).
- $\int e^u\cdot\frac{du}{2} = \frac{1}{2}e^u + C =$ **$\frac{1}{2}e^{x^2} + C$**.
- Verify: $\left(\frac{1}{2}e^{x^2}\right)' = \frac{1}{2}e^{x^2}\cdot 2x = x\,e^{x^2}$ ✓ (chain rule nhả lại đúng thừa số $2x$).

💡 **Mẫu "tuyến tính bên trong"**: với mọi hàm $\int f(ax+b)\,dx$, đặt $u=ax+b$ luôn ra $\frac{1}{a}F(ax+b)+C$ với $F$ là nguyên hàm của $f$. Vd $\int \cos(5x)\,dx = \frac{1}{5}\sin(5x)+C$, $\int e^{-x}\,dx = -e^{-x}+C$ ($a=-1$). Hệ số $\frac{1}{a}$ là dấu vết của $du = a\,dx$.

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

**Ví dụ 4 — từng phần LẶP 2 lần** ($x^2$ phải đạo hàm 2 lần mới thành hằng): $\int x^2\,e^x\,dx$.
- Lần 1: $u = x^2$, $dv = e^x\,dx$ → $du = 2x\,dx$, $v = e^x$.
  $$\int x^2 e^x\,dx = x^2 e^x - \int 2x\,e^x\,dx = x^2 e^x - 2\int x\,e^x\,dx$$
- Phần $\int x\,e^x\,dx$ đã có ở Ví dụ 1 $= (x-1)e^x + C$. Thế vào:
  $$= x^2 e^x - 2(x-1)e^x + C = (x^2 - 2x + 2)\,e^x + C$$
- Verify: $\big((x^2-2x+2)e^x\big)' = (2x-2)e^x + (x^2-2x+2)e^x = (x^2 + 0\cdot x + 0)e^x = x^2 e^x$ ✓.

💡 **Mẹo**: mỗi lần áp by-parts với $u$ là đa thức, bậc đa thức giảm 1. Đa thức bậc $k$ nhân $e^x$/$\sin x$/$\cos x$ → áp by-parts đúng $k$ lần là hết.

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

**Walk-through đầy đủ** cho $\int \tan x\,dx = \int \dfrac{\sin x}{\cos x}\,dx$:
- Đặt $u = \cos x$ → $du = -\sin x\,dx$ → $\sin x\,dx = -du$.
- $\int \dfrac{\sin x}{\cos x}\,dx = \int \dfrac{-du}{u} = -\ln\lvert u\rvert + C = -\ln\lvert\cos x\rvert + C$.

### 6.4. Thêm 4 ví dụ áp ba dạng trên

1. $\int \dfrac{1}{3x-2}\,dx = \dfrac{1}{3}\ln\lvert 3x-2\rvert + C$ (dạng 6.1, $a=3,b=-2$).
2. $\int \dfrac{1}{x^2+16}\,dx = \dfrac{1}{4}\arctan\dfrac{x}{4} + C$ (dạng 6.2, $a=4$).
3. $\int \dfrac{1}{x^2+1}\,dx = \arctan x + C$ (dạng 6.2 với $a=1$ → hệ số $\frac{1}{a}=1$, về đúng bảng cơ bản).
4. $\int \cot x\,dx = \int \dfrac{\cos x}{\sin x}\,dx = \ln\lvert\sin x\rvert + C$ (cùng kỹ thuật 6.3, đặt $u=\sin x$, $du=\cos x\,dx$ — lần này **không** có dấu trừ vì $(\sin x)'=+\cos x$).

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

## 7. Điều kiện ban đầu — khi nào `+C` "chốt" thành một số

Đến giờ $\int f\,dx = F + C$ luôn là **họ vô hạn**. Nhưng trong bài toán thực tế, ta thường biết thêm **một dữ kiện** về hàm — gọi là **điều kiện ban đầu (initial condition)** — đủ để xác định chính xác $C$, chọn ra **một** đường cong trong họ.

💡 **Trực giác**: nguyên hàm cho ta cả họ đường song song dọc (mục 1). Điều kiện ban đầu là "ghim một cái đinh" tại một điểm $(x_0, y_0)$ — chỉ đúng một đường trong họ đi qua đinh đó. Giải tìm $C$ = đẩy cả họ lên/xuống cho tới khi một đường chạm đinh.

### 7.1. Quy trình giải (3 bước)

```
Bài toán dạng:  F'(x) = f(x),  biết F(x₀) = y₀.  Tìm F.
1. Tích phân:   F(x) = ∫ f(x) dx = (nguyên hàm) + C.
2. Thế điều kiện: F(x₀) = y₀  → giải ra C.
3. Viết F với C cụ thể (KHÔNG còn +C).
```

### 7.2. Walk-through 1 — bài toán rơi tự do

Vật rơi tự do: gia tốc $a = g = 9.8\ \text{m/s}^2$. Biết vận tốc ban đầu $v(0) = 0$ và vị trí ban đầu $s(0) = 0$. Tìm $s(t)$.

**Tầng 1 — từ gia tốc ra vận tốc** ($v' = a$):

$$v(t) = \int 9.8\,dt = 9.8t + C_1.$$

Điều kiện $v(0) = 0$: $9.8\cdot 0 + C_1 = 0 \Rightarrow C_1 = 0$. Vậy $v(t) = 9.8t$.

**Tầng 2 — từ vận tốc ra vị trí** ($s' = v$):

$$s(t) = \int 9.8t\,dt = 9.8\cdot\frac{t^2}{2} + C_2 = 4.9t^2 + C_2.$$

Điều kiện $s(0) = 0$: $4.9\cdot 0 + C_2 = 0 \Rightarrow C_2 = 0$. Vậy **$s(t) = 4.9t^2$** — công thức rơi tự do quen thuộc, suy ra hoàn toàn từ nguyên hàm + điều kiện ban đầu. Nếu thả từ độ cao $100$ m thì $s(0) = 100$ thay vì $0$ → $C_2 = 100$ → $s(t) = 4.9t^2 + 100$ (đo từ mặt đất xuống thì dấu khác). Điểm cốt lõi: **cùng một $f$, $C$ khác nhau cho ra hàm khác nhau** — bỏ $C$ là mất nghiệm đúng.

### 7.3. Walk-through 2 — thuần đại số

Tìm $y(x)$ biết $y'(x) = 3x^2 - 4x$ và $y(1) = 5$.

1. $y(x) = \int (3x^2 - 4x)\,dx = x^3 - 2x^2 + C$.
2. Thế $y(1) = 5$: $1^3 - 2\cdot 1^2 + C = 1 - 2 + C = -1 + C = 5 \Rightarrow C = 6$.
3. **$y(x) = x^3 - 2x^2 + 6$**. Verify: $y(1) = 1 - 2 + 6 = 5$ ✓ và $y'(x) = 3x^2 - 4x$ ✓.

### 7.4. Walk-through 3 — điều kiện không tại 0

Tìm $y$ biết $y' = \cos x$ và $y(\pi/2) = 3$.

1. $y = \int \cos x\,dx = \sin x + C$.
2. $y(\pi/2) = \sin(\pi/2) + C = 1 + C = 3 \Rightarrow C = 2$.
3. **$y = \sin x + 2$**. Verify: $y(\pi/2) = 1 + 2 = 3$ ✓.

### 7.5. Walk-through 4 — hàm mũ

Mô hình tăng trưởng: $P'(t) = 2e^{t}$ (tốc độ tăng dân số), biết $P(0) = 10$.

1. $P(t) = \int 2e^t\,dt = 2e^t + C$.
2. $P(0) = 2e^0 + C = 2 + C = 10 \Rightarrow C = 8$.
3. **$P(t) = 2e^t + 8$**. Verify: $P(0) = 2 + 8 = 10$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cần bao nhiêu điều kiện ban đầu?"* Mỗi lần tích phân sinh ra một hằng số → cần **một** điều kiện cho mỗi lần. Bài rơi tự do tích phân 2 lần (gia tốc → vận tốc → vị trí) nên cần **2** điều kiện: $v(0)$ và $s(0)$.
- *"Điều kiện ban đầu có nhất thiết tại $x = 0$?"* Không. Như 7.4 dùng $x = \pi/2$. Tên gọi "ban đầu" mang tính lịch sử (bài toán theo thời gian, $t=0$); toán học chỉ cần **một điểm bất kỳ** mà hàm đi qua.

⚠ **Lỗi thường gặp — quên `+C` rồi không giải được $C$**. Nếu ở bước 1 viết $y = x^3 - 2x^2$ (thiếu $C$), thì bước 2 không có gì để giải, và nghiệm sai khi $y(1) \neq$ giá trị cho trước. `+C` ở đây **không** phải trang trí — nó chính là biến cần tìm.

🔁 **Dừng lại tự kiểm tra**

1. Tìm $y$ biết $y' = 6x$ và $y(0) = -4$.
2. Vật ném lên có $v' = -9.8$, $v(0) = 20$ m/s. Tìm $v(t)$ và thời điểm $v = 0$ (đỉnh).

<details><summary>Đáp án</summary>

1. $y = \int 6x\,dx = 3x^2 + C$; $y(0) = C = -4$ → $y = 3x^2 - 4$.
2. $v(t) = \int -9.8\,dt = -9.8t + C$; $v(0) = C = 20$ → $v(t) = 20 - 9.8t$. Đỉnh khi $v = 0$: $20 - 9.8t = 0 \Rightarrow t = \frac{20}{9.8} \approx 2.04$ s.

</details>

### 📝 Tóm tắt mục 7

- Điều kiện ban đầu "chốt" `+C` thành một số → chọn **một** đường trong họ nguyên hàm.
- Quy trình: tích phân ra $F + C$ → thế điều kiện → giải $C$ → viết $F$ cụ thể.
- Cần **một điều kiện cho mỗi lần** tích phân; điều kiện có thể tại điểm $x$ bất kỳ.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính $\int (x^4 + 3x^2 - 5)\,dx$.

**Bài 2**: Tính $\int \sin(2x)\,dx$.

**Bài 3**: Tính $\int x^2\cdot e^{x^3}\,dx$.

**Bài 4**: Tính $\int x\cdot\sin x\,dx$.

**Bài 5**: Tính $\int \frac{1}{x^2+4}\,dx$.

**Bài 6**: Tính $\int \dfrac{x^2 - 1}{x}\,dx$ (gợi ý: chia trước, không dùng quy tắc thương).

**Bài 7**: Tính $\int x^2\,\ln x\,dx$ (từng phần; chọn $u$ theo LIATE).

**Bài 8**: Tìm $y(x)$ biết $y'(x) = 4x^3 - \dfrac{2}{x}$ và $y(1) = 0$ (điều kiện ban đầu).

### Lời giải

**Bài 1**: $\frac{x^5}{5} + x^3 - 5x + C$. Verify: đạo hàm $= x^4 + 3x^2 - 5$ ✓.

**Bài 2**: $u = 2x$ → $\int \sin u \cdot \frac{du}{2} = -\frac{1}{2}\cdot\cos u + C =$ **$-\frac{1}{2}\cdot\cos(2x) + C$**. Verify: $\left(-\frac{1}{2}\cos 2x\right)' = -\frac{1}{2}\cdot(-\sin 2x)\cdot 2 = \sin 2x$ ✓.

**Bài 3**: $u = x^3$, $du = 3x^2\,dx$ → $x^2\,dx = \frac{du}{3}$. → $\frac{1}{3}\cdot\int e^u\,du =$ **$\frac{1}{3}\cdot e^{x^3} + C$**. Verify: $\left(\frac{1}{3}e^{x^3}\right)' = \frac{1}{3}e^{x^3}\cdot 3x^2 = x^2 e^{x^3}$ ✓.

**Bài 4**: Từng phần: $u = x$, $dv = \sin x\,dx$. $v = -\cos x$. → $-x\cdot\cos x + \int \cos x\,dx =$ **$-x\cdot\cos x + \sin x + C$**. Verify: $(-x\cos x + \sin x)' = -\cos x + x\sin x + \cos x = x\sin x$ ✓.

**Bài 5**: Dạng $\frac{1}{x^2+a^2}$ với $a=2$ → **$\frac{1}{2}\cdot\arctan\frac{x}{2} + C$**. Verify: $\left(\frac{1}{2}\arctan\frac{x}{2}\right)' = \frac{1}{2}\cdot\frac{1/2}{1+(x/2)^2} = \frac{1}{4+x^2}$ ✓.

**Bài 6**: **Cách tiếp cận** — không có quy tắc thương; chia tử cho mẫu trước:
$$\int \frac{x^2-1}{x}\,dx = \int\left(x - \frac{1}{x}\right)dx = \frac{x^2}{2} - \ln\lvert x\rvert + C.$$
Verify: $\left(\frac{x^2}{2} - \ln\lvert x\rvert\right)' = x - \frac{1}{x} = \frac{x^2-1}{x}$ ✓. **Độ phức tạp**: chỉ một phép chia đại số + tra bảng.

**Bài 7**: **Từng phần**, LIATE: Log ưu tiên hơn Algebraic → $u = \ln x$, $dv = x^2\,dx$. Khi đó $du = \frac{1}{x}\,dx$, $v = \frac{x^3}{3}$.
$$\begin{aligned}
\int x^2\ln x\,dx &= \frac{x^3}{3}\ln x - \int \frac{x^3}{3}\cdot\frac{1}{x}\,dx \\
&= \frac{x^3}{3}\ln x - \int \frac{x^2}{3}\,dx \\
&= \frac{x^3}{3}\ln x - \frac{x^3}{9} + C = \frac{x^3}{9}(3\ln x - 1) + C.
\end{aligned}$$
Verify: $\left(\frac{x^3}{3}\ln x - \frac{x^3}{9}\right)' = x^2\ln x + \frac{x^3}{3}\cdot\frac{1}{x} - \frac{x^2}{3} = x^2\ln x + \frac{x^2}{3} - \frac{x^2}{3} = x^2\ln x$ ✓.

**Bài 8**: **Điều kiện ban đầu** (mục 7).
1. $y(x) = \int\left(4x^3 - \frac{2}{x}\right)dx = x^4 - 2\ln\lvert x\rvert + C$.
2. Thế $y(1) = 0$: $1^4 - 2\ln 1 + C = 1 - 0 + C = 1 + C = 0 \Rightarrow C = -1$.
3. **$y(x) = x^4 - 2\ln\lvert x\rvert - 1$**. Verify: $y(1) = 1 - 0 - 1 = 0$ ✓; $y'(x) = 4x^3 - \frac{2}{x}$ ✓.

---

## 9. Bài tiếp theo

[Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

## 📝 Tổng kết

1. **$\int f\,dx = F + C$** với $F' = f$. **Phải có +C** vì hằng số mất khi đạo hàm.
2. **Bảng cơ bản**: thuộc $x^n$, $\sin/\cos$, $e^x$, $\frac{1}{x}$, $\frac{1}{1+x^2}$.
3. **Đổi biến** = đảo chain rule. Đặt $u = $ phần "khó", $du$ có sẵn trong biểu thức.
4. **Từng phần** = đảo product rule: $\int u\,dv = uv - \int v\,du$. Chọn $u$ theo LIATE (đa thức bậc $k$ → áp $k$ lần).
5. Không có quy tắc nhân/chia trực tiếp như đạo hàm — gặp thương thử **biến đổi đại số** (chia tử cho mẫu) trước khi đổi biến.
6. **Điều kiện ban đầu** chốt `+C` thành số: tích phân ra $F+C$ → thế điều kiện → giải $C$. Cần một điều kiện cho mỗi lần tích phân.
