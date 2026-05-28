// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-04-two-sample-tests/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04: Kiểm định 2 mẫu (Two-Sample Tests)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Thực hiện **independent two-sample t-test**: biết khi nào dùng pooled t, khi nào dùng Welch's t.
- Thực hiện **paired t-test** (before/after, matched pairs) và phân biệt với independent t-test.
- Áp dụng hai test này vào **A/B testing** thực tế.
- Kiểm tra **assumption** của t-test (normality, independence, variance equality).
- Tính CI cho sự khác biệt giữa hai mean: μ₁ - μ₂.

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

\`\`\`
H₀: μ₁ - μ₂ = 0  (hai nhóm có mean bằng nhau)
H₁: μ₁ - μ₂ ≠ 0  (two-sided)  hoặc  > 0 / < 0 (one-sided)
\`\`\`

### 2.2. Hai phiên bản: Pooled vs Welch

**Pooled t-test** (Student's t): Giả định variance hai nhóm bằng nhau (σ₁² = σ₂²).

\`\`\`
Pooled variance: sp² = [(n₁-1)s₁² + (n₂-1)s₂²] / (n₁+n₂-2)

SE_pooled = sp × √(1/n₁ + 1/n₂)

t = (x̄₁ - x̄₂) / SE_pooled,  df = n₁+n₂-2
\`\`\`

**Welch's t-test**: Không giả định variance bằng nhau. **Đây là lựa chọn mặc định và an toàn hơn**.

\`\`\`
SE_welch = √(s₁²/n₁ + s₂²/n₂)

t = (x̄₁ - x̄₂) / SE_welch

df ≈ (s₁²/n₁ + s₂²/n₂)² / [(s₁²/n₁)²/(n₁-1) + (s₂²/n₂)²/(n₂-1)]
    (Welch-Satterthwaite approximation, thường không phải số nguyên)
\`\`\`

> 💡 **Khi nào dùng gì**: Trong thực tế, luôn dùng **Welch's t** (mặc định trong R là \`var.equal=FALSE\`, Python scipy là mặc định). Pooled chỉ dùng khi có lý thuyết rõ ràng rằng variance bằng nhau, hoặc đề bài yêu cầu. Welch's không kém hơn pooled khi variance thực sự bằng nhau, nhưng tốt hơn hẳn khi variance khác nhau.

### 2.3. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — A/B test session time (Welch)**:
- Group A (control): n₁=100, x̄₁=4.2, s₁=1.5
- Group B (treatment): n₂=100, x̄₂=4.8, s₂=1.8
- H₀: μ₁=μ₂, H₁: μ₁≠μ₂, α=0.05
- SE_welch = √(1.5²/100 + 1.8²/100) = √(0.0225+0.0324) = √0.0549 ≈ **0.2343**
- t = (4.2-4.8)/0.2343 = **-2.561**
- df ≈ (0.0225+0.0324)² / [(0.0225)²/99 + (0.0324)²/99] ≈ 193
- t*(193, two-sided, 0.05) ≈ 1.972. |t|=2.561 > 1.972 → **Reject H₀**.
- p ≈ 0.011. "Tính năng mới tăng session time có ý nghĩa thống kê (p=0.011)."

**Ví dụ 2 — So sánh điểm thi hai lớp (pooled, variance bằng nhau)**:
- Lớp A: n₁=20, x̄₁=72, s₁=10. Lớp B: n₂=25, x̄₂=76, s₂=9.
- sp² = [(20-1)×100 + (25-1)×81]/(20+25-2) = [1900+1944]/43 = 3844/43 ≈ 89.4 → sp ≈ 9.455
- SE = 9.455 × √(1/20+1/25) = 9.455 × √(0.09) = 9.455 × 0.3 = **2.836**
- t = (72-76)/2.836 ≈ **-1.411**. df = 43.
- t*(43, two-sided, 0.05) ≈ 2.017. |t| = 1.411 < 2.017 → **Fail to reject H₀**.

**Ví dụ 3 — One-sided (thuốc hạ đường huyết)**:
- Nhóm điều trị: n₁=30, x̄₁=120, s₁=15. Nhóm chứng: n₂=30, x̄₂=130, s₂=18.
- H₀: μ₁≥μ₂, H₁: μ₁<μ₂ (thuốc giảm HA).
- SE_welch = √(225/30+324/30) = √(7.5+10.8) = √18.3 ≈ 4.278
- t = (120-130)/4.278 ≈ **-2.338**
- One-sided left p ≈ 0.012 < 0.05 → **Reject H₀**. Thuốc có hiệu quả hạ HA.

**Ví dụ 4 — CI cho μ₁-μ₂**:
- Dùng ví dụ 1: x̄₁-x̄₂ = -0.6, SE_welch = 0.2343, df≈193, t* ≈ 1.972.
- 95% CI: -0.6 ± 1.972 × 0.2343 = -0.6 ± 0.462 = **[-1.062, -0.138]**
- Diễn giải: Ta ước lượng Group B cao hơn A từ 0.14 đến 1.06 phút (95% CI không chứa 0 → reject H₀ ✓).

---

## 3. Paired T-Test

### 3.1. Ý tưởng

> 💡 **Trực giác**: Paired test đo **sự thay đổi** của cùng một đối tượng, loại bỏ variability giữa các cá thể. Giống như: để so sánh hai loại giày, tốt nhất là cho mỗi người thử CÙNG hai đôi — không phải 10 người thử giày A và 10 người khác thử giày B (vì kích chân, dáng đi mỗi người khác nhau).

**Khi nào dùng**:
- Trước/sau can thiệp trên cùng đối tượng (before/after drug, before/after training).
- Matched pairs: mỗi đơn vị trong nhóm 1 được match với một đơn vị cụ thể trong nhóm 2.

### 3.2. Quy trình

1. Tính **difference** dᵢ = x₁ᵢ - x₂ᵢ cho mỗi cặp.
2. Tính d̄ = mean của các dᵢ, sᵈ = SD của các dᵢ.
3. Thực hiện **one-sample t-test** trên dᵢ với H₀: μᵈ = 0.

\`\`\`
t = d̄ / (sᵈ / √n)
df = n - 1   (n là số cặp)
\`\`\`

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

d̄ = (2+3+2+4+1+4+3+3)/8 = 22/8 = **2.75 kg**

Variance của d: s²ᵈ = Σ(dᵢ-d̄)²/(n-1) = [(0.75²)+(0.25²)+(0.75²)+(1.25²)+(1.75²)+(1.25²)+(0.25²)+(0.25²)] / 7 = [0.5625+0.0625+0.5625+1.5625+3.0625+1.5625+0.0625+0.0625]/7 = 7.5/7 ≈ 1.071 → sᵈ ≈ 1.035.

SE = 1.035/√8 ≈ 0.366.

H₀: μᵈ = 0, H₁: μᵈ > 0 (one-sided: chứng minh giảm cân). α = 0.05.

t = 2.75/0.366 ≈ **7.51**. df = 7. t*(7, one-sided, 0.05) = 1.895.

t = 7.51 >> 1.895 → **Reject H₀**. p << 0.001. Chương trình có hiệu quả giảm cân rõ rệt.

**Ví dụ 2 — So sánh paired vs independent để thấy sự khác biệt**:
- Cùng dữ liệu ví dụ 1, nếu nhầm dùng independent t-test:
- Group 1 (Trước): x̄=80.5, s₁=9.02. Group 2 (Sau): x̄=77.75, s₂=8.60.
- SE_welch ≈ √(9.02²/8+8.60²/8) ≈ √(10.17+9.25) ≈ √19.42 ≈ 4.406.
- t = (80.5-77.75)/4.406 ≈ **0.624**. df ≈ 14. p ≈ 0.54.
- Kết quả: **Fail to reject H₀** (!!) — ngược với kết quả paired!
- Lý do: Independent test không loại bỏ variability giữa người (người cao vs thấp). Paired test chỉ nhìn vào sự thay đổi dᵢ → test mạnh hơn nhiều.

**Ví dụ 3 — Two-sided paired**:
- 6 thiết bị, đo bằng 2 phương pháp A và B. d̄ = 0.8, sᵈ = 1.5, n = 6.
- H₀: μᵈ = 0, H₁: μᵈ ≠ 0. α = 0.05.
- t = 0.8/(1.5/√6) = 0.8/0.612 ≈ 1.307. df = 5. t*(5) = 2.571.
- p ≈ 0.25 > 0.05 → Fail to reject H₀. Hai phương pháp đo không khác nhau.

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
- Metric: conversion rate (tỷ lệ click → mua).
- A: 500 user, 45 conversions → p̂_A = 0.09.
- B: 500 user, 62 conversions → p̂_B = 0.124.
- H₀: p_A = p_B. Two-sample z-test cho proportion:
  - p̂_pooled = (45+62)/1000 = 0.107.
  - SE = √(0.107×0.893×(1/500+1/500)) = √(0.107×0.893×0.004) ≈ 0.0195.
  - z = (0.09-0.124)/0.0195 ≈ -1.744. p ≈ 0.081.
  - Với α=0.05 → **Fail to reject** (p=0.081). Với α=0.10 → Reject.
  - Kết luận: "Chưa đủ bằng chứng tại α=0.05; nếu dùng α=0.10 thì B tốt hơn. Cần thêm dữ liệu hoặc quyết định theo business judgment."

---

## Bài tập

1. Hai nhóm học sinh: nhóm A (n=15, x̄=78, s=10) và nhóm B (n=18, x̄=83, s=12). Dùng Welch's t-test, kiểm tra xem hai nhóm có khác nhau không (α=0.05, two-sided). [Dùng df ≈ 29.]

2. Dữ liệu trước/sau điều trị cho 5 bệnh nhân (điểm đau 0-10): Trước: {7,8,6,9,7}, Sau: {5,6,4,7,5}. Kiểm tra điều trị có giảm đau không (α=0.05, one-sided).

3. A/B test: Group A 300 user, 42 conversions; Group B 300 user, 57 conversions. Dùng two-sample z-test cho proportion (α=0.05, two-sided).

4. (Tư duy) Bạn có dữ liệu: IQ của 30 cặp sinh đôi (twin) — một người được giáo dục nâng cao, một người không. Nên dùng paired hay independent t-test? Giải thích.

## Lời giải chi tiết

### Bài 1

H₀: μ_A = μ_B, H₁: μ_A ≠ μ_B. α=0.05.

SE_welch = √(10²/15 + 12²/18) = √(100/15 + 144/18) = √(6.667 + 8.0) = √14.667 ≈ 3.830.

t = (78-83)/3.830 ≈ **-1.306**. df ≈ 29.

t*(29, two-sided, 0.05) = 2.045. |t| = 1.306 < 2.045 → **Fail to reject H₀**.

p ≈ 0.201. "Hai nhóm không khác nhau có ý nghĩa thống kê (p=0.20)."

### Bài 2

d = Trước - Sau: {2, 2, 2, 2, 2}. d̄ = 2. sᵈ = 0 (!).

SE = 0/√5 = 0. t → ∞.

Thực tế: p → 0, reject H₀ rõ ràng. Nhưng data này có vấn đề — tất cả difference đều bằng 2, SD = 0 là không thực tế (hoặc dữ liệu quá "sạch"). Trong thực tế sᵈ = 0 → cần xem lại dữ liệu.

Nếu điều chỉnh giả sử sᵈ = 0.7: SE = 0.7/√5 ≈ 0.313. t = 2/0.313 ≈ 6.39. df = 4. t*(4, one-sided, 0.05) = 2.132. t >> t* → **Reject H₀**. Điều trị giảm đau có ý nghĩa.

### Bài 3

p̂_A = 42/300 = 0.14, p̂_B = 57/300 = 0.19.

p̂_pooled = (42+57)/600 = 99/600 = 0.165.

SE = √(0.165×0.835×(1/300+1/300)) = √(0.165×0.835×0.00667) = √0.000919 ≈ 0.0303.

z = (0.14-0.19)/0.0303 ≈ **-1.65**.

p = 2 × P(Z < -1.65) ≈ 2 × 0.0495 ≈ **0.099**.

α=0.05: p=0.099 > 0.05 → **Fail to reject H₀**. Sự khác biệt chưa có ý nghĩa thống kê.

### Bài 4

Nên dùng **paired t-test**. Lý do: Mỗi cặp sinh đôi chia sẻ gen giống nhau — biến động trong cặp (genetic effect) cần được loại bỏ để thấy rõ hiệu ứng của giáo dục. Dùng independent test sẽ nhầm genetic variability vào "noise" → giảm power → khó phát hiện hiệu ứng giáo dục thật.

Đây chính xác là thiết kế **matched pairs**: cặp 1 = {sinh đôi số 1A và 1B}, v.v. Paired test tính dᵢ = IQ(giáo dục nâng cao)ᵢ − IQ(bình thường)ᵢ rồi test H₀: μᵈ = 0.

---

## Bài tiếp theo

[Lesson 05: ANOVA & Chi-square](../lesson-05-anova-chisquare/README.md) — Mở rộng so sánh lên ≥ 3 nhóm, và test cho biến phân loại.

## Tham khảo

- OpenIntro Statistics — Chapter 7: Inference for numerical data.
- Welch (1947) "The Generalization of 'Student's' Problem..." — bài gốc về Welch's t.
`;
