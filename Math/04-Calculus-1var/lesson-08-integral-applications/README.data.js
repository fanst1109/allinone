// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-08-integral-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Ứng dụng tích phân

## Mục tiêu

- Tính **diện tích** giữa 2 đường cong.
- Tính **thể tích vật thể tròn xoay** (đĩa, vỏ trụ).
- **Độ dài cung** đường cong.
- **Giá trị trung bình** của hàm trên [a, b].
- Ứng dụng vật lý: công, momen, khối tâm.

## Kiến thức tiền đề

- [Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

---

## 1. Diện tích giữa 2 đường cong

Cho f(x) ≥ g(x) trên [a, b]:
\`\`\`
S = ∫_a^b [f(x) - g(x)] dx
\`\`\`

💡 **Trực giác**: Diện tích = hiệu giữa diện tích "trần" (f) và "sàn" (g).

**Ví dụ**: Tính diện tích giới hạn bởi y = x² và y = x.
- Tìm giao điểm: x² = x → x = 0, 1.
- Trên [0, 1], x ≥ x² → f = x, g = x².
- S = ∫_0^1 (x - x²) dx = [x²/2 - x³/3]_0^1 = 1/2 - 1/3 = **1/6**.

⚠ **Nếu 2 đường giao nhau nhiều lần**, phải chia nhỏ và lấy |f - g|.

---

## 2. Thể tích vật thể tròn xoay — Phương pháp đĩa

🎯 **Bài toán**: Quay đồ thị y = f(x) ≥ 0 trên [a, b] quanh trục Ox → khối tròn xoay. V = ?

💡 **Ý tưởng**: Cắt vật bằng các mặt phẳng vuông góc trục → mỗi lát là **đĩa tròn** bán kính f(x), độ dày dx.
- dV = π·f(x)² · dx.
- V = ∫_a^b π·f(x)² dx.

**Ví dụ**: Quay y = √x trên [0, 4] quanh Ox.
- V = π·∫_0^4 x dx = π·[x²/2]_0^4 = π·8 = **8π**.

### Hình cầu (ví dụ kinh điển)

Quay nửa đường tròn y = √(R² - x²) quanh Ox:
- V = π·∫_{-R}^R (R² - x²) dx = π·[R²x - x³/3]_{-R}^R = π·(R³·2 - 2R³/3) = **(4/3)·π·R³** ✓.

Khớp công thức hình cầu — đây là cách Archimedes phát hiện (trước khi có Calculus chính thức).

---

## 3. Thể tích — Phương pháp vỏ trụ (Shell)

Khi quay quanh trục Oy, dùng vỏ trụ thay vì đĩa:
\`\`\`
V = 2π·∫_a^b x·f(x) dx
\`\`\`

💡 **Mỗi vỏ trụ** bán kính x, chiều cao f(x), độ dày dx → thể tích = 2πx·f(x)·dx (chu vi × cao × dày).

---

## 4. Độ dài cung đường cong

Cho y = f(x) trên [a, b]:
\`\`\`
L = ∫_a^b √(1 + (f'(x))²) dx
\`\`\`

💡 **Trực giác**: Cắt cung thành các đoạn nhỏ √(dx² + dy²) = √(1 + (dy/dx)²) · dx.

**Ví dụ**: Độ dài cung y = x^(3/2) trên [0, 1].
- f'(x) = (3/2)·x^(1/2).
- L = ∫_0^1 √(1 + 9x/4) dx.
- u = 1 + 9x/4, du = (9/4) dx.
- = (4/9)·∫_1^(13/4) √u du = (4/9)·(2/3)·u^(3/2)|_1^(13/4) = (8/27)·[(13/4)^(3/2) - 1] ≈ **1.44**.

---

## 5. Giá trị trung bình của hàm

\`\`\`
f_tb = (1/(b-a))·∫_a^b f(x) dx
\`\`\`

💡 **Trực giác**: Diện tích chia chiều rộng = chiều cao "trung bình" của đồ thị.

**Ví dụ**: Giá trị trung bình của sin x trên [0, π].
- = (1/π)·∫_0^π sin x dx = (1/π)·[-cos x]_0^π = (1/π)·(1 + 1) = **2/π ≈ 0.637**.

⟶ Giá trị trung bình của sóng sin nửa chu kỳ.

---

## 6. Ứng dụng vật lý

### 6.1. Công cơ học

Lực biến thiên F(x) tác động lên vật từ a đến b:
\`\`\`
W = ∫_a^b F(x) dx
\`\`\`

**Ví dụ**: Lò xo Hooke F = kx. Công kéo lò xo từ 0 đến x:
- W = ∫_0^x k·t dt = (1/2)·k·x².

### 6.2. Khối tâm thanh

Thanh mỏng có mật độ ρ(x) trên [a, b]:
\`\`\`
x_cm = ∫_a^b x·ρ(x) dx / ∫_a^b ρ(x) dx
\`\`\`

### 6.3. Quãng đường khi vận tốc biến thiên

\`\`\`
s = ∫_a^b v(t) dt
\`\`\`

---

## 7. Bài tập

### Bài tập

**Bài 1**: Diện tích giới hạn y = x² và y = 4.

**Bài 2**: Thể tích quay y = sin x, 0 ≤ x ≤ π quanh Ox.

**Bài 3**: Độ dài đường thẳng y = 2x từ x=0 đến x=3.

**Bài 4**: Giá trị trung bình của x² trên [0, 2].

**Bài 5**: Lực F(x) = 3x² N tác dụng kéo vật từ x=0 đến x=2 m. Tính công.

### Lời giải

**Bài 1**: x² = 4 → x = ±2. Trên [-2, 2], 4 ≥ x². S = ∫_{-2}^2 (4 - x²) dx = [4x - x³/3]_{-2}^2 = (8 - 8/3) - (-8 + 8/3) = **32/3**.

**Bài 2**: V = π·∫_0^π sin²x dx = π·∫_0^π (1 - cos 2x)/2 dx = π·[x/2 - sin(2x)/4]_0^π = **π²/2**.

**Bài 3**: f' = 2. L = ∫_0^3 √(1+4) dx = √5·3 = **3√5 ≈ 6.71**. (Kiểm tra: từ (0,0) đến (3,6), khoảng cách = √(9+36) = √45 = 3√5 ✓.)

**Bài 4**: (1/2)·∫_0^2 x² dx = (1/2)·[x³/3]_0^2 = (1/2)·(8/3) = **4/3**.

**Bài 5**: W = ∫_0^2 3x² dx = [x³]_0^2 = **8 J**.

---

## 8. 🎉 HOÀN THÀNH TIER 4 — CALCULUS 1-VAR (8/8)!

Tiếp theo: **Tier 5 — Số học, Tổ hợp, Logic** (chưa triển khai).

## 📝 Tổng kết Tier 4

1. **Giới hạn**: lim dãy và hàm, định nghĩa ε-N/ε-δ.
2. **Liên tục**: 3 điều kiện, định lý giá trị trung gian.
3. **Đạo hàm**: slope tiếp tuyến = vận tốc tức thời.
4. **Quy tắc**: tổng, tích, thương, chain rule (quan trọng nhất).
5. **Ứng dụng đh**: cực trị, khảo sát, l'Hôpital, tối ưu.
6. **Nguyên hàm**: đảo đạo hàm, đổi biến + từng phần.
7. **Tích phân xác định**: tổng Riemann, FTC: ∫_a^b f = F(b)-F(a).
8. **Ứng dụng**: diện tích, thể tích tròn xoay, độ dài cung, công.

🎉 Đây là **xương sống của Toán phổ thông cao + năm 1 đại học**. Tier 5+ sẽ học các nhánh khác (NT, combinatorics, ĐSTT, đa biến).
`;
