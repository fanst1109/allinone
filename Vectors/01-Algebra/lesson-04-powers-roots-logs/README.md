# Lesson 04 — Lũy thừa, căn, logarit

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lũy thừa** ($a^n$), **căn** ($\sqrt{a}$, $\sqrt[n]{a}$), **logarit** ($\log_b(x)$) — định nghĩa và ý nghĩa.
- Vận dụng thành thạo **các quy luật** liên quan: nhân/chia/lũy thừa của lũy thừa, đổi cơ số log.
- Trả lời được câu hỏi *"vì sao log biến phép nhân thành phép cộng?"* — và vì sao điều đó cực kỳ quan trọng trong ML.
- Hiểu vì sao $\log$ xuất hiện khắp nơi: Big-O của binary search, entropy, cross-entropy loss, log-likelihood.
- Implement được `logSumExp` ổn định số (numerically stable) trong Go — kỹ thuật chuẩn để tránh overflow khi cộng nhiều số mũ.

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/): biết biến đổi đại số, hiểu ký hiệu $x$, $y$, hằng số.
- Phép cộng/trừ/nhân/chia số thực; ý niệm về số dương/âm, số hữu tỉ.
- Khái niệm "phép tính ngược": trừ là ngược của cộng, chia là ngược của nhân — bài này sẽ thêm: **căn** là ngược của lũy thừa, **log** cũng là ngược của lũy thừa (nhưng theo trục khác).

> **Ghi nhớ chính của cả bài**: lũy thừa, căn, log là **ba góc nhìn của cùng một phép biến đổi**.
>
> Cho $b^x = y$:
> - Nếu biết $b$ và $x$, hỏi $y$ → đó là **lũy thừa**: $y = b^x$.
> - Nếu biết $b$ và $y$, hỏi $x$ → đó là **logarit**: $x = \log_b(y)$.
> - Nếu biết $x$ và $y$, hỏi $b$ → đó là **căn**: $b = y^{1/x} = \sqrt[x]{y}$.
>
> Đừng coi 3 thứ này là 3 chủ đề rời. Chúng là một.

---

## 1. Lũy thừa (power / exponent)

### 1.1. Định nghĩa cơ bản

💡 **Trực giác trước**: lũy thừa = **phép nhân lặp**. Cũng giống như nhân là phép cộng lặp ($3 \cdot 4 = 4 + 4 + 4$), lũy thừa là nhân lặp ($3^4 = 3 \cdot 3 \cdot 3 \cdot 3$). Cứ "leo lên một bậc" của phép tính: cộng → nhân → lũy thừa.

$a^n$ với $n$ là số nguyên dương: nhân $a$ với chính nó $n$ lần.

$$a^n = \underbrace{a \cdot a \cdot a \cdots a}_{n \text{ lần}}$$

- $a$ gọi là **cơ số** (base).
- $n$ gọi là **số mũ** (exponent).

Ví dụ tính tay:

| Biểu thức | Tính toán | Kết quả |
|-----------|-----------|---------|
| $2^3$ | $2 \cdot 2 \cdot 2$ | $8$ |
| $5^4$ | $5 \cdot 5 \cdot 5 \cdot 5 = 25 \cdot 25$ | $625$ |
| $10^6$ | $10 \cdot 10 \cdot 10 \cdot 10 \cdot 10 \cdot 10$ | $1\,000\,000$ (1 triệu) |
| $3^5$ | $3 \cdot 3 \cdot 3 \cdot 3 \cdot 3 = 9 \cdot 27$ | $243$ |
| $(-2)^4$ | $(-2)(-2)(-2)(-2) = 4 \cdot 4$ | $16$ (dương vì 4 dấu âm) |
| $(-2)^3$ | $(-2)(-2)(-2) = 4 \cdot (-2)$ | $-8$ (âm vì 3 dấu âm) |

**Quy tắc dấu**: cơ số âm + số mũ chẵn = dương; cơ số âm + số mũ lẻ = âm.

**Lũy thừa "bùng nổ" nhanh thế nào?** Một cảm giác cụ thể:

| $n$ | $2^n$ | $10^n$ |
|-----|-------|--------|
| $1$ | $2$ | $10$ |
| $5$ | $32$ | $100\,000$ |
| $10$ | $1\,024$ | $10$ tỷ |
| $20$ | $\approx 1$ triệu | $10^{20}$ (vô cùng lớn) |
| $30$ | $\approx 1$ tỷ | $10^{30}$ |

So với hàm tuyến tính $2n$ (chỉ ra $60$ khi $n = 30$), lũy thừa nuốt mọi tốc độ tuyến tính chỉ sau vài bước. Đây là lý do thuật toán $O(2^n)$ thực tế **không chạy nổi** với $n > 30$.

### 1.2. Số mũ đặc biệt: 0 và 1

- $a^1 = a$ — hiển nhiên, nhân $a$ "1 lần" là chính nó.
- $a^0 = 1$ với mọi $a \neq 0$ — đây là **quy ước**, nhưng có lý do chặt chẽ.

**Vì sao $a^0 = 1$?** Xuất phát từ quy luật $a^m / a^n = a^{m-n}$ (sẽ chứng minh ở mục 2). Cho $m = n$:

$$\frac{a^n}{a^n} = a^{n-n} = a^0$$

Vế trái rõ ràng bằng $1$ (số nào chia cho chính nó cũng bằng 1, miễn khác 0). Nên $a^0 = 1$.

Ví dụ: $5^0 = 1$, $(-7)^0 = 1$, $(0.5)^0 = 1$, $1000^0 = 1$.

Trường hợp $0^0$ là **không xác định** (toán học) hoặc **quy ước là 1** (lập trình, tổ hợp) — tùy ngữ cảnh. Trong Go, `math.Pow(0, 0) = 1`.

**Walk-through 3 ví dụ kiểm chứng $a^0 = 1$** (bằng cách dùng dãy đếm ngược, mỗi bước giảm 1 đơn vị mũ = chia cho cơ số):

$$\begin{aligned}
\textbf{Ví dụ a: } 3^0 \quad & 3^3 = 27 \\
& 3^2 = 27 / 3 = 9 \\
& 3^1 = 9 / 3 = 3 \\
& 3^0 = 3 / 3 = 1 \quad \checkmark \\[6pt]
\textbf{Ví dụ b: } 7^0 \quad & 7^2 = 49 \\
& 7^1 = 49 / 7 = 7 \\
& 7^0 = 7 / 7 = 1 \quad \checkmark \\[6pt]
\textbf{Ví dụ c: } (-4)^0 \quad & (-4)^2 = 16 \\
& (-4)^1 = 16 / (-4) = -4 \\
& (-4)^0 = (-4) / (-4) = 1 \quad \checkmark
\end{aligned}$$

Cả ba đều "kết thúc" tại $1$ — đó là lý do $a^0 = 1$ không phải quy ước tùy tiện, mà là điều kiện duy nhất giữ cho dãy nhất quán.

#### ❓ Câu hỏi tự nhiên: "Sao 0⁰ không xác định?"

Vì có **hai cách kéo dài** tới điểm này, và chúng cho ra hai đáp án khác nhau:

- Đường 1: cố định cơ số $0$, cho mũ tiến về $0$. Với mọi mũ dương: $0^1 = 0$, $0^{0.5} = 0$, $0^{0.01} = 0$, ... → giới hạn là $0$.
- Đường 2: cố định mũ $0$, cho cơ số tiến về $0$. Với mọi cơ số dương: $1^0 = 1$, $0.5^0 = 1$, $0.01^0 = 1$, ... → giới hạn là $1$.

Hai đường cho hai đáp án → toán học không gán giá trị nhất quán. Tuy nhiên trong **tổ hợp** (combinatorics), $0^0 = 1$ rất tiện (số cách "chọn không gì từ không gì" = 1 cách: cách trống), nên hầu hết ngôn ngữ lập trình theo quy ước này.

### 1.3. Số mũ âm

$a^{-n} = 1 / a^n$ với $a \neq 0$.

**Vì sao?** Cũng từ quy luật $a^m / a^n = a^{m-n}$. Lấy $m = 0$, $n$ dương:

$$\frac{a^0}{a^n} = a^{0-n} = a^{-n}$$

Vế trái $= 1 / a^n$. Nên $a^{-n} = 1/a^n$.

Ví dụ:

| Biểu thức | Tính | Kết quả |
|-----------|------|---------|
| $2^{-1}$ | $1/2^1 = 1/2$ | $0.5$ |
| $2^{-3}$ | $1/2^3 = 1/8$ | $0.125$ |
| $10^{-2}$ | $1/10^2 = 1/100$ | $0.01$ |
| $5^{-4}$ | $1/5^4 = 1/625$ | $0.0016$ |

**Walk-through 3 ví dụ kiểm chứng $a^{-n} = 1/a^n$ bằng quy luật $a^m / a^n = a^{m-n}$**:

$$\begin{aligned}
\textbf{Ví dụ a: } 2^{-3} \quad & \text{Cách 1 (định nghĩa số mũ âm): } 2^{-3} = 1 / 2^3 = 1/8 = 0.125 \\
& \text{Cách 2 (qua chia cùng cơ số): } 2^2 / 2^5 = 4 / 32 = 0.125 = 1/8 \\
& \text{Mặt khác: } 2^{2-5} = 2^{-3} \quad \checkmark \\[6pt]
\textbf{Ví dụ b: } 5^{-2} \quad & \text{Cách 1: } 5^{-2} = 1 / 5^2 = 1/25 = 0.04 \\
& \text{Cách 2: } 5^0 / 5^2 = 1 / 25 = 0.04 \\
& \text{Mặt khác: } 5^{0-2} = 5^{-2} \quad \checkmark \\[6pt]
\textbf{Ví dụ c: } 10^{-5} \quad & \text{Cách 1: } 10^{-5} = 1 / 10^5 = 1/100000 = 0.00001 \\
& \text{Cách 2: } 10^3 / 10^8 = 1000 / 100000000 = 0.00001 \\
& \text{Mặt khác: } 10^{3-8} = 10^{-5} \quad \checkmark
\end{aligned}$$

#### ❓ Câu hỏi tự nhiên: "Sao a⁻¹ = 1/a?"

Cách hiểu trực giác bằng **dãy đếm ngược**: mỗi khi số mũ giảm 1, ta **chia cho $a$**:

$$\begin{aligned}
2^3 &= 8 \\
2^2 &= 8 / 2 = 4 \\
2^1 &= 4 / 2 = 2 \\
2^0 &= 2 / 2 = 1 \qquad \leftarrow \text{Đây là lý do } a^0 = 1 \\
2^{-1} &= 1 / 2 = 0.5 \\
2^{-2} &= 0.5 / 2 = 0.25 \\
2^{-3} &= 0.25 / 2 = 0.125
\end{aligned}$$

Số mũ âm không có gì "lạ" — nó chỉ là sự tiếp diễn tự nhiên của dãy. Mỗi bước xuống = chia cho $a$.

#### 🔁 Dừng lại tự kiểm tra (mục 1.2-1.3)

Tính nhẩm các giá trị sau (không nhìn đáp án):

1. $7^0$ = ?
2. $(-1)^{100}$ = ?
3. $3^{-2}$ = ?
4. $10^{-4}$ = ?
5. $(0.5)^{-1}$ = ?

<details>
<summary>Đáp án</summary>

1. $1$ (bất kỳ số nào khác 0 mũ 0 đều bằng 1).
2. $1$ (cơ số âm + mũ chẵn = dương; cụ thể $(-1)^{\text{chẵn}} = 1$).
3. $1/9 \approx 0.111$.
4. $0.0001$ ($1/10000$).
5. $2$ ($1 / 0.5 = 2$).

</details>

### 1.4. Số mũ phân số (căn)

$a^{1/n} = \sqrt[n]{a}$ (căn bậc $n$ của $a$).

Cụ thể:
- $a^{1/2} = \sqrt{a}$ (căn bậc 2, thường viết tắt là $\sqrt{a}$).
- $a^{1/3} = \sqrt[3]{a}$ (căn bậc 3, hay "cube root").

**Vì sao?** Từ quy luật $(a^m)^n = a^{mn}$. Cho $m = 1/n$:

$$(a^{1/n})^n = a^{(1/n) \cdot n} = a^1 = a$$

Tức là số $a^{1/n}$ khi lũy thừa lên $n$ sẽ ra $a$ — đó chính là định nghĩa căn bậc $n$.

Ví dụ tính:

| Biểu thức | Vì sao | Kết quả |
|-----------|--------|---------|
| $9^{1/2}$ | $3 \cdot 3 = 9$ | $3$ |
| $8^{1/3}$ | $2 \cdot 2 \cdot 2 = 8$ | $2$ |
| $16^{1/4}$ | $2^4 = 16$ | $2$ |
| $32^{1/5}$ | $2^5 = 32$ | $2$ |

Tổng quát: $a^{m/n} = (a^{1/n})^m = \sqrt[n]{a^m}$.

Ví dụ $8^{2/3} = (8^{1/3})^2 = 2^2 = 4$. Hoặc $16^{3/4} = (16^{1/4})^3 = 2^3 = 8$. Hoặc $16^{0.75} = 16^{3/4} = 8$.

**Walk-through 3 ví dụ kiểm chứng $a^{m/n} = (\sqrt[n]{a})^m$**:

$$\begin{aligned}
\textbf{Ví dụ a: } 27^{2/3} \quad & \text{Cách 1 (căn trước, mũ sau): } (27^{1/3})^2 = 3^2 = 9 \\
& \text{Cách 2 (mũ trước, căn sau): } (27^2)^{1/3} = 729^{1/3} = 9 \ (\text{vì } 9^3 = 729) \\
& \checkmark \ \text{Cả hai bằng 9. Cách 1 dễ tính tay hơn (số nhỏ hơn).} \\[6pt]
\textbf{Ví dụ b: } 32^{3/5} \quad & \text{Cách 1: } (32^{1/5})^3 = 2^3 = 8 \ (\text{vì } 2^5 = 32) \\
& \text{Cách 2: } (32^3)^{1/5} = 32768^{1/5} = 8 \ (\text{vì } 8^5 = 32768) \\
& \checkmark \ \text{Bằng 8.} \\[6pt]
\textbf{Ví dụ c: } 81^{3/4} \quad & \text{Cách 1: } (81^{1/4})^3 = 3^3 = 27 \ (\text{vì } 3^4 = 81) \\
& \text{Cách 2: } (81^3)^{1/4} = 531441^{1/4} = 27 \ (\text{vì } 27^4 = 531441) \\
& \checkmark \ \text{Bằng 27.}
\end{aligned}$$

**Bài học**: với mũ phân số $m/n$, **luôn lấy căn trước, mũ sau** — số trung gian nhỏ, dễ tính tay.

#### ❓ Câu hỏi tự nhiên: "Số mũ là phân số có nghĩa lý gì?"

Nhân $a$ với chính nó "1/2 lần" nghe vô nghĩa. Nhưng nếu nhìn bằng **quy luật bảo toàn**:

- Muốn $a^{1/2} \cdot a^{1/2} = a^{1/2 + 1/2} = a^1 = a$ (theo quy luật $a^m \cdot a^n = a^{m+n}$).
- Tức là $a^{1/2}$ là "số nào nhân với chính nó được $a$" — đúng định nghĩa **căn bậc 2**.

Mở rộng: $a^{1/3} \cdot a^{1/3} \cdot a^{1/3} = a^1 = a$ → $a^{1/3}$ là căn bậc 3.

→ Số mũ phân số không phải "nhân nửa lần" mà là **mở rộng quy luật** sao cho mọi công thức lũy thừa vẫn đúng cho mọi số mũ thực, không chỉ số nguyên.

#### ❓ Câu hỏi tự nhiên: "Vậy còn số mũ là số vô tỉ như √2 hoặc π thì sao?"

$2^\pi \approx 8.825$ — máy tính trả về một con số cụ thể. Nhưng $\pi = 3.14159\ldots$ không kết thúc, làm sao "nhân $2$ với chính nó $\pi$ lần"?

Trả lời: dùng **giới hạn** (limit). Lấy chuỗi số hữu tỉ tiến về $\pi$:

$$\begin{aligned}
2^3       &= 8 \\
2^{3.1}     &\approx 8.574 \\
2^{3.14}    &\approx 8.815 \\
2^{3.141}   &\approx 8.821 \\
2^{3.1415}  &\approx 8.824 \\
2^{3.14159} &\approx 8.8249 \\
\ldots      &\to 2^\pi \approx 8.82497\ldots
\end{aligned}$$

Dãy hội tụ. Ta định nghĩa $2^\pi$ chính là giới hạn này. Quy luật $a^m \cdot a^n = a^{m+n}$ vẫn giữ — đó là vẻ đẹp của lũy thừa: nó "mở rộng liên tục" từ số nguyên ra mọi số thực.

→ Trong Go, `math.Pow(2, math.Pi)` trả về `8.824977827076287` — chính là giới hạn này được tính sẵn.

#### ⚠ Lỗi thường gặp với lũy thừa

- **Nhầm $a^m + a^n = a^{m+n}$** — sai. Cộng và lũy thừa không giao hoán theo cách đó. Vd $2^3 + 2^4 = 24$, không phải $2^7 = 128$.
- **Nhầm $(a+b)^n = a^n + b^n$** — sai. Đây là lỗi rất phổ biến với bình phương: $(a+b)^2 = a^2 + 2ab + b^2$, **không** $= a^2 + b^2$. Vd $(3+4)^2 = 49$, không phải $9 + 16 = 25$.
- **Nhầm dấu khi mũ âm**: $2^{-3} = -8$ (sai). Đúng: $2^{-3} = 1/8$. Số mũ âm **không** làm kết quả âm — nó làm kết quả nhỏ (nghịch đảo).
- **Nhầm $(-2)^2$ với $-2^2$**: $(-2)^2 = 4$ (bình phương của $-2$), còn $-2^2 = -4$ (lấy âm của $2^2$). Thứ tự ưu tiên: lũy thừa trước, dấu âm sau.

#### 🔁 Dừng lại tự kiểm tra (mục 1.4)

1. $27^{1/3}$ = ?
2. $81^{1/4}$ = ?
3. $25^{3/2}$ = ?
4. $(-8)^{1/3}$ = ?
5. $100^{-1/2}$ = ?

<details>
<summary>Đáp án</summary>

1. $3$ (vì $3^3 = 27$).
2. $3$ (vì $3^4 = 81$).
3. $(25^{1/2})^3 = 5^3 = 125$.
4. $-2$ (căn bậc lẻ của số âm có nghĩa: $(-2)^3 = -8$).
5. $1 / 100^{1/2} = 1/10 = 0.1$.

</details>

#### Tóm tắt mục 1

- Lũy thừa = nhân lặp. $a^n$ "leo bậc" rất nhanh.
- $a^0 = 1$ ($a \neq 0$), $a^{-n} = 1/a^n$, $a^{1/n} = \sqrt[n]{a}$ — tất cả suy ra từ quy luật $a^m \cdot a^n = a^{m+n}$.
- Số mũ có thể là nguyên, âm, phân số, hay số thực bất kỳ — quy luật vẫn nhất quán.

---

## 2. Quy luật lũy thừa (laws of exponents)

Đây là 5 quy luật **phải thuộc**. Mỗi quy luật đều có ví dụ số cụ thể để bạn tự kiểm chứng.

| # | Quy luật | Tên |
|---|----------|-----|
| 1 | $a^m \cdot a^n = a^{m+n}$ | Nhân cùng cơ số → cộng số mũ |
| 2 | $a^m / a^n = a^{m-n}$ | Chia cùng cơ số → trừ số mũ |
| 3 | $(a^m)^n = a^{m \cdot n}$ | Lũy thừa của lũy thừa → nhân số mũ |
| 4 | $(a \cdot b)^n = a^n \cdot b^n$ | Lũy thừa của tích → tích các lũy thừa |
| 5 | $(a / b)^n = a^n / b^n$ | Lũy thừa của thương → thương các lũy thừa |

### Kiểm chứng từng quy luật bằng số

**Quy luật 1**: $a^m \cdot a^n = a^{m+n}$

Ví dụ 1.1:
$$2^3 \cdot 2^4 = 8 \cdot 16 = 128, \qquad 2^{3+4} = 2^7 = 128 \quad \checkmark$$

Ví dụ 1.2:
$$5^2 \cdot 5^3 = 25 \cdot 125 = 3125, \qquad 5^{2+3} = 5^5 = 3125 \quad \checkmark$$

Ví dụ 1.3 (mũ âm):
$$10^4 \cdot 10^{-2} = 10000 \cdot 0.01 = 100, \qquad 10^{4 + (-2)} = 10^2 = 100 \quad \checkmark$$

Ví dụ 1.4 (mũ phân số):
$$2^{1/2} \cdot 2^{1/2} = \sqrt{2} \cdot \sqrt{2} = 2, \qquad 2^{1/2 + 1/2} = 2^1 = 2 \quad \checkmark$$

**Trực giác**: $2^3$ là 3 thừa số 2, $2^4$ là 4 thừa số 2, ghép lại là 7 thừa số 2 $= 2^7$.

**Quy luật 2**: $a^m / a^n = a^{m-n}$

Ví dụ 2.1:
$$3^5 / 3^2 = 243 / 9 = 27, \qquad 3^{5-2} = 3^3 = 27 \quad \checkmark$$

Ví dụ 2.2:
$$10^6 / 10^4 = 1\,000\,000 / 10\,000 = 100, \qquad 10^{6-4} = 10^2 = 100 \quad \checkmark$$

Ví dụ 2.3 (kết quả âm số mũ):
$$2^3 / 2^5 = 8 / 32 = 0.25 = 1/4, \qquad 2^{3-5} = 2^{-2} = 1/4 \quad \checkmark$$

**Trực giác**: $(3 \cdot 3 \cdot 3 \cdot 3 \cdot 3) / (3 \cdot 3) = 3 \cdot 3 \cdot 3$ — triệt tiêu 2 thừa số.

**Quy luật 3**: $(a^m)^n = a^{m \cdot n}$

Ví dụ 3.1:
$$(2^3)^2 = 8^2 = 64, \qquad 2^{3 \cdot 2} = 2^6 = 64 \quad \checkmark$$

Ví dụ 3.2:
$$(10^2)^3 = 100^3 = 1\,000\,000, \qquad 10^{2 \cdot 3} = 10^6 = 1\,000\,000 \quad \checkmark$$

Ví dụ 3.3 (mũ phân số):
$$(4^{1/2})^4 = 2^4 = 16, \qquad 4^{(1/2) \cdot 4} = 4^2 = 16 \quad \checkmark$$

**Trực giác**: $(2^3)^2 = 2^3 \cdot 2^3$ (theo định nghĩa lũy thừa), mà $2^3 \cdot 2^3 = 2^{3+3} = 2^6$ theo quy luật 1.

**Quy luật 4**: $(a \cdot b)^n = a^n \cdot b^n$

Ví dụ 4.1:
$$(2 \cdot 3)^4 = 6^4 = 1296, \qquad 2^4 \cdot 3^4 = 16 \cdot 81 = 1296 \quad \checkmark$$

Ví dụ 4.2:
$$(5 \cdot 2)^3 = 10^3 = 1000, \qquad 5^3 \cdot 2^3 = 125 \cdot 8 = 1000 \quad \checkmark$$

Ví dụ 4.3:
$$(4 \cdot 25)^{1/2} = 100^{1/2} = 10, \qquad 4^{1/2} \cdot 25^{1/2} = 2 \cdot 5 = 10 \quad \checkmark$$

**Trực giác**: $(2 \cdot 3)^4 = (2 \cdot 3)(2 \cdot 3)(2 \cdot 3)(2 \cdot 3)$ — đổi vị trí → $(2 \cdot 2 \cdot 2 \cdot 2)(3 \cdot 3 \cdot 3 \cdot 3) = 2^4 \cdot 3^4$.

**Quy luật 5**: $(a / b)^n = a^n / b^n$

Ví dụ 5.1:
$$(6 / 2)^3 = 3^3 = 27, \qquad 6^3 / 2^3 = 216 / 8 = 27 \quad \checkmark$$

Ví dụ 5.2:
$$(10 / 5)^4 = 2^4 = 16, \qquad 10^4 / 5^4 = 10000 / 625 = 16 \quad \checkmark$$

Ví dụ 5.3:
$$\left(\frac{4}{9}\right)^{1/2} = \sqrt{\frac{4}{9}} = \frac{2}{3}, \qquad 4^{1/2} / 9^{1/2} = \frac{2}{3} \quad \checkmark$$

### Cảnh báo: những thứ KHÔNG đúng

Người mới hay nhầm các "quy luật giả" sau:

- **$a^m + a^n \neq a^{m+n}$** — **sai**. $2^3 + 2^4 = 8 + 16 = 24$, không phải $2^7 = 128$.
- **$(a + b)^n \neq a^n + b^n$** — **sai**. $(2+3)^2 = 25$, không phải $4 + 9 = 13$. (Đúng: $(a+b)^2 = a^2 + 2ab + b^2$.)
- **$a^m \cdot b^n \neq (a \cdot b)^{m+n}$** khi cơ số khác nhau — quy luật 1 chỉ áp dụng khi **cùng cơ số**. Ví dụ $2^3 \cdot 3^2 = 8 \cdot 9 = 72$, không thể "gộp" thành $(2 \cdot 3)^5 = 6^5 = 7776$.
- **Nhầm $a^{m \cdot n}$ với $a^{m^n}$** — $2^{3 \cdot 2} = 2^6 = 64$, còn $2^{3^2} = 2^9 = 512$. Khác hẳn.
- **Quên rằng quy luật chia chỉ đúng với $a \neq 0$** — $0^m / 0^n$ không xác định.

#### 🔁 Dừng lại tự kiểm tra (mục 2)

Rút gọn (không tính ra số cuối) hoặc tính nhanh:

1. $2^7 \cdot 2^3$ = ?
2. $5^{10} / 5^7$ = ?
3. $(3^2)^4$ = ?
4. $(2 \cdot 5)^6$ = ? (so với $2^6 \cdot 5^6$)
5. $x^5 \cdot x^{-3}$ = ?
6. $(x^2 \cdot y^3)^2$ = ?

<details>
<summary>Đáp án</summary>

1. $2^{7+3} = 2^{10} = 1024$.
2. $5^{10-7} = 5^3 = 125$.
3. $3^{2 \cdot 4} = 3^8 = 6561$.
4. Cả hai $= 10^6 = 1\,000\,000$ (quy luật 4 đảm bảo bằng nhau).
5. $x^{5+(-3)} = x^2$.
6. $(x^2)^2 \cdot (y^3)^2 = x^4 \cdot y^6$ (kết hợp quy luật 4 và 3).

</details>

#### Tóm tắt mục 2

- 5 quy luật lũy thừa đều bắt nguồn từ **định nghĩa nhân lặp**.
- Nhân/chia/lũy thừa của lũy thừa = các phép cộng/trừ/nhân trên số mũ.
- KHÔNG có "quy luật" cho $+$ hay $-$ của hai lũy thừa — đó là cái bẫy lớn nhất.

---

## 3. Căn (root)

💡 **Trực giác trước**: căn là **phép tính ngược của lũy thừa theo bậc**. Nếu bình phương "đưa số đi lên": $3 \to 9$, thì căn bậc 2 "đưa ngược về": $9 \to 3$. Bậc lũy thừa và bậc căn phải khớp: căn bậc 2 ngược với mũ 2, căn bậc 3 ngược với mũ 3, ...

### 3.1. Định nghĩa

$\sqrt{a}$ (căn bậc 2) là số $x \geq 0$ sao cho $x^2 = a$. Yêu cầu $a \geq 0$ (trong số thực — số âm có căn phức nhưng không thuộc phạm vi bài này).

Tổng quát: $\sqrt[n]{a}$ (căn bậc $n$) là số $x$ sao cho $x^n = a$.

- Với $n$ chẵn: cần $a \geq 0$.
- Với $n$ lẻ: $a$ có thể âm. Ví dụ $\sqrt[3]{-8} = -2$.

Như đã nói ở mục 1.4, đây chỉ là cách viết khác của lũy thừa phân số: $\sqrt[n]{a} = a^{1/n}$.

### 3.2. Quy luật căn

Suy ra trực tiếp từ quy luật lũy thừa (vì căn là lũy thừa với mũ $1/n$):

| Quy luật | Ví dụ |
|----------|-------|
| $\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}$ | $\sqrt{36} = \sqrt{4 \cdot 9} = \sqrt{4} \cdot \sqrt{9} = 2 \cdot 3 = 6$ ✓ |
| $\sqrt{a / b} = \sqrt{a} / \sqrt{b}$ | $\sqrt{25/16} = \sqrt{25} / \sqrt{16} = 5/4$ ✓ |
| $\sqrt{a^2} = \lvert a \rvert$ | $\sqrt{(-3)^2} = \sqrt{9} = 3 = \lvert -3 \rvert$ ✓ |

**Walk-through 3 ví dụ kiểm chứng $\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}$**:

$$\begin{aligned}
\textbf{Ví dụ a: } \sqrt{4 \cdot 9} \quad & \text{VT: } \sqrt{4 \cdot 9} = \sqrt{36} = 6 \\
& \text{VP: } \sqrt{4} \cdot \sqrt{9} = 2 \cdot 3 = 6 \quad \checkmark \\[6pt]
\textbf{Ví dụ b: } \sqrt{2 \cdot 8} \quad & \text{VT: } \sqrt{2 \cdot 8} = \sqrt{16} = 4 \\
& \text{VP: } \sqrt{2} \cdot \sqrt{8} = 1.414\ldots \cdot 2.828\ldots \approx 4.0 \\
& \checkmark \ \text{Bằng 4 (chính xác: } \sqrt{2} \cdot \sqrt{8} = \sqrt{2} \cdot \sqrt{4 \cdot 2} = \sqrt{2} \cdot 2\sqrt{2} = 2 \cdot 2 = 4) \\[6pt]
\textbf{Ví dụ c: } \sqrt{0.25 \cdot 16} \quad & \text{VT: } \sqrt{0.25 \cdot 16} = \sqrt{4} = 2 \\
& \text{VP: } \sqrt{0.25} \cdot \sqrt{16} = 0.5 \cdot 4 = 2 \quad \checkmark
\end{aligned}$$

### 3.3. Cảnh báo phổ biến

#### ⚠ Lỗi thường gặp với căn

- **$\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$** — đây là lỗi sai **cực kỳ hay gặp**. Thử số: $\sqrt{9 + 16} = \sqrt{25} = 5$, nhưng $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$. **Không bằng nhau.** Tổng quát: căn chỉ "phân phối" qua **nhân/chia**, không qua **cộng/trừ**.
- **$\sqrt{a - b} \neq \sqrt{a} - \sqrt{b}$** — sai tương tự. $\sqrt{25 - 9} = \sqrt{16} = 4$, nhưng $\sqrt{25} - \sqrt{9} = 5 - 3 = 2$. Khác hẳn.
- **$\sqrt{a^2} = a$** — sai khi $a < 0$. Đúng: $\sqrt{a^2} = \lvert a \rvert$. Ví dụ $\sqrt{(-3)^2} = \sqrt{9} = 3$, không phải $-3$.
- **Nhầm $\sqrt{-x}$ với $-\sqrt{x}$** — $\sqrt{-4}$ không tồn tại trong số thực (vì không có số thực bình phương bằng $-4$). Còn $-\sqrt{4} = -2$ (lấy âm của căn) thì tồn tại.
- **Lấy căn cả tử lẫn mẫu nhưng quên điều kiện mẫu $\neq 0$** — $\sqrt{a/b}$ đòi $b \neq 0$ và (nếu căn bậc chẵn) cả $a/b \geq 0$.

### 3.4. Đơn giản hóa căn

Khi gặp $\sqrt{72}$, ta tách thừa số chính phương:

$$\begin{aligned}
72 &= 36 \cdot 2 = 6^2 \cdot 2 \\
\sqrt{72} &= \sqrt{6^2 \cdot 2} = \sqrt{6^2} \cdot \sqrt{2} = 6\sqrt{2}
\end{aligned}$$

Tương tự $\sqrt{48} = \sqrt{16 \cdot 3} = 4\sqrt{3}$, $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$.

#### 🔁 Dừng lại tự kiểm tra (mục 3)

1. $\sqrt{16 \cdot 25}$ = ?
2. $\sqrt{49 + 0}$ so với $\sqrt{49} + \sqrt{0}$?
3. $\sqrt{98}$ đơn giản hóa = ?
4. $\sqrt{(-5)^2}$ = ?
5. $\sqrt{144/9}$ = ?

<details>
<summary>Đáp án</summary>

1. $\sqrt{400} = 20$. (Hoặc $\sqrt{16} \cdot \sqrt{25} = 4 \cdot 5 = 20$.)
2. Cả hai bằng $7$ (vì cộng với $0$ không thay đổi). Đây là trường hợp đặc biệt khi quy tắc sai "tình cờ đúng" — đừng tổng quát hóa!
3. $\sqrt{98} = \sqrt{49 \cdot 2} = 7\sqrt{2} \approx 9.899$.
4. $\lvert -5 \rvert = 5$. Lưu ý lấy giá trị tuyệt đối.
5. $\sqrt{144} / \sqrt{9} = 12/3 = 4$.

</details>

#### Tóm tắt mục 3

- Căn bậc $n$ = lũy thừa với mũ $1/n$, là phép ngược của lũy thừa theo bậc.
- Phân phối qua **nhân/chia**, KHÔNG qua **cộng/trừ** — đây là lỗi #1.
- Căn bậc chẵn của số âm không tồn tại trong số thực; căn bậc lẻ thì có.
- $\sqrt{a^2} = \lvert a \rvert$, không phải $a$.

---

## 4. Logarit — định nghĩa và trực giác

💡 **Trực giác trước**: log là **phép tính ngược của lũy thừa theo số mũ**. Lũy thừa hỏi: "cơ số $b$ mũ $y$ bằng bao nhiêu?" → log đảo lại: "cơ số $b$ phải mũ bao nhiêu để được $x$?". Căn cũng ngược của lũy thừa, nhưng theo trục khác (theo **bậc**, không phải theo **mũ**).

| Phép gốc | Ngược lại (giải $x$) | Ngược lại (giải $b$) |
|----------|----------------------|----------------------|
| $b^y = x$ | $y = \log_b(x)$ ← log | $b = x^{1/y} = \sqrt[y]{x}$ ← căn |

→ Log và căn là **hai cách "đảo"** cùng phép lũy thừa, chỉ khác chỗ ẩn nằm ở đâu.

### 4.1. Trực giác trước

**Câu hỏi gốc**: *"Phải nâng $b$ lên lũy thừa bao nhiêu để được $x$?"*

Câu trả lời chính là $\log_b(x)$.

Ví dụ rất cụ thể:

| Câu hỏi | Trả lời | Viết bằng log |
|---------|---------|---------------|
| $2$ mũ mấy bằng $8$? | $3$ (vì $2^3 = 8$) | $\log_2(8) = 3$ |
| $2$ mũ mấy bằng $1024$? | $10$ (vì $2^{10} = 1024$) | $\log_2(1024) = 10$ |
| $10$ mũ mấy bằng $1000$? | $3$ (vì $10^3 = 1000$) | $\log_{10}(1000) = 3$ |
| $10$ mũ mấy bằng $1\,000\,000$? | $6$ | $\log_{10}(1\,000\,000) = 6$ |
| $5$ mũ mấy bằng $25$? | $2$ | $\log_5(25) = 2$ |
| $3$ mũ mấy bằng $1$? | $0$ (vì $3^0 = 1$) | $\log_3(1) = 0$ |

**Một câu thần chú để nhớ**: *"log đếm xem cơ số phải lũy thừa bao nhiêu lần."*

### 4.2. Định nghĩa chính thức

$$\log_b(x) = y \quad \Longleftrightarrow \quad b^y = x$$

Điều kiện:

- $b > 0$ và $b \neq 1$ (vì $1^y = 1$ mãi mãi, không thể "giải" được).
- $x > 0$ (vì $b^y$ luôn dương khi $b > 0$).

**Lưu ý quan trọng**: log chỉ định nghĩa cho số **dương**. $\log(0)$ và $\log(\text{số âm})$ đều **không xác định** trong số thực.

- $\log(0)$ → "không tồn tại" (giới hạn là $-\infty$ khi $x \to 0^+$).
- $\log(-5)$ → "không tồn tại" (trong số phức thì có, nhưng không trong bài này).

### 4.3. Hai giá trị log phải thuộc lòng

- $\log_b(1) = 0$ với mọi $b$ hợp lệ. Vì $b^0 = 1$.
- $\log_b(b) = 1$ với mọi $b$. Vì $b^1 = b$.

Hai phép kiểm tra này cực kỳ hữu ích để bắt lỗi: nếu bạn tính $\log_5(1)$ ra khác $0$, chắc chắn sai.

### 4.4. Xây trực giác bằng bảng log₂

Đây là bảng **phải nhìn cho đến khi thuộc** — log_2 là log dùng nhiều nhất trong CS:

| $x$ | $\log_2(x)$ | Vì sao |
|-----|------------|--------|
| $1$ | $0$ | $2^0 = 1$ |
| $2$ | $1$ | $2^1 = 2$ |
| $4$ | $2$ | $2^2 = 4$ |
| $8$ | $3$ | $2^3 = 8$ |
| $16$ | $4$ | $2^4 = 16$ |
| $32$ | $5$ | $2^5 = 32$ |
| $64$ | $6$ | $2^6 = 64$ |
| $128$ | $7$ | $2^7 = 128$ |
| $256$ | $8$ | $2^8 = 256$ |
| $512$ | $9$ | $2^9 = 512$ |
| $1024$ | $10$ | $2^{10} = 1024$ |
| $2048$ | $11$ | $2^{11} = 2048$ |
| $4096$ | $12$ | $2^{12} = 4096$ |
| $1\,048\,576$ | $20$ | $2^{20} \approx 1$ triệu |
| $1\,073\,741\,824$ | $30$ | $2^{30} \approx 1$ tỷ |

**Nhận xét quan trọng**: $x$ tăng **gấp đôi** thì $\log_2(x)$ chỉ tăng **+1**. Đây là bản chất của log — *tăng theo bậc nhân của input, không phải theo lượng cộng*.

#### Walk-through: tính nhẩm log₂(1000)

Hỏi: $2$ mũ mấy bằng $1000$?

Tra bảng quanh $1000$:

$$2^9 = 512 \ (\text{nhỏ hơn 1000}), \qquad 2^{10} = 1024 \ (\text{lớn hơn 1000})$$

Nên $\log_2(1000)$ nằm giữa $9$ và $10$, gần $10$ hơn (vì $1024$ rất gần $1000$).

Tính chính xác hơn: dùng quy luật đổi cơ số (mục 6):

$$\log_2(1000) = \frac{\log_{10}(1000)}{\log_{10}(2)} = \frac{3}{0.30103} \approx 9.9658$$

Hoặc dùng $\ln$: $\log_2(1000) = \ln(1000)/\ln(2) \approx 6.9078/0.6931 \approx 9.9658$.

→ Đáp số $\approx 9.97$. Trực giác: cần $2$ nhân với chính nó ~10 lần (chính xác 9.97) để vượt 1000.

#### ASCII đồ thị: log₂(x) tăng cực chậm so với x tuyến tính

```
y
↑
20│                                                    · linear y = x/50
  │                                            ·
  │                                    ·
15│                            ·
  │                    ·
  │              ·
10│        ·                                        ━━━ log_2(x) (đoạn cuối)
  │    ·                                  ━━━━━━━━━
  │  ·                       ━━━━━━━━━━━━
 5│ ·              ━━━━━━━━━━
  │·       ━━━━━━━
  │  ━━━━━━
 0└─━━━────┬────────┬────────┬────────┬────────┬───────→ x
  1       64       256     1024     16K    1 triệu
```

- Khi $x = 1$ → $\log_2(x) = 0$.
- Khi $x = 1024$ → $\log_2(x) = 10$ (chỉ mới $10$ sau khi $x$ đã đi cả ngàn đơn vị).
- Khi $x = 1$ triệu → $\log_2(x) = 20$. Để log tăng từ $10$ lên $20$ cần $x$ đi từ $1024$ lên $1$ triệu (tăng ~1000 lần).

So sánh: linear $y = x/50$ vượt log_2 rất nhanh và phóng lên trời, trong khi log_2 "bò" gần như nằm ngang ở phía trên.

→ Đây là lý do thuật toán $O(\log n)$ "nhanh như miễn phí": kể cả $n = 1$ tỷ, log chỉ là $30$.

#### ❓ Câu hỏi tự nhiên: "Sao log không tồn tại với số âm hoặc 0?"

Nhớ định nghĩa: $\log_b(x) = y$ nghĩa là tìm $y$ sao cho $b^y = x$.

- Với $b > 0$ (mặc định, vd $b = 10$): $b^y$ luôn **dương** với mọi $y$ thực. Ví dụ $10^{-100}$ rất nhỏ nhưng vẫn dương; $10^{100}$ rất lớn cũng dương. **Không có $y$ nào** làm $10^y = -5$ hay $10^y = 0$.
- $\log(0)$: hỏi "10 mũ mấy bằng 0?" → không có đáp án hữu hạn. Nhưng $10^y \to 0$ khi $y \to -\infty$. Nên người ta nói **$\log(0) = -\infty$** (giới hạn), không phải "không tồn tại tuyệt đối", mà là vô cùng.
- $\log(-5)$: hỏi "10 mũ mấy bằng -5?" → không có cả giới hạn. Trong số thực, **không xác định**.

→ Quy tắc nhớ: **log chỉ định nghĩa với số $> 0$**. Khi viết code, luôn check $x > 0$ trước khi gọi `math.Log(x)` — nếu không Go sẽ trả `NaN` (`-Inf` cho `Log(0)`).

#### ❓ Câu hỏi tự nhiên: "Khi nào dùng ln, khi nào dùng log₁₀, khi nào dùng log₂?"

Quy tắc thực dụng:

| Ngữ cảnh | Log nào | Vì sao |
|----------|---------|--------|
| Calculus, đạo hàm, tích phân | $\ln$ | Vì $(\ln x)' = 1/x$, công thức đẹp nhất |
| Xác suất, ML loss, log-likelihood | $\ln$ | Theo truyền thống thống kê và vì calculus dễ |
| Đo order of magnitude ("số này cỡ mấy số 0?") | $\log_{10}$ | Vì hệ thập phân |
| Vật lý / hóa: dB, Richter, pH | $\log_{10}$ | Quy ước ngành |
| Big-O của binary search, cây, heap | $\log_2$ (hoặc log không cơ số) | Vì cấu trúc là chia đôi |
| Information theory: entropy bit | $\log_2$ | Đơn vị `bit` định nghĩa qua $\log_2$ |
| Số bit cần để mã hóa $n$ giá trị | $\log_2$ | $\lceil \log_2(n) \rceil$ bit |

**Chuyển đổi**: ba log chỉ khác nhau **một hằng số nhân**:

$$\begin{aligned}
\log_{10}(x) &= \ln(x) / \ln(10)  &&\approx \ln(x) / 2.303 \\
\log_2(x)  &= \ln(x) / \ln(2)   &&\approx \ln(x) / 0.693 \\
\log_2(x)  &= \log_{10}(x) / \log_{10}(2)  &&\approx \log_{10}(x) / 0.301
\end{aligned}$$

Trong Big-O thì hằng số bị nuốt, nên $O(\log n)$ viết không cơ số là OK.

#### ❓ Câu hỏi tự nhiên: "Có 'log của log' không?"

Có. $\log(\log x)$ là phép log lồng log. Nó tăng **cực kỳ chậm** — chậm hơn cả log đơn.

| $x$ | $\log_2(x)$ | $\log_2(\log_2(x))$ |
|---|---|---|
| $1$ | $0$ | không xác định (log của 0) |
| $2$ | $1$ | $0$ |
| $4$ | $2$ | $1$ |
| $16$ | $4$ | $2$ |
| $65536$ | $16$ | $4$ |
| $2^{65536}$ | $65536$ | $16$ ← $x$ lớn không tưởng nhưng log log chỉ 16 |

Xuất hiện trong: thuật toán `Union-Find` với inverse Ackermann $\approx O(\log^* n)$ (log lặp), một số thuật toán phân tích string (suffix tree).

**Trong thực tế**: $\log \log$ của bất kỳ giá trị nào phù hợp vũ trụ này (số nguyên tử $\approx 10^{80}$, $\log_2 \approx 266$, $\log_2(266) \approx 8$) đều $\leq 10$. Coi như "hằng số".

#### ⚠ Lỗi thường gặp với log

- **Quên điều kiện $x > 0$** — viết $\log(x)$ mà không kiểm tra → khi $x \leq 0$ chương trình toang. Trong Go: `math.Log(-1) = NaN`, `math.Log(0) = -Inf`.
- **Nhầm $\log(x^2) = (\log x)^2$** — **sai**. Đúng: $\log(x^2) = 2 \cdot \log(x)$ (quy luật 3). Ví dụ $\log_{10}(100) = 2$, nhưng $(\log_{10}(10))^2 = 1^2 = 1$. Khác hẳn.
- **Nhầm $\log(x+y) = \log(x) + \log(y)$** — **sai**. Đúng: $\log(x \cdot y) = \log(x) + \log(y)$ (NHÂN bên trong, không phải CỘNG). Ví dụ $\log_{10}(10 + 100) = \log_{10}(110) \approx 2.04$, nhưng $\log_{10}(10) + \log_{10}(100) = 1 + 2 = 3$. Khác.
- **Nhầm $\log(x) / \log(y) = \log(x/y)$** — **sai**. Đúng: $\log(x) - \log(y) = \log(x/y)$ (HIỆU, không phải THƯƠNG). Còn $\log(x)/\log(y)$ là **đổi cơ số** $\log_y(x)$.
- **Nhầm $\log$ (không cơ số) trong Go là $\log_{10}$** — **sai**. Trong Go, `math.Log` là $\ln$ (cơ số $e$). `math.Log10` mới là log thập phân, `math.Log2` là log nhị phân.
- **Nhầm $\log(1/x) = 1/\log(x)$** — **sai**. Đúng: $\log(1/x) = -\log(x)$ (quy luật 2 với tử = 1).

#### 🔁 Dừng lại tự kiểm tra (mục 4)

1. $\log_3(81)$ = ?
2. $\log_{10}(0.0001)$ = ?
3. $\log_2(1)$ = ?
4. $\log_5(5)$ = ?
5. $\log_2(x)$ nằm giữa số nguyên nào nếu $x = 100$?
6. $\log(-3)$ (theo số thực) = ?

<details>
<summary>Đáp án</summary>

1. $4$ (vì $3^4 = 81$).
2. $-4$ (vì $0.0001 = 10^{-4}$).
3. $0$ (mọi log của 1 đều bằng 0).
4. $1$ (log của chính cơ số = 1).
5. Nằm giữa $6$ và $7$, vì $2^6 = 64 < 100 < 128 = 2^7$. Chính xác $\approx 6.644$.
6. Không xác định trong số thực.

</details>

#### Tóm tắt mục 4

- $\log_b(x) = y \Longleftrightarrow b^y = x$. Log là **phép ngược của lũy thừa theo số mũ**.
- Điều kiện: $b > 0$, $b \neq 1$, $x > 0$.
- Hai giá trị "vàng": $\log_b(1) = 0$, $\log_b(b) = 1$.
- Log tăng cực chậm — $x$ gấp đôi chỉ làm log tăng $+1$. Đây là gốc của "thuật toán log n nhanh như miễn phí".

---

## 5. Ba loại log phổ biến

Trong toán học và CS, **chỉ 3 cơ số được dùng thường xuyên**:

### 5.1. log₁₀(x) — log thập phân

Còn ghi tắt là $\log(x)$ (không có chỉ số). Đặc biệt hữu ích cho:

- Đo *order of magnitude* (bậc độ lớn): nếu $\log_{10}(N) \approx 6$ thì $N$ cỡ 1 triệu.
- Đại lượng vật lý: Richter (động đất), decibel (âm thanh), pH (hóa học) đều là $\log_{10}$.

Bảng phải nhớ:

| $x$ | $\log_{10}(x)$ |
|-----|-------------|
| $1$ | $0$ |
| $10$ | $1$ |
| $100$ | $2$ |
| $1\,000$ | $3$ |
| $1\,000\,000$ (1 triệu) | $6$ |
| $1\,000\,000\,000$ (1 tỷ) | $9$ |
| $0.1$ | $-1$ |
| $0.01$ | $-2$ |
| $0.001$ | $-3$ |

### 5.2. logₑ(x) = ln(x) — log tự nhiên

$e \approx 2.71828\ldots$ là **hằng số Euler**, xuất hiện tự nhiên trong giải tích (đạo hàm của $e^x$ là chính nó). Khi học calculus, log tự nhiên là log "mặc định" — mọi công thức tích phân/đạo hàm dùng $\ln$ cho đẹp.

Trong ML/AI, hầu hết các loss function viết bằng $\ln$ (`cross-entropy`, `log-likelihood` mặc định dùng $\ln$). Trong Go: `math.Log(x)` chính là $\ln(x)$ (đừng nhầm với $\log_{10}$).

Bảng phải nhớ:

| $x$ | $\ln(x)$ |
|-----|---------|
| $1$ | $0$ |
| $e \approx 2.71828$ | $1$ |
| $e^2 \approx 7.389$ | $2$ |
| $e^3 \approx 20.086$ | $3$ |
| $1/e \approx 0.368$ | $-1$ |

### 5.3. log₂(x) — log nhị phân

Trong CS, đây là log phổ biến nhất. Xuất hiện ở:

- **Big-O của binary search**: $O(\log_2 n)$.
- **Depth của cây nhị phân cân bằng** chứa $n$ nút: $\approx \log_2(n)$.
- **Entropy bit** (thông tin học): $H = -\sum p \cdot \log_2(p)$.
- **Số bit cần để biểu diễn $n$ giá trị**: $\lceil \log_2(n) \rceil$.

Bảng phải thuộc (vì $2^k$ là số quen):

| $x$ | $\log_2(x)$ |
|-----|------------|
| $1$ | $0$ |
| $2$ | $1$ |
| $4$ | $2$ |
| $8$ | $3$ |
| $16$ | $4$ |
| $32$ | $5$ |
| $64$ | $6$ |
| $128$ | $7$ |
| $256$ | $8$ |
| $1024$ | $10$ |
| $1\,048\,576$ ($\approx 1$ triệu) | $20$ |

**Mẹo**: nếu nhớ $2^{10} = 1024 \approx 10^3$, suy ra $\log_2(10^3) \approx 10$, hay $\log_2(10) \approx 3.32$.

#### Tóm tắt mục 5

- $\log_{10}$ cho order of magnitude và vật lý/hóa.
- $\ln$ cho calculus và ML loss.
- $\log_2$ cho CS (binary search, cây, bit, entropy).
- Ba log khác nhau **chỉ một hằng số nhân** — đổi cơ số dễ.

---

## 6. Quy luật logarit — phần quan trọng nhất

Đây là phần **làm cho log đáng giá**. Lý do log tồn tại và xuất hiện khắp mọi nơi là vì nó biến **nhân thành cộng**, **chia thành trừ**, **lũy thừa thành nhân**.

### 6.1. Bảng quy luật

| # | Quy luật | Đọc là |
|---|----------|--------|
| 1 | $\log_b(x \cdot y) = \log_b(x) + \log_b(y)$ | Log của tích = tổng các log |
| 2 | $\log_b(x / y) = \log_b(x) - \log_b(y)$ | Log của thương = hiệu các log |
| 3 | $\log_b(x^n) = n \cdot \log_b(x)$ | Log của lũy thừa = số mũ nhân log |
| 4 | $\log_b(x) = \log_c(x) / \log_c(b)$ | Đổi cơ số |

### 6.2. Vì sao quy luật 1 đúng? (chứng minh trực quan)

Đặt $u = \log_b(x)$ và $v = \log_b(y)$. Theo định nghĩa:

$$b^u = x, \qquad b^v = y$$

Nhân hai vế:

$$x \cdot y = b^u \cdot b^v = b^{u+v} \quad \text{(theo quy luật lũy thừa 1)}$$

Lấy $\log_b$ hai vế:

$$\log_b(x \cdot y) = u + v = \log_b(x) + \log_b(y)$$

→ Quy luật 1 chính là quy luật lũy thừa 1 nhìn ngược lại. Tương tự cho 2 và 3.

### 6.3. Kiểm chứng bằng số cụ thể

**Quy luật 1**: $\log_b(x \cdot y) = \log_b(x) + \log_b(y)$ — kiểm chứng với 4 ví dụ:

$$\begin{aligned}
\textbf{Ví dụ 1.1: } & \log_{10}(100 \cdot 1000) \\
& \text{VT: } \log_{10}(100 \cdot 1000) = \log_{10}(100\,000) = 5 \\
& \text{VP: } \log_{10}(100) + \log_{10}(1000) = 2 + 3 = 5 \quad \checkmark \\[6pt]
\textbf{Ví dụ 1.2: } & \log_{10}(20 \cdot 5) \\
& \text{VT: } \log_{10}(20 \cdot 5) = \log_{10}(100) = 2 \\
& \text{VP: } \log_{10}(20) + \log_{10}(5) \approx 1.3010 + 0.6990 = 2.0000 \quad \checkmark \\[6pt]
\textbf{Ví dụ 1.3: } & \log_2(8 \cdot 4) \\
& \text{VT: } \log_2(8 \cdot 4) = \log_2(32) = 5 \\
& \text{VP: } \log_2(8) + \log_2(4) = 3 + 2 = 5 \quad \checkmark \\[6pt]
\textbf{Ví dụ 1.4: } & \ln(e \cdot e^3) \\
& \text{VT: } \ln(e \cdot e^3) = \ln(e^4) = 4 \\
& \text{VP: } \ln(e) + \ln(e^3) = 1 + 3 = 4 \quad \checkmark
\end{aligned}$$

**Quy luật 2**: $\log_b(x / y) = \log_b(x) - \log_b(y)$ — kiểm chứng với 4 ví dụ:

$$\begin{aligned}
\textbf{Ví dụ 2.1: } & \log_2(32 / 4) \\
& \text{VT: } \log_2(8) = 3 \qquad \text{VP: } \log_2(32) - \log_2(4) = 5 - 2 = 3 \quad \checkmark \\[6pt]
\textbf{Ví dụ 2.2: } & \log_{10}(1000 / 10) \\
& \text{VT: } \log_{10}(100) = 2 \qquad \text{VP: } \log_{10}(1000) - \log_{10}(10) = 3 - 1 = 2 \quad \checkmark \\[6pt]
\textbf{Ví dụ 2.3: } & \log_{10}(1 / 100) \\
& \text{VT: } \log_{10}(0.01) = -2 \qquad \text{VP: } \log_{10}(1) - \log_{10}(100) = 0 - 2 = -2 \quad \checkmark \\
& \text{(đặc biệt: log của nghịch đảo = âm log của số gốc)} \\[6pt]
\textbf{Ví dụ 2.4: } & \ln(e^5 / e^2) \\
& \text{VT: } \ln(e^3) = 3 \qquad \text{VP: } \ln(e^5) - \ln(e^2) = 5 - 2 = 3 \quad \checkmark
\end{aligned}$$

**Quy luật 3**: $\log_b(x^n) = n \cdot \log_b(x)$ — kiểm chứng với 4 ví dụ:

$$\begin{aligned}
\textbf{Ví dụ 3.1: } & \log_{10}(1000^2) \\
& \text{VT: } \log_{10}(1\,000\,000) = 6 \qquad \text{VP: } 2 \cdot \log_{10}(1000) = 2 \cdot 3 = 6 \quad \checkmark \\[6pt]
\textbf{Ví dụ 3.2: } & \log_2(8^3) \\
& \text{VT: } \log_2(512) = 9 \ (\text{vì } 2^9 = 512) \qquad \text{VP: } 3 \cdot \log_2(8) = 3 \cdot 3 = 9 \quad \checkmark \\[6pt]
\textbf{Ví dụ 3.3: } & \log_{10}(10^{-4}) \\
& \text{VT: } \log_{10}(0.0001) = -4 \qquad \text{VP: } -4 \cdot \log_{10}(10) = -4 \cdot 1 = -4 \quad \checkmark \\
& \text{(số mũ âm cũng OK)} \\[6pt]
\textbf{Ví dụ 3.4: } & \log_2(\sqrt{16}) = \log_2(16^{1/2}) \\
& \text{VT: } \log_2(4) = 2 \qquad \text{VP: } (1/2) \cdot \log_2(16) = (1/2) \cdot 4 = 2 \quad \checkmark \\
& \text{(số mũ phân số cũng OK — quy luật 3 hoạt động với mọi số thực)}
\end{aligned}$$

**Quy luật 4 (đổi cơ số)**: tính $\log_2(10)$ bằng máy tính chỉ có $\ln$:

$$\log_2(10) = \ln(10) / \ln(2) \approx 2.3026 / 0.6931 \approx 3.3219$$

Kiểm chứng: $2^{3.3219} \approx 10$ (đúng).

Thêm 2 ví dụ đổi cơ số:

$$\begin{aligned}
\textbf{Ví dụ 4.1: } & \log_3(81) \text{ qua } \log_{10} \\
& \log_3(81) = \log_{10}(81) / \log_{10}(3) \approx 1.9085 / 0.4771 \approx 4.0000 \\
& \text{Kiểm tra: } 3^4 = 81 \quad \checkmark \\[6pt]
\textbf{Ví dụ 4.2: } & \log_5(125) \text{ qua } \ln \\
& \log_5(125) = \ln(125) / \ln(5) \approx 4.8283 / 1.6094 \approx 3.0000 \\
& \text{Kiểm tra: } 5^3 = 125 \quad \checkmark
\end{aligned}$$

#### ⚠ Lỗi thường gặp với quy luật log

- **Nhầm $\log(x+y) = \log(x) + \log(y)$** — sai. Đúng phải là $\log(x \cdot y) = \log(x) + \log(y)$ (nhân bên trong, không cộng).
- **Nhầm $(\log x)^2 = \log(x^2)$** — sai. Đúng: $\log(x^2) = 2 \cdot \log(x)$. Ví dụ $(\log_{10}(10))^2 = 1$, nhưng $\log_{10}(100) = 2$. Khác hẳn.
- **Nhầm $\log(x) \cdot \log(y) = \log(x \cdot y)$** — sai. Quy luật 1 nói **tổng** = log của tích, không phải tích.
- **Đổi cơ số chia nhầm chiều**: nhớ $\log_b(x) = \log_c(x) / \log_c(b)$ — **base mới** ở dưới, **argument** ở trên. Đảo lại sẽ ra sai số.
- **Áp quy luật 3 nhầm dấu**: $\log(x^{-n}) = -n \cdot \log(x)$, không phải $1/(n \cdot \log x)$.

#### 🔁 Dừng lại tự kiểm tra (mục 6)

1. Rút gọn: $\log_{10}(50) + \log_{10}(2)$ = ?
2. Rút gọn: $\log_2(96) - \log_2(3)$ = ?
3. Rút gọn: $3 \cdot \log_{10}(2) + \log_{10}(125)$ = ? (gợi ý: dùng quy luật 3 ngược)
4. Tính $\log_2(100)$ bằng $\log_{10}$ (cho biết $\log_{10}(2) \approx 0.301$).
5. $\log_b(b^k)$ = ? (với mọi $b$, $k$)

<details>
<summary>Đáp án</summary>

1. $\log_{10}(50 \cdot 2) = \log_{10}(100) = 2$.
2. $\log_2(96/3) = \log_2(32) = 5$.
3. $3 \cdot \log_{10}(2) = \log_{10}(2^3) = \log_{10}(8)$. Cộng: $\log_{10}(8) + \log_{10}(125) = \log_{10}(1000) = 3$.
4. $\log_2(100) = \log_{10}(100)/\log_{10}(2) = 2/0.301 \approx 6.644$.
5. $k$ (theo quy luật 3: $\log_b(b^k) = k \cdot \log_b(b) = k \cdot 1 = k$). Đây là phép kiểm tra cực mạnh.

</details>

#### Tóm tắt mục 6

- 4 quy luật log đều suy ra từ quy luật lũy thừa tương ứng (vì log là nghịch đảo).
- Log biến **nhân → cộng**, **chia → trừ**, **lũy thừa → nhân hằng số**. Đây là lý do log "đáng giá".
- Đổi cơ số: $\log_b(x) = \log_c(x) / \log_c(b)$. Cho phép tính log mọi cơ số bằng $\ln$ hoặc $\log_{10}$ sẵn trong thư viện.
- Lỗi #1 cần tránh: nhầm $\log(x+y)$ với $\log(x)+\log(y)$. Phải là **nhân** bên trong.

### 6.4. Vì sao "biến nhân thành cộng" lại quý?

Đây là lý do log gắn liền với khoa học và kỹ thuật:

- **Trước máy tính**, người ta nhân hai số 5 chữ số bằng cách... tra **bảng log**, **cộng** kết quả, rồi tra ngược về (antilog). Cộng dễ hơn nhân — đó là cả cuộc cách mạng.
- **Trong xác suất** (mục 7), khi nhân nhiều xác suất nhỏ với nhau ($P(A) \cdot P(B) \cdot P(C) \cdots$), tích trở nên cực kỳ nhỏ và máy tính tràn số dưới (underflow). Lấy log: chuyển thành cộng các log-xác suất → an toàn.

---

## 7. Vì sao log xuất hiện khắp nơi trong ML/AI và CS?

### 7.1. Log-likelihood — chuyển nhân thành cộng

Trong ML, ta thường nhân nhiều xác suất rất nhỏ:

$$L(\theta) = P(x_1 \mid \theta) \cdot P(x_2 \mid \theta) \cdots P(x_N \mid \theta)$$

Nếu $N = 1000$ và mỗi $P \approx 0.01$, thì $L \approx 10^{-2000}$ — số này nhỏ tới mức `float64` không lưu được (underflow xuống $0$).

**Walk-through cụ thể**: nhân 100 xác suất, mỗi xác suất $0.1$:

$$L = \underbrace{0.1 \cdot 0.1 \cdots 0.1}_{100 \text{ lần}} = 0.1^{100} = 10^{-100}$$

`float64` tối thiểu khoảng $5 \times 10^{-324}$ (denormal) hay $2.225 \times 10^{-308}$ (normal). $10^{-100}$ thì vẫn lưu được, nhưng nếu mỗi $P = 0.001$ thay vì $0.1$, ta có $10^{-300}$ — bắt đầu chạm sàn. Với $N = 200$, $(0.001)^{200} = 10^{-600}$ → **underflow xuống 0**. Khi $L = 0$, mọi phép tối ưu sau đó vô nghĩa (gradient = 0, không học được gì).

**Giải pháp**: lấy log. Tích thành tổng:

$$\begin{aligned}
\log L &= \underbrace{\log(0.1) + \log(0.1) + \cdots + \log(0.1)}_{100 \text{ lần}} \\
&= 100 \cdot \log(0.1) \\
&= 100 \cdot (-2.3026) \quad (\text{vì } \ln(0.1) \approx -2.3026) \\
&\approx -230.26
\end{aligned}$$

$-230.26$ là số bình thường, lưu trong float64 không vấn đề. Tổng quát hơn:

$$\log L = \log P(x_1) + \log P(x_2) + \cdots + \log P(x_N)$$

Mỗi $\log P$ là số âm cỡ $-5$ tới $-10$, cộng 1000 cái lại ra số cỡ $-5000$ tới $-10000$ — `float64` lưu được dễ dàng (max khoảng $1.8 \times 10^{308}$, đủ chỗ).

**Lý do log-likelihood KHÔNG làm mất argmax**: vì $\log$ là **hàm tăng nghiêm ngặt**, nên $\operatorname{argmax}_\theta L(\theta) = \operatorname{argmax}_\theta \log L(\theta)$. Tối ưu cái nào cũng ra cùng $\theta^*$.

→ Đây là **lý do** mọi maximum likelihood estimation đều tối ưu **log-likelihood**, không phải likelihood gốc.

### 7.2. Cross-entropy loss — chứa −log(p)

Loss function phổ biến nhất cho classification:

$$\text{loss} = -\frac{1}{N} \sum_i \log(p_{y_i})$$

trong đó $p_{y_i}$ là xác suất mô hình gán cho nhãn đúng của mẫu $i$.

**Tại sao là $-\log(p)$ chứ không phải $1-p$ hay $(1-p)^2$?**

Walk-through giá trị $-\ln(p)$ với $p$ từ "chắc đúng" tới "chắc sai":

| $p$ (xác suất gán cho nhãn đúng) | $-\ln(p)$ | Diễn giải |
|---|---|---|
| $1.0$ | $0$ | Mô hình hoàn toàn chắc và đúng → không phạt |
| $0.99$ | $0.010$ | Gần đúng → phạt nhẹ |
| $0.9$ | $0.105$ | Khá đúng → phạt nhỏ |
| $0.5$ | $0.693$ | Lưỡng lự (chỉ 50%) → phạt vừa |
| $0.1$ | $2.303$ | Sai nặng → phạt mạnh |
| $0.01$ | $4.605$ | Sai rất nặng → phạt rất mạnh |
| $0.001$ | $6.908$ | Sai cực kỳ → phạt cực kỳ mạnh |
| $\to 0$ | $\to +\infty$ | Sai chắc chắn → phạt vô cùng |

Quan sát hai tính chất tuyệt vời:

- **Khi $p \to 1$** (mô hình đúng), $-\log(p) \to 0$. Đúng càng chắc, phạt càng nhẹ — hợp lý.
- **Khi $p \to 0$** (mô hình sai chắc), $-\log(p) \to +\infty$. Sai mà còn tự tin, phạt **không có giới hạn**.

Phép phạt vô hạn này không có ở $1-p$ (chỉ phạt tối đa $1$) hay $(1-p)^2$ (tối đa $1$). Cross-entropy "ép" mô hình **không được tự tin sai** — chỉ cần một mẫu mà mô hình gán xác suất $0.001$ cho nhãn đúng là loss đã $\approx 7$, kéo trung bình lên cao.

**Walk-through ví dụ thực**: 3 mẫu, mô hình gán cho nhãn đúng các xác suất $p = [0.9, 0.5, 0.1]$:

$$\begin{aligned}
-\ln(0.9) &\approx 0.105 \\
-\ln(0.5) &\approx 0.693 \\
-\ln(0.1) &\approx 2.303 \\
\text{loss} &= (0.105 + 0.693 + 2.303) / 3 \approx 3.101 / 3 \approx 1.034
\end{aligned}$$

Mẫu thứ 3 (gán $0.1$ cho nhãn đúng) đóng góp gần 75% loss → gradient sẽ chủ yếu sửa mẫu này. Đây là cơ chế "tự lo việc khó" của cross-entropy.

→ Hành vi (phạt nặng khi sai chắc) chính là cái ta muốn — sẽ học kỹ ở Tầng 5.

### 7.3. Log scale plot — nhìn được dải rộng

Một số dữ liệu trải qua nhiều **order of magnitude**:

- Tần suất từ trong ngôn ngữ: "the" xuất hiện 1 tỷ lần, từ hiếm xuất hiện 1 lần. Vẽ linear → "the" ngốn toàn bộ trục, từ hiếm tịt thành điểm.
- Số citation của bài báo: 1 → 100 000.
- Phân phối thu nhập, dân số quốc gia.

Vẽ trên **log scale**: trục y là $\log_{10}(\text{value})$ → các giá trị $1, 10, 100, 1000, \ldots$ cách đều nhau. Quan sát được toàn bộ dải.

### 7.4. Big-O với log — binary search và cây cân bằng

Trong CS:

- **Binary search** trên mảng đã sort kích thước $n$: $O(\log_2 n)$ so sánh. Vì sao $\log_2$? Vì mỗi bước cắt đôi mảng — cắt được tối đa $\log_2(n)$ lần trước khi còn 1 phần tử.
- **Cây BST cân bằng** (AVL, red-black): chiều cao $= O(\log n)$.
- **Heap**: insert/extract-min $= O(\log n)$.

Khi viết Big-O với $\log$ mà không ghi cơ số, **cơ số không quan trọng** — vì đổi cơ số chỉ khác hằng số (quy luật 4): $\log_2(n) = \ln(n) / \ln(2)$, hằng số $1/\ln(2)$ bị nuốt trong $O()$.

### 7.5. Tóm tắt

| Lĩnh vực | Vai trò của log |
|----------|-----------------|
| Probability / Statistics | Log-likelihood, tránh underflow |
| Deep Learning | Cross-entropy loss, log-softmax |
| Information Theory | Entropy $H = -\sum p \log p$ |
| Data Visualization | Log scale plot |
| Algorithms | Big-O của binary search, cây cân bằng |
| Vật lý / Hóa học | dB, Richter, pH |

---

## 8. Bảng giá trị tính tay phải nhớ

### 8.1. log₂(x) cho x là lũy thừa của 2

| $x$ | $\log_2(x)$ | Cách nhớ |
|-----|------------|----------|
| $1$ | $0$ | $2^0 = 1$ |
| $2$ | $1$ | $2^1 = 2$ |
| $4$ | $2$ | $2^2 = 4$ |
| $8$ | $3$ | $2^3 = 8$ |
| $16$ | $4$ | $2^4 = 16$ |
| $32$ | $5$ | $2^5 = 32$ |
| $64$ | $6$ | $2^6 = 64$ |
| $128$ | $7$ | $2^7 = 128$ |
| $256$ | $8$ | $2^8 = 256$ (1 byte) |
| $1024$ | $10$ | $2^{10} \approx 1K$ |

### 8.2. log₁₀(x) cho x là lũy thừa của 10

| $x$ | $\log_{10}(x)$ |
|-----|-------------|
| $1$ | $0$ |
| $10$ | $1$ |
| $100$ | $2$ |
| $1\,000$ (1 nghìn) | $3$ |
| $1\,000\,000$ (1 triệu) | $6$ |
| $1\,000\,000\,000$ (1 tỷ) | $9$ |

### 8.3. ln(x) cho x là lũy thừa của e

| $x$ | $\ln(x)$ |
|-----|---------|
| $1$ | $0$ |
| $e$ | $1$ |
| $e^2$ | $2$ |
| $e^k$ | $k$ |

(Vì $e^k \to \ln(e^k) = k \cdot \ln(e) = k \cdot 1 = k$, theo quy luật 3.)

---

## 9. Bài tập

### Bài 1 — Tính lũy thừa, căn, mũ phân số

Tính các biểu thức sau bằng tay (không dùng máy tính):

a) $2^{10}$

b) $3^4$

c) $5^{-2}$

d) $8^{1/3}$

e) $16^{0.75}$

### Bài 2 — Đơn giản hóa biểu thức lũy thừa

Rút gọn các biểu thức sau (dùng quy luật mục 2):

a) $(x^3 \cdot x^5) / x^2$

b) $(2x^2)^3$

c) $\sqrt{4x^6}$

### Bài 3 — Tính log

Tính giá trị các biểu thức log sau:

a) $\log_2(32)$

b) $\log_{10}(0.001)$

c) $\log_5(125)$

d) $\ln(e^7)$

e) $\log_2(1024)$

### Bài 4 — Dùng quy luật log

Tính/biến đổi (dùng quy luật mục 6):

a) $\log_{10}(200) - \log_{10}(2)$

b) $\log_2(48) - \log_2(3)$

c) Khai triển $\log(x^2 \cdot y^3)$ thành tổng các log đơn.

### Bài 5 — Code Go: `logSumExp` ổn định số

**Bối cảnh**: $\text{logSumExp}(x) = \log(\sum \exp(x_i))$ xuất hiện khắp ML — softmax, log-softmax, marginalization của mixture models, partition function. Nhưng tính trực tiếp **không hoạt động** với số lớn.

#### Tại sao naive `log(Σ exp(x_i))` overflow?

`float64` của IEEE 754 lưu được số dương tối đa khoảng $1.7977 \times 10^{308}$ (gọi là `math.MaxFloat64`). Vượt qua → `+Inf`.

Nhưng $\exp(x)$ tăng cực kỳ nhanh:

$$\begin{aligned}
\exp(10)   &\approx 2.2 \times 10^4 \\
\exp(100)  &\approx 2.7 \times 10^{43} \\
\exp(700)  &\approx 1.0 \times 10^{304}   &&\text{(vẫn lưu được, suýt soát)} \\
\exp(710)  &\approx 2.2 \times 10^{308}   &&\text{(vẫn được, gần sát mép)} \\
\exp(720)  &= +\infty            &&\text{(overflow! tràn float64)} \\
\exp(1000) &= +\infty
\end{aligned}$$

Với input $[1000, 1001, 999]$:

$$\begin{aligned}
\exp(1000) &= +\infty \\
\exp(1001) &= +\infty \\
\exp(999)  &= +\infty \\
\textstyle\sum \exp(\ldots) &= +\infty \\
\log(+\infty) &= +\infty       \qquad \leftarrow \text{kết quả sai, đúng phải là } {\sim}1001.4
\end{aligned}$$

Naive version **hỏng hoàn toàn**.

#### Trick: rút max ra ngoài

Quan sát đẳng thức (dùng quy luật log + quy luật lũy thừa):

$$\begin{aligned}
\log\left(\sum \exp(x_i)\right)
  &= \log\left(\sum \exp(x_i - M + M)\right)                  &&\text{(cộng và trừ M)} \\
  &= \log\left(\sum \exp(x_i - M) \cdot \exp(M)\right)             &&\text{(quy luật lũy thừa: } e^{a+b} = e^a \cdot e^b) \\
  &= \log\left(\exp(M) \cdot \sum \exp(x_i - M)\right)             &&\text{(đưa } \exp(M) \text{ ra ngoài, không phụ thuộc i)} \\
  &= \log(\exp(M)) + \log\left(\sum \exp(x_i - M)\right)        &&\text{(quy luật log 1: } \log(xy) = \log x + \log y) \\
  &= M + \log\left(\sum \exp(x_i - M)\right)                  &&(\log(\exp(M)) = M)
\end{aligned}$$

→ **Công thức ổn định**:

$$\text{logSumExp}(xs) = M + \log\left(\sum \exp(x_i - M)\right) \quad \text{với } M = \max(xs)$$

Sau khi trừ $M$:
- Mọi $x_i - M \leq 0$ (vì $M$ là max).
- $\exp(x_i - M) \in (0, 1]$.
- $\sum \exp(\ldots) \in (0, n]$ ($n$ là số phần tử) — không bao giờ overflow.
- $\log(\sum) \in (-\infty, \ln(n)]$ — số nhỏ, an toàn.

#### Walk-through chi tiết với input `[1000, 1001, 999]`

**Bước 1**: tìm max.

$$M = \max(1000, 1001, 999) = 1001$$

**Bước 2**: trừ M từ mỗi phần tử.

$$\begin{aligned}
1000 - 1001 &= -1 \\
1001 - 1001 &= 0 \\
999 - 1001  &= -2 \\
&\to \text{shifted} = [-1, 0, -2]
\end{aligned}$$

**Bước 3**: tính $\exp$ của từng số (giờ đều $\leq 0$, an toàn).

$$\begin{aligned}
\exp(-1) &\approx 0.36788 \\
\exp(0)  &= 1.00000 \\
\exp(-2) &\approx 0.13534
\end{aligned}$$

**Bước 4**: tổng.

$$S = 0.36788 + 1.00000 + 0.13534 \approx 1.50321$$

**Bước 5**: log.

$$\log(S) = \ln(1.50321) \approx 0.40760$$

**Bước 6**: cộng M lại.

$$\text{logSumExp} = M + \log(S) = 1001 + 0.40760 \approx 1001.40760$$

**Kiểm tra trực giác**: $\exp(1001)$ thống trị tổng vì lớn hơn nhiều so với $\exp(1000)$ (gấp $e \approx 2.718$ lần) và $\exp(999)$ (gấp $e^2 \approx 7.389$ lần). Nên $\sum \exp(\ldots) \approx \exp(1001)$ với "hệ số" hơn 1 chút (chính xác $\approx 1.503 \cdot \exp(1001)$), và log của nó $\approx 1001 + 0.408 = 1001.408$ — khớp kết quả tính ra.

Yêu cầu code:

- Implement `logSumExp(xs []float64) float64` đúng và ổn định số.
- Cũng implement `logSumExpNaive(xs []float64) float64` bằng cách tính trực tiếp `math.Log(Σ math.Exp(x_i))`.
- So sánh kết quả với input `[]float64{1000, 1001, 999}`.

---

## 10. Lời giải chi tiết

### Bài 1

a) $2^{10} = 1024$. Cách nhớ: $2^{10} \approx 1K$.

b) $3^4 = 3 \cdot 3 \cdot 3 \cdot 3 = 9 \cdot 9 = 81$.

c) $5^{-2} = 1/5^2 = 1/25 = 0.04$.

d) $8^{1/3} = \sqrt[3]{8} = 2$ (vì $2^3 = 8$).

e) $16^{0.75} = 16^{3/4} = (16^{1/4})^3 = 2^3 = 8$.

Cách tiếp cận chung cho mũ phân số $a^{m/n}$: tính căn bậc $n$ của $a$ trước, rồi mũ $m$ — số sẽ nhỏ và dễ tính tay.

### Bài 2

a) $(x^3 \cdot x^5) / x^2 = x^{3+5} / x^2 = x^8 / x^2 = x^{8-2} = x^6$.

  Dùng quy luật 1 (nhân cùng cơ số) rồi quy luật 2 (chia cùng cơ số).

b) $(2x^2)^3 = 2^3 \cdot (x^2)^3 = 8 \cdot x^{2 \cdot 3} = 8x^6$.

  Dùng quy luật 4 (lũy thừa của tích) rồi quy luật 3 (lũy thừa của lũy thừa).

c) $\sqrt{4x^6} = \sqrt{4} \cdot \sqrt{x^6} = 2 \cdot x^3 = 2x^3$ (giả sử $x \geq 0$).

  Dùng quy luật $\sqrt{ab} = \sqrt{a} \cdot \sqrt{b}$ và $\sqrt{x^6} = (x^6)^{1/2} = x^3$.

  **Lưu ý**: nếu không giả sử $x \geq 0$, đáp án đúng là $2\lvert x^3 \rvert = 2\lvert x \rvert^3$.

### Bài 3

a) $\log_2(32) = 5$ vì $2^5 = 32$.

b) $\log_{10}(0.001) = \log_{10}(10^{-3}) = -3$. (Dùng định nghĩa: hỏi 10 mũ mấy bằng 0.001, đáp $-3$.)

c) $\log_5(125) = 3$ vì $125 = 5^3$.

d) $\ln(e^7) = 7$ (dùng quy luật 3: $\ln(e^7) = 7 \cdot \ln(e) = 7 \cdot 1 = 7$).

e) $\log_2(1024) = 10$ vì $1024 = 2^{10}$.

### Bài 4

a) $\log_{10}(200) - \log_{10}(2)$

  Dùng quy luật 2 (ngược lại): $\log_{10}(200) - \log_{10}(2) = \log_{10}(200/2) = \log_{10}(100) = 2$.

  → Đáp số: **2**.

b) $\log_2(48) - \log_2(3)$

  $= \log_2(48/3) = \log_2(16) = 4$.

  → Đáp số: **4**.

c) Khai triển $\log(x^2 \cdot y^3)$:

  Bước 1, quy luật 1: $\log(x^2 \cdot y^3) = \log(x^2) + \log(y^3)$.

  Bước 2, quy luật 3: $= 2 \cdot \log(x) + 3 \cdot \log(y)$.

  → Đáp số: **$2 \cdot \log(x) + 3 \cdot \log(y)$**.

### Bài 5

**Cách tiếp cận**:

Với input $[1000, 1001, 999]$, tính trực tiếp $\exp(1000)$ đã ra `Inf` (vì $\text{math.MaxFloat64} \approx 1.8 \cdot 10^{308}$, mà $\exp(1000) \approx 10^{434}$). Tổng → `Inf`, $\log(\text{Inf}) \to \text{Inf}$. Naive version **hỏng**.

Trick: chuyển trục về $M = \max(xs) = 1001$. Tính:

$$\begin{aligned}
& \exp(1000 - 1001) + \exp(1001 - 1001) + \exp(999 - 1001) \\
&= \exp(-1) + \exp(0) + \exp(-2) \\
&\approx 0.3679 + 1.0 + 0.1353 \\
&\approx 1.5032
\end{aligned}$$

$\log(1.5032) \approx 0.4076$. Cộng $M = 1001$ lại:

$$\text{logSumExp}([1000, 1001, 999]) \approx 1001 + 0.4076 \approx 1001.4076$$

Số này khớp trực giác: tổng $e^{1000} + e^{1001} + e^{999}$ bị thống trị bởi $e^{1001}$, nên log của tổng xấp xỉ $1001$ (chỉ chênh chút do hai số kia đóng góp thêm).

**Tại sao trick này ổn định?** Sau khi trừ $M$, mọi số mũ $\leq 0$ → $\exp(\ldots) \in (0, 1]$ → tổng $\in (0, n]$ → $\log(\text{tổng}) \in (-\infty, \ln(n)]$, không bao giờ overflow. Cộng lại $M$ chỉ là dịch trục số, không gây mất chính xác.

**Code đầy đủ**: xem [`solutions.go`](./solutions.go), hàm `logSumExp` và `logSumExpNaive`. Khi chạy:

```
logSumExpNaive([1000, 1001, 999]) = +Inf    ← hỏng
logSumExp([1000, 1001, 999]) ≈ 1001.4076    ← ổn định
```

**Độ phức tạp**: $O(n)$ cho cả hai (mỗi cái duyệt mảng vài lần). Stable version chỉ thêm 1 lượt duyệt để tìm max + 1 lượt nữa để trừ — vẫn $O(n)$.

---

## Code và minh họa

- Code Go đầy đủ: [`solutions.go`](./solutions.go) — chạy `go run solutions.go` để xem bảng giá trị log và demo logSumExp.
- Trang minh họa tương tác: [`visualization.html`](./visualization.html) — máy tính power/root/log, kiểm chứng quy luật, log-scale demo, logSumExp playground.

## Bài tiếp theo

- **Trước**: [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/)
- **Tiếp**: [Lesson 05 — Hàm số là gì](../lesson-05-functions/) — đưa các thứ vừa học vào khung "hàm `f(x)`", học cách đọc đồ thị, domain/range, hàm hợp.
