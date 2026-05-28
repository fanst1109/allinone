# Lesson 03: Đo lường phân tán

> **Tầng 1 — Descriptive Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Tính được **range, variance, standard deviation (SD), IQR, MAD** từ bất kỳ dataset nào.
- Giải thích tại sao **Bessel's correction** (chia n−1 thay vì n) được dùng cho sample variance.
- Biết khi nào dùng SD vs IQR — và tại sao IQR robust hơn SD trước outlier.
- Áp dụng **Coefficient of Variation (CV)** để so sánh độ phân tán giữa các dataset khác đơn vị.
- Sử dụng **68-95-99.7 rule** (empirical rule) cho Normal distribution.

## Kiến thức tiền đề

- [Lesson 01: Loại dữ liệu](../lesson-01-data-types-overview/README.md) — thang đo Ratio vs Interval.
- [Lesson 02: Đo lường trung tâm](../lesson-02-central-tendency/README.md) — mean, median.
- Phép bình phương, căn bậc hai.

---

## 1. Tại sao cần đo phân tán?

> 💡 **Trực giác**: Hai lớp học cùng điểm trung bình 7.5/10. Lớp A: [7, 7.5, 8, 7.5, 7]. Lớp B: [2, 5, 10, 10, 9]. Trung bình bằng nhau, nhưng lớp B "loạn" hơn nhiều — có người giỏi xuất sắc và người yếu kém. Đo trung tâm không đủ — cần đo độ "tản mát" quanh trung tâm đó.

Phân tán (dispersion/spread) đo **mức độ dữ liệu lệch khỏi giá trị trung tâm**. Cùng trung bình + khác phân tán = khác rủi ro, khác chính sách.

Ví dụ tài chính: Hai khoản đầu tư cùng lợi nhuận kỳ vọng 10%/năm:
- Đầu tư A: năm nào cũng ~10% (ổn định, phân tán thấp).
- Đầu tư B: +50%, −30%, +40%, −10%, +30% (phân tán cao, rủi ro cao).
→ Phân tán = **rủi ro**. Không biết phân tán là không biết rủi ro.

---

## 2. Range — Khoảng biến thiên

**(a) Là gì:** Range = Max − Min. Khoảng cách từ giá trị nhỏ nhất đến lớn nhất.

**(b) Vì sao cần:** Đơn giản, trực quan, tính nhanh. Nhưng chỉ dùng 2 giá trị cực đoan, bỏ qua phân phối bên trong.

**(c) Công thức:** `Range = x_max − x_min`

**Walk-through — 4 ví dụ:**

**Ví dụ 1:** `[3, 7, 12, 2, 9]` → Range = 12 − 2 = **10**

**Ví dụ 2 — Nhiệt độ Hà Nội tháng 7 (°C):** `[34, 36, 37, 35, 38, 34]` → Range = 38 − 34 = **4°C**

**Ví dụ 3 — Dataset với outlier:** `[5, 6, 7, 6, 5, 100]` → Range = 100 − 5 = **95**
Nhưng 5/6 giá trị nằm trong [5, 7] — range 95 hoàn toàn bị kéo bởi outlier 100.

**Ví dụ 4:** `[10, 10, 10, 10]` → Range = 10 − 10 = **0** (không có phân tán).

> ⚠ **Hạn chế của Range**: Range chỉ phụ thuộc 2 điểm cực đoan. Thêm/bỏ 1 outlier có thể thay đổi range hoàn toàn. Không mô tả phân phối bên trong. Dùng range như "cái nhìn đầu tiên" nhưng không đủ để kết luận.

---

## 3. Variance và Standard Deviation

### 3.1. Định nghĩa — "Khoảng cách trung bình từ trung tâm"

> 💡 **Trực giác**: Bạn muốn biết "trung bình mỗi điểm dữ liệu lệch khỏi mean bao nhiêu?". Cách ngây thơ nhất: lấy trung bình của `(xᵢ − x̄)`. Nhưng điều kỳ lạ: tổng của `(xᵢ − x̄)` **luôn = 0** (vì mean là điểm cân bằng). Giải pháp: bình phương sai lệch trước khi cộng.

**Variance (phương sai):**
```
Population: σ² = Σ(xᵢ − µ)² / N
Sample:     s² = Σ(xᵢ − x̄)² / (n−1)
```

**Standard Deviation (độ lệch chuẩn):**
```
σ = √σ²   (population)
s = √s²   (sample)
```

SD có cùng đơn vị với dữ liệu gốc → dễ diễn giải hơn variance.

### 3.2. Walk-through chi tiết — 4 ví dụ

**Ví dụ 1 — Tính từng bước (population):**
Dataset: `[2, 4, 4, 4, 5, 5, 7, 9]` (N = 8)

Bước 1 — Tính µ: (2+4+4+4+5+5+7+9)/8 = 40/8 = **5**

Bước 2 — Tính sai lệch và bình phương:
| xᵢ | xᵢ − µ | (xᵢ − µ)² |
|----|--------|-----------|
| 2  | −3     | 9         |
| 4  | −1     | 1         |
| 4  | −1     | 1         |
| 4  | −1     | 1         |
| 5  | 0      | 0         |
| 5  | 0      | 0         |
| 7  | +2     | 4         |
| 9  | +4     | 16        |
| **Tổng** | 0 | **32** |

Bước 3 — Variance: σ² = 32/8 = **4**

Bước 4 — SD: σ = √4 = **2**

Verify: "Trung bình mỗi điểm cách mean 2 đơn vị" — nhìn vào data: nhiều điểm quanh 4-5, vài điểm xa (2 và 9). SD = 2 hợp lý.

**Ví dụ 2 — Sample variance (chia n−1):**
Sample: `[6, 8, 10, 12]` (n = 4)

x̄ = (6+8+10+12)/4 = 36/4 = 9

Sai lệch: (6−9)²=9, (8−9)²=1, (10−9)²=1, (12−9)²=9. Tổng = 20.

s² = 20/(4−1) = 20/3 ≈ **6.67** (sample variance)

s = √6.67 ≈ **2.58** (sample SD)

Nếu chia n thay vì n−1: σ² = 20/4 = 5, σ = 2.24 (sẽ underestimate phân tán thật).

**Ví dụ 3 — So sánh hai class:**
Lớp A điểm thi: `[7, 7.5, 8, 7.5, 7]` → x̄ = 7.4, s ≈ 0.41
Lớp B điểm thi: `[2, 5, 10, 10, 9]` → x̄ = 7.2, s ≈ 3.35

Mean gần bằng nhau (7.4 vs 7.2). SD nói lên sự khác biệt thật: Lớp A đồng đều (s = 0.41), Lớp B cực kỳ phân tán (s = 3.35).

**Ví dụ 4 — Dataset với outlier:**
`[5, 6, 7, 6, 5, 100]`: x̄ = 21.5, s ≈ 38.5
`[5, 6, 7, 6, 5]` (bỏ outlier): x̄ = 5.8, s ≈ 0.84

Outlier duy nhất (100) làm SD tăng từ 0.84 lên 38.5 — gần 46×! SD không robust trước outlier.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Tại sao bình phương thay vì lấy giá trị tuyệt đối?" → Bình phương làm nổi bật outlier (sai lệch lớn bị penalize nhiều hơn), và có tính chất toán học đẹp hơn (khả vi ở mọi điểm). Trung bình sai lệch tuyệt đối = MAD, học ở mục 5.
> - "σ vs s — khi nào dùng cái nào?" → Khi có toàn bộ population data → dùng σ (chia N). Khi chỉ có sample → dùng s (chia n−1). Trong thực tế hầu như luôn dùng s.
> - "SD có thể âm không?" → Không. SD = √(variance) ≥ 0. SD = 0 khi tất cả dữ liệu bằng nhau.

### 3.3. Bessel's Correction — tại sao chia n−1?

> 💡 **Trực giác**: Khi lấy sample ngẫu nhiên, các điểm trong sample có xu hướng **gần mean sample hơn** mean thật của population. Do đó, nếu chia n, bạn sẽ *underestimate* variance thật. Chia n−1 là cách điều chỉnh bias này.

**Ví dụ trực quan:** Population = {1, 2, 3, 4, 5}. µ = 3. σ² = [(1-3)²+(2-3)²+(3-3)²+(4-3)²+(5-3)²]/5 = 10/5 = 2.

Lấy sample 2 phần tử: {1, 5}. x̄ = 3.
- Chia n=2: s² = [(1-3)²+(5-3)²]/2 = 8/2 = 4. (Overestimate! 4 > 2)
- Nhưng lấy sample {2, 4}: x̄ = 3. s² chia n=2 → [(2-3)²+(4-3)²]/2 = 1. (Underestimate! 1 < 2)
- Trung bình nhiều lần lấy mẫu, chia n có bias systematic downward (underestimate). Chia n−1 khắc phục.

**Nói chính xác hơn:** Chứng minh bằng kỳ vọng: E[s²] = σ² khi s² = Σ(xᵢ−x̄)²/(n−1). Đây gọi là **unbiased estimator**. (Chứng minh đầy đủ ở môn Mathematical Statistics — nằm ngoài phạm vi bài này.)

**Quy tắc thực hành:**
- Python `np.std(arr)`: mặc định chia N → population SD.
- Python `np.std(arr, ddof=1)`: chia N−1 → sample SD.
- Python `pd.Series.std()`: mặc định chia N−1 (đúng cho sample).

> ⚠ **Lỗi hay gặp trong code**: Dùng `np.std()` mà quên `ddof=1` khi làm việc với sample. Khi n lớn (1000+), sự khác biệt nhỏ; nhưng khi n nhỏ (5–20), có thể underestimate đáng kể.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Dataset: `[3, 5, 5, 7]`. Tính sample variance s² và sample SD s từng bước.
> <details><summary>Đáp án</summary>
> x̄ = (3+5+5+7)/4 = 20/4 = 5. Sai lệch: (3−5)²=4, (5−5)²=0, (5−5)²=0, (7−5)²=4. Tổng = 8. s² = 8/(4−1) = 8/3 ≈ 2.67. s = √(8/3) ≈ 1.63.
> </details>
>
> 2. Khi n rất lớn (vd n = 10 000), sự khác biệt giữa chia n và n−1 có lớn không?
> <details><summary>Đáp án</summary>
> Rất nhỏ. 10000 vs 9999 khác nhau 0.01% — không đáng kể. Bessel's correction quan trọng nhất khi n nhỏ (n < 30).
> </details>

---

## 4. IQR — Interquartile Range

### 4.1. Định nghĩa

**(a) Là gì:** IQR = Q3 − Q1. Khoảng chứa 50% dữ liệu ở giữa.
- **Q1 (first quartile / percentile 25)**: 25% dữ liệu nằm dưới.
- **Q3 (third quartile / percentile 75)**: 75% dữ liệu nằm dưới.

**(b) Vì sao cần:** IQR robust — không bị ảnh hưởng bởi outlier ở hai đầu. Dùng cùng median (cũng robust).

**(c) Công thức:**
```
Sắp xếp data → tìm Q1, Q2 (median), Q3
IQR = Q3 − Q1
```

**Walk-through — 4 ví dụ:**

**Ví dụ 1 — n = 8:**
`[1, 3, 5, 7, 9, 11, 13, 15]`
- Q1 = median của nửa dưới [1,3,5,7] = (3+5)/2 = **4**
- Q3 = median của nửa trên [9,11,13,15] = (11+13)/2 = **12**
- IQR = 12 − 4 = **8**

**Ví dụ 2 — n = 5:**
`[2, 4, 6, 8, 10]`
- Median = 6 (Q2)
- Q1 = median của [2, 4] = 3
- Q3 = median của [8, 10] = 9
- IQR = 9 − 3 = **6**

**Ví dụ 3 — So sánh với Range khi có outlier:**
`[5, 6, 7, 6, 5, 100]`
- Sắp xếp: [5, 5, 6, 6, 7, 100]
- Q1 = (5+5)/2 = 5, Q3 = (7+100)/2 = 53.5... (hm, với n=6, Q1 = phần tử 1.75th)
- Dùng phương pháp đơn giản: nửa dưới [5,5,6], Q1=5; nửa trên [6,7,100], Q3=7
- IQR = 7 − 5 = **2** (robust!) vs Range = 95 (bị kéo bởi outlier).

**Ví dụ 4 — Lương nhân viên:**
`[11M, 12M, 12M, 13M, 14M, 15M, 150M]` (M VND)
- Q1 = 12M, Q3 = 15M
- IQR = 15 − 12 = **3M** — phản ánh phân tán thật của hầu hết nhân viên.
- SD ≈ 51.6M — bị kéo bởi 150M, không đại diện.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Có nhiều cách tính Q1/Q3 khác nhau — phần mềm nào dùng cách nào?" → Đúng, có ít nhất 9 phương pháp tính quartile (Excel, R, NumPy đều dùng cách khác nhau). Nhưng kết quả thường gần nhau, và sự khác biệt nhỏ không ảnh hưởng kết luận. Bài này dùng phương pháp "inclusive median" cho đơn giản.
> - "IQR rule phát hiện outlier như thế nào?" → Điểm nằm ngoài [Q1 − 1.5×IQR, Q3 + 1.5×IQR] được coi là outlier (Tukey fence). Đây là rule mà boxplot dùng để vẽ whisker. Sẽ học ở Lesson 04.

---

## 5. MAD — Median Absolute Deviation

**(a) Là gì:** MAD = median của |xᵢ − median(x)| — trung vị của các sai lệch tuyệt đối quanh median.

**(b) Vì sao cần:** Robust nhất trong tất cả các thước đo phân tán — không nhạy cảm cả với outlier lẫn phân phối lệch. Khi dữ liệu "dirty" (nhiều noise), MAD ổn định nhất.

**(c) Công thức:**
```
MAD = median(|x₁ − median|, |x₂ − median|, ..., |xₙ − median|)
```

**Walk-through:**
Dataset: `[1, 1, 2, 2, 4, 6, 9]`
- Median = 2
- Sai lệch tuyệt đối: |1−2|=1, |1−2|=1, |2−2|=0, |2−2|=0, |4−2|=2, |6−2|=4, |9−2|=7
- Sắp xếp: [0, 0, 1, 1, 2, 4, 7]
- MAD = median = **1**

Với outlier `[1, 1, 2, 2, 4, 6, 1000]`:
- Median = 2 (không đổi so với trước)
- MAD = median([0, 0, 1, 1, 2, 4, 998]) = **1** (không đổi!)
- SD thì thay đổi mạnh từ ≈3 lên ≈374.

**So sánh các thước đo:**
| Thước đo | Sử dụng | Robust? | Outlier ảnh hưởng? |
|----------|---------|:-------:|:-----------------:|
| SD | Deviation quanh mean | Không | Mạnh |
| IQR | 50% giữa | Có | Không |
| MAD | Median deviation | Rất cao | Gần như không |
| Range | Max − Min | Không | Rất mạnh |

---

## 6. Coefficient of Variation (CV) — Hệ số biến thiên

**(a) Là gì:** CV = SD / mean. Đo độ phân tán *tương đối* — không có đơn vị.

**(b) Vì sao cần:** Cho phép so sánh độ phân tán giữa các dataset có đơn vị hoặc scale khác nhau. "SD = 5 kg" vs "SD = 5 triệu VND" — không so sánh được trực tiếp. CV chuẩn hóa.

**(c) Công thức:**
```
CV = s / x̄  (thường biểu diễn dưới dạng %)
```

**(d) Chỉ hợp lệ với thang đo Ratio** — vì cần zero tuyệt đối để mean có nghĩa về mặt tỉ lệ.

**Walk-through — 4 ví dụ:**

**Ví dụ 1 — Chiều cao vs Cân nặng:**
- Chiều cao: x̄ = 170 cm, s = 8 cm → CV = 8/170 = **4.7%**
- Cân nặng: x̄ = 65 kg, s = 12 kg → CV = 12/65 = **18.5%**
- Kết luận: Cân nặng phân tán *tương đối* nhiều hơn chiều cao trong nhóm người này.

**Ví dụ 2 — So sánh độ ổn định đầu tư:**
- Cổ phiếu A: return trung bình 12%/năm, SD = 3% → CV = 3/12 = **25%** (ổn định)
- Cổ phiếu B: return trung bình 20%/năm, SD = 15% → CV = 15/20 = **75%** (rủi ro cao)
- Dù B có return cao hơn, rủi ro tương đối gấp 3× A.

**Ví dụ 3 — Sản xuất (quality control):**
- Máy A sản xuất vít, đường kính mục tiêu 5mm. x̄ = 5.01mm, s = 0.02mm → CV = 0.02/5.01 = **0.4%** (rất đồng đều)
- Máy B: x̄ = 4.98mm, s = 0.15mm → CV = 0.15/4.98 = **3.0%** (không đồng đều, cần kiểm tra)

**Ví dụ 4 — CV cho thấy context quan trọng:**
- Lớp học điểm số: x̄ = 7, s = 2 → CV = 28.6%
- Nhiệt độ phòng (°C): x̄ = 25, s = 2 → CV = 8%
- SD bằng nhau (2) nhưng ý nghĩa khác: điểm số có phân tán tương đối cao; nhiệt độ khá ổn định.

> ⚠ **Lỗi thường gặp**: Tính CV cho dữ liệu Interval (nhiệt độ °C). Nếu mean gần 0 hoặc có thể âm, CV có thể vô nghĩa (âm, vô cùng, hoặc cực lớn). CV chỉ hợp lệ khi mean > 0 và zero có nghĩa thật.

---

## 7. Quy tắc 68-95-99.7 (Empirical Rule)

> 💡 **Trực giác**: Nếu dữ liệu phân phối Normal (hình chuông đối xứng), SD cho ta biết "bao nhiêu phần trăm dữ liệu nằm trong phạm vi ±k×SD quanh mean". Ba con số vàng: 68%, 95%, 99.7%.

Với phân phối **Normal(µ, σ)**:
```
P(µ − σ ≤ X ≤ µ + σ)   ≈ 68%  (±1 SD)
P(µ − 2σ ≤ X ≤ µ + 2σ) ≈ 95%  (±2 SD)
P(µ − 3σ ≤ X ≤ µ + 3σ) ≈ 99.7% (±3 SD)
```

**Ví dụ 1 — Chiều cao nam Việt Nam (ước tính):**
µ = 164 cm, σ = 6 cm
- 68% nam Việt Nam cao từ 158–170 cm (±1σ)
- 95% cao từ 152–176 cm (±2σ)
- 99.7% cao từ 146–182 cm (±3σ)

**Ví dụ 2 — IQ:**
µ = 100, σ = 15
- 68%: IQ ∈ [85, 115]
- 95%: IQ ∈ [70, 130]
- 99.7%: IQ ∈ [55, 145]
- "Thiên tài" IQ > 145 ≈ 0.15% dân số (3σ từ mean).

**Ví dụ 3 — Thời gian giao hàng:**
µ = 30 phút, σ = 5 phút
- Nếu phân phối Normal: 95% đơn hàng giao trong [20, 40] phút (±2σ).
- Giao >40 phút = ngoài 2σ = khoảng 2.5% đơn hàng → đây là service level agreement (SLA) tiêu chuẩn của nhiều công ty giao hàng.

**Ví dụ 4 — Phát hiện bất thường (anomaly detection):**
Lưu lượng truy cập web: µ = 10 000 requests/phút, σ = 500.
- Ngưỡng cảnh báo tự động: ngoài ±3σ → dưới 8 500 hoặc trên 11 500 req/min.
- Xác suất cảnh báo sai (false alarm) nếu dữ liệu Normal: 0.3%.

> ⚠ **Điều kiện quan trọng**: Empirical rule **chỉ áp dụng cho Normal distribution** (hoặc xấp xỉ Normal). Với phân phối lệch mạnh (thu nhập, giá nhà), quy tắc này không đúng. Chebyshev's inequality là thay thế non-parametric: ít nhất `1 − 1/k²` dữ liệu nằm trong ±k×SD, với bất kỳ phân phối nào.

> 📝 **Tóm tắt bài**:
> - **Range**: max − min, đơn giản nhưng nhạy với outlier.
> - **Variance/SD**: "trung bình khoảng cách bình phương từ mean" — không robust, nhạy với outlier.
> - **IQR**: Q3 − Q1, robust, dùng cùng median.
> - **MAD**: median của sai lệch tuyệt đối — robust nhất.
> - **CV**: SD/mean, so sánh phân tán tương đối giữa datasets khác đơn vị.
> - **68-95-99.7 rule**: chỉ đúng với Normal distribution.

---

## Bài tập

1. **Tính đầy đủ**: Dataset: `[4, 8, 6, 5, 3, 2, 8, 9, 2, 5]`. Tính: (a) Range, (b) sample variance s², (c) sample SD s, (d) IQR, (e) MAD.

2. **Bessel's correction thực hành**: Một nhà nghiên cứu đo nồng độ hormone (pg/mL) của 5 bệnh nhân: `[12.1, 15.3, 13.7, 11.9, 14.2]`. (a) Tính sample mean, (b) Tính sample variance dùng n−1, (c) Nếu quên Bessel's correction (chia n), kết quả khác bao nhiêu?

3. **CV so sánh rủi ro đầu tư**: Hai loại cổ phiếu trong 5 năm:
   - Cổ phiếu X: lợi nhuận hàng năm `[+8%, +10%, +9%, +11%, +7%]`
   - Cổ phiếu Y: lợi nhuận hàng năm `[+15%, -5%, +25%, +2%, +18%]`
   Tính mean và CV cho mỗi loại. Loại nào có rủi ro tương đối cao hơn?

4. **Empirical rule**: Điểm thi chuẩn hóa có phân phối Normal với µ = 500, σ = 100.
   (a) 68% thí sinh đạt điểm từ bao nhiêu đến bao nhiêu?
   (b) Bạn đạt 720. Bạn thuộc top bao nhiêu phần trăm?
   (c) Cần đạt bao nhiêu điểm để vào top 2.5%?

## Lời giải chi tiết

### Bài 1

Dataset: `[4, 8, 6, 5, 3, 2, 8, 9, 2, 5]`, n = 10

**(a) Range:**
Max = 9, Min = 2 → Range = 9 − 2 = **7**

**(b) Sample variance s²:**
x̄ = (4+8+6+5+3+2+8+9+2+5)/10 = 52/10 = 5.2

Sai lệch bình phương:
(4−5.2)²=1.44, (8−5.2)²=7.84, (6−5.2)²=0.64, (5−5.2)²=0.04, (3−5.2)²=4.84,
(2−5.2)²=10.24, (8−5.2)²=7.84, (9−5.2)²=14.44, (2−5.2)²=10.24, (5−5.2)²=0.04

Tổng = 1.44+7.84+0.64+0.04+4.84+10.24+7.84+14.44+10.24+0.04 = **57.6**

s² = 57.6 / (10−1) = 57.6/9 = **6.4**

**(c) Sample SD s:**
s = √6.4 ≈ **2.53**

**(d) IQR:**
Sắp xếp: [2, 2, 3, 4, 5, 5, 6, 8, 8, 9]
Q1 = median nửa dưới [2,2,3,4,5] = **3**
Q3 = median nửa trên [5,6,8,8,9] = **8**
IQR = 8 − 3 = **5**

**(e) MAD:**
Median của dataset [2,2,3,4,5,5,6,8,8,9] = (5+5)/2 = 5

Sai lệch tuyệt đối: |2−5|=3, |2−5|=3, |3−5|=2, |4−5|=1, |5−5|=0, |5−5|=0, |6−5|=1, |8−5|=3, |8−5|=3, |9−5|=4

Sắp xếp: [0, 0, 1, 1, 2, 3, 3, 3, 3, 4]

MAD = (2+3)/2 = **2.5**

### Bài 2

**(a) Sample mean:**
x̄ = (12.1+15.3+13.7+11.9+14.2)/5 = 67.2/5 = **13.44 pg/mL**

**(b) Sample variance (n−1):**
Sai lệch: (12.1−13.44)²=1.7956, (15.3−13.44)²=3.4596, (13.7−13.44)²=0.0676, (11.9−13.44)²=2.3716, (14.2−13.44)²=0.5776

Tổng = 1.7956+3.4596+0.0676+2.3716+0.5776 = **8.272**

s² = 8.272 / (5−1) = 8.272/4 = **2.068 pg²/mL²**; s = √2.068 ≈ **1.438 pg/mL**

**(c) Nếu chia n:**
s²_biased = 8.272/5 = 1.6544 pg²/mL²; s_biased = 1.286 pg/mL

Sai khác: 1.438 vs 1.286 → **underestimate ~10.6%** khi chia n. Với n nhỏ (n=5), Bessel's correction quan trọng.

### Bài 3

**Cổ phiếu X** `[8, 10, 9, 11, 7]` (% lợi nhuận):
x̄ = (8+10+9+11+7)/5 = 45/5 = **9%**
s² = [(8-9)²+(10-9)²+(9-9)²+(11-9)²+(7-9)²]/(5-1) = [1+1+0+4+4]/4 = 10/4 = 2.5
s = √2.5 ≈ **1.58%**
CV_X = 1.58/9 = **17.6%**

**Cổ phiếu Y** `[15, -5, 25, 2, 18]` (% lợi nhuận):
x̄ = (15-5+25+2+18)/5 = 55/5 = **11%**
s² = [(15-11)²+(-5-11)²+(25-11)²+(2-11)²+(18-11)²]/(5-1) = [16+256+196+81+49]/4 = 598/4 = 149.5
s = √149.5 ≈ **12.23%**
CV_Y = 12.23/11 = **111.2%**

**Kết luận:** Y có mean cao hơn (11% vs 9%) nhưng CV cao hơn rất nhiều (111% vs 18%). Rủi ro tương đối của Y gấp ~6× X. Một nhà đầu tư risk-averse sẽ chọn X; risk-seeking mới chọn Y.

### Bài 4

µ = 500, σ = 100 (phân phối Normal)

**(a) 68% nằm trong:** µ ± σ = 500 ± 100 → **[400, 600]**

**(b) Điểm 720 — thuộc top bao nhiêu?**
720 = 500 + 2.2×100 → 2.2 SD trên mean.
Dùng Normal table: P(X < 720) = P(Z < 2.2) ≈ 98.6%.
→ Bạn thuộc **top 1.4%** (tốt hơn 98.6% thí sinh).

**(c) Top 2.5% — cần điểm bao nhiêu?**
Top 2.5% ↔ P(X > x) = 0.025 ↔ z = 1.96 (from Normal table).
x = µ + z×σ = 500 + 1.96×100 = **696**

Verify: ±2σ từ mean → [300, 700] chứa 95% → 2.5% trên 700. Ngưỡng 696 ≈ 700, hợp lý.

---

## Bài tiếp theo

[Lesson 04: Trực quan hoá phân phối](../lesson-04-distribution-viz/README.md) — Histogram, boxplot, violin, Q-Q plot: vẽ và đọc được hình dạng phân phối.

## Tham khảo

- OpenIntro Statistics, 4th ed. — Chapter 2.1-2.2 (Variability).
- Khan Academy: Statistics — "Measures of Spread", "Standard Deviation vs IQR".
- Hodge, V.J., Austin, J.: "A Survey of Outlier Detection Methodologies" (2004).
