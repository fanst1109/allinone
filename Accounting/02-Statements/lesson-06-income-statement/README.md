# Lesson 06 — Báo cáo kết quả kinh doanh (Income Statement)

> Một câu chuyện đi từ trên xuống: **doanh thu vào ở đỉnh, các chi phí bị trừ dần từng tầng, còn lại lợi nhuận ròng ở đáy.**

## Mục tiêu học tập

- Đọc được **báo cáo kết quả kinh doanh dạng nhiều bước (multi-step income statement)** và tên từng dòng.
- Định nghĩa và phân biệt: **Doanh thu thuần**, **Giá vốn hàng bán (COGS)**, **Lợi nhuận gộp**, **Chi phí hoạt động**, **Lợi nhuận hoạt động (EBIT)**, **Lãi vay**, **Thuế TNDN**, **Lợi nhuận ròng (Net income)** — kèm ví dụ số.
- Tính và diễn giải **3 biên lợi nhuận**: biên gộp, biên hoạt động, biên ròng.
- Hiểu vì sao lợi nhuận ròng **khác** dòng tiền (nguyên tắc dồn tích — nối [Lesson 04](../lesson-04-accrual-basis/)).
- Chạy được walk-through số thật từ doanh thu tới lợi nhuận ròng, kiểm tra từng phép cộng/trừ.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/): doanh thu ↑ vốn chủ, chi phí ↓ vốn chủ. Báo cáo KQKD chính là bản "phóng to" của phần *(Doanh thu − Chi phí)* trong phương trình mở rộng.
- Số học cộng/trừ và phần trăm.

---

## 1. Bức tranh lớn: báo cáo KQKD là gì?

> 💡 **Trực giác.** Hình dung doanh thu như **nước đổ vào từ miệng phễu**. Trên đường chảy xuống, nước đi qua nhiều **lưới lọc**: lọc thứ nhất giữ lại "tiền làm ra hàng" (giá vốn), lọc thứ hai giữ "tiền vận hành bộ máy" (chi phí bán hàng, quản lý), lọc thứ ba giữ "tiền trả lãi vay", lọc cuối giữ "tiền nộp thuế". Thứ nhỏ giọt ra ở đáy phễu — thứ *thực sự* thuộc về chủ — là **lợi nhuận ròng**.

Báo cáo kết quả kinh doanh (income statement, còn gọi là *P&L — profit and loss statement*) trả lời câu hỏi: **trong một kỳ (quý/năm), công ty làm ra bao nhiêu và tiêu mất bao nhiêu, còn lại bao nhiêu?**

Khác với [phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/) (chụp một *thời điểm*), báo cáo KQKD đo **một khoảng thời gian**. Nó chính là chi tiết của phần lợi nhuận trong phương trình mở rộng:

$$E = \text{Vốn góp} + \underbrace{(\text{Doanh thu} - \text{Chi phí})}_{\text{đây là nội dung của báo cáo KQKD}} - \text{Cổ tức}$$

### 1.1 Vì sao dạng "nhiều bước"?

Có thể viết gọn một dòng: *Lợi nhuận = Doanh thu − Tất cả chi phí*. Nhưng gộp hết chi phí vào một cục thì mất thông tin. Dạng **nhiều bước** tách chi phí theo *tính chất* và chèn các **dòng lợi nhuận trung gian (subtotal)** để trả lời từng câu hỏi riêng:

| Dòng trung gian | Trả lời câu hỏi |
|-----------------|-----------------|
| Lợi nhuận gộp | Bán hàng có lời hơn giá vốn không? |
| Lợi nhuận hoạt động (EBIT) | Bản thân *hoạt động kinh doanh* có sinh lời không (bỏ qua vay & thuế)? |
| Lợi nhuận ròng | Sau tất cả, chủ còn lại bao nhiêu? |

Cấu trúc chuẩn, đi từ trên xuống:

$$
\begin{aligned}
&\text{Doanh thu thuần} \\
-\ &\text{Giá vốn hàng bán (COGS)} \\
=\ &\textbf{Lợi nhuận gộp} \\
-\ &\text{Chi phí hoạt động (bán hàng + quản lý)} \\
=\ &\textbf{Lợi nhuận hoạt động (EBIT)} \\
-\ &\text{Lãi vay} \\
=\ &\text{Lợi nhuận trước thuế (EBT)} \\
-\ &\text{Thuế TNDN} \\
=\ &\textbf{Lợi nhuận ròng (Net income)}
\end{aligned}
$$

---

## 2. Từng dòng — định nghĩa đầy đủ

Xuyên suốt mục này ta dùng một công ty ví dụ (đơn vị: triệu đồng) để nhất quán:

> Doanh thu thuần **1.000**, COGS **600**, Chi phí hoạt động **250**, Lãi vay **30**, Thuế suất **20%**.

### 2.1 Doanh thu thuần (Net Revenue)

**(a) Là gì.** Tổng giá trị hàng hóa/dịch vụ **đã bán trong kỳ**, sau khi trừ các khoản giảm trừ (chiết khấu, hàng bán bị trả lại, giảm giá). Đây là dòng trên cùng — "top line".

**(b) Vì sao cần.** Để đo *quy mô bán được thật sự*. "Thuần" (net) loại bỏ phần doanh thu ảo do khách trả hàng hoặc được chiết khấu — nếu không, con số bị thổi phồng.

**(c) Ví dụ số cụ thể** (≥ 4):

| # | Doanh thu gộp | Giảm trừ (trả hàng + chiết khấu) | Doanh thu thuần |
|---|--------------:|---------------------------------:|----------------:|
| 1 | 1.050 | 50 | **1.000** |
| 2 | 800 | 0 | **800** |
| 3 | 500 | 120 | **380** |
| 4 | 2.200 | 200 | **2.000** |

> ⚠ **Lỗi thường gặp.** Ghi nhận doanh thu **khi thu tiền**. Theo nguyên tắc dồn tích, doanh thu được ghi **khi giao hàng / hoàn thành dịch vụ**, dù khách chưa trả. Bán chịu 1.000 → doanh thu thuần vẫn là 1.000 ngay hôm giao hàng (xem mục 5).

### 2.2 Giá vốn hàng bán — COGS (Cost of Goods Sold)

**(a) Là gì.** Chi phí **trực tiếp** để tạo ra đúng số hàng đã bán: nguyên vật liệu, nhân công trực tiếp, khấu hao máy sản xuất. Chỉ tính cho hàng **đã bán**, không tính hàng còn tồn kho.

**(b) Vì sao cần.** Tách phần "tiền làm ra sản phẩm" khỏi phần "tiền vận hành công ty". Nhờ đó biết mỗi đồng doanh thu tốn bao nhiêu để *sản xuất*, trước khi tính đến bộ máy quản lý.

**(c) Ví dụ số cụ thể** (giả sử doanh thu 1.000):

| # | COGS | Lợi nhuận gộp = 1.000 − COGS | Nhận xét |
|---|-----:|-----------------------------:|----------|
| 1 | 600 | **400** | biên gộp 40% |
| 2 | 300 | **700** | hàng giá trị cao, gộp dày |
| 3 | 900 | **100** | hàng giá rẻ, gộp mỏng |
| 4 | 1.050 | **−50** | bán dưới giá vốn → lỗ gộp |

### 2.3 Lợi nhuận gộp (Gross Profit)

**(a) Là gì.** Phần còn lại sau khi doanh thu thuần trừ COGS.

$$\text{Lợi nhuận gộp} = \text{Doanh thu thuần} - \text{COGS}$$

**(b) Vì sao cần.** Đây là "tiền lời thô" từ chính việc bán hàng, chưa tính chi phí vận hành. Nếu con số này đã âm thì càng bán càng lỗ — không cách nào cứu bằng cắt giảm quản lý.

**(c) Ví dụ số cụ thể:**

- Doanh thu 1.000, COGS 600 → gộp $= 1.000 - 600 = \mathbf{400}$.
- Doanh thu 800, COGS 500 → gộp $= 800 - 500 = \mathbf{300}$.
- Doanh thu 2.000, COGS 1.400 → gộp $= 2.000 - 1.400 = \mathbf{600}$.
- Doanh thu 500, COGS 520 → gộp $= 500 - 520 = \mathbf{-20}$ (lỗ gộp).

### 2.4 Chi phí hoạt động (Operating Expenses)

**(a) Là gì.** Chi phí vận hành bộ máy, **không trực tiếp** gắn với sản xuất từng đơn vị hàng. Hai nhóm lớn: **chi phí bán hàng** (marketing, hoa hồng, vận chuyển) và **chi phí quản lý doanh nghiệp** (lương văn phòng, thuê trụ sở, kế toán).

**(b) Vì sao cần.** Đây là chi phí "giữ đèn sáng" — có bán hay không vẫn phát sinh phần lớn. Tách riêng để đánh giá bộ máy có cồng kềnh so với doanh thu không.

**(c) Ví dụ số cụ thể** (gộp 400):

| # | CP bán hàng | CP quản lý | Tổng CP hoạt động | EBIT = 400 − tổng |
|---|------------:|-----------:|------------------:|------------------:|
| 1 | 150 | 100 | 250 | **150** |
| 2 | 80 | 60 | 140 | **260** |
| 3 | 250 | 180 | 430 | **−30** (lỗ hoạt động) |
| 4 | 40 | 40 | 80 | **320** |

### 2.5 Lợi nhuận hoạt động — EBIT (Operating Income)

**(a) Là gì.** Lợi nhuận gộp trừ chi phí hoạt động. EBIT = *Earnings Before Interest and Taxes* — lợi nhuận **trước lãi vay và thuế**.

$$\text{EBIT} = \text{Lợi nhuận gộp} - \text{Chi phí hoạt động}$$

**(b) Vì sao cần.** EBIT đo sức khỏe của **chính hoạt động kinh doanh**, tách khỏi *cách tài trợ* (vay nhiều hay ít) và *chính sách thuế*. Nhờ đó so sánh công bằng hai công ty dù một bên vay nợ, một bên không. Vay và thuế được tính ở các tầng sau.

**(c) Ví dụ số cụ thể:**

- Gộp 400, CP hoạt động 250 → EBIT $= 400 - 250 = \mathbf{150}$.
- Gộp 700, CP hoạt động 300 → EBIT $= 700 - 300 = \mathbf{400}$.
- Gộp 300, CP hoạt động 350 → EBIT $= 300 - 350 = \mathbf{-50}$ (hoạt động lỗ).
- Gộp 600, CP hoạt động 120 → EBIT $= 600 - 120 = \mathbf{480}$.

### 2.6 Lãi vay (Interest Expense)

**(a) Là gì.** Chi phí trả cho **chủ nợ** vì đã vay tiền — độc lập với kết quả bán hàng.

**(b) Vì sao cần.** Đây là chi phí của *quyết định tài trợ bằng nợ*, không phải của hoạt động kinh doanh. Vì thế nó nằm **dưới** EBIT: hai công ty EBIT bằng nhau nhưng công ty vay nhiều sẽ có lợi nhuận trước thuế thấp hơn.

**(c) Ví dụ số cụ thể** (EBIT 150):

| # | Lãi vay | Lợi nhuận trước thuế (EBT) = 150 − lãi |
|---|--------:|---------------------------------------:|
| 1 | 30 | **120** |
| 2 | 0 | **150** (không vay) |
| 3 | 90 | **60** (vay nhiều) |
| 4 | 160 | **−10** (lãi vay nuốt hết lãi hoạt động) |

### 2.7 Thuế thu nhập doanh nghiệp (Corporate Income Tax)

**(a) Là gì.** Phần nộp nhà nước, tính trên **lợi nhuận trước thuế (EBT)** theo thuế suất.

$$\text{Thuế} = \text{EBT} \times \text{thuế suất} \quad (\text{khi EBT} > 0)$$

**(b) Vì sao cần.** Là dòng cuối cùng bị trừ. Lưu ý: khi EBT ≤ 0 (lỗ), thường **không phát sinh thuế** (thuế = 0), thậm chí lỗ được chuyển sang kỳ sau để bù trừ.

**(c) Ví dụ số cụ thể** (thuế suất 20%):

| # | EBT | Thuế = 20% × EBT | Lợi nhuận ròng = EBT − thuế |
|---|----:|-----------------:|----------------------------:|
| 1 | 120 | 24 | **96** |
| 2 | 150 | 30 | **120** |
| 3 | 60 | 12 | **48** |
| 4 | −10 | 0 (lỗ, không nộp) | **−10** |

### 2.8 Lợi nhuận ròng — Net income (Bottom line)

**(a) Là gì.** Dòng cuối cùng — "bottom line". Thứ còn lại sau *tất cả* chi phí, lãi vay và thuế; là phần chảy vào **lợi nhuận giữ lại** (làm tăng vốn chủ ở [Lesson 01](../../01-Fundamentals/lesson-01-accounting-equation/)).

$$\text{Net income} = \text{EBT} - \text{Thuế}$$

**(b) Vì sao cần.** Đây là con số "chủ thực sự kiếm được trong kỳ", dùng để chia cổ tức hoặc tái đầu tư.

**(c) Ví dụ số cụ thể:**

- EBT 120, thuế 24 → net $= 120 - 24 = \mathbf{96}$.
- EBT 400, thuế 80 → net $= 400 - 80 = \mathbf{320}$.
- EBT 60, thuế 12 → net $= 60 - 12 = \mathbf{48}$.
- EBT −50, thuế 0 → net $= \mathbf{-50}$ (lỗ ròng, không có thuế để trừ).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao lãi vay và thuế bị tách xuống dưới, không gộp vào chi phí hoạt động?"* → Vì chúng không phản ánh chất lượng *kinh doanh*. Cùng một cửa hàng, nếu chủ vay ít hơn thì lãi vay giảm nhưng việc bán hàng chẳng khác gì. Tách ra để EBIT so sánh được giữa các công ty.
> - *"COGS và chi phí hoạt động khác nhau chỗ nào?"* → COGS gắn **trực tiếp** với hàng đã bán (hết hàng thì hết COGS tương ứng). Chi phí hoạt động là chi phí bộ máy, phát sinh gần như cố định dù bán nhiều hay ít.
> - *"Lợi nhuận ròng có phải là tiền mặt tăng thêm không?"* → **Không.** Xem mục 4.

> 🔁 **Dừng lại tự kiểm tra.**
> Doanh thu 900, COGS 500, chi phí hoạt động 200, lãi vay 40, thuế suất 20%.
> 1. Lợi nhuận gộp?
> 2. EBIT?
> 3. Lợi nhuận ròng?
>
> <details><summary>Đáp án</summary>
>
> 1. Gộp $= 900 - 500 = 400$.
> 2. EBIT $= 400 - 200 = 200$.
> 3. EBT $= 200 - 40 = 160$; thuế $= 160 \times 0{,}2 = 32$; net $= 160 - 32 = \mathbf{128}$.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Đọc từ trên xuống: Doanh thu → (−COGS) → Gộp → (−CP hoạt động) → EBIT → (−Lãi vay) → EBT → (−Thuế) → Net income.
> - COGS = chi phí *trực tiếp* làm hàng; CP hoạt động = chi phí *bộ máy*.
> - EBIT tách khỏi cách tài trợ (vay) và thuế → so sánh được giữa các công ty.
> - Lỗ (EBT ≤ 0) thường kéo theo thuế = 0.

---

## 3. Ba biên lợi nhuận (Profit Margins)

> 💡 **Trực giác.** Con số lợi nhuận tuyệt đối (96 triệu) không cho biết công ty *hiệu quả* đến đâu — 96 trên doanh thu 1.000 khác hẳn 96 trên doanh thu 100.000. **Biên lợi nhuận** chia lợi nhuận cho doanh thu để ra "giữ lại được bao nhiêu xu trên mỗi đồng bán ra". Nhờ đó so sánh được công ty lớn với công ty nhỏ.

Ba biên tương ứng ba dòng lợi nhuận, **cùng mẫu số là doanh thu thuần**:

$$
\text{Biên gộp} = \frac{\text{Lợi nhuận gộp}}{\text{Doanh thu}}, \quad
\text{Biên hoạt động} = \frac{\text{EBIT}}{\text{Doanh thu}}, \quad
\text{Biên ròng} = \frac{\text{Net income}}{\text{Doanh thu}}
$$

Vì mỗi tầng trừ thêm chi phí nên **luôn có** $\text{biên gộp} \ge \text{biên hoạt động} \ge \text{biên ròng}$ (khi các dòng đều dương).

**Ví dụ số cụ thể** (≥ 4, dùng công ty mẫu và biến thể):

| # | Doanh thu | Gộp | EBIT | Net | Biên gộp | Biên hoạt động | Biên ròng |
|---|----------:|----:|-----:|----:|---------:|---------------:|----------:|
| 1 | 1.000 | 400 | 150 | 96 | 40,0% | 15,0% | 9,6% |
| 2 | 2.000 | 600 | 480 | 384 | 30,0% | 24,0% | 19,2% |
| 3 | 500 | 350 | 100 | 64 | 70,0% | 20,0% | 12,8% |
| 4 | 800 | 240 | −30 | −30 | 30,0% | −3,75% | −3,75% |

Walk-through hàng #1: biên gộp $= 400/1000 = 0{,}40 = 40\%$; biên hoạt động $= 150/1000 = 15\%$; biên ròng $= 96/1000 = 9{,}6\%$. Kiểm tra thứ tự: $40\% \ge 15\% \ge 9{,}6\%$ ✓.

> ⚠ **Lỗi thường gặp.** Chia lãi cho **chi phí** hoặc cho **tài sản** rồi gọi là "biên". Biên lợi nhuận luôn chia cho **doanh thu**. Chia cho tài sản là ROA, chia cho vốn chủ là ROE — chỉ số khác, học sau.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Biên ròng cao luôn tốt hơn?"* → Không hẳn. Siêu thị có biên ròng 2% nhưng vòng quay lớn; phần mềm có biên 30% nhưng quy mô nhỏ. Biên chỉ có nghĩa khi so trong **cùng ngành**.
> - *"Có thể biên hoạt động > biên gộp không?"* → Không, khi chi phí hoạt động ≥ 0. EBIT = gộp − chi phí hoạt động ≤ gộp, nên chia cùng doanh thu thì biên hoạt động ≤ biên gộp.

> 🔁 **Dừng lại tự kiểm tra.**
> Doanh thu 1.500, gộp 600, EBIT 300, net 210. Tính 3 biên.
>
> <details><summary>Đáp án</summary>
>
> Biên gộp $= 600/1500 = 40\%$; biên hoạt động $= 300/1500 = 20\%$; biên ròng $= 210/1500 = 14\%$.
> </details>

> 📝 **Tóm tắt mục 3.**
> - 3 biên = 3 dòng lợi nhuận ÷ doanh thu. Đơn vị %.
> - Thứ tự khi dương: biên gộp ≥ biên hoạt động ≥ biên ròng.
> - Biên chỉ so sánh được trong cùng ngành.

---

## 4. Lợi nhuận ròng ≠ Dòng tiền (nguyên tắc dồn tích)

> 💡 **Trực giác.** Báo cáo KQKD ghi theo **nguyên tắc dồn tích (accrual)**: doanh thu ghi *khi giao hàng*, chi phí ghi *khi phát sinh* — bất kể tiền đã vào/ra hay chưa. Vì vậy "lãi 96 triệu" **không** có nghĩa "tài khoản ngân hàng tăng 96 triệu".

Ba tình huống làm net income lệch khỏi dòng tiền:

1. **Bán chịu.** Giao hàng 1.000, khách hẹn trả tháng sau → doanh thu +1.000 ngay hôm nay, nhưng **tiền chưa vào**. Lợi nhuận có, tiền chưa có.
2. **Khấu hao.** Mua máy 1.200, dùng 4 năm → mỗi năm ghi chi phí khấu hao 300 (làm giảm lợi nhuận), nhưng **không chi tiền** năm đó — tiền đã chi trọn 1.200 lúc mua.
3. **Trả trước.** Trả tiền thuê nhà 12 tháng ngay đầu năm → tiền ra 1 cục, nhưng chi phí được **rải đều** từng tháng.

**Ví dụ số cụ thể — lãi mà vẫn cạn tiền:**

| Khoản | Ảnh hưởng lợi nhuận | Ảnh hưởng tiền mặt |
|-------|--------------------:|-------------------:|
| Doanh thu (bán chịu) | +1.000 | 0 (chưa thu) |
| COGS (đã trả tiền hàng) | −600 | −600 |
| Chi phí hoạt động (đã trả) | −250 | −250 |
| Lãi vay + thuế (đã trả) | −54 | −54 |
| **Kết quả** | **Net income = +96** | **Tiền mặt = −904** |

→ Sổ sách **lãi 96** nhưng két **hụt 904** vì khách chưa trả. Đây là lý do một công ty có lãi vẫn có thể phá sản vì thiếu tiền — và vì sao cần một báo cáo riêng cho dòng tiền.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Vậy xem ở đâu để biết tiền thật sự vào/ra?"* → Ở **Báo cáo lưu chuyển tiền tệ (cash flow statement)** — chủ đề [Lesson 07](../lesson-07-cash-flow/). Net income là điểm khởi đầu, rồi cộng/trừ các khoản không-bằng-tiền để ra dòng tiền thật.

> 📝 **Tóm tắt mục 4.**
> - Báo cáo KQKD dùng dồn tích: ghi theo *phát sinh*, không theo *thu/chi tiền*.
> - Bán chịu, khấu hao, trả trước làm net income lệch khỏi dòng tiền.
> - Có lãi vẫn có thể cạn tiền → cần báo cáo lưu chuyển tiền tệ (L07).

---

## 5. Walk-through số thật đầy đủ

Công ty **Cà Phê Sạch** trong năm N, đơn vị triệu đồng. Đi từ đỉnh phễu xuống đáy, kiểm tra **từng phép trừ**:

| Bước | Dòng | Phép tính | Kết quả |
|------|------|-----------|--------:|
| 0 | Doanh thu thuần | (cho trước) | **1.000** |
| 1 | − Giá vốn hàng bán (COGS) | $1.000 - 600$ | |
|   | = **Lợi nhuận gộp** | | **400** |
| 2 | − Chi phí hoạt động | $400 - 250$ | |
|   | = **Lợi nhuận hoạt động (EBIT)** | | **150** |
| 3 | − Lãi vay | $150 - 30$ | |
|   | = **Lợi nhuận trước thuế (EBT)** | | **120** |
| 4 | − Thuế TNDN (20%) | $120 - (120 \times 0{,}20) = 120 - 24$ | |
|   | = **Lợi nhuận ròng (Net income)** | | **96** |

Kiểm tra chéo (một dòng): $1000 - 600 - 250 - 30 - 24 = \mathbf{96}$ ✓ — tổng các khoản trừ $= 600 + 250 + 30 + 24 = 904$, và $1000 - 904 = 96$ ✓.

**Ba biên tương ứng:**

$$
\text{Biên gộp} = \frac{400}{1000} = 40\%, \quad
\text{Biên hoạt động} = \frac{150}{1000} = 15\%, \quad
\text{Biên ròng} = \frac{96}{1000} = 9{,}6\%
$$

Đọc ra ý nghĩa: mỗi 100 đồng bán ra, công ty giữ 40 đồng sau giá vốn, 15 đồng sau khi nuôi bộ máy, và 9,6 đồng cuối cùng về tay chủ.

> 🔁 **Dừng lại tự kiểm tra.** Nếu thuế suất tăng lên 25% (các số khác giữ nguyên), lợi nhuận ròng và biên ròng mới là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> Thuế $= 120 \times 0{,}25 = 30$; net $= 120 - 30 = 90$; biên ròng $= 90/1000 = 9{,}0\%$.
> </details>

---

## 6. Bài tập

**Bài 1 (dựng báo cáo).** Công ty A: doanh thu thuần 2.000, COGS 1.200, chi phí bán hàng 300, chi phí quản lý 200, lãi vay 60, thuế suất 20%. Lập báo cáo KQKD nhiều bước và tính 3 biên.

**Bài 2 (đọc ngược).** Biết: lợi nhuận ròng 240, thuế suất 20%, lãi vay 50, chi phí hoạt động 210, biên gộp 40%. Tìm **doanh thu thuần** và **COGS**.

**Bài 3 (so sánh cấu trúc vốn).** Hai công ty cùng EBIT = 500, thuế suất 20%. Công ty X không vay (lãi vay 0), công ty Y vay nhiều (lãi vay 300). Tính lợi nhuận ròng mỗi công ty và giải thích vì sao EBIT giống nhau mà net income khác nhau.

**Bài 4 (lãi sổ sách vs tiền).** Trong kỳ: doanh thu bán chịu 700 (chưa thu đồng nào), COGS 400 (đã trả tiền), chi phí hoạt động 150 (đã trả), không vay, thuế suất 20%. Tính lợi nhuận ròng và **thay đổi tiền mặt thực tế** trong kỳ. Nhận xét.

---

## 7. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: trừ từng tầng từ trên xuống.

| Dòng | Phép tính | Kết quả |
|------|-----------|--------:|
| Doanh thu thuần | | 2.000 |
| − COGS | $2000 - 1200$ | |
| = Lợi nhuận gộp | | **800** |
| − Chi phí hoạt động | $800 - (300 + 200)$ | |
| = EBIT | | **300** |
| − Lãi vay | $300 - 60$ | |
| = EBT | | **240** |
| − Thuế (20%) | $240 - 48$ | |
| = Net income | | **192** |

Biên: gộp $= 800/2000 = 40\%$; hoạt động $= 300/2000 = 15\%$; ròng $= 192/2000 = 9{,}6\%$. Kiểm tra một dòng: $2000 - 1200 - 500 - 60 - 48 = 192$ ✓.

**Bài 2.** Cách tiếp cận: đi ngược từ đáy lên đỉnh.
- Net income 240, thuế suất 20% ⇒ $\text{net} = \text{EBT} \times (1 - 0{,}2) = 0{,}8 \cdot \text{EBT}$. Vậy $\text{EBT} = 240 / 0{,}8 = 300$.
- $\text{EBIT} = \text{EBT} + \text{lãi vay} = 300 + 50 = 350$.
- $\text{Lợi nhuận gộp} = \text{EBIT} + \text{chi phí hoạt động} = 350 + 210 = 560$.
- Biên gộp $= 40\%$ ⇒ $\text{gộp} = 0{,}4 \cdot \text{doanh thu}$ ⇒ $\text{doanh thu} = 560 / 0{,}4 = \mathbf{1.400}$.
- $\text{COGS} = \text{doanh thu} - \text{gộp} = 1400 - 560 = \mathbf{840}$.

Kiểm tra xuôi: $1400 - 840 = 560$; $560 - 210 = 350$; $350 - 50 = 300$; $300 - 60 = 240$ ✓.

**Bài 3.** Cách tiếp cận: chỉ khác nhau ở dòng lãi vay.
- Công ty X: EBT $= 500 - 0 = 500$; thuế $= 100$; net $= \mathbf{400}$.
- Công ty Y: EBT $= 500 - 300 = 200$; thuế $= 40$; net $= \mathbf{160}$.
- Giải thích: EBIT đo *hoạt động kinh doanh*, giống nhau vì cả hai bán hàng như nhau. Nhưng Y chọn **tài trợ bằng nợ** nên phải trả 300 lãi vay — khoản này nằm dưới EBIT, ăn vào lợi nhuận còn lại cho chủ. Đây chính là lý do income statement tách lãi vay khỏi EBIT: để không lẫn "kết quả kinh doanh" với "quyết định vay nợ".

**Bài 4.** Cách tiếp cận: tính lợi nhuận (dồn tích) rồi tính tiền (thực thu/chi) riêng.
- Lợi nhuận: gộp $= 700 - 400 = 300$; EBIT $= 300 - 150 = 150$; không vay ⇒ EBT $= 150$; thuế $= 150 \times 0{,}2 = 30$; **net income $= 120$**.
- Tiền mặt thực tế: doanh thu bán chịu → thu 0; COGS đã trả → −400; chi phí hoạt động đã trả → −150; giả sử thuế nộp ngay → −30. **Thay đổi tiền $= 0 - 400 - 150 - 30 = -580$**.
- Nhận xét: sổ **lãi 120** nhưng két **hụt 580**, chênh 700 đúng bằng khoản khách còn nợ. Có lãi không đồng nghĩa có tiền — muốn thấy tiền thật phải xem báo cáo lưu chuyển tiền tệ ([Lesson 07](../lesson-07-cash-flow/)).

> 📝 **Tóm tắt bài học.**
> - Báo cáo KQKD nhiều bước: Doanh thu − COGS = Gộp; − CP hoạt động = EBIT; − Lãi vay = EBT; − Thuế = Net income.
> - EBIT tách khỏi cách tài trợ và thuế → so sánh hoạt động công bằng.
> - 3 biên = 3 dòng lợi nhuận ÷ doanh thu; thứ tự gộp ≥ hoạt động ≥ ròng khi dương.
> - Net income theo dồn tích ≠ dòng tiền; lãi sổ sách có thể đi kèm cạn tiền.

---

## Bài tiếp theo

**[Lesson 07 — Báo cáo lưu chuyển tiền tệ](../lesson-07-cash-flow/)**: từ net income của bài này, cộng/trừ các khoản không-bằng-tiền (khấu hao, thay đổi phải thu/phải trả) để ra **dòng tiền thật** — trả lời câu hỏi "lãi mà vẫn cạn tiền" đặt ra ở mục 4.

Minh họa tương tác: [visualization.html](./visualization.html) — chỉnh doanh thu, COGS, chi phí, lãi vay, thuế suất bằng slider; xem báo cáo nhiều bước, 3 biên và biểu đồ waterfall dựng lại theo thời gian thực.
