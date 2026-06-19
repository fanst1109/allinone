// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-08-linear-regression/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08: Hồi quy tuyến tính (Linear Regression)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **correlation chưa đủ**: nó đo *độ mạnh* của quan hệ, nhưng không cho ra một **mô hình dự đoán** giá trị cụ thể.
- Viết được mô hình hồi quy đơn biến $\\hat{y} = \\beta_0 + \\beta_1 x$ và giải thích ý nghĩa từng hệ số.
- Tính **least squares (OLS)** bằng tay: công thức $\\beta_1$, $\\beta_0$ và walk-through đầy đủ trên dữ liệu thật.
- Hiểu **least squares = phép chiếu trực giao** (liên hệ [Vectors/04 LinearAlgebra](../../../Vectors/04-LinearAlgebra/)) và tại sao đạo hàm SSE = 0 cho ra đúng công thức đó (liên hệ [Math/04 Calculus](../../../Math/04-Calculus-1var/)).
- Tính và diễn giải **R²** — "phần trăm biến thiên giải thích được", và hiểu quan hệ $R^2 = r^2$ trong hồi quy đơn biến.
- Phân tích **phần dư (residual)**, dùng **residual plot** để phát hiện vi phạm giả định.
- Nắm 4 **giả định hồi quy** (tuyến tính, độc lập, phương sai đồng nhất, phần dư chuẩn) và biết khi nào chúng bị vi phạm.
- **Kiểm định hệ số**: $SE(\\beta_1)$, t-test cho $H_0: \\beta_1 = 0$, khoảng tin cậy — và nhớ rằng **hệ số khác 0 ≠ nhân quả**.

## Kiến thức tiền đề

- [Lesson 05 Tầng 1: Tương quan](../../01-Descriptive/lesson-05-bivariate-correlation/) — Pearson r, covariance, scatter plot. Bài này là phần tiếp nối trực tiếp.
- [Lesson 02 Tầng 2: Khoảng tin cậy](../lesson-02-confidence-interval/README.md) — CI cho tham số.
- [Lesson 03 Tầng 2: Kiểm định giả thuyết](../lesson-03-hypothesis-testing-1sample/README.md) — t-test, p-value.
- [Vectors/04 LinearAlgebra](../../../Vectors/04-LinearAlgebra/) — phép chiếu trực giao (least squares là chiếu y lên không gian cột của X).
- [Math/04 Calculus](../../../Math/04-Calculus-1var/) — đạo hàm để tối thiểu hoá SSE.

---

## 1. Mở đầu: từ "đi đôi" đến "dự đoán"

Bài trước ([Tương quan](../../01-Descriptive/lesson-05-bivariate-correlation/)) cho biết diện tích nhà và giá nhà có $r = 0{,}9$ — quan hệ tuyến tính rất mạnh. Nhưng giờ sếp hỏi câu cụ thể:

> "Có một căn **120 m²** chưa rao bán. Theo dữ liệu cũ, **giá khoảng bao nhiêu**?"

Pearson r KHÔNG trả lời được câu này. r chỉ nói "khi diện tích tăng thì giá có xu hướng tăng, và xu hướng đó chặt". Nó **không** cho một con số. Để dự đoán, ta cần **một đường thẳng**:

$$\\text{giá} \\approx \\beta_0 + \\beta_1 \\times \\text{diện tích}$$

Cắm $\\text{diện tích} = 120$ vào là ra số. Đó là **hồi quy (regression)**.

> 💡 **Trực giác**: Correlation là *thước đo* (một con số trong [−1, 1] nói "chặt hay lỏng"). Regression là *cái máy dự đoán* (một hàm số: đưa x vào, nhả ŷ ra). Cùng dùng chung dữ liệu, nhưng correlation chỉ tóm tắt, còn regression cho công cụ.

### 1.1. Câu hỏi mở: "đường thẳng nào khớp nhất?"

Vẽ 5 căn nhà lên scatter plot. Có **vô số** đường thẳng đi qua đám điểm đó. Đường nào "khớp nhất"?

| Diện tích x (m²) | Giá y (tỉ đồng) |
|---|---|
| 50 | 2.0 |
| 70 | 2.4 |
| 90 | 3.6 |
| 110 | 3.8 |
| 130 | 5.2 |

Ta cần một **tiêu chí định lượng** cho chữ "khớp nhất". Câu trả lời — **least squares** — sẽ được giải đáp trọn vẹn ở Mục 3, kèm walk-through tính ra đúng đường thẳng cho chính 5 điểm này. Đừng để câu hỏi treo: cuối Mục 3 bạn sẽ có $\\beta_0$, $\\beta_1$ cụ thể.

> 📝 **Tóm tắt mục 1**:
> - Correlation đo độ mạnh; regression cho mô hình dự đoán giá trị liên tục.
> - Mô hình đơn biến là một đường thẳng $\\hat{y} = \\beta_0 + \\beta_1 x$.
> - "Khớp nhất" cần một tiêu chí số — đó là least squares (Mục 3).

---

## 2. Mô hình hồi quy tuyến tính đơn biến

Mô hình:

$$\\hat{y} = \\beta_0 + \\beta_1 x$$

Ký hiệu $\\hat{y}$ (y-hat) là **giá trị dự đoán**, phân biệt với $y$ là **giá trị thật quan sát được**. Ba thành phần:

### 2.1. $\\beta_1$ — hệ số góc (slope)

**(a) Là gì**: $\\beta_1$ là **độ dốc** của đường — *"khi x tăng 1 đơn vị, ŷ thay đổi bao nhiêu đơn vị"*.

**(b) Vì sao cần**: Đây là phần "có ý nghĩa kinh tế/khoa học" nhất của mô hình. $\\beta_1$ trả lời câu "thêm 1 m² thì giá tăng bao nhiêu". $\\beta_1 = 0$ nghĩa là x không giúp dự đoán y (đường nằm ngang).

**(c) Ví dụ số**: Nếu $\\beta_1 = 0{,}03$ (tỉ đồng/m²), thì căn rộng hơn 10 m² đắt hơn $0{,}03 \\times 10 = 0{,}3$ tỉ.

**4 ví dụ slope:**
- $\\beta_1 = 2$: x tăng 1 → ŷ tăng 2 (dốc lên).
- $\\beta_1 = -1{,}5$: x tăng 1 → ŷ giảm 1,5 (dốc xuống).
- $\\beta_1 = 0$: x không ảnh hưởng (đường ngang, $\\hat{y} = \\beta_0$).
- $\\beta_1 = 0{,}001$: x tăng 1 → ŷ tăng tí xíu (gần như phẳng, nhưng vẫn dương).

### 2.2. $\\beta_0$ — hệ số chặn (intercept)

**(a) Là gì**: $\\beta_0$ là **giá trị ŷ khi x = 0** — điểm đường cắt trục tung.

**(b) Vì sao cần**: Nó "neo" đường ở đúng độ cao. Không có $\\beta_0$, đường buộc phải qua gốc toạ độ (0,0) — thường sai. Nhưng $\\beta_0$ nhiều khi **không có ý nghĩa thực tế** (xem cảnh báo).

**(c) Ví dụ số**: Mô hình $\\hat{y} = 1{,}2 + 0{,}03x$ với x = diện tích: $\\beta_0 = 1{,}2$ nghĩa là "căn 0 m² giá 1,2 tỉ" — vô nghĩa thực tế (không có căn 0 m²), nhưng vẫn cần để đường đúng vị trí.

**4 ví dụ intercept:** $\\beta_0 = 0$ (qua gốc), $\\beta_0 = 5$ (cắt trục tung ở 5), $\\beta_0 = -2$ (cắt dưới gốc), $\\beta_0 = 100$ (neo cao, vd lương khởi điểm 100 triệu).

### 2.3. $\\varepsilon$ — sai số (error / residual)

Dữ liệu thật không nằm hoàn hảo trên đường. Mô hình đầy đủ:

$$y_i = \\beta_0 + \\beta_1 x_i + \\varepsilon_i$$

$\\varepsilon_i = y_i - \\hat{y}_i$ là **phần dư** — khoảng cách dọc từ điểm thật tới đường. Mục 5 đào sâu.

> ⚠ **Lỗi thường gặp — diễn giải $\\beta_0$ ngoài vùng dữ liệu**: Nếu mọi x trong data nằm trong [50, 130], thì $\\beta_0$ (giá trị tại x = 0) là **ngoại suy xa** — đừng diễn giải nó như một dự đoán đáng tin. Đường thẳng chỉ được "kiểm chứng" trong vùng dữ liệu đã thấy.

> ❓ **Câu hỏi tự nhiên**:
> - "Vì sao gọi là *tuyến tính*?" → Tuyến tính theo **hệ số** $\\beta_0, \\beta_1$ (mô hình là tổ hợp tuyến tính của chúng), không nhất thiết theo x. Mô hình $\\hat{y} = \\beta_0 + \\beta_1 x^2$ vẫn là "hồi quy tuyến tính" (tuyến tính theo $\\beta$).
> - "ŷ và y khác nhau thế nào?" → $y$ là dữ liệu thật bạn đo được; $\\hat{y}$ là giá trị đường thẳng dự đoán cho cùng x đó. Hai cái lệch nhau một lượng $\\varepsilon$.

> 🔁 **Dừng lại tự kiểm tra**:
> Mô hình $\\hat{y} = 1{,}2 + 0{,}03x$. Dự đoán giá căn 120 m²? Căn 200 m² thì có nên tin không?
> <details><summary>Đáp án</summary>
>
> Căn 120 m²: $\\hat{y} = 1{,}2 + 0{,}03 \\times 120 = 1{,}2 + 3{,}6 = \\mathbf{4{,}8}$ tỉ.
> Căn 200 m²: $\\hat{y} = 1{,}2 + 6 = 7{,}2$ tỉ — nhưng 200 m² **ngoài vùng dữ liệu** [50, 130]. Đây là ngoại suy (extrapolation), **không đáng tin**: quan hệ có thể không còn tuyến tính ở căn rất to.
> </details>

---

## 3. Least squares (OLS) — "khớp nhất" nghĩa là gì

### 3.1. Tiêu chí: tối thiểu hoá tổng bình phương sai số

Có vô số đường. Ta chọn đường làm **tổng bình phương phần dư** nhỏ nhất:

$$\\text{SSE} = \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 = \\sum_{i=1}^{n} \\big(y_i - (\\beta_0 + \\beta_1 x_i)\\big)^2$$

(SSE = Sum of Squared Errors, còn gọi là RSS — Residual Sum of Squares.)

> 💡 **Trực giác — vì sao bình phương?**: Vẽ đoạn dọc từ mỗi điểm tới đường (phần dư). Nếu chỉ cộng các phần dư có dấu, dương và âm triệt tiêu → đường nào cũng cho tổng ≈ 0. Bình phương làm mọi sai số thành dương VÀ phạt nặng sai số lớn (sai 2 → phạt 4; sai 4 → phạt 16). Đường tối ưu là đường "cân bằng" các điểm tốt nhất.

> ❓ **Sao không dùng trị tuyệt đối** $\\sum|y_i - \\hat{y}_i|$? → Có (gọi là LAD regression, robust với outlier hơn). Nhưng bình phương cho công thức đóng đẹp (đạo hàm trơn, giải được bằng tay), nên OLS là chuẩn mặc định.

### 3.2. Công thức nghiệm

Tối thiểu SSE bằng cách lấy đạo hàm riêng theo $\\beta_0, \\beta_1$ rồi cho bằng 0 (xem 3.4). Kết quả:

$$\\beta_1 = \\dfrac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2}, \\qquad \\beta_0 = \\bar{y} - \\beta_1 \\bar{x}$$

Để ý tử số của $\\beta_1$ chính là (n−1)·covariance, mẫu số là (n−1)·variance của x. Vậy:

$$\\beta_1 = \\dfrac{\\text{Cov}(x, y)}{\\text{Var}(x)} = r \\cdot \\dfrac{s_y}{s_x}$$

— slope = hệ số tương quan r đã được "co giãn" theo tỉ lệ độ phân tán của y so với x. Công thức $\\beta_0$ nói đường **luôn đi qua điểm trung tâm** $(\\bar{x}, \\bar{y})$.

### 3.3. Walk-through ĐẦY ĐỦ — 5 điểm dữ liệu nhà ở

Dùng đúng 5 điểm ở Mục 1.1: (50, 2.0), (70, 2.4), (90, 3.6), (110, 3.8), (130, 5.2).

**Bước 1 — trung bình:**

$$\\bar{x} = \\dfrac{50+70+90+110+130}{5} = \\dfrac{450}{5} = 90, \\qquad \\bar{y} = \\dfrac{2{,}0+2{,}4+3{,}6+3{,}8+5{,}2}{5} = \\dfrac{17{,}0}{5} = 3{,}4$$

**Bước 2 — bảng lệch và tích:**

| x | y | $x-\\bar{x}$ | $y-\\bar{y}$ | $(x-\\bar{x})(y-\\bar{y})$ | $(x-\\bar{x})^2$ |
|---|---|---|---|---|---|
| 50 | 2.0 | −40 | −1.4 | 56.0 | 1600 |
| 70 | 2.4 | −20 | −1.0 | 20.0 | 400 |
| 90 | 3.6 | 0 | 0.2 | 0.0 | 0 |
| 110 | 3.8 | 20 | 0.4 | 8.0 | 400 |
| 130 | 5.2 | 40 | 1.8 | 72.0 | 1600 |
| **Σ** | | | | **156.0** | **4000** |

**Bước 3 — slope:**

$$\\beta_1 = \\dfrac{156{,}0}{4000} = \\mathbf{0{,}039}$$

**Bước 4 — intercept:**

$$\\beta_0 = \\bar{y} - \\beta_1 \\bar{x} = 3{,}4 - 0{,}039 \\times 90 = 3{,}4 - 3{,}51 = \\mathbf{-0{,}11}$$

**Đường OLS:** $\\boxed{\\hat{y} = -0{,}11 + 0{,}039\\,x}$

**Bước 5 — kiểm tra**: dự đoán cho x = 120 (câu hỏi mở của sếp):

$$\\hat{y} = -0{,}11 + 0{,}039 \\times 120 = -0{,}11 + 4{,}68 = \\mathbf{4{,}57 \\text{ tỉ}}$$

Câu hỏi mở bài đã được đóng: căn 120 m² dự đoán **≈ 4,57 tỉ**.

**Bước 6 — bảng ŷ và phần dư** (gọi là *bảng phần dư*, dùng lại ở Mục 4–5):

| x | y | $\\hat{y} = -0{,}11 + 0{,}039x$ | $e = y - \\hat{y}$ | $e^2$ |
|---|---|---|---|---|
| 50 | 2.0 | 1.84 | +0.16 | 0.0256 |
| 70 | 2.4 | 2.62 | −0.22 | 0.0484 |
| 90 | 3.6 | 3.40 | +0.20 | 0.0400 |
| 110 | 3.8 | 4.18 | −0.38 | 0.1444 |
| 130 | 5.2 | 4.96 | +0.24 | 0.0576 |
| | | | **Σe ≈ 0** | **SSE = 0.316** |

Lưu ý $\\sum e \\approx 0$ — đây là **tính chất bắt buộc** của OLS (tổng phần dư = 0 khi có intercept), một cách tự kiểm tra số học.

### 3.4. Vì sao công thức đó? — đạo hàm SSE (liên hệ Calculus)

SSE là hàm 2 biến $\\beta_0, \\beta_1$. Tối thiểu → đạo hàm riêng bằng 0 (xem [Math/04 Calculus](../../../Math/04-Calculus-1var/)):

$$\\begin{aligned}
\\dfrac{\\partial \\text{SSE}}{\\partial \\beta_0} &= -2\\sum (y_i - \\beta_0 - \\beta_1 x_i) = 0 \\\\
\\dfrac{\\partial \\text{SSE}}{\\partial \\beta_1} &= -2\\sum x_i (y_i - \\beta_0 - \\beta_1 x_i) = 0
\\end{aligned}$$

Phương trình đầu chia cho n cho ngay $\\bar{y} = \\beta_0 + \\beta_1 \\bar{x}$, tức $\\beta_0 = \\bar{y} - \\beta_1\\bar{x}$. Thế vào phương trình thứ hai và rút gọn cho ra công thức $\\beta_1$ ở 3.2. (Hai phương trình này gọi là **normal equations**.)

### 3.5. Least squares = phép chiếu trực giao (liên hệ Vectors/04)

Có một góc nhìn đẹp hơn từ [Vectors/04 LinearAlgebra](../../../Vectors/04-LinearAlgebra/). Gom các quan sát thành vector $\\mathbf{y} \\in \\mathbb{R}^n$. Mọi tổ hợp $\\beta_0 + \\beta_1 x$ tạo thành một **mặt phẳng** (không gian cột của ma trận $X$). OLS tìm điểm $\\hat{\\mathbf{y}}$ trong mặt phẳng đó **gần $\\mathbf{y}$ nhất** — chính là **hình chiếu trực giao** của $\\mathbf{y}$ xuống mặt phẳng.

> 💡 **Trực giác**: Đứng ngoài mặt phẳng (điểm $\\mathbf{y}$), thả dây dọi xuống — chân dây dọi là $\\hat{\\mathbf{y}}$. "Vuông góc" chính là điều kiện **vector phần dư $\\mathbf{e} = \\mathbf{y} - \\hat{\\mathbf{y}}$ vuông góc với mọi cột của X**. Điều này tương đương với hai normal equations ở 3.4 — đó là lý do $\\sum e_i = 0$ và $\\sum x_i e_i = 0$.

> 🔁 **Dừng lại tự kiểm tra**:
> Cho 3 điểm (1, 1), (2, 3), (3, 2). Tính $\\beta_1, \\beta_0$.
> <details><summary>Đáp án</summary>
>
> $\\bar{x} = 2$, $\\bar{y} = 2$. Lệch x: −1, 0, 1; lệch y: −1, 1, 0.
> Tích: $(-1)(-1)=1$, $0\\cdot1=0$, $1\\cdot0=0$ → $\\sum = 1$. $\\sum(x-\\bar{x})^2 = 1+0+1 = 2$.
> $\\beta_1 = 1/2 = \\mathbf{0{,}5}$. $\\beta_0 = 2 - 0{,}5\\times2 = \\mathbf{1}$. Đường: $\\hat{y} = 1 + 0{,}5x$.
> </details>

> 📝 **Tóm tắt mục 3**:
> - "Khớp nhất" = tối thiểu SSE $=\\sum(y_i-\\hat{y}_i)^2$.
> - $\\beta_1 = \\dfrac{\\sum(x-\\bar{x})(y-\\bar{y})}{\\sum(x-\\bar{x})^2} = r\\frac{s_y}{s_x}$; $\\beta_0 = \\bar{y}-\\beta_1\\bar{x}$ → đường qua $(\\bar{x},\\bar{y})$.
> - Công thức suy ra từ đạo hàm SSE = 0 (normal equations) = chiếu trực giao y xuống cột-không-gian X.
> - Với 5 điểm nhà: $\\hat{y} = -0{,}11 + 0{,}039x$, SSE = 0,316.

---

## 4. R² — hệ số xác định

### 4.1. Định nghĩa

**(a) Là gì**: $R^2$ đo **tỉ lệ biến thiên của y mà mô hình giải thích được** — một con số trong [0, 1] (thường ghi dưới dạng %).

**(b) Vì sao cần**: SSE cho biết mô hình sai bao nhiêu *theo đơn vị y bình phương* — khó so sánh giữa các bài toán khác đơn vị. $R^2$ chuẩn hoá: nó so SSE của mô hình với SSE của "mô hình ngu nhất" (luôn đoán $\\bar{y}$). $R^2 = 0{,}8$ nghĩa "mô hình giải thích 80% biến thiên" — diễn giải được ngay, không phụ thuộc đơn vị.

**(c) Ví dụ trực giác**: Nếu chỉ biết $\\bar{y}$, dự đoán nào cũng đoán 3,4 tỉ → sai nhiều (SST). Khi thêm biến diện tích, sai giảm còn SSE. Phần sai giảm được chính là phần "giải thích được".

### 4.2. Công thức

$$R^2 = 1 - \\dfrac{\\text{SSE}}{\\text{SST}}, \\qquad \\text{SST} = \\sum (y_i - \\bar{y})^2, \\quad \\text{SSE} = \\sum (y_i - \\hat{y}_i)^2$$

- **SST** (Total Sum of Squares): biến thiên tổng của y quanh mean — sai số nếu chỉ đoán $\\bar{y}$.
- **SSE** (Sum of Squared Errors): sai số còn lại sau khi dùng đường.
- **SSR = SST − SSE** (Regression SS): phần giải thích được. Nên $R^2 = \\text{SSR}/\\text{SST}$.

### 4.3. Walk-through trên 5 điểm nhà

SSE = 0,316 (bảng phần dư ở 3.3). SST từ cột $(y-\\bar{y})^2$:

| $y-\\bar{y}$ | $(y-\\bar{y})^2$ |
|---|---|
| −1.4 | 1.96 |
| −1.0 | 1.00 |
| 0.2 | 0.04 |
| 0.4 | 0.16 |
| 1.8 | 3.24 |
| **Σ = SST** | **6.40** |

$$R^2 = 1 - \\dfrac{0{,}316}{6{,}40} = 1 - 0{,}0494 = \\mathbf{0{,}9506}$$

→ Đường thẳng giải thích **≈ 95,1%** biến thiên của giá. Rất tốt.

### 4.4. Quan hệ $R^2 = r^2$ (đơn biến) — 4 ví dụ

Trong hồi quy **một biến**, $R^2$ đúng bằng bình phương Pearson r:

| Pearson r | $R^2 = r^2$ | Diễn giải |
|---|---|---|
| 0.975 | 0.951 | (chính 5 điểm nhà: $\\sqrt{0{,}951}\\approx0{,}975$) — 95% giải thích được |
| 0.9 | 0.81 | 81% biến thiên giải thích |
| 0.7 | 0.49 | chỉ 49% — "r mạnh" nhưng hơn nửa biến thiên vẫn chưa giải thích |
| 0.5 | 0.25 | 25% — r trung bình → mô hình giải thích ít |

> ⚠ **Lỗi thường gặp**: "$r = 0{,}7$ là mạnh nên mô hình tốt". Nhưng $R^2 = 0{,}49$ → **hơn nửa** biến thiên CHƯA giải thích được. Luôn báo $R^2$ để khỏi phóng đại.

> ❓ **Câu hỏi tự nhiên**:
> - "$R^2$ cao thì mô hình *đúng* không?" → Không nhất thiết. Anscombe quartet (Lesson 05) có $R^2$ như nhau nhưng có dataset hình parabol — mô hình tuyến tính sai dù $R^2$ cao. **Luôn xem residual plot** (Mục 5).
> - "$R^2$ có thể âm không?" → Trong OLS có intercept thì $R^2 \\in [0,1]$. Nhưng nếu ép đường qua gốc hoặc dùng mô hình tệ trên dữ liệu test, $R^2$ có thể âm (mô hình còn tệ hơn đoán $\\bar{y}$).

> 🔁 **Dừng lại tự kiểm tra**:
> Một mô hình có SST = 200, SSE = 50. Tính $R^2$ và Pearson r.
> <details><summary>Đáp án</summary>
>
> $R^2 = 1 - 50/200 = 1 - 0{,}25 = \\mathbf{0{,}75}$. Đơn biến nên $r = \\pm\\sqrt{0{,}75} \\approx \\pm 0{,}866$ (dấu theo dấu của slope).
> </details>

> 📝 **Tóm tắt mục 4**:
> - $R^2 = 1 - \\text{SSE}/\\text{SST}$ = % biến thiên y giải thích được.
> - Đơn biến: $R^2 = r^2$.
> - $R^2$ cao KHÔNG đảm bảo mô hình đúng — vẫn phải xem phần dư.

---

## 5. Phần dư (residual) và phân tích phần dư

### 5.1. Phần dư là gì

**(a) Là gì**: phần dư $e_i = y_i - \\hat{y}_i$ = khoảng cách dọc giữa điểm thật và đường dự đoán. Dương: điểm nằm trên đường (mô hình đoán thấp). Âm: dưới đường.

**(b) Vì sao cần**: phần dư là "phần mô hình không bắt được". Nếu mô hình tốt, phần dư phải trông như **nhiễu ngẫu nhiên** — không còn pattern nào. Mọi pattern còn sót trong phần dư = thông tin mô hình bỏ lỡ.

**(c) Ví dụ số**: từ bảng phần dư (3.3), điểm (110, 3.8) có $\\hat{y} = 4{,}18$ → $e = 3{,}8 - 4{,}18 = -0{,}38$ (dưới đường nhất). Điểm (90, 3.6): $e = +0{,}20$.

### 5.2. Residual plot — vũ khí chẩn đoán

Vẽ $e_i$ (trục tung) theo $\\hat{y}_i$ hoặc $x_i$ (trục hoành). Đọc hình:

| Hình dạng residual plot | Chẩn đoán |
|---|---|
| Đám mây ngẫu nhiên quanh 0, đều | ✓ Mô hình ổn |
| Cong (U hoặc ∩) | ✗ Quan hệ phi tuyến — cần thêm $x^2$ hoặc đổi mô hình |
| Hình phễu (loe ra) | ✗ Phương sai không đồng nhất (heteroscedasticity) |
| 1 điểm bật xa hẳn | ⚠ Outlier — kiểm tra ảnh hưởng |

> 💡 **Trực giác**: Scatter gốc (y theo x) khó thấy pattern tinh vi vì độ dốc lớn lấn át. Residual plot "trừ đi đường thẳng", phóng to phần còn lại → pattern ẩn lộ ra. Module 3 trong viz minh hoạ điều này.

> ⚠ **Lỗi thường gặp — outlier kéo đường**: Một điểm xa (đặc biệt ở rìa miền x, gọi là điểm có *leverage* cao) có thể kéo nghiêng cả đường OLS và bơm $R^2$ giả. Trong viz, thử thêm 1 điểm (200, 1.0): đường lệch hẳn. Vì least squares **bình phương** sai số, một điểm xa bị phạt cực nặng → đường "chạy theo" nó.

> 🔁 **Dừng lại tự kiểm tra**:
> Residual plot cho hình chữ U rõ rệt. Mô hình tuyến tính có phù hợp không?
> <details><summary>Đáp án</summary>
>
> KHÔNG. Hình U nghĩa là quan hệ thật là cong (vd parabol). Đường thẳng bỏ sót độ cong → phần dư có pattern. Nên thêm số hạng $x^2$ (vẫn là "linear regression" theo hệ số) hoặc đổi mô hình.
> </details>

> 📝 **Tóm tắt mục 5**:
> - $e_i = y_i - \\hat{y}_i$; mô hình tốt → phần dư ngẫu nhiên quanh 0.
> - Residual plot lộ phi tuyến (cong), heteroscedasticity (phễu), outlier.
> - Outlier leverage cao kéo cả đường vì OLS phạt bình phương.

---

## 6. Các giả định của hồi quy tuyến tính

Để OLS cho ước lượng tốt VÀ để kiểm định/CI hợp lệ, cần 4 giả định (gọi tắt **LINE**):

### 6.1. L — Linearity (tuyến tính)

Quan hệ trung bình giữa x và y thật sự là đường thẳng. **Vi phạm**: residual plot cong. **Sửa**: thêm $x^2$, log-transform, hoặc mô hình phi tuyến.

### 6.2. I — Independence (độc lập)

Các sai số $\\varepsilon_i$ độc lập với nhau. **Vi phạm điển hình**: dữ liệu chuỗi thời gian (giá hôm nay phụ thuộc hôm qua — autocorrelation). **Hậu quả**: SE bị ước lượng sai → kiểm định sai.

### 6.3. E — Equal variance (homoscedasticity, phương sai đồng nhất)

**(a) Là gì**: độ phân tán của phần dư **không đổi** dọc theo x. **(b) Vì sao cần**: công thức $SE(\\beta_1)$ giả định một $\\sigma$ chung; nếu sai số to dần (vd nhà to giá dao động mạnh hơn) thì SE sai. **(c) Ví dụ**: residual plot hình phễu loe ra = vi phạm. **Sửa**: log-transform y, hoặc weighted least squares.

### 6.4. N — Normality (phần dư chuẩn)

Phần dư xấp xỉ phân phối chuẩn. **Quan trọng cho**: t-test hệ số và CI (đặc biệt mẫu nhỏ). **Kiểm tra**: histogram phần dư hoặc Q-Q plot. **Lưu ý**: với n lớn, CLT ([Lesson 01 Tầng 2](../lesson-01-sampling-clt/README.md)) làm giả định này bớt khắt khe cho việc suy luận về $\\beta$.

> ⚠ **Cảnh báo tổng**: 4 giả định bị vi phạm KHÔNG làm OLS "không tính được" — nó vẫn cho ra số. Nguy hiểm ở chỗ **số đó trông hợp lý nhưng sai**: dự đoán lệch (vi phạm L), p-value và CI sai (vi phạm I/E/N). Luôn vẽ residual plot trước khi tin kết quả.

> ❓ **Câu hỏi tự nhiên**:
> - "Cần kiểm tra giả định trước hay sau khi fit?" → Sau. Fit xong mới có phần dư để vẽ residual plot và Q-Q plot.
> - "Vi phạm Normality nặng có hỏng dự đoán $\\hat{y}$ không?" → Bản thân điểm dự đoán $\\hat{y}$ vẫn là ước lượng không chệch; Normality chủ yếu ảnh hưởng đến **độ tin cậy** (CI, p-value), không phải vị trí đường.

> 📝 **Tóm tắt mục 6**: LINE — Linearity, Independence, Equal variance, Normality. Vi phạm → số vẫn ra nhưng suy luận sai. Chẩn đoán bằng residual plot + Q-Q plot.

---

## 7. Kiểm định hệ số — slope có thật khác 0 không?

### 7.1. Câu hỏi suy luận

$\\beta_1 = 0{,}039$ tính từ 5 căn nhà. Nhưng đây chỉ là **một mẫu**. Nếu lấy 5 căn khác, $\\beta_1$ sẽ hơi khác. Câu hỏi suy luận (liên hệ [Lesson 03](../lesson-03-hypothesis-testing-1sample/README.md)): **liệu slope thật của tổng thể có khác 0 không, hay 0,039 chỉ là nhiễu may rủi?**

$$H_0: \\beta_1 = 0 \\quad (\\text{x không giúp dự đoán y}) \\qquad H_a: \\beta_1 \\neq 0$$

### 7.2. Sai số chuẩn của slope

$$SE(\\beta_1) = \\dfrac{s_e}{\\sqrt{\\sum (x_i - \\bar{x})^2}}, \\qquad s_e = \\sqrt{\\dfrac{\\text{SSE}}{n - 2}}$$

- $s_e$ = **residual standard error** = độ lệch chuẩn của phần dư. Chia $n-2$ vì đã "tiêu" 2 bậc tự do cho $\\beta_0, \\beta_1$.
- Mẫu số: x càng trải rộng ($\\sum(x-\\bar{x})^2$ lớn) → SE càng nhỏ → ước lượng slope càng chắc. (Trực giác: điểm tựa càng xa nhau, đường càng khó nghiêng lung tung.)

### 7.3. Walk-through trên 5 điểm nhà

$$s_e = \\sqrt{\\dfrac{0{,}316}{5 - 2}} = \\sqrt{0{,}1053} = 0{,}3245$$

$$SE(\\beta_1) = \\dfrac{0{,}3245}{\\sqrt{4000}} = \\dfrac{0{,}3245}{63{,}25} = 0{,}005131$$

**t-statistic:**

$$t = \\dfrac{\\beta_1 - 0}{SE(\\beta_1)} = \\dfrac{0{,}039}{0{,}005131} = \\mathbf{7{,}60}$$

Bậc tự do $df = n - 2 = 3$. Giá trị tới hạn $t_{0{,}025, 3} \\approx 3{,}182$. Vì $7{,}60 > 3{,}182$ → **bác bỏ $H_0$**: slope khác 0 có ý nghĩa thống kê (p ≈ 0,0047). Diện tích thực sự giúp dự đoán giá.

### 7.4. Khoảng tin cậy cho slope (liên hệ Lesson 02)

$$\\beta_1 \\pm t_{\\alpha/2,\\, n-2} \\cdot SE(\\beta_1) = 0{,}039 \\pm 3{,}182 \\times 0{,}005131 = 0{,}039 \\pm 0{,}0163 = [\\mathbf{0{,}0227,\\ 0{,}0553}]$$

Khoảng không chứa 0 → khớp với kết luận bác bỏ $H_0$. Diễn giải: "thêm 1 m² làm giá tăng từ 0,023 đến 0,055 tỉ, với độ tin cậy 95%".

### 7.5. Cảnh báo lớn nhất: ý nghĩa thống kê ≠ nhân quả

> ⚠ **Tương quan ≠ nhân quả — và hồi quy CŨNG vậy**. Bác bỏ $H_0: \\beta_1 = 0$ chỉ nói "x và y có liên hệ tuyến tính không ngẫu nhiên". Nó **KHÔNG** chứng minh x *gây ra* y. $\\beta_1$ lớn và p nhỏ vẫn có thể do **confounder** (biến thứ ba gây cả x và y). Ví dụ kinh điển: hồi quy "số vụ chết đuối" theo "doanh số kem" cho $\\beta_1 > 0$ p rất nhỏ — nhưng kem không gây chết đuối; mùa hè gây cả hai. Để nói nhân quả cần thiết kế thí nghiệm hoặc kỹ thuật causal inference: [Suy luận nhân quả — Tầng 3](../../03-Advanced/lesson-02-causal-inference/).

> ❓ **Câu hỏi tự nhiên**:
> - "p nhỏ + $R^2$ cao = mô hình dùng được cho nhân quả?" → Không. Cả hai chỉ nói về *liên hệ* và *độ khớp*, không về *cơ chế gây ra*.
> - "n lớn thì sao?" → Với n rất lớn, ngay cả $\\beta_1$ bé tí cũng có p nhỏ (significant). Hãy nhìn **độ lớn** $\\beta_1$ và CI, đừng chỉ nhìn p.

> 📝 **Tóm tắt mục 7**:
> - t-test $H_0:\\beta_1=0$ với $t = \\beta_1/SE(\\beta_1)$, $df = n-2$.
> - $SE(\\beta_1) = s_e/\\sqrt{\\sum(x-\\bar{x})^2}$; x trải rộng → SE nhỏ → chắc hơn.
> - CI cho slope không chứa 0 ⇔ bác bỏ $H_0$.
> - Significant ≠ nhân quả. Coi chừng confounder; cần thí nghiệm để khẳng định nhân quả.

---

## 8. Hồi quy trong thực tế: liên hệ Machine Learning

Linear regression là **mô hình ML đầu tiên và nền tảng nhất**. Nhiều ý tưởng ở đây tái xuất trong [AI-ML](../../../AI-ML/):

- **Loss function**: SSE chính là *mean squared error* (MSE) — hàm mất mát phổ biến nhất.
- **Gradient descent**: thay vì giải normal equations (đóng), ML lớn dùng đạo hàm SSE (Mục 3.4) để cập nhật $\\beta$ dần dần — cùng đạo hàm, khác cách giải.
- **Overfitting & regularization**: thêm nhiều biến (xem [Multiple Regression](../lesson-09-multiple-regression/)) làm $R^2$ luôn tăng nhưng có thể overfit → cần Ridge/Lasso (phạt $\\beta$ lớn).
- **Train/test split**: $R^2$ trên dữ liệu huấn luyện lạc quan quá mức; ML đánh giá trên tập test riêng.

→ Hiểu vững OLS đơn biến là chìa khoá để hiểu mọi mô hình hồi quy phức tạp hơn.

---

## Bài tập

1. **Tự tính $\\beta_0, \\beta_1, R^2$**: Cho dữ liệu (1, 2), (2, 4), (3, 5), (4, 4), (5, 5). Tính $\\bar{x}, \\bar{y}$, $\\beta_1$, $\\beta_0$, viết phương trình đường, rồi tính SSE, SST và $R^2$. (Làm tròn 3 chữ số.)

2. **Dự đoán & ngoại suy**: Với mô hình ở Bài 1, dự đoán y khi x = 6 và x = 50. Cái nào đáng tin hơn? Vì sao?

3. **Liên hệ r ↔ slope**: Một dataset có $r = 0{,}8$, $s_x = 4$, $s_y = 10$. Tính $\\beta_1$. Nếu thêm vào đó $\\bar{x} = 20, \\bar{y} = 100$, viết phương trình đường.

4. **R² và r**: Một mô hình đơn biến báo $R^2 = 0{,}64$ và slope âm. Pearson r bằng bao nhiêu? Diễn giải $R^2$ này thành 1 câu.

5. **Kiểm định slope**: Một hồi quy với $n = 12$ cho $\\beta_1 = 2{,}5$ và $SE(\\beta_1) = 0{,}8$. Tính t-statistic, df, và kết luận ở $\\alpha = 0{,}05$ (cho $t_{0{,}025, 10} = 2{,}228$). Tính luôn CI 95% cho slope.

6. **Bẫy nhân quả**: Một nghiên cứu hồi quy "điểm thi" theo "số sách trong nhà" và tìm $\\beta_1 > 0$, p < 0,001. Có thể kết luận "mua thêm sách sẽ làm điểm con tăng" không? Nêu 1 confounder.

---

## Lời giải chi tiết

### Bài 1

$\\bar{x} = \\dfrac{1+2+3+4+5}{5} = 3$. $\\bar{y} = \\dfrac{2+4+5+4+5}{5} = \\dfrac{20}{5} = 4$.

| x | y | $x-\\bar{x}$ | $y-\\bar{y}$ | tích | $(x-\\bar{x})^2$ |
|---|---|---|---|---|---|
| 1 | 2 | −2 | −2 | 4 | 4 |
| 2 | 4 | −1 | 0 | 0 | 1 |
| 3 | 5 | 0 | 1 | 0 | 0 |
| 4 | 4 | 1 | 0 | 0 | 1 |
| 5 | 5 | 2 | 1 | 2 | 4 |
| **Σ** | | | | **6** | **10** |

$\\beta_1 = \\dfrac{6}{10} = \\mathbf{0{,}6}$. $\\beta_0 = 4 - 0{,}6\\times3 = 4 - 1{,}8 = \\mathbf{2{,}2}$. Đường: $\\hat{y} = 2{,}2 + 0{,}6x$.

**ŷ và phần dư:**

| x | y | $\\hat{y}$ | $e = y-\\hat{y}$ | $e^2$ |
|---|---|---|---|---|
| 1 | 2 | 2.8 | −0.8 | 0.64 |
| 2 | 4 | 3.4 | 0.6 | 0.36 |
| 3 | 5 | 4.0 | 1.0 | 1.00 |
| 4 | 4 | 4.6 | −0.6 | 0.36 |
| 5 | 5 | 5.2 | −0.2 | 0.04 |
| | | | Σe = 0 | **SSE = 2.40** |

SST $= (-2)^2+0^2+1^2+0^2+1^2 = 4+0+1+0+1 = 6$.

$R^2 = 1 - \\dfrac{2{,}40}{6} = 1 - 0{,}4 = \\mathbf{0{,}600}$. Mô hình giải thích 60% biến thiên.

### Bài 2

$\\hat{y}(6) = 2{,}2 + 0{,}6\\times6 = 2{,}2 + 3{,}6 = \\mathbf{5{,}8}$ — x = 6 chỉ ngay ngoài rìa [1,5], **tạm tin** (ngoại suy gần).

$\\hat{y}(50) = 2{,}2 + 0{,}6\\times50 = 2{,}2 + 30 = \\mathbf{32{,}2}$ — x = 50 **xa ngoài vùng dữ liệu** [1,5], **không đáng tin**: quan hệ tuyến tính chưa được kiểm chứng ở đó, có thể bão hoà/đổi dạng. Đây là cái bẫy ngoại suy (extrapolation) ở Mục 2.

### Bài 3

$\\beta_1 = r\\cdot\\dfrac{s_y}{s_x} = 0{,}8 \\times \\dfrac{10}{4} = 0{,}8 \\times 2{,}5 = \\mathbf{2{,}0}$.

$\\beta_0 = \\bar{y} - \\beta_1\\bar{x} = 100 - 2{,}0\\times20 = 100 - 40 = \\mathbf{60}$. Đường: $\\hat{y} = 60 + 2{,}0x$.

### Bài 4

Đơn biến → $R^2 = r^2$, nên $|r| = \\sqrt{0{,}64} = 0{,}8$. Slope âm → **$r = -0{,}8$**.

Diễn giải: "Đường hồi quy giải thích 64% biến thiên của y; 36% còn lại do các yếu tố khác hoặc nhiễu." (Quan hệ là nghịch biến.)

### Bài 5

$t = \\dfrac{\\beta_1}{SE} = \\dfrac{2{,}5}{0{,}8} = \\mathbf{3{,}125}$. $df = n - 2 = 12 - 2 = 10$.

So với $t_{0{,}025,10} = 2{,}228$: vì $3{,}125 > 2{,}228$ → **bác bỏ $H_0$**, slope khác 0 có ý nghĩa ở mức 5%.

CI 95%: $2{,}5 \\pm 2{,}228\\times0{,}8 = 2{,}5 \\pm 1{,}782 = [\\mathbf{0{,}718,\\ 4{,}282}]$. Không chứa 0 → khớp kết luận.

### Bài 6

**KHÔNG** kết luận nhân quả được. Hồi quy chỉ cho thấy *liên hệ*. Confounder hợp lý:

- **Trình độ/thu nhập gia đình**: nhà có học vấn/thu nhập cao thường VỪA mua nhiều sách VỪA đầu tư cho con học (gia sư, môi trường) → điểm cao. Sách và điểm cùng tăng theo nền tảng gia đình, không phải sách gây điểm.

Để khẳng định nhân quả cần thí nghiệm (phát sách ngẫu nhiên rồi so điểm) — xem [Suy luận nhân quả](../../03-Advanced/lesson-02-causal-inference/).

---

## Bài tiếp theo

→ [Lesson 09 Tầng 2: Hồi quy bội (Multiple Regression)](../lesson-09-multiple-regression/) — mở rộng sang nhiều biến dự báo $\\hat{y} = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_k x_k$, ma trận thiết kế, multicollinearity, adjusted $R^2$.

## Tham khảo

- *OpenIntro Statistics*, Diez et al. — Chapter 7 (linear regression), Chapter 8 (multiple regression).
- *An Introduction to Statistical Learning* (ISLR), James et al. — Chapter 3, cầu nối regression → ML.
- [Lesson 05 Tầng 1: Tương quan](../../01-Descriptive/lesson-05-bivariate-correlation/) — nền tảng Pearson r.
- [Vectors/04 LinearAlgebra](../../../Vectors/04-LinearAlgebra/) — least squares như phép chiếu trực giao.
- [Math/04 Calculus](../../../Math/04-Calculus-1var/) — đạo hàm để tối thiểu SSE.
`;
