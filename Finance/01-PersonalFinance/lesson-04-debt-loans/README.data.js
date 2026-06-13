// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/01-PersonalFinance/lesson-04-debt-loans/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Nợ & Khoản vay (Debt & Loans)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cơ chế **trả góp đều (amortization)**: mỗi kỳ trả tách thành **lãi** và **gốc** thế nào.
- Tính **khoản trả mỗi kỳ (PMT)** của một khoản vay.
- Đọc và lập **bảng amortization** từng kỳ.
- Hiểu **lãi kép của nợ** trên thẻ tín dụng và **bẫy trả tối thiểu (minimum payment trap)**.
- Phân biệt nợ "tốt" và nợ "xấu", và vì sao **trả thêm gốc** lại tiết kiệm khủng khiếp.

## Kiến thức tiền đề

- [Lesson 01 — annuity (dòng tiền đều)](../lesson-01-time-value-money/): công thức $PV_{\\text{annuity}}$.
- [Lesson 03 — APR vs APY](../lesson-03-interest-rates/): lãi suất thực trên dư nợ giảm dần.

---

## 1. Vay trả góp đều hoạt động thế nào (Amortization)

> 💡 **Trực giác / Hình dung.** Vay mua nhà, mỗi tháng bạn trả **đúng một số tiền cố định**. Nhưng số đó **không** chia đều gốc/lãi: tháng đầu dư nợ lớn → phần lớn tiền trả là **lãi**, chỉ một ít vào **gốc**. Càng về sau dư nợ nhỏ → lãi ít đi, phần trả gốc tăng dần. Như đốt một đống củi: lúc đầu khói (lãi) nhiều, về sau mới cháy nhanh phần thân (gốc).

**Định nghĩa — Amortization:**

- **(a) Là gì** — quá trình trả dần một khoản vay bằng các kỳ trả **bằng nhau**, mỗi kỳ gồm lãi (trên dư nợ còn lại) + một phần gốc.
- **(b) Vì sao cần** — cho người vay một khoản trả cố định dễ lên kế hoạch, trong khi vẫn tính lãi công bằng trên dư nợ giảm dần.
- **(c) Công thức khoản trả mỗi kỳ:**

$$PMT = P \\cdot \\frac{r}{1 - (1 + r)^{-n}}$$

với $P$ = gốc vay, $r$ = lãi suất **mỗi kỳ**, $n$ = số kỳ.

**Walk-through bằng số thật (verify) — vay $P = 100$ triệu, lãi 1%/tháng ($r = 0{,}01$), $n = 12$ tháng:**

$$PMT = 100 \\cdot \\frac{0{,}01}{1 - 1{,}01^{-12}} = 100 \\cdot \\frac{0{,}01}{1 - 0{,}8874} = 100 \\cdot \\frac{0{,}01}{0{,}11255} = 8{,}885 \\text{ triệu/tháng}$$

**Bảng amortization 3 kỳ đầu (verify từng dòng):**

| Kỳ | Dư nợ đầu | Lãi (1% × dư nợ) | Gốc (PMT − lãi) | Dư nợ cuối |
|---|---|---|---|---|
| 1 | 100,000 | 1,000 | 7,885 | 92,115 |
| 2 | 92,115 | 0,921 | 7,964 | 84,151 |
| 3 | 84,151 | 0,842 | 8,043 | 76,108 |
| ... | ... | ... | ... | ... |
| 12 | 8,797 | 0,088 | 8,797 | 0,000 |

Kiểm chứng kỳ 1: lãi $= 100 \\times 1\\% = 1$ triệu; gốc $= 8{,}885 - 1 = 7{,}885$; dư nợ $= 100 - 7{,}885 = 92{,}115$ ✓. Tổng lãi cả 12 kỳ $\\approx 6{,}62$ triệu (so với "phẳng" 12 triệu ở Lesson 03 — vì đây là lãi thực trên dư nợ giảm dần).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao kỳ đầu trả nhiều lãi vậy?"* — Vì lãi tính trên **dư nợ**, mà dư nợ kỳ đầu lớn nhất. Đây là lý do trả nợ vài năm đầu cảm giác "gốc chẳng giảm bao nhiêu".
> - *"Trả trước hạn có lợi không?"* — Rất lợi (xem mục 3): mỗi đồng trả thêm vào gốc cắt thẳng phần lãi tương lai của đồng đó.

> ⚠ **Lỗi thường gặp.** Tưởng mỗi kỳ trả gốc đều nhau. Sai — khoản **trả** đều nhau, nhưng tỷ lệ gốc/lãi đổi mỗi kỳ (lãi giảm dần, gốc tăng dần).

> 🔁 **Dừng lại tự kiểm tra.** Vay 50 triệu, 1%/tháng, kỳ 1 trả lãi bao nhiêu?
> <details><summary>Đáp án</summary>Lãi kỳ 1 $= 50 \\times 1\\% = 0{,}5$ triệu (tính trên dư nợ đầu = toàn bộ 50 triệu).</details>

---

## 2. Lãi kép của nợ — thẻ tín dụng & bẫy trả tối thiểu

> 💡 **Trực giác.** Lãi kép ở Lesson 01 làm tiết kiệm phình to — nhưng nó cũng làm **nợ phình to** theo đúng cách đó, chỉ là **chống lại bạn**. Thẻ tín dụng thường tính lãi ~2,5–3%/**tháng** (≈ 30–40%/năm hiệu dụng). Nếu chỉ trả "tối thiểu" (thường 5% dư nợ), phần lãi mới gần như nuốt hết khoản trả → nợ gần như đứng yên, kéo dài nhiều năm.

**Định nghĩa — Bẫy trả tối thiểu (minimum payment trap):**

- **(a) Là gì** — khi khoản trả tối thiểu chỉ vừa đủ (hoặc gần đủ) trả phần lãi, gốc giảm cực chậm, kéo dài nợ và tổng lãi khổng lồ.
- **(b) Vì sao nguy hiểm** — người vay tưởng "vẫn đang trả nợ", nhưng thực chất chủ yếu trả lãi, dư nợ giảm nhỏ giọt.
- **(c) Ví dụ số** — nợ thẻ 30 triệu, lãi 2,5%/tháng (~34,5%/năm), trả tối thiểu 5% dư nợ mỗi tháng:

Tháng 1: lãi $= 30 \\times 2{,}5\\% = 0{,}75$ triệu; trả tối thiểu $= 30 \\times 5\\% = 1{,}5$ triệu → gốc giảm chỉ $1{,}5 - 0{,}75 = 0{,}75$ triệu. **Một nửa** khoản trả là lãi! Với cách trả tối thiểu (giảm dần theo dư nợ), khoản nợ này kéo dài **hàng chục tháng** và tổng lãi vượt xa số gốc ban đầu.

**So sánh 3 chiến lược trả nợ thẻ 30 triệu @ 2,5%/tháng:**

| Chiến lược | Thời gian hết nợ | Tổng lãi trả |
|---|---|---|
| Trả tối thiểu 5% dư nợ | rất dài (giảm chậm dần, "đuôi" kéo nhiều năm) | rất lớn |
| Trả cố định 1,5 triệu/tháng | ~28 tháng | ~11–12 triệu |
| Trả cố định 3 triệu/tháng | ~11 tháng | ~4 triệu |

→ Tăng khoản trả đều lên gấp đôi cắt cả thời gian lẫn tổng lãi xuống hơn một nửa.

> ❓ **Câu hỏi tự nhiên.**
> - *"Trả tối thiểu có bao giờ hết nợ không?"* — Về lý thuyết tiệm cận nhưng cực lâu, vì khoản trả co lại theo dư nợ. Thực tế ngân hàng đặt sàn tối thiểu (vd 200k) nên vẫn hết, nhưng sau rất nhiều năm và tổng lãi có thể gấp 2–3 lần gốc.
> - *"Vậy phải làm gì khi kẹt nợ thẻ?"* — Ưu tiên trả **cố định một số lớn nhất có thể** mỗi tháng, không theo "tối thiểu". Cân nhắc chuyển sang khoản vay lãi thấp hơn để tất toán thẻ.

> ⚠ **Lỗi thường gặp.** Nghĩ "lãi thẻ 2,5%/tháng nghe nhỏ". Đó là ~34,5%/năm hiệu dụng ($1{,}025^{12} - 1$) — gấp 4–5 lần lãi vay ngân hàng thông thường. Nợ thẻ là loại nợ đắt nhất.

> 🔁 **Dừng lại tự kiểm tra.** Nợ thẻ 20 triệu, lãi 3%/tháng. Tháng đầu phần lãi là bao nhiêu? Trả tối thiểu 5% (1 triệu) thì gốc giảm bao nhiêu?
> <details><summary>Đáp án</summary>Lãi $= 20 \\times 3\\% = 0{,}6$ triệu. Trả 1 triệu → gốc giảm chỉ $1 - 0{,}6 = 0{,}4$ triệu. 60% khoản trả là lãi.</details>

---

## 3. Sức mạnh của việc trả thêm gốc

> 💡 **Trực giác.** Mỗi đồng bạn trả **thêm** vào gốc (ngoài khoản PMT) sẽ xóa luôn **toàn bộ lãi tương lai** mà đồng đó lẽ ra phải gánh. Trả thêm sớm = tiết kiệm lãi nhiều nhất, vì nó cắt phần "đuôi" lãi dài nhất.

**Walk-through (verify) — vay 600 triệu, 0,8%/tháng (~10%/năm), 20 năm (240 kỳ):**

- $PMT = 600 \\cdot \\dfrac{0{,}008}{1 - 1{,}008^{-240}} = 5{,}79$ triệu/tháng. Tổng trả $= 5{,}79 \\times 240 = 1389$ triệu → **tổng lãi ~789 triệu** (hơn cả gốc!).
- Trả thêm 2 triệu/tháng (tổng 7,79 triệu): nợ hết sau **~143 tháng** (~12 năm thay vì 20), tổng lãi giảm xuống ~**512 triệu** → **tiết kiệm gần 277 triệu** chỉ nhờ trả thêm 2 triệu/tháng.

> ❓ **Câu hỏi tự nhiên.** *"Trả thêm gốc hay đem tiền đi đầu tư?"* — So lãi vay với lợi nhuận đầu tư **sau thuế, đã trừ rủi ro**. Nếu lãi vay 10% mà đầu tư an toàn chỉ ~6%, trả nợ trước là "khoản đầu tư" chắc chắn 10%. Nợ lãi cao (thẻ tín dụng) gần như luôn nên trả trước.

> 📝 **Tóm tắt toàn bài.**
> - **Amortization**: khoản trả đều $PMT = P\\frac{r}{1-(1+r)^{-n}}$; mỗi kỳ tách lãi (trên dư nợ) + gốc. Đầu kỳ nhiều lãi, cuối kỳ nhiều gốc.
> - **Lãi kép của nợ** chống lại bạn; thẻ tín dụng ~2,5–3%/tháng ≈ 30–40%/năm.
> - **Bẫy trả tối thiểu**: gốc giảm nhỏ giọt, nợ kéo dài, tổng lãi gấp nhiều lần.
> - **Trả thêm gốc** (nhất là sớm) cắt thẳng lãi tương lai → tiết kiệm lớn.

---

## Bài tập

1. **Khoản trả.** Vay 200 triệu, 0,9%/tháng, 24 tháng. Tính PMT.

2. **Bảng amortization.** Với khoản vay bài 1, tính lãi và gốc của kỳ 1 và kỳ 2.

3. **Tổng lãi.** Vay 500 triệu, 0,7%/tháng, 180 kỳ, PMT = 4,49 triệu. Tính tổng số tiền trả và tổng lãi.

4. **Lãi thẻ.** Nợ thẻ 25 triệu, lãi 2,8%/tháng. Tính lãi tháng đầu và lãi suất năm hiệu dụng.

5. **Trả tối thiểu.** Nợ thẻ 40 triệu, 2,5%/tháng, trả tối thiểu 5% dư nợ. Tính khoản trả và phần gốc giảm trong tháng đầu.

---

## Lời giải chi tiết

### Bài 1 — Khoản trả

$$PMT = 200 \\cdot \\frac{0{,}009}{1 - 1{,}009^{-24}} = 200 \\cdot \\frac{0{,}009}{1 - 0{,}8071} = 200 \\cdot \\frac{0{,}009}{0{,}19285} = 9{,}33 \\text{ triệu/tháng}$$

### Bài 2 — Bảng amortization

- **Kỳ 1:** lãi $= 200 \\times 0{,}9\\% = 1{,}80$ tr; gốc $= 9{,}33 - 1{,}80 = 7{,}53$ tr; dư nợ $= 200 - 7{,}53 = 192{,}47$ tr.
- **Kỳ 2:** lãi $= 192{,}47 \\times 0{,}9\\% = 1{,}732$ tr; gốc $= 9{,}33 - 1{,}732 = 7{,}598$ tr; dư nợ $= 192{,}47 - 7{,}598 = 184{,}87$ tr.

Cách tiếp cận: lãi mỗi kỳ = dư nợ đầu kỳ × lãi suất; gốc = PMT − lãi. Quan sát phần gốc tăng dần (7,53 → 7,60).

### Bài 3 — Tổng lãi

- Tổng trả $= 4{,}49 \\times 180 = 808{,}2$ triệu.
- Tổng lãi $= 808{,}2 - 500 = 308{,}2$ triệu.

Cách tiếp cận: tổng lãi = tổng các kỳ trả − gốc. Vay 500 triệu trong 15 năm phải trả ~308 triệu tiền lãi — hơn 60% gốc.

### Bài 4 — Lãi thẻ

- Lãi tháng đầu $= 25 \\times 2{,}8\\% = 0{,}70$ triệu.
- Lãi suất năm hiệu dụng $= 1{,}028^{12} - 1 = 1{,}3927 - 1 = 39{,}3\\%$.

Cách tiếp cận: 2,8%/tháng ghép 12 lần ≈ 39,3%/năm — cực cao, đắt hơn nhiều mọi khoản vay thông thường.

### Bài 5 — Trả tối thiểu

- Khoản trả tối thiểu $= 40 \\times 5\\% = 2{,}0$ triệu.
- Lãi tháng đầu $= 40 \\times 2{,}5\\% = 1{,}0$ triệu.
- Gốc giảm $= 2{,}0 - 1{,}0 = 1{,}0$ triệu (chỉ một nửa khoản trả vào gốc).

Cách tiếp cận: với trả tối thiểu, một nửa tiền chỉ để bù lãi → dư nợ giảm rất chậm, đây là cơ chế của bẫy trả tối thiểu.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính trả góp + bảng amortization**: nhập khoản vay → khoản trả PMT, biểu đồ tách **gốc vs lãi** mỗi kỳ (thấy lãi giảm dần, gốc tăng dần), tổng lãi cả kỳ.
  - **Bẫy trả tối thiểu**: mô phỏng nợ thẻ với trả tối thiểu vs trả cố định → so thời gian hết nợ và tổng lãi.
  - **Tác động trả thêm gốc**: kéo slider "trả thêm/tháng" → thấy thời gian và tổng lãi tụt mạnh.

---

## Bài tiếp theo

→ [Lesson 05 — Ngân sách & dòng tiền cá nhân](../lesson-05-budgeting/): quản lý thu/chi để có tiền trả nợ và tiết kiệm, quỹ khẩn cấp, các quy tắc phân bổ ngân sách (50/30/20).

**Tham khảo chéo:** annuity & dòng tiền đều [\`../lesson-01-time-value-money/\`](../lesson-01-time-value-money/) · lãi thực vs phẳng [\`../lesson-03-interest-rates/\`](../lesson-03-interest-rates/).
`;
