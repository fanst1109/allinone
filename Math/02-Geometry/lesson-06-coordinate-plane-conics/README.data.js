// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-06-coordinate-plane-conics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Tọa độ Oxy & Conic

## Mục tiêu

- Hiểu **hệ tọa độ Oxy** — cách "đánh số" mọi điểm trên mặt phẳng.
- Tính **khoảng cách** 2 điểm bằng Pythagoras.
- Viết phương trình **đường thẳng**.
- Hiểu 3 đường **conic**: parabol, ellipse, hyperbola — sinh ra khi cắt hình nón.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/) (Pythagoras), [Lesson 04 (T1) — PT bậc 2](../../01-Arithmetic-Algebra/lesson-04-quadratic-equations/).

---

## 1. Hệ tọa độ Oxy

**Hệ tọa độ Descartes** (Descartes ~1637): 2 trục vuông góc Ox (ngang) và Oy (dọc), cắt nhau tại gốc O.

Mỗi điểm M trên mặt phẳng có **tọa độ (x, y)** = hoành độ + tung độ.

💡 **Ý nghĩa cách mạng**: Trước Descartes, hình học và đại số tách biệt. Sau Descartes, có thể **dịch** mọi bài hình thành bài đại số (và ngược lại). Đây là nền cho giải tích.

### Khoảng cách 2 điểm A(x₁, y₁), B(x₂, y₂)

\`\`\`
d = √((x₂ − x₁)² + (y₂ − y₁)²)
\`\`\`

(Pythagoras áp dụng trên tam giác vuông tạo bởi đoạn AB.)

### Trung điểm

\`\`\`
M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
\`\`\`

---

## 2. Đường thẳng

### 2.1. Dạng đại số

\`\`\`
y = ax + b   (dạng hệ số góc)
ax + by + c = 0   (dạng tổng quát)
\`\`\`

- a = hệ số góc = tan(θ) với θ = góc nghiêng so với Ox.
- 2 đường thẳng **song song**: cùng a (khác b).
- 2 đường thẳng **vuông góc**: a₁·a₂ = −1.

### 2.2. Viết PT đường thẳng

**Qua 1 điểm A(x₀, y₀) với hệ số góc a**:
\`\`\`
y − y₀ = a(x − x₀)
\`\`\`

**Qua 2 điểm A(x₁, y₁) và B(x₂, y₂)**:
\`\`\`
(y − y₁)/(x − x₁) = (y₂ − y₁)/(x₂ − x₁)
\`\`\`

---

## 3. Conic — Parabol, Ellipse, Hyperbola

Tất cả 3 đường này sinh ra khi **cắt mặt nón** với mặt phẳng theo các góc khác nhau:
- **Parabol**: mặt phẳng song song với đường sinh.
- **Ellipse**: mặt phẳng cắt cả nón, không song song đáy.
- **Hyperbola**: mặt phẳng cắt cả 2 nón.

> 📐 **Định nghĩa đầy đủ — Conic**
>
> **(a) Là gì**: 1 họ 3 đường cong (parabol, ellipse, hyperbola) **có chung 1 cách định nghĩa** qua khoảng cách. Mỗi đường = tập điểm thoả 1 quan hệ giữa khoảng cách tới tiêu điểm và khoảng cách tới đường chuẩn (= **eccentricity e**): e < 1 → ellipse, e = 1 → parabol, e > 1 → hyperbola, e = 0 (đặc biệt) → đường tròn.
>
> **(b) Vì sao cần**: Vì hầu hết quỹ đạo trong vũ trụ là conic. Newton chứng minh: vật chuyển động dưới lực hấp dẫn 1/r² **luôn vẽ ra 1 conic** — hành tinh (ellipse), sao chổi (parabol/hyperbola với 1 lần ghé qua). Trong kỹ thuật: gương parabol hội tụ tia // → tiêu điểm (đèn pin, ăng-ten Mặt Trời, vệ tinh parabol). Ellipse: ổ cứng máy bay, phòng "whisper" (âm thanh từ 1 tiêu hội tụ tại tiêu kia).
>
> **(c) Ví dụ số**: Quỹ đạo Trái Đất quanh Mặt Trời = ellipse với e ≈ 0.017 (gần tròn). Quỹ đạo sao Hỏa: e ≈ 0.093. Sao chổi Halley: e ≈ 0.967 (rất dẹt). Ánh sáng đèn pin: tia phát từ tiêu điểm parabol y² = 4px → ra song song trục Ox. Hyperbola xy = 1: 2 nhánh, tiệm cận 2 trục — đồ thị hàm 1/x.

### 3.1. Parabol

\`\`\`
y = ax² + bx + c    hoặc tổng quát: y² = 4px (mở phải)
\`\`\`

Đặc trưng: 1 **tiêu điểm F** và 1 **đường chuẩn d**. Mỗi điểm trên parabol cách đều F và d.

**Ứng dụng**: gương parabol (đèn pin, ăng-ten parabol), quỹ đạo ném (Physics).

### 3.2. Ellipse (Hình elip)

PT chuẩn (tâm O, trục lớn 2a theo Ox, trục nhỏ 2b theo Oy):
\`\`\`
x²/a² + y²/b² = 1
\`\`\`

Đặc trưng: 2 **tiêu điểm F₁, F₂**. Mỗi điểm trên ellipse có **tổng khoảng cách đến 2 tiêu điểm = 2a** (hằng số).

- **Tâm sai e = c/a** với c = √(a² − b²). e càng gần 0 → càng "tròn".
- e = 0: đường tròn (a = b).

**Ứng dụng**: quỹ đạo hành tinh (Kepler) — Mặt Trời ở 1 tiêu điểm. Phòng "thì thầm" (whispering room).

### 3.3. Hyperbola

PT chuẩn:
\`\`\`
x²/a² − y²/b² = 1
\`\`\`

Đặc trưng: 2 nhánh, 2 **tiệm cận** y = ±(b/a)·x. Hiệu khoảng cách đến 2 tiêu điểm = 2a (hằng số).

**Ứng dụng**: định vị GPS, sóng âm (quỹ tích từ 2 nguồn).

---

## 4. Bài tập

### Bài tập

**Bài 1**: A(1, 2), B(4, 6). Tính khoảng cách AB và trung điểm.

**Bài 2**: Viết PT đường thẳng qua A(2, 3) với hệ số góc 5.

**Bài 3**: Viết PT đường thẳng qua A(1, 2) và B(4, 8).

**Bài 4**: PT y = 2x + 3 và y = ax − 1 vuông góc. Tìm a.

**Bài 5**: Ellipse x²/25 + y²/9 = 1. Tìm a, b, c, tâm sai.

### Lời giải

**Bài 1**: d = √((4-1)² + (6-2)²) = √(9+16) = **5**. M = (2.5, 4).

**Bài 2**: y − 3 = 5(x − 2) → y = **5x − 7**.

**Bài 3**: Hệ số góc = (8-2)/(4-1) = 2. y − 2 = 2(x − 1) → y = **2x**.

**Bài 4**: a₁·a₂ = −1 → 2·a = −1 → **a = −1/2**.

**Bài 5**: a² = 25 → a = 5. b² = 9 → b = 3. c = √(25-9) = 4. Tâm sai e = c/a = **0.8**. Tiêu điểm tại (±4, 0).

---

## 5. Bài tiếp theo

[Lesson 07 — Tọa độ Oxyz](../lesson-07-coordinate-3d/).

## 📝 Tổng kết

1. **Oxy**: mỗi điểm = (x, y). d = √(Δx² + Δy²) (Pythagoras).
2. **Đường thẳng**: y = ax + b. Vuông góc: a₁a₂ = −1.
3. **Parabol** y = ax² + bx + c: 1 tiêu điểm, 1 chuẩn.
4. **Ellipse** x²/a² + y²/b² = 1: 2 tiêu điểm, tổng khoảng = 2a.
5. **Hyperbola** x²/a² − y²/b² = 1: 2 nhánh, hiệu khoảng = 2a.
`;
