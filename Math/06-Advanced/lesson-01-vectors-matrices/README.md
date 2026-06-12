# Lesson 01 — Vector & Ma trận

## Mục tiêu

- **Vector** trong $\mathbb{R}^n$: phép toán cộng, nhân vô hướng, tích vô hướng.
- **Ma trận**: cộng, nhân ma trận-vector, nhân ma trận-ma trận.
- Hiểu ma trận như **phép biến đổi tuyến tính**.
- Kết nối với Vectors tier riêng (đã có).

## Kiến thức tiền đề

- [Tier 2 L08 — Biến hình & vector hình học](../../02-Geometry/lesson-08-transformations-vector-geo/).
- Có thể tham khảo [Vectors tier riêng](../../../Vectors/01-Algebra/) cho phần ứng dụng AI/ML.

---

## 1. Vector trong $\mathbb{R}^n$

💡 **Trực giác / Hình dung**: vector = "**mũi tên có hướng và độ dài**" trong không gian, ghi bằng tọa độ. Trong $\mathbb{R}^2$ mũi tên đi từ gốc O tới điểm $(3, 4)$. Lên $\mathbb{R}^n$ ta không "vẽ" được nữa nhưng vẫn tính như mũi tên: cộng vector = nối đuôi-đầu (luật hình bình hành), nhân vô hướng $c\cdot\vec{v}$ = kéo dài/co mũi tên gấp $c$ lần (nếu $c < 0$ thì quay ngược). Tích vô hướng đo "hai mũi tên cùng hướng tới mức nào".

💡 **Định nghĩa**: Vector n chiều = bộ n số thực, viết theo cột:

$$\vec{v} = (v_1, v_2, \ldots, v_n)$$

**Phép toán**:
- Cộng: $\vec{u} + \vec{v} = (u_1+v_1, \ldots, u_n+v_n)$.
- Nhân vô hướng: $c\cdot\vec{v} = (c\cdot v_1, \ldots, c\cdot v_n)$.
- **Tích vô hướng** (dot product): $\vec{u} \cdot \vec{v} = u_1 v_1 + \ldots + u_n v_n$ (= 1 số).
- **Độ dài (chuẩn)**: $\lVert\vec{v}\rVert = \sqrt{\vec{v} \cdot \vec{v}} = \sqrt{v_1^2 + \ldots + v_n^2}$.

**4 ví dụ số đa dạng** ($\vec{u} = (1, 2, 3)$, $\vec{v} = (4, -1, 2)$):
- Cộng: $\vec{u} + \vec{v} = (5, 1, 5)$.
- Tích vô hướng (ra dương): $\vec{u} \cdot \vec{v} = 1\cdot 4 + 2\cdot(-1) + 3\cdot 2 = 4 - 2 + 6 = \mathbf{8}$.
- Tích vô hướng (ra **0** → vuông góc): $(1, 0, 0) \cdot (0, 5, 7) = 0 + 0 + 0 = 0$ → 2 vector $\perp$.
- Chuẩn: $\lVert\vec{u}\rVert = \sqrt{1+4+9} = \mathbf{\sqrt{14} \approx 3.74}$; nhân vô hướng âm: $(-2)\cdot\vec{u} = (-2, -4, -6)$.

#### Hình dung cộng vector — luật hình bình hành (ASCII)

Cộng $\vec{a} = (3, 1)$ và $\vec{b} = (1, 2)$ → $\vec{a} + \vec{b} = (4, 3)$. Hình dung "nối đuôi-đầu": đi theo $\vec{a}$ rồi tiếp tục đi theo $\vec{b}$, điểm cuối chính là tổng.

```
 y
 3 |              • (4,3) = a + b
 2 |        ___,-´|
 1 | (3,1)•´      |   ← từ (3,1) đi thêm b=(1,2)
 0 +----•--------•----- x
   0    3        4
   (đi a=(3,1) trước, rồi đi b=(1,2): 3+1=4, 1+2=3)
```

#### ≥4 ví dụ — phép CỘNG vector

| # | $\vec{u}$ | $\vec{v}$ | $\vec{u}+\vec{v}$ | Ghi chú |
|---|-----------|-----------|-------------------|---------|
| 1 | $(2, 5)$ | $(3, -1)$ | $(5, 4)$ | $\mathbb{R}^2$ thường |
| 2 | $(1, 2, 3)$ | $(-1, -2, -3)$ | $(0, 0, 0)$ | cộng vector **đối** → vector không $\vec{0}$ |
| 3 | $(0.5, -1.5)$ | $(0.5, 1.5)$ | $(1, 0)$ | phân số triệt tiêu thành phần y |
| 4 | $(1, 0, 0, 7)$ | $(2, 3, 0, -7)$ | $(3, 3, 0, 0)$ | $\mathbb{R}^4$, cộng từng chiều độc lập |

#### ≥4 ví dụ — phép NHÂN VÔ HƯỚNG (c·v)

| # | $c$ | $\vec{v}$ | $c\cdot\vec{v}$ | Hình dung |
|---|-----|-----------|-----------------|-----------|
| 1 | $2$ | $(3, -1)$ | $(6, -2)$ | kéo dài gấp đôi, **giữ hướng** |
| 2 | $-1$ | $(2, 5)$ | $(-2, -5)$ | quay ngược $180°$, **cùng độ dài** |
| 3 | $0.5$ | $(4, 8, -2)$ | $(2, 4, -1)$ | co còn một nửa |
| 4 | $0$ | $(9, -3, 7)$ | $(0, 0, 0)$ | mọi vector $\times 0 = \vec{0}$ |

> 💡 **Liên hệ chuẩn**: $\lVert c\cdot\vec{v}\rVert = |c|\cdot\lVert\vec{v}\rVert$. Vd $\lVert 2\cdot(3,4)\rVert = \lVert(6,8)\rVert = \sqrt{36+64} = 10 = 2\cdot 5 = 2\cdot\lVert(3,4)\rVert$ ✓. Dấu $|c|$ (trị tuyệt đối) vì độ dài không âm: nhân $-1$ vẫn dài như cũ.

#### Tổ hợp tuyến tính (linear combination)

💡 **Trực giác**: tổ hợp tuyến tính = "**pha trộn**" nhiều vector với các hệ số. Như pha sơn: $2$ phần đỏ $\vec{r}$ + $3$ phần xanh $\vec{b}$ ra một màu mới $2\vec{r} + 3\vec{b}$. Mọi điểm trong $\mathbb{R}^2$ đều pha được từ $(1,0)$ và $(0,1)$.

**Định nghĩa**: tổ hợp tuyến tính của $\vec{v}_1, \ldots, \vec{v}_k$ là $c_1\vec{v}_1 + c_2\vec{v}_2 + \ldots + c_k\vec{v}_k$ (mỗi $c_i$ là một số).

**4 ví dụ số** (lấy $\vec{e}_1 = (1, 0)$, $\vec{e}_2 = (0, 1)$):
- $3\vec{e}_1 + 4\vec{e}_2 = (3, 0) + (0, 4) = (3, 4)$ — mọi $(x,y)$ đều = $x\vec{e}_1 + y\vec{e}_2$.
- $2\cdot(1, 1) + (-1)\cdot(1, -1) = (2, 2) + (-1, 1) = (1, 3)$.
- $\tfrac{1}{2}(2, 4) + \tfrac{1}{2}(0, 6) = (1, 2) + (0, 3) = (1, 5)$ — trung bình cộng 2 vector.
- $0\cdot(5, 7) + 0\cdot(1, 1) = (0, 0)$ — hệ số toàn 0 → luôn ra $\vec{0}$.

⚠ **Lỗi thường gặp — quên rằng nhân vô hướng đổi cả độ dài**. Người mới hay nghĩ $c\cdot\vec{v}$ chỉ "đổi số" mà quên nó **kéo dãn mũi tên**. Phản ví dụ: $\lVert(1,0)\rVert = 1$ nhưng $\lVert 3\cdot(1,0)\rVert = 3$, không phải $1$.

### Góc giữa 2 vector

$$\cos\theta = \frac{\vec{u} \cdot \vec{v}}{\lVert\vec{u}\rVert\cdot\lVert\vec{v}\rVert}$$

⟶ $\vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}$.

**Verify bằng số**: $\vec{u} = (1, 0)$, $\vec{v} = (1, 1)$. $\vec{u}\cdot\vec{v} = 1$. $\lVert\vec{u}\rVert = 1$, $\lVert\vec{v}\rVert = \sqrt{2}$. $\cos\theta = 1/\sqrt{2} \approx 0.707$ → $\theta = 45°$ ✓ (đúng với hình: mũi tên $(1,1)$ nghiêng 45° so với trục x).

#### Walk-through tích vô hướng + góc — 3 ví dụ từng bước

Quy trình 4 bước cho mọi cặp vector: **(1)** tính $\vec{u}\cdot\vec{v}$ → **(2)** tính $\lVert\vec{u}\rVert$, $\lVert\vec{v}\rVert$ → **(3)** $\cos\theta = \dfrac{\vec{u}\cdot\vec{v}}{\lVert\vec{u}\rVert\lVert\vec{v}\rVert}$ → **(4)** $\theta = \arccos(\ldots)$.

**Ví dụ 1 — góc nhọn.** $\vec{u} = (3, 0)$, $\vec{v} = (3, 3)$.

$$\begin{aligned}
\vec{u}\cdot\vec{v} &= 3\cdot 3 + 0\cdot 3 = 9 \\
\lVert\vec{u}\rVert &= \sqrt{3^2 + 0^2} = 3, \qquad \lVert\vec{v}\rVert = \sqrt{3^2 + 3^2} = \sqrt{18} = 3\sqrt{2} \\
\cos\theta &= \frac{9}{3 \cdot 3\sqrt{2}} = \frac{9}{9\sqrt{2}} = \frac{1}{\sqrt{2}} \approx 0.707 \\
\theta &= \arccos(0.707) = \mathbf{45°} \quad (\text{nhọn, vì } \vec{u}\cdot\vec{v} > 0)
\end{aligned}$$

**Ví dụ 2 — vuông góc.** $\vec{u} = (2, 1)$, $\vec{v} = (-1, 2)$.

$$\begin{aligned}
\vec{u}\cdot\vec{v} &= 2\cdot(-1) + 1\cdot 2 = -2 + 2 = 0 \\
\cos\theta &= \frac{0}{\lVert\vec{u}\rVert\lVert\vec{v}\rVert} = 0 \\
\theta &= \arccos(0) = \mathbf{90°} \quad (\vec{u} \perp \vec{v},\ \text{khỏi cần tính chuẩn vì tử} = 0)
\end{aligned}$$

**Ví dụ 3 — góc tù.** $\vec{u} = (1, 0)$, $\vec{v} = (-1, 1)$.

$$\begin{aligned}
\vec{u}\cdot\vec{v} &= 1\cdot(-1) + 0\cdot 1 = -1 \\
\lVert\vec{u}\rVert &= 1, \qquad \lVert\vec{v}\rVert = \sqrt{(-1)^2 + 1^2} = \sqrt{2} \\
\cos\theta &= \frac{-1}{1 \cdot \sqrt{2}} = -\frac{1}{\sqrt{2}} \approx -0.707 \\
\theta &= \arccos(-0.707) = \mathbf{135°} \quad (\text{tù, vì } \vec{u}\cdot\vec{v} < 0)
\end{aligned}$$

**Đối chiếu dấu ↔ góc** (rút từ 3 ví dụ): $\vec{u}\cdot\vec{v} > 0 \Rightarrow$ nhọn; $= 0 \Rightarrow$ vuông; $< 0 \Rightarrow$ tù. Dấu tích vô hướng "đọc" được loại góc mà không cần tính $\arccos$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích vô hướng ra 1 số, vậy nó 'đo' cái gì?"* Đo mức độ 2 vector cùng hướng. $\vec{u}\cdot\vec{v} > 0$ → góc nhọn (cùng phía); $= 0$ → vuông góc; $< 0$ → góc tù (ngược phía). Vd $(1,0)\cdot(-1,0) = -1 < 0$ vì ngược hẳn.
- *"Vì sao chuẩn lại là √ của tích vô hướng với chính nó?"* Vì $\vec{v}\cdot\vec{v} = v_1^2+\ldots+v_n^2$ chính là Pytago mở rộng. Trong $\mathbb{R}^2$: $\lVert\vec{v}\rVert = \sqrt{v_1^2+v_2^2}$ đúng là độ dài cạnh huyền.

⚠ **Lỗi thường gặp — nhầm tích vô hướng với nhân từng phần tử**. $\vec{u}\cdot\vec{v}$ là **1 số** (cộng tất cả các tích), KHÔNG phải vector. Phản ví dụ: $(1,2)\cdot(3,4) = 1\cdot 3 + 2\cdot 4 = \mathbf{11}$ (một số), không phải $(3, 8)$. Phép "nhân từng phần tử" $(3, 8)$ tồn tại nhưng gọi là tích Hadamard, khác hẳn.

🔁 **Dừng lại tự kiểm tra**

1. Cho $\vec{a} = (2, -1)$, $\vec{b} = (1, 2)$. Tính $\vec{a}\cdot\vec{b}$. Hai vector này có vuông góc không?
2. Tính $\lVert(3, 4)\rVert$.

<details><summary>Đáp án</summary>

1. $\vec{a}\cdot\vec{b} = 2\cdot 1 + (-1)\cdot 2 = 2 - 2 = \mathbf{0}$ → **có**, vuông góc.
2. $\lVert(3,4)\rVert = \sqrt{9+16} = \sqrt{25} = \mathbf{5}$.

</details>

#### 🤖 Liên hệ Machine Learning — vector đặc trưng & độ tương tự

Trong ML, mỗi dữ liệu được mã hoá thành **vector đặc trưng (feature vector)**. Vd một email = $(số\_từ, số\_link, có\_chữ\ "khuyến\ mãi", \ldots) \in \mathbb{R}^n$; một bộ phim = $(điểm\_hành\_động, điểm\_lãng\_mạn, \ldots)$.

- **Tích vô hướng = độ tương tự**. Hai vector đặc trưng cùng hướng ($\vec{u}\cdot\vec{v}$ lớn) → 2 mẫu "giống nhau". Hệ gợi ý (recommendation) tính $\cos\theta$ giữa vector người dùng và vector phim để xếp hạng — gọi là **cosine similarity**. Vd $\vec{u} = (5, 0)$ (thích hành động), $\vec{v} = (4, 1)$ (chủ yếu hành động): $\cos\theta = \frac{20}{5\cdot\sqrt{17}} \approx 0.97$ → rất giống → gợi ý.
- **Chuẩn = "độ lớn" tín hiệu**, dùng để chuẩn hoá (normalize) dữ liệu về cùng thang. Chia vector cho chuẩn của nó → vector đơn vị $\hat{v} = \vec{v}/\lVert\vec{v}\rVert$ (độ dài 1, chỉ giữ hướng).

### 📝 Tóm tắt mục 1

- Vector $\mathbb{R}^n$ = bộ n số = "mũi tên" có hướng + độ dài.
- Cộng/nhân vô hướng làm **từng thành phần**; tích vô hướng $\vec{u}\cdot\vec{v}$ cộng các tích → ra **1 số**.
- Tổ hợp tuyến tính $c_1\vec{v}_1 + \ldots + c_k\vec{v}_k$ = "pha trộn" có hệ số; mọi $(x,y) = x\vec{e}_1 + y\vec{e}_2$.
- $\vec{u}\cdot\vec{v} = 0 \iff$ vuông góc; dấu tích vô hướng đọc loại góc (+ nhọn, 0 vuông, − tù); $\cos\theta = \vec{u}\cdot\vec{v} / (\lVert\vec{u}\rVert\cdot\lVert\vec{v}\rVert)$; $\lVert\vec{v}\rVert = \sqrt{\vec{v}\cdot\vec{v}}$.
- ML: feature vector + cosine similarity đo độ giống nhau.

---

## 2. Ma trận

💡 **Trực giác / Hình dung**: ma trận = một **cái máy biến đổi không gian**. Đưa vào 1 vector $\vec{x}$, máy nhả ra vector mới $A\vec{x}$ (đã bị quay/co/giãn/lật/chiếu). Bảng số chỉ là cách "ghi cấu hình" của máy: mỗi cột cho biết vector đơn vị đi về đâu. Vd cột 1 = ảnh của $(1,0)$, cột 2 = ảnh của $(0,1)$. Cộng/nhân vô hướng ma trận = chỉnh cấu hình từng nút; nhân 2 ma trận = **ghép 2 máy** (chạy máy này rồi máy kia).

**Ma trận** $m \times n$ = bảng số có m hàng, n cột:

$$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & & & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}$$

### Cộng / nhân vô hướng

Tương tự vector — cộng **từng phần tử**, nhân số vào **mọi phần tử**. Điều kiện cộng: **cùng cấp** (cùng $m\times n$); khác cấp → không cộng được. Nhân vô hướng thì luôn làm được (không ràng buộc cấp).

$$(A+B)_{ij} = a_{ij} + b_{ij}, \qquad (c\cdot A)_{ij} = c\cdot a_{ij}$$

**≥4 ví dụ — phép CỘNG ma trận:**

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix} \qquad (\text{cộng từng ô})$$

$$\begin{bmatrix} 1 & 0 & -2 \\ -3 & 5 & 1 \end{bmatrix} + \begin{bmatrix} 4 & -1 & 3 \\ 2 & 0 & 6 \end{bmatrix} = \begin{bmatrix} 5 & -1 & 1 \\ -1 & 5 & 7 \end{bmatrix} \qquad (2\times 3,\ \text{số âm})$$

$$\begin{bmatrix} 2 & -5 \\ 1 & 3 \end{bmatrix} + \begin{bmatrix} -2 & 5 \\ -1 & -3 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} \qquad (\text{cộng ma trận đối} \to O)$$

$$\begin{bmatrix} 7 & -2 \\ 4 & 1 \end{bmatrix} + \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 7 & -2 \\ 4 & 1 \end{bmatrix} \qquad (A + O = A,\ \text{vai trò "số 0"})$$

**≥4 ví dụ — phép NHÂN VÔ HƯỚNG:**

$$3\cdot\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix} \qquad (-1)\cdot\begin{bmatrix} 2 & -5 \\ -3 & 0 \end{bmatrix} = \begin{bmatrix} -2 & 5 \\ 3 & 0 \end{bmatrix}$$

$$\tfrac{1}{2}\cdot\begin{bmatrix} 4 & -2 & 6 \\ 8 & 0 & 10 \end{bmatrix} = \begin{bmatrix} 2 & -1 & 3 \\ 4 & 0 & 5 \end{bmatrix} \qquad 0\cdot\begin{bmatrix} 9 & -3 \\ 7 & 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$

### Nhân ma trận-vector

Nếu A là $m \times n$ và $\vec{x} \in \mathbb{R}^n$:

$$\vec{y} = A\cdot\vec{x} \in \mathbb{R}^m, \qquad y_i = \sum_j a_{ij}\cdot x_j$$

Mỗi thành phần $y_i$ = tích vô hướng của hàng i của A với $\vec{x}$.

**Ví dụ**: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $\vec{x} = (5, 6)$.
- $y_1 = 1\cdot 5 + 2\cdot 6 = 17$.
- $y_2 = 3\cdot 5 + 4\cdot 6 = 39$.

#### Walk-through nhân ma trận-vector — 3 ví dụ từng bước

**Ví dụ 1 — $(2\times 2)\cdot(2\times 1)$.** $A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}$, $\vec{x} = (1, 2)$.

$$\begin{aligned}
y_1 &= \text{hàng 1}\cdot\vec{x} = 2\cdot 1 + 1\cdot 2 = 2 + 2 = \mathbf{4} \\
y_2 &= \text{hàng 2}\cdot\vec{x} = 1\cdot 1 + 3\cdot 2 = 1 + 6 = \mathbf{7} \\
A\vec{x} &= \begin{bmatrix} 4 \\ 7 \end{bmatrix}
\end{aligned}$$

**Ví dụ 2 — $(2\times 3)\cdot(3\times 1)$, có số âm.** $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$, $\vec{x} = (1, 0, -1)$.

$$\begin{aligned}
y_1 &= 1\cdot 1 + 2\cdot 0 + 3\cdot(-1) = 1 + 0 - 3 = \mathbf{-2} \\
y_2 &= 4\cdot 1 + 5\cdot 0 + 6\cdot(-1) = 4 + 0 - 6 = \mathbf{-2} \\
A\vec{x} &= \begin{bmatrix} -2 \\ -2 \end{bmatrix}
\end{aligned}$$

**Ví dụ 3 — góc nhìn "tổ hợp tuyến tính các cột".** Cùng $A, \vec{x}$ ở ví dụ 2, $A\vec{x}$ = pha trộn các **cột** của A với hệ số là các thành phần của $\vec{x}$:

$$A\vec{x} = 1\cdot\begin{bmatrix} 1 \\ 4 \end{bmatrix} + 0\cdot\begin{bmatrix} 2 \\ 5 \end{bmatrix} + (-1)\cdot\begin{bmatrix} 3 \\ 6 \end{bmatrix} = \begin{bmatrix} 1-3 \\ 4-6 \end{bmatrix} = \begin{bmatrix} -2 \\ -2 \end{bmatrix} \quad \checkmark$$

> 💡 **Hai cách tính cho cùng kết quả** — đây là một sự thật cốt lõi: $A\vec{x}$ vừa = "dot product từng hàng" vừa = "tổ hợp tuyến tính các cột". Cách thứ hai giải thích vì sao "cột j của A = ảnh của vector đơn vị $e_j$".

> 📐 **Định nghĩa đầy đủ — Ma trận**
>
> **(a) Là gì**: Bảng số chữ nhật $m \times n$. KHÔNG chỉ là "lưu trữ data" — ma trận **= phép biến đổi tuyến tính** $\mathbb{R}^n \to \mathbb{R}^m$. Mỗi cột của A là **vector ảnh** của vector đơn vị tương ứng ($e_1 \to$ cột 1, $e_2 \to$ cột 2, ...). Nhân $A\vec{x}$ = "tổ hợp tuyến tính" các cột của A với hệ số là $\vec{x}$.
>
> **(b) Vì sao cần**: Ma trận là **ngôn ngữ chung** của hàng trăm bài toán: hệ PT tuyến tính ($A\vec{x} = \vec{b}$), phép biến hình hình học (quay, đối xứng, vị tự), graph (ma trận liên kết), markov chain, neural network (mỗi layer = nhân ma trận), nén ảnh (SVD), computer graphics (3D rendering = ma trận 4x4). Quan trọng hơn — nhân ma trận = **ghép biến đổi** (composition), cho phép biểu diễn các phép tuyến tính phức tạp = tích các phép đơn giản.
>
> **(c) Ví dụ số**: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $\vec{x} = (5, 6)$ → $A\vec{x} = (17, 39)$. $A\cdot(1,0) = (1,3)$ = cột 1 của A ✓. $A\cdot(0,1) = (2,4)$ = cột 2 ✓. Ma trận quay 90° $R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ biến $(1,0) \to (0,1)$, $(0,1) \to (-1,0)$. Ghép 2 quay 30° = quay 60°: $R(30)\cdot R(30) = R(60)$. Identity $I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$: $I\cdot\vec{x} = \vec{x}$ (không đổi). Nhân ma trận-ma trận $AB$: cột j của $AB$ = $A\cdot$(cột j của B). $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\cdot\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$.
- $\vec{y} = (17, 39)$.

### Nhân ma trận-ma trận

A $m \times n$, B $n \times p$ → $AB$ là $m \times p$.

$$(AB)_{ij} = \sum_k a_{ik} \cdot b_{kj}$$

= tích vô hướng hàng i của A với cột j của B.

**Quy tắc nhớ kích thước** ($k$ "biến mất"):

```
A : m × k
B :     k × n     ← hai k phải khớp (chạm nhau)
─────────────
AB: m     × n     ← lấy ngoài: hàng của A, cột của B
```

#### Walk-through nhân ma trận-ma trận — 3 ví dụ từng bước

**Ví dụ 1 — $(2\times 2)\cdot(2\times 2)$.** $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$. Cấp kết quả $2\times 2$, 4 phần tử:

$$\begin{aligned}
(AB)_{11} &= \text{hàng 1 của A}\cdot\text{cột 1 của B} = [1, 2]\cdot[5, 7] = 1\cdot 5 + 2\cdot 7 = 5 + 14 = \mathbf{19} \\
(AB)_{12} &= [1, 2]\cdot[6, 8] = 1\cdot 6 + 2\cdot 8 = 6 + 16 = \mathbf{22} \\
(AB)_{21} &= [3, 4]\cdot[5, 7] = 3\cdot 5 + 4\cdot 7 = 15 + 28 = \mathbf{43} \\
(AB)_{22} &= [3, 4]\cdot[6, 8] = 3\cdot 6 + 4\cdot 8 = 18 + 32 = \mathbf{50}
\end{aligned}$$

$$AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

**Ví dụ 2 — $(2\times 3)\cdot(3\times 2) = (2\times 2)$** (chiều giữa $k=3$ khớp, biến mất). $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$, $B = \begin{bmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{bmatrix}$:

$$\begin{aligned}
(AB)_{11} &= [1, 2, 3]\cdot[7, 9, 11] = 1\cdot 7 + 2\cdot 9 + 3\cdot 11 = 7 + 18 + 33 = \mathbf{58} \\
(AB)_{12} &= [1, 2, 3]\cdot[8, 10, 12] = 8 + 20 + 36 = \mathbf{64} \\
(AB)_{21} &= [4, 5, 6]\cdot[7, 9, 11] = 28 + 45 + 66 = \mathbf{139} \\
(AB)_{22} &= [4, 5, 6]\cdot[8, 10, 12] = 32 + 50 + 72 = \mathbf{154}
\end{aligned}$$

$$AB = \begin{bmatrix} 58 & 64 \\ 139 & 154 \end{bmatrix}$$

**Ví dụ 3 — $(2\times 2)\cdot(2\times 3) = (2\times 3)$** (kết quả 6 phần tử, có số âm). $A = \begin{bmatrix} 1 & -1 \\ 2 & 3 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$:

$$\begin{aligned}
(AB)_{11} &= [1, -1]\cdot[1, 4] = 1 - 4 = \mathbf{-3} \\
(AB)_{12} &= [1, -1]\cdot[2, 5] = 2 - 5 = \mathbf{-3} \\
(AB)_{13} &= [1, -1]\cdot[3, 6] = 3 - 6 = \mathbf{-3} \\
(AB)_{21} &= [2, 3]\cdot[1, 4] = 2 + 12 = \mathbf{14} \\
(AB)_{22} &= [2, 3]\cdot[2, 5] = 4 + 15 = \mathbf{19} \\
(AB)_{23} &= [2, 3]\cdot[3, 6] = 6 + 18 = \mathbf{24}
\end{aligned}$$

$$AB = \begin{bmatrix} -3 & -3 & -3 \\ 14 & 19 & 24 \end{bmatrix}$$

**Verify lại Ví dụ 1 gọn** ($A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$):
- $(AB)_{11}$ = hàng 1 của A · cột 1 của B = $1\cdot 5 + 2\cdot 7 = \mathbf{19}$.
- $(AB)_{12} = 1\cdot 6 + 2\cdot 8 = \mathbf{22}$.
- $(AB)_{21} = 3\cdot 5 + 4\cdot 7 = \mathbf{43}$.
- $(AB)_{22} = 3\cdot 6 + 4\cdot 8 = \mathbf{50}$. → $AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$.

⚠ **Lỗi thường gặp 1 — Nhân ma trận KHÔNG giao hoán**: $AB \neq BA$ (nói chung). Phản ví dụ với $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$. **Tính cả hai từng phần tử để thấy rõ:**

$$\begin{aligned}
(AB)_{11} &= 1\cdot 0 + 2\cdot 1 = 2, & (AB)_{12} &= 1\cdot 1 + 2\cdot 0 = 1 \\
(AB)_{21} &= 3\cdot 0 + 4\cdot 1 = 4, & (AB)_{22} &= 3\cdot 1 + 4\cdot 0 = 3
\end{aligned}$$

$$\begin{aligned}
(BA)_{11} &= 0\cdot 1 + 1\cdot 3 = 3, & (BA)_{12} &= 0\cdot 2 + 1\cdot 4 = 4 \\
(BA)_{21} &= 1\cdot 1 + 0\cdot 3 = 1, & (BA)_{22} &= 1\cdot 2 + 0\cdot 4 = 2
\end{aligned}$$

$$AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix} \neq BA = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$$

Cùng tập số nhưng sắp khác. Lý do trực giác: $B$ ở đây là "hoán đổi 2 hàng/cột" — nhân **trái** đổi 2 **hàng** của A, nhân **phải** đổi 2 **cột** của A; hai thao tác cho kết quả khác. Tổng quát: "quay rồi lật" ≠ "lật rồi quay".

⚠ **Lỗi thường gặp 2 — nhầm hàng với cột khi nhân**. $(AB)_{ij}$ = **hàng i của A** · **cột j của B**, KHÔNG phải cột i · hàng j. Nếu kích thước không khớp (số cột của A $\neq$ số hàng của B) thì phép nhân **không tồn tại**: A là $2 \times 3$ nhân B là $2 \times 2$ → vô nghĩa ($3 \neq 2$).

⚠ **Lỗi thường gặp 3 — tưởng $AB = O$ thì $A = O$ hoặc $B = O$**. SAI với ma trận (đúng với số thường). Phản ví dụ: $A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$ → $AB = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} = O$ dù cả $A, B \neq O$. Hệ quả: **không "chia hai vế cho A"** để rút gọn — phải nhân nghịch đảo $A^{-1}$ (nếu có).

⚠ **Lỗi thường gặp 4 — khai triển $(A+B)^2$ như số thường**. $(A+B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2$, KHÔNG gộp $AB + BA = 2AB$ vì $AB \neq BA$. Chỉ khi $A, B$ giao hoán mới có $(A+B)^2 = A^2 + 2AB + B^2$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quy tắc nhân ma trận 'rối' thế, sao không nhân từng ô như cộng?"* Vì nhân ma trận được **thiết kế để = ghép biến đổi**. Muốn "(A rồi B)$\cdot\vec{x}$ = A$\cdot$(B$\cdot\vec{x}$)" đúng thì buộc phải dùng quy tắc hàng·cột này. Nhân từng ô không cho tính chất đó.
- *"AB tốn bao nhiêu phép tính?"* Với 2 ma trận $n \times n$: mỗi ô cần n phép nhân, có $n^2$ ô → $n^3$ phép nhân. Vd $n=2$ → 8 phép nhân (khớp 4 ô × 2 tích mỗi ô ở trên).

🔁 **Dừng lại tự kiểm tra**

1. $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$, $\vec{x} = (1, 1)$. Tính $A\vec{x}$.
2. A là $3 \times 2$, B là $2 \times 4$. $AB$ là ma trận cỡ nào? $BA$ có tồn tại không?

<details><summary>Đáp án</summary>

1. $A\vec{x} = (2\cdot 1+0\cdot 1, 0\cdot 1+3\cdot 1) = \mathbf{(2, 3)}$ (giãn x gấp 2, y gấp 3).
2. $AB$ là $\mathbf{3 \times 4}$ (lấy số hàng của A và số cột của B). $BA$: B là $2 \times 4$, A là $3 \times 2$ → $4 \neq 3$ → **không tồn tại**.

</details>

#### 🤖 Liên hệ Machine Learning — ma trận trọng số & một layer

Một **layer của mạng neural** chính là phép nhân ma trận với vector cộng bias:

$$\vec{y} = W\vec{x} + \vec{b}$$

trong đó $W$ là **ma trận trọng số (weight matrix)**, $\vec{x}$ là đầu vào, $\vec{b}$ là bias. Vd layer biến đầu vào $\mathbb{R}^3$ thành $\mathbb{R}^2$: $W$ cấp $2\times 3$, $\vec{x}\in\mathbb{R}^3$ → $W\vec{x}\in\mathbb{R}^2$. Toàn bộ "học" (training) là điều chỉnh các số trong $W$.

- **Một batch dữ liệu** = một ma trận (mỗi hàng/cột một mẫu) → $W\cdot X$ xử lý cả batch trong **một** phép nhân ma trận — đây là lý do GPU (tối ưu nhân ma trận) tăng tốc ML.
- **Xếp nhiều layer tuyến tính** = nhân chuỗi $W_3 W_2 W_1 \vec{x}$. Tính kết hợp (mục 5) cho phép gộp $W = W_3 W_2 W_1$ một lần — và đây cũng là lý do **phải** có hàm phi tuyến giữa các layer, nếu không nhiều layer gộp lại chỉ còn một layer.

### 📝 Tóm tắt mục 2

- Ma trận $m \times n$ = bảng số = "máy biến đổi" $\mathbb{R}^n \to \mathbb{R}^m$.
- Cộng ma trận: cùng cấp, cộng từng ô. Nhân vô hướng: nhân mọi ô, không ràng buộc cấp.
- $(A\vec{x})_i$ = hàng i của A · $\vec{x}$ (cũng = tổ hợp tuyến tính các cột của A); $(AB)_{ij}$ = hàng i của A · cột j của B.
- Nhân ma trận **không giao hoán** ($AB \neq BA$), đòi kích thước khớp (cột A = hàng B), $AB=O \not\Rightarrow A=O$ hay $B=O$.
- ML: một layer = $\vec{y} = W\vec{x} + \vec{b}$.

---

## 3. Ma trận = Phép biến đổi tuyến tính

💡 **Ý tưởng quan trọng**: Ma trận $A$ $m\times n$ định nghĩa 1 ánh xạ tuyến tính:

$$T: \mathbb{R}^n \to \mathbb{R}^m, \qquad T(\vec{x}) = A\cdot\vec{x}$$

**Tính chất tuyến tính**:
- $T(\vec{x} + \vec{y}) = T(\vec{x}) + T(\vec{y})$.
- $T(c\cdot\vec{x}) = c\cdot T(\vec{x})$.

### Ví dụ — Phép quay 2D

Ma trận quay góc $\theta$:

$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

Đã gặp ở [Tier 2 L08](../../02-Geometry/lesson-08-transformations-vector-geo/).

### Ví dụ — Phép vị tự

Ma trận $k\cdot I = \begin{bmatrix} k & 0 \\ 0 & k \end{bmatrix}$ biến $(x, y) \to (kx, ky)$.

**Verify tính tuyến tính bằng số** ($T$ = nhân với $\begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$):
- $T(\vec{x}+\vec{y}) = T(\vec{x}) + T(\vec{y})$? Lấy $\vec{x} = (1,0)$, $\vec{y} = (0,1)$. $T(\vec{x}+\vec{y}) = T(1,1) = (2,3)$. $T(\vec{x})+T(\vec{y}) = (2,0)+(0,3) = (2,3)$ ✓.
- $T(c\cdot\vec{x}) = c\cdot T(\vec{x})$? $c = 5$, $\vec{x} = (1,0)$. $T(5,0) = (10,0)$. $5\cdot T(1,0) = 5\cdot(2,0) = (10,0)$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi phép biến đổi đều là ma trận?"* Không — chỉ các phép **tuyến tính** (giữ gốc O cố định, biến đường thẳng thành đường thẳng, giữ tỉ lệ). Vd "dịch chuyển +5 theo x" (tịnh tiến) KHÔNG tuyến tính vì $T(0) \neq 0$. (Mẹo: dùng toạ độ thuần nhất $3\times 3$ mới gói được tịnh tiến.)
- *"Sao biết cột ma trận = ảnh của vector đơn vị?"* Vì $A\cdot(1,0) =$ cột 1, $A\cdot(0,1) =$ cột 2 — nhân thử ra đúng. Mọi $\vec{x} = x_1\cdot(1,0) + x_2\cdot(0,1)$ nên $A\vec{x} = x_1 \cdot \text{cột1} + x_2 \cdot \text{cột2}$.

⚠ **Lỗi thường gặp — tưởng phép quay rồi co bằng phép co rồi quay**. Quay/co riêng lẻ thì tráo thứ tự cho cùng kết quả (vì vị tự đều $k\cdot I$ giao hoán với mọi ma trận), nhưng co **không đều** thì không: co theo x rồi quay $\neq$ quay rồi co theo x. Liên hệ trực tiếp với $AB \neq BA$ ở mục 2.

🔁 **Dừng lại tự kiểm tra**

1. Ma trận quay 90° $R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ biến $(1,0)$ thành vector nào?
2. $T(\vec{x}) = A\cdot\vec{x}$ với $A = \begin{bmatrix} 3 & 0 \\ 0 & 3 \end{bmatrix}$. Đây là phép gì?

<details><summary>Đáp án</summary>

1. $R\cdot(1,0) = (0\cdot 1+(-1)\cdot 0, 1\cdot 1+0\cdot 0) = \mathbf{(0, 1)}$ — đúng là $(1,0)$ quay 90° ngược chiều kim đồng hồ.
2. **Vị tự** (phóng to đều) hệ số 3: mọi vector dài gấp 3, giữ nguyên hướng.

</details>

### 📝 Tóm tắt mục 3

- Ma trận $A$ định nghĩa ánh xạ tuyến tính $T(\vec{x}) = A\vec{x}$, thoả $T(\vec{x}+\vec{y})=T(\vec{x})+T(\vec{y})$ và $T(c\vec{x})=cT(\vec{x})$.
- Cột thứ j của $A$ = ảnh của vector đơn vị $e_j$.
- Quay, vị tự, chiếu, đối xứng đều là ma trận; tịnh tiến thì **không** (không tuyến tính).

---

## 4. Ma trận đặc biệt

| Tên | Định nghĩa | Ví dụ 2×2 |
|-----|------------|-----------|
| Đơn vị $I$ | $a_{ij} = 1$ nếu $i=j$, 0 otherwise | $\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$ |
| Đối xứng | $A^T = A$ | $\begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}$ |
| Tam giác trên | $a_{ij} = 0$ khi $i > j$ | $\begin{bmatrix} 1 & 2 \\ 0 & 3 \end{bmatrix}$ |
| Khả nghịch | $\exists A^{-1}: A\cdot A^{-1} = I$ | $\det \neq 0$ |
| Trực giao | $A^T = A^{-1}$ | $R(\theta)$ (quay) |

**Chuyển vị** $A^T$: đổi hàng $\leftrightarrow$ cột. $(A^T)_{ij} = a_{ji}$.

💡 **Trực giác / Hình dung**: các ma trận đặc biệt = các "máy biến đổi" có hành vi đặc thù dễ nhận. Đơn vị $I$ = máy "không làm gì" (đầu vào = đầu ra). Trực giao = máy chỉ quay/lật, **không co giãn** (giữ nguyên độ dài, góc). Tam giác trên = hệ phương trình đã "giải sẵn một nửa" (giải ngược được ngay).

**4 ví dụ chuyển vị**: $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}^T = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$; $\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}^T =$ cột $(1,2,3)$; ma trận đối xứng $\begin{bmatrix} 1 & 2 \\ 2 & 3 \end{bmatrix}^T =$ chính nó; $\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}^T = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$ (= ma trận quay −90°, đúng vì với ma trận trực giao $A^T = A^{-1}$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ma trận trực giao 'giữ nguyên độ dài' nghĩa là gì?"* $\lVert A\vec{x}\rVert = \lVert\vec{x}\rVert$ với mọi $\vec{x}$. Vd quay 90° không đổi độ dài mũi tên. Kiểm: $R = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$, $\vec{x} = (3,4)$, $A\vec{x} = (-4,3)$, $\lVert A\vec{x}\rVert = 5 = \lVert\vec{x}\rVert$ ✓.
- *"Vì sao quan tâm ma trận khả nghịch?"* Vì khả nghịch $\iff$ máy "có nút undo" — phục hồi được $\vec{x}$ từ $A\vec{x}$. $\det \neq 0$ là điều kiện (học kỹ ở Lesson 02).

⚠ **Lỗi thường gặp — tưởng $(A^T)_{ij} = a_{ij}$**. Chuyển vị **tráo chỉ số**: $(A^T)_{ij} = a_{ji}$. Phản ví dụ: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $a_{12} = 2$ nhưng $(A^T)_{12} = a_{21} = \mathbf{3}$, không phải 2.

🔁 **Dừng lại tự kiểm tra**

1. Viết chuyển vị của $\begin{bmatrix} 2 & 5 \\ 0 & 7 \end{bmatrix}$.
2. Ma trận đối xứng $2\times 2$ tổng quát có dạng nào?

<details><summary>Đáp án</summary>

1. $\begin{bmatrix} 2 & 0 \\ 5 & 7 \end{bmatrix}$ (tráo hàng$\leftrightarrow$cột).
2. $\begin{bmatrix} a & b \\ b & c \end{bmatrix}$ — phần tử ngoài đường chéo bằng nhau ($A^T = A$).

</details>

### 📝 Tóm tắt mục 4

- $I$ = "không làm gì"; trực giao = chỉ quay/lật ($A^T = A^{-1}$, giữ độ dài); đối xứng $A^T = A$.
- Chuyển vị tráo chỉ số: $(A^T)_{ij} = a_{ji}$.
- Khả nghịch $\iff \det \neq 0 \iff$ máy "undo được".

---

## 5. Quy tắc đại số ma trận

- $A + B = B + A$ (giao hoán cộng).
- $(AB)C = A(BC)$ (kết hợp).
- $A(B+C) = AB + AC$ (phân phối).
- $AB \neq BA$ (không giao hoán).
- $(AB)^T = B^T \cdot A^T$ (đảo thứ tự).
- $I\cdot A = A\cdot I = A$.

💡 **Trực giác / Hình dung**: đại số ma trận giống đại số số thực ở **gần như mọi luật** (kết hợp, phân phối, có "số 1" là $I$), **trừ một điều**: phép nhân không giao hoán. Nhớ điều ngoại lệ này là chìa khoá tránh sai.

**Verify $(AB)^T = B^T\cdot A^T$ bằng số** ($A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$):
- $AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix} \to (AB)^T = \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$.
- $B^T\cdot A^T = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}\cdot\begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$ ✓ (khớp). Lưu ý thứ tự **đảo**: $B^T$ trước $A^T$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $(AB)^T$ lại đảo thành $B^T\cdot A^T$ chứ không $A^T\cdot B^T$?"* Trực giác "mặc áo rồi cởi": mặc áo trong → áo ngoài; cởi thì ngoài trước → trong sau. Chuyển vị "đảo trình tự". Verify số ở trên xác nhận.
- *"$(A+B)^T$ có đảo không?"* Không — cộng giao hoán nên $(A+B)^T = A^T + B^T$ (không cần đảo). Chỉ phép **nhân** mới đảo.

⚠ **Lỗi thường gặp — áp dụng $(AB)^2 = A^2B^2$**. Sai vì $(AB)^2 = ABAB$, mà $BA \neq AB$ nên không gom thành $A^2B^2$. Chỉ đúng khi $A, B$ giao hoán. Phản ví dụ: $A=\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$, $B=\begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix} \to (AB)^2 \neq A^2B^2$ (tự nhân kiểm chứng).

🔁 **Dừng lại tự kiểm tra**

1. Rút gọn $(ABC)^T$.
2. Đúng/sai: $A(B+C) = AB + AC$?

<details><summary>Đáp án</summary>

1. $(ABC)^T = C^T\cdot B^T\cdot A^T$ (đảo toàn bộ thứ tự).
2. **Đúng** — phân phối luôn đúng (kể cả khi không giao hoán), miễn kích thước khớp.

</details>

### 📝 Tóm tắt mục 5

- Ma trận có kết hợp, phân phối, đơn vị $I$ — giống số thực.
- Ngoại lệ then chốt: **không giao hoán** $AB \neq BA \to (AB)^2 \neq A^2B^2$, cẩn thận khi rút gọn.
- $(AB)^T = B^T\cdot A^T$ (đảo thứ tự); $(A+B)^T = A^T+B^T$ (không đảo).

---

## 6. Ma trận đơn vị, nghịch đảo & hạng

### 6.1 Ma trận đơn vị I — "số 1" của phép nhân

💡 **Trực giác**: $I$ = máy biến đổi "**không làm gì**", giống số $1$ trong nhân số ($1\cdot a = a$). Nhân $I$ vào đâu cũng trả lại nguyên: $I\cdot A = A\cdot I = A$.

$$I_{ij} = \begin{cases} 1 & i = j \quad (\text{đường chéo}) \\ 0 & i \neq j \end{cases} \qquad I_2 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix},\ I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

**Walk-through verify $A\cdot I = A$** ($A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $I = I_2$):

$$\begin{aligned}
(AI)_{11} &= 1\cdot 1 + 2\cdot 0 = 1, & (AI)_{12} &= 1\cdot 0 + 2\cdot 1 = 2 \\
(AI)_{21} &= 3\cdot 1 + 4\cdot 0 = 3, & (AI)_{22} &= 3\cdot 0 + 4\cdot 1 = 4
\end{aligned}$$

→ $AI = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = A$ ✓. Cột $j$ của $I$ "chọn đúng cột $j$ của A" → trả về A nguyên vẹn.

### 6.2 Ma trận nghịch đảo A⁻¹ — "nút undo"

💡 **Trực giác**: với số $a\neq 0$ có nghịch đảo $1/a$ thoả $a\cdot(1/a)=1$. Với ma trận, $A^{-1}$ là máy **hoàn tác** $A$: nếu $A$ đưa $\vec{x}\to A\vec{x}$ thì $A^{-1}$ đưa $A\vec{x}\to\vec{x}$.

**Định nghĩa**: $A^{-1}$ thoả $A\cdot A^{-1} = A^{-1}\cdot A = I$.

**(a) Là gì** — ma trận vuông "ngược lại" của $A$. **(b) Vì sao cần** — để giải $A\vec{x} = \vec{b}$ thành $\vec{x} = A^{-1}\vec{b}$ (giống $x = b/a$); và vì với ma trận **không "chia hai vế cho A"** được (mục 2, $AB=O\not\Rightarrow$...). **(c) Ví dụ số** — bên dưới.

**Công thức $2\times 2$**: nếu $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ và $\det A = ad - bc \neq 0$ thì

$$A^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

(đổi chỗ $a\leftrightarrow d$, đổi dấu $b, c$, chia cho định thức).

**Walk-through 3 ví dụ:**

**Ví dụ 1.** $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$. $\det A = 1\cdot 4 - 2\cdot 3 = 4 - 6 = -2 \neq 0$ → khả nghịch.

$$A^{-1} = \frac{1}{-2}\begin{bmatrix} 4 & -2 \\ -3 & 1 \end{bmatrix} = \begin{bmatrix} -2 & 1 \\ 1.5 & -0.5 \end{bmatrix}$$

Kiểm: $(AA^{-1})_{11} = 1\cdot(-2) + 2\cdot 1.5 = -2 + 3 = 1$; $(AA^{-1})_{12} = 1\cdot 1 + 2\cdot(-0.5) = 1 - 1 = 0$ → đúng hàng đầu của $I$ ✓.

**Ví dụ 2.** $A = \begin{bmatrix} 2 & 0 \\ 0 & 5 \end{bmatrix}$ (đường chéo). $\det = 10$. $A^{-1} = \frac{1}{10}\begin{bmatrix} 5 & 0 \\ 0 & 2 \end{bmatrix} = \begin{bmatrix} 0.5 & 0 \\ 0 & 0.2 \end{bmatrix}$ — nghịch đảo ma trận đường chéo = lấy nghịch đảo từng phần tử chéo.

**Ví dụ 3 — KHÔNG khả nghịch.** $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$. $\det = 1\cdot 4 - 2\cdot 2 = 0$ → **không có** $A^{-1}$ (suy biến). Lý do trực giác: hàng 2 = $2\times$ hàng 1 → máy "ép phẳng" không gian, mất thông tin, không undo được.

⚠ **Lỗi thường gặp — tưởng mọi ma trận vuông đều khả nghịch**. Chỉ khi $\det \neq 0$. Ví dụ 3 ở trên ($\det = 0$) không có nghịch đảo. Học sâu định thức ở [Lesson 02](../lesson-02-determinants-linear-systems/).

⚠ **Lỗi thường gặp — viết $(AB)^{-1} = A^{-1}B^{-1}$**. SAI, đảo thứ tự giống transpose: $(AB)^{-1} = B^{-1}A^{-1}$.

### 6.3 Hạng (rank) — "số chiều thực sự" của ảnh

💡 **Trực giác**: hạng = số hàng (hoặc cột) **độc lập tuyến tính** — bao nhiêu hàng "mang thông tin mới", không phải bản sao/tổ hợp của hàng khác. Hình dung: máy $A$ biến $\mathbb{R}^n$ thành một không gian con; **hạng = số chiều của không gian đầu ra**.

**4 ví dụ số:**

| Ma trận | Hạng | Vì sao |
|---------|:---:|--------|
| $\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$ | $2$ | 2 hàng độc lập (đầy đủ — full rank) |
| $\begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$ | $1$ | hàng 2 = $2\times$ hàng 1 → chỉ 1 hàng "mới" |
| $\begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{bmatrix}$ | $1$ | hàng 2 toàn 0 → bỏ → còn 1 |
| $\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$ | $0$ | không hàng nào mang thông tin |

❓ **Câu hỏi tự nhiên**: *"Hạng liên quan gì tới khả nghịch?"* Ma trận vuông $n\times n$ khả nghịch $\iff$ hạng $= n$ (full rank) $\iff \det \neq 0$. Cả ba điều kiện này tương đương. Ma trận hạng thiếu (rank-deficient) ép phẳng không gian → mất thông tin → không undo → $\det = 0$.

> 🤖 **Liên hệ ML**: hạng đo "thông tin thực" trong ma trận dữ liệu. Nén ảnh / giảm chiều (PCA, SVD) = xấp xỉ ma trận bằng một ma trận **hạng thấp** giữ phần lớn thông tin nhưng ít số hơn. Ma trận đặc trưng hạng thấp → các đặc trưng dư thừa (tương quan cao).

🔁 **Dừng lại tự kiểm tra**

1. $A = \begin{bmatrix} 3 & 0 \\ 0 & 2 \end{bmatrix}$ có khả nghịch không? Nếu có, tính $A^{-1}$.
2. Hạng của $\begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. $\det = 6 \neq 0$ → **có**. $A^{-1} = \begin{bmatrix} 1/3 & 0 \\ 0 & 1/2 \end{bmatrix}$.
2. Hàng 1 = $2\times$ hàng 2 → chỉ 1 hàng độc lập → **hạng = 1** (suy biến, $\det = 2\cdot 2 - 4\cdot 1 = 0$).

</details>

### 📝 Tóm tắt mục 6

- $I$ = "số 1" của nhân ma trận: $IA = AI = A$.
- $A^{-1}$ = "nút undo": $AA^{-1} = I$; công thức $2\times 2$ chia cho $\det = ad-bc$; $(AB)^{-1} = B^{-1}A^{-1}$.
- Hạng = số hàng/cột độc lập = số chiều ảnh. Vuông khả nghịch $\iff$ hạng $= n \iff \det \neq 0$.

---

## 7. Bài tập

### Bài tập

**Bài 1**: $\vec{u} = (1, 2, -1)$, $\vec{v} = (3, 0, 2)$. Tính $\vec{u} \cdot \vec{v}$ và $\lVert\vec{u}\rVert$.

**Bài 2**: $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$. Tính $AB$ và $BA$.

**Bài 3**: Cho $A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}$, $\vec{x} = (1, 2)$. Tính $A\vec{x}$.

**Bài 4**: Tính tích vô hướng $(1, 2, 3, 4) \cdot (5, 6, 7, 8)$.

**Bài 5**: Ma trận đối xứng $A$ $2\times 2$ có dạng nào tổng quát?

**Bài 6**: Tính góc giữa $\vec{u} = (1, 1)$ và $\vec{v} = (-1, 1)$.

**Bài 7**: Tính $C = AB$ với $A = \begin{bmatrix} 2 & 0 & 1 \\ 1 & 3 & 0 \end{bmatrix}$ (cấp $2\times 3$) và $B = \begin{bmatrix} 1 & 0 \\ 0 & 2 \\ 1 & 1 \end{bmatrix}$ (cấp $3\times 2$). $BA$ có cùng cấp với $AB$ không?

**Bài 8**: Cho $A = \begin{bmatrix} 4 & 7 \\ 2 & 6 \end{bmatrix}$. Tính $\det A$ và $A^{-1}$ (nếu tồn tại), rồi kiểm $A A^{-1} = I$ cho phần tử $(1,1)$.

**Bài 9**: Tìm hạng của $A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}$. Ma trận này khả nghịch không (giả sử cần vuông)?

### Lời giải

**Bài 1**: $\vec{u}\cdot\vec{v} = 3 + 0 - 2 = \mathbf{1}$. $\lVert\vec{u}\rVert = \sqrt{1+4+1} = \mathbf{\sqrt{6}}$.

**Bài 2**:  
- $AB$: hàng 1 nhân cột $B$: $[1\cdot 0+2\cdot 1, 1\cdot 1+2\cdot 0] = [2, 1]$. Hàng 2: $[3\cdot 0+4\cdot 1, 3\cdot 1+4\cdot 0] = [4, 3]$.  
- $AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}$.  
- $BA = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$.  
- $\neq \to$ không giao hoán.

**Bài 3**: $y_1 = 2\cdot 1+1\cdot 2 = 4$. $y_2 = 1\cdot 1+3\cdot 2 = 7$. → $\mathbf{\vec{y} = (4, 7)}$.

**Bài 4**: $5+12+21+32 = \mathbf{70}$.

**Bài 5**: $A = \begin{bmatrix} a & b \\ b & c \end{bmatrix}$ với $a, b, c$ bất kỳ. (Đường chéo phụ đối xứng.)

**Bài 6**: $\vec{u}\cdot\vec{v} = 1\cdot(-1) + 1\cdot 1 = 0$ → vuông góc, $\theta = \mathbf{90°}$ (khỏi cần tính chuẩn vì tử = 0).

**Bài 7**: Cấp $(2\times 3)\cdot(3\times 2) \to (2\times 2)$.

$$\begin{aligned}
c_{11} &= [2,0,1]\cdot[1,0,1] = 2 + 0 + 1 = 3, & c_{12} &= [2,0,1]\cdot[0,2,1] = 0 + 0 + 1 = 1 \\
c_{21} &= [1,3,0]\cdot[1,0,1] = 1 + 0 + 0 = 1, & c_{22} &= [1,3,0]\cdot[0,2,1] = 0 + 6 + 0 = 6
\end{aligned}$$

$AB = \begin{bmatrix} 3 & 1 \\ 1 & 6 \end{bmatrix}$ (cấp $2\times 2$). $BA$ là $(3\times 2)\cdot(2\times 3) = (3\times 3)$ → **khác cấp** với $AB$ → chắc chắn không bằng.

**Bài 8**: $\det A = 4\cdot 6 - 7\cdot 2 = 24 - 14 = \mathbf{10} \neq 0$ → khả nghịch.

$$A^{-1} = \frac{1}{10}\begin{bmatrix} 6 & -7 \\ -2 & 4 \end{bmatrix} = \begin{bmatrix} 0.6 & -0.7 \\ -0.2 & 0.4 \end{bmatrix}$$

Kiểm $(AA^{-1})_{11} = 4\cdot 0.6 + 7\cdot(-0.2) = 2.4 - 1.4 = 1$ ✓ (đúng phần tử $(1,1)$ của $I$).

**Bài 9**: Hàng 2 = $2\times$ hàng 1 → chỉ 1 hàng độc lập → **hạng = 1**. Ma trận này $2\times 3$ (không vuông) nên không có khái niệm nghịch đảo; kể cả nếu cắt thành vuông thì hạng thiếu ($< 2$) → **không khả nghịch**.

---

## 8. Bài tiếp theo

[Lesson 02 — Định thức & hệ tuyến tính](../lesson-02-determinants-linear-systems/).

## 📝 Tổng kết

1. **Vector $\mathbb{R}^n$**: cộng, nhân vô hướng, tổ hợp tuyến tính, tích vô hướng, chuẩn, góc (dấu tích vô hướng đọc loại góc).
2. **Ma trận**: cộng (cùng cấp), nhân vô hướng, nhân ma trận **không giao hoán**.
3. **Nhân ma trận-vector**: $y_i =$ hàng i của $A \cdot \vec{x}$ (cũng = tổ hợp tuyến tính các cột của A).
4. **Ma trận = phép biến đổi tuyến tính** $T: \mathbb{R}^n \to \mathbb{R}^m$; cột j = ảnh của $e_j$.
5. **Quay**, **vị tự**, **chiếu**, ... đều là ma trận.
6. **$I$ / $A^{-1}$ / hạng**: $I$ là "số 1"; $A^{-1}$ là "nút undo" ($\det\neq 0$); hạng = số chiều ảnh; vuông khả nghịch $\iff$ hạng đầy đủ $\iff \det \neq 0$.
7. **ML**: feature vector + cosine similarity (độ giống); một layer $= W\vec{x} + \vec{b}$; nén hạng thấp (PCA/SVD).
