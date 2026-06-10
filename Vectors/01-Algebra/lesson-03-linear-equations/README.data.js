// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/01-Algebra/lesson-03-linear-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Phương trình bậc 1 (Linear Equations)

> Tầng 1 — Algebra · Bài 3 trong lộ trình Vectors/Algebra.

## Mục tiêu học tập

Sau bài học này, bạn sẽ có thể:

1. Phân biệt **biểu thức (expression)** và **phương trình (equation)**.
2. Nhận diện **phương trình bậc 1 một ẩn (linear equation in one unknown)** ở dạng chuẩn $ax + b = 0$.
3. Giải phương trình bậc 1 bằng **quy tắc biến đổi tương đương** (cộng/trừ/nhân/chia 2 vế) và **quy tắc chuyển vế (transposition)**.
4. Xử lý 3 trường hợp nghiệm: **duy nhất**, **vô nghiệm**, **vô số nghiệm**.
5. Dịch một **bài toán có lời văn (word problem)** thành phương trình rồi giải.
6. Hiểu vì sao linear regression có **lời giải đóng (closed-form)** — chính là giải một phương trình bậc 1 trên đạo hàm.

## Kiến thức tiền đề

- [Lesson 02 — Biến và biểu thức](../lesson-02-variables-expressions/): bạn cần nắm khái niệm **biến (variable)**, **hằng số (constant)**, **biểu thức (expression)** và biết rút gọn các biểu thức như $2x + 3x = 5x$, $2(x - 1) = 2x - 2$.

---

## 1. Phương trình là gì? Khác biểu thức ở chỗ nào?

**Biểu thức (expression)** là một dãy phép toán có thể chứa số, biến, dấu cộng/trừ/nhân/chia… nhưng **không có dấu bằng ($=$)**. Ví dụ:

$$\\begin{aligned}
&2x + 3 &&\\text{(biểu thức)} \\\\
&x^2 - 5x + 6 &&\\text{(biểu thức)} \\\\
&3(a + b) &&\\text{(biểu thức)} \\\\
&\\tfrac{5}{y} + 2 &&\\text{(biểu thức)}
\\end{aligned}$$

Biểu thức chỉ có thể được **rút gọn** hoặc **tính giá trị** khi biết giá trị của biến. Không có khái niệm "giải" biểu thức. Ví dụ với $2x + 3$: nếu $x = 4$ thì biểu thức cho ra $11$; nếu $x = -1$ thì cho ra $1$. Mỗi $x$ cho một giá trị, không hỏi $x$ là bao nhiêu.

**Phương trình (equation)** là **mệnh đề khẳng định hai biểu thức bằng nhau**, trong đó có ít nhất một **ẩn (unknown)** — một biến mà ta muốn tìm giá trị. Phương trình luôn có dấu $=$:

$$\\begin{aligned}
&2x + 3 = 7 &&\\text{(phương trình, ẩn } x\\text{)} \\\\
&x - 5 = 10 &&\\text{(phương trình, ẩn } x\\text{)} \\\\
&3y + 1 = y + 9 &&\\text{(phương trình, ẩn } y\\text{)} \\\\
&4t = 100 &&\\text{(phương trình, ẩn } t\\text{)}
\\end{aligned}$$

### 💡 Trực giác — phương trình là một "câu hỏi"

- Biểu thức $2x + 3$ giống một **cụm danh từ** — "cái bàn 3 chân" — không phải đúng/sai, chỉ là một thứ.
- Phương trình $2x + 3 = 7$ giống một **câu hỏi-khẳng định** — "có giá trị $x$ nào làm cho $2x + 3$ đúng bằng $7$ không?" — câu trả lời sẽ là số cụ thể (hoặc "không có").

Hoặc cách khác: phương trình $2x + 3 = 7$ đọc là *"tìm $x$ sao cho khi nhân 2 rồi cộng 3, ta được 7"*. Giải phương trình = trả lời cho câu hỏi đó.

**Nghiệm (solution / root)** của phương trình là giá trị của ẩn làm cho hai vế bằng nhau. Ta thử vài giá trị với $2x + 3 = 7$:

| $x$ thử | Vế trái $2x + 3$ | Vế phải | Bằng nhau? |
|---|---|---|---|
| $0$ | $2 \\cdot 0 + 3 = 3$ | $7$ | Không |
| $1$ | $2 \\cdot 1 + 3 = 5$ | $7$ | Không |
| $2$ | $2 \\cdot 2 + 3 = 7$ | $7$ | **Có** → nghiệm |
| $3$ | $2 \\cdot 3 + 3 = 9$ | $7$ | Không |

Vậy $x = 2$ là nghiệm. **"Giải phương trình"** = tìm tất cả các nghiệm. Việc thử lần lượt như trên đúng nhưng chậm — các mục sau sẽ dạy cách biến đổi để **suy ra** nghiệm thay vì đoán.

### 4 ví dụ phân biệt biểu thức / phương trình

| # | Cái này là... | Nói nó "đúng" hay "sai"? |
|---|---|---|
| $2x + 3$ | biểu thức | không nói được — chỉ có giá trị |
| $2x + 3 = 7$ | phương trình | đúng khi $x = 2$, sai với $x$ khác |
| $x^2 - 4$ | biểu thức | có giá trị tùy $x$ |
| $x^2 - 4 = 0$ | phương trình | đúng khi $x = 2$ hoặc $x = -2$ |

### ❓ Câu hỏi tự nhiên bạn nên đặt ra ở đây

- *"Phương trình có luôn có nghiệm không?"* — **Không**. Có những phương trình không tồn tại giá trị nào của ẩn thoả mãn (vô nghiệm, xem Mục 5). Ví dụ $x + 1 = x$ → bóc gọn $0 = 1$ → vô lý → không có $x$ nào thoả.
- *"Có thể có nhiều nghiệm không?"* — **Có thể**. Phương trình bậc 1 thì tối đa 1 nghiệm (hoặc 0, hoặc vô số), nhưng $x^2 = 4$ có 2 nghiệm $x = 2$ và $x = -2$. Bậc càng cao thì số nghiệm tối đa càng lớn.
- *"Sao biết một phương trình đã "giải xong"?"* — Khi đã viết được dạng $x = \\langle\\text{số cụ thể}\\rangle$ (hoặc kết luận được vô nghiệm / vô số nghiệm). Đó là đích đến.
- *"Vế trái và vế phải có vai trò khác nhau không?"* — Không. $2x + 3 = 7$ và $7 = 2x + 3$ là cùng một phương trình. Theo thói quen, ta hay viết ẩn bên trái cho dễ nhìn.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** $3y - 4$ là biểu thức hay phương trình? Còn $3y - 4 = 11$ thì sao? Nếu là phương trình, $y = 5$ có phải nghiệm không?

<details>
<summary>Đáp án</summary>

- $3y - 4$: **biểu thức** (không có dấu $=$).
- $3y - 4 = 11$: **phương trình** ẩn $y$.
- Thử $y = 5$: $3 \\cdot 5 - 4 = 11$ → đúng → $y = 5$ **là nghiệm**.
</details>

### 📋 Tóm tắt Mục 1

- Biểu thức **không** có \`=\`, chỉ tính giá trị, không "giải".
- Phương trình **có** \`=\` và ít nhất một ẩn, là một câu hỏi tìm ẩn.
- Nghiệm là giá trị làm hai vế bằng nhau.
- Giải phương trình bằng cách thử là đúng nhưng chậm — các mục sau dạy cách suy ra nghiệm.

---

## 2. Phương trình bậc 1 một ẩn — dạng chuẩn \`ax + b = 0\`

**Định nghĩa.** Phương trình bậc 1 (linear equation) một ẩn là phương trình có thể đưa về dạng:

$$a \\cdot x + b = 0 \\qquad \\text{với } a, b \\text{ là hằng số và } a \\neq 0$$

Hai điều cốt lõi của "bậc 1": (i) ẩn $x$ chỉ xuất hiện ở **bậc 1** (không có $x^2$, $\\sqrt{x}$, $1/x$...), và (ii) hệ số $a$ đứng trước $x$ **khác 0** (nếu $a = 0$ thì biến mất ẩn → không còn là phương trình bậc 1 nữa, xem Mục 5).

**Nghiệm duy nhất** của dạng chuẩn:

$$\\begin{aligned}
a \\cdot x + b &= 0 \\\\
\\Leftrightarrow \\quad a \\cdot x &= -b &&\\text{(trừ } b \\text{ cả 2 vế)} \\\\
\\Leftrightarrow \\quad x &= -\\frac{b}{a} &&\\text{(chia } a \\text{ cả 2 vế, được vì } a \\neq 0)
\\end{aligned}$$

### Nhận dạng — cái nào là bậc 1?

| Phương trình | Có phải bậc 1? | Vì sao |
|---|---|---|
| $2x + 3 = 7$ | ✓ | đưa về $2x - 4 = 0$ |
| $-x + 5 = 0$ | ✓ | đã đúng dạng, $a = -1, b = 5$ |
| $5 - 3x = 0$ | ✓ | viết lại $-3x + 5 = 0$ |
| $x^2 - 4 = 0$ | ✗ | có $x^2$ (bậc 2) |
| $1/x = 3$ | ✗ | $x$ ở mẫu (không phải đa thức) |
| $\\sqrt{x} = 4$ | ✗ | có căn của $x$ |
| $3x + 2 = 3x + 2$ | ✗ | sau khi rút gọn còn $0 \\cdot x = 0$, hệ số $a = 0$ |

### Ví dụ giải tay 4 phương trình (đơn giản → trung bình → phân số → có dấu trừ)

Trong mỗi bước, ngoài phép toán, ta ghi rõ **"thao tác này tương đương với gì trên cân"** để gắn lại với trực giác Mục 3.

**Ví dụ 1 — đơn giản:** $2x + 3 = 7$

$$\\begin{aligned}
2x + 3 &= 7 \\\\
2x + 3 - 3 &= 7 - 3 &&\\text{(trừ 3 cả 2 vế — tháo 3 quả cân ra mỗi đĩa)} \\\\
2x &= 4 \\\\
\\frac{2x}{2} &= \\frac{4}{2} &&\\text{(chia 2 cả 2 vế — chia đôi mỗi đĩa)} \\\\
x &= 2
\\end{aligned}$$

Kiểm tra: $2 \\cdot 2 + 3 = 4 + 3 = 7$ ✓

**Ví dụ 2 — trung bình, ẩn ở cả 2 vế:** $5x - 4 = 2x + 11$

$$\\begin{aligned}
5x - 4 &= 2x + 11 \\\\
5x - 4 - 2x &= 2x + 11 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế — dồn ẩn về trái)} \\\\
3x - 4 &= 11 \\\\
3x - 4 + 4 &= 11 + 4 &&\\text{(cộng 4 cả 2 vế — đẩy hằng số về phải)} \\\\
3x &= 15 \\\\
\\frac{3x}{3} &= \\frac{15}{3} &&\\text{(chia 3 cả 2 vế)} \\\\
x &= 5
\\end{aligned}$$

Kiểm tra: VT $5 \\cdot 5 - 4 = 21$, VP $2 \\cdot 5 + 11 = 21$ ✓

**Ví dụ 3 — có ngoặc:** $3(x - 1) + 5 = 2x + 6$

$$\\begin{aligned}
3(x - 1) + 5 &= 2x + 6 \\\\
3x - 3 + 5 &= 2x + 6 &&\\text{(khai triển ngoặc: } 3 \\cdot x - 3 \\cdot 1) \\\\
3x + 2 &= 2x + 6 &&\\text{(rút gọn vế trái: } -3 + 5 = 2) \\\\
3x + 2 - 2x &= 2x + 6 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế)} \\\\
x + 2 &= 6 \\\\
x + 2 - 2 &= 6 - 2 &&\\text{(trừ 2 cả 2 vế)} \\\\
x &= 4
\\end{aligned}$$

Kiểm tra: VT $= 3(4 - 1) + 5 = 9 + 5 = 14$, VP $= 2 \\cdot 4 + 6 = 14$ ✓

**Ví dụ 4 — có phân số:** $\\dfrac{x}{2} + \\dfrac{1}{3} = \\dfrac{5}{6}$

Mẹo: nhân cả 2 vế với **bội chung nhỏ nhất (BCNN)** của các mẫu ($2, 3, 6$ → BCNN $= 6$) để khử phân số ngay từ đầu — sau đó giải như phương trình nguyên.

$$\\begin{aligned}
\\frac{x}{2} + \\frac{1}{3} &= \\frac{5}{6} \\\\
6 \\cdot \\left(\\frac{x}{2} + \\frac{1}{3}\\right) &= 6 \\cdot \\frac{5}{6} &&\\text{(nhân 6 cả 2 vế)} \\\\
6 \\cdot \\frac{x}{2} + 6 \\cdot \\frac{1}{3} &= 6 \\cdot \\frac{5}{6} &&\\text{(phân phối 6 cho từng hạng tử bên trái)} \\\\
3x + 2 &= 5 &&\\text{(rút gọn từng hạng tử)} \\\\
3x &= 3 &&\\text{(trừ 2 cả 2 vế)} \\\\
x &= 1 &&\\text{(chia 3 cả 2 vế)}
\\end{aligned}$$

Kiểm tra: $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$ ✓

### ❓ Câu hỏi tự nhiên

- *"Sao gọi là 'bậc 1' chứ không phải 'bậc nhất'?"* — Hai cách gọi như nhau. "Bậc 1 = degree 1" nghĩa là số mũ cao nhất của ẩn là $1$ ($x^1 = x$). Bậc 2 là $x^2$, bậc 3 là $x^3$...
- *"Nếu cả hai vế đều có $x$ (như Ví dụ 2), nó vẫn là bậc 1?"* — **Có**, miễn là sau khi rút gọn, ẩn vẫn ở bậc 1. $5x - 4 = 2x + 11$ chuyển hết về một vế → $3x - 15 = 0$ → vẫn dạng $ax + b = 0$.
- *"$x$ ở mẫu ($3/x = 6$) có phải bậc 1 không?"* — **Không**. $3/x = 3 \\cdot x^{-1}$ → ẩn ở bậc $-1$, không phải bậc 1. Đó là phương trình **phân thức**, cách giải khác (nhân chéo, kèm điều kiện $x \\neq 0$).
- *"Sao chỉ ghi $a \\neq 0$ mà không ghi $b \\neq 0$?"* — $b = 0$ là **hợp lệ**, chỉ có nghĩa "không có hằng số tự do". $2x = 0$ vẫn là phương trình bậc 1, nghiệm $x = 0$.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Phương trình $-4x + 12 = 0$ có phải bậc 1? Nghiệm là bao nhiêu?

<details>
<summary>Đáp án</summary>

Có. $a = -4$ (khác 0), $b = 12$. Nghiệm $x = -\\dfrac{b}{a} = \\dfrac{-12}{-4} = 3$. Kiểm tra: $-4 \\cdot 3 + 12 = 0$ ✓.
</details>

### 📋 Tóm tắt Mục 2

- Dạng chuẩn: $a \\cdot x + b = 0$ với $a \\neq 0$.
- Nhận dạng: ẩn ở bậc 1, không có $x^2$, $\\sqrt{x}$, $1/x$.
- Quy trình giải dạng chuẩn: đem hằng số sang phải → chia $a$ → ra $x = -\\dfrac{b}{a}$.
- Đã giải 4 ví dụ: đơn giản, ẩn 2 vế, có ngoặc, có phân số.

---

## 3. Quy tắc biến đổi tương đương — cân thăng bằng

Hai phép biến đổi sau **không thay đổi tập nghiệm** của phương trình (nên gọi là *tương đương*):

**Quy tắc 1 (cộng/trừ).** Cộng hoặc trừ **cùng một số (hoặc cùng một biểu thức)** vào cả hai vế:

$$\\begin{aligned}
A = B &\\quad\\Leftrightarrow\\quad A + c = B + c \\\\
A = B &\\quad\\Leftrightarrow\\quad A - c = B - c
\\end{aligned}$$

**Quy tắc 2 (nhân/chia).** Nhân hoặc chia cả hai vế cho **cùng một số khác 0**:

$$\\begin{aligned}
A = B &\\quad\\Leftrightarrow\\quad c \\cdot A = c \\cdot B &&(c \\neq 0) \\\\
A = B &\\quad\\Leftrightarrow\\quad \\frac{A}{c} = \\frac{B}{c} &&(c \\neq 0)
\\end{aligned}$$

> Vì sao bắt buộc $c \\neq 0$? Nếu nhân 0 vào cả 2 vế, ta được $0 = 0$ — đúng với mọi giá trị của ẩn — làm mất thông tin gốc. Nếu chia cho 0, phép toán không xác định.

### 💡 Trực giác: cân thăng bằng (balance scale)

Tưởng tượng phương trình là một **cái cân hai đĩa**. Vế trái = đĩa trái, vế phải = đĩa phải. Phương trình $2x + 3 = 7$ nghĩa là **đĩa trái đang nặng đúng bằng đĩa phải**.

Cụ thể với $2x + 3 = 7$: trên đĩa trái có 2 hộp bí ẩn (mỗi hộp nặng $x$ kg, chưa biết) cộng với 3 kg quả táo; đĩa phải có 7 kg quả táo. Cân thăng bằng → tổng trọng lượng hai bên bằng nhau.

\`\`\`
   ┌──────────────┐         ┌──────────────┐
   │  [x][x]  🍎🍎🍎 │         │  🍎🍎🍎🍎🍎🍎🍎  │
   │   2 hộp + 3kg │         │      7 kg      │
   └──────┬───────┘         └──────┬───────┘
          │                        │
          └────────────┬───────────┘
                       △
                  ━━━━━━━━━━━  (thăng bằng)
                       ▲
                    [trục cân]
\`\`\`

**Để cân vẫn thăng bằng**, mọi thao tác phải **làm đồng thời cho cả hai đĩa**:

- Nếu **bỏ 3 kg táo ra khỏi đĩa trái** → phải **bỏ 3 kg táo ra khỏi đĩa phải** (đây chính là "trừ 3 cả 2 vế"). Sau thao tác: trái còn 2 hộp, phải còn 4 kg → $2x = 4$.
- Nếu **chia đôi đĩa trái** (chỉ giữ 1 hộp) → phải **chia đôi đĩa phải** (chỉ giữ 2 kg). Sau thao tác: $x = 2$.

\`\`\`
Trước:                       Sau khi tháo 3 quả táo mỗi đĩa:
   [x][x] 🍎🍎🍎 | 🍎🍎🍎🍎🍎🍎🍎       [x][x]    |   🍎🍎🍎🍎
   ━━━━━━━━━△━━━━━━━━━━━           ━━━━━━△━━━━━━
            ▲                            ▲
        2x + 3 = 7                     2x = 4

Sau khi chia đôi mỗi đĩa:
       [x]      |   🍎🍎
   ━━━━━━━△━━━━━━━
              ▲
            x = 2   ← nghiệm
\`\`\`

Đây chính là lý do toán học của Quy tắc 1 & 2. Nếu bạn chỉ làm với một đĩa, cân sẽ lệch — phương trình mới **không còn tương đương** với phương trình gốc.

### 4 ví dụ "vận hành cân"

**Ví dụ A — chỉ cần một thao tác:** $x + 7 = 12$

\`\`\`
[x] 🍎×7  |  🍎×12         Tháo 7 quả táo khỏi mỗi đĩa
━━━━━△━━━━━━━━━━━     →    [x]       |  🍎×5
                            ━━━━△━━━━━━━
                            → x = 5
\`\`\`

Kiểm tra: $5 + 7 = 12$ ✓.

**Ví dụ B — chỉ nhân/chia:** $4x = 20$

\`\`\`
[x][x][x][x]  |  🍎×20       Chia đôi 4 lần (hay chia 4):
━━━━━━━━△━━━━━━━━━━     →    [x]   |  🍎×5
                              ━━━△━━━━━
                              → x = 5
\`\`\`

Hoặc nhân $\\dfrac{1}{4}$ cả 2 vế: $\\dfrac{1}{4} \\cdot 4x = \\dfrac{1}{4} \\cdot 20$ → $x = 5$.

**Ví dụ C — hai thao tác liên tiếp:** $2x - 5 = 9$

Trước hết "thêm 5 quả táo cả 2 đĩa" (bù vào chỗ đang trừ):

\`\`\`
[x][x] (nợ 5🍎) | 🍎×9    +5 cả 2 đĩa:    [x][x] | 🍎×14    chia 2:    [x] | 🍎×7
━━━━━━━━━△━━━━━━━━━       ━━━━━━━━△━━━━━━━━━━              ━━━━△━━━━━━━
                                                                 → x = 7
\`\`\`

Kiểm tra: $2 \\cdot 7 - 5 = 14 - 5 = 9$ ✓.

**Ví dụ D — biểu thức ẩn ở cả hai đĩa:** $3x = x + 8$

Đĩa trái có 3 hộp, đĩa phải có 1 hộp + 8 kg táo. Thao tác: **"tháo 1 hộp khỏi mỗi đĩa"** (trừ $x$ cả 2 vế) — vì 1 hộp ở trái và 1 hộp ở phải nặng bằng nhau, nên cân vẫn thăng bằng:

\`\`\`
[x][x][x]  | [x] 🍎×8       tháo 1 hộp mỗi đĩa:
━━━━━━━△━━━━━━━━━━━       →   [x][x]   | 🍎×8        chia 2:   [x] | 🍎×4
                              ━━━━△━━━━━━━            ━━━△━━━━━━━
                                                          → x = 4
\`\`\`

Đây là điểm tinh tế: **không chỉ "số" mới tháo được, mà cả "hộp" ($x$) cũng tháo được**, miễn là tháo đồng đều 2 đĩa. Vì cùng một thứ ở 2 đĩa nặng như nhau → cân không lệch.

### ❓ Câu hỏi tự nhiên

- *"Sao chỉ thao tác với 'cả 2 vế cùng lúc' thì cân không lệch?"* — Vì hai vế ban đầu nặng bằng nhau. Nếu cả hai cùng bớt đi 3 kg, hiệu vẫn bằng 0 → cân thăng bằng. Nếu chỉ bớt một bên, hiệu thành 3 kg → cân lệch.
- *"Có thể cộng/trừ 'biểu thức chứa x' không, hay chỉ được số?"* — Có thể. Ví dụ D ở trên: trừ $x$ cả 2 vế hoàn toàn hợp lệ. Lý do: cùng giá trị (dù chưa biết cụ thể), cùng tháo đồng đều.
- *"Nhân 2 vế cho 0 thì sao?"* — Mất thông tin. $2x = 4$ đúng, nhưng nếu nhân 0: $0 = 0$ — đúng với mọi $x$, không còn cho biết $x = 2$. Vì thế bắt buộc $c \\neq 0$ ở Quy tắc 2.
- *"Nhân 2 vế cho số âm có đổi dấu không?"* — **Phương trình thì KHÔNG** đổi dấu (vẫn là dấu $=$). $-3 = -3$ vẫn là $-3 = -3$. Nhưng với **bất đẳng thức** ($<$, $>$), nhân số âm thì PHẢI đổi chiều dấu ($<$ thành $>$). Đây là lý do người ta hay nhầm — bài này chỉ làm với $=$ nên không đổi.
- *"Bình phương 2 vế có phải biến đổi tương đương không?"* — **Không hẳn**. Bình phương có thể *thêm* nghiệm lạ. Ví dụ: $x = 2$ chỉ có 1 nghiệm, nhưng $x^2 = 4$ có 2 nghiệm $\\pm 2$. Vì thế khi bình phương phải kiểm tra lại nghiệm. Trong bài này ta không bình phương — chỉ dùng cộng/trừ/nhân/chia.

### ⚠ Lỗi thường gặp

- **"Chỉ thao tác một vế"** — viết $2x + 3 = 7$ → $2x = 7$ (quên trừ 3 bên phải). Cân lệch ngay lập tức.
- **"Trừ một số khỏi từng số hạng riêng lẻ"** — $2x + 3 = 7$ → $2x = 4 - 3 = 1$ (sai). Đúng là trừ 3 vào cả vế phải: $7 - 3 = 4$, không phải trừ thêm lần nữa.
- **"Chia chỉ một số hạng"** — $2x + 4 = 10$ → $x + 4 = 5$ (sai, chỉ chia 2 cho $2x$ mà không chia 4 và 10). Đúng là chia 2 cho **cả vế**: $\\dfrac{2x + 4}{2} = \\dfrac{10}{2}$ → $x + 2 = 5$. Hoặc làm gọn hơn: trừ 4 trước rồi mới chia: $2x = 6$ → $x = 3$.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Cho phương trình $4x - 3 = x + 9$. Bạn muốn dồn ẩn về trái và hằng số về phải bằng quy tắc cân — viết ra 2 thao tác cụ thể, kết quả mỗi bước, và nghiệm cuối cùng.

<details>
<summary>Đáp án</summary>

- Bước 1: **trừ $x$ cả 2 vế** (tháo 1 hộp khỏi mỗi đĩa) → $3x - 3 = 9$.
- Bước 2: **cộng 3 cả 2 vế** (thêm 3 quả táo mỗi đĩa) → $3x = 12$.
- Bước 3: **chia 3 cả 2 vế** → $x = 4$.

Kiểm tra: VT $4 \\cdot 4 - 3 = 13$, VP $4 + 9 = 13$ ✓.
</details>

### 📋 Tóm tắt Mục 3

- Hai quy tắc cân: cộng/trừ cùng số (cả 2 vế) và nhân/chia cùng số khác 0 (cả 2 vế).
- Trực giác cái cân: thao tác **đồng đều** mới giữ cân thăng bằng → mới giữ phương trình tương đương.
- Cộng/trừ cả "biểu thức chứa $x$" cũng được — miễn áp dụng đều 2 vế.
- Bắt buộc $c \\neq 0$ khi nhân/chia, nếu không sẽ mất thông tin ($\\times 0$) hoặc vô định ($\\div 0$).

---

## 4. Quy tắc chuyển vế (transposition) — viết tắt của Quy tắc 1

Trong thực hành, ta hay viết tắt **"trừ c cả 2 vế rồi rút gọn vế bên kia"** thành **"chuyển c từ vế này sang vế kia và đổi dấu"**. Đây gọi là **quy tắc chuyển vế**:

$$\\begin{aligned}
A + c = B &\\quad\\Leftrightarrow\\quad A = B - c &&\\text{(chuyển } +c \\text{ sang phải → thành } -c) \\\\
A - c = B &\\quad\\Leftrightarrow\\quad A = B + c &&\\text{(chuyển } -c \\text{ sang phải → thành } +c) \\\\
c \\cdot A = B &\\quad\\Leftrightarrow\\quad A = \\frac{B}{c} &&\\text{(chuyển } \\times c \\text{ sang phải → thành } \\div c,\\ c \\neq 0) \\\\
\\frac{A}{c} = B &\\quad\\Leftrightarrow\\quad A = B \\cdot c &&\\text{(chuyển } \\div c \\text{ sang phải → thành } \\times c)
\\end{aligned}$$

**Cẩn thận**: chuyển vế chỉ áp dụng cho **hạng tử (term)** đứng độc lập bằng phép cộng/trừ ở mức ngoài cùng, hoặc hệ số nhân/chia của cả một vế. **Không** chuyển vế phần tử bên trong dấu ngoặc.

### 💡 Vì sao "đổi dấu khi chuyển vế"?

Đây là câu hỏi học sinh hay hỏi nhất. Câu trả lời: **không phải "đổi dấu" gì cả — nó là hệ quả của việc trừ cả 2 vế.**

Xét $x + 5 = 12$. Theo Quy tắc 1 (trừ 5 cả 2 vế):

$$\\begin{aligned}
x + 5 &= 12 \\\\
x + 5 - 5 &= 12 - 5 \\\\
x + 0 &= 7 \\\\
x &= 7
\\end{aligned}$$

Quan sát: ở vế trái, $+5 - 5 = 0$ → biến mất. Ở vế phải, $12 - 5 = 7$. Thay vì viết hết các bước trung gian, người ta viết tắt: **"$+5$ ở trái bị xóa, bên phải xuất hiện thêm $-5$"** — nhìn vào trông như "$+5$ chuyển sang phải và đổi dấu thành $-5$". Thực chất là $+5 - 5 = 0$ ở trái và $12 - 5 = 7$ ở phải.

Tương tự cho nhân/chia. $5x = 20$, chia 5 cả 2 vế:

$$\\begin{aligned}
\\frac{5x}{5} &= \\frac{20}{5} \\\\
1 \\cdot x &= 4 \\\\
x &= 4
\\end{aligned}$$

Vế trái $5/5 = 1$ → còn lại $x$. Vế phải $20/5 = 4$. Nhìn ngoài như "$\\times 5$ chuyển sang phải thành $\\div 5$". Bản chất vẫn là Quy tắc 2.

### Ví dụ step-by-step: \`3x + 5 = 17\`

Cách trình bày trong sách giáo khoa thường viết:

$$\\begin{aligned}
3x + 5 &= 17 \\\\
3x &= 17 - 5 &&\\text{(chuyển } +5 \\text{ sang phải → } -5) \\\\
3x &= 12 \\\\
x &= \\frac{12}{3} &&\\text{(chuyển } \\times 3 \\text{ sang phải → } \\div 3) \\\\
x &= 4
\\end{aligned}$$

Cách trình bày bằng **quy tắc biến đổi tương đương** (cùng kết quả, rõ hơn ở giai đoạn mới học):

$$\\begin{aligned}
3x + 5 &= 17 \\\\
3x + 5 - 5 &= 17 - 5 &&\\text{(trừ 5 cả 2 vế — như tháo 5kg ra mỗi đĩa cân)} \\\\
3x &= 12 \\\\
\\frac{3x}{3} &= \\frac{12}{3} &&\\text{(chia 3 cả 2 vế — chia đều thành 3 phần bằng nhau)} \\\\
x &= 4
\\end{aligned}$$

Kiểm tra: thay $x = 4$ vào ban đầu: $3 \\cdot 4 + 5 = 12 + 5 = 17$ ✓

**Hai cách là một** — chuyển vế chỉ là viết tắt. Nhưng quy tắc biến đổi rõ hơn ở chỗ: thấy ngay cân vẫn thăng bằng vì ta làm thao tác cho cả 2 đĩa.

### Thêm 3 ví dụ giải tay (đơn giản → trung bình → phân số)

**Ví dụ 4.1 — đơn giản:** $7 - 2x = 1$

Thao tác từng bước, ghi rõ ý nghĩa cân:

$$\\begin{aligned}
7 - 2x &= 1 \\\\
7 - 2x - 7 &= 1 - 7 &&\\text{(trừ 7 cả 2 vế — tháo 7 kg táo khỏi mỗi đĩa)} \\\\
-2x &= -6 \\\\
\\frac{-2x}{-2} &= \\frac{-6}{-2} &&\\text{(chia } -2 \\text{ cả 2 vế)} \\\\
x &= 3
\\end{aligned}$$

Hoặc dùng chuyển vế quen tay: "$+7$ sang phải → $-7$", "$-2x$ ở trái có hệ số $-2$, chuyển $\\times(-2)$ sang phải → $\\div(-2)$". Kết quả như nhau.

Kiểm tra: $7 - 2 \\cdot 3 = 7 - 6 = 1$ ✓.

**Ví dụ 4.2 — trung bình, ẩn cả 2 vế:** $6x - 4 = 2x + 8$

$$\\begin{aligned}
6x - 4 &= 2x + 8 \\\\
6x - 4 - 2x &= 2x + 8 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế — tháo 2 hộp khỏi mỗi đĩa)} \\\\
4x - 4 &= 8 \\\\
4x - 4 + 4 &= 8 + 4 &&\\text{(cộng 4 cả 2 vế — thêm 4 kg táo mỗi đĩa)} \\\\
4x &= 12 \\\\
\\frac{4x}{4} &= \\frac{12}{4} &&\\text{(chia 4 cả 2 vế)} \\\\
x &= 3
\\end{aligned}$$

Hoặc dùng chuyển vế: $6x - 2x = 8 + 4$ → $4x = 12$ → $x = 3$.

Kiểm tra: VT $6 \\cdot 3 - 4 = 14$, VP $2 \\cdot 3 + 8 = 14$ ✓.

**Ví dụ 4.3 — có phân số:** $\\dfrac{x + 1}{2} = \\dfrac{x - 3}{5} + 1$

Khử mẫu trước bằng cách nhân BCNN(2, 5) $= 10$ cả 2 vế:

$$\\begin{aligned}
\\frac{x + 1}{2} &= \\frac{x - 3}{5} + 1 \\\\
10 \\cdot \\frac{x + 1}{2} &= 10 \\cdot \\left[\\frac{x - 3}{5} + 1\\right] &&\\text{(nhân 10 cả 2 vế)} \\\\
10 \\cdot \\frac{x + 1}{2} &= 10 \\cdot \\frac{x - 3}{5} + 10 \\cdot 1 &&\\text{(phân phối 10 cho từng hạng tử bên phải)} \\\\
5(x + 1) &= 2(x - 3) + 10 &&\\text{(rút gọn từng phân số)} \\\\
5x + 5 &= 2x - 6 + 10 &&\\text{(khai triển ngoặc; chú ý } 2 \\cdot (-3) = -6) \\\\
5x + 5 &= 2x + 4 &&\\text{(rút gọn vế phải: } -6 + 10 = 4) \\\\
5x - 2x &= 4 - 5 &&\\text{(chuyển vế: dồn ẩn về trái, hằng số về phải)} \\\\
3x &= -1 \\\\
x &= -\\frac{1}{3}
\\end{aligned}$$

Kiểm tra: VT $= \\dfrac{-1/3 + 1}{2} = \\dfrac{2/3}{2} = \\dfrac{1}{3}$. VP $= \\dfrac{-1/3 - 3}{5} + 1 = \\dfrac{-10/3}{5} + 1 = -\\dfrac{2}{3} + 1 = \\dfrac{1}{3}$ ✓.

### ❓ Câu hỏi tự nhiên

- *"Sao đổi dấu khi chuyển vế?"* — Như đã giải thích ở mục 💡: không phải đổi dấu, mà là **trừ cả 2 vế**. $+5$ ở trái bị $-5$ triệt tiêu thành 0, đồng thời vế phải xuất hiện $-5$. Viết tắt cho nhanh thôi.
- *"Nhân 2 vế cho số âm có đổi dấu bất đẳng thức không? Còn phương trình?"* — **Phương trình thì không**, dấu $=$ không có "chiều" để đổi. **Bất đẳng thức** thì có: $x < 5$ nhân $-1$ cả 2 vế phải đổi thành $-x > -5$. Lý do: thứ tự số đảo lại khi đổi dấu ($2 < 5$ nhưng $-2 > -5$). Bài này chỉ làm $=$ nên không bận tâm chuyện đổi chiều.
- *"Chuyển vế nguyên một biểu thức $(x + 1)$ được không?"* — Được, miễn nó là **một hạng tử cộng/trừ ở mức ngoài cùng**. Ví dụ $(x + 1) + 3 = 7$ → $(x + 1) = 7 - 3 = 4$. Nhưng KHÔNG được "chuyển vế" $x$ ra khỏi $(x + 1) \\cdot 5 = 20$ vì $x$ đang nằm bên trong ngoặc, dính với $+1$ qua phép cộng và toàn bộ đang bị nhân 5.
- *"Có cần ghi từng bước trừ/cộng cả 2 vế không, hay viết tắt được?"* — Khi mới học nên ghi đầy đủ, dễ bắt lỗi. Quen rồi thì viết tắt theo "chuyển vế đổi dấu" cho nhanh. Nhưng luôn nhớ bản chất bên dưới.

### ⚠ Lỗi thường gặp

- **"Chuyển vế quên đổi dấu":** $2x + 5 = 11$ → viết $2x = 11 + 5 = 16$ (sai). Đúng: $2x = 11 - 5 = 6$ → $x = 3$.
- **"Đổi dấu cả phần không chuyển":** $2x + 5 = 11$ → viết $-2x + 5 = 11$ (sai — tự đổi dấu hạng tử $2x$ mà có chuyển nó đi đâu). Chỉ đổi dấu hạng tử khi nó thực sự nhảy sang vế bên kia.
- **"Chuyển vế phần bên trong ngoặc":** $2(x + 3) = 10$ → viết $2x = 10 - 3 = 7$ (sai, bỏ qua hệ số 2 đang nhân với cả ngoặc). Đúng: khai triển trước → $2x + 6 = 10$ → $2x = 4$ → $x = 2$.
- **"Chuyển hệ số nhân chỉ qua một số hạng":** $3x + 6 = 15$ → viết $x + 6 = 15/3 = 5$ (sai, chỉ chia 3 cho $3x$). Đúng: hoặc trừ 6 trước ($3x = 9$ → $x = 3$), hoặc chia 3 cho cả vế: $x + 2 = 5$ → $x = 3$.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Giải $-3x + 8 = 2$ bằng quy tắc chuyển vế (viết tắt). Sau đó kiểm tra lại bằng cách thay vào.

<details>
<summary>Đáp án</summary>

$$\\begin{aligned}
-3x + 8 &= 2 \\\\
-3x &= 2 - 8 &&\\text{(chuyển } +8 \\text{ sang phải → } -8) \\\\
-3x &= -6 \\\\
x &= \\frac{-6}{-3} &&\\text{(chuyển } \\times(-3) \\text{ sang phải → } \\div(-3)) \\\\
x &= 2
\\end{aligned}$$

Kiểm tra: $-3 \\cdot 2 + 8 = -6 + 8 = 2$ ✓.
</details>

### 📋 Tóm tắt Mục 4

- "Chuyển vế đổi dấu" = viết tắt của Quy tắc 1 (trừ/cộng cả 2 vế).
- "Chuyển $\\times c$ thành $\\div c$" = viết tắt của Quy tắc 2.
- Chỉ chuyển được **hạng tử ở mức ngoài cùng** — không chuyển phần tử trong ngoặc.
- Phương trình dùng dấu $=$ → không bao giờ phải đổi chiều khi nhân số âm. Bất đẳng thức thì có.

---

## 5. Ba trường hợp nghiệm của phương trình bậc 1

Sau khi đưa về dạng $a \\cdot x = c$ (đem hết ẩn về một vế, hằng số về vế kia), có **đúng 3 khả năng**:

### 5.1 Nghiệm duy nhất — \`a ≠ 0\`

Trường hợp thường gặp: $a \\cdot x = c$ với $a \\neq 0$ cho duy nhất một nghiệm $x = \\dfrac{c}{a}$.

Ví dụ $5x = 20$ → $x = 4$. Chỉ một giá trị thoả mãn.

**Trực giác cân:** đĩa trái có 5 hộp, đĩa phải có 20 kg táo. Cân chia đều cho 5 → 1 hộp nặng 4 kg → $x = 4$. Chỉ có **một** giá trị này thoả; nếu hộp nặng 3 kg thì cân lệch ($5 \\cdot 3 = 15 \\neq 20$).

### 5.2 Vô nghiệm — \`a = 0, c ≠ 0\`

Khi rút gọn xong còn lại $0 \\cdot x = c$ với $c \\neq 0$. Vế trái luôn bằng 0 bất kể $x$ là gì, nhưng vế phải khác 0 → **không có giá trị nào của $x$ làm hai vế bằng nhau**.

**💡 Trực giác:** $0 \\cdot x = 5$ đọc là "0 nhân $x$ ra 5". Nhưng 0 nhân với bất cứ thứ gì đều ra 0, không bao giờ ra 5 → vô lý → không có $x$ nào cứu được. Tập nghiệm rỗng.

Hoặc trực giác cân: đĩa trái không có hộp nào (toàn bộ hộp đã bị tháo hết khi rút gọn), nặng 0 kg. Đĩa phải có 5 kg táo. Cân lệch hẳn — không có cách nào "thêm vào hộp" để cân thăng bằng vì *không còn hộp nào trên đĩa trái*.

**Ví dụ giải tay đầy đủ.** $2x + 3 = 2x + 5$

Đọc đề: bên trái 2 hộp + 3 kg táo. Bên phải 2 hộp + 5 kg táo. Cùng số hộp nhưng bên phải có nhiều táo hơn → vô lý, không thể thăng bằng.

$$\\begin{aligned}
2x + 3 &= 2x + 5 \\\\
2x + 3 - 2x &= 2x + 5 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế — tháo 2 hộp khỏi mỗi đĩa)} \\\\
3 &= 5 &&\\leftarrow \\text{mâu thuẫn (sai!)}
\\end{aligned}$$

Khi đến $3 = 5$, ta thấy: dù $x$ bằng gì, đến bước này phương trình đã thành $3 = 5$ — luôn sai. Vậy **không có $x$** nào làm phương trình gốc đúng → **vô nghiệm**, ký hiệu tập nghiệm $S = \\varnothing$.

Có thể viết dưới dạng $0 \\cdot x = c$:

$$\\begin{aligned}
2x + 3 &= 2x + 5 \\\\
2x - 2x &= 5 - 3 \\\\
0 \\cdot x &= 2 &&\\leftarrow \\text{vô lý (vế trái luôn 0, vế phải bằng 2)}
\\end{aligned}$$

Hai cách viết, cùng kết luận: vô nghiệm.

**Ví dụ thứ hai.** $3(x - 1) = 3x + 4$

$$\\begin{aligned}
3(x - 1) &= 3x + 4 \\\\
3x - 3 &= 3x + 4 &&\\text{(khai triển ngoặc)} \\\\
3x - 3x &= 4 + 3 &&\\text{(chuyển vế)} \\\\
0 &= 7 &&\\leftarrow \\text{vô lý}
\\end{aligned}$$

→ Vô nghiệm.

### 5.3 Vô số nghiệm — \`a = 0, c = 0\`

Khi rút gọn xong còn lại $0 \\cdot x = 0$. Mọi giá trị của $x$ đều thoả mãn (vì cả 2 vế đều bằng 0 với bất kỳ $x$).

**💡 Trực giác:** $0 \\cdot x = 0$ đọc là "0 nhân $x$ ra 0". Đúng với mọi $x$: $0 \\cdot 5 = 0$, $0 \\cdot (-3) = 0$, $0 \\cdot 1000 = 0$... Không ràng buộc gì cả → mọi số đều là nghiệm.

Hoặc trực giác cân: hai đĩa đã được tháo sạch ($0$ kg), cân thăng bằng tự nhiên — không quan tâm hộp $x$ từng nặng bao nhiêu nữa.

**Ví dụ giải tay đầy đủ.** $2x + 3 = 2x + 3$

Đây là phương trình mà hai vế **giống hệt nhau** — luôn đúng.

$$\\begin{aligned}
2x + 3 &= 2x + 3 \\\\
2x + 3 - 2x &= 2x + 3 - 2x &&\\text{(trừ } 2x \\text{ cả 2 vế)} \\\\
3 &= 3 &&\\leftarrow \\text{đúng với mọi } x
\\end{aligned}$$

Hoặc:

$$\\begin{aligned}
2x - 2x &= 3 - 3 \\\\
0 \\cdot x &= 0 &&\\leftarrow \\text{đúng với mọi } x
\\end{aligned}$$

→ **Vô số nghiệm**, tập nghiệm $S = \\mathbb{R}$ (mọi số thực).

**Ví dụ thứ hai.** $2(x + 1) = 2x + 2$

$$\\begin{aligned}
2(x + 1) &= 2x + 2 \\\\
2x + 2 &= 2x + 2 &&\\text{(khai triển ngoặc — hai vế giống nhau)} \\\\
0 &= 0 &&\\leftarrow \\text{luôn đúng}
\\end{aligned}$$

→ Vô số nghiệm.

### Bảng tổng kết

| Sau khi rút gọn | Trường hợp | Nghiệm | Ví dụ |
|---|---|---|---|
| $a \\cdot x = c$, $a \\neq 0$ | Bậc 1 thật sự | $x = c/a$ (duy nhất) | $3x = 6$ → $x = 2$ |
| $0 \\cdot x = c$, $c \\neq 0$ | Mâu thuẫn | Vô nghiệm $S = \\varnothing$ | $2x + 3 = 2x + 5$ |
| $0 \\cdot x = 0$ | Tự đúng (identity) | Vô số nghiệm $S = \\mathbb{R}$ | $2x + 3 = 2x + 3$ |

### ❓ Câu hỏi tự nhiên

- *"Khi nào biết phương trình vô nghiệm vs vô số nghiệm?"* — Khi rút gọn xong, **các hạng tử chứa $x$ triệt tiêu hết** (do hệ số bằng nhau ở 2 vế). Lúc đó:
  - Nếu **hằng số 2 vế bằng nhau** (vd $3 = 3$) → vô số nghiệm.
  - Nếu **hằng số 2 vế khác nhau** (vd $3 = 5$) → vô nghiệm.
  Nói cách khác: nhìn 2 vế gốc, nếu hệ số của $x$ giống nhau:
    - Hằng số tự do cũng giống → vô số nghiệm.
    - Hằng số tự do khác → vô nghiệm.
- *"Phương trình vô nghiệm có 'sai' không?"* — Không "sai", chỉ là không có $x$ nào thoả. Nó vẫn là một phát biểu hợp lệ; câu trả lời là "tập nghiệm rỗng".
- *"Vô số nghiệm có nghĩa là 'mọi số trên thế giới' (kể cả số phức) hay chỉ số thực?"* — Phụ thuộc tập đang xét. Trong chương trình phổ thông, mặc định là $\\mathbb{R}$ (mọi số thực). Nếu bài toán giới hạn ẩn ở $\\mathbb{N}$ (số tự nhiên), tập nghiệm là $\\mathbb{N}$.
- *"Trong code, làm sao phân biệt 3 trường hợp này?"* — Xem hàm \`solveLinear\` ở Bài 5: nếu $a \\neq 0$ trả về $-b/a$; nếu $a = 0 \\land b = 0$ báo "vô số nghiệm"; nếu $a = 0 \\land b \\neq 0$ báo "vô nghiệm".

### ⚠ Lỗi thường gặp

- **"Nhận diện sai vô nghiệm/vô số nghiệm":** thấy $3 = 3$ (hoặc $0 = 0$) tưởng là $x = 3$ (sai). $3 = 3$ nghĩa là phương trình đã trở thành phát biểu luôn đúng → mọi $x$ đều thoả, KHÔNG phải $x = 3$.
- **"Chia hai vế cho biểu thức chứa $x$":** ví dụ $x^2 = x$ → chia $x$ cả 2 vế → $x = 1$. Sai! Mất nghiệm $x = 0$. Lý do: nếu $x = 0$ thì đang chia 0, không hợp lệ. Đúng: chuyển vế $x^2 - x = 0$ → $x(x - 1) = 0$ → $x = 0$ hoặc $x = 1$. (Phương trình này là bậc 2, chỉ minh hoạ.) Bài học: không chia cho biểu thức ẩn nếu chưa loại trừ trường hợp nó bằng 0.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Mỗi phương trình sau là nghiệm duy nhất, vô nghiệm, hay vô số nghiệm?

1. $4x - 1 = 4x + 3$
2. $2(x - 3) = 2x - 6$
3. $5x + 2 = 17$

<details>
<summary>Đáp án</summary>

1. Trừ $4x$ cả 2 vế → $-1 = 3$ (sai) → **vô nghiệm**.
2. Khai triển vế trái → $2x - 6 = 2x - 6$ → hai vế giống nhau → **vô số nghiệm**.
3. $5x = 15$ → $x = 3$ → **nghiệm duy nhất**.
</details>

### 📋 Tóm tắt Mục 5

- 3 khả năng sau khi rút gọn $a \\cdot x = c$:
  - $a \\neq 0$ → nghiệm duy nhất $x = c/a$.
  - $a = 0, c \\neq 0$ → vô nghiệm (mâu thuẫn $0 = c$).
  - $a = 0, c = 0$ → vô số nghiệm (đúng với mọi $x$).
- Nhận diện nhanh: triệt tiêu hết $x$ rồi xem hằng số 2 vế có bằng nhau không.
- Đừng nhầm $3 = 3$ thành $x = 3$ — đó là vô số nghiệm.

> **Lưu ý kỹ thuật.** Khi $a = 0$, theo định nghĩa Mục 2 thì phương trình không còn là "bậc 1" nữa — nó đã biến thành phương trình bậc 0. Nhưng trong thực hành giải, ta vẫn xử lý chung trong cùng một quy trình.

---

## 6. Bài toán có lời văn → phương trình

Đây là kỹ năng quan trọng nhất của chương này: **dịch tiếng Việt sang ngôn ngữ phương trình**.

### Quy trình 4 bước

1. **Đặt ẩn**: chọn đại lượng chưa biết và đặt tên (thường là $x$). Viết rõ đơn vị và điều kiện ràng buộc (vd $x > 0$ nếu là số lượng).
2. **Diễn dịch điều kiện thành phương trình**: dùng các thông tin trong đề (tổng, hiệu, gấp mấy lần, $\\text{vận tốc} \\times \\text{thời gian}$, ...) để viết một đẳng thức chứa ẩn.
3. **Giải phương trình**.
4. **Kiểm tra và kết luận**: thay vào đề bài (không chỉ phương trình), kiểm tra điều kiện ràng buộc, trả lời bằng câu văn có đơn vị.

### Ví dụ mẫu 1 — Tổng và hiệu

> *"Tổng hai số là 30, hiệu hai số là 8. Tìm hai số đó."*

**Bước 1 — đặt ẩn.** Gọi số bé là $x$. Vì hiệu là 8, số lớn là $x + 8$.

**Bước 2 — lập phương trình.** Tổng hai số là 30:

$$x + (x + 8) = 30$$

**Bước 3 — giải.**

$$\\begin{aligned}
x + x + 8 &= 30 \\\\
2x + 8 &= 30 \\\\
2x &= 22 &&\\text{(trừ 8 cả 2 vế)} \\\\
x &= 11 &&\\text{(chia 2 cả 2 vế)}
\\end{aligned}$$

**Bước 4 — kết luận.** Số bé là $11$, số lớn là $11 + 8 = 19$. Kiểm tra: $11 + 19 = 30$ ✓ và $19 - 11 = 8$ ✓.

### Ví dụ mẫu 2 — Bài toán tuổi (age)

> *"Hiện nay tuổi của An gấp 3 lần tuổi của Bình. Sau 5 năm nữa, tuổi của An chỉ còn gấp 2 lần tuổi của Bình. Hỏi hiện nay An và Bình bao nhiêu tuổi?"*

**Bước 1 — đặt ẩn.** Gọi tuổi Bình hiện nay là $x$ ($x > 0$). Tuổi An hiện nay là $3x$.

Sau 5 năm:
- Tuổi Bình: $x + 5$.
- Tuổi An: $3x + 5$.

**Bước 2 — lập phương trình.** "Sau 5 năm, An gấp 2 lần Bình":

$$3x + 5 = 2 \\cdot (x + 5)$$

**Bước 3 — giải.**

$$\\begin{aligned}
3x + 5 &= 2x + 10 &&\\text{(khai triển vế phải)} \\\\
3x - 2x &= 10 - 5 &&\\text{(chuyển vế)} \\\\
x &= 5
\\end{aligned}$$

**Bước 4 — kết luận.** Bình hiện 5 tuổi, An hiện $3 \\cdot 5 = 15$ tuổi. Kiểm tra: sau 5 năm, Bình 10 tuổi, An 20 tuổi → $20 = 2 \\cdot 10$ ✓.

### Ví dụ mẫu 3 — Vận tốc, quãng đường, thời gian

> *"Một xe khách đi từ A đến B với vận tốc 50 km/h. Lúc về, xe đi với vận tốc 60 km/h, do đó thời gian về ngắn hơn lúc đi 30 phút. Tính quãng đường AB."*

**Bước 1 — đặt ẩn.** Gọi quãng đường AB là $x$ km ($x > 0$).

- Thời gian đi: $\\dfrac{x}{50}$ (giờ).
- Thời gian về: $\\dfrac{x}{60}$ (giờ).
- 30 phút $= \\dfrac{1}{2}$ giờ.

**Bước 2 — lập phương trình.** "Thời gian về ngắn hơn lúc đi 30 phút" nghĩa là $t_{\\text{đi}} - t_{\\text{về}} = \\dfrac{1}{2}$:

$$\\frac{x}{50} - \\frac{x}{60} = \\frac{1}{2}$$

**Bước 3 — giải.** Nhân BCNN(50, 60, 2) $= 300$ cả 2 vế:

$$\\begin{aligned}
300 \\cdot \\frac{x}{50} - 300 \\cdot \\frac{x}{60} &= 300 \\cdot \\frac{1}{2} \\\\
6x - 5x &= 150 \\\\
x &= 150
\\end{aligned}$$

**Bước 4 — kết luận.** Quãng đường AB là $150$ km. Kiểm tra: thời gian đi $150/50 = 3$ giờ, thời gian về $150/60 = 2.5$ giờ → chênh $0.5$ giờ = 30 phút ✓.

### Ví dụ mẫu 4 — Hỗn hợp dung dịch (mixture)

> *"Có 200 ml dung dịch muối nồng độ 10%. Cần thêm bao nhiêu ml nước nguyên chất để được dung dịch nồng độ 4%?"*

**Bước 1 — đặt ẩn.** Gọi lượng nước cần thêm là $x$ ml ($x > 0$).

- Lượng muối ban đầu: $200 \\times 10\\% = 20$ ml (giả sử khối lượng muối quy đổi tương ứng với ml — cho đơn giản, trong thực tế dùng gam).
- Lượng muối **không đổi** khi thêm nước (chỉ pha loãng).
- Thể tích dung dịch sau khi thêm: $200 + x$ ml.
- Nồng độ mới: $\\dfrac{20}{200 + x}$.

**Bước 2 — lập phương trình.** "Nồng độ mới là 4%":

$$\\frac{20}{200 + x} = \\frac{4}{100} = 0.04$$

**Bước 3 — giải.** Nhân chéo:

$$\\begin{aligned}
20 &= 0.04 \\cdot (200 + x) \\\\
20 &= 8 + 0.04x \\\\
12 &= 0.04x \\\\
x &= \\frac{12}{0.04} = 300
\\end{aligned}$$

**Bước 4 — kết luận.** Cần thêm $300$ ml nước. Kiểm tra: dung dịch mới có thể tích $500$ ml, lượng muối vẫn $20$ ml → nồng độ $20/500 = 0.04 = 4\\%$ ✓.

### Ví dụ mẫu 5 — Mua bán, giá tiền

> *"Một cửa hàng nhập một lô áo, dự định bán với giá 200.000 đồng/cái thì lãi tổng cộng 4.000.000 đồng. Nếu hạ giá xuống 180.000 đồng/cái thì lãi giảm còn 2.500.000 đồng. Hỏi lô áo có bao nhiêu cái và giá nhập mỗi cái là bao nhiêu?"*

**Bước 1 — đặt ẩn.** Gọi số lượng áo trong lô là $n$ cái ($n > 0$, nguyên), giá nhập mỗi cái là $p$ đồng. (Hai ẩn — sẽ rút về một ẩn.)

Lãi $=$ doanh thu $-$ chi phí:

$$\\begin{aligned}
\\text{Bán 200k mỗi cái:} \\quad & 200000n - pn = 4000000 &&\\to n(200000 - p) = 4000000 \\\\
\\text{Bán 180k mỗi cái:} \\quad & 180000n - pn = 2500000 &&\\to n(180000 - p) = 2500000
\\end{aligned}$$

**Cách dùng 1 ẩn:** lấy hiệu hai phương trình. Khi giá bán giảm 20k mỗi áo, tổng lãi giảm $4000000 - 2500000 = 1500000$ đồng. Mỗi áo "mất" 20k tiền lãi → số áo:

$$\\begin{aligned}
n \\cdot 20000 &= 1500000 \\\\
n &= 75
\\end{aligned}$$

Sau khi có $n = 75$, thay vào pt đầu: $75 \\cdot (200000 - p) = 4000000$ → $200000 - p = 53333.33\\ldots$ → $p \\approx 146666.67$ đồng.

**Bước 4 — kết luận.** Lô có $75$ cái áo, giá nhập mỗi cái khoảng $146.667$ đồng. Kiểm tra: lãi bán 200k $= 75 \\cdot (200000 - 146666.67) = 75 \\cdot 53333.33 \\approx 4.000.000$ ✓; lãi bán 180k $= 75 \\cdot (180000 - 146666.67) \\approx 2.500.000$ ✓.

> Lưu ý: bài này dẫn ra một ẩn \`n\` bằng cách lấy hiệu. Trong thực tế các bài word problem nâng cao thường dùng kỹ thuật "khử ẩn" như vậy trước khi áp dụng phương trình bậc 1.

### ❓ Câu hỏi tự nhiên

- *"Tôi có thể đặt số lớn là $x$ thay vì số bé không?"* — Có. Khi đó số bé là $x - 8$, phương trình $x + (x - 8) = 30$ → $x = 19$. Cùng kết quả, chỉ khác cách dán nhãn.
- *"Có thể đặt 2 ẩn $x$ (số bé) và $y$ (số lớn) không?"* — Có, và đó là **hệ phương trình** — sẽ học ở bài sau. Ở đây ta luôn cố gắng dùng **một ẩn** bằng cách tận dụng quan hệ giữa các đại lượng.
- *"Sao phải kiểm tra điều kiện cuối cùng?"* — Vì nghiệm phương trình toán học có thể không phù hợp với ràng buộc thực tế. Ví dụ "số áo" phải là số nguyên dương; nếu giải ra $n = 75.5$ thì có lỗi đâu đó trong đề/cách đặt ẩn. Hoặc bài tuổi, nếu ra $x = -3$ (tuổi âm) → loại.
- *"Khi nào nên đặt ẩn là 'cái mình muốn tìm', khi nào đặt 'cái dễ biểu diễn quan hệ'?"* — Hai chiến lược đều dùng được. Khi đại lượng cần tìm khó biểu diễn các đại lượng khác trực tiếp, đặt ẩn cho đại lượng trung gian, rồi tính ngược lại. Quan trọng: ghi rõ "x là gì" trước khi giải.

### ⚠ Lỗi thường gặp

- **Không định nghĩa rõ ẩn:** viết "gọi x" mà không nói "x là gì, đơn vị gì". Hậu quả: cuối bài không biết trả lời cái gì.
- **Đổi đơn vị sai:** bài vận tốc dùng phút và giờ lẫn lộn. Phải thống nhất đơn vị trước khi lập phương trình (vd đổi tất cả về giờ, hoặc tất cả về phút).
- **Dịch sai ngôn ngữ:** "A nhiều hơn B 5" → $A = B + 5$, KHÔNG phải $A + 5 = B$. "Gấp 3 lần" → $A = 3B$, KHÔNG phải $B = 3A$. Đọc kỹ chủ ngữ - vị ngữ.
- **Quên kiểm tra:** giải xong, không thay vào đề gốc → bỏ sót lỗi.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Hiện nay mẹ 30 tuổi, con 6 tuổi. Hỏi sau bao nhiêu năm nữa tuổi mẹ gấp 3 lần tuổi con?

<details>
<summary>Đáp án</summary>

**Đặt ẩn:** $x$ là số năm cần tìm ($x \\geq 0$).

Sau $x$ năm: mẹ $30 + x$ tuổi, con $6 + x$ tuổi.

**Phương trình:** "Mẹ gấp 3 lần con" → $30 + x = 3 \\cdot (6 + x)$.

**Giải:**

$$\\begin{aligned}
30 + x &= 18 + 3x \\\\
30 - 18 &= 3x - x \\\\
12 &= 2x \\\\
x &= 6
\\end{aligned}$$

**Kết luận:** Sau $6$ năm. Kiểm tra: mẹ 36, con 12 → $36 = 3 \\cdot 12$ ✓.
</details>

### 📋 Tóm tắt Mục 6

- Quy trình 4 bước: đặt ẩn → lập phương trình → giải → kiểm tra & kết luận.
- Đã giải 5 dạng word problem chính: tổng/hiệu, tuổi, vận tốc–quãng đường, hỗn hợp dung dịch, mua bán.
- Luôn ghi rõ "x là gì" với đơn vị; thống nhất đơn vị trước khi lập phương trình.
- Kiểm tra cuối bằng cách thay vào **đề gốc**, không chỉ phương trình.

---

## 7. Liên hệ Machine Learning — vì sao linear regression có lời giải "1 phát ra ngay"?

Trong ML, ta thường có một **hàm mất mát (loss function)** $L(w)$ đo độ sai khi mô hình dùng trọng số $w$. Mục tiêu: tìm $w^*$ sao cho $L(w^*)$ nhỏ nhất.

Nguyên lý từ giải tích: tại điểm cực tiểu, **đạo hàm bằng 0**:

$$L'(w^*) = 0 \\qquad \\leftarrow \\text{một phương trình theo } w$$

**Trường hợp đặc biệt — loss là hàm bậc 2** (như Mean Squared Error trong linear regression):

$$\\begin{aligned}
L(w) &= a \\cdot w^2 + b \\cdot w + c &&(a > 0) \\\\
L'(w) &= 2a \\cdot w + b &&\\text{(đạo hàm là biểu thức BẬC 1 theo } w)
\\end{aligned}$$

Đặt đạo hàm bằng 0:

$$\\begin{aligned}
2a \\cdot w + b &= 0 &&\\leftarrow \\text{chính là phương trình bậc 1 dạng chuẩn của Mục 2!} \\\\
w &= -\\frac{b}{2a} &&\\leftarrow \\text{nghiệm closed-form}
\\end{aligned}$$

### 7.1 Walk-through cụ thể — Linear regression 1 chiều, 3 điểm dữ liệu

Đây là phần quan trọng nhất: thấy "giải phương trình bậc 1" xuất hiện trong ML.

**Bài toán.** Có 3 điểm dữ liệu $(x_i, y_i)$:

| $i$ | $x_i$ | $y_i$ |
|---|---|---|
| 1 | 1 | 2 |
| 2 | 2 | 3 |
| 3 | 3 | 5 |

Ta muốn tìm đường thẳng $y = a \\cdot x$ (qua gốc, không có hệ số tự do — chọn dạng đơn giản nhất để chỉ có 1 tham số $a$) **fit** ba điểm này tốt nhất theo nghĩa **bình phương sai số nhỏ nhất (MSE)**.

**Bước 1 — định nghĩa loss.**

$$\\begin{aligned}
L(a) &= (a \\cdot 1 - 2)^2 + (a \\cdot 2 - 3)^2 + (a \\cdot 3 - 5)^2 \\\\
     &= (a - 2)^2 + (2a - 3)^2 + (3a - 5)^2
\\end{aligned}$$

**Bước 2 — khai triển từng hạng tử.**

$$\\begin{aligned}
(a - 2)^2 &= a^2 - 4a + 4 \\\\
(2a - 3)^2 &= 4a^2 - 12a + 9 \\\\
(3a - 5)^2 &= 9a^2 - 30a + 25
\\end{aligned}$$

Cộng lại:

$$\\begin{aligned}
L(a) &= (1 + 4 + 9) \\cdot a^2 + (-4 - 12 - 30) \\cdot a + (4 + 9 + 25) \\\\
     &= 14a^2 - 46a + 38
\\end{aligned}$$

**Đây là hàm bậc 2 theo $a$** (parabola hướng lên vì hệ số $a^2$ là $14 > 0$).

**Bước 3 — lấy đạo hàm theo $a$.**

$$L'(a) = 28a - 46$$

**Đây là biểu thức BẬC 1 theo $a$** — chính là dạng $\\alpha \\cdot a + \\beta$ với $\\alpha = 28, \\beta = -46$.

**Bước 4 — đặt đạo hàm bằng 0, giải phương trình bậc 1.**

$$\\begin{aligned}
28a - 46 &= 0 \\\\
28a &= 46 &&\\text{(chuyển vế)} \\\\
a &= \\frac{46}{28} \\\\
a &= \\frac{23}{14} \\\\
a &\\approx 1.643
\\end{aligned}$$

**Bước 5 — kiểm tra (tính loss tại đáp số).**

$$\\begin{aligned}
L\\left(\\tfrac{23}{14}\\right) &= 14 \\cdot \\left(\\tfrac{23}{14}\\right)^2 - 46 \\cdot \\tfrac{23}{14} + 38 \\\\
         &= 14 \\cdot \\frac{529}{196} - \\frac{46 \\cdot 23}{14} + 38 \\\\
         &= \\frac{529}{14} - \\frac{1058}{14} + 38 \\\\
         &= -\\frac{529}{14} + 38 \\\\
         &= \\frac{-529 + 532}{14} \\\\
         &= \\frac{3}{14} \\approx 0.214
\\end{aligned}$$

So với chọn $a = 1.5$ (gần đó): $L(1.5) = 14 \\cdot 2.25 - 46 \\cdot 1.5 + 38 = 31.5 - 69 + 38 = 0.5$. Lớn hơn $0.214$ → xác nhận $a \\approx 1.643$ đúng là cực tiểu.

**Kết luận.** Đường thẳng fit tốt nhất là $y = 1.643 \\cdot x$. Quá trình:

\`\`\`
3 điểm dữ liệu
  → định nghĩa loss MSE (hàm bậc 2 theo a)
  → lấy đạo hàm theo a (ra biểu thức bậc 1)
  → đặt = 0 (ra phương trình bậc 1)
  → giải bằng quy tắc cân (Mục 3-4)
  → nghiệm closed-form
\`\`\`

→ **Toàn bộ kỹ thuật của Mục 3-4 ở trên** (quy tắc cân, chuyển vế) chính là công cụ dùng trong bước cuối cùng để giải ra $a$. Bạn vừa làm ML mà không biết :).

### 7.2 Hệ quả thực tế — Normal Equation

Mở rộng cho linear regression nhiều chiều ($y = w_0 + w_1 x_1 + w_2 x_2 + \\cdots$), nghiệm closed-form là:

$$w^* = (X^\\top X)^{-1} X^\\top y \\qquad \\text{(Normal Equation)}$$

Không cần lặp gradient descent — giải 1 lần ra nghiệm chính xác (về mặt toán). Đây đúng là "giải phương trình bậc 1" ở quy mô vector/ma trận (sẽ học trong các tầng sau).

> **Trực giác.** Khi loss là **parabola hướng lên**, đáy của nó là điểm có tiếp tuyến nằm ngang (slope = 0). Tiếp tuyến của parabola là đường thẳng → công thức tiếp tuyến = 0 là phương trình bậc 1 → giải được ngay.
>
> Khi loss **không phải bậc 2** (vd neural network), đạo hàm không còn là phương trình bậc 1, nói chung không có closed-form → phải dùng gradient descent.

### 📋 Tóm tắt Mục 7

- Loss MSE là hàm bậc 2 theo tham số → đạo hàm là biểu thức bậc 1 → đặt = 0 ra phương trình bậc 1.
- Đã walk-through cụ thể với 3 điểm dữ liệu: $(1,2), (2,3), (3,5)$ → đường fit $y = \\dfrac{23}{14} \\cdot x$.
- Quy tắc cân/chuyển vế bạn vừa học là công cụ giải bước cuối cùng.
- Mở rộng vector/ma trận: Normal Equation $w^* = (X^\\top X)^{-1} X^\\top y$.

---

## 8. Bài tập

> Sau mỗi bài tự thử trước khi xem phần "Lời giải chi tiết" bên dưới.

**Bài 1.** Giải phương trình: $5x - 7 = 2x + 8$.

**Bài 2.** Giải phương trình: $\\dfrac{x + 2}{3} - \\dfrac{x - 1}{4} = 2$.

**Bài 3.** Giải phương trình: $2(3x - 1) - 3(x + 2) = 4(x - 1)$.

**Bài 4 (word problem).** Hai số có tổng là 50. Số lớn gấp 4 lần số nhỏ. Tìm hai số.

**Bài 5 (code Go).** Viết hàm \`solveLinear(a, b float64) (float64, error)\` giải phương trình $a \\cdot x + b = 0$. Yêu cầu:
- Nếu $a \\neq 0$, trả về \`(−b/a, nil)\`.
- Nếu $a = 0, b = 0$, trả về error \`"vô số nghiệm"\`.
- Nếu $a = 0, b \\neq 0$, trả về error \`"vô nghiệm"\`.

---

## 9. Lời giải chi tiết

### Bài 1 — \`5x − 7 = 2x + 8\`

**Cách tiếp cận:** dồn ẩn về vế trái, hằng số về vế phải.

$$\\begin{aligned}
5x - 7 &= 2x + 8 \\\\
5x - 2x &= 8 + 7 &&\\text{(chuyển } 2x \\text{ sang trái → } -2x \\text{; chuyển } -7 \\text{ sang phải → } +7) \\\\
3x &= 15 \\\\
x &= 5 &&\\text{(chia 3 cả 2 vế)}
\\end{aligned}$$

**Kiểm tra:** VT $5 \\cdot 5 - 7 = 18$, VP $2 \\cdot 5 + 8 = 18$ ✓.

**Đáp số:** $x = 5$.

### Bài 2 — \`(x + 2)/3 − (x − 1)/4 = 2\`

**Cách tiếp cận:** khử mẫu bằng cách nhân BCNN(3, 4) $= 12$ vào cả 2 vế, rồi giải như phương trình không phân số.

$$\\begin{aligned}
\\frac{x + 2}{3} - \\frac{x - 1}{4} &= 2 \\\\
12 \\cdot \\frac{x + 2}{3} - 12 \\cdot \\frac{x - 1}{4} &= 12 \\cdot 2 &&\\text{(nhân 12 cả 2 vế)} \\\\
4(x + 2) - 3(x - 1) &= 24 \\\\
4x + 8 - 3x + 3 &= 24 &&\\text{(khai triển ngoặc; cẩn thận dấu trừ phân phối: } -3 \\cdot (-1) = +3) \\\\
x + 11 &= 24 \\\\
x &= 13 &&\\text{(trừ 11 cả 2 vế)}
\\end{aligned}$$

**Kiểm tra:** $\\dfrac{13 + 2}{3} - \\dfrac{13 - 1}{4} = \\dfrac{15}{3} - \\dfrac{12}{4} = 5 - 3 = 2$ ✓.

**Đáp số:** $x = 13$.

> **Bẫy thường gặp:** quên đổi dấu khi phân phối dấu trừ vào ngoặc $-3(x - 1)$. Đúng là $-3x + 3$, không phải $-3x - 3$.

### Bài 3 — \`2(3x − 1) − 3(x + 2) = 4(x − 1)\`

**Bước 1 — khai triển ngoặc cả 2 vế:**

$$\\begin{aligned}
2(3x - 1) - 3(x + 2) &= 4(x - 1) \\\\
6x - 2 - 3x - 6 &= 4x - 4
\\end{aligned}$$

**Bước 2 — rút gọn vế trái:**

$$3x - 8 = 4x - 4$$

**Bước 3 — chuyển vế và giải:**

$$\\begin{aligned}
3x - 4x &= -4 + 8 \\\\
-x &= 4 \\\\
x &= -4 &&\\text{(nhân } -1 \\text{ cả 2 vế, tương đương đổi dấu)}
\\end{aligned}$$

**Kiểm tra:** VT $2(3 \\cdot (-4) - 1) - 3(-4 + 2) = 2 \\cdot (-13) - 3 \\cdot (-2) = -26 + 6 = -20$, VP $4(-4 - 1) = -20$ ✓.

**Đáp số:** $x = -4$.

### Bài 4 — Word problem

**Bước 1 — đặt ẩn.** Gọi số nhỏ là $x$ ($x > 0$). Theo đề, số lớn gấp 4 lần số nhỏ → số lớn là $4x$.

**Bước 2 — lập phương trình.** Tổng hai số là 50:

$$x + 4x = 50$$

**Bước 3 — giải.**

$$\\begin{aligned}
5x &= 50 \\\\
x &= 10
\\end{aligned}$$

**Bước 4 — kết luận.** Số nhỏ là $10$, số lớn là $4 \\cdot 10 = 40$. Kiểm tra: $10 + 40 = 50$ ✓ và $40 = 4 \\cdot 10$ ✓.

**Đáp số:** hai số là **10** và **40**.

### Bài 5 — Code Go

\`\`\`go
package main

import (
    "errors"
    "fmt"
)

// solveLinear giải phương trình a*x + b = 0.
//   - a != 0          → trả về nghiệm duy nhất x = -b/a
//   - a == 0, b == 0  → trả về error "vô số nghiệm"
//   - a == 0, b != 0  → trả về error "vô nghiệm"
func solveLinear(a, b float64) (float64, error) {
    if a == 0 {
        if b == 0 {
            return 0, errors.New("vô số nghiệm (0·x = 0 đúng với mọi x)")
        }
        return 0, errors.New("vô nghiệm (0·x = " + fmt.Sprintf("%g", -b) + " vô lý)")
    }
    return -b / a, nil
}

func main() {
    cases := [][2]float64{{2, -6}, {0, 0}, {0, 5}, {1, 1}}
    for _, c := range cases {
        x, err := solveLinear(c[0], c[1])
        if err != nil {
            fmt.Printf("a=%g, b=%g → %v\\n", c[0], c[1], err)
        } else {
            fmt.Printf("a=%g, b=%g → x = %g\\n", c[0], c[1], x)
        }
    }
}
\`\`\`

**Giải thích:**
- Dòng \`if a == 0\` tách trường hợp đặc biệt **trước** khi chia cho \`a\` (tránh chia 0).
- Trong \`a == 0\`, tiếp tục phân biệt \`b == 0\` (vô số nghiệm) và $b \\neq 0$ (vô nghiệm) — đúng theo Mục 5.
- Trường hợp thường: $x = -b/a$.

**Độ phức tạp:** $O(1)$ thời gian, $O(1)$ bộ nhớ — chỉ vài phép toán cơ bản.

> Mở rộng: trong production thường so sánh \`math.Abs(a) < 1e-12\` thay vì \`a == 0\` để xử lý lỗi làm tròn floating-point. Ở đây giữ đơn giản cho dễ đọc.

---

## File đính kèm

- [solutions.go](./solutions.go) — code Go đầy đủ: \`solveLinear\`, \`solveWithSteps\`, \`solveFromCoeffs\`, kèm bộ test bài 1–5.
- [visualization.html](./visualization.html) — minh hoạ tương tác: cân thăng bằng, step solver, word problem playground.

## Điều hướng

- ← Trước: [Lesson 02 — Biến và biểu thức](../lesson-02-variables-expressions/)
- → Tiếp: [Lesson 04 — Lũy thừa, căn, logarit](../lesson-04-powers-roots-logs/)
- 🏠 [Trang chính Algebra](../)
`;
