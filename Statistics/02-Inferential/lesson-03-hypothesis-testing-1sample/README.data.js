// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-03-hypothesis-testing-1sample/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: Kiểm định 1 mẫu (One-Sample Hypothesis Testing)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **logic NHST** (Null Hypothesis Significance Testing): H₀, H₁, α, test statistic, p-value, reject/fail-to-reject.
- Thực hiện **one-sample z-test** (khi σ biết) và **one-sample t-test** (khi σ không biết).
- Phân biệt **two-sided vs one-sided** test, biết khi nào dùng loại nào.
- Nhận ra **quan hệ CI ↔ hypothesis test** (duality).
- Không nhầm "fail to reject H₀" với "accept H₀".

## Kiến thức tiền đề

- **Lesson 01**: CLT, sampling distribution, SE. 
- **Lesson 02**: Confidence interval, critical values z*, t*, t-distribution.
- **Normal distribution**: z-score, P(Z > z) — Vectors/05-Probability Lesson 05.

---

## 1. Logic của kiểm định thống kê

> 💡 **Trực giác**: Kiểm định giả thuyết giống như **toà án**. H₀ ("giả thuyết null") là "bị cáo vô tội" — mặc định giả sử đúng. Dữ liệu là bằng chứng. Nếu bằng chứng **quá khó giải thích** dưới giả thuyết "vô tội" (p-value nhỏ), ta bác bỏ H₀. Nếu bằng chứng mơ hồ, ta **không kết tội** (fail to reject) — nhưng không có nghĩa là bị cáo chắc chắn vô tội.

**Vấn đề đặt ra**: Một nhà sản xuất bánh mì tuyên bố mỗi ổ nặng trung bình 500g. Bạn cân 36 ổ ngẫu nhiên, $\\bar{x} = 492$g, $s = 15$g. Tuyên bố đó có đúng không?

Để trả lời, ta cần framework:

### 1.1. Sáu bước NHST

1. **Phát biểu H₀ và H₁**
2. **Chọn mức ý nghĩa α** (thường 0.05 hoặc 0.01)
3. **Tính test statistic** (z hoặc t) từ dữ liệu
4. **Tính p-value**: xác suất có được kết quả **cực đoan ít nhất như vậy** nếu H₀ đúng
5. **Quyết định**: Nếu p < α → reject H₀; nếu p ≥ α → fail to reject H₀
6. **Kết luận trong ngữ cảnh** (không chỉ nói "reject/fail to reject")

---

## 2. H₀ và H₁ — Null và Alternative Hypothesis

### 2.1. Nguyên tắc đặt H₀/H₁

- **H₀ (null hypothesis)**: Tuyên bố "không có gì đặc biệt" — bằng nhau, không đổi, không có hiệu ứng. Luôn có dấu =.
- **H₁ (alternative hypothesis)**: Tuyên bố ta muốn kiểm tra — có sự khác biệt/thay đổi.
- **One-sided (one-tailed)**: H₁ chỉ định chiều (< hoặc >). Dùng khi có lý do lý thuyết rõ ràng.
- **Two-sided (two-tailed)**: H₁: μ ≠ μ₀. Dùng mặc định khi không biết chiều.

**Ví dụ**:

| Tình huống | H₀ | H₁ | Loại |
|-----------|----|----|------|
| Nhà máy tuyên bố trọng lượng TB = 500g | $\\mu = 500$ | $\\mu \\neq 500$ | Two-sided |
| Thuốc mới giảm HA (giả thuyết giảm) | $\\mu \\geq 130$ | $\\mu < 130$ | One-sided (left) |
| Mô hình mới có accuracy > 90% | $\\mu \\leq 0{,}9$ | $\\mu > 0{,}9$ | One-sided (right) |

> ⚠ **Lỗi thường gặp**: Chọn one-sided SAU KHI thấy dữ liệu ("HARKing" — Hypothesizing After Results Known). Đây là p-hacking. H₀/H₁ phải được chốt TRƯỚC khi xem dữ liệu.

### 2.2. Mức ý nghĩa α

$\\alpha$ = xác suất **Type I error** = xác suất reject $H_0$ khi $H_0$ thật sự đúng (false positive). Thường dùng:
- $\\alpha = 0{,}05$ (tiêu chuẩn khoa học phổ biến nhất)
- $\\alpha = 0{,}01$ (nghiêm ngặt hơn — y học, dược phẩm)
- $\\alpha = 0{,}10$ (thăm dò ban đầu)

---

## 3. One-Sample Z-Test

### 3.1. Khi nào dùng

- μ không biết, σ **đã biết** (hoặc n rất lớn, dùng s thay σ).
- Điều kiện: i.i.d., n ≥ 30 hoặc tổng thể chuẩn.

### 3.2. Test statistic

$$z = \\dfrac{\\bar{x} - \\mu_0}{\\sigma/\\sqrt{n}}$$

Dưới $H_0$, $z \\sim N(0,1)$.

### 3.3. P-value

- **Two-sided**: $p = 2 \\times P(Z > |z|) = 2 \\times (1 - \\Phi(|z|))$
- **One-sided left** ($H_1: \\mu < \\mu_0$): $p = P(Z < z) = \\Phi(z)$
- **One-sided right** ($H_1: \\mu > \\mu_0$): $p = P(Z > z) = 1 - \\Phi(z)$

### 3.4. Walk-through bằng số — 3 ví dụ

**Ví dụ 1 — Bánh mì (two-sided)**:
- $H_0: \\mu = 500$, $H_1: \\mu \\neq 500$. $\\alpha = 0{,}05$. $\\sigma = 15$ (giả sử biết), $n = 36$, $\\bar{x} = 492$.
- $\\text{SE} = \\dfrac{15}{\\sqrt{36}} = 2{,}5$
- $z = \\dfrac{492 - 500}{2{,}5} = \\dfrac{-8}{2{,}5} = \\mathbf{-3{,}2}$
- $p = 2 \\times P(Z < -3{,}2) = 2 \\times \\Phi(-3{,}2) = 2 \\times 0{,}00069 = \\mathbf{0{,}00138}$
- Vì $p = 0{,}00138 < \\alpha = 0{,}05 \\to$ **Reject $H_0$**.
- Kết luận: "Có bằng chứng thống kê mạnh (p=0,0014) rằng trọng lượng trung bình khác 500g."

**Ví dụ 2 — App mới (one-sided right)**:
- $H_0: \\mu \\leq 4{,}0$, $H_1: \\mu > 4{,}0$ (giờ/ngày). $\\alpha = 0{,}05$. $\\sigma = 0{,}8$, $n = 64$, $\\bar{x} = 4{,}15$.
- $\\text{SE} = \\dfrac{0{,}8}{8} = 0{,}1$
- $z = \\dfrac{4{,}15 - 4{,}0}{0{,}1} = \\mathbf{1{,}5}$
- $p = P(Z > 1{,}5) = 1 - 0{,}9332 = \\mathbf{0{,}0668}$
- Vì $p = 0{,}0668 > \\alpha = 0{,}05 \\to$ **Fail to reject $H_0$**.
- Kết luận: "Chưa đủ bằng chứng để kết luận app mới tăng usage vượt 4 giờ/ngày."

**Ví dụ 3 — Kiểm tra quy trình (one-sided left)**:
- $H_0: \\mu \\geq 10$, $H_1: \\mu < 10$ (thời gian xử lý đơn hàng, phút). $\\sigma = 2$, $n = 100$, $\\bar{x} = 9{,}5$.
- $z = \\dfrac{9{,}5 - 10}{2/10} = \\dfrac{-0{,}5}{0{,}2} = \\mathbf{-2{,}5}$
- $p = \\Phi(-2{,}5) = \\mathbf{0{,}0062}$
- $p < 0{,}05 \\to$ **Reject $H_0$**. Quy trình mới thực sự nhanh hơn.

---

## 4. One-Sample T-Test

### 4.1. Khi nào dùng

- μ không biết, σ **không biết** (thực tế gần như luôn vậy).
- Điều kiện: i.i.d.; n ≥ 30 HOẶC tổng thể gần chuẩn.

### 4.2. Test statistic

$$t = \\dfrac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$$

Dưới $H_0$, $t \\sim t(n-1)$.

### 4.3. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Điểm kiểm tra**:
- $H_0: \\mu = 70$, $H_1: \\mu \\neq 70$. $\\alpha = 0{,}05$. $n = 16$, $\\bar{x} = 75$, $s = 10$.
- df $= 15$. $t^*(15,\\ \\text{two-sided},\\ 0{,}05) = 2{,}131$.
- $\\text{SE} = \\dfrac{10}{4} = 2{,}5$.
- $t = \\dfrac{75 - 70}{2{,}5} = \\mathbf{2{,}0}$
- $t^* = 2{,}131$. Vì $|t| = 2{,}0 < 2{,}131 \\to$ **Fail to reject $H_0$**.
- Hoặc dùng p-value: $p \\approx 0{,}064 > 0{,}05 \\to$ không reject.

**Ví dụ 2 — Lương khởi điểm**:
- $H_0: \\mu = 10$ triệu VND, $H_1: \\mu > 10$ triệu. $\\alpha = 0{,}05$. $n = 25$, $\\bar{x} = 11{,}2$, $s = 3$.
- df $= 24$. $\\text{SE} = \\dfrac{3}{5} = 0{,}6$.
- $t = \\dfrac{11{,}2 - 10}{0{,}6} = \\mathbf{2{,}0}$
- $t^*(24,\\ \\text{one-sided right},\\ 0{,}05) = 1{,}711$.
- $|t| = 2{,}0 > 1{,}711 \\to$ **Reject $H_0$**. $p \\approx 0{,}028 < 0{,}05$.
- Kết luận: "Lương khởi điểm ngành này trung bình cao hơn 10 triệu (p=0,028)."

**Ví dụ 3 — Nước đóng chai**:
- Tiêu chuẩn: 500ml. $n = 10$, $\\bar{x} = 498{,}5$, $s = 3{,}2$. $H_0: \\mu = 500$, $H_1: \\mu \\neq 500$. $\\alpha = 0{,}01$.
- df $= 9$. $\\text{SE} = \\dfrac{3{,}2}{\\sqrt{10}} \\approx 1{,}012$.
- $t = \\dfrac{498{,}5 - 500}{1{,}012} \\approx \\mathbf{-1{,}482}$
- $t^*(9,\\ \\text{two-sided},\\ 0{,}01) = 3{,}250$.
- $|t| = 1{,}482 < 3{,}250 \\to$ **Fail to reject $H_0$** ($\\alpha = 0{,}01$).
- Thậm chí với $\\alpha = 0{,}05$: $t^*(9) = 2{,}262 > 1{,}482 \\to$ vẫn không reject. $p \\approx 0{,}17$.

**Ví dụ 4 — Mẫu nhỏ, ảnh hưởng của outlier**:
- $n = 8$, dữ liệu: 5, 7, 6, 8, 6, 7, 6, 100. $\\bar{x} = 18{,}125$, $s = 32{,}8$.
- $t = \\dfrac{18{,}125 - 6}{32{,}8/\\sqrt{8}} = \\dfrac{12{,}125}{11{,}597} \\approx \\mathbf{1{,}046}$. df $= 7$. $p \\approx 0{,}33$.
- Không reject $H_0: \\mu = 6$ — dù $\\bar{x} = 18{,}125$ rất xa 6!
- Lý do: Outlier 100 làm $s$ rất lớn $\\to$ SE lớn $\\to t$ nhỏ. Outlier đã che mất signal.

---

## 5. Vùng Reject và Critical Value

Vùng reject (rejection region) là tập giá trị test statistic mà tại đó ta bác bỏ $H_0$:

$$\\begin{aligned}
\\text{Two-sided:} \\quad & \\text{Reject nếu } |z| > z^* \\text{ hoặc } |t| > t^* \\\\
\\text{One-sided right:} \\quad & \\text{Reject nếu } z > z^* \\text{ hoặc } t > t^* \\\\
\\text{One-sided left:} \\quad & \\text{Reject nếu } z < -z^* \\text{ hoặc } t < -t^*
\\end{aligned}$$

**Đối chiếu p-value với critical value**: Hai cách tương đương nhau:
- Cách 1: Tính p-value, so với $\\alpha$.
- Cách 2: Tính test statistic, so với critical value.

Ví dụ (two-sided, $\\alpha=0{,}05$): $p < 0{,}05 \\Leftrightarrow |z| > 1{,}96$ — hoàn toàn tương đương.

---

## 6. Sai lầm cần tránh sau khi kiểm định

1. **"Fail to reject H₀" ≠ "Accept H₀"**: Không reject có nghĩa là "không đủ bằng chứng để bác bỏ" — không có nghĩa là H₀ đúng.

2. **Kết quả có ý nghĩa thống kê ≠ có ý nghĩa thực tế**: Với n đủ lớn, ngay cả sự khác biệt không đáng kể cũng có thể đạt p < 0.05. (Xem Lesson 06 về effect size.)

3. **P-value không phải xác suất H₀ đúng**: p là P(dữ liệu cực đoan như vậy | H₀ đúng), không phải P(H₀ đúng | dữ liệu). (Sẽ học kỹ ở Lesson 06.)

> 📝 **Tóm tắt**
> - NHST: đặt H₀/H₁ → chọn α → tính test statistic → p-value → quyết định.
> - Z-test: σ biết; t-test: σ không biết (df = n-1).
> - p-value đo "sự bất thường của dữ liệu nếu H₀ đúng" — không phải xác suất H₀ sai.
> - Fail to reject H₀ ≠ Accept H₀.
> - Two-sided mặc định; one-sided chỉ khi có lý thuyết chỉ định chiều trước.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. $n=25$, $\\bar{x}=48$, $s=8$, $H_0: \\mu=50$, $H_1: \\mu<50$, $\\alpha=0{,}05$. Tính $t$ và kết luận.
> 2. Với dữ liệu trên, tại sao ta dùng t-test thay z-test?
> <details><summary>Đáp án</summary>
> 1. $\\text{SE} = \\dfrac{8}{5} = 1{,}6$. $t = \\dfrac{48-50}{1{,}6} = -1{,}25$. df$=24$. $t^*(24,\\ \\text{one-sided left},\\ 0{,}05) = -1{,}711$. Vì $t = -1{,}25 > -1{,}711 \\to$ Fail to reject $H_0$. $p \\approx 0{,}112 > 0{,}05$.
> 2. Dùng $t$ vì $\\sigma$ không biết, ta dùng $s=8$ thay. Với $n=25$, $t^* \\neq z^*$ ($t^*(24)=1{,}711 > z^*=1{,}645$) — không thể dùng $z^*$.
> </details>

---

## Bài tập

1. Nhà máy đặt mục tiêu fill trung bình = 1000ml. Mẫu 40 chai: $\\bar{x} = 997{,}8$, $s = 8{,}5$. Kiểm tra xem máy có bị lệch không ($\\alpha = 0{,}05$).

2. Cuộc thi nói rằng thí sinh trung bình đạt 60 điểm. Bạn chọn 20 thí sinh từ trường mình: $\\bar{x} = 65$, $s = 12$. Trường bạn có cao hơn mức trung bình không? ($\\alpha = 0{,}05$, one-sided right.)

3. Một ứng dụng mới thay thế quy trình cũ. Thời gian quy trình cũ $\\mu_0 = 5{,}0$ phút (đã biết ổn định). Sau cải tiến, thử 9 lần: $\\bar{x} = 4{,}2$, $s = 0{,}9$. Kiểm tra xem ứng dụng mới có thực sự nhanh hơn không ($\\alpha = 0{,}01$, one-sided left).

4. (Tư duy) Một nhà nghiên cứu chạy test $H_0: \\mu = 0$ trên 10.000 người, thu được $p = 0{,}03$. Họ kết luận "Xác suất $H_0$ đúng là 3%." Giải thích sai lầm.

## Lời giải chi tiết

### Bài 1

$H_0: \\mu = 1000$, $H_1: \\mu \\neq 1000$. $\\alpha = 0{,}05$. $n = 40$, $\\bar{x} = 997{,}8$, $s = 8{,}5$.

$\\text{SE} = \\dfrac{8{,}5}{\\sqrt{40}} \\approx 1{,}344$.

$t = \\dfrac{997{,}8 - 1000}{1{,}344} = \\mathbf{-1{,}636}$. df $= 39$.

$t^*(39,\\ \\text{two-sided},\\ 0{,}05) \\approx 2{,}023$ (tra bảng). $|t| = 1{,}636 < 2{,}023 \\to$ **Fail to reject $H_0$**.

$p \\approx 0{,}11 > 0{,}05$. Kết luận: "Chưa đủ bằng chứng kết luận máy bị lệch so với 1000ml ở $\\alpha=0{,}05$."

### Bài 2

$H_0: \\mu \\leq 60$, $H_1: \\mu > 60$. $\\alpha = 0{,}05$. $n = 20$, $\\bar{x} = 65$, $s = 12$.

$\\text{SE} = \\dfrac{12}{\\sqrt{20}} \\approx 2{,}683$. $t = \\dfrac{65-60}{2{,}683} \\approx \\mathbf{1{,}863}$. df $= 19$.

$t^*(19,\\ \\text{one-sided right},\\ 0{,}05) = 1{,}729$. Vì $t = 1{,}863 > 1{,}729 \\to$ **Reject $H_0$**.

$p \\approx 0{,}039 < 0{,}05$. Kết luận: "Điểm trung bình của trường cao hơn mức 60 điểm (p=0,039, t=1,86)."

### Bài 3

$H_0: \\mu \\geq 5{,}0$, $H_1: \\mu < 5{,}0$. $\\alpha = 0{,}01$. $n = 9$, $\\bar{x} = 4{,}2$, $s = 0{,}9$.

$\\text{SE} = \\dfrac{0{,}9}{\\sqrt{9}} = 0{,}3$. $t = \\dfrac{4{,}2 - 5{,}0}{0{,}3} = \\mathbf{-2{,}667}$. df $= 8$.

$t^*(8,\\ \\text{one-sided left},\\ 0{,}01) = -2{,}896$. Vì $t = -2{,}667 > -2{,}896 \\to$ **Fail to reject $H_0$** (tại $\\alpha=0{,}01$).

Kiểm tra $\\alpha=0{,}05$: $t^*(8,\\ \\text{one-sided left},\\ 0{,}05) = -1{,}860$. $t = -2{,}667 < -1{,}860 \\to$ Reject $H_0$ tại $\\alpha=0{,}05$.

Kết luận ($\\alpha=0{,}01$): "Chưa đủ bằng chứng tại $\\alpha=0{,}01$ để kết luận ứng dụng mới nhanh hơn. Tuy nhiên tại $\\alpha=0{,}05$ thì có."

### Bài 4

Sai lầm: Nhầm **p-value** với **xác suất posterior** của $H_0$. Định nghĩa đúng:

- $p = 0{,}03$ nghĩa là: **Nếu $H_0$ đúng**, xác suất thu được dữ liệu cực đoan ít nhất như ta quan sát = 3%.
- **Không phải**: $P(H_0 \\text{ đúng} \\mid \\text{dữ liệu}) = 3\\%$.

Để tính $P(H_0 \\text{ đúng} \\mid \\text{dữ liệu})$ cần framework Bayesian: cần thêm prior $P(H_0)$. Ví dụ nếu $P(H_0 \\text{ đúng}) = 0{,}9$ (a priori khả năng cao $H_0$ đúng), $p=0{,}03$ không có nghĩa là "$H_0$ sai với xác suất 97%".

---

## Bài tiếp theo

[Lesson 04: Kiểm định 2 mẫu](../lesson-04-two-sample-tests/README.md) — So sánh hai nhóm: independent t-test, paired t-test, A/B testing.

## Tham khảo

- OpenIntro Statistics — Chapter 5 & 7.
- Discovering Statistics Using R (Field) — Chapters on t-tests.
`;
