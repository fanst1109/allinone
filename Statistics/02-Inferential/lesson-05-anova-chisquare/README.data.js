// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/02-Inferential/lesson-05-anova-chisquare/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05: ANOVA & Chi-square

> **Tầng 2 — Inferential Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích tại sao không dùng nhiều t-test khi so sánh ≥ 3 nhóm (multiple testing problem).
- Thực hiện **one-way ANOVA**: tính SS_between, SS_within, F-statistic.
- Đọc và giải thích **ANOVA table**.
- Thực hiện **chi-square goodness-of-fit test** (so dữ liệu với phân phối lý thuyết).
- Thực hiện **chi-square test of independence** trên contingency table.

## Kiến thức tiền đề

- **Lesson 03 & 04**: Hypothesis testing, t-test — ANOVA là generalization của t-test.
- **Tầng 1 — Lesson 03**: Variance, mean — cần hiểu khái niệm sum of squares.
- **Xác suất**: F-distribution và χ²-distribution (sẽ giải thích trong bài).

---

## 1. Vì sao không dùng nhiều t-test?

> 💡 **Trực giác**: Bạn có 4 nhóm (A, B, C, D) muốn so sánh. Nếu dùng t-test từng cặp, cần C(4,2) = 6 test. Với α = 0.05 mỗi test, xác suất ít nhất 1 false positive là bao nhiêu?

**Tính chính xác** (giả sử các test độc lập):

P(không có false positive nào trong 6 test) = (1 - 0.05)⁶ = 0.95⁶ ≈ 0.735.

P(ít nhất 1 false positive) = 1 - 0.735 = **0.265 ≈ 26.5%**.

Tức là dù không có nhóm nào thật sự khác nhau, ta có ~27% cơ hội tìm được "kết quả có ý nghĩa" chỉ vì may mắn. Đây là **familywise error rate (FWER)** — không kiểm soát được nếu test nhiều lần.

**ANOVA giải quyết** vấn đề này bằng cách dùng **một test duy nhất** cho tất cả nhóm: "Có bất kỳ nhóm nào khác nhau không?"

---

## 2. One-Way ANOVA

### 2.1. Setup

- K nhóm, mỗi nhóm nᵢ quan sát.
- N tổng = n₁ + n₂ + ... + nₖ.
- Grand mean: x̄ = (Σ tất cả quan sát) / N.

**H₀**: μ₁ = μ₂ = ... = μₖ (tất cả nhóm có mean bằng nhau).
**H₁**: Ít nhất một cặp μᵢ ≠ μⱼ.

### 2.2. Ý tưởng: Phân tách variance

> 💡 **Trực giác**: ANOVA hỏi: "Sự biến thiên tổng cộng trong dữ liệu có thể giải thích bằng sự khác biệt giữa các nhóm (between-group) hay chỉ là noise nội tại trong mỗi nhóm (within-group)?"
> - Nếu between >> within: nhóm khác nhau thật sự.
> - Nếu between ≈ within: khác biệt chỉ là noise.

**Phân tách tổng bình phương (Sum of Squares)**:

\`\`\`
SS_total = SS_between + SS_within

SS_between = Σᵢ nᵢ × (x̄ᵢ - x̄)²   (variance giữa nhóm × cỡ nhóm)
SS_within  = ΣᵢΣⱼ (xᵢⱼ - x̄ᵢ)²   (variance nội bộ mỗi nhóm)
SS_total   = ΣᵢΣⱼ (xᵢⱼ - x̄)²    (variance tổng)
\`\`\`

**Bậc tự do**:
- df_between = K - 1
- df_within = N - K
- df_total = N - 1

**Mean Square (MS) = Variance ước lượng**:

\`\`\`
MS_between = SS_between / (K-1)
MS_within  = SS_within  / (N-K)
\`\`\`

**F-statistic**:

\`\`\`
F = MS_between / MS_within
\`\`\`

Dưới H₀, F ~ F(K-1, N-K) — phân phối F. Reject H₀ khi F đủ lớn.

### 2.3. Walk-through bằng số — ANOVA Table đầy đủ

**Tình huống**: Ba chế độ ăn (A, B, C), mỗi chế độ 5 người, đo mức giảm cân sau 8 tuần (kg):

| Chế độ A | Chế độ B | Chế độ C |
|----------|----------|----------|
| 2, 4, 3, 5, 1 | 6, 8, 7, 9, 5 | 4, 5, 3, 6, 2 |

**Bước 1 — Tính mean mỗi nhóm và grand mean**:
- x̄_A = (2+4+3+5+1)/5 = 15/5 = **3.0**
- x̄_B = (6+8+7+9+5)/5 = 35/5 = **7.0**
- x̄_C = (4+5+3+6+2)/5 = 20/5 = **4.0**
- Grand mean x̄ = (15+35+20)/15 = 70/15 = **4.667**

**Bước 2 — Tính SS_between**:

SS_between = 5×(3.0-4.667)² + 5×(7.0-4.667)² + 5×(4.0-4.667)²
= 5×2.779 + 5×5.445 + 5×0.445
= 13.895 + 27.225 + 2.225 = **43.345**

**Bước 3 — Tính SS_within**:

Nhóm A: (2-3)²+(4-3)²+(3-3)²+(5-3)²+(1-3)² = 1+1+0+4+4 = 10
Nhóm B: (6-7)²+(8-7)²+(7-7)²+(9-7)²+(5-7)² = 1+1+0+4+4 = 10
Nhóm C: (4-4)²+(5-4)²+(3-4)²+(6-4)²+(2-4)² = 0+1+1+4+4 = 10

SS_within = 10 + 10 + 10 = **30**

**Bước 4 — ANOVA Table**:

| Source | SS | df | MS | F | p |
|--------|----|----|----|----|---|
| Between groups | 43.345 | 2 | 21.673 | **7.22** | 0.008 |
| Within groups | 30.000 | 12 | 2.500 | | |
| Total | 73.345 | 14 | | | |

**Bước 5 — Quyết định**: F = 7.22 với df₁=2, df₂=12. F*(2,12,α=0.05) = 3.885. F > F* → **Reject H₀**.

Kết luận: "Có ít nhất một chế độ ăn khác biệt có ý nghĩa thống kê (F(2,12)=7.22, p=0.008)."

**Nhưng nhóm nào khác nhóm nào?** ANOVA chỉ nói "có ít nhất một cặp khác" — để biết cặp nào, cần **post-hoc test** (Tukey, Bonferroni). Thấy rõ B có mean = 7 trong khi A = 3 và C = 4.

### 2.4. Assumptions của ANOVA

1. **Normality**: Residuals (xᵢⱼ - x̄ᵢ) ~ Normal. Với n lớn, CLT giúp đỡ.
2. **Homoscedasticity**: Variance bằng nhau trong mọi nhóm (σ₁²=σ₂²=...=σₖ²). Kiểm tra: Levene's test.
3. **Independence**: Các quan sát độc lập.

> ⚠ **Lỗi thường gặp**: Reject H₀ trong ANOVA và kết luận "nhóm B là tốt nhất" mà không làm post-hoc test. Phải dùng Tukey HSD hoặc Bonferroni để xác định cặp nào khác nhau (và correction cho multiple testing).

---

## 3. Chi-square Goodness-of-Fit Test

### 3.1. Mục đích

Kiểm tra liệu phân phối quan sát có khớp với phân phối lý thuyết không.

**H₀**: Dữ liệu tuân theo phân phối X (được chỉ định).
**H₁**: Dữ liệu không tuân theo phân phối đó.

### 3.2. Công thức

\`\`\`
χ² = Σ (Oᵢ - Eᵢ)² / Eᵢ

df = k - 1 - (số tham số ước lượng từ dữ liệu)
\`\`\`

Trong đó: Oᵢ = tần số quan sát (observed), Eᵢ = tần số kỳ vọng (expected) theo H₀.

Điều kiện: Mọi Eᵢ ≥ 5 (nếu không, gộp các ô hoặc dùng Fisher's exact test).

### 3.3. Walk-through bằng số — 3 ví dụ

**Ví dụ 1 — Xúc xắc có fair không?**

Tung 120 lần. Kỳ vọng mỗi mặt: E = 120/6 = 20.

| Mặt | O | E | (O-E)²/E |
|-----|---|---|-----------|
| 1 | 25 | 20 | 1.25 |
| 2 | 17 | 20 | 0.45 |
| 3 | 22 | 20 | 0.20 |
| 4 | 19 | 20 | 0.05 |
| 5 | 21 | 20 | 0.05 |
| 6 | 16 | 20 | 0.80 |
| **Tổng** | 120 | 120 | **2.80** |

χ² = 2.80, df = 5. χ²*(5, 0.05) = 11.07. Vì 2.80 < 11.07 → **Fail to reject H₀**. Xúc xắc có vẻ fair.

**Ví dụ 2 — Phân phối màu kẹo M&M**

Nhà sản xuất tuyên bố: 30% đỏ, 20% cam, 20% vàng, 10% xanh lá, 10% xanh dương, 10% nâu.
Đếm 200 kẹo: {62, 38, 42, 18, 24, 16}.

Eᵢ = 200 × {0.3, 0.2, 0.2, 0.1, 0.1, 0.1} = {60, 40, 40, 20, 20, 20}.

χ² = (62-60)²/60 + (38-40)²/40 + (42-40)²/40 + (18-20)²/20 + (24-20)²/20 + (16-20)²/20
= 0.067 + 0.1 + 0.1 + 0.2 + 0.8 + 0.8 = **2.067**

df = 5. χ²*(5, 0.05) = 11.07. 2.067 << 11.07 → **Fail to reject H₀**. Phân phối màu khớp với tuyên bố.

**Ví dụ 3 — Ngày sinh nhật trong tuần (Hardy-Weinberg)**

Có thuyết rằng ngày sinh phân đều trong tuần. Khảo sát 350 người:

| T2 | T3 | T4 | T5 | T6 | T7 | CN |
|----|----|----|----|----|----|----|
| 47 | 55 | 44 | 51 | 53 | 52 | 48 |

E = 350/7 = 50.

χ² = (47-50)²/50 + (55-50)²/50 + (44-50)²/50 + (51-50)²/50 + (53-50)²/50 + (52-50)²/50 + (48-50)²/50
= 9/50+25/50+36/50+1/50+9/50+4/50+4/50 = 88/50 = **1.76**

df = 6. χ²*(6, 0.05) = 12.59. 1.76 << 12.59 → Fail to reject. Phân phối đều.

---

## 4. Chi-square Test of Independence

### 4.1. Mục đích

Kiểm tra liệu hai biến phân loại có **độc lập** với nhau không trong một contingency table (bảng chéo).

**H₀**: Hai biến độc lập (không có quan hệ).
**H₁**: Hai biến có quan hệ (phụ thuộc nhau).

### 4.2. Công thức

**Expected frequency** cho ô (i,j):

\`\`\`
Eᵢⱼ = (Row total i) × (Column total j) / Grand total
\`\`\`

\`\`\`
χ² = Σ (Oᵢⱼ - Eᵢⱼ)² / Eᵢⱼ
df = (r-1)(c-1)   (r=số hàng, c=số cột)
\`\`\`

### 4.3. Walk-through bằng số — 2 ví dụ

**Ví dụ 1 — Giới tính và lựa chọn nhạc**

Khảo sát 200 người: giới tính (Nam/Nữ) × nhạc yêu thích (Pop/Rock/Classical):

| | Pop | Rock | Classical | **Total** |
|-|-----|------|-----------|---------|
| Nam | 30 | 45 | 15 | **90** |
| Nữ | 55 | 25 | 30 | **110** |
| **Total** | 85 | 70 | 45 | **200** |

**Tính Expected**:

| | Pop | Rock | Classical |
|-|-----|------|-----------|
| Nam | 90×85/200=38.25 | 90×70/200=31.5 | 90×45/200=20.25 |
| Nữ | 110×85/200=46.75 | 110×70/200=38.5 | 110×45/200=24.75 |

**Tính χ²**:

χ² = (30-38.25)²/38.25 + (45-31.5)²/31.5 + (15-20.25)²/20.25
   + (55-46.75)²/46.75 + (25-38.5)²/38.5 + (30-24.75)²/24.75

= 1.782 + 5.786 + 1.360 + 1.459 + 4.733 + 1.112 = **16.23**

df = (2-1)(3-1) = 2. χ²*(2, 0.05) = 5.991. 16.23 >> 5.991 → **Reject H₀**.

Kết luận: "Giới tính và sở thích nhạc có quan hệ (χ²=16.23, df=2, p<0.001)."

**Ví dụ 2 — Vaccine và kết quả dịch bệnh**

| | Mắc bệnh | Không mắc | Total |
|-|----------|-----------|-------|
| Tiêm | 20 | 380 | 400 |
| Không tiêm | 80 | 320 | 400 |
| Total | 100 | 700 | 800 |

E(Tiêm+Mắc) = 400×100/800 = 50, E(Tiêm+Không) = 400×700/800 = 350.
E(KhôngTiêm+Mắc) = 50, E(KhôngTiêm+Không) = 350.

χ² = (20-50)²/50 + (380-350)²/350 + (80-50)²/50 + (320-350)²/350
= 18 + 2.571 + 18 + 2.571 = **41.14**

df = 1. χ²*(1, 0.05) = 3.841. 41.14 >> 3.841 → **Reject H₀**. Vaccine và bệnh không độc lập — vaccine có hiệu quả.

---

## 5. So sánh các test

| Test | Biến phụ thuộc | Biến độc lập | Dùng khi |
|------|---------------|--------------|---------|
| t-test | Liên tục (mean) | 2 nhóm | So sánh mean 2 nhóm |
| One-way ANOVA | Liên tục (mean) | ≥ 3 nhóm | So sánh mean nhiều nhóm |
| χ² goodness-of-fit | Phân loại | — | So với phân phối lý thuyết |
| χ² independence | Phân loại | Phân loại | Hai biến phân loại có quan hệ không |

> 📝 **Tóm tắt**
> - Nhiều t-test → Type I error tăng → dùng ANOVA thay thế.
> - ANOVA phân tách variance: F = MS_between/MS_within. Lớn → reject H₀.
> - ANOVA chỉ nói "có ít nhất một cặp khác"; dùng post-hoc test để biết cặp nào.
> - Chi-square dùng cho biến phân loại: goodness-of-fit (so lý thuyết) hoặc independence (contingency table).
> - Điều kiện chi-square: Eᵢⱼ ≥ 5 trong mọi ô.

---

## Bài tập

1. Ba loại phân bón, mỗi loại 4 lô ruộng, năng suất (tấn/ha): A={3,4,3,4}, B={5,6,5,6}, C={4,4,5,5}. Chạy ANOVA tay: tính SS_between, SS_within, F. Kết luận (α=0.05, F*(2,9)=4.26).

2. Tung xúc xắc 60 lần: {12, 8, 11, 9, 10, 10}. Chi-square goodness-of-fit, kiểm tra xúc xắc có fair không (α=0.05).

3. Contingency table — Kết quả thi (Pass/Fail) vs Học thêm (Có/Không): {Pass+Có=80, Pass+Không=60, Fail+Có=20, Fail+Không=40}. Kiểm tra độc lập (α=0.05).

## Lời giải chi tiết

### Bài 1

Means: x̄_A = 3.5, x̄_B = 5.5, x̄_C = 4.5. Grand mean x̄ = (14+22+18)/12 = 54/12 = 4.5.

SS_between = 4×(3.5-4.5)² + 4×(5.5-4.5)² + 4×(4.5-4.5)² = 4×1 + 4×1 + 4×0 = **8**

SS_within:
A: (3-3.5)²×2+(4-3.5)²×2 = 0.25×2+0.25×2 = 1
B: (5-5.5)²×2+(6-5.5)²×2 = 0.25×2+0.25×2 = 1
C: (4-4.5)²×2+(5-4.5)²×2 = 0.25×2+0.25×2 = 1
SS_within = **3**

MS_between = 8/2 = 4. MS_within = 3/9 = 0.333.
F = 4/0.333 = **12.0**. F*(2,9)=4.26. F=12 > 4.26 → **Reject H₀**. Phân bón ảnh hưởng tới năng suất.

### Bài 2

E = 60/6 = 10 mỗi mặt.

χ² = (12-10)²/10 + (8-10)²/10 + (11-10)²/10 + (9-10)²/10 + (10-10)²/10 + (10-10)²/10
= 4/10 + 4/10 + 1/10 + 1/10 + 0 + 0 = 10/10 = **1.0**

df = 5. χ²*(5, 0.05) = 11.07. 1.0 << 11.07 → **Fail to reject H₀**. Xúc xắc fair.

### Bài 3

Observed: O = {80, 60, 20, 40}. Row totals: {140, 60}. Col totals: {100, 100}. Grand = 200.

E(Pass+Có) = 140×100/200 = 70. E(Pass+Không) = 140×100/200 = 70.
E(Fail+Có) = 60×100/200 = 30. E(Fail+Không) = 60×100/200 = 30.

χ² = (80-70)²/70 + (60-70)²/70 + (20-30)²/30 + (40-30)²/30
= 100/70 + 100/70 + 100/30 + 100/30
= 1.429 + 1.429 + 3.333 + 3.333 = **9.524**

df = 1. χ²*(1, 0.05) = 3.841. 9.524 > 3.841 → **Reject H₀**.

Học thêm và kết quả thi có quan hệ (p ≈ 0.002).

---

## Bài tiếp theo

[Lesson 06: P-value, Power, Effect Size](../lesson-06-pvalue-power-effect/README.md) — Hiểu đúng p-value, tránh các bẫy phổ biến nhất.

## Tham khảo

- OpenIntro Statistics — Chapters 8 (Chi-square) & 9 (ANOVA).
- Field (2013), Discovering Statistics — Chapters on ANOVA.
`;
