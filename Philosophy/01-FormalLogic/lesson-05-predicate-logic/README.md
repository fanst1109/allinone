# Lesson 05 — Logic vị từ (Predicate Logic)

> **Tầng 1 — Formal Logic · Bài 5/8**

Logic mệnh đề (propositional logic) mạnh nhưng có giới hạn rõ: nó xử lý câu như **khối đặc**, không nhìn vào bên trong. Hãy thử lập luận này:

> *"Mọi người đều phải chết. Socrates là người. Vậy Socrates phải chết."*

Logic mệnh đề chỉ thấy ba mệnh đề P, Q, R riêng lẻ — nó **không** nắm được liên kết "mọi người", "là người", "Socrates". Để hình thức hóa lập luận này, ta cần một ngôn ngữ mạnh hơn: **logic vị từ** (predicate logic), hay còn gọi là **logic bậc một** (first-order logic).

---

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Giải thích vì sao logic mệnh đề không đủ và logic vị từ giải quyết vấn đề gì.
- Định nghĩa và dùng **vị từ** (predicate), **miền** (domain), **hằng cá thể** (individual constant).
- Viết đúng công thức logic vị từ với **lượng từ phổ quát ∀** và **lượng từ tồn tại ∃**.
- Dịch câu tiếng Việt sang ký hiệu và ngược lại — đặc biệt phân biệt khi nào dùng → vs ∧.
- Phủ định lượng từ bằng luật De Morgan mở rộng: ¬∀x P(x) ≡ ∃x ¬P(x).
- Đánh giá công thức ∀/∃ trên một miền cụ thể.

## Kiến thức tiền đề

- Logic mệnh đề, liên từ ¬ ∧ ∨ → ↔ — xem [Lesson 02 — Liên từ & bảng chân lý](../lesson-02-truth-tables/).
- Tính hợp lệ và suy luận hợp lệ — xem [Lesson 04 — Tính hợp lệ & luật suy luận](../lesson-04-validity-inference/).
- Khái niệm tập hợp, miền xác định — ôn thêm tại [Math/05 — Lý thuyết số, tổ hợp & logic](../../../Math/05-NumberTheory-Combinatorics-Logic/).

---

## 1. Giới hạn của logic mệnh đề — vì sao cần logic vị từ?

> 💡 **Trực giác.** Tưởng tượng camera an ninh: camera mệnh đề chỉ ghi "đèn đỏ bật hay tắt". Camera vị từ ghi được "người nào đó đang làm gì ở đâu". Logic vị từ là camera phân giải cao hơn — nó nhìn vào *cấu trúc bên trong* của câu.

### Ví dụ giới hạn

Xét hai lập luận:

**Lập luận A:**
1. Mọi người đều phải chết.
2. Socrates là người.
3. Vậy Socrates phải chết.

**Lập luận B:**
1. Mọi số chẵn đều chia hết cho 2.
2. 8 là số chẵn.
3. Vậy 8 chia hết cho 2.

Cả hai đều hợp lệ theo cùng một khuôn mẫu — nhưng logic mệnh đề không thể nắm bắt khuôn mẫu đó. Nếu đặt P = "mọi người đều phải chết", Q = "Socrates là người", R = "Socrates phải chết", thì lập luận A chỉ là `{P, Q} ⊢ R` — không có luật nào trong logic mệnh đề nói R **phải** theo sau P và Q. Logic mệnh đề đành ghi nhận "có vẻ hợp lệ" mà không chứng minh được.

**Logic vị từ giải quyết bằng cách:**
- Tách rõ *đối tượng* (Socrates, 8, ...) với *tính chất* (là người, là số chẵn, ...).
- Nói về *tất cả* hoặc *một số* đối tượng trong miền đang xét.

> 📝 **Tóm tắt mục 1.** Logic mệnh đề xử lý câu như khối đặc. Logic vị từ nhìn vào bên trong: phân tách đối tượng, tính chất, và mối quan hệ "mọi" / "tồn tại".

---

## 2. Các thành phần cơ bản

### 2.1 Vị từ (predicate)

**(a) Là gì.** Một **vị từ** là một hàm nhận đối tượng làm đầu vào và trả về giá trị chân lý (đúng/sai). Ký hiệu: chữ hoa `P`, `Q`, `H`, `M`... kèm tham số, ví dụ `P(x)`, `Q(x, y)`.

**(b) Vì sao cần.** Thay vì mỗi câu là một mệnh đề đơn (như trong logic mệnh đề), vị từ cho phép nói về *lớp đối tượng*: "x là người", "x là số chẵn", "x lớn hơn y". Từ một vị từ ta tạo ra vô số mệnh đề cụ thể bằng cách thay x bằng giá trị cụ thể.

**(c) Ví dụ số cụ thể (≥4):**

| Ký hiệu | Đọc | Khi x = Socrates | Khi x = Mèo |
|---------|-----|:---:|:---:|
| `Người(x)` | x là người | **Đúng** | Sai |
| `Chết(x)` | x phải chết | **Đúng** | Đúng |
| `Chẵn(x)` | x là số chẵn | Không áp dụng | Không áp dụng |
| `Chẵn(x)` | x là số chẵn | (với x=8) **Đúng** | (với x=7) Sai |
| `Bay(x)` | x biết bay | Sai | **Sai** |
| `SinhVien(x)` | x là sinh viên | Sai (giả định) | Sai |

> ⚠ **Lỗi thường gặp: vị từ một mình không phải mệnh đề.** `Người(x)` với `x` chưa xác định **không** có giá trị chân lý — nó chỉ là "khuôn mẫu". Muốn có mệnh đề, phải thay x bằng hằng cụ thể (`Người(Socrates)`) hoặc gắn lượng từ (`∀x Người(x)`).

### 2.2 Miền (domain)

**Miền** (còn gọi là *universe of discourse*) là tập hợp các đối tượng mà biến x có thể nhận. Miền phải được xác định trước khi đánh giá công thức.

- Ví dụ: "Mọi số chẵn chia hết cho 2" — miền là tập số tự nhiên ℕ.
- Cùng câu "Mọi phần tử đều dương", đánh giá trên miền {1, 2, 3} là **Đúng**, trên miền {−1, 0, 1} là **Sai**.

### 2.3 Hằng cá thể (individual constant)

**Hằng cá thể** là tên riêng chỉ một đối tượng cụ thể trong miền: `s` (Socrates), `a` (Alice), `b` (số 2), `c` (con mèo Felix).

> 💡 **Trực giác phân biệt.** Biến `x` = ẩn số (chưa biết là ai). Hằng `s` = Socrates cụ thể. Vị từ `Người(x)` là *câu hỏi*, `Người(s)` là *câu khẳng định* có thể đúng hoặc sai.

> ❓ **Câu hỏi tự nhiên.**
> - *"Miền có phải là tập hữu hạn không?"* — Không. Miền có thể hữu hạn (6 con vật trong vườn thú) hoặc vô hạn (tập số tự nhiên ℕ, số thực ℝ). Logic vị từ hoạt động với cả hai.
> - *"Vị từ có thể có nhiều hơn một tham số không?"* — Có. `LớnHơn(x, y)` có nghĩa "x > y", `YêuThích(x, y)` là "x yêu thích y". Logic bậc một cho phép vị từ n-ngôi (n-ary predicate). Bài này chỉ tập trung vào vị từ một ngôi cho đơn giản.

> 📝 **Tóm tắt mục 2.** Ba thành phần: **vị từ** `P(x)` — hàm → chân lý; **miền** — tập đối tượng x có thể là; **hằng cá thể** — tên riêng cụ thể. Vị từ một mình không phải mệnh đề.

---

## 3. Lượng từ phổ quát ∀ (với mọi x)

### 3.1 Định nghĩa

**(a) Là gì.** `∀x P(x)` đọc là "Với mọi x trong miền, P(x) đúng." Đây là **lượng từ phổ quát** (universal quantifier).

**(b) Vì sao cần.** Thay vì liệt kê "Socrates phải chết. Plato phải chết. Aristotle phải chết. ...", ta gói gọn thành `∀x Chết(x)` — một câu duy nhất, áp dụng cho cả miền.

**(c) Điều kiện đúng.** `∀x P(x)` đúng khi và chỉ khi **P(a) đúng với từng phần tử a trong miền**. Chỉ cần một phần tử a mà P(a) sai → toàn bộ `∀x P(x)` sai. Phần tử đó gọi là **phản ví dụ (counterexample)**.

**Ví dụ trên miền D = {1, 2, 3, 4, 5}:**

| Công thức | Đánh giá | Kết quả |
|-----------|---------|---------|
| `∀x Chẵn(x)` | 1 là lẻ → phản ví dụ! | **Sai** |
| `∀x (x > 0)` | 1>0 ✓, 2>0 ✓, 3>0 ✓, 4>0 ✓, 5>0 ✓ | **Đúng** |
| `∀x (x ≤ 5)` | 1≤5 ✓, 2≤5 ✓, ..., 5≤5 ✓ | **Đúng** |
| `∀x (x ≥ 3)` | 1≥3 ✗ → phản ví dụ! | **Sai** |

### 3.2 Dịch câu tiếng Việt — quy tắc quan trọng

> 💡 **Trực giác.** "Mọi A đều B" có nghĩa: nếu thứ gì đó là A thì nó cũng là B — đây là **điều kiện**, nên dùng →.

**"Mọi A đều B" → `∀x ( A(x) → B(x) )`**

Bốn ví dụ, verify từng bước:

1. **"Mọi người đều phải chết":**
   `∀x ( Người(x) → Chết(x) )`
   Đọc: "Với mọi x, nếu x là người thì x phải chết." ✓

2. **"Mọi số chẵn chia hết cho 2":**
   `∀x ( Chẵn(x) → Chia2(x) )`
   Đọc: "Với mọi x, nếu x là số chẵn thì x chia hết cho 2." ✓

3. **"Mọi sinh viên Y khoa phải học Giải phẫu":**
   `∀x ( SVYKhoa(x) → HọcGiảiPhẫu(x) )` ✓

4. **"Không con mèo nào biết bay" — đây là dạng phủ định:**
   `∀x ( Mèo(x) → ¬Bay(x) )`
   Đọc: "Với mọi x, nếu x là mèo thì x không biết bay." ✓

> ⚠ **Lỗi phổ biến nhất — dùng ∧ thay → trong ∀:**
>
> **SAI:** `∀x ( Người(x) ∧ Chết(x) )` — câu này nghĩa là "Mọi vật đều vừa là người vừa phải chết" — sai hoàn toàn! Nó đòi hỏi con mèo, hòn đá, mọi thứ trong miền đều phải là người.
>
> **ĐÚNG:** `∀x ( Người(x) → Chết(x) )` — chỉ khi x là người mới đòi hỏi x phải chết; hòn đá không là người nên điều kiện là `F → ?` = Đúng tự động.
>
> **Kiểm tra nhanh:** Thử miền = {Socrates, mèo Felix}. Với mèo: `Người(Felix) → Chết(Felix)` = F → T = **Đúng** ✓. Còn `Người(Felix) ∧ Chết(Felix)` = F ∧ T = **Sai** ✗ — câu bị hỏng.

> 🔁 **Dừng lại tự kiểm tra.**
> Dịch câu: "Mọi số nguyên tố lớn hơn 2 đều là số lẻ" sang ký hiệu.
> <details><summary>Đáp án</summary>
>
> `∀x ( NgTố(x) ∧ LớnHơn2(x) → Lẻ(x) )`
> — hoặc dùng hằng: `∀x ( NgTố(x) ∧ x > 2 → Lẻ(x) )`
>
> Đọc: "Với mọi x, nếu x là số nguyên tố VÀ x > 2 thì x là số lẻ."
> (Lưu ý: có thể viết gộp giả thiết thành một `∧` bên vế trái của →.)
> </details>

> 📝 **Tóm tắt mục 3.** ∀x P(x) = "mọi phần tử thỏa P". Dịch "Mọi A là B" bằng `∀x(A(x)→B(x))` — dùng →, KHÔNG dùng ∧ vì sẽ biến thành "mọi thứ đều vừa là A vừa là B".

---

## 4. Lượng từ tồn tại ∃ (tồn tại ít nhất một x)

### 4.1 Định nghĩa

**(a) Là gì.** `∃x P(x)` đọc là "Tồn tại ít nhất một x trong miền sao cho P(x) đúng." Đây là **lượng từ tồn tại** (existential quantifier).

**(b) Điều kiện đúng.** `∃x P(x)` đúng khi và chỉ khi **có ít nhất một phần tử a trong miền mà P(a) đúng**. Ngay cả khi chỉ một phần tử thỏa, câu đã đúng. Muốn câu sai, phải chứng minh *không có phần tử nào* thỏa.

**Ví dụ trên miền D = {1, 2, 3, 4, 5}:**

| Công thức | Đánh giá | Kết quả |
|-----------|---------|---------|
| `∃x Chẵn(x)` | x=2 thỏa → đủ rồi! | **Đúng** |
| `∃x (x > 10)` | 1,2,3,4,5 đều ≤ 10 | **Sai** |
| `∃x (x = 3)` | x=3 thỏa | **Đúng** |
| `∃x (x < 0)` | không có số âm trong D | **Sai** |

### 4.2 Dịch câu tiếng Việt — quy tắc

> 💡 **Trực giác.** "Có A là B" nghĩa là: tồn tại thứ gì đó vừa là A vừa là B — hai tính chất *cùng lúc*, nên dùng ∧.

**"Có A là B" (tồn tại A mà B) → `∃x ( A(x) ∧ B(x) )`**

Bốn ví dụ:

1. **"Tồn tại số nguyên tố chẵn":**
   `∃x ( NgTố(x) ∧ Chẵn(x) )`
   Đọc: "Có ít nhất một x vừa là số nguyên tố vừa là số chẵn." (x = 2 thỏa.) ✓

2. **"Có sinh viên đạt điểm 10":**
   `∃x ( SinhViên(x) ∧ Điểm10(x) )` ✓

3. **"Có loài vật biết bay lại sống dưới nước":**
   `∃x ( ĐộngVật(x) ∧ Bay(x) ∧ SốngDướiNước(x) )` ✓

4. **"Có số tự nhiên nhỏ hơn 0":**
   `∃x ( TựNhiên(x) ∧ x < 0 )` — câu này **Sai** trên miền ℕ chuẩn. ✓ (Dịch đúng, đánh giá ra Sai — hoàn toàn hợp lệ.)

> ⚠ **Lỗi phổ biến nhất — dùng → thay ∧ trong ∃:**
>
> **SAI:** `∃x ( NgTố(x) → Chẵn(x) )` — câu này nghĩa là "Tồn tại x mà nếu x là nguyên tố thì x là chẵn." Nhưng với bất kỳ x không phải nguyên tố (x=4), `NgTố(4) → Chẵn(4)` = F → T = **Đúng** tự động! Vậy câu này *luôn đúng* bất kể thực tế — vô nghĩa.
>
> **ĐÚNG:** `∃x ( NgTố(x) ∧ Chẵn(x) )` — đòi hỏi một x *đồng thời thỏa cả hai* điều kiện.

> 🔁 **Dừng lại tự kiểm tra.**
> Dịch câu: "Có người không đồng ý với tôi."
> <details><summary>Đáp án</summary>
>
> `∃x ( Người(x) ∧ ¬ĐồngÝVớiTôi(x) )`
>
> Đọc: "Tồn tại ít nhất một x vừa là người vừa không đồng ý với tôi."
> </details>

> 📝 **Tóm tắt mục 4.** ∃x P(x) = "có ít nhất một phần tử thỏa P". Dịch "Có A là B" bằng `∃x(A(x)∧B(x))` — dùng ∧, KHÔNG dùng → vì điều kiện giả sẽ làm câu đúng vô điều kiện.

---

## 5. Phủ định lượng từ — De Morgan mở rộng

> 💡 **Trực giác.** "Không phải mọi học sinh đều đậu" = "Có ít nhất một học sinh rớt." Ta đẩy ¬ vào trong, đồng thời đổi ∀ ↔ ∃ — đây là **luật De Morgan cho lượng từ**.

### 5.1 Hai luật cốt lõi

$$\neg\forall x\, P(x) \;\equiv\; \exists x\, \neg P(x)$$

$$\neg\exists x\, P(x) \;\equiv\; \forall x\, \neg P(x)$$

**Walk-through bằng số thật (verify cả hai chiều):**

Cho miền D = {1, 2, 3} và P(x) = "x là số chẵn".

- `∀x Chẵn(x)` = "Mọi số trong D đều chẵn" → **Sai** (1, 3 lẻ).
- `¬∀x Chẵn(x)` = phủ định của Sai = **Đúng**.
- `∃x ¬Chẵn(x)` = "Có số trong D không chẵn" → x=1 thỏa → **Đúng**. ✓ (Khớp!)

Chiều ngược:

- `∃x Chẵn(x)` = "Có số chẵn trong D" → x=2 thỏa → **Đúng**.
- `¬∃x Chẵn(x)` = phủ định của Đúng = **Sai**.
- `∀x ¬Chẵn(x)` = "Mọi số trong D đều không chẵn" → 2 là chẵn → **Sai**. ✓ (Khớp!)

### 5.2 Ứng dụng: phủ định các câu thực tế

| Câu gốc | Ký hiệu | Phủ định ký hiệu | Dịch ngược phủ định |
|---------|---------|-----------------|---------------------|
| "Mọi sinh viên đều đậu" | `∀x(SV(x)→Đậu(x))` | `∃x(SV(x)∧¬Đậu(x))` | "Có sinh viên không đậu" |
| "Không con mèo nào biết bay" | `∀x(Mèo(x)→¬Bay(x))` | `∃x(Mèo(x)∧Bay(x))` | "Có con mèo biết bay" |
| "Có con chó thông minh" | `∃x(Chó(x)∧ThôngMinh(x))` | `∀x(Chó(x)→¬ThôngMinh(x))` | "Mọi con chó đều không thông minh" |
| "Có số không chia hết cho bất kỳ số nguyên tố nào" | `∃x(SốTN(x)∧∀p(NgTố(p)→¬ChiaPChoP(x,p)))` | phức tạp hơn | (logic lồng nhau) |

> ⚠ **Bẫy khi phủ định câu có →:** Phủ định `∀x(A(x)→B(x))` **không phải** `∀x(A(x)→¬B(x))`.
>
> Đúng phải là: `¬∀x(A(x)→B(x))` ≡ `∃x¬(A(x)→B(x))` ≡ `∃x(A(x)∧¬B(x))`.
>
> (Dùng luật: `¬(P→Q)` ≡ `P∧¬Q`.)
>
> **Ví dụ:** Phủ định "Mọi người đều phải chết" = `∃x(Người(x)∧¬Chết(x))` = "Có người không phải chết" — không phải "Mọi người đều không chết".

> 🔁 **Dừng lại tự kiểm tra.**
> Phủ định câu: "Không ai trong lớp hiểu bài" — `∀x(TrongLớp(x)→¬HiểuBài(x))`.
> <details><summary>Đáp án</summary>
>
> `¬∀x(TrongLớp(x)→¬HiểuBài(x))`
> ≡ `∃x¬(TrongLớp(x)→¬HiểuBài(x))`
> ≡ `∃x(TrongLớp(x)∧HiểuBài(x))`
>
> Dịch: "Có người trong lớp hiểu bài."
> </details>

> 📝 **Tóm tắt mục 5.**
> - `¬∀x P(x)` ≡ `∃x ¬P(x)`: phủ định "mọi" = "có ít nhất một không".
> - `¬∃x P(x)` ≡ `∀x ¬P(x)`: phủ định "có một" = "mọi đều không".
> - Khi phủ định câu có →: nhớ `¬(A→B)` ≡ `A∧¬B`.

---

## 6. Ví dụ tổng hợp — lập luận Socrates hình thức hóa

Bây giờ ta có đủ công cụ để hình thức hóa lập luận mở đầu:

**Tiền đề 1:** "Mọi người đều phải chết."
→ `∀x ( Người(x) → Chết(x) )`

**Tiền đề 2:** "Socrates là người."
→ `Người(s)` (với `s` = hằng cá thể chỉ Socrates)

**Kết luận:** "Socrates phải chết."
→ `Chết(s)`

**Suy luận hợp lệ:**
1. `∀x ( Người(x) → Chết(x) )` — tiền đề 1
2. `Người(s)` — tiền đề 2
3. `Người(s) → Chết(s)` — từ (1), thế `x = s` (Universal Instantiation — khởi tạo phổ quát)
4. `Chết(s)` — từ (2) và (3), Modus Ponens ✓

> 💡 **Bước 3 là chìa khóa.** "Universal Instantiation" là luật nói: nếu `∀x P(x)` đúng trên miền, thì `P(a)` đúng với bất kỳ hằng cá thể `a` cụ thể nào trong miền. Logic mệnh đề không có luật này — đó là lý do nó không xử lý được lập luận này.

Tương tự, lập luận số:

**Tiền đề 1:** `∀x ( Chẵn(x) → Chia2(x) )` — mọi số chẵn chia hết cho 2
**Tiền đề 2:** `Chẵn(8)` — 8 là số chẵn
**Kết luận:** `Chia2(8)` — 8 chia hết cho 2 ✓

> 📝 **Tóm tắt mục 6.** Universal Instantiation cho phép "kéo" câu ∀ xuống áp dụng cho một hằng cụ thể, rồi dùng Modus Ponens như logic mệnh đề thông thường.

---

## 7. Bảng tra nhanh — dịch câu tiếng Việt

| Mẫu câu tiếng Việt | Ký hiệu đúng | Ghi nhớ |
|---------------------|-------------|---------|
| Mọi A đều B | `∀x(A(x)→B(x))` | ∀ + → |
| Không A nào là B | `∀x(A(x)→¬B(x))` | ∀ + → + ¬ |
| Có A là B | `∃x(A(x)∧B(x))` | ∃ + ∧ |
| Có A không phải B | `∃x(A(x)∧¬B(x))` | ∃ + ∧ + ¬ |
| Phủ định "Mọi A là B" | `∃x(A(x)∧¬B(x))` | đổi ∀→∃, →  thành ∧¬ |
| Phủ định "Có A là B" | `∀x(A(x)→¬B(x))` | đổi ∃→∀, ∧ thành →¬ |

---

## Bài tập

**Bài 1 — Dịch sang ký hiệu.**
Dịch các câu sau sang ký hiệu logic vị từ. Định nghĩa vị từ bạn dùng.

a) "Mọi con chim đều có cánh."
b) "Có ít nhất một con người đã đặt chân lên Mặt Trăng."
c) "Không con cá nào biết leo cây."
d) "Có số thực không phải là số hữu tỉ."

**Bài 2 — Dịch ngược sang tiếng Việt.**
Cho vị từ: `NgườiViệt(x)` = "x là người Việt", `NóiTiếngAnh(x)` = "x nói được tiếng Anh". Dịch sang tiếng Việt tự nhiên:

a) `∀x(NgườiViệt(x) → NóiTiếngAnh(x))`
b) `∃x(NgườiViệt(x) ∧ NóiTiếngAnh(x))`
c) `¬∀x(NgườiViệt(x) → NóiTiếngAnh(x))`

**Bài 3 — Phủ định lượng từ.**
Viết phủ định của các câu sau và dịch phủ định đó sang tiếng Việt:

a) `∀x(Mèo(x) → ThíchCá(x))` — "Mọi con mèo đều thích cá."
b) `∃x(SinhViên(x) ∧ NgủTrongLớp(x))` — "Có sinh viên ngủ trong lớp."
c) `∀x(ChẵnLớnHơn2(x) → KhôngNgTố(x))` — "Mọi số chẵn > 2 đều không nguyên tố."

**Bài 4 — Đánh giá trên miền.**
Cho miền D = {1, 2, 3, 4, 5} và các vị từ: `Chẵn(x)` = "x là số chẵn", `LẻHơn3(x)` = "x < 3", `Lớn4(x)` = "x > 4". Đánh giá đúng/sai:

a) `∀x Chẵn(x)`
b) `∃x Chẵn(x)`
c) `∀x(Chẵn(x) → ¬LẻHơn3(x))`
d) `∃x(Lớn4(x) ∧ Chẵn(x))`

**Bài 5 — Hình thức hóa lập luận.**
Hình thức hóa lập luận sau và chỉ ra các bước suy luận:

> "Mọi động vật có vú đều nuôi con bằng sữa. Cá voi là động vật có vú. Vậy cá voi nuôi con bằng sữa."

---

## Lời giải chi tiết

**Bài 1.**

a) Định vị từ: `Chim(x)` = "x là con chim", `CóCánh(x)` = "x có cánh".
   → `∀x(Chim(x) → CóCánh(x))`
   Đọc: "Với mọi x, nếu x là chim thì x có cánh."

b) Định vị từ: `NgườiViệt(x)` = "x là con người", `ĐặtChânLênMặtTrăng(x)` = "x đã đặt chân lên Mặt Trăng".
   → `∃x(Người(x) ∧ ĐặtChânLênMặtTrăng(x))`
   (Thực tế đúng: Neil Armstrong, Buzz Aldrin, v.v.)

c) Định vị từ: `Cá(x)` = "x là con cá", `LeoCây(x)` = "x biết leo cây".
   → `∀x(Cá(x) → ¬LeoCây(x))`
   Đây là cách chuẩn dùng ∀ + →¬. Tương đương: `¬∃x(Cá(x) ∧ LeoCây(x))`.

d) Định vị từ: `SốThực(x)` = "x là số thực", `SốHữuTỉ(x)` = "x là số hữu tỉ".
   → `∃x(SốThực(x) ∧ ¬SốHữuTỉ(x))`
   (Thực tế đúng: ví dụ π, √2 là số thực nhưng vô tỉ.)

---

**Bài 2.**

a) `∀x(NgườiViệt(x) → NóiTiếngAnh(x))` → **"Mọi người Việt đều nói được tiếng Anh."**
   (Câu này trên thực tế sai, nhưng đó là điều câu lượng từ nói.)

b) `∃x(NgườiViệt(x) ∧ NóiTiếngAnh(x))` → **"Có ít nhất một người Việt nói được tiếng Anh."**
   (Câu này đúng thực tế.)

c) `¬∀x(NgườiViệt(x) → NóiTiếngAnh(x))` → áp dụng phủ định:
   ≡ `∃x(NgườiViệt(x) ∧ ¬NóiTiếngAnh(x))`
   → **"Có người Việt không nói được tiếng Anh."**

---

**Bài 3.**

a) Gốc: `∀x(Mèo(x) → ThíchCá(x))` — "Mọi mèo thích cá."
   Phủ định: `¬∀x(Mèo(x) → ThíchCá(x))` ≡ `∃x(Mèo(x) ∧ ¬ThíchCá(x))`
   → **"Có con mèo không thích cá."**

b) Gốc: `∃x(SinhViên(x) ∧ NgủTrongLớp(x))` — "Có sinh viên ngủ trong lớp."
   Phủ định: `¬∃x(SinhViên(x) ∧ NgủTrongLớp(x))` ≡ `∀x(SinhViên(x) → ¬NgủTrongLớp(x))`
   → **"Mọi sinh viên đều không ngủ trong lớp."** (Hay: "Không sinh viên nào ngủ trong lớp.")

c) Gốc: `∀x(ChẵnLớnHơn2(x) → KhôngNgTố(x))` — "Mọi số chẵn > 2 đều không nguyên tố."
   Phủ định: `∃x(ChẵnLớnHơn2(x) ∧ NgTố(x))`
   → **"Có số chẵn lớn hơn 2 là số nguyên tố."**
   (Câu phủ định này thực ra **sai** vì mọi số chẵn > 2 đều chia hết cho 2 nên không nguyên tố — đây là ví dụ câu phủ định hợp lệ nhưng sai về nội dung.)

---

**Bài 4.** Miền D = {1, 2, 3, 4, 5}; Chẵn = {2, 4}; LẻHơn3 = {1, 2}; Lớn4 = {5}.

a) `∀x Chẵn(x)` — kiểm tra từng phần tử: x=1 → Chẵn(1) = Sai → phản ví dụ.
   Kết quả: **Sai**.

b) `∃x Chẵn(x)` — x=2 → Chẵn(2) = Đúng → đủ rồi.
   Kết quả: **Đúng**.

c) `∀x(Chẵn(x) → ¬LẻHơn3(x))` — kiểm tra từng phần tử:
   - x=1: Chẵn(1)=Sai → F→? = Đúng ✓
   - x=2: Chẵn(2)=Đúng, ¬LẻHơn3(2)=¬Đúng=Sai → T→F = **Sai** ✗ — phản ví dụ!
   (2 vừa chẵn vừa < 3.)
   Kết quả: **Sai**.

d) `∃x(Lớn4(x) ∧ Chẵn(x))` — x=5: Lớn4(5)=Đúng, Chẵn(5)=Sai → F. Không còn phần tử nào trong Lớn4.
   Kết quả: **Sai**.

---

**Bài 5.**

Định nghĩa vị từ:
- `ĐVCóVú(x)` = "x là động vật có vú"
- `NuôiConBằngSữa(x)` = "x nuôi con bằng sữa"
- `cv` = hằng cá thể "cá voi"

Hình thức hóa:
1. `∀x(ĐVCóVú(x) → NuôiConBằngSữa(x))` — tiền đề 1
2. `ĐVCóVú(cv)` — tiền đề 2
3. `ĐVCóVú(cv) → NuôiConBằngSữa(cv)` — từ (1), Universal Instantiation với x = cv
4. `NuôiConBằngSữa(cv)` — từ (2) và (3), Modus Ponens ✓

Kết luận: Lập luận **hợp lệ**. Vì tiền đề 1 và 2 đều đúng về thực tế, lập luận cũng **đúng đắn** (sound).

---

## Code & Minh họa

- [visualization.html](./visualization.html) — ba công cụ tương tác: **Thế giới nhỏ** (đánh giá ∀/∃ trên miền 8 đối tượng trực quan), **Phủ định lượng từ** (chọn câu → xem cách đẩy ¬ vào trong), **Quiz dịch câu** (chọn ký hiệu đúng cho câu tiếng Việt).

---

## Bài tiếp theo

→ **[Lesson 06 — Phương pháp chứng minh](../lesson-06-proof-methods/)**: chứng minh trực tiếp, phản chứng (reductio ad absurdum), phản ví dụ, và cách dùng logic vị từ trong chứng minh toán học.

[⬆ Về Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
