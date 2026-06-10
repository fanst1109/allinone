# Lesson 05 — Ma trận: phép toán

> Tầng 4 · Linear Algebra · Lesson 05

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **ma trận (matrix)** là gì, ký hiệu, cấp $m \times n$, và phân biệt được các loại ma trận đặc biệt (vuông, đơn vị, không).
- Thực hiện thành thạo **cộng ma trận** và **nhân với scalar**, biết khi nào hai ma trận cộng được.
- Thực hiện được **nhân ma trận (matrix multiplication)** — phép toán cốt lõi của đại số tuyến tính — và biết quy tắc "hàng × cột".
- Hiểu vì sao nhân ma trận **không giao hoán** ($AB \neq BA$), và biết kiểm tra cụ thể bằng phản ví dụ.
- Biết **transpose** $A^\top$, **ma trận đơn vị** $I$, và **ma trận nghịch đảo** $A^{-1}$ cho ma trận $2 \times 2$.
- Giải được hệ $Ax = b$ bằng $x = A^{-1} \cdot b$ cho ma trận $2 \times 2$ không suy biến.
- Tính được **định thức (determinant)** $2 \times 2$ và biết nó liên quan thế nào tới tồn tại nghịch đảo (sẽ học sâu hơn ở Lesson 06).
- Hiểu vì sao **một layer của Neural Network** thực chất là $y = Wx + b$ — một phép nhân ma trận với vector cộng bias.

## Kiến thức tiền đề

- [Lesson 01 — Vector](../lesson-01-vectors/) — vì ma trận có thể nhìn như "tập các vector hàng" hoặc "tập các vector cột", và nhân ma trận = tập các dot product.
- [Algebra · Lesson 08 — Hệ phương trình tuyến tính](../../01-Algebra/lesson-08-linear-systems/) — vì ma trận là cách viết gọn của hệ $Ax = b$, và phép nhân ma trận thực chất bắt nguồn từ việc "ghép" 2 phép biến đổi tuyến tính liên tiếp.

---

## 1. Ma trận là gì?

### 1.1 Trực giác trước — "bảng số có quy luật"

Một **ma trận** đơn giản là **bảng số hình chữ nhật**. Bạn từng thấy nó hàng ngày mà có thể không gọi đúng tên:

- Bảng điểm: hàng = học sinh, cột = môn học, ô = điểm.
- Ảnh xám: hàng × cột = pixel, giá trị ô = độ sáng `0..255`.
- Bảng giá vé: hàng = loại vé (vip/thường), cột = ngày trong tuần, ô = giá.
- Bảng cự ly giữa các thành phố: hàng = thành phố A, cột = thành phố B, ô = khoảng cách.

> **💡 Trực giác**: vector là một **danh sách số** (một chiều). Ma trận là **bảng số** (hai chiều). Mỗi hàng của ma trận tự thân là một vector; mỗi cột cũng là một vector. Vì thế ma trận là "tập có tổ chức của các vector".

Cái khác bảng tính Excel ở chỗ: ma trận có **các phép toán đại số được định nghĩa rõ ràng** (cộng, nhân, nghịch đảo...) để ta có thể tính toán trên cả bảng cùng lúc, không phải cell-by-cell.

### 1.2 Định nghĩa hình thức

Ma trận $A$ cấp $m \times n$ là một bảng có $m$ **hàng** và $n$ **cột**, gồm $m \cdot n$ số (gọi là **phần tử** — entry):

$$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}$$

Quy ước ký hiệu:

- **Ma trận** viết hoa: $A, B, C, M, W, \ldots$
- **Phần tử**: $a_{ij}$ (hoặc `A[i][j]`, $A_{i,j}$) — chỉ số thứ nhất là **hàng**, chỉ số thứ hai là **cột**. Hãy nhớ: **"row before column"** (RC — luôn nói hàng trước).
- **Cấp/kích thước**: $m \times n$ đọc là "m hàng n cột". Tổng số phần tử $= m \cdot n$.
- Khi cần nhấn mạnh kích thước, ta viết $A \in \mathbb{R}^{m \times n}$ (A thuộc tập các ma trận thực m hàng n cột).

> **⚠ Lỗi thường gặp**: nhầm thứ tự chỉ số. $a_{23}$ là phần tử ở **hàng 2, cột 3**, KHÔNG phải hàng 3 cột 2. Nguyên tắc: chữ số đầu là hàng, vì khi viết bảng ta đi từ trên xuống trước.

### 1.3 Bốn ví dụ cụ thể

**Ví dụ 1.** Ma trận $2 \times 3$ (2 hàng 3 cột):

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$$

Cấp: $2 \times 3$. $a_{11} = 1$, $a_{12} = 2$, $a_{13} = 3$, $a_{21} = 4$, $a_{22} = 5$, $a_{23} = 6$. Tổng 6 phần tử.

**Ví dụ 2.** Ma trận $3 \times 2$ (3 hàng 2 cột — **không phải** cùng cấp với ví dụ 1, dù cùng 6 phần tử):

$$B = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}$$

$b_{31} = 11$ (hàng 3 cột 1). $b_{22} = 10$.

**Ví dụ 3.** Ma trận **vuông** $3 \times 3$:

$$C = \begin{bmatrix} 2 & 0 & 1 \\ 1 & 3 & 0 \\ 0 & 2 & 4 \end{bmatrix}$$

Vuông vì $m = n = 3$. Ma trận vuông có nhiều tính chất đặc biệt — chỉ ma trận vuông mới có khái niệm "định thức", "nghịch đảo", "eigenvalue" (sẽ học dần).

**Ví dụ 4.** Ma trận **vector cột** $3 \times 1$ (một cột, ba hàng):

$$v = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$$

Một vector cột là một trường hợp riêng của ma trận. Tương tự, **vector hàng** $1 \times 3$ là $\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}$. Khi viết $Ax = b$, mặc định $x$ và $b$ là **vector cột**.

### 1.4 Các ma trận đặc biệt

**(a) Ma trận vuông (square matrix).** Số hàng = số cột. Đường chéo chính là tập các phần tử $a_{11}, a_{22}, \ldots, a_{nn}$.

**(b) Ma trận không (zero matrix), ký hiệu $0$ hoặc $O$.** Mọi phần tử bằng 0. Có thể có nhiều cấp:

$$0_{2 \times 3} = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} \qquad 0_{3 \times 3} = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

Vai trò giống số $0$ trong số học: $A + 0 = A$, $0 \cdot A = 0$.

**(c) Ma trận đơn vị (identity matrix), ký hiệu $I$ hoặc $I_n$.** Ma trận **vuông**, đường chéo chính toàn 1, các vị trí khác toàn 0. Công thức:

$$I_{ij} = \begin{cases} 1 & \text{nếu } i = j \\ 0 & \text{nếu } i \neq j \end{cases}$$

$$I_2 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \qquad I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \qquad I_4 = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

Vai trò giống số $1$: $I \cdot A = A \cdot I = A$ (sẽ chứng minh ở Mục 8).

**(d) Ma trận đường chéo (diagonal matrix).** Vuông, mọi phần tử ngoài đường chéo chính = 0. Ví dụ:

$$D = \begin{bmatrix} 5 & 0 & 0 \\ 0 & -2 & 0 \\ 0 & 0 & 7 \end{bmatrix}$$

**(e) Ma trận tam giác trên / dưới (upper/lower triangular).** Mọi phần tử bên dưới đường chéo = 0 (tam giác trên) hoặc bên trên = 0 (tam giác dưới). Ví dụ tam giác trên:

$$U = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 4 & 5 \\ 0 & 0 & 6 \end{bmatrix}$$

> **❓ Câu hỏi tự nhiên**: *"Tại sao phải đặt tên cho từng loại ma trận đặc biệt? Có gì hay?"*
>
> Vì mỗi loại có tính toán **rẻ hơn rất nhiều**:
> - Nhân với ma trận đơn vị $I$ = không làm gì (miễn phí).
> - Nhân với ma trận đường chéo = chỉ scale từng chiều, độ phức tạp $O(n)$ thay vì $O(n^3)$.
> - Giải hệ với ma trận tam giác = "back-substitution", $O(n^2)$ thay vì $O(n^3)$.
>
> Đó là lý do mọi thuật toán đại số tuyến tính (LU, QR, Cholesky, SVD...) đều cố gắng **phân rã ma trận tổng quát thành tích các ma trận đặc biệt** rồi xử lý từng phần một.

### 1.5 Khi nào hai ma trận "bằng nhau"?

Hai ma trận $A$ và $B$ được gọi là **bằng nhau** nếu:

1. Chúng có **cùng cấp** (cùng $m \times n$), VÀ
2. Mọi phần tử tương ứng bằng nhau: $a_{ij} = b_{ij}$ với mọi $i, j$.

Ví dụ:

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \quad \checkmark$$

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \neq \begin{bmatrix} 1 & 2 & 0 \\ 3 & 4 & 0 \end{bmatrix} \quad (\text{khác cấp})$$

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \neq \begin{bmatrix} 1 & 2 \\ 3 & 5 \end{bmatrix} \quad (\text{khác phần tử})$$

> **🔁 Dừng lại tự kiểm tra**: Một ma trận có **3 hàng và 5 cột** có cấp bao nhiêu? Phần tử $a_{34}$ ở vị trí nào?
>
> <details><summary>Đáp án</summary>
>
> Cấp $3 \times 5$. $a_{34}$ ở **hàng 3, cột 4**. Vì hàng có 3 (tối đa $i \in \{1,2,3\}$) và cột có 5 ($j \in \{1,2,3,4,5\}$), vị trí này tồn tại.
> </details>

### 📝 Tóm tắt Mục 1

- Ma trận = bảng số $m \times n$. $m$ = hàng, $n$ = cột. Phần tử $a_{ij}$: hàng $i$, cột $j$.
- Loại đặc biệt: vuông (m=n), đơn vị I (chéo 1 ngoài 0), không O, đường chéo, tam giác.
- Hai ma trận bằng nhau ⇔ cùng cấp VÀ mọi phần tử tương ứng bằng nhau.
- Vector là trường hợp riêng của ma trận ($n \times 1$ hoặc $1 \times n$).

---

## 2. Phép cộng ma trận

### 2.1 Trực giác

Cộng hai bảng cùng cấp = **cộng từng ô tương ứng**. Như khi bạn cộng điểm thi giữa kỳ và cuối kỳ của một lớp: hai bảng cùng kích thước, mỗi học sinh được cộng điểm của chính mình.

### 2.2 Định nghĩa

Cho $A$ và $B$ **cùng cấp** $m \times n$. Tổng $C = A + B$ cũng có cấp $m \times n$, với:

$$c_{ij} = a_{ij} + b_{ij} \qquad (\text{với mọi } i, j)$$

**Điều kiện bắt buộc**: hai ma trận phải **cùng cấp**. Khác cấp → không cộng được, không có định nghĩa.

### 2.3 Bốn ví dụ

**Ví dụ 1 — $2 \times 2$:**

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$$

$$A + B = \begin{bmatrix} 1+5 & 2+6 \\ 3+7 & 4+8 \end{bmatrix} = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix}$$

**Ví dụ 2 — $2 \times 3$:**

$$A = \begin{bmatrix} 1 & 0 & -2 \\ -3 & 5 & 1 \end{bmatrix} \qquad B = \begin{bmatrix} 4 & -1 & 3 \\ 2 & 0 & 6 \end{bmatrix}$$

$$A + B = \begin{bmatrix} 1+4 & 0+(-1) & -2+3 \\ -3+2 & 5+0 & 1+6 \end{bmatrix} = \begin{bmatrix} 5 & -1 & 1 \\ -1 & 5 & 7 \end{bmatrix}$$

**Ví dụ 3 — số âm và phân số:**

$$A = \begin{bmatrix} \frac{1}{2} & -1 \\ 0 & 3 \end{bmatrix} \qquad B = \begin{bmatrix} \frac{1}{2} & 1 \\ 4 & -3 \end{bmatrix} \qquad A + B = \begin{bmatrix} 1 & 0 \\ 4 & 0 \end{bmatrix}$$

**Ví dụ 4 — cộng với ma trận không:**

$$A = \begin{bmatrix} 7 & -2 \\ 4 & 1 \end{bmatrix} \qquad O = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} \qquad A + O = \begin{bmatrix} 7 & -2 \\ 4 & 1 \end{bmatrix}$$

Tổng = chính $A$. Đó là vai trò "trung lập" của ma trận không.

### 2.4 Tính chất

Phép cộng ma trận thừa hưởng đầy đủ tính chất từ phép cộng số:

| Tính chất | Công thức | Ghi chú |
|-----------|-----------|---------|
| Giao hoán | $A + B = B + A$ | Vì cộng từng phần tử, mà cộng số giao hoán |
| Kết hợp | $(A + B) + C = A + (B + C)$ | Cùng lý do |
| Phần tử trung lập | $A + 0 = A$ | $0$ là ma trận không cùng cấp |
| Phần tử đối | $A + (-A) = 0$ | $-A$ định nghĩa bởi $(-A)_{ij} = -a_{ij}$ |

Verify nhanh tính giao hoán với ví dụ 1:

$$B + A = \begin{bmatrix} 5+1 & 6+2 \\ 7+3 & 8+4 \end{bmatrix} = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix} = A + B \quad \checkmark$$

> **⚠ Lỗi thường gặp**: Cố gắng cộng hai ma trận **khác cấp**. Ví dụ $\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}$ (cấp $1 \times 3$) $+ \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$ (cấp $3 \times 1$) — **không tồn tại tổng**, dù cả hai đều có 3 phần tử. Cấp khác nhau = phép cộng không được định nghĩa.

> **🔁 Dừng lại tự kiểm tra**: Cộng hai ma trận sau:
>
> $$A = \begin{bmatrix} 2 & -1 \\ 5 & 0 \end{bmatrix} \qquad B = \begin{bmatrix} -3 & 4 \\ 1 & -2 \end{bmatrix}$$
>
> <details><summary>Đáp án</summary>
>
> $$A + B = \begin{bmatrix} 2+(-3) & -1+4 \\ 5+1 & 0+(-2) \end{bmatrix} = \begin{bmatrix} -1 & 3 \\ 6 & -2 \end{bmatrix}$$
> </details>

### 📝 Tóm tắt Mục 2

- Cộng ma trận: cộng từng ô tương ứng, kết quả cùng cấp.
- Điều kiện: **phải cùng cấp**.
- Giao hoán + kết hợp; phần tử trung lập là ma trận không $O$.

---

## 3. Nhân với scalar

### 3.1 Định nghĩa

Cho ma trận $A$ cấp $m \times n$ và số thực $c$ (gọi là **scalar**). Tích $c \cdot A$ là ma trận cùng cấp, với:

$$(c \cdot A)_{ij} = c \cdot a_{ij}$$

Tức là: **nhân scalar vào từng phần tử**.

### 3.2 Bốn ví dụ

**Ví dụ 1.** $c = 3$, $A$ cấp $2 \times 2$:

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad 3 \cdot A = \begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix}$$

**Ví dụ 2.** $c = -1$ (phần tử đối):

$$A = \begin{bmatrix} 2 & -5 \\ -3 & 0 \end{bmatrix} \qquad -A = \begin{bmatrix} -2 & 5 \\ 3 & 0 \end{bmatrix}$$

**Ví dụ 3.** $c = \frac{1}{2}$ (chia đôi):

$$A = \begin{bmatrix} 4 & -2 & 6 \\ 8 & 0 & 10 \end{bmatrix} \qquad \tfrac{1}{2} \cdot A = \begin{bmatrix} 2 & -1 & 3 \\ 4 & 0 & 5 \end{bmatrix}$$

**Ví dụ 4.** $c = 0$ (mọi thứ về 0):

$$0 \cdot A = O \qquad (\text{ma trận không cùng cấp với } A)$$

### 3.3 Tính chất

| Tính chất | Công thức |
|-----------|-----------|
| Phân phối qua cộng ma trận | $c \cdot (A + B) = c \cdot A + c \cdot B$ |
| Phân phối qua cộng scalar | $(c + d) \cdot A = c \cdot A + d \cdot A$ |
| Kết hợp scalar | $c \cdot (d \cdot A) = (c \cdot d) \cdot A$ |
| Đơn vị | $1 \cdot A = A$ |

Verify tính kết hợp: với $c = 2, d = 3$, $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$:

$$\begin{aligned}
d \cdot A &= \begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix} \\
c \cdot (d \cdot A) &= \begin{bmatrix} 6 & 12 \\ 18 & 24 \end{bmatrix} \\
(c \cdot d) \cdot A &= 6 \cdot \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 6 & 12 \\ 18 & 24 \end{bmatrix} \quad \checkmark
\end{aligned}$$

### 📝 Tóm tắt Mục 3

- Nhân scalar = nhân số đó vào **mọi** phần tử.
- Không có ràng buộc cấp — luôn làm được.
- Tính chất giống nhân số thông thường.

---

## 4. Nhân ma trận (matrix multiplication) — PHẦN CỐT LÕI

Đây là phép toán quan trọng nhất của đại số tuyến tính. Hầu hết toàn bộ AI/ML quy về **nhân ma trận**, và lát nữa bạn sẽ thấy vì sao quy tắc "hàng × cột" tuy có vẻ kỳ lạ thực ra lại rất tự nhiên.

### 4.1 Trực giác trước — "ghép hai phép biến đổi"

Hãy tạm hình dung mỗi ma trận là một **máy biến đổi vector**: đưa vào một vector $x$, ra một vector mới $Ax$. (Sẽ học rất kỹ ở [Lesson 06](../lesson-06-matrix-as-transform/).)

Vậy nếu có 2 máy $B$ rồi $A$, thì kết quả của việc đưa vector qua $B$ trước rồi qua $A$ là $A(Bx)$. Câu hỏi: có **một máy duy nhất** $C$ sao cho $Cx = A(Bx)$ luôn đúng không?

Câu trả lời: có, và $C = A \cdot B$. Định nghĩa của phép nhân ma trận **chính là** để câu trên thành thật. Quy tắc "hàng × cột" mà ta sẽ thấy ngay sau đây là **kết quả buộc phải có** của yêu cầu này, không phải một quy tắc tùy tiện.

> **💡 Trực giác chốt**: nhân ma trận = **ghép 2 phép biến đổi tuyến tính**. $AB$ đọc là "làm B trước, rồi làm A" — viết theo chiều ngược thứ tự áp dụng. Đó là lý do nó **không giao hoán** (làm áo trước rồi mặc quần ≠ mặc quần trước rồi mặc áo).

### 4.2 Điều kiện cấp — "số cột A = số hàng B"

Cho $A$ cấp $m \times k$ và $B$ cấp $p \times n$. Tích $AB$ chỉ tồn tại khi $k = p$: số cột của A bằng số hàng của B.

Khi đó:
- $AB$ có cấp $m \times n$ (lấy số hàng của A và số cột của B).
- Chiều "trùng" $k$ biến mất.

**Quy tắc nhớ kích thước** (cực kỳ quan trọng — sẽ dùng suốt đời):

```
A : m × k          
B :     k × n     ←  hai k phải trùng (sờ vào nhau)
─────────────
AB: m     × n     ←  lấy ngoài
```

Ví dụ:
- $(2 \times 3) \cdot (3 \times 4) = (2 \times 4)$ ✓ — chiều giữa khớp (3=3), kết quả $2 \times 4$.
- $(2 \times 3) \cdot (4 \times 3) = ?$ ✗ — chiều giữa lệch (3≠4), **không nhân được**.
- $(5 \times 5) \cdot (5 \times 1) = (5 \times 1)$ ✓ — ma trận vuông nhân vector cột, ra vector cột.

> **⚠ Lỗi thường gặp**: muốn nhân $A \cdot B$ thì kiểm tra **số cột A** = **số hàng B**. Không phải "cùng cấp" (đó là điều kiện cho phép cộng), không phải "vuông" (không bắt buộc).

### 4.3 Công thức từng phần tử

Phần tử ở hàng $i$ cột $j$ của $AB$:

$$(AB)_{ij} = \sum_{r=1}^{k} A_{ir} \cdot B_{rj} = A_{i1} \cdot B_{1j} + A_{i2} \cdot B_{2j} + \cdots + A_{ik} \cdot B_{kj}$$

Đọc bằng lời:

> Phần tử $(AB)_{ij}$ = **dot product** giữa **hàng $i$ của A** và **cột $j$ của B**.

Đây chính là chỗ "hàng × cột" có nghĩa cụ thể. Ta đi tìm phần tử tại vị trí $(i, j)$ của kết quả bằng cách:

1. Lấy **hàng $i$** của $A$ (một vector dài $k$).
2. Lấy **cột $j$** của $B$ (một vector dài $k$).
3. Nhân tương ứng từng cặp rồi cộng lại → một số duy nhất.

Lặp lại với mọi $(i, j)$ → điền đầy ma trận $m \times n$.

> **💡 Hình dung**: tưởng tượng bạn cầm hàng $i$ của A theo chiều ngang, **dựng đứng** nó lên rồi áp vào cột $j$ của B (cũng đứng). Hai vector song song, chiều cao bằng nhau. Nhân từng cặp, cộng lại = phần tử $(AB)_{ij}$.

### 4.4 Walk-through 4 ví dụ chi tiết

#### Ví dụ 1 — $(2 \times 2) \cdot (2 \times 2) = (2 \times 2)$

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$$

Cấp: $(2 \times 2) \cdot (2 \times 2) \to (2 \times 2)$. Kết quả $C = AB$ có 4 phần tử cần tính.

$$\begin{aligned}
c_{11} &= \text{hàng 1 của A} \cdot \text{cột 1 của B} = [1, 2] \cdot [5, 7] = 1 \cdot 5 + 2 \cdot 7 = 5 + 14 = \mathbf{19} \\
c_{12} &= \text{hàng 1 của A} \cdot \text{cột 2 của B} = [1, 2] \cdot [6, 8] = 1 \cdot 6 + 2 \cdot 8 = 6 + 16 = \mathbf{22} \\
c_{21} &= \text{hàng 2 của A} \cdot \text{cột 1 của B} = [3, 4] \cdot [5, 7] = 3 \cdot 5 + 4 \cdot 7 = 15 + 28 = \mathbf{43} \\
c_{22} &= \text{hàng 2 của A} \cdot \text{cột 2 của B} = [3, 4] \cdot [6, 8] = 3 \cdot 6 + 4 \cdot 8 = 18 + 32 = \mathbf{50}
\end{aligned}$$

Vậy:

$$AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

#### Ví dụ 2 — $(2 \times 3) \cdot (3 \times 2) = (2 \times 2)$

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad B = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}$$

Cấp: $(2 \times 3) \cdot (3 \times 2) \to (2 \times 2)$. Kết quả 4 phần tử.

$$\begin{aligned}
c_{11} &= [1, 2, 3] \cdot [7, 9, 11] = 1 \cdot 7 + 2 \cdot 9 + 3 \cdot 11 = 7 + 18 + 33 = \mathbf{58} \\
c_{12} &= [1, 2, 3] \cdot [8, 10, 12] = 1 \cdot 8 + 2 \cdot 10 + 3 \cdot 12 = 8 + 20 + 36 = \mathbf{64} \\
c_{21} &= [4, 5, 6] \cdot [7, 9, 11] = 4 \cdot 7 + 5 \cdot 9 + 6 \cdot 11 = 28 + 45 + 66 = \mathbf{139} \\
c_{22} &= [4, 5, 6] \cdot [8, 10, 12] = 4 \cdot 8 + 5 \cdot 10 + 6 \cdot 12 = 32 + 50 + 72 = \mathbf{154}
\end{aligned}$$

$$AB = \begin{bmatrix} 58 & 64 \\ 139 & 154 \end{bmatrix}$$

#### Ví dụ 3 — $(2 \times 3) \cdot (3 \times 1) = (2 \times 1)$ (ma trận × vector cột)

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad x = \begin{bmatrix} 1 \\ 0 \\ -1 \end{bmatrix}$$

Cấp: $(2 \times 3) \cdot (3 \times 1) \to (2 \times 1)$. Đây là dạng $Ax$ mà bạn gặp suốt sau này.

$$\begin{aligned}
(Ax)_1 &= [1, 2, 3] \cdot [1, 0, -1] = 1 \cdot 1 + 2 \cdot 0 + 3 \cdot (-1) = 1 + 0 - 3 = \mathbf{-2} \\
(Ax)_2 &= [4, 5, 6] \cdot [1, 0, -1] = 4 \cdot 1 + 5 \cdot 0 + 6 \cdot (-1) = 4 + 0 - 6 = \mathbf{-2}
\end{aligned}$$

$$Ax = \begin{bmatrix} -2 \\ -2 \end{bmatrix}$$

> **💡 Nhận xét hữu ích**: $Ax$ là **tổ hợp tuyến tính các cột của A**, hệ số là các thành phần của $x$. Cụ thể: với $x = (1, 0, -1)$, ta có $Ax = 1 \cdot (\text{cột 1}) + 0 \cdot (\text{cột 2}) + (-1) \cdot (\text{cột 3}) = 1 \cdot [1,4] + 0 \cdot [2,5] - 1 \cdot [3,6] = [1-3, 4-6] = [-2, -2]$. Hai cách tính cho cùng kết quả — đây là một bài tập sẽ gặp ở Lesson 06.

#### Ví dụ 4 — $(2 \times 2) \cdot (2 \times 3) = (2 \times 3)$

$$A = \begin{bmatrix} 1 & -1 \\ 2 & 3 \end{bmatrix} \qquad B = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$$

Cấp: $(2 \times 2) \cdot (2 \times 3) \to (2 \times 3)$. Kết quả có **6** phần tử.

$$\begin{aligned}
c_{11} &= [1, -1] \cdot [1, 4] = 1 - 4 = \mathbf{-3} \\
c_{12} &= [1, -1] \cdot [2, 5] = 2 - 5 = \mathbf{-3} \\
c_{13} &= [1, -1] \cdot [3, 6] = 3 - 6 = \mathbf{-3} \\
c_{21} &= [2, 3] \cdot [1, 4] = 2 + 12 = \mathbf{14} \\
c_{22} &= [2, 3] \cdot [2, 5] = 4 + 15 = \mathbf{19} \\
c_{23} &= [2, 3] \cdot [3, 6] = 6 + 18 = \mathbf{24}
\end{aligned}$$

$$AB = \begin{bmatrix} -3 & -3 & -3 \\ 14 & 19 & 24 \end{bmatrix}$$

> **🔁 Dừng lại tự kiểm tra**: Cho $A = \begin{bmatrix} 2 & 1 \\ 0 & 3 \end{bmatrix}$ và $B = \begin{bmatrix} 1 & 4 \\ 5 & 2 \end{bmatrix}$. Tính $AB$.
>
> <details><summary>Đáp án</summary>
>
> Cấp: $(2 \times 2) \cdot (2 \times 2) = (2 \times 2)$.
>
> $$\begin{aligned}
> c_{11} &= 2 \cdot 1 + 1 \cdot 5 = 7 \\
> c_{12} &= 2 \cdot 4 + 1 \cdot 2 = 10 \\
> c_{21} &= 0 \cdot 1 + 3 \cdot 5 = 15 \\
> c_{22} &= 0 \cdot 4 + 3 \cdot 2 = 6
> \end{aligned}$$
>
> $$AB = \begin{bmatrix} 7 & 10 \\ 15 & 6 \end{bmatrix}$$
> </details>

### 4.5 Quy tắc nhớ "hàng × cột"

Khi tính $(AB)_{ij}$:

```
       cột j của B
         ↓
        [ b_1j ]
        [ b_2j ]
        [  ... ]
        [ b_kj ]

hàng i của A → [ a_i1  a_i2  ...  a_ik ]   

(AB)_ij = a_i1·b_1j + a_i2·b_2j + ... + a_ik·b_kj
```

**Trick để không nhầm**: chỉ số $i$ đến **từ A** (hàng), chỉ số $j$ đến **từ B** (cột). Chỉ số "biến mất" là chiều $k$ — chiều khớp ở giữa.

### 4.6 Vì sao công thức lại kỳ cục thế?

Lý do ngắn: vì ta **muốn** $(AB)x = A(Bx)$ đúng với mọi vector $x$ — tức là ta muốn nhân ma trận biểu diễn **ghép phép biến đổi**. Khi đặt ra yêu cầu đó và viết ra $A(Bx)$ theo từng tọa độ, công thức $\sum a_{ir} \cdot b_{rj}$ rơi ra một cách tự nhiên.

Ta sẽ chứng minh chi tiết ở Lesson 06. Ở bước này: bạn chỉ cần thuộc quy tắc "hàng × cột" và biết bấm máy được.

### 📝 Tóm tắt Mục 4

- Điều kiện nhân: **cột A = hàng B**. Kết quả lấy hàng A và cột B.
- $(AB)_{ij}$ = dot product (hàng i của A) $\cdot$ (cột j của B).
- Quy tắc nhớ kích thước: $(m \times k) \cdot (k \times n) = (m \times n)$ — $k$ "biến mất".
- Định nghĩa "kỳ cục" của phép nhân thực ra là cách duy nhất để biểu diễn **ghép phép biến đổi**.

---

## 5. Tính chất nhân ma trận

### 5.1 KHÔNG giao hoán — `AB ≠ BA` (thường thấy)

Khác với phép cộng và phép nhân số, nhân ma trận **không giao hoán**. Tức là, **theo quy luật**, $AB \neq BA$. Có ba mức độ:

1. **Khác cấp**: nếu $A$ là $(m \times k)$ và $B$ là $(k \times n)$ với $m \neq n$, thì $BA$ có cấp $(n \times k) \cdot (m \times k)$ — chỉ tồn tại khi $k = m$, và cả khi tồn tại thì có cấp khác $AB$. Ví dụ $(2 \times 3) \cdot (3 \times 2) = (2 \times 2)$ nhưng $(3 \times 2) \cdot (2 \times 3) = (3 \times 3)$ — đã khác cấp, không có chuyện bằng nhau.

2. **Cùng cấp nhưng khác giá trị**: kể cả khi cả $AB$ và $BA$ đều là $(n \times n)$ (cùng cấp), giá trị vẫn thường khác.

3. **Hiếm khi bằng nhau**: chỉ một số cặp đặc biệt mới có $AB = BA$ (gọi là "giao hoán được" — vd $A$ và $I$, $A$ và $A^{-1}$, hai ma trận đường chéo cùng cấp).

#### Walk-through phản ví dụ — chứng minh $AB \neq BA$ cụ thể

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

(B chính là ma trận hoán đổi 2 dòng — sẽ giải thích ở Lesson 06.)

**Tính $AB$:**

$$\begin{aligned}
(AB)_{11} &= 1 \cdot 0 + 2 \cdot 1 = 2 \\
(AB)_{12} &= 1 \cdot 1 + 2 \cdot 0 = 1 \\
(AB)_{21} &= 3 \cdot 0 + 4 \cdot 1 = 4 \\
(AB)_{22} &= 3 \cdot 1 + 4 \cdot 0 = 3
\end{aligned}$$

$$AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}$$

**Tính $BA$:**

$$\begin{aligned}
(BA)_{11} &= 0 \cdot 1 + 1 \cdot 3 = 3 \\
(BA)_{12} &= 0 \cdot 2 + 1 \cdot 4 = 4 \\
(BA)_{21} &= 1 \cdot 1 + 0 \cdot 3 = 1 \\
(BA)_{22} &= 1 \cdot 2 + 0 \cdot 4 = 2
\end{aligned}$$

$$BA = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$$

So sánh: $AB \neq BA$ (cùng tập số nhưng sắp xếp khác).

> **💡 Trực giác cho non-commutativity**: nhân $B$ từ trái với $A$ = "hoán đổi 2 **hàng** của A". Nhân $B$ từ phải với $A$ = "hoán đổi 2 **cột** của A". Hai thao tác đó cho kết quả khác nhau — đó là vì sao $AB \neq BA$.

> **⚠ Lỗi thường gặp**: viết $(A + B)^2 = A^2 + 2AB + B^2$. **SAI** với ma trận. Đúng phải là:
>
> $$(A + B)^2 = (A + B)(A + B) = A^2 + AB + BA + B^2$$
>
> Vì $AB \neq BA$, không gộp được $AB + BA = 2AB$. Mọi danh tính đại số "quen tay" với số bình thường, dùng cho ma trận **phải kiểm tra lại tính giao hoán**.

### 5.2 Có tính kết hợp — `(AB)C = A(BC)`

Với mọi $A, B, C$ có cấp khớp để tích tồn tại:

$$(AB)C = A(BC)$$

Đây là tính chất **cực kỳ quan trọng** vì nó cho phép ta nhân theo **thứ tự tùy ý** miễn giữ nguyên thứ tự "viết bên trái sang phải".

**Verify với ví dụ:**

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} \qquad C = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

Tính $AB$ đã có ở Mục 4 ví dụ 1: $AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$.

**$(AB)C$:**

$$\begin{aligned}
((AB)C)_{11} &= 19 \cdot 0 + 22 \cdot 1 = 22 \\
((AB)C)_{12} &= 19 \cdot 1 + 22 \cdot 0 = 19 \\
((AB)C)_{21} &= 43 \cdot 0 + 50 \cdot 1 = 50 \\
((AB)C)_{22} &= 43 \cdot 1 + 50 \cdot 0 = 43
\end{aligned}$$

$$(AB)C = \begin{bmatrix} 22 & 19 \\ 50 & 43 \end{bmatrix}$$

**Bây giờ tính $BC$ rồi $A(BC)$:**

$BC$:

$$\begin{aligned}
(BC)_{11} &= 5 \cdot 0 + 6 \cdot 1 = 6 \\
(BC)_{12} &= 5 \cdot 1 + 6 \cdot 0 = 5 \\
(BC)_{21} &= 7 \cdot 0 + 8 \cdot 1 = 8 \\
(BC)_{22} &= 7 \cdot 1 + 8 \cdot 0 = 7
\end{aligned}$$

$$BC = \begin{bmatrix} 6 & 5 \\ 8 & 7 \end{bmatrix}$$

$A(BC)$:

$$\begin{aligned}
(A(BC))_{11} &= 1 \cdot 6 + 2 \cdot 8 = 22 \\
(A(BC))_{12} &= 1 \cdot 5 + 2 \cdot 7 = 19 \\
(A(BC))_{21} &= 3 \cdot 6 + 4 \cdot 8 = 50 \\
(A(BC))_{22} &= 3 \cdot 5 + 4 \cdot 7 = 43
\end{aligned}$$

$$A(BC) = \begin{bmatrix} 22 & 19 \\ 50 & 43 \end{bmatrix} \quad \checkmark \ (\text{bằng } (AB)C)$$

> **💡 Ứng dụng trong AI**: bạn nhân chuỗi $W_3 \cdot W_2 \cdot W_1 \cdot x$. Tính chất kết hợp cho phép "gộp trọng số" $W = W_3 W_2 W_1$ một lần rồi cứ thế nhân với mọi input $x$. Đó là vì sao nhiều layer **tuyến tính** (không activation) **gộp được thành 1 layer** — một lý do **không thể** dùng NN chỉ với linear layer mà phải có hàm phi tuyến giữa các layer.

### 5.3 Có tính phân phối — `A(B + C) = AB + AC`

Với $A, B, C$ có cấp khớp:

$$\begin{aligned}
A(B + C) &= AB + AC \\
(B + C)A &= BA + CA
\end{aligned}$$

Lưu ý: vì không giao hoán, cần ghi rõ A ở **bên trái** hay **bên phải**.

**Verify:**

$$A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} \qquad B = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \qquad C = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

$B + C = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$.

$A(B+C)$:

$$\begin{aligned}
(A(B+C))_{11} &= 1 \cdot 1 + 2 \cdot 1 = 3 \\
(A(B+C))_{12} &= 1 \cdot 1 + 2 \cdot 1 = 3 \\
(A(B+C))_{21} &= 0 \cdot 1 + 1 \cdot 1 = 1 \\
(A(B+C))_{22} &= 0 \cdot 1 + 1 \cdot 1 = 1
\end{aligned}$$

$$A(B+C) = \begin{bmatrix} 3 & 3 \\ 1 & 1 \end{bmatrix}$$

$AB$:

$$\begin{aligned}
(AB)_{11} &= 1 \cdot 1 + 2 \cdot 0 = 1 \\
(AB)_{12} &= 1 \cdot 0 + 2 \cdot 1 = 2 \\
(AB)_{21} &= 0 \cdot 1 + 1 \cdot 0 = 0 \\
(AB)_{22} &= 0 \cdot 0 + 1 \cdot 1 = 1
\end{aligned}$$

$AC$:

$$\begin{aligned}
(AC)_{11} &= 1 \cdot 0 + 2 \cdot 1 = 2 \\
(AC)_{12} &= 1 \cdot 1 + 2 \cdot 0 = 1 \\
(AC)_{21} &= 0 \cdot 0 + 1 \cdot 1 = 1 \\
(AC)_{22} &= 0 \cdot 1 + 1 \cdot 0 = 0
\end{aligned}$$

$$AB + AC = \begin{bmatrix} 1+2 & 2+1 \\ 0+1 & 1+0 \end{bmatrix} = \begin{bmatrix} 3 & 3 \\ 1 & 1 \end{bmatrix} \quad \checkmark$$

### 5.4 Bảng tổng kết tính chất

| Tính chất | Số thực | Ma trận |
|-----------|---------|---------|
| Giao hoán cộng $A+B = B+A$ | ✓ | ✓ |
| Giao hoán nhân $AB = BA$ | ✓ | ✗ (nói chung) |
| Kết hợp $(AB)C = A(BC)$ | ✓ | ✓ |
| Phân phối $A(B+C) = AB+AC$ | ✓ | ✓ |
| Phần tử trung lập nhân | $1 \cdot a = a$ | $IA = A$ |
| Triệt tiêu $ab = 0 \Rightarrow a=0 \lor b=0$ | ✓ | ✗ |

Hàng "triệt tiêu" đáng chú ý: với số, $ab = 0$ thì ít nhất một thừa số phải bằng 0. Với ma trận thì **KHÔNG**. Phản ví dụ:

$$A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} \qquad B = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix} \qquad AB = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$

$A \neq O$, $B \neq O$, nhưng $AB = O$. Đây là lý do quan trọng: với ma trận, không thể "chia hai vế cho A" để rút gọn — phải nhân **nghịch đảo** $A^{-1}$ (nếu tồn tại), sẽ học ở Mục 9.

### 📝 Tóm tắt Mục 5

- Nhân ma trận **không giao hoán** ($AB \neq BA$) — kiểm chứng bằng phản ví dụ 2×2 cụ thể.
- **Có** kết hợp và phân phối — vẫn dùng được nhiều quy tắc đại số.
- Cảnh giác: $(A+B)^2 \neq A^2 + 2AB + B^2$; $AB = O$ không suy ra $A = O$ hay $B = O$.

---

## 6. Transpose — `Aᵀ`

### 6.1 Định nghĩa

**Transpose** của ma trận $A$ cấp $m \times n$, ký hiệu $A^\top$, là ma trận cấp $n \times m$ thu được bằng cách **đổi hàng thành cột**:

$$(A^\top)_{ij} = A_{ji}$$

Tức là: phần tử ở hàng $i$ cột $j$ của $A^\top$ = phần tử ở hàng $j$ cột $i$ của $A$.

Một cách hình dung: "lật" ma trận qua đường chéo chính.

### 6.2 Ba ví dụ

**Ví dụ 1 — $2 \times 3 \to 3 \times 2$:**

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad A^\top = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$$

Cột 1 của $A$ (= $[1, 4]$) trở thành hàng 1 của $A^\top$. Cột 2 → hàng 2. Cột 3 → hàng 3.

**Ví dụ 2 — $3 \times 1 \to 1 \times 3$ (vector cột thành vector hàng):**

$$v = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} \qquad v^\top = \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}$$

Quan trọng: khi viết $x^\top y$ (dot product) ta thực ra đang nhân $(1 \times n) \cdot (n \times 1) = (1 \times 1)$ — một con số.

**Ví dụ 3 — ma trận vuông $2 \times 2$:**

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad A^\top = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$$

Lưu ý: với ma trận vuông, $A^\top$ vẫn có cấp $n \times n$ nhưng phần tử khác $A$ (trừ trường hợp đặc biệt **đối xứng**: $A = A^\top$).

### 6.3 Tính chất quan trọng

| Tính chất | Công thức | Ghi chú |
|-----------|-----------|---------|
| Idempotent | $(A^\top)^\top = A$ | Lật 2 lần về như cũ |
| Cộng | $(A + B)^\top = A^\top + B^\top$ | Phân phối |
| Scalar | $(c \cdot A)^\top = c \cdot A^\top$ | |
| Nhân (**chú ý đảo thứ tự**) | $(AB)^\top = B^\top \cdot A^\top$ | ⚠ Đảo thứ tự! |

Tính chất $(AB)^\top = B^\top A^\top$ rất dễ nhầm. Verify cụ thể:

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \qquad B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$$

$AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$ (đã tính ở Mục 4.4 ví dụ 1).

$(AB)^\top = \begin{bmatrix} 19 & 43 \\ 22 & 50 \end{bmatrix}$.

$B^\top = \begin{bmatrix} 5 & 7 \\ 6 & 8 \end{bmatrix}$, $A^\top = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$.

$B^\top \cdot A^\top$:

$$\begin{aligned}
(B^\top A^\top)_{11} &= 5 \cdot 1 + 7 \cdot 2 = 19 \\
(B^\top A^\top)_{12} &= 5 \cdot 3 + 7 \cdot 4 = 43 \\
(B^\top A^\top)_{21} &= 6 \cdot 1 + 8 \cdot 2 = 22 \\
(B^\top A^\top)_{22} &= 6 \cdot 3 + 8 \cdot 4 = 50
\end{aligned}$$

$B^\top A^\top = \begin{bmatrix} 19 & 43 \\ 22 & 50 \end{bmatrix} = (AB)^\top$ ✓

> **⚠ Lỗi thường gặp**: viết $(AB)^\top = A^\top B^\top$. SAI. Thứ tự phải đảo: $(AB)^\top = B^\top A^\top$. Nhớ bằng "bóc tất hai lớp": vớ ngoài (B) ra trước, vớ trong (A) ra sau khi nhân từ trái.

### 6.4 Ma trận đối xứng (symmetric)

Ma trận vuông $A$ được gọi là **đối xứng** nếu $A = A^\top$, tức $a_{ij} = a_{ji}$ mọi $i, j$. Ví dụ:

$$S = \begin{bmatrix} 1 & 4 & 7 \\ 4 & 2 & 5 \\ 7 & 5 & 3 \end{bmatrix}$$

(ma trận hiệp phương sai luôn đối xứng, ma trận khoảng cách cũng đối xứng.)

Đối xứng cực phổ biến trong xác suất, ML (covariance, Gram matrix). Sẽ học sâu ở Lesson 07-08 (eigen + SVD).

### 📝 Tóm tắt Mục 6

- Transpose = lật hàng ↔ cột. $(A^\top)_{ij} = A_{ji}$.
- $(A + B)^\top = A^\top + B^\top$.
- $(AB)^\top = B^\top A^\top$ — **đảo thứ tự**, đây là điểm hay quên.
- Đối xứng = bằng transpose của chính nó.

---

## 7. Ma trận đơn vị `I` — vai trò "số 1"

### 7.1 Định nghĩa lại

Ma trận đơn vị $I_n$ là ma trận vuông $n \times n$ với phần tử:

$$I_{ij} = \begin{cases} 1 & \text{nếu } i = j \quad (\text{đường chéo}) \\ 0 & \text{nếu } i \neq j \quad (\text{ngoài đường chéo}) \end{cases}$$

Ví dụ $I_3$:

$$I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

### 7.2 Tính chất chìa khóa: $IA = AI = A$

Với mọi ma trận $A$ cấp $m \times n$:
- $I_m \cdot A = A$
- $A \cdot I_n = A$

Tức $I$ đóng vai trò "số 1" trong phép nhân ma trận: nhân vào đâu cũng không đổi.

**Verify:**

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \qquad A \cdot I_3 = \ ?$$

Tính:

$$\begin{aligned}
(AI)_{11} &= 1 \cdot 1 + 2 \cdot 0 + 3 \cdot 0 = 1 \\
(AI)_{12} &= 1 \cdot 0 + 2 \cdot 1 + 3 \cdot 0 = 2 \\
(AI)_{13} &= 1 \cdot 0 + 2 \cdot 0 + 3 \cdot 1 = 3 \\
(AI)_{21} &= 4 \cdot 1 + 5 \cdot 0 + 6 \cdot 0 = 4 \\
(AI)_{22} &= 4 \cdot 0 + 5 \cdot 1 + 6 \cdot 0 = 5 \\
(AI)_{23} &= 4 \cdot 0 + 5 \cdot 0 + 6 \cdot 1 = 6
\end{aligned}$$

$$A \cdot I_3 = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} = A \quad \checkmark$$

> **💡 Trực giác**: cột $j$ của $I$ là vector "chọn cột thứ $j$". Nhân $A \cdot I$ = "với mỗi vị trí, chọn đúng cột tương ứng của A" → trả về A nguyên vẹn.

### 7.3 Sao phải có 2 cấp $I$?

Để bảo toàn cấp khi nhân với $A$ (cấp $m \times n$):
- Bên trái A: phải dùng $I_m$ (cấp $m \times m$), nếu không $(? \times ?) \cdot (m \times n)$ không hợp lệ.
- Bên phải A: phải dùng $I_n$ (cấp $n \times n$).

Khi $A$ vuông $n \times n$, chỉ cần một $I_n$.

### 📝 Tóm tắt Mục 7

- $I$ = đường chéo 1, ngoài 0. Là phần tử "trung lập" của phép nhân.
- $IA = AI = A$ (với cấp $I$ thích hợp).

---

## 8. Ma trận nghịch đảo `A⁻¹`

### 8.1 Trực giác — "hoàn tác phép biến đổi"

Với một số $a \neq 0$, ta có **nghịch đảo** $1/a$ thỏa $a \cdot (1/a) = 1$. Với ma trận, ta muốn tìm $A^{-1}$ thỏa:

$$A \cdot A^{-1} = A^{-1} \cdot A = I$$

Tức $A^{-1}$ là ma trận "hoàn tác" $A$: nếu $A$ đưa vector $x$ sang $Ax$, thì $A^{-1}$ đưa $Ax$ quay về $x$.

Khi đó giải $Ax = b$ đơn giản chỉ là $x = A^{-1}b$. (Tương tự giải $ax = b$ với số: $x = b/a$.)

### 8.2 Điều kiện tồn tại

Nghịch đảo **chỉ tồn tại** khi:

1. $A$ là **ma trận vuông** ($n \times n$), VÀ
2. $A$ **không suy biến** (non-singular), tức **định thức** $\det(A) \neq 0$.

Nếu $\det(A) = 0$ → $A$ **suy biến** (singular), KHÔNG có nghịch đảo. Hệ $Ax = b$ khi đó hoặc **vô nghiệm**, hoặc **vô số nghiệm** (đã học ở [Algebra Lesson 08](../../01-Algebra/lesson-08-linear-systems/)).

Ý nghĩa hình học (sẽ rõ ở Lesson 06): $\det(A) = 0$ nghĩa là $A$ "ép" không gian xuống thấp chiều hơn (hình hộp thành mặt phẳng, mặt phẳng thành đường thẳng). Một khi đã ép, không thể "kéo dãn ngược" — đó là vì sao không có nghịch đảo.

### 8.3 Công thức cho ma trận `2×2`

Cho $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$. **Định thức** $2 \times 2$:

$$\det(A) = ad - bc$$

Nếu $\det(A) \neq 0$, nghịch đảo là:

$$A^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

Cách nhớ:
1. Đổi chỗ $a$ và $d$ (đường chéo chính).
2. Đổi dấu $b$ và $c$ (phản chéo).
3. Chia toàn bộ cho $\det(A) = ad - bc$.

### 8.4 Walk-through 3 ví dụ tính `A⁻¹` cho `2×2`

#### Ví dụ 1 — đơn giản

$$A = \begin{bmatrix} 4 & 7 \\ 2 & 6 \end{bmatrix}$$

**Bước 1.** $\det(A) = 4 \cdot 6 - 7 \cdot 2 = 24 - 14 = 10 \neq 0$ → tồn tại nghịch đảo.

**Bước 2.** Hoán vị + đổi dấu:

$$\begin{bmatrix} d & -b \\ -c & a \end{bmatrix} = \begin{bmatrix} 6 & -7 \\ -2 & 4 \end{bmatrix}$$

**Bước 3.** Chia cho $\det = 10$:

$$A^{-1} = \begin{bmatrix} 6/10 & -7/10 \\ -2/10 & 4/10 \end{bmatrix} = \begin{bmatrix} 0.6 & -0.7 \\ -0.2 & 0.4 \end{bmatrix}$$

**Verify $A \cdot A^{-1} = I$:**

$$\begin{aligned}
(AA^{-1})_{11} &= 4 \cdot 0.6 + 7 \cdot (-0.2) = 2.4 - 1.4 = 1 \quad \checkmark \\
(AA^{-1})_{12} &= 4 \cdot (-0.7) + 7 \cdot 0.4 = -2.8 + 2.8 = 0 \quad \checkmark \\
(AA^{-1})_{21} &= 2 \cdot 0.6 + 6 \cdot (-0.2) = 1.2 - 1.2 = 0 \quad \checkmark \\
(AA^{-1})_{22} &= 2 \cdot (-0.7) + 6 \cdot 0.4 = -1.4 + 2.4 = 1 \quad \checkmark
\end{aligned}$$

$$A \cdot A^{-1} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I \quad \checkmark$$

#### Ví dụ 2 — số nguyên gọn

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$$

$\det(A) = 1 \cdot 4 - 2 \cdot 3 = 4 - 6 = -2$.

$$A^{-1} = \frac{1}{-2} \begin{bmatrix} 4 & -2 \\ -3 & 1 \end{bmatrix} = \begin{bmatrix} -2 & 1 \\ \frac{3}{2} & -\frac{1}{2} \end{bmatrix}$$

Verify:

$$\begin{aligned}
(AA^{-1})_{11} &= 1 \cdot (-2) + 2 \cdot \tfrac{3}{2} = -2 + 3 = 1 \quad \checkmark \\
(AA^{-1})_{12} &= 1 \cdot 1 + 2 \cdot (-\tfrac{1}{2}) = 1 - 1 = 0 \quad \checkmark \\
(AA^{-1})_{21} &= 3 \cdot (-2) + 4 \cdot \tfrac{3}{2} = -6 + 6 = 0 \quad \checkmark \\
(AA^{-1})_{22} &= 3 \cdot 1 + 4 \cdot (-\tfrac{1}{2}) = 3 - 2 = 1 \quad \checkmark
\end{aligned}$$

#### Ví dụ 3 — kiểm tra trường hợp suy biến

$$A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$$

$\det(A) = 1 \cdot 4 - 2 \cdot 2 = 4 - 4 = 0$ → **suy biến**, KHÔNG có nghịch đảo.

Nhìn kỹ: hàng 2 = 2 × hàng 1, tức 2 hàng "không độc lập tuyến tính" (sẽ học Lesson 04). Ma trận này "ép" mọi vector về đường thẳng $y = 2x$, không thể đảo ngược.

> **❓ Câu hỏi tự nhiên**:
>
> **Q1: Có chỉ một $A^{-1}$ thôi à? Hay nhiều?**
> Chỉ một. Nếu $B_1 A = I$ và $A B_2 = I$ thì $B_1 = B_1 I = B_1(A B_2) = (B_1 A)B_2 = I B_2 = B_2$. Vậy nghịch đảo (nếu tồn tại) **duy nhất**.
>
> **Q2: $A \cdot A^{-1} = I$ thì có suy ra $A^{-1} \cdot A = I$ không?**
> Với ma trận **vuông** thì có (định lý — chứng minh ở Lesson 06). Vì thế chỉ cần kiểm tra một chiều là đủ.
>
> **Q3: Tính nghịch đảo có đắt không?**
> Đắt — $O(n^3)$ cho ma trận $n \times n$ tổng quát. Trong thực tế, **không** ai tính $A^{-1}$ rồi nhân $A^{-1}b$ để giải $Ax = b$ — thay vào đó ta dùng **khử Gauss** ($O(n^3)$ nhưng nhanh hơn về hằng số) hoặc các phân rã (LU, QR). Học $A^{-1}$ chủ yếu để **suy luận** chứ không để tính trong production.

### 8.5 Ma trận `3×3` — giới thiệu

Có 2 cách tính $A^{-1}$ cho $n \times n$ tổng quát:

**Cách 1 — Adjugate / cofactor**: $A^{-1} = \frac{1}{\det A} \cdot \text{adj}(A)$, với $\text{adj}(A)$ là ma trận adjugate (transpose của ma trận cofactor). Chính xác nhưng phức tạp, ít dùng cho $n > 3$.

**Cách 2 — Khử Gauss-Jordan**: viết bảng mở rộng $[A \mid I]$, dùng phép biến đổi sơ cấp dòng để biến vế trái thành $I$; vế phải sẽ trở thành $A^{-1}$.

Ví dụ siêu tóm tắt với $A$ cấp 3:

```
[ 1  2  0 | 1  0  0 ]    →  ...  →    [ 1  0  0 | a' b' c' ]
[ 0  1  3 | 0  1  0 ]                  [ 0  1  0 | d' e' f' ]
[ 2  0  1 | 0  0  1 ]                  [ 0  0  1 | g' h' i' ]
```

Vế phải sau khi khử = $A^{-1}$. Chi tiết các bước khử sẽ nhắc lại ở Lesson 06; ở bài này ta chỉ cần biết **có cách** và sẽ dùng máy/code cho $n \geq 3$.

### 📝 Tóm tắt Mục 8

- $A^{-1}$ thỏa $AA^{-1} = A^{-1}A = I$.
- Chỉ tồn tại khi $A$ vuông VÀ $\det(A) \neq 0$.
- Công thức 2×2: hoán vị chéo chính, đổi dấu phản chéo, chia $\det$.
- 3×3 trở lên: khử Gauss-Jordan (giới thiệu).
- Khi tồn tại, $A^{-1}$ **duy nhất**.

---

## 9. Giải hệ `Ax = b` bằng nghịch đảo

Khi $A$ vuông và $\det(A) \neq 0$, hệ $Ax = b$ có **nghiệm duy nhất**:

$$x = A^{-1} \cdot b$$

### 9.1 Walk-through ví dụ

Giải hệ:

$$\begin{aligned}
4x + 7y &= 23 \\
2x + 6y &= 16
\end{aligned}$$

Viết dạng ma trận:

$$A = \begin{bmatrix} 4 & 7 \\ 2 & 6 \end{bmatrix} \qquad b = \begin{bmatrix} 23 \\ 16 \end{bmatrix}$$

Đã tính $A^{-1}$ ở Mục 8.4 ví dụ 1:

$$A^{-1} = \begin{bmatrix} 0.6 & -0.7 \\ -0.2 & 0.4 \end{bmatrix}$$

Tính $x = A^{-1} b$:

$$\begin{aligned}
x_1 &= 0.6 \cdot 23 + (-0.7) \cdot 16 = 13.8 - 11.2 = 2.6 \\
x_2 &= -0.2 \cdot 23 + 0.4 \cdot 16 = -4.6 + 6.4 = 1.8
\end{aligned}$$

Vậy $x = 2.6, y = 1.8$.

**Verify thay lại hệ gốc:**

$$\begin{aligned}
4 \cdot 2.6 + 7 \cdot 1.8 &= 10.4 + 12.6 = 23 \quad \checkmark \\
2 \cdot 2.6 + 6 \cdot 1.8 &= 5.2 + 10.8 = 16 \quad \checkmark
\end{aligned}$$

### 9.2 Khi nào không dùng được?

- $A$ không vuông (số phương trình ≠ số ẩn) → không có $A^{-1}$ theo nghĩa này. Khi đó dùng **least squares** (sẽ học sau).
- $\det(A) = 0$ → hoặc vô nghiệm, hoặc vô số nghiệm. Phải dùng khử Gauss và phân tích hạng.

### 📝 Tóm tắt Mục 9

- $Ax = b$ với $A$ khả nghịch → $x = A^{-1} b$.
- Chỉ là **lý thuyết**: thực tế dùng khử Gauss/LU cho hiệu năng.

---

## 10. Định thức (Determinant) — giới thiệu

Sẽ học sâu ở Lesson 06. Ở đây chỉ cần công thức tính.

### 10.1 `det(A)` cho `2×2`

$$\det \begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$$

Ví dụ: $\det \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = 4 - 6 = -2$.

### 10.2 `det(A)` cho `3×3` — quy tắc Sarrus

$$A = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix}$$

$$\det(A) = aei + bfg + cdh - ceg - bdi - afh$$

Cách nhớ Sarrus: chép lại 2 cột đầu cạnh bên phải, lấy tổng 3 đường chéo "xuôi" trừ tổng 3 đường chéo "ngược":

```
a  b  c | a  b
d  e  f | d  e
g  h  i | g  h
```

**Xuôi** (+): $aei$, $bfg$, $cdh$. **Ngược** (−): $ceg$, $bdi$, $afh$.

### 10.3 Một ví dụ `3×3`

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 10 \end{bmatrix}$$

- Xuôi: $1 \cdot 5 \cdot 10 + 2 \cdot 6 \cdot 7 + 3 \cdot 4 \cdot 8 = 50 + 84 + 96 = 230$
- Ngược: $3 \cdot 5 \cdot 7 + 2 \cdot 4 \cdot 10 + 1 \cdot 6 \cdot 8 = 105 + 80 + 48 = 233$

$\det(A) = 230 - 233 = -3$.

$\det \neq 0$ → khả nghịch.

### 10.4 Vài tính chất nhanh

- $\det(I) = 1$.
- $\det(AB) = \det(A) \cdot \det(B)$.
- $\det(A^\top) = \det(A)$.
- $\det(A^{-1}) = 1/\det(A)$.
- Hoán 2 hàng → $\det$ đổi dấu.
- 2 hàng tỉ lệ → $\det = 0$.

(Sẽ chứng minh và giải thích hình học ở Lesson 06.)

### 📝 Tóm tắt Mục 10

- $\det(2 \times 2) = ad - bc$.
- $\det(3 \times 3)$ qua Sarrus hoặc Laplace.
- $\det = 0$ ⇔ ma trận suy biến (không khả nghịch).

---

## 11. Liên hệ ML/AI — vì sao ma trận quan trọng

### 11.1 Một layer của Neural Network = `y = Wx + b`

Trong một mạng nơ-ron, mỗi **layer** (fully connected, dense) thực hiện:

$$y = W \cdot x + b$$

Trong đó:
- $x$ là input vector (cấp $n \times 1$).
- $W$ là **trọng số** (weight matrix), cấp $m \times n$ — $m$ là số neuron của layer, $n$ là số input.
- $b$ là **bias** vector (cấp $m \times 1$).
- $y$ là output (cấp $m \times 1$).

Cụ thể với $m = 2, n = 3$:

$$W = \begin{bmatrix} 0.1 & 0.2 & 0.3 \\ 0.4 & 0.5 & 0.6 \end{bmatrix} \qquad x = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} \qquad b = \begin{bmatrix} 0.5 \\ -0.5 \end{bmatrix}$$

$$W \cdot x = \begin{bmatrix} 0.1 \cdot 1 + 0.2 \cdot 2 + 0.3 \cdot 3 \\ 0.4 \cdot 1 + 0.5 \cdot 2 + 0.6 \cdot 3 \end{bmatrix} = \begin{bmatrix} 0.1 + 0.4 + 0.9 \\ 0.4 + 1.0 + 1.8 \end{bmatrix} = \begin{bmatrix} 1.4 \\ 3.2 \end{bmatrix}$$

$$y = W \cdot x + b = \begin{bmatrix} 1.4 + 0.5 \\ 3.2 + (-0.5) \end{bmatrix} = \begin{bmatrix} 1.9 \\ 2.7 \end{bmatrix}$$

Sau đó qua một hàm phi tuyến (ReLU, sigmoid, tanh) → tới layer kế tiếp. Lặp lại nhiều lần = mạng nhiều tầng.

> **💡 Vì sao phải có hàm phi tuyến giữa các layer?**
> Nếu xếp nhiều layer tuyến tính liên tiếp: $y = W_3(W_2(W_1 x + b_1) + b_2) + b_3$. Khai triển bằng kết hợp + phân phối: $y = (W_3 W_2 W_1)x + (W_3 W_2 b_1 + W_3 b_2 + b_3)$. Tức là **tương đương 1 layer duy nhất** $y = W'x + b'$ với $W' = W_3 W_2 W_1$. Không có sức biểu diễn phi tuyến → hàm activation là **bắt buộc**.

### 11.2 Batch processing — xử lý B sample cùng lúc

Thực tế ta không xử lý 1 sample mà một **batch** gồm $B$ sample. Xếp các sample thành ma trận:

$$X = \begin{bmatrix} x^{(1)} & x^{(2)} & \cdots & x^{(B)} \end{bmatrix} \quad (\text{cấp } n \times B, \text{ mỗi cột 1 sample})$$

hoặc

$$X = \begin{bmatrix} (x^{(1)})^\top \\ (x^{(2)})^\top \\ \vdots \\ (x^{(B)})^\top \end{bmatrix} \quad (\text{cấp } B \times n, \text{ mỗi hàng 1 sample — phổ biến hơn})$$

Với cách 2 ($B \times n$ — chuẩn PyTorch/NumPy), forward pass:

$$Y = X \cdot W^\top + b \qquad (\text{broadcast } b \text{ cho } B \text{ hàng})$$

$Y$ cấp $B \times m$ — mỗi hàng là output cho 1 sample. **GPU** nhân ma trận $(B \times n) \cdot (n \times m)$ rất nhanh, nhanh hơn rất nhiều so với chạy B lần phép nhân vector. Đó là vì sao toàn bộ deep learning quy về **GEMM** (General Matrix Multiplication).

### 11.3 Attention trong Transformer — toàn nhân ma trận

Cơ chế **self-attention** của Transformer (cơ sở của GPT, BERT, ChatGPT) tính:

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left( \frac{QK^\top}{\sqrt{d_k}} \right) \cdot V$$

Trong đó $Q, K, V$ đều là ma trận ($L \times d_k$, $L$ là số token trong câu, $d_k$ là chiều embedding). Bốc tách từng phép:

1. $Q \cdot K^\top$ — nhân ma trận $(L \times d_k) \cdot (d_k \times L) = (L \times L)$ — **attention score** giữa mọi cặp token.
2. Chia $\sqrt{d_k}$ — scalar.
3. $\text{softmax}$ theo hàng — chuẩn hóa thành phân phối xác suất.
4. Nhân với $V$: $(L \times L) \cdot (L \times d_k) = (L \times d_k)$ — **trộn** thông tin các token theo attention weight.

Toàn bộ là nhân ma trận. $Q, K, V$ cũng được sinh từ input bằng nhân ma trận: $Q = X \cdot W_Q$, $K = X \cdot W_K$, $V = X \cdot W_V$. Một mô hình LLM có **hàng tỷ** phép nhân ma trận mỗi forward pass.

> **💡 Trực giác**: khi GPU "tính" cho ChatGPT trả lời bạn, 95%+ thời gian là **nhân ma trận**. Hiểu được nhân ma trận là hiểu được "máy" đang làm gì.

### 11.4 Còn nhiều nữa

- **Linear regression**: nghiệm closed-form $\beta = (X^\top X)^{-1} X^\top y$ — toàn ma trận.
- **PCA**: phân rã ma trận hiệp phương sai (sẽ học Lesson 08).
- **Word embedding**: ma trận embedding $E$ cấp $\lvert V \rvert \times d$, mỗi từ là một hàng.
- **Convolutional layer**: thực tế cũng được "duỗi" về một phép nhân ma trận lớn (im2col).

### 📝 Tóm tắt Mục 11

- Layer NN = $y = Wx + b$ — một phép nhân ma trận với vector + bias.
- Batch = nhân ma trận với ma trận ($X \cdot W^\top$).
- Attention = chuỗi 4-5 phép nhân ma trận + softmax.
- Hiểu nhân ma trận = hiểu nửa kia bài toán AI/ML.

---

## 12. Bài tập

Làm trước rồi hãy xem lời giải.

### Bài 1 — Cộng và scalar

Cho $A = \begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 4 \\ -2 & 5 \end{bmatrix}$, $c = 3$. Tính $c \cdot A + B$ và $A - B$.

### Bài 2 — Nhân ma trận 2×2

Cho $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 2 & 0 \\ 1 & 3 \end{bmatrix}$. Tính $AB$ và $BA$. Kiểm tra $AB \neq BA$.

### Bài 3 — Nhân ma trận 2×3

Cho:

$$A = \begin{bmatrix} 1 & -1 & 2 \\ 0 & 2 & 1 \end{bmatrix} \qquad B = \begin{bmatrix} 0 & 3 \\ 1 & 2 \\ -2 & 1 \end{bmatrix}$$

Tính $AB$. Hỏi tích $BA$ có tồn tại không? Nếu có thì cấp bao nhiêu?

### Bài 4 — Transpose

Cho $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$. Tính $A^\top$. Sau đó tính $A \cdot A^\top$ và $A^\top \cdot A$. Cả hai có vuông không, cấp bao nhiêu?

### Bài 5 — Nghịch đảo 2×2

Cho $A = \begin{bmatrix} 3 & 1 \\ 5 & 2 \end{bmatrix}$. Tính $\det(A)$ và $A^{-1}$. Kiểm tra $A \cdot A^{-1} = I$.

### Bài 6 — Giải hệ bằng nghịch đảo

Giải hệ sau bằng cách viết dạng $Ax = b$ và tính $x = A^{-1}b$:

$$\begin{aligned}
2x + y &= 5 \\
x + 3y &= 10
\end{aligned}$$

---

## 13. Lời giải chi tiết

### Lời giải Bài 1

**$c \cdot A$ với $c = 3$:** nhân $3$ vào mọi phần tử của A.

$$3 \cdot A = \begin{bmatrix} 3 \cdot 2 & 3 \cdot (-1) \\ 3 \cdot 0 & 3 \cdot 3 \end{bmatrix} = \begin{bmatrix} 6 & -3 \\ 0 & 9 \end{bmatrix}$$

**$c \cdot A + B$:** cộng từng ô.

$$3A + B = \begin{bmatrix} 6+1 & -3+4 \\ 0+(-2) & 9+5 \end{bmatrix} = \begin{bmatrix} 7 & 1 \\ -2 & 14 \end{bmatrix}$$

**$A - B = A + (-1) \cdot B$:**

$$A - B = \begin{bmatrix} 2-1 & -1-4 \\ 0-(-2) & 3-5 \end{bmatrix} = \begin{bmatrix} 1 & -5 \\ 2 & -2 \end{bmatrix}$$

### Lời giải Bài 2

$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 2 & 0 \\ 1 & 3 \end{bmatrix}$.

**$AB$:**

$$\begin{aligned}
(AB)_{11} &= 1 \cdot 2 + 2 \cdot 1 = 4 \\
(AB)_{12} &= 1 \cdot 0 + 2 \cdot 3 = 6 \\
(AB)_{21} &= 3 \cdot 2 + 4 \cdot 1 = 10 \\
(AB)_{22} &= 3 \cdot 0 + 4 \cdot 3 = 12
\end{aligned}$$

$$AB = \begin{bmatrix} 4 & 6 \\ 10 & 12 \end{bmatrix}$$

**$BA$:**

$$\begin{aligned}
(BA)_{11} &= 2 \cdot 1 + 0 \cdot 3 = 2 \\
(BA)_{12} &= 2 \cdot 2 + 0 \cdot 4 = 4 \\
(BA)_{21} &= 1 \cdot 1 + 3 \cdot 3 = 10 \\
(BA)_{22} &= 1 \cdot 2 + 3 \cdot 4 = 14
\end{aligned}$$

$$BA = \begin{bmatrix} 2 & 4 \\ 10 & 14 \end{bmatrix}$$

So sánh: $AB \neq BA$ (vị trí (1,1) khác: 4 vs 2). Đây là minh họa cụ thể tính không giao hoán.

### Lời giải Bài 3

$A$ cấp $2 \times 3$, $B$ cấp $3 \times 2$. $AB$ có cấp $2 \times 2$.

$$\begin{aligned}
(AB)_{11} &= 1 \cdot 0 + (-1) \cdot 1 + 2 \cdot (-2) = 0 - 1 - 4 = -5 \\
(AB)_{12} &= 1 \cdot 3 + (-1) \cdot 2 + 2 \cdot 1 = 3 - 2 + 2 = 3 \\
(AB)_{21} &= 0 \cdot 0 + 2 \cdot 1 + 1 \cdot (-2) = 0 + 2 - 2 = 0 \\
(AB)_{22} &= 0 \cdot 3 + 2 \cdot 2 + 1 \cdot 1 = 0 + 4 + 1 = 5
\end{aligned}$$

$$AB = \begin{bmatrix} -5 & 3 \\ 0 & 5 \end{bmatrix}$$

**$BA$?** Cấp: $(3 \times 2) \cdot (2 \times 3) = (3 \times 3)$ — chiều giữa khớp (2=2), kết quả $3 \times 3$. Vậy $BA$ **tồn tại**, cấp $3 \times 3$. Tính minh họa:

$$\begin{aligned}
(BA)_{11} &= 0 \cdot 1 + 3 \cdot 0 = 0 \\
(BA)_{12} &= 0 \cdot (-1) + 3 \cdot 2 = 6 \\
(BA)_{13} &= 0 \cdot 2 + 3 \cdot 1 = 3 \\
(BA)_{21} &= 1 \cdot 1 + 2 \cdot 0 = 1 \\
(BA)_{22} &= 1 \cdot (-1) + 2 \cdot 2 = 3 \\
(BA)_{23} &= 1 \cdot 2 + 2 \cdot 1 = 4 \\
(BA)_{31} &= -2 \cdot 1 + 1 \cdot 0 = -2 \\
(BA)_{32} &= -2 \cdot (-1) + 1 \cdot 2 = 4 \\
(BA)_{33} &= -2 \cdot 2 + 1 \cdot 1 = -3
\end{aligned}$$

$$BA = \begin{bmatrix} 0 & 6 & 3 \\ 1 & 3 & 4 \\ -2 & 4 & -3 \end{bmatrix}$$

Quan sát: $AB$ cấp $2 \times 2$, $BA$ cấp $3 \times 3$ — **cấp đã khác** nên $AB \neq BA$ đương nhiên.

### Lời giải Bài 4

$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ cấp $2 \times 3$.

$$A^\top = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix} \quad \text{cấp } 3 \times 2$$

**$A \cdot A^\top$** cấp $(2 \times 3) \cdot (3 \times 2) = (2 \times 2)$:

$$\begin{aligned}
(AA^\top)_{11} &= 1 \cdot 1 + 2 \cdot 2 + 3 \cdot 3 = 14 \\
(AA^\top)_{12} &= 1 \cdot 4 + 2 \cdot 5 + 3 \cdot 6 = 4 + 10 + 18 = 32 \\
(AA^\top)_{21} &= 4 \cdot 1 + 5 \cdot 2 + 6 \cdot 3 = 4 + 10 + 18 = 32 \\
(AA^\top)_{22} &= 4 \cdot 4 + 5 \cdot 5 + 6 \cdot 6 = 16 + 25 + 36 = 77
\end{aligned}$$

$$A \cdot A^\top = \begin{bmatrix} 14 & 32 \\ 32 & 77 \end{bmatrix} \quad (\text{vuông } 2 \times 2, \text{ đối xứng vì } (AA^\top)_{12} = (AA^\top)_{21})$$

**$A^\top \cdot A$** cấp $(3 \times 2) \cdot (2 \times 3) = (3 \times 3)$:

$$\begin{aligned}
(A^\top A)_{11} &= 1 \cdot 1 + 4 \cdot 4 = 17 \\
(A^\top A)_{12} &= 1 \cdot 2 + 4 \cdot 5 = 22 \\
(A^\top A)_{13} &= 1 \cdot 3 + 4 \cdot 6 = 27 \\
(A^\top A)_{21} &= 2 \cdot 1 + 5 \cdot 4 = 22 \\
(A^\top A)_{22} &= 2 \cdot 2 + 5 \cdot 5 = 29 \\
(A^\top A)_{23} &= 2 \cdot 3 + 5 \cdot 6 = 36 \\
(A^\top A)_{31} &= 3 \cdot 1 + 6 \cdot 4 = 27 \\
(A^\top A)_{32} &= 3 \cdot 2 + 6 \cdot 5 = 36 \\
(A^\top A)_{33} &= 3 \cdot 3 + 6 \cdot 6 = 45
\end{aligned}$$

$$A^\top \cdot A = \begin{bmatrix} 17 & 22 & 27 \\ 22 & 29 & 36 \\ 27 & 36 & 45 \end{bmatrix} \quad (\text{vuông } 3 \times 3, \text{ đối xứng})$$

**Quan sát quan trọng**: cả $A \cdot A^\top$ và $A^\top \cdot A$ đều **vuông và đối xứng**. Đây là một quy luật chung — với mọi ma trận $A$, các tích $A^\top A$ và $AA^\top$ đều luôn vuông & đối xứng. Tính chất này là nền tảng của **SVD** (Lesson 08).

### Lời giải Bài 5

$A = \begin{bmatrix} 3 & 1 \\ 5 & 2 \end{bmatrix}$.

$\det(A) = 3 \cdot 2 - 1 \cdot 5 = 6 - 5 = 1 \neq 0$ → khả nghịch.

$$A^{-1} = \frac{1}{1} \begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix} = \begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix}$$

**Kiểm tra $A \cdot A^{-1} = I$:**

$$\begin{aligned}
(AA^{-1})_{11} &= 3 \cdot 2 + 1 \cdot (-5) = 6 - 5 = 1 \quad \checkmark \\
(AA^{-1})_{12} &= 3 \cdot (-1) + 1 \cdot 3 = -3 + 3 = 0 \quad \checkmark \\
(AA^{-1})_{21} &= 5 \cdot 2 + 2 \cdot (-5) = 10 - 10 = 0 \quad \checkmark \\
(AA^{-1})_{22} &= 5 \cdot (-1) + 2 \cdot 3 = -5 + 6 = 1 \quad \checkmark
\end{aligned}$$

$$A \cdot A^{-1} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I \quad \checkmark$$

### Lời giải Bài 6

Viết hệ dưới dạng $Ax = b$:

$$A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix} \qquad x = \begin{bmatrix} x \\ y \end{bmatrix} \qquad b = \begin{bmatrix} 5 \\ 10 \end{bmatrix}$$

$\det(A) = 2 \cdot 3 - 1 \cdot 1 = 6 - 1 = 5$.

$$A^{-1} = \frac{1}{5} \begin{bmatrix} 3 & -1 \\ -1 & 2 \end{bmatrix} = \begin{bmatrix} 3/5 & -1/5 \\ -1/5 & 2/5 \end{bmatrix} = \begin{bmatrix} 0.6 & -0.2 \\ -0.2 & 0.4 \end{bmatrix}$$

Tính $x = A^{-1} b$:

$$\begin{aligned}
x &= 0.6 \cdot 5 + (-0.2) \cdot 10 = 3 - 2 = 1 \\
y &= -0.2 \cdot 5 + 0.4 \cdot 10 = -1 + 4 = 3
\end{aligned}$$

**Verify thay vào hệ:**

$$\begin{aligned}
2 \cdot 1 + 1 \cdot 3 &= 2 + 3 = 5 \quad \checkmark \\
1 \cdot 1 + 3 \cdot 3 &= 1 + 9 = 10 \quad \checkmark
\end{aligned}$$

Nghiệm: $(x, y) = (1, 3)$.

---

## 14. Liên kết

- [← Lesson 04 — Độc lập tuyến tính](../lesson-04-linear-independence/)
- [→ Lesson 06 — Ma trận như phép biến đổi](../lesson-06-matrix-as-transform/)
- [→ Lesson 07 — Eigenvector & Eigenvalue](../lesson-07-eigenvectors/)
- [Algebra · Lesson 08 — Hệ phương trình tuyến tính](../../01-Algebra/lesson-08-linear-systems/) — tiền đề về `Ax = b`.

### Tham khảo thêm

- 3Blue1Brown — "Essence of Linear Algebra", tập 4 (Matrix multiplication) và 5 (Three-dimensional linear transformations).
- Gilbert Strang — *Introduction to Linear Algebra*, chương 2 và 3.

### File trong lesson

- [visualization.html](./visualization.html) — minh họa tương tác: nhân ma trận từng bước, non-commutativity, inverse 2×2, giải `Ax = b`.
