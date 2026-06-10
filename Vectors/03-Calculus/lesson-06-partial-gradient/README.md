# Lesson 06 — Đạo hàm riêng (Partial Derivative) và Gradient

> "Đạo hàm 1 biến cho ta slope của đường cong. Đạo hàm riêng cho ta slope của một MẶT khi cắt mặt đó bằng một plane. Gradient gom các slope đó thành một VECTOR — và vector này chỉ chính xác hướng mà hàm tăng nhanh nhất. Đây là viên gạch nền móng của mọi thuật toán học máy hiện đại."

---

## 1. Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **hàm nhiều biến** $f(x, y)$, $f(x, y, z)$, ..., $f(x_1, \ldots, x_n)$ — đồ thị là một MẶT hoặc một vật trừu tượng trong không gian cao chiều.
- Tính được **đạo hàm riêng** $\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$ của một hàm 2-3 biến bất kỳ — coi các biến còn lại như HẰNG SỐ, áp dụng các quy tắc đã học (power, product, chain) từ Lesson 03-04.
- Hiểu **gradient** $\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \ldots\right)$ là một vector — và 3 tính chất then chốt: chỉ hướng tăng nhanh nhất, vuông góc với đường mức, độ lớn = tốc độ thay đổi cực đại.
- Áp dụng **chain rule nhiều biến** khi các biến của f phụ thuộc thêm vào một tham số khác ($x = x(t), y = y(t) \to \frac{dz}{dt}$).
- Tính **đạo hàm hướng** $D_{\hat{u}} f = \nabla f \cdot \hat{u}$ (dot product với vector đơn vị), thấy được vì sao gradient là hướng max.
- Biết về **Hessian** — ma trận đạo hàm cấp 2 — và định lý Schwarz $f_{xy} = f_{yx}$.
- Hiểu LIÊN HỆ trực tiếp với học máy: loss function $L(W_1, b_1, W_2, b_2, \ldots)$ của một mạng nơ-ron là hàm hàng triệu biến; backpropagation chính là thuật toán tính $\nabla L$; gradient descent cập nhật tham số theo $-\nabla L$.

### Kiến thức tiền đề

- [Lesson 02 — Đạo hàm](../lesson-02-derivatives/) — định nghĩa giới hạn của đạo hàm 1 biến, slope của tiếp tuyến.
- [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — power, sum, product, quotient rule.
- [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — $(f(g(x)))' = f'(g(x)) \cdot g'(x)$. **Cực kỳ quan trọng** cho bài này vì đạo hàm riêng của hàm hợp xuất hiện khắp nơi.
- [Lesson 05 — Tối ưu hóa 1 biến](../lesson-05-optimization-1d/) — $f'(x) = 0$ ở cực trị. Bài này tổng quát hóa lên $\nabla f = 0$.
- (Khuyến nghị) Vectors/Algebra — vector, dot product. Gradient là một vector và đạo hàm hướng là một dot product.

---

## 2. Trực giác hàm nhiều biến

Cho đến Lesson 05, mọi hàm đều có dạng $y = f(x)$ — một biến đầu vào, một biến đầu ra, đồ thị là đường cong trên mặt phẳng $(x, y)$. Thực tế gần như mọi bài toán đều **nhiều biến**:

- Lương dự đoán của một người = $f(\text{số năm kinh nghiệm}, \text{mức độ học vấn}, \text{thành phố})$ — 3 biến đầu vào.
- Doanh thu một cửa hàng = $f(\text{giá bán}, \text{chi phí quảng cáo}, \text{mùa})$ — 3 biến.
- Loss của một mạng nơ-ron đơn giản = $L(W_1, b_1, W_2, b_2)$ — 4 ma trận/vector biến (mỗi cái nhiều phần tử).
- Loss của GPT-3 = $L(\theta)$ với $\theta \in \mathbb{R}^{175 \cdot 10^9}$ — 175 tỉ biến.

### 2.1. Ví dụ 1 — Hàm `f(x, y) = x² + y²` (bát úp ngược, hay đúng hơn — bát)

Với mỗi cặp $(x, y)$ ta tính một số $z = x^2 + y^2$. Vẽ điểm $(x, y, z)$ trong không gian 3D thì được một MẶT (surface):

```
                 z
                 │     ___,---'''---,___
                 │  ,-'                 '-,
                 │,'                       ',
                 ┼─────────────────────────────►  x
                /│
               / │
              y  │
                 ▼
```

Hình dạng: như một cái **bát** mở miệng lên. Tại $(0, 0)$ đáy bát, $z = 0$. Càng xa gốc theo bất kỳ hướng nào, $z$ càng lớn.

Để **nhìn 2D**, ta cắt mặt bằng các plane ngang $z = \text{const}$:

- $z = 1$: $x^2 + y^2 = 1$ — đường tròn bán kính 1.
- $z = 4$: $x^2 + y^2 = 4$ — đường tròn bán kính 2.
- $z = 9$: $x^2 + y^2 = 9$ — đường tròn bán kính 3.

Các đường này gọi là **đường mức (contour / level curve)** — giống đường đồng mức trên bản đồ địa hình. Bản đồ 2D với contour cho ta hình dung mặt 3D mà không cần vẽ 3D:

```
y
3│     . . . . .
2│  ,-'         '-,
1│ /     ___       \    contour z=1 (vòng tròn nhỏ nhất)
0├─┤ ( · ) ├─┼──►x       contour z=4 (vòng giữa)
-1│ \   '''       /     contour z=9 (vòng ngoài)
-2│  '-,         ,-'
-3│     ' ' ' ' '
```

> **💡 Trực giác:** Đồ thị $f(x, y) = x^2 + y^2$ là một địa hình hình bát. Tại đáy $(0,0)$ cao độ 0, càng đi ra càng lên cao. Đường mức = đường đồng mức bản đồ.

### 2.2. Ví dụ 2 — Hàm `f(x, y) = sin(x)·cos(y)` (sóng 2 chiều)

Đây là một mặt **lượn sóng**, có đỉnh và hố xen kẽ giống lưới trứng:

```
peak  hố   peak  hố
  ⌒    ⌣    ⌒    ⌣
  ⌣    ⌒    ⌣    ⌒
peak  hố   peak  hố
```

- Tại $(\pi/2, 0)$: $\sin(\pi/2) \cdot \cos(0) = 1 \cdot 1 = 1$ → đỉnh.
- Tại $(\pi/2, \pi)$: $\sin(\pi/2) \cdot \cos(\pi) = 1 \cdot (-1) = -1$ → hố.
- Tại $(0, 0)$: $\sin(0) \cdot \cos(0) = 0$ → điểm yên ngựa (saddle) hoặc trên đường mức 0.

### 2.3. Ví dụ 3 — Hàm `f(x, y) = xy` (mặt yên ngựa)

Tại $(0, 0)$: $f = 0$. Đi theo trục x dương + y dương → $f > 0$. Đi theo x dương + y âm → $f < 0$. Mặt này có hình **yên ngựa** (saddle): ngồi lên thì 2 chân (theo trục $x+y$ và $x-y$) đi xuống, còn 2 hướng vuông góc đi lên.

### 2.4. Tổng quát n biến

Khi $n = 1$: đồ thị là đường cong trong $\mathbb{R}^2$.
Khi $n = 2$: đồ thị là mặt trong $\mathbb{R}^3$.
Khi $n = 3$: đồ thị là một "siêu mặt" trong $\mathbb{R}^4$ — không hình dung trực quan được, nhưng toán học và đại số học vẫn xử lý được giống y như 2 biến.
Khi $n$ lớn (như 175 tỉ tham số của GPT-3): hoàn toàn trừu tượng — chỉ thao tác qua công thức, không có hình. Nhưng các tính chất chính (đạo hàm riêng, gradient, ...) **giống y hệt**.

> **❓ Câu hỏi tự nhiên:** "Nếu không vẽ được, làm sao biết đang đi đúng hướng?"
> Trả lời: Chính là vai trò của gradient. Gradient là một CON SỐ (đúng hơn, một vector) mà ta tính được bằng công thức — nó nói cho ta hướng đi mà không cần "nhìn". Như khi đi trong sương mù trên đồi: nhìn dưới chân thấy độ dốc theo từng hướng, chọn hướng dốc nhất để xuống — không cần thấy đỉnh đồi hay đường chân trời.

---

## 3. Đạo hàm riêng (Partial Derivative)

### 3.1. Ý tưởng

Hàm $f(x, y)$ có HAI hướng đi từ một điểm $(a, b)$: theo trục x, hoặc theo trục y. Mỗi hướng cho một tốc độ thay đổi khác nhau.

> **💡 Analogy đời sống:** Bạn đang đứng trên một sườn đồi. Nếu bước về phía Đông (trục x), độ dốc là 0.3 (dốc nhẹ). Nếu bước về phía Bắc (trục y), độ dốc là -0.5 (đi xuống). Hai con số này = **đạo hàm riêng** theo từng trục.

### 3.2. Định nghĩa hình thức

$$\frac{\partial f}{\partial x}(a, b) = \lim_{h \to 0} \frac{f(a+h, b) - f(a, b)}{h}$$

$$\frac{\partial f}{\partial y}(a, b) = \lim_{h \to 0} \frac{f(a, b+h) - f(a, b)}{h}$$

Lưu ý KHÁC BIỆT với đạo hàm 1 biến: chỉ có biến $x$ thay đổi ($a+h$), biến $y = b$ giữ NGUYÊN. Tương tự với $\frac{\partial f}{\partial y}$: $x = a$ cố định.

### 3.3. Quy tắc tính thực hành: "coi biến kia như HẰNG SỐ"

Đây là kỹ thuật chủ đạo. Để tính $\frac{\partial f}{\partial x}$:
1. Coi $y$ như một hằng số (như số 3, số 7, ...).
2. Tính đạo hàm thường theo $x$ bằng các quy tắc Lesson 03 (power, product, chain).

Cụ thể, với $f(x, y) = x^2 \cdot y^3$ (trong đó $x$ là biến, $y^3$ là hằng số $c$):

$$\frac{\partial f}{\partial x} = 2x \cdot c = 2x \cdot y^3 \qquad \text{(áp dụng } (x^2)' = 2x \text{; nhân với hằng số } c = y^3 \text{)}$$

Để tính $\frac{\partial f}{\partial y}$: ngược lại — coi $x$ như hằng số $c$:

$$\frac{\partial f}{\partial y} = c \cdot 3y^2 = x^2 \cdot 3y^2 = 3x^2 y^2$$

### 3.4. Notation (ký hiệu)

Nhiều cách viết, tất cả đều chỉ cùng một thứ:

| Ký hiệu | Đọc |
|---------|-----|
| $\frac{\partial f}{\partial x}$ | "đạo hàm riêng của f theo x" — chuẩn nhất |
| $f_x$ | "f sub x" — ngắn gọn |
| $\partial_x f$ | "del x của f" — phong cách vật lý |
| $D_x f$ | "D theo x" — phong cách Bourbaki/Pháp |
| $\frac{\partial f}{\partial x}\big|_{(a,b)}$ hoặc $f_x(a, b)$ | giá trị cụ thể tại điểm $(a,b)$ |

Ký hiệu $\partial$ đọc là "del" hoặc "partial". KHÔNG phải $d$. Khác với đạo hàm thường $\frac{df}{dx}$ (dùng $d$), đạo hàm riêng dùng $\partial$ để nhấn mạnh "có nhiều biến, chỉ lấy đạo hàm theo MỘT biến".

> **⚠ Lỗi thường gặp #1:** Viết $\frac{df}{dx}$ thay vì $\frac{\partial f}{\partial x}$ cho hàm nhiều biến. Sai vì với hàm nhiều biến, $df$ (vi phân toàn phần) phải gộp tất cả thay đổi của các biến, không chỉ x. Phải dùng $\partial$.

> **⚠ Lỗi thường gặp #2:** Quên rằng "biến kia là hằng số". Ví dụ tính $\frac{\partial}{\partial x}(x^2 y)$: nhiều bạn viết $2x + x^2 \cdot \frac{dy}{dx} = 2x$ (bỏ $x^2$) — sai. Đúng phải là $2x \cdot y$ vì y chỉ là hằng số $c$, không bị đạo hàm.

---

## 4. Walk-through tính đạo hàm riêng (≥5 ví dụ)

### Ví dụ 4.1 — `f(x, y) = x² + 3xy + y²`

**Tính $\frac{\partial f}{\partial x}$** (coi y là hằng):
- $\frac{\partial}{\partial x}(x^2) = 2x$.
- $\frac{\partial}{\partial x}(3xy) = 3y$ (vì $3x \cdot y$ có dạng $c \cdot x$ với $c = 3y$).
- $\frac{\partial}{\partial x}(y^2) = 0$ (hằng số).

Cộng lại: $\frac{\partial f}{\partial x} = 2x + 3y$.

**Tính $\frac{\partial f}{\partial y}$** (coi x là hằng):
- $\frac{\partial}{\partial y}(x^2) = 0$.
- $\frac{\partial}{\partial y}(3xy) = 3x$ (vì $3y \cdot x$ có dạng $c \cdot y$ với $c = 3x$).
- $\frac{\partial}{\partial y}(y^2) = 2y$.

Cộng lại: $\frac{\partial f}{\partial y} = 3x + 2y$.

**Kiểm tra bằng số tại $(1, 2)$**: $f(1, 2) = 1 + 6 + 4 = 11$. Thử thay đổi nhỏ:
- $f(1.01, 2) - f(1, 2) = (1.0201 + 6.06 + 4) - 11 = 11.0801 - 11 = 0.0801$. Tốc độ $\approx 0.0801/0.01 = 8.01$. So với công thức $\frac{\partial f}{\partial x}\big|_{(1,2)} = 2 \cdot 1 + 3 \cdot 2 = 8$. ✓
- $f(1, 2.01) = 1 + 3 \cdot 1 \cdot 2.01 + 2.01^2 = 1 + 6.03 + 4.0401 = 11.0701$. Tốc độ $\approx 0.0701/0.01 = 7.01$. So với $\frac{\partial f}{\partial y}\big|_{(1,2)} = 3 \cdot 1 + 2 \cdot 2 = 7$. ✓

### Ví dụ 4.2 — `f(x, y) = sin(xy)`

Đây là hàm hợp $\sin(u)$ với $u = xy$. Dùng chain rule (Lesson 04): $\frac{\partial}{\partial x}\sin(u) = \cos(u) \cdot \frac{\partial u}{\partial x}$.

**Tính $\frac{\partial f}{\partial x}$**:
- $u = xy$, coi y là hằng → $\frac{\partial u}{\partial x} = y$.
- $\frac{\partial f}{\partial x} = \cos(xy) \cdot y = y \cos(xy)$.

**Tính $\frac{\partial f}{\partial y}$**:
- Coi x là hằng → $\frac{\partial u}{\partial y} = x$.
- $\frac{\partial f}{\partial y} = \cos(xy) \cdot x = x \cos(xy)$.

**Kiểm tra tại $(\pi/2, 1)$**: $f = \sin(\pi/2 \cdot 1) = 1$. $\frac{\partial f}{\partial x} = 1 \cdot \cos(\pi/2) = 0$. Tức là tại điểm này, di chuyển theo trục x, hàm KHÔNG đổi (đỉnh đồi theo trục x). Hợp lý vì $\sin$ đạt đỉnh tại $\pi/2$.

### Ví dụ 4.3 — `f(x, y) = e^(x + y²)`

Hàm hợp $e^u$ với $u = x + y^2$.

**Tính $\frac{\partial f}{\partial x}$**:
- $\frac{\partial u}{\partial x} = 1$ ($y^2$ là hằng).
- $\frac{\partial f}{\partial x} = e^u \cdot 1 = e^{x + y^2}$.

**Tính $\frac{\partial f}{\partial y}$**:
- $\frac{\partial u}{\partial y} = 2y$ (x là hằng).
- $\frac{\partial f}{\partial y} = e^u \cdot 2y = 2y \, e^{x + y^2}$.

**Tại $(0, 1)$**: $f = e^{0 + 1} = e \approx 2.718$. $\frac{\partial f}{\partial x} = e \approx 2.718$. $\frac{\partial f}{\partial y} = 2 \cdot 1 \cdot e = 2e \approx 5.437$. Tốc độ tăng theo y nhanh gấp đôi theo x tại điểm này.

### Ví dụ 4.4 — `f(x, y, z) = x²y + y²z + z²x` (3 biến)

3 đạo hàm riêng:

**$\frac{\partial f}{\partial x}$** (coi y, z hằng):
- $\frac{\partial}{\partial x}(x^2 y) = 2xy$ (y là hệ số).
- $\frac{\partial}{\partial x}(y^2 z) = 0$ (không chứa x).
- $\frac{\partial}{\partial x}(z^2 x) = z^2$ ($z^2$ là hệ số).
- ⟹ $\frac{\partial f}{\partial x} = 2xy + z^2$.

**$\frac{\partial f}{\partial y}$** (coi x, z hằng):
- $\frac{\partial}{\partial y}(x^2 y) = x^2$.
- $\frac{\partial}{\partial y}(y^2 z) = 2yz$.
- $\frac{\partial}{\partial y}(z^2 x) = 0$.
- ⟹ $\frac{\partial f}{\partial y} = x^2 + 2yz$.

**$\frac{\partial f}{\partial z}$** (coi x, y hằng):
- $\frac{\partial}{\partial z}(x^2 y) = 0$.
- $\frac{\partial}{\partial z}(y^2 z) = y^2$.
- $\frac{\partial}{\partial z}(z^2 x) = 2zx$.
- ⟹ $\frac{\partial f}{\partial z} = y^2 + 2zx$.

**Tại $(1, 1, 1)$**: $f = 1 + 1 + 1 = 3$. $\frac{\partial f}{\partial x} = 2 + 1 = 3$. $\frac{\partial f}{\partial y} = 1 + 2 = 3$. $\frac{\partial f}{\partial z} = 1 + 2 = 3$. Đối xứng — hợp lý vì f đối xứng vòng tròn $x \to y \to z \to x$.

### Ví dụ 4.5 — `f(x₁, x₂, x₃) = (x₁ + 2x₂ + 3x₃)²` (preview NN)

Đây là dạng mà ta sẽ gặp lại liên tục trong neural network: một **weighted sum** rồi bình phương (như loss MSE đơn giản hóa).

Đặt $u = x_1 + 2x_2 + 3x_3$. Thì $f = u^2$. Áp chain rule: $\frac{\partial f}{\partial x_i} = 2u \cdot \frac{\partial u}{\partial x_i}$.

- $\frac{\partial u}{\partial x_1} = 1$ → $\frac{\partial f}{\partial x_1} = 2u \cdot 1 = 2(x_1 + 2x_2 + 3x_3)$.
- $\frac{\partial u}{\partial x_2} = 2$ → $\frac{\partial f}{\partial x_2} = 2u \cdot 2 = 4(x_1 + 2x_2 + 3x_3)$.
- $\frac{\partial u}{\partial x_3} = 3$ → $\frac{\partial f}{\partial x_3} = 2u \cdot 3 = 6(x_1 + 2x_2 + 3x_3)$.

**Tại $(1, 1, 1)$**: $u = 1 + 2 + 3 = 6$, $f = 36$. Đạo hàm: $(12, 24, 36)$. Trọng số nào lớn hơn → đạo hàm riêng theo biến đó cũng lớn hơn — điều này QUAN TRỌNG trong backprop: đầu vào nào "nặng ký" hơn thì tham số đó cập nhật mạnh hơn.

> **🔁 Dừng lại tự kiểm tra 4:**
> 1. Tính $\frac{\partial f}{\partial x}$ của $f(x, y) = x^3 + 2xy + y^3$.
> 2. Tính $\frac{\partial f}{\partial y}$ của $f(x, y) = \ln(x^2 + y^2)$.
> 3. Tính cả 2 đạo hàm riêng của $f(x, y) = x \, e^y + y \, e^x$.
>
> <details><summary>Đáp án</summary>
>
> 1. $3x^2 + 2y$.
> 2. $\frac{\partial}{\partial y}\ln(u) = \frac{1}{u} \cdot \frac{\partial u}{\partial y}$ với $u = x^2 + y^2$. $\frac{\partial u}{\partial y} = 2y$. Vậy $\frac{\partial f}{\partial y} = \frac{2y}{x^2 + y^2}$.
> 3. $\frac{\partial f}{\partial x} = e^y + y \, e^x$. $\frac{\partial f}{\partial y} = x \, e^y + e^x$.
> </details>

---

## 5. Trực giác hình học của đạo hàm riêng

Tại điểm $(a, b)$ trên mặt $z = f(x, y)$:

- **$\frac{\partial f}{\partial x}(a, b)$** = slope của đường cong thu được khi cắt mặt bằng plane $y = b$ (plane vuông góc với trục y), nhìn theo trục x. Tức là "giữ y cố định, slope theo x".
- **$\frac{\partial f}{\partial y}(a, b)$** = slope của đường cong thu được khi cắt mặt bằng plane $x = a$, nhìn theo trục y.

Mỗi đạo hàm riêng = slope của **một slice** của mặt 3D.

```
   z                      Cắt bằng plane y = b:
   │      mặt 3D           Thu được đường cong z = f(x, b)
   │     /                  ↓ slope của đường này tại x=a
   │    /     plane y=b    = ∂f/∂x (a, b)
   │   ─────────
   │        \
   │         \
   ┼──(a,b)──────── x
  /
 / y
```

### 5.1. Ví dụ cụ thể: `f(x, y) = x² + y²` tại `(2, 3)`

- Cắt bằng plane $y = 3$: đường cong là $z = x^2 + 9$. Đây là parabol theo x. Slope tại $x = 2$ là $2 \cdot 2 = 4$. ⟹ $\frac{\partial f}{\partial x}(2, 3) = 4$. Khớp với công thức $\frac{\partial f}{\partial x} = 2x = 4$ ✓.
- Cắt bằng plane $x = 2$: đường cong là $z = 4 + y^2$. Slope tại $y = 3$ là $2 \cdot 3 = 6$. ⟹ $\frac{\partial f}{\partial y}(2, 3) = 6$. Khớp ✓.

> **💡 Trực giác:** Đạo hàm riêng là "slope nếu chỉ đi theo trục đó". Đứng tại $(2, 3, 13)$ trên bát $z = x^2 + y^2$, bước về phía Đông (x++) → dốc 4. Bước về phía Bắc (y++) → dốc 6. Bắc dốc hơn → leo nhanh hơn theo y.

---

## 6. Gradient — Vector của đạo hàm riêng

### 6.1. Định nghĩa

Gradient của hàm $f(x, y)$ tại điểm $(a, b)$ là **vector** gom các đạo hàm riêng lại:

$$\nabla f(a, b) = \left( \frac{\partial f}{\partial x}(a, b), \ \frac{\partial f}{\partial y}(a, b) \right)$$

Tổng quát n biến $f(x_1, x_2, \ldots, x_n)$:

$$\nabla f = \left( \frac{\partial f}{\partial x_1}, \ \frac{\partial f}{\partial x_2}, \ \ldots, \ \frac{\partial f}{\partial x_n} \right)$$

Đây là một vector trong không gian $\mathbb{R}^n$ — cùng số chiều với KHÔNG GIAN ĐẦU VÀO, KHÔNG phải với đồ thị.

### 6.2. Ký hiệu `∇`

Ký hiệu $\nabla$ đọc là **"nabla"** hoặc **"del"**. Hình dạng tam giác ngược $\nabla$. Nhiều cách viết tương đương:

- $\nabla f$ — phổ biến nhất.
- $\text{grad } f$ — viết tắt "gradient".
- $\left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}\right)$ — viết khai triển.
- Trong machine learning: $\nabla_\theta L$ — "gradient của loss theo tham số $\theta$".

> **⚠ Lỗi thường gặp:** Nhầm $\nabla f$ là một số scalar. KHÔNG. $\nabla f$ là một VECTOR — có nhiều thành phần, mỗi thành phần là một đạo hàm riêng.

### 6.3. Ví dụ tính gradient nhanh

| Hàm | $\nabla f$ |
|-----|----|
| $f(x, y) = x^2 + y^2$ | $(2x, 2y)$ |
| $f(x, y) = xy$ | $(y, x)$ |
| $f(x, y) = 3x + 4y$ | $(3, 4)$ — hằng số |
| $f(x, y) = \sin(x)\cos(y)$ | $(\cos(x)\cos(y),\ -\sin(x)\sin(y))$ |
| $f(x, y, z) = xyz$ | $(yz, xz, xy)$ |

---

## 7. Ba tính chất then chốt của gradient

Đây là phần **quan trọng nhất** của lesson. Mọi thuật toán học máy đều dựa vào 3 tính chất sau.

### 7.1. Tính chất 1 — Gradient chỉ hướng tăng nhanh nhất

**Tuyên bố:** Tại điểm P, vector $\nabla f(P)$ chỉ ra phía mà $f$ tăng giá trị NHANH NHẤT. Ngược lại, $-\nabla f(P)$ chỉ hướng $f$ giảm nhanh nhất.

**Ví dụ trực quan:** Trên bát $z = x^2 + y^2$ tại điểm $(1, 0)$:
- $\nabla f(1, 0) = (2, 0)$ — vector chỉ thẳng theo trục x dương.
- Đi theo hướng $(2, 0)$ (về phía Đông) → z tăng. Đi ngược $(-2, 0)$ (về phía Tây) → z giảm về 0.
- Hợp lý vì $(1, 0)$ ở sườn Đông của bát, leo Đông là leo lên thành bát.

**Tại $(0, 1)$**: $\nabla f = (0, 2)$ — chỉ thẳng Bắc. Cũng là leo lên thành bát.

**Tại đáy $(0, 0)$**: $\nabla f = (0, 0)$ — vector NULL. Tức là không có hướng tăng — vì đây là CỰC TIỂU, mọi hướng đều đi lên (hoặc đứng yên theo tiếp tuyến). Khi gradient = 0, ta đang ở một **điểm dừng (stationary point)** — có thể là cực trị hoặc saddle.

**Vì sao là "nhanh nhất"?** Sẽ chứng minh ở mục 9 (đạo hàm hướng + Cauchy-Schwarz). Tạm chấp nhận và tin.

### 7.2. Tính chất 2 — Gradient vuông góc với đường mức

**Tuyên bố:** Nếu vẽ các đường mức $f = c$ (các giá trị c khác nhau), thì tại mỗi điểm P trên đường mức, vector $\nabla f(P)$ luôn **vuông góc** với đường mức tại P.

**Vì sao?** Trực giác: trên đường mức, f không đổi (theo định nghĩa). Đi DỌC đường mức thì tốc độ thay đổi của f bằng 0. Nhưng đạo hàm hướng theo hướng dọc đó = $\nabla f \cdot \hat{u} = 0$ (với $\hat{u}$ là tiếp tuyến của đường mức). Dot product = 0 ⟹ $\nabla f \perp \hat{u}$ ⟹ gradient vuông góc tiếp tuyến của đường mức ⟹ vuông góc với đường mức.

**Ví dụ:** $f(x, y) = x^2 + y^2$, đường mức $f = 1$ là vòng tròn bán kính 1. Tại điểm $(1, 0)$ trên vòng tròn, tiếp tuyến là hướng $(0, 1)$ (chiều Bắc). Gradient $\nabla f(1, 0) = (2, 0)$ — chỉ chiều Đông. Đông $\perp$ Bắc ✓.

```
 y
 │      ___
 │   ,-'   '-,
 │  /  f=1   \
 │ |     →    |   ← gradient (2,0) tại (1,0)
 │  \         /
 │   '-,___,-'
 │
 ┼─────────────► x
```

### 7.3. Tính chất 3 — Độ lớn `|∇f|` là tốc độ thay đổi cực đại

$|\nabla f(P)|$ (độ dài Euclidean của vector gradient) = tốc độ tăng theo hướng nhanh nhất.

**Ví dụ:** $f(x, y) = x^2 + y^2$ tại $(3, 4)$:
- $\nabla f = (6, 8)$.
- $|\nabla f| = \sqrt{36 + 64} = \sqrt{100} = 10$.

Tức là theo hướng $(6, 8)$ (chuẩn hóa lại thành unit vector $(0.6, 0.8)$), f tăng với tốc độ 10 đơn vị f trên 1 đơn vị di chuyển.

Theo hướng khác (không phải hướng gradient), tốc độ sẽ nhỏ hơn 10. Đặc biệt theo hướng vuông góc gradient (dọc đường mức), tốc độ = 0.

> **❓ Câu hỏi tự nhiên:** "Tại sao không chuẩn hóa gradient luôn thành vector đơn vị?"
> Trả lời: Vì độ lớn $|\nabla f|$ mang thông tin hữu ích — nó nói cho ta biết tại điểm này hàm dốc thế nào. Ở chỗ dốc (gần thành bát) $|\nabla f|$ lớn; ở chỗ phẳng (gần đáy) $|\nabla f|$ nhỏ. Trong gradient descent, ta dùng cả hướng VÀ độ lớn để quyết định bước cập nhật (Lesson 07).

---

## 8. Walk-through tính gradient (≥4 ví dụ)

### Ví dụ 8.1 — `f(x, y) = x² + y²` tại `(1, 2)`

- $\frac{\partial f}{\partial x} = 2x$, $\frac{\partial f}{\partial y} = 2y$.
- $\nabla f(1, 2) = (2, 4)$.
- $|\nabla f| = \sqrt{4 + 16} = \sqrt{20} \approx 4.47$.
- Hướng tăng nhanh nhất: vector $(2, 4)$ — chỉ về Đông-Bắc với góc $\arctan(4/2) = \arctan(2) \approx 63.4°$ trên trục x.

**Vẽ contour ASCII xung quanh `(1, 2)`:**

```
 y
4│                  f=20
3│      f=16
2│   . . • . . . .   ← điểm (1,2), f=5
1│      f=4
0├──────────────► x
   0  1  2  3
```

Tại $(1, 2)$, gradient $(2, 4)$ chỉ hướng ra ngoài (về phía contour có f lớn hơn), vuông góc với contour $f=5$ đi qua.

### Ví dụ 8.2 — `f(x, y) = xy` tại `(3, 4)`

- $\frac{\partial f}{\partial x} = y$, $\frac{\partial f}{\partial y} = x$.
- $\nabla f(3, 4) = (4, 3)$.
- $|\nabla f| = \sqrt{16 + 9} = \sqrt{25} = 5$.

Điểm $(3, 4)$ có $f = 12$. Đường mức $f = 12$ là hyperbol $xy = 12$. Gradient $(4, 3)$ vuông góc với hyperbol tại điểm này.

### Ví dụ 8.3 — `f(x, y) = e^(xy)` tại `(0, 5)`

- $u = xy$, $f = e^u$.
- $\frac{\partial f}{\partial x} = e^u \cdot y = y \, e^{xy}$.
- $\frac{\partial f}{\partial y} = e^u \cdot x = x \, e^{xy}$.
- Tại $(0, 5)$: $e^0 = 1$. $\nabla f = (5 \cdot 1, 0 \cdot 1) = (5, 0)$.
- $|\nabla f| = 5$. Gradient chỉ thẳng Đông.

Trực giác: tại $(0, 5)$, di chuyển theo y không đổi f (vì $f = e^{0 \cdot y} = 1$, không phụ thuộc y khi $x=0$). Mọi tăng trưởng đều theo x → gradient chỉ theo x.

### Ví dụ 8.4 — `f(x, y) = ln(x² + y²)` tại `(1, 1)`

- $u = x^2 + y^2$, $f = \ln(u)$.
- $\frac{\partial f}{\partial x} = \frac{1}{u} \cdot 2x = \frac{2x}{x^2 + y^2}$.
- $\frac{\partial f}{\partial y} = \frac{2y}{x^2 + y^2}$.
- Tại $(1, 1)$: $u = 2$. $\nabla f = (2/2, 2/2) = (1, 1)$.
- $|\nabla f| = \sqrt{2}$. Gradient chỉ về Đông-Bắc đúng 45°.

### Ví dụ 8.5 — Hàm 4 biến `f(w₁, w₂, w₃, w₄) = w₁² + 2w₂² + 3w₃² + 4w₄²` tại `(1, 1, 1, 1)`

- $\frac{\partial f}{\partial w_1} = 2w_1$, $\frac{\partial f}{\partial w_2} = 4w_2$, $\frac{\partial f}{\partial w_3} = 6w_3$, $\frac{\partial f}{\partial w_4} = 8w_4$.
- $\nabla f(1,1,1,1) = (2, 4, 6, 8)$.
- $|\nabla f| = \sqrt{4+16+36+64} = \sqrt{120} \approx 10.95$.

Đây là dạng "loss" đơn giản hóa của neural network: muốn $w$ về 0 (cực tiểu là $(0,0,0,0)$). Hướng đi xuống nhanh nhất là $-\nabla f = (-2, -4, -6, -8)$. Tham số $w_4$ "dốc" nhất (đạo hàm riêng = 8), nên sẽ cập nhật mạnh nhất.

---

## 9. Đạo hàm hướng (Directional Derivative)

### 9.1. Định nghĩa

Cho $f(x, y)$ và một vector đơn vị $\hat{u} = (u_1, u_2)$ (với $|\hat{u}| = 1$). **Đạo hàm hướng** của f theo hướng $\hat{u}$ tại điểm P là:

$$D_{\hat{u}} f(P) = \lim_{h \to 0} \frac{f(P + h\hat{u}) - f(P)}{h}$$

Tức là tốc độ thay đổi của f khi di chuyển theo hướng $\hat{u}$ từ P.

### 9.2. Công thức quan trọng

$$D_{\hat{u}} f = \nabla f \cdot \hat{u} \qquad \text{(dot product)}$$

Chứng minh nhanh: di chuyển $P + h\hat{u} = (a + h u_1, b + h u_2)$. Áp dụng định nghĩa đạo hàm riêng cho hàm $g(h) = f(a + h u_1, b + h u_2)$:

$$g'(0) = \frac{\partial f}{\partial x} \cdot u_1 + \frac{\partial f}{\partial y} \cdot u_2 = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}\right) \cdot (u_1, u_2) = \nabla f \cdot \hat{u}$$

(Bước này dùng chain rule nhiều biến — sẽ trở lại ở mục 10.)

### 9.3. Vì sao gradient là hướng tăng nhanh nhất — chứng minh

Với mọi hướng đơn vị $\hat{u}$, theo công thức dot product:

$$D_{\hat{u}} f = \nabla f \cdot \hat{u} = |\nabla f| \cdot |\hat{u}| \cdot \cos(\theta) = |\nabla f| \cdot \cos(\theta)$$

trong đó $\theta$ là góc giữa $\hat{u}$ và $\nabla f$.

$\cos(\theta)$ đạt max = 1 khi $\theta = 0$, tức là $\hat{u}$ cùng hướng với $\nabla f$. Khi đó:

$$D_{\hat{u}} f = |\nabla f| \qquad \text{(max)}$$

Vậy:
- Hướng tăng nhanh nhất = hướng của $\nabla f$.
- Tốc độ tăng cực đại = $|\nabla f|$.
- Hướng giảm nhanh nhất = $-\nabla f$ (góc $\theta = \pi$, $\cos = -1$, $D_{\hat{u}} f = -|\nabla f|$).
- Hướng vuông góc ($\theta = \pi/2$): $D_{\hat{u}} f = 0$ — không thay đổi → đó là tiếp tuyến của đường mức.

**Đây là lý do toàn bộ ngành tối ưu hóa và machine learning dùng gradient!**

> **💡 Trực giác:** Gradient không chỉ là "vector của đạo hàm riêng" một cách máy móc. Nó CHỦ ĐỘNG nói cho ta hướng tốt nhất để leo lên. Đảo dấu = hướng xuống nhanh nhất → cốt lõi của gradient descent.

### 9.4. Ví dụ tính

$f(x, y) = x^2 + y^2$ tại $(1, 2)$. $\nabla f = (2, 4)$, $|\nabla f| = \sqrt{20}$.

Tính đạo hàm hướng theo các hướng khác nhau:

- **Hướng $\hat{u} = (1, 0)$** (Đông): $D_{\hat{u}} f = (2,4) \cdot (1,0) = 2$.
- **Hướng $\hat{u} = (0, 1)$** (Bắc): $D_{\hat{u}} f = (2,4) \cdot (0,1) = 4$.
- **Hướng $\hat{u} = (1/\sqrt{2}, 1/\sqrt{2})$** (Đông-Bắc 45°): $D_{\hat{u}} f = 2/\sqrt{2} + 4/\sqrt{2} = 6/\sqrt{2} \approx 4.24$.
- **Hướng gradient chuẩn hóa $\hat{u} = (2/\sqrt{20}, 4/\sqrt{20}) = (1/\sqrt{5}, 2/\sqrt{5})$**: $D_{\hat{u}} f = 2/\sqrt{5} + 8/\sqrt{5} = 10/\sqrt{5} = \sqrt{20} \approx 4.47$. → đúng $|\nabla f|$ ✓.
- **Hướng vuông góc gradient $\hat{u} = (-4/\sqrt{20}, 2/\sqrt{20})$**: $D_{\hat{u}} f = -8/\sqrt{20} + 8/\sqrt{20} = 0$ → đúng (tiếp tuyến đường mức) ✓.

> **🔁 Dừng lại tự kiểm tra 9:**
> 1. Cho $f(x, y) = 3x + 4y$. Gradient là gì? $|\nabla f|$ bằng bao nhiêu? Đạo hàm hướng theo $\hat{u} = (1, 0)$ bằng bao nhiêu?
> 2. Tại sao theo hướng vuông góc với gradient, hàm không thay đổi?
>
> <details><summary>Đáp án</summary>
>
> 1. $\nabla f = (3, 4)$, $|\nabla f| = 5$. $D_{(1,0)} f = 3$. (Vì f tuyến tính, gradient không phụ thuộc điểm.)
> 2. Vì $\cos(\pi/2) = 0$ ⟹ $D_{\hat{u}} f = |\nabla f| \cdot 0 = 0$. Hình học: đó là tiếp tuyến với đường mức, mà trên đường mức f không đổi.
> </details>

---

## 10. Chain rule nhiều biến

### 10.1. Quy tắc

Nếu $z = f(x, y)$ và x, y lại phụ thuộc một biến khác $t$: $x = x(t), y = y(t)$. Thì z gián tiếp phụ thuộc t. Tốc độ thay đổi của z theo t là:

$$\frac{dz}{dt} = \frac{\partial f}{\partial x} \cdot \frac{dx}{dt} + \frac{\partial f}{\partial y} \cdot \frac{dy}{dt}$$

(Lưu ý: trong vế trái dùng $\frac{dz}{dt}$ vì z chỉ phụ thuộc 1 biến t qua các trung gian. Trong vế phải $\frac{\partial f}{\partial x}$ dùng $\partial$ vì f vốn hai biến; $\frac{dx}{dt}$ dùng $d$ vì x chỉ phụ thuộc t.)

**Liên hệ Lesson 04:** Chain rule 1 biến $(f(g(x)))' = f'(g(x)) \cdot g'(x)$ là TRƯỜNG HỢP RIÊNG khi chỉ có một đường trung gian. Ở đây có HAI đường trung gian (qua x, qua y), nên CỘNG hai contribution.

### 10.2. Ví dụ

Cho $z = x^2 + y^2$ với $x(t) = \cos(t), y(t) = \sin(t)$ (chuyển động tròn).

- $\frac{\partial f}{\partial x} = 2x = 2\cos(t)$, $\frac{\partial f}{\partial y} = 2y = 2\sin(t)$.
- $\frac{dx}{dt} = -\sin(t)$, $\frac{dy}{dt} = \cos(t)$.
- $\frac{dz}{dt} = 2\cos(t) \cdot (-\sin(t)) + 2\sin(t) \cdot \cos(t) = -2\sin(t)\cos(t) + 2\sin(t)\cos(t) = 0$.

Hợp lý: vì $\cos^2(t) + \sin^2(t) = 1$ luôn, nên $z = 1$ không đổi, đạo hàm phải bằng 0 ✓.

### 10.3. Tổng quát cho n biến

Nếu $z = f(x_1, x_2, \ldots, x_n)$ và $x_i = x_i(t)$:

$$\frac{dz}{dt} = \sum_i \frac{\partial f}{\partial x_i} \cdot \frac{dx_i}{dt} = \nabla f \cdot \frac{d\mathbf{x}}{dt}$$

— dot product giữa gradient và vector vận tốc.

### 10.4. Trường hợp nhiều biến phụ → nhiều biến đầu vào

Nếu $z = f(x, y)$, $x = x(s, t), y = y(s, t)$ (mỗi biến trung gian phụ thuộc 2 tham số):

$$\frac{\partial z}{\partial s} = \frac{\partial f}{\partial x} \cdot \frac{\partial x}{\partial s} + \frac{\partial f}{\partial y} \cdot \frac{\partial y}{\partial s}$$

$$\frac{\partial z}{\partial t} = \frac{\partial f}{\partial x} \cdot \frac{\partial x}{\partial t} + \frac{\partial f}{\partial y} \cdot \frac{\partial y}{\partial t}$$

Đây chính là CƠ SỞ TOÁN HỌC CỦA BACKPROPAGATION: gradient của loss theo tham số sâu trong mạng = tích lũy gradient qua từng layer trung gian, mỗi layer là một composition mới.

---

## 11. Đạo hàm cấp 2 và Hessian

### 11.1. Đạo hàm riêng cấp 2

Từ $\frac{\partial f}{\partial x}$ (hàm của x, y), lại có thể lấy đạo hàm riêng nữa:

- $\frac{\partial^2 f}{\partial x^2}$ = lấy $\frac{\partial}{\partial x}$ của $\frac{\partial f}{\partial x}$. Còn viết $f_{xx}$.
- $\frac{\partial^2 f}{\partial y^2}$ = lấy $\frac{\partial}{\partial y}$ của $\frac{\partial f}{\partial y}$. Viết $f_{yy}$.
- $\frac{\partial^2 f}{\partial y \, \partial x}$ = lấy $\frac{\partial}{\partial y}$ của $\frac{\partial f}{\partial x}$. Viết $f_{xy}$ (đọc từ phải qua trái theo notation $\partial y \, \partial x$).
- $\frac{\partial^2 f}{\partial x \, \partial y}$ = lấy $\frac{\partial}{\partial x}$ của $\frac{\partial f}{\partial y}$. Viết $f_{yx}$.

### 11.2. Định lý Schwarz (Clairaut)

**Nếu f đủ trơn (các đạo hàm riêng cấp 2 liên tục) thì:**

$$f_{xy} = f_{yx} \qquad \text{(thứ tự đạo hàm không quan trọng)}$$

**Ví dụ verify:** $f(x, y) = x^3 y^2$.
- $f_x = 3x^2 y^2$. $f_{xy} = \frac{\partial}{\partial y}(3x^2 y^2) = 6x^2 y$.
- $f_y = 2x^3 y$. $f_{yx} = \frac{\partial}{\partial x}(2x^3 y) = 6x^2 y$. ✓ Bằng nhau.

### 11.3. Ma trận Hessian

Gom đạo hàm cấp 2 thành ma trận:

$$H(f) = \begin{bmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{bmatrix}$$

Theo Schwarz, H đối xứng. Hessian tổng quát n biến là ma trận $n \times n$.

### 11.4. Vai trò của Hessian

Trong tối ưu hóa nhiều chiều, Hessian đóng vai trò của "đạo hàm cấp 2" trong test cực trị (Lesson 05):

- **Cực tiểu:** Hessian xác định dương (tất cả eigenvalue dương) ⟹ mọi hướng đều "cong lên".
- **Cực đại:** Hessian xác định âm.
- **Saddle (yên ngựa):** Hessian có eigenvalue cả dương và âm — vài hướng cong lên, vài hướng cong xuống.

(Phần này sẽ được khai triển kỹ ở Vectors/Algebra eigenvalues + tối ưu hóa đa biến, ngoài phạm vi lesson này.)

### 11.5. Ví dụ Hessian

$f(x, y) = x^2 + 3xy + y^2$:
- $f_x = 2x + 3y$. $f_{xx} = 2$. $f_{xy} = 3$.
- $f_y = 3x + 2y$. $f_{yy} = 2$. $f_{yx} = 3$.

Hessian:

$$H = \begin{bmatrix} 2 & 3 \\ 3 & 2 \end{bmatrix}$$

Eigenvalues: $\lambda = 2 \pm 3 = \{5, -1\}$. Hai dấu khác nhau ⟹ saddle. Hợp lý: tại $(0,0)$ hàm không phải cực trị mà là điểm yên ngựa.

---

## 12. PHẦN LỚN — Liên hệ Machine Learning / AI

### 12.1. Loss function = hàm nhiều biến

Một neural network đơn giản (1 layer ẩn) cho phân loại nhị phân:

$$\begin{aligned}
\hat{y} &= \sigma(W_2 \cdot \sigma(W_1 \cdot x + b_1) + b_2) \\
\text{Loss}(W_1, b_1, W_2, b_2) &= (\hat{y} - y_{\text{true}})^2
\end{aligned}$$

Trong đó $W_1, W_2$ là ma trận, $b_1, b_2$ là vector. Tổng cộng tham số: nếu input 784 (ảnh 28×28), hidden 128, output 1 thì:
- $W_1$: $784 \times 128 = 100\,352$.
- $b_1$: 128.
- $W_2$: $128 \times 1 = 128$.
- $b_2$: 1.
- Total: **100 609 tham số**.

Loss là một HÀM của 100 609 biến $\theta = (W_1^{(1,1)}, W_1^{(1,2)}, \ldots, b_2)$. Gradient $\nabla L$ là vector 100 609 chiều.

Với GPT-3 (175 tỉ tham số), gradient là vector $1.75 \cdot 10^{11}$ chiều. Vẫn hoạt động cùng quy tắc tính như $f(x,y)$ → chỉ là nhiều hơn.

### 12.2. Backpropagation = tính `∇L`

**Backprop** là một thuật toán hiệu quả để tính ĐỒNG THỜI tất cả đạo hàm riêng $\frac{\partial L}{\partial \theta_i}$. Cốt lõi của backprop chính là **chain rule nhiều biến** ở mục 10:

$$\frac{\partial L}{\partial W_1} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial(\text{layer2})} \cdot \frac{\partial(\text{layer2})}{\partial(\text{layer1})} \cdot \frac{\partial(\text{layer1})}{\partial W_1}$$

Mỗi factor là một Jacobian (ma trận đạo hàm riêng). Backprop tính từ ngược về (output → input) để TÁI SỬ DỤNG các tích đã tính → độ phức tạp $O(\text{số param})$ thay vì $O(\text{số param}^2)$.

Sẽ học chi tiết ở lesson Neural Network.

### 12.3. Gradient descent — đi NGƯỢC gradient

Mục tiêu: tìm $\theta^*$ sao cho $L(\theta^*)$ nhỏ nhất.

Thuật toán cơ bản: từ $\theta_0$ (random), cập nhật từng bước:

$$\theta_{k+1} = \theta_k - \eta \cdot \nabla L(\theta_k)$$

trong đó $\eta$ là **learning rate** (bước nhỏ).

**Vì sao trừ?** Vì $\nabla L$ chỉ hướng L TĂNG nhanh nhất. Ta muốn L GIẢM → đi NGƯỢC gradient = $-\nabla L$. Đó chính là tính chất 1 đã chứng minh ở mục 9.

**Vì sao có $\eta$?** Vì gradient chỉ tốt **cục bộ** — chỉ hướng đi xuống ở lân cận điểm hiện tại. Bước quá lớn có thể "phóng" qua đáy. $\eta$ nhỏ → an toàn nhưng chậm. $\eta$ lớn → nhanh nhưng có thể không hội tụ. Tinh chỉnh $\eta$ là một nghệ thuật (Lesson 07 sẽ đi sâu).

### 12.4. Mini ví dụ end-to-end

Loss đơn giản: $L(w, w') = (w - 3)^2 + (w' - 5)^2$ với 2 tham số $(w, w')$. Tối ưu rõ ràng: $(3, 5)$.

- $\nabla L = (2(w-3), 2(w'-5))$.
- Bắt đầu tại $\theta_0 = (0, 0)$. $L = 9 + 25 = 34$. $\nabla L = (-6, -10)$.
- Bước 1: $\theta_1 = (0, 0) - 0.1 \cdot (-6, -10) = (0.6, 1.0)$. $L = (0.6-3)^2 + (1-5)^2 = 5.76 + 16 = 21.76$. Giảm.
- Bước 2: $\nabla L|_{(0.6, 1)} = (-4.8, -8)$. $\theta_2 = (0.6, 1) - 0.1 \cdot (-4.8, -8) = (1.08, 1.8)$. $L = 3.69 + 10.24 = 13.93$. Tiếp tục giảm.
- ... sau ~30 bước, $\theta \approx (3, 5)$. ✓

Đây chính xác là logic training một neural network — chỉ khác là dim $\theta$ rất lớn.

### 12.5. Quan hệ với các thuật toán khác

- **SGD (stochastic gradient descent):** thay vì tính $\nabla L$ trên toàn data, dùng minibatch — gradient ước lượng. Vẫn cùng nguyên lý "đi $-\nabla L$".
- **Adam, RMSprop:** điều chỉnh $\eta$ riêng cho từng tham số dựa trên lịch sử gradient.
- **L-BFGS:** dùng cả Hessian (mục 11) để chọn bước thông minh hơn.
- **Newton's method:** $\theta_{k+1} = \theta_k - H^{-1} \cdot \nabla L$ — dùng Hessian trực tiếp. Mạnh nhưng tốn (Hessian là ma trận $n \times n$).

> **📝 Tóm tắt mục 12:**
> - Mọi loss của mọi mô hình ML đều là hàm nhiều (có khi tỉ) biến.
> - Backprop = thuật toán tính $\nabla L$ hiệu quả bằng chain rule nhiều biến.
> - Gradient descent: đi NGƯỢC gradient → giảm loss nhanh nhất.
> - Hessian (cấp 2) cho thuật toán tinh tế hơn (Newton, L-BFGS) nhưng đắt.

---

## 13. Bài tập

### Bài 13.1 (cơ bản — tính đạo hàm riêng)

Tính $\frac{\partial f}{\partial x}$ và $\frac{\partial f}{\partial y}$ của các hàm sau:

a) $f(x, y) = x^3 + xy^2 + y^3$
b) $f(x, y) = (x + y)\sin(x - y)$
c) $f(x, y) = x^2 \ln(y) + y^2 \ln(x)$
d) $f(x, y) = e^{x^2} \cos(y)$

### Bài 13.2 (gradient + ý nghĩa)

Cho $f(x, y) = x^2 - 2xy + 3y^2$.

a) Tính $\nabla f$.
b) Tính $\nabla f(1, 1)$ và $|\nabla f(1, 1)|$.
c) Tại $(1, 1)$, hàm tăng hay giảm khi di chuyển theo hướng $(1, 0)$?
d) Tìm hướng đơn vị tại $(1, 1)$ mà hàm GIẢM nhanh nhất.

### Bài 13.3 (đạo hàm hướng)

Cho $f(x, y) = \ln(x^2 + y^2)$.

a) Tính $\nabla f(1, 2)$.
b) Tính đạo hàm hướng tại $(1, 2)$ theo hướng $(3, 4)$ (lưu ý: chuẩn hóa vector trước).
c) Tại $(1, 2)$, theo hướng nào hàm KHÔNG ĐỔI?

### Bài 13.4 (chain rule nhiều biến)

Cho $z = x^2 + xy + y^2$ với $x(t) = t^2 + 1$ và $y(t) = t - 2$.

Tính $\frac{dz}{dt}$:
a) Bằng cách thay $x(t), y(t)$ vào z rồi đạo hàm theo t.
b) Bằng chain rule nhiều biến.
c) So sánh 2 kết quả.

### Bài 13.5 (Hessian)

Tính ma trận Hessian của $f(x, y) = x^2 y + y^3$ tại điểm $(1, 1)$.

### Bài 13.6 (ứng dụng ML)

Cho loss $L(w_1, w_2) = (w_1 - 2)^2 + 3(w_2 + 1)^2$.

a) Tính $\nabla L$.
b) Bắt đầu từ $(0, 0)$, áp dụng 3 bước gradient descent với $\eta = 0.1$. Trình bày từng bước.
c) Cực tiểu lý thuyết của L ở đâu? Sau 3 bước, đã đến gần chưa?

---

## 14. Lời giải chi tiết

### Lời giải 13.1

**a) $f(x, y) = x^3 + xy^2 + y^3$**
- $\frac{\partial f}{\partial x}$: coi y hằng. $\frac{\partial}{\partial x}(x^3) = 3x^2$; $\frac{\partial}{\partial x}(xy^2) = y^2$ (vì $y^2$ là hệ số); $\frac{\partial}{\partial x}(y^3) = 0$.
  ⟹ $\frac{\partial f}{\partial x} = 3x^2 + y^2$.
- $\frac{\partial f}{\partial y}$: $\frac{\partial}{\partial y}(x^3) = 0$; $\frac{\partial}{\partial y}(xy^2) = 2xy$; $\frac{\partial}{\partial y}(y^3) = 3y^2$.
  ⟹ $\frac{\partial f}{\partial y} = 2xy + 3y^2$.

**b) $f(x, y) = (x + y)\sin(x - y)$**

Đây là tích hai hàm. Dùng product rule. Coi y là hằng:
- Đặt $g = x + y$, $h = \sin(x - y)$. $g_x = 1$, $h_x = \cos(x - y) \cdot 1 = \cos(x-y)$.
- $\frac{\partial f}{\partial x} = g_x \cdot h + g \cdot h_x = \sin(x-y) + (x+y)\cos(x-y)$.

Tương tự, coi x hằng:
- $g_y = 1$, $h_y = \cos(x-y) \cdot (-1) = -\cos(x-y)$.
- $\frac{\partial f}{\partial y} = 1 \cdot \sin(x-y) + (x+y)(-\cos(x-y)) = \sin(x-y) - (x+y)\cos(x-y)$.

**c) $f(x, y) = x^2 \ln(y) + y^2 \ln(x)$**
- $\frac{\partial f}{\partial x} = 2x \ln(y) + y^2 \cdot \frac{1}{x} = 2x \ln(y) + \frac{y^2}{x}$.
- $\frac{\partial f}{\partial y} = x^2 \cdot \frac{1}{y} + 2y \ln(x) = \frac{x^2}{y} + 2y \ln(x)$.

**d) $f(x, y) = e^{x^2} \cos(y)$**
- $\frac{\partial f}{\partial x} = e^{x^2} \cdot 2x \cdot \cos(y) = 2x \, e^{x^2} \cos(y)$ (chain rule cho $e^{x^2}$).
- $\frac{\partial f}{\partial y} = e^{x^2} \cdot (-\sin(y)) = -e^{x^2} \sin(y)$.

### Lời giải 13.2

$f(x, y) = x^2 - 2xy + 3y^2$.

**a)** $\frac{\partial f}{\partial x} = 2x - 2y$. $\frac{\partial f}{\partial y} = -2x + 6y$. ⟹ $\nabla f = (2x - 2y, -2x + 6y)$.

**b)** Tại $(1, 1)$: $\nabla f = (2-2, -2+6) = (0, 4)$. $|\nabla f| = 4$.

**c)** Đạo hàm hướng theo $(1, 0)$: $D_{(1,0)} f = (0, 4) \cdot (1, 0) = 0$. Hàm KHÔNG ĐỔI theo hướng x tại điểm này (cục bộ).

**d)** Hướng giảm nhanh nhất = $-\nabla f / |\nabla f| = -(0, 4)/4 = (0, -1)$ — Nam.

### Lời giải 13.3

$f(x, y) = \ln(x^2 + y^2)$.

**a)** $\frac{\partial f}{\partial x} = \frac{2x}{x^2+y^2}$. Tại $(1, 2)$: $\frac{2}{1+4} = \frac{2}{5}$. $\frac{\partial f}{\partial y} = \frac{2y}{x^2+y^2} = \frac{4}{5}$. ⟹ $\nabla f(1, 2) = \left(\frac{2}{5}, \frac{4}{5}\right)$.

**b)** Vector $(3, 4)$ chưa chuẩn hóa. $|(3,4)| = 5$. $\hat{u} = \left(\frac{3}{5}, \frac{4}{5}\right)$.
$D_{\hat{u}} f = \frac{2}{5} \cdot \frac{3}{5} + \frac{4}{5} \cdot \frac{4}{5} = \frac{6}{25} + \frac{16}{25} = \frac{22}{25} = 0.88$.

**c)** Hướng không đổi = vuông góc với $\nabla f = \left(\frac{2}{5}, \frac{4}{5}\right)$. Vector vuông góc: $(-4, 2)$ (đổi chỗ và đổi dấu 1 thành phần). Chuẩn hóa: $|(-4, 2)| = \sqrt{20}$. Hướng đơn vị: $\left(\frac{-4}{\sqrt{20}}, \frac{2}{\sqrt{20}}\right) = \left(\frac{-2}{\sqrt{5}}, \frac{1}{\sqrt{5}}\right)$. (Hướng ngược lại $\left(\frac{2}{\sqrt{5}}, \frac{-1}{\sqrt{5}}\right)$ cũng hợp lệ.)

### Lời giải 13.4

$z = x^2 + xy + y^2$, $x = t^2 + 1$, $y = t - 2$.

**a) Thay trực tiếp:**
- $x^2 = (t^2+1)^2 = t^4 + 2t^2 + 1$.
- $xy = (t^2+1)(t-2) = t^3 - 2t^2 + t - 2$.
- $y^2 = (t-2)^2 = t^2 - 4t + 4$.
- $z(t) = t^4 + 2t^2 + 1 + t^3 - 2t^2 + t - 2 + t^2 - 4t + 4 = t^4 + t^3 + t^2 - 3t + 3$.
- $\frac{dz}{dt} = 4t^3 + 3t^2 + 2t - 3$.

**b) Chain rule:**
- $\frac{\partial z}{\partial x} = 2x + y$. $\frac{\partial z}{\partial y} = x + 2y$.
- $\frac{dx}{dt} = 2t$. $\frac{dy}{dt} = 1$.
- $\frac{dz}{dt} = (2x + y) \cdot 2t + (x + 2y) \cdot 1$.
- Thay:

$$\begin{aligned}
\frac{dz}{dt} &= (2(t^2+1) + (t-2)) \cdot 2t + ((t^2+1) + 2(t-2)) \\
&= (2t^2 + 2 + t - 2) \cdot 2t + (t^2 + 1 + 2t - 4) \\
&= (2t^2 + t) \cdot 2t + (t^2 + 2t - 3) \\
&= 4t^3 + 2t^2 + t^2 + 2t - 3 = 4t^3 + 3t^2 + 2t - 3
\end{aligned}$$

**c) ✓ Khớp.** Chain rule cho cùng kết quả mà không cần khai triển trước.

### Lời giải 13.5

$f(x, y) = x^2 y + y^3$.

- $f_x = 2xy$. $f_{xx} = 2y$. $f_{xy} = 2x$.
- $f_y = x^2 + 3y^2$. $f_{yy} = 6y$. $f_{yx} = 2x$ ✓ (= $f_{xy}$, đối xứng).

Hessian tại $(1, 1)$:

$$H(1, 1) = \begin{bmatrix} 2 & 2 \\ 2 & 6 \end{bmatrix}$$

Eigenvalues: $\det(H - \lambda I) = (2-\lambda)(6-\lambda) - 4 = \lambda^2 - 8\lambda + 8 = 0$. $\lambda = \frac{8 \pm \sqrt{32}}{2} = 4 \pm 2\sqrt{2}$. Cả 2 dương ⟹ Hessian xác định dương ⟹ tại $(1, 1)$ mặt cong lên theo mọi hướng (nhưng $(1,1)$ chưa hẳn là cực tiểu vì $\nabla f(1,1) = (2, 4) \neq 0$).

### Lời giải 13.6

$L(w_1, w_2) = (w_1 - 2)^2 + 3(w_2 + 1)^2$.

**a)** $\frac{\partial L}{\partial w_1} = 2(w_1 - 2)$. $\frac{\partial L}{\partial w_2} = 6(w_2 + 1)$. ⟹ $\nabla L = (2(w_1-2), 6(w_2+1))$.

**b)** Gradient descent từ $(0, 0)$, $\eta = 0.1$:

| Bước | $(w_1, w_2)$ | $L$ | $\nabla L$ | Bước cập nhật |
|------|----------|---|-----|---------------|
| 0 | $(0, 0)$ | $4 + 3 = 7$ | $(-4, 6)$ | $-\eta \nabla L = (0.4, -0.6)$ |
| 1 | $(0.4, -0.6)$ | $(-1.6)^2 + 3(0.4)^2 = 2.56 + 0.48 = 3.04$ | $(2(-1.6), 6 \cdot 0.4) = (-3.2, 2.4)$ | $(0.32, -0.24)$ |
| 2 | $(0.72, -0.84)$ | $(-1.28)^2 + 3(0.16)^2 = 1.6384 + 0.0768 = 1.7152$ | $(-2.56, 0.96)$ | $(0.256, -0.096)$ |
| 3 | $(0.976, -0.936)$ | $(-1.024)^2 + 3(0.064)^2 = 1.0486 + 0.0123 = 1.0609$ | ... | ... |

**c)** Cực tiểu lý thuyết: $\nabla L = 0 \iff w_1 = 2, w_2 = -1$. Sau 3 bước, ta ở $(0.976, -0.936)$ — chưa đến đích nhưng đang đi đúng hướng. L giảm từ 7 → 1.06. Sau ~30 bước sẽ rất gần $(2, -1)$.

> Để ý: $w_2$ hội tụ nhanh hơn $w_1$ (đã gần -1 sau 3 bước, trong khi $w_1$ mới 0.976/2). Vì sao? Vì $\frac{\partial L}{\partial w_2}$ có hệ số 6, lớn hơn $\frac{\partial L}{\partial w_1}$ (hệ số 2) → cập nhật mạnh hơn. Đây là lý do người ta phát minh các optimizer như Adam — để cân bằng tốc độ học giữa các tham số.

---

## 15. Tổng kết

> **📝 Tóm tắt cả bài:**
> - **Hàm nhiều biến:** đầu vào $(x, y, \ldots)$, đầu ra một số. Đồ thị = mặt (2 biến) hoặc trừu tượng (n biến).
> - **Đạo hàm riêng $\frac{\partial f}{\partial x}$:** đạo hàm theo x, coi các biến khác như hằng số. Quy tắc Lesson 03 áp dụng nguyên vẹn.
> - **Gradient $\nabla f$ = vector** gồm tất cả đạo hàm riêng. 3 tính chất:
>   1. Chỉ hướng tăng nhanh nhất; $-\nabla f$ chỉ hướng giảm nhanh nhất.
>   2. Vuông góc với đường mức.
>   3. Độ lớn $|\nabla f|$ = tốc độ thay đổi cực đại.
> - **Đạo hàm hướng:** $D_{\hat{u}} f = \nabla f \cdot \hat{u}$. Cauchy-Schwarz → max khi $\hat{u}$ cùng hướng $\nabla f$.
> - **Chain rule nhiều biến:** $\frac{dz}{dt} = \sum \frac{\partial f}{\partial x_i} \cdot \frac{dx_i}{dt}$. Cơ sở toán của backpropagation.
> - **Hessian:** ma trận đạo hàm cấp 2, đối xứng (Schwarz). Dùng cho test cực trị và Newton's method.
> - **ML:** loss là hàm nhiều biến → backprop tính $\nabla L$ → gradient descent đi $-\nabla L$.

### File trong lesson

- [README.md](./README.md) — file này.
- [visualization.html](./visualization.html) — minh họa tương tác: contour, gradient vector, gradient field, directional derivative.

### Lesson tiếp theo

➡️ [Lesson 07 — Gradient descent](../lesson-07-gradient-descent/) — biến trực giác "đi ngược gradient" thành thuật toán cụ thể; learning rate; convergence; bài toán saddle và momentum.

### Tham khảo

- Strang, "Calculus" Ch.13-14.
- Stewart, "Multivariable Calculus" Ch.14.
- 3Blue1Brown — "Gradient and directional derivative" (YouTube).
- Goodfellow et al., "Deep Learning" Ch.4 — Numerical computation, gradient-based optimization.
