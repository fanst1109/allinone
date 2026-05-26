# Lesson 02 — sin, cos, tan

## Mục tiêu

- Định nghĩa **sin, cos, tan** qua đường tròn lượng giác (không chỉ trong tam giác vuông).
- Đồ thị 3 hàm — chu kỳ, biên độ, pha.
- Bảng giá trị các góc đặc biệt: 0, 30, 45, 60, 90°...
- Hiểu **biến đổi A·sin(ω·x + φ)** — sóng, dao động, sóng điện xoay chiều.

## Kiến thức tiền đề

- [Lesson 01 — Góc & radian](../lesson-01-angles-radians/).

---

## 1. Định nghĩa (qua đường tròn lượng giác)

💡 **Vì sao dùng đường tròn, không tam giác?** Trong tam giác vuông, góc chỉ có thể từ 0° đến 90°. Nhưng ta cần sin/cos cho mọi góc (kể cả 270°, -50°). Đường tròn lượng giác giải quyết: lấy điểm trên đường tròn r=1, ứng với góc θ.

Cho điểm M trên đường tròn đơn vị, ứng với góc θ:
- **cos θ** = hoành độ của M.
- **sin θ** = tung độ của M.
- **tan θ** = sin θ / cos θ (khi cos θ ≠ 0).

⟶ Sin, cos định nghĩa cho **mọi θ ∈ ℝ**.

> 📐 **Định nghĩa đầy đủ — sin, cos**
>
> **(a) Là gì**: sin θ và cos θ là **toạ độ** của 1 điểm M trên đường tròn bán kính 1, sau khi quay từ trục x dương 1 góc θ ngược chiều kim đồng hồ. cos θ = hoành độ, sin θ = tung độ. tan θ = sin/cos (slope của OM).
>
> **(b) Vì sao cần**: Định nghĩa qua tam giác vuông chỉ hợp lệ cho 0 < θ < 90°. Đường tròn lượng giác mở rộng cho **mọi θ ∈ ℝ** (kể cả âm, lớn hơn 360°). Quan trọng hơn — định nghĩa này làm cho sin/cos **tuần hoàn** chu kỳ 2π một cách tự nhiên (đi quanh đường tròn 1 vòng), và giải thích vì sao sin²+cos² = 1 (vì điểm trên đường tròn r=1 thoả x²+y²=1).
>
> **(c) Ví dụ số**: θ = 0: M = (1, 0) → cos 0 = 1, sin 0 = 0. θ = π/2: M = (0, 1) → cos π/2 = 0, sin π/2 = 1. θ = π: M = (-1, 0). θ = π/4 (45°): M = (√2/2, √2/2). θ = 2π/3 (120°): M = (-1/2, √3/2). Verify: cos² + sin² = (-1/2)² + (√3/2)² = 1/4 + 3/4 = **1** ✓.

---

## 2. Bảng giá trị đặc biệt

| θ | 0 | π/6 (30°) | π/4 (45°) | π/3 (60°) | π/2 (90°) | π (180°) | 3π/2 (270°) | 2π (360°) |
|---|---|---|---|---|---|---|---|---|
| sin θ | 0 | 1/2 | √2/2 | √3/2 | 1 | 0 | -1 | 0 |
| cos θ | 1 | √3/2 | √2/2 | 1/2 | 0 | -1 | 0 | 1 |
| tan θ | 0 | √3/3 | 1 | √3 | ∞ | 0 | ∞ | 0 |

💡 **Mẹo nhớ "bàn tay"**: sin của 0°, 30°, 45°, 60°, 90° = √0/2, √1/2, √2/2, √3/2, √4/2. Cos thì đảo ngược thứ tự.

---

## 3. Đồ thị 3 hàm

### 3.1. y = sin x

- **D** = ℝ, **E** = [-1, 1].
- **Chu kỳ**: 2π. sin(x + 2π) = sin x.
- **Lẻ**: sin(-x) = -sin x. Đồ thị đối xứng qua O.
- Đi qua O(0, 0), cực đại tại π/2 (= 1), cực tiểu tại 3π/2 (= -1).

### 3.2. y = cos x

- **D** = ℝ, **E** = [-1, 1].
- **Chu kỳ**: 2π.
- **Chẵn**: cos(-x) = cos x. Đối xứng qua trục Oy.
- Đi qua (0, 1), cực đại tại x = 0, cực tiểu tại π.
- **Liên hệ với sin**: cos x = sin(x + π/2). Cos sớm pha hơn sin π/2.

### 3.3. y = tan x

- **D** = ℝ \\ {π/2 + kπ}, **E** = ℝ.
- **Chu kỳ**: π (ngắn hơn sin/cos!).
- **Lẻ**: tan(-x) = -tan x.
- **Tiệm cận đứng** tại x = π/2 + kπ (nơi cos = 0).

❓ **Vì sao tan chu kỳ π chứ không 2π?** Vì tan = sin/cos. Khi x tăng π, cả sin và cos đổi dấu cùng lúc → tỉ số không đổi.

---

## 4. Biến đổi A·sin(ω·x + φ) — Mô hình sóng

```
y = A·sin(ω·x + φ) + k
```

- **A** = biên độ (amplitude). Giá trị max-min của y = 2A.
- **ω** = tần số góc (angular frequency). Càng lớn càng "co lại". Chu kỳ T = 2π/ω.
- **φ** = pha ban đầu. Dịch đồ thị sang trái φ/ω đơn vị.
- **k** = dịch dọc.

**Ví dụ**: y = 3·sin(2x + π/4).
- A = 3 → dao động từ -3 đến 3.
- ω = 2 → chu kỳ T = π (đồ thị "nén" lại).
- φ = π/4 → dịch sang trái π/8.

💡 **Ứng dụng thực tế**:
- **Sóng âm**: tai nghe được 20 Hz – 20 kHz, biểu diễn bằng tổng các sin với ω, φ khác nhau.
- **Điện xoay chiều**: U = U₀·sin(ωt). VN dùng 50 Hz → ω = 100π rad/s.
- **Dao động điều hòa**: con lắc, lò xo (Physics).
- **Tín hiệu**: Fourier — mọi hàm tuần hoàn = tổng sin/cos.

---

## 5. Quan hệ tam giác vuông (vẫn đúng)

Khi 0 < θ < π/2:
```
       │╲
       │ ╲ c (huyền)
   a   │  ╲
       │   ╲ θ
       └────╲
          b
```
- sin θ = a/c (đối/huyền).
- cos θ = b/c (kề/huyền).
- tan θ = a/b (đối/kề).

⟶ **Trùng với định nghĩa qua đường tròn** (vì điểm trên đường tròn đơn vị tạo tam giác vuông).

---

## 6. Quy luật dấu trên 4 góc phần tư

| Phần tư | I (0-90°) | II (90-180°) | III (180-270°) | IV (270-360°) |
|---------|-----------|---------------|----------------|---------------|
| sin | + | + | − | − |
| cos | + | − | − | + |
| tan | + | − | + | − |

💡 **Mẹo "ASTC"**: All – Sin – Tan – Cos (góc phần tư nào hàm nào DƯƠNG). All Students Take Calculus.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính sin(2π/3), cos(2π/3), tan(2π/3).

**Bài 2**: Đồ thị y = 2·sin(3x). Biên độ và chu kỳ?

**Bài 3**: y = sin x + cos x. Biên độ là bao nhiêu? (Gợi ý: dùng công thức A·sin(x+φ).)

**Bài 4**: cos x = -1/2. Tìm x trong [0, 2π].

**Bài 5**: Trong góc phần tư III, sin x = -3/5. Tính cos x, tan x.

### Lời giải

**Bài 1**: 2π/3 = 120°.  
- sin(120°) = sin(180-60) = sin 60° = **√3/2**.  
- cos(120°) = -cos 60° = **-1/2**.  
- tan = sin/cos = **-√3**.

**Bài 2**: A = 2, T = 2π/3.

**Bài 3**: sin x + cos x = √2·sin(x + π/4). Biên độ = **√2**.

**Bài 4**: cos x = -1/2 → x = 2π/3 hoặc x = 4π/3.

**Bài 5**: sin²+cos² = 1 → cos² = 1 - 9/25 = 16/25 → cos = ±4/5. Phần tư III: cos < 0 → cos = **-4/5**. tan = sin/cos = (-3/5)/(-4/5) = **3/4**.

---

## 8. Bài tiếp theo

[Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/) — công thức cộng, nhân đôi, hạ bậc.

## 📝 Tổng kết

1. **sin, cos, tan** định nghĩa qua đường tròn lượng giác, áp dụng mọi θ ∈ ℝ.
2. **Chu kỳ**: sin & cos = 2π, tan = π.
3. **Bảng giá trị**: 0, π/6, π/4, π/3, π/2 — nhớ thuộc lòng.
4. **A·sin(ω·x + φ)**: mô hình sóng. A = biên độ, ω = tần số, φ = pha.
5. **ASTC**: dấu sin/cos/tan trên 4 góc phần tư.
