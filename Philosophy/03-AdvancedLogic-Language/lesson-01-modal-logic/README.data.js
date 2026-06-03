// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Philosophy/03-AdvancedLogic-Language/lesson-01-modal-logic/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Logic modal (Modal Logic)

> **Tầng 3 — Advanced Logic & Language · Bài 1/8**

Logic modal mở rộng logic mệnh đề cổ điển bằng cách bổ sung hai toán tử đặc biệt: **□** (tất yếu — *necessarily*) và **◇** (khả dĩ — *possibly*). Trong logic cổ điển, ta chỉ hỏi "câu này đúng hay sai?" — nhưng trong thực tế, có những điều không chỉ đúng mà còn *bắt buộc phải đúng*, và có những điều chưa đúng nhưng *có thể đúng*. Logic modal cho phép lý luận chính xác về những phân biệt tinh tế này: từ toán học đến vật lý, từ nhận thức đến đạo đức.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Định nghĩa và phân biệt toán tử □ (tất yếu) và ◇ (khả dĩ), đọc được công thức modal.
- Giải thích ngữ nghĩa thế giới khả dĩ (Kripke semantics): tập thế giới W, quan hệ truy cập R.
- Tính giá trị □p và ◇p tại một thế giới w dựa trên đồ thị Kripke.
- Phát biểu và vận dụng đối ngẫu: □p ≡ ¬◇¬p; ◇p ≡ ¬□¬p.
- Phân biệt bốn loại tất yếu: logic, vật lý, nhận thức (epistemic), nghĩa vụ (deontic).
- Nhận biết sự khác biệt giữa *de re* và *de dicto* ở mức cơ bản.
- Nhận diện lỗi thường gặp khi sử dụng toán tử modal.

## Kiến thức tiền đề

- **[Lesson 02 — Bảng chân lý & liên từ logic](../../01-FormalLogic/lesson-02-truth-tables/)**: Bạn cần nắm vững các liên từ ¬, ∧, ∨, →, ↔ và bảng chân lý trước khi học thêm toán tử modal.
- **[Lesson 05 — Logic vị từ (Predicate Logic)](../../01-FormalLogic/lesson-05-predicate-logic/)**: Logic modal thường được kết hợp với logic vị từ để xử lý câu chứa đối tượng và thuộc tính. Nắm logic vị từ giúp hiểu sâu hơn phân biệt *de re / de dicto*.

---

## 1. Tại sao cần logic modal?

> 💡 **Trực giác.** Xem xét hai câu: (A) "2 + 2 = 4" và (B) "Hôm nay trời nắng". Cả hai có thể là mệnh đề đúng — nhưng chúng khác nhau sâu sắc: câu A *không thể nào sai* dù ở bất kỳ hoàn cảnh nào; câu B hoàn toàn có thể sai vào ngày khác. Logic cổ điển không phân biệt được hai loại "đúng" này. Logic modal được tạo ra để nắm bắt chính xác sự phân biệt đó.

Logic mệnh đề cổ điển chỉ phân biệt ĐÚNG và SAI, không có khái niệm **mức độ tất yếu**. Nhưng trong ngôn ngữ hàng ngày và triết học, ta thường phân biệt:

- **Tất yếu** (necessarily): "Không thể nào khác được" — "Hình vuông bắt buộc có 4 cạnh."
- **Khả dĩ** (possibly): "Có thể xảy ra, nhưng không bắt buộc" — "Có thể tồn tại sự sống trên sao Hỏa."
- **Ngẫu nhiên** (contingently true): Đúng trong thực tế nhưng có thể sai trong hoàn cảnh khác — "Nước sôi ở 100°C (ở áp suất chuẩn)".

Logic modal bổ sung hai toán tử vào ngôn ngữ của logic:

| Ký hiệu | Tên | Đọc là | Nghĩa |
|:---:|---|---|---|
| **□** | Toán tử tất yếu | "tất yếu", "nhất thiết", "necessarily" | p đúng ở **mọi** thế giới khả dĩ |
| **◇** | Toán tử khả dĩ | "có thể", "khả dĩ", "possibly" | p đúng ở **ít nhất một** thế giới khả dĩ |

**Ví dụ đọc công thức (≥ 4):**

| Công thức | Đọc | Nghĩa |
|---|---|---|
| □p | "Tất yếu p" | p đúng ở mọi thế giới khả dĩ |
| ◇p | "Có thể p" | p đúng ở ít nhất một thế giới khả dĩ |
| □(p → q) | "Tất yếu: nếu p thì q" | Mối quan hệ p→q giữ ở mọi thế giới |
| ◇¬p | "Có thể không-p" | Tồn tại thế giới mà p sai |
| □p → p | "Nếu tất yếu p thì p" | Điều tất yếu đúng thì phải thực sự đúng |
| ¬□¬p | "Không tất yếu không-p" | Tương đương ◇p (đối ngẫu) |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Thế giới khả dĩ" nghĩa là gì — có thực không?* — Đây là khái niệm công cụ, không phải tuyên bố siêu hình. Mỗi "thế giới khả dĩ" là một cách mà mọi thứ có thể tồn tại — một tình huống giả định hoàn chỉnh. Khi nói "có thể trời mưa mai", ta hình dung một tình huống (thế giới) mà trong đó trời mưa vào ngày mai. Mục 2 sẽ làm rõ bằng đồ thị cụ thể.
> - *Tại sao phải học logic modal — không đủ với đúng/sai thông thường?* — Logic cổ điển không phân biệt được "p đúng vì tình cờ" và "p đúng vì bắt buộc". Điều này quan trọng trong: toán học (định lý là tất yếu, không phải ngẫu nhiên), đạo đức học (nghĩa vụ và sự cho phép), nhận thức luận (điều tôi *biết* khác điều tôi *tin*), và ngôn ngữ học.

> ⚠ **Lỗi thường gặp: nhầm "khả dĩ" với "thực tế xảy ra".** ◇p (có thể p) *không* có nghĩa là p đang xảy ra trong thực tế. "Có thể trời mưa mai" — đây là ◇(trời mưa mai), đúng ngay cả khi thực tế mai không mưa. ◇p chỉ nói: *tồn tại ít nhất một tình huống* (thế giới khả dĩ) mà trong đó p đúng. Thực tế có thể là p sai hoàn toàn ở thế giới hiện tại.

> 🔁 **Dừng lại tự kiểm tra.** Phân loại mỗi câu sau:
> 1. "Tất yếu 2 + 2 = 4" — công thức modal nào?
> 2. "Có thể tồn tại hành tinh khác có sự sống" — công thức modal nào?
> 3. "Không thể có số nguyên tố lớn nhất" — diễn đạt bằng □ hoặc ◇?
>
> <details><summary>Đáp án</summary>
>
> 1. □(2 + 2 = 4) — tất yếu, đúng ở mọi thế giới khả dĩ.
> 2. ◇(tồn tại hành tinh có sự sống) — khả dĩ, đúng ở ít nhất một thế giới.
> 3. □¬(tồn tại số nguyên tố lớn nhất) — tất yếu không có số nguyên tố lớn nhất, hoặc tương đương: ¬◇(tồn tại số nguyên tố lớn nhất).
> </details>

> 📝 **Tóm tắt mục 1.**
> - Logic modal bổ sung □ (tất yếu) và ◇ (khả dĩ) vào logic cổ điển.
> - □p = p đúng ở *mọi* thế giới khả dĩ; ◇p = p đúng ở *ít nhất một* thế giới khả dĩ.
> - "Khả dĩ" ≠ "thực tế xảy ra" — ◇p có thể đúng ngay cả khi p sai trong thực tế.

---

## 2. Ngữ nghĩa thế giới khả dĩ (Kripke semantics)

> 💡 **Trực giác.** Hình dung một đồ thị trong đó mỗi nút là một "kịch bản" (situation), và các mũi tên nối kịch bản này với kịch bản khác theo quan hệ "có thể truy cập được từ đây". Khi đứng ở kịch bản w, bạn có thể "nhìn thấy" những kịch bản mà w trỏ tới. □p tại w nghĩa là: p đúng ở *mọi* kịch bản mà w nhìn thấy. ◇p tại w nghĩa là: p đúng ở *ít nhất một* kịch bản mà w nhìn thấy.

**Mô hình Kripke (Kripke model)** gồm ba thành phần:

- **W** — tập hợp các **thế giới khả dĩ** (possible worlds): W = {w₁, w₂, w₃, ...}
- **R** — **quan hệ truy cập** (accessibility relation): R ⊆ W × W. Viết wRw' để chỉ "từ thế giới w, thế giới w' có thể truy cập được".
- **V** — **hàm định giá** (valuation function): V(p, w) ∈ {T, F} cho biết mệnh đề p có đúng tại thế giới w không.

**Định nghĩa chính xác của □ và ◇:**

> Cho mô hình (W, R, V) và thế giới w ∈ W:
> - **□p đúng tại w** khi và chỉ khi: với *mọi* w' ∈ W mà wRw', ta có V(p, w') = T.
> - **◇p đúng tại w** khi và chỉ khi: *tồn tại ít nhất một* w' ∈ W mà wRw' và V(p, w') = T.

**Ví dụ tính toán cụ thể với đồ thị Kripke:**

Xét mô hình có 4 thế giới: W = {w₁, w₂, w₃, w₄}

Quan hệ truy cập: w₁Rw₂, w₁Rw₃, w₂Rw₄, w₃Rw₄ (vẽ mũi tên: w₁→w₂, w₁→w₃, w₂→w₄, w₃→w₄)

Giá trị mệnh đề p tại từng thế giới: V(p, w₁) = F, V(p, w₂) = T, V(p, w₃) = F, V(p, w₄) = T

**Tính □p và ◇p tại từng thế giới:**

| Thế giới | V(p, w) | Thế giới truy cập được | □p tại w? | ◇p tại w? |
|:---:|:---:|---|:---:|:---:|
| w₁ | F | {w₂, w₃}: p=T tại w₂, p=F tại w₃ | **F** (w₃ có p=F) | **T** (w₂ có p=T) |
| w₂ | T | {w₄}: p=T tại w₄ | **T** (mọi thế giới truy cập được đều có p=T) | **T** |
| w₃ | F | {w₄}: p=T tại w₄ | **T** (mọi thế giới truy cập được đều có p=T) | **T** |
| w₄ | T | {} (không có thế giới nào truy cập được) | **T** (vacuously true — không có thế giới nào vi phạm) | **F** (không có thế giới nào truy cập được) |

> ⚠ **Trường hợp đặc biệt: □p tại thế giới không có thế giới nào truy cập được.** Nếu w không có thế giới nào truy cập được (không có mũi tên đi ra), thì □p đúng *vacuously* (chân lý hiển nhiên — vì không có phản ví dụ). Đồng thời ◇p sai (không tìm được thế giới nào để p đúng). Đây là điều kỳ lạ nhưng nhất quán với định nghĩa.

> ⚠ **□p không tự động làm p đúng tại w.** Xem w₃ ở trên: □p đúng tại w₃ (vì mọi thế giới truy cập từ w₃, tức {w₄}, đều có p=T), nhưng V(p, w₃) = F. Hệ tiên đề T (□p → p) được thêm vào khi ta muốn phản ánh: "điều tất yếu thì thực sự đúng" — trong hệ K cơ bản, điều này chưa được đảm bảo.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *Quan hệ truy cập R có ý nghĩa gì thực tế?* — Tùy cách diễn giải logic modal. Với modal nhận thức (epistemic): wRw' nghĩa là "từ thế giới w, tôi không thể phân biệt w và w' dựa trên điều tôi biết" — tức w' là một thế giới nhất quán với mọi điều tôi biết ở w. Với modal nghĩa vụ (deontic): wRw' nghĩa là "w' là một thế giới lý tưởng về mặt đạo đức có thể đạt được từ w".
> - *Tại sao cần quan hệ R thay vì đơn giản là "mọi thế giới"?* — Nếu □p phải đúng ở *mọi* thế giới trong W, logic trở nên quá chặt (□p sẽ rất hiếm khi đúng). Quan hệ R cho phép "thu hẹp" phạm vi: □p tại w chỉ cần đúng ở những thế giới *liên quan* đến w theo nghĩa của R. Điều này linh hoạt hơn nhiều.

> 🔁 **Dừng lại tự kiểm tra.** Xét mô hình: W = {a, b, c}; aRb, aRc, bRc; V(p, a) = T, V(p, b) = F, V(p, c) = T.
> 1. □p tại a là T hay F?
> 2. ◇p tại b là T hay F?
> 3. □p tại b là T hay F?
>
> <details><summary>Đáp án</summary>
>
> 1. Thế giới truy cập từ a: {b, c}. V(p, b) = F → □p tại a = **F** (có một thế giới truy cập được mà p sai).
> 2. Thế giới truy cập từ b: {c}. V(p, c) = T → ◇p tại b = **T** (có một thế giới truy cập được mà p đúng).
> 3. Thế giới truy cập từ b: {c}. V(p, c) = T → mọi thế giới truy cập được đều có p=T → □p tại b = **T**.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Mô hình Kripke = (W, R, V): tập thế giới + quan hệ truy cập + hàm định giá.
> - □p tại w = T khi *mọi* thế giới truy cập từ w đều có p = T.
> - ◇p tại w = T khi *tồn tại ít nhất một* thế giới truy cập từ w có p = T.
> - Thế giới không có gì truy cập được: □p tự động T, ◇p tự động F.

---

## 3. Đối ngẫu □ và ◇

> 💡 **Trực giác.** Quan hệ giữa □ và ◇ hoàn toàn tương tự quan hệ giữa ∀ và ∃ trong logic vị từ: "Mọi x thỏa P(x)" tương đương "Không tồn tại x không thỏa P(x)". Tương tự: "Tất yếu p" tương đương "Không thể không-p".

**Hai quy luật đối ngẫu (modal duality laws):**

$$\\Box p \\equiv \\neg\\Diamond\\neg p \\qquad \\Diamond p \\equiv \\neg\\Box\\neg p$$

**Đọc và hiểu:**
- **□p ≡ ¬◇¬p**: "Tất yếu p" *tương đương* "Không thể (không-p)". Tức là: p đúng ở mọi thế giới tương đương không có thế giới nào mà p sai.
- **◇p ≡ ¬□¬p**: "Có thể p" *tương đương* "Không tất yếu (không-p)". Tức là: tồn tại thế giới p đúng tương đương không phải mọi thế giới đều có p sai.

**Xác minh bằng ví dụ số cụ thể — Ví dụ 1:**

Mô hình: W = {w₁, w₂}, w₁Rw₂, w₂Rw₁. V(p, w₁) = T, V(p, w₂) = T.

Tính tại w₁:
- □p: Thế giới truy cập từ w₁ là {w₂}. V(p, w₂) = T → **□p = T** ✓
- ¬◇¬p: Tính ◇¬p tại w₁: thế giới truy cập {w₂}, V(¬p, w₂) = ¬T = F → ◇¬p = F → ¬◇¬p = **T** ✓
- Kết quả: □p = T và ¬◇¬p = T — nhất quán.

**Ví dụ 2:**

Mô hình: W = {w₁, w₂}, w₁Rw₂. V(p, w₁) = T, V(p, w₂) = F.

Tính tại w₁:
- ◇p: Thế giới truy cập từ w₁ là {w₂}. V(p, w₂) = F → ◇p = **F** (không có thế giới truy cập được mà p đúng).
- ¬□¬p: Tính □¬p tại w₁: thế giới truy cập {w₂}, V(¬p, w₂) = T → □¬p = T → ¬□¬p = **F** ✓
- Kết quả: ◇p = F và ¬□¬p = F — nhất quán.

**Ví dụ 3 — áp dụng với câu thực:**

Đặt p = "Trời mưa ngày mai (trong hoàn cảnh này)".
- ◇p = "Có thể trời mưa ngày mai" = ¬□¬p = "Không phải tất yếu là trời không mưa ngày mai". ✓
- □p = "Tất yếu trời mưa ngày mai" = ¬◇¬p = "Không thể trời không mưa ngày mai". ✓

**Ví dụ 4 — phủ định kép:**

□¬p = ¬◇p ("Tất yếu không-p" = "Không thể có p")

Ví dụ: □¬(2 + 2 = 5) = ¬◇(2 + 2 = 5). "Tất yếu 2+2≠5" tương đương "Không thể 2+2=5". ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *Tại sao ¬□¬p mà không phải ¬□p?* — Chú ý: ◇p ≡ ¬□¬p, không phải ¬□p. Hai điều này khác nhau: ¬□p = "Không tất yếu p" (có thể p sai) = ◇¬p; còn ¬□¬p = "Không tất yếu không-p" = ◇p. Nhầm đây là lỗi rất phổ biến.
> - *Đối ngẫu này có luôn đúng không, bất kể R?* — Có. Hai quy luật đối ngẫu là định lý của mọi hệ logic modal (kể cả hệ K cơ bản nhất, không có tiên đề bổ sung nào về R). Đây là hệ quả trực tiếp từ định nghĩa □ và ◇ qua tập hợp.

> ⚠ **Lỗi thường gặp: nhầm ◇p với ¬□p.** Xem lại: ◇p ≡ ¬□¬p (phủ định bên ngoài □ và phủ định p), còn ¬□p ≡ ◇¬p (có thể không-p). Kiểm tra nhanh bằng analogy ∀/∃: ∃x.P(x) ≡ ¬∀x.¬P(x), không phải ¬∀x.P(x).

> 🔁 **Dừng lại tự kiểm tra.** Viết lại mỗi công thức sau bằng cách dùng đối ngẫu:
> 1. □(p ∧ q) — viết lại dùng ◇.
> 2. ◇(p → q) — viết lại dùng □.
> 3. ¬◇p — đơn giản hóa thành dạng □.
>
> <details><summary>Đáp án</summary>
>
> 1. □(p ∧ q) ≡ ¬◇¬(p ∧ q) ≡ ¬◇(¬p ∨ ¬q).
> 2. ◇(p → q) ≡ ¬□¬(p → q) ≡ ¬□(p ∧ ¬q).
> 3. ¬◇p ≡ ¬◇p — nhưng theo đối ngẫu ◇p ≡ ¬□¬p, nên ¬◇p ≡ ¬¬□¬p ≡ □¬p. ("Không thể p" = "Tất yếu không-p".)
> </details>

> 📝 **Tóm tắt mục 3.**
> - □p ≡ ¬◇¬p: Tất yếu p = Không thể không-p.
> - ◇p ≡ ¬□¬p: Có thể p = Không tất yếu không-p.
> - ¬□p ≡ ◇¬p (KHÁC với ◇p — đừng nhầm).
> - Đối ngẫu có giá trị trong *mọi* hệ logic modal.

---

## 4. Các hệ tiên đề modal

> 💡 **Trực giác.** Hệ tiên đề xác định **loại quan hệ truy cập R** nào được cho phép trong mô hình. Khác nhau về tiên đề → khác nhau về cấu trúc đồ thị Kripke → khác nhau về những gì là "tất yếu". Đây là lý do logic modal có nhiều *hệ* khác nhau, thích hợp cho các ứng dụng khác nhau.

**Hệ K — hệ cơ bản nhất:**

$$\\text{K: } \\Box(p \\to q) \\to (\\Box p \\to \\Box q)$$

Đọc: "Nếu tất yếu (p kéo theo q), và tất yếu p, thì tất yếu q." Đây là quy luật phân phối của □ qua →. K không đặt điều kiện gì về R — R hoàn toàn tùy ý.

**Kiểm tra bằng số:** W = {w₁, w₂, w₃}, w₁Rw₂, w₁Rw₃.

Giả sử: V(p, w₂)=T, V(p, w₃)=T (→ □p tại w₁ = T), V(q, w₂)=T, V(q, w₃)=T (→ □q tại w₁ = T, và □(p→q) tại w₁ = T).

Theo K: □(p→q) và □p → □q. Ta kiểm tra: □q tại w₁ = T ✓ (vì q=T tại w₂ và w₃).

**Hệ T — thêm tiên đề phản xạ:**

$$\\text{T: } \\Box p \\to p$$

Đọc: "Điều tất yếu thì thực sự đúng." Tiên đề này yêu cầu R phải **phản xạ** (reflexive): mọi w đều có wRw (mỗi thế giới truy cập được chính nó).

Ví dụ: □(2+2=4) → (2+2=4). Rõ ràng: nếu toán học tất yếu đúng, thì nó thực sự đúng. ✓

**Tại sao hệ K không đảm bảo điều này?** Trong hệ K, w₁ có thể không có wRw₁ — tức w₁ không "nhìn thấy" chính nó. Khi đó □p tại w₁ chỉ nói về các thế giới khác, không nói về w₁.

**Hệ S4 — thêm tiên đề bắc cầu:**

$$\\text{S4: } \\Box p \\to \\Box\\Box p$$

Đọc: "Nếu tất yếu p, thì tất yếu là tất yếu p." Tiên đề này yêu cầu R phải **bắc cầu** (transitive): nếu wRw' và w'Rw'', thì wRw''.

Ví dụ: Nếu "2+2=4" tất yếu đúng, thì tất yếu là nó tất yếu đúng. ✓ (Điều tất yếu trong toán học không thay đổi theo "cấp độ" tất yếu.)

**Hệ S5 — thêm tiên đề tương đương:**

$$\\text{S5: } \\Diamond p \\to \\Box\\Diamond p$$

Đọc: "Nếu p có thể xảy ra, thì tất yếu là p có thể xảy ra." R phải là quan hệ **tương đương** (phản xạ + đối xứng + bắc cầu). S5 là hệ chuẩn nhất cho logic modal alethic (tất yếu và khả dĩ về chân lý).

**Tóm tắt các hệ:**

| Hệ | Tiên đề bổ sung | Điều kiện trên R | Ứng dụng |
|---|---|---|---|
| K | □(p→q)→(□p→□q) | Không giới hạn | Logic modal cơ bản |
| T | □p→p | Phản xạ | Modal alethic (tất yếu về chân lý) |
| S4 | □p→□□p | Phản xạ + bắc cầu | Epistemic logic |
| S5 | ◇p→□◇p | Tương đương | Modal alethic chuẩn, lý thuyết trò chơi |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *Vì sao phải chọn hệ tiên đề — mọi hệ có hợp lệ không?* — Mỗi hệ hợp lệ cho một *lớp mô hình Kripke* nhất định. Câu hỏi là: "Đối với ứng dụng của tôi, quan hệ truy cập R có tính chất gì?" — Nếu R phản xạ, dùng T; nếu R bắc cầu, dùng S4; v.v. Không có hệ "đúng nhất" — chỉ có hệ phù hợp nhất với ngữ cảnh.

> 📝 **Tóm tắt mục 4.**
> - K: hệ cơ bản, □ phân phối qua →.
> - T = K + □p→p: điều tất yếu thì thực sự đúng (R phản xạ).
> - S4 = T + □p→□□p: tất yếu được lồng nhau (R bắc cầu).
> - S5 = S4 + ◇p→□◇p: R là quan hệ tương đương.

---

## 5. Các loại tất yếu và khả dĩ

> 💡 **Trực giác.** "Tất yếu" có nhiều nghĩa tùy ngữ cảnh: một nhà toán học nói "tất yếu" khác một nhà vật lý, khác một thẩm phán. Logic modal nắm bắt điều này bằng cách thay đổi cách diễn giải quan hệ R và các thế giới W. Cùng một ký hiệu □p có thể diễn đạt bốn loại tất yếu rất khác nhau.

### 5.1 Tất yếu logic (logical necessity)

"p là tất yếu về mặt logic" = p đúng ở *mọi thế giới logic khả dĩ*, tức p không thể sai mà không dẫn đến mâu thuẫn.

**Ví dụ:**
- □(p ∨ ¬p): Luật loại trừ trung gian — tất yếu đúng ở mọi thế giới.
- □(2 + 2 = 4): Đúng trong mọi hệ số học với định nghĩa chuẩn.
- □¬(p ∧ ¬p): Tất yếu không có mâu thuẫn.

Đây là loại tất yếu *mạnh nhất* — không thể tưởng tượng bất kỳ tình huống nào mà chúng sai.

### 5.2 Tất yếu vật lý (physical/nomological necessity)

"p là tất yếu về mặt vật lý" = p đúng ở mọi thế giới có cùng định luật vật lý như thế giới thực.

**Ví dụ:**
- □_phys(Ánh sáng không thể đi nhanh hơn 3×10⁸ m/s): Tất yếu theo định luật vật lý, nhưng có thể tưởng tượng một thế giới với định luật khác.
- □_phys(Không vật thể nào có khối lượng và đạt vận tốc ánh sáng): Hệ quả từ tương đối tính hẹp.
- ◇_phys(Hạt nhân uranium phóng xạ): Khả dĩ theo quy luật vật lý.

> ⚠ **□ logic KHÁC □ vật lý.** "Tất yếu về mặt vật lý" không phải "tất yếu về mặt logic". Ta *có thể* tưởng tượng một vũ trụ có vận tốc ánh sáng khác — điều đó logic không mâu thuẫn, chỉ trái với vật lý học của chúng ta. Ngược lại, không thể tưởng tượng p ∧ ¬p đúng mà không mâu thuẫn — đây là tất yếu logic.

### 5.3 Tất yếu nhận thức (epistemic necessity)

"□_K p" (đọc: "Tôi biết p") = p đúng ở mọi thế giới nhất quán với những gì tôi biết.

**Ví dụ:**
- □_K(Bạn của tôi có ở nhà lúc 8 giờ) — nếu tôi biết điều này, p đúng ở mọi tình huống khả dĩ từ góc độ hiểu biết của tôi.
- ◇_K(Người phạm tội là A hoặc B) — nhất quán với điều tra của tôi; không loại trừ được ai.

Trong logic nhận thức (epistemic logic), □_K p thường được viết là **Kp** (K viết tắt của "Knows"). Quan hệ R là quan hệ "không phân biệt được" (indistinguishability).

### 5.4 Tất yếu nghĩa vụ (deontic necessity)

"□_D p" (đọc: "Bắt buộc/Nghĩa vụ p") và "◇_D p" (đọc: "Được phép p").

**Ví dụ:**
- □_D(Người lái xe phải thắt dây an toàn): Nghĩa vụ pháp lý.
- ◇_D(Bạn được phép chọn bất kỳ sách nào trong thư viện): Sự cho phép.
- ¬◇_D(Lái xe sau khi uống rượu): Bị cấm = Tất yếu không được làm.

Trong logic nghĩa vụ (deontic logic), thường dùng **O** (Obligation = bắt buộc) và **P** (Permission = cho phép).

**Bảng so sánh bốn loại modality:**

| Loại | Ký hiệu | □p đọc là | ◇p đọc là | Thế giới W là | Ví dụ |
|---|---|---|---|---|---|
| Logic | □_L | Tất yếu (logic) | Có thể (logic) | Mọi thế giới logic có thể | □_L(p ∨ ¬p) |
| Vật lý | □_phys | Tất yếu (vật lý) | Có thể (vật lý) | Thế giới có cùng định luật TN | □_phys(E=mc²) |
| Nhận thức | K | Biết | Không thể loại trừ | Tình huống nhất quán với hiểu biết | Kp: "Tôi biết p" |
| Nghĩa vụ | O/P | Bắt buộc | Được phép | Thế giới lý tưởng đạo đức | O(Giữ lời hứa) |

> 📝 **Tóm tắt mục 5.**
> - Bốn loại tất yếu: logic (mạnh nhất), vật lý, nhận thức, nghĩa vụ.
> - Cùng ký hiệu □, nhưng nghĩa thay đổi hoàn toàn theo loại modal.
> - □ logic ≠ □ vật lý: tất yếu vật lý có thể không tất yếu về mặt logic.

---

## 6. De re và de dicto — phân biệt quan trọng

> 💡 **Trực giác.** "Kẻ trộm nhất thiết là tội phạm" — câu này có hai cách đọc: (A) Bất kỳ ai là kẻ trộm thì *nhất thiết* là tội phạm (về mặt khái niệm); (B) Có một người cụ thể nào đó mà người đó *nhất thiết* là tội phạm. Hai cách đọc cho giá trị chân lý khác nhau trong nhiều ngữ cảnh — đây là phân biệt *de dicto* và *de re*.

**De dicto** (Latin: "về điều được nói") — toán tử modal bao quanh *toàn bộ mệnh đề*:

$$\\Box(\\text{Người giỏi nhất lớp học giỏi})$$

Đọc: "Tất yếu là: người giỏi nhất lớp học giỏi" — đây là sự thật *theo định nghĩa* (analytic truth), đúng ở mọi thế giới.

**De re** (Latin: "về vật/đối tượng") — toán tử modal áp dụng cho *thuộc tính của đối tượng cụ thể*:

$$\\text{Người giỏi nhất lớp} \\Rightarrow \\Box(\\text{họ học giỏi})$$

Đọc: "Người giỏi nhất lớp (trong thực tế — giả sử là An) thì *nhất thiết* học giỏi." — Câu này SAI: An có thể ở một thế giới khả dĩ mà An không học giỏi (chỉ tình cờ là An học giỏi nhất trong thế giới thực).

**Ví dụ kinh điển:**

De dicto: □(Số chẵn nhất thiết chia hết cho 2) — ĐÚNG (về khái niệm).

De re: Đặt n = 4. "4 nhất thiết chia hết cho 2" — ĐÚNG (4 là số chẵn, nhất thiết chia hết cho 2 theo định nghĩa số chẵn).

De re: Đặt n = "số học sinh giỏi nhất lớp năm nay". "Người đó nhất thiết học giỏi" — SAI theo nghĩa de re (ở thế giới khác, người đó có thể không học giỏi; tình trạng của họ là ngẫu nhiên, không tất yếu).

> ⚠ **Đừng nhầm de re và de dicto.** Khi gặp câu như "Tổng thống Mỹ nhất thiết là công dân Mỹ" — hỏi: *Nhất thiết về điều gì?* De dicto: đúng theo định nghĩa (ai làm Tổng thống Mỹ phải là công dân Mỹ — đúng ở mọi thế giới có quy tắc đó). De re: người hiện đang là Tổng thống Mỹ (ví dụ, ông X) — ông X *có nhất thiết* là công dân Mỹ không? Về mặt de re: không (ở thế giới khác, ông X có thể là công dân nước khác).

> 📝 **Tóm tắt mục 6.**
> - De dicto: □ bao quanh toàn mệnh đề — sự tất yếu về mặt *nội dung câu nói*.
> - De re: □ áp dụng cho *thuộc tính của đối tượng cụ thể* — sự tất yếu về mặt *vật*.
> - Cùng câu có thể đúng theo de dicto nhưng sai theo de re, hoặc ngược lại.

---

## Bài tập

**Bài 1.** Viết công thức logic modal cho mỗi câu sau (dùng □, ◇, ¬, →, ∧):
- (a) "Có thể trời mưa vào ngày mai."
- (b) "Không thể nào một số nguyên vừa chẵn vừa lẻ."
- (c) "Tất yếu là nếu trời mưa thì đường ướt."
- (d) "Không tất yếu là mọi người đều trung thực."
- (e) "Có thể bạn sai và có thể bạn đúng."

**Bài 2.** Tính □p và ◇p tại *mọi* thế giới trong mô hình Kripke sau:

W = {w₁, w₂, w₃, w₄}

Quan hệ R: w₁Rw₂, w₁Rw₃, w₂Rw₃, w₃Rw₃ (w₃ trỏ vào chính nó)

V(p, w₁) = F; V(p, w₂) = T; V(p, w₃) = T; V(p, w₄) = F

(Chú ý: w₄ không có mũi tên đi ra và không có mũi tên trỏ vào w₄ từ đâu cả.)

**Bài 3.** Chứng minh đối ngẫu ◇p ≡ ¬□¬p trực tiếp từ định nghĩa (không dùng tiên đề hệ T hay S4) cho mô hình bất kỳ (W, R, V).

**Bài 4.** Phân biệt loại tất yếu trong mỗi câu sau (logic / vật lý / nhận thức / nghĩa vụ) và giải thích ngắn gọn:
- (a) "Mọi hình tam giác đều có tổng ba góc bằng 180° (trong hình học Euclid)."
- (b) "Tất cả vật thể có khối lượng đều hút nhau."
- (c) "Theo điều tra, có khả năng thủ phạm là người quen của nạn nhân."
- (d) "Học sinh bắt buộc phải đi học đúng giờ."

**Bài 5.** Phân biệt de re và de dicto:

Câu: "Người viết *Hamlet* nhất thiết là thiên tài."

- (a) Diễn giải de dicto: viết rõ nghĩa và xét giá trị chân lý.
- (b) Diễn giải de re: viết rõ nghĩa (biết rằng Shakespeare là tác giả *Hamlet*) và xét giá trị chân lý.

---

## Lời giải chi tiết

**Bài 1.**

**(a)** ◇(trời mưa vào ngày mai). Toán tử ◇ vì câu nói "có thể", không khẳng định chắc chắn xảy ra.

**(b)** □¬(n là số chẵn ∧ n là số lẻ) — hoặc viết gọn: □¬(p ∧ q) với p = "n chẵn", q = "n lẻ". Đây là tất yếu logic — không thể có số vừa chẵn vừa lẻ mà không mâu thuẫn.

**(c)** □(trời mưa → đường ướt). Toán tử □ bao quanh toàn bộ mệnh đề điều kiện — "tất yếu là" mối quan hệ nhân-quả này giữ.

**(d)** ¬□(mọi người đều trung thực). "Không tất yếu" = phủ định □. Tương đương: ◇¬(mọi người đều trung thực) = ◇(tồn tại người không trung thực).

**(e)** ◇p ∧ ◇¬p với p = "bạn đúng". "Có thể bạn đúng" = ◇p; "có thể bạn sai" = ◇¬p. Hai điều có thể đều đúng đồng thời (ở hai thế giới khác nhau).

---

**Bài 2.**

Trước hết xác định thế giới truy cập được từ mỗi thế giới:
- w₁: {w₂, w₃} (qua w₁Rw₂ và w₁Rw₃)
- w₂: {w₃} (qua w₂Rw₃)
- w₃: {w₃} (qua w₃Rw₃ — tự trỏ)
- w₄: {} (không có mũi tên đi ra)

Tính □p và ◇p tại từng thế giới:

**Tại w₁:** Truy cập {w₂, w₃}: V(p,w₂)=T, V(p,w₃)=T.
- □p = T (mọi thế giới truy cập được đều có p=T).
- ◇p = T (tồn tại w₂ có p=T).

**Tại w₂:** Truy cập {w₃}: V(p,w₃)=T.
- □p = T (w₃ là thế giới duy nhất truy cập được và p=T tại đó).
- ◇p = T.

**Tại w₃:** Truy cập {w₃}: V(p,w₃)=T.
- □p = T (w₃ truy cập chính nó và p=T).
- ◇p = T.

**Tại w₄:** Truy cập {} (rỗng).
- □p = T (*vacuously true* — không có thế giới nào vi phạm).
- ◇p = F (không có thế giới nào truy cập được để p đúng).

---

**Bài 3.**

Cần chứng minh: với mọi mô hình (W, R, V) và mọi w ∈ W: ◇p đúng tại w ↔ ¬□¬p đúng tại w.

**Chiều (→):** Giả sử ◇p đúng tại w.

Theo định nghĩa ◇: tồn tại w' ∈ W với wRw' và V(p, w') = T.

Suy ra V(¬p, w') = F (vì ¬p là phủ định của p).

Vì tồn tại w' với wRw' và V(¬p, w') = F, nên □¬p KHÔNG đúng tại w (vì □¬p đòi *mọi* thế giới truy cập được phải có ¬p = T, nhưng w' vi phạm).

Vậy □¬p = F tại w, tức ¬□¬p = T tại w. ✓

**Chiều (←):** Giả sử ¬□¬p đúng tại w, tức □¬p = F tại w.

Theo định nghĩa □: □¬p = F tại w nghĩa là *tồn tại* w' với wRw' mà V(¬p, w') = F.

V(¬p, w') = F → V(p, w') = T.

Vậy tồn tại w' với wRw' và V(p, w') = T → ◇p = T tại w. ✓

Cả hai chiều được chứng minh → ◇p ≡ ¬□¬p. ■

---

**Bài 4.**

**(a)** "Mọi hình tam giác đều có tổng ba góc bằng 180° (trong hình học Euclid)." — **Tất yếu logic** (trong hệ tiên đề Euclid). Đây là định lý — hệ quả tất yếu từ tiên đề. *Tuy nhiên*: trong hình học phi-Euclid (mặt cầu, mặt hyperbolic), câu này sai — nghĩa là không phải tất yếu logic tuyệt đối, mà là tất yếu *trong hệ Euclid*. Đây là điểm tinh tế.

**(b)** "Tất cả vật thể có khối lượng đều hút nhau." — **Tất yếu vật lý** (định luật hấp dẫn). Không phải tất yếu logic — có thể tưởng tượng vũ trụ mà vật chất không hút nhau. Nhưng trong thế giới có cùng định luật vật lý với chúng ta, điều này tất yếu đúng.

**(c)** "Theo điều tra, có khả năng thủ phạm là người quen của nạn nhân." — **Tất yếu nhận thức (epistemic)**, cụ thể là ◇_K ("có thể, theo những gì điều tra viên biết"). Câu nói phản ánh trạng thái hiểu biết của điều tra viên, không phải tất yếu về mặt logic hay vật lý.

**(d)** "Học sinh bắt buộc phải đi học đúng giờ." — **Tất yếu nghĩa vụ (deontic)**: O(đi học đúng giờ). Đây là nghĩa vụ hay quy định, không phải tất yếu tự nhiên. Học sinh có thể vật lý *không* đi học đúng giờ — không vi phạm tất yếu vật lý. Nhưng theo chuẩn mực/quy tắc, đây là nghĩa vụ.

---

**Bài 5.**

**(a) De dicto:** □(Người viết *Hamlet* là thiên tài). Nghĩa: "Theo định nghĩa hoặc theo nghĩa phân tích, bất kỳ ai viết *Hamlet* đều tất yếu là thiên tài." Giá trị chân lý: **Không rõ ràng — phụ thuộc định nghĩa**. Nếu "thiên tài" được định nghĩa rộng bao gồm việc sáng tác *Hamlet*, thì đúng theo de dicto. Nhưng "thiên tài" không phải là điều kiện *định nghĩa* của tác giả *Hamlet* — đây là đánh giá, không phải tất yếu logic thuần túy. Phần lớn triết học gia cho rằng câu de dicto này là sai (hoặc không xác định).

**(b) De re:** Với đối tượng cụ thể là Shakespeare (người thực sự viết *Hamlet*): □(Shakespeare là thiên tài). Nghĩa: "Shakespeare — người cụ thể này — nhất thiết là thiên tài ở mọi thế giới khả dĩ mà Shakespeare tồn tại." Giá trị chân lý: **Sai theo de re** (trong hầu hết các hệ modal). Ở thế giới khả dĩ khác, Shakespeare có thể là người bình thường — việc ông là thiên tài là *ngẫu nhiên* (contingent), không phải tất yếu gắn với bản thể của ông. (Trừ khi ta theo quan điểm *essentialism* — nhưng đó là chủ đề phức tạp hơn.)

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Đồ thị Kripke tương tác: chọn thế giới hiện tại và công thức modal, tính ĐÚNG/SAI; minh họa đối ngẫu □/◇; bảng các loại modality.

---

## Bài tiếp theo

→ **Lesson 02 — Nghịch lý (Paradoxes)**: các nghịch lý nổi tiếng trong logic và triết học — từ Liar's Paradox đến nghịch lý Russell, nghịch lý Sorites — và cách logic hiện đại phản ứng với chúng.

[⬆ Về Advanced Logic & Language](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
`;
