// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/01-PersonalFinance/lesson-02-inflation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Lạm phát & Sức mua (Inflation & Purchasing Power)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lạm phát (inflation)** là gì, đo bằng cách nào (**CPI** và **tỷ lệ lạm phát**).
- Phân biệt **giá trị danh nghĩa (nominal)** và **giá trị thực (real)** của tiền.
- Tính **sức mua (purchasing power)** của một khoản tiền teo đi thế nào theo thời gian.
- Phân biệt **lãi suất danh nghĩa vs lãi suất thực** và dùng **phương trình Fisher** để quy đổi.
- Hiểu vì sao **lãi kép phải "thắng" lạm phát** thì tiền mới thực sự lớn lên — nối thẳng với [Lesson 01](../lesson-01-time-value-money/).

## Kiến thức tiền đề

- [Lesson 01 — Giá trị thời gian của tiền & lãi kép](../lesson-01-time-value-money/): FV/PV, lãi kép $(1+r)^n$.
- Phần trăm, lũy thừa cơ bản.

---

## 1. Lạm phát là gì? (Inflation)

> 💡 **Trực giác / Hình dung.** Hỏi ông bà: "Hồi xưa tô phở bao nhiêu?" — câu trả lời luôn là một con số bé tí so với bây giờ. Không phải tô phở "tốt hơn", mà là **đồng tiền yếu đi**: cùng 50.000đ, năm nay mua được 1 tô, vài năm sau chỉ mua được 4/5 tô. Mức giá chung tăng lên theo thời gian — đó là lạm phát.

**Định nghĩa — Lạm phát:**

- **(a) Là gì** — mức tăng **chung** của giá cả hàng hóa và dịch vụ trong nền kinh tế theo thời gian; tương đương sự **giảm sức mua** của một đơn vị tiền.
- **(b) Vì sao cần khái niệm này** — vì con số tiền "trần trụi" (danh nghĩa) đánh lừa ta. Lương tăng 5% nghe có vẻ tốt, nhưng nếu giá cả tăng 7% thì thực ra bạn **nghèo đi**. Lạm phát là kính lọc để nhìn ra giá trị thật.
- **(c) Ví dụ số** — Lạm phát 6%/năm nghĩa là rổ hàng giá 100.000đ năm nay sẽ có giá 106.000đ năm sau. Cùng 100.000đ năm sau chỉ mua được $100/106 = 94{,}3\\%$ lượng hàng so với năm nay.

> ⚠ **Lỗi thường gặp.** Nghĩ "giá một món đồ tăng = lạm phát". Không hẳn — giá xăng tăng riêng lẻ là biến động giá tương đối. **Lạm phát** là mức giá **chung** (cả rổ hàng) tăng. Một món tăng trong khi món khác giảm có thể giữ lạm phát ~0.

---

## 2. Đo lạm phát — CPI & tỷ lệ lạm phát

> 💡 **Trực giác.** Làm sao đo "giá chung"? Nhà thống kê chọn một **rổ hàng hóa (basket)** đại diện cho chi tiêu hộ gia đình (gạo, thịt, tiền nhà, xăng, học phí...), rồi theo dõi tổng giá của đúng rổ đó qua các năm. Chỉ số này là **CPI (Consumer Price Index — chỉ số giá tiêu dùng)**.

**Định nghĩa — CPI:**

- **(a) Là gì** — chỉ số đo tổng chi phí của một rổ hàng hóa cố định, quy về một **năm gốc** (thường đặt CPI = 100).
- **(b) Vì sao cần** — cho một con số duy nhất theo dõi mức giá chung, để so sánh giữa các năm.
- **(c) Công thức tỷ lệ lạm phát giữa hai năm:**

$$\\text{Lạm phát}\\,\\% = \\frac{CPI_{\\text{năm sau}} - CPI_{\\text{năm trước}}}{CPI_{\\text{năm trước}}} \\times 100\\%$$

**Walk-through bằng số thật (verify):**

Giả sử rổ hàng (1kg gạo + 1kg thịt + 1 lít xăng):

| Năm | Giá rổ | CPI (gốc 2020=100) | Lạm phát so năm trước |
|---|---|---|---|
| 2020 | 200.000đ | 100,0 | — |
| 2021 | 208.000đ | 104,0 | $(104-100)/100 = 4{,}0\\%$ |
| 2022 | 220.000đ | 110,0 | $(110-104)/104 = 5{,}8\\%$ |
| 2023 | 231.000đ | 115,5 | $(115{,}5-110)/110 = 5{,}0\\%$ |

Kiểm chứng 2021: $208.000/200.000 = 1{,}04 \\to$ CPI $= 104 \\to$ lạm phát $4\\%$ ✓.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"CPI của nhà nước có khớp lạm phát của riêng tôi không?"* — Không hẳn. CPI dùng rổ trung bình; nếu bạn chi nhiều cho thứ tăng giá mạnh (vd tiền thuê nhà ở thành phố), lạm phát "cảm nhận" của bạn cao hơn CPI công bố.
> - *"Lạm phát âm thì sao?"* — Gọi là **giảm phát (deflation)** — mức giá chung giảm. Nghe có vẻ tốt nhưng nguy hiểm: người ta hoãn mua chờ giá rẻ hơn → kinh tế đình trệ.

> 🔁 **Dừng lại tự kiểm tra.** CPI năm 2024 = 121,3 (gốc 2020=100). Năm 2023 là 115,5. Lạm phát 2024?
> <details><summary>Đáp án</summary>$(121{,}3 - 115{,}5)/115{,}5 = 5{,}8/115{,}5 = 5{,}0\\%$.</details>

---

## 3. Sức mua & giá trị thực của tiền (Purchasing Power)

> 💡 **Trực giác.** "Sức mua" của 100 triệu = lượng hàng hóa nó mua được. Lạm phát ăn mòn sức mua y như lãi kép làm tiền lớn lên — chỉ là **theo chiều ngược lại**. Nếu lãi kép là $(1+r)^n$, thì sức mua bị bào theo $1/(1+i)^n$ với $i$ là lạm phát.

**Công thức — sức mua của khoản $M$ sau $n$ năm, lạm phát $i$/năm:**

$$\\text{Giá trị thực} = \\frac{M}{(1 + i)^n}$$

(Chính là công thức **chiết khấu PV** ở Lesson 01, với "discount rate" = tỷ lệ lạm phát.)

**4 ví dụ số (verify) — 100 triệu giữ tiền mặt, lạm phát 6%/năm:**

| Sau n năm | Giá trị thực $= 100/1{,}06^n$ | Mất sức mua |
|---|---|---|
| 5 | $100/1{,}338 = 74{,}7$ tr | −25,3% |
| 10 | $100/1{,}791 = 55{,}8$ tr | −44,2% |
| 20 | $100/3{,}207 = 31{,}2$ tr | −68,8% |
| 30 | $100/5{,}743 = 17{,}4$ tr | −82,6% |

→ Giữ 100 triệu **tiền mặt** trong két 30 năm, lạm phát 6%, thì về sức mua chỉ còn như **17,4 triệu** hôm nay. Tiền không "mất" về con số, nhưng mất về **giá trị thực**.

> ⚠ **Lỗi thường gặp.** Nghĩ "để tiền trong két là an toàn, không mất gì". Sai — tiền mặt nhàn rỗi **chắc chắn mất giá** theo lạm phát. "An toàn danh nghĩa" không phải "an toàn thực".

> 🔁 **Dừng lại tự kiểm tra.** Lạm phát 8%/năm. 50 triệu giữ tiền mặt sau 10 năm còn sức mua bao nhiêu?
> <details><summary>Đáp án</summary>$50/1{,}08^{10} = 50/2{,}159 = 23{,}2$ triệu (mất ~54% sức mua).</details>

---

## 4. Lãi suất danh nghĩa vs Lãi suất thực (Nominal vs Real Rate)

> 💡 **Trực giác.** Gửi tiết kiệm 8%/năm nghe sướng, nhưng nếu lạm phát 6% thì túi bạn chỉ thực sự "dày" thêm khoảng **2%**. Phần 6% kia chỉ vừa đủ bù cho việc hàng hóa đắt lên. **Lãi suất thực** là lãi suất sau khi trừ lạm phát — đó mới là tốc độ giàu lên thật.

**Định nghĩa — Lãi suất thực (real interest rate):**

- **(a) Là gì** — phần tăng trưởng **sức mua** của khoản tiền, sau khi loại bỏ tác động lạm phát.
- **(b) Vì sao cần** — lãi suất danh nghĩa nói "có thêm bao nhiêu đồng", lãi suất thực nói "mua được thêm bao nhiêu hàng". Cái thứ hai mới là thứ ta quan tâm.
- **(c) Công thức (phương trình Fisher):**

$$1 + r_{\\text{thực}} = \\frac{1 + r_{\\text{danh nghĩa}}}{1 + i} \\quad\\Rightarrow\\quad r_{\\text{thực}} \\approx r_{\\text{danh nghĩa}} - i$$

**Walk-through bằng số (verify chính xác vs xấp xỉ) — danh nghĩa 8%, lạm phát 6%:**

$$1 + r_{\\text{thực}} = \\frac{1{,}08}{1{,}06} = 1{,}01887 \\Rightarrow r_{\\text{thực}} = 1{,}887\\%$$

Xấp xỉ: $8\\% - 6\\% = 2\\%$. Lệch ~0,11 điểm % — xấp xỉ tốt khi lãi thấp, sai dần khi lãi/lạm phát cao.

**4 ví dụ số:**

| Danh nghĩa | Lạm phát | Thực (chính xác) | Xấp xỉ (hiệu) |
|---|---|---|---|
| 8% | 6% | 1,89% | 2% |
| 5% | 3% | 1,94% | 2% |
| 12% | 10% | 1,82% | 2% |
| 4% | 7% | −2,80% | −3% |

Ví dụ cuối: lãi danh nghĩa 4% nhưng lạm phát 7% → lãi thực **âm** (−2,8%). Bạn có thêm tiền nhưng sức mua **giảm**.

> ❓ **Câu hỏi tự nhiên.**
> - *"Khi nào dùng công thức chính xác, khi nào xấp xỉ?"* — Nhẩm nhanh thì lấy hiệu ($r - i$). Khi lãi/lạm phát cao (>10%) hoặc cần chính xác, dùng công thức Fisher đầy đủ.
> - *"Lãi thực âm có thật xảy ra không?"* — Có, thường xuyên. Gửi tiết kiệm thời lạm phát cao thường cho lãi thực âm — đó là lý do người ta chuyển sang tài sản khác (vàng, BĐS, cổ phiếu) để bảo vệ sức mua.

> ⚠ **Lỗi thường gặp.** So sánh hai khoản đầu tư ở hai thời kỳ chỉ bằng lãi danh nghĩa. Gửi 12% thời lạm phát 10% (thực 1,8%) **kém hơn** gửi 5% thời lạm phát 2% (thực 2,9%). Luôn quy về lãi thực.

> 🔁 **Dừng lại tự kiểm tra.** Lãi danh nghĩa 10%, lạm phát 4%. Lãi thực chính xác bằng bao nhiêu?
> <details><summary>Đáp án</summary>$1{,}10/1{,}04 = 1{,}0577 \\to 5{,}77\\%$ (xấp xỉ $10-4=6\\%$).</details>

---

## 5. Vì sao lãi kép phải "thắng" lạm phát

> 💡 **Trực giác.** Lesson 01 nói lãi kép làm tiền lớn lên. Lesson này thêm điều kiện: nó phải lớn **nhanh hơn** lạm phát thì sức mua mới thực sự tăng. Hai lực kéo ngược nhau — lãi kép $(1+r)^n$ đẩy lên, lạm phát $(1+i)^n$ kéo xuống. Cái thắng là $(1+r_{\\text{thực}})^n$.

**Walk-through bằng số (verify) — 100 triệu, lãi danh nghĩa 8%, lạm phát 6%, 20 năm:**

- **Giá trị danh nghĩa:** $100 \\times 1{,}08^{20} = 100 \\times 4{,}661 = 466{,}1$ triệu (nghe rất nhiều!).
- **Quy về sức mua hôm nay:** $466{,}1 / 1{,}06^{20} = 466{,}1 / 3{,}207 = 145{,}3$ triệu.
- **Kiểm chứng bằng lãi thực:** $100 \\times 1{,}01887^{20} = 100 \\times 1{,}453 = 145{,}3$ triệu ✓.

→ Sau 20 năm, 466 triệu **danh nghĩa** chỉ đáng **145 triệu** sức mua hôm nay. Vẫn lời thật (tăng 45% sức mua) vì lãi thực dương — nhưng kém xa con số danh nghĩa làm ta phấn khích.

> ❓ **Câu hỏi tự nhiên.** *"Vậy chỉ tiết kiệm ngân hàng có đủ không?"* — Thường không. Lãi gửi tiết kiệm hay xấp xỉ lạm phát → lãi thực gần 0. Muốn sức mua tăng đáng kể qua nhiều năm, phần lớn cần đầu tư vào tài sản có lợi nhuận thực dương cao hơn (sẽ học ở **Tầng 2 — Đầu tư**).

> 📝 **Tóm tắt toàn bài.**
> - **Lạm phát** = mức giá chung tăng = sức mua tiền giảm; đo bằng **CPI**, tỷ lệ $= \\Delta CPI / CPI_{\\text{trước}}$.
> - **Sức mua** sau $n$ năm $= M/(1+i)^n$ — giữ tiền mặt là **chắc chắn mất giá thực**.
> - **Lãi thực**: $1+r_{\\text{thực}} = \\frac{1+r_{\\text{dn}}}{1+i}$, nhẩm $\\approx r_{\\text{dn}} - i$. Có thể **âm**.
> - **Lãi kép phải thắng lạm phát**: chỉ $r_{\\text{thực}} > 0$ thì sức mua mới thật sự tăng.

---

## Bài tập

1. **Tỷ lệ lạm phát.** CPI năm 2022 = 110,0; năm 2023 = 116,6. Tính lạm phát 2023.

2. **Sức mua.** Bạn có 300 triệu tiền mặt. Lạm phát 5%/năm. Sau 15 năm sức mua thực còn bao nhiêu (quy về hôm nay)?

3. **Lãi thực.** Gửi tiết kiệm 7%/năm, lạm phát 4,5%. Tính lãi suất thực (chính xác và xấp xỉ).

4. **Danh nghĩa vs thực.** 200 triệu đầu tư 20 năm, danh nghĩa 9%/năm, lạm phát 6%/năm. Tính giá trị danh nghĩa cuối kỳ VÀ sức mua quy về hôm nay.

5. **Lãi thực âm.** Lãi gửi 3%/năm, lạm phát 8%. Sau 10 năm, 100 triệu gửi ngân hàng còn sức mua thực bao nhiêu?

---

## Lời giải chi tiết

### Bài 1 — Tỷ lệ lạm phát

$$\\frac{116{,}6 - 110{,}0}{110{,}0} = \\frac{6{,}6}{110} = 0{,}06 = 6{,}0\\%$$

### Bài 2 — Sức mua

$$\\text{Thực} = \\frac{300}{1{,}05^{15}} = \\frac{300}{2{,}0789} = 144{,}3 \\text{ triệu}$$

Cách tiếp cận: chiết khấu theo lạm phát. 300 triệu để yên 15 năm @ lạm phát 5% mất hơn nửa sức mua (còn ~48%). Bài học: tiền mặt nhàn rỗi bị bào mòn.

### Bài 3 — Lãi thực

- **Chính xác:** $\\dfrac{1{,}07}{1{,}045} - 1 = 1{,}02392 - 1 = 2{,}39\\%$.
- **Xấp xỉ:** $7\\% - 4{,}5\\% = 2{,}5\\%$.

Lệch ~0,11 điểm %. Lãi thực dương → sức mua tăng nhẹ.

### Bài 4 — Danh nghĩa vs thực

- **Danh nghĩa:** $200 \\times 1{,}09^{20} = 200 \\times 5{,}604 = 1120{,}8$ triệu.
- **Sức mua hôm nay:** $1120{,}8 / 1{,}06^{20} = 1120{,}8 / 3{,}207 = 349{,}5$ triệu.
- **Kiểm bằng lãi thực:** $r_{\\text{thực}} = 1{,}09/1{,}06 - 1 = 2{,}83\\%$; $200 \\times 1{,}0283^{20} = 200 \\times 1{,}748 = 349{,}5$ triệu ✓.

Cách tiếp cận: con số danh nghĩa 1.121 triệu rất "kêu", nhưng sức mua thực chỉ ~350 triệu — tăng 75% sức mua sau 20 năm. Vẫn tốt vì lãi thực ~2,8% > 0.

### Bài 5 — Lãi thực âm

- **Giá trị danh nghĩa:** $100 \\times 1{,}03^{10} = 100 \\times 1{,}344 = 134{,}4$ triệu.
- **Sức mua hôm nay:** $134{,}4 / 1{,}08^{10} = 134{,}4 / 2{,}159 = 62{,}3$ triệu.
- **Kiểm bằng lãi thực:** $r_{\\text{thực}} = 1{,}03/1{,}08 - 1 = -4{,}63\\%$; $100 \\times 0{,}9537^{10} = 62{,}3$ triệu ✓.

Cách tiếp cận: dù tài khoản hiện 134 triệu (lời danh nghĩa!), sức mua chỉ còn **62 triệu** — bạn **nghèo đi 38%** về thực. Đây là cái bẫy của lãi thực âm: con số tăng nhưng giá trị giảm.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy bào sức mua**: nhập số tiền + lạm phát + số năm → đồ thị sức mua thực teo dần, kèm "rổ phở" minh họa mua được bao nhiêu tô qua các năm.
  - **Máy tính CPI → lạm phát**: nhập CPI hai năm → ra tỷ lệ lạm phát.
  - **Danh nghĩa vs Thực (Fisher)**: nhập lãi danh nghĩa + lạm phát → lãi thực (chính xác & xấp xỉ), và đồ thị hai đường tăng trưởng danh nghĩa vs thực tách nhau.

---

## Bài tiếp theo

→ [Lesson 03 — Lãi suất: APR vs APY](../lesson-03-interest-rates/): mổ xẻ con số lãi suất trên hợp đồng — lãi danh nghĩa, lãi hiệu dụng (APY), tần suất ghép lãi, và vì sao "12%/năm trả góp" không phải lúc nào cũng là 12%.

**Tham khảo chéo:** chiết khấu PV [\`../lesson-01-time-value-money/\`](../lesson-01-time-value-money/) · lạm phát ở góc nhìn kinh tế vĩ mô [\`../../../Economics/index.html\`](../../../Economics/index.html).
`;
