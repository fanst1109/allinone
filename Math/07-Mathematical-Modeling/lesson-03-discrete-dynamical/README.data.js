// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-03-discrete-dynamical/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Mô hình rời rạc (Phương trình sai phân)

## Mục tiêu

- Mô hình hóa khi thời gian đi theo **bước rời rạc** (năm, tháng, thế hệ): dãy truy hồi xₙ₊₁ = f(xₙ).
- Giải **mô hình tuyến tính** xₙ₊₁ = a·xₙ + b bằng công thức đóng; áp dụng lãi kép, tiết kiệm định kỳ, dân số rời rạc.
- Hiểu **điểm cân bằng (fixed point)** và **ổn định** — khi nào dãy hội tụ, dao động, hay phân kỳ.
- Khám phá **mô hình logistic rời rạc** xₙ₊₁ = r·xₙ(1−xₙ): từ hội tụ → chu kỳ → hỗn loạn (chaos).
- So sánh mô hình **rời rạc ↔ liên tục** (ODE ở [Lesson 04](../lesson-04-continuous-ode-models/)).

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/).
- [T4 L01 — Dãy số & giới hạn](../../04-Calculus-1var/lesson-01-sequences-limits/) (hội tụ của dãy).
- [T1 — Lũy thừa, cấp số nhân](../../01-Arithmetic-Algebra/lesson-06-powers-roots-logs/).

---

## 1. Phương trình sai phân là gì?

💡 **Trực giác / Hình dung — đời sống đi theo nhịp.** Nhiều hệ không thay đổi *liên tục* mà theo **nhịp rời rạc**: lãi ngân hàng nhập gốc mỗi *năm*, côn trùng sinh sản mỗi *thế hệ*, dân số đếm mỗi *kỳ điều tra*. Mô hình tự nhiên là: "trạng thái kỳ sau = một hàm của trạng thái kỳ này", xₙ₊₁ = f(xₙ). Biết x₀, ta "lăn" công thức để ra x₁, x₂, x₃, ...

> 📐 **Định nghĩa đầy đủ — Phương trình sai phân (difference equation)**
>
> **(a) Là gì**: Một quy tắc xác định mỗi phần tử của dãy theo (các) phần tử trước: xₙ₊₁ = f(xₙ) (bậc 1) hoặc xₙ₊₁ = f(xₙ, xₙ₋₁) (bậc 2, vd Fibonacci). "Giải" = tìm công thức xₙ theo n (nghiệm đóng) hoặc mô tả hành vi dài hạn. Cần **điều kiện đầu** x₀ để xác định dãy cụ thể.
>
> **(b) Vì sao cần — và khác ODE chỗ nào**: ODE ([T6 L07](../../06-Advanced/lesson-07-differential-equations/)) mô tả thay đổi *liên tục* (dx/dt). Nhưng khi dữ liệu/sự kiện đến *theo bước* (mỗi năm, mỗi thế hệ, mỗi vòng lặp thuật toán), phương trình sai phân tự nhiên và chính xác hơn — không cần giả định "thời gian liên tục". Đây cũng là ngôn ngữ của **thuật toán** (mỗi vòng lặp cập nhật trạng thái) và **tài chính** (lãi nhập kỳ).
>
> **(c) Ví dụ số (4 ví dụ)**:
> - Lãi kép 5%/năm, x₀ = 1000: xₙ₊₁ = 1.05·xₙ → 1000, 1050, 1102.5, 1157.6, ...
> - Cấp số cộng: xₙ₊₁ = xₙ + 3, x₀ = 2 → 2, 5, 8, 11, ...
> - Phân rã rời rạc: xₙ₊₁ = 0.8·xₙ, x₀ = 100 → 100, 80, 64, 51.2, ... → 0.
> - Fibonacci (bậc 2): xₙ₊₁ = xₙ + xₙ₋₁, x₀ = x₁ = 1 → 1, 1, 2, 3, 5, 8, 13, ...

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phương trình sai phân với ODE — chọn cái nào?"* Hỏi: hệ cập nhật *theo bước* hay *liên tục*? Dân số côn trùng một mùa/năm → rời rạc. Phóng xạ (nguyên tử phân rã bất kỳ lúc nào) → liên tục (ODE). Nhiều khi cả hai dùng được; rời rạc dễ mô phỏng trên máy tính (chỉ là vòng lặp).
- *"'Bậc' của phương trình sai phân là gì?"* Là khoảng lùi xa nhất: xₙ₊₁ = f(xₙ) là bậc 1; Fibonacci nhìn lại 2 bước → bậc 2. Bậc k cần k điều kiện đầu.

📝 **Tóm tắt mục 1**

- Phương trình sai phân: xₙ₊₁ = f(xₙ) — trạng thái kỳ sau theo kỳ này; "lăn" từ x₀.
- Dùng khi hệ cập nhật theo *bước* (năm, thế hệ, vòng lặp); ODE dùng cho thay đổi liên tục.
- Bậc = khoảng lùi xa nhất; cần đủ điều kiện đầu.

---

## 2. Mô hình tuyến tính xₙ₊₁ = a·xₙ + b

💡 **Trực giác.** Mỗi bước: nhân với a (tăng trưởng/co lại theo tỉ lệ) rồi cộng b (lượng thêm cố định). Lãi kép thuần là b = 0; tiết kiệm có gửi thêm đều đặn là b > 0.

### 2.1 Trường hợp thuần (b = 0): cấp số nhân

xₙ₊₁ = a·xₙ → nghiệm đóng **xₙ = x₀·aⁿ**.

**Walk-through — lãi kép**: x₀ = 1000, a = 1.05 (lãi 5%/năm).
- xₙ = 1000·(1.05)ⁿ. Sau 10 năm: x₁₀ = 1000·1.05¹⁰ = 1000·1.6289 = **1628.9**.
- Kiểm bằng lăn tay: x₁ = 1050, x₂ = 1102.5 — khớp 1000·1.05² = 1102.5 ✓.

### 2.2 Trường hợp tổng quát (b ≠ 0)

xₙ₊₁ = a·xₙ + b (a ≠ 1). Tìm **điểm cân bằng** x* (giá trị không đổi: x* = a·x* + b):
\`\`\`
x* = b / (1 − a)
\`\`\`
Đặt yₙ = xₙ − x* (độ lệch khỏi cân bằng) → yₙ₊₁ = a·yₙ (thuần!) → yₙ = y₀·aⁿ. Suy ra **nghiệm đóng**:
\`\`\`
xₙ = (x₀ − x*)·aⁿ + x* ,   với  x* = b/(1 − a)
\`\`\`

**Walk-through — tiết kiệm có gửi thêm**: x₀ = 1000, lãi 5% và gửi thêm 100 mỗi năm → xₙ₊₁ = 1.05·xₙ + 100.
- x* = 100/(1 − 1.05) = 100/(−0.05) = **−2000** (điểm cân bằng âm, không đạt được — chỉ là "mỏ neo" của công thức).
- xₙ = (1000 − (−2000))·1.05ⁿ + (−2000) = **3000·(1.05)ⁿ − 2000**.
- Kiểm: n=0 → 3000 − 2000 = 1000 ✓. n=1 → 3000·1.05 − 2000 = 3150 − 2000 = 1150; lăn tay: 1.05·1000 + 100 = 1150 ✓.
- Sau 10 năm: 3000·1.6289 − 2000 = 4886.7 − 2000 = **2886.7** (so với 1628.9 nếu không gửi thêm — phần gửi thêm đóng góp đáng kể).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Điểm cân bằng âm −2000 nghĩa là gì khi tiền không thể âm?"* x* ở đây là **giá trị toán học** mà dãy sẽ tiến tới *nếu* a < 1; với a = 1.05 > 1 dãy chạy *ra xa* x* (lên +∞). x* vẫn hữu ích vì nó cho công thức đóng gọn — không cần "đạt được" mới có ý nghĩa.
- *"Vì sao đổi biến yₙ = xₙ − x* lại biến mất số hạng b?"* Vì x* "hấp thụ" b: yₙ₊₁ = xₙ₊₁ − x* = (axₙ+b) − (ax*+b) = a(xₙ − x*) = a·yₙ. Số hạng cố định b triệt tiêu vì cả xₙ và x* đều có nó.

⚠ **Lỗi thường gặp — dùng công thức cân bằng x* = b/(1−a) khi a = 1.** Khi a = 1, mẫu 1−a = 0, công thức vô nghĩa. Lúc đó xₙ₊₁ = xₙ + b là **cấp số cộng**: xₙ = x₀ + n·b (tăng đều mãi, không có cân bằng hữu hạn). Phản ví dụ: xₙ₊₁ = xₙ + 3 → xₙ = x₀ + 3n, không hội tụ.

🔁 **Dừng lại tự kiểm tra**

1. Giải xₙ₊₁ = 0.5·xₙ + 4 với x₀ = 10. Tìm x* và công thức xₙ. Dãy tiến tới đâu?

<details><summary>Đáp án</summary>

x* = 4/(1−0.5) = 8. xₙ = (10−8)·0.5ⁿ + 8 = **2·(0.5)ⁿ + 8**. Vì |a| = 0.5 < 1, (0.5)ⁿ → 0 → **xₙ → 8** (hội tụ về cân bằng). Kiểm: x₁ = 0.5·10+4 = 9; công thức: 2·0.5+8 = 9 ✓.

</details>

### 📝 Tóm tắt mục 2

- xₙ₊₁ = a·xₙ (b=0): xₙ = x₀·aⁿ (cấp số nhân — lãi kép, phân rã).
- xₙ₊₁ = a·xₙ + b (a≠1): x* = b/(1−a), xₙ = (x₀−x*)·aⁿ + x*.
- a = 1: cấp số cộng xₙ = x₀ + nb (không có cân bằng hữu hạn).

---

## 3. Điểm cân bằng & ổn định

💡 **Trực giác — viên bi trong bát hay trên đồi.** Điểm cân bằng x* là chỗ dãy "đứng yên" (xₙ₊₁ = xₙ). Nhưng có hai loại: **ổn định** (như viên bi đáy bát — đẩy nhẹ rồi nó quay về) và **không ổn định** (viên bi đỉnh đồi — đẩy nhẹ là lăn đi mất). Câu hỏi then chốt: nếu bắt đầu *gần* x*, dãy tiến *về* hay chạy *ra xa* x*?

> 📐 **Định nghĩa đầy đủ — Điểm cân bằng & tính ổn định**
>
> **(a) Là gì**: Điểm cân bằng (fixed point) x* thỏa f(x*) = x* — đưa vào ra chính nó. x* **ổn định** nếu mọi dãy bắt đầu đủ gần x* sẽ hội tụ về x*; **không ổn định** nếu chúng chạy ra xa.
>
> **(b) Vì sao cần**: Hành vi *dài hạn* của hệ thường được quyết định bởi các điểm cân bằng và tính ổn định của chúng — đó là "đích đến" mà ta quan tâm hơn là từng giá trị xₙ. Dân số ổn định ở mức nào? Giá thị trường có hội tụ về điểm cân bằng không?
>
> **(c) Tiêu chí ổn định (bậc 1)**: x* ổn định khi **|f′(x*)| < 1** (độ dốc của f tại x* nhỏ hơn 1 về trị tuyệt đối); không ổn định khi |f′(x*)| > 1. Với mô hình tuyến tính f(x) = ax+b, f′ = a → **ổn định ⇔ |a| < 1**.
>
> **Ví dụ số (4 ví dụ)**:
> - xₙ₊₁ = 0.5xₙ + 4: x* = 8, f′ = 0.5, |0.5| < 1 → **ổn định**, hội tụ về 8.
> - xₙ₊₁ = 1.05xₙ + 100: x* = −2000, f′ = 1.05 > 1 → **không ổn định**, chạy ra xa.
> - xₙ₊₁ = −0.7xₙ + 3: x* = 3/1.7 ≈ 1.76, |−0.7| < 1 → ổn định nhưng **dao động** (a < 0 → đổi dấu mỗi bước, xoắn vào x*).
> - xₙ₊₁ = −1.2xₙ: x* = 0, |−1.2| > 1 → không ổn định, **dao động phân kỳ** (biên độ tăng, đổi dấu).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao điều kiện là |f′| < 1?"* Gần x*, đặt yₙ = xₙ − x*; xấp xỉ tuyến tính f(x) ≈ f(x*) + f′(x*)(x−x*) cho yₙ₊₁ ≈ f′(x*)·yₙ. Đây là cấp số nhân công bội f′(x*): độ lệch co lại (→0) khi |f′| < 1, phình ra khi |f′| > 1. (Liên hệ tuyến tính hóa ở [L01 mục 3](../lesson-01-modeling-cycle/).)
- *"Dấu của a/f′ ảnh hưởng gì?"* Trị tuyệt đối quyết định ổn định; **dấu** quyết định *kiểu*: a > 0 → tiến *một phía* (đơn điệu); a < 0 → **dao động** quanh x* (lắc qua lắc lại mỗi bước).

⚠ **Lỗi thường gặp — quên xét dấu, chỉ nhìn độ lớn.** |a| = 0.7 cho ổn định, nhưng a = +0.7 (tiến mượt) và a = −0.7 (xoắn dao động) cho *hình dạng* dãy rất khác. Khi vẽ/diễn giải phải để ý dấu.

🔁 **Dừng lại tự kiểm tra**

1. Xét xₙ₊₁ = 1.2·xₙ − 1. Tìm x*, xét ổn định, mô tả hành vi nếu x₀ = 4 và nếu x₀ = 5.

<details><summary>Đáp án</summary>

x* = b/(1−a) = (−1)/(1−1.2) = (−1)/(−0.2) = **5**. f′ = 1.2 > 1 → **không ổn định**.
- x₀ = 5 = x* → dãy đứng yên tại 5 mãi (đúng cân bằng).
- x₀ = 4 (lệch −1 khỏi x*) → yₙ = (4−5)·1.2ⁿ = −1.2ⁿ → chạy ra −∞: x₁ = 1.2·4−1 = 3.8, x₂ = 3.56, ... giảm dần ra xa 5. Cân bằng không ổn định: lệch nhỏ cũng bị khuếch đại.

</details>

### 📝 Tóm tắt mục 3

- Điểm cân bằng: f(x*) = x*. Ổn định ⇔ |f′(x*)| < 1 (tuyến tính: |a| < 1).
- |f′| quyết định ổn định; *dấu* quyết định kiểu: dương → đơn điệu, âm → dao động.
- Hành vi dài hạn của hệ do các điểm cân bằng + ổn định chi phối.

---

## 4. Mô hình logistic rời rạc — từ trật tự đến hỗn loạn

💡 **Trực giác.** Mô hình mũ xₙ₊₁ = r·xₙ tăng vô hạn — phi thực tế (tài nguyên có hạn, đã bàn ở [L01](../lesson-01-modeling-cycle/)). Logistic thêm "phanh" khi đông đúc: nhân thêm (1 − xₙ), nhỏ dần khi xₙ tiến tới 1 (sức chứa chuẩn hóa). Đơn giản đến bất ngờ — nhưng sinh ra hành vi cực kỳ phong phú.

**Mô hình** (x chuẩn hóa trong [0,1], r > 0):
\`\`\`
xₙ₊₁ = r·xₙ·(1 − xₙ)
\`\`\`

**Điểm cân bằng**: x* = r·x*(1−x*) → x* = 0 hoặc **x* = 1 − 1/r**.
**Ổn định**: f′(x) = r(1 − 2x). Tại x* = 1−1/r: f′ = r(1 − 2(1−1/r)) = **2 − r**. Ổn định ⇔ |2−r| < 1 ⇔ **1 < r < 3**.

Hành vi đổi theo r (bắt đầu x₀ = 0.3):

| r | Hành vi | Mô tả |
|---|---------|-------|
| 0.5 | → 0 | Tuyệt chủng (r < 1: sinh không bù chết) |
| 2.0 | → 0.5 | Hội tụ về x* = 1−1/2 = 0.5 |
| 2.8 | → 0.643 | Hội tụ về x* = 1−1/2.8 ≈ 0.643 (chậm hơn) |
| 3.2 | chu kỳ 2 | Lắc giữa hai giá trị (cân bằng mất ổn định) |
| 3.5 | chu kỳ 4 | Lắc giữa bốn giá trị |
| 3.9 | hỗn loạn | Không lặp, nhạy điều kiện đầu (chaos) |

**Walk-through r = 2, x₀ = 0.3** (kiểm hội tụ về 0.5):
- x₁ = 2·0.3·0.7 = 0.420
- x₂ = 2·0.420·0.580 = 0.4872
- x₃ = 2·0.4872·0.5128 = 0.4997
- x₄ ≈ 0.49999... → **→ 0.5** ✓ (khớp x* = 0.5, và |f′| = |2−2| = 0 < 1 nên hội tụ rất nhanh).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Một công thức đơn giản vậy sao ra hỗn loạn?"* Vì nó **phi tuyến** (có x²) và *lặp lại*: phi tuyến + lặp = khuếch đại sai khác. Đây là phát hiện chấn động (May, 1976): hệ tất định đơn giản vẫn cho hành vi không dự đoán nổi dài hạn. Nền tảng của *lý thuyết hỗn loạn*.
- *"Hỗn loạn nghĩa là ngẫu nhiên?"* **Không.** Công thức hoàn toàn tất định (cùng x₀ ra cùng dãy). "Hỗn loạn" = **nhạy cảm điều kiện đầu**: x₀ = 0.3 và x₀ = 0.3001 sau ít bước rẽ hoàn toàn khác nhau → không dự đoán xa được dù biết luật chính xác. (Hiệu ứng cánh bướm.)
- *"Vì sao mất ổn định đúng tại r = 3?"* Vì tại đó |f′(x*)| = |2−r| = 1 — đúng ngưỡng. r vượt 3 → |2−r| > 1 → x* không ổn định → hệ chuyển sang chu kỳ 2 (rẽ nhánh — bifurcation).

⚠ **Lỗi thường gặp — coi logistic rời rạc và logistic liên tục giống nhau.** ODE logistic dN/dt = rN(1−N/K) ([L04](../lesson-04-continuous-ode-models/)) *luôn* hội tụ mượt về K — **không** có chu kỳ hay hỗn loạn. Bản rời rạc thì có, do "bước nhảy" rời rạc có thể vọt lố qua cân bằng. Đừng giả định hành vi liên tục cho mô hình rời rạc.

🔁 **Dừng lại tự kiểm tra**

1. Với r = 2.5, tìm điểm cân bằng dương x* và xét nó ổn định không.

<details><summary>Đáp án</summary>

x* = 1 − 1/2.5 = 1 − 0.4 = **0.6**. f′(x*) = 2 − r = 2 − 2.5 = −0.5, |−0.5| < 1 → **ổn định** (và vì f′ < 0, dãy *dao động* xoắn vào 0.6 chứ không tiến một phía). r = 2.5 nằm trong (1, 3) nên đúng là ổn định.

</details>

### 📝 Tóm tắt mục 4

- Logistic rời rạc xₙ₊₁ = r·xₙ(1−xₙ): mũ + "phanh" (1−xₙ) chống tăng vô hạn.
- Cân bằng x* = 1−1/r, ổn định khi 1 < r < 3. Vượt 3: chu kỳ 2 → 4 → ... → hỗn loạn.
- Hỗn loạn = tất định nhưng nhạy điều kiện đầu (không phải ngẫu nhiên). Khác hẳn logistic liên tục (luôn mượt).

---

## 5. Rời rạc hay liên tục?

| | Rời rạc (sai phân) | Liên tục (ODE) |
|---|---|---|
| **Thời gian** | Bước: n = 0, 1, 2, ... | Liên tục: t ∈ ℝ |
| **Công cụ** | xₙ₊₁ = f(xₙ), lăn/lặp | dx/dt = g(x), giải tích phân |
| **Hợp khi** | Sự kiện theo kỳ (năm, thế hệ, vòng lặp) | Thay đổi trơn, liên tục |
| **Mô phỏng máy tính** | Trực tiếp (vòng for) | Phải rời rạc hóa (Euler: xₙ₊₁ = xₙ + h·g(xₙ)) |
| **Hành vi** | Có thể chu kỳ/hỗn loạn dù đơn giản | Bậc 1 autonom: luôn đơn điệu về cân bằng |

💡 Thực ra **giải ODE bằng máy tính chính là biến nó thành phương trình sai phân** (phương pháp Euler) — nên hai thế giới gặp nhau. Bước h nhỏ → bản rời rạc xấp xỉ bản liên tục.

📝 **Tóm tắt mục 5**: chọn rời rạc khi hệ cập nhật theo bước; liên tục khi thay đổi trơn. Mô phỏng ODE trên máy = rời rạc hóa (Euler). Mô hình rời rạc giàu hành vi hơn (chu kỳ, hỗn loạn).

---

## 6. Bài tập

**Bài 1.** Giải xₙ₊₁ = 3·xₙ với x₀ = 2. Cho công thức xₙ và tính x₅.

**Bài 2.** Một khoản vay 10 triệu, lãi 1%/tháng, trả góp 1 triệu/tháng cuối mỗi tháng: xₙ₊₁ = 1.01·xₙ − 1 (triệu). Tìm điểm cân bằng x*, công thức xₙ, và (định tính) số dư nợ tăng hay giảm?

**Bài 3.** Xét xₙ₊₁ = −0.5·xₙ + 3. Tìm x*, xét ổn định và mô tả kiểu hành vi (đơn điệu hay dao động?).

**Bài 4.** Logistic rời rạc với r = 2.8. (a) Tìm điểm cân bằng dương. (b) Nó ổn định không? (c) Tính 3 bước đầu từ x₀ = 0.2.

**Bài 5.** Giải thích trong vài câu vì sao xₙ₊₁ = 3.9·xₙ(1−xₙ) được gọi là "hỗn loạn" dù công thức hoàn toàn tất định.

---

## 7. Lời giải chi tiết

**Bài 1.** Thuần (b=0): xₙ = x₀·aⁿ = **2·3ⁿ**. x₅ = 2·3⁵ = 2·243 = **486**. Kiểm: x₁ = 6, x₂ = 18 = 2·9 ✓.

**Bài 2.** a = 1.01, b = −1. x* = b/(1−a) = (−1)/(1−1.01) = (−1)/(−0.01) = **100** (triệu). xₙ = (x₀ − x*)·aⁿ + x* = (10 − 100)·1.01ⁿ + 100 = **−90·(1.01)ⁿ + 100**. Vì a = 1.01 > 1 và (x₀ − x*) = −90 < 0, số hạng −90·1.01ⁿ ngày càng âm → **xₙ giảm** dần (số dư nợ giảm, khoản vay được trả hết). Kiểm: x₁ = 1.01·10 − 1 = 9.1; công thức: −90·1.01 + 100 = −90.9 + 100 = 9.1 ✓. (Tìm khi nào hết nợ: xₙ = 0 → 1.01ⁿ = 100/90 → n = ln(100/90)/ln1.01 ≈ 10.6 → khoảng 11 tháng.)

**Bài 3.** x* = 3/(1−(−0.5)) = 3/1.5 = **2**. f′ = a = −0.5, |−0.5| < 1 → **ổn định**. Vì a < 0 → **dao động** (xoắn vào x* = 2). Kiểm từ x₀ = 0: x₁ = 3, x₂ = −0.5·3+3 = 1.5, x₃ = −0.5·1.5+3 = 2.25, x₄ = 1.875, ... lắc quanh 2 và co về 2 ✓.

**Bài 4.** (a) x* = 1 − 1/2.8 = 1 − 0.357 = **0.643**. (b) f′(x*) = 2 − r = 2 − 2.8 = −0.8, |−0.8| < 1 → **ổn định** (dao động xoắn vào, vì f′ < 0); r = 2.8 ∈ (1,3) ✓. (c) x₀ = 0.2: x₁ = 2.8·0.2·0.8 = 0.448; x₂ = 2.8·0.448·0.552 = 0.692; x₃ = 2.8·0.692·0.308 = 0.597. (Đang lắc quanh 0.643, co dần — đúng dự đoán.)

**Bài 5.** Công thức tất định (cùng x₀ luôn ra cùng dãy, không có yếu tố ngẫu nhiên). "Hỗn loạn" chỉ **sự nhạy cảm cực độ với điều kiện đầu**: hai giá trị đầu sai khác cực nhỏ (vd 0.2 và 0.2001) sau ít bước sẽ cho dãy hoàn toàn khác nhau, nên *không thể dự đoán dài hạn* dù biết luật chính xác và đo x₀ rất kỹ (sai số đo luôn tồn tại). Ngoài ra dãy không bao giờ lặp lại tuần hoàn. Đó là "hỗn loạn tất định" — trật tự sinh ra hành vi trông như ngẫu nhiên.

---

## 8. Bài tiếp theo

[Lesson 04 — Mô hình liên tục (ODE)](../lesson-04-continuous-ode-models/): chuyển từ bước rời rạc sang thay đổi liên tục dx/dt; ta sẽ thấy logistic *liên tục* hội tụ mượt, khác hẳn bản rời rạc.

## 📝 Tổng kết

1. **Phương trình sai phân** xₙ₊₁ = f(xₙ): mô hình theo bước rời rạc (năm, thế hệ, vòng lặp).
2. **Tuyến tính** xₙ₊₁ = axₙ + b: x* = b/(1−a), xₙ = (x₀−x*)aⁿ + x* (a=1 → cấp số cộng).
3. **Ổn định**: |f′(x*)| < 1 ổn định; dấu quyết định đơn điệu (>0) hay dao động (<0).
4. **Logistic rời rạc** xₙ₊₁ = r·xₙ(1−xₙ): x* = 1−1/r, ổn định khi 1<r<3, rồi chu kỳ 2/4/... → hỗn loạn.
5. **Hỗn loạn** = tất định + nhạy điều kiện đầu; khác hẳn logistic liên tục (luôn mượt).
6. Rời rạc vs liên tục: chọn theo cách hệ cập nhật; mô phỏng ODE = rời rạc hóa (Euler).
`;
