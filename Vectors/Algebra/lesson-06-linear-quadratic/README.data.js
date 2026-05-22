// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Algebra/lesson-06-linear-quadratic/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Hàm bậc 1 và hàm bậc 2

> **Tầng 1 — Algebra · Bài 6/8**
>
> Hai họ hàm "khởi điểm" của toán học và machine learning. Hiểu được hai họ này, bạn đã sở hữu khung nhìn để đọc gần như mọi mô hình hồi quy cơ bản: từ đồ thị giá nhà theo diện tích (linear) tới quỹ đạo ném bóng (quadratic), từ MSE loss tới gradient descent.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Viết được phương trình đường thẳng \`y = ax + b\` từ 2 điểm, từ slope + 1 điểm, hoặc từ slope + y-intercept.
- Đọc đồ thị parabol \`y = ax² + bx + c\`: nhận ra hướng mở, tìm đỉnh, trục đối xứng và nghiệm.
- Áp dụng **công thức nghiệm** (quadratic formula) và **định lý Viète** để giải/nhẩm nghiệm bậc 2.
- Phân tích đa thức bậc 2 thành nhân tử và biến đổi sang **dạng đỉnh** (completing the square).
- Hiểu mối liên hệ giữa hai hàm này và machine learning: vì sao **linear regression + MSE loss** là một bài toán parabol có lời giải đóng (closed-form).

## Kiến thức tiền đề

- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/): biết giải \`ax + b = 0\`.
- [Lesson 04 — Lũy thừa, căn, log](../lesson-04-powers-roots-logs/): biết \`√Δ\`, \`b²\` là gì.
- [Lesson 05 — Hàm số là gì](../lesson-05-functions/): biết domain/range, biết đọc đồ thị \`y = f(x)\`.

---

# Phần A — Hàm bậc 1 (linear function)

## A.1. Định nghĩa

Hàm bậc 1 (linear function) có dạng:

\`\`\`
y = a·x + b      (với a ≠ 0)
\`\`\`

- \`a\`, \`b\` là hai hằng số (số thực).
- \`a\` gọi là **hệ số góc** (slope, gradient).
- \`b\` gọi là **tung độ gốc** (y-intercept).
- Điều kiện \`a ≠ 0\` để phân biệt với hàm hằng \`y = b\` (đường nằm ngang, không phải hàm bậc 1).

**Đồ thị của hàm bậc 1 là một đường thẳng.** Đây là tính chất mang tính định nghĩa: hễ nói "linear" trong ngữ cảnh hàm 1 biến, hình ảnh xuất hiện trong đầu phải là đường thẳng.

### Ví dụ cụ thể

\`y = 2x + 1\`:

| x | -2 | -1 |  0 |  1 |  2 |
|---|----|----|----|----|----|
| y | -3 | -1 |  1 |  3 |  5 |

Mỗi khi \`x\` tăng 1, \`y\` tăng 2 — đúng bằng \`a = 2\`. Khi \`x = 0\`, \`y = 1\` — đúng bằng \`b = 1\`.

## A.2. Hệ số góc (slope) — \`a\`

### Ý nghĩa số học

\`a\` đo "tốc độ thay đổi" của \`y\` theo \`x\`:

> Mỗi khi \`x\` tăng thêm 1 đơn vị, \`y\` tăng thêm \`a\` đơn vị.

- \`a = 2\` → x tăng 1, y tăng 2.
- \`a = -0.5\` → x tăng 1, y giảm 0.5.
- \`a = 0.001\` → x tăng 1, y gần như không đổi (đường gần ngang).

### Tính slope từ 2 điểm

Cho 2 điểm \`P₁ = (x₁, y₁)\` và \`P₂ = (x₂, y₂)\` trên đường thẳng:

\`\`\`
       y₂ − y₁
a  =  ─────────
       x₂ − x₁
\`\`\`

Đọc là: "delta y trên delta x". Đây chính là "đi lên bao nhiêu chia cho đi sang bao nhiêu" (rise over run).

**Ví dụ.** Đường thẳng đi qua \`(1, 3)\` và \`(5, 11)\`:

\`\`\`
a = (11 − 3) / (5 − 1) = 8 / 4 = 2
\`\`\`

### Dấu của slope quyết định hình dạng

| \`a\` | Hình ảnh | Mô tả |
|-----|----------|-------|
| \`a > 0\` | ↗ | Đi từ trái dưới lên phải trên (đồng biến) |
| \`a < 0\` | ↘ | Đi từ trái trên xuống phải dưới (nghịch biến) |
| \`a = 0\` | →  | Nằm ngang — không phải hàm bậc 1 nữa |

\`|a|\` càng lớn thì đường càng dốc; \`|a|\` càng nhỏ thì đường càng thoải.

## A.3. Tung độ gốc (y-intercept) — \`b\`

\`b\` là giá trị của \`y\` khi \`x = 0\`. Hình học: đường thẳng cắt **trục Oy** tại điểm \`(0, b)\`.

> Mẹo đọc nhanh: nhìn vào phương trình \`y = ax + b\`, số đứng riêng (không có x) chính là chỗ đường thẳng đâm vào trục dọc.

**Ví dụ.** \`y = 2x − 5\` → cắt Oy tại \`(0, -5)\`.

## A.4. Giao điểm với trục Ox (root / x-intercept)

Trục Ox là tập các điểm có \`y = 0\`. Để tìm giao điểm, giải phương trình:

\`\`\`
a·x + b = 0   ⇔   x = -b / a
\`\`\`

Đây chính là phương trình bậc 1 mà ta đã học ở [Lesson 03](../lesson-03-linear-equations/).

**Ví dụ.** \`y = 2x − 6\` cắt Ox tại \`x = 6/2 = 3\` → điểm \`(3, 0)\`.

> Trực giác: y-intercept là chỗ đường đụng "tường dọc" (Oy); x-intercept là chỗ đường đụng "sàn ngang" (Ox).

## A.5. Viết phương trình đường thẳng

Có 3 tình huống phổ biến:

### Trường hợp 1 — Biết slope và y-intercept

Quá đơn giản: ráp thẳng vào \`y = ax + b\`.

> Slope \`3\`, y-intercept \`-2\` → \`y = 3x − 2\`.

### Trường hợp 2 — Biết slope \`a\` và 1 điểm \`(x₀, y₀)\`

Thay vào \`y₀ = a·x₀ + b\` để tìm \`b\`.

**Ví dụ.** Slope \`a = 2\`, đi qua điểm \`(1, 5)\`:

\`\`\`
5 = 2·1 + b
b = 5 − 2 = 3
y = 2x + 3
\`\`\`

### Trường hợp 3 — Biết 2 điểm \`(x₁, y₁)\` và \`(x₂, y₂)\`

Hai bước:

1. Tính slope: \`a = (y₂ − y₁) / (x₂ − x₁)\`.
2. Thay 1 trong 2 điểm vào để tìm \`b\`.

**Ví dụ.** Đường thẳng đi qua \`(1, 4)\` và \`(3, 10)\`:

\`\`\`
a = (10 − 4) / (3 − 1) = 6 / 2 = 3
Thay (1, 4): 4 = 3·1 + b  ⇒  b = 1
y = 3x + 1
\`\`\`

Kiểm tra với điểm thứ hai: \`3·3 + 1 = 10\` ✓.

## A.6. Hai đường thẳng — song song và vuông góc

Cho \`(d₁): y = a₁·x + b₁\` và \`(d₂): y = a₂·x + b₂\`.

- **Song song**: \`a₁ = a₂\` và \`b₁ ≠ b₂\`. Cùng độ dốc nên không bao giờ gặp nhau.
- **Trùng nhau**: \`a₁ = a₂\` và \`b₁ = b₂\`. Cùng một đường.
- **Cắt nhau**: \`a₁ ≠ a₂\`. Có đúng 1 giao điểm.
- **Vuông góc**: \`a₁ · a₂ = -1\`. Ví dụ slope \`2\` vuông góc với slope \`-1/2\`.

> Tại sao tích slope = -1 thì vuông góc? Trực giác: slope = \`tan(góc)\`. Hai đường vuông góc thì góc lệch nhau 90°, mà \`tan(α) · tan(α + 90°) = -1\`. Bài Trigonometry ở Tầng 2 sẽ chứng minh.

**Ví dụ.** \`y = 2x + 1\` và \`y = 2x − 4\` song song (cùng \`a = 2\`). \`y = 2x + 1\` vuông góc với \`y = -0.5x + 7\` (vì \`2 · (-0.5) = -1\`).

## A.7. Tại sao hàm bậc 1 quan trọng cho ML?

**Linear regression** — bài toán machine learning "hello world" — chính là: cho một đám điểm dữ liệu \`(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)\`, tìm đường thẳng \`y = ax + b\` "khớp" nhất.

> Ví dụ: x = diện tích nhà (m²), y = giá nhà (tỷ đồng). Có 1000 căn nhà trong dataset. Tìm \`a\`, \`b\` để dự đoán giá cho căn nhà mới chỉ cần biết diện tích.

"Khớp nhất" được đo bằng **tổng bình phương sai lệch** (MSE — Mean Squared Error):

\`\`\`
Loss(a, b) = (1/n) · Σ (yᵢ − (a·xᵢ + b))²
\`\`\`

Hai điều quan trọng đáng ghi nhận ngay:

1. Phương trình dự đoán chỉ là \`y = ax + b\` — đúng hàm bậc 1.
2. **Loss là một hàm bậc 2 theo \`a\` và \`b\`** — sẽ thấy ở Phần B vì sao điều này khiến bài toán có **lời giải đóng** (closed-form), không cần huấn luyện lặp.

Linear regression không chỉ là bài tập sách giáo khoa: nó là khối Lego đầu tiên của neural network. Một neuron trong mạng deep learning, về bản chất, là \`y = a·x + b\` rồi bọc qua một hàm phi tuyến (activation function). Hiểu đường thẳng = hiểu neuron đơn lẻ.

---

# Phần B — Hàm bậc 2 (quadratic function)

## B.1. Định nghĩa

Hàm bậc 2 (quadratic function) có dạng:

\`\`\`
y = a·x² + b·x + c      (với a ≠ 0)
\`\`\`

- \`a\`, \`b\`, \`c\` là 3 hằng số.
- Điều kiện \`a ≠ 0\` (nếu \`a = 0\` thì rơi về hàm bậc 1).

**Đồ thị của hàm bậc 2 là một parabol** (parabola — đường cong hình "hình chữ U" hoặc "hình chữ U lộn ngược").

### Ví dụ cụ thể

\`y = x² − 4x + 3\`:

| x  |  0 |  1 |  2 |  3 |  4 |
|----|----|----|----|----|----|
| y  |  3 |  0 | -1 |  0 |  3 |

Nhìn bảng đã thấy: y giảm rồi tăng, đạt min tại \`x = 2\`. Đó là **đỉnh** của parabol.

## B.2. Hướng mở và độ "rộng/hẹp"

Dấu của \`a\`:

| \`a\` | Hình dạng | Tính chất |
|-----|-----------|-----------|
| \`a > 0\` | ∪ (mở lên) | Có điểm thấp nhất (min) tại đỉnh |
| \`a < 0\` | ∩ (mở xuống) | Có điểm cao nhất (max) tại đỉnh |

\`|a|\` quyết định độ "hẹp":

- \`|a|\` lớn → parabol hẹp, hai cánh dựng đứng (ví dụ \`y = 5x²\`).
- \`|a|\` nhỏ → parabol bè, hai cánh thoải (ví dụ \`y = 0.1x²\`).

So sánh ở \`x = 2\`:

- \`y = 5x²\` → \`y = 20\` (cao vút).
- \`y = x²\` → \`y = 4\`.
- \`y = 0.1x²\` → \`y = 0.4\` (gần như bẹp).

## B.3. Đỉnh (vertex) của parabol

**Đỉnh** là điểm cực trị (min hoặc max) của parabol. Tọa độ:

\`\`\`
       -b          -Δ
xₐ = ─────    yₐ = ─────       với Δ = b² − 4ac
       2a          4a
\`\`\`

> **Cách dễ nhớ**: Hoành độ đỉnh là \`-b/(2a)\`. Còn tung độ đỉnh? Khỏi học công thức — cứ thay \`xₐ\` vào hàm \`y = ax² + bx + c\` là ra.

**Ví dụ.** \`y = x² − 4x + 3\`:

\`\`\`
a = 1, b = -4, c = 3
xₐ = -(-4) / (2·1) = 4/2 = 2
yₐ = f(2) = 2² − 4·2 + 3 = 4 − 8 + 3 = -1
Đỉnh: (2, -1)
\`\`\`

Khớp với bảng ở B.1 — tại \`x = 2\` thì \`y = -1\`, là giá trị nhỏ nhất.

### Vì sao hoành độ đỉnh là \`-b/(2a)\`?

Trực giác: parabol đối xứng. Nếu nó cắt Ox tại \`x₁\` và \`x₂\` thì trục đối xứng đi qua trung điểm \`(x₁ + x₂)/2\`. Theo Viète (sẽ học ở B.6), \`x₁ + x₂ = -b/a\`, nên trung điểm là \`-b/(2a)\`. Ngay cả khi không có nghiệm thực, công thức này vẫn đúng vì parabol vẫn có trục đối xứng.

## B.4. Trục đối xứng

Trục đối xứng là **đường thẳng đứng đi qua đỉnh**:

\`\`\`
x = -b / (2a)
\`\`\`

Mọi parabol đều đối xứng qua trục này: \`f(xₐ − k) = f(xₐ + k)\` với mọi \`k\`.

**Ví dụ.** \`y = x² − 4x + 3\` đối xứng qua \`x = 2\`. Kiểm tra: \`f(0) = 3\`, \`f(4) = 3\`. Đối xứng quanh \`x = 2\`.

## B.5. Nghiệm — công thức nghiệm (Quadratic formula)

Giải \`a·x² + b·x + c = 0\` (tìm giao điểm với trục Ox):

### Biệt thức Delta

\`\`\`
Δ = b² − 4·a·c
\`\`\`

### Phân loại nghiệm theo Δ

| Δ | Số nghiệm thực | Công thức | Hình học |
|---|----------------|-----------|----------|
| \`Δ > 0\` | 2 nghiệm phân biệt | \`x = (-b ± √Δ) / (2a)\` | Parabol **cắt** Ox tại 2 điểm |
| \`Δ = 0\` | 1 nghiệm kép | \`x = -b / (2a)\` | Parabol **tiếp xúc** Ox tại đỉnh |
| \`Δ < 0\` | Không có nghiệm thực | (có 2 nghiệm phức) | Parabol **không cắt** Ox |

> Trực giác hình học: parabol mở lên (\`a > 0\`) có đỉnh ở \`y = -Δ/(4a)\`. Nếu \`Δ > 0\` thì \`yₐ < 0\`, đỉnh ở dưới trục Ox, nên parabol bắt buộc phải cắt Ox ở 2 chỗ khi đi lên. Nếu \`Δ = 0\` thì \`yₐ = 0\`, đỉnh chạm Ox. Nếu \`Δ < 0\` thì \`yₐ > 0\`, đỉnh ở trên Ox, parabol không thể chạm xuống Ox.

### Ví dụ chạy đủ 3 trường hợp

**(1) Δ > 0.** Giải \`x² − 5x + 6 = 0\`:

\`\`\`
a = 1, b = -5, c = 6
Δ = (-5)² − 4·1·6 = 25 − 24 = 1
√Δ = 1
x₁ = (5 + 1)/2 = 3
x₂ = (5 − 1)/2 = 2
\`\`\`

Hai nghiệm: \`x = 2\` và \`x = 3\`.

**(2) Δ = 0.** Giải \`x² − 4x + 4 = 0\`:

\`\`\`
a = 1, b = -4, c = 4
Δ = 16 − 16 = 0
x = 4/2 = 2  (nghiệm kép)
\`\`\`

Phương trình tương đương \`(x − 2)² = 0\`. Parabol \`y = x² − 4x + 4\` tiếp xúc Ox tại \`(2, 0)\`.

**(3) Δ < 0.** Giải \`x² + x + 1 = 0\`:

\`\`\`
a = 1, b = 1, c = 1
Δ = 1 − 4 = -3
\`\`\`

Không có nghiệm thực. Parabol \`y = x² + x + 1\` hoàn toàn nằm trên trục Ox (đỉnh ở \`y = 3/4 > 0\`, và \`a > 0\` nên mở lên).

## B.6. Định lý Viète

Nếu \`ax² + bx + c = 0\` có 2 nghiệm \`x₁\`, \`x₂\` (kể cả nghiệm kép, hoặc nghiệm phức), thì:

\`\`\`
S = x₁ + x₂ = -b / a
P = x₁ · x₂ =  c / a
\`\`\`

### Vì sao đúng?

Khai triển \`a(x − x₁)(x − x₂) = a·x² − a(x₁ + x₂)·x + a·x₁·x₂\`. So sánh với \`ax² + bx + c\` thì \`-a(x₁ + x₂) = b\` và \`a·x₁·x₂ = c\`. Từ đó suy ra.

### Ứng dụng — nhẩm nghiệm

Cho \`x² − 5x + 6 = 0\`. Cần tìm 2 số có tổng \`5\` và tích \`6\`. Nhẩm thấy ngay: \`2\` và \`3\`. Khỏi phải tính Δ.

Cho \`x² + 7x + 12 = 0\`. Tìm 2 số tổng \`-7\`, tích \`12\`: \`-3\` và \`-4\`.

### Ứng dụng — kiểm tra nghiệm

Vừa giải xong \`2x² − 5x − 3 = 0\` và được \`x = 3\`, \`x = -0.5\`. Kiểm tra nhanh:

\`\`\`
S = 3 + (-0.5) = 2.5 = -(-5)/2 = -b/a ✓
P = 3 · (-0.5) = -1.5 = -3/2 = c/a   ✓
\`\`\`

## B.7. Phân tích thành nhân tử

Nếu \`ax² + bx + c = 0\` có 2 nghiệm \`x₁\`, \`x₂\` thì:

\`\`\`
ax² + bx + c = a·(x − x₁)·(x − x₂)
\`\`\`

**Ví dụ.** \`x² − 5x + 6\` có nghiệm \`2\` và \`3\` → \`x² − 5x + 6 = (x − 2)(x − 3)\`.

Kiểm tra: \`(x − 2)(x − 3) = x² − 3x − 2x + 6 = x² − 5x + 6\` ✓.

**Ví dụ với \`a ≠ 1\`.** \`2x² − 5x − 3\` có nghiệm \`3\` và \`-0.5\` → \`2x² − 5x − 3 = 2(x − 3)(x + 0.5) = (x − 3)(2x + 1)\`.

> Phân tích thành nhân tử rất hữu ích khi rút gọn phân thức hoặc tìm giới hạn (sẽ học ở Tầng 3 — Calculus).

## B.8. Hoàn thành bình phương (completing the square)

Biến \`y = ax² + bx + c\` về **dạng đỉnh** \`y = a·(x − h)² + k\` với \`(h, k)\` là đỉnh.

### Vì sao cần dạng đỉnh?

- Đọc đỉnh và giá trị min/max ngay lập tức, không cần công thức.
- Là kỹ thuật chứng minh công thức nghiệm.
- Trong giải tích và tối ưu, dạng \`(x − h)² + k\` rất thân thiện để lấy đạo hàm và tìm cực trị.

### Quy trình 4 bước

Cho \`f(x) = ax² + bx + c\`:

1. **Đặt a ra ngoài** 2 hạng tử đầu: \`f(x) = a·(x² + (b/a)·x) + c\`.
2. **Bù trừ** nửa hệ số \`x\` bình phương: thêm và bớt \`(b/(2a))²\` bên trong ngoặc.
3. **Gom thành bình phương**: \`(x + b/(2a))²\`.
4. **Rút gọn**: thu được \`a·(x + b/(2a))² + (c − b²/(4a)) = a·(x − h)² + k\`.

Với \`h = -b/(2a)\` và \`k = c − b²/(4a) = -Δ/(4a)\`.

### Ví dụ chi tiết

\`y = x² − 6x + 5\`. Đây là \`a = 1, b = -6, c = 5\`.

\`\`\`
y = x² − 6x + 5
  = (x² − 6x + 9) − 9 + 5         ← thêm 9 = (6/2)², trừ lại
  = (x − 3)² − 4
\`\`\`

Đỉnh: \`(3, -4)\`. Min của \`y\` là \`-4\`, đạt tại \`x = 3\`.

### Ví dụ với \`a ≠ 1\`

\`y = 3x² + 12x + 7\`:

\`\`\`
y = 3·(x² + 4x) + 7                ← đưa a = 3 ra ngoài
  = 3·(x² + 4x + 4 − 4) + 7        ← thêm/bớt 4 = (4/2)²
  = 3·((x + 2)² − 4) + 7
  = 3·(x + 2)² − 12 + 7
  = 3·(x + 2)² − 5
\`\`\`

Đỉnh: \`(-2, -5)\`. Min: \`-5\`.

Kiểm tra bằng công thức \`-b/(2a) = -12/6 = -2\` ✓ và \`-Δ/(4a) = -(144 − 84)/12 = -60/12 = -5\` ✓.

## B.9. Tại sao hàm bậc 2 quan trọng cho ML?

Quay lại linear regression ở A.7:

\`\`\`
Loss(a, b) = (1/n) · Σ (yᵢ − a·xᵢ − b)²
\`\`\`

Khai triển bình phương theo \`a\` và \`b\`, ta được một biểu thức bậc 2 — chính xác hơn, một **paraboloid** (parabol 2D). Tính chất quan trọng:

1. **Parabol mở lên** vì hệ số bậc 2 (\`Σxᵢ²\`, \`Σ1 = n\`) đều dương.
2. **Có duy nhất 1 đỉnh** — chính là **giá trị min toàn cục** của loss.
3. Đỉnh có **công thức đóng** (closed-form solution):

\`\`\`
a* = (n·Σxᵢyᵢ − Σxᵢ·Σyᵢ) / (n·Σxᵢ² − (Σxᵢ)²)
b* = (Σyᵢ − a*·Σxᵢ) / n
\`\`\`

Đây là lời giải **chính xác**, không cần huấn luyện lặp. Đúng theo đúng nghĩa: lấy đạo hàm theo \`a, b\` bằng 0 (vì đỉnh parabol là chỗ đạo hàm = 0), giải hệ phương trình tuyến tính 2 ẩn → ra \`(a*, b*)\`.

> Vì sao linear regression dạy đầu tiên trong mọi khóa ML? Vì loss của nó là parabol — một bài toán đại số phổ thông. Mọi mô hình phức tạp hơn (logistic regression, neural network) đều có loss không phải parabol thuần — không có closed-form, phải dùng **gradient descent** (đi xuống dốc parabol cục bộ). Hiểu parabol = hiểu cái cốt lõi của gradient descent.

Toy example với 3 điểm \`(1, 2), (2, 3), (3, 5)\`:

\`\`\`
n = 3
Σxᵢ = 6, Σyᵢ = 10, Σxᵢyᵢ = 1·2 + 2·3 + 3·5 = 23, Σxᵢ² = 14

a* = (3·23 − 6·10) / (3·14 − 36) = (69 − 60) / (42 − 36) = 9/6 = 1.5
b* = (10 − 1.5·6) / 3 = (10 − 9) / 3 = 1/3 ≈ 0.333

Đường khớp nhất: y = 1.5·x + 0.333
\`\`\`

Kiểm tra: tại \`x = 1, 2, 3\` thì mô hình dự đoán \`1.833, 3.333, 4.833\`. So với thực tế \`2, 3, 5\` — sai khoảng \`0.17, 0.33, 0.17\`. Không cách nào tốt hơn được.

---

# Bài tập

## Bài 1

Cho \`y = 2x − 3\`.

a) Xác định slope và y-intercept.
b) Tìm giao điểm với trục Ox.
c) Tính \`f(0)\`, \`f(1)\`, \`f(-2)\`.
d) Lập bảng giá trị 5 điểm với \`x ∈ {-2, -1, 0, 1, 2}\` và mô tả dáng đồ thị.

## Bài 2

Viết phương trình đường thẳng đi qua hai điểm \`(1, 4)\` và \`(3, 10)\`. Đường này có song song với \`y = 3x − 5\` không? Vì sao?

## Bài 3

Cho \`y = x² − 4x + 3\`.

a) Tìm đỉnh và trục đối xứng.
b) Tính biệt thức Δ và nghiệm (nếu có).
c) Tìm giao điểm với trục Oy.
d) Lập bảng giá trị với \`x ∈ {-1, 0, 1, 2, 3, 4, 5}\` và mô tả dáng parabol.

## Bài 4

Giải phương trình \`2x² − 5x − 3 = 0\` bằng 2 cách:

a) Công thức nghiệm (delta method).
b) Phân tích thành nhân tử.

Kiểm tra lại kết quả bằng định lý Viète.

## Bài 5

Biến \`f(x) = 3x² + 12x + 7\` về dạng đỉnh \`a·(x − h)² + k\`. Từ đó đọc tọa độ đỉnh và giá trị min.

## Bài 6 — Code Go

Viết hàm \`solveQuadratic(a, b, c float64) (roots []float64, status string)\` trả về danh sách nghiệm thực và mô tả trạng thái:

- Nếu \`a == 0\`: chuyển sang giải \`bx + c = 0\` (linear case). Cẩn thận thêm trường hợp \`a = b = 0\`.
- Nếu \`a ≠ 0\`: tính \`Δ\` và trả về 0/1/2 nghiệm tương ứng.

Demo trên ít nhất 4 input bao trùm các trường hợp.

---

# Lời giải chi tiết

## Lời giải bài 1

**a) Slope và y-intercept.** So với dạng \`y = ax + b\`: \`a = 2\`, \`b = -3\`. Slope \`= 2\`, y-intercept \`= -3\`. Đường thẳng cắt Oy tại \`(0, -3)\`.

**b) Giao Ox.** Giải \`2x − 3 = 0\` ⇒ \`x = 3/2 = 1.5\`. Đường thẳng cắt Ox tại \`(1.5, 0)\`.

**c) Giá trị hàm:**

- \`f(0) = 2·0 − 3 = -3\`
- \`f(1) = 2·1 − 3 = -1\`
- \`f(-2) = 2·(-2) − 3 = -7\`

**d) Bảng giá trị:**

| x  | -2 | -1 |  0 |  1 |  2 |
|----|----|----|----|----|----|
| y  | -7 | -5 | -3 | -1 |  1 |

Mỗi đơn vị \`x\` tăng thì \`y\` tăng đúng 2 đơn vị (= slope). Đường đi lên (vì \`a > 0\`).

## Lời giải bài 2

**Bước 1 — tính slope:**

\`\`\`
a = (10 − 4) / (3 − 1) = 6 / 2 = 3
\`\`\`

**Bước 2 — tìm b:** thay điểm \`(1, 4)\`:

\`\`\`
4 = 3·1 + b   ⇒   b = 1
\`\`\`

Phương trình: \`y = 3x + 1\`. Kiểm tra với điểm thứ hai: \`3·3 + 1 = 10\` ✓.

**Quan hệ với \`y = 3x − 5\`:** Cùng slope \`a = 3\` nhưng khác y-intercept (\`1\` vs \`-5\`) → **hai đường song song** (parallel), không bao giờ cắt nhau.

## Lời giải bài 3

\`a = 1, b = -4, c = 3\`.

**a) Đỉnh.**

\`\`\`
xₐ = -b/(2a) = 4/2 = 2
yₐ = f(2) = 4 − 8 + 3 = -1
Đỉnh: (2, -1)
Trục đối xứng: x = 2
\`\`\`

**b) Nghiệm.**

\`\`\`
Δ = b² − 4ac = 16 − 12 = 4
√Δ = 2
x₁ = (4 + 2)/2 = 3
x₂ = (4 − 2)/2 = 1
\`\`\`

Hai nghiệm: \`x = 1\` và \`x = 3\`.

**c) Giao Oy.** \`f(0) = 3\` → cắt Oy tại \`(0, 3)\`.

**d) Bảng giá trị:**

| x  | -1 |  0 |  1 |  2 |  3 |  4 |  5 |
|----|----|----|----|----|----|----|----|
| y  |  8 |  3 |  0 | -1 |  0 |  3 |  8 |

Đối xứng quanh \`x = 2\`: \`f(1) = f(3) = 0\`, \`f(0) = f(4) = 3\`, \`f(-1) = f(5) = 8\`. Parabol mở lên (\`a = 1 > 0\`), min tại đỉnh \`(2, -1)\`.

## Lời giải bài 4

\`2x² − 5x − 3 = 0\`, tức \`a = 2, b = -5, c = -3\`.

**a) Công thức nghiệm.**

\`\`\`
Δ = (-5)² − 4·2·(-3) = 25 + 24 = 49
√Δ = 7
x₁ = (5 + 7) / 4 = 12/4 = 3
x₂ = (5 − 7) / 4 = -2/4 = -0.5
\`\`\`

**b) Phân tích thành nhân tử.** Cần \`2x² − 5x − 3 = (px + q)(rx + s)\` với \`pr = 2, qs = -3, ps + qr = -5\`. Thử \`p = 2, r = 1, q = 1, s = -3\`:

\`\`\`
(2x + 1)(x − 3) = 2x² − 6x + x − 3 = 2x² − 5x − 3 ✓
\`\`\`

Nghiệm: \`2x + 1 = 0 ⇒ x = -0.5\`, \`x − 3 = 0 ⇒ x = 3\`. Trùng với cách (a).

**Kiểm tra Viète.**

\`\`\`
S = 3 + (-0.5) = 2.5;  -b/a = 5/2 = 2.5    ✓
P = 3 · (-0.5) = -1.5;  c/a = -3/2 = -1.5  ✓
\`\`\`

## Lời giải bài 5

\`f(x) = 3x² + 12x + 7\`, \`a = 3, b = 12, c = 7\`.

\`\`\`
f(x) = 3·(x² + 4x) + 7
     = 3·(x² + 4x + 4 − 4) + 7        ← (4/2)² = 4
     = 3·(x + 2)² − 12 + 7
     = 3·(x + 2)² − 5
     = 3·(x − (-2))² + (-5)
\`\`\`

Đỉnh: \`(h, k) = (-2, -5)\`. Vì \`a = 3 > 0\` (parabol mở lên), \`y\` đạt **min = -5** tại \`x = -2\`.

Kiểm tra:

- \`xₐ = -b/(2a) = -12/6 = -2\` ✓.
- \`f(-2) = 3·4 + 12·(-2) + 7 = 12 − 24 + 7 = -5\` ✓.

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

**Lưu ý số học:** Khi \`b\` rất lớn so với \`4ac\`, công thức \`(-b + √Δ)/(2a)\` có thể bị **cancellation error** (mất chữ số có nghĩa do trừ hai số gần bằng nhau). Cách khắc phục chuẩn ngành: dùng công thức "Citardauq" \`2c / (-b ∓ √Δ)\` cho nghiệm bị cancellation. Trong bài này dataset nhỏ nên dùng công thức cơ bản; sẽ bàn kỹ ở Tầng 5 — Numerical Analysis.

---

# Tóm tắt

| Khái niệm | Hàm bậc 1 | Hàm bậc 2 |
|-----------|-----------|-----------|
| Dạng | \`y = ax + b\` | \`y = ax² + bx + c\` |
| Đồ thị | Đường thẳng | Parabol |
| "Hệ số chính" | Slope \`a\` | Hướng & độ hẹp \`a\` |
| Điểm đặc biệt | y-intercept \`b\`, x-intercept \`-b/a\` | Đỉnh \`(-b/(2a), -Δ/(4a))\` |
| Số nghiệm \`f(x) = 0\` | Luôn đúng 1 | 0 / 1 / 2 tùy \`Δ = b² − 4ac\` |
| Dạng đỉnh / chuẩn | (không cần) | \`a(x − h)² + k\` |
| Ứng dụng ML chính | Dự đoán linear regression | MSE loss → bài toán tìm đỉnh parabol |

---

# Liên kết

- [solutions.go](./solutions.go) — code Go cho hàm \`solveQuadratic\`, \`vertex\`, \`lineFrom2Points\`, \`completeTheSquare\` và đáp án các bài tập.
- [visualization.html](./visualization.html) — playground tương tác: linear, quadratic, delta visualizer, completing-the-square stepper.
- ← Bài trước: [Lesson 05 — Hàm số là gì](../lesson-05-functions/)
- → Bài tiếp: [Lesson 07 — Hàm mũ và hàm log](../lesson-07-exp-log-functions/)
- ↑ Mục lục tầng: [Tầng 1 — Algebra](../README.md)
`;
