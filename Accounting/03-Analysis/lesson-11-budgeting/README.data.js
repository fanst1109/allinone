// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Accounting/03-Analysis/lesson-11-budgeting/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 11 — Ngân sách & dự báo (Budgeting & Forecasting)

> Lợi nhuận nói doanh nghiệp *làm ăn có lời không*. Ngân sách tiền mặt nói doanh nghiệp *có sống được tới cuối tháng không*. Hai câu hỏi khác nhau — và một công ty có lãi vẫn có thể **cạn tiền**.

## Mục tiêu học tập

- Phân biệt **ngân sách hoạt động (operating budget)** — kế hoạch lãi/lỗ theo dồn tích — và **ngân sách tiền mặt (cash budget)** — kế hoạch dòng tiền thực.
- Lập được cash budget nhiều tháng: **số dư cuối kỳ = số dư đầu kỳ + thu tiền − chi tiền**, phát hiện tháng âm tiền → cần vay.
- Hiểu *vì sao* **doanh thu ghi nhận ≠ tiền thu về cùng lúc** (độ trễ thu tiền) và vì sao khoảng lệch đó bằng đúng mức tăng khoản phải thu.
- Tính và diễn giải **chênh lệch (variance) = Thực tế − Ngân sách**, gắn nhãn *thuận lợi (favorable)* / *bất lợi (unfavorable)* đúng chiều cho doanh thu và cho chi phí.

## Kiến thức tiền đề

- [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/): khái niệm **khoản phải thu (accounts receivable)** — bán chịu vẫn ghi doanh thu dù chưa cầm tiền. Đây là hạt nhân của cả bài này.
- Nguyên tắc **dồn tích (accrual)** — doanh thu ghi khi *phát sinh* (giao hàng/xuất hóa đơn), không phải khi thu tiền — sẽ được đào sâu ở **Lesson 04**. Báo cáo **lưu chuyển tiền tệ** (bắc cầu lợi nhuận ↔ tiền) ở **Lesson 07**. Ở đây ta chỉ cần trực giác: *ghi nhận và thu tiền là hai thời điểm khác nhau.*
- Số học cộng/trừ và phần trăm.

---

## 1. Bức tranh lớn: ngân sách là gì và vì sao cần?

> 💡 **Trực giác.** Ngân sách là **tấm bản đồ tiền bạc vẽ trước khi lên đường**. Trước khi tiêu, ta hỏi: tháng tới dự kiến bán được bao nhiêu? chi những gì? khi nào tiền *thực sự* về tài khoản? Có tấm bản đồ này, ta thấy trước "khúc suối cạn tiền" tháng 3 để chủ động vay *trước*, thay vì tới lúc không trả nổi lương mới cuống cuồng.

**(a) Là gì.** Ngân sách (budget) là **kế hoạch tài chính định lượng cho một kỳ tương lai** — biểu diễn bằng con số cụ thể, không phải lời hứa chung chung.

**(b) Vì sao cần.** Ba việc: (1) *lập kế hoạch* — buộc phải nghĩ trước; (2) *điều phối* — bộ phận bán hàng, mua hàng, tài chính khớp nhau trên cùng một bộ số; (3) *kiểm soát* — cuối kỳ so số thực với số kế hoạch để biết chệch ở đâu (chính là **variance**, mục 4).

**(c) Hai loại ta học ở bài này** — trả lời hai câu hỏi khác nhau:

| Ngân sách | Trả lời câu hỏi | Cơ sở |
|-----------|-----------------|-------|
| **Hoạt động** (operating) | "Kỳ này *lời hay lỗ*?" | Dồn tích: doanh thu & chi phí khi **phát sinh** |
| **Tiền mặt** (cash) | "Kỳ này *có đủ tiền tiêu* không?" | Tiền thực: **thu/chi khi tiền chuyển động** |

Điểm mấu chốt của cả bài — ta sẽ chứng minh bằng số ở mục 3: **có lãi trên giấy vẫn có thể âm tiền trong két.**

---

## 2. Ngân sách hoạt động (Operating budget)

**(a) Là gì.** Bảng dự kiến **lợi nhuận** của kỳ theo cơ sở dồn tích:

$$\\text{Lợi nhuận dự kiến} = \\text{Doanh thu dự kiến} - \\text{Chi phí dự kiến}$$

**(b) Vì sao cần.** Để biết mô hình kinh doanh *có lời không* khi các thời điểm thu/chi đã được "san phẳng". Doanh thu ghi ngay khi bán (kể cả bán chịu); chi phí ghi ngay khi phát sinh (kể cả mua chịu). Nó bỏ qua *thời điểm tiền chạy* — đó là việc của cash budget.

**(c) Ví dụ số cụ thể** — quán bán lẻ, 4 tháng (đơn vị: triệu đồng). Đây là **bộ số dùng xuyên suốt cả bài**:

| Tháng | Doanh thu ghi nhận |
|:-----:|-------------------:|
| 1 | 100 |
| 2 | 80 |
| 3 | 90 |
| 4 | 140 |
| **Tổng** | **410** |

Ngân sách hoạt động 4 tháng:

| Khoản mục | Số tiền |
|-----------|--------:|
| Doanh thu dự kiến | 410 |
| − Giá vốn hàng bán (COGS) | 300 |
| − Chi phí bán hàng & quản lý (SG&A) | 90 |
| **= Lợi nhuận dự kiến** | **20** |

Walk-through: $410 - 300 - 90 = 20$. Vậy **kế hoạch có lãi 20**. Bốn ví dụ đọc con số:
- Nếu doanh thu tụt còn 380: LN $= 380 - 300 - 90 = -10$ → **lỗ** kế hoạch.
- Nếu COGS tăng lên 330 (doanh thu giữ 410): LN $= 410 - 330 - 90 = -10$ → lỗ.
- Nếu tiết kiệm SG&A còn 70: LN $= 410 - 300 - 70 = 40$ → lãi gấp đôi.
- Biên lợi nhuận kế hoạch $= 20 / 410 \\approx 4.9\\%$ — mỏng, một cú trượt nhỏ là về 0.

> ⚠ **Toy example — cảnh báo.** Ở đây ta giả định **mọi chi phí đều được chi bằng tiền ngay trong tháng phát sinh** và không có khấu hao. Thực tế operating budget có khoản không phải tiền (khấu hao) và mua chịu (trả sau) — nên chi phí dồn tích ≠ chi tiền. Ta đơn giản hóa để tách bạch *một* khác biệt duy nhất là **độ trễ thu tiền của doanh thu**, cho dễ thấy cơ chế.

> 📝 **Tóm tắt mục 2.** Operating budget = doanh thu − chi phí (dồn tích) → cho biết *lời/lỗ*. Nó **không** cho biết trong két còn bao nhiêu tiền vào mỗi thời điểm.

---

## 3. Ngân sách tiền mặt (Cash budget) — và vì sao khác lợi nhuận

> 💡 **Trực giác.** Doanh thu giống như "đã ghi bàn"; tiền mặt là "tiền thưởng thực đã vào tài khoản". Bán chịu = ghi bàn hôm nay nhưng tháng sau tiền mới về. Nếu chi phí phải trả *ngay* trong khi tiền bán hàng *đủng đỉnh* về sau, thì dù tổng cuộc có lãi, giữa chừng vẫn có thể hết sạch tiền tiêu.

### 3.1 Độ trễ thu tiền (collection lag)

Doanh nghiệp bán chịu: khách nhận hàng tháng này nhưng trả tiền rải ra. Giả định thu tiền:

$$\\text{Thu tiền tháng } t = 60\\% \\times \\text{Doanh thu}_t + 40\\% \\times \\text{Doanh thu}_{t-1}$$

Nghĩa là 60% doanh thu thu ngay trong tháng, 40% còn lại thu vào **tháng sau**. Doanh thu tháng 12 (kỳ trước) = **50** để có phần 40% chảy sang tháng 1.

**Bảng thu tiền** (walk-through từng tháng, verify bằng số thật):

| Tháng | Doanh thu | Thu ngay 60% | Thu từ tháng trước 40% | **Tổng thu tiền** |
|:-----:|----------:|-------------:|-----------------------:|------------------:|
| 1 | 100 | $0.6 \\times 100 = 60$ | $0.4 \\times 50 = 20$ | **80** |
| 2 | 80 | $0.6 \\times 80 = 48$ | $0.4 \\times 100 = 40$ | **88** |
| 3 | 90 | $0.6 \\times 90 = 54$ | $0.4 \\times 80 = 32$ | **86** |
| 4 | 140 | $0.6 \\times 140 = 84$ | $0.4 \\times 90 = 36$ | **120** |
| **Tổng** | **410** | | | **374** |

Chú ý ngay: doanh thu 4 tháng = **410**, nhưng tiền thu về chỉ **374**. Hụt **36** — đó là 40% của doanh thu tháng 4 ($0.4 \\times 140 = 56$) chưa tới hạn thu, trừ đi 20 "gánh sang" từ tháng 12 đã thu ở tháng 1. Nói cách khác: **khoản phải thu tăng thêm 36**, và tiền thiếu đúng bằng phần đó. Đây chính là cầu nối doanh thu ↔ tiền (đào sâu ở Lesson 07).

### 3.2 Công thức xương sống của cash budget

> 💡 Cash budget chỉ là một **sổ quỹ dự báo**: đầu tháng có bao nhiêu, trong tháng thu vào bao nhiêu, chi ra bao nhiêu, cuối tháng còn bao nhiêu — rồi *"còn bao nhiêu"* của tháng này trở thành *"có bao nhiêu"* của tháng sau.

$$\\boxed{\\text{Số dư cuối kỳ} = \\text{Số dư đầu kỳ} + \\text{Thu tiền} - \\text{Chi tiền}}$$

và mắt xích nối các tháng:

$$\\text{Số dư đầu kỳ}_t = \\text{Số dư cuối kỳ}_{t-1}$$

### 3.3 Walk-through cash budget 4 tháng

Chi tiền (cash out) mỗi tháng: T1 = 70, T2 = 90, T3 = **130** (nhập lô hàng lớn chuẩn bị mùa cao điểm), T4 = 100. Số dư tiền đầu tháng 1 = **20**.

| Tháng | Số dư đầu kỳ | + Thu tiền | − Chi tiền | = Số dư cuối kỳ |
|:-----:|-------------:|-----------:|-----------:|----------------:|
| 1 | 20 | 80 | 70 | **30** |
| 2 | 30 | 88 | 90 | **28** |
| 3 | 28 | 86 | 130 | **−16** ⚠ |
| 4 | −16 | 120 | 100 | **4** |

Kiểm tra từng dòng (số dư cuối = đầu + thu − chi):
- T1: $20 + 80 - 70 = 30$ ✓
- T2: $30 + 88 - 90 = 28$ ✓ (số dư cuối T1 = 30 làm số dư đầu T2 ✓)
- T3: $28 + 86 - 130 = -16$ ✓ → **âm tiền!**
- T4: $-16 + 120 - 100 = 4$ ✓

**Tháng 3 số dư −16** dù cả 4 tháng vẫn có tiền thu về đều đặn. Nguyên nhân: lô hàng 130 phải trả *ngay*, trong khi tiền bán hàng về nhỏ giọt (86). Doanh nghiệp cần **thu xếp vay ít nhất 16 triệu** (hoặc hoãn bớt lô hàng) để không vỡ quỹ tháng 3.

### 3.4 Cú chốt: lãi 20 nhưng tiền giảm 16

Ghép hai bức tranh trên cùng bộ số:

- **Operating budget**: lợi nhuận dự kiến $= +20$.
- **Cash budget**: tiền đầu kỳ 20 → cuối kỳ 4, tức tiền **giảm 16**.

Vì sao lời 20 mà tiền lại giảm 16? Khoảng lệch $20 - (-16) = 36$ — đúng bằng mức **tăng khoản phải thu 36** ở mục 3.1. Công ty đã "kiếm" được 20, nhưng 36 trong số doanh thu vẫn nằm ở túi khách hàng chưa về.

$$\\text{Thay đổi tiền} = \\text{Lợi nhuận} - \\Delta\\text{Phải thu} = 20 - 36 = -16 \\checkmark$$

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy công ty này làm ăn tệ à?"* → Không. Nó **có lãi**. Vấn đề là **thanh khoản (liquidity)** — thời điểm tiền vào/ra lệch nhau. Vay ngắn hạn bắc cầu qua tháng 3 là chuyện bình thường, miễn là *thấy trước*.
> - *"Nếu cho khách trả chậm hơn (thu ngay 40% thôi) thì sao?"* → Tiền về càng chậm, số dư càng thủng sâu hơn ở các tháng đầu → cần vay nhiều hơn. Thử ngay bằng thanh trượt "% thu ngay" trong [visualization](./visualization.html).
> - *"Số dư âm thì phần mềm kế toán có tự báo không?"* → Không tự lo hộ. Chính cash budget là công cụ để *bạn* phát hiện trước. Đó là lý do phải lập nó.

> ⚠ **Lỗi thường gặp.** *"Có lãi thì ắt có tiền."* **Sai** — đây là cách nhiều doanh nghiệp nhỏ chết dù sổ sách báo lãi: bán chịu nhiều, tiền không kịp về, đến hạn trả lương/nhà cung cấp thì cạn quỹ. Lãi và tiền là **hai đại lượng khác nhau**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Số dư đầu tháng 5 bằng bao nhiêu? Nếu tháng 5 thu 110, chi 95 thì số dư cuối tháng 5 là bao nhiêu?
> 2. Nếu số dư đầu tháng 1 chỉ là 5 (thay vì 20), tháng nào bắt đầu âm và âm sâu nhất bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Số dư đầu T5 = số dư cuối T4 = **4**. Cuối T5 $= 4 + 110 - 95 = \\mathbf{19}$.
> 2. Mọi số dư cuối kỳ giảm đi 15 (vì đầu kỳ giảm 15): T1 = 15, T2 = 13, T3 = **−31** (âm sâu nhất), T4 = −11. Âm ngay từ tháng 3 và **vẫn âm ở tháng 4** → cần vay nhiều hơn, tới ≥ 31.
> </details>

> 📝 **Tóm tắt mục 3.** Số dư cuối = đầu + thu − chi; cuối tháng này = đầu tháng sau. Độ trễ thu tiền khiến tiền về chậm hơn doanh thu ghi nhận. Chênh lệch lãi vs tiền = thay đổi khoản phải thu. Số dư âm = tín hiệu **phải vay/hoãn chi**, và cash budget cho thấy điều đó *trước khi* nó xảy ra.

---

## 4. Phân tích chênh lệch (Variance analysis)

> 💡 **Trực giác.** Cuối kỳ, đặt "số thực tế" cạnh "số kế hoạch" và soi khoảng cách. Giống chấm điểm bài thi so với đáp án: lệch ở đâu, lệch bao nhiêu, tốt hay xấu.

**(a) Là gì.** Chênh lệch (variance) đo khoảng cách giữa kết quả thực và ngân sách:

$$\\text{Chênh lệch} = \\text{Thực tế} - \\text{Ngân sách}$$

**(b) Vì sao cần.** Ngân sách vô nghĩa nếu không đối chiếu. Variance chỉ ra *chỗ nào lệch* để truy nguyên: bán vượt kế hoạch? nguyên liệu đội giá? tiết kiệm được quản lý phí?

**(c) Chiều "thuận lợi / bất lợi" phụ thuộc bản chất khoản mục** — đây là chỗ dễ sai nhất:

| Loại khoản mục | Thực tế > Ngân sách | Thực tế < Ngân sách |
|----------------|:-------------------:|:-------------------:|
| **Doanh thu / Lợi nhuận** (càng cao càng tốt) | Thuận lợi (favorable) | Bất lợi (unfavorable) |
| **Chi phí** (càng thấp càng tốt) | Bất lợi (unfavorable) | Thuận lợi (favorable) |

> ⚠ **Lỗi thường gặp.** *"Chênh lệch dương luôn tốt."* **Sai.** Với **chi phí**, chênh lệch dương nghĩa là **tiêu quá kế hoạch** → *bất lợi*. Dấu số học và nhãn favorable/unfavorable **không phải lúc nào cũng cùng chiều** — phải hỏi "khoản này cao thì tốt hay xấu?" trước khi gắn nhãn.

**Ví dụ số cụ thể** (≥ 4 dòng, dùng lại operating budget mục 2; đơn vị: triệu):

| Chỉ tiêu | Ngân sách | Thực tế | Chênh lệch (TT − NS) | Đánh giá |
|----------|----------:|--------:|---------------------:|----------|
| Doanh thu | 410 | 440 | **+30** | Thuận lợi (bán vượt) |
| Giá vốn (COGS) | 300 | 315 | **+15** | Bất lợi (đội giá vốn) |
| Chi phí SG&A | 90 | 82 | **−8** | Thuận lợi (tiết kiệm) |
| **Lợi nhuận** | **20** | **43** | **+23** | Thuận lợi |

Walk-through, verify cả hai vế:
- Doanh thu: $440 - 410 = +30$; càng cao càng tốt → **thuận lợi**.
- COGS: $315 - 300 = +15$; chi phí cao hơn kế hoạch → **bất lợi**.
- SG&A: $82 - 90 = -8$; chi phí thấp hơn kế hoạch → **thuận lợi**.
- Lợi nhuận thực tế $= 440 - 315 - 82 = 43$; chênh lệch $= 43 - 20 = +23$ → **thuận lợi**.
- Chốt: lợi nhuận tăng 23 = doanh thu tăng 30 − vượt COGS 15 + tiết kiệm SG&A 8 $= 30 - 15 + 8 = 23$ ✓ (variance lợi nhuận = tổng variance các dòng, đúng dấu).

Bốn ví dụ đọc nhanh thêm về chiều nhãn:
- Chi phí điện: NS 12, TT 10 → $-2$ → **thuận lợi** (tiết kiệm).
- Chi phí điện: NS 12, TT 15 → $+3$ → **bất lợi** (vượt).
- Doanh thu: NS 100, TT 92 → $-8$ → **bất lợi** (hụt bán).
- Doanh thu: NS 100, TT 118 → $+18$ → **thuận lợi**.

> 📝 **Tóm tắt mục 4.** Variance = Thực tế − Ngân sách. Nhãn favorable/unfavorable **không đọc theo dấu** mà theo bản chất: doanh thu/lợi nhuận cao là tốt, chi phí cao là xấu. Variance lợi nhuận = tổng variance từng dòng (cộng doanh thu, trừ chi phí).

---

## 5. Bài tập

**Bài 1 (cash budget cơ bản).** Số dư tiền đầu kỳ 30. Ba tháng có:

| Tháng | Thu tiền | Chi tiền |
|:-----:|---------:|---------:|
| 1 | 50 | 65 |
| 2 | 70 | 60 |
| 3 | 40 | 55 |

Lập bảng số dư đầu kỳ / cuối kỳ từng tháng. Tháng nào âm tiền? Cần vay tối thiểu bao nhiêu để không tháng nào âm?

**Bài 2 (độ trễ thu tiền).** Doanh thu: tháng 12 = 60, tháng 1 = 100, tháng 2 = 150. Thu ngay 70% trong tháng, 30% thu tháng sau. Tính **tiền thu về** tháng 1 và tháng 2. Tổng doanh thu tháng 1+2 là bao nhiêu, tổng tiền thu về tháng 1+2 là bao nhiêu, chênh lệch do đâu?

**Bài 3 (variance).** Ngân sách: doanh thu 500, giá vốn 300, chi phí quản lý 120. Thực tế: doanh thu 480, giá vốn 285, chi phí quản lý 130. Tính chênh lệch từng dòng và lợi nhuận, gắn nhãn thuận lợi/bất lợi. Lợi nhuận thực tế cao hơn hay thấp hơn kế hoạch?

**Bài 4 (vận dụng — lãi mà vẫn thiếu tiền).** Một công ty có lợi nhuận kế hoạch +40 nhưng cash budget cho thấy tiền giảm 25 trong kỳ. Giả sử không có khấu hao và không mua sắm tài sản, hãy giải thích khoảng lệch 65 này bằng khái niệm khoản phải thu.

---

## 6. Lời giải chi tiết

**Bài 1.** Áp dụng số dư cuối = đầu + thu − chi, nối tháng:

| Tháng | Đầu kỳ | Thu | Chi | Cuối kỳ |
|:-----:|-------:|----:|----:|--------:|
| 1 | 30 | 50 | 65 | $30+50-65 = \\mathbf{15}$ |
| 2 | 15 | 70 | 60 | $15+70-60 = \\mathbf{25}$ |
| 3 | 25 | 40 | 55 | $25+40-55 = \\mathbf{10}$ |

Không tháng nào âm (thấp nhất là 10 ở tháng 3). Số dư luôn ≥ 0 → **không cần vay**. (Nếu yêu cầu giữ số dư tối thiểu, ví dụ ≥ 20, thì tháng 1 (15) và tháng 3 (10) hụt so với ngưỡng → cần thu xếp thêm; nhưng để "không âm" thì đủ.)

**Bài 2.** Thu tiền $= 70\\% \\times \\text{DT}_t + 30\\% \\times \\text{DT}_{t-1}$:
- Tháng 1: $0.7 \\times 100 + 0.3 \\times 60 = 70 + 18 = \\mathbf{88}$.
- Tháng 2: $0.7 \\times 150 + 0.3 \\times 100 = 105 + 30 = \\mathbf{135}$.
- Tổng doanh thu T1+T2 $= 100 + 150 = 250$. Tổng tiền thu về $= 88 + 135 = 223$.
- Chênh lệch $250 - 223 = \\mathbf{27}$: đây là 30% doanh thu tháng 2 chưa tới hạn thu ($0.3 \\times 150 = 45$) trừ phần "gánh sang" đã thu từ tháng 12 ở tháng 1 ($0.3 \\times 60 = 18$); $45 - 18 = 27$ ✓. Chính là mức tăng khoản phải thu trong 2 tháng.

**Bài 3.** Chênh lệch = Thực tế − Ngân sách:

| Chỉ tiêu | NS | TT | Chênh lệch | Đánh giá |
|----------|---:|---:|-----------:|----------|
| Doanh thu | 500 | 480 | $-20$ | Bất lợi (hụt bán) |
| Giá vốn | 300 | 285 | $-15$ | Thuận lợi (rẻ hơn) |
| Chi phí quản lý | 120 | 130 | $+10$ | Bất lợi (vượt chi) |
| **Lợi nhuận** | **80** | **65** | $-15$ | **Bất lợi** |

Lợi nhuận NS $= 500-300-120 = 80$; TT $= 480-285-130 = 65$; chênh lệch $65-80 = -15$ → **thấp hơn kế hoạch**. Kiểm tra: $(-20) - (-15) + \\dots$ theo dấu variance lợi nhuận = variance doanh thu − variance giá vốn − variance chi phí quản lý $= -20 - (-15) - (+10) = -20 + 15 - 10 = -15$ ✓.

**Bài 4.** Không khấu hao, không mua tài sản → khoảng lệch giữa lợi nhuận và thay đổi tiền chủ yếu do khoản phải thu:
$$\\text{Thay đổi tiền} = \\text{Lợi nhuận} - \\Delta\\text{Phải thu} \\Rightarrow -25 = 40 - \\Delta\\text{Phải thu} \\Rightarrow \\Delta\\text{Phải thu} = 65.$$
Nghĩa là công ty ghi nhận doanh thu nhưng **khoản phải thu tăng 65** — bán chịu nhiều, tiền chưa về. Lời 40 trên giấy, nhưng 65 tiền doanh thu còn kẹt ở khách hàng nên két giảm 25. Bài học: **có lãi ≠ có tiền**; phải quản lý thu hồi công nợ.

> 📝 **Tóm tắt bài học.**
> - Ngân sách = kế hoạch tài chính định lượng; hai loại: **hoạt động** (lời/lỗ, dồn tích) và **tiền mặt** (thanh khoản, tiền thực).
> - Cash budget: **số dư cuối = đầu + thu − chi**; cuối tháng này = đầu tháng sau; số dư âm ⇒ cần vay/hoãn chi.
> - **Doanh thu ghi nhận ≠ tiền thu về** do độ trễ thu tiền; khoảng lệch lãi vs tiền = mức tăng khoản phải thu.
> - **Variance = Thực tế − Ngân sách**; nhãn thuận lợi/bất lợi đọc theo bản chất khoản mục, không theo dấu.

---

## Bài tiếp theo

**Lesson 12 — Nhập môn định giá (Valuation Basics)** — [đi tới](../lesson-12-valuation-basics/): từ dòng tiền dự báo (chính là output của cash budget) chiết khấu về hiện tại để ước lượng *giá trị* của doanh nghiệp.

Minh họa tương tác: [visualization.html](./visualization.html) — nhập doanh thu, % thu ngay, chi phí từng tháng; xem số dư cuối kỳ tô đỏ khi âm và bảng variance thực tế vs ngân sách cập nhật theo thời gian thực.
`;
