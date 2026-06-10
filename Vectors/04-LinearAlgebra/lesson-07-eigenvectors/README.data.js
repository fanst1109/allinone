// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/04-LinearAlgebra/lesson-07-eigenvectors/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Eigenvector & Eigenvalue

> Tầng 4 — Linear Algebra · Bài 7/8 · Tiền đề: [Lesson 06 — Ma trận là biến đổi](../lesson-06-matrix-as-transform/)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **eigenvector** là hướng "không bị xoay" khi áp ma trận $A$, **eigenvalue** là hệ số kéo dài/co lại trên hướng đó.
- Lập và giải **phương trình đặc trưng** $\\det(A - \\lambda I) = 0$ để tìm eigenvalue cho ma trận 2×2 (và 3×3 đơn giản).
- Từ eigenvalue, giải $(A - \\lambda I)\\mathbf{v} = 0$ để tìm eigenvector.
- Nắm 2 hệ thức kiểm tra: $\\lambda_1 + \\lambda_2 = \\operatorname{trace}(A)$, $\\lambda_1 \\cdot \\lambda_2 = \\det(A)$.
- **Diagonalization** $A = P D P^{-1}$ và dùng để tính $A^k$ cực nhanh.
- Hiểu **định lý phổ (spectral theorem)** cho ma trận đối xứng: luôn có hệ eigenvector trực giao.
- Áp dụng vào: **PageRank** (Google), **PCA** (giảm chiều), **spectral clustering**, **stability** của hệ động học.
- Cài đặt **power iteration** — thuật toán lặp tìm eigenvalue có $|\\lambda|$ lớn nhất, nền của PageRank thuở ban đầu.

## Kiến thức tiền đề

- [Lesson 05 — Ma trận: phép toán](../lesson-05-matrices/) — phép nhân ma trận-vector $A\\mathbf{v}$, định thức $\\det(A)$, ma trận đơn vị $I$, ma trận nghịch đảo $A^{-1}$.
- [Lesson 06 — Ma trận là biến đổi](../lesson-06-matrix-as-transform/) — hình dung $A$ như **một hàm** kéo, xoay, lật, co không gian.
- [Algebra Lesson 06](../../01-Algebra/lesson-06-linear-quadratic/) — nghiệm phương trình bậc 2 (dùng để giải đặc trưng).
- [Algebra Lesson 08](../../01-Algebra/lesson-08-linear-systems/) — giải hệ phương trình tuyến tính bằng khử Gauss (dùng để tìm eigenvector).

---

## 1. Vì sao phải học cái này?

> **Câu hỏi mở bài**: Khi áp ma trận $A$ lên một vector $\\mathbf{v}$, kết quả $A\\mathbf{v}$ thường **xoay** và **kéo dài** $\\mathbf{v}$ đi đâu đó. Có cách nào "xếp gọn" hành động của $A$ thành những thao tác đơn giản nhất — chỉ là **kéo dài** trên một số trục riêng?

Câu trả lời: tìm những **trục đặc biệt** mà $A$ chỉ kéo dài/co lại (không xoay). Trên các trục đó, hành động của $A$ đơn giản như **nhân với một số**. Đó là ý tưởng eigenvector/eigenvalue.

### 1.1 💡 Trực giác: "trục không bị xoay"

Hình dung tấm cao su $\\mathbb{R}^2$ được kéo dãn bởi ma trận $A$. Hầu hết vector mũi tên bị **xoay đi hướng khác** sau khi áp $A$. Nhưng có một số hướng — gọi là **trục riêng** — mà mũi tên sau khi biến đổi vẫn nằm trên **cùng đường thẳng** đi qua gốc, chỉ là dài/ngắn hơn (hoặc đảo chiều).

- Mũi tên trên trục riêng: **eigenvector** (vector riêng).
- Hệ số kéo dài/co lại trên trục đó: **eigenvalue** (giá trị riêng), ký hiệu $\\lambda$ (lambda).

Công thức gọn:

$$A \\mathbf{v} = \\lambda \\mathbf{v} \\quad \\text{với } \\mathbf{v} \\neq 0$$

Hai vế cùng vector! Bên trái là phép nhân ma trận-vector, bên phải chỉ là nhân vô hướng. **Nhân ma trận lớn → thu về nhân một số.** Đó là sự "đơn giản hóa" mà ta theo đuổi.

### 1.2 Một ví dụ ngay lập tức để có cảm giác

Lấy $A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}$ (ma trận chéo). Áp lên $\\mathbf{v} = (1, 0)$:

$$A \\mathbf{v} = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix} \\cdot (1, 0) = (3 \\cdot 1 + 0 \\cdot 0,\\ 0 \\cdot 1 + 2 \\cdot 0) = (3, 0) = 3 \\cdot (1, 0)$$

→ Vector $(1, 0)$ bị kéo dài lên gấp 3 mà **không xoay**. Vậy $(1, 0)$ là eigenvector, $\\lambda = 3$ là eigenvalue.

Tương tự $(0, 1) \\to (0, 2) = 2 \\cdot (0, 1)$ → eigenvector, $\\lambda = 2$.

Còn $\\mathbf{v} = (1, 1)$? Ta có $A\\mathbf{v} = (3, 2)$, không cùng phương với $(1, 1)$ (vì $3/1 \\neq 2/1$). → **không** phải eigenvector.

### 1.3 ❓ Câu hỏi tự nhiên của người đọc

- "Có phải mọi ma trận đều có eigenvector?" → **Không**. Ma trận xoay 90° không có eigenvector thực (sẽ tính ở mục 4.4).
- "Nếu $\\lambda = 0$ thì sao?" → $A\\mathbf{v} = 0$, tức là $\\mathbf{v}$ nằm trong **kernel** của $A$. Có eigenvalue 0 ⇔ $\\det(A) = 0$ ⇔ $A$ không khả nghịch.
- "Eigenvector có duy nhất không?" → **Không**. Nếu $\\mathbf{v}$ là eigenvector thì $2\\mathbf{v}$, $-\\mathbf{v}$, $c\\mathbf{v}$ (mọi $c \\neq 0$) đều là eigenvector cùng $\\lambda$. Chúng nằm trên cùng một đường thẳng — gọi là **eigenspace**.
- "Có cần $\\mathbf{v}$ đơn vị (norm 1) không?" → Không bắt buộc trong định nghĩa, nhưng trong thực hành ta thường **chuẩn hóa** $\\mathbf{v}$ về độ dài 1 để báo cáo gọn.

📝 **Tóm tắt mục 1**:
- Eigenvector = hướng không bị xoay khi áp ma trận.
- Eigenvalue = hệ số kéo dài/co trên hướng đó.
- $A \\mathbf{v} = \\lambda \\mathbf{v}$, với $\\mathbf{v} \\neq 0$.
- Eigenvector là đường thẳng (1 chiều) — có vô số đại diện.

---

## 2. Định nghĩa chính xác

**Định nghĩa.** Cho ma trận vuông $A \\in \\mathbb{R}^{n \\times n}$. Một **eigenvector** của $A$ là một vector $\\mathbf{v} \\in \\mathbb{R}^n$, $\\mathbf{v} \\neq 0$, sao cho tồn tại số thực (hoặc phức) $\\lambda$ với:

$$A \\mathbf{v} = \\lambda \\mathbf{v}$$

Số $\\lambda$ được gọi là **eigenvalue** ứng với $\\mathbf{v}$.

⚠ **Lỗi thường gặp**:
- Quên ràng buộc $\\mathbf{v} \\neq 0$. Nếu cho phép $\\mathbf{v} = 0$ thì $A \\cdot 0 = 0 = \\lambda \\cdot 0$ đúng với mọi $\\lambda$ — vô nghĩa.
- Nhầm eigenvector và eigenvalue. **Eigenvalue là một số**, **eigenvector là một vector**.
- Quên rằng $A$ **phải vuông**. Khái niệm eigen chỉ định nghĩa cho ma trận vuông ($n \\times n$).

### 2.1 Gốc chữ "eigen"

"Eigen" trong tiếng Đức nghĩa là "riêng, của bản thân, đặc trưng" — David Hilbert dùng từ này đầu thế kỷ 20. Vậy:
- **Eigenvector** = "vector riêng" (vector đặc trưng của $A$).
- **Eigenvalue** = "giá trị riêng" của $A$.
- **Eigenspace** = "không gian riêng" ứng với một $\\lambda$ cụ thể.

### 2.2 Eigenspace ứng với một eigenvalue

Với eigenvalue $\\lambda$ cố định, tập hợp các eigenvector ứng với $\\lambda$ **cùng với vector 0** tạo thành một không gian con của $\\mathbb{R}^n$:

$$E_\\lambda = \\{ \\mathbf{v} \\in \\mathbb{R}^n : A \\mathbf{v} = \\lambda \\mathbf{v} \\} = \\ker(A - \\lambda I)$$

- Nếu $\\dim(E_\\lambda) = 1$: chỉ có 1 hướng riêng (đường thẳng).
- Nếu $\\dim(E_\\lambda) \\geq 2$: nhiều hướng cùng eigenvalue (như ma trận $2I$ có mọi vector đều là eigenvector với $\\lambda = 2$).

🔁 **Dừng lại tự kiểm tra**:
1. Vector $0$ có phải eigenvector không? Vì sao?
2. Cho $A \\mathbf{v} = 5 \\mathbf{v}$, hỏi $A (3\\mathbf{v}) = ?$

<details>
<summary>Đáp án</summary>

1. Không. Theo định nghĩa eigenvector phải khác $0$. Tuy nhiên $0$ **thuộc** mọi eigenspace $E_\\lambda$.
2. $A(3\\mathbf{v}) = 3 \\cdot A\\mathbf{v} = 3 \\cdot (5\\mathbf{v}) = 15\\mathbf{v} = 5 \\cdot (3\\mathbf{v})$ → $3\\mathbf{v}$ cũng là eigenvector cùng $\\lambda = 5$. (Đây là lý do eigenspace là không gian con — đóng dưới scalar multiplication.)

</details>

📝 **Tóm tắt mục 2**:
- $A \\mathbf{v} = \\lambda \\mathbf{v}$, $\\mathbf{v} \\neq 0$.
- Mỗi eigenvalue đi kèm một **eigenspace** = kernel của $A - \\lambda I$.
- Eigenspace luôn chứa $0$ (nhưng $0$ không gọi là eigenvector).

---

## 3. Phương trình đặc trưng (Characteristic Polynomial)

Làm sao tìm $\\lambda$ một cách hệ thống? Viết lại $A \\mathbf{v} = \\lambda \\mathbf{v}$ thành:

$$\\begin{aligned}
A \\mathbf{v} - \\lambda \\mathbf{v} &= 0 \\\\
(A - \\lambda I) \\mathbf{v} &= 0 \\quad (\\text{đẩy } \\lambda I \\text{ sang trái, } I \\text{ là ma trận đơn vị})
\\end{aligned}$$

Phương trình $(A - \\lambda I) \\mathbf{v} = 0$ có **nghiệm $\\mathbf{v} \\neq 0$** khi và chỉ khi $A - \\lambda I$ không khả nghịch, tương đương:

$$\\det(A - \\lambda I) = 0$$

Đây là **phương trình đặc trưng**. Vế trái khi khai triển là một đa thức bậc $n$ theo $\\lambda$ — gọi là **đa thức đặc trưng** $p_A(\\lambda)$.

### 3.1 💡 Trực giác

$\\det = 0$ nghĩa là $(A - \\lambda I)$ **bóp không gian xuống chiều thấp hơn** (xem Lesson 06). Khi đó có vector $\\mathbf{v} \\neq 0$ bị bóp về $0$ — đó chính là eigenvector ta tìm.

### 3.2 Walk-through chi tiết cho ma trận 2×2

Cho $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$. Tính:

$$A - \\lambda I = \\begin{bmatrix} a-\\lambda & b \\\\ c & d-\\lambda \\end{bmatrix}$$

$$\\begin{aligned}
\\det(A - \\lambda I) &= (a-\\lambda)(d-\\lambda) - bc \\\\
&= \\lambda^2 - (a+d) \\cdot \\lambda + (ad - bc) \\\\
&= \\lambda^2 - \\operatorname{trace}(A) \\cdot \\lambda + \\det(A)
\\end{aligned}$$

→ **Công thức vàng cho 2×2**:

$$p_A(\\lambda) = \\lambda^2 - T \\cdot \\lambda + D \\quad \\text{với } T = \\operatorname{trace}(A),\\ D = \\det(A)$$

Hai nghiệm:

$$\\lambda = \\frac{T \\pm \\sqrt{T^2 - 4D}}{2}$$

### 3.3 Ví dụ tính trực tiếp

**Ví dụ 1.** $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$. $T = 4 + 3 = 7$, $D = 4 \\cdot 3 - 1 \\cdot 2 = 10$.

$$p_A(\\lambda) = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 2)(\\lambda - 5) \\to \\lambda_1 = 2,\\ \\lambda_2 = 5$$

Kiểm tra: $\\lambda_1 + \\lambda_2 = 7 = T$ ✓; $\\lambda_1 \\cdot \\lambda_2 = 10 = D$ ✓.

**Ví dụ 2.** $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ (tam giác trên). $T = 5$, $D = 6$.

$$p_A(\\lambda) = \\lambda^2 - 5\\lambda + 6 = (\\lambda - 2)(\\lambda - 3) \\to \\lambda_1 = 2,\\ \\lambda_2 = 3$$

Nhận xét: với ma trận **tam giác** (trên hoặc dưới), eigenvalue chính là các phần tử trên đường chéo chính.

**Ví dụ 3.** $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ (đối xứng). $T = 4$, $D = 3$.

$$p_A(\\lambda) = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3) \\to \\lambda_1 = 1,\\ \\lambda_2 = 3$$

**Ví dụ 4.** $A = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ (xoay 90°). $T = 0$, $D = 1$.

$$p_A(\\lambda) = \\lambda^2 + 1 = 0 \\to \\lambda = \\pm i$$

**Không có eigenvalue thực** — phù hợp với trực giác: xoay 90° không có hướng nào "bất biến" trong $\\mathbb{R}^2$ thật.

### 3.4 ⚠ Lỗi thường gặp

- Quên trừ $\\lambda$ trên đường chéo: viết $\\det(A) = 0$ chứ không phải $\\det(A - \\lambda I) = 0$. Sai hoàn toàn.
- Đặt sai dấu trong khử Gauss khi $\\lambda$ âm: phải xử lý $\\lambda = -3$ cẩn thận, vd $A - (-3)I = A + 3I$.
- Tưởng đa thức đặc trưng phải có nghiệm thực — với ma trận thực vẫn có thể nghiệm phức.

🔁 **Dừng lại tự kiểm tra**:
1. Cho $A = \\begin{bmatrix} 5 & 2 \\\\ -1 & 2 \\end{bmatrix}$, lập đa thức đặc trưng.
2. Đoán eigenvalue của $A = \\begin{bmatrix} 7 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & -1 \\end{bmatrix}$ không cần tính.

<details>
<summary>Đáp án</summary>

1. $T = 7$, $D = 5 \\cdot 2 - 2 \\cdot (-1) = 12$. $p_A(\\lambda) = \\lambda^2 - 7\\lambda + 12 = (\\lambda-3)(\\lambda-4)$ → $\\lambda = 3, 4$.
2. Ma trận chéo → eigenvalue là chính các phần tử đường chéo: $7, 3, -1$.

</details>

📝 **Tóm tắt mục 3**:
- Eigenvalue = nghiệm của $\\det(A - \\lambda I) = 0$.
- 2×2: $p_A(\\lambda) = \\lambda^2 - T \\cdot \\lambda + D$ với $T = \\operatorname{trace}$, $D = \\det$.
- Tam giác/chéo → eigenvalue đọc thẳng trên đường chéo.
- Đa thức đặc trưng bậc $n$ có đúng $n$ nghiệm (đếm cả phức và bội).

---

## 4. Tìm eigenvector sau khi biết eigenvalue

Sau khi có $\\lambda$, giải hệ:

$$(A - \\lambda I) \\mathbf{v} = 0$$

bằng khử Gauss. Vì $\\det(A - \\lambda I) = 0$, ma trận này **suy biến** → hệ có vô số nghiệm tạo thành một không gian con (eigenspace).

### 4.1 Walk-through Ví dụ 1: $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$

Đã tìm $\\lambda_1 = 2$, $\\lambda_2 = 5$.

**Với $\\lambda = 2$**:

$$A - 2I = \\begin{bmatrix} 4-2 & 1 \\\\ 2 & 3-2 \\end{bmatrix} = \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}$$

Giải $\\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix} \\cdot (x, y) = 0$:
- Cả 2 hàng cho $2x + y = 0$ → $y = -2x$.
- Đặt $x = 1$ → $\\mathbf{v}_1 = (1, -2)$.

Kiểm tra: $A \\mathbf{v}_1 = (4 \\cdot 1 + 1 \\cdot (-2),\\ 2 \\cdot 1 + 3 \\cdot (-2)) = (2, -4) = 2 \\cdot (1, -2)$ ✓.

**Với $\\lambda = 5$**:

$$A - 5I = \\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}$$

Hàng 1: $-x + y = 0$ → $y = x$. Đặt $x = 1$ → $\\mathbf{v}_2 = (1, 1)$.

Kiểm tra: $A \\mathbf{v}_2 = (4 + 1,\\ 2 + 3) = (5, 5) = 5 \\cdot (1, 1)$ ✓.

### 4.2 Walk-through Ví dụ 2: $A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$

$\\lambda_1 = 3$, $\\lambda_2 = 2$.

**Với $\\lambda = 3$**: $A - 3I = \\begin{bmatrix} 0 & 1 \\\\ 0 & -1 \\end{bmatrix}$. Hàng 1: $y = 0$. $x$ tự do → $\\mathbf{v}_1 = (1, 0)$.

**Với $\\lambda = 2$**: $A - 2I = \\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}$. Hàng 1: $x + y = 0$ → $y = -x$. $\\mathbf{v}_2 = (1, -1)$.

Kiểm tra $\\lambda = 2$: $A \\cdot (1, -1) = (3 \\cdot 1 + 1 \\cdot (-1),\\ 0 + 2 \\cdot (-1)) = (2, -2) = 2 \\cdot (1, -1)$ ✓.

### 4.3 Walk-through Ví dụ 3 (đối xứng): $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$

$\\lambda_1 = 1$, $\\lambda_2 = 3$.

**$\\lambda = 1$**: $A - I = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$. → $x + y = 0$ → $\\mathbf{v}_1 = (1, -1)$.

**$\\lambda = 3$**: $A - 3I = \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}$. → $-x + y = 0$ → $\\mathbf{v}_2 = (1, 1)$.

Kiểm tra **trực giao** (vì $A$ đối xứng): $\\mathbf{v}_1 \\cdot \\mathbf{v}_2 = 1 \\cdot 1 + (-1) \\cdot 1 = 0$ ✓.

### 4.4 Ma trận xoay 90° — không eigenvector thực

$A = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$, eigenvalue phức $\\lambda = \\pm i$. Với $\\lambda = i$:

$$A - iI = \\begin{bmatrix} -i & -1 \\\\ 1 & -i \\end{bmatrix}$$

Hàng 2: $x - i \\cdot y = 0$ → $x = i \\cdot y$. Eigenvector phức: $\\mathbf{v} = (i, 1)$.

Trong thực hành ML thường tránh tình huống này bằng cách làm việc với **ma trận đối xứng** (covariance, Gram matrix...) — luôn có eigenvalue thực.

### 4.5 ⚠ Lỗi thường gặp

- Quên kiểm tra $A\\mathbf{v} = \\lambda\\mathbf{v}$ sau khi giải. Sai dấu hay sai số ở khử Gauss là chuyện thường — luôn verify.
- Báo nghiệm là $\\mathbf{v} = (0, 0)$. Vector 0 không phải eigenvector. Khi giải hệ, **phải** tìm nghiệm không tầm thường — đó là lý do hệ suy biến (vô số nghiệm) mới đúng.
- Nhân ma trận sai thứ tự: $A \\cdot \\mathbf{v}$ chứ không phải $\\mathbf{v} \\cdot A$ (sau là phép nhân hàng).

📝 **Tóm tắt mục 4**:
- Sau khi biết $\\lambda$, giải $(A - \\lambda I)\\mathbf{v} = 0$ để tìm eigenvector.
- Hệ luôn suy biến → vô số nghiệm → chọn 1 đại diện (thường đẹp số).
- Verify lại bằng $A \\mathbf{v} = \\lambda \\mathbf{v}$.

---

## 5. Hai hệ thức kiểm tra: Trace và Determinant

Với ma trận $n \\times n$ có $n$ eigenvalue $\\lambda_1, \\lambda_2, \\dots, \\lambda_n$ (đếm cả bội):

$$\\begin{aligned}
\\lambda_1 + \\lambda_2 + \\dots + \\lambda_n &= \\operatorname{trace}(A) = \\sum_i a_{ii} \\\\
\\lambda_1 \\cdot \\lambda_2 \\cdot \\dots \\cdot \\lambda_n &= \\det(A)
\\end{aligned}$$

Rất hữu ích để **phát hiện lỗi** khi tính tay.

### 5.1 Verify trên các ví dụ trước

| Ma trận $A$ | trace | det | eigenvalue | $\\sum\\lambda$ | $\\prod\\lambda$ | OK? |
|---|---|---|---|---|---|---|
| $\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$ | 7 | 10 | 2, 5 | 7 | 10 | ✓ |
| $\\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ | 5 | 6 | 2, 3 | 5 | 6 | ✓ |
| $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ | 4 | 3 | 1, 3 | 4 | 3 | ✓ |
| $\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$ | 5 | 6 | 2, 3 | 5 | 6 | ✓ |

### 5.2 💡 Vì sao đúng?

Khai triển đa thức đặc trưng:

$$\\begin{aligned}
p_A(\\lambda) &= (\\lambda - \\lambda_1)(\\lambda - \\lambda_2)\\dots(\\lambda - \\lambda_n) \\\\
&= \\lambda^n - \\left(\\sum \\lambda_i\\right) \\cdot \\lambda^{n-1} + \\dots + (-1)^n \\cdot \\left(\\prod \\lambda_i\\right)
\\end{aligned}$$

So với khai triển $\\det(\\lambda I - A)$: hệ số của $\\lambda^{n-1}$ là $-\\operatorname{trace}(A)$, hệ số tự do là $(-1)^n \\cdot \\det(A)$. Đối chiếu hai bên → 2 hệ thức trên.

🔁 **Tự kiểm tra**: Cho $A$ có eigenvalue $2, 3, -1$. Tính $\\operatorname{trace}(A)$, $\\det(A)$.

<details>
<summary>Đáp án</summary>

$\\operatorname{trace} = 2 + 3 + (-1) = 4$; $\\det = 2 \\cdot 3 \\cdot (-1) = -6$.

</details>

📝 **Tóm tắt mục 5**:
- $\\sum \\lambda_i = \\operatorname{trace}(A)$, $\\prod \\lambda_i = \\det(A)$.
- Dùng để kiểm tra nhanh khi tính tay.
- Nếu $\\det(A) = 0$ → có ít nhất 1 eigenvalue $= 0$.

---

## 6. Diagonalization — đường chéo hóa

### 6.1 💡 Trực giác

Eigenvector cho ta một **hệ trục mới** mà trên đó $A$ chỉ là "kéo dài đơn lẻ". Nếu đổi sang basis eigenvector, ma trận $A$ trở thành **ma trận chéo** — đơn giản nhất có thể.

### 6.2 Định lý

Cho $A \\in \\mathbb{R}^{n \\times n}$. Nếu $A$ có $n$ eigenvector độc lập tuyến tính $\\mathbf{v}_1, \\dots, \\mathbf{v}_n$ với eigenvalue $\\lambda_1, \\dots, \\lambda_n$, thì:

$$A = P D P^{-1}$$

trong đó:
- $P = [\\mathbf{v}_1 \\mid \\mathbf{v}_2 \\mid \\dots \\mid \\mathbf{v}_n]$ (ma trận có các cột là eigenvector).
- $D = \\operatorname{diag}(\\lambda_1, \\lambda_2, \\dots, \\lambda_n)$ (ma trận chéo các eigenvalue, cùng thứ tự với cột của $P$).

Tương đương: $A P = P D$.

### 6.3 Chứng minh ngắn ($A P = P D$)

Xét cột thứ $k$ của hai vế:
- $A P$: cột $k$ = $A \\cdot \\mathbf{v}_k = \\lambda_k \\cdot \\mathbf{v}_k$ (theo định nghĩa eigenvector).
- $P D$: cột $k$ = $P \\cdot (\\text{cột } k \\text{ của } D)$ = $P \\cdot (\\lambda_k \\cdot \\mathbf{e}_k)$ = $\\lambda_k \\cdot \\mathbf{v}_k$.

Hai cột bằng nhau → hai ma trận bằng nhau. ✓

Khi $P$ khả nghịch (eigenvector độc lập tuyến tính), nhân $P^{-1}$ bên phải hai vế: $A = P D P^{-1}$.

### 6.4 Khi nào diagonalizable?

$A$ diagonalizable ⇔ có đủ $n$ eigenvector độc lập tuyến tính.

- **Eigenvalue khác nhau từng đôi** → diagonalizable (eigenvector tương ứng tự khắc độc lập).
- **Có eigenvalue bội** thì cần kiểm tra: eigenspace ứng với $\\lambda$ có đủ chiều bằng bội số đại số của $\\lambda$ hay không.

### 6.5 Walk-through đầy đủ

Cho $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ (mục 4.3). Eigen: $\\lambda_1 = 1, \\mathbf{v}_1 = (1, -1)$; $\\lambda_2 = 3, \\mathbf{v}_2 = (1, 1)$.

**Lập $P$ và $D$**:

$$P = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}, \\quad D = \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix}$$

**Tính $P^{-1}$** (2×2 nghịch đảo: hoán đổi đường chéo, đổi dấu phụ, chia $\\det$):

$$\\begin{aligned}
\\det(P) &= 1 \\cdot 1 - 1 \\cdot (-1) = 2 \\\\
P^{-1} &= \\frac{1}{2} \\cdot \\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 0.5 & -0.5 \\\\ 0.5 & 0.5 \\end{bmatrix}
\\end{aligned}$$

**Verify $A = P D P^{-1}$**:

$$\\begin{aligned}
P D &= \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & 0 \\\\ 0 & 3 \\end{bmatrix} \\\\
&= \\begin{bmatrix} 1 \\cdot 1 + 1 \\cdot 0 & 1 \\cdot 0 + 1 \\cdot 3 \\\\ -1 \\cdot 1 + 1 \\cdot 0 & -1 \\cdot 0 + 1 \\cdot 3 \\end{bmatrix} = \\begin{bmatrix} 1 & 3 \\\\ -1 & 3 \\end{bmatrix}
\\end{aligned}$$

$$(P D) \\cdot P^{-1} = \\begin{bmatrix} 1 & 3 \\\\ -1 & 3 \\end{bmatrix} \\cdot \\begin{bmatrix} 0.5 & -0.5 \\\\ 0.5 & 0.5 \\end{bmatrix}$$

- Hàng 1: $(1 \\cdot 0.5 + 3 \\cdot 0.5,\\ 1 \\cdot (-0.5) + 3 \\cdot 0.5) = (0.5+1.5,\\ -0.5+1.5) = (2, 1)$ ✓
- Hàng 2: $(-1 \\cdot 0.5 + 3 \\cdot 0.5,\\ -1 \\cdot (-0.5) + 3 \\cdot 0.5) = (-0.5+1.5,\\ 0.5+1.5) = (1, 2)$ ✓

Đúng = $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ ban đầu.

### 6.6 Ý nghĩa hình học

Đọc $A \\mathbf{x} = (P D P^{-1}) \\mathbf{x}$ từ phải sang trái:
1. $P^{-1} \\mathbf{x}$: đổi tọa độ $\\mathbf{x}$ từ basis chuẩn $(\\mathbf{e}_1, \\mathbf{e}_2)$ sang basis eigenvector $(\\mathbf{v}_1, \\mathbf{v}_2)$.
2. $D \\cdot (\\dots)$: trong basis mới, chỉ là **kéo dài theo từng trục** với hệ số $\\lambda_k$.
3. $P \\cdot (\\dots)$: đổi tọa độ ngược trở lại basis chuẩn.

Vậy $A$ = "đổi sang basis riêng → kéo dài theo trục riêng → đổi về basis cũ".

⚠ **Lỗi thường gặp**:
- Để $P$ và $D$ **không cùng thứ tự** (cột thứ $k$ của $P$ phải là eigenvector của $\\lambda_k$ ở vị trí $(k, k)$ của $D$). Nếu đổi thứ tự cột $P$ thì phải đổi tương ứng trên $D$.
- Quên kiểm tra $\\det(P) \\neq 0$ (eigenvector độc lập). Nếu $\\det(P) = 0$, không diagonalizable.

📝 **Tóm tắt mục 6**:
- $A = P D P^{-1}$ khi có đủ $n$ eigenvector độc lập.
- $P$ = cột eigenvector, $D$ = chéo eigenvalue (cùng thứ tự).
- Ý nghĩa: trong basis eigenvector, $A$ chỉ là kéo dài theo trục.

---

## 7. Tính Aᵏ cực nhanh

### 7.1 Công thức

Nếu $A = P D P^{-1}$ thì:

$$\\begin{aligned}
A^2 &= (P D P^{-1})(P D P^{-1}) = P D (P^{-1}P) D P^{-1} = P D^2 P^{-1} \\\\
A^3 &= P D^3 P^{-1} \\\\
&\\ \\vdots \\\\
A^k &= P D^k P^{-1}
\\end{aligned}$$

Và $D^k$ rất dễ tính — chỉ cần lũy thừa các phần tử đường chéo:

$$D = \\operatorname{diag}(\\lambda_1, \\lambda_2, \\dots, \\lambda_n) \\to D^k = \\operatorname{diag}(\\lambda_1^k, \\lambda_2^k, \\dots, \\lambda_n^k)$$

### 7.2 Walk-through: $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$, tính $A^{10}$

Đã có $P = \\begin{bmatrix} 1 & 1 \\\\ -1 & 1 \\end{bmatrix}$, $D = \\operatorname{diag}(1, 3)$, $P^{-1} = \\begin{bmatrix} 0.5 & -0.5 \\\\ 0.5 & 0.5 \\end{bmatrix}$.

$$D^{10} = \\operatorname{diag}(1^{10}, 3^{10}) = \\operatorname{diag}(1, 59049)$$

$$\\begin{aligned}
P \\cdot D^{10} &= \\begin{bmatrix} 1 \\cdot 1 + 1 \\cdot 0 & 1 \\cdot 0 + 1 \\cdot 59049 \\\\ -1 \\cdot 1 + 1 \\cdot 0 & -1 \\cdot 0 + 1 \\cdot 59049 \\end{bmatrix} = \\begin{bmatrix} 1 & 59049 \\\\ -1 & 59049 \\end{bmatrix}
\\end{aligned}$$

$$A^{10} = (P D^{10}) \\cdot P^{-1}$$

- Hàng 1: $(1 \\cdot 0.5 + 59049 \\cdot 0.5,\\ 1 \\cdot (-0.5) + 59049 \\cdot 0.5) = (29525, 29524)$
- Hàng 2: $(-1 \\cdot 0.5 + 59049 \\cdot 0.5,\\ -1 \\cdot (-0.5) + 59049 \\cdot 0.5) = (29524, 29525)$

$$A^{10} = \\begin{bmatrix} 29525 & 29524 \\\\ 29524 & 29525 \\end{bmatrix}$$

### 7.3 Vì sao quan trọng?

- **Markov chain & random walk**: $A^k \\cdot \\mathbf{p}_0$ cho phân phối sau $k$ bước (PageRank dùng cái này).
- **Hệ động học rời rạc**: $\\mathbf{x}_{k+1} = A \\mathbf{x}_k$ → $\\mathbf{x}_k = A^k \\mathbf{x}_0$.
- **Tính nhanh fibonacci tổng quát**: viết Fibonacci dưới dạng $A^k$ của ma trận đồng hành 2×2.

❓ **Câu hỏi tự nhiên**:
- "Nếu không diagonalizable thì sao?" → Dùng dạng Jordan ($A = P J P^{-1}$ với $J$ block-diagonal). Phức tạp hơn nhưng vẫn có cách tính $A^k$.
- "$A$ không vuông thì sao?" → Không có eigenvalue, dùng **SVD** (Lesson 08).

📝 **Tóm tắt mục 7**:
- $A^k = P \\cdot D^k \\cdot P^{-1}$, độ phức tạp $O(n^3 + n)$ thay vì $O(n^3 \\cdot k)$.
- Mở đường cho Markov chain, recurrence relation, dynamical system.

---

## 8. Định lý phổ cho ma trận đối xứng

### 8.1 Phát biểu

Cho $A$ là ma trận thực **đối xứng** ($A^\\top = A$). Khi đó:

1. Mọi eigenvalue của $A$ đều là số **thực**.
2. $A$ luôn **diagonalizable**, và hơn thế, có thể chọn $n$ eigenvector **trực giao đôi một** (sau khi chuẩn hóa thành **trực chuẩn**).
3. $A = Q D Q^\\top$ trong đó $Q$ trực giao ($Q^\\top = Q^{-1}$), cột của $Q$ là eigenvector trực chuẩn.

Dạng $Q D Q^\\top$ này được gọi là **phổ phân tích (spectral decomposition)**.

### 8.2 💡 Vì sao quan trọng?

Hầu hết các ma trận quan trọng trong ML là đối xứng:
- **Covariance matrix** $\\Sigma$ trong PCA.
- **Gram matrix** $X^\\top X$ trong least squares.
- **Laplacian** của graph trong spectral clustering.
- **Hessian** của hàm mất mát.

→ Bài toán quy về tìm eigen của ma trận đối xứng — đảm bảo có nghiệm thực, dễ tính, và có cấu trúc trực giao đẹp.

### 8.3 Verify trên ví dụ

$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. Eigen: $\\lambda_1 = 1, \\mathbf{v}_1 = (1, -1)$; $\\lambda_2 = 3, \\mathbf{v}_2 = (1, 1)$.

- $\\mathbf{v}_1 \\cdot \\mathbf{v}_2 = 1 \\cdot 1 + (-1) \\cdot 1 = 0$ → **trực giao** ✓.
- Chuẩn hóa: $\\|\\mathbf{v}_1\\| = \\sqrt{2}$, $\\mathbf{q}_1 = (1/\\sqrt{2}, -1/\\sqrt{2})$. Tương tự $\\mathbf{q}_2 = (1/\\sqrt{2}, 1/\\sqrt{2})$.

$$Q = \\begin{bmatrix} 1/\\sqrt{2} & 1/\\sqrt{2} \\\\ -1/\\sqrt{2} & 1/\\sqrt{2} \\end{bmatrix} \\ (\\text{cột } \\mathbf{q}_1, \\mathbf{q}_2), \\quad D = \\operatorname{diag}(1, 3)$$

Kiểm tra $Q^\\top Q = I$:

$$Q^\\top = \\begin{bmatrix} 1/\\sqrt{2} & -1/\\sqrt{2} \\\\ 1/\\sqrt{2} & 1/\\sqrt{2} \\end{bmatrix}$$

$$\\begin{aligned}
(Q^\\top Q)_{1,1} &= (1/\\sqrt{2})^2 + (-1/\\sqrt{2})^2 = 1/2 + 1/2 = 1 \\quad \\checkmark \\\\
(Q^\\top Q)_{1,2} &= (1/\\sqrt{2})(1/\\sqrt{2}) + (-1/\\sqrt{2})(1/\\sqrt{2}) = 0 \\quad \\checkmark \\\\
(Q^\\top Q)_{2,2} &= (1/\\sqrt{2})^2 + (1/\\sqrt{2})^2 = 1 \\quad \\checkmark
\\end{aligned}$$

📝 **Tóm tắt mục 8**:
- $A^\\top = A$ → eigenvalue thực + eigenvector trực giao + $A = Q D Q^\\top$.
- Đây là lý do PCA, spectral clustering, Laplacian eigenmap... tất cả "chạy được mượt".

---

## 9. Ứng dụng

### 9.1 PageRank của Google

**Bài toán**: xếp hạng $n$ trang web theo độ "quan trọng".

**Mô hình**: random surfer click link ngẫu nhiên. Xác suất ở trang $i$ sau nhiều bước → phân phối ổn định $\\pi = (\\pi_1, \\dots, \\pi_n)$.

**Ma trận chuyển trạng thái** $M$: $M[j][i] = 1/k_i$ nếu trang $i$ có link tới trang $j$ ($k_i$ = số link ra của trang $i$), $0$ ngược lại. Mỗi cột $M$ cộng = 1.

**Phương trình bất biến**:

$$M \\cdot \\pi = \\pi$$

→ $\\pi$ là **eigenvector của $M$ với eigenvalue $\\lambda = 1$**.

Với damping factor $d = 0.85$:

$$\\begin{aligned}
M' &= d \\cdot M + \\frac{1 - d}{n} \\cdot J \\quad (J = \\text{ma trận toàn 1}) \\\\
M' \\cdot \\pi &= \\pi
\\end{aligned}$$

**Vì sao luôn có $\\lambda = 1$?** $M^\\top \\cdot \\mathbf{1} = \\mathbf{1}$ (mỗi cột $M$ cộng = 1, nên ma trận $M^\\top$ có vector toàn 1 là eigenvector với $\\lambda = 1$). Vì $M$ và $M^\\top$ cùng đa thức đặc trưng → $M$ cũng có $\\lambda = 1$.

### 9.2 Mini ví dụ PageRank

4 trang A, B, C, D với liên kết:
- A → B, C
- B → C
- C → A
- D → C

Ma trận chuyển (cột $i$ = phân phối từ trang $i$):
\`\`\`
         from: A    B    C    D
to:  A [  0    0    1    0  ]
     B [  1/2  0    0    0  ]
     C [  1/2  1    0    1  ]
     D [  0    0    0    0  ]
\`\`\`

(Lưu ý: D không có link ra. Trong thực tế thêm "dangling node fix" — random teleport.)

Áp dụng power iteration (mục 10) từ $\\pi_0 = (0.25, 0.25, 0.25, 0.25)$:
- Bước 1: $M \\pi_0 = (0.25, 0.125, 0.5, 0)$
- Bước 2: $M \\pi_1 = (0.5, 0.125, 0.25, 0)$
- ... hội tụ về $\\pi \\approx (0.39, 0.20, 0.41, 0)$ (chuẩn hóa lại, ignore D).

Hạng: C ($0.41$) > A ($0.39$) > B ($0.20$) > D ($0$). C cao nhất vì nhiều trang trỏ tới.

### 9.3 PCA (Principal Component Analysis)

(Sẽ học chi tiết ở **Lesson 08**.)

**Bài toán**: giảm chiều dữ liệu — tìm hướng giữ nhiều phương sai (variance) nhất.

**Cách**:
1. Tính ma trận covariance $\\Sigma = \\frac{1}{n} \\cdot X^\\top X$ (sau khi đã center data).
2. $\\Sigma$ đối xứng → eigen-decomposition $\\Sigma = Q D Q^\\top$.
3. **Principal components** = cột của $Q$, sắp xếp theo $\\lambda$ giảm dần.
4. Giữ $k$ thành phần đầu → giảm chiều từ $d$ xuống $k$.

Eigenvalue $\\lambda_i$ = phương sai dữ liệu chiếu lên trục $\\mathbf{q}_i$. Tỷ lệ $\\lambda_i / \\sum_j \\lambda_j$ = % phương sai giữ được.

### 9.4 Spectral Clustering

**Bài toán**: phân cụm điểm dữ liệu khi cluster không có dạng hình tròn (k-means kém).

**Cách**:
1. Lập graph: nút = điểm, cạnh = độ tương đồng ($\\exp(-\\|\\mathbf{x}_i - \\mathbf{x}_j\\|^2 / 2\\sigma^2)$).
2. Tính **Laplacian** $L = D - W$ ($W$ ma trận trọng số, $D$ chéo bậc nút).
3. $L$ đối xứng PSD → tính eigenvector của $k$ eigenvalue nhỏ nhất.
4. Gộp $k$ eigenvector thành ma trận $n \\times k$ → k-means trên các hàng.

Eigenvector của $L$ mã hóa cấu trúc cluster — đây là một trong những trường hợp eigen "đẹp" và bất ngờ nhất trong ML.

### 9.5 Stability của hệ động học

Hệ rời rạc: $\\mathbf{x}_{k+1} = A \\mathbf{x}_k$. Hành vi dài hạn phụ thuộc eigenvalue của $A$:
- $|\\lambda_{\\max}| < 1$ → mọi $\\mathbf{x}_k \\to 0$ (ổn định).
- $|\\lambda_{\\max}| > 1$ → $\\mathbf{x}_k$ bùng nổ (không ổn định).
- $|\\lambda_{\\max}| = 1$ → biên giới (oscillation).

Hệ liên tục: $d\\mathbf{x}/dt = A \\mathbf{x}$. Phụ thuộc dấu phần thực của eigenvalue:
- $\\operatorname{Re}(\\lambda_{\\max}) < 0$ → ổn định (mọi nghiệm về 0).
- $\\operatorname{Re}(\\lambda_{\\max}) > 0$ → không ổn định.

📝 **Tóm tắt mục 9**:
- PageRank: eigenvector của $\\lambda = 1$ của ma trận chuyển = ranking ổn định.
- PCA: eigenvector của covariance = trục giữ phương sai (Lesson 08).
- Spectral clustering: eigenvector Laplacian → cluster.
- Stability: dấu/độ lớn eigenvalue → hành vi dài hạn.

---

## 10. Power Iteration — thuật toán tìm eigenvalue lớn nhất

### 10.1 Ý tưởng

Tìm tất cả eigenvalue của ma trận lớn ($n$ cỡ triệu — như graph web) quá đắt. Nhưng nhiều khi ta chỉ cần **eigenvalue có $|\\lambda|$ lớn nhất** (gọi là **dominant eigenvalue**) và eigenvector tương ứng. PageRank, PCA top-k, spectral clustering đều cần cái này.

**Thuật toán**:
\`\`\`
1. Chọn v₀ ngẫu nhiên (không trùng kernel).
2. Lặp:
     w = A · v_k
     v_{k+1} = w / ‖w‖     (chuẩn hóa)
3. Sau nhiều lần lặp, v_k → eigenvector của |λ_max|.
4. Eigenvalue ước lượng: λ ≈ (v_k)ᵀ · A · v_k    (Rayleigh quotient)
\`\`\`

### 10.2 💡 Vì sao chạy được?

Phân tích $\\mathbf{v}_0$ theo basis eigenvector $\\mathbf{v}_0 = c_1 \\mathbf{u}_1 + c_2 \\mathbf{u}_2 + \\dots + c_n \\mathbf{u}_n$:

$$\\begin{aligned}
A \\mathbf{v}_0 &= c_1 \\lambda_1 \\mathbf{u}_1 + c_2 \\lambda_2 \\mathbf{u}_2 + \\dots + c_n \\lambda_n \\mathbf{u}_n \\\\
A^2 \\mathbf{v}_0 &= c_1 \\lambda_1^2 \\mathbf{u}_1 + \\dots + c_n \\lambda_n^2 \\mathbf{u}_n \\\\
A^k \\mathbf{v}_0 &= c_1 \\lambda_1^k \\mathbf{u}_1 + \\dots + c_n \\lambda_n^k \\mathbf{u}_n \\\\
&= \\lambda_1^k \\cdot \\left( c_1 \\mathbf{u}_1 + c_2 (\\lambda_2/\\lambda_1)^k \\mathbf{u}_2 + \\dots \\right)
\\end{aligned}$$

Nếu $|\\lambda_1| > |\\lambda_i|$ với $i \\geq 2$, thì $(\\lambda_i/\\lambda_1)^k \\to 0$. Hạng tử đầu thống trị, $A^k \\mathbf{v}_0$ chỉ về hướng $\\mathbf{u}_1$.

Chuẩn hóa mỗi bước để không tràn số.

### 10.3 Walk-through 5 bước

Cho $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ (eigenvalue $1$ và $3$, kỳ vọng hội tụ về $\\lambda_{\\max} = 3$, eigenvector $(1, 1)/\\sqrt{2}$).

Khởi tạo $\\mathbf{v}_0 = (1, 0)$.

**Bước 1**:

$$\\begin{aligned}
\\mathbf{w} &= A \\mathbf{v}_0 = (2 \\cdot 1 + 1 \\cdot 0,\\ 1 \\cdot 1 + 2 \\cdot 0) = (2, 1) \\\\
\\|\\mathbf{w}\\| &= \\sqrt{5} \\approx 2.236 \\\\
\\mathbf{v}_1 &= (2/\\sqrt{5}, 1/\\sqrt{5}) \\approx (0.894, 0.447)
\\end{aligned}$$

**Bước 2**:

$$\\begin{aligned}
\\mathbf{w} &= A \\mathbf{v}_1 = (2 \\cdot 0.894 + 1 \\cdot 0.447,\\ 1 \\cdot 0.894 + 2 \\cdot 0.447) = (2.236, 1.789) \\\\
\\|\\mathbf{w}\\| &= \\sqrt{5.0 + 3.2} = \\sqrt{8.2} \\approx 2.864 \\\\
\\mathbf{v}_2 &\\approx (0.780, 0.625)
\\end{aligned}$$

**Bước 3**:

$$\\begin{aligned}
\\mathbf{w} &= A \\mathbf{v}_2 \\approx (2 \\cdot 0.780 + 0.625,\\ 0.780 + 2 \\cdot 0.625) = (2.184, 2.030) \\\\
\\|\\mathbf{w}\\| &\\approx 2.981 \\\\
\\mathbf{v}_3 &\\approx (0.733, 0.681)
\\end{aligned}$$

**Bước 4**:

$$\\begin{aligned}
\\mathbf{w} &\\approx (2 \\cdot 0.733 + 0.681,\\ 0.733 + 2 \\cdot 0.681) = (2.147, 2.095) \\\\
\\|\\mathbf{w}\\| &\\approx 3.000 \\\\
\\mathbf{v}_4 &\\approx (0.716, 0.698)
\\end{aligned}$$

**Bước 5**:

$$\\begin{aligned}
\\mathbf{w} &\\approx (2 \\cdot 0.716 + 0.698,\\ 0.716 + 2 \\cdot 0.698) = (2.130, 2.112) \\\\
\\|\\mathbf{w}\\| &\\approx 3.000 \\\\
\\mathbf{v}_5 &\\approx (0.710, 0.704)
\\end{aligned}$$

So với eigenvector chính xác $(1/\\sqrt{2}, 1/\\sqrt{2}) \\approx (0.7071, 0.7071)$ → hội tụ rất nhanh.

Eigenvalue ước lượng:

$$\\begin{aligned}
\\lambda &\\approx \\mathbf{v}_5^\\top A \\mathbf{v}_5 = (0.710, 0.704) \\cdot (2.130, 2.112) \\\\
&\\approx 0.710 \\cdot 2.130 + 0.704 \\cdot 2.112 \\\\
&\\approx 1.512 + 1.487 = 2.999 \\approx 3 \\quad \\checkmark
\\end{aligned}$$

### 10.4 ⚠ Lỗi thường gặp

- **$\\mathbf{v}_0$ vô tình trực giao với $\\mathbf{u}_1$** → $c_1 = 0$ → không hội tụ về $\\mathbf{u}_1$. Khắc phục: random $\\mathbf{v}_0$, thêm vài bước "kick" nhẹ.
- **$|\\lambda_1| = |\\lambda_2|$** (vd $\\lambda_1 = 1, \\lambda_2 = -1$) → không hội tụ (dao động). Khắc phục: dùng shifted power iteration $A + \\alpha I$.
- Quên chuẩn hóa → $\\|\\mathbf{v}_k\\|$ bùng nổ hoặc về 0.

### 10.5 Phiên bản nâng cao

- **Inverse iteration**: áp $A^{-1}$ thay vì $A$ → tìm eigenvalue $|\\lambda|$ nhỏ nhất.
- **Shifted inverse iteration**: $(A - \\mu I)^{-1}$ → tìm eigenvalue gần $\\mu$.
- **QR algorithm**: tìm tất cả eigenvalue cùng lúc, dùng trong NumPy, LAPACK.

📝 **Tóm tắt mục 10**:
- Power iteration: lặp $\\mathbf{v} \\leftarrow A \\mathbf{v} / \\|A \\mathbf{v}\\|$ → eigenvector dominant.
- Tỷ lệ hội tụ phụ thuộc $|\\lambda_2/\\lambda_1|$. Nhỏ → nhanh.
- Là engine ban đầu của PageRank, dùng được cho ma trận triệu nút.

---

## 11. Bài tập

### Bài 1 (cơ bản — tính tay 2×2)

Cho $A = \\begin{bmatrix} 5 & 4 \\\\ 1 & 2 \\end{bmatrix}$. Tìm tất cả eigenvalue và eigenvector.

### Bài 2 (kiểm tra hệ thức)

Ma trận $A$ có $\\operatorname{trace}(A) = 6$ và $\\det(A) = 8$. Đoán hai eigenvalue.

### Bài 3 (diagonalization)

Cho $A = \\begin{bmatrix} 4 & -2 \\\\ 1 & 1 \\end{bmatrix}$. Tìm $P$, $D$ sao cho $A = P D P^{-1}$. Tính $A^5$.

### Bài 4 (đối xứng + trực giao)

Cho $A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}$ đối xứng. Tìm eigen-decomposition $Q D Q^\\top$ với $Q$ trực giao.

### Bài 5 (power iteration tay)

Cho $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$. Khởi tạo $\\mathbf{v}_0 = (1, 0)$. Chạy 4 bước power iteration. So với eigenvector chính xác.

### Bài 6 (PageRank mini)

3 trang: A → B; B → C; C → A, B. Lập ma trận chuyển $M$. Tìm phân phối ổn định $\\pi$ (eigenvector của $\\lambda = 1$).

---

## 12. Lời giải chi tiết

### Lời giải Bài 1

$A = \\begin{bmatrix} 5 & 4 \\\\ 1 & 2 \\end{bmatrix}$. $T = 5 + 2 = 7$, $D = 5 \\cdot 2 - 4 \\cdot 1 = 6$.

$$p_A(\\lambda) = \\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6) \\to \\lambda_1 = 1,\\ \\lambda_2 = 6$$

Verify: $1 + 6 = 7 = T$ ✓; $1 \\cdot 6 = 6 = D$ ✓.

**Eigenvector cho $\\lambda = 1$**: $A - I = \\begin{bmatrix} 4 & 4 \\\\ 1 & 1 \\end{bmatrix}$. → $x + y = 0$ → $\\mathbf{v}_1 = (1, -1)$.

Kiểm tra: $A \\cdot (1, -1) = (5 - 4,\\ 1 - 2) = (1, -1) = 1 \\cdot (1, -1)$ ✓.

**Eigenvector cho $\\lambda = 6$**: $A - 6I = \\begin{bmatrix} -1 & 4 \\\\ 1 & -4 \\end{bmatrix}$. → $-x + 4y = 0$ → $x = 4y$ → $\\mathbf{v}_2 = (4, 1)$.

Kiểm tra: $A \\cdot (4, 1) = (5 \\cdot 4 + 4,\\ 4 + 2) = (24, 6) = 6 \\cdot (4, 1)$ ✓.

### Lời giải Bài 2

$\\lambda_1 + \\lambda_2 = 6$, $\\lambda_1 \\cdot \\lambda_2 = 8$. Hai số có tổng 6, tích 8 → $\\lambda^2 - 6\\lambda + 8 = (\\lambda-2)(\\lambda-4) = 0$. Vậy $\\lambda_1 = 2, \\lambda_2 = 4$ (hoặc ngược lại).

### Lời giải Bài 3

$A = \\begin{bmatrix} 4 & -2 \\\\ 1 & 1 \\end{bmatrix}$. $T = 5$, $D = 4 \\cdot 1 - (-2) \\cdot 1 = 6$.

$$p_A(\\lambda) = \\lambda^2 - 5\\lambda + 6 = (\\lambda - 2)(\\lambda - 3) \\to \\lambda_1 = 2,\\ \\lambda_2 = 3$$

**Eigenvector $\\lambda = 2$**: $A - 2I = \\begin{bmatrix} 2 & -2 \\\\ 1 & -1 \\end{bmatrix}$. → $x = y$ → $\\mathbf{v}_1 = (1, 1)$.
Kiểm tra: $A \\cdot (1, 1) = (4 - 2,\\ 1 + 1) = (2, 2) = 2 \\cdot (1, 1)$ ✓.

**Eigenvector $\\lambda = 3$**: $A - 3I = \\begin{bmatrix} 1 & -2 \\\\ 1 & -2 \\end{bmatrix}$. → $x = 2y$ → $\\mathbf{v}_2 = (2, 1)$.
Kiểm tra: $A \\cdot (2, 1) = (8 - 2,\\ 2 + 1) = (6, 3) = 3 \\cdot (2, 1)$ ✓.

$$\\begin{aligned}
P &= \\begin{bmatrix} 1 & 2 \\\\ 1 & 1 \\end{bmatrix} \\ (\\text{cột } \\mathbf{v}_1, \\mathbf{v}_2), \\quad D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix} \\\\
\\det(P) &= 1 \\cdot 1 - 2 \\cdot 1 = -1 \\\\
P^{-1} &= \\frac{1}{-1} \\cdot \\begin{bmatrix} 1 & -2 \\\\ -1 & 1 \\end{bmatrix} = \\begin{bmatrix} -1 & 2 \\\\ 1 & -1 \\end{bmatrix}
\\end{aligned}$$

**Tính $A^5$**: $D^5 = \\operatorname{diag}(32, 243)$.

$$P \\cdot D^5 = \\begin{bmatrix} 1 & 2 \\\\ 1 & 1 \\end{bmatrix} \\cdot \\begin{bmatrix} 32 & 0 \\\\ 0 & 243 \\end{bmatrix} = \\begin{bmatrix} 32 & 486 \\\\ 32 & 243 \\end{bmatrix}$$

$$(P D^5) \\cdot P^{-1} = \\begin{bmatrix} 32 & 486 \\\\ 32 & 243 \\end{bmatrix} \\cdot \\begin{bmatrix} -1 & 2 \\\\ 1 & -1 \\end{bmatrix}$$

- Hàng 1: $(32 \\cdot (-1) + 486 \\cdot 1,\\ 32 \\cdot 2 + 486 \\cdot (-1)) = (454, -422)$
- Hàng 2: $(32 \\cdot (-1) + 243 \\cdot 1,\\ 32 \\cdot 2 + 243 \\cdot (-1)) = (211, -179)$

$$A^5 = \\begin{bmatrix} 454 & -422 \\\\ 211 & -179 \\end{bmatrix}$$

Kiểm tra trace/det: $\\operatorname{trace}(A^5) = 454 + (-179) = 275 = 2^5 + 3^5 = 32 + 243$ ✓. $\\det(A^5) = (\\det A)^5 = 6^5 = 7776$.
$\\det(A^5) = 454 \\cdot (-179) - (-422) \\cdot 211 = -81266 + 89042 = 7776$ ✓.

### Lời giải Bài 4

$A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}$. $T = 6$, $D = 9 - 1 = 8$.

$$\\lambda^2 - 6\\lambda + 8 = (\\lambda - 2)(\\lambda - 4) \\to \\lambda_1 = 2,\\ \\lambda_2 = 4$$

**$\\lambda = 2$**: $A - 2I = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$ → $\\mathbf{v}_1 = (1, -1)$. Chuẩn hóa: $\\mathbf{q}_1 = (1/\\sqrt{2}, -1/\\sqrt{2})$.

**$\\lambda = 4$**: $A - 4I = \\begin{bmatrix} -1 & 1 \\\\ 1 & -1 \\end{bmatrix}$ → $\\mathbf{v}_2 = (1, 1)$. Chuẩn hóa: $\\mathbf{q}_2 = (1/\\sqrt{2}, 1/\\sqrt{2})$.

$$Q = \\begin{bmatrix} 1/\\sqrt{2} & 1/\\sqrt{2} \\\\ -1/\\sqrt{2} & 1/\\sqrt{2} \\end{bmatrix}, \\quad D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}, \\quad Q^\\top = \\begin{bmatrix} 1/\\sqrt{2} & -1/\\sqrt{2} \\\\ 1/\\sqrt{2} & 1/\\sqrt{2} \\end{bmatrix}$$

Kiểm tra $Q^\\top Q = I$: cả 2 cột của $Q$ đơn vị và trực giao ✓.

Kiểm tra $Q D Q^\\top$:

$$Q D = \\begin{bmatrix} 1/\\sqrt{2} \\cdot 2 & 1/\\sqrt{2} \\cdot 4 \\\\ -1/\\sqrt{2} \\cdot 2 & 1/\\sqrt{2} \\cdot 4 \\end{bmatrix} = \\begin{bmatrix} \\sqrt{2} & 2\\sqrt{2} \\\\ -\\sqrt{2} & 2\\sqrt{2} \\end{bmatrix}$$

$$\\begin{aligned}
(Q D Q^\\top)_{1,1} &= \\sqrt{2} \\cdot 1/\\sqrt{2} + 2\\sqrt{2} \\cdot 1/\\sqrt{2} = 1 + 2 = 3 \\quad \\checkmark \\\\
(Q D Q^\\top)_{1,2} &= \\sqrt{2} \\cdot (-1/\\sqrt{2}) + 2\\sqrt{2} \\cdot 1/\\sqrt{2} = -1 + 2 = 1 \\quad \\checkmark \\\\
(Q D Q^\\top)_{2,1} &= -\\sqrt{2} \\cdot 1/\\sqrt{2} + 2\\sqrt{2} \\cdot 1/\\sqrt{2} = -1 + 2 = 1 \\quad \\checkmark \\\\
(Q D Q^\\top)_{2,2} &= -\\sqrt{2} \\cdot (-1/\\sqrt{2}) + 2\\sqrt{2} \\cdot 1/\\sqrt{2} = 1 + 2 = 3 \\quad \\checkmark
\\end{aligned}$$

Khớp $A$ ban đầu.

### Lời giải Bài 5

$A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$. Eigenvalue $\\lambda_{\\max} = 5$, eigenvector chính xác $(1, 1)/\\sqrt{2} \\approx (0.707, 0.707)$.

$\\mathbf{v}_0 = (1, 0)$.

**Bước 1**: $\\mathbf{w} = (4, 2)$, $\\|\\mathbf{w}\\| = \\sqrt{20} \\approx 4.472$. $\\mathbf{v}_1 \\approx (0.894, 0.447)$.

**Bước 2**: $\\mathbf{w} = A \\mathbf{v}_1 = (4 \\cdot 0.894 + 0.447,\\ 2 \\cdot 0.894 + 3 \\cdot 0.447) = (4.024, 3.130)$. $\\|\\mathbf{w}\\| \\approx \\sqrt{16.19 + 9.80} \\approx 5.099$. $\\mathbf{v}_2 \\approx (0.789, 0.614)$.

**Bước 3**: $\\mathbf{w} = (4 \\cdot 0.789 + 0.614,\\ 2 \\cdot 0.789 + 3 \\cdot 0.614) = (3.770, 3.420)$. $\\|\\mathbf{w}\\| \\approx 5.090$. $\\mathbf{v}_3 \\approx (0.741, 0.672)$.

**Bước 4**: $\\mathbf{w} = (4 \\cdot 0.741 + 0.672,\\ 2 \\cdot 0.741 + 3 \\cdot 0.672) = (3.636, 3.498)$. $\\|\\mathbf{w}\\| \\approx 5.046$. $\\mathbf{v}_4 \\approx (0.721, 0.693)$.

Tiếp tục sẽ tới $(0.707, 0.707) \\approx (1, 1)/\\sqrt{2}$.

Eigenvalue: $\\mathbf{v}_4^\\top A \\mathbf{v}_4 \\approx 0.721 \\cdot 3.636 + 0.693 \\cdot 3.498 \\approx 2.622 + 2.424 \\approx 5.046 \\approx 5$ ✓.

### Lời giải Bài 6

Trang: A → B; B → C; C → A, B.

Ma trận chuyển (cột $i$ chia đều cho số link ra):
- A có 1 link ra (→ B). Cột A: $B = 1$.
- B có 1 link ra (→ C). Cột B: $C = 1$.
- C có 2 link ra (→ A, B). Cột C: $A = 0.5$, $B = 0.5$.

\`\`\`
       from: A    B    C
to: A [  0    0    0.5 ]
    B [  1    0    0.5 ]
    C [  0    1    0   ]
\`\`\`

Phương trình $M \\pi = \\pi$ với $\\pi = (a, b, c)$:

$$\\begin{aligned}
0.5 c &= a \\\\
a + 0.5 c &= b \\\\
b &= c
\\end{aligned}$$

Từ phương trình 1: $a = 0.5c$. Từ phương trình 3: $b = c$. Thay vào điều kiện chuẩn hóa $a + b + c = 1$:

$$0.5c + c + c = 1 \\to 2.5c = 1 \\to c = 0.4, \\quad b = 0.4, \\quad a = 0.2$$

→ $\\pi = (0.2, 0.4, 0.4)$. Hạng: B = C > A.

Kiểm tra: $M \\pi = (0.5 \\cdot 0.4,\\ 0.2 + 0.5 \\cdot 0.4,\\ 0.4) = (0.2, 0.4, 0.4) = \\pi$ ✓.

---

## 13. Liên kết

- **Bài trước**: [Lesson 06 — Ma trận là biến đổi](../lesson-06-matrix-as-transform/) — kernel, image, rank.
- **Bài tiếp**: [Lesson 08 — PCA và SVD](../lesson-08-pca-svd/) — áp dụng eigen lên covariance matrix để giảm chiều.
- **Tham khảo chéo**:
  - [Algebra Lesson 06](../../01-Algebra/lesson-06-linear-quadratic/) — nghiệm phương trình bậc 2.
  - [Algebra Lesson 08](../../01-Algebra/lesson-08-linear-systems/) — khử Gauss.
  - [Trigonometry Lesson 06](../../02-Trigonometry/lesson-06-rotation-matrix/) — ma trận xoay (ví dụ eigenvalue phức).
- **Tham khảo bên ngoài**:
  - 3Blue1Brown "Essence of Linear Algebra" — chương 10, 14 (eigenvectors, eigenvalues, spectral).
  - Strang "Linear Algebra and Its Applications" — Chapter 5.
  - "The PageRank Citation Ranking" — Brin & Page (1998).

📝 **Tóm tắt cả bài**:
- Eigenvector = hướng không xoay, eigenvalue = hệ số kéo dài.
- $\\det(A - \\lambda I) = 0$ cho eigenvalue; $(A - \\lambda I)\\mathbf{v} = 0$ cho eigenvector.
- $\\lambda_1 + \\lambda_2 = \\operatorname{trace}$, $\\lambda_1 \\cdot \\lambda_2 = \\det$ — kiểm tra nhanh.
- $A = P D P^{-1}$ (đường chéo hóa); $A^k = P D^k P^{-1}$ (tính nhanh).
- Đối xứng → eigen-decomposition trực giao $Q D Q^\\top$.
- Ứng dụng: PageRank ($\\lambda = 1$), PCA (covariance eigen), spectral clustering, stability.
- Power iteration: lặp $\\mathbf{v} \\leftarrow A\\mathbf{v} / \\|A\\mathbf{v}\\|$ → eigenvector dominant. Engine của PageRank.
`;
