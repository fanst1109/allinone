# Lesson 03 — Norm và khoảng cách

> "Vector dài bao nhiêu?" — có nhiều cách trả lời. Bài này dạy 3 cách phổ biến nhất (L1, L2, L∞), cách đo khoảng cách giữa 2 vector, và vì sao chúng quan trọng cho machine learning.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Định nghĩa được **norm** của một vector theo nghĩa tổng quát — một hàm gán "độ lớn" cho vector, thỏa 3 tính chất.
- Tính được **L2 norm** (Euclidean — căn của tổng bình phương), **L1 norm** (Manhattan — tổng giá trị tuyệt đối), và **L∞ norm** (Chebyshev — max).
- Hiểu **Lₚ norm tổng quát** và cách 3 norm trên là các trường hợp đặc biệt khi $p = 1, 2, \infty$.
- Tính **khoảng cách (distance)** giữa 2 vector theo từng norm: $d(u, v) = \lVert u - v \rVert$.
- Chứng minh 3 tính chất của norm: không âm, đồng nhất, **bất đẳng thức tam giác** (dùng Cauchy-Schwarz cho L2).
- Vẽ được **unit ball** ($\{v : \lVert v \rVert = 1\}$) trong $\mathbb{R}^2$ của mỗi norm: L2 → đường tròn, L1 → hình thoi, L∞ → hình vuông.
- **Normalize** một vector: $\hat{v} = v / \lVert v \rVert$, ra vector cùng hướng có độ dài 1.
- Giải thích vì sao loss $\text{MSE} = \lVert y_{\text{pred}} - y_{\text{true}} \rVert_2^2$, vì sao **L1 regularization** tạo trọng số sparse, vì sao embedding hay được normalize trước khi dùng cosine similarity.

## Kiến thức tiền đề

- [Lesson 01 — Vectors](../lesson-01-vectors/): vector là gì, phép cộng/trừ, scalar multiplication.
- [Lesson 02 — Dot product](../lesson-02-dot-product/): $u \cdot v = u_1 v_1 + u_2 v_2 + \cdots$, công thức $u \cdot v = \lVert u \rVert \lVert v \rVert \cos\theta$, **cosine similarity**, **Cauchy-Schwarz** ($\lvert u \cdot v \rvert \le \lVert u \rVert \lVert v \rVert$). Bài này dùng lại cosine-Schwarz để chứng minh bất đẳng thức tam giác.
- Từ Tầng 1 — [Algebra Lesson 04](../../01-Algebra/lesson-04-powers-roots-logs/): căn bậc 2, lũy thừa phân số.
- Từ Tầng 1 — [Algebra Lesson 01](../../01-Algebra/lesson-01-numbers/): giá trị tuyệt đối.

---

## 1. "Độ dài" của vector — góc nhìn tổng quát

> 💡 **Trực giác**: bạn vẽ một mũi tên từ gốc tọa độ $(0, 0)$ ra điểm $(3, 4)$. Hỏi "mũi tên dài bao nhiêu?". Câu trả lời "5" (theo định lý Pythagoras $\sqrt{9+16} = 5$) chỉ là **một** trong nhiều cách trả lời. Nếu bạn đang ở Manhattan và phải đi bộ theo đường ô vuông, thực tế bạn đi **7 block** (3 ngang + 4 dọc). Nếu bạn là vua trên bàn cờ và mỗi nước đi 1 ô bất kỳ (kể cả chéo), bạn cần **4 nước**. Mỗi cách đo trả lời cùng câu hỏi "vector lớn cỡ nào" nhưng cho ra số khác nhau.

### 1.1. Norm là gì (định nghĩa hình thức)

Một **norm** trên $\mathbb{R}^n$ là một hàm $\lVert \cdot \rVert : \mathbb{R}^n \to \mathbb{R}$ (gán mỗi vector một số thực không âm) thỏa **3 tính chất** sau với mọi vector $u, v \in \mathbb{R}^n$ và mọi vô hướng $c \in \mathbb{R}$:

| # | Tính chất | Công thức | Nghĩa trực giác |
|---|-----------|-----------|-----------------|
| 1 | **Không âm + xác định dương** | $\lVert v \rVert \ge 0$, và $\lVert v \rVert = 0 \iff v = 0$ | Độ dài không bao giờ âm; chỉ vector 0 mới có độ dài 0 |
| 2 | **Đồng nhất (homogeneity)** | $\lVert c \cdot v \rVert = \lvert c \rvert \cdot \lVert v \rVert$ | Nhân vector với 2 thì dài gấp 2; nhân với −3 thì dài gấp 3 (vẫn dương) |
| 3 | **Bất đẳng thức tam giác** | $\lVert u + v \rVert \le \lVert u \rVert + \lVert v \rVert$ | Đi thẳng $u + v$ không bao giờ dài hơn đi qua đoạn $u$ rồi đoạn $v$ |

Bất kỳ hàm nào thỏa 3 tính chất này đều được gọi là norm. Vậy thì có **rất nhiều** norm cùng tồn tại trên cùng không gian $\mathbb{R}^n$. Bài này dạy 3 norm phổ biến nhất: L1, L2, L∞.

> ❓ **Tại sao cần nhiều norm?** Vì các bài toán thực tế đo "khoảng cách" khác nhau:
>
> - GPS định vị → L2 (khoảng cách đường chim bay).
> - Taxi đi trong thành phố ô vuông → L1.
> - Robot điều khiển 2 motor song song, motor chậm nhất quyết định thời gian → L∞.
> - Regularization trong ML: dùng L1 cho sparse, L2 cho smooth.

### 1.2. Ký hiệu

Có nhiều cách viết, tùy ngữ cảnh:

- $\lvert v \rvert$ — đơn giản, đôi khi bị nhầm với giá trị tuyệt đối của số.
- $\lVert v \rVert$ — chuẩn hơn (double bar), dùng phổ biến trong sách giáo khoa.
- $\lVert v \rVert_2$, $\lVert v \rVert_1$, $\lVert v \rVert_\infty$ — chỉ rõ là norm gì (L2, L1, L∞).

Nếu không ghi chỉ số, mặc định là **L2** (Euclidean) — vì đây là norm "thường thấy" nhất.

> 📝 **Tóm tắt mục 1**:
> - Norm = hàm gán "độ lớn" cho vector, thỏa 3 tính chất: $\ge 0$, đồng nhất, bất đẳng thức tam giác.
> - Có nhiều norm trên cùng $\mathbb{R}^n$ — mỗi norm phù hợp với 1 loại bài toán.
> - Ký hiệu mặc định $\lVert v \rVert = \lVert v \rVert_2$ (Euclidean).

---

## 2. L2 norm (Euclidean) — "đường chim bay"

### 2.1. Công thức

Với vector $v = (v_1, v_2, \ldots, v_n)$:

$$\lVert v \rVert_2 = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$$

Đây là khoảng cách Euclidean từ gốc tọa độ tới điểm $(v_1, \ldots, v_n)$. Nguồn gốc: định lý Pythagoras tổng quát hóa cho n chiều.

> 💡 **Trực giác**: trong 2D, $v = (3, 4)$ là một mũi tên ngang 3, dọc 4. Tam giác vuông có 2 cạnh góc vuông 3 và 4 → cạnh huyền $\sqrt{9+16} = 5$. Trong 3D, $v = (1, 2, 2)$ → $\sqrt{1+4+4} = \sqrt{9} = 3$. Nguyên lý y hệt, chỉ thêm chiều.

### 2.2. Liên hệ với dot product

Vì $v \cdot v = v_1^2 + v_2^2 + \cdots + v_n^2$ (xem [Lesson 02](../lesson-02-dot-product/)), ta có:

$$\begin{aligned}
\lVert v \rVert_2^2 &= v \cdot v \\
\lVert v \rVert_2 &= \sqrt{v \cdot v}
\end{aligned}$$

Đây là công thức rất quan trọng — dùng để **chứng minh** nhiều thứ về L2 norm thông qua tính chất của dot product (vốn dễ thao tác hơn).

### 2.3. Ví dụ tính

**Ví dụ 1**: $v = (3, 4)$ (2D).

$$\lVert v \rVert_2 = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

**Ví dụ 2**: $v = (1, 2, 2)$ (3D).

$$\lVert v \rVert_2 = \sqrt{1 + 4 + 4} = \sqrt{9} = 3$$

**Ví dụ 3**: $v = (-5, 12)$ (có thành phần âm — bình phương lên thành dương).

$$\lVert v \rVert_2 = \sqrt{25 + 144} = \sqrt{169} = 13$$

**Ví dụ 4**: $v = (1, 1, 1, 1)$ (4D, vector đều).

$$\lVert v \rVert_2 = \sqrt{1+1+1+1} = \sqrt{4} = 2$$

**Ví dụ 5**: $v = (0.6, 0.8)$ (vector nhỏ).

$$\lVert v \rVert_2 = \sqrt{0.36 + 0.64} = \sqrt{1} = 1$$

Vector này nằm trên đường tròn đơn vị — sẽ gặp lại ở mục normalize.

> ❓ **Câu hỏi tự nhiên của người đọc**:
>
> - *"Sao phải bình phương rồi mở căn? Cộng trực tiếp thì sao?"* — Vì cộng $v_1 + v_2$ cho ra một norm khác (L1, mục 3), không phải khoảng cách hình học. Bình phương + mở căn là công cụ của Pythagoras để ra đường chim bay đúng.
> - *"Nếu vector chỉ có 1 chiều, L2 norm là gì?"* — $\lVert v \rVert_2 = \sqrt{v_1^2} = \lvert v_1 \rvert$. Đúng bằng giá trị tuyệt đối.
> - *"L2 norm có đắt không?"* — $n$ phép nhân + $n$ phép cộng + 1 căn. $O(n)$. Với vector 768 chiều (embedding BERT base), khoảng 1000 phép tính cơ bản — rất rẻ.

> ⚠ **Lỗi thường gặp**:
> - Quên bình phương: $\lVert (3, 4) \rVert \ne 3 + 4 = 7$.
> - Bình phương rồi quên mở căn: $\lVert (3, 4) \rVert^2 = 25$, không phải $\lVert (3, 4) \rVert$. Phân biệt $\lVert v \rVert^2$ (bằng dot product, không cần căn) và $\lVert v \rVert$ (cần căn).
> - Quên trị tuyệt đối khi tổng quát hóa: thực ra L2 không cần $\lvert \cdot \rvert$ vì bình phương luôn $\ge 0$. Nhưng L1 và L∞ thì cần.

> 🔁 **Dừng lại tự kiểm tra**:
>
> 1. Tính $\lVert (0, 0, 5) \rVert_2$.
> 2. Vector $v = (1, 1)$ có $\lVert v \rVert_2 = ?$
> 3. $\lVert v \rVert_2^2$ viết bằng dot product là gì?
>
> <details>
> <summary>Đáp án</summary>
>
> 1. $\sqrt{0+0+25} = 5$.
> 2. $\sqrt{1+1} = \sqrt{2} \approx 1.414$.
> 3. $v \cdot v$.
> </details>

---

## 3. L1 norm (Manhattan / taxicab)

### 3.1. Công thức

$$\lVert v \rVert_1 = \lvert v_1 \rvert + \lvert v_2 \rvert + \cdots + \lvert v_n \rvert$$

Cộng giá trị tuyệt đối của tất cả thành phần.

> 💡 **Trực giác**: bạn ở Manhattan (New York). Đường phố tạo thành lưới ô vuông — bạn chỉ đi được ngang/dọc, không đi chéo. Nếu cần đến điểm cách 3 block đông và 4 block bắc, taxi của bạn đi $3 + 4 = 7$ block. Đó là **L1 norm**. Tên gọi khác: **taxicab norm**, **Manhattan norm**.

### 3.2. Ví dụ tính

**Ví dụ 1**: $v = (3, 4)$.

$$\lVert v \rVert_1 = \lvert 3 \rvert + \lvert 4 \rvert = 3 + 4 = 7$$

(So với L2 = 5: L1 luôn $\ge$ L2 vì không có "tắt qua đường chéo".)

**Ví dụ 2**: $v = (1, 2, 2)$.

$$\lVert v \rVert_1 = 1 + 2 + 2 = 5$$

(L2 của vector này = 3 → L1 = 5 lớn hơn, đúng.)

**Ví dụ 3**: $v = (-5, 12)$ — chú ý dấu trừ.

$$\lVert v \rVert_1 = \lvert -5 \rvert + \lvert 12 \rvert = 5 + 12 = 17$$

(L2 = 13. L1 = 17.)

**Ví dụ 4**: $v = (1, -1, 1, -1)$ (xen kẽ dấu).

$$\lVert v \rVert_1 = 1 + 1 + 1 + 1 = 4$$

(L2 = $\sqrt{4} = 2$. L1 gấp đôi L2.)

**Ví dụ 5**: $v = (0.5, 0.5)$.

$$\lVert v \rVert_1 = 0.5 + 0.5 = 1$$

Vector này nằm trên "hình thoi đơn vị" của L1 (sẽ thấy ở mục 9).

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Sao taxi không đi đường chéo?"* — Vì đường phố Manhattan thật sự kẻ ô vuông, không có đường chéo. Đây là analogy đời sống cho L1.
> - *"L1 và L2 quan hệ như thế nào?"* — Luôn có $\lVert v \rVert_2 \le \lVert v \rVert_1 \le \sqrt{n} \cdot \lVert v \rVert_2$ (đẳng thức trái khi v có 1 thành phần khác 0; phải khi v đều). Sẽ chứng minh ở bài tập.
> - *"Tại sao trị tuyệt đối?"* — Vì độ dài không âm. Nếu không có $\lvert \cdot \rvert$, vector $(1, -1)$ sẽ có "L1" = 0, vô lý.

> ⚠ **Lỗi thường gặp**: Quên trị tuyệt đối — $\lVert (3, -4) \rVert_1$ không phải $3 + (-4) = -1$, mà là $3 + 4 = 7$.

> 🔁 **Tự kiểm tra**:
>
> 1. Tính $\lVert (0, 0, 5) \rVert_1$.
> 2. Vector nào có $\lVert v \rVert_1 = \lVert v \rVert_2$? (Gợi ý: chỉ có 1 thành phần khác 0.)
>
> <details>
> <summary>Đáp án</summary>
>
> 1. $0 + 0 + 5 = 5$. (Tình cờ bằng L2 vì chỉ có 1 thành phần khác 0.)
> 2. Vector có dạng $(0, \ldots, 0, a, 0, \ldots, 0)$ — chỉ 1 thành phần khác 0. Khi đó $\lVert v \rVert_1 = \lvert a \rvert$, $\lVert v \rVert_2 = \sqrt{a^2} = \lvert a \rvert$.
> </details>

---

## 4. L∞ norm (Chebyshev / max norm)

### 4.1. Công thức

$$\lVert v \rVert_\infty = \max(\lvert v_1 \rvert, \lvert v_2 \rvert, \ldots, \lvert v_n \rvert)$$

Lấy thành phần có giá trị tuyệt đối lớn nhất.

> 💡 **Trực giác**: bạn là **vua trên bàn cờ**. Mỗi nước, vua đi được 1 ô theo bất kỳ hướng nào — ngang, dọc, hoặc chéo (8 hướng). Hỏi: vua cần bao nhiêu nước để đi từ $(0,0)$ đến $(3, 4)$? Đáp án: **4 nước** — vì vua đi chéo $(1,1)$ 3 lần đến $(3,3)$, rồi đi dọc 1 lần đến $(3,4)$. Tổng cộng 4 nước $= \max(3, 4)$. Đây chính là **L∞ norm** = Chebyshev distance.
>
> Một analogy khác: **2 robot motor chạy song song**. Motor 1 chạy 3 m, motor 2 chạy 4 m. Cả 2 chạy cùng tốc độ. Thời gian xong $= \max(3, 4) / v = 4 / v$. Motor nhanh hơn phải chờ motor chậm hơn. Chiều dài "bottleneck" quyết định thời gian.

### 4.2. Ví dụ tính

**Ví dụ 1**: $v = (3, 4)$.

$$\lVert v \rVert_\infty = \max(3, 4) = 4$$

So sánh: L1 = 7, L2 = 5, L∞ = 4 — $\lVert v \rVert_\infty \le \lVert v \rVert_2 \le \lVert v \rVert_1$ (đúng luôn — sẽ chứng minh ở bài tập).

**Ví dụ 2**: $v = (1, 2, 2)$.

$$\lVert v \rVert_\infty = \max(1, 2, 2) = 2$$

(L1 = 5, L2 = 3, L∞ = 2.)

**Ví dụ 3**: $v = (-5, 12)$.

$$\lVert v \rVert_\infty = \max(\lvert -5 \rvert, \lvert 12 \rvert) = \max(5, 12) = 12$$

**Ví dụ 4**: $v = (1, 1, 1, 1)$.

$$\lVert v \rVert_\infty = \max(1, 1, 1, 1) = 1$$

(L1 = 4, L2 = 2, L∞ = 1.)

**Ví dụ 5**: $v = (7, 0, 0, 0)$.

$$\lVert v \rVert_\infty = 7$$

(L1 = 7, L2 = 7 — cả ba bằng nhau khi chỉ có 1 thành phần.)

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Khi nào dùng L∞?"* — Khi bottleneck quan trọng: thời gian xử lý song song, sai số tối đa (max error), tolerance kiểm chứng.
> - *"L∞ có tên 'infinity' vì sao?"* — Vì $\lim_{p \to \infty} \lVert v \rVert_p = \max \lvert v_i \rvert$. Xem mục 5.
> - *"Vector có 2 thành phần bằng nhau và là max, $\lVert v \rVert_\infty = ?$"* — Vẫn là giá trị đó. $\max(3, 3, 1) = 3$.

> ⚠ **Lỗi thường gặp**: Nhầm max với min. L∞ là **max**, không phải min. Vector $(1, 100)$ có $\lVert v \rVert_\infty = 100$, không phải 1.

> 🔁 **Tự kiểm tra**:
>
> Tính L1, L2, L∞ của $v = (6, 8, 0)$.
>
> <details>
> <summary>Đáp án</summary>
>
> - L1 $= 6 + 8 + 0 = 14$.
> - L2 $= \sqrt{36 + 64 + 0} = \sqrt{100} = 10$.
> - L∞ $= \max(6, 8, 0) = 8$.
> - Kiểm: $\lVert v \rVert_\infty \le \lVert v \rVert_2 \le \lVert v \rVert_1 \iff 8 \le 10 \le 14$ ✓
> </details>

---

## 5. Lₚ norm tổng quát

### 5.1. Định nghĩa

Với $p \ge 1$, **Lₚ norm** (đọc là "L-p norm") định nghĩa:

$$\lVert v \rVert_p = \left( \lvert v_1 \rvert^p + \lvert v_2 \rvert^p + \cdots + \lvert v_n \rvert^p \right)^{1/p}$$

Tức là: lũy thừa p từng thành phần (đã lấy trị tuyệt đối), cộng lại, rồi mở căn bậc p.

> 💡 **Trực giác**: $p$ là "mức độ phạt" cho thành phần lớn. p càng cao → thành phần lớn càng quan trọng so với thành phần nhỏ.
> - $p = 1$: mọi thành phần "đóng góp" công bằng (chỉ cộng).
> - $p = 2$: thành phần lớn quan trọng hơn (do bình phương). Bù lại có "tính hình học" đẹp (Pythagoras).
> - $p \to \infty$: chỉ thành phần lớn nhất quan trọng — các thành phần nhỏ bị "nuốt" trong max.

### 5.2. 3 norm đã học là trường hợp đặc biệt

**$p = 1$**:

$$\lVert v \rVert_1 = \left( \lvert v_1 \rvert^1 + \lvert v_2 \rvert^1 + \cdots \right)^{1/1} = \lvert v_1 \rvert + \lvert v_2 \rvert + \cdots$$

Đây chính là L1.

**$p = 2$**:

$$\lVert v \rVert_2 = \left( \lvert v_1 \rvert^2 + \lvert v_2 \rvert^2 + \cdots \right)^{1/2} = \sqrt{v_1^2 + v_2^2 + \cdots}$$

Đây chính là L2. (Lưu ý: $\lvert v \rvert^2 = v^2$, không phụ thuộc dấu.)

**$p \to \infty$**:

$$\lVert v \rVert_\infty = \lim_{p \to \infty} \left( \lvert v_1 \rvert^p + \cdots + \lvert v_n \rvert^p \right)^{1/p} = \max \lvert v_i \rvert$$

Đây là L∞.

> ❓ **Tại sao p → ∞ ra max?** Walk-through bằng số:
>
> Cho $v = (3, 4)$. Tính $\lVert v \rVert_p$ cho vài giá trị p:
> | p | $\lVert v \rVert_p$ |
> |---|---------|
> | 1 | $3 + 4 =$ **7** |
> | 2 | $\sqrt{9 + 16} =$ **5** |
> | 4 | $(81 + 256)^{1/4} = 337^{0.25} \approx$ **4.285** |
> | 10 | $(3^{10} + 4^{10})^{1/10} = (59049 + 1048576)^{0.1} \approx$ **4.012** |
> | 100 | $\approx$ **4.000...** |
> | ∞ | $\max(3, 4) =$ **4** |
>
> Khi $p$ tăng, $4^p$ lấn át $3^p$ (vì $(4/3)^p \to \infty$), nên $(3^p + 4^p)^{1/p} \approx (4^p)^{1/p} = 4$. Đây là cách "phép max trỗi dậy" từ tổng có lũy thừa.

### 5.3. Tại sao p ≥ 1 (không phải p > 0)?

Với $0 < p < 1$, hàm $\left( \sum \lvert v_i \rvert^p \right)^{1/p}$ **không** thỏa bất đẳng thức tam giác. Ví dụ với $p = 0.5$, $u = (1, 0)$, $v = (0, 1)$:

$$\begin{aligned}
\lVert u \rVert_{0.5} &= (1^{0.5})^{1/0.5} = 1 \\
\lVert v \rVert_{0.5} &= 1 \\
\lVert u \rVert + \lVert v \rVert &= 2 \\
u + v &= (1, 1) \\
\lVert u+v \rVert_{0.5} &= (1^{0.5} + 1^{0.5})^{1/0.5} = 2^2 = 4
\end{aligned}$$

$4 > 2$ → vi phạm. Vậy với $p < 1$, hàm này **không phải norm** (thực ra gọi là "quasi-norm").

> 📝 **Tóm tắt mục 5**:
> - Lₚ norm $= \left( \sum \lvert v_i \rvert^p \right)^{1/p}$ cho $p \ge 1$.
> - L1, L2, L∞ là 3 trường hợp đặc biệt: $p = 1, 2, \infty$.
> - p tăng → ngày càng "thiên vị" thành phần lớn nhất.

---

## 6. Khoảng cách giữa 2 vector

### 6.1. Định nghĩa

**Khoảng cách (distance)** giữa 2 vector $u, v$ cảm ứng từ norm:

$$d(u, v) = \lVert u - v \rVert$$

Tức là: vẽ vector hiệu $u - v$, rồi đo norm của vector hiệu đó. Nếu $u, v$ nằm gần nhau, vector hiệu ngắn, khoảng cách nhỏ.

> 💡 **Trực giác**: bạn ở $u = (1, 1)$, người bạn ở $v = (4, 5)$. Vector "từ v đến u" là $u - v = (-3, -4)$. Khoảng cách (đường chim bay) là $\lVert (-3, -4) \rVert_2 = 5$.

Tùy norm chọn → khoảng cách khác nhau:

- $d_2(u, v) = \lVert u - v \rVert_2$ — **Euclidean distance**.
- $d_1(u, v) = \lVert u - v \rVert_1$ — **Manhattan distance**.
- $d_\infty(u, v) = \lVert u - v \rVert_\infty$ — **Chebyshev distance**.

### 6.2. Ví dụ Euclidean distance

**Ví dụ 1**: $u = (1, 2)$, $v = (4, 6)$.

$$\begin{aligned}
u - v &= (-3, -4) \\
d_2(u, v) &= \sqrt{9 + 16} = \sqrt{25} = 5
\end{aligned}$$

**Ví dụ 2**: $u = (0, 0, 0)$, $v = (1, 2, 2)$.

$$\begin{aligned}
u - v &= (-1, -2, -2) \\
d_2(u, v) &= \sqrt{1 + 4 + 4} = 3
\end{aligned}$$

(Nhận xét: khoảng cách từ gốc tọa độ đến $v$ $= \lVert v \rVert$.)

**Ví dụ 3**: $u = (3, 0)$, $v = (0, 4)$.

$$\begin{aligned}
u - v &= (3, -4) \\
d_2(u, v) &= \sqrt{9 + 16} = 5
\end{aligned}$$

**Ví dụ 4**: $u = (1.0, 2.0, 3.0)$, $v = (1.1, 2.1, 3.1)$. Hai vector rất gần.

$$\begin{aligned}
u - v &= (-0.1, -0.1, -0.1) \\
d_2(u, v) &= \sqrt{0.01 \times 3} = \sqrt{0.03} \approx 0.173
\end{aligned}$$

### 6.3. Ví dụ Manhattan distance

**Ví dụ 1**: $u = (1, 2)$, $v = (4, 6)$.

$$d_1(u, v) = \lvert 1-4 \rvert + \lvert 2-6 \rvert = 3 + 4 = 7$$

**Ví dụ 2**: $u = (0, 0)$, $v = (3, 4)$.

$$d_1(u, v) = 3 + 4 = 7$$

(Đi 3 ngang + 4 dọc.)

**Ví dụ 3**: $u = (5, 5)$, $v = (5, 5)$. Cùng vị trí.

$$d_1(u, v) = 0 + 0 = 0$$

**Ví dụ 4**: $u = (1, 2, 3, 4)$, $v = (2, 4, 6, 8)$.

$$d_1(u, v) = 1 + 2 + 3 + 4 = 10$$

### 6.4. Ví dụ Chebyshev distance

**Ví dụ 1**: $u = (1, 2)$, $v = (4, 6)$.

$$d_\infty(u, v) = \max(\lvert 1-4 \rvert, \lvert 2-6 \rvert) = \max(3, 4) = 4$$

(Vua trên bàn cờ cần 4 nước để từ $u$ tới $v$.)

**Ví dụ 2**: $u = (0, 0)$, $v = (10, 1)$.

$$d_\infty = \max(10, 1) = 10$$

**Ví dụ 3**: $u = (5, 5)$, $v = (5, 5)$. → $d_\infty = 0$.

**Ví dụ 4**: $u = (1, 1, 1)$, $v = (4, 5, 6)$.

$$d_\infty = \max(3, 4, 5) = 5$$

### 6.5. Tính chất của d (tự kế thừa từ norm)

Vì $d$ định nghĩa qua norm, nên $d$ thỏa:

- $d(u, v) \ge 0$, $d(u, v) = 0 \iff u = v$. (Từ tính chất 1 của norm.)
- $d(u, v) = d(v, u)$ (đối xứng — vì $\lVert u - v \rVert = \lVert -(v - u) \rVert = \lVert v - u \rVert$ do đồng nhất với $c = -1$).
- $d(u, w) \le d(u, v) + d(v, w)$ (**bất đẳng thức tam giác** cho khoảng cách).

Hàm $d$ thỏa 3 tính chất này gọi là **metric** trong toán. Khi đó $(\mathbb{R}^n, d)$ là một **không gian metric**.

> ⚠ **Lỗi thường gặp**:
> - Quên trừ trước khi norm: $d(u, v) = \lVert u \rVert - \lVert v \rVert$ là **SAI**. Đúng phải là $\lVert u - v \rVert$.
> - Phản ví dụ: $u = (1, 0)$, $v = (0, 1)$. $\lVert u \rVert_2 - \lVert v \rVert_2 = 1 - 1 = 0$, nhưng $\lVert u - v \rVert_2 = \lVert (1, -1) \rVert_2 = \sqrt{2} \ne 0$. Hai vector khác nhau nhưng cùng độ dài → khoảng cách phải $\ne 0$.

> 🔁 **Tự kiểm tra**:
>
> Cho $u = (2, 5)$, $v = (5, 1)$. Tính $d_1$, $d_2$, $d_\infty$.
>
> <details>
> <summary>Đáp án</summary>
>
> $u - v = (-3, 4)$.
> - $d_1 = 3 + 4 = 7$
> - $d_2 = \sqrt{9+16} = 5$
> - $d_\infty = \max(3, 4) = 4$
> </details>

---

## 7. Chứng minh 3 tính chất của norm

Ta chứng minh chi tiết cho L2 norm. L1, L∞ tương tự — dành làm bài tập.

### 7.1. Không âm và xác định dương

$\lVert v \rVert_2 = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$.

Mỗi $v_i^2 \ge 0$, nên tổng $\sum v_i^2 \ge 0$, do đó căn bậc 2 có nghĩa và $\lVert v \rVert_2 \ge 0$. ✓

**Khi nào $\lVert v \rVert_2 = 0$?**

$$\lVert v \rVert_2 = 0 \iff \sum v_i^2 = 0 \iff v_i^2 = 0 \ \forall i \iff v_i = 0 \ \forall i \iff v = 0. \quad \checkmark$$

(Bước "$v_i^2 = 0 \ \forall i$" dùng tính chất: tổng các số không âm = 0 ⇔ tất cả = 0.)

### 7.2. Đồng nhất (homogeneity)

Cần chứng minh $\lVert c \cdot v \rVert_2 = \lvert c \rvert \cdot \lVert v \rVert_2$.

$$\begin{aligned}
\lVert c \cdot v \rVert_2^2 &= (cv_1)^2 + (cv_2)^2 + \cdots + (cv_n)^2 \\
&= c^2 v_1^2 + c^2 v_2^2 + \cdots + c^2 v_n^2 \\
&= c^2 \cdot (v_1^2 + \cdots + v_n^2) \\
&= c^2 \cdot \lVert v \rVert_2^2
\end{aligned}$$

Mở căn bậc 2:

$$\lVert c \cdot v \rVert_2 = \sqrt{c^2} \cdot \sqrt{\lVert v \rVert_2^2} = \lvert c \rvert \cdot \lVert v \rVert_2$$

(Lưu ý: $\sqrt{c^2} = \lvert c \rvert$ chứ không phải $c$. Nếu $c = -3$, $\sqrt{9} = 3 = \lvert -3 \rvert$.) ✓

**Verify bằng số**: $v = (3, 4)$, $c = -2$. $c \cdot v = (-6, -8)$.
- $\lVert c \cdot v \rVert_2 = \sqrt{36 + 64} = \sqrt{100} = 10$.
- $\lvert c \rvert \cdot \lVert v \rVert_2 = 2 \cdot 5 = 10$. ✓

### 7.3. Bất đẳng thức tam giác (triangle inequality)

Cần chứng minh $\lVert u + v \rVert_2 \le \lVert u \rVert_2 + \lVert v \rVert_2$.

**Bước 1**: Bình phương vế trái (dùng $\lVert w \rVert_2^2 = w \cdot w$):

$$\begin{aligned}
\lVert u + v \rVert_2^2 &= (u + v) \cdot (u + v) \\
&= u \cdot u + 2(u \cdot v) + v \cdot v &&\text{(do dot product có tính phân phối)} \\
&= \lVert u \rVert_2^2 + 2(u \cdot v) + \lVert v \rVert_2^2
\end{aligned}$$

**Bước 2**: Áp dụng **Cauchy-Schwarz** (đã học ở [Lesson 02](../lesson-02-dot-product/)):

$$\lvert u \cdot v \rvert \le \lVert u \rVert_2 \cdot \lVert v \rVert_2$$

Suy ra $u \cdot v \le \lvert u \cdot v \rvert \le \lVert u \rVert_2 \cdot \lVert v \rVert_2$ (vì giá trị thực $\le$ trị tuyệt đối).

**Bước 3**: Thay vào:

$$\begin{aligned}
\lVert u + v \rVert_2^2 &\le \lVert u \rVert_2^2 + 2 \cdot \lVert u \rVert_2 \cdot \lVert v \rVert_2 + \lVert v \rVert_2^2 \\
&= (\lVert u \rVert_2 + \lVert v \rVert_2)^2
\end{aligned}$$

**Bước 4**: Hai vế đều không âm, mở căn:

$$\lVert u + v \rVert_2 \le \lVert u \rVert_2 + \lVert v \rVert_2 \quad \checkmark$$

**Khi nào dấu = xảy ra?** Khi $u \cdot v = \lVert u \rVert \cdot \lVert v \rVert$ (chứ không phải chỉ $\le$). Cauchy-Schwarz đạt = khi $u$, $v$ cùng phương cùng chiều ($v = c \cdot u$ với $c \ge 0$). Vậy $u + v$ đi thẳng $= \lVert u \rVert + \lVert v \rVert$ khi 2 vector cùng hướng.

**Verify bằng số**: $u = (3, 0)$, $v = (0, 4)$.
- $\lVert u \rVert_2 = 3$, $\lVert v \rVert_2 = 4$, tổng = 7.
- $u + v = (3, 4)$, $\lVert u+v \rVert_2 = 5$.
- $5 \le 7$ ✓ (bất đẳng thức nghiêm ngặt vì 2 vector không cùng hướng).

Verify với u, v cùng hướng: $u = (3, 0)$, $v = (6, 0)$. $\lVert u \rVert + \lVert v \rVert = 3+6 = 9$. $u+v = (9,0)$, $\lVert u+v \rVert = 9$. ✓ Đẳng thức.

> ❓ **Tại sao gọi là "bất đẳng thức tam giác"?**
>
> Trong tam giác có 3 cạnh $a, b, c$, ta luôn có $c \le a + b$ — không có cạnh nào dài hơn tổng 2 cạnh kia. Ở đây, $u$, $v$, $u + v$ tạo thành "tam giác" (mở từ gốc, đi qua đầu mút của $u$, rồi $u+v$). Bất đẳng thức $\lVert u+v \rVert \le \lVert u \rVert + \lVert v \rVert$ chính là "cạnh đi thẳng $\le$ tổng 2 cạnh đi vòng".

> 📝 **Tóm tắt mục 7**:
> - 3 tính chất norm: không âm + xác định, đồng nhất, bất đẳng thức tam giác.
> - Chứng minh L2 dùng Cauchy-Schwarz (Lesson 02).
> - Đẳng thức ở triangle inequality ⇔ 2 vector cùng hướng (dấu cùng dấu).

---

## 8. Hình dạng "unit ball"

### 8.1. Unit ball là gì

**Unit ball** (hình cầu đơn vị) của norm $\lVert \cdot \rVert$ là tập:

$$B = \{v \in \mathbb{R}^n : \lVert v \rVert \le 1\}$$

**Unit sphere** (mặt cầu đơn vị) là biên của unit ball:

$$S = \{v \in \mathbb{R}^n : \lVert v \rVert = 1\}$$

Trong $\mathbb{R}^2$ (2D), unit ball có hình dạng đặc trưng theo norm.

### 8.2. Unit ball của L2: đường tròn

$\lVert v \rVert_2 = 1 \iff \sqrt{v_1^2 + v_2^2} = 1 \iff v_1^2 + v_2^2 = 1$.

Đây là phương trình đường tròn tâm gốc, bán kính 1.

```
       L2: x² + y² = 1
              .
          .   |   .
        .     |     .
       .      |      .
      .       |       .
      .-------+-------.
      .       |       .
       .      |      .
        .     |     .
          .   |   .
              .
```

### 8.3. Unit ball của L1: hình thoi (diamond)

$\lVert v \rVert_1 = 1 \iff \lvert v_1 \rvert + \lvert v_2 \rvert = 1$.

Đây là phương trình hình thoi với 4 đỉnh $(1, 0)$, $(0, 1)$, $(-1, 0)$, $(0, -1)$.

```
       L1: |x| + |y| = 1
              .
             /|\
            / | \
           /  |  \
          /   |   \
        .-----+-----.
          \   |   /
           \  |  /
            \ | /
             \|/
              .
```

Cạnh hình thoi: từ $(1, 0)$ đến $(0, 1)$ — phương trình $x + y = 1$ với $x, y \ge 0$.

### 8.4. Unit ball của L∞: hình vuông

$\lVert v \rVert_\infty = 1 \iff \max(\lvert v_1 \rvert, \lvert v_2 \rvert) = 1$.

Đây là hình vuông từ $(-1, -1)$ đến $(1, 1)$.

```
       L∞: max(|x|, |y|) = 1
       .---------------.
       |       |       |
       |       |       |
       |       |       |
       .-------+-------.
       |       |       |
       |       |       |
       |       |       |
       .---------------.
```

### 8.5. Quan hệ "lồng nhau"

So sánh 3 unit ball trên cùng hệ trục:

```
            L∞ (vuông lớn nhất)
         .---------------.
         |               |
         |   L2 (tròn)   |
         |  .---------.  |
         |  | L1 thoi |  |
         |  |  /\     |  |
         |  | /  \    |  |
         |  |/    \   |  |
         |  +------+  |  |
         |  |\    /   |  |
         |  | \  /    |  |
         |  |  \/     |  |
         |  '---------'  |
         |               |
         '---------------'
```

(Lồng từ trong ra ngoài: L1 ⊂ L2 ⊂ L∞.)

> 💡 **Trực giác**: Vì sao L1 nằm trong L2, L2 nằm trong L∞? Vì $\lVert v \rVert_\infty \le \lVert v \rVert_2 \le \lVert v \rVert_1$ (chứng minh ở bài tập). Vector $v$ có $\lVert v \rVert_1 = 1$ thì $\lVert v \rVert_2 \le 1$ → $v$ cũng nằm trong L2 unit ball. Lý do hình học: muốn tổng $\lvert x \rvert + \lvert y \rvert = 1$ (L1) thì mỗi thành phần phải khá nhỏ → vector ngắn theo L2 và L∞. Ngược lại, muốn $\max(\lvert x \rvert, \lvert y \rvert) = 1$ (L∞) thì chỉ cần 1 thành phần lớn — vector có thể dài hơn theo L1 và L2.

> ❓ **Câu hỏi tự nhiên**:
>
> - *"Sao L1 có cạnh thẳng, L2 cong, L∞ thẳng góc?"* — Vì L2 có $v_i^2$ → curved. L1 và L∞ chỉ dùng $\lvert v_i \rvert$ và max → piecewise linear → cạnh thẳng.
> - *"Hình dạng này quan trọng vì sao?"* — Trong tối ưu hóa, hình dạng unit ball của penalty quyết định kết quả. **L1 có "góc nhọn" tại trục → nghiệm tối ưu hay rơi vào trục → sparse weights** (Lasso). L2 trơn → nghiệm phân tán đều.

> 🔁 **Tự kiểm tra**:
>
> Vector $v = (0.7, 0.7)$ có nằm trong L1 unit ball không? L2? L∞?
>
> <details>
> <summary>Đáp án</summary>
>
> - $\lVert v \rVert_1 = 0.7 + 0.7 = 1.4 > 1$ → **ngoài** L1.
> - $\lVert v \rVert_2 = \sqrt{0.49 + 0.49} = \sqrt{0.98} \approx 0.99 < 1$ → **trong** L2.
> - $\lVert v \rVert_\infty = \max(0.7, 0.7) = 0.7 < 1$ → **trong** L∞.
> </details>

> 📝 **Tóm tắt mục 8**:
> - Unit ball của L1: hình thoi. L2: tròn. L∞: vuông.
> - Lồng nhau: L1 ⊂ L2 ⊂ L∞ (cùng "radius 1").
> - Hình dạng quyết định hành vi regularization (mục 11).

---

## 9. Lₚ unit ball với p khác nhau (animation)

Khi $p$ tăng từ 1 đến $\infty$, unit ball biến hình từ **hình thoi** (L1) → **tròn** (L2) → **vuông** (L∞). Bảng số cụ thể, vector $(x, y)$ với $\lVert v \rVert_p = 1$:

| p | Hình dạng | Phương trình | Điểm $(0.7, ?)$ trên unit sphere |
|---|-----------|--------------|-----------------------------------|
| 1 | Thoi nhọn | $\lvert x \rvert + \lvert y \rvert = 1$ | $y = 0.3$ |
| 1.5 | Thoi tròn nhẹ | $\lvert x \rvert^{1.5} + \lvert y \rvert^{1.5} = 1$ | $y \approx 0.46$ |
| 2 | Tròn | $x^2 + y^2 = 1$ | $y \approx 0.714$ |
| 3 | "Bo tròn" | $\lvert x \rvert^3 + \lvert y \rvert^3 = 1$ | $y \approx 0.87$ |
| 5 | Gần vuông | $\lvert x \rvert^5 + \lvert y \rvert^5 = 1$ | $y \approx 0.96$ |
| ∞ | Vuông | $\max = 1$ | $y$ bất kỳ, miễn $\lvert y \rvert \le 1$, x cố định 0.7 cho điểm trên cạnh trên |

**Walk-through tính y khi p = 3, x = 0.7**:

$$\begin{aligned}
\lvert 0.7 \rvert^3 + \lvert y \rvert^3 &= 1 \\
0.343 + y^3 &= 1 \\
y^3 &= 0.657 \\
y &= 0.657^{1/3} \approx 0.870
\end{aligned}$$

Khi p càng lớn, để giữ tổng $\lvert x \rvert^p + \lvert y \rvert^p = 1$, thành phần lớn hơn (gần 1) chiếm ưu thế áp đảo. Thành phần nhỏ "ít ảnh hưởng" → vector bị "đẩy" ra ngoài để chạm cạnh vuông L∞.

Visualization sẽ cho slider p để thấy biến hình mượt mà.

---

## 10. Normalize vector

### 10.1. Định nghĩa

**Normalize** một vector $v \ne 0$ là chia nó cho norm của chính nó:

$$\hat{v} = \frac{v}{\lVert v \rVert}$$

Kết quả $\hat{v}$ (đọc là "v-hat") cùng hướng với $v$ nhưng có **độ dài 1** (gọi là **unit vector**).

> 💡 **Trực giác**: tách vector thành 2 phần — **hướng** (direction) và **độ lớn** (magnitude). $\hat{v}$ giữ hướng, vứt độ lớn. Giống "vector chỉ đường" trong GPS — bạn chỉ cần biết "đi hướng nào", còn "xa bao nhiêu" lưu riêng.

### 10.2. Kiểm chứng $\lVert \hat{v} \rVert = 1$

Dùng tính đồng nhất (mục 7.2):

$$\lVert \hat{v} \rVert = \left\lVert \frac{v}{\lVert v \rVert} \right\rVert = \left\lVert \frac{1}{\lVert v \rVert} \cdot v \right\rVert = \frac{1}{\lVert v \rVert} \cdot \lVert v \rVert = 1$$

(Dùng $c = 1/\lVert v \rVert > 0$ nên $\lvert c \rvert = c$.)

### 10.3. Walk-through ví dụ

**Ví dụ 1**: $v = (3, 4)$.

$$\begin{aligned}
\lVert v \rVert_2 &= 5 \\
\hat{v} &= (3/5, 4/5) = (0.6, 0.8)
\end{aligned}$$

Kiểm: $\lVert \hat{v} \rVert = \sqrt{0.36 + 0.64} = 1$ ✓

**Ví dụ 2**: $v = (1, 1)$.

$$\begin{aligned}
\lVert v \rVert_2 &= \sqrt{2} \\
\hat{v} &= (1/\sqrt{2}, 1/\sqrt{2}) \approx (0.707, 0.707)
\end{aligned}$$

Kiểm: $\lVert \hat{v} \rVert = \sqrt{0.5 + 0.5} = 1$ ✓

Vector này hướng 45° — trùng với $(\cos 45°, \sin 45°)$. Nhắc lại từ [Trigonometry](../../02-Trigonometry/) — mọi vector unit 2D đều có dạng $(\cos\theta, \sin\theta)$.

**Ví dụ 3**: $v = (0, 0, 5)$ (chỉ thành phần thứ 3 khác 0).

$$\begin{aligned}
\lVert v \rVert_2 &= 5 \\
\hat{v} &= (0, 0, 1)
\end{aligned}$$

**Ví dụ 4**: $v = (2, 0, -2, 0)$ (4D).

$$\begin{aligned}
\lVert v \rVert_2 &= \sqrt{4+0+4+0} = \sqrt{8} = 2\sqrt{2} \approx 2.828 \\
\hat{v} &= \left( \frac{2}{2\sqrt{2}}, 0, \frac{-2}{2\sqrt{2}}, 0 \right) = (1/\sqrt{2}, 0, -1/\sqrt{2}, 0) \approx (0.707, 0, -0.707, 0)
\end{aligned}$$

### 10.4. Khi nào normalize?

- **Cosine similarity**: với 2 vector đã normalize, $\cos\theta = u \cdot v$ (xem [Lesson 02](../lesson-02-dot-product/)). Đơn giản dot product là xong, khỏi chia. Embedding vector trong RAG thường lưu sẵn ở dạng normalized.
- **Trừ "magnitude bias"**: khi so 2 document, document dài sẽ có $\lVert v \rVert$ lớn — normalize để khỏi thiên vị document dài.
- **Gradient clipping**: khi gradient $g$ quá lớn, dùng $g \cdot \min(1, c/\lVert g \rVert)$ — đây là 1 dạng normalize có điều kiện.

> ⚠ **Lỗi thường gặp**:
> - Normalize vector 0 → chia cho 0! Phải check trước.
> - Quên dùng norm nào: thường L2. Nhưng bạn có thể "normalize theo L1" ($v / \lVert v \rVert_1$) trong một số ngữ cảnh (vd biến vector thành phân phối xác suất nếu các thành phần đều $\ge 0$).

> 🔁 **Tự kiểm tra**:
>
> Normalize $v = (6, 8)$.
>
> <details>
> <summary>Đáp án</summary>
>
> $\lVert v \rVert_2 = \sqrt{36+64} = 10$. $\hat{v} = (0.6, 0.8)$. Kiểm: $\lVert \hat{v} \rVert = \sqrt{0.36+0.64} = 1$ ✓
> </details>

---

## 11. Liên hệ ML/AI

### 11.1. L2 norm trong loss MSE

**Mean Squared Error (MSE)** — hàm loss kinh điển cho regression:

$$\begin{aligned}
\text{MSE} &= \frac{1}{n} \cdot \sum_i (y_{\text{pred},i} - y_{\text{true},i})^2 \\
&= \frac{1}{n} \cdot \lVert y_{\text{pred}} - y_{\text{true}} \rVert_2^2
\end{aligned}$$

Tức là: MSE = **bình phương L2 norm** của vector sai số, chia n. Tối thiểu MSE = tối thiểu khoảng cách Euclidean giữa dự đoán và thực tế.

**Tại sao bình phương, không dùng L2 thẳng?**
- L2 có căn → gradient phức tạp (cần chain rule qua căn).
- L2² không có căn → gradient gọn, dạng $2 \cdot (y_{\text{pred}} - y_{\text{true}})$ per component.
- Khi tối thiểu, min $\lVert x \rVert^2 \iff$ min $\lVert x \rVert$ (vì căn là hàm tăng) → kết quả tối ưu giống nhau.

Walk-through số: $y_{\text{pred}} = (3, 5, 4)$, $y_{\text{true}} = (2, 5, 3)$.

$$\begin{aligned}
e &= y_{\text{pred}} - y_{\text{true}} = (1, 0, 1) \\
\lVert e \rVert_2^2 &= 1 + 0 + 1 = 2 \\
\text{MSE} &= 2/3 \approx 0.667
\end{aligned}$$

### 11.2. L1 và L2 regularization

Trong linear regression, "regularization" là **thêm penalty** vào loss để tránh overfit. Có 2 dạng phổ biến:

**Ridge regression (L2 reg)**:

$$L_{\text{ridge}} = \text{MSE} + \lambda \cdot \lVert w \rVert_2^2$$

- Penalize trọng số lớn (vì bình phương).
- Trọng số shrink đều về gần 0 nhưng hiếm khi = 0.
- Nghiệm có dạng closed-form ($(X^\top X + \lambda I)^{-1} X^\top y$).

**Lasso regression (L1 reg)**:

$$L_{\text{lasso}} = \text{MSE} + \lambda \cdot \lVert w \rVert_1$$

- Penalize tổng giá trị tuyệt đối.
- Một số trọng số bị **đẩy về đúng 0** → **sparse weights**.
- Dùng cho feature selection: trọng số = 0 nghĩa là feature đó bị "loại".

**Tại sao L1 tạo sparse?** Vì hình dạng unit ball của L1 (hình thoi) có "góc nhọn" nằm trên trục. Khi tối ưu hóa MSE bị giới hạn $\lVert w \rVert_1 \le C$, nghiệm thường rơi vào các góc nhọn này → các thành phần khác trên trục = 0. L2 (tròn) không có góc → nghiệm rơi đều trên đường tròn.

Walk-through hình học (sẽ thấy ở viz mục 9 unit ball + bài tập):
- Đường mức MSE = ellip xung quanh nghiệm OLS.
- Bị giới hạn $\lVert w \rVert_1 \le C$ (hình thoi): ellip chạm hình thoi tại **góc** → 1 trục = 0.
- Bị giới hạn $\lVert w \rVert_2 \le C$ (tròn): ellip chạm đường tròn tại điểm tiếp xúc bất kỳ → cả 2 trục $\ne 0$.

### 11.3. Embedding normalize cho cosine similarity

Embedding (BERT, sentence-transformer, CLIP) thường được normalize trước khi lưu hoặc dùng:

$$\text{embedding}_{\text{normalized}} = \frac{\text{embedding}}{\lVert \text{embedding} \rVert_2}$$

Lý do: khi tìm "câu tương tự" (semantic search), ta dùng **cosine similarity**:

$$\cos(u, v) = \frac{u \cdot v}{\lVert u \rVert \cdot \lVert v \rVert}$$

Nếu cả 2 đã normalize ($\lVert u \rVert = \lVert v \rVert = 1$), công thức rút lại thành **dot product thuần**:

$$\cos(u, v) = u \cdot v$$

Lợi:
- Tính nhanh: 1 phép dot product thay vì dot + 2 norm.
- Vector database (Pinecone, Weaviate, FAISS) tối ưu cho dot product trên vector normalized — không phải tính lại norm mỗi query.
- Khoảng cách Euclidean trên vector normalize tương đương cosine: $\lVert u-v \rVert^2 = 2 - 2(u \cdot v) = 2(1 - \cos\theta)$ (sẽ chứng minh ở bài tập).

### 11.4. k-NN: Euclidean hay cosine?

Khi tìm "k điểm gần nhất" (k-Nearest Neighbors):

| Loại dữ liệu | Khoảng cách phù hợp | Lý do |
|--------------|---------------------|-------|
| Tọa độ vật lý (GPS, ảnh pixel) | Euclidean (L2) | Có ý nghĩa hình học rõ |
| Embedding (text, image) | Cosine | Chỉ "hướng" có ý nghĩa, magnitude phụ thuộc length câu / brightness ảnh |
| Bản đồ thành phố ô vuông | Manhattan (L1) | Phản ánh đường đi thực |
| Categorical / sparse features | Cosine hoặc Hamming | Magnitude ít ý nghĩa |

Nguyên tắc: **dữ liệu mà "hướng" quan trọng hơn "độ lớn"** → cosine. Ngược lại → Euclidean. Embedding rơi vào loại đầu vì sau khi học, vector dài ngắn không nói lên ngữ nghĩa.

> 📝 **Tóm tắt mục 11**:
> - MSE $= \lVert y_{\text{pred}} - y_{\text{true}} \rVert_2^2 / n$ — L2 distance bình phương.
> - L2 reg (Ridge) → shrink đều; L1 reg (Lasso) → sparse weights (góc nhọn của hình thoi).
> - Embedding normalize → cosine = dot product, nhanh hơn.
> - k-NN: Euclidean cho dữ liệu thô, cosine cho embedding.

---

## 12. Bài tập

### Bài 1 — Tính cơ bản

Cho $v = (2, -3, 6)$. Tính $\lVert v \rVert_1$, $\lVert v \rVert_2$, $\lVert v \rVert_\infty$.

### Bài 2 — Khoảng cách 3 norm

Cho $u = (1, 2, 3, 4)$, $v = (5, 4, 3, 2)$. Tính $d_1(u, v)$, $d_2(u, v)$, $d_\infty(u, v)$.

### Bài 3 — Normalize

Normalize $v = (1, 2, 2)$. Kiểm chứng $\lVert \hat{v} \rVert_2 = 1$.

### Bài 4 — Bất đẳng thức L∞ ≤ L2 ≤ L1

Chứng minh với mọi vector $v \in \mathbb{R}^n$:

$$\lVert v \rVert_\infty \le \lVert v \rVert_2 \le \lVert v \rVert_1 \le \sqrt{n} \cdot \lVert v \rVert_2 \le n \cdot \lVert v \rVert_\infty$$

### Bài 5 — Quan hệ Euclidean vs cosine cho vector normalized

Cho $u$, $v$ là 2 vector đã normalize ($\lVert u \rVert_2 = \lVert v \rVert_2 = 1$). Chứng minh:

$$\lVert u - v \rVert_2^2 = 2 \cdot (1 - \cos\theta)$$

trong đó $\theta$ là góc giữa $u$, $v$.

### Bài 6 — Sparse với L1

Trong $\mathbb{R}^2$, tìm điểm $(x, y)$ thuộc đường thẳng $x + 2y = 4$ sao cho $\lVert (x, y) \rVert_1$ nhỏ nhất. So sánh với nghiệm tối thiểu $\lVert (x, y) \rVert_2$.

---

## Lời giải chi tiết

### Bài 1

$v = (2, -3, 6)$.

- $\lVert v \rVert_1 = \lvert 2 \rvert + \lvert -3 \rvert + \lvert 6 \rvert = 2 + 3 + 6 = 11$.
- $\lVert v \rVert_2 = \sqrt{4 + 9 + 36} = \sqrt{49} = 7$.
- $\lVert v \rVert_\infty = \max(2, 3, 6) = 6$.

Kiểm: $\lVert v \rVert_\infty \le \lVert v \rVert_2 \le \lVert v \rVert_1 \iff 6 \le 7 \le 11$ ✓.

### Bài 2

$u - v = (1-5, 2-4, 3-3, 4-2) = (-4, -2, 0, 2)$.

- $d_1 = \lvert -4 \rvert + \lvert -2 \rvert + \lvert 0 \rvert + \lvert 2 \rvert = 4 + 2 + 0 + 2 = 8$.
- $d_2 = \sqrt{16 + 4 + 0 + 4} = \sqrt{24} = 2\sqrt{6} \approx 4.899$.
- $d_\infty = \max(4, 2, 0, 2) = 4$.

Kiểm: $4 \le 4.899 \le 8$ ✓.

### Bài 3

$v = (1, 2, 2)$.

- $\lVert v \rVert_2 = \sqrt{1 + 4 + 4} = \sqrt{9} = 3$.
- $\hat{v} = v / 3 = (1/3, 2/3, 2/3) \approx (0.333, 0.667, 0.667)$.

Kiểm: $\lVert \hat{v} \rVert_2 = \sqrt{(1/9) + (4/9) + (4/9)} = \sqrt{9/9} = \sqrt{1} = 1$ ✓.

### Bài 4

**Phần 1: $\lVert v \rVert_\infty \le \lVert v \rVert_2$**.

Gọi $M = \max \lvert v_i \rvert$ (tồn tại vì n hữu hạn). Khi đó $M^2 \le v_1^2 + v_2^2 + \cdots + v_n^2$ (vì một số trong tổng $= M^2$, các số còn lại $\ge 0$). Mở căn:

$$\begin{aligned}
M &\le \sqrt{\sum v_i^2} \\
\lVert v \rVert_\infty &\le \lVert v \rVert_2 \quad \checkmark
\end{aligned}$$

**Phần 2: $\lVert v \rVert_2 \le \lVert v \rVert_1$**.

Bình phương vế trái:

$$\lVert v \rVert_2^2 = \sum v_i^2$$

Bình phương vế phải:

$$\begin{aligned}
\lVert v \rVert_1^2 &= \left( \sum \lvert v_i \rvert \right)^2 = \sum v_i^2 + 2 \cdot \sum_{i<j} \lvert v_i \rvert \cdot \lvert v_j \rvert \\
&\ge \sum v_i^2 = \lVert v \rVert_2^2
\end{aligned}$$

(Bước trên dùng: $(a+b+c)^2 = a^2 + b^2 + c^2 + 2(ab+bc+ca) \ge a^2 + b^2 + c^2$ khi $a, b, c \ge 0$.)

Hai vế đều $\ge 0$, mở căn: $\lVert v \rVert_2 \le \lVert v \rVert_1$ ✓.

**Phần 3: $\lVert v \rVert_1 \le \sqrt{n} \cdot \lVert v \rVert_2$** — đây là **Cauchy-Schwarz** áp dụng cho vector $\lvert v \rvert = (\lvert v_1 \rvert, \ldots, \lvert v_n \rvert)$ và $e = (1, 1, \ldots, 1)$:

$$\begin{aligned}
\lvert v \rvert \cdot e &= \lvert v_1 \rvert \cdot 1 + \lvert v_2 \rvert \cdot 1 + \cdots + \lvert v_n \rvert \cdot 1 = \lVert v \rVert_1 \\
\lvert \, \lvert v \rvert \cdot e \, \rvert &\le \lVert \, \lvert v \rvert \, \rVert_2 \cdot \lVert e \rVert_2 \\
\lVert v \rVert_1 &\le \lVert v \rVert_2 \cdot \sqrt{n} \quad \checkmark
\end{aligned}$$

(Vì $\lVert \, \lvert v \rvert \, \rVert_2 = \sqrt{\sum \lvert v_i \rvert^2} = \sqrt{\sum v_i^2} = \lVert v \rVert_2$ và $\lVert e \rVert_2 = \sqrt{n}$.)

**Phần 4: $\sqrt{n} \cdot \lVert v \rVert_2 \le n \cdot \lVert v \rVert_\infty$**.

Ta có $\lVert v \rVert_2^2 = \sum v_i^2 \le n \cdot M^2 = n \cdot \lVert v \rVert_\infty^2$ (vì mỗi $v_i^2 \le M^2$). Mở căn:

$$\begin{aligned}
\lVert v \rVert_2 &\le \sqrt{n} \cdot \lVert v \rVert_\infty \\
\sqrt{n} \cdot \lVert v \rVert_2 &\le n \cdot \lVert v \rVert_\infty \quad \checkmark
\end{aligned}$$

**Verify với $v = (1, 2, 3)$, n = 3**:
- $\lVert v \rVert_\infty = 3$, $\lVert v \rVert_2 = \sqrt{14} \approx 3.742$, $\lVert v \rVert_1 = 6$, $\sqrt{n} \cdot \lVert v \rVert_2 = \sqrt{3} \cdot \sqrt{14} = \sqrt{42} \approx 6.48$, $n \cdot \lVert v \rVert_\infty = 9$.
- Chuỗi: $3 \le 3.742 \le 6 \le 6.48 \le 9$ ✓.

### Bài 5

$u, v$ normalized. Khai triển bình phương:

$$\begin{aligned}
\lVert u - v \rVert_2^2 &= (u - v) \cdot (u - v) \\
&= u \cdot u - 2(u \cdot v) + v \cdot v \\
&= \lVert u \rVert^2 - 2(u \cdot v) + \lVert v \rVert^2 \\
&= 1 - 2(u \cdot v) + 1 \\
&= 2 - 2(u \cdot v) \\
&= 2(1 - \cos\theta) &&\text{(vì } u \cdot v = \lVert u \rVert \lVert v \rVert \cos\theta = \cos\theta \text{ khi norm = 1)}
\end{aligned}$$

**Hệ quả**: với vector đã normalize, **Euclidean distance bình phương = 2(1 − cosine similarity)**. Càng giống nhau ($\cos \to 1$) → distance → 0. Trực giao ($\cos = 0$) → $\lVert u-v \rVert^2 = 2$. Ngược chiều ($\cos = -1$) → $\lVert u-v \rVert^2 = 4$.

**Verify số**: $u = (1, 0)$, $v = (0, 1)$ (cùng đã normalize). $u \cdot v = 0$, $\cos\theta = 0$.
- $\lVert u - v \rVert_2^2 = \lVert (1, -1) \rVert^2 = 2$.
- $2(1 - \cos\theta) = 2(1 - 0) = 2$ ✓.

### Bài 6

Đường thẳng $x + 2y = 4$. Tham số hóa $y = (4 - x)/2$. Hai phương án:

**Phần a — Tối thiểu L1**.

$f(x) = \lvert x \rvert + \lvert (4 - x)/2 \rvert = \lvert x \rvert + \lvert 4 - x \rvert / 2$.

Xét 3 vùng:
- $x \le 0$: $f = -x + (4 - x)/2 = (-2x + 4 - x)/2 = (4 - 3x)/2$. Đạo hàm $= -3/2 < 0$. Hàm giảm khi x tăng → tối thiểu tại $x = 0$, $f(0) = 0 + 2 = 2$.
- $0 \le x \le 4$: $f = x + (4 - x)/2 = (2x + 4 - x)/2 = (x + 4)/2$. Đạo hàm $= 1/2 > 0$. Hàm tăng → tối thiểu tại $x = 0$, $f = 2$.
- $x \ge 4$: $f = x + (x - 4)/2 = (3x - 4)/2$. Đạo hàm $> 0$. Tối thiểu tại $x = 4$, $f = 4$.

Vậy $\min f = 2$ tại $x = 0$, $y = 2$ → nghiệm L1: $(0, 2)$. **Một thành phần = 0 → sparse!**

**Phần b — Tối thiểu L2**.

$g(x) = x^2 + ((4 - x)/2)^2 = x^2 + (4 - x)^2/4$.

Đạo hàm: $g'(x) = 2x + 2 \cdot (4 - x) \cdot (-1)/4 = 2x - (4 - x)/2 = (4x - 4 + x)/2 = (5x - 4)/2$.

$g'(x) = 0 \iff x = 4/5 = 0.8$. → $y = (4 - 0.8)/2 = 1.6$.

Nghiệm L2: $(0.8, 1.6)$. **Cả 2 thành phần $\ne 0$**.

**So sánh**:
| Loại | Nghiệm | Sparse? |
|------|--------|---------|
| L1 min | $(0, 2)$ | Có (x = 0) |
| L2 min | $(0.8, 1.6)$ | Không |

Đây chính là cơ chế **Lasso tạo sparse**: hình thoi L1 chạm đường ràng buộc tại đỉnh (trên trục) → 1 thành phần bị "ép" về 0.

---

## Liên kết

- **Bài trước**: [Lesson 02 — Dot product & cosine similarity](../lesson-02-dot-product/) — đã dùng Cauchy-Schwarz để chứng minh triangle inequality cho L2.
- **Bài tiếp**: [Lesson 04 — Linear independence, basis](../lesson-04-linear-independence/) — sẽ dùng norm để định nghĩa "khoảng cách giữa không gian con", projection.
- **Cross-tier**:
  - [Tầng 1 — Algebra Lesson 04](../../01-Algebra/lesson-04-powers-roots-logs/) — căn bậc 2, lũy thừa phân số (dùng cho Lₚ norm).
  - [Tầng 2 — Trigonometry](../../02-Trigonometry/) — vector unit $(\cos\theta, \sin\theta)$.
  - Sẽ gặp lại ở **Tầng 5 Probability**: vector phân phối xác suất chuẩn hóa L1 = 1.
  - Sẽ gặp lại ở **Tầng 6 AI/ML**: MSE loss, L1/L2 regularization, embedding normalize cho cosine similarity, vector database.
- **Visualization**: [`visualization.html`](./visualization.html) — 4 component tương tác.
