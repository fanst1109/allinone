// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Statistics/01-Descriptive/lesson-02-central-tendency/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02: Đo lường trung tâm

> **Tầng 1 — Descriptive Statistics · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Tính được **mean, median, mode** từ bất kỳ dataset nào, bao gồm dữ liệu có outlier và dữ liệu phân loại.
- Giải thích được **khi nào mean bị lừa** — đặc biệt trong dữ liệu lệch (skewed) và khi có outlier cực đoan.
- Biết khi nào chọn mean, khi nào chọn median, khi nào mode là thống kê phù hợp nhất.
- Hiểu sơ lược về **geometric mean** và **harmonic mean** — mỗi cái dùng khi nào.
- Nắm được khái niệm **robust statistics** và tại sao median bền hơn mean trước outlier.

## Kiến thức tiền đề

- [Lesson 01: Loại dữ liệu & tổng quan](../lesson-01-data-types-overview/README.md) — thang đo NOIR, phân biệt population/sample.
- Ký hiệu sigma ($\\sum$) và phép trung bình: $\\bar{x} = \\dfrac{\\sum x_i}{n}$.

---

## 1. Tại sao cần "đo trung tâm"?

> 💡 **Trực giác**: Bạn muốn tóm tắt thu nhập của 1 000 nhân viên bằng **một con số duy nhất**. Đó là "giá trị điển hình" — nơi phân phối "tập trung". Nhưng "điển hình" có thể đo theo nhiều cách khác nhau, và chọn sai có thể gây hiểu lầm nghiêm trọng.

Thước đo trung tâm (measure of central tendency) trả lời câu hỏi: *"Nếu phải chọn một con số đại diện cho toàn bộ dữ liệu, đó là số nào?"*

Ba thước đo phổ biến nhất:

| Thước đo | Tiếng Anh | Định nghĩa ngắn |
|----------|-----------|----------------|
| Trung bình | Mean | Tổng / số phần tử |
| Trung vị | Median | Giá trị ở giữa khi sắp xếp |
| Mode | Mode | Giá trị xuất hiện nhiều nhất |

---

## 2. Mean — Trung bình số học

### 2.1. Định nghĩa

**(a) Là gì:** Mean là tổng của tất cả giá trị chia cho số lượng giá trị. Nó là điểm "cân bằng" của phân phối — nếu bạn đặt phân phối lên một cái bập bênh, mean là điểm tựa.

**(b) Vì sao cần:** Mean là thước đo tối ưu khi phân phối đối xứng, không có outlier mạnh — nó dùng toàn bộ thông tin từ mọi điểm dữ liệu.

**(c) Ví dụ trực giác:** 5 học sinh có điểm $[7, 8, 9, 8, 8]$. Bạn muốn biết "điểm trung bình lớp". Mean $= \\dfrac{7+8+9+8+8}{5} = \\dfrac{40}{5} = 8$.

**Công thức:**

$$\\bar{x} = \\dfrac{x_1 + x_2 + \\cdots + x_n}{n} = \\dfrac{\\sum x_i}{n} \\quad \\text{(mẫu)} \\qquad \\mu = \\dfrac{\\sum x_i}{N} \\quad \\text{(tổng thể)}$$

**Walk-through với số cụ thể — 4 ví dụ:**

**Ví dụ 1 — Dataset nhỏ:**
Dataset: \`[4, 7, 13, 2, 9]\`
- Tổng: $4 + 7 + 13 + 2 + 9 = 35$
- $n = 5$
- $\\bar{x} = \\dfrac{35}{5} = \\mathbf{7}$
- Verify: $7$ là "điểm cân bằng" — tổng độ lệch âm $= (7-4)+(7-2) = 8$; tổng độ lệch dương $= (13-7)+(9-7)+(7-7) = 8$. Cân bằng ✓

**Ví dụ 2 — Lương 5 nhân viên:**
Dataset: \`[12M, 15M, 13M, 14M, 16M]\` (triệu VND/tháng)
- Tổng: $70M$
- $\\bar{x} = \\dfrac{70M}{5} = \\mathbf{14M}$
- Ý nghĩa: nếu tổng lương chia đều cho 5 người, mỗi người nhận 14M.

**Ví dụ 3 — Dataset với số âm (nhiệt độ):**
Dataset: \`[-3, 1, 4, -1, 5, 2, 0]\` (°C, nhiệt độ 7 ngày mùa đông)
- Tổng: $-3+1+4+(-1)+5+2+0 = 8$
- $n = 7$
- $\\bar{x} = \\dfrac{8}{7} \\approx \\mathbf{1{,}14}$°C
- Nhiệt độ trung bình tuần là $1{,}14$°C — gần mức đóng băng.

**Ví dụ 4 — Dataset lớn với outlier:**
Dataset lương phòng marketing 6 người: \`[12M, 13M, 11M, 14M, 12M, 150M]\`
- Người cuối là Giám đốc Marketing.
- Tổng: $12+13+11+14+12+150 = 212M$
- $\\bar{x} = \\dfrac{212M}{6} \\approx \\mathbf{35{,}3M}$
- Kết quả: "lương trung bình phòng $= 35{,}3M$" — mọi người sẽ ngạc nhiên vì 5/6 người nhận dưới 14M.

> ⚠ **Lỗi thường gặp**: Báo cáo mean mà không kiểm tra outlier. Ví dụ 4 là minh họa kinh điển — một outlier cực đoan (150M) kéo mean lên hơn gấp đôi giá trị "điển hình". Trong dữ liệu lệch (skewed distribution), **mean không đại diện cho "người điển hình"**.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Mean có nhạy cảm với outlier bao nhiêu?" → Rất nhạy. Một outlier cực đoan có thể kéo mean ra khỏi phạm vi 99% dữ liệu còn lại (ví dụ Bill Gates bước vào một quán cà phê bình dân, mean tài sản của quán đó nhảy vọt lên hàng tỉ USD).
> - "Mean của population ($\\mu$) và mean của sample ($\\bar{x}$) khác nhau gì?" → Cùng công thức, nhưng $\\mu$ tính từ toàn bộ population (thường không biết); $\\bar{x}$ tính từ sample (thường dùng để ước lượng $\\mu$).
> - "Khi nào mean âm?" → Khi tổng dữ liệu âm. Ví dụ lợi nhuận kinh doanh: $[-5M, -2M, -8M, 3M] \\to \\bar{x} = \\dfrac{-12M}{4} = -3M$ (lỗ trung bình 3M/tháng).

---

## 3. Median — Trung vị

### 3.1. Định nghĩa

**(a) Là gì:** Median là giá trị **ở giữa** của dataset đã sắp xếp theo thứ tự. Một nửa dữ liệu nằm dưới median, một nửa nằm trên.

**(b) Vì sao cần:** Median không bị kéo bởi outlier. Khi phân phối lệch hoặc có outlier cực đoan, median mô tả "điển hình" tốt hơn mean nhiều.

**(c) Ví dụ trực giác:** 5 ngôi nhà trên một phố có giá \`[500M, 600M, 550M, 580M, 5000M]\`. Mean $= 1\\,446M$ — bị ngôi nhà biệt thự kéo lên. Median $= 580M$ — phản ánh "nhà điển hình" trên phố này.

**Công thức:**

Sắp xếp data: $x_{(1)} \\leq x_{(2)} \\leq \\cdots \\leq x_{(n)}$

$$\\text{Median} = \\begin{cases} x_{((n+1)/2)} & \\text{nếu } n \\text{ lẻ} \\\\[4pt] \\dfrac{x_{(n/2)} + x_{(n/2+1)}}{2} & \\text{nếu } n \\text{ chẵn} \\end{cases}$$

**Walk-through — 4 ví dụ:**

**Ví dụ 1 — n lẻ:**
Dataset: \`[3, 1, 7, 4, 9]\`
- Sắp xếp: \`[1, 3, **4**, 7, 9]\`
- $n = 5$, vị trí giữa $= \\dfrac{5+1}{2} = 3$
- Median $= x_{(3)} = \\mathbf{4}$
- Verify: 2 phần tử nhỏ hơn (1, 3), 2 phần tử lớn hơn (7, 9).

**Ví dụ 2 — n chẵn:**
Dataset: \`[2, 5, 8, 11]\`
- Đã sắp xếp: \`[2, **5**, **8**, 11]\`
- $n = 4$, hai phần tử giữa: $x_{(2)} = 5$ và $x_{(3)} = 8$
- Median $= \\dfrac{5 + 8}{2} = \\mathbf{6{,}5}$
- Verify: $6{,}5$ không có trong dataset — điều này bình thường.

**Ví dụ 3 — Lương với outlier (so sánh vs mean):**
Dataset lương: \`[12M, 13M, 11M, 14M, 12M, 150M]\`
- Sắp xếp: \`[11, 12, **12**, **13**, 14, 150]\` (M)
- $n = 6$ (chẵn), hai phần tử giữa: 12 và 13
- Median $= \\dfrac{12 + 13}{2} = \\mathbf{12{,}5M}$
- So sánh: Mean $= 35{,}3M$ vs Median $= 12{,}5M$. Median phản ánh đúng hơn mức lương của "nhân viên điển hình".

**Ví dụ 4 — Dataset với nhiều giá trị bằng nhau:**
Điểm thi: \`[7, 8, 8, 8, 9, 9, 10]\`
- Đã sắp xếp, $n = 7$, vị trí giữa $= 4$
- Median $= x_{(4)} = \\mathbf{8}$
- Mean $= \\dfrac{7+8+8+8+9+9+10}{7} = \\dfrac{59}{7} \\approx 8{,}43$
- Ở đây mean và median gần nhau vì không có outlier mạnh.

> ⚠ **Lỗi thường gặp**: Quên sắp xếp trước khi tìm median. Dataset \`[3, 7, 1, 5]\` không phải "median = (7+1)/2 = 4". Phải sắp xếp: \`[1, 3, 5, 7]\` → median = (3+5)/2 = 4 (trùng hợp trong ví dụ này, nhưng không phải luôn luôn).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Dataset: \`[15, 3, 20, 7, 11]\`. Tính mean và median.
> <details><summary>Đáp án</summary>
> Mean $= \\dfrac{15+3+20+7+11}{5} = \\dfrac{56}{5} = 11{,}2$. Sắp xếp: $[3, 7, 11, 15, 20]$, Median $= 11$ (vị trí 3). Mean và median gần nhau — dataset khá đối xứng.
> </details>
>
> 2. Dataset lương: \`[8M, 9M, 10M, 9M, 200M]\`. Median hay mean đại diện tốt hơn cho "lương điển hình"?
> <details><summary>Đáp án</summary>
> Median tốt hơn. Mean $= \\dfrac{8+9+10+9+200}{5} = \\dfrac{236}{5} = 47{,}2M$ — bị kéo bởi 200M. Median: sắp xếp $[8, 9, 9, 10, 200]$, median $= 9M$ — phản ánh đúng lương của 3/5 người thực tế.
> </details>

---

## 4. Mode — Yếu vị

### 4.1. Định nghĩa

**(a) Là gì:** Mode là giá trị (hoặc nhóm giá trị) xuất hiện **nhiều nhất** trong dataset.

**(b) Vì sao cần:** Mode là thước đo trung tâm duy nhất hoạt động được với dữ liệu **Nominal**. Ngoài ra, mode hữu ích khi muốn biết "giá trị phổ biến nhất" (không phải "giá trị trung bình").

**(c) Ví dụ trực giác:** Nhà sản xuất giày muốn biết "size nào nên sản xuất nhiều nhất?" → cần mode của size, không cần mean (size 42.3 không tồn tại).

**Walk-through — 4 ví dụ:**

**Ví dụ 1 — Dataset số:**
\`[4, 7, 4, 9, 4, 2, 8]\` → 4 xuất hiện 3 lần (nhiều nhất) → Mode = **4**

**Ví dụ 2 — Bimodal (2 mode):**
\`[1, 2, 2, 3, 3, 4, 5]\` → 2 và 3 đều xuất hiện 2 lần → Mode = **{2, 3}** (bimodal)
Phân phối bimodal thường gợi ý có 2 nhóm khác nhau trong dữ liệu.

**Ví dụ 3 — Dữ liệu categorical:**
Màu sắc yêu thích: \`[Đỏ, Xanh, Xanh, Vàng, Xanh, Đỏ, Xanh]\`
- Xanh xuất hiện 4 lần → Mode = **Xanh**
- Đây là thước đo duy nhất có nghĩa với biến Nominal này (không thể tính mean hay median của màu sắc).

**Ví dụ 4 — Không có mode:**
\`[1, 2, 3, 4, 5]\` → mỗi giá trị xuất hiện đúng 1 lần → **Không có mode** (uniform distribution).

> ❓ **Câu hỏi tự nhiên của người đọc**
> - "Nếu có 3 mode thì sao?" → Gọi là trimodal hoặc multimodal. Thường là dấu hiệu dữ liệu từ nhiều nhóm khác nhau (ví dụ điểm thi của 3 lớp học trộn lẫn).
> - "Mode của biến continuous có ý nghĩa không?" → Cho biến continuous (chiều cao, cân nặng), mode gần như không bao giờ xuất hiện tự nhiên vì dữ liệu đo lường với precision cao. Thay vào đó, dùng modal class (nhóm bin có tần số cao nhất trong histogram).

---

## 5. Khi nào dùng cái nào?

> 💡 **Trực giác**: Ba thước đo này như ba bác sĩ nhìn cùng một bệnh nhân nhưng đo những thứ khác nhau. Tùy câu hỏi, bạn cần đúng "bác sĩ" đúng.

| Tình huống | Dùng | Lý do |
|-----------|------|-------|
| Dữ liệu Nominal | **Mode** | Mode duy nhất hợp lệ |
| Dữ liệu Ordinal | **Median** | Có thứ tự nhưng khoảng cách không đều |
| Interval/Ratio, phân phối đối xứng, không outlier | **Mean** | Dùng đầy đủ thông tin nhất |
| Interval/Ratio, có outlier mạnh hoặc lệch | **Median** | Robust hơn, không bị kéo |
| Muốn biết giá trị phổ biến nhất | **Mode** | Mode = "đỉnh" phân phối |
| Báo cáo thu nhập, giá nhà | **Median** | Luôn có outlier triệu phú/tỉ phú |
| Nhiệt độ trung bình tháng | **Mean** | Phân phối nhiệt độ thường đối xứng |

### 5.1. Bất đẳng thức vàng (Pearson's Rule)

Với phân phối lệch phải (right-skewed, đuôi dài bên phải — điển hình của thu nhập):

$$\\text{Mode} < \\text{Median} < \\text{Mean}$$

Với phân phối lệch trái (left-skewed, đuôi dài bên trái — điển hình của điểm thi dễ):

$$\\text{Mean} < \\text{Median} < \\text{Mode}$$

Với phân phối đối xứng (normal distribution):

$$\\text{Mean} \\approx \\text{Median} \\approx \\text{Mode}$$

Ví dụ cụ thể với dataset \`[1, 2, 3, 4, 100]\`:
- Mode = 1 (mỗi giá trị xuất hiện 1 lần — thực tế không có mode rõ, dùng giá trị nhỏ nhất hay nói "no mode").
- Median: sắp xếp \`[1, 2, **3**, 4, 100]\` → Median = 3.
- Mean $= \\dfrac{1+2+3+4+100}{5} = \\dfrac{110}{5} = 22$.
- Ta thấy rõ: Mean (22) bị kéo xa khỏi phần lớn dữ liệu (1–4). Median (3) mô tả "giữa" tốt hơn.

> ⚠ **Lỗi cực phổ biến**: Báo "lương trung bình" của một đơn vị mà không nói rõ là arithmetic mean hay median. Bill Gates bước vào quán cà phê với 5 khách khác: lương 5 người = [8M, 10M, 9M, 11M, 12M]; Gates = 200 000M → mean "lương" của 6 người $= 200\\,050M/6 \\approx 33\\,342M$. Median $= \\dfrac{10+11}{2} = 10{,}5M$. Hỏi "lương trung bình quán cà phê này bao nhiêu?" → ý nghĩa hoàn toàn khác nhau.

> 📝 **Tóm tắt mục 5**:
> - Mean: tốt nhất khi phân phối đối xứng, không outlier.
> - Median: robust — không bị kéo bởi outlier; dùng khi lệch hoặc có giá trị cực đoan.
> - Mode: duy nhất dùng được với Nominal; cũng hữu ích để tìm "giá trị phổ biến nhất".
> - Với thu nhập/giá nhà/giá cổ phiếu → luôn dùng median (luôn có outlier).

---

## 6. Geometric Mean và Harmonic Mean — khi nào cần

### 6.1. Geometric Mean — trung bình nhân

**(a) Là gì:** Trung bình nhân (geometric mean) là căn bậc n của tích n giá trị.

**(b) Vì sao cần:** Dùng khi dữ liệu là **tốc độ tăng trưởng (rates)** hay **nhân tử (multipliers)** — khi các giá trị được *nhân* với nhau, không *cộng* lại.

**(c) Công thức:** $G = (x_1 \\times x_2 \\times \\cdots \\times x_n)^{1/n}$

**Ví dụ:** Cổ phiếu tăng 3 năm liên tiếp với tỉ lệ: $+50\\%$ ($\\times 1{,}5$), $-20\\%$ ($\\times 0{,}8$), $+30\\%$ ($\\times 1{,}3$).
- Nếu dùng arithmetic mean: $\\dfrac{1{,}5+0{,}8+1{,}3}{3} = 1{,}2 \\to$ "tăng $20\\%$/năm" → sai.
- Geometric mean: $(1{,}5 \\times 0{,}8 \\times 1{,}3)^{1/3} = (1{,}56)^{1/3} \\approx 1{,}159 \\to$ tăng $\\mathbf{15{,}9\\%}$/năm → đúng.
- Verify: $100 \\times 1{,}5 \\times 0{,}8 \\times 1{,}3 = 156$; $100 \\times 1{,}159^3 \\approx 156$ ✓

### 6.2. Harmonic Mean — trung bình điều hòa

**(a) Là gì:** Nghịch đảo của trung bình của các nghịch đảo.

**(b) Vì sao cần:** Dùng khi dữ liệu là **tốc độ (rates)** hay **mật độ** — ví dụ km/h khi tổng quãng đường cố định.

**(c) Công thức:** $H = \\dfrac{n}{\\frac{1}{x_1} + \\frac{1}{x_2} + \\cdots + \\frac{1}{x_n}}$

**Ví dụ:** Bạn đi 100 km với tốc độ 60 km/h, rồi 100 km tiếp theo với 40 km/h. Tốc độ trung bình?
- Arithmetic mean sai: $\\dfrac{60+40}{2} = 50$ km/h.
- Harmonic mean đúng: $H = \\dfrac{2}{\\frac{1}{60} + \\frac{1}{40}} = \\dfrac{2}{0{,}0167 + 0{,}025} = \\dfrac{2}{0{,}0417} \\approx \\mathbf{48}$ km/h.
- Verify: Tổng thời gian $= \\dfrac{100}{60} + \\dfrac{100}{40} = 1{,}667 + 2{,}5 = 4{,}167$ giờ. Tổng quãng đường = 200 km. Tốc độ thật $= \\dfrac{200}{4{,}167} \\approx 48$ km/h ✓.

---

## 7. Robust Statistics — thống kê bền vững

> 💡 **Trực giác**: "Robust" nghĩa là không bị lung lay bởi một vài điểm dữ liệu xấu (outlier). Như cái cân chợ vs cân điện tử: cân điện tử chính xác hơn khi mọi thứ ổn, nhưng cân chợ không hỏng khi ai đó để vật lạ lên. Median là "cân chợ" của statistics.

| Thống kê | Robust? | Lý do |
|----------|:-------:|-------|
| Mean | Không | Phụ thuộc giá trị từng điểm — 1 outlier thay đổi mean mạnh |
| Median | Có | Chỉ cần thứ tự — outlier không thay đổi median nếu không vượt qua "điểm giữa" |
| Mode | Có (với Nominal/Ordinal) | Chỉ đếm tần số — outlier dạng số lạ ít ảnh hưởng |
| Trimmed mean | Bán robust | Bỏ p% dữ liệu ở 2 đầu trước khi tính mean |

**Trimmed mean** là thỏa hiệp: bỏ 5% hay 10% đầu và đuôi, tính mean phần còn lại. Được dùng trong thể thao (loại điểm cao nhất và thấp nhất của ban giám khảo).

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Dataset: \`[2, 3, 5, 7, 8, 9, 1000]\`. Tính mean và median. Thước đo nào phản ánh "trung tâm" của 6 giá trị đầu tốt hơn?
> <details><summary>Đáp án</summary>
> Mean $= \\dfrac{2+3+5+7+8+9+1000}{7} = \\dfrac{1034}{7} \\approx 147{,}7$. Median: sắp xếp [2, 3, 5, 7, 8, 9, 1000], median = 7 (vị trí 4). Median (7) phản ánh tốt hơn — nó nằm trong phạm vi 6 giá trị thực tế, còn mean ($147{,}7$) bị kéo xa bởi 1000.
> </details>
>
> 2. Một lớp có điểm thi: [5, 6, 7, 7, 8, 8, 8, 9, 10]. Tính cả ba: mean, median, mode.
> <details><summary>Đáp án</summary>
> Mean $= \\dfrac{5+6+7+7+8+8+8+9+10}{9} = \\dfrac{68}{9} \\approx 7{,}56$. Median: $n=9$, vị trí 5, sắp xếp đã xong → median = 8. Mode = 8 (xuất hiện 3 lần). Lưu ý: Mode = Median ở đây, và cả ba đều gần nhau → phân phối khá đối xứng và gần Normal.
> </details>

---

> 📝 **Tóm tắt bài**:
> - **Mean** = tổng chia n — tối ưu khi symmetric, tệ khi có outlier.
> - **Median** = giá trị giữa khi sắp xếp — robust, tốt khi có outlier hoặc skewed.
> - **Mode** = giá trị phổ biến nhất — duy nhất dùng được với Nominal.
> - Geometric mean cho tỉ lệ tăng trưởng; Harmonic mean cho tốc độ khi quãng đường cố định.
> - Quy tắc vàng: khi nghe "lương trung bình", hỏi ngay "mean hay median?".

---

## Bài tập

1. **Tính và so sánh**: Dataset điểm thi của 10 học sinh: \`[6, 7, 8, 9, 7, 8, 9, 10, 7, 85]\`. (Cố ý có lỗi nhập liệu — 85 thay vì 8.5.) Tính mean, median, mode. Thước đo nào chịu ảnh hưởng nhiều nhất từ giá trị sai?

2. **Câu chuyện lương**: Một công ty báo cáo "lương trung bình nhân viên = 45 triệu VND/tháng". Khi bạn hỏi thêm, biết được: 80 nhân viên bình thường nhận 15–25M, 5 quản lý cấp trung nhận 40–60M, và CEO nhận 500M. (a) Ước tính median lương có thể vào khoảng nào? (b) Giải thích tại sao con số "45M" có thể gây hiểu lầm cho ứng viên.

3. **Geometric mean thực hành**: Một quỹ đầu tư báo cáo tăng trưởng 4 năm: +30%, −10%, +25%, +5% (tương ứng ×1.3, ×0.9, ×1.25, ×1.05). Tính (a) Arithmetic mean của tỉ lệ tăng trưởng, (b) Geometric mean. Kết quả nào phản ánh đúng tăng trưởng thực sự hàng năm?

4. **Chọn thước đo phù hợp**: Với mỗi dataset sau, chọn mean/median/mode và giải thích:
   - (a) Thời gian giao hàng (phút): \`[25, 30, 28, 32, 27, 350]\` — 350 là xe bị hỏng.
   - (b) Nhóm máu của 100 bệnh nhân: A(45), B(25), O(20), AB(10).
   - (c) Nhiệt độ tối cao tháng 7 tại Hà Nội 30 năm qua (°C).
   - (d) Giá bất động sản tại Quận 1, TP.HCM (tỉ VND).

## Lời giải chi tiết

### Bài 1

**Tính:**
- Mean $= \\dfrac{6+7+8+9+7+8+9+10+7+85}{10} = \\dfrac{156}{10} = \\mathbf{15{,}6}$
- Sắp xếp: [6, 7, 7, 7, 8, 8, 9, 9, 10, 85]. $n = 10$. Median $= \\dfrac{x_{(5)} + x_{(6)}}{2} = \\dfrac{8+8}{2} = \\mathbf{8}$
- Mode = **7** (xuất hiện 3 lần)

**Phân tích ảnh hưởng:**
- Mean bị ảnh hưởng nặng nhất: tăng từ $\\approx 7{,}7$ (không có outlier 85) lên $15{,}6$ — tăng hơn 2×.
- Median không bị ảnh hưởng đáng kể: dù bỏ 85 đi, median của 9 số [6,7,7,7,8,8,9,9,10] = 8 (không đổi).
- Mode không bị ảnh hưởng: 7 vẫn là giá trị phổ biến nhất.

**Kết luận:** Mean nhạy cảm nhất với outlier/lỗi nhập liệu. Đây là lý do cần EDA (Exploratory Data Analysis) — phát hiện giá trị 85 là lỗi trước khi tính bất kỳ thứ gì.

### Bài 2

**(a) Ước tính median:**
Tổng $85+5 = 90$ nhân viên. Sắp xếp theo lương, vị trí giữa là khoảng thứ 45 và 46. Hầu hết 90 nhân viên nhận 15–25M (80 người), nên vị trí 45 và 46 đều nằm trong nhóm này. Median $\\approx$ **18–22M** (ước tính).

**(b) Tại sao "45M" gây hiểu lầm:**
Con số 45M là arithmetic mean, bị kéo mạnh bởi CEO (500M). Ứng viên nghe "lương trung bình 45M" sẽ kỳ vọng vào khoảng đó, nhưng thực tế 80/85 nhân viên (94%) nhận 15–25M — chỉ bằng một nửa. Đây là ví dụ điển hình "thống kê đúng nhưng gây hiểu lầm" (technically correct, practically misleading). Câu đúng phải là: "Lương trung vị (median) khoảng 20M; mean bị kéo bởi lương CEO".

### Bài 3

**(a) Arithmetic mean của tỉ lệ tăng trưởng:**
Nhân tử hàng năm: $1{,}3$, $0{,}9$, $1{,}25$, $1{,}05$

$$\\text{Arithmetic mean} = \\dfrac{1{,}3 + 0{,}9 + 1{,}25 + 1{,}05}{4} = \\dfrac{4{,}5}{4} = \\mathbf{1{,}125} \\to \\text{"tăng } 12{,}5\\%\\text{/năm"}$$

**(b) Geometric mean:**

Tính từng bước: $1{,}3 \\times 0{,}9 = 1{,}17$; $1{,}17 \\times 1{,}25 = 1{,}4625$; $1{,}4625 \\times 1{,}05 = 1{,}535625$

$$G = (1{,}3 \\times 0{,}9 \\times 1{,}25 \\times 1{,}05)^{1/4} = (1{,}535625)^{1/4} \\approx \\mathbf{1{,}1127} \\to \\text{"tăng } 11{,}27\\%\\text{/năm"}$$

**Verify geometric mean:** $1 \\times 1{,}3 \\times 0{,}9 \\times 1{,}25 \\times 1{,}05 = 1{,}535625$. Và $1{,}1127^4 \\approx 1{,}5356$ ✓

**Kết quả nào đúng:** Geometric mean ($11{,}27\\%$) đúng. Arithmetic mean ($12{,}5\\%$) sai.

Lý do: Nếu bạn đầu tư 100 triệu, sau 4 năm nhân với các tỉ lệ này, bạn có $100 \\times 1{,}535625 = 153{,}5$ triệu. Tăng trưởng CAGR (Compound Annual Growth Rate) $= (153{,}5/100)^{1/4} - 1 = 11{,}27\\%$. Arithmetic mean không capture được hiệu ứng lãi kép.

### Bài 4

**(a) Thời gian giao hàng:**
**Dùng Median.** Dataset: [25, 27, 28, 30, 32, 350]. Median $= \\dfrac{28+30}{2} = 29$ phút. Mean $= \\dfrac{492}{6} = 82$ phút — bị kéo bởi 350 (xe hỏng, outlier). Median (29 phút) phản ánh trải nghiệm thực tế của hầu hết khách hàng.

**(b) Nhóm máu:**
**Dùng Mode.** Nhóm máu là biến Nominal — không có mean hay median. Mode = nhóm A ($45/100 = 45\\%$ — phổ biến nhất). Báo cáo: bảng tần số + tỉ lệ phần trăm.

**(c) Nhiệt độ tháng 7 Hà Nội:**
**Dùng Mean.** Nhiệt độ tháng 7 qua 30 năm là biến Interval/Ratio (Kelvin thì Ratio), phân phối thường đối xứng và không có outlier cực đoan. Mean + SD là bộ tối ưu. Ví dụ: "Nhiệt độ tối cao tháng 7 trung bình $= 35{,}2$°C, SD $= 1{,}8$°C".

**(d) Giá bất động sản Q1:**
**Dùng Median.** Giá bất động sản luôn có phân phối lệch phải mạnh — một vài căn hộ triệu đô kéo mean lên rất cao. Median phản ánh "giá điển hình" tốt hơn. (Thực tế, báo cáo bất động sản uy tín luôn dùng median price.)

---

## Bài tiếp theo

[Lesson 03: Đo lường phân tán](../lesson-03-dispersion/README.md) — Variance, standard deviation, IQR, MAD, CV: đo mức độ "lệch khỏi trung tâm" và ý nghĩa của "68-95-99.7 rule".

## Tham khảo

- OpenIntro Statistics, 4th ed. — Chapter 2.1 (Measures of Center).
- Freedman, Pisani, Purves: *Statistics*, 4th ed. — Chapter 4.
- Khan Academy: Statistics — "Measures of Central Tendency".
`;
