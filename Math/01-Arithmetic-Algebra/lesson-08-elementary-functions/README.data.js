// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-08-elementary-functions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Hàm sơ cấp

## Mục tiêu

- Khảo sát 4 loại hàm sơ cấp quan trọng:
  - **Hàm bậc 1** y = ax + b (đường thẳng).
  - **Hàm bậc 2** y = ax² + bx + c (parabol).
  - **Hàm mũ** y = aˣ (a > 0, a ≠ 1).
  - **Hàm log** y = log_a(x).
- Hiểu mối liên hệ giữa **mũ và log** (hàm ngược của nhau).

## Kiến thức tiền đề

- [Lesson 04 — PT bậc 2](../lesson-04-quadratic-equations/), [Lesson 06 — Lũy thừa, log](../lesson-06-powers-roots-logs/).

---

## 1. Hàm bậc 1 — Đường thẳng

\`\`\`
y = ax + b
\`\`\`

💡 **Là gì**: đồ thị là đường thẳng. **a = hệ số góc** (slope) đo "dốc", **b = tung độ gốc** (cắt trục y).

- a > 0: đồng biến (tăng).
- a < 0: nghịch biến (giảm).
- a = 0: hằng số (đường ngang).

**Vì sao quan trọng**: mô hình tuyến tính trong hầu hết mọi thứ — vận tốc đều, chi phí cố định, ML linear regression.

---

## 2. Hàm bậc 2 — Parabol

\`\`\`
y = ax² + bx + c
\`\`\`

💡 **Là gì**: đồ thị là **parabol**.

- **a > 0**: parabol "mở lên" (mặt cười).
- **a < 0**: mở xuống (mặt buồn).
- **Đỉnh** tại x = −b/(2a), y = c − b²/(4a) = −Δ/(4a).
- Đối xứng qua trục đứng x = −b/(2a).

**Ứng dụng**: quỹ đạo ném (Lesson 01 Physics), tối ưu hóa (max/min của parabol).

---

## 3. Hàm mũ — Tăng trưởng cấp số nhân

\`\`\`
y = aˣ   (a > 0, a ≠ 1)
\`\`\`

💡 **Là gì**: x tăng đều → y tăng theo **cấp số nhân**.

- a > 1: tăng (y tăng nhanh khi x tăng).
- 0 < a < 1: giảm.
- y > 0 luôn (đồ thị nằm trên trục x).
- Cắt trục y tại (0, 1) (vì a⁰ = 1).

**Cơ số phổ biến**: e ≈ 2.718. Hàm \`eˣ\` là hàm "đẹp nhất" — đạo hàm = chính nó.

**Ứng dụng**: dân số, lãi kép, phóng xạ, vi khuẩn nhân đôi.

---

## 4. Hàm log — Hàm ngược của mũ

\`\`\`
y = log_a(x)
\`\`\`

💡 **Là gì**: hàm ngược của y = aˣ. "log mạnh thế nào để ra x?".

- D = (0, +∞) (x phải dương).
- E = ℝ.
- a > 1: log tăng (chậm).
- Cắt trục x tại (1, 0) (vì log_a(1) = 0).
- **Đối xứng với aˣ qua đường y = x** (mọi cặp hàm ngược).

**Cơ số phổ biến**: ln (cơ số e), log₁₀, log₂.

**Ứng dụng**: đo "độ lớn" (decibel, Richter, pH), entropy ML, complexity O(log n).

---

## 5. Bảng so sánh 4 hàm

| Hàm | Đồ thị | D | E | Đồng biến khi |
|-----|--------|---|---|----------------|
| y = ax + b | Đường thẳng | ℝ | ℝ | a > 0 |
| y = ax² + bx + c | Parabol | ℝ | [y_min, ∞) hoặc (−∞, y_max] | (1/2 đồ thị) |
| y = aˣ | Cong mũ | ℝ | (0, ∞) | a > 1 |
| y = log_a(x) | Cong log | (0, ∞) | ℝ | a > 1 |

---

## 6. Bài tập

### Bài tập

**Bài 1**: Đường thẳng y = 2x − 3. Tính y khi x = 5. Cắt trục x tại đâu?

**Bài 2**: Parabol y = x² − 4x + 3. Tìm đỉnh.

**Bài 3**: y = 2ˣ. Tính y(0), y(3), y(−2).

**Bài 4**: y = log₂(x). Tính y(1), y(8), y(1/4).

**Bài 5**: Vẽ phác họa các hàm: y = x, y = x², y = eˣ, y = ln(x). Nhận xét tăng trưởng.

### Lời giải

**Bài 1**: y(5) = 10 − 3 = **7**. Cắt trục x: y = 0 → 2x = 3 → x = **3/2**.

**Bài 2**: Đỉnh tại x = 4/2 = 2. y(2) = 4 − 8 + 3 = −1. → đỉnh **(2, −1)**.

**Bài 3**: y(0) = 1, y(3) = 8, y(−2) = 1/4.

**Bài 4**: y(1) = 0, y(8) = 3, y(1/4) = −2.

**Bài 5**: 
- y = x: đường thẳng, slope 1.
- y = x²: parabol mở lên, đỉnh O.
- y = eˣ: tăng RẤT nhanh.
- y = ln(x): tăng RẤT chậm.

Thứ tự **tăng trưởng** khi x lớn: ln(x) << x << x² << eˣ. Đó là tại sao trong CS, thuật toán O(log n) "tốt nhất", O(n²) "kém", O(2ⁿ) "không dùng được".

---

## 7. 🎉 HOÀN THÀNH TIER 1 MATH (8/8)!

Tiếp theo: **Tier 2 — Geometry** (chưa triển khai).

## 📝 Tổng kết Tier 1

Sau 8 lesson, bạn nắm được:
1. **Hệ số học** (ℕ → ℤ → ℚ → ℝ).
2. **Biểu thức đại số** (đa thức, hằng đẳng thức, phân tích).
3. **PT bậc 1** + hệ 2 ẩn.
4. **PT bậc 2** (Δ, Viete).
5. **Bất phương trình** (xét dấu tam thức).
6. **Lũy thừa, căn, log**.
7. **Hàm số** (domain, range, hàm hợp).
8. **4 hàm sơ cấp** (bậc 1, bậc 2, mũ, log).

🎉 Đây là **nền tảng đại số phổ thông** đã hoàn chỉnh.
`;
