// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-09-multiple-regression/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09: Hồi quy bội (Multiple Regression)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** một biến dự báo (predictor) thường không đủ — thực tế kết quả phụ thuộc NHIỀU biến cùng lúc.
- Viết và đọc **mô hình hồi quy bội** $\\hat{y} = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_p x_p$, diễn giải mỗi hệ số theo nghĩa *"giữ các biến khác cố định"*.
- Viết mô hình ở **dạng ma trận** $\\hat{y} = X\\beta$ và hiểu nghiệm OLS $\\beta = (X^\\top X)^{-1} X^\\top y$ — liên hệ ma trận, nghịch đảo, phép chiếu từ [Vectors/04 Linear Algebra](../../../Vectors/04-LinearAlgebra/).
- Phân biệt **$R^2$** và **$R^2$ điều chỉnh (adjusted $R^2$)** — vì sao $R^2$ luôn tăng khi thêm biến và adjusted sửa được lỗi đó.
- Nhận diện **đa cộng tuyến (multicollinearity)**: biến dự báo tương quan cao làm hệ số bất ổn; đọc **VIF** sơ lược.
- Mã hoá biến phân loại bằng **biến giả (dummy variable)** và tránh **bẫy biến giả (dummy variable trap)**.
- Hiểu sơ lược **chọn biến và overfitting**: thêm biến vô nghĩa vẫn làm $R^2$ tăng — liên hệ overfitting trong [AI-ML](../../../AI-ML/).

## Kiến thức tiền đề

- [Lesson 08: Hồi quy tuyến tính đơn](../lesson-08-linear-regression/) — đường $\\hat{y} = \\beta_0 + \\beta_1 x$, OLS, residual, $R^2$. Bài này tổng quát hoá lên nhiều biến.
- [Lesson 05 Tầng 1: Mối quan hệ 2 biến](../../01-Descriptive/lesson-05-bivariate-correlation/README.md) — correlation, $r$, $r^2$.
- [Vectors/04 — Linear Algebra](../../../Vectors/04-LinearAlgebra/) — ma trận, nhân ma trận, ma trận nghịch đảo, phép chiếu lên không gian con. OLS chính là một phép chiếu.

---

## 1. Mở đầu: một biến là không đủ

Bạn cần định giá một căn hộ ở TP.HCM. Bạn có dữ liệu sau:

| Căn | Diện tích (m²) | Số phòng ngủ | Khoảng cách tới trung tâm (km) | Giá (tỷ đồng) |
|-----|------|------|------|------|
| A | 50 | 1 | 8 | 2.4 |
| B | 70 | 2 | 5 | 3.6 |
| C | 90 | 3 | 6 | 4.5 |
| D | 60 | 2 | 10 | 2.8 |
| E | 100 | 3 | 3 | 5.6 |

> **Câu hỏi mở bài**: Nếu chỉ dùng diện tích để dự báo giá (hồi quy đơn — Lesson 08), bạn sẽ bỏ lỡ thông tin gì? Một căn 60 m² *gần trung tâm* và một căn 60 m² *xa trung tâm* có nên cùng giá không? Và nếu muốn dùng cả 3 biến cùng lúc thì công thức trông thế nào, mỗi hệ số nghĩa là gì?

Bài này trả lời TRỌN VẸN câu hỏi đó. Ta sẽ:

- Mở rộng đường hồi quy đơn thành **siêu phẳng (hyperplane)** trong không gian nhiều chiều.
- Giải nghiệm bằng đại số ma trận (mục 3, có walk-through 2 biến tính tay).
- Đo độ tốt mô hình đúng cách bằng adjusted $R^2$ (mục 4).

> 💡 **Trực giác**: Giá nhà giống một công thức nấu ăn — nhiều "nguyên liệu" cùng đóng góp. Diện tích thêm 10 m² làm giá tăng *bao nhiêu*, **với điều kiện** số phòng và vị trí giữ nguyên? Hồi quy bội tách riêng đóng góp của từng nguyên liệu.

### 1.1 Vì sao không chạy nhiều hồi quy đơn rồi cộng lại?

Một ý tưởng ngây thơ: chạy hồi quy đơn \`giá ~ diện tích\`, rồi \`giá ~ số phòng\`, rồi cộng các hệ số. **Sai**, vì các biến dự báo thường tương quan với nhau (nhà to thường nhiều phòng). Hồi quy đơn \`giá ~ số phòng\` sẽ *hấp thụ luôn* phần ảnh hưởng của diện tích (vì hai biến đi đôi) → hệ số bị thổi phồng. Chỉ hồi quy bội mới tách được "đóng góp riêng của số phòng *sau khi* đã tính diện tích".

> 📝 **Tóm tắt mục 1**:
> - Kết quả thực tế phụ thuộc nhiều biến cùng lúc.
> - Chạy nhiều hồi quy đơn rồi cộng là sai khi các biến tương quan.
> - Hồi quy bội ước lượng đồng thời, tách được đóng góp riêng của từng biến.

---

## 2. Mô hình hồi quy bội

### 2.1 Định nghĩa

**(a) Là gì**: Hồi quy bội mô hình hoá một biến phụ thuộc (dependent / response) $y$ như một **tổ hợp tuyến tính** của $p$ biến dự báo (predictor / independent) $x_1, \\dots, x_p$:

$$\\hat{y} = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\dots + \\beta_p x_p$$

- $\\hat{y}$ — giá trị dự báo (có mũ; phân biệt với $y$ là giá trị thực).
- $\\beta_0$ — **hệ số chặn (intercept)**: giá trị dự báo khi MỌI $x_i = 0$.
- $\\beta_j$ ($j \\ge 1$) — **hệ số góc riêng phần (partial slope)** của biến $x_j$.

**(b) Vì sao tồn tại / vì sao cần**: Hồi quy đơn (Lesson 08) chỉ có một biến nên không tách được ảnh hưởng đan xen. Khi nhiều biến cùng tác động và lại tương quan với nhau, ta cần một mô hình ước lượng *đồng thời* để mỗi $\\beta_j$ phản ánh đúng đóng góp riêng. Đây chính là lý do hồi quy bội ra đời.

**(c) Ví dụ trực giác bằng số**: Với dữ liệu căn hộ, giả sử ta tìm được

$$\\widehat{\\text{giá}} = 0{,}5 + 0{,}04 \\cdot \\text{dt} + 0{,}3 \\cdot \\text{phòng} - 0{,}08 \\cdot \\text{kc}$$

(đơn vị: tỷ đồng; dt = diện tích m²; kc = khoảng cách km). Dự báo cho căn 60 m², 2 phòng, cách trung tâm 7 km:

$$\\hat{y} = 0{,}5 + 0{,}04(60) + 0{,}3(2) - 0{,}08(7) = 0{,}5 + 2{,}4 + 0{,}6 - 0{,}56 = \\mathbf{2{,}94 \\text{ tỷ}}$$

### 2.2 Diễn giải hệ số: "giữ các biến khác cố định"

Đây là điểm cốt lõi và hay bị hiểu sai nhất.

> 💡 **Trực giác**: $\\beta_j$ trả lời câu hỏi *"Nếu tôi tăng $x_j$ thêm 1 đơn vị, GIỮ NGUYÊN tất cả biến khác, thì $\\hat{y}$ đổi bao nhiêu?"*

Với mô hình căn hộ ở trên:

- $\\beta_1 = 0{,}04$: mỗi m² thêm vào làm giá tăng **0,04 tỷ = 40 triệu**, *với điều kiện* số phòng và khoảng cách không đổi.
- $\\beta_2 = 0{,}3$: mỗi phòng ngủ thêm làm giá tăng **0,3 tỷ**, *giữ diện tích và khoảng cách cố định* (tức là, một phòng được thêm vào *mà không tăng diện tích* — phòng nhỏ hơn).
- $\\beta_3 = -0{,}08$: mỗi km xa trung tâm làm giá **giảm 0,08 tỷ**, giữ diện tích và số phòng cố định.

**4 ví dụ diễn giải hệ số** (đa dạng dấu và bối cảnh):

1. Lương: $\\widehat{\\text{lương}} = 5 + 1{,}2 \\cdot \\text{kinh nghiệm} + 3 \\cdot \\text{bằng ĐH}$ (triệu/năm). $\\beta_1 = 1{,}2$: mỗi năm kinh nghiệm thêm +1,2 triệu, *cùng trình độ học vấn*.
2. Tiêu thụ xăng: $\\widehat{\\text{l/100km}} = 4 + 0{,}003 \\cdot \\text{cân nặng} - 0{,}5 \\cdot \\text{số bánh răng}$. $\\beta_2 = -0{,}5$: thêm 1 cấp số làm giảm 0,5 l/100km, *cùng cân nặng xe*.
3. Điểm thi: $\\widehat{\\text{điểm}} = 2 + 0{,}8 \\cdot \\text{giờ học} + 0{,}1 \\cdot \\text{giờ ngủ}$. Cả hai $\\beta > 0$: học và ngủ đều tốt; $\\beta_{\\text{học}} = 0{,}8$ lớn hơn → 1 giờ học hiệu quả hơn 1 giờ ngủ về mặt điểm.
4. Doanh thu cửa hàng: $\\widehat{\\text{rev}} = 10 + 2 \\cdot \\text{quảng cáo} - 1{,}5 \\cdot \\text{giá bán}$. $\\beta_2 = -1{,}5$: tăng giá 1 đơn vị làm doanh thu giảm 1,5, *cùng mức quảng cáo* (cầu co giãn).

> ⚠ **Lỗi thường gặp**:
> - **Quên cụm "giữ biến khác cố định"** → diễn giải $\\beta_2$ ("mỗi phòng thêm +0,3 tỷ") như thể tăng phòng cũng tăng diện tích. Sai — diễn giải riêng phần luôn cố định mọi biến còn lại.
> - **So sánh độ lớn $\\beta_j$ thô để xếp hạng "biến nào quan trọng hơn"** — sai vì các biến khác đơn vị (m² vs số phòng). Muốn so phải chuẩn hoá (standardized coefficient) hoặc xét $\\beta_j$ kèm thang đo của biến.

> ❓ **Câu hỏi tự nhiên của người đọc**:
> - "Sao $\\beta_0$ lại là giá khi mọi biến = 0? Nhà 0 m² vô nghĩa mà?" → Đúng, $\\beta_0$ thường không có ý nghĩa thực tế khi $x = 0$ nằm ngoài vùng dữ liệu. Nó chỉ là điểm neo toán học để đường/siêu phẳng đi qua đúng chỗ.
> - "Mô hình tuyến tính nghĩa là quan hệ phải thẳng?" → Tuyến tính **theo tham số $\\beta$**, không nhất thiết theo biến. Ta có thể đưa $x^2$, $\\log x$, hay tích $x_1 x_2$ (tương tác) vào làm một "biến" mới — mô hình vẫn tuyến tính theo $\\beta$.
> - "p biến thì hình học là gì?" → 1 biến: đường thẳng. 2 biến: mặt phẳng trong không gian 3D. $p$ biến: siêu phẳng trong không gian $(p+1)$ chiều.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Mô hình $\\hat{y} = 3 + 2x_1 - 4x_2$. Dự báo tại $x_1 = 5, x_2 = 1$?
> <details><summary>Đáp án</summary>
>
> $\\hat{y} = 3 + 2(5) - 4(1) = 3 + 10 - 4 = \\mathbf{9}$.
> </details>
>
> 2. Cùng mô hình trên, nếu tăng $x_2$ thêm 2 (giữ $x_1$ cố định), $\\hat{y}$ đổi bao nhiêu?
> <details><summary>Đáp án</summary>
>
> $\\Delta \\hat{y} = \\beta_2 \\cdot \\Delta x_2 = (-4)(2) = \\mathbf{-8}$. Giảm 8.
> </details>

> 📝 **Tóm tắt mục 2**:
> - Mô hình: $\\hat{y} = \\beta_0 + \\sum_j \\beta_j x_j$.
> - $\\beta_0$: giá trị nền khi mọi $x = 0$ (thường chỉ là điểm neo).
> - $\\beta_j$: thay đổi của $\\hat{y}$ khi $x_j$ tăng 1 đơn vị, **giữ mọi biến khác cố định**.
> - Tuyến tính theo $\\beta$, không nhất thiết theo biến.

---

## 3. Dạng ma trận và nghiệm OLS

### 3.1 Vì sao dùng ma trận

Với $n$ quan sát và $p$ biến, viết $n$ phương trình rời rạc rất cồng kềnh. Đại số ma trận gói tất cả thành MỘT phương trình gọn. Đây là lúc kiến thức từ [Vectors/04 Linear Algebra](../../../Vectors/04-LinearAlgebra/) phát huy.

### 3.2 Sắp xếp dữ liệu thành ma trận

Đặt **ma trận thiết kế (design matrix)** $X$ kích thước $n \\times (p+1)$ — cột đầu toàn số 1 (cho intercept), các cột sau là các biến:

$$
X = \\begin{bmatrix} 1 & x_{11} & x_{12} & \\cdots & x_{1p} \\\\ 1 & x_{21} & x_{22} & \\cdots & x_{2p} \\\\ \\vdots & \\vdots & \\vdots & \\ddots & \\vdots \\\\ 1 & x_{n1} & x_{n2} & \\cdots & x_{np} \\end{bmatrix}, \\quad
\\beta = \\begin{bmatrix} \\beta_0 \\\\ \\beta_1 \\\\ \\vdots \\\\ \\beta_p \\end{bmatrix}, \\quad
y = \\begin{bmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_n \\end{bmatrix}
$$

Khi đó toàn bộ dự báo viết gọn thành:

$$\\hat{y} = X\\beta$$

### 3.3 Nghiệm OLS (Ordinary Least Squares)

Ta muốn chọn $\\beta$ làm **tổng bình phương sai số** $\\sum (y_i - \\hat{y}_i)^2 = \\lVert y - X\\beta \\rVert^2$ nhỏ nhất. Nghiệm (gọi là **phương trình chuẩn — normal equations**) là:

$$\\boxed{\\;\\beta = (X^\\top X)^{-1} X^\\top y\\;}$$

> 💡 **Trực giác hình học (liên hệ phép chiếu Vectors/04)**: Vector $y$ sống trong không gian $n$ chiều. Mọi giá trị dự báo $X\\beta$ chỉ nằm trong **không gian cột của $X$** (column space) — một không gian con $(p+1)$ chiều. OLS tìm điểm trong không gian con đó **gần $y$ nhất** — chính là **hình chiếu vuông góc** của $y$ lên không gian cột. Residual $y - \\hat{y}$ vuông góc với không gian cột, nên $X^\\top (y - X\\beta) = 0$ → khai triển ra đúng phương trình chuẩn ở trên.

> ❓ **Câu hỏi tự nhiên**:
> - "Có phải lúc nào cũng đảo được $X^\\top X$?" → Không. Nếu hai cột của $X$ tương quan hoàn hảo (đa cộng tuyến hoàn toàn), $X^\\top X$ **suy biến (singular)** → không có nghịch đảo. Đây chính là gốc của vấn đề đa cộng tuyến (mục 5).
> - "Thực tế có phải tự đảo ma trận khổng lồ không?" → KHÔNG. Phần mềm (Python \`numpy\`/\`statsmodels\`, R \`lm\`, Go gonum) giải bằng phân rã QR hoặc Cholesky — ổn định số hơn việc tính nghịch đảo trực tiếp. Công thức $(X^\\top X)^{-1}$ là để *hiểu*, không phải để *tính tay với n lớn*.

### 3.4 Walk-through tính tay: mô hình 2 biến nhỏ

Để thấy công thức chạy thật, làm một ví dụ đủ nhỏ để đảo ma trận $2 \\times 2$ bằng tay. **Lưu ý: đây là toy example** — chỉ 3 điểm, 1 biến dự báo, chọn để số học sạch. Thực tế không bao giờ giải bằng tay.

Dữ liệu (1 biến $x$, đáp án $y$) — ta sẽ fit $\\hat{y} = \\beta_0 + \\beta_1 x$:

| $i$ | $x_i$ | $y_i$ |
|----|----|----|
| 1 | 1 | 2 |
| 2 | 2 | 2 |
| 3 | 3 | 4 |

**Bước 1 — dựng $X$ và $y$:**

$$X = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix}, \\quad y = \\begin{bmatrix} 2 \\\\ 2 \\\\ 4 \\end{bmatrix}$$

**Bước 2 — tính $X^\\top X$** (ma trận $2\\times 2$):

$$X^\\top X = \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\end{bmatrix}\\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix} = \\begin{bmatrix} 3 & 6 \\\\ 6 & 14 \\end{bmatrix}$$

(Phần tử $[1,1] = 1+1+1 = 3$; $[1,2]=[2,1] = 1+2+3 = 6$; $[2,2] = 1+4+9 = 14$.)

**Bước 3 — tính $X^\\top y$:**

$$X^\\top y = \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\end{bmatrix}\\begin{bmatrix} 2 \\\\ 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 2+2+4 \\\\ 2+4+12 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 18 \\end{bmatrix}$$

**Bước 4 — nghịch đảo $X^\\top X$.** Với ma trận $2\\times 2$, $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\dfrac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$. Định thức $= 3\\cdot 14 - 6\\cdot 6 = 42 - 36 = 6$.

$$(X^\\top X)^{-1} = \\dfrac{1}{6}\\begin{bmatrix} 14 & -6 \\\\ -6 & 3 \\end{bmatrix} = \\begin{bmatrix} 14/6 & -1 \\\\ -1 & 1/2 \\end{bmatrix}$$

**Bước 5 — nhân ra $\\beta$:**

$$\\beta = (X^\\top X)^{-1} X^\\top y = \\begin{bmatrix} 14/6 & -1 \\\\ -1 & 1/2 \\end{bmatrix}\\begin{bmatrix} 8 \\\\ 18 \\end{bmatrix} = \\begin{bmatrix} \\tfrac{14}{6}\\cdot 8 - 18 \\\\ -8 + \\tfrac{1}{2}\\cdot 18 \\end{bmatrix} = \\begin{bmatrix} \\tfrac{112}{6} - 18 \\\\ -8 + 9 \\end{bmatrix} = \\begin{bmatrix} \\tfrac{112 - 108}{6} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 2/3 \\\\ 1 \\end{bmatrix}$$

**Kết quả**: $\\beta_0 = \\tfrac{2}{3} \\approx 0{,}667$, $\\beta_1 = 1$. Mô hình: $\\hat{y} = 0{,}667 + x$.

**Kiểm chứng**: $\\hat{y}_1 = 1{,}667$, $\\hat{y}_2 = 2{,}667$, $\\hat{y}_3 = 3{,}667$. Residual: $0{,}333; -0{,}667; 0{,}333$. Tổng residual $= 0$ ✓ (đặc tính của OLS). Cùng đáp số nếu bạn tính bằng công thức hồi quy đơn $\\beta_1 = \\frac{\\sum(x-\\bar x)(y-\\bar y)}{\\sum (x-\\bar x)^2} = \\frac{2}{2} = 1$ ✓.

> 🔁 **Dừng lại tự kiểm tra**: Tại sao cột đầu của $X$ toàn số 1?
> <details><summary>Đáp án</summary>
>
> Để $\\beta_0$ (intercept) được "nhân với 1" trong mỗi hàng: hàng $i$ cho $\\beta_0 \\cdot 1 + \\beta_1 x_{i1} + \\dots$. Không có cột 1 thì mô hình bị ép đi qua gốc toạ độ ($\\beta_0 = 0$).
> </details>

> 📝 **Tóm tắt mục 3**:
> - Dạng ma trận: $\\hat{y} = X\\beta$, với $X$ có cột 1 ở đầu.
> - Nghiệm OLS: $\\beta = (X^\\top X)^{-1} X^\\top y$ (phương trình chuẩn).
> - Bản chất hình học: hình chiếu vuông góc của $y$ lên không gian cột của $X$.
> - $X^\\top X$ suy biến khi có đa cộng tuyến hoàn toàn → không giải được.
> - Phần mềm dùng QR/Cholesky, không đảo ma trận trực tiếp.

---

## 4. $R^2$ và $R^2$ điều chỉnh (adjusted $R^2$)

### 4.1 $R^2$ — hệ số xác định

**(a) Là gì**: $R^2$ là **tỉ lệ phương sai của $y$ được mô hình giải thích**. Bằng 1 trừ đi tỉ lệ phương sai còn sót trong residual.

**(b) Vì sao cần**: Để có một con số 0–1 cho biết mô hình "khớp tốt cỡ nào", so sánh được giữa các mô hình trên cùng dữ liệu.

**(c) Công thức**: với $\\text{SS}_{\\text{res}} = \\sum (y_i - \\hat{y}_i)^2$ (tổng bình phương residual) và $\\text{SS}_{\\text{tot}} = \\sum (y_i - \\bar{y})^2$ (tổng bình phương quanh trung bình):

$$R^2 = 1 - \\dfrac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}}$$

$R^2 = 0$: mô hình không hơn gì việc đoán bằng $\\bar{y}$. $R^2 = 1$: khớp hoàn hảo. (Trong hồi quy đơn, $R^2 = r^2$ — bình phương Pearson $r$ từ [Lesson 05 Tầng 1](../../01-Descriptive/lesson-05-bivariate-correlation/README.md).)

**4 ví dụ số:**

1. $\\text{SS}_{\\text{res}} = 20$, $\\text{SS}_{\\text{tot}} = 100 \\Rightarrow R^2 = 1 - 0{,}2 = \\mathbf{0{,}80}$ (giải thích 80%).
2. $\\text{SS}_{\\text{res}} = 50$, $\\text{SS}_{\\text{tot}} = 100 \\Rightarrow R^2 = 1 - 0{,}5 = \\mathbf{0{,}50}$.
3. $\\text{SS}_{\\text{res}} = 0$, $\\text{SS}_{\\text{tot}} = 100 \\Rightarrow R^2 = \\mathbf{1{,}00}$ (khớp hoàn hảo — đáng nghi nếu n nhỏ!).
4. Walk-through từ ví dụ mục 3.4: $y = [2,2,4]$, $\\bar{y} = 2{,}667$. $\\text{SS}_{\\text{tot}} = (2-2{,}667)^2 + (2-2{,}667)^2 + (4-2{,}667)^2 = 0{,}444 + 0{,}444 + 1{,}778 = 2{,}667$. $\\text{SS}_{\\text{res}} = 0{,}333^2 + 0{,}667^2 + 0{,}333^2 = 0{,}111 + 0{,}444 + 0{,}111 = 0{,}667$. $R^2 = 1 - \\frac{0{,}667}{2{,}667} = 1 - 0{,}25 = \\mathbf{0{,}75}$.

### 4.2 Vấn đề: $R^2$ LUÔN tăng (hoặc không giảm) khi thêm biến

> 💡 **Trực giác**: Thêm một biến dự báo mới cho OLS *nhiều tự do hơn* để uốn theo dữ liệu. Tệ nhất là OLS đặt hệ số biến đó $= 0$ và $R^2$ giữ nguyên. Nó **không bao giờ giảm** — kể cả khi biến mới là **số ngẫu nhiên vô nghĩa** (tung xúc xắc). Với đủ biến rác, $R^2$ có thể tiến tới 1 trong khi mô hình hoàn toàn vô dụng.

Đây là cái bẫy: $R^2$ cao **không** chứng minh mô hình tốt nếu bạn đã nhồi nhiều biến.

### 4.3 $R^2$ điều chỉnh — hình phạt cho số biến

**(a) Là gì**: Adjusted $R^2$ là $R^2$ bị "phạt" theo số biến dự báo $p$. Nó CHỈ tăng khi biến mới cải thiện mô hình nhiều hơn mức kỳ vọng do may rủi.

**(b) Vì sao cần**: Để so sánh công bằng giữa các mô hình *khác số biến*. $R^2$ thô thiên vị mô hình nhiều biến; adjusted sửa thiên vị đó.

**(c) Công thức** ($n$ = số quan sát, $p$ = số biến dự báo, không kể intercept):

$$R^2_{\\text{adj}} = 1 - (1 - R^2)\\cdot \\dfrac{n - 1}{n - p - 1}$$

Khác biệt then chốt: mẫu số $n - p - 1$ **co lại** khi $p$ tăng → thừa số phạt $\\frac{n-1}{n-p-1}$ **phình ra** → kéo adjusted xuống. Nếu biến mới không bù lại được phần phạt này, adjusted **giảm**.

**4 ví dụ số** (giả định $n = 20$ quan sát):

1. $p = 1$, $R^2 = 0{,}50$: $R^2_{\\text{adj}} = 1 - (0{,}5)\\frac{19}{18} = 1 - 0{,}528 = \\mathbf{0{,}472}$.
2. $p = 5$, $R^2 = 0{,}55$ (thêm 4 biến, $R^2$ nhích nhẹ): $R^2_{\\text{adj}} = 1 - (0{,}45)\\frac{19}{14} = 1 - 0{,}611 = \\mathbf{0{,}389}$. **Giảm!** Dù $R^2$ tăng từ 0,50 → 0,55, adjusted lại tụt từ 0,472 → 0,389 → 4 biến thêm là rác.
3. $p = 5$, $R^2 = 0{,}80$ (4 biến thêm có ích thật): $R^2_{\\text{adj}} = 1 - (0{,}20)\\frac{19}{14} = 1 - 0{,}271 = \\mathbf{0{,}729}$. **Tăng** so với 0,472 → biến thêm xứng đáng.
4. Cực đoan $p = 18$, $R^2 = 0{,}99$ (gần overfit, $n=20$): $R^2_{\\text{adj}} = 1 - (0{,}01)\\frac{19}{1} = 1 - 0{,}19 = \\mathbf{0{,}81}$. Phạt rất nặng vì $p$ gần $n$.

> ⚠ **Lỗi thường gặp (overfitting qua $R^2$)**: Khoe "$R^2 = 0{,}95$!" sau khi nhồi 30 biến vào 40 dòng dữ liệu. Mô hình *nhớ vẹt* dữ liệu huấn luyện (memorize noise) chứ không *học* quy luật → dự báo dữ liệu mới rất tệ. Đây chính là **overfitting** — xem mục 7 và liên hệ [AI-ML](../../../AI-ML/). Luôn báo cáo adjusted $R^2$ (hoặc tốt hơn: $R^2$ trên tập kiểm tra hold-out).

> ❓ **Câu hỏi tự nhiên**:
> - "Adjusted $R^2$ có thể âm không?" → Có, khi mô hình tệ hơn cả việc đoán $\\bar{y}$ sau khi phạt. Dấu hiệu mô hình rất kém.
> - "Adjusted có giải quyết overfitting hoàn toàn không?" → Không, chỉ giảm bớt thiên vị do số biến. Bảo hiểm thật là **đánh giá trên dữ liệu chưa thấy** (train/test split, cross-validation — thuộc về AI-ML).

> 🔁 **Dừng lại tự kiểm tra**: $n = 10$, $p = 1$, $R^2 = 0{,}64$. Tính adjusted.
> <details><summary>Đáp án</summary>
>
> $R^2_{\\text{adj}} = 1 - (1-0{,}64)\\frac{10-1}{10-1-1} = 1 - 0{,}36 \\cdot \\frac{9}{8} = 1 - 0{,}405 = \\mathbf{0{,}595}$.
> </details>

> 📝 **Tóm tắt mục 4**:
> - $R^2 = 1 - \\text{SS}_{\\text{res}}/\\text{SS}_{\\text{tot}}$ — tỉ lệ phương sai giải thích được.
> - $R^2$ **không bao giờ giảm** khi thêm biến, kể cả biến rác → đo lường thiên vị.
> - $R^2_{\\text{adj}} = 1 - (1-R^2)\\frac{n-1}{n-p-1}$ — phạt theo $p$, có thể giảm khi biến vô ích.
> - So sánh mô hình khác số biến: dùng adjusted, không dùng $R^2$ thô.

---

## 5. Đa cộng tuyến (Multicollinearity)

### 5.1 Định nghĩa

**(a) Là gì**: Đa cộng tuyến là tình trạng hai hay nhiều biến dự báo **tương quan cao với nhau** (một biến gần như là tổ hợp tuyến tính của các biến kia).

**(b) Vì sao là vấn đề**: Khi hai biến đi đôi gần như hoàn hảo, mô hình **không phân biệt được** đóng góp riêng của từng biến — vô số cặp hệ số cho cùng mức dự báo. Hậu quả: hệ số $\\beta_j$ **bất ổn** (dao động dữ dội nếu data đổi chút ít), sai số chuẩn (standard error) phình to, dấu hệ số có thể vô lý. Về đại số: $X^\\top X$ gần suy biến → $(X^\\top X)^{-1}$ có phần tử khổng lồ.

**(c) Ví dụ trực giác bằng số**: Dự báo cân nặng từ "chiều cao tính bằng cm" và "chiều cao tính bằng inch" cùng lúc. Hai biến tương quan $r \\approx 1$. Mô hình có thể trả $\\beta_{\\text{cm}} = 100, \\beta_{\\text{inch}} = -250$ hôm nay, rồi $\\beta_{\\text{cm}} = -50, \\beta_{\\text{inch}} = 130$ với mẫu khác — cộng lại vẫn ra dự báo gần như nhau, nhưng từng hệ số vô nghĩa.

**4 ví dụ cặp biến dễ gây đa cộng tuyến:**

1. Diện tích sàn (m²) và diện tích sàn (ft²) — gần $r = 1$ (đa cộng tuyến *hoàn toàn*, $X^\\top X$ suy biến).
2. Tổng thu nhập và lương cơ bản (khi lương chiếm phần lớn thu nhập) — $r$ cao.
3. Tuổi và số năm kinh nghiệm làm việc — tăng song song.
4. Nhiệt độ °C và °F trong cùng mô hình ($F = 1{,}8C + 32$) — quan hệ tuyến tính chính xác → đa cộng tuyến hoàn toàn.

### 5.2 VIF — Variance Inflation Factor (sơ lược)

Để đo mức đa cộng tuyến của biến $x_j$: hồi quy $x_j$ theo *tất cả biến dự báo còn lại*, lấy $R^2_j$ của hồi quy phụ đó, rồi:

$$\\text{VIF}_j = \\dfrac{1}{1 - R^2_j}$$

- $R^2_j$ gần 0 (biến $x_j$ độc lập với phần còn lại) → VIF gần 1 (tốt).
- $R^2_j$ gần 1 (biến $x_j$ đoán được từ các biến khác) → VIF khổng lồ (xấu).

**Quy ước heuristic**: VIF > 5 đáng lưu ý, VIF > 10 thường coi là đa cộng tuyến nghiêm trọng. **4 ví dụ:**

1. $R^2_j = 0 \\Rightarrow \\text{VIF} = 1$ (không cộng tuyến).
2. $R^2_j = 0{,}5 \\Rightarrow \\text{VIF} = 2$ (nhẹ).
3. $R^2_j = 0{,}8 \\Rightarrow \\text{VIF} = 5$ (bắt đầu lo).
4. $R^2_j = 0{,}95 \\Rightarrow \\text{VIF} = 20$ (nghiêm trọng — phương sai hệ số bị "thổi" gấp 20 lần).

### 5.3 Cách xử lý

- **Bỏ bớt** một trong các biến tương quan (giữ biến dễ diễn giải nhất).
- **Gộp** chúng thành một biến (vd PCA, hoặc trung bình).
- **Thu thập thêm dữ liệu** đôi khi giảm bất ổn.
- Lưu ý: đa cộng tuyến **không** làm hỏng khả năng *dự báo* tổng thể — nó chỉ làm *diễn giải từng hệ số* không tin được.

> ⚠ **Cảnh báo (multicollinearity)**: Đừng vội kết luận "biến $x_2$ không quan trọng" chỉ vì $\\beta_2$ không có ý nghĩa thống kê (p-value lớn). Nếu $x_2$ đa cộng tuyến với $x_1$, ảnh hưởng của nó bị "che" — bỏ $x_1$ ra có thể làm $x_2$ trở nên đáng kể ngay.

> ❓ **Câu hỏi tự nhiên**:
> - "Đa cộng tuyến có làm $R^2$ giảm không?" → Không. $R^2$ và dự báo tổng vẫn ổn; chỉ các hệ số riêng và sai số chuẩn của chúng bị ảnh hưởng.
> - "VIF = 1 có nghĩa biến hoàn toàn không liên quan biến khác?" → Đúng theo nghĩa tuyến tính: $x_j$ không đoán được từ các biến khác.

> 🔁 **Dừng lại tự kiểm tra**: Hồi quy phụ của $x_3$ theo các biến khác cho $R^2_3 = 0{,}9$. VIF bằng bao nhiêu, có đáng lo không?
> <details><summary>Đáp án</summary>
>
> $\\text{VIF}_3 = \\frac{1}{1-0{,}9} = \\mathbf{10}$ — đúng ngưỡng nghiêm trọng, nên xem xét bỏ/gộp biến.
> </details>

> 📝 **Tóm tắt mục 5**:
> - Đa cộng tuyến = biến dự báo tương quan cao với nhau.
> - Hậu quả: hệ số bất ổn, SE phình, dấu vô lý; $X^\\top X$ gần suy biến.
> - Đo bằng VIF $= 1/(1-R^2_j)$; >5 lưu ý, >10 nghiêm trọng.
> - Không hỏng dự báo tổng, chỉ hỏng diễn giải hệ số. Xử lý: bỏ/gộp biến.

---

## 6. Biến giả (Dummy Variable) cho biến phân loại

### 6.1 Vì sao cần

Hồi quy chỉ ăn được **số**. Nhưng nhiều biến là **phân loại (categorical)**: "quận" (Q1, Q3, Bình Thạnh...), "loại nhà" (chung cư / nhà phố), "giới tính". Không thể nhét chữ vào công thức. **Biến giả** mã hoá danh mục thành cột 0/1.

> ⚠ **Đừng mã số bừa**: Gán Q1 = 1, Q3 = 2, Bình Thạnh = 3 rồi coi như biến số là SAI — nó áp đặt thứ tự và khoảng cách (Q3 "gấp đôi" Q1?) hoàn toàn vô nghĩa. Phải dùng biến giả.

### 6.2 Cách mã hoá

Biến phân loại có $k$ mức (category) → tạo $k - 1$ biến giả. Một mức làm **mức tham chiếu (reference / baseline)**, không có cột riêng.

**Ví dụ — biến "loại nhà" 3 mức**: chung cư, nhà phố, biệt thự. Chọn *chung cư* làm tham chiếu, tạo 2 cột:

| Loại nhà | $d_{\\text{phố}}$ | $d_{\\text{biệt thự}}$ |
|----------|:--:|:--:|
| chung cư (tham chiếu) | 0 | 0 |
| nhà phố | 1 | 0 |
| biệt thự | 0 | 1 |

Mô hình: $\\hat{y} = \\beta_0 + \\beta_1 d_{\\text{phố}} + \\beta_2 d_{\\text{biệt thự}} + (\\text{biến số khác})$.

**Diễn giải**:
- $\\beta_0$: giá trị dự báo cho **chung cư** (mức tham chiếu).
- $\\beta_1$: chênh lệch giá *nhà phố so với chung cư* (giữ biến khác cố định).
- $\\beta_2$: chênh lệch *biệt thự so với chung cư*.

**4 ví dụ mã hoá:**

1. Giới tính (2 mức) → 1 biến giả: \`nữ = 0\` (tham chiếu), \`nam = 1\`. $\\beta$ = chênh lệch nam vs nữ.
2. Mùa (4 mức) → 3 biến giả ($d_{\\text{hạ}}, d_{\\text{thu}}, d_{\\text{đông}}$); xuân là tham chiếu.
3. Nhóm máu (4 mức A/B/AB/O) → 3 biến giả; O tham chiếu.
4. Học vấn (cấp 2 / cấp 3 / ĐH) → 2 biến giả; cấp 2 tham chiếu.

### 6.3 Bẫy biến giả (Dummy Variable Trap)

> ⚠ **Bẫy biến giả (dummy trap)**: Nếu tạo ĐỦ $k$ biến giả cho $k$ mức (gồm cả mức tham chiếu) VÀ vẫn giữ cột intercept, thì $k$ cột giả cộng lại luôn bằng cột-1 (mỗi hàng đúng một mức = 1). Đây là **đa cộng tuyến hoàn toàn** giữa các biến giả và intercept → $X^\\top X$ **suy biến**, OLS không giải được.

**Minh hoạ bằng số** — 3 mức, tạo cả 3 cột giả + intercept:

| hàng | 1 (intercept) | $d_{\\text{cc}}$ | $d_{\\text{phố}}$ | $d_{\\text{bt}}$ |
|------|:--:|:--:|:--:|:--:|
| chung cư | 1 | 1 | 0 | 0 |
| nhà phố | 1 | 0 | 1 | 0 |
| biệt thự | 1 | 0 | 0 | 1 |

Cột $d_{\\text{cc}} + d_{\\text{phố}} + d_{\\text{bt}} = [1,1,1]^\\top = $ cột intercept → phụ thuộc tuyến tính hoàn toàn. **Cách tránh**: dùng đúng $k - 1$ cột (bỏ một mức làm tham chiếu), giữ intercept.

> ❓ **Câu hỏi tự nhiên**:
> - "Đổi mức tham chiếu có đổi mô hình không?" → Dự báo $\\hat{y}$ và $R^2$ **không đổi**; chỉ các hệ số được diễn giải *so với mức tham chiếu khác*. Chọn mức tham chiếu dễ giải thích nhất.
> - "Nếu không muốn mức tham chiếu thì sao?" → Bỏ intercept và dùng đủ $k$ cột giả (one-hot không intercept) — khi đó mỗi $\\beta$ là *giá trị trung bình của mức đó*, không phải chênh lệch.

> 🔁 **Dừng lại tự kiểm tra**: Biến "thành phố" có 5 mức. Cần bao nhiêu biến giả nếu mô hình có intercept?
> <details><summary>Đáp án</summary>
>
> $5 - 1 = \\mathbf{4}$ biến giả (một thành phố làm tham chiếu). Dùng cả 5 sẽ dính bẫy biến giả.
> </details>

> 📝 **Tóm tắt mục 6**:
> - Biến phân loại $k$ mức → $k-1$ biến giả 0/1; một mức làm tham chiếu.
> - Hệ số giả = chênh lệch so với mức tham chiếu, giữ biến khác cố định.
> - Bẫy biến giả: dùng đủ $k$ cột + intercept → $X^\\top X$ suy biến. Luôn dùng $k-1$.
> - Đừng mã danh mục thành 1,2,3 rồi coi là biến số.

---

## 7. Chọn biến và overfitting (sơ lược)

### 7.1 Thêm biến rác vẫn làm $R^2$ tăng

Như mục 4.2: $R^2$ không bao giờ giảm khi thêm biến — **kể cả biến hoàn toàn ngẫu nhiên**. Thực nghiệm: lấy $y$ bất kỳ, thêm vào 10 cột số ngẫu nhiên làm "biến dự báo", $R^2$ vẫn nhích lên mỗi lần. Với $p \\to n-1$ biến, $R^2 \\to 1$ trong khi mô hình **không học được gì** — chỉ uốn theo nhiễu.

> 💡 **Trực giác overfitting**: Như một học sinh *học thuộc lòng* đáp án của đề thi thử (điểm thi thử 10/10) nhưng không hiểu bản chất → gặp đề thật (dữ liệu mới) thì sai bét. Mô hình quá nhiều biến "thuộc lòng" nhiễu của tập huấn luyện.

### 7.2 Phòng overfitting

1. **Adjusted $R^2$** (mục 4) — phạt số biến, là tuyến phòng thủ đầu.
2. **Tiêu chí thông tin** AIC, BIC — phạt độ phức tạp (học sâu hơn ở thống kê nâng cao).
3. **Train/test split & cross-validation** — đánh giá trên dữ liệu mô hình *chưa từng thấy*; đây là chuẩn vàng. Thuộc về [AI-ML](../../../AI-ML/) (overfitting, regularization, feature selection).
4. **Regularization** (Ridge, Lasso) — thêm hình phạt vào độ lớn hệ số; Lasso còn tự đưa hệ số biến vô dụng về 0 (feature selection tự động). Đào sâu trong AI-ML.
5. **Nguyên tắc tiết kiệm (parsimony / Occam's razor)**: mô hình đơn giản nhất giải thích được dữ liệu thường tổng quát hoá tốt nhất.

> ⚠ **Lỗi thường gặp (overfitting)**: Chọn biến bằng cách "thử mọi tổ hợp, giữ cái cho $R^2$ cao nhất trên chính tập huấn luyện". Cách này gần như chắc chắn overfit. Phải đánh giá ngoài mẫu.

> ❓ **Câu hỏi tự nhiên**:
> - "Cứ thêm biến cho chắc, có hại gì?" → Có: overfit, đa cộng tuyến, khó diễn giải, cần nhiều dữ liệu hơn để ước lượng ổn định, và dự báo ngoài mẫu tệ đi.
> - "Liên hệ feature trong ML là gì?" → Mỗi biến dự báo = một *feature*. Chọn biến trong hồi quy chính là *feature selection* trong ML; tránh thêm biến rác chính là chống overfitting.

> 📝 **Tóm tắt mục 7**:
> - Thêm biến rác luôn tăng $R^2$ huấn luyện → bẫy.
> - Overfitting = học thuộc nhiễu, dự báo dữ liệu mới kém.
> - Phòng: adjusted $R^2$, AIC/BIC, train/test split, cross-validation, regularization, parsimony.
> - Liên hệ trực tiếp feature selection & overfitting trong [AI-ML](../../../AI-ML/).

---

## Bài tập

1. **Diễn giải hệ số**: Mô hình $\\widehat{\\text{lương}} = 8 + 1{,}5 \\cdot \\text{kinh nghiệm} + 4 \\cdot \\text{bằng ĐH} - 0{,}2 \\cdot \\text{tuổi}$ (triệu/tháng; bằng ĐH là biến giả 0/1). (a) Dự báo lương cho người 30 tuổi, 5 năm kinh nghiệm, có bằng ĐH. (b) Diễn giải $\\beta_{\\text{kinh nghiệm}}$ đầy đủ. (c) Vì sao $\\beta_{\\text{tuổi}}$ có thể âm dù tuổi thường đi với lương cao?

2. **OLS tính tay**: Cho 3 điểm $(x, y) = (0, 1), (1, 3), (2, 4)$. Dựng $X$ (có cột intercept), tính $X^\\top X$, $X^\\top y$, rồi giải $\\beta = (X^\\top X)^{-1}X^\\top y$. Cho mô hình và dự báo tại $x = 3$.

3. **$R^2$ vs adjusted**: Mô hình A có $p = 2$, $R^2 = 0{,}70$; mô hình B (thêm 3 biến) có $p = 5$, $R^2 = 0{,}74$. Dữ liệu $n = 25$. Tính adjusted $R^2$ cho cả hai. Mô hình nào nên chọn? Vì sao?

4. **VIF & đa cộng tuyến**: Một mô hình có biến "chiều cao (cm)" và "chiều cao (m)" cùng lúc. (a) $R^2$ của hồi quy phụ giữa hai biến này xấp xỉ bao nhiêu? (b) VIF bằng bao nhiêu? (c) Điều gì xảy ra khi cố giải OLS?

5. **Biến giả**: Biến "khu vực" có 4 mức: Bắc, Trung, Nam, Tây Nguyên. (a) Cần bao nhiêu biến giả nếu mô hình có intercept? (b) Viết bảng mã hoá với "Bắc" làm tham chiếu. (c) Nếu hệ số $\\beta_{\\text{Nam}} = 1{,}2$, diễn giải nó.

6. **Overfitting**: Bạn có $n = 30$ dòng dữ liệu và thêm dần biến tới $p = 25$. (a) $R^2$ huấn luyện có xu hướng gì? (b) Adjusted $R^2$ có xu hướng gì khi $p$ tiến gần $n$? (c) Nêu 2 cách kiểm tra xem mô hình có overfit không.

---

## Lời giải chi tiết

### Bài 1

**(a)** $\\hat{y} = 8 + 1{,}5(5) + 4(1) - 0{,}2(30) = 8 + 7{,}5 + 4 - 6 = \\mathbf{13{,}5}$ triệu/tháng.

**(b)** $\\beta_{\\text{kinh nghiệm}} = 1{,}5$: mỗi năm kinh nghiệm thêm làm lương dự báo tăng **1,5 triệu/tháng**, *giữ tuổi và tình trạng bằng ĐH cố định*. Cụm "giữ cố định" là bắt buộc.

**(c)** Trong mô hình bội, $\\beta_{\\text{tuổi}}$ đo ảnh hưởng của tuổi *sau khi đã tính kinh nghiệm và bằng cấp*. Hai người **cùng kinh nghiệm, cùng bằng cấp** nhưng một người lớn tuổi hơn → có thể người đó vào nghề muộn / thăng tiến chậm hơn → hệ số âm hợp lý. Tương quan thô tuổi-lương dương không mâu thuẫn với hệ số riêng phần âm (đây là nghịch lý quen thuộc khi diễn giải hồi quy bội).

### Bài 2

$X = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$, $y = \\begin{bmatrix} 1 \\\\ 3 \\\\ 4 \\end{bmatrix}$.

$X^\\top X = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}$ (vì $\\sum x = 0+1+2 = 3$, $\\sum x^2 = 0+1+4 = 5$).

$X^\\top y = \\begin{bmatrix} 1+3+4 \\\\ 0\\cdot1 + 1\\cdot3 + 2\\cdot4 \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 11 \\end{bmatrix}$.

Định thức $= 3\\cdot 5 - 3\\cdot 3 = 15 - 9 = 6$. $(X^\\top X)^{-1} = \\frac{1}{6}\\begin{bmatrix} 5 & -3 \\\\ -3 & 3 \\end{bmatrix}$.

$\\beta = \\frac{1}{6}\\begin{bmatrix} 5 & -3 \\\\ -3 & 3 \\end{bmatrix}\\begin{bmatrix} 8 \\\\ 11 \\end{bmatrix} = \\frac{1}{6}\\begin{bmatrix} 40 - 33 \\\\ -24 + 33 \\end{bmatrix} = \\frac{1}{6}\\begin{bmatrix} 7 \\\\ 9 \\end{bmatrix} = \\begin{bmatrix} 7/6 \\\\ 3/2 \\end{bmatrix}$.

Mô hình: $\\hat{y} = \\frac{7}{6} + \\frac{3}{2}x \\approx 1{,}167 + 1{,}5x$. Tại $x = 3$: $\\hat{y} = 1{,}167 + 4{,}5 = \\mathbf{5{,}667}$.

(Kiểm tra: residual tại các điểm $= 1 - 1{,}167; 3 - 2{,}667; 4 - 4{,}167 = -0{,}167; 0{,}333; -0{,}167$ → tổng $= 0$ ✓.)

### Bài 3

Công thức $R^2_{\\text{adj}} = 1 - (1-R^2)\\frac{n-1}{n-p-1}$, với $n = 25$.

- **A**: $1 - (0{,}30)\\frac{24}{22} = 1 - 0{,}327 = \\mathbf{0{,}673}$.
- **B**: $1 - (0{,}26)\\frac{24}{19} = 1 - 0{,}328 = \\mathbf{0{,}672}$.

Adjusted của hai mô hình gần như bằng nhau (B nhỉnh thấp hơn chút). Dù $R^2$ thô của B cao hơn (0,74 > 0,70), 3 biến thêm **gần như không cải thiện** sau khi phạt. Theo nguyên tắc tiết kiệm, **chọn mô hình A** — đơn giản hơn, ít biến hơn, dễ diễn giải, ít rủi ro overfit.

### Bài 4

**(a)** "cm" và "m" liên hệ chính xác $h_{\\text{cm}} = 100 \\cdot h_{\\text{m}}$ → tuyến tính hoàn hảo → $R^2 \\approx \\mathbf{1{,}0}$.

**(b)** $\\text{VIF} = \\frac{1}{1 - 1} = \\frac{1}{0} = \\mathbf{\\infty}$ (vô cùng).

**(c)** $X^\\top X$ **suy biến** (singular, định thức = 0) → không có nghịch đảo → OLS không giải được nghiệm duy nhất. Phần mềm sẽ báo lỗi singular matrix hoặc tự loại một biến. Đây là đa cộng tuyến *hoàn toàn*.

### Bài 5

**(a)** $4 - 1 = \\mathbf{3}$ biến giả (một mức làm tham chiếu).

**(b)** Bảng mã hoá (Bắc = tham chiếu):

| Khu vực | $d_{\\text{Trung}}$ | $d_{\\text{Nam}}$ | $d_{\\text{TN}}$ |
|---------|:--:|:--:|:--:|
| Bắc (tham chiếu) | 0 | 0 | 0 |
| Trung | 1 | 0 | 0 |
| Nam | 0 | 1 | 0 |
| Tây Nguyên | 0 | 0 | 1 |

**(c)** $\\beta_{\\text{Nam}} = 1{,}2$: giá trị dự báo của $y$ ở khu vực **Nam cao hơn khu vực Bắc 1,2 đơn vị**, *giữ mọi biến khác cố định*. (So sánh luôn với mức tham chiếu Bắc.)

### Bài 6

**(a)** $R^2$ huấn luyện **tăng đơn điệu** (không bao giờ giảm), tiến gần 1 khi $p$ tiến tới $n-1$.

**(b)** Adjusted $R^2$ thường **tăng rồi giảm**: lúc đầu tăng khi biến có ích, sau đó giảm mạnh khi biến thêm là rác và $p$ tiến gần $n$ (thừa số phạt $\\frac{n-1}{n-p-1}$ phình rất nhanh, có thể làm adjusted âm).

**(c)** Hai cách kiểm tra overfit:
1. **Train/test split**: chia dữ liệu, fit trên tập train, đo $R^2$ trên tập test. Nếu $R^2$ test ≪ $R^2$ train → overfit.
2. **Cross-validation** (k-fold): chia $k$ phần, lần lượt fit trên $k-1$ phần và kiểm tra trên phần còn lại; $R^2$ CV thấp hơn nhiều so với train là dấu hiệu overfit. (Cả hai thuộc về [AI-ML](../../../AI-ML/).)

---

## Bài tiếp theo

→ [Lesson 10: Hồi quy Logistic (Logistic Regression)](../lesson-10-logistic-regression/) — khi $y$ là **phân loại nhị phân** (mua / không mua, bệnh / khoẻ) thay vì số liên tục. Hồi quy tuyến tính không phù hợp; ta cần hàm logistic để dự báo *xác suất*.

## Tham khảo

- *An Introduction to Statistical Learning* (James, Witten, Hastie, Tibshirani) — Chương 3 (Linear Regression), 6 (Model Selection). Bản PDF miễn phí.
- *OpenIntro Statistics*, Diez et al. — Chương 9 (Multiple & Logistic Regression).
- [Vectors/04 — Linear Algebra](../../../Vectors/04-LinearAlgebra/) — ma trận, nghịch đảo, phép chiếu (nền tảng OLS dạng ma trận).
- [AI-ML](../../../AI-ML/) — overfitting, feature selection, regularization, cross-validation.
</content>
</invoke>
`;
