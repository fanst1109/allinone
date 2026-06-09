# Lesson 04: Kiểm định 2 mẫu (Two-Sample Tests)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Thực hiện **independent two-sample t-test**: biết khi nào dùng pooled t, khi nào dùng Welch's t.
- Thực hiện **paired t-test** (before/after, matched pairs) và phân biệt với independent t-test.
- Áp dụng hai test này vào **A/B testing** thực tế.
- Kiểm tra **assumption** của t-test (normality, independence, variance equality).
- Tính CI cho sự khác biệt giữa hai mean: $\mu_1 - \mu_2$.

## Kiến thức tiền đề

- **Lesson 03**: One-sample t-test, logic NHST, H₀/H₁, p-value.
- **Lesson 01**: SE, sampling distribution — vì two-sample test cũng dựa trên sampling distribution của sự khác biệt.
- **Lesson 03 (Tầng 1)**: Variance, SD.

---

## 1. Bài toán mở đầu: So sánh hai nhóm

> 💡 **Trực giác**: Bạn đang A/B test một tính năng mới. Group A (control) có 150 user, Group B (treatment) có 150 user. Mean session time: A = 4.2 phút, B = 4.8 phút. Liệu 0.6 phút khác biệt này có thật sự ý nghĩa hay chỉ là biến động ngẫu nhiên từ mẫu? Two-sample test cho câu trả lời.

**Hai tình huống phổ biến cần phân biệt ngay**:

| Tình huống | Test |
|-----------|------|
| Hai nhóm **khác nhau** (A độc lập với B) | Independent two-sample t-test |
| **Cùng** đối tượng đo **hai lần** (before/after) | Paired t-test |

Nhầm lẫn hai test này là lỗi rất phổ biến và dẫn tới kết quả sai.

---

## 2. Independent Two-Sample T-Test

### 2.1. H₀ và H₁

$$\begin{aligned}
H_0&: \mu_1 - \mu_2 = 0 \quad \text{(hai nhóm có mean bằng nhau)} \\
H_1&: \mu_1 - \mu_2 \neq 0 \quad \text{(two-sided)} \quad \text{hoặc} \quad > 0 \ /\ < 0 \ \text{(one-sided)}
\end{aligned}$$

### 2.2. Hai phiên bản: Pooled vs Welch

**Pooled t-test** (Student's t): Giả định variance hai nhóm bằng nhau ($\sigma_1^2 = \sigma_2^2$).

$$\begin{aligned}
\text{Pooled variance:} \quad s_p^2 &= \dfrac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2} \\
\text{SE}_{pooled} &= s_p \sqrt{\dfrac{1}{n_1} + \dfrac{1}{n_2}} \\
t &= \dfrac{\bar{x}_1 - \bar{x}_2}{\text{SE}_{pooled}}, \quad \text{df} = n_1+n_2-2
\end{aligned}$$

**Welch's t-test**: Không giả định variance bằng nhau. **Đây là lựa chọn mặc định và an toàn hơn**.

$$\begin{aligned}
\text{SE}_{welch} &= \sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}} \\
t &= \dfrac{\bar{x}_1 - \bar{x}_2}{\text{SE}_{welch}} \\
\text{df} &\approx \dfrac{\left(\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}\right)^2}{\dfrac{(s_1^2/n_1)^2}{n_1-1} + \dfrac{(s_2^2/n_2)^2}{n_2-1}}
\end{aligned}$$

(Welch-Satterthwaite approximation, thường không phải số nguyên)

> 💡 **Khi nào dùng gì**: Trong thực tế, luôn dùng **Welch's t** (mặc định trong R là `var.equal=FALSE`, Python scipy là mặc định). Pooled chỉ dùng khi có lý thuyết rõ ràng rằng variance bằng nhau, hoặc đề bài yêu cầu. Welch's không kém hơn pooled khi variance thực sự bằng nhau, nhưng tốt hơn hẳn khi variance khác nhau.

### 2.3. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — A/B test session time (Welch)**:
- Group A (control): $n_1=100$, $\bar{x}_1=4{,}2$, $s_1=1{,}5$
- Group B (treatment): $n_2=100$, $\bar{x}_2=4{,}8$, $s_2=1{,}8$
- $H_0: \mu_1=\mu_2$, $H_1: \mu_1 \neq \mu_2$, $\alpha=0{,}05$
- $\text{SE}_{welch} = \sqrt{\dfrac{1{,}5^2}{100} + \dfrac{1{,}8^2}{100}} = \sqrt{0{,}0225+0{,}0324} = \sqrt{0{,}0549} \approx \mathbf{0{,}2343}$
- $t = \dfrac{4{,}2-4{,}8}{0{,}2343} = \mathbf{-2{,}561}$
- $\text{df} \approx \dfrac{(0{,}0225+0{,}0324)^2}{(0{,}0225)^2/99 + (0{,}0324)^2/99} \approx 193$
- $t^*(193,\ \text{two-sided},\ 0{,}05) \approx 1{,}972$. $|t|=2{,}561 > 1{,}972 \to$ **Reject $H_0$**.
- $p \approx 0{,}011$. "Tính năng mới tăng session time có ý nghĩa thống kê (p=0,011)."

**Ví dụ 2 — So sánh điểm thi hai lớp (pooled, variance bằng nhau)**:
- Lớp A: $n_1=20$, $\bar{x}_1=72$, $s_1=10$. Lớp B: $n_2=25$, $\bar{x}_2=76$, $s_2=9$.
- $s_p^2 = \dfrac{(20-1)\times 100 + (25-1)\times 81}{20+25-2} = \dfrac{1900+1944}{43} = \dfrac{3844}{43} \approx 89{,}4 \to s_p \approx 9{,}455$
- $\text{SE} = 9{,}455 \times \sqrt{\dfrac{1}{20}+\dfrac{1}{25}} = 9{,}455 \times \sqrt{0{,}09} = 9{,}455 \times 0{,}3 = \mathbf{2{,}836}$
- $t = \dfrac{72-76}{2{,}836} \approx \mathbf{-1{,}411}$. df $= 43$.
- $t^*(43,\ \text{two-sided},\ 0{,}05) \approx 2{,}017$. $|t| = 1{,}411 < 2{,}017 \to$ **Fail to reject $H_0$**.

**Ví dụ 3 — One-sided (thuốc hạ đường huyết)**:
- Nhóm điều trị: $n_1=30$, $\bar{x}_1=120$, $s_1=15$. Nhóm chứng: $n_2=30$, $\bar{x}_2=130$, $s_2=18$.
- $H_0: \mu_1 \geq \mu_2$, $H_1: \mu_1 < \mu_2$ (thuốc giảm HA).
- $\text{SE}_{welch} = \sqrt{\dfrac{225}{30}+\dfrac{324}{30}} = \sqrt{7{,}5+10{,}8} = \sqrt{18{,}3} \approx 4{,}278$
- $t = \dfrac{120-130}{4{,}278} \approx \mathbf{-2{,}338}$
- One-sided left $p \approx 0{,}012 < 0{,}05 \to$ **Reject $H_0$**. Thuốc có hiệu quả hạ HA.

**Ví dụ 4 — CI cho μ₁−μ₂**:
- Dùng ví dụ 1: $\bar{x}_1-\bar{x}_2 = -0{,}6$, $\text{SE}_{welch} = 0{,}2343$, df$\approx 193$, $t^* \approx 1{,}972$.
- 95% CI: $-0{,}6 \pm 1{,}972 \times 0{,}2343 = -0{,}6 \pm 0{,}462 = \mathbf{[-1{,}062;\ -0{,}138]}$
- Diễn giải: Ta ước lượng Group B cao hơn A từ 0,14 đến 1,06 phút (95% CI không chứa 0 $\to$ reject $H_0$ ✓).

---

## 3. Paired T-Test

### 3.1. Ý tưởng

> 💡 **Trực giác**: Paired test đo **sự thay đổi** của cùng một đối tượng, loại bỏ variability giữa các cá thể. Giống như: để so sánh hai loại giày, tốt nhất là cho mỗi người thử CÙNG hai đôi — không phải 10 người thử giày A và 10 người khác thử giày B (vì kích chân, dáng đi mỗi người khác nhau).

**Khi nào dùng**:
- Trước/sau can thiệp trên cùng đối tượng (before/after drug, before/after training).
- Matched pairs: mỗi đơn vị trong nhóm 1 được match với một đơn vị cụ thể trong nhóm 2.

### 3.2. Quy trình

1. Tính **difference** $d_i = x_{1i} - x_{2i}$ cho mỗi cặp.
2. Tính $\bar{d}$ = mean của các $d_i$, $s_d$ = SD của các $d_i$.
3. Thực hiện **one-sample t-test** trên $d_i$ với $H_0: \mu_d = 0$.

$$t = \dfrac{\bar{d}}{s_d/\sqrt{n}}, \quad \text{df} = n - 1 \quad (n \text{ là số cặp})$$

### 3.3. Walk-through bằng số — 3 ví dụ

**Ví dụ 1 — Chương trình tập luyện**:
- 8 người, đo cân nặng trước và sau 3 tháng (kg):

| Người | Trước | Sau | d = Trước-Sau |
|-------|-------|-----|--------------|
| 1 | 75 | 73 | 2 |
| 2 | 82 | 79 | 3 |
| 3 | 68 | 66 | 2 |
| 4 | 90 | 86 | 4 |
| 5 | 71 | 70 | 1 |
| 6 | 85 | 81 | 4 |
| 7 | 78 | 75 | 3 |
| 8 | 95 | 92 | 3 |

$\bar{d} = \dfrac{2+3+2+4+1+4+3+3}{8} = \dfrac{22}{8} = \mathbf{2{,}75 \text{ kg}}$

Variance của $d$:

$$\begin{aligned}
s_d^2 &= \dfrac{\sum (d_i-\bar{d})^2}{n-1} \\
&= \dfrac{0{,}75^2 + 0{,}25^2 + 0{,}75^2 + 1{,}25^2 + 1{,}75^2 + 1{,}25^2 + 0{,}25^2 + 0{,}25^2}{7} \\
&= \dfrac{0{,}5625 + 0{,}0625 + 0{,}5625 + 1{,}5625 + 3{,}0625 + 1{,}5625 + 0{,}0625 + 0{,}0625}{7} \\
&= \dfrac{7{,}5}{7} \approx 1{,}071 \to s_d \approx 1{,}035
\end{aligned}$$

$\text{SE} = \dfrac{1{,}035}{\sqrt{8}} \approx 0{,}366$.

$H_0: \mu_d = 0$, $H_1: \mu_d > 0$ (one-sided: chứng minh giảm cân). $\alpha = 0{,}05$.

$t = \dfrac{2{,}75}{0{,}366} \approx \mathbf{7{,}51}$. df $= 7$. $t^*(7,\ \text{one-sided},\ 0{,}05) = 1{,}895$.

$t = 7{,}51 \gg 1{,}895 \to$ **Reject $H_0$**. $p \ll 0{,}001$. Chương trình có hiệu quả giảm cân rõ rệt.

**Ví dụ 2 — So sánh paired vs independent để thấy sự khác biệt**:
- Cùng dữ liệu ví dụ 1, nếu nhầm dùng independent t-test:
- Group 1 (Trước): $\bar{x}=80{,}5$, $s_1=9{,}02$. Group 2 (Sau): $\bar{x}=77{,}75$, $s_2=8{,}60$.
- $\text{SE}_{welch} \approx \sqrt{\dfrac{9{,}02^2}{8}+\dfrac{8{,}60^2}{8}} \approx \sqrt{10{,}17+9{,}25} \approx \sqrt{19{,}42} \approx 4{,}406$.
- $t = \dfrac{80{,}5-77{,}75}{4{,}406} \approx \mathbf{0{,}624}$. df $\approx 14$. $p \approx 0{,}54$.
- Kết quả: **Fail to reject $H_0$** (!!) — ngược với kết quả paired!
- Lý do: Independent test không loại bỏ variability giữa người (người cao vs thấp). Paired test chỉ nhìn vào sự thay đổi $d_i \to$ test mạnh hơn nhiều.

**Ví dụ 3 — Two-sided paired**:
- 6 thiết bị, đo bằng 2 phương pháp A và B. $\bar{d} = 0{,}8$, $s_d = 1{,}5$, $n = 6$.
- $H_0: \mu_d = 0$, $H_1: \mu_d \neq 0$. $\alpha = 0{,}05$.
- $t = \dfrac{0{,}8}{1{,}5/\sqrt{6}} = \dfrac{0{,}8}{0{,}612} \approx 1{,}307$. df $= 5$. $t^*(5) = 2{,}571$.
- $p \approx 0{,}25 > 0{,}05 \to$ Fail to reject $H_0$. Hai phương pháp đo không khác nhau.

> ⚠ **Lỗi thường gặp**: Dùng independent t-test thay vì paired khi có matched pairs.
> - Hậu quả: **Power giảm** (khó phát hiện hiệu ứng thật) vì không loại bỏ variability giữa các cá thể.
> - Dấu hiệu nhận biết: Mỗi hàng dữ liệu có thông tin "cặp" (person_id, patient_id, device_id...).

---

## 4. Kiểm tra Assumptions

| Assumption | Paired t-test | Independent t-test | Kiểm tra |
|-----------|--------------|-------------------|---------|
| Normality | dᵢ ~ Normal | Mỗi nhóm ~ Normal | Shapiro-Wilk test, QQ plot (n nhỏ); CLT giải cứu nếu n lớn |
| Independence | Các cặp độc lập nhau | Hai mẫu độc lập nhau | Thiết kế thực nghiệm |
| Equal variance | (không yêu cầu) | Pooled: cần; Welch: không | Levene test / F-test — nhưng dùng Welch mặc định là an toàn nhất |

**Khi normality vi phạm**:
- n lớn: CLT cứu (t-test vẫn OK).
- n nhỏ + phân phối lệch mạnh: dùng Mann-Whitney U test (non-parametric) hoặc bootstrap (Lesson 07).

---

## 5. A/B Testing trong thực tế

**A/B test** = controlled experiment tự nhiên trên user: chia ngẫu nhiên thành Control (A) và Treatment (B), đo metric, dùng two-sample test.

**Checklist A/B test đúng**:
1. Random assignment (quan trọng nhất) — nếu không random, có selection bias.
2. Chốt H₀/H₁ và α TRƯỚC khi chạy (tránh p-hacking).
3. Chốt sample size cần thiết TRƯỚC khi chạy (power analysis — Lesson 06).
4. Không "peek" data nhiều lần (mỗi lần nhìn tăng Type I error — xem Lesson 06 multiple testing).
5. Sau test: báo cáo effect size + CI, không chỉ p-value.

**Ví dụ thực tế**:
- Metric: conversion rate (tỷ lệ click $\to$ mua).
- A: 500 user, 45 conversions $\to \hat{p}_A = 0{,}09$.
- B: 500 user, 62 conversions $\to \hat{p}_B = 0{,}124$.
- $H_0: p_A = p_B$. Two-sample z-test cho proportion:
  - $\hat{p}_{pooled} = \dfrac{45+62}{1000} = 0{,}107$.
  - $\text{SE} = \sqrt{0{,}107 \times 0{,}893 \times \left(\dfrac{1}{500}+\dfrac{1}{500}\right)} = \sqrt{0{,}107 \times 0{,}893 \times 0{,}004} \approx 0{,}0195$.
  - $z = \dfrac{0{,}09-0{,}124}{0{,}0195} \approx -1{,}744$. $p \approx 0{,}081$.
  - Với $\alpha=0{,}05 \to$ **Fail to reject** ($p=0{,}081$). Với $\alpha=0{,}10 \to$ Reject.
  - Kết luận: "Chưa đủ bằng chứng tại $\alpha=0{,}05$; nếu dùng $\alpha=0{,}10$ thì B tốt hơn. Cần thêm dữ liệu hoặc quyết định theo business judgment."

---

## Bài tập

1. Hai nhóm học sinh: nhóm A ($n=15$, $\bar{x}=78$, $s=10$) và nhóm B ($n=18$, $\bar{x}=83$, $s=12$). Dùng Welch's t-test, kiểm tra xem hai nhóm có khác nhau không ($\alpha=0{,}05$, two-sided). [Dùng df $\approx 29$.]

2. Dữ liệu trước/sau điều trị cho 5 bệnh nhân (điểm đau 0-10): Trước: {7,8,6,9,7}, Sau: {5,6,4,7,5}. Kiểm tra điều trị có giảm đau không ($\alpha=0{,}05$, one-sided).

3. A/B test: Group A 300 user, 42 conversions; Group B 300 user, 57 conversions. Dùng two-sample z-test cho proportion ($\alpha=0{,}05$, two-sided).

4. (Tư duy) Bạn có dữ liệu: IQ của 30 cặp sinh đôi (twin) — một người được giáo dục nâng cao, một người không. Nên dùng paired hay independent t-test? Giải thích.

## Lời giải chi tiết

### Bài 1

$H_0: \mu_A = \mu_B$, $H_1: \mu_A \neq \mu_B$. $\alpha=0{,}05$.

$\text{SE}_{welch} = \sqrt{\dfrac{10^2}{15} + \dfrac{12^2}{18}} = \sqrt{\dfrac{100}{15} + \dfrac{144}{18}} = \sqrt{6{,}667 + 8{,}0} = \sqrt{14{,}667} \approx 3{,}830$.

$t = \dfrac{78-83}{3{,}830} \approx \mathbf{-1{,}306}$. df $\approx 29$.

$t^*(29,\ \text{two-sided},\ 0{,}05) = 2{,}045$. $|t| = 1{,}306 < 2{,}045 \to$ **Fail to reject $H_0$**.

$p \approx 0{,}201$. "Hai nhóm không khác nhau có ý nghĩa thống kê (p=0,20)."

### Bài 2

$d = $ Trước $-$ Sau: {2, 2, 2, 2, 2}. $\bar{d} = 2$. $s_d = 0$ (!).

$\text{SE} = \dfrac{0}{\sqrt{5}} = 0$. $t \to \infty$.

Thực tế: $p \to 0$, reject $H_0$ rõ ràng. Nhưng data này có vấn đề — tất cả difference đều bằng 2, SD $= 0$ là không thực tế (hoặc dữ liệu quá "sạch"). Trong thực tế $s_d = 0 \to$ cần xem lại dữ liệu.

Nếu điều chỉnh giả sử $s_d = 0{,}7$: $\text{SE} = \dfrac{0{,}7}{\sqrt{5}} \approx 0{,}313$. $t = \dfrac{2}{0{,}313} \approx 6{,}39$. df $= 4$. $t^*(4,\ \text{one-sided},\ 0{,}05) = 2{,}132$. $t \gg t^* \to$ **Reject $H_0$**. Điều trị giảm đau có ý nghĩa.

### Bài 3

$\hat{p}_A = \dfrac{42}{300} = 0{,}14$, $\hat{p}_B = \dfrac{57}{300} = 0{,}19$.

$\hat{p}_{pooled} = \dfrac{42+57}{600} = \dfrac{99}{600} = 0{,}165$.

$\text{SE} = \sqrt{0{,}165 \times 0{,}835 \times \left(\dfrac{1}{300}+\dfrac{1}{300}\right)} = \sqrt{0{,}165 \times 0{,}835 \times 0{,}00667} = \sqrt{0{,}000919} \approx 0{,}0303$.

$z = \dfrac{0{,}14-0{,}19}{0{,}0303} \approx \mathbf{-1{,}65}$.

$p = 2 \times P(Z < -1{,}65) \approx 2 \times 0{,}0495 \approx \mathbf{0{,}099}$.

$\alpha=0{,}05$: $p=0{,}099 > 0{,}05 \to$ **Fail to reject $H_0$**. Sự khác biệt chưa có ý nghĩa thống kê.

### Bài 4

Nên dùng **paired t-test**. Lý do: Mỗi cặp sinh đôi chia sẻ gen giống nhau — biến động trong cặp (genetic effect) cần được loại bỏ để thấy rõ hiệu ứng của giáo dục. Dùng independent test sẽ nhầm genetic variability vào "noise" $\to$ giảm power $\to$ khó phát hiện hiệu ứng giáo dục thật.

Đây chính xác là thiết kế **matched pairs**: cặp 1 = {sinh đôi số 1A và 1B}, v.v. Paired test tính $d_i = \text{IQ(giáo dục nâng cao)}_i - \text{IQ(bình thường)}_i$ rồi test $H_0: \mu_d = 0$.

---

## Bài tiếp theo

[Lesson 05: ANOVA & Chi-square](../lesson-05-anova-chisquare/README.md) — Mở rộng so sánh lên ≥ 3 nhóm, và test cho biến phân loại.

## Tham khảo

- OpenIntro Statistics — Chapter 7: Inference for numerical data.
- Welch (1947) "The Generalization of 'Student's' Problem..." — bài gốc về Welch's t.
