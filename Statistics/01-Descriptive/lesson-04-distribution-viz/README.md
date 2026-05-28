# Lesson 04: Trực quan hoá phân phối

> **Tầng 1 — Descriptive Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Vẽ và đọc được **histogram** — chọn bin width phù hợp và hiểu ý nghĩa của hình dạng.
- Đọc và vẽ **boxplot** — xác định Q1, Q2, Q3, whisker, outlier theo quy tắc 1.5×IQR.
- Phân biệt **violin plot** vs boxplot và khi nào mỗi cái hữu dụng hơn.
- Đọc **Q-Q plot** để đánh giá xem dữ liệu có phân phối Normal không.
- Vẽ và đọc **ECDF** (empirical cumulative distribution function).

## Kiến thức tiền đề

- [Lesson 02: Đo lường trung tâm](../lesson-02-central-tendency/README.md) — mean, median.
- [Lesson 03: Đo lường phân tán](../lesson-03-dispersion/README.md) — SD, IQR, Q1/Q3.

---

## 1. Histogram — biểu đồ tần số

> 💡 **Trực giác**: Hãy tưởng tượng bạn đứng ở cổng trường và đo chiều cao từng học sinh đi qua. Bạn chia băng thước thành các đoạn 5 cm và đánh dấu mỗi học sinh vào đoạn tương ứng. Kết quả là một "chồng dấu" cho mỗi đoạn — đó chính là histogram.

### 1.1. Định nghĩa

Histogram chia trục giá trị thành các **bin (khoảng chia)** bằng nhau, đếm số điểm dữ liệu trong từng bin, và vẽ cột cao tương ứng. Khác với bar chart (biến categorical): histogram dùng cho biến continuous và các cột liền nhau (không có khoảng trống).

**Các thông tin histogram truyền đạt:**
1. **Trung tâm**: đỉnh histogram nằm ở đâu?
2. **Phân tán**: histogram rộng hay hẹp?
3. **Hình dạng**: đối xứng, lệch phải, lệch trái, bimodal?
4. **Outlier**: có cột đơn lẻ xa đám đông không?

### 1.2. Chọn bin width — quan trọng hơn bạn nghĩ

Bin width quyết định rất nhiều đến hình dạng histogram. Quá ít bin → mất chi tiết. Quá nhiều bin → nhiễu, không thấy pattern.

**Quy tắc Sturges (1926):**
```
k = ⌈log₂(n)⌉ + 1
```
Với n = 100: k ≈ ⌈6.64⌉ + 1 = 8 bin.
Với n = 1000: k ≈ ⌈9.97⌉ + 1 = 11 bin.

Sturges đơn giản nhưng không tốt cho dữ liệu không phải Normal hoặc n nhỏ.

**Quy tắc Freedman-Diaconis (1981) — tốt hơn:**
```
Bin width = 2 × IQR × n^(−1/3)
```
Dùng IQR thay vì SD → robust hơn trước outlier.

Với n = 100, IQR = 10: Bin width = 2 × 10 × 100^(−1/3) = 20/4.64 ≈ 4.3

**Quy tắc Scott (1979):**
```
Bin width = 3.49 × s × n^(−1/3)
```
Optimal cho dữ liệu Normal.

> ⚠ **Thực tế**: Không có quy tắc nào "luôn đúng". Thử 2–3 bin width, chọn cái thấy pattern rõ nhất. Numpy/pandas dùng "auto" (Sturges hoặc Freedman-Diaconis, chọn cái cho ít bin hơn).

### 1.3. Walk-through — 4 ví dụ

**Ví dụ 1 — Điểm thi 20 học sinh:**
Dataset: [55, 60, 62, 65, 68, 70, 72, 73, 75, 75, 77, 78, 80, 82, 85, 85, 88, 90, 92, 95]
- Sturges: k = ⌈log₂(20)⌉+1 = 5+1 = 6 bin.
- Range = 95−55 = 40. Bin width ≈ 40/6 ≈ 7 → dùng 10 cho đẹp.
- Bins: [50-60): 1, [60-70): 4, [70-80): 7, [80-90): 5, [90-100]: 3
- Hình dạng: hơi lệch trái (left-skewed) — đỉnh ở 70-80, đuôi bên trái.

**Ví dụ 2 — Thu nhập 50 người:**
- Bin width quá nhỏ (1M): 50 cột lơ lửng → không thấy pattern.
- Bin width 10M: thấy rõ phân phối right-skewed — hầu hết 10-30M, đuôi dài đến 150M+.
- Kết luận: với thu nhập (right-skewed), bin width lớn hơn thường nhìn rõ hơn.

**Ví dụ 3 — Bimodal distribution:**
Chiều cao hỗn hợp nam + nữ trong một nhóm → histogram có 2 đỉnh. Đây là tín hiệu "nên chia thành 2 nhóm riêng biệt" cho phân tích.

**Ví dụ 4 — Uniform distribution:**
Số ngày sinh nhật (1-31) của 100 người → histogram phẳng đều nhau (mỗi ngày ~3 người). Không có đỉnh rõ ràng.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Histogram vs Bar chart — khác nhau điểm nào?" → Histogram: biến continuous, cột liền nhau, trục X là giá trị số. Bar chart: biến categorical, cột có khoảng trống, trục X là nhãn. Đây là lỗi rất phổ biến trong presentation.
> - "Tôi có thể thấy outlier từ histogram không?" → Có — cột đơn lẻ cách xa phần chính của histogram là dấu hiệu outlier. Nhưng boxplot chuyên về outlier hơn.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Histogram có đỉnh ở bên phải và đuôi dài bên trái — phân phối lệch trái hay phải?
> <details><summary>Đáp án</summary>
> Lệch TRÁI (left-skewed / negatively skewed). Đuôi dài bên trái kéo mean sang trái. Ví dụ: điểm thi dễ — hầu hết đạt cao, vài người trượt thấp.
> </details>
>
> 2. Với n = 64, Sturges rule gợi ý bao nhiêu bin?
> <details><summary>Đáp án</summary>
> k = ⌈log₂(64)⌉ + 1 = ⌈6⌉ + 1 = 7 bin.
> </details>

---

## 2. Boxplot (Box-and-whisker plot)

> 💡 **Trực giác**: Boxplot là "bản tóm tắt 5 số" vẽ thành hình. Hộp chứa 50% dữ liệu ở giữa, đường kẻ trong hộp là median, whisker (râu) vươn ra đến "normal range", chấm bên ngoài là outlier.

### 2.1. Các thành phần

**Five-number summary:**
1. **Minimum** (sau khi loại outlier)
2. **Q1** (25th percentile)
3. **Median / Q2** (50th percentile)
4. **Q3** (75th percentile)
5. **Maximum** (sau khi loại outlier)

**Tukey Fence — quy tắc whisker:**
```
Outlier nếu: x < Q1 − 1.5×IQR  hoặc  x > Q3 + 1.5×IQR
```
Whisker kéo đến giá trị thật xa nhất **mà không phải outlier**. Điểm vượt ngưỡng Tukey Fence vẽ bằng chấm (•) riêng biệt.

### 2.2. Walk-through — 4 ví dụ

**Ví dụ 1 — Tính từng bước:**
Dataset: `[2, 5, 7, 8, 10, 12, 14, 15, 15, 18, 22, 50]` (n=12)

- Q1 = median nửa dưới [2,5,7,8,10,12] = (7+8)/2 = 7.5
- Q2 (Median) = (12+14)/2 = 13
- Q3 = median nửa trên [14,15,15,18,22,50] = (15+18)/2 = 16.5
- IQR = 16.5 − 7.5 = 9
- Lower fence: Q1 − 1.5×IQR = 7.5 − 13.5 = −6 (không có điểm dưới mức này)
- Upper fence: Q3 + 1.5×IQR = 16.5 + 13.5 = 30
- Outlier: 50 > 30 → **50 là outlier**
- Whisker trên: giá trị thật cao nhất không phải outlier = 22
- Hộp: [7.5, 13, 16.5]. Whisker: [2, 22]. Outlier: [50]

**Ví dụ 2 — Phân phối symmetric:**
`[3, 5, 7, 8, 9, 10, 11, 12, 13, 15, 17]`
- Hộp gần đối xứng quanh median → phân phối symmetric.
- Median gần giữa hộp.

**Ví dụ 3 — Right-skewed:**
`[5, 6, 7, 8, 9, 10, 15, 20, 35, 80]`
- Q1 ≈ 7, Q3 ≈ 17.5, IQR = 10.5. Upper fence = 33.25.
- Outlier: 35, 80.
- Hộp hẹp bên trái, whisker và outlier dài bên phải → right-skewed rõ.

**Ví dụ 4 — So sánh hai nhóm (sức mạnh của boxplot):**
Lương kỹ sư IT vs kỹ sư xây dựng trên cùng một biểu đồ: boxplot cho thấy ngay nhóm nào có median cao hơn, IQR rộng hơn, và outlier nhiều hơn — trong khi histogram cần vẽ hai biểu đồ riêng.

> ⚠ **Hạn chế của boxplot**: Boxplot ẩn đi hình dạng phân phối bên trong hộp. Bimodal distribution trông y hệt symmetric distribution trên boxplot. Violin plot khắc phục hạn chế này.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Điểm có phải outlier không phụ thuộc vào dataset?" → Đúng. Cùng giá trị 50 có thể là outlier trong dataset [5-20] nhưng hoàn toàn bình thường trong dataset [30-70]. Outlier là khái niệm tương đối.
> - "1.5×IQR fence — con số 1.5 từ đâu ra?" → John Tukey chọn 1.5 để fence nằm ở khoảng ±2.7σ với Normal distribution (bắt ~0.7% điểm ngoài fence). Có thể dùng 3.0×IQR cho "extreme outlier fence".

---

## 3. Violin Plot

> 💡 **Trực giác**: Violin plot = Boxplot + hình dạng phân phối. Thay vì chỉ vẽ hộp, violin plot "mập ra" ở những chỗ có nhiều dữ liệu và "thắt lại" ở chỗ ít.

### 3.1. Cấu tạo

- Hình dạng ngoài: mirrored KDE (kernel density estimate) — cho thấy phân phối thực sự.
- Bên trong: thường vẽ thêm boxplot nhỏ (median + IQR).
- Dày = nhiều dữ liệu ở đó; mảnh = ít dữ liệu.

### 3.2. Violin vs Boxplot — khi nào dùng cái nào

| Tình huống | Dùng |
|-----------|------|
| So sánh nhanh nhiều nhóm | Boxplot |
| Muốn thấy hình dạng phân phối (uni/bi-modal) | Violin plot |
| Dataset nhỏ (n < 20) | Boxplot hoặc beeswarm |
| Trình bày cho người không chuyên | Boxplot (đơn giản hơn) |
| Báo cáo khoa học / phân tích sâu | Violin plot |

**Ví dụ cụ thể:** Điểm thi của 3 lớp:
- Lớp A: Normal, tập trung quanh 7.5.
- Lớp B: Bimodal — 1/3 rất giỏi (>9), 2/3 trung bình (~6).
- Lớp C: Uniform, trải đều từ 5-10.

Cả 3 lớp có thể có cùng median = 7.5 và IQR gần nhau → boxplot trông giống nhau. Violin plot sẽ thấy ngay sự khác biệt hình dạng.

---

## 4. Q-Q Plot (Quantile-Quantile)

> 💡 **Trực giác**: Q-Q plot kiểm tra xem "hình dạng" phân phối dữ liệu có khớp với một phân phối lý thuyết (thường là Normal) không. Nếu dữ liệu thực sự Normal, các điểm sẽ nằm gần đường thẳng. Lệch khỏi đường thẳng = lệch khỏi Normal.

### 4.1. Cách đọc Q-Q plot (Normal Q-Q)

Trục X: quantile lý thuyết của Normal(0,1). Trục Y: quantile thực tế của data.

**Đường thẳng = Normal distribution.**

**Các pattern thường gặp:**

| Pattern | Nghĩa |
|---------|-------|
| Điểm nằm trên đường thẳng | Gần Normal ✓ |
| Đuôi phải bị kéo lên trên | Right-skewed (đuôi phải nặng hơn Normal) |
| Đuôi trái bị kéo xuống dưới | Left-skewed |
| Cả hai đuôi bị kéo ra ngoài | Heavy tails (leptokurtic) — như t-distribution |
| Cả hai đuôi bị kéo vào trong | Light tails (platykurtic) — như Uniform |
| Hình chữ S nhẹ | Thường gặp với dữ liệu thực tế — không đáng lo nếu nhẹ |

### 4.2. Walk-through — 4 ví dụ

**Ví dụ 1 — Normal data:**
Dataset: `[-2.1, -1.3, -0.5, 0.2, 0.8, 1.4, 2.0]`
Q-Q plot: điểm nằm thẳng hàng trên đường y=x → Normal.

**Ví dụ 2 — Right-skewed (thu nhập):**
Phần trên bên phải của Q-Q plot bị kéo cao lên trên đường thẳng → đuôi phải nặng hơn Normal → right-skewed. Trong thực tế, dữ liệu thu nhập luôn hiện pattern này.

**Ví dụ 3 — Left-skewed (điểm thi dễ):**
Phần dưới bên trái bị kéo thấp hơn đường thẳng → đuôi trái nặng hơn → left-skewed.

**Ví dụ 4 — Heavy tails (stock returns):**
Cả hai đuôi bị kéo ra ngoài đường thẳng (S-shape ngược) → leptokurtic. Stock returns nổi tiếng có heavy tails — "black swan" events thường xuyên hơn Normal predict.

> ⚠ **Lưu ý**: Q-Q plot là kiểm tra "bằng mắt" — không phải kiểm định thống kê. Với n lớn, ngay cả sai lệch nhỏ cũng trông rõ. Với n nhỏ, khó kết luận chắc chắn. Dùng Shapiro-Wilk test hoặc Kolmogorov-Smirnov test nếu cần kết quả chính xác (sẽ học ở Tầng 2).

---

## 5. ECDF — Empirical Cumulative Distribution Function

**(a) Là gì:** ECDF(x) = tỉ lệ phần trăm dữ liệu ≤ x. Đây là hàm bước (step function) tăng dần từ 0 đến 1.

**(b) Vì sao cần:** ECDF không cần chọn bin width (khác histogram). Mỗi điểm dữ liệu hiển thị rõ ràng. Dễ đọc percentile: "60% dữ liệu nhỏ hơn giá trị X".

**(c) Công thức:** Với n điểm, mỗi điểm đóng góp 1/n vào CDF.

**Walk-through:**
Dataset: `[3, 7, 7, 10, 15, 20]` (n=6)

| Giá trị x | Số điểm ≤ x | ECDF(x) |
|-----------|------------|---------|
| 3 | 1 | 1/6 ≈ 0.167 |
| 7 | 3 | 3/6 = 0.500 |
| 10 | 4 | 4/6 ≈ 0.667 |
| 15 | 5 | 5/6 ≈ 0.833 |
| 20 | 6 | 6/6 = 1.000 |

Đọc: "ECDF(10) = 0.667" nghĩa là 66.7% dữ liệu ≤ 10.

**ECDF vs Histogram:**
- Histogram: thấy "hình dạng" phân phối (density), cần chọn bin.
- ECDF: thấy "bao nhiêu phần trăm dữ liệu dưới X", không cần tham số.
- Cả hai bổ sung cho nhau — dùng cả hai trong EDA.

> 📝 **Tóm tắt bài**:
> - **Histogram**: phân phối của 1 biến continuous; bin width ảnh hưởng hình dạng.
> - **Boxplot**: 5-number summary + outlier (Tukey 1.5×IQR); tốt để so sánh nhiều nhóm.
> - **Violin plot**: boxplot + hình dạng phân phối thực; phát hiện bimodal.
> - **Q-Q plot**: kiểm tra visually xem data có phân phối Normal không.
> - **ECDF**: tỉ lệ dữ liệu ≤ x; không cần bin, dễ đọc percentile.

---

## Bài tập

1. **Đọc histogram**: Histogram điểm thi có dạng sau: bin [50-60]: 2 học sinh, [60-70]: 5, [70-80]: 12, [80-90]: 8, [90-100]: 3. (a) Phân phối lệch trái, phải, hay symmetric? (b) Mean và median cái nào lớn hơn? (c) Nếu muốn dùng 4 bin thay vì 5, merge các bin như thế nào hợp lý?

2. **Vẽ boxplot tay**: Dataset: `[4, 7, 8, 9, 10, 11, 12, 13, 14, 16, 45]`. (a) Tính Q1, Q2, Q3, IQR. (b) Tính Tukey fence. (c) Xác định outlier. (d) Mô tả boxplot: hộp, whisker, outlier ở đâu.

3. **Q-Q plot pattern**: Mô tả Q-Q plot trông như thế nào với phân phối sau: (a) Uniform distribution; (b) Distribution có outlier dương (right-skewed); (c) Bimodal distribution.

4. **ECDF thực hành**: Dataset thời gian giao hàng (phút): `[18, 22, 25, 25, 28, 30, 32, 35, 40, 52]`. (a) Vẽ ECDF. (b) Xác định: P(thời gian ≤ 30) = ? (c) Median theo ECDF? (d) 90th percentile?

## Lời giải chi tiết

### Bài 1

**(a) Hình dạng:** Đỉnh ở [70-80], không lệch nhiều bên nào, nhưng đuôi bên phải (>80) giảm đều và hơi có thêm điểm bên trái (<70) ít hơn. Phân phối **gần symmetric, hơi lệch trái nhẹ** (tail ngắn hơn bên phải — nhiều điểm 80-90 hơn 60-70 tương ứng).

Thực ra: Nhìn kỹ: bên trái [50-70] có 7 học sinh; bên phải [80-100] có 11 học sinh → hơi **lệch trái** (đuôi trái nhỏ hơn, mass tập trung bên phải → left-skewed là đúng).

**(b) Mean vs Median:** Với left-skewed: Mean < Median. Median ≈ 76–78 (bin đỉnh [70-80]). Mean bị kéo xuống bởi các điểm thấp 50-70 → Mean < Median.

**(c) Merge thành 4 bin:** Cách tốt nhất: giữ nguyên các bin có thông tin nhiều, merge các bin đầu cuối ít.
- Option hợp lý: [50-70]: 7, [70-80]: 12, [80-90]: 8, [90-100]: 3
- Hoặc: [50-60): 2, [60-75): 8, [75-90): 14, [90-100]: 3 — tùy mục đích.

### Bài 2

Dataset sorted: `[4, 7, 8, 9, 10, 11, 12, 13, 14, 16, 45]` (n=11)

**(a) Quartiles:**
- Q2 (Median) = giá trị thứ 6 = **11**
- Q1 = median của nửa dưới [4,7,8,9,10] = **8**
- Q3 = median của nửa trên [12,13,14,16,45] = **14**
- IQR = 14 − 8 = **6**

**(b) Tukey fence:**
- Lower = Q1 − 1.5×IQR = 8 − 9 = **−1**
- Upper = Q3 + 1.5×IQR = 14 + 9 = **23**

**(c) Outlier:** Giá trị 45 > 23 → **45 là outlier**. Giá trị 4 > −1 → không phải outlier.

**(d) Mô tả boxplot:**
- Hộp từ Q1=8 đến Q3=14, đường median tại 11 (hơi bên trái giữa hộp → hơi right-skewed bên trong hộp).
- Whisker dưới: từ 8 xuống giá trị thấp nhất không phải outlier = 4.
- Whisker trên: từ 14 lên giá trị cao nhất không phải outlier = 16.
- Outlier: chấm tại 45.

### Bài 3

**(a) Uniform distribution:**
Q-Q plot so với Normal: cả hai đuôi bị kéo vào trong đường thẳng (chữ S ngược / S-shape). Vì Uniform có "light tails" (không có đuôi thực sự), trong khi Normal có đuôi mỏng. Điểm nhỏ của Uniform lớn hơn quantile Normal tương ứng, điểm lớn của Uniform nhỏ hơn quantile Normal tương ứng.

**(b) Right-skewed (thu nhập):**
Điểm ở bên phải (quantile cao) bị kéo lên cao hơn đường thẳng. Phần bên phải "concave up". Đuôi phải nặng hơn Normal → các quantile cao của data lớn hơn quantile Normal tương ứng.

**(c) Bimodal distribution:**
Q-Q plot sẽ có hình dạng "S-curve" đặc trưng — phần giữa của data (giữa hai đỉnh) kéo lên, hai đầu tương đối bình thường. Thực ra bimodal khó phát hiện từ Q-Q plot; histogram và violin plot nhìn rõ hơn.

### Bài 4

Dataset sorted: `[18, 22, 25, 25, 28, 30, 32, 35, 40, 52]` (n=10)

**(a) ECDF:**
| x | ECDF(x) |
|---|---------|
| 18 | 0.10 |
| 22 | 0.20 |
| 25 | 0.40 |
| 28 | 0.50 |
| 30 | 0.60 |
| 32 | 0.70 |
| 35 | 0.80 |
| 40 | 0.90 |
| 52 | 1.00 |

**(b) P(thời gian ≤ 30):**
ECDF(30) = 6/10 = **0.60 = 60%**. Ba trong năm đơn hàng giao trong 30 phút.

**(c) Median (50th percentile):**
ECDF = 0.50 tại x=28 → Median = **28 phút** (cũng verify: số điểm trực tiếp = median của [18,22,25,25,28,30,32,35,40,52] = (28+30)/2 = 29 phút theo công thức trực tiếp — ECDF method và formula method cho kết quả gần nhau).

**(d) 90th percentile:**
ECDF = 0.90 tại x=40 → P90 = **40 phút**. "90% đơn hàng được giao trong vòng 40 phút" — đây là SLA (Service Level Agreement) điển hình.

---

## Bài tiếp theo

[Lesson 05: Mối quan hệ 2 biến](../lesson-05-bivariate-correlation/README.md) — Scatter plot, covariance, Pearson r, Spearman ρ, Anscombe quartet.

## Tham khảo

- OpenIntro Statistics, 4th ed. — Chapter 2.2 (Visualizing data).
- Freedman, D., Diaconis, P. (1981). "On the histogram as a density estimator."
- Tukey, J.W. (1977). Exploratory Data Analysis.
