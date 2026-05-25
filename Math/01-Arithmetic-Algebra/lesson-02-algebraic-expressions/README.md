# Lesson 02 — Biểu thức đại số

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu khái niệm **biến (variable)** và **hằng số** — và vì sao đại số mạnh hơn số học.
- Sử dụng thành thạo các phép toán trên **đa thức**: cộng, trừ, nhân, chia.
- Áp dụng **7 hằng đẳng thức đáng nhớ**.
- **Phân tích nhân tử** (factoring) — kỹ năng nền cho mọi bài đại số.
- Đánh giá biểu thức tại giá trị biến cụ thể.

## Kiến thức tiền đề

- [Lesson 01 — Hệ số học](../lesson-01-number-systems/) — biết phép toán cơ bản.

---

## 1. Biến và biểu thức

### 1.1. Biến là gì?

**Biến (variable)** = ký hiệu (thường là chữ cái) đại diện cho **một số chưa biết hoặc có thể thay đổi**.

💡 **Là gì**: biến cho phép ta nói về "một số tùy ý" mà không cần biết giá trị cụ thể.

**Vì sao cần?** Vì:
- Số học chỉ làm việc với số cụ thể (3 + 5 = 8).
- Đại số cho phép phát biểu **quy luật chung**: `a + b = b + a` đúng cho mọi a, b.
- Cho phép **giải phương trình**: tìm x sao cho 2x + 3 = 11.

**Ví dụ biến trong đời sống**: trong công thức diện tích hình tròn `A = πr²`, r là **biến** — bạn dùng được công thức cho mọi r (1 m, 2.5 cm, ...).

### 1.2. Biểu thức đại số

**Biểu thức** = tổ hợp của biến, hằng số, và phép toán.

Ví dụ:
- `2x + 5` (biến x, hằng 2 và 5).
- `x² - 3xy + y²` (2 biến x, y).
- `3a + 2b - 4c` (3 biến).

**Đánh giá biểu thức** = thay biến bằng số cụ thể rồi tính.

Vd: với x = 3, biểu thức `2x + 5` = 2·3 + 5 = **11**.

### 📝 Tóm tắt mục 1

- Biến: số chưa biết. Hằng: số cố định.
- Biểu thức: tổ hợp của 2 thứ trên + phép toán.

---

## 2. Đa thức (Polynomial)

### 2.1. Định nghĩa

**Đa thức của 1 biến x** = tổng các "đơn thức" dạng `a·xⁿ` (n là số tự nhiên):
```
P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀
```

- **Bậc của đa thức** = mũ cao nhất n (khi aₙ ≠ 0).
- **Hệ số dẫn đầu** = aₙ.

**Ví dụ**: `P(x) = 3x³ − 5x² + 2x − 1` là đa thức bậc 3.

### 2.2. Phép toán đa thức

**Cộng/trừ**: cộng/trừ các hệ số CÙNG BẬC.
- (2x² + 3x − 1) + (x² − 5x + 4) = **3x² − 2x + 3**.

**Nhân**: nhân từng cặp rồi cộng.
- (x + 2)(x + 3) = x·x + x·3 + 2·x + 2·3 = **x² + 5x + 6**.

**Chia đa thức**: sẽ học sâu hơn ở các bài sau. Cơ bản: chia thường dùng phương pháp "chia dài" (long division).

---

## 3. Bảy hằng đẳng thức đáng nhớ

Bảy công thức cơ bản, dùng rất nhiều:

```
1.  (a + b)² = a² + 2ab + b²
2.  (a − b)² = a² − 2ab + b²
3.  a² − b² = (a − b)(a + b)
4.  (a + b)³ = a³ + 3a²b + 3ab² + b³
5.  (a − b)³ = a³ − 3a²b + 3ab² − b³
6.  a³ + b³ = (a + b)(a² − ab + b²)
7.  a³ − b³ = (a − b)(a² + ab + b²)
```

### 3.1. Walk-through chứng minh #3 — Hiệu 2 bình phương

`a² − b² = (a − b)(a + b)`.

Khai triển vế phải: (a − b)(a + b) = a·a + a·b − b·a − b·b = a² + ab − ab − b² = **a² − b²** ✓.

### 3.2. Ứng dụng nhanh

Tính nhanh `97 · 103` mà không cần máy tính:
- Đặt a = 100, b = 3. Khi đó 97 = a − b và 103 = a + b.
- 97 · 103 = (a − b)(a + b) = a² − b² = 10000 − 9 = **9991**.

---

## 4. Phân tích nhân tử (Factoring)

### 4.1. Là gì?

**Phân tích nhân tử** = biểu diễn một đa thức thành **tích** các đa thức "đơn giản hơn".

Ví dụ: `x² + 5x + 6 = (x + 2)(x + 3)`.

💡 **Vì sao quan trọng?** Vì:
- Để giải phương trình: nếu (x + 2)(x + 3) = 0 thì x = −2 hoặc x = −3.
- Để rút gọn phân thức: (x² − 1)/(x − 1) = (x − 1)(x + 1)/(x − 1) = x + 1.

### 4.2. 3 kỹ thuật cơ bản

**a) Đặt nhân tử chung**:
- `3x² + 6x = 3x(x + 2)`.
- `x³ − x² = x²(x − 1)`.

**b) Áp dụng hằng đẳng thức**:
- `x² − 9 = (x − 3)(x + 3)` (hiệu 2 bình phương).
- `4x² + 12x + 9 = (2x + 3)²` (bình phương tổng).

**c) Phương pháp "tổng và tích"** cho `x² + bx + c`:
- Tìm 2 số p, q sao cho `p + q = b` và `p · q = c`.
- Khi đó `x² + bx + c = (x + p)(x + q)`.

**Ví dụ**: `x² + 5x + 6`. Tìm p, q: p + q = 5, p · q = 6. → p = 2, q = 3. → **(x + 2)(x + 3)**.

### 4.3. Bốn ví dụ phân tích

**Ví dụ 1 — Đặt nhân tử chung**: `2x³ − 4x² + 6x = 2x(x² − 2x + 3)`.

**Ví dụ 2 — Hiệu 2 bình phương**: `25x² − 49 = (5x − 7)(5x + 7)`.

**Ví dụ 3 — Tam thức bậc 2**: `x² − 7x + 12`. p + q = −7, pq = 12 → p = −3, q = −4. → `(x − 3)(x − 4)`.

**Ví dụ 4 — Kết hợp**: `x³ + 8 = (x + 2)(x² − 2x + 4)` (dùng a³ + b³ với b = 2).

---

## 5. Bài tập

### Bài tập

**Bài 1**: Đánh giá `2x² − 3x + 1` tại x = 4.

**Bài 2**: Rút gọn `(3x + 2)(x − 1) − (x + 1)²`.

**Bài 3**: Tính nhanh `(98)² − (2)²` bằng hằng đẳng thức.

**Bài 4**: Phân tích nhân tử: `x² − 10x + 25`.

**Bài 5**: Phân tích nhân tử: `2x² − 8x + 6`.

**Bài 6**: Phân tích nhân tử: `x³ − 27`.

### Lời giải

**Bài 1**: 2(16) − 3(4) + 1 = 32 − 12 + 1 = **21**.

**Bài 2**:
- (3x + 2)(x − 1) = 3x² − 3x + 2x − 2 = 3x² − x − 2.
- (x + 1)² = x² + 2x + 1.
- Hiệu = 3x² − x − 2 − x² − 2x − 1 = **2x² − 3x − 3**.

**Bài 3**: a² − b² = (a−b)(a+b) = 96 × 100 = **9600**.

**Bài 4**: Có dạng a² − 2ab + b² với a = x, b = 5. Vậy `(x − 5)²`.

**Bài 5**: Đặt nhân tử chung 2: `2(x² − 4x + 3)`. Tìm p+q=−4, pq=3 → p=−1, q=−3. → **2(x − 1)(x − 3)**.

**Bài 6**: a³ − b³ với a = x, b = 3: `(x − 3)(x² + 3x + 9)`.

---

## 6. Bài tiếp theo

[Lesson 03 — Phương trình bậc 1](../lesson-03-linear-equations/).

## 📝 Tổng kết

1. **Biến** = số chưa biết. Cho phép tổng quát hóa và giải phương trình.
2. **Đa thức**: aₙxⁿ + ... + a₀. Bậc = mũ cao nhất.
3. **7 hằng đẳng thức**: nền tảng tính toán nhanh và phân tích nhân tử.
4. **Phân tích nhân tử**: 3 kỹ thuật — đặt nhân tử chung, hằng đẳng thức, tổng-tích.
