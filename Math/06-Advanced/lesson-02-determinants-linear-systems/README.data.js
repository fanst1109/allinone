// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-02-determinants-linear-systems/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Định thức & Hệ tuyến tính

## Mục tiêu

- Tính **định thức** ma trận 2×2, 3×3.
- Ý nghĩa hình học: **tỉ lệ phóng đại diện tích/thể tích**.
- Giải **hệ tuyến tính** bằng Cramer, Gauss.
- Ma trận khả nghịch $\\iff \\det \\neq 0$.

## Kiến thức tiền đề

- [Lesson 01 — Vector & ma trận](../lesson-01-vectors-matrices/).

---

## 1. Định thức 2×2

💡 **Trực giác / Hình dung**: định thức = **hệ số co giãn diện tích** của phép biến đổi. Hình vuông đơn vị (cạnh 1, diện tích 1) sau khi qua máy $A$ biến thành hình bình hành; $|\\det A|$ = diện tích hình bình hành đó. $\\det = 2 \\to$ diện tích phình gấp đôi; $\\det = 0 \\to$ hình vuông bị "bẹp" thành đoạn thẳng (diện tích 0); $\\det < 0 \\to$ hình bị **lật mặt** (như soi gương). Hai cột của $A$ chính là 2 cạnh của hình bình hành.

$$\\det\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = a\\cdot d - b\\cdot c$$

**4 ví dụ số đa dạng**:
- $\\det\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 1\\cdot 4 - 2\\cdot 3 = \\mathbf{-2}$ (phình ×2 và lật).
- $\\det\\begin{vmatrix} 2 & 0 \\\\ 0 & 3 \\end{vmatrix} = 2\\cdot 3 - 0 = \\mathbf{6}$ (giãn x gấp 2, y gấp 3 → diện tích ×6).
- $\\det\\begin{vmatrix} 1 & 2 \\\\ 2 & 4 \\end{vmatrix} = 1\\cdot 4 - 2\\cdot 2 = \\mathbf{0}$ (2 cột tỉ lệ → bẹp).
- $\\det\\begin{vmatrix} 1 & 0 \\\\ 0 & 1 \\end{vmatrix} = 1$ (đơn vị → không đổi diện tích).

### Ý nghĩa hình học

$|\\det(A)|$ = **tỉ lệ phóng đại diện tích** khi $A$ biến đổi mặt phẳng.

- $|\\det| > 1$: phóng to.
- $|\\det| = 1$: bảo toàn diện tích.
- $|\\det| < 1$: thu nhỏ.
- $\\det = 0$: vắt phẳng (collapse) — chiều giảm.
- $\\det < 0$: lật (reverse orientation).

**Ví dụ**: Ma trận quay $R(\\theta)$ có $\\det = \\cos^2\\theta + \\sin^2\\theta = \\mathbf{1}$ → bảo toàn diện tích, không lật.

> 📐 **Định nghĩa đầy đủ — Định thức det(A)**
>
> **(a) Là gì**: 1 số duy nhất tính từ ma trận vuông $A$, đo "diện tích/thể tích" mà $A$ tạo ra khi biến đổi hình vuông/lập phương đơn vị. **$|\\det A|$** = tỉ lệ phóng đại. **Dấu $\\det A$**: dương → bảo toàn hướng, âm → lật. **$\\det A = 0$** → $A$ "vắt" không gian xuống chiều thấp hơn.
>
> **(b) Vì sao cần**: Định thức cho biết ngay tính chất quan trọng nhất của ma trận: **khả nghịch hay không**. $\\det \\neq 0 \\iff A^{-1}$ tồn tại $\\iff$ hệ $A\\vec{x} = \\vec{b}$ có nghiệm duy nhất. Trong giải tích đa biến: định thức Jacobian quyết định đổi biến tích phân (phép biến đổi thể tích). Trong vật lý: $\\det = 0 \\to$ hệ "thoái hoá" (vd 3 vector phụ thuộc tuyến tính = đồng phẳng). Cốt lõi của Cramer (giải hệ tuyến tính), Wronskian (ODE), tính eigenvalue ($\\det(A-\\lambda I) = 0$).
>
> **(c) Ví dụ số**: $\\det\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 4-6 = \\mathbf{-2}$ → $A$ phóng diện tích 2 lần và lật. $\\det\\begin{vmatrix} 2 & 0 \\\\ 0 & 3 \\end{vmatrix} = 6$ → $A$ phóng $\\times 6$ (như nén/dãn theo 2 chiều khác nhau). $\\det\\begin{vmatrix} 1 & 2 \\\\ 2 & 4 \\end{vmatrix} = 0$ → 2 cột phụ thuộc (cột 2 = 2·cột 1) → $A$ "vắt" mặt phẳng xuống 1 đường thẳng → KHÔNG khả nghịch. $\\det R(60°) = \\cos^2 60° + \\sin^2 60° = 0.25 + 0.75 = \\mathbf{1}$ ✓. $\\det(AB) = \\det A \\cdot \\det B$ (nhân chia tỉ lệ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công thức lại là $ad - bc$ mà không phải $ad + bc$?"* Vì dấu trừ ghi lại "hướng": nếu cột 2 nằm bên trái cột 1 (xoay ngược chiều), diện tích tính ra **âm** = bị lật. Phép trừ là cách đại số bắt được orientation đó.
- *"$\\det$ âm thì diện tích âm à?"* Diện tích thật luôn $\\ge 0$ — ta lấy $\\mathbf{|\\det|} = 2$. Dấu âm chỉ báo phép biến đổi đã **lật** mặt phẳng (như lật bàn tay trái ↔ phải).

⚠ **Lỗi thường gặp — nhầm thứ tự thành $bc - ad$ hoặc $ab - cd$**. Đúng là $\\mathbf{ad - bc}$: nhân **đường chéo chính** ($a\\cdot d$) trừ **đường chéo phụ** ($b\\cdot c$). Phản ví dụ: $\\det\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 1\\cdot 4 - 2\\cdot 3 = -2$, KHÔNG phải $1\\cdot 2 - 3\\cdot 4 = -10$ (nhầm nhân theo hàng).

🔁 **Dừng lại tự kiểm tra**

1. Tính $\\det\\begin{vmatrix} 5 & 2 \\\\ 3 & 1 \\end{vmatrix}$.
2. $\\det = 0$ nói lên điều gì về ma trận?

<details><summary>Đáp án</summary>

1. $5\\cdot 1 - 2\\cdot 3 = 5 - 6 = \\mathbf{-1}$.
2. Ma trận **không khả nghịch**; biến đổi "bẹp" không gian xuống chiều thấp hơn (diện tích/thể tích → 0); 2 cột phụ thuộc tuyến tính.

</details>

### 📝 Tóm tắt mục 1

- $\\det$ $2\\times 2 = ad - bc$ (chéo chính trừ chéo phụ).
- $|\\det|$ = hệ số co giãn diện tích; dấu $< 0$ = lật hướng; = 0 = bẹp.
- $\\det = 0 \\iff$ không khả nghịch $\\iff$ cột phụ thuộc tuyến tính.

---

## 2. Định thức 3×3

💡 **Trực giác / Hình dung**: $\\det$ $3\\times 3$ = **hệ số co giãn thể tích** (mở rộng diện tích lên 3 chiều). Hình lập phương đơn vị (thể tích 1) thành khối hộp xiên (parallelepiped); $|\\det|$ = thể tích khối đó. $\\det = 0 \\to$ khối bị bẹp thành mặt phẳng (3 vector đồng phẳng). Công thức "khai triển theo hàng 1" = chẻ bài toán $3\\times 3$ thành 3 bài $2\\times 2$ nhỏ hơn.

$$\\det\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = a\\cdot(ei-fh) - b\\cdot(di-fg) + c\\cdot(dh-eg)$$

(Khai triển theo hàng 1. Chú ý dấu **+ − +** xen kẽ.)

**Walk-through bằng số** — $\\det\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{vmatrix}$:
- $a\\cdot(ei-fh) = 1\\cdot(1\\cdot 0 - 4\\cdot 6) = 1\\cdot(-24) = -24$.
- $- b\\cdot(di-fg) = -2\\cdot(0\\cdot 0 - 4\\cdot 5) = -2\\cdot(-20) = +40$.
- $+ c\\cdot(dh-eg) = +3\\cdot(0\\cdot 6 - 1\\cdot 5) = 3\\cdot(-5) = -15$.
- Tổng $= -24 + 40 - 15 = \\mathbf{1}$.

⟶ Tổng quát: định thức $n\\times n$ có $\\mathbf{n!}$ số hạng — tăng cực nhanh ($4\\times 4$ có 24, $10\\times 10$ có hơn 3.6 triệu) → thực tế dùng Gauss thay vì khai triển.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dấu +, −, + lấy ở đâu ra?"* Quy luật bàn cờ $(-1)^{i+j}$: vị trí $(1,1)$ là +, $(1,2)$ là −, $(1,3)$ là +. Quên dấu này là lỗi phổ biến nhất.
- *"Có thể khai triển theo hàng/cột khác không?"* Có — kết quả không đổi. **Mẹo**: chọn hàng/cột có nhiều số 0 nhất để bớt tính (số 0 nhân gì cũng = 0).

⚠ **Lỗi thường gặp — quên dấu trừ ở hạng tử giữa**. Hạng tử $b$ mang dấu **−**. Phản ví dụ: nếu cộng nhầm thành $a(ei-fh) + b(di-fg) + c(dh-eg)$ cho ma trận trên $= -24 - 40 - 15 = -79 \\neq 1$. Sai hoàn toàn.

🔁 **Dừng lại tự kiểm tra**

1. Tính $\\det$ của ma trận đường chéo $\\begin{vmatrix} 2 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 4 \\end{vmatrix}$.
2. Một ma trận $3\\times 3$ có 1 hàng toàn 0 thì $\\det$ bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Với ma trận đường chéo, $\\det$ = tích đường chéo $= 2\\cdot 3\\cdot 4 = \\mathbf{24}$.
2. **0** — khai triển theo hàng 0 đó cho mọi hạng tử = 0 (hình học: khối bị bẹp).

</details>

### 📝 Tóm tắt mục 2

- $\\det$ $3\\times 3$ = khai triển hàng 1 với dấu **+ − +**, mỗi hạng tử là số × định thức $2\\times 2$.
- $|\\det$ $3\\times 3|$ = hệ số co giãn thể tích; = 0 $\\iff$ 3 vector đồng phẳng.
- Chọn hàng/cột nhiều số 0 để tính nhanh; $n\\times n$ có $n!$ hạng tử → dùng Gauss khi n lớn.

---

## 3. Tính chất định thức

💡 **Trực giác / Hình dung**: mọi tính chất đều suy ra từ "$\\det$ = hệ số co giãn thể tích". Vd $\\det(AB) = \\det A \\cdot \\det B$ vì làm 2 phép biến đổi liên tiếp → thể tích nhân 2 hệ số. $\\det(cA) = c^n\\cdot\\det A$ vì nhân $c$ phóng **mỗi trong n chiều** lên $c$ lần → thể tích nhân $c^n$.

1. **$\\det(I) = 1$** (không biến đổi → giữ nguyên thể tích).
2. **$\\det(A\\cdot B) = \\det(A)\\cdot\\det(B)$** (rất quan trọng).
3. **$\\det(A^T) = \\det(A)$**.
4. **$\\det(c\\cdot A) = c^n\\cdot\\det(A)$** ($A$ $n\\times n$, $c$ số).
5. Đổi 2 hàng → $\\det$ đổi dấu.
6. 2 hàng giống nhau → $\\det = 0$.
7. Hàng nhân $c$ → $\\det$ nhân $c$.

**Verify bằng số**:
- $\\det(AB) = \\det A\\cdot\\det B$: $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ ($\\det -2$), $B = \\begin{bmatrix} 2 & 0 \\\\ 1 & 1 \\end{bmatrix}$ ($\\det 2$). $AB = \\begin{bmatrix} 4 & 2 \\\\ 10 & 4 \\end{bmatrix}$, $\\det = 16 - 20 = -4 = (-2)\\cdot 2$ ✓.
- $\\det(cA) = c^n\\cdot\\det A$: $A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$ ($n=2$, $\\det 1$), $c=3$. $3A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$, $\\det = 9 = 3^2\\cdot 1$ ✓.
- 2 hàng giống → 0: $\\det\\begin{vmatrix} 1 & 2 \\\\ 1 & 2 \\end{vmatrix} = 1\\cdot 2 - 2\\cdot 1 = \\mathbf{0}$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\det(A+B) = \\det A + \\det B$ đúng không?"* **Sai hoàn toàn**. Phản ví dụ: $A = B = I$ ($2\\times 2$). $\\det A + \\det B = 1+1 = 2$, nhưng $\\det(A+B) = \\det(2I) = 4$. Định thức **không** cộng tính.
- *"Vì sao đổi 2 hàng lại đổi dấu $\\det$?"* Vì đổi 2 cạnh của khối = lật hướng (orientation) → dấu đảo. Đây cũng là vì sao 2 hàng giống nhau cho $\\det = 0$ (đổi 2 hàng giống nhau: $\\det = -\\det \\to \\det = 0$).

⚠ **Lỗi thường gặp — quên số mũ n trong $\\det(cA)$**. Nhiều người viết $\\det(cA) = c\\cdot\\det A$. Sai: phải là $\\mathbf{c^n}$. Phản ví dụ $3\\times 3$: $\\det(2I_3) = 2^3\\cdot 1 = 8$, không phải $2\\cdot 1 = 2$.

🔁 **Dừng lại tự kiểm tra**

1. $\\det A = 5$. Tính $\\det(A^2)$ và $\\det(A^{-1})$.
2. $A$ là $3\\times 3$, $\\det A = 4$. Tính $\\det(2A)$.

<details><summary>Đáp án</summary>

1. $\\det(A^2) = \\det A \\cdot \\det A = 25$. $\\det(A^{-1}) = 1/\\det A = \\mathbf{1/5}$ (vì $\\det A\\cdot\\det A^{-1} = \\det I = 1$).
2. $\\det(2A) = 2^3\\cdot 4 = \\mathbf{32}$.

</details>

### 📝 Tóm tắt mục 3

- $\\det(AB) = \\det A\\cdot\\det B$; $\\det(A^T) = \\det A$; $\\det(cA) = c^n \\det A$; $\\det(A^{-1}) = 1/\\det A$.
- Đổi 2 hàng → đổi dấu; 2 hàng giống nhau hoặc hàng toàn 0 → $\\det = 0$.
- $\\det$ **không** cộng tính: $\\det(A+B) \\neq \\det A + \\det B$.

---

## 4. Hệ tuyến tính — $A\\vec{x} = \\vec{b}$

💡 **Trực giác / Hình dung**: giải $A\\vec{x} = \\vec{b}$ = hỏi "**vector $\\vec{x}$ nào** sau khi qua máy $A$ thì ra đúng $\\vec{b}$?". Nếu $A$ khả nghịch (có nút undo $A^{-1}$), chỉ việc undo: $\\vec{x} = A^{-1}\\vec{b}$. Nếu $A$ bẹp ($\\det = 0$), nhiều $\\vec{x}$ khác nhau có thể ra cùng $\\vec{b}$ (vô số nghiệm) hoặc $\\vec{b}$ nằm ngoài vùng $A$ vươn tới được (vô nghiệm). Hình học 2 biến: mỗi phương trình là 1 đường thẳng; nghiệm = giao điểm.

**Mẫu**: cho ma trận $A$ ($n\\times n$), vector $\\vec{b}$. Tìm $\\vec{x}$.

$$A\\cdot\\vec{x} = \\vec{b}$$

**Trường hợp khả nghịch**: $A^{-1}$ tồn tại $\\iff \\det(A) \\neq 0$. Khi đó:

$$\\vec{x} = A^{-1}\\cdot\\vec{b}$$

❓ **Câu hỏi tự nhiên của người đọc**

- *"2 đường thẳng song song thì sao?"* Không giao → **vô nghiệm**. Đại số: $\\det = 0$ và $\\vec{b}$ "lệch khỏi" ảnh của $A$. Vd \`x + y = 1\` và \`x + y = 2\`.
- *"2 đường trùng nhau?"* Mọi điểm trên đường đều là nghiệm → **vô số nghiệm**. Vd \`x + y = 1\` và \`2x + 2y = 2\`.

📝 *(Tóm tắt mục này gộp chung với phân loại nghiệm ở mục 7.)*

---

## 5. Quy tắc Cramer

🎯 **Phát biểu**: Cho $A$ khả nghịch ($\\det \\neq 0$):

$$x_i = \\frac{\\det(A_i)}{\\det(A)}$$

trong đó **$A_i$** = ma trận $A$ với cột thứ i thay bằng $\\vec{b}$.

**Ví dụ**: Giải hệ:

$$\\begin{cases} 2x + y = 5 \\\\ x + 3y = 10 \\end{cases}$$

$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, $\\vec{b} = (5, 10)$. $\\det(A) = 6 - 1 = 5$.

- $A_1 = \\begin{bmatrix} 5 & 1 \\\\ 10 & 3 \\end{bmatrix} \\to \\det = 15 - 10 = 5$. $x = 5/5 = \\mathbf{1}$.
- $A_2 = \\begin{bmatrix} 2 & 5 \\\\ 1 & 10 \\end{bmatrix} \\to \\det = 20 - 5 = 15$. $y = 15/5 = \\mathbf{3}$.

**Kiểm tra**: $2\\cdot 1 + 3 = 5$ ✓. $1 + 9 = 10$ ✓.

💡 **Trực giác / Hình dung**: Cramer = "cách diện tích". Mỗi $x_i$ = (diện tích thay cột i bằng $\\vec{b}$) / (diện tích gốc). Trực quan đẹp nhưng **chỉ thực dụng khi n nhỏ** (2, 3) vì mỗi biến cần 1 định thức.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao Cramer chỉ dùng cho n nhỏ?"* Vì n biến cần $(n+1)$ định thức, mỗi định thức $n\\times n$ tốn $O(n!)$ khi khai triển → bùng nổ. Hệ 20 biến: Gauss ăn đứt.
- *"$\\det(A) = 0$ thì Cramer ra sao?"* Công thức chia cho 0 → **không dùng được**. Phải chuyển sang Gauss để phân loại vô nghiệm/vô số nghiệm.

⚠ **Lỗi thường gặp — thay nhầm cột hoặc quên chia cho $\\det(A)$**. $x_i = \\det(A_i)/\\det(A)$, trong đó $A_i$ thay **cột i** (không phải hàng i) bằng $\\vec{b}$. Phản ví dụ: ở trên nếu quên chia $\\det(A)=5$, sẽ ra $x = 5$ (sai), đáp số đúng $x = 5/5 = 1$.

🔁 **Dừng lại tự kiểm tra**

1. Dùng Cramer giải: $x + y = 3$, $x - y = 1$.

<details><summary>Đáp án</summary>

$A = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}$, $\\det = -2$. $A_1 = \\begin{bmatrix} 3 & 1 \\\\ 1 & -1 \\end{bmatrix}$, $\\det = -3-1 = -4 \\to x = -4/-2 = \\mathbf{2}$. $A_2 = \\begin{bmatrix} 1 & 3 \\\\ 1 & 1 \\end{bmatrix}$, $\\det = 1-3 = -2 \\to y = -2/-2 = \\mathbf{1}$. Kiểm: $2+1=3$ ✓, $2-1=1$ ✓.

</details>

### 📝 Tóm tắt mục 5

- Cramer: $x_i = \\det(A_i)/\\det(A)$, $A_i$ thay **cột i** bằng $\\vec{b}$.
- Yêu cầu $\\det(A) \\neq 0$; chỉ thực dụng cho n nhỏ (2–3).
- Luôn nhớ chia cho $\\det(A)$; thay đúng cột.

---

## 6. Phương pháp Gauss — Khử biến

💡 **Trực giác / Hình dung**: Gauss = "dọn dẹp hệ phương trình từ trên xuống". Khử dần biến để hàng cuối chỉ còn 1 ẩn (giải ngay), rồi thế ngược lên. Giống giải hệ tay nhưng có quy trình máy móc — máy tính dùng đúng cách này.

🎯 **Ý tưởng**: Biến đổi hàng để đưa ma trận về dạng **tam giác trên**, rồi giải ngược.

**3 phép biến đổi hàng cơ bản**:
1. Đổi 2 hàng.
2. Nhân hàng với số ≠ 0.
3. Cộng hàng vào hàng khác (sau khi nhân hằng).

### Ví dụ

$$\\begin{cases} 2x + y + z = 5 \\\\ x + 3y + 2z = 11 \\\\ 3x + y + 4z = 12 \\end{cases}$$

Bước 1 (hàng 1 chia 2):

$$\\begin{cases} x + 0.5y + 0.5z = 2.5 \\\\ x + 3y + 2z = 11 \\\\ 3x + y + 4z = 12 \\end{cases}$$

Bước 2 (hàng 2 trừ hàng 1, hàng 3 trừ 3·hàng 1):

$$\\begin{cases} x + 0.5y + 0.5z = 2.5 \\\\ 2.5y + 1.5z = 8.5 \\\\ -0.5y + 2.5z = 4.5 \\end{cases}$$

Bước 3 (hàng 2 chia 2.5):

$$\\begin{cases} y + 0.6z = 3.4 \\\\ -0.5y + 2.5z = 4.5 \\end{cases}$$

Bước 4 (hàng 3 cộng 0.5·hàng 2):

$$\\begin{cases} y + 0.6z = 3.4 \\\\ 2.8z = 6.2 \\end{cases}$$

Giải ngược: $z = 6.2/2.8 \\approx 2.214$. $y = 3.4 - 0.6\\cdot 2.214 \\approx 2.07$. $x = 2.5 - 0.5\\cdot 2.07 - 0.5\\cdot 2.214 \\approx 0.36$.

⟶ Gauss luôn giải được, không cần tính định thức.

❓ **Câu hỏi tự nhiên của người đọc**

- *"3 phép biến đổi hàng có làm đổi nghiệm không?"* **Không** — cả 3 đều cho hệ tương đương (cùng tập nghiệm). Đổi hàng = đổi thứ tự phương trình; nhân hàng = nhân cả 2 vế; cộng hàng = cộng 2 phương trình. Nghiệm không đổi.
- *"Gặp số 0 ở vị trí 'pivot' (đường chéo) thì sao?"* **Đổi hàng** với một hàng phía dưới có pivot $\\neq 0$. Nếu cả cột dưới đó đều 0 → hệ suy biến (vô số hoặc vô nghiệm).

⚠ **Lỗi thường gặp — chỉ trừ hệ số mà quên trừ vế phải b**. Mỗi phép cộng/trừ hàng phải áp dụng cho **toàn bộ hàng kể cả cột b**. Phản ví dụ: nếu khử "hàng 2 − hàng 1" mà quên cập nhật vế phải ($11 - 2.5 = 8.5$), $z$ sẽ ra sai hoàn toàn.

🔁 **Dừng lại tự kiểm tra**

1. Giải bằng Gauss: $x + y = 4$; $2x + y = 5$.

<details><summary>Đáp án</summary>

Hàng 2 − 2·hàng 1: $(2x+y) - 2(x+y) = 5 - 8 \\to -y = -3 \\to y = 3$. Thế lại: $x = 4 - 3 = \\mathbf{1}$. Nghiệm $(1, 3)$. Kiểm: $2\\cdot 1+3 = 5$ ✓.

</details>

### 📝 Tóm tắt mục 6

- Gauss đưa hệ về tam giác trên rồi thế ngược; 3 phép biến đổi hàng giữ nguyên nghiệm.
- Thực dụng hơn Cramer khi n lớn; không cần định thức.
- Luôn cập nhật cả vế phải b; gặp pivot 0 thì đổi hàng.

---

## 7. Phân loại nghiệm hệ $A\\vec{x} = \\vec{b}$

💡 **Trực giác / Hình dung** (2 biến): mỗi phương trình = 1 đường thẳng. Cắt nhau 1 điểm → 1 nghiệm; song song → vô nghiệm; trùng nhau → vô số nghiệm. $\\det \\neq 0$ đảm bảo 2 đường "thật sự cắt nhau".

| $\\det(A)$ | $\\vec{b}$ | Số nghiệm |
|--------|---|-----------|
| $\\neq 0$ | bất kỳ | **1 nghiệm duy nhất** |
| $= 0$ | thuộc $\\text{Image}(A)$ | **vô số nghiệm** |
| $= 0$ | không thuộc $\\text{Image}(A)$ | **vô nghiệm** |

**3 ví dụ số**:
- 1 nghiệm: $x+y=3$, $x-y=1$ ($\\det=-2\\neq 0$) → $(2,1)$.
- Vô số nghiệm: $x+y=1$, $2x+2y=2$ ($\\det=0$, hàng 2 = 2·hàng 1, tương thích) → cả đường $y=1-x$.
- Vô nghiệm: $x+y=1$, $x+y=2$ ($\\det=0$, mâu thuẫn $1\\neq 2$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao phân biệt vô số nghiệm với vô nghiệm khi $\\det = 0$?"* Chạy Gauss: nếu được hàng dạng \`0 = 0\` → vô số nghiệm; nếu được \`0 = (số ≠ 0)\` (vd \`0 = 1\`) → mâu thuẫn → vô nghiệm.

⚠ **Lỗi thường gặp — kết luận "vô nghiệm" ngay khi thấy $\\det = 0$**. $\\det = 0$ chỉ loại bỏ "1 nghiệm duy nhất"; vẫn có thể là **vô số** nghiệm. Phải kiểm thêm bằng Gauss như trên.

🔁 **Dừng lại tự kiểm tra**

1. Hệ $2x+2y=4$, $x+y=2$ có bao nhiêu nghiệm?

<details><summary>Đáp án</summary>

$\\det = 2\\cdot 1 - 2\\cdot 1 = 0$. Hàng 1 = 2·hàng 2, tương thích ($4 = 2\\cdot 2$) → **vô số nghiệm** (cả đường $x+y=2$).

</details>

### 📝 Tóm tắt mục 7

- $\\det \\neq 0$ → 1 nghiệm duy nhất; $\\det = 0$ → vô nghiệm HOẶC vô số (phân biệt bằng Gauss).
- Hình học: 1 điểm cắt / song song / trùng.
- \`0 = 0\` $\\implies$ vô số; \`0 = (≠0)\` $\\implies$ vô nghiệm.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính $\\det\\begin{vmatrix} 3 & 1 \\\\ 4 & 2 \\end{vmatrix}$.

**Bài 2**: Tính $\\det\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{vmatrix}$.

**Bài 3**: Dùng Cramer giải: $3x + 2y = 11$, $x - y = -2$.

**Bài 4**: Ma trận $A$ có $\\det = 0$ nghĩa là gì hình học?

**Bài 5**: $A$ và $B$ đều $n\\times n$. $\\det(A) = 3$, $\\det(B) = -2$. Tính $\\det(A\\cdot B)$, $\\det(2A)$, $\\det(A^T)$.

### Lời giải

**Bài 1**: $3\\cdot 2 - 1\\cdot 4 = \\mathbf{2}$.

**Bài 2**: Khai triển hàng 1:  
- $1\\cdot(1\\cdot 0 - 4\\cdot 6) - 2\\cdot(0\\cdot 0 - 4\\cdot 5) + 3\\cdot(0\\cdot 6 - 1\\cdot 5)$  
- $= 1\\cdot(-24) - 2\\cdot(-20) + 3\\cdot(-5) = -24 + 40 - 15 = \\mathbf{1}$.

**Bài 3**: $\\det = -3 - 2 = -5$. $\\det A_1 = -11 - (-4) = -7 \\to x = -7/-5 = \\mathbf{7/5}$. $\\det A_2 = -6 - 11 = -17 \\to y = -17/-5 = \\mathbf{17/5}$.

**Bài 4**: $A$ biến đổi "vắt phẳng" — diện tích thành 0. Ảnh nằm trên đường thẳng (2D) hoặc mặt phẳng (3D), chiều giảm.

**Bài 5**:  
- $\\det(AB) = 3\\cdot(-2) = \\mathbf{-6}$.  
- $\\det(2A) = 2^n \\cdot 3$ (phụ thuộc n).  
- $\\det(A^T) = \\mathbf{3}$.

---

## 9. Bài tiếp theo

[Lesson 03 — Trị riêng & vector riêng](../lesson-03-eigenvalues-eigenvectors/).

## 📝 Tổng kết

1. **$\\det$ $2\\times 2$**: $ad - bc$. **$3\\times 3$**: khai triển hàng (Sarrus).
2. **$|\\det|$** = tỉ lệ phóng đại diện tích/thể tích. $\\det = 0$ → vắt phẳng.
3. **$\\det(AB) = \\det(A)\\cdot\\det(B)$**.
4. **Hệ $A\\vec{x} = \\vec{b}$**: Cramer (n nhỏ), Gauss (thực dụng).
5. $\\det \\neq 0 \\iff A$ khả nghịch $\\iff$ hệ có 1 nghiệm duy nhất.
`;
