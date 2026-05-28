// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/01-Descriptive/lesson-05-bivariate-correlation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05: Mối quan hệ 2 biến

> **Tầng 1 — Descriptive Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Đọc **scatter plot** và nhận diện 4 đặc điểm: hướng (dương/âm), dạng (linear/curve), độ mạnh, outlier.
- Tính **covariance** và hiểu vì sao nó không dùng được trực tiếp để so sánh.
- Tính **Pearson r** — đo tương quan tuyến tính, miền [−1, 1], không phụ thuộc đơn vị.
- Tính **Spearman ρ** — tương quan dựa trên hạng (rank), bắt được monotonic không cần linear.
- Hiểu **Kendall τ** — đo tỉ lệ concordant pair.
- Nhận diện bẫy **Anscombe quartet** — 4 dataset có cùng r ≈ 0.816 nhưng hình dạng cực kỳ khác nhau.
- Nắm câu thần chú **correlation ≠ causation** — Lesson 02 Tầng 3 đào sâu.

## Kiến thức tiền đề

- [Lesson 02: Đo lường trung tâm](../lesson-02-central-tendency/README.md) — mean.
- [Lesson 03: Đo lường phân tán](../lesson-03-dispersion/README.md) — variance, SD.
- [Lesson 04: Trực quan hoá phân phối](../lesson-04-distribution-viz/README.md) — đọc chart.

---

## 1. Mở đầu: hai biến đi cùng nhau

Cho tới giờ Tầng 1 luôn nói về 1 biến. Thực tế bạn thường có ≥ 2 biến và muốn biết chúng **liên quan thế nào**:

- Chiều cao và cân nặng — đi cùng nhau?
- Số giờ học và điểm thi — càng học càng cao?
- Lương và độ hài lòng công việc — có quan hệ không?

> 💡 **Trực giác**: Tương quan đo *"khi biến X tăng thì biến Y có xu hướng tăng/giảm/không đổi"*. Nó KHÔNG nói X gây ra Y — chỉ nói chúng "đi đôi".

### 1.1. Scatter plot — hình ảnh đầu tiên

Trước khi tính bất kỳ con số nào, **luôn luôn vẽ scatter plot**. Một scatter trả lời 4 câu hỏi:

1. **Hướng**: lên (positive) hay xuống (negative)?
2. **Dạng**: thẳng (linear), cong (curve), hay không có pattern?
3. **Độ mạnh**: chặt như đường thẳng, hay tản mác?
4. **Outlier**: có điểm tách hẳn không?

Bốn ví dụ thị giác (xem Module 1 trong viz):

| Pattern | Mô tả |
|---------|-------|
| ↗ chặt | Linear positive, mạnh — r ≈ 0.95 |
| ↘ chặt | Linear negative, mạnh — r ≈ −0.95 |
| ☁ tản | Không pattern — r ≈ 0 |
| ∪ cong | Quan hệ phi tuyến — r ≈ 0 nhưng có pattern |

Bài học: **r = 0 KHÔNG có nghĩa "không quan hệ"**, chỉ có nghĩa "không quan hệ tuyến tính".

---

## 2. Covariance — bước đệm tới correlation

### 2.1. Định nghĩa

**(a) Là gì**: Covariance đo *"trung bình của tích lệch khỏi mean của cả 2 biến"*. Nếu X cao hơn mean cùng lúc Y cao hơn mean → tích dương; nếu ngược chiều → tích âm.

**(b) Vì sao cần**: Đây là thước đo "đi đôi" tự nhiên nhất từ định nghĩa variance (variance là cov của X với chính nó). Nhưng đơn vị của cov = đơn vị X × đơn vị Y (vd cm·kg) → khó so sánh giữa các dataset khác đơn vị.

**(c) Ví dụ trực giác**: Đo chiều cao (cm) và cân nặng (kg) của 4 người: nếu người cao thường nặng → cov dương lớn. Nếu cao thấp ngẫu nhiên về cân nặng → cov ≈ 0.

### 2.2. Công thức

**Population covariance:**
\`\`\`
Cov(X, Y) = (1/N) · Σ (xᵢ − μ_X)(yᵢ − μ_Y)
\`\`\`

**Sample covariance** (chia n−1 — Bessel's correction):
\`\`\`
s_XY = (1/(n−1)) · Σ (xᵢ − x̄)(yᵢ − ȳ)
\`\`\`

### 2.3. Walk-through số — 4 ví dụ

**Ví dụ 1: tương quan dương mạnh**

| i | x | y | x−x̄ | y−ȳ | tích |
|---|---|---|-----|-----|------|
| 1 | 1 | 2 | −2 | −4 | 8 |
| 2 | 2 | 4 | −1 | −2 | 2 |
| 3 | 3 | 6 | 0 | 0 | 0 |
| 4 | 4 | 8 | 1 | 2 | 2 |
| 5 | 5 | 10 | 2 | 4 | 8 |

x̄=3, ȳ=6. Σ tích = 20. s_XY = 20/(5−1) = **5**.

Quan hệ hoàn hảo dương: y = 2x, mọi điểm trên đường thẳng.

**Ví dụ 2: tương quan âm**

| i | x | y |
|---|---|---|
| 1 | 1 | 10 |
| 2 | 2 | 8 |
| 3 | 3 | 6 |
| 4 | 4 | 4 |
| 5 | 5 | 2 |

x̄=3, ȳ=6. Tích: (−2)(4)=−8, (−1)(2)=−2, 0·0=0, 1·(−2)=−2, 2·(−4)=−8. Σ = −20. s_XY = −20/4 = **−5**.

**Ví dụ 3: không tương quan**

Data: (1,5), (2,3), (3,7), (4,2), (5,8). x̄=3, ȳ=5.

Tích: (−2)(0)=0, (−1)(−2)=2, 0·2=0, 1·(−3)=−3, 2·3=6. Σ = 5. s_XY = 5/4 = **1.25**.

Nhỏ so với scale dữ liệu → tương quan yếu.

**Ví dụ 4: đổi đơn vị → cov đổi**

Lấy lại ví dụ 1 nhưng đổi y thành mét (chia 100): y mới = [0.02, 0.04, 0.06, 0.08, 0.10]. Cov mới = 5/100 = 0.05.

Vẫn cùng quan hệ tuyến tính, nhưng cov nhỏ hơn 100 lần. Đây là vấn đề.

> ⚠ **Lỗi thường gặp**: So sánh cov giữa 2 dataset khác đơn vị → vô nghĩa. Phải dùng correlation (chia chuẩn hoá) để so sánh.

> ❓ **Câu hỏi tự nhiên**:
> - "Cov nhỏ có nghĩa quan hệ yếu không?" → Không! Cov phụ thuộc đơn vị. Đổi đơn vị (cm→m) làm cov đổi nhưng quan hệ không đổi.
> - "Cov có giới hạn không?" → Không. Có thể từ −∞ tới +∞.
> - "Vậy dùng nó để làm gì?" → Làm bước đệm để tính Pearson r (chuẩn hoá).

---

## 3. Pearson r — chuẩn hoá covariance

### 3.1. Định nghĩa

**(a) Là gì**: Pearson r là cov chia cho tích 2 SD. Kết quả nằm trong [−1, 1], không phụ thuộc đơn vị.

**(b) Vì sao cần**: Để **so sánh** mức độ tương quan giữa các cặp biến khác đơn vị, hoặc giữa các dataset khác nhau.

**(c) Ví dụ trực giác**: r=1 nghĩa là *"X và Y nằm hoàn hảo trên 1 đường thẳng đi lên"*. r=−1: hoàn hảo trên đường đi xuống. r=0: không có quan hệ tuyến tính.

### 3.2. Công thức

\`\`\`
r = s_XY / (s_X · s_Y)
  = Σ(xᵢ−x̄)(yᵢ−ȳ) / √[Σ(xᵢ−x̄)² · Σ(yᵢ−ȳ)²]
\`\`\`

### 3.3. Diễn giải |r|

| |r| | Mức độ |
|------|--------|
| 0.00 – 0.19 | Rất yếu hoặc không có |
| 0.20 – 0.39 | Yếu |
| 0.40 – 0.59 | Trung bình |
| 0.60 – 0.79 | Mạnh |
| 0.80 – 1.00 | Rất mạnh |

(Quy ước heuristic — không phải luật cứng. Trong vật lý r=0.9 còn coi là kém; trong khoa học xã hội r=0.4 đã đáng chú ý.)

### 3.4. Walk-through 4 ví dụ số

**Ví dụ 1: tương quan hoàn hảo dương**

Data ví dụ 1 ở trên. s_XY = 5. SD x: √((4+1+0+1+4)/4) = √2.5 ≈ 1.581. SD y: √((16+4+0+4+16)/4) = √10 ≈ 3.162.

r = 5/(1.581 × 3.162) = 5/5.0 = **1.000** ✓

**Ví dụ 2: tương quan âm hoàn hảo**

Data ví dụ 2. s_XY = −5. s_X = √2.5 ≈ 1.581. s_Y = √(((4²+2²+0²+2²+4²)/4)) = √10 ≈ 3.162.

r = −5/(1.581 × 3.162) = **−1.000** ✓

**Ví dụ 3: thực tế — chiều cao vs cân nặng**

5 người: (160, 55), (165, 60), (170, 68), (175, 72), (180, 80).

x̄=170, ȳ=67.

| x | y | x−x̄ | y−ȳ | tích | (x−x̄)² | (y−ȳ)² |
|---|---|-----|-----|------|---------|---------|
| 160 | 55 | −10 | −12 | 120 | 100 | 144 |
| 165 | 60 | −5 | −7 | 35 | 25 | 49 |
| 170 | 68 | 0 | 1 | 0 | 0 | 1 |
| 175 | 72 | 5 | 5 | 25 | 25 | 25 |
| 180 | 80 | 10 | 13 | 130 | 100 | 169 |
| Σ | | | | 310 | 250 | 388 |

r = 310 / √(250 × 388) = 310 / √97000 = 310 / 311.45 = **0.995**.

Tương quan rất mạnh, dương.

**Ví dụ 4: lưu ý đơn vị KHÔNG đổi r**

Đổi cân nặng sang gram (×1000): y mới = [55000, 60000, …]. Mọi thứ (x−x̄)(y−ȳ) ×1000, nhưng SD y cũng ×1000 → r vẫn = 0.995.

> ⚠ **Lỗi thường gặp**:
> - **"r = 0 → biến độc lập"** — SAI! r đo *tuyến tính*. Quan hệ y = x² trên [−1,1] có r = 0 nhưng X và Y phụ thuộc chặt chẽ.
> - **"r cao → X gây Y"** — SAI! Correlation ≠ causation. Có thể do confounder (vd ăn kem ↔ đuối nước, do mùa hè).
> - **"r ≈ 0.7 mạnh hơn r ≈ 0.5 cỡ 0.2"** — không tuyến tính. Nên so sánh r² (xem dưới).

> ❓ **Câu hỏi tự nhiên**:
> - "r² nghĩa là gì?" → R² = r² là tỉ lệ phương sai của Y giải thích được bằng X qua đường hồi quy tuyến tính. r = 0.7 → r² = 0.49 — giải thích 49% phương sai. r = 0.5 → 25%. Khoảng cách thực = 24%, lớn hơn cảm giác.
> - "r có robust với outlier không?" → KHÔNG. 1 outlier có thể kéo r từ 0 sang 0.5. Dùng Spearman nếu lo outlier.

---

## 4. Spearman ρ và Kendall τ — tương quan robust và phi-tuyến

### 4.1. Spearman rank correlation

**Ý tưởng**: thay vì dùng giá trị thật, dùng **hạng (rank)** của giá trị. Sau đó tính Pearson trên rank.

\`\`\`
ρ = Pearson(rank_X, rank_Y)
\`\`\`

Lợi ích:
- Robust với outlier (1 giá trị quái dị chỉ đổi 1 hạng).
- Bắt được mọi quan hệ **monotonic** (đơn điệu), không cần tuyến tính.

**Ví dụ**: Data (1, 1), (2, 4), (3, 9), (4, 16), (5, 25) — y = x².

Pearson r ≈ 0.96 (rất cao nhưng không hoàn hảo vì quan hệ là cong).
Spearman ρ = **1.000** (hoàn hảo — vì khi x tăng thì y tăng đúng monotonic).

### 4.2. Kendall τ

**Ý tưởng**: đếm tỉ lệ **concordant pair** so với tổng cặp.

- 1 cặp (i, j) là concordant nếu (xᵢ < xⱼ và yᵢ < yⱼ) hoặc (xᵢ > xⱼ và yᵢ > yⱼ).
- Discordant nếu ngược chiều.

\`\`\`
τ = (#concordant − #discordant) / C(n, 2)
\`\`\`

**Ví dụ 4 điểm**: (1,2), (2,5), (3,4), (4,7).

Cặp (1,2): x↑ y↑ → concordant.  
Cặp (1,3): x↑ y↑ → concordant.  
Cặp (1,4): x↑ y↑ → concordant.  
Cặp (2,3): x↑ y↓ → discordant.  
Cặp (2,4): x↑ y↑ → concordant.  
Cặp (3,4): x↑ y↑ → concordant.

#concordant = 5, #discordant = 1, total = 6. τ = (5−1)/6 = **0.667**.

### 4.3. Khi nào dùng cái nào?

| Chỉ số | Quan hệ | Robust outlier | Tốn tính |
|--------|---------|----------------|----------|
| **Pearson r** | Linear | Không | Nhanh |
| **Spearman ρ** | Monotonic | Có | Tương đối nhanh |
| **Kendall τ** | Monotonic | Có (hơn Spearman) | O(n²) — chậm với n lớn |

**Quy tắc thực dụng**:
- Dữ liệu Normal, không outlier, quan hệ tuyến tính → Pearson.
- Có outlier, hoặc quan hệ phi-tuyến nhưng monotonic → Spearman.
- Sample nhỏ, cần thước đo chặt chẽ → Kendall.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Cho data (1, 10), (2, 8), (3, 3), (4, 5), (5, 1). Tính rank của y và xác định ρ Spearman dấu gì?
> <details><summary>Đáp án</summary>
> 
> Rank y (từ nhỏ tới lớn): y=1→1, y=3→2, y=5→3, y=8→4, y=10→5.  
> Theo thứ tự X: rank_Y = [5, 4, 2, 3, 1].  
> Rank_X = [1, 2, 3, 4, 5].  
> Pearson trên rank: 5 cặp, gần như tuyến tính giảm → ρ ≈ −0.9. **Âm mạnh**.
> </details>
> 
> 2. Hai biến có r = 0. Có thể kết luận chúng độc lập không?
> <details><summary>Đáp án</summary>
> 
> KHÔNG. r=0 chỉ nói "không có quan hệ tuyến tính". Có thể có quan hệ phi-tuyến (vd y = x²) khiến r = 0 nhưng X và Y phụ thuộc chặt.
> </details>

---

## 5. Anscombe quartet — bẫy khi tin vào một con số

Năm 1973 Francis Anscombe đưa ra 4 dataset, mỗi dataset 11 điểm, với các đặc tính:

| Dataset | x̄ | ȳ | s_X² | s_Y² | r |
|---------|----|----|------|------|---|
| I | 9 | 7.5 | 11 | 4.12 | 0.816 |
| II | 9 | 7.5 | 11 | 4.12 | 0.816 |
| III | 9 | 7.5 | 11 | 4.12 | 0.816 |
| IV | 9 | 7.5 | 11 | 4.12 | 0.816 |

**Cùng mean, cùng variance, cùng correlation!**

Nhưng hình dạng khác hẳn (xem Module 4 trong viz):

- **I**: quan hệ tuyến tính bình thường, tản đều quanh đường.
- **II**: quan hệ hình parabol — r=0.816 nhưng linear là sai mô hình.
- **III**: hoàn toàn tuyến tính NẾU bỏ 1 outlier kéo r xuống.
- **IV**: tất cả x = 8 trừ 1 outlier x=19 — outlier tạo r giả.

> 📝 **Tóm tắt**: **Luôn vẽ scatter trước**. Đừng tin một con số correlation mà không xem hình.

> ⚠ **Lỗi cực kỳ phổ biến**: Báo cáo "r = 0.7" mà không kèm scatter plot → người đọc không biết là dataset I (đáng tin) hay dataset IV (1 outlier kéo).

---

## 6. Correlation ≠ Causation — câu thần chú

Một câu chuyện cổ điển:

> Doanh số kem và số ca chết đuối ở Mỹ có **r ≈ 0.9** theo tháng.

Vậy ăn kem gây chết đuối? Tất nhiên KHÔNG. Có **biến thứ ba** (confounder) gây cả hai: **mùa hè** — hè nóng → ăn nhiều kem + đi bơi nhiều → chết đuối nhiều hơn.

3 lời giải thích cho mọi correlation X ↔ Y:

1. **X gây Y** (X causes Y).
2. **Y gây X** (Y causes X, reverse causation).
3. **Z gây cả X và Y** (confounder).

(Hoặc 4. Trùng hợp ngẫu nhiên — nhất là khi data nhỏ.)

Để phân biệt, cần **thí nghiệm** (RCT — randomized controlled trial) hoặc kỹ thuật causal inference. Xem [Lesson 02 Tầng 3](../../03-Advanced/lesson-02-causal-inference/README.md).

> 📝 **Tóm tắt mục 6**:
> - r đo "đi đôi", KHÔNG đo "gây ra".
> - Luôn nghĩ tới confounder.
> - Cách duy nhất khẳng định nhân quả từ data quan sát: thí nghiệm có kiểm soát.

---

## Bài tập

1. **Tính Pearson r bằng tay**: Cho data (2, 3), (4, 7), (6, 5), (8, 11), (10, 9). Tính x̄, ȳ, cov, s_X, s_Y, r. (Làm tròn 3 chữ số.)

2. **Spearman**: Cho data (1, 100), (2, 90), (3, 80), (4, 70), (5, 60). Tính Spearman ρ. So sánh với Pearson r — bạn dự đoán gì?

3. **Anscombe**: Tại sao 4 dataset Anscombe có cùng r dù khác hình dạng? Giải thích vì sao điều này có thể xảy ra ngay cả khi 1 dataset hoàn toàn không phù hợp với mô hình tuyến tính.

4. **Confounder hunt**: Một nghiên cứu thấy r = 0.85 giữa "số nhà thờ trong thành phố" và "số vụ phạm tội". Đưa ra 2 confounder hợp lý.

---

## Lời giải chi tiết

### Bài 1

x̄ = (2+4+6+8+10)/5 = **6**. ȳ = (3+7+5+11+9)/5 = **7**.

| x | y | x−x̄ | y−ȳ | tích | (x−x̄)² | (y−ȳ)² |
|---|---|-----|-----|------|---------|---------|
| 2 | 3 | −4 | −4 | 16 | 16 | 16 |
| 4 | 7 | −2 | 0 | 0 | 4 | 0 |
| 6 | 5 | 0 | −2 | 0 | 0 | 4 |
| 8 | 11 | 2 | 4 | 8 | 4 | 16 |
| 10 | 9 | 4 | 2 | 8 | 16 | 4 |
| Σ | | | | **32** | **40** | **40** |

cov = 32/(5−1) = **8**.  
s_X = √(40/4) = **√10 ≈ 3.162**.  
s_Y = √(40/4) = **√10 ≈ 3.162**.  
r = 8 / (3.162 × 3.162) = 8/10 = **0.800**.

Tương quan dương mạnh.

### Bài 2

Pearson: data hoàn toàn tuyến tính (y = 110 − 10x). r = **−1.000** chính xác.

Spearman: rank_X = [1,2,3,4,5], rank_Y = [5,4,3,2,1]. Pearson trên rank → ρ = **−1.000**.

Hai chỉ số bằng nhau vì quan hệ vừa tuyến tính vừa monotonic hoàn hảo. Khi đó Pearson = Spearman.

### Bài 3

Pearson r chỉ là **một con số tóm tắt**. Hai dataset có thể có cùng (x̄, ȳ, s_X, s_Y, Σ(x−x̄)(y−ȳ)) nhưng phân bố điểm hoàn toàn khác.

Ví dụ dataset Anscombe II: y = a + bx + cx² (parabol). Khi tính cov, các điểm trên nhánh trái và nhánh phải của parabol có thể "trung bình hoá" thành đúng cov như dataset linear. Tóm tắt số không phân biệt được hình dạng.

→ **Bài học**: Luôn vẽ scatter. Một con số không bao giờ thay thế được hình ảnh.

### Bài 4

Hai confounder hợp lý:

1. **Dân số / size của thành phố**: thành phố lớn → nhiều nhà thờ HƠN VÀ nhiều vụ phạm tội HƠN. Cả hai cùng tăng theo dân số → tạo correlation giả.
2. **Độ tuổi của thành phố**: thành phố cổ hơn có nhiều nhà thờ (xây qua thời gian) VÀ có nhiều phạm tội kinh điển (đô thị hoá lâu hơn).

Sau khi kiểm soát dân số (regression với population làm covariate), correlation thường biến mất hoặc đảo chiều.

---

## Bài tiếp theo

Hoàn tất **Tầng 1 Descriptive**. Bước sang [Tầng 2 — Inferential Statistics](../../02-Inferential/index.html), bắt đầu với:

→ [Lesson 01 Tầng 2: Sampling & CLT](../../02-Inferential/lesson-01-sampling-clt/README.md) — nền tảng của mọi suy luận thống kê.

## Tham khảo

- *OpenIntro Statistics*, Diez et al. — Chapter 1 (correlation), Chapter 8 (Anscombe).
- Francis Anscombe (1973), "Graphs in Statistical Analysis", *The American Statistician*.
- *Mostly Harmless Econometrics*, Angrist & Pischke — phần causation vs correlation.
`;
