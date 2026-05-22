// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Algebra/lesson-02-variables-expressions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Biến và biểu thức

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **biến (variable)** là một ký hiệu đại diện cho một số (chưa biết hoặc có thể thay đổi), khác với **hằng (constant)** là số cố định.
- Đọc và viết được **biểu thức đại số (algebraic expression)** như \`2x + 3\`, \`x² − 5x + 6\`, phân biệt biểu thức với phương trình.
- **Đánh giá (evaluate)** một biểu thức: thay giá trị vào biến và tính ra số, áp dụng đúng thứ tự phép tính PEMDAS/BODMAS.
- Thực hiện ba phép biến đổi nền tảng: **gom hạng tử đồng dạng**, **khai triển (expand)** bằng phân phối, và **phân tích thành nhân tử (factor)**.
- Hiểu vì sao trong toán viết \`2x\` mà trong code phải viết \`2*x\`, và operator precedence giống/khác giữa hai bên.
- Thấy được liên hệ trực tiếp tới các tầng sau: feature engineering (BMI = weight / height²), đa thức, hàm số, gradient.

## Kiến thức tiền đề

- [Lesson 01 — Số và trục số](../lesson-01-numbers/): biết các tập số ℕ, ℤ, ℚ, ℝ; thứ tự; giá trị tuyệt đối.
- Bốn phép toán cơ bản trên số thực (cộng, trừ, nhân, chia).
- Lũy thừa nguyên dương: \`x² = x · x\`, \`x³ = x · x · x\` (sẽ học kỹ ở Lesson 04).

## 1. Biến là gì?

### Vấn đề đặt ra

Khi ta nói "diện tích hình vuông cạnh 3 là 9", "diện tích hình vuông cạnh 5 là 25", "diện tích hình vuông cạnh 7 là 49"... ta lặp lại cùng một câu rất nhiều lần, chỉ thay đúng một con số. Có cách nào nói **một lần** cho **mọi cạnh** không?

Có: dùng một ký hiệu — gọi tạm là \`a\` — đại diện cho cạnh. Khi đó:

> Diện tích hình vuông cạnh \`a\` là \`a²\`.

Một câu duy nhất, đúng cho mọi giá trị của \`a\`. Ký hiệu \`a\` ở đây gọi là **biến (variable)**.

### Định nghĩa

**Biến** là một ký hiệu (thường là chữ cái) đại diện cho một số. Số đó có thể:

- **Chưa biết** — ta cần tìm ra (vd. \`x\` trong \`2x + 3 = 7\`).
- **Tổng quát** — đại diện cho "bất kỳ số nào" trong một quy luật (vd. \`n\` trong \`n² ≥ 0\` đúng với mọi \`n\` thực).
- **Thay đổi được** — như trong hàm số \`y = f(x)\`, khi \`x\` thay đổi thì \`y\` cũng thay đổi.

### Hằng (constant)

**Hằng** là một số cố định, giá trị không thay đổi. Có hai loại hằng phổ biến:

| Loại | Ví dụ | Ghi chú |
|------|-------|---------|
| Hằng số cụ thể | \`3\`, \`−7.5\`, \`π ≈ 3.14159\`, \`e ≈ 2.71828\` | Giá trị biết rõ. |
| Tham số (parameter) | \`a\`, \`b\`, \`c\` trong \`ax² + bx + c\` | Cố định trong một bài toán nhưng có thể khác giữa các bài. |

> **Tham số là gì?** Hơi rối: tham số là biến hay hằng? Câu trả lời: **tùy ngữ cảnh**. Khi ta viết "phương trình bậc 2 tổng quát \`ax² + bx + c = 0\`", thì \`a, b, c\` là tham số — cố định trong **một** phương trình cụ thể, nhưng đại diện cho "bất kỳ phương trình bậc 2 nào". Còn \`x\` là biến — cái cần tìm. Mỗi khi giải một bài cụ thể như \`2x² − 3x + 1 = 0\`, ta gán \`a = 2, b = −3, c = 1\`, lúc đó chúng thành hằng số.

### Quy ước đặt tên (rất phổ biến, không bắt buộc)

| Chữ | Vai trò điển hình |
|-----|-------------------|
| \`x, y, z\` | Biến chưa biết, cần tìm; hoặc tọa độ điểm. |
| \`a, b, c, d\` | Tham số, hệ số. |
| \`i, j, k, n, m\` | Chỉ số nguyên (index), số nguyên. |
| \`t\` | Thời gian. |
| \`θ, α, β, γ\` | Góc. |
| \`f, g, h\` | Hàm số. |

Hai biểu thức \`2x + 3\` và \`2a + 3\` hoàn toàn giống nhau về mặt toán học — chỉ khác cách quen mắt. Nhưng nếu bạn thấy \`a, b, c\` đi kèm với một \`x\`, gần như chắc chắn \`x\` là cái cần tìm.

## 2. Biểu thức đại số

### Định nghĩa

**Biểu thức đại số** là một dãy ký hiệu kết hợp giữa số, biến, và các phép toán (\`+\`, \`−\`, \`×\`, \`÷\`, lũy thừa, căn, ngoặc...) — sao cho khi thay tất cả biến bằng số cụ thể, ta tính ra được **một** giá trị.

Ví dụ là biểu thức:

- \`7\` (chỉ một số cũng là biểu thức)
- \`x\`
- \`2x + 3\`
- \`x² − 5x + 6\`
- \`(a + b) / (a − b)\` (với điều kiện \`a ≠ b\`)
- \`√(x² + y²)\`
- \`3xy − 2x²y + 5\`

Ví dụ **không** là biểu thức (mà là phương trình hoặc bất phương trình):

- \`2x + 3 = 7\` — có dấu \`=\`, đây là **phương trình (equation)**.
- \`x² < 4\` — có dấu \`<\`, đây là **bất phương trình (inequality)**.

### Biểu thức vs phương trình — phân biệt ngay

| | Biểu thức | Phương trình |
|---|-----------|--------------|
| Có dấu \`=\`? | Không | Có |
| Có "giải" được không? | Không, chỉ "đánh giá" hoặc "đơn giản hóa". | Có, tìm giá trị biến làm hai vế bằng nhau. |
| Ví dụ | \`2x + 3\` | \`2x + 3 = 7\` |
| Kết quả | Một biểu thức khác (đã rút gọn) hoặc một số (nếu thay giá trị). | Một (hoặc nhiều, hoặc không) giá trị của biến. |

> **Nhầm phổ biến**: nói "giải biểu thức \`2x + 3\`". Sai. Phải nói "đơn giản hóa biểu thức \`2x + 3\`" (không làm gì được vì đã đơn giản nhất rồi) hoặc "đánh giá biểu thức tại \`x = 5\`" (ra \`13\`).

### Hạng tử (term) — đơn vị cấu thành biểu thức

Một biểu thức là tổng/hiệu của các **hạng tử**. Mỗi hạng tử là một tích của:

- Một **hệ số (coefficient)** — phần số.
- Một hoặc nhiều biến với lũy thừa nguyên không âm (ở mức phổ thông).

Ví dụ với biểu thức \`3x²y − 5xy + 7x − 2\`:

| Hạng tử | Hệ số | Phần biến |
|---------|-------|-----------|
| \`3x²y\` | \`3\` | \`x²y\` |
| \`−5xy\` | \`−5\` | \`xy\` |
| \`7x\` | \`7\` | \`x\` |
| \`−2\` | \`−2\` | (không có biến — hạng tử tự do) |

**Hạng tử đồng dạng (like terms)** = các hạng tử có **phần biến giống hệt nhau**. Vd: \`3x²y\` và \`−7x²y\` đồng dạng; còn \`3x²y\` và \`3xy²\` **không** đồng dạng (khác về \`x², y²\`).

## 3. Đánh giá biểu thức (evaluation)

### Quy trình

Để **đánh giá** một biểu thức tại một giá trị cụ thể của biến: thay giá trị vào, rồi tính theo thứ tự phép tính chuẩn.

### Thứ tự phép tính: PEMDAS / BODMAS

Hai cách viết tắt cùng một quy tắc:

| Ký tự | PEMDAS (Mỹ) | BODMAS (Anh) | Tiếng Việt |
|-------|-------------|--------------|------------|
| P / B | Parentheses | Brackets | Ngoặc |
| E / O | Exponents | Orders (lũy thừa, căn) | Lũy thừa, căn |
| M | Multiplication | Multiplication | Nhân |
| D | Division | Division | Chia |
| A | Addition | Addition | Cộng |
| S | Subtraction | Subtraction | Trừ |

**Hai điều dễ quên**:

1. **Nhân và chia cùng cấp**, thực hiện từ trái sang phải. \`8 ÷ 4 × 2 = (8÷4) × 2 = 2 × 2 = 4\`, **không** phải \`8 ÷ (4×2) = 1\`.
2. **Cộng và trừ cũng cùng cấp**, làm từ trái sang phải. \`10 − 3 + 2 = (10−3) + 2 = 9\`, **không** phải \`10 − (3+2) = 5\`.

### Walk-through: tính \`2x² + 3x − 1\` với x = -2

\`\`\`
Bước 1: Thay x = -2 vào:
        2·(-2)² + 3·(-2) − 1

Bước 2: Lũy thừa trước (E):
        (-2)² = 4
        → 2·4 + 3·(-2) − 1

Bước 3: Nhân (M), trái sang phải:
        2·4 = 8
        3·(-2) = -6
        → 8 + (-6) − 1

Bước 4: Cộng/trừ (AS) từ trái sang phải:
        8 + (-6) = 2
        2 − 1 = 1

Kết quả: 1
\`\`\`

> **Câu hỏi tự nhiên**: tại sao phải bọc ngoặc \`(-2)²\`? Vì nếu viết \`-2²\` thì theo quy tắc, lũy thừa làm trước dấu trừ đơn (unary minus): \`-2² = -(2²) = -4\`. Còn \`(-2)² = 4\`. Khi thay số âm vào biến, **luôn** bọc ngoặc để tránh nhầm.

### Bảng đánh giá \`f(x) = 2x² + 3x − 1\`

| \`x\` | \`2x²\` | \`3x\` | \`2x² + 3x − 1\` |
|-----|-------|------|----------------|
| \`−2\` | \`2·4 = 8\`  | \`−6\` | \`8 − 6 − 1 = 1\` |
| \`−1\` | \`2·1 = 2\`  | \`−3\` | \`2 − 3 − 1 = −2\` |
| \`0\`  | \`0\`        | \`0\`  | \`0 + 0 − 1 = −1\` |
| \`1\`  | \`2·1 = 2\`  | \`3\`  | \`2 + 3 − 1 = 4\` |
| \`2\`  | \`2·4 = 8\`  | \`6\`  | \`8 + 6 − 1 = 13\` |

Đây là cách ta sẽ vẽ đồ thị một hàm số sau này (Lesson 06): tính giá trị tại nhiều \`x\`, chấm lên mặt phẳng, nối lại.

## 4. Các phép biến đổi cơ bản

### 4.1. Gom hạng tử đồng dạng

**Quy tắc**: cộng/trừ các hạng tử có cùng phần biến bằng cách cộng/trừ hệ số của chúng.

\`\`\`
3x + 5x        = (3+5)x      = 8x
7y − 2y        = (7−2)y      = 5y
4x²y − x²y     = (4−1)x²y    = 3x²y
2x + 3y        — KHÔNG gom được, khác phần biến.
2x² + 3x       — KHÔNG gom được, khác lũy thừa của x.
\`\`\`

**Tại sao quy tắc này đúng?** Vì nó chính là tính chất phân phối ngược: \`3x + 5x = (3+5)·x\` (rút x ra ngoài). Mọi phép biến đổi đại số đều xoay quanh phân phối — sẽ thấy ở 4.2.

### 4.2. Nhân phân phối (distributive law)

**Quy tắc**: \`a(b + c) = ab + ac\` và \`(b + c)a = ba + ca\`.

Mở rộng cho nhiều hạng tử: \`a(b + c + d) = ab + ac + ad\`.

Walk-through cụ thể:

\`\`\`
3(x + 4)        = 3·x + 3·4         = 3x + 12
−2(x − 5)       = (−2)·x + (−2)·(−5) = −2x + 10
x(x + 3)        = x·x + x·3         = x² + 3x
(2x − 1)·5      = 5·2x + 5·(−1)     = 10x − 5
\`\`\`

> **Lưu ý dấu trừ**: \`−(x − 3)\` được hiểu là \`(−1)·(x − 3) = −x + 3\`. Đổi dấu **tất cả** các hạng tử trong ngoặc, không chỉ hạng tử đầu.

**Nhân hai biểu thức trong ngoặc**: phân phối hai lần (FOIL = First, Outer, Inner, Last):

\`\`\`
(a + b)(c + d) = a·c + a·d + b·c + b·d
                  ↑      ↑      ↑      ↑
                First  Outer  Inner  Last
\`\`\`

Walk-through \`(2x + 3)(x − 4)\`:

\`\`\`
F: 2x · x   = 2x²
O: 2x · (−4) = −8x
I: 3 · x    = 3x
L: 3 · (−4) = −12

Tổng: 2x² − 8x + 3x − 12 = 2x² − 5x − 12
\`\`\`

### 4.3. Ba hằng đẳng thức đáng nhớ

Đây là **trường hợp đặc biệt** của phân phối hai lần — học thuộc vì gặp hàng ngày:

| Hằng đẳng thức | Khai triển |
|----------------|------------|
| Bình phương tổng | \`(a + b)² = a² + 2ab + b²\` |
| Bình phương hiệu | \`(a − b)² = a² − 2ab + b²\` |
| Hiệu hai bình phương | \`(a + b)(a − b) = a² − b²\` |

Kiểm tra \`(a+b)² = a² + 2ab + b²\` bằng FOIL:

\`\`\`
(a + b)(a + b) = a·a + a·b + b·a + b·b
               = a² + ab + ab + b²
               = a² + 2ab + b²    ✓
\`\`\`

Walk-through với số cụ thể, kiểm bằng tính trực tiếp:

\`\`\`
(3 + 4)² = 7² = 49
         = 3² + 2·3·4 + 4² = 9 + 24 + 16 = 49  ✓

(10 − 1)(10 + 1) = 9 · 11 = 99
                 = 10² − 1² = 100 − 1 = 99    ✓
\`\`\`

> **Mẹo tính nhẩm**: \`99² = (100 − 1)² = 10000 − 200 + 1 = 9801\`. Hằng đẳng thức không chỉ dùng cho biến mà cho mọi số.

### 4.4. Phân tích thành nhân tử (factoring)

**Phân tích thành nhân tử** = ngược lại của khai triển. Viết một biểu thức dưới dạng tích của các biểu thức đơn giản hơn.

Ba kỹ thuật cơ bản:

**(a) Đặt nhân tử chung**:

\`\`\`
6x + 9    = 3(2x + 3)      (chung là 3)
x² − 5x   = x(x − 5)        (chung là x)
4x²y − 6xy² = 2xy(2x − 3y)  (chung là 2xy)
\`\`\`

**(b) Dùng hằng đẳng thức ngược**:

\`\`\`
x² − 9        = x² − 3²     = (x − 3)(x + 3)        (hiệu hai bình phương)
x² + 6x + 9   = x² + 2·x·3 + 3² = (x + 3)²          (bình phương tổng)
x² − 10x + 25 = x² − 2·x·5 + 5² = (x − 5)²          (bình phương hiệu)
\`\`\`

**(c) Phân tích tam thức bậc 2** \`x² + bx + c\`: tìm hai số có **tổng** = \`b\` và **tích** = \`c\`, đó là hai nghiệm với dấu đảo lại.

\`\`\`
x² + 5x + 6: tìm hai số có tổng 5, tích 6 → 2 và 3
            → (x + 2)(x + 3)

x² − 7x + 12: tổng -7, tích 12 → -3 và -4
            → (x − 3)(x − 4)

x² + x − 6: tổng 1, tích -6 → 3 và -2
          → (x + 3)(x − 2)
\`\`\`

**Vì sao cần phân tích?** Vì nếu biểu thức = 0, ta dùng quy tắc "tích bằng 0 ⇔ một thừa số bằng 0". \`(x − 3)(x + 5) = 0 ⇔ x = 3 hoặc x = −5\`. Đây là cách giải phương trình bậc 2 (sẽ học ở Lesson 06).

## 5. Quy ước viết — vì sao \`2x\` không phải \`2·x\`

### Lược bỏ dấu nhân

Trong toán, khi viết tay hoặc trong sách, **dấu nhân thường được lược bỏ** trong các trường hợp sau:

| Viết gọn | Đầy đủ | Ghi chú |
|----------|--------|---------|
| \`2x\` | \`2 · x\` | Số đứng trước biến. |
| \`xy\` | \`x · y\` | Hai biến cạnh nhau. |
| \`3(x+1)\` | \`3 · (x+1)\` | Số trước ngoặc. |
| \`(x+1)(x−2)\` | \`(x+1) · (x−2)\` | Hai ngoặc cạnh nhau. |
| \`5√2\` | \`5 · √2\` | Số trước căn. |

Nhưng **không lược bỏ** khi:

- Hai số cạnh nhau: viết \`3·5\` chứ không phải \`35\` (vì \`35\` là một số khác).
- Có thể gây nhầm: \`2 × 3.5\` viết \`2·3.5\` cho rõ, không viết \`23.5\`.

### Dấu trừ đơn (unary minus)

\`−x\` có nghĩa là \`(−1) · x\`. Tương tự, \`−x²\` thường được hiểu là \`−(x²) = −1·x²\`. Để chỉ "(−x)²", **phải bọc ngoặc**:

\`\`\`
−x² tại x = 3:  −(3²) = −9
(−x)² tại x = 3: (−3)² = 9
\`\`\`

Khác nhau hoàn toàn. Đây là lỗi cực kỳ phổ biến — luôn ngoặc lại khi thay số âm.

### Lũy thừa

\`x²\` (chỉ số mũ nhỏ ở trên) là cách viết chuẩn trong toán. Khi gõ máy/code, ta thường viết \`x^2\` (caret) hoặc \`x**2\` (Python) hoặc \`math.Pow(x, 2)\` (Go). Không có ký hiệu \`²\` trên bàn phím thông thường.

Trong README này, mình dùng \`x²\` cho dễ đọc; trong code Go bên dưới mình dùng \`x*x\` hoặc \`math.Pow(x, 2)\`.

## 6. Liên hệ với lập trình (Go)

### Khác biệt cú pháp

| Toán | Go |
|------|-----|
| \`2x + 3\` | \`2*x + 3\` (bắt buộc viết \`*\`) |
| \`xy\` | \`x*y\` |
| \`x²\` | \`x*x\` hoặc \`math.Pow(x, 2)\` |
| \`(a+b)/(a−b)\` | \`(a + b) / (a - b)\` |
| \`√x\` | \`math.Sqrt(x)\` |
| \`−x\` | \`-x\` |

Trong Go (và hầu hết ngôn ngữ lập trình), **không có dấu nhân ngầm**. Viết \`2x\` sẽ lỗi cú pháp.

### Operator precedence trong Go

Go theo thứ tự gần giống PEMDAS, nhưng có thêm các phép toán bit:

| Ưu tiên | Toán tử | Ghi chú |
|---------|---------|---------|
| 5 (cao nhất) | \`*  /  %  <<  >>  &  &^\` | Nhân, chia, lấy bit |
| 4 | \`+  -  \\|  ^\` | Cộng trừ, OR bit, XOR |
| 3 | \`==  !=  <  <=  >  >=\` | So sánh |
| 2 | \`&&\` | AND logic |
| 1 (thấp nhất) | \`\\|\\|\` | OR logic |

Lưu ý: Go **không có** toán tử lũy thừa \`**\` như Python. Phải dùng \`math.Pow(x, n)\` (kết quả \`float64\`) hoặc tự nhân.

Ví dụ:

\`\`\`go
x := 3.0
result := 2*x*x + 3*x - 1   // 2x² + 3x − 1 = 18 + 9 − 1 = 26
// 2*x*x được tính trước (cùng cấp với *, trái sang phải)
// rồi cộng 3*x, rồi trừ 1
\`\`\`

### Lỗi precedence điển hình

\`\`\`go
// SAI: muốn tính (a+b)/(a-b)
result := a + b / a - b    // thực tế là: a + (b/a) − b

// ĐÚNG:
result := (a + b) / (a - b)
\`\`\`

Khi không chắc, **luôn dùng ngoặc**. Đọc dễ hơn, không sai.

## 7. Liên hệ với tầng sau

### Feature engineering trong ML

Trong machine learning, **feature engineering** là việc tạo ra các "biến mới" từ các biến gốc. Đó chính là **viết biểu thức** từ các biến đầu vào.

Ví dụ kinh điển:

| Biến gốc | Biểu thức (feature mới) | Ý nghĩa |
|----------|-------------------------|---------|
| \`weight\` (kg), \`height\` (m) | \`BMI = weight / height²\` | Chỉ số khối cơ thể |
| \`x\`, \`y\` | \`r = √(x² + y²)\` | Khoảng cách tới gốc |
| \`price\`, \`quantity\` | \`revenue = price · quantity\` | Doanh thu |
| \`a\`, \`b\`, \`c\` (cạnh tam giác) | \`s = (a+b+c)/2\` rồi \`area = √(s(s−a)(s−b)(s−c))\` | Diện tích (Heron) |

Mô hình ML không "biết" rằng \`weight / height²\` có ý nghĩa — bạn phải nói cho nó biết bằng cách tạo biến mới. Đó là biểu thức đại số.

### Đa thức (polynomial)

Một loại biểu thức cực quan trọng: **đa thức một biến** có dạng:

\`\`\`
P(x) = a_n · x^n + a_{n−1} · x^{n−1} + ... + a_1 · x + a_0
\`\`\`

- \`a_0, a_1, ..., a_n\` là hệ số (constant).
- Bậc cao nhất \`n\` gọi là **bậc của đa thức**.
- Ví dụ: \`3x² − 5x + 1\` là đa thức bậc 2; \`x³ + x − 7\` là đa thức bậc 3.

Sẽ học kỹ ở **Lesson 06 (Hàm bậc 1 và bậc 2)**. Còn ở bài tập 5 dưới đây, ta đã viết hàm \`evaluate\` tổng quát cho mọi đa thức.

### Gradient và đạo hàm

Khi qua Calculus (tầng 3), bạn sẽ "đạo hàm" các biểu thức. Đạo hàm của \`2x² + 3x − 1\` là \`4x + 3\`. Trước khi đạo hàm được, phải biết đọc, viết, biến đổi biểu thức thuần thục — đó là tất cả Lesson 02 này.

## Bài tập

### Bài 1
Tính giá trị của \`f(x) = 3x² − 2x + 1\` với \`x = −1, 0, 1, 2\`. Lập bảng.

### Bài 2
Đơn giản hóa biểu thức \`2(x + 3) − 3(2x − 1) + x\`. Đáp án dưới dạng \`ax + b\`.

### Bài 3
Khai triển các biểu thức sau:

a) \`(2x − 3)²\`

b) \`(x + 1)(x − 2)(x + 3)\`

### Bài 4
Phân tích các biểu thức sau thành nhân tử:

a) \`x² − 9\`

b) \`x² + 5x + 6\`

c) \`2x² − 8\`

### Bài 5 (code)
Viết hàm Go \`evaluate(coeffs []float64, x float64) float64\` tính giá trị đa thức \`coeffs[0] + coeffs[1]·x + coeffs[2]·x² + ...\` tại \`x\`, **sử dụng phương pháp Horner**.

Gợi ý: phương pháp Horner viết lại đa thức theo cách lồng nhau, ví dụ:

\`\`\`
3x³ + 2x² − x + 5 = ((3x + 2)x − 1)x + 5
\`\`\`

Nhờ đó chỉ cần \`n\` phép nhân và \`n\` phép cộng cho đa thức bậc \`n\`, thay vì tính từng lũy thừa.

## Lời giải chi tiết

### Lời giải Bài 1

Cách tiếp cận: thay từng giá trị x vào, áp dụng PEMDAS, lập bảng. Luôn bọc ngoặc khi thay số âm.

| \`x\` | \`3x²\` | \`−2x\` | \`+1\` | \`f(x)\` |
|-----|-------|-------|------|--------|
| \`−1\` | \`3·(−1)² = 3·1 = 3\` | \`−2·(−1) = 2\` | \`1\` | \`3 + 2 + 1 = 6\` |
| \`0\`  | \`3·0² = 0\`  | \`0\`  | \`1\` | \`0 + 0 + 1 = 1\` |
| \`1\`  | \`3·1² = 3\`  | \`−2\` | \`1\` | \`3 − 2 + 1 = 2\` |
| \`2\`  | \`3·2² = 12\` | \`−4\` | \`1\` | \`12 − 4 + 1 = 9\` |

**Đáp số**: \`f(−1)=6, f(0)=1, f(1)=2, f(2)=9\`.

> Kiểm tra nhanh bằng trực giác: \`f(0)\` luôn là hạng tử tự do (ở đây là \`1\`). \`f(0) = 1\` ✓.

### Lời giải Bài 2

Cách tiếp cận: phân phối từng ngoặc, rồi gom hạng tử đồng dạng. Cẩn thận dấu trừ.

\`\`\`
2(x + 3) − 3(2x − 1) + x

Bước 1: Phân phối ngoặc đầu: 2(x+3) = 2x + 6
Bước 2: Phân phối ngoặc thứ hai: 3(2x−1) = 6x − 3
        Vì có dấu trừ trước nó: −3(2x−1) = −6x + 3
Bước 3: Viết lại: 2x + 6 − 6x + 3 + x
Bước 4: Gom hạng tử có x: 2x − 6x + x = (2 − 6 + 1)x = −3x
        Gom hạng tử tự do: 6 + 3 = 9
Bước 5: Kết quả: −3x + 9
\`\`\`

**Đáp số**: \`−3x + 9\` (hoặc viết là \`9 − 3x\` cũng đúng).

> Kiểm tra bằng cách thay \`x = 1\`:
> - Biểu thức gốc: \`2·4 − 3·1 + 1 = 8 − 3 + 1 = 6\`.
> - Kết quả: \`−3·1 + 9 = 6\`. ✓

### Lời giải Bài 3

**a) \`(2x − 3)²\`**

Cách tiếp cận: dùng hằng đẳng thức \`(a − b)² = a² − 2ab + b²\` với \`a = 2x\`, \`b = 3\`.

\`\`\`
(2x − 3)² = (2x)² − 2·(2x)·3 + 3²
          = 4x² − 12x + 9
\`\`\`

**Đáp số**: \`4x² − 12x + 9\`.

> Kiểm tra với \`x = 2\`: gốc \`(4−3)² = 1\`; kết quả \`16 − 24 + 9 = 1\`. ✓

**b) \`(x + 1)(x − 2)(x + 3)\`**

Cách tiếp cận: nhân hai cái đầu trước, rồi nhân kết quả với cái thứ ba.

Bước 1: \`(x + 1)(x − 2)\` dùng FOIL:
\`\`\`
= x² − 2x + x − 2 = x² − x − 2
\`\`\`

Bước 2: \`(x² − x − 2)(x + 3)\` — phân phối từng hạng tử của đa thức đầu nhân với \`(x + 3)\`:
\`\`\`
x²·(x + 3)   = x³ + 3x²
(−x)·(x + 3) = −x² − 3x
(−2)·(x + 3) = −2x − 6

Cộng: x³ + 3x² − x² − 3x − 2x − 6
    = x³ + (3 − 1)x² + (−3 − 2)x − 6
    = x³ + 2x² − 5x − 6
\`\`\`

**Đáp số**: \`x³ + 2x² − 5x − 6\`.

> Kiểm tra với \`x = 0\`: gốc \`1·(−2)·3 = −6\`; kết quả \`0 + 0 − 0 − 6 = −6\`. ✓
> Kiểm tra với \`x = 1\`: gốc \`2·(−1)·4 = −8\`; kết quả \`1 + 2 − 5 − 6 = −8\`. ✓

### Lời giải Bài 4

**a) \`x² − 9\`**

Đây là hiệu hai bình phương: \`x² − 3² = (x − 3)(x + 3)\`.

**Đáp số**: \`(x − 3)(x + 3)\`.

**b) \`x² + 5x + 6\`**

Tìm hai số có **tổng = 5** và **tích = 6**. Liệt kê các cặp ước của 6: (1, 6), (2, 3). Cặp (2, 3) có tổng 5. ✓

**Đáp số**: \`(x + 2)(x + 3)\`.

> Kiểm tra bằng FOIL: \`(x+2)(x+3) = x² + 3x + 2x + 6 = x² + 5x + 6\`. ✓

**c) \`2x² − 8\`**

Bước 1: Đặt nhân tử chung là 2: \`2x² − 8 = 2(x² − 4)\`.

Bước 2: Phần \`x² − 4\` lại là hiệu hai bình phương: \`x² − 2² = (x − 2)(x + 2)\`.

**Đáp số**: \`2(x − 2)(x + 2)\`.

> Lưu ý: luôn đặt nhân tử chung **trước**, rồi mới đến hằng đẳng thức. Bỏ qua bước (1) thì bài này không phân tích được sạch.

### Lời giải Bài 5

**Phương pháp Horner**: viết lại đa thức \`a₀ + a₁x + a₂x² + ... + aₙxⁿ\` dưới dạng lồng:

\`\`\`
aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀
= ((...((aₙ)x + aₙ₋₁)x + aₙ₋₂)x + ... + a₁)x + a₀
\`\`\`

Bắt đầu từ hệ số bậc cao nhất, nhân với \`x\` rồi cộng hệ số bậc thấp hơn kế tiếp, lặp lại đến hệ số bậc 0.

Walk-through với \`P(x) = 3x³ + 2x² − x + 5\` tại \`x = 2\`:

\`\`\`
result = 3                       (hệ số bậc cao nhất)
result = 3·2 + 2 = 8             (nhân x, cộng hệ số tiếp theo)
result = 8·2 + (−1) = 15
result = 15·2 + 5 = 35

Kiểm tra: 3·8 + 2·4 − 2 + 5 = 24 + 8 − 2 + 5 = 35 ✓
\`\`\`

Code Go:

\`\`\`go
// evaluate tính P(x) = coeffs[0] + coeffs[1]*x + coeffs[2]*x² + ...
// dùng phương pháp Horner. coeffs có thể rỗng (trả 0).
func evaluate(coeffs []float64, x float64) float64 {
    n := len(coeffs)
    if n == 0 {
        return 0
    }
    // Bắt đầu từ hệ số bậc cao nhất, đi ngược về bậc 0.
    result := coeffs[n-1]
    for i := n - 2; i >= 0; i-- {
        result = result*x + coeffs[i]
    }
    return result
}
\`\`\`

**Độ phức tạp**:

- **Số phép nhân**: \`n\` (đa thức bậc \`n\` có \`n+1\` hệ số, lặp \`n\` lần).
- **Số phép cộng**: \`n\`.
- **Bộ nhớ phụ**: O(1).

**So với cách "ngây thơ"** — tính từng \`xⁱ\` riêng rồi nhân với hệ số:

\`\`\`go
result := 0.0
for i := 0; i < n; i++ {
    result += coeffs[i] * math.Pow(x, float64(i))   // mỗi lần Pow = i phép nhân
}
\`\`\`

Tổng số phép nhân: \`0 + 1 + 2 + ... + n = n(n+1)/2\`. Horner nhanh **hơn ~n/2 lần** với cùng độ chính xác.

Xem code đầy đủ ở [solutions.go](./solutions.go) — có hàm \`evaluate\` Horner, có \`evaluateNaive\` để so sánh, và có bộ test.

## Tài liệu liên quan

- [solutions.go](./solutions.go) — Code Go cho tất cả bài tập.
- [visualization.html](./visualization.html) — Bộ ba tool tương tác: evaluator, substitution stepper, like terms collector.
- **Lesson trước**: [Lesson 01 — Số và trục số](../lesson-01-numbers/)
- **Lesson tiếp**: [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/)
- **Tầng tiếp**: sẽ dùng biểu thức để dựng hàm số (Lesson 05), đa thức bậc 2 (Lesson 06), và xa hơn là feature engineering trong ML.
`;
