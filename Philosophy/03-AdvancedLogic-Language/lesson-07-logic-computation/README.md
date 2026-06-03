# Lesson 07 — Logic & tính toán

> **Tầng 3 — Advanced Logic & Language · Bài 7/8**

Logic hình thức không chỉ là công cụ triết học — nó là **nền tảng kỹ thuật** của mọi máy tính hiện đại. Bài này khám phá cầu nối kỳ diệu giữa công thức mệnh đề và mạch điện tử: một biến Boolean là một bit, một liên từ là một cổng, và toàn bộ CPU của bạn là một công thức logic khổng lồ. Sau đó ta sẽ hỏi câu hỏi sâu hơn: *logic nào quyết định được?* — và câu trả lời liên kết với định lý bất toàn của Gödel và bài toán dừng của Turing.

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích tương ứng Boolean ↔ cổng logic: AND/OR/NOT và NAND/NOR phổ quát.
- Dựng cổng XOR từ AND/OR/NOT và từ chỉ NAND.
- Phân biệt "thỏa được" (satisfiable) với "hằng đúng" (tautology).
- Giải thích bài toán SAT là NP-đầy đủ (NP-complete) — ý nghĩa thực tế.
- Phân biệt "quyết định được" (decidable) vs "không quyết định được" (undecidable).
- Liên hệ decidability của logic mệnh đề / logic vị từ với bài toán dừng và Gödel.

## Kiến thức tiền đề

- [Lesson 02 — Bảng chân lý & liên từ logic](../../01-FormalLogic/lesson-02-truth-tables/) — bảng chân lý, AND/OR/NOT/→/↔
- [Lesson 03 — Gödel & bất toàn](../lesson-03-godel-incompleteness/) — định lý bất toàn, tự-tham chiếu
- Tùy chọn: [DataFoundations — Biểu diễn số](../../../DataFoundations/01-NumberRepresentation/) — bit, hệ nhị phân
- Tùy chọn: [Algorithms — Nền tảng](../../../Algorithms/tier-0-foundations/) — độ phức tạp, NP

---

## 1. Đại số Boole & cổng logic

> 💡 **Trực giác.** Bóng đèn có hai trạng thái: bật (1) hoặc tắt (0). Nếu bạn muốn đèn sáng CHỈ KHI cả công tắc A VÀ công tắc B đều bật — bạn vừa tạo ra một cổng AND. Toàn bộ máy tính là hàng tỷ công tắc nhỏ (transistor) được nối theo những sơ đồ như vậy. George Boole (1847) tưởng mình đang nghiên cứu logic tư duy của Aristotle; Claude Shannon (1937) nhận ra rằng đại số của Boole mô tả chính xác hành vi của mạch điện.

### 1.1 Ba cổng cơ bản

| Cổng | Ký hiệu | Định nghĩa | Phép tính | Ví dụ số |
|------|:---:|---|---|---|
| AND | ∧ | 1 chỉ khi CẢ HAI đầu vào = 1 | p · q | 1 AND 0 = 0 |
| OR  | ∨ | 1 khi ÍT NHẤT MỘT đầu vào = 1 | p + q | 0 OR 1 = 1 |
| NOT | ¬ | Đảo ngược: 0→1, 1→0 | p̄ (p-bar) | NOT 1 = 0 |

**Ví dụ 1:** Đèn giao thông thông minh — đèn xanh bật (Y=1) khi: có xe (A=1) VÀ không có người đi bộ (B=0, tức ¬B=1):
`Y = A ∧ ¬B`. Thử: A=1, B=0 → Y = 1 ∧ 1 = 1 ✓. A=1, B=1 → Y = 1 ∧ 0 = 0 ✓.

**Ví dụ 2:** Hệ thống báo động — chuông kêu (Y=1) khi cửa mở (A=1) HOẶC cửa sổ mở (B=1):
`Y = A ∨ B`. Thử: A=0, B=0 → Y=0; A=0, B=1 → Y=1 ✓.

**Ví dụ 3 — XOR từ AND/OR/NOT:**

XOR (exclusive-or) nghĩa là "một trong hai nhưng không cả hai". Không có cổng XOR nguyên thủy — phải dựng từ AND/OR/NOT:

`XOR(p, q) = (p ∧ ¬q) ∨ (¬p ∧ q)`

Walk-through đầy đủ với tất cả 4 tổ hợp đầu vào:

| p | q | ¬p | ¬q | p∧¬q | ¬p∧q | (p∧¬q)∨(¬p∧q) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 1 | 0 | 0 | **0** |
| 0 | 1 | 1 | 0 | 0 | 1 | **1** |
| 1 | 0 | 0 | 1 | 1 | 0 | **1** |
| 1 | 1 | 0 | 0 | 0 | 0 | **0** |

XOR = 1 chính xác khi p ≠ q. Dùng trong: bộ cộng nhị phân (half adder), kiểm tra chẵn lẻ (parity), mã hóa XOR.

**Ví dụ 4 — Mạch tính bit sum của half adder:**

Cộng hai bit p và q: sum = XOR(p,q), carry = AND(p,q).
- p=1, q=1: sum = 0, carry = 1 → kết quả "10" nhị phân = 2 thập phân ✓
- p=1, q=0: sum = 1, carry = 0 → kết quả "01" nhị phân = 1 thập phân ✓

### 1.2 NAND và NOR — cổng "phổ quát"

> 💡 **Trực giác.** Nếu bạn chỉ có búa, bạn không thể đóng vít. Nhưng nếu bạn có một công cụ đặc biệt — NAND — bạn có thể làm mọi công việc mộc mà chỉ dùng mỗi công cụ đó. Trong điện tử, NAND là công cụ vạn năng.

**NAND** (Not-AND): `NAND(p, q) = ¬(p ∧ q)`

| p | q | p NAND q |
|:---:|:---:|:---:|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Tại sao NAND "phổ quát"? Vì có thể dựng NOT, AND, OR chỉ từ NAND:

- `NOT(p) = NAND(p, p)` — thử: p=1: NAND(1,1) = ¬(1∧1) = ¬1 = 0 ✓; p=0: NAND(0,0) = ¬(0∧0) = ¬0 = 1 ✓
- `AND(p, q) = NAND(NAND(p,q), NAND(p,q))` — tức NOT(NAND(p,q))
- `OR(p, q) = NAND(NAND(p,p), NAND(q,q))` — tức NAND(NOT p, NOT q) = ¬(¬p ∧ ¬q) = p ∨ q (De Morgan)

**NOR** (Not-OR): `NOR(p, q) = ¬(p ∨ q)` — cũng phổ quát tương tự.

Trong thực tế: chip bán dẫn thường chỉ chế tạo NAND/NOR (đơn giản hơn về vật lý), rồi kết hợp lại để làm AND/OR/XOR/MUX/... Cả CPU của bạn được xây từ hàng tỷ cổng NAND/NOR.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Bảng chân lý và mạch khác nhau chỗ nào?"* — Về toán học: giống hệt nhau. Bảng chân lý là **đặc tả** hàm Boole (output cho mọi input). Mạch là **hiện thực hóa vật lý** của hàm đó. Mọi mạch tổ hợp (combinational circuit) tính đúng một hàm Boole, và mọi hàm Boole đều thực hiện được bằng mạch.
> - *"Công thức mệnh đề và mạch logic có tương đương 1-1 không?"* — Có. Mỗi công thức mệnh đề = một mạch. Một hàm Boole có thể biểu diễn bằng nhiều công thức (và nhiều mạch) khác nhau — tối giản hóa (circuit minimization) là bài toán tìm mạch đơn giản nhất thực hiện cùng hàm.
> - *"Mạch tuần tự (sequential circuit) thì sao?"* — Mạch tổ hợp không có bộ nhớ (output chỉ phụ thuộc input hiện tại). Mạch tuần tự (CPU thực sự, flip-flop, RAM) có trạng thái — nhưng từng "bước đồng hồ" của nó vẫn là phép tính Boole trên trạng thái + input hiện tại.

> ⚠ **Lỗi thường gặp: nhầm OR với XOR.**
> - OR (bao hàm, inclusive): 1 ∨ 1 = 1 (cả hai đều 1 vẫn cho 1).
> - XOR (loại trừ, exclusive): 1 ⊕ 1 = 0 (cả hai 1 thì "triệt tiêu nhau").
> - Trong tiếng Việt "hoặc" thường mơ hồ — "Anh uống cà phê hoặc trà" có thể là OR hoặc XOR tùy ngữ cảnh. Trong logic và điện tử phải phân biệt rõ.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Tính NAND(0, 1) và NAND(1, 1).
> 2. Biểu diễn OR(p, q) chỉ dùng NAND (viết ra bước trung gian).
> 3. Trong half adder, khi p=0 và q=0, sum và carry bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. NAND(0,1) = ¬(0∧1) = ¬0 = **1**. NAND(1,1) = ¬(1∧1) = ¬1 = **0**.
> 2. OR(p,q) = NAND(NAND(p,p), NAND(q,q)). Bước: NOT(p) = NAND(p,p); NOT(q) = NAND(q,q); OR(p,q) = NAND(NOT p, NOT q) = ¬(¬p ∧ ¬q) = p ∨ q (De Morgan).
> 3. sum = XOR(0,0) = 0; carry = AND(0,0) = 0. Kết quả: "00" = 0. Đúng: 0+0=0.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Bit 0/1 ↔ F/T; cổng logic AND/OR/NOT ↔ liên từ ∧/∨/¬.
> - Mạch tổ hợp = công thức mệnh đề được hiện thực hóa vật lý.
> - XOR = (p∧¬q) ∨ (¬p∧q) — cổng cơ bản của bộ cộng nhị phân.
> - NAND và NOR đều "phổ quát" — đủ dựng mọi cổng khác.
> - Shannon 1937: đại số Boole → thiết kế mạch số.

---

## 2. Bài toán SAT — Thỏa được hay không?

> 💡 **Trực giác.** Bạn có một bảng giao việc: "Nếu Alice và Bob đều làm dự án X thì Carol phải nghỉ; nếu Dave làm Y thì Alice không làm X; ..." — liệu có lịch phân công thỏa mãn mọi ràng buộc không? Đây chính là SAT — Satisfiability problem — bài toán nền tảng của khoa học máy tính lý thuyết.

### 2.1 Định nghĩa

**Công thức thỏa được (satisfiable):** Tồn tại ÍT NHẤT MỘT cách gán giá trị T/F cho các biến làm công thức = T.

**Công thức hằng đúng (tautology / valid):** MỌI cách gán đều cho kết quả = T.

**Công thức hằng sai (contradiction / unsatisfiable):** MỌI cách gán đều cho kết quả = F.

> ⚠ **Lỗi thường gặp: nhầm "thỏa được" với "hằng đúng".**
> - "p ∨ ¬p" — hằng đúng: *mọi* dòng bảng chân lý đều T. Nó cũng thỏa được (vì có ít nhất một dòng T).
> - "p ∧ q" — thỏa được (p=T, q=T cho T) nhưng KHÔNG hằng đúng (p=T, q=F cho F).
> - "p ∧ ¬p" — hằng sai: không thỏa được (không một cách gán nào cho T).
> - Hằng đúng ⊂ Thỏa được. Hằng sai ∩ Thỏa được = ∅.

### 2.2 Ví dụ SAT cụ thể

**Ví dụ 1 — Thỏa được:**
`φ = (p ∨ q) ∧ (¬p ∨ r) ∧ (¬q ∨ ¬r)`

Thử p=T, q=F, r=T:
- (T ∨ F) = T ✓
- (F ∨ T) = T ✓
- (T ∨ F) = T ✓ — THỎA ĐƯỢC với (p,q,r) = (T,F,T).

**Ví dụ 2 — Không thỏa được (UNSAT):**
`φ = (p ∨ q) ∧ (p ∨ ¬q) ∧ (¬p ∨ q) ∧ (¬p ∨ ¬q)`

Thử tất cả 4 tổ hợp:
- p=T, q=T: (T∨T)=T, (T∨F)=T, (F∨T)=T, (F∨F)=**F** → SAI
- p=T, q=F: (T∨F)=T, (T∨T)=T, (F∨F)=**F**, ... → SAI
- p=F, q=T: (F∨T)=T, (F∨F)=**F**, ... → SAI
- p=F, q=F: (F∨F)=**F**, ... → SAI
→ UNSAT (hằng sai).

**Ví dụ 3 — Hằng đúng:**
`φ = p ∨ ¬p`
Thử: p=T → T∨F=T; p=F → F∨T=T. Mọi dòng đều T → Tautology (cũng thỏa được).

**Ví dụ 4 — 3-SAT kinh điển:**
`φ = (p ∨ q ∨ ¬r) ∧ (¬p ∨ ¬q ∨ r) ∧ (p ∨ ¬q ∨ ¬r)`

Thử p=T, q=F, r=F:
- (T∨F∨T)=T ✓
- (F∨T∨F)=T ✓
- (T∨T∨T)=T ✓ → THỎA ĐƯỢC.

### 2.3 SAT là NP-đầy đủ — ý nghĩa thực tế

> 💡 **Trực giác.** SAT thuộc lớp **NP-đầy đủ** (NP-complete): nghĩa là (1) mọi bài toán trong NP đều quy về SAT trong thời gian đa thức, và (2) nếu ai đó tìm được thuật toán SAT chạy trong thời gian đa thức, thì mọi bài NP đều giải được nhanh (P = NP). Cook-Levin theorem (1971) chứng minh SAT là NP-đầy đủ đầu tiên.

**NP-complete KHÔNG có nghĩa "không giải được"** — nó có nghĩa:
- Với n biến, thuật toán brute-force kiểm tra 2ⁿ tổ hợp.
- n=20: 2²⁰ ≈ 1 triệu — vẫn chạy được.
- n=100: 2¹⁰⁰ ≈ 10³⁰ — vượt quá tốc độ mọi máy tính hiện tại.
- Chưa ai tìm được thuật toán tổng quát nhanh hơn (đây là bài toán mở P vs NP).

Trong thực tế, SAT solver hiện đại (như MiniSat, Glucose, Z3) dùng heuristic thông minh, giải được các trường hợp công nghiệp với hàng triệu biến.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Kiểm tra thỏa được khó hơn kiểm tra một lời giải cụ thể không?"* — Đúng vậy. **Kiểm tra** (p=T, q=F thỏa φ không?) chạy trong thời gian đa thức — đây là lý do SAT thuộc NP (Non-deterministic Polynomial). **Tìm** lời giải (nếu tồn tại) không có thuật toán đa thức đã biết — đây là lý do SAT NP-hard.
> - *"Bài toán gần cuộc sống nào là SAT?"* — Nhiều: lập lịch (scheduling), thiết kế mạch (EDA verification), kiểm thử phần mềm (model checking), lý luận AI (knowledge base satisfiability), bài toán sudoku (mã hóa ràng buộc thành SAT).
> - *"Tôi muốn giải SAT cho công thức nhỏ — làm thế nào?"* — Với ≤ 20 biến: bảng chân lý đủ (brute force 2²⁰ ≈ 1M dòng). Với lớn hơn: dùng SAT solver. Viz phần 2 của bài này cho phép thử nghiệm trực tiếp.

> ⚠ **Lỗi thường gặp: nhầm NP-complete với "không thể giải".**
> - NP-complete nghĩa: *chưa biết* thuật toán đa thức tổng quát. Không có nghĩa không bao giờ giải được.
> - Nhiều trường hợp thực tế của SAT (có cấu trúc đặc biệt) giải rất nhanh.
> - Phân biệt: "khó trong trường hợp xấu nhất" (worst-case hard) ≠ "khó trong thực tế".

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Công thức `(p → q) ∧ ¬q ∧ p` có thỏa được không? (Gợi ý: p→q tương đương ¬p∨q)
> 2. Sự khác biệt giữa "φ là tautology" và "φ thỏa được" là gì?
>
> <details><summary>Đáp án</summary>
>
> 1. Với p=T, q=F: (T→F)=F → vế đầu sai. Thử p=T, q=T: (T→T)=T, ¬T=F → vế ¬q sai. Thử p=F: vế ¬q∧p = ¬q∧F = F. Mọi cách gán đều sai → **UNSAT**. (Đây là chuỗi lập luận: p→q, ¬q → ¬p; nhưng ta có p → mâu thuẫn.)
> 2. **Tautology**: mọi dòng bảng chân lý = T (100%). **Thỏa được**: ít nhất một dòng = T (≥1 trong 2ⁿ dòng). Mọi tautology đều thỏa được, nhưng không phải mọi công thức thỏa được đều là tautology.
> </details>

> 📝 **Tóm tắt mục 2.**
> - SAT hỏi: "Tồn tại cách gán biến nào làm công thức = T không?"
> - Thỏa được ≠ hằng đúng; hằng sai = không thỏa được.
> - SAT là NP-đầy đủ (Cook–Levin 1971) — không có thuật toán đa thức đã biết.
> - NP-complete ≠ "không giải được" — chỉ là "khó trong trường hợp xấu nhất".
> - Brute-force: 2ⁿ tổ hợp; SAT solver hiện đại dùng heuristic mạnh.

---

## 3. Quyết định được (Decidability) — giới hạn của thuật toán

> 💡 **Trực giác.** Giả sử có người hỏi: "Với bất kỳ câu hỏi toán học nào, máy tính có thể trả lời đúng/sai không?" — Alan Turing (1936) và Alonzo Church (1936) chứng minh câu trả lời là **không**: có những câu hỏi toán học mà *không tồn tại* thuật toán nào có thể trả lời đúng cho mọi trường hợp. Đây là giới hạn nền tảng của tính toán, không phải giới hạn của phần cứng.

### 3.1 Định nghĩa "quyết định được"

**Bài toán quyết định được (decidable):** Tồn tại thuật toán A sao cho:
- Với mọi input I, A dừng trong thời gian hữu hạn.
- Nếu câu trả lời là "Có" → A in ra "Có".
- Nếu câu trả lời là "Không" → A in ra "Không".

**Bài toán không quyết định được (undecidable):** Không tồn tại thuật toán như trên.

### 3.2 Logic mệnh đề: QUYẾT ĐỊNH ĐƯỢC

**Câu hỏi:** "Công thức mệnh đề φ có phải tautology không?"

**Thuật toán:** Xây bảng chân lý đầy đủ. Nếu n biến → 2ⁿ dòng, mỗi dòng kiểm tra trong O(kích thước công thức). Tổng: hữu hạn, dừng, cho đáp án đúng.

**Tại sao hữu hạn?** Vì số biến n hữu hạn → bảng chân lý hữu hạn → mọi tổ hợp đều kiểm tra được.

**Ví dụ cụ thể:**
- Kiểm tra `p ∨ ¬p` tautology? Bảng 2 dòng: p=T→T; p=F→T. Mọi dòng T → **Có, tautology** → thuật toán dừng, đáp án đúng.
- Kiểm tra `p ∧ q` tautology? Bảng 4 dòng: dòng (T,F)→F. Có dòng F → **Không** → thuật toán dừng.

> ⚠ **Lỗi thường gặp: nhầm "decidable" với "tractable" (giải được hiệu quả).**
> Decidable nghĩa là *có* thuật toán luôn dừng và đúng — không nói thuật toán đó *nhanh*. Với n=100 biến, bảng chân lý có 2¹⁰⁰ dòng — decidable nhưng cực kỳ chậm. Tính quyết định được (decidability) và độ phức tạp thời gian (time complexity) là hai khái niệm độc lập.

### 3.3 Logic vị từ bậc nhất: KHÔNG QUYẾT ĐỊNH ĐƯỢC

**Câu hỏi:** "Công thức logic vị từ bậc nhất φ có phải tautology/hệ quả logic không?"

**Định lý Church–Turing (1936):** Không tồn tại thuật toán nào quyết định được điều này cho mọi φ.

**Tại sao khác?** Logic vị từ có lượng từ ∀ (với mọi) và ∃ (tồn tại) trên các miền *vô hạn*. Bảng chân lý không còn hữu hạn được — không thể kiểm tra mọi mô hình.

**Ví dụ:** "∀x∀y∀z (x+y=z → z-x=y)" trong miền số tự nhiên — đúng, nhưng không có bảng chân lý hữu hạn. Thuật toán có thể tìm bằng chứng nếu công thức đúng (semi-decidable), nhưng nếu sai — có thể vòng lặp mãi.

### 3.4 Bài toán dừng — Halting Problem

> 💡 **Trực giác.** Có chương trình máy tính nào kiểm tra được "chương trình P với input I có dừng không?" không? Turing (1936) chứng minh: **Không**. Đây là bài toán không quyết định được nổi tiếng nhất — và liên hệ trực tiếp với Gödel.

**Halting Problem:** Cho chương trình P và input I, liệu P(I) có dừng (halt) không?

**Chứng minh bằng tự-tham chiếu (rút gọn):**
Giả sử tồn tại máy H(P, I) luôn đúng:
- H(P,I) = "Có" nếu P(I) dừng
- H(P,I) = "Không" nếu P(I) vòng mãi

Xây dựng chương trình D: D(X) = nếu H(X,X)="Có" thì vòng mãi, ngược lại dừng.

Chạy D(D):
- Nếu D(D) dừng → H(D,D)="Có" → D vòng mãi → mâu thuẫn.
- Nếu D(D) vòng mãi → H(D,D)="Không" → D dừng → mâu thuẫn.

Mâu thuẫn → H không thể tồn tại.

### 3.5 Kết nối với Gödel

[Định lý bất toàn của Gödel (Lesson 03)](../lesson-03-godel-incompleteness/) nói: trong bất kỳ hệ thống công lý đủ mạnh nào, tồn tại mệnh đề đúng nhưng không chứng minh được trong hệ đó.

**Kết nối với Halting Problem:** Gödel dùng kỹ thuật tự-tham chiếu (Gödel numbering) để mã hóa "Câu này không chứng minh được" — rất giống cách Turing mã hóa "Chương trình này vòng mãi". Cả hai đều là phiên bản của **nghịch lý tự-tham chiếu** ở mức độ khác nhau:
- Gödel: giới hạn của chứng minh hình thức.
- Turing: giới hạn của thuật toán tính toán.

**Bảng so sánh:**

| Hệ thống | Quyết định được? | Lý do | Kết nối |
|---|:---:|---|---|
| Logic mệnh đề | **Có** | Bảng chân lý hữu hạn (2ⁿ dòng) | SAT: NP-complete |
| Logic vị từ bậc nhất | **Không** | Miền vô hạn, không có bảng chân lý | Church–Turing |
| Bài toán dừng | **Không** | Tự-tham chiếu → mâu thuẫn | Turing 1936 |
| Gödel: "câu này không chứng minh được" | **Không** | Tự-tham chiếu Gödel | Gödel 1931 |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu logic vị từ không quyết định được, sao toán học vẫn hoạt động?"* — Vì nhiều bài toán cụ thể trong toán học vẫn quyết định được (ví dụ: số học Presburger, hình học Euclidean). "Không quyết định được" là về bài toán *tổng quát* nhất. Phần lớn toán học hàng ngày không va vào giới hạn này.
> - *"Decidability khác với P vs NP như thế nào?"* — Decidability hỏi "có thuật toán *nào* dừng không?" — đây là câu hỏi về *tính tồn tại*. P vs NP hỏi "thuật toán decidable đó có *nhanh* không (đa thức vs mũ)?" — đây là câu hỏi về *hiệu quả*. Undecidable → không có thuật toán. NP-hard → có thuật toán nhưng chưa biết thuật toán nhanh.
> - *"Vậy có thứ gì mà cả Gödel lẫn Turing đều chỉ ra giới hạn không?"* — Có: mọi hệ thống hình thức đủ mạnh đều có giới hạn — không thể vừa nhất quán, vừa đầy đủ (Gödel), và không thể tính toán mọi thứ (Turing). Đây là hai mặt của cùng một sự thật sâu sắc về nền tảng của toán học và khoa học máy tính.

> ⚠ **Lỗi thường gặp:**
> - "Decidable" ≠ "nhanh". Logic mệnh đề decidable nhưng SAT có thể rất chậm (exponential).
> - "Undecidable" ≠ "không thể giải trong thực tế". Halting Problem undecidable không ngăn ta phân tích phần lớn chương trình thực tế bằng phương pháp gần đúng.
> - Đừng nhầm NP-complete (hard nhưng decidable) với undecidable (không có thuật toán).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Tại sao bảng chân lý chứng minh logic mệnh đề là decidable?
> 2. Bài toán "hàm f: ℕ→ℕ có bằng 0 tại mọi điểm không?" thuộc loại nào: decidable hay undecidable?
> 3. Kỹ thuật tự-tham chiếu xuất hiện ở đâu trong cả Gödel và Turing?
>
> <details><summary>Đáp án</summary>
>
> 1. Với n biến mệnh đề, có đúng 2ⁿ tổ hợp giá trị T/F. Bảng chân lý kiểm tra đủ 2ⁿ dòng — hữu hạn, luôn dừng, luôn cho đáp án. Do đó thuật toán tồn tại và đúng → decidable.
> 2. **Undecidable** trong trường hợp tổng quát. Tương đương hỏi "chương trình tính f có xuất ra 0 cho mọi input không?" — quy về halting problem. (Đây là Rice's theorem: mọi thuộc tính ngữ nghĩa không tầm thường của chương trình đều undecidable.)
> 3. Gödel: xây câu G nói "G không chứng minh được trong hệ này" — tự-tham chiếu qua Gödel numbering. Turing: xây chương trình D chạy D(D) rồi làm ngược lại kết quả của H(D,D) — tự-tham chiếu qua diagonalization.
> </details>

> 📝 **Tóm tắt mục 3.**
> - **Decidable = có thuật toán luôn dừng và đúng.** Không đồng nghĩa với nhanh.
> - Logic mệnh đề: decidable (bảng chân lý hữu hạn).
> - Logic vị từ bậc nhất: undecidable (Church–Turing 1936).
> - Halting Problem: undecidable — không tồn tại máy H kiểm tra mọi chương trình.
> - Gödel (giới hạn chứng minh) và Turing (giới hạn tính toán) đều xuất phát từ tự-tham chiếu.

---

## Bài tập

**Bài 1 — Cổng NAND phổ quát.**
Dựng cổng AND từ chỉ NAND. Viết bảng chân lý kiểm chứng: AND(p,q) = NAND(NAND(p,q), NAND(p,q)) có cho cùng kết quả với p∧q không? Kiểm tra tất cả 4 tổ hợp (T,T), (T,F), (F,T), (F,F).

**Bài 2 — Phân tích XOR.**
Biểu diễn XOR chỉ dùng NAND (không dùng AND/OR/NOT trực tiếp). Gợi ý: XOR(p,q) = AND(OR(p,q), NAND(p,q)). Mở rộng OR và AND bằng NAND, rồi kiểm tra bảng chân lý.

**Bài 3 — Phân loại SAT.**
Phân loại mỗi công thức sau: (a) hằng đúng (tautology), (b) thỏa được nhưng không hằng đúng, hay (c) hằng sai (contradiction):
1. `p ∧ (¬p ∨ q) ∧ ¬q`
2. `(p → q) ∨ (q → p)`
3. `¬(p ↔ q) ∧ p ∧ q`
4. `(p ∧ q) → (p ∨ q)`

**Bài 4 — Decidability.**
Cho mỗi câu hỏi sau, cho biết bài toán tương ứng là decidable hay undecidable, và giải thích ngắn:
1. "Công thức mệnh đề φ(p,q,r) có tautology không?"
2. "Chương trình Python P với input 0 có bao giờ in ra 'Hello' không?"
3. "Có số nguyên n làm công thức `n mod 6 = 0 ∧ n mod 10 = 0` đúng không?" (coi n là cố định, câu hỏi là về một n cụ thể)

**Bài 5 — Kết nối Gödel–Turing.**
Giải thích bằng lời (không cần toán học): tại sao chứng minh Halting Problem undecidable và chứng minh Gödel incompleteness đều dùng kỹ thuật "tự-tham chiếu"? Nêu điểm giống và khác của hai kỹ thuật đó.

---

## Lời giải chi tiết

**Bài 1 — Cổng AND từ NAND.**

Bước: AND(p,q) = NOT(NAND(p,q)) = NAND(NAND(p,q), NAND(p,q)).

| p | q | NAND(p,q) = ¬(p∧q) | AND(p,q) = NAND(NAND(p,q), NAND(p,q)) | p∧q thực |
|:---:|:---:|:---:|:---:|:---:|
| T | T | ¬(T∧T) = ¬T = **F** | NAND(F,F) = ¬(F∧F) = ¬F = **T** | T ✓ |
| T | F | ¬(T∧F) = ¬F = **T** | NAND(T,T) = ¬(T∧T) = ¬T = **F** | F ✓ |
| F | T | ¬(F∧T) = ¬F = **T** | NAND(T,T) = ¬T = **F** | F ✓ |
| F | F | ¬(F∧F) = ¬F = **T** | NAND(T,T) = ¬T = **F** | F ✓ |

Kết quả khớp hoàn toàn → AND(p,q) = NAND(NAND(p,q), NAND(p,q)) ✓

---

**Bài 2 — XOR từ NAND.**

Công thức: XOR(p,q) = AND(OR(p,q), NAND(p,q)).

Mở rộng:
- OR(p,q) = NAND(NAND(p,p), NAND(q,q))
- AND(A,B) = NAND(NAND(A,B), NAND(A,B))

Đặt: N₁ = NAND(p,q), N₂ = NAND(p,p) = NOT(p), N₃ = NAND(q,q) = NOT(q), OR_pq = NAND(N₂, N₃).

| p | q | N₁=NAND(p,q) | N₂=NOT p | N₃=NOT q | OR(p,q)=NAND(N₂,N₃) | XOR=AND(OR,N₁) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | F | F | F | T | AND(T,F)=**F** |
| T | F | T | F | T | T | AND(T,T)=**T** |
| F | T | T | T | F | T | AND(T,T)=**T** |
| F | F | T | T | T | F | AND(F,T)=**F** |

Kết quả đúng bảng chân lý XOR ✓

---

**Bài 3 — Phân loại SAT.**

**3.1** `p ∧ (¬p ∨ q) ∧ ¬q`

Phân tích: p=T (do vế p). Thì ¬p=F, nên (¬p∨q) = q. Cần q=T. Nhưng ¬q=F → vế ¬q sai. Thử p=F: vế p sai. → Mọi cách đều sai → **(c) Hằng sai (contradiction)**.

Xác nhận: đây là chuỗi modus ponens đứt đoạn — p∧(p→q)∧¬q là contradiction.

**3.2** `(p → q) ∨ (q → p)`

Đây thực ra là tautology. Chứng minh: nếu p=T, q=F: (T→F)=F, (F→T)=T → T∨F=T. Nếu p=F,q=T: (F→T)=T → T∨...=T. Nếu p=q: cả hai vế đều T. → Mọi dòng T → **(a) Hằng đúng (tautology)**.

**3.3** `¬(p ↔ q) ∧ p ∧ q`

p↔q = T khi p=q. Nếu p=T, q=T: ¬(T↔T) = ¬T = F → vế đầu sai. Nếu p=F, q=F: vế p sai. Nếu p≠q: ¬(p↔q)=T, nhưng p∧q=F (vì một trong hai bằng F). → Mọi dòng F → **(c) Hằng sai**.

**3.4** `(p ∧ q) → (p ∨ q)`

Vế trái T chỉ khi p=T∧q=T. Khi đó vế phải (T∨T)=T → vế → = T. Khi vế trái F → vế → =T (bất kể). → Mọi dòng T → **(a) Hằng đúng (tautology)**.

---

**Bài 4 — Decidability.**

**4.1** "Công thức mệnh đề φ(p,q,r) có tautology không?" → **Decidable.**

Thuật toán: lập bảng chân lý 2³=8 dòng. Kiểm tra mọi dòng đều T không. Hữu hạn, dừng, đúng. → Decidable.

**4.2** "Chương trình Python P với input 0 có bao giờ in 'Hello' không?" → **Undecidable.**

Đây là câu hỏi về hành vi của chương trình tùy ý — quy về halting problem. Không tồn tại thuật toán tổng quát đúng cho mọi P. (Theo Rice's theorem: mọi thuộc tính ngữ nghĩa không tầm thường của chương trình đều undecidable.)

**4.3** "Có số nguyên n làm `n mod 6 = 0 ∧ n mod 10 = 0` đúng không?" → **Decidable (và câu trả lời là Có).**

Đây là câu hỏi SAT với ràng buộc số học hữu hạn. n=30: 30 mod 6=0 ✓; 30 mod 10=0 ✓. Nếu muốn tổng quát hơn: bài toán số học Presburger (số học cộng trên số tự nhiên) là decidable.

---

**Bài 5 — Kết nối Gödel–Turing.**

**Điểm giống:** Cả hai đều dùng kỹ thuật **tự-tham chiếu kết hợp phủ định**:
- Gödel xây câu G phát biểu về chính nó: "G không chứng minh được trong hệ H". Nếu G chứng minh được → G sai → hệ không nhất quán. Nếu G không chứng minh được → G đúng → hệ không đầy đủ.
- Turing xây chương trình D chạy D trên D rồi đảo ngược: "Nếu D(D) dừng thì D vòng mãi; nếu D(D) vòng mãi thì D dừng". Cả hai nhánh đều mâu thuẫn → máy H không tồn tại.

**Điểm khác:**
- Gödel: giới hạn nằm trong hệ thống **chứng minh** (proof system) — câu G đúng nhưng không chứng minh được *trong hệ đó* (có thể chứng minh trong hệ mạnh hơn).
- Turing: giới hạn nằm trong **tính toán** (computation) — Halting Problem không chỉ "khó chứng minh" mà thực sự không thể tính trong mọi hệ thống tính toán tương đương Turing.

Nói cách khác: Gödel nói "có sự thật ngoài tầm với của chứng minh"; Turing nói "có câu hỏi ngoài tầm với của tính toán". Cả hai đều đặt ra giới hạn nền tảng của lý trí hình thức.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — Ba module tương tác: (1) Xưởng mạch logic — chọn cổng AND/OR/NOT/XOR/NAND, bật tắt đầu vào, xem đầu ra + bảng chân lý + ký hiệu SVG; (2) SAT mini — thử gán T/F cho công thức 3 biến, hệ báo thỏa không, nút "Tự tìm" duyệt 2ⁿ; (3) Bảng so sánh Decidable — mệnh đề vs vị từ vs halting vs Gödel.

---

## Bài tiếp theo

→ **Lesson 08 — Capstone: Phân tích tổng hợp** ([visualization.html](../lesson-08-capstone-analysis/visualization.html)): bài cuối chuỗi Advanced Logic & Language — tổng hợp modal logic, Gödel, ngôn ngữ, và tính toán vào một khung thống nhất.

[⬆ Về Advanced Logic & Language](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
