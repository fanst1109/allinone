// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Lũy thừa, căn, logarit

## Mục tiêu

- Hiểu **lũy thừa** aⁿ và mở rộng cho mũ âm, mũ hữu tỉ, mũ thực.
- Hiểu **căn bậc n** là gì và liên hệ với lũy thừa: ⁿ√a = a^(1/n).
- Hiểu **logarit** — phép ngược của lũy thừa: log_b(x) = "b mũ mấy bằng x".
- Áp dụng 5 quy luật log cơ bản.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Lũy thừa (Power)

### 1.1. Định nghĩa

**Lũy thừa aⁿ với n nguyên dương** = nhân a với chính nó n lần:
\`\`\`
aⁿ = a · a · a · ... · a  (n lần)
\`\`\`

💡 **Là gì**: viết gọn phép nhân lặp lại.

**Mở rộng**:
- **a⁰ = 1** (mọi a ≠ 0). Tại sao? Vì a^n / a^n = 1 = a^(n−n) = a⁰.
- **a⁻ⁿ = 1/aⁿ**. Tại sao? Vì cần a^n · a^(−n) = a^0 = 1 → a^(−n) = 1/a^n.
- **a^(1/n) = ⁿ√a** (căn bậc n).
- **a^(p/q) = (a^p)^(1/q) = ᶴ√(a^p)**.

### 1.2. 6 quy luật lũy thừa

\`\`\`
1. aᵐ · aⁿ = aᵐ⁺ⁿ
2. aᵐ / aⁿ = aᵐ⁻ⁿ
3. (aᵐ)ⁿ = aᵐⁿ
4. (ab)ⁿ = aⁿ · bⁿ
5. (a/b)ⁿ = aⁿ / bⁿ
6. a⁰ = 1
\`\`\`

### 1.3. Ví dụ

- \`2³ = 8\`
- \`2⁻² = 1/4\`
- \`8^(1/3) = 2\` (căn bậc 3 của 8)
- \`(2³)⁴ = 2¹² = 4096\`

---

## 2. Căn bậc n

### 2.1. Định nghĩa

**ⁿ√a** = số b sao cho \`bⁿ = a\`.

- √a = a^(1/2) (căn bậc 2 — viết tắt).
- ∛a = a^(1/3).

### 2.2. Tính chất

- ⁿ√(ab) = ⁿ√a · ⁿ√b.
- ⁿ√(a/b) = ⁿ√a / ⁿ√b.

**Lưu ý**: √(a²) = |a| (không phải a). Vd √((-3)²) = √9 = 3 = |-3|.

---

## 3. Logarit

### 3.1. Định nghĩa

**log_b(x)** = "b mũ mấy bằng x":
\`\`\`
log_b(x) = y   ⟺   bʸ = x
\`\`\`

💡 **Là gì**: phép ngược của lũy thừa. Nếu mũ "tăng nhanh" → log "tăng chậm" (biến nhân thành cộng).

**Vì sao quan trọng?** Vì:
- Biểu diễn số rất lớn/nhỏ (10⁸⁰ vs log = 80).
- Biến nhân → cộng (đặc biệt hữu ích trước máy tính, vẫn quan trọng).
- Tăng trưởng/giảm theo cấp số nhân (dân số, lãi kép, phóng xạ).
- Trong ML: loss function, entropy đều dùng log.

### 3.2. Cơ số phổ biến

- **log₁₀(x)** = "log thập phân", viết gọn **log(x)**.
- **logₑ(x)** = "log tự nhiên", viết gọn **ln(x)**. e ≈ 2.718.
- **log₂(x)** = log nhị phân, dùng nhiều trong CS.

### 3.3. 5 quy luật log

\`\`\`
1. log_b(xy) = log_b(x) + log_b(y)        (nhân → cộng)
2. log_b(x/y) = log_b(x) − log_b(y)       (chia → trừ)
3. log_b(x^n) = n · log_b(x)              (mũ → nhân)
4. log_b(1) = 0    (vì b⁰ = 1)
5. log_b(b) = 1    (vì b¹ = b)
\`\`\`

**Đổi cơ số**: log_b(x) = ln(x) / ln(b).

### 3.4. Ví dụ

- log₂(8) = 3 (vì 2³ = 8).
- log₁₀(100) = 2.
- ln(e) = 1.
- log₂(1024) = 10 (vì 2¹⁰ = 1024).
- log(2 × 50) = log(2) + log(50) ≈ 0.301 + 1.699 = 2 ✓.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Rút gọn: a) \`2³ · 2⁵\`, b) \`(3²)⁴\`, c) \`4^(1/2)\`.

**Bài 2**: Tính: a) \`log₂(32)\`, b) \`log₁₀(1/1000)\`, c) \`log(2) + log(5)\`.

**Bài 3**: Giải \`2ˣ = 64\`.

**Bài 4**: Giải \`log₃(x) = 4\`.

**Bài 5**: Số tế bào vi khuẩn nhân đôi mỗi giờ. Ban đầu 100 con. Tính số con sau 10 giờ, và sau bao nhiêu giờ thì có 1 triệu con?

### Lời giải

**Bài 1**: 
- 2³·2⁵ = 2⁸ = **256**.
- (3²)⁴ = 3⁸ = **6561**.
- 4^(1/2) = √4 = **2**.

**Bài 2**:
- log₂(32) = 5 (vì 32 = 2⁵).
- log₁₀(1/1000) = log₁₀(10⁻³) = **−3**.
- log(2) + log(5) = log(10) = **1**.

**Bài 3**: 64 = 2⁶ → x = **6**. Hoặc x = log₂(64) = 6.

**Bài 4**: x = 3⁴ = **81**.

**Bài 5**: 
- N(t) = 100 · 2ᵗ.
- N(10) = 100 · 1024 = **102,400 con**.
- 100 · 2ᵗ = 10⁶ → 2ᵗ = 10⁴ → t = log₂(10⁴) = 4 · log₂(10) ≈ 4 · 3.32 = **13.3 giờ**.

---

## 5. Bài tiếp theo

[Lesson 07 — Hàm số](../lesson-07-functions-intro/).

## 📝 Tổng kết

1. **Lũy thừa aⁿ**: mở rộng cho mọi mũ thực. 6 quy luật cơ bản.
2. **Căn ⁿ√a = a^(1/n)**.
3. **Log_b(x)**: phép ngược của lũy thừa. log(xy) = log x + log y, log(x^n) = n log x.
4. **Ứng dụng**: tăng trưởng, lãi kép, phóng xạ, entropy, loss function ML.
`;
