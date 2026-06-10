# Lesson 04 — Độc lập tuyến tính, span, basis

Đây là bài "đổi cách nhìn" về không gian vector. Trước đây ta nhìn $\mathbb{R}^2$, $\mathbb{R}^3$ như "mặt phẳng có lưới ô vuông sẵn". Bài này dạy: **lưới ô vuông đó là một LỰA CHỌN, không phải thứ trời sinh**. Ta có thể chọn bộ "thước đo" (basis) khác, và cùng một điểm sẽ có toạ độ khác. Hiểu được điều này = mở cánh cửa vào PCA, embedding, change of basis, eigenvector — gần như toàn bộ Tầng 4 còn lại.

## Mục tiêu học tập

Sau khi học xong bài này, bạn sẽ:

- Viết được **linear combination** (tổ hợp tuyến tính) của một tập vector và hiểu mỗi hệ số $c_i$ mang ý nghĩa gì.
- Vẽ và mô tả được **span** (bao tuyến tính) của 1, 2, 3 vector trong $\mathbb{R}^2$ và $\mathbb{R}^3$.
- Kiểm tra được một tập vector là **độc lập tuyến tính** hay **phụ thuộc** bằng 2 cách: giải hệ phương trình + tính định thức.
- Định nghĩa được **basis** và tìm được basis cho các không gian con đơn giản.
- Hiểu **dimension** = số phần tử trong basis (không phụ thuộc cách chọn basis nào).
- Bước đầu thấy được mối liên hệ giữa basis và **PCA**, **embedding**, **linear regression**.

## Kiến thức tiền đề

- [Lesson 01 — Vector chính thức](../lesson-01-vectors/): định nghĩa vector trong $\mathbb{R}^n$, phép cộng, scalar multiplication.
- [Lesson 02 — Dot product](../lesson-02-dot-product/): không bắt buộc, nhưng sẽ giúp trực giác về "vuông góc" ở phần subspace.
- [Algebra Lesson 08 — Hệ phương trình tuyến tính](../../01-Algebra/lesson-08-systems/): cách giải hệ $A\mathbf{x} = \mathbf{b}$ bằng khử Gauss. Phần "Cách kiểm tra độc lập" sẽ gọi lại trực tiếp.
- [Algebra Lesson 06 — Hàm bậc nhất, bậc hai](../../01-Algebra/lesson-06-linear-quadratic/): khái niệm đường thẳng đi qua gốc, mặt phẳng — sẽ dùng làm "vật liệu" mô tả span.

---

## 1. Linear combination — tổ hợp tuyến tính

### 1.1 Trực giác

> 💡 **Hình dung**: bạn có 2 lọ thuốc nhuộm — lọ A màu đỏ, lọ B màu xanh. Mỗi lần pha, bạn nhỏ một số giọt A (gọi là $c_1$) và một số giọt B (gọi là $c_2$). Kết quả là một màu mới — **tổ hợp tuyến tính** của A và B với hệ số $(c_1, c_2)$. Nếu thêm lọ C, bạn có 3 hệ số. Quy tắc cốt lõi: chỉ được dùng phép **cộng** và phép **nhân với số (scalar)** — không có phép nhân lọ với lọ, không có lũy thừa.

Cùng nguyên tắc đó, nhưng thay "lọ thuốc nhuộm" bằng "vector". Một linear combination là kết quả của việc:

1. Lấy mỗi vector trong tập, nhân nó với một hệ số (scalar) tuỳ ý.
2. Cộng tất cả các vector đã nhân hệ số lại với nhau.

### 1.2 Định nghĩa hình thức

Cho tập vector $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$ trong $\mathbb{R}^n$ và các scalar $c_1, c_2, \ldots, c_k \in \mathbb{R}$. **Linear combination** (tổ hợp tuyến tính) của chúng với hệ số $(c_1, \ldots, c_k)$ là vector:

$$c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_k \mathbf{v}_k$$

Điều quan trọng:

- Hệ số $c_i$ có thể là **bất kỳ số thực** nào — âm, dương, không, phân số, số vô tỉ.
- Phép cộng và scalar multiplication là **các phép toán duy nhất** được phép.
- Kết quả vẫn là một vector trong $\mathbb{R}^n$ (cùng không gian với các $\mathbf{v}_i$).

### 1.3 Walk-through bằng số cụ thể

**Ví dụ 1**: $\mathbf{v}_1 = (1, 0)$, $\mathbf{v}_2 = (0, 1)$, hệ số $(c_1, c_2) = (3, 5)$.

$$\begin{aligned}
3 \cdot (1, 0) + 5 \cdot (0, 1) &= (3, 0) + (0, 5) \\
&= (3, 5)
\end{aligned}$$

Bạn thấy ngay: với 2 vector đơn vị $(1,0)$ và $(0,1)$, hệ số $(c_1, c_2)$ chính là toạ độ của kết quả. Đây là lý do tại sao ta gọi $(1,0)$ và $(0,1)$ là **standard basis** — sẽ nói kỹ ở mục 6.

**Ví dụ 2**: $\mathbf{v}_1 = (2, 1)$, $\mathbf{v}_2 = (1, 3)$, hệ số $(c_1, c_2) = (1, 2)$.

$$\begin{aligned}
1 \cdot (2, 1) + 2 \cdot (1, 3) &= (2, 1) + (2, 6) \\
&= (4, 7)
\end{aligned}$$

**Ví dụ 3** (hệ số âm): $\mathbf{v}_1 = (1, 2)$, $\mathbf{v}_2 = (3, -1)$, hệ số $(c_1, c_2) = (-2, 1)$.

$$\begin{aligned}
(-2) \cdot (1, 2) + 1 \cdot (3, -1) &= (-2, -4) + (3, -1) \\
&= (1, -5)
\end{aligned}$$

**Ví dụ 4** (trong $\mathbb{R}^3$): $\mathbf{v}_1 = (1, 0, 0)$, $\mathbf{v}_2 = (1, 1, 0)$, $\mathbf{v}_3 = (1, 1, 1)$, hệ số $(2, -1, 3)$.

$$\begin{aligned}
2 \cdot (1, 0, 0) + (-1) \cdot (1, 1, 0) + 3 \cdot (1, 1, 1) &= (2, 0, 0) + (-1, -1, 0) + (3, 3, 3) \\
&= (4, 2, 3)
\end{aligned}$$

**Ví dụ 5** (trường hợp đặc biệt): tất cả hệ số bằng 0.

$$0 \cdot \mathbf{v}_1 + 0 \cdot \mathbf{v}_2 + \cdots + 0 \cdot \mathbf{v}_k = \mathbf{0}$$

Đây gọi là **trivial combination** (tổ hợp tầm thường). Mọi tập vector đều có ít nhất tổ hợp này, kết quả luôn là vector 0.

> ❓ **Câu hỏi tự nhiên**: "Có khi nào tổ hợp tuyến tính KHÔNG ra được vector mong muốn?" — Có. Ví dụ với $\mathbf{v}_1 = (1, 0)$ và $\mathbf{v}_2 = (2, 0)$, mọi tổ hợp $c_1(1,0) + c_2(2,0) = (c_1+2c_2, 0)$ đều có thành phần thứ hai = 0. Bạn không thể tạo ra $(1, 1)$ từ hai vector này. Lý do: tập này không "trải" được toàn $\mathbb{R}^2$ — dẫn ta tới khái niệm **span** ngay sau đây.

> 🔁 **Tự kiểm tra**: Cho $\mathbf{u} = (1, -1)$, $\mathbf{v} = (2, 1)$. Tính tổ hợp $3\mathbf{u} - 2\mathbf{v}$. <details><summary>Đáp án</summary>$3(1,-1) - 2(2,1) = (3,-3) - (4,2) = (-1, -5)$.</details>

### 📝 Tóm tắt mục 1

- Linear combination = nhân mỗi vector với một scalar rồi cộng tất cả lại.
- Hệ số $c_i$ có thể là bất kỳ số thực nào, kể cả 0 hay âm.
- Trivial combination (tất cả hệ số = 0) luôn cho vector 0.
- Tổ hợp tuyến tính là phép toán **đóng** trong $\mathbb{R}^n$ — kết quả không "thoát" ra ngoài.

---

## 2. Span — bao tuyến tính

### 2.1 Trực giác

> 💡 **Hình dung**: tưởng tượng $\mathbf{v}_1$ và $\mathbf{v}_2$ là 2 ánh đèn từ 2 vị trí cố định. Bạn có thể chỉnh độ sáng (hệ số $c_1$, $c_2$) tuỳ ý. **Span** của $\{\mathbf{v}_1, \mathbf{v}_2\}$ là tập hợp **tất cả các điểm sáng mà bạn có thể tạo ra được**. Nếu $\mathbf{v}_1$ và $\mathbf{v}_2$ chiếu theo 2 hướng khác nhau, bạn có thể chiếu sáng cả mặt phẳng. Nếu cả 2 chiếu theo cùng một hướng, bạn chỉ chiếu sáng được một đường thẳng.

### 2.2 Định nghĩa hình thức

**Span của tập vector** $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\} \subset \mathbb{R}^n$, ký hiệu $\operatorname{span}(\mathbf{v}_1, \ldots, \mathbf{v}_k)$ hoặc $\langle \mathbf{v}_1, \ldots, \mathbf{v}_k \rangle$, là tập hợp **mọi linear combination** của chúng:

$$\operatorname{span}(\mathbf{v}_1, \ldots, \mathbf{v}_k) = \{\, c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_k \mathbf{v}_k : c_1, \ldots, c_k \in \mathbb{R} \,\}$$

Đây là một **tập hợp** (set) — không phải một vector đơn lẻ. Nó luôn là một **không gian con** của $\mathbb{R}^n$ (sẽ chứng minh ở mục 9).

### 2.3 Walk-through các trường hợp

**Ví dụ 1**: $\operatorname{span}((1, 0))$ trong $\mathbb{R}^2$.

Mọi tổ hợp: $c \cdot (1, 0) = (c, 0)$ với $c \in \mathbb{R}$. Tập kết quả là $\{(c, 0) : c \in \mathbb{R}\}$ = **trục Ox**. Hình học: một đường thẳng đi qua gốc, nằm ngang.

**Ví dụ 2**: $\operatorname{span}((1, 0), (0, 1))$ trong $\mathbb{R}^2$.

Mọi tổ hợp: $c_1(1,0) + c_2(0,1) = (c_1, c_2)$ với $c_1, c_2 \in \mathbb{R}$. Đặt $x = c_1$, $y = c_2$ — ta có **toàn bộ $\mathbb{R}^2$**. Hai vector này "phủ" hết mặt phẳng.

**Ví dụ 3**: $\operatorname{span}((1, 0), (2, 0))$ trong $\mathbb{R}^2$.

Mọi tổ hợp: $c_1(1,0) + c_2(2,0) = (c_1 + 2c_2, 0)$. Vì $c_1 + 2c_2$ chạy khắp $\mathbb{R}$ nên kết quả là $\{(t, 0) : t \in \mathbb{R}\}$ = **trục Ox** (giống Ví dụ 1). Có 2 vector nhưng chỉ trải được 1 đường thẳng — vì $(2,0) = 2 \cdot (1,0)$, vector thứ hai "thừa".

**Ví dụ 4**: $\operatorname{span}((1, 1), (1, -1))$ trong $\mathbb{R}^2$.

Mọi tổ hợp: $c_1(1,1) + c_2(1,-1) = (c_1 + c_2, c_1 - c_2)$. Đặt $x = c_1 + c_2$, $y = c_1 - c_2$. Giải ra $c_1 = \frac{x+y}{2}$, $c_2 = \frac{x-y}{2}$. Với mọi $(x, y) \in \mathbb{R}^2$, ta luôn tìm được $c_1, c_2$ thoả mãn → span = toàn bộ $\mathbb{R}^2$. Khác với Ví dụ 2, basis ở đây "nghiêng".

**Ví dụ 5**: $\operatorname{span}((1, 0, 0))$ trong $\mathbb{R}^3$.

$c \cdot (1,0,0) = (c, 0, 0)$ → trục Ox trong $\mathbb{R}^3$. Đây là một đường thẳng trong không gian 3 chiều.

**Ví dụ 6**: $\operatorname{span}((1, 0, 0), (0, 1, 0))$ trong $\mathbb{R}^3$.

$c_1(1,0,0) + c_2(0,1,0) = (c_1, c_2, 0)$ → **mặt phẳng Oxy** (thành phần $z$ luôn = 0).

**Ví dụ 7**: $\operatorname{span}((1, 0, 0), (0, 1, 0), (0, 0, 1))$ trong $\mathbb{R}^3$ = toàn bộ $\mathbb{R}^3$.

**Ví dụ 8**: $\operatorname{span}((1, 1, 0), (2, 2, 0))$ trong $\mathbb{R}^3$.

$c_1(1,1,0) + c_2(2,2,0) = (c_1 + 2c_2, c_1 + 2c_2, 0)$. Đặt $t = c_1 + 2c_2$, kết quả là $\{(t, t, 0) : t \in \mathbb{R}\}$ = **đường thẳng qua gốc theo hướng $(1,1,0)$**. Có 2 vector nhưng span chỉ là một đường — vì $(2,2,0) = 2 \cdot (1,1,0)$.

> ❓ **Câu hỏi tự nhiên 1**: "Span luôn đi qua gốc toạ độ?" — Đúng. Vì chọn $c_1 = c_2 = \cdots = 0$, tổ hợp = $\mathbf{0}$. Mọi span đều chứa vector 0. Hệ quả: đường thẳng $y = x + 3$ (không đi qua gốc) **không** là span của bất kỳ tập vector nào.

> ❓ **Câu hỏi tự nhiên 2**: "Span có thể là một điểm duy nhất không?" — Có, đúng 1 trường hợp: $\operatorname{span}(\{\}) = \{\mathbf{0}\}$ (span của tập rỗng) hoặc $\operatorname{span}(\{\mathbf{0}\}) = \{\mathbf{0}\}$. Vì $c \cdot \mathbf{0} = \mathbf{0}$ với mọi $c$.

> ❓ **Câu hỏi tự nhiên 3**: "Span của 3 vector trong $\mathbb{R}^2$ là gì?" — Tối đa là toàn $\mathbb{R}^2$. Vì span $\subset \mathbb{R}^2$, mà $\mathbb{R}^2$ chỉ có 2 chiều. Thêm vector thứ 3 không "vượt" được ra ngoài — nó sẽ là combination của 2 vector kia (hoặc trùng/cùng hướng).

> ⚠ **Lỗi thường gặp**: nghĩ rằng "nhiều vector hơn → span lớn hơn". Sai. $\operatorname{span}((1,0), (2,0), (3,0)) = \operatorname{span}((1,0))$ = trục Ox, dù có 3 vector. Số vector **không** quyết định kích thước span — chất lượng (sự đa dạng hướng) mới quyết định.

> 🔁 **Tự kiểm tra**: $\operatorname{span}((1, 2), (3, 6))$ là gì? <details><summary>Đáp án</summary>$(3,6) = 3 \cdot (1,2)$ nên 2 vector cùng hướng. Span = đường thẳng qua gốc theo hướng $(1,2)$, tức là $\{(t, 2t) : t \in \mathbb{R}\}$ hay đường $y = 2x$.</details>

### 📝 Tóm tắt mục 2

- Span = tập hợp **mọi** linear combination của các vector cho trước.
- Span luôn chứa vector 0 (chọn mọi hệ số = 0).
- Span của 1 vector $\neq \mathbf{0}$ = đường thẳng qua gốc.
- Span của 2 vector không cùng hướng trong $\mathbb{R}^2$ = toàn $\mathbb{R}^2$; trong $\mathbb{R}^3$ = một mặt phẳng qua gốc.
- Số vector **không** quyết định kích thước span; "chất lượng" (đa dạng hướng) mới quyết định.

---

## 3. Độc lập tuyến tính

### 3.1 Trực giác

> 💡 **Hình dung**: bạn có một đội xây dựng gồm $k$ công nhân, mỗi người chỉ làm được một loại việc (đào, trộn vữa, xây tường, ...). **Độc lập** nghĩa là **không có ai làm việc trùng với người khác** — mất bất kỳ người nào, đội sẽ thiếu một kỹ năng không bù được. **Phụ thuộc** nghĩa là có người làm việc đã có người khác làm (hoặc làm việc ai đó có thể tự lo) — bỏ người này đi, đội vẫn làm được mọi việc cũ.

Áp dụng vào vector: tập $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ **độc lập tuyến tính** nếu **không vector nào có thể viết được dưới dạng linear combination của các vector còn lại**. Mất vector nào, span sẽ "co" lại. Ngược lại, **phụ thuộc** = có ít nhất một vector "thừa" (viết được từ các vector khác), bỏ nó đi span không đổi.

### 3.2 Định nghĩa hình thức

Tập vector $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\} \subset \mathbb{R}^n$ gọi là **độc lập tuyến tính (linearly independent)** nếu phương trình:

$$c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_k \mathbf{v}_k = \mathbf{0}$$

**chỉ có một nghiệm duy nhất** là $c_1 = c_2 = \cdots = c_k = 0$ (nghiệm tầm thường).

Nếu tồn tại nghiệm khác — tức có một bộ $(c_1, \ldots, c_k)$ không phải toàn số 0 mà vẫn cho tổng = 0 — tập vector gọi là **phụ thuộc tuyến tính (linearly dependent)**.

### 3.3 Tại sao định nghĩa lại theo cách "bằng 0" này?

Định nghĩa trực giác là "không vector nào viết được từ các vector còn lại". Cách hình thức là "phương trình $c_1 \mathbf{v}_1 + \cdots = \mathbf{0}$ chỉ có nghiệm tầm thường". Hai cách này tương đương — chứng minh ngắn:

- **($\Rightarrow$)** Giả sử tồn tại $(c_1, \ldots, c_k) \neq (0, \ldots, 0)$ với $c_1 \mathbf{v}_1 + \cdots + c_k \mathbf{v}_k = \mathbf{0}$. Không mất tổng quát, giả sử $c_1 \neq 0$. Khi đó:
  $$\mathbf{v}_1 = -\frac{c_2}{c_1}\mathbf{v}_2 - \frac{c_3}{c_1}\mathbf{v}_3 - \cdots - \frac{c_k}{c_1}\mathbf{v}_k$$
  → $\mathbf{v}_1$ viết được từ các vector còn lại → tập **phụ thuộc** theo định nghĩa trực giác.
- **($\Leftarrow$)** Ngược lại, nếu $\mathbf{v}_1 = a_2 \mathbf{v}_2 + \cdots + a_k \mathbf{v}_k$, viết lại:
  $$1 \cdot \mathbf{v}_1 + (-a_2)\mathbf{v}_2 + \cdots + (-a_k)\mathbf{v}_k = \mathbf{0}$$
  → có nghiệm $(1, -a_2, \ldots, -a_k) \neq (0, \ldots, 0)$ → tập phụ thuộc theo định nghĩa hình thức.

Hai định nghĩa **tương đương**, ta dùng cách hình thức vì nó dễ kiểm tra (giải hệ phương trình).

### 3.4 Walk-through bằng số cụ thể

**Ví dụ 1**: $\mathbf{v}_1 = (1, 0)$, $\mathbf{v}_2 = (0, 1)$ — độc lập?

Giải $c_1(1,0) + c_2(0,1) = (0,0)$ → $(c_1, c_2) = (0, 0)$. Chỉ có nghiệm tầm thường → **độc lập**.

**Ví dụ 2**: $\mathbf{v}_1 = (1, 2)$, $\mathbf{v}_2 = (2, 4)$ — độc lập?

Để ý $\mathbf{v}_2 = 2 \cdot \mathbf{v}_1$, nên $(-2) \cdot \mathbf{v}_1 + 1 \cdot \mathbf{v}_2 = (-2,-4) + (2,4) = (0,0)$. Tồn tại nghiệm không tầm thường $(c_1, c_2) = (-2, 1)$ → **phụ thuộc**. Hệ số phụ thuộc: $(-2, 1)$.

**Ví dụ 3**: $\mathbf{v}_1 = (1, 1)$, $\mathbf{v}_2 = (1, -1)$ — độc lập?

Giải $c_1(1,1) + c_2(1,-1) = (0,0)$:
$$\begin{aligned}
c_1 + c_2 &= 0 \\
c_1 - c_2 &= 0
\end{aligned}$$
Cộng hai vế: $2c_1 = 0 \Rightarrow c_1 = 0$. Thay vào: $c_2 = 0$. Chỉ có nghiệm tầm thường → **độc lập**.

**Ví dụ 4**: $\mathbf{v}_1 = (1, 0, 0)$, $\mathbf{v}_2 = (0, 1, 0)$, $\mathbf{v}_3 = (1, 1, 0)$ — độc lập?

Để ý $\mathbf{v}_3 = \mathbf{v}_1 + \mathbf{v}_2$, viết lại: $1 \cdot \mathbf{v}_1 + 1 \cdot \mathbf{v}_2 + (-1) \cdot \mathbf{v}_3 = \mathbf{0}$. Có nghiệm $(1, 1, -1) \neq \mathbf{0}$ → **phụ thuộc**. Trực giác: 3 vector cùng nằm trên mặt phẳng $z = 0$, một mặt phẳng chỉ "chứa" được 2 hướng độc lập, vector thứ 3 chắc chắn thừa.

**Ví dụ 5**: $\mathbf{v}_1 = (1, 0, 0)$, $\mathbf{v}_2 = (0, 1, 0)$, $\mathbf{v}_3 = (0, 0, 1)$ — độc lập?

Giải $c_1(1,0,0) + c_2(0,1,0) + c_3(0,0,1) = (0,0,0)$:
$$c_1 = 0, \quad c_2 = 0, \quad c_3 = 0$$
Chỉ có nghiệm tầm thường → **độc lập**. Đây là standard basis của $\mathbb{R}^3$.

**Ví dụ 6**: $\mathbf{v}_1 = (1, 2, 3)$, $\mathbf{v}_2 = (4, 5, 6)$, $\mathbf{v}_3 = (7, 8, 9)$ — độc lập?

Để ý $\mathbf{v}_3 - 2\mathbf{v}_2 + \mathbf{v}_1 = (7-8+1, 8-10+2, 9-12+3) = (0, 0, 0)$. Tồn tại $(1, -2, 1) \neq \mathbf{0}$ → **phụ thuộc**. (Đây là một ví dụ kinh điển — mọi hàng của ma trận $\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$ đều phụ thuộc tuyến tính.)

**Ví dụ 7**: $\mathbf{v}_1 = (1, 0)$, $\mathbf{v}_2 = (0, 1)$, $\mathbf{v}_3 = (1, 1)$ — độc lập?

Trong $\mathbb{R}^2$, có nhiều hơn 2 vector → chắc chắn phụ thuộc. Cụ thể: $\mathbf{v}_3 = \mathbf{v}_1 + \mathbf{v}_2$ → $1 \cdot \mathbf{v}_1 + 1 \cdot \mathbf{v}_2 + (-1) \cdot \mathbf{v}_3 = \mathbf{0}$. **Phụ thuộc**.

**Định lý**: trong $\mathbb{R}^n$, mọi tập có **nhiều hơn $n$ vector** đều phụ thuộc tuyến tính.

> ❓ **Câu hỏi tự nhiên 1**: "Nếu tập có vector 0 thì sao?" — Luôn phụ thuộc. Vì $1 \cdot \mathbf{0} + 0 \cdot \mathbf{v}_1 + \cdots + 0 \cdot \mathbf{v}_k = \mathbf{0}$ với hệ số $(1, 0, 0, \ldots) \neq \mathbf{0}$.

> ❓ **Câu hỏi tự nhiên 2**: "Nếu 2 vector trong tập trùng nhau thì sao?" — Phụ thuộc. Nếu $\mathbf{v}_1 = \mathbf{v}_2$, thì $1 \cdot \mathbf{v}_1 + (-1) \cdot \mathbf{v}_2 + 0 \cdot \mathbf{v}_3 + \cdots = \mathbf{0}$ với hệ số không tầm thường.

> ❓ **Câu hỏi tự nhiên 3**: "Tập 1 vector duy nhất có độc lập không?" — Có nếu vector đó $\neq \mathbf{0}$. Vì $c \cdot \mathbf{v} = \mathbf{0}$ với $\mathbf{v} \neq \mathbf{0}$ chỉ khi $c = 0$. Nếu $\mathbf{v} = \mathbf{0}$ thì tập $\{\mathbf{0}\}$ phụ thuộc (theo câu trên).

> ⚠ **Lỗi thường gặp 1**: nghĩ rằng "2 vector vuông góc thì độc lập". Đúng theo chiều xuôi (vuông góc $\Rightarrow$ độc lập, miễn cả 2 $\neq \mathbf{0}$), nhưng **ngược lại sai**: 2 vector độc lập **không nhất thiết** vuông góc. Ví dụ $(1,0)$ và $(1,1)$ độc lập nhưng không vuông góc.

> ⚠ **Lỗi thường gặp 2**: nhầm "phụ thuộc" với "cùng phương". Hai khái niệm này chỉ trùng khi xét **2 vector**. Với $\geq 3$ vector thì không nhất thiết: $\mathbf{v}_1 = (1,0,0)$, $\mathbf{v}_2 = (0,1,0)$, $\mathbf{v}_3 = (1,1,0)$ — không có 2 vector nào cùng phương, nhưng cả tập vẫn phụ thuộc (vì $\mathbf{v}_3 = \mathbf{v}_1 + \mathbf{v}_2$).

> 🔁 **Tự kiểm tra**: Xét $\mathbf{v}_1 = (2, 1)$, $\mathbf{v}_2 = (4, 3)$. Độc lập? <details><summary>Đáp án</summary>Giải $c_1(2,1) + c_2(4,3) = (0,0)$: hệ $2c_1+4c_2=0$, $c_1+3c_2=0$. Từ phương trình 2: $c_1 = -3c_2$. Thay vào pt 1: $-6c_2 + 4c_2 = -2c_2 = 0 \Rightarrow c_2 = 0 \Rightarrow c_1 = 0$. Chỉ nghiệm tầm thường → **độc lập**.</details>

### 📝 Tóm tắt mục 3

- Độc lập = phương trình $\sum_i c_i \mathbf{v}_i = \mathbf{0}$ chỉ có nghiệm tầm thường.
- Phụ thuộc = tồn tại bộ hệ số không phải toàn 0 cho tổng = 0; tương đương "ít nhất 1 vector viết được từ các vector khác".
- Tập chứa vector 0 → phụ thuộc.
- Tập có $> n$ vector trong $\mathbb{R}^n$ → phụ thuộc.
- Vuông góc $\Rightarrow$ độc lập (với vector khác 0); chiều ngược KHÔNG đúng.

---

## 4. Cách kiểm tra độc lập tuyến tính

Có 2 cách thực dụng. Cách 1 luôn dùng được; cách 2 chỉ dùng khi số vector = số chiều (ma trận vuông).

### 4.1 Cách 1: giải hệ phương trình (khử Gauss)

Xếp các vector $\mathbf{v}_1, \ldots, \mathbf{v}_k$ thành **các cột** của một ma trận $A$ cỡ $n \times k$. Phương trình $c_1 \mathbf{v}_1 + \cdots + c_k \mathbf{v}_k = \mathbf{0}$ chính là hệ $A \mathbf{c} = \mathbf{0}$ (với $\mathbf{c} = (c_1, \ldots, c_k)^\top$).

- Hệ này luôn có nghiệm tầm thường $\mathbf{c} = \mathbf{0}$.
- Tập **độc lập** $\Leftrightarrow$ đây là **nghiệm duy nhất** $\Leftrightarrow$ $A$ có rank đầy đủ theo cột $\Leftrightarrow$ khử Gauss cho ma trận $A$ không có cột "tự do" (free variable).

> Tham chiếu: [Algebra Lesson 08 — Hệ phương trình](../../01-Algebra/lesson-08-systems/) đã dạy cách khử Gauss và xác định nghiệm duy nhất / vô số nghiệm.

**Ví dụ áp dụng**: kiểm tra $\mathbf{v}_1 = (1, 2, 3)$, $\mathbf{v}_2 = (2, 4, 6)$, $\mathbf{v}_3 = (1, 0, 1)$ trong $\mathbb{R}^3$.

Xếp thành ma trận (cột):

$$A = \begin{bmatrix} 1 & 2 & 1 \\ 2 & 4 & 0 \\ 3 & 6 & 1 \end{bmatrix}$$

Khử Gauss:
- $R_2 \leftarrow R_2 - 2R_1$: $\begin{bmatrix} 1 & 2 & 1 \\ 0 & 0 & -2 \\ 3 & 6 & 1 \end{bmatrix}$
- $R_3 \leftarrow R_3 - 3R_1$: $\begin{bmatrix} 1 & 2 & 1 \\ 0 & 0 & -2 \\ 0 & 0 & -2 \end{bmatrix}$
- $R_3 \leftarrow R_3 - R_2$: $\begin{bmatrix} 1 & 2 & 1 \\ 0 & 0 & -2 \\ 0 & 0 & 0 \end{bmatrix}$

Cột 2 không có pivot → biến tự do $c_2$ → hệ có vô số nghiệm → **phụ thuộc**. Cụ thể: từ hàng 2, $-2c_3 = 0 \Rightarrow c_3 = 0$. Từ hàng 1, $c_1 + 2c_2 + c_3 = 0 \Rightarrow c_1 = -2c_2$. Chọn $c_2 = 1$ được $(c_1, c_2, c_3) = (-2, 1, 0)$. Kiểm: $-2 \cdot (1,2,3) + 1 \cdot (2,4,6) + 0 \cdot (1,0,1) = (0,0,0)$ ✓.

### 4.2 Cách 2: định thức (chỉ ma trận vuông)

Nếu số vector $k = n$ (số chiều), ma trận $A = [\mathbf{v}_1 \mid \mathbf{v}_2 \mid \cdots \mid \mathbf{v}_n]$ là vuông $n \times n$. Khi đó:

$$\begin{aligned}
\text{tập } \{\mathbf{v}_1, \ldots, \mathbf{v}_n\} \text{ độc lập} &\iff \det(A) \neq 0 \\
\text{tập } \{\mathbf{v}_1, \ldots, \mathbf{v}_n\} \text{ phụ thuộc} &\iff \det(A) = 0
\end{aligned}$$

(Định thức sẽ học chi tiết ở Lesson 06; ở đây chỉ cần biết công thức cho ma trận $2\times 2$ và $3\times 3$.)

**Định thức 2×2**: $\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$.

**Định thức 3×3** (Sarrus):

$$\det\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$$

**Ví dụ 1**: $\mathbf{v}_1 = (1, 2)$, $\mathbf{v}_2 = (3, 4)$. Ma trận $\begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$. $\det = 1 \cdot 4 - 3 \cdot 2 = 4 - 6 = -2 \neq 0$ → **độc lập**.

**Ví dụ 2**: $\mathbf{v}_1 = (1, 2)$, $\mathbf{v}_2 = (2, 4)$. Ma trận $\begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$. $\det = 1 \cdot 4 - 2 \cdot 2 = 0$ → **phụ thuộc**.

**Ví dụ 3**: $\mathbf{v}_1 = (1, 0, 0)$, $\mathbf{v}_2 = (1, 1, 0)$, $\mathbf{v}_3 = (1, 1, 1)$. Ma trận:

$$\begin{bmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{bmatrix}$$

$\det = 1 \cdot (1 \cdot 1 - 1 \cdot 0) - 1 \cdot (0 \cdot 1 - 1 \cdot 0) + 1 \cdot (0 \cdot 0 - 1 \cdot 0) = 1 \cdot 1 - 1 \cdot 0 + 1 \cdot 0 = 1 \neq 0$ → **độc lập**.

**Ví dụ 4**: $\mathbf{v}_1 = (1, 2, 3)$, $\mathbf{v}_2 = (4, 5, 6)$, $\mathbf{v}_3 = (7, 8, 9)$. Ma trận:

$$\begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$$

$\det = 1(5 \cdot 9 - 8 \cdot 6) - 4(2 \cdot 9 - 8 \cdot 3) + 7(2 \cdot 6 - 5 \cdot 3) = 1(45-48) - 4(18-24) + 7(12-15) = -3 + 24 - 21 = 0$ → **phụ thuộc** (khớp với kết quả mục 3.4 Ví dụ 6).

### 4.3 Khi nào dùng cách nào?

| Tình huống | Dùng cách | Lý do |
|------------|-----------|-------|
| $k = n$ (số vector = số chiều) | Định thức | Nhanh, công thức cố định |
| $k \neq n$ | Khử Gauss | Định thức không định nghĩa cho ma trận không vuông |
| Cần biết **hệ số phụ thuộc** cụ thể | Khử Gauss | Khử Gauss cho ra nghiệm; định thức chỉ cho "có/không" |
| Số vector lớn, dùng máy tính | Cả hai đều OK; thường là khử Gauss (rank) | Rank còn dùng được cho cả không vuông |

> ⚠ **Lỗi thường gặp**: dùng định thức cho ma trận không vuông. $\det$ chỉ định nghĩa cho ma trận vuông. Với $n \times k$ mà $n \neq k$, phải dùng rank / khử Gauss.

> 🔁 **Tự kiểm tra**: dùng định thức kiểm tra $\mathbf{v}_1 = (2, 1)$, $\mathbf{v}_2 = (4, 3)$. <details><summary>Đáp án</summary>Ma trận $\begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$, $\det = 2 \cdot 3 - 4 \cdot 1 = 6 - 4 = 2 \neq 0$ → độc lập (khớp với kết quả tự kiểm tra mục 3).</details>

### 📝 Tóm tắt mục 4

- Cách 1 (khử Gauss): xếp vector thành cột, khử Gauss, đếm pivot. Đầy đủ pivot = độc lập.
- Cách 2 (định thức): chỉ dùng khi vuông. $\det \neq 0$ $\Leftrightarrow$ độc lập.
- Định thức chỉ cho biết có/không; khử Gauss còn cho ra hệ số phụ thuộc cụ thể.

---

## 5. Basis — cơ sở của một không gian

### 5.1 Trực giác

> 💡 **Hình dung**: một thành phố cần một hệ "đường gốc" (đường Bắc-Nam, đường Đông-Tây). Mọi địa chỉ trong thành phố được mô tả bằng "đi $c_1$ block theo đường Bắc-Nam, rồi $c_2$ block theo đường Đông-Tây". Hai đường gốc này là **basis**. Yêu cầu: (1) cả 2 đường không trùng nhau (độc lập), (2) bằng cách chỉ đi theo 2 hướng này, ta đến được **mọi nơi** trong thành phố (span = thành phố). Bỏ một đường — không tới được nhiều địa chỉ. Thêm đường thứ 3 — thừa, vì 2 đường kia đã đủ.

### 5.2 Định nghĩa hình thức

Một tập vector $B = \{\mathbf{b}_1, \ldots, \mathbf{b}_k\} \subset V$ ($V$ là một không gian vector — ví dụ $V = \mathbb{R}^n$ hoặc một subspace của $\mathbb{R}^n$) gọi là **basis (cơ sở)** của $V$ nếu thỏa mãn cả **2 điều kiện**:

1. **Độc lập tuyến tính**: $\{\mathbf{b}_1, \ldots, \mathbf{b}_k\}$ độc lập.
2. **Span đầy đủ**: $\operatorname{span}(\mathbf{b}_1, \ldots, \mathbf{b}_k) = V$.

### 5.3 Định lý nền tảng: biểu diễn duy nhất

Nếu $B = \{\mathbf{b}_1, \ldots, \mathbf{b}_k\}$ là basis của $V$, thì **mọi vector $\mathbf{v} \in V$ viết được DUY NHẤT** dưới dạng:

$$\mathbf{v} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2 + \cdots + c_k \mathbf{b}_k$$

Bộ $(c_1, \ldots, c_k)$ gọi là **toạ độ của $\mathbf{v}$ trong basis $B$**, ký hiệu $[\mathbf{v}]_B$.

**Chứng minh** (sự tồn tại + duy nhất):

- **Tồn tại**: vì $\operatorname{span}(B) = V$ nên mọi $\mathbf{v}$ đều có ít nhất một biểu diễn.
- **Duy nhất**: giả sử có 2 biểu diễn $\mathbf{v} = c_1 \mathbf{b}_1 + \cdots + c_k \mathbf{b}_k = d_1 \mathbf{b}_1 + \cdots + d_k \mathbf{b}_k$. Trừ hai vế: $(c_1 - d_1)\mathbf{b}_1 + \cdots + (c_k - d_k)\mathbf{b}_k = \mathbf{0}$. Vì $B$ độc lập, mọi hệ số phải = 0, tức $c_i = d_i$ $\forall i$. Hai biểu diễn trùng nhau.

> ❓ **Câu hỏi tự nhiên**: "Tại sao cả 2 điều kiện đều quan trọng?" — Bỏ một trong hai sẽ hỏng:
> - Chỉ độc lập, không span: thiếu vector → có $\mathbf{v} \in V$ không biểu diễn được. Ví dụ $B = \{(1,0)\}$ trong $V = \mathbb{R}^2$: độc lập nhưng không span được toàn $\mathbb{R}^2$, $(0,1)$ không viết được.
> - Chỉ span, không độc lập: thừa vector → biểu diễn không duy nhất. Ví dụ $B = \{(1,0), (0,1), (1,1)\}$ trong $\mathbb{R}^2$: span đủ nhưng phụ thuộc, vector $(2,3)$ viết được nhiều cách: $2(1,0) + 3(0,1) + 0(1,1)$ hoặc $1(1,0) + 2(0,1) + 1(1,1)$ hoặc $0(1,0) + 1(0,1) + 2(1,1)$ ...

### 5.4 Standard basis của `ℝⁿ`

Basis quen thuộc nhất:

$$\begin{aligned}
\mathbf{e}_1 &= (1, 0, 0, \ldots, 0) \\
\mathbf{e}_2 &= (0, 1, 0, \ldots, 0) \\
\mathbf{e}_3 &= (0, 0, 1, \ldots, 0) \\
&\;\;\vdots \\
\mathbf{e}_n &= (0, 0, 0, \ldots, 1)
\end{aligned}$$

Gồm $n$ vector, mỗi $\mathbf{e}_i$ có thành phần thứ $i$ = 1, các thành phần khác = 0. Đây gọi là **standard basis (cơ sở chuẩn)** của $\mathbb{R}^n$. Mọi vector $\mathbf{v} = (v_1, v_2, \ldots, v_n)$ viết:

$$\mathbf{v} = v_1 \mathbf{e}_1 + v_2 \mathbf{e}_2 + \cdots + v_n \mathbf{e}_n$$

Tức là: toạ độ trong standard basis chính là các thành phần của vector. Đó là lý do ta "luôn" nhìn vector dưới dạng các thành phần — vì đang ngầm dùng standard basis.

### 5.5 Walk-through tìm basis cho subspace

**Ví dụ 1**: Tìm basis cho $V = \{(x, 0) : x \in \mathbb{R}\}$ (trục Ox trong $\mathbb{R}^2$).

Mọi vector trong $V$ có dạng $(x, 0) = x \cdot (1, 0)$. Tập $\{(1, 0)\}$ span đủ $V$. Và một tập 1 vector $\neq \mathbf{0}$ luôn độc lập. → Basis: $\{(1, 0)\}$. Dimension = 1.

**Ví dụ 2**: Tìm basis cho $V = \{(x, y, 0) : x, y \in \mathbb{R}\}$ (mặt phẳng Oxy trong $\mathbb{R}^3$).

Mọi vector trong $V$: $(x, y, 0) = x(1,0,0) + y(0,1,0)$. Tập $\{(1,0,0), (0,1,0)\}$ span đủ $V$; độc lập (xem mục 3.4 Ví dụ 5). → Basis: $\{(1,0,0), (0,1,0)\}$. Dimension = 2.

**Ví dụ 3**: Tìm basis cho $V = \{(x, y, z) : x + y + z = 0\}$ (mặt phẳng qua gốc trong $\mathbb{R}^3$).

Từ ràng buộc $z = -x - y$, mọi vector: $(x, y, -x-y) = x(1, 0, -1) + y(0, 1, -1)$. Tập $\{(1, 0, -1), (0, 1, -1)\}$ span đủ $V$. Kiểm tra độc lập: $c_1(1,0,-1) + c_2(0,1,-1) = (c_1, c_2, -c_1-c_2) = (0,0,0) \Rightarrow c_1 = c_2 = 0$. → Basis: $\{(1,0,-1), (0,1,-1)\}$. Dimension = 2.

**Ví dụ 4**: Tìm basis cho $V = \{(t, 2t, 3t) : t \in \mathbb{R}\}$ (đường thẳng trong $\mathbb{R}^3$).

$(t, 2t, 3t) = t \cdot (1, 2, 3)$. Basis: $\{(1, 2, 3)\}$. Dimension = 1.

### 5.6 Một số basis "phi chuẩn" của `ℝ²`

Standard basis không phải basis duy nhất của $\mathbb{R}^2$. Mọi tập 2 vector độc lập trong $\mathbb{R}^2$ đều là một basis.

- $B_1 = \{(1, 1), (1, -1)\}$ — basis xoay 45°.
- $B_2 = \{(2, 0), (0, 3)\}$ — basis "kéo dài" theo trục.
- $B_3 = \{(1, 0), (1, 1)\}$ — basis "nghiêng".

Cùng vector $\mathbf{v} = (3, 1)$ có toạ độ khác nhau trong từng basis:

- Trong standard basis: $[\mathbf{v}]_E = (3, 1)$.
- Trong $B_1$: giải $c_1(1,1) + c_2(1,-1) = (3,1)$ → $c_1+c_2=3$, $c_1-c_2=1$ → $c_1=2, c_2=1$. Vậy $[\mathbf{v}]_{B_1} = (2, 1)$.
- Trong $B_2$: giải $c_1(2,0) + c_2(0,3) = (3,1)$ → $c_1 = 1.5, c_2 = \frac{1}{3}$. Vậy $[\mathbf{v}]_{B_2} = (1.5, \frac{1}{3})$.
- Trong $B_3$: giải $c_1(1,0) + c_2(1,1) = (3,1)$ → $c_1+c_2=3$, $c_2=1$ → $c_1=2, c_2=1$. Vậy $[\mathbf{v}]_{B_3} = (2, 1)$.

Cùng một mũi tên trong mặt phẳng — chỉ là **thước đo khác nhau** thì cho ra **toạ độ khác nhau**. Vector không đổi.

> ⚠ **Lỗi thường gặp**: nghĩ rằng "vector và toạ độ là một". Vector là đối tượng hình học (mũi tên / điểm); toạ độ là cặp số phụ thuộc vào basis ta chọn. Đây là điểm chuyển hoá tư duy quan trọng nhất bài này.

> 🔁 **Tự kiểm tra**: Tìm basis cho $V = \{(a, b, a+b) : a, b \in \mathbb{R}\}$. <details><summary>Đáp án</summary>$(a, b, a+b) = a(1,0,1) + b(0,1,1)$. Basis $\{(1,0,1), (0,1,1)\}$, dimension 2.</details>

### 📝 Tóm tắt mục 5

- Basis = độc lập + span đủ $V$.
- Trong basis $B$, mỗi vector có **duy nhất** một bộ toạ độ.
- Standard basis của $\mathbb{R}^n$ = $\{\mathbf{e}_1, \ldots, \mathbf{e}_n\}$.
- Một không gian có **vô số** basis khác nhau.

---

## 6. Dimension — số chiều

### 6.1 Định nghĩa

**Dimension (số chiều)** của một không gian vector $V$, ký hiệu $\dim(V)$, là **số phần tử trong một basis của $V$**.

Tức là: chọn một basis bất kỳ, đếm số vector — đó là dimension.

### 6.2 Định lý: dim không phụ thuộc cách chọn basis

> **Định lý (nền tảng)**: mọi basis của cùng một không gian $V$ đều có cùng số phần tử.

**Phác thảo chứng minh** (không đi sâu, vì cần lý thuyết hệ phương trình — nhưng ý chính):

Giả sử $V$ có 2 basis $B_1 = \{\mathbf{b}_1, \ldots, \mathbf{b}_m\}$ và $B_2 = \{\mathbf{b}'_1, \ldots, \mathbf{b}'_n\}$. Vì $B_2 \subset V = \operatorname{span}(B_1)$, mỗi $\mathbf{b}'_j$ viết được dưới dạng combination của $B_1$ — tạo thành ma trận hệ số $M$ cỡ $m \times n$. Nếu $n > m$, hệ $M\mathbf{x} = \mathbf{0}$ (với $\mathbf{x} \in \mathbb{R}^n$) có nhiều ẩn hơn phương trình → có nghiệm không tầm thường → $B_2$ phụ thuộc → mâu thuẫn (vì basis phải độc lập). Vậy $n \leq m$. Tương tự $m \leq n$. Suy ra $m = n$.

### 6.3 Một số ví dụ dimension

| Không gian | Basis | dim |
|------------|-------|-----|
| $\mathbb{R}^1$ | $\{1\}$ (hoặc $\{\mathbf{e}_1\}$) | 1 |
| $\mathbb{R}^2$ | $\{(1,0), (0,1)\}$ | 2 |
| $\mathbb{R}^3$ | $\{(1,0,0), (0,1,0), (0,0,1)\}$ | 3 |
| $\mathbb{R}^n$ | $\{\mathbf{e}_1, \ldots, \mathbf{e}_n\}$ | $n$ |
| Trục Ox trong $\mathbb{R}^2$ | $\{(1,0)\}$ | 1 |
| Mặt phẳng $z = 0$ trong $\mathbb{R}^3$ | $\{(1,0,0), (0,1,0)\}$ | 2 |
| $\{(t, 2t, 3t)\}$ trong $\mathbb{R}^3$ | $\{(1,2,3)\}$ | 1 |
| $\{\mathbf{0}\}$ (không gian zero) | $\{\}$ (tập rỗng) | 0 |

### 6.4 Tính chất quan trọng

- $\dim(V) \leq \dim$ của không gian xung quanh. Subspace của $\mathbb{R}^n$ luôn có $\dim \leq n$.
- Nếu $W \subset V$ là subspace thật sự ($W \neq V$) thì $\dim(W) < \dim(V)$.
- Trong $\mathbb{R}^n$, tập có $< n$ vector **không thể** span đủ; tập có $> n$ vector **không thể** độc lập. Tập đúng $n$ vector: độc lập $\Leftrightarrow$ span đủ $\Leftrightarrow$ là basis (chỉ cần kiểm tra 1 trong 2 điều kiện).

> ❓ **Câu hỏi tự nhiên**: "Có không gian vô hạn chiều không?" — Có. Ví dụ tập đa thức $\mathbb{R}[x]$ (mọi đa thức 1 biến) có basis $\{1, x, x^2, x^3, \ldots\}$ — vô hạn phần tử. Tầng 4 này chỉ làm việc với không gian hữu hạn chiều.

### 📝 Tóm tắt mục 6

- $\dim(V)$ = số phần tử trong một basis bất kỳ của $V$.
- Định lý: mọi basis của cùng $V$ có cùng số phần tử.
- Trong $\mathbb{R}^n$: subspace có thể có dim từ 0 (chỉ vector 0) tới $n$ (toàn $\mathbb{R}^n$).

---

## 7. Thay đổi basis (change of basis) — giới thiệu

Đây chỉ là **preview**; sẽ học chi tiết ở [Lesson 06](../lesson-06-matrix-as-transform/) và [Lesson 07](../lesson-07-eigenvectors/).

### 7.1 Ý tưởng

Cùng một vector hình học có **toạ độ khác nhau** trong các basis khác nhau (xem mục 5.6). Vậy có công thức chuyển đổi giữa các basis không? Có.

Cho $B = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ là basis của $\mathbb{R}^n$. Ma trận $P_B = [\mathbf{b}_1 \mid \mathbf{b}_2 \mid \cdots \mid \mathbf{b}_n]$ (xếp các vector basis thành cột) gọi là **change-of-basis matrix** từ $B$ sang standard basis.

$$\mathbf{v} = P_B \cdot [\mathbf{v}]_B$$

(Toạ độ standard của $\mathbf{v}$ = $P_B$ nhân với toạ độ trong $B$.)

Ngược lại:

$$[\mathbf{v}]_B = P_B^{-1} \cdot \mathbf{v}$$

### 7.2 Walk-through

$B = \{(1, 1), (1, -1)\}$, $\mathbf{v} = (3, 1)$ (trong standard).

$$P_B = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$$

$$P_B^{-1} = \frac{1}{\det} \cdot \begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} = \frac{1}{-2} \cdot \begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} \frac{1}{2} & \frac{1}{2} \\ \frac{1}{2} & -\frac{1}{2} \end{bmatrix}$$

$$[\mathbf{v}]_B = P_B^{-1} \cdot (3, 1) = \left(\tfrac{1}{2} \cdot 3 + \tfrac{1}{2} \cdot 1,\; \tfrac{1}{2} \cdot 3 - \tfrac{1}{2} \cdot 1\right) = (2, 1)$$

— khớp với mục 5.6.

### 7.3 Liên hệ Tầng 2 (rotation matrix)

[Trigonometry Lesson — Rotation matrix](../../02-Trigonometry/) đã dạy: ma trận xoay 1 góc $\theta$:

$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

Đây chính là **change-of-basis matrix** từ basis xoay $\{(\cos\theta, \sin\theta), (-\sin\theta, \cos\theta)\}$ sang standard basis. "Xoay vector" và "đổi basis" là 2 cách nhìn đối ngẫu của cùng một thao tác.

### 📝 Tóm tắt mục 7

- Đổi basis ↔ nhân với một ma trận khả nghịch.
- Ma trận xoay của Tầng 2 = một trường hợp đặc biệt của change-of-basis.
- Sẽ học sâu ở Lesson 06 (linear transformation) và Lesson 07 (eigenbasis).

---

## 8. Subspace — không gian con

### 8.1 Định nghĩa

$W \subset V$ ($V$ là không gian vector, ví dụ $V = \mathbb{R}^n$) là **subspace (không gian con)** của $V$ nếu thoả mãn cả 3 điều kiện:

1. **Chứa vector 0**: $\mathbf{0} \in W$.
2. **Đóng dưới phép cộng**: $\forall\, \mathbf{u}, \mathbf{v} \in W \Rightarrow \mathbf{u} + \mathbf{v} \in W$.
3. **Đóng dưới scalar multiplication**: $\forall\, \mathbf{v} \in W$, $\forall\, c \in \mathbb{R} \Rightarrow c \cdot \mathbf{v} \in W$.

Tương đương ngắn gọn: $W$ đóng dưới mọi linear combination.

### 8.2 Một số subspace điển hình của `ℝ³`

| Subspace | Mô tả | Dim |
|----------|-------|-----|
| $\{(0, 0, 0)\}$ | chỉ vector 0 | 0 |
| $\{(t, 0, 0) : t \in \mathbb{R}\}$ | trục Ox | 1 |
| $\{(t, 2t, 3t) : t \in \mathbb{R}\}$ | đường thẳng qua gốc theo $(1,2,3)$ | 1 |
| $\{(x, y, 0) : x, y \in \mathbb{R}\}$ | mặt phẳng Oxy | 2 |
| $\{(x, y, z) : x + y + z = 0\}$ | mặt phẳng qua gốc (hyperplane $A\mathbf{x} = \mathbf{0}$) | 2 |
| $\mathbb{R}^3$ toàn bộ | toàn không gian | 3 |

**Mọi subspace của $\mathbb{R}^3$** chỉ có thể là một trong 4 dạng: $\{\mathbf{0}\}$, đường thẳng qua gốc, mặt phẳng qua gốc, toàn $\mathbb{R}^3$.

### 8.3 Walk-through kiểm tra

**Ví dụ 1**: $W = \{(x, y) : y = 2x\}$ có là subspace của $\mathbb{R}^2$?

- Chứa 0? $(0, 0)$: $0 = 2 \cdot 0$ ✓.
- Đóng cộng? $(x_1, 2x_1) + (x_2, 2x_2) = (x_1+x_2, 2(x_1+x_2))$ — thoả $y = 2x$ ✓.
- Đóng scalar? $c \cdot (x, 2x) = (cx, 2cx)$ — thoả ✓.

→ Là subspace, dim = 1.

**Ví dụ 2**: $W = \{(x, y) : y = 2x + 1\}$ có là subspace?

- Chứa 0? $(0, 0)$: $0 = 2 \cdot 0 + 1 = 1$? Sai. **Không** chứa 0 → KHÔNG là subspace.

(Đường thẳng $y = 2x + 1$ không đi qua gốc → không subspace.)

**Ví dụ 3**: $W = \{(x, y) : x \geq 0\}$ (nửa mặt phẳng phải) có là subspace?

- Đóng scalar với $c < 0$? Lấy $\mathbf{v} = (1, 0) \in W$, $c = -1$: $c \cdot \mathbf{v} = (-1, 0)$ có $x = -1 < 0$ → không $\in W$. **Không** đóng scalar → KHÔNG là subspace.

**Ví dụ 4**: $W = \{(x, y) : x^2 + y^2 \leq 1\}$ (đĩa đơn vị) có là subspace?

- Đóng cộng? $(1, 0) + (0, 1) = (1, 1)$ có $1^2 + 1^2 = 2 > 1$ → không $\in W$. KHÔNG.

**Ví dụ 5**: $W = \{(x, y, z) : x + 2y - z = 0\}$ có là subspace của $\mathbb{R}^3$?

- Chứa 0: $0 + 0 - 0 = 0$ ✓.
- Đóng cộng: nếu $x_1+2y_1-z_1=0$ và $x_2+2y_2-z_2=0$, cộng: $(x_1+x_2) + 2(y_1+y_2) - (z_1+z_2) = 0$ ✓.
- Đóng scalar: nếu $x+2y-z=0$ thì $cx+2cy-cz = c(x+2y-z) = 0$ ✓.

→ Là subspace. Là mặt phẳng qua gốc. Tìm basis: từ $z = x + 2y$, mọi vector $(x, y, x+2y) = x(1,0,1) + y(0,1,2)$. Basis: $\{(1,0,1), (0,1,2)\}$. Dim = 2.

### 8.4 Hyperplane Ax = 0 — subspace tổng quát

Tổng quát: tập **nghiệm của hệ phương trình thuần nhất** $A\mathbf{x} = \mathbf{0}$ (với $A$ là ma trận cho trước) luôn là một subspace. Đây gọi là **null space (kernel)** của $A$ — sẽ học chi tiết ở [Lesson 06](../lesson-06-matrix-as-transform/).

Ngược lại, tập nghiệm của $A\mathbf{x} = \mathbf{b}$ với $\mathbf{b} \neq \mathbf{0}$ **không** là subspace (không chứa 0).

> ⚠ **Lỗi thường gặp**: nhầm "mặt phẳng" với "subspace 2 chiều". Mặt phẳng trong $\mathbb{R}^3$ chỉ là subspace **nếu đi qua gốc**. Mặt phẳng $z = 1$ (song song với Oxy nhưng cao hơn 1 đơn vị) **không** là subspace.

> 🔁 **Tự kiểm tra**: $W = \{(x, y, z) : 2x - y = 0 \text{ và } z = 0\}$ có là subspace? Tìm basis nếu có. <details><summary>Đáp án</summary>Chứa 0 ✓. Đóng cộng & scalar (cả 2 phương trình thuần nhất) ✓. Từ $y = 2x$, $z = 0$: vector dạng $(x, 2x, 0) = x(1, 2, 0)$. Basis $\{(1, 2, 0)\}$, dim = 1.</details>

### 📝 Tóm tắt mục 8

- Subspace = đóng dưới cộng + scalar; phải chứa 0.
- Subspace của $\mathbb{R}^n$ đi qua gốc.
- Mọi đường/mặt qua gốc trong $\mathbb{R}^3$ là subspace; không qua gốc thì không.
- Nghiệm của $A\mathbf{x} = \mathbf{0}$ là subspace; nghiệm của $A\mathbf{x} = \mathbf{b} \neq \mathbf{0}$ thì không.

---

## 9. Liên hệ với Machine Learning / AI

Đây là điểm nối quan trọng. Hiểu basis = hiểu vì sao PCA, embedding, regression đều "vận hành cùng cơ chế".

### 9.1 PCA — tìm basis tốt nhất cho dữ liệu

PCA (Principal Component Analysis) — sẽ học ở [Lesson 08](../lesson-08-pca-svd/) — đặt câu hỏi: cho tập dữ liệu trong $\mathbb{R}^n$, có **basis nào tốt hơn standard basis không**?

"Tốt hơn" nghĩa là: nếu ta vứt bớt vài chiều, mất ít thông tin nhất. Standard basis treat mọi chiều bình đẳng; PCA tìm basis sao cho chiều thứ nhất là hướng có **phương sai lớn nhất** của dữ liệu, chiều thứ hai là hướng có phương sai lớn thứ nhì (và vuông góc với chiều 1), v.v.

PCA = **đổi basis** từ standard sang basis của eigenvectors của ma trận hiệp phương sai. Sau khi đổi basis, vứt bớt chiều cuối (phương sai nhỏ) → giảm chiều mà giữ được hầu hết thông tin.

### 9.2 Embedding dimension trong NLP / Deep Learning

Khi nghe "embedding 768 chiều" (BERT) hay "1536 chiều" (OpenAI text-embedding-3), ý là: mỗi token / câu / tài liệu được biểu diễn bằng một vector trong $\mathbb{R}^{768}$ (hay $\mathbb{R}^{1536}$).

- Không gian này có dimension = 768 → có basis 768 vector.
- Mỗi thành phần của embedding = toạ độ theo một trục basis (mà mô hình tự học).
- 768 trục này KHÔNG phải standard basis có ý nghĩa — chúng là kết quả huấn luyện, mỗi trục thường không "đại diện cho 1 ý" rõ ràng (interpretable).

Câu chuyện về **dimensionality**: vì sao 768 chiều, không phải 10? Vì cần đủ "không gian" để các khái niệm khác nhau **độc lập tuyến tính** với nhau. 10 chiều quá ít, các vector embedding sẽ chồng lấn (phụ thuộc tuyến tính) → mô hình không phân biệt được tinh tế. 100,000 chiều thì lãng phí, không gian quá rỗng.

### 9.3 Linear regression — y ∈ span của cột X

Bài toán: cho ma trận đặc trưng $X$ cỡ $m \times n$ ($m$ mẫu, $n$ đặc trưng), nhãn $\mathbf{y} \in \mathbb{R}^m$. Tìm $\mathbf{w} \in \mathbb{R}^n$ sao cho $X\mathbf{w} \approx \mathbf{y}$.

Mọi vector dạng $X\mathbf{w}$ đều là một linear combination các cột của $X$ (với hệ số $\mathbf{w}$). Vậy $\{X\mathbf{w} : \mathbf{w} \in \mathbb{R}^n\} = \operatorname{span}(\text{các cột của } X)$ — đây là **column space** của $X$, một subspace của $\mathbb{R}^m$.

Linear regression = tìm vector trong column space gần $\mathbf{y}$ nhất theo L2 — chính là **projection** của $\mathbf{y}$ lên column space (đã học ở [Lesson 03](../lesson-03-norm-distance/)).

- Nếu cột của $X$ **độc lập** (rank đầy đủ) → nghiệm $\mathbf{w}$ duy nhất.
- Nếu cột $X$ **phụ thuộc** (multicollinearity) → vô số nghiệm $\mathbf{w}$ cho cùng giá trị $X\mathbf{w}$ (tệ cho diễn giải hệ số). Thực tế: phải thêm regularization (ridge, lasso) — sẽ học sau.

### 9.4 Word embedding và analogies

Phép tính nổi tiếng $\text{king} - \text{man} + \text{woman} \approx \text{queen}$ trong word2vec / GloVe — đây chính là **linear combination** của các vector embedding. Việc analogy "chạy được" ngụ ý: trong không gian embedding, hướng "gender" (woman - man) và hướng "royalty" gần như **độc lập tuyến tính** → có thể "cộng / trừ" mà không xung đột.

### 📝 Tóm tắt mục 9

- PCA = đổi basis để tối ưu phương sai.
- Embedding 768D = không gian 768 chiều, mỗi thành phần là toạ độ theo 1 trục basis (model học).
- Linear regression: $\mathbf{y} \approx$ projection của $\mathbf{y}$ lên column space của $X$.
- Word analogies = linear combination trong không gian embedding.

---

## 10. Bài tập

Mỗi bài có lời giải chi tiết ở mục **Lời giải** bên dưới.

**Bài 1.** Cho $\mathbf{v}_1 = (1, 2)$, $\mathbf{v}_2 = (3, -1)$. Viết vector $(7, 0)$ dưới dạng linear combination của $\mathbf{v}_1, \mathbf{v}_2$.

**Bài 2.** Kiểm tra tập $\{(1, 2, 3), (4, 5, 6), (1, 1, 1)\}$ độc lập hay phụ thuộc tuyến tính. Nếu phụ thuộc, tìm một hệ số phụ thuộc cụ thể.

**Bài 3.** $W = \{(x, y, z) \in \mathbb{R}^3 : 2x - y + 3z = 0\}$. Chứng minh $W$ là subspace; tìm basis và dimension.

**Bài 4.** Cho $B = \{(2, 1), (1, 3)\}$ là basis của $\mathbb{R}^2$. Tìm $[\mathbf{v}]_B$ (toạ độ trong $B$) của vector $\mathbf{v} = (5, 5)$.

**Bài 5.** Giải thích vì sao trong $\mathbb{R}^2$, mọi tập 3 vector đều phụ thuộc tuyến tính. (Dùng định nghĩa và lập luận theo hệ phương trình.)

**Bài 6.** Cho dataset 4 điểm 2D: $(1, 2), (2, 4), (3, 6), (4, 8)$. Coi mỗi điểm là một vector, gom 4 vector này thành ma trận và tìm rank. Liên hệ kết quả với khái niệm "đa cộng tuyến (multicollinearity)" trong linear regression: vì sao dataset này "tệ" để học hồi quy?

---

## Lời giải chi tiết

### Bài 1

Giải hệ $c_1(1, 2) + c_2(3, -1) = (7, 0)$:
$$\begin{aligned}
c_1 + 3c_2 &= 7 \\
2c_1 - c_2 &= 0 \;\Rightarrow\; c_2 = 2c_1
\end{aligned}$$

Thay vào pt 1: $c_1 + 6c_1 = 7c_1 = 7 \Rightarrow c_1 = 1$. Suy ra $c_2 = 2$.

**Kiểm tra**: $1 \cdot (1,2) + 2 \cdot (3,-1) = (1+6, 2-2) = (7, 0)$ ✓.

**Đáp án**: $(7, 0) = 1 \cdot \mathbf{v}_1 + 2 \cdot \mathbf{v}_2$.

### Bài 2

Xếp 3 vector thành cột của ma trận:

$$A = \begin{bmatrix} 1 & 4 & 1 \\ 2 & 5 & 1 \\ 3 & 6 & 1 \end{bmatrix}$$

**Cách 1: định thức** (vì ma trận vuông 3×3):
$$\begin{aligned}
\det(A) &= 1 \cdot (5 \cdot 1 - 1 \cdot 6) - 4 \cdot (2 \cdot 1 - 1 \cdot 3) + 1 \cdot (2 \cdot 6 - 5 \cdot 3) \\
&= 1 \cdot (5 - 6) - 4 \cdot (2 - 3) + 1 \cdot (12 - 15) \\
&= -1 + 4 - 3 \\
&= 0
\end{aligned}$$
→ **Phụ thuộc**.

**Cách 2: tìm hệ số phụ thuộc** (khử Gauss để có giá trị cụ thể):
- $R_2 \leftarrow R_2 - 2R_1$: $\begin{bmatrix} 1 & 4 & 1 \\ 0 & -3 & -1 \\ 3 & 6 & 1 \end{bmatrix}$
- $R_3 \leftarrow R_3 - 3R_1$: $\begin{bmatrix} 1 & 4 & 1 \\ 0 & -3 & -1 \\ 0 & -6 & -2 \end{bmatrix}$
- $R_3 \leftarrow R_3 - 2R_2$: $\begin{bmatrix} 1 & 4 & 1 \\ 0 & -3 & -1 \\ 0 & 0 & 0 \end{bmatrix}$

Đặt $c_3 = t$ (tự do). Từ $R_2$: $-3c_2 - c_3 = 0 \Rightarrow c_2 = -\frac{t}{3}$. Từ $R_1$: $c_1 + 4c_2 + c_3 = 0 \Rightarrow c_1 = -4\left(-\frac{t}{3}\right) - t = \frac{4t}{3} - t = \frac{t}{3}$.

Chọn $t = 3$: $(c_1, c_2, c_3) = (1, -1, 3)$. **Kiểm tra**: $1 \cdot (1,2,3) + (-1) \cdot (4,5,6) + 3 \cdot (1,1,1) = (1-4+3, 2-5+3, 3-6+3) = (0, 0, 0)$ ✓.

**Đáp án**: phụ thuộc; hệ số $(1, -1, 3)$, tức $\mathbf{v}_1 - \mathbf{v}_2 + 3\mathbf{v}_3 = \mathbf{0}$.

### Bài 3

**Chứng minh $W$ là subspace**:

- Chứa 0: $2 \cdot 0 - 0 + 3 \cdot 0 = 0$ ✓.
- Đóng cộng: $2(x_1+x_2) - (y_1+y_2) + 3(z_1+z_2) = (2x_1-y_1+3z_1) + (2x_2-y_2+3z_2) = 0+0 = 0$ ✓.
- Đóng scalar: $2(cx) - (cy) + 3(cz) = c(2x-y+3z) = c \cdot 0 = 0$ ✓.

→ Là subspace.

**Tìm basis**: từ ràng buộc $y = 2x + 3z$, mọi vector trong $W$: $(x, 2x+3z, z) = x(1, 2, 0) + z(0, 3, 1)$. Tập $\{(1,2,0), (0,3,1)\}$ span đủ $W$.

**Kiểm tra độc lập**: $c_1(1,2,0) + c_2(0,3,1) = (c_1, 2c_1+3c_2, c_2) = (0,0,0)$. Từ thành phần 1: $c_1 = 0$. Từ thành phần 3: $c_2 = 0$. → Độc lập.

**Đáp án**: Basis = $\{(1, 2, 0), (0, 3, 1)\}$, **$\dim(W) = 2$**.

### Bài 4

Giải $c_1(2, 1) + c_2(1, 3) = (5, 5)$:
$$\begin{aligned}
2c_1 + c_2 &= 5 \\
c_1 + 3c_2 &= 5
\end{aligned}$$

Nhân pt 1 với 3: $6c_1 + 3c_2 = 15$. Trừ pt 2: $5c_1 = 10 \Rightarrow c_1 = 2$. Thay: $c_2 = 5 - 4 = 1$.

**Kiểm tra**: $2 \cdot (2,1) + 1 \cdot (1,3) = (5, 5)$ ✓.

**Đáp án**: $[\mathbf{v}]_B = (2, 1)$.

### Bài 5

Giả sử $\mathbf{v}_1 = (a_1, a_2)$, $\mathbf{v}_2 = (b_1, b_2)$, $\mathbf{v}_3 = (c_1, c_2)$ là 3 vector tuỳ ý trong $\mathbb{R}^2$. Xét phương trình:

$$x_1 \mathbf{v}_1 + x_2 \mathbf{v}_2 + x_3 \mathbf{v}_3 = \mathbf{0}$$

Tách thành 2 phương trình theo thành phần:
$$\begin{aligned}
a_1 x_1 + b_1 x_2 + c_1 x_3 &= 0 \\
a_2 x_1 + b_2 x_2 + c_2 x_3 &= 0
\end{aligned}$$

Đây là hệ **2 phương trình, 3 ẩn**. Theo lý thuyết hệ tuyến tính ([Algebra Lesson 08](../../01-Algebra/lesson-08-systems/)): nếu số ẩn > số phương trình, hệ thuần nhất luôn có **vô số nghiệm**, đặc biệt có nghiệm khác $(0, 0, 0)$.

→ Tồn tại $(x_1, x_2, x_3) \neq \mathbf{0}$ thoả mãn → **phụ thuộc tuyến tính**.

**Tổng quát**: trong $\mathbb{R}^n$, bất kỳ tập nào có $> n$ vector đều phụ thuộc, vì hệ có $> n$ ẩn nhưng chỉ $n$ phương trình.

### Bài 6

4 vector: $(1,2), (2,4), (3,6), (4,8)$. Để ý: $(2,4) = 2 \cdot (1,2)$, $(3,6) = 3 \cdot (1,2)$, $(4,8) = 4 \cdot (1,2)$. Tất cả đều cùng phương $(1,2)$.

Gom thành ma trận (mỗi vector là một cột):

$$A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 6 & 8 \end{bmatrix}$$

Khử Gauss: $R_2 \leftarrow R_2 - 2R_1$: $\begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 0 & 0 \end{bmatrix}$. Chỉ có 1 pivot → **$\operatorname{rank}(A) = 1$**.

**Liên hệ với linear regression**: trong hồi quy $y = w_1 x_1 + w_2 x_2 + b$, nếu 2 đặc trưng $x_1, x_2$ có quan hệ $x_2 = 2x_1$ (hoàn toàn cộng tuyến), thì cột của ma trận thiết kế phụ thuộc tuyến tính. Hậu quả:

- Nghiệm $(w_1, w_2)$ **không duy nhất**: mọi cặp $(w_1, w_2)$ với $w_1 + 2w_2 = \text{const}$ cho cùng dự đoán.
- Diễn giải hệ số (feature importance) trở nên **vô nghĩa** — không thể nói "$x_1$ quan trọng hơn $x_2$" vì chỉ có hợp tuyến mới xác định.
- Nghịch ma trận $X^\top X$ **không khả nghịch** ($\det = 0$) → công thức nghiệm chuẩn $\mathbf{w} = (X^\top X)^{-1} X^\top \mathbf{y}$ không dùng được.

**Khắc phục**: bỏ đặc trưng dư thừa, hoặc dùng regularization (ridge regression: thêm $\lambda I$ vào $X^\top X$ để luôn khả nghịch).

**Bài học**: rank của ma trận đặc trưng = số "đặc trưng độc lập" thực sự. Đa cộng tuyến (multicollinearity) = cột phụ thuộc tuyến tính, tương đương rank thiếu.

---

## Liên kết

- **Lesson trước**: [Lesson 03 — Norm và khoảng cách](../lesson-03-norm-distance/)
- **Lesson tiếp theo**: [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) (sẽ dùng basis để biểu diễn linear map).
- **Sẽ gặp lại**:
  - [Lesson 06 — Ma trận = biến đổi](../lesson-06-matrix-as-transform/): column space, null space — đều là subspace.
  - [Lesson 07 — Eigenvector](../lesson-07-eigenvectors/): eigenvectors tạo thành một basis "đặc biệt" mà ma trận trở thành đường chéo.
  - [Lesson 08 — PCA & SVD](../lesson-08-pca-svd/): PCA = đổi sang basis của eigenvectors.
- **Tham chiếu chéo**:
  - [Algebra Lesson 08](../../01-Algebra/lesson-08-systems/): hệ phương trình tuyến tính — công cụ chính kiểm tra độc lập.
  - [Trigonometry — Rotation](../../02-Trigonometry/): rotation matrix = trường hợp đặc biệt của change-of-basis.

- **Visualization**: [visualization.html](./visualization.html) — span explorer, independence checker, basis explorer, subspace gallery.
