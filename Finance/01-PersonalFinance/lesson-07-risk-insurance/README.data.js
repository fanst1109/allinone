// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Finance/01-PersonalFinance/lesson-07-risk-insurance/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Rủi ro & Bảo hiểm (Risk & Insurance)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **rủi ro tài chính** và đo nó bằng **giá trị kỳ vọng (expected value)** của tổn thất.
- Hiểu vì sao **bảo hiểm tồn tại**: cơ chế **gộp rủi ro (risk pooling)** và **luật số lớn (law of large numbers)**.
- Biết bảo hiểm được **định giá** thế nào (phí = kỳ vọng tổn thất + phụ phí).
- Quyết định **khi nào nên mua bảo hiểm** vs tự gánh, dựa trên quy mô và tần suất tổn thất.
- Hiểu vai trò của **mức miễn thường (deductible)**.

## Kiến thức tiền đề

- [Lesson 05 — quỹ khẩn cấp](../lesson-05-budgeting/): bảo hiểm và quỹ khẩn cấp đều là tấm đệm rủi ro.
- Xác suất & kỳ vọng cơ bản: [\`../../../Statistics/index.html\`](../../../Statistics/index.html).

---

## 1. Rủi ro & giá trị kỳ vọng của tổn thất

> 💡 **Trực giác / Hình dung.** "Rủi ro" tài chính không phải chỉ là "điều xấu", mà là **sự bất định** về kết quả tiền bạc. Xe của bạn có thể cả đời không sao, hoặc tai nạn mất 200 triệu. Để ra quyết định, ta cần một con số gói cả xác suất lẫn mức độ: **giá trị kỳ vọng** của tổn thất.

**Định nghĩa — Giá trị kỳ vọng của tổn thất (expected loss):**

- **(a) Là gì** — trung bình tổn thất nếu tình huống lặp lại vô số lần: $E[L] = \\sum (\\text{xác suất}_i \\times \\text{tổn thất}_i)$.
- **(b) Vì sao cần** — cho phép so sánh "rủi ro hiếm-nhưng-lớn" với "phí bảo hiểm chắc chắn-nhưng-nhỏ" trên cùng thước đo.
- **(c) Walk-through bằng số thật:** xe trị giá 200 triệu, xác suất mất trắng trong năm là 1% (0,01):

$$E[L] = 0{,}01 \\times 200 + 0{,}99 \\times 0 = 2 \\text{ triệu/năm}$$

Tức trung bình mỗi năm "đáng lẽ" mất 2 triệu vì rủi ro này — dù thực tế hoặc mất 0, hoặc mất 200.

**4 ví dụ số:**

| Rủi ro | Xác suất | Tổn thất | $E[L]$ |
|---|---|---|---|
| Cháy nhà | 0,3% | 1.000 tr | 3,0 tr |
| Tai nạn xe | 1% | 200 tr | 2,0 tr |
| Mất điện thoại | 5% | 20 tr | 1,0 tr |
| Viện phí lớn | 2% | 500 tr | 10,0 tr |

> ⚠ **Lỗi thường gặp.** Đánh giá rủi ro chỉ bằng xác suất ("hiếm lắm, kệ đi") hoặc chỉ bằng mức độ ("to quá, phải lo"). Phải nhân **cả hai**: rủi ro hiếm-nhưng-thảm khốc (cháy nhà) vẫn cần xử lý.

> 🔁 **Dừng lại tự kiểm tra.** Xác suất hỏng máy 4%/năm, sửa hết 15 triệu. Kỳ vọng tổn thất năm?
> <details><summary>Đáp án</summary>$E[L] = 0{,}04 \\times 15 = 0{,}6$ triệu/năm.</details>

---

## 2. Vì sao bảo hiểm tồn tại — Gộp rủi ro & Luật số lớn

> 💡 **Trực giác / Hình dung.** Một mình bạn không chịu nổi cú mất 200 triệu (hiếm nhưng thảm). Nhưng nếu **10.000 người** cùng góp một ít vào quỹ chung, thì mỗi năm chỉ ~100 người (1%) gặp nạn, và quỹ chung thừa sức bồi thường. Mỗi người đổi **một tổn thất lớn-bất định** lấy **một khoản phí nhỏ-chắc chắn**. Đó là toàn bộ phép màu của bảo hiểm: **gộp rủi ro**.

**Định nghĩa — Gộp rủi ro (risk pooling):**

- **(a) Là gì** — gom rủi ro của nhiều cá nhân độc lập vào một quỹ chung; tổn thất ngẫu nhiên của số ít được chi trả từ phí của số đông.
- **(b) Vì sao hiệu quả** — **luật số lớn**: khi số người tham gia càng lớn, **tỷ lệ** người gặp nạn càng tiến sát xác suất lý thuyết, nên **tổng** tổn thất của quỹ trở nên **dự đoán được**. Cái bất định với cá nhân trở thành cái chắc chắn với tập thể.
- **(c) Walk-through bằng số thật:** 10.000 người, mỗi người xe 200 triệu, xác suất mất 1%:

- Kỳ vọng số người gặp nạn $= 10.000 \\times 1\\% = 100$ người/năm.
- Tổng bồi thường kỳ vọng $= 100 \\times 200 = 20.000$ triệu = 20 tỷ.
- Chia đều cho 10.000 người: $20.000/10.000 = 2$ triệu/người = đúng bằng $E[L]$ cá nhân.

→ Mỗi người trả **2 triệu chắc chắn** thay vì ôm rủi ro **1% mất 200 triệu**. Cùng kỳ vọng, nhưng **phương sai (độ bất định) gần như biến mất** với quỹ — đó là giá trị bảo hiểm tạo ra.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao gộp lại làm rủi ro giảm?"* — Không phải rủi ro biến mất, mà **độ dao động của tổng** giảm tương đối khi số người tăng (luật số lớn). Quỹ gần như chắc chắn chi ~20 tỷ/năm; một cá nhân thì hoặc 0 hoặc 200 triệu.
> - *"Rủi ro phải độc lập mới gộp được?"* — Đúng. Bảo hiểm hoạt động tốt khi tổn thất **độc lập** (tai nạn xe ngẫu nhiên). Với rủi ro **tương quan** (động đất phá cả vùng cùng lúc, khủng hoảng tài chính), nhiều người mất cùng lúc → quỹ có thể vỡ. Đây là lý do một số rủi ro khó bảo hiểm.

> 🔁 **Dừng lại tự kiểm tra.** 5.000 người, xác suất cháy 0,4%, thiệt hại 500 triệu. Kỳ vọng số vụ/năm? Phí thuần mỗi người?
> <details><summary>Đáp án</summary>Số vụ $= 5000 \\times 0{,}4\\% = 20$; tổng bồi thường $= 20 \\times 500 = 10.000$ tr; phí thuần $= 10.000/5000 = 2$ triệu/người (= $0{,}004 \\times 500$).</details>

---

## 3. Bảo hiểm được định giá thế nào (Premium)

> 💡 **Trực giác.** Phí bảo hiểm bạn trả **luôn cao hơn** kỳ vọng tổn thất một chút — phần dôi ra trả cho chi phí vận hành, dự phòng và lợi nhuận của hãng bảo hiểm. Phần này gọi là **phụ phí (loading)**.

**Định nghĩa — Cấu trúc phí bảo hiểm:**

$$\\text{Phí} = \\underbrace{E[L]}_{\\text{phí thuần (pure premium)}} + \\underbrace{\\text{phụ phí}}_{\\text{chi phí + dự phòng + lợi nhuận}}$$

**Walk-through (verify) — $E[L] = 2$ triệu, phụ phí 30%:**

$$\\text{Phí} = 2 \\times (1 + 0{,}30) = 2{,}6 \\text{ triệu/năm}$$

> ❓ **Câu hỏi tự nhiên.**
> - *"Vậy mua bảo hiểm là 'lỗ' về kỳ vọng?"* — Đúng, về **giá trị kỳ vọng thuần** bạn trả 2,6 để bù rủi ro chỉ đáng 2 → kỳ vọng âm 0,6. Nhưng bạn **mua sự an tâm**: loại bỏ kịch bản thảm khốc làm phá sản. Giống Lesson 02 quỹ khẩn cấp — chấp nhận thiệt nhỏ chắc chắn để tránh thảm họa hiếm.
> - *"Sao có người vẫn không mua?"* — Vì với tổn thất **nhỏ** (điện thoại 20 triệu), bạn tự gánh được → không đáng trả phụ phí. Bảo hiểm chỉ "đáng tiền" cho tổn thất **lớn tới mức phá sản** (mục 4).

> ⚠ **Lỗi thường gặp.** So bảo hiểm với đánh bạc và bảo "cả hai EV âm như nhau". Khác về **mục đích**: đánh bạc **tăng** phương sai (thêm bất định để mong trúng lớn); bảo hiểm **giảm** phương sai (bỏ bất định để an toàn). Cùng EV âm nhỏ, ngược chiều rủi ro.

---

## 4. Khi nào nên mua bảo hiểm

> 💡 **Trực giác.** Quy tắc vàng: **bảo hiểm cho thứ bạn KHÔNG tự gánh nổi, tự gánh thứ bạn gánh được.** Tổn thất lớn-tới-mức-phá-sản → mua. Tổn thất nhỏ-thường-xuyên → tự gánh (vì phụ phí làm bảo hiểm không đáng).

**Lưới quyết định (tổn thất × khả năng tự gánh):**

| | Tổn thất nhỏ | Tổn thất lớn (phá sản) |
|---|---|---|
| **Thường xuyên** | Tự gánh (phụ phí ăn hết lợi) | Tránh/giảm rủi ro (bảo hiểm rất đắt) |
| **Hiếm** | Tự gánh (không đáng phí) | **MUA BẢO HIỂM** ✓ (đúng vùng) |

→ Vùng "MUA": tổn thất **hiếm nhưng thảm khốc** (cháy nhà, viện phí lớn, tử vong trụ cột gia đình). Đây chính là nơi gộp rủi ro phát huy mạnh nhất.

**Mức miễn thường (deductible):**

- **(a) Là gì** — phần tổn thất đầu tiên bạn tự chịu trước khi bảo hiểm chi trả (vd deductible 5 triệu: tổn thất 30 triệu thì bạn trả 5, hãng trả 25).
- **(b) Vì sao có** — chuyển các vụ **nhỏ-thường-xuyên** về cho bạn tự gánh → hãng đỡ chi phí xử lý vặt → **phí thấp hơn**. Bạn giữ bảo hiểm cho vụ lớn.
- **(c) Ví dụ** — chọn deductible cao (tự gánh nhiều hơn) → phí rẻ hơn; phù hợp khi bạn có quỹ khẩn cấp đỡ được phần đầu.

> 📝 **Tóm tắt toàn bài.**
> - **Kỳ vọng tổn thất** $E[L] = \\sum p_i L_i$ — gói cả xác suất lẫn mức độ.
> - **Gộp rủi ro + luật số lớn**: đổi tổn thất lớn-bất định lấy phí nhỏ-chắc chắn; tổng của quỹ dự đoán được.
> - **Phí** = $E[L]$ + phụ phí → kỳ vọng hơi âm cho người mua, đổi lấy **giảm phương sai**.
> - **Mua bảo hiểm** cho tổn thất **hiếm nhưng phá sản**; tự gánh tổn thất nhỏ. **Deductible** hạ phí bằng cách bạn gánh phần nhỏ đầu.

---

## Bài tập

1. **Kỳ vọng tổn thất.** Xác suất trộm xe máy 3%/năm, xe trị giá 40 triệu. Tính $E[L]$.

2. **Phí thuần qua pooling.** 8.000 người, xác suất tai nạn 1,5%, bồi thường 150 triệu. Tính số vụ kỳ vọng, tổng bồi thường, phí thuần/người.

3. **Phí có phụ phí.** $E[L] = 3$ triệu, phụ phí 25%. Tính phí phải đóng. Về kỳ vọng, người mua "thiệt" bao nhiêu?

4. **Quyết định mua.** Hai rủi ro: (A) mất điện thoại, p=8%, tổn thất 15 triệu; (B) cháy nhà, p=0,2%, tổn thất 1.500 triệu. Bạn có quỹ khẩn cấp 50 triệu. Nên bảo hiểm cái nào? Vì sao?

5. **Deductible.** Bảo hiểm có deductible 5 triệu. Một vụ tổn thất 30 triệu. Bạn trả bao nhiêu, hãng trả bao nhiêu?

---

## Lời giải chi tiết

### Bài 1 — Kỳ vọng tổn thất

$$E[L] = 0{,}03 \\times 40 = 1{,}2 \\text{ triệu/năm}$$

### Bài 2 — Pooling

- Số vụ kỳ vọng $= 8000 \\times 1{,}5\\% = 120$ vụ.
- Tổng bồi thường $= 120 \\times 150 = 18.000$ triệu.
- Phí thuần/người $= 18.000 / 8000 = 2{,}25$ triệu (= $0{,}015 \\times 150$).

Cách tiếp cận: phí thuần đúng bằng kỳ vọng tổn thất cá nhân; pooling không đổi kỳ vọng mà làm tổng quỹ dự đoán được.

### Bài 3 — Phí có phụ phí

- Phí $= 3 \\times 1{,}25 = 3{,}75$ triệu.
- "Thiệt" kỳ vọng $= 3{,}75 - 3 = 0{,}75$ triệu — đây là giá của sự an tâm (loại bỏ kịch bản thảm khốc).

### Bài 4 — Quyết định mua

- **(A) điện thoại:** $E[L] = 0{,}08 \\times 15 = 1{,}2$ tr/năm; tổn thất tối đa 15 triệu < quỹ khẩn cấp 50 triệu → **tự gánh được**, không nên trả phụ phí cho rủi ro nhỏ.
- **(B) cháy nhà:** $E[L] = 0{,}002 \\times 1500 = 3$ tr/năm; tổn thất 1.500 triệu **vượt xa** khả năng tự gánh (50 triệu) → **phá sản nếu xảy ra** → **NÊN MUA**.

Cách tiếp cận: dùng lưới "hiếm × phá sản". B nằm đúng vùng "mua bảo hiểm"; A nằm vùng "tự gánh". Quy tắc: bảo hiểm thứ không tự gánh nổi.

### Bài 5 — Deductible

- Bạn trả phần đầu $= 5$ triệu (deductible).
- Hãng trả phần còn lại $= 30 - 5 = 25$ triệu.

Cách tiếp cận: deductible là phần tổn thất đầu tiên người mua tự chịu; đổi lại phí định kỳ rẻ hơn.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Mô phỏng gộp rủi ro (pooling)**: chọn số người, xác suất, mức tổn thất → "tung xúc xắc" cho cả nhóm, thấy tổn thất cá nhân nhảy lung tung 0/lớn, còn **tổng quỹ** hội tụ về kỳ vọng khi số người tăng (luật số lớn).
  - **Máy tính phí bảo hiểm**: nhập xác suất + tổn thất + phụ phí → phí thuần, phí đóng, "thiệt" kỳ vọng.
  - **Lưới quyết định mua**: kéo tổn thất & tần suất → ô sáng lên báo "mua / tự gánh / tránh".

---

## Bài tiếp theo

→ [Lesson 08 — Thuế cơ bản](../lesson-08-taxes/): thuế thu nhập lũy tiến hoạt động thế nào, phân biệt thuế suất biên vs trung bình, và tác động của thuế lên lợi nhuận đầu tư thực.

**Tham khảo chéo:** kỳ vọng & xác suất [\`../../../Statistics/index.html\`](../../../Statistics/index.html) · quỹ khẩn cấp (đệm rủi ro) [\`../lesson-05-budgeting/\`](../lesson-05-budgeting/).
`;
