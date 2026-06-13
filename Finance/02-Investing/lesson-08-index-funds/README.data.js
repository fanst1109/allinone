// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/02-Investing/lesson-08-index-funds/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Quỹ chỉ số & ETF (Index Funds & ETFs)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **quỹ chỉ số (index fund)** và **ETF** là gì, hoạt động thế nào.
- Hiểu vì sao đầu tư **thụ động (passive)** là hệ quả thực tế của EMH (Lesson 07).
- So sánh **chủ động vs thụ động** bằng số: phí, hiệu suất, tỷ lệ thắng.
- Biết cách dựng một **danh mục đơn giản** (vd "3 quỹ").
- Hiểu **tỷ lệ chi phí (expense ratio)** và tác động dài hạn của nó.

## Kiến thức tiền đề

- [Lesson 07 — EMH & phí ăn lãi kép](../lesson-07-efficient-markets/).
- [Lesson 05 — đa dạng hóa](../lesson-05-diversification/).

---

## 1. Quỹ chỉ số & ETF là gì

> 💡 **Trực giác / Hình dung.** Thay vì cố chọn vài cổ phiếu "ngon" (khó, Lesson 07), bạn mua **cả cái rổ** — toàn bộ thị trường. Một **quỹ chỉ số** làm đúng việc đó: gom tiền nhiều người, mua **tất cả** (hoặc đại diện) cổ phiếu trong một chỉ số (vd VN-Index, S&P 500), theo đúng tỷ trọng. Bạn sở hữu "một lát của cả nền kinh tế" với một giao dịch.

**Định nghĩa:**

- **Quỹ chỉ số (index fund)** — quỹ đầu tư **thụ động** mô phỏng một chỉ số thị trường, nắm giữ các cổ phiếu thành phần theo tỷ trọng của chỉ số. Không cố chọn mã hay căn thời điểm.
- **ETF (Exchange-Traded Fund)** — quỹ (thường là quỹ chỉ số) được **niêm yết và giao dịch trên sàn như cổ phiếu** — mua bán trong giờ giao dịch theo giá thị trường.

**Ví dụ:** một quỹ mô phỏng VN30 nắm 30 cổ phiếu lớn nhất sàn HOSE theo tỷ trọng vốn hóa. Mua 1 chứng chỉ quỹ = sở hữu một phần nhỏ của cả 30 công ty.

> ❓ **Câu hỏi tự nhiên.**
> - *"Quỹ chỉ số khác quỹ chủ động thế nào?"* — Quỹ **chủ động** thuê chuyên gia cố chọn cổ phiếu để **thắng** chỉ số (phí cao). Quỹ **chỉ số** chỉ **bám** chỉ số (phí thấp). Lesson 07 cho thấy đa số quỹ chủ động thua sau phí.
> - *"ETF khác quỹ mở (mutual fund) chỗ nào?"* — ETF giao dịch trên sàn realtime như cổ phiếu; quỹ mở khớp lệnh 1 lần/ngày theo NAV. ETF thường phí thấp hơn, linh hoạt hơn.

---

## 2. Vì sao thụ động thường thắng

> 💡 **Trực giác.** Đây là kết quả của hai lực đã học: (1) **EMH** (Lesson 07) — khó chọn cổ phiếu thắng đều; (2) **đa dạng hóa** (Lesson 05) — nắm cả rổ xóa rủi ro riêng lẻ; cộng (3) **phí cực thấp**. Ba thứ này khiến quỹ chỉ số là "lựa chọn mặc định khôn ngoan" cho đa số người.

**Một thực tế thống kê nổi tiếng:** qua các khung thời gian dài (10–20 năm), **đa số (~80–90%) quỹ chủ động thua chỉ số tham chiếu** sau khi trừ phí. Lý do toán học (lập luận của Sharpe): tổng tất cả nhà đầu tư = thị trường, nên **trước phí**, lợi nhuận trung bình của nhà đầu tư chủ động = thị trường; **sau phí**, họ phải thua trung bình đúng bằng phần phí cao hơn.

**Walk-through bằng số (verify ý "tổng bằng thị trường") — đơn giản hóa:**

Nếu thị trường lời 8%, và nhà đầu tư thụ động (phí 0,2%) nhận 7,8%, thì **trung bình** nhà đầu tư chủ động trước phí cũng phải ~8% (vì họ là phần còn lại của thị trường) → sau phí 1,5% chỉ còn ~6,5% → **thua thụ động 1,3%/năm trung bình**. Không phải vì họ dốt, mà vì toán học của trò chơi tổng-bằng-thị-trường + phí.

> ⚠ **Lỗi thường gặp.** "Thụ động là tầm thường, người giỏi phải chủ động." Thực tế đầu tư thụ động phí thấp **vượt** đa số chuyên gia chủ động dài hạn — "không cố thắng" lại thắng. Đây là nghịch lý phản trực giác nhưng được dữ liệu ủng hộ mạnh.

> 🔁 **Dừng lại tự kiểm tra.** Nếu trước phí nhà đầu tư chủ động trung bình bằng thị trường, vì sao sau phí họ thua thụ động?
> <details><summary>Đáp án</summary>Vì phí chủ động (1–2%) cao hơn phí thụ động (~0,1–0,2%). Cùng lợi nhuận trước phí, ai trả phí nhiều hơn thì nhận ít hơn → chủ động thua đúng phần phí chênh lệch.</details>

---

## 3. Tỷ lệ chi phí (Expense Ratio)

> 💡 **Trực giác.** **Expense ratio** là phí quản lý quỹ thu hằng năm, tính theo % tài sản. Nghe nhỏ (0,1% vs 1,5%) nhưng qua lãi kép hàng chục năm, nó là khác biệt sống còn (đã thấy ở Lesson 07).

**Định nghĩa — Expense ratio:**

- **(a) Là gì** — % tài sản quỹ thu mỗi năm để vận hành (vd 0,1%/năm trên 100 triệu = 100.000đ/năm).
- **(b) Vì sao quan trọng** — đây là chi phí **chắc chắn**, trừ thẳng vào lợi nhuận mỗi năm, bất kể quỹ lời hay lỗ. Là thứ bạn **kiểm soát được** (lợi nhuận thì không).
- **(c) Ví dụ số** — quỹ chỉ số ~0,05–0,3%/năm; quỹ chủ động ~1–2%/năm. Chênh ~1,5%/năm, qua 30 năm lãi kép có thể ngốn ~1/3 giá trị cuối (Lesson 07 bài 2).

**4 ví dụ số (100 triệu, 30 năm, gộp 8%):**

| Expense ratio | Lợi nhuận ròng | Giá trị cuối |
|---|---|---|
| 0,1% | 7,9% | ~982 tr |
| 0,5% | 7,5% | ~875 tr |
| 1,0% | 7,0% | ~761 tr |
| 2,0% | 6,0% | ~574 tr |

→ Từ 0,1% lên 2,0% phí làm giá trị cuối **giảm gần một nửa** (982 → 574 tr), dù cùng lợi nhuận gộp. Phí là kẻ thù thầm lặng nhất.

> ❓ **Câu hỏi tự nhiên.** *"Phí thấp có nghĩa quỹ kém chất lượng?"* — Không. Quỹ chỉ số phí thấp vì **không cần chuyên gia chọn mã** (chỉ bám chỉ số một cách máy móc, rẻ). Phí thấp là **ưu điểm**, không phải dấu hiệu kém.

---

## 4. Dựng danh mục đơn giản

> 💡 **Trực giác / Hình dung.** Bạn không cần danh mục phức tạp. Một cấu trúc kinh điển là **"danh mục 3 quỹ"**: một quỹ cổ phiếu trong nước, một quỹ cổ phiếu quốc tế, một quỹ trái phiếu — trộn theo mức rủi ro của bạn (Lesson 01 phân bổ tài sản). Đơn giản, đa dạng hóa rộng, phí thấp.

**Ví dụ phân bổ theo hồ sơ (kết hợp Lesson 01):**

| Hồ sơ | CP trong nước | CP quốc tế | Trái phiếu |
|---|---|---|---|
| Tăng trưởng (trẻ) | 50% | 35% | 15% |
| Cân bằng | 35% | 25% | 40% |
| Thận trọng (gần hưu) | 20% | 15% | 65% |

**Tái cân bằng (rebalancing):** định kỳ (vd mỗi năm) đưa tỷ trọng về mức mục tiêu — bán bớt phần đã tăng nhiều, mua thêm phần tụt lại. Đây là cách **"mua thấp, bán cao" tự động, có kỷ luật**, chống thiên kiến hành vi (Lesson 07).

> ❓ **Câu hỏi tự nhiên.** *"Tái cân bằng có thực sự cần?"* — Có, vì nếu không, danh mục dần lệch về tài sản tăng mạnh (vd toàn cổ phiếu sau đợt tăng) → rủi ro vượt mức bạn chấp nhận. Tái cân bằng giữ rủi ro đúng kế hoạch và tự ép kỷ luật mua rẻ bán đắt.

> 📝 **Tóm tắt toàn bài.**
> - **Quỹ chỉ số** mô phỏng cả thị trường (thụ động, phí thấp); **ETF** là quỹ giao dịch trên sàn như cổ phiếu.
> - **Thụ động thường thắng chủ động** dài hạn vì EMH + đa dạng hóa + phí thấp (toán học tổng-bằng-thị-trường).
> - **Expense ratio** thấp là ưu điểm sống còn — chênh 1,5%/năm có thể ngốn ~1/3–1/2 giá trị cuối.
> - **Danh mục 3 quỹ** đơn giản + **tái cân bằng** định kỳ = chiến lược hiệu quả, kỷ luật cho đa số.

---

## Bài tập

1. **Index vs active.** Vì sao về mặt toán học, trung bình nhà đầu tư chủ động (trước phí) bằng thị trường?

2. **Expense ratio.** 150 triệu, 20 năm, gộp 7%. So giá trị cuối giữa phí 0,2% và 1,8%. (Cho $1{,}068^{20}=3{,}72$; $1{,}052^{20}=2{,}77$.)

3. **ETF vs quỹ mở.** Nêu 2 khác biệt chính giữa ETF và quỹ mở.

4. **Phân bổ.** Người 30 tuổi, chấp nhận rủi ro cao. Dùng bảng "3 quỹ", đề xuất phân bổ và giải thích.

5. **Tái cân bằng.** Danh mục mục tiêu 60% cổ phiếu / 40% trái phiếu, tổng 100 triệu. Sau 1 năm cổ phiếu tăng mạnh thành 75 triệu, trái phiếu 45 triệu (tổng 120). Cần làm gì để tái cân bằng?

---

## Lời giải chi tiết

### Bài 1 — Index vs active

Tổng tất cả nhà đầu tư **chính là** thị trường (mọi cổ phiếu đều do ai đó nắm). Nhà đầu tư thụ động nắm theo tỷ trọng thị trường → đạt đúng lợi nhuận thị trường. Phần còn lại (nhà đầu tư chủ động) gộp lại cũng phải bằng thị trường trừ đi phần thụ động → **trung bình chủ động (trước phí) = thị trường**. Đây là lập luận "số học của đầu tư chủ động" (William Sharpe).

### Bài 2 — Expense ratio

- Phí 0,2% → ròng 6,8%: $150 \\times 3{,}72 = 558$ triệu.
- Phí 1,8% → ròng 5,2%: $150 \\times 2{,}77 = 415{,}5$ triệu.
- Chênh $= 558 - 415{,}5 = 142{,}5$ triệu.
- → Chênh phí 1,6%/năm ngốn ~142 triệu (gần 26% giá trị) sau 20 năm.

### Bài 3 — ETF vs quỹ mở

1. **Giao dịch**: ETF mua/bán trên sàn realtime theo giá thị trường; quỹ mở khớp 1 lần/ngày theo NAV cuối ngày.
2. **Phí & linh hoạt**: ETF thường phí thấp hơn, mua bán linh hoạt như cổ phiếu (đặt lệnh giới hạn, bán khống...); quỹ mở thủ tục qua công ty quản lý quỹ.

### Bài 4 — Phân bổ

Người 30 tuổi, rủi ro cao → hồ sơ **Tăng trưởng**: ~50% CP trong nước, 35% CP quốc tế, 15% trái phiếu. Giải thích: thời gian đầu tư dài (~30+ năm tới hưu) đủ sức "ngồi qua" các đợt sụt để hưởng lợi nhuận cao dài hạn của cổ phiếu; CP quốc tế để đa dạng hóa địa lý (Lesson 05); 15% trái phiếu giảm bớt biến động.

### Bài 5 — Tái cân bằng

- Tổng hiện tại 120 triệu. Mục tiêu 60/40 → cổ phiếu nên là $0{,}6 \\times 120 = 72$ triệu, trái phiếu $0{,}4 \\times 120 = 48$ triệu.
- Hiện cổ phiếu 75 (thừa 3), trái phiếu 45 (thiếu 3).
- → **Bán 3 triệu cổ phiếu, mua thêm 3 triệu trái phiếu**. Đây là "bán phần đã tăng (đắt), mua phần tụt lại (rẻ)" một cách tự động, kỷ luật.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Tác động expense ratio**: kéo phí & số năm → so giá trị cuối thụ động vs chủ động, thấy phí ăn mòn.
  - **Máy dựng danh mục 3 quỹ**: chọn hồ sơ rủi ro → phân bổ CP trong nước / quốc tế / trái phiếu, biểu đồ tròn + lợi nhuận/rủi ro ước lượng.
  - **Mô phỏng tái cân bằng**: cho danh mục lệch sau một năm → tính lệnh mua/bán đưa về mục tiêu.

---

## Kết thúc Tầng 2

Bạn đã hoàn thành **Tầng 2 — Đầu tư & thị trường**: từ các lớp tài sản, định giá cổ phiếu/trái phiếu, rủi ro–lợi nhuận, đa dạng hóa, CAPM, hiệu quả thị trường tới quỹ chỉ số. Bạn có đủ nền để đầu tư hợp lý và hiểu thị trường vận hành thế nào.

→ **Tầng 3 — Tài chính định lượng & phái sinh** (đang phát triển): random walk, quyền chọn & định giá, futures, VaR & Monte Carlo, đường cong lợi suất, báo cáo tài chính, bong bóng & khủng hoảng.

**Tham khảo chéo:** EMH & phí [\`../lesson-07-efficient-markets/\`](../lesson-07-efficient-markets/) · phân bổ tài sản [\`../lesson-01-asset-classes/\`](../lesson-01-asset-classes/) · đa dạng hóa [\`../lesson-05-diversification/\`](../lesson-05-diversification/).
`;
