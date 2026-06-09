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

❓ **Câu hỏi tự nhiên của người đọc**

- *"PT đặc trưng bậc mấy?"* Bậc n với ma trận $n\\times n$ → đúng n trị riêng (kể bội, có thể phức). $2\\times 2$ → bậc 2 → 2 trị riêng.
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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Ma trận nào cũng chéo hóa được?"* Không. Cần đủ n eigenvector **độc lập tuyến tính**. Vd $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ chỉ có 1 hướng eigenvector ($\\lambda=1$ bội 2 nhưng eigenspace 1 chiều) → KHÔNG chéo hóa được trên $\\mathbb{R}$.
- *"Vì sao $A^n$ tính nhanh hơn?"* Vì $D^n$ chỉ là $\\lambda_i^n$ trên đường chéo — $n-1$ phép nhân ma trận đầy đủ rút còn vài phép lũy thừa số + 2 phép nhân với $P, P^{-1}$.

⚠ **Lỗi thường gặp — đặt cột $P$ không khớp thứ tự với $D$**. Cột thứ i của $P$ phải là eigenvector ứng với $\\lambda_i$ ở vị trí $(i,i)$ của $D$. Nếu đặt lệch (eigenvector của $\\lambda=1$ nhưng để 3 vào $D$) thì $A \\neq PDP^{-1}$. Luôn ghép đúng cặp $(\\lambda, \\vec{v})$.

🔁 **Dừng lại tự kiểm tra**

1. $A$ có $\\lambda = 2, 4$. Tính các trị riêng của $A^3$ (không cần chéo hóa).

<details><summary>Đáp án</summary>

Trị riêng của $A^3 = \\lambda^3 = 2^3 = \\mathbf{8}$ và $4^3 = \\mathbf{64}$ (cùng eigenvector). Vì $A^3\\vec{v} = \\lambda^3\\vec{v}$.

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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn k bao nhiêu thì đủ?"* Thường chọn k sao cho tổng k trị riêng lớn nhất ≥ ~90–95% tổng tất cả trị riêng (giữ 90–95% "phương sai"). Vd 100 chiều, 10 trị riêng đầu chiếm 95% → giảm còn 10 chiều.

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

## 6. Bài tập

### Bài tập

**Bài 1**: Tìm trị riêng của $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$.

**Bài 2**: Tìm vector riêng tương ứng của $A$ ở Bài 1.

**Bài 3**: Cho $A = \\begin{bmatrix} 5 & 0 \\\\ 0 & -2 \\end{bmatrix}$. Tính trace và det. So sánh với tổng & tích trị riêng.

**Bài 4**: Ma trận $A$ có trị riêng $\\lambda = 2$ (bội 1) và $\\lambda = -1$. Tính $\\det(A)$.

**Bài 5**: $A$ là ma trận quay 90° $R(\\pi/2) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$. Tính trị riêng. Nhận xét?

### Lời giải

**Bài 1**: $\\det\\begin{vmatrix} 4-\\lambda & 1 \\\\ 2 & 3-\\lambda \\end{vmatrix} = (4-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = 0$. → $\\lambda = 2, 5$.

**Bài 2**:  
- $\\lambda = 2$: $(A-2I)\\cdot\\vec{v} = 0 \\to \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}\\vec{v} = 0 \\to 2v_1 + v_2 = 0 \\to \\vec{v} = (1, -2)$.  
- $\\lambda = 5$: $(A-5I)\\cdot\\vec{v} = 0 \\to \\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}\\vec{v} = 0 \\to v_1 = v_2 \\to \\vec{v} = (1, 1)$.

**Bài 3**: Trace $= 5 + (-2) = 3$. Det $= -10$. Trị riêng $= 5, -2$. $\\sum = 3$ ✓. $\\prod = -10$ ✓.

**Bài 4**: $\\det = 2\\cdot(-1) = -2$.

**Bài 5**: $\\det(R - \\lambda I) = \\lambda^2 + 1 = 0 \\to \\lambda = \\pm i$ (số phức!). → $R$ không chéo hóa được trên $\\mathbb{R}$, chỉ trên $\\mathbb{C}$. Hợp lý: quay 90° không có vector nào "bất biến hướng" trong $\\mathbb{R}^2$.

---

## 7. Bài tiếp theo

[Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/).

## 📝 Tổng kết

1. **$A\\cdot\\vec{v} = \\lambda\\cdot\\vec{v}$** với $\\vec{v} \\neq 0$. $\\lambda$ = trị riêng, $\\vec{v}$ = vector riêng.
2. **$\\det(A - \\lambda I) = 0$** → tìm trị riêng. Sau đó giải $(A - \\lambda I)\\vec{v} = 0$ → vector riêng.
3. **Chéo hóa**: $A = PDP^{-1}$. Tính $A^n$ nhanh.
4. **Trace $= \\sum \\lambda$, Det $= \\prod \\lambda$**.
5. Ứng dụng: **PCA, Eigenfaces, dynamic systems**.
`;
