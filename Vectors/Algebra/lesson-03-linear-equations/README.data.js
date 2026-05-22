// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Algebra/lesson-03-linear-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Phương trình bậc 1 (Linear Equations)

> Tầng 1 — Algebra · Bài 3 trong lộ trình Vectors/Algebra.

## Mục tiêu học tập

Sau bài học này, bạn sẽ có thể:

1. Phân biệt **biểu thức (expression)** và **phương trình (equation)**.
2. Nhận diện **phương trình bậc 1 một ẩn (linear equation in one unknown)** ở dạng chuẩn \`ax + b = 0\`.
3. Giải phương trình bậc 1 bằng **quy tắc biến đổi tương đương** (cộng/trừ/nhân/chia 2 vế) và **quy tắc chuyển vế (transposition)**.
4. Xử lý 3 trường hợp nghiệm: **duy nhất**, **vô nghiệm**, **vô số nghiệm**.
5. Dịch một **bài toán có lời văn (word problem)** thành phương trình rồi giải.
6. Hiểu vì sao linear regression có **lời giải đóng (closed-form)** — chính là giải một phương trình bậc 1 trên đạo hàm.

## Kiến thức tiền đề

- [Lesson 02 — Biến và biểu thức](../lesson-02-variables-expressions/): bạn cần nắm khái niệm **biến (variable)**, **hằng số (constant)**, **biểu thức (expression)** và biết rút gọn các biểu thức như \`2x + 3x = 5x\`, \`2(x − 1) = 2x − 2\`.

---

## 1. Phương trình là gì? Khác biểu thức ở chỗ nào?

**Biểu thức (expression)** là một dãy phép toán có thể chứa số, biến, dấu cộng/trừ/nhân/chia… nhưng **không có dấu bằng (\`=\`)**. Ví dụ:

\`\`\`
2x + 3      (biểu thức)
x² − 5x + 6 (biểu thức)
3(a + b)    (biểu thức)
5/y + 2     (biểu thức)
\`\`\`

Biểu thức chỉ có thể được **rút gọn** hoặc **tính giá trị** khi biết giá trị của biến. Không có khái niệm "giải" biểu thức. Ví dụ với \`2x + 3\`: nếu \`x = 4\` thì biểu thức cho ra \`11\`; nếu \`x = −1\` thì cho ra \`1\`. Mỗi \`x\` cho một giá trị, không hỏi \`x\` là bao nhiêu.

**Phương trình (equation)** là **mệnh đề khẳng định hai biểu thức bằng nhau**, trong đó có ít nhất một **ẩn (unknown)** — một biến mà ta muốn tìm giá trị. Phương trình luôn có dấu \`=\`:

\`\`\`
2x + 3 = 7        (phương trình, ẩn x)
x − 5 = 10        (phương trình, ẩn x)
3y + 1 = y + 9    (phương trình, ẩn y)
4t = 100          (phương trình, ẩn t)
\`\`\`

### 💡 Trực giác — phương trình là một "câu hỏi"

- Biểu thức \`2x + 3\` giống một **cụm danh từ** — "cái bàn 3 chân" — không phải đúng/sai, chỉ là một thứ.
- Phương trình \`2x + 3 = 7\` giống một **câu hỏi-khẳng định** — "có giá trị \`x\` nào làm cho \`2x + 3\` đúng bằng \`7\` không?" — câu trả lời sẽ là số cụ thể (hoặc "không có").

Hoặc cách khác: phương trình \`2x + 3 = 7\` đọc là *"tìm \`x\` sao cho khi nhân 2 rồi cộng 3, ta được 7"*. Giải phương trình = trả lời cho câu hỏi đó.

**Nghiệm (solution / root)** của phương trình là giá trị của ẩn làm cho hai vế bằng nhau. Ta thử vài giá trị với \`2x + 3 = 7\`:

| \`x\` thử | Vế trái \`2x + 3\` | Vế phải | Bằng nhau? |
|---|---|---|---|
| \`0\` | \`2·0 + 3 = 3\` | \`7\` | Không |
| \`1\` | \`2·1 + 3 = 5\` | \`7\` | Không |
| \`2\` | \`2·2 + 3 = 7\` | \`7\` | **Có** → nghiệm |
| \`3\` | \`2·3 + 3 = 9\` | \`7\` | Không |

Vậy \`x = 2\` là nghiệm. **"Giải phương trình"** = tìm tất cả các nghiệm. Việc thử lần lượt như trên đúng nhưng chậm — các mục sau sẽ dạy cách biến đổi để **suy ra** nghiệm thay vì đoán.

### 4 ví dụ phân biệt biểu thức / phương trình

| # | Cái này là... | Nói nó "đúng" hay "sai"? |
|---|---|---|
| \`2x + 3\` | biểu thức | không nói được — chỉ có giá trị |
| \`2x + 3 = 7\` | phương trình | đúng khi \`x = 2\`, sai với \`x\` khác |
| \`x² − 4\` | biểu thức | có giá trị tùy \`x\` |
| \`x² − 4 = 0\` | phương trình | đúng khi \`x = 2\` hoặc \`x = −2\` |

### ❓ Câu hỏi tự nhiên bạn nên đặt ra ở đây

- *"Phương trình có luôn có nghiệm không?"* — **Không**. Có những phương trình không tồn tại giá trị nào của ẩn thoả mãn (vô nghiệm, xem Mục 5). Ví dụ \`x + 1 = x\` → bóc gọn \`0 = 1\` → vô lý → không có \`x\` nào thoả.
- *"Có thể có nhiều nghiệm không?"* — **Có thể**. Phương trình bậc 1 thì tối đa 1 nghiệm (hoặc 0, hoặc vô số), nhưng \`x² = 4\` có 2 nghiệm \`x = 2\` và \`x = −2\`. Bậc càng cao thì số nghiệm tối đa càng lớn.
- *"Sao biết một phương trình đã "giải xong"?"* — Khi đã viết được dạng \`x = <số cụ thể>\` (hoặc kết luận được vô nghiệm / vô số nghiệm). Đó là đích đến.
- *"Vế trái và vế phải có vai trò khác nhau không?"* — Không. \`2x + 3 = 7\` và \`7 = 2x + 3\` là cùng một phương trình. Theo thói quen, ta hay viết ẩn bên trái cho dễ nhìn.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** \`3y − 4\` là biểu thức hay phương trình? Còn \`3y − 4 = 11\` thì sao? Nếu là phương trình, \`y = 5\` có phải nghiệm không?

<details>
<summary>Đáp án</summary>

- \`3y − 4\`: **biểu thức** (không có dấu \`=\`).
- \`3y − 4 = 11\`: **phương trình** ẩn \`y\`.
- Thử \`y = 5\`: \`3·5 − 4 = 11\` → đúng → \`y = 5\` **là nghiệm**.
</details>

### 📋 Tóm tắt Mục 1

- Biểu thức **không** có \`=\`, chỉ tính giá trị, không "giải".
- Phương trình **có** \`=\` và ít nhất một ẩn, là một câu hỏi tìm ẩn.
- Nghiệm là giá trị làm hai vế bằng nhau.
- Giải phương trình bằng cách thử là đúng nhưng chậm — các mục sau dạy cách suy ra nghiệm.

---

## 2. Phương trình bậc 1 một ẩn — dạng chuẩn \`ax + b = 0\`

**Định nghĩa.** Phương trình bậc 1 (linear equation) một ẩn là phương trình có thể đưa về dạng:

\`\`\`
a·x + b = 0    với a, b là hằng số và a ≠ 0
\`\`\`

Hai điều cốt lõi của "bậc 1": (i) ẩn \`x\` chỉ xuất hiện ở **bậc 1** (không có \`x²\`, \`√x\`, \`1/x\`...), và (ii) hệ số \`a\` đứng trước \`x\` **khác 0** (nếu \`a = 0\` thì biến mất ẩn → không còn là phương trình bậc 1 nữa, xem Mục 5).

**Nghiệm duy nhất** của dạng chuẩn:

\`\`\`
a·x + b = 0
⇔ a·x = −b      (trừ b cả 2 vế)
⇔ x = −b / a    (chia a cả 2 vế, được vì a ≠ 0)
\`\`\`

### Nhận dạng — cái nào là bậc 1?

| Phương trình | Có phải bậc 1? | Vì sao |
|---|---|---|
| \`2x + 3 = 7\` | ✓ | đưa về \`2x − 4 = 0\` |
| \`−x + 5 = 0\` | ✓ | đã đúng dạng, \`a = −1, b = 5\` |
| \`5 − 3x = 0\` | ✓ | viết lại \`−3x + 5 = 0\` |
| \`x² − 4 = 0\` | ✗ | có \`x²\` (bậc 2) |
| \`1/x = 3\` | ✗ | \`x\` ở mẫu (không phải đa thức) |
| \`√x = 4\` | ✗ | có căn của \`x\` |
| \`3x + 2 = 3x + 2\` | ✗ | sau khi rút gọn còn \`0·x = 0\`, hệ số \`a = 0\` |

### Ví dụ giải tay 4 phương trình (đơn giản → trung bình → phân số → có dấu trừ)

Trong mỗi bước, ngoài phép toán, ta ghi rõ **"thao tác này tương đương với gì trên cân"** để gắn lại với trực giác Mục 3.

**Ví dụ 1 — đơn giản:** \`2x + 3 = 7\`

\`\`\`
2x + 3 = 7
2x + 3 − 3 = 7 − 3      (trừ 3 cả 2 vế — tháo 3 quả cân ra mỗi đĩa)
2x = 4
2x / 2 = 4 / 2          (chia 2 cả 2 vế — chia đôi mỗi đĩa)
x = 2
\`\`\`

Kiểm tra: \`2·2 + 3 = 4 + 3 = 7\` ✓

**Ví dụ 2 — trung bình, ẩn ở cả 2 vế:** \`5x − 4 = 2x + 11\`

\`\`\`
5x − 4 = 2x + 11
5x − 4 − 2x = 2x + 11 − 2x     (trừ 2x cả 2 vế — dồn ẩn về trái)
3x − 4 = 11
3x − 4 + 4 = 11 + 4            (cộng 4 cả 2 vế — đẩy hằng số về phải)
3x = 15
3x / 3 = 15 / 3                (chia 3 cả 2 vế)
x = 5
\`\`\`

Kiểm tra: VT \`5·5 − 4 = 21\`, VP \`2·5 + 11 = 21\` ✓

**Ví dụ 3 — có ngoặc:** \`3(x − 1) + 5 = 2x + 6\`

\`\`\`
3(x − 1) + 5 = 2x + 6
3x − 3 + 5   = 2x + 6           (khai triển ngoặc: 3·x − 3·1)
3x + 2       = 2x + 6           (rút gọn vế trái: −3 + 5 = 2)
3x + 2 − 2x  = 2x + 6 − 2x      (trừ 2x cả 2 vế)
x + 2        = 6
x + 2 − 2    = 6 − 2            (trừ 2 cả 2 vế)
x            = 4
\`\`\`

Kiểm tra: VT = \`3(4 − 1) + 5 = 9 + 5 = 14\`, VP = \`2·4 + 6 = 14\` ✓

**Ví dụ 4 — có phân số:** \`x/2 + 1/3 = 5/6\`

Mẹo: nhân cả 2 vế với **bội chung nhỏ nhất (BCNN)** của các mẫu (\`2, 3, 6\` → BCNN = 6) để khử phân số ngay từ đầu — sau đó giải như phương trình nguyên.

\`\`\`
x/2 + 1/3 = 5/6
6·(x/2 + 1/3) = 6·(5/6)         (nhân 6 cả 2 vế)
6·(x/2) + 6·(1/3) = 6·(5/6)     (phân phối 6 cho từng hạng tử bên trái)
3x + 2 = 5                       (rút gọn từng hạng tử)
3x = 3                           (trừ 2 cả 2 vế)
x = 1                            (chia 3 cả 2 vế)
\`\`\`

Kiểm tra: \`1/2 + 1/3 = 3/6 + 2/6 = 5/6\` ✓

### ❓ Câu hỏi tự nhiên

- *"Sao gọi là 'bậc 1' chứ không phải 'bậc nhất'?"* — Hai cách gọi như nhau. "Bậc 1 = degree 1" nghĩa là số mũ cao nhất của ẩn là \`1\` (\`x¹ = x\`). Bậc 2 là \`x²\`, bậc 3 là \`x³\`...
- *"Nếu cả hai vế đều có \`x\` (như Ví dụ 2), nó vẫn là bậc 1?"* — **Có**, miễn là sau khi rút gọn, ẩn vẫn ở bậc 1. \`5x − 4 = 2x + 11\` chuyển hết về một vế → \`3x − 15 = 0\` → vẫn dạng \`ax + b = 0\`.
- *"\`x\` ở mẫu (\`3/x = 6\`) có phải bậc 1 không?"* — **Không**. \`3/x = 3·x⁻¹\` → ẩn ở bậc \`−1\`, không phải bậc 1. Đó là phương trình **phân thức**, cách giải khác (nhân chéo, kèm điều kiện \`x ≠ 0\`).
- *"Sao chỉ ghi \`a ≠ 0\` mà không ghi \`b ≠ 0\`?"* — \`b = 0\` là **hợp lệ**, chỉ có nghĩa "không có hằng số tự do". \`2x = 0\` vẫn là phương trình bậc 1, nghiệm \`x = 0\`.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Phương trình \`−4x + 12 = 0\` có phải bậc 1? Nghiệm là bao nhiêu?

<details>
<summary>Đáp án</summary>

Có. \`a = −4\` (khác 0), \`b = 12\`. Nghiệm \`x = −b/a = −12/(−4) = 3\`. Kiểm tra: \`−4·3 + 12 = 0\` ✓.
</details>

### 📋 Tóm tắt Mục 2

- Dạng chuẩn: \`a·x + b = 0\` với \`a ≠ 0\`.
- Nhận dạng: ẩn ở bậc 1, không có \`x²\`, \`√x\`, \`1/x\`.
- Quy trình giải dạng chuẩn: đem hằng số sang phải → chia \`a\` → ra \`x = −b/a\`.
- Đã giải 4 ví dụ: đơn giản, ẩn 2 vế, có ngoặc, có phân số.

---

## 3. Quy tắc biến đổi tương đương — cân thăng bằng

Hai phép biến đổi sau **không thay đổi tập nghiệm** của phương trình (nên gọi là *tương đương*):

**Quy tắc 1 (cộng/trừ).** Cộng hoặc trừ **cùng một số (hoặc cùng một biểu thức)** vào cả hai vế:

\`\`\`
A = B   ⇔   A + c = B + c
A = B   ⇔   A − c = B − c
\`\`\`

**Quy tắc 2 (nhân/chia).** Nhân hoặc chia cả hai vế cho **cùng một số khác 0**:

\`\`\`
A = B   ⇔   c·A = c·B     (c ≠ 0)
A = B   ⇔   A/c = B/c      (c ≠ 0)
\`\`\`

> Vì sao bắt buộc \`c ≠ 0\`? Nếu nhân 0 vào cả 2 vế, ta được \`0 = 0\` — đúng với mọi giá trị của ẩn — làm mất thông tin gốc. Nếu chia cho 0, phép toán không xác định.

### 💡 Trực giác: cân thăng bằng (balance scale)

Tưởng tượng phương trình là một **cái cân hai đĩa**. Vế trái = đĩa trái, vế phải = đĩa phải. Phương trình \`2x + 3 = 7\` nghĩa là **đĩa trái đang nặng đúng bằng đĩa phải**.

Cụ thể với \`2x + 3 = 7\`: trên đĩa trái có 2 hộp bí ẩn (mỗi hộp nặng \`x\` kg, chưa biết) cộng với 3 kg quả táo; đĩa phải có 7 kg quả táo. Cân thăng bằng → tổng trọng lượng hai bên bằng nhau.

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

- Nếu **bỏ 3 kg táo ra khỏi đĩa trái** → phải **bỏ 3 kg táo ra khỏi đĩa phải** (đây chính là "trừ 3 cả 2 vế"). Sau thao tác: trái còn 2 hộp, phải còn 4 kg → \`2x = 4\`.
- Nếu **chia đôi đĩa trái** (chỉ giữ 1 hộp) → phải **chia đôi đĩa phải** (chỉ giữ 2 kg). Sau thao tác: \`x = 2\`.

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

**Ví dụ A — chỉ cần một thao tác:** \`x + 7 = 12\`

\`\`\`
[x] 🍎×7  |  🍎×12         Tháo 7 quả táo khỏi mỗi đĩa
━━━━━△━━━━━━━━━━━     →    [x]       |  🍎×5
                            ━━━━△━━━━━━━
                            → x = 5
\`\`\`

Kiểm tra: \`5 + 7 = 12\` ✓.

**Ví dụ B — chỉ nhân/chia:** \`4x = 20\`

\`\`\`
[x][x][x][x]  |  🍎×20       Chia đôi 4 lần (hay chia 4):
━━━━━━━━△━━━━━━━━━━     →    [x]   |  🍎×5
                              ━━━△━━━━━
                              → x = 5
\`\`\`

Hoặc nhân \`1/4\` cả 2 vế: \`(1/4)·4x = (1/4)·20\` → \`x = 5\`.

**Ví dụ C — hai thao tác liên tiếp:** \`2x − 5 = 9\`

Trước hết "thêm 5 quả táo cả 2 đĩa" (bù vào chỗ đang trừ):

\`\`\`
[x][x] (nợ 5🍎) | 🍎×9    +5 cả 2 đĩa:    [x][x] | 🍎×14    chia 2:    [x] | 🍎×7
━━━━━━━━━△━━━━━━━━━       ━━━━━━━━△━━━━━━━━━━              ━━━━△━━━━━━━
                                                                 → x = 7
\`\`\`

Kiểm tra: \`2·7 − 5 = 14 − 5 = 9\` ✓.

**Ví dụ D — biểu thức ẩn ở cả hai đĩa:** \`3x = x + 8\`

Đĩa trái có 3 hộp, đĩa phải có 1 hộp + 8 kg táo. Thao tác: **"tháo 1 hộp khỏi mỗi đĩa"** (trừ \`x\` cả 2 vế) — vì 1 hộp ở trái và 1 hộp ở phải nặng bằng nhau, nên cân vẫn thăng bằng:

\`\`\`
[x][x][x]  | [x] 🍎×8       tháo 1 hộp mỗi đĩa:
━━━━━━━△━━━━━━━━━━━       →   [x][x]   | 🍎×8        chia 2:   [x] | 🍎×4
                              ━━━━△━━━━━━━            ━━━△━━━━━━━
                                                          → x = 4
\`\`\`

Đây là điểm tinh tế: **không chỉ "số" mới tháo được, mà cả "hộp" (\`x\`) cũng tháo được**, miễn là tháo đồng đều 2 đĩa. Vì cùng một thứ ở 2 đĩa nặng như nhau → cân không lệch.

### ❓ Câu hỏi tự nhiên

- *"Sao chỉ thao tác với 'cả 2 vế cùng lúc' thì cân không lệch?"* — Vì hai vế ban đầu nặng bằng nhau. Nếu cả hai cùng bớt đi 3 kg, hiệu vẫn bằng 0 → cân thăng bằng. Nếu chỉ bớt một bên, hiệu thành 3 kg → cân lệch.
- *"Có thể cộng/trừ 'biểu thức chứa x' không, hay chỉ được số?"* — Có thể. Ví dụ D ở trên: trừ \`x\` cả 2 vế hoàn toàn hợp lệ. Lý do: cùng giá trị (dù chưa biết cụ thể), cùng tháo đồng đều.
- *"Nhân 2 vế cho 0 thì sao?"* — Mất thông tin. \`2x = 4\` đúng, nhưng nếu nhân 0: \`0 = 0\` — đúng với mọi \`x\`, không còn cho biết \`x = 2\`. Vì thế bắt buộc \`c ≠ 0\` ở Quy tắc 2.
- *"Nhân 2 vế cho số âm có đổi dấu không?"* — **Phương trình thì KHÔNG** đổi dấu (vẫn là dấu \`=\`). \`−3 = −3\` vẫn là \`−3 = −3\`. Nhưng với **bất đẳng thức** (\`<\`, \`>\`), nhân số âm thì PHẢI đổi chiều dấu (\`<\` thành \`>\`). Đây là lý do người ta hay nhầm — bài này chỉ làm với \`=\` nên không đổi.
- *"Bình phương 2 vế có phải biến đổi tương đương không?"* — **Không hẳn**. Bình phương có thể *thêm* nghiệm lạ. Ví dụ: \`x = 2\` chỉ có 1 nghiệm, nhưng \`x² = 4\` có 2 nghiệm \`±2\`. Vì thế khi bình phương phải kiểm tra lại nghiệm. Trong bài này ta không bình phương — chỉ dùng cộng/trừ/nhân/chia.

### ⚠ Lỗi thường gặp

- **"Chỉ thao tác một vế"** — viết \`2x + 3 = 7\` → \`2x = 7\` (quên trừ 3 bên phải). Cân lệch ngay lập tức.
- **"Trừ một số khỏi từng số hạng riêng lẻ"** — \`2x + 3 = 7\` → \`2x = 4 − 3 = 1\` (sai). Đúng là trừ 3 vào cả vế phải: \`7 − 3 = 4\`, không phải trừ thêm lần nữa.
- **"Chia chỉ một số hạng"** — \`2x + 4 = 10\` → \`x + 4 = 5\` (sai, chỉ chia 2 cho \`2x\` mà không chia 4 và 10). Đúng là chia 2 cho **cả vế**: \`(2x + 4)/2 = 10/2\` → \`x + 2 = 5\`. Hoặc làm gọn hơn: trừ 4 trước rồi mới chia: \`2x = 6\` → \`x = 3\`.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Cho phương trình \`4x − 3 = x + 9\`. Bạn muốn dồn ẩn về trái và hằng số về phải bằng quy tắc cân — viết ra 2 thao tác cụ thể, kết quả mỗi bước, và nghiệm cuối cùng.

<details>
<summary>Đáp án</summary>

- Bước 1: **trừ \`x\` cả 2 vế** (tháo 1 hộp khỏi mỗi đĩa) → \`3x − 3 = 9\`.
- Bước 2: **cộng 3 cả 2 vế** (thêm 3 quả táo mỗi đĩa) → \`3x = 12\`.
- Bước 3: **chia 3 cả 2 vế** → \`x = 4\`.

Kiểm tra: VT \`4·4 − 3 = 13\`, VP \`4 + 9 = 13\` ✓.
</details>

### 📋 Tóm tắt Mục 3

- Hai quy tắc cân: cộng/trừ cùng số (cả 2 vế) và nhân/chia cùng số khác 0 (cả 2 vế).
- Trực giác cái cân: thao tác **đồng đều** mới giữ cân thăng bằng → mới giữ phương trình tương đương.
- Cộng/trừ cả "biểu thức chứa \`x\`" cũng được — miễn áp dụng đều 2 vế.
- Bắt buộc \`c ≠ 0\` khi nhân/chia, nếu không sẽ mất thông tin (×0) hoặc vô định (÷0).

---

## 4. Quy tắc chuyển vế (transposition) — viết tắt của Quy tắc 1

Trong thực hành, ta hay viết tắt **"trừ c cả 2 vế rồi rút gọn vế bên kia"** thành **"chuyển c từ vế này sang vế kia và đổi dấu"**. Đây gọi là **quy tắc chuyển vế**:

\`\`\`
A + c = B    ⇔    A = B − c    (chuyển +c sang phải → thành −c)
A − c = B    ⇔    A = B + c    (chuyển −c sang phải → thành +c)
c·A = B      ⇔    A = B / c    (chuyển ×c sang phải → thành ÷c, c ≠ 0)
A/c = B      ⇔    A = B · c    (chuyển ÷c sang phải → thành ×c)
\`\`\`

**Cẩn thận**: chuyển vế chỉ áp dụng cho **hạng tử (term)** đứng độc lập bằng phép cộng/trừ ở mức ngoài cùng, hoặc hệ số nhân/chia của cả một vế. **Không** chuyển vế phần tử bên trong dấu ngoặc.

### 💡 Vì sao "đổi dấu khi chuyển vế"?

Đây là câu hỏi học sinh hay hỏi nhất. Câu trả lời: **không phải "đổi dấu" gì cả — nó là hệ quả của việc trừ cả 2 vế.**

Xét \`x + 5 = 12\`. Theo Quy tắc 1 (trừ 5 cả 2 vế):

\`\`\`
x + 5 = 12
x + 5 − 5 = 12 − 5
x + 0     = 7
x         = 7
\`\`\`

Quan sát: ở vế trái, \`+5 − 5 = 0\` → biến mất. Ở vế phải, \`12 − 5 = 7\`. Thay vì viết hết các bước trung gian, người ta viết tắt: **"+5 ở trái bị xóa, bên phải xuất hiện thêm −5"** — nhìn vào trông như "+5 chuyển sang phải và đổi dấu thành −5". Thực chất là \`+5 − 5 = 0\` ở trái và \`12 − 5 = 7\` ở phải.

Tương tự cho nhân/chia. \`5x = 20\`, chia 5 cả 2 vế:

\`\`\`
5x   / 5 = 20 / 5
1·x      = 4
x        = 4
\`\`\`

Vế trái \`5/5 = 1\` → còn lại \`x\`. Vế phải \`20/5 = 4\`. Nhìn ngoài như "×5 chuyển sang phải thành ÷5". Bản chất vẫn là Quy tắc 2.

### Ví dụ step-by-step: \`3x + 5 = 17\`

Cách trình bày trong sách giáo khoa thường viết:

\`\`\`
3x + 5 = 17
3x     = 17 − 5     (chuyển +5 sang phải → −5)
3x     = 12
x      = 12 / 3     (chuyển ×3 sang phải → ÷3)
x      = 4
\`\`\`

Cách trình bày bằng **quy tắc biến đổi tương đương** (cùng kết quả, rõ hơn ở giai đoạn mới học):

\`\`\`
3x + 5 = 17
3x + 5 − 5 = 17 − 5     (trừ 5 cả 2 vế — như tháo 5kg ra mỗi đĩa cân)
3x         = 12
3x / 3     = 12 / 3     (chia 3 cả 2 vế — chia đều thành 3 phần bằng nhau)
x          = 4
\`\`\`

Kiểm tra: thay \`x = 4\` vào ban đầu: \`3·4 + 5 = 12 + 5 = 17\` ✓

**Hai cách là một** — chuyển vế chỉ là viết tắt. Nhưng quy tắc biến đổi rõ hơn ở chỗ: thấy ngay cân vẫn thăng bằng vì ta làm thao tác cho cả 2 đĩa.

### Thêm 3 ví dụ giải tay (đơn giản → trung bình → phân số)

**Ví dụ 4.1 — đơn giản:** \`7 − 2x = 1\`

Thao tác từng bước, ghi rõ ý nghĩa cân:

\`\`\`
7 − 2x = 1
7 − 2x − 7 = 1 − 7         (trừ 7 cả 2 vế — tháo 7 kg táo khỏi mỗi đĩa)
−2x        = −6
−2x / (−2) = −6 / (−2)     (chia −2 cả 2 vế)
x          = 3
\`\`\`

Hoặc dùng chuyển vế quen tay: "+7 sang phải → −7", "−2x ở trái có hệ số −2, chuyển ×(−2) sang phải → ÷(−2)". Kết quả như nhau.

Kiểm tra: \`7 − 2·3 = 7 − 6 = 1\` ✓.

**Ví dụ 4.2 — trung bình, ẩn cả 2 vế:** \`6x − 4 = 2x + 8\`

\`\`\`
6x − 4 = 2x + 8
6x − 4 − 2x = 2x + 8 − 2x        (trừ 2x cả 2 vế — tháo 2 hộp khỏi mỗi đĩa)
4x − 4      = 8
4x − 4 + 4  = 8 + 4               (cộng 4 cả 2 vế — thêm 4 kg táo mỗi đĩa)
4x          = 12
4x / 4      = 12 / 4              (chia 4 cả 2 vế)
x           = 3
\`\`\`

Hoặc dùng chuyển vế: \`6x − 2x = 8 + 4\` → \`4x = 12\` → \`x = 3\`.

Kiểm tra: VT \`6·3 − 4 = 14\`, VP \`2·3 + 8 = 14\` ✓.

**Ví dụ 4.3 — có phân số:** \`(x + 1)/2 = (x − 3)/5 + 1\`

Khử mẫu trước bằng cách nhân BCNN(2, 5) = 10 cả 2 vế:

\`\`\`
(x + 1)/2 = (x − 3)/5 + 1
10·(x + 1)/2 = 10·[(x − 3)/5 + 1]            (nhân 10 cả 2 vế)
10·(x + 1)/2 = 10·(x − 3)/5 + 10·1            (phân phối 10 cho từng hạng tử bên phải)
5(x + 1)     = 2(x − 3) + 10                  (rút gọn từng phân số)
5x + 5       = 2x − 6 + 10                    (khai triển ngoặc; chú ý 2·(−3) = −6)
5x + 5       = 2x + 4                         (rút gọn vế phải: −6 + 10 = 4)
5x − 2x      = 4 − 5                          (chuyển vế: dồn ẩn về trái, hằng số về phải)
3x           = −1
x            = −1/3
\`\`\`

Kiểm tra: VT = \`(−1/3 + 1)/2 = (2/3)/2 = 1/3\`. VP = \`(−1/3 − 3)/5 + 1 = (−10/3)/5 + 1 = −2/3 + 1 = 1/3\` ✓.

### ❓ Câu hỏi tự nhiên

- *"Sao đổi dấu khi chuyển vế?"* — Như đã giải thích ở mục 💡: không phải đổi dấu, mà là **trừ cả 2 vế**. \`+5\` ở trái bị \`−5\` triệt tiêu thành 0, đồng thời vế phải xuất hiện \`−5\`. Viết tắt cho nhanh thôi.
- *"Nhân 2 vế cho số âm có đổi dấu bất đẳng thức không? Còn phương trình?"* — **Phương trình thì không**, dấu \`=\` không có "chiều" để đổi. **Bất đẳng thức** thì có: \`x < 5\` nhân \`−1\` cả 2 vế phải đổi thành \`−x > −5\`. Lý do: thứ tự số đảo lại khi đổi dấu (\`2 < 5\` nhưng \`−2 > −5\`). Bài này chỉ làm \`=\` nên không bận tâm chuyện đổi chiều.
- *"Chuyển vế nguyên một biểu thức \`(x + 1)\` được không?"* — Được, miễn nó là **một hạng tử cộng/trừ ở mức ngoài cùng**. Ví dụ \`(x + 1) + 3 = 7\` → \`(x + 1) = 7 − 3 = 4\`. Nhưng KHÔNG được "chuyển vế" \`x\` ra khỏi \`(x + 1)·5 = 20\` vì \`x\` đang nằm bên trong ngoặc, dính với \`+1\` qua phép cộng và toàn bộ đang bị nhân 5.
- *"Có cần ghi từng bước trừ/cộng cả 2 vế không, hay viết tắt được?"* — Khi mới học nên ghi đầy đủ, dễ bắt lỗi. Quen rồi thì viết tắt theo "chuyển vế đổi dấu" cho nhanh. Nhưng luôn nhớ bản chất bên dưới.

### ⚠ Lỗi thường gặp

- **"Chuyển vế quên đổi dấu":** \`2x + 5 = 11\` → viết \`2x = 11 + 5 = 16\` (sai). Đúng: \`2x = 11 − 5 = 6\` → \`x = 3\`.
- **"Đổi dấu cả phần không chuyển":** \`2x + 5 = 11\` → viết \`−2x + 5 = 11\` (sai — tự đổi dấu hạng tử \`2x\` mà có chuyển nó đi đâu). Chỉ đổi dấu hạng tử khi nó thực sự nhảy sang vế bên kia.
- **"Chuyển vế phần bên trong ngoặc":** \`2(x + 3) = 10\` → viết \`2x = 10 − 3 = 7\` (sai, bỏ qua hệ số 2 đang nhân với cả ngoặc). Đúng: khai triển trước → \`2x + 6 = 10\` → \`2x = 4\` → \`x = 2\`.
- **"Chuyển hệ số nhân chỉ qua một số hạng":** \`3x + 6 = 15\` → viết \`x + 6 = 15/3 = 5\` (sai, chỉ chia 3 cho \`3x\`). Đúng: hoặc trừ 6 trước (\`3x = 9\` → \`x = 3\`), hoặc chia 3 cho cả vế: \`x + 2 = 5\` → \`x = 3\`.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Giải \`−3x + 8 = 2\` bằng quy tắc chuyển vế (viết tắt). Sau đó kiểm tra lại bằng cách thay vào.

<details>
<summary>Đáp án</summary>

\`\`\`
−3x + 8 = 2
−3x = 2 − 8         (chuyển +8 sang phải → −8)
−3x = −6
x   = −6 / (−3)     (chuyển ×(−3) sang phải → ÷(−3))
x   = 2
\`\`\`

Kiểm tra: \`−3·2 + 8 = −6 + 8 = 2\` ✓.
</details>

### 📋 Tóm tắt Mục 4

- "Chuyển vế đổi dấu" = viết tắt của Quy tắc 1 (trừ/cộng cả 2 vế).
- "Chuyển ×c thành ÷c" = viết tắt của Quy tắc 2.
- Chỉ chuyển được **hạng tử ở mức ngoài cùng** — không chuyển phần tử trong ngoặc.
- Phương trình dùng dấu \`=\` → không bao giờ phải đổi chiều khi nhân số âm. Bất đẳng thức thì có.

---

## 5. Ba trường hợp nghiệm của phương trình bậc 1

Sau khi đưa về dạng \`a·x = c\` (đem hết ẩn về một vế, hằng số về vế kia), có **đúng 3 khả năng**:

### 5.1 Nghiệm duy nhất — \`a ≠ 0\`

Trường hợp thường gặp: \`a·x = c\` với \`a ≠ 0\` cho duy nhất một nghiệm \`x = c / a\`.

Ví dụ \`5x = 20\` → \`x = 4\`. Chỉ một giá trị thoả mãn.

**Trực giác cân:** đĩa trái có 5 hộp, đĩa phải có 20 kg táo. Cân chia đều cho 5 → 1 hộp nặng 4 kg → \`x = 4\`. Chỉ có **một** giá trị này thoả; nếu hộp nặng 3 kg thì cân lệch (5·3 = 15 ≠ 20).

### 5.2 Vô nghiệm — \`a = 0, c ≠ 0\`

Khi rút gọn xong còn lại \`0·x = c\` với \`c ≠ 0\`. Vế trái luôn bằng 0 bất kể \`x\` là gì, nhưng vế phải khác 0 → **không có giá trị nào của \`x\` làm hai vế bằng nhau**.

**💡 Trực giác:** \`0·x = 5\` đọc là "0 nhân \`x\` ra 5". Nhưng 0 nhân với bất cứ thứ gì đều ra 0, không bao giờ ra 5 → vô lý → không có \`x\` nào cứu được. Tập nghiệm rỗng.

Hoặc trực giác cân: đĩa trái không có hộp nào (toàn bộ hộp đã bị tháo hết khi rút gọn), nặng 0 kg. Đĩa phải có 5 kg táo. Cân lệch hẳn — không có cách nào "thêm vào hộp" để cân thăng bằng vì *không còn hộp nào trên đĩa trái*.

**Ví dụ giải tay đầy đủ.** \`2x + 3 = 2x + 5\`

Đọc đề: bên trái 2 hộp + 3 kg táo. Bên phải 2 hộp + 5 kg táo. Cùng số hộp nhưng bên phải có nhiều táo hơn → vô lý, không thể thăng bằng.

\`\`\`
2x + 3 = 2x + 5
2x + 3 − 2x = 2x + 5 − 2x      (trừ 2x cả 2 vế — tháo 2 hộp khỏi mỗi đĩa)
3           = 5                 ← mâu thuẫn (sai!)
\`\`\`

Khi đến \`3 = 5\`, ta thấy: dù \`x\` bằng gì, đến bước này phương trình đã thành \`3 = 5\` — luôn sai. Vậy **không có \`x\`** nào làm phương trình gốc đúng → **vô nghiệm**, ký hiệu tập nghiệm \`S = ∅\`.

Có thể viết dưới dạng \`0·x = c\`:

\`\`\`
2x + 3 = 2x + 5
2x − 2x = 5 − 3
0·x     = 2          ← vô lý (vế trái luôn 0, vế phải bằng 2)
\`\`\`

Hai cách viết, cùng kết luận: vô nghiệm.

**Ví dụ thứ hai.** \`3(x − 1) = 3x + 4\`

\`\`\`
3(x − 1) = 3x + 4
3x − 3   = 3x + 4         (khai triển ngoặc)
3x − 3x  = 4 + 3           (chuyển vế)
0        = 7               ← vô lý
\`\`\`

→ Vô nghiệm.

### 5.3 Vô số nghiệm — \`a = 0, c = 0\`

Khi rút gọn xong còn lại \`0·x = 0\`. Mọi giá trị của \`x\` đều thoả mãn (vì cả 2 vế đều bằng 0 với bất kỳ \`x\`).

**💡 Trực giác:** \`0·x = 0\` đọc là "0 nhân \`x\` ra 0". Đúng với mọi \`x\`: \`0·5 = 0\`, \`0·(−3) = 0\`, \`0·1000 = 0\`... Không ràng buộc gì cả → mọi số đều là nghiệm.

Hoặc trực giác cân: hai đĩa đã được tháo sạch (\`0 kg\`), cân thăng bằng tự nhiên — không quan tâm hộp \`x\` từng nặng bao nhiêu nữa.

**Ví dụ giải tay đầy đủ.** \`2x + 3 = 2x + 3\`

Đây là phương trình mà hai vế **giống hệt nhau** — luôn đúng.

\`\`\`
2x + 3 = 2x + 3
2x + 3 − 2x = 2x + 3 − 2x      (trừ 2x cả 2 vế)
3           = 3                 ← đúng với mọi x
\`\`\`

Hoặc:

\`\`\`
2x − 2x = 3 − 3
0·x     = 0                    ← đúng với mọi x
\`\`\`

→ **Vô số nghiệm**, tập nghiệm \`S = ℝ\` (mọi số thực).

**Ví dụ thứ hai.** \`2(x + 1) = 2x + 2\`

\`\`\`
2(x + 1) = 2x + 2
2x + 2   = 2x + 2          (khai triển ngoặc — hai vế giống nhau)
0        = 0               ← luôn đúng
\`\`\`

→ Vô số nghiệm.

### Bảng tổng kết

| Sau khi rút gọn | Trường hợp | Nghiệm | Ví dụ |
|---|---|---|---|
| \`a·x = c\`, \`a ≠ 0\` | Bậc 1 thật sự | \`x = c/a\` (duy nhất) | \`3x = 6\` → \`x = 2\` |
| \`0·x = c\`, \`c ≠ 0\` | Mâu thuẫn | Vô nghiệm \`S = ∅\` | \`2x + 3 = 2x + 5\` |
| \`0·x = 0\` | Tự đúng (identity) | Vô số nghiệm \`S = ℝ\` | \`2x + 3 = 2x + 3\` |

### ❓ Câu hỏi tự nhiên

- *"Khi nào biết phương trình vô nghiệm vs vô số nghiệm?"* — Khi rút gọn xong, **các hạng tử chứa \`x\` triệt tiêu hết** (do hệ số bằng nhau ở 2 vế). Lúc đó:
  - Nếu **hằng số 2 vế bằng nhau** (vd \`3 = 3\`) → vô số nghiệm.
  - Nếu **hằng số 2 vế khác nhau** (vd \`3 = 5\`) → vô nghiệm.
  Nói cách khác: nhìn 2 vế gốc, nếu hệ số của \`x\` giống nhau:
    - Hằng số tự do cũng giống → vô số nghiệm.
    - Hằng số tự do khác → vô nghiệm.
- *"Phương trình vô nghiệm có 'sai' không?"* — Không "sai", chỉ là không có \`x\` nào thoả. Nó vẫn là một phát biểu hợp lệ; câu trả lời là "tập nghiệm rỗng".
- *"Vô số nghiệm có nghĩa là 'mọi số trên thế giới' (kể cả số phức) hay chỉ số thực?"* — Phụ thuộc tập đang xét. Trong chương trình phổ thông, mặc định là \`ℝ\` (mọi số thực). Nếu bài toán giới hạn ẩn ở \`ℕ\` (số tự nhiên), tập nghiệm là \`ℕ\`.
- *"Trong code, làm sao phân biệt 3 trường hợp này?"* — Xem hàm \`solveLinear\` ở Bài 5: nếu \`a ≠ 0\` trả về \`−b/a\`; nếu \`a = 0 ∧ b = 0\` báo "vô số nghiệm"; nếu \`a = 0 ∧ b ≠ 0\` báo "vô nghiệm".

### ⚠ Lỗi thường gặp

- **"Nhận diện sai vô nghiệm/vô số nghiệm":** thấy \`3 = 3\` (hoặc \`0 = 0\`) tưởng là \`x = 3\` (sai). \`3 = 3\` nghĩa là phương trình đã trở thành phát biểu luôn đúng → mọi \`x\` đều thoả, KHÔNG phải \`x = 3\`.
- **"Chia hai vế cho biểu thức chứa \`x\`":** ví dụ \`x² = x\` → chia \`x\` cả 2 vế → \`x = 1\`. Sai! Mất nghiệm \`x = 0\`. Lý do: nếu \`x = 0\` thì đang chia 0, không hợp lệ. Đúng: chuyển vế \`x² − x = 0\` → \`x(x − 1) = 0\` → \`x = 0\` hoặc \`x = 1\`. (Phương trình này là bậc 2, chỉ minh hoạ.) Bài học: không chia cho biểu thức ẩn nếu chưa loại trừ trường hợp nó bằng 0.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Mỗi phương trình sau là nghiệm duy nhất, vô nghiệm, hay vô số nghiệm?

1. \`4x − 1 = 4x + 3\`
2. \`2(x − 3) = 2x − 6\`
3. \`5x + 2 = 17\`

<details>
<summary>Đáp án</summary>

1. Trừ \`4x\` cả 2 vế → \`−1 = 3\` (sai) → **vô nghiệm**.
2. Khai triển vế trái → \`2x − 6 = 2x − 6\` → hai vế giống nhau → **vô số nghiệm**.
3. \`5x = 15\` → \`x = 3\` → **nghiệm duy nhất**.
</details>

### 📋 Tóm tắt Mục 5

- 3 khả năng sau khi rút gọn \`a·x = c\`:
  - \`a ≠ 0\` → nghiệm duy nhất \`x = c/a\`.
  - \`a = 0, c ≠ 0\` → vô nghiệm (mâu thuẫn \`0 = c\`).
  - \`a = 0, c = 0\` → vô số nghiệm (đúng với mọi \`x\`).
- Nhận diện nhanh: triệt tiêu hết \`x\` rồi xem hằng số 2 vế có bằng nhau không.
- Đừng nhầm \`3 = 3\` thành \`x = 3\` — đó là vô số nghiệm.

> **Lưu ý kỹ thuật.** Khi \`a = 0\`, theo định nghĩa Mục 2 thì phương trình không còn là "bậc 1" nữa — nó đã biến thành phương trình bậc 0. Nhưng trong thực hành giải, ta vẫn xử lý chung trong cùng một quy trình.

---

## 6. Bài toán có lời văn → phương trình

Đây là kỹ năng quan trọng nhất của chương này: **dịch tiếng Việt sang ngôn ngữ phương trình**.

### Quy trình 4 bước

1. **Đặt ẩn**: chọn đại lượng chưa biết và đặt tên (thường là \`x\`). Viết rõ đơn vị và điều kiện ràng buộc (vd \`x > 0\` nếu là số lượng).
2. **Diễn dịch điều kiện thành phương trình**: dùng các thông tin trong đề (tổng, hiệu, gấp mấy lần, vận tốc × thời gian, ...) để viết một đẳng thức chứa ẩn.
3. **Giải phương trình**.
4. **Kiểm tra và kết luận**: thay vào đề bài (không chỉ phương trình), kiểm tra điều kiện ràng buộc, trả lời bằng câu văn có đơn vị.

### Ví dụ mẫu 1 — Tổng và hiệu

> *"Tổng hai số là 30, hiệu hai số là 8. Tìm hai số đó."*

**Bước 1 — đặt ẩn.** Gọi số bé là \`x\`. Vì hiệu là 8, số lớn là \`x + 8\`.

**Bước 2 — lập phương trình.** Tổng hai số là 30:

\`\`\`
x + (x + 8) = 30
\`\`\`

**Bước 3 — giải.**

\`\`\`
x + x + 8 = 30
2x + 8    = 30
2x        = 22         (trừ 8 cả 2 vế)
x         = 11         (chia 2 cả 2 vế)
\`\`\`

**Bước 4 — kết luận.** Số bé là \`11\`, số lớn là \`11 + 8 = 19\`. Kiểm tra: \`11 + 19 = 30\` ✓ và \`19 − 11 = 8\` ✓.

### Ví dụ mẫu 2 — Bài toán tuổi (age)

> *"Hiện nay tuổi của An gấp 3 lần tuổi của Bình. Sau 5 năm nữa, tuổi của An chỉ còn gấp 2 lần tuổi của Bình. Hỏi hiện nay An và Bình bao nhiêu tuổi?"*

**Bước 1 — đặt ẩn.** Gọi tuổi Bình hiện nay là \`x\` (\`x > 0\`). Tuổi An hiện nay là \`3x\`.

Sau 5 năm:
- Tuổi Bình: \`x + 5\`.
- Tuổi An: \`3x + 5\`.

**Bước 2 — lập phương trình.** "Sau 5 năm, An gấp 2 lần Bình":

\`\`\`
3x + 5 = 2·(x + 5)
\`\`\`

**Bước 3 — giải.**

\`\`\`
3x + 5 = 2x + 10        (khai triển vế phải)
3x − 2x = 10 − 5         (chuyển vế)
x       = 5
\`\`\`

**Bước 4 — kết luận.** Bình hiện 5 tuổi, An hiện \`3·5 = 15\` tuổi. Kiểm tra: sau 5 năm, Bình 10 tuổi, An 20 tuổi → \`20 = 2·10\` ✓.

### Ví dụ mẫu 3 — Vận tốc, quãng đường, thời gian

> *"Một xe khách đi từ A đến B với vận tốc 50 km/h. Lúc về, xe đi với vận tốc 60 km/h, do đó thời gian về ngắn hơn lúc đi 30 phút. Tính quãng đường AB."*

**Bước 1 — đặt ẩn.** Gọi quãng đường AB là \`x\` km (\`x > 0\`).

- Thời gian đi: \`x/50\` (giờ).
- Thời gian về: \`x/60\` (giờ).
- 30 phút = \`1/2\` giờ.

**Bước 2 — lập phương trình.** "Thời gian về ngắn hơn lúc đi 30 phút" nghĩa là \`t_đi − t_về = 1/2\`:

\`\`\`
x/50 − x/60 = 1/2
\`\`\`

**Bước 3 — giải.** Nhân BCNN(50, 60, 2) = 300 cả 2 vế:

\`\`\`
300·(x/50) − 300·(x/60) = 300·(1/2)
6x − 5x = 150
x       = 150
\`\`\`

**Bước 4 — kết luận.** Quãng đường AB là \`150\` km. Kiểm tra: thời gian đi \`150/50 = 3\` giờ, thời gian về \`150/60 = 2.5\` giờ → chênh \`0.5\` giờ = 30 phút ✓.

### Ví dụ mẫu 4 — Hỗn hợp dung dịch (mixture)

> *"Có 200 ml dung dịch muối nồng độ 10%. Cần thêm bao nhiêu ml nước nguyên chất để được dung dịch nồng độ 4%?"*

**Bước 1 — đặt ẩn.** Gọi lượng nước cần thêm là \`x\` ml (\`x > 0\`).

- Lượng muối ban đầu: \`200 × 10% = 20\` ml (giả sử khối lượng muối quy đổi tương ứng với ml — cho đơn giản, trong thực tế dùng gam).
- Lượng muối **không đổi** khi thêm nước (chỉ pha loãng).
- Thể tích dung dịch sau khi thêm: \`200 + x\` ml.
- Nồng độ mới: \`20 / (200 + x)\`.

**Bước 2 — lập phương trình.** "Nồng độ mới là 4%":

\`\`\`
20 / (200 + x) = 4/100 = 0.04
\`\`\`

**Bước 3 — giải.** Nhân chéo:

\`\`\`
20 = 0.04·(200 + x)
20 = 8 + 0.04x
12 = 0.04x
x  = 12 / 0.04 = 300
\`\`\`

**Bước 4 — kết luận.** Cần thêm \`300\` ml nước. Kiểm tra: dung dịch mới có thể tích \`500\` ml, lượng muối vẫn \`20\` ml → nồng độ \`20/500 = 0.04 = 4%\` ✓.

### Ví dụ mẫu 5 — Mua bán, giá tiền

> *"Một cửa hàng nhập một lô áo, dự định bán với giá 200.000 đồng/cái thì lãi tổng cộng 4.000.000 đồng. Nếu hạ giá xuống 180.000 đồng/cái thì lãi giảm còn 2.500.000 đồng. Hỏi lô áo có bao nhiêu cái và giá nhập mỗi cái là bao nhiêu?"*

**Bước 1 — đặt ẩn.** Gọi số lượng áo trong lô là \`n\` cái (\`n > 0\`, nguyên), giá nhập mỗi cái là \`p\` đồng. (Hai ẩn — sẽ rút về một ẩn.)

Lãi = doanh thu − chi phí:

\`\`\`
Bán 200k mỗi cái:   200000·n − p·n = 4000000   → n·(200000 − p) = 4000000
Bán 180k mỗi cái:   180000·n − p·n = 2500000   → n·(180000 − p) = 2500000
\`\`\`

**Cách dùng 1 ẩn:** lấy hiệu hai phương trình. Khi giá bán giảm 20k mỗi áo, tổng lãi giảm \`4000000 − 2500000 = 1500000\` đồng. Mỗi áo "mất" 20k tiền lãi → số áo:

\`\`\`
n·20000 = 1500000
n        = 75
\`\`\`

Sau khi có \`n = 75\`, thay vào pt đầu: \`75·(200000 − p) = 4000000\` → \`200000 − p = 53333.33...\` → \`p ≈ 146666.67\` đồng.

**Bước 4 — kết luận.** Lô có \`75\` cái áo, giá nhập mỗi cái khoảng \`146.667\` đồng. Kiểm tra: lãi bán 200k = \`75·(200000 − 146666.67) = 75·53333.33 ≈ 4.000.000\` ✓; lãi bán 180k = \`75·(180000 − 146666.67) ≈ 2.500.000\` ✓.

> Lưu ý: bài này dẫn ra một ẩn \`n\` bằng cách lấy hiệu. Trong thực tế các bài word problem nâng cao thường dùng kỹ thuật "khử ẩn" như vậy trước khi áp dụng phương trình bậc 1.

### ❓ Câu hỏi tự nhiên

- *"Tôi có thể đặt số lớn là \`x\` thay vì số bé không?"* — Có. Khi đó số bé là \`x − 8\`, phương trình \`x + (x − 8) = 30\` → \`x = 19\`. Cùng kết quả, chỉ khác cách dán nhãn.
- *"Có thể đặt 2 ẩn \`x\` (số bé) và \`y\` (số lớn) không?"* — Có, và đó là **hệ phương trình** — sẽ học ở bài sau. Ở đây ta luôn cố gắng dùng **một ẩn** bằng cách tận dụng quan hệ giữa các đại lượng.
- *"Sao phải kiểm tra điều kiện cuối cùng?"* — Vì nghiệm phương trình toán học có thể không phù hợp với ràng buộc thực tế. Ví dụ "số áo" phải là số nguyên dương; nếu giải ra \`n = 75.5\` thì có lỗi đâu đó trong đề/cách đặt ẩn. Hoặc bài tuổi, nếu ra \`x = −3\` (tuổi âm) → loại.
- *"Khi nào nên đặt ẩn là 'cái mình muốn tìm', khi nào đặt 'cái dễ biểu diễn quan hệ'?"* — Hai chiến lược đều dùng được. Khi đại lượng cần tìm khó biểu diễn các đại lượng khác trực tiếp, đặt ẩn cho đại lượng trung gian, rồi tính ngược lại. Quan trọng: ghi rõ "x là gì" trước khi giải.

### ⚠ Lỗi thường gặp

- **Không định nghĩa rõ ẩn:** viết "gọi x" mà không nói "x là gì, đơn vị gì". Hậu quả: cuối bài không biết trả lời cái gì.
- **Đổi đơn vị sai:** bài vận tốc dùng phút và giờ lẫn lộn. Phải thống nhất đơn vị trước khi lập phương trình (vd đổi tất cả về giờ, hoặc tất cả về phút).
- **Dịch sai ngôn ngữ:** "A nhiều hơn B 5" → \`A = B + 5\`, KHÔNG phải \`A + 5 = B\`. "Gấp 3 lần" → \`A = 3B\`, KHÔNG phải \`B = 3A\`. Đọc kỹ chủ ngữ - vị ngữ.
- **Quên kiểm tra:** giải xong, không thay vào đề gốc → bỏ sót lỗi.

### 🔁 Dừng lại tự kiểm tra

**Hỏi:** Hiện nay mẹ 30 tuổi, con 6 tuổi. Hỏi sau bao nhiêu năm nữa tuổi mẹ gấp 3 lần tuổi con?

<details>
<summary>Đáp án</summary>

**Đặt ẩn:** \`x\` là số năm cần tìm (\`x ≥ 0\`).

Sau \`x\` năm: mẹ \`30 + x\` tuổi, con \`6 + x\` tuổi.

**Phương trình:** "Mẹ gấp 3 lần con" → \`30 + x = 3·(6 + x)\`.

**Giải:**
\`\`\`
30 + x = 18 + 3x
30 − 18 = 3x − x
12      = 2x
x       = 6
\`\`\`

**Kết luận:** Sau \`6\` năm. Kiểm tra: mẹ 36, con 12 → \`36 = 3·12\` ✓.
</details>

### 📋 Tóm tắt Mục 6

- Quy trình 4 bước: đặt ẩn → lập phương trình → giải → kiểm tra & kết luận.
- Đã giải 5 dạng word problem chính: tổng/hiệu, tuổi, vận tốc–quãng đường, hỗn hợp dung dịch, mua bán.
- Luôn ghi rõ "x là gì" với đơn vị; thống nhất đơn vị trước khi lập phương trình.
- Kiểm tra cuối bằng cách thay vào **đề gốc**, không chỉ phương trình.

---

## 7. Liên hệ Machine Learning — vì sao linear regression có lời giải "1 phát ra ngay"?

Trong ML, ta thường có một **hàm mất mát (loss function)** \`L(w)\` đo độ sai khi mô hình dùng trọng số \`w\`. Mục tiêu: tìm \`w*\` sao cho \`L(w*)\` nhỏ nhất.

Nguyên lý từ giải tích: tại điểm cực tiểu, **đạo hàm bằng 0**:

\`\`\`
L'(w*) = 0      ← một phương trình theo w
\`\`\`

**Trường hợp đặc biệt — loss là hàm bậc 2** (như Mean Squared Error trong linear regression):

\`\`\`
L(w) = a·w² + b·w + c        (a > 0)
L'(w) = 2a·w + b              (đạo hàm là biểu thức BẬC 1 theo w)
\`\`\`

Đặt đạo hàm bằng 0:

\`\`\`
2a·w + b = 0       ← chính là phương trình bậc 1 dạng chuẩn của Mục 2!
w = −b / (2a)      ← nghiệm closed-form
\`\`\`

### 7.1 Walk-through cụ thể — Linear regression 1 chiều, 3 điểm dữ liệu

Đây là phần quan trọng nhất: thấy "giải phương trình bậc 1" xuất hiện trong ML.

**Bài toán.** Có 3 điểm dữ liệu \`(x_i, y_i)\`:

| \`i\` | \`x_i\` | \`y_i\` |
|---|---|---|
| 1 | 1 | 2 |
| 2 | 2 | 3 |
| 3 | 3 | 5 |

Ta muốn tìm đường thẳng \`y = a·x\` (qua gốc, không có hệ số tự do — chọn dạng đơn giản nhất để chỉ có 1 tham số \`a\`) **fit** ba điểm này tốt nhất theo nghĩa **bình phương sai số nhỏ nhất (MSE)**.

**Bước 1 — định nghĩa loss.**

\`\`\`
L(a) = (a·1 − 2)² + (a·2 − 3)² + (a·3 − 5)²
     = (a − 2)² + (2a − 3)² + (3a − 5)²
\`\`\`

**Bước 2 — khai triển từng hạng tử.**

\`\`\`
(a − 2)²   = a² − 4a + 4
(2a − 3)²  = 4a² − 12a + 9
(3a − 5)²  = 9a² − 30a + 25
\`\`\`

Cộng lại:

\`\`\`
L(a) = (1 + 4 + 9)·a² + (−4 − 12 − 30)·a + (4 + 9 + 25)
     = 14·a² − 46·a + 38
\`\`\`

**Đây là hàm bậc 2 theo \`a\`** (parabola hướng lên vì hệ số \`a²\` là \`14 > 0\`).

**Bước 3 — lấy đạo hàm theo \`a\`.**

\`\`\`
L'(a) = 28·a − 46
\`\`\`

**Đây là biểu thức BẬC 1 theo \`a\`** — chính là dạng \`α·a + β\` với \`α = 28, β = −46\`.

**Bước 4 — đặt đạo hàm bằng 0, giải phương trình bậc 1.**

\`\`\`
28·a − 46 = 0
28·a       = 46           (chuyển vế)
a          = 46 / 28
a          = 23 / 14
a          ≈ 1.643
\`\`\`

**Bước 5 — kiểm tra (tính loss tại đáp số).**

\`\`\`
L(23/14) = 14·(23/14)² − 46·(23/14) + 38
         = 14·(529/196) − (46·23)/14 + 38
         = 529/14 − 1058/14 + 38
         = −529/14 + 38
         = (−529 + 532)/14
         = 3/14 ≈ 0.214
\`\`\`

So với chọn \`a = 1.5\` (gần đó): \`L(1.5) = 14·2.25 − 46·1.5 + 38 = 31.5 − 69 + 38 = 0.5\`. Lớn hơn \`0.214\` → xác nhận \`a ≈ 1.643\` đúng là cực tiểu.

**Kết luận.** Đường thẳng fit tốt nhất là \`y = 1.643·x\`. Quá trình:

\`\`\`
3 điểm dữ liệu
  → định nghĩa loss MSE (hàm bậc 2 theo a)
  → lấy đạo hàm theo a (ra biểu thức bậc 1)
  → đặt = 0 (ra phương trình bậc 1)
  → giải bằng quy tắc cân (Mục 3-4)
  → nghiệm closed-form
\`\`\`

→ **Toàn bộ kỹ thuật của Mục 3-4 ở trên** (quy tắc cân, chuyển vế) chính là công cụ dùng trong bước cuối cùng để giải ra \`a\`. Bạn vừa làm ML mà không biết :).

### 7.2 Hệ quả thực tế — Normal Equation

Mở rộng cho linear regression nhiều chiều (\`y = w_0 + w_1·x_1 + w_2·x_2 + ...\`), nghiệm closed-form là:

\`\`\`
w* = (XᵀX)⁻¹ Xᵀy        (Normal Equation)
\`\`\`

Không cần lặp gradient descent — giải 1 lần ra nghiệm chính xác (về mặt toán). Đây đúng là "giải phương trình bậc 1" ở quy mô vector/ma trận (sẽ học trong các tầng sau).

> **Trực giác.** Khi loss là **parabola hướng lên**, đáy của nó là điểm có tiếp tuyến nằm ngang (slope = 0). Tiếp tuyến của parabola là đường thẳng → công thức tiếp tuyến = 0 là phương trình bậc 1 → giải được ngay.
>
> Khi loss **không phải bậc 2** (vd neural network), đạo hàm không còn là phương trình bậc 1, nói chung không có closed-form → phải dùng gradient descent.

### 📋 Tóm tắt Mục 7

- Loss MSE là hàm bậc 2 theo tham số → đạo hàm là biểu thức bậc 1 → đặt = 0 ra phương trình bậc 1.
- Đã walk-through cụ thể với 3 điểm dữ liệu: \`(1,2), (2,3), (3,5)\` → đường fit \`y = (23/14)·x\`.
- Quy tắc cân/chuyển vế bạn vừa học là công cụ giải bước cuối cùng.
- Mở rộng vector/ma trận: Normal Equation \`w* = (XᵀX)⁻¹ Xᵀy\`.

---

## 8. Bài tập

> Sau mỗi bài tự thử trước khi xem phần "Lời giải chi tiết" bên dưới.

**Bài 1.** Giải phương trình: \`5x − 7 = 2x + 8\`.

**Bài 2.** Giải phương trình: \`(x + 2)/3 − (x − 1)/4 = 2\`.

**Bài 3.** Giải phương trình: \`2(3x − 1) − 3(x + 2) = 4(x − 1)\`.

**Bài 4 (word problem).** Hai số có tổng là 50. Số lớn gấp 4 lần số nhỏ. Tìm hai số.

**Bài 5 (code Go).** Viết hàm \`solveLinear(a, b float64) (float64, error)\` giải phương trình \`a·x + b = 0\`. Yêu cầu:
- Nếu \`a ≠ 0\`, trả về \`(−b/a, nil)\`.
- Nếu \`a = 0, b = 0\`, trả về error \`"vô số nghiệm"\`.
- Nếu \`a = 0, b ≠ 0\`, trả về error \`"vô nghiệm"\`.

---

## 9. Lời giải chi tiết

### Bài 1 — \`5x − 7 = 2x + 8\`

**Cách tiếp cận:** dồn ẩn về vế trái, hằng số về vế phải.

\`\`\`
5x − 7 = 2x + 8
5x − 2x = 8 + 7         (chuyển 2x sang trái → −2x; chuyển −7 sang phải → +7)
3x      = 15
x       = 5             (chia 3 cả 2 vế)
\`\`\`

**Kiểm tra:** VT \`5·5 − 7 = 18\`, VP \`2·5 + 8 = 18\` ✓.

**Đáp số:** \`x = 5\`.

### Bài 2 — \`(x + 2)/3 − (x − 1)/4 = 2\`

**Cách tiếp cận:** khử mẫu bằng cách nhân BCNN(3, 4) = 12 vào cả 2 vế, rồi giải như phương trình không phân số.

\`\`\`
(x + 2)/3 − (x − 1)/4 = 2
12·(x + 2)/3 − 12·(x − 1)/4 = 12·2     (nhân 12 cả 2 vế)
4(x + 2) − 3(x − 1) = 24
4x + 8 − 3x + 3     = 24                (khai triển ngoặc; cẩn thận dấu trừ phân phối: −3·(−1) = +3)
x + 11              = 24
x                   = 13                (trừ 11 cả 2 vế)
\`\`\`

**Kiểm tra:** \`(13 + 2)/3 − (13 − 1)/4 = 15/3 − 12/4 = 5 − 3 = 2\` ✓.

**Đáp số:** \`x = 13\`.

> **Bẫy thường gặp:** quên đổi dấu khi phân phối dấu trừ vào ngoặc \`−3(x − 1)\`. Đúng là \`−3x + 3\`, không phải \`−3x − 3\`.

### Bài 3 — \`2(3x − 1) − 3(x + 2) = 4(x − 1)\`

**Bước 1 — khai triển ngoặc cả 2 vế:**

\`\`\`
2(3x − 1) − 3(x + 2) = 4(x − 1)
6x − 2 − 3x − 6      = 4x − 4
\`\`\`

**Bước 2 — rút gọn vế trái:**

\`\`\`
3x − 8 = 4x − 4
\`\`\`

**Bước 3 — chuyển vế và giải:**

\`\`\`
3x − 4x = −4 + 8
−x      = 4
x       = −4         (nhân −1 cả 2 vế, tương đương đổi dấu)
\`\`\`

**Kiểm tra:** VT \`2(3·(−4) − 1) − 3(−4 + 2) = 2·(−13) − 3·(−2) = −26 + 6 = −20\`, VP \`4(−4 − 1) = −20\` ✓.

**Đáp số:** \`x = −4\`.

### Bài 4 — Word problem

**Bước 1 — đặt ẩn.** Gọi số nhỏ là \`x\` (\`x > 0\`). Theo đề, số lớn gấp 4 lần số nhỏ → số lớn là \`4x\`.

**Bước 2 — lập phương trình.** Tổng hai số là 50:

\`\`\`
x + 4x = 50
\`\`\`

**Bước 3 — giải.**

\`\`\`
5x = 50
x  = 10
\`\`\`

**Bước 4 — kết luận.** Số nhỏ là \`10\`, số lớn là \`4·10 = 40\`. Kiểm tra: \`10 + 40 = 50\` ✓ và \`40 = 4·10\` ✓.

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
- Trong \`a == 0\`, tiếp tục phân biệt \`b == 0\` (vô số nghiệm) và \`b ≠ 0\` (vô nghiệm) — đúng theo Mục 5.
- Trường hợp thường: \`x = −b/a\`.

**Độ phức tạp:** \`O(1)\` thời gian, \`O(1)\` bộ nhớ — chỉ vài phép toán cơ bản.

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
