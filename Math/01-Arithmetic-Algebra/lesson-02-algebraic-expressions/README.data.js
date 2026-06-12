// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-02-algebraic-expressions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Biểu thức đại số

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **biến (variable)** và **hằng số** — và vì sao đại số mạnh hơn số học.
- Sử dụng thành thạo các phép toán trên **đa thức**: cộng, trừ, nhân, chia.
- Áp dụng **7 hằng đẳng thức đáng nhớ**.
- **Phân tích nhân tử** (factoring) — kỹ năng nền cho mọi bài đại số.
- Đánh giá biểu thức tại giá trị biến cụ thể.

## Kiến thức tiền đề

- [Lesson 01 — Hệ số học](../lesson-01-number-systems/) — biết phép toán cơ bản.

---

## 1. Biến và biểu thức

### 1.1. Biến là gì?

💡 **Trực giác trước định nghĩa — biến = "ô trống điền số"**

> Hình dung một tờ đơn có chỗ trống: *"Diện tích hình vuông cạnh ___ là ___²"*. Hai ô trống. Nếu đặt tên ô trống là $a$, câu thành *"Diện tích hình vuông cạnh $a$ là $a^2$"*. Tên $a$ chỉ đóng vai trò "chỉ về **cùng một con số** trong cả hai ô".

Một analogy khác: **biến giống một cái hộp dán nhãn**. Trên nhãn ghi tên ($x$); bên trong hộp là một con số. Khi viết công thức ($2x + 3$), ta nói chuyện với cái nhãn. Khi tính cụ thể, ta mở hộp lấy số bên trong thay vào.

**Biến (variable)** = ký hiệu (thường là chữ cái) đại diện cho **một số chưa biết hoặc có thể thay đổi**.

**Vì sao cần?** Vì:
- Số học chỉ làm việc với số cụ thể ($3 + 5 = 8$).
- Đại số cho phép phát biểu **quy luật chung**: $a + b = b + a$ đúng cho mọi $a, b$.
- Cho phép **giải phương trình**: tìm $x$ sao cho $2x + 3 = 11$.

**Ví dụ biến trong đời sống**: trong công thức diện tích hình tròn $A = \\pi r^2$, $r$ là **biến** — bạn dùng được công thức cho mọi $r$ (1 m, 2.5 cm, ...).

#### Bốn vai trò khác nhau của biến

"Biến" không phải một thứ đơn nhất — xét bốn câu, mỗi câu dùng biến theo một kiểu:

1. **Biến chưa biết (cần tìm)**: *"Tìm $x$ sao cho $2x + 3 = 11$"*. $x$ là một con số cụ thể đang nấp đâu đó — nhiệm vụ là moi nó ra ($x = 4$).
2. **Biến tổng quát (đúng với mọi)**: *"Với mọi số thực $n$, $n^2 \\geq 0$"*. $n$ không phải số cụ thể — câu khẳng định luật đúng cho **mọi** $n$.
3. **Biến phụ thuộc (thay đổi theo)**: *"Cho $y = 3x - 1$; khi $x$ chạy từ $0$ đến $5$ thì $y$ chạy từ $-1$ đến $14$"*. $x$ là biến độc lập (input), $y$ là biến phụ thuộc (output).
4. **Biến chỉ số (đếm)**: *"Tổng $S = a_1 + a_2 + \\cdots + a_n$"*. Chỉ số $i$ chỉ nhận giá trị nguyên $1, 2, \\ldots, n$.

#### Biến vs hằng (constant) — và "tham số"

**Hằng** = số cố định, giá trị không đổi. Hai loại:

| Loại | Ví dụ | Ghi chú |
|------|-------|---------|
| Hằng số cụ thể | $3$, $-7.5$, $\\pi \\approx 3.14159$, $e \\approx 2.71828$ | Giá trị biết rõ, "khóa" toàn cầu. |
| Tham số (parameter) | $a, b, c$ trong $ax^2 + bx + c$ | Cố định trong **một** bài, nhưng đại diện cho nhiều bài. |

> **Tham số là biến hay hằng?** Tùy ngữ cảnh. Khi viết "phương trình bậc 2 tổng quát $ax^2 + bx + c = 0$", thì $a, b, c$ là tham số — cố định trong một phương trình cụ thể nhưng đại diện cho bất kỳ phương trình bậc 2 nào. Còn $x$ là biến cần tìm. Khi giải bài cụ thể $2x^2 - 3x + 1 = 0$, ta gán $a = 2, b = -3, c = 1$, lúc đó chúng thành hằng.

Bốn công thức đời thực để thấy ranh giới biến/hằng **phụ thuộc câu hỏi**:

1. **$C = 2\\pi r$**: $\\pi$ là hằng toàn cầu; $r$ là biến (bán kính khác nhau); $C$ là biến phụ thuộc; số $2$ là hằng cụ thể.
2. **$E = mc^2$**: $c$ là hằng vật lý ($\\approx 3\\cdot 10^8$ m/s); $m$ là biến; $E$ phụ thuộc.
3. **$y = ax + b$**: $a, b$ là tham số; $x$ độc lập; $y$ phụ thuộc. Khi cố định thành $y = 2x + 5$ thì $a = 2, b = 5$ là hằng.
4. **$F = G\\,m_1 m_2 / r^2$**: $G$ là hằng vũ trụ; $m_1, m_2, r$ là biến. Nếu cố định cặp vật chỉ đổi khoảng cách, $m_1, m_2$ thành hằng, chỉ $r$ là biến.

#### Quy ước đặt tên (phổ biến, không bắt buộc)

| Chữ | Vai trò điển hình |
|-----|-------------------|
| $x, y, z$ | Biến chính / cần tìm / tọa độ |
| $a, b, c, d$ | Tham số, hệ số |
| $i, j, k, n, m$ | Chỉ số nguyên (index) |
| $t$ | Thời gian |
| $\\theta, \\alpha, \\beta$ | Góc |
| $f, g, h$ | Hàm số |

### 1.2. Biểu thức đại số

💡 **Trực giác — biểu thức = "công thức nấu ăn"**

> Bạn đưa vào nguyên liệu (giá trị của biến), thực hiện theo các bước (phép toán), nhận ra một món (một con số). Cùng công thức $2x + 5$ với input khác nhau cho output khác nhau, nhưng **quy trình cố định**. Ẩn dụ khác: biểu thức là máy tính bỏ túi có vài nút input chưa bấm — bấm số vào, máy nhả ra một số.

**Biểu thức** = tổ hợp của biến, hằng số, và phép toán — sao cho khi thay mọi biến bằng số, ta tính ra được **một** giá trị.

Ví dụ:
- $2x + 5$ (biến $x$, hằng 2 và 5).
- $x^2 - 3xy + y^2$ (2 biến $x, y$).
- $3a + 2b - 4c$ (3 biến).

**KHÔNG** là biểu thức (vì có dấu so sánh): $2x + 3 = 7$ là **phương trình** (equation); $x^2 < 4$ là **bất phương trình**.

#### Biểu thức vs phương trình

| | Biểu thức | Phương trình |
|---|-----------|--------------|
| Có dấu $=$? | Không | Có |
| Thao tác | "Đánh giá" / "rút gọn" | "Giải" tìm biến |
| Ví dụ | $2x + 3$ | $2x + 3 = 7$ |
| Kết quả | Một biểu thức gọn hơn / một số | Giá trị (hoặc nhiều, hoặc không) của biến |

> Nói "giải biểu thức $2x + 3$" là **sai**. Phải nói "rút gọn" hoặc "đánh giá tại $x = 5$ ra $13$".

#### Hạng tử (term), hệ số (coefficient), đồng dạng (like terms)

Một biểu thức là tổng/hiệu các **hạng tử**. Mỗi hạng tử = một tích "hệ số $\\times$ phần biến". Ví dụ với $3x^2y - 5xy + 7x - 2$:

| Hạng tử | Hệ số | Phần biến |
|---------|-------|-----------|
| $3x^2y$ | $3$ | $x^2y$ |
| $-5xy$ | $-5$ | $xy$ |
| $7x$ | $7$ | $x$ |
| $-2$ | $-2$ | (không có biến — hạng tử tự do) |

**Hạng tử đồng dạng** = các hạng tử có **phần biến giống hệt nhau**. Vd $3x^2y$ và $-7x^2y$ đồng dạng; còn $3x^2y$ và $3xy^2$ **không** đồng dạng (lũy thừa của $x, y$ đảo nhau).

Bốn ví dụ luyện mắt:

1. $4x^3 - 7x + 2$: ba hạng tử $4x^3$ (hệ số 4), $-7x$ (hệ số $-7$), $2$ (tự do).
2. $-x^2y + 3xy^2 - 5$: hệ số đầu là $-1$ (viết ẩn); $-x^2y$ và $3xy^2$ **không** đồng dạng.
3. $\\frac{1}{2}x - \\frac{3}{4}x + x$: ba đồng dạng → $\\left(\\frac{2}{4} - \\frac{3}{4} + \\frac{4}{4}\\right)x = \\frac{3}{4}x$.
4. $5ab + 5ba - 2ab$: $ab = ba$ (nhân giao hoán) → cả ba đồng dạng → $(5+5-2)ab = 8ab$.

**Đánh giá biểu thức** = thay biến bằng số cụ thể rồi tính.

Vd: với $x = 3$, biểu thức $2x + 5$ = $2\\cdot 3 + 5$ = **11**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$2x$ nghĩa là gì khi không có dấu nhân?"* Là $2\\cdot x$ — viết liền ngầm hiểu là nhân. $2x \\neq$ "số 2 ghép số x".
- *"Biến và ẩn khác nhau không?"* Cùng là ký hiệu chữ; "ẩn" thường chỉ biến **cần tìm** trong phương trình (Lesson 03), "biến" là cách gọi chung.
- *"$3x^2y$ và $3yx^2$ có đồng dạng không?"* Có — phần biến giống nhau, chỉ khác thứ tự viết (quy ước viết theo bảng chữ cái: $x^2y$).
- *"$2x$ và $x^2$ có giống nhau không?"* Không! $2x = x + x$ (cộng hai lần), còn $x^2 = x\\cdot x$ (nhân). Thử $x = 3$: $2x = 6$ nhưng $x^2 = 9$.

⚠ **Lỗi thường gặp**

- **Coi $3x^2y$ và $3x^2$ là đồng dạng**: sai, một cái có $y$, một cái không.
- **Gom nhầm lũy thừa**: $x^2 + x = x^3$ hay $= 2x$ đều sai — $x^2$ và $x$ khác bậc, không cộng được. Phản chứng $x = 3$: $x^2 + x = 12$, nhưng $x^3 = 27$, $2x = 6$ — cả hai đều khác.
- **Bỏ quên dấu của hạng tử**: trong $3x - 5y$, hạng tử thứ hai là $-5y$ (mang dấu trừ), không phải $5y$.

🔁 **Dừng lại tự kiểm tra**

1. Đánh giá $3x^2 - x$ tại $x = 2$.
2. Liệt kê hạng tử và hệ số của $-2x^3 + x^2 - x + 7$.

<details><summary>Đáp án</summary>

1. $3\\cdot(2^2) - 2 = 3\\cdot 4 - 2 = 10$.
2. $-2x^3$ (hệ số $-2$), $x^2$ (hệ số $1$), $-x$ (hệ số $-1$), $7$ (tự do).

</details>

### 📝 Tóm tắt mục 1

- Biến: số chưa biết / tổng quát / phụ thuộc / chỉ số. Hằng: số cố định; tham số cố định trong một bài.
- Biểu thức: tổ hợp số + biến + phép toán (không có dấu $=$); phương trình thì có dấu $=$.
- Hạng tử = "hệ số × phần biến"; đồng dạng = phần biến giống hệt → mới gom được.

---

## 2. Thứ tự phép tính & các phép biến đổi cơ bản

### 2.1. Thứ tự phép tính: PEMDAS / BODMAS

Khi đánh giá một biểu thức, ta tính theo **thứ tự phép tính chuẩn** — hai cách viết tắt cùng một quy tắc:

| Ký tự | PEMDAS (Mỹ) | BODMAS (Anh) | Tiếng Việt |
|-------|-------------|--------------|------------|
| P / B | Parentheses | Brackets | Ngoặc |
| E / O | Exponents | Orders | Lũy thừa, căn |
| M | Multiplication | Multiplication | Nhân |
| D | Division | Division | Chia |
| A | Addition | Addition | Cộng |
| S | Subtraction | Subtraction | Trừ |

**Hai điều dễ quên** (đều "cùng cấp → làm từ trái sang phải"):

1. **Nhân và chia cùng cấp**: $8 \\div 4 \\times 2 = (8 \\div 4)\\times 2 = 2\\times 2 = 4$, **không** phải $8 \\div (4\\times 2) = 1$.
2. **Cộng và trừ cùng cấp**: $10 - 3 + 2 = (10 - 3) + 2 = 9$, **không** phải $10 - (3+2) = 5$.

#### Walk-through: tính $2x^2 + 3x - 1$ tại $x = -2$ (từng bước)

$$\\begin{aligned}
\\text{Bước 1 (thay } x = -2): \\quad & 2\\cdot(-2)^2 + 3\\cdot(-2) - 1 \\\\
\\text{Bước 2 (lũy thừa, E): } \\quad & (-2)^2 = 4 \\;\\to\\; 2\\cdot 4 + 3\\cdot(-2) - 1 \\\\
\\text{Bước 3 (nhân, M): } \\quad & 2\\cdot 4 = 8,\\; 3\\cdot(-2) = -6 \\;\\to\\; 8 + (-6) - 1 \\\\
\\text{Bước 4 (cộng/trừ, AS): } \\quad & 8 + (-6) = 2,\\; 2 - 1 = 1 \\\\
\\text{Kết quả: } \\quad & \\mathbf{1}
\\end{aligned}$$

> **Vì sao bọc ngoặc $(-2)^2$?** Vì $-2^2$ theo quy tắc nghĩa là $-(2^2) = -4$ (lũy thừa làm trước dấu trừ đơn), còn $(-2)^2 = 4$. **Luôn** bọc ngoặc khi thay số âm vào biến.

Bảng đánh giá $f(x) = 2x^2 + 3x - 1$ tại nhiều $x$ (cũng là bước đầu để vẽ đồ thị ở [Lesson 07](../lesson-07-functions-intro/)):

| $x$ | $2x^2$ | $3x$ | $2x^2 + 3x - 1$ |
|-----|--------|------|-----------------|
| $-2$ | $8$ | $-6$ | $1$ |
| $-1$ | $2$ | $-3$ | $-2$ |
| $0$ | $0$ | $0$ | $-1$ |
| $1$ | $2$ | $3$ | $4$ |
| $2$ | $8$ | $6$ | $13$ |

⚠ **Lỗi thường gặp với PEMDAS**

- **Quên bọc ngoặc số âm**: $x^2$ tại $x = -3$ viết $-3^2 = -9$ thay vì $(-3)^2 = 9$.
- **Phép chia mập mờ**: $6/2(1+2)$ — theo chuẩn: $1+2=3$, $6/2 = 3$, $3\\cdot 3 = 9$. Tránh viết kiểu này, dùng ngoặc rõ.
- **Tính sai dấu**: $f(x) = -x$ tại $x = -3$ → $-(-3) = 3$, không phải $-3$.

### 2.2. Gom hạng tử đồng dạng

💡 **Trực giác — đếm tiền cùng mệnh giá**

> $3$ tờ 1000đ $+ 5$ tờ 1000đ $= 8$ tờ 1000đ. Bạn không cần biết "1000đ là gì" — chỉ đếm số tờ. Tương tự $3x + 5x = 8x$: "đếm" có 8 cái $x$. Nhưng $3$ tờ 1000đ $+ 5$ tờ 5000đ **không** gộp được — khác mệnh giá. Đó là vì sao $3x + 5y$ không gom được.

**Quy tắc**: cộng/trừ các hạng tử cùng phần biến bằng cách cộng/trừ **hệ số**.

$$\\begin{aligned}
3x + 5x &= (3+5)x = 8x \\\\
7y - 2y &= (7-2)y = 5y \\\\
4x^2y - x^2y &= (4-1)x^2y = 3x^2y \\\\
2x + 3y \\;&\\text{— KHÔNG gom được (khác phần biến)} \\\\
2x^2 + 3x \\;&\\text{— KHÔNG gom được (khác lũy thừa của } x)
\\end{aligned}$$

**Vì sao đúng?** Vì đây chính là phân phối ngược: $3x + 5x = (3+5)\\cdot x$ (rút $x$ ra ngoài).

Bốn ví dụ:

1. $8a - 3a + 2a = (8-3+2)a = 7a$.
2. $3x + 5 - 2x + 7 - x$: gom $x$ → $(3-2-1)x = 0$; gom tự do → $5+7 = 12$. Kết quả **$12$**.
3. $2ab + 3a - ab + 4b - ab$: gom $ab$ → $(2-1-1)ab = 0$; còn $3a + 4b$ (khác phần biến). Kết quả **$3a + 4b$**.
4. $\\frac{2}{3}x + \\frac{1}{4}x - \\frac{1}{6}x$: quy đồng mẫu 12 → $\\left(\\frac{8}{12} + \\frac{3}{12} - \\frac{2}{12}\\right)x = \\frac{9}{12}x = \\frac{3}{4}x$.

⚠ **Lỗi thường gặp**: cộng hệ số quên dấu — $5x - 7x + 2x = (5-7+2)x = 0$, không phải $14x$. Và quên hệ số ẩn: $x^3 - x^3 = 0$ (hệ số $1$ và $-1$), không phải $x^3$.

### 2.3. Luật phân phối (distributive law) — $a(b+c) = ab + ac$

💡 **Chứng minh hình học (diện tích)**

Hình chữ nhật cạnh $a$ và cạnh $b + c$, chia theo chiều rộng thành hai phần:

\`\`\`
       b           c
    ┌─────┬───────────┐
  a │  ab │    ac     │
    └─────┴───────────┘

    Diện tích tổng = a·(b+c) = ab + ac
\`\`\`

Hai cách đếm cùng một diện tích → $a(b+c) = ab + ac$. Đây không phải "quy tắc trời ơi" mà là đếm diện tích bằng hai góc nhìn.

**Kiểm bằng số** (4 lần, đa dạng dấu):
- $5(3+4) = 5\\cdot 7 = 35$; và $5\\cdot 3 + 5\\cdot 4 = 15 + 20 = 35$ ✓.
- $2(x+3)$ tại $x = 7$: $2\\cdot 10 = 20$; và $2\\cdot 7 + 2\\cdot 3 = 20$ ✓.
- $(-4)(2+5) = -28$; và $(-4)\\cdot 2 + (-4)\\cdot 5 = -8 - 20 = -28$ ✓.
- $x(x+3) = x\\cdot x + x\\cdot 3 = x^2 + 3x$ ✓ (kiểm $x=2$: $2\\cdot 5 = 10 = 4 + 6$).

> **Dấu trừ trước ngoặc**: $-(x-3) = (-1)(x-3) = -x + 3$. Đổi dấu **tất cả** hạng tử trong ngoặc, không chỉ hạng tử đầu.

#### FOIL — nhân hai biểu thức trong ngoặc

$(a+b)(c+d)$ = phân phối hai lần. FOIL = **F**irst, **O**uter, **I**nner, **L**ast:

\`\`\`
(a + b)(c + d) = a·c + a·d + b·c + b·d
                  ↑     ↑     ↑     ↑
                First Outer Inner Last
\`\`\`

Walk-through $(2x+3)(x-4)$:

$$\\begin{aligned}
\\text{F: } & 2x\\cdot x = 2x^2 \\\\
\\text{O: } & 2x\\cdot(-4) = -8x \\\\
\\text{I: } & 3\\cdot x = 3x \\\\
\\text{L: } & 3\\cdot(-4) = -12 \\\\
\\text{Tổng: } & 2x^2 - 8x + 3x - 12 = \\mathbf{2x^2 - 5x - 12}
\\end{aligned}$$

Bốn ví dụ FOIL:

1. $(x+5)(x+2) = x^2 + 2x + 5x + 10 = x^2 + 7x + 10$.
2. $(3x-2)(x+4) = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8$.
3. $(-x-1)(x-3) = -x^2 + 3x - x + 3 = -x^2 + 2x + 3$. Kiểm $x=0$: gốc $(-1)(-3) = 3 = $ kết quả $3$ ✓.
4. $\\left(\\frac{x}{2}+1\\right)(x-2) = \\frac{x^2}{2} - x + x - 2 = \\frac{x^2}{2} - 2$ ($-x$ và $+x$ triệt tiêu).

❓ **Câu hỏi tự nhiên của người đọc**

- *"FOIL dùng cho $(a+b+c)(d+e)$ được không?"* Tinh thần vẫn dùng, nhưng "FOIL" chỉ 4 chữ — không đủ. Cách an toàn: phân phối **từng** hạng tử ngoặc đầu với cả ngoặc sau: $(a+b+c)(d+e) = ad + ae + bd + be + cd + ce$ ($3\\times 2 = 6$ tích). Tổng quát: $m$ hạng tử $\\times$ $n$ hạng tử → $mn$ tích.
- *"$(a-b)(a+b)$ ra gì?"* FOIL: $a^2 + ab - ab - b^2 = a^2 - b^2$ — hai hạng tử giữa triệt tiêu. Đây chính là hằng đẳng thức hiệu hai bình phương (mục 4).

⚠ **Lỗi thường gặp với phân phối**

- **Quên phân phối toàn bộ**: $3(x+2) = 3x + 2$ (sai, quên nhân $3\\cdot 2$). Đúng: $3x + 6$.
- **Sai dấu khi phân phối dấu trừ**: $-(a-b) = -a - b$ (sai). Đúng: $-a + b$.
- **FOIL quên hạng tử giữa**: $(x+2)(x+3) = x^2 + 6$ (sai, quên O+I). Đúng: $x^2 + 5x + 6$.

🔁 **Dừng lại tự kiểm tra**

1. Vì sao $8 - 3 + 2 = 7$ chứ không phải $3$?
2. Khai triển $-2(3x-5)$ và $(2a-1)(a+3)$.

<details><summary>Đáp án</summary>

1. Cộng/trừ cùng cấp, làm trái→phải: $(8-3)+2 = 7$. Tính "cộng trước" cho $8-(3+2) = 3$ là sai PEMDAS.
2. $-2(3x-5) = -6x + 10$ (dấu trừ áp cả $-5$). $(2a-1)(a+3) = 2a^2 + 6a - a - 3 = 2a^2 + 5a - 3$.

</details>

### 📝 Tóm tắt mục 2

- **PEMDAS**: Ngoặc → Lũy thừa → Nhân/Chia (trái→phải) → Cộng/Trừ (trái→phải). Bọc ngoặc khi thay số âm: $(-2)^2 \\neq -2^2$.
- **Gom hạng tử đồng dạng** = cộng hệ số của các hạng tử cùng phần biến (đếm tiền cùng mệnh giá).
- **Phân phối** $a(b+c) = ab + ac$ (đếm diện tích); FOIL cho tích hai ngoặc; $m\\times n$ hạng tử → $mn$ tích.

---

## 3. Đa thức (Polynomial)

### 3.1. Định nghĩa

**Đa thức của 1 biến x** = tổng các "đơn thức" dạng $a\\cdot x^n$ ($n$ là số tự nhiên):

$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\ldots + a_1 x + a_0$$

- **Bậc của đa thức** = mũ cao nhất $n$ (khi $a_n \\neq 0$).
- **Hệ số dẫn đầu** = $a_n$.

**Ví dụ**: $P(x) = 3x^3 - 5x^2 + 2x - 1$ là đa thức bậc 3.

### 3.2. Phép toán đa thức

**Cộng/trừ**: cộng/trừ các hệ số CÙNG BẬC.
- $(2x^2 + 3x - 1) + (x^2 - 5x + 4)$ = **$3x^2 - 2x + 3$**.

**Nhân**: nhân từng cặp rồi cộng (chính là phân phối ở mục 2.3).
- $(x + 2)(x + 3) = x\\cdot x + x\\cdot 3 + 2\\cdot x + 2\\cdot 3$ = **$x^2 + 5x + 6$**.

**Chia đa thức**: sẽ học sâu hơn ở các bài sau. Cơ bản: chia thường dùng phương pháp "chia dài" (long division).

### 3.3. Verify phép nhân đa thức bằng số

Cách kiểm tra khai triển không sai: **thay 1 giá trị x cụ thể vào cả 2 vế**, phải bằng nhau.
- $(x+2)(x+3) = x^2+5x+6$. Thay $x=4$: vế trái $6\\cdot 7 = 42$; vế phải $16+20+6 = 42$ ✓.
- Thay $x=-1$: vế trái $1\\cdot 2 = 2$; vế phải $1-5+6 = 2$ ✓.

⚠ **Lỗi thường gặp**: chỉ cộng/trừ được các hạng tử **cùng bậc**. $2x^2 + 3x$ **không** rút gọn thành $5x^3$ hay $5x^2$ — $x^2$ và $x$ khác bậc, để nguyên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bậc của tích 2 đa thức bằng bao nhiêu?"* Bằng **tổng** 2 bậc: bậc 2 × bậc 3 = bậc 5. Vd $(x^2+1)(x^3-x)$ có bậc $2+3 = 5$.
- *"Hằng số (vd số 7) có phải đa thức không?"* Có — là đa thức **bậc 0** ($7 = 7x^0$). Số 0 là đa thức đặc biệt không có bậc.

🔁 **Dừng lại tự kiểm tra**

1. Bậc của $5x^4 - x^6 + 2$ là mấy?
2. Rút gọn $(x^2+3x) + (2x^2-x)$.

<details><summary>Đáp án</summary>

1. **6** (mũ cao nhất là $x^6$, thứ tự viết không quan trọng).
2. $3x^2 + 2x$ (cộng cùng bậc: $1+2=3$ cho $x^2$, $3-1=2$ cho $x$).

</details>

### 📝 Tóm tắt mục 3

- Đa thức = tổng các $a_k x^k$; bậc = mũ cao nhất có hệ số ≠ 0.
- Cộng/trừ: gộp hạng tử **cùng bậc**. Nhân: nhân từng cặp; bậc tích = tổng bậc.

---

## 4. Bảy hằng đẳng thức đáng nhớ

💡 **Trực giác**: bảy "hằng đẳng thức" này **không phải công thức trên trời** — tất cả chỉ là **khai triển phép nhân (mục 2.3) rồi rút gọn**, đóng gói lại để "nhìn là biết" thay vì FOIL mỗi lần. Học thuộc giúp cả khai triển (xuôi) lẫn phân tích nhân tử (ngược, mục 5).

$$\\begin{aligned}
1.\\quad & (a + b)^2 = a^2 + 2ab + b^2 \\\\
2.\\quad & (a - b)^2 = a^2 - 2ab + b^2 \\\\
3.\\quad & a^2 - b^2 = (a - b)(a + b) \\\\
4.\\quad & (a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3 \\\\
5.\\quad & (a - b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3 \\\\
6.\\quad & a^3 + b^3 = (a + b)(a^2 - ab + b^2) \\\\
7.\\quad & a^3 - b^3 = (a - b)(a^2 + ab + b^2)
\\end{aligned}$$

### 4.1. Chứng minh hình học (diện tích) — 3 hằng đẳng thức cốt lõi

#### (a) $(a+b)^2 = a^2 + 2ab + b^2$

Vẽ hình vuông cạnh $a + b$, chia mỗi cạnh thành đoạn $a$ và đoạn $b$ → hình vuông chia thành 4 ô:

\`\`\`
        a              b
   ┌──────────┬────────────────┐
   │          │                │
 a │    a²    │       ab       │
   │          │                │
   ├──────────┼────────────────┤
   │          │                │
 b │    ab    │       b²       │
   │          │                │
   └──────────┴────────────────┘
\`\`\`

- Hình vuông lớn cạnh $a+b$ → diện tích $(a+b)^2$.
- Tổng 4 ô: $a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$.
- Hai cách tính cùng diện tích → đẳng thức đúng. ∎

**Vì sao có $2ab$?** Vì có **hai ô chữ nhật $ab$** (góc trên phải + góc dưới trái). Viết $(a+b)^2 = a^2 + b^2$ là **bỏ quên hai ô đó**. Kiểm số $a=3, b=4$: hình vuông cạnh 7 có diện tích $49$; bốn ô $9 + 12 + 12 + 16 = 49$ ✓.

#### (b) $(a-b)^2 = a^2 - 2ab + b^2$

Xét hình vuông cạnh $a$. Ở một góc lấy ra hình vuông cạnh $a-b$:

\`\`\`
       (a−b)         b
   ┌──────────┬──────────────┐
(a−b)│ (a−b)²  │   (a−b)·b     │
   ├──────────┼──────────────┤
  b │  b·(a−b) │      b²       │
   └──────────┴──────────────┘

   Tổng cả hình vuông lớn = a²
\`\`\`

Hình vuông lớn cạnh $a$ có diện tích $a^2$. Ô $(a-b)^2$ = toàn bộ $a^2$ trừ đi hai chữ nhật $(a-b)b$ và ô $b^2$... gọn hơn, từ hình ta đọc trực tiếp:

$$(a-b)^2 = a^2 - 2b(a-b) - b^2 = a^2 - 2ab + 2b^2 - b^2 = a^2 - 2ab + b^2.$$

Kiểm số $a=10, b=3$: $(10-3)^2 = 49$; $100 - 60 + 9 = 49$ ✓.

#### (c) $a^2 - b^2 = (a-b)(a+b)$

Vẽ hình vuông cạnh $a$, cắt ra hình vuông nhỏ cạnh $b$ ở góc → còn lại hình chữ L diện tích $a^2 - b^2$. Cắt chữ L thành 2 chữ nhật rồi ghép thành 1 chữ nhật cạnh $(a+b)\\times(a-b)$:

\`\`\`
Chữ L (a² − b²):          Ghép lại:
   a                       (a+b)
┌────────┐             ┌─────────────┐
│        │ a−b         │             │ (a−b)
│   ┌────┤             │  a² − b²    │
│   │ b² │ b           │             │
└───┴────┘             └─────────────┘
\`\`\`

Diện tích bảo toàn → $a^2 - b^2 = (a+b)(a-b)$.

Cũng kiểm được bằng đại số: $(a-b)(a+b) = a\\cdot a + a\\cdot b - b\\cdot a - b\\cdot b = a^2 + ab - ab - b^2 = a^2 - b^2$ ✓ (FOIL, hai hạng tử giữa triệt tiêu).

Kiểm số $a=7, b=2$: $(7+2)(7-2) = 45$; $49 - 4 = 45$ ✓.

### 4.2. Ứng dụng nhanh

Tính nhanh $97 \\cdot 103$ mà không cần máy tính:
- Đặt $a = 100, b = 3$. Khi đó $97 = a - b$ và $103 = a + b$.
- $97 \\cdot 103 = (a - b)(a + b) = a^2 - b^2 = 10000 - 9$ = **9991**.

### 4.3. Verify các hằng đẳng thức bằng số (cả 2 vế)

- $(a+b)^2 = a^2+2ab+b^2$. Thử $a=3, b=4$: vế trái $(3+4)^2 = 49$; vế phải $9+24+16 = 49$ ✓. Phần $2ab = 24$ chính là cái hay bị quên.
- $(a-b)^2 = a^2-2ab+b^2$. Thử $a=10, b=3$: vế trái $7^2 = 49$; vế phải $100 - 60 + 9 = 49$ ✓.
- $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$. Thử $a=2, b=1$: vế trái $3^3 = 27$; vế phải $8 + 3\\cdot4\\cdot1 + 3\\cdot2\\cdot1 + 1 = 8 + 12 + 6 + 1 = 27$ ✓. (Hệ số $1,3,3,1$ đến từ tam giác Pascal.)
- $a^3+b^3 = (a+b)(a^2-ab+b^2)$. Thử $a=2, b=1$: vế trái $8+1 = 9$; vế phải $3\\cdot(4-2+1) = 3\\cdot 3 = 9$ ✓.
- $a^3-b^3 = (a-b)(a^2+ab+b^2)$. Thử $a=3, b=1$: vế trái $27-1 = 26$; vế phải $2\\cdot(9+3+1) = 2\\cdot 13 = 26$ ✓.

### 4.4. Bốn ví dụ khai triển bằng hằng đẳng thức

1. $(x+4)^2 = x^2 + 8x + 16$ ($2\\cdot x\\cdot 4 = 8x$).
2. $(2x-3)^2 = (2x)^2 - 2\\cdot 2x\\cdot 3 + 3^2 = 4x^2 - 12x + 9$ (bình phương cả hệ số: $2x \\to 4x^2$).
3. $(5+y)(5-y) = 25 - y^2$.
4. $(x+3)^2 - (x-3)^2 = (x^2 + 6x + 9) - (x^2 - 6x + 9) = 12x$ — biểu thức trông phức tạp rút gọn rất gọn.

⚠ **Lỗi thường gặp #1 của cả đại số**: $(a+b)^2 \\neq a^2 + b^2$. Bị thiếu hạng tử giữa $2ab$. Phản ví dụ: $(3+4)^2 = 49$, nhưng $3^2+4^2 = 25$. $49 \\neq 25$ — đúng bằng phần $2ab = 24$ bị bỏ quên. Tương tự $\\sqrt{a^2+b^2} \\neq a+b$ (thử $a=3,b=4$: $\\sqrt{25}=5 \\neq 7$).

⚠ **Lỗi dấu trong $(a-b)^2$**: viết $a^2 - 2ab - b^2$ là **sai** — $b^2$ phải **dương** (bình phương luôn không âm). Và đừng nhầm $(a+b)(a-b)$ với $(a-b)^2$: cái đầu triệt tiêu hạng tử giữa ra $a^2-b^2$, cái sau có $-2ab$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao nhớ dấu trong $a^3-b^3$ và $a^3+b^3$?"* Mẹo "SOAP": với $a^3\\pm b^3$, ngoặc đầu **S**ame dấu ($a\\pm b$), ngoặc sau là $a^2$ **O**pposite dấu $ab$ **A**lways **P**lus $b^2$. Vd $a^3-b^3 = (a-b)(a^2+ab+b^2)$.
- *"7 hằng đẳng thức này lấy đâu ra?"* Tất cả chỉ là **khai triển phép nhân** rồi rút gọn — không phải công thức trên trời. $(a+b)^2$ chính là $(a+b)(a+b)$ nhân ra.

🔁 **Dừng lại tự kiểm tra**

1. Khai triển $(x-5)^2$.
2. Đúng/sai: $(x+3)^2 = x^2 + 9$?

<details><summary>Đáp án</summary>

1. $x^2 - 10x + 25$ (nhớ hạng tử giữa $-2\\cdot x\\cdot 5 = -10x$).
2. **Sai**. Đúng là $x^2 + 6x + 9$ — thiếu $6x$.

</details>

### 📝 Tóm tắt mục 4

- 7 hằng đẳng thức đều là khai triển phép nhân; chứng minh được bằng diện tích, verify bằng thay số (cả 2 vế).
- Cạm bẫy số 1: $(a+b)^2 = a^2+2ab+b^2$, **không** phải $a^2+b^2$ (thiếu hai ô $ab$).
- $a^2-b^2 = (a-b)(a+b)$ giúp tính nhẩm tích và phân tích nhân tử; mẹo "SOAP" cho $a^3\\pm b^3$.

---

## 5. Phân tích nhân tử (Factoring)

### 5.1. Là gì?

**Phân tích nhân tử** = biểu diễn một đa thức thành **tích** các đa thức "đơn giản hơn".

Ví dụ: $x^2 + 5x + 6 = (x + 2)(x + 3)$.

💡 **Trực giác — đi ngược chiều khai triển**: nếu khai triển là "nhân ra" $(x+2)(x+3) \\to x^2+5x+6$, thì phân tích nhân tử là **bài toán ngược**: cho $x^2+5x+6$, tìm lại $(x+2)(x+3)$. Khó hơn vì phải "đoán" — như mở khóa biết kết quả nhân nhưng phải tìm hai thừa số.

**Vì sao quan trọng?** Vì:
- Để giải phương trình: nếu $(x + 2)(x + 3) = 0$ thì $x = -2$ hoặc $x = -3$ (tích bằng 0 ⟺ một thừa số bằng 0).
- Để rút gọn phân thức: $(x^2 - 1)/(x - 1) = (x - 1)(x + 1)/(x - 1) = x + 1$.

### 5.2. 3 kỹ thuật cơ bản

**a) Đặt nhân tử chung**:
- $3x^2 + 6x = 3x(x + 2)$.
- $x^3 - x^2 = x^2(x - 1)$.

**b) Áp dụng hằng đẳng thức**:
- $x^2 - 9 = (x - 3)(x + 3)$ (hiệu 2 bình phương).
- $4x^2 + 12x + 9 = (2x + 3)^2$ (bình phương tổng).

**c) Phương pháp "tổng và tích"** cho $x^2 + bx + c$:
- Tìm 2 số $p, q$ sao cho $p + q = b$ và $p \\cdot q = c$.
- Khi đó $x^2 + bx + c = (x + p)(x + q)$.

**Ví dụ**: $x^2 + 5x + 6$. Tìm $p, q$: $p + q = 5, p \\cdot q = 6$. → $p = 2, q = 3$. → **$(x + 2)(x + 3)$**.

> **Mẹo tìm $p, q$ có hệ thống**: liệt kê các cặp số có tích $= c$, rồi chọn cặp có tổng $= b$. Với $pq = 6$: $(1,6), (2,3), (-1,-6), (-2,-3)$ → cặp tổng $5$ là $(2,3)$.

### 5.3. Bốn ví dụ phân tích (đủ các dạng)

**Ví dụ 1 — Đặt nhân tử chung**: $2x^3 - 4x^2 + 6x = 2x(x^2 - 2x + 3)$.

**Ví dụ 2 — Hiệu 2 bình phương**: $25x^2 - 49 = (5x - 7)(5x + 7)$.

**Ví dụ 3 — Tam thức bậc 2**: $x^2 - 7x + 12$. $p + q = -7, pq = 12$ → $p = -3, q = -4$. → $(x - 3)(x - 4)$.

**Ví dụ 4 — Kết hợp**: $x^3 + 8 = (x + 2)(x^2 - 2x + 4)$ (dùng $a^3 + b^3$ với $b = 2$).

Thêm hai dạng hay gặp:

**Ví dụ 5 — Tam thức hệ số dẫn đầu ≠ 1**: $2x^2 + 7x + 3$. Tìm 2 số tích $= 2\\cdot 3 = 6$, tổng $= 7$ → $(1, 6)$. Tách giữa: $2x^2 + x + 6x + 3 = x(2x+1) + 3(2x+1) = (2x+1)(x+3)$. Kiểm $x=1$: gốc $2+7+3 = 12$; $(3)(4) = 12$ ✓.

**Ví dụ 6 — Nhóm (grouping)**: $x^3 + x^2 + x + 1 = x^2(x+1) + 1(x+1) = (x+1)(x^2+1)$. Dùng khi có 4 hạng tử chia thành 2 nhóm có nhân tử chung.

### 5.4. Verify phân tích đúng

Nhân ngược lại phải ra đa thức ban đầu: $(x+2)(x+3) = x^2+5x+6$ ✓ — đó là cách kiểm tra mọi phân tích.

⚠ **Lỗi thường gặp**: quên **đặt nhân tử chung trước**. $2x^2-8x+6$ mà nhảy thẳng tìm tổng-tích sẽ rối; đặt 2 ra trước → $2(x^2-4x+3) = 2(x-1)(x-3)$. Luôn hỏi "có nhân tử chung không?" đầu tiên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Có phải đa thức nào cũng phân tích được không?"* Trên $\\mathbb{R}$ thì **không**. Vd $x^2+1$ không phân tích được thành tích bậc 1 hệ số thực (vì vô nghiệm thực — $\\Delta<0$). Phải lên số phức (Tier 03) mới tách được.
- *"Tổng-tích khi $c$ âm thì sao?"* Hai số $p, q$ **trái dấu**. Vd $x^2-x-6$: cần $p+q=-1, pq=-6$ → $p=-3, q=2$ → $(x-3)(x+2)$.

🔁 **Dừng lại tự kiểm tra**

1. Phân tích $x^2 - 16$.
2. Phân tích $3x^2 - 12$.

<details><summary>Đáp án</summary>

1. $(x-4)(x+4)$ (hiệu 2 bình phương).
2. Đặt 3 chung trước: $3(x^2-4) = 3(x-2)(x+2)$.

</details>

### 📝 Tóm tắt mục 5

- Phân tích nhân tử = viết đa thức thành **tích** (bài toán ngược của khai triển); kiểm bằng cách nhân ngược.
- Trình tự: (1) nhân tử chung → (2) hằng đẳng thức → (3) tổng-tích → (4) nhóm.
- Dùng để giải phương trình (tích = 0) và rút gọn phân thức.

---

## 6. Liên hệ với lập trình

💡 **Biểu thức toán = expression trong lập trình.** Một biểu thức như $2x^2 + 3x - 1$ dịch gần như nguyên xi sang code, với **một khác biệt cốt lõi về cú pháp**: toán cho viết \`2x\` (nhân ngầm), code **bắt buộc** dấu \`*\`.

| Toán | Go / hầu hết ngôn ngữ | Ghi chú |
|------|------------------------|---------|
| $2x$ | \`2*x\` | Nhân ngầm không tồn tại trong code |
| $x^2$ | \`x*x\` hoặc \`math.Pow(x,2)\` | Không có toán tử \`^\` cho lũy thừa trong Go (\`^\` là XOR!) |
| $2x^2 + 3x - 1$ | \`2*x*x + 3*x - 1\` | |
| $\\frac{a+b}{c}$ | \`(a+b)/c\` | Phải bọc ngoặc tử số |

\`\`\`go
// Đánh giá f(x) = 2x² + 3x − 1 — y hệt "công thức nấu ăn" ở mục 1.2
func f(x float64) float64 {
    return 2*x*x + 3*x - 1   // PEMDAS: lũy thừa (x*x) và nhân trước, cộng/trừ sau
}
// f(4) cho 2*16 + 12 - 1 = 43.0
\`\`\`

**Operator precedence trong code = PEMDAS.** Hầu hết ngôn ngữ tuân thủ "nhân/chia trước cộng/trừ", "trái sang phải cùng cấp" — giống hệt mục 2.1. Hai cạm bẫy khác nhau giữa toán và code:

- ⚠ **\`^\` không phải lũy thừa**: trong Go/C/Java, \`x^2\` là phép XOR bit, **không** phải $x^2$. Dùng \`x*x\` hoặc \`math.Pow\`.
- ⚠ **Chia nguyên**: \`5/2\` trong Go (cả hai số nguyên) cho \`2\`, không phải \`2.5\`. Trong toán $5/2 = 2.5$. Phải ép kiểu \`float64\`.

→ Phân phối, gom hạng tử, hằng đẳng thức cũng là cách compiler / hệ thống đại số máy tính (CAS như Wolfram, SymPy) **rút gọn biểu thức tự động** để tính nhanh hơn.

### 📝 Tóm tắt mục 6

- Biểu thức toán → expression code; khác biệt: code cần \`*\` tường minh, không có \`^\` cho lũy thừa (Go), cẩn thận chia nguyên.
- Operator precedence trong code = PEMDAS.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Đánh giá $2x^2 - 3x + 1$ tại $x = 4$.

**Bài 2**: Rút gọn $(3x + 2)(x - 1) - (x + 1)^2$.

**Bài 3**: Tính nhanh $(98)^2 - (2)^2$ bằng hằng đẳng thức.

**Bài 4**: Phân tích nhân tử: $x^2 - 10x + 25$.

**Bài 5**: Phân tích nhân tử: $2x^2 - 8x + 6$.

**Bài 6**: Phân tích nhân tử: $x^3 - 27$.

**Bài 7**: Tính theo PEMDAS: $-3^2 + (-3)^2 + 12 \\div 4 \\times 2$.

**Bài 8**: Khai triển $-2(x - 3)(x + 1)$.

**Bài 9**: Đánh giá $-x^2 + 2x - (x - 1)^2$ tại $x = -2$.

**Bài 10**: Phân tích nhân tử bằng nhóm: $x^3 + 2x^2 + 3x + 6$.

### Lời giải

**Bài 1**: $2(16) - 3(4) + 1 = 32 - 12 + 1$ = **21**.

**Bài 2**:
- $(3x + 2)(x - 1) = 3x^2 - 3x + 2x - 2 = 3x^2 - x - 2$.
- $(x + 1)^2 = x^2 + 2x + 1$.
- Hiệu $= 3x^2 - x - 2 - x^2 - 2x - 1$ = **$2x^2 - 3x - 3$**.

**Bài 3**: $a^2 - b^2 = (a-b)(a+b) = 96 \\times 100$ = **9600**.

**Bài 4**: Có dạng $a^2 - 2ab + b^2$ với $a = x, b = 5$. Vậy $(x - 5)^2$.

**Bài 5**: Đặt nhân tử chung 2: $2(x^2 - 4x + 3)$. Tìm $p+q=-4, pq=3$ → $p=-1, q=-3$. → **$2(x - 1)(x - 3)$**.

**Bài 6**: $a^3 - b^3$ với $a = x, b = 3$: $(x - 3)(x^2 + 3x + 9)$.

**Bài 7**: Theo PEMDAS (lũy thừa, rồi nhân/chia trái→phải, rồi cộng):
- $-3^2 = -(3^2) = -9$ (dấu trừ đơn áp **sau** lũy thừa).
- $(-3)^2 = 9$.
- $12 \\div 4 \\times 2 = (12\\div 4)\\times 2 = 3\\times 2 = 6$ (cùng cấp, trái→phải; **không** $12\\div 8$).
- Tổng: $-9 + 9 + 6 = \\mathbf{6}$.

**Bài 8**: Phân phối dấu $-2$ trước, rồi FOIL — hoặc FOIL trước rồi nhân $-2$:
- $(x-3)(x+1) = x^2 + x - 3x - 3 = x^2 - 2x - 3$.
- $-2(x^2 - 2x - 3) = \\mathbf{-2x^2 + 4x + 6}$. Kiểm $x=0$: gốc $-2(-3)(1) = 6$; kết quả $6$ ✓.

**Bài 9**: Bọc ngoặc số âm cẩn thận tại $x = -2$:
- $(x-1)^2 = (-2-1)^2 = (-3)^2 = 9$.
- $-x^2 = -(-2)^2 = -(4) = -4$ (nghĩa là $-(x^2)$, không phải $(-x)^2$).
- $2x = 2\\cdot(-2) = -4$.
- Tổng: $-4 + (-4) - 9 = \\mathbf{-17}$.

**Bài 10**: Nhóm 2+2 hạng tử:
- $x^3 + 2x^2 + 3x + 6 = x^2(x + 2) + 3(x + 2) = \\mathbf{(x + 2)(x^2 + 3)}$.
- Kiểm $x=1$: gốc $1+2+3+6 = 12$; $(3)(4) = 12$ ✓. ($x^2 + 3$ không phân tích tiếp trên $\\mathbb{R}$ — tổng hai bình phương.)

---

## 8. Bài tiếp theo

[Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/).

## 📝 Tổng kết

1. **Biến** = số chưa biết / tổng quát / phụ thuộc / chỉ số. Cho phép tổng quát hóa và giải phương trình; phân biệt với **hằng** và **tham số**.
2. **PEMDAS**: Ngoặc → Lũy thừa → Nhân/Chia (trái→phải) → Cộng/Trừ (trái→phải); bọc ngoặc khi thay số âm.
3. **Gom hạng tử đồng dạng** (đếm tiền cùng mệnh giá) và **phân phối** $a(b+c)=ab+ac$ (đếm diện tích), FOIL cho tích hai ngoặc.
4. **Đa thức**: $a_n x^n + \\ldots + a_0$. Bậc = mũ cao nhất; bậc tích = tổng bậc.
5. **7 hằng đẳng thức**: chứng minh bằng diện tích, verify bằng số; nền tảng tính nhanh và phân tích nhân tử. Cạm bẫy $(a+b)^2 \\neq a^2+b^2$.
6. **Phân tích nhân tử**: nhân tử chung → hằng đẳng thức → tổng-tích → nhóm; là bài toán ngược của khai triển.
7. **Liên hệ code**: biểu thức toán = expression; khác cú pháp (\`*\` tường minh, \`^\` không phải lũy thừa, chia nguyên).
`;
