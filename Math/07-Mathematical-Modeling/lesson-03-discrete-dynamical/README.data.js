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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phương trình sai phân với ODE — chọn cái nào?"* Hỏi: hệ cập nhật *theo bước* hay *liên tục*? Dân số côn trùng một mùa/năm → rời rạc. Phóng xạ (nguyên tử phân rã bất kỳ lúc nào) → liên tục (ODE). Nhiều khi cả hai dùng được; rời rạc dễ mô phỏng trên máy tính (chỉ là vòng lặp).
- *"'Bậc' của phương trình sai phân là gì?"* Là khoảng lùi xa nhất: $x_{n+1} = f(x_n)$ là bậc 1; Fibonacci nhìn lại 2 bước → bậc 2. Bậc $k$ cần $k$ điều kiện đầu.

📝 **Tóm tắt mục 1**

- Phương trình sai phân: $x_{n+1} = f(x_n)$ — trạng thái kỳ sau theo kỳ này; "lăn" từ $x_0$.
- Dùng khi hệ cập nhật theo *bước* (năm, thế hệ, vòng lặp); ODE dùng cho thay đổi liên tục.
- Bậc = khoảng lùi xa nhất; cần đủ điều kiện đầu.

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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao điều kiện là $|f'| < 1$?"* Gần $x^*$, đặt $y_n = x_n - x^*$; xấp xỉ tuyến tính $f(x) \\approx f(x^*) + f'(x^*)(x-x^*)$ cho $y_{n+1} \\approx f'(x^*)\\cdot y_n$. Đây là cấp số nhân công bội $f'(x^*)$: độ lệch co lại ($\\to 0$) khi $|f'| < 1$, phình ra khi $|f'| > 1$. (Liên hệ tuyến tính hóa ở [L01 mục 3](../lesson-01-modeling-cycle/).)
- *"Dấu của a/f′ ảnh hưởng gì?"* Trị tuyệt đối quyết định ổn định; **dấu** quyết định *kiểu*: $a > 0$ → tiến *một phía* (đơn điệu); $a < 0$ → **dao động** quanh $x^*$ (lắc qua lắc lại mỗi bước).

⚠ **Lỗi thường gặp — quên xét dấu, chỉ nhìn độ lớn.** $|a| = 0.7$ cho ổn định, nhưng $a = +0.7$ (tiến mượt) và $a = -0.7$ (xoắn dao động) cho *hình dạng* dãy rất khác. Khi vẽ/diễn giải phải để ý dấu.

🔁 **Dừng lại tự kiểm tra**

1. Xét $x_{n+1} = 1.2\\cdot x_n - 1$. Tìm $x^*$, xét ổn định, mô tả hành vi nếu $x_0 = 4$ và nếu $x_0 = 5$.

<details><summary>Đáp án</summary>

$x^* = b/(1-a) = (-1)/(1-1.2) = (-1)/(-0.2) =$ **5**. $f' = 1.2 > 1$ → **không ổn định**.
- $x_0 = 5 = x^*$ → dãy đứng yên tại 5 mãi (đúng cân bằng).
- $x_0 = 4$ (lệch $-1$ khỏi $x^*$) → $y_n = (4-5)\\cdot 1.2^n = -1.2^n$ → chạy ra $-\\infty$: $x_1 = 1.2\\cdot 4-1 = 3.8$, $x_2 = 3.56$, ... giảm dần ra xa 5. Cân bằng không ổn định: lệch nhỏ cũng bị khuếch đại.

</details>

### 📝 Tóm tắt mục 3

- Điểm cân bằng: $f(x^*) = x^*$. Ổn định $\\iff |f'(x^*)| < 1$ (tuyến tính: $|a| < 1$).
- $|f'|$ quyết định ổn định; *dấu* quyết định kiểu: dương → đơn điệu, âm → dao động.
- Hành vi dài hạn của hệ do các điểm cân bằng + ổn định chi phối.

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
- Hỗn loạn = tất định nhưng nhạy điều kiện đầu (không phải ngẫu nhiên). Khác hẳn logistic liên tục (luôn mượt).

---

## 5. Rời rạc hay liên tục?

| | Rời rạc (sai phân) | Liên tục (ODE) |
|---|---|---|
| **Thời gian** | Bước: $n = 0, 1, 2, \\dots$ | Liên tục: $t \\in \\mathbb{R}$ |
| **Công cụ** | $x_{n+1} = f(x_n)$, lăn/lặp | $dx/dt = g(x)$, giải tích phân |
| **Hợp khi** | Sự kiện theo kỳ (năm, thế hệ, vòng lặp) | Thay đổi trơn, liên tục |
| **Mô phỏng máy tính** | Trực tiếp (vòng for) | Phải rời rạc hóa (Euler: $x_{n+1} = x_n + h\\cdot g(x_n)$) |
| **Hành vi** | Có thể chu kỳ/hỗn loạn dù đơn giản | Bậc 1 autonom: luôn đơn điệu về cân bằng |

💡 Thực ra **giải ODE bằng máy tính chính là biến nó thành phương trình sai phân** (phương pháp Euler) — nên hai thế giới gặp nhau. Bước $h$ nhỏ → bản rời rạc xấp xỉ bản liên tục.

📝 **Tóm tắt mục 5**: chọn rời rạc khi hệ cập nhật theo bước; liên tục khi thay đổi trơn. Mô phỏng ODE trên máy = rời rạc hóa (Euler). Mô hình rời rạc giàu hành vi hơn (chu kỳ, hỗn loạn).

---

## 6. Bài tập

**Bài 1.** Giải $x_{n+1} = 3\\cdot x_n$ với $x_0 = 2$. Cho công thức $x_n$ và tính $x_5$.

**Bài 2.** Một khoản vay 10 triệu, lãi 1%/tháng, trả góp 1 triệu/tháng cuối mỗi tháng: $x_{n+1} = 1.01\\cdot x_n - 1$ (triệu). Tìm điểm cân bằng $x^*$, công thức $x_n$, và (định tính) số dư nợ tăng hay giảm?

**Bài 3.** Xét $x_{n+1} = -0.5\\cdot x_n + 3$. Tìm $x^*$, xét ổn định và mô tả kiểu hành vi (đơn điệu hay dao động?).

**Bài 4.** Logistic rời rạc với $r = 2.8$. (a) Tìm điểm cân bằng dương. (b) Nó ổn định không? (c) Tính 3 bước đầu từ $x_0 = 0.2$.

**Bài 5.** Giải thích trong vài câu vì sao $x_{n+1} = 3.9\\cdot x_n(1-x_n)$ được gọi là "hỗn loạn" dù công thức hoàn toàn tất định.

---

## 7. Lời giải chi tiết

**Bài 1.** Thuần ($b=0$): $x_n = x_0\\cdot a^n =$ **$2\\cdot 3^n$**. $x_5 = 2\\cdot 3^5 = 2\\cdot 243 =$ **486**. Kiểm: $x_1 = 6$, $x_2 = 18 = 2\\cdot 9$ ✓.

**Bài 2.** $a = 1.01$, $b = -1$. $x^* = b/(1-a) = (-1)/(1-1.01) = (-1)/(-0.01) =$ **100** (triệu). $x_n = (x_0 - x^*)\\cdot a^n + x^* = (10 - 100)\\cdot 1.01^n + 100 =$ **$-90\\cdot(1.01)^n + 100$**. Vì $a = 1.01 > 1$ và $(x_0 - x^*) = -90 < 0$, số hạng $-90\\cdot 1.01^n$ ngày càng âm → **$x_n$ giảm** dần (số dư nợ giảm, khoản vay được trả hết). Kiểm: $x_1 = 1.01\\cdot 10 - 1 = 9.1$; công thức: $-90\\cdot 1.01 + 100 = -90.9 + 100 = 9.1$ ✓. (Tìm khi nào hết nợ: $x_n = 0$ → $1.01^n = 100/90$ → $n = \\ln(100/90)/\\ln 1.01 \\approx 10.6$ → khoảng 11 tháng.)

**Bài 3.** $x^* = 3/(1-(-0.5)) = 3/1.5 =$ **2**. $f' = a = -0.5$, $|-0.5| < 1$ → **ổn định**. Vì $a < 0$ → **dao động** (xoắn vào $x^* = 2$). Kiểm từ $x_0 = 0$: $x_1 = 3$, $x_2 = -0.5\\cdot 3+3 = 1.5$, $x_3 = -0.5\\cdot 1.5+3 = 2.25$, $x_4 = 1.875$, ... lắc quanh 2 và co về 2 ✓.

**Bài 4.** (a) $x^* = 1 - 1/2.8 = 1 - 0.357 =$ **0.643**. (b) $f'(x^*) = 2 - r = 2 - 2.8 = -0.8$, $|-0.8| < 1$ → **ổn định** (dao động xoắn vào, vì $f' < 0$); $r = 2.8 \\in (1,3)$ ✓. (c) $x_0 = 0.2$: $x_1 = 2.8\\cdot 0.2\\cdot 0.8 = 0.448$; $x_2 = 2.8\\cdot 0.448\\cdot 0.552 = 0.692$; $x_3 = 2.8\\cdot 0.692\\cdot 0.308 = 0.597$. (Đang lắc quanh 0.643, co dần — đúng dự đoán.)

**Bài 5.** Công thức tất định (cùng $x_0$ luôn ra cùng dãy, không có yếu tố ngẫu nhiên). "Hỗn loạn" chỉ **sự nhạy cảm cực độ với điều kiện đầu**: hai giá trị đầu sai khác cực nhỏ (vd 0.2 và 0.2001) sau ít bước sẽ cho dãy hoàn toàn khác nhau, nên *không thể dự đoán dài hạn* dù biết luật chính xác và đo $x_0$ rất kỹ (sai số đo luôn tồn tại). Ngoài ra dãy không bao giờ lặp lại tuần hoàn. Đó là "hỗn loạn tất định" — trật tự sinh ra hành vi trông như ngẫu nhiên.

---

## 8. Bài tiếp theo

[Lesson 04 — Mô hình liên tục (ODE)](../lesson-04-continuous-ode-models/): chuyển từ bước rời rạc sang thay đổi liên tục $dx/dt$; ta sẽ thấy logistic *liên tục* hội tụ mượt, khác hẳn bản rời rạc.

## 📝 Tổng kết

1. **Phương trình sai phân** $x_{n+1} = f(x_n)$: mô hình theo bước rời rạc (năm, thế hệ, vòng lặp).
2. **Tuyến tính** $x_{n+1} = ax_n + b$: $x^* = b/(1-a)$, $x_n = (x_0-x^*)a^n + x^*$ ($a=1$ → cấp số cộng).
3. **Ổn định**: $|f'(x^*)| < 1$ ổn định; dấu quyết định đơn điệu ($>0$) hay dao động ($<0$).
4. **Logistic rời rạc** $x_{n+1} = r\\cdot x_n(1-x_n)$: $x^* = 1-1/r$, ổn định khi $1<r<3$, rồi chu kỳ 2/4/... → hỗn loạn.
5. **Hỗn loạn** = tất định + nhạy điều kiện đầu; khác hẳn logistic liên tục (luôn mượt).
6. Rời rạc vs liên tục: chọn theo cách hệ cập nhật; mô phỏng ODE = rời rạc hóa (Euler).
`;
