// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/01-Algebra/lesson-06-linear-quadratic/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Hàm bậc 1 và hàm bậc 2

> **Tầng 1 — Algebra · Bài 6/8**
>
> Hai họ hàm "khởi điểm" của toán học và machine learning. Hiểu được hai họ này, bạn đã sở hữu khung nhìn để đọc gần như mọi mô hình hồi quy cơ bản: từ đồ thị giá nhà theo diện tích (linear) tới quỹ đạo ném bóng (quadratic), từ MSE loss tới gradient descent.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Viết được phương trình đường thẳng $y = ax + b$ từ 2 điểm, từ slope + 1 điểm, hoặc từ slope + y-intercept.
- Đọc đồ thị parabol $y = ax^2 + bx + c$: nhận ra hướng mở, tìm đỉnh, trục đối xứng và nghiệm.
- Áp dụng **công thức nghiệm** (quadratic formula) và **định lý Viète** để giải/nhẩm nghiệm bậc 2.
- Phân tích đa thức bậc 2 thành nhân tử và biến đổi sang **dạng đỉnh** (completing the square).
- Hiểu mối liên hệ giữa hai hàm này và machine learning: vì sao **linear regression + MSE loss** là một bài toán parabol có lời giải đóng (closed-form).

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/): biết giải $ax + b = 0$.
- [Lesson 04 — Lũy thừa, căn, log](../lesson-04-powers-roots-logs/): biết $\\sqrt{\\Delta}$, $b^2$ là gì.
- [Lesson 05 — Hàm số là gì](../lesson-05-functions/): biết domain/range, biết đọc đồ thị $y = f(x)$.

---

# Phần A — Hàm bậc 1 (linear function)

## A.1. Định nghĩa

Hàm bậc 1 (linear function) có dạng:

$$y = a \\cdot x + b \\qquad (\\text{với } a \\neq 0)$$

- $a$, $b$ là hai hằng số (số thực).
- $a$ gọi là **hệ số góc** (slope, gradient).
- $b$ gọi là **tung độ gốc** (y-intercept).
- Điều kiện $a \\neq 0$ để phân biệt với hàm hằng $y = b$ (đường nằm ngang, không phải hàm bậc 1).

**Đồ thị của hàm bậc 1 là một đường thẳng.** Đây là tính chất mang tính định nghĩa: hễ nói "linear" trong ngữ cảnh hàm 1 biến, hình ảnh xuất hiện trong đầu phải là đường thẳng.

### Ví dụ cụ thể

$y = 2x + 1$:

| x | -2 | -1 |  0 |  1 |  2 |
|---|----|----|----|----|----|
| y | -3 | -1 |  1 |  3 |  5 |

Mỗi khi $x$ tăng 1, $y$ tăng 2 — đúng bằng $a = 2$. Khi $x = 0$, $y = 1$ — đúng bằng $b = 1$.

## A.2. Hệ số góc (slope) — \`a\`

### 💡 Trực giác: "độ dốc cầu thang"

Hình dung bạn đang leo cầu thang. Mỗi bậc thang có 2 con số:

- **Bước ngang** (chiều dài bậc): bao nhiêu cm bạn bước về phía trước.
- **Bước cao** (chiều cao bậc): bao nhiêu cm bạn nâng chân lên.

Tỷ số **bước cao / bước ngang** chính là **độ dốc** của cầu thang. Cầu thang dốc đứng có tỷ số lớn; cầu thang thoải có tỷ số nhỏ.

Slope của đường thẳng đúng là khái niệm đó, áp lên đồ thị:

$$\\text{slope} = \\frac{\\text{bước cao (rise)}}{\\text{bước ngang (run)}} = \\frac{\\Delta y}{\\Delta x}$$

> Vì sao gọi "rise over run"? Vì người Anh dùng từ *rise* (đi lên) và *run* (chạy ngang) cho 2 cạnh của tam giác vuông tạo bởi 2 điểm trên đường thẳng.

### Ý nghĩa số học

$a$ đo "tốc độ thay đổi" của $y$ theo $x$:

> Mỗi khi $x$ tăng thêm 1 đơn vị, $y$ tăng thêm $a$ đơn vị.

- $a = 2 \\to$ x tăng 1, y tăng 2.
- $a = -0.5 \\to$ x tăng 1, y giảm 0.5.
- $a = 0.001 \\to$ x tăng 1, y gần như không đổi (đường gần ngang).

### ASCII diagram cho \`y = 2x + 1\`

Khi $x$ tăng từ 0 lên 1 ($\\Delta x = 1$), $y$ tăng từ 1 lên 3 ($\\Delta y = 2$). Slope $a = 2/1 = 2$:

\`\`\`
   y
   ↑
 5 |                    • (2, 5)
   |                 ╱
 4 |              ╱
   |           ╱  ┐
 3 |        • (1, 3)  │
   |     ╱   │        │ rise = 2 (bước cao, đi lên 2)
 2 |  ╱      │        │
   |╱        │        │
 1 +• (0, 1) ┘────────┘
   |     ←── run = 1 ──→ (bước ngang, đi sang 1)
   |
   +─────────────────────→ x
   0   1   2   3
\`\`\`

Đọc: từ điểm $(0, 1)$ sang $(1, 3)$, ta đi **ngang 1 ô và lên cao 2 ô** $\\to$ slope $= 2/1 = 2$. Đi tiếp từ $(1, 3)$ sang $(2, 5)$ cũng đi ngang 1, lên cao 2 — tỷ số luôn bằng 2 ở mọi cặp điểm liền kề. Đó là tính chất xác định của đường thẳng: slope **không đổi**.

### Tính slope từ 2 điểm

Cho 2 điểm $P_1 = (x_1, y_1)$ và $P_2 = (x_2, y_2)$ trên đường thẳng:

$$a = \\frac{y_2 - y_1}{x_2 - x_1}$$

Đọc là: "delta y trên delta x". Đây chính là "đi lên bao nhiêu chia cho đi sang bao nhiêu" (rise over run).

### Walk-through: tính slope từ 5 cặp điểm

| # | $P_1$ | $P_2$ | $\\Delta y = y_2 - y_1$ | $\\Delta x = x_2 - x_1$ | $a = \\Delta y/\\Delta x$ | Diễn giải |
|---|------|------|----------------|----------------|-------------|-----------|
| 1 | $(1, 3)$ | $(5, 11)$ | $11 - 3 = 8$ | $5 - 1 = 4$ | $8/4 = 2$ | Đi sang 4, lên 8 → mỗi bước ngang lên 2 |
| 2 | $(0, 0)$ | $(3, 9)$ | $9 - 0 = 9$ | $3 - 0 = 3$ | $9/3 = 3$ | Dốc hơn ví dụ 1 |
| 3 | $(-2, 5)$ | $(2, 1)$ | $1 - 5 = -4$ | $2 - (-2) = 4$ | $-4/4 = -1$ | Slope âm — đi xuống |
| 4 | $(1, 4)$ | $(5, 4)$ | $4 - 4 = 0$ | $5 - 1 = 4$ | $0/4 = 0$ | Slope = 0 — đường nằm ngang |
| 5 | $(-3, -1)$ | $(2, 9)$ | $9 - (-1) = 10$ | $2 - (-3) = 5$ | $10/5 = 2$ | Cùng slope 2 như ví dụ 1 → song song |

> **Mẹo dấu trừ**: khi $x_1$ hoặc $y_1$ âm, nhớ $5 - (-3) = 5 + 3 = 8$. Mất dấu là lỗi hay gặp nhất.

### ⚠ Cảnh báo: khi \`x₂ = x₁\`

Nếu hai điểm có **cùng hoành độ** $x_1 = x_2$, mẫu $\\Delta x = 0$ $\\to$ **chia cho 0 $\\to$ slope không xác định**. Đường nối hai điểm là **đường thẳng đứng** (vertical line), có phương trình dạng $x = c$ chứ không phải $y = ax + b$.

$$P_1 = (3, 1), \\quad P_2 = (3, 7) \\quad\\Rightarrow\\quad \\Delta x = 3 - 3 = 0 \\;\\to\\; \\text{slope không tồn tại}, \\quad \\text{đường thẳng } x = 3$$

Quan trọng hơn: **đường thẳng đứng không phải là hàm số**. Vì với một giá trị $x = 3$ ta lại có vô số $y$ tương ứng — vi phạm định nghĩa hàm (mỗi $x \\to$ đúng 1 $y$).

> Nhớ phân biệt: $\\text{slope} = 0$ (đường nằm ngang, $y = b$) khác với slope không xác định (đường đứng, $x = c$). Cái đầu vẫn là hàm (hằng), cái sau không phải hàm.

### Dấu của slope quyết định hình dạng

| $a$ | Hình ảnh | Mô tả |
|-----|----------|-------|
| $a > 0$ | ↗ | Đi từ trái dưới lên phải trên (đồng biến) |
| $a < 0$ | ↘ | Đi từ trái trên xuống phải dưới (nghịch biến) |
| $a = 0$ | →  | Nằm ngang — không phải hàm bậc 1 nữa |

$|a|$ càng lớn thì đường càng dốc; $|a|$ càng nhỏ thì đường càng thoải.

### ❓ Câu hỏi tự nhiên

**Q1: Slope = 0 nghĩa là gì?**

$a = 0 \\to$ mỗi khi $x$ tăng 1, $y$ tăng 0 — tức $y$ **không đổi**. Đồ thị là đường nằm ngang $y = b$. Đây là **hàm hằng** (constant function), không còn được coi là hàm bậc 1 nữa (vì định nghĩa hàm bậc 1 yêu cầu $a \\neq 0$). Ví dụ: $y = 5$ là đường ngang ở chiều cao 5, bất kể $x$ bằng bao nhiêu.

**Q2: Slope âm tức là gì?**

$a < 0 \\to$ mỗi khi $x$ tăng 1, $y$ **giảm** $|a|$ đơn vị. Đường thẳng dốc xuống từ trái sang phải.

\`\`\`
Ví dụ: y = -3x + 10
x=0 → y=10
x=1 → y=7   (giảm 3)
x=2 → y=4   (giảm 3)
x=3 → y=1   (giảm 3)
\`\`\`

Trong thực tế: "giá xe theo tuổi xe" có slope âm (xe càng cũ → giá càng thấp). "Lượng nước trong bồn theo thời gian khi đang xả" có slope âm.

**Q3: Tại sao 2 đường vuông góc có $a_1 \\cdot a_2 = -1$?**

Trực giác hình học: slope là $\\tan\\theta$ với $\\theta$ là góc đường thẳng tạo với trục Ox. Nếu hai đường vuông góc thì hai góc $\\theta_1$ và $\\theta_2$ lệch nhau đúng $90°$, tức $\\theta_2 = \\theta_1 + 90°$.

Từ trig: $\\tan(\\theta + 90°) = -1/\\tan\\theta$ (sẽ chứng minh ở Tầng 2 — Trigonometry). Vậy:

$$a_2 = \\tan\\theta_2 = \\tan(\\theta_1 + 90°) = \\frac{-1}{\\tan\\theta_1} = \\frac{-1}{a_1} \\quad\\Rightarrow\\quad a_1 \\cdot a_2 = -1$$

Cách hình dung "không cần trig": xoay đường $y = 2x$ đi $90°$ quanh gốc tọa độ. Một bước "ngang 1, lên 2" sau khi xoay $90°$ trở thành "ngang -2, lên 1" $\\to$ slope mới $= 1/(-2) = -0.5$. Tích $2 \\cdot (-0.5) = -1$. Quy tắc tổng quát: xoay $90°$ biến slope $a$ thành $-1/a$.

> Lưu ý ngoại lệ: nếu một đường nằm ngang ($a = 0$) thì đường vuông góc với nó là đường đứng (slope không tồn tại) — quy tắc tích = -1 không áp dụng cho trường hợp suy biến này.

### 🔁 Dừng lại tự kiểm tra (A.2)

Trước khi đi tiếp, tự trả lời:

1. Slope của đường đi qua $(2, 7)$ và $(6, 15)$ bằng bao nhiêu? *(Đáp: $(15-7)/(6-2) = 8/4 = 2$)*
2. Hai đường $y = -3x + 1$ và $y = (1/3)x + 5$ có vuông góc không? *(Đáp: $(-3) \\cdot (1/3) = -1 \\to$ có)*
3. Hai điểm $(4, 2)$ và $(4, 9)$ có nối thành đồ thị hàm số không? *(Đáp: Không. $\\Delta x = 0 \\to$ đường đứng $x = 4$, không phải hàm)*

### 📝 Tóm tắt A.2

- Slope = "độ dốc cầu thang" = $\\Delta y / \\Delta x$ = "đi lên bao nhiêu / đi sang bao nhiêu".
- Slope không đổi trên toàn đường thẳng (đó là đặc trưng của đường thẳng).
- $a > 0$: lên dốc; $a < 0$: xuống dốc; $a = 0$: ngang (hàm hằng).
- $\\Delta x = 0$: đường đứng, slope không xác định, không phải hàm.
- Vuông góc: $a_1 \\cdot a_2 = -1$ (trừ trường hợp một đường ngang + một đường đứng).

## A.3. Tung độ gốc (y-intercept) — \`b\`

$b$ là giá trị của $y$ khi $x = 0$. Hình học: đường thẳng cắt **trục Oy** tại điểm $(0, b)$.

> Mẹo đọc nhanh: nhìn vào phương trình $y = ax + b$, số đứng riêng (không có x) chính là chỗ đường thẳng đâm vào trục dọc.

**Ví dụ.** $y = 2x - 5 \\to$ cắt Oy tại $(0, -5)$.

## A.4. Giao điểm với trục Ox (root / x-intercept)

Trục Ox là tập các điểm có $y = 0$. Để tìm giao điểm, giải phương trình:

$$a \\cdot x + b = 0 \\quad\\Leftrightarrow\\quad x = \\frac{-b}{a}$$

Đây chính là phương trình bậc 1 mà ta đã học ở [Lesson 03](../lesson-03-linear-equations/).

**Ví dụ.** $y = 2x - 6$ cắt Ox tại $x = 6/2 = 3 \\to$ điểm $(3, 0)$.

> Trực giác: y-intercept là chỗ đường đụng "tường dọc" (Oy); x-intercept là chỗ đường đụng "sàn ngang" (Ox).


## A.5. Viết phương trình đường thẳng

Có 3 tình huống phổ biến:

### Trường hợp 1 — Biết slope và y-intercept

Quá đơn giản: ráp thẳng vào $y = ax + b$.

> Slope $3$, y-intercept $-2 \\to y = 3x - 2$.

### Trường hợp 2 — Biết slope \`a\` và 1 điểm \`(x₀, y₀)\`

Thay vào $y_0 = a \\cdot x_0 + b$ để tìm $b$.

**Ví dụ.** Slope $a = 2$, đi qua điểm $(1, 5)$:

$$5 = 2 \\cdot 1 + b \\quad\\Rightarrow\\quad b = 5 - 2 = 3 \\quad\\Rightarrow\\quad y = 2x + 3$$

### Trường hợp 3 — Biết 2 điểm \`(x₁, y₁)\` và \`(x₂, y₂)\`

Hai bước:

1. Tính slope: $a = (y_2 - y_1) / (x_2 - x_1)$.
2. Thay 1 trong 2 điểm vào để tìm $b$.

**Ví dụ.** Đường thẳng đi qua $(1, 4)$ và $(3, 10)$:

$$a = \\frac{10 - 4}{3 - 1} = \\frac{6}{2} = 3, \\quad \\text{thay } (1, 4): \\; 4 = 3 \\cdot 1 + b \\;\\Rightarrow\\; b = 1 \\;\\Rightarrow\\; y = 3x + 1$$

Kiểm tra với điểm thứ hai: $3 \\cdot 3 + 1 = 10$ ✓.

## A.6. Hai đường thẳng — song song và vuông góc

Cho $(d_1): y = a_1 \\cdot x + b_1$ và $(d_2): y = a_2 \\cdot x + b_2$.

- **Song song**: $a_1 = a_2$ và $b_1 \\neq b_2$. Cùng độ dốc nên không bao giờ gặp nhau.
- **Trùng nhau**: $a_1 = a_2$ và $b_1 = b_2$. Cùng một đường.
- **Cắt nhau**: $a_1 \\neq a_2$. Có đúng 1 giao điểm.
- **Vuông góc**: $a_1 \\cdot a_2 = -1$. Ví dụ slope $2$ vuông góc với slope $-1/2$.

> Tại sao tích slope = -1 thì vuông góc? Trực giác: $\\text{slope} = \\tan(\\text{góc})$. Hai đường vuông góc thì góc lệch nhau $90°$, mà $\\tan\\alpha \\cdot \\tan(\\alpha + 90°) = -1$. Bài Trigonometry ở Tầng 2 sẽ chứng minh.

**Ví dụ.** $y = 2x + 1$ và $y = 2x - 4$ song song (cùng $a = 2$). $y = 2x + 1$ vuông góc với $y = -0.5x + 7$ (vì $2 \\cdot (-0.5) = -1$).

## A.7. Tại sao hàm bậc 1 quan trọng cho ML?

**Linear regression** — bài toán machine learning "hello world" — chính là: cho một đám điểm dữ liệu $(x_1, y_1), (x_2, y_2), \\ldots, (x_n, y_n)$, tìm đường thẳng $y = ax + b$ "khớp" nhất.

> Ví dụ: x = diện tích nhà (m²), y = giá nhà (tỷ đồng). Có 1000 căn nhà trong dataset. Tìm $a$, $b$ để dự đoán giá cho căn nhà mới chỉ cần biết diện tích.

"Khớp nhất" được đo bằng **tổng bình phương sai lệch** (MSE — Mean Squared Error):

$$\\text{Loss}(a, b) = \\frac{1}{n} \\sum (y_i - (a \\cdot x_i + b))^2$$

Hai điều quan trọng đáng ghi nhận ngay:

1. Phương trình dự đoán chỉ là $y = ax + b$ — đúng hàm bậc 1.
2. **Loss là một hàm bậc 2 theo $a$ và $b$** — sẽ thấy ở Phần B vì sao điều này khiến bài toán có **lời giải đóng** (closed-form), không cần huấn luyện lặp.

Linear regression không chỉ là bài tập sách giáo khoa: nó là khối Lego đầu tiên của neural network. Một neuron trong mạng deep learning, về bản chất, là $y = a \\cdot x + b$ rồi bọc qua một hàm phi tuyến (activation function). Hiểu đường thẳng = hiểu neuron đơn lẻ.

### 💡 Trực giác "khớp nhất" với 3 điểm cụ thể

Cho 3 điểm $(1, 2), (2, 3.5), (3, 5.5)$. Bạn nhìn vào và "đoán bằng mắt" thấy: dữ liệu gần như nằm trên một đường thẳng, nhưng không hoàn hảo. Mỗi đường thẳng $y = ax + b$ bạn vẽ thử sẽ "trượt qua" 3 điểm với một độ lệch nào đó.

Mục tiêu: tìm $(a, b)$ sao cho **tổng bình phương sai lệch** giữa giá trị thực $y_i$ và giá trị dự đoán $a \\cdot x_i + b$ là **nhỏ nhất**.

\`\`\`
ASCII — 3 điểm và một đường thẳng thử nghiệm (y = 1.5x + 0.5):

  y
  ↑
6 |
  |                       • (3, 5.5)
5 |                    ╱
  |                 ╱  ↕ sai lệch = 5.5 − (1.5·3 + 0.5) = 0.5
4 |              ╱
  |           • (2, 3.5)
3 |        ╱  ↕ sai lệch = 3.5 − (1.5·2 + 0.5) = 0
  |     ╱
2 |  • (1, 2)
  |╱     ↕ sai lệch = 2 − (1.5·1 + 0.5) = 0
1 |
  +────────────────────→ x
  0   1   2   3
\`\`\`

Mỗi đường thẳng $(a, b)$ cho một bộ 3 sai lệch khác nhau. Cần một **thước đo duy nhất** để so sánh: bình phương từng sai lệch rồi cộng lại (bình phương để: (1) sai âm và dương không triệt tiêu, (2) phạt nặng các sai lệch lớn).

### Định nghĩa MSE (Mean Squared Error)

Với $n$ điểm $(x_i, y_i)$:

$$L(a, b) = \\frac{1}{n} \\sum_i (y_i - a \\cdot x_i - b)^2$$

- $y_i$ = giá trị thực.
- $a \\cdot x_i + b$ = giá trị dự đoán.
- Hiệu $y_i - a \\cdot x_i - b$ = sai lệch (residual).
- Bình phương để cộng dồn, chia $n$ để lấy trung bình.

> **Vì sao bình phương mà không phải trị tuyệt đối $|y_i - a \\cdot x_i - b|$?** Bình phương cho phép lấy đạo hàm trơn tru (đạo hàm của $u^2$ là $2u$, mượt); trị tuyệt đối có "góc nhọn" tại 0, đạo hàm không tồn tại. Bình phương cũng "phạt nặng" outliers. Lựa chọn trị tuyệt đối được dùng trong **MAE loss** (Mean Absolute Error) — sẽ học sau.

### Walk-through: tìm \`(a*, b*)\` cho 3 điểm trên

**Bước 1 — viết tường minh L(a, b) với 3 điểm $(1, 2), (2, 3.5), (3, 5.5)$:**

$$3 \\cdot L(a, b) = (2 - a - b)^2 + (3.5 - 2a - b)^2 + (5.5 - 3a - b)^2$$

(Nhân 3 cho gọn — không ảnh hưởng vị trí điểm cực tiểu.)

**Bước 2 — đạo hàm theo b, set = 0:**

Đạo hàm theo $b$ (xem $a$ là hằng), nhớ $\\frac{d}{db}(u^2) = 2u \\cdot \\frac{du}{db}$, ở đây $\\frac{du}{db} = -1$:

$$\\begin{aligned}
\\frac{\\partial}{\\partial b}: \\; -2 \\cdot [(2 - a - b) + (3.5 - 2a - b) + (5.5 - 3a - b)] &= 0 \\\\[4pt]
\\Leftrightarrow \\; (2 + 3.5 + 5.5) - (1 + 2 + 3) \\cdot a - 3 \\cdot b &= 0 \\\\[4pt]
\\Leftrightarrow \\; 11 - 6a - 3b &= 0 \\\\[4pt]
\\Leftrightarrow \\; 6a + 3b &= 11 \\qquad (*)
\\end{aligned}$$

**Bước 3 — đạo hàm theo a, set = 0:**

Tương tự, $\\frac{du}{da} = -x_i$:

$$\\begin{aligned}
\\frac{\\partial}{\\partial a}: \\; -2 \\cdot [1 \\cdot (2 - a - b) + 2 \\cdot (3.5 - 2a - b) + 3 \\cdot (5.5 - 3a - b)] &= 0 \\\\[4pt]
\\Leftrightarrow \\; (1 \\cdot 2 + 2 \\cdot 3.5 + 3 \\cdot 5.5) - (1^2 + 2^2 + 3^2) \\cdot a - (1+2+3) \\cdot b &= 0 \\\\[4pt]
\\Leftrightarrow \\; (2 + 7 + 16.5) - 14a - 6b &= 0 \\\\[4pt]
\\Leftrightarrow \\; 25.5 - 14a - 6b &= 0 \\\\[4pt]
\\Leftrightarrow \\; 14a + 6b &= 25.5 \\qquad (**)
\\end{aligned}$$

**Bước 4 — giải hệ phương trình bậc 1 với 2 ẩn $(a, b)$:**

$$\\begin{aligned}
6a + 3b &= 11 \\qquad (*) \\\\[4pt]
14a + 6b &= 25.5 \\qquad (**)
\\end{aligned}$$

Nhân $(*)$ với 2: $12a + 6b = 22$. Trừ $(**)$:

$$\\begin{aligned}
(14a + 6b) - (12a + 6b) &= 25.5 - 22 \\\\[4pt]
2a &= 3.5 \\\\[4pt]
a &= 1.75
\\end{aligned}$$

Thay vào $(*)$: $6 \\cdot 1.75 + 3b = 11 \\Rightarrow 10.5 + 3b = 11 \\Rightarrow 3b = 0.5 \\Rightarrow b \\approx 0.1667$.

**Kết quả:** $a^* \\approx 1.75$, $b^* \\approx 0.17$. Đường khớp nhất:

$$y \\approx 1.75 \\cdot x + 0.17$$

**Kiểm tra dự đoán:**

| x | y thực | y dự đoán = 1.75x + 0.17 | Sai lệch |
|---|--------|--------------------------|----------|
| 1 | 2     | 1.92                     | +0.08    |
| 2 | 3.5   | 3.67                     | -0.17    |
| 3 | 5.5   | 5.42                     | +0.08    |

Tổng sai lệch dương $\\approx 0.16$, tổng sai lệch âm $\\approx -0.17$ — gần như triệt tiêu nhau (đường khớp nhất đi "giữa" đám điểm). Đây là dấu hiệu của nghiệm tối ưu.

> **Liên hệ:** Hệ $(*)$ và $(**)$ chính là 2 phương trình bậc 1 với 2 ẩn — kỹ thuật giải hệ phương trình sẽ được học chi tiết ở [Lesson 08 — Hệ phương trình tuyến tính](../lesson-08-linear-systems/). Linear regression bản chất chỉ là "giải hệ phương trình tuyến tính bằng cách lấy đạo hàm MSE".

### 🔁 Dừng lại tự kiểm tra (Linear regression)

1. Vì sao ta bình phương sai lệch thay vì lấy trị tuyệt đối? *(Đáp: bình phương cho hàm trơn, lấy đạo hàm dễ, và phạt nặng sai lớn.)*
2. Với 3 điểm trên, nếu thử $(a, b) = (2, 0)$ thay vì $(1.75, 0.17)$, MSE có lớn hơn không? *(Đáp: có. Tính thử $L(2,0) = ((2-2)^2 + (3.5-4)^2 + (5.5-6)^2)/3 = (0 + 0.25 + 0.25)/3 \\approx 0.167$, trong khi $L(1.75, 0.17) \\approx (0.08^2 + 0.17^2 + 0.08^2)/3 \\approx 0.013$ — nhỏ hơn nhiều.)*
3. Nếu có 1 triệu điểm thay vì 3, các phương trình $(*)$ và $(**)$ có còn dạng bậc 1 với $(a, b)$ không? *(Đáp: có. Bậc của ẩn $a, b$ không đổi theo số điểm — chỉ các tổng $\\sum x_i$, $\\sum y_i$, $\\sum x_i^2$, $\\sum x_i y_i$ thay đổi.)*

### 📝 Tóm tắt A.7

- Linear regression = tìm $(a, b)$ để đường $y = ax + b$ "khớp nhất" với đám điểm dữ liệu.
- "Khớp nhất" được đo bằng MSE: $L(a, b) = \\frac{1}{n} \\sum (y_i - a \\cdot x_i - b)^2$.
- MSE là hàm bậc 2 với $(a, b) \\to$ có **đỉnh duy nhất** $\\to$ lời giải đóng (closed-form).
- Cách tìm: đạo hàm $L$ theo $a$ và theo $b$, set bằng 0 $\\to$ hệ 2 phương trình bậc 1 với 2 ẩn $\\to$ giải ra $(a^*, b^*)$.
- Với 3 điểm $(1, 2), (2, 3.5), (3, 5.5)$: kết quả $a^* = 1.75$, $b^* \\approx 0.17$.

---

# Phần B — Hàm bậc 2 (quadratic function)

## B.1. Định nghĩa

Hàm bậc 2 (quadratic function) có dạng:

$$y = a \\cdot x^2 + b \\cdot x + c \\qquad (\\text{với } a \\neq 0)$$

- $a$, $b$, $c$ là 3 hằng số.
- Điều kiện $a \\neq 0$ (nếu $a = 0$ thì rơi về hàm bậc 1).

**Đồ thị của hàm bậc 2 là một parabol** (parabola — đường cong hình "hình chữ U" hoặc "hình chữ U lộn ngược").

### Ví dụ cụ thể

$y = x^2 - 4x + 3$:

| x  |  0 |  1 |  2 |  3 |  4 |
|----|----|----|----|----|----|
| y  |  3 |  0 | -1 |  0 |  3 |

Nhìn bảng đã thấy: y giảm rồi tăng, đạt min tại $x = 2$. Đó là **đỉnh** của parabol.

## B.2. Hướng mở và độ "rộng/hẹp"

Dấu của $a$:

| $a$ | Hình dạng | Tính chất |
|-----|-----------|-----------|
| $a > 0$ | ∪ (mở lên) | Có điểm thấp nhất (min) tại đỉnh |
| $a < 0$ | ∩ (mở xuống) | Có điểm cao nhất (max) tại đỉnh |

$|a|$ quyết định độ "hẹp":

- $|a|$ lớn $\\to$ parabol hẹp, hai cánh dựng đứng (ví dụ $y = 5x^2$).
- $|a|$ nhỏ $\\to$ parabol bè, hai cánh thoải (ví dụ $y = 0.1x^2$).

So sánh ở $x = 2$:

- $y = 5x^2 \\to y = 20$ (cao vút).
- $y = x^2 \\to y = 4$.
- $y = 0.1x^2 \\to y = 0.4$ (gần như bẹp).

## B.3. Đỉnh (vertex) của parabol

### 💡 Trực giác: điểm "cực trị" của parabol

Hình dung đồ thị $y = x^2$: nó là một cái "thung lũng" hình chữ U. Đứng ở đáy thung lũng, mọi hướng đều đi lên — đó là **điểm thấp nhất**. Ngược lại, $y = -x^2$ là một "ngọn đồi" hình chữ U lộn ngược — đỉnh đồi là **điểm cao nhất**.

\`\`\`
ASCII — y = x² (a > 0)            ASCII — y = -x² (a < 0)

    y                                  y
  9 |•           •                   0 |        •
    | \\         /                      | \\     / \\     /
  4 |  •       •                    -1 |  \\   /   \\   /
    |   \\     /                        |   • •     • •
  1 |    • • •                      -4 |    •       •
    |     ↑                            |     ↓
  0 +─────•─────→ x                 -9 |•           •
        đỉnh (0,0)                     +─────•─────→ x
        = MIN                              đỉnh (0,0)
                                           = MAX
\`\`\`

- Với $a > 0$: parabol mở lên $\\to$ đỉnh là điểm **thấp nhất** (min).
- Với $a < 0$: parabol mở xuống $\\to$ đỉnh là điểm **cao nhất** (max).
- Mọi điểm khác trên parabol đều có $y$ xa hơn (lên hoặc xuống) so với $y$ tại đỉnh.

Trong tối ưu hóa và machine learning, "đi tìm đỉnh" = "đi tìm cực trị" = "giải bài toán tối ưu". Vì lí do này, parabol là cấu trúc cơ bản nhất mà bạn cần thông thạo.

**Đỉnh** là điểm cực trị (min hoặc max) của parabol. Tọa độ:

$$x_v = \\frac{-b}{2a}, \\qquad y_v = \\frac{-\\Delta}{4a} \\qquad \\text{với } \\Delta = b^2 - 4ac$$

> **Cách dễ nhớ**: Hoành độ đỉnh là $-b/(2a)$. Còn tung độ đỉnh? Khỏi học công thức — cứ thay $x_v$ vào hàm $y = ax^2 + bx + c$ là ra.

**Ví dụ.** $y = x^2 - 4x + 3$:

$$\\begin{aligned}
a = 1, \\; b = -4, \\; c &= 3 \\\\[4pt]
x_v = \\frac{-(-4)}{2 \\cdot 1} = \\frac{4}{2} &= 2 \\\\[4pt]
y_v = f(2) = 2^2 - 4 \\cdot 2 + 3 = 4 - 8 + 3 &= -1 \\\\[4pt]
\\text{Đỉnh}: \\; (2, &-1)
\\end{aligned}$$

Khớp với bảng ở B.1 — tại $x = 2$ thì $y = -1$, là giá trị nhỏ nhất.

### Vì sao hoành độ đỉnh là \`-b/(2a)\`?

Trực giác: parabol đối xứng. Nếu nó cắt Ox tại $x_1$ và $x_2$ thì trục đối xứng đi qua trung điểm $(x_1 + x_2)/2$. Theo Viète (sẽ học ở B.6), $x_1 + x_2 = -b/a$, nên trung điểm là $-b/(2a)$. Ngay cả khi không có nghiệm thực, công thức này vẫn đúng vì parabol vẫn có trục đối xứng.

### Chứng minh chặt chẽ bằng completing the square (3 bước)

Bắt đầu từ $y = a \\cdot x^2 + b \\cdot x + c$.

**Bước 1 — đặt \`a\` ra ngoài 2 hạng tử đầu:**

$$y = a \\cdot \\left(x^2 + \\frac{b}{a} \\cdot x\\right) + c$$

**Bước 2 — bù trừ để biến $x^2 + (b/a) \\cdot x$ thành bình phương:**

Nhớ hằng đẳng thức $(x + k)^2 = x^2 + 2kx + k^2$. Để khớp $x^2 + (b/a)x$ với $x^2 + 2kx$, cần $2k = b/a \\Rightarrow k = b/(2a)$. Thêm và bớt $k^2 = b^2/(4a^2)$:

$$\\begin{aligned}
y &= a \\cdot \\left(x^2 + \\frac{b}{a} \\cdot x + \\frac{b^2}{4a^2} - \\frac{b^2}{4a^2}\\right) + c \\\\[4pt]
  &= a \\cdot \\left(\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2}{4a^2}\\right) + c \\\\[4pt]
  &= a \\cdot \\left(x + \\frac{b}{2a}\\right)^2 - a \\cdot \\frac{b^2}{4a^2} + c \\\\[4pt]
  &= a \\cdot \\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2}{4a} + c \\\\[4pt]
  &= a \\cdot \\left(x + \\frac{b}{2a}\\right)^2 + \\frac{4ac - b^2}{4a} \\\\[4pt]
  &= a \\cdot \\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2 - 4ac}{4a} \\\\[4pt]
  &= a \\cdot \\left(x - \\left(\\frac{-b}{2a}\\right)\\right)^2 + \\left(\\frac{-\\Delta}{4a}\\right)
\\end{aligned}$$

**Bước 3 — đọc đỉnh từ dạng $a \\cdot (x - h)^2 + k$:**

So sánh với $y = a \\cdot (x - h)^2 + k$, có $h = -b/(2a)$ và $k = -\\Delta/(4a)$.

- Khi $a > 0$: $a \\cdot (x - h)^2 \\geq 0$, đạt **min = 0** khi $x = h$. Vậy $y$ đạt min $= k$ tại $x = h$.
- Khi $a < 0$: $a \\cdot (x - h)^2 \\leq 0$, đạt **max = 0** khi $x = h$. Vậy $y$ đạt max $= k$ tại $x = h$.

$\\Rightarrow$ Đỉnh $(h, k) = (-b/(2a), -\\Delta/(4a))$. **QED**.

> Cách chứng minh này không cần Viète, không cần đạo hàm — chỉ dùng hằng đẳng thức bình phương. Đây cũng là chìa khóa để chứng minh **công thức nghiệm** ở B.5.

## B.4. Trục đối xứng

Trục đối xứng là **đường thẳng đứng đi qua đỉnh**:

$$x = \\frac{-b}{2a}$$

Mọi parabol đều đối xứng qua trục này: $f(x_v - k) = f(x_v + k)$ với mọi $k$.

**Ví dụ.** $y = x^2 - 4x + 3$ đối xứng qua $x = 2$. Kiểm tra: $f(0) = 3$, $f(4) = 3$. Đối xứng quanh $x = 2$.

## B.5. Nghiệm — công thức nghiệm (Quadratic formula)

Giải $a \\cdot x^2 + b \\cdot x + c = 0$ (tìm giao điểm với trục Ox):

### Biệt thức Delta

$$\\Delta = b^2 - 4 \\cdot a \\cdot c$$

### Phân loại nghiệm theo Δ

| Δ | Số nghiệm thực | Công thức | Hình học |
|---|----------------|-----------|----------|
| $\\Delta > 0$ | 2 nghiệm phân biệt | $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ | Parabol **cắt** Ox tại 2 điểm |
| $\\Delta = 0$ | 1 nghiệm kép | $x = \\dfrac{-b}{2a}$ | Parabol **tiếp xúc** Ox tại đỉnh |
| $\\Delta < 0$ | Không có nghiệm thực | (có 2 nghiệm phức) | Parabol **không cắt** Ox |

> Trực giác hình học: parabol mở lên ($a > 0$) có đỉnh ở $y = -\\Delta/(4a)$. Nếu $\\Delta > 0$ thì $y_v < 0$, đỉnh ở dưới trục Ox, nên parabol bắt buộc phải cắt Ox ở 2 chỗ khi đi lên. Nếu $\\Delta = 0$ thì $y_v = 0$, đỉnh chạm Ox. Nếu $\\Delta < 0$ thì $y_v > 0$, đỉnh ở trên Ox, parabol không thể chạm xuống Ox.

### 💡 Trực giác hình học của Δ

Đỉnh parabol có tung độ $y_v = -\\Delta/(4a)$. Khi $a > 0$ (mở lên):

- $\\Delta > 0 \\Rightarrow y_v < 0 \\Rightarrow$ đỉnh **dưới** trục Ox $\\Rightarrow$ parabol đi lên hai bên **cắt Ox 2 chỗ**.
- $\\Delta = 0 \\Rightarrow y_v = 0 \\Rightarrow$ đỉnh **chạm** Ox $\\Rightarrow$ parabol **tiếp xúc** Ox 1 điểm (nghiệm kép).
- $\\Delta < 0 \\Rightarrow y_v > 0 \\Rightarrow$ đỉnh **trên** Ox $\\Rightarrow$ parabol **lơ lửng** không chạm Ox.

Khi $a < 0$ (mở xuống) logic ngược lại nhưng kết luận cuối cùng giống hệt: dấu của $\\Delta$ quyết định số điểm chạm Ox.

### Walk-through 3 trường hợp với bảng giá trị

**(1) Δ > 0 — parabol cắt Ox 2 điểm.** Giải $x^2 - 5x + 6 = 0$:

$$\\begin{aligned}
a = 1, \\; b = -5, \\; c &= 6 \\\\[4pt]
\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 &= 1 \\\\[4pt]
\\sqrt{\\Delta} &= 1 \\\\[4pt]
x_1 = \\frac{5 + 1}{2} &= 3 \\\\[4pt]
x_2 = \\frac{5 - 1}{2} &= 2
\\end{aligned}$$

Hai nghiệm: $x = 2$ và $x = 3$. Đỉnh: $x_v = 5/2 = 2.5$, $y_v = -\\Delta/(4a) = -1/4 = -0.25$.

Bảng giá trị $y = x^2 - 5x + 6$ với $x \\in [-1, 5]$:

| x  | -1 |  0 |  1 |  2 | 2.5 |  3 |  4 |  5 |
|----|----|----|----|----|------|----|----|----|
| y  | 12 |  6 |  2 |  0 | -0.25|  0 |  2 |  6 |

\`\`\`
   y
   ↑
12 |•                          •
   |
 6 |   •                   •
   |
 2 |       •           •
   |
 0 +───────────•───•──────────→ x  ← trục Ox
   |          x₂=2 x₁=3
-1 |              •  ← đỉnh (2.5, -0.25)
   |
\`\`\`

Đỉnh dưới Ox → parabol "đào hố" qua Ox 2 lần.

**(2) Δ = 0 — parabol tiếp xúc Ox tại đỉnh.** Giải $x^2 - 4x + 4 = 0$:

$$\\begin{aligned}
a = 1, \\; b = -4, \\; c &= 4 \\\\[4pt]
\\Delta = 16 - 16 &= 0 \\\\[4pt]
x = 4/2 &= 2 \\quad (\\text{nghiệm kép})
\\end{aligned}$$

Phương trình tương đương $(x - 2)^2 = 0$. Đỉnh: $(2, 0)$ — chính là chỗ duy nhất chạm Ox.

Bảng $y = x^2 - 4x + 4 = (x - 2)^2$ với $x \\in [-1, 5]$:

| x  | -1 |  0 |  1 |  2 |  3 |  4 |  5 |
|----|----|----|----|----|----|----|----|
| y  |  9 |  4 |  1 |  0 |  1 |  4 |  9 |

\`\`\`
   y
   ↑
 9 |•                           •
   |
 4 |    •                   •
   |
 1 |       •           •
   |
 0 +────────────•──────────→ x
              đỉnh (2,0) — chạm 1 điểm
\`\`\`

**(3) Δ < 0 — parabol lơ lửng trên Ox.** Giải $x^2 + x + 1 = 0$:

$$\\begin{aligned}
a = 1, \\; b = 1, \\; c &= 1 \\\\[4pt]
\\Delta = 1 - 4 &= -3
\\end{aligned}$$

Không có nghiệm thực. Đỉnh: $x_v = -1/2 = -0.5$, $y_v = -(-3)/4 = 0.75$.

Bảng $y = x^2 + x + 1$ với $x \\in [-3, 2]$:

| x  | -3 | -2 | -1 |-0.5|  0 |  1 |  2 |
|----|----|----|----|----|----|----|----|
| y  |  7 |  3 |  1 |0.75|  1 |  3 |  7 |

\`\`\`
   y
   ↑
 7 |•                       •
   |
 3 |    •               •
   |
 1 |        •   •    •
   |          •  ← đỉnh (-0.5, 0.75)
 0 +────────────────────→ x  ← parabol KHÔNG chạm trục này
\`\`\`

Đỉnh trên Ox → cả parabol nằm trên Ox → không có nghiệm thực.

### Chứng minh công thức nghiệm từ completing the square

Giải $a \\cdot x^2 + b \\cdot x + c = 0$ (với $a \\neq 0$).

**Bước 1 — chia hai vế cho \`a\`:**

$$x^2 + \\frac{b}{a} \\cdot x + \\frac{c}{a} = 0$$

**Bước 2 — đưa hạng tử hằng sang vế phải:**

$$x^2 + \\frac{b}{a} \\cdot x = -\\frac{c}{a}$$

**Bước 3 — completing the square: thêm $(b/(2a))^2$ vào hai vế:**

Vế trái thành $(x + b/(2a))^2$. Vế phải:

$$\\begin{aligned}
\\left(x + \\frac{b}{2a}\\right)^2 &= -\\frac{c}{a} + \\frac{b^2}{4a^2} \\\\[4pt]
&= \\frac{-4ac + b^2}{4a^2} \\\\[4pt]
&= \\frac{b^2 - 4ac}{4a^2} \\\\[4pt]
&= \\frac{\\Delta}{4a^2}
\\end{aligned}$$

**Bước 4 — lấy căn hai vế:**

$$x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{\\Delta}}{2|a|} = \\pm \\frac{\\sqrt{\\Delta}}{2a}$$

(Dấu $\\pm$ đã hấp thụ dấu của $a$.)

**Bước 5 — chuyển vế tìm \`x\`:**

$$x = \\frac{-b}{2a} \\pm \\frac{\\sqrt{\\Delta}}{2a} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$

**Bước 6 — kết luận theo dấu Δ:**

- $\\Delta > 0$: $\\sqrt{\\Delta}$ là số thực dương $\\to$ có **2 nghiệm phân biệt** $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.
- $\\Delta = 0$: $\\sqrt{\\Delta} = 0 \\to$ cả $+$ và $-$ cho cùng giá trị $-b/(2a) \\to$ **nghiệm kép**.
- $\\Delta < 0$: $\\sqrt{\\Delta}$ không tồn tại trong số thực $\\to$ **vô nghiệm thực** (có 2 nghiệm phức $\\dfrac{-b \\pm i \\cdot \\sqrt{|\\Delta|}}{2a}$).

**QED**. Công thức nghiệm là hệ quả trực tiếp của completing the square — không phải "phép màu" mà là một bước biến đổi đại số sơ cấp.

### ❓ Câu hỏi tự nhiên

**Q1: Sao công thức Quadratic có chỉ số 2 ở mẫu $(2a)$?**

Vì khi completing the square ta cần $2k = b/a \\Rightarrow k = b/(2a)$. Số 2 sinh ra từ khai triển $(x + k)^2 = x^2 + 2kx + k^2$. Nói cách khác, để biến $bx$ thành $2kx$ ta phải chia $b$ cho $2$ — đó là nguồn gốc của hệ số $2$ ở mẫu. Đây không phải quy ước, mà là hệ quả của hằng đẳng thức bình phương.

**Q2: Khi nào dùng phân tích nhân tử vs công thức nghiệm?**

- **Phân tích nhân tử**: khi nghiệm là số nguyên hoặc phân số "đẹp" và bạn nhẩm được. Vd $x^2 - 5x + 6 = 0 \\to$ nhẩm thấy $(x - 2)(x - 3) = 0$ ngay $\\to$ x = 2, 3. Nhanh hơn tính Δ.
- **Công thức nghiệm**: khi nghiệm xấu, có $\\sqrt{}$ hoặc dùng máy/code. Vd $x^2 - 3x + 1 = 0 \\to \\Delta = 5 \\to x = (3 \\pm \\sqrt{5})/2$. Không thể phân tích nhẩm.
- **Mẹo quyết định**: nhìn vào $c/a$ (tích nghiệm) và $-b/a$ (tổng nghiệm). Nếu cả hai đều là số nhỏ nguyên, thử nhẩm trước. Không ra → dùng công thức.

**Q3: Số phức xuất hiện khi Δ < 0 — học gì?**

Số phức (complex number) là mở rộng của số thực, thêm phần "ảo" $i$ với $i^2 = -1$. Khi $\\Delta < 0$, $\\sqrt{\\Delta} = \\sqrt{-|\\Delta|} = i \\cdot \\sqrt{|\\Delta|}$. Vd $x^2 + x + 1 = 0$ có $\\Delta = -3 \\to x = (-1 \\pm i\\sqrt{3})/2$.

Trong chương trình này:

- **Tầng 1 (Algebra)**: chỉ làm việc trên trường số thực — khi $\\Delta < 0$ ta nói "vô nghiệm".
- **Tầng 2 (Trigonometry, Complex Numbers)**: số phức được giới thiệu chính thức — $\\Delta < 0$ không còn là vô nghiệm mà là "2 nghiệm phức liên hợp".
- **Ứng dụng ML**: số phức ít xuất hiện trực tiếp trong deep learning, nhưng cực kỳ quan trọng trong **xử lý tín hiệu** (Fourier transform), **stability** của recurrent network, và **quantum computing**.

### ⚠ Lỗi thường gặp

**1. Quên check $a = 0$.** Công thức $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ chia cho $2a$. Nếu $a = 0$ (mẫu = 0), phương trình thực ra là $bx + c = 0$ (bậc 1), không phải bậc 2. Luôn kiểm tra $a \\neq 0$ trước khi áp công thức Δ.

- Vd sai: giải $0 \\cdot x^2 + 2x - 4 = 0$ bằng $\\Delta = 4 - 0 = 4$, $\\sqrt{\\Delta} = 2$, $x = (-2 \\pm 2)/0 \\to$ ??? chia cho 0!
- Cách đúng: $a = 0 \\to$ phương trình là $2x - 4 = 0 \\to x = 2$.

**2. Tính Δ nhầm dấu (đặc biệt khi $b$ âm).** $b^2$ luôn không âm dù $b$ âm hay dương. Vd $b = -5$:

- Sai: $\\Delta = -5^2 - 4 \\cdot 1 \\cdot 6 = -25 - 24 = -49$ (NHẦM: thiếu ngoặc)
- Đúng: $\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1$

Quy tắc: **luôn đặt $b$ trong ngoặc** trước khi bình phương, đặc biệt khi viết tay. $(-5)^2 = 25$, không phải $-5^2 = -25$.

**3. Vẽ parabol mở sai chiều khi $a < 0$.** Nhớ:

- $a > 0 \\to$ parabol mở **lên** (∪), có **min**.
- $a < 0 \\to$ parabol mở **xuống** (∩), có **max**.

Lỗi thường gặp: thấy $y = -2x^2 + 4x - 1$ nhưng vẫn vẽ "thung lũng" $\\to$ sai. Phải vẽ "ngọn đồi". Mẹo: nhìn dấu của $a$ là việc đầu tiên trước khi làm bất kỳ thứ gì khác.

**4. Quên dấu khi tính $-b$.** Vd $b = -5 \\to -b = 5$, không phải $-(-5) = -5$. Lỗi này hay xảy ra khi tính $x_v = -b/(2a)$.

### 🔁 Dừng lại tự kiểm tra (B.5)

1. $2x^2 + 3x - 2 = 0$: Δ bằng bao nhiêu? *(Đáp: $9 + 16 = 25 > 0 \\to$ 2 nghiệm)*
2. Parabol $y = -x^2 + 2x - 5$ mở lên hay xuống? Có cắt Ox không? *(Đáp: mở **xuống** vì $a = -1 < 0$. $\\Delta = 4 - 20 = -16 < 0 \\to$ không cắt Ox. Parabol nằm hoàn toàn dưới Ox.)*
3. Vì sao trong công thức nghiệm có $2a$ ở mẫu mà không phải $a$? *(Đáp: do completing the square sinh ra hệ số $2k$, kéo theo $k = b/(2a)$.)*

### 📝 Tóm tắt B.5

- $\\Delta = b^2 - 4ac$ là **biệt thức**, quyết định số nghiệm.
- Trực giác hình học: dấu $\\Delta$ cho biết vị trí đỉnh so với Ox.
- Công thức nghiệm $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ đến từ completing the square — không phải "phép màu".
- Luôn check $a \\neq 0$ trước; nhớ $(-b)^2 = b^2$ (đặt ngoặc); vẽ đúng chiều mở theo dấu $a$.

## B.6. Định lý Viète

### 💡 Trực giác: "đảo ngược" việc phân tích nhân tử

Nếu biết 2 nghiệm $x_1$ và $x_2$ của một đa thức bậc 2 monic (hệ số $a = 1$), ta có thể **khôi phục lại** đa thức:

$$\\begin{aligned}
(x - x_1)(x - x_2) &= 0 \\\\[4pt]
\\Leftrightarrow x^2 - x_2 \\cdot x - x_1 \\cdot x + x_1 \\cdot x_2 &= 0 \\\\[4pt]
\\Leftrightarrow x^2 - (x_1 + x_2) \\cdot x + x_1 \\cdot x_2 &= 0
\\end{aligned}$$

So với dạng chuẩn $x^2 + b \\cdot x + c = 0$, ta đọc ngay:

$$\\begin{aligned}
b = -(x_1 + x_2) &\\;\\to\\; x_1 + x_2 = -b \\\\[4pt]
c = x_1 \\cdot x_2 &\\;\\to\\; x_1 \\cdot x_2 = c
\\end{aligned}$$

Với $a \\neq 1$, chia cả hai vế $ax^2 + bx + c = 0$ cho $a$ đưa về dạng monic $x^2 + (b/a)x + (c/a) = 0$, nên kết quả tổng quát:

Nếu $ax^2 + bx + c = 0$ có 2 nghiệm $x_1$, $x_2$ (kể cả nghiệm kép, hoặc nghiệm phức), thì:

$$S = x_1 + x_2 = \\frac{-b}{a}, \\qquad P = x_1 \\cdot x_2 = \\frac{c}{a}$$

### Vì sao đúng? (chứng minh đầy đủ)

Khai triển $a(x - x_1)(x - x_2) = a \\cdot x^2 - a(x_1 + x_2) \\cdot x + a \\cdot x_1 \\cdot x_2$. So sánh với $ax^2 + bx + c$ thì $-a(x_1 + x_2) = b$ và $a \\cdot x_1 \\cdot x_2 = c$. Từ đó suy ra $S = -b/a$, $P = c/a$.

### Ứng dụng — nhẩm nghiệm (walk-through 3 ví dụ)

Mọi ví dụ dưới đây dùng dạng monic ($a = 1$), tức tìm 2 số có **tổng = -b** và **tích = c**.

**Ví dụ 1.** $x^2 - 5x + 6 = 0$.
- Tổng nghiệm: $-b = 5$. Tích nghiệm: $c = 6$.
- Tìm 2 số có tổng 5, tích 6: thử các cặp $(1,6), (2,3), (3,2), (6,1)$ — cặp $(2, 3)$ cho tổng 5. ✓
- Nghiệm: $x_1 = 2$, $x_2 = 3$. Phân tích: $(x - 2)(x - 3) = 0$.

**Ví dụ 2.** $x^2 + 7x + 12 = 0$.
- Tổng nghiệm: $-b = -7$. Tích nghiệm: $c = 12$.
- Tích dương + tổng âm $\\to$ **cả hai nghiệm âm**. Tìm 2 số âm tổng -7, tích 12: $(-3, -4)$ cho tổng -7, tích 12. ✓
- Nghiệm: $x = -3$, $x = -4$.

**Ví dụ 3.** $x^2 - x - 12 = 0$.
- Tổng: $-b = 1$. Tích: $c = -12$.
- Tích âm $\\to$ **một dương một âm**. Tìm cặp: $(4, -3)$ cho tổng 1, tích -12. ✓
- Nghiệm: $x = 4$, $x = -3$.

**Ví dụ 4 (a ≠ 1).** $2x^2 - 5x - 3 = 0$.
- Chia cho 2: $x^2 - 2.5x - 1.5 = 0$. Tổng $= 2.5$, tích $= -1.5$.
- Cặp $(3, -0.5)$: tổng 2.5, tích -1.5. ✓
- Nghiệm: $x = 3$, $x = -0.5$. Phân tích: $2(x - 3)(x + 0.5) = (x - 3)(2x + 1)$.

> **Quy tắc dấu nhanh** (cho dạng $x^2 + bx + c$):
> - $c > 0, b > 0 \\to$ cả 2 nghiệm âm.
> - $c > 0, b < 0 \\to$ cả 2 nghiệm dương.
> - $c < 0 \\to$ 1 nghiệm dương, 1 nghiệm âm (không phụ thuộc dấu $b$).
> - $c = 0 \\to$ 1 nghiệm bằng 0 (nghiệm còn lại $= -b$).

### Ứng dụng — kiểm tra nghiệm

Vừa giải xong $2x^2 - 5x - 3 = 0$ và được $x = 3$, $x = -0.5$. Kiểm tra nhanh:

$$\\begin{aligned}
S = 3 + (-0.5) = 2.5 = -(-5)/2 = -b/a \\quad &\\checkmark \\\\[4pt]
P = 3 \\cdot (-0.5) = -1.5 = -3/2 = c/a \\quad &\\checkmark
\\end{aligned}$$

Nếu một trong hai số không khớp → tính sai ở đâu đó, làm lại.

### 📝 Tóm tắt B.6

- Viète: $S = x_1 + x_2 = -b/a$, $P = x_1 \\cdot x_2 = c/a$.
- Trực giác: đảo ngược việc phân tích $(x - x_1)(x - x_2)$.
- Ứng dụng chính: nhẩm nghiệm khi tổng/tích là số nguyên đẹp, và kiểm tra kết quả sau khi giải bằng Δ.

## B.7. Phân tích thành nhân tử

Nếu $ax^2 + bx + c = 0$ có 2 nghiệm $x_1$, $x_2$ thì:

$$ax^2 + bx + c = a \\cdot (x - x_1) \\cdot (x - x_2)$$

**Ví dụ.** $x^2 - 5x + 6$ có nghiệm $2$ và $3 \\to x^2 - 5x + 6 = (x - 2)(x - 3)$.

Kiểm tra: $(x - 2)(x - 3) = x^2 - 3x - 2x + 6 = x^2 - 5x + 6$ ✓.

**Ví dụ với $a \\neq 1$.** $2x^2 - 5x - 3$ có nghiệm $3$ và $-0.5 \\to 2x^2 - 5x - 3 = 2(x - 3)(x + 0.5) = (x - 3)(2x + 1)$.

> Phân tích thành nhân tử rất hữu ích khi rút gọn phân thức hoặc tìm giới hạn (sẽ học ở Tầng 3 — Calculus).

## B.8. Hoàn thành bình phương (completing the square)

Biến $y = ax^2 + bx + c$ về **dạng đỉnh** $y = a \\cdot (x - h)^2 + k$ với $(h, k)$ là đỉnh.

### Vì sao cần dạng đỉnh?

- Đọc đỉnh và giá trị min/max ngay lập tức, không cần công thức.
- Là kỹ thuật chứng minh công thức nghiệm.
- Trong giải tích và tối ưu, dạng $(x - h)^2 + k$ rất thân thiện để lấy đạo hàm và tìm cực trị.

### Quy trình 4 bước

Cho $f(x) = ax^2 + bx + c$:

1. **Đặt a ra ngoài** 2 hạng tử đầu: $f(x) = a \\cdot (x^2 + (b/a) \\cdot x) + c$.
2. **Bù trừ** nửa hệ số $x$ bình phương: thêm và bớt $(b/(2a))^2$ bên trong ngoặc.
3. **Gom thành bình phương**: $(x + b/(2a))^2$.
4. **Rút gọn**: thu được $a \\cdot (x + b/(2a))^2 + (c - b^2/(4a)) = a \\cdot (x - h)^2 + k$.

Với $h = -b/(2a)$ và $k = c - b^2/(4a) = -\\Delta/(4a)$.

### Ví dụ 1 (dễ — \`a = 1\`): \`y = x² + 6x + 5\`

$$\\begin{aligned}
y = x^2 + 6x + 5 &= (x^2 + 6x + 9) - 9 + 5 &&\\text{(thêm } 9 = (6/2)^2, \\text{ trừ lại để cân bằng)} \\\\[4pt]
  &= (x + 3)^2 - 4
\\end{aligned}$$

Tại sao thêm $9$? Vì $(x + k)^2 = x^2 + 2kx + k^2$. So với $x^2 + 6x$ ta cần $2k = 6 \\Rightarrow k = 3 \\Rightarrow k^2 = 9$.

Đỉnh: đọc từ $(x - (-3))^2 + (-4) \\to (h, k) = (-3, -4)$. Min của $y$ là $-4$, đạt tại $x = -3$.

Kiểm tra bằng công thức: $x_v = -b/(2a) = -6/2 = -3$ ✓, $y_v = f(-3) = 9 - 18 + 5 = -4$ ✓.

### Ví dụ 2 (vừa — \`a ≠ 1\`): \`y = 2x² + 8x + 5\`

$$\\begin{aligned}
y = 2x^2 + 8x + 5 &= 2 \\cdot (x^2 + 4x) + 5 &&\\text{(rút 2 ra ngoài 2 hạng tử đầu)} \\\\[4pt]
  &= 2 \\cdot (x^2 + 4x + 4 - 4) + 5 &&\\text{(thêm/bớt } 4 = (4/2)^2) \\\\[4pt]
  &= 2 \\cdot ((x + 2)^2 - 4) + 5 \\\\[4pt]
  &= 2 \\cdot (x + 2)^2 - 2 \\cdot 4 + 5 &&\\text{(nhân phân phối)} \\\\[4pt]
  &= 2 \\cdot (x + 2)^2 - 8 + 5 \\\\[4pt]
  &= 2 \\cdot (x + 2)^2 - 3
\\end{aligned}$$

Đỉnh: $(-2, -3)$. Vì $a = 2 > 0$, parabol mở lên, **min = -3** tại $x = -2$.

**Cẩn thận lỗi hay gặp:** Khi rút $a$ ra ngoài rồi cộng $4$ bên trong ngoặc, để cân bằng phải **trừ $2 \\cdot 4 = 8$ ngoài ngoặc**, không phải $-4$. Tức là số hạng bù trừ thực tế là $a \\cdot k^2 = 2 \\cdot 4$. Nếu quên nhân với $a$, kết quả sẽ sai.

Kiểm tra: $x_v = -8/(2 \\cdot 2) = -2$ ✓. $f(-2) = 2 \\cdot 4 - 16 + 5 = 8 - 16 + 5 = -3$ ✓.

### Ví dụ 3 (khó — \`a < 0\`): \`y = -x² + 4x + 1\`

Cẩn thận khi rút số âm:

$$\\begin{aligned}
y = -x^2 + 4x + 1 &= -(x^2 - 4x) + 1 &&\\text{(rút -1 ra, đổi dấu các hạng tử bên trong)} \\\\[4pt]
  &= -(x^2 - 4x + 4 - 4) + 1 &&\\text{(thêm/bớt } 4 = (4/2)^2) \\\\[4pt]
  &= -((x - 2)^2 - 4) + 1 \\\\[4pt]
  &= -(x - 2)^2 + 4 + 1 &&\\text{(phân phối -1: } -(-4) = +4) \\\\[4pt]
  &= -(x - 2)^2 + 5
\\end{aligned}$$

Đỉnh: $(2, 5)$. Vì $a = -1 < 0$, parabol mở **xuống**, **max = 5** tại $x = 2$.

Kiểm tra: $x_v = -4/(2 \\cdot (-1)) = -4/-2 = 2$ ✓. $f(2) = -4 + 8 + 1 = 5$ ✓.

**Bẫy quan trọng:** Khi rút $-1$ ra, **các dấu bên trong ngoặc đổi**: $-x^2 + 4x = -(x^2 - 4x)$. Nếu để nguyên $-(x^2 + 4x)$ thì khi khai triển ngược lại được $-x^2 - 4x$, sai dấu của $4x$.

> **Quy luật nhớ chung**:
> 1. Rút $a$ ra khỏi hai hạng tử đầu (chỉ khi $a \\neq 1$).
> 2. Tính $k = b'/2$ với $b'$ là hệ số của $x$ *bên trong ngoặc*. Thêm $k^2$ rồi bớt $k^2$.
> 3. Gom $(x + k)^2$, phân phối $a$ ngược ra, cộng hằng số cũ.
> 4. Đọc đỉnh $(h, k_v) = (-k, \\ldots)$ từ dạng cuối.

### 🔁 Dừng lại tự kiểm tra (B.8)

1. Đưa $y = x^2 + 10x + 21$ về dạng đỉnh. *(Đáp: $(x + 5)^2 - 4$. Đỉnh $(-5, -4)$.)*
2. Đưa $y = 3x^2 - 6x + 1$ về dạng đỉnh. *(Đáp: $3(x - 1)^2 - 2$. Đỉnh $(1, -2)$.)*
3. Tại sao khi $a < 0$ ta vẫn dùng đúng công thức completing the square mà kết quả tự động ra "max"? *(Đáp: vì $a \\cdot (x - h)^2 \\leq 0$ khi $a < 0$, đạt giá trị lớn nhất $0$ khi $x = h$. Do đó $y = a \\cdot (x - h)^2 + k$ đạt max $k$.)*

### 📝 Tóm tắt B.8

- Completing the square biến $ax^2 + bx + c$ về $a(x - h)^2 + k$ với $(h, k)$ là đỉnh.
- Khóa: thêm/bớt $(b'/2)^2$ với $b'$ là hệ số $x$ bên trong ngoặc sau khi đã rút $a$.
- Khi $a < 0$: nhớ đổi dấu các hạng tử khi rút âm ra.
- Ứng dụng: đọc đỉnh ngay lập tức, chứng minh công thức nghiệm, dùng trong tối ưu hóa.

## B.9. Tại sao hàm bậc 2 quan trọng cho ML?

Quay lại linear regression ở A.7:

$$\\text{Loss}(a, b) = \\frac{1}{n} \\sum (y_i - a \\cdot x_i - b)^2$$

Khai triển bình phương theo $a$ và $b$, ta được một biểu thức bậc 2 — chính xác hơn, một **paraboloid** (parabol 2D). Tính chất quan trọng:

1. **Parabol mở lên** vì hệ số bậc 2 ($\\sum x_i^2$, $\\sum 1 = n$) đều dương.
2. **Có duy nhất 1 đỉnh** — chính là **giá trị min toàn cục** của loss.
3. Đỉnh có **công thức đóng** (closed-form solution):

$$\\begin{aligned}
a^* &= \\frac{n \\cdot \\sum x_i y_i - \\sum x_i \\cdot \\sum y_i}{n \\cdot \\sum x_i^2 - (\\sum x_i)^2} \\\\[4pt]
b^* &= \\frac{\\sum y_i - a^* \\cdot \\sum x_i}{n}
\\end{aligned}$$

Đây là lời giải **chính xác**, không cần huấn luyện lặp. Đúng theo đúng nghĩa: lấy đạo hàm theo $a, b$ bằng 0 (vì đỉnh parabol là chỗ đạo hàm = 0), giải hệ phương trình tuyến tính 2 ẩn $\\to$ ra $(a^*, b^*)$.

> Vì sao linear regression dạy đầu tiên trong mọi khóa ML? Vì loss của nó là parabol — một bài toán đại số phổ thông. Mọi mô hình phức tạp hơn (logistic regression, neural network) đều có loss không phải parabol thuần — không có closed-form, phải dùng **gradient descent** (đi xuống dốc parabol cục bộ). Hiểu parabol = hiểu cái cốt lõi của gradient descent.

Toy example với 3 điểm $(1, 2), (2, 3), (3, 5)$:

$$\\begin{aligned}
n &= 3 \\\\[4pt]
\\sum x_i = 6, \\; \\sum y_i &= 10, \\; \\sum x_i y_i = 1 \\cdot 2 + 2 \\cdot 3 + 3 \\cdot 5 = 23, \\; \\sum x_i^2 = 14 \\\\[4pt]
a^* &= \\frac{3 \\cdot 23 - 6 \\cdot 10}{3 \\cdot 14 - 36} = \\frac{69 - 60}{42 - 36} = \\frac{9}{6} = 1.5 \\\\[4pt]
b^* &= \\frac{10 - 1.5 \\cdot 6}{3} = \\frac{10 - 9}{3} = \\frac{1}{3} \\approx 0.333
\\end{aligned}$$

Đường khớp nhất: $y = 1.5 \\cdot x + 0.333$.

Kiểm tra: tại $x = 1, 2, 3$ thì mô hình dự đoán $1.833, 3.333, 4.833$. So với thực tế $2, 3, 5$ — sai khoảng $0.17, 0.33, 0.17$. Không cách nào tốt hơn được.

### Vì sao MSE loss là parabol theo trọng số?

Cố định $b$ thành một giá trị bất kỳ và xem MSE loss theo riêng $a$:

$$\\begin{aligned}
L(a) &= \\frac{1}{n} \\sum_i (y_i - a \\cdot x_i - b)^2 \\\\[4pt]
     &= \\frac{1}{n} \\sum_i (a^2 \\cdot x_i^2 - 2 \\cdot a \\cdot x_i \\cdot (y_i - b) + (y_i - b)^2) \\\\[4pt]
     &= \\frac{\\sum x_i^2}{n} \\cdot a^2 - \\frac{2 \\cdot \\sum x_i (y_i - b)}{n} \\cdot a + \\frac{\\sum (y_i - b)^2}{n} \\\\[4pt]
     &= A \\cdot a^2 + B \\cdot a + C
\\end{aligned}$$

với $A = \\dfrac{\\sum x_i^2}{n}$, $B = \\dfrac{-2 \\cdot \\sum x_i (y_i - b)}{n}$, $C = \\dfrac{\\sum (y_i - b)^2}{n}$. Đây chính là **parabol theo $a$** với:

- $A > 0$ (vì $x_i^2$ luôn không âm và $n > 0$) $\\Rightarrow$ parabol **mở lên** $\\Rightarrow$ có **min duy nhất**.
- Đỉnh parabol = chỗ loss nhỏ nhất = giá trị $a^*$ tốt nhất.
- Hoành độ đỉnh: $a^* = -B/(2A)$. Đây chính là công thức closed-form ở phần trước.

Tương tự, cố định $a$ ta được loss theo $b$ cũng là parabol. Cả $L(a, b)$ xét đồng thời là một **paraboloid** (parabol 2 chiều) — vẫn có 1 đỉnh duy nhất.

**Đỉnh chính là loss tối thiểu → đó là lý do linear regression có closed-form solution.** Đạo hàm bậc 1 của một parabol là một đường thẳng; set đường thẳng đó = 0 $\\to$ giải ra 1 nghiệm = đỉnh.

### Vì sao neural network không có closed-form?

Trong neural network, loss không phải parabol nữa. Lý do: hàm phi tuyến (activation function) như sigmoid, ReLU, tanh được áp vào giữa các tầng, biến loss thành một bề mặt **lồi lõm phức tạp** với nhiều cực trị cục bộ (local minima), điểm yên ngựa (saddle points), v.v.

Hệ quả:

- Không thể "lấy đạo hàm bằng 0 → giải hệ phương trình" để ra closed-form.
- Phải dùng **gradient descent**: bắt đầu từ một điểm ngẫu nhiên, đi theo hướng dốc nhất xuống dưới, lặp lại đến khi không xuống được nữa.
- "Đi xuống parabol" là phép ẩn dụ chính xác về mặt cục bộ: ở mỗi điểm, gradient descent hành xử như đang trượt xuống một parabol địa phương được xấp xỉ bằng đạo hàm bậc 2.

> **Tóm gọn nguyên tắc:** Loss bậc 2 (parabol) → closed-form. Loss bất kỳ → gradient descent. Linear regression là trường hợp đặc biệt may mắn vì loss tự nhiên là parabol.

### 📝 Tóm tắt B.9

- MSE loss của linear regression có dạng $L(w) = A \\cdot w^2 + B \\cdot w + C$ theo trọng số $w \\to$ đỉnh = min toàn cục.
- Vì A > 0 luôn (do $\\sum x_i^2/n > 0$), parabol mở lên, đỉnh là min.
- Closed-form solution = công thức tìm đỉnh parabol = $-b/(2a)$ áp lên $L(w)$.
- Neural network: loss không bậc 2 → không closed-form → phải dùng gradient descent.

---

# Bài tập

## Bài 1

Cho $y = 2x - 3$.

a) Xác định slope và y-intercept.
b) Tìm giao điểm với trục Ox.
c) Tính $f(0)$, $f(1)$, $f(-2)$.
d) Lập bảng giá trị 5 điểm với $x \\in \\{-2, -1, 0, 1, 2\\}$ và mô tả dáng đồ thị.

## Bài 2

Viết phương trình đường thẳng đi qua hai điểm $(1, 4)$ và $(3, 10)$. Đường này có song song với $y = 3x - 5$ không? Vì sao?

## Bài 3

Cho $y = x^2 - 4x + 3$.

a) Tìm đỉnh và trục đối xứng.
b) Tính biệt thức Δ và nghiệm (nếu có).
c) Tìm giao điểm với trục Oy.
d) Lập bảng giá trị với $x \\in \\{-1, 0, 1, 2, 3, 4, 5\\}$ và mô tả dáng parabol.

## Bài 4

Giải phương trình $2x^2 - 5x - 3 = 0$ bằng 2 cách:

a) Công thức nghiệm (delta method).
b) Phân tích thành nhân tử.

Kiểm tra lại kết quả bằng định lý Viète.

## Bài 5

Biến $f(x) = 3x^2 + 12x + 7$ về dạng đỉnh $a \\cdot (x - h)^2 + k$. Từ đó đọc tọa độ đỉnh và giá trị min.

## Bài 6 — Code Go

Viết hàm \`solveQuadratic(a, b, c float64) (roots []float64, status string)\` trả về danh sách nghiệm thực và mô tả trạng thái:

- Nếu \`a == 0\`: chuyển sang giải $bx + c = 0$ (linear case). Cẩn thận thêm trường hợp $a = b = 0$.
- Nếu $a \\neq 0$: tính $\\Delta$ và trả về 0/1/2 nghiệm tương ứng.

Demo trên ít nhất 4 input bao trùm các trường hợp.

---

# Lời giải chi tiết

## Lời giải bài 1

**a) Slope và y-intercept.** So với dạng $y = ax + b$: $a = 2$, $b = -3$. Slope $= 2$, y-intercept $= -3$. Đường thẳng cắt Oy tại $(0, -3)$.

**b) Giao Ox.** Giải $2x - 3 = 0 \\Rightarrow x = 3/2 = 1.5$. Đường thẳng cắt Ox tại $(1.5, 0)$.

**c) Giá trị hàm:**

- $f(0) = 2 \\cdot 0 - 3 = -3$
- $f(1) = 2 \\cdot 1 - 3 = -1$
- $f(-2) = 2 \\cdot (-2) - 3 = -7$

**d) Bảng giá trị:**

| x  | -2 | -1 |  0 |  1 |  2 |
|----|----|----|----|----|----|
| y  | -7 | -5 | -3 | -1 |  1 |

Mỗi đơn vị $x$ tăng thì $y$ tăng đúng 2 đơn vị (= slope). Đường đi lên (vì $a > 0$).

## Lời giải bài 2

**Bước 1 — tính slope:**

$$a = \\frac{10 - 4}{3 - 1} = \\frac{6}{2} = 3$$

**Bước 2 — tìm b:** thay điểm $(1, 4)$:

$$4 = 3 \\cdot 1 + b \\quad\\Rightarrow\\quad b = 1$$

Phương trình: $y = 3x + 1$. Kiểm tra với điểm thứ hai: $3 \\cdot 3 + 1 = 10$ ✓.

**Quan hệ với $y = 3x - 5$:** Cùng slope $a = 3$ nhưng khác y-intercept ($1$ vs $-5$) $\\to$ **hai đường song song** (parallel), không bao giờ cắt nhau.

## Lời giải bài 3

$a = 1, b = -4, c = 3$.

**a) Đỉnh.**

$$\\begin{aligned}
x_v = -b/(2a) = 4/2 &= 2 \\\\[4pt]
y_v = f(2) = 4 - 8 + 3 &= -1 \\\\[4pt]
\\text{Đỉnh}: (2, -1), \\quad \\text{trục đối xứng}: \\; x &= 2
\\end{aligned}$$

**b) Nghiệm.**

$$\\begin{aligned}
\\Delta = b^2 - 4ac = 16 - 12 &= 4 \\\\[4pt]
\\sqrt{\\Delta} &= 2 \\\\[4pt]
x_1 = (4 + 2)/2 &= 3 \\\\[4pt]
x_2 = (4 - 2)/2 &= 1
\\end{aligned}$$

Hai nghiệm: $x = 1$ và $x = 3$.

**c) Giao Oy.** $f(0) = 3 \\to$ cắt Oy tại $(0, 3)$.

**d) Bảng giá trị:**

| x  | -1 |  0 |  1 |  2 |  3 |  4 |  5 |
|----|----|----|----|----|----|----|----|
| y  |  8 |  3 |  0 | -1 |  0 |  3 |  8 |

Đối xứng quanh $x = 2$: $f(1) = f(3) = 0$, $f(0) = f(4) = 3$, $f(-1) = f(5) = 8$. Parabol mở lên ($a = 1 > 0$), min tại đỉnh $(2, -1)$.

## Lời giải bài 4

$2x^2 - 5x - 3 = 0$, tức $a = 2, b = -5, c = -3$.

**a) Công thức nghiệm.**

$$\\begin{aligned}
\\Delta = (-5)^2 - 4 \\cdot 2 \\cdot (-3) = 25 + 24 &= 49 \\\\[4pt]
\\sqrt{\\Delta} &= 7 \\\\[4pt]
x_1 = (5 + 7)/4 = 12/4 &= 3 \\\\[4pt]
x_2 = (5 - 7)/4 = -2/4 &= -0.5
\\end{aligned}$$

**b) Phân tích thành nhân tử.** Cần $2x^2 - 5x - 3 = (px + q)(rx + s)$ với $pr = 2, qs = -3, ps + qr = -5$. Thử $p = 2, r = 1, q = 1, s = -3$:

$$(2x + 1)(x - 3) = 2x^2 - 6x + x - 3 = 2x^2 - 5x - 3 \\quad\\checkmark$$

Nghiệm: $2x + 1 = 0 \\Rightarrow x = -0.5$, $x - 3 = 0 \\Rightarrow x = 3$. Trùng với cách (a).

**Kiểm tra Viète.**

$$\\begin{aligned}
S = 3 + (-0.5) = 2.5; \\quad -b/a = 5/2 = 2.5 \\quad &\\checkmark \\\\[4pt]
P = 3 \\cdot (-0.5) = -1.5; \\quad c/a = -3/2 = -1.5 \\quad &\\checkmark
\\end{aligned}$$

## Lời giải bài 5

$f(x) = 3x^2 + 12x + 7$, $a = 3, b = 12, c = 7$.

$$\\begin{aligned}
f(x) = 3 \\cdot (x^2 + 4x) + 7 &= 3 \\cdot (x^2 + 4x + 4 - 4) + 7 &&\\text{(} (4/2)^2 = 4 \\text{)} \\\\[4pt]
     &= 3 \\cdot (x + 2)^2 - 12 + 7 \\\\[4pt]
     &= 3 \\cdot (x + 2)^2 - 5 \\\\[4pt]
     &= 3 \\cdot (x - (-2))^2 + (-5)
\\end{aligned}$$

Đỉnh: $(h, k) = (-2, -5)$. Vì $a = 3 > 0$ (parabol mở lên), $y$ đạt **min = -5** tại $x = -2$.

Kiểm tra:

- $x_v = -b/(2a) = -12/6 = -2$ ✓.
- $f(-2) = 3 \\cdot 4 + 12 \\cdot (-2) + 7 = 12 - 24 + 7 = -5$ ✓.

## Lời giải bài 6 — code Go

Xem file [\`solutions.go\`](./solutions.go). Ý tưởng:

\`\`\`go
func solveQuadratic(a, b, c float64) ([]float64, string) {
    if a == 0 {
        // Suy biến thành bx + c = 0
        if b == 0 {
            if c == 0 {
                return nil, "degenerate: 0=0, vô số nghiệm"
            }
            return nil, "degenerate: c≠0, vô nghiệm"
        }
        return []float64{-c / b}, "linear (a=0): 1 nghiệm"
    }
    delta := b*b - 4*a*c
    switch {
    case delta > 0:
        s := math.Sqrt(delta)
        return []float64{(-b + s) / (2 * a), (-b - s) / (2 * a)},
            fmt.Sprintf("Δ=%.4g > 0: 2 nghiệm phân biệt", delta)
    case delta == 0:
        return []float64{-b / (2 * a)}, "Δ=0: nghiệm kép"
    default:
        return nil, fmt.Sprintf("Δ=%.4g < 0: vô nghiệm thực", delta)
    }
}
\`\`\`

**Độ phức tạp:** \`O(1)\` thời gian, \`O(1)\` bộ nhớ. Không có vòng lặp, chỉ thuần số học.

**Lưu ý số học:** Khi $b$ rất lớn so với $4ac$, công thức $\\dfrac{-b + \\sqrt{\\Delta}}{2a}$ có thể bị **cancellation error** (mất chữ số có nghĩa do trừ hai số gần bằng nhau). Cách khắc phục chuẩn ngành: dùng công thức "Citardauq" $\\dfrac{2c}{-b \\mp \\sqrt{\\Delta}}$ cho nghiệm bị cancellation. Trong bài này dataset nhỏ nên dùng công thức cơ bản; sẽ bàn kỹ ở Tầng 5 — Numerical Analysis.

---

# Tóm tắt

| Khái niệm | Hàm bậc 1 | Hàm bậc 2 |
|-----------|-----------|-----------|
| Dạng | $y = ax + b$ | $y = ax^2 + bx + c$ |
| Đồ thị | Đường thẳng | Parabol |
| "Hệ số chính" | Slope $a$ | Hướng & độ hẹp $a$ |
| Điểm đặc biệt | y-intercept $b$, x-intercept $-b/a$ | Đỉnh $(-b/(2a), -\\Delta/(4a))$ |
| Số nghiệm $f(x) = 0$ | Luôn đúng 1 | 0 / 1 / 2 tùy $\\Delta = b^2 - 4ac$ |
| Dạng đỉnh / chuẩn | (không cần) | $a(x - h)^2 + k$ |
| Ứng dụng ML chính | Dự đoán linear regression | MSE loss $\\to$ bài toán tìm đỉnh parabol |

---

# Liên kết

- [solutions.go](./solutions.go) — code Go cho hàm \`solveQuadratic\`, \`vertex\`, \`lineFrom2Points\`, \`completeTheSquare\` và đáp án các bài tập.
- [visualization.html](./visualization.html) — playground tương tác: linear, quadratic, delta visualizer, completing-the-square stepper.
- ← Bài trước: [Lesson 05 — Hàm số là gì](../lesson-05-functions/)
- → Bài tiếp: [Lesson 07 — Hàm mũ và hàm log](../lesson-07-exp-log-functions/)
- ↑ Mục lục tầng: [Tầng 1 — Algebra](../README.md)
`;
