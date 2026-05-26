// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-04-trig-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Phương trình lượng giác

## Mục tiêu

- Giải **PT cơ bản**: sin x = a, cos x = a, tan x = a.
- Áp dụng được nghiệm tổng quát (vô số nghiệm).
- Giải PT bậc 2 theo sin x / cos x.
- Đưa **a·sin x + b·cos x = c** về PT cơ bản.

## Kiến thức tiền đề

- [Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/).

---

## 1. Phương trình cơ bản sin x = a

💡 **Đặc thù của PT lượng giác**: Vì sin/cos tuần hoàn, một PT có **vô số nghiệm** — phải viết ở dạng tổng quát.

\`\`\`
sin x = a   (|a| ≤ 1)
\`\`\`

**Nghiệm tổng quát**: Nếu sin α = a thì:
\`\`\`
x = α + k·2π   hoặc   x = π - α + k·2π   (k ∈ ℤ)
\`\`\`

💡 **Vì sao 2 họ nghiệm?** Trên đường tròn đơn vị, có 2 điểm có cùng tung độ a: 1 ở phần tư I/II và 1 ở phần tư III/IV (đối xứng qua trục Oy → góc π - α).

**Ví dụ số**: sin x = 1/2.
- α = π/6 (vì sin π/6 = 1/2).
- x = π/6 + k·2π, hoặc x = π - π/6 + k·2π = 5π/6 + k·2π.

⚠ **Điều kiện**: |a| > 1 → **vô nghiệm**.

> 📐 **Định nghĩa đầy đủ — Nghiệm tổng quát PT sin x = a**
>
> **(a) Là gì**: 1 PT lượng giác có **vô số nghiệm** do tính tuần hoàn. Nghiệm "tổng quát" = toàn bộ tập nghiệm, viết bằng 1 (hoặc 2) công thức kèm số nguyên k ∈ ℤ chạy tự do. Hai họ vì có 2 điểm trên đường tròn cùng tung độ (đối xứng qua trục Oy).
>
> **(b) Vì sao cần**: PT đại số x² = 4 có hữu hạn nghiệm. PT lượng giác KHÔNG — sin tuần hoàn nên nghiệm xuất hiện vô hạn lần. Phải có ký hiệu nén tất cả: "x = α + k·2π, k ∈ ℤ". Trong vật lý: thời điểm dao động đạt giá trị x cụ thể xảy ra lặp đi lặp lại — cần biết tất cả các thời điểm, không chỉ 1.
>
> **(c) Ví dụ số**: sin x = 1/2 → α = π/6. Nghiệm: π/6, 5π/6, π/6+2π, 5π/6+2π, π/6−2π, ... Vô hạn. sin x = √2/2 → α = π/4 → x = π/4 + k·2π hoặc 3π/4 + k·2π. sin x = 1 → α = π/2, 2 họ trùng nhau (vì sin x đạt max chỉ tại 1 điểm/chu kỳ) → x = π/2 + k·2π. sin x = 2 → |a|>1 → **vô nghiệm**.

---

## 2. Phương trình cơ bản cos x = a

\`\`\`
cos x = a   (|a| ≤ 1)
\`\`\`

**Nghiệm tổng quát**: Nếu cos α = a thì:
\`\`\`
x = ±α + k·2π   (k ∈ ℤ)
\`\`\`

**Ví dụ**: cos x = -√2/2.
- α = 3π/4 (cos 3π/4 = -√2/2).
- x = ±3π/4 + k·2π.

---

## 3. Phương trình cơ bản tan x = a

\`\`\`
tan x = a   (mọi a ∈ ℝ)
\`\`\`

**Nghiệm**:
\`\`\`
x = α + k·π   (k ∈ ℤ)
\`\`\`
(chỉ 1 họ, chu kỳ π).

**Ví dụ**: tan x = 1 → x = π/4 + k·π.

---

## 4. Các trường hợp đặc biệt

| PT | Nghiệm |
|----|--------|
| sin x = 0 | x = kπ |
| sin x = 1 | x = π/2 + k·2π |
| sin x = -1 | x = -π/2 + k·2π |
| cos x = 0 | x = π/2 + kπ |
| cos x = 1 | x = k·2π |
| cos x = -1 | x = π + k·2π |
| tan x = 0 | x = kπ |
| tan x = 1 | x = π/4 + kπ |

---

## 5. PT bậc 2 theo sin / cos

**Ví dụ**: 2·sin²x - sin x - 1 = 0.

Đặt t = sin x (-1 ≤ t ≤ 1):
- 2t² - t - 1 = 0
- t = 1 hoặc t = -1/2.

⟶ Giải tiếp:
- sin x = 1 → x = π/2 + k·2π.
- sin x = -1/2 → x = -π/6 + k·2π hoặc x = π + π/6 + k·2π = 7π/6 + k·2π.

---

## 6. PT a·sin x + b·cos x = c

**Cách giải**: dùng công thức tổng hợp ở L03.

\`\`\`
a·sin x + b·cos x = R·sin(x + φ) = c
\`\`\`
trong đó R = √(a²+b²), tan φ = b/a.

⟶ Đưa về sin(x + φ) = c/R.

**Điều kiện có nghiệm**: |c/R| ≤ 1 → **c² ≤ a² + b²**.

**Ví dụ**: √3·sin x + cos x = 1.
- R = √(3+1) = 2, tan φ = 1/√3 → φ = π/6.
- 2·sin(x + π/6) = 1 → sin(x + π/6) = 1/2.
- x + π/6 = π/6 + k·2π → x = k·2π.
- x + π/6 = π - π/6 + k·2π = 5π/6 + k·2π → x = 4π/6 + k·2π = 2π/3 + k·2π.

---

## 7. PT bằng phương pháp biến tổng thành tích

**Ví dụ**: sin x + sin 3x = 0.

Biến tổng thành tích: sin x + sin 3x = 2·sin(2x)·cos(x).

⟶ 2·sin 2x·cos x = 0 → sin 2x = 0 hoặc cos x = 0.
- sin 2x = 0 → 2x = kπ → x = kπ/2.
- cos x = 0 → x = π/2 + kπ.

Kết hợp: x = kπ/2 (đã bao gồm cả).

---

## 8. Bài tập

### Bài tập

**Bài 1**: Giải sin x = √2/2.

**Bài 2**: Giải 2·cos²x + cos x - 1 = 0.

**Bài 3**: Giải sin x + √3·cos x = 1.

**Bài 4**: Giải tan x = -1.

**Bài 5**: Giải sin 2x = sin x.

### Lời giải

**Bài 1**: sin x = √2/2 = sin(π/4). x = π/4 + k·2π hoặc x = π - π/4 + k·2π = 3π/4 + k·2π.

**Bài 2**: Đặt t = cos x. 2t² + t - 1 = 0 → t = 1/2 hoặc t = -1.  
- cos x = 1/2 → x = ±π/3 + k·2π.  
- cos x = -1 → x = π + k·2π.

**Bài 3**: R = 2, φ = π/3. 2·sin(x + π/3) = 1 → sin(x + π/3) = 1/2.  
- x + π/3 = π/6 + k·2π → x = -π/6 + k·2π.  
- x + π/3 = 5π/6 + k·2π → x = π/2 + k·2π.

**Bài 4**: tan x = -1 = tan(-π/4). x = -π/4 + kπ.

**Bài 5**: sin 2x - sin x = 0 → 2·cos(3x/2)·sin(x/2) = 0.  
- cos(3x/2) = 0 → 3x/2 = π/2 + kπ → x = π/3 + 2kπ/3.  
- sin(x/2) = 0 → x = 2kπ.

---

## 9. Bài tiếp theo

[Lesson 05 — Số phức](../lesson-05-complex-numbers/) — i, dạng đại số, ý nghĩa.

## 📝 Tổng kết

1. **sin x = a**: x = α + k·2π hoặc π-α + k·2π.
2. **cos x = a**: x = ±α + k·2π.
3. **tan x = a**: x = α + kπ.
4. **Bậc 2 theo sin/cos**: đặt ẩn phụ.
5. **a·sin x + b·cos x = c**: dùng R·sin(x+φ). Có nghiệm khi c² ≤ a²+b².
`;
