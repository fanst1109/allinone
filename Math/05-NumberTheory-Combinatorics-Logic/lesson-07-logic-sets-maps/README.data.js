// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-07-logic-sets-maps/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Logic, tập hợp, ánh xạ

## Mục tiêu

- Hiểu **logic mệnh đề**: $\\land$, $\\lor$, $\\neg$, $\\to$, $\\leftrightarrow$.
- **Lượng từ**: $\\forall$ (forall), $\\exists$ (exists). Phủ định.
- **Tập hợp**: phép toán hợp, giao, hiệu, phần bù, tích Descartes.
- **Ánh xạ**: đơn ánh (injective), toàn ánh (surjective), song ánh (bijective).

## Kiến thức tiền đề

- Toán cơ bản.

---

## 1. Logic mệnh đề

💡 **Trực giác / Hình dung**: mệnh đề là câu "đúng/sai dứt khoát" — như công tắc chỉ có BẬT (T) hoặc TẮT (F). Các phép logic ($\\land$, $\\lor$, $\\neg$...) là "mạch điện" ghép các công tắc lại: AND như 2 công tắc nối tiếp (cả 2 bật mới thông), OR như 2 công tắc song song (1 cái bật là thông).

**Mệnh đề** = phát biểu **đúng** hoặc **sai** (không cả 2).

**4 ví dụ số đa dạng**:
- "$2+2 = 4$" → mệnh đề **đúng**.
- "7 là số chẵn" → mệnh đề **sai**.
- "$x + 1 = 5$" → KHÔNG phải mệnh đề (đúng/sai tùy x — gọi là vị từ).
- "Bạn khỏe không?" → KHÔNG phải mệnh đề (câu hỏi, không có giá trị đúng/sai).

### Phép toán logic

| Ký hiệu | Tên | Ý nghĩa |
|---------|-----|---------|
| $\\neg p$ | phủ định | "không p" |
| $p \\land q$ | và (AND) | "p và q" |
| $p \\lor q$ | hoặc (OR) | "p hoặc q" |
| $p \\to q$ | suy ra | "nếu p thì q" |
| $p \\leftrightarrow q$ | tương đương | "p khi và chỉ khi q" |

### Bảng chân trị

| p | q | $\\neg p$ | $p \\land q$ | $p \\lor q$ | $p \\to q$ | $p \\leftrightarrow q$ |
|---|---|----|-----|-----|-----|-----|
| T | T | F  | T   | T   | T   | T   |
| T | F | F  | F   | T   | F   | F   |
| F | T | T  | F   | T   | T   | F   |
| F | F | T  | F   | F   | T   | T   |

⚠ **$p \\to q$**: khi p sai, q gì cũng đúng ("ex falso quodlibet"). 

**Ví dụ**: "Nếu 1 = 2 thì tôi là Vua Anh" — về mặt logic là **đúng** (vì p sai).

### Quy luật De Morgan

$$\\begin{aligned}
\\neg(p \\land q) &= \\neg p \\lor \\neg q \\\\
\\neg(p \\lor q) &= \\neg p \\land \\neg q
\\end{aligned}$$

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $p \\to q$ đúng khi p sai?"* Vì $p \\to q$ chỉ "hứa hẹn": *nếu* p thì q. Khi p không xảy ra, lời hứa không bị vi phạm → mặc định đúng. Vd "nếu trời mưa thì tôi mang ô" — hôm trời không mưa, dù tôi có mang ô hay không, lời hứa vẫn không sai.
- *"$p \\to q$ và $q \\to p$ có giống nhau không?"* **Không**. $p \\to q$ (thuận) khác $q \\to p$ (đảo). Vd "mưa → ướt đường" đúng, nhưng "ướt đường → mưa" sai (có thể do tưới cây).

⚠ **Lỗi thường gặp — lẫn $p \\to q$ với chiều đảo $q \\to p$**. Chúng KHÔNG tương đương. Cái tương đương với $p \\to q$ là **phản đảo** $\\neg q \\to \\neg p$. Phản ví dụ kiểm bảng chân trị: với p=F, q=T: $p \\to q = T$ nhưng $q \\to p = F$ → khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. Dùng De Morgan, viết lại $\\neg(p \\land \\neg q)$.
2. Mệnh đề "Nếu 2 > 3 thì mặt trời lạnh" đúng hay sai?

<details><summary>Đáp án</summary>

1. $\\neg p \\lor \\neg(\\neg q) = \\neg p \\lor q$.
2. **Đúng** — vì p ("2 > 3") sai, nên $p \\to q$ đúng bất kể q.

</details>

### 📝 Tóm tắt mục 1

- Mệnh đề = câu đúng/sai dứt khoát (công tắc T/F).
- $p \\to q$ chỉ sai khi p đúng & q sai; p sai thì luôn đúng.
- De Morgan: $\\neg(p \\land q) = \\neg p \\lor \\neg q$. $p \\to q$ tương đương phản đảo $\\neg q \\to \\neg p$, KHÔNG phải đảo $q \\to p$.

---

## 2. Lượng từ

💡 **Trực giác / Hình dung**: $\\forall$ ("với mọi") là lời khẳng định mạnh — phải đúng cho **toàn bộ**, chỉ cần 1 phản ví dụ là sập. $\\exists$ ("tồn tại") là khẳng định yếu — chỉ cần **1 trường hợp** đúng là xong. Phủ định đảo vai: phá vỡ "mọi" = chỉ ra 1 ngoại lệ ($\\exists$ phản ví dụ); phá vỡ "tồn tại" = chứng minh không cái nào ($\\forall$ đều không).

- **$\\forall x$** = "với mọi x" (forall).
- **$\\exists x$** = "tồn tại x" (exists).

**4 ví dụ số đa dạng**:
- $\\forall x \\in \\mathbb{R}: x^2 \\ge 0$ — **đúng** (mọi số thực bình phương không âm).
- $\\exists x \\in \\mathbb{R}: x^2 = 4$ — **đúng** (x = 2 hoặc −2).
- $\\forall x \\in \\mathbb{R}: x^2 > 0$ — **sai** (phản ví dụ x = 0 cho 0).
- $\\exists x \\in \\mathbb{R}: x^2 = -1$ — **sai** (không số thực nào bình phương ra âm).

### Phủ định lượng từ

$$\\begin{aligned}
\\neg(\\forall x: P(x)) &= \\exists x: \\neg P(x) \\\\
\\neg(\\exists x: P(x)) &= \\forall x: \\neg P(x)
\\end{aligned}$$

💡 **Mẹo**: đổi $\\forall \\leftrightarrow \\exists$, và phủ định P.

**Ví dụ**: Phủ định "mọi hoa đều đẹp" = "tồn tại 1 hoa không đẹp".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phủ định mệnh đề có nhiều lượng từ thế nào?"* Đảo từng cái từ ngoài vào trong và phủ định lõi. Vd $\\neg(\\forall x\\ \\exists y: P(x,y)) = \\exists x\\ \\forall y: \\neg P(x,y)$. Mỗi $\\forall$ thành $\\exists$, mỗi $\\exists$ thành $\\forall$.
- *"Để bác bỏ '$\\forall x: P(x)$' tôi cần làm gì?"* Chỉ cần **1 phản ví dụ** (1 x làm P(x) sai). Vd bác bỏ "mọi số nguyên tố là lẻ" bằng p = 2.

⚠ **Lỗi thường gặp — phủ định lượng từ sai (không đổi $\\forall \\leftrightarrow \\exists$)**. Phủ định "mọi sinh viên đều đậu" KHÔNG phải "mọi sinh viên đều rớt", mà là "**tồn tại** 1 sinh viên rớt". Phản ví dụ minh hoạ: lớp 10 người, 9 đậu 1 rớt → "mọi người đậu" sai, "mọi người rớt" cũng sai, chỉ "tồn tại người rớt" mới đúng là phủ định.

🔁 **Dừng lại tự kiểm tra**

1. Phủ định "Mọi số chẵn đều chia hết cho 4".
2. Phủ định "Tồn tại học sinh đạt điểm 10".

<details><summary>Đáp án</summary>

1. "Tồn tại 1 số chẵn không chia hết cho 4" (vd 6 — đúng là phản ví dụ).
2. "Mọi học sinh đều không đạt điểm 10".

</details>

### 📝 Tóm tắt mục 2

- $\\forall$ = "với mọi" (1 phản ví dụ là sập); $\\exists$ = "tồn tại" (1 trường hợp đủ).
- Phủ định: đổi $\\forall \\leftrightarrow \\exists$ và phủ định lõi P.
- Bác bỏ $\\forall x: P(x)$ chỉ cần 1 phản ví dụ.

---

## 3. Tập hợp

💡 **Trực giác / Hình dung**: tập hợp là 1 "cái túi" chứa các phần tử phân biệt, không quan tâm thứ tự, không lặp. Các phép toán tập hợp tương ứng phép logic: **giao ($\\cap$)** = "và" ($\\land$), **hợp ($\\cup$)** = "hoặc" ($\\lor$), **phần bù** = "không" ($\\neg$). Vẽ biểu đồ Venn (vòng tròn chồng nhau) để "thấy" được.

### Định nghĩa & ký hiệu

- **$a \\in A$**: a là phần tử của A.
- **$A \\subset B$**: A là tập con của B.
- **$\\emptyset$**: tập rỗng.

### Phép toán

| Ký hiệu | Tên | Định nghĩa |
|---------|-----|------------|
| $A \\cup B$ | Hợp | $\\{x : x \\in A \\lor x \\in B\\}$ |
| $A \\cap B$ | Giao | $\\{x : x \\in A \\land x \\in B\\}$ |
| $A \\setminus B$ | Hiệu | $\\{x : x \\in A \\land x \\notin B\\}$ |
| $A^c$ | Phần bù | $U \\setminus A$ (U = tập vũ trụ) |
| $A \\times B$ | Tích Descartes | $\\{(a, b) : a \\in A, b \\in B\\}$ |

### Quan hệ De Morgan cho tập

$$\\begin{aligned}
(A \\cup B)^c &= A^c \\cap B^c \\\\
(A \\cap B)^c &= A^c \\cup B^c
\\end{aligned}$$

⟶ **Tương đồng với logic**: $\\cup \\leftrightarrow \\lor$, $\\cap \\leftrightarrow \\land$, $c \\leftrightarrow \\neg$.

**4 ví dụ số đa dạng** ($A = \\{1,2,3\\}$, $B = \\{2,3,4\\}$):
- $A \\cup B = \\{1,2,3,4\\}$ (hợp = gộp, không lặp).
- $A \\cap B = \\{2,3\\}$ (giao = chung).
- $A \\setminus B = \\{1\\}$ (hiệu = ở A nhưng không ở B).
- $|A \\times B| = 3\\cdot 3 = 9$ (tích Descartes có 9 cặp).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$A \\subset B$ và $A \\in B$ khác nhau thế nào?"* $\\subset$ là "tập con" (mọi phần tử của A đều ở B); $\\in$ là "phần tử". Vd với $B = \\{1, \\{1,2\\}\\}$: $\\{1,2\\} \\in B$ (là 1 phần tử), nhưng $\\{1,2\\} \\subset B$ thì sai ($2 \\notin B$).
- *"Tập n phần tử có bao nhiêu tập con?"* $2^n$ (mỗi phần tử "có hoặc không" trong tập con) — liên hệ L04. Vd $\\{1,2,3\\}$ có $2^3 = 8$ tập con.

⚠ **Lỗi thường gặp — lẫn $\\in$ (phần tử) và $\\subset$ (tập con)**. Phản ví dụ: với $A = \\{1,2,3\\}$, viết $1 \\subset A$ là SAI (1 không phải tập), phải $1 \\in A$ hoặc $\\{1\\} \\subset A$. Phần tử dùng $\\in$, tập con dùng $\\subset$.

🔁 **Dừng lại tự kiểm tra**

1. Cho $A = \\{1,2,3,4\\}$, $B = \\{3,4,5\\}$. Tính $A \\cap B$, $A \\cup B$, $A \\setminus B$.
2. $\\emptyset$ có bao nhiêu tập con?

<details><summary>Đáp án</summary>

1. $A \\cap B = \\{3,4\\}$; $A \\cup B = \\{1,2,3,4,5\\}$; $A \\setminus B = \\{1,2\\}$.
2. $2^0 = 1$ (chỉ có chính nó — tập rỗng là tập con của mọi tập).

</details>

### 📝 Tóm tắt mục 3

- Tập = túi phần tử phân biệt, không thứ tự; $\\cup/\\cap/$bù tương ứng $\\lor/\\land/\\neg$.
- De Morgan cho tập: $(A \\cup B)^c = A^c \\cap B^c$.
- $\\in$ (phần tử) $\\neq \\subset$ (tập con); tập n phần tử có $2^n$ tập con.

---

## 4. Ánh xạ (Functions)

### Định nghĩa

Ánh xạ **$f: A \\to B$** = quy tắc gán mỗi phần tử $a \\in A$ với **đúng 1** phần tử $b \\in B$. Viết $b = f(a)$.

- **Tập nguồn** (domain): A.
- **Tập đích** (codomain): B.
- **Ảnh** (image): $f(A) = \\{f(a) : a \\in A\\} \\subset B$.

### 3 loại ánh xạ đặc biệt

| Loại | Định nghĩa | Hình ảnh |
|------|------------|----------|
| **Đơn ánh** (injective, 1-1) | $f(a_1)=f(a_2) \\implies a_1=a_2$ | Mỗi $b \\in$ Ảnh ứng với $\\le 1$ a |
| **Toàn ánh** (surjective, onto) | $\\forall b \\in B, \\exists a: f(a)=b$ | Ảnh = B |
| **Song ánh** (bijective, 1-1 onto) | Cả đơn ánh và toàn ánh | Mỗi $b \\in B$ ứng với đúng 1 a |

> 📐 **Định nghĩa đầy đủ — Đơn ánh / Toàn ánh / Song ánh**
>
> **(a) Là gì**: 3 mức độ "tốt" của ánh xạ $f: A \\to B$. **Đơn ánh** = không có 2 đầu vào ra cùng đầu ra (mỗi a có ảnh riêng). **Toàn ánh** = mọi $b \\in B$ đều có ít nhất 1 a "tạo ra" nó (ảnh = B). **Song ánh** = vừa đơn ánh vừa toàn ánh = tương ứng 1-1 hoàn hảo.
>
> **(b) Vì sao cần**: Song ánh là điều kiện CẦN và ĐỦ để f có **hàm ngược** $f^{-1}$. Trong mã hoá, nén dữ liệu: phải song ánh (mã hoá ngược được). Trong toán: dùng để định nghĩa "đếm được" (tập đếm được = có song ánh với $\\mathbb{N}$ → $\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}$ đếm được; $\\mathbb{R}$ KHÔNG đếm được — chứng minh Cantor). Trong AI: muốn invert layer của neural network → cần song ánh (lưu lượng thông tin).
>
> **(c) Ví dụ số**: $f: \\mathbb{N} \\to \\mathbb{N}$, $f(n) = 2n$. Đơn ánh ✓ ($n_1 \\neq n_2 \\to 2n_1 \\neq 2n_2$). Toàn ánh ✗ (số lẻ không có nguồn). $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2$. Đơn ánh ✗ ($f(2)=f(-2)=4$). Toàn ánh ✗ (số âm không có nguồn). $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3$. Đơn ✓ (tăng nghiêm ngặt), Toàn ✓ → **song ánh**. Ngược $f^{-1}(y) = \\sqrt[3]{y}$. $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 2x+1$: song ánh (mọi đường thẳng $a \\neq 0$), $f^{-1}(y) = (y-1)/2$.

💡 **Trực giác**:
- Đơn ánh = "không có 2 đầu vào ra cùng đầu ra".
- Toàn ánh = "mọi đầu ra trong B đều có 1 nguồn".
- Song ánh = "tương ứng 1-1 hoàn hảo".

### Ví dụ

- $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2$ → **không** đơn ánh ($f(2) = f(-2)$), **không** toàn ánh (không có x: $f(x) = -1$).
- $f: \\mathbb{R} \\to [0,\\infty)$, $f(x) = x^2$ → **không** đơn ánh, **toàn** ánh.
- $f: [0,\\infty) \\to [0,\\infty)$, $f(x) = x^2$ → **song** ánh.
- $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = e^x$ → đơn ánh nhưng không toàn ánh.
- $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 2x + 3$ → **song ánh** (mọi hàm bậc 1 với $a \\neq 0$).

### Hàm hợp & hàm ngược

- **Hàm hợp** $(g \\circ f)(x) = g(f(x))$.
- **Hàm ngược**: chỉ tồn tại khi f là **song ánh**. $f^{-1}(b) = a \\iff f(a) = b$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cùng công thức $f(x) = x^2$ sao khi đơn ánh khi không?"* Phụ thuộc **tập nguồn**. Trên $\\mathbb{R}$: không đơn ánh ($f(2)=f(-2)$). Trên $[0,\\infty)$: đơn ánh (chỉ phần $x \\ge 0$). Định nghĩa ánh xạ gồm cả công thức LẪN tập nguồn/đích.
- *"Tính toàn ánh phụ thuộc gì?"* Phụ thuộc **tập đích B**. $f(x)=x^2$ lên $\\mathbb{R}$ không toàn ánh (số âm thiếu nguồn); lên $[0,\\infty)$ thì toàn ánh (ảnh phủ kín đích).

⚠ **Lỗi thường gặp — kết luận song ánh chỉ nhìn công thức, bỏ qua tập nguồn/đích**. Phản ví dụ: $f(x) = x^2$ "có vẻ" 1-1 nhưng trên $\\mathbb{R}$ thì KHÔNG đơn ánh ($f(3)=f(-3)=9$) và KHÔNG toàn ánh ($f(x)=-4$ vô nghiệm). Phải xét rõ A và B mới kết luận được.

🔁 **Dừng lại tự kiểm tra**

1. $f: \\mathbb{R} \\to \\mathbb{R}, f(x) = x + 5$. Song ánh không? Hàm ngược?
2. $f: \\mathbb{N} \\to \\mathbb{N}, f(n) = n + 1$. Đơn ánh? Toàn ánh?

<details><summary>Đáp án</summary>

1. **Song ánh** (hàm bậc 1, hệ số $\\neq 0$). $f^{-1}(y) = y - 5$.
2. Đơn ánh ✓ ($n_1 \\neq n_2 \\to n_1+1 \\neq n_2+1$). Toàn ánh ✗ (số 0 không có nguồn: không $n \\in \\mathbb{N}$ nào cho $f(n)=0$).

</details>

### 📝 Tóm tắt mục 4

- Ánh xạ gồm công thức + tập nguồn A + tập đích B.
- Đơn ánh (1-1), toàn ánh (ảnh = B), song ánh (cả hai).
- Hàm ngược tồn tại $\\iff$ song ánh. Đơn/toàn phụ thuộc A và B, không chỉ công thức.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Lập bảng chân trị cho $p \\land (\\neg q \\lor p)$.

**Bài 2**: Phủ định "Mọi sinh viên đều có máy tính".

**Bài 3**: Cho $A = \\{1, 2, 3\\}$, $B = \\{3, 4\\}$. Tính $A \\cup B$, $A \\cap B$, $A \\setminus B$, $A \\times B$.

**Bài 4**: $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3$. Có đơn ánh không? Toàn ánh? Song ánh?

**Bài 5**: $f: \\mathbb{N} \\to \\mathbb{N}$, $f(n) = 2n$. Đơn ánh? Toàn ánh?

### Lời giải

**Bài 1**: 

| p | q | $\\neg q$ | $\\neg q \\lor p$ | $p \\land (\\neg q \\lor p)$ |
|---|---|----|------|----------|
| T | T | F  | T    | T        |
| T | F | T  | T    | T        |
| F | T | F  | F    | F        |
| F | F | T  | T    | F        |

⟶ $= p$ (đơn giản hơn).

**Bài 2**: "Tồn tại 1 sinh viên không có máy tính".

**Bài 3**: $A \\cup B = \\{1,2,3,4\\}$. $A \\cap B = \\{3\\}$. $A \\setminus B = \\{1, 2\\}$. $A \\times B = \\{(1,3),(1,4),(2,3),(2,4),(3,3),(3,4)\\}$ — 6 cặp.

**Bài 4**: $f(x) = x^3$ tăng nghiêm ngặt → đơn ánh ✓. $f(\\mathbb{R}) = \\mathbb{R}$ → toàn ánh ✓. → **Song ánh**. Hàm ngược: $f^{-1}(y) = \\sqrt[3]{y}$.

**Bài 5**: Đơn ánh ✓ ($n_1 \\neq n_2 \\to 2n_1 \\neq 2n_2$). Toàn ánh ✗ (số lẻ không có nghịch ảnh).

---

## 6. Bài tiếp theo

[Lesson 08 — Phương pháp chứng minh](../lesson-08-proof-methods/).

## 📝 Tổng kết

1. **Logic**: $\\neg, \\land, \\lor, \\to, \\leftrightarrow$. De Morgan: $\\neg(p \\land q) = \\neg p \\lor \\neg q$.
2. **Lượng từ**: $\\neg\\forall = \\exists\\neg$, $\\neg\\exists = \\forall\\neg$.
3. **Tập hợp**: $\\cup, \\cap, \\setminus, c, \\times$. Tương đồng với logic.
4. **Ánh xạ**: đơn ánh (1-1), toàn ánh (onto), song ánh (1-1 onto).
5. Hàm ngược **chỉ tồn tại** khi f là song ánh.
`;
