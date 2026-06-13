// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/01-PersonalFinance/lesson-01-time-value-money/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Giá trị thời gian của tiền & Lãi kép (Time Value of Money & Compound Interest)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu vì sao **1 đồng hôm nay đáng giá hơn 1 đồng ngày mai** — khái niệm nền tảng nhất của toàn bộ tài chính: **giá trị thời gian của tiền (time value of money, TVM)**.
- Phân biệt **lãi đơn (simple interest)** và **lãi kép (compound interest)**, và thấy bằng số vì sao lãi kép "ăn" lãi đơn theo thời gian.
- Tính **giá trị tương lai (future value, FV)** và **giá trị hiện tại (present value, PV)** của một khoản tiền.
- Hiểu tác động của **tần suất ghép lãi (compounding frequency)**: năm → tháng → ngày → liên tục.
- Dùng **Quy tắc 72 (Rule of 72)** để nhẩm nhanh thời gian nhân đôi tiền.
- Tính giá trị của một **dòng tiền đều (annuity)** — nền tảng cho tiết kiệm định kỳ và trả góp.

## Kiến thức tiền đề

- **Lũy thừa & hàm mũ** (cốt lõi của bài này): [\`../../../Math/index.html\`](../../../Math/index.html) — biểu thức $(1+r)^n$ và quy tắc $a^m \\cdot a^n = a^{m+n}$.
- **Chi phí cơ hội (opportunity cost)**: [\`../../../Economics/index.html\`](../../../Economics/index.html) — vì sao "để tiền không" cũng là một mất mát.
- Số mũ, logarit cơ bản (cho Quy tắc 72 và giải ngược thời gian).

---

## 1. Vì sao 1 đồng hôm nay > 1 đồng ngày mai (Time Value of Money)

> 💡 **Trực giác / Hình dung.** Ai đó hỏi vay bạn 10 triệu, hứa trả **đúng 10 triệu** sau 5 năm. Bạn có thấy thiệt không? Có. Vì nếu giữ 10 triệu đó, bạn đã có thể: (1) gửi ngân hàng lấy lãi, (2) mua đồ trước khi giá tăng, (3) chắc chắn cầm tiền trong tay thay vì chờ đợi rủi ro. Cùng một con số "10 triệu", nhưng **thời điểm** nhận khác nhau thì **giá trị** khác nhau. Đó là giá trị thời gian của tiền.

**Định nghĩa — Giá trị thời gian của tiền (TVM):**

- **(a) Là gì** — nguyên lý nói rằng một khoản tiền có sẵn **bây giờ** có giá trị lớn hơn cùng khoản tiền đó nhận **trong tương lai**, vì tiền hiện tại có thể được đầu tư để sinh lời.
- **(b) Vì sao cần** — không có TVM thì không thể so sánh các khoản tiền ở những thời điểm khác nhau (lương tháng này vs tiền thưởng 3 năm sau, mua trả góp vs trả thẳng). TVM cho ta một "tỷ giá quy đổi" giữa quá khứ, hiện tại và tương lai.
- **(c) Ví dụ số** — Với lãi suất 8%/năm, 100 triệu hôm nay sẽ thành 108 triệu sau 1 năm. Ngược lại, 108 triệu nhận sau 1 năm chỉ "đáng" 100 triệu hôm nay. Vậy "100 triệu bây giờ" và "108 triệu sau 1 năm" là **tương đương về giá trị**.

**Ba lý do tiền hiện tại đáng giá hơn:**

| Lý do | Giải thích | Ví dụ |
|---|---|---|
| **Chi phí cơ hội** | Tiền giữ được có thể đầu tư sinh lời ngay | 100tr gửi 8% → +8tr/năm bỏ lỡ nếu chờ |
| **Lạm phát** | Giá cả tăng → cùng số tiền mua được ít hơn sau này | 1 tô phở 50k hôm nay, 60k sau vài năm |
| **Rủi ro / bất định** | "Chắc chắn cầm tiền" > "lời hứa trả sau" | Người vay có thể vỡ nợ, hoàn cảnh đổi |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu lạm phát = 0 và không rủi ro thì tiền tương lai có bằng tiền hiện tại không?"* — Vẫn không, miễn là tồn tại **cơ hội đầu tư sinh lời dương** (lãi suất thực > 0). Chừng nào bạn còn có thể cho vay/đầu tư để nhận thêm, tiền hiện tại vẫn nhỉnh hơn.
> - *"Có khi nào tiền tương lai đáng giá hơn không?"* — Trong môi trường **lãi suất âm** (hiếm, từng xảy ra ở châu Âu, Nhật), giữ tiền mặt bị "phạt". Nhưng đây là ngoại lệ; mặc định lãi suất dương.

> 🔁 **Dừng lại tự kiểm tra.** Lãi suất 10%/năm. Bạn chọn nhận 100 triệu bây giờ hay 105 triệu sau 1 năm?
> <details><summary>Đáp án</summary>Nhận 100 triệu bây giờ. Vì 100tr đầu tư 10% → 110tr sau 1 năm > 105tr. "100tr bây giờ" giá trị hơn "105tr sau 1 năm".</details>

---

## 2. Lãi đơn vs Lãi kép (Simple vs Compound Interest)

> 💡 **Trực giác.** **Lãi đơn**: mỗi năm bạn chỉ nhận lãi trên **số vốn gốc ban đầu** — lãi không sinh thêm lãi. **Lãi kép**: lãi nhận được sẽ **nhập vào vốn**, nên năm sau bạn nhận lãi trên cả (gốc + lãi cũ). Lãi kép là "lãi đẻ ra lãi" — đây chính là cỗ máy làm giàu (và cũng là cái bẫy của nợ).

**Định nghĩa — Lãi đơn:**

- **(a) Là gì** — lãi tính chỉ trên vốn gốc $P$, cố định mỗi kỳ.
- **(b) Vì sao tồn tại** — đơn giản, dùng cho vài sản phẩm vay ngắn hạn, trái phiếu trả coupon cố định.
- **(c) Công thức:** $A = P(1 + r \\cdot t)$, với $r$ = lãi suất mỗi kỳ, $t$ = số kỳ.

**Định nghĩa — Lãi kép:**

- **(a) Là gì** — lãi mỗi kỳ được cộng vào vốn, kỳ sau tính lãi trên tổng mới.
- **(b) Vì sao quan trọng** — gần như **mọi** sản phẩm tài chính thực tế (gửi tiết kiệm, đầu tư, vay tín dụng) dùng lãi kép. Hiểu nó là hiểu cách tiền lớn lên theo cấp số nhân.
- **(c) Công thức:** $A = P(1 + r)^t$.

**Walk-through bằng số thật (verify) — $P = 100$ triệu, $r = 10\\%$/năm:**

| Cuối năm | Lãi đơn | Lãi kép |
|---|---|---|
| 0 | 100,00 | 100,00 |
| 1 | $100 + 10 = 110{,}00$ | $100 \\times 1{,}1 = 110{,}00$ |
| 2 | $100 + 20 = 120{,}00$ | $110 \\times 1{,}1 = 121{,}00$ |
| 3 | $100 + 30 = 130{,}00$ | $121 \\times 1{,}1 = 133{,}10$ |
| 10 | $100 + 100 = 200{,}00$ | $100 \\times 1{,}1^{10} = 259{,}37$ |
| 30 | $100 + 300 = 400{,}00$ | $100 \\times 1{,}1^{30} = 1744{,}94$ |

Kiểm chứng năm 2 lãi kép: $100 \\times 1{,}1^2 = 100 \\times 1{,}21 = 121$ ✓. Năm 2, lãi kép hơn lãi đơn đúng **1 triệu** — đó là "lãi của 10 triệu lãi năm 1" ($10 \\times 10\\% = 1$). Khoảng cách này phình to theo thời gian: sau 30 năm lãi kép cho **1745 triệu** so với 400 triệu của lãi đơn — gấp hơn 4 lần.

> ⚠ **Lỗi thường gặp.** Nghĩ "lãi 10%/năm trong 30 năm = 300% tổng cộng". Đó là **lãi đơn**. Với lãi kép, 10% trong 30 năm cho tổng tăng **1644%** ($1{,}1^{30} = 17{,}45$ lần). Đừng bao giờ nhân thẳng lãi suất với số năm khi có ghép lãi.

> 🔁 **Dừng lại tự kiểm tra.** $P = 50$ triệu, lãi kép $8\\%$/năm, sau 2 năm còn bao nhiêu?
> <details><summary>Đáp án</summary>$50 \\times 1{,}08^2 = 50 \\times 1{,}1664 = 58{,}32$ triệu.</details>

---

## 3. Giá trị tương lai (Future Value, FV)

> 💡 **Trực giác.** FV trả lời câu hỏi: *"Khoản tiền tôi có hôm nay sẽ phình thành bao nhiêu trong tương lai nếu để nó sinh lời?"* Đây là chiều **đi tới** của thời gian.

**Định nghĩa — Giá trị tương lai (FV):**

- **(a) Là gì** — giá trị của một khoản tiền hiện tại $PV$ sau $n$ kỳ, với lãi kép suất $r$/kỳ.
- **(b) Vì sao cần** — để biết khoản tiết kiệm/đầu tư hôm nay đáng bao nhiêu lúc nghỉ hưu, hay khoản vay phình tới đâu nếu không trả.
- **(c) Công thức:**

$$FV = PV \\cdot (1 + r)^n$$

**4 ví dụ số (verify):**

| PV | r | n | $FV = PV(1+r)^n$ |
|---|---|---|---|
| 100 tr | 6% | 5 | $100 \\times 1{,}06^5 = 100 \\times 1{,}338 = 133{,}8$ tr |
| 20 tr | 12% | 10 | $20 \\times 1{,}12^{10} = 20 \\times 3{,}106 = 62{,}1$ tr |
| 500 tr | 4% | 20 | $500 \\times 1{,}04^{20} = 500 \\times 2{,}191 = 1095{,}6$ tr |
| 1 tr | 15% | 30 | $1 \\times 1{,}15^{30} = 66{,}21$ tr |

### 3.1 Tần suất ghép lãi (Compounding frequency)

Nếu lãi được ghép $m$ lần mỗi năm (tháng: $m=12$, ngày: $m=365$) với **lãi suất danh nghĩa năm** $r$, thì sau $t$ năm:

$$FV = PV\\left(1 + \\frac{r}{m}\\right)^{m t}$$

Càng ghép nhiều lần, FV càng lớn (lãi sinh lãi sớm hơn) — nhưng phần tăng thêm **giảm dần** và hội tụ về giới hạn **ghép lãi liên tục (continuous compounding)**:

$$FV = PV \\cdot e^{r t}$$

**Walk-through bằng số (verify) — $PV = 100$ triệu, $r = 12\\%$, $t = 1$ năm:**

| Tần suất ghép | $m$ | $FV = 100(1 + 0{,}12/m)^{m}$ |
|---|---|---|
| Năm | 1 | $100 \\times 1{,}12 = 112{,}00$ |
| Quý | 4 | $100 \\times (1{,}03)^4 = 112{,}55$ |
| Tháng | 12 | $100 \\times (1{,}01)^{12} = 112{,}68$ |
| Ngày | 365 | $100 \\times (1{,}000329)^{365} = 112{,}747$ |
| Liên tục | $\\infty$ | $100 \\times e^{0{,}12} = 112{,}750$ |

→ Chuyển từ ghép năm sang ghép tháng tăng được ~0,68 triệu; nhưng từ ghép ngày lên liên tục gần như không thêm gì. Đây là lý do "ghép liên tục" chỉ là một tiện ích toán học, không phải phép màu.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vậy lãi suất ngân hàng ghi trên hợp đồng là loại nào?"* — Thường là **lãi suất danh nghĩa năm** ($r$). Con số bạn thực sự nhận sau ghép lãi gọi là **APY/lãi suất hiệu dụng** — sẽ học kỹ ở Lesson 03.
> - *"$e$ ở đâu ra?"* — $e \\approx 2{,}71828$ là giới hạn của $(1 + 1/m)^m$ khi $m \\to \\infty$. Đặt $\\frac{r}{m} = \\frac{1}{k}$ rồi cho $m \\to \\infty$ sẽ ra $e^r$.

> ⚠ **Lỗi thường gặp.** Lẫn lộn "lãi suất mỗi kỳ" với "lãi suất năm". Nếu ghép tháng, lãi mỗi kỳ là $r/12$ **không phải** $r$. Mũ cũng phải là số kỳ ($m \\cdot t$), không phải số năm.

> 🔁 **Dừng lại tự kiểm tra.** $100$ triệu, $6\\%$/năm ghép **tháng**, sau 2 năm?
> <details><summary>Đáp án</summary>$100 \\times (1 + 0{,}06/12)^{12 \\times 2} = 100 \\times 1{,}005^{24} = 100 \\times 1{,}1272 = 112{,}72$ triệu.</details>

---

## 4. Giá trị hiện tại (Present Value, PV) & Chiết khấu (Discounting)

> 💡 **Trực giác.** PV là chiều **đi ngược** của FV: *"Một khoản tiền tôi sẽ nhận trong tương lai đáng bao nhiêu nếu quy về hôm nay?"* Quá trình quy ngược này gọi là **chiết khấu (discounting)** — ta "trừ bớt" phần lãi mà lẽ ra tiền đã sinh ra.

**Định nghĩa — Giá trị hiện tại (PV):**

- **(a) Là gì** — giá trị hôm nay của một khoản tiền $FV$ sẽ nhận sau $n$ kỳ.
- **(b) Vì sao cần** — để so sánh các khoản tiền ở thời điểm khác nhau trên cùng một thước đo ("hôm nay"). Đây là công cụ định giá **mọi** tài sản: cổ phiếu, trái phiếu, dự án đầu tư đều là "tổng PV của các dòng tiền tương lai".
- **(c) Công thức** (đảo ngược FV):

$$PV = \\frac{FV}{(1 + r)^n}$$

$r$ ở đây gọi là **lãi suất chiết khấu (discount rate)** — thể hiện chi phí cơ hội + rủi ro của bạn.

**4 ví dụ số (verify):**

| FV | r | n | $PV = FV/(1+r)^n$ |
|---|---|---|---|
| 110 tr | 10% | 1 | $110 / 1{,}1 = 100{,}0$ tr |
| 200 tr | 8% | 5 | $200 / 1{,}08^5 = 200/1{,}469 = 136{,}1$ tr |
| 1000 tr | 6% | 10 | $1000 / 1{,}06^{10} = 1000/1{,}791 = 558{,}4$ tr |
| 50 tr | 15% | 20 | $50 / 1{,}15^{20} = 50/16{,}37 = 3{,}05$ tr |

Ví dụ cuối đáng chú ý: 50 triệu nhận sau **20 năm** với chiết khấu 15% chỉ đáng **3 triệu** hôm nay. Tương lai càng xa + chiết khấu càng cao → PV càng teo tóp.

> ❓ **Câu hỏi tự nhiên.**
> - *"Chọn discount rate bằng bao nhiêu?"* — Bằng tỷ suất sinh lời bạn có thể đạt từ phương án thay thế có cùng rủi ro. Rủi ro cao → discount rate cao → PV thấp (vì tương lai bấp bênh thì đáng giá ít hơn hôm nay).
> - *"PV và FV có phải hai mặt của một đồng xu?"* — Đúng. $FV = PV(1+r)^n$ và $PV = FV/(1+r)^n$ là cùng một phương trình giải theo hai chiều. Nhân lên = ra tương lai, chia xuống = về hiện tại.

> ⚠ **Lỗi thường gặp.** Cộng thẳng các khoản tiền ở những năm khác nhau. Sai — "100 triệu năm nay + 100 triệu năm thứ 5" **không** bằng 200 triệu hôm nay. Phải chiết khấu từng khoản về hiện tại rồi mới cộng.

> 🔁 **Dừng lại tự kiểm tra.** Lời hứa trả 121 triệu sau 2 năm, discount rate 10%. PV bằng bao nhiêu?
> <details><summary>Đáp án</summary>$PV = 121 / 1{,}1^2 = 121 / 1{,}21 = 100$ triệu.</details>

---

## 5. Quy tắc 72 (Rule of 72) — nhẩm nhanh thời gian nhân đôi

> 💡 **Trực giác.** Bạn không cần máy tính để ước lượng "bao lâu thì tiền gấp đôi". Cứ lấy **72 chia cho lãi suất (theo %)** là ra số năm xấp xỉ.

> 📐 **Công thức:**
>
> $$n_{\\text{gấp đôi}} \\approx \\frac{72}{r\\,(\\%)}$$

**Walk-through bằng số (verify so với chính xác):**

Thời gian nhân đôi chính xác giải từ $(1+r)^n = 2 \\Rightarrow n = \\dfrac{\\ln 2}{\\ln(1+r)}$.

| r | Quy tắc 72 | Chính xác $\\frac{\\ln 2}{\\ln(1+r)}$ | Sai số |
|---|---|---|---|
| 6% | $72/6 = 12{,}0$ năm | $11{,}90$ năm | ~1% |
| 8% | $72/8 = 9{,}0$ năm | $9{,}01$ năm | ~0% |
| 10% | $72/10 = 7{,}2$ năm | $7{,}27$ năm | ~1% |
| 12% | $72/12 = 6{,}0$ năm | $6{,}12$ năm | ~2% |

→ Quy tắc 72 chính xác nhất quanh 8%, lệch dần ở hai đầu nhưng vẫn đủ tốt để nhẩm.

> ⚠ **Lỗi thường gặp.** Dùng $72/0{,}08$ (lãi dạng thập phân) → ra 900 năm, vô lý. Phải dùng **số phần trăm**: $72/8 = 9$.

> 🔁 **Dừng lại tự kiểm tra.** Lãi 9%/năm, bao lâu tiền gấp đôi? Gấp bốn?
> <details><summary>Đáp án</summary>Gấp đôi: $72/9 = 8$ năm. Gấp bốn = gấp đôi hai lần = $8 \\times 2 = 16$ năm.</details>

---

## 6. Dòng tiền đều (Annuity) — tiết kiệm & trả góp định kỳ

> 💡 **Trực giác.** Phần trên xử lý **một** khoản tiền. Nhưng đời thực thường là **đóng đều mỗi tháng** (tiết kiệm hưu trí) hoặc **trả góp đều mỗi tháng** (vay mua nhà). Một chuỗi khoản tiền bằng nhau, cách đều, gọi là **niên kim (annuity)**.

**Giá trị tương lai của dòng tiền đều** — đóng $PMT$ mỗi kỳ, lãi $r$/kỳ, trong $n$ kỳ:

$$FV_{\\text{annuity}} = PMT \\cdot \\frac{(1+r)^n - 1}{r}$$

**Walk-through (verify) — đóng 5 triệu/năm, lãi 8%, trong 3 năm:**

$$FV = 5 \\cdot \\frac{1{,}08^3 - 1}{0{,}08} = 5 \\cdot \\frac{1{,}2597 - 1}{0{,}08} = 5 \\cdot 3{,}2464 = 16{,}23 \\text{ triệu}$$

Kiểm tra tay (khoản đầu đóng cuối năm 1, sinh lãi 2 năm): $5(1{,}08^2) + 5(1{,}08) + 5 = 5{,}832 + 5{,}4 + 5 = 16{,}23$ ✓.

**Giá trị hiện tại của dòng tiền đều** (dùng để tính khoản trả góp vay):

$$PV_{\\text{annuity}} = PMT \\cdot \\frac{1 - (1+r)^{-n}}{r}$$

> ❓ **Câu hỏi tự nhiên.** *"Vì sao đóng đều mỗi tháng lại mạnh đến vậy?"* — Vì mỗi khoản đóng sớm có thêm thời gian sinh lãi kép. Đóng 5tr/năm trong 30 năm ở 8% cho ~$566$ triệu, dù tổng tiền bỏ ra chỉ $150$ triệu — phần còn lại là **lãi kép trên các khoản đóng sớm**. Chiến lược đóng đều này là **bình quân giá (dollar-cost averaging)**, học kỹ ở [Lesson 06](../lesson-06-goals-saving/).

> 📝 **Tóm tắt toàn bài.**
> - **TVM**: 1 đồng hôm nay > 1 đồng tương lai (chi phí cơ hội + lạm phát + rủi ro).
> - **Lãi kép** $A = P(1+r)^t$ "ăn" lãi đơn $A = P(1+rt)$ theo thời gian — đừng nhân thẳng lãi với số năm.
> - **FV** $= PV(1+r)^n$ (đi tới); **PV** $= FV/(1+r)^n$ (chiết khấu về hôm nay).
> - **Ghép lãi** $m$ lần/năm: $(1+r/m)^{mt}$, giới hạn liên tục $e^{rt}$ — phần thêm giảm dần.
> - **Quy tắc 72**: thời gian gấp đôi $\\approx 72 / r(\\%)$.
> - **Annuity**: dòng tiền đều, $FV = PMT\\frac{(1+r)^n-1}{r}$ — nền của tiết kiệm & trả góp.

---

## Bài tập

1. **FV cơ bản.** Gửi 200 triệu, lãi kép 7%/năm. Sau 10 năm còn bao nhiêu?

2. **PV / chiết khấu.** Bạn được hứa trả 500 triệu sau 8 năm. Với discount rate 9%, khoản đó đáng bao nhiêu hôm nay?

3. **So sánh lãi đơn vs kép.** 100 triệu, 10%/năm, 20 năm. Tính FV theo lãi đơn và lãi kép, rồi tính chênh lệch.

4. **Tần suất ghép lãi.** 50 triệu, lãi danh nghĩa 6%/năm. So sánh FV sau 5 năm khi ghép (a) theo năm, (b) theo tháng.

5. **Quy tắc 72.** Một quỹ tăng trung bình 6%/năm. Ước lượng bao lâu để 100 triệu thành 400 triệu.

6. **Annuity.** Đóng 10 triệu mỗi năm vào quỹ hưu, lãi 8%/năm, trong 25 năm. Tính tổng giá trị cuối kỳ và so với tổng tiền đã bỏ ra.

---

## Lời giải chi tiết

### Bài 1 — FV cơ bản

$$FV = 200 \\times 1{,}07^{10} = 200 \\times 1{,}9672 = 393{,}43 \\text{ triệu}$$

Cách tiếp cận: áp thẳng $FV = PV(1+r)^n$. Tiền gần như gấp đôi sau 10 năm — khớp Quy tắc 72 ($72/7 \\approx 10{,}3$ năm để gấp đôi).

### Bài 2 — PV / chiết khấu

$$PV = \\frac{500}{1{,}09^8} = \\frac{500}{1{,}9926} = 250{,}9 \\text{ triệu}$$

Cách tiếp cận: đảo ngược FV. 500 triệu sau 8 năm với chiết khấu 9% chỉ đáng ~251 triệu hôm nay — gần đúng một nửa, vì $1{,}09^8 \\approx 2$.

### Bài 3 — Lãi đơn vs kép

- **Lãi đơn:** $FV = 100(1 + 0{,}1 \\times 20) = 100 \\times 3 = 300$ triệu.
- **Lãi kép:** $FV = 100 \\times 1{,}1^{20} = 100 \\times 6{,}7275 = 672{,}75$ triệu.
- **Chênh lệch:** $672{,}75 - 300 = 372{,}75$ triệu.

Cách tiếp cận: lãi đơn chỉ cộng $100 \\times 10\\% = 10$ triệu mỗi năm (×20 = 200 lãi). Lãi kép cho lãi sinh lãi → phần chênh 372,75 triệu chính là "lãi của lãi". Độ phức tạp tính: $O(1)$ với hàm mũ.

### Bài 4 — Tần suất ghép lãi

**(a) Ghép năm:** $FV = 50 \\times 1{,}06^5 = 50 \\times 1{,}3382 = 66{,}91$ triệu.

**(b) Ghép tháng:** lãi mỗi tháng $= 0{,}06/12 = 0{,}005$, số kỳ $= 12 \\times 5 = 60$:

$$FV = 50 \\times 1{,}005^{60} = 50 \\times 1{,}3489 = 67{,}44 \\text{ triệu}$$

Chênh: $67{,}44 - 66{,}91 = 0{,}53$ triệu. Ghép tháng nhỉnh hơn ~0,53 triệu — đáng kể nhưng không lớn; sự khác biệt nằm ở lãi suất hiệu dụng (Lesson 03).

### Bài 5 — Quy tắc 72

Gấp 4 = gấp đôi **hai lần**. Mỗi lần gấp đôi mất $72/6 = 12$ năm. Vậy gấp 4 mất $12 \\times 2 = 24$ năm.

Kiểm chứng chính xác: $1{,}06^n = 4 \\Rightarrow n = \\frac{\\ln 4}{\\ln 1{,}06} = \\frac{1{,}386}{0{,}0583} = 23{,}8$ năm ✓ (Quy tắc 72 cho 24, lệch ~0,2 năm).

### Bài 6 — Annuity

$$FV = 10 \\cdot \\frac{1{,}08^{25} - 1}{0{,}08} = 10 \\cdot \\frac{6{,}8485 - 1}{0{,}08} = 10 \\cdot 73{,}106 = 731{,}06 \\text{ triệu}$$

- **Tổng tiền đã bỏ ra:** $10 \\times 25 = 250$ triệu.
- **Phần do lãi kép tạo ra:** $731{,}06 - 250 = 481{,}06$ triệu.

Cách tiếp cận: dùng công thức FV của annuity. Điểm cốt lõi: bỏ ra 250 triệu nhưng nhận về 731 triệu — gần **2/3** giá trị cuối kỳ đến từ lãi kép trên các khoản đóng sớm. Đây là sức mạnh của tiết kiệm sớm và đều.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm 4 module:
  - **Máy tính lãi kép + đồ thị tăng trưởng**: nhập vốn gốc, lãi suất, số năm, tần suất ghép → vẽ đường tăng trưởng và so sánh trực tiếp **lãi kép vs lãi đơn** trên cùng biểu đồ.
  - **PV ↔ FV (chiết khấu)**: kéo slider để thấy một khoản tương lai "teo" về hiện tại như thế nào khi tăng discount rate hoặc kéo dài thời gian.
  - **Quy tắc 72**: nhập lãi suất → so sánh ước lượng 72/r với thời gian nhân đôi chính xác.
  - **Mô phỏng tiết kiệm đều (annuity)**: nhập khoản đóng định kỳ → thấy phần "tiền gốc đã đóng" vs "lãi kép sinh ra" tách bạch theo từng năm.

---

## Bài tiếp theo

→ [Lesson 02 — Lạm phát & sức mua](../lesson-02-inflation/): vì sao cùng số tiền mua được ít hơn theo thời gian, phân biệt **lãi suất danh nghĩa vs thực (nominal vs real)**, và vì sao lãi kép phải "thắng" lạm phát thì tiền mới thực sự lớn lên.

**Tham khảo chéo:** hàm mũ & lũy thừa [\`../../../Math/index.html\`](../../../Math/index.html) · chi phí cơ hội [\`../../../Economics/index.html\`](../../../Economics/index.html).
`;
