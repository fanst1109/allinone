// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/01-PersonalFinance/lesson-08-taxes/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Thuế cơ bản (Taxes)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **thuế thu nhập lũy tiến (progressive income tax)** hoạt động theo **bậc (brackets)** thế nào.
- Phân biệt **thuế suất biên (marginal rate)** và **thuế suất trung bình / hiệu dụng (average / effective rate)** — và vì sao nhầm hai cái này gây hiểu sai tai hại.
- Tính được tiền thuế từ bảng bậc thuế (dùng biểu thuế TNCN Việt Nam làm ví dụ).
- Hiểu **lợi nhuận sau thuế** và kết hợp với lạm phát để ra **lợi nhuận thực sau thuế** — thước đo cuối cùng.

## Kiến thức tiền đề

- [Lesson 02 — lạm phát & lãi thực](../lesson-02-inflation/): để ghép thuế + lạm phát thành lợi nhuận thực sau thuế.
- [Lesson 05 — thu nhập ròng](../lesson-05-budgeting/): thu nhập sau thuế là tiền thực để lập ngân sách.

---

## 1. Vì sao có thuế & thuế lũy tiến là gì

> 💡 **Trực giác / Hình dung.** Thuế thu nhập **không** đánh một tỷ lệ phẳng lên toàn bộ thu nhập. Hãy hình dung thu nhập của bạn như nước rót vào nhiều **cái cốc xếp chồng**: cốc đầu (thu nhập thấp) chịu thuế suất thấp, nước tràn sang cốc cao hơn mới chịu suất cao hơn. Bạn **không** vì kiếm thêm 1 đồng mà toàn bộ thu nhập nhảy lên bậc cao — chỉ **phần** đồng đó rơi vào bậc mới chịu suất mới.

**Định nghĩa — Thuế lũy tiến từng phần (progressive marginal tax):**

- **(a) Là gì** — thu nhập chịu thuế được chia thành các **bậc**; mỗi bậc có một thuế suất, áp **chỉ cho phần thu nhập nằm trong bậc đó**.
- **(b) Vì sao thiết kế vậy** — để người thu nhập cao đóng tỷ lệ cao hơn (công bằng dọc), nhưng không tạo "vách đá" khi nhảy bậc.
- **(c) Biểu thuế TNCN Việt Nam (thu nhập tính thuế/tháng — đã trừ giảm trừ):**

| Bậc | Thu nhập tính thuế/tháng | Thuế suất |
|---|---|---|
| 1 | đến 5 triệu | 5% |
| 2 | trên 5–10 triệu | 10% |
| 3 | trên 10–18 triệu | 15% |
| 4 | trên 18–32 triệu | 20% |
| 5 | trên 32–52 triệu | 25% |
| 6 | trên 52–80 triệu | 30% |
| 7 | trên 80 triệu | 35% |

---

## 2. Tính thuế từng bậc — walk-through

> 💡 **Trực giác.** Tính thuế = "rót" thu nhập qua từng bậc, mỗi bậc lấy phần của nó.

**Walk-through bằng số thật (verify) — thu nhập tính thuế 30 triệu/tháng:**

| Bậc | Phần thu nhập trong bậc | Suất | Thuế phần này |
|---|---|---|---|
| 1 | 5 triệu (0→5) | 5% | 0,25 |
| 2 | 5 triệu (5→10) | 10% | 0,50 |
| 3 | 8 triệu (10→18) | 15% | 1,20 |
| 4 | 12 triệu (18→30) | 20% | 2,40 |
| **Tổng** | 30 triệu | | **4,35 triệu** |

→ Tổng thuế **4,35 triệu** trên 30 triệu thu nhập tính thuế.

- **Thuế suất biên** (bậc cuối chạm tới) $= 20\\%$ — suất áp cho đồng tiếp theo bạn kiếm.
- **Thuế suất trung bình (hiệu dụng)** $= 4{,}35 / 30 = 14{,}5\\%$ — tỷ lệ thực trên toàn bộ thu nhập.

**4 ví dụ số (thu nhập tính thuế/tháng):**

| TN tính thuế | Tổng thuế | Suất biên | Suất trung bình |
|---|---|---|---|
| 8 tr | $5{\\times}5\\% + 3{\\times}10\\% = 0{,}55$ | 10% | 6,9% |
| 18 tr | $0{,}25+0{,}5+1{,}2 = 1{,}95$ | 15% | 10,8% |
| 30 tr | 4,35 | 20% | 14,5% |
| 52 tr | $4{,}35 + 2{\\times}20\\%... $ → $0{,}25+0{,}5+1{,}2+2{,}8+5{,}0 = 9{,}75$ | 25% | 18,8% |

(Bậc 4 cho 30→32 là 2 triệu nữa: kiểm 52 tr: bậc1 0,25 + bậc2 0,5 + bậc3 1,2 + bậc4 (18→32=14tr ×20%)=2,8 + bậc5 (32→52=20tr ×25%)=5,0 = 9,75 ✓.)

> ⚠ **Lỗi thường gặp (RẤT phổ biến).** "Lương tôi nhảy lên bậc 20% nên giờ **cả** lương bị đánh 20%, kiếm thêm thành ra lỗ!" **Sai hoàn toàn.** Chỉ **phần** thu nhập vượt ngưỡng mới chịu 20%; phần dưới vẫn giữ suất thấp. Kiếm thêm **luôn** làm bạn cầm về nhiều hơn — không bao giờ có chuyện "lên bậc thành lỗ".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy con số nào quan trọng với tôi?"* — Hai con số cho hai mục đích: **suất biên** để quyết định "làm thêm/đầu tư thêm có đáng không" (đồng tiếp theo bị đánh bao nhiêu); **suất trung bình** để biết thực tế mất bao nhiêu % tổng thu nhập.
> - *"Vì sao suất trung bình luôn thấp hơn suất biên?"* — Vì các bậc đầu chịu suất thấp kéo trung bình xuống. Hai cái chỉ bằng nhau nếu toàn bộ thu nhập nằm trong bậc 1.

> 🔁 **Dừng lại tự kiểm tra.** Thu nhập tính thuế 12 triệu/tháng. Tính tổng thuế, suất biên, suất trung bình.
> <details><summary>Đáp án</summary>Bậc1 $5{\\times}5\\%=0{,}25$; bậc2 $5{\\times}10\\%=0{,}5$; bậc3 $(12{-}10){\\times}15\\%=0{,}3$. Tổng $=1{,}05$ tr. Suất biên 15%; trung bình $1{,}05/12 = 8{,}75\\%$.</details>

---

## 3. Suất biên vs trung bình — đường cong

> 💡 **Trực giác.** Khi thu nhập tăng, **suất biên** nhảy theo bậc (đường bậc thang), còn **suất trung bình** tăng **mượt** và luôn nằm **dưới** suất biên, tiệm cận suất bậc cao nhất nhưng không bao giờ chạm tới (vì luôn có phần thu nhập đầu chịu suất thấp).

**Ví dụ minh họa hành vi tiệm cận:** thu nhập cực cao (vd 500 triệu/tháng), suất biên = 35%, nhưng suất trung bình chỉ ~33% — vẫn dưới 35% dù rất gần, vì ~80 triệu đầu tiên chịu các suất 5–30%.

> 📝 **Ghi nhớ.** Suất trung bình ≤ suất biên, luôn luôn. "Lên bậc" chỉ tăng suất cho phần mới, không hồi tố phần cũ.

---

## 4. Lợi nhuận sau thuế & thực sau thuế

> 💡 **Trực giác.** Đầu tư lời 10%, nhưng nhà nước lấy một phần (thuế trên lãi/cổ tức), rồi lạm phát ăn tiếp. Con số cuối cùng quan trọng nhất là **lợi nhuận thực sau thuế**: sau khi trừ **cả** thuế **lẫn** lạm phát.

**Định nghĩa & công thức:**

- **Lợi nhuận sau thuế:** $r_{\\text{sau thuế}} = r \\times (1 - t)$, với $t$ = thuế suất trên lợi nhuận đầu tư.
- **Lợi nhuận thực sau thuế** (ghép phương trình Fisher ở Lesson 02):

$$r_{\\text{thực, sau thuế}} = \\frac{1 + r(1-t)}{1 + i} - 1$$

**Walk-through bằng số thật (verify) — đầu tư $r = 10\\%$, thuế lãi $t = 20\\%$, lạm phát $i = 6\\%$:**

$$r_{\\text{sau thuế}} = 10\\% \\times (1 - 0{,}2) = 8\\%$$
$$r_{\\text{thực, sau thuế}} = \\frac{1{,}08}{1{,}06} - 1 = 1{,}01887 - 1 = 1{,}89\\%$$

→ Lợi nhuận "10%" nghe hấp dẫn, nhưng sau thuế và lạm phát chỉ còn **1,89%** sức mua thật. Đây là con số quyết định tiền có thực sự lớn lên hay không.

**4 ví dụ số:**

| r | thuế t | lạm phát i | sau thuế | thực sau thuế |
|---|---|---|---|---|
| 10% | 20% | 6% | 8,0% | 1,89% |
| 8% | 10% | 4% | 7,2% | 3,08% |
| 12% | 25% | 8% | 9,0% | 0,93% |
| 6% | 0% | 5% | 6,0% | 0,95% |

> ❓ **Câu hỏi tự nhiên.** *"Thuế đầu tư ở Việt Nam thế nào?"* — Tùy loại: lãi gửi tiết kiệm cá nhân hiện được miễn thuế TNCN; chuyển nhượng chứng khoán đánh 0,1% trên giá trị bán; cổ tức 5%. Quy tắc chung của bài: **luôn quy lợi nhuận về sau-thuế-sau-lạm-phát** để so sánh trung thực, dù con số thuế cụ thể thay đổi theo luật.

> 📝 **Tóm tắt toàn bài.**
> - **Thuế lũy tiến từng phần**: mỗi bậc đánh suất riêng chỉ trên phần thu nhập trong bậc.
> - **Suất biên** (đồng tiếp theo) ≠ **suất trung bình** (toàn bộ); trung bình luôn ≤ biên. "Lên bậc" không bao giờ làm bạn lỗ.
> - **Lợi nhuận thực sau thuế** $= \\frac{1+r(1-t)}{1+i} - 1$ — thước đo cuối cùng, thường nhỏ hơn nhiều con số gộp ban đầu.

---

## Bài tập

1. **Tính thuế.** Thu nhập tính thuế 20 triệu/tháng. Tính tổng thuế, suất biên, suất trung bình.

2. **Hiểu suất biên.** Lương tính thuế đang 18 triệu, bạn được tăng 2 triệu (lên 20). Phần 2 triệu thêm bị đánh thuế bao nhiêu? Cầm về thực bao nhiêu? (Bác bỏ quan niệm "lên bậc thành lỗ".)

3. **Suất trung bình cao.** Thu nhập tính thuế 80 triệu/tháng. Tính tổng thuế và suất trung bình.

4. **Sau thuế.** Đầu tư lời 9%/năm, thuế trên lãi 15%. Lợi nhuận sau thuế?

5. **Thực sau thuế.** Tiếp bài 4, lạm phát 5%. Tính lợi nhuận thực sau thuế. Tiền có thực sự lớn lên không?

---

## Lời giải chi tiết

### Bài 1 — Tính thuế (20 triệu)

- Bậc 1: $5 \\times 5\\% = 0{,}25$
- Bậc 2: $5 \\times 10\\% = 0{,}50$
- Bậc 3: $8 \\times 15\\% = 1{,}20$
- Bậc 4: $(20-18) \\times 20\\% = 0{,}40$
- **Tổng $= 2{,}35$ triệu.** Suất biên 20%; suất trung bình $= 2{,}35/20 = 11{,}75\\%$.

### Bài 2 — Hiểu suất biên

- Tại 18 triệu, đồng tiếp theo rơi vào bậc 4 (18–32) → suất biên 20%.
- 2 triệu thêm bị đánh $2 \\times 20\\% = 0{,}4$ triệu thuế → cầm về $2 - 0{,}4 = 1{,}6$ triệu.
- → Vẫn **dương** (cầm thêm 1,6 triệu). Phần lương cũ (≤18 triệu) **không** bị đánh lại suất 20% — quan niệm "lên bậc thành lỗ" là sai.

### Bài 3 — Suất trung bình cao (80 triệu)

- Bậc 1: 0,25 · Bậc 2: 0,5 · Bậc 3: 1,2 · Bậc 4: $14{\\times}20\\%=2{,}8$ · Bậc 5: $20{\\times}25\\%=5{,}0$ · Bậc 6: $(80{-}52){\\times}30\\%=8{,}4$.
- **Tổng $= 0{,}25+0{,}5+1{,}2+2{,}8+5{,}0+8{,}4 = 18{,}15$ triệu.** Suất biên 30%; suất trung bình $= 18{,}15/80 = 22{,}7\\%$.
- Lưu ý suất trung bình (22,7%) vẫn thấp hơn nhiều suất biên (30%).

### Bài 4 — Sau thuế

$$r_{\\text{sau thuế}} = 9\\% \\times (1 - 0{,}15) = 9\\% \\times 0{,}85 = 7{,}65\\%$$

### Bài 5 — Thực sau thuế

$$r_{\\text{thực, sau thuế}} = \\frac{1 + 0{,}0765}{1 + 0{,}05} - 1 = \\frac{1{,}0765}{1{,}05} - 1 = 1{,}02524 - 1 = 2{,}52\\%$$

Cách tiếp cận: lời 9% gộp → sau thuế 7,65% → sau lạm phát còn **2,52%** sức mua thật. **Có**, tiền vẫn lớn lên thật (lợi nhuận thực dương), nhưng chỉ ~1/4 con số gộp ban đầu. Bài học: luôn nhìn con số thực sau thuế.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Máy tính thuế lũy tiến**: nhập thu nhập tính thuế → thanh chia màu từng bậc, tổng thuế, suất biên & suất trung bình.
  - **Đường cong biên vs trung bình**: vẽ hai đường theo thu nhập — biên (bậc thang) và trung bình (mượt, luôn dưới), thấy rõ vì sao "lên bậc không lỗ".
  - **Lợi nhuận thực sau thuế**: nhập lợi nhuận + thuế + lạm phát → bóc tách gộp → sau thuế → thực sau thuế.

---

## Kết thúc Tầng 1

Bạn đã hoàn thành **Tầng 1 — Tài chính cá nhân**: từ lãi kép, lạm phát, lãi suất, nợ, ngân sách, tiết kiệm, rủi ro tới thuế. Đây là nền tảng cho mọi quyết định tiền bạc.

→ **Tầng 2 — Đầu tư & thị trường** (đang phát triển): các lớp tài sản, định giá cổ phiếu & trái phiếu, rủi ro–lợi nhuận, đa dạng hóa danh mục, CAPM, thị trường hiệu quả, quỹ chỉ số.

**Tham khảo chéo:** lãi thực & Fisher [\`../lesson-02-inflation/\`](../lesson-02-inflation/) · thu nhập ròng cho ngân sách [\`../lesson-05-budgeting/\`](../lesson-05-budgeting/) · thuế ở góc nhìn kinh tế [\`../../../Economics/index.html\`](../../../Economics/index.html).
`;
