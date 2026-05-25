# Lesson 06 — Hàm bậc 1 và hàm bậc 2

> **Tầng 1 — Algebra · Bài 6/8**
>
> Hai họ hàm "khởi điểm" của toán học và machine learning. Hiểu được hai họ này, bạn đã sở hữu khung nhìn để đọc gần như mọi mô hình hồi quy cơ bản: từ đồ thị giá nhà theo diện tích (linear) tới quỹ đạo ném bóng (quadratic), từ MSE loss tới gradient descent.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Viết được phương trình đường thẳng `y = ax + b` từ 2 điểm, từ slope + 1 điểm, hoặc từ slope + y-intercept.
- Đọc đồ thị parabol `y = ax² + bx + c`: nhận ra hướng mở, tìm đỉnh, trục đối xứng và nghiệm.
- Áp dụng **công thức nghiệm** (quadratic formula) và **định lý Viète** để giải/nhẩm nghiệm bậc 2.
- Phân tích đa thức bậc 2 thành nhân tử và biến đổi sang **dạng đỉnh** (completing the square).
- Hiểu mối liên hệ giữa hai hàm này và machine learning: vì sao **linear regression + MSE loss** là một bài toán parabol có lời giải đóng (closed-form).

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/): biết giải `ax + b = 0`.
- [Lesson 04 — Lũy thừa, căn, log](../lesson-04-powers-roots-logs/): biết `√Δ`, `b²` là gì.
- [Lesson 05 — Hàm số là gì](../lesson-05-functions/): biết domain/range, biết đọc đồ thị `y = f(x)`.

---

# Phần A — Hàm bậc 1 (linear function)

## A.1. Định nghĩa

Hàm bậc 1 (linear function) có dạng:

```
y = a·x + b      (với a ≠ 0)
```

- `a`, `b` là hai hằng số (số thực).
- `a` gọi là **hệ số góc** (slope, gradient).
- `b` gọi là **tung độ gốc** (y-intercept).
- Điều kiện `a ≠ 0` để phân biệt với hàm hằng `y = b` (đường nằm ngang, không phải hàm bậc 1).

**Đồ thị của hàm bậc 1 là một đường thẳng.** Đây là tính chất mang tính định nghĩa: hễ nói "linear" trong ngữ cảnh hàm 1 biến, hình ảnh xuất hiện trong đầu phải là đường thẳng.

### Ví dụ cụ thể

`y = 2x + 1`:

| x | -2 | -1 |  0 |  1 |  2 |
|---|----|----|----|----|----|
| y | -3 | -1 |  1 |  3 |  5 |

Mỗi khi `x` tăng 1, `y` tăng 2 — đúng bằng `a = 2`. Khi `x = 0`, `y = 1` — đúng bằng `b = 1`.

## A.2. Hệ số góc (slope) — `a`

### 💡 Trực giác: "độ dốc cầu thang"

Hình dung bạn đang leo cầu thang. Mỗi bậc thang có 2 con số:

- **Bước ngang** (chiều dài bậc): bao nhiêu cm bạn bước về phía trước.
- **Bước cao** (chiều cao bậc): bao nhiêu cm bạn nâng chân lên.

Tỷ số **bước cao / bước ngang** chính là **độ dốc** của cầu thang. Cầu thang dốc đứng có tỷ số lớn; cầu thang thoải có tỷ số nhỏ.

Slope của đường thẳng đúng là khái niệm đó, áp lên đồ thị:

```
       bước cao (rise)        Δy
slope = ───────────────  =  ─────
       bước ngang (run)       Δx
```

> Vì sao gọi "rise over run"? Vì người Anh dùng từ *rise* (đi lên) và *run* (chạy ngang) cho 2 cạnh của tam giác vuông tạo bởi 2 điểm trên đường thẳng.

### Ý nghĩa số học

`a` đo "tốc độ thay đổi" của `y` theo `x`:

> Mỗi khi `x` tăng thêm 1 đơn vị, `y` tăng thêm `a` đơn vị.

- `a = 2` → x tăng 1, y tăng 2.
- `a = -0.5` → x tăng 1, y giảm 0.5.
- `a = 0.001` → x tăng 1, y gần như không đổi (đường gần ngang).

### ASCII diagram cho `y = 2x + 1`

Khi `x` tăng từ 0 lên 1 (`Δx = 1`), `y` tăng từ 1 lên 3 (`Δy = 2`). Slope `a = 2/1 = 2`:

```
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
```

Đọc: từ điểm `(0, 1)` sang `(1, 3)`, ta đi **ngang 1 ô và lên cao 2 ô** → slope `= 2/1 = 2`. Đi tiếp từ `(1, 3)` sang `(2, 5)` cũng đi ngang 1, lên cao 2 — tỷ số luôn bằng 2 ở mọi cặp điểm liền kề. Đó là tính chất xác định của đường thẳng: slope **không đổi**.

### Tính slope từ 2 điểm

Cho 2 điểm `P₁ = (x₁, y₁)` và `P₂ = (x₂, y₂)` trên đường thẳng:

```
       y₂ − y₁
a  =  ─────────
       x₂ − x₁
```

Đọc là: "delta y trên delta x". Đây chính là "đi lên bao nhiêu chia cho đi sang bao nhiêu" (rise over run).

### Walk-through: tính slope từ 5 cặp điểm

| # | `P₁` | `P₂` | `Δy = y₂ − y₁` | `Δx = x₂ − x₁` | `a = Δy/Δx` | Diễn giải |
|---|------|------|----------------|----------------|-------------|-----------|
| 1 | `(1, 3)` | `(5, 11)` | `11 − 3 = 8` | `5 − 1 = 4` | `8/4 = 2` | Đi sang 4, lên 8 → mỗi bước ngang lên 2 |
| 2 | `(0, 0)` | `(3, 9)` | `9 − 0 = 9` | `3 − 0 = 3` | `9/3 = 3` | Dốc hơn ví dụ 1 |
| 3 | `(-2, 5)` | `(2, 1)` | `1 − 5 = -4` | `2 − (-2) = 4` | `-4/4 = -1` | Slope âm — đi xuống |
| 4 | `(1, 4)` | `(5, 4)` | `4 − 4 = 0` | `5 − 1 = 4` | `0/4 = 0` | Slope = 0 — đường nằm ngang |
| 5 | `(-3, -1)` | `(2, 9)` | `9 − (-1) = 10` | `2 − (-3) = 5` | `10/5 = 2` | Cùng slope 2 như ví dụ 1 → song song |

> **Mẹo dấu trừ**: khi `x₁` hoặc `y₁` âm, nhớ `5 − (-3) = 5 + 3 = 8`. Mất dấu là lỗi hay gặp nhất.

### ⚠ Cảnh báo: khi `x₂ = x₁`

Nếu hai điểm có **cùng hoành độ** `x₁ = x₂`, mẫu `Δx = 0` → **chia cho 0 → slope không xác định**. Đường nối hai điểm là **đường thẳng đứng** (vertical line), có phương trình dạng `x = c` chứ không phải `y = ax + b`.

```
Ví dụ: P₁ = (3, 1), P₂ = (3, 7)
Δx = 3 − 3 = 0  →  slope không tồn tại
Đường thẳng: x = 3 (đường đứng đi qua x = 3)
```

Quan trọng hơn: **đường thẳng đứng không phải là hàm số**. Vì với một giá trị `x = 3` ta lại có vô số `y` tương ứng — vi phạm định nghĩa hàm (mỗi `x` → đúng 1 `y`).

> Nhớ phân biệt: `slope = 0` (đường nằm ngang, `y = b`) khác với `slope không xác định` (đường đứng, `x = c`). Cái đầu vẫn là hàm (hằng), cái sau không phải hàm.

### Dấu của slope quyết định hình dạng

| `a` | Hình ảnh | Mô tả |
|-----|----------|-------|
| `a > 0` | ↗ | Đi từ trái dưới lên phải trên (đồng biến) |
| `a < 0` | ↘ | Đi từ trái trên xuống phải dưới (nghịch biến) |
| `a = 0` | →  | Nằm ngang — không phải hàm bậc 1 nữa |

`|a|` càng lớn thì đường càng dốc; `|a|` càng nhỏ thì đường càng thoải.

### ❓ Câu hỏi tự nhiên

**Q1: Slope = 0 nghĩa là gì?**

`a = 0` → mỗi khi `x` tăng 1, `y` tăng 0 — tức `y` **không đổi**. Đồ thị là đường nằm ngang `y = b`. Đây là **hàm hằng** (constant function), không còn được coi là hàm bậc 1 nữa (vì định nghĩa hàm bậc 1 yêu cầu `a ≠ 0`). Ví dụ: `y = 5` là đường ngang ở chiều cao 5, bất kể `x` bằng bao nhiêu.

**Q2: Slope âm tức là gì?**

`a < 0` → mỗi khi `x` tăng 1, `y` **giảm** `|a|` đơn vị. Đường thẳng dốc xuống từ trái sang phải.

```
Ví dụ: y = -3x + 10
x=0 → y=10
x=1 → y=7   (giảm 3)
x=2 → y=4   (giảm 3)
x=3 → y=1   (giảm 3)
```

Trong thực tế: "giá xe theo tuổi xe" có slope âm (xe càng cũ → giá càng thấp). "Lượng nước trong bồn theo thời gian khi đang xả" có slope âm.

**Q3: Tại sao 2 đường vuông góc có `a₁ · a₂ = -1`?**

Trực giác hình học: slope là `tan(θ)` với `θ` là góc đường thẳng tạo với trục Ox. Nếu hai đường vuông góc thì hai góc `θ₁` và `θ₂` lệch nhau đúng 90°, tức `θ₂ = θ₁ + 90°`.

Từ trig: `tan(θ + 90°) = -1/tan(θ)` (sẽ chứng minh ở Tầng 2 — Trigonometry). Vậy:

```
a₂ = tan(θ₂) = tan(θ₁ + 90°) = -1/tan(θ₁) = -1/a₁
⇒ a₁ · a₂ = -1
```

Cách hình dung "không cần trig": xoay đường `y = 2x` đi 90° quanh gốc tọa độ. Một bước "ngang 1, lên 2" sau khi xoay 90° trở thành "ngang -2, lên 1" → slope mới `= 1/(-2) = -0.5`. Tích `2 · (-0.5) = -1`. Quy tắc tổng quát: xoay 90° biến slope `a` thành `-1/a`.

> Lưu ý ngoại lệ: nếu một đường nằm ngang (`a = 0`) thì đường vuông góc với nó là đường đứng (slope không tồn tại) — quy tắc tích = -1 không áp dụng cho trường hợp suy biến này.

### 🔁 Dừng lại tự kiểm tra (A.2)

Trước khi đi tiếp, tự trả lời:

1. Slope của đường đi qua `(2, 7)` và `(6, 15)` bằng bao nhiêu? *(Đáp: `(15-7)/(6-2) = 8/4 = 2`)*
2. Hai đường `y = -3x + 1` và `y = (1/3)x + 5` có vuông góc không? *(Đáp: `(-3) · (1/3) = -1` → có)*
3. Hai điểm `(4, 2)` và `(4, 9)` có nối thành đồ thị hàm số không? *(Đáp: Không. `Δx = 0` → đường đứng `x = 4`, không phải hàm)*

### 📝 Tóm tắt A.2

- Slope = "độ dốc cầu thang" = `Δy / Δx` = "đi lên bao nhiêu / đi sang bao nhiêu".
- Slope không đổi trên toàn đường thẳng (đó là đặc trưng của đường thẳng).
- `a > 0`: lên dốc; `a < 0`: xuống dốc; `a = 0`: ngang (hàm hằng).
- `Δx = 0`: đường đứng, slope không xác định, không phải hàm.
- Vuông góc: `a₁ · a₂ = -1` (trừ trường hợp một đường ngang + một đường đứng).

## A.3. Tung độ gốc (y-intercept) — `b`

`b` là giá trị của `y` khi `x = 0`. Hình học: đường thẳng cắt **trục Oy** tại điểm `(0, b)`.

> Mẹo đọc nhanh: nhìn vào phương trình `y = ax + b`, số đứng riêng (không có x) chính là chỗ đường thẳng đâm vào trục dọc.

**Ví dụ.** `y = 2x − 5` → cắt Oy tại `(0, -5)`.

## A.4. Giao điểm với trục Ox (root / x-intercept)

Trục Ox là tập các điểm có `y = 0`. Để tìm giao điểm, giải phương trình:

```
a·x + b = 0   ⇔   x = -b / a
```

Đây chính là phương trình bậc 1 mà ta đã học ở [Lesson 03](../lesson-03-linear-equations/).

**Ví dụ.** `y = 2x − 6` cắt Ox tại `x = 6/2 = 3` → điểm `(3, 0)`.

> Trực giác: y-intercept là chỗ đường đụng "tường dọc" (Oy); x-intercept là chỗ đường đụng "sàn ngang" (Ox).

## A.5. Viết phương trình đường thẳng

Có 3 tình huống phổ biến:

### Trường hợp 1 — Biết slope và y-intercept

Quá đơn giản: ráp thẳng vào `y = ax + b`.

> Slope `3`, y-intercept `-2` → `y = 3x − 2`.

### Trường hợp 2 — Biết slope `a` và 1 điểm `(x₀, y₀)`

Thay vào `y₀ = a·x₀ + b` để tìm `b`.

**Ví dụ.** Slope `a = 2`, đi qua điểm `(1, 5)`:

```
5 = 2·1 + b
b = 5 − 2 = 3
y = 2x + 3
```

### Trường hợp 3 — Biết 2 điểm `(x₁, y₁)` và `(x₂, y₂)`

Hai bước:

1. Tính slope: `a = (y₂ − y₁) / (x₂ − x₁)`.
2. Thay 1 trong 2 điểm vào để tìm `b`.

**Ví dụ.** Đường thẳng đi qua `(1, 4)` và `(3, 10)`:

```
a = (10 − 4) / (3 − 1) = 6 / 2 = 3
Thay (1, 4): 4 = 3·1 + b  ⇒  b = 1
y = 3x + 1
```

Kiểm tra với điểm thứ hai: `3·3 + 1 = 10` ✓.

## A.6. Hai đường thẳng — song song và vuông góc

Cho `(d₁): y = a₁·x + b₁` và `(d₂): y = a₂·x + b₂`.

- **Song song**: `a₁ = a₂` và `b₁ ≠ b₂`. Cùng độ dốc nên không bao giờ gặp nhau.
- **Trùng nhau**: `a₁ = a₂` và `b₁ = b₂`. Cùng một đường.
- **Cắt nhau**: `a₁ ≠ a₂`. Có đúng 1 giao điểm.
- **Vuông góc**: `a₁ · a₂ = -1`. Ví dụ slope `2` vuông góc với slope `-1/2`.

> Tại sao tích slope = -1 thì vuông góc? Trực giác: slope = `tan(góc)`. Hai đường vuông góc thì góc lệch nhau 90°, mà `tan(α) · tan(α + 90°) = -1`. Bài Trigonometry ở Tầng 2 sẽ chứng minh.

**Ví dụ.** `y = 2x + 1` và `y = 2x − 4` song song (cùng `a = 2`). `y = 2x + 1` vuông góc với `y = -0.5x + 7` (vì `2 · (-0.5) = -1`).

## A.7. Tại sao hàm bậc 1 quan trọng cho ML?

**Linear regression** — bài toán machine learning "hello world" — chính là: cho một đám điểm dữ liệu `(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)`, tìm đường thẳng `y = ax + b` "khớp" nhất.

> Ví dụ: x = diện tích nhà (m²), y = giá nhà (tỷ đồng). Có 1000 căn nhà trong dataset. Tìm `a`, `b` để dự đoán giá cho căn nhà mới chỉ cần biết diện tích.

"Khớp nhất" được đo bằng **tổng bình phương sai lệch** (MSE — Mean Squared Error):

```
Loss(a, b) = (1/n) · Σ (yᵢ − (a·xᵢ + b))²
```

Hai điều quan trọng đáng ghi nhận ngay:

1. Phương trình dự đoán chỉ là `y = ax + b` — đúng hàm bậc 1.
2. **Loss là một hàm bậc 2 theo `a` và `b`** — sẽ thấy ở Phần B vì sao điều này khiến bài toán có **lời giải đóng** (closed-form), không cần huấn luyện lặp.

Linear regression không chỉ là bài tập sách giáo khoa: nó là khối Lego đầu tiên của neural network. Một neuron trong mạng deep learning, về bản chất, là `y = a·x + b` rồi bọc qua một hàm phi tuyến (activation function). Hiểu đường thẳng = hiểu neuron đơn lẻ.

### 💡 Trực giác "khớp nhất" với 3 điểm cụ thể

Cho 3 điểm `(1, 2), (2, 3.5), (3, 5.5)`. Bạn nhìn vào và "đoán bằng mắt" thấy: dữ liệu gần như nằm trên một đường thẳng, nhưng không hoàn hảo. Mỗi đường thẳng `y = ax + b` bạn vẽ thử sẽ "trượt qua" 3 điểm với một độ lệch nào đó.

Mục tiêu: tìm `(a, b)` sao cho **tổng bình phương sai lệch** giữa giá trị thực `yᵢ` và giá trị dự đoán `a·xᵢ + b` là **nhỏ nhất**.

```
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
```

Mỗi đường thẳng `(a, b)` cho một bộ 3 sai lệch khác nhau. Cần một **thước đo duy nhất** để so sánh: bình phương từng sai lệch rồi cộng lại (bình phương để: (1) sai âm và dương không triệt tiêu, (2) phạt nặng các sai lệch lớn).

### Định nghĩa MSE (Mean Squared Error)

Với `n` điểm `(xᵢ, yᵢ)`:

```
L(a, b) = (1/n) · Σᵢ (yᵢ − a·xᵢ − b)²
```

- `yᵢ` = giá trị thực.
- `a·xᵢ + b` = giá trị dự đoán.
- Hiệu `yᵢ − a·xᵢ − b` = sai lệch (residual).
- Bình phương để cộng dồn, chia `n` để lấy trung bình.

> **Vì sao bình phương mà không phải trị tuyệt đối `|yᵢ − a·xᵢ − b|`?** Bình phương cho phép lấy đạo hàm trơn tru (đạo hàm của `u²` là `2u`, mượt); trị tuyệt đối có "góc nhọn" tại 0, đạo hàm không tồn tại. Bình phương cũng "phạt nặng" outliers. Lựa chọn trị tuyệt đối được dùng trong **MAE loss** (Mean Absolute Error) — sẽ học sau.

### Walk-through: tìm `(a*, b*)` cho 3 điểm trên

**Bước 1 — viết tường minh L(a, b) với 3 điểm `(1, 2), (2, 3.5), (3, 5.5)`:**

```
3·L(a, b) = (2 − a − b)² + (3.5 − 2a − b)² + (5.5 − 3a − b)²
```

(Nhân 3 cho gọn — không ảnh hưởng vị trí điểm cực tiểu.)

**Bước 2 — đạo hàm theo b, set = 0:**

Đạo hàm theo `b` (xem `a` là hằng), nhớ `d/db (u²) = 2u · du/db`, ở đây `du/db = -1`:

```
∂/∂b: -2·[(2 − a − b) + (3.5 − 2a − b) + (5.5 − 3a − b)] = 0
     ⇔  (2 + 3.5 + 5.5) − (1 + 2 + 3)·a − 3·b = 0
     ⇔  11 − 6a − 3b = 0
     ⇔  6a + 3b = 11                                    (*)
```

**Bước 3 — đạo hàm theo a, set = 0:**

Tương tự, `du/da = -xᵢ`:

```
∂/∂a: -2·[1·(2 − a − b) + 2·(3.5 − 2a − b) + 3·(5.5 − 3a − b)] = 0
     ⇔  (1·2 + 2·3.5 + 3·5.5) − (1² + 2² + 3²)·a − (1+2+3)·b = 0
     ⇔  (2 + 7 + 16.5) − 14a − 6b = 0
     ⇔  25.5 − 14a − 6b = 0
     ⇔  14a + 6b = 25.5                                 (**)
```

**Bước 4 — giải hệ phương trình bậc 1 với 2 ẩn `(a, b)`:**

```
6a + 3b = 11      (*)
14a + 6b = 25.5   (**)
```

Nhân `(*)` với 2: `12a + 6b = 22`. Trừ `(**)`:

```
(14a + 6b) − (12a + 6b) = 25.5 − 22
2a = 3.5
a = 1.75
```

Thay vào `(*)`: `6·1.75 + 3b = 11 ⇒ 10.5 + 3b = 11 ⇒ 3b = 0.5 ⇒ b ≈ 0.1667`.

**Kết quả:** `a* ≈ 1.75`, `b* ≈ 0.17`. Đường khớp nhất:

```
y ≈ 1.75·x + 0.17
```

**Kiểm tra dự đoán:**

| x | y thực | y dự đoán = 1.75x + 0.17 | Sai lệch |
|---|--------|--------------------------|----------|
| 1 | 2     | 1.92                     | +0.08    |
| 2 | 3.5   | 3.67                     | -0.17    |
| 3 | 5.5   | 5.42                     | +0.08    |

Tổng sai lệch dương ≈ 0.16, tổng sai lệch âm ≈ -0.17 — gần như triệt tiêu nhau (đường khớp nhất đi "giữa" đám điểm). Đây là dấu hiệu của nghiệm tối ưu.

> **Liên hệ:** Hệ `(*)` và `(**)` chính là 2 phương trình bậc 1 với 2 ẩn — kỹ thuật giải hệ phương trình sẽ được học chi tiết ở [Lesson 08 — Hệ phương trình tuyến tính](../lesson-08-linear-systems/). Linear regression bản chất chỉ là "giải hệ phương trình tuyến tính bằng cách lấy đạo hàm MSE".

### 🔁 Dừng lại tự kiểm tra (Linear regression)

1. Vì sao ta bình phương sai lệch thay vì lấy trị tuyệt đối? *(Đáp: bình phương cho hàm trơn, lấy đạo hàm dễ, và phạt nặng sai lớn.)*
2. Với 3 điểm trên, nếu thử `(a, b) = (2, 0)` thay vì `(1.75, 0.17)`, MSE có lớn hơn không? *(Đáp: có. Tính thử `L(2,0) = ((2-2)² + (3.5-4)² + (5.5-6)²)/3 = (0 + 0.25 + 0.25)/3 ≈ 0.167`, trong khi `L(1.75, 0.17) ≈ (0.08² + 0.17² + 0.08²)/3 ≈ 0.013` — nhỏ hơn nhiều.)*
3. Nếu có 1 triệu điểm thay vì 3, các phương trình `(*)` và `(**)` có còn dạng bậc 1 với `(a, b)` không? *(Đáp: có. Bậc của ẩn `a, b` không đổi theo số điểm — chỉ các tổng `Σxᵢ`, `Σyᵢ`, `Σxᵢ²`, `Σxᵢyᵢ` thay đổi.)*

### 📝 Tóm tắt A.7

- Linear regression = tìm `(a, b)` để đường `y = ax + b` "khớp nhất" với đám điểm dữ liệu.
- "Khớp nhất" được đo bằng MSE: `L(a, b) = (1/n)·Σ(yᵢ − a·xᵢ − b)²`.
- MSE là hàm bậc 2 với `(a, b)` → có **đỉnh duy nhất** → lời giải đóng (closed-form).
- Cách tìm: đạo hàm `L` theo `a` và theo `b`, set bằng 0 → hệ 2 phương trình bậc 1 với 2 ẩn → giải ra `(a*, b*)`.
- Với 3 điểm `(1, 2), (2, 3.5), (3, 5.5)`: kết quả `a* = 1.75`, `b* ≈ 0.17`.

---

# Phần B — Hàm bậc 2 (quadratic function)

## B.1. Định nghĩa

Hàm bậc 2 (quadratic function) có dạng:

```
y = a·x² + b·x + c      (với a ≠ 0)
```

- `a`, `b`, `c` là 3 hằng số.
- Điều kiện `a ≠ 0` (nếu `a = 0` thì rơi về hàm bậc 1).

**Đồ thị của hàm bậc 2 là một parabol** (parabola — đường cong hình "hình chữ U" hoặc "hình chữ U lộn ngược").

### Ví dụ cụ thể

`y = x² − 4x + 3`:

| x  |  0 |  1 |  2 |  3 |  4 |
|----|----|----|----|----|----|
| y  |  3 |  0 | -1 |  0 |  3 |

Nhìn bảng đã thấy: y giảm rồi tăng, đạt min tại `x = 2`. Đó là **đỉnh** của parabol.

## B.2. Hướng mở và độ "rộng/hẹp"

Dấu của `a`:

| `a` | Hình dạng | Tính chất |
|-----|-----------|-----------|
| `a > 0` | ∪ (mở lên) | Có điểm thấp nhất (min) tại đỉnh |
| `a < 0` | ∩ (mở xuống) | Có điểm cao nhất (max) tại đỉnh |

`|a|` quyết định độ "hẹp":

- `|a|` lớn → parabol hẹp, hai cánh dựng đứng (ví dụ `y = 5x²`).
- `|a|` nhỏ → parabol bè, hai cánh thoải (ví dụ `y = 0.1x²`).

So sánh ở `x = 2`:

- `y = 5x²` → `y = 20` (cao vút).
- `y = x²` → `y = 4`.
- `y = 0.1x²` → `y = 0.4` (gần như bẹp).

## B.3. Đỉnh (vertex) của parabol

### 💡 Trực giác: điểm "cực trị" của parabol

Hình dung đồ thị `y = x²`: nó là một cái "thung lũng" hình chữ U. Đứng ở đáy thung lũng, mọi hướng đều đi lên — đó là **điểm thấp nhất**. Ngược lại, `y = -x²` là một "ngọn đồi" hình chữ U lộn ngược — đỉnh đồi là **điểm cao nhất**.

```
ASCII — y = x² (a > 0)            ASCII — y = -x² (a < 0)

    y                                  y
  9 |•           •                   0 |        •
    | \         /                      | \     / \     /
  4 |  •       •                    -1 |  \   /   \   /
    |   \     /                        |   • •     • •
  1 |    • • •                      -4 |    •       •
    |     ↑                            |     ↓
  0 +─────•─────→ x                 -9 |•           •
        đỉnh (0,0)                     +─────•─────→ x
        = MIN                              đỉnh (0,0)
                                           = MAX
```

- Với `a > 0`: parabol mở lên → đỉnh là điểm **thấp nhất** (min).
- Với `a < 0`: parabol mở xuống → đỉnh là điểm **cao nhất** (max).
- Mọi điểm khác trên parabol đều có `y` xa hơn (lên hoặc xuống) so với `y` tại đỉnh.

Trong tối ưu hóa và machine learning, "đi tìm đỉnh" = "đi tìm cực trị" = "giải bài toán tối ưu". Vì lí do này, parabol là cấu trúc cơ bản nhất mà bạn cần thông thạo.

**Đỉnh** là điểm cực trị (min hoặc max) của parabol. Tọa độ:

```
       -b          -Δ
xₐ = ─────    yₐ = ─────       với Δ = b² − 4ac
       2a          4a
```

> **Cách dễ nhớ**: Hoành độ đỉnh là `-b/(2a)`. Còn tung độ đỉnh? Khỏi học công thức — cứ thay `xₐ` vào hàm `y = ax² + bx + c` là ra.

**Ví dụ.** `y = x² − 4x + 3`:

```
a = 1, b = -4, c = 3
xₐ = -(-4) / (2·1) = 4/2 = 2
yₐ = f(2) = 2² − 4·2 + 3 = 4 − 8 + 3 = -1
Đỉnh: (2, -1)
```

Khớp với bảng ở B.1 — tại `x = 2` thì `y = -1`, là giá trị nhỏ nhất.

### Vì sao hoành độ đỉnh là `-b/(2a)`?

Trực giác: parabol đối xứng. Nếu nó cắt Ox tại `x₁` và `x₂` thì trục đối xứng đi qua trung điểm `(x₁ + x₂)/2`. Theo Viète (sẽ học ở B.6), `x₁ + x₂ = -b/a`, nên trung điểm là `-b/(2a)`. Ngay cả khi không có nghiệm thực, công thức này vẫn đúng vì parabol vẫn có trục đối xứng.

### Chứng minh chặt chẽ bằng completing the square (3 bước)

Bắt đầu từ `y = a·x² + b·x + c`.

**Bước 1 — đặt `a` ra ngoài 2 hạng tử đầu:**

```
y = a·(x² + (b/a)·x) + c
```

**Bước 2 — bù trừ để biến `x² + (b/a)·x` thành bình phương:**

Nhớ hằng đẳng thức `(x + k)² = x² + 2kx + k²`. Để khớp `x² + (b/a)x` với `x² + 2kx`, cần `2k = b/a ⇒ k = b/(2a)`. Thêm và bớt `k² = b²/(4a²)`:

```
y = a·(x² + (b/a)·x + b²/(4a²) − b²/(4a²)) + c
  = a·((x + b/(2a))² − b²/(4a²)) + c
  = a·(x + b/(2a))² − a · b²/(4a²) + c
  = a·(x + b/(2a))² − b²/(4a) + c
  = a·(x + b/(2a))² + (4ac − b²)/(4a)
  = a·(x + b/(2a))² − (b² − 4ac)/(4a)
  = a·(x − (-b/(2a)))² + (-Δ/(4a))
```

**Bước 3 — đọc đỉnh từ dạng `a·(x − h)² + k`:**

So sánh với `y = a·(x − h)² + k`, có `h = -b/(2a)` và `k = -Δ/(4a)`.

- Khi `a > 0`: `a·(x − h)² ≥ 0`, đạt **min = 0** khi `x = h`. Vậy `y` đạt min `= k` tại `x = h`.
- Khi `a < 0`: `a·(x − h)² ≤ 0`, đạt **max = 0** khi `x = h`. Vậy `y` đạt max `= k` tại `x = h`.

⇒ Đỉnh `(h, k) = (-b/(2a), -Δ/(4a))`. **QED**.

> Cách chứng minh này không cần Viète, không cần đạo hàm — chỉ dùng hằng đẳng thức bình phương. Đây cũng là chìa khóa để chứng minh **công thức nghiệm** ở B.5.

## B.4. Trục đối xứng

Trục đối xứng là **đường thẳng đứng đi qua đỉnh**:

```
x = -b / (2a)
```

Mọi parabol đều đối xứng qua trục này: `f(xₐ − k) = f(xₐ + k)` với mọi `k`.

**Ví dụ.** `y = x² − 4x + 3` đối xứng qua `x = 2`. Kiểm tra: `f(0) = 3`, `f(4) = 3`. Đối xứng quanh `x = 2`.

## B.5. Nghiệm — công thức nghiệm (Quadratic formula)

Giải `a·x² + b·x + c = 0` (tìm giao điểm với trục Ox):

### Biệt thức Delta

```
Δ = b² − 4·a·c
```

### Phân loại nghiệm theo Δ

| Δ | Số nghiệm thực | Công thức | Hình học |
|---|----------------|-----------|----------|
| `Δ > 0` | 2 nghiệm phân biệt | `x = (-b ± √Δ) / (2a)` | Parabol **cắt** Ox tại 2 điểm |
| `Δ = 0` | 1 nghiệm kép | `x = -b / (2a)` | Parabol **tiếp xúc** Ox tại đỉnh |
| `Δ < 0` | Không có nghiệm thực | (có 2 nghiệm phức) | Parabol **không cắt** Ox |

> Trực giác hình học: parabol mở lên (`a > 0`) có đỉnh ở `y = -Δ/(4a)`. Nếu `Δ > 0` thì `yₐ < 0`, đỉnh ở dưới trục Ox, nên parabol bắt buộc phải cắt Ox ở 2 chỗ khi đi lên. Nếu `Δ = 0` thì `yₐ = 0`, đỉnh chạm Ox. Nếu `Δ < 0` thì `yₐ > 0`, đỉnh ở trên Ox, parabol không thể chạm xuống Ox.

### 💡 Trực giác hình học của Δ

Đỉnh parabol có tung độ `yₐ = -Δ/(4a)`. Khi `a > 0` (mở lên):

- `Δ > 0` ⇒ `yₐ < 0` ⇒ đỉnh **dưới** trục Ox ⇒ parabol đi lên hai bên **cắt Ox 2 chỗ**.
- `Δ = 0` ⇒ `yₐ = 0` ⇒ đỉnh **chạm** Ox ⇒ parabol **tiếp xúc** Ox 1 điểm (nghiệm kép).
- `Δ < 0` ⇒ `yₐ > 0` ⇒ đỉnh **trên** Ox ⇒ parabol **lơ lửng** không chạm Ox.

Khi `a < 0` (mở xuống) logic ngược lại nhưng kết luận cuối cùng giống hệt: dấu của `Δ` quyết định số điểm chạm Ox.

### Walk-through 3 trường hợp với bảng giá trị

**(1) Δ > 0 — parabol cắt Ox 2 điểm.** Giải `x² − 5x + 6 = 0`:

```
a = 1, b = -5, c = 6
Δ = (-5)² − 4·1·6 = 25 − 24 = 1
√Δ = 1
x₁ = (5 + 1)/2 = 3
x₂ = (5 − 1)/2 = 2
```

Hai nghiệm: `x = 2` và `x = 3`. Đỉnh: `xₐ = 5/2 = 2.5`, `yₐ = -Δ/(4a) = -1/4 = -0.25`.

Bảng giá trị `y = x² − 5x + 6` với `x ∈ [-1, 5]`:

| x  | -1 |  0 |  1 |  2 | 2.5 |  3 |  4 |  5 |
|----|----|----|----|----|------|----|----|----|
| y  | 12 |  6 |  2 |  0 | -0.25|  0 |  2 |  6 |

```
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
```

Đỉnh dưới Ox → parabol "đào hố" qua Ox 2 lần.

**(2) Δ = 0 — parabol tiếp xúc Ox tại đỉnh.** Giải `x² − 4x + 4 = 0`:

```
a = 1, b = -4, c = 4
Δ = 16 − 16 = 0
x = 4/2 = 2  (nghiệm kép)
```

Phương trình tương đương `(x − 2)² = 0`. Đỉnh: `(2, 0)` — chính là chỗ duy nhất chạm Ox.

Bảng `y = x² − 4x + 4 = (x − 2)²` với `x ∈ [-1, 5]`:

| x  | -1 |  0 |  1 |  2 |  3 |  4 |  5 |
|----|----|----|----|----|----|----|----|
| y  |  9 |  4 |  1 |  0 |  1 |  4 |  9 |

```
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
```

**(3) Δ < 0 — parabol lơ lửng trên Ox.** Giải `x² + x + 1 = 0`:

```
a = 1, b = 1, c = 1
Δ = 1 − 4 = -3
```

Không có nghiệm thực. Đỉnh: `xₐ = -1/2 = -0.5`, `yₐ = -(-3)/4 = 0.75`.

Bảng `y = x² + x + 1` với `x ∈ [-3, 2]`:

| x  | -3 | -2 | -1 |-0.5|  0 |  1 |  2 |
|----|----|----|----|----|----|----|----|
| y  |  7 |  3 |  1 |0.75|  1 |  3 |  7 |

```
   y
   ↑
 7 |•                       •
   |
 3 |    •               •
   |
 1 |        •   •    •
   |          •  ← đỉnh (-0.5, 0.75)
 0 +────────────────────→ x  ← parabol KHÔNG chạm trục này
```

Đỉnh trên Ox → cả parabol nằm trên Ox → không có nghiệm thực.

### Chứng minh công thức nghiệm từ completing the square

Giải `a·x² + b·x + c = 0` (với `a ≠ 0`).

**Bước 1 — chia hai vế cho `a`:**

```
x² + (b/a)·x + c/a = 0
```

**Bước 2 — đưa hạng tử hằng sang vế phải:**

```
x² + (b/a)·x = -c/a
```

**Bước 3 — completing the square: thêm `(b/(2a))²` vào hai vế:**

Vế trái thành `(x + b/(2a))²`. Vế phải:

```
(x + b/(2a))² = -c/a + b²/(4a²)
              = (-4ac + b²) / (4a²)
              = (b² − 4ac) / (4a²)
              = Δ / (4a²)
```

**Bước 4 — lấy căn hai vế:**

```
x + b/(2a) = ±√Δ / (2|a|) = ±√Δ / (2a)
```

(Dấu `±` đã hấp thụ dấu của `a`.)

**Bước 5 — chuyển vế tìm `x`:**

```
x = -b/(2a) ± √Δ/(2a) = (-b ± √Δ) / (2a)
```

**Bước 6 — kết luận theo dấu Δ:**

- `Δ > 0`: `√Δ` là số thực dương → có **2 nghiệm phân biệt** `(-b ± √Δ)/(2a)`.
- `Δ = 0`: `√Δ = 0` → cả `+` và `−` cho cùng giá trị `-b/(2a)` → **nghiệm kép**.
- `Δ < 0`: `√Δ` không tồn tại trong số thực → **vô nghiệm thực** (có 2 nghiệm phức `(-b ± i·√|Δ|)/(2a)`).

**QED**. Công thức nghiệm là hệ quả trực tiếp của completing the square — không phải "phép màu" mà là một bước biến đổi đại số sơ cấp.

### ❓ Câu hỏi tự nhiên

**Q1: Sao công thức Quadratic có chỉ số 2 ở mẫu `(2a)`?**

Vì khi completing the square ta cần `2k = b/a ⇒ k = b/(2a)`. Số 2 sinh ra từ khai triển `(x + k)² = x² + 2kx + k²`. Nói cách khác, để biến `bx` thành `2kx` ta phải chia `b` cho `2` — đó là nguồn gốc của hệ số `2` ở mẫu. Đây không phải quy ước, mà là hệ quả của hằng đẳng thức bình phương.

**Q2: Khi nào dùng phân tích nhân tử vs công thức nghiệm?**

- **Phân tích nhân tử**: khi nghiệm là số nguyên hoặc phân số "đẹp" và bạn nhẩm được. Vd `x² − 5x + 6 = 0` → nhẩm thấy `(x − 2)(x − 3) = 0` ngay → x = 2, 3. Nhanh hơn tính Δ.
- **Công thức nghiệm**: khi nghiệm xấu, có `√` hoặc dùng máy/code. Vd `x² − 3x + 1 = 0` → `Δ = 5` → `x = (3 ± √5)/2`. Không thể phân tích nhẩm.
- **Mẹo quyết định**: nhìn vào `c/a` (tích nghiệm) và `-b/a` (tổng nghiệm). Nếu cả hai đều là số nhỏ nguyên, thử nhẩm trước. Không ra → dùng công thức.

**Q3: Số phức xuất hiện khi Δ < 0 — học gì?**

Số phức (complex number) là mở rộng của số thực, thêm phần "ảo" `i` với `i² = -1`. Khi `Δ < 0`, `√Δ = √(-|Δ|) = i·√|Δ|`. Vd `x² + x + 1 = 0` có `Δ = -3` → `x = (-1 ± i√3)/2`.

Trong chương trình này:

- **Tầng 1 (Algebra)**: chỉ làm việc trên trường số thực — khi `Δ < 0` ta nói "vô nghiệm".
- **Tầng 2 (Trigonometry, Complex Numbers)**: số phức được giới thiệu chính thức — `Δ < 0` không còn là vô nghiệm mà là "2 nghiệm phức liên hợp".
- **Ứng dụng ML**: số phức ít xuất hiện trực tiếp trong deep learning, nhưng cực kỳ quan trọng trong **xử lý tín hiệu** (Fourier transform), **stability** của recurrent network, và **quantum computing**.

### ⚠ Lỗi thường gặp

**1. Quên check `a = 0`.** Công thức `(-b ± √Δ)/(2a)` chia cho `2a`. Nếu `a = 0` (mẫu = 0), phương trình thực ra là `bx + c = 0` (bậc 1), không phải bậc 2. Luôn kiểm tra `a ≠ 0` trước khi áp công thức Δ.

```
Vd sai: giải "0·x² + 2x − 4 = 0" bằng Δ = 4 − 0 = 4, √Δ = 2,
        x = (-2 ± 2) / 0  → ??? chia cho 0!
Cách đúng: a = 0 → phương trình là 2x − 4 = 0 → x = 2.
```

**2. Tính Δ nhầm dấu (đặc biệt khi `b` âm).** `b²` luôn không âm dù `b` âm hay dương. Vd `b = -5`:

```
Sai:  Δ = -5² − 4·1·6 = -25 − 24 = -49   (NHẦM: thiếu ngoặc)
Đúng: Δ = (-5)² − 4·1·6 = 25 − 24 = 1
```

Quy tắc: **luôn đặt `b` trong ngoặc** trước khi bình phương, đặc biệt khi viết tay. `(-5)² = 25`, không phải `-5² = -25`.

**3. Vẽ parabol mở sai chiều khi `a < 0`.** Nhớ:

- `a > 0` → parabol mở **lên** (∪), có **min**.
- `a < 0` → parabol mở **xuống** (∩), có **max**.

Lỗi thường gặp: thấy `y = -2x² + 4x − 1` nhưng vẫn vẽ "thung lũng" → sai. Phải vẽ "ngọn đồi". Mẹo: nhìn dấu của `a` là việc đầu tiên trước khi làm bất kỳ thứ gì khác.

**4. Quên dấu khi tính `-b`.** Vd `b = -5` → `-b = 5`, không phải `-(-5) = -5`. Lỗi này hay xảy ra khi tính `xₐ = -b/(2a)`.

### 🔁 Dừng lại tự kiểm tra (B.5)

1. `2x² + 3x − 2 = 0`: Δ bằng bao nhiêu? *(Đáp: `9 + 16 = 25 > 0` → 2 nghiệm)*
2. Parabol `y = -x² + 2x − 5` mở lên hay xuống? Có cắt Ox không? *(Đáp: mở **xuống** vì `a = -1 < 0`. `Δ = 4 − 20 = -16 < 0` → không cắt Ox. Parabol nằm hoàn toàn dưới Ox.)*
3. Vì sao trong công thức nghiệm có `2a` ở mẫu mà không phải `a`? *(Đáp: do completing the square sinh ra hệ số `2k`, kéo theo `k = b/(2a)`.)*

### 📝 Tóm tắt B.5

- `Δ = b² − 4ac` là **biệt thức**, quyết định số nghiệm.
- Trực giác hình học: dấu `Δ` cho biết vị trí đỉnh so với Ox.
- Công thức nghiệm `x = (-b ± √Δ)/(2a)` đến từ completing the square — không phải "phép màu".
- Luôn check `a ≠ 0` trước; nhớ `(-b)² = b²` (đặt ngoặc); vẽ đúng chiều mở theo dấu `a`.

## B.6. Định lý Viète

### 💡 Trực giác: "đảo ngược" việc phân tích nhân tử

Nếu biết 2 nghiệm `x₁` và `x₂` của một đa thức bậc 2 monic (hệ số `a = 1`), ta có thể **khôi phục lại** đa thức:

```
(x − x₁)(x − x₂) = 0
⇔ x² − x₂·x − x₁·x + x₁·x₂ = 0
⇔ x² − (x₁ + x₂)·x + x₁·x₂ = 0
```

So với dạng chuẩn `x² + b·x + c = 0`, ta đọc ngay:

```
b = -(x₁ + x₂)   →  x₁ + x₂ = -b
c = x₁ · x₂      →  x₁ · x₂ = c
```

Với `a ≠ 1`, chia cả hai vế `ax² + bx + c = 0` cho `a` đưa về dạng monic `x² + (b/a)x + (c/a) = 0`, nên kết quả tổng quát:

Nếu `ax² + bx + c = 0` có 2 nghiệm `x₁`, `x₂` (kể cả nghiệm kép, hoặc nghiệm phức), thì:

```
S = x₁ + x₂ = -b / a
P = x₁ · x₂ =  c / a
```

### Vì sao đúng? (chứng minh đầy đủ)

Khai triển `a(x − x₁)(x − x₂) = a·x² − a(x₁ + x₂)·x + a·x₁·x₂`. So sánh với `ax² + bx + c` thì `-a(x₁ + x₂) = b` và `a·x₁·x₂ = c`. Từ đó suy ra `S = -b/a`, `P = c/a`.

### Ứng dụng — nhẩm nghiệm (walk-through 3 ví dụ)

Mọi ví dụ dưới đây dùng dạng monic (`a = 1`), tức tìm 2 số có **tổng = -b** và **tích = c**.

**Ví dụ 1.** `x² − 5x + 6 = 0`.
- Tổng nghiệm: `-b = 5`. Tích nghiệm: `c = 6`.
- Tìm 2 số có tổng 5, tích 6: thử các cặp `(1,6), (2,3), (3,2), (6,1)` — cặp `(2, 3)` cho tổng 5. ✓
- Nghiệm: `x₁ = 2`, `x₂ = 3`. Phân tích: `(x − 2)(x − 3) = 0`.

**Ví dụ 2.** `x² + 7x + 12 = 0`.
- Tổng nghiệm: `-b = -7`. Tích nghiệm: `c = 12`.
- Tích dương + tổng âm → **cả hai nghiệm âm**. Tìm 2 số âm tổng -7, tích 12: `(-3, -4)` cho tổng -7, tích 12. ✓
- Nghiệm: `x = -3`, `x = -4`.

**Ví dụ 3.** `x² − x − 12 = 0`.
- Tổng: `-b = 1`. Tích: `c = -12`.
- Tích âm → **một dương một âm**. Tìm cặp: `(4, -3)` cho tổng 1, tích -12. ✓
- Nghiệm: `x = 4`, `x = -3`.

**Ví dụ 4 (a ≠ 1).** `2x² − 5x − 3 = 0`.
- Chia cho 2: `x² − 2.5x − 1.5 = 0`. Tổng `= 2.5`, tích `= -1.5`.
- Cặp `(3, -0.5)`: tổng 2.5, tích -1.5. ✓
- Nghiệm: `x = 3`, `x = -0.5`. Phân tích: `2(x − 3)(x + 0.5) = (x − 3)(2x + 1)`.

> **Quy tắc dấu nhanh** (cho dạng `x² + bx + c`):
> - `c > 0, b > 0` → cả 2 nghiệm âm.
> - `c > 0, b < 0` → cả 2 nghiệm dương.
> - `c < 0` → 1 nghiệm dương, 1 nghiệm âm (không phụ thuộc dấu `b`).
> - `c = 0` → 1 nghiệm bằng 0 (nghiệm còn lại `= -b`).

### Ứng dụng — kiểm tra nghiệm

Vừa giải xong `2x² − 5x − 3 = 0` và được `x = 3`, `x = -0.5`. Kiểm tra nhanh:

```
S = 3 + (-0.5) = 2.5 = -(-5)/2 = -b/a ✓
P = 3 · (-0.5) = -1.5 = -3/2 = c/a   ✓
```

Nếu một trong hai số không khớp → tính sai ở đâu đó, làm lại.

### 📝 Tóm tắt B.6

- Viète: `S = x₁ + x₂ = -b/a`, `P = x₁ · x₂ = c/a`.
- Trực giác: đảo ngược việc phân tích `(x − x₁)(x − x₂)`.
- Ứng dụng chính: nhẩm nghiệm khi tổng/tích là số nguyên đẹp, và kiểm tra kết quả sau khi giải bằng Δ.

## B.7. Phân tích thành nhân tử

Nếu `ax² + bx + c = 0` có 2 nghiệm `x₁`, `x₂` thì:

```
ax² + bx + c = a·(x − x₁)·(x − x₂)
```

**Ví dụ.** `x² − 5x + 6` có nghiệm `2` và `3` → `x² − 5x + 6 = (x − 2)(x − 3)`.

Kiểm tra: `(x − 2)(x − 3) = x² − 3x − 2x + 6 = x² − 5x + 6` ✓.

**Ví dụ với `a ≠ 1`.** `2x² − 5x − 3` có nghiệm `3` và `-0.5` → `2x² − 5x − 3 = 2(x − 3)(x + 0.5) = (x − 3)(2x + 1)`.

> Phân tích thành nhân tử rất hữu ích khi rút gọn phân thức hoặc tìm giới hạn (sẽ học ở Tầng 3 — Calculus).

## B.8. Hoàn thành bình phương (completing the square)

Biến `y = ax² + bx + c` về **dạng đỉnh** `y = a·(x − h)² + k` với `(h, k)` là đỉnh.

### Vì sao cần dạng đỉnh?

- Đọc đỉnh và giá trị min/max ngay lập tức, không cần công thức.
- Là kỹ thuật chứng minh công thức nghiệm.
- Trong giải tích và tối ưu, dạng `(x − h)² + k` rất thân thiện để lấy đạo hàm và tìm cực trị.

### Quy trình 4 bước

Cho `f(x) = ax² + bx + c`:

1. **Đặt a ra ngoài** 2 hạng tử đầu: `f(x) = a·(x² + (b/a)·x) + c`.
2. **Bù trừ** nửa hệ số `x` bình phương: thêm và bớt `(b/(2a))²` bên trong ngoặc.
3. **Gom thành bình phương**: `(x + b/(2a))²`.
4. **Rút gọn**: thu được `a·(x + b/(2a))² + (c − b²/(4a)) = a·(x − h)² + k`.

Với `h = -b/(2a)` và `k = c − b²/(4a) = -Δ/(4a)`.

### Ví dụ 1 (dễ — `a = 1`): `y = x² + 6x + 5`

```
y = x² + 6x + 5
  = (x² + 6x + 9) − 9 + 5         ← thêm 9 = (6/2)², trừ lại để cân bằng
  = (x + 3)² − 4
```

Tại sao thêm `9`? Vì `(x + k)² = x² + 2kx + k²`. So với `x² + 6x` ta cần `2k = 6 ⇒ k = 3 ⇒ k² = 9`.

Đỉnh: đọc từ `(x − (-3))² + (-4)` → `(h, k) = (-3, -4)`. Min của `y` là `-4`, đạt tại `x = -3`.

Kiểm tra bằng công thức: `xₐ = -b/(2a) = -6/2 = -3` ✓, `yₐ = f(-3) = 9 − 18 + 5 = -4` ✓.

### Ví dụ 2 (vừa — `a ≠ 1`): `y = 2x² + 8x + 5`

```
y = 2x² + 8x + 5
  = 2·(x² + 4x) + 5                ← rút 2 ra ngoài 2 hạng tử đầu
  = 2·(x² + 4x + 4 − 4) + 5        ← thêm/bớt 4 = (4/2)²
  = 2·((x + 2)² − 4) + 5
  = 2·(x + 2)² − 2·4 + 5           ← nhân phân phối
  = 2·(x + 2)² − 8 + 5
  = 2·(x + 2)² − 3
```

Đỉnh: `(-2, -3)`. Vì `a = 2 > 0`, parabol mở lên, **min = -3** tại `x = -2`.

**Cẩn thận lỗi hay gặp:** Khi rút `a` ra ngoài rồi cộng `4` bên trong ngoặc, để cân bằng phải **trừ `2·4 = 8` ngoài ngoặc**, không phải `-4`. Tức là số hạng bù trừ thực tế là `a·k² = 2·4`. Nếu quên nhân với `a`, kết quả sẽ sai.

Kiểm tra: `xₐ = -8/(2·2) = -2` ✓. `f(-2) = 2·4 − 16 + 5 = 8 − 16 + 5 = -3` ✓.

### Ví dụ 3 (khó — `a < 0`): `y = -x² + 4x + 1`

Cẩn thận khi rút số âm:

```
y = -x² + 4x + 1
  = -(x² − 4x) + 1                 ← rút -1 ra, đổi dấu các hạng tử bên trong
  = -(x² − 4x + 4 − 4) + 1         ← thêm/bớt 4 = (4/2)² (chú ý dấu của 4x bên trong)
  = -((x − 2)² − 4) + 1
  = -(x − 2)² + 4 + 1              ← phân phối -1: -(-4) = +4
  = -(x − 2)² + 5
```

Đỉnh: `(2, 5)`. Vì `a = -1 < 0`, parabol mở **xuống**, **max = 5** tại `x = 2`.

Kiểm tra: `xₐ = -4/(2·(-1)) = -4/-2 = 2` ✓. `f(2) = -4 + 8 + 1 = 5` ✓.

**Bẫy quan trọng:** Khi rút `-1` ra, **các dấu bên trong ngoặc đổi**: `-x² + 4x = -(x² − 4x)`. Nếu để nguyên `-(x² + 4x)` thì khi khai triển ngược lại được `-x² − 4x`, sai dấu của `4x`.

> **Quy luật nhớ chung**:
> 1. Rút `a` ra khỏi hai hạng tử đầu (chỉ khi `a ≠ 1`).
> 2. Tính `k = b'/2` với `b'` là hệ số của `x` *bên trong ngoặc*. Thêm `k²` rồi bớt `k²`.
> 3. Gom `(x + k)²`, phân phối `a` ngược ra, cộng hằng số cũ.
> 4. Đọc đỉnh `(h, k_v) = (-k, ...)` từ dạng cuối.

### 🔁 Dừng lại tự kiểm tra (B.8)

1. Đưa `y = x² + 10x + 21` về dạng đỉnh. *(Đáp: `(x + 5)² − 4`. Đỉnh `(-5, -4)`.)*
2. Đưa `y = 3x² − 6x + 1` về dạng đỉnh. *(Đáp: `3(x − 1)² − 2`. Đỉnh `(1, -2)`.)*
3. Tại sao khi `a < 0` ta vẫn dùng đúng công thức completing the square mà kết quả tự động ra "max"? *(Đáp: vì `a·(x − h)² ≤ 0` khi `a < 0`, đạt giá trị lớn nhất `0` khi `x = h`. Do đó `y = a·(x − h)² + k` đạt max `k`.)*

### 📝 Tóm tắt B.8

- Completing the square biến `ax² + bx + c` về `a(x − h)² + k` với `(h, k)` là đỉnh.
- Khóa: thêm/bớt `(b'/2)²` với `b'` là hệ số `x` bên trong ngoặc sau khi đã rút `a`.
- Khi `a < 0`: nhớ đổi dấu các hạng tử khi rút âm ra.
- Ứng dụng: đọc đỉnh ngay lập tức, chứng minh công thức nghiệm, dùng trong tối ưu hóa.

## B.9. Tại sao hàm bậc 2 quan trọng cho ML?

Quay lại linear regression ở A.7:

```
Loss(a, b) = (1/n) · Σ (yᵢ − a·xᵢ − b)²
```

Khai triển bình phương theo `a` và `b`, ta được một biểu thức bậc 2 — chính xác hơn, một **paraboloid** (parabol 2D). Tính chất quan trọng:

1. **Parabol mở lên** vì hệ số bậc 2 (`Σxᵢ²`, `Σ1 = n`) đều dương.
2. **Có duy nhất 1 đỉnh** — chính là **giá trị min toàn cục** của loss.
3. Đỉnh có **công thức đóng** (closed-form solution):

```
a* = (n·Σxᵢyᵢ − Σxᵢ·Σyᵢ) / (n·Σxᵢ² − (Σxᵢ)²)
b* = (Σyᵢ − a*·Σxᵢ) / n
```

Đây là lời giải **chính xác**, không cần huấn luyện lặp. Đúng theo đúng nghĩa: lấy đạo hàm theo `a, b` bằng 0 (vì đỉnh parabol là chỗ đạo hàm = 0), giải hệ phương trình tuyến tính 2 ẩn → ra `(a*, b*)`.

> Vì sao linear regression dạy đầu tiên trong mọi khóa ML? Vì loss của nó là parabol — một bài toán đại số phổ thông. Mọi mô hình phức tạp hơn (logistic regression, neural network) đều có loss không phải parabol thuần — không có closed-form, phải dùng **gradient descent** (đi xuống dốc parabol cục bộ). Hiểu parabol = hiểu cái cốt lõi của gradient descent.

Toy example với 3 điểm `(1, 2), (2, 3), (3, 5)`:

```
n = 3
Σxᵢ = 6, Σyᵢ = 10, Σxᵢyᵢ = 1·2 + 2·3 + 3·5 = 23, Σxᵢ² = 14

a* = (3·23 − 6·10) / (3·14 − 36) = (69 − 60) / (42 − 36) = 9/6 = 1.5
b* = (10 − 1.5·6) / 3 = (10 − 9) / 3 = 1/3 ≈ 0.333

Đường khớp nhất: y = 1.5·x + 0.333
```

Kiểm tra: tại `x = 1, 2, 3` thì mô hình dự đoán `1.833, 3.333, 4.833`. So với thực tế `2, 3, 5` — sai khoảng `0.17, 0.33, 0.17`. Không cách nào tốt hơn được.

### Vì sao MSE loss là parabol theo trọng số?

Cố định `b` thành một giá trị bất kỳ và xem MSE loss theo riêng `a`:

```
L(a) = (1/n) · Σᵢ (yᵢ − a·xᵢ − b)²
     = (1/n) · Σᵢ (a²·xᵢ² − 2·a·xᵢ·(yᵢ − b) + (yᵢ − b)²)
     = (Σxᵢ²/n)·a² − (2·Σxᵢ(yᵢ − b)/n)·a + Σ(yᵢ − b)²/n
     = A·a² + B·a + C
```

với `A = Σxᵢ²/n`, `B = -2·Σxᵢ(yᵢ − b)/n`, `C = Σ(yᵢ − b)²/n`. Đây chính là **parabol theo `a`** với:

- `A > 0` (vì `xᵢ²` luôn không âm và `n > 0`) ⇒ parabol **mở lên** ⇒ có **min duy nhất**.
- Đỉnh parabol = chỗ loss nhỏ nhất = giá trị `a*` tốt nhất.
- Hoành độ đỉnh: `a* = -B/(2A)`. Đây chính là công thức closed-form ở phần trước.

Tương tự, cố định `a` ta được loss theo `b` cũng là parabol. Cả `L(a, b)` xét đồng thời là một **paraboloid** (parabol 2 chiều) — vẫn có 1 đỉnh duy nhất.

**Đỉnh chính là loss tối thiểu → đó là lý do linear regression có closed-form solution.** Đạo hàm bậc 1 của một parabol là một đường thẳng; set đường thẳng đó = 0 → giải ra 1 nghiệm = đỉnh.

### Vì sao neural network không có closed-form?

Trong neural network, loss không phải parabol nữa. Lý do: hàm phi tuyến (activation function) như sigmoid, ReLU, tanh được áp vào giữa các tầng, biến loss thành một bề mặt **lồi lõm phức tạp** với nhiều cực trị cục bộ (local minima), điểm yên ngựa (saddle points), v.v.

Hệ quả:

- Không thể "lấy đạo hàm bằng 0 → giải hệ phương trình" để ra closed-form.
- Phải dùng **gradient descent**: bắt đầu từ một điểm ngẫu nhiên, đi theo hướng dốc nhất xuống dưới, lặp lại đến khi không xuống được nữa.
- "Đi xuống parabol" là phép ẩn dụ chính xác về mặt cục bộ: ở mỗi điểm, gradient descent hành xử như đang trượt xuống một parabol địa phương được xấp xỉ bằng đạo hàm bậc 2.

> **Tóm gọn nguyên tắc:** Loss bậc 2 (parabol) → closed-form. Loss bất kỳ → gradient descent. Linear regression là trường hợp đặc biệt may mắn vì loss tự nhiên là parabol.

### 📝 Tóm tắt B.9

- MSE loss của linear regression có dạng `L(w) = A·w² + B·w + C` theo trọng số `w` → đỉnh = min toàn cục.
- Vì A > 0 luôn (do `Σxᵢ²/n > 0`), parabol mở lên, đỉnh là min.
- Closed-form solution = công thức tìm đỉnh parabol = `-b/(2a)` áp lên `L(w)`.
- Neural network: loss không bậc 2 → không closed-form → phải dùng gradient descent.

---

# Bài tập

## Bài 1

Cho `y = 2x − 3`.

a) Xác định slope và y-intercept.
b) Tìm giao điểm với trục Ox.
c) Tính `f(0)`, `f(1)`, `f(-2)`.
d) Lập bảng giá trị 5 điểm với `x ∈ {-2, -1, 0, 1, 2}` và mô tả dáng đồ thị.

## Bài 2

Viết phương trình đường thẳng đi qua hai điểm `(1, 4)` và `(3, 10)`. Đường này có song song với `y = 3x − 5` không? Vì sao?

## Bài 3

Cho `y = x² − 4x + 3`.

a) Tìm đỉnh và trục đối xứng.
b) Tính biệt thức Δ và nghiệm (nếu có).
c) Tìm giao điểm với trục Oy.
d) Lập bảng giá trị với `x ∈ {-1, 0, 1, 2, 3, 4, 5}` và mô tả dáng parabol.

## Bài 4

Giải phương trình `2x² − 5x − 3 = 0` bằng 2 cách:

a) Công thức nghiệm (delta method).
b) Phân tích thành nhân tử.

Kiểm tra lại kết quả bằng định lý Viète.

## Bài 5

Biến `f(x) = 3x² + 12x + 7` về dạng đỉnh `a·(x − h)² + k`. Từ đó đọc tọa độ đỉnh và giá trị min.

## Bài 6 — Code Go

Viết hàm `solveQuadratic(a, b, c float64) (roots []float64, status string)` trả về danh sách nghiệm thực và mô tả trạng thái:

- Nếu `a == 0`: chuyển sang giải `bx + c = 0` (linear case). Cẩn thận thêm trường hợp `a = b = 0`.
- Nếu `a ≠ 0`: tính `Δ` và trả về 0/1/2 nghiệm tương ứng.

Demo trên ít nhất 4 input bao trùm các trường hợp.

---

# Lời giải chi tiết

## Lời giải bài 1

**a) Slope và y-intercept.** So với dạng `y = ax + b`: `a = 2`, `b = -3`. Slope `= 2`, y-intercept `= -3`. Đường thẳng cắt Oy tại `(0, -3)`.

**b) Giao Ox.** Giải `2x − 3 = 0` ⇒ `x = 3/2 = 1.5`. Đường thẳng cắt Ox tại `(1.5, 0)`.

**c) Giá trị hàm:**

- `f(0) = 2·0 − 3 = -3`
- `f(1) = 2·1 − 3 = -1`
- `f(-2) = 2·(-2) − 3 = -7`

**d) Bảng giá trị:**

| x  | -2 | -1 |  0 |  1 |  2 |
|----|----|----|----|----|----|
| y  | -7 | -5 | -3 | -1 |  1 |

Mỗi đơn vị `x` tăng thì `y` tăng đúng 2 đơn vị (= slope). Đường đi lên (vì `a > 0`).

## Lời giải bài 2

**Bước 1 — tính slope:**

```
a = (10 − 4) / (3 − 1) = 6 / 2 = 3
```

**Bước 2 — tìm b:** thay điểm `(1, 4)`:

```
4 = 3·1 + b   ⇒   b = 1
```

Phương trình: `y = 3x + 1`. Kiểm tra với điểm thứ hai: `3·3 + 1 = 10` ✓.

**Quan hệ với `y = 3x − 5`:** Cùng slope `a = 3` nhưng khác y-intercept (`1` vs `-5`) → **hai đường song song** (parallel), không bao giờ cắt nhau.

## Lời giải bài 3

`a = 1, b = -4, c = 3`.

**a) Đỉnh.**

```
xₐ = -b/(2a) = 4/2 = 2
yₐ = f(2) = 4 − 8 + 3 = -1
Đỉnh: (2, -1)
Trục đối xứng: x = 2
```

**b) Nghiệm.**

```
Δ = b² − 4ac = 16 − 12 = 4
√Δ = 2
x₁ = (4 + 2)/2 = 3
x₂ = (4 − 2)/2 = 1
```

Hai nghiệm: `x = 1` và `x = 3`.

**c) Giao Oy.** `f(0) = 3` → cắt Oy tại `(0, 3)`.

**d) Bảng giá trị:**

| x  | -1 |  0 |  1 |  2 |  3 |  4 |  5 |
|----|----|----|----|----|----|----|----|
| y  |  8 |  3 |  0 | -1 |  0 |  3 |  8 |

Đối xứng quanh `x = 2`: `f(1) = f(3) = 0`, `f(0) = f(4) = 3`, `f(-1) = f(5) = 8`. Parabol mở lên (`a = 1 > 0`), min tại đỉnh `(2, -1)`.

## Lời giải bài 4

`2x² − 5x − 3 = 0`, tức `a = 2, b = -5, c = -3`.

**a) Công thức nghiệm.**

```
Δ = (-5)² − 4·2·(-3) = 25 + 24 = 49
√Δ = 7
x₁ = (5 + 7) / 4 = 12/4 = 3
x₂ = (5 − 7) / 4 = -2/4 = -0.5
```

**b) Phân tích thành nhân tử.** Cần `2x² − 5x − 3 = (px + q)(rx + s)` với `pr = 2, qs = -3, ps + qr = -5`. Thử `p = 2, r = 1, q = 1, s = -3`:

```
(2x + 1)(x − 3) = 2x² − 6x + x − 3 = 2x² − 5x − 3 ✓
```

Nghiệm: `2x + 1 = 0 ⇒ x = -0.5`, `x − 3 = 0 ⇒ x = 3`. Trùng với cách (a).

**Kiểm tra Viète.**

```
S = 3 + (-0.5) = 2.5;  -b/a = 5/2 = 2.5    ✓
P = 3 · (-0.5) = -1.5;  c/a = -3/2 = -1.5  ✓
```

## Lời giải bài 5

`f(x) = 3x² + 12x + 7`, `a = 3, b = 12, c = 7`.

```
f(x) = 3·(x² + 4x) + 7
     = 3·(x² + 4x + 4 − 4) + 7        ← (4/2)² = 4
     = 3·(x + 2)² − 12 + 7
     = 3·(x + 2)² − 5
     = 3·(x − (-2))² + (-5)
```

Đỉnh: `(h, k) = (-2, -5)`. Vì `a = 3 > 0` (parabol mở lên), `y` đạt **min = -5** tại `x = -2`.

Kiểm tra:

- `xₐ = -b/(2a) = -12/6 = -2` ✓.
- `f(-2) = 3·4 + 12·(-2) + 7 = 12 − 24 + 7 = -5` ✓.

## Lời giải bài 6 — code Go

Xem file [`solutions.go`](./solutions.go). Ý tưởng:

```go
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
```

**Độ phức tạp:** `O(1)` thời gian, `O(1)` bộ nhớ. Không có vòng lặp, chỉ thuần số học.

**Lưu ý số học:** Khi `b` rất lớn so với `4ac`, công thức `(-b + √Δ)/(2a)` có thể bị **cancellation error** (mất chữ số có nghĩa do trừ hai số gần bằng nhau). Cách khắc phục chuẩn ngành: dùng công thức "Citardauq" `2c / (-b ∓ √Δ)` cho nghiệm bị cancellation. Trong bài này dataset nhỏ nên dùng công thức cơ bản; sẽ bàn kỹ ở Tầng 5 — Numerical Analysis.

---

# Tóm tắt

| Khái niệm | Hàm bậc 1 | Hàm bậc 2 |
|-----------|-----------|-----------|
| Dạng | `y = ax + b` | `y = ax² + bx + c` |
| Đồ thị | Đường thẳng | Parabol |
| "Hệ số chính" | Slope `a` | Hướng & độ hẹp `a` |
| Điểm đặc biệt | y-intercept `b`, x-intercept `-b/a` | Đỉnh `(-b/(2a), -Δ/(4a))` |
| Số nghiệm `f(x) = 0` | Luôn đúng 1 | 0 / 1 / 2 tùy `Δ = b² − 4ac` |
| Dạng đỉnh / chuẩn | (không cần) | `a(x − h)² + k` |
| Ứng dụng ML chính | Dự đoán linear regression | MSE loss → bài toán tìm đỉnh parabol |

---

# Liên kết

- [solutions.go](./solutions.go) — code Go cho hàm `solveQuadratic`, `vertex`, `lineFrom2Points`, `completeTheSquare` và đáp án các bài tập.
- [visualization.html](./visualization.html) — playground tương tác: linear, quadratic, delta visualizer, completing-the-square stepper.
- ← Bài trước: [Lesson 05 — Hàm số là gì](../lesson-05-functions/)
- → Bài tiếp: [Lesson 07 — Hàm mũ và hàm log](../lesson-07-exp-log-functions/)
- ↑ Mục lục tầng: [Tầng 1 — Algebra](../README.md)
