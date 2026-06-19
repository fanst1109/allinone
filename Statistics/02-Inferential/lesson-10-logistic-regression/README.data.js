// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-10-logistic-regression/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10: Hồi quy logistic (Logistic Regression)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** không dùng hồi quy tuyến tính để dự đoán biến **nhị phân** (binary): đường thẳng cho ra giá trị ngoài $[0, 1]$, vô nghĩa khi diễn giải là xác suất.
- Nắm **hàm sigmoid** $\\sigma(z) = \\dfrac{1}{1 + e^{-z}}$ với $z = \\beta_0 + \\beta_1 x$: ép mọi số thực về khoảng $(0, 1)$, dạng chữ S.
- Hiểu **odds** và **log-odds (logit)**: odds $= \\dfrac{p}{1-p}$, log-odds $= \\ln(\\text{odds}) = z$ tuyến tính theo $x$. Diễn giải hệ số qua **odds ratio** $e^{\\beta_1}$.
- Biết **vì sao không dùng least squares** mà dùng **maximum likelihood (MLE)** / **cross-entropy loss**, và mối liên hệ với **gradient descent**.
- Tìm **ranh giới quyết định (decision boundary)** tại $p = 0.5 \\Leftrightarrow z = 0$.
- Đánh giá phân loại bằng **confusion matrix**, **accuracy / precision / recall**, hiểu vai trò của **ngưỡng (threshold)** và **đường ROC**.
- Nhìn logistic regression như **1 neuron + sigmoid** — viên gạch nền của neural network.

## Kiến thức tiền đề

- [Lesson 08: Hồi quy tuyến tính](../lesson-08-linear-regression/) — đường thẳng $\\hat{y} = \\beta_0 + \\beta_1 x$, least squares, $R^2$.
- [Lesson 09: Hồi quy bội](../lesson-09-multiple-regression/) — nhiều biến độc lập, diễn giải hệ số.
- [Lesson 05 Tầng 1: Tương quan 2 biến](../../01-Descriptive/lesson-05-bivariate-correlation/README.md) — scatter plot, quan hệ X–Y.
- Hàm mũ $e^x$ và logarit tự nhiên $\\ln$ (xem [Algebra](../../../Algebra/) nếu cần ôn).

---

## 1. Mở đầu: dự đoán "CÓ hay KHÔNG", không phải "bao nhiêu"

Hồi quy tuyến tính (Lesson 08) trả lời câu hỏi *"bao nhiêu?"* — dự đoán một con số liên tục: giá nhà, doanh thu, cân nặng. Nhưng rất nhiều bài toán thực tế lại là câu hỏi **CÓ / KHÔNG**:

- Email này có phải **spam** không? (1 = spam, 0 = không)
- Khách hàng này có **rời bỏ** (churn) không?
- Khối u này **lành tính** hay **ác tính**?
- Sinh viên này **đậu** hay **rớt** kỳ thi?

Biến cần dự đoán $y$ chỉ nhận **2 giá trị**: $0$ hoặc $1$. Đây gọi là **biến nhị phân (binary variable)**, và bài toán gọi là **phân loại nhị phân (binary classification)**.

> 💡 **Trực giác**: Ta không muốn dự đoán cứng "0 hay 1" ngay. Ta muốn dự đoán **xác suất** $p = P(y = 1 \\mid x)$ — *"khả năng email này là spam là 87%"*. Có xác suất rồi mới quyết định: $p \\geq 0.5 \\to$ gọi là spam.

### 1.1. Câu hỏi mở bài: số giờ học → xác suất đậu

Ta có dữ liệu 8 sinh viên: số giờ học $x$ và kết quả $y$ (1 = đậu, 0 = rớt):

| Giờ học $x$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|------|---|---|---|---|---|---|---|---|
| Đậu $y$ | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 1 |

Câu hỏi: **biết một sinh viên học 4.5 giờ, xác suất đậu là bao nhiêu?**

Phản xạ đầu tiên: kẻ một đường thẳng (linear regression) $\\hat{y} = \\beta_0 + \\beta_1 x$ qua các điểm này. Nhưng làm vậy hỏng ngay — xem mục 1.2.

### 1.2. Vì sao đường thẳng KHÔNG hợp

Nếu fit đường thẳng vào dữ liệu 0/1 ở trên (least squares), ta được khoảng $\\hat{y} = -0.1 + 0.17x$. Thử thay vài giá trị:

| $x$ | $\\hat{y} = -0.1 + 0.17x$ | Diễn giải như xác suất? |
|----|------|------|
| $x = 1$ | $0.07$ | tạm ổn |
| $x = 4.5$ | $0.665$ | ổn |
| $x = 8$ | $1.26$ | **xác suất 126%?!** vô lý |
| $x = -2$ | $-0.44$ | **xác suất âm?!** vô lý |

Đường thẳng có miền giá trị $(-\\infty, +\\infty)$ — không có gì chặn nó nằm trong $[0, 1]$. Khi $x$ đủ lớn hoặc đủ nhỏ, dự đoán **vọt ra ngoài** khoảng xác suất hợp lệ.

> ⚠ **Lỗi thường gặp**: Dùng linear regression cho biến 0/1 rồi diễn giải output là xác suất. Ngoài chuyện vọt khỏi $[0,1]$, đường thẳng còn giả định *mỗi giờ học thêm tăng xác suất một lượng cố định* — nhưng từ 90% lên 100% phải khó hơn nhiều so với 50% lên 60%. Quan hệ thật có dạng **chữ S**, không phải đường thẳng.

Ta cần một hàm: nhận đầu vào là số thực bất kỳ $z \\in (-\\infty, +\\infty)$, **bóp** nó về $(0, 1)$, và có dạng chữ S. Đó chính là **sigmoid**.

> 📝 **Tóm tắt mục 1**:
> - Phân loại nhị phân dự đoán $y \\in \\{0, 1\\}$ qua xác suất $p = P(y=1 \\mid x)$.
> - Đường thẳng không hợp: cho giá trị ngoài $[0,1]$, và giả định tăng tuyến tính phi thực tế.
> - Cần một hàm "bóp" số thực về $(0,1)$ dạng chữ S → sigmoid.

---

## 2. Hàm sigmoid — trái tim của logistic regression

### 2.1. Định nghĩa

**(a) Là gì**: Sigmoid (còn gọi *logistic function*) là hàm

$$\\sigma(z) = \\dfrac{1}{1 + e^{-z}}$$

nhận một số thực $z$ bất kỳ và trả về một số trong khoảng $(0, 1)$ — ta diễn giải nó là **xác suất**.

**(b) Vì sao cần**: Ta muốn nối "phần tuyến tính" $z = \\beta_0 + \\beta_1 x$ (miền $-\\infty$ đến $+\\infty$) với "xác suất" (miền $0$ đến $1$). Sigmoid là cây cầu: $\\sigma(\\text{số thực bất kỳ}) \\in (0,1)$ luôn luôn. Mô hình đầy đủ:

$$p = P(y = 1 \\mid x) = \\sigma(\\beta_0 + \\beta_1 x) = \\dfrac{1}{1 + e^{-(\\beta_0 + \\beta_1 x)}}$$

**(c) Ví dụ trực giác**: $z$ là "điểm số tổng hợp ủng hộ lớp 1". $z$ rất dương ($z = 5$) → gần như chắc chắn là lớp 1 ($\\sigma \\approx 0.99$). $z$ rất âm ($z = -5$) → gần như chắc chắn lớp 0 ($\\sigma \\approx 0.007$). $z = 0$ → hoàn toàn lưỡng lự ($\\sigma = 0.5$).

### 2.2. Tính chất

1. **Miền giá trị $(0, 1)$**: tử số $1 > 0$, mẫu $1 + e^{-z} > 1 > 0$ → $\\sigma \\in (0, 1)$ với mọi $z$. Không bao giờ chạm đúng $0$ hay $1$.
2. **Dạng chữ S** (S-shape): tăng đơn điệu, dốc nhất ở giữa ($z = 0$), bão hoà phẳng ở hai đầu.
3. **Điểm giữa**: $\\sigma(0) = \\dfrac{1}{1+1} = 0.5$.
4. **Đối xứng**: $\\sigma(-z) = 1 - \\sigma(z)$. Vd $\\sigma(-2) = 1 - \\sigma(2)$.
5. **Đạo hàm gọn**: $\\sigma'(z) = \\sigma(z)\\,(1 - \\sigma(z))$ — rất tiện cho gradient descent (mục 4).

### 2.3. Walk-through số — 4 ví dụ tính $\\sigma(z)$

Nhớ $e \\approx 2.71828$.

**Ví dụ 1: $z = 0$**
$$\\sigma(0) = \\dfrac{1}{1 + e^{0}} = \\dfrac{1}{1 + 1} = \\dfrac{1}{2} = \\mathbf{0.500}$$

**Ví dụ 2: $z = 2$**
$$e^{-2} \\approx 0.1353,\\quad \\sigma(2) = \\dfrac{1}{1 + 0.1353} = \\dfrac{1}{1.1353} \\approx \\mathbf{0.881}$$

**Ví dụ 3: $z = -1$**
$$e^{-(-1)} = e^{1} \\approx 2.7183,\\quad \\sigma(-1) = \\dfrac{1}{1 + 2.7183} = \\dfrac{1}{3.7183} \\approx \\mathbf{0.269}$$

Kiểm tra đối xứng: $\\sigma(1) = \\dfrac{1}{1 + e^{-1}} = \\dfrac{1}{1 + 0.3679} \\approx 0.731$, và $1 - 0.731 = 0.269 = \\sigma(-1)$ ✓

**Ví dụ 4: $z = 4$**
$$e^{-4} \\approx 0.0183,\\quad \\sigma(4) = \\dfrac{1}{1 + 0.0183} \\approx \\mathbf{0.982}$$

Càng $z$ lớn, $\\sigma$ càng gần $1$ nhưng **không bao giờ bằng** $1$ (bão hoà).

### 2.4. Quay lại câu hỏi mở bài

Giả sử fit logistic cho dữ liệu giờ học ở mục 1.1 ra $\\beta_0 = -3.0$, $\\beta_1 = 0.8$. Sinh viên học $x = 4.5$ giờ:

$$z = -3.0 + 0.8 \\times 4.5 = -3.0 + 3.6 = 0.6$$
$$p = \\sigma(0.6) = \\dfrac{1}{1 + e^{-0.6}} = \\dfrac{1}{1 + 0.5488} \\approx \\mathbf{0.646}$$

→ Xác suất đậu **≈ 64.6%**. Vì $0.646 \\geq 0.5$ nên dự đoán: **đậu**. Không còn cảnh "xác suất 126%".

> ❓ **Câu hỏi tự nhiên**:
> - *"Vì sao là $e$ chứ không phải số khác?"* → $e$ làm đạo hàm đẹp ($\\sigma' = \\sigma(1-\\sigma)$) và khớp với log-odds tuyến tính (mục 3). Đổi cơ số chỉ co giãn trục $z$, không đổi bản chất.
> - *"Sigmoid có chạm 0 hoặc 1 không?"* → Không bao giờ. Nó tiệm cận. Nên xác suất dự đoán luôn nằm strictly trong $(0,1)$ — tốt, vì "chắc chắn 100%" hiếm khi đúng.
> - *"$\\beta_0, \\beta_1$ ở đâu ra?"* → Từ MLE (mục 4), không phải least squares.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Tính $\\sigma(-3)$ (làm tròn 3 chữ số).
> <details><summary>Đáp án</summary>
>
> $e^{3} \\approx 20.09$. $\\sigma(-3) = \\dfrac{1}{1 + 20.09} = \\dfrac{1}{21.09} \\approx \\mathbf{0.047}$.
> </details>
>
> 2. Với $\\beta_0 = -3, \\beta_1 = 0.8$, sinh viên học $x = 6$ giờ có xác suất đậu bao nhiêu?
> <details><summary>Đáp án</summary>
>
> $z = -3 + 0.8 \\times 6 = 1.8$. $\\sigma(1.8) = \\dfrac{1}{1 + e^{-1.8}} = \\dfrac{1}{1 + 0.1653} \\approx \\mathbf{0.858}$ → ≈ 85.8%, dự đoán đậu.
> </details>

> 📝 **Tóm tắt mục 2**:
> - $\\sigma(z) = \\frac{1}{1+e^{-z}}$ bóp mọi số thực về $(0,1)$, dạng chữ S.
> - $\\sigma(0) = 0.5$; đối xứng $\\sigma(-z) = 1 - \\sigma(z)$; đạo hàm $\\sigma' = \\sigma(1-\\sigma)$.
> - Mô hình: $p = \\sigma(\\beta_0 + \\beta_1 x)$.

---

## 3. Odds, log-odds (logit) và diễn giải hệ số

Sigmoid đẹp nhưng hệ số $\\beta_1$ khó diễn giải trực tiếp (vì $p$ thay đổi **phi tuyến** theo $x$). Cách nói chuẩn của logistic regression là qua **odds** và **log-odds**.

### 3.1. Odds — "tỉ lệ cược"

**(a) Là gì**: Odds là **tỉ lệ giữa xác suất xảy ra và không xảy ra**:

$$\\text{odds} = \\dfrac{p}{1 - p}$$

**(b) Vì sao cần**: Xác suất bị kẹt trong $[0,1]$. Odds "duỗi" nó ra $[0, +\\infty)$, và log-odds (mục 3.2) duỗi tiếp ra $(-\\infty, +\\infty)$ — đúng miền của phần tuyến tính $z$. Odds cũng là ngôn ngữ cá cược tự nhiên: *"cửa này ăn 3 ăn 1"*.

**(c) Ví dụ trực giác**: $p = 0.75$ (75% đậu) → odds $= \\dfrac{0.75}{0.25} = 3$, đọc là *"3 ăn 1"* (cứ 3 lần đậu thì 1 lần rớt). $p = 0.5$ → odds $= 1$ (hoà). $p = 0.9$ → odds $= 9$.

**4 ví dụ số:**

| $p$ | odds $= p/(1-p)$ | Diễn giải |
|-----|------|-----------|
| $0.5$ | $0.5/0.5 = \\mathbf{1}$ | hoà, 1 ăn 1 |
| $0.8$ | $0.8/0.2 = \\mathbf{4}$ | 4 ăn 1 |
| $0.25$ | $0.25/0.75 = \\mathbf{0.333}$ | 1 ăn 3 (thua nhiều) |
| $0.9$ | $0.9/0.1 = \\mathbf{9}$ | 9 ăn 1 |

### 3.2. Log-odds (logit) — đại lượng tuyến tính

**(a) Là gì**: Log-odds (hay **logit**) là logarit tự nhiên của odds:

$$\\text{logit}(p) = \\ln\\!\\left(\\dfrac{p}{1-p}\\right)$$

**(b) Vì sao cần**: Đây là điều **kỳ diệu** của logistic regression. Thay $p = \\sigma(z)$ vào, ta chứng minh được:

$$\\ln\\!\\left(\\dfrac{p}{1-p}\\right) = z = \\beta_0 + \\beta_1 x$$

Nghĩa là: **log-odds tuyến tính theo $x$**, dù $p$ thì không. Logistic regression thực chất là *hồi quy tuyến tính trên thang log-odds*.

**Chứng minh (từng bước)**: với $p = \\dfrac{1}{1 + e^{-z}}$:

$$1 - p = 1 - \\dfrac{1}{1 + e^{-z}} = \\dfrac{(1 + e^{-z}) - 1}{1 + e^{-z}} = \\dfrac{e^{-z}}{1 + e^{-z}}$$

$$\\dfrac{p}{1-p} = \\dfrac{\\;\\frac{1}{1+e^{-z}}\\;}{\\;\\frac{e^{-z}}{1+e^{-z}}\\;} = \\dfrac{1}{e^{-z}} = e^{z}$$

$$\\ln\\!\\left(\\dfrac{p}{1-p}\\right) = \\ln(e^{z}) = z = \\beta_0 + \\beta_1 x \\quad\\blacksquare$$

**(c) Ví dụ trực giác**: $p = 0.5 \\to$ odds $= 1 \\to$ logit $= \\ln 1 = 0$. Đúng là điểm $z = 0$. $p > 0.5 \\to$ logit dương; $p < 0.5 \\to$ logit âm.

**4 ví dụ số (logit):**

| $p$ | odds | logit $= \\ln(\\text{odds})$ |
|-----|------|------|
| $0.5$ | $1$ | $\\ln 1 = \\mathbf{0}$ |
| $0.731$ | $2.718$ | $\\ln(2.718) \\approx \\mathbf{1.0}$ |
| $0.269$ | $0.368$ | $\\ln(0.368) \\approx \\mathbf{-1.0}$ |
| $0.88$ | $7.33$ | $\\ln(7.33) \\approx \\mathbf{1.99}$ |

(Đối chiếu: ở mục 2.3, $\\sigma(1) = 0.731$ và $\\sigma(2) = 0.881$ — logit "trả ngược" đúng $z$ ban đầu.)

### 3.3. Diễn giải hệ số: $e^{\\beta_1}$ là odds ratio

Vì log-odds $= \\beta_0 + \\beta_1 x$, khi $x$ tăng **1 đơn vị**, log-odds tăng đúng $\\beta_1$. Trên thang odds (lấy $e^{\\cdot}$ hai vế):

$$\\dfrac{\\text{odds}(x+1)}{\\text{odds}(x)} = \\dfrac{e^{\\beta_0 + \\beta_1(x+1)}}{e^{\\beta_0 + \\beta_1 x}} = e^{\\beta_1}$$

→ $e^{\\beta_1}$ gọi là **odds ratio (OR)**: *"mỗi khi $x$ tăng 1 đơn vị, odds nhân lên $e^{\\beta_1}$ lần"*.

**Walk-through số**: với $\\beta_1 = 0.8$ (mô hình giờ học):

$$e^{0.8} \\approx 2.2255$$

→ *"Mỗi giờ học thêm, odds đậu nhân lên ≈ 2.23 lần"* (tăng ~123%). Cụ thể:

- Học $x = 4$ giờ: $z = -3 + 0.8(4) = 0.2$, $p = \\sigma(0.2) = 0.550$, odds $= \\frac{0.550}{0.450} = 1.221$.
- Học $x = 5$ giờ: $z = -3 + 0.8(5) = 1.0$, $p = \\sigma(1.0) = 0.731$, odds $= \\frac{0.731}{0.269} = 2.718$.
- Kiểm tra: $\\dfrac{2.718}{1.221} = 2.226 \\approx e^{0.8}$ ✓

> ⚠ **Lỗi thường gặp — log-odds tuyến tính chứ $p$ KHÔNG tuyến tính**:
> Nhiều người nói *"mỗi giờ học tăng xác suất đậu thêm $\\beta_1$"*. **SAI.** Cái tuyến tính là **log-odds**, không phải $p$. Từ $p = 0.5$ lên $p = 0.6$ (giữa đường) tốn ít $z$ hơn nhiều so với từ $p = 0.9$ lên $p = 0.99$ (vùng bão hoà). Cùng "+1 giờ học" cho mức tăng $p$ **khác nhau** tùy đang ở đâu trên đường cong S.
>
> | Đi từ giờ → giờ | $p$ trước | $p$ sau | Δp |
> |---|---|---|---|
> | $4 \\to 5$ | 0.550 | 0.731 | **+0.181** |
> | $6 \\to 7$ | 0.858 | 0.924 | **+0.066** |
>
> Cùng +1 giờ, nhưng mức tăng xác suất nhỏ dần khi đã cao — vì đường cong phẳng dần. Chỉ có *odds ratio* mới không đổi (×2.23 mỗi giờ).

> ❓ **Câu hỏi tự nhiên**:
> - *"$e^{\\beta_1} = 1$ nghĩa là gì?"* → $\\beta_1 = 0$ → OR = 1 → $x$ **không ảnh hưởng** odds (biến vô dụng).
> - *"$\\beta_1 < 0$?"* → OR $< 1$ → $x$ tăng làm odds (và xác suất) **giảm**. Vd $\\beta_1 = -0.5 \\to e^{-0.5} = 0.607$: mỗi đơn vị $x$, odds còn 60.7%.
> - *"OR khác xác suất tương đối (relative risk) chứ?"* → Đúng, hai khái niệm khác nhau. Logistic cho OR; với biến cố hiếm thì OR ≈ relative risk.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Một mô hình có $\\beta_1 = 1.1$. Diễn giải odds ratio.
> <details><summary>Đáp án</summary>
>
> $e^{1.1} \\approx 3.0$. Mỗi đơn vị $x$ tăng, odds nhân ≈ 3 lần.
> </details>
>
> 2. $p = 0.8$. Tính odds và logit.
> <details><summary>Đáp án</summary>
>
> odds $= 0.8/0.2 = 4$. logit $= \\ln 4 \\approx \\mathbf{1.386}$.
> </details>

> 📝 **Tóm tắt mục 3**:
> - odds $= p/(1-p) \\in [0, \\infty)$; logit $= \\ln(\\text{odds}) = z = \\beta_0 + \\beta_1 x$ (tuyến tính theo $x$).
> - $e^{\\beta_1}$ = odds ratio: $x$ +1 đơn vị → odds ×$e^{\\beta_1}$.
> - $p$ **không** tuyến tính theo $x$ — đừng diễn giải $\\beta_1$ như "mức tăng xác suất".

---

## 4. Vì sao không least squares → maximum likelihood / cross-entropy

### 4.1. Least squares hỏng ở đâu

Linear regression chọn $\\beta$ để cực tiểu **tổng bình phương sai số** $\\sum (y_i - \\hat{y}_i)^2$. Với logistic, dùng least squares trên $\\sigma$ gặp 2 vấn đề:

1. **Hàm mất mát không lồi (non-convex)**: ghép bình phương với sigmoid tạo bề mặt nhiều "thung lũng giả" (local minima) → gradient descent dễ kẹt, không tìm được nghiệm tốt nhất.
2. **Sai mô hình xác suất**: $y$ là biến nhị phân (phân phối Bernoulli), không phải nhiễu Gaussian như giả định của least squares. Cần một tiêu chí khớp với bản chất 0/1.

### 4.2. Maximum likelihood (MLE) — trực giác

> 💡 **Trực giác**: MLE hỏi *"bộ $\\beta$ nào làm cho dữ liệu mình ĐÃ THẤY trở nên dễ xảy ra nhất?"*. Nếu mô hình gán $p_i$ cao cho những điểm thực sự $y_i = 1$, và $p_i$ thấp cho những điểm $y_i = 0$, thì nó "giải thích" dữ liệu tốt.

Với mỗi điểm, xác suất mô hình gán cho **nhãn đúng** là:
- Nếu $y_i = 1$: gán $p_i$.
- Nếu $y_i = 0$: gán $1 - p_i$.

Gộp gọn thành một công thức: $p_i^{\\,y_i} (1 - p_i)^{\\,1 - y_i}$ (số mũ tự "bật/tắt" đúng vế). **Likelihood** của toàn bộ dữ liệu là tích:

$$L(\\beta) = \\prod_{i=1}^{n} p_i^{\\,y_i}\\,(1 - p_i)^{\\,1 - y_i}$$

### 4.3. Cross-entropy loss = − log-likelihood

Tích của nhiều số nhỏ rất khó tối ưu → lấy $\\ln$ (biến tích thành tổng) và đổi dấu để thành bài toán **cực tiểu**:

$$\\text{Loss} = -\\dfrac{1}{n}\\sum_{i=1}^{n}\\Big[\\, y_i \\ln(p_i) + (1 - y_i)\\ln(1 - p_i)\\,\\Big]$$

Đây chính là **cross-entropy loss** (còn gọi *log loss*) — hàm mất mát chuẩn của phân loại trong machine learning. Nó **lồi** (convex) cho logistic → gradient descent tìm được nghiệm toàn cục.

**Walk-through số 1 điểm**: điểm thật $y = 1$, mô hình dự đoán $p = 0.9$ (tốt):
$$\\text{loss} = -[1 \\cdot \\ln 0.9 + 0] = -\\ln 0.9 \\approx \\mathbf{0.105}\\;(\\text{nhỏ — thưởng})$$

Cùng điểm $y = 1$ nhưng mô hình dự đoán sai $p = 0.1$ (tệ):
$$\\text{loss} = -\\ln 0.1 \\approx \\mathbf{2.303}\\;(\\text{lớn — phạt nặng})$$

→ Cross-entropy **phạt rất nặng** khi mô hình tự tin nhưng sai ($p \\to 0$ trong khi $y = 1$ → loss $\\to \\infty$). Đó là lý do nó dạy mô hình rất hiệu quả.

### 4.4. Gradient descent — cách tìm $\\beta$

Không có công thức đóng (closed-form) như least squares. Ta **lặp**: bắt đầu $\\beta$ ngẫu nhiên, tính gradient của loss, bước ngược chiều gradient, lặp đến hội tụ. Nhờ $\\sigma' = \\sigma(1-\\sigma)$, gradient có dạng **cực gọn**:

$$\\dfrac{\\partial \\text{Loss}}{\\partial \\beta_j} = \\dfrac{1}{n}\\sum_{i} (p_i - y_i)\\,x_{ij}$$

(sai số $p_i - y_i$ nhân với feature — y hệt linear regression, chỉ khác $p_i$ qua sigmoid). Chi tiết gradient descent và cross-entropy học sâu ở [AI-ML](../../../AI-ML/).

> ❓ **Câu hỏi tự nhiên**:
> - *"Vì sao đổi tích → tổng bằng log?"* → Tích hàng nghìn số $< 1$ làm tràn số (underflow) về 0; log biến thành tổng, ổn định và dễ lấy đạo hàm.
> - *"MLE và cross-entropy là hai thứ khác nhau?"* → Cùng một thứ. Cực đại likelihood ⇔ cực tiểu (−log-likelihood) = cross-entropy.
> - *"Có cần tự code gradient descent không?"* → Trong thực tế dùng \`sklearn.LogisticRegression\` (Python) hoặc thư viện sẵn; chúng tự lo tối ưu.

> 📝 **Tóm tắt mục 4**:
> - Không dùng least squares (non-convex + sai mô hình Bernoulli).
> - MLE: chọn $\\beta$ làm dữ liệu đã thấy dễ xảy ra nhất.
> - Cross-entropy loss = −log-likelihood, lồi, phạt nặng dự đoán tự tin-nhưng-sai.
> - Tối ưu bằng gradient descent (không có nghiệm đóng).

---

## 5. Ranh giới quyết định (decision boundary)

### 5.1. Định nghĩa

**(a) Là gì**: Ranh giới quyết định là **ngưỡng trên $x$** mà tại đó mô hình chuyển từ dự đoán lớp 0 sang lớp 1. Với ngưỡng xác suất mặc định $0.5$:

$$\\text{Dự đoán 1} \\iff p \\geq 0.5 \\iff \\sigma(z) \\geq 0.5 \\iff z \\geq 0 \\iff \\beta_0 + \\beta_1 x \\geq 0$$

**(b) Vì sao cần**: $p$ là xác suất liên tục, nhưng cuối cùng phải ra quyết định **rời rạc** "0 hay 1". Ranh giới là chỗ cắt.

**(c) Ví dụ trực giác**: Với mô hình giờ học $z = -3 + 0.8x$, ranh giới là $z = 0$:

$$-3 + 0.8x = 0 \\implies x = \\dfrac{3}{0.8} = \\mathbf{3.75}\\text{ giờ}$$

→ Học **≥ 3.75 giờ** → dự đoán đậu; **< 3.75 giờ** → dự đoán rớt.

### 5.2. Walk-through — 4 ví dụ tìm ranh giới ($p = 0.5 \\Leftrightarrow z = 0$)

Công thức tổng quát: ranh giới tại $x^* = -\\dfrac{\\beta_0}{\\beta_1}$.

| $\\beta_0$ | $\\beta_1$ | Ranh giới $x^* = -\\beta_0/\\beta_1$ | Quy tắc |
|------|------|------|------|
| $-3$ | $0.8$ | $-(-3)/0.8 = \\mathbf{3.75}$ | $x \\geq 3.75 \\to 1$ |
| $-6$ | $2$ | $-(-6)/2 = \\mathbf{3.0}$ | $x \\geq 3.0 \\to 1$ |
| $2$ | $-0.5$ | $-(2)/(-0.5) = \\mathbf{4.0}$ | $x \\geq 4.0 \\to 0$ (vì $\\beta_1<0$, dốc xuống) |
| $0$ | $1$ | $-(0)/1 = \\mathbf{0}$ | $x \\geq 0 \\to 1$ |

(Lưu ý ví dụ 3: $\\beta_1 < 0$ nên xác suất **giảm** theo $x$ — chiều quyết định đảo lại.)

> ❓ **Câu hỏi tự nhiên**:
> - *"Vì sao $p = 0.5$ tương đương $z = 0$?"* → Vì $\\sigma(0) = 0.5$ và sigmoid tăng đơn điệu: $p \\geq 0.5 \\Leftrightarrow z \\geq 0$.
> - *"Ngưỡng 0.5 có bắt buộc không?"* → Không! Nếu đổi ngưỡng (vd 0.3), ranh giới $x$ dịch theo. Xem mục 6 — ngưỡng là một lựa chọn, không cố định.
> - *"Với nhiều biến thì ranh giới là gì?"* → Là một **siêu phẳng (hyperplane)** $\\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\dots = 0$ — đường thẳng (2 biến), mặt phẳng (3 biến), v.v.

> 🔁 **Dừng lại tự kiểm tra**: Mô hình $z = -4 + x$. Ranh giới ở đâu? Sinh viên $x = 4.5$ dự đoán lớp nào?
> <details><summary>Đáp án</summary>
>
> Ranh giới: $x^* = -(-4)/1 = 4$. Với $x = 4.5 > 4 \\to z = 0.5 > 0 \\to p > 0.5 \\to$ **lớp 1**.
> </details>

> 📝 **Tóm tắt mục 5**: Ranh giới ở $z = 0$ (tức $p = 0.5$), $x^* = -\\beta_0/\\beta_1$. Nhiều biến → siêu phẳng tuyến tính.

---

## 6. Đánh giá phân loại: confusion matrix, accuracy / precision / recall, ngưỡng, ROC

Có dự đoán rồi, làm sao biết mô hình **tốt** không? Accuracy đơn thuần thường gây hiểu lầm.

### 6.1. Confusion matrix

So nhãn thật với nhãn dự đoán cho ra 4 ô:

| | Dự đoán 1 (Positive) | Dự đoán 0 (Negative) |
|---|---|---|
| **Thật 1** | **TP** (true positive) | **FN** (false negative — bỏ sót) |
| **Thật 0** | **FP** (false positive — báo động giả) | **TN** (true negative) |

### 6.2. Các chỉ số

**(a) Accuracy** — tỉ lệ đoán đúng tổng thể:
$$\\text{Accuracy} = \\dfrac{TP + TN}{TP + TN + FP + FN}$$

**(b) Precision** — *"trong những cái mình báo là 1, bao nhiêu thật sự là 1?"*:
$$\\text{Precision} = \\dfrac{TP}{TP + FP}$$

**(c) Recall (sensitivity)** — *"trong những cái thật sự là 1, mình bắt được bao nhiêu?"*:
$$\\text{Recall} = \\dfrac{TP}{TP + FN}$$

**Walk-through số**: 100 email, 20 thật là spam. Mô hình báo 18 spam, trong đó 15 đúng (TP=15), 3 sai (FP=3); bỏ sót 5 spam (FN=5); còn lại TN = 77.

$$\\text{Accuracy} = \\dfrac{15 + 77}{100} = \\mathbf{0.92}$$
$$\\text{Precision} = \\dfrac{15}{15 + 3} = \\dfrac{15}{18} \\approx \\mathbf{0.833}$$
$$\\text{Recall} = \\dfrac{15}{15 + 5} = \\dfrac{15}{20} = \\mathbf{0.75}$$

Diễn giải: 83.3% email bị gắn cờ spam thật sự là spam; nhưng chỉ bắt được 75% spam thực tế (sót 25%).

### 6.3. Ngưỡng (threshold) và đánh đổi precision–recall

Đổi ngưỡng quyết định (mặc định 0.5) thay đổi precision và recall theo chiều **ngược nhau**:

- **Ngưỡng cao** (vd 0.9): chỉ báo "1" khi rất chắc → **precision ↑, recall ↓** (ít báo động giả nhưng sót nhiều).
- **Ngưỡng thấp** (vd 0.2): báo "1" dễ dãi → **recall ↑, precision ↓** (bắt được nhiều nhưng nhiều báo động giả).

Chọn ngưỡng tùy bài toán: chẩn đoán ung thư cần **recall cao** (thà báo nhầm còn hơn bỏ sót); lọc spam vào hộp quan trọng cần **precision cao** (thà để lọt vài spam còn hơn xoá nhầm email thật).

### 6.4. Đường ROC sơ lược

Quét **mọi ngưỡng** từ 0 đến 1, mỗi ngưỡng cho một cặp:
- **TPR** (true positive rate) = recall = $\\frac{TP}{TP+FN}$,
- **FPR** (false positive rate) = $\\frac{FP}{FP+TN}$.

Vẽ TPR theo FPR → **đường ROC**. Diện tích dưới đường (**AUC**) đo chất lượng tổng thể, không phụ thuộc một ngưỡng cụ thể:
- AUC $= 1.0$: hoàn hảo. AUC $= 0.5$: đoán bừa (đường chéo). AUC $> 0.8$: tốt.

> ⚠ **Lỗi thường gặp — accuracy gây hiểu lầm khi mất cân bằng lớp (class imbalance)**:
> Giả sử 1000 giao dịch, chỉ **10** là gian lận (1%). Một mô hình ngu ngốc **luôn đoán "không gian lận"** đạt accuracy = $\\frac{990}{1000} = \\mathbf{99\\%}$ — nghe rất cao! Nhưng recall của lớp gian lận $= \\frac{0}{10} = \\mathbf{0}$: nó **bỏ sót 100%** gian lận. Accuracy che giấu hoàn toàn sự vô dụng này.
> → Với dữ liệu mất cân bằng, **luôn xem precision/recall (hoặc F1, AUC) cho lớp hiếm**, đừng tin mỗi accuracy.

> ❓ **Câu hỏi tự nhiên**:
> - *"F1 score là gì?"* → Trung bình điều hoà của precision và recall: $F_1 = 2 \\cdot \\frac{P \\cdot R}{P + R}$. Cân bằng cả hai trong 1 con số.
> - *"Khi nào ưu tiên precision vs recall?"* → Recall khi bỏ sót đắt (bệnh, gian lận); precision khi báo động giả đắt (chặn nhầm tài khoản, xoá nhầm email).

> 📝 **Tóm tắt mục 6**:
> - Confusion matrix (TP/FP/FN/TN) là gốc của mọi chỉ số.
> - Precision = đúng trong số báo dương; recall = bắt được trong số dương thật.
> - Ngưỡng đánh đổi precision ↔ recall; ROC/AUC tổng hợp mọi ngưỡng.
> - Accuracy lừa khi lớp mất cân bằng — luôn xem precision/recall cho lớp hiếm.

---

## 7. Logistic regression = 1 neuron + sigmoid (nền tảng neural network)

> 💡 **Trực giác**: Một **neuron** nhân tạo làm đúng 2 việc: (1) tính tổng có trọng số các đầu vào $z = w_1 x_1 + w_2 x_2 + \\dots + b$ — chính là phần tuyến tính $\\beta_0 + \\beta_1 x$; (2) cho qua một **hàm kích hoạt (activation)** — nếu activation là sigmoid thì... đó **chính xác là logistic regression**.

Đối chiếu thuật ngữ:

| Logistic regression | Neural network |
|---|---|
| hệ số $\\beta_1, \\beta_2, \\dots$ | trọng số (weights) $w_1, w_2, \\dots$ |
| hệ số chặn $\\beta_0$ | bias $b$ |
| $z = \\beta_0 + \\sum \\beta_j x_j$ | weighted sum (pre-activation) |
| sigmoid $\\sigma(z)$ | activation function |
| cross-entropy loss | loss function |
| MLE / gradient descent | training / backpropagation |

→ **Logistic regression là một neural network có đúng 1 neuron, 0 lớp ẩn.** Xếp chồng nhiều neuron thành lớp, chồng nhiều lớp → mạng nơ-ron sâu (deep network) học được ranh giới **phi tuyến** phức tạp. Học sâu chủ đề này ở [AI-ML](../../../AI-ML/) (neuron, cross-entropy, gradient descent, backpropagation).

> 📝 **Tóm tắt mục 7**: Logistic regression = 1 neuron + sigmoid + cross-entropy. Nó là viên gạch nền của mọi neural network.

---

## Bài tập

1. **Tính sigmoid**: Với $z \\in \\{-2,\\ 0.5,\\ 3,\\ -0.7\\}$, tính $\\sigma(z)$ (làm tròn 3 chữ số). Cái nào dự đoán lớp 1 (ngưỡng 0.5)?

2. **Odds & logit**: Cho $p = 0.6$. Tính odds và logit. Sau đó từ logit $= 1.5$, đi ngược lại tìm $p$.

3. **Odds ratio**: Mô hình logistic dự đoán churn có $\\beta_1 = -0.4$ cho biến "số năm gắn bó". Tính và diễn giải odds ratio. Mỗi năm gắn bó thêm thì odds churn thay đổi thế nào?

4. **Ranh giới quyết định**: Mô hình $z = -5 + 1.25 x$ (x = giờ học). (a) Tìm ranh giới $x^*$. (b) Sinh viên học 4 giờ dự đoán lớp nào? Tính $p$.

5. **Confusion matrix**: Một bộ phân loại bệnh: TP = 40, FP = 10, FN = 20, TN = 130. Tính accuracy, precision, recall. Bài toán chẩn đoán bệnh nên ưu tiên chỉ số nào? Vì sao?

6. **Class imbalance**: 10 000 giao dịch, 50 là gian lận. Mô hình "luôn đoán hợp lệ". Tính accuracy và recall (cho lớp gian lận). Giải thích vì sao accuracy ở đây vô dụng.

---

## Lời giải chi tiết

### Bài 1

$\\sigma(z) = \\frac{1}{1+e^{-z}}$:

- $z = -2$: $e^{2} \\approx 7.389$, $\\sigma = \\frac{1}{1+7.389} = \\frac{1}{8.389} \\approx \\mathbf{0.119}$ → lớp **0**.
- $z = 0.5$: $e^{-0.5} \\approx 0.6065$, $\\sigma = \\frac{1}{1.6065} \\approx \\mathbf{0.622}$ → lớp **1**.
- $z = 3$: $e^{-3} \\approx 0.0498$, $\\sigma = \\frac{1}{1.0498} \\approx \\mathbf{0.953}$ → lớp **1**.
- $z = -0.7$: $e^{0.7} \\approx 2.0138$, $\\sigma = \\frac{1}{3.0138} \\approx \\mathbf{0.332}$ → lớp **0**.

Dự đoán lớp 1: $z = 0.5$ và $z = 3$ (cả hai có $\\sigma \\geq 0.5 \\Leftrightarrow z \\geq 0$).

### Bài 2

odds $= \\frac{0.6}{0.4} = \\mathbf{1.5}$. logit $= \\ln(1.5) \\approx \\mathbf{0.405}$.

Đi ngược từ logit $= 1.5$: odds $= e^{1.5} \\approx 4.4817$. $p = \\frac{\\text{odds}}{1+\\text{odds}} = \\frac{4.4817}{5.4817} \\approx \\mathbf{0.818}$.

(Hoặc trực tiếp $p = \\sigma(1.5) = \\frac{1}{1+e^{-1.5}} = \\frac{1}{1+0.2231} \\approx 0.818$ ✓.)

### Bài 3

Odds ratio $= e^{\\beta_1} = e^{-0.4} \\approx \\mathbf{0.670}$.

Diễn giải: mỗi năm gắn bó thêm, odds churn **nhân 0.67** (giảm còn 67%, tức giảm ~33%). $\\beta_1 < 0$ → khách gắn bó lâu ít rời bỏ hơn — hợp lý.

### Bài 4

(a) Ranh giới: $z = 0 \\Rightarrow -5 + 1.25x = 0 \\Rightarrow x^* = \\frac{5}{1.25} = \\mathbf{4.0}$ giờ.

(b) $x = 4$: $z = -5 + 1.25 \\times 4 = -5 + 5 = 0$. $p = \\sigma(0) = \\mathbf{0.5}$ — đúng ngay tại ranh giới (lưỡng lự). Theo quy ước $p \\geq 0.5 \\to$ lớp **1** (sát biên).

### Bài 5

$$\\text{Accuracy} = \\frac{TP+TN}{\\text{tổng}} = \\frac{40+130}{40+10+20+130} = \\frac{170}{200} = \\mathbf{0.85}$$
$$\\text{Precision} = \\frac{TP}{TP+FP} = \\frac{40}{50} = \\mathbf{0.80}$$
$$\\text{Recall} = \\frac{TP}{TP+FN} = \\frac{40}{60} \\approx \\mathbf{0.667}$$

Chẩn đoán bệnh nên ưu tiên **recall**: bỏ sót người bệnh (FN) nguy hiểm hơn báo nhầm người khoẻ (FP, có thể xét nghiệm lại). Recall ở đây mới 66.7% → bỏ sót 1/3 ca bệnh, cần hạ ngưỡng để tăng recall.

### Bài 6

Mô hình luôn đoán "hợp lệ" → không bao giờ báo gian lận. Với 50 gian lận và 9950 hợp lệ:
- TP = 0, FP = 0, FN = 50, TN = 9950.
$$\\text{Accuracy} = \\frac{0 + 9950}{10000} = \\mathbf{0.995}\\ (99.5\\%)$$
$$\\text{Recall (gian lận)} = \\frac{TP}{TP+FN} = \\frac{0}{50} = \\mathbf{0}$$

Accuracy 99.5% nghe tuyệt vời nhưng mô hình **bắt được 0% gian lận** — hoàn toàn vô dụng đúng mục tiêu. Vì lớp gian lận quá hiếm (0.5%), accuracy bị "thống trị" bởi lớp đa số. Phải dùng recall/precision/F1/AUC cho lớp gian lận để đánh giá đúng.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác: (1) sigmoid fit lên dữ liệu nhị phân với slider $\\beta_0/\\beta_1$ và ranh giới quyết định; (2) so sánh linear vs logistic trên cùng dữ liệu 0/1; (3) confusion matrix với slider ngưỡng → accuracy/precision/recall cập nhật theo thời gian thực.

---

## Bài tiếp theo

Hoàn tất **Tầng 2 Inferential**. Bước sang [Tầng 3 — Advanced](../../03-Advanced/index.html), bắt đầu với:

→ [Lesson 01 Tầng 3: Thống kê Bayes (Bayesian Statistics)](../../03-Advanced/lesson-01-bayesian-stats/) — cập nhật niềm tin bằng dữ liệu, prior/posterior, một góc nhìn khác hẳn về suy luận.

Liên hệ mở rộng: [AI-ML](../../../AI-ML/) — logistic regression chính là 1 neuron; từ đây xây tiếp neural network với nhiều neuron, nhiều lớp, học cross-entropy bằng gradient descent / backpropagation.

## Tham khảo

- *An Introduction to Statistical Learning* (ISLR), James et al. — Chapter 4 (Classification, Logistic Regression).
- *The Elements of Statistical Learning* (ESL), Hastie et al. — Chapter 4.
- Andrew Ng, *Machine Learning* (Coursera) — logistic regression, cost function, gradient descent.
- *Pattern Recognition and Machine Learning*, Bishop — Chapter 4 (linear models for classification).
`;
