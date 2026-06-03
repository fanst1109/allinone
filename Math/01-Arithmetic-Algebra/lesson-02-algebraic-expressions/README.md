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

❓ **Câu hỏi tự nhiên của người đọc**

- *"`2x` nghĩa là gì khi không có dấu nhân?"* Là `2·x` — viết liền ngầm hiểu là nhân. `2x` ≠ "số 2 ghép số x".
- *"Biến và ẩn khác nhau không?"* Cùng là ký hiệu chữ; "ẩn" thường chỉ biến **cần tìm** trong phương trình (Lesson 03), "biến" là cách gọi chung.

🔁 **Dừng lại tự kiểm tra**: đánh giá `3x² − x` tại `x = 2`.

<details><summary>Đáp án</summary>

`3·(2²) − 2 = 3·4 − 2 = 10`.

</details>

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

### 2.3. Verify phép nhân đa thức bằng số

Cách kiểm tra khai triển không sai: **thay 1 giá trị x cụ thể vào cả 2 vế**, phải bằng nhau.
- `(x+2)(x+3) = x²+5x+6`. Thay x=4: vế trái `6·7 = 42`; vế phải `16+20+6 = 42` ✓.
- Thay x=−1: vế trái `1·2 = 2`; vế phải `1−5+6 = 2` ✓.

⚠ **Lỗi thường gặp**: chỉ cộng/trừ được các hạng tử **cùng bậc**. `2x² + 3x` **không** rút gọn thành `5x³` hay `5x²` — `x²` và `x` khác bậc, để nguyên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bậc của tích 2 đa thức bằng bao nhiêu?"* Bằng **tổng** 2 bậc: bậc 2 × bậc 3 = bậc 5. Vd `(x²+1)(x³−x) ` có bậc `2+3 = 5`.
- *"Hằng số (vd số 7) có phải đa thức không?"* Có — là đa thức **bậc 0** (`7 = 7x⁰`). Số 0 là đa thức đặc biệt không có bậc.

🔁 **Dừng lại tự kiểm tra**

1. Bậc của `5x⁴ − x⁶ + 2` là mấy?
2. Rút gọn `(x²+3x) + (2x²−x)`.

<details><summary>Đáp án</summary>

1. **6** (mũ cao nhất là `x⁶`, thứ tự viết không quan trọng).
2. `3x² + 2x` (cộng cùng bậc: `1+2=3` cho `x²`, `3−1=2` cho `x`).

</details>

### 📝 Tóm tắt mục 2

- Đa thức = tổng các `aₖxᵏ`; bậc = mũ cao nhất có hệ số ≠ 0.
- Cộng/trừ: gộp hạng tử **cùng bậc**. Nhân: nhân từng cặp; bậc tích = tổng bậc.

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

### 3.3. Verify 2 hằng đẳng thức quan trọng bằng số

- `(a+b)² = a²+2ab+b²`. Thử a=3, b=4: vế trái `(3+4)² = 49`; vế phải `9+24+16 = 49` ✓. Phần `2ab = 24` chính là cái hay bị quên.
- `a³+b³ = (a+b)(a²−ab+b²)`. Thử a=2, b=1: vế trái `8+1 = 9`; vế phải `3·(4−2+1) = 3·3 = 9` ✓.

⚠ **Lỗi thường gặp #1 của cả đại số**: `(a+b)² ≠ a² + b²`. Bị thiếu hạng tử giữa `2ab`. Phản ví dụ: `(3+4)² = 49`, nhưng `3²+4² = 25`. `49 ≠ 25`. Tương tự `√(a²+b²) ≠ a+b`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao nhớ dấu trong `a³−b³` và `a³+b³`?"* Mẹo "SOAP": với `a³±b³`, ngoặc đầu **S**ame dấu (`a±b`), ngoặc sau là `a²` **O**pposite dấu `ab` **A**lways **P**lus `b²`. Vd `a³−b³ = (a−b)(a²+ab+b²)`.
- *"7 hằng đẳng thức này lấy đâu ra?"* Tất cả chỉ là **khai triển phép nhân** rồi rút gọn — không phải công thức trên trời. `(a+b)²` chính là `(a+b)(a+b)` nhân ra.

🔁 **Dừng lại tự kiểm tra**

1. Khai triển `(x−5)²`.
2. Đúng/sai: `(x+3)² = x² + 9`?

<details><summary>Đáp án</summary>

1. `x² − 10x + 25` (nhớ hạng tử giữa `−2·x·5 = −10x`).
2. **Sai**. Đúng là `x² + 6x + 9` — thiếu `6x`.

</details>

### 📝 Tóm tắt mục 3

- 7 hằng đẳng thức đều là khai triển phép nhân; verify được bằng cách thay số.
- Cạm bẫy: `(a+b)² = a²+2ab+b²`, **không** phải `a²+b²`.
- `a²−b² = (a−b)(a+b)` giúp tính nhẩm tích và phân tích nhân tử.

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

### 4.4. Verify phân tích đúng

Nhân ngược lại phải ra đa thức ban đầu: `(x+2)(x+3) = x²+5x+6` ✓ — đó là cách kiểm tra mọi phân tích.

⚠ **Lỗi thường gặp**: quên **đặt nhân tử chung trước**. `2x²−8x+6` mà nhảy thẳng tìm tổng-tích sẽ rối; đặt 2 ra trước → `2(x²−4x+3) = 2(x−1)(x−3)`. Luôn hỏi "có nhân tử chung không?" đầu tiên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Có phải đa thức nào cũng phân tích được không?"* Trên ℝ thì **không**. Vd `x²+1` không phân tích được thành tích bậc 1 hệ số thực (vì vô nghiệm thực — Δ<0). Phải lên số phức (Tier 03) mới tách được.
- *"Tổng-tích khi `c` âm thì sao?"* Hai số `p, q` **trái dấu**. Vd `x²−x−6`: cần `p+q=−1, pq=−6` → `p=−3, q=2` → `(x−3)(x+2)`.

🔁 **Dừng lại tự kiểm tra**

1. Phân tích `x² − 16`.
2. Phân tích `3x² − 12`.

<details><summary>Đáp án</summary>

1. `(x−4)(x+4)` (hiệu 2 bình phương).
2. Đặt 3 chung trước: `3(x²−4) = 3(x−2)(x+2)`.

</details>

### 📝 Tóm tắt mục 4

- Phân tích nhân tử = viết đa thức thành **tích**; kiểm bằng cách nhân ngược.
- Trình tự: (1) nhân tử chung → (2) hằng đẳng thức → (3) tổng-tích.
- Dùng để giải phương trình (tích = 0) và rút gọn phân thức.

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
