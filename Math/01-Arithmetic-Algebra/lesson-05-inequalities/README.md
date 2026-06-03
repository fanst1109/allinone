# Lesson 05 — Bất phương trình

## Mục tiêu học tập

- Hiểu **bất phương trình** vs phương trình — và ý nghĩa "tập nghiệm".
- Giải bất phương trình bậc 1 và bậc 2.
- Áp dụng **xét dấu tam thức bậc 2**.
- Vẽ **miền nghiệm** trên trục số.
- Dùng **ký hiệu khoảng** (hợp/giao) và giải **bất phương trình chứa trị tuyệt đối |x|**.

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

### 1.4. Verify nghiệm BPT bằng cách thử điểm

Tập nghiệm là khoảng → **thử 1 điểm trong và 1 điểm ngoài**. Vd 1 (`x<4`): thử `x=0` (trong): `2·0+3 = 3 < 11` ✓; thử `x=5` (ngoài): `13 < 11` sai ✓ (đúng là ngoài tập).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nhân số âm phải đảo dấu?"* Vì số âm "lật" thứ tự trục số. `3 < 5` đúng, nhân cả 2 với `−1`: `−3` và `−5`, mà `−3 > −5` → phải đổi `<` thành `>`.
- *"Ngoặc tròn `(` hay vuông `[` khi nào?"* Vuông `[ ]` khi **lấy cả** đầu mút (dấu `≤, ≥`); tròn `( )` khi **không lấy** (dấu `<, >`, và luôn dùng cho `±∞`).

🔁 **Dừng lại tự kiểm tra**: giải `−2x + 1 ≥ 7`.

<details><summary>Đáp án</summary>

`−2x ≥ 6` → chia `−2` (đảo dấu) → `x ≤ −3`. Tập nghiệm `(−∞, −3]`.

</details>

### 📝 Tóm tắt mục 1

- BPT thay `=` bằng `<, >, ≤, ≥`; nghiệm là **khoảng**, không phải điểm.
- Giải như PT, **nhưng** nhân/chia số âm → **đảo chiều** dấu.
- `[ ]` lấy đầu mút, `( )` không lấy; `∞` luôn dùng `(`.

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

### 2.4. Bảng xét dấu bằng số thật

Với `f(x) = x² − 5x + 6` (nghiệm 2, 3; a=1>0), thử từng vùng:

| Vùng | Điểm thử | f(điểm) | Dấu |
|------|----------|---------|:---:|
| x < 2 | x = 0 | `0−0+6 = 6` | + |
| 2 < x < 3 | x = 2.5 | `6.25−12.5+6 = −0.25` | − |
| x > 3 | x = 4 | `16−20+6 = 2` | + |

Đúng "trong trái (−), ngoài cùng (+)". Thử điểm là cách **không cần nhớ quy tắc** vẫn ra dấu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"`x²+1 > 0` giải sao khi không có nghiệm?"* `Δ = −4 < 0`, `a>0` → f(x) **luôn dương** → BPT đúng với **mọi x** (tập nghiệm ℝ). Không cần xét dấu phức tạp.
- *"Lấy 'trong' hay 'ngoài'?"* Nhìn dấu BPT: cần `f(x)<0` → lấy vùng dấu `−`; cần `f(x)>0` → lấy vùng dấu `+`.

🔁 **Dừng lại tự kiểm tra**: giải `x² − x − 6 > 0`.

<details><summary>Đáp án</summary>

Nghiệm `x²−x−6=0`: `x = 3, x = −2`. `a>0`, cần `>0` → lấy **ngoài**: `x < −2 hoặc x > 3`.

</details>

### 📝 Tóm tắt mục 2

- Tam thức bậc 2: "trong trái, ngoài cùng" so với dấu của `a`.
- Verify nhanh bằng **thử 1 điểm mỗi vùng**.
- `Δ<0` → f(x) cùng dấu `a` với mọi x (BPT thành luôn đúng/luôn sai).

---

## 3. Bất phương trình trị tuyệt đối & ký hiệu khoảng

### 3.1. Ký hiệu khoảng, hợp và giao

Tập nghiệm BPT thường viết bằng **khoảng**:
- `(a, b)`: `a < x < b` (không lấy mút). `[a, b]`: `a ≤ x ≤ b` (lấy cả 2 mút).
- `[a, b)`, `(a, b]`: lấy một mút.
- **Hợp** `∪`: gộp 2 khoảng rời. Vd `x < −2 hoặc x > 3` viết `(−∞, −2) ∪ (3, +∞)`.
- **Giao** `∩`: phần chung. Vd `x > 1 và x < 5` viết `(1, 5)`.

### 3.2. Bất phương trình chứa |x|

💡 **Trực giác**: `|x|` là **khoảng cách từ x tới 0** trên trục số. Nên:
- `|x| < k` (k>0) ⟺ x **gần 0 hơn k** ⟺ `−k < x < k`. (một khoảng)
- `|x| > k` (k>0) ⟺ x **xa 0 hơn k** ⟺ `x < −k hoặc x > k`. (hai khoảng)

**Ví dụ 1**: `|x| < 3` ⟺ `−3 < x < 3`, tức `(−3, 3)`.

**Ví dụ 2**: `|x − 2| ≤ 5` ⟺ `−5 ≤ x−2 ≤ 5` ⟺ `−3 ≤ x ≤ 7`, tức `[−3, 7]`.

**Ví dụ 3**: `|2x + 1| > 3` ⟺ `2x+1 > 3` hoặc `2x+1 < −3` ⟺ `x > 1` hoặc `x < −2`, tức `(−∞,−2) ∪ (1,+∞)`.

⚠ **Lỗi thường gặp**: nhầm chiều. `|x| < k` ra **một** khoảng (ở giữa); `|x| > k` ra **hai** khoảng (hai bên). Đừng đảo. Cũng lưu ý `|x| < −2` **vô nghiệm** (khoảng cách không thể âm), `|x| > −2` **đúng với mọi x**.

❓ **Câu hỏi tự nhiên của người đọc**: *"`|x−2|` nghĩa là gì?"* Là **khoảng cách từ x tới 2**. `|x−2| ≤ 5` = "các x cách 2 không quá 5 đơn vị" = `[−3, 7]`.

🔁 **Dừng lại tự kiểm tra**: giải `|x + 1| < 4`.

<details><summary>Đáp án</summary>

`−4 < x+1 < 4` → `−5 < x < 3`, tức `(−5, 3)`.

</details>

### 📝 Tóm tắt mục 3

- Khoảng: `[ ]` lấy mút, `( )` không; `∪` hợp (rời), `∩` giao (chung).
- `|x| < k` → một khoảng `(−k, k)`; `|x| > k` → hai khoảng.
- `|x − a|` = khoảng cách từ x tới a.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Giải `3x − 5 ≥ 2x + 1`.

**Bài 2**: Giải `−2x + 7 < 1`.

**Bài 3**: Giải `x² − 4x + 3 > 0`.

**Bài 4**: Giải `2x² + 5x − 3 ≤ 0`.

**Bài 5**: Giải `x² + 4 > 0` (chú ý Δ).

**Bài 6**: Giải `−x² + 6x − 9 ≥ 0`.

**Bài 7**: Giải `|x − 1| < 3` và viết tập nghiệm bằng ký hiệu khoảng.

**Bài 8**: Giải `|2x + 3| ≥ 5`.

### Lời giải

**Bài 1**: 3x − 2x ≥ 1 + 5 → **x ≥ 6**.

**Bài 2**: −2x < −6. Chia −2 (đảo dấu): **x > 3**.

**Bài 3**: Nghiệm PT x² − 4x + 3 = 0: x = 1, x = 3. a = 1 > 0. BPT > 0 → ngoài → **x < 1 hoặc x > 3**.

**Bài 4**: Nghiệm: x = (−5 ± 7)/4 = 1/2 hoặc −3. a = 2 > 0. BPT ≤ 0 → trong → **−3 ≤ x ≤ 1/2**.

**Bài 5**: Δ = 0 − 16 = −16 < 0. a = 1 > 0 → f(x) > 0 cho mọi x → tập nghiệm = **ℝ**.

**Bài 6**: Đổi dấu nhân −1: x² − 6x + 9 ≤ 0. Nghiệm: (x − 3)² ≤ 0. Vì (x−3)² ≥ 0 luôn → chỉ = 0 khi **x = 3**. Tập nghiệm: **{3}**.

**Bài 7**: `|x−1| < 3` ⟺ `−3 < x−1 < 3` ⟺ `−2 < x < 4`. Tập nghiệm: **(−2, 4)**.

**Bài 8**: `|2x+3| ≥ 5` ⟺ `2x+3 ≥ 5` hoặc `2x+3 ≤ −5` ⟺ `x ≥ 1` hoặc `x ≤ −4`. Tập nghiệm: **(−∞, −4] ∪ [1, +∞)**.

---

## 5. Bài tiếp theo

[Lesson 06 — Lũy thừa, căn, logarit](../lesson-06-powers-roots-logs/).

## 📝 Tổng kết

1. **BPT**: thay = bằng <, >, ≤, ≥. Nghiệm = khoảng.
2. **Quy tắc**: như PT, NHƯNG nhân/chia số âm → đảo dấu.
3. **Tam thức bậc 2**: trong trái, ngoài cùng (so với a).
4. Δ < 0 → f(x) cùng dấu a cho mọi x.
