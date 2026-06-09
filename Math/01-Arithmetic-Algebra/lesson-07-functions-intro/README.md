# Lesson 07 — Hàm số

## Mục tiêu

- Hiểu **hàm số** là gì — gán mỗi input một output duy nhất.
- Biết các khái niệm: **tập xác định (domain)**, **tập giá trị (range)**, **hàm hợp**.
- Đọc và vẽ **đồ thị** hàm số.
- Phân biệt hàm **đơn ánh**, **toàn ánh**, **song ánh**.
- Nhận biết **hàm chẵn/lẻ** (đối xứng) và **hàm từng khúc (piecewise)**.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Hàm số

### 1.1. Định nghĩa

**Hàm số** = quy tắc gán **mỗi giá trị x trong tập A** với **đúng MỘT giá trị y trong tập B**.

Viết: $f: A \to B$, $y = f(x)$.

💡 **Là gì**: hàm số như một "cái máy" — bỏ input x vào → ra output y duy nhất.

**Vì sao quan trọng?** Vì:
- Hàm số mô hình hóa **mọi quan hệ** trong khoa học: lực phụ thuộc khối lượng, tốc độ phụ thuộc thời gian...
- Là **đối tượng nghiên cứu chính** của giải tích (đạo hàm, tích phân của hàm).
- Là **building block** của lập trình.

### 1.2. Các khái niệm

- **Tập xác định D (domain)**: tập các x mà $f(x)$ có nghĩa.
- **Tập giá trị E (range)**: tập các y có thể nhận được.
- Vd $f(x) = \sqrt{x}$: $D = [0, +\infty)$, $E = [0, +\infty)$.
- Vd $g(x) = 1/x$: $D = \mathbb{R}\setminus\{0\}$, $E = \mathbb{R}\setminus\{0\}$.

### 1.3. Hàm hợp

**$(f\circ g)(x) = f(g(x))$**: áp dụng g trước, rồi f.

Ví dụ: $f(x) = x^2$, $g(x) = x + 1$. 
- $(f\circ g)(x) = f(g(x)) = (x+1)^2$.
- $(g\circ f)(x) = g(f(x)) = x^2 + 1$.

Lưu ý: **$f\circ g \neq g\circ f$** thường.

⚠ **Lỗi thường gặp khi tìm tập xác định**: chú ý 2 trường hợp làm biểu thức "vô nghĩa": **mẫu = 0** (vd $1/x$ cần $x\neq 0$) và **căn bậc chẵn của số âm** (vd $\sqrt{x}$ cần $x\ge 0$). Bỏ sót điều kiện này là lỗi phổ biến nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mỗi x chỉ được 1 y? Quan hệ 1-nhiều thì sao?"* Quan hệ 1 x → nhiều y **không phải hàm số** (vd $x^2 + y^2 = 1$). Tính "duy nhất" của output là điều kiện cốt lõi để gọi là hàm.
- *"$(f\circ g)$ và $(g\circ f)$ có bao giờ bằng nhau không?"* Có, trường hợp đặc biệt — ví dụ khi $g = f^{-1}$ thì cả hai bằng $x$. Nhưng nói chung khác nhau.

🔁 **Dừng lại tự kiểm tra**: cho $f(x) = 2x$, $g(x) = x+3$. Tính $(f\circ g)(1)$ và $(g\circ f)(1)$.

<details><summary>Đáp án</summary>

$(f\circ g)(1) = f(4) = 8$; $(g\circ f)(1) = g(2) = 5$. Khác nhau → $f\circ g \neq g\circ f$.

</details>

### 📝 Tóm tắt mục 1

- Hàm số: mỗi $x$ ↔ **đúng 1** $y$. $f: A \to B$, $y = f(x)$.
- Domain D = các x hợp lệ (tránh chia 0, căn số âm); Range E = các y nhận được.
- Hàm hợp $(f\circ g)(x) = f(g(x))$; thường $f\circ g \neq g\circ f$.

---

## 2. Đồ thị hàm số

### 2.1. Khái niệm

**Đồ thị f** = tập các điểm $(x, f(x))$ trên mặt phẳng Oxy.

💡 **Là gì**: cách "vẽ" hàm số để thấy hành vi.

### 2.2. Test đường thẳng đứng

Một đường cong trên mặt phẳng là đồ thị của 1 hàm số $\iff$ **mọi đường thẳng đứng cắt nó tại tối đa 1 điểm**.

- Đường thẳng $y = x$: hàm. ✓
- Parabol $y = x^2$: hàm. ✓
- Đường tròn $x^2 + y^2 = 1$: KHÔNG phải hàm (vì 1 x có thể cho 2 y).

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao 'đường thẳng đứng' lại là phép thử?"* Vì đường thẳng đứng $x = c$ gom tất cả các điểm có **cùng** $x = c$. Nếu nó cắt đồ thị ở 2 điểm → có 2 giá trị y cho cùng 1 x → vi phạm tính "duy nhất" → không phải hàm.

🔁 **Dừng lại tự kiểm tra**: parabol nằm ngang $x = y^2$ có phải đồ thị hàm $y = f(x)$ không?

<details><summary>Đáp án</summary>

**Không**. Vd $x=4$ cho $y=2$ và $y=-2$ → đường thẳng đứng cắt 2 điểm.

</details>

### 📝 Tóm tắt mục 2

- Đồ thị f = tập điểm $(x, f(x))$ trên Oxy.
- **Test đường thẳng đứng**: cắt tối đa 1 điểm $\iff$ là đồ thị hàm số.

---

## 3. Đơn / Toàn / Song ánh

- **Đơn ánh (injective)**: mọi x khác nhau → y khác nhau. (Không có 2 input cho cùng output.)
- **Toàn ánh (surjective)**: mọi y trong tập đích đều đạt được.
- **Song ánh (bijective)**: vừa đơn vừa toàn → có **hàm ngược** $f^{-1}$.

Ví dụ:
- $f(x) = x^2$: KHÔNG đơn ánh (vì $f(2) = f(-2) = 4$).
- $f(x) = x^3$: song ánh.
- $f(x) = e^x$ (từ $\mathbb{R} \to (0,\infty)$): song ánh, hàm ngược là $\ln(x)$.

💡 **Trực giác**: **đơn ánh** = "không đụng hàng" (không 2 input ra cùng output); **toàn ánh** = "phủ kín" (mọi output đều có người chọn); **song ánh** = vừa không đụng hàng vừa phủ kín → ghép cặp 1-1 hoàn hảo → đảo ngược được.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ song ánh mới có hàm ngược?"* Vì hàm ngược phải gửi mỗi $y$ về **đúng 1** $x$. Nếu không đơn ánh, 1 $y$ ứng 2 $x$ → không biết về cái nào. Nếu không toàn ánh, có $y$ không có $x$ → không định nghĩa được.
- *"$x^2$ không đơn ánh, vậy nó vô dụng?"* Không — chỉ cần **thu hẹp miền** về $[0,\infty)$ thì $x^2$ thành đơn ánh, có ngược là $\sqrt{x}$. Đó là lý do $\sqrt{\phantom{x}}$ định nghĩa cho $x\ge 0$.

🔁 **Dừng lại tự kiểm tra**: $f(x) = 2x + 1$ có song ánh không? Hàm ngược?

<details><summary>Đáp án</summary>

Có (mọi hàm bậc 1 với $a\neq 0$ đều song ánh). Ngược: $y = 2x+1 \to x = (y-1)/2 \to f^{-1}(x) = (x-1)/2$.

</details>

### 📝 Tóm tắt mục 3

- Đơn ánh (input khác → output khác), toàn ánh (phủ hết đích), song ánh (cả hai).
- Chỉ **song ánh** mới có hàm ngược $f^{-1}$.
- Hàm không đơn ánh có thể "cứu" bằng cách thu hẹp miền.

---

## 4. Hàm chẵn, hàm lẻ & hàm từng khúc

### 4.1. Hàm chẵn / hàm lẻ

💡 **Trực giác**: đây là 2 kiểu **đối xứng** của đồ thị.
- **Hàm chẵn**: $f(-x) = f(x)$ với mọi x → đồ thị **đối xứng qua trục y** (như soi gương). Vd $f(x)=x^2$: $f(-3)=9=f(3)$ ✓.
- **Hàm lẻ**: $f(-x) = -f(x)$ → đồ thị **đối xứng qua gốc O** (quay 180°). Vd $f(x)=x^3$: $f(-2)=-8=-f(2)$ ✓.
- Đa số hàm **không chẵn cũng không lẻ**. Vd $f(x)=x+1$: $f(-1)=0$, nhưng $f(1)=2$ và $-f(1)=-2$ → không thỏa cả hai.

⚠ **Lỗi thường gặp**: tưởng "không chẵn thì phải lẻ". Sai — phần lớn hàm chẳng thuộc loại nào.

### 4.2. Hàm từng khúc (piecewise)

💡 **Là gì**: hàm dùng **công thức khác nhau trên các khoảng khác nhau** của x. Ví dụ kinh điển — trị tuyệt đối:

$$|x| = \begin{cases} x & \text{nếu } x \ge 0 \\ -x & \text{nếu } x < 0 \end{cases}$$

Tính $|-4|$: vì $-4 < 0$ → dùng nhánh $-x$ → $-(-4) = 4$.

**Ví dụ giá điện bậc thang** (đời sống): 

$$\text{giá} = \begin{cases} 1500\cdot x & \text{nếu } x \le 50 \ (\text{kWh}) \\ 75000 + 2500\cdot(x-50) & \text{nếu } x > 50 \end{cases}$$

Dùng 100 kWh: $x>50$ → $75000 + 2500\cdot 50 = 200000$ đồng.

❓ **Câu hỏi tự nhiên của người đọc**: *"Hàm từng khúc có còn là 'một hàm' không?"* Có — vẫn mỗi x cho đúng 1 y, chỉ là quy tắc tính đổi theo vùng. Test đường thẳng đứng vẫn qua.

🔁 **Dừng lại tự kiểm tra**: $f(x)=x^2$ chẵn hay lẻ? Còn $f(x)=x^3-x$?

<details><summary>Đáp án</summary>

$x^2$ **chẵn** ($(-x)^2=x^2$). $x^3-x$ **lẻ**: $f(-x)=-x^3+x = -(x^3-x) = -f(x)$.

</details>

### 📝 Tóm tắt mục 4

- Hàm chẵn: $f(-x)=f(x)$ (đối xứng trục y); hàm lẻ: $f(-x)=-f(x)$ (đối xứng gốc O).
- Đa số hàm không chẵn không lẻ.
- Hàm từng khúc: đổi công thức theo khoảng x; $|x|$ là ví dụ chuẩn.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tìm tập xác định:
a) $f(x) = \sqrt{x - 3}$.
b) $g(x) = 1/(x^2 - 4)$.

**Bài 2**: Cho $f(x) = 2x + 1$, $g(x) = x^2$. Tính $(f\circ g)(2)$ và $(g\circ f)(2)$.

**Bài 3**: $y = x^3$ có là hàm số không? Vẽ phác họa.

**Bài 4**: Đường tròn $x^2 + y^2 = 4$ có là hàm số $y = f(x)$ không?

**Bài 5**: $f(x) = 3x - 5$. Tính hàm ngược $f^{-1}(x)$.

**Bài 6**: Xét tính chẵn/lẻ: a) $f(x) = x^4 - 2$, b) $g(x) = x^3 + x$.

**Bài 7**: Cho hàm từng khúc $f(x) = x+1$ nếu $x \ge 0$, $f(x) = -x$ nếu $x < 0$. Tính $f(2)$ và $f(-3)$.

### Lời giải

**Bài 1**: 
a) $x - 3 \ge 0$ → **$D = [3, +\infty)$**.
b) $x^2 \neq 4$ → $x \neq \pm 2$ → **$D = \mathbb{R} \setminus \{-2, 2\}$**.

**Bài 2**: 
- $g(2) = 4$. $f(4) = 9$. → $(f\circ g)(2) = 9$.
- $f(2) = 5$. $g(5) = 25$. → $(g\circ f)(2) = 25$.

**Bài 3**: $y = x^3$ là hàm số (mỗi x cho 1 y). Đồ thị S-shape qua O, đối xứng qua O.

**Bài 4**: Đường tròn $x = 0$, $y = \pm 2$ → 1 x cho 2 y → KHÔNG phải hàm. Phải tách: $y = \sqrt{4-x^2}$ hoặc $y = -\sqrt{4-x^2}$.

**Bài 5**: $y = 3x - 5 \to x = (y+5)/3 \to$ **$f^{-1}(x) = (x + 5)/3$**. Kiểm tra: $f(f^{-1}(x)) = 3\cdot(x+5)/3 - 5 = x + 5 - 5 = x$ ✓.

**Bài 6**: a) $f(-x) = (-x)^4 - 2 = x^4 - 2 = f(x)$ → **chẵn**. b) $g(-x) = -x^3 - x = -(x^3+x) = -g(x)$ → **lẻ**.

**Bài 7**: $f(2)$: vì $2 \ge 0$ → nhánh $x+1$ → $3$. $f(-3)$: vì $-3 < 0$ → nhánh $-x$ → $3$.

---

## 6. Bài tiếp theo

[Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

## 📝 Tổng kết

1. **Hàm số**: mỗi x ↔ 1 y duy nhất.
2. **D (domain)** = tập x. **E (range)** = tập y.
3. **Hàm hợp**: $(f\circ g)(x) = f(g(x))$. Thường $f\circ g \neq g\circ f$.
4. **Test đường thẳng đứng** để kiểm tra là hàm.
5. **Song ánh** $\iff$ có hàm ngược $f^{-1}$.
