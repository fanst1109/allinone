// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-07-logic-sets-maps/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Logic, tập hợp, ánh xạ

## Mục tiêu

- Hiểu **logic mệnh đề**: ∧, ∨, ¬, →, ↔.
- **Lượng từ**: ∀ (forall), ∃ (exists). Phủ định.
- **Tập hợp**: phép toán hợp, giao, hiệu, phần bù, tích Descartes.
- **Ánh xạ**: đơn ánh (injective), toàn ánh (surjective), song ánh (bijective).

## Kiến thức tiền đề

- Toán cơ bản.

---

## 1. Logic mệnh đề

**Mệnh đề** = phát biểu **đúng** hoặc **sai** (không cả 2).

**Ví dụ**: "2+2 = 4" (đúng). "Hà Nội > Sài Gòn" (sai về diện tích?).

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

\`\`\`
¬(p ∧ q) = ¬p ∨ ¬q
¬(p ∨ q) = ¬p ∧ ¬q
\`\`\`

---

## 2. Lượng từ

- **∀x** = "với mọi x" (forall).
- **∃x** = "tồn tại x" (exists).

**Ví dụ**:
- ∀x ∈ ℝ: x² ≥ 0 — "Mọi x thực, x² ≥ 0". Đúng.
- ∃x ∈ ℝ: x² = 4 — "Tồn tại x: x² = 4". Đúng (x = 2 hoặc -2).

### Phủ định lượng từ

\`\`\`
¬(∀x: P(x)) = ∃x: ¬P(x)
¬(∃x: P(x)) = ∀x: ¬P(x)
\`\`\`

💡 **Mẹo**: đổi ∀ ↔ ∃, và phủ định P.

**Ví dụ**: Phủ định "mọi hoa đều đẹp" = "tồn tại 1 hoa không đẹp".

---

## 3. Tập hợp

### Định nghĩa & ký hiệu

- **a ∈ A**: a là phần tử của A.
- **A ⊂ B**: A là tập con của B.
- **∅**: tập rỗng.

### Phép toán

| Ký hiệu | Tên | Định nghĩa |
|---------|-----|------------|
| A ∪ B | Hợp | {x : x ∈ A ∨ x ∈ B} |
| A ∩ B | Giao | {x : x ∈ A ∧ x ∈ B} |
| A \\\\ B | Hiệu | {x : x ∈ A ∧ x ∉ B} |
| A^c | Phần bù | U \\\\ A (U = tập vũ trụ) |
| A × B | Tích Descartes | {(a, b) : a∈A, b∈B} |

### Quan hệ De Morgan cho tập

\`\`\`
(A ∪ B)^c = A^c ∩ B^c
(A ∩ B)^c = A^c ∪ B^c
\`\`\`

⟶ **Tương đồng với logic**: ∪ ↔ ∨, ∩ ↔ ∧, c ↔ ¬.

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

---

## 5. Bài tập

### Bài tập

**Bài 1**: Lập bảng chân trị cho p ∧ (¬q ∨ p).

**Bài 2**: Phủ định "Mọi sinh viên đều có máy tính".

**Bài 3**: Cho A = {1, 2, 3}, B = {3, 4}. Tính A ∪ B, A ∩ B, A \\\\ B, A × B.

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

**Bài 3**: A ∪ B = {1,2,3,4}. A ∩ B = {3}. A \\\\ B = {1, 2}. A × B = {(1,3),(1,4),(2,3),(2,4),(3,3),(3,4)} — 6 cặp.

**Bài 4**: f(x) = x³ tăng nghiêm ngặt → đơn ánh ✓. f(ℝ) = ℝ → toàn ánh ✓. → **Song ánh**. Hàm ngược: f⁻¹(y) = ∛y.

**Bài 5**: Đơn ánh ✓ (n₁ ≠ n₂ → 2n₁ ≠ 2n₂). Toàn ánh ✗ (số lẻ không có nghịch ảnh).

---

## 6. Bài tiếp theo

[Lesson 08 — Phương pháp chứng minh](../lesson-08-proof-methods/).

## 📝 Tổng kết

1. **Logic**: ¬, ∧, ∨, →, ↔. De Morgan: ¬(p∧q) = ¬p∨¬q.
2. **Lượng từ**: ¬∀ = ∃¬, ¬∃ = ∀¬.
3. **Tập hợp**: ∪, ∩, \\\\, c, ×. Tương đồng với logic.
4. **Ánh xạ**: đơn ánh (1-1), toàn ánh (onto), song ánh (1-1 onto).
5. Hàm ngược **chỉ tồn tại** khi f là song ánh.
`;
