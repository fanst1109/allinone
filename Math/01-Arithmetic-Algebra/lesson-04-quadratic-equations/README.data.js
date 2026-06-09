// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-04-quadratic-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Phương trình bậc 2

## Mục tiêu học tập

- Giải **phương trình bậc 2** $ax^2 + bx + c = 0$ bằng công thức nghiệm.
- Hiểu **biệt thức $\\Delta$** và 3 trường hợp nghiệm.
- Áp dụng **định lý Viete** để tìm nghiệm nhanh.
- Giải phương trình bậc 2 bằng phương pháp **bình phương đầy đủ** (completing the square).

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/) — hằng đẳng thức $(a+b)^2$.
- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/).

---

## 1. Phương trình bậc 2

### 1.1. Định nghĩa

**PT bậc 2 một ẩn** có dạng:

$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

💡 **Là gì**: PT có biến x lên đến lũy thừa 2.

**Vì sao quan trọng?** Vì xuất hiện rất nhiều trong thực tế:
- Quỹ đạo vật ném: $h(t) = h_0 + v_0 t - (1/2)gt^2$ (Lesson 01 Physics).
- Tối ưu: tìm max/min của parabol.
- Hình học: định lý Pythagoras → căn bậc 2.

### 1.2. Công thức nghiệm

**Biệt thức** (discriminant):

$$\\Delta = b^2 - 4ac$$

**Nghiệm**:

$$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$

### 1.3. Ba trường hợp

| $\\Delta$ | Số nghiệm | Công thức |
|---|-----------|-----------|
| $\\Delta > 0$ | 2 nghiệm phân biệt | $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ |
| $\\Delta = 0$ | 1 nghiệm kép | $x = -\\dfrac{b}{2a}$ |
| $\\Delta < 0$ | Vô nghiệm thực (có nghiệm phức — sẽ học Lesson Số phức) | — |

### 1.4. Walk-through chứng minh — Bình phương đầy đủ

Bắt đầu từ $ax^2 + bx + c = 0$. Chia 2 vế cho a:

$$x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$$

Thêm và bớt $\\left(\\dfrac{b}{2a}\\right)^2$:

$$\\begin{aligned}
& x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 - \\left(\\frac{b}{2a}\\right)^2 + \\frac{c}{a} = 0 \\\\
& \\left(x + \\frac{b}{2a}\\right)^2 = \\left(\\frac{b}{2a}\\right)^2 - \\frac{c}{a} = \\frac{b^2 - 4ac}{4a^2} = \\frac{\\Delta}{4a^2}
\\end{aligned}$$

Lấy căn 2 vế (nếu $\\Delta \\ge 0$):

$$\\begin{aligned}
& x + \\frac{b}{2a} = \\frac{\\pm\\sqrt{\\Delta}}{2a} \\\\
& x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}
\\end{aligned}$$

### 1.5. Ba ví dụ

**Ví dụ 1**: $x^2 - 5x + 6 = 0$. $\\Delta = 25 - 24 = 1$. $x = (5 \\pm 1)/2$ = **3 hoặc 2**.

(Kiểm tra: $3\\cdot 2 = 6 = c/a$ ✓; $3 + 2 = 5 = -b/a$ ✓.)

**Ví dụ 2**: $x^2 - 4x + 4 = 0$. $\\Delta = 16 - 16 = 0$. $x = 4/2$ = **2** (nghiệm kép). 

**Ví dụ 3**: $x^2 + x + 1 = 0$. $\\Delta = 1 - 4 = -3 < 0$ → **VÔ NGHIỆM** trong $\\mathbb{R}$.

### 1.6. Trực giác đồ thị — vì sao Δ quyết định số nghiệm

💡 **Hình dung**: $y = ax^2 + bx + c$ là một **parabol**. "Nghiệm" của $ax^2+bx+c = 0$ chính là chỗ parabol **cắt trục hoành** ($y=0$). Khi đó Δ cho biết:
- **$\\Delta > 0$**: parabol cắt trục x ở **2 điểm** → 2 nghiệm.
- **$\\Delta = 0$**: parabol **chạm** trục x ở đúng đỉnh → 1 nghiệm kép.
- **$\\Delta < 0$**: parabol **không chạm** trục x (lơ lửng trên hoặc dưới) → vô nghiệm thực.

Đỉnh parabol ở $x = -b/(2a)$ — sẽ dùng lại ở [Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

⚠ **Lỗi thường gặp**

- Quên điều kiện $a \\neq 0$. Nếu $a = 0$ thì không còn là PT bậc 2 mà là bậc 1, công thức $-b/(2a)$ chia cho 0 → vô nghĩa.
- Tính $\\Delta$ khi $b$ âm: $b^2$ luôn **dương**. Vd $x^2-5x+6$: $\\Delta = (-5)^2 - 4\\cdot 1\\cdot 6 = 25-24 = 1$, không phải $-25-24$.
- Quên dấu $-b$ ở tử: nghiệm là $(-b \\pm \\sqrt{\\Delta})/(2a)$, với $b=-5$ thì $-b = +5$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có dấu $\\pm$?"* Vì bước $(x + b/2a)^2 = \\Delta/4a^2$ khi lấy căn cho **2 khả năng**: $x + b/2a = +\\sqrt{\\Delta}/2a$ hoặc $= -\\sqrt{\\Delta}/2a$. Một bình phương có 2 căn (dương và âm).
- *"Δ < 0 là vô nghiệm hẳn, hay có nghiệm 'ẩn'?"* Vô nghiệm trong $\\mathbb{R}$, nhưng **có 2 nghiệm phức** (Tier 03 — Số phức). $\\sqrt{\\text{số âm}}$ tồn tại trong số phức.

🔁 **Dừng lại tự kiểm tra**: giải $x^2 - 6x + 8 = 0$ bằng công thức.

<details><summary>Đáp án</summary>

$\\Delta = 36 - 32 = 4$, $\\sqrt{\\Delta} = 2$. $x = (6 \\pm 2)/2$ → $x = 4$ hoặc $x = 2$. (Viete: tổng 6, tích 8 ✓.)

</details>

### 📝 Tóm tắt mục 1

- PT bậc 2: $ax^2+bx+c=0$ ($a\\neq 0$); nghiệm = chỗ parabol cắt trục x.
- $\\Delta = b^2-4ac$ quyết định: $>0$ (2 nghiệm), $=0$ (1 kép), $<0$ (vô nghiệm $\\mathbb{R}$).
- Công thức $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$, suy ra từ bình phương đầy đủ.

---

## 2. Định lý Viete

### 2.1. Phát biểu

Cho PT $ax^2 + bx + c = 0$ có 2 nghiệm $x_1, x_2$:

$$\\begin{aligned}
x_1 + x_2 &= -\\frac{b}{a} \\\\
x_1 \\cdot x_2 &= \\frac{c}{a}
\\end{aligned}$$

💡 **Ý nghĩa**: cho phép suy nghiệm mà không cần tính Δ — nếu **đoán được** 2 số có tổng và tích tương ứng.

### 2.2. Ứng dụng

**Tìm nhanh nghiệm**: $x^2 - 5x + 6 = 0$. Cần 2 số có tổng = 5 và tích = 6 → **2 và 3**.

**Lập PT từ 2 nghiệm**: Cho biết nghiệm là 4 và −3. PT là $x^2 - (4 + (-3))x + 4\\cdot(-3)$ = $x^2 - x - 12 = 0$.

### 2.3. Chứng minh định lý Viete (từng bước)

Cho PT có 2 nghiệm $x_1, x_2$ theo công thức nghiệm:

$$x_1 = \\frac{-b + \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b - \\sqrt{\\Delta}}{2a}$$

**Tổng** — cộng 2 nghiệm, phần $\\sqrt{\\Delta}$ triệt tiêu:

$$x_1 + x_2 = \\frac{(-b + \\sqrt{\\Delta}) + (-b - \\sqrt{\\Delta})}{2a} = \\frac{-2b}{2a} = -\\frac{b}{a} \\quad ✓$$

**Tích** — nhân 2 nghiệm, dùng hằng đẳng thức $(m+n)(m-n) = m^2-n^2$ với $m=-b, n=\\sqrt{\\Delta}$:

$$x_1 \\cdot x_2 = \\frac{(-b)^2 - (\\sqrt{\\Delta})^2}{(2a)^2} = \\frac{b^2 - \\Delta}{4a^2}$$

Thay $\\Delta = b^2 - 4ac$:

$$= \\frac{b^2 - (b^2 - 4ac)}{4a^2} = \\frac{4ac}{4a^2} = \\frac{c}{a} \\quad ✓$$

Không bước nào "dễ thấy" — mọi phép biến đổi đều hiện rõ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Viete dùng khi nào thay cho công thức nghiệm?"* Khi nghiệm "đẹp" (nguyên/nhẩm được). $x^2-5x+6=0$: nhẩm 2 số tổng 5, tích 6 → 2 và 3, nhanh hơn tính Δ.
- *"Viete có đúng khi Δ < 0 không?"* Có — đúng cả với 2 nghiệm phức (tổng và tích vẫn là số thực $-b/a$, $c/a$).

🔁 **Dừng lại tự kiểm tra**: dùng Viete nhẩm nghiệm $x^2 - 7x + 10 = 0$.

<details><summary>Đáp án</summary>

Cần 2 số tổng 7, tích 10 → **2 và 5**. (Kiểm: $2+5=7$, $2\\cdot 5=10$ ✓.)

</details>

### 📝 Tóm tắt mục 2

- Viete: $x_1+x_2 = -b/a$, $x_1\\cdot x_2 = c/a$ — suy trực tiếp từ công thức nghiệm.
- Dùng để nhẩm nghiệm đẹp và lập PT từ 2 nghiệm cho trước.

---

## 3. Bài tập

### Bài tập

**Bài 1**: Giải $x^2 - 7x + 12 = 0$.

**Bài 2**: Giải $2x^2 + 3x - 5 = 0$.

**Bài 3**: Giải $x^2 - 6x + 9 = 0$.

**Bài 4**: Giải $x^2 + 2x + 5 = 0$.

**Bài 5**: Cho biết 2 nghiệm của 1 PT bậc 2 (hệ số $a = 1$) là 5 và −2. Tìm PT đó.

**Bài 6**: Tích 2 số = 18, hiệu = 3. Tìm 2 số. (Gợi ý: dùng Viete.)

### Lời giải

**Bài 1**: $\\Delta = 49 - 48 = 1$. $x = (7 \\pm 1)/2$ = **4 hoặc 3**. (Viete: tổng 7, tích 12.)

**Bài 2**: $\\Delta = 9 + 40 = 49$. $x = (-3 \\pm 7)/4$ = **1 hoặc −5/2**.

**Bài 3**: $\\Delta = 36 - 36 = 0$. $x = 6/2$ = **3** (nghiệm kép). Hoặc nhận xét: $(x-3)^2 = 0$.

**Bài 4**: $\\Delta = 4 - 20 = -16 < 0$ → **VÔ NGHIỆM** trong $\\mathbb{R}$.

**Bài 5**: $x^2 - (5 + (-2))x + 5\\cdot(-2)$ = **$x^2 - 3x - 10 = 0$**.

**Bài 6**: Gọi 2 số là $a, b$. Có $a\\cdot b = 18$ và $|a - b| = 3$. Coi $a, b$ là nghiệm của PT bậc 2. Tổng cộng $S = a + b$. $(a-b)^2 = (a+b)^2 - 4ab \\to 9 = S^2 - 72 \\to S^2 = 81 \\to S = \\pm 9$. Hai trường hợp: PT $x^2 - 9x + 18 = 0$ (nghiệm 3, 6) hoặc $x^2 + 9x + 18 = 0$ (nghiệm −3, −6). → **(3, 6) hoặc (−3, −6)**.

---

## 4. Bài tiếp theo

[Lesson 05 — Bất phương trình](../lesson-05-inequalities/).

## 📝 Tổng kết

1. **PT bậc 2**: $ax^2 + bx + c = 0$.
2. **$\\Delta = b^2 - 4ac$**. $\\Delta>0$: 2 nghiệm; $\\Delta=0$: 1 nghiệm kép; $\\Delta<0$: vô nghiệm $\\mathbb{R}$.
3. **Công thức**: $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.
4. **Viete**: $x_1 + x_2 = -b/a$, $x_1\\cdot x_2 = c/a$.
`;
