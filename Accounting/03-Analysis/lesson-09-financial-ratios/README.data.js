// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Accounting/03-Analysis/lesson-09-financial-ratios/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Tỷ số tài chính (Financial Ratios)

> Một con số đứng một mình gần như vô nghĩa. "Lãi 80 tỷ" là nhiều hay ít? Chỉ khi **chia** nó cho vốn bỏ ra, doanh thu, hay tài sản ta mới biết. Đó là công việc của tỷ số tài chính.

## Mục tiêu học tập

- Tính và **diễn giải** được các tỷ số thuộc 4 nhóm: **sinh lời**, **thanh khoản**, **đòn bẩy**, **hiệu quả**.
- Hiểu *vì sao* mỗi tỷ số tồn tại — nó trả lời câu hỏi kinh doanh nào.
- Phân rã **DuPont**: $\\text{ROE} = \\text{biên ròng} \\times \\text{vòng quay tài sản} \\times \\text{đòn bẩy tài chính}$, và chứng minh bằng số thật tích 3 nhân tử = ROE.
- Đọc được "câu chuyện" đằng sau con số: hai công ty cùng ROE nhưng mô hình kinh doanh khác nhau.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/): $\\text{Tài sản} = \\text{Nợ} + \\text{Vốn chủ}$. Nhiều tỷ số dưới đây dựa thẳng trên đẳng thức này (ví dụ đòn bẩy tài chính $= \\text{Tổng TS}/\\text{Vốn chủ}$).
- Biết ba báo cáo cơ bản: Bảng cân đối kế toán, Báo cáo kết quả kinh doanh (Tầng 2). Chỉ cần số học chia/nhân.

---

## 0. Bộ số dùng xuyên suốt bài

Để mọi ví dụ ăn khớp nhau, ta dùng **một công ty mẫu** (đơn vị: tỷ đồng). Viz đi kèm mặc định chính bộ số này.

| Khoản mục | Ký hiệu | Giá trị |
|-----------|---------|--------:|
| Doanh thu (Revenue) | $S$ | 1 000 |
| Lợi nhuận ròng (Net income) | $NI$ | 80 |
| Tổng tài sản (Total assets) | $TA$ | 800 |
| Vốn chủ sở hữu (Equity) | $E$ | 400 |
| Tổng nợ (Total liabilities) | $D$ | 400 |
| Tài sản ngắn hạn (Current assets) | $CA$ | 300 |
| Nợ ngắn hạn (Current liabilities) | $CL$ | 150 |
| Hàng tồn kho (Inventory) | $Inv$ | 120 |
| Khoản phải thu (Receivables) | $AR$ | 100 |
| EBIT (lợi nhuận trước lãi & thuế) | $EBIT$ | 140 |
| Lãi vay (Interest expense) | $I$ | 20 |

Kiểm tra tiền đề: $TA = D + E \\Rightarrow 800 = 400 + 400$ ✓ — phương trình kế toán vẫn cân (Lesson 01).

---

## 1. Nhóm 1 — Tỷ số sinh lời (Profitability)

> 💡 **Trực giác.** Ba câu hỏi cùng dạng "mỗi đồng ___ đẻ ra bao nhiêu đồng lãi?": mỗi đồng **vốn chủ** (ROE), mỗi đồng **tài sản** (ROA), mỗi đồng **doanh thu** (biên ròng). Cùng một tử số (lợi nhuận ròng), đổi mẫu số → đổi góc nhìn.

### 1.1 ROE — Tỷ suất sinh lời trên vốn chủ (Return on Equity)

**(a) Là gì.** Mỗi đồng cổ đông bỏ vào (và giữ lại) sinh ra bao nhiêu đồng lãi ròng trong kỳ.

$$\\text{ROE} = \\frac{\\text{Lợi nhuận ròng}}{\\text{Vốn chủ sở hữu}} = \\frac{NI}{E}$$

**(b) Vì sao cần.** Đây là tỷ số "vua" với **chủ sở hữu**: nó đo trực tiếp hiệu quả đồng tiền *của họ*, không phải của chủ nợ. Gửi ngân hàng được ~6%/năm — nếu ROE < 6% thì cổ đông thà gửi tiết kiệm.

**(c) Ví dụ số** (≥ 4, đa dạng gồm cả lỗ):

| Công ty | $NI$ | $E$ | ROE |
|---------|-----:|----:|----:|
| Mẫu (bài này) | 80 | 400 | $80/400 = \\mathbf{20\\%}$ |
| Trưởng thành | 30 | 600 | $30/600 = 5\\%$ |
| Ngôi sao | 150 | 500 | $150/500 = 30\\%$ |
| Đang lỗ | −20 | 200 | $-20/200 = -10\\%$ |

### 1.2 ROA — Tỷ suất sinh lời trên tài sản (Return on Assets)

**(a) Là gì.** Mỗi đồng **tài sản** (bất kể tài trợ bằng nợ hay vốn chủ) sinh ra bao nhiêu lãi.

$$\\text{ROA} = \\frac{NI}{TA}$$

**(b) Vì sao cần.** ROA đo hiệu quả *vận hành tài sản* thuần, **bỏ qua** cách tài trợ. So ROE với ROA cho biết đòn bẩy đang "khuếch đại" bao nhiêu: ROE > ROA nghĩa là công ty vay nợ để bơm lợi nhuận cho cổ đông.

**(c) Ví dụ số:**

| Công ty | $NI$ | $TA$ | ROA |
|---------|-----:|-----:|----:|
| Mẫu | 80 | 800 | $80/800 = \\mathbf{10\\%}$ |
| Nặng tài sản (nhà máy) | 30 | 1 500 | $30/1500 = 2\\%$ |
| Nhẹ tài sản (dịch vụ) | 45 | 300 | $45/300 = 15\\%$ |
| Đang lỗ | −20 | 400 | $-20/400 = -5\\%$ |

Công ty mẫu: ROE 20% > ROA 10% → đòn bẩy nhân đôi hiệu quả cho cổ đông (sẽ chứng minh chính xác ở DuPont, mục 5).

### 1.3 Biên lợi nhuận ròng (Net Profit Margin)

**(a) Là gì.** Trong mỗi 100 đồng doanh thu, còn lại bao nhiêu đồng lãi ròng sau *tất cả* chi phí, lãi vay, thuế.

$$\\text{Biên ròng} = \\frac{NI}{S}$$

**(b) Vì sao cần.** Đo "độ dày" của lãi trên từng đồng bán ra. Ngành khác nhau, biên khác nhau rất xa — siêu thị mỏng, phần mềm dày — nên chỉ nên so trong cùng ngành.

**(c) Ví dụ số:**

| Công ty | $NI$ | $S$ | Biên ròng |
|---------|-----:|----:|----------:|
| Mẫu | 80 | 1 000 | $80/1000 = \\mathbf{8\\%}$ |
| Siêu thị | 25 | 1 000 | $25/1000 = 2.5\\%$ |
| Phần mềm | 300 | 1 000 | $300/1000 = 30\\%$ |
| Đang lỗ | −50 | 500 | $-50/500 = -10\\%$ |

> ⚠ **Lỗi thường gặp.** *"Biên ròng thấp = công ty tệ."* **Sai.** Siêu thị biên 2.5% vẫn có thể ROE cao nếu quay vòng tài sản cực nhanh (bán 1 000 tỷ trên 300 tỷ tài sản). Biên chỉ là **một** nhân tử của ROE — xem DuPont.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Dùng lợi nhuận nào — trước hay sau thuế?"* → ROE/ROA/biên **ròng** dùng lãi *sau* thuế và sau lãi vay (net income). Muốn đo vận hành thuần, tách riêng thì dùng EBIT (mục 3.2).
> - *"Vốn chủ và tài sản lấy đầu kỳ hay cuối kỳ?"* → Chuẩn nhất là **bình quân** $(\\text{đầu}+\\text{cuối})/2$ vì lợi nhuận sinh ra suốt kỳ. Bài này dùng số cuối kỳ cho gọn; nhớ nguyên tắc bình quân khi làm thật.
> - *"ROE cao luôn tốt?"* → Không hẳn. ROE có thể cao *giả tạo* nhờ vay nợ nhiều (đòn bẩy lớn) → rủi ro tăng. Phải đọc kèm nhóm đòn bẩy.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Công ty có $NI = 60$, $E = 300$, $TA = 900$. Tính ROE và ROA.
> 2. ROE > ROA hay ngược lại? Điều đó nói gì?
>
> <details><summary>Đáp án</summary>
>
> 1. ROE $= 60/300 = 20\\%$; ROA $= 60/900 = 6.67\\%$.
> 2. ROE (20%) > ROA (6.67%) → công ty dùng đòn bẩy (nợ) khuếch đại lợi nhuận cho cổ đông. Ở đây $TA/E = 900/300 = 3$ lần.
> </details>

> 📝 **Tóm tắt mục 1.**
> - ROE $= NI/E$: hiệu quả đồng vốn của **chủ**. ROA $= NI/TA$: hiệu quả **tài sản**. Biên ròng $= NI/S$: lãi trên mỗi đồng bán.
> - ROE > ROA ⇔ có dùng đòn bẩy.
> - Biên thấp không xấu nếu vòng quay bù lại — chờ DuPont.

---

## 2. Nhóm 2 — Tỷ số thanh khoản (Liquidity)

> 💡 **Trực giác.** Câu hỏi sống còn ngắn hạn: *"Các hóa đơn phải trả trong năm nay, công ty có đủ đồ dễ-hóa-thành-tiền để trả không?"* So **tài sản ngắn hạn** với **nợ ngắn hạn**.

### 2.1 Tỷ số thanh toán hiện hành (Current Ratio)

**(a) Là gì.** Mỗi đồng nợ đến hạn trong 12 tháng được che chắn bởi bao nhiêu đồng tài sản ngắn hạn.

$$\\text{Current ratio} = \\frac{CA}{CL}$$

**(b) Vì sao cần.** Cảnh báo sớm nguy cơ mất khả năng thanh toán ngắn hạn. $< 1$ nghĩa là nợ đến hạn *vượt* tài sản ngắn hạn — dấu hiệu căng thẳng tiền mặt.

**(c) Ví dụ số:**

| Công ty | $CA$ | $CL$ | Current | Đọc |
|---------|-----:|-----:|--------:|-----|
| Mẫu | 300 | 150 | $\\mathbf{2.0}$ | thoải mái |
| Căng | 90 | 100 | 0.9 | rủi ro (< 1) |
| Dư dả | 500 | 200 | 2.5 | rất an toàn |
| Vừa khít | 150 | 150 | 1.0 | vừa đủ |

### 2.2 Tỷ số thanh toán nhanh (Quick Ratio / Acid-test)

**(a) Là gì.** Giống current ratio nhưng **loại hàng tồn kho** ra khỏi tử số — vì tồn kho khó bán gấp và có thể mất giá.

$$\\text{Quick ratio} = \\frac{CA - Inv}{CL}$$

**(b) Vì sao cần.** Là bài kiểm tra khắc nghiệt hơn: *nếu không kịp bán hàng*, công ty vẫn trả nổi nợ ngắn hạn chứ? Đặc biệt quan trọng với ngành tồn kho lớn (bán lẻ, sản xuất).

**(c) Ví dụ số:**

| Công ty | $CA$ | $Inv$ | $CL$ | Quick |
|---------|-----:|------:|-----:|------:|
| Mẫu | 300 | 120 | 150 | $(300-120)/150 = \\mathbf{1.2}$ |
| Tồn kho nặng | 300 | 250 | 150 | $(300-250)/150 = 0.33$ |
| Không tồn kho (dịch vụ) | 200 | 0 | 100 | $(200-0)/100 = 2.0$ |
| Nợ ngắn lớn | 160 | 60 | 200 | $(160-60)/200 = 0.5$ |

> ⚠ **Lỗi thường gặp.** Coi current ratio *càng cao càng tốt*. Không hẳn: current ratio 5.0 có thể nghĩa là công ty ôm quá nhiều tiền/tồn kho *nhàn rỗi* thay vì đầu tư sinh lời. Thanh khoản là **đủ**, không phải **tối đa**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao loại đúng tồn kho mà không loại phải thu?"* → Phải thu thường thu được trong vài tuần (khách sẽ trả); tồn kho phải *bán được đã* rồi mới thu — thêm một tầng bất định và rủi ro giảm giá.
> - *"Ngưỡng an toàn là bao nhiêu?"* → Kinh nghiệm: current $\\geq 1.5$, quick $\\geq 1.0$ là "khỏe" với đa số ngành. Nhưng ngưỡng phụ thuộc ngành — so với đối thủ cùng ngành tốt hơn so với con số tuyệt đối.

> 🔁 **Dừng lại tự kiểm tra.**
> Công ty: $CA = 240$, $Inv = 90$, $CL = 120$. Tính current và quick.
>
> <details><summary>Đáp án</summary>
>
> Current $= 240/120 = 2.0$. Quick $= (240-90)/120 = 150/120 = 1.25$.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Current $= CA/CL$; quick $= (CA-Inv)/CL$ (khắt khe hơn).
> - $< 1$ → cảnh báo thanh khoản; quá cao → tài sản nhàn rỗi.
> - Loại tồn kho vì nó khó hóa tiền gấp.

---

## 3. Nhóm 3 — Tỷ số đòn bẩy (Leverage / Solvency)

> 💡 **Trực giác.** Đòn bẩy = dùng *tiền người khác* (nợ) để làm ăn. Nó khuếch đại lãi khi thuận, nhưng cũng khuếch đại lỗ và đẻ ra nghĩa vụ trả lãi cố định khi ngược. Hai câu hỏi: *vay nhiều cỡ nào?* (D/E) và *có kiếm đủ để trả lãi không?* (interest coverage).

### 3.1 Hệ số nợ trên vốn chủ (Debt-to-Equity, D/E)

**(a) Là gì.** Cứ mỗi đồng vốn chủ, công ty gánh bao nhiêu đồng nợ.

$$\\text{D/E} = \\frac{D}{E}$$

**(b) Vì sao cần.** Đo mức độ *phụ thuộc nợ*. D/E cao → rủi ro tài chính cao (nợ phải trả bất kể lời/lỗ), nhưng cũng có thể nâng ROE khi kinh doanh tốt.

**(c) Ví dụ số:**

| Công ty | $D$ | $E$ | D/E | Đọc |
|---------|----:|----:|----:|-----|
| Mẫu | 400 | 400 | $\\mathbf{1.0}$ | cân bằng nợ–vốn |
| Đòn bẩy cao | 900 | 300 | 3.0 | rủi ro cao |
| Thận trọng | 100 | 500 | 0.2 | ít phụ thuộc nợ |
| Không nợ | 0 | 250 | 0 | tự tài trợ hoàn toàn |

### 3.2 Hệ số khả năng trả lãi (Interest Coverage)

**(a) Là gì.** Lợi nhuận vận hành (EBIT) gấp bao nhiêu lần chi phí lãi vay — tức công ty kiếm đủ để trả lãi *bao nhiêu lần*.

$$\\text{Interest coverage} = \\frac{EBIT}{I}$$

**(b) Vì sao cần.** D/E cho biết *quy mô* nợ, nhưng không cho biết công ty có *kham nổi* lãi không. Coverage $= 1$ nghĩa là toàn bộ lãi vận hành chỉ vừa đủ trả lãi — không còn gì cho thuế và cổ đông. $< 1$ là báo động đỏ.

**(c) Ví dụ số:**

| Công ty | $EBIT$ | $I$ | Coverage | Đọc |
|---------|-------:|----:|---------:|-----|
| Mẫu | 140 | 20 | $\\mathbf{7.0}$ | rất an toàn |
| Chật vật | 60 | 50 | 1.2 | nguy hiểm |
| Vững | 300 | 30 | 10.0 | dư sức |
| Không đủ | 40 | 80 | 0.5 | không kiếm đủ trả lãi |

> ⚠ **Lỗi thường gặp.** Dùng **lợi nhuận ròng** thay EBIT ở tử số của coverage. Sai vì lợi nhuận ròng đã *trừ đi lãi vay rồi* — sẽ tính thiếu khả năng trả lãi. Phải dùng EBIT (lãi *trước* khi trừ lãi vay và thuế).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"EBIT ở đâu ra?"* → EBIT = Lợi nhuận ròng + Thuế + Lãi vay (cộng ngược hai khoản đã bị trừ). Nó là lãi *thuần từ hoạt động*, chưa dính cấu trúc vốn hay thuế.
> - *"D/E bao nhiêu là ổn?"* → Tùy ngành: ngân hàng/bất động sản D/E cao là bình thường; công ty công nghệ thường thấp. So với đối thủ cùng ngành.

> 🔁 **Dừng lại tự kiểm tra.**
> Công ty: $D = 600$, $E = 300$, $EBIT = 90$, $I = 30$. Tính D/E và interest coverage. Nhận xét.
>
> <details><summary>Đáp án</summary>
>
> D/E $= 600/300 = 2.0$; coverage $= 90/30 = 3.0$. Vay khá nhiều (gấp đôi vốn chủ) nhưng vẫn kiếm gấp 3 lần lãi vay → gánh nổi, chưa báo động.
> </details>

> 📝 **Tóm tắt mục 3.**
> - D/E $= D/E$: quy mô phụ thuộc nợ. Interest coverage $= EBIT/I$: sức trả lãi.
> - Đòn bẩy khuếch đại cả lãi lẫn lỗ.
> - Coverage $< 1$ = báo động; dùng **EBIT**, không dùng lãi ròng.

---

## 4. Nhóm 4 — Tỷ số hiệu quả hoạt động (Efficiency / Activity)

> 💡 **Trực giác.** Đo *tốc độ* công ty biến tài sản vận hành thành tiền: hàng tồn kho **quay** bao nhiêu vòng một năm, và khách hàng mất bao nhiêu **ngày** để trả tiền. Nhanh = tiền quay về sớm = ít vốn bị kẹt.

### 4.1 Vòng quay hàng tồn kho (Inventory Turnover)

**(a) Là gì.** Trong một năm, lượng hàng trong kho được "bán và thay mới" bao nhiêu lần.

$$\\text{Vòng quay tồn kho} = \\frac{S}{Inv} \\qquad\\text{và}\\qquad \\text{Số ngày tồn kho} = \\frac{365}{\\text{vòng quay}}$$

**(b) Vì sao cần.** Quay nhanh = bán chạy, ít vốn chôn trong kho, ít rủi ro hàng ế/lỗi mốt. Quay chậm = hàng nằm lâu, nguy cơ giảm giá.

> ⚠ **Toy warning.** Công thức *chuẩn* dùng **giá vốn hàng bán (GVHB/COGS)** ở tử số, không phải doanh thu: $\\text{vòng quay} = GVHB/Inv$. Doanh thu chứa cả lợi nhuận nên phóng đại vòng quay. Bài này (và viz) dùng $S/Inv$ vì bộ số không có GVHB — coi đây là **xấp xỉ để minh họa**, khi làm thật hãy thay bằng GVHB.

**(c) Ví dụ số** (dùng $S/Inv$):

| Công ty | $S$ | $Inv$ | Vòng quay | Ngày tồn ($365/$vòng) |
|---------|----:|------:|----------:|----------------------:|
| Mẫu | 1 000 | 120 | $\\mathbf{8.33}$ | 43.8 |
| Chậm | 1 000 | 500 | 2.0 | 182.5 |
| Rất nhanh | 2 000 | 100 | 20.0 | 18.25 |
| Ứ đọng | 600 | 300 | 2.0 | 182.5 |

### 4.2 Kỳ thu tiền bình quân (DSO — Days Sales Outstanding)

**(a) Là gì.** Trung bình sau khi bán (chịu), công ty mất bao nhiêu **ngày** mới thu được tiền về.

$$\\text{DSO} = \\frac{AR}{S} \\times 365$$

**(b) Vì sao cần.** DSO dài = tiền bị khách "giữ hộ" lâu, công ty phải tự xoay vốn lưu động (có khi phải vay → tốn lãi). DSO ngắn = thu tiền nhanh, dòng tiền khỏe.

**(c) Ví dụ số:**

| Công ty | $AR$ | $S$ | DSO (ngày) |
|---------|-----:|----:|-----------:|
| Mẫu | 100 | 1 000 | $100/1000 \\times 365 = \\mathbf{36.5}$ |
| Thu chậm | 200 | 1 000 | $200/1000 \\times 365 = 73$ |
| Thu nhanh | 50 | 1 000 | $50/1000 \\times 365 = 18.25$ |
| Nới lỏng tín dụng | 300 | 1 200 | $300/1200 \\times 365 = 91.25$ |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"DSO 36.5 ngày là tốt hay xấu?"* → Phụ thuộc chính sách bán chịu. Nếu công ty cho khách nợ 30 ngày mà DSO = 36.5 → khá sát hạn, ổn. Nếu chính sách 15 ngày mà DSO = 36.5 → khách trả trễ, cần siết.
> - *"Tồn kho quay nhanh mà DSO dài thì sao?"* → Bán chạy nhưng thu tiền chậm → vốn vẫn kẹt ở phải thu. Phải nhìn cả **chu kỳ tiền mặt** (tồn kho + phải thu − phải trả), sẽ học kỹ ở bài dòng tiền.

> 🔁 **Dừng lại tự kiểm tra.**
> Công ty: $S = 1460$, $Inv = 200$, $AR = 160$. Tính vòng quay tồn kho, số ngày tồn, và DSO.
>
> <details><summary>Đáp án</summary>
>
> Vòng quay $= 1460/200 = 7.3$ lần → số ngày tồn $= 365/7.3 = 50$ ngày. DSO $= 160/1460 \\times 365 = 40$ ngày.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Vòng quay tồn kho $= S/Inv$ (chuẩn: $GVHB/Inv$); ngày tồn $= 365/$vòng quay.
> - DSO $= AR/S \\times 365$: số ngày thu tiền về.
> - Quay nhanh + thu nhanh = ít vốn bị kẹt = dòng tiền khỏe.

---

## 5. Phân rã DuPont — ROE tách thành 3 nhân tử

> 💡 **Trực giác.** ROE cao có thể đến từ *ba* nguồn rất khác nhau: (1) lãi dày trên mỗi đồng bán, (2) bán được nhiều so với tài sản, hoặc (3) vay nợ để phóng đại. DuPont **tách bạch** ba nguồn đó, cho ta thấy ROE cao là nhờ *tài kinh doanh* hay *chỉ nhờ vay nhiều*.

### 5.1 Công thức và vì sao nó đúng

$$\\text{ROE} = \\underbrace{\\frac{NI}{S}}_{\\text{biên ròng}} \\times \\underbrace{\\frac{S}{TA}}_{\\text{vòng quay tài sản}} \\times \\underbrace{\\frac{TA}{E}}_{\\text{đòn bẩy tài chính}}$$

Định nghĩa 3 nhân tử (mỗi cái tự đủ):

- **Biên ròng** $NI/S$ — *lãi dày hay mỏng*: mỗi đồng doanh thu để lại bao nhiêu lãi (mục 1.3).
- **Vòng quay tài sản (asset turnover)** $S/TA$ — *tài sản làm việc chăm hay lười*: mỗi đồng tài sản tạo ra bao nhiêu đồng doanh thu.
- **Đòn bẩy tài chính (equity multiplier)** $TA/E$ — *khuếch đại bao nhiêu lần*: tổng tài sản gấp mấy lần vốn chủ. Bằng $1$ khi không nợ, càng lớn khi nợ càng nhiều. (Từ Lesson 01: $TA = D + E$ nên $TA/E = 1 + D/E$.)

**Chứng minh (viết rõ từng bước — không "dễ thấy").** Nhân ba phân số và rút gọn các thừa số chung ở tử–mẫu:

$$\\frac{NI}{S} \\times \\frac{S}{TA} \\times \\frac{TA}{E} = \\frac{NI \\cdot \\cancel{S} \\cdot \\cancel{TA}}{\\cancel{S} \\cdot \\cancel{TA} \\cdot E} = \\frac{NI}{E} = \\text{ROE}$$

$S$ ở tử của nhân tử 2 triệt tiêu $S$ ở mẫu nhân tử 1; $TA$ ở tử nhân tử 3 triệt tiêu $TA$ ở mẫu nhân tử 2. Còn lại đúng $NI/E$ — chính là ROE. Đây là phép "telescoping": các mẫu số trung gian được cố tình chèn vào rồi khử đi.

### 5.2 Walk-through bằng số thật (công ty mẫu, mục 0)

| Nhân tử | Công thức | Số | Giá trị |
|---------|-----------|----|--------:|
| Biên ròng | $NI/S$ | $80/1000$ | $0.08$ |
| Vòng quay tài sản | $S/TA$ | $1000/800$ | $1.25$ |
| Đòn bẩy tài chính | $TA/E$ | $800/400$ | $2.00$ |

Tích ba nhân tử:

$$0.08 \\times 1.25 \\times 2.00 = 0.20 = \\mathbf{20\\%}$$

Kiểm chứng trực tiếp: $\\text{ROE} = NI/E = 80/400 = 0.20 = 20\\%$. **Khớp** ✓.

Đọc câu chuyện: ROA của công ty $= \\text{biên} \\times \\text{vòng quay} = 0.08 \\times 1.25 = 0.10 = 10\\%$ (khớp mục 1.2), rồi đòn bẩy $2.0$ nhân đôi lên thành ROE $20\\%$. Vậy một nửa ROE đến từ vận hành, một nửa từ vay nợ.

### 5.3 Vì sao DuPont hữu ích: hai công ty cùng ROE, khác chất

| | Biên ròng | Vòng quay TS | Đòn bẩy | Tích = ROE |
|--|----------:|-------------:|--------:|-----------:|
| **X — siêu thị** | 2% (0.02) | 3.0 | 2.5 | $0.02 \\times 3.0 \\times 2.5 = 15\\%$ |
| **Y — hàng xa xỉ** | 15% (0.15) | 0.5 | 2.0 | $0.15 \\times 0.5 \\times 2.0 = 15\\%$ |

Cùng ROE $15\\%$ nhưng: **X** kiếm tiền bằng *tốc độ* (biên mỏng, quay vòng cực nhanh); **Y** bằng *biên dày* (bán ít nhưng lãi cao mỗi món). Nhìn ROE trần trụi không phân biệt được — DuPont phân biệt được. Đây là lý do nhà phân tích luôn tách ROE ra 3 nhân tử.

> ⚠ **Lỗi thường gặp.** Thấy ROE tăng liền khen "làm ăn giỏi hơn". Có thể ROE tăng *chỉ vì* công ty vay thêm nợ (đòn bẩy $TA/E$ tăng), trong khi biên và vòng quay đứng yên hoặc tệ đi — tức rủi ro tăng chứ không phải hiệu quả tăng. DuPont vạch trần điều này.

> 🔁 **Dừng lại tự kiểm tra.**
> Công ty: biên ròng $10\\%$, vòng quay tài sản $0.8$, đòn bẩy $2.5$. Tính ROE bằng DuPont.
>
> <details><summary>Đáp án</summary>
>
> ROE $= 0.10 \\times 0.8 \\times 2.5 = 0.20 = 20\\%$.
> </details>

> 📝 **Tóm tắt mục 5.**
> - $\\text{ROE} = \\dfrac{NI}{S} \\times \\dfrac{S}{TA} \\times \\dfrac{TA}{E}$ — các mẫu số trung gian $S, TA$ triệt tiêu, còn $NI/E$.
> - 3 nhân tử = biên ròng × vòng quay tài sản × đòn bẩy tài chính (equity multiplier).
> - Số thật: $0.08 \\times 1.25 \\times 2.0 = 20\\% = \\text{ROE}$ ✓.
> - Cùng ROE có thể đến từ mô hình rất khác → luôn tách 3 nhân tử.

---

## 6. Bài tập

**Bài 1 (tính toán).** Công ty M (đơn vị: tỷ đồng): Doanh thu 500, LN ròng 40, Tổng TS 400, Vốn chủ 250, Nợ 150, TS ngắn hạn 180, Nợ ngắn hạn 120, Tồn kho 60, Phải thu 50, EBIT 70, Lãi vay 14. Tính: ROE, ROA, biên ròng, current ratio, quick ratio, D/E, interest coverage, DSO.

**Bài 2 (DuPont).** Với công ty M ở Bài 1, phân rã ROE thành 3 nhân tử (biên ròng, vòng quay tài sản, đòn bẩy tài chính) và chứng minh tích của chúng bằng đúng ROE tính trực tiếp.

**Bài 3 (diễn giải).** Hai công ty cùng ROE $12\\%$:
- **P**: biên ròng $12\\%$, vòng quay tài sản $0.5$, đòn bẩy $2.0$.
- **Q**: biên ròng $3\\%$, vòng quay tài sản $2.0$, đòn bẩy $2.0$.

Kiểm chứng cả hai đều ra ROE $12\\%$, rồi mô tả mô hình kinh doanh và điểm rủi ro chính của mỗi công ty.

---

## 7. Lời giải chi tiết

**Bài 1.** Áp thẳng công thức từng nhóm:

| Tỷ số | Công thức | Thay số | Kết quả |
|-------|-----------|---------|--------:|
| ROE | $NI/E$ | $40/250$ | $\\mathbf{16\\%}$ |
| ROA | $NI/TA$ | $40/400$ | $10\\%$ |
| Biên ròng | $NI/S$ | $40/500$ | $8\\%$ |
| Current | $CA/CL$ | $180/120$ | $1.5$ |
| Quick | $(CA-Inv)/CL$ | $(180-60)/120$ | $1.0$ |
| D/E | $D/E$ | $150/250$ | $0.6$ |
| Interest coverage | $EBIT/I$ | $70/14$ | $5.0$ |
| DSO | $AR/S \\times 365$ | $50/500 \\times 365$ | $36.5$ ngày |

Nhận xét nhanh: current $1.5$ và quick $1.0$ → thanh khoản ổn; D/E $0.6$ (nợ ít hơn vốn) + coverage $5.0$ → đòn bẩy an toàn; ROE $16\\%$ vượt xa lãi gửi tiết kiệm.

**Bài 2.** Ba nhân tử DuPont cho công ty M:

- Biên ròng $= NI/S = 40/500 = 0.08$.
- Vòng quay tài sản $= S/TA = 500/400 = 1.25$.
- Đòn bẩy tài chính $= TA/E = 400/250 = 1.6$.

Tích: $0.08 \\times 1.25 \\times 1.6 = 0.16 = 16\\%$.

ROE trực tiếp: $NI/E = 40/250 = 0.16 = 16\\%$. **Khớp** ✓. (Ghi chú: $TA/E = 1.6 = 1 + D/E = 1 + 0.6$ — nhất quán với Lesson 01.)

**Bài 3.** Cách tiếp cận: nhân 3 nhân tử để xác nhận ROE, rồi đọc "chất" của từng nhân tử.

- **P**: $0.12 \\times 0.5 \\times 2.0 = 0.12 = 12\\%$ ✓. Biên **dày** ($12\\%$) nhưng tài sản quay **chậm** ($0.5$ — mỗi đồng tài sản chỉ tạo nửa đồng doanh thu). Đây là mô hình *giá trị cao, khối lượng thấp*: hàng xa xỉ, bất động sản, thiết bị chuyên dụng. **Rủi ro chính**: nhạy với việc phải *giảm giá bán* hoặc nhu cầu cao cấp sụt — biên mỏng đi là ROE rơi mạnh.
- **Q**: $0.03 \\times 2.0 \\times 2.0 = 0.12 = 12\\%$ ✓. Biên **mỏng** ($3\\%$) nhưng quay **nhanh** ($2.0$): mô hình *khối lượng lớn, biên thấp*: bán lẻ, siêu thị, phân phối. **Rủi ro chính**: nhạy với *sụt doanh số / tồn kho ứ đọng* — vì biên đã mỏng, chỉ cần doanh thu giảm hoặc chi phí tăng nhẹ là lãi bốc hơi.
- Điểm chung: cùng đòn bẩy $2.0$ → cùng mức khuếch đại rủi ro tài chính. Bài học: **ROE bằng nhau không có nghĩa hai công ty giống nhau** — DuPont cho thấy động cơ tạo lợi nhuận và điểm dễ tổn thương hoàn toàn khác.

> 📝 **Tóm tắt bài học.**
> - 4 nhóm tỷ số trả lời 4 câu: sinh lời (*lãi bao nhiêu trên vốn/tài sản/doanh thu*), thanh khoản (*trả nổi nợ ngắn hạn?*), đòn bẩy (*vay nhiều? kham nổi lãi?*), hiệu quả (*quay vòng nhanh?*).
> - Một tỷ số đơn lẻ ít nghĩa — phải so theo thời gian và với đối thủ cùng ngành.
> - DuPont: $\\text{ROE} = \\text{biên ròng} \\times \\text{vòng quay tài sản} \\times \\text{đòn bẩy}$; số thật $0.08 \\times 1.25 \\times 2.0 = 20\\%$.
> - Đọc "câu chuyện" sau con số quan trọng hơn bản thân con số.

---

## Bài tiếp theo

**[Lesson 10 — Phân loại chi phí & Phân tích CVP](../lesson-10-cost-cvp/)**: chi phí cố định vs biến đổi, điểm hòa vốn (break-even), và đòn bẩy hoạt động — góc nhìn *bên trong* để ra quyết định, bổ sung cho góc nhìn *bên ngoài* của tỷ số tài chính ở bài này.

Minh họa tương tác: [visualization.html](./visualization.html) — nhập báo cáo tài chính, xem toàn bộ dashboard tỷ số và khối phân rã DuPont cập nhật theo thời gian thực.
`;
