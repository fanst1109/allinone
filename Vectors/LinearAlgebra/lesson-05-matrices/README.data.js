// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/LinearAlgebra/lesson-05-matrices/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Ma trận: phép toán

> Tầng 4 · Linear Algebra · Lesson 05

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **ma trận (matrix)** là gì, ký hiệu, cấp \`m×n\`, và phân biệt được các loại ma trận đặc biệt (vuông, đơn vị, không).
- Thực hiện thành thạo **cộng ma trận** và **nhân với scalar**, biết khi nào hai ma trận cộng được.
- Thực hiện được **nhân ma trận (matrix multiplication)** — phép toán cốt lõi của đại số tuyến tính — và biết quy tắc "hàng × cột".
- Hiểu vì sao nhân ma trận **không giao hoán** (\`AB ≠ BA\`), và biết kiểm tra cụ thể bằng phản ví dụ.
- Biết **transpose** \`Aᵀ\`, **ma trận đơn vị** \`I\`, và **ma trận nghịch đảo** \`A⁻¹\` cho ma trận \`2×2\`.
- Giải được hệ \`Ax = b\` bằng \`x = A⁻¹·b\` cho ma trận \`2×2\` không suy biến.
- Tính được **định thức (determinant)** \`2×2\` và biết nó liên quan thế nào tới tồn tại nghịch đảo (sẽ học sâu hơn ở Lesson 06).
- Hiểu vì sao **một layer của Neural Network** thực chất là \`y = Wx + b\` — một phép nhân ma trận với vector cộng bias.

## Kiến thức tiền đề

- [Lesson 01 — Vector](../lesson-01-vectors/) — vì ma trận có thể nhìn như "tập các vector hàng" hoặc "tập các vector cột", và nhân ma trận = tập các dot product.
- [Algebra · Lesson 08 — Hệ phương trình tuyến tính](../../Algebra/lesson-08-linear-systems/) — vì ma trận là cách viết gọn của hệ \`Ax = b\`, và phép nhân ma trận thực chất bắt nguồn từ việc "ghép" 2 phép biến đổi tuyến tính liên tiếp.

---

## 1. Ma trận là gì?

### 1.1 Trực giác trước — "bảng số có quy luật"

Một **ma trận** đơn giản là **bảng số hình chữ nhật**. Bạn từng thấy nó hàng ngày mà có thể không gọi đúng tên:

- Bảng điểm: hàng = học sinh, cột = môn học, ô = điểm.
- Ảnh xám: hàng × cột = pixel, giá trị ô = độ sáng \`0..255\`.
- Bảng giá vé: hàng = loại vé (vip/thường), cột = ngày trong tuần, ô = giá.
- Bảng cự ly giữa các thành phố: hàng = thành phố A, cột = thành phố B, ô = khoảng cách.

> **💡 Trực giác**: vector là một **danh sách số** (một chiều). Ma trận là **bảng số** (hai chiều). Mỗi hàng của ma trận tự thân là một vector; mỗi cột cũng là một vector. Vì thế ma trận là "tập có tổ chức của các vector".

Cái khác bảng tính Excel ở chỗ: ma trận có **các phép toán đại số được định nghĩa rõ ràng** (cộng, nhân, nghịch đảo...) để ta có thể tính toán trên cả bảng cùng lúc, không phải cell-by-cell.

### 1.2 Định nghĩa hình thức

Ma trận \`A\` cấp \`m × n\` là một bảng có \`m\` **hàng** và \`n\` **cột**, gồm \`m·n\` số (gọi là **phần tử** — entry):

\`\`\`
        cột 1   cột 2   ...   cột n
hàng 1 [ a₁₁    a₁₂    ...   a₁ₙ  ]
hàng 2 [ a₂₁    a₂₂    ...   a₂ₙ  ]
  ...  [  ...                 ... ]
hàng m [ aₘ₁    aₘ₂    ...   aₘₙ  ]
\`\`\`

Quy ước ký hiệu:

- **Ma trận** viết hoa: \`A, B, C, M, W, ...\`
- **Phần tử**: \`a_ij\` (hoặc \`A[i][j]\`, \`A_{i,j}\`) — chỉ số thứ nhất là **hàng**, chỉ số thứ hai là **cột**. Hãy nhớ: **"row before column"** (RC — luôn nói hàng trước).
- **Cấp/kích thước**: \`m × n\` đọc là "m hàng n cột". Tổng số phần tử = \`m · n\`.
- Khi cần nhấn mạnh kích thước, ta viết \`A ∈ ℝ^{m×n}\` (A thuộc tập các ma trận thực m hàng n cột).

> **⚠ Lỗi thường gặp**: nhầm thứ tự chỉ số. \`a_23\` là phần tử ở **hàng 2, cột 3**, KHÔNG phải hàng 3 cột 2. Nguyên tắc: chữ số đầu là hàng, vì khi viết bảng ta đi từ trên xuống trước.

### 1.3 Bốn ví dụ cụ thể

**Ví dụ 1.** Ma trận \`2 × 3\` (2 hàng 3 cột):

\`\`\`
A = [ 1   2   3 ]
    [ 4   5   6 ]
\`\`\`

Cấp: \`2 × 3\`. \`a_11 = 1\`, \`a_12 = 2\`, \`a_13 = 3\`, \`a_21 = 4\`, \`a_22 = 5\`, \`a_23 = 6\`. Tổng 6 phần tử.

**Ví dụ 2.** Ma trận \`3 × 2\` (3 hàng 2 cột — **không phải** cùng cấp với ví dụ 1, dù cùng 6 phần tử):

\`\`\`
B = [  7   8 ]
    [  9  10 ]
    [ 11  12 ]
\`\`\`

\`b_31 = 11\` (hàng 3 cột 1). \`b_22 = 10\`.

**Ví dụ 3.** Ma trận **vuông** \`3 × 3\`:

\`\`\`
C = [ 2   0   1 ]
    [ 1   3   0 ]
    [ 0   2   4 ]
\`\`\`

Vuông vì \`m = n = 3\`. Ma trận vuông có nhiều tính chất đặc biệt — chỉ ma trận vuông mới có khái niệm "định thức", "nghịch đảo", "eigenvalue" (sẽ học dần).

**Ví dụ 4.** Ma trận **vector cột** \`3 × 1\` (một cột, ba hàng):

\`\`\`
v = [ 1 ]
    [ 2 ]
    [ 3 ]
\`\`\`

Một vector cột là một trường hợp riêng của ma trận. Tương tự, **vector hàng** \`1 × 3\` là \`[1  2  3]\`. Khi viết \`Ax = b\`, mặc định \`x\` và \`b\` là **vector cột**.

### 1.4 Các ma trận đặc biệt

**(a) Ma trận vuông (square matrix).** Số hàng = số cột. Đường chéo chính là tập các phần tử \`a_11, a_22, ..., a_nn\`.

**(b) Ma trận không (zero matrix), ký hiệu \`0\` hoặc \`O\`.** Mọi phần tử bằng 0. Có thể có nhiều cấp:

\`\`\`
0_{2×3} = [ 0  0  0 ]      0_{3×3} = [ 0  0  0 ]
          [ 0  0  0 ]                [ 0  0  0 ]
                                     [ 0  0  0 ]
\`\`\`

Vai trò giống số \`0\` trong số học: \`A + 0 = A\`, \`0 · A = 0\`.

**(c) Ma trận đơn vị (identity matrix), ký hiệu \`I\` hoặc \`Iₙ\`.** Ma trận **vuông**, đường chéo chính toàn 1, các vị trí khác toàn 0. Công thức:

\`\`\`
I_ij = 1 nếu i = j
I_ij = 0 nếu i ≠ j
\`\`\`

\`\`\`
I₂ = [ 1  0 ]      I₃ = [ 1  0  0 ]      I₄ = [ 1 0 0 0 ]
     [ 0  1 ]           [ 0  1  0 ]           [ 0 1 0 0 ]
                        [ 0  0  1 ]           [ 0 0 1 0 ]
                                              [ 0 0 0 1 ]
\`\`\`

Vai trò giống số \`1\`: \`I·A = A·I = A\` (sẽ chứng minh ở Mục 8).

**(d) Ma trận đường chéo (diagonal matrix).** Vuông, mọi phần tử ngoài đường chéo chính = 0. Ví dụ:

\`\`\`
D = [ 5   0   0 ]
    [ 0  -2   0 ]
    [ 0   0   7 ]
\`\`\`

**(e) Ma trận tam giác trên / dưới (upper/lower triangular).** Mọi phần tử bên dưới đường chéo = 0 (tam giác trên) hoặc bên trên = 0 (tam giác dưới). Ví dụ tam giác trên:

\`\`\`
U = [ 1   2   3 ]
    [ 0   4   5 ]
    [ 0   0   6 ]
\`\`\`

> **❓ Câu hỏi tự nhiên**: *"Tại sao phải đặt tên cho từng loại ma trận đặc biệt? Có gì hay?"*
>
> Vì mỗi loại có tính toán **rẻ hơn rất nhiều**:
> - Nhân với ma trận đơn vị \`I\` = không làm gì (miễn phí).
> - Nhân với ma trận đường chéo = chỉ scale từng chiều, độ phức tạp \`O(n)\` thay vì \`O(n³)\`.
> - Giải hệ với ma trận tam giác = "back-substitution", \`O(n²)\` thay vì \`O(n³)\`.
>
> Đó là lý do mọi thuật toán đại số tuyến tính (LU, QR, Cholesky, SVD...) đều cố gắng **phân rã ma trận tổng quát thành tích các ma trận đặc biệt** rồi xử lý từng phần một.

### 1.5 Khi nào hai ma trận "bằng nhau"?

Hai ma trận \`A\` và \`B\` được gọi là **bằng nhau** nếu:

1. Chúng có **cùng cấp** (cùng \`m × n\`), VÀ
2. Mọi phần tử tương ứng bằng nhau: \`a_ij = b_ij\` với mọi \`i, j\`.

Ví dụ:

\`\`\`
[ 1  2 ] = [ 1  2 ]   ✓
[ 3  4 ]   [ 3  4 ]

[ 1  2 ] ≠ [ 1  2  0 ]  (khác cấp)
[ 3  4 ]   [ 3  4  0 ]

[ 1  2 ] ≠ [ 1  2 ]   (khác phần tử)
[ 3  4 ]   [ 3  5 ]
\`\`\`

> **🔁 Dừng lại tự kiểm tra**: Một ma trận có **3 hàng và 5 cột** có cấp bao nhiêu? Phần tử \`a_34\` ở vị trí nào?
>
> <details><summary>Đáp án</summary>
>
> Cấp \`3 × 5\`. \`a_34\` ở **hàng 3, cột 4**. Vì hàng có 3 (tối đa \`i ∈ {1,2,3}\`) và cột có 5 (\`j ∈ {1,2,3,4,5}\`), vị trí này tồn tại.
> </details>

### 📝 Tóm tắt Mục 1

- Ma trận = bảng số \`m × n\`. \`m\` = hàng, \`n\` = cột. Phần tử \`a_ij\`: hàng \`i\`, cột \`j\`.
- Loại đặc biệt: vuông (m=n), đơn vị I (chéo 1 ngoài 0), không O, đường chéo, tam giác.
- Hai ma trận bằng nhau ⇔ cùng cấp VÀ mọi phần tử tương ứng bằng nhau.
- Vector là trường hợp riêng của ma trận (\`n × 1\` hoặc \`1 × n\`).

---

## 2. Phép cộng ma trận

### 2.1 Trực giác

Cộng hai bảng cùng cấp = **cộng từng ô tương ứng**. Như khi bạn cộng điểm thi giữa kỳ và cuối kỳ của một lớp: hai bảng cùng kích thước, mỗi học sinh được cộng điểm của chính mình.

### 2.2 Định nghĩa

Cho \`A\` và \`B\` **cùng cấp** \`m × n\`. Tổng \`C = A + B\` cũng có cấp \`m × n\`, với:

\`\`\`
c_ij = a_ij + b_ij      (với mọi i, j)
\`\`\`

**Điều kiện bắt buộc**: hai ma trận phải **cùng cấp**. Khác cấp → không cộng được, không có định nghĩa.

### 2.3 Bốn ví dụ

**Ví dụ 1 — \`2 × 2\`:**

\`\`\`
A = [ 1  2 ]    B = [ 5  6 ]
    [ 3  4 ]        [ 7  8 ]

A + B = [ 1+5   2+6 ] = [  6   8 ]
        [ 3+7   4+8 ]   [ 10  12 ]
\`\`\`

**Ví dụ 2 — \`2 × 3\`:**

\`\`\`
A = [  1   0  -2 ]      B = [ 4  -1  3 ]
    [ -3   5   1 ]          [ 2   0  6 ]

A + B = [ 1+4   0+(-1)  -2+3 ] = [ 5  -1  1 ]
        [-3+2   5+0      1+6 ]   [-1   5  7 ]
\`\`\`

**Ví dụ 3 — số âm và phân số:**

\`\`\`
A = [ 1/2   -1 ]        B = [ 1/2   1 ]
    [ 0      3 ]            [ 4    -3 ]

A + B = [ 1    0 ]
        [ 4    0 ]
\`\`\`

**Ví dụ 4 — cộng với ma trận không:**

\`\`\`
A = [ 7  -2 ]      O = [ 0  0 ]      A + O = [ 7  -2 ]
    [ 4   1 ]          [ 0  0 ]              [ 4   1 ]
\`\`\`

Tổng = chính \`A\`. Đó là vai trò "trung lập" của ma trận không.

### 2.4 Tính chất

Phép cộng ma trận thừa hưởng đầy đủ tính chất từ phép cộng số:

| Tính chất | Công thức | Ghi chú |
|-----------|-----------|---------|
| Giao hoán | \`A + B = B + A\` | Vì cộng từng phần tử, mà cộng số giao hoán |
| Kết hợp | \`(A + B) + C = A + (B + C)\` | Cùng lý do |
| Phần tử trung lập | \`A + 0 = A\` | \`0\` là ma trận không cùng cấp |
| Phần tử đối | \`A + (−A) = 0\` | \`−A\` định nghĩa bởi \`(-A)_ij = -a_ij\` |

Verify nhanh tính giao hoán với ví dụ 1:

\`\`\`
B + A = [ 5+1   6+2 ] = [  6   8 ] = A + B   ✓
        [ 7+3   8+4 ]   [ 10  12 ]
\`\`\`

> **⚠ Lỗi thường gặp**: Cố gắng cộng hai ma trận **khác cấp**. Ví dụ \`[1 2 3]\` (cấp \`1×3\`) + \`[1; 2; 3]\` (cấp \`3×1\`) — **không tồn tại tổng**, dù cả hai đều có 3 phần tử. Cấp khác nhau = phép cộng không được định nghĩa.

> **🔁 Dừng lại tự kiểm tra**: Cộng hai ma trận sau:
>
> \`\`\`
> A = [ 2  -1 ]      B = [ -3   4 ]
>     [ 5   0 ]          [  1  -2 ]
> \`\`\`
>
> <details><summary>Đáp án</summary>
>
> \`\`\`
> A + B = [ 2+(-3)   -1+4 ] = [ -1   3 ]
>         [ 5+1       0+(-2)]  [  6  -2 ]
> \`\`\`
> </details>

### 📝 Tóm tắt Mục 2

- Cộng ma trận: cộng từng ô tương ứng, kết quả cùng cấp.
- Điều kiện: **phải cùng cấp**.
- Giao hoán + kết hợp; phần tử trung lập là ma trận không \`O\`.

---

## 3. Nhân với scalar

### 3.1 Định nghĩa

Cho ma trận \`A\` cấp \`m × n\` và số thực \`c\` (gọi là **scalar**). Tích \`c·A\` là ma trận cùng cấp, với:

\`\`\`
(c · A)_ij = c · a_ij
\`\`\`

Tức là: **nhân scalar vào từng phần tử**.

### 3.2 Bốn ví dụ

**Ví dụ 1.** \`c = 3\`, \`A\` cấp \`2 × 2\`:

\`\`\`
A = [ 1  2 ]      3·A = [ 3   6 ]
    [ 3  4 ]            [ 9  12 ]
\`\`\`

**Ví dụ 2.** \`c = -1\` (phần tử đối):

\`\`\`
A = [  2  -5 ]      -A = [ -2   5 ]
    [ -3   0 ]            [  3   0 ]
\`\`\`

**Ví dụ 3.** \`c = 1/2\` (chia đôi):

\`\`\`
A = [ 4  -2  6 ]      (1/2)·A = [ 2  -1  3 ]
    [ 8   0  10 ]                [ 4   0  5 ]
\`\`\`

**Ví dụ 4.** \`c = 0\` (mọi thứ về 0):

\`\`\`
0·A = O   (ma trận không cùng cấp với A)
\`\`\`

### 3.3 Tính chất

| Tính chất | Công thức |
|-----------|-----------|
| Phân phối qua cộng ma trận | \`c · (A + B) = c·A + c·B\` |
| Phân phối qua cộng scalar | \`(c + d) · A = c·A + d·A\` |
| Kết hợp scalar | \`c · (d · A) = (c·d) · A\` |
| Đơn vị | \`1 · A = A\` |

Verify tính kết hợp: với \`c = 2, d = 3\`, \`A = [[1,2],[3,4]]\`:
- \`d · A = [[3,6],[9,12]]\`
- \`c · (d·A) = [[6,12],[18,24]]\`
- \`(c·d) · A = 6·[[1,2],[3,4]] = [[6,12],[18,24]]\` ✓

### 📝 Tóm tắt Mục 3

- Nhân scalar = nhân số đó vào **mọi** phần tử.
- Không có ràng buộc cấp — luôn làm được.
- Tính chất giống nhân số thông thường.

---

## 4. Nhân ma trận (matrix multiplication) — PHẦN CỐT LÕI

Đây là phép toán quan trọng nhất của đại số tuyến tính. Hầu hết toàn bộ AI/ML quy về **nhân ma trận**, và lát nữa bạn sẽ thấy vì sao quy tắc "hàng × cột" tuy có vẻ kỳ lạ thực ra lại rất tự nhiên.

### 4.1 Trực giác trước — "ghép hai phép biến đổi"

Hãy tạm hình dung mỗi ma trận là một **máy biến đổi vector**: đưa vào một vector \`x\`, ra một vector mới \`Ax\`. (Sẽ học rất kỹ ở [Lesson 06](../lesson-06-matrix-as-transform/).)

Vậy nếu có 2 máy \`B\` rồi \`A\`, thì kết quả của việc đưa vector qua \`B\` trước rồi qua \`A\` là \`A(Bx)\`. Câu hỏi: có **một máy duy nhất** \`C\` sao cho \`Cx = A(Bx)\` luôn đúng không?

Câu trả lời: có, và \`C = A · B\`. Định nghĩa của phép nhân ma trận **chính là** để câu trên thành thật. Quy tắc "hàng × cột" mà ta sẽ thấy ngay sau đây là **kết quả buộc phải có** của yêu cầu này, không phải một quy tắc tùy tiện.

> **💡 Trực giác chốt**: nhân ma trận = **ghép 2 phép biến đổi tuyến tính**. \`AB\` đọc là "làm B trước, rồi làm A" — viết theo chiều ngược thứ tự áp dụng. Đó là lý do nó **không giao hoán** (làm áo trước rồi mặc quần ≠ mặc quần trước rồi mặc áo).

### 4.2 Điều kiện cấp — "số cột A = số hàng B"

Cho \`A\` cấp \`m × k\` và \`B\` cấp \`p × n\`. Tích \`AB\` chỉ tồn tại khi **\`k = p\`**: số cột của A bằng số hàng của B.

Khi đó:
- \`AB\` có cấp \`m × n\` (lấy số hàng của A và số cột của B).
- Chiều "trùng" \`k\` biến mất.

**Quy tắc nhớ kích thước** (cực kỳ quan trọng — sẽ dùng suốt đời):

\`\`\`
A : m × k          
B :     k × n     ←  hai k phải trùng (sờ vào nhau)
─────────────
AB: m     × n     ←  lấy ngoài
\`\`\`

Ví dụ:
- \`(2×3) · (3×4) = (2×4)\` ✓ — chiều giữa khớp (3=3), kết quả \`2×4\`.
- \`(2×3) · (4×3) = ?\` ✗ — chiều giữa lệch (3≠4), **không nhân được**.
- \`(5×5) · (5×1) = (5×1)\` ✓ — ma trận vuông nhân vector cột, ra vector cột.

> **⚠ Lỗi thường gặp**: muốn nhân \`A · B\` thì kiểm tra **số cột A** = **số hàng B**. Không phải "cùng cấp" (đó là điều kiện cho phép cộng), không phải "vuông" (không bắt buộc).

### 4.3 Công thức từng phần tử

Phần tử ở hàng \`i\` cột \`j\` của \`AB\`:

\`\`\`
(AB)_ij = Σ_{r=1}^{k} A_ir · B_rj
        = A_i1·B_1j + A_i2·B_2j + ... + A_ik·B_kj
\`\`\`

Đọc bằng lời:

> Phần tử \`(AB)_ij\` = **dot product** giữa **hàng \`i\` của A** và **cột \`j\` của B**.

Đây chính là chỗ "hàng × cột" có nghĩa cụ thể. Ta đi tìm phần tử tại vị trí \`(i, j)\` của kết quả bằng cách:

1. Lấy **hàng \`i\`** của \`A\` (một vector dài \`k\`).
2. Lấy **cột \`j\`** của \`B\` (một vector dài \`k\`).
3. Nhân tương ứng từng cặp rồi cộng lại → một số duy nhất.

Lặp lại với mọi \`(i, j)\` → điền đầy ma trận \`m × n\`.

> **💡 Hình dung**: tưởng tượng bạn cầm hàng \`i\` của A theo chiều ngang, **dựng đứng** nó lên rồi áp vào cột \`j\` của B (cũng đứng). Hai vector song song, chiều cao bằng nhau. Nhân từng cặp, cộng lại = phần tử \`(AB)_ij\`.

### 4.4 Walk-through 4 ví dụ chi tiết

#### Ví dụ 1 — \`(2×2) · (2×2) = (2×2)\`

\`\`\`
A = [ 1  2 ]      B = [ 5  6 ]
    [ 3  4 ]          [ 7  8 ]
\`\`\`

Cấp: \`(2×2) · (2×2) → (2×2)\`. Kết quả \`C = AB\` có 4 phần tử cần tính.

**\`c_11\`** = hàng 1 của A · cột 1 của B
   = \`[1, 2] · [5, 7]\` = \`1·5 + 2·7\` = \`5 + 14\` = **19**

**\`c_12\`** = hàng 1 của A · cột 2 của B
   = \`[1, 2] · [6, 8]\` = \`1·6 + 2·8\` = \`6 + 16\` = **22**

**\`c_21\`** = hàng 2 của A · cột 1 của B
   = \`[3, 4] · [5, 7]\` = \`3·5 + 4·7\` = \`15 + 28\` = **43**

**\`c_22\`** = hàng 2 của A · cột 2 của B
   = \`[3, 4] · [6, 8]\` = \`3·6 + 4·8\` = \`18 + 32\` = **50**

Vậy:

\`\`\`
AB = [ 19  22 ]
     [ 43  50 ]
\`\`\`

#### Ví dụ 2 — \`(2×3) · (3×2) = (2×2)\`

\`\`\`
A = [ 1  2  3 ]        B = [ 7   8 ]
    [ 4  5  6 ]            [ 9  10 ]
                           [ 11 12 ]
\`\`\`

Cấp: \`(2×3) · (3×2) → (2×2)\`. Kết quả 4 phần tử.

**\`c_11\`** = \`[1, 2, 3] · [7, 9, 11]\` = \`1·7 + 2·9 + 3·11\` = \`7 + 18 + 33\` = **58**

**\`c_12\`** = \`[1, 2, 3] · [8, 10, 12]\` = \`1·8 + 2·10 + 3·12\` = \`8 + 20 + 36\` = **64**

**\`c_21\`** = \`[4, 5, 6] · [7, 9, 11]\` = \`4·7 + 5·9 + 6·11\` = \`28 + 45 + 66\` = **139**

**\`c_22\`** = \`[4, 5, 6] · [8, 10, 12]\` = \`4·8 + 5·10 + 6·12\` = \`32 + 50 + 72\` = **154**

\`\`\`
AB = [  58   64 ]
     [ 139  154 ]
\`\`\`

#### Ví dụ 3 — \`(2×3) · (3×1) = (2×1)\` (ma trận × vector cột)

\`\`\`
A = [ 1  2  3 ]        x = [ 1 ]
    [ 4  5  6 ]            [ 0 ]
                           [-1 ]
\`\`\`

Cấp: \`(2×3) · (3×1) → (2×1)\`. Đây là dạng \`Ax\` mà bạn gặp suốt sau này.

**\`(Ax)_1\`** = \`[1, 2, 3] · [1, 0, -1]\` = \`1·1 + 2·0 + 3·(-1)\` = \`1 + 0 - 3\` = **-2**

**\`(Ax)_2\`** = \`[4, 5, 6] · [1, 0, -1]\` = \`4·1 + 5·0 + 6·(-1)\` = \`4 + 0 - 6\` = **-2**

\`\`\`
Ax = [ -2 ]
     [ -2 ]
\`\`\`

> **💡 Nhận xét hữu ích**: \`Ax\` là **tổ hợp tuyến tính các cột của A**, hệ số là các thành phần của \`x\`. Cụ thể: với \`x = (1, 0, -1)\`, ta có \`Ax = 1·(cột 1) + 0·(cột 2) + (-1)·(cột 3)\` = \`1·[1,4] + 0·[2,5] - 1·[3,6] = [1-3, 4-6] = [-2, -2]\`. Hai cách tính cho cùng kết quả — đây là một bài tập sẽ gặp ở Lesson 06.

#### Ví dụ 4 — \`(2×2) · (2×3) = (2×3)\`

\`\`\`
A = [  1  -1 ]      B = [ 1  2  3 ]
    [  2   3 ]          [ 4  5  6 ]
\`\`\`

Cấp: \`(2×2) · (2×3) → (2×3)\`. Kết quả có **6** phần tử.

**\`c_11\`** = \`[1, -1] · [1, 4]\` = \`1 - 4\` = **-3**
**\`c_12\`** = \`[1, -1] · [2, 5]\` = \`2 - 5\` = **-3**
**\`c_13\`** = \`[1, -1] · [3, 6]\` = \`3 - 6\` = **-3**
**\`c_21\`** = \`[2, 3] · [1, 4]\` = \`2 + 12\` = **14**
**\`c_22\`** = \`[2, 3] · [2, 5]\` = \`4 + 15\` = **19**
**\`c_23\`** = \`[2, 3] · [3, 6]\` = \`6 + 18\` = **24**

\`\`\`
AB = [ -3  -3  -3 ]
     [ 14  19  24 ]
\`\`\`

> **🔁 Dừng lại tự kiểm tra**: Cho \`A = [[2, 1], [0, 3]]\` và \`B = [[1, 4], [5, 2]]\`. Tính \`AB\`.
>
> <details><summary>Đáp án</summary>
>
> Cấp: \`(2×2) · (2×2) = (2×2)\`.
>
> - \`c_11 = 2·1 + 1·5 = 7\`
> - \`c_12 = 2·4 + 1·2 = 10\`
> - \`c_21 = 0·1 + 3·5 = 15\`
> - \`c_22 = 0·4 + 3·2 = 6\`
>
> \`\`\`
> AB = [  7  10 ]
>      [ 15   6 ]
> \`\`\`
> </details>

### 4.5 Quy tắc nhớ "hàng × cột"

Khi tính \`(AB)_ij\`:

\`\`\`
       cột j của B
         ↓
        [ b_1j ]
        [ b_2j ]
        [  ... ]
        [ b_kj ]

hàng i của A → [ a_i1  a_i2  ...  a_ik ]   

(AB)_ij = a_i1·b_1j + a_i2·b_2j + ... + a_ik·b_kj
\`\`\`

**Trick để không nhầm**: chỉ số \`i\` đến **từ A** (hàng), chỉ số \`j\` đến **từ B** (cột). Chỉ số "biến mất" là chiều \`k\` — chiều khớp ở giữa.

### 4.6 Vì sao công thức lại kỳ cục thế?

Lý do ngắn: vì ta **muốn** \`(AB)x = A(Bx)\` đúng với mọi vector \`x\` — tức là ta muốn nhân ma trận biểu diễn **ghép phép biến đổi**. Khi đặt ra yêu cầu đó và viết ra \`A(Bx)\` theo từng tọa độ, công thức \`Σ a_ir·b_rj\` rơi ra một cách tự nhiên.

Ta sẽ chứng minh chi tiết ở Lesson 06. Ở bước này: bạn chỉ cần thuộc quy tắc "hàng × cột" và biết bấm máy được.

### 📝 Tóm tắt Mục 4

- Điều kiện nhân: **cột A = hàng B**. Kết quả lấy hàng A và cột B.
- \`(AB)_ij\` = dot product (hàng i của A) · (cột j của B).
- Quy tắc nhớ kích thước: \`(m×k)·(k×n) = (m×n)\` — \`k\` "biến mất".
- Định nghĩa "kỳ cục" của phép nhân thực ra là cách duy nhất để biểu diễn **ghép phép biến đổi**.

---

## 5. Tính chất nhân ma trận

### 5.1 KHÔNG giao hoán — \`AB ≠ BA\` (thường thấy)

Khác với phép cộng và phép nhân số, nhân ma trận **không giao hoán**. Tức là, **theo quy luật**, \`AB ≠ BA\`. Có ba mức độ:

1. **Khác cấp**: nếu \`A\` là \`(m×k)\` và \`B\` là \`(k×n)\` với \`m ≠ n\`, thì \`BA\` có cấp \`(n×k)·(m×k)\` — chỉ tồn tại khi \`k = m\`, và cả khi tồn tại thì có cấp khác \`AB\`. Ví dụ \`(2×3)·(3×2) = (2×2)\` nhưng \`(3×2)·(2×3) = (3×3)\` — đã khác cấp, không có chuyện bằng nhau.

2. **Cùng cấp nhưng khác giá trị**: kể cả khi cả \`AB\` và \`BA\` đều là \`(n×n)\` (cùng cấp), giá trị vẫn thường khác.

3. **Hiếm khi bằng nhau**: chỉ một số cặp đặc biệt mới có \`AB = BA\` (gọi là "giao hoán được" — vd \`A\` và \`I\`, \`A\` và \`A⁻¹\`, hai ma trận đường chéo cùng cấp).

#### Walk-through phản ví dụ — chứng minh \`AB ≠ BA\` cụ thể

\`\`\`
A = [ 1  2 ]      B = [ 0  1 ]
    [ 3  4 ]          [ 1  0 ]
\`\`\`

(B chính là ma trận hoán đổi 2 dòng — sẽ giải thích ở Lesson 06.)

**Tính \`AB\`:**
- \`(AB)_11 = 1·0 + 2·1 = 2\`
- \`(AB)_12 = 1·1 + 2·0 = 1\`
- \`(AB)_21 = 3·0 + 4·1 = 4\`
- \`(AB)_22 = 3·1 + 4·0 = 3\`

\`\`\`
AB = [ 2  1 ]
     [ 4  3 ]
\`\`\`

**Tính \`BA\`:**
- \`(BA)_11 = 0·1 + 1·3 = 3\`
- \`(BA)_12 = 0·2 + 1·4 = 4\`
- \`(BA)_21 = 1·1 + 0·3 = 1\`
- \`(BA)_22 = 1·2 + 0·4 = 2\`

\`\`\`
BA = [ 3  4 ]
     [ 1  2 ]
\`\`\`

So sánh: \`AB ≠ BA\` (cùng tập số nhưng sắp xếp khác).

> **💡 Trực giác cho non-commutativity**: nhân \`B\` từ trái với \`A\` = "hoán đổi 2 **hàng** của A". Nhân \`B\` từ phải với \`A\` = "hoán đổi 2 **cột** của A". Hai thao tác đó cho kết quả khác nhau — đó là vì sao \`AB ≠ BA\`.

> **⚠ Lỗi thường gặp**: viết \`(A + B)² = A² + 2AB + B²\`. **SAI** với ma trận. Đúng phải là:
>
> \`\`\`
> (A + B)² = (A + B)(A + B) = A² + AB + BA + B²
> \`\`\`
>
> Vì \`AB ≠ BA\`, không gộp được \`AB + BA = 2AB\`. Mọi danh tính đại số "quen tay" với số bình thường, dùng cho ma trận **phải kiểm tra lại tính giao hoán**.

### 5.2 Có tính kết hợp — \`(AB)C = A(BC)\`

Với mọi \`A, B, C\` có cấp khớp để tích tồn tại:

\`\`\`
(AB)C = A(BC)
\`\`\`

Đây là tính chất **cực kỳ quan trọng** vì nó cho phép ta nhân theo **thứ tự tùy ý** miễn giữ nguyên thứ tự "viết bên trái sang phải".

**Verify với ví dụ:**

\`\`\`
A = [ 1  2 ]   B = [ 5  6 ]   C = [ 0  1 ]
    [ 3  4 ]       [ 7  8 ]       [ 1  0 ]
\`\`\`

Tính \`AB\` đã có ở Mục 4 ví dụ 1: \`AB = [[19, 22], [43, 50]]\`.

**\`(AB)C\`:**
- \`((AB)C)_11 = 19·0 + 22·1 = 22\`
- \`((AB)C)_12 = 19·1 + 22·0 = 19\`
- \`((AB)C)_21 = 43·0 + 50·1 = 50\`
- \`((AB)C)_22 = 43·1 + 50·0 = 43\`

\`\`\`
(AB)C = [ 22  19 ]
        [ 50  43 ]
\`\`\`

**Bây giờ tính \`BC\` rồi \`A(BC)\`:**

\`BC\`:
- \`(BC)_11 = 5·0 + 6·1 = 6\`
- \`(BC)_12 = 5·1 + 6·0 = 5\`
- \`(BC)_21 = 7·0 + 8·1 = 8\`
- \`(BC)_22 = 7·1 + 8·0 = 7\`

\`\`\`
BC = [ 6  5 ]
     [ 8  7 ]
\`\`\`

\`A(BC)\`:
- \`(A(BC))_11 = 1·6 + 2·8 = 22\`
- \`(A(BC))_12 = 1·5 + 2·7 = 19\`
- \`(A(BC))_21 = 3·6 + 4·8 = 50\`
- \`(A(BC))_22 = 3·5 + 4·7 = 43\`

\`\`\`
A(BC) = [ 22  19 ]
        [ 50  43 ]   ✓ (bằng (AB)C)
\`\`\`

> **💡 Ứng dụng trong AI**: bạn nhân chuỗi \`W₃·W₂·W₁·x\`. Tính chất kết hợp cho phép "gộp trọng số" \`W = W₃W₂W₁\` một lần rồi cứ thế nhân với mọi input \`x\`. Đó là vì sao nhiều layer **tuyến tính** (không activation) **gộp được thành 1 layer** — một lý do **không thể** dùng NN chỉ với linear layer mà phải có hàm phi tuyến giữa các layer.

### 5.3 Có tính phân phối — \`A(B + C) = AB + AC\`

Với \`A, B, C\` có cấp khớp:

\`\`\`
A(B + C) = AB + AC
(B + C)A = BA + CA
\`\`\`

Lưu ý: vì không giao hoán, cần ghi rõ A ở **bên trái** hay **bên phải**.

**Verify:**

\`\`\`
A = [ 1  2 ]    B = [ 1  0 ]    C = [ 0  1 ]
    [ 0  1 ]        [ 0  1 ]        [ 1  0 ]
\`\`\`

\`B + C = [[1, 1], [1, 1]]\`.

\`A(B+C)\`:
- \`(A(B+C))_11 = 1·1 + 2·1 = 3\`
- \`(A(B+C))_12 = 1·1 + 2·1 = 3\`
- \`(A(B+C))_21 = 0·1 + 1·1 = 1\`
- \`(A(B+C))_22 = 0·1 + 1·1 = 1\`

\`\`\`
A(B+C) = [ 3  3 ]
         [ 1  1 ]
\`\`\`

\`AB\`:
- \`(AB)_11 = 1·1 + 2·0 = 1\`
- \`(AB)_12 = 1·0 + 2·1 = 2\`
- \`(AB)_21 = 0·1 + 1·0 = 0\`
- \`(AB)_22 = 0·0 + 1·1 = 1\`

\`AC\`:
- \`(AC)_11 = 1·0 + 2·1 = 2\`
- \`(AC)_12 = 1·1 + 2·0 = 1\`
- \`(AC)_21 = 0·0 + 1·1 = 1\`
- \`(AC)_22 = 0·1 + 1·0 = 0\`

\`AB + AC = [[1+2, 2+1], [0+1, 1+0]] = [[3, 3], [1, 1]]\` ✓

### 5.4 Bảng tổng kết tính chất

| Tính chất | Số thực | Ma trận |
|-----------|---------|---------|
| Giao hoán cộng \`A+B = B+A\` | ✓ | ✓ |
| Giao hoán nhân \`AB = BA\` | ✓ | ✗ (nói chung) |
| Kết hợp \`(AB)C = A(BC)\` | ✓ | ✓ |
| Phân phối \`A(B+C) = AB+AC\` | ✓ | ✓ |
| Phần tử trung lập nhân | \`1·a = a\` | \`IA = A\` |
| Triệt tiêu \`ab = 0 ⇒ a=0 ∨ b=0\` | ✓ | ✗ |

Hàng "triệt tiêu" đáng chú ý: với số, \`ab = 0\` thì ít nhất một thừa số phải bằng 0. Với ma trận thì **KHÔNG**. Phản ví dụ:

\`\`\`
A = [ 1  0 ]      B = [ 0  0 ]      AB = [ 0  0 ]
    [ 0  0 ]          [ 0  1 ]           [ 0  0 ]
\`\`\`

\`A ≠ O\`, \`B ≠ O\`, nhưng \`AB = O\`. Đây là lý do quan trọng: với ma trận, không thể "chia hai vế cho A" để rút gọn — phải nhân **nghịch đảo** \`A⁻¹\` (nếu tồn tại), sẽ học ở Mục 9.

### 📝 Tóm tắt Mục 5

- Nhân ma trận **không giao hoán** (\`AB ≠ BA\`) — kiểm chứng bằng phản ví dụ 2×2 cụ thể.
- **Có** kết hợp và phân phối — vẫn dùng được nhiều quy tắc đại số.
- Cảnh giác: \`(A+B)² ≠ A² + 2AB + B²\`; \`AB = O\` không suy ra \`A = O\` hay \`B = O\`.

---

## 6. Transpose — \`Aᵀ\`

### 6.1 Định nghĩa

**Transpose** của ma trận \`A\` cấp \`m × n\`, ký hiệu \`Aᵀ\`, là ma trận cấp \`n × m\` thu được bằng cách **đổi hàng thành cột**:

\`\`\`
(Aᵀ)_ij = A_ji
\`\`\`

Tức là: phần tử ở hàng \`i\` cột \`j\` của \`Aᵀ\` = phần tử ở hàng \`j\` cột \`i\` của \`A\`.

Một cách hình dung: "lật" ma trận qua đường chéo chính.

### 6.2 Ba ví dụ

**Ví dụ 1 — \`2×3 → 3×2\`:**

\`\`\`
A = [ 1  2  3 ]              Aᵀ = [ 1  4 ]
    [ 4  5  6 ]                   [ 2  5 ]
                                  [ 3  6 ]
\`\`\`

Cột 1 của \`A\` (= \`[1, 4]\`) trở thành hàng 1 của \`Aᵀ\`. Cột 2 → hàng 2. Cột 3 → hàng 3.

**Ví dụ 2 — \`3×1 → 1×3\` (vector cột thành vector hàng):**

\`\`\`
v = [ 1 ]              vᵀ = [ 1  2  3 ]
    [ 2 ]
    [ 3 ]
\`\`\`

Quan trọng: khi viết \`xᵀy\` (dot product) ta thực ra đang nhân \`(1×n)·(n×1) = (1×1)\` — một con số.

**Ví dụ 3 — ma trận vuông \`2×2\`:**

\`\`\`
A = [ 1  2 ]              Aᵀ = [ 1  3 ]
    [ 3  4 ]                   [ 2  4 ]
\`\`\`

Lưu ý: với ma trận vuông, \`Aᵀ\` vẫn có cấp \`n×n\` nhưng phần tử khác \`A\` (trừ trường hợp đặc biệt **đối xứng**: \`A = Aᵀ\`).

### 6.3 Tính chất quan trọng

| Tính chất | Công thức | Ghi chú |
|-----------|-----------|---------|
| Idempotent | \`(Aᵀ)ᵀ = A\` | Lật 2 lần về như cũ |
| Cộng | \`(A + B)ᵀ = Aᵀ + Bᵀ\` | Phân phối |
| Scalar | \`(c·A)ᵀ = c·Aᵀ\` | |
| Nhân (**chú ý đảo thứ tự**) | \`(AB)ᵀ = Bᵀ·Aᵀ\` | ⚠ Đảo thứ tự! |

Tính chất \`(AB)ᵀ = Bᵀ Aᵀ\` rất dễ nhầm. Verify cụ thể:

\`\`\`
A = [ 1  2 ]       B = [ 5  6 ]
    [ 3  4 ]           [ 7  8 ]
\`\`\`

\`AB = [[19, 22], [43, 50]]\` (đã tính ở Mục 4.4 ví dụ 1).

\`(AB)ᵀ = [[19, 43], [22, 50]]\`.

\`Bᵀ = [[5, 7], [6, 8]]\`, \`Aᵀ = [[1, 3], [2, 4]]\`.

\`Bᵀ·Aᵀ\`:
- \`(Bᵀ Aᵀ)_11 = 5·1 + 7·2 = 19\`
- \`(Bᵀ Aᵀ)_12 = 5·3 + 7·4 = 43\`
- \`(Bᵀ Aᵀ)_21 = 6·1 + 8·2 = 22\`
- \`(Bᵀ Aᵀ)_22 = 6·3 + 8·4 = 50\`

\`Bᵀ Aᵀ = [[19, 43], [22, 50]] = (AB)ᵀ\` ✓

> **⚠ Lỗi thường gặp**: viết \`(AB)ᵀ = Aᵀ Bᵀ\`. SAI. Thứ tự phải đảo: \`(AB)ᵀ = Bᵀ Aᵀ\`. Nhớ bằng "bóc tất hai lớp": vớ ngoài (B) ra trước, vớ trong (A) ra sau khi nhân từ trái.

### 6.4 Ma trận đối xứng (symmetric)

Ma trận vuông \`A\` được gọi là **đối xứng** nếu \`A = Aᵀ\`, tức \`a_ij = a_ji\` mọi \`i, j\`. Ví dụ:

\`\`\`
S = [ 1  4  7 ]              ma trận hiệp phương sai luôn đối xứng,
    [ 4  2  5 ]              ma trận khoảng cách cũng đối xứng.
    [ 7  5  3 ]
\`\`\`

Đối xứng cực phổ biến trong xác suất, ML (covariance, Gram matrix). Sẽ học sâu ở Lesson 07-08 (eigen + SVD).

### 📝 Tóm tắt Mục 6

- Transpose = lật hàng ↔ cột. \`(Aᵀ)_ij = A_ji\`.
- \`(A + B)ᵀ = Aᵀ + Bᵀ\`.
- \`(AB)ᵀ = Bᵀ Aᵀ\` — **đảo thứ tự**, đây là điểm hay quên.
- Đối xứng = bằng transpose của chính nó.

---

## 7. Ma trận đơn vị \`I\` — vai trò "số 1"

### 7.1 Định nghĩa lại

Ma trận đơn vị \`Iₙ\` là ma trận vuông \`n × n\` với phần tử:

\`\`\`
I_ij = 1   nếu i = j   (đường chéo)
I_ij = 0   nếu i ≠ j   (ngoài đường chéo)
\`\`\`

Ví dụ \`I₃\`:

\`\`\`
I₃ = [ 1  0  0 ]
     [ 0  1  0 ]
     [ 0  0  1 ]
\`\`\`

### 7.2 Tính chất chìa khóa: \`IA = AI = A\`

Với mọi ma trận \`A\` cấp \`m × n\`:
- \`Iₘ · A = A\`
- \`A · Iₙ = A\`

Tức \`I\` đóng vai trò "số 1" trong phép nhân ma trận: nhân vào đâu cũng không đổi.

**Verify:**

\`\`\`
A = [ 1  2  3 ]      I₃ = [ 1  0  0 ]
    [ 4  5  6 ]           [ 0  1  0 ]
                          [ 0  0  1 ]

A · I₃ = ?
\`\`\`

Tính:
- \`(AI)_11 = 1·1 + 2·0 + 3·0 = 1\`
- \`(AI)_12 = 1·0 + 2·1 + 3·0 = 2\`
- \`(AI)_13 = 1·0 + 2·0 + 3·1 = 3\`
- \`(AI)_21 = 4·1 + 5·0 + 6·0 = 4\`
- \`(AI)_22 = 4·0 + 5·1 + 6·0 = 5\`
- \`(AI)_23 = 4·0 + 5·0 + 6·1 = 6\`

\`\`\`
A · I₃ = [ 1  2  3 ] = A   ✓
         [ 4  5  6 ]
\`\`\`

> **💡 Trực giác**: cột \`j\` của \`I\` là vector "chọn cột thứ \`j\`". Nhân \`A · I\` = "với mỗi vị trí, chọn đúng cột tương ứng của A" → trả về A nguyên vẹn.

### 7.3 Sao phải có 2 cấp \`I\`?

Để bảo toàn cấp khi nhân với \`A\` (cấp \`m × n\`):
- Bên trái A: phải dùng \`Iₘ\` (cấp \`m × m\`), nếu không \`(?×?)·(m×n)\` không hợp lệ.
- Bên phải A: phải dùng \`Iₙ\` (cấp \`n × n\`).

Khi \`A\` vuông \`n × n\`, chỉ cần một \`Iₙ\`.

### 📝 Tóm tắt Mục 7

- \`I\` = đường chéo 1, ngoài 0. Là phần tử "trung lập" của phép nhân.
- \`IA = AI = A\` (với cấp \`I\` thích hợp).

---

## 8. Ma trận nghịch đảo \`A⁻¹\`

### 8.1 Trực giác — "hoàn tác phép biến đổi"

Với một số \`a ≠ 0\`, ta có **nghịch đảo** \`1/a\` thỏa \`a · (1/a) = 1\`. Với ma trận, ta muốn tìm \`A⁻¹\` thỏa:

\`\`\`
A · A⁻¹ = A⁻¹ · A = I
\`\`\`

Tức \`A⁻¹\` là ma trận "hoàn tác" \`A\`: nếu \`A\` đưa vector \`x\` sang \`Ax\`, thì \`A⁻¹\` đưa \`Ax\` quay về \`x\`.

Khi đó giải \`Ax = b\` đơn giản chỉ là \`x = A⁻¹b\`. (Tương tự giải \`ax = b\` với số: \`x = b/a\`.)

### 8.2 Điều kiện tồn tại

Nghịch đảo **chỉ tồn tại** khi:

1. \`A\` là **ma trận vuông** (\`n × n\`), VÀ
2. \`A\` **không suy biến** (non-singular), tức **định thức** \`det(A) ≠ 0\`.

Nếu \`det(A) = 0\` → \`A\` **suy biến** (singular), KHÔNG có nghịch đảo. Hệ \`Ax = b\` khi đó hoặc **vô nghiệm**, hoặc **vô số nghiệm** (đã học ở [Algebra Lesson 08](../../Algebra/lesson-08-linear-systems/)).

Ý nghĩa hình học (sẽ rõ ở Lesson 06): \`det(A) = 0\` nghĩa là \`A\` "ép" không gian xuống thấp chiều hơn (hình hộp thành mặt phẳng, mặt phẳng thành đường thẳng). Một khi đã ép, không thể "kéo dãn ngược" — đó là vì sao không có nghịch đảo.

### 8.3 Công thức cho ma trận \`2×2\`

Cho \`A = [[a, b], [c, d]]\`. **Định thức** \`2×2\`:

\`\`\`
det(A) = ad − bc
\`\`\`

Nếu \`det(A) ≠ 0\`, nghịch đảo là:

\`\`\`
        1           [  d  -b ]
A⁻¹ = ──────  ·     [ -c   a ]
       ad-bc
\`\`\`

Cách nhớ:
1. Đổi chỗ \`a\` và \`d\` (đường chéo chính).
2. Đổi dấu \`b\` và \`c\` (phản chéo).
3. Chia toàn bộ cho \`det(A) = ad − bc\`.

### 8.4 Walk-through 3 ví dụ tính \`A⁻¹\` cho \`2×2\`

#### Ví dụ 1 — đơn giản

\`\`\`
A = [ 4  7 ]
    [ 2  6 ]
\`\`\`

**Bước 1.** \`det(A) = 4·6 − 7·2 = 24 − 14 = 10 ≠ 0\` → tồn tại nghịch đảo.

**Bước 2.** Hoán vị + đổi dấu:

\`\`\`
[  d  -b ]   [  6  -7 ]
[ -c   a ] = [ -2   4 ]
\`\`\`

**Bước 3.** Chia cho \`det = 10\`:

\`\`\`
A⁻¹ = [  6/10  -7/10 ] = [  0.6  -0.7 ]
      [ -2/10   4/10 ]   [ -0.2   0.4 ]
\`\`\`

**Verify \`A · A⁻¹ = I\`:**

- \`(AA⁻¹)_11 = 4·0.6 + 7·(-0.2) = 2.4 − 1.4 = 1\` ✓
- \`(AA⁻¹)_12 = 4·(-0.7) + 7·0.4 = -2.8 + 2.8 = 0\` ✓
- \`(AA⁻¹)_21 = 2·0.6 + 6·(-0.2) = 1.2 − 1.2 = 0\` ✓
- \`(AA⁻¹)_22 = 2·(-0.7) + 6·0.4 = -1.4 + 2.4 = 1\` ✓

\`\`\`
A · A⁻¹ = [ 1  0 ] = I   ✓
          [ 0  1 ]
\`\`\`

#### Ví dụ 2 — số nguyên gọn

\`\`\`
A = [ 1  2 ]
    [ 3  4 ]
\`\`\`

\`det(A) = 1·4 − 2·3 = 4 − 6 = -2\`.

\`\`\`
A⁻¹ = (1/-2) · [  4  -2 ] = [ -2    1   ]
               [ -3   1 ]   [  3/2 -1/2 ]
\`\`\`

Verify:
- \`(AA⁻¹)_11 = 1·(-2) + 2·(3/2) = -2 + 3 = 1\` ✓
- \`(AA⁻¹)_12 = 1·1 + 2·(-1/2) = 1 − 1 = 0\` ✓
- \`(AA⁻¹)_21 = 3·(-2) + 4·(3/2) = -6 + 6 = 0\` ✓
- \`(AA⁻¹)_22 = 3·1 + 4·(-1/2) = 3 − 2 = 1\` ✓

#### Ví dụ 3 — kiểm tra trường hợp suy biến

\`\`\`
A = [ 1  2 ]
    [ 2  4 ]
\`\`\`

\`det(A) = 1·4 − 2·2 = 4 − 4 = 0\` → **suy biến**, KHÔNG có nghịch đảo.

Nhìn kỹ: hàng 2 = 2 × hàng 1, tức 2 hàng "không độc lập tuyến tính" (sẽ học Lesson 04). Ma trận này "ép" mọi vector về đường thẳng \`y = 2x\`, không thể đảo ngược.

> **❓ Câu hỏi tự nhiên**:
>
> **Q1: Có chỉ một A⁻¹ thôi à? Hay nhiều?**
> Chỉ một. Nếu \`B₁ A = I\` và \`A B₂ = I\` thì \`B₁ = B₁ I = B₁(A B₂) = (B₁ A)B₂ = I B₂ = B₂\`. Vậy nghịch đảo (nếu tồn tại) **duy nhất**.
>
> **Q2: \`A·A⁻¹ = I\` thì có suy ra \`A⁻¹·A = I\` không?**
> Với ma trận **vuông** thì có (định lý — chứng minh ở Lesson 06). Vì thế chỉ cần kiểm tra một chiều là đủ.
>
> **Q3: Tính nghịch đảo có đắt không?**
> Đắt — \`O(n³)\` cho ma trận \`n×n\` tổng quát. Trong thực tế, **không** ai tính \`A⁻¹\` rồi nhân \`A⁻¹b\` để giải \`Ax = b\` — thay vào đó ta dùng **khử Gauss** (\`O(n³)\` nhưng nhanh hơn về hằng số) hoặc các phân rã (LU, QR). Học \`A⁻¹\` chủ yếu để **suy luận** chứ không để tính trong production.

### 8.5 Ma trận \`3×3\` — giới thiệu

Có 2 cách tính \`A⁻¹\` cho \`n×n\` tổng quát:

**Cách 1 — Adjugate / cofactor**: \`A⁻¹ = (1/det A) · adj(A)\`, với \`adj(A)\` là ma trận adjugate (transpose của ma trận cofactor). Chính xác nhưng phức tạp, ít dùng cho \`n > 3\`.

**Cách 2 — Khử Gauss-Jordan**: viết bảng mở rộng \`[A | I]\`, dùng phép biến đổi sơ cấp dòng để biến vế trái thành \`I\`; vế phải sẽ trở thành \`A⁻¹\`.

Ví dụ siêu tóm tắt với \`A\` cấp 3:

\`\`\`
[ 1  2  0 | 1  0  0 ]    →  ...  →    [ 1  0  0 | a' b' c' ]
[ 0  1  3 | 0  1  0 ]                  [ 0  1  0 | d' e' f' ]
[ 2  0  1 | 0  0  1 ]                  [ 0  0  1 | g' h' i' ]
\`\`\`

Vế phải sau khi khử = \`A⁻¹\`. Chi tiết các bước khử sẽ nhắc lại ở Lesson 06; ở bài này ta chỉ cần biết **có cách** và sẽ dùng máy/code cho \`n ≥ 3\`.

### 📝 Tóm tắt Mục 8

- \`A⁻¹\` thỏa \`AA⁻¹ = A⁻¹A = I\`.
- Chỉ tồn tại khi \`A\` vuông VÀ \`det(A) ≠ 0\`.
- Công thức 2×2: hoán vị chéo chính, đổi dấu phản chéo, chia \`det\`.
- 3×3 trở lên: khử Gauss-Jordan (giới thiệu).
- Khi tồn tại, \`A⁻¹\` **duy nhất**.

---

## 9. Giải hệ \`Ax = b\` bằng nghịch đảo

Khi \`A\` vuông và \`det(A) ≠ 0\`, hệ \`Ax = b\` có **nghiệm duy nhất**:

\`\`\`
x = A⁻¹ · b
\`\`\`

### 9.1 Walk-through ví dụ

Giải hệ:

\`\`\`
4x + 7y = 23
2x + 6y = 16
\`\`\`

Viết dạng ma trận:

\`\`\`
A = [ 4  7 ]      b = [ 23 ]
    [ 2  6 ]          [ 16 ]
\`\`\`

Đã tính \`A⁻¹\` ở Mục 8.4 ví dụ 1:

\`\`\`
A⁻¹ = [  0.6  -0.7 ]
      [ -0.2   0.4 ]
\`\`\`

Tính \`x = A⁻¹ b\`:
- \`x₁ = 0.6·23 + (-0.7)·16 = 13.8 − 11.2 = 2.6\`
- \`x₂ = -0.2·23 + 0.4·16 = -4.6 + 6.4 = 1.8\`

Vậy \`x = 2.6, y = 1.8\`.

**Verify thay lại hệ gốc:**
- \`4·2.6 + 7·1.8 = 10.4 + 12.6 = 23\` ✓
- \`2·2.6 + 6·1.8 = 5.2 + 10.8 = 16\` ✓

### 9.2 Khi nào không dùng được?

- \`A\` không vuông (số phương trình ≠ số ẩn) → không có \`A⁻¹\` theo nghĩa này. Khi đó dùng **least squares** (sẽ học sau).
- \`det(A) = 0\` → hoặc vô nghiệm, hoặc vô số nghiệm. Phải dùng khử Gauss và phân tích hạng.

### 📝 Tóm tắt Mục 9

- \`Ax = b\` với \`A\` khả nghịch → \`x = A⁻¹ b\`.
- Chỉ là **lý thuyết**: thực tế dùng khử Gauss/LU cho hiệu năng.

---

## 10. Định thức (Determinant) — giới thiệu

Sẽ học sâu ở Lesson 06. Ở đây chỉ cần công thức tính.

### 10.1 \`det(A)\` cho \`2×2\`

\`\`\`
det [ a  b ] = ad − bc
    [ c  d ]
\`\`\`

Ví dụ: \`det [[1,2],[3,4]] = 4 − 6 = -2\`.

### 10.2 \`det(A)\` cho \`3×3\` — quy tắc Sarrus

\`\`\`
A = [ a  b  c ]
    [ d  e  f ]
    [ g  h  i ]

det(A) = aei + bfg + cdh − ceg − bdi − afh
\`\`\`

Cách nhớ Sarrus: chép lại 2 cột đầu cạnh bên phải, lấy tổng 3 đường chéo "xuôi" trừ tổng 3 đường chéo "ngược":

\`\`\`
a  b  c | a  b
d  e  f | d  e
g  h  i | g  h
\`\`\`

**Xuôi** (+): \`aei\`, \`bfg\`, \`cdh\`. **Ngược** (−): \`ceg\`, \`bdi\`, \`afh\`.

### 10.3 Một ví dụ \`3×3\`

\`\`\`
A = [ 1  2  3 ]
    [ 4  5  6 ]
    [ 7  8  10 ]
\`\`\`

- Xuôi: \`1·5·10 + 2·6·7 + 3·4·8 = 50 + 84 + 96 = 230\`
- Ngược: \`3·5·7 + 2·4·10 + 1·6·8 = 105 + 80 + 48 = 233\`

\`det(A) = 230 − 233 = -3\`.

\`det ≠ 0\` → khả nghịch.

### 10.4 Vài tính chất nhanh

- \`det(I) = 1\`.
- \`det(AB) = det(A) · det(B)\`.
- \`det(Aᵀ) = det(A)\`.
- \`det(A⁻¹) = 1/det(A)\`.
- Hoán 2 hàng → \`det\` đổi dấu.
- 2 hàng tỉ lệ → \`det = 0\`.

(Sẽ chứng minh và giải thích hình học ở Lesson 06.)

### 📝 Tóm tắt Mục 10

- \`det(2×2) = ad − bc\`.
- \`det(3×3)\` qua Sarrus hoặc Laplace.
- \`det = 0\` ⇔ ma trận suy biến (không khả nghịch).

---

## 11. Liên hệ ML/AI — vì sao ma trận quan trọng

### 11.1 Một layer của Neural Network = \`y = Wx + b\`

Trong một mạng nơ-ron, mỗi **layer** (fully connected, dense) thực hiện:

\`\`\`
y = W·x + b
\`\`\`

Trong đó:
- \`x\` là input vector (cấp \`n × 1\`).
- \`W\` là **trọng số** (weight matrix), cấp \`m × n\` — \`m\` là số neuron của layer, \`n\` là số input.
- \`b\` là **bias** vector (cấp \`m × 1\`).
- \`y\` là output (cấp \`m × 1\`).

Cụ thể với \`m = 2, n = 3\`:

\`\`\`
W = [ 0.1  0.2  0.3 ]     x = [ 1 ]      b = [ 0.5 ]
    [ 0.4  0.5  0.6 ]         [ 2 ]          [ -0.5 ]
                              [ 3 ]

W·x = [ 0.1·1 + 0.2·2 + 0.3·3 ] = [ 0.1 + 0.4 + 0.9 ] = [ 1.4 ]
      [ 0.4·1 + 0.5·2 + 0.6·3 ]   [ 0.4 + 1.0 + 1.8 ]   [ 3.2 ]

y = W·x + b = [ 1.4 + 0.5  ] = [ 1.9 ]
              [ 3.2 + (-0.5)]   [ 2.7 ]
\`\`\`

Sau đó qua một hàm phi tuyến (ReLU, sigmoid, tanh) → tới layer kế tiếp. Lặp lại nhiều lần = mạng nhiều tầng.

> **💡 Vì sao phải có hàm phi tuyến giữa các layer?**
> Nếu xếp nhiều layer tuyến tính liên tiếp: \`y = W₃(W₂(W₁ x + b₁) + b₂) + b₃\`. Khai triển bằng kết hợp + phân phối: \`y = (W₃W₂W₁)x + (W₃W₂ b₁ + W₃ b₂ + b₃)\`. Tức là **tương đương 1 layer duy nhất** \`y = W'x + b'\` với \`W' = W₃W₂W₁\`. Không có sức biểu diễn phi tuyến → hàm activation là **bắt buộc**.

### 11.2 Batch processing — xử lý B sample cùng lúc

Thực tế ta không xử lý 1 sample mà một **batch** gồm \`B\` sample. Xếp các sample thành ma trận:

\`\`\`
X = [ x⁽¹⁾ x⁽²⁾ ... x⁽ᴮ⁾ ]   (cấp n × B, mỗi cột 1 sample)
hoặc
X = [ x⁽¹⁾ᵀ ]                 (cấp B × n, mỗi hàng 1 sample — phổ biến hơn)
    [ x⁽²⁾ᵀ ]
    [  ...  ]
    [ x⁽ᴮ⁾ᵀ ]
\`\`\`

Với cách 2 (\`B × n\` — chuẩn PyTorch/NumPy), forward pass:

\`\`\`
Y = X · Wᵀ + b      (broadcast b cho B hàng)
\`\`\`

\`Y\` cấp \`B × m\` — mỗi hàng là output cho 1 sample. **GPU** nhân ma trận \`(B × n)·(n × m)\` rất nhanh, nhanh hơn rất nhiều so với chạy B lần phép nhân vector. Đó là vì sao toàn bộ deep learning quy về **GEMM** (General Matrix Multiplication).

### 11.3 Attention trong Transformer — toàn nhân ma trận

Cơ chế **self-attention** của Transformer (cơ sở của GPT, BERT, ChatGPT) tính:

\`\`\`
Attention(Q, K, V) = softmax( QKᵀ / √dₖ ) · V
\`\`\`

Trong đó \`Q, K, V\` đều là ma trận (\`L × dₖ\`, \`L\` là số token trong câu, \`dₖ\` là chiều embedding). Bốc tách từng phép:

1. \`Q · Kᵀ\` — nhân ma trận \`(L × dₖ)·(dₖ × L) = (L × L)\` — **attention score** giữa mọi cặp token.
2. Chia \`√dₖ\` — scalar.
3. \`softmax\` theo hàng — chuẩn hóa thành phân phối xác suất.
4. Nhân với \`V\` \`(L × L)·(L × dₖ) = (L × dₖ)\` — **trộn** thông tin các token theo attention weight.

Toàn bộ là nhân ma trận. \`Q, K, V\` cũng được sinh từ input bằng nhân ma trận: \`Q = X·W_Q\`, \`K = X·W_K\`, \`V = X·W_V\`. Một mô hình LLM có **hàng tỷ** phép nhân ma trận mỗi forward pass.

> **💡 Trực giác**: khi GPU "tính" cho ChatGPT trả lời bạn, 95%+ thời gian là **nhân ma trận**. Hiểu được nhân ma trận là hiểu được "máy" đang làm gì.

### 11.4 Còn nhiều nữa

- **Linear regression**: nghiệm closed-form \`β = (XᵀX)⁻¹ Xᵀy\` — toàn ma trận.
- **PCA**: phân rã ma trận hiệp phương sai (sẽ học Lesson 08).
- **Word embedding**: ma trận embedding \`E\` cấp \`|V| × d\`, mỗi từ là một hàng.
- **Convolutional layer**: thực tế cũng được "duỗi" về một phép nhân ma trận lớn (im2col).

### 📝 Tóm tắt Mục 11

- Layer NN = \`y = Wx + b\` — một phép nhân ma trận với vector + bias.
- Batch = nhân ma trận với ma trận (\`X·Wᵀ\`).
- Attention = chuỗi 4-5 phép nhân ma trận + softmax.
- Hiểu nhân ma trận = hiểu nửa kia bài toán AI/ML.

---

## 12. Bài tập

Làm trước rồi hãy xem lời giải.

### Bài 1 — Cộng và scalar

Cho \`A = [[2, -1], [0, 3]]\`, \`B = [[1, 4], [-2, 5]]\`, \`c = 3\`. Tính \`c·A + B\` và \`A − B\`.

### Bài 2 — Nhân ma trận 2×2

Cho \`A = [[1, 2], [3, 4]]\`, \`B = [[2, 0], [1, 3]]\`. Tính \`AB\` và \`BA\`. Kiểm tra \`AB ≠ BA\`.

### Bài 3 — Nhân ma trận 2×3

Cho:
\`\`\`
A = [ 1  -1  2 ]      B = [  0  3 ]
    [ 0   2  1 ]          [  1  2 ]
                          [ -2  1 ]
\`\`\`

Tính \`AB\`. Hỏi tích \`BA\` có tồn tại không? Nếu có thì cấp bao nhiêu?

### Bài 4 — Transpose

Cho \`A = [[1, 2, 3], [4, 5, 6]]\`. Tính \`Aᵀ\`. Sau đó tính \`A·Aᵀ\` và \`Aᵀ·A\`. Cả hai có vuông không, cấp bao nhiêu?

### Bài 5 — Nghịch đảo 2×2

Cho \`A = [[3, 1], [5, 2]]\`. Tính \`det(A)\` và \`A⁻¹\`. Kiểm tra \`A·A⁻¹ = I\`.

### Bài 6 — Giải hệ bằng nghịch đảo

Giải hệ sau bằng cách viết dạng \`Ax = b\` và tính \`x = A⁻¹b\`:

\`\`\`
2x + y = 5
x + 3y = 10
\`\`\`

---

## 13. Lời giải chi tiết

### Lời giải Bài 1

**\`c·A\` với \`c = 3\`:** nhân \`3\` vào mọi phần tử của A.

\`\`\`
3·A = [ 3·2   3·(-1) ] = [  6  -3 ]
      [ 3·0   3·3    ]   [  0   9 ]
\`\`\`

**\`c·A + B\`:** cộng từng ô.

\`\`\`
3A + B = [  6+1   -3+4 ] = [  7   1 ]
         [  0+(-2) 9+5 ]   [ -2  14 ]
\`\`\`

**\`A − B = A + (-1)·B\`:**

\`\`\`
A − B = [ 2-1    -1-4 ] = [  1  -5 ]
        [ 0-(-2) 3-5  ]   [  2  -2 ]
\`\`\`

### Lời giải Bài 2

\`A = [[1, 2], [3, 4]]\`, \`B = [[2, 0], [1, 3]]\`.

**\`AB\`:**
- \`(AB)_11 = 1·2 + 2·1 = 4\`
- \`(AB)_12 = 1·0 + 2·3 = 6\`
- \`(AB)_21 = 3·2 + 4·1 = 10\`
- \`(AB)_22 = 3·0 + 4·3 = 12\`

\`\`\`
AB = [  4   6 ]
     [ 10  12 ]
\`\`\`

**\`BA\`:**
- \`(BA)_11 = 2·1 + 0·3 = 2\`
- \`(BA)_12 = 2·2 + 0·4 = 4\`
- \`(BA)_21 = 1·1 + 3·3 = 10\`
- \`(BA)_22 = 1·2 + 3·4 = 14\`

\`\`\`
BA = [  2   4 ]
     [ 10  14 ]
\`\`\`

So sánh: \`AB ≠ BA\` (vị trí (1,1) khác: 4 vs 2). Đây là minh họa cụ thể tính không giao hoán.

### Lời giải Bài 3

\`A\` cấp \`2×3\`, \`B\` cấp \`3×2\`. \`AB\` có cấp \`2×2\`.

- \`(AB)_11 = 1·0 + (-1)·1 + 2·(-2) = 0 - 1 - 4 = -5\`
- \`(AB)_12 = 1·3 + (-1)·2 + 2·1 = 3 - 2 + 2 = 3\`
- \`(AB)_21 = 0·0 + 2·1 + 1·(-2) = 0 + 2 - 2 = 0\`
- \`(AB)_22 = 0·3 + 2·2 + 1·1 = 0 + 4 + 1 = 5\`

\`\`\`
AB = [ -5   3 ]
     [  0   5 ]
\`\`\`

**\`BA\`?** Cấp: \`(3×2)·(2×3) = (3×3)\` — chiều giữa khớp (2=2), kết quả \`3×3\`. Vậy \`BA\` **tồn tại**, cấp \`3×3\`. Tính minh họa:

- \`(BA)_11 = 0·1 + 3·0 = 0\`
- \`(BA)_12 = 0·(-1) + 3·2 = 6\`
- \`(BA)_13 = 0·2 + 3·1 = 3\`
- \`(BA)_21 = 1·1 + 2·0 = 1\`
- \`(BA)_22 = 1·(-1) + 2·2 = 3\`
- \`(BA)_23 = 1·2 + 2·1 = 4\`
- \`(BA)_31 = -2·1 + 1·0 = -2\`
- \`(BA)_32 = -2·(-1) + 1·2 = 4\`
- \`(BA)_33 = -2·2 + 1·1 = -3\`

\`\`\`
BA = [  0   6   3 ]
     [  1   3   4 ]
     [ -2   4  -3 ]
\`\`\`

Quan sát: \`AB\` cấp \`2×2\`, \`BA\` cấp \`3×3\` — **cấp đã khác** nên \`AB ≠ BA\` đương nhiên.

### Lời giải Bài 4

\`A = [[1, 2, 3], [4, 5, 6]]\` cấp \`2×3\`.

\`\`\`
Aᵀ = [ 1  4 ]   cấp 3×2
     [ 2  5 ]
     [ 3  6 ]
\`\`\`

**\`A · Aᵀ\`** cấp \`(2×3)·(3×2) = (2×2)\`:
- \`(AAᵀ)_11 = 1·1 + 2·2 + 3·3 = 14\`
- \`(AAᵀ)_12 = 1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32\`
- \`(AAᵀ)_21 = 4·1 + 5·2 + 6·3 = 4 + 10 + 18 = 32\`
- \`(AAᵀ)_22 = 4·4 + 5·5 + 6·6 = 16 + 25 + 36 = 77\`

\`\`\`
A·Aᵀ = [ 14  32 ]      (vuông 2×2, đối xứng vì (AAᵀ)_12 = (AAᵀ)_21)
       [ 32  77 ]
\`\`\`

**\`Aᵀ · A\`** cấp \`(3×2)·(2×3) = (3×3)\`:
- \`(AᵀA)_11 = 1·1 + 4·4 = 17\`
- \`(AᵀA)_12 = 1·2 + 4·5 = 22\`
- \`(AᵀA)_13 = 1·3 + 4·6 = 27\`
- \`(AᵀA)_21 = 2·1 + 5·4 = 22\`
- \`(AᵀA)_22 = 2·2 + 5·5 = 29\`
- \`(AᵀA)_23 = 2·3 + 5·6 = 36\`
- \`(AᵀA)_31 = 3·1 + 6·4 = 27\`
- \`(AᵀA)_32 = 3·2 + 6·5 = 36\`
- \`(AᵀA)_33 = 3·3 + 6·6 = 45\`

\`\`\`
Aᵀ·A = [ 17  22  27 ]      (vuông 3×3, đối xứng)
       [ 22  29  36 ]
       [ 27  36  45 ]
\`\`\`

**Quan sát quan trọng**: cả \`A·Aᵀ\` và \`Aᵀ·A\` đều **vuông và đối xứng**. Đây là một quy luật chung — với mọi ma trận \`A\`, các tích \`AᵀA\` và \`AAᵀ\` đều luôn vuông & đối xứng. Tính chất này là nền tảng của **SVD** (Lesson 08).

### Lời giải Bài 5

\`A = [[3, 1], [5, 2]]\`.

\`det(A) = 3·2 − 1·5 = 6 − 5 = 1 ≠ 0\` → khả nghịch.

\`\`\`
A⁻¹ = (1/1) · [  2  -1 ] = [  2  -1 ]
              [ -5   3 ]   [ -5   3 ]
\`\`\`

**Kiểm tra \`A · A⁻¹ = I\`:**
- \`(AA⁻¹)_11 = 3·2 + 1·(-5) = 6 − 5 = 1\` ✓
- \`(AA⁻¹)_12 = 3·(-1) + 1·3 = -3 + 3 = 0\` ✓
- \`(AA⁻¹)_21 = 5·2 + 2·(-5) = 10 − 10 = 0\` ✓
- \`(AA⁻¹)_22 = 5·(-1) + 2·3 = -5 + 6 = 1\` ✓

\`\`\`
A·A⁻¹ = [ 1  0 ] = I   ✓
        [ 0  1 ]
\`\`\`

### Lời giải Bài 6

Viết hệ dưới dạng \`Ax = b\`:

\`\`\`
A = [ 2  1 ]      x = [ x ]      b = [  5 ]
    [ 1  3 ]          [ y ]          [ 10 ]
\`\`\`

\`det(A) = 2·3 − 1·1 = 6 − 1 = 5\`.

\`\`\`
A⁻¹ = (1/5) · [  3  -1 ] = [  3/5  -1/5 ] = [ 0.6  -0.2 ]
              [ -1   2 ]   [ -1/5   2/5 ]   [-0.2   0.4 ]
\`\`\`

Tính \`x = A⁻¹ b\`:
- \`x = 0.6·5 + (-0.2)·10 = 3 − 2 = 1\`
- \`y = -0.2·5 + 0.4·10 = -1 + 4 = 3\`

**Verify thay vào hệ:**
- \`2·1 + 1·3 = 2 + 3 = 5\` ✓
- \`1·1 + 3·3 = 1 + 9 = 10\` ✓

Nghiệm: \`(x, y) = (1, 3)\`.

---

## 14. Liên kết

- [← Lesson 04 — Độc lập tuyến tính](../lesson-04-linear-independence/)
- [→ Lesson 06 — Ma trận như phép biến đổi](../lesson-06-matrix-as-transform/)
- [→ Lesson 07 — Eigenvector & Eigenvalue](../lesson-07-eigenvectors/)
- [Algebra · Lesson 08 — Hệ phương trình tuyến tính](../../Algebra/lesson-08-linear-systems/) — tiền đề về \`Ax = b\`.

### Tham khảo thêm

- 3Blue1Brown — "Essence of Linear Algebra", tập 4 (Matrix multiplication) và 5 (Three-dimensional linear transformations).
- Gilbert Strang — *Introduction to Linear Algebra*, chương 2 và 3.

### File trong lesson

- [visualization.html](./visualization.html) — minh họa tương tác: nhân ma trận từng bước, non-commutativity, inverse 2×2, giải \`Ax = b\`.
`;
