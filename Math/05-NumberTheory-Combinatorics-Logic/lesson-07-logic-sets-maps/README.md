# Lesson 07 — Logic, tập hợp, ánh xạ

## Mục tiêu

- Hiểu **logic mệnh đề**: ∧, ∨, ¬, →, ↔.
- **Lượng từ**: ∀ (forall), ∃ (exists). Phủ định.
- **Tập hợp**: phép toán hợp, giao, hiệu, phần bù, tích Descartes.
- **Ánh xạ**: đơn ánh (injective), toàn ánh (surjective), song ánh (bijective).

## Kiến thức tiền đề

- Toán cơ bản.

---

## 1. Logic mệnh đề

💡 **Trực giác / Hình dung**: mệnh đề là câu "đúng/sai dứt khoát" — như công tắc chỉ có BẬT (T) hoặc TẮT (F). Các phép logic (∧, ∨, ¬...) là "mạch điện" ghép các công tắc lại: AND như 2 công tắc nối tiếp (cả 2 bật mới thông), OR như 2 công tắc song song (1 cái bật là thông).

**Mệnh đề** = phát biểu **đúng** hoặc **sai** (không cả 2).

**4 ví dụ số đa dạng**:
- "2+2 = 4" → mệnh đề **đúng**.
- "7 là số chẵn" → mệnh đề **sai**.
- "x + 1 = 5" → KHÔNG phải mệnh đề (đúng/sai tùy x — gọi là vị từ).
- "Bạn khỏe không?" → KHÔNG phải mệnh đề (câu hỏi, không có giá trị đúng/sai).

### Phép toán logic

| Ký hiệu | Tên | Ý nghĩa |
|---------|-----|---------|
| ¬p | phủ định | "không p" |
| p ∧ q | và (AND) | "p và q" |
| p ∨ q | hoặc (OR) | "p hoặc q" |
| p → q | suy ra | "nếu p thì q" |
| p ↔ q | tương đương | "p khi và chỉ khi q" |

### Bảng chân trị

| p | q | ¬p | p∧q | p∨q | p→q | p↔q |
|---|---|----|-----|-----|-----|-----|
| T | T | F  | T   | T   | T   | T   |
| T | F | F  | F   | T   | F   | F   |
| F | T | T  | F   | T   | T   | F   |
| F | F | T  | F   | F   | T   | T   |

⚠ **p → q**: khi p sai, q gì cũng đúng ("ex falso quodlibet"). 

**Ví dụ**: "Nếu 1 = 2 thì tôi là Vua Anh" — về mặt logic là **đúng** (vì p sai).

### Quy luật De Morgan

```
¬(p ∧ q) = ¬p ∨ ¬q
¬(p ∨ q) = ¬p ∧ ¬q
```

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao `p → q` đúng khi p sai?"* Vì `p → q` chỉ "hứa hẹn": *nếu* p thì q. Khi p không xảy ra, lời hứa không bị vi phạm → mặc định đúng. Vd "nếu trời mưa thì tôi mang ô" — hôm trời không mưa, dù tôi có mang ô hay không, lời hứa vẫn không sai.
- *"`p → q` và `q → p` có giống nhau không?"* **Không**. `p → q` (thuận) khác `q → p` (đảo). Vd "mưa → ướt đường" đúng, nhưng "ướt đường → mưa" sai (có thể do tưới cây).

⚠ **Lỗi thường gặp — lẫn `p → q` với chiều đảo `q → p`**. Chúng KHÔNG tương đương. Cái tương đương với `p → q` là **phản đảo** `¬q → ¬p`. Phản ví dụ kiểm bảng chân trị: với p=F, q=T: `p→q = T` nhưng `q→p = F` → khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. Dùng De Morgan, viết lại `¬(p ∧ ¬q)`.
2. Mệnh đề "Nếu 2 > 3 thì mặt trời lạnh" đúng hay sai?

<details><summary>Đáp án</summary>

1. `¬p ∨ ¬(¬q) = ¬p ∨ q`.
2. **Đúng** — vì p ("2 > 3") sai, nên `p → q` đúng bất kể q.

</details>

### 📝 Tóm tắt mục 1

- Mệnh đề = câu đúng/sai dứt khoát (công tắc T/F).
- `p → q` chỉ sai khi p đúng & q sai; p sai thì luôn đúng.
- De Morgan: `¬(p∧q) = ¬p∨¬q`. `p→q` tương đương phản đảo `¬q→¬p`, KHÔNG phải đảo `q→p`.

---

## 2. Lượng từ

💡 **Trực giác / Hình dung**: ∀ ("với mọi") là lời khẳng định mạnh — phải đúng cho **toàn bộ**, chỉ cần 1 phản ví dụ là sập. ∃ ("tồn tại") là khẳng định yếu — chỉ cần **1 trường hợp** đúng là xong. Phủ định đảo vai: phá vỡ "mọi" = chỉ ra 1 ngoại lệ (∃ phản ví dụ); phá vỡ "tồn tại" = chứng minh không cái nào (∀ đều không).

- **∀x** = "với mọi x" (forall).
- **∃x** = "tồn tại x" (exists).

**4 ví dụ số đa dạng**:
- `∀x ∈ ℝ: x² ≥ 0` — **đúng** (mọi số thực bình phương không âm).
- `∃x ∈ ℝ: x² = 4` — **đúng** (x = 2 hoặc −2).
- `∀x ∈ ℝ: x² > 0` — **sai** (phản ví dụ x = 0 cho 0).
- `∃x ∈ ℝ: x² = −1` — **sai** (không số thực nào bình phương ra âm).

### Phủ định lượng từ

```
¬(∀x: P(x)) = ∃x: ¬P(x)
¬(∃x: P(x)) = ∀x: ¬P(x)
```

💡 **Mẹo**: đổi ∀ ↔ ∃, và phủ định P.

**Ví dụ**: Phủ định "mọi hoa đều đẹp" = "tồn tại 1 hoa không đẹp".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phủ định mệnh đề có nhiều lượng từ thế nào?"* Đảo từng cái từ ngoài vào trong và phủ định lõi. Vd `¬(∀x ∃y: P(x,y)) = ∃x ∀y: ¬P(x,y)`. Mỗi ∀ thành ∃, mỗi ∃ thành ∀.
- *"Để bác bỏ '∀x: P(x)' tôi cần làm gì?"* Chỉ cần **1 phản ví dụ** (1 x làm P(x) sai). Vd bác bỏ "mọi số nguyên tố là lẻ" bằng p = 2.

⚠ **Lỗi thường gặp — phủ định lượng từ sai (không đổi ∀↔∃)**. Phủ định "mọi sinh viên đều đậu" KHÔNG phải "mọi sinh viên đều rớt", mà là "**tồn tại** 1 sinh viên rớt". Phản ví dụ minh hoạ: lớp 10 người, 9 đậu 1 rớt → "mọi người đậu" sai, "mọi người rớt" cũng sai, chỉ "tồn tại người rớt" mới đúng là phủ định.

🔁 **Dừng lại tự kiểm tra**

1. Phủ định "Mọi số chẵn đều chia hết cho 4".
2. Phủ định "Tồn tại học sinh đạt điểm 10".

<details><summary>Đáp án</summary>

1. "Tồn tại 1 số chẵn không chia hết cho 4" (vd 6 — đúng là phản ví dụ).
2. "Mọi học sinh đều không đạt điểm 10".

</details>

### 📝 Tóm tắt mục 2

- ∀ = "với mọi" (1 phản ví dụ là sập); ∃ = "tồn tại" (1 trường hợp đủ).
- Phủ định: đổi `∀↔∃` và phủ định lõi P.
- Bác bỏ `∀x:P(x)` chỉ cần 1 phản ví dụ.

---

## 3. Tập hợp

💡 **Trực giác / Hình dung**: tập hợp là 1 "cái túi" chứa các phần tử phân biệt, không quan tâm thứ tự, không lặp. Các phép toán tập hợp tương ứng phép logic: **giao (∩)** = "và" (∧), **hợp (∪)** = "hoặc" (∨), **phần bù** = "không" (¬). Vẽ biểu đồ Venn (vòng tròn chồng nhau) để "thấy" được.

### Định nghĩa & ký hiệu

- **a ∈ A**: a là phần tử của A.
- **A ⊂ B**: A là tập con của B.
- **∅**: tập rỗng.

### Phép toán

| Ký hiệu | Tên | Định nghĩa |
|---------|-----|------------|
| A ∪ B | Hợp | {x : x ∈ A ∨ x ∈ B} |
| A ∩ B | Giao | {x : x ∈ A ∧ x ∈ B} |
| A \\ B | Hiệu | {x : x ∈ A ∧ x ∉ B} |
| A^c | Phần bù | U \\ A (U = tập vũ trụ) |
| A × B | Tích Descartes | {(a, b) : a∈A, b∈B} |

### Quan hệ De Morgan cho tập

```
(A ∪ B)^c = A^c ∩ B^c
(A ∩ B)^c = A^c ∪ B^c
```

⟶ **Tương đồng với logic**: ∪ ↔ ∨, ∩ ↔ ∧, c ↔ ¬.

**4 ví dụ số đa dạng** (A = {1,2,3}, B = {2,3,4}):
- `A ∪ B = {1,2,3,4}` (hợp = gộp, không lặp).
- `A ∩ B = {2,3}` (giao = chung).
- `A \ B = {1}` (hiệu = ở A nhưng không ở B).
- `|A × B| = 3·3 = 9` (tích Descartes có 9 cặp).

❓ **Câu hỏi tự nhiên của người đọc**

- *"`A ⊂ B` và `A ∈ B` khác nhau thế nào?"* `⊂` là "tập con" (mọi phần tử của A đều ở B); `∈` là "phần tử". Vd với `B = {1, {1,2}}`: `{1,2} ∈ B` (là 1 phần tử), nhưng `{1,2} ⊂ B` thì sai (2 không ∈ B).
- *"Tập n phần tử có bao nhiêu tập con?"* `2^n` (mỗi phần tử "có hoặc không" trong tập con) — liên hệ L04. Vd {1,2,3} có 2³ = 8 tập con.

⚠ **Lỗi thường gặp — lẫn `∈` (phần tử) và `⊂` (tập con)**. Phản ví dụ: với A = {1,2,3}, viết `1 ⊂ A` là SAI (1 không phải tập), phải `1 ∈ A` hoặc `{1} ⊂ A`. Phần tử dùng ∈, tập con dùng ⊂.

🔁 **Dừng lại tự kiểm tra**

1. Cho A = {1,2,3,4}, B = {3,4,5}. Tính A ∩ B, A ∪ B, A \ B.
2. `∅` có bao nhiêu tập con?

<details><summary>Đáp án</summary>

1. `A ∩ B = {3,4}`; `A ∪ B = {1,2,3,4,5}`; `A \ B = {1,2}`.
2. `2^0 = 1` (chỉ có chính nó — tập rỗng là tập con của mọi tập).

</details>

### 📝 Tóm tắt mục 3

- Tập = túi phần tử phân biệt, không thứ tự; ∪/∩/bù tương ứng ∨/∧/¬.
- De Morgan cho tập: `(A∪B)^c = A^c ∩ B^c`.
- `∈` (phần tử) ≠ `⊂` (tập con); tập n phần tử có `2^n` tập con.

---

## 4. Ánh xạ (Functions)

### Định nghĩa

Ánh xạ **f: A → B** = quy tắc gán mỗi phần tử a ∈ A với **đúng 1** phần tử b ∈ B. Viết b = f(a).

- **Tập nguồn** (domain): A.
- **Tập đích** (codomain): B.
- **Ảnh** (image): f(A) = {f(a) : a ∈ A} ⊂ B.

### 3 loại ánh xạ đặc biệt

| Loại | Định nghĩa | Hình ảnh |
|------|------------|----------|
| **Đơn ánh** (injective, 1-1) | f(a₁)=f(a₂) ⟹ a₁=a₂ | Mỗi b ∈ Ảnh ứng với ≤1 a |
| **Toàn ánh** (surjective, onto) | ∀b ∈ B, ∃a: f(a)=b | Ảnh = B |
| **Song ánh** (bijective, 1-1 onto) | Cả đơn ánh và toàn ánh | Mỗi b ∈ B ứng với đúng 1 a |

> 📐 **Định nghĩa đầy đủ — Đơn ánh / Toàn ánh / Song ánh**
>
> **(a) Là gì**: 3 mức độ "tốt" của ánh xạ f: A → B. **Đơn ánh** = không có 2 đầu vào ra cùng đầu ra (mỗi a có ảnh riêng). **Toàn ánh** = mọi b ∈ B đều có ít nhất 1 a "tạo ra" nó (ảnh = B). **Song ánh** = vừa đơn ánh vừa toàn ánh = tương ứng 1-1 hoàn hảo.
>
> **(b) Vì sao cần**: Song ánh là điều kiện CẦN và ĐỦ để f có **hàm ngược** f⁻¹. Trong mã hoá, nén dữ liệu: phải song ánh (mã hoá ngược được). Trong toán: dùng để định nghĩa "đếm được" (tập đếm được = có song ánh với ℕ → ℕ, ℤ, ℚ đếm được; ℝ KHÔNG đếm được — chứng minh Cantor). Trong AI: muốn invert layer của neural network → cần song ánh (lưu lượng thông tin).
>
> **(c) Ví dụ số**: f: ℕ → ℕ, f(n) = 2n. Đơn ánh ✓ (n₁≠n₂ → 2n₁≠2n₂). Toàn ánh ✗ (số lẻ không có nguồn). f: ℝ → ℝ, f(x) = x². Đơn ánh ✗ (f(2)=f(-2)=4). Toàn ánh ✗ (số âm không có nguồn). f: ℝ → ℝ, f(x) = x³. Đơn ✓ (tăng nghiêm ngặt), Toàn ✓ → **song ánh**. Ngược f⁻¹(y) = ∛y. f: ℝ → ℝ, f(x) = 2x+1: song ánh (mọi đường thẳng a≠0), f⁻¹(y) = (y−1)/2.

💡 **Trực giác**:
- Đơn ánh = "không có 2 đầu vào ra cùng đầu ra".
- Toàn ánh = "mọi đầu ra trong B đều có 1 nguồn".
- Song ánh = "tương ứng 1-1 hoàn hảo".

### Ví dụ

- f: ℝ → ℝ, f(x) = x² → **không** đơn ánh (f(2) = f(-2)), **không** toàn ánh (không có x: f(x) = -1).
- f: ℝ → [0,∞), f(x) = x² → **không** đơn ánh, **toàn** ánh.
- f: [0,∞) → [0,∞), f(x) = x² → **song** ánh.
- f: ℝ → ℝ, f(x) = e^x → đơn ánh nhưng không toàn ánh.
- f: ℝ → ℝ, f(x) = 2x + 3 → **song ánh** (mọi hàm bậc 1 với a ≠ 0).

### Hàm hợp & hàm ngược

- **Hàm hợp** (g ∘ f)(x) = g(f(x)).
- **Hàm ngược**: chỉ tồn tại khi f là **song ánh**. f⁻¹(b) = a ⟺ f(a) = b.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cùng công thức `f(x) = x²` sao khi đơn ánh khi không?"* Phụ thuộc **tập nguồn**. Trên ℝ: không đơn ánh (f(2)=f(−2)). Trên [0,∞): đơn ánh (chỉ phần x ≥ 0). Định nghĩa ánh xạ gồm cả công thức LẪN tập nguồn/đích.
- *"Tính toàn ánh phụ thuộc gì?"* Phụ thuộc **tập đích B**. `f(x)=x²` lên ℝ không toàn ánh (số âm thiếu nguồn); lên [0,∞) thì toàn ánh (ảnh phủ kín đích).

⚠ **Lỗi thường gặp — kết luận song ánh chỉ nhìn công thức, bỏ qua tập nguồn/đích**. Phản ví dụ: `f(x) = x²` "có vẻ" 1-1 nhưng trên ℝ thì KHÔNG đơn ánh (f(3)=f(−3)=9) và KHÔNG toàn ánh (f(x)=−4 vô nghiệm). Phải xét rõ A và B mới kết luận được.

🔁 **Dừng lại tự kiểm tra**

1. `f: ℝ → ℝ, f(x) = x + 5`. Song ánh không? Hàm ngược?
2. `f: ℕ → ℕ, f(n) = n + 1`. Đơn ánh? Toàn ánh?

<details><summary>Đáp án</summary>

1. **Song ánh** (hàm bậc 1, hệ số ≠ 0). `f⁻¹(y) = y − 5`.
2. Đơn ánh ✓ (n₁≠n₂ → n₁+1≠n₂+1). Toàn ánh ✗ (số 0 không có nguồn: không n∈ℕ nào cho f(n)=0).

</details>

### 📝 Tóm tắt mục 4

- Ánh xạ gồm công thức + tập nguồn A + tập đích B.
- Đơn ánh (1-1), toàn ánh (ảnh = B), song ánh (cả hai).
- Hàm ngược tồn tại ⟺ song ánh. Đơn/toàn phụ thuộc A và B, không chỉ công thức.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Lập bảng chân trị cho p ∧ (¬q ∨ p).

**Bài 2**: Phủ định "Mọi sinh viên đều có máy tính".

**Bài 3**: Cho A = {1, 2, 3}, B = {3, 4}. Tính A ∪ B, A ∩ B, A \\ B, A × B.

**Bài 4**: f: ℝ → ℝ, f(x) = x³. Có đơn ánh không? Toàn ánh? Song ánh?

**Bài 5**: f: ℕ → ℕ, f(n) = 2n. Đơn ánh? Toàn ánh?

### Lời giải

**Bài 1**: 

| p | q | ¬q | ¬q∨p | p∧(¬q∨p) |
|---|---|----|------|----------|
| T | T | F  | T    | T        |
| T | F | T  | T    | T        |
| F | T | F  | F    | F        |
| F | F | T  | T    | F        |

⟶ = p (đơn giản hơn).

**Bài 2**: "Tồn tại 1 sinh viên không có máy tính".

**Bài 3**: A ∪ B = {1,2,3,4}. A ∩ B = {3}. A \\ B = {1, 2}. A × B = {(1,3),(1,4),(2,3),(2,4),(3,3),(3,4)} — 6 cặp.

**Bài 4**: f(x) = x³ tăng nghiêm ngặt → đơn ánh ✓. f(ℝ) = ℝ → toàn ánh ✓. → **Song ánh**. Hàm ngược: f⁻¹(y) = ∛y.

**Bài 5**: Đơn ánh ✓ (n₁ ≠ n₂ → 2n₁ ≠ 2n₂). Toàn ánh ✗ (số lẻ không có nghịch ảnh).

---

## 6. Bài tiếp theo

[Lesson 08 — Phương pháp chứng minh](../lesson-08-proof-methods/).

## 📝 Tổng kết

1. **Logic**: ¬, ∧, ∨, →, ↔. De Morgan: ¬(p∧q) = ¬p∨¬q.
2. **Lượng từ**: ¬∀ = ∃¬, ¬∃ = ∀¬.
3. **Tập hợp**: ∪, ∩, \\, c, ×. Tương đồng với logic.
4. **Ánh xạ**: đơn ánh (1-1), toàn ánh (onto), song ánh (1-1 onto).
5. Hàm ngược **chỉ tồn tại** khi f là song ánh.
