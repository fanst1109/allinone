// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-04-quadratic-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Phương trình bậc 2

## Mục tiêu học tập

- Giải **phương trình bậc 2** \`ax² + bx + c = 0\` bằng công thức nghiệm.
- Hiểu **biệt thức Δ** và 3 trường hợp nghiệm.
- Áp dụng **định lý Viete** để tìm nghiệm nhanh.
- Giải phương trình bậc 2 bằng phương pháp **bình phương đầy đủ** (completing the square).

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/) — hằng đẳng thức (a+b)².
- [Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/).

---

## 1. Phương trình bậc 2

### 1.1. Định nghĩa

**PT bậc 2 một ẩn** có dạng:
\`\`\`
ax² + bx + c = 0   (a ≠ 0)
\`\`\`

💡 **Là gì**: PT có biến x lên đến lũy thừa 2.

**Vì sao quan trọng?** Vì xuất hiện rất nhiều trong thực tế:
- Quỹ đạo vật ném: h(t) = h₀ + v₀t − (1/2)gt² (Lesson 01 Physics).
- Tối ưu: tìm max/min của parabol.
- Hình học: định lý Pythagoras → căn bậc 2.

### 1.2. Công thức nghiệm

**Biệt thức** (discriminant):
\`\`\`
Δ = b² − 4ac
\`\`\`

**Nghiệm**:
\`\`\`
x = (−b ± √Δ) / (2a)
\`\`\`

### 1.3. Ba trường hợp

| Δ | Số nghiệm | Công thức |
|---|-----------|-----------|
| Δ > 0 | 2 nghiệm phân biệt | x = (−b ± √Δ)/(2a) |
| Δ = 0 | 1 nghiệm kép | x = −b/(2a) |
| Δ < 0 | Vô nghiệm thực (có nghiệm phức — sẽ học Lesson Số phức) | — |

### 1.4. Walk-through chứng minh — Bình phương đầy đủ

Bắt đầu từ \`ax² + bx + c = 0\`. Chia 2 vế cho a:
\`\`\`
x² + (b/a)x + c/a = 0
\`\`\`

Thêm và bớt \`(b/2a)²\`:
\`\`\`
x² + (b/a)x + (b/2a)² − (b/2a)² + c/a = 0
(x + b/(2a))² = (b/2a)² − c/a = (b² − 4ac) / (4a²) = Δ/(4a²)
\`\`\`

Lấy căn 2 vế (nếu Δ ≥ 0):
\`\`\`
x + b/(2a) = ±√Δ / (2a)
x = (−b ± √Δ) / (2a)
\`\`\`

### 1.5. Ba ví dụ

**Ví dụ 1**: \`x² − 5x + 6 = 0\`. Δ = 25 − 24 = 1. x = (5 ± 1)/2 = **3 hoặc 2**.

(Kiểm tra: 3·2 = 6 = c/a ✓; 3 + 2 = 5 = −b/a ✓.)

**Ví dụ 2**: \`x² − 4x + 4 = 0\`. Δ = 16 − 16 = 0. x = 4/2 = **2** (nghiệm kép). 

**Ví dụ 3**: \`x² + x + 1 = 0\`. Δ = 1 − 4 = −3 < 0 → **VÔ NGHIỆM** trong ℝ.

---

## 2. Định lý Viete

### 2.1. Phát biểu

Cho PT \`ax² + bx + c = 0\` có 2 nghiệm x₁, x₂:
\`\`\`
x₁ + x₂ = −b/a
x₁ · x₂ = c/a
\`\`\`

💡 **Ý nghĩa**: cho phép suy nghiệm mà không cần tính Δ — nếu **đoán được** 2 số có tổng và tích tương ứng.

### 2.2. Ứng dụng

**Tìm nhanh nghiệm**: \`x² − 5x + 6 = 0\`. Cần 2 số có tổng = 5 và tích = 6 → **2 và 3**.

**Lập PT từ 2 nghiệm**: Cho biết nghiệm là 4 và −3. PT là x² − (4 + (−3))x + 4·(−3) = \`x² − x − 12 = 0\`.

---

## 3. Bài tập

### Bài tập

**Bài 1**: Giải \`x² − 7x + 12 = 0\`.

**Bài 2**: Giải \`2x² + 3x − 5 = 0\`.

**Bài 3**: Giải \`x² − 6x + 9 = 0\`.

**Bài 4**: Giải \`x² + 2x + 5 = 0\`.

**Bài 5**: Cho biết 2 nghiệm của 1 PT bậc 2 (hệ số a = 1) là 5 và −2. Tìm PT đó.

**Bài 6**: Tích 2 số = 18, hiệu = 3. Tìm 2 số. (Gợi ý: dùng Viete.)

### Lời giải

**Bài 1**: Δ = 49 − 48 = 1. x = (7 ± 1)/2 = **4 hoặc 3**. (Viete: tổng 7, tích 12.)

**Bài 2**: Δ = 9 + 40 = 49. x = (−3 ± 7)/4 = **1 hoặc −5/2**.

**Bài 3**: Δ = 36 − 36 = 0. x = 6/2 = **3** (nghiệm kép). Hoặc nhận xét: (x−3)² = 0.

**Bài 4**: Δ = 4 − 20 = −16 < 0 → **VÔ NGHIỆM** trong ℝ.

**Bài 5**: x² − (5 + (−2))x + 5·(−2) = **x² − 3x − 10 = 0**.

**Bài 6**: Gọi 2 số là a, b. Có a·b = 18 và |a − b| = 3. Coi a, b là nghiệm của PT bậc 2. Tổng cộng S = a + b. (a−b)² = (a+b)² − 4ab → 9 = S² − 72 → S² = 81 → S = ±9. Hai trường hợp: PT x² − 9x + 18 = 0 (nghiệm 3, 6) hoặc x² + 9x + 18 = 0 (nghiệm −3, −6). → **(3, 6) hoặc (−3, −6)**.

---

## 4. Bài tiếp theo

[Lesson 05 — Bất phương trình](../lesson-05-inequalities/).

## 📝 Tổng kết

1. **PT bậc 2**: ax² + bx + c = 0.
2. **Δ = b² − 4ac**. Δ>0: 2 nghiệm; Δ=0: 1 nghiệm kép; Δ<0: vô nghiệm ℝ.
3. **Công thức**: x = (−b ± √Δ) / (2a).
4. **Viete**: x₁ + x₂ = −b/a, x₁·x₂ = c/a.
`;
