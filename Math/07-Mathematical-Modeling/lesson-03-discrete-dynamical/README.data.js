// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-03-discrete-dynamical/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Mô hình rời rạc (Phương trình sai phân)

## Mục tiêu

- Mô hình hóa khi thời gian đi theo **bước rời rạc** (năm, tháng, thế hệ): dãy truy hồi $x_{n+1} = f(x_n)$.
- Giải **mô hình tuyến tính** $x_{n+1} = a\\cdot x_n + b$ bằng công thức đóng; áp dụng lãi kép, tiết kiệm định kỳ, dân số rời rạc.
- Hiểu **điểm cân bằng (fixed point)** và **ổn định** — khi nào dãy hội tụ, dao động, hay phân kỳ.
- Khám phá **mô hình logistic rời rạc** $x_{n+1} = r\\cdot x_n(1-x_n)$: từ hội tụ → chu kỳ → hỗn loạn (chaos).
- So sánh mô hình **rời rạc ↔ liên tục** (ODE ở [Lesson 04](../lesson-04-continuous-ode-models/)).

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/).
- [T4 L01 — Dãy số & giới hạn](../../04-Calculus-1var/lesson-01-sequences-limits/) (hội tụ của dãy).
- [T1 — Lũy thừa, cấp số nhân](../../01-Arithmetic-Algebra/lesson-06-powers-roots-logs/).

---

## 1. Phương trình sai phân là gì?

💡 **Trực giác / Hình dung — đời sống đi theo nhịp.** Nhiều hệ không thay đổi *liên tục* mà theo **nhịp rời rạc**: lãi ngân hàng nhập gốc mỗi *năm*, côn trùng sinh sản mỗi *thế hệ*, dân số đếm mỗi *kỳ điều tra*. Mô hình tự nhiên là: "trạng thái kỳ sau = một hàm của trạng thái kỳ này", $x_{n+1} = f(x_n)$. Biết $x_0$, ta "lăn" công thức để ra $x_1, x_2, x_3, \\dots$

> 📐 **Định nghĩa đầy đủ — Phương trình sai phân (difference equation)**
>
> **(a) Là gì**: Một quy tắc xác định mỗi phần tử của dãy theo (các) phần tử trước: $x_{n+1} = f(x_n)$ (bậc 1) hoặc $x_{n+1} = f(x_n, x_{n-1})$ (bậc 2, vd Fibonacci). "Giải" = tìm công thức $x_n$ theo $n$ (nghiệm đóng) hoặc mô tả hành vi dài hạn. Cần **điều kiện đầu** $x_0$ để xác định dãy cụ thể.
>
> **(b) Vì sao cần — và khác ODE chỗ nào**: ODE ([T6 L07](../../06-Advanced/lesson-07-differential-equations/)) mô tả thay đổi *liên tục* ($dx/dt$). Nhưng khi dữ liệu/sự kiện đến *theo bước* (mỗi năm, mỗi thế hệ, mỗi vòng lặp thuật toán), phương trình sai phân tự nhiên và chính xác hơn — không cần giả định "thời gian liên tục". Đây cũng là ngôn ngữ của **thuật toán** (mỗi vòng lặp cập nhật trạng thái) và **tài chính** (lãi nhập kỳ).
>
> **(c) Ví dụ số (4 ví dụ)**:
> - Lãi kép 5%/năm, $x_0 = 1000$: $x_{n+1} = 1.05\\cdot x_n$ → 1000, 1050, 1102.5, 1157.6, ...
> - Cấp số cộng: $x_{n+1} = x_n + 3$, $x_0 = 2$ → 2, 5, 8, 11, ...
> - Phân rã rời rạc: $x_{n+1} = 0.8\\cdot x_n$, $x_0 = 100$ → 100, 80, 64, 51.2, ... → 0.
> - Fibonacci (bậc 2): $x_{n+1} = x_n + x_{n-1}$, $x_0 = x_1 = 1$ → 1, 1, 2, 3, 5, 8, 13, ...

### 1.1 Quỹ đạo (orbit) — "lăn" công thức từng bước

💡 **Trực giác — trạng thái sau = hàm của trạng thái trước.** Một hệ động lực rời rạc giống một **bàn cờ chỉ có một quân**: vị trí của quân ở nước đi sau **chỉ phụ thuộc** vị trí hiện tại, theo đúng một luật cố định $f$. Bạn không cần biết quân *đã đi qua* những ô nào — chỉ cần ô **hiện tại** là đủ để tính ô tiếp theo. Tính chất này gọi là **không nhớ (memoryless)**: tương lai chỉ phụ thuộc hiện tại, không phụ thuộc quá khứ.

Dãy các giá trị $x_0, x_1, x_2, \\dots$ sinh ra khi lăn $f$ gọi là **quỹ đạo (orbit)** của $x_0$. Quá trình lăn:

\`\`\`
  x₀ ──f──► x₁ ──f──► x₂ ──f──► x₃ ──f──► ...
  cho       f(x₀)     f(x₁)     f(x₂)
\`\`\`

Mỗi mũi tên là **một lần áp dụng** $f$. Viết gọn: $x_n = f^{(n)}(x_0)$ — "áp dụng $f$ đúng $n$ lần" (lưu ý $f^{(n)}$ là *lặp $n$ lần*, **không** phải lũy thừa $f^n$ hay đạo hàm).

**Walk-through 1 — tăng trưởng hình học (geometric growth)**: $f(x) = 1.5x$, $x_0 = 2$ (mỗi bước nhân 1.5).

| $n$ | Tính $x_{n+1} = 1.5\\cdot x_n$ | $x_n$ |
|---|---|---|
| 0 | — (cho) | 2 |
| 1 | $1.5\\cdot 2$ | 3 |
| 2 | $1.5\\cdot 3$ | 4.5 |
| 3 | $1.5\\cdot 4.5$ | 6.75 |
| 4 | $1.5\\cdot 6.75$ | 10.125 |

→ Tăng **không chặn**: $x_n = 2\\cdot 1.5^n \\to +\\infty$. Đây là dạng "bùng nổ" của lãi kép / dân số không giới hạn.

**Walk-through 2 — logistic hội tụ (convergence)**: $f(x) = 2.5\\,x(1-x)$, $x_0 = 0.1$.

| $n$ | Tính $x_{n+1} = 2.5\\,x_n(1-x_n)$ | $x_n$ |
|---|---|---|
| 0 | — | 0.1000 |
| 1 | $2.5\\cdot 0.1\\cdot 0.9$ | 0.2250 |
| 2 | $2.5\\cdot 0.225\\cdot 0.775$ | 0.4359 |
| 3 | $2.5\\cdot 0.4359\\cdot 0.5641$ | 0.6147 |
| 4 | $2.5\\cdot 0.6147\\cdot 0.3853$ | 0.5921 |
| 5 | $2.5\\cdot 0.5921\\cdot 0.4079$ | 0.6038 |

→ Đang **xoắn vào** quanh $x^* = 1 - 1/2.5 = 0.6$ (lắc nhẹ trên/dưới vì $f'(x^*) = 2-r = -0.5 < 0$), biên độ co dần → hội tụ về 0.6.

**Walk-through 3 — dao động (oscillation, không hội tụ một điểm)**: $f(x) = 3.2\\,x(1-x)$, $x_0 = 0.5$.

| $n$ | $x_n$ | $n$ | $x_n$ |
|---|---|---|---|
| 0 | 0.5000 | 5 | 0.7995 |
| 1 | 0.8000 | 6 | 0.5129 |
| 2 | 0.5120 | 7 | 0.7995 |
| 3 | 0.7995 | 8 | 0.5130 |
| 4 | 0.5130 | 9 | 0.7995 |

→ Sau ít bước, dãy **khoá vào chu kỳ 2** (period-2): lắc qua lại giữa $\\approx 0.513$ và $\\approx 0.800$, **không** về một điểm. Lý do: $r = 3.2 > 3$ nên $x^* = 1-1/3.2 = 0.6875$ **mất ổn định** (sẽ giải thích ở mục 4).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phương trình sai phân với ODE — chọn cái nào?"* Hỏi: hệ cập nhật *theo bước* hay *liên tục*? Dân số côn trùng một mùa/năm → rời rạc. Phóng xạ (nguyên tử phân rã bất kỳ lúc nào) → liên tục (ODE). Nhiều khi cả hai dùng được; rời rạc dễ mô phỏng trên máy tính (chỉ là vòng lặp).
- *"'Bậc' của phương trình sai phân là gì?"* Là khoảng lùi xa nhất: $x_{n+1} = f(x_n)$ là bậc 1; Fibonacci nhìn lại 2 bước → bậc 2. Bậc $k$ cần $k$ điều kiện đầu.
- *"Quỹ đạo có nhất thiết phải hội tụ không?"* **Không.** Bốn kết cục điển hình: (1) **hội tụ** về một điểm cân bằng (vd $2.5x(1-x)$ → 0.6); (2) **phân kỳ** ra $\\pm\\infty$ (vd $1.5x$); (3) **chu kỳ** lắc qua hữu hạn giá trị (vd $3.2x(1-x)$); (4) **hỗn loạn** không lặp (vd $3.9x(1-x)$). Mục 3–4 sẽ phân loại theo điểm cân bằng và độ dốc $f'$.

🔁 **Dừng lại tự kiểm tra**

1. Cho $x_{n+1} = 0.5x_n + 1$, $x_0 = 0$. Lăn 4 bước. Dãy có vẻ tiến tới đâu?

<details><summary>Đáp án</summary>

$x_1 = 0.5\\cdot 0 + 1 = 1$; $x_2 = 0.5\\cdot 1 + 1 = 1.5$; $x_3 = 0.5\\cdot 1.5 + 1 = 1.75$; $x_4 = 0.5\\cdot 1.75 + 1 = 1.875$. Dãy tăng dần và **tiến về 2** (chính là điểm cân bằng $x^* = 1/(1-0.5) = 2$ — sẽ học công thức ở mục 2).

</details>

📝 **Tóm tắt mục 1**

- Phương trình sai phân: $x_{n+1} = f(x_n)$ — trạng thái kỳ sau theo kỳ này; "lăn" từ $x_0$.
- Dùng khi hệ cập nhật theo *bước* (năm, thế hệ, vòng lặp); ODE dùng cho thay đổi liên tục.
- Bậc = khoảng lùi xa nhất; cần đủ điều kiện đầu.
- Quỹ đạo (orbit) = dãy $x_0, x_1, \\dots$ sinh ra khi lăn $f$; tính chất "không nhớ" (tương lai chỉ phụ thuộc hiện tại). Bốn kết cục: hội tụ / phân kỳ / chu kỳ / hỗn loạn.

---

## 2. Mô hình tuyến tính xₙ₊₁ = a·xₙ + b

💡 **Trực giác.** Mỗi bước: nhân với $a$ (tăng trưởng/co lại theo tỉ lệ) rồi cộng $b$ (lượng thêm cố định). Lãi kép thuần là $b = 0$; tiết kiệm có gửi thêm đều đặn là $b > 0$.

### 2.1 Trường hợp thuần (b = 0): cấp số nhân

$x_{n+1} = a\\cdot x_n$ → nghiệm đóng **$x_n = x_0\\cdot a^n$**.

**Walk-through — lãi kép**: $x_0 = 1000$, $a = 1.05$ (lãi 5%/năm).
- $x_n = 1000\\cdot(1.05)^n$. Sau 10 năm: $x_{10} = 1000\\cdot 1.05^{10} = 1000\\cdot 1.6289 =$ **1628.9**.
- Kiểm bằng lăn tay: $x_1 = 1050$, $x_2 = 1102.5$ — khớp $1000\\cdot 1.05^2 = 1102.5$ ✓.

### 2.2 Trường hợp tổng quát (b ≠ 0)

$x_{n+1} = a\\cdot x_n + b$ ($a \\neq 1$). Tìm **điểm cân bằng** $x^*$ (giá trị không đổi: $x^* = a\\cdot x^* + b$):
$$x^* = \\frac{b}{1 - a}$$
Đặt $y_n = x_n - x^*$ (độ lệch khỏi cân bằng) → $y_{n+1} = a\\cdot y_n$ (thuần!) → $y_n = y_0\\cdot a^n$. Suy ra **nghiệm đóng**:
$$x_n = (x_0 - x^*)\\cdot a^n + x^*, \\quad \\text{với } x^* = \\frac{b}{1 - a}$$

**Walk-through — tiết kiệm có gửi thêm**: $x_0 = 1000$, lãi 5% và gửi thêm 100 mỗi năm → $x_{n+1} = 1.05\\cdot x_n + 100$.
- $x^* = 100/(1 - 1.05) = 100/(-0.05) =$ **$-2000$** (điểm cân bằng âm, không đạt được — chỉ là "mỏ neo" của công thức).
- $x_n = (1000 - (-2000))\\cdot 1.05^n + (-2000) =$ **$3000\\cdot(1.05)^n - 2000$**.
- Kiểm: $n=0$ → $3000 - 2000 = 1000$ ✓. $n=1$ → $3000\\cdot 1.05 - 2000 = 3150 - 2000 = 1150$; lăn tay: $1.05\\cdot 1000 + 100 = 1150$ ✓.
- Sau 10 năm: $3000\\cdot 1.6289 - 2000 = 4886.7 - 2000 =$ **2886.7** (so với 1628.9 nếu không gửi thêm — phần gửi thêm đóng góp đáng kể).

### 2.3 Bốn mô hình thực tế ($x_{n+1} = a\\,x_n + b$)

Dạng tuyến tính bao trùm nhiều bài toán đời sống — chỉ cần đọc ra $a$ và $b$:

**Mô hình 1 — lãi kép thuần (compound interest)**: gửi 1 lần, không rút. $a = 1 + i$ (lãi suất $i$), $b = 0$.
- Gửi 1000, lãi 6%/năm: $x_{n+1} = 1.06x_n$ → $x_n = 1000\\cdot 1.06^n$. Sau 12 năm: $1000\\cdot 1.06^{12} = 1000\\cdot 2.012 =$ **2012** (gấp đôi — "quy tắc 72": $72/6 = 12$ năm để gấp đôi ✓).

**Mô hình 2 — dân số rời rạc có nhập cư (population with immigration)**: mỗi năm dân số tự nhân $a$ rồi cộng $b$ người nhập cư.
- $a = 1.02$ (tăng 2%/năm), nhập cư $b = 50$ nghìn, $x_0 = 1000$ nghìn: $x_{n+1} = 1.02x_n + 50$.
- $x^* = 50/(1-1.02) = 50/(-0.02) = -2500$ (âm, không đạt được; $a>1$ nên dân số chạy lên $+\\infty$).
- $x_n = (1000+2500)\\cdot 1.02^n - 2500 = 3500\\cdot 1.02^n - 2500$. Sau 20 năm: $3500\\cdot 1.486 - 2500 = 5200 - 2500 =$ **2700** nghìn.

**Mô hình 3 — khoản vay trả góp (loan amortization)**: nợ mỗi tháng cộng lãi rồi trừ tiền trả $p$. $a = 1+i$, $b = -p$.
- Vay 100 triệu, lãi 1%/tháng, trả 5 triệu/tháng: $x_{n+1} = 1.01x_n - 5$.
- $x^* = -5/(1-1.01) = -5/(-0.01) = 500$ (triệu). Vì $x_0 = 100 < 500 = x^*$ và $a>1$, số hạng $(x_0 - x^*)a^n = -400\\cdot 1.01^n$ ngày càng âm → **nợ giảm dần về 0** (trả hết được). Nếu trả quá ít ($p$ nhỏ) khiến $x^* < x_0$... thực ra cần $p > i\\cdot x_0$ để nợ giảm: $5 > 0.01\\cdot 100 = 1$ ✓.

**Mô hình 4 — phân rã có bổ sung (decay with input)**: thuốc trong máu — mỗi giờ cơ thể thải tỉ lệ, rồi truyền thêm liều cố định.
- Còn lại 70% mỗi giờ ($a = 0.7$), truyền thêm $b = 30$ mg/giờ, $x_0 = 0$: $x_{n+1} = 0.7x_n + 30$.
- $x^* = 30/(1-0.7) = 30/0.3 = 100$ mg. Vì $|a| = 0.7 < 1$ → **hội tụ về 100 mg** (nồng độ ổn định — "steady state" của thuốc). $x_1 = 30$, $x_2 = 0.7\\cdot 30+30 = 51$, $x_3 = 0.7\\cdot 51+30 = 65.7$, ... → 100.

**Sơ đồ bậc thang (stair-step) — hội tụ về cân bằng** ($x_{n+1} = 0.5x_n + 4$, $x^* = 8$): vẽ $y = f(x) = 0.5x+4$ và đường chéo $y = x$; lăn = đi ngang tới $y=x$ rồi đi dọc tới $f$:

\`\`\`
  y
  |                      y = x
12+                    ╱
  |          y=0.5x+4 ╱
 9+ ─ ─ ─ ─ ─ ─╳─────╱──── (f và y=x cắt ở x*=8)
  |          ╱│   ╱
 8+ ──────╳──┼──╱   ← cân bằng x* = 8
  |     ╱ │  │╱
 6+ ──╳──┼──╱
  |  │   │ ╱
  +──┼───┼╱──────────────── x
     6   8   x₀
  Bậc thang hội tụ: x₀ → 6 → 7 → 7.5 → ... → 8 (các bậc nhỏ dần vì |f'|=0.5<1)
\`\`\`

❓ **Câu hỏi tự nhiên của người đọc**

- *"Điểm cân bằng âm $-2000$ nghĩa là gì khi tiền không thể âm?"* $x^*$ ở đây là **giá trị toán học** mà dãy sẽ tiến tới *nếu* $a < 1$; với $a = 1.05 > 1$ dãy chạy *ra xa* $x^*$ (lên $+\\infty$). $x^*$ vẫn hữu ích vì nó cho công thức đóng gọn — không cần "đạt được" mới có ý nghĩa.
- *"Vì sao đổi biến $y_n = x_n - x^*$ lại biến mất số hạng b?"* Vì $x^*$ "hấp thụ" $b$: $y_{n+1} = x_{n+1} - x^* = (ax_n+b) - (ax^*+b) = a(x_n - x^*) = a\\cdot y_n$. Số hạng cố định $b$ triệt tiêu vì cả $x_n$ và $x^*$ đều có nó.

⚠ **Lỗi thường gặp — dùng công thức cân bằng $x^* = b/(1-a)$ khi $a = 1$.** Khi $a = 1$, mẫu $1-a = 0$, công thức vô nghĩa. Lúc đó $x_{n+1} = x_n + b$ là **cấp số cộng**: $x_n = x_0 + n\\cdot b$ (tăng đều mãi, không có cân bằng hữu hạn). Phản ví dụ: $x_{n+1} = x_n + 3$ → $x_n = x_0 + 3n$, không hội tụ.

🔁 **Dừng lại tự kiểm tra**

1. Giải $x_{n+1} = 0.5\\cdot x_n + 4$ với $x_0 = 10$. Tìm $x^*$ và công thức $x_n$. Dãy tiến tới đâu?

<details><summary>Đáp án</summary>

$x^* = 4/(1-0.5) = 8$. $x_n = (10-8)\\cdot 0.5^n + 8 =$ **$2\\cdot(0.5)^n + 8$**. Vì $|a| = 0.5 < 1$, $(0.5)^n \\to 0$ → **$x_n \\to 8$** (hội tụ về cân bằng). Kiểm: $x_1 = 0.5\\cdot 10+4 = 9$; công thức: $2\\cdot 0.5+8 = 9$ ✓.

</details>

### 📝 Tóm tắt mục 2

- $x_{n+1} = a\\cdot x_n$ ($b=0$): $x_n = x_0\\cdot a^n$ (cấp số nhân — lãi kép, phân rã).
- $x_{n+1} = a\\cdot x_n + b$ ($a\\neq 1$): $x^* = b/(1-a)$, $x_n = (x_0-x^*)\\cdot a^n + x^*$.
- $a = 1$: cấp số cộng $x_n = x_0 + nb$ (không có cân bằng hữu hạn).

---

## 3. Điểm cân bằng & ổn định

💡 **Trực giác — viên bi trong bát hay trên đồi.** Điểm cân bằng $x^*$ là chỗ dãy "đứng yên" ($x_{n+1} = x_n$). Nhưng có hai loại: **ổn định** (như viên bi đáy bát — đẩy nhẹ rồi nó quay về) và **không ổn định** (viên bi đỉnh đồi — đẩy nhẹ là lăn đi mất). Câu hỏi then chốt: nếu bắt đầu *gần* $x^*$, dãy tiến *về* hay chạy *ra xa* $x^*$?

> 📐 **Định nghĩa đầy đủ — Điểm cân bằng & tính ổn định**
>
> **(a) Là gì**: Điểm cân bằng (fixed point) $x^*$ thỏa $f(x^*) = x^*$ — đưa vào ra chính nó. $x^*$ **ổn định** nếu mọi dãy bắt đầu đủ gần $x^*$ sẽ hội tụ về $x^*$; **không ổn định** nếu chúng chạy ra xa.
>
> **(b) Vì sao cần**: Hành vi *dài hạn* của hệ thường được quyết định bởi các điểm cân bằng và tính ổn định của chúng — đó là "đích đến" mà ta quan tâm hơn là từng giá trị $x_n$. Dân số ổn định ở mức nào? Giá thị trường có hội tụ về điểm cân bằng không?
>
> **(c) Tiêu chí ổn định (bậc 1)**: $x^*$ ổn định khi **$|f'(x^*)| < 1$** (độ dốc của $f$ tại $x^*$ nhỏ hơn 1 về trị tuyệt đối); không ổn định khi $|f'(x^*)| > 1$. Với mô hình tuyến tính $f(x) = ax+b$, $f' = a$ → **ổn định $\\iff |a| < 1$**.
>
> **Ví dụ số (4 ví dụ)**:
> - $x_{n+1} = 0.5x_n + 4$: $x^* = 8$, $f' = 0.5$, $|0.5| < 1$ → **ổn định**, hội tụ về 8.
> - $x_{n+1} = 1.05x_n + 100$: $x^* = -2000$, $f' = 1.05 > 1$ → **không ổn định**, chạy ra xa.
> - $x_{n+1} = -0.7x_n + 3$: $x^* = 3/1.7 \\approx 1.76$, $|-0.7| < 1$ → ổn định nhưng **dao động** ($a < 0$ → đổi dấu mỗi bước, xoắn vào $x^*$).
> - $x_{n+1} = -1.2x_n$: $x^* = 0$, $|-1.2| > 1$ → không ổn định, **dao động phân kỳ** (biên độ tăng, đổi dấu).

### 3.1 Quy trình tìm điểm cân bằng + kiểm ổn định — 2 bước

> **Bước 1 — tìm $x^*$**: giải phương trình $f(x^*) = x^*$ (thay $x_{n+1} = x_n = x^*$). Có thể có **nhiều** nghiệm (vd logistic có 2).
>
> **Bước 2 — kiểm ổn định**: tính $f'(x)$, thay $x = x^*$. So $|f'(x^*)|$ với 1:
> - $|f'(x^*)| < 1$ → **ổn định** (hút về). Thêm: $0 < f' < 1$ tiến *một phía*; $-1 < f' < 0$ *dao động* xoắn vào.
> - $|f'(x^*)| > 1$ → **không ổn định** (đẩy ra).
> - $|f'(x^*)| = 1$ → **biên** (ngưỡng — cần phân tích sâu hơn, thường là chỗ đổi hành vi).

**Walk-through A — mô hình phi tuyến $f(x) = \\sqrt{x + 6}$** (vd: dãy lặp căn).
- Bước 1: $x^* = \\sqrt{x^* + 6} \\Rightarrow (x^*)^2 = x^* + 6 \\Rightarrow (x^*)^2 - x^* - 6 = 0 \\Rightarrow (x^*-3)(x^*+2)=0$. Nghiệm $x^* = 3$ hoặc $x^* = -2$. Vì căn cho ra $\\ge 0$, chỉ $x^* = 3$ đạt được.
- Bước 2: $f'(x) = \\dfrac{1}{2\\sqrt{x+6}}$. Tại $x^* = 3$: $f'(3) = \\dfrac{1}{2\\sqrt{9}} = \\dfrac{1}{6} \\approx 0.167$. $|0.167| < 1$ → **ổn định** (tiến một phía vì $f' > 0$).
- Kiểm lăn từ $x_0 = 0$: $x_1 = \\sqrt{6} = 2.449$; $x_2 = \\sqrt{8.449} = 2.907$; $x_3 = \\sqrt{8.907} = 2.984$; → **→ 3** ✓.

**Walk-through B — mô hình Ricker (sinh thái) $f(x) = x\\,e^{r(1-x)}$ với $r = 1.5$.**
- Bước 1: $x^* = x^* e^{r(1-x^*)}$. Bỏ nghiệm $x^*=0$, chia 2 vế cho $x^*$: $1 = e^{r(1-x^*)} \\Rightarrow r(1-x^*) = 0 \\Rightarrow x^* = 1$.
- Bước 2: $f'(x) = e^{r(1-x)} + x\\cdot e^{r(1-x)}\\cdot(-r) = e^{r(1-x)}(1 - rx)$. Tại $x^* = 1$: $e^{r\\cdot 0}(1 - r\\cdot 1) = 1\\cdot(1 - 1.5) = -0.5$. $|-0.5| < 1$ → **ổn định** (dao động xoắn vào vì $f' < 0$). (Với $r > 2$ thì $|f'| = |1-r| > 1$ → mất ổn định, sinh chu kỳ — giống logistic.)

### 3.2 Sơ đồ mạng nhện (cobweb diagram)

💡 **Trực giác.** Cobweb là cách **vẽ quỹ đạo** trên cùng một hình với hai đường: đồ thị $y = f(x)$ và đường chéo $y = x$. Quy tắc lăn:
1. Từ $x_n$ trên trục hoành, đi **dọc** lên gặp đường cong $f$ → cao độ chính là $x_{n+1} = f(x_n)$.
2. Đi **ngang** sang gặp đường chéo $y = x$ → hoành độ giờ thành $x_{n+1}$ (chuyển output thành input mới).
3. Lặp lại. Quỹ đạo vẽ thành đường gấp khúc giống **mạng nhện**.

**Cobweb hội tụ** (độ dốc $|f'| < 1$ — xoắn *vào* $x^*$, $f' < 0$):

\`\`\`
   y                          y = x
   |                        ╱
   |        ┌──────────────╳ ← x* (f cắt y=x)
   |        │  ╱╲     ╱╲   ╱
   |        │ ╱  ╲   ╱  ╲ ╱   y = f(x) dốc xuống
   |        │╱    ╲ ╱    ╳
   |        ╳      ╳    ╱ ╲
   |       ╱│     ╱│   ╱   ╲ ← các vòng xoắn nhỏ dần
   +──────┼──────┼───┼──────── x
         x₀     x₂  x*  ...
   Mạng nhện cuộn VÀO x*  →  HỘI TỤ (ổn định)
\`\`\`

**Cobweb phân kỳ** (độ dốc $|f'| > 1$ — xoắn *ra xa* $x^*$):

\`\`\`
   y                              y = x
   |                            ╱
   |                  ╱╲       ╱
   |   y = f(x) dốc  ╱  ╲     ╱
   |   (|f'|>1)     ╱    ╲   ╳ ← x*
   |              ╱      ╲ ╱ ╲
   |             ╳        ╳   ╲
   |            ╱ ╲      ╱ ╲   ╲  ← vòng xoắn TO dần
   +───────────┼───┼────┼───┼──── x
              ...  x₂  x*  x₀
   Mạng nhện bung RA khỏi x*  →  PHÂN KỲ (không ổn định)
\`\`\`

**Đọc cobweb**: độ dốc của $f$ tại chỗ cắt $y=x$ quyết định tất cả. Dốc thoải ($|f'|<1$) → spiral cuộn vào; dốc đứng ($|f'|>1$) → bung ra. Dấu của $f'$: dương → bậc thang (staircase) tiến một phía; âm → mạng nhện (spiral) lắc qua lại. Đây chính là minh họa hình học của tiêu chí $|f'(x^*)| < 1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao điều kiện là $|f'| < 1$?"* Gần $x^*$, đặt $y_n = x_n - x^*$; xấp xỉ tuyến tính $f(x) \\approx f(x^*) + f'(x^*)(x-x^*)$ cho $y_{n+1} \\approx f'(x^*)\\cdot y_n$. Đây là cấp số nhân công bội $f'(x^*)$: độ lệch co lại ($\\to 0$) khi $|f'| < 1$, phình ra khi $|f'| > 1$. (Liên hệ tuyến tính hóa ở [L01 mục 3](../lesson-01-modeling-cycle/).)
- *"Dấu của a/f′ ảnh hưởng gì?"* Trị tuyệt đối quyết định ổn định; **dấu** quyết định *kiểu*: $a > 0$ → tiến *một phía* (đơn điệu); $a < 0$ → **dao động** quanh $x^*$ (lắc qua lắc lại mỗi bước).

⚠ **Lỗi thường gặp — quên xét dấu, chỉ nhìn độ lớn.** $|a| = 0.7$ cho ổn định, nhưng $a = +0.7$ (tiến mượt) và $a = -0.7$ (xoắn dao động) cho *hình dạng* dãy rất khác. Khi vẽ/diễn giải phải để ý dấu.

⚠ **Lỗi thường gặp — kết luận ổn định từ vài bước đầu trông "có vẻ tiến về $x^*$".** Quan sát $x_1, x_2$ gần $x^*$ rồi vội kết "ổn định" là sai — phải kiểm $|f'(x^*)|$. Phản ví dụ: $x_{n+1} = 1.2x_n - 1$ có $x^* = 5$; bắt đầu $x_0 = 4.99$ (rất gần 5) trông như đứng yên vài bước, nhưng độ lệch $y_n = -0.01\\cdot 1.2^n$ phình ra: sau 30 bước $|y_{30}| = 0.01\\cdot 1.2^{30} \\approx 2.4$ → đã chạy xa. **Vài bước đầu không nói lên hành vi dài hạn**; chỉ $|f'(x^*)|$ mới quyết định.

⚠ **Lỗi thường gặp — chỉ tìm một điểm cân bằng rồi bỏ qua các điểm khác.** Hệ phi tuyến thường có **nhiều** điểm cân bằng (logistic: $x^*=0$ và $x^*=1-1/r$). Phải xét *tất cả*, vì quỹ đạo tiến về điểm nào tuỳ $x_0$ và tuỳ điểm nào ổn định. Vd logistic $r=2$: $x^*=0$ có $f'(0)=r=2>1$ (đẩy ra) còn $x^*=0.5$ có $f'=0$ (hút vào) — bỏ sót $x^*=0$ thì không hiểu vì sao dãy *rời* khỏi 0.

🔁 **Dừng lại tự kiểm tra**

1. Xét $x_{n+1} = 1.2\\cdot x_n - 1$. Tìm $x^*$, xét ổn định, mô tả hành vi nếu $x_0 = 4$ và nếu $x_0 = 5$.

<details><summary>Đáp án</summary>

$x^* = b/(1-a) = (-1)/(1-1.2) = (-1)/(-0.2) =$ **5**. $f' = 1.2 > 1$ → **không ổn định**.
- $x_0 = 5 = x^*$ → dãy đứng yên tại 5 mãi (đúng cân bằng).
- $x_0 = 4$ (lệch $-1$ khỏi $x^*$) → $y_n = (4-5)\\cdot 1.2^n = -1.2^n$ → chạy ra $-\\infty$: $x_1 = 1.2\\cdot 4-1 = 3.8$, $x_2 = 3.56$, ... giảm dần ra xa 5. Cân bằng không ổn định: lệch nhỏ cũng bị khuếch đại.

</details>

### 📝 Tóm tắt mục 3

- Điểm cân bằng: $f(x^*) = x^*$. Ổn định $\\iff |f'(x^*)| < 1$ (tuyến tính: $|a| < 1$).
- $|f'|$ quyết định ổn định; *dấu* quyết định kiểu: dương → đơn điệu (bậc thang), âm → dao động (mạng nhện).
- Quy trình 2 bước: (1) giải $f(x^*)=x^*$ (có thể nhiều nghiệm); (2) tính $|f'(x^*)|$ so với 1.
- **Cobweb diagram**: vẽ $y=f(x)$ và $y=x$, lăn dọc-ngang; cuộn vào → hội tụ, bung ra → phân kỳ.
- Hành vi dài hạn của hệ do *tất cả* các điểm cân bằng + ổn định chi phối; vài bước đầu không nói lên hành vi dài hạn.

---

## 4. Mô hình logistic rời rạc — từ trật tự đến hỗn loạn

💡 **Trực giác.** Mô hình mũ $x_{n+1} = r\\cdot x_n$ tăng vô hạn — phi thực tế (tài nguyên có hạn, đã bàn ở [L01](../lesson-01-modeling-cycle/)). Logistic thêm "phanh" khi đông đúc: nhân thêm $(1 - x_n)$, nhỏ dần khi $x_n$ tiến tới 1 (sức chứa chuẩn hóa). Đơn giản đến bất ngờ — nhưng sinh ra hành vi cực kỳ phong phú.

**Mô hình** ($x$ chuẩn hóa trong $[0,1]$, $r > 0$):
$$x_{n+1} = r\\cdot x_n\\cdot(1 - x_n)$$

**Điểm cân bằng**: $x^* = r\\cdot x^*(1-x^*)$ → $x^* = 0$ hoặc **$x^* = 1 - 1/r$**.
**Ổn định**: $f'(x) = r(1 - 2x)$. Tại $x^* = 1-1/r$: $f' = r(1 - 2(1-1/r)) =$ **$2 - r$**. Ổn định $\\iff |2-r| < 1 \\iff$ **$1 < r < 3$**.

Hành vi đổi theo $r$ (bắt đầu $x_0 = 0.3$):

| $r$ | Hành vi | Mô tả |
|---|---------|-------|
| 0.5 | → 0 | Tuyệt chủng ($r < 1$: sinh không bù chết) |
| 2.0 | → 0.5 | Hội tụ về $x^* = 1-1/2 = 0.5$ |
| 2.8 | → 0.643 | Hội tụ về $x^* = 1-1/2.8 \\approx 0.643$ (chậm hơn) |
| 3.2 | chu kỳ 2 | Lắc giữa hai giá trị (cân bằng mất ổn định) |
| 3.5 | chu kỳ 4 | Lắc giữa bốn giá trị |
| 3.9 | hỗn loạn | Không lặp, nhạy điều kiện đầu (chaos) |

**Walk-through $r = 2$, $x_0 = 0.3$** (kiểm hội tụ về 0.5):
- $x_1 = 2\\cdot 0.3\\cdot 0.7 = 0.420$
- $x_2 = 2\\cdot 0.420\\cdot 0.580 = 0.4872$
- $x_3 = 2\\cdot 0.4872\\cdot 0.5128 = 0.4997$
- $x_4 \\approx 0.49999\\dots$ → **→ 0.5** ✓ (khớp $x^* = 0.5$, và $|f'| = |2-2| = 0 < 1$ nên hội tụ rất nhanh).

### 4.1 Rẽ nhánh (bifurcation) — vì sao $r = 3$ là ngưỡng

💡 **Trực giác.** Khi tăng $r$, "phanh" $(1-x)$ ngày càng mạnh ở gần đỉnh → mỗi bước hệ **vọt lố (overshoot)** qua $x^*$ nhiều hơn. Đến lúc cú vọt lố lớn đến mức không co lại được, $x^*$ mất ổn định và hệ buộc phải "lắc" giữa hai giá trị thay vì nằm yên — đó là **rẽ nhánh chu kỳ đôi (period-doubling bifurcation)**.

**Walk-through ngưỡng**: ổn định của $x^* = 1-1/r$ phụ thuộc $f'(x^*) = 2 - r$.

| $r$ | $f'(x^*) = 2-r$ | $\\lvert f' \\rvert$ | Kết luận |
|---|---|---|---|
| 2.0 | $0$ | 0 | ổn định mạnh (hội tụ nhanh) |
| 2.8 | $-0.8$ | 0.8 | ổn định (dao động co dần) |
| 3.0 | $-1.0$ | 1.0 | **biên** — mất ổn định |
| 3.2 | $-1.2$ | 1.2 | không ổn định → **chu kỳ 2** |

→ Đúng tại $r = 3$, $|f'| = 1$: vượt qua → $x^*$ "đẩy ra", quỹ đạo rơi vào chu kỳ 2. Tăng tiếp: chu kỳ 2 cũng mất ổn định ở $r \\approx 3.449$ → chu kỳ 4; rồi 8, 16, ... các ngưỡng dồn nhau ngày càng nhanh (tỉ số khoảng cách → hằng số **Feigenbaum $\\delta \\approx 4.669$**), tích tụ ở $r \\approx 3.5699$ → bắt đầu **hỗn loạn**.

**Sơ đồ rẽ nhánh (bifurcation diagram) — các giá trị dài hạn theo $r$**:

\`\`\`
  x dài hạn
  1 ┤                                    ░▒▓ (chaos: vô số giá trị)
    │                              ▓▓▓▓░░▒▓
    │                          ╱─────╲  ▒▓░
    │                       ╱──         ╲░▓   ← cửa sổ tuần hoàn
    │            ┌────────╱  (chu kỳ 4)     hiện ra trong vùng chaos
0.6 ┤───────────┤ (1 nhánh)╲                 (vd chu kỳ 3 ở r≈3.83)
    │  ổn định  └────────╲   ╲(chu kỳ 2)
    │  1 điểm           (chu kỳ 2 tách 2 nhánh)
    └──┬─────────┬───────┬────┬──────┬──── r
       1         3      3.45 3.57    4
       ↑ x*=1-1/r ↑rẽ nhánh đầu  ↑onset chaos
\`\`\`

Trục đứng: tập giá trị mà quỹ đạo *lui tới* dài hạn. Một nhánh = một điểm cân bằng; hai nhánh = chu kỳ 2; "bụi" = hỗn loạn. Đây là một trong những hình nổi tiếng nhất của toán hiện đại.

### 4.2 Nhạy cảm điều kiện đầu — minh họa bằng số

Lấy $r = 3.9$ (vùng hỗn loạn), so hai quỹ đạo xuất phát *gần như giống nhau*: $x_0 = 0.3000$ và $\\tilde x_0 = 0.3001$ (lệch chỉ $0.0001$).

| $n$ | $x_n$ ($x_0=0.3$) | $\\tilde x_n$ ($\\tilde x_0=0.3001$) | Lệch $\\lvert x_n - \\tilde x_n\\rvert$ |
|---|---|---|---|
| 0 | 0.3000 | 0.3001 | 0.0001 |
| 1 | 0.8190 | 0.8191 | 0.0001 |
| 2 | 0.5781 | 0.5779 | 0.0002 |
| 4 | 0.8946 | 0.8966 | 0.0020 |
| 6 | 0.5860 | 0.6098 | 0.0238 |
| 8 | 0.9269 | 0.7896 | 0.1373 |
| 10 | 0.2666 | 0.9024 | 0.6358 |

→ Lệch ban đầu $0.0001$ **nhân lên ~7000 lần** sau 10 bước: hai dãy đã hoàn toàn khác nhau. Đây là **hiệu ứng cánh bướm**: dù luật tất định, sai số đo dù nhỏ cũng làm dự đoán dài hạn vô nghĩa. (Tốc độ tách trung bình đo bằng **số mũ Lyapunov** — dương thì hỗn loạn.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Một công thức đơn giản vậy sao ra hỗn loạn?"* Vì nó **phi tuyến** (có $x^2$) và *lặp lại*: phi tuyến + lặp = khuếch đại sai khác. Đây là phát hiện chấn động (May, 1976): hệ tất định đơn giản vẫn cho hành vi không dự đoán nổi dài hạn. Nền tảng của *lý thuyết hỗn loạn*.
- *"Hỗn loạn nghĩa là ngẫu nhiên?"* **Không.** Công thức hoàn toàn tất định (cùng $x_0$ ra cùng dãy). "Hỗn loạn" = **nhạy cảm điều kiện đầu**: $x_0 = 0.3$ và $x_0 = 0.3001$ sau ít bước rẽ hoàn toàn khác nhau → không dự đoán xa được dù biết luật chính xác. (Hiệu ứng cánh bướm.)
- *"Vì sao mất ổn định đúng tại $r = 3$?"* Vì tại đó $|f'(x^*)| = |2-r| = 1$ — đúng ngưỡng. $r$ vượt 3 → $|2-r| > 1$ → $x^*$ không ổn định → hệ chuyển sang chu kỳ 2 (rẽ nhánh — bifurcation).

⚠ **Lỗi thường gặp — coi logistic rời rạc và logistic liên tục giống nhau.** ODE logistic $dN/dt = rN(1-N/K)$ ([L04](../lesson-04-continuous-ode-models/)) *luôn* hội tụ mượt về $K$ — **không** có chu kỳ hay hỗn loạn. Bản rời rạc thì có, do "bước nhảy" rời rạc có thể vọt lố qua cân bằng. Đừng giả định hành vi liên tục cho mô hình rời rạc.

🔁 **Dừng lại tự kiểm tra**

1. Với $r = 2.5$, tìm điểm cân bằng dương $x^*$ và xét nó ổn định không.

<details><summary>Đáp án</summary>

$x^* = 1 - 1/2.5 = 1 - 0.4 =$ **0.6**. $f'(x^*) = 2 - r = 2 - 2.5 = -0.5$, $|-0.5| < 1$ → **ổn định** (và vì $f' < 0$, dãy *dao động* xoắn vào 0.6 chứ không tiến một phía). $r = 2.5$ nằm trong $(1, 3)$ nên đúng là ổn định.

</details>

### 📝 Tóm tắt mục 4

- Logistic rời rạc $x_{n+1} = r\\cdot x_n(1-x_n)$: mũ + "phanh" $(1-x_n)$ chống tăng vô hạn.
- Cân bằng $x^* = 1-1/r$, ổn định khi $1 < r < 3$. Vượt 3: chu kỳ 2 → 4 → ... → hỗn loạn.
- Rẽ nhánh chu kỳ đôi tại $r=3, 3.449, \\dots$ dồn về $r\\approx 3.57$ (onset chaos); tỉ số dồn = hằng Feigenbaum $\\delta\\approx 4.669$.
- Nhạy điều kiện đầu: lệch $0.0001$ phình ~7000 lần sau 10 bước (hiệu ứng cánh bướm).
- Hỗn loạn = tất định nhưng nhạy điều kiện đầu (không phải ngẫu nhiên). Khác hẳn logistic liên tục (luôn mượt).

---

## 5. Fibonacci như một hệ tuyến tính bậc 2

💡 **Trực giác.** Fibonacci $x_{n+1} = x_n + x_{n-1}$ là hệ **bậc 2** (nhìn lại 2 bước) — nhưng vẫn **tuyến tính**, nên có **nghiệm đóng** (closed form). Mẹo giải: đoán nghiệm dạng hình học $x_n = \\lambda^n$ (giống cấp số nhân), thay vào để tìm $\\lambda$.

**Walk-through tìm nghiệm đóng (công thức Binet)**:
- Thay $x_n = \\lambda^n$ vào $x_{n+1} = x_n + x_{n-1}$: $\\lambda^{n+1} = \\lambda^n + \\lambda^{n-1}$. Chia cho $\\lambda^{n-1}$:
$$\\lambda^2 = \\lambda + 1 \\quad\\Longrightarrow\\quad \\lambda^2 - \\lambda - 1 = 0$$
Đây là **phương trình đặc trưng (characteristic equation)**. Giải:
$$\\lambda = \\frac{1 \\pm \\sqrt{1+4}}{2} = \\frac{1 \\pm \\sqrt 5}{2} \\;\\Rightarrow\\; \\varphi = \\frac{1+\\sqrt 5}{2} \\approx 1.618,\\quad \\psi = \\frac{1-\\sqrt 5}{2} \\approx -0.618.$$
- $\\varphi$ chính là **tỉ lệ vàng (golden ratio)**. Nghiệm tổng quát là tổ hợp: $x_n = A\\varphi^n + B\\psi^n$. Khớp $x_0 = 0, x_1 = 1$ (quy ước $F_0=0$) cho $A = 1/\\sqrt 5$, $B = -1/\\sqrt 5$:
$$F_n = \\frac{\\varphi^n - \\psi^n}{\\sqrt 5}\\quad(\\text{công thức Binet}).$$

**Kiểm bằng số ($n=5$)**: $F_5$ phải bằng 5. $\\varphi^5 \\approx 11.09$, $\\psi^5 \\approx -0.090$ → $(11.09 - (-0.09))/\\sqrt 5 = 11.18/2.236 = 5.00$ ✓. Với $n = 10$: $F_{10} = 55$; $\\varphi^{10} \\approx 122.99$, $\\psi^{10}\\approx 0.0081$ → $(122.99-0.0081)/2.236 = 55.0$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tỉ số $F_{n+1}/F_n$ tiến tới $\\varphi$?"* Vì $|\\psi| = 0.618 < 1$ nên $\\psi^n \\to 0$, số hạng $\\varphi^n$ áp đảo: $F_n \\approx \\varphi^n/\\sqrt5$, do đó $F_{n+1}/F_n \\to \\varphi \\approx 1.618$. Kiểm: $13/8 = 1.625$, $21/13 = 1.615$, $34/21 = 1.619$ → xoắn về 1.618 ✓.
- *"Bậc 2 thì viết thành hệ bậc 1 được không?"* Được — đặt vector trạng thái $\\mathbf{v}_n = (x_n, x_{n-1})$ thì $\\mathbf{v}_{n+1} = M\\mathbf{v}_n$ với $M = \\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}$. Khi đó $\\varphi, \\psi$ chính là **trị riêng (eigenvalue)** của $M$ — cùng phương trình đặc trưng $\\lambda^2-\\lambda-1=0$. (Xem hệ động lực tuyến tính nhiều biến ở đại số tuyến tính.)

⚠ **Lỗi thường gặp — quên nghiệm bậc 2 cần $k$ điều kiện đầu.** Hệ bậc 2 cần **hai** giá trị đầu ($x_0$ và $x_1$) mới xác định dãy; chỉ cho $x_0$ là chưa đủ. Cũng như nghiệm tổng quát có **hai** hằng số $A, B$ — phải dùng cả hai điều kiện để khớp.

🔁 **Dừng lại tự kiểm tra**

1. Giải $x_{n+1} = 5x_n - 6x_{n-1}$ với $x_0 = 0, x_1 = 1$. Tìm phương trình đặc trưng và $x_n$.

<details><summary>Đáp án</summary>

Thay $x_n = \\lambda^n$: $\\lambda^2 = 5\\lambda - 6 \\Rightarrow \\lambda^2 - 5\\lambda + 6 = 0 \\Rightarrow (\\lambda-2)(\\lambda-3)=0 \\Rightarrow \\lambda = 2, 3$. Nghiệm $x_n = A\\cdot 2^n + B\\cdot 3^n$. Khớp: $x_0 = A+B = 0$; $x_1 = 2A+3B = 1$ → $A = -1, B = 1$ → **$x_n = 3^n - 2^n$**. Kiểm: $x_2 = 9-4 = 5$; lăn tay: $5\\cdot 1 - 6\\cdot 0 = 5$ ✓. $x_3 = 27-8 = 19$; lăn: $5\\cdot 5 - 6\\cdot 1 = 19$ ✓.

</details>

### 📝 Tóm tắt mục 5

- Fibonacci $x_{n+1} = x_n + x_{n-1}$: tuyến tính bậc 2 → đoán $x_n = \\lambda^n$ → phương trình đặc trưng $\\lambda^2-\\lambda-1=0$.
- Nghiệm $\\varphi = (1+\\sqrt5)/2$ (tỉ lệ vàng), $\\psi = (1-\\sqrt5)/2$; công thức Binet $F_n = (\\varphi^n-\\psi^n)/\\sqrt5$.
- $F_{n+1}/F_n \\to \\varphi$ vì $|\\psi|<1$ nên $\\psi^n\\to 0$. Bậc 2 cần 2 điều kiện đầu; viết được thành hệ ma trận với trị riêng $\\varphi,\\psi$.

---

## 6. Rời rạc hay liên tục?

| | Rời rạc (sai phân) | Liên tục (ODE) |
|---|---|---|
| **Thời gian** | Bước: $n = 0, 1, 2, \\dots$ | Liên tục: $t \\in \\mathbb{R}$ |
| **Công cụ** | $x_{n+1} = f(x_n)$, lăn/lặp | $dx/dt = g(x)$, giải tích phân |
| **Hợp khi** | Sự kiện theo kỳ (năm, thế hệ, vòng lặp) | Thay đổi trơn, liên tục |
| **Mô phỏng máy tính** | Trực tiếp (vòng for) | Phải rời rạc hóa (Euler: $x_{n+1} = x_n + h\\cdot g(x_n)$) |
| **Hành vi** | Có thể chu kỳ/hỗn loạn dù đơn giản | Bậc 1 autonom: luôn đơn điệu về cân bằng |

💡 Thực ra **giải ODE bằng máy tính chính là biến nó thành phương trình sai phân** (phương pháp Euler) — nên hai thế giới gặp nhau. Bước $h$ nhỏ → bản rời rạc xấp xỉ bản liên tục.

📝 **Tóm tắt mục 6**: chọn rời rạc khi hệ cập nhật theo bước; liên tục khi thay đổi trơn. Mô phỏng ODE trên máy = rời rạc hóa (Euler). Mô hình rời rạc giàu hành vi hơn (chu kỳ, hỗn loạn).

---

## 7. Bài tập

**Bài 1.** Giải $x_{n+1} = 3\\cdot x_n$ với $x_0 = 2$. Cho công thức $x_n$ và tính $x_5$.

**Bài 2.** Một khoản vay 10 triệu, lãi 1%/tháng, trả góp 1 triệu/tháng cuối mỗi tháng: $x_{n+1} = 1.01\\cdot x_n - 1$ (triệu). Tìm điểm cân bằng $x^*$, công thức $x_n$, và (định tính) số dư nợ tăng hay giảm?

**Bài 3.** Xét $x_{n+1} = -0.5\\cdot x_n + 3$. Tìm $x^*$, xét ổn định và mô tả kiểu hành vi (đơn điệu hay dao động?).

**Bài 4.** Logistic rời rạc với $r = 2.8$. (a) Tìm điểm cân bằng dương. (b) Nó ổn định không? (c) Tính 3 bước đầu từ $x_0 = 0.2$.

**Bài 5.** Giải thích trong vài câu vì sao $x_{n+1} = 3.9\\cdot x_n(1-x_n)$ được gọi là "hỗn loạn" dù công thức hoàn toàn tất định.

**Bài 6.** Thuốc trong máu: mỗi giờ còn 60% liều cũ, truyền thêm 40 mg/giờ: $x_{n+1} = 0.6x_n + 40$, $x_0 = 0$. (a) Tìm nồng độ ổn định $x^*$. (b) Hệ có hội tụ không (kiểm $|f'|$)? (c) Tính 3 giờ đầu.

**Bài 7.** Mô hình phi tuyến $f(x) = \\sqrt{2x + 3}$ (dãy lặp căn), $x_0 = 0$. (a) Tìm các điểm cân bằng. (b) Xét ổn định điểm cân bằng dương. (c) Lăn 3 bước.

**Bài 8.** Giải hệ tuyến tính bậc 2 $x_{n+1} = x_n + 2x_{n-1}$ với $x_0 = 0, x_1 = 1$. Tìm phương trình đặc trưng và công thức đóng $x_n$.

**Bài 9.** Vẽ (mô tả bằng lời) cobweb cho $x_{n+1} = -0.5x_n + 3$ bắt đầu $x_0 = 0$: bậc thang hay mạng nhện? Cuộn vào hay bung ra? Vì sao?

---

## 8. Lời giải chi tiết

**Bài 1.** Thuần ($b=0$): $x_n = x_0\\cdot a^n =$ **$2\\cdot 3^n$**. $x_5 = 2\\cdot 3^5 = 2\\cdot 243 =$ **486**. Kiểm: $x_1 = 6$, $x_2 = 18 = 2\\cdot 9$ ✓.

**Bài 2.** $a = 1.01$, $b = -1$. $x^* = b/(1-a) = (-1)/(1-1.01) = (-1)/(-0.01) =$ **100** (triệu). $x_n = (x_0 - x^*)\\cdot a^n + x^* = (10 - 100)\\cdot 1.01^n + 100 =$ **$-90\\cdot(1.01)^n + 100$**. Vì $a = 1.01 > 1$ và $(x_0 - x^*) = -90 < 0$, số hạng $-90\\cdot 1.01^n$ ngày càng âm → **$x_n$ giảm** dần (số dư nợ giảm, khoản vay được trả hết). Kiểm: $x_1 = 1.01\\cdot 10 - 1 = 9.1$; công thức: $-90\\cdot 1.01 + 100 = -90.9 + 100 = 9.1$ ✓. (Tìm khi nào hết nợ: $x_n = 0$ → $1.01^n = 100/90$ → $n = \\ln(100/90)/\\ln 1.01 \\approx 10.6$ → khoảng 11 tháng.)

**Bài 3.** $x^* = 3/(1-(-0.5)) = 3/1.5 =$ **2**. $f' = a = -0.5$, $|-0.5| < 1$ → **ổn định**. Vì $a < 0$ → **dao động** (xoắn vào $x^* = 2$). Kiểm từ $x_0 = 0$: $x_1 = 3$, $x_2 = -0.5\\cdot 3+3 = 1.5$, $x_3 = -0.5\\cdot 1.5+3 = 2.25$, $x_4 = 1.875$, ... lắc quanh 2 và co về 2 ✓.

**Bài 4.** (a) $x^* = 1 - 1/2.8 = 1 - 0.357 =$ **0.643**. (b) $f'(x^*) = 2 - r = 2 - 2.8 = -0.8$, $|-0.8| < 1$ → **ổn định** (dao động xoắn vào, vì $f' < 0$); $r = 2.8 \\in (1,3)$ ✓. (c) $x_0 = 0.2$: $x_1 = 2.8\\cdot 0.2\\cdot 0.8 = 0.448$; $x_2 = 2.8\\cdot 0.448\\cdot 0.552 = 0.692$; $x_3 = 2.8\\cdot 0.692\\cdot 0.308 = 0.597$. (Đang lắc quanh 0.643, co dần — đúng dự đoán.)

**Bài 5.** Công thức tất định (cùng $x_0$ luôn ra cùng dãy, không có yếu tố ngẫu nhiên). "Hỗn loạn" chỉ **sự nhạy cảm cực độ với điều kiện đầu**: hai giá trị đầu sai khác cực nhỏ (vd 0.2 và 0.2001) sau ít bước sẽ cho dãy hoàn toàn khác nhau, nên *không thể dự đoán dài hạn* dù biết luật chính xác và đo $x_0$ rất kỹ (sai số đo luôn tồn tại). Ngoài ra dãy không bao giờ lặp lại tuần hoàn. Đó là "hỗn loạn tất định" — trật tự sinh ra hành vi trông như ngẫu nhiên.

**Bài 6.** $a = 0.6$, $b = 40$. (a) $x^* = b/(1-a) = 40/(1-0.6) = 40/0.4 =$ **100 mg**. (b) $f'(x) = a = 0.6$, $|0.6| < 1$ → **hội tụ** về 100 mg (tiến một phía vì $a > 0$). (c) $x_1 = 0.6\\cdot 0 + 40 = 40$; $x_2 = 0.6\\cdot 40 + 40 = 64$; $x_3 = 0.6\\cdot 64 + 40 = 78.4$. Đang tăng dần một phía về 100 ✓.

**Bài 7.** (a) $x^* = \\sqrt{2x^* + 3} \\Rightarrow (x^*)^2 = 2x^* + 3 \\Rightarrow (x^*)^2 - 2x^* - 3 = 0 \\Rightarrow (x^*-3)(x^*+1) = 0 \\Rightarrow x^* = 3$ hoặc $x^* = -1$. Vì căn cho $\\ge 0$, chỉ $x^* = 3$ đạt được. (b) $f'(x) = \\dfrac{2}{2\\sqrt{2x+3}} = \\dfrac{1}{\\sqrt{2x+3}}$. Tại $x^* = 3$: $f'(3) = 1/\\sqrt 9 = 1/3 \\approx 0.333$, $|0.333| < 1$ → **ổn định** (tiến một phía vì $f' > 0$). (c) $x_0 = 0$: $x_1 = \\sqrt 3 = 1.732$; $x_2 = \\sqrt{2\\cdot 1.732 + 3} = \\sqrt{6.464} = 2.543$; $x_3 = \\sqrt{2\\cdot 2.543 + 3} = \\sqrt{8.085} = 2.843$. Đang tiến về 3 ✓.

**Bài 8.** Thay $x_n = \\lambda^n$: $\\lambda^2 = \\lambda + 2 \\Rightarrow \\lambda^2 - \\lambda - 2 = 0 \\Rightarrow (\\lambda - 2)(\\lambda + 1) = 0 \\Rightarrow \\lambda = 2$ hoặc $\\lambda = -1$. Nghiệm tổng quát $x_n = A\\cdot 2^n + B\\cdot(-1)^n$. Khớp điều kiện đầu: $x_0 = A + B = 0$; $x_1 = 2A - B = 1$. Cộng hai phương trình: $3A = 1 \\Rightarrow A = 1/3$, $B = -1/3$. → **$x_n = \\dfrac{2^n - (-1)^n}{3}$**. Kiểm: $x_2 = (4 - 1)/3 = 1$; lăn tay: $x_1 + 2x_0 = 1 + 0 = 1$ ✓. $x_3 = (8 - (-1))/3 = 3$; lăn: $x_2 + 2x_1 = 1 + 2 = 3$ ✓.

**Bài 9.** $x^* = 3/(1-(-0.5)) = 3/1.5 = 2$. $f'(x) = a = -0.5$. Vì $f' < 0$ → **mạng nhện (spiral)** chứ không phải bậc thang; vì $|f'| = 0.5 < 1$ → **cuộn vào** $x^* = 2$ (hội tụ). Lăn: $x_0 = 0 \\to x_1 = 3 \\to x_2 = 1.5 \\to x_3 = 2.25 \\to x_4 = 1.875 \\to \\dots$ — lắc qua lại quanh 2, biên độ co dần. Trên hình cobweb: đường gấp khúc xoắn ốc cuộn dần vào điểm cắt $(2, 2)$ của $y = f(x)$ và $y = x$.

---

## 9. Bài tiếp theo

[Lesson 04 — Mô hình liên tục (ODE)](../lesson-04-continuous-ode-models/): chuyển từ bước rời rạc sang thay đổi liên tục $dx/dt$; ta sẽ thấy logistic *liên tục* hội tụ mượt, khác hẳn bản rời rạc.

## 📝 Tổng kết

1. **Phương trình sai phân** $x_{n+1} = f(x_n)$: mô hình theo bước rời rạc (năm, thế hệ, vòng lặp).
2. **Tuyến tính** $x_{n+1} = ax_n + b$: $x^* = b/(1-a)$, $x_n = (x_0-x^*)a^n + x^*$ ($a=1$ → cấp số cộng).
3. **Ổn định**: $|f'(x^*)| < 1$ ổn định; dấu quyết định đơn điệu ($>0$) hay dao động ($<0$).
4. **Logistic rời rạc** $x_{n+1} = r\\cdot x_n(1-x_n)$: $x^* = 1-1/r$, ổn định khi $1<r<3$, rồi chu kỳ 2/4/... → hỗn loạn (rẽ nhánh chu kỳ đôi, hằng Feigenbaum).
5. **Hỗn loạn** = tất định + nhạy điều kiện đầu (cánh bướm); khác hẳn logistic liên tục (luôn mượt).
6. **Cobweb diagram**: $y=f(x)$ + $y=x$, lăn dọc-ngang; $|f'|<1$ cuộn vào, $|f'|>1$ bung ra; $f'<0$ mạng nhện, $f'>0$ bậc thang.
7. **Fibonacci** = hệ tuyến tính bậc 2: phương trình đặc trưng $\\lambda^2-\\lambda-1=0$ → $\\varphi$ (tỉ lệ vàng); công thức Binet.
8. Rời rạc vs liên tục: chọn theo cách hệ cập nhật; mô phỏng ODE = rời rạc hóa (Euler).
`;
