# Lesson 05 — Bất phương trình

## Mục tiêu học tập

- Hiểu **bất phương trình** vs phương trình — và ý nghĩa "tập nghiệm".
- Giải bất phương trình bậc 1 và bậc 2.
- Áp dụng **xét dấu tam thức bậc 2**.
- Vẽ **miền nghiệm** trên trục số.

## Kiến thức tiền đề

- [Lesson 04 — Phương trình bậc 2](../lesson-04-quadratic-equations/).

---

## 1. Bất phương trình

### 1.1. Định nghĩa

**Bất phương trình** = "phương trình" nhưng thay dấu `=` bằng `<`, `>`, `≤`, `≥`.

💡 **Là gì**: nếu phương trình hỏi "x nào làm 2 vế bằng nhau", bất phương trình hỏi "x nào làm vế trái nhỏ hơn (hoặc lớn hơn) vế phải".

**Vì sao cần?** Vì rất nhiều bài toán cần điều kiện "lớn hơn", "nhỏ hơn":
- Tốc độ xe phải < 80 km/h.
- Nhiệt độ phải ≥ 20°C để hoa nở.
- Lợi nhuận > 0 (doanh nghiệp lãi).

**Tập nghiệm** = tập hợp mọi x thỏa mãn — thường là **khoảng** trên trục số, không phải điểm.

### 1.2. Quy tắc giải

Giống phương trình, NHƯNG:

⚠ **Khi nhân/chia cả 2 vế với số ÂM, phải đảo dấu bất đẳng thức** (< ↔ >, ≤ ↔ ≥).

**Lý do**: nhân với số âm "lật" toàn bộ thứ tự trên trục số.

### 1.3. Ví dụ

**Ví dụ 1**: `2x + 3 < 11`. Chuyển 3: 2x < 8. Chia 2 (dương): **x < 4**. Tập nghiệm: (−∞, 4).

**Ví dụ 2**: `−3x + 6 ≥ 0`. Chuyển 6: −3x ≥ −6. Chia −3 (ÂM, ĐẢO DẤU): **x ≤ 2**. Tập nghiệm: (−∞, 2].

---

## 2. Bất phương trình bậc 2 — Xét dấu tam thức

### 2.1. Tam thức bậc 2

**Tam thức** f(x) = ax² + bx + c.

**Quy tắc xét dấu** (với a > 0, Δ > 0, nghiệm x₁ < x₂):

```
Dấu f(x): +   −   +
         |   |   |
         x₁  x₂
```

- **Bên ngoài 2 nghiệm**: f(x) **cùng dấu** với a.
- **Bên trong 2 nghiệm**: f(x) **trái dấu** với a.

Quy tắc nhớ: "**trong trái, ngoài cùng**".

### 2.2. Walk-through giải bất phương trình bậc 2

Giải `x² − 5x + 6 < 0`.
- Tìm nghiệm: x² − 5x + 6 = 0 → x = 2 hoặc x = 3.
- a = 1 > 0 → ngoài 2 nghiệm: +; trong: −.
- BPT < 0 → cần phần "trong" → **2 < x < 3**.

Giải `x² − 5x + 6 ≥ 0`:
- Cần "+" hoặc 0 → ngoài 2 nghiệm hoặc tại nghiệm → **x ≤ 2 hoặc x ≥ 3**.

### 2.3. Ba trường hợp Δ

- **Δ > 0**: 2 nghiệm phân biệt, áp dụng "trong trái ngoài cùng".
- **Δ = 0**: 1 nghiệm kép → f(x) ≥ 0 cho mọi x (a > 0) hoặc ≤ 0 (a < 0), dấu "=" tại nghiệm.
- **Δ < 0**: KHÔNG nghiệm → f(x) cùng dấu a cho mọi x.

---

## 3. Bài tập

### Bài tập

**Bài 1**: Giải `3x − 5 ≥ 2x + 1`.

**Bài 2**: Giải `−2x + 7 < 1`.

**Bài 3**: Giải `x² − 4x + 3 > 0`.

**Bài 4**: Giải `2x² + 5x − 3 ≤ 0`.

**Bài 5**: Giải `x² + 4 > 0` (chú ý Δ).

**Bài 6**: Giải `−x² + 6x − 9 ≥ 0`.

### Lời giải

**Bài 1**: 3x − 2x ≥ 1 + 5 → **x ≥ 6**.

**Bài 2**: −2x < −6. Chia −2 (đảo dấu): **x > 3**.

**Bài 3**: Nghiệm PT x² − 4x + 3 = 0: x = 1, x = 3. a = 1 > 0. BPT > 0 → ngoài → **x < 1 hoặc x > 3**.

**Bài 4**: Nghiệm: x = (−5 ± 7)/4 = 1/2 hoặc −3. a = 2 > 0. BPT ≤ 0 → trong → **−3 ≤ x ≤ 1/2**.

**Bài 5**: Δ = 0 − 16 = −16 < 0. a = 1 > 0 → f(x) > 0 cho mọi x → tập nghiệm = **ℝ**.

**Bài 6**: Đổi dấu nhân −1: x² − 6x + 9 ≤ 0. Nghiệm: (x − 3)² ≤ 0. Vì (x−3)² ≥ 0 luôn → chỉ = 0 khi **x = 3**. Tập nghiệm: **{3}**.

---

## 4. Bài tiếp theo

[Lesson 06 — Lũy thừa, căn, logarit](../lesson-06-powers-roots-logs/).

## 📝 Tổng kết

1. **BPT**: thay = bằng <, >, ≤, ≥. Nghiệm = khoảng.
2. **Quy tắc**: như PT, NHƯNG nhân/chia số âm → đảo dấu.
3. **Tam thức bậc 2**: trong trái, ngoài cùng (so với a).
4. Δ < 0 → f(x) cùng dấu a cho mọi x.
