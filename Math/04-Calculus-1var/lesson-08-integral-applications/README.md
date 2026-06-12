# Lesson 08 — Ứng dụng tích phân

## Mục tiêu

- Tính **diện tích** giữa 2 đường cong.
- Tính **thể tích vật thể tròn xoay** (đĩa, vỏ trụ).
- **Độ dài cung** đường cong.
- **Giá trị trung bình** của hàm trên $[a, b]$.
- Ứng dụng vật lý: công, momen, khối tâm.

## Kiến thức tiền đề

- [Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

---

## 1. Diện tích giữa 2 đường cong

Cho $f(x) \ge g(x)$ trên $[a, b]$:

$$S = \int_a^b [f(x) - g(x)]\,dx$$

💡 **Trực giác — cộng từng dải dọc mỏng**: Mọi ứng dụng tích phân trong bài này đều cùng một ý tưởng: **cắt thành lát mỏng, tính từng lát, cộng dồn**. Mỗi ứng dụng chỉ khác nhau ở chỗ "lát mỏng" trông như thế nào. Với diện tích giữa 2 đường, hãy hình dung cắt vùng cần tính thành **vô số dải dọc mỏng** rộng $dx$. Mỗi dải là một hình chữ nhật cao $f(x) - g(x)$ (từ "sàn" $g$ lên tới "trần" $f$), rộng $dx$ → diện tích dải $= [f(x) - g(x)]\,dx$. Cộng dồn mọi dải từ $x=a$ tới $x=b$ chính là tích phân.

```
   y
   |        ┌─┐ ← trần f(x)
   |     ┌─┐│ │┌─┐
   |   ┌─┤ ││ ││ │┐
   |   │ │ ││ ││ ││  ← một dải dọc, cao f(x)-g(x), rộng dx
   |   └─┤ ││ ││ │┘
   |     └─┘│ │└─┘ ← sàn g(x)
   |        └─┘
   +─────────────────── x
       a    dx     b
   S = Σ (f - g)·dx → ∫ₐᵇ [f(x) - g(x)] dx
```

Diện tích = hiệu giữa diện tích "trần" ($f$) và "sàn" ($g$). **Quy trình 3 bước** áp dụng cho mọi bài:

> **Bước 1 — tìm cận**: giải $f(x) = g(x)$ để tìm các giao điểm → đó là cận tích phân.
>
> **Bước 2 — xác định trần/sàn**: thử một điểm trong khoảng, đường nào có giá trị lớn hơn là trần ($f$), nhỏ hơn là sàn ($g$).
>
> **Bước 3 — tích phân hiệu**: $S = \int (\text{trần} - \text{sàn})\,dx$.

### 1.1. Walk-through 3 ví dụ

**Ví dụ 1 — parabol và đường thẳng**: diện tích giới hạn bởi $y = x^2$ và $y = x$.
- **Bước 1** (cận): $x^2 = x \Rightarrow x^2 - x = 0 \Rightarrow x(x-1) = 0 \Rightarrow x = 0$ hoặc $x = 1$. Cận $[0, 1]$.
- **Bước 2** (trần/sàn): thử $x = 0.5$: $x = 0.5$, $x^2 = 0.25$ → $x > x^2$ → trần $= x$, sàn $= x^2$.
- **Bước 3** (tích phân):
$$S = \int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \mathbf{\frac{1}{6}}.$$

**Ví dụ 2 — hai parabol** (cận không phải 0 và 1): diện tích giữa $y = x^2$ và $y = 2x - x^2$.
- **Bước 1** (cận): $x^2 = 2x - x^2 \Rightarrow 2x^2 - 2x = 0 \Rightarrow 2x(x-1) = 0 \Rightarrow x = 0, 1$.
- **Bước 2** (trần/sàn): thử $x = 0.5$: parabol thứ nhất $x^2 = 0.25$; parabol thứ hai $2(0.5) - 0.25 = 0.75$. Vậy $2x - x^2 > x^2$ → trần $= 2x - x^2$, sàn $= x^2$.
- **Bước 3**:
$$S = \int_0^1 \big[(2x - x^2) - x^2\big]\,dx = \int_0^1 (2x - 2x^2)\,dx = \left[x^2 - \frac{2x^3}{3}\right]_0^1 = 1 - \frac{2}{3} = \mathbf{\frac{1}{3}}.$$

**Ví dụ 3 — đường giao 3 lần, phải chia đoạn** (lỗi kinh điển): diện tích giữa $y = x^3$ và $y = x$ trên $[-1, 1]$.
- **Bước 1** (cận): $x^3 = x \Rightarrow x^3 - x = 0 \Rightarrow x(x-1)(x+1) = 0 \Rightarrow x = -1, 0, 1$. **Ba giao điểm** → trần/sàn đổi chỗ tại $x = 0$, phải chia làm 2 đoạn.
- **Bước 2** (trần/sàn từng đoạn):
  - Trên $(-1, 0)$, thử $x = -0.5$: $x^3 = -0.125$, $x = -0.5$ → $x^3 > x$ → trần $= x^3$, sàn $= x$.
  - Trên $(0, 1)$, thử $x = 0.5$: $x^3 = 0.125$, $x = 0.5$ → $x > x^3$ → trần $= x$, sàn $= x^3$.
- **Bước 3** (cộng 2 đoạn):
$$\begin{aligned}
S &= \int_{-1}^0 (x^3 - x)\,dx + \int_0^1 (x - x^3)\,dx \\
  &= \left[\frac{x^4}{4} - \frac{x^2}{2}\right]_{-1}^0 + \left[\frac{x^2}{2} - \frac{x^4}{4}\right]_0^1 \\
  &= \left(0 - \left(\frac{1}{4} - \frac{1}{2}\right)\right) + \left(\frac{1}{2} - \frac{1}{4}\right) = \frac{1}{4} + \frac{1}{4} = \mathbf{\frac{1}{2}}.
\end{aligned}$$
Nếu **không chia đoạn** mà tính thẳng $\int_{-1}^1 (x - x^3)\,dx = 0$ (do hàm lẻ) → ra $0$, **sai hoàn toàn** vì hai phần dương/âm triệt tiêu nhau. Diện tích thật là $\frac{1}{2}$.

⚠ **Nếu 2 đường giao nhau nhiều lần**, phải chia nhỏ tại mỗi giao điểm và trên mỗi đoạn xác định lại trần/sàn (như Ví dụ 3). Cách an toàn nhất: $S = \int_a^b |f(x) - g(x)|\,dx$.

### 1.2. Tích phân theo dy — khi cắt dải ngang gọn hơn

Đôi khi cắt **dải ngang** (rộng $dy$) gọn hơn dải dọc — đặc biệt khi vùng dễ mô tả bằng "đường phải $-$ đường trái" theo biến $y$. Khi đó:

$$S = \int_c^d \big[x_{\text{phải}}(y) - x_{\text{trái}}(y)\big]\,dy.$$

**Ví dụ 4 — chọn $dy$ cho gọn**: diện tích giới hạn bởi $x = y^2$ và $x = y + 2$.
- **Bước 1** (cận theo $y$): $y^2 = y + 2 \Rightarrow y^2 - y - 2 = 0 \Rightarrow (y-2)(y+1) = 0 \Rightarrow y = -1, 2$.
- **Bước 2** (phải/trái): thử $y = 0$: $x = y^2 = 0$, $x = y + 2 = 2$ → đường $x = y+2$ ở **phải**, $x = y^2$ ở **trái**.
- **Bước 3**:
$$S = \int_{-1}^2 \big[(y + 2) - y^2\big]\,dy = \left[\frac{y^2}{2} + 2y - \frac{y^3}{3}\right]_{-1}^2 = \left(2 + 4 - \frac{8}{3}\right) - \left(\frac{1}{2} - 2 + \frac{1}{3}\right) = \mathbf{\frac{9}{2}}.$$
Nếu cố cắt dải dọc ($dx$) thì phải tách $x = y^2$ thành hai nhánh $y = \pm\sqrt{x}$ và chia 2 vùng — dài hơn nhiều. **Mẹo**: nếu giải $x$ theo $y$ gọn hơn giải $y$ theo $x$, hãy tích phân theo $dy$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết đường nào là 'trần' ($f$) đường nào là 'sàn' ($g$)?"* Trên mỗi khoảng, thử một điểm: đường có giá trị **lớn hơn** là trần. Vd trên $(0,1)$, tại $x=0.5$: $x = 0.5 > x^2 = 0.25 \to y=x$ là trần. Nếu thứ tự đảo trên khoảng khác → phải chia đoạn.
- *"Cận tích phân lấy từ đâu?"* Từ **giao điểm** của hai đường (giải $f = g$). Ở ví dụ: $x^2 = x \to x = 0, 1 \to$ cận $[0,1]$.
- *"Khi nào nên cắt dải dọc ($dx$), khi nào dải ngang ($dy$)?"* Cắt dọc khi mỗi $x$ ứng với một "trần" và một "sàn" rõ ràng (hàm theo $x$). Cắt ngang khi vùng dễ mô tả theo $y$ (vd parabol nằm ngang $x = y^2$). Chọn chiều cắt làm số đoạn ít nhất.
- *"Diện tích có bao giờ phụ thuộc việc cắt dọc hay ngang không?"* Không — diện tích là một con số cố định của vùng. Cắt dọc hay ngang chỉ là **hai cách cộng** ra cùng kết quả; chọn cách nào tính nhanh hơn.

⚠ **Lỗi thường gặp — không xét đường nào trên/dưới, ra diện tích âm**. Nếu lấy $\int(x^2 - x)\,dx$ (sàn trừ trần) trên $[0,1]$ ra $-\frac{1}{6} < 0$ — diện tích không thể âm. Phải lấy trần $-$ sàn $= \int(x - x^2)\,dx = \frac{1}{6}$. Diện tích luôn lấy $|f - g|$ hoặc xác định đúng thứ tự.

⚠ **Lỗi thường gặp — quên chia đoạn khi hai đường giao $\ge 3$ lần**. Như Ví dụ 3: tính thẳng một tích phân từ $-1$ tới $1$ cho $0$ (phần âm triệt tiêu phần dương), trong khi diện tích thật là $\frac{1}{2}$. Luôn giải $f = g$ tìm **hết** giao điểm trong khoảng trước khi đặt cận.

🔁 **Dừng lại tự kiểm tra**

1. Diện tích giữa $y = x$ và $y = x^3$ trên $[0, 1]$ (đường nào trên?).
2. Cận tích phân của diện tích giữa $y = x^2$ và $y = 2x$ là gì? Tính luôn diện tích.
3. Diện tích giữa $y = x^2$ và $y = x^3$ (tự tìm cận).

<details><summary>Đáp án</summary>

1. Tại $x=0.5$: $x=0.5 > x^3=0.125 \to y=x$ trên. $S = \int_0^1 (x - x^3)\,dx = \left[\frac{x^2}{2} - \frac{x^4}{4}\right]_0^1 = \frac{1}{2} - \frac{1}{4} = \frac{1}{4}$.
2. Giao: $x^2 = 2x \to x(x-2)=0 \to x = 0, 2 \to$ cận $[0, 2]$. Thử $x=1$: $2x=2 > x^2=1$ → trần $=2x$. $S = \int_0^2 (2x - x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}$.
3. Giao: $x^2 = x^3 \to x^2(1-x)=0 \to x = 0, 1$. Thử $x=0.5$: $x^2=0.25 > x^3=0.125$ → trần $=x^2$. $S = \int_0^1 (x^2 - x^3)\,dx = \left[\frac{x^3}{3} - \frac{x^4}{4}\right]_0^1 = \frac{1}{3} - \frac{1}{4} = \frac{1}{12}$.

</details>

### 📝 Tóm tắt mục 1

- Diện tích giữa hai đường: $S = \int_a^b (\text{trần} - \text{sàn})\,dx$, cận = giao điểm. **Cộng từng dải dọc** cao $f-g$, rộng $dx$.
- Quy trình 3 bước: (1) giải $f=g$ tìm cận, (2) thử điểm xác định trần/sàn, (3) tích phân hiệu.
- Xác định trần/sàn bằng cách thử điểm; nếu đổi thứ tự giữa chừng (giao $\ge 3$ lần) → **chia đoạn** (Ví dụ 3).
- Có thể cắt dải ngang ($dy$): $S = \int_c^d (x_{\text{phải}} - x_{\text{trái}})\,dy$ — gọn hơn khi giải $x$ theo $y$ dễ.
- Diện tích luôn $\ge 0$; lấy $|f - g|$ để tránh kết quả âm.

---

## 2. Thể tích vật thể tròn xoay — Phương pháp đĩa

🎯 **Bài toán**: Quay đồ thị $y = f(x) \ge 0$ trên $[a, b]$ quanh trục Ox → khối tròn xoay. $V = ?$

💡 **Ý tưởng — cộng từng lát đĩa mỏng**: Vẫn là "cắt lát mỏng, cộng dồn", nhưng lát bây giờ là **khối 3D mỏng**. Cắt vật bằng các mặt phẳng vuông góc trục Ox → mỗi lát là một **đĩa tròn** (như đồng xu) bán kính $f(x)$, độ dày $dx$. Thể tích một đĩa = diện tích mặt tròn × độ dày $= \pi r^2 \cdot dx = \pi f(x)^2\,dx$. Cộng dồn mọi đĩa từ $a$ tới $b$:
- $dV = \pi\cdot f(x)^2 \cdot dx$.
- $V = \int_a^b \pi\cdot f(x)^2\,dx$.

```
   y                          quay quanh Ox
   |    y=f(x)                ──────────────►       ┌──┐
   |   ╱                                          ╱      ╲   ← khối tròn xoay
   |  ╱  │← f(x)              mỗi lát:           │  ●  │  │  ← đĩa b.kính f(x)
   | ╱   │                   đĩa mỏng           │      │  │     dày dx
   |╱____│____               b.kính f(x)          ╲      ╱
   +─────┼────── x            dày dx                └──┘
   a     x  dx  b            dV = π·f(x)²·dx       V = ∫ₐᵇ π f(x)² dx
```

**Ví dụ 1**: Quay $y = \sqrt{x}$ trên $[0, 4]$ quanh Ox.
- $r = f(x) = \sqrt{x}$, nên $r^2 = x$.
- $V = \pi\cdot\int_0^4 (\sqrt{x})^2\,dx = \pi\int_0^4 x\,dx = \pi\cdot\left[\frac{x^2}{2}\right]_0^4 = \pi\cdot 8 =$ **$8\pi \approx 25.13$**.

**Ví dụ 2 — nón** (kiểm bằng công thức quen): Quay $y = x$ trên $[0, 3]$ quanh Ox → nón cao $3$, bán kính đáy $R = 3$.
- $V = \pi\int_0^3 x^2\,dx = \pi\left[\frac{x^3}{3}\right]_0^3 = \pi\cdot 9 = \mathbf{9\pi}$.
- Kiểm công thức nón: $\frac{1}{3}\pi R^2 h = \frac{1}{3}\pi\cdot 9\cdot 3 = 9\pi$ ✓.

> 📐 **Định nghĩa đầy đủ — Thể tích vật tròn xoay (đĩa)**
>
> **(a) Là gì**: Khối được tạo bằng cách quay đường cong $y = f(x)$ (với $f \ge 0$) trên đoạn $[a, b]$ quanh trục Ox tạo nên 1 vật 3D đối xứng. Cắt vật bằng mặt phẳng vuông trục → mỗi lát là **đĩa tròn** bán kính $f(x)$, độ dày $dx$. Tổng các đĩa $= V = \pi\cdot\int f(x)^2\,dx$.
>
> **(b) Vì sao cần**: Vì nhiều hình 3D không có công thức $V$ đơn giản — bình hoa, mặt ly, các bộ phận quay (trục, bánh xe có khía). Trước Calculus, Archimedes đã tính $V$ cầu bằng phương pháp này (thủ công, mất nhiều trang). FTC + nguyên hàm biến nó thành phép tính 5 phút. Cốt lõi của thiết kế cơ khí (mô-men quán tính), hoá học (thể tích bình phản ứng), y học (CT scan = tích phân khúc xạ tia X).
>
> **(c) Ví dụ số**: Quay $y = \sqrt{x}$ trên $[0, 4]$ quanh Ox: $V = \pi\cdot\int_0^4 x\,dx = \pi\cdot 8 =$ **$8\pi$** $\approx 25.13$. Quay $y = x$ trên $[0, 3] \to$ nón cao 3, $R=3$: $V = \pi\cdot\int_0^3 x^2\,dx = \pi\cdot 9 = 9\pi$. Kiểm công thức nón $\frac{1}{3}\pi R^2 h = \frac{1}{3}\pi\cdot 9\cdot 3 = 9\pi$ ✓. Cầu $R = 2$: quay $y = \sqrt{4-x^2}$ trên $[-2, 2]$: $V = \pi\cdot\int_{-2}^2 (4-x^2)\,dx = \pi\cdot\left[4x-\frac{x^3}{3}\right]_{-2}^2 = \pi\cdot\left(\frac{8}{3}-\left(-\frac{8}{3}\right) + 8 - (-8)\right) = \ldots = \frac{32\pi}{3}$. Kiểm $\frac{4}{3}\pi\cdot 8 = \frac{32\pi}{3}$ ✓.

### Hình cầu (ví dụ kinh điển)

Quay nửa đường tròn $y = \sqrt{R^2 - x^2}$ quanh Ox:
- $V = \pi\cdot\int_{-R}^R (R^2 - x^2)\,dx = \pi\cdot\left[R^2 x - \frac{x^3}{3}\right]_{-R}^R = \pi\cdot\left(R^3\cdot 2 - \frac{2R^3}{3}\right) =$ **$\frac{4}{3}\cdot\pi\cdot R^3$** ✓.

Khớp công thức hình cầu — đây là cách Archimedes phát hiện (trước khi có Calculus chính thức).

### Phương pháp vành khuyên (washer) — vùng giữa 2 đường

Khi quay quanh Ox **vùng giữa hai đường** $f(x) \ge g(x) \ge 0$ (chứ không phải vùng từ trục lên đường), mỗi lát là một **vành khuyên** (đĩa khoét lỗ): bán kính ngoài $R = f(x)$, bán kính trong $r = g(x)$.

$$V = \pi\int_a^b \big[f(x)^2 - g(x)^2\big]\,dx$$

```
   lát cắt = vành khuyên (washer):
        ┌─────────┐
        │  ┌───┐  │   R = f(x)  (b.kính ngoài)
        │  │ ○ │  │   r = g(x)  (b.kính trong, lỗ rỗng)
        │  └───┘  │   diện tích = πR² − πr²
        └─────────┘
```

**Ví dụ 3 — vành khuyên**: Quay vùng giữa $y = \sqrt{x}$ và $y = x^2$ quanh Ox.
- Giao điểm: $\sqrt{x} = x^2 \Rightarrow x = x^4 \Rightarrow x(x^3 - 1) = 0 \Rightarrow x = 0, 1$.
- Trên $(0,1)$, thử $x = 0.5$: $\sqrt{0.5} \approx 0.71 > 0.5^2 = 0.25$ → $R = \sqrt{x}$ (ngoài), $r = x^2$ (trong).
$$V = \pi\int_0^1 \big[(\sqrt{x})^2 - (x^2)^2\big]\,dx = \pi\int_0^1 (x - x^4)\,dx = \pi\left[\frac{x^2}{2} - \frac{x^5}{5}\right]_0^1 = \pi\left(\frac{1}{2} - \frac{1}{5}\right) = \mathbf{\frac{3\pi}{10}}.$$

⚠ **Vành khuyên KHÔNG phải $\pi\int(f - g)^2\,dx$**. Đúng là $\pi\int(f^2 - g^2)\,dx$ — **hiệu bình phương**, không phải bình phương hiệu. Vd $f=2, g=1$ trên $[0,1]$: đúng $\pi\int(4-1)\,dx = 3\pi$; sai $\pi\int(2-1)^2\,dx = \pi$. Lý do: diện tích vành $= \pi R^2 - \pi r^2$, hai số hạng bình phương riêng rồi mới trừ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có $f(x)^2$ chứ không phải $f(x)$?"* Vì mỗi lát cắt là **đĩa tròn** bán kính $f(x)$, diện tích đĩa $= \pi\cdot(\text{bán kính})^2 = \pi\cdot f(x)^2$. Bình phương đến từ diện tích hình tròn, không phải nhầm lẫn.
- *"Quay quanh trục Ox và Oy khác nhau ra sao?"* Quay quanh Ox dùng đĩa ($\pi\int f^2\,dx$); quay quanh Oy thường dùng vỏ trụ (mục 3) hoặc đổi sang biến $y$. Chọn sai trục → công thức sai.
- *"Khi nào dùng đĩa, khi nào dùng vành khuyên?"* Đĩa khi vùng quay **chạm trục** (từ $y=0$ lên đường) → lát đặc. Vành khuyên khi vùng nằm **giữa hai đường** không chạm trục → lát có lỗ. Vành khuyên là tổng quát hóa của đĩa (cho $g = 0$ thì $\pi\int(f^2 - 0)\,dx$ về lại đĩa).

⚠ **Lỗi thường gặp — quên bình phương $f(x)$**. Viết $V = \pi\int f(x)\,dx$ (thiếu bình phương) là sai — đó là công thức diện tích, không phải thể tích. Đĩa cần $\pi\cdot f(x)^2$. Vd quay $y=\sqrt{x}$ trên $[0,4]$: đúng $\pi\int_0^4 (\sqrt{x})^2\,dx = \pi\int x\,dx = 8\pi$; nếu quên bình phương ra $\pi\int \sqrt{x}\,dx = \frac{16}{3}\pi$ — sai.

🔁 **Dừng lại tự kiểm tra**

1. Quay $y = x$ trên $[0, 3]$ quanh Ox. $V = ?$ (kiểm bằng công thức nón).
2. Vì sao lát cắt vuông góc Ox lại là hình tròn?
3. Quay $y = x^2$ trên $[0, 2]$ quanh Ox (đĩa). $V = ?$
4. Quay vùng giữa $y = 2$ và $y = x$ trên $[0, 2]$ quanh Ox (vành khuyên). $V = ?$

<details><summary>Đáp án</summary>

1. $V = \pi\int_0^3 x^2\,dx = \pi\left[\frac{x^3}{3}\right]_0^3 = 9\pi$. Nón đáy $R=3$ cao $h=3$: $\frac{1}{3}\pi R^2 h = \frac{1}{3}\pi\cdot 9\cdot 3 = 9\pi$ ✓.
2. Vì quay quanh Ox, mỗi điểm $(x, f(x))$ vạch một đường tròn bán kính $f(x)$ → lát cắt là hình tròn.
3. $V = \pi\int_0^2 (x^2)^2\,dx = \pi\int_0^2 x^4\,dx = \pi\left[\frac{x^5}{5}\right]_0^2 = \frac{32\pi}{5}$.
4. $R = 2$ (ngoài), $r = x$ (trong): $V = \pi\int_0^2 (4 - x^2)\,dx = \pi\left[4x - \frac{x^3}{3}\right]_0^2 = \pi\left(8 - \frac{8}{3}\right) = \frac{16\pi}{3}$.

</details>

### 📝 Tóm tắt mục 2

- Quay $y=f(x)$ quanh Ox: $V = \pi\int_a^b f(x)^2\,dx$ (đĩa, bán kính $f(x)$) — **cộng từng lát đĩa mỏng**.
- Vùng giữa 2 đường (không chạm trục): **vành khuyên** $V = \pi\int_a^b (f^2 - g^2)\,dx$ — hiệu bình phương, KHÔNG phải bình phương hiệu.
- **Đừng quên bình phương** và **đừng quên $\pi$** — bình phương đến từ diện tích hình tròn $\pi r^2$.
- Kiểm bằng công thức quen (nón $\frac{1}{3}\pi R^2 h$, cầu $\frac{4}{3}\pi R^3$).

---

## 3. Thể tích — Phương pháp vỏ trụ (Shell)

Khi quay quanh trục Oy, dùng vỏ trụ thay vì đĩa:

$$V = 2\pi\cdot\int_a^b x\cdot f(x)\,dx$$

💡 **Mỗi vỏ trụ** bán kính $x$, chiều cao $f(x)$, độ dày $dx$ → thể tích $= 2\pi x\cdot f(x)\cdot dx$ (chu vi × cao × dày). "Lát mỏng" lần này là một **ống trụ rỗng** (như lõi giấy vệ sinh), không phải đĩa. Tưởng tượng "lột" vật thành các ống lồng nhau, rồi **trải phẳng** mỗi ống thành một tấm chữ nhật:

```
   vỏ trụ b.kính x:           trải phẳng:
       ╭───╮                  ┌─────────────────┐
      │  ▓  │  cao f(x)        │                 │ cao f(x)
      │  ▓  │  dày dx          └─────────────────┘ dày dx
       ╰───╯                  rộng = chu vi = 2πx
   dV = (2πx)·f(x)·dx          → tấm: 2πx × f(x) × dx
```

**Ví dụ 1**: Quay $y = x^2$ trên $[0, 2]$ quanh Oy.
- $V = 2\pi\int_0^2 x\cdot x^2\,dx = 2\pi\int_0^2 x^3\,dx = 2\pi\left[\frac{x^4}{4}\right]_0^2 = 2\pi\cdot 4 = \mathbf{8\pi}$.

**Ví dụ 2**: Quay $y = \sqrt{x}$ trên $[0, 4]$ quanh Oy.
- $V = 2\pi\int_0^4 x\cdot\sqrt{x}\,dx = 2\pi\int_0^4 x^{3/2}\,dx = 2\pi\left[\frac{2}{5}x^{5/2}\right]_0^4 = 2\pi\cdot\frac{2}{5}\cdot 32 = \mathbf{\frac{128\pi}{5}}$.
  (Vì $4^{5/2} = (\sqrt{4})^5 = 2^5 = 32$.)

⚖ **So sánh: cùng một vật, đĩa hay vỏ trụ đều ra cùng $V$.** Quay $y = x^2$, $0\le x\le 2$ **quanh Oy**. Bằng vỏ trụ ở trên: $8\pi$. Kiểm bằng đĩa theo biến $y$ (vùng quay là phần bên trái đường cong, từ trục Oy ra tới $x = \sqrt{y}$, với $y$ chạy $0\to 4$; nhưng còn cả khối trụ ngoài bán kính 2)... cách vỏ trụ rõ ràng gọn hơn nhiều — đó là lý do tồn tại của phương pháp này. Hai phương pháp **luôn cho cùng kết quả**, chỉ khác độ tiện.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quay quanh Oy lại dùng vỏ trụ thay vì đĩa?"* Vì khi quay quanh Oy, để dùng đĩa ta phải biểu diễn $x$ theo $y$ (đảo hàm) — nhiều khi khó. Vỏ trụ giữ nguyên biến $x$: tưởng tượng "lột" vật thành các ống trụ mỏng lồng nhau, mỗi ống bán kính $x$.
- *"$2\pi x$ ở đâu ra?"* Đó là **chu vi** của vỏ trụ bán kính $x$ (chu vi đường tròn $= 2\pi r$). Trải phẳng vỏ trụ thành tấm: rộng $2\pi x$, cao $f(x)$, dày $dx$ → thể tích $2\pi x\cdot f(x)\cdot dx$.

⚠ **Lỗi thường gặp — lẫn công thức đĩa và vỏ trụ**. Đĩa (quanh Ox): $\pi\int f^2\,dx$. Vỏ trụ (quanh Oy): $2\pi\int x\cdot f(x)\,dx$. Dùng nhầm đĩa cho trục Oy hoặc quên thừa số $2\pi$ đều ra sai. Xác định **trục quay** trước khi chọn công thức.

🔁 **Dừng lại tự kiểm tra**

1. Quay $y = x^2$ trên $[0, 2]$ quanh Oy bằng vỏ trụ. $V = ?$
2. Thừa số $2\pi x$ trong công thức vỏ trụ biểu thị gì?
3. Quay $y = x$ trên $[0, 3]$ quanh Oy bằng vỏ trụ. $V = ?$
4. Một vật quay quanh Ox. Nên dùng đĩa hay vỏ trụ (theo biến $x$)?

<details><summary>Đáp án</summary>

1. $V = 2\pi\int_0^2 x\cdot x^2\,dx = 2\pi\int_0^2 x^3\,dx = 2\pi\left[\frac{x^4}{4}\right]_0^2 = 2\pi\cdot 4 = 8\pi$.
2. Chu vi đường tròn bán kính $x$ ($= 2\pi x$) — bề rộng khi trải phẳng vỏ trụ.
3. $V = 2\pi\int_0^3 x\cdot x\,dx = 2\pi\int_0^3 x^2\,dx = 2\pi\left[\frac{x^3}{3}\right]_0^3 = 2\pi\cdot 9 = 18\pi$.
4. Đĩa/vành khuyên (lát vuông góc Ox là hình tròn, biến tự nhiên là $x$). Vỏ trụ theo $x$ hợp khi quay quanh Oy.

</details>

### 📝 Tóm tắt mục 3

- Quay quanh Oy: $V = 2\pi\int_a^b x\cdot f(x)\,dx$ (vỏ trụ, giữ biến $x$) — **cộng từng ống trụ mỏng**.
- $2\pi x$ = chu vi vỏ trụ; $f(x)$ = chiều cao; $dx$ = độ dày — trải phẳng thành tấm $2\pi x \times f(x) \times dx$.
- Xác định **trục quay** để chọn đúng đĩa/vành khuyên (Ox) vs vỏ trụ (Oy).
- Đĩa và vỏ trụ luôn cho **cùng $V$** cho cùng vật — chọn cái tránh phải đảo hàm.

---

## 4. Độ dài cung đường cong

Cho $y = f(x)$ trên $[a, b]$:

$$L = \int_a^b \sqrt{1 + (f'(x))^2}\,dx$$

💡 **Trực giác — cộng từng đoạn dây nhỏ**: "Lát mỏng" ở đây là một **đoạn thẳng nhỏ** dọc đường cong. Phóng to một đoạn cung cực nhỏ, nó gần như thẳng: đi ngang $dx$, đi dọc $dy$. Theo Pythagoras, độ dài đoạn $= \sqrt{dx^2 + dy^2}$. Vì $dy = f'(x)\,dx$:
$$\sqrt{dx^2 + dy^2} = \sqrt{dx^2\big(1 + (f')^2\big)} = \sqrt{1 + (f'(x))^2}\,dx.$$
Cộng dồn mọi đoạn → tổng độ dài cung.

```
   y                          phóng to một đoạn cung:
   |    ╱ y=f(x)                       •
   |   ╱                              ╱│
   |  ╱                              ╱ │ dy = f'(x)·dx
   | ╱                              ╱  │
   |╱                              •───┘
   +────────── x                    dx
                       ds = √(dx² + dy²) = √(1 + (f')²)·dx
```

**Ví dụ 1 — đường thẳng** (kiểm bằng khoảng cách 2 điểm): độ dài $y = 2x$ trên $[0, 3]$.
- $f'(x) = 2$, hằng.
- $L = \int_0^3 \sqrt{1 + 2^2}\,dx = \int_0^3 \sqrt{5}\,dx = 3\sqrt{5} \approx 6.71$.
- Kiểm: hai đầu $(0,0)$ và $(3,6)$, khoảng cách $= \sqrt{3^2 + 6^2} = \sqrt{45} = 3\sqrt{5}$ ✓.

**Ví dụ 2**: Độ dài cung $y = x^{3/2}$ trên $[0, 1]$.
- $f'(x) = \frac{3}{2}\cdot x^{1/2}$.
- $L = \int_0^1 \sqrt{1 + \frac{9x}{4}}\,dx$.
- $u = 1 + \frac{9x}{4}$, $du = \frac{9}{4}\,dx$.
- $= \frac{4}{9}\cdot\int_1^{13/4} \sqrt{u}\,du = \frac{4}{9}\cdot\frac{2}{3}\cdot u^{3/2}\Big|_1^{13/4} = \frac{8}{27}\cdot\left[\left(\frac{13}{4}\right)^{3/2} - 1\right] \approx$ **$1.44$**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Công thức $\sqrt{1+(f')^2}$ từ đâu?"* Định lý Pythagoras cho đoạn cung nhỏ: chiều ngang $dx$, chiều dọc $dy = f'(x)dx$, độ dài đoạn $= \sqrt{dx^2 + dy^2} = \sqrt{1 + (f')^2}\cdot dx$. Cộng dồn (tích phân) → tổng độ dài.
- *"Vì sao tích phân độ dài cung thường khó tính?"* Vì $\sqrt{1+(f')^2}$ hiếm khi có nguyên hàm sơ cấp đẹp. Vd đường tròn, parabol cho tích phân phức tạp — thường phải đổi biến khéo hoặc tính số.

⚠ **Lỗi thường gặp — quên số $1$ dưới căn**. Công thức là $\sqrt{1 + (f')^2}$, KHÔNG phải $\sqrt{(f')^2} = |f'|$. Bỏ số 1 sẽ cho kết quả sai (thiếu đóng góp chiều ngang $dx$). Vd $y = 2x$ trên $[0,3]$: đúng $\int\sqrt{1+4}\,dx = 3\sqrt{5}$; quên số 1 ra $\int\sqrt{4}\,dx = 6$ — sai.

🔁 **Dừng lại tự kiểm tra**

1. Độ dài $y = 3x$ từ $x=0$ đến $x=4$ (kiểm bằng khoảng cách hai điểm).
2. Vì sao đoạn cung nhỏ dài $\sqrt{1+(f')^2}\cdot dx$?
3. Lập (không cần tính) tích phân độ dài $y = x^2$ trên $[0, 2]$.

<details><summary>Đáp án</summary>

1. $f'=3$, $L = \int_0^4 \sqrt{1+9}\,dx = \sqrt{10}\cdot4 = 4\sqrt{10} \approx 12.65$. Hai điểm $(0,0),(4,12)$: $\sqrt{16+144} = \sqrt{160} = 4\sqrt{10}$ ✓.
2. Pythagoras: $\sqrt{dx^2 + dy^2}$ với $dy = f'\cdot dx$ → $\sqrt{dx^2(1+(f')^2)} = \sqrt{1+(f')^2}\cdot dx$.
3. $f' = 2x$ → $L = \int_0^2 \sqrt{1 + 4x^2}\,dx$ (tích phân này cần đổi biến lượng giác/hyperbolic, không sơ cấp đơn giản — minh họa "độ dài cung thường khó").

</details>

### 📝 Tóm tắt mục 4

- Độ dài cung $y=f(x)$ trên $[a,b]$: $L = \int_a^b \sqrt{1+(f'(x))^2}\,dx$ — **cộng từng đoạn dây nhỏ**.
- Công thức từ Pythagoras cho đoạn cung nhỏ ($dx$ ngang, $f'dx$ dọc).
- **Đừng quên số 1** dưới căn (đóng góp của $dx$); tích phân này thường khó, có khi phải tính số.

---

## 5. Giá trị trung bình của hàm

$$f_{tb} = \frac{1}{b-a}\cdot\int_a^b f(x)\,dx$$

💡 **Trực giác — san phẳng đồ thị thành hình chữ nhật**: $\int_a^b f\,dx$ là **diện tích** dưới đồ thị. Hỏi: nếu "san phẳng" diện tích đó thành một hình chữ nhật cùng bề rộng $(b-a)$, thì cao bao nhiêu? Chiều cao đó chính là **giá trị trung bình** — mức mà nếu $f$ giữ nguyên (hằng) suốt $[a,b]$ thì cho cùng diện tích. Giống trung bình rời rạc $\frac{\text{tổng}}{\text{số phần tử}}$, đây là $\frac{\text{tổng tích lũy}}{\text{bề rộng}}$.

```
   y                          san phẳng:
   |   ╱‾‾╲                    ┌────────────┐
   |  ╱    ╲    ← f(x)         │            │ ← f_tb (cao trung bình)
   | ╱      ╲                  │ cùng d.tích│
   |╱        ╲                 └────────────┘
   +──────────── x              a          b
   a            b          d.tích ∫f dx = f_tb·(b−a)
```

**Ví dụ 1**: Giá trị trung bình của $\sin x$ trên $[0, \pi]$.
- $f_{tb} = \frac{1}{\pi}\cdot\int_0^\pi \sin x\,dx = \frac{1}{\pi}\cdot[-\cos x]_0^\pi = \frac{1}{\pi}\cdot\big((-\cos\pi) - (-\cos 0)\big) = \frac{1}{\pi}\cdot(1 + 1) =$ **$\frac{2}{\pi} \approx 0.637$**.
- ⟶ Giá trị trung bình của sóng sin nửa chu kỳ. Nằm trong $[0,1]$ (khoảng giá trị của $\sin$ trên $[0,\pi]$) — hợp lý.

**Ví dụ 2**: Giá trị trung bình của $f(x) = x^2$ trên $[0, 3]$.
- $f_{tb} = \frac{1}{3-0}\int_0^3 x^2\,dx = \frac{1}{3}\left[\frac{x^3}{3}\right]_0^3 = \frac{1}{3}\cdot 9 = \mathbf{3}$.
- Kiểm hợp lý: $x^2$ trên $[0,3]$ chạy từ $0$ tới $9$, trung bình $3$ nằm giữa — và nhỏ hơn trung bình số học của hai biên ($\frac{0+9}{2} = 4.5$) vì hàm cong lên (phần lớn thời gian giá trị nhỏ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia cho $(b-a)$?"* Vì $\int_a^b f\,dx$ là **diện tích** (tổng tích lũy), chia cho bề rộng $(b-a)$ cho ra **chiều cao trung bình** — đúng nghĩa "trung bình". Tương tự trung bình rời rạc $\frac{\text{tổng}}{\text{số phần tử}}$.
- *"Giá trị trung bình có nằm trong khoảng giá trị của hàm không?"* Có (định lý giá trị trung bình tích phân): với $f$ liên tục, tồn tại $c \in [a,b]$ mà $f(c) = f_{tb}$. Vd $\sin x$ trên $[0,\pi]$ có $f_{tb} = \frac{2}{\pi} \approx 0.637$, nằm trong $[0,1]$.

⚠ **Lỗi thường gặp — quên chia cho $(b-a)$**. $f_{tb} = \frac{\int_a^b f\,dx}{b-a}$, KHÔNG phải chỉ $\int_a^b f\,dx$. Vd trung bình của $x^2$ trên $[0,2]$: đúng $\frac{1}{2}\int_0^2 x^2\,dx = \frac{1}{2}\cdot\frac{8}{3} = \frac{4}{3}$; quên chia ra $\frac{8}{3}$ — sai (và lớn hơn cả giá trị max $4$, vô lý).

🔁 **Dừng lại tự kiểm tra**

1. Giá trị trung bình của $f(x) = x$ trên $[0, 4]$.
2. Giá trị trung bình của hàm hằng $f(x) = 7$ trên $[2, 9]$?
3. Giá trị trung bình của $f(x) = x^2$ trên $[0, 2]$ (tìm cả điểm $c$ để $f(c) = f_{tb}$).

<details><summary>Đáp án</summary>

1. $\frac{1}{4}\int_0^4 x\,dx = \frac{1}{4}\left[\frac{x^2}{2}\right]_0^4 = \frac{1}{4}\cdot8 = 2$ (đúng bằng trung điểm, vì $x$ tuyến tính).
2. $7$ (trung bình của hằng số luôn bằng chính nó).
3. $f_{tb} = \frac{1}{2}\int_0^2 x^2\,dx = \frac{1}{2}\cdot\frac{8}{3} = \frac{4}{3}$. Điểm $c$: $c^2 = \frac{4}{3} \Rightarrow c = \frac{2}{\sqrt3} \approx 1.15 \in [0,2]$ ✓ (MVT tích phân).

</details>

### 📝 Tóm tắt mục 5

- $f_{tb} = \frac{1}{b-a}\cdot\int_a^b f(x)\,dx$ = diện tích chia bề rộng = chiều cao trung bình (san phẳng đồ thị thành chữ nhật).
- **Đừng quên chia $(b-a)$** — quên chia ra số to vô lý (có thể vượt cả max của hàm).
- Với $f$ liên tục, $f_{tb}$ thực sự đạt được tại một điểm $c \in [a,b]$ (MVT tích phân).

---

## 6. Ứng dụng vật lý

### 6.1. Công cơ học

Lực biến thiên $F(x)$ tác động lên vật từ $a$ đến $b$:

$$W = \int_a^b F(x)\,dx$$

💡 **Trực giác**: "lát mỏng" là một quãng dịch chuyển nhỏ $dx$ mà trên đó lực coi như **hằng** $F(x)$ → công nhỏ $dW = F(x)\,dx$. Cộng dồn → tổng công.

**Ví dụ 1**: Lò xo Hooke $F = kx$. Công kéo lò xo từ 0 đến $x$:
- $W = \int_0^x k\cdot t\,dt = \frac{1}{2}\cdot k\cdot x^2$.

**Ví dụ 2 — số cụ thể**: lò xo $k = 200$ N/m, kéo từ $0$ đến $0.1$ m.
- $W = \int_0^{0.1} 200t\,dt = \left[100t^2\right]_0^{0.1} = 100\cdot 0.01 = \mathbf{1}$ J.
- Nếu nhầm dùng $F\cdot d$ với $F$ tại điểm cuối $= 200\cdot 0.1 = 20$ N: ra $20\cdot 0.1 = 2$ J — **gấp đôi**, sai (vì lực không hằng, trung bình lực chỉ là $10$ N).

### 6.2. Khối tâm thanh

Thanh mỏng có mật độ $\rho(x)$ trên $[a, b]$:

$$x_{cm} = \frac{\int_a^b x\cdot\rho(x)\,dx}{\int_a^b \rho(x)\,dx}$$

### 6.3. Quãng đường khi vận tốc biến thiên

$$s = \int_a^b v(t)\,dt$$

💡 **Trực giác — vì sao tích phân là "tổng tích lũy"**: nhiều đại lượng vật lý = tích của hai thứ (công = lực × quãng đường, quãng đường = vận tốc × thời gian). Khi một thừa số **biến thiên**, không nhân thẳng được — phải chia nhỏ, nhân trên từng mảnh, rồi cộng dồn = tích phân.

**Ví dụ 1 — độ dời**: $v(t) = 3t^2$ m/s, từ $t=0$ tới $t=2$.
- $s = \int_0^2 3t^2\,dt = [t^3]_0^2 = 8$ m.

**Ví dụ 2 — vật đổi chiều (độ dời vs quãng đường)**: $v(t) = t - 2$ m/s trên $[0, 3]$. Vật đi lùi khi $t < 2$ ($v<0$), tiến khi $t > 2$.
- **Độ dời** (có dấu): $\int_0^3 (t-2)\,dt = \left[\frac{t^2}{2} - 2t\right]_0^3 = \left(\frac{9}{2} - 6\right) = -\frac{3}{2}$ m (cuối cùng lùi $1.5$ m so với chỗ xuất phát).
- **Quãng đường thực** (đường đi tổng): $\int_0^3 |t-2|\,dt = \int_0^2 (2-t)\,dt + \int_2^3 (t-2)\,dt = \left[2t - \frac{t^2}{2}\right]_0^2 + \left[\frac{t^2}{2} - 2t\right]_2^3 = 2 + \frac{1}{2} = \frac{5}{2}$ m.
- Hai số khác nhau ($-\frac{3}{2}$ vs $\frac{5}{2}$) — đây là lỗi nhầm phổ biến nhất ở mục này.

### 6.4. Ứng dụng xác suất — hàm mật độ (PDF)

💡 **Là gì**: Với biến ngẫu nhiên **liên tục** $X$ (chiều cao, thời gian chờ...), không có "xác suất tại một điểm" (luôn bằng 0); thay vào đó có **hàm mật độ xác suất (probability density function, PDF)** $f(x) \ge 0$. **Xác suất $X$ rơi vào $[a,b]$ = diện tích dưới $f$ trên đoạn đó**:

$$P(a \le X \le b) = \int_a^b f(x)\,dx.$$

**Vì sao cần tích phân?** Vì xác suất "rải" liên tục trên một khoảng — phải cộng dồn mật độ × bề rộng nhỏ $f(x)\,dx$ (đúng kiểu "cộng lát mỏng"). Hai điều kiện bắt buộc của một PDF: $f(x) \ge 0$ mọi nơi, và $\int_{-\infty}^{\infty} f(x)\,dx = 1$ (tổng xác suất bằng 1).

**Ví dụ — phân phối đều (uniform)** trên $[0, 4]$: $f(x) = \frac{1}{4}$ với $0\le x\le 4$, $0$ ngoài đoạn.
- Kiểm chuẩn hóa: $\int_0^4 \frac14\,dx = \frac14\cdot 4 = 1$ ✓.
- $P(1 \le X \le 3) = \int_1^3 \frac14\,dx = \frac14\cdot 2 = \frac12$.
- **Kỳ vọng** (giá trị trung bình, dùng đúng công thức mục 5 nhưng có trọng số mật độ): $E[X] = \int_0^4 x\cdot\frac14\,dx = \frac14\left[\frac{x^2}{2}\right]_0^4 = \frac14\cdot 8 = 2$ (đúng trung điểm).

**Ví dụ — PDF tam giác**: $f(x) = 2x$ trên $[0,1]$.
- Kiểm chuẩn hóa: $\int_0^1 2x\,dx = [x^2]_0^1 = 1$ ✓.
- $P(X \le 0.5) = \int_0^{0.5} 2x\,dx = [x^2]_0^{0.5} = 0.25$.

⚠ **Lỗi thường gặp — quên kiểm $\int f = 1$ hoặc nghĩ $f(x)$ là xác suất**. $f(x)$ là **mật độ**, không phải xác suất (có thể $> 1$, như $2x$ tại $x=0.9$ bằng $1.8$). Chỉ **diện tích** $\int f\,dx$ mới là xác suất. Sẽ học sâu ở tier xác suất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công lò xo là $\frac{1}{2}kx^2$ chứ không $kx\cdot x$?"* Vì lực $F = kx$ **tăng dần** khi kéo, không phải hằng. Phải tích phân: $W = \int_0^x kt\,dt = \frac{1}{2}kx^2$. Nếu lực hằng thì mới $W = F\cdot d$.
- *"$\int v(t)\,dt$ cho quãng đường hay độ dời?"* Cho **độ dời** (có dấu). Nếu vật đổi chiều, muốn **quãng đường thực** phải lấy $\int|v(t)|\,dt$ (giống diện tích thật vs diện tích có dấu ở L07).

⚠ **Lỗi thường gặp — dùng $W = F\cdot d$ khi lực biến thiên**. Công thức $W = F\cdot d$ chỉ đúng khi $F$ **hằng**. Với $F(x)$ thay đổi (lò xo, hấp dẫn theo độ cao) phải $W = \int F\,dx$. Vd lò xo $F=kx$: dùng $F\cdot d = kx\cdot x = kx^2$ ra **gấp đôi** giá trị đúng $\frac{1}{2}kx^2$.

🔁 **Dừng lại tự kiểm tra**

1. Lực $F(x) = 6x$ N kéo vật từ $x=0$ đến $x=2$ m. Công?
2. Vận tốc $v(t) = 3t^2$. Độ dời từ $t=0$ đến $t=2$?
3. PDF $f(x) = \frac{1}{2}$ trên $[0,2]$. Tính $P(0.5 \le X \le 1.5)$ và kiểm $\int f = 1$.
4. $v(t) = t - 1$ trên $[0,2]$: độ dời và quãng đường thực có bằng nhau không?

<details><summary>Đáp án</summary>

1. $W = \int_0^2 6x\,dx = [3x^2]_0^2 = 12$ J.
2. $s = \int_0^2 3t^2\,dt = [t^3]_0^2 = 8$ m.
3. Chuẩn hóa: $\int_0^2 \frac12\,dx = 1$ ✓. $P(0.5\le X\le 1.5) = \int_{0.5}^{1.5}\frac12\,dx = \frac12\cdot 1 = \frac12$.
4. Không. Độ dời $\int_0^2 (t-1)\,dt = \left[\frac{t^2}{2}-t\right]_0^2 = 0$ (lùi rồi tiến về chỗ cũ). Quãng đường $\int_0^2 |t-1|\,dt = \int_0^1(1-t)\,dt + \int_1^2(t-1)\,dt = \frac12 + \frac12 = 1$ m.

</details>

### 📝 Tóm tắt mục 6

- Tích phân = **tổng tích lũy** khi một thừa số biến thiên: $W=\int F\,dx$, $s=\int v\,dt$.
- Công lò xo $W=\frac{1}{2}kx^2$ (lực $kx$ biến thiên) — KHÔNG dùng $F\cdot d$.
- $\int v\,dt$ = độ dời (có dấu); quãng đường thực = $\int|v|\,dt$ (lấy trị tuyệt đối khi đổi chiều).
- Xác suất liên tục: $P(a\le X\le b) = \int_a^b f\,dx$; PDF cần $f\ge 0$ và $\int_{-\infty}^\infty f = 1$. $f(x)$ là mật độ, không phải xác suất.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Diện tích giới hạn $y = x^2$ và $y = 4$.

**Bài 2**: Thể tích quay $y = \sin x$, $0 \le x \le \pi$ quanh Ox.

**Bài 3**: Độ dài đường thẳng $y = 2x$ từ $x=0$ đến $x=3$.

**Bài 4**: Giá trị trung bình của $x^2$ trên $[0, 2]$.

**Bài 5**: Lực $F(x) = 3x^2$ N tác dụng kéo vật từ $x=0$ đến $x=2$ m. Tính công.

**Bài 6**: Diện tích vùng giữa $x = y^2$ và $x = 2 - y^2$ (gợi ý: tích phân theo $dy$).

**Bài 7**: Quay $y = x^2$ trên $[0, 1]$ quanh **Oy** bằng vỏ trụ. Tính $V$.

**Bài 8**: Thể tích vùng giữa $y = x$ và $y = x^2$ quay quanh Ox (vành khuyên).

**Bài 9**: Vận tốc $v(t) = t^2 - 4$ m/s trên $[0, 3]$. Tính độ dời và quãng đường thực.

**Bài 10**: PDF $f(x) = 3x^2$ trên $[0, 1]$. Kiểm $\int f = 1$, rồi tính $P(X \le 0.5)$.

### Lời giải

**Bài 1**: $x^2 = 4 \to x = \pm 2$. Trên $[-2, 2]$, $4 \ge x^2$. $S = \int_{-2}^2 (4 - x^2)\,dx = \left[4x - \frac{x^3}{3}\right]_{-2}^2 = \left(8 - \frac{8}{3}\right) - \left(-8 + \frac{8}{3}\right) =$ **$\frac{32}{3}$**.

**Bài 2**: $V = \pi\cdot\int_0^\pi \sin^2 x\,dx = \pi\cdot\int_0^\pi \frac{1 - \cos 2x}{2}\,dx = \pi\cdot\left[\frac{x}{2} - \frac{\sin(2x)}{4}\right]_0^\pi =$ **$\frac{\pi^2}{2}$**.

**Bài 3**: $f' = 2$. $L = \int_0^3 \sqrt{1+4}\,dx = \sqrt{5}\cdot3 =$ **$3\sqrt{5} \approx 6.71$**. (Kiểm tra: từ $(0,0)$ đến $(3,6)$, khoảng cách $= \sqrt{9+36} = \sqrt{45} = 3\sqrt{5}$ ✓.)

**Bài 4**: $\frac{1}{2}\cdot\int_0^2 x^2\,dx = \frac{1}{2}\cdot\left[\frac{x^3}{3}\right]_0^2 = \frac{1}{2}\cdot\frac{8}{3} =$ **$\frac{4}{3}$**.

**Bài 5**: $W = \int_0^2 3x^2\,dx = [x^3]_0^2 =$ **$8$ J**.

**Bài 6**: Cắt dải ngang ($dy$). Giao: $y^2 = 2 - y^2 \Rightarrow 2y^2 = 2 \Rightarrow y = \pm 1$. Trên $(-1,1)$ thử $y=0$: $x = 0$ (trái) và $x = 2$ (phải) → phải $= 2 - y^2$, trái $= y^2$.
$$S = \int_{-1}^1 \big[(2 - y^2) - y^2\big]\,dy = \int_{-1}^1 (2 - 2y^2)\,dy = \left[2y - \frac{2y^3}{3}\right]_{-1}^1 = \left(2 - \frac23\right) - \left(-2 + \frac23\right) = \mathbf{\frac{8}{3}}.$$

**Bài 7**: Vỏ trụ quanh Oy: $V = 2\pi\int_0^1 x\cdot x^2\,dx = 2\pi\int_0^1 x^3\,dx = 2\pi\left[\frac{x^4}{4}\right]_0^1 = 2\pi\cdot\frac14 =$ **$\frac{\pi}{2}$**.

**Bài 8**: Giao $x = x^2 \Rightarrow x = 0, 1$. Trên $(0,1)$, $x > x^2$ → ngoài $R = x$, trong $r = x^2$.
$$V = \pi\int_0^1 \big[x^2 - (x^2)^2\big]\,dx = \pi\int_0^1 (x^2 - x^4)\,dx = \pi\left[\frac{x^3}{3} - \frac{x^5}{5}\right]_0^1 = \pi\left(\frac13 - \frac15\right) =$$ **$\frac{2\pi}{15}$**.

**Bài 9**: $v = t^2 - 4 = 0 \Rightarrow t = 2$ (đổi chiều). Trên $[0,2)$: $v < 0$; trên $(2,3]$: $v > 0$.
- **Độ dời**: $\int_0^3 (t^2 - 4)\,dt = \left[\frac{t^3}{3} - 4t\right]_0^3 = (9 - 12) = \mathbf{-3}$ m.
- **Quãng đường**: $\int_0^2 (4 - t^2)\,dt + \int_2^3 (t^2 - 4)\,dt$. Phần 1: $\left[4t - \frac{t^3}{3}\right]_0^2 = 8 - \frac83 = \frac{16}{3}$. Phần 2: $\left[\frac{t^3}{3} - 4t\right]_2^3 = (9-12) - (\frac83 - 8) = -3 + \frac{16}{3} = \frac{7}{3}$. Tổng $= \frac{16}{3} + \frac{7}{3} = \mathbf{\frac{23}{3}}$ m.

**Bài 10**: Chuẩn hóa: $\int_0^1 3x^2\,dx = [x^3]_0^1 = 1$ ✓. $P(X \le 0.5) = \int_0^{0.5} 3x^2\,dx = [x^3]_0^{0.5} = 0.125 = \mathbf{\frac{1}{8}}$.

---

## 8. 🎉 HOÀN THÀNH TIER 4 — CALCULUS 1-VAR (8/8)!

Tiếp theo: **Tier 5 — Số học, Tổ hợp, Logic** (chưa triển khai).

## 📝 Tổng kết Tier 4

1. **Giới hạn**: lim dãy và hàm, định nghĩa $\varepsilon$-N/$\varepsilon$-$\delta$.
2. **Liên tục**: 3 điều kiện, định lý giá trị trung gian.
3. **Đạo hàm**: slope tiếp tuyến = vận tốc tức thời.
4. **Quy tắc**: tổng, tích, thương, chain rule (quan trọng nhất).
5. **Ứng dụng đh**: cực trị, khảo sát, l'Hôpital, tối ưu.
6. **Nguyên hàm**: đảo đạo hàm, đổi biến + từng phần.
7. **Tích phân xác định**: tổng Riemann, FTC: $\int_a^b f = F(b)-F(a)$.
8. **Ứng dụng**: diện tích giữa 2 đường (dải dọc/ngang, chia đoạn), thể tích tròn xoay (đĩa, vành khuyên, vỏ trụ), độ dài cung, giá trị trung bình, công/quãng đường, PDF xác suất — tất cả đều là "cộng lát mỏng".

🎉 Đây là **xương sống của Toán phổ thông cao + năm 1 đại học**. Tier 5+ sẽ học các nhánh khác (NT, combinatorics, ĐSTT, đa biến).
