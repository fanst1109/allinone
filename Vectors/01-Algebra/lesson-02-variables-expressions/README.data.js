// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/01-Algebra/lesson-02-variables-expressions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Biến và biểu thức

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **biến (variable)** là một ký hiệu đại diện cho một số (chưa biết hoặc có thể thay đổi), khác với **hằng (constant)** là số cố định.
- Đọc và viết được **biểu thức đại số (algebraic expression)** như $2x + 3$, $x^2 - 5x + 6$, phân biệt biểu thức với phương trình.
- **Đánh giá (evaluate)** một biểu thức: thay giá trị vào biến và tính ra số, áp dụng đúng thứ tự phép tính PEMDAS/BODMAS.
- Thực hiện ba phép biến đổi nền tảng: **gom hạng tử đồng dạng**, **khai triển (expand)** bằng phân phối, và **phân tích thành nhân tử (factor)**.
- Hiểu vì sao trong toán viết \`2x\` mà trong code phải viết \`2*x\`, và operator precedence giống/khác giữa hai bên.
- Thấy được liên hệ trực tiếp tới các tầng sau: feature engineering (BMI = weight / height²), đa thức, hàm số, gradient.

## Kiến thức tiền đề

- [Lesson 01 — Số và trục số](../lesson-01-numbers/): biết các tập số ℕ, ℤ, ℚ, ℝ; thứ tự; giá trị tuyệt đối.
- Bốn phép toán cơ bản trên số thực (cộng, trừ, nhân, chia).
- Lũy thừa nguyên dương: $x^2 = x \\cdot x$, $x^3 = x \\cdot x \\cdot x$ (sẽ học kỹ ở Lesson 04).

## 1. Biến là gì?

### 💡 Trực giác trước định nghĩa

Trước khi học định nghĩa hình thức, hãy hình dung:

> **Biến giống như một cái hộp có dán nhãn.** Trên nhãn là tên (vd $x$), bên trong hộp là một con số. Lúc viết công thức, ta nói chuyện với cái nhãn ($2x + 3$). Lúc tính toán cụ thể, ta mở hộp ra lấy số bên trong và thay vào.

Một analogy khác: **biến là chỗ trống trong câu**. "Diện tích hình vuông cạnh ___ là ___²" — hai chỗ trống. Nếu ta đặt tên chỗ trống là $a$, thì câu thành "diện tích hình vuông cạnh $a$ là $a^2$". Tên $a$ chỉ đóng vai trò "chỉ về cùng một con số trong hai chỗ trống".

### Vấn đề đặt ra

Khi ta nói "diện tích hình vuông cạnh 3 là 9", "diện tích hình vuông cạnh 5 là 25", "diện tích hình vuông cạnh 7 là 49"... ta lặp lại cùng một câu rất nhiều lần, chỉ thay đúng một con số. Có cách nào nói **một lần** cho **mọi cạnh** không?

Có: dùng một ký hiệu — gọi tạm là $a$ — đại diện cho cạnh. Khi đó:

> Diện tích hình vuông cạnh $a$ là $a^2$.

Một câu duy nhất, đúng cho mọi giá trị của $a$. Ký hiệu $a$ ở đây gọi là **biến (variable)**.

### Bốn ví dụ về biến trong các vai trò khác nhau

Để thấy "biến" không phải một thứ đơn nhất, xét bốn câu sau, mỗi câu dùng biến theo một kiểu:

1. **Biến chưa biết (cần tìm)**: "Tìm $x$ sao cho $2x + 3 = 11$". Ở đây $x$ là một con số cụ thể đang nấp đâu đó — nhiệm vụ của ta là moi nó ra (đáp án: $x = 4$).
2. **Biến tổng quát (đúng với mọi)**: "Với mọi số thực $n$, ta có $n^2 \\geq 0$". Ở đây $n$ không phải một số cụ thể — câu này khẳng định luật đúng cho **mọi** lựa chọn của $n$.
3. **Biến phụ thuộc (thay đổi theo)**: "Cho $y = 3x - 1$. Khi $x$ chạy từ $0$ đến $5$ thì $y$ chạy từ $-1$ đến $14$". Ở đây $x$ là biến độc lập (input), $y$ là biến phụ thuộc (output).
4. **Biến chỉ số (đếm)**: "Tổng $S = a_1 + a_2 + \\cdots + a_n$". Ở đây $i$ (trong $a_i$) là chỉ số đếm — nó chỉ nhận giá trị nguyên $1, 2, \\ldots, n$.

### Định nghĩa

**Biến** là một ký hiệu (thường là chữ cái) đại diện cho một số. Số đó có thể:

- **Chưa biết** — ta cần tìm ra (vd. $x$ trong $2x + 3 = 7$).
- **Tổng quát** — đại diện cho "bất kỳ số nào" trong một quy luật (vd. $n$ trong $n^2 \\geq 0$ đúng với mọi $n$ thực).
- **Thay đổi được** — như trong hàm số $y = f(x)$, khi $x$ thay đổi thì $y$ cũng thay đổi.

### Hằng (constant)

**Hằng** là một số cố định, giá trị không thay đổi. Có hai loại hằng phổ biến:

| Loại | Ví dụ | Ghi chú |
|------|-------|---------|
| Hằng số cụ thể | $3$, $-7.5$, $\\pi \\approx 3.14159$, $e \\approx 2.71828$ | Giá trị biết rõ. |
| Tham số (parameter) | $a$, $b$, $c$ trong $ax^2 + bx + c$ | Cố định trong một bài toán nhưng có thể khác giữa các bài. |

> **Tham số là gì?** Hơi rối: tham số là biến hay hằng? Câu trả lời: **tùy ngữ cảnh**. Khi ta viết "phương trình bậc 2 tổng quát $ax^2 + bx + c = 0$", thì $a, b, c$ là tham số — cố định trong **một** phương trình cụ thể, nhưng đại diện cho "bất kỳ phương trình bậc 2 nào". Còn $x$ là biến — cái cần tìm. Mỗi khi giải một bài cụ thể như $2x^2 - 3x + 1 = 0$, ta gán $a = 2, b = -3, c = 1$, lúc đó chúng thành hằng số.

### Quy ước đặt tên (rất phổ biến, không bắt buộc)

| Chữ | Vai trò điển hình |
|-----|-------------------|
| $x, y, z$ | Biến chưa biết, cần tìm; hoặc tọa độ điểm. |
| $a, b, c, d$ | Tham số, hệ số. |
| $i, j, k, n, m$ | Chỉ số nguyên (index), số nguyên. |
| $t$ | Thời gian. |
| $\\theta, \\alpha, \\beta, \\gamma$ | Góc. |
| $f, g, h$ | Hàm số. |

Hai biểu thức $2x + 3$ và $2a + 3$ hoàn toàn giống nhau về mặt toán học — chỉ khác cách quen mắt. Nhưng nếu bạn thấy $a, b, c$ đi kèm với một $x$, gần như chắc chắn $x$ là cái cần tìm.

### Bốn ví dụ khác về sự khác biệt giữa biến và hằng

Để khắc sâu sự khác nhau, xét bốn câu sau:

1. **$C = 2\\pi r$** (chu vi đường tròn): $\\pi$ là **hằng số toàn cầu** ($\\approx 3.14159$). $r$ là **biến** (bán kính từng đường tròn khác nhau). $C$ là **biến phụ thuộc** (tính ra từ $r$). Số $2$ là **hằng số cụ thể** xuất hiện do hình học.

2. **$E = mc^2$** (Einstein): $c$ là **hằng số vật lý** (tốc độ ánh sáng $\\approx 3 \\cdot 10^8$ m/s). $m$ là **biến** (khối lượng vật khác nhau). $E$ là **biến phụ thuộc**.

3. **$y = ax + b$** (đường thẳng tổng quát): $a, b$ là **tham số** (cố định cho một đường thẳng, khác giữa các đường thẳng). $x$ là **biến độc lập**. $y$ là **biến phụ thuộc**. Khi học cụ thể đường $y = 2x + 5$, lúc đó $a = 2, b = 5$ thành hằng.

4. **$F = G \\cdot m_1 \\cdot m_2 / r^2$** (lực hấp dẫn): $G$ là **hằng số vũ trụ** ($\\approx 6.674 \\cdot 10^{-11}$). $m_1, m_2, r$ là **biến** (khác nhau cho từng cặp vật).

Nhận xét: ranh giới biến/hằng không cố định — nó phụ thuộc câu hỏi đang đặt ra. Khi đo lực hấp dẫn của một cặp vật cố định nhưng thay đổi khoảng cách, $m_1, m_2$ thành hằng, chỉ $r$ là biến.

### ❓ Câu hỏi tự nhiên

**Q1: Sao một số trường hợp dùng $n$, một số trường hợp dùng $x$? Hai cái có khác nhau không?**
Không khác về mặt toán học — đều là biến. Khác về **gợi ý ngữ cảnh**:
- $n$ thường gợi ý "số nguyên" (như $n!$, $2^n$, "với mọi $n \\in \\mathbb{N}$").
- $x$ thường gợi ý "số thực, biến chính" (như $f(x)$, $x \\in \\mathbb{R}$).
Đây chỉ là quy ước giúp người đọc đoán nhanh, không phải luật.

**Q2: Một biến có thể đại diện cho nhiều số cùng lúc không?**
Không trong **một** biểu thức/phương trình. Nếu $x = 3$ trong câu này thì mọi $x$ xuất hiện trong câu đó đều là $3$. Khi nói "phương trình $x^2 = 4$ có hai nghiệm $x = 2$ và $x = -2$", nghĩa là có hai cách gán $x$ khác nhau làm phương trình đúng — chứ không phải $x$ "đồng thời" bằng cả hai.

**Q3: Tại sao toán học dùng chữ cái thay vì biểu tượng riêng như ⬜ hay ?**
Vì chữ cái dễ viết tay, dễ phân biệt khi có nhiều biến cùng lúc (so với việc vẽ nhiều cái ô vuông giống nhau), và đã có truyền thống từ thời Viète (thế kỷ 16). Nhưng về bản chất, $⬜ + 3 = 7$ và $x + 3 = 7$ là **cùng một thứ**.

**Q4: Hằng số $\\pi$ và biến $x$ đều là chữ cái — sao biết cái nào là hằng cái nào là biến?**
$\\pi$ là **hằng số có giá trị cố định toàn cầu** ($\\approx 3.14159\\ldots$) — không ai gán lại $\\pi = 5$ được. $x$ là biến — gán giá trị nào cũng được. Quy ước: một số chữ cái Hy Lạp như $\\pi, e, i$ (đơn vị ảo) đã được "khóa" làm hằng. Còn $x, y, z, a, b, c, n, t, \\theta\\ldots$ thì tự do.

**Q5: Khi viết $x = 5$, đây có phải là một biểu thức không?**
Không. Có dấu $=$, nó là một **mệnh đề** (statement) — hoặc là **gán giá trị** (như trong lập trình) hoặc là **phương trình** (yêu cầu tìm $x$). Biểu thức không có dấu $=$. Phân biệt: $x + 5$ là biểu thức; $x + 5 = 10$ là phương trình; "đặt $x = 5$ rồi tính $x + 5$" là quy trình đánh giá.

**Q6: Tại sao trong $2x + 3$ chỉ có một biến mà nói "biểu thức một biến"? Số $2$ và $3$ cũng là "thứ thay đổi được" mà?**
Không, $2$ và $3$ ở đây là **hằng số cụ thể đã viết ra rồi**. Chúng không "thay đổi" — chỉ có $x$ mới có khả năng nhận nhiều giá trị khác nhau khi đánh giá. Phân biệt với $ax + b$: ở đó $a, b$ là **tham số** (có thể thay đổi giữa các bài toán) nhưng trong từng bài cụ thể vẫn là một số xác định.

### ⚠ Lỗi thường gặp

- **Quên rằng cùng tên = cùng giá trị**: Trong $x^2 + x$, hai chữ $x$ là **cùng một số**. Không thể có $x^2 + x$ nghĩa là $3^2 + 5$.
- **Đặt tên biến trùng với đại lượng cố định**: Viết $e = ax + b$ rồi sau đó dùng $e \\approx 2.718$ — gây nhầm vì $e$ đã là hằng cơ số tự nhiên. Chọn tên khác.
- **Dùng $O$ hoặc $l$ làm tên biến viết tay**: nhầm với số $0$ và số $1$. Tránh.
- **Đổi tên biến giữa chừng**: Mở bài bằng "đặt số cần tìm là $x$", giải nửa bài lại đổi thành $n$. Sai — phải nhất quán trong cùng một bài toán.
- **Nhầm biến với tên file/cột dữ liệu**: Trong code, một "biến" có thể chứa cả một mảng hay một bảng. Trong toán phổ thông, "biến" luôn là **một số**. Khi qua tới đại số tuyến tính (Lesson 03), ta mới có "biến" là vector/ma trận.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Trong câu "tổng ba số liên tiếp bằng 30, tìm số nhỏ nhất", nếu đặt số nhỏ nhất là $x$ thì ba số là gì? Vai trò của $x$?</summary>

Ba số là $x, x+1, x+2$. $x$ ở đây là **biến chưa biết (cần tìm)** — sẽ ra $x = 9$ (vì $x + (x+1) + (x+2) = 3x + 3 = 30$).
</details>

<details>
<summary>2. Trong công thức diện tích tam giác $S = \\frac{1}{2} \\cdot a \\cdot h$, đâu là biến, đâu là hằng?</summary>

Không có cái nào là "hằng tuyệt đối" trong công thức tổng quát. $a$ (cạnh đáy) và $h$ (chiều cao) là **biến**: tam giác khác nhau thì giá trị khác nhau. $\\frac{1}{2}$ là **hằng số cụ thể**. $S$ là **biến phụ thuộc** — giá trị của nó được tính ra từ $a, h$.
</details>

### 📝 Tóm tắt mục 1

- **Biến** = ký hiệu (thường chữ cái) đại diện cho một số. Vai trò: chưa biết (cần tìm), tổng quát (đúng với mọi), phụ thuộc (thay đổi theo input), hoặc chỉ số (đếm).
- **Hằng** = số cố định. Có hằng số cụ thể ($3$, $\\pi$) và **tham số** (cố định trong một bài, đại diện trong nhiều bài).
- Quy ước: $x, y, z \\to$ biến chính; $a, b, c \\to$ tham số/hệ số; $i, j, k, n \\to$ chỉ số nguyên.
- Cùng một biến trong cùng một biểu thức = cùng một giá trị.

## 2. Biểu thức đại số

### 💡 Trực giác

> **Biểu thức đại số = một công thức nấu ăn.** Bạn đưa vào nguyên liệu (giá trị của các biến), thực hiện theo các bước (phép toán), và nhận được một món (một con số). Cùng một công thức $2x + 3$ với input khác nhau cho output khác nhau, nhưng quy trình thì cố định.

Một ẩn dụ khác: **biểu thức = một cái máy tính bỏ túi có nhiều nút input chưa bấm**. Ấn các giá trị vào, máy nhả ra một số.

### Định nghĩa

**Biểu thức đại số** là một dãy ký hiệu kết hợp giữa số, biến, và các phép toán ($+$, $-$, $\\times$, $\\div$, lũy thừa, căn, ngoặc...) — sao cho khi thay tất cả biến bằng số cụ thể, ta tính ra được **một** giá trị.

Ví dụ là biểu thức:

- $7$ (chỉ một số cũng là biểu thức)
- $x$
- $2x + 3$
- $x^2 - 5x + 6$
- $\\frac{a + b}{a - b}$ (với điều kiện $a \\neq b$)
- $\\sqrt{x^2 + y^2}$
- $3xy - 2x^2y + 5$

Ví dụ **không** là biểu thức (mà là phương trình hoặc bất phương trình):

- $2x + 3 = 7$ — có dấu $=$, đây là **phương trình (equation)**.
- $x^2 < 4$ — có dấu $<$, đây là **bất phương trình (inequality)**.

### Biểu thức vs phương trình — phân biệt ngay

| | Biểu thức | Phương trình |
|---|-----------|--------------|
| Có dấu $=$? | Không | Có |
| Có "giải" được không? | Không, chỉ "đánh giá" hoặc "đơn giản hóa". | Có, tìm giá trị biến làm hai vế bằng nhau. |
| Ví dụ | $2x + 3$ | $2x + 3 = 7$ |
| Kết quả | Một biểu thức khác (đã rút gọn) hoặc một số (nếu thay giá trị). | Một (hoặc nhiều, hoặc không) giá trị của biến. |

> **Nhầm phổ biến**: nói "giải biểu thức $2x + 3$". Sai. Phải nói "đơn giản hóa biểu thức $2x + 3$" (không làm gì được vì đã đơn giản nhất rồi) hoặc "đánh giá biểu thức tại $x = 5$" (ra $13$).

### Hạng tử (term) — đơn vị cấu thành biểu thức

Một biểu thức là tổng/hiệu của các **hạng tử**. Mỗi hạng tử là một tích của:

- Một **hệ số (coefficient)** — phần số.
- Một hoặc nhiều biến với lũy thừa nguyên không âm (ở mức phổ thông).

Ví dụ với biểu thức $3x^2y - 5xy + 7x - 2$:

| Hạng tử | Hệ số | Phần biến |
|---------|-------|-----------|
| $3x^2y$ | $3$ | $x^2y$ |
| $-5xy$ | $-5$ | $xy$ |
| $7x$ | $7$ | $x$ |
| $-2$ | $-2$ | (không có biến — hạng tử tự do) |

**Hạng tử đồng dạng (like terms)** = các hạng tử có **phần biến giống hệt nhau**. Vd: $3x^2y$ và $-7x^2y$ đồng dạng; còn $3x^2y$ và $3xy^2$ **không** đồng dạng (khác về $x^2, y^2$).

### Bốn ví dụ phân tách hạng tử (luyện mắt)

Hãy nhìn các biểu thức sau và xác định các hạng tử, hệ số:

**Ví dụ 1**: $4x^3 - 7x + 2$
- Hạng tử 1: $4x^3$ (hệ số $4$, biến $x^3$)
- Hạng tử 2: $-7x$ (hệ số $-7$, biến $x$)
- Hạng tử 3: $2$ (hằng tự do)

**Ví dụ 2**: $-x^2y + 3xy^2 - 5$
- Hạng tử 1: $-x^2y$ (hệ số $-1$ — viết ẩn, biến $x^2y$)
- Hạng tử 2: $3xy^2$ (hệ số $3$, biến $xy^2$)
- Hạng tử 3: $-5$
- Lưu ý: $-x^2y$ và $3xy^2$ **không** đồng dạng (lũy thừa của $x, y$ đảo nhau).

**Ví dụ 3**: $\\frac{1}{2}x - \\frac{3}{4}x + x$
- Cả ba hạng tử đều có biến $x$ → đồng dạng → gom được: $\\left(\\frac{1}{2} - \\frac{3}{4} + 1\\right)x = \\left(\\frac{2}{4} - \\frac{3}{4} + \\frac{4}{4}\\right)x = \\frac{3}{4}x$.

**Ví dụ 4**: $5ab + 5ba - 2ab$
- $ab$ và $ba$ là cùng phần biến (phép nhân giao hoán). Cả ba đồng dạng → $(5 + 5 - 2)ab = 8ab$.

**Ví dụ 5** (luyện thêm): $7x^2y^3 - 2x^2y^3 + 4x^3y^2 - x^3y^2$
- Hai cặp đồng dạng tách riêng:
  - $7x^2y^3$ và $-2x^2y^3$ → $(7 - 2)x^2y^3 = 5x^2y^3$.
  - $4x^3y^2$ và $-x^3y^2$ → $(4 - 1)x^3y^2 = 3x^3y^2$.
- Kết quả: $5x^2y^3 + 3x^3y^2$. **Không** gộp tiếp được vì lũy thừa của $x, y$ khác nhau.

**Ví dụ 6** (chú ý dấu): $-3x - 5 - (-2x) - (-7) + x$
- Mở ngoặc: $-3x - 5 + 2x + 7 + x$.
- Hạng tử $x$: $-3x + 2x + x = 0x = 0$.
- Hạng tử tự do: $-5 + 7 = 2$.
- Kết quả: $2$. Một biểu thức trông phức tạp rút gọn thành một hằng số.

### ❓ Câu hỏi tự nhiên

**Q1: $3x^2y$ và $3yx^2$ có là đồng dạng không?**
Có, phần biến giống nhau (chỉ khác thứ tự viết). Ta luôn quy ước viết biến theo thứ tự bảng chữ cái: $x^2y$ chứ không $yx^2$.

**Q2: $3x$ và $3x^1$ có khác nhau không?**
Không. $x^1 = x$. Quy ước: lũy thừa $1$ không viết.

**Q3: Hạng tử "tự do" (constant) như $-2$ có "đồng dạng" với hạng tử tự do khác như $5$ không?**
Có — chúng cùng có "phần biến" rỗng. $-2 + 5 = 3$. Gom các hằng số luôn được.

**Q4: Phân số như $x/3$ có phải hạng tử không? Hệ số là gì?**
Có. $x/3 = \\frac{1}{3}x$ → hệ số là $\\frac{1}{3}$, biến là $x$.

**Q5: Tại sao gọi $2x$ và $3y$ là "hạng tử" mà không gọi là "biểu thức"? Chúng cũng là biểu thức mà?**
Một hạng tử **đứng riêng** cũng là một biểu thức (đơn giản nhất). "Hạng tử" là khái niệm **vai trò trong tổng** — khi ta nhìn $2x + 3y + 5$ như một tổng, ba thành phần $2x$, $3y$, $5$ mỗi cái là một hạng tử. Cùng một thứ $2x$: nếu đứng một mình, gọi là biểu thức; nếu nằm trong tổng, gọi là hạng tử của tổng đó.

**Q6: Biểu thức có "đẹp" hơn / "xấu" hơn không? Vd $2x + 6$ và $2(x+3)$ cái nào "tốt" hơn?**
Hai dạng cùng một biểu thức, **bằng nhau với mọi $x$**. "Tốt" tùy mục đích:
- Muốn **tính nhanh** với một $x$ cụ thể → $2(x+3)$ (1 cộng + 1 nhân).
- Muốn **đọc bậc và hệ số** → $2x + 6$ (rõ là đa thức bậc 1, hệ số 2, hằng tự do 6).
- Muốn **giải phương trình $= 0$** → $2(x+3) = 0 \\iff x = -3$ (dạng nhân tử ngay đáp án).
Dạng tốt phụ thuộc câu hỏi đang đặt.

### ⚠ Lỗi thường gặp

- **Nhầm biểu thức với phương trình**: thấy $f(x) = 2x + 3$ rồi bắt đầu "giải tìm $x$". Sai — đây là **định nghĩa hàm**, không phải phương trình cần giải.
- **Bỏ quên dấu của hạng tử**: trong $3x - 5y$, hạng tử thứ hai là $-5y$ (mang dấu trừ), không phải $5y$. Khi sao chép phải giữ nguyên dấu.
- **Coi $3x^2y$ và $3x^2$ là đồng dạng**: sai, một cái có biến $y$, một cái không. Phần biến phải **giống hệt** mới đồng dạng.
- **Gom nhầm khi có lũy thừa lẫn lộn**: viết $x^2 + x = x^3$ hoặc $= 2x$ đều sai. $x^2$ và $x$ **không** đồng dạng — không cộng được. Phải để nguyên $x^2 + x$ (hoặc đặt nhân tử chung $x(x+1)$, không phải "gom").
- **Nhầm $2x$ với $x + x$ vs $x^2$**: $2x = x + x$ (cộng hai lần), nhưng $x^2 = x \\cdot x$ (nhân). Vd $x = 3$: $2x = 6$, $x^2 = 9$. Rất hay nhầm khi mới học.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Liệt kê các hạng tử và hệ số của $-2x^3 + x^2 - x + 7$.</summary>

| Hạng tử | Hệ số | Biến |
|---------|-------|------|
| $-2x^3$ | $-2$ | $x^3$ |
| $x^2$ | $1$ | $x^2$ |
| $-x$ | $-1$ | $x$ |
| $7$ | $7$ | (tự do) |
</details>

<details>
<summary>2. Trong các cặp sau, cặp nào đồng dạng? (a) $5x^2$ và $5x^3$; (b) $-ab^2$ và $7b^2a$; (c) $3xy$ và $3y$; (d) $2$ và $-9$.</summary>

(a) Không (khác lũy thừa). (b) **Có** ($ab^2 = b^2a$, cùng phần biến). (c) Không (thiếu $x$ ở vế thứ hai). (d) Có (cùng là hằng tự do).
</details>

### 📝 Tóm tắt mục 2

- **Biểu thức** = công thức kết hợp số, biến, phép toán; thay biến bằng số thì ra một số duy nhất.
- **Phương trình** = hai biểu thức nối nhau bằng $=$; có thể "giải" để tìm biến.
- **Hạng tử** = một tích "hệ số $\\times$ phần biến", phân tách nhau bằng $+$/$-$.
- **Đồng dạng** = phần biến giống hệt; chỉ gom được hạng tử đồng dạng.

## 3. Đánh giá biểu thức (evaluation)

### 💡 Trực giác

Quay lại analogy "biểu thức = công thức nấu ăn". **Đánh giá** = thực sự nấu món ăn đó. Bạn cầm trên tay nguyên liệu cụ thể (giá trị $x = 3$), bỏ vào công thức ($2x + 3$), và món xong là một con số ($9$).

Khi đánh giá, ta đi từ **mô tả trừu tượng** ($2x + 3$) sang **kết quả cụ thể** ($9$). Cùng công thức, ba người nấu (ba giá trị $x$ khác nhau) sẽ ra ba món khác nhau.

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

1. **Nhân và chia cùng cấp**, thực hiện từ trái sang phải. $8 \\div 4 \\times 2 = (8 \\div 4) \\times 2 = 2 \\times 2 = 4$, **không** phải $8 \\div (4 \\times 2) = 1$.
2. **Cộng và trừ cũng cùng cấp**, làm từ trái sang phải. $10 - 3 + 2 = (10 - 3) + 2 = 9$, **không** phải $10 - (3 + 2) = 5$.

### Walk-through: tính 2x² + 3x − 1 với x = -2

$$\\begin{aligned}
\\text{Bước 1 (thay } x = -2): \\quad & 2 \\cdot (-2)^2 + 3 \\cdot (-2) - 1 \\\\[4pt]
\\text{Bước 2 (lũy thừa, E): } \\quad & (-2)^2 = 4 \\;\\to\\; 2 \\cdot 4 + 3 \\cdot (-2) - 1 \\\\[4pt]
\\text{Bước 3 (nhân, M): } \\quad & 2 \\cdot 4 = 8,\\; 3 \\cdot (-2) = -6 \\;\\to\\; 8 + (-6) - 1 \\\\[4pt]
\\text{Bước 4 (cộng/trừ, AS): } \\quad & 8 + (-6) = 2,\\; 2 - 1 = 1 \\\\[4pt]
\\text{Kết quả: } \\quad & 1
\\end{aligned}$$

> **Câu hỏi tự nhiên**: tại sao phải bọc ngoặc $(-2)^2$? Vì nếu viết $-2^2$ thì theo quy tắc, lũy thừa làm trước dấu trừ đơn (unary minus): $-2^2 = -(2^2) = -4$. Còn $(-2)^2 = 4$. Khi thay số âm vào biến, **luôn** bọc ngoặc để tránh nhầm.

### Bảng đánh giá f(x) = 2x² + 3x − 1

| $x$ | $2x^2$ | $3x$ | $2x^2 + 3x - 1$ |
|-----|-------|------|----------------|
| $-2$ | $2 \\cdot 4 = 8$  | $-6$ | $8 - 6 - 1 = 1$ |
| $-1$ | $2 \\cdot 1 = 2$  | $-3$ | $2 - 3 - 1 = -2$ |
| $0$  | $0$        | $0$  | $0 + 0 - 1 = -1$ |
| $1$  | $2 \\cdot 1 = 2$  | $3$  | $2 + 3 - 1 = 4$ |
| $2$  | $2 \\cdot 4 = 8$  | $6$  | $8 + 6 - 1 = 13$ |

Đây là cách ta sẽ vẽ đồ thị một hàm số sau này (Lesson 06): tính giá trị tại nhiều $x$, chấm lên mặt phẳng, nối lại.

### Bốn ví dụ đánh giá khác — cấp độ tăng dần

**Ví dụ 1**: $g(x) = x^2 - 4$ tại $x = 3$.

$$g(3) = 3^2 - 4 = 9 - 4 = 5$$

**Ví dụ 2**: $h(x, y) = 2x + 3y - 1$ tại $x = 4, y = -1$ (hai biến).

$$h(4, -1) = 2 \\cdot 4 + 3 \\cdot (-1) - 1 = 8 - 3 - 1 = 4$$

Lưu ý: với hai biến, ta phải nói rõ giá trị **của từng biến**. Thứ tự thay không quan trọng, miễn là thay đúng giá trị vào đúng biến.

**Ví dụ 3** (có ngoặc): $p(x) = (x + 2)(x - 3)$ tại $x = 5$.

$$\\begin{aligned}
\\text{Cách A — thay vào dạng nhân tử: } \\quad & p(5) = (5+2)(5-3) = 7 \\cdot 2 = 14 \\\\[4pt]
\\text{Cách B — khai triển rồi thay: } \\quad & p(x) = x^2 - x - 6 \\\\[4pt]
& p(5) = 25 - 5 - 6 = 14 \\;\\checkmark
\\end{aligned}$$

Cả hai cách phải ra cùng kết quả — nếu khác là sai. Cách A nhanh hơn khi đã có dạng nhân tử.

**Ví dụ 4** (lồng nhau, dễ sai): $q(x) = -x^2 + 2x - (x - 1)^2$ tại $x = -2$.

- Bước 1: Tính $(x - 1)^2$ tại $x = -2$: $\\;(-2 - 1)^2 = (-3)^2 = 9$.
- Bước 2: Tính $-x^2$ tại $x = -2$: $\\;-(-2)^2 = -(4) = -4$ ← chú ý dấu! KHÔNG phải $(-2)^2 = 4$ rồi đổi dấu sau, mà tính $(-2)^2 = 4$ rồi áp dụng dấu trừ ngoài → $-4$. Tương đương: $-x^2$ nghĩa là $-(x^2)$, không phải $(-x)^2$.
- Bước 3: Tính $2x$ tại $x = -2$: $\\;2 \\cdot (-2) = -4$.
- Bước 4: Cộng tất cả: $\\;q(-2) = -4 + (-4) - 9 = -17$.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Tính $f(x) = 5 - x^2 + 3x$ tại $x = -3$.</summary>

$f(-3) = 5 - (-3)^2 + 3 \\cdot (-3) = 5 - 9 - 9 = -13$. (Chú ý $(-3)^2 = 9$ chứ không phải $-9$.)
</details>

<details>
<summary>2. Vì sao $8 - 3 + 2$ lại là 7 chứ không phải 3? Quy tắc nào áp dụng?</summary>

Cộng và trừ cùng cấp, thực hiện **từ trái sang phải**: $(8 - 3) + 2 = 5 + 2 = 7$. Nếu làm "cộng trước trừ sau" thì sẽ thành $8 - (3+2) = 3$ — đây là **lỗi PEMDAS** rất phổ biến. Quy tắc đúng: M và D ngang cấp; A và S ngang cấp.
</details>

### ⚠ Lỗi thường gặp khi đánh giá

- **Quên bọc ngoặc số âm**: thay $x = -2$ vào $x^2$ mà viết $-2^2$ → ra $-4$ thay vì $4$. Phải viết $(-2)^2$.
- **Tính lũy thừa trên cả dấu trừ đơn**: $-3^2$ ra $-9$ (vì E làm trước, dấu trừ áp dụng sau), không phải $9$. Nếu muốn $9$, viết $(-3)^2$.
- **Bỏ qua phép chia khi gặp phân số**: $6 / 2(1 + 2)$ — viral problem. Theo chuẩn PEMDAS: $1 + 2 = 3$, rồi $6 / 2 = 3$, rồi $3 \\cdot 3 = 9$. Nhưng nhiều người tính $2 \\cdot 3 = 6$ trước rồi $6 / 6 = 1$. Tránh viết biểu thức mập mờ kiểu này — dùng ngoặc rõ.
- **Tính sai dấu sau khi thay**: $f(x) = -x$ tại $x = -3$ → $f(-3) = -(-3) = 3$, không phải $-3$.

### 📝 Tóm tắt mục 3

- **Đánh giá** = thay giá trị vào biến và tính theo PEMDAS.
- Thứ tự: **P**arentheses → **E**xponents → **M**ult/**D**iv (trái→phải) → **A**dd/**S**ub (trái→phải).
- Luôn **bọc ngoặc** khi thay số âm vào biến: $(-2)^2 \\neq -2^2$.
- Lập **bảng giá trị** là cách hệ thống — cũng là bước đầu vẽ đồ thị (Lesson 06).

## 4. Các phép biến đổi cơ bản

### 4.1. Gom hạng tử đồng dạng

### 💡 Trực giác

Hãy nghĩ về tiền: $3$ tờ 1000đ + $5$ tờ 1000đ = $8$ tờ 1000đ. Bạn không cần "biết" 1000đ là gì — chỉ cần đếm số tờ. Tương tự, $3x + 5x = 8x$: ta "đếm" có 8 cái $x$, không quan tâm $x$ là số nào.

Nhưng $3$ tờ 1000đ + $5$ tờ 5000đ thì **không thể** gộp thành "8 tờ ...gì đó" — đơn vị khác nhau. Đó là vì sao $3x + 5y$ không gom được: hai "đơn vị" khác nhau.

**Quy tắc**: cộng/trừ các hạng tử có cùng phần biến bằng cách cộng/trừ hệ số của chúng.

$$\\begin{aligned}
3x + 5x &= (3+5)x = 8x \\\\[4pt]
7y - 2y &= (7-2)y = 5y \\\\[4pt]
4x^2y - x^2y &= (4-1)x^2y = 3x^2y \\\\[4pt]
2x + 3y \\;&\\text{— KHÔNG gom được, khác phần biến.} \\\\[4pt]
2x^2 + 3x \\;&\\text{— KHÔNG gom được, khác lũy thừa của } x.
\\end{aligned}$$

**Tại sao quy tắc này đúng?** Vì nó chính là tính chất phân phối ngược: $3x + 5x = (3+5) \\cdot x$ (rút $x$ ra ngoài). Mọi phép biến đổi đại số đều xoay quanh phân phối — sẽ thấy ở 4.2.

### Bốn ví dụ gom hạng tử

**Ví dụ 1** (đơn giản): $8a - 3a + 2a = (8 - 3 + 2)a = 7a$.

**Ví dụ 2** (nhiều loại hạng tử): $3x + 5 - 2x + 7 - x$.
- Gom $x$: $3x - 2x - x = (3 - 2 - 1)x = 0x = 0$.
- Gom tự do: $5 + 7 = 12$.
- Kết quả: $12$.

**Ví dụ 3** (đa biến): $2ab + 3a - ab + 4b - ab$.
- Gom $ab$: $2ab - ab - ab = (2 - 1 - 1)ab = 0$.
- Còn $3a$ và $4b$ — khác phần biến, không gom được.
- Kết quả: $3a + 4b$.

**Ví dụ 4** (hệ số phân số): $\\frac{2}{3}x + \\frac{1}{4}x - \\frac{1}{6}x$.
- Quy đồng: mẫu chung 12 → $\\left(\\frac{8}{12} + \\frac{3}{12} - \\frac{2}{12}\\right)x = \\frac{9}{12}x = \\frac{3}{4}x$.
- Kết quả: $\\frac{3}{4}x$.

### ❓ Câu hỏi tự nhiên về gom hạng tử

**Q: Sao không thể "gom" $x^2 + x$ thành gì đó gọn hơn?**
Vì $x^2$ và $x$ là hai "loại" khác nhau (như tờ tiền khác mệnh giá). Vd $x = 3$: $x^2 + x = 9 + 3 = 12$. Nếu cứ ép gộp thành $x^3$ thì $x^3 = 27 \\neq 12$ — sai. Có thể **đặt nhân tử chung** $x(x+1)$ (xem 4.4), nhưng đó không phải "gom".

**Q: $3x^2 + 3x$ có gom được không?**
Không (vì khác lũy thừa). Nhưng **đặt nhân tử chung** được: $3x^2 + 3x = 3x(x + 1)$. Hai phép khác nhau: gom là cộng số tờ cùng loại; đặt nhân tử chung là rút phần chung ra ngoài.

### ⚠ Lỗi thường gặp khi gom

- **Cộng hệ số quên dấu**: $5x - 7x + 2x = (5 - 7 + 2)x = 0$. Nhiều bạn viết $(5 + 7 + 2)x = 14x$ — quên dấu trừ.
- **Cố gom khác lũy thừa**: $x^2 + x = 2x^2$ hoặc $= x^3$ đều sai.
- **Quên hạng tử có hệ số ẩn**: $x^3 - x^3 = 0$, không phải $x^3$. Khi không có số đứng trước, hệ số là $1$ (hoặc $-1$ nếu có dấu trừ).

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Rút gọn $4x - 2y + 3x + y - 5x$.</summary>

$x$: $4x + 3x - 5x = 2x$. $y$: $-2y + y = -y$. Kết quả: $2x - y$.
</details>

<details>
<summary>2. Rút gọn $a^2b - 2ab^2 + 3a^2b + ab^2$.</summary>

$a^2b$: $1 + 3 = 4$ → $4a^2b$. $ab^2$: $-2 + 1 = -1$ → $-ab^2$. Kết quả: $4a^2b - ab^2$.
</details>

### 4.2. Nhân phân phối (distributive law)

### 💡 Trực giác hình học

Hình dung một hình chữ nhật cạnh $a$ và cạnh $b + c$. Diện tích = $a \\cdot (b + c)$. Bây giờ chia hình chữ nhật thành hai phần theo chiều rộng:

\`\`\`
       b           c
    ┌─────┬───────────┐
  a │  ab │    ac     │
    └─────┴───────────┘

    Tổng diện tích = ab + ac
\`\`\`

Cả hai cách tính phải ra cùng kết quả → $a(b + c) = ab + ac$. Đây không phải "quy tắc trời ơi" — nó là cách đếm diện tích bằng hai góc nhìn khác nhau.

**Kiểm tra bằng số**:
- $5 \\cdot (3 + 4) = 5 \\cdot 7 = 35$.
- $5 \\cdot 3 + 5 \\cdot 4 = 15 + 20 = 35$. ✓
- $2 \\cdot (x + 3)$ khi $x = 7$ → $2 \\cdot 10 = 20$, và $2 \\cdot 7 + 2 \\cdot 3 = 14 + 6 = 20$. ✓
- $(-4) \\cdot (2 + 5) = -4 \\cdot 7 = -28$, và $(-4) \\cdot 2 + (-4) \\cdot 5 = -8 + (-20) = -28$. ✓

**Quy tắc**: $a(b + c) = ab + ac$ và $(b + c)a = ba + ca$.

Mở rộng cho nhiều hạng tử: $a(b + c + d) = ab + ac + ad$.

Walk-through cụ thể:

$$\\begin{aligned}
3(x + 4) &= 3 \\cdot x + 3 \\cdot 4 = 3x + 12 \\\\[4pt]
-2(x - 5) &= (-2) \\cdot x + (-2) \\cdot (-5) = -2x + 10 \\\\[4pt]
x(x + 3) &= x \\cdot x + x \\cdot 3 = x^2 + 3x \\\\[4pt]
(2x - 1) \\cdot 5 &= 5 \\cdot 2x + 5 \\cdot (-1) = 10x - 5
\\end{aligned}$$

> **Lưu ý dấu trừ**: $-(x - 3)$ được hiểu là $(-1) \\cdot (x - 3) = -x + 3$. Đổi dấu **tất cả** các hạng tử trong ngoặc, không chỉ hạng tử đầu.

**Nhân hai biểu thức trong ngoặc**: phân phối hai lần (FOIL = First, Outer, Inner, Last):

\`\`\`
(a + b)(c + d) = a·c + a·d + b·c + b·d
                  ↑      ↑      ↑      ↑
                First  Outer  Inner  Last
\`\`\`

Walk-through $(2x + 3)(x - 4)$:

$$\\begin{aligned}
\\text{F: } & 2x \\cdot x = 2x^2 \\\\[4pt]
\\text{O: } & 2x \\cdot (-4) = -8x \\\\[4pt]
\\text{I: } & 3 \\cdot x = 3x \\\\[4pt]
\\text{L: } & 3 \\cdot (-4) = -12 \\\\[4pt]
\\text{Tổng: } & 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12
\\end{aligned}$$

### Bốn ví dụ khai triển bằng FOIL

**Ví dụ 1**: $(x + 5)(x + 2)$

$$\\begin{aligned}
\\text{F: } & x \\cdot x = x^2 \\\\[4pt]
\\text{O: } & x \\cdot 2 = 2x \\\\[4pt]
\\text{I: } & 5 \\cdot x = 5x \\\\[4pt]
\\text{L: } & 5 \\cdot 2 = 10 \\\\[4pt]
\\text{Tổng: } & x^2 + 7x + 10
\\end{aligned}$$

**Ví dụ 2**: $(3x - 2)(x + 4)$

$$\\begin{aligned}
\\text{F: } & 3x \\cdot x = 3x^2 \\\\[4pt]
\\text{O: } & 3x \\cdot 4 = 12x \\\\[4pt]
\\text{I: } & -2 \\cdot x = -2x \\\\[4pt]
\\text{L: } & -2 \\cdot 4 = -8 \\\\[4pt]
\\text{Tổng: } & 3x^2 + 10x - 8
\\end{aligned}$$

**Ví dụ 3** (cả hai cùng âm): $(-x - 1)(x - 3)$

$$\\begin{aligned}
\\text{F: } & (-x) \\cdot x = -x^2 \\\\[4pt]
\\text{O: } & (-x) \\cdot (-3) = 3x \\\\[4pt]
\\text{I: } & (-1) \\cdot x = -x \\\\[4pt]
\\text{L: } & (-1) \\cdot (-3) = 3 \\\\[4pt]
\\text{Tổng: } & -x^2 + 3x - x + 3 = -x^2 + 2x + 3
\\end{aligned}$$

Kiểm bằng $x = 0$: gốc $(-1)(-3) = 3$; kết quả $0 + 0 + 3 = 3$. ✓

**Ví dụ 4** (hệ số phân số): $\\left(\\frac{x}{2} + 1\\right)(x - 2)$

$$\\begin{aligned}
\\text{F: } & \\frac{x}{2} \\cdot x = \\frac{x^2}{2} \\\\[4pt]
\\text{O: } & \\frac{x}{2} \\cdot (-2) = -x \\\\[4pt]
\\text{I: } & 1 \\cdot x = x \\\\[4pt]
\\text{L: } & 1 \\cdot (-2) = -2 \\\\[4pt]
\\text{Tổng: } & \\frac{x^2}{2} - x + x - 2 = \\frac{x^2}{2} - 2
\\end{aligned}$$

Hai hạng tử $-x$ và $+x$ triệt tiêu — tình huống thường gặp.

### ❓ Câu hỏi tự nhiên về phân phối

**Q: FOIL có dùng được cho $(a + b + c)(d + e)$ không?**
Tinh thần vẫn dùng, nhưng "FOIL" chỉ có 4 chữ — không đủ cho 6 cặp tích. Cách an toàn: **phân phối từng hạng tử của ngoặc đầu với cả ngoặc sau**:

$$\\begin{aligned}
(a + b + c)(d + e) &= a(d+e) + b(d+e) + c(d+e) \\\\[4pt]
&= ad + ae + bd + be + cd + ce
\\end{aligned}$$

6 tích cho tích $3 \\times 2$. Tổng quát: $m$ hạng tử $\\times$ $n$ hạng tử → $m \\cdot n$ tích.

**Q: $(a - b)(a + b)$ ra gì? Sao FOIL ra ngay được?**

$$\\begin{aligned}
\\text{F: } & a \\cdot a = a^2 \\\\[4pt]
\\text{O: } & a \\cdot b = ab \\\\[4pt]
\\text{I: } & (-b) \\cdot a = -ab \\\\[4pt]
\\text{L: } & (-b) \\cdot b = -b^2 \\\\[4pt]
\\text{Tổng: } & a^2 + ab - ab - b^2 = a^2 - b^2
\\end{aligned}$$

Hai hạng tử giữa triệt tiêu → ra $a^2 - b^2$. Đây là **hằng đẳng thức hiệu hai bình phương** (xem 4.3).

### ⚠ Lỗi thường gặp với phân phối

- **Quên phân phối toàn bộ**: $3(x + 2) = 3x + 2$ (sai, quên nhân $3$ với $2$). Đúng: $3x + 6$.
- **Sai dấu khi phân phối dấu trừ**: $-(a - b) = -a - b$ (sai). Đúng: $-a + b$. Mọi hạng tử trong ngoặc đổi dấu, kể cả hạng tử đã âm.
- **Nhầm $(a + b)^2 = a^2 + b^2$**: rất phổ biến. Đúng phải có $2ab$ ở giữa. Xem 4.3.
- **FOIL nhưng quên hạng tử trong**: $(x+2)(x+3) = x^2 + 6$ (sai, quên Outer + Inner). Đúng: $x^2 + 5x + 6$.
- **Phân phối mũ**: $(a + b)^2 \\neq a^2 + b^2$. Mũ **không** phân phối trên tổng (chỉ phân phối trên tích: $(ab)^2 = a^2b^2$).

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Khai triển $-2(3x - 5)$.</summary>

$-2 \\cdot 3x + (-2) \\cdot (-5) = -6x + 10$. (Lưu ý dấu trừ áp dụng cho cả $-5$.)
</details>

<details>
<summary>2. Khai triển $(2a - 1)(a + 3)$.</summary>

$2a^2 + 6a - a - 3 = 2a^2 + 5a - 3$. (Hai hạng tử giữa: $+6a$ và $-a$ → $+5a$.)
</details>

### 4.3. Ba hằng đẳng thức đáng nhớ

Đây là **trường hợp đặc biệt** của phân phối hai lần — học thuộc vì gặp hàng ngày:

| Hằng đẳng thức | Khai triển |
|----------------|------------|
| Bình phương tổng | $(a + b)^2 = a^2 + 2ab + b^2$ |
| Bình phương hiệu | $(a - b)^2 = a^2 - 2ab + b^2$ |
| Hiệu hai bình phương | $(a + b)(a - b) = a^2 - b^2$ |

Kiểm tra $(a+b)^2 = a^2 + 2ab + b^2$ bằng FOIL:

$$\\begin{aligned}
(a + b)(a + b) &= a \\cdot a + a \\cdot b + b \\cdot a + b \\cdot b \\\\[4pt]
&= a^2 + ab + ab + b^2 \\\\[4pt]
&= a^2 + 2ab + b^2 \\quad \\checkmark
\\end{aligned}$$

Walk-through với số cụ thể, kiểm bằng tính trực tiếp:

$$\\begin{aligned}
(3 + 4)^2 &= 7^2 = 49 = 3^2 + 2 \\cdot 3 \\cdot 4 + 4^2 = 9 + 24 + 16 = 49 \\quad \\checkmark \\\\[4pt]
(10 - 1)(10 + 1) &= 9 \\cdot 11 = 99 = 10^2 - 1^2 = 100 - 1 = 99 \\quad \\checkmark
\\end{aligned}$$

> **Mẹo tính nhẩm**: $99^2 = (100 - 1)^2 = 10000 - 200 + 1 = 9801$. Hằng đẳng thức không chỉ dùng cho biến mà cho mọi số.

### 💡 Chứng minh hình học (a + b)² = a² + 2ab + b²

Vẽ hình vuông có cạnh $a + b$. Chia cạnh thành đoạn $a$ và đoạn $b$. Hình vuông được chia thành 4 phần:

\`\`\`
        a              b
   ┌──────────┬────────────────┐
   │          │                │
 a │   a²     │      ab        │
   │          │                │
   ├──────────┼────────────────┤
   │          │                │
 b │   ab     │      b²        │
   │          │                │
   └──────────┴────────────────┘
\`\`\`

- Hình vuông lớn cạnh $a+b$ → diện tích $(a+b)^2$.
- Tổng 4 ô: $a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$.
- Hai cách tính cùng diện tích → $(a + b)^2 = a^2 + 2ab + b^2$. ∎

**Vì sao có "$2ab$"?** Vì có **hai ô chữ nhật $ab$** (góc trên phải và góc dưới trái), đều có diện tích $a \\cdot b$. Nếu bạn viết $(a+b)^2 = a^2 + b^2$ (quên $2ab$), bạn đang **bỏ quên hai ô lớn** — sai về cả diện tích lẫn đại số.

Kiểm tra số: $a = 3, b = 4$. Hình vuông cạnh 7 có diện tích 49. Bốn ô: $9 + 12 + 12 + 16 = 49$ ✓.

### 💡 Chứng minh hình học (a − b)² = a² − 2ab + b²

Vẽ hình vuông cạnh $a$. Bên trong, lấy đi một hình vuông cạnh $b$ ở góc, để lại "hình vuông trừ góc". Phần còn lại chia thành 1 hình vuông cạnh $a-b$ cộng 2 hình chữ nhật $(a-b) \\cdot b$... nhưng cách tinh tế hơn:

Xét hình vuông cạnh $a$. Cắt ra hình vuông $(a-b)$ ở một góc:

\`\`\`
       (a−b)           b
   ┌──────────┬──────────────┐
   │          │              │
(a−b)│ (a−b)² │  (a−b)b      │ ← hình vuông (a−b)² + chữ nhật (a−b)b
   │          │              │
   ├──────────┼──────────────┤
   │          │              │
  b │ b(a−b)  │      b²      │ ← chữ nhật b(a−b) + hình vuông b²
   │          │              │
   └──────────┴──────────────┘

Tổng = a² (hình vuông lớn)
\`\`\`

Suy ra $(a-b)^2 = a^2 - 2b(a-b) - b^2 = a^2 - 2ab + 2b^2 - b^2 = a^2 - 2ab + b^2$. ✓

**Kiểm số**: $a = 10, b = 3$. $(10-3)^2 = 49$; $100 - 60 + 9 = 49$. ✓

### 💡 Hiệu hai bình phương (a + b)(a − b) = a² − b²

Vẽ hình vuông cạnh $a$, cắt ra hình vuông nhỏ cạnh $b$ ở góc → còn lại diện tích $a^2 - b^2$ (hình chữ L). Chia hình chữ L này thành 2 chữ nhật và ghép lại thành 1 chữ nhật $(a+b) \\times (a-b)$:

\`\`\`
Trước khi ghép:               Sau khi ghép (xoay miếng dưới):
   a
┌──────────┐                  ┌─────────┬───────┐
│          │ a−b              │         │       │
│  ┌───────┤                  │   a−b   │       │
│  │ b·(a−b)│                 │ (a−b)·a │ (a−b)b│  → tổng cạnh = a+b
│  │       │ b                ├─────────┴───────┤
└──┴───────┘                  
   a−b  b
\`\`\`

Diện tích bảo toàn → $a^2 - b^2 = (a+b)(a-b)$.

**Kiểm số**: $a = 7, b = 2$. $(7+2)(7-2) = 45$; $49 - 4 = 45$. ✓

### Bốn ví dụ khai triển bằng hằng đẳng thức

**Ví dụ 1**: $(x + 4)^2 \\to x^2 + 8x + 16$. ($2 \\cdot x \\cdot 4 = 8x$).

**Ví dụ 2**: $(2x - 3)^2 \\to (2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 - 12x + 9$. (Lưu ý: bình phương cả hệ số $2x \\to 4x^2$.)

**Ví dụ 3**: $(5 + y)(5 - y) \\to 25 - y^2$.

**Ví dụ 4** (chéo): $(x + 3)^2 - (x - 3)^2 = (x^2 + 6x + 9) - (x^2 - 6x + 9) = 12x$. Một biểu thức nhìn có vẻ phức tạp rút gọn rất gọn.

### ❓ Câu hỏi tự nhiên về hằng đẳng thức

**Q: Tại sao học thuộc lòng cả 3 cái, có thể tự khai triển mọi lần được không?**
Có thể, nhưng (a) chậm, (b) dễ sai dấu, (c) khi **đảo ngược** (phân tích nhân tử) thì khó hơn — phải nhận ra pattern. Học thuộc cho phép "nhìn là biết".

**Q: Có hằng đẳng thức nào với bậc 3 không?**
Có nhiều, các phổ biến:
- $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$
- $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$
- $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$
- $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$

Hệ số $1, 3, 3, 1$ đến từ tam giác Pascal. Tổng quát hóa thành **nhị thức Newton** — sẽ gặp ở Lesson 09 (probability).

### ⚠ Lỗi thường gặp với hằng đẳng thức

- **Quên $2ab$**: $(a + b)^2 = a^2 + b^2$ (rất phổ biến, sai). Mỗi lần định viết $(\\ldots)^2$, dừng lại nhớ "$2ab$".
- **Sai dấu trong $(a - b)^2$**: viết $a^2 - 2ab - b^2$ (sai, $b^2$ phải dương). Cách nhớ: dù $b$ âm hay dương, bình phương luôn dương.
- **Nhầm $(a + b)(a - b)$ với $(a - b)^2$**: kết quả khác — một cái triệt tiêu giữa, một cái có $-2ab$.
- **Lạm dụng**: thấy $x^2 + 9$ nghĩ ngay "hiệu hai bình phương ngược lại" → phân tích $(x+3)(x-3)$. Sai — đó là **tổng** hai bình phương, không phân tích được trên ℝ.

### 4.4. Phân tích thành nhân tử (factoring)

### 💡 Trực giác

Phân tích thành nhân tử là **đi ngược lại** việc khai triển. Khai triển = nhân các ngoặc ra → biểu thức dài. Phân tích = nhìn biểu thức dài, đoán ra dạng tích ban đầu.

Ẩn dụ: khai triển là **nướng bánh** (trộn nguyên liệu, ra chiếc bánh hoàn chỉnh). Phân tích là **đoán nguyên liệu** (nhìn chiếc bánh, đoán cô đầu bếp đã dùng gì). Hoạt động khó hơn — vì có nhiều "công thức" có thể cho ra cùng "chiếc bánh".

**Phân tích thành nhân tử** = ngược lại của khai triển. Viết một biểu thức dưới dạng tích của các biểu thức đơn giản hơn.

Ba kỹ thuật cơ bản:

**(a) Đặt nhân tử chung**:

$$\\begin{aligned}
6x + 9 &= 3(2x + 3) &&\\text{(chung là 3)} \\\\[4pt]
x^2 - 5x &= x(x - 5) &&\\text{(chung là } x) \\\\[4pt]
4x^2y - 6xy^2 &= 2xy(2x - 3y) &&\\text{(chung là } 2xy)
\\end{aligned}$$

**(b) Dùng hằng đẳng thức ngược**:

$$\\begin{aligned}
x^2 - 9 &= x^2 - 3^2 = (x - 3)(x + 3) &&\\text{(hiệu hai bình phương)} \\\\[4pt]
x^2 + 6x + 9 &= x^2 + 2 \\cdot x \\cdot 3 + 3^2 = (x + 3)^2 &&\\text{(bình phương tổng)} \\\\[4pt]
x^2 - 10x + 25 &= x^2 - 2 \\cdot x \\cdot 5 + 5^2 = (x - 5)^2 &&\\text{(bình phương hiệu)}
\\end{aligned}$$

**(c) Phân tích tam thức bậc 2** $x^2 + bx + c$: tìm hai số có **tổng** $= b$ và **tích** $= c$, đó là hai nghiệm với dấu đảo lại.

$$\\begin{aligned}
x^2 + 5x + 6:\\;& \\text{tìm hai số có tổng 5, tích 6} \\to 2 \\text{ và } 3 \\to (x + 2)(x + 3) \\\\[4pt]
x^2 - 7x + 12:\\;& \\text{tổng } -7, \\text{ tích 12} \\to -3 \\text{ và } -4 \\to (x - 3)(x - 4) \\\\[4pt]
x^2 + x - 6:\\;& \\text{tổng 1, tích } -6 \\to 3 \\text{ và } -2 \\to (x + 3)(x - 2)
\\end{aligned}$$

### Cách nhìn ra pattern — chiến lược tổng/tích

Với $x^2 + bx + c$:
1. **Liệt kê tất cả cặp số nguyên có tích $= c$**.
2. **Chọn cặp có tổng $= b$**.
3. **Viết ra dạng $(x + p)(x + q)$** với $p, q$ là cặp tìm được.
4. **Kiểm bằng FOIL ngược** (khai triển lại xem có khớp không).

Walk-through 4 ví dụ tăng dần độ khó:

**Ví dụ A** — $x^2 + 7x + 12$:
- Tích $= 12$: cặp dương $(1,12), (2,6), (3,4)$.
- Tổng $= 7$: cặp $(3, 4)$ ✓.
- Kết quả: $(x + 3)(x + 4)$.

**Ví dụ B** — $x^2 - 8x + 15$ (tổng âm, tích dương → cả hai số đều âm):
- Tích $= 15$: cặp $(1,15), (3,5)$ → đảo dấu: $(-1,-15), (-3,-5)$.
- Tổng $= -8$: $-3 + (-5) = -8$ ✓.
- Kết quả: $(x - 3)(x - 5)$.

**Ví dụ C** — $x^2 + 2x - 15$ (tích âm → hai số khác dấu):
- Tích $= -15$: cặp $(1, -15), (-1, 15), (3, -5), (-3, 5)$.
- Tổng $= 2$: $(-3, 5)$ → $-3 + 5 = 2$ ✓.
- Kết quả: $(x - 3)(x + 5)$.

**Ví dụ D** — $2x^2 + 7x + 3$ (hệ số $x^2 \\neq 1$, khó hơn):
- Đặt $2x^2 + 7x + 3 = (2x + p)(x + q)$ (vì $2 = 2 \\cdot 1$).
- Khai triển: $2x^2 + 2qx + px + pq = 2x^2 + (2q + p)x + pq$.
- Cần: $pq = 3$ và $2q + p = 7$.
- Thử $(p, q) = (1, 3)$: $pq = 3 \\;\\checkmark$, $2 \\cdot 3 + 1 = 7 \\;\\checkmark$.
- Kết quả: $(2x + 1)(x + 3)$. Kiểm: $2x^2 + 6x + x + 3 = 2x^2 + 7x + 3$ ✓.

### Quy luật dấu để đoán nhanh

| Dấu của $b$ | Dấu của $c$ | Hai số $(p, q)$ |
|------------|-------------|------------------|
| $+$ | $+$ | Cả hai dương |
| $-$ | $+$ | Cả hai âm |
| $+$ | $-$ | Khác dấu, **số dương lớn hơn về độ lớn** |
| $-$ | $-$ | Khác dấu, **số âm lớn hơn về độ lớn** |

Vd $x^2 + 4x - 21$: $b > 0$, $c < 0$ → cặp khác dấu, dương lớn hơn. Tích $-21$: $(1, -21), (3, -7), (7, -3), (21, -1)$. Tổng 4: $7 + (-3) = 4$ ✓. Kết quả: $(x + 7)(x - 3)$.

### ❓ Câu hỏi tự nhiên về phân tích

**Q: Có biểu thức nào "không phân tích được" không?**
Có. Vd $x^2 + 1$ không phân tích được trên số thực (vì $x^2 + 1 > 0$ mọi $x$, không có nghiệm thực). Trong toán phổ thông, gọi là **bất khả quy** (irreducible) trên ℝ. Trên số phức ℂ thì $x^2 + 1 = (x - i)(x + i)$.

**Q: Khi tìm cặp số mà thử mãi không ra, làm sao biết là bất khả quy hay mình thiếu kiên nhẫn?**
Có công cụ: tính **biệt thức (discriminant)** $\\Delta = b^2 - 4ac$ (cho $ax^2 + bx + c$).
- $\\Delta \\geq 0$ và là số chính phương → phân tích được với hệ số nguyên.
- $\\Delta < 0$ → không phân tích được trên ℝ.
- $\\Delta \\geq 0$ nhưng không là số chính phương → phân tích được, nhưng hệ số là số vô tỷ (dùng công thức nghiệm).

Vd $x^2 + x + 1$: $\\Delta = 1 - 4 = -3 < 0$ → bất khả quy.

**Q: Đặt nhân tử chung trước hay tìm pattern trước?**
**Luôn đặt nhân tử chung trước** nếu có. Vd $2x^2 + 10x + 12$. Nếu nhảy thẳng vào pattern: tìm hai số tổng 10, tích 12 không có. Nhưng nếu rút $2$ ra trước: $2(x^2 + 5x + 6) = 2(x+2)(x+3)$. Dễ hơn nhiều.

### ⚠ Lỗi thường gặp khi phân tích

- **Quên đặt nhân tử chung**: $4x^2 - 16 \\to (4x-4)(x+4)$ (sai). Đúng: $4(x^2-4) = 4(x-2)(x+2)$.
- **Nhầm dấu khi tổng âm**: $x^2 - 5x + 6$ mà ra $(x+2)(x+3)$ (sai). Đúng: hai số phải có tổng $-5$ → $-2, -3$ → $(x-2)(x-3)$.
- **Nhầm $x^2 + bx + c$ với $x^2 - bx + c$**: chỉ một dấu nhưng đổi đáp án hoàn toàn.
- **Phân tích nửa vời**: $x^4 - 1 = (x^2-1)(x^2+1)$ — chưa hết. Tiếp: $(x^2-1) = (x-1)(x+1)$. Đáp án đầy đủ: $(x-1)(x+1)(x^2+1)$.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Phân tích $x^2 + 10x + 24$.</summary>

Cặp tích 24, tổng 10: $(4, 6)$. → $(x+4)(x+6)$.
</details>

<details>
<summary>2. Phân tích $x^2 - 13x + 36$.</summary>

Cặp tích 36, tổng $-13$ → cả hai âm: $(-4, -9)$. → $(x-4)(x-9)$.
</details>

<details>
<summary>3. Phân tích $3x^3 - 12x$.</summary>

Đặt nhân tử chung $3x$: $3x(x^2 - 4) = 3x(x-2)(x+2)$.
</details>

**Vì sao cần phân tích?** Vì nếu biểu thức $= 0$, ta dùng quy tắc "tích bằng 0 $\\iff$ một thừa số bằng 0". $(x - 3)(x + 5) = 0 \\iff x = 3$ hoặc $x = -5$. Đây là cách giải phương trình bậc 2 (sẽ học ở Lesson 06).

### 📝 Tóm tắt mục 4

- **Gom hạng tử đồng dạng**: cộng/trừ hệ số khi phần biến giống hệt nhau.
- **Phân phối**: $a(b + c) = ab + ac$. FOIL = trường hợp 2 ngoặc $\\times$ 2 ngoặc.
- **Ba hằng đẳng thức bậc 2**: $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$ và $(a+b)(a-b) = a^2 - b^2$. Chứng minh được bằng hình học (diện tích).
- **Phân tích nhân tử**: đặt nhân tử chung → hằng đẳng thức ngược → tam thức bậc 2 (tìm cặp tổng/tích).
- Luôn **đặt nhân tử chung trước** trước khi áp dụng các kỹ thuật khác.

## 5. Quy ước viết — vì sao 2x không phải 2·x

### Lược bỏ dấu nhân

Trong toán, khi viết tay hoặc trong sách, **dấu nhân thường được lược bỏ** trong các trường hợp sau:

| Viết gọn | Đầy đủ | Ghi chú |
|----------|--------|---------|
| $2x$ | $2 \\cdot x$ | Số đứng trước biến. |
| $xy$ | $x \\cdot y$ | Hai biến cạnh nhau. |
| $3(x+1)$ | $3 \\cdot (x+1)$ | Số trước ngoặc. |
| $(x+1)(x-2)$ | $(x+1) \\cdot (x-2)$ | Hai ngoặc cạnh nhau. |
| $5\\sqrt{2}$ | $5 \\cdot \\sqrt{2}$ | Số trước căn. |

Nhưng **không lược bỏ** khi:

- Hai số cạnh nhau: viết $3 \\cdot 5$ chứ không phải $35$ (vì $35$ là một số khác).
- Có thể gây nhầm: $2 \\times 3.5$ viết $2 \\cdot 3.5$ cho rõ, không viết $23.5$.

### Dấu trừ đơn (unary minus)

$-x$ có nghĩa là $(-1) \\cdot x$. Tương tự, $-x^2$ thường được hiểu là $-(x^2) = -1 \\cdot x^2$. Để chỉ $(-x)^2$, **phải bọc ngoặc**:

$$\\begin{aligned}
-x^2 \\text{ tại } x = 3: \\quad & -(3^2) = -9 \\\\[4pt]
(-x)^2 \\text{ tại } x = 3: \\quad & (-3)^2 = 9
\\end{aligned}$$

Khác nhau hoàn toàn. Đây là lỗi cực kỳ phổ biến — luôn ngoặc lại khi thay số âm.

### Lũy thừa

$x^2$ (chỉ số mũ nhỏ ở trên) là cách viết chuẩn trong toán. Khi gõ máy/code, ta thường viết \`x^2\` (caret) hoặc \`x**2\` (Python) hoặc \`math.Pow(x, 2)\` (Go). Không có ký hiệu \`²\` trên bàn phím thông thường.

Trong README này, mình dùng $x^2$ cho dễ đọc; trong code Go bên dưới mình dùng \`x*x\` hoặc \`math.Pow(x, 2)\`.

### ❓ Câu hỏi tự nhiên về quy ước viết

**Q1: Sao $x^2$ viết khác \`x*x\`?**
Đây là vấn đề **notation** thuần. $x^2$ (toán) và \`x*x\` (code Go) đều **mã hóa cùng phép tính**: nhân $x$ với chính nó. Toán dùng superscript vì viết tay/in giấy đẹp; code dùng \`*\` vì bàn phím không có superscript. Trong Python \`x**2\`, trong shell \`x^2\` (caret) — đều biểu diễn cùng một ý.

**Q2: Phép nhân ẩn $2x$ có gì hay so với \`2*x\`?**
- **Ngắn gọn hơn**: viết $2x^2 - 3xy + 5x - 7$ ngắn hơn $2 \\cdot x \\cdot x - 3 \\cdot x \\cdot y + 5 \\cdot x - 7$.
- **Đọc tự nhiên**: "hai-eks bình" hay "hai-nhân-eks bình" — bản dịch nói tự nhiên hơn.
- **Nhưng**: trong code phải viết \`*\` vì compiler không phân biệt được \`2x\` (nhân) với \`2x\` (định danh).

**Q3: Tại sao $-x$ không nghĩa là "x âm"?**
$-x$ là **đối số của $x$** (negation), không phải "$x$ là số âm". Nếu $x = 5$, $-x = -5$. Nếu $x = -3$, $-x = 3$ (dương!). $-x < 0$ không tự động đúng — chỉ đúng khi $x > 0$. Phân biệt:
- $x < 0$ nghĩa là "$x$ là số âm" (giá trị của $x$ dưới 0).
- $-x$ nghĩa là "đối của $x$" (đổi dấu).

**Q4: $1/2x$ nghĩa là $\\frac{1}{2} \\cdot x$ hay $\\frac{1}{2x}$?**
Mập mờ — **tránh viết**. Theo PEMDAS chặt chẽ thì $1/2x = \\frac{1}{2} \\cdot x = \\frac{x}{2}$ (vì $/$ và $\\cdot$ cùng cấp, trái sang phải). Nhưng nhiều người viết $1/2x$ ý muốn nói $\\frac{1}{2x}$. Khi viết, **dùng ngoặc**: $\\left(\\frac{1}{2}\\right)x$ hoặc $\\frac{1}{2x}$ — rõ ràng.

**Q5: Tại sao trong toán $xy$ là $x \\cdot y$ còn trong code \`xy\` là tên biến mới?**
Toán giả định mỗi chữ cái là một biến riêng → $xy$ = hai biến cạnh nhau → ngầm hiểu nhân. Code cho phép tên biến nhiều ký tự → \`xy\` = tên biến duy nhất. Khác biệt **văn hóa**, không phải khác biệt logic.

### ⚠ Lỗi thường gặp về quy ước

- **Viết \`2x\` trong code**: lỗi cú pháp. Phải \`2*x\`.
- **Nhầm $-3^2 = 9$**: sai, $-3^2 = -9$ (lũy thừa trước, dấu trừ áp dụng sau). Nếu muốn $9$, viết $(-3)^2$.
- **Viết tên biến gồm nhiều chữ trong toán mà không có dấu nhân**: $ab$ ngầm $= a \\cdot b$ trong toán, không phải biến tên \`ab\`. Nếu muốn dùng $ab$ là một tên trong toán (như "khoảng AB" trong hình học), phải có ngữ cảnh rõ.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>1. Tính $-x^2$ và $(-x)^2$ tại $x = 4$.</summary>

$-x^2 = -(4^2) = -16$. $(-x)^2 = (-4)^2 = 16$. Hai cái khác dấu — $-$ trước $^2$ quan trọng.
</details>

<details>
<summary>2. Viết $3x^2y - 2xy^2$ trong code Go.</summary>

\`3*x*x*y - 2*x*y*y\` (hoặc dùng \`math.Pow\`). Mọi phép nhân phải có \`*\`.
</details>

### 📝 Tóm tắt mục 5

- **Toán** lược dấu nhân khi rõ ràng: $2x$, $xy$, $5(x+1)$. **Code** thì không — luôn cần \`*\`.
- **$-x^2 \\neq (-x)^2$**: lũy thừa trước, dấu trừ áp dụng sau.
- **Bọc ngoặc** khi thay số âm vào biến, khi viết phân số có biến.
- Khi nghi ngờ, dùng ngoặc — không ai chê viết ngoặc quá rõ.

## 6. Liên hệ với lập trình (Go)

### Khác biệt cú pháp

| Toán | Go |
|------|-----|
| $2x + 3$ | \`2*x + 3\` (bắt buộc viết \`*\`) |
| $xy$ | \`x*y\` |
| $x^2$ | \`x*x\` hoặc \`math.Pow(x, 2)\` |
| $\\frac{a+b}{a-b}$ | \`(a + b) / (a - b)\` |
| $\\sqrt{x}$ | \`math.Sqrt(x)\` |
| $-x$ | \`-x\` |

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
| \`weight\` (kg), \`height\` (m) | $\\text{BMI} = \\frac{\\text{weight}}{\\text{height}^2}$ | Chỉ số khối cơ thể |
| $x$, $y$ | $r = \\sqrt{x^2 + y^2}$ | Khoảng cách tới gốc |
| \`price\`, \`quantity\` | $\\text{revenue} = \\text{price} \\cdot \\text{quantity}$ | Doanh thu |
| $a$, $b$, $c$ (cạnh tam giác) | $s = \\frac{a+b+c}{2}$ rồi $\\text{area} = \\sqrt{s(s-a)(s-b)(s-c)}$ | Diện tích (Heron) |

Mô hình ML không "biết" rằng $\\frac{\\text{weight}}{\\text{height}^2}$ có ý nghĩa — bạn phải nói cho nó biết bằng cách tạo biến mới. Đó là biểu thức đại số.

### Đa thức (polynomial)

Một loại biểu thức cực quan trọng: **đa thức một biến** có dạng:

$$P(x) = a_n \\cdot x^n + a_{n-1} \\cdot x^{n-1} + \\cdots + a_1 \\cdot x + a_0$$

- $a_0, a_1, \\ldots, a_n$ là hệ số (constant).
- Bậc cao nhất $n$ gọi là **bậc của đa thức**.
- Ví dụ: $3x^2 - 5x + 1$ là đa thức bậc 2; $x^3 + x - 7$ là đa thức bậc 3.

Sẽ học kỹ ở **Lesson 06 (Hàm bậc 1 và bậc 2)**. Còn ở bài tập 5 dưới đây, ta đã viết hàm \`evaluate\` tổng quát cho mọi đa thức.

### Gradient và đạo hàm

Khi qua Calculus (tầng 3), bạn sẽ "đạo hàm" các biểu thức. Đạo hàm của $2x^2 + 3x - 1$ là $4x + 3$. Trước khi đạo hàm được, phải biết đọc, viết, biến đổi biểu thức thuần thục — đó là tất cả Lesson 02 này.

## Bài tập

### Bài 1
Tính giá trị của $f(x) = 3x^2 - 2x + 1$ với $x = -1, 0, 1, 2$. Lập bảng.

### Bài 2
Đơn giản hóa biểu thức $2(x + 3) - 3(2x - 1) + x$. Đáp án dưới dạng $ax + b$.

### Bài 3
Khai triển các biểu thức sau:

a) $(2x - 3)^2$

b) $(x + 1)(x - 2)(x + 3)$

### Bài 4
Phân tích các biểu thức sau thành nhân tử:

a) $x^2 - 9$

b) $x^2 + 5x + 6$

c) $2x^2 - 8$

### Bài 5 (code)
Viết hàm Go \`evaluate(coeffs []float64, x float64) float64\` tính giá trị đa thức \`coeffs[0] + coeffs[1]*x + coeffs[2]*x*x + ...\` tại $x$, **sử dụng phương pháp Horner**.

Gợi ý: phương pháp Horner viết lại đa thức theo cách lồng nhau, ví dụ:

$$3x^3 + 2x^2 - x + 5 = ((3x + 2)x - 1)x + 5$$

Nhờ đó chỉ cần $n$ phép nhân và $n$ phép cộng cho đa thức bậc $n$, thay vì tính từng lũy thừa.

## Lời giải chi tiết

### Lời giải Bài 1

Cách tiếp cận: thay từng giá trị x vào, áp dụng PEMDAS, lập bảng. Luôn bọc ngoặc khi thay số âm.

| $x$ | $3x^2$ | $-2x$ | $+1$ | $f(x)$ |
|-----|-------|-------|------|--------|
| $-1$ | $3 \\cdot (-1)^2 = 3 \\cdot 1 = 3$ | $-2 \\cdot (-1) = 2$ | $1$ | $3 + 2 + 1 = 6$ |
| $0$  | $3 \\cdot 0^2 = 0$  | $0$  | $1$ | $0 + 0 + 1 = 1$ |
| $1$  | $3 \\cdot 1^2 = 3$  | $-2$ | $1$ | $3 - 2 + 1 = 2$ |
| $2$  | $3 \\cdot 2^2 = 12$ | $-4$ | $1$ | $12 - 4 + 1 = 9$ |

**Đáp số**: $f(-1)=6, f(0)=1, f(1)=2, f(2)=9$.

> Kiểm tra nhanh bằng trực giác: $f(0)$ luôn là hạng tử tự do (ở đây là $1$). $f(0) = 1$ ✓.

### Lời giải Bài 2

Cách tiếp cận: phân phối từng ngoặc, rồi gom hạng tử đồng dạng. Cẩn thận dấu trừ.

$$\\begin{aligned}
& 2(x + 3) - 3(2x - 1) + x \\\\[4pt]
\\text{Bước 1 (phân phối ngoặc đầu): } & 2(x+3) = 2x + 6 \\\\[4pt]
\\text{Bước 2 (phân phối ngoặc thứ hai): } & 3(2x-1) = 6x - 3,\\; \\text{vì có dấu trừ: } -3(2x-1) = -6x + 3 \\\\[4pt]
\\text{Bước 3 (viết lại): } & 2x + 6 - 6x + 3 + x \\\\[4pt]
\\text{Bước 4 (gom): } & 2x - 6x + x = (2 - 6 + 1)x = -3x,\\; 6 + 3 = 9 \\\\[4pt]
\\text{Bước 5 (kết quả): } & -3x + 9
\\end{aligned}$$

**Đáp số**: $-3x + 9$ (hoặc viết là $9 - 3x$ cũng đúng).

> Kiểm tra bằng cách thay $x = 1$:
> - Biểu thức gốc: $2 \\cdot 4 - 3 \\cdot 1 + 1 = 8 - 3 + 1 = 6$.
> - Kết quả: $-3 \\cdot 1 + 9 = 6$. ✓

### Lời giải Bài 3

**a) $(2x - 3)^2$**

Cách tiếp cận: dùng hằng đẳng thức $(a - b)^2 = a^2 - 2ab + b^2$ với $a = 2x$, $b = 3$.

$$\\begin{aligned}
(2x - 3)^2 &= (2x)^2 - 2 \\cdot (2x) \\cdot 3 + 3^2 \\\\[4pt]
&= 4x^2 - 12x + 9
\\end{aligned}$$

**Đáp số**: $4x^2 - 12x + 9$.

> Kiểm tra với $x = 2$: gốc $(4-3)^2 = 1$; kết quả $16 - 24 + 9 = 1$. ✓

**b) $(x + 1)(x - 2)(x + 3)$**

Cách tiếp cận: nhân hai cái đầu trước, rồi nhân kết quả với cái thứ ba.

Bước 1: $(x + 1)(x - 2)$ dùng FOIL:

$$= x^2 - 2x + x - 2 = x^2 - x - 2$$

Bước 2: $(x^2 - x - 2)(x + 3)$ — phân phối từng hạng tử của đa thức đầu nhân với $(x + 3)$:

$$\\begin{aligned}
x^2 \\cdot (x + 3) &= x^3 + 3x^2 \\\\[4pt]
(-x) \\cdot (x + 3) &= -x^2 - 3x \\\\[4pt]
(-2) \\cdot (x + 3) &= -2x - 6 \\\\[4pt]
\\text{Cộng: } & x^3 + 3x^2 - x^2 - 3x - 2x - 6 \\\\[4pt]
&= x^3 + (3 - 1)x^2 + (-3 - 2)x - 6 \\\\[4pt]
&= x^3 + 2x^2 - 5x - 6
\\end{aligned}$$

**Đáp số**: $x^3 + 2x^2 - 5x - 6$.

> Kiểm tra với $x = 0$: gốc $1 \\cdot (-2) \\cdot 3 = -6$; kết quả $0 + 0 - 0 - 6 = -6$. ✓
> Kiểm tra với $x = 1$: gốc $2 \\cdot (-1) \\cdot 4 = -8$; kết quả $1 + 2 - 5 - 6 = -8$. ✓

### Lời giải Bài 4

**a) $x^2 - 9$**

Đây là hiệu hai bình phương: $x^2 - 3^2 = (x - 3)(x + 3)$.

**Đáp số**: $(x - 3)(x + 3)$.

**b) $x^2 + 5x + 6$**

Tìm hai số có **tổng $= 5$** và **tích $= 6$**. Liệt kê các cặp ước của 6: $(1, 6), (2, 3)$. Cặp $(2, 3)$ có tổng 5. ✓

**Đáp số**: $(x + 2)(x + 3)$.

> Kiểm tra bằng FOIL: $(x+2)(x+3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$. ✓

**c) $2x^2 - 8$**

Bước 1: Đặt nhân tử chung là 2: $2x^2 - 8 = 2(x^2 - 4)$.

Bước 2: Phần $x^2 - 4$ lại là hiệu hai bình phương: $x^2 - 2^2 = (x - 2)(x + 2)$.

**Đáp số**: $2(x - 2)(x + 2)$.

> Lưu ý: luôn đặt nhân tử chung **trước**, rồi mới đến hằng đẳng thức. Bỏ qua bước (1) thì bài này không phân tích được sạch.

### Lời giải Bài 5

**Phương pháp Horner**: viết lại đa thức $a_0 + a_1 x + a_2 x^2 + \\cdots + a_n x^n$ dưới dạng lồng:

$$a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0 = ((\\cdots((a_n)x + a_{n-1})x + a_{n-2})x + \\cdots + a_1)x + a_0$$

Bắt đầu từ hệ số bậc cao nhất, nhân với $x$ rồi cộng hệ số bậc thấp hơn kế tiếp, lặp lại đến hệ số bậc 0.

Walk-through với $P(x) = 3x^3 + 2x^2 - x + 5$ tại $x = 2$:

$$\\begin{aligned}
\\text{result} &= 3 &&\\text{(hệ số bậc cao nhất)} \\\\[4pt]
\\text{result} &= 3 \\cdot 2 + 2 = 8 &&\\text{(nhân } x \\text{, cộng hệ số tiếp theo)} \\\\[4pt]
\\text{result} &= 8 \\cdot 2 + (-1) = 15 \\\\[4pt]
\\text{result} &= 15 \\cdot 2 + 5 = 35
\\end{aligned}$$

Kiểm tra: $3 \\cdot 8 + 2 \\cdot 4 - 2 + 5 = 24 + 8 - 2 + 5 = 35$ ✓

### Walk-through chi tiết: bậc 4 — đếm phép nhân hai cách

Lấy $f(x) = 2x^4 - 3x^3 + x^2 - 5x + 7$ tại $x = 2$.

**Cách ngây thơ — tính từng lũy thừa rồi nhân hệ số**:

$$\\begin{aligned}
\\text{Tính } x^2, x^3, x^4: \\quad & x^2 = 2 \\cdot 2 = 4 &&\\text{(1 phép nhân)} \\\\[4pt]
& x^3 = x^2 \\cdot x = 4 \\cdot 2 = 8 &&\\text{(1 phép nhân)} \\\\[4pt]
& x^4 = x^3 \\cdot x = 8 \\cdot 2 = 16 &&\\text{(1 phép nhân)} \\\\[4pt]
\\text{Nhân với hệ số: } \\quad & 2 \\cdot x^4 = 2 \\cdot 16 = 32 &&\\text{(1 phép nhân)} \\\\[4pt]
& 3 \\cdot x^3 = 3 \\cdot 8 = 24 &&\\text{(1 phép nhân)} \\\\[4pt]
& 1 \\cdot x^2 = 1 \\cdot 4 = 4 &&\\text{(1 phép nhân)} \\\\[4pt]
& 5 \\cdot x = 5 \\cdot 2 = 10 &&\\text{(1 phép nhân)} \\\\[4pt]
\\text{Cộng/trừ: } \\quad & 32 - 24 + 4 - 10 + 7 = 9 &&\\text{(4 phép cộng/trừ)}
\\end{aligned}$$

Tổng phép nhân: 7. Tổng phép cộng/trừ: 4.

**Cách Horner — lồng nhau**:

Viết lại $f(x) = ((((2) \\cdot x - 3) \\cdot x + 1) \\cdot x - 5) \\cdot x + 7$. Tính từ trong ra ngoài tại $x = 2$:

$$\\begin{aligned}
\\text{Bước 0: result} &= 2 &&\\text{(hệ số bậc 4)} \\\\[4pt]
\\text{Bước 1: result} &= 2 \\cdot 2 + (-3) = 1 &&\\text{(1 nhân + 1 cộng)} \\\\[4pt]
\\text{Bước 2: result} &= 1 \\cdot 2 + 1 = 3 &&\\text{(1 nhân + 1 cộng)} \\\\[4pt]
\\text{Bước 3: result} &= 3 \\cdot 2 + (-5) = 1 &&\\text{(1 nhân + 1 cộng)} \\\\[4pt]
\\text{Bước 4: result} &= 1 \\cdot 2 + 7 = 9 &&\\text{(1 nhân + 1 cộng)}
\\end{aligned}$$

Tổng phép nhân: 4. Tổng phép cộng/trừ: 4.

**So sánh**:

| | Phép nhân | Phép cộng/trừ |
|---|----------:|--------------:|
| Ngây thơ | 7 | 4 |
| Horner | **4** | 4 |

Tổng quát cho đa thức bậc $n$:
- Ngây thơ: $\\frac{n(n+1)}{2}$ phép nhân ($1+2+\\cdots+n$ cho các lũy thừa, cộng $n+1$ cho hệ số). Cụ thể với $n=4$: $\\frac{4 \\cdot 5}{2} = 10$ nhân... thực tế chỉ $7$ vì ta tái sử dụng lũy thừa cũ. Nếu **không** tái sử dụng (tính $x^i$ mỗi lần độc lập): $0+1+2+3+4 = 10$ nhân hệ số + lũy thừa.
- Horner: chỉ $n$ nhân.

Với $n$ lớn (vd $n = 100$ — không hiếm trong tính toán khoa học), Horner nhanh gấp $\\sim 50$ lần. Đó là vì sao mọi thư viện đại số đều dùng Horner mặc định.

**Lợi ích phụ của Horner**:
1. **Ổn định số học (numerical stability)**: ít tích lũy sai số \`float\` hơn so với cách tính $x^n$ rồi nhân — đặc biệt khi $\\lvert x \\rvert$ lớn.
2. **Cùng vòng lặp tính được cả đa thức và đạo hàm** (Horner mở rộng) — cần khi giải nghiệm bằng Newton-Raphson.
3. **Dễ song song hóa từng phần** với đa thức nhiều biến (mở rộng).

### ❓ Câu hỏi tự nhiên về Horner

**Q: Horner có sai số ít hơn cách ngây thơ — vì sao?**
Cách ngây thơ tính $x^n$ riêng → sai số nhân lên $n$ lần. Horner chỉ nhân $n$ lần liên tiếp với $x$ → cùng số phép nhân nhưng kèm phép cộng "trộn" liên tục, sai số không tích lũy theo lũy thừa.

**Q: Có thuật toán nào nhanh hơn Horner không?**
Có — nhưng phức tạp hơn nhiều và chỉ thắng khi $n$ rất lớn (vd $> 100$) và biết trước nhiều giá trị $x$ cần đánh giá: **preconditioning** (Knuth, Pan). Trong thực tế phổ biến, Horner luôn là lựa chọn mặc định.

**Q: Horner áp dụng cho đa thức nhiều biến được không?**
Được, nhưng phải chọn một biến làm "biến chính", coi các biến khác là hệ số. Vd $P(x, y) = x^2y + 2xy^2 - 3$ xem như đa thức bậc 2 theo $x$: $P(x, y) = (y) \\cdot x^2 + (2y^2) \\cdot x + (-3)$. Áp dụng Horner: $((y) \\cdot x + 2y^2) \\cdot x - 3$. Để tính $2y^2$ cũng phải tốn công — không tiết kiệm bằng trường hợp 1 biến.

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

- **Số phép nhân**: $n$ (đa thức bậc $n$ có $n+1$ hệ số, lặp $n$ lần).
- **Số phép cộng**: $n$.
- **Bộ nhớ phụ**: $O(1)$.

**So với cách "ngây thơ"** — tính từng $x^i$ riêng rồi nhân với hệ số:

\`\`\`go
result := 0.0
for i := 0; i < n; i++ {
    result += coeffs[i] * math.Pow(x, float64(i))   // mỗi lần Pow = i phép nhân
}
\`\`\`

Tổng số phép nhân: $0 + 1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$. Horner nhanh **hơn $\\sim n/2$ lần** với cùng độ chính xác.

Xem code đầy đủ ở [solutions.go](./solutions.go) — có hàm \`evaluate\` Horner, có \`evaluateNaive\` để so sánh, và có bộ test.

## Tài liệu liên quan

- [solutions.go](./solutions.go) — Code Go cho tất cả bài tập.
- [visualization.html](./visualization.html) — Bộ ba tool tương tác: evaluator, substitution stepper, like terms collector.
- **Lesson trước**: [Lesson 01 — Số và trục số](../lesson-01-numbers/)
- **Lesson tiếp**: [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/)
- **Tầng tiếp**: sẽ dùng biểu thức để dựng hàm số (Lesson 05), đa thức bậc 2 (Lesson 06), và xa hơn là feature engineering trong ML.
`;
