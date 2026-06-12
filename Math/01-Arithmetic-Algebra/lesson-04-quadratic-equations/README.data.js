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

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/) — hằng đẳng thức $(a+b)^2 = a^2 + 2ab + b^2$ và $(a+b)(a-b) = a^2 - b^2$ (dùng liên tục bên dưới).
- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/) — biết giải $ax + b = 0$, biết "đảo phép toán" để chuyển vế.

**Sẽ gặp lại ở đâu?** Parabol và đỉnh của nó quay lại ở [Lesson 07 — Hàm số](../lesson-07-functions-intro/) (đồ thị, range) và sâu hơn ở [Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/). Cùng chủ đề ở tier Vectors: [Vectors/01-Algebra/lesson-06](../../../Vectors/01-Algebra/lesson-06-linear-quadratic/) nối quadratic với linear regression + MSE loss.

---

## 1. Phương trình bậc 2

### 1.1. Định nghĩa

**PT bậc 2 một ẩn** có dạng:

$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

💡 **Là gì**: PT có biến x lên đến lũy thừa 2 (bậc cao nhất là 2). Ba hệ số:
- $a$ — hệ số bậc 2 (leading coefficient), bắt buộc $a \\neq 0$.
- $b$ — hệ số bậc 1.
- $c$ — hệ số tự do (constant term).

Vd $2x^2 - 3x + 1 = 0$ có $a=2, b=-3, c=1$. Vd $x^2 - 9 = 0$ có $a=1, b=0, c=-9$ (khuyết $b$). Vd $3x^2 + 6x = 0$ có $a=3, b=6, c=0$ (khuyết $c$). Vd $-x^2 + 4 = 0$ có $a=-1, b=0, c=4$.

⚠ **Đọc đúng hệ số là bước số 1.** Trước khi tính bất cứ gì, chuyển PT về **đúng dạng chuẩn** $ax^2 + bx + c = 0$ (mọi thứ về một vế, vế kia bằng 0), rồi mới đọc $a, b, c$ **kèm dấu**. Vd $x^2 = 5x - 6$ phải viết lại thành $x^2 - 5x + 6 = 0$ → $a=1, b=-5, c=6$, KHÔNG phải $b=5, c=-6$.

**Vì sao quan trọng?** Vì xuất hiện rất nhiều trong thực tế:
- Quỹ đạo vật ném: $h(t) = h_0 + v_0 t - \\tfrac{1}{2}gt^2$ (Lesson 01 Physics) — "khi nào bóng chạm đất?" chính là giải $h(t) = 0$, một PT bậc 2.
- Tối ưu: tìm max/min của parabol — đỉnh parabol là điểm tối ưu. Đây là hạt nhân của **linear regression + MSE loss** trong machine learning (xem [Vectors/01-Algebra/lesson-06](../../../Vectors/01-Algebra/lesson-06-linear-quadratic/)).
- Hình học: định lý Pythagoras → căn bậc 2; bài toán diện tích "chiều dài hơn chiều rộng 3, diện tích 40" → PT bậc 2.
- Tài chính: lãi kép 2 kỳ, $A = P(1+r)^2$ — giải ra $r$ là bậc 2.

❓ **"Vì sao $a \\neq 0$ bắt buộc?"** Nếu $a = 0$, số hạng $ax^2$ biến mất, còn lại $bx + c = 0$ — đó là PT **bậc 1** (Lesson 03), không phải bậc 2. Ngoài ra công thức nghiệm có $2a$ ở mẫu: $a = 0$ → chia cho 0 → vô nghĩa.

### 1.2. Công thức nghiệm

💡 **Trực giác — biệt thức là "máy đo số nghiệm".** Trước khi giải, ta muốn biết PT **có** nghiệm không và **bao nhiêu** nghiệm. Biệt thức $\\Delta$ (đọc *"delta"*) là một con số tính từ $a, b, c$ làm đúng việc đó: chỉ cần nhìn **dấu** của $\\Delta$ là biết ngay số nghiệm thực, không cần giải xong. Vì sao $\\Delta$ làm được điều này sẽ rõ ở mục 1.4 (nó nằm dưới dấu căn — căn của số âm không tồn tại trong số thực).

**Biệt thức** (discriminant):

$$\\Delta = b^2 - 4ac$$

**Là gì**: một đại lượng đo "khoảng cách" giữa $b^2$ và $4ac$. **Vì sao tồn tại**: nó là biểu thức nằm dưới dấu căn trong công thức nghiệm — dấu của nó quyết định căn có khai được trong $\\mathbb{R}$ hay không. **Ví dụ số**: với $x^2 - 5x + 6$, $\\Delta = (-5)^2 - 4\\cdot 1\\cdot 6 = 25 - 24 = 1 > 0$.

**Nghiệm** (quadratic formula):

$$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$

Đọc: *"trừ b, cộng-trừ căn delta, tất cả chia cho 2a"*. Dấu $\\pm$ tách thành **hai** nghiệm: $x_1 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}$ và $x_2 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}$.

### 1.3. Ba trường hợp

| $\\Delta$ | Số nghiệm thực | Công thức | Hình học (parabol cắt Ox) |
|---|-----------|-----------|---|
| $\\Delta > 0$ | 2 nghiệm phân biệt | $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ | **cắt** Ox tại 2 điểm |
| $\\Delta = 0$ | 1 nghiệm kép | $x = -\\dfrac{b}{2a}$ | **tiếp xúc** Ox tại đúng đỉnh |
| $\\Delta < 0$ | Vô nghiệm thực (có 2 nghiệm phức — sẽ học Tier Số phức) | — | **không chạm** Ox |

**Vì sao $\\Delta = 0$ cho $x = -b/(2a)$?** Khi $\\Delta = 0$, $\\sqrt{\\Delta} = 0$, nên $\\pm\\sqrt{\\Delta}$ biến mất: $x = \\dfrac{-b \\pm 0}{2a} = \\dfrac{-b}{2a}$. Hai nghiệm trùng nhau làm một → gọi là **nghiệm kép** (double root). Điểm này đúng là **hoành độ đỉnh** parabol (xem mục 3).

#### Hình dung 3 trường hợp bằng parabol (a > 0, mở lên)

\`\`\`
   Δ > 0                  Δ = 0                  Δ < 0
   2 nghiệm               1 nghiệm kép           vô nghiệm thực

  y                      y                      y
  |   \\      /           |   \\      /           |  \\        /
  |    \\    /            |    \\    /            |   \\      /
  |     \\  /             |     \\  /             |    \\    /   ← đỉnh
  +--•----•--→ x         +------•------→ x      +-----\\__/------→ x
     \\__/  (cắt 2 chỗ)          (chạm đáy)      |   (lơ lửng TRÊN Ox)
   đỉnh DƯỚI Ox          đỉnh CHẠM Ox           đỉnh TRÊN Ox
   y_đỉnh < 0            y_đỉnh = 0             y_đỉnh > 0
\`\`\`

Mấu chốt: tung độ đỉnh là $y_v = -\\dfrac{\\Delta}{4a}$. Với $a > 0$: $\\Delta > 0 \\Rightarrow y_v < 0$ (đỉnh dưới Ox, parabol đi lên hai bên buộc phải cắt Ox 2 chỗ); $\\Delta = 0 \\Rightarrow y_v = 0$ (đỉnh nằm trên Ox → chạm 1 điểm); $\\Delta < 0 \\Rightarrow y_v > 0$ (đỉnh trên Ox, cả parabol lơ lửng → không chạm). Khi $a < 0$ parabol mở xuống, logic lật ngược nhưng **kết luận về số giao điểm giống hệt** — chỉ dấu của $\\Delta$ quyết định.

❓ **"Δ < 0 là vô nghiệm hẳn, hay nghiệm bị 'ẩn'?"** Vô nghiệm trong tập số thực $\\mathbb{R}$, nhưng có **2 nghiệm phức** (complex roots): $\\sqrt{\\text{số âm}}$ tồn tại trong số phức (Tier Số phức). Hình học: parabol không chạm Ox nghĩa là không có giao điểm **thực**.

### 1.4. Walk-through chứng minh — dẫn xuất công thức nghiệm bằng bình phương đầy đủ

💡 **Ý tưởng cốt lõi**: ta KHÔNG biết giải $ax^2 + bx + c = 0$ trực tiếp, nhưng giải được $(\\text{cái gì})^2 = \\text{số}$ rất dễ (lấy căn 2 vế). Vậy mục tiêu: **biến vế trái thành một bình phương hoàn chỉnh** $(x + \\text{?})^2$ cộng phần dư. Kỹ thuật đó gọi là **bình phương đầy đủ** (completing the square). Toàn bộ công thức nghiệm chui ra từ đúng một ý này.

**Bước 1 — chia cho $a$** để hệ số bậc 2 thành 1 (chia được vì $a \\neq 0$):

$$x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$$

**Bước 2 — nhận diện hằng đẳng thức.** Ta muốn $x^2 + \\dfrac{b}{a}x$ khớp với khai triển $(x + k)^2 = x^2 + 2kx + k^2$. So hệ số của $x$: $2k = \\dfrac{b}{a} \\Rightarrow k = \\dfrac{b}{2a}$. Vậy số cần "thêm vào" để đủ bình phương là $k^2 = \\left(\\dfrac{b}{2a}\\right)^2$. Thêm rồi bớt đúng số đó (cộng 0, không đổi PT):

$$x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 - \\left(\\frac{b}{2a}\\right)^2 + \\frac{c}{a} = 0$$

**Bước 3 — gộp 3 số hạng đầu thành bình phương** (đây chính là $(x+k)^2$ với $k = b/2a$), chuyển phần còn lại sang vế phải:

$$\\begin{aligned}
\\left(x + \\frac{b}{2a}\\right)^2 &= \\left(\\frac{b}{2a}\\right)^2 - \\frac{c}{a} &&\\text{(chuyển 2 số hạng sang phải)} \\\\[4pt]
&= \\frac{b^2}{4a^2} - \\frac{c}{a} &&\\text{(khai bình phương)} \\\\[4pt]
&= \\frac{b^2}{4a^2} - \\frac{4ac}{4a^2} &&\\text{(quy đồng: nhân tử-mẫu của } c/a \\text{ với } 4a) \\\\[4pt]
&= \\frac{b^2 - 4ac}{4a^2} = \\frac{\\Delta}{4a^2} &&\\text{(đây là lúc } \\Delta \\text{ xuất hiện!)}
\\end{aligned}$$

**Bước 4 — lấy căn 2 vế** (đòi hỏi $\\Delta \\ge 0$, vì vế phải phải $\\ge 0$ mới khai căn thực được — đây chính là lý do $\\Delta < 0$ vô nghiệm). Căn của một bình phương cho $\\pm$:

$$\\begin{aligned}
x + \\frac{b}{2a} &= \\pm\\sqrt{\\frac{\\Delta}{4a^2}} = \\frac{\\pm\\sqrt{\\Delta}}{2a} &&\\text{(vì } \\sqrt{4a^2} = 2|a|\\text{, dấu gộp vào } \\pm) \\\\[4pt]
x &= -\\frac{b}{2a} + \\frac{\\pm\\sqrt{\\Delta}}{2a} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} &&\\text{(chuyển } b/2a \\text{ sang phải, gộp mẫu)}
\\end{aligned}$$

Không bước nào "dễ thấy" — mọi phép biến đổi đều hiện rõ. Mấu chốt: $\\Delta$ và dấu $\\pm$ không phải công thức học thuộc, chúng **nảy sinh tự nhiên** từ bước quy đồng và bước khai căn.

### 1.5. Walk-through giải — 5 ví dụ phủ đủ các trường hợp

Quy trình chuẩn 4 bước, áp cho mọi PT: **(1)** đưa về dạng chuẩn, đọc $a,b,c$ kèm dấu → **(2)** tính $\\Delta = b^2 - 4ac$ → **(3)** xét dấu $\\Delta$ → **(4)** thay vào công thức nghiệm.

**Ví dụ 1 — Δ > 0, nghiệm nguyên đẹp**: $x^2 - 5x + 6 = 0$.

$$\\begin{aligned}
a=1,\\ b=-5,\\ c=6 \\quad\\Rightarrow\\quad \\Delta &= (-5)^2 - 4\\cdot 1\\cdot 6 = 25 - 24 = 1 > 0 \\\\[4pt]
\\sqrt{\\Delta} &= 1 \\\\[4pt]
x &= \\frac{-(-5) \\pm 1}{2\\cdot 1} = \\frac{5 \\pm 1}{2}
\\end{aligned}$$

→ $x_1 = \\dfrac{5+1}{2} = 3$, $x_2 = \\dfrac{5-1}{2} = 2$. **Nghiệm: 3 và 2.** (Kiểm Viète: $3\\cdot 2 = 6 = c/a$ ✓; $3 + 2 = 5 = -b/a$ ✓.)

**Ví dụ 2 — Δ = 0, nghiệm kép**: $x^2 - 4x + 4 = 0$.

$$\\Delta = (-4)^2 - 4\\cdot 1\\cdot 4 = 16 - 16 = 0 \\quad\\Rightarrow\\quad x = \\frac{-(-4)}{2\\cdot 1} = \\frac{4}{2} = 2$$

→ **Nghiệm kép $x = 2$.** Nhận ra nhanh: $x^2 - 4x + 4 = (x-2)^2$, nên $(x-2)^2 = 0 \\Rightarrow x = 2$.

**Ví dụ 3 — Δ < 0, vô nghiệm thực**: $x^2 + x + 1 = 0$.

$$\\Delta = 1^2 - 4\\cdot 1\\cdot 1 = 1 - 4 = -3 < 0$$

→ **VÔ NGHIỆM** trong $\\mathbb{R}$ (parabol lơ lửng trên Ox, không cắt).

**Ví dụ 4 — $a \\neq 1$, nghiệm phân số**: $2x^2 + 3x - 5 = 0$.

$$\\begin{aligned}
a=2,\\ b=3,\\ c=-5 \\quad\\Rightarrow\\quad \\Delta &= 3^2 - 4\\cdot 2\\cdot(-5) = 9 + 40 = 49 > 0 \\\\[4pt]
\\sqrt{\\Delta} &= 7 \\\\[4pt]
x &= \\frac{-3 \\pm 7}{2\\cdot 2} = \\frac{-3 \\pm 7}{4}
\\end{aligned}$$

→ $x_1 = \\dfrac{-3+7}{4} = \\dfrac{4}{4} = 1$, $x_2 = \\dfrac{-3-7}{4} = \\dfrac{-10}{4} = -\\dfrac{5}{2}$. **Nghiệm: $1$ và $-\\dfrac{5}{2}$.** Lưu ý mẫu là $2a = 4$ (không phải 2) — quên nhân $a$ vào mẫu là lỗi hay gặp khi $a \\neq 1$.

**Ví dụ 5 — hệ số phân số, phải xử lý trước**: $\\dfrac{1}{2}x^2 - x - 4 = 0$.

Mẹo: **nhân cả hai vế cho 2** để bỏ phân số trước khi tính (dễ sai số hơn nếu giữ phân số):

$$\\frac{1}{2}x^2 - x - 4 = 0 \\;\\xrightarrow{\\times 2}\\; x^2 - 2x - 8 = 0$$

$$\\Delta = (-2)^2 - 4\\cdot 1\\cdot(-8) = 4 + 32 = 36,\\quad \\sqrt{\\Delta} = 6,\\quad x = \\frac{2 \\pm 6}{2}$$

→ $x_1 = 4$, $x_2 = -2$. **Nghiệm: 4 và −2.** (Nhân hằng số khác 0 vào cả 2 vế không đổi tập nghiệm — vì $0\\times 2 = 0$.)

> **Bảng tổng hợp 5 ví dụ:**
>
> | PT | $a,b,c$ | $\\Delta$ | Loại | Nghiệm |
> |---|---|---|---|---|
> | $x^2-5x+6=0$ | $1,-5,6$ | $1$ | $\\Delta>0$ | $3,\\ 2$ |
> | $x^2-4x+4=0$ | $1,-4,4$ | $0$ | $\\Delta=0$ | $2$ (kép) |
> | $x^2+x+1=0$ | $1,1,1$ | $-3$ | $\\Delta<0$ | vô nghiệm $\\mathbb{R}$ |
> | $2x^2+3x-5=0$ | $2,3,-5$ | $49$ | $\\Delta>0$ | $1,\\ -\\tfrac{5}{2}$ |
> | $\\tfrac12 x^2-x-4=0$ | $1,-2,-8$ | $36$ | $\\Delta>0$ | $4,\\ -2$ |

### 1.6. Trực giác đồ thị — vì sao Δ quyết định số nghiệm

💡 **Hình dung**: $y = ax^2 + bx + c$ là một **parabol**. "Nghiệm" của $ax^2+bx+c = 0$ chính là chỗ parabol **cắt trục hoành** ($y=0$). Khi đó Δ cho biết:
- **$\\Delta > 0$**: parabol cắt trục x ở **2 điểm** → 2 nghiệm.
- **$\\Delta = 0$**: parabol **chạm** trục x ở đúng đỉnh → 1 nghiệm kép.
- **$\\Delta < 0$**: parabol **không chạm** trục x (lơ lửng trên hoặc dưới) → vô nghiệm thực.

Đỉnh parabol ở $x = -b/(2a)$ — sẽ dùng lại ở [Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

⚠ **Năm lỗi thường gặp**

**Lỗi 1 — quên điều kiện $a \\neq 0$.** Nếu $a = 0$ thì không còn là PT bậc 2 mà là bậc 1; công thức $-b/(2a)$ chia cho 0 → vô nghĩa. Luôn kiểm $a \\neq 0$ trước.

**Lỗi 2 — tính $b^2$ sai dấu khi $b$ âm.** $b^2$ **luôn $\\ge 0$** bất kể dấu của $b$. Vd $x^2-5x+6$ có $b=-5$: $\\Delta = (-5)^2 - 4\\cdot 1\\cdot 6 = 25-24 = 1$, KHÔNG phải $-25-24 = -49$. Sai dấu ở đây làm Δ âm giả tạo → kết luận "vô nghiệm" sai.

**Lỗi 3 — quên dấu $-b$ ở tử.** Tử là $-b \\pm \\sqrt{\\Delta}$. Với $b = -5$ thì $-b = +5$, không phải $-5$. Vd ở Ví dụ 1, tử là $-(-5) = +5$.

**Lỗi 4 — quên nhân $a$ vào mẫu khi $a \\neq 1$.** Mẫu là $2a$, không phải $2$. Vd $2x^2+3x-5=0$ có mẫu $2\\cdot 2 = 4$; nếu để mẫu $2$ ra nghiệm $\\dfrac{-3\\pm 7}{2}$ sai bét.

**Lỗi 5 — quên đưa về dạng chuẩn trước khi đọc hệ số.** $x^2 = 5x - 6$ phải chuyển thành $x^2 - 5x + 6 = 0$ rồi mới đọc $b=-5, c=6$. Đọc trực tiếp từ $x^2 = 5x - 6$ ($b=5, c=-6$) cho $\\Delta$ và nghiệm sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có dấu $\\pm$?"* Vì bước $\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{\\Delta}{4a^2}$ khi lấy căn cho **2 khả năng**: $x + \\dfrac{b}{2a} = +\\dfrac{\\sqrt{\\Delta}}{2a}$ hoặc $= -\\dfrac{\\sqrt{\\Delta}}{2a}$. Một số dương có 2 căn bậc 2 (vd $\\sqrt{9}$ ứng $+3$ và $-3$). Đó là gốc của "2 nghiệm".
- *"Tính $\\Delta$ có đắt không, có cách nhanh hơn không?"* Δ chỉ là một phép tính số học nhỏ. Nhưng nếu nghiệm "đẹp" (nguyên), thường **nhẩm bằng Viète** (mục 2) hoặc **phân tích nhân tử** (mục 1.7) còn nhanh hơn cả tính Δ.
- *"Công thức nghiệm có luôn dùng được không?"* Có — đây là phương pháp **vạn năng**, chạy cho MỌI PT bậc 2 (kể cả hệ số xấu). Factoring/Viète chỉ tiện khi nghiệm đẹp. Khi bí, luôn quay về công thức nghiệm.

🔁 **Dừng lại tự kiểm tra**: giải $x^2 - 6x + 8 = 0$ và $3x^2 - 2x - 1 = 0$ bằng công thức.

<details><summary>Đáp án</summary>

(1) $\\Delta = (-6)^2 - 32 = 4$, $\\sqrt{\\Delta} = 2$. $x = (6 \\pm 2)/2$ → $x = 4$ hoặc $x = 2$. (Viète: tổng 6, tích 8 ✓.)

(2) $a=3,b=-2,c=-1$: $\\Delta = (-2)^2 - 4\\cdot 3\\cdot(-1) = 4 + 12 = 16$, $\\sqrt{\\Delta}=4$. $x = \\dfrac{2\\pm 4}{6}$ → $x = 1$ hoặc $x = -\\dfrac{1}{3}$. (Chú ý mẫu $2a = 6$.)

</details>

### 1.7. Phân tích nhân tử — giải nhanh khi nghiệm đẹp

💡 **Trực giác**: nếu PT viết được thành **tích bằng 0**, $(x - x_1)(x - x_2) = 0$, thì nghiệm lộ ngay — vì **một tích bằng 0 khi và chỉ khi một thừa số bằng 0** (zero-product property). $(x-3)(x-2) = 0 \\Rightarrow x-3=0$ hoặc $x-2=0 \\Rightarrow x = 3$ hoặc $x = 2$.

Liên hệ với Viète: khai triển $(x - x_1)(x - x_2) = x^2 - (x_1+x_2)x + x_1 x_2$. So với $x^2 + \\dfrac{b}{a}x + \\dfrac{c}{a}$ (chia PT cho $a$) thấy ngay $x_1 + x_2 = -\\dfrac{b}{a}$, $x_1 x_2 = \\dfrac{c}{a}$ — đúng định lý Viète (mục 2).

**Walk-through 4 ví dụ:**

1. $x^2 - 5x + 6 = 0$: tìm 2 số tổng $5$, tích $6$ → $2,3$. Viết $(x-2)(x-3)=0 \\Rightarrow x = 2$ hoặc $3$.
2. $x^2 + x - 12 = 0$: tổng $-1$, tích $-12$ → $-4, 3$. $(x+4)(x-3)=0 \\Rightarrow x = -4$ hoặc $3$.
3. $x^2 - 9 = 0$ (hiệu hai bình phương): $x^2 - 3^2 = (x-3)(x+3) = 0 \\Rightarrow x = 3$ hoặc $-3$.
4. $3x^2 + 6x = 0$ (khuyết $c$): đặt nhân tử chung $3x(x + 2) = 0 \\Rightarrow x = 0$ hoặc $x = -2$. **Lưu ý:** đừng chia 2 vế cho $x$ — sẽ **mất nghiệm $x=0$**.

⚠ **Lỗi**: chia cả hai vế cho $x$ (hoặc cho biểu thức chứa biến) làm **mất nghiệm**. $3x^2 + 6x = 0$ chia cho $3x$ ra $x = -2$, đánh rơi $x = 0$. Luôn đặt nhân tử chung, đừng chia.

### 📝 Tóm tắt mục 1

- PT bậc 2: $ax^2+bx+c=0$ ($a\\neq 0$); nghiệm = chỗ parabol cắt trục x. Đưa về **dạng chuẩn** rồi đọc $a,b,c$ **kèm dấu**.
- $\\Delta = b^2-4ac$ quyết định số nghiệm: $>0$ (2 nghiệm, cắt Ox), $=0$ (1 kép, tiếp xúc Ox), $<0$ (vô nghiệm $\\mathbb{R}$, lơ lửng). Lý do hình học: $y_{\\text{đỉnh}} = -\\Delta/(4a)$.
- Công thức $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$, **dẫn xuất** từ bình phương đầy đủ — $\\Delta$ và $\\pm$ nảy sinh tự nhiên, không phải học thuộc.
- Quy trình 4 bước: chuẩn hoá → tính $\\Delta$ → xét dấu → thay công thức. Khi nghiệm đẹp: **nhân tử / Viète** nhanh hơn.
- 5 lỗi: quên $a\\neq 0$, sai dấu $b^2$, quên $-b$, quên $2a$ ở mẫu, chưa chuẩn hoá đã đọc hệ số. Đừng chia 2 vế cho $x$ (mất nghiệm).

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

💡 **Trực giác**: thay vì "giải" PT, ta **đoán** 2 số rồi kiểm bằng tổng + tích. Với hệ số nguyên nhỏ, nhẩm nhanh hơn tính Δ rất nhiều. Quy tắc: nếu $a = 1$ thì cần 2 số có **tổng $= -b$** và **tích $= c$**.

**Tìm nhanh nghiệm (4 ví dụ)**:

| PT ($a=1$) | Tổng $= -b$ | Tích $= c$ | Cặp số | Nghiệm |
|---|---|---|---|---|
| $x^2 - 5x + 6 = 0$ | $5$ | $6$ | $2, 3$ | $2, 3$ |
| $x^2 - 7x + 10 = 0$ | $7$ | $10$ | $2, 5$ | $2, 5$ |
| $x^2 + x - 12 = 0$ | $-1$ | $-12$ | $3, -4$ | $3, -4$ |
| $x^2 - 2x - 15 = 0$ | $2$ | $-15$ | $5, -3$ | $5, -3$ |

**Mẹo dấu của tích**: tích $c > 0$ → 2 nghiệm **cùng dấu** (cùng dương nếu tổng dương, cùng âm nếu tổng âm); tích $c < 0$ → 2 nghiệm **trái dấu**. Vd $x^2 + x - 12$: tích $-12 < 0$ nên trái dấu → $3$ và $-4$.

**Lập PT từ 2 nghiệm**: cho nghiệm $x_1, x_2$, PT (với $a=1$) là $x^2 - (x_1 + x_2)x + x_1 x_2 = 0$.
- Nghiệm $4$ và $-3$: $x^2 - (4 + (-3))x + 4\\cdot(-3) = x^2 - x - 12 = 0$.
- Nghiệm $2$ và $5$: $x^2 - 7x + 10 = 0$.
- Nghiệm $-1$ và $-6$: $x^2 - (-7)x + 6 = x^2 + 7x + 6 = 0$.
- Nghiệm kép $3$ (tức $x_1=x_2=3$): $x^2 - 6x + 9 = 0 = (x-3)^2$.

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

⚠ **Lỗi thường gặp với Viète**

**Lỗi 1 — quên chia cho $a$ khi $a \\neq 1$.** Công thức là $x_1 + x_2 = -\\dfrac{b}{a}$ và $x_1 x_2 = \\dfrac{c}{a}$, KHÔNG phải $-b$ và $c$. Chỉ khi $a = 1$ mới rút gọn thành "tổng $=-b$, tích $=c$". Vd $2x^2 - 8x + 6 = 0$: tổng $= -(-8)/2 = 4$, tích $= 6/2 = 3$ → nghiệm $1, 3$ (kiểm: $1+3=4$ ✓, $1\\cdot 3=3$ ✓). Nếu dùng nhầm "tổng $=8$, tích $=6$" → sai.

**Lỗi 2 — sai dấu của tổng.** Tổng là $-b/a$ (có dấu trừ), không phải $b/a$. Vd $x^2 - 5x + 6$: tổng $= -(-5)/1 = +5$. Nhiều người viết $-5$.

**Lỗi 3 — dùng Viète cho PT chưa chuẩn hoá / chưa biết có nghiệm thực.** Trước khi nhẩm, nên đảm bảo $\\Delta \\ge 0$ (nếu cần nghiệm thực). Vd $x^2 + x + 1 = 0$ có "tổng $-1$, tích $1$" nhưng KHÔNG có cặp số thực nào thoả ($\\Delta = -3 < 0$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Viète dùng khi nào thay cho công thức nghiệm?"* Khi nghiệm "đẹp" (nguyên/nhẩm được). $x^2-5x+6=0$: nhẩm 2 số tổng 5, tích 6 → 2 và 3, nhanh hơn tính Δ. Nếu hệ số xấu → vẫn phải dùng công thức nghiệm.
- *"Viète có đúng khi Δ < 0 không?"* Có — đúng cả với 2 nghiệm phức (tổng và tích vẫn là số thực $-b/a$, $c/a$). Nhưng lúc đó không nhẩm ra cặp số **thực** được.
- *"$a \\neq 1$ thì còn nhẩm được không?"* Được, nhưng phải nhẩm theo $-b/a$ và $c/a$. Mẹo thực dụng: chia PT cho $a$ trước để về dạng $x^2 + px + q = 0$ rồi nhẩm tổng $-p$, tích $q$.

🔁 **Dừng lại tự kiểm tra**: (1) dùng Viète nhẩm nghiệm $x^2 - 7x + 10 = 0$; (2) nhẩm nghiệm $2x^2 - 8x + 6 = 0$.

<details><summary>Đáp án</summary>

(1) Cần 2 số tổng 7, tích 10 → **2 và 5**. (Kiểm: $2+5=7$, $2\\cdot 5=10$ ✓.)

(2) $a=2$: tổng $= 8/2 = 4$, tích $= 6/2 = 3$ → cần 2 số tổng 4, tích 3 → **1 và 3**. (Kiểm bằng công thức: $\\Delta = 64 - 48 = 16$, $x = (8\\pm 4)/4$ = $3$ hoặc $1$ ✓.)

</details>

### 📝 Tóm tắt mục 2

- Viète: $x_1+x_2 = -b/a$, $x_1\\cdot x_2 = c/a$ — suy trực tiếp từ công thức nghiệm (tổng triệt tiêu $\\sqrt{\\Delta}$, tích dùng $(m+n)(m-n)=m^2-n^2$).
- Khi $a = 1$: tổng $= -b$, tích $= c$. Khi $a \\neq 1$: **phải chia cho $a$**.
- Dùng để nhẩm nghiệm đẹp và lập PT từ 2 nghiệm cho trước ($x^2 - Sx + P = 0$).
- Dấu tích: $c/a > 0$ → 2 nghiệm cùng dấu; $c/a < 0$ → trái dấu.

---

## 3. Đỉnh parabol & dạng đỉnh (vertex form)

### 3.1. Đỉnh parabol — điểm cực trị

💡 **Trực giác — thung lũng và ngọn đồi**: đồ thị $y = ax^2 + bx + c$ là parabol.
- $a > 0$: parabol **mở lên** (hình chữ U, "thung lũng") → có điểm **thấp nhất** (min) tại đỉnh.
- $a < 0$: parabol **mở xuống** (chữ U lộn ngược, "ngọn đồi") → có điểm **cao nhất** (max) tại đỉnh.

\`\`\`
   a > 0 (mở lên)              a < 0 (mở xuống)
   y                           y      đỉnh = MAX
   |   \\         /             |        _•_
   |    \\       /              |       /   \\
   |     \\_   _/               |      /     \\
   +-------•-------→ x          +-----/-------\\----→ x
        đỉnh = MIN
\`\`\`

**Công thức đỉnh** $(x_v, y_v)$:

$$x_v = \\frac{-b}{2a}, \\qquad y_v = \\frac{-\\Delta}{4a} \\quad (\\Delta = b^2 - 4ac)$$

> **Mẹo nhớ**: chỉ cần thuộc $x_v = -b/(2a)$. Còn $y_v$? Khỏi học — cứ **thay $x_v$ vào $y = ax^2+bx+c$** là ra.

**Vì sao $x_v = -b/(2a)$?** Parabol đối xứng qua một trục đứng. Nếu nó cắt Ox tại $x_1, x_2$ thì trục đối xứng đi qua **trung điểm** $\\dfrac{x_1+x_2}{2}$. Theo Viète $x_1 + x_2 = -b/a$, nên trung điểm $= -b/(2a)$. Ngay cả khi $\\Delta < 0$ (không có nghiệm thực), công thức vẫn đúng vì parabol vẫn có trục đối xứng.

**Walk-through 4 ví dụ tìm đỉnh:**

| PT | $x_v = -b/(2a)$ | $y_v$ (thay vào) | Đỉnh | Loại |
|---|---|---|---|---|
| $y = x^2 - 4x + 3$ | $4/2 = 2$ | $4 - 8 + 3 = -1$ | $(2, -1)$ | min ($a>0$) |
| $y = x^2 - 6x + 8$ | $6/2 = 3$ | $9 - 18 + 8 = -1$ | $(3, -1)$ | min |
| $y = -x^2 + 2x + 3$ | $-2/(-2) = 1$ | $-1 + 2 + 3 = 4$ | $(1, 4)$ | max ($a<0$) |
| $y = 2x^2 + 8x + 5$ | $-8/4 = -2$ | $8 - 16 + 5 = -3$ | $(-2, -3)$ | min |

### 3.2. Dạng đỉnh — completing the square áp cho số cụ thể

Mọi parabol viết lại được thành **dạng đỉnh** (vertex form):

$$y = a(x - h)^2 + k \\qquad \\text{với đỉnh } (h, k) = \\left(\\frac{-b}{2a},\\ \\frac{-\\Delta}{4a}\\right)$$

Đây chính là kỹ thuật **bình phương đầy đủ** ở mục 1.4, nhưng áp cho hệ số cụ thể. Lợi ích: đọc đỉnh ngay lập tức, và **giải PT** mà không cần công thức nghiệm.

**Walk-through — đưa $y = x^2 - 6x + 5$ về dạng đỉnh từng bước:**

$$\\begin{aligned}
y &= x^2 - 6x + 5 \\\\
&= (x^2 - 6x + 9) - 9 + 5 &&\\text{(thêm-bớt } (6/2)^2 = 9) \\\\
&= (x - 3)^2 - 4 &&\\text{(gộp thành bình phương)}
\\end{aligned}$$

→ Đỉnh $(3, -4)$. Giải $y = 0$: $(x-3)^2 = 4 \\Rightarrow x - 3 = \\pm 2 \\Rightarrow x = 5$ hoặc $x = 1$ (không cần công thức nghiệm).

**Ví dụ 2 — $a \\neq 1$: $y = 2x^2 + 8x + 5$.** Đặt $a$ ra ngoài trước:

$$\\begin{aligned}
y &= 2(x^2 + 4x) + 5 \\\\
&= 2(x^2 + 4x + 4 - 4) + 5 &&\\text{(thêm-bớt } (4/2)^2 = 4 \\text{ TRONG ngoặc)} \\\\
&= 2\\big((x+2)^2 - 4\\big) + 5 = 2(x+2)^2 - 8 + 5 = 2(x+2)^2 - 3
\\end{aligned}$$

→ Đỉnh $(-2, -3)$ — khớp bảng ở 3.1 ✓.

⚠ **Lỗi**: khi $a \\neq 1$, thêm-bớt $(b'/2)^2$ phải làm **bên trong ngoặc** đã đặt $a$ ra, và nhớ nhân $a$ khi mang số ra ngoài. Vd ở trên, $-4$ trong ngoặc khi ra ngoài thành $2\\cdot(-4) = -8$, không phải $-4$.

❓ *"Đỉnh để làm gì ngoài vẽ đồ thị?"* Đỉnh là **điểm tối ưu** — bài toán "diện tích lớn nhất với chu vi cho trước", "lợi nhuận max", "tầm xa của vật ném" đều quy về tìm đỉnh parabol. Trong ML, cực tiểu của MSE loss (một parabol theo tham số) chính là nghiệm hồi quy — xem [Vectors/01-Algebra/lesson-06](../../../Vectors/01-Algebra/lesson-06-linear-quadratic/).

🔁 **Dừng lại tự kiểm tra**: tìm đỉnh và giá trị nhỏ nhất của $y = x^2 - 8x + 20$.

<details><summary>Đáp án</summary>

$x_v = 8/2 = 4$; $y_v = 16 - 32 + 20 = 4$. Đỉnh $(4, 4)$, $a>0$ → **min $= 4$** tại $x = 4$. Dạng đỉnh: $y = (x-4)^2 + 4$. (Vì $\\Delta = 64 - 80 = -16 < 0$, parabol không chạm Ox → PT $y=0$ vô nghiệm, khớp đỉnh nằm trên Ox.)

</details>

### 📝 Tóm tắt mục 3

- Parabol $y = ax^2+bx+c$: $a>0$ mở lên (đỉnh = min), $a<0$ mở xuống (đỉnh = max).
- Đỉnh $(x_v, y_v) = \\left(-\\dfrac{b}{2a},\\ -\\dfrac{\\Delta}{4a}\\right)$; chỉ cần nhớ $x_v$, $y_v$ thay vào là ra.
- Dạng đỉnh $y = a(x-h)^2 + k$ (bình phương đầy đủ áp số cụ thể): đọc đỉnh ngay, giải PT không cần công thức nghiệm.
- Đỉnh = điểm tối ưu → nền tảng bài toán max/min và ML.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Giải $x^2 - 7x + 12 = 0$.

**Bài 2**: Giải $2x^2 + 3x - 5 = 0$.

**Bài 3**: Giải $x^2 - 6x + 9 = 0$.

**Bài 4**: Giải $x^2 + 2x + 5 = 0$.

**Bài 5**: Cho biết 2 nghiệm của 1 PT bậc 2 (hệ số $a = 1$) là 5 và −2. Tìm PT đó.

**Bài 6**: Tích 2 số = 18, hiệu = 3. Tìm 2 số. (Gợi ý: dùng Viete.)

**Bài 7**: Giải $\\dfrac{1}{3}x^2 - 2x + 3 = 0$ (hệ số phân số — nhân khử mẫu trước).

**Bài 8**: Tìm đỉnh, giá trị nhỏ nhất của $y = x^2 - 10x + 21$ và đưa về dạng đỉnh.

**Bài 9**: Phân tích nhân tử rồi giải $2x^2 - 8x = 0$ (khuyết $c$ — cẩn thận đừng mất nghiệm).

### Lời giải

**Bài 1**: $\\Delta = 49 - 48 = 1$. $x = (7 \\pm 1)/2$ = **4 hoặc 3**. (Viete: tổng 7, tích 12.)

**Bài 2**: $\\Delta = 9 + 40 = 49$. $x = (-3 \\pm 7)/4$ = **1 hoặc −5/2**.

**Bài 3**: $\\Delta = 36 - 36 = 0$. $x = 6/2$ = **3** (nghiệm kép). Hoặc nhận xét: $(x-3)^2 = 0$.

**Bài 4**: $\\Delta = 4 - 20 = -16 < 0$ → **VÔ NGHIỆM** trong $\\mathbb{R}$.

**Bài 5**: $x^2 - (5 + (-2))x + 5\\cdot(-2)$ = **$x^2 - 3x - 10 = 0$**.

**Bài 6**: Gọi 2 số là $a, b$. Có $a\\cdot b = 18$ và $|a - b| = 3$. Coi $a, b$ là nghiệm của PT bậc 2. Tổng cộng $S = a + b$. $(a-b)^2 = (a+b)^2 - 4ab \\to 9 = S^2 - 72 \\to S^2 = 81 \\to S = \\pm 9$. Hai trường hợp: PT $x^2 - 9x + 18 = 0$ (nghiệm 3, 6) hoặc $x^2 + 9x + 18 = 0$ (nghiệm −3, −6). → **(3, 6) hoặc (−3, −6)**.

**Bài 7**: Nhân cả 2 vế cho 3 để khử mẫu: $x^2 - 6x + 9 = 0$. $\\Delta = (-6)^2 - 4\\cdot 1\\cdot 9 = 36 - 36 = 0$ → **nghiệm kép $x = 6/2 = 3$**. (Nhận ra: $x^2-6x+9 = (x-3)^2$.) Kiểm trên PT gốc: $\\tfrac13\\cdot 9 - 2\\cdot 3 + 3 = 3 - 6 + 3 = 0$ ✓.

**Bài 8**: $x_v = -(-10)/(2\\cdot 1) = 5$; $y_v = 5^2 - 10\\cdot 5 + 21 = 25 - 50 + 21 = -4$. Đỉnh $(5, -4)$, $a>0$ → **min $= -4$** tại $x = 5$. Dạng đỉnh (thêm-bớt $(10/2)^2 = 25$): $y = (x^2 - 10x + 25) - 25 + 21 = $ **$(x-5)^2 - 4$**. (Vì $y_v = -4 < 0$, parabol cắt Ox 2 chỗ: $(x-5)^2 = 4 \\Rightarrow x = 7$ hoặc $3$.)

**Bài 9**: Đặt nhân tử chung $2x$: $2x^2 - 8x = 2x(x - 4) = 0 \\Rightarrow x = 0$ hoặc $x = 4$. **Nghiệm: 0 và 4.** ⚠ Đừng chia 2 vế cho $x$ — sẽ mất nghiệm $x = 0$. (Kiểm Viète: tổng $0+4 = 4 = -b/a = 8/2$ ✓; tích $0 = c/a = 0$ ✓.)

---

## 5. Bài tiếp theo

[Lesson 05 — Bất phương trình](../lesson-05-inequalities/).

## 📝 Tổng kết

1. **PT bậc 2**: $ax^2 + bx + c = 0$ ($a\\neq 0$). Đưa về dạng chuẩn, đọc $a,b,c$ kèm dấu trước khi tính.
2. **$\\Delta = b^2 - 4ac$**. $\\Delta>0$: 2 nghiệm (cắt Ox); $\\Delta=0$: 1 nghiệm kép (tiếp xúc); $\\Delta<0$: vô nghiệm $\\mathbb{R}$ (lơ lửng). Lý do: $y_{\\text{đỉnh}} = -\\Delta/(4a)$.
3. **Công thức nghiệm**: $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ — dẫn xuất từ bình phương đầy đủ; phương pháp vạn năng.
4. **Phân tích nhân tử / Viète**: nhanh khi nghiệm đẹp. Viète: $x_1 + x_2 = -b/a$, $x_1\\cdot x_2 = c/a$ (chia $a$ khi $a\\neq 1$).
5. **Đỉnh parabol**: $(x_v, y_v) = \\left(-\\dfrac{b}{2a}, -\\dfrac{\\Delta}{4a}\\right)$; dạng đỉnh $a(x-h)^2+k$ → điểm tối ưu (min/max), nền tảng ML.
6. **5 lỗi cốt lõi**: quên $a\\neq 0$; sai dấu $b^2$; quên $-b$ ở tử; quên $2a$ ở mẫu; chia 2 vế cho $x$ (mất nghiệm).
`;
