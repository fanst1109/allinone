# Lesson 12 — Định giá cơ bản từ báo cáo tài chính (Valuation basics)

> **Bài cuối cùng của lĩnh vực Accounting.** Kế toán trả lời "công ty *đã* làm ăn thế nào" (quá khứ, qua báo cáo tài chính). Định giá dùng chính những con số đó để trả lời câu hỏi của nhà đầu tư: **"công ty này *đáng* bao nhiêu tiền?"** Đây là **cầu nối sang lĩnh vực [Finance](../../../Finance/index.html)**, nơi mỗi mảnh dưới đây được đào sâu.

## Mục tiêu học tập

- Hiểu **hai trường phái định giá**: (1) **bội số (multiples)** — so sánh tương đối; (2) **chiết khấu dòng tiền (DCF)** — tính giá trị nội tại.
- Đọc và tính được **P/E** và **EV/EBITDA** từ báo cáo tài chính; biết khi nào chúng đánh lừa.
- Nắm **giá trị thời gian của tiền** và *vì sao* dòng tiền tương lai phải **chiết khấu** về hiện tại.
- Chạy được một **DCF rút gọn**: dự báo FCF → chiết khấu từng năm → **terminal value** → cộng lại thành **Enterprise Value** → trừ nợ ròng ra **Equity value**.
- Xác nhận đẳng thức chốt: $\text{EV} = \sum \text{PV(FCF)} + \text{PV(terminal value)}$.

## Kiến thức tiền đề

- Biết đọc bảng cân đối và báo cáo kết quả kinh doanh — nền từ [Lesson 01: Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/) ($A = L + E$) và các bài Tầng 1.
- Số học lũy thừa và phân số. Không cần nền tài chính trước đó.

---

## 1. Vì sao lại "định giá"? Từ báo cáo tài chính tới một con số

Ba báo cáo tài chính (cân đối, kết quả kinh doanh, lưu chuyển tiền tệ) cho ta biết công ty *đã* có gì và làm ra gì. Nhưng khi bạn định **mua cổ phần**, câu hỏi thật là: *trả bao nhiêu thì hợp lý?* Định giá là bước biến dữ liệu kế toán thành **một con số giá trị**.

> 💡 **Trực giác.** Định giá một công ty giống định giá một **căn nhà cho thuê**. Có hai cách tự nhiên:
> - **So sánh với hàng xóm** — "nhà bên cạnh cùng khu, cùng diện tích bán 3 tỷ, nhà này tương đương nên cũng khoảng 3 tỷ." Đó là **bội số (multiples)**.
> - **Tính từ dòng tiền thuê** — "nhà này cho thuê 200 triệu/năm, mình muốn lời 8%/năm, vậy đáng $200/0.08 = 2.5$ tỷ." Đó là **chiết khấu dòng tiền (DCF)**.
>
> Cả hai đều hợp lý; dân chuyên nghiệp dùng **cả hai** rồi đối chiếu. Nếu hai cách ra gần nhau → tự tin hơn. Lệch nhau nhiều → phải hiểu vì sao.

Hai khái niệm giá trị cần phân biệt ngay:

- **Enterprise Value (EV) — giá trị doanh nghiệp**: giá trị của *toàn bộ hoạt động kinh doanh*, thuộc về **cả** chủ nợ **lẫn** cổ đông.
- **Equity value — giá trị vốn chủ**: phần *chỉ* thuộc về **cổ đông**, sau khi trả hết nợ. Đây là cái quyết định giá cổ phiếu.

Liên hệ (nối thẳng phương trình kế toán $E = A - L$ ở Lesson 01):

$$\text{Equity value} = \text{EV} - \text{Nợ ròng}$$

trong đó **Nợ ròng (net debt)** $= \text{Nợ vay} - \text{Tiền mặt}$.

> 📝 **Tóm tắt mục 1.**
> - Định giá = biến số liệu kế toán quá khứ thành ước lượng "công ty đáng bao nhiêu".
> - Hai trường phái: **bội số** (so sánh) và **DCF** (giá trị nội tại từ dòng tiền).
> - **EV** thuộc về cả chủ nợ + cổ đông; **Equity value** = EV − nợ ròng, chỉ thuộc cổ đông.

---

## 2. Cách 1 — Định giá tương đối bằng bội số (Multiples)

> 💡 **Trực giác.** Bội số là **"giá tính trên mỗi đơn vị lợi nhuận"** — y như giá nhà tính trên mỗi m². Nó không nói giá trị *tuyệt đối* đúng hay sai, chỉ nói công ty **đắt hay rẻ so với các công ty tương đương**. Nhanh, dễ, nhưng chỉ đúng khi "hàng xóm" thật sự giống nhau.

### 2.1 P/E — Giá trên lợi nhuận (Price-to-Earnings)

**(a) Là gì.** Tỷ lệ giữa giá một cổ phiếu và lợi nhuận trên mỗi cổ phiếu:

$$\text{P/E} = \frac{\text{Giá cổ phiếu}}{\text{EPS}}, \qquad \text{EPS} = \frac{\text{Lợi nhuận ròng}}{\text{Số cổ phiếu}}$$

Đọc là: "nhà đầu tư trả bao nhiêu đồng cho **mỗi 1 đồng lợi nhuận** hằng năm." P/E = 15 nghĩa là bỏ 15 đồng để mua 1 đồng lợi nhuận/năm.

**(b) Vì sao cần.** Nó chuẩn hóa giá theo quy mô lợi nhuận, cho phép **so sánh trực tiếp** hai công ty to nhỏ khác nhau. Không thể so "cổ phiếu A giá 60, B giá 30 nên A đắt gấp đôi" — phải quy về lợi nhuận.

**(c) Ví dụ số cụ thể (≥ 4, đa dạng):**

| Công ty | Giá cổ phiếu | EPS | P/E | Diễn giải |
|---------|-----------:|----:|----:|-----------|
| A | 60 | 4 | **15** | mức "bình thường" của thị trường |
| B | 90 | 3 | **30** | đắt — thị trường kỳ vọng tăng trưởng cao |
| C | 25 | 5 | **5** | rẻ — hoặc bị định giá thấp, hoặc lợi nhuận sắp giảm |
| D | 40 | −2 | **—** | **P/E vô nghĩa** khi công ty **lỗ** (EPS âm) |

**Dùng P/E để định giá tương đối** (walk-through số thật): giả sử ngành có P/E trung bình **15** và công ty A có EPS = 4. Giá "hợp lý" theo bội số ngành:

$$\text{Giá hợp lý} = \text{P/E ngành} \times \text{EPS} = 15 \times 4 = 60$$

Nếu A đang giao dịch ở giá 48 (P/E $= 48/4 = 12 < 15$) → **có vẻ rẻ** so với ngành.

> ⚠ **Lỗi thường gặp.**
> - **So P/E khác ngành.** Công nghệ P/E 35 vs ngân hàng P/E 9 — không có nghĩa ngân hàng "rẻ hơn". Kỳ vọng tăng trưởng khác nhau. Chỉ so trong **cùng ngành**.
> - **Quên EPS âm phá vỡ P/E.** Công ty lỗ có P/E âm hoặc vô nghĩa — dùng chỉ số khác (EV/EBITDA, P/S).
> - **P/E cao ≠ luôn đắt.** Có thể phản ánh tăng trưởng tương lai lớn. P/E chỉ là *ảnh chụp một khoảnh khắc*.

### 2.2 EV/EBITDA — Giá trị doanh nghiệp trên EBITDA

**(a) Là gì.** **EBITDA** = Lợi nhuận **trước** Lãi vay, Thuế, Khấu hao (Earnings Before Interest, Taxes, Depreciation & Amortization) — thước đo "lãi vận hành thô", chưa bị ảnh hưởng bởi cách vay nợ, thuế và chính sách khấu hao.

$$\text{EV/EBITDA} = \frac{\text{Enterprise Value}}{\text{EBITDA}}$$

**(b) Vì sao cần (thay vì chỉ dùng P/E).** P/E dựa trên lợi nhuận ròng — bị *bóp méo* bởi cấu trúc nợ (chi phí lãi vay) và thuế. EV/EBITDA nhìn ở tầng **toàn doanh nghiệp**, **trung tính với cách tài trợ**, nên so sánh công bằng giữa công ty nợ nhiều và công ty ít nợ.

**(c) Ví dụ số cụ thể:**

| Công ty | EBITDA | EV/EBITDA ngành | ⇒ EV | Nợ ròng | ⇒ Equity value |
|---------|-------:|:--------------:|-----:|--------:|--------------:|
| P | 200 | 7 | $200 \times 7 = 1{,}400$ | 300 | $1{,}400 - 300 = 1{,}100$ |
| Q | 50 | 8 | $50 \times 8 = 400$ | 120 | $400 - 120 = 280$ |
| R | 500 | 6 | $500 \times 6 = 3{,}000$ | 1,000 | $3{,}000 - 1{,}000 = 2{,}000$ |
| S | 80 | 10 | $80 \times 10 = 800$ | −50 (tiền > nợ) | $800 - (-50) = 850$ |

Chú ý công ty S có **tiền mặt nhiều hơn nợ** → nợ ròng âm → Equity value **lớn hơn** EV.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Bội số ngành lấy ở đâu?"* → Trung vị của các công ty cùng ngành đang niêm yết (comparable companies), hoặc từ các thương vụ M&A gần đây.
> - *"Vì sao EV/EBITDA thường ưa dùng hơn P/E?"* → Vì trung tính với nợ và thuế; cũng dùng được cho công ty lỗ ròng nhưng EBITDA vẫn dương.
> - *"Bội số có cho biết giá trị đúng không?"* → Không. Nó chỉ nói *tương đối* so với nhóm so sánh. Nếu cả ngành đang bong bóng, bội số cao dẫn bạn định giá quá cao theo. Đây là lý do cần DCF để kiểm tra độc lập.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Cổ phiếu giá 72, EPS = 6. P/E bằng bao nhiêu? Nếu ngành P/E = 10 thì đắt hay rẻ?
> 2. EBITDA = 150, EV/EBITDA ngành = 8, nợ ròng = 200. Equity value bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $\text{P/E} = 72/6 = 12 > 10$ → **đắt hơn** trung bình ngành.
> 2. $\text{EV} = 150 \times 8 = 1{,}200$; $\text{Equity} = 1{,}200 - 200 = \mathbf{1{,}000}$.
> </details>

> 📝 **Tóm tắt mục 2.**
> - **P/E** = Giá / EPS: trả bao nhiêu cho mỗi đồng lợi nhuận. Vô nghĩa khi lỗ.
> - **EV/EBITDA**: nhìn toàn doanh nghiệp, trung tính với nợ & thuế.
> - Bội số là định giá **tương đối** — chỉ đúng khi nhóm so sánh thật sự giống nhau và cùng ngành.
> - Từ bội số ra Equity: nếu là bội số EV (EV/EBITDA), nhớ **trừ nợ ròng**.

---

## 3. Giá trị thời gian của tiền & vì sao phải chiết khấu

Trước khi làm DCF, cần một ý tưởng nền: **1 đồng hôm nay đáng hơn 1 đồng năm sau.**

> 💡 **Trực giác.** Ba lý do khiến tiền tương lai "kém giá" hơn:
> 1. **Sinh lời được**: 100 đồng hôm nay gửi lãi 10% → 110 đồng sau 1 năm. Vậy 110 đồng năm sau chỉ *tương đương* 100 đồng hôm nay.
> 2. **Lạm phát**: giá cả tăng, cùng số tiền mua được ít hàng hơn trong tương lai.
> 3. **Rủi ro**: tiền hứa trả trong tương lai có thể không về đủ.

**Chiết khấu** là phép quy đổi ngược: đưa một khoản tiền tương lai về **giá trị hiện tại (present value, PV)**:

$$\text{PV} = \frac{\text{Dòng tiền năm } t}{(1 + r)^t}$$

$r$ là **tỷ suất chiết khấu**.

**(a) Là gì — $r$ / WACC.** $r$ chính là **chi phí vốn bình quân gia quyền (WACC)**: mức sinh lời tối thiểu mà công ty phải tạo ra để làm hài lòng **cả chủ nợ (lãi vay) lẫn cổ đông (kỳ vọng lợi nhuận)**.

**(b) Vì sao cần.** Nó là "chi phí cơ hội của vốn". $r$ càng cao (rủi ro càng lớn) → tương lai bị chiết khấu càng mạnh → giá trị hiện tại càng thấp.

**(c) Walk-through số thật:**

- Nhận **110** sau **1 năm**, $r = 10\%$: $\text{PV} = 110 / 1.10 = \mathbf{100}$. Nghĩa là 100 đồng hôm nay "bằng" 110 đồng sau 1 năm.
- Nhận **121** sau **2 năm**, $r = 10\%$: $\text{PV} = 121 / 1.10^2 = 121/1.21 = \mathbf{100}$.
- Cùng **100** nhưng nhận sau **5 năm**, $r = 12\%$: $\text{PV} = 100 / 1.12^5 = 100 / 1.7623 = \mathbf{56.7}$.
- Cùng **100** sau 5 năm nhưng $r = 20\%$: $\text{PV} = 100 / 1.20^5 = 100/2.4883 = \mathbf{40.2}$ — $r$ cao hơn → PV thấp hơn hẳn.

> ⚠ **Lỗi thường gặp.** Cộng thẳng dòng tiền các năm rồi coi đó là "giá trị". Sai — phải chiết khấu từng năm trước khi cộng, vì mỗi năm có "tỷ giá thời gian" khác nhau.

> 📝 **Tóm tắt mục 3.**
> - Tiền tương lai < tiền hiện tại (sinh lời, lạm phát, rủi ro).
> - $\text{PV} = \text{CF}_t / (1+r)^t$. Hệ số $1/(1+r)^t$ gọi là **hệ số chiết khấu**.
> - $r$ (WACC) là chi phí vốn; $r$ ↑ → giá trị ↓ (đây là "cần gạt" nhạy nhất của định giá).
> - Giá trị thời gian của tiền học kỹ ở [Finance · Time value of money](../../../Finance/01-PersonalFinance/lesson-01-time-value-money/).

---

## 4. Cách 2 — Chiết khấu dòng tiền (DCF)

> 💡 **Trực giác.** Giá trị nội tại của một công ty = **tổng tất cả tiền mặt tự do nó sẽ tạo ra trong tương lai, quy về hôm nay**. DCF làm đúng ba việc: (1) *dự báo* dòng tiền, (2) *chiết khấu* mỗi năm về hiện tại, (3) *cộng* lại. Vấn đề "tương lai vô hạn" được xử lý bằng **terminal value**.

### 4.1 FCF — Dòng tiền tự do (Free Cash Flow)

**(a) Là gì.** Tiền mặt còn lại sau khi công ty đã trả chi phí vận hành và đầu tư cần thiết (capex) — tiền "tự do" có thể chia cho chủ nợ và cổ đông.

$$\text{FCF} = \text{EBIT} \times (1 - \text{thuế}) + \text{Khấu hao} - \text{Capex} - \Delta\text{Vốn lưu động}$$

**(b) Vì sao cần (thay vì lợi nhuận kế toán).** Lợi nhuận ròng bị "nhiễu" bởi khấu hao và bút toán dồn tích (accrual) — không phải tiền thật. Định giá phải dựa trên **tiền thật** vào túi, nên dùng FCF.

**(c) Ví dụ số:** EBIT = 150, thuế 20% → $150 \times 0.8 = 120$; cộng khấu hao 40 = 160; trừ capex 50 = 110; trừ tăng vốn lưu động 10 = **FCF = 100**. Ta dùng FCF₀ = 100 làm điểm xuất phát cho walk-through dưới đây.

### 4.2 Terminal value — gộp phần tương lai vô hạn

Không thể dự báo FCF từng năm mãi mãi. Sau **giai đoạn dự báo chi tiết** (ví dụ 5 năm), ta gộp *toàn bộ* dòng tiền từ năm 6 trở đi thành một con số duy nhất tại **cuối năm 5**, giả định FCF tăng đều mãi mãi ở tốc độ $g$ (mô hình tăng trưởng vĩnh viễn Gordon):

$$\text{TV}_N = \frac{\text{FCF}_N \times (1 + g)}{r - g} \qquad (\text{cần } r > g)$$

**(a) Là gì.** Giá trị, *tại thời điểm cuối năm N*, của tất cả FCF từ năm $N+1$ đến vô hạn.

**(b) Vì sao cần điều kiện $r > g$.** Nếu $g \ge r$, mẫu số $\le 0$ → công thức vô nghĩa (dòng tiền tăng nhanh hơn tốc độ chiết khấu → giá trị "vô hạn", phi thực tế). $g$ terminal phải nhỏ — thường quanh tốc độ tăng trưởng dài hạn của nền kinh tế (2–4%).

Terminal value này vẫn nằm ở "cuối năm N" nên phải **chiết khấu tiếp** về hiện tại: $\text{PV(TV)} = \text{TV}_N / (1+r)^N$.

> Công thức Gordon giống hệt mô hình chiết khấu cổ tức ở [Finance · Định giá cổ phiếu](../../../Finance/02-Investing/lesson-02-stock-valuation/).

### 4.3 Walk-through DCF số thật đầy đủ

**Giả định:** FCF₀ = 100 (tỷ đồng), tăng trưởng giai đoạn $g_{gd} = 8\%$/năm, dự báo $N = 5$ năm, WACC $r = 12\%$, tăng trưởng terminal $g = 3\%$, nợ ròng = 150.

**Bước 1 — dự báo FCF và chiết khấu từng năm** ($\text{FCF}_t = 100 \times 1.08^t$, hệ số CK $= 1/1.12^t$):

| Năm $t$ | FCF$_t$ | Hệ số CK $1/1.12^t$ | PV = FCF × hệ số |
|:---:|-------:|:------------------:|-----------------:|
| 1 | 108.00 | 0.8929 | 96.43 |
| 2 | 116.64 | 0.7972 | 92.98 |
| 3 | 125.97 | 0.7118 | 89.66 |
| 4 | 136.05 | 0.6355 | 86.46 |
| 5 | 146.93 | 0.5674 | 83.37 |
| | | **Σ PV(FCF)** | **448.91** |

**Bước 2 — terminal value** (cuối năm 5):

$$\text{TV}_5 = \frac{146.93 \times (1 + 0.03)}{0.12 - 0.03} = \frac{151.34}{0.09} = 1{,}681.56$$

Chiết khấu về hiện tại (dùng hệ số năm 5 = 0.5674):

$$\text{PV(TV)} = 1{,}681.56 \times 0.5674 = 954.16$$

**Bước 3 — Enterprise Value** = tổng hai phần:

$$\boxed{\text{EV} = \underbrace{448.91}_{\sum \text{PV(FCF)}} + \underbrace{954.16}_{\text{PV(TV)}} = 1{,}403.07}$$

**Bước 4 — Equity value** = EV − nợ ròng:

$$\text{Equity value} = 1{,}403.07 - 150 = 1{,}253.07$$

> Ghi chú làm tròn: ở đây mỗi dòng được làm tròn về 2 chữ số nên tổng ra 1.403,07. [Visualization](./visualization.html) tính từ số đầy đủ nên hiển thị EV ≈ **1.403,08** (chênh 0,01 tỷ) — đúng như kỳ vọng, không phải lỗi.

> ⚠ **Lỗi thường gặp — terminal value nuốt mọi thứ.** Trong ví dụ trên, PV(TV) = 954 chiếm **68%** của EV; phần dự báo 5 năm chỉ 32%. Kết luận: **kết quả DCF cực kỳ nhạy với $g$ và $r$ trong terminal value**. Đổi $r$ từ 12% xuống 10% (giữ nguyên phần còn lại) làm EV nhảy vọt. Đây chính là lý do dân chuyên nghiệp không tin một con số DCF duy nhất mà luôn chạy **dải độ nhạy** — điều bạn kéo thử được ngay trong [visualization](./visualization.html).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao chỉ dự báo 5 năm mà không 20 năm?"* → Càng xa càng đoán mò; và tiền năm 20 chiết khấu về gần như bằng 0. 5–10 năm chi tiết + terminal value là chuẩn.
> - *"$r$ lấy con số nào?"* → WACC của công ty, ước lượng từ CAPM (chi phí vốn cổ phần) + chi phí nợ. Học kỹ ở [Finance · CAPM & beta](../../../Finance/02-Investing/lesson-06-capm-beta/).
> - *"DCF và bội số cái nào đúng?"* → Không cái nào tuyệt đối. DCF cho giá trị *nội tại* dựa trên giả định của bạn; bội số cho giá trị *thị trường tương đối*. Dùng cả hai và đối chiếu.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. FCF năm 5 = 146.93, $r = 12\%$, $g = 3\%$. Terminal value cuối năm 5 bằng bao nhiêu?
> 2. Nếu nợ ròng đổi từ 150 thành 400 (giữ EV = 1,403.07), Equity value bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $\text{TV} = 146.93 \times 1.03 / (0.12 - 0.03) = 151.34/0.09 = \mathbf{1{,}681.56}$.
> 2. $\text{Equity} = 1{,}403.07 - 400 = \mathbf{1{,}003.07}$. Nợ nhiều hơn → phần còn lại cho cổ đông ít đi.
> </details>

> 📝 **Tóm tắt mục 4.**
> - DCF định giá bằng **tiền thật tương lai (FCF) quy về hôm nay**.
> - Quy trình: dự báo FCF → chiết khấu từng năm → cộng → thêm PV(terminal value).
> - $\text{TV}_N = \text{FCF}_N (1+g)/(r-g)$, cần $r > g$; rồi chiết khấu về hiện tại.
> - **$\text{EV} = \sum \text{PV(FCF)} + \text{PV(TV)}$**; **Equity value = EV − nợ ròng**.
> - Terminal value thường chiếm phần lớn EV → kết quả rất nhạy với $r$ và $g$.

---

## 5. So sánh hai cách — khi nào dùng cái nào

| Tiêu chí | Bội số (Multiples) | DCF |
|----------|--------------------|-----|
| Bản chất | Tương đối (so nhóm) | Nội tại (từ dòng tiền) |
| Dữ liệu cần | 1 chỉ số + nhóm so sánh | Dự báo FCF nhiều năm + $r$, $g$ |
| Tốc độ | Nhanh, "trên phong bì" | Chậm, nhiều giả định |
| Điểm yếu | Sai nếu cả ngành lệch giá | Cực nhạy với $r$, $g$; "rác vào → rác ra" |
| Dùng tốt khi | So sánh nhanh, nhiều công ty cùng ngành | Phân tích sâu 1 công ty, dòng tiền ổn định |

Thực hành chuẩn: **chạy cả hai, đối chiếu**. Trong ví dụ ở mục 4, DCF cho EV ≈ 1,403. Nếu EBITDA của công ty ≈ 200 thì EV/EBITDA hàm ý $\approx 1{,}403/200 = 7.0$ — nếu ngành cũng quanh 7, hai phương pháp **đồng thuận** → tự tin. Viz cho phép bạn đặt cạnh nhau con số DCF và con số bội số.

---

## 6. Bài tập

**Bài 1 (P/E — cơ bản).** Công ty X có giá cổ phiếu 48, EPS = 6. Ngành có P/E trung bình 12.
(a) Tính P/E của X. (b) X đắt hay rẻ so với ngành? (c) Nếu định giá X theo P/E ngành, giá "hợp lý" mỗi cổ phiếu là bao nhiêu?

**Bài 2 (EV/EBITDA → Equity).** Công ty Y có EBITDA = 250, nợ ròng = 400, bội số EV/EBITDA ngành = 7, số cổ phiếu 100 triệu.
Tính Enterprise Value, Equity value, và giá hợp lý mỗi cổ phiếu.

**Bài 3 (DCF rút gọn — 3 năm).** FCF năm gần nhất = 80, tăng trưởng giai đoạn 10%/năm trong 3 năm, $r = 10\%$, $g$ terminal = 4%, nợ ròng = 200.
Tính PV từng năm, terminal value, PV(TV), Enterprise Value và Equity value. **Xác nhận** $\text{EV} = \sum \text{PV(FCF)} + \text{PV(TV)}$.

---

## 7. Lời giải chi tiết

**Bài 1.** Dùng $\text{P/E} = \text{Giá}/\text{EPS}$ và định giá $= \text{P/E ngành} \times \text{EPS}$.
- (a) $\text{P/E của X} = 48 / 6 = \mathbf{8}$.
- (b) $8 < 12$ (ngành) → X **rẻ hơn** trung bình ngành (có thể bị định giá thấp, hoặc thị trường lo lợi nhuận sắp giảm).
- (c) Giá hợp lý $= 12 \times 6 = \mathbf{72}$/cổ phiếu. Nếu tin P/E ngành áp dụng được cho X, giá hiện tại 48 đang thấp hơn ~33%.

**Bài 2.** Cách tiếp cận: bội số EV/EBITDA cho ra **EV**, trừ nợ ròng ra **Equity**, chia số cổ phiếu ra giá.
- $\text{EV} = \text{EBITDA} \times \text{bội số} = 250 \times 7 = \mathbf{1{,}750}$.
- $\text{Equity value} = \text{EV} - \text{nợ ròng} = 1{,}750 - 400 = \mathbf{1{,}350}$.
- Giá mỗi cổ phiếu $= 1{,}350 / 100 = \mathbf{13.5}$ (nếu Equity tính bằng tỷ đồng và 100 triệu cổ phiếu → 13,500 đồng/cp).
- Kiểm tra logic: bội số áp lên EBITDA (tầng doanh nghiệp) nên **phải** trừ nợ trước khi ra phần cổ đông — quên bước này là lỗi phổ biến.

**Bài 3.** Cách tiếp cận: dự báo FCF, chiết khấu từng năm, tính terminal value, cộng lại.

Dự báo và chiết khấu ($\text{FCF}_t = 80 \times 1.10^t$, hệ số $= 1/1.10^t$):

| Năm | FCF | Hệ số CK | PV |
|:---:|----:|:-------:|---:|
| 1 | 88.00 | 0.9091 | 80.00 |
| 2 | 96.80 | 0.8264 | 80.00 |
| 3 | 106.48 | 0.7513 | 80.00 |
| | | **Σ PV(FCF)** | **240.00** |

(Chú ý điểm đặc biệt: vì $g_{gd} = r = 10\%$, mỗi năm PV đúng bằng FCF₀ = 80 → tổng = 240. Đây là minh họa đẹp: khi tăng trưởng đúng bằng tỷ suất chiết khấu, "kéo lên" và "chiết khấu xuống" triệt tiêu nhau.)

Terminal value cuối năm 3:

$$\text{TV}_3 = \frac{106.48 \times 1.04}{0.10 - 0.04} = \frac{110.74}{0.06} = 1{,}845.65$$

$$\text{PV(TV)} = 1{,}845.65 \times 0.7513 = 1{,}386.67$$

Cộng lại:

$$\text{EV} = 240.00 + 1{,}386.67 = \mathbf{1{,}626.67}$$

$$\text{Equity value} = 1{,}626.67 - 200 = \mathbf{1{,}426.67}$$

**Xác nhận** $\text{EV} = \sum \text{PV(FCF)} + \text{PV(TV)} = 240.00 + 1{,}386.67 = 1{,}626.67$ ✓.

Nhận xét: PV(TV) = 1,386.67 chiếm **85%** của EV — càng cho thấy terminal value (và các giả định $r$, $g$ đằng sau nó) chi phối kết quả. Đổi $g$ terminal từ 4% lên 5% sẽ đẩy EV lên đáng kể; bạn kiểm chứng được bằng slider trong viz.

> 📝 **Tóm tắt bài học.**
> - Hai trường phái: **bội số** (P/E, EV/EBITDA — tương đối) và **DCF** (giá trị nội tại từ FCF chiết khấu).
> - P/E = Giá/EPS; EV/EBITDA trung tính với nợ/thuế. Chỉ so trong cùng ngành.
> - Tiền tương lai phải chiết khấu: $\text{PV} = \text{CF}_t/(1+r)^t$; $r$ = WACC.
> - DCF: dự báo FCF → chiết khấu → terminal value → **$\text{EV} = \sum \text{PV(FCF)} + \text{PV(TV)}$** → **Equity = EV − nợ ròng**.
> - Terminal value thường chiếm phần lớn EV → kết quả rất nhạy với $r$ và $g$; luôn chạy độ nhạy.

---

## Kết thúc — cầu nối sang Finance

Đây là **bài học cuối cùng của lĩnh vực Accounting**. Bạn đã đi từ phương trình kế toán nền tảng ($A = L + E$) tới việc biến ba báo cáo tài chính thành **một con số giá trị**. Nhưng ở đây ta mới chạm phần *cơ bản* của định giá — mỗi mảnh dưới đây được đào sâu ở lĩnh vực **[Finance](../../../Finance/index.html)**:

- **Tỷ suất chiết khấu $r$ đến từ đâu?** → **CAPM & beta**, chi phí vốn cổ phần, cách ghép thành **WACC**: [Finance · CAPM & beta](../../../Finance/02-Investing/lesson-06-capm-beta/).
- **Định giá cổ phiếu chuyên sâu** (mô hình Gordon, dòng cổ tức, P/E forward): [Finance · Định giá cổ phiếu](../../../Finance/02-Investing/lesson-02-stock-valuation/).
- **Giá trị thời gian của tiền** (FV/PV, annuity, quy tắc 72): [Finance · Time value of money](../../../Finance/01-PersonalFinance/lesson-01-time-value-money/).
- **Quyền chọn (options) và định giá phái sinh** — khi giá trị phụ thuộc quyền chọn, không chỉ dòng tiền kỳ vọng: [Finance · Quyền chọn](../../../Finance/03-Quantitative/lesson-02-options/).
- **Rủi ro định lượng** (VaR, Monte Carlo) và **đọc báo cáo tài chính dưới góc nhìn nhà đầu tư**: [Finance · Tầng Định lượng](../../../Finance/03-Quantitative/index.html).

➡ **Bước tiếp theo:** mở [trang chính lĩnh vực Finance](../../../Finance/index.html) để tiếp tục lộ trình.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo thử FCF, tăng trưởng, WACC và $g$ terminal; xem PV từng năm, terminal value, Enterprise Value và Equity value cập nhật tức thời, và so sánh với định giá theo bội số.
