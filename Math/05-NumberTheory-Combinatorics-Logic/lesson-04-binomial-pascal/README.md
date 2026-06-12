# Lesson 04 — Nhị thức Newton & Tam giác Pascal

## Mục tiêu

- Hiểu **nhị thức Newton**: $(a + b)^n = \sum C(n,k) \cdot a^{n-k} \cdot b^k$.
- Đọc tam giác Pascal — quan hệ với $C(n, k)$.
- Áp dụng vào tính nhanh và đồng nhất thức.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Nhị thức Newton (Binomial Theorem)

🎯 **Phát biểu**:

$$\begin{aligned}
(a + b)^n &= \sum_{k=0}^{n} C(n, k) \cdot a^{n-k} \cdot b^k \\
&= C(n,0) \cdot a^n + C(n,1) \cdot a^{n-1} \cdot b + \ldots + C(n,n) \cdot b^n
\end{aligned}$$

💡 **Ví dụ $n = 3$**:

$$\begin{aligned}
(a + b)^3 &= C(3,0)a^3 + C(3,1)a^2 b + C(3,2)ab^2 + C(3,3)b^3 \\
&= a^3 + 3a^2 b + 3ab^2 + b^3
\end{aligned}$$

**Tổng quát $n = 4$**: $(a+b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4$.

❓ **Vì sao $C(n, k)$ xuất hiện?** Vì khi khai triển $(a+b)(a+b)\ldots(a+b)$ $n$ lần, mỗi số hạng = chọn $b$ từ $k$ thừa số và $a$ từ $n-k$ thừa số. **Có đúng $C(n, k)$ cách chọn**.

### 1.1. Vì sao có $C(n,k)$ — chứng minh đếm, walk-through $n=3$

💡 **Trực giác / Hình dung**: khai triển $(a+b)^3 = (a+b)(a+b)(a+b)$ giống như đi qua **3 cánh cửa** liên tiếp; ở mỗi cửa bạn chọn lấy **một chữ** — hoặc $a$, hoặc $b$. Mỗi "lộ trình qua 3 cửa" tạo ra một tích 3 chữ. Tổng cộng có $2^3 = 8$ lộ trình. Nhóm các lộ trình cho cùng một tích lại → số lộ trình trong mỗi nhóm chính là hệ số.

**Liệt kê đầy đủ 8 lộ trình** (mỗi ô là lựa chọn ở 1 cửa):

| Cửa 1 | Cửa 2 | Cửa 3 | Tích | Gom theo số $b$ |
|:---:|:---:|:---:|:---:|:---:|
| $a$ | $a$ | $a$ | $aaa = a^3$ | $0$ chữ $b$ |
| $a$ | $a$ | $b$ | $aab = a^2 b$ | $1$ chữ $b$ |
| $a$ | $b$ | $a$ | $aba = a^2 b$ | $1$ chữ $b$ |
| $b$ | $a$ | $a$ | $baa = a^2 b$ | $1$ chữ $b$ |
| $a$ | $b$ | $b$ | $abb = ab^2$ | $2$ chữ $b$ |
| $b$ | $a$ | $b$ | $bab = ab^2$ | $2$ chữ $b$ |
| $b$ | $b$ | $a$ | $bba = ab^2$ | $2$ chữ $b$ |
| $b$ | $b$ | $b$ | $bbb = b^3$ | $3$ chữ $b$ |

- Có $0$ chữ $b$: **1** lộ trình $\to$ hệ số $a^3$ là $1 = C(3,0)$.
- Có $1$ chữ $b$: **3** lộ trình $\to$ hệ số $a^2 b$ là $3 = C(3,1)$.
- Có $2$ chữ $b$: **3** lộ trình $\to$ hệ số $ab^2$ là $3 = C(3,2)$.
- Có $3$ chữ $b$: **1** lộ trình $\to$ hệ số $b^3$ là $1 = C(3,3)$.

**Mấu chốt**: số lộ trình có đúng $k$ chữ $b$ = số cách **chọn $k$ cửa** (trong $n$ cửa) để bỏ $b$ vào = $C(n,k)$. Đây chính là lý do hệ số là $C(n,k)$, không phải con số bí ẩn. Verify: $C(3,1) = \dfrac{3!}{1! \cdot 2!} = 3$ ✓ — khớp 3 dòng "$1$ chữ $b$" ở trên.

> 📐 **Chứng minh tổng quát (từng bước, không "dễ thấy")**
>
> Viết $(a+b)^n = \underbrace{(a+b)(a+b)\cdots(a+b)}_{n \text{ thừa số}}$.
>
> **Bước 1** — Khai triển bằng luật phân phối nghĩa là: lấy mỗi cách chọn 1 hạng tử ($a$ hoặc $b$) từ mỗi thừa số rồi nhân lại, sau đó cộng tất cả. Mỗi cách chọn cho một tích $n$ chữ.
>
> **Bước 2** — Một tích bằng $a^{n-k} b^k$ khi và chỉ khi ta chọn $b$ từ đúng $k$ thừa số (và $a$ từ $n-k$ thừa số còn lại).
>
> **Bước 3** — Số cách chọn ra $k$ thừa số (trong $n$) để lấy $b$ là $C(n,k)$ (định nghĩa tổ hợp ở [Lesson 03](../lesson-03-permutations-combinations/)).
>
> **Bước 4** — Vậy số hạng $a^{n-k} b^k$ xuất hiện đúng $C(n,k)$ lần $\Rightarrow$ hệ số của nó là $C(n,k)$.
>
> **Bước 5** — Cộng theo mọi $k$ từ $0$ đến $n$: $(a+b)^n = \sum_{k=0}^{n} C(n,k)\, a^{n-k} b^k$. $\blacksquare$

⚠ **Lỗi thường gặp — tưởng hệ số "tự nhiên là $1$"**. Người mới hay viết $(a+b)^3 = a^3 + a^2 b + ab^2 + b^3$ (quên hệ số $3, 3$). Phản ví dụ kiểm số: cho $a=b=1$ thì vế trái $= 2^3 = 8$, còn vế "sai" $= 1+1+1+1 = 4 \neq 8$. Vế đúng $1+3+3+1 = 8$ ✓.

> 📐 **Định nghĩa đầy đủ — Nhị thức Newton**
>
> **(a) Là gì**: Công thức khai triển $(a+b)^n$ thành 1 tổng $n+1$ số hạng, với **hệ số là $C(n,k)$** từ tam giác Pascal. Tổng quát hoá từ $(a+b)^2 = a^2+2ab+b^2$ (mọi người biết) lên mọi bậc $n$.
>
> **(b) Vì sao cần**: Không có công thức này, khai triển $(a+b)^{10}$ phải nhân 10 lần — vô cùng phiền. Newton cho công thức đóng. Quan trọng hơn — hệ số $C(n,k)$ liên kết đại số ↔ tổ hợp, cho phép giải bài đại số bằng đếm. Ứng dụng: nhị thức xác suất $P(X=k) = C(n,k) \cdot p^k \cdot (1-p)^{n-k}$, khai triển Taylor (mở rộng cho $n$ không nguyên qua chuỗi), số tập con ($2^n = \sum C(n,k)$ lấy $a=b=1$), ước lượng $(1+x)^n \approx 1+nx$ khi $x$ nhỏ (mở rộng đầu tiên).
>
> **(c) Ví dụ số**: $(a+b)^3 = 1 \cdot a^3 + 3 \cdot a^2 b + 3 \cdot ab^2 + 1 \cdot b^3$ (hệ số tầng 3 Pascal: 1,3,3,1). $(x+1)^5 = x^5 + 5x^4 + 10x^3 + 10x^2 + 5x + 1$. Tính $(1.01)^{10} \approx 1 + 10 \cdot 0.01 + 45 \cdot 0.0001 + \ldots \approx 1.10462$ (máy tính: 1.10462 ✓). Hệ số $x^3$ trong $(2x-3)^7 = C(7,4) \cdot (2x)^3 \cdot (-3)^4 = 35 \cdot 8 \cdot 81 = $ **22,680**. $\sum_{k=0}^{n} C(n,k) = (1+1)^n = $ **$2^n$** = số tập con tập $n$ phần tử ✓.

⚠ **Lỗi thường gặp — quên hệ số của a, b khi chúng không phải biến đơn**. Trong $(2x - 3)^7$, số hạng tổng quát là $C(7,k) \cdot (2x)^{7-k} \cdot (-3)^k$ — phải nâng cả $2$ và $-3$ lên lũy thừa, KHÔNG chỉ lấy $C(7,k) \cdot x^{7-k}$. Phản ví dụ: hệ số $x^7$ trong $(2x-3)^7$ là $C(7,0) \cdot 2^7 \cdot (-3)^0 = 128$, KHÔNG phải 1.

### 1.2. Số hạng tổng quát & 3 walk-through khai triển

💡 **Số hạng tổng quát (general term)** của khai triển $(a+b)^n$ là số hạng thứ $k+1$ (đếm $k$ từ $0$):

$$T_{k+1} = C(n,k)\, a^{n-k}\, b^k$$

Nhớ: chỉ số dưới của $C$ và **số mũ của $b$ luôn bằng nhau** ($= k$); số mũ của $a$ là phần còn lại ($n-k$). Mỗi khai triển chỉ là việc cho $k$ chạy từ $0$ đến $n$.

**Walk-through 1 — $(x+2)^4$** (cho $a=x$, $b=2$, $n=4$). Hệ số Pascal tầng 4: $1, 4, 6, 4, 1$.

$$\begin{aligned}
(x+2)^4 &= C(4,0)x^4 2^0 + C(4,1)x^3 2^1 + C(4,2)x^2 2^2 + C(4,3)x^1 2^3 + C(4,4)x^0 2^4 \\
&= 1{\cdot}x^4 + 4{\cdot}x^3{\cdot}2 + 6{\cdot}x^2{\cdot}4 + 4{\cdot}x{\cdot}8 + 1{\cdot}16 \\
&= x^4 + 8x^3 + 24x^2 + 32x + 16
\end{aligned}$$

Kiểm số nhanh tại $x=1$: vế trái $(1+2)^4 = 3^4 = 81$; vế phải $1+8+24+32+16 = 81$ ✓.

**Walk-through 2 — $(2x - 1)^5$** (cho $a = 2x$, $b = -1$, $n=5$). Tầng 5: $1, 5, 10, 10, 5, 1$. **Chú ý dấu**: $b = -1$ nên $b^k = (-1)^k$ đổi dấu xen kẽ.

$$\begin{aligned}
(2x-1)^5 &= C(5,0)(2x)^5 + C(5,1)(2x)^4(-1) + C(5,2)(2x)^3(-1)^2 \\
&\quad + C(5,3)(2x)^2(-1)^3 + C(5,4)(2x)(-1)^4 + C(5,5)(-1)^5 \\
&= 32x^5 - 5{\cdot}16x^4 + 10{\cdot}8x^3 - 10{\cdot}4x^2 + 5{\cdot}2x - 1 \\
&= 32x^5 - 80x^4 + 80x^3 - 40x^2 + 10x - 1
\end{aligned}$$

Kiểm số tại $x=1$: vế trái $(2-1)^5 = 1$; vế phải $32-80+80-40+10-1 = 1$ ✓.

**Walk-through 3 — $\left(x + \dfrac{1}{x}\right)^4$** (cho $a=x$, $b = 1/x$, $n=4$). Số mũ của $x$ trong số hạng thứ $k+1$ là $(4-k) - k = 4 - 2k$ — biến mất dần.

$$\begin{aligned}
\left(x + \tfrac{1}{x}\right)^4 &= C(4,0)x^4 + C(4,1)x^3{\cdot}\tfrac1x + C(4,2)x^2{\cdot}\tfrac{1}{x^2} + C(4,3)x{\cdot}\tfrac{1}{x^3} + C(4,4)\tfrac{1}{x^4} \\
&= x^4 + 4x^2 + 6 + \tfrac{4}{x^2} + \tfrac{1}{x^4}
\end{aligned}$$

Số hạng **không chứa $x$** (số hạng tự do) ứng với $4 - 2k = 0 \Rightarrow k = 2$, giá trị $C(4,2) = 6$. Kiểm số tại $x=1$: $(1+1)^4 = 16$; vế phải $1+4+6+4+1 = 16$ ✓.

⚠ **Lỗi thường gặp — đếm số hạng từ $1$ rồi nhầm với $k$**. Số hạng tổng quát là $T_{k+1}$, tức **số hạng thứ $5$** ứng với $k=4$ (không phải $k=5$). Phản ví dụ: trong $(x+2)^4$, "số hạng thứ 3" là $C(4,2)x^2 2^2 = 24x^2$, ứng $k=2$ — nếu lấy $k=3$ sẽ ra nhầm $32x$ (số hạng thứ 4).

🔁 **Dừng lại tự kiểm tra**

1. Khai triển $(a+b)^2$ bằng nhị thức, đối chiếu hằng đẳng thức quen.
2. Tính tổng các hệ số trong khai triển $(a+b)^4$ (gợi ý: cho $a = b = 1$).
3. Tìm số hạng tự do (không chứa $x$) trong $\left(x - \dfrac{2}{x}\right)^6$.

<details><summary>Đáp án</summary>

1. $C(2,0)a^2 + C(2,1)ab + C(2,2)b^2 = a^2 + 2ab + b^2$ ✓ (đúng hằng đẳng thức).
2. $(1+1)^4 = 2^4 = 16$ ($= 1+4+6+4+1$).
3. Số mũ $x$ trong $T_{k+1} = C(6,k)x^{6-k}(-2/x)^k$ là $6-k-k = 6-2k$; đặt $= 0 \Rightarrow k=3$. Số hạng $= C(6,3)(-2)^3 = 20\cdot(-8) = -160$.

</details>

### 📝 Tóm tắt mục 1

- $(a+b)^n = \sum C(n,k) \cdot a^{n-k} \cdot b^k$; hệ số $= C(n,k)$ (tầng $n$ Pascal).
- Số hạng tổng quát: nâng **cả hệ số lẫn biến** lên lũy thừa.
- $\sum C(n,k) = 2^n$ (cho $a=b=1$) = số tập con.

---

## 2. Tam giác Pascal

💡 **Trực giác / Hình dung**: tam giác Pascal là "máy tính hệ số" — mỗi số bằng tổng 2 số đỡ nó phía trên, như giọt nước rơi xuống tách đôi. Không cần công thức giai thừa, chỉ cần cộng dần từng tầng là ra mọi `C(n,k)`.

```
Tầng 0:                    1
Tầng 1:                  1   1
Tầng 2:                1   2   1
Tầng 3:              1   3   3   1
Tầng 4:            1   4   6   4   1
Tầng 5:          1   5  10  10   5   1
Tầng 6:        1   6  15  20  15   6   1
```

**Quy tắc**: mỗi số = tổng 2 số phía trên (Pascal).

⟶ **Tầng $n$** chứa các $C(n, 0), C(n, 1), \ldots, C(n, n)$.

### 2.1. Xây tam giác từng hàng — walk-through từng số

💡 **Trực giác / Hình dung**: bạn **không cần** công thức giai thừa để dựng tam giác. Bắt đầu mỗi hàng bằng số $1$, kết thúc bằng số $1$, và mỗi số ở giữa = **cộng đúng 2 số kề nhau ở hàng ngay trên**. Giống dòng nước rơi xuống một khe, tách đôi rồi gộp lại ở khe dưới.

```
Tầng 0:            1
                  / \
Tầng 1:          1   1
                / \ / \
Tầng 2:        1   2   1
              / \ / \ / \
Tầng 3:      1   3   3   1
```

**Dựng từng số (đếm cột từ 0):**

- **Tầng 0**: chỉ có $C(0,0) = 1$.
- **Tầng 1**: hai biên là $1, 1$ (đó là $C(1,0), C(1,1)$).
- **Tầng 2**: biên trái $1$; giữa $= 1+1 = 2$ (hai số kề ở tầng 1); biên phải $1$ $\to$ `1 2 1`.
- **Tầng 3**: biên $1$; cột 1 $= 1+2 = 3$; cột 2 $= 2+1 = 3$; biên $1$ $\to$ `1 3 3 1`.
- **Tầng 4**: biên $1$; $1+3=4$; $3+3=6$; $3+1=4$; biên $1$ $\to$ `1 4 6 4 1`.
- **Tầng 5**: biên $1$; $1+4=5$; $4+6=10$; $6+4=10$; $4+1=5$; biên $1$ $\to$ `1 5 10 10 5 1`.
- **Tầng 6**: biên $1$; $1+5=6$; $5+10=15$; $10+10=20$; $10+5=15$; $5+1=6$; biên $1$ $\to$ `1 6 15 20 15 6 1`.

Mỗi số vừa dựng chính là một $C(n,k)$. Vd cột 2 tầng 5 là $10 = C(5,2)$; kiểm bằng giai thừa: $C(5,2) = \dfrac{5!}{2!\,3!} = \dfrac{120}{2\cdot 6} = 10$ ✓.

⚠ **Lỗi thường gặp — quên rằng hai biên LUÔN bằng $1$**, hoặc cộng nhầm số không kề. Số ở cột $k$ tầng $n$ chỉ cộng từ **cột $k-1$ và cột $k$** của tầng $n-1$ — không phải cột bất kỳ. Phản ví dụ: cột 2 tầng 6 là $10 + 5 = 15$ (cộng cột 1 và cột 2 tầng 5), **không** phải $10 + 10$.

### Tính chất

| Tính chất | Công thức | Ví dụ |
|-----------|-----------|-------|
| Đối xứng | $C(n,k) = C(n, n-k)$ | $C(5,2) = C(5,3) = 10$ |
| Pascal | $C(n,k) = C(n-1,k-1) + C(n-1,k)$ | $C(5,2) = C(4,1)+C(4,2) = 4+6$ |
| Tổng hàng | $\sum C(n,k) = 2^n$ | $1+5+10+10+5+1 = 32 = 2^5$ |
| Tổng dấu xen | $\sum (-1)^k \cdot C(n,k) = 0$ ($n \ge 1$) | $1-3+3-1 = 0$ |

#### 2.2. Chứng minh hệ thức Pascal $C(n,k) = C(n-1,k-1) + C(n-1,k)$

💡 **Trực giác (chứng minh đếm)**: ta đếm số cách chọn $k$ vật từ $n$ vật theo **hai cách**, kết quả phải bằng nhau. Đánh dấu một vật đặc biệt — gọi là "vật cuối".

- **Nhóm A — chọn có vật cuối**: đã lấy vật cuối, còn phải chọn $k-1$ vật từ $n-1$ vật còn lại $\Rightarrow C(n-1,k-1)$ cách.
- **Nhóm B — chọn không có vật cuối**: bỏ qua vật cuối, chọn đủ $k$ vật từ $n-1$ vật còn lại $\Rightarrow C(n-1,k)$ cách.

Mọi cách chọn rơi vào **đúng một** trong hai nhóm (loại trừ và phủ hết), nên:

$$C(n,k) = C(n-1,k-1) + C(n-1,k). \qquad \blacksquare$$

**Walk-through số** với $n=5, k=2$: $C(5,2) = C(4,1) + C(4,2) = 4 + 6 = 10$ ✓. Đây chính là "cột 2 tầng 5 = cột 1 + cột 2 tầng 4" — đúng quy tắc dựng tam giác ở mục 2.1. Một ví dụ nữa: $C(6,3) = C(5,2) + C(5,3) = 10 + 10 = 20$ ✓.

> 📐 **Kiểm tra lại bằng đại số (từng bước)**
>
> $$\begin{aligned}
> C(n-1,k-1) + C(n-1,k) &= \frac{(n-1)!}{(k-1)!(n-k)!} + \frac{(n-1)!}{k!(n-1-k)!} \\
> &= \frac{(n-1)!\,k}{k!(n-k)!} + \frac{(n-1)!\,(n-k)}{k!(n-k)!} \quad (\text{quy đồng } k!(n-k)!) \\
> &= \frac{(n-1)!\,(k + n - k)}{k!(n-k)!} = \frac{(n-1)!\,n}{k!(n-k)!} = \frac{n!}{k!(n-k)!} = C(n,k). \;\blacksquare
> \end{aligned}$$

#### 2.3. Chứng minh tổng hàng $\sum_{k=0}^{n} C(n,k) = 2^n$ = số tập con

💡 **Trực giác (hai cách đếm số tập con)**: hỏi *"tập có $n$ phần tử có bao nhiêu tập con?"*

- **Cách 1 — theo từng phần tử**: với mỗi phần tử, ta quyết định **lấy hay không lấy** ($2$ lựa chọn). $n$ phần tử độc lập $\Rightarrow 2 \times 2 \times \cdots \times 2 = 2^n$ tập con.
- **Cách 2 — theo kích thước**: gom tập con theo số phần tử $k$. Số tập con đúng $k$ phần tử là $C(n,k)$. Cộng mọi $k$: $\sum_{k=0}^{n} C(n,k)$.

Hai cách đếm **cùng một thứ** nên bằng nhau: $\sum_{k=0}^{n} C(n,k) = 2^n$. $\blacksquare$

**Walk-through** tập $\{1,2,3\}$ ($n=3$): liệt kê đủ $2^3 = 8$ tập con — $\varnothing$; $\{1\},\{2\},\{3\}$; $\{1,2\},\{1,3\},\{2,3\}$; $\{1,2,3\}$. Đếm theo kích thước: $1 + 3 + 3 + 1 = 8 = C(3,0)+C(3,1)+C(3,2)+C(3,3)$ ✓ — đúng tầng 3 Pascal.

> 📐 **Cách 2 (chứng minh đại số từ nhị thức)**: cho $a = b = 1$ trong $(a+b)^n = \sum C(n,k) a^{n-k} b^k$:
> $$(1+1)^n = \sum_{k=0}^{n} C(n,k)\cdot 1^{n-k}\cdot 1^k \;\Rightarrow\; 2^n = \sum_{k=0}^{n} C(n,k). \;\blacksquare$$
> Tương tự, cho $a=1, b=-1$ ra ngay tổng dấu xen kẽ: $(1-1)^n = 0 = \sum (-1)^k C(n,k)$ với $n \ge 1$.

#### 2.4. Các đường chéo của tam giác — đọc thêm cấu trúc

Nhìn tam giác theo **đường chéo** (đếm chéo từ 0) hé lộ nhiều dãy số quen:

```
         1
        1  1
       1  2  1
      1  3  3  1
     1  4  6  4  1
    1  5 10 10  5  1
   1  6 15 20 15  6  1
```

- **Chéo 0** (rìa ngoài): $1, 1, 1, 1, \ldots$ — luôn là $C(n,0) = 1$.
- **Chéo 1**: $1, 2, 3, 4, 5, 6, \ldots$ — số tự nhiên, vì $C(n,1) = n$.
- **Chéo 2**: $1, 3, 6, 10, 15, \ldots$ — **số tam giác** $C(n,2) = \dfrac{n(n-1)}{2}$ (số bắt tay giữa $n$ người). Verify $C(5,2) = 10$ ✓.
- **Chéo 3**: $1, 4, 10, 20, \ldots$ — số tứ diện $C(n,3)$.

💡 **Hockey-stick (đồng nhất thức gậy khúc côn cầu)**: cộng dọc một đường chéo rồi "bẻ gập" xuống cho ra một số trong tam giác:

$$\sum_{i=k}^{n} C(i,k) = C(n+1,\, k+1)$$

**Walk-through** ($k=2$, cộng tới $n=5$): $C(2,2)+C(3,2)+C(4,2)+C(5,2) = 1+3+6+10 = 20 = C(6,3)$ ✓. Trực giác: gậy gồm "cán" (đường chéo) cộng lại đúng bằng "lưỡi gậy" (số nằm chéo dưới ô cuối).

#### 2.5. Liên hệ tổ hợp ⇄ Pascal

Vì mỗi ô tam giác là $C(n,k)$, mọi tính chất tổ hợp ở [Lesson 03](../lesson-03-permutations-combinations/) đều "nhìn thấy được" trên tam giác:

| Quan sát trên tam giác | Tính chất tổ hợp | Ví dụ |
|---|---|---|
| Hàng đọc xuôi = đọc ngược | $C(n,k) = C(n,n-k)$ | tầng 5: `1 5 10 10 5 1` |
| Ô = tổng 2 ô trên | $C(n,k)=C(n-1,k-1)+C(n-1,k)$ | $20 = 10+10$ |
| Tổng cả hàng | $\sum_k C(n,k) = 2^n$ | tầng 4: $16$ |
| Số thứ 2 từ trái mỗi hàng | $C(n,1) = n$ | tầng 6: $6$ |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mỗi số = tổng 2 số trên (Pascal)?"* Vì $C(n,k) = C(n-1,k-1) + C(n-1,k)$: chọn $k$ từ $n$ vật = (chọn $k-1$ từ $n-1$, kèm vật cuối) + (chọn $k$ từ $n-1$, bỏ vật cuối). Verify: $C(5,2) = C(4,1)+C(4,2) = 4+6 = 10$ ✓.
- *"Vì sao tổng dấu xen kẽ = 0?"* Đặt $a = 1, b = -1$ vào nhị thức: $(1-1)^n = 0^n = 0 = \sum(-1)^k C(n,k)$. Verify tầng 3: $1-3+3-1 = 0$ ✓.

⚠ **Lỗi thường gặp — đánh số tầng/cột bắt đầu từ 1 thay vì 0**. Tầng trên cùng là **tầng 0** (chỉ có số 1 $= C(0,0)$); trong mỗi tầng, vị trí trái nhất là **cột 0**. Phản ví dụ: số thứ 3 (từ trái, đếm từ 0 → vị trí 2) ở tầng 5 là $C(5,2) = 10$, KHÔNG phải $C(5,3)$.

🔁 **Dừng lại tự kiểm tra**

1. Viết tầng 7 của tam giác Pascal.
2. Tổng các số ở tầng 6 bằng bao nhiêu?
3. Dùng hệ thức Pascal tính $C(7,3)$ từ tầng 6.
4. Dùng hockey-stick tính $C(2,2)+C(3,2)+C(4,2)$.

<details><summary>Đáp án</summary>

1. Tầng 6 là `1 6 15 20 15 6 1` → tầng 7: `1 7 21 35 35 21 7 1` (cộng cặp kề).
2. $2^6 = 64$ ($= 1+6+15+20+15+6+1$).
3. $C(7,3) = C(6,2) + C(6,3) = 15 + 20 = 35$ ✓.
4. $1 + 3 + 6 = 10 = C(5,3)$ (tức $C(4+1, 2+1)$) ✓.

</details>

### 📝 Tóm tắt mục 2

- Tầng $n$ chứa $C(n,0),\ldots,C(n,n)$; mỗi số = tổng 2 số trên (Pascal) — dựng được không cần giai thừa.
- Đánh số tầng và cột **từ 0**; hai biên luôn $= 1$.
- Hệ thức Pascal $C(n,k)=C(n-1,k-1)+C(n-1,k)$ — chứng minh "vật cuối có/không".
- Tổng tầng $= 2^n$ = số tập con; tổng dấu xen kẽ = 0 ($n \ge 1$).
- Chéo 1 = số tự nhiên, chéo 2 = số tam giác; hockey-stick $\sum_{i=k}^n C(i,k) = C(n+1,k+1)$.

---

## 3. Ví dụ áp dụng

### 3.1. Tính nhanh (a + b)^n

**Ví dụ**: $(x + 2)^5$.
- Hệ số: 1, 5, 10, 10, 5, 1.
- $= x^5 + 5x^4 \cdot 2 + 10x^3 \cdot 4 + 10x^2 \cdot 8 + 5x \cdot 16 + 32$.
- $= $ **$x^5 + 10x^4 + 40x^3 + 80x^2 + 80x + 32$**.

### 3.2. Tìm hệ số cụ thể — quy trình 3 bước + 4 ví dụ

> **Quy trình tìm hệ số của $x^m$ trong $(A\,x^p + B\,x^q)^n$:**
>
> **Bước 1** — Viết số hạng tổng quát $T_{k+1} = C(n,k)\,(A x^p)^{n-k} (B x^q)^k$.
>
> **Bước 2** — Gom số mũ của $x$: $p(n-k) + qk$. Đặt **bằng $m$**, giải ra $k$ (phải là số nguyên $0 \le k \le n$).
>
> **Bước 3** — Thay $k$ vào, **nhân cả hằng số** $A^{n-k} B^k$ với $C(n,k)$.

**Ví dụ 1 — đơn giản** ($(1+x)^{10}$, hệ số $x^3$): $p=0$ cho hằng số $1$, $q=1$ cho $x$. Số mũ $x$ là $k$; đặt $k=3$ $\Rightarrow$ hệ số $= C(10,3)\cdot 1^7 \cdot 1^3 = C(10,3) = $ **120**.

**Ví dụ 2 — có hệ số trong ngoặc** (hệ số $x^4$ trong $(2x - 3)^7$):
- Số hạng tổng quát $C(7,k)(2x)^{7-k}(-3)^k$; số mũ $x$ là $7-k$. Đặt $7-k=4 \Rightarrow k=3$.
- Hệ số $= C(7,3)\cdot 2^4 \cdot (-3)^3 = 35 \cdot 16 \cdot (-27) = $ **-15,120**.

**Ví dụ 3 — hai biến cùng giảm** (hệ số $x^5$ trong $(x^2 + \tfrac{1}{x})^7$):
- $T_{k+1} = C(7,k)(x^2)^{7-k}(x^{-1})^k$; số mũ $x = 2(7-k) - k = 14 - 3k$. Đặt $14-3k = 5 \Rightarrow k=3$.
- Hệ số $= C(7,3) = $ **35** (không có hằng số ngoài). Số hạng là $35x^5$.

**Ví dụ 4 — số hạng tự do (hệ số $x^0$)** trong $\left(2x^2 - \tfrac{3}{x}\right)^6$:
- $T_{k+1} = C(6,k)(2x^2)^{6-k}(-3 x^{-1})^k$; số mũ $x = 2(6-k) - k = 12 - 3k$. Đặt $12-3k=0 \Rightarrow k=4$.
- Hệ số $= C(6,4)\cdot 2^{2}\cdot(-3)^4 = 15 \cdot 4 \cdot 81 = $ **4,860**. (Đếm cột 4 tầng 6: $C(6,4) = C(6,2) = 15$ ✓ — dùng đối xứng.)

⚠ **Lỗi thường gặp — $k$ tìm ra không nguyên thì hệ số bằng $0$**. Nếu giải bước 2 ra $k$ phân số hoặc nằm ngoài $[0,n]$, nghĩa là số mũ $m$ đó **không xuất hiện** $\Rightarrow$ hệ số $= 0$. Phản ví dụ: hệ số $x^4$ trong $(x^2 + 1/x)^7$ cần $14-3k=4 \Rightarrow k = 10/3$ — không nguyên $\Rightarrow$ hệ số $= 0$ (không có $x^4$).

### 3.3. Số tập con

**Câu hỏi**: Tập $n$ phần tử có bao nhiêu tập con?
- Tổng $C(n, 0) + C(n, 1) + \ldots + C(n, n) = $ **$2^n$**.

**Ví dụ**: Tập $\{1, 2, 3, 4\}$ có **$2^4 = 16$** tập con.

### 3.4. Ứng dụng — xác suất nhị thức & ước lượng nhanh

💡 **Vì sao $C(n,k)$ lại xuất hiện trong xác suất?** Tung đồng xu $n$ lần, hỏi xác suất được đúng $k$ mặt ngửa. Mỗi dãy cụ thể có $k$ ngửa, $n-k$ sấp có xác suất $p^k (1-p)^{n-k}$; nhưng có $C(n,k)$ dãy như vậy (chọn $k$ vị trí ngửa). Cộng lại:

$$P(X = k) = C(n,k)\, p^k (1-p)^{n-k}$$

**Walk-through** — tung đồng xu cân ($p = 0.5$) $4$ lần, xác suất đúng $2$ ngửa:
$$P(X=2) = C(4,2)\,(0.5)^2 (0.5)^2 = 6 \cdot 0.0625 = 0.375 = \tfrac{6}{16}.$$
Kiểm: tổng mọi khả năng $\sum_{k=0}^{4} C(4,k)(0.5)^4 = \dfrac{1+4+6+4+1}{16} = \dfrac{16}{16} = 1$ ✓ — đúng vì $\sum C(4,k) = 2^4 = 16$ (tổng hàng Pascal). Sẽ học kỹ ở phần xác suất.

💡 **Ước lượng nhanh $(1+x)^n$ khi $x$ nhỏ**: hai số hạng đầu của nhị thức cho xấp xỉ tuyến tính.
$$(1+x)^n \approx 1 + nx \quad (x \text{ rất nhỏ})$$
**Walk-through** $(1.02)^{10}$: lấy $x=0.02, n=10$. Bậc 0+1: $1 + 10(0.02) = 1.2$. Thêm bậc 2: $C(10,2)(0.02)^2 = 45\cdot 0.0004 = 0.018 \Rightarrow 1.218$. Máy tính: $1.21899\ldots$ — sai số $< 0.001$. Càng nhiều số hạng càng sát.

💡 **Trực giác / Hình dung tìm hệ số**: để tìm hệ số của $x^m$, viết số hạng tổng quát $C(n,k) \cdot (\text{phần } x)^{\ldots} \cdot (\text{phần còn lại})^k$, rồi giải bậc của $x$ bằng $m$ để tìm $k$. Như "tra bảng" — chọn đúng số hạng cần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tìm hệ số $x^4$ trong $(2x-3)^7$, vì sao đặt $7-k = 4$?"* Số hạng tổng quát $C(7,k) \cdot (2x)^{7-k} \cdot (-3)^k$ có bậc $x$ là $7-k$. Muốn bậc 4 → $7-k = 4 \to k = 3$. Rồi tính hệ số $= C(7,3) \cdot 2^4 \cdot (-3)^3 = 35 \cdot 16 \cdot (-27) = -15120$.
- *"Số tập con KỂ tập rỗng hay không?"* $2^n$ ĐÃ tính cả tập rỗng và tập đầy đủ. Muốn bỏ tập rỗng: $2^n - 1$. Vd tập 5 phần tử: 32 tập con, 31 tập khác rỗng.

⚠ **Lỗi thường gặp**: tìm hệ số nhưng quên phần lũy thừa của hằng số. Phản ví dụ: hệ số $x^4$ trong $(2x-3)^7$ KHÔNG phải $C(7,3) = 35$ — phải nhân thêm $2^4 \cdot (-3)^3$.

🔁 **Dừng lại tự kiểm tra**

1. Hệ số của $x^2$ trong $(1+x)^6$.
2. Số tập con khác rỗng của tập 4 phần tử.
3. Tìm số hạng tự do trong $\left(x - \dfrac{1}{x^2}\right)^9$.
4. Tung đồng xu cân $5$ lần, xác suất đúng $3$ ngửa?

<details><summary>Đáp án</summary>

1. $C(6,2) = 15$.
2. $2^4 - 1 = 15$.
3. $T_{k+1} = C(9,k)x^{9-k}(-x^{-2})^k$, số mũ $x = 9-k-2k = 9-3k = 0 \Rightarrow k=3$. Giá trị $= C(9,3)(-1)^3 = -84$.
4. $C(5,3)(0.5)^5 = 10/32 = 0.3125$.

</details>

### 📝 Tóm tắt mục 3

- Tính nhanh $(a+b)^n$ bằng hệ số Pascal tầng $n$.
- Tìm hệ số $x^m$: viết số hạng tổng quát, giải số mũ $x = m$ ra $k$, **nhân cả hằng số**; $k$ không nguyên ⟹ hệ số $0$.
- Số tập con của tập $n = 2^n$ (gồm rỗng); khác rỗng $= 2^n - 1$.
- Ứng dụng: xác suất nhị thức $C(n,k)p^k(1-p)^{n-k}$; ước lượng $(1+x)^n \approx 1+nx$.

---

## 4. Tổng quát hóa — Khai triển đa thức

💡 **Trực giác / Hình dung**: nhị thức Newton chia $n$ thừa số thành 2 "rổ" ($a$ hoặc $b$); đa thức (multinomial) chia thành **nhiều rổ** ($a, b, c$...). Hệ số $n!/(i!j!k!)$ = số cách chia $n$ vật vào các rổ kích thước $i, j, k$ — đúng tinh thần "chọn nhóm" của tổ hợp.

**Đa thức $(a + b + c)^n$** (đa thức tổng quát Newton):

$$(a + b + c)^n = \sum_{i+j+k=n} \frac{n!}{i! \cdot j! \cdot k!} \cdot a^i \cdot b^j \cdot c^k$$

trong đó **$n!/(i! \cdot j! \cdot k!)$** = hệ số đa thức (multinomial coefficient).

**4 ví dụ số đa dạng**:
- $(a+b+c)^2 = a^2+b^2+c^2 + 2ab+2bc+2ca$ (hệ số $2 = 2!/(1!1!0!)$).
- Hệ số $a^2 bc$ trong $(a+b+c)^4 = 4!/(2!1!1!) = 24/2 = 12$.
- Hệ số $a^3$ trong $(a+b+c)^3 = 3!/(3!0!0!) = 1$.
- Tổng tất cả hệ số $(a+b+c)^n$ cho $a=b=c=1 = 3^n$ (vd $n=2$ → $9 = 1+1+1+2+2+2$ ✓).

#### 4.1. Walk-through đầy đủ $(x + y + z)^3$

Mọi bộ $(i,j,k)$ với $i+j+k=3$ cho một số hạng $\dfrac{3!}{i!j!k!}x^i y^j z^k$. Tính hệ số từng loại:

| Dạng số mũ | $(i,j,k)$ tiêu biểu | Hệ số $3!/(i!j!k!)$ | Số hạng cùng dạng |
|---|---|:---:|:---:|
| Một mũ 3 | $(3,0,0)$ | $6/6 = 1$ | $x^3, y^3, z^3$ |
| Một mũ 2, một mũ 1 | $(2,1,0)$ | $6/2 = 3$ | $x^2y, x^2z, y^2x, y^2z, z^2x, z^2y$ |
| Ba mũ 1 | $(1,1,1)$ | $6/1 = 6$ | $xyz$ |

$$(x+y+z)^3 = x^3+y^3+z^3 + 3(x^2y + x^2z + y^2x + y^2z + z^2x + z^2y) + 6xyz$$

Kiểm số tại $x=y=z=1$: vế trái $3^3 = 27$; vế phải $3\cdot 1 + 3\cdot 6 + 6 = 3 + 18 + 6 = 27$ ✓. (Đếm số số hạng: $3 + 6 + 1 = 10 = C(3+2,2) = C(5,2)$ ✓, khớp công thức ở câu hỏi dưới.)

💡 **Trực giác — hệ số multinomial = sắp xếp chữ trùng**: hệ số của $x^i y^j z^k$ chính là số **hoán vị của một xâu** gồm $i$ chữ $x$, $j$ chữ $y$, $k$ chữ $z$ — đúng công thức $\dfrac{n!}{i!j!k!}$. Vd $x^2 y$ ($n=3$): các xâu $xxy, xyx, yxx$ — $3$ cách $= 3!/(2!1!) = 3$ ✓. Đây là lý do binomial $C(n,k) = \dfrac{n!}{k!(n-k)!}$ chỉ là trường hợp 2 loại chữ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng multinomial thay binomial?"* Khi có $\ge 3$ hạng tử trong ngoặc. $(a+b)^n$ dùng $C(n,k)$; $(a+b+c)^n$ dùng $n!/(i!j!k!)$.
- *"Số số hạng phân biệt trong $(a+b+c)^n$ là bao nhiêu?"* Bằng số nghiệm nguyên không âm của $i+j+k = n$, tức tổ hợp lặp $C(n+2, 2)$. Vd $n=2$ → $C(4,2) = 6$ số hạng ($a^2,b^2,c^2,ab,bc,ca$) ✓.

⚠ **Lỗi thường gặp**: quên hệ số chéo ($2ab$...) khi khai triển $(a+b+c)^2$. Phản ví dụ: $(a+b+c)^2 \neq a^2+b^2+c^2$ — thiếu $2ab+2bc+2ca$. Kiểm số: $(1+1+1)^2 = 9$, còn $1+1+1 = 3 \neq 9$.

🔁 **Dừng lại tự kiểm tra**

1. Hệ số của $a^2 b$ trong $(a+b)^3$ (dùng binomial).
2. Hệ số của $xyz$ trong $(x+y+z)^3$.

<details><summary>Đáp án</summary>

1. $C(3,1) = 3$ (số hạng $C(3,1)a^2 b$).
2. $3!/(1!1!1!) = 6$.

</details>

### 📝 Tóm tắt mục 4

- Đa thức: $(a+b+c)^n = \sum [n!/(i!j!k!)] a^i b^j c^k$, tổng $i+j+k = n$.
- Hệ số multinomial = số cách chia $n$ vật vào các rổ $i, j, k$.
- Tổng mọi hệ số $= (\text{số hạng tử})^n$ khi cho tất cả biến $= 1$.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Khai triển $(x + 1)^6$.

**Bài 2**: Tìm hệ số $x^5$ trong $(2x + 1)^8$.

**Bài 3**: Tính tổng $1 + 7 + 21 + 35 + 35 + 21 + 7 + 1$.

**Bài 4**: Số tập con khác rỗng của tập 5 phần tử.

**Bài 5**: Chứng minh $C(n+1, k) = C(n, k-1) + C(n, k)$ bằng đại số.

**Bài 6**: Tìm số hạng tự do (không chứa $x$) trong khai triển $\left(x^2 - \dfrac{1}{x}\right)^9$.

**Bài 7**: Tìm hệ số của $x^3$ trong $(1 + 2x)^5 (1 - x)^4$ — gợi ý: khai triển từng thừa số tới bậc cần rồi nhân.

**Bài 8**: Chứng minh $C(n,0) + C(n,2) + C(n,4) + \ldots = C(n,1) + C(n,3) + \ldots = 2^{n-1}$ (tổng hệ số vị trí chẵn bằng tổng vị trí lẻ).

### Lời giải

**Bài 1**: Hệ số Pascal tầng 6: 1, 6, 15, 20, 15, 6, 1 → **$x^6 + 6x^5 + 15x^4 + 20x^3 + 15x^2 + 6x + 1$**.

**Bài 2**: Số hạng tổng quát $C(8,k) \cdot (2x)^{8-k}$. Đặt $8-k = 5$ → $k = 3$. Hệ số $= C(8,3) \cdot 2^5 = 56 \cdot 32 = $ **1,792**.

**Bài 3**: $= \sum C(7, k)$, $k=0..7 = $ **$2^7 = 128$**.

**Bài 4**: $2^5 - 1 = $ **31** (trừ tập rỗng).

**Bài 5**:  
- $C(n, k-1) + C(n, k) = n!/((k-1)!(n-k+1)!) + n!/(k!(n-k)!)$.
- Quy đồng $k!(n-k+1)!$: $= n! \cdot k/(k!(n-k+1)!) + n! \cdot (n-k+1)/(k!(n-k+1)!) = n! \cdot (k + n-k+1)/(k!(n-k+1)!) = n! \cdot (n+1)/(k!(n-k+1)!)$.
- $= (n+1)!/(k!(n+1-k)!) = C(n+1, k)$. □

**Bài 6**: Số hạng tổng quát $T_{k+1} = C(9,k)(x^2)^{9-k}(-1/x)^k = C(9,k)(-1)^k x^{18-2k-k} = C(9,k)(-1)^k x^{18-3k}$.
- Số hạng tự do: $18 - 3k = 0 \Rightarrow k = 6$.
- Giá trị $= C(9,6)\cdot(-1)^6 = C(9,3)\cdot 1 = $ **84** (dùng đối xứng $C(9,6)=C(9,3)=84$).

**Bài 7**: Cần hệ số $x^3$ của tích. Khai triển tới bậc 3:
- $(1+2x)^5 = 1 + 10x + 40x^2 + 80x^3 + \ldots$ (hệ số $C(5,k)2^k$: $1, 10, 40, 80$).
- $(1-x)^4 = 1 - 4x + 6x^2 - 4x^3 + \ldots$
- Ghép các cặp số mũ cộng lại $=3$: $\;1\cdot(-4) + 10\cdot 6 + 40\cdot(-4) + 80\cdot 1 = -4 + 60 - 160 + 80 = $ **-24**.

**Bài 8**: Từ mục 2.3, $\sum (-1)^k C(n,k) = 0$ với $n \ge 1$. Tách dấu:
- $\underbrace{[C(n,0)+C(n,2)+\ldots]}_{S_{\text{chẵn}}} - \underbrace{[C(n,1)+C(n,3)+\ldots]}_{S_{\text{lẻ}}} = 0 \Rightarrow S_{\text{chẵn}} = S_{\text{lẻ}}$.
- Mà $S_{\text{chẵn}} + S_{\text{lẻ}} = \sum C(n,k) = 2^n$ (mục 2.3). Hai số bằng nhau và tổng $= 2^n \Rightarrow$ mỗi cái $= 2^{n-1}$. □
- Kiểm số $n=4$: chẵn $= 1+6+1 = 8$, lẻ $= 4+4 = 8 = 2^3$ ✓.

---

## 6. Bài tiếp theo

[Lesson 05 — Dirichlet & bù trừ](../lesson-05-pigeonhole-inclusion-exclusion/).

## 📝 Tổng kết

1. **Nhị thức Newton**: $(a+b)^n = \sum C(n,k) \cdot a^{n-k} \cdot b^k$. Hệ số $C(n,k)$ vì có $C(n,k)$ cách chọn $k$ thừa số lấy $b$.
2. **Số hạng tổng quát** $T_{k+1} = C(n,k)a^{n-k}b^k$ (số mũ $b$ = chỉ số dưới của $C$ = $k$; đếm $k$ từ 0).
3. **Pascal** mỗi số = 2 số phía trên: $C(n,k) = C(n-1,k-1) + C(n-1,k)$ — chứng minh bằng "vật cuối có / không có".
4. **Đối xứng**: $C(n,k) = C(n,n-k)$ (hàng đọc xuôi = đọc ngược).
5. **Tổng hàng**: $\sum C(n,k) = 2^n$ = số tập con của tập $n$ (mỗi phần tử lấy/không lấy). Dấu xen kẽ $\sum (-1)^k C(n,k) = 0$.
6. **Các đường chéo Pascal**: chéo 1 = số tự nhiên, chéo 2 = số tam giác; hockey-stick $\sum_{i=k}^n C(i,k) = C(n+1,k+1)$.
7. **Tìm hệ số $x^m$**: viết số hạng tổng quát, đặt số mũ $x = m$ giải $k$, **nhân cả hằng số** $A^{n-k}B^k$. $k$ không nguyên ⟹ hệ số $= 0$.
8. **Mở rộng**: xác suất nhị thức $P(X=k) = C(n,k)p^k(1-p)^{n-k}$; ước lượng $(1+x)^n \approx 1+nx$; multinomial $\dfrac{n!}{i!j!k!}$ cho $\ge 3$ hạng tử.
