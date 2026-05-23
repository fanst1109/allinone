# Lesson 04 — Đồ thị hàm lượng giác (trig graphs)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** `y = sin x` lại có hình "sóng" — không phải vì công thức đẹp, mà vì nó ghi lại tọa độ một điểm đang quay trên đường tròn.
- Vẽ được (bằng tay, bằng bảng số) đồ thị `y = sin x`, `y = cos x`, `y = tan x` trên đoạn `[-2π, 2π]`.
- Đọc và biến đổi phương trình tổng quát `y = A · sin(B·x + C) + D` — biết `A`, `B`, `C`, `D` ảnh hưởng tới biên độ, chu kỳ, pha, dịch dọc thế nào.
- Tính được **chu kỳ** `T = 2π/B`, **tần số** `f = 1/T`, **tần số góc** `ω = B = 2πf` cho mọi sóng sin/cos.
- Có cái nhìn đầu tiên về **chuỗi Fourier**: vì sao mọi tín hiệu tuần hoàn (sóng vuông, âm thanh, ảnh) đều phân tích được thành **tổng các sóng sin/cos**.
- Thấy được trig graphs xuất hiện ở đâu trong ML/AI: **positional encoding** trong Transformer, **spectrogram** trong xử lý âm thanh, **RoPE** (rotary positional embedding).

## Kiến thức tiền đề

- [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/): với mỗi góc `θ` có một điểm `(cos θ, sin θ)` trên đường tròn bán kính 1.
- [Algebra Lesson 05 — Hàm số](../../01-Algebra/lesson-05-functions/): khái niệm hàm số, domain, range, đồ thị, biến đổi (tịnh tiến, co giãn).

Bài này gắn hai thứ đó lại: **hàm lượng giác là một hàm số** (với domain là tập số thực, range là `[-1, 1]` cho sin/cos) và đồ thị của nó có dạng "sóng" rất đặc trưng.

---

## 1. Từ đường tròn quay → đồ thị sóng

### 1.1. Vấn đề đặt ra

Ở Lesson 03 ta đã biết: cho góc `θ`, có một điểm `P = (cos θ, sin θ)` nằm trên đường tròn đơn vị. Khi `θ` thay đổi (chẳng hạn `θ = 0`, rồi `π/6`, rồi `π/4`, ...), điểm `P` **quay** quanh tâm.

Câu hỏi: nếu ta **không vẽ điểm `P` trên mặt phẳng `(x, y)`**, mà thay vào đó vẽ một đồ thị với:

- **Trục hoành** = góc `θ` (thời gian, hoặc bất kỳ tham số nào điều khiển sự quay).
- **Trục tung** = tọa độ tung của `P`, tức `sin θ`.

Thì đồ thị đó trông thế nào? Đó chính là đồ thị `y = sin x` mà bạn sẽ vẽ trong bài này.

### 1.2. Trực giác — quay đường tròn 90° để nhìn ngang

> 💡 **Trực giác**: Hãy tưởng tượng bạn đứng cạnh một bánh xe xoay (vd bánh xe ferris wheel). Có một chiếc đèn LED gắn trên vành bánh. Khi bánh quay đều, **chiều cao của LED so với trục bánh** dao động lên xuống — lên cao nhất khi LED ở 12 giờ, xuống thấp nhất khi LED ở 6 giờ. Nếu bạn ghi nhật ký chiều cao đó theo thời gian, bạn được đường **sin**. Đó là tất cả những gì `y = sin x` ghi lại: tọa độ tung của một điểm đang quay.

Tương tự, `y = cos x` ghi lại **tọa độ hoành** (chiều ngang) của điểm đang quay. Nó cũng có hình sóng, chỉ là **lệch pha** so với sin.

### 1.3. ASCII art — đường tròn ↔ đồ thị

Bên trái là đường tròn đơn vị, bên phải là đồ thị `y = sin x`. Bốn vị trí đặc biệt được đánh dấu `A`, `B`, `C`, `D` ứng với `θ = 0, π/2, π, 3π/2`:

```
   Đường tròn đơn vị                Đồ thị y = sin x
      (mp xy)                        (trục x = θ, trục y = sin θ)

          B (0,1)                          y
           *                            1 ──── B ─────────────
          / |                              ╱  │  ╲
         /  |                             ╱   │   ╲
        /   | sin θ                      ╱    │    ╲
   C  *────┼────* A (1,0)             0─A──── │ ─── C ───── A ── x
  (-1,0)   |  /  (θ=0)                   │    │    │    ╲   ╱
           | /                           │    │    │     ╲ ╱
           |/                            │    │    │      D
           *                            -1────│────│──────│──
          D (0,-1)                            π/2  π     3π/2  2π

  Tại A (θ=0):    sin = 0  ─►  điểm bắt đầu trên đồ thị
  Tại B (θ=π/2):  sin = 1  ─►  điểm cao nhất trên đồ thị
  Tại C (θ=π):    sin = 0  ─►  cắt trục x
  Tại D (θ=3π/2): sin = -1 ─►  điểm thấp nhất
  Quay 1 vòng (θ=2π): trở lại A — đồ thị lặp lại
```

Đọc lại theo hành trình: từ A, điểm trên đường tròn quay ngược chiều kim đồng hồ. Tọa độ tung `sin θ` đi từ `0` (A) lên `1` (B), trở về `0` (C), xuống `-1` (D), rồi lại về `0` (A). Đó là **một chu kỳ** đầy đủ — và đồ thị bên phải cho thấy đúng hành trình đó vẽ ra một "ngọn sóng".

> ❓ **Câu hỏi tự nhiên**: "Tại sao đồ thị bắt đầu từ `(0, 0)` chứ không phải `(0, 1)`?" — Vì `sin(0) = 0` (góc 0 → điểm A ở vị trí `(1, 0)`, tọa độ tung là 0). Nếu vẽ `y = cos x`, đồ thị **bắt đầu từ `(0, 1)`** (vì `cos(0) = 1` — tọa độ hoành của A là 1).

**📝 Tóm tắt mục 1**:

- Đồ thị `y = sin x` ghi lại tọa độ tung của một điểm đang quay đều trên đường tròn đơn vị.
- Đồ thị `y = cos x` ghi lại tọa độ hoành.
- 4 vị trí then chốt trong 1 chu kỳ: `θ = 0` (sin=0), `π/2` (sin=1), `π` (sin=0), `3π/2` (sin=-1).
- Sau `2π`, đồ thị lặp lại — đó là tính tuần hoàn (periodicity).

---

## 2. Đồ thị `y = sin x`

### 2.1. Bảng giá trị

Lập bảng giá trị tại các góc đặc biệt đã học ở Lesson 03 (`π/6 = 30°`, `π/4 = 45°`, `π/3 = 60°`, `π/2 = 90°`...):

| x (rad) | x (deg) | sin x | Giá trị thập phân |
|---:|---:|---|---:|
| 0 | 0° | 0 | 0.000 |
| π/6 | 30° | 1/2 | 0.500 |
| π/4 | 45° | √2/2 | 0.707 |
| π/3 | 60° | √3/2 | 0.866 |
| π/2 | 90° | 1 | **1.000** ← đỉnh |
| 2π/3 | 120° | √3/2 | 0.866 |
| 3π/4 | 135° | √2/2 | 0.707 |
| 5π/6 | 150° | 1/2 | 0.500 |
| π | 180° | 0 | 0.000 |
| 7π/6 | 210° | -1/2 | -0.500 |
| 5π/4 | 225° | -√2/2 | -0.707 |
| 4π/3 | 240° | -√3/2 | -0.866 |
| 3π/2 | 270° | -1 | **-1.000** ← đáy |
| 5π/3 | 300° | -√3/2 | -0.866 |
| 7π/4 | 315° | -√2/2 | -0.707 |
| 11π/6 | 330° | -1/2 | -0.500 |
| 2π | 360° | 0 | 0.000 |

Đọc bảng: từ 0 lên 1 (nửa đầu chu kỳ), rồi xuống -1 (nửa sau), rồi về 0. Đối xứng quanh các điểm `π/2` (đỉnh) và `3π/2` (đáy).

### 2.2. Đặc điểm tổng hợp của `y = sin x`

- **Domain (miền xác định)**: `ℝ` — mọi số thực (mọi góc đều có sin).
- **Range (tập giá trị)**: `[-1, 1]` — sin không bao giờ vượt khỏi đoạn này (đã chứng minh ở Lesson 03: điểm trên đường tròn đơn vị có tọa độ ∈ `[-1, 1]`).
- **Chu kỳ** `T = 2π` — `sin(x + 2π) = sin x` với mọi `x`. Quay đủ 1 vòng thì lặp lại.
- **Hàm LẺ (odd)**: `sin(-x) = -sin(x)`. Đối xứng qua **gốc tọa độ**. Verify: `sin(-π/6) = -1/2 = -sin(π/6)` ✓
- **Đi qua gốc**: `sin(0) = 0`.
- **Các điểm 0**: `sin x = 0 ⟺ x = kπ` với `k` nguyên (`..., -2π, -π, 0, π, 2π, ...`).
- **Đỉnh** (max): `x = π/2 + 2kπ`, giá trị `+1`.
- **Đáy** (min): `x = 3π/2 + 2kπ = -π/2 + 2kπ`, giá trị `-1`.

### 2.3. ASCII đồ thị `y = sin x` trên `[-2π, 2π]`

```
   y
 1 ┤        ╭──╮                ╭──╮                ╭──╮
   │      ╱      ╲             ╱     ╲             ╱     ╲
   │    ╱          ╲          ╱       ╲           ╱       ╲
 0 ┼──╱──────────────╲──────╱───────────╲────────╱───────────╲────── x
   │ -2π          -π ╲    ╱  0          π╲      ╱ 2π
   │                  ╲  ╱                ╲    ╱
   │                   ╲╱                  ╲  ╱
-1 ┤                   ╰─                   ╲╱
                                             ╰─
   ▲                  ▲      ▲              ▲       ▲
  -2π                -π      0              π       2π
   sin=0          sin=0    sin=0          sin=0   sin=0
                  (đáy ở -π/2)            (đáy ở 3π/2 = đỉnh ở -π/2 lặp lại)
```

(ASCII chỉ xấp xỉ — đồ thị thực sự là **đường cong trơn**, không có góc nhọn. Khi chạy `visualization.html`, bạn sẽ thấy đường cong mượt.)

> ⚠ **Lỗi thường gặp**: vẽ `y = sin x` thành "đường zigzag răng cưa". Sin là hàm **trơn (smooth)**, không có góc nhọn — mọi điểm đều có tiếp tuyến rõ ràng (sẽ học chính thức ở Tầng 3 Calculus).

### 2.4. Tại sao đồ thị đối xứng quanh đỉnh/đáy?

Hãy nhìn lại bảng giá trị: `sin(π/3) = sin(2π/3) = √3/2`. Tức `sin` tại các điểm **cách đều `π/2`** (đỉnh) cho cùng giá trị. Đó là **đối xứng trục** qua đường thẳng `x = π/2`.

**Chứng minh từng bước**: với mọi `a`, ta có `sin(π/2 - a) = cos(a)` (đồng nhất thức từ đường tròn đơn vị — ở Lesson 03 đã chỉ ra). Và `sin(π/2 + a) = cos(a)` cũng. Hai vế bằng nhau → đối xứng quanh `x = π/2`. (Sẽ học kỹ hơn ở Lesson 05 — identities.)

> 🔁 **Dừng lại tự kiểm tra**:
> - `sin(7π/6) = ?` 
>   <details><summary>Đáp</summary>`-1/2`. Vì `7π/6 = π + π/6`, và `sin(π + a) = -sin(a) = -1/2`.</details>
> - `sin x = 1` có bao nhiêu nghiệm trong `[0, 4π]`?
>   <details><summary>Đáp</summary>2 nghiệm: `x = π/2` và `x = π/2 + 2π = 5π/2`.</details>
> - Đồ thị `y = sin x` cắt trục Ox tại bao nhiêu điểm trong `[-2π, 2π]`?
>   <details><summary>Đáp</summary>5 điểm: `x = -2π, -π, 0, π, 2π`.</details>

**📝 Tóm tắt mục 2**:

- `y = sin x` có domain `ℝ`, range `[-1, 1]`, chu kỳ `2π`.
- Hàm lẻ, đối xứng qua gốc.
- Đi qua `(0, 0)`. Đỉnh tại `π/2`, đáy tại `3π/2`.
- Cắt trục Ox tại `x = kπ`.

---

## 3. Đồ thị `y = cos x`

### 3.1. Bảng giá trị

| x (rad) | x (deg) | cos x | Giá trị thập phân |
|---:|---:|---|---:|
| 0 | 0° | 1 | **1.000** ← đỉnh |
| π/6 | 30° | √3/2 | 0.866 |
| π/4 | 45° | √2/2 | 0.707 |
| π/3 | 60° | 1/2 | 0.500 |
| π/2 | 90° | 0 | 0.000 |
| 2π/3 | 120° | -1/2 | -0.500 |
| 3π/4 | 135° | -√2/2 | -0.707 |
| 5π/6 | 150° | -√3/2 | -0.866 |
| π | 180° | -1 | **-1.000** ← đáy |
| 7π/6 | 210° | -√3/2 | -0.866 |
| 5π/4 | 225° | -√2/2 | -0.707 |
| 4π/3 | 240° | -1/2 | -0.500 |
| 3π/2 | 270° | 0 | 0.000 |
| 5π/3 | 300° | 1/2 | 0.500 |
| 7π/4 | 315° | √2/2 | 0.707 |
| 11π/6 | 330° | √3/2 | 0.866 |
| 2π | 360° | 1 | 1.000 |

### 3.2. Đặc điểm tổng hợp của `y = cos x`

- **Domain**: `ℝ`.
- **Range**: `[-1, 1]`.
- **Chu kỳ** `T = 2π`.
- **Hàm CHẴN (even)**: `cos(-x) = cos(x)`. Đối xứng qua **trục Oy**. Verify: `cos(-π/3) = 1/2 = cos(π/3)` ✓
- **Đi qua `(0, 1)`** (KHÔNG phải gốc). Đỉnh ban đầu nằm trên trục Oy.
- **Các điểm 0**: `cos x = 0 ⟺ x = π/2 + kπ`.
- **Đỉnh** (max): `x = 2kπ` (`..., -2π, 0, 2π, ...`), giá trị `+1`.
- **Đáy** (min): `x = π + 2kπ`, giá trị `-1`.

### 3.3. Liên hệ then chốt: `cos x = sin(x + π/2)`

> 💡 **Trực giác**: Trên đường tròn đơn vị, `cos θ` là tọa độ hoành; `sin θ` là tọa độ tung. Nếu ta **quay điểm thêm `π/2` ngược chiều kim đồng hồ**, tọa độ hoành cũ trở thành tọa độ tung mới. Tức `cos θ = sin(θ + π/2)` — cos chính là sin **dịch sang trái** `π/2`.

**Walk-through verify bằng số**:

| x | cos x | x + π/2 | sin(x + π/2) | Khớp? |
|---:|---:|---:|---:|:---:|
| 0 | 1 | π/2 | sin(π/2) = 1 | ✓ |
| π/6 | √3/2 ≈ 0.866 | 2π/3 | sin(2π/3) = √3/2 | ✓ |
| π/2 | 0 | π | sin(π) = 0 | ✓ |
| π | -1 | 3π/2 | sin(3π/2) = -1 | ✓ |
| -π/4 | √2/2 | π/4 | sin(π/4) = √2/2 | ✓ |

Tất cả khớp. Đó là vì sao đồ thị `cos` trông giống `sin` chỉ trượt sang trái `π/2` đơn vị.

> ⚠ **Lỗi thường gặp**: viết `cos x = sin(x - π/2)` (sai dấu). Hãy verify lại tại `x = 0`: `sin(0 - π/2) = sin(-π/2) = -1`, không bằng `cos(0) = 1`. Dấu **đúng** là `cos x = sin(x + π/2)`.

### 3.4. ASCII đồ thị `y = cos x` trên `[-2π, 2π]`

```
   y
 1 ┤ ╭──╮                  ╭──╮                  ╭──╮
   │     ╲                ╱     ╲                ╱     ╲
   │      ╲              ╱       ╲              ╱       ╲
 0 ┼───────╲───────────╱───────────╲───────────╱──────────── x
   │       -3π/2     -π/2          π/2          3π/2
   │        ╲         ╱             ╲         ╱
   │         ╲       ╱               ╲       ╱
-1 ┤          ╲─────╱                 ╲─────╱
                  -π                       π
   ▲              ▲         ▲              ▲          ▲
  -2π            -π         0              π          2π
  đỉnh           đáy       đỉnh           đáy        đỉnh
```

> 🔁 **Dừng lại tự kiểm tra**:
> - `cos(-π) = ?`
>   <details><summary>Đáp</summary>`-1`. Hàm chẵn nên `cos(-π) = cos(π) = -1`.</details>
> - Đồ thị `cos` và `sin` có cắt nhau không? Tại đâu trong `[0, 2π]`?
>   <details><summary>Đáp</summary>Có. `sin x = cos x ⟺ tan x = 1 ⟺ x = π/4 + kπ`. Trong `[0, 2π]`: `x = π/4` (cả hai = √2/2) và `x = 5π/4` (cả hai = -√2/2).</details>

**📝 Tóm tắt mục 3**:

- `cos` cùng hình sóng với `sin`, nhưng **dịch sang trái `π/2`**: `cos x = sin(x + π/2)`.
- Hàm chẵn, đối xứng qua Oy.
- Đi qua `(0, 1)`. Đỉnh tại `2kπ`, đáy tại `(2k+1)π`.
- Cắt trục Ox tại `π/2 + kπ`.

---

## 4. Đồ thị `y = tan x`

### 4.1. Định nghĩa và domain

`tan x = sin x / cos x`. Vấn đề ngay lập tức: khi `cos x = 0` thì `tan x` **không xác định** (chia cho 0).

`cos x = 0` tại các điểm `x = π/2 + kπ`, tức `..., -3π/2, -π/2, π/2, 3π/2, ...`.

- **Domain**: `ℝ \ {π/2 + kπ : k ∈ ℤ}`.
- Tại các điểm này, đồ thị có **đường tiệm cận đứng (vertical asymptote)**.

### 4.2. Bảng giá trị

| x | sin x | cos x | tan x |
|---:|---:|---:|---:|
| 0 | 0 | 1 | 0 |
| π/6 | 1/2 | √3/2 | 1/√3 ≈ 0.577 |
| π/4 | √2/2 | √2/2 | 1 |
| π/3 | √3/2 | 1/2 | √3 ≈ 1.732 |
| `π/2 - 0.01` | ≈ 1 | ≈ 0.01 | ≈ **100** (rất lớn) |
| π/2 | 1 | 0 | **undefined** (→ +∞) |
| `π/2 + 0.01` | ≈ 1 | ≈ -0.01 | ≈ **-100** (rất âm) |
| 2π/3 | √3/2 | -1/2 | -√3 ≈ -1.732 |
| 3π/4 | √2/2 | -√2/2 | -1 |
| 5π/6 | 1/2 | -√3/2 | -1/√3 ≈ -0.577 |
| π | 0 | -1 | 0 |

Đọc kỹ: khi `x` tiến tới `π/2` từ **bên trái** (`x < π/2`), `cos x` dương nhỏ dần → `tan x = sin/cos` **tiến tới +∞**. Khi vượt qua `π/2` (`x > π/2`), `cos x` âm nhỏ → `tan x` **tiến từ -∞**. Đó là vì sao có "nhảy" từ +∞ sang -∞ tại tiệm cận.

### 4.3. Đặc điểm tổng hợp của `y = tan x`

- **Domain**: `ℝ \ {π/2 + kπ}`.
- **Range**: `ℝ` (tất cả số thực — không bị chặn).
- **Chu kỳ** `T = π` (KHÔNG phải `2π`!). Verify: `tan(x + π) = sin(x+π)/cos(x+π) = (-sin x)/(-cos x) = sin x / cos x = tan x`. ✓
- **Hàm LẺ**: `tan(-x) = -tan(x)`. Đối xứng qua gốc.
- **Đi qua gốc**: `tan(0) = 0`.
- **Các điểm 0**: `tan x = 0 ⟺ sin x = 0 ⟺ x = kπ`.
- **Tiệm cận đứng**: `x = π/2 + kπ`.

> ❓ **Câu hỏi tự nhiên**: "Sao chu kỳ tan là `π` mà sin/cos là `2π`?" — Vì khi cộng `π` vào `x`, cả `sin` và `cos` đều **đổi dấu** (đối xứng qua gốc tròn). Tỉ số `sin/cos` **không đổi dấu** (âm chia âm vẫn dương). Tức tan tự khôi phục sau nửa vòng quay.

### 4.4. ASCII đồ thị `y = tan x` trên `[-π, π]`

```
   y
 3 ┤      ╱│                              ╱│
   │     ╱ │                             ╱ │
 2 ┤    ╱  │                            ╱  │
   │   ╱   │                           ╱   │
 1 ┤  ╱    │            ╱             ╱    │
   │ ╱     │          ╱              ╱     │
 0 ┼──────────────────╲────────────────────────── x
   │  ╱    │       ╱                ╱      │
-1 ┤ ╱     │     ╱                ╱        │
   │╱      │   ╱                 ╱         │
-2 ┤       │  ╱                            │
   │       │ ╱                             │
-3 ┤       │╱                              │
   ↑       ↑           ↑                   ↑
  -π     -π/2          0                  π/2
       asymptote                       asymptote
```

(Chú ý các đường dọc `│` ở `-π/2` và `π/2` chính là tiệm cận — đồ thị **không chạm** vào chúng, chỉ tiến tới `±∞`.)

> 🔁 **Dừng lại tự kiểm tra**:
> - `tan(π/4) + tan(3π/4) = ?`
>   <details><summary>Đáp</summary>`1 + (-1) = 0`.</details>
> - `tan x = 1` có bao nhiêu nghiệm trong `[0, 4π]`?
>   <details><summary>Đáp</summary>4 nghiệm: `π/4, 5π/4, 9π/4, 13π/4` (vì chu kỳ `π`).</details>

**📝 Tóm tắt mục 4**:

- `tan x = sin x / cos x`. Không xác định khi `cos x = 0`.
- Chu kỳ `π` (khác sin/cos).
- Range `ℝ` (không bị chặn).
- Tiệm cận đứng tại `π/2 + kπ`.

---

## 5. Biến đổi đồ thị — biên độ `A`

Bây giờ ta bắt đầu **biến đổi** đồ thị cơ bản để có gia đình hàm sin tổng quát.

### 5.1. Phương trình `y = A · sin x`

> 💡 **Trực giác**: nhân cả hàm với `A` = **kéo dãn theo trục y** với tỉ số `|A|`. Đồ thị cao gấp `|A|` lần. Nếu `A < 0`, còn **lật ngược** (gương qua trục Ox).

**Định nghĩa**: với `y = A · sin x`:

- **Biên độ (amplitude)** = `|A|` — khoảng cách từ trục trung bình tới đỉnh.
- **Range** thay đổi: từ `[-1, 1]` → `[-|A|, |A|]`.
- Chu kỳ, pha, các điểm 0 **không đổi** (vẫn `2π`, vẫn cắt Ox tại `kπ`).

### 5.2. Bốn ví dụ walk-through

**Ví dụ 1**: `y = 2 sin x`. Biên độ = `|2| = 2`. Range = `[-2, 2]`.

| x | sin x | 2 sin x |
|---:|---:|---:|
| 0 | 0 | 0 |
| π/6 | 0.5 | **1** |
| π/2 | 1 | **2** (đỉnh) |
| π | 0 | 0 |
| 3π/2 | -1 | **-2** (đáy) |

Đồ thị có hình giống `sin x` nhưng **gấp đôi chiều cao**.

**Ví dụ 2**: `y = 0.5 sin x`. Biên độ = `0.5`. Range = `[-0.5, 0.5]`.

| x | sin x | 0.5 sin x |
|---:|---:|---:|
| π/2 | 1 | 0.5 |
| 3π/2 | -1 | -0.5 |

Đồ thị **bẹp** hơn — chiều cao chỉ một nửa.

**Ví dụ 3**: `y = -1 · sin x = -sin x`. Biên độ = `|-1| = 1`. Range vẫn `[-1, 1]`. NHƯNG **lật ngược qua trục Ox**.

| x | sin x | -sin x |
|---:|---:|---:|
| 0 | 0 | 0 |
| π/2 | 1 | **-1** (giờ là đáy, không phải đỉnh) |
| π | 0 | 0 |
| 3π/2 | -1 | **1** (giờ là đỉnh) |

Đỉnh và đáy đổi vị trí. Nhớ: `-sin x = sin(-x)` (vì sin là hàm lẻ) = `sin(x + π)` (dịch pha `π`).

**Ví dụ 4**: `y = 3 sin x`. Biên độ = 3. Range = `[-3, 3]`. Đỉnh `+3`, đáy `-3`.

### 5.3. ASCII so sánh `y = sin x` vs `y = 2 sin x`

```
   y
 2 ┤             ╭────╮                          ╭────╮
   │           ╱        ╲                       ╱      ╲     y = 2 sin x
   │         ╱            ╲                   ╱          ╲
 1 ┤       ╱  ╭───╮         ╲                ╱   ╭───╮     ╲
   │     ╱   ╱     ╲          ╲             ╱  ╱      ╲     ╲    y = sin x
   │   ╱   ╱         ╲          ╲          ╱  ╱         ╲     ╲
 0 ┼─╱──╱──────────────╲──────────╲──────╱──╱──────────────╲────╲── x
   │ ╱  ╱                ╲          ╲   ╱╱                    ╲
   │╱  ╱                   ╲          ╲╱                       ╲
-1 ┤  ╱                      ╲        ╱╲                         ╲
   │                           ╲     ╱   ╲
-2 ┤                             ╲──╱      ╲────╱
                                   π
        0          π/2              3π/2   2π
```

Quan sát: cả hai cắt Ox tại cùng các điểm (`0, π, 2π`). Khác duy nhất là **chiều cao**.

> ⚠ **Lỗi thường gặp**: nghĩ rằng "biên độ luôn dương — nếu `A = -3` thì biên độ là `-3`". **Sai**. Biên độ là một số dương (`|A|`). Dấu của `A` chỉ kiểm soát việc lật ngược, không đổi biên độ.

**📝 Tóm tắt mục 5**:

- Hệ số `A` trong `y = A · sin x` điều khiển **biên độ** = `|A|`.
- `A < 0`: lật ngược qua trục Ox.
- Range: `[-|A|, |A|]`. Chu kỳ và các điểm 0 không đổi.

---

## 6. Chu kỳ — hệ số `B`

### 6.1. Phương trình `y = sin(B · x)`

> 💡 **Trực giác**: `B` nhân vào `x` = **đếm vòng quay nhanh hơn `B` lần**. Cùng quãng đường `x`, điểm trên đường tròn quay được `B` lần nhiều hơn → đồ thị **gọn lại theo chiều ngang** với hệ số `1/|B|`.

**Định nghĩa**: với `y = sin(B · x)` (`B > 0`):

- **Chu kỳ** mới = `T = 2π / |B|`.
- **Tần số** (số chu kỳ trên 1 đơn vị x) = `f = B / (2π)`.
- **Biên độ** vẫn = 1.

**Vì sao**: ta cần tìm `T` nhỏ nhất sao cho `sin(B(x + T)) = sin(Bx)`, tức `B · T = 2π → T = 2π/B`.

### 6.2. Bốn ví dụ walk-through

**Ví dụ 1**: `y = sin(2x)`. `B = 2` → chu kỳ `T = 2π/2 = π`. Tần số gấp đôi `sin x`.

Verify: tại `x = π/2`, `sin(2 · π/2) = sin(π) = 0`. Tại `x = π/4`, `sin(2 · π/4) = sin(π/2) = 1` (đỉnh). Vậy trong đoạn `[0, π]`, đồ thị `sin(2x)` đã hoàn thành **1 chu kỳ đầy đủ**, trong khi `sin x` mới đi được nửa chu kỳ.

| x | 2x | sin(2x) |
|---:|---:|---:|
| 0 | 0 | 0 |
| π/4 | π/2 | 1 (đỉnh) |
| π/2 | π | 0 |
| 3π/4 | 3π/2 | -1 (đáy) |
| π | 2π | 0 (hết 1 chu kỳ) |

**Ví dụ 2**: `y = sin(x/2)`. `B = 1/2` → `T = 2π / (1/2) = 4π`. Đồ thị **giãn ra**, chu kỳ dài gấp đôi.

| x | x/2 | sin(x/2) |
|---:|---:|---:|
| 0 | 0 | 0 |
| π | π/2 | 1 (đỉnh) |
| 2π | π | 0 |
| 3π | 3π/2 | -1 (đáy) |
| 4π | 2π | 0 (hết 1 chu kỳ) |

**Ví dụ 3**: `y = sin(πx)`. `B = π` → `T = 2π/π = 2`. Chu kỳ chỉ 2 đơn vị (rất ngắn so với `2π ≈ 6.28`).

| x | πx | sin(πx) |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0.5 | π/2 | 1 |
| 1 | π | 0 |
| 1.5 | 3π/2 | -1 |
| 2 | 2π | 0 |

**Ví dụ 4**: `y = sin(100x)`. `B = 100` → `T = 2π/100 ≈ 0.0628`. Đồ thị **dao động cực nhanh** — trong 1 đơn vị có gần 16 chu kỳ. Dùng cho mô phỏng dao động cao tần (vd sóng radio).

### 6.3. Bảng tổng hợp

| Phương trình | `B` | Chu kỳ `T = 2π/B` | Tần số `f = B/(2π)` | Quan sát |
|---|---:|---:|---:|---|
| `sin x` | 1 | 2π ≈ 6.28 | 1/(2π) ≈ 0.159 | chuẩn |
| `sin(2x)` | 2 | π ≈ 3.14 | 1/π ≈ 0.318 | nhanh gấp đôi |
| `sin(x/2)` | 0.5 | 4π ≈ 12.57 | 1/(4π) ≈ 0.080 | chậm một nửa |
| `sin(πx)` | π | 2 | 1/2 = 0.5 | 0.5 chu kỳ/đv |
| `sin(100x)` | 100 | π/50 ≈ 0.063 | 50/π ≈ 15.9 | cao tần |

> ⚠ **Lỗi thường gặp**: nhầm `T = 2π · B` (đúng là `T = 2π / B`). Nhớ: `B` to → quay nhanh → `T` ngắn → **chia**, không nhân.

**📝 Tóm tắt mục 6**:

- `B` trong `y = sin(Bx)` điều khiển **tốc độ quay**: chu kỳ `T = 2π/|B|`.
- `B` to → chu kỳ ngắn → đồ thị "co" ngang.
- `B` nhỏ → chu kỳ dài → đồ thị "giãn" ngang.

---

## 7. Pha (phase shift) — hằng số `C`

### 7.1. Phương trình `y = sin(Bx + C)`

> 💡 **Trực giác**: cộng hằng số `C` vào bên trong sin = **dịch ngang đồ thị**. Cụ thể: `sin(Bx + C) = sin(B(x + C/B))` — dịch **sang trái** một lượng `C/B` (nếu `C > 0`).

**Lưu ý quan trọng**: dịch là theo `C/B`, KHÔNG phải theo `C`. Vì sao? Vì để dịch ngang một hàm `f(x)` sang trái `h`, ta thay `x` bởi `x + h`, ra `f(x + h)`. Ở đây hàm cốt là `sin(Bu)`, dịch sang trái `h` thành `sin(B(x + h)) = sin(Bx + Bh)`. So sánh với `sin(Bx + C)`: `Bh = C → h = C/B`.

### 7.2. Bốn ví dụ walk-through

**Ví dụ 1**: `y = sin(x + π/2)`. `B = 1`, `C = π/2` → dịch trái `C/B = π/2`.

Verify: tại `x = -π/2`, `sin(-π/2 + π/2) = sin(0) = 0` (giống `sin x` tại `x = 0`). Tại `x = 0`, `sin(π/2) = 1` (đỉnh). Đồ thị có đỉnh tại gốc — đúng là **đồ thị cos**!

Tức `sin(x + π/2) = cos x` (đồng nhất thức đã chứng minh ở mục 3).

**Ví dụ 2**: `y = sin(x - π/4)`. `B = 1`, `C = -π/4` → dịch trái `C/B = -π/4` = **dịch phải `π/4`**.

| x | x - π/4 | sin(x - π/4) |
|---:|---:|---:|
| π/4 | 0 | 0 (giống `sin` tại 0) |
| 3π/4 | π/2 | 1 (đỉnh — chậm hơn sin chuẩn `π/4`) |

**Ví dụ 3**: `y = sin(2x + π)`. `B = 2`, `C = π`. Dịch trái `C/B = π/2`.

Sai lầm phổ biến: tưởng dịch trái `π` (theo `C`). Đúng là `π/2` (theo `C/B`). Verify: tại `x = -π/2`, `sin(2·(-π/2) + π) = sin(0) = 0`. So với `sin(2x)` tại `x = 0` cũng = 0. Khớp — đồ thị bị dịch trái `π/2`. ✓

**Ví dụ 4**: `y = sin(3x + π/4)`. `B = 3`, `C = π/4`. Dịch trái `π/12`. (Nhỏ hơn pha vì `B` lớn nén ngang.)

> ⚠ **Lỗi thường gặp** (rất nghiêm trọng): dịch theo `C` thay vì `C/B`. Ví dụ kinh điển: `sin(2x + π)` không phải dịch trái `π`, mà là dịch trái `π/2`. Luôn phải **chia cho `B`** trước khi đọc pha.

> 🔁 **Dừng lại tự kiểm tra**:
> - `y = sin(4x - π)` dịch ngang bao nhiêu?
>   <details><summary>Đáp</summary>`C = -π`, `B = 4`. `C/B = -π/4`. Dịch sang **phải** `π/4`.</details>
> - `y = cos x` viết được dưới dạng `sin(x + C)` với `C = ?`
>   <details><summary>Đáp</summary>`C = π/2`. Vì `cos x = sin(x + π/2)`.</details>

**📝 Tóm tắt mục 7**:

- `C` trong `y = sin(Bx + C)` điều khiển **pha**: dịch trái `C/B` đơn vị (nếu `C > 0`); dịch phải `|C/B|` nếu `C < 0`.
- Luôn **chia cho `B`** để tính lượng dịch — không dùng trực tiếp `C`.

---

## 8. Dịch dọc (vertical shift) — hằng số `D`

### 8.1. Phương trình `y = sin x + D`

> 💡 **Trực giác**: cộng `D` ngoài hàm sin = **dời toàn bộ đồ thị lên/xuống** `D` đơn vị. Trục trung bình (đường tâm sóng) không còn là `y = 0` nữa, mà là `y = D`.

**Định nghĩa**:

- **Trục trung bình**: `y = D`.
- **Range** mới: `[D - |A|, D + |A|]` (với phương trình tổng quát `A sin(Bx + C) + D`).
- Biên độ, chu kỳ, pha **không đổi**.

### 8.2. Bốn ví dụ

| Phương trình | Trục trung bình | Range |
|---|---:|---:|
| `y = sin x` | `y = 0` | `[-1, 1]` |
| `y = sin x + 1` | `y = 1` | `[0, 2]` |
| `y = sin x - 3` | `y = -3` | `[-4, -2]` |
| `y = 2 sin x + 5` | `y = 5` | `[3, 7]` |
| `y = 0.5 sin x + 0.5` | `y = 0.5` | `[0, 1]` (giống xác suất!) |

Ví dụ cuối thú vị: `0.5 sin x + 0.5` luôn nằm trong `[0, 1]` — đôi khi dùng làm "xung dao động đại diện xác suất" trong simulation.

**📝 Tóm tắt mục 8**:

- `D` dịch toàn bộ đồ thị lên `D` đơn vị (xuống nếu âm).
- Range mới: `[D - |A|, D + |A|]`.

---

## 9. Phương trình tổng quát `y = A · sin(B · x + C) + D`

### 9.1. Bảng tổng hợp 4 tham số

| Tham số | Ý nghĩa | Công thức liên quan |
|---|---|---|
| `A` | Biên độ | Biên độ = `|A|`. `A < 0`: lật. |
| `B` | Tần số góc (angular frequency) | Chu kỳ `T = 2π/|B|`, tần số `f = 1/T = |B|/(2π)`. |
| `C` | Pha | Dịch ngang `-C/B` (trái nếu `C > 0`). |
| `D` | Dịch dọc / offset | Trục trung bình `y = D`. Range `[D-|A|, D+|A|]`. |

### 9.2. Walk-through phân tích 4 phương trình cụ thể

**Phân tích 1**: `y = 3 sin(2x - π/3) + 1`.

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| `A` | 3 | Biên độ = 3, không lật |
| `B` | 2 | Chu kỳ = `2π/2 = π` |
| `C` | `-π/3` | Pha dịch ngang = `-C/B = π/6` → dịch **phải** `π/6` |
| `D` | 1 | Trục trung bình `y = 1`, range `[1-3, 1+3] = [-2, 4]` |

**Phân tích 2**: `y = -2 sin(πx) + 5`.

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| `A` | -2 | Biên độ = 2, **lật ngược** |
| `B` | π | Chu kỳ = `2π/π = 2` |
| `C` | 0 | Không dịch ngang |
| `D` | 5 | Trục `y = 5`, range `[3, 7]` |

**Phân tích 3**: `y = 0.5 sin(0.5x + π/4) - 1`.

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| `A` | 0.5 | Biên độ = 0.5 |
| `B` | 0.5 | Chu kỳ = `2π/0.5 = 4π` |
| `C` | π/4 | Dịch trái `(π/4) / 0.5 = π/2` |
| `D` | -1 | Trục `y = -1`, range `[-1.5, -0.5]` |

**Phân tích 4**: `y = 220 sin(100π·t)`. (Mô phỏng điện AC Việt Nam — sẽ thảo luận ở mục 10.)

| Tham số | Giá trị | Kết luận |
|---|---:|---|
| `A` | 220 | Biên độ 220V |
| `B` | 100π | Chu kỳ = `2π/(100π) = 0.02s = 20ms` |
| `C` | 0 | Không pha |
| `D` | 0 | Không offset |

Tần số: `f = 1/T = 1/0.02 = 50 Hz`. Đó chính là **50 Hz lưới điện Việt Nam**.

**📝 Tóm tắt mục 9**:

- 4 tham số `A, B, C, D` điều khiển 4 chiều biến đổi độc lập.
- Mẹo nhớ: đọc theo thứ tự "biên độ → chu kỳ → pha → offset". Pha luôn chia `B`.

---

## 10. Tần số và chu kỳ — đơn vị và ứng dụng

### 10.1. Ba khái niệm: chu kỳ, tần số, tần số góc

| Đại lượng | Ký hiệu | Đơn vị | Công thức |
|---|---:|---|---|
| Chu kỳ | `T` | giây (s), radian | `T = 2π / B` |
| Tần số | `f` | Hz (= 1/s) | `f = 1/T = B/(2π)` |
| Tần số góc | `ω` | rad/s | `ω = B = 2πf` |

> 💡 **Trực giác**: "Chu kỳ" là thời gian quay 1 vòng. "Tần số" là số vòng/giây. "Tần số góc" là số radian/giây — vì 1 vòng = `2π` rad, ta có `ω = 2π · f`.

### 10.2. Ví dụ: điện AC

Điện gia dụng Việt Nam: tần số `f = 50 Hz`, điện áp hiệu dụng 220V (đỉnh ≈ 311V).

- Tần số góc: `ω = 2πf = 100π ≈ 314.16` rad/s.
- Chu kỳ: `T = 1/f = 1/50 = 0.02 s = 20 ms`.
- Phương trình điện áp đỉnh-đỉnh: `V(t) = 311 · sin(100π · t)` (giả sử pha 0).

(Lưu ý: 220V là **giá trị hiệu dụng RMS**, đỉnh = 220√2 ≈ 311V. Trong các bài tập đơn giản hóa ta vẫn dùng 220 cho gọn.)

### 10.3. Ví dụ: âm thanh

Một nốt nhạc **La (A4)** = 440 Hz. Sóng âm dạng:

```
p(t) = A · sin(2π · 440 · t)
```

Chu kỳ `T = 1/440 ≈ 2.27 ms`. Tần số góc `ω = 880π ≈ 2 765` rad/s.

Tai người nghe được dải `20 Hz – 20 kHz`. Mỗi nhạc cụ có một bộ "**hài (harmonics)**" riêng — tức ngoài tần số chính `f₀`, còn có các tần số phụ `2f₀, 3f₀, 4f₀, ...` với biên độ khác nhau. Đó là vì sao đàn piano và violin chơi cùng nốt La nhưng nghe khác — khác về thành phần hài.

**📝 Tóm tắt mục 10**:

- `T`, `f`, `ω` là 3 cách diễn đạt cùng một thông tin — biết một suy ra hai cái còn lại.
- Lưới điện Việt Nam: 50 Hz, `T = 20 ms`, `ω = 100π rad/s`.
- Âm thanh: nốt La = 440 Hz.

---

## 11. Preview chuỗi Fourier — vì sao sin/cos là "viên gạch" của mọi tín hiệu

> 💡 **Tuyên bố lớn** (sẽ chứng minh ở Tầng 4–5): **mọi tín hiệu tuần hoàn** (và rất nhiều tín hiệu phi-tuần hoàn) **đều phân tích được thành tổng các sóng sin/cos** với các tần số khác nhau. Đây là **chuỗi Fourier** (cho tuần hoàn) hoặc **biến đổi Fourier** (cho phi-tuần hoàn).

### 11.1. Walk-through: xấp xỉ sóng vuông

Sóng vuông (square wave) là tín hiệu bật/tắt — nhảy giữa `+1` và `-1` lặp lại. Trông như răng cưa hình chữ nhật:

```
+1 ┤ ──────╮      ╭──────╮      ╭──────╮
   │       │      │      │      │
-1 ┤       ╰──────╯      ╰──────╯
       0   π      2π     3π     4π
```

Câu hỏi: làm sao "ghép" được đường thẳng và góc vuông như thế này từ những đường sin **trơn tru**?

**Công thức** (sẽ chứng minh ở Tầng 4):

```
square(x) ≈ (4/π) · [sin(x) + sin(3x)/3 + sin(5x)/5 + sin(7x)/7 + ...]
```

Tức cộng sin của các tần số **lẻ** (1, 3, 5, 7, ...) với biên độ giảm dần (`1, 1/3, 1/5, 1/7`).

**Walk-through bằng số tại `x = π/2`** (sóng vuông ở giá trị `+1` ở đây):

- `sin(π/2) = 1`.
- `sin(3π/2)/3 = -1/3 ≈ -0.333`.
- `sin(5π/2)/5 = 1/5 = 0.2`.
- `sin(7π/2)/7 = -1/7 ≈ -0.143`.
- `sin(9π/2)/9 = 1/9 ≈ 0.111`.
- ...

Tổng 5 số hạng: `1 - 0.333 + 0.2 - 0.143 + 0.111 ≈ 0.835`. Nhân `4/π`: `0.835 · 1.273 ≈ 1.063`. Khá gần `+1`.

Tổng 100 số hạng cho gần `+1.000`. Tổng **vô hạn** cho **đúng** `+1` (nhưng có hiện tượng Gibbs ở các "góc nhảy" — sẽ học sau).

**ASCII so sánh** (xấp xỉ tay):

```
n=1  (chỉ sin x):     ╭───╮     ╭───╮         (sóng tròn trơn)
                    ╱       ╲ ╱       ╲

n=3  (sin x + sin 3x/3): ──╮   ╱─╲   ╱──╮        (bắt đầu vuông hóa)
                          ╲___╱   ╲_╱

n=10:                ─────╮    ╭────╮    ╭─       (gần như vuông, có "rung")
                          │    │    │    │

n→∞                  ─────╮    ╭────╮    ╭─       (vuông thật, với "tai" Gibbs)
                          ╰────╯    ╰────╯
```

> 🤯 **Insight**: Sin/cos là "viên gạch nguyên tử" để xây mọi tín hiệu khác. Đây là tư tưởng sâu sắc nhất của trigonometry và là nền tảng của xử lý tín hiệu hiện đại.

### 11.2. Ứng dụng thực tế

- **Nén audio MP3**: tách âm thanh thành các thành phần tần số, vứt bỏ các tần số tai người không nghe được, lưu cái còn lại → nén từ 10MB → 1MB.
- **Nén ảnh JPEG**: tách ảnh thành các "sóng 2D" (sin/cos của tọa độ pixel), giữ các tần số thấp, vứt cao → nén với ít mất mát.
- **Xử lý tín hiệu radio, viễn thông**: tách tín hiệu khỏi nhiễu bằng cách lọc theo tần số.
- **Attention trong Transformer**: sẽ thấy ở mục 12.

**📝 Tóm tắt mục 11**:

- Chuỗi Fourier: mọi tín hiệu tuần hoàn = tổng các sóng sin/cos.
- Sóng vuông ≈ `sin x + sin(3x)/3 + sin(5x)/5 + ...`
- Càng nhiều hài → càng giống sóng vuông thật.

---

## 12. Liên hệ ML/AI — Positional Encoding và Spectrogram

### 12.1. Positional Encoding trong Transformer

Trong Transformer (kiến trúc của GPT, BERT, ...), mô hình xử lý các "**token**" (từ, byte, pixel...) **song song** — không có khái niệm "thứ tự" sẵn. Nhưng thứ tự câu cực kỳ quan trọng ("con chó cắn người" ≠ "người cắn con chó"). Giải pháp: **gán cho mỗi vị trí `pos` trong câu một vector đặc trưng**, gọi là positional encoding (PE).

Paper "Attention Is All You Need" (Vaswani et al., 2017) dùng công thức:

```
PE(pos, 2i)     = sin(pos / 10000^(2i / d))
PE(pos, 2i+1)   = cos(pos / 10000^(2i / d))
```

Trong đó `pos` là vị trí (0, 1, 2, ...), `i` là chỉ số chiều (0, 1, ..., d/2 - 1), `d` là số chiều của embedding (vd 512).

**Đọc kỹ**: với mỗi chiều `i`, hàm `sin / cos` có **tần số góc khác nhau** = `1 / 10000^(2i/d)`. Khi `i = 0`: tần số cao nhất (`1`). Khi `i` lớn: tần số rất thấp (`10⁻⁴` chẳng hạn).

> 💡 **Trực giác**: vector PE của vị trí `pos` là **một "vân tay tần số" duy nhất** — gồm các giá trị sin/cos ở nhiều tần số khác nhau. Hai vị trí gần nhau có PE giống nhau (các sóng đồng pha). Hai vị trí xa nhau có PE khác hẳn.

**Walk-through đơn giản** với `d = 4`, vị trí `pos = 3`:

- `PE(3, 0) = sin(3 / 10000^0) = sin(3) ≈ 0.141`.
- `PE(3, 1) = cos(3 / 10000^0) = cos(3) ≈ -0.990`.
- `PE(3, 2) = sin(3 / 10000^(2/4)) = sin(3 / 100) = sin(0.03) ≈ 0.030`.
- `PE(3, 3) = cos(3 / 100) = cos(0.03) ≈ 0.9996`.

Vector: `[0.141, -0.990, 0.030, 0.9996]`.

Vector này được **cộng** vào embedding gốc của token. Mô hình tự học cách "đọc" vân tay đó để biết vị trí.

### 12.2. Spectrogram trong xử lý âm thanh ML

Spectrogram là cách biểu diễn âm thanh bằng **cường độ của các tần số sin/cos theo thời gian**:

- Trục hoành: thời gian.
- Trục tung: tần số (Hz).
- Màu (đậm/nhạt): biên độ của tần số đó tại thời điểm tương ứng.

Bạn có thể "nhìn thấy" tiếng nói qua spectrogram — các nguyên âm, phụ âm, mỗi cái có vân tần số đặc trưng. Đây là input chuẩn cho:

- **Speech recognition** (Whisper, Google ASR).
- **Music generation** (MusicGen, Suno).
- **Sound classification**.

Quá trình tạo spectrogram: cắt âm thanh thành các đoạn ngắn (~25ms), với mỗi đoạn áp **biến đổi Fourier** (FFT) để tách thành các tần số sin/cos. Tức **sin/cos là "ngôn ngữ trung gian" giữa âm thanh thô và mạng neural**.

### 12.3. RoPE — Rotary Positional Embedding (preview)

Một cải tiến hiện đại hơn dùng trong LLaMA, GPT-NeoX, Falcon: thay vì cộng PE vào embedding, **xoay** embedding theo một góc tỉ lệ với vị trí. Sin/cos lại xuất hiện — ở dạng ma trận xoay 2D `[[cos θ, -sin θ], [sin θ, cos θ]]`. Sẽ học chi tiết ở Tầng 4 (Linear Algebra).

**📝 Tóm tắt mục 12**:

- Positional encoding (Transformer): mỗi chiều của PE là một sóng sin/cos với tần số khác.
- Spectrogram: biểu diễn âm thanh bằng các sóng sin/cos theo thời gian.
- RoPE: xoay embedding bằng ma trận sin/cos — sẽ học sâu ở Tầng 4.

---

## Tóm tắt toàn bài

**1. Hàm sin/cos là "tọa độ của điểm quay":**
- `sin x` = tọa độ tung của điểm trên đường tròn đơn vị ở góc `x`.
- `cos x` = tọa độ hoành.
- Đó là vì sao đồ thị có hình sóng, lặp lại sau `2π`.

**2. `y = sin x`:** domain `ℝ`, range `[-1,1]`, chu kỳ `2π`, hàm lẻ, qua gốc.

**3. `y = cos x`:** giống sin nhưng dịch trái `π/2`. Hàm chẵn, qua `(0,1)`.

**4. `y = tan x`:** chu kỳ `π` (KHÔNG `2π`), range `ℝ`, có tiệm cận đứng tại `π/2 + kπ`.

**5. Phương trình tổng quát `y = A sin(Bx + C) + D`:**
- `|A|`: biên độ. `A<0`: lật.
- `B`: tần số góc. Chu kỳ `T = 2π/B`.
- `C`: pha. Dịch trái `C/B`.
- `D`: dịch dọc. Range `[D-|A|, D+|A|]`.

**6. Quy tắc nhớ:** chu kỳ chia `B`, không nhân. Pha chia `B`, không trực tiếp `C`.

**7. Chuỗi Fourier:** mọi tín hiệu tuần hoàn = tổng sin/cos. Nền của MP3, JPEG, FFT.

**8. ML/AI:** Positional encoding (Transformer), spectrogram (speech), RoPE — đều dùng sin/cos.

---

## Bài tập

### Bài 1 — Vẽ 4 đồ thị trên cùng trục

Lập bảng giá trị (≥ 9 điểm) cho mỗi hàm trên `[-2π, 2π]`. Sau đó mô tả ASCII so sánh:

(a) `y = sin x`
(b) `y = sin(2x)`
(c) `y = 2 sin x`
(d) `y = sin x + 1`

Trả lời: cái nào dao động nhanh nhất? Cái nào cao nhất? Cái nào không bao giờ chạm trục Ox?

### Bài 2 — Phân tích phương trình

Cho `y = 3 sin(2x - π/3) + 1`. Tìm:

(a) Biên độ.
(b) Chu kỳ.
(c) Pha (dịch ngang).
(d) Dịch dọc.
(e) Range.
(f) Giá trị `y` tại `x = 0` và `x = π/3`.

### Bài 3 — Điện AC

Một sóng điện áp AC có biên độ đỉnh 220V, tần số 50 Hz. Viết phương trình `V(t)` (giả sử pha 0, offset 0). Tính `V` tại `t = 0`, `t = 0.005 s`, `t = 0.01 s`.

### Bài 4 — Xấp xỉ Fourier

Cho `y = sin x + sin(3x)/3`. Lập bảng 10 điểm trong `[0, 2π]`. Vẽ ASCII đồ thị. So sánh với `y = sin x` đơn lẻ — có giống "sóng vuông" hơn không?

### Bài 5 — Chứng minh `cos x = sin(x + π/2)` bằng bảng

Lập bảng 9 điểm cho cả `cos x` và `sin(x + π/2)` trên `[0, 2π]`. Khớp từng giá trị. Kết luận?

### Bài 6 — Code Go

Viết các hàm:

1. `analyzeWave(A, B, C, D float64) (period, freq, rangeMin, rangeMax float64)` — phân tích phương trình `y = A sin(Bx + C) + D`.
2. `samplePoints(A, B, C, D float64, xMin, xMax float64, n int) (xs, ys []float64)` — sinh `n` điểm cách đều trong `[xMin, xMax]`.
3. `fourierSquare(x float64, nHarmonics int) float64` — xấp xỉ sóng vuông với `nHarmonics` hài đầu tiên.
4. Demo: in bảng giá trị 12 điểm cho `y = 3 sin(2x - π/3) + 1` trên `[0, 2π]`, kèm chu kỳ và range.

---

## Lời giải chi tiết

### Lời giải bài 1

**Bảng giá trị** tại các điểm chuẩn:

| x | sin x | sin(2x) | 2 sin x | sin x + 1 |
|---:|---:|---:|---:|---:|
| -2π | 0 | 0 | 0 | 1 |
| -3π/2 | 1 | 0 | 2 | 2 |
| -π | 0 | 0 | 0 | 1 |
| -π/2 | -1 | 0 | -2 | 0 |
| 0 | 0 | 0 | 0 | 1 |
| π/4 | 0.707 | 1 | 1.414 | 1.707 |
| π/2 | 1 | 0 | 2 | 2 |
| π | 0 | 0 | 0 | 1 |
| 3π/2 | -1 | 0 | -2 | 0 |
| 2π | 0 | 0 | 0 | 1 |

**Trả lời**:
- **Dao động nhanh nhất**: `y = sin(2x)` — chu kỳ `π` (gấp đôi tần số).
- **Cao nhất** (đỉnh xa trục x nhất): `y = 2 sin x` đạt `+2`; `y = sin x + 1` cũng đạt `+2`. Hòa.
- **Không chạm trục Ox**: `y = sin x + 1` (range `[0, 2]`, **chạm Ox** tại các điểm sin = -1, tức `x = -π/2, 3π/2, ...`). Sau kiểm lại: tại `x = -π/2`, `sin(-π/2) + 1 = -1 + 1 = 0`. Vậy nó **có** chạm trục Ox.

Sửa lại: **không có cái nào không chạm trục Ox** trong 4 phương trình này — vì range của cả 4 đều bao gồm 0. Tuy nhiên, nếu thay `D = 2`, ta được `sin x + 2`, range `[1, 3]`, không bao giờ chạm Ox. Đây là điểm cần ý thức: `D > |A|` thì đồ thị không cắt Ox.

### Lời giải bài 2

Cho `y = 3 sin(2x - π/3) + 1`. Đọc tham số: `A = 3`, `B = 2`, `C = -π/3`, `D = 1`.

| Mục | Đáp | Lý do |
|---|---|---|
| (a) Biên độ | `|3| = 3` | |A| |
| (b) Chu kỳ | `T = 2π/2 = π` | `2π/B` |
| (c) Pha (dịch ngang) | `-C/B = -(-π/3)/2 = π/6` → dịch **phải** `π/6` | dấu đảo vì cộng `C` nhưng dịch theo `-C/B` |
| (d) Dịch dọc | `D = 1` (lên 1 đơn vị) | trục trung bình `y = 1` |
| (e) Range | `[1 - 3, 1 + 3] = [-2, 4]` | `[D-|A|, D+|A|]` |
| (f) Tại `x = 0` | `y = 3·sin(-π/3) + 1 = 3·(-√3/2) + 1 = 1 - 3√3/2 ≈ -1.598` | |
| (f) Tại `x = π/3` | `y = 3·sin(2π/3 - π/3) + 1 = 3·sin(π/3) + 1 = 3·(√3/2) + 1 ≈ 3.598` | |

Quan sát: tại `x = 0` và `x = π/3`, hai giá trị **đối xứng quanh trục `y = 1`** (chênh `±2.598`). Đó là vì hai điểm cách nhau `π/3 = T/3` — một phần ba chu kỳ.

### Lời giải bài 3

`f = 50 Hz` → `B = ω = 2πf = 100π` rad/s. Biên độ `A = 220`. Vậy:

```
V(t) = 220 · sin(100π · t)
```

| t (s) | 100π·t (rad) | sin(...) | V (V) |
|---:|---:|---:|---:|
| 0 | 0 | 0 | **0** |
| 0.005 | 0.5π = π/2 | 1 | **220** |
| 0.01 | π | 0 | **0** |
| 0.015 | 1.5π | -1 | **-220** |
| 0.02 | 2π | 0 | **0** (hết 1 chu kỳ — 20ms khớp với f=50Hz) |

Quan sát: `t = 0.005s` là `T/4` (quý chu kỳ) → đạt biên độ đỉnh. Sau `T/2 = 0.01s` về 0, sau `3T/4 = 0.015s` đạt đáy -220V. Đúng pattern của sóng AC.

### Lời giải bài 4

Bảng giá trị cho `y = sin x + sin(3x)/3`:

| x | sin x | 3x | sin(3x) | sin(3x)/3 | y |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | **0** |
| π/6 | 0.5 | π/2 | 1 | 0.333 | **0.833** |
| π/3 | 0.866 | π | 0 | 0 | **0.866** |
| π/2 | 1 | 3π/2 | -1 | -0.333 | **0.667** |
| 2π/3 | 0.866 | 2π | 0 | 0 | **0.866** |
| 5π/6 | 0.5 | 5π/2 | 1 | 0.333 | **0.833** |
| π | 0 | 3π | 0 | 0 | **0** |
| 7π/6 | -0.5 | 7π/2 | -1 | -0.333 | **-0.833** |
| 4π/3 | -0.866 | 4π | 0 | 0 | **-0.866** |
| 3π/2 | -1 | 9π/2 | 1 | 0.333 | **-0.667** |
| 5π/3 | -0.866 | 5π | 0 | 0 | **-0.866** |
| 11π/6 | -0.5 | 11π/2 | -1 | -0.333 | **-0.833** |
| 2π | 0 | 6π | 0 | 0 | **0** |

ASCII so sánh:

```
   sin x đơn lẻ:           y = sin x + sin(3x)/3:

   1 ┤   ╭───╮              1 ┤   ╭─╲─╲─╲                  ← phẳng hơn ở đỉnh
     │ ╱       ╲               │ ╱        ╲                  (gần "vuông" hơn)
   0 ┼─────────╲─────       0 ┼─────────────╲────
     │           ╲             │              ╲
  -1 ┤             ╲───     -1 ┤              ╱─╱─╱      ← phẳng hơn ở đáy
                                                ╲
```

**Quan sát**: Đỉnh và đáy "**bẹt**" hơn so với `sin x` đơn lẻ. Đó là bước đầu trên đường tới sóng vuông. Nếu thêm nữa `sin(5x)/5`, `sin(7x)/7`, ..., dạng sẽ càng giống sóng vuông.

### Lời giải bài 5

Bảng cho cả `cos x` và `sin(x + π/2)`:

| x | cos x | x + π/2 | sin(x + π/2) | Khớp? |
|---:|---:|---:|---:|:---:|
| 0 | 1 | π/2 | 1 | ✓ |
| π/4 | √2/2 ≈ 0.707 | 3π/4 | √2/2 | ✓ |
| π/2 | 0 | π | 0 | ✓ |
| 3π/4 | -√2/2 | 5π/4 | -√2/2 | ✓ |
| π | -1 | 3π/2 | -1 | ✓ |
| 5π/4 | -√2/2 | 7π/4 | -√2/2 | ✓ |
| 3π/2 | 0 | 2π | 0 | ✓ |
| 7π/4 | √2/2 | 9π/4 = π/4 + 2π | √2/2 | ✓ |
| 2π | 1 | 5π/2 = π/2 + 2π | 1 | ✓ |

**Kết luận**: cả 9 điểm khớp hoàn toàn. Do tính chất hàm số (nếu hai hàm trùng tại đủ nhiều điểm trong một chu kỳ và đều liên tục, chúng đồng nhất), ta có `cos x = sin(x + π/2)` với mọi `x`. ✓

(Chứng minh hình thức: tại Lesson 03, đã thấy hai điểm `(cos θ, sin θ)` và `(cos(θ+π/2), sin(θ+π/2))` cách nhau bởi phép quay `+π/2`. Phép quay `+π/2` biến điểm `(a, b)` thành `(-b, a)`. Vậy `cos(θ+π/2) = -sin θ` và `sin(θ+π/2) = cos θ`. Cái thứ hai chính là điều cần chứng minh.)

### Lời giải bài 6

Xem file [solutions.go](./solutions.go). Tóm tắt approach:

- `analyzeWave`: trả về `period = 2π/|B|`, `freq = 1/period`, `rangeMin = D-|A|`, `rangeMax = D+|A|`.
- `samplePoints`: chia `[xMin, xMax]` thành `n-1` khoảng đều, tính `y = A·sin(Bx+C) + D` tại mỗi điểm.
- `fourierSquare`: tổng `(4/π) · Σ_{k=0}^{nHarmonics-1} sin((2k+1)x) / (2k+1)`.
- Demo cuối in bảng 12 điểm cho `y = 3 sin(2x - π/3) + 1` cùng chu kỳ và range.

**Độ phức tạp**: `analyzeWave` O(1), `samplePoints` O(n), `fourierSquare` O(nHarmonics).

---

## Tiếp theo

- File code: [solutions.go](./solutions.go)
- Minh họa tương tác: [visualization.html](./visualization.html)
- Bài trước: [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/)
- Bài sau: [Lesson 05 — Identity và định lý cosin](../lesson-05-identities-cosine-law/)
- Quay lại lộ trình Trigonometry: [Tầng 2 Trigonometry](../)
