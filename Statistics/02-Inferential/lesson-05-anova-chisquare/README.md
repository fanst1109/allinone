# Lesson 05: ANOVA & Chi-square

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

$P(\text{không có false positive nào trong 6 test}) = (1 - 0{,}05)^6 = 0{,}95^6 \approx 0{,}735$.

$P(\text{ít nhất 1 false positive}) = 1 - 0{,}735 = \mathbf{0{,}265 \approx 26{,}5\%}$.

Tức là dù không có nhóm nào thật sự khác nhau, ta có ~27% cơ hội tìm được "kết quả có ý nghĩa" chỉ vì may mắn. Đây là **familywise error rate (FWER)** — không kiểm soát được nếu test nhiều lần.

**ANOVA giải quyết** vấn đề này bằng cách dùng **một test duy nhất** cho tất cả nhóm: "Có bất kỳ nhóm nào khác nhau không?"

---

## 2. One-Way ANOVA

### 2.1. Setup

- $K$ nhóm, mỗi nhóm $n_i$ quan sát.
- $N$ tổng $= n_1 + n_2 + \ldots + n_K$.
- Grand mean: $\bar{x} = \dfrac{\sum \text{tất cả quan sát}}{N}$.

**$H_0$**: $\mu_1 = \mu_2 = \ldots = \mu_K$ (tất cả nhóm có mean bằng nhau).
**$H_1$**: Ít nhất một cặp $\mu_i \neq \mu_j$.

### 2.2. Ý tưởng: Phân tách variance

> 💡 **Trực giác**: ANOVA hỏi: "Sự biến thiên tổng cộng trong dữ liệu có thể giải thích bằng sự khác biệt giữa các nhóm (between-group) hay chỉ là noise nội tại trong mỗi nhóm (within-group)?"
> - Nếu between >> within: nhóm khác nhau thật sự.
> - Nếu between ≈ within: khác biệt chỉ là noise.

**Phân tách tổng bình phương (Sum of Squares)**:

$$\begin{aligned}
SS_{total} &= SS_{between} + SS_{within} \\
SS_{between} &= \sum_i n_i (\bar{x}_i - \bar{x})^2 \quad \text{(variance giữa nhóm} \times \text{cỡ nhóm)} \\
SS_{within} &= \sum_i \sum_j (x_{ij} - \bar{x}_i)^2 \quad \text{(variance nội bộ mỗi nhóm)} \\
SS_{total} &= \sum_i \sum_j (x_{ij} - \bar{x})^2 \quad \text{(variance tổng)}
\end{aligned}$$

**Bậc tự do**:
- $\text{df}_{between} = K - 1$
- $\text{df}_{within} = N - K$
- $\text{df}_{total} = N - 1$

**Mean Square (MS) = Variance ước lượng**:

$$MS_{between} = \dfrac{SS_{between}}{K-1}, \quad MS_{within} = \dfrac{SS_{within}}{N-K}$$

**F-statistic**:

$$F = \dfrac{MS_{between}}{MS_{within}}$$

Dưới $H_0$, $F \sim F(K-1, N-K)$ — phân phối F. Reject $H_0$ khi $F$ đủ lớn.

### 2.3. Walk-through bằng số — ANOVA Table đầy đủ

**Tình huống**: Ba chế độ ăn (A, B, C), mỗi chế độ 5 người, đo mức giảm cân sau 8 tuần (kg):

| Chế độ A | Chế độ B | Chế độ C |
|----------|----------|----------|
| 2, 4, 3, 5, 1 | 6, 8, 7, 9, 5 | 4, 5, 3, 6, 2 |

**Bước 1 — Tính mean mỗi nhóm và grand mean**:
- $\bar{x}_A = \dfrac{2+4+3+5+1}{5} = \dfrac{15}{5} = \mathbf{3{,}0}$
- $\bar{x}_B = \dfrac{6+8+7+9+5}{5} = \dfrac{35}{5} = \mathbf{7{,}0}$
- $\bar{x}_C = \dfrac{4+5+3+6+2}{5} = \dfrac{20}{5} = \mathbf{4{,}0}$
- Grand mean $\bar{x} = \dfrac{15+35+20}{15} = \dfrac{70}{15} = \mathbf{4{,}667}$

**Bước 2 — Tính SS_between**:

$$\begin{aligned}
SS_{between} &= 5 \times (3{,}0-4{,}667)^2 + 5 \times (7{,}0-4{,}667)^2 + 5 \times (4{,}0-4{,}667)^2 \\
&= 5 \times 2{,}779 + 5 \times 5{,}445 + 5 \times 0{,}445 \\
&= 13{,}895 + 27{,}225 + 2{,}225 = \mathbf{43{,}345}
\end{aligned}$$

**Bước 3 — Tính SS_within**:

$$\begin{aligned}
\text{Nhóm A:} \quad & (2-3)^2+(4-3)^2+(3-3)^2+(5-3)^2+(1-3)^2 = 1+1+0+4+4 = 10 \\
\text{Nhóm B:} \quad & (6-7)^2+(8-7)^2+(7-7)^2+(9-7)^2+(5-7)^2 = 1+1+0+4+4 = 10 \\
\text{Nhóm C:} \quad & (4-4)^2+(5-4)^2+(3-4)^2+(6-4)^2+(2-4)^2 = 0+1+1+4+4 = 10
\end{aligned}$$

$SS_{within} = 10 + 10 + 10 = \mathbf{30}$

**Bước 4 — ANOVA Table**:

| Source | SS | df | MS | F | p |
|--------|----|----|----|----|---|
| Between groups | 43.345 | 2 | 21.673 | **7.22** | 0.008 |
| Within groups | 30.000 | 12 | 2.500 | | |
| Total | 73.345 | 14 | | | |

**Bước 5 — Quyết định**: $F = 7{,}22$ với $\text{df}_1=2$, $\text{df}_2=12$. $F^*(2, 12, \alpha=0{,}05) = 3{,}885$. $F > F^* \to$ **Reject $H_0$**.

Kết luận: "Có ít nhất một chế độ ăn khác biệt có ý nghĩa thống kê ($F(2,12)=7{,}22$, $p=0{,}008$)."

**Nhưng nhóm nào khác nhóm nào?** ANOVA chỉ nói "có ít nhất một cặp khác" — để biết cặp nào, cần **post-hoc test** (Tukey, Bonferroni). Thấy rõ B có mean $= 7$ trong khi A $= 3$ và C $= 4$.

### 2.4. Assumptions của ANOVA

1. **Normality**: Residuals ($x_{ij} - \bar{x}_i$) ~ Normal. Với $n$ lớn, CLT giúp đỡ.
2. **Homoscedasticity**: Variance bằng nhau trong mọi nhóm ($\sigma_1^2=\sigma_2^2=\ldots=\sigma_K^2$). Kiểm tra: Levene's test.
3. **Independence**: Các quan sát độc lập.

> ⚠ **Lỗi thường gặp**: Reject H₀ trong ANOVA và kết luận "nhóm B là tốt nhất" mà không làm post-hoc test. Phải dùng Tukey HSD hoặc Bonferroni để xác định cặp nào khác nhau (và correction cho multiple testing).

---

## 3. Chi-square Goodness-of-Fit Test

### 3.1. Mục đích

Kiểm tra liệu phân phối quan sát có khớp với phân phối lý thuyết không.

**$H_0$**: Dữ liệu tuân theo phân phối X (được chỉ định).
**$H_1$**: Dữ liệu không tuân theo phân phối đó.

### 3.2. Công thức

$$\chi^2 = \sum \dfrac{(O_i - E_i)^2}{E_i}$$

$$\text{df} = k - 1 - (\text{số tham số ước lượng từ dữ liệu})$$

Trong đó: $O_i$ = tần số quan sát (observed), $E_i$ = tần số kỳ vọng (expected) theo $H_0$.

Điều kiện: Mọi $E_i \geq 5$ (nếu không, gộp các ô hoặc dùng Fisher's exact test).

### 3.3. Walk-through bằng số — 3 ví dụ

**Ví dụ 1 — Xúc xắc có fair không?**

Tung 120 lần. Kỳ vọng mỗi mặt: $E = \dfrac{120}{6} = 20$.

| Mặt | O | E | (O-E)²/E |
|-----|---|---|-----------|
| 1 | 25 | 20 | 1.25 |
| 2 | 17 | 20 | 0.45 |
| 3 | 22 | 20 | 0.20 |
| 4 | 19 | 20 | 0.05 |
| 5 | 21 | 20 | 0.05 |
| 6 | 16 | 20 | 0.80 |
| **Tổng** | 120 | 120 | **2.80** |

$\chi^2 = 2{,}80$, df $= 5$. $\chi^{2*}(5,\ 0{,}05) = 11{,}07$. Vì $2{,}80 < 11{,}07 \to$ **Fail to reject $H_0$**. Xúc xắc có vẻ fair.

**Ví dụ 2 — Phân phối màu kẹo M&M**

Nhà sản xuất tuyên bố: 30% đỏ, 20% cam, 20% vàng, 10% xanh lá, 10% xanh dương, 10% nâu.
Đếm 200 kẹo: {62, 38, 42, 18, 24, 16}.

$E_i = 200 \times \{0{,}3;\ 0{,}2;\ 0{,}2;\ 0{,}1;\ 0{,}1;\ 0{,}1\} = \{60, 40, 40, 20, 20, 20\}$.

$$\begin{aligned}
\chi^2 &= \dfrac{(62-60)^2}{60} + \dfrac{(38-40)^2}{40} + \dfrac{(42-40)^2}{40} + \dfrac{(18-20)^2}{20} + \dfrac{(24-20)^2}{20} + \dfrac{(16-20)^2}{20} \\
&= 0{,}067 + 0{,}1 + 0{,}1 + 0{,}2 + 0{,}8 + 0{,}8 = \mathbf{2{,}067}
\end{aligned}$$

df $= 5$. $\chi^{2*}(5,\ 0{,}05) = 11{,}07$. $2{,}067 \ll 11{,}07 \to$ **Fail to reject $H_0$**. Phân phối màu khớp với tuyên bố.

**Ví dụ 3 — Ngày sinh nhật trong tuần (Hardy-Weinberg)**

Có thuyết rằng ngày sinh phân đều trong tuần. Khảo sát 350 người:

| T2 | T3 | T4 | T5 | T6 | T7 | CN |
|----|----|----|----|----|----|----|
| 47 | 55 | 44 | 51 | 53 | 52 | 48 |

$E = \dfrac{350}{7} = 50$.

$$\begin{aligned}
\chi^2 &= \dfrac{(47-50)^2}{50} + \dfrac{(55-50)^2}{50} + \dfrac{(44-50)^2}{50} + \dfrac{(51-50)^2}{50} + \dfrac{(53-50)^2}{50} + \dfrac{(52-50)^2}{50} + \dfrac{(48-50)^2}{50} \\
&= \dfrac{9+25+36+1+9+4+4}{50} = \dfrac{88}{50} = \mathbf{1{,}76}
\end{aligned}$$

df $= 6$. $\chi^{2*}(6,\ 0{,}05) = 12{,}59$. $1{,}76 \ll 12{,}59 \to$ Fail to reject. Phân phối đều.

---

## 4. Chi-square Test of Independence

### 4.1. Mục đích

Kiểm tra liệu hai biến phân loại có **độc lập** với nhau không trong một contingency table (bảng chéo).

**$H_0$**: Hai biến độc lập (không có quan hệ).
**$H_1$**: Hai biến có quan hệ (phụ thuộc nhau).

### 4.2. Công thức

**Expected frequency** cho ô $(i,j)$:

$$E_{ij} = \dfrac{(\text{Row total } i) \times (\text{Column total } j)}{\text{Grand total}}$$

$$\chi^2 = \sum \dfrac{(O_{ij} - E_{ij})^2}{E_{ij}}, \quad \text{df} = (r-1)(c-1) \quad (r=\text{số hàng},\ c=\text{số cột})$$

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
| Nam | $\frac{90 \times 85}{200}=38{,}25$ | $\frac{90 \times 70}{200}=31{,}5$ | $\frac{90 \times 45}{200}=20{,}25$ |
| Nữ | $\frac{110 \times 85}{200}=46{,}75$ | $\frac{110 \times 70}{200}=38{,}5$ | $\frac{110 \times 45}{200}=24{,}75$ |

**Tính χ²**:

$$\begin{aligned}
\chi^2 &= \dfrac{(30-38{,}25)^2}{38{,}25} + \dfrac{(45-31{,}5)^2}{31{,}5} + \dfrac{(15-20{,}25)^2}{20{,}25} \\
&\quad + \dfrac{(55-46{,}75)^2}{46{,}75} + \dfrac{(25-38{,}5)^2}{38{,}5} + \dfrac{(30-24{,}75)^2}{24{,}75} \\
&= 1{,}782 + 5{,}786 + 1{,}360 + 1{,}459 + 4{,}733 + 1{,}112 = \mathbf{16{,}23}
\end{aligned}$$

df $= (2-1)(3-1) = 2$. $\chi^{2*}(2,\ 0{,}05) = 5{,}991$. $16{,}23 \gg 5{,}991 \to$ **Reject $H_0$**.

Kết luận: "Giới tính và sở thích nhạc có quan hệ ($\chi^2=16{,}23$, df$=2$, $p<0{,}001$)."

**Ví dụ 2 — Vaccine và kết quả dịch bệnh**

| | Mắc bệnh | Không mắc | Total |
|-|----------|-----------|-------|
| Tiêm | 20 | 380 | 400 |
| Không tiêm | 80 | 320 | 400 |
| Total | 100 | 700 | 800 |

$E(\text{Tiêm+Mắc}) = \dfrac{400 \times 100}{800} = 50$, $E(\text{Tiêm+Không}) = \dfrac{400 \times 700}{800} = 350$.
$E(\text{KhôngTiêm+Mắc}) = 50$, $E(\text{KhôngTiêm+Không}) = 350$.

$$\begin{aligned}
\chi^2 &= \dfrac{(20-50)^2}{50} + \dfrac{(380-350)^2}{350} + \dfrac{(80-50)^2}{50} + \dfrac{(320-350)^2}{350} \\
&= 18 + 2{,}571 + 18 + 2{,}571 = \mathbf{41{,}14}
\end{aligned}$$

df $= 1$. $\chi^{2*}(1,\ 0{,}05) = 3{,}841$. $41{,}14 \gg 3{,}841 \to$ **Reject $H_0$**. Vaccine và bệnh không độc lập — vaccine có hiệu quả.

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
> - ANOVA phân tách variance: $F = \dfrac{MS_{between}}{MS_{within}}$. Lớn → reject $H_0$.
> - ANOVA chỉ nói "có ít nhất một cặp khác"; dùng post-hoc test để biết cặp nào.
> - Chi-square dùng cho biến phân loại: goodness-of-fit (so lý thuyết) hoặc independence (contingency table).
> - Điều kiện chi-square: $E_{ij} \geq 5$ trong mọi ô.

---

## Bài tập

1. Ba loại phân bón, mỗi loại 4 lô ruộng, năng suất (tấn/ha): A={3,4,3,4}, B={5,6,5,6}, C={4,4,5,5}. Chạy ANOVA tay: tính SS_between, SS_within, F. Kết luận ($\alpha=0{,}05$, $F^*(2,9)=4{,}26$).

2. Tung xúc xắc 60 lần: {12, 8, 11, 9, 10, 10}. Chi-square goodness-of-fit, kiểm tra xúc xắc có fair không ($\alpha=0{,}05$).

3. Contingency table — Kết quả thi (Pass/Fail) vs Học thêm (Có/Không): {Pass+Có=80, Pass+Không=60, Fail+Có=20, Fail+Không=40}. Kiểm tra độc lập ($\alpha=0{,}05$).

## Lời giải chi tiết

### Bài 1

Means: $\bar{x}_A = 3{,}5$, $\bar{x}_B = 5{,}5$, $\bar{x}_C = 4{,}5$. Grand mean $\bar{x} = \dfrac{14+22+18}{12} = \dfrac{54}{12} = 4{,}5$.

$SS_{between} = 4 \times (3{,}5-4{,}5)^2 + 4 \times (5{,}5-4{,}5)^2 + 4 \times (4{,}5-4{,}5)^2 = 4 \times 1 + 4 \times 1 + 4 \times 0 = \mathbf{8}$

SS_within:

$$\begin{aligned}
\text{A:} \quad & (3-3{,}5)^2 \times 2+(4-3{,}5)^2 \times 2 = 0{,}25 \times 2+0{,}25 \times 2 = 1 \\
\text{B:} \quad & (5-5{,}5)^2 \times 2+(6-5{,}5)^2 \times 2 = 0{,}25 \times 2+0{,}25 \times 2 = 1 \\
\text{C:} \quad & (4-4{,}5)^2 \times 2+(5-4{,}5)^2 \times 2 = 0{,}25 \times 2+0{,}25 \times 2 = 1
\end{aligned}$$

$SS_{within} = \mathbf{3}$

$MS_{between} = \dfrac{8}{2} = 4$. $MS_{within} = \dfrac{3}{9} = 0{,}333$.
$F = \dfrac{4}{0{,}333} = \mathbf{12{,}0}$. $F^*(2,9)=4{,}26$. $F=12 > 4{,}26 \to$ **Reject $H_0$**. Phân bón ảnh hưởng tới năng suất.

### Bài 2

$E = \dfrac{60}{6} = 10$ mỗi mặt.

$$\begin{aligned}
\chi^2 &= \dfrac{(12-10)^2}{10} + \dfrac{(8-10)^2}{10} + \dfrac{(11-10)^2}{10} + \dfrac{(9-10)^2}{10} + \dfrac{(10-10)^2}{10} + \dfrac{(10-10)^2}{10} \\
&= \dfrac{4}{10} + \dfrac{4}{10} + \dfrac{1}{10} + \dfrac{1}{10} + 0 + 0 = \dfrac{10}{10} = \mathbf{1{,}0}
\end{aligned}$$

df $= 5$. $\chi^{2*}(5,\ 0{,}05) = 11{,}07$. $1{,}0 \ll 11{,}07 \to$ **Fail to reject $H_0$**. Xúc xắc fair.

### Bài 3

Observed: $O = \{80, 60, 20, 40\}$. Row totals: {140, 60}. Col totals: {100, 100}. Grand $= 200$.

$E(\text{Pass+Có}) = \dfrac{140 \times 100}{200} = 70$. $E(\text{Pass+Không}) = \dfrac{140 \times 100}{200} = 70$.
$E(\text{Fail+Có}) = \dfrac{60 \times 100}{200} = 30$. $E(\text{Fail+Không}) = \dfrac{60 \times 100}{200} = 30$.

$$\begin{aligned}
\chi^2 &= \dfrac{(80-70)^2}{70} + \dfrac{(60-70)^2}{70} + \dfrac{(20-30)^2}{30} + \dfrac{(40-30)^2}{30} \\
&= \dfrac{100}{70} + \dfrac{100}{70} + \dfrac{100}{30} + \dfrac{100}{30} \\
&= 1{,}429 + 1{,}429 + 3{,}333 + 3{,}333 = \mathbf{9{,}524}
\end{aligned}$$

df $= 1$. $\chi^{2*}(1,\ 0{,}05) = 3{,}841$. $9{,}524 > 3{,}841 \to$ **Reject $H_0$**.

Học thêm và kết quả thi có quan hệ ($p \approx 0{,}002$).

---

## Bài tiếp theo

[Lesson 06: P-value, Power, Effect Size](../lesson-06-pvalue-power-effect/README.md) — Hiểu đúng p-value, tránh các bẫy phổ biến nhất.

## Tham khảo

- OpenIntro Statistics — Chapters 8 (Chi-square) & 9 (ANOVA).
- Field (2013), Discovering Statistics — Chapters on ANOVA.
