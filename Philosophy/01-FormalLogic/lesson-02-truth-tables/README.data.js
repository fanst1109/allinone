// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Philosophy/01-FormalLogic/lesson-02-truth-tables/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Liên từ & bảng chân lý

> **Tầng 1 — Formal Logic · Bài 2/8**

Bài trước ta đã biết mệnh đề (proposition) là phát biểu có giá trị chân lý T (đúng) hoặc F (sai). Bài này đặt câu hỏi tiếp theo: **khi ghép nhiều mệnh đề lại bằng các từ "và", "hoặc", "nếu... thì..."— kết quả đúng hay sai?** Không thể trả lời bằng cảm tính; logic hình thức đưa ra công cụ chính xác: **liên từ (connective)** và **bảng chân lý (truth table)**.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Định nghĩa và áp dụng đúng 5 liên từ cơ bản: ¬, ∧, ∨, →, ↔.
- Dựng bảng chân lý đầy đủ cho công thức bất kỳ với n biến (2ⁿ dòng).
- Liệt kê tổ hợp T/F theo thứ tự hệ thống (TT, TF, FT, FF).
- Áp dụng thứ tự ưu tiên toán tử: ¬ → ∧ → ∨ → → → ↔.
- Nhận biết hằng đúng (tautology) và hằng sai (contradiction) qua bảng chân lý.
- Tránh 3 lỗi kinh điển: "hoặc" loại trừ vs bao hàm, → không phải nhân quả, p→q đúng khi p sai.

## Kiến thức tiền đề

- Mệnh đề, ký hiệu T/F, biến mệnh đề → [Lesson 01 — Mệnh đề & chân lý](../lesson-01-propositions/).

---

## 1. Tổng quan: liên từ là gì?

> 💡 **Trực giác.** Trong tiếng Việt ta nói: *"Trời mưa **và** đường ngập"*, *"Tôi đi hoặc anh đi"*, *"Nếu học chăm thì thi đỗ"*. Những từ in đậm là **liên từ** — chúng ghép các mệnh đề đơn lại thành mệnh đề phức, và chân lý của mệnh đề phức **phụ thuộc hoàn toàn vào chân lý của từng thành phần**. Đây là nguyên lý cốt lõi của logic mệnh đề.

Một **liên từ logic** (logical connective) là phép toán nhận một hoặc hai giá trị chân lý làm đầu vào và cho ra một giá trị chân lý. Có **5 liên từ cơ bản**:

| Ký hiệu | Tên tiếng Anh | Đọc là | Số toán hạng |
|---------|---------------|--------|:---:|
| ¬ | Negation (NOT) | "không", "phủ định" | 1 |
| ∧ | Conjunction (AND) | "và", "hội" | 2 |
| ∨ | Disjunction (OR) | "hoặc", "tuyển" | 2 |
| → | Conditional (IF...THEN) | "nếu... thì", "kéo theo" | 2 |
| ↔ | Biconditional (IFF) | "khi và chỉ khi", "tương đương" | 2 |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Có chỉ 5 liên từ thôi không?"* — Về lý thuyết còn nhiều liên từ khác (XOR, NAND, NOR...), nhưng 5 liên từ trên đủ để biểu diễn mọi hàm chân lý. Thực ra chỉ cần ¬ và ∧ (hoặc ¬ và ∨) đã đủ — ta sẽ thấy ở bài tương đương.
> - *"Ký hiệu này có tiêu chuẩn không hay mỗi sách một kiểu?"* — Có chút khác biệt: → đôi khi viết ⊃; ↔ đôi khi viết ≡; ∧ đôi khi viết &; ∨ đôi khi viết |. Bài này dùng ký hiệu ISO/logic toán học phổ biến nhất.

> 📝 **Tóm tắt mục 1.** 5 liên từ cơ bản: ¬ (phủ định), ∧ (hội), ∨ (tuyển), → (kéo theo), ↔ (tương đương). Chân lý của công thức phức chỉ phụ thuộc chân lý của các thành phần.

---

## 2. Phủ định ¬ (NOT)

**(a) Là gì.** Phủ định của mệnh đề p, ký hiệu **¬p**, là mệnh đề có giá trị chân lý **ngược** với p. Nếu p đúng thì ¬p sai; nếu p sai thì ¬p đúng.

**(b) Vì sao cần.** Trong lập luận ta thường cần nói "điều ngược lại". ¬ cho phép nói chính xác điều đó và lập luận về nó một cách hình thức.

**(c) Bảng chân lý.**

| p | ¬p |
|:---:|:---:|
| T | F |
| F | T |

**(d) Ví dụ số cụ thể (≥ 4):**

- p = "Hà Nội là thủ đô Việt Nam" (T) → ¬p = "Hà Nội không phải thủ đô Việt Nam" → **F**
- p = "2 + 2 = 5" (F) → ¬p = "2 + 2 ≠ 5" → **T**
- p = "Tất cả số chẵn đều chia hết cho 4" (F) → ¬p = "Tồn tại số chẵn không chia hết cho 4" → **T**
- p = "π > 3" (T) → ¬p = "π ≤ 3" → **F**

> ⚠ **Lỗi thường gặp: ¬¬p khác p?** Sai — ¬¬p = p luôn luôn. Phủ định hai lần trở về ban đầu: ¬(¬T) = ¬F = T; ¬(¬F) = ¬T = F. Đây là luật **song phủ định (double negation)**.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho p = F. Tính ¬p, ¬(¬p), ¬(¬(¬p)).
> <details><summary>Đáp án</summary>
>
> ¬p = ¬F = **T**. ¬(¬p) = ¬T = **F**. ¬(¬(¬p)) = ¬F = **T**.
> Quy luật: phủ định lẻ lần → đảo; phủ định chẵn lần → giữ nguyên.
> </details>

> 📝 **Tóm tắt mục 2.** ¬p đảo chân lý: ¬T = F, ¬F = T. ¬¬p = p (song phủ định).

---

## 3. Hội ∧ (AND)

**(a) Là gì.** Hội của p và q, ký hiệu **p ∧ q**, đúng **khi và chỉ khi cả hai p và q đều đúng**. Chỉ cần một trong hai sai là kết quả sai.

**(b) Vì sao cần.** Ta cần nói "điều kiện kép": *"Để được vào đại học, học sinh phải thi đỗ VÀ nộp đủ hồ sơ"*. Cả hai điều kiện phải thỏa mãn đồng thời.

**(c) Bảng chân lý.**

| p | q | p ∧ q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | F |
| F | T | F |
| F | F | F |

**(d) Ví dụ số cụ thể (≥ 4):**

- p = "3 > 2" (T), q = "5 là số lẻ" (T) → p ∧ q = **T**
- p = "3 > 2" (T), q = "5 là số chẵn" (F) → p ∧ q = **F** (q sai làm cả biểu thức sai)
- p = "Mặt trăng làm bằng pho mát" (F), q = "2 + 2 = 4" (T) → p ∧ q = **F** (p sai)
- p = "Tôi đang ngủ" (F), q = "Tôi đang thức" (F) → p ∧ q = **F**

> ⚠ **Lỗi thường gặp: "và" trong tiếng Việt không phải lúc nào cũng là ∧.** Ví dụ: "Anh ấy vừa đến vừa đi ngay" — "vừa... vừa" có ý thời gian đồng thời, không chỉ là T∧T thuần túy. Logic hình thức chỉ quan tâm chân lý, không quan tâm thứ tự thời gian hay ngữ cảnh.

> 🔁 **Dừng lại tự kiểm tra.**
> Không cần biết nội dung cụ thể, chỉ biết p = T và q = F. Tính p ∧ q, ¬p ∧ q, p ∧ ¬q.
> <details><summary>Đáp án</summary>
>
> p ∧ q = T ∧ F = **F**. ¬p ∧ q = F ∧ F = **F**. p ∧ ¬q = T ∧ T = **T**.
> </details>

> 📝 **Tóm tắt mục 3.** p ∧ q = T chỉ khi cả hai T. Ba trường hợp còn lại đều F.

---

## 4. Tuyển ∨ (OR bao hàm — Inclusive OR)

**(a) Là gì.** Tuyển của p và q, ký hiệu **p ∨ q**, đúng khi **ít nhất một trong hai** p, q đúng. Chỉ sai khi **cả hai** đều sai.

**(b) Vì sao cần.** Diễn đạt lựa chọn không loại trừ: *"Để mượn sách, bạn phải có thẻ sinh viên hoặc thẻ giáo viên"* — có cả hai cũng được.

**(c) Bảng chân lý.**

| p | q | p ∨ q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | **T** |
| F | T | **T** |
| F | F | F |

**(d) Ví dụ số cụ thể (≥ 4):**

- p = "2 là số nguyên tố" (T), q = "3 là số nguyên tố" (T) → p ∨ q = **T**
- p = "2 là số lẻ" (F), q = "3 là số nguyên tố" (T) → p ∨ q = **T** (chỉ cần một đúng)
- p = "2 là số nguyên tố" (T), q = "4 là số lẻ" (F) → p ∨ q = **T**
- p = "2 là số lẻ" (F), q = "4 là số lẻ" (F) → p ∨ q = **F** (cả hai sai)

> ⚠ **Lỗi kinh điển: "hoặc" bao hàm (∨) vs "hoặc" loại trừ (XOR).**
> - Tiếng Việt hàng ngày thường dùng "hoặc" theo nghĩa **loại trừ**: "Ăn cơm hoặc ăn phở" → ngụ ý chọn một trong hai, không ăn cả hai.
> - Logic hình thức dùng ∨ theo nghĩa **bao hàm (inclusive)**: T∨T = **T**. Khi cả hai đều đúng, p ∨ q vẫn đúng.
> - XOR (loại trừ) = "đúng một trong hai, không phải cả hai": \`p ⊕ q = (p ∨ q) ∧ ¬(p ∧ q)\`.
> - **Mặc định khi gặp ∨ trong logic hình thức: LUÔN là bao hàm**. Nếu bài toán muốn loại trừ sẽ viết ⊕ hoặc XOR tường minh.

> 🔁 **Dừng lại tự kiểm tra.**
> p = F, q = F. Tính p ∨ q, ¬p ∨ q, p ∨ ¬p.
> <details><summary>Đáp án</summary>
>
> p ∨ q = F ∨ F = **F**. ¬p ∨ q = T ∨ F = **T**. p ∨ ¬p = F ∨ T = **T** (luôn đúng! — đây là tautology, sẽ gặp lại ở bài 3).
> </details>

> 📝 **Tóm tắt mục 4.** p ∨ q = F chỉ khi cả hai F. Ba trường hợp còn lại đều T. ∨ là "hoặc bao hàm" — khác với XOR.

---

## 5. Kéo theo → (Conditional, IF...THEN)

> 💡 **Trực giác.** *"Nếu trời mưa thì đường ướt."* Câu này tạo ra một cam kết: mỗi khi trời mưa (p đúng), đường phải ướt (q phải đúng). Nhưng khi trời **không** mưa, ta không cam kết gì về đường cả — đường có thể ướt (do ai tưới) hoặc khô đều không vi phạm câu trên. Đây chính là lý do p→q đúng khi p sai.

**(a) Là gì.** Kéo theo p → q ("nếu p thì q") sai **chỉ khi p đúng mà q sai**. Trong mọi trường hợp khác kết quả là đúng. p gọi là **giả thiết (antecedent/hypothesis)**, q gọi là **kết luận (consequent/conclusion)**.

**(b) Vì sao cần.** Đây là liên từ quan trọng nhất trong toán học và lập luận khoa học. Mọi định lý đều có dạng "nếu [điều kiện] thì [kết luận]". Cần hiểu chính xác khi nào một suy luận hợp lệ.

**(c) Bảng chân lý.**

| p | q | p → q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | **F** |
| F | T | **T** |
| F | F | **T** |

**(d) Ví dụ số cụ thể (≥ 4):**

- p = "2 là số chẵn" (T), q = "2 chia hết cho 2" (T) → p → q = **T** (đúng kết luận từ đúng giả thiết)
- p = "2 là số chẵn" (T), q = "2 là số lẻ" (F) → p → q = **F** (giả thiết đúng, kết luận sai → vi phạm cam kết)
- p = "3 là số chẵn" (F), q = "3 chia hết cho 2" (F) → p → q = **T** (*vacuously true*)
- p = "3 là số chẵn" (F), q = "3 là số nguyên tố" (T) → p → q = **T** (*vacuously true*)

> ⚠ **Lỗi kinh điển số 1: "p→q đúng khi p sai — vô lý quá?"**
> Đây là điểm gây nhầm lẫn nhiều nhất. Hãy hiểu thế này:
> p → q là một **cam kết** (promise): *"Nếu p xảy ra, thì q sẽ xảy ra."*
> - Khi p = F (giả thiết không xảy ra), cam kết **không bị kiểm tra** — ta không thể nói cam kết bị vi phạm. Trong logic, "không bị vi phạm" = "đúng". Người ta gọi đây là **vacuous truth** (đúng rỗng/đúng một cách tầm thường).
> - Ví dụ: "Nếu tôi được điểm 10, tôi sẽ mua pizza" — nếu tôi không được điểm 10 (p = F), câu đó không sai dù tôi có mua pizza hay không.

> ⚠ **Lỗi kinh điển số 2: → không phải nhân quả.**
> p → q hợp lệ về mặt hình thức kể cả khi p và q hoàn toàn không liên quan về nội dung. Ví dụ: p = "Mặt trăng bằng pho mát" (F), q = "2+2=4" (T) → p → q = **T** về mặt hình thức, dù hai câu không có quan hệ nhân quả. Logic hình thức chỉ xét **chân lý**, không xét **ý nghĩa** hay **quan hệ ngữ nghĩa**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"p→q và q→p có như nhau không?"* — Không. q→p là **đảo** (converse) của p→q; chúng không tương đương. Ví dụ: "Nếu mưa thì đường ướt" không có nghĩa là "Nếu đường ướt thì trời mưa" (đường có thể ướt vì lý do khác). Ta sẽ phân tích kỹ ở bài 3.
> - *"¬p→¬q thì sao?"* — Đó là **đảo phủ** (inverse), cũng không tương đương với p→q. Nhưng **¬q→¬p** (đối ngẫu/contrapositive) thì tương đương hoàn toàn.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho p = T, q = F. Tính p→q, q→p, ¬q→¬p.
> <details><summary>Đáp án</summary>
>
> p→q = T→F = **F**. q→p = F→T = **T**. ¬q→¬p = ¬F→¬T = T→F = **F**.
> Nhận xét: p→q = ¬q→¬p = F (đều sai). Đây không phải ngẫu nhiên — contrapositive luôn có cùng chân lý với điều kiện gốc.
> </details>

> 📝 **Tóm tắt mục 5.** p → q = F chỉ khi p=T và q=F. Khi p=F, kéo theo luôn đúng (vacuous truth). → không phải nhân quả; chỉ là quan hệ chân lý.

---

## 6. Tương đương ↔ (Biconditional, IFF)

**(a) Là gì.** Tương đương p ↔ q ("p khi và chỉ khi q") đúng khi **p và q có cùng giá trị chân lý** (cùng T hoặc cùng F). Sai khi p và q khác giá trị nhau.

**(b) Vì sao cần.** Diễn đạt điều kiện cần và đủ: *"Một số chia hết cho 2 khi và chỉ khi nó là số chẵn"*. Cả hai chiều phải đúng: → và ←.

**(c) Bảng chân lý.**

| p | q | p ↔ q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | F |
| F | T | F |
| F | F | **T** |

**(d) Ví dụ số cụ thể (≥ 4):**

- p = "4 là số chẵn" (T), q = "4 chia hết cho 2" (T) → p ↔ q = **T** (cùng T)
- p = "3 là số chẵn" (F), q = "3 chia hết cho 2" (F) → p ↔ q = **T** (cùng F — hai điều sai cùng nhau)
- p = "2 > 1" (T), q = "5 là số lẻ" (F) → p ↔ q = **F** (khác nhau)
- p = "Mặt trời mọc ở hướng Tây" (F), q = "2 + 2 = 5" (F) → p ↔ q = **T** (cùng F)

> ⚠ **Lỗi thường gặp: p↔q không cần p và q có liên quan nhau.**
> Ví dụ ④ trên: hai câu đều sai, vô nghĩa về nội dung, nhưng p↔q = T vì chúng **có cùng chân lý**. Lần nữa: logic hình thức xét chân lý, không xét nội dung.

> ⚠ **Lỗi thường gặp: p↔q = (p→q) ∧ (q→p)?**
> Đúng — đây là một tương đương quan trọng: \`p↔q = (p→q) ∧ (q→p)\`. Có thể verify bằng bảng chân lý (xem bài tập 3).

> 🔁 **Dừng lại tự kiểm tra.**
> Cho p = F, q = T. Tính p↔q và (p→q) ∧ (q→p).
> <details><summary>Đáp án</summary>
>
> p↔q = F↔T = **F** (khác nhau). (p→q) = F→T = T. (q→p) = T→F = F. (p→q)∧(q→p) = T∧F = **F**. Hai biểu thức cho cùng kết quả ✓.
> </details>

> 📝 **Tóm tắt mục 6.** p↔q = T khi cả hai cùng T hoặc cùng F. Tương đương với (p→q) ∧ (q→p).

---

## 7. Bảng chân lý đầy đủ: quy trình dựng bảng

> 💡 **Trực giác.** Để kiểm tra mọi tình huống có thể xảy ra với n biến, ta cần liệt kê tất cả tổ hợp T/F. n biến → **2ⁿ tổ hợp** (mỗi biến có 2 giá trị, độc lập với nhau). Giống như đếm nhị phân: n bit → 2ⁿ số.

### 7.1 Quy trình dựng bảng

1. **Xác định số biến**: đếm số biến phân biệt trong công thức (p, q, r...).
2. **Tạo 2ⁿ dòng**: liệt kê tổ hợp T/F theo thứ tự nhị phân:
   - 1 biến (p): TT, FF → 2 dòng: T, F
   - 2 biến (p, q): TT, TF, FT, FF → 4 dòng
   - 3 biến (p, q, r): TTT, TTF, TFT, TFF, FTT, FTF, FFT, FFF → 8 dòng
   - Quy tắc: cột trái đổi chậm nhất (nửa đầu T, nửa sau F); cột phải đổi nhanh nhất (xen kẽ T, F).
3. **Thêm cột cho từng công thức con** (tính từ trong ra ngoài, theo thứ tự ưu tiên).
4. **Cột cuối** là giá trị của toàn bộ công thức.

### 7.2 Thứ tự ưu tiên toán tử

Từ cao nhất đến thấp nhất:

| Ưu tiên | Toán tử | Ghi chú |
|:---:|:---:|---|
| 1 (cao nhất) | ¬ | Phủ định — tác dụng ngay lên toán hạng kế tiếp |
| 2 | ∧ | Hội |
| 3 | ∨ | Tuyển |
| 4 | → | Kéo theo |
| 5 (thấp nhất) | ↔ | Tương đương |

Ví dụ: \`p ∨ q → r\` được đọc là \`(p ∨ q) → r\`, không phải \`p ∨ (q → r)\`.

Ví dụ: \`¬p ∧ q ∨ r\` được đọc là \`((¬p) ∧ q) ∨ r\`.

> ⚠ **Luôn dùng ngoặc khi không chắc.** Thứ tự ưu tiên là quy ước — dùng ngoặc \`(p ∨ q) → r\` luôn rõ nghĩa hơn viết tắt, và không gây lỗi.

### 7.3 Ví dụ đầy đủ: bảng 8 dòng cho \`(p ∧ q) → r\`

3 biến p, q, r → 2³ = 8 dòng:

<div style="overflow-x:auto">

| p | q | r | p ∧ q | **(p ∧ q) → r** |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | T | **T** |
| T | T | F | T | **F** |
| T | F | T | F | **T** |
| T | F | F | F | **T** |
| F | T | T | F | **T** |
| F | T | F | F | **T** |
| F | F | T | F | **T** |
| F | F | F | F | **T** |

</div>

Walk-through dòng 2 (p=T, q=T, r=F):
- Bước 1: p ∧ q = T ∧ T = T
- Bước 2: (T) → r = T → F = **F** ← dòng duy nhất làm công thức sai

Walk-through dòng 3 (p=T, q=F, r=T):
- Bước 1: p ∧ q = T ∧ F = **F**
- Bước 2: (F) → r = F → T = **T** (vacuous truth: giả thiết sai)

### 7.4 Ví dụ: bảng cho \`¬(p ∨ q)\` — 4 dòng

<div style="overflow-x:auto">

| p | q | p ∨ q | ¬(p ∨ q) |
|:---:|:---:|:---:|:---:|
| T | T | T | **F** |
| T | F | T | **F** |
| F | T | T | **F** |
| F | F | F | **T** |

</div>

Nhận xét: ¬(p ∨ q) = T chỉ khi cả hai p, q đều F — khớp với Luật De Morgan: ¬(p ∨ q) = ¬p ∧ ¬q (sẽ chứng minh ở bài 3).

### 7.5 Ví dụ: bảng cho \`p → (q ∨ ¬r)\`

<div style="overflow-x:auto">

| p | q | r | ¬r | q ∨ ¬r | **p → (q ∨ ¬r)** |
|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | T | F | T | **T** |
| T | T | F | T | T | **T** |
| T | F | T | F | F | **F** |
| T | F | F | T | T | **T** |
| F | T | T | F | T | **T** |
| F | T | F | T | T | **T** |
| F | F | T | F | F | **T** |
| F | F | F | T | T | **T** |

</div>

Walk-through dòng 3 (p=T, q=F, r=T):
- ¬r = ¬T = F
- q ∨ ¬r = F ∨ F = F
- p → F = T → F = **F** ← duy nhất sai

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Cột trung gian có cần không?"* — Không bắt buộc, nhưng bỏ qua dễ nhầm. Với công thức phức tạp, luôn thêm cột trung gian cho từng công thức con.
> - *"4 biến thì bảng có 16 dòng — có cách nào ngắn hơn không?"* — Có, nhưng chỉ khi biết trước cấu trúc công thức (e.g., nếu biết tautology, không cần duyệt hết). Bài máy tính trong viz xử lý tự động cho bạn.

> 📝 **Tóm tắt mục 7.** n biến → 2ⁿ dòng. Liệt kê T/F theo thứ tự nhị phân. Tính từng cột con theo thứ tự ưu tiên: ¬ > ∧ > ∨ > → > ↔. Dùng ngoặc để tránh nhầm.

---

## 8. Hằng đúng và hằng sai

**(a) Hằng đúng (Tautology):** Công thức đúng trong **mọi** tổ hợp giá trị của các biến. Cột cuối của bảng chân lý toàn **T**.

Ví dụ: \`p ∨ ¬p\` — luật loại trừ trung gian (law of excluded middle):

| p | ¬p | p ∨ ¬p |
|:---:|:---:|:---:|
| T | F | **T** |
| F | T | **T** |

**(b) Hằng sai (Contradiction):** Công thức sai trong **mọi** tổ hợp. Cột cuối toàn **F**.

Ví dụ: \`p ∧ ¬p\` — luật phi mâu thuẫn (law of non-contradiction):

| p | ¬p | p ∧ ¬p |
|:---:|:---:|:---:|
| T | F | **F** |
| F | T | **F** |

**(c) Ngẫu nhiên (Contingency):** Công thức vừa có dòng T vừa có dòng F — như các ví dụ trong mục 7.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tautology có ích gì?"* — Rất ích lợi: trong chứng minh toán học, nếu ta chứng minh được một công thức là tautology, thì nó đúng vô điều kiện — không cần biết p, q cụ thể là gì. Đây là nền tảng của suy luận hình thức.
> - *"Làm sao biết ngay một công thức có phải tautology không mà không dựng bảng?"* — Câu hỏi hay! Bài 3 sẽ giới thiệu các luật tương đương giúp biến đổi công thức; bài 4 giới thiệu hệ thống suy diễn hình thức (formal proof) tránh phải dựng bảng.

> 📝 **Tóm tắt mục 8.** Tautology = luôn T (ví dụ: p ∨ ¬p). Contradiction = luôn F (ví dụ: p ∧ ¬p). Contingency = phụ thuộc giá trị biến.

---

## Bài tập

**Bài 1.** Dựng bảng chân lý đầy đủ cho công thức \`¬p ∨ q\`. Công thức này có phải tautology không?

**Bài 2.** Dựng bảng chân lý cho \`(p → q) ∧ (q → p)\`. So sánh cột kết quả với bảng chân lý của \`p ↔ q\`. Nhận xét gì?

**Bài 3.** Dựng bảng chân lý cho \`p → (p ∨ q)\`. Công thức này có phải tautology không?

**Bài 4.** Dựng bảng chân lý cho \`(p ∧ q) ∨ ¬p\`. Liệt kê các dòng làm công thức sai (nếu có).

**Bài 5.** Dựng bảng chân lý cho \`(p → q) → (¬p ∨ q)\`. Nhận xét kết quả.

---

## Lời giải chi tiết

### Bài 1: \`¬p ∨ q\`

2 biến → 4 dòng. Tính ¬p trước (ưu tiên cao nhất), sau đó ∨.

| p | q | ¬p | ¬p ∨ q |
|:---:|:---:|:---:|:---:|
| T | T | F | **T** (F ∨ T = T) |
| T | F | F | **F** (F ∨ F = F) |
| F | T | T | **T** (T ∨ T = T) |
| F | F | T | **T** (T ∨ F = T) |

Cột kết quả có cả T lẫn F → **không phải tautology** (contingency).

Nhận xét thú vị: so sánh với bảng p → q (mục 5) — hai bảng **giống nhau hoàn toàn**! Điều này có nghĩa \`¬p ∨ q\` và \`p → q\` là **tương đương logic** — một kết quả quan trọng sẽ gặp lại ở bài 3.

### Bài 2: \`(p → q) ∧ (q → p)\` vs \`p ↔ q\`

| p | q | p → q | q → p | (p→q) ∧ (q→p) | p ↔ q |
|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | T | T | **T** | **T** |
| T | F | F | T | **F** | **F** |
| F | T | T | F | **F** | **F** |
| F | F | T | T | **T** | **T** |

Hai cột cuối **giống nhau hoàn toàn** → \`(p → q) ∧ (q → p)\` và \`p ↔ q\` là tương đương logic. Nghĩa là: "p khi và chỉ khi q" = "p kéo theo q VÀ q kéo theo p". Đây là định nghĩa thực tế của ↔.

### Bài 3: \`p → (p ∨ q)\`

| p | q | p ∨ q | p → (p ∨ q) |
|:---:|:---:|:---:|:---:|
| T | T | T | **T** (T→T) |
| T | F | T | **T** (T→T) |
| F | T | T | **T** (F→T) |
| F | F | F | **T** (F→F = T, vacuous) |

Cột kết quả toàn T → **tautology**! Trực giác: nếu p đúng, thì "p hoặc bất cứ gì" cũng đúng — ta luôn có thể "thêm vào" bằng tuyển.

### Bài 4: \`(p ∧ q) ∨ ¬p\`

| p | q | p ∧ q | ¬p | (p ∧ q) ∨ ¬p |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | F | **T** (T ∨ F = T) |
| T | F | F | F | **F** (F ∨ F = F) ← |
| F | T | F | T | **T** (F ∨ T = T) |
| F | F | F | T | **T** (F ∨ T = T) |

Dòng duy nhất làm công thức sai: **p = T, q = F**. Có nghĩa: khi p đúng nhưng q sai, biểu thức (p∧q) = F, và ¬p = F, nên kết quả F.

### Bài 5: \`(p → q) → (¬p ∨ q)\`

Từ kết quả bài 1 ta đã biết \`¬p ∨ q\` có bảng giống \`p → q\`. Vậy bảng của \`(p → q) → (¬p ∨ q)\` sẽ có dạng \`X → X\` trong đó X là cùng một cột — và \`X → X\` luôn đúng!

Verify chính thức:

| p | q | p → q | ¬p ∨ q | (p→q) → (¬p∨q) |
|:---:|:---:|:---:|:---:|:---:|
| T | T | T | T | **T** (T→T) |
| T | F | F | F | **T** (F→F = T) |
| F | T | T | T | **T** (T→T) |
| F | F | T | T | **T** (T→T) |

Kết quả toàn T → **tautology**. Điều này phản ánh sự thật: \`p → q\` và \`¬p ∨ q\` là tương đương — một kéo theo kia (và ngược lại) là điều luôn đúng.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — **Máy dựng bảng chân lý tương tác**: nhập công thức (hỗ trợ ¬ ∧ ∨ → ↔), bấm nút chèn ký hiệu, máy tự sinh bảng 2ⁿ dòng, tô màu T/F, báo tautology/contradiction. Kèm bảng 5 liên từ cơ bản và các ví dụ dựng sẵn.

---

## Bài tiếp theo

→ **[Lesson 03 — Tương đương logic & các luật cơ bản](../lesson-03-equivalence-laws/)**: De Morgan, phân phối, hấp thụ — và cách dùng chúng để đơn giản hóa công thức mà không cần dựng bảng chân lý.

[⬆ Về tầng Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
`;
