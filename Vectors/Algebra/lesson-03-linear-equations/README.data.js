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

**Biểu thức** là một dãy phép toán có thể chứa số, biến, dấu cộng/trừ/nhân/chia… nhưng **không có dấu bằng (\`=\`)**. Ví dụ:

\`\`\`
2x + 3      (biểu thức)
x² − 5x + 6 (biểu thức)
3(a + b)    (biểu thức)
\`\`\`

Biểu thức chỉ có thể được **rút gọn** hoặc **tính giá trị** khi biết giá trị của biến. Không có khái niệm "giải" biểu thức.

**Phương trình** là **mệnh đề khẳng định hai biểu thức bằng nhau**, trong đó có ít nhất một **ẩn (unknown)** — một biến mà ta muốn tìm giá trị. Phương trình luôn có dấu \`=\`:

\`\`\`
2x + 3 = 7        (phương trình, ẩn x)
x − 5 = 10        (phương trình, ẩn x)
3y + 1 = y + 9    (phương trình, ẩn y)
\`\`\`

> **Trực giác.** Biểu thức giống như một "cụm danh từ" — \`cái bàn 3 chân\`. Phương trình là một "câu" — \`cái bàn 3 chân nặng 5 kg\` — có thể đúng hoặc sai tùy giá trị của ẩn.

**Nghiệm (solution / root)** của phương trình là giá trị của ẩn làm cho câu này đúng. Với \`2x + 3 = 7\`, nghiệm là \`x = 2\` vì \`2·2 + 3 = 7\`. Thử \`x = 1\`: \`2·1 + 3 = 5 ≠ 7\` → không phải nghiệm.

**"Giải phương trình"** = tìm tất cả các nghiệm.

### Câu hỏi tự nhiên bạn nên đặt ra ở đây

- *"Phương trình có luôn có nghiệm không?"* — Không. Có những phương trình không tồn tại giá trị nào của ẩn thoả mãn (xem Mục 5).
- *"Có thể có nhiều nghiệm không?"* — Có thể. Phương trình bậc 1 thì tối đa 1 nghiệm (hoặc 0, hoặc vô số), nhưng \`x² = 4\` có 2 nghiệm \`x = 2\` và \`x = −2\`.

---

## 2. Phương trình bậc 1 một ẩn — dạng chuẩn \`ax + b = 0\`

**Định nghĩa.** Phương trình bậc 1 (linear equation) một ẩn là phương trình có thể đưa về dạng:

\`\`\`
a·x + b = 0    với a, b là hằng số và a ≠ 0
\`\`\`

Điều kiện \`a ≠ 0\` rất quan trọng: nếu \`a = 0\` thì biến mất ẩn, không còn là phương trình bậc 1 nữa (xem Mục 5).

**Nghiệm duy nhất** của dạng chuẩn:

\`\`\`
a·x + b = 0
⇔ a·x = −b
⇔ x = −b / a
\`\`\`

### Ví dụ giải tay 3 phương trình

**Ví dụ 1 — đơn giản:** \`2x + 3 = 7\`

\`\`\`
2x + 3 = 7
2x     = 7 − 3        (trừ 3 cả 2 vế)
2x     = 4
x      = 4 / 2        (chia 2 cả 2 vế)
x      = 2
\`\`\`

Kiểm tra: \`2·2 + 3 = 4 + 3 = 7\` ✓

**Ví dụ 2 — có ngoặc:** \`3(x − 1) + 5 = 2x + 6\`

\`\`\`
3(x − 1) + 5 = 2x + 6
3x − 3 + 5   = 2x + 6     (khai triển ngoặc)
3x + 2       = 2x + 6     (rút gọn vế trái)
3x − 2x      = 6 − 2       (chuyển vế: 2x sang trái, 2 sang phải, đổi dấu)
x            = 4
\`\`\`

Kiểm tra: VT = \`3(4 − 1) + 5 = 9 + 5 = 14\`, VP = \`2·4 + 6 = 14\` ✓

**Ví dụ 3 — có phân số:** \`x/2 + 1/3 = 5/6\`

Mẹo: nhân cả 2 vế với **bội chung nhỏ nhất (BCNN)** của các mẫu (\`2, 3, 6\` → BCNN = 6) để khử phân số.

\`\`\`
x/2 + 1/3 = 5/6
6·(x/2) + 6·(1/3) = 6·(5/6)    (nhân 6 cả 2 vế)
3x + 2 = 5
3x     = 3
x      = 1
\`\`\`

Kiểm tra: \`1/2 + 1/3 = 3/6 + 2/6 = 5/6\` ✓

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

### Trực giác: cân thăng bằng (balance scale)

Tưởng tượng phương trình là một **cái cân hai đĩa**. Vế trái = đĩa trái, vế phải = đĩa phải. Phương trình \`2x + 3 = 7\` nghĩa là **đĩa trái đang nặng đúng bằng đĩa phải**.

Để cân vẫn thăng bằng, mọi thao tác phải **làm đồng thời cho cả hai đĩa**:

- Nếu bỏ 3 kg ra khỏi đĩa trái → phải bỏ 3 kg ra khỏi đĩa phải.
- Nếu chia đôi đĩa trái (giảm còn một nửa) → phải chia đôi đĩa phải.

Đây chính là lý do toán học của Quy tắc 1 & 2. Nếu bạn chỉ làm với một đĩa, cân sẽ lệch — phương trình mới **không còn tương đương** với phương trình gốc.

\`\`\`
Trước:                   Sau khi "trừ 3" 2 vế:
   2x + 3   |   7              2x   |   4
   ━━━━━━━━━△━━━━━━━━━         ━━━━━△━━━━━
            ▲                       ▲
        thăng bằng             vẫn thăng bằng
\`\`\`

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
3x + 5 − 5 = 17 − 5     (trừ 5 cả 2 vế)
3x         = 12
3x / 3     = 12 / 3     (chia 3 cả 2 vế)
x          = 4
\`\`\`

**Hai cách là một** — chuyển vế chỉ là viết tắt. Nhưng quy tắc biến đổi rõ hơn ở chỗ: thấy ngay cân vẫn thăng bằng vì ta làm thao tác cho cả 2 đĩa.

---

## 5. Ba trường hợp nghiệm của phương trình bậc 1

Sau khi đưa về dạng \`a·x = c\` (đem hết ẩn về một vế, hằng số về vế kia), có **đúng 3 khả năng**:

### 5.1 Nghiệm duy nhất — \`a ≠ 0\`

Trường hợp thường gặp: \`a·x = c\` với \`a ≠ 0\` cho duy nhất một nghiệm \`x = c / a\`.

Ví dụ \`5x = 20\` → \`x = 4\`. Chỉ một giá trị thoả mãn.

### 5.2 Vô nghiệm — \`a = 0, c ≠ 0\`

Khi rút gọn xong còn lại \`0·x = c\` với \`c ≠ 0\`. Vế trái luôn bằng 0 bất kể \`x\` là gì, nhưng vế phải khác 0 → **không có giá trị nào của \`x\` làm hai vế bằng nhau**.

**Ví dụ.** \`2x + 3 = 2x + 5\`

\`\`\`
2x + 3 = 2x + 5
2x − 2x = 5 − 3
0·x     = 2          ← vô lý
\`\`\`

Phương trình **vô nghiệm**, ký hiệu tập nghiệm \`S = ∅\`.

### 5.3 Vô số nghiệm — \`a = 0, c = 0\`

Khi rút gọn xong còn lại \`0·x = 0\`. Mọi giá trị của \`x\` đều thoả mãn (vì cả 2 vế đều bằng 0 với bất kỳ \`x\`).

**Ví dụ.** \`2x + 3 = 2x + 3\` hoặc \`2(x + 1) = 2x + 2\`

\`\`\`
2x + 3 = 2x + 3
0·x    = 0           ← đúng với mọi x
\`\`\`

Phương trình có **vô số nghiệm**, tập nghiệm \`S = ℝ\` (mọi số thực).

### Bảng tổng kết

| Sau khi rút gọn | Trường hợp | Nghiệm | Ví dụ |
|---|---|---|---|
| \`a·x = c\`, \`a ≠ 0\` | Bậc 1 thật sự | \`x = c/a\` (duy nhất) | \`3x = 6\` → \`x = 2\` |
| \`0·x = c\`, \`c ≠ 0\` | Mâu thuẫn | Vô nghiệm | \`0·x = 5\` |
| \`0·x = 0\` | Tự đúng (identity) | Vô số nghiệm | \`0·x = 0\` |

> **Lưu ý kỹ thuật.** Khi \`a = 0\`, theo định nghĩa Mục 2 thì phương trình không còn là "bậc 1" nữa — nó đã biến thành phương trình bậc 0. Nhưng trong thực hành giải, ta vẫn xử lý chung trong cùng một quy trình.

---

## 6. Bài toán có lời văn → phương trình

Đây là kỹ năng quan trọng nhất của chương này: **dịch tiếng Việt sang ngôn ngữ phương trình**.

### Quy trình 3 bước

1. **Đặt ẩn**: chọn đại lượng chưa biết và đặt tên (thường là \`x\`). Viết rõ đơn vị và điều kiện ràng buộc (vd \`x > 0\` nếu là số lượng).
2. **Lập phương trình**: dùng điều kiện đề bài để viết ra một đẳng thức chứa ẩn.
3. **Giải và kết luận**: giải phương trình, kiểm tra điều kiện, trả lời bằng câu văn.

### Ví dụ mẫu — Tổng và hiệu

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

**Kết luận.** Số bé là \`11\`, số lớn là \`11 + 8 = 19\`. Kiểm tra: \`11 + 19 = 30\` ✓ và \`19 − 11 = 8\` ✓.

### Câu hỏi tự nhiên

- *"Tôi có thể đặt số lớn là \`x\` thay vì số bé không?"* Có. Khi đó số bé là \`x − 8\`, phương trình \`x + (x − 8) = 30\` → \`x = 19\`. Cùng kết quả, chỉ khác cách dán nhãn.
- *"Có thể đặt 2 ẩn \`x\` (số bé) và \`y\` (số lớn) không?"* Có, và đó là **hệ phương trình** — sẽ học ở bài sau. Ở đây ta luôn cố gắng dùng **một ẩn** bằng cách tận dụng quan hệ giữa các đại lượng.

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

**Hệ quả thực tế.** Linear regression với loss MSE có **lời giải đóng (closed-form solution)**:

\`\`\`
w* = (XᵀX)⁻¹ Xᵀy        (Normal Equation)
\`\`\`

Không cần lặp gradient descent — giải 1 lần ra nghiệm chính xác (về mặt toán). Đây đúng là "giải phương trình bậc 1" ở quy mô vector/ma trận (sẽ học trong các tầng sau).

> **Trực giác.** Khi loss là **parabola hướng lên**, đáy của nó là điểm có tiếp tuyến nằm ngang (slope = 0). Tiếp tuyến của parabola là đường thẳng → công thức tiếp tuyến = 0 là phương trình bậc 1 → giải được ngay.
>
> Khi loss **không phải bậc 2** (vd neural network), đạo hàm không còn là phương trình bậc 1, nói chung không có closed-form → phải dùng gradient descent.

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
