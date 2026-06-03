# Lesson 04 — Tính hợp lệ & luật suy luận

> **Tầng 1 — Formal Logic · Bài 4/8**

Cho đến bây giờ, bạn đã biết dựng bảng chân lý và chứng minh tương đương. Nhưng có một câu hỏi chưa được trả lời: **khi nào một chuỗi lập luận "được phép rút ra" kết luận từ các tiền đề?** Bài này trả lời câu đó bằng khái niệm trung tâm: **tính hợp lệ (validity)** và một bộ **luật suy luận (inference rules)** mà bạn có thể áp dụng cơ học như công thức toán.

---

## Mục tiêu học tập

Sau bài này, bạn có thể:

- Phân biệt **lập luận hợp lệ (valid)** và **lập luận đúng đắn (sound)** — hai khái niệm thường bị lẫn.
- Kiểm tra tính hợp lệ bằng bảng chân lý: tìm **dòng phản ví dụ** (mọi tiền đề đúng, kết luận sai).
- Áp dụng 6 luật suy luận chuẩn: modus ponens, modus tollens, tam đoạn luận giả thiết, tam đoạn luận tuyển, cộng, rút gọn.
- Nhận biết 2 **ngụy biện hình thức** phổ biến: khẳng định hậu kiện và phủ định tiền kiện — và giải thích vì sao chúng không hợp lệ.

## Kiến thức tiền đề

- Liên từ ¬ ∧ ∨ → ↔ và cách đọc bảng chân lý → [`../lesson-02-truth-tables/`](../lesson-02-truth-tables/)
- Tautology, mâu thuẫn, tương đương logic → [`../lesson-03-equivalence-laws/`](../lesson-03-equivalence-laws/)

---

## 1. Lập luận là gì?

> 💡 **Trực giác.** Một **lập luận** không phải là "cuộc cãi vã" — trong logic, nó là một cấu trúc: bạn đưa ra một số **tiền đề (premises)** rồi tuyên bố chúng dẫn đến một **kết luận (conclusion)**. Giống như bạn nói: "Trời mưa. Khi trời mưa, đường trơn. Vậy đường trơn."

Về mặt hình thức:

```
Tiền đề 1:  p₁
Tiền đề 2:  p₂
  ⋮
Tiền đề n:  pₙ
──────────────
∴ Kết luận: C
```

Ký hiệu **∴** (có nghĩa "do đó / therefore") đứng trước kết luận. Ký hiệu **⊢** (turnstile) viết tắt toàn bộ: `p₁, p₂, …, pₙ ⊢ C` nghĩa là "từ p₁, …, pₙ suy ra C".

**Ví dụ 1 — lập luận hàng ngày:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.      (p → q)
Tiền đề 2: Trời mưa.                          (p)
──────────────────────────────────────────────
∴ Đường trơn.                                 (q)
```

**Ví dụ 2 — lập luận toán học:**
```
Tiền đề 1: Mọi số chẵn đều chia hết cho 2.
Tiền đề 2: 100 là số chẵn.
──────────────────────────────────────────
∴ 100 chia hết cho 2.
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Lập luận có tiền đề sai thì sao?"* — Lập luận vẫn có thể **hợp lệ**. Tính hợp lệ chỉ hỏi "NẾU tiền đề đúng thì kết luận có bắt buộc đúng không?" — không hỏi tiền đề có thực sự đúng không. Mục 2 làm rõ điều này.
> - *"Kết luận có thể là tiền đề của lập luận khác không?"* — Có. Đó là cách xây chuỗi suy luận trong chứng minh toán học.

> 📝 **Tóm tắt mục 1.** Lập luận = tiền đề p₁…pₙ + kết luận C, viết `p₁,…,pₙ ⊢ C`. Tiền đề và kết luận đều là mệnh đề có giá trị chân lý xác định.

---

## 2. Hợp lệ (Valid) vs Đúng đắn (Sound)

### 2.1 Tính hợp lệ

> 💡 **Trực giác.** "Hợp lệ" là về **hình thức**, không về **nội dung**. Hỏi: "Nếu tôi tin tất cả tiền đề là đúng, tôi có buộc phải tin kết luận không?" Nếu câu trả lời là **có**, lập luận hợp lệ — bất kể tiền đề đó mô tả thực tế hay không.

**Định nghĩa chính xác:**

Một lập luận là **hợp lệ (valid)** khi và chỉ khi: **không tồn tại** cách gán giá trị chân lý nào khiến tất cả tiền đề đều ĐÚNG (T) nhưng kết luận lại SAI (F).

Nói cách khác: mọi dòng trong bảng chân lý mà **tất cả tiền đề = T** thì **kết luận cũng = T**.

**Ví dụ 1 — Lập luận hợp lệ với tiền đề đúng trong thực tế:**
```
Tiền đề 1: Mọi con người đều phải chết.    (đúng trong thực tế)
Tiền đề 2: Socrates là con người.          (đúng trong thực tế)
∴ Socrates phải chết.                      (đúng — và lập luận HỢP LỆ)
```

**Ví dụ 2 — Lập luận hợp lệ NHƯNG tiền đề sai trong thực tế:**
```
Tiền đề 1: Mọi con mèo đều có sừng.       (SAI trong thực tế)
Tiền đề 2: Tom là con mèo.                 (giả sử đúng)
∴ Tom có sừng.                             (kết luận sai, nhưng lập luận VẪN HỢP LỆ)
```
Hình thức giống hệt ví dụ 1 — nếu tiền đề 1 đúng, tiền đề 2 đúng, thì kết luận buộc phải đúng. Hợp lệ là về **cấu trúc**, không về sự thật của tiền đề.

**Ví dụ 3 — Lập luận KHÔNG hợp lệ:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.   (p → q)
Tiền đề 2: Đường trơn.                    (q)
∴ Trời mưa.                               (p) ← SAI!
```
Không hợp lệ vì đường có thể trơn do ai đó tưới nước — tiền đề 1 và 2 đều đúng mà kết luận vẫn sai.

**Ví dụ 4 — Lập luận có kết luận đúng nhưng lập luận KHÔNG hợp lệ:**
```
Tiền đề 1: Hà Nội là thủ đô Việt Nam.
Tiền đề 2: 2 + 2 = 4.
∴ Mặt trời mọc ở phía đông.
```
Kết luận đúng trong thực tế, nhưng hai tiền đề không hề **dẫn đến** kết luận — không có quan hệ logic nào. Lập luận không hợp lệ.

> ⚠ **Lỗi thường gặp: lẫn "kết luận đúng" với "lập luận hợp lệ".** Một kết luận có thể đúng trong thực tế nhưng lập luận dẫn đến nó vẫn không hợp lệ (như ví dụ 4). Ngược lại, lập luận hợp lệ có thể có kết luận sai nếu tiền đề sai (ví dụ 2). Hợp lệ là về **mối quan hệ hình thức** giữa tiền đề và kết luận.

### 2.2 Tính đúng đắn (Soundness)

**Định nghĩa:** Một lập luận là **đúng đắn (sound)** khi nó thỏa mãn **đồng thời** hai điều kiện:
1. Lập luận **hợp lệ** (về hình thức).
2. Tất cả tiền đề **thực sự đúng** (về nội dung, trong thực tế hoặc trong hệ thống đang xét).

**Hệ quả quan trọng:** Nếu lập luận đúng đắn thì kết luận **bắt buộc đúng trong thực tế** (không chỉ đúng về hình thức).

**Ví dụ — đúng đắn:**
```
Tiền đề 1: Mọi số nguyên tố > 2 đều lẻ.   (ĐÚNG trong toán học)
Tiền đề 2: 7 là số nguyên tố > 2.          (ĐÚNG)
∴ 7 là số lẻ.                              (ĐÚNG — lập luận đúng đắn)
```

**Ví dụ — hợp lệ nhưng KHÔNG đúng đắn:**
```
Tiền đề 1: Mọi con mèo đều có sừng.        (SAI trong thực tế)
Tiền đề 2: Tom là con mèo.
∴ Tom có sừng.
```
Hợp lệ (cấu trúc đúng) nhưng không đúng đắn vì tiền đề 1 sai. Kết luận có thể đúng hay sai tùy trường hợp.

| Lập luận | Hợp lệ? | Tiền đề thực tế? | Đúng đắn? | Kết luận thực tế? |
|----------|:-------:|:----------------:|:---------:|:-----------------:|
| Socrates (v.d. 1) | ✓ | ✓ | ✓ | Bắt buộc ✓ |
| Mèo có sừng (v.d. 2) | ✓ | ✗ | ✗ | Không đảm bảo |
| Khẳng định hậu kiện (v.d. 3) | ✗ | ✓ | ✗ | Không đảm bảo |
| Không liên quan (v.d. 4) | ✗ | ✓ | ✗ | Trùng hợp |

> 🔁 **Dừng lại tự kiểm tra.**
> Lập luận sau hợp lệ hay không? Đúng đắn hay không?
> ```
> Tiền đề 1: Mọi sinh viên chăm chỉ đều thi đậu.
> Tiền đề 2: An thi đậu.
> ∴ An là sinh viên chăm chỉ.
> ```
> <details><summary>Đáp án</summary>
>
> **Không hợp lệ.** An có thể thi đậu vì may mắn, vì đề dễ, hoặc vì gian lận — không phải chỉ vì chăm chỉ. Dòng phản ví dụ: Tiền đề 1 = T (quy tắc tổng quát đúng), Tiền đề 2 = T (An thi đậu), nhưng kết luận (An chăm chỉ) vẫn có thể = F. Đây là ngụy biện **khẳng định hậu kiện** — xem mục 5.
> </details>

> 📝 **Tóm tắt mục 2.**
> - **Hợp lệ** = về HÌNH THỨC: không thể có tất cả tiền đề T mà kết luận F.
> - **Đúng đắn** = hợp lệ + tiền đề thực sự đúng → đảm bảo kết luận đúng trong thực tế.
> - Kết luận đúng ≠ lập luận hợp lệ. Tiền đề đúng ≠ lập luận đúng đắn nếu không hợp lệ.

---

## 3. Kiểm tra tính hợp lệ bằng bảng chân lý

### 3.1 Quy trình

Để kiểm tra `p₁, p₂, …, pₙ ⊢ C` có hợp lệ không:

1. Liệt kê tất cả biến mệnh đề (p, q, r, ...) trong các tiền đề và kết luận.
2. Dựng bảng chân lý với **2ⁿ dòng** (n = số biến).
3. Tính giá trị của **từng tiền đề** và **kết luận** ở mỗi dòng.
4. Tìm **dòng phản ví dụ (counterexample)**: dòng có tất cả tiền đề = T và kết luận = F.
   - Tìm thấy → lập luận **KHÔNG hợp lệ**.
   - Không tìm thấy → lập luận **HỢP LỆ**.

### 3.2 Ví dụ kiểm tra modus ponens: `p→q, p ⊢ q`

| p | q | p→q | p | q (kết luận) | Tất cả TP đúng? | Phản ví dụ? |
|:-:|:-:|:---:|:-:|:---:|:---:|:---:|
| T | T | T | T | T | ✓ | — |
| T | F | F | T | F | ✗ (TP1 = F) | — |
| F | T | T | F | T | ✗ (TP2 = F) | — |
| F | F | T | F | F | ✗ (TP2 = F) | — |

Dòng 1 là dòng duy nhất có tất cả tiền đề = T. Kết luận = T ở dòng đó. Không có phản ví dụ → **HỢP LỆ** ✓.

### 3.3 Ví dụ kiểm tra ngụy biện: `p→q, q ⊢ p` (khẳng định hậu kiện)

| p | q | p→q | q | p (kết luận) | Tất cả TP đúng? | Phản ví dụ? |
|:-:|:-:|:---:|:-:|:---:|:---:|:---:|
| T | T | T | T | T | ✓ | — |
| T | F | F | F | T | ✗ | — |
| **F** | **T** | **T** | **T** | **F** | **✓** | **← ĐÂY!** |
| F | F | T | F | F | ✗ | — |

Dòng 3 (p=F, q=T): p→q = T, q = T (cả hai tiền đề đúng), nhưng kết luận p = F. Đây là **dòng phản ví dụ** → lập luận **KHÔNG hợp lệ** ✗.

Ý nghĩa bằng ngôn ngữ tự nhiên: "Nếu trời mưa thì đường trơn. Đường trơn. Vậy trời mưa." — Sai vì đường có thể trơn do nhiều nguyên nhân khác.

> ⚠ **Lỗi thường gặp: quên kiểm tra TẤT CẢ dòng.** Nhiều người chỉ nhìn vài dòng và tuyên bố hợp lệ. Phải duyệt hết bảng và đặc biệt chú ý các dòng có nhiều tiền đề = T — đó là nơi phản ví dụ hay ẩn.

> 📝 **Tóm tắt mục 3.** Quy trình kiểm tra: dựng bảng chân lý → tìm dòng phản ví dụ (tất cả TP = T, kết luận = F). Tìm thấy → không hợp lệ; không tìm thấy → hợp lệ.

---

## 4. Sáu luật suy luận hợp lệ

Mỗi luật dưới đây là một **sơ đồ suy luận hợp lệ** — đã được kiểm tra bằng bảng chân lý. Khi bạn nhận ra tiền đề của mình khớp với sơ đồ, bạn có thể "rút ra" kết luận ngay mà không cần dựng lại bảng.

### 4.1 Modus Ponens (MP) — Khẳng định tiền kiện

**Sơ đồ:**
```
p → q
p
──────
∴ q
```

**Ví dụ 1:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.
Tiền đề 2: Trời mưa.
∴ Đường trơn.
```

**Ví dụ 2:**
```
Tiền đề 1: Nếu x > 5 thì x > 3.     (p → q, với p: "x>5", q: "x>3")
Tiền đề 2: x = 7 > 5.               (p)
∴ x = 7 > 3.                        (q)
```

**Ví dụ 3 (chuỗi):**
```
Tiền đề 1: Nếu học chăm thì thi đậu.  (p → q)
Tiền đề 2: An học chăm.               (p)
∴ An thi đậu.                         (q)
```

**Bảng chân lý xác nhận:**

| p | q | p→q | p | q (KL) | TP đều T? |
|:-:|:-:|:---:|:-:|:-------:|:---------:|
| T | T |  T  | T |    T    |     ✓ KL=T |
| T | F |  F  | T |    F    | ✗ (TP1=F) |
| F | T |  T  | F |    T    | ✗ (TP2=F) |
| F | F |  T  | F |    F    | ✗ (TP2=F) |

Không có phản ví dụ → HỢP LỆ.

### 4.2 Modus Tollens (MT) — Phủ định hậu kiện

**Sơ đồ:**
```
p → q
¬q
──────
∴ ¬p
```

**Trực giác:** Nếu có q thì mới có p được; nếu không có q thì không thể có p.

**Ví dụ 1:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.
Tiền đề 2: Đường KHÔNG trơn.
∴ Trời KHÔNG mưa.
```

**Ví dụ 2:**
```
Tiền đề 1: Nếu số n chia hết cho 4 thì n chia hết cho 2.
Tiền đề 2: 13 không chia hết cho 2.
∴ 13 không chia hết cho 4.
```

**Ví dụ 3:**
```
Tiền đề 1: Nếu thuật toán chạy trong O(1) thì thời gian không tăng theo n.
Tiền đề 2: Thời gian tăng theo n (đo thực nghiệm).
∴ Thuật toán không chạy trong O(1).
```

**Liên hệ:** MT chính là MP áp dụng cho contrapositive. Vì `(p→q) ≡ (¬q→¬p)` (đã học ở Lesson 03), ta thực ra đang làm: từ `(¬q→¬p)` và `¬q`, dùng MP rút ra `¬p`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"MT có phải nghịch đảo MP không?"* — Không giống nhau. MP đi từ p→q và p đến q. MT đi từ p→q và ¬q đến ¬p. Cả hai hợp lệ. Nghịch đảo của MP là "từ p→q và q suy ra p" — đó là ngụy biện khẳng định hậu kiện (mục 5), KHÔNG hợp lệ.
> - *"Nếu tiền đề 2 trong MT là ¬q = FALSE (tức q = TRUE), thì sao?"* — Khi q = T, ¬q = F, TP2 sai → không ở trường hợp áp dụng MT. Không thể kết luận gì thêm về p.

### 4.3 Tam đoạn luận giả thiết (Hypothetical Syllogism — HS)

**Sơ đồ:**
```
p → q
q → r
──────
∴ p → r
```

**Trực giác:** Tính chất bắc cầu của hàm kéo theo — nếu A dẫn đến B, B dẫn đến C, thì A dẫn đến C.

**Ví dụ 1:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.
Tiền đề 2: Nếu đường trơn thì xe dễ trượt.
∴ Nếu trời mưa thì xe dễ trượt.
```

**Ví dụ 2 (toán):**
```
Tiền đề 1: x > 10 → x > 5
Tiền đề 2: x > 5 → x > 0
∴ x > 10 → x > 0
```

**Ví dụ 3 (chuỗi dài hơn):**
```
Nếu học → hiểu  |  hiểu → vận dụng  |  vận dụng → điểm cao
∴ Nếu học → điểm cao
```
(Áp dụng HS hai lần liên tiếp.)

> ⚠ **Lỗi thường gặp: nhầm với phủ định trong chuỗi.** HS chỉ kết nối `p→q` và `q→r` thành `p→r` khi **hậu kiện** của TP1 trùng khớp chính xác với **tiền kiện** của TP2. Nếu bạn có `p→q` và `¬q→r`, đó không phải HS; phải dùng quy tắc khác.

### 4.4 Tam đoạn luận tuyển (Disjunctive Syllogism — DS)

**Sơ đồ:**
```
p ∨ q
¬p
──────
∴ q
```

**Trực giác:** Có ít nhất một trong hai; nếu biết cái này sai thì cái kia phải đúng.

**Ví dụ 1:**
```
Tiền đề 1: Ký túc xá hoặc nhà trọ.    (p ∨ q)
Tiền đề 2: Không phải ký túc xá.       (¬p)
∴ Nhà trọ.                             (q)
```

**Ví dụ 2:**
```
Tiền đề 1: Lỗi ở frontend hoặc backend.
Tiền đề 2: Không phải lỗi frontend (đã kiểm tra log).
∴ Lỗi ở backend.
```

**Ví dụ 3:**
```
p ∨ q ∨ r, ¬p, ¬q ⊢ r
(áp dụng DS hai lần: trước tiên từ p∨q∨r ≡ (p∨q)∨r và ¬(p∨q) ≡ ¬p∧¬q)
```

> ⚠ **Lỗi thường gặp: quên ∨ trong logic là "hoặc bao gồm" (inclusive or).** `p ∨ q` đúng khi một hoặc cả hai đúng. DS chỉ dùng được khi biết chắc một phần tử sai — không phải "vì p đúng nên q sai".

### 4.5 Cộng (Addition — Add)

**Sơ đồ:**
```
p
──────
∴ p ∨ q
```

**Trực giác:** Nếu p đúng, thì "p hoặc bất cứ điều gì" cũng đúng — vì ∨ chỉ cần một phần tử đúng.

**Ví dụ 1:**
```
Tiền đề: Hôm nay là thứ Hai.
∴ Hôm nay là thứ Hai HOẶC trời mưa.
```

**Ví dụ 2 (ứng dụng trong chuỗi suy luận):**
```
Biết: An đỗ đại học.
Cần: An đỗ đại học ∨ Bình đỗ đại học. (để áp dụng DS ở bước tiếp)
→ Dùng Addition để "thêm" phần còn lại.
```

> ❓ **Câu hỏi tự nhiên.** *"Thêm q tùy ý vào vẻ như kỳ lạ — có vô nghĩa không?"* — Không vô nghĩa khi nhìn ở cấp hình thức. Kết quả `p ∨ q` yếu hơn `p` (nói ít hơn), nên luôn đúng khi p đúng. Trong thực hành, Add thường dùng để "đặt bẫy" cho DS ở bước sau.

### 4.6 Rút gọn (Simplification — Simp)

**Sơ đồ:**
```
p ∧ q
──────
∴ p
```
(hoặc ∴ q — lấy một trong hai phần của hội)

**Ví dụ 1:**
```
Tiền đề: An chăm chỉ VÀ thông minh.
∴ An chăm chỉ.
```

**Ví dụ 2:**
```
Tiền đề: n > 0 ∧ n < 100.
∴ n > 0.
```

**Ví dụ 3 (kết hợp):**
```
Biết: p ∧ q ∧ r → ...
Muốn dùng riêng q: dùng Simp để trích q từ (p ∧ q ∧ r).
```

> 📝 **Tóm tắt mục 4 — Sáu luật suy luận hợp lệ:**
>
> | Tên | Sơ đồ | Từ khóa nhớ |
> |-----|-------|-------------|
> | Modus Ponens | p→q, p ⊢ q | "Có tiền kiện → có hậu kiện" |
> | Modus Tollens | p→q, ¬q ⊢ ¬p | "Không có hậu kiện → không có tiền kiện" |
> | HS (bắc cầu) | p→q, q→r ⊢ p→r | "Chuỗi kéo theo nối tiếp" |
> | DS (tuyển) | p∨q, ¬p ⊢ q | "Loại trừ → cái còn lại" |
> | Addition | p ⊢ p∨q | "Thêm bất cứ thứ gì vào ∨" |
> | Simplification | p∧q ⊢ p | "Tách ra từ hội" |

---

## 5. Ngụy biện hình thức (Formal Fallacies)

Đây là các **sơ đồ trông giống luật suy luận** nhưng thực ra KHÔNG hợp lệ. Hiểu rõ hai ngụy biện sau sẽ giúp bạn tránh và phát hiện sai lầm trong lập luận.

> 💡 **Trực giác.** Hai ngụy biện này sinh ra từ việc "nhầm chiều" của hàm kéo theo. `p→q` không có nghĩa là `q→p` hay `¬p→¬q`. Nhưng não người hay ẩu rút ra điều đó vì trong đời thường, nhiều điều kiện xảy ra theo cả hai chiều.

### 5.1 Ngụy biện khẳng định hậu kiện (Affirming the Consequent — AC)

**Sơ đồ sai:**
```
p → q
q        ← CÓ HẬU KIỆN
──────
∴ p      ← SAI: không đủ căn cứ!
```

**Ví dụ 1 — vì sao sai:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.    (T)
Tiền đề 2: Đường trơn.                      (T)
∴ Trời mưa.                                 ← SAI! (có thể do ai tưới nước)
```

**Dòng phản ví dụ** (p=F, q=T): p→q = T (đường trơn mà không mưa vẫn thỏa điều kiện), q = T. Cả hai tiền đề T, nhưng p = F. Đây là dòng phản ví dụ → KHÔNG hợp lệ.

**Ví dụ 2 — ẩn dụ thường gặp:**
```
"Người giàu thường sống ở khu A. Anh X sống ở khu A. Vậy anh X giàu."
← Sai: có thể anh X thuê trọ giá rẻ ở đó.
```

**Ví dụ 3 — trong khoa học:**
```
"Nếu lý thuyết T đúng thì ta quan sát thấy hiện tượng H.
Ta quan sát thấy H.
∴ Lý thuyết T đúng."
← Sai! H có thể xảy ra do lý thuyết khác. Đây là lý do khoa học không "chứng minh" lý thuyết, chỉ "bác bỏ".
```

### 5.2 Ngụy biện phủ định tiền kiện (Denying the Antecedent — DA)

**Sơ đồ sai:**
```
p → q
¬p       ← PHỦ ĐỊNH TIỀN KIỆN
──────
∴ ¬q     ← SAI: không đủ căn cứ!
```

**Ví dụ 1 — vì sao sai:**
```
Tiền đề 1: Nếu trời mưa thì đường trơn.
Tiền đề 2: Trời KHÔNG mưa.
∴ Đường KHÔNG trơn.    ← SAI! Đường vẫn có thể trơn vì lý do khác.
```

**Dòng phản ví dụ** (p=F, q=T): p→q = T, ¬p = T. Cả hai tiền đề T, nhưng kết luận ¬q = F. Đây là phản ví dụ → KHÔNG hợp lệ.

**Ví dụ 2:**
```
"Nếu chăm học thì đỗ đại học.
An không chăm học.
∴ An không đỗ đại học."    ← Sai: An có thể đỗ vì tài năng thiên bẩm.
```

**Ví dụ 3 — so sánh DA vs MT để thấy rõ sự khác biệt:**
```
HỢP LỆ (MT):
  Tiền đề 1: Nếu chăm học thì đỗ.
  Tiền đề 2: An KHÔNG đỗ.           ← phủ định HẬU KIỆN
  ∴ An KHÔNG chăm học.              ← phủ định TIỀN KIỆN ✓

KHÔNG HỢP LỆ (DA):
  Tiền đề 1: Nếu chăm học thì đỗ.
  Tiền đề 2: An KHÔNG chăm học.     ← phủ định TIỀN KIỆN
  ∴ An KHÔNG đỗ.                    ← phủ định HẬU KIỆN ✗
```

Quy tắc ngón tay cái: luôn kiểm tra **bạn đang phủ định cái gì** — phủ định hậu kiện (MT) thì ổn, phủ định tiền kiện (DA) thì sai.

> ⚠ **Lỗi rất thường gặp trong thực tế.** Hai ngụy biện này xuất hiện cực kỳ phổ biến trong tranh luận đời thường, quảng cáo, và lập luận chính trị. Khi bạn nghe "Nếu A thì B, và B xảy ra rồi, chứng tỏ A đúng" — đó là khẳng định hậu kiện. Học cách nhận ra nó là kỹ năng tư duy phê phán cốt lõi (sẽ đi sâu ở Tầng 2).

> 📝 **Tóm tắt mục 5 — Hai ngụy biện hình thức:**
>
> | Ngụy biện | Sơ đồ | Phản ví dụ | So sánh |
> |-----------|-------|-----------|---------|
> | Khẳng định hậu kiện (AC) | p→q, q ⊢ p | p=F, q=T | Nhầm với MP |
> | Phủ định tiền kiện (DA) | p→q, ¬p ⊢ ¬q | p=F, q=T | Nhầm với MT |
>
> Cả hai có cùng dòng phản ví dụ: p=F, q=T — đây là điểm ghi nhớ nhanh.

---

## 6. Tổng hợp: valid vs sound vs ngụy biện

Bảng tóm tắt toàn bài:

| | Hợp lệ (valid) | Đúng đắn (sound) | Ngụy biện hình thức |
|--|:-:|:-:|:-:|
| Hình thức đúng? | ✓ | ✓ | ✗ |
| Tiền đề thực sự đúng? | Không cần | ✓ | Không liên quan |
| Kết luận đúng trong thực tế? | Không đảm bảo | ✓ (bắt buộc) | Không đảm bảo |
| Có dòng phản ví dụ không? | ✗ | ✗ | ✓ |

---

## 7. Bài tập

**Bài 1.** Lập luận sau hợp lệ hay không? Nếu không, chỉ ra dòng phản ví dụ.
```
p → q
¬p
──────
∴ ¬q
```

**Bài 2.** Lập luận sau dùng luật suy luận gì? Có hợp lệ không?
```
Nếu trời lạnh thì An mặc áo ấm.
Nếu An mặc áo ấm thì An không bị cảm.
∴ Nếu trời lạnh thì An không bị cảm.
```

**Bài 3.** Lập luận sau hợp lệ, nhưng có đúng đắn không? Giải thích.
```
Tiền đề 1: Mọi sinh vật trên Sao Hỏa đều thở được nitrogen nguyên chất.
Tiền đề 2: Zork là sinh vật trên Sao Hỏa.
∴ Zork thở được nitrogen nguyên chất.
```

**Bài 4.** Dùng bảng chân lý kiểm tra: `p ∨ q, ¬p ⊢ q` có hợp lệ không?

**Bài 5.** Nhận biết ngụy biện: Lập luận sau thuộc loại nào? Tại sao không hợp lệ?
```
Nếu có virus thì máy tính chạy chậm.
Máy tính chạy chậm.
∴ Máy tính bị virus.
```

---

## Lời giải chi tiết

**Bài 1.**
Đây là **ngụy biện phủ định tiền kiện (Denying the Antecedent)**.

Dựng bảng chân lý:

| p | q | p→q | ¬p | ¬q (KL) | Tất cả TP đúng? | Phản ví dụ? |
|:-:|:-:|:---:|:--:|:-------:|:---:|:---:|
| T | T |  T  | F  |    F    | ✗ (¬p=F) | — |
| T | F |  F  | F  |    T    | ✗ (TP1=F và ¬p=F) | — |
| **F** | **T** |  **T**  | **T**  |    **F**    | ✓ | **← Phản ví dụ** |
| F | F |  T  | T  |    T    | ✓ | — |

Dòng 3 (p=F, q=T): p→q = T, ¬p = T (cả hai tiền đề đúng), nhưng ¬q = F (kết luận sai). Đây là dòng phản ví dụ → **KHÔNG hợp lệ**.

Ý nghĩa: "Trời không lạnh không có nghĩa là An không mặc áo ấm."

**Bài 2.**
Đây là **Tam đoạn luận giả thiết (Hypothetical Syllogism — HS)**, có dạng:
- TP1: trời lạnh → mặc áo ấm (p → q)
- TP2: mặc áo ấm → không bị cảm (q → r)
- KL: trời lạnh → không bị cảm (p → r)

Khớp chính xác sơ đồ HS. **Hợp lệ** ✓.

Lưu ý: tiền đề có thể không phản ánh thực tế (áo ấm không đảm bảo không bị cảm), nhưng đó là vấn đề về **đúng đắn**, không về **hợp lệ**.

**Bài 3.**
**Hợp lệ** — cấu trúc hoàn toàn giống Modus Ponens dạng:
- Mọi S là P (tất cả sinh vật Sao Hỏa thở N₂)
- Zork là S
- ∴ Zork là P

Đây là dạng MP tổng quát (sẽ phân tích kỹ hơn ở [Lesson 05 — Logic vị từ](../lesson-05-predicate-logic/) và [Lesson 07 — Tam đoạn luận](../lesson-07-syllogisms/)).

**Không đúng đắn** — vì Tiền đề 1 rõ ràng sai trong thực tế (ta không biết gì về sinh vật Sao Hỏa, và sinh vật Trái Đất không thở nitrogen nguyên chất). Tiền đề 2 cũng không có cơ sở thực tế. Kết luận không có căn cứ mặc dù hình thức đúng.

**Bài 4.**
Đây là **Tam đoạn luận tuyển (DS)**: `p ∨ q, ¬p ⊢ q`.

| p | q | p∨q | ¬p | q (KL) | Tất cả TP đúng? | Phản ví dụ? |
|:-:|:-:|:---:|:--:|:------:|:---:|:---:|
| T | T |  T  | F  |   T    | ✗ (¬p=F) | — |
| T | F |  T  | F  |   F    | ✗ (¬p=F) | — |
| **F** | **T** |  **T**  | **T**  |   **T**    | ✓ | — (KL=T) |
| F | F |  F  | T  |   F    | ✗ (TP1=F) | — |

Chỉ có dòng 3 với tất cả TP đúng, và kết luận = T. Không có phản ví dụ → **HỢP LỆ** ✓.

**Bài 5.**
Đây là **ngụy biện khẳng định hậu kiện (Affirming the Consequent)**.

Phân tích:
- p = "máy tính bị virus"
- q = "máy tính chạy chậm"
- TP1: p → q ✓
- TP2: q ✓ (có hậu kiện)
- KL: p ← đây là khẳng định hậu kiện, KHÔNG hợp lệ

Dòng phản ví dụ (p=F, q=T): máy tính chạy chậm do nhiều nguyên nhân khác (quá nhiều tab trình duyệt, ổ cứng đầy, RAM thiếu...). Tiền đề 1 = T, Tiền đề 2 = T, nhưng kết luận "bị virus" = F.

Đây là lỗi suy luận rất phổ biến trong chẩn đoán kỹ thuật: quan sát triệu chứng (q) rồi nhảy thẳng vào kết luận nguyên nhân (p) mà không loại trừ các nguyên nhân khác.

---

## Code & Minh họa

[visualization.html](./visualization.html) — Công cụ tương tác gồm ba phần:

1. **Máy kiểm tra tính hợp lệ**: Nhập tiền đề và kết luận dưới dạng công thức mệnh đề (p, q, r), máy tự dựng bảng chân lý đầy đủ, tô màu dòng phản ví dụ, và báo HỢP LỆ hay KHÔNG HỢP LỆ.
2. **Phòng luật suy luận**: Chọn luật (MP, MT, HS, DS, Add, Simp), xem sơ đồ + ví dụ ngôn ngữ tự nhiên + bảng chân lý xác nhận.
3. **So sánh hợp lệ vs ngụy biện**: Xem cạnh nhau MP vs khẳng định hậu kiện, MT vs phủ định tiền kiện.

---

## Bài tiếp theo

→ **[Lesson 05 — Logic vị từ](../lesson-05-predicate-logic/)**: Mở rộng từ mệnh đề sang vị từ (predicate) và lượng từ ∀/∃ — cho phép biểu diễn câu dạng "mọi X đều là Y" và "tồn tại X sao cho Y".

[⬆ Về Tầng 1 Formal Logic](../index.html) · [🏠 Trang chính Philosophy](../../index.html)
