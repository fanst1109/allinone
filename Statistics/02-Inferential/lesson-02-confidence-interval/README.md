# Lesson 02: Khoảng tin cậy (Confidence Interval)

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phát biểu đúng ý nghĩa của confidence interval (CI) 95% — tránh cách hiểu sai phổ biến nhất.
- Tính z-CI cho mean khi σ đã biết, và t-CI khi σ không biết.
- Giải thích t-distribution và bậc tự do (degrees of freedom — df), hiểu tại sao cần t thay vì z.
- Tính CI cho proportion (tỷ lệ).
- Mô tả ý tưởng bootstrap CI và khi nào nó có lợi hơn CI tham số.

## Kiến thức tiền đề

- **Lesson 01 (Tầng 2)**: Sampling distribution, SE = σ/√n, CLT — tất cả cơ sở của CI.
- **Tầng 1 — Lesson 03**: Variance, SD, z-score — [`../../../Statistics/01-Descriptive/lesson-03-dispersion/`](../../../Statistics/01-Descriptive/lesson-03-dispersion/).
- **Normal distribution**: Vectors/05-Probability Lesson 05 — cần hiểu z-score và Φ(z).

---

## 1. Bài toán mở đầu: ước lượng có sai số

> 💡 **Trực giác**: Bạn đo 100 người, x̄ = 163.5 cm. Bạn báo cáo "chiều cao trung bình là 163.5 cm". Câu hỏi tự nhiên: *chính xác tới đâu?* Không ai tin "đúng chính xác 163.5 cm" — nhưng "163.5 ± 2 cm" thì nghe có lý hơn. Confidence interval chính là cách tính cái "± 2 cm" đó một cách chặt chẽ về mặt thống kê.

**Sai lầm phổ biến cần tránh ngay từ đầu**:

Nhiều người đọc "CI 95% = [161, 166]" và nghĩ: *"Xác suất để μ nằm trong [161, 166] là 95%."* Điều này **sai về mặt logic thống kê tần suất (frequentist)**. μ là một hằng số, không có xác suất. Câu đúng là:

> **"Nếu ta lặp lại quy trình lấy mẫu n=100 rất nhiều lần và mỗi lần tính một CI, thì 95% số CI đó sẽ chứa μ thật."**

---

## 2. Z-CI: Confidence Interval khi σ đã biết

### 2.1. Công thức

```
CI = x̄ ± z* × (σ/√n)
CI = x̄ ± z* × SE
```

Trong đó z* là **critical value** tương ứng với mức tin cậy (confidence level):

| Confidence level | α | z* |
|-----------------|---|----|
| 90% | 0.10 | 1.645 |
| 95% | 0.05 | 1.960 |
| 99% | 0.01 | 2.576 |

**Tại sao z* = 1.96 cho 95%?** Vì P(-1.96 ≤ Z ≤ 1.96) = 0.95 trong N(0,1). Kiểm tra: Φ(1.96) = 0.975 → diện tích hai đuôi = 2 × 0.025 = 0.05 → diện tích giữa = 0.95 ✓.

### 2.2. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Chiều cao học sinh**:
- μ không biết, σ = 8 cm (từ lịch sử), n = 64, x̄ = 163.5
- SE = 8/√64 = 1.0
- 95% CI: 163.5 ± 1.96 × 1.0 = **[161.54, 165.46]**
- Kiểm tra margin of error: 1.96 × 1 = 1.96 cm.

**Ví dụ 2 — Session time**:
- σ = 3 phút, n = 100, x̄ = 4.3
- SE = 3/10 = 0.3
- 99% CI: 4.3 ± 2.576 × 0.3 = 4.3 ± 0.773 = **[3.527, 5.073]**
- Nhận xét: Tăng confidence từ 95% lên 99% → CI rộng hơn (1.546 thay vì 1.176 phút).

**Ví dụ 3 — Ảnh hưởng của n**:
- σ = 10, x̄ = 50
- n = 25: SE = 2.0 → 95% CI = [46.08, 53.92], width = 7.84
- n = 100: SE = 1.0 → 95% CI = [48.04, 51.96], width = 3.92
- n tăng 4× → CI hẹp lại 2× (do √n).

**Ví dụ 4 — 90% CI vs 95% CI**:
- σ = 5, n = 36, x̄ = 20. SE = 5/6 ≈ 0.833.
- 90% CI: 20 ± 1.645 × 0.833 = **[18.63, 21.37]**, width = 2.74
- 95% CI: 20 ± 1.960 × 0.833 = **[18.37, 21.63]**, width = 3.26
- Tăng confidence → CI rộng hơn. Trade-off: muốn chắc hơn thì phải chấp nhận "nói ít chính xác hơn".

> ⚠ **Lỗi thường gặp**: "Rộng CI là tốt vì chắc chắn hơn." Sai quan điểm. CI rộng = **ít informative**. CI [0, 200] cho chiều cao bao gồm mọi giá trị thực tế — đúng 100% nhưng vô nghĩa. Mục tiêu là CI đủ hẹp (precision) với confidence đủ cao (reliability).

---

## 3. T-CI: Confidence Interval khi σ không biết

### 3.1. Tại sao cần t-distribution?

Trong thực tế, σ gần như không bao giờ biết trước. Khi ta thay σ bằng s (sample SD), thống kê:

```
t = (x̄ - μ) / (s/√n)
```

**không còn theo N(0,1)** mà theo **t-distribution với df = n-1 bậc tự do**.

> 💡 **Trực giác**: Khi dùng s thay σ, ta đang ước lượng thêm một tham số nữa từ mẫu → có thêm nguồn không chắc chắn. T-distribution "đền bù" sự không chắc chắn này bằng cách có đuôi dày hơn Normal → critical value t* > z* (để CI rộng hơn, phản ánh đúng sự không chắc chắn).

**(a) Là gì**: T-distribution có 1 tham số là df (degrees of freedom). Khi df → ∞, t-distribution tiến về N(0,1).

**(b) Vì sao df = n-1**: Khi tính s, ta đã dùng x̄ — mất đi 1 bậc tự do ("ràng buộc" rằng Σ(xᵢ - x̄) = 0). Nên từ n quan sát chỉ còn n-1 thông tin độc lập để ước lượng phân tán.

### 3.2. Công thức t-CI

```
CI = x̄ ± t*(df) × (s/√n)
```

Trong đó t*(df) = critical value của t-distribution với df = n-1 tại mức tin cậy mong muốn.

So sánh t* với z* (cho 95% CI):

| n | df = n-1 | t* (95%) | z* |
|---|----------|----------|-----|
| 5 | 4 | 2.776 | 1.960 |
| 10 | 9 | 2.262 | 1.960 |
| 20 | 19 | 2.093 | 1.960 |
| 30 | 29 | 2.045 | 1.960 |
| 100 | 99 | 1.984 | 1.960 |
| ∞ | ∞ | 1.960 | 1.960 |

**Nhận xét**: Với n ≥ 30, t* ≈ z* (sai số < 2%). Thực tế, **luôn dùng t-CI** (kể cả khi n lớn) — không bao giờ sai, đôi khi cần thiết.

### 3.3. Walk-through bằng số — 4 ví dụ

**Ví dụ 1 — Mẫu nhỏ**:
- n = 8, x̄ = 75, s = 6. df = 7.
- t*(7, 95%) = 2.365 (tra bảng).
- SE = 6/√8 ≈ 2.121.
- 95% CI: 75 ± 2.365 × 2.121 = 75 ± 5.016 = **[69.98, 80.02]**

**Ví dụ 2 — n = 25**:
- n = 25, x̄ = 50, s = 10. df = 24.
- t*(24, 95%) = 2.064.
- SE = 10/5 = 2.
- 95% CI: 50 ± 2.064 × 2 = 50 ± 4.128 = **[45.87, 54.13]**

**Ví dụ 3 — n = 100**:
- n = 100, x̄ = 8.5, s = 2.4. df = 99.
- t*(99, 95%) ≈ 1.984 ≈ 1.96.
- SE = 2.4/10 = 0.24.
- 95% CI: 8.5 ± 1.984 × 0.24 = **[8.024, 8.976]**

**Ví dụ 4 — So sánh với z-CI**:
- Giả sử biết σ = 2.4 (ví dụ 3), CI sẽ là: 8.5 ± 1.96 × 0.24 = **[8.029, 8.971]** — gần như giống hệt t-CI vì n=100 đủ lớn.
- Nhưng với n = 8 (ví dụ 1): nếu dùng z* = 1.96 thay vì t* = 2.365 → CI hẹp hơn **sai** (underestimate sự không chắc chắn).

---

## 4. CI cho Proportion (Tỷ lệ)

### 4.1. Công thức

```
p̂ ± z* × √(p̂(1-p̂)/n)
```

Điều kiện áp dụng: n×p̂ ≥ 10 và n×(1-p̂) ≥ 10 (đủ sự kiện thành công VÀ thất bại).

### 4.2. Walk-through bằng số

**Ví dụ 1**: Khảo sát 400 người, 220 thích sản phẩm A (p̂ = 0.55).
- SE = √(0.55 × 0.45 / 400) = √(0.2475/400) = √0.000619 ≈ 0.0249
- 95% CI: 0.55 ± 1.96 × 0.0249 = **[0.501, 0.599]**
- Kiểm tra điều kiện: 400×0.55=220≥10 ✓, 400×0.45=180≥10 ✓.

**Ví dụ 2**: n=1000, p̂ = 0.08 (tỷ lệ churn).
- SE = √(0.08×0.92/1000) = √0.0000736 ≈ 0.00858
- 95% CI: 0.08 ± 1.96×0.00858 = **[0.063, 0.097]**

> ⚠ **Lỗi thường gặp**: Nếu p̂ = 0.02 và n = 100 → n×p̂ = 2 < 10 → điều kiện vi phạm, z-CI không tin cậy. Dùng Clopper-Pearson (exact) CI hoặc bootstrap trong trường hợp này.

---

## 5. Bootstrap CI — Khi không muốn giả định phân phối

> 💡 **Trực giác**: Thay vì dùng công thức lý thuyết (giả định Normal), bootstrap tự hỏi: *"Nếu tôi lấy mẫu lại từ dữ liệu mình đang có, thống kê sẽ dao động bao nhiêu?"* Bằng cách resample WITH replacement hàng nghìn lần, ta tạo ra phân phối thực nghiệm của thống kê — rồi lấy percentile 2.5% và 97.5% làm CI.

**Thuật toán bootstrap CI**:
1. Có mẫu gốc X = {x₁, ..., xₙ}.
2. Lặp B=1000 lần: lấy mẫu bootstrapX* từ X WITH replacement (n phần tử), tính x̄*.
3. Có B giá trị x̄*. Lấy percentile 2.5% và 97.5% → đó là 95% percentile CI.

**Ưu điểm**:
- Không giả định phân phối.
- Hoạt động cho mọi thống kê (median, correlation, ratio...).
- Tốt hơn khi phân phối lệch hoặc n nhỏ.

**Hạn chế**: Cần tính toán nhiều (nhưng không vấn đề với máy tính hiện đại). Không tốt khi n rất nhỏ (< 20) vì resample từ mẫu nhỏ không phản ánh đủ sự biến thiên của tổng thể.

(Bootstrap sẽ học kỹ hơn ở Lesson 07 — Resampling.)

---

## 6. Quan hệ CI ↔ Hypothesis Test

CI 95% cho μ và hypothesis test α = 0.05 cho μ có **duality (quan hệ đối ngẫu)**:

- Nếu 95% CI cho μ **không chứa** giá trị μ₀ → two-sided test tại α=0.05 **sẽ reject H₀: μ=μ₀**.
- Nếu CI **chứa** μ₀ → test **không reject H₀**.

**Ví dụ**: 95% CI = [161.54, 165.46]. Nếu ta test H₀: μ=160 → 160 không trong CI → reject H₀ (α=0.05). Nếu test H₀: μ=163 → 163 trong CI → không reject H₀.

Duality này hữu ích vì CI cung cấp thông tin phong phú hơn: không chỉ "reject hay không" mà còn cho biết **range giá trị plausible** của μ.

---

## Bài tập

1. Khảo sát 50 đơn hàng, x̄ = 235.000 VND, s = 45.000 VND. Tính 95% t-CI cho mean. (Dùng t*(49) ≈ 2.010.)

2. Cùng bài toán trên, nếu σ = 45.000 (đã biết), tính 95% z-CI. So sánh với t-CI.

3. Cuộc khảo sát online có 800 người tham gia, 312 người nói "sẽ mua". Tính 99% CI cho tỷ lệ mua (p).

4. (Tư duy) Một nghiên cứu báo cáo 95% CI = [1.2, 4.8] cho tham số β. Nhà nghiên cứu kết luận "P(β ∈ [1.2, 4.8]) = 0.95." Giải thích tại sao phát biểu này sai, và phát biểu đúng là gì.

5. Để margin of error ≤ 0.03 với 95% CI cho proportion (p̂ ≈ 0.5), cần n tối thiểu là bao nhiêu?

## Lời giải chi tiết

### Bài 1

SE = s/√n = 45000/√50 = 45000/7.071 ≈ **6364 VND**.

df = 49, t*(49, 95%) ≈ 2.010.

95% t-CI: 235000 ± 2.010 × 6364 = 235000 ± 12791 = **[222.209, 247.791 nghìn VND]**

### Bài 2

SE = σ/√n = 45000/7.071 ≈ 6364 VND.

95% z-CI: 235000 ± 1.960 × 6364 = 235000 ± 12473 = **[222.527, 247.473 nghìn VND]**

**So sánh**: z-CI hẹp hơn t-CI một chút (12473 vs 12791) vì z* = 1.960 < t*(49) = 2.010. Sự khác biệt nhỏ vì n = 50 đủ lớn.

### Bài 3

p̂ = 312/800 = 0.39.

SE = √(0.39 × 0.61 / 800) = √(0.2379/800) = √0.000297 ≈ **0.01724**

Kiểm tra: 800×0.39=312≥10 ✓, 800×0.61=488≥10 ✓.

z*(99%) = 2.576.

99% CI: 0.39 ± 2.576 × 0.01724 = 0.39 ± 0.04438 = **[0.346, 0.434]**

### Bài 4

Phát biểu sai vì theo thống kê frequentist, **μ là một hằng số cố định** (không phải biến ngẫu nhiên). Hỏi "xác suất để hằng số nằm trong khoảng" là không có nghĩa trong framework này.

**Phát biểu đúng**: "Nếu ta lặp lại quy trình thu thập dữ liệu và tính CI 95% rất nhiều lần, 95% các CI đó sẽ chứa giá trị thật của β." Hoặc: "CI [1.2, 4.8] được tính bằng phương pháp mà 95% thời gian sẽ cho CI chứa β."

(Lưu ý: Trong framework Bayesian, phát biểu "xác suất posterior của β" có ý nghĩa — nhưng đó là ngôn ngữ khác. Học ở Tầng 3 Lesson 01.)

### Bài 5

Margin of error (ME) = z* × √(p̂(1-p̂)/n) ≤ 0.03.

Worst case (ME lớn nhất) khi p̂ = 0.5: ME = 1.96 × √(0.25/n) ≤ 0.03.

→ √(0.25/n) ≤ 0.03/1.96 = 0.01531.

→ 0.25/n ≤ 0.01531² = 0.0002344.

→ n ≥ 0.25/0.0002344 ≈ **1067**.

**Kết quả**: n tối thiểu = **1067**. (Rule of thumb cho poll 3% margin: ~1000 người — phù hợp!)

---

## Bài tiếp theo

[Lesson 03: Kiểm định 1 mẫu](../lesson-03-hypothesis-testing-1sample/README.md) — Từ CI tới hypothesis test: H₀, H₁, p-value, vùng reject.

## Tham khảo

- OpenIntro Statistics — Chapter 5: Confidence intervals for a proportion, Chapter 7: Inference for numerical data (t-CI).
- Statistics (Freedman, Pisani, Purves) — Chapter 26.
