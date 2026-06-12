// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-03-eigenvalues-eigenvectors/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Trị riêng & Vector riêng

## Mục tiêu

- Hiểu **trị riêng $\\lambda$** và **vector riêng $\\vec{v}$** của ma trận.
- Phương trình đặc trưng: $\\det(A - \\lambda I) = 0$.
- Áp dụng: chéo hóa ma trận, lũy thừa ma trận nhanh, PCA.

## Kiến thức tiền đề

- [Lesson 02 — Định thức](../lesson-02-determinants-linear-systems/).

---

## 1. Định nghĩa

💡 **Trực giác / Hình dung**: hầu hết vector khi qua máy $A$ vừa bị **xoay hướng** vừa bị co giãn. Nhưng một số "hướng đặc biệt" thì $A$ chỉ kéo dài/co lại mà **không xoay** — đó là vector riêng, hệ số kéo là trị riêng $\\lambda$. Hình dung tấm cao su bị kéo: theo 2 trục chính, đường kẻ chỉ dài ra/ngắn lại đúng hướng cũ (eigenvector); các đường chéo khác thì bị nghiêng đi.

Vector $\\vec{v} \\neq 0$ được gọi là **vector riêng** của $A$ nếu $A\\cdot\\vec{v} = \\lambda\\cdot\\vec{v}$ với $\\lambda$ là 1 số (gọi là **trị riêng**).

$$A\\cdot\\vec{v} = \\lambda\\cdot\\vec{v} \\quad (\\vec{v} \\neq 0)$$

Ý nghĩa: $A$ biến $\\vec{v}$ thành **bội** của $\\vec{v}$ — **không đổi hướng**, chỉ co/giãn theo hệ số $\\lambda$.

### ASCII — vector riêng GIỮ hướng vs vector thường BỊ xoay

Lấy $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ (trị riêng $\\lambda = 1, 3$, vector riêng $(1,1)$ và $(1,-1)$). So sánh tác động của $A$ lên một vector riêng $(1,1)$ và một vector thường $(1,0)$:

\`\`\`
     VECTOR RIÊNG (1,1)                VECTOR THƯỜNG (1,0)
     A·(1,1) = (3,3)                   A·(1,0) = (2,1)

        ^ y                               ^ y
        |        ↗ A·v=(3,3)              |
        |      ↗   (cùng đường            |     ↗ A·v=(2,1)  ← ĐÃ XOAY
        |    ↗      thẳng, dài 3×)        |   ↗               lên trên
        |  ↗ v=(1,1)                      | ↗
        |↗                          v=(1,0)●━━━━━━▶ x
        +━━━━━━━━━▶ x                     +━━━━━━━━━▶ x
     GIỮ HƯỚNG, chỉ kéo dài            BỊ XOAY khỏi trục x
     → eigenvector, λ=3                → KHÔNG phải eigenvector
\`\`\`

Vector riêng $(1,1)$: sau khi qua $A$ vẫn nằm trên **cùng tia** đi qua gốc — chỉ dài gấp 3. Vector $(1,0)$: $A$ kéo nó lệch lên ($y$ từ 0 thành 1) → đổi hướng → không phải vector riêng.

**4 ví dụ số đa dạng**:
- $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$, $\\vec{v} = (1,0)$: $A\\cdot\\vec{v} = (3,0) = 3\\cdot\\vec{v} \\to \\lambda = \\mathbf{3}$.
- Vị tự $A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$: **mọi** vector là eigenvector với $\\lambda = 2$ ($A\\cdot\\vec{v} = 2\\vec{v}$ luôn).
- Chéo $A = \\begin{bmatrix} 5 & 0 \\\\ 0 & -1 \\end{bmatrix}$, $\\vec{v} = (0,1)$: $A\\cdot\\vec{v} = (0,-1) = -1\\cdot\\vec{v} \\to \\lambda = \\mathbf{-1}$ (đảo chiều).
- $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$, $\\vec{v} = (1,-1)$: $A\\cdot\\vec{v} = (3-1, -2) = (2,-2) = 2\\cdot\\vec{v} \\to \\lambda = \\mathbf{2}$.

> 📐 **Định nghĩa đầy đủ — Trị riêng λ và vector riêng v**
>
> **(a) Là gì**: Vector $\\vec{v} \\neq 0$ thoả $A\\vec{v} = \\lambda\\vec{v}$. Tức $A$ biến $\\vec{v}$ thành **bội** của chính nó — chỉ co/giãn (theo hệ số $\\lambda$) hoặc đảo chiều (nếu $\\lambda < 0$), KHÔNG xoay hướng. $\\vec{v}$ gọi là **vector riêng** của $A$, $\\lambda$ là **trị riêng** tương ứng. Mỗi $\\lambda$ có thể có nhiều $\\vec{v}$ (không gian riêng eigenspace).
>
> **(b) Vì sao cần**: Vector riêng = "**hướng đặc biệt**" mà $A$ đối xử đơn giản. Tìm được chúng thì ma trận trở nên dễ hiểu, dễ tính (chéo hoá $A = PDP^{-1} \\to A^n = PD^n P^{-1}$ tính nhanh). Cốt lõi của: **PCA** (vector riêng của ma trận covariance = trục chính của dữ liệu, dùng giảm chiều), **Google PageRank** (vector riêng của ma trận liên kết web = score trang), **cơ học lượng tử** (trị riêng = mức năng lượng, vector riêng = trạng thái), **dynamical systems** (ổn định $\\leftrightarrow |\\lambda| < 1$), **vibration analysis** (mode shapes của cầu, máy bay).
>
> **(c) Ví dụ số**: $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. PT đặc trưng: $\\det(A-\\lambda I) = (2-\\lambda)^2 - 1 = 0 \\to \\lambda = 1, 3$. **$\\lambda=3$**: $(A-3I)\\vec{v} = 0 \\to -v_1+v_2=0 \\to \\vec{v} = (1,1)$. Kiểm $A\\cdot(1,1) = (3,3) = 3\\cdot(1,1)$ ✓. **$\\lambda=1$**: $\\vec{v} = (1,-1)$. Kiểm $A\\cdot(1,-1) = (1,-1) = 1\\cdot(1,-1)$ ✓. Trace $A = 4 = 1+3$ (tổng trị riêng) ✓. $\\det A = 3 = 1\\cdot 3$ (tích trị riêng) ✓. Ma trận quay 90° $= \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$: $\\lambda^2 + 1 = 0 \\to \\lambda = \\pm i$ (số phức — quay không có "hướng bất biến" thực).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao yêu cầu $\\vec{v} \\neq 0$?"* Vì $A\\cdot 0 = 0 = \\lambda\\cdot 0$ đúng với **mọi** $\\lambda$ → vector 0 chẳng cho biết gì. Eigenvector phải khác 0 mới xác định được hướng đặc biệt.
- *"1 vector riêng có 1 trị riêng, nhưng 1 trị riêng có mấy vector riêng?"* Vô số: nếu $\\vec{v}$ là eigenvector thì mọi bội $c\\cdot\\vec{v}$ ($c \\neq 0$) cũng vậy — chúng tạo thành 1 "không gian riêng" (eigenspace). Ta thường lấy 1 đại diện.

⚠ **Lỗi thường gặp — tưởng $A\\cdot\\vec{v} = \\lambda\\cdot\\vec{v}$ đúng với mọi $\\vec{v}$**. Chỉ đúng với **vector riêng**. Phản ví dụ: $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$, lấy $\\vec{v} = (1,1)$ (không phải eigenvector): $A\\cdot\\vec{v} = (4, 2)$. Có là bội của $(1,1)$ không? $(4,2) = k(1,1)$ đòi $k=4$ và $k=2$ — mâu thuẫn → KHÔNG phải eigenvector.

🔁 **Dừng lại tự kiểm tra**

1. $A = \\begin{bmatrix} 5 & 0 \\\\ 0 & 3 \\end{bmatrix}$. $(1,0)$ có phải eigenvector? Trị riêng?
2. Nếu $\\vec{v}$ là eigenvector của $A$ với $\\lambda = 2$, thì $3\\vec{v}$ có phải eigenvector? Trị riêng?

<details><summary>Đáp án</summary>

1. $A\\cdot(1,0) = (5,0) = 5\\cdot(1,0) \\to$ **có**, $\\lambda = 5$.
2. $A\\cdot(3\\vec{v}) = 3\\cdot(A\\vec{v}) = 3\\cdot(2\\vec{v}) = 2\\cdot(3\\vec{v}) \\to$ **có**, vẫn $\\lambda = 2$ (bội của eigenvector vẫn là eigenvector cùng trị riêng).

</details>

### 📝 Tóm tắt mục 1

- $\\vec{v} \\neq 0$ là **vector riêng** nếu $A\\vec{v} = \\lambda\\vec{v}$; $\\lambda$ là **trị riêng** (hệ số co/giãn, không xoay hướng).
- Mỗi $\\lambda$ có cả không gian eigenvector (mọi bội $c\\cdot\\vec{v}$).
- $A\\vec{v} = \\lambda\\vec{v}$ chỉ đúng cho eigenvector, không phải mọi $\\vec{v}$.

---

## 2. Tìm trị riêng — Phương trình đặc trưng

Từ $A\\cdot\\vec{v} = \\lambda\\cdot\\vec{v} \\iff (A - \\lambda I)\\cdot\\vec{v} = 0 \\iff \\vec{v}$ thuộc null space của $(A - \\lambda I)$.

⟶ Để có $\\vec{v} \\neq 0$, cần $(A - \\lambda I)$ **không khả nghịch**:

$$\\det(A - \\lambda I) = 0$$

Đây là **phương trình đặc trưng** (characteristic equation), bậc n. Nghiệm = trị riêng.

### Công thức vàng cho ma trận 2×2

Với $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ bất kỳ:

$$\\begin{aligned}
\\det(A - \\lambda I) &= \\det\\begin{vmatrix} a-\\lambda & b \\\\ c & d-\\lambda \\end{vmatrix} = (a-\\lambda)(d-\\lambda) - bc \\\\
&= \\lambda^2 - (a+d)\\lambda + (ad - bc) = \\lambda^2 - T\\lambda + D
\\end{aligned}$$

với $T = \\text{trace}(A) = a + d$ và $D = \\det(A) = ad - bc$. Hai nghiệm:

$$\\lambda = \\frac{T \\pm \\sqrt{T^2 - 4D}}{2}$$

Nhớ công thức này thì mọi bài 2×2 chỉ còn là cộng đường chéo (ra $T$), tính định thức (ra $D$), rồi giải phương trình bậc 2.

### Ví dụ 2×2

$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$.

$$\\det(A - \\lambda I) = \\det\\begin{vmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{vmatrix} = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = 0.$$

⟶ $\\lambda = 1$ hoặc $\\lambda = 3$.

### Tìm vector riêng

**Với $\\lambda = 1$**: $(A - I)\\cdot\\vec{v} = 0$.
- $\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}\\cdot\\vec{v} = 0$.
- $v_1 + v_2 = 0 \\to \\vec{v} = (1, -1)$ (hoặc bội).

**Với $\\lambda = 3$**: $(A - 3I)\\cdot\\vec{v} = 0$.
- $\\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}\\cdot\\vec{v} = 0$.
- $\\vec{v} = (1, 1)$.

💡 **Trực giác / Hình dung**: vì sao $\\det(A-\\lambda I) = 0$? $A\\vec{v} = \\lambda\\vec{v} \\iff (A-\\lambda I)\\vec{v} = 0$. Muốn có $\\vec{v} \\neq 0$ thỏa "$(A-\\lambda I)$ ép $\\vec{v}$ về 0", máy $(A-\\lambda I)$ phải **bẹp** (không khả nghịch) → $\\det$ của nó $= 0$. $\\lambda$ làm máy bẹp chính là trị riêng.

**Walk-through tìm vector riêng cho $\\lambda = 1$** ($A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$):
- $A - 1\\cdot I = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$. Giải $\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}\\cdot(v_1,v_2) = 0 \\to v_1 + v_2 = 0 \\to v_2 = -v_1 \\to \\vec{v} = (1,-1)$.
- Kiểm: $A\\cdot(1,-1) = (2\\cdot 1+1\\cdot(-1), 1\\cdot 1+2\\cdot(-1)) = (1,-1) = 1\\cdot(1,-1)$ ✓.

### Walk-through đầy đủ thêm — 3 ví dụ 2×2 từng bước

Mỗi ví dụ đi đủ 3 bước: **(B1) lập $\\det(A-\\lambda I)=0$ → (B2) giải $\\lambda$ → (B3) giải $\\vec{v}$ cho từng $\\lambda$**.

**Ví dụ A — $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$ (không đối xứng, 2 trị riêng phân biệt)**

- **B1**: $T = 4+3 = 7$, $D = 4\\cdot 3 - 1\\cdot 2 = 10$. PT đặc trưng: $\\lambda^2 - 7\\lambda + 10 = 0$.
- **B2**: $\\lambda = \\dfrac{7 \\pm \\sqrt{49 - 40}}{2} = \\dfrac{7 \\pm 3}{2} \\to \\lambda_1 = 2, \\ \\lambda_2 = 5$.
- **B3a** ($\\lambda = 2$): $A - 2I = \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}$. Hàng 1: $2v_1 + v_2 = 0 \\to v_2 = -2v_1$. Chọn $v_1 = 1 \\to \\vec{v}_1 = (1, -2)$. Kiểm: $A\\cdot(1,-2) = (4-2, 2-6) = (2, -4) = 2\\cdot(1,-2)$ ✓.
- **B3b** ($\\lambda = 5$): $A - 5I = \\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}$. Hàng 1: $-v_1 + v_2 = 0 \\to v_2 = v_1$. Chọn $v_1 = 1 \\to \\vec{v}_2 = (1, 1)$. Kiểm: $A\\cdot(1,1) = (5, 5) = 5\\cdot(1,1)$ ✓.
- **Kiểm tổng**: $\\lambda_1 + \\lambda_2 = 7 = T$ ✓, $\\lambda_1\\lambda_2 = 10 = D$ ✓.

**Ví dụ B — $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ (tam giác trên → đọc trị riêng trên đường chéo)**

- **B1**: $\\det(A-\\lambda I) = (3-\\lambda)(2-\\lambda) - 1\\cdot 0 = (3-\\lambda)(2-\\lambda) = 0$.
- **B2**: nghiệm ngay là $\\lambda_1 = 3, \\ \\lambda_2 = 2$ — đúng bằng 2 phần tử đường chéo (quy luật ma trận tam giác).
- **B3a** ($\\lambda = 3$): $A - 3I = \\begin{bmatrix} 0 & 1 \\\\ 0 & -1 \\end{bmatrix}$. Hàng 1: $v_2 = 0$, $v_1$ tự do $\\to \\vec{v}_1 = (1, 0)$. Kiểm: $A\\cdot(1,0) = (3, 0) = 3\\cdot(1,0)$ ✓.
- **B3b** ($\\lambda = 2$): $A - 2I = \\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}$. Hàng 1: $v_1 + v_2 = 0 \\to \\vec{v}_2 = (1, -1)$. Kiểm: $A\\cdot(1,-1) = (3-1, -2) = (2, -2) = 2\\cdot(1,-1)$ ✓.

**Ví dụ C — $A = \\begin{bmatrix} 0 & 2 \\\\ 2 & 3 \\end{bmatrix}$ (đối xứng, trị riêng nghịch dấu)**

- **B1**: $T = 0 + 3 = 3$, $D = 0\\cdot 3 - 2\\cdot 2 = -4$. PT: $\\lambda^2 - 3\\lambda - 4 = 0$.
- **B2**: $\\lambda = \\dfrac{3 \\pm \\sqrt{9 + 16}}{2} = \\dfrac{3 \\pm 5}{2} \\to \\lambda_1 = 4, \\ \\lambda_2 = -1$ (một dương, một âm — $A$ vừa kéo dài theo 1 trục, vừa lật chiều theo trục kia).
- **B3a** ($\\lambda = 4$): $A - 4I = \\begin{bmatrix} -4 & 2 \\\\ 2 & -1 \\end{bmatrix}$. Hàng 1: $-4v_1 + 2v_2 = 0 \\to v_2 = 2v_1$. Chọn $v_1 = 1 \\to \\vec{v}_1 = (1, 2)$. Kiểm: $A\\cdot(1,2) = (0+4, 2+6) = (4, 8) = 4\\cdot(1,2)$ ✓.
- **B3b** ($\\lambda = -1$): $A + I = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$. Hàng 1: $v_1 + 2v_2 = 0 \\to v_1 = -2v_2$. Chọn $v_2 = 1 \\to \\vec{v}_2 = (-2, 1)$. Kiểm: $A\\cdot(-2,1) = (0+2, -4+3) = (2, -1) = -1\\cdot(-2,1)$ ✓.
- **Kiểm trực giao** ($A$ đối xứng): $\\vec{v}_1\\cdot\\vec{v}_2 = 1\\cdot(-2) + 2\\cdot 1 = 0$ ✓ — hai vector riêng vuông góc, đúng định lý phổ.

**Ví dụ D — ma trận 3×3 tam giác trên (đọc thẳng trị riêng)**

$A = \\begin{bmatrix} 7 & 2 & 5 \\\\ 0 & 3 & 1 \\\\ 0 & 0 & -1 \\end{bmatrix}$. Định thức ma trận tam giác = tích đường chéo, nên:

$$\\det(A - \\lambda I) = (7-\\lambda)(3-\\lambda)(-1-\\lambda) = 0 \\to \\lambda = 7, \\ 3, \\ -1.$$

⟶ Với ma trận tam giác (trên hoặc dưới) hoặc ma trận chéo, trị riêng **chính là các phần tử trên đường chéo** — không cần khai triển. Tìm vector riêng cho $\\lambda = 7$: giải $(A - 7I)\\vec{v} = 0$ với $A - 7I = \\begin{bmatrix} 0 & 2 & 5 \\\\ 0 & -4 & 1 \\\\ 0 & 0 & -8 \\end{bmatrix}$ → từ hàng 3: $-8v_3 = 0 \\to v_3 = 0$; hàng 2: $-4v_2 = 0 \\to v_2 = 0$; $v_1$ tự do $\\to \\vec{v} = (1, 0, 0)$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"PT đặc trưng bậc mấy?"* Bậc n với ma trận $n\\times n$ → đúng n trị riêng (kể bội, có thể phức). $2\\times 2$ → bậc 2 → 2 trị riêng.
- *"Ma trận 3×3 trở lên giải thế nào?"* Khai triển $\\det(A-\\lambda I)$ thành đa thức bậc 3 rồi giải. Khó hơn nhiều (đa thức bậc cao không có công thức nghiệm tổng quát từ bậc 5). Trong thực tế dùng thuật toán số (QR algorithm trong NumPy/LAPACK) thay vì giải tay. Trường hợp dễ: ma trận tam giác/chéo → đọc thẳng đường chéo (Ví dụ D).
- *"Tính $\\lambda$ rồi, tìm $\\vec{v}$ thế nào?"* Thế $\\lambda$ vào $(A-\\lambda I)\\vec{v} = 0$ rồi giải hệ (luôn vô số nghiệm vì $\\det = 0$) → lấy 1 nghiệm khác 0.

⚠ **Lỗi thường gặp — trừ $\\lambda$ khỏi cả ma trận thay vì chỉ đường chéo**. $A - \\lambda I$ chỉ trừ $\\lambda$ ở **đường chéo**, các ô khác giữ nguyên. Phản ví dụ: $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $A - \\lambda I = \\begin{bmatrix} 2-\\lambda & 1 \\\\ 1 & 2-\\lambda \\end{bmatrix}$ — ô góc trên-phải vẫn là 1, KHÔNG phải $1-\\lambda$.

🔁 **Dừng lại tự kiểm tra**

1. Lập PT đặc trưng của $A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}$.
2. $(A - \\lambda I)$ tại $\\lambda = 3$ cho $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ là ma trận nào?

<details><summary>Đáp án</summary>

1. $\\det\\begin{vmatrix} 1-\\lambda & 2 \\\\ 2 & 1-\\lambda \\end{vmatrix} = (1-\\lambda)^2 - 4 = 0 \\to \\lambda = -1, 3$.
2. $A - 3I = \\begin{bmatrix} 0 & 1 \\\\ 0 & -1 \\end{bmatrix}$ (trừ 3 ở đường chéo: $3-3=0$, $2-3=-1$).

</details>

### 📝 Tóm tắt mục 2

- Tìm $\\lambda$: giải PT đặc trưng $\\det(A-\\lambda I) = 0$ (bậc n → n trị riêng).
- Tìm $\\vec{v}$: thế $\\lambda$, giải $(A-\\lambda I)\\vec{v} = 0$, lấy nghiệm $\\neq 0$.
- Chỉ trừ $\\lambda$ ở **đường chéo** của $A$.

---

## 3. Chéo hóa ma trận

💡 **Trực giác / Hình dung**: chéo hóa = "đổi sang hệ trục tọa độ của eigenvector". Trong hệ trục thường, $A$ trộn lẫn các thành phần (ô off-diagonal $\\neq 0$). Nhưng nhìn theo trục eigenvector thì $A$ chỉ đơn thuần kéo dài mỗi trục độc lập (ma trận đường chéo $D$). $P^{-1}$ "dịch" sang hệ eigenvector, $D$ kéo dài, $P$ "dịch" về lại. Nhờ thế $A^n = P\\cdot D^n\\cdot P^{-1}$ — chỉ cần lũy thừa các số trên đường chéo.

Nếu $A$ có n trị riêng và n vector riêng độc lập tuyến tính, $A$ "chéo hóa được":

$$A = P \\cdot D \\cdot P^{-1}$$

trong đó:
- **$P$** = ma trận có các vector riêng là cột.
- **$D$** = ma trận đường chéo với trị riêng $\\lambda_1, \\ldots, \\lambda_n$.

### Lợi ích — Tính $A^n$ nhanh

$$A^n = P \\cdot D^n \\cdot P^{-1}$$

$D^n$ dễ tính (chỉ cần $\\lambda_i^n$ trên đường chéo).

**Ví dụ**: $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. Trị riêng $\\lambda = 1, 3$.
- $P = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}$. $D = \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix}$.
- $A^{10} = P\\cdot D^{10}\\cdot P^{-1} = P\\cdot\\begin{bmatrix} 1 & 0 \\\\ 0 & 59049 \\end{bmatrix}\\cdot P^{-1}$.

⟶ Khỏi nhân ma trận $A$ với chính nó 10 lần.

### Vì sao $A^n = P D^n P^{-1}$? (chứng minh từng bước)

$$\\begin{aligned}
A^2 &= (PDP^{-1})(PDP^{-1}) = PD\\underbrace{(P^{-1}P)}_{=I}DP^{-1} = PD^2P^{-1} \\\\
A^3 &= A^2 \\cdot A = (PD^2P^{-1})(PDP^{-1}) = PD^2\\underbrace{(P^{-1}P)}_{=I}DP^{-1} = PD^3P^{-1} \\\\
&\\ \\vdots \\\\
A^n &= PD^nP^{-1}
\\end{aligned}$$

Mấu chốt: mỗi cặp $P^{-1}P$ ở giữa triệt tiêu thành $I$, chỉ còn $D$ nhân với $D$. Và lũy thừa ma trận chéo cực dễ: $D^n = \\text{diag}(\\lambda_1^n, \\dots, \\lambda_n^n)$ — chỉ lũy thừa từng số trên đường chéo.

### Walk-through chéo hóa đầy đủ #1 — $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$, tính $A^{10}$

**B1 — Lập $P, D$**: từ $\\lambda_1 = 1, \\vec{v}_1 = (1,-1)$ và $\\lambda_2 = 3, \\vec{v}_2 = (1,1)$:

$$P = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}, \\quad D = \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix}$$

**B2 — Tính $P^{-1}$** (nghịch đảo 2×2: hoán đổi đường chéo chính, đổi dấu đường chéo phụ, chia $\\det$):

$$\\det(P) = 1\\cdot 1 - 1\\cdot(-1) = 2, \\quad P^{-1} = \\frac{1}{2}\\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 0.5 & -0.5 \\\\ 0.5 & 0.5 \\end{bmatrix}$$

**B3 — Lũy thừa $D$**: $D^{10} = \\begin{bmatrix} 1^{10} & 0 \\\\ 0 & 3^{10} \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 59049 \\end{bmatrix}$.

**B4 — Ghép lại** $A^{10} = P D^{10} P^{-1}$:

$$P D^{10} = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}\\begin{bmatrix} 1 & 0 \\\\ 0 & 59049 \\end{bmatrix} = \\begin{bmatrix} 1 & 59049 \\\\ -1 & 59049 \\end{bmatrix}$$

$$A^{10} = \\begin{bmatrix} 1 & 59049 \\\\ -1 & 59049 \\end{bmatrix}\\begin{bmatrix} 0.5 & -0.5 \\\\ 0.5 & 0.5 \\end{bmatrix} = \\begin{bmatrix} 29525 & 29524 \\\\ 29524 & 29525 \\end{bmatrix}$$

(Hàng 1: $1\\cdot 0.5 + 59049\\cdot 0.5 = 29525$ và $1\\cdot(-0.5) + 59049\\cdot 0.5 = 29524$.)

### Walk-through chéo hóa đầy đủ #2 — $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$, tính $A^{3}$

**B1 — Lập $P, D$**: từ $\\lambda_1 = 2, \\vec{v}_1 = (1,-2)$ và $\\lambda_2 = 5, \\vec{v}_2 = (1,1)$ (đã giải ở mục 2, Ví dụ A):

$$P = \\begin{bmatrix} 1 & 1 \\\\ -2 & 1 \\end{bmatrix}, \\quad D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 5 \\end{bmatrix}$$

**B2 — Tính $P^{-1}$**: $\\det(P) = 1\\cdot 1 - 1\\cdot(-2) = 3$, nên $P^{-1} = \\dfrac{1}{3}\\begin{bmatrix} 1 & -1 \\\\ 2 & 1 \\end{bmatrix}$.

**B3 — Lũy thừa $D$**: $D^3 = \\begin{bmatrix} 2^3 & 0 \\\\ 0 & 5^3 \\end{bmatrix} = \\begin{bmatrix} 8 & 0 \\\\ 0 & 125 \\end{bmatrix}$.

**B4 — Ghép lại**:

$$P D^3 = \\begin{bmatrix} 1 & 1 \\\\ -2 & 1 \\end{bmatrix}\\begin{bmatrix} 8 & 0 \\\\ 0 & 125 \\end{bmatrix} = \\begin{bmatrix} 8 & 125 \\\\ -16 & 125 \\end{bmatrix}$$

$$A^3 = \\begin{bmatrix} 8 & 125 \\\\ -16 & 125 \\end{bmatrix}\\cdot\\frac{1}{3}\\begin{bmatrix} 1 & -1 \\\\ 2 & 1 \\end{bmatrix} = \\frac{1}{3}\\begin{bmatrix} 8 + 250 & -8 + 125 \\\\ -16 + 250 & 16 + 125 \\end{bmatrix} = \\frac{1}{3}\\begin{bmatrix} 258 & 117 \\\\ 234 & 141 \\end{bmatrix} = \\begin{bmatrix} 86 & 39 \\\\ 78 & 47 \\end{bmatrix}$$

**Kiểm chéo** bằng cách nhân thẳng: $A^2 = A\\cdot A = \\begin{bmatrix} 18 & 7 \\\\ 14 & 11 \\end{bmatrix}$, rồi $A^3 = A^2\\cdot A = \\begin{bmatrix} 18\\cdot 4 + 7\\cdot 2 & 18 + 21 \\\\ 14\\cdot 4 + 11\\cdot 2 & 14 + 33 \\end{bmatrix} = \\begin{bmatrix} 86 & 39 \\\\ 78 & 47 \\end{bmatrix}$ ✓ — khớp.

### Ý nghĩa hình học — $A$ = "đổi trục → kéo dài → đổi về"

Đọc $A\\vec{x} = (PDP^{-1})\\vec{x}$ từ **phải sang trái**:
1. $P^{-1}\\vec{x}$: viết $\\vec{x}$ theo hệ trục vector riêng (đổi sang "ngôn ngữ" của eigenvector).
2. $D\\cdot(\\dots)$: trong hệ trục đó, $A$ chỉ là **kéo dài mỗi trục riêng** theo hệ số $\\lambda_i$ — không trộn lẫn.
3. $P\\cdot(\\dots)$: đổi tọa độ ngược về hệ trục chuẩn.

Cùng một biến đổi $A$ trông rối (off-diagonal $\\neq 0$) ở hệ trục thường, nhưng nhìn theo hệ trục riêng thì chỉ là phép giãn đơn giản.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ma trận nào cũng chéo hóa được?"* Không. Cần đủ n eigenvector **độc lập tuyến tính**. Vd $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ chỉ có 1 hướng eigenvector ($\\lambda=1$ bội 2 nhưng eigenspace 1 chiều) → KHÔNG chéo hóa được trên $\\mathbb{R}$.
- *"Vì sao $A^n$ tính nhanh hơn?"* Vì $D^n$ chỉ là $\\lambda_i^n$ trên đường chéo — $n-1$ phép nhân ma trận đầy đủ rút còn vài phép lũy thừa số + 2 phép nhân với $P, P^{-1}$.

⚠ **Lỗi thường gặp — đặt cột $P$ không khớp thứ tự với $D$**. Cột thứ i của $P$ phải là eigenvector ứng với $\\lambda_i$ ở vị trí $(i,i)$ của $D$. Nếu đặt lệch (eigenvector của $\\lambda=1$ nhưng để 3 vào $D$) thì $A \\neq PDP^{-1}$. Luôn ghép đúng cặp $(\\lambda, \\vec{v})$.

⚠ **Lỗi thường gặp — tưởng MỌI ma trận đều chéo hóa được**. Ma trận **khiếm khuyết (defective)** thì không. Ví dụ cụ thể $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$:
- PT đặc trưng $(1-\\lambda)^2 = 0 \\to \\lambda = 1$ **bội 2** (algebraic multiplicity = 2).
- Tìm vector riêng: $A - I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$, giải $\\to v_2 = 0$, $v_1$ tự do $\\to$ chỉ **1 hướng** $\\vec{v} = (1, 0)$ (geometric multiplicity = 1).
- Không đủ 2 vector riêng độc lập $\\to P$ không khả nghịch $\\to$ **KHÔNG chéo hóa được**. Khi đó dùng **dạng Jordan** $A = PJP^{-1}$ ($J$ gần chéo, có 1 ô phụ trên đường chéo) — ngoài phạm vi bài này.

⚠ **Lỗi thường gặp — quên chuẩn hóa vector riêng khi cần $Q$ trực giao**. Khi chéo hóa thường ($A = PDP^{-1}$) không bắt buộc chuẩn hóa $\\vec{v}$. Nhưng với ma trận đối xứng và muốn $A = QDQ^\\top$ (dạng phổ, $Q^{-1} = Q^\\top$), phải chia mỗi vector riêng cho độ dài của nó. Ví dụ $\\vec{v} = (1,1)$ phải thành $\\vec{q} = (1/\\sqrt{2}, 1/\\sqrt{2})$; bỏ qua bước này thì $Q^\\top \\neq Q^{-1}$ và công thức sai.

🔁 **Dừng lại tự kiểm tra**

1. $A$ có $\\lambda = 2, 4$. Tính các trị riêng của $A^3$ (không cần chéo hóa).
2. Cho $A = PDP^{-1}$ với $D = \\text{diag}(0.5, 2)$. Khi $n \\to \\infty$, $A^n$ tiến về đâu (về mặt trị riêng)?

<details><summary>Đáp án</summary>

1. Trị riêng của $A^3 = \\lambda^3 = 2^3 = \\mathbf{8}$ và $4^3 = \\mathbf{64}$ (cùng eigenvector). Vì $A^3\\vec{v} = \\lambda^3\\vec{v}$.
2. $D^n = \\text{diag}(0.5^n, 2^n) \\to \\text{diag}(0, \\infty)$: thành phần $0.5^n \\to 0$ tắt dần, $2^n \\to \\infty$ bùng nổ. Hướng $\\vec{v}$ ứng với $\\lambda = 2$ thống trị — đây chính là ý tưởng power iteration và tính ổn định ở mục 6.

</details>

### 📝 Tóm tắt mục 3

- $A = PDP^{-1}$: $P$ = cột eigenvector, $D$ = đường chéo trị riêng (ghép đúng cặp).
- $A^n = P\\cdot D^n\\cdot P^{-1}$ → tính lũy thừa nhanh.
- Cần n eigenvector độc lập tuyến tính mới chéo hóa được.

---

## 4. Áp dụng — PCA (Principal Component Analysis)

💡 **Trực giác / Hình dung**: hình dung đám mây điểm dữ liệu hình elip dài. Trục dài nhất của elip = hướng dữ liệu "trải rộng" nhất = vector riêng lớn nhất của ma trận hiệp phương sai; độ dài trục = trị riêng. PCA = "xoay trục về theo elip rồi bỏ các trục ngắn" → giảm chiều mà giữ phần lớn thông tin.

🎯 **PCA**: giảm chiều dữ liệu trong AI/ML.
1. Tính **ma trận hiệp phương sai** C của dữ liệu.
2. Tìm trị riêng & vector riêng của C.
3. Chọn k vector riêng ứng với k trị riêng lớn nhất.
4. Chiếu dữ liệu lên không gian con này.

⟶ **Vector riêng = trục chính** của dữ liệu. **Trị riêng = độ "rộng"** theo trục đó.

Đây là 1 trong những thuật toán quan trọng nhất ML — cốt lõi của face recognition (Eigenfaces), nén ảnh, ...

### Walk-through PCA bằng số cụ thể (2 chiều)

Giả sử sau khi center dữ liệu, ma trận hiệp phương sai (covariance) là $C = \\begin{bmatrix} 5 & 4 \\\\ 4 & 5 \\end{bmatrix}$ (đối xứng → trị riêng thực, vector riêng trực giao).

- **B1 — Trị riêng**: $T = 10$, $D = 25 - 16 = 9$. PT: $\\lambda^2 - 10\\lambda + 9 = 0 \\to \\lambda = \\dfrac{10 \\pm \\sqrt{100 - 36}}{2} = \\dfrac{10 \\pm 8}{2} \\to \\lambda_1 = 9, \\ \\lambda_2 = 1$.
- **B2 — Vector riêng**:
  - $\\lambda = 9$: $C - 9I = \\begin{bmatrix} -4 & 4 \\\\ 4 & -4 \\end{bmatrix} \\to v_1 = v_2 \\to \\vec{v}_1 = (1, 1)$ — **trục chính** (principal component 1).
  - $\\lambda = 1$: $C - I = \\begin{bmatrix} 4 & 4 \\\\ 4 & 4 \\end{bmatrix} \\to v_1 = -v_2 \\to \\vec{v}_2 = (1, -1)$ — trục phụ.
- **B3 — % phương sai giữ được**: tổng trị riêng $= 9 + 1 = 10$. Giữ trục chính ($\\lambda = 9$) giữ được $9/10 = \\mathbf{90\\%}$ phương sai chỉ với 1 chiều. Bỏ trục phụ chỉ mất 10%.

⟶ Giảm chiều từ 2 xuống 1 mà giữ 90% thông tin: chiếu mọi điểm lên hướng $(1,1)/\\sqrt{2}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn k bao nhiêu thì đủ?"* Thường chọn k sao cho tổng k trị riêng lớn nhất ≥ ~90–95% tổng tất cả trị riêng (giữ 90–95% "phương sai"). Vd 100 chiều, 10 trị riêng đầu chiếm 95% → giảm còn 10 chiều.
- *"Vì sao dùng vector riêng của covariance chứ không phải ma trận khác?"* Vì covariance $C$ đo mức "biến thiên cùng nhau" của các chiều. Vector riêng của $C$ chỉ đúng hướng dữ liệu trải rộng nhất, trị riêng = phương sai theo hướng đó. $C$ luôn đối xứng → định lý phổ đảm bảo có đủ vector riêng thực, trực giao → các trục chính vuông góc nhau (không trùng lặp thông tin).

⚠ **Lỗi thường gặp — quên chuẩn hóa dữ liệu trước PCA**. Nếu các biến khác đơn vị (vd cm và kg), biến có giá trị lớn sẽ "lấn át" phương sai → trục chính bị lệch. Phải chuẩn hóa (trừ trung bình, chia độ lệch chuẩn) trước.

🔁 **Dừng lại tự kiểm tra**

1. Ma trận hiệp phương sai có trị riêng 8, 1.5, 0.5. Giữ 1 thành phần thì giữ được bao nhiêu % phương sai?

<details><summary>Đáp án</summary>

Tổng = 8 + 1.5 + 0.5 = 10. Giữ trị riêng lớn nhất (8) → 8/10 = **80%** phương sai.

</details>

### 📝 Tóm tắt mục 4

- PCA: tìm eigenvector của ma trận hiệp phương sai = trục chính của dữ liệu.
- Trị riêng lớn = phương sai lớn theo trục đó; giữ k trị riêng lớn nhất để giảm chiều.
- Chuẩn hóa dữ liệu trước; chọn k giữ ~90–95% phương sai.

---

## 5. Một số tính chất

💡 **Trực giác / Hình dung**: trace (tổng đường chéo) và det là 2 con số tóm tắt nhanh về trị riêng — không cần giải PT đặc trưng vẫn biết tổng và tích các $\\lambda$. $\\det = \\prod\\lambda$ ăn khớp với "$\\det$ = co giãn thể tích": mỗi trục eigenvector co giãn $\\lambda_i$ → thể tích nhân $\\prod\\lambda_i$.

- **Trace** = tổng trị riêng. $\\text{Tr}(A) = \\sum \\lambda_i$.
- **Det** = tích trị riêng. $\\det(A) = \\prod \\lambda_i$.
- **Ma trận đối xứng** ($A = A^T$): trị riêng đều là số thực, vector riêng trực giao nhau.

**Verify bằng số** ($A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $\\lambda = 1, 3$):
- Trace $= 2 + 2 = 4 = 1 + 3$ ✓.
- $\\det = 2\\cdot 2 - 1\\cdot 1 = 3 = 1\\cdot 3$ ✓.
- $A$ đối xứng → eigenvector $(1,1)$ và $(1,-1)$: tích vô hướng $= 1\\cdot 1 + 1\\cdot(-1) = 0 \\to$ **trực giao** ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Trace, det giúp gì khi đã có thể giải PT đặc trưng?"* Dùng **kiểm tra nhanh**: tìm xong $\\lambda$, cộng lại phải bằng trace, nhân lại phải bằng det. Sai → tính lỗi đâu đó. Cũng cho biết det ngay ($\\det = 0 \\iff$ có 1 $\\lambda = 0$).

⚠ **Lỗi thường gặp — tưởng eigenvector mọi ma trận đều trực giao**. Chỉ **ma trận đối xứng** mới đảm bảo eigenvector trực giao. Phản ví dụ: $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ (không đối xứng) có eigenvector $(1,0)$ và $(1,-1)$; tích vô hướng $= 1 \\neq 0 \\to$ KHÔNG trực giao.

🔁 **Dừng lại tự kiểm tra**

1. $A$ là $2\\times 2$, trace $= 7$, $\\det = 12$. Tìm 2 trị riêng.

<details><summary>Đáp án</summary>

$\\lambda_1+\\lambda_2 = 7$, $\\lambda_1\\cdot\\lambda_2 = 12 \\to$ nghiệm của $x^2 - 7x + 12 = 0 \\to x = 3, 4$. Trị riêng **3 và 4**.

</details>

### 📝 Tóm tắt mục 5

- Trace $= \\sum\\lambda$, $\\det = \\prod\\lambda$ → kiểm tra nhanh kết quả trị riêng.
- Ma trận đối xứng: trị riêng thực, eigenvector trực giao (nền tảng PCA).
- $\\det = 0 \\iff$ có ít nhất 1 trị riêng $= 0$.

---

## 6. Ứng dụng mở rộng — PageRank, hệ động lực, trị riêng phức

Ngoài PCA (mục 4), trị riêng còn là động cơ của nhiều thuật toán nổi tiếng. Mục này đi sâu 3 ứng dụng + xử lý trường hợp trị riêng phức.

### 6.1 PageRank của Google — trị riêng $\\lambda = 1$

💡 **Trực giác / Hình dung**: tưởng tượng một người lướt web bấm link ngẫu nhiên mãi mãi. Sau rất nhiều bước, tỷ lệ thời gian người đó **đứng ở mỗi trang** hội tụ về một phân phối ổn định $\\vec{\\pi}$. Trang nào hay được dừng ở = trang quan trọng. PageRank chính là phân phối ổn định đó — và nó là **vector riêng**.

Mô hình hóa bằng ma trận chuyển $M$ trong đó $M[j][i] = 1/k_i$ nếu trang $i$ (có $k_i$ link ra) trỏ tới trang $j$. Phân phối ổn định thoả:

$$M\\vec{\\pi} = \\vec{\\pi}$$

Đây đúng là phương trình vector riêng với $\\lambda = 1$! Vì mỗi cột của $M$ cộng lại bằng 1 (ma trận cột-ngẫu nhiên), $M$ **luôn** có trị riêng $\\lambda = 1$, nên $\\vec{\\pi}$ luôn tồn tại.

**Walk-through nhỏ 3 trang** — A→B, A→C, B→C, C→A:

$$M = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1/2 & 0 & 0 \\\\ 1/2 & 1 & 0 \\end{bmatrix} \\quad (\\text{cột } i = \\text{phân phối link ra của trang } i)$$

Giải $M\\vec{\\pi} = \\vec{\\pi}$ với $\\pi_A + \\pi_B + \\pi_C = 1$:
- Hàng A: $\\pi_C = \\pi_A$.
- Hàng B: $\\tfrac{1}{2}\\pi_A = \\pi_B \\to \\pi_B = \\tfrac{1}{2}\\pi_A$.
- Thay vào ràng buộc tổng: $\\pi_A + \\tfrac{1}{2}\\pi_A + \\pi_A = 1 \\to \\tfrac{5}{2}\\pi_A = 1 \\to \\pi_A = 0.4$.
- Suy ra $\\vec{\\pi} = (0.4, \\ 0.2, \\ 0.4)$.

⟶ A và C đồng hạng cao nhất (0.4), B thấp nhất (0.2). Hợp lý: A và C đều có 2 nguồn "uy tín" trỏ tới, B chỉ có 1.

Trong thực tế Google thêm **damping factor** $d = 0.85$: $M' = dM + \\tfrac{1-d}{n}J$ ($J$ = ma trận toàn 1) để xử lý trang không có link ra (dangling) và đảm bảo hội tụ duy nhất.

### 6.2 Hệ động lực rời rạc — trị riêng quyết định ổn định

💡 **Trực giác / Hình dung**: cho dãy trạng thái $\\vec{x}_{k+1} = A\\vec{x}_k$ (dân số năm sau = ma trận × dân số năm nay; số tiền tài khoản, ...). Sau $k$ bước $\\vec{x}_k = A^k\\vec{x}_0$. Phân tích $\\vec{x}_0$ theo vector riêng: $\\vec{x}_0 = c_1\\vec{v}_1 + c_2\\vec{v}_2$, thì $\\vec{x}_k = c_1\\lambda_1^k\\vec{v}_1 + c_2\\lambda_2^k\\vec{v}_2$. **Mỗi thành phần nhân $\\lambda^k$ mỗi bước** — nên độ lớn $|\\lambda|$ quyết định bùng nổ hay tắt dần:

| Điều kiện | Hành vi dài hạn |
|-----------|-----------------|
| $|\\lambda_{\\max}| < 1$ | $\\vec{x}_k \\to \\vec{0}$ — **ổn định** (tắt dần) |
| $|\\lambda_{\\max}| > 1$ | $\\vec{x}_k \\to \\infty$ — **bùng nổ** (không ổn định) |
| $|\\lambda_{\\max}| = 1$ | biên giới — dao động / phân phối ổn định (như PageRank) |

**Ví dụ số**: $A = \\begin{bmatrix} 0.5 & 0.2 \\\\ 0.1 & 0.4 \\end{bmatrix}$. $T = 0.9$, $D = 0.2 - 0.02 = 0.18$. PT: $\\lambda^2 - 0.9\\lambda + 0.18 = 0 \\to \\lambda = \\dfrac{0.9 \\pm \\sqrt{0.81 - 0.72}}{2} = \\dfrac{0.9 \\pm 0.3}{2} \\to \\lambda = 0.6, \\ 0.3$. Cả hai $< 1 \\to$ mọi quỹ đạo $\\to \\vec{0}$: **hệ ổn định**.

⟶ Đây chính là lý do PageRank dùng được $A^k\\vec{x}_0$ (mục 3): với ma trận chuyển, $\\lambda_{\\max} = 1$ và các trị riêng khác $|\\lambda| < 1$ → mọi khởi tạo hội tụ về cùng $\\vec{\\pi}$.

### 6.3 Trị riêng phức — khi $A$ "xoay"

⚠ **Lỗi thường gặp — tưởng ma trận thực luôn có trị riêng thực**. Ma trận **xoay** không có hướng bất biến thực nên trị riêng là số phức.

**Ví dụ** ma trận quay $\\theta$: $R = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$.
- $T = 2\\cos\\theta$, $D = \\cos^2\\theta + \\sin^2\\theta = 1$. PT: $\\lambda^2 - 2\\cos\\theta\\cdot\\lambda + 1 = 0$.
- $\\lambda = \\cos\\theta \\pm \\sqrt{\\cos^2\\theta - 1} = \\cos\\theta \\pm i\\sin\\theta = e^{\\pm i\\theta}$.

Với $\\theta = 90°$: $\\lambda = \\pm i$ (như Bài 5). Với $\\theta = 60°$: $\\lambda = \\tfrac{1}{2} \\pm i\\tfrac{\\sqrt{3}}{2}$. Ý nghĩa: $|\\lambda| = 1$ luôn (quay không co giãn độ dài), phần ảo $\\sin\\theta$ mã hóa **góc quay**. Không có vector thực nào thoả $R\\vec{v} = \\lambda\\vec{v}$ với $\\lambda$ thực vì mọi vector đều bị xoay.

🔁 **Dừng lại tự kiểm tra**

1. Ma trận chuyển PageRank 2 trang A↔B (A→B, B→A) là gì? Tìm $\\vec{\\pi}$.
2. $A$ có trị riêng $0.9$ và $-0.5$. Hệ $\\vec{x}_{k+1} = A\\vec{x}_k$ ổn định không?

<details><summary>Đáp án</summary>

1. $M = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$. Giải $M\\vec{\\pi} = \\vec{\\pi}$ với tổng = 1: $\\pi_B = \\pi_A$ và $\\pi_A = \\pi_B \\to \\pi_A = \\pi_B = 0.5$. $\\vec{\\pi} = (0.5, 0.5)$.
2. $|\\lambda_{\\max}| = \\max(0.9, \\ 0.5) = 0.9 < 1 \\to$ **ổn định**, mọi quỹ đạo tắt về $\\vec{0}$.

</details>

### 📝 Tóm tắt mục 6

- PageRank: $\\vec{\\pi}$ là vector riêng của ma trận chuyển ứng với $\\lambda = 1$ (luôn tồn tại vì cột cộng = 1).
- Hệ động lực $\\vec{x}_{k+1} = A\\vec{x}_k$: $|\\lambda_{\\max}| < 1$ ổn định, $> 1$ bùng nổ, $= 1$ biên giới.
- Ma trận xoay → trị riêng phức $e^{\\pm i\\theta}$; ma trận thực vẫn có thể có trị riêng phức.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tìm trị riêng của $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$.

**Bài 2**: Tìm vector riêng tương ứng của $A$ ở Bài 1.

**Bài 3**: Cho $A = \\begin{bmatrix} 5 & 0 \\\\ 0 & -2 \\end{bmatrix}$. Tính trace và det. So sánh với tổng & tích trị riêng.

**Bài 4**: Ma trận $A$ có trị riêng $\\lambda = 2$ (bội 1) và $\\lambda = -1$. Tính $\\det(A)$.

**Bài 5**: $A$ là ma trận quay 90° $R(\\pi/2) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$. Tính trị riêng. Nhận xét?

**Bài 6** (chéo hóa): Cho $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}$. Tìm $P, D$ sao cho $A = PDP^{-1}$.

**Bài 7** (tính $A^n$): Dùng kết quả Bài 6, tính $A^4$.

**Bài 8** (không chéo hóa được): Chứng minh $A = \\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$ không chéo hóa được.

**Bài 9** (ứng dụng): Ma trận chuyển PageRank $M = \\begin{bmatrix} 0 & 1/2 \\\\ 1 & 1/2 \\end{bmatrix}$ (cột cộng = 1). Tìm phân phối ổn định $\\vec{\\pi}$ (vector riêng $\\lambda = 1$, tổng = 1).

### Lời giải

**Bài 1**: $\\det\\begin{vmatrix} 4-\\lambda & 1 \\\\ 2 & 3-\\lambda \\end{vmatrix} = (4-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = 0$. → $\\lambda = 2, 5$.

**Bài 2**:  
- $\\lambda = 2$: $(A-2I)\\cdot\\vec{v} = 0 \\to \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}\\vec{v} = 0 \\to 2v_1 + v_2 = 0 \\to \\vec{v} = (1, -2)$.  
- $\\lambda = 5$: $(A-5I)\\cdot\\vec{v} = 0 \\to \\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}\\vec{v} = 0 \\to v_1 = v_2 \\to \\vec{v} = (1, 1)$.

**Bài 3**: Trace $= 5 + (-2) = 3$. Det $= -10$. Trị riêng $= 5, -2$. $\\sum = 3$ ✓. $\\prod = -10$ ✓.

**Bài 4**: $\\det = 2\\cdot(-1) = -2$.

**Bài 5**: $\\det(R - \\lambda I) = \\lambda^2 + 1 = 0 \\to \\lambda = \\pm i$ (số phức!). → $R$ không chéo hóa được trên $\\mathbb{R}$, chỉ trên $\\mathbb{C}$. Hợp lý: quay 90° không có vector nào "bất biến hướng" trong $\\mathbb{R}^2$.

**Bài 6**: Tam giác trên → trị riêng đọc trên đường chéo: $\\lambda_1 = 1, \\lambda_2 = 3$.
- $\\lambda = 1$: $A - I = \\begin{bmatrix} 0 & 2 \\\\ 0 & 2 \\end{bmatrix} \\to v_2 = 0 \\to \\vec{v}_1 = (1, 0)$.
- $\\lambda = 3$: $A - 3I = \\begin{bmatrix} -2 & 2 \\\\ 0 & 0 \\end{bmatrix} \\to v_1 = v_2 \\to \\vec{v}_2 = (1, 1)$.
- Vậy $P = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, $D = \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix}$. Kiểm $\\det(P) = 1 \\neq 0$ → khả nghịch, chéo hóa được.

**Bài 7**: $P^{-1} = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$ (vì $\\det P = 1$). $D^4 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 81 \\end{bmatrix}$ (vì $3^4 = 81$).
$$A^4 = P D^4 P^{-1} = \\begin{bmatrix} 1 & 81 \\\\ 0 & 81 \\end{bmatrix}\\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 80 \\\\ 0 & 81 \\end{bmatrix}.$$
Kiểm nhanh: ma trận tam giác trên giữ nguyên dạng tam giác, đường chéo là $1^4 = 1$ và $3^4 = 81$ ✓.

**Bài 8**: PT đặc trưng $(2-\\lambda)^2 = 0 \\to \\lambda = 2$ **bội đại số 2**. Tìm vector riêng: $A - 2I = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} \\to v_2 = 0$, $v_1$ tự do → chỉ **1 hướng** $\\vec{v} = (1, 0)$ (bội hình học = 1). Bội hình học $(1) <$ bội đại số $(2)$ → thiếu 1 vector riêng độc lập → không lập được $P$ khả nghịch → **không chéo hóa được** (ma trận khiếm khuyết).

**Bài 9**: Giải $M\\vec{\\pi} = \\vec{\\pi}$: hàng 1 cho $\\tfrac{1}{2}\\pi_2 = \\pi_1 \\to \\pi_2 = 2\\pi_1$. Ràng buộc $\\pi_1 + \\pi_2 = 1 \\to \\pi_1 + 2\\pi_1 = 1 \\to \\pi_1 = \\tfrac{1}{3}$. Vậy $\\vec{\\pi} = (\\tfrac{1}{3}, \\tfrac{2}{3}) \\approx (0.333, 0.667)$. Trang 2 quan trọng gấp đôi trang 1 (vì trang 1 dồn toàn bộ link sang trang 2). Kiểm: $M\\vec{\\pi} = (\\tfrac{1}{2}\\cdot\\tfrac{2}{3}, \\ \\tfrac{1}{3} + \\tfrac{1}{2}\\cdot\\tfrac{2}{3}) = (\\tfrac{1}{3}, \\tfrac{2}{3}) = \\vec{\\pi}$ ✓.

---

## 8. Bài tiếp theo

[Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/).

## 📝 Tổng kết

1. **$A\\cdot\\vec{v} = \\lambda\\cdot\\vec{v}$** với $\\vec{v} \\neq 0$. $\\lambda$ = trị riêng (hệ số co/giãn, không xoay hướng), $\\vec{v}$ = vector riêng.
2. **$\\det(A - \\lambda I) = 0$** → tìm trị riêng. Công thức vàng 2×2: $\\lambda^2 - T\\lambda + D = 0$. Sau đó giải $(A - \\lambda I)\\vec{v} = 0$ → vector riêng.
3. **Chéo hóa**: $A = PDP^{-1}$ ($P$ = cột vector riêng, $D$ = chéo trị riêng) → $A^n = PD^nP^{-1}$ tính lũy thừa nhanh. Cần đủ $n$ vector riêng độc lập; ma trận khiếm khuyết (bội hình học < bội đại số) không chéo hóa được.
4. **Trace $= \\sum \\lambda$, Det $= \\prod \\lambda$** — kiểm tra nhanh; ma trận đối xứng → trị riêng thực, vector riêng trực giao.
5. Ứng dụng: **PCA** (vector riêng covariance = trục chính), **PageRank** (vector riêng $\\lambda=1$ của ma trận chuyển = ranking), **hệ động lực** ($|\\lambda_{\\max}| < 1$ ổn định), **Eigenfaces**. Ma trận xoay → trị riêng phức $e^{\\pm i\\theta}$.
`;
