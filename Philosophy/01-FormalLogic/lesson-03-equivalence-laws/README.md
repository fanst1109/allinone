# Lesson 03 — Tương đương & luật logic

> **Tầng 1 — Formal Logic · Bài 3/8**

Lesson 02 dạy bạn *đọc* bảng chân lý. Bài này tiến một bước xa hơn: hai công thức khác nhau về hình thức có thể **nói cùng một điều** không? Câu trả lời là có — và các **luật tương đương logic** là công cụ để biến đổi, đơn giản hóa và phân tích lập luận mà không phải vẽ lại bảng từ đầu. Đây là nền tảng của thiết kế mạch số, trình biên dịch, và lập luận hình thức.

---

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Phân biệt **hằng đúng (tautology)**, **hằng sai (contradiction)** và **khả thỏa (contingent)** — xác định bằng bảng chân lý.
- Định nghĩa **tương đương logic** (p ≡ q) và kiểm tra bằng hai phương pháp: so sánh bảng chân lý, và kiểm tra p↔q là hằng đúng.
- Phát biểu và verify (bằng bảng) các luật chính: phủ định kép, De Morgan, giao hoán, kết hợp, phân phối, đồng nhất, trội, lũy đẳng, hấp thụ, luật kéo theo, đảo đề.
- Phân biệt **đảo (converse)**, **phản (inverse)** và **phản đảo (contrapositive)** của một điều kiện — hiểu tại sao chỉ phản đảo mới tương đương với mệnh đề gốc.
- Ứng dụng các luật để đơn giản hóa công thức và kiểm tra lập luận.

---

## Kiến thức tiền đề

- Bảng chân lý, ký hiệu ¬ ∧ ∨ → ↔ → [Lesson 02 — Bảng chân lý](../lesson-02-truth-tables/)
- Mệnh đề logic, biến mệnh đề → [Lesson 01 — Mệnh đề & liên từ](../lesson-01-propositions/)

---

## 1. Hằng đúng, hằng sai và khả thỏa

### 1.1 Định nghĩa

> 💡 **Trực giác.** Có những phát biểu luôn đúng dù đời xảy ra thế nào — "Hôm nay trời hoặc không mưa" không cần nhìn ra cửa sổ cũng biết đúng. Có những phát biểu luôn sai — "Hôm nay vừa mưa vừa không mưa" là vô lý. Và phần lớn câu hỏi thực tế phụ thuộc vào sự kiện cụ thể.

**(a) Hằng đúng (tautology)** là công thức logic **luôn có giá trị T** ở mọi dòng bảng chân lý, bất kể giá trị của biến.

**(b) Hằng sai (contradiction)** là công thức **luôn có giá trị F** ở mọi dòng.

**(c) Khả thỏa (contingent)** là công thức có **ít nhất một dòng T và một dòng F** — giá trị phụ thuộc vào giá trị cụ thể của biến.

**(d) Vì sao cần.** Ba phân loại này trả lời: "công thức này có ý nghĩa thực sự không?" Hằng đúng không mang thông tin (luôn đúng). Hằng sai là mâu thuẫn nội tại (không thể thỏa mãn). Khả thỏa là công thức "có giá trị" — đúng hay sai tùy tình huống.

### 1.2 Ví dụ số

**Ví dụ 1 — Hằng đúng: p ∨ ¬p** ("Mưa hoặc không mưa")

| p | ¬p | p ∨ ¬p |
|:-:|:--:|:------:|
| T | F  | **T**  |
| F | T  | **T**  |

Mọi dòng đều T → hằng đúng ✓

**Ví dụ 2 — Hằng sai: p ∧ ¬p** ("Mưa và không mưa")

| p | ¬p | p ∧ ¬p |
|:-:|:--:|:------:|
| T | F  | **F**  |
| F | T  | **F**  |

Mọi dòng đều F → hằng sai ✓

**Ví dụ 3 — Hằng đúng với 2 biến: (p → q) ∨ (q → p)**

| p | q | p→q | q→p | (p→q)∨(q→p) |
|:-:|:-:|:---:|:---:|:-----------:|
| T | T |  T  |  T  |     **T**   |
| T | F |  F  |  T  |     **T**   |
| F | T |  T  |  F  |     **T**   |
| F | F |  T  |  T  |     **T**   |

Mọi dòng T → hằng đúng ✓

**Ví dụ 4 — Khả thỏa: p ∧ q**

| p | q | p ∧ q |
|:-:|:-:|:-----:|
| T | T |   T   |
| T | F |   F   |
| F | T |   F   |
| F | F |   F   |

Có dòng T (dòng 1) lẫn dòng F → khả thỏa ✓

> ⚠ **Lỗi thường gặp: nhầm "luôn đúng trong thực tế" với hằng đúng logic.** "Nếu học chăm thì thi đỗ" (p→q) có thể đúng trong thực tế nhưng *không phải* hằng đúng — ở dòng p=T, q=F (học chăm nhưng thi trượt) thì p→q = F. Hằng đúng logic phải T ở *mọi* dòng bảng chân lý, kể cả những dòng "phi thực tế".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Hằng sai có ích gì?"* — Rất quan trọng trong kiểm tra lập luận: nếu một tập giả thuyết dẫn tới hằng sai, tập đó **mâu thuẫn** và không thể đồng thời đúng. Cũng là nền tảng của phương pháp chứng minh bác bỏ (proof by contradiction).
> - *"p ∨ ¬p và q ∨ ¬q có phải cùng hằng đúng không?"* — Có, cả hai đều luôn T, nhưng chúng là hai công thức *khác nhau*. Xem mục 2 để hiểu "tương đương" nghĩa là gì.

> 🔁 **Dừng lại tự kiểm tra.** Công thức `(p ∧ q) ∨ ¬(p ∧ q)` là hằng đúng, hằng sai, hay khả thỏa?
> <details><summary>Đáp án</summary>
>
> Đặt r = p ∧ q. Công thức trở thành r ∨ ¬r — luôn T dù r là T hay F. Vậy đây là **hằng đúng**, dù nhìn có vẻ phức tạp.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Hằng đúng (tautology): mọi dòng T. Ví dụ: p ∨ ¬p.
> - Hằng sai (contradiction): mọi dòng F. Ví dụ: p ∧ ¬p.
> - Khả thỏa (contingent): có cả dòng T và dòng F. Ví dụ: p ∧ q.
> - Phân loại này không phụ thuộc nội dung ngữ nghĩa, chỉ phụ thuộc cấu trúc logic.

---

## 2. Tương đương logic

### 2.1 Định nghĩa

> 💡 **Trực giác.** "Tôi không ngủ dậy trễ" và "Tôi thức dậy đúng giờ" nghe khác về từ ngữ nhưng nói cùng một điều. Trong logic, hai công thức *tương đương* khi chúng có cùng bảng chân lý — cùng đúng, cùng sai ở mọi tình huống có thể.

**(a) Là gì.** Hai công thức p và q **tương đương logic** (ký hiệu p ≡ q) khi chúng có **giá trị chân lý giống hệt nhau ở mọi dòng** của bảng chân lý.

**(b) Vì sao cần.** Tương đương cho phép ta *thay thế* một công thức bằng công thức khác đơn giản hơn mà không thay đổi ý nghĩa. Đây là nền tảng của việc đơn giản hóa biểu thức logic trong lập trình, thiết kế mạch, và chứng minh toán học.

**(c) Kiểm tra bằng hai phương pháp tương đương nhau:**

**Phương pháp 1:** So sánh trực tiếp bảng chân lý. Nếu cột cuối của hai công thức giống hệt nhau ở mọi dòng → tương đương.

**Phương pháp 2:** Tính p ↔ q. Nếu p ↔ q là **hằng đúng** (mọi dòng T) → p ≡ q.

Hai phương pháp cho cùng kết quả. Phương pháp 2 đặc biệt hữu ích vì bạn chỉ cần kiểm tra xem một công thức có phải hằng đúng không.

### 2.2 Ví dụ verify

**Ví dụ 1 — Verify ¬¬p ≡ p bằng phương pháp 1:**

| p | ¬p | ¬¬p |
|:-:|:--:|:---:|
| T |  F |  T  |
| F |  T |  F  |

Cột p và cột ¬¬p giống nhau hoàn toàn → ¬¬p ≡ p ✓

**Ví dụ 2 — Verify p → q ≡ ¬p ∨ q bằng phương pháp 2:**

| p | q | p→q | ¬p | ¬p∨q | (p→q)↔(¬p∨q) |
|:-:|:-:|:---:|:--:|:----:|:------------:|
| T | T |  T  |  F |   T  |      **T**   |
| T | F |  F  |  F |   F  |      **T**   |
| F | T |  T  |  T |   T  |      **T**   |
| F | F |  T  |  T |   T  |      **T**   |

Cột cuối toàn T → (p→q)↔(¬p∨q) là hằng đúng → p→q ≡ ¬p∨q ✓

**Ví dụ 3 — Verify De Morgan ¬(p ∧ q) ≡ ¬p ∨ ¬q:**

| p | q | p∧q | ¬(p∧q) | ¬p | ¬q | ¬p∨¬q |
|:-:|:-:|:---:|:------:|:--:|:--:|:-----:|
| T | T |  T  |   F    |  F |  F |   F   |
| T | F |  F  |   T    |  F |  T |   T   |
| F | T |  F  |   T    |  T |  F |   T   |
| F | F |  F  |   T    |  T |  T |   T   |

Cột ¬(p∧q) và cột ¬p∨¬q giống hệt → De Morgan ✓

**Ví dụ 4 — Phản ví dụ: p ∧ q KHÔNG tương đương p ∨ q:**

| p | q | p∧q | p∨q |
|:-:|:-:|:---:|:---:|
| T | T |  T  |  T  |
| T | F |  F  |  T  |← khác nhau ở đây
| F | T |  F  |  T  |← và ở đây
| F | F |  F  |  F  |

Có dòng khác nhau → p∧q ≢ p∨q.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Ký hiệu ≡ và ↔ khác nhau chỗ nào?"* — ↔ là một **toán tử** trong công thức logic, tạo ra một công thức mới có thể T hoặc F. Còn ≡ là **phát biểu về hai công thức** — nói rằng chúng tương đương. p ≡ q đúng khi và chỉ khi p↔q là hằng đúng.
> - *"Có thể có 3 công thức tương đương nhau không?"* — Có. Nếu p ≡ q và q ≡ r thì p ≡ r (tính bắc cầu). Nhiều công thức cùng biểu diễn một điều — đây là cơ sở của việc tối giản biểu thức logic.

> 🔁 **Dừng lại tự kiểm tra.** Kiểm tra bằng bảng chân lý: p ∨ (p ∧ q) có tương đương p không?
> <details><summary>Đáp án</summary>
>
> | p | q | p∧q | p∨(p∧q) |
> |:-:|:-:|:---:|:-------:|
> | T | T |  T  |    T    |
> | T | F |  F  |    T    |
> | F | T |  F  |    F    |
> | F | F |  F  |    F    |
>
> Cột p∨(p∧q) và cột p giống nhau hoàn toàn → p∨(p∧q) ≡ p ✓. Đây là **luật hấp thụ** (absorption law).
> </details>

> 📝 **Tóm tắt mục 2.**
> - p ≡ q khi hai công thức có cùng bảng chân lý.
> - Kiểm tra: (1) so sánh cột bảng, hoặc (2) xem p↔q có là hằng đúng không.
> - ≡ là phát biểu về sự tương đương, ↔ là toán tử trong công thức.

---

## 3. Các luật tương đương cơ bản

Dưới đây là bộ luật cốt lõi. Mỗi luật đã được verify bằng bảng chân lý (hoặc dễ dàng verify — bài tập 1–4 yêu cầu bạn tự verify một số).

### 3.1 Phủ định kép (Double Negation)

$$\neg\neg p \equiv p$$

**(a) Là gì.** Phủ định hai lần trả về giá trị gốc.

**(b) Ví dụ:** "Không phải không mưa" ≡ "Mưa". Bảng verify ở mục 2.2 ví dụ 1.

**4 ví dụ số:**
- p = T → ¬p = F → ¬¬p = T ✓ (bằng p)
- p = F → ¬p = T → ¬¬p = F ✓ (bằng p)
- "Không phải không đúng" = "đúng"
- Trong code: `!!x` trong nhiều ngôn ngữ cho giá trị boolean của `x`

### 3.2 Luật De Morgan

$$\neg(p \land q) \equiv \neg p \lor \neg q$$
$$\neg(p \lor q) \equiv \neg p \land \neg q$$

> 💡 **Trực giác.** Muốn phủ định "Trời mưa VÀ lạnh": đủ để một trong hai điều *không xảy ra* — tức "không mưa HOẶC không lạnh". Muốn phủ định "Trời mưa HOẶC lạnh": phải *cả hai đều không* — "không mưa VÀ không lạnh". Phủ định "lật" ∧ thành ∨ (và ngược lại), đồng thời phủ định từng thành phần.

**Verify De Morgan 1 bằng bảng (đã có ở mục 2.2 ví dụ 3):** ✓

**Verify De Morgan 2 — ¬(p ∨ q) ≡ ¬p ∧ ¬q:**

| p | q | p∨q | ¬(p∨q) | ¬p | ¬q | ¬p∧¬q |
|:-:|:-:|:---:|:------:|:--:|:--:|:-----:|
| T | T |  T  |   F    |  F |  F |   F   |
| T | F |  T  |   F    |  F |  T |   F   |
| F | T |  T  |   F    |  T |  F |   F   |
| F | F |  F  |   T    |  T |  T |   T   |

Hai cột tô màu giống hệt → De Morgan 2 ✓

**4 ví dụ ứng dụng:**
- ¬(p ∧ q) = ¬p ∨ ¬q: "Không phải (học toán và lý)" = "Không học toán, hoặc không học lý"
- ¬(p ∨ q) = ¬p ∧ ¬q: "Không phải (mưa hoặc nắng)" = "Không mưa và không nắng"
- Đơn giản hóa: ¬(A ∧ ¬B) = ¬A ∨ ¬¬B = ¬A ∨ B
- Trong code: `!(a && b)` tương đương `!a || !b`

> ⚠ **Lỗi thường gặp: phủ định không đúng De Morgan.** Học sinh hay viết ¬(p∧q) = ¬p ∧ ¬q (giữ nguyên ∧, chỉ phủ định từng phần) — **sai**. Phải đổi ∧ → ∨. Phản ví dụ: p=T, q=F: ¬(T∧F)=¬F=T; nhưng ¬T∧¬F=F∧T=F — kết quả khác hoàn toàn.

### 3.3 Giao hoán (Commutative)

$$p \land q \equiv q \land p$$
$$p \lor q \equiv q \lor p$$

**(a) Là gì.** Thứ tự hai vế không ảnh hưởng giá trị của ∧ và ∨.

**4 ví dụ:** 
- T∧F = F = F∧T ✓
- T∨F = T = F∨T ✓
- "Mưa và lạnh" ≡ "Lạnh và mưa" 
- "Học toán hoặc lý" ≡ "Học lý hoặc toán"

> ⚠ **Chú ý: → không giao hoán.** p→q ≢ q→p. Ví dụ: "Nếu mưa thì ướt" ≠ "Nếu ướt thì mưa".

### 3.4 Kết hợp (Associative)

$$p \land (q \land r) \equiv (p \land q) \land r$$
$$p \lor (q \lor r) \equiv (p \lor q) \lor r$$

**(a) Là gì.** Vị trí dấu ngoặc không ảnh hưởng với ∧ và ∨ — có thể viết p∧q∧r mà không cần ngoặc.

**4 ví dụ số (p=T, q=F, r=T):**
- T∧(F∧T) = T∧F = F; (T∧F)∧T = F∧T = F ✓
- T∨(F∨T) = T∨T = T; (T∨F)∨T = T∨T = T ✓
- T∧(T∧T) = T; (T∧T)∧T = T ✓
- F∨(F∨F) = F; (F∨F)∨F = F ✓

### 3.5 Phân phối (Distributive)

$$p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$$
$$p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$$

> 💡 **Trực giác.** Giống nhân trong đại số: a(b+c) = ab+ac. Luật phân phối cho phép "mở ngoặc" trong logic.

**Walk-through bằng số (p=T, q=T, r=F):**

- Vế trái: T ∧ (T ∨ F) = T ∧ T = **T**
- Vế phải: (T∧T) ∨ (T∧F) = T ∨ F = **T** ✓

**Walk-through bằng số (p=T, q=F, r=F):**

- Vế trái: T ∧ (F ∨ F) = T ∧ F = **F**
- Vế phải: (T∧F) ∨ (T∧F) = F ∨ F = **F** ✓

**Verify bảng chân lý đầy đủ (luật phân phối 1):**

| p | q | r | q∨r | p∧(q∨r) | p∧q | p∧r | (p∧q)∨(p∧r) |
|:-:|:-:|:-:|:---:|:-------:|:---:|:---:|:-----------:|
| T | T | T |  T  |    T    |  T  |  T  |      T      |
| T | T | F |  T  |    T    |  T  |  F  |      T      |
| T | F | T |  T  |    T    |  F  |  T  |      T      |
| T | F | F |  F  |    F    |  F  |  F  |      F      |
| F | T | T |  T  |    F    |  F  |  F  |      F      |
| F | T | F |  T  |    F    |  F  |  F  |      F      |
| F | F | T |  T  |    F    |  F  |  F  |      F      |
| F | F | F |  F  |    F    |  F  |  F  |      F      |

Cột 5 và cột 8 giống nhau → phân phối ✓

### 3.6 Đồng nhất, Trội, Lũy đẳng

**Đồng nhất (Identity):**
$$p \land T \equiv p \qquad p \lor F \equiv p$$

**Ví dụ:** T∧T=T=T; F∧T=F=F; T∨F=T=T; F∨F=F=F ✓. Phép AND với T hoặc OR với F không thay đổi gì — T và F lần lượt là "phần tử trung lập" của ∧ và ∨.

**Trội (Domination/Annihilation):**
$$p \lor T \equiv T \qquad p \land F \equiv F$$

**Ví dụ:** T∨T=T; F∨T=T ✓; T∧F=F; F∧F=F ✓. T "thống trị" OR, F "thống trị" AND — bất kể p là gì.

**Lũy đẳng (Idempotent):**
$$p \land p \equiv p \qquad p \lor p \equiv p$$

**Ví dụ:** T∧T=T; F∧F=F ✓; T∨T=T; F∨F=F ✓. "Học toán và học toán" = "học toán".

### 3.7 Hấp thụ (Absorption)

$$p \lor (p \land q) \equiv p$$
$$p \land (p \lor q) \equiv p$$

> 💡 **Trực giác.** "Học toán, hoặc (học toán và học lý)" — câu này nói gì mới so với "học toán"? Không gì cả. Phần (p∧q) bị p "hấp thụ" hoàn toàn.

**Walk-through bằng số:**
- p=T, q=F: T∨(T∧F) = T∨F = T = p ✓
- p=F, q=T: F∨(F∧T) = F∨F = F = p ✓
- p=T, q=T: T∨(T∧T) = T∨T = T = p ✓
- p=F, q=F: F∨(F∧F) = F∨F = F = p ✓

Bốn trường hợp đều cho kết quả bằng p → luật hấp thụ ✓. (Đây cũng là đáp án bài kiểm tra ở mục 2.)

### 3.8 Luật kéo theo (Implication Law)

$$p \rightarrow q \equiv \neg p \lor q$$

**(a) Là gì.** Phát biểu "nếu p thì q" tương đương với "không p, hoặc q".

**(b) Vì sao cần.** Luật này cho phép loại bỏ → khỏi công thức, chỉ còn ¬ và ∨ — đơn giản hóa phân tích. Cũng giải thích vì sao p→q = T khi p=F: nếu tiền đề sai, điều kiện "không p" (¬p) đã đúng → ¬p∨q đúng.

**Verify bảng (đã có ở mục 2.2 ví dụ 2):** ✓

**4 ví dụ số:**
- p=T, q=T: T→T = T; ¬T∨T = F∨T = T ✓
- p=T, q=F: T→F = F; ¬T∨F = F∨F = F ✓
- p=F, q=T: F→T = T; ¬F∨T = T∨T = T ✓
- p=F, q=F: F→F = T; ¬F∨F = T∨F = T ✓

### 3.9 Đảo đề (Contrapositive Law)

$$p \rightarrow q \equiv \neg q \rightarrow \neg p$$

**(a) Là gì.** "Nếu p thì q" tương đương "Nếu không q thì không p". Phản đảo (contrapositive) luôn tương đương với mệnh đề gốc.

**Verify bằng bảng:**

| p | q | ¬p | ¬q | p→q | ¬q→¬p |
|:-:|:-:|:--:|:--:|:---:|:-----:|
| T | T |  F |  F |  T  |   T   |
| T | F |  F |  T |  F  |   F   |
| F | T |  T |  F |  T  |   T   |
| F | F |  T |  T |  T  |   T   |

Hai cột giống hệt → p→q ≡ ¬q→¬p ✓

**Ví dụ thực tế (với số):**

"Nếu mưa (p) thì đường ướt (q)" ≡ "Nếu đường không ướt (¬q) thì không mưa (¬p)" ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao cần biết luật contrapositive?"* — Trong chứng minh toán học, đôi khi chứng minh thuận (p→q) khó, nhưng chứng minh phản đảo (¬q→¬p) lại dễ hơn. Vì chúng tương đương, chứng minh một cái là chứng minh cả hai.

> 📝 **Tóm tắt mục 3.** Bảng tóm tắt các luật:
> | Luật | Công thức |
> |------|-----------|
> | Phủ định kép | ¬¬p ≡ p |
> | De Morgan 1 | ¬(p∧q) ≡ ¬p∨¬q |
> | De Morgan 2 | ¬(p∨q) ≡ ¬p∧¬q |
> | Kéo theo | p→q ≡ ¬p∨q |
> | Đảo đề | p→q ≡ ¬q→¬p |
> | Hấp thụ | p∨(p∧q) ≡ p |
> | Phân phối | p∧(q∨r) ≡ (p∧q)∨(p∧r) |

---

## 4. Đảo, phản, phản đảo của điều kiện

### 4.1 Bốn biến thể của p → q

> 💡 **Trực giác.** Từ một điều kiện "Nếu p thì q", có thể tạo ra ba biến thể bằng cách lật hoặc phủ định. Bẫy kinh điển là cho rằng tất cả bốn điều đó tương đương nhau — chỉ có một biến thể tương đương với gốc.

Cho mệnh đề gốc: **p → q** ("Nếu p thì q")

| Tên | Công thức | Tương đương với gốc? |
|-----|-----------|:-------------------:|
| Gốc (Original) | p → q | — |
| **Đảo (Converse)** | q → p | **Không** |
| **Phản (Inverse)** | ¬p → ¬q | **Không** |
| **Phản đảo (Contrapositive)** | ¬q → ¬p | **Có** ✓ |

### 4.2 Verify bằng bảng chân lý đầy đủ

| p | q | p→q | q→p | ¬p→¬q | ¬q→¬p |
|:-:|:-:|:---:|:---:|:-----:|:-----:|
| T | T |  T  |  T  |   T   |   T   |
| T | F |  F  |  T  |   T   |   F   |
| F | T |  T  |  F  |   F   |   T   |
| F | F |  T  |  T  |   T   |   T   |

Quan sát:
- Cột p→q và cột ¬q→¬p giống hệt → **gốc ≡ phản đảo** ✓
- Cột q→p và cột ¬p→¬q giống hệt → **đảo ≡ phản** (hai cái sai cũng tương đương nhau!)
- Dòng 2 và 3: gốc ≠ đảo, gốc ≠ phản → **đảo và phản KHÔNG tương đương gốc**

### 4.3 Ví dụ ngôn ngữ tự nhiên

**Mệnh đề gốc:** "Nếu trời mưa (p) thì đường ướt (q)"

- **Đảo (Converse):** "Nếu đường ướt (q) thì trời mưa (p)" — **KHÔNG tương đương!** Đường ướt có thể do tưới cây, không nhất thiết vì mưa.
- **Phản (Inverse):** "Nếu trời không mưa (¬p) thì đường không ướt (¬q)" — **KHÔNG tương đương!** Trời không mưa nhưng ai đó vừa tưới cây.
- **Phản đảo (Contrapositive):** "Nếu đường không ướt (¬q) thì trời không mưa (¬p)" — **Tương đương** ✓. Đường khô chắc chắn không có mưa.

**Ví dụ toán học (để thấy rõ hơn):**

Gốc: "Nếu n là số chẵn (p) thì n² là số chẵn (q)." — Đúng.
- Đảo: "Nếu n² là số chẵn thì n là số chẵn." — Thực ra cũng đúng (đây là ví dụ đặc biệt — không phải lúc nào đảo cũng sai, chỉ là không **đảm bảo** tương đương).
- Phản đảo: "Nếu n² không chẵn thì n không chẵn." — Tương đương và đúng ✓.

Để thấy đảo có thể sai: Gốc: "Nếu n chia hết cho 4 (p) thì n chia hết cho 2 (q)." — Đúng. Đảo: "Nếu n chia hết cho 2 thì n chia hết cho 4." — Sai (n=6 chia hết cho 2 nhưng không chia hết cho 4).

> ⚠ **Lỗi thường gặp — lỗi kinh điển nhất trong logic.**
> 1. **Nhầm đảo (converse) với phản đảo (contrapositive):** "Nếu mưa thì ướt, vậy nếu ướt thì mưa" — đây là đảo, **không** phải phản đảo.
> 2. **Cho rằng đảo/phản cũng đúng khi gốc đúng:** Gốc đúng không kéo theo đảo đúng. Ví dụ: "Nếu là hình vuông thì là hình chữ nhật" (đúng). Đảo: "Nếu là hình chữ nhật thì là hình vuông" — sai!
> 3. **Nhầm "phản đảo" (contrapositive) với "phản" (inverse):** Phản là ¬p→¬q, phản đảo là ¬q→¬p — khác nhau hoàn toàn về ý nghĩa và chỉ phản đảo mới tương đương gốc.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khi nào đảo cũng tương đương gốc?"* — Khi p↔q (hai chiều). Nếu p↔q thì p→q ≡ q→p vì cả hai đều = biconditional. Nhưng đó không phải trường hợp tổng quát.
> - *"Phân biệt contrapositive và inverse bằng cách nào dễ nhớ?"* — Contrapositive: "đảo *và* phủ định cả hai" (lật thứ tự, phủ định cả hai). Inverse: "chỉ phủ định cả hai" (giữ thứ tự, phủ định cả hai). Chỉ contrapositive mới tương đương gốc.

> 🔁 **Dừng lại tự kiểm tra.** Cho "Nếu học giỏi (p) thì được học bổng (q)." Viết: (a) đảo, (b) phản, (c) phản đảo. Cái nào tương đương mệnh đề gốc?
> <details><summary>Đáp án</summary>
>
> (a) Đảo: "Nếu được học bổng thì học giỏi." (q→p) — **Không** tương đương gốc.
>
> (b) Phản: "Nếu không học giỏi thì không được học bổng." (¬p→¬q) — **Không** tương đương gốc.
>
> (c) Phản đảo: "Nếu không được học bổng thì không học giỏi." (¬q→¬p) — **Tương đương** gốc ✓.
>
> Lưu ý: (a) và (b) tương đương *với nhau* (đảo ≡ phản), nhưng không tương đương với gốc.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Từ p→q tạo được: đảo (q→p), phản (¬p→¬q), phản đảo (¬q→¬p).
> - Chỉ phản đảo ≡ gốc. Đảo ≡ phản (tương đương *với nhau* nhưng không với gốc).
> - Lỗi kinh điển: tưởng đảo hoặc phản tương đương gốc.

---

## 5. Ứng dụng: đơn giản hóa công thức

> 💡 **Trực giác.** Các luật tương đương là như "phép tính đại số" nhưng cho logic. Thay vì vẽ bảng chân lý (tốn 2ⁿ dòng), ta có thể **biến đổi từng bước** để đơn giản hóa.

### Ví dụ 1: Đơn giản hóa ¬(¬p ∨ q) ∨ (p ∨ q)

**Bước 1:** De Morgan: ¬(¬p∨q) ≡ ¬¬p ∧ ¬q = p ∧ ¬q

Công thức thành: **(p ∧ ¬q) ∨ (p ∨ q)**

**Bước 2:** Phân phối: (p∧¬q)∨p = p∨(p∧¬q) ≡ p [hấp thụ]; rồi p ∨ q.

Gộp lại: **(p ∧ ¬q) ∨ p ∨ q** → **p ∨ q** (hấp thụ: p∨(p∧¬q)=p)

Công thức thành: **p ∨ q**

*Kết quả:* ¬(¬p∨q) ∨ (p∨q) ≡ **p ∨ q**

**Verify nhanh (p=T, q=F):**
- Gốc: ¬(¬T∨F)∨(T∨F) = ¬(F∨F)∨T = ¬F∨T = T∨T = T
- Kết quả p∨q: T∨F = T ✓

### Ví dụ 2: Chứng minh (p→q) ∧ (p→r) ≡ p→(q∧r)

**Bước 1:** Dùng luật kéo theo: p→q ≡ ¬p∨q; p→r ≡ ¬p∨r

Vế trái thành: **(¬p∨q) ∧ (¬p∨r)**

**Bước 2:** Phân phối: (¬p∨q)∧(¬p∨r) ≡ ¬p ∨ (q∧r)

**Bước 3:** Luật kéo theo ngược lại: ¬p∨(q∧r) ≡ p→(q∧r)

*Kết quả:* (p→q)∧(p→r) ≡ **p→(q∧r)** ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Phải dùng luật theo thứ tự cụ thể không?"* — Không có thứ tự bắt buộc, nhưng có chiến lược hợp lý: (1) loại bỏ → bằng luật kéo theo, (2) đưa ¬ vào trong bằng De Morgan, (3) đơn giản hóa bằng đồng nhất/hấp thụ.
> - *"Khi nào dùng bảng, khi nào dùng luật biến đổi?"* — Bảng chân lý chắc chắn hơn (không cần nhớ luật) nhưng bùng nổ theo 2ⁿ với n biến. Biến đổi đại số nhanh hơn với công thức phức tạp và nhiều biến.

---

## Bài tập

**Bài 1.** Sử dụng bảng chân lý để verify luật phủ định kép ¬¬p ≡ p. Viết bảng đầy đủ và kết luận.

**Bài 2.** Verify p ∨ (p ∧ q) ≡ p (luật hấp thụ) bằng bảng chân lý 4 dòng.

**Bài 3.** Cho công thức A = ¬(p ∨ q) và B = ¬p ∧ ¬q. Dùng bảng chân lý để kiểm tra A ≡ B hay không.

**Bài 4.** Xét công thức p → (q → r). Dùng luật kéo theo và De Morgan để chứng minh p→(q→r) ≡ (p∧q)→r.

**Bài 5.** Cho "Nếu đậu kỳ thi (p) thì được thưởng (q)":
- (a) Viết đảo, phản, phản đảo.
- (b) Bảng chân lý 4 dòng so sánh cả bốn công thức.
- (c) Từ bảng, kết luận cái nào tương đương cái nào.

**Bài 6 (nâng cao).** Đơn giản hóa công thức sau bằng cách áp dụng các luật (không dùng bảng):
`¬(¬p ∧ ¬q) ∨ (p ∧ T)`. Ghi rõ từng bước dùng luật nào.

---

## Lời giải chi tiết

**Bài 1 — Verify ¬¬p ≡ p:**

| p | ¬p | ¬¬p | ¬¬p ≡ p? |
|:-:|:--:|:---:|:--------:|
| T |  F |  T  |    ✓     |
| F |  T |  F  |    ✓     |

Cột p và cột ¬¬p giống hệt nhau ở cả 2 dòng → ¬¬p ≡ p. (Kiểm tra bằng phương pháp 2: p↔¬¬p luôn T → hằng đúng → tương đương ✓)

---

**Bài 2 — Verify hấp thụ p ∨ (p ∧ q) ≡ p:**

| p | q | p∧q | p∨(p∧q) | bằng p? |
|:-:|:-:|:---:|:-------:|:-------:|
| T | T |  T  |    T    |   ✓     |
| T | F |  F  |    T    |   ✓     |
| F | T |  F  |    F    |   ✓     |
| F | F |  F  |    F    |   ✓     |

Cột p∨(p∧q) bằng cột p ở mọi dòng → p∨(p∧q) ≡ p ✓

---

**Bài 3 — Kiểm tra ¬(p∨q) ≡ ¬p∧¬q:**

| p | q | p∨q | ¬(p∨q) | ¬p | ¬q | ¬p∧¬q | A≡B? |
|:-:|:-:|:---:|:------:|:--:|:--:|:-----:|:----:|
| T | T |  T  |   F    |  F |  F |   F   |  ✓   |
| T | F |  T  |   F    |  F |  T |   F   |  ✓   |
| F | T |  T  |   F    |  T |  F |   F   |  ✓   |
| F | F |  F  |   T    |  T |  T |   T   |  ✓   |

Cột A (¬(p∨q)) và cột B (¬p∧¬q) giống hệt ở cả 4 dòng → A ≡ B ✓. Đây là **De Morgan 2**.

---

**Bài 4 — Chứng minh p→(q→r) ≡ (p∧q)→r:**

Cách tiếp cận: dùng luật kéo theo để loại bỏ → từng bước.

```
p → (q → r)
≡  p → (¬q ∨ r)           [kéo theo cho q→r]
≡  ¬p ∨ (¬q ∨ r)          [kéo theo cho p→(...)]
≡  (¬p ∨ ¬q) ∨ r          [kết hợp]
≡  ¬(p ∧ q) ∨ r            [De Morgan ngược]
≡  (p ∧ q) → r             [kéo theo ngược]
```

Vậy p→(q→r) ≡ (p∧q)→r ✓. Đây là **Luật xuất (Export law)** — rất quan trọng trong logic và lập trình hàm.

---

**Bài 5 — Đảo/phản/phản đảo:**

(a) Gốc: "Nếu đậu (p) thì được thưởng (q)": p→q
- Đảo: q→p: "Nếu được thưởng thì đậu kỳ thi"
- Phản: ¬p→¬q: "Nếu không đậu thì không được thưởng"
- Phản đảo: ¬q→¬p: "Nếu không được thưởng thì không đậu"

(b) Bảng:

| p | q | p→q | q→p | ¬p→¬q | ¬q→¬p |
|:-:|:-:|:---:|:---:|:-----:|:-----:|
| T | T |  T  |  T  |   T   |   T   |
| T | F |  F  |  T  |   T   |   F   |
| F | T |  T  |  F  |   F   |   T   |
| F | F |  T  |  T  |   T   |   T   |

(c) Kết luận từ bảng:
- Cột p→q = cột ¬q→¬p → **gốc ≡ phản đảo** ✓
- Cột q→p = cột ¬p→¬q → **đảo ≡ phản** ✓
- Gốc ≢ đảo (khác ở dòng 2, 3) → đảo không tương đương gốc
- Gốc ≢ phản (khác ở dòng 2, 3) → phản không tương đương gốc

---

**Bài 6 — Đơn giản hóa ¬(¬p ∧ ¬q) ∨ (p ∧ T):**

```
¬(¬p ∧ ¬q) ∨ (p ∧ T)
≡  ¬(¬p ∧ ¬q) ∨ p          [đồng nhất: p∧T ≡ p]
≡  (¬¬p ∨ ¬¬q) ∨ p          [De Morgan: ¬(A∧B)≡¬A∨¬B, với A=¬p, B=¬q]
≡  (p ∨ q) ∨ p               [phủ định kép: ¬¬p≡p, ¬¬q≡q]
≡  p ∨ q ∨ p                 [kết hợp: bỏ ngoặc]
≡  p ∨ p ∨ q                 [giao hoán]
≡  p ∨ q                     [lũy đẳng: p∨p≡p]
```

**Kết quả:** ¬(¬p ∧ ¬q) ∨ (p ∧ T) ≡ **p ∨ q**

Verify nhanh với p=F, q=T: ¬(¬F∧¬T)∨(F∧T) = ¬(T∧F)∨F = ¬F∨F = T∨F = T; và p∨q = F∨T = T ✓.

---

## Code & Minh họa

[visualization.html](./visualization.html) — ba công cụ tương tác:
1. **Máy kiểm tra tương đương**: nhập hai công thức, tự động sinh bảng chân lý và kết luận.
2. **Demo De Morgan**: bật/tắt từng giá trị, so sánh hai bảng song song.
3. **Đảo/phản/phản đảo**: nhập p→q, hiện cả bốn biến thể với bảng và highlight cái nào tương đương.

---

## Bài tiếp theo

→ [**Lesson 04 — Tính hợp lệ & suy luận**](../lesson-04-validity-inference/): Khi nào một lập luận được gọi là *hợp lệ*? Các dạng suy luận cơ bản: modus ponens, modus tollens, disjunctive syllogism. Phân biệt suy luận hợp lệ và suy luận đúng (sound).

[⬆ Về Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
