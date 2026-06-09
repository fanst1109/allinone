// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-01-sampling-clt/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01: Sampling & Central Limit Theorem

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt được **population distribution**, **data distribution (sample)**, và **sampling distribution** — ba khái niệm hay bị nhầm lẫn nhất trong thống kê suy luận.
- Tính và giải thích **standard error (SE)**: $\\text{SE} = \\dfrac{\\sigma}{\\sqrt{n}}$ — hiểu tại sao SE khác với độ lệch chuẩn (standard deviation).
- Phát biểu đúng **Định lý Giới hạn Trung tâm (Central Limit Theorem — CLT)** và biết khi nào áp dụng được.
- Mô tả bằng số cụ thể tại sao trung bình mẫu từ dữ liệu lệch (skewed) vẫn gần chuẩn khi n đủ lớn.
- Nhận ra các điều kiện CLT cần (i.i.d., n ≥ 30 rule-of-thumb) và khi nào vi phạm.

## Kiến thức tiền đề

- **Tầng 1 — Mô tả**: Lesson 02 (mean, median), Lesson 03 (variance, standard deviation, z-score) — link [\`../../../Statistics/01-Descriptive/lesson-03-dispersion/\`](../../../Statistics/01-Descriptive/lesson-03-dispersion/).
- **Phân phối xác suất**: Vectors/05-Probability Lesson 05 Normal distribution [\`../../../../Vectors/05-Probability/lesson-05-normal-distribution/\`](../../../../Vectors/05-Probability/lesson-05-normal-distribution/) — CLT nói rằng phân phối mẫu trung bình tiến về phân phối Normal.
- **Xác suất cơ bản**: Vectors/05-Probability Lesson 01–03 — nắm khái niệm E[X], Var(X).

---

## 1. Tại sao cần sampling? Bài toán mở đầu

> 💡 **Trực giác**: Bạn muốn biết trung bình chiều cao của 10 triệu học sinh Việt Nam. Đo tất cả là không thể. Thay vào đó, bạn chọn **mẫu ngẫu nhiên** 400 người, đo, rồi **suy ra** tổng thể. Câu hỏi: kết quả suy ra chính xác tới mức nào? CLT trả lời câu hỏi đó.

**Tình huống thực tế**: Một công ty thương mại điện tử muốn biết trung bình thời gian mỗi phiên truy cập (session time) của 5 triệu user. Log đầy đủ tốn hàng tuần để xử lý. Thay vào đó, họ lấy mẫu ngẫu nhiên 1.000 user, tính mean = 4.3 phút. Độ tin cậy của con số 4.3 phút này phụ thuộc vào **sampling distribution** — chứ không phải distribution của raw data.

---

## 2. Ba loại phân phối cần phân biệt

> ⚠ **Lỗi thường gặp**: Nhiều người nhầm "phân phối mẫu" (sampling distribution) với "phân phối dữ liệu trong mẫu" (sample distribution). Đây là hai thứ hoàn toàn khác nhau.

### 2.1. Population distribution — Phân phối tổng thể

- **Là gì**: Phân phối của biến X trên **toàn bộ tổng thể** (population). Trong thực tế, ta **không bao giờ biết** phân phối này trực tiếp.
- **Tham số**: mean = $\\mu$ (mu), variance = $\\sigma^2$ (sigma squared).
- **Ví dụ**: Chiều cao của 10 triệu học sinh VN $\\sim \\text{Normal}(163 \\text{ cm}, 8^2)$. Ta không đo được tất cả, nhưng có thể giả định hoặc ước lượng từ lịch sử.

### 2.2. Sample distribution — Phân phối trong mẫu

- **Là gì**: Phân phối của các giá trị quan sát được **trong một mẫu cụ thể** n quan sát.
- **Tham số ước lượng**: mean mẫu $\\bar{x}$, variance mẫu $s^2$.
- **Ví dụ**: Bạn đo 50 học sinh, vẽ histogram $\\to$ đây là sample distribution. Mỗi lần lấy mẫu khác nhau, histogram sẽ khác một chút.

### 2.3. Sampling distribution — Phân phối mẫu (của thống kê)

- **Là gì**: Phân phối của **thống kê** (ví dụ: $\\bar{x}$) qua **nhiều mẫu độc lập** cùng cỡ n lấy từ cùng tổng thể.
- **Ví dụ**: Lấy 1.000 mẫu khác nhau, mỗi mẫu 50 học sinh, tính 1.000 giá trị $\\bar{x}$ $\\to$ vẽ histogram của 1.000 giá trị $\\bar{x}$ đó $\\to$ đó là sampling distribution của $\\bar{x}$.
- **Điểm mấu chốt**: Đây là thứ CLT phát biểu về.

> ❓ **Câu hỏi tự nhiên**
> - **Q: Sampling distribution có thể tính trong thực tế không, vì làm sao lấy 1.000 mẫu khác nhau?**
>   A: Không — ta chỉ có MỘT mẫu. Sampling distribution là **công cụ lý thuyết** để hiểu độ không chắc chắn của $\\bar{x}$. CLT và công thức $\\text{SE} = \\sigma/\\sqrt{n}$ cho phép ta suy ra hình dạng của sampling distribution mà không cần thật sự lấy nhiều mẫu.
> - **Q: Vì sao cần sampling distribution thay vì dùng trực tiếp sample distribution?**
>   A: Vì ta muốn biết $\\bar{x}$ của mình **chính xác tới mức nào** khi so với $\\mu$ thật. Sample distribution cho ta biết dữ liệu phân bố thế nào; sampling distribution cho ta biết **$\\bar{x}$ phân bố thế nào quanh $\\mu$**.

---

## 3. Standard Error (SE) — Sai số chuẩn

### 3.1. Định nghĩa

**(a) Là gì**: SE là **độ lệch chuẩn của sampling distribution** của $\\bar{x}$. Nó đo mức độ $\\bar{x}$ dao động quanh $\\mu$ qua các mẫu khác nhau.

**(b) Vì sao cần**: SD đo sự biến thiên của từng quan sát; SE đo sự biến thiên của **trung bình mẫu**. Nếu bạn muốn biết $\\bar{x}$ chính xác tới mức nào, dùng SE — không phải SD.

**(c) Công thức**:

$$\\text{SE} = \\dfrac{\\sigma}{\\sqrt{n}}$$

Khi $\\sigma$ không biết (thực tế thường vậy), ước lượng bằng:

$$\\text{SE} \\approx \\dfrac{s}{\\sqrt{n}}$$

Trong đó $s$ là standard deviation của mẫu.

### 3.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Chiều cao học sinh**
- Population: $\\mu = 163$ cm, $\\sigma = 8$ cm. Mẫu $n = 64$.
- $\\text{SE} = \\dfrac{8}{\\sqrt{64}} = \\dfrac{8}{8} = \\mathbf{1{,}0 \\text{ cm}}$
- Nghĩa là: các $\\bar{x}$ từ các mẫu 64 người dao động khoảng $\\pm 1$ cm quanh 163 cm.

**Ví dụ 2 — Session time**
- Population: $\\sigma = 3$ phút (ước lượng). Mẫu $n = 100$.
- $\\text{SE} = \\dfrac{3}{\\sqrt{100}} = \\dfrac{3}{10} = \\mathbf{0{,}3 \\text{ phút}}$
- Nhận xét: $n$ tăng $4\\times$ (từ 25 lên 100), SE giảm $2\\times$ (từ 0,6 xuống 0,3). SE giảm theo $\\sqrt{n}$, không theo $n$.

**Ví dụ 3 — Mẫu nhỏ**
- $\\sigma = 15$, $n = 9$.
- $\\text{SE} = \\dfrac{15}{\\sqrt{9}} = \\dfrac{15}{3} = \\mathbf{5{,}0}$
- Mẫu 9 người $\\to$ SE lớn $\\to$ $\\bar{x}$ kém tin cậy.

**Ví dụ 4 — Tăng n**
- $\\sigma = 15$, $n = 225$.
- $\\text{SE} = \\dfrac{15}{\\sqrt{225}} = \\dfrac{15}{15} = \\mathbf{1{,}0}$
- Tăng $n$ từ 9 lên 225 (gấp 25 lần) $\\to$ SE giảm từ 5 xuống 1 (gấp 5 lần $= \\sqrt{25}$).

> ⚠ **Lỗi thường gặp**: Nhầm SE với SD.
> - **SD** ($s$ hoặc $\\sigma$): Mô tả sự phân tán của từng cá thể trong tổng thể/mẫu.
> - **SE**: Mô tả sự phân tán của **$\\bar{x}$** qua nhiều mẫu.
> - Khi $n$ tăng: SD **không thay đổi** (dữ liệu vẫn phân tán như vậy); SE **giảm** ($\\bar{x}$ chính xác hơn).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. $\\sigma = 20$, $n = 25$. Tính SE.
> 2. Muốn SE giảm một nửa, cần tăng $n$ bao nhiêu lần?
> <details><summary>Đáp án</summary>
>
> 1. $\\text{SE} = \\dfrac{20}{\\sqrt{25}} = \\dfrac{20}{5} = \\mathbf{4}$
> 2. $\\text{SE}' = \\dfrac{\\sigma}{\\sqrt{4n}} = \\dfrac{1}{2}\\dfrac{\\sigma}{\\sqrt{n}} \\to$ cần tăng $n$ lên **4 lần** (nhân bốn $n$).
> </details>

---

## 4. Central Limit Theorem (CLT) — Định lý Giới hạn Trung tâm

### 4.1. Phát biểu chính thức

> **CLT**: Cho $X_1, X_2, \\ldots, X_n$ là các biến ngẫu nhiên **i.i.d.** (independent and identically distributed) từ một tổng thể bất kỳ có mean $\\mu$ và variance $\\sigma^2$ **hữu hạn**. Khi $n \\to \\infty$, phân phối của $\\bar{x}$ tiến về phân phối Normal:
>
> $$\\bar{x} \\sim \\text{Normal}\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right) \\quad \\text{hoặc} \\quad \\dfrac{\\bar{x} - \\mu}{\\sigma/\\sqrt{n}} \\sim N(0, 1)$$

### 4.2. Giải mã từng phần

**(a) i.i.d. là gì**: Independent = các quan sát không ảnh hưởng nhau (chọn ngẫu nhiên, không theo nhóm). Identically distributed = mọi quan sát lấy từ cùng một tổng thể.

**(b) "Tổng thể bất kỳ"**: CLT không yêu cầu tổng thể phải chuẩn. Dù tổng thể là Uniform, Exponential, Bimodal, hay bất kỳ hình dạng gì — $\\bar{x}$ vẫn tiến về Normal khi $n$ đủ lớn. Đây là điều kỳ diệu của CLT.

**(c) "n đủ lớn" nghĩa là gì**: Rule of thumb: $n \\geq 30$ đủ cho phần lớn phân phối. Nhưng nếu tổng thể càng lệch (skewed), cần $n$ lớn hơn. Với tổng thể Normal, CLT đúng với mọi $n$.

> 💡 **Trực giác**: Hãy tưởng tượng tung đồng xu 1 lần — kết quả là 0 hoặc 1, rất xa chuẩn. Tung 5 lần, tính tổng: có thể là 0,1,2,3,4,5 — bắt đầu có hình chuông mờ. Tung 30 lần, tính mean: histogram trông giống Normal rõ rệt. Tung 100 lần: gần như hoàn hảo Normal. Không cần đổi đồng xu — chỉ cần **lấy trung bình nhiều quan sát** là đủ "bào mòn" sự bất đối xứng.

### 4.3. Walk-through mô phỏng số

**Tổng thể Uniform[0, 10]**: $\\mu = 5$, $\\sigma^2 = \\dfrac{100}{12} \\approx 8{,}33$, $\\sigma \\approx 2{,}89$.

Lấy 10.000 mẫu, mỗi mẫu $n = 30$, tính $\\bar{x}$:

- Predicted by CLT: $\\bar{x} \\sim \\text{Normal}\\left(5, \\dfrac{2{,}89^2}{30}\\right) = \\text{Normal}(5, 0{,}278) \\to \\text{SE} = \\sqrt{0{,}278} \\approx 0{,}527$
- Observed (simulation): mean của 10.000 $\\bar{x} \\approx 5{,}001$, SD của 10.000 $\\bar{x} \\approx 0{,}528$ ✓
- Histogram của 10.000 $\\bar{x}$ $\\to$ hình chuông đối xứng quanh 5

**Tổng thể Exponential(rate=1)**: $\\mu = 1$, $\\sigma = 1$ (rất lệch phải).

$n = 5$: phân phối $\\bar{x}$ vẫn còn lệch phải rõ rệt.
$n = 30$: phân phối $\\bar{x}$ trông khá Normal.
$n = 100$: phân phối $\\bar{x}$ gần hoàn hảo Normal. $\\text{SE} = \\dfrac{1}{\\sqrt{100}} = 0{,}1$.

> ❓ **Câu hỏi tự nhiên**
> - **Q: Nếu tổng thể không có variance hữu hạn (vd Cauchy distribution), CLT có áp dụng không?**
>   A: Không. Cauchy distribution không có mean và variance hữu hạn → CLT không áp dụng. Đây là một ngoại lệ quan trọng, hay gặp trong finance (heavy-tailed returns).
> - **Q: "Mean mẫu" ($\\bar{x}$) là thống kê CLT nói tới — còn median, max, min thì sao?**
>   A: CLT áp dụng cho tổng/mean. Median, max, min có sampling distribution riêng và cần lý thuyết khác (order statistics, delta method).
> - **Q: Nếu dữ liệu của tôi có outlier nặng, CLT có còn đúng không?**
>   A: Với outlier, variance tổng thể có thể rất lớn hoặc thậm chí không hữu hạn → SE rất lớn → CLT hội tụ chậm hơn. Thực tế n cần lớn hơn nhiều so với 30.

### 4.4. Ứng dụng thực tiễn

CLT cho phép ta **sử dụng phân phối chuẩn để suy luận về $\\bar{x}$** dù không biết phân phối gốc:

1. **Confidence interval**: $\\bar{x} \\pm z^* \\cdot \\text{SE}$ (sẽ học ở Lesson 02)
2. **Z-test**: kiểm định $\\bar{x}$ dựa trên $N(0,1)$ (Lesson 03)
3. **A/B test**: so sánh mean của hai nhóm (Lesson 04)

> 📝 **Tóm tắt mục 4**
> - CLT: $\\bar{x}$ từ $n$ quan sát i.i.d. $\\to \\text{Normal}(\\mu, \\sigma^2/n)$ khi $n$ lớn.
> - Không cần biết phân phối gốc — dù Uniform, Exponential hay Bimodal.
> - $\\text{SE} = \\sigma/\\sqrt{n}$ là độ lệch chuẩn của $\\bar{x}$; tăng $n$ $4\\times \\to$ SE giảm $2\\times$.
> - Rule of thumb: $n \\geq 30$ đủ cho phần lớn trường hợp thực tế.
> - Ngoại lệ: phân phối heavy-tail (Cauchy), dữ liệu không i.i.d. (time series tự tương quan).

---

## 5. Khi nào CLT KHÔNG áp dụng được?

| Điều kiện vi phạm | Hậu quả | Giải pháp |
|-------------------|---------|-----------|
| Dữ liệu không i.i.d. (time series, clustered) | Sampling distribution của x̄ không phải Normal | Dùng time-series methods hoặc cluster-robust SE |
| n quá nhỏ (< 15) với tổng thể lệch mạnh | x̄ distribution vẫn còn lệch | Dùng t-distribution với df nhỏ hoặc bootstrap (Lesson 07) |
| Variance tổng thể vô hạn (Cauchy, Pareto α<2) | CLT không hội tụ | Dùng robust statistics, median thay mean |
| Outlier cực đoan | SE bị inflate → inference sai | Winsorize, kiểm tra, bootstrap |

---

## 6. Tóm tắt tổng quát

| Khái niệm | Ký hiệu | Ý nghĩa |
|-----------|---------|---------|
| Population mean | $\\mu$ | Trung bình thật của tổng thể |
| Population SD | $\\sigma$ | Phân tán của từng cá thể trong tổng thể |
| Sample mean | $\\bar{x}$ | Ước lượng của $\\mu$ từ $n$ quan sát |
| Sample SD | $s$ | Ước lượng của $\\sigma$ từ mẫu |
| Standard Error | $\\text{SE} = \\dfrac{\\sigma}{\\sqrt{n}}$ | Phân tán của $\\bar{x}$ qua nhiều mẫu |
| Sampling distribution | $\\bar{x} \\sim N(\\mu, \\text{SE}^2)$ | Phân phối lý thuyết của $\\bar{x}$ (do CLT) |

---

## Bài tập

1. Một tổng thể có $\\mu = 50$, $\\sigma = 12$. Lấy mẫu $n = 36$. Tính SE. Theo CLT, $\\bar{x}$ có phân phối gì?

2. Tổng thể Exponential với mean $= 4$ ($\\sigma = 4$). Lấy mẫu $n = 100$. SE là bao nhiêu? Xác suất $\\bar{x} > 4{,}5$ theo CLT là bao nhiêu? (Dùng bảng z hoặc tính: $P(Z > 0{,}5/\\text{SE})$.)

3. Muốn $\\text{SE} \\leq 0{,}5$ với $\\sigma = 5$, cần $n$ tối thiểu là bao nhiêu?

4. Một kỹ sư QC đo thời gian sản xuất (phút). Mẫu 25 sản phẩm: $\\bar{x} = 12{,}4$ phút, $s = 2$ phút. Ước lượng SE. Kỹ sư phát biểu "$\\text{SE} = 2$ phút" — đúng hay sai? Giải thích.

5. (Nâng cao) Population có phân phối Bernoulli($p=0{,}3$) — tức 30% thành công, 70% thất bại. Tính $\\mu$ và $\\sigma$. Nếu $n = 100$, sampling distribution của $\\bar{x}$ (tỷ lệ thành công trong mẫu) tiến về Normal gì?

## Lời giải chi tiết

### Bài 1

**Tính SE**: $\\text{SE} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{12}{\\sqrt{36}} = \\dfrac{12}{6} = \\mathbf{2{,}0}$

**Phân phối**: Theo CLT, $\\bar{x} \\sim \\text{Normal}(\\mu = 50,\\ \\text{SE}^2 = 4)$, tức $\\bar{x} \\sim N(50, 4)$. Cụ thể: mean của $\\bar{x} = 50$, SD của $\\bar{x} = 2$.

**Kiểm tra điều kiện**: $n = 36 > 30 \\to$ rule of thumb đạt. CLT áp dụng được dù không biết phân phối gốc.

### Bài 2

**SE**: Exponential(mean=4) có $\\sigma = 4$ (đặc tính của Exponential: mean = SD = 1/rate). $\\text{SE} = \\dfrac{4}{\\sqrt{100}} = 0{,}4$.

**$P(\\bar{x} > 4{,}5)$**: Theo CLT, $\\bar{x} \\sim N(4,\\ 0{,}4^2)$.
- $z = \\dfrac{4{,}5 - 4}{0{,}4} = \\dfrac{0{,}5}{0{,}4} = \\mathbf{1{,}25}$
- $P(Z > 1{,}25) = 1 - \\Phi(1{,}25) \\approx 1 - 0{,}8944 = \\mathbf{0{,}1056 \\approx 10{,}6\\%}$

**Nhận xét**: Dù Exponential là phân phối rất lệch phải, với $n=100$ CLT cho kết quả rất tốt.

### Bài 3

$\\text{SE} \\leq 0{,}5 \\Leftrightarrow \\dfrac{\\sigma}{\\sqrt{n}} \\leq 0{,}5 \\Leftrightarrow \\sqrt{n} \\geq \\dfrac{\\sigma}{0{,}5} = \\dfrac{5}{0{,}5} = 10 \\Leftrightarrow n \\geq 100$.

**Kết quả**: $n$ tối thiểu $= \\mathbf{100}$.

### Bài 4

**SE ước lượng**: $\\text{SE} \\approx \\dfrac{s}{\\sqrt{n}} = \\dfrac{2}{\\sqrt{25}} = \\dfrac{2}{5} = \\mathbf{0{,}4 \\text{ phút}}$.

**Kỹ sư nói $\\text{SE} = 2$ phút là SAI**. Họ nhầm SE với SD. $\\text{SD} = s = 2$ phút (phân tán của từng sản phẩm). $\\text{SE} = 0{,}4$ phút (phân tán của $\\bar{x} = 12{,}4$). SE nhỏ hơn SD đúng $\\sqrt{25} = 5$ lần.

### Bài 5

**Bernoulli($p=0{,}3$)**:
- $\\mu = p = 0{,}3$
- $\\sigma^2 = p(1-p) = 0{,}3 \\times 0{,}7 = 0{,}21 \\to \\sigma = \\sqrt{0{,}21} \\approx 0{,}458$

**Sampling distribution của tỷ lệ mẫu $\\hat{p}$ ($= \\bar{x}$ với $n=100$)**:
- Theo CLT: $\\hat{p} \\sim \\text{Normal}\\left(\\mu = 0{,}3,\\ \\dfrac{\\sigma^2}{n} = \\dfrac{0{,}21}{100} = 0{,}0021\\right)$
- $\\text{SE} = \\sqrt{0{,}0021} \\approx 0{,}0458 \\approx 0{,}046$
- Tức $\\hat{p} \\sim N(0{,}3,\\ 0{,}046^2)$ — đây là nền tảng cho CI và test về proportion (Lesson 02, 03).

---

## Bài tiếp theo

[Lesson 02: Khoảng tin cậy (Confidence Interval)](../lesson-02-confidence-interval/README.md) — Dùng SE từ CLT để xây dựng CI cho μ.

## Tham khảo

- OpenIntro Statistics, 4th ed. — Chapter 5: Foundations for inference.
- All of Statistics (Wasserman) — Chapter 6: Models, Statistical Inference, and Learning.
- Khan Academy: Sampling distributions — https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library
`;
