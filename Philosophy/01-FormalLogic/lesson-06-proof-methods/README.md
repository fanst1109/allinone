# Lesson 06 — Phương pháp chứng minh

> **Tầng 1 — Formal Logic · Bài 6/8**

Chứng minh là cầu nối giữa *biết một điều là đúng* và *hiểu tại sao nó đúng*. Bài này trả lời câu hỏi thực tế: **khi đứng trước một mệnh đề, tôi dùng chiến lược nào để chứng minh hoặc bác bỏ nó?** Bốn phương pháp — trực tiếp, phản đảo, phản chứng, và phản ví dụ — là bộ công cụ cơ bản mà mọi người làm toán, khoa học máy tính, và triết học phân tích đều dùng hằng ngày.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Thực hiện **chứng minh trực tiếp** (direct proof): giả sử tiền đề đúng và suy từng bước đến kết luận.
- Dùng **phép phản đảo** (contrapositive): biến p → q thành ¬q → ¬p và chứng minh dạng tương đương đó.
- Thực hiện **phản chứng** (reductio ad absurdum): giả sử kết luận sai, tìm mâu thuẫn, suy ra kết luận phải đúng.
- Bác bỏ một mệnh đề phổ quát bằng **phản ví dụ** (counterexample) — và hiểu tại sao một phản ví dụ là đủ.
- Nhận ra khi nào nên dùng phương pháp nào.

## Kiến thức tiền đề

- Cấu trúc mệnh đề hợp lệ (valid argument) — [`../lesson-04-validity-inference/`](../lesson-04-validity-inference/)
- Logic vị từ ∀, ∃, phủ định vị từ — [`../lesson-05-predicate-logic/`](../lesson-05-predicate-logic/)

---

## 1. Chứng minh trực tiếp (Direct Proof)

> 💡 **Trực giác.** Hãy nghĩ về một chuỗi domino: dựng thẳng domino đầu tiên (giả thiết đúng), rồi xếp các mảnh lần lượt sao cho mỗi mảnh đổ xuống làm đổ mảnh kế tiếp. Nếu dây domino cuối cùng ngã, tức là kết luận đúng. Đây chính là logic của chứng minh trực tiếp.

**Định nghĩa.** Để chứng minh p → q bằng chứng minh trực tiếp:
1. **Giả sử** p đúng.
2. Dùng các quy tắc suy diễn, định lý đã biết, hoặc định nghĩa để **suy từng bước**.
3. Đạt tới q.
4. Kết luận: p → q đúng. ∎

> ⚠ **Điểm bắt buộc.** Mỗi bước phải có lý do cụ thể (dùng định nghĩa nào, áp dụng quy tắc gì). Không được viết "rõ ràng suy ra" hay "dễ thấy rằng" — đó là bỏ qua bước và che giấu lỗ hổng.

### Ví dụ 1 — "Nếu n chẵn thì n² chẵn"

**Phát biểu:** ∀n ∈ ℤ, nếu n chẵn thì n² chẵn.

**Chứng minh:**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử n chẵn. | Giả thiết |
| 2 | n = 2k với k ∈ ℤ. | Định nghĩa số chẵn |
| 3 | n² = (2k)² = 4k². | Khai triển bình phương |
| 4 | n² = 2·(2k²). | Nhóm thừa số 2 |
| 5 | 2k² ∈ ℤ vì k ∈ ℤ. | Tập số nguyên đóng với nhân |
| 6 | n² = 2·(số nguyên) → n² chẵn. | Định nghĩa số chẵn |

∎ Vậy nếu n chẵn thì n² chẵn.

### Ví dụ 2 — "Tổng hai số lẻ là số chẵn"

**Phát biểu:** ∀a, b ∈ ℤ, nếu a và b đều lẻ thì a + b chẵn.

**Chứng minh:**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử a lẻ và b lẻ. | Giả thiết |
| 2 | a = 2j + 1, b = 2k + 1 với j, k ∈ ℤ. | Định nghĩa số lẻ (áp dụng cho cả a và b) |
| 3 | a + b = (2j + 1) + (2k + 1) = 2j + 2k + 2. | Cộng và nhóm |
| 4 | a + b = 2(j + k + 1). | Rút thừa số 2 |
| 5 | j + k + 1 ∈ ℤ. | Tập số nguyên đóng với cộng |
| 6 | a + b = 2·(số nguyên) → a + b chẵn. | Định nghĩa số chẵn |

∎

### Ví dụ 3 — "Tích hai số chẵn là số chẵn"

**Phát biểu:** ∀a, b ∈ ℤ, nếu a chẵn và b chẵn thì a·b chẵn.

**Chứng minh:**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử a chẵn và b chẵn. | Giả thiết |
| 2 | a = 2j, b = 2k với j, k ∈ ℤ. | Định nghĩa số chẵn |
| 3 | a·b = (2j)(2k) = 4jk. | Nhân |
| 4 | a·b = 2·(2jk). | Rút thừa số 2 |
| 5 | 2jk ∈ ℤ. | Tập số nguyên đóng với nhân |
| 6 | a·b = 2·(số nguyên) → a·b chẵn. | Định nghĩa số chẵn |

∎

### Ví dụ 4 — "Nếu a chia hết cho 3 và b chia hết cho 3 thì a + b chia hết cho 3"

**Chứng minh:**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử 3 | a và 3 | b. | Giả thiết |
| 2 | a = 3m, b = 3n với m, n ∈ ℤ. | Định nghĩa chia hết |
| 3 | a + b = 3m + 3n = 3(m + n). | Cộng và rút thừa số |
| 4 | m + n ∈ ℤ. | Tập số nguyên đóng với cộng |
| 5 | a + b = 3·(số nguyên) → 3 | (a + b). | Định nghĩa chia hết |

∎

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào thì chứng minh trực tiếp không hoạt động?"* — Khi kết luận liên quan đến phủ định (dạng "... không tồn tại", "... không có nghiệm"), việc giả sử p đúng và tìm đường thẳng đến ¬q thường rất khó. Lúc đó dùng phản chứng hiệu quả hơn.
> - *"Chứng minh trực tiếp có áp dụng cho lập trình không?"* — Có. Khi chứng minh tính đúng đắn (correctness) của thuật toán: giả sử input thỏa điều kiện đầu vào (precondition), suy từng bước biến đổi, chứng minh điều kiện đầu ra (postcondition) đúng.

> 🔁 **Dừng lại tự kiểm tra.** Chứng minh trực tiếp: "Nếu n lẻ thì n² lẻ."
>
> <details><summary>Đáp án</summary>
>
> 1. Giả sử n lẻ. (Giả thiết)
> 2. n = 2k + 1 với k ∈ ℤ. (Định nghĩa số lẻ)
> 3. n² = (2k + 1)² = 4k² + 4k + 1. (Khai triển)
> 4. n² = 2(2k² + 2k) + 1. (Nhóm thừa số 2, còn dư 1)
> 5. 2k² + 2k ∈ ℤ. (Đóng với phép nhân/cộng)
> 6. n² = 2·(số nguyên) + 1 → n² lẻ. (Định nghĩa số lẻ)
> ∎
> </details>

> 📝 **Tóm tắt mục 1.**
> - Chứng minh trực tiếp: giả sử p, suy từng bước với lý do rõ ràng, đạt q.
> - Mỗi bước phải có căn cứ (định nghĩa, định lý, quy tắc đại số).
> - Phù hợp nhất khi p → q có chuỗi biến đổi thuận chiều rõ ràng.

---

## 2. Chứng minh bằng phép phản đảo (Contrapositive)

> 💡 **Trực giác.** Câu "Nếu trời mưa thì đường ướt" tương đương với "Nếu đường khô thì trời không mưa." Hai câu này có cùng giá trị chân lý mọi lúc — đây là điều đã học ở Lesson 03 (luật phản đảo: p → q ≡ ¬q → ¬p). Đôi khi hướng ¬q → ¬p dễ chứng minh hơn p → q rất nhiều.

**Định nghĩa.** Để chứng minh p → q bằng phép phản đảo:
1. **Quan sát:** p → q ≡ ¬q → ¬p (tương đương logic, đã chứng minh ở Lesson 03).
2. **Chuyển sang chứng minh** ¬q → ¬p thay vì p → q.
3. Giả sử ¬q đúng, suy từng bước đến ¬p.
4. Suy ra p → q đúng. ∎

> ⚠ **Lỗi thường gặp: nhầm phản đảo với đảo.** Đảo của "p → q" là "q → p" — KHÔNG tương đương. Phản đảo là "¬q → ¬p" — MỚI tương đương. Ví dụ: "Nếu trời mưa thì đường ướt." Đảo: "Nếu đường ướt thì trời mưa" (có thể sai — vòi nước cũng làm đường ướt!). Phản đảo: "Nếu đường khô thì trời không mưa" (đúng khi mệnh đề gốc đúng).

### Ví dụ 1 — "Nếu n² chẵn thì n chẵn"

**Phát biểu:** ∀n ∈ ℤ, nếu n² chẵn thì n chẵn.

*Nhận xét:* Chứng minh trực tiếp gặp khó — nếu n² = 2m, làm sao suy được n = 2k? Hướng phản đảo tự nhiên hơn nhiều.

**Phản đảo:** "n lẻ → n² lẻ" (¬q = "n lẻ", ¬p = "n² lẻ").

**Chứng minh (¬q → ¬p):**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử n lẻ. | Giả thiết (¬q) |
| 2 | n = 2k + 1 với k ∈ ℤ. | Định nghĩa số lẻ |
| 3 | n² = (2k + 1)² = 4k² + 4k + 1. | Khai triển |
| 4 | n² = 2(2k² + 2k) + 1. | Nhóm — phần còn lại là 1 |
| 5 | 2k² + 2k ∈ ℤ. | Đóng với nhân/cộng |
| 6 | n² = 2·(số nguyên) + 1 → n² lẻ. | Định nghĩa số lẻ (¬p) |

∎ Vì "n lẻ → n² lẻ" đúng, theo tương đương phản đảo, "n² chẵn → n chẵn" đúng.

### Ví dụ 2 — "Nếu n² chia hết cho 3 thì n chia hết cho 3"

**Phản đảo:** "n không chia hết cho 3 → n² không chia hết cho 3."

Nếu 3 ∤ n thì n ≡ 1 (mod 3) hoặc n ≡ 2 (mod 3).

- Trường hợp n = 3k + 1: n² = 9k² + 6k + 1 = 3(3k² + 2k) + 1 → n² ≡ 1 (mod 3), tức 3 ∤ n².
- Trường hợp n = 3k + 2: n² = 9k² + 12k + 4 = 3(3k² + 4k + 1) + 1 → n² ≡ 1 (mod 3), tức 3 ∤ n².

∎ Cả hai trường hợp đều cho n² không chia hết cho 3, nên phản đảo đúng, kéo theo mệnh đề gốc đúng.

### Ví dụ 3 — "Nếu tích ab lẻ thì cả a và b đều lẻ"

**Phản đảo:** "a chẵn hoặc b chẵn → ab chẵn."

Giả sử a chẵn (trường hợp b chẵn hoàn toàn đối xứng):
- a = 2k → ab = 2kb = 2·(kb) → ab chẵn. ∎

### Ví dụ 4 — "Nếu 5n + 3 lẻ thì n chẵn"

**Phản đảo:** "n lẻ → 5n + 3 chẵn."

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử n lẻ. | Giả thiết |
| 2 | n = 2k + 1, k ∈ ℤ. | Định nghĩa số lẻ |
| 3 | 5n + 3 = 5(2k + 1) + 3 = 10k + 5 + 3 = 10k + 8. | Thế vào |
| 4 | 5n + 3 = 2(5k + 4). | Rút thừa số 2 |
| 5 | 5k + 4 ∈ ℤ → 5n + 3 chẵn. | Định nghĩa số chẵn |

∎ Phản đảo đúng, suy ra mệnh đề gốc đúng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao biết khi nào nên dùng phản đảo thay vì trực tiếp?"* — Dấu hiệu: kết luận dạng "n chẵn", "n chia hết cho k", hoặc "n có tính chất X" mà biết phủ định của X (X không có) lại dễ làm việc hơn. Nếu bạn viết "Giả sử n² chẵn" và bị mắc kẹt không biết suy gì tiếp — thử lật ngược.
> - *"Phản đảo có thể lồng nhau không?"* — Về mặt logic, p → q chỉ có một phản đảo chuẩn ¬q → ¬p. Nếu q bản thân là phép hàm ý (q = r → s), thì ¬q = r ∧ ¬s, cần xử lý cẩn thận hơn.

> 🔁 **Dừng lại tự kiểm tra.** Dùng phản đảo để chứng minh: "Nếu 3n + 1 chẵn thì n lẻ."
>
> <details><summary>Đáp án</summary>
>
> Phản đảo: "n chẵn → 3n + 1 lẻ."
>
> 1. Giả sử n chẵn.
> 2. n = 2k, k ∈ ℤ.
> 3. 3n + 1 = 6k + 1 = 2(3k) + 1.
> 4. 3k ∈ ℤ → 3n + 1 = 2·(số nguyên) + 1 → 3n + 1 lẻ.
> ∎ Phản đảo đúng, suy ra "3n + 1 chẵn → n lẻ" đúng.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Phản đảo: thay vì chứng minh p → q, chứng minh ¬q → ¬p (tương đương).
> - KHÔNG nhầm với đảo (q → p) — đảo không tương đương!
> - Chọn phản đảo khi phủ định của kết luận (¬q) dễ khai thác hơn bản thân giả thiết.

---

## 3. Chứng minh phản chứng (Reductio ad Absurdum)

> 💡 **Trực giác.** Trong một phiên tòa, luật sư biện hộ có thể lập luận: "Giả sử thân chủ có mặt ở hiện trường lúc 21:00 như công tố buộc tội — nhưng chúng tôi có bằng chứng thân chủ đang ở thành phố khác cùng thời điểm đó. Hai điều này không thể cùng đúng, vậy giả thiết ban đầu phải sai." Đây chính là phản chứng: giả sử ngược → tìm mâu thuẫn → bác giả thiết.

**Định nghĩa.** Để chứng minh mệnh đề Q đúng bằng phản chứng:
1. **Giả sử ¬Q đúng** (kết luận sai).
2. Suy từng bước từ ¬Q (kết hợp với các giả thiết khác nếu có).
3. Đạt đến một **mâu thuẫn**: phát biểu S và ¬S đều đúng cùng lúc.
4. Vì không có mâu thuẫn trong logic chính thống, giả sử ¬Q phải sai, tức Q đúng. ∎

> ⚠ **Phân biệt phản chứng với phản đảo.** Phản đảo vẫn là chứng minh hàm ý p → q theo hướng khác. Phản chứng là giả sử phủ định của ĐIỀU CẦN CHỨNG MINH, tìm mâu thuẫn. Cả hai đều dùng phủ định nhưng theo cách khác nhau.

### Ví dụ 1 — √2 là số vô tỉ

**Phát biểu:** √2 ∉ ℚ (không có biểu diễn a/b với a, b ∈ ℤ, b ≠ 0).

**Chứng minh:**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử √2 hữu tỉ. | Giả sử ¬Q |
| 2 | √2 = a/b với a, b ∈ ℤ, b ≠ 0, và phân số a/b đã rút gọn hết (tối giản, tức là ƯCLN(a, b) = 1). | Định nghĩa số hữu tỉ dạng tối giản |
| 3 | 2 = a²/b² → a² = 2b². | Bình phương hai vế, nhân chéo |
| 4 | a² chia hết cho 2 → a chia hết cho 2. | Kết quả đã chứng minh ở Ví dụ 1, Mục 2 (phản đảo) |
| 5 | a = 2c với c ∈ ℤ. | a chẵn theo định nghĩa |
| 6 | a² = 4c² → 2b² = 4c² → b² = 2c². | Thế a = 2c vào bước 3 |
| 7 | b² chia hết cho 2 → b chia hết cho 2. | Cùng lý do như bước 4 |
| 8 | a chia hết cho 2 (bước 4) VÀ b chia hết cho 2 (bước 7). | Kết hợp bước 4 và 7 |
| 9 | Nhưng ƯCLN(a, b) = 1 (bước 2). | Giả thiết a/b tối giản |
| 10 | Bước 8 và 9 mâu thuẫn: a/b không thể vừa tối giản vừa cả hai chia hết cho 2. | **Mâu thuẫn** |

∎ Giả sử √2 hữu tỉ dẫn đến mâu thuẫn, vậy √2 vô tỉ.

### Ví dụ 2 — Có vô số số nguyên tố

**Phát biểu:** Tập các số nguyên tố là vô hạn.

**Chứng minh (Euclid, ~300 TCN):**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử chỉ có hữu hạn số nguyên tố: p₁, p₂, ..., pₙ. | Giả sử ¬Q |
| 2 | Xét N = p₁·p₂·...·pₙ + 1. | Định nghĩa N |
| 3 | N > 1 → N có ít nhất một ước nguyên tố pₖ. | Định lý cơ bản số học |
| 4 | pₖ | N (pₖ là ước của N). | Bước 3 |
| 5 | pₖ | (p₁·p₂·...·pₙ) vì pₖ trong danh sách. | pₖ là một trong pᵢ |
| 6 | pₖ | (N − p₁·p₂·...·pₙ) = 1. | Từ bước 4, 5: nếu pₖ | A và pₖ | B thì pₖ | (A − B) |
| 7 | pₖ | 1 → pₖ ≤ 1. | Định nghĩa chia hết trên số nguyên dương |
| 8 | Nhưng pₖ là số nguyên tố → pₖ ≥ 2. | Định nghĩa số nguyên tố |
| 9 | Bước 7 và 8 mâu thuẫn. | **Mâu thuẫn** |

∎ Giả sử số nguyên tố hữu hạn dẫn đến mâu thuẫn, vậy có vô số số nguyên tố.

### Ví dụ 3 — "Nếu ab = 0 thì a = 0 hoặc b = 0" (trên ℝ)

**Phát biểu:** ∀a, b ∈ ℝ, ab = 0 → a = 0 ∨ b = 0.

**Chứng minh:**

Giả sử ab = 0 nhưng a ≠ 0 và b ≠ 0 (phủ định kết luận).

- Vì a ≠ 0, a có nghịch đảo 1/a trong ℝ.
- ab = 0 → (1/a)·(ab) = (1/a)·0 = 0.
- (1/a)·(ab) = ((1/a)·a)·b = 1·b = b.
- Vậy b = 0. Mâu thuẫn với b ≠ 0. ∎

### Ví dụ 4 — log₂(3) là số vô tỉ

**Phát biểu:** log₂(3) ∉ ℚ.

**Chứng minh:**

Giả sử log₂(3) = p/q với p, q ∈ ℤ, q > 0, phân số tối giản.

- 2^(p/q) = 3 → 2^p = 3^q (nâng hai vế lên q).
- Vế trái 2^p là luỹ thừa của 2 (số chẵn nếu p ≥ 1). Vế phải 3^q là luỹ thừa của 3 (số lẻ với mọi q ≥ 1).
- Nếu p > 0: 2^p chẵn nhưng 3^q lẻ — mâu thuẫn.
- Nếu p = 0: 2^0 = 1 ≠ 3^q với q ≥ 1 — mâu thuẫn.
- Nếu p < 0: 2^p < 1 nhưng 3^q ≥ 3 — mâu thuẫn.

∎ log₂(3) vô tỉ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Phản chứng dùng logic 'giả sử A đúng' rồi suy A sai — có vẻ luẩn quẩn không?"* — Không. Chúng ta không giả sử điều cần chứng minh (đó là lỗi circular reasoning). Ta giả sử **phủ định** của điều cần chứng minh, rồi dẫn đến mâu thuẫn với các chân lý đã biết — điều đó loại bỏ giả thiết ban đầu.
> - *"Mâu thuẫn phải là dạng S ∧ ¬S nghiêm ngặt không?"* — Không nhất thiết phải viết đúng dạng đó. Bất kỳ điều gì không thể đúng cùng lúc là đủ: hai số không thể vừa bằng nhau vừa khác nhau; một số không thể vừa ≥ 2 vừa ≤ 1.

> 🔁 **Dừng lại tự kiểm tra.** Dùng phản chứng để chứng minh: "Không tồn tại số hữu tỉ r sao cho r² = 2." (Đây là cách diễn đạt khác của "√2 vô tỉ".)
>
> <details><summary>Đáp án</summary>
>
> Giả sử tồn tại r ∈ ℚ với r² = 2. Thì r = a/b tối giản với a, b ∈ ℤ, b ≠ 0. Từ đây, a² = 2b², dẫn đến a và b đều chẵn, mâu thuẫn với a/b tối giản. (Chính xác là chứng minh ví dụ √2 ở trên, chỉ đổi cách đặt vấn đề.) ∎
> </details>

> 📝 **Tóm tắt mục 3.**
> - Phản chứng: giả sử ¬Q, suy đến mâu thuẫn với sự thật đã biết, kết luận Q đúng.
> - Khác với phản đảo: phản đảo đổi hướng hàm ý; phản chứng giả sử phủ định của điều cần chứng minh.
> - Đặc biệt mạnh cho các mệnh đề khó suy trực tiếp: "không tồn tại", "vô tỉ", "vô hạn".

---

## 4. Phản ví dụ (Counterexample)

> 💡 **Trực giác.** Khoa học yêu cầu một thực nghiệm *phản bác* duy nhất để lật đổ một lý thuyết, không cần vô số ví dụ *ủng hộ*. Tương tự trong logic: một phản ví dụ duy nhất đủ để bác bỏ một mệnh đề phổ quát ∀x P(x). Nhưng không thể *chứng minh* mệnh đề phổ quát bằng vài ví dụ đúng — cần chứng minh thực sự cho *mọi* trường hợp.

**Định nghĩa.** Để **bác bỏ** mệnh đề phổ quát ∀x ∈ D, P(x):
1. Tìm **một phần tử cụ thể** x₀ ∈ D sao cho P(x₀) sai.
2. Đây gọi là **phản ví dụ** (counterexample).
3. Kết luận: ∀x P(x) sai vì ∃x₀: ¬P(x₀).

> ⚠ **Quy nạp ≠ chứng minh.** Kiểm tra P(x) đúng với x = 1, 2, 3, ..., 100 **không chứng minh** ∀x P(x). Ví dụ điển hình: Giả thuyết của Goldbach (mọi số chẵn > 2 là tổng của hai số nguyên tố) đã được kiểm tra cho hàng tỷ tỷ số nhưng vẫn chưa được chứng minh hay bác bỏ (tính đến nay). Xem Lesson 08 (Quy nạp và diễn dịch) để phân tích kỹ hơn.

### Ví dụ 1 — "Mọi số nguyên tố đều lẻ"

**Mệnh đề:** ∀n ∈ ℕ, n là số nguyên tố → n lẻ.

**Phản ví dụ:** n = 2.

- 2 là số nguyên tố (chỉ chia hết cho 1 và 2).
- 2 là số chẵn.
- Vậy 2 là số nguyên tố chẵn → P(2) = "2 lẻ" sai.

∎ Mệnh đề "Mọi số nguyên tố đều lẻ" là **sai**. Đây là phản ví dụ duy nhất cần thiết.

### Ví dụ 2 — "Mọi số thỏa n² > n đều thỏa n > 1"

**Mệnh đề:** ∀n ∈ ℝ, n² > n → n > 1.

**Phản ví dụ:** n = −1.

- n² = (−1)² = 1 > −1 = n. Vậy n² > n đúng.
- Nhưng n = −1 < 1, tức n > 1 sai.

∎ Mệnh đề sai.

*Nhận xét:* Mệnh đề đúng khi được thu hẹp về n > 0 (với n > 0: n² > n ↔ n > 1). Phản ví dụ giúp ta thấy điều kiện bị thiếu.

### Ví dụ 3 — "Mọi hàm f liên tục đều có đạo hàm"

**Mệnh đề:** ∀f liên tục trên ℝ, f có đạo hàm tại mọi điểm.

**Phản ví dụ:** f(x) = |x|.

- |x| liên tục tại mọi điểm của ℝ (kiểm tra bằng ε-δ hoặc nhận xét lim_{x→0} |x| = 0 = f(0)).
- Tại x = 0: giới hạn từ trái = lim_{h→0⁻} (|h|/h) = lim_{h→0⁻} (−h/h) = −1. Giới hạn từ phải = lim_{h→0⁺} (|h|/h) = 1. Hai giới hạn khác nhau → f không có đạo hàm tại x = 0.

∎ Mệnh đề sai.

### Ví dụ 4 — "Với mọi n ∈ ℕ, n² − n + 41 là số nguyên tố"

**Mệnh đề (cổ điển):** ∀n ∈ ℕ, P(n) = n² − n + 41 là số nguyên tố.

*Nguy hiểm:* Kiểm tra n = 1, 2, 3, ..., 40 đều cho số nguyên tố! (Công thức Euler 1772.) Có vẻ như đúng...

**Phản ví dụ:** n = 41.

- P(41) = 41² − 41 + 41 = 41² = 1681 = 41 × 41.
- 41² chia hết cho 41 và không phải số nguyên tố.

∎ Mệnh đề sai, dù đúng với 40 giá trị đầu tiên. Đây là ví dụ điển hình **không thể dùng quy nạp/ví dụ thay cho chứng minh**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu tôi không tìm ra phản ví dụ, mệnh đề có đúng không?"* — Không thể kết luận. Có thể mệnh đề đúng (và cần chứng minh), hoặc phản ví dụ tồn tại nhưng bạn chưa tìm ra. Không tìm thấy ≠ không tồn tại.
> - *"Phản ví dụ phải là số nguyên không?"* — Không. Phản ví dụ là bất kỳ phần tử x₀ nào trong miền D làm P(x₀) sai. Ví dụ 2 và 3 ở trên dùng số thực và hàm số.

> 🔁 **Dừng lại tự kiểm tra.** Tìm phản ví dụ cho: "Với mọi số thực a, b: nếu a² = b² thì a = b."
>
> <details><summary>Đáp án</summary>
>
> a = 1, b = −1. Ta có a² = 1 = (−1)² = b², nhưng a = 1 ≠ −1 = b. ∎
> (Mệnh đề đúng là: a² = b² ↔ |a| = |b| ↔ a = b hoặc a = −b.)
> </details>

> 📝 **Tóm tắt mục 4.**
> - Phản ví dụ: tìm một x₀ làm P(x₀) sai để bác ∀x P(x).
> - Một phản ví dụ là đủ — không cần thêm.
> - Không thể chứng minh mệnh đề phổ quát bằng ví dụ đúng, dù nhiều đến đâu.

---

## 5. So sánh và chiến lược chọn phương pháp

| Phương pháp | Dùng khi | Cấu trúc cốt lõi |
|-------------|----------|-----------------|
| Trực tiếp | Mệnh đề dạng p → q, chuỗi suy diễn thuận chiều rõ | Giả sử p → biến đổi → q |
| Phản đảo | p → q khó, nhưng ¬q → ¬p dễ | Giả sử ¬q → biến đổi → ¬p |
| Phản chứng | Q khó chứng minh dương (đặc biệt dạng "không", "vô hạn", "vô tỉ") | Giả sử ¬Q → tìm mâu thuẫn |
| Phản ví dụ | BÁC mệnh đề phổ quát ∀x P(x) | Tìm x₀ sao cho P(x₀) sai |

> 💡 **Trực giác chọn phương pháp.** Đọc mệnh đề và tự hỏi:
> 1. Kết luận của tôi là dương hay âm? Nếu âm ("không có", "vô tỉ") → nghĩ đến phản chứng.
> 2. Giả sử giả thiết p đúng, tôi có đường suy đến q không? Nếu có → trực tiếp. Nếu mắc kẹt → thử phản đảo.
> 3. Đây là mệnh đề phổ quát tôi **nghi ngờ là sai**? → tìm phản ví dụ trước.

---

## Bài tập

**Bài 1.** (Trực tiếp) Chứng minh: "Nếu n chia hết cho 6 thì n chia hết cho 2." Viết đủ bảng bước–lý do.

**Bài 2.** (Phản đảo) Chứng minh: "Nếu n² lẻ thì n lẻ." Hãy phát biểu rõ phản đảo là gì trước khi chứng minh.

**Bài 3.** (Phản chứng) Chứng minh: "Không có số nguyên tố lớn nhất." (Tức là tập số nguyên tố vô hạn — dùng chiến lược Euclid từ Ví dụ 2, Mục 3, nhưng viết lại độc lập.)

**Bài 4.** (Phản ví dụ) Mệnh đề: "Với mọi số nguyên n ≥ 2, n² − 1 là số nguyên tố." Tìm phản ví dụ và giải thích tại sao nó bác bỏ mệnh đề.

**Bài 5.** (Phân loại) Với mỗi mệnh đề sau, hãy chọn phương pháp chứng minh/bác bỏ phù hợp nhất và giải thích lý do lựa chọn:
- (a) "Với mọi số thực x, x² ≥ 0."
- (b) "Với mọi số thực x, x² ≥ x."
- (c) "Nếu n³ chẵn thì n chẵn."
- (d) "Mọi số tự nhiên đều là tổng của bốn số chính phương."

---

## Lời giải chi tiết

### Bài 1

**Phát biểu:** ∀n ∈ ℤ, 6 | n → 2 | n.

**Chứng minh trực tiếp:**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử 6 | n. | Giả thiết |
| 2 | n = 6k với k ∈ ℤ. | Định nghĩa chia hết |
| 3 | n = 2·(3k). | Viết lại 6k = 2·3k |
| 4 | 3k ∈ ℤ vì k ∈ ℤ. | Đóng với phép nhân |
| 5 | n = 2·(số nguyên) → 2 | n. | Định nghĩa chia hết |

∎

### Bài 2

**Phản đảo của "n² lẻ → n lẻ":** "n chẵn → n² chẵn."

**Chứng minh "n chẵn → n² chẵn" (trực tiếp):**

| Bước | Phát biểu | Lý do |
|------|-----------|-------|
| 1 | Giả sử n chẵn. | Giả thiết (¬q cho phản đảo) |
| 2 | n = 2k, k ∈ ℤ. | Định nghĩa số chẵn |
| 3 | n² = (2k)² = 4k². | Khai triển |
| 4 | n² = 2·(2k²). | Rút thừa số 2 |
| 5 | 2k² ∈ ℤ → n² chẵn. | Định nghĩa số chẵn |

∎ "n chẵn → n² chẵn" đúng, do tương đương phản đảo, "n² lẻ → n lẻ" đúng.

### Bài 3

**Phát biểu:** Không có số nguyên tố lớn nhất.

**Chứng minh phản chứng:**

Giả sử tồn tại số nguyên tố lớn nhất, gọi là p.

Khi đó tập tất cả số nguyên tố là hữu hạn: {p₁, p₂, ..., p} với p là phần tử lớn nhất.

Xét số N = p₁ · p₂ · ... · p + 1.

- N > p (vì N = tích mọi số nguyên tố ≥ 2 cộng 1, lớn hơn p).
- N > 1 nên N có ước nguyên tố q.
- q chia hết N, nhưng q không chia hết (p₁ · p₂ · ... · p) vì chia ra dư 1 (thử: p₁ · p₂ · ... · p = N − 1, và q | N, q | (N − (N − 1)) = 1 chỉ nếu q = 1, vô lý).

Cụ thể: Nếu q là một trong p₁, ..., p thì q | (p₁ · p₂ · ... · p) và q | N, suy ra q | (N − p₁·p₂·...·p) = 1. Nhưng q ≥ 2 không chia hết 1 — mâu thuẫn.

Vậy q là số nguyên tố không nằm trong danh sách — mâu thuẫn với p là số nguyên tố lớn nhất (vì q > p hoặc q chưa được liệt kê). ∎

### Bài 4

**Phản ví dụ cho "n² − 1 là số nguyên tố với mọi n ≥ 2":**

Thử n = 2: 4 − 1 = 3 (nguyên tố). Thử n = 3: 9 − 1 = 8 = 2 × 4 — không nguyên tố.

**Phản ví dụ là n = 3:** n² − 1 = 8 = 2 × 4. Vì 8 có ước là 2 và 4 (ngoài 1 và 8), 8 không phải số nguyên tố.

*Giải thích tại sao bác bỏ:* Mệnh đề nói "∀n ≥ 2". Tìm được một giá trị n = 3 làm mệnh đề sai là đủ để kết luận ∀n ≥ 2 sai.

*Nhận xét thêm:* n² − 1 = (n − 1)(n + 1). Với n ≥ 3 và n không nguyên tố, hoặc n lẻ: n − 1 ≥ 2 và n + 1 ≥ 4 và cả hai đều > 1 → n² − 1 có ước khác 1 và chính nó → không nguyên tố. Thực tế mệnh đề sai với hầu hết mọi n ≥ 3.

### Bài 5

**(a) "∀x ∈ ℝ, x² ≥ 0."**

Chọn **chứng minh trực tiếp**: x ∈ ℝ. Nếu x ≥ 0 thì x² ≥ 0 hiển nhiên. Nếu x < 0 thì x = −|x|, x² = |x|² ≥ 0. Vậy mọi x ∈ ℝ đều cho x² ≥ 0. ∎ (Không nên dùng phản ví dụ vì mệnh đề đúng; không cần phản chứng vì hướng trực tiếp đơn giản.)

**(b) "∀x ∈ ℝ, x² ≥ x."**

Mệnh đề này **sai**. Chọn **phản ví dụ**: x = 0.5. Khi đó x² = 0.25 < 0.5 = x. ∎ (Hoặc bất kỳ x ∈ (0, 1) đều là phản ví dụ.)

**(c) "Nếu n³ chẵn thì n chẵn."**

Chọn **phản đảo**: "n lẻ → n³ lẻ." Giả sử n = 2k + 1. Thì n³ = (2k+1)³ = 8k³ + 12k² + 6k + 1 = 2(4k³ + 6k² + 3k) + 1. Phần 4k³ + 6k² + 3k ∈ ℤ, vậy n³ = 2·(số nguyên) + 1 → n³ lẻ. ∎ Phản đảo đúng, mệnh đề gốc đúng.

**(d) "Mọi số tự nhiên đều là tổng của bốn số chính phương."**

Đây là **Định lý Lagrange (1770)** — thực ra đúng! Không cần phản ví dụ. Cần chứng minh, và chứng minh không tầm thường (dùng kết quả số học sâu). Đây là ví dụ cảnh báo: không tìm được phản ví dụ không có nghĩa mệnh đề sai — cần tìm chứng minh thực sự.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — ba công cụ tương tác: Trình dựng chứng minh từng bước, Minh họa phản chứng √2 vô tỉ, và Trò chơi săn phản ví dụ.

---

## Bài tiếp theo

→ **Lesson 07 — Tam đoạn luận (Syllogisms)**: cấu trúc luận cứ ba bước của Aristotle, các dạng hợp lệ và không hợp lệ, và ứng dụng trong lập luận triết học và pháp lý.

[⬆ Về Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
