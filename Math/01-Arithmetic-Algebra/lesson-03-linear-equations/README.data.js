// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-03-linear-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Phương trình bậc 1

## Mục tiêu học tập

- Hiểu **phương trình** vs **biểu thức** — và ý nghĩa "nghiệm".
- Áp dụng **quy tắc chuyển vế và quy tắc nhân** để giải phương trình bậc 1.
- Giải **hệ phương trình bậc 1 hai ẩn** bằng phương pháp thế và phương pháp cộng đại số.
- Giải phương trình bậc 1 ứng dụng (toán đời sống).

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Phương trình bậc 1 một ẩn

### 1.1. Định nghĩa

**Phương trình** = đẳng thức chứa **biến chưa biết**, dạng tổng quát:

$$ax + b = 0 \\quad (a \\neq 0)$$

trong đó **x là ẩn cần tìm**, $a$ và $b$ là hằng số.

💡 **Là gì**: phương trình là "câu hỏi" — hỏi giá trị x nào sẽ làm đẳng thức đúng.

**Vì sao cần?** Vì rất nhiều bài toán đời thực có dạng "tìm giá trị x sao cho...":
- Tìm $x$ để $2x + 10 = 30$ (tốc độ chạy + thời gian = quãng đường).
- Tìm số tuổi anh nếu tổng tuổi 3 anh em = 60.

**Nghiệm** = giá trị x làm phương trình đúng.

#### 1.1a. Phân biệt biểu thức (expression) và phương trình (equation)

Trước khi giải, phải tách rõ hai khái niệm hay bị lẫn:

- **Biểu thức (expression)**: dãy phép toán **không có dấu $=$**. Chỉ **tính giá trị** (khi biết x), không "giải". Vd $2x + 3$, $x^2 - 4$, $\\tfrac{5}{y} + 2$.
- **Phương trình (equation)**: khẳng định **hai biểu thức bằng nhau**, có dấu $=$ và ít nhất một ẩn. Có khái niệm "nghiệm". Vd $2x + 3 = 7$.

| # | Cái này là... | Nói "đúng/sai" được không? |
|---|---|---|
| $2x + 3$ | biểu thức | không — chỉ có giá trị tùy x |
| $2x + 3 = 7$ | phương trình | đúng khi $x = 2$, sai với x khác |
| $x^2 - 4$ | biểu thức | có giá trị tùy x |
| $x^2 - 4 = 0$ | phương trình | đúng khi $x = 2$ hoặc $x = -2$ |

**Nghiệm là gì — minh họa bằng cách thử.** Với $2x + 3 = 7$, thử lần lượt vài giá trị:

| $x$ thử | Vế trái $2x + 3$ | Vế phải | Bằng nhau? |
|---|---|---|---|
| $0$ | $2\\cdot 0 + 3 = 3$ | $7$ | Không |
| $1$ | $2\\cdot 1 + 3 = 5$ | $7$ | Không |
| $2$ | $2\\cdot 2 + 3 = 7$ | $7$ | **Có → nghiệm** |
| $3$ | $2\\cdot 3 + 3 = 9$ | $7$ | Không |

Vậy $x = 2$ là nghiệm. Thử lần lượt thì **đúng nhưng chậm** — các quy tắc ở mục 1.2 dạy cách **suy ra** nghiệm thay vì đoán.

### 1.2. Cách giải

**2 quy tắc cơ bản**:

1. **Quy tắc chuyển vế**: chuyển 1 số sang vế kia, **đổi dấu**.
   - $x + 3 = 10 \\to x = 10 - 3 = 7$.

2. **Quy tắc nhân/chia**: nhân/chia cả 2 vế cùng số ($\\neq 0$).
   - $3x = 12 \\to x = 12/3 = 4$.

**Quy trình giải $ax + b = 0$**:
1. Chuyển b sang vế phải: $ax = -b$.
2. Chia 2 vế cho a: $x = -b/a$.

#### 1.2a. 💡 Trực giác cốt lõi — cái cân thăng bằng (balance scale)

Hình dung phương trình là một **cái cân hai đĩa**: vế trái = đĩa trái, vế phải = đĩa phải. Phương trình $2x + 3 = 7$ nghĩa là **đĩa trái nặng đúng bằng đĩa phải**. Cụ thể: đĩa trái có 2 hộp bí ẩn (mỗi hộp $x$ kg) cộng 3 kg táo; đĩa phải có 7 kg táo.

\`\`\`
   ┌──────────────┐         ┌──────────────┐
   │  [x][x] 🍎🍎🍎 │         │  🍎🍎🍎🍎🍎🍎🍎 │
   │  2 hộp + 3kg │         │     7 kg      │
   └──────┬───────┘         └──────┬───────┘
          └────────────┬───────────┘
                       △
                  ━━━━━━━━━━━  (thăng bằng)
\`\`\`

**Để cân vẫn thăng bằng**, mọi thao tác phải **làm đồng thời cho cả hai đĩa**. Đây chính là lý do toán học của 2 quy tắc:

- **Bỏ 3 kg táo khỏi cả 2 đĩa** = "trừ 3 cả 2 vế" → còn $2x = 4$.
- **Chia đôi cả 2 đĩa** = "chia 2 cả 2 vế" → còn $x = 2$.

\`\`\`
Trước:                       Tháo 3 táo mỗi đĩa:        Chia đôi mỗi đĩa:
[x][x]🍎🍎🍎 | 🍎🍎🍎🍎🍎🍎🍎    [x][x]  |  🍎🍎🍎🍎        [x] | 🍎🍎
━━━━━━━△━━━━━━━━━━━━     →   ━━━━━△━━━━━━━     →    ━━△━━━━
   2x + 3 = 7                   2x = 4                x = 2  ← nghiệm
\`\`\`

Nếu chỉ thao tác **một đĩa**, cân lệch → phương trình mới **không còn tương đương** với phương trình gốc. Đây là nguồn gốc của mọi quy tắc bên dưới.

> **Tinh tế**: không chỉ "số" mới tháo được, cả "hộp" ($x$) cũng tháo được, miễn tháo đồng đều 2 đĩa. Vd $3x = x + 8$ → tháo 1 hộp mỗi đĩa (trừ $x$ cả 2 vế) → $2x = 8$ → $x = 4$.

#### 1.2b. Quy tắc biến đổi tương đương (viết hình thức)

Hai phép sau **không đổi tập nghiệm** (gọi là *tương đương*, ký hiệu $\\Leftrightarrow$):

$$\\begin{aligned}
A = B &\\;\\Leftrightarrow\\; A + c = B + c &&\\text{(cộng/trừ cùng số c cả 2 vế)} \\\\
A = B &\\;\\Leftrightarrow\\; c\\cdot A = c\\cdot B &&(c \\neq 0)\\quad\\text{(nhân/chia cùng số } c \\neq 0)
\\end{aligned}$$

> **Vì sao bắt buộc $c \\neq 0$ khi nhân/chia?** Nhân 0 vào cả 2 vế → $0 = 0$ (đúng với mọi x) → **mất thông tin** gốc. Chia 0 → phép toán **vô định**. Vì thế quy tắc nhân/chia luôn kèm điều kiện $c \\neq 0$.

#### 1.2c. Vì sao "chuyển vế thì đổi dấu"? — không có gì bí ẩn

Đây là câu hỏi gây nhầm số một. Câu trả lời: **không phải "đổi dấu" — nó là hệ quả của việc trừ cả 2 vế.** Xét $x + 5 = 12$:

$$\\begin{aligned}
x + 5 &= 12 \\\\
x + 5 - 5 &= 12 - 5 &&\\text{(trừ 5 cả 2 vế)} \\\\
x + 0 &= 7 \\\\
x &= 7
\\end{aligned}$$

Ở vế trái $+5 - 5 = 0$ → biến mất; vế phải $12 - 5 = 7$. Viết tắt cho nhanh: "$+5$ ở trái nhảy sang phải thành $-5$". Trông như "đổi dấu" nhưng bản chất là trừ 5 cả 2 vế. Tương tự với nhân/chia: $5x = 20$, chia 5 cả 2 vế → vế trái $5/5 = 1$ còn $x$, vế phải $20/5 = 4$ → nhìn như "$\\times 5$ nhảy sang phải thành $\\div 5$".

### 1.3. Bốn ví dụ

**Ví dụ 1**: $2x + 3 = 11$. Chuyển 3: $2x = 8$. Chia 2: **$x = 4$**.

**Ví dụ 2**: $5(x - 1) = 3x + 7$. Khai triển: $5x - 5 = 3x + 7$. Chuyển: $5x - 3x = 7 + 5 \\to 2x = 12 \\to$ **$x = 6$**.

**Ví dụ 3 (vô số nghiệm)**: $2x + 4 = 2(x + 2)$. Khai triển: $2x + 4 = 2x + 4$. Luôn đúng → **x là bất kỳ**.

**Ví dụ 4 (vô nghiệm)**: $x + 3 = x + 5$. Chuyển: $3 = 5$. Sai → **KHÔNG nghiệm**.

#### 1.3a. Walk-through từng bước — 4 dạng từ dễ đến phân số

Mỗi bước ghi rõ **thao tác** ở cột chú thích (ý nghĩa "cái cân").

**Dạng 1 — đơn giản, một ẩn một vế:** $2x + 3 = 11$

$$\\begin{aligned}
2x + 3 &= 11 \\\\
2x + 3 - 3 &= 11 - 3 &&\\text{(trừ 3 cả 2 vế — tháo 3 táo mỗi đĩa)} \\\\
2x &= 8 \\\\
\\frac{2x}{2} &= \\frac{8}{2} &&\\text{(chia 2 cả 2 vế — chia đôi mỗi đĩa)} \\\\
x &= 4
\\end{aligned}$$

Kiểm tra: $2\\cdot 4 + 3 = 11$ ✓.

**Dạng 2 — ẩn ở cả 2 vế:** $5x - 4 = 2x + 11$

$$\\begin{aligned}
5x - 4 &= 2x + 11 \\\\
5x - 4 - 2x &= 2x + 11 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế — dồn ẩn về trái)} \\\\
3x - 4 &= 11 \\\\
3x &= 15 &&\\text{(cộng 4 cả 2 vế)} \\\\
x &= 5 &&\\text{(chia 3 cả 2 vế)}
\\end{aligned}$$

Kiểm tra: VT $5\\cdot 5 - 4 = 21$, VP $2\\cdot 5 + 11 = 21$ ✓.

**Dạng 3 — có ngoặc:** $3(x - 1) + 5 = 2x + 6$

$$\\begin{aligned}
3(x - 1) + 5 &= 2x + 6 \\\\
3x - 3 + 5 &= 2x + 6 &&\\text{(khai triển ngoặc: } 3\\cdot x - 3\\cdot 1) \\\\
3x + 2 &= 2x + 6 &&\\text{(rút gọn vế trái)} \\\\
x + 2 &= 6 &&\\text{(trừ } 2x \\text{ cả 2 vế)} \\\\
x &= 4 &&\\text{(trừ 2 cả 2 vế)}
\\end{aligned}$$

Kiểm tra: VT $3(4-1) + 5 = 14$, VP $2\\cdot 4 + 6 = 14$ ✓.

**Dạng 4 — có phân số:** $\\dfrac{x}{2} + \\dfrac{1}{3} = \\dfrac{5}{6}$

Mẹo: nhân cả 2 vế với **bội chung nhỏ nhất (BCNN)** của các mẫu ($2, 3, 6 \\to$ BCNN $= 6$) để khử phân số ngay:

$$\\begin{aligned}
\\frac{x}{2} + \\frac{1}{3} &= \\frac{5}{6} \\\\
6\\cdot\\frac{x}{2} + 6\\cdot\\frac{1}{3} &= 6\\cdot\\frac{5}{6} &&\\text{(nhân 6 cả 2 vế, phân phối từng hạng tử)} \\\\
3x + 2 &= 5 &&\\text{(rút gọn từng hạng tử)} \\\\
3x &= 3 &&\\text{(trừ 2 cả 2 vế)} \\\\
x &= 1 &&\\text{(chia 3 cả 2 vế)}
\\end{aligned}$$

Kiểm tra: $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$ ✓.

#### 1.3b. Bốn ví dụ ba trường hợp nghiệm (nghiệm thường, phân số, vô nghiệm, vô số nghiệm)

Sau khi rút gọn về $a\\cdot x = c$, có **đúng 3 khả năng**. Bốn ví dụ minh họa đủ:

**Ví dụ A — nghiệm thường (nguyên):** $4x - 6 = x + 9$

$$\\begin{aligned}
4x - x &= 9 + 6 &&\\text{(chuyển vế)} \\\\
3x &= 15 \\\\
x &= 5
\\end{aligned}$$

**Ví dụ B — nghiệm phân số:** $5x + 2 = 2x - 1$

$$\\begin{aligned}
5x - 2x &= -1 - 2 \\\\
3x &= -3 \\;?\\;\\to\\; 3x = -3 \\\\
x &= -1
\\end{aligned}$$

Đổi số liệu cho ra phân số: $6x + 1 = 2$ → $6x = 1$ → $x = \\dfrac{1}{6}$. Kiểm tra: $6\\cdot\\tfrac{1}{6} + 1 = 1 + 1 = 2$ ✓.

**Ví dụ C — vô nghiệm ($0 = 5$):** $2x + 3 = 2x + 8$

$$\\begin{aligned}
2x + 3 - 2x &= 2x + 8 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế — tháo hết hộp 2 đĩa)} \\\\
3 &= 8 &&\\leftarrow \\text{mâu thuẫn (luôn sai)}
\\end{aligned}$$

Ẩn triệt tiêu hết, còn lại đẳng thức số **sai** → **không có x nào** thoả → **vô nghiệm**, tập nghiệm $S = \\varnothing$. Trực giác cân: 2 đĩa cùng số hộp nhưng đĩa phải nhiều táo hơn → không cách nào thăng bằng.

**Ví dụ D — vô số nghiệm ($0 = 0$):** $3(x + 1) = 3x + 3$

$$\\begin{aligned}
3x + 3 &= 3x + 3 &&\\text{(khai triển — hai vế giống hệt)} \\\\
0 &= 0 &&\\leftarrow \\text{đúng với mọi x}
\\end{aligned}$$

Ẩn triệt tiêu, còn lại đẳng thức số **đúng** → **mọi x đều là nghiệm** → **vô số nghiệm**, $S = \\mathbb{R}$.

**Bảng tổng kết 3 trường hợp:**

| Sau khi rút gọn | Trường hợp | Nghiệm | Ví dụ |
|---|---|---|---|
| $a\\cdot x = c$, $a \\neq 0$ | bậc 1 thật sự | $x = c/a$ (duy nhất) | $3x = 15 \\to x = 5$ |
| $0\\cdot x = c$, $c \\neq 0$ | mâu thuẫn | vô nghiệm $S = \\varnothing$ | $2x+3 = 2x+8$ |
| $0\\cdot x = 0$ | tự đúng (identity) | vô số nghiệm $S = \\mathbb{R}$ | $3(x+1) = 3x+3$ |

### 1.4. Verify nghiệm bằng cách thế lại

Giải xong **luôn thế nghiệm vào phương trình gốc** để chắc. Vd 1: $x=4$ → $2\\cdot 4+3 = 11$ ✓ (đúng vế phải). Đây là cách bắt lỗi rẻ nhất.

⚠ **Bốn lỗi thường gặp khi giải PT bậc 1**

**Lỗi 1 — chuyển vế quên đổi dấu.** $x + 3 = 10 \\to x = 10 - 3 = 7$ (đổi $+3$ thành $-3$), **không** phải $x = 10 + 3 = 13$. Số nhảy sang vế kia thì đổi dấu. Verify: $7 + 3 = 10$ ✓; còn $13 + 3 = 16 \\neq 10$.

**Lỗi 2 — chia/nhân cho 0.** $0\\cdot x = 5$ **không** "chia 0 cả 2 vế ra $x = 5/0$" — chia 0 vô định. Đây là dấu hiệu **vô nghiệm**, không phải có nghiệm. Tương tự không được chia 2 vế cho biểu thức chứa ẩn khi chưa loại trường hợp nó bằng 0.

**Lỗi 3 — chỉ thao tác một vế (làm cân lệch).** $2x + 3 = 7 \\to 2x = 7$ (quên trừ 3 ở vế phải). Đúng: $2x = 7 - 3 = 4$. Mỗi thao tác phải làm **cả 2 đĩa**.

**Lỗi 4 — chuyển vế phần bên trong ngoặc.** $2(x + 3) = 10 \\to 2x = 10 - 3 = 7$ (sai, bỏ qua hệ số 2 đang nhân cả ngoặc). Đúng: khai triển trước $2x + 6 = 10 \\to 2x = 4 \\to x = 2$. Chỉ chuyển được **hạng tử ở mức ngoài cùng**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chuyển vế lại đổi dấu?"* Vì thực chất là **trừ cùng một số ở cả 2 vế**. $x+3=10 \\iff$ trừ 3 hai vế $\\iff x = 10-3$. "Đổi dấu" chỉ là cách nói gọn (xem mục 1.2c).
- *"Khi nào PT vô nghiệm / vô số nghiệm?"* Khi ẩn $x$ **triệt tiêu hết**: còn lại đẳng thức số sai ($3=5$) → vô nghiệm; còn lại đẳng thức đúng ($4=4$) → vô số nghiệm.
- *"Nhân 2 vế cho số âm có đổi chiều không?"* **Phương trình thì KHÔNG** (dấu $=$ không có "chiều"). $-3 = -3$ vẫn vậy. Chỉ **bất đẳng thức** ($<, >$) mới phải đổi chiều khi nhân số âm. Đây là chỗ hay nhầm.
- *"Bình phương 2 vế có phải biến đổi tương đương?"* **Không hẳn** — có thể thêm nghiệm lạ. $x = 2$ có 1 nghiệm nhưng $x^2 = 4$ có 2 nghiệm $\\pm 2$. Bài này chỉ dùng cộng/trừ/nhân/chia nên an toàn.

🔁 **Dừng lại tự kiểm tra**: giải $3x - 5 = x + 7$.

<details><summary>Đáp án</summary>

$3x - x = 7 + 5 \\to 2x = 12 \\to x = 6$. Thế lại: $3\\cdot 6-5 = 13$, $6+7 = 13$ ✓.

</details>

🔁 **Dừng lại tự kiểm tra (3 trường hợp)**: mỗi PT sau là nghiệm duy nhất, vô nghiệm, hay vô số nghiệm?
(1) $4x - 1 = 4x + 3$; (2) $2(x - 3) = 2x - 6$; (3) $5x + 2 = 17$.

<details><summary>Đáp án</summary>

(1) trừ $4x$ → $-1 = 3$ (sai) → **vô nghiệm**. (2) khai triển → $2x - 6 = 2x - 6$ → **vô số nghiệm** ($S = \\mathbb{R}$). (3) $5x = 15 \\to x = 3$ → **nghiệm duy nhất**.

</details>

### 📝 Tóm tắt mục 1

- Biểu thức (không có \`=\`, chỉ tính giá trị) khác phương trình (có \`=\`, có nghiệm).
- PT bậc 1: $ax+b=0 \\to x = -b/a$ ($a\\neq 0$).
- Trực giác **cái cân**: thao tác đồng đều cả 2 đĩa mới giữ phương trình tương đương; "chuyển vế đổi dấu" = viết tắt của trừ/cộng cả 2 vế.
- 2 quy tắc: chuyển vế (đổi dấu), nhân/chia 2 vế cùng số ≠ 0.
- Ẩn triệt tiêu → vô nghiệm ($0 = c$, số sai) hoặc vô số nghiệm ($0 = 0$, số đúng).

---

## 2. Hàm bậc 1 và phương trình đường thẳng \`y = mx + b\`

Phần này nối phương trình bậc 1 với **hình học**: mỗi phương trình bậc 1 hai biến vẽ ra **một đường thẳng**. Đây là cầu nối để hiểu hệ phương trình ở Mục 3 (giao của 2 đường thẳng).

### 2.1. Dạng \`y = mx + b\` — hệ số góc và giao điểm

**Định nghĩa.** Đường thẳng không thẳng đứng có dạng **slope-intercept**:

$$y = m\\,x + b$$

- $m$ = **hệ số góc (slope)** — đo độ dốc: $x$ tăng 1 thì $y$ tăng $m$.
- $b$ = **tung độ gốc (y-intercept)** — giá trị $y$ khi $x = 0$, tức điểm $(0, b)$ nơi đường cắt trục $Oy$.

💡 **Trực giác — hệ số góc là "độ dốc con đường"**: đi sang phải 1 bước (trục $x$), $m$ cho biết leo lên ($m > 0$) hay tụt xuống ($m < 0$) bao nhiêu. $m = 2$: dốc đứng lên (1 phải → 2 lên). $m = \\tfrac{1}{2}$: thoai thoải. $m = 0$: đường nằm ngang (phẳng). $m < 0$: đổ dốc xuống.

**Công thức hệ số góc** qua 2 điểm $(x_1, y_1)$ và $(x_2, y_2)$:

$$m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} \\qquad (x_1 \\neq x_2)$$

**Bốn ví dụ tính $m$:**

| 2 điểm | $\\Delta y / \\Delta x$ | $m$ | Ý nghĩa |
|---|---|---|---|
| $(0,1), (1,3)$ | $\\frac{3-1}{1-0}$ | $2$ | dốc lên |
| $(0,5), (2,1)$ | $\\frac{1-5}{2-0} = \\frac{-4}{2}$ | $-2$ | dốc xuống |
| $(1,4), (3,4)$ | $\\frac{4-4}{3-1}$ | $0$ | nằm ngang |
| $(0,0), (4,2)$ | $\\frac{2-0}{4-0}$ | $\\tfrac{1}{2}$ | thoai thoải |

### 2.2. Walk-through: lập phương trình đường thẳng

**Bài toán.** Tìm phương trình đường thẳng qua 2 điểm $A(1, 3)$ và $B(3, 7)$.

$$\\begin{aligned}
m &= \\frac{7 - 3}{3 - 1} = \\frac{4}{2} = 2 &&\\text{(tính hệ số góc)} \\\\
y &= 2x + b &&\\text{(dạng slope-intercept, chưa biết } b) \\\\
3 &= 2\\cdot 1 + b &&\\text{(thay điểm } A(1,3) \\text{ để tìm } b) \\\\
b &= 3 - 2 = 1 &&\\text{(giải phương trình bậc 1 ẩn } b)
\\end{aligned}$$

→ Đường thẳng: $\\boxed{y = 2x + 1}$. Kiểm tra bằng điểm $B(3,7)$: $2\\cdot 3 + 1 = 7$ ✓.

> Chú ý: bước tìm $b$ chính là **giải một phương trình bậc 1** — kỹ thuật Mục 1 dùng lại ngay ở đây.

### 2.3. Giao điểm với hai trục tọa độ

- **Giao trục $Oy$** (cắt trục đứng): cho $x = 0$ → $y = b$. Điểm $(0, b)$.
- **Giao trục $Ox$** (cắt trục ngang, gọi là **nghiệm/root**): cho $y = 0$ → giải $0 = mx + b \\to x = -\\dfrac{b}{a}$... đúng hơn $x = -\\dfrac{b}{m}$. Điểm $\\left(-\\tfrac{b}{m}, 0\\right)$.

**Ví dụ** $y = 2x + 1$:
- Giao $Oy$: $x = 0 \\to y = 1$ → $(0, 1)$.
- Giao $Ox$: $y = 0 \\to 0 = 2x + 1 \\to x = -\\tfrac{1}{2}$ → $\\left(-\\tfrac{1}{2}, 0\\right)$.

**ASCII đồ thị đường thẳng $y = 2x + 1$** (chấm vài điểm rồi nối):

| $x$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|
| $y = 2x+1$ | $-1$ | $1$ | $3$ | $5$ |

\`\`\`
   y
 5 |              *  (2,5)
 4 |
 3 |        *  (1,3)
 2 |
 1 |   *  (0,1)  ← giao Oy
 0 |__*________________  x
-1 *  (-1,-1)
   -1   0   1   2
   ↑
  (-½,0) giao Ox nằm giữa x=-1 và x=0
\`\`\`

### 2.4. Đường nằm ngang, đường thẳng đứng

- **Nằm ngang**: $m = 0 \\to y = b$ (vd $y = 3$). Mọi điểm có cùng $y = 3$. Vẫn là hàm số.
- **Thẳng đứng**: $x = c$ (vd $x = 4$). **Không** viết được dạng $y = mx + b$ (slope vô hạn) và **không phải hàm số** $y = f(x)$ (1 giá trị $x$ cho vô số $y$).

⚠ **Lỗi thường gặp**

- **Nhầm $m$ và $b$**: trong $y = 2x + 1$, hệ số góc là $2$ (số nhân $x$), tung độ gốc là $1$ (số tự do), đừng đảo.
- **Tính $m$ ngược tử/mẫu**: $m = \\dfrac{\\Delta y}{\\Delta x}$ (đứng trên ngang), **không** phải $\\dfrac{\\Delta x}{\\Delta y}$. Với $(0,1),(1,3)$: đúng $m = 2$, ngược cho $\\tfrac{1}{2}$ (sai).
- **Quên dấu khi $\\Delta x < 0$**: lấy điểm theo thứ tự nhất quán cho cả tử và mẫu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$y = mx + b$ liên quan gì tới $ax + b = 0$ ở Mục 1?"* Giải $mx + b = 0$ (cho $y = 0$) chính là tìm **giao điểm với trục $Ox$** — nghiệm của phương trình bậc 1 là **hoành độ giao điểm** với trục ngang.
- *"Hai đường có cùng $m$ thì sao?"* **Song song** (cùng độ dốc, không gặp nhau) nếu khác $b$; **trùng nhau** nếu cùng cả $m$ và $b$. Đây chính là 2 trong 3 trường hợp của hệ phương trình ở Mục 3.

🔁 **Dừng lại tự kiểm tra**: viết phương trình đường thẳng qua $(0, -2)$ và $(2, 4)$; tìm giao điểm với trục $Ox$.

<details><summary>Đáp án</summary>

$m = \\dfrac{4 - (-2)}{2 - 0} = \\dfrac{6}{2} = 3$; qua $(0,-2)$ nên $b = -2$ → $y = 3x - 2$. Giao $Ox$: $0 = 3x - 2 \\to x = \\tfrac{2}{3}$ → $\\left(\\tfrac{2}{3}, 0\\right)$.

</details>

### 📝 Tóm tắt mục 2

- Phương trình bậc 1 hai biến vẽ ra **một đường thẳng** $y = mx + b$.
- $m$ = hệ số góc $= \\dfrac{\\Delta y}{\\Delta x}$ (dốc lên/xuống/ngang); $b$ = tung độ gốc (giao $Oy$ tại $(0,b)$).
- Giao $Ox$: cho $y = 0$, giải phương trình bậc 1 → $x = -b/m$ — chính là "nghiệm".
- Đường thẳng đứng $x = c$ không phải hàm số; cùng $m$ → song song hoặc trùng.

---

## 3. Hệ phương trình bậc 1 hai ẩn

### 3.1. Định nghĩa

Hệ 2 phương trình, mỗi cái bậc 1, có 2 ẩn (thường x và y):

$$\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$$

**Nghiệm của hệ** = cặp $(x, y)$ thỏa mãn CẢ HAI phương trình.

### 3.2. Phương pháp thế (Substitution)

1. Từ một phương trình, biểu diễn 1 ẩn theo ẩn kia.
2. Thay vào phương trình còn lại → còn 1 ẩn → giải.
3. Thay ngược lại tìm ẩn còn lại.

**Ví dụ**: 

$$\\begin{cases} x + y = 10 & (1) \\\\ 2x - y = 5 & (2) \\end{cases}$$

Từ (1): $y = 10 - x$. Thay vào (2): $2x - (10 - x) = 5 \\to 3x = 15 \\to$ **$x = 5$**. Thay lại: **$y = 5$**.

**Walk-through từng bước (chú thích mỗi bước):**

$$\\begin{aligned}
x + y &= 10 &&(1) \\\\
2x - y &= 5 &&(2) \\\\
y &= 10 - x &&\\text{(rút } y \\text{ từ (1))} \\\\
2x - (10 - x) &= 5 &&\\text{(thế vào (2) — còn 1 ẩn } x) \\\\
2x - 10 + x &= 5 &&\\text{(bỏ ngoặc: } -(10 - x) = -10 + x) \\\\
3x &= 15 &&\\text{(rút gọn, chuyển } -10) \\\\
x &= 5 &&\\text{(chia 3)} \\\\
y &= 10 - 5 = 5 &&\\text{(thay ngược vào } y = 10 - x)
\\end{aligned}$$

→ Nghiệm $(x, y) = (5, 5)$. Kiểm tra (2): $2\\cdot 5 - 5 = 5$ ✓.

### 3.3. Phương pháp cộng đại số (Elimination)

1. Nhân các phương trình với số phù hợp để hệ số của 1 ẩn đối nhau.
2. Cộng 2 phương trình → triệt tiêu ẩn đó → còn 1 ẩn → giải.

**Cùng ví dụ trên**:
- (1) + (2): $(x + y) + (2x - y) = 10 + 5 \\to 3x = 15 \\to$ **$x = 5$**.

**Ví dụ cần nhân hệ số trước khi cộng** (hệ số chưa đối nhau sẵn):

$$\\begin{cases} 3x + 2y = 16 & (1) \\\\ 2x + 5y = 18 & (2) \\end{cases}$$

Muốn triệt tiêu $x$: nhân (1) với 2, (2) với 3 → hệ số $x$ thành $6$ ở cả hai → **trừ** để khử:

$$\\begin{aligned}
2\\times(1):\\quad 6x + 4y &= 32 \\\\
3\\times(2):\\quad 6x + 15y &= 54 \\\\
\\hline
\\text{(2')} - \\text{(1')}:\\quad 11y &= 22 &&\\text{(trừ để khử } x\\text{ — hệ số } x \\text{ cùng dấu)} \\\\
y &= 2 \\\\
3x + 2\\cdot 2 &= 16 &&\\text{(thay } y=2 \\text{ vào (1))} \\\\
3x &= 12 \\to x = 4
\\end{aligned}$$

→ Nghiệm $(4, 2)$. Kiểm tra (2): $2\\cdot 4 + 5\\cdot 2 = 8 + 10 = 18$ ✓.

### 3.4. Liên hệ hình học — nối với Mục 2

Viết mỗi phương trình về dạng $y = mx + b$ để thấy 2 đường thẳng:
- (1) $x + y = 10 \\to y = -x + 10$ (slope $-1$).
- (2) $2x - y = 5 \\to y = 2x - 5$ (slope $2$).

Hai slope **khác nhau** ($-1 \\neq 2$) → hai đường **cắt nhau** → đúng 1 giao điểm $(5, 5)$ = nghiệm duy nhất. Đây là lý do hình học của kết quả vừa giải.

### 3.5. Ba trường hợp nghiệm

Đường thẳng $a_1 x + b_1 y = c_1$ và $a_2 x + b_2 y = c_2$ trên mặt phẳng:

1. **Cắt nhau**: 1 nghiệm duy nhất.
2. **Song song** ($a_1/a_2 = b_1/b_2 \\neq c_1/c_2$): vô nghiệm.
3. **Trùng nhau** ($a_1/a_2 = b_1/b_2 = c_1/c_2$): vô số nghiệm.

💡 **Trực giác / Hình dung**: mỗi phương trình bậc 1 hai ẩn là **một đường thẳng** trên mặt phẳng. Nghiệm của hệ = **giao điểm**. Hai đường cắt nhau → 1 giao điểm (1 nghiệm); song song → không gặp (vô nghiệm); trùng nhau → gặp khắp nơi (vô số nghiệm).

⚠ **Lỗi thường gặp**: khi dùng phương pháp cộng để triệt tiêu, nếu hệ số **cùng dấu** thì phải **trừ** (hoặc nhân −1 một vế trước khi cộng), đừng cộng thẳng. Kiểm tra: sau khi cộng/trừ, một ẩn phải biến mất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Thế hay cộng đại số tốt hơn?"* Khi một ẩn đã có hệ số 1 (dễ rút) → **thế** nhanh. Khi hệ số "lệch" khó rút → **cộng đại số** gọn hơn. Kết quả như nhau.
- *"Làm sao biết hệ vô nghiệm mà không vẽ?"* So tỉ lệ hệ số: nếu $a_1/a_2 = b_1/b_2$ nhưng $\\neq c_1/c_2$ → song song → vô nghiệm.

**ASCII 3 trường hợp** (giao của 2 đường thẳng):

\`\`\`
 CẮT NHAU (1 nghiệm)    SONG SONG (vô nghiệm)   TRÙNG NHAU (vô số nghiệm)
      \\   /                 ───────                ═══════════
       \\ /                  ───────                ═══════════
        X  ← 1 giao điểm    (không gặp)            (gặp ở mọi điểm)
       / \\
      /   \\
\`\`\`

**Ví dụ vô nghiệm** (song song): $\\begin{cases} x + y = 2 \\\\ x + y = 5 \\end{cases}$ — cùng vế trái $x + y$ nhưng bằng 2 số khác nhau → mâu thuẫn. Trừ 2 PT: $0 = -3$ (sai) → **vô nghiệm**. Hình học: $y = -x + 2$ và $y = -x + 5$ cùng slope $-1$, khác $b$ → song song.

**Ví dụ vô số nghiệm** (trùng nhau): $\\begin{cases} x + y = 3 \\\\ 2x + 2y = 6 \\end{cases}$ — PT (2) là PT (1) nhân đôi. Trừ $2\\times$(1) khỏi (2): $0 = 0$ (đúng) → **vô số nghiệm** (mọi điểm trên đường $x + y = 3$).

🔁 **Dừng lại tự kiểm tra**: giải hệ $x + y = 5$, $x - y = 1$.

<details><summary>Đáp án</summary>

Cộng 2 PT: $2x = 6 \\to x = 3$. Thế: $y = 5 - 3 = 2$. → $(3, 2)$. Kiểm: $3-2 = 1$ ✓.

</details>

🔁 **Dừng lại tự kiểm tra (phân loại)**: hệ $\\begin{cases} 2x - y = 1 \\\\ 4x - 2y = 7 \\end{cases}$ có bao nhiêu nghiệm?

<details><summary>Đáp án</summary>

Tỉ lệ hệ số: $\\dfrac{2}{4} = \\dfrac{-1}{-2} = \\dfrac{1}{2}$ nhưng $\\dfrac{1}{7} \\neq \\dfrac{1}{2}$ → **song song → vô nghiệm**. Kiểm: nhân (1) với 2 → $4x - 2y = 2$, mâu thuẫn với $4x - 2y = 7$.

</details>

### 📝 Tóm tắt mục 3

- Hệ 2 PT 2 ẩn = tìm giao 2 đường thẳng.
- 2 cách: **thế** (rút 1 ẩn) và **cộng đại số** (triệt tiêu 1 ẩn — nhân hệ số trước nếu cần).
- 3 khả năng: cắt (1 nghiệm) / song song (vô nghiệm) / trùng (vô số).
- So tỉ lệ hệ số $\\dfrac{a_1}{a_2}, \\dfrac{b_1}{b_2}, \\dfrac{c_1}{c_2}$ để phân loại không cần vẽ.

---

## 4. Ứng dụng — Bài toán có lời văn (word problem)

### 4.0. Quy trình 4 bước dịch lời văn → phương trình

Đây là kỹ năng quan trọng nhất của chương: **dịch tiếng Việt sang ngôn ngữ phương trình**.

1. **Đặt ẩn**: chọn đại lượng chưa biết, đặt tên (vd $x$), ghi rõ **đơn vị** và **điều kiện** (vd $x > 0$).
2. **Lập phương trình**: dùng quan hệ trong đề (tổng/hiệu, gấp mấy lần, $v\\times t$, nồng độ...) viết một đẳng thức chứa ẩn.
3. **Giải phương trình** (Mục 1).
4. **Kiểm tra & kết luận**: thay vào **đề gốc**, kiểm tra điều kiện, trả lời bằng câu có đơn vị.

⚠ **Lỗi dịch lời văn thường gặp**: "A nhiều hơn B 5" → $A = B + 5$ (KHÔNG phải $A + 5 = B$); "A gấp 3 lần B" → $A = 3B$ (KHÔNG phải $B = 3A$). Đọc kỹ chủ ngữ. Và phải **thống nhất đơn vị** (đừng lẫn phút với giờ) trước khi lập phương trình.

### Ví dụ 1 — Bài toán tốc độ

Xe đi từ A đến B với $v = 60$ km/h trong 2 giờ, sau đó từ B về A với v khác trong 3 giờ. Tổng quãng đường = 240 km. Tính v lúc về.

- Đi: $60 \\times 2 = 120$ km.
- Về: $3 \\times v = 240 - 120 = 120$ km $\\to v =$ **40 km/h**.

### Ví dụ 2 — Bài toán tuổi

Tuổi anh hiện tại gấp 3 lần tuổi em. 5 năm nữa, tuổi anh gấp 2 lần tuổi em. Tính tuổi hiện tại.

- Gọi tuổi em hiện tại = $x$, anh = $3x$.
- 5 năm nữa: anh = $3x + 5$, em = $x + 5$.
- Điều kiện: $3x + 5 = 2(x + 5) \\to 3x + 5 = 2x + 10 \\to x = 5$.
- Em 5 tuổi, anh **15 tuổi**.

### Ví dụ 3 — Vận tốc, quãng đường, thời gian (đầy đủ 4 bước)

> *"Một xe khách đi từ A đến B với $v = 50$ km/h. Lúc về đi $v = 60$ km/h, nên thời gian về ngắn hơn lúc đi 30 phút. Tính quãng đường AB."*

**Bước 1 — đặt ẩn.** Gọi quãng đường AB là $x$ km ($x > 0$). Thời gian đi $\\dfrac{x}{50}$ giờ, thời gian về $\\dfrac{x}{60}$ giờ. Đổi 30 phút $= \\dfrac{1}{2}$ giờ (thống nhất đơn vị).

**Bước 2 — lập phương trình.** "Về ngắn hơn đi 30 phút" → $t_{\\text{đi}} - t_{\\text{về}} = \\dfrac{1}{2}$:

$$\\frac{x}{50} - \\frac{x}{60} = \\frac{1}{2}$$

**Bước 3 — giải.** Nhân BCNN$(50, 60, 2) = 300$ cả 2 vế:

$$\\begin{aligned}
300\\cdot\\frac{x}{50} - 300\\cdot\\frac{x}{60} &= 300\\cdot\\frac{1}{2} &&\\text{(khử mẫu)} \\\\
6x - 5x &= 150 \\\\
x &= 150
\\end{aligned}$$

**Bước 4 — kết luận.** AB $= 150$ km. Kiểm tra: đi $150/50 = 3$ giờ, về $150/60 = 2{,}5$ giờ → chênh $0{,}5$ giờ $= 30$ phút ✓.

### Ví dụ 4 — Hỗn hợp dung dịch (mixture)

> *"Có 200 ml dung dịch muối nồng độ 10%. Cần thêm bao nhiêu ml nước nguyên chất để được dung dịch nồng độ 4%?"*

**Bước 1 — đặt ẩn.** Gọi lượng nước cần thêm là $x$ ml ($x > 0$). Lượng muối ban đầu $= 200 \\times 10\\% = 20$ ml, **không đổi** khi thêm nước (chỉ pha loãng). Thể tích mới $= 200 + x$ ml.

**Bước 2 — lập phương trình.** Nồng độ mới là 4%:

$$\\frac{20}{200 + x} = 0{,}04$$

**Bước 3 — giải.** Nhân chéo:

$$\\begin{aligned}
20 &= 0{,}04\\,(200 + x) \\\\
20 &= 8 + 0{,}04x \\\\
12 &= 0{,}04x \\\\
x &= \\frac{12}{0{,}04} = 300
\\end{aligned}$$

**Bước 4 — kết luận.** Cần thêm $300$ ml nước. Kiểm tra: thể tích mới $500$ ml, muối vẫn $20$ ml → $20/500 = 0{,}04 = 4\\%$ ✓.

---

## 5. Bài tập

**Bài 1**: Giải $3x - 7 = 2x + 5$.

**Bài 2**: Giải $4(x + 2) - 3 = 2x + 9$.

**Bài 3**: Giải hệ:

$$\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$$

**Bài 4**: Giải hệ:

$$\\begin{cases} 3x + 2y = 12 \\\\ 2x - y = 1 \\end{cases}$$

**Bài 5**: Tổng 2 số bằng 20, hiệu của chúng bằng 4. Tìm 2 số.

**Bài 6**: Một người đi xe máy từ A → B với $v = 40$ km/h, lúc về $v = 60$ km/h. Tổng thời gian 5 giờ. Tính quãng đường AB.

**Bài 7**: Phương trình $\\dfrac{2x - 1}{3} = \\dfrac{x + 2}{4}$ có nghiệm là bao nhiêu?

**Bài 8**: Viết phương trình đường thẳng $y = mx + b$ đi qua hai điểm $A(-1, 1)$ và $B(2, 7)$. Tìm giao điểm của đường này với trục $Ox$.

## 6. Lời giải chi tiết

**Bài 1**: $3x - 2x = 5 + 7 \\to$ **$x = 12$**.

**Bài 2**: $4x + 8 - 3 = 2x + 9 \\to 4x + 5 = 2x + 9 \\to 2x = 4 \\to$ **$x = 2$**.

**Bài 3**:
- (1): $2x + y = 7$; (2): $x - y = 2$.
- Cộng (1)+(2): $3x = 9 \\to x = 3$.
- Từ (2): $y = x - 2 = 1$.
- Kiểm tra (1): $2\\cdot 3 + 1 = 7$ ✓; (2): $3 - 1 = 2$ ✓.
- → **$(x, y) = (3, 1)$**.

**Bài 4**: 
- (1) + 2·(2): $3x + 2y + 4x - 2y = 12 + 2 \\to 7x = 14 \\to x = 2$.
- (2): $y = 2x - 1 = 3$.
- → **$(x, y) = (2, 3)$**.

**Bài 5**: Gọi 2 số là $a, b$. $a + b = 20, a - b = 4$. Cộng: $2a = 24 \\to a = 12$. $b = 8$. → **$(12, 8)$**.

**Bài 6**: Gọi $AB = d$. $t_{đi} = d/40, t_{về} = d/60$. Tổng: $d/40 + d/60 = 5 \\to 3d/120 + 2d/120 = 5 \\to 5d/120 = 5 \\to d =$ **120 km**.

**Bài 7**: Khử mẫu — nhân BCNN$(3, 4) = 12$ cả 2 vế:

$$\\begin{aligned}
\\frac{2x - 1}{3} &= \\frac{x + 2}{4} \\\\
12\\cdot\\frac{2x - 1}{3} &= 12\\cdot\\frac{x + 2}{4} &&\\text{(nhân 12 cả 2 vế)} \\\\
4(2x - 1) &= 3(x + 2) &&\\text{(rút gọn mẫu)} \\\\
8x - 4 &= 3x + 6 &&\\text{(khai triển ngoặc)} \\\\
5x &= 10 &&\\text{(chuyển vế)} \\\\
x &= 2
\\end{aligned}$$

Kiểm tra: VT $= \\dfrac{2\\cdot 2 - 1}{3} = \\dfrac{3}{3} = 1$; VP $= \\dfrac{2 + 2}{4} = 1$ ✓. **Đáp số $x = 2$**.

**Bài 8**:

$$\\begin{aligned}
m &= \\frac{7 - 1}{2 - (-1)} = \\frac{6}{3} = 2 &&\\text{(hệ số góc qua } A, B) \\\\
1 &= 2\\cdot(-1) + b &&\\text{(thay điểm } A(-1,1)) \\\\
b &= 1 + 2 = 3
\\end{aligned}$$

→ Đường thẳng $y = 2x + 3$. Kiểm tra bằng $B(2,7)$: $2\\cdot 2 + 3 = 7$ ✓.
Giao $Ox$ (cho $y = 0$): $0 = 2x + 3 \\to x = -\\dfrac{3}{2}$ → điểm $\\left(-\\dfrac{3}{2}, 0\\right)$.

---

## 7. Bài tiếp theo

[Lesson 04 — Phương trình bậc 2](../lesson-04-quadratic-equations/).

## 📝 Tổng kết

1. **Biểu thức vs phương trình**: phương trình có dấu \`=\` và ẩn → có "nghiệm".
2. **PT bậc 1**: $ax + b = 0 \\to x = -b/a$ ($a \\neq 0$). Trực giác **cái cân**: thao tác đồng đều 2 vế; "chuyển vế đổi dấu" = trừ/cộng cả 2 vế.
3. **3 trường hợp một ẩn**: $a\\neq 0$ → 1 nghiệm; $0 = c$ (số sai) → vô nghiệm; $0 = 0$ → vô số nghiệm.
4. **Đường thẳng** $y = mx + b$: $m$ = hệ số góc $= \\Delta y/\\Delta x$, $b$ = tung độ gốc; giao $Ox$ là nghiệm của $mx + b = 0$.
5. **Hệ 2 PT 2 ẩn**: thế hoặc cộng đại số; hình học = giao 2 đường thẳng.
6. **3 trường hợp hệ**: cắt (1 nghiệm) / song song (vô nghiệm) / trùng (vô số).
7. **Word problem**: 4 bước (đặt ẩn → lập PT → giải → kiểm tra đề gốc); cẩn thận dịch "nhiều hơn / gấp lần" và thống nhất đơn vị.
`;
