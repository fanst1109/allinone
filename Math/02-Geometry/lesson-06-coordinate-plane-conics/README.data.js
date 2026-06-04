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

💡 **Trực giác / Hình dung**: hệ tọa độ giống "địa chỉ nhà" trong thành phố lưới ô bàn cờ — số đường ngang (x) + số đường dọc (y) chỉ đúng 1 vị trí. Khoảng cách 2 điểm = cạnh huyền của tam giác vuông có 2 cạnh góc vuông là Δx và Δy → chính là Pythagoras. Trung điểm = "lấy trung bình cộng" từng tọa độ.

**4 ví dụ số đa dạng (khoảng cách)**:
- A(0,0), B(3,4): d = √(9+16) = **5**.
- A(1,1), B(4,5): d = √(9+16) = **5**.
- A(−2,3), B(1,−1): d = √(3² + (−4)²) = √(9+16) = **5** (tọa độ âm vẫn ổn vì bình phương).
- A(2,5), B(2,9): d = √(0+16) = **4** (cùng x → thẳng đứng).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tọa độ âm có làm hỏng công thức khoảng cách không?"* Không — vì hiệu được **bình phương**, dấu biến mất. (x₂−x₁)² luôn ≥ 0.
- *"Thứ tự A, B có quan trọng trong khoảng cách không?"* Không — d(A,B) = d(B,A) vì (x₂−x₁)² = (x₁−x₂)².
- *"Trung điểm có phải lúc nào cũng nằm giữa?"* Có — luôn là điểm cách đều 2 đầu, nằm trên đoạn AB.

⚠ **Lỗi thường gặp**: quên bình phương, viết d = |Δx| + |Δy| (đó là khoảng cách "taxi", không phải đường chim bay). Phản ví dụ: A(0,0), B(3,4) — đường chim bay = 5, nhưng |3|+|4| = 7 (đi theo lưới đường). Lỗi khác: trừ sai thứ tự trong trung điểm (trung điểm dùng **cộng** rồi chia 2, không phải trừ).

🔁 **Dừng lại tự kiểm tra**

1. A(1,2), B(7,10). Tính khoảng cách AB và trung điểm.
2. Khoảng cách từ gốc O đến điểm (−6, 8) là bao nhiêu?

<details><summary>Đáp án</summary>

1. d = √(6²+8²) = √100 = **10**. M = ((1+7)/2, (2+10)/2) = **(4, 6)**.
2. √(36+64) = √100 = **10**.

</details>

### 📝 Tóm tắt mục 1

- Hệ Oxy: mỗi điểm = (x, y) (hoành độ, tung độ); gốc O = (0,0).
- **Khoảng cách**: d = √(Δx² + Δy²) (Pythagoras) — tọa độ âm vẫn đúng.
- **Trung điểm**: trung bình cộng từng tọa độ.
- Descartes nối hình học ↔ đại số — nền cho giải tích.

---

## 2. Đường thẳng

💡 **Trực giác / Hình dung**: hệ số góc a của đường thẳng = "độ dốc" — đi sang phải 1 đơn vị thì lên (a > 0) hay xuống (a < 0) bao nhiêu. a = 2 nghĩa là "lên 2 khi đi ngang 1" (dốc đứng); a = 0 là đường nằm ngang (mặt hồ phẳng); a âm là đổ dốc xuống. Giống độ dốc của con đường: 5% nghĩa là lên 5 m mỗi 100 m ngang.

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

**Verify bằng số**: đường qua A(1,2) và B(4,8). Hệ số góc a = (8−2)/(4−1) = 6/3 = 2. PT: y − 2 = 2(x−1) → y = 2x. Kiểm: tại x=1 → y=2 ✓ (qua A); tại x=4 → y=8 ✓ (qua B). Đường vuông góc với nó có a' = −1/2 (vì 2·(−1/2) = −1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 2 đường vuông góc thì a₁·a₂ = −1?"* Vì xoay 1 đường 90° thì độ dốc "lật nghịch đảo và đổi dấu" (dốc lên thành dốc xuống nghịch đảo). Vd dốc 2 vuông góc với dốc −1/2.
- *"Đường thẳng đứng có hệ số góc không?"* Không — đường thẳng đứng (x = hằng) có hệ số góc "vô cực", không viết được dạng y = ax+b. Phải dùng dạng tổng quát.
- *"2 đường song song nhận biết thế nào?"* Cùng a, khác b. Nếu cùng cả a và b thì trùng nhau.

⚠ **Lỗi thường gặp**: cho 2 đường song song khi a₁·a₂ = −1 (đó là **vuông góc**). Song song là a₁ = a₂. Phản ví dụ: y = 2x+1 và y = 2x−3 song song (cùng a=2); y = 2x+1 và y = −0.5x vuông góc (2·(−0.5) = −1).

🔁 **Dừng lại tự kiểm tra**

1. Viết PT đường thẳng qua A(0, 3) với hệ số góc −2.
2. Đường y = 3x + 1 và y = ax − 2 vuông góc. Tìm a.

<details><summary>Đáp án</summary>

1. y − 3 = −2(x − 0) → y = **−2x + 3**.
2. 3·a = −1 → a = **−1/3**.

</details>

### 📝 Tóm tắt mục 2

- Dạng hệ số góc: y = ax + b (a = độ dốc, b = tung độ gốc).
- **Song song**: a₁ = a₂ (khác b). **Vuông góc**: a₁·a₂ = −1.
- Qua 1 điểm + hệ số góc: y − y₀ = a(x − x₀).
- Đường thẳng đứng (x = hằng) không có hệ số góc.

---

## 3. Conic — Parabol, Ellipse, Hyperbola

💡 **Trực giác / Hình dung**: cầm 1 cây kem ốc quế (hình nón đôi) rồi cắt nó bằng 1 con dao phẳng. Tùy góc dao mà mặt cắt ra hình khác nhau: cắt ngang → đường tròn; cắt hơi nghiêng → **ellipse** (hình trứng); cắt song song với sườn nón → **parabol** (hở 1 đầu); cắt dốc đứng xuyên cả 2 phần nón → **hyperbola** (2 nhánh). Cùng 1 cái nón, chỉ đổi góc dao là ra cả họ đường cong.

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

### 3.4. Verify bằng số — phân biệt ellipse và hyperbola

**Ellipse** x²/25 + y²/9 = 1 (dấu **+**): a² = 25 (mẫu lớn hơn dưới x²) → a = 5, b² = 9 → b = 3. c = √(a²−b²) = √(25−9) = **4**. Tâm sai e = c/a = 4/5 = 0.8 < 1. Tiêu điểm (±4, 0). Điểm (5,0) và (0,3) đều thuộc: 25/25+0 = 1 ✓; 0+9/9 = 1 ✓.

**Hyperbola** x²/16 − y²/9 = 1 (dấu **−**): a² = 16 → a = 4, b² = 9 → b = 3. c = √(a²+b²) = √(16+9) = **5** (chú ý: **cộng**, khác ellipse). Tiệm cận y = ±(3/4)x. Tâm sai e = c/a = 5/4 = 1.25 > 1.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết a² là số dưới x² hay y²?"* Với **ellipse**, a² là mẫu **lớn hơn** (a ≥ b, a theo trục lớn). Với **hyperbola** x²/a²−y²/b²=1, a² luôn ở số hạng **dương** (trước dấu trừ).
- *"c tính cộng hay trừ?"* Ellipse: c² = a² − b² (trừ). Hyperbola: c² = a² + b² (cộng). Đây là chỗ hay nhầm nhất.
- *"Tâm sai e nói lên gì?"* e đo "độ dẹt": ellipse e < 1 (e=0 là tròn, e→1 là rất dẹt); parabol e=1; hyperbola e > 1.

⚠ **Lỗi thường gặp**: dùng nhầm dấu khi tính c giữa ellipse và hyperbola. Phản ví dụ: với x²/25 − y²/9 = 1 (hyperbola), nếu lấy c = √(25−9) = 4 là **sai** — phải cộng: c = √(25+9) = √34 ≈ 5.83. Còn x²/25 + y²/9 = 1 (ellipse) mới là c = √(25−9) = 4.

🔁 **Dừng lại tự kiểm tra**

1. Ellipse x²/16 + y²/4 = 1. Tìm a, b, c và tâm sai.
2. Hyperbola x²/9 − y²/16 = 1. Tìm a, b, c và phương trình tiệm cận.

<details><summary>Đáp án</summary>

1. a²=16 → a=4, b²=4 → b=2, c = √(16−4) = √12 = 2√3 ≈ 3.46. e = 2√3/4 = √3/2 ≈ **0.87**.
2. a²=9 → a=3, b²=16 → b=4, c = √(9+16) = **5**. Tiệm cận y = ±(4/3)x.

</details>

### 📝 Tóm tắt mục 3

- 3 conic sinh từ mặt cắt nón ở các góc khác nhau; cũng phân theo tâm sai e.
- **Parabol** y = ax²+bx+c: 1 tiêu điểm, 1 đường chuẩn (e = 1).
- **Ellipse** x²/a²+y²/b²=1 (dấu +): 2 tiêu điểm, tổng khoảng = 2a, **c² = a²−b²**, e < 1.
- **Hyperbola** x²/a²−y²/b²=1 (dấu −): 2 nhánh, hiệu khoảng = 2a, **c² = a²+b²** (cộng!), e > 1, tiệm cận y = ±(b/a)x.

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
