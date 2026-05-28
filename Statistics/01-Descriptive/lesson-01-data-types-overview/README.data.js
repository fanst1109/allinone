// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/01-Descriptive/lesson-01-data-types-overview/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01: Loại dữ liệu & tổng quan thống kê

> **Tầng 1 — Descriptive Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **thống kê mô tả (descriptive)** và **thống kê suy luận (inferential)** — hiểu mỗi nhánh trả lời câu hỏi khác nhau nào.
- Phân biệt **tổng thể (population)** và **mẫu (sample)**; **tham số (parameter)** và **thống kê lượng (statistic)**.
- Phân loại biến thành **categorical** và **numerical**, rồi phân tầng tiếp theo thang đo **NOIR** (nominal, ordinal, interval, ratio).
- Biết thang đo quyết định công cụ nào được phép dùng — không tính trung bình cho biến nominal.
- Nhận diện loại biến trong dữ liệu thực và chọn được phép tóm tắt phù hợp.

## Kiến thức tiền đề

- Không bắt buộc tiên quyết mạnh; chỉ cần toán cơ bản (cộng, chia, ký hiệu sigma). Nếu muốn nền tảng số học đầy đủ: [\`../../../Math/01-Arithmetic-Algebra/\`](../../../Math/01-Arithmetic-Algebra/).
- Bài này mở đầu Tầng 1, không có lesson tiền đề trong Statistics.

---

## 1. Thống kê là gì — và nó làm gì?

> 💡 **Trực giác**: Hình dung bạn nhận được một thùng hàng chứa 10 000 tờ phiếu điều tra. Bạn không thể đọc từng tờ và nhớ hết. Thống kê là bộ công cụ giúp bạn **tóm gọn** thùng hàng đó thành vài con số + vài biểu đồ, rồi từ đó **suy ra điều chưa biết** về thế giới rộng hơn.

Thống kê (Statistics) là **khoa học thu thập, tổ chức, tóm tắt và rút ra kết luận từ dữ liệu**. Nó chia thành hai nhánh:

| Nhánh | Câu hỏi | Ví dụ |
|-------|---------|-------|
| **Mô tả (Descriptive)** | Dữ liệu này *trông như thế nào*? | "Lương trung bình mẫu = 15 triệu; 50% nằm trong [10M, 20M]." |
| **Suy luận (Inferential)** | Tổng thể *thực sự* như thế nào? | "Với CI 95%, lương trung bình cả nước ∈ [14.2M, 15.8M]." |

Tầng 1 này học toàn bộ **Descriptive Statistics**. Inferential Statistics học ở Tầng 2.

### 1.1. Vì sao cần thống kê mô tả trước?

Trước khi kiểm định giả thuyết hay xây dựng mô hình, bạn phải biết dữ liệu đang có trông như thế nào: có outlier không? Phân phối lệch phải hay trái? Hai biến có liên hệ không? Bỏ qua bước này dẫn đến "garbage in, garbage out" — mô hình đẹp trên dữ liệu tệ cho kết quả sai.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Descriptive vs Inferential — thực tế cùng làm một lúc không?" → Có, trong thực tế EDA (Exploratory Data Analysis) và inference thường xen kẽ. Nhưng về mặt khái niệm, descriptive *không* đưa ra kết luận về tổng thể — nó chỉ mô tả dữ liệu đang có. Inferential mới suy luận ra ngoài.
> - "Thống kê khác Data Science như thế nào?" → Data Science dùng thống kê + machine learning + engineering. Thống kê là nền tảng lý thuyết; Data Science áp dụng vào pipeline thực tế.

---

## 2. Population, Sample, Parameter, Statistic

> 💡 **Trực giác**: Bạn muốn biết chiều cao trung bình của toàn bộ sinh viên Việt Nam (khoảng 2 triệu người). Đo cả 2 triệu là không thực tế. Thay vào đó, bạn đo 1 000 sinh viên chọn ngẫu nhiên. **2 triệu sinh viên = population; 1 000 sinh viên được đo = sample**.

### 2.1. Định nghĩa

**(a) Là gì:**
- **Tổng thể (population)**: toàn bộ đối tượng quan tâm trong nghiên cứu. Có thể là người, vật, sự kiện, đo lường.
- **Mẫu (sample)**: tập con của tổng thể, thực sự được thu thập dữ liệu.
- **Tham số (parameter)**: đại lượng mô tả *tổng thể* — ký hiệu chữ Hy Lạp: µ (mean), σ (SD), ρ (correlation).
- **Thống kê lượng (statistic)**: đại lượng tính từ *mẫu* — ký hiệu chữ Latin: x̄ (sample mean), s (sample SD), r (sample correlation).

**(b) Vì sao cần phân biệt:**
Tham số thường **không biết được chính xác** (sẽ cần đo cả tổng thể). Statistic là **ước lượng** tham số từ mẫu. Toàn bộ inferential statistics là câu chuyện "thống kê lượng nói gì về tham số thật".

**(c) Ví dụ trực giác:**

| | Population | Sample |
|--|-----------|--------|
| **Đối tượng** | Toàn bộ 97 triệu người Việt Nam | 3 000 người được khảo sát |
| **Mean** | µ = ? (không biết) | x̄ = 58.2 kg (tính được) |
| **SD** | σ = ? | s = 11.4 kg |

### 2.2. Walk-through — 4 ví dụ

**Ví dụ 1 — Khảo sát vaccine:**
- Population: toàn bộ người Việt trưởng thành (~65 triệu).
- Sample: 5 000 người được chọn ngẫu nhiên từ 63 tỉnh.
- Parameter µ: tỉ lệ tiêm vaccine thật trong tổng thể (unknown).
- Statistic p̂: tỉ lệ trong mẫu = 4 212/5 000 = 84.2%.

**Ví dụ 2 — Kiểm tra pin điện thoại:**
- Population: tất cả pin trong lô sản xuất 10 000 cái.
- Sample: 200 pin được lấy ra kiểm tra.
- Parameter µ: tuổi thọ trung bình thật của lô.
- Statistic x̄: trung bình của 200 pin được kiểm tra = 847 giờ.

**Ví dụ 3 — Điểm thi quốc gia:**
- Population: tất cả thí sinh năm 2024 (~900 000 người).
- Sample: không cần — Bộ GD có điểm của tất cả → đây là **census** (kiểm tra toàn bộ). x̄ = µ khi có census.
- Bài học: khi có thể đo cả population, không cần sample và không cần inference.

**Ví dụ 4 — A/B test trang web:**
- Population: tất cả người dùng tương lai (vô hạn, không thể đo hết).
- Sample: 10 000 user được chia ngẫu nhiên vào nhóm A và B trong 2 tuần.
- Parameter: tỉ lệ click thật nếu tất cả user thấy version B.
- Statistic: 8.4% click trong nhóm B vs 6.1% trong nhóm A.

> ⚠ **Lỗi thường gặp**: Nhầm "sample size lớn = tốt" với "sample lớn = không cần inference". Dù sample có 1 triệu người, nếu đó vẫn là *subset* của population, bạn vẫn cần inferential statistics để nói về population. Sample size lớn chỉ giảm margin of error, không thay thế inference.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Công ty X chạy khảo sát hài lòng, nhận được 800 phản hồi từ tổng số 12 000 nhân viên. x̄ = 7.3/10. Phân biệt population, sample, parameter, statistic.
> <details><summary>Đáp án</summary>
> Population: 12 000 nhân viên. Sample: 800 người trả lời. Parameter µ: điểm hài lòng trung bình thật của cả 12 000 người (unknown). Statistic x̄: 7.3/10 (tính từ 800 phản hồi).
> </details>
>
> 2. Để kiểm tra toàn bộ sản phẩm trong dây chuyền, nhà máy lấy mẫu 1 trong 50. Đây là census hay sample?
> <details><summary>Đáp án</summary>
> Sample — chỉ 1/50 sản phẩm được kiểm tra. Population là toàn bộ sản phẩm sản xuất ra.
> </details>

---

## 3. Phân loại biến — Categorical và Numerical

> 💡 **Trực giác**: Hãy nghĩ về tờ khai y tế: "Giới tính", "Nhóm máu", "Tuổi", "Cân nặng", "Mức đau từ 1-10", "Nhiệt độ cơ thể". Các ô này **khác nhau hoàn toàn** về cách tính toán. Cộng nhóm máu (A + B = ?) thì vô nghĩa. Lấy trung bình nhiệt độ thì có nghĩa. Phân loại biến là bước đầu tiên để biết phép tính nào hợp lệ.

### 3.1. Hai nhóm lớn

**Biến categorical (phân loại)**: nhận giá trị thuộc về *danh mục*, không có phép tính số học tự nhiên.
- Ví dụ: màu tóc (đen/nâu/vàng), tỉnh/thành, loại xe, kết quả xét nghiệm (dương/âm).

**Biến numerical (số lượng)**: nhận giá trị số, có thể cộng/trừ/so sánh có nghĩa.
- **Rời rạc (discrete)**: đếm được, giá trị nguyên — số con trong gia đình, số lần click.
- **Liên tục (continuous)**: đo lường, có thể chia nhỏ tùy ý — chiều cao, thời gian, nhiệt độ.

### 3.2. Bốn thang đo NOIR

NOIR là từ viết tắt của **N**ominal, **O**rdinal, **I**nterval, **R**atio — 4 mức thang đo từ ít thông tin đến nhiều thông tin nhất.

| Thang đo | Phân loại | Có thứ tự? | Khoảng cách đều? | Có zero thật? | Phép tính hợp lệ |
|----------|-----------|:----------:|:----------------:|:-------------:|-----------------|
| **Nominal** | Categorical | | | | Mode, tần số |
| **Ordinal** | Categorical | ✓ | | | Mode, median, percentile |
| **Interval** | Numerical | ✓ | ✓ | | +, −, mean, SD |
| **Ratio** | Numerical | ✓ | ✓ | ✓ | +, −, ×, ÷, mean, SD, CV |

**Nominal (danh nghĩa):**
- Nhãn thuần túy, không hàm ý thứ bậc hay khoảng cách.
- Ví dụ: nhóm máu (A/B/O/AB), quốc tịch, màu sắc, loại hình doanh nghiệp.
- Được phép: đếm tần số, tính mode, vẽ pie/bar chart.
- Không được phép: nói "A + B = AB" hay "B lớn hơn A".

**Ordinal (thứ bậc):**
- Có thứ tự có nghĩa, nhưng khoảng cách giữa các bậc **không bằng nhau**.
- Ví dụ: xếp hạng phim (1 sao/2 sao/.../5 sao), trình độ học vấn (THCS/THPT/Đại học), mức độ đau (1-10).
- "3 sao" tốt hơn "2 sao", nhưng khoảng cách từ 2→3 không nhất thiết bằng từ 4→5.
- Được phép: median, percentile, ranking.
- Không được phép: mean (vì khoảng cách không đều).

> ⚠ **Lỗi cực phổ biến**: Lấy trung bình của thang Likert 1-5 (như "tính trung bình câu hỏi mức độ hài lòng"). Nhiều người làm điều này trong thực tế, và đây là điểm gây tranh cãi. Về mặt lý thuyết thang ordinal thì không được; trong thực tế nghiên cứu tâm lý học khi có ≥ 5 mức và phân phối đẹp, nhiều nhà thống kê chấp nhận mean. Nhưng bạn phải hiểu rõ giả định đang làm.

**Interval (khoảng):**
- Khoảng cách đều có nghĩa, nhưng **không có zero tuyệt đối** (số 0 là quy ước).
- Ví dụ: nhiệt độ Celsius/Fahrenheit, năm dương lịch, điểm IQ.
- 20°C và 30°C: khoảng cách 10°C có nghĩa. Nhưng "30°C gấp đôi 15°C" là **sai** — vì 0°C không phải "không có nhiệt".
- Được phép: cộng, trừ, mean, SD, correlation.
- Không được phép: tỉ số (×, ÷).

**Ratio (tỉ lệ):**
- Đầy đủ nhất — có zero tuyệt đối (số 0 = không có gì).
- Ví dụ: chiều cao, cân nặng, thu nhập, thời gian, số lượng.
- "60 kg gấp đôi 30 kg" là **đúng**. "0 kg" là không có khối lượng.
- Được phép: mọi phép tính — mean, SD, CV (coefficient of variation), ratio.

### 3.3. Walk-through — phân loại 4 dataset thực

**Dataset 1 — Khảo sát nhân khẩu học:**
| Biến | Giá trị mẫu | Phân loại |
|------|-------------|-----------|
| Giới tính | Nam/Nữ/Khác | Nominal |
| Học vấn | THPT/Đại học/Thạc sĩ | Ordinal |
| Năm sinh | 1990, 1985, 2001 | Interval (year) |
| Thu nhập tháng | 8M, 15M, 42M (VND) | Ratio |
| Số con | 0, 1, 2, 3 | Ratio discrete |

**Dataset 2 — Khảo sát sản phẩm:**
| Biến | Giá trị mẫu | Phân loại |
|------|-------------|-----------|
| Màu sản phẩm yêu thích | Đỏ/Xanh/Vàng | Nominal |
| Đánh giá 5 sao | 1/2/3/4/5 | Ordinal |
| Nhiệt độ vận hành (°C) | 25, 37, 50 | Interval |
| Trọng lượng kiện hàng (g) | 120, 450, 1200 | Ratio |

**Dataset 3 — Y tế:**
| Biến | Phân loại | Lý do |
|------|-----------|-------|
| Nhóm máu | Nominal | A, B, O, AB — không có thứ tự |
| Mức đau (1-10) | Ordinal | Có thứ tự, nhưng "8 đau gấp đôi 4" thì không chắc |
| Nhiệt độ cơ thể (°C) | Interval | 0°C không phải không có nhiệt |
| Nồng độ glucose (mg/dL) | Ratio | 0 mg/dL là không có glucose |

**Dataset 4 — Dữ liệu thể thao:**
| Biến | Phân loại | Lý do |
|------|-----------|-------|
| Vị trí thi đấu | Nominal | Tiền đạo/Hậu vệ/Thủ môn — không có thứ bậc |
| Hạng mục huy chương | Ordinal | Vàng > Bạc > Đồng, nhưng khoảng cách không đều |
| Số bàn thắng | Ratio discrete | 0 bàn = không ghi bàn; 10 = gấp đôi 5 |
| Tốc độ chạy (km/h) | Ratio continuous | 0 km/h = đứng yên |

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Zip code (mã bưu chính) là Nominal hay gì đó khác?" → Nominal. Dù trông như số, zip code chỉ là nhãn định danh — "10000" không lớn hơn "09000" theo nghĩa nào có giá trị. Cộng/trung bình zip code vô nghĩa.
> - "Interval và Ratio nhìn rất giống — thực tế có quan trọng không?" → Có. Với Ratio mới tính được Coefficient of Variation (CV = SD/mean) có nghĩa, hay nói "doanh thu tháng này gấp 1.5 lần tháng trước". Với Interval (nhiệt độ °C) câu "hôm nay ấm gấp đôi hôm qua" là vô nghĩa.
> - "Ordinal có tính median được không?" → Có. Median chỉ cần thứ tự, không cần khoảng cách đều. Nếu xếp hạng đánh giá: [1, 2, 3, 4, 5], median = 3.

> 📝 **Tóm tắt mục 3**:
> - Nominal: nhãn, không thứ tự, không khoảng cách.
> - Ordinal: có thứ tự, nhưng khoảng cách không đều.
> - Interval: khoảng cách đều, không zero tuyệt đối.
> - Ratio: đầy đủ nhất — có zero thật, mọi phép tính hợp lệ.
> - Thang đo quyết định công cụ thống kê được phép dùng.

---

## 4. Chọn công cụ thống kê theo loại biến

> 💡 **Trực giác**: Bạn không dùng dao mổ để gọt hoa quả, cũng không dùng dao gọt hoa quả để mổ. Công cụ thống kê cũng vậy — mỗi loại biến cần công cụ phù hợp. Dùng sai → kết quả vô nghĩa hoặc gây hiểu lầm nghiêm trọng.

### 4.1. Tóm tắt theo mục đích

| Mục đích | Nominal | Ordinal | Interval/Ratio |
|----------|---------|---------|----------------|
| **Đo trung tâm** | Mode | Median | Mean (+ Median nếu skewed) |
| **Đo phân tán** | Tần số (%), entropy | IQR, range | Variance, SD, IQR |
| **Biểu đồ 1 biến** | Bar chart, Pie chart | Bar chart (có thứ tự) | Histogram, boxplot |
| **Quan hệ 2 biến** | Chi-square test | Spearman ρ | Pearson r |
| **So sánh nhóm** | Chi-square | Kruskal-Wallis | ANOVA, t-test |

### 4.2. Quy tắc ngón tay cái

1. **Biến Nominal**: chỉ đếm và tính tỉ lệ. Mean của nominal = vô nghĩa.
2. **Biến Ordinal**: median an toàn; mean có thể dùng nếu giả định khoảng cách xấp xỉ đều (và nói rõ giả định đó).
3. **Biến Interval/Ratio**: mean + SD là bộ mặc định — nhưng nếu phân phối lệch mạnh (skewed), median + IQR robust hơn.
4. **Không bao giờ tính CV (SD/mean) cho Interval** — vì mean phụ thuộc vào điểm gốc tùy ý. CV chỉ có nghĩa khi zero = zero thật (Ratio).

> ⚠ **Lỗi thường gặp**: Đặt mã số (1 = Nam, 2 = Nữ, 3 = Khác) rồi tính "trung bình giới tính = 1.7" — đây là lỗi kinh điển. Mã số không phải số thật; nó chỉ là nhãn được gán giá trị integer để tiện lưu trữ.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Dataset có biến "Mức độ hài lòng" với giá trị 1/2/3/4/5. Bạn muốn báo cáo "giá trị điển hình". Nên dùng mean hay median? Vì sao?
> <details><summary>Đáp án</summary>
> Median an toàn hơn — đây là biến Ordinal. Median không giả định khoảng cách đều giữa 1, 2, 3, 4, 5. Nếu phân phối lệch (nhiều người chọn 5, ít người chọn 1), median = 4 mô tả trung tâm chính xác hơn mean = 3.8 vẻ "giữa".
> </details>
>
> 2. Nhiệt độ cao nhất tháng 7 tại Hà Nội đo bằng °C. Câu hỏi "Tháng 7 nóng gấp bao nhiêu lần tháng 1?" có trả lời được không?
> <details><summary>Đáp án</summary>
> Không — nhiệt độ °C là thang Interval, không có zero tuyệt đối. "37°C gấp đôi 18.5°C" vô nghĩa vì 0°C chỉ là quy ước. Muốn tính tỉ số nhiệt độ cần dùng Kelvin (thang Ratio): 310K / 291.5K ≈ 1.06 lần.
> </details>

---

## 5. Tổng quan quy trình phân tích dữ liệu

Bài này mở đầu toàn bộ lộ trình Statistics. Các bước tiêu chuẩn của một phân tích:

1. **Xác định câu hỏi** — bạn muốn biết gì? (Mô tả hay suy luận?)
2. **Thu thập dữ liệu** — census hay sample? Cách lấy mẫu có thiên lệch không?
3. **Phân loại biến** — NOIR, categorical/numerical → chọn công cụ (bài này).
4. **Mô tả & trực quan hóa** — mean/median/mode, SD/IQR, histogram, boxplot (Bài 02-04).
5. **Quan hệ giữa các biến** — correlation, scatter plot (Bài 05).
6. **Suy luận** — CI, hypothesis testing, ANOVA (Tầng 2).
7. **Báo cáo kết quả** — diễn giải trong bối cảnh, không chỉ báo con số.

> 📝 **Tóm tắt mục 5**:
> - Phân tích dữ liệu là quy trình 7 bước, không phải "chạy một công thức".
> - Bước 3 (phân loại biến) quyết định mọi bước tiếp theo.
> - Descriptive statistics (Tầng 1) là nền tảng của mọi phân tích.

---

## Bài tập

1. **Phân loại biến**: Dataset khảo sát sinh viên gồm các cột: \`mã_sinh_viên\` (vd SV001), \`giới_tính\` (Nam/Nữ), \`năm_học\` (1/2/3/4), \`điểm_GPA\` (0.0–4.0), \`chiều_cao_cm\`, \`phương_tiện_đi_lại\` (xe đạp/xe máy/ô tô/xe buýt/đi bộ), \`số_giờ_ngủ_ngày\`. Phân loại từng biến theo: (a) categorical hay numerical, (b) thang đo NOIR.

2. **Population vs Sample**: Bộ Y tế muốn ước tính tỉ lệ người trưởng thành bị tăng huyết áp tại Việt Nam. Họ thuê công ty khảo sát đo huyết áp của 8 000 người tại 8 tỉnh thành đại diện. (a) Xác định population, sample, parameter cần ước lượng, statistic. (b) Nếu kết quả cho thấy 25.3% trong mẫu bị tăng huyết áp, câu nào sau đây đúng: "Chính xác 25.3% người Việt bị tăng huyết áp" hay "Tỉ lệ tăng huyết áp trong tổng thể ước lượng khoảng 25.3%"?

3. **Sai lầm thang đo**: Một analyst tính "màu sắc yêu thích trung bình" bằng cách gán Đỏ=1, Xanh=2, Vàng=3 và lấy mean = 1.8. Giải thích tại sao phép tính này sai và kết quả "Màu trung bình = 1.8" không có nghĩa. Nên báo cáo thống kê gì thay thế?

4. **Thiết kế thu thập dữ liệu**: Bạn muốn nghiên cứu "Giờ làm thêm ảnh hưởng đến điểm thi như thế nào" ở sinh viên năm nhất. (a) Liệt kê ít nhất 4 biến bạn cần thu thập, phân loại thang đo mỗi biến. (b) Population là gì? Sample khả thi là gì? (c) Biến nào là biến phụ thuộc (outcome), biến nào là biến độc lập?

## Lời giải chi tiết

### Bài 1

**Phân loại từng biến:**

| Biến | Categorical / Numerical | Thang đo | Giải thích |
|------|------------------------|----------|-----------|
| \`mã_sinh_viên\` | Categorical | **Nominal** | Chỉ là nhãn định danh, "SV002 > SV001" vô nghĩa |
| \`giới_tính\` | Categorical | **Nominal** | Nam/Nữ không có thứ bậc tự nhiên |
| \`năm_học\` | Categorical (có thứ tự) | **Ordinal** | 4 > 3 > 2 > 1, nhưng "bước từ năm 1→2" không nhất thiết bằng "2→3" về mặt kiến thức |
| \`điểm_GPA\` | Numerical continuous | **Ratio** | GPA 0.0 = không đạt điểm nào; 4.0 = gấp đôi 2.0 (trong phạm vi scale) |
| \`chiều_cao_cm\` | Numerical continuous | **Ratio** | 0 cm = không có chiều cao; 180 cm = gấp đôi 90 cm |
| \`phương_tiện_đi_lại\` | Categorical | **Nominal** | Không có thứ bậc tự nhiên giữa các phương tiện |
| \`số_giờ_ngủ_ngày\` | Numerical continuous | **Ratio** | 0 giờ = không ngủ; 8 giờ = gấp đôi 4 giờ |

*Lưu ý về \`năm_học\`*: Nhiều người phân loại là Ordinal, một số coi là gần Interval (vì khoảng cách 1 năm học xấp xỉ đều). Trong context này, Ordinal an toàn hơn vì khoảng cách kiến thức/trải nghiệm không đồng đều.

### Bài 2

**(a) Phân loại:**
- **Population**: Toàn bộ người Việt Nam trưởng thành (≥ 18 tuổi, khoảng 68–70 triệu người).
- **Sample**: 8 000 người được đo huyết áp trong khảo sát.
- **Parameter**: Tỉ lệ tăng huyết áp thật trong tổng thể (ký hiệu π, unknown).
- **Statistic**: Tỉ lệ tăng huyết áp trong mẫu = p̂ = 2 024/8 000 ≈ 25.3%.

**(b) Câu nào đúng:**
Câu thứ hai: *"Tỉ lệ tăng huyết áp trong tổng thể ước lượng khoảng 25.3%"* là đúng.

Giải thích: 25.3% là giá trị tính từ *mẫu*, không phải giá trị chính xác của tổng thể. Câu "Chính xác 25.3% người Việt bị tăng huyết áp" có nghĩa ta đã đo cả 68 triệu người — điều đó không xảy ra. Mẫu cho ta *ước lượng điểm* (point estimate); để nói chính xác hơn cần kèm khoảng tin cậy (sẽ học ở Tầng 2, Bài 02).

### Bài 3

**Tại sao sai:**
\`màu sắc yêu thích\` là biến **Nominal** — các giá trị (Đỏ/Xanh/Vàng) chỉ là nhãn. Việc gán 1/2/3 là *tùy tiện*: nếu gán Đỏ=2, Xanh=1, Vàng=3, mean sẽ khác. Kết quả "màu trung bình = 1.8" phụ thuộc hoàn toàn vào cách gán số, không có ý nghĩa thực tế.

Ví dụ phản chứng cụ thể:
- Gán ban đầu: Đỏ=1, Xanh=2, Vàng=3 → mean = 1.8
- Gán thay thế: Đỏ=3, Xanh=1, Vàng=2 → mean của cùng dataset = khác hẳn.

**Nên báo cáo gì thay thế:**
- **Mode**: màu được chọn nhiều nhất. Vd "Màu Xanh chiếm 45%, là màu phổ biến nhất."
- **Bảng tần số**: Đỏ: 35%, Xanh: 45%, Vàng: 20%.
- **Bar chart** với tần số/tỉ lệ từng nhóm.

### Bài 4

**(a) Biến cần thu thập:**

| Biến | Thang đo | Ghi chú |
|------|----------|---------|
| Số giờ làm thêm/tuần | Ratio (continuous) | Biến độc lập chính |
| Điểm thi cuối kỳ (%) | Ratio (continuous) | Biến phụ thuộc |
| Điểm GPA học kỳ trước | Ratio (continuous) | Biến kiểm soát (confound) |
| Ngành học | Nominal | Các ngành có độ khó khác nhau |
| Số giờ ngủ/ngày | Ratio (continuous) | Biến trung gian tiềm năng |
| Thu nhập gia đình (nhóm) | Ordinal | Bối cảnh kinh tế ảnh hưởng áp lực làm thêm |

**(b) Population và Sample:**
- Population: Toàn bộ sinh viên năm nhất đại học Việt Nam (khoảng 400 000+ sinh viên nhập học mỗi năm).
- Sample khả thi: 300–500 sinh viên năm nhất từ 3–5 trường đại học ở Hà Nội và TP.HCM, chọn ngẫu nhiên theo tầng (stratified sampling theo ngành).

**(c) Biến phụ thuộc và độc lập:**
- **Biến phụ thuộc (outcome)**: điểm thi cuối kỳ — đây là cái ta muốn giải thích.
- **Biến độc lập (predictor)**: số giờ làm thêm/tuần — đây là yếu tố ta giả thuyết gây ảnh hưởng.
- Các biến còn lại (GPA trước, ngành học, giờ ngủ, thu nhập) là **biến kiểm soát (confounders)** — cần kiểm soát để tránh hiểu sai nhân quả.

---

## Bài tiếp theo

[Lesson 02: Đo lường trung tâm](../lesson-02-central-tendency/README.md) — Mean, median, mode: định nghĩa chính xác, công thức, và khi nào mỗi thước đo bị "lừa" bởi outliers.

## Tham khảo

- OpenIntro Statistics, 4th ed. — Chapter 1 (Introduction to Data).
- Khan Academy: Statistics & Probability — "Types of statistical studies".
- Moore, D.S., McCabe, G.P.: *Introduction to the Practice of Statistics*, Chapter 1.
`;
