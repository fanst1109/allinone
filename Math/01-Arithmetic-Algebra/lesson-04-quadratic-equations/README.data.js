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

### 1.6. Trực giác đồ thị — vì sao Δ quyết định số nghiệm

💡 **Hình dung**: \`y = ax² + bx + c\` là một **parabol**. "Nghiệm" của \`ax²+bx+c = 0\` chính là chỗ parabol **cắt trục hoành** (y=0). Khi đó Δ cho biết:
- **Δ > 0**: parabol cắt trục x ở **2 điểm** → 2 nghiệm.
- **Δ = 0**: parabol **chạm** trục x ở đúng đỉnh → 1 nghiệm kép.
- **Δ < 0**: parabol **không chạm** trục x (lơ lửng trên hoặc dưới) → vô nghiệm thực.

Đỉnh parabol ở \`x = −b/(2a)\` — sẽ dùng lại ở [Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

⚠ **Lỗi thường gặp**

- Quên điều kiện \`a ≠ 0\`. Nếu \`a = 0\` thì không còn là PT bậc 2 mà là bậc 1, công thức \`−b/(2a)\` chia cho 0 → vô nghĩa.
- Tính \`Δ\` khi \`b\` âm: \`b²\` luôn **dương**. Vd \`x²−5x+6\`: \`Δ = (−5)² − 4·1·6 = 25−24 = 1\`, không phải \`−25−24\`.
- Quên dấu \`−b\` ở tử: nghiệm là \`(−b ± √Δ)/(2a)\`, với \`b=−5\` thì \`−b = +5\`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có dấu \`±\`?"* Vì bước \`(x + b/2a)² = Δ/4a²\` khi lấy căn cho **2 khả năng**: \`x + b/2a = +√Δ/2a\` hoặc \`= −√Δ/2a\`. Một bình phương có 2 căn (dương và âm).
- *"Δ < 0 là vô nghiệm hẳn, hay có nghiệm 'ẩn'?"* Vô nghiệm trong ℝ, nhưng **có 2 nghiệm phức** (Tier 03 — Số phức). \`√(số âm)\` tồn tại trong số phức.

🔁 **Dừng lại tự kiểm tra**: giải \`x² − 6x + 8 = 0\` bằng công thức.

<details><summary>Đáp án</summary>

\`Δ = 36 − 32 = 4\`, \`√Δ = 2\`. \`x = (6 ± 2)/2\` → \`x = 4\` hoặc \`x = 2\`. (Viete: tổng 6, tích 8 ✓.)

</details>

### 📝 Tóm tắt mục 1

- PT bậc 2: \`ax²+bx+c=0\` (\`a≠0\`); nghiệm = chỗ parabol cắt trục x.
- \`Δ = b²−4ac\` quyết định: \`>0\` (2 nghiệm), \`=0\` (1 kép), \`<0\` (vô nghiệm ℝ).
- Công thức \`x = (−b ± √Δ)/(2a)\`, suy ra từ bình phương đầy đủ.

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

### 2.3. Chứng minh định lý Viete (từng bước)

Cho PT có 2 nghiệm \`x₁, x₂\` theo công thức nghiệm:
\`\`\`
x₁ = (−b + √Δ)/(2a),   x₂ = (−b − √Δ)/(2a)
\`\`\`

**Tổng** — cộng 2 nghiệm, phần \`√Δ\` triệt tiêu:
\`\`\`
x₁ + x₂ = [(−b + √Δ) + (−b − √Δ)] / (2a) = (−2b)/(2a) = −b/a   ✓
\`\`\`

**Tích** — nhân 2 nghiệm, dùng hằng đẳng thức \`(m+n)(m−n) = m²−n²\` với \`m=−b, n=√Δ\`:
\`\`\`
x₁ · x₂ = [(−b)² − (√Δ)²] / (2a)² = (b² − Δ) / (4a²)
\`\`\`
Thay \`Δ = b² − 4ac\`:
\`\`\`
= (b² − (b² − 4ac)) / (4a²) = 4ac / (4a²) = c/a   ✓
\`\`\`

Không bước nào "dễ thấy" — mọi phép biến đổi đều hiện rõ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Viete dùng khi nào thay cho công thức nghiệm?"* Khi nghiệm "đẹp" (nguyên/nhẩm được). \`x²−5x+6=0\`: nhẩm 2 số tổng 5, tích 6 → 2 và 3, nhanh hơn tính Δ.
- *"Viete có đúng khi Δ < 0 không?"* Có — đúng cả với 2 nghiệm phức (tổng và tích vẫn là số thực \`−b/a\`, \`c/a\`).

🔁 **Dừng lại tự kiểm tra**: dùng Viete nhẩm nghiệm \`x² − 7x + 10 = 0\`.

<details><summary>Đáp án</summary>

Cần 2 số tổng 7, tích 10 → **2 và 5**. (Kiểm: \`2+5=7\`, \`2·5=10\` ✓.)

</details>

### 📝 Tóm tắt mục 2

- Viete: \`x₁+x₂ = −b/a\`, \`x₁·x₂ = c/a\` — suy trực tiếp từ công thức nghiệm.
- Dùng để nhẩm nghiệm đẹp và lập PT từ 2 nghiệm cho trước.

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
