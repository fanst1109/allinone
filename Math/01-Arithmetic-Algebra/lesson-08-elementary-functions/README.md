# Lesson 08 — Hàm sơ cấp

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

```
y = ax + b
```

💡 **Là gì**: đồ thị là đường thẳng. **a = hệ số góc** (slope) đo "dốc", **b = tung độ gốc** (cắt trục y).

- a > 0: đồng biến (tăng).
- a < 0: nghịch biến (giảm).
- a = 0: hằng số (đường ngang).

**Vì sao quan trọng**: mô hình tuyến tính trong hầu hết mọi thứ — vận tốc đều, chi phí cố định, ML linear regression.

**Verify slope bằng số**: `y = 2x − 3`. Tại `x=0` → `y=−3`; tại `x=1` → `y=−1`. Khi x tăng 1, y tăng 2 → slope `a=2` ✓. Cắt trục y tại `b=−3` ✓.

⚠ **Lỗi thường gặp**: nhầm "hệ số góc" với "tung độ gốc". `a` là **độ dốc** (x tăng 1 thì y tăng `a`); `b` là **chỗ cắt trục y** (giá trị tại `x=0`).

❓ **Câu hỏi tự nhiên của người đọc**: *"Đường thẳng cắt trục x ở đâu?"* Giải `ax+b=0` → `x = −b/a`. Vd `2x−3=0` → `x = 1.5`.

🔁 **Dừng lại tự kiểm tra**: `y = −x + 4` đồng biến hay nghịch biến? Cắt trục y ở đâu?

<details><summary>Đáp án</summary>

`a = −1 < 0` → **nghịch biến** (giảm). Cắt trục y tại `(0, 4)`.

</details>

### 📝 Tóm tắt mục 1

- `y = ax + b`: đường thẳng, `a` = độ dốc, `b` = tung độ gốc.
- `a>0` tăng, `a<0` giảm, `a=0` ngang. Cắt trục x tại `x = −b/a`.

---

## 2. Hàm bậc 2 — Parabol

```
y = ax² + bx + c
```

💡 **Là gì**: đồ thị là **parabol**.

- **a > 0**: parabol "mở lên" (mặt cười).
- **a < 0**: mở xuống (mặt buồn).
- **Đỉnh** tại x = −b/(2a), y = c − b²/(4a) = −Δ/(4a).
- Đối xứng qua trục đứng x = −b/(2a).

**Ứng dụng**: quỹ đạo ném (Lesson 01 Physics), tối ưu hóa (max/min của parabol).

**Verify đỉnh bằng số**: `y = x² − 4x + 3`. Đỉnh tại `x = −(−4)/(2·1) = 2`; `y(2) = 4−8+3 = −1` → đỉnh `(2, −1)`. Liên hệ nghiệm (chỗ cắt trục x) ở [Lesson 04](../lesson-04-quadratic-equations/): `x=1, x=3`, đỉnh nằm chính giữa `(1+3)/2 = 2` ✓.

⚠ **Lỗi thường gặp**: nhớ sai dấu công thức đỉnh — là `x = −b/(2a)`, với `b=−4` thì `−b = +4`, không phải `−4`.

❓ **Câu hỏi tự nhiên của người đọc**: *"Đỉnh là max hay min?"* Nếu `a>0` (mở lên) → đỉnh là **điểm thấp nhất (min)**; nếu `a<0` (mở xuống) → đỉnh là **max**.

🔁 **Dừng lại tự kiểm tra**: tìm đỉnh của `y = x² − 6x + 5`.

<details><summary>Đáp án</summary>

`x = 6/2 = 3`, `y(3) = 9−18+5 = −4` → đỉnh `(3, −4)`, là **min** (vì a>0).

</details>

### 📝 Tóm tắt mục 2

- `y = ax²+bx+c`: parabol; `a>0` mở lên (đỉnh = min), `a<0` mở xuống (đỉnh = max).
- Đỉnh tại `x = −b/(2a)`, nằm giữa 2 nghiệm; trục đối xứng đứng qua đỉnh.

---

## 3. Hàm mũ — Tăng trưởng cấp số nhân

```
y = aˣ   (a > 0, a ≠ 1)
```

💡 **Là gì**: x tăng đều → y tăng theo **cấp số nhân**.

- a > 1: tăng (y tăng nhanh khi x tăng).
- 0 < a < 1: giảm.
- y > 0 luôn (đồ thị nằm trên trục x).
- Cắt trục y tại (0, 1) (vì a⁰ = 1).

**Cơ số phổ biến**: e ≈ 2.718. Hàm `eˣ` là hàm "đẹp nhất" — đạo hàm = chính nó.

**Ứng dụng**: dân số, lãi kép, phóng xạ, vi khuẩn nhân đôi.

**Verify "cấp số nhân" bằng số**: `y = 2ˣ`. `y(0)=1, y(1)=2, y(2)=4, y(3)=8` — mỗi bước x tăng 1, y **nhân đôi** (không phải cộng). So với hàm bậc 1 cộng đều, mũ nhân đều.

⚠ **Lỗi thường gặp**: lẫn `2ˣ` (hàm mũ — biến ở **số mũ**) với `x²` (hàm lũy thừa — biến ở **cơ số**). `2³=8` nhưng `3²=9` — khác nhau, và tốc độ tăng cũng khác hẳn khi x lớn.

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao `aˣ > 0` luôn, đồ thị không chạm trục x?"* Vì nhân số dương `a` với chính nó (kể cả mũ âm = nghịch đảo) **không bao giờ ra 0 hay âm**. `2⁻¹⁰ = 1/1024` rất nhỏ nhưng vẫn dương → đồ thị tiệm cận trục x chứ không cắt.

🔁 **Dừng lại tự kiểm tra**: `y = 3ˣ`, tính `y(0), y(2), y(−1)`.

<details><summary>Đáp án</summary>

`y(0)=1`, `y(2)=9`, `y(−1)=1/3`.

</details>

### 📝 Tóm tắt mục 3

- `y = aˣ` (a>0, a≠1): x tăng đều → y **nhân** đều (cấp số nhân).
- `a>1` tăng, `0<a<1` giảm; `y>0` luôn, cắt trục y tại `(0,1)`.
- Phân biệt với `xⁿ` (biến ở cơ số, không phải số mũ).

---

## 4. Hàm log — Hàm ngược của mũ

```
y = log_a(x)
```

💡 **Là gì**: hàm ngược của y = aˣ. "log mạnh thế nào để ra x?".

- D = (0, +∞) (x phải dương).
- E = ℝ.
- a > 1: log tăng (chậm).
- Cắt trục x tại (1, 0) (vì log_a(1) = 0).
- **Đối xứng với aˣ qua đường y = x** (mọi cặp hàm ngược).

**Cơ số phổ biến**: ln (cơ số e), log₁₀, log₂.

**Ứng dụng**: đo "độ lớn" (decibel, Richter, pH), entropy ML, complexity O(log n).

**Verify đối xứng qua y=x bằng số**: hàm mũ `2³ = 8` ↔ điểm `(3, 8)`. Hàm log ngược: `log₂(8) = 3` ↔ điểm `(8, 3)`. Hai điểm `(3,8)` và `(8,3)` đối xứng nhau qua đường `y=x` ✓ — đó là quan hệ hàm ngược.

⚠ **Lỗi thường gặp**: quên điều kiện đối số `> 0`. `log_a(x)` chỉ định nghĩa với `x > 0` (xem [Lesson 06](../lesson-06-powers-roots-logs/)); `log(0)` và `log(số âm)` vô nghĩa trong ℝ.

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao log tăng 'chậm'?"* Vì để `y` tăng thêm 1, `x` phải **nhân** thêm `a` lần. `log₁₀`: từ y=2 lên y=3, x phải nhảy từ 100 lên 1000. x tăng gấp 10 mà y chỉ +1 → cảm giác "chậm".

🔁 **Dừng lại tự kiểm tra**: `y = log₂(x)`, tính `y(1), y(16), y(1/2)`.

<details><summary>Đáp án</summary>

`y(1)=0`, `y(16)=4`, `y(1/2)=−1`.

</details>

### 📝 Tóm tắt mục 4

- `y = log_a(x)`: hàm ngược của `aˣ`, đối xứng qua `y=x`.
- D = (0,∞), cắt trục x tại `(1,0)`; tăng **chậm** (x nhân a thì y chỉ +1).
- Đối số phải `> 0`.

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
