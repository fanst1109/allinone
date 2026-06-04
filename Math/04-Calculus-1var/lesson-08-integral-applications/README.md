# Lesson 08 — Ứng dụng tích phân

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
```
S = ∫_a^b [f(x) - g(x)] dx
```

💡 **Trực giác**: Diện tích = hiệu giữa diện tích "trần" (f) và "sàn" (g).

**Ví dụ**: Tính diện tích giới hạn bởi y = x² và y = x.
- Tìm giao điểm: x² = x → x = 0, 1.
- Trên [0, 1], x ≥ x² → f = x, g = x².
- S = ∫_0^1 (x - x²) dx = [x²/2 - x³/3]_0^1 = 1/2 - 1/3 = **1/6**.

⚠ **Nếu 2 đường giao nhau nhiều lần**, phải chia nhỏ và lấy |f - g|.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết đường nào là 'trần' (f) đường nào là 'sàn' (g)?"* Trên mỗi khoảng, thử một điểm: đường có giá trị **lớn hơn** là trần. Vd trên `(0,1)`, tại `x=0.5`: `x = 0.5 > x² = 0.25` → `y=x` là trần. Nếu thứ tự đảo trên khoảng khác → phải chia đoạn.
- *"Cận tích phân lấy từ đâu?"* Từ **giao điểm** của hai đường (giải `f = g`). Ở ví dụ: `x² = x → x = 0, 1` → cận `[0,1]`.

⚠ **Lỗi thường gặp — không xét đường nào trên/dưới, ra diện tích âm**. Nếu lấy `∫(x² − x)dx` (sàn trừ trần) trên `[0,1]` ra `−1/6 < 0` — diện tích không thể âm. Phải lấy `trần − sàn = ∫(x − x²)dx = 1/6`. Diện tích luôn lấy `|f − g|` hoặc xác định đúng thứ tự.

🔁 **Dừng lại tự kiểm tra**

1. Diện tích giữa `y = x` và `y = x³` trên `[0, 1]` (đường nào trên?).
2. Cận tích phân của diện tích giữa `y = x²` và `y = 2x` là gì?

<details><summary>Đáp án</summary>

1. Tại `x=0.5`: `x=0.5 > x³=0.125` → `y=x` trên. `S = ∫_0^1 (x − x³)dx = [x²/2 − x⁴/4]_0^1 = 1/2 − 1/4 = 1/4`.
2. Giao: `x² = 2x → x = 0, 2` → cận `[0, 2]`.

</details>

### 📝 Tóm tắt mục 1

- Diện tích giữa hai đường: `S = ∫_a^b (trần − sàn) dx`, cận = giao điểm.
- Xác định trần/sàn bằng cách thử điểm; nếu đổi thứ tự giữa chừng → **chia đoạn**.
- Diện tích luôn ≥ 0; lấy `|f − g|` để tránh kết quả âm.

---

## 2. Thể tích vật thể tròn xoay — Phương pháp đĩa

🎯 **Bài toán**: Quay đồ thị y = f(x) ≥ 0 trên [a, b] quanh trục Ox → khối tròn xoay. V = ?

💡 **Ý tưởng**: Cắt vật bằng các mặt phẳng vuông góc trục → mỗi lát là **đĩa tròn** bán kính f(x), độ dày dx.
- dV = π·f(x)² · dx.
- V = ∫_a^b π·f(x)² dx.

**Ví dụ**: Quay y = √x trên [0, 4] quanh Ox.
- V = π·∫_0^4 x dx = π·[x²/2]_0^4 = π·8 = **8π**.

> 📐 **Định nghĩa đầy đủ — Thể tích vật tròn xoay (đĩa)**
>
> **(a) Là gì**: Khối được tạo bằng cách quay đường cong y = f(x) (với f ≥ 0) trên đoạn [a, b] quanh trục Ox tạo nên 1 vật 3D đối xứng. Cắt vật bằng mặt phẳng vuông trục → mỗi lát là **đĩa tròn** bán kính f(x), độ dày dx. Tổng các đĩa = V = π·∫f(x)² dx.
>
> **(b) Vì sao cần**: Vì nhiều hình 3D không có công thức V đơn giản — bình hoa, mặt ly, các bộ phận quay (trục, bánh xe có khía). Trước Calculus, Archimedes đã tính V cầu bằng phương pháp này (thủ công, mất nhiều trang). FTC + nguyên hàm biến nó thành phép tính 5 phút. Cốt lõi của thiết kế cơ khí (mô-men quán tính), hoá học (thể tích bình phản ứng), y học (CT scan = tích phân khúc xạ tia X).
>
> **(c) Ví dụ số**: Quay y = √x trên [0, 4] quanh Ox: V = π·∫_0^4 x dx = π·8 = **8π** ≈ 25.13. Quay y = x trên [0, 3] → nón cao 3, R=3: V = π·∫_0^3 x² dx = π·9 = 9π. Kiểm công thức nón (1/3)πR²h = (1/3)π·9·3 = 9π ✓. Cầu R = 2: quay y = √(4−x²) trên [−2, 2]: V = π·∫_{-2}^2 (4−x²)dx = π·[4x−x³/3]_{-2}^2 = π·(8/3−(−8/3) + 8 − (−8)) = ... = (32π/3). Kiểm (4/3)π·8 = 32π/3 ✓.

### Hình cầu (ví dụ kinh điển)

Quay nửa đường tròn y = √(R² - x²) quanh Ox:
- V = π·∫_{-R}^R (R² - x²) dx = π·[R²x - x³/3]_{-R}^R = π·(R³·2 - 2R³/3) = **(4/3)·π·R³** ✓.

Khớp công thức hình cầu — đây là cách Archimedes phát hiện (trước khi có Calculus chính thức).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có `f(x)²` chứ không phải `f(x)`?"* Vì mỗi lát cắt là **đĩa tròn** bán kính `f(x)`, diện tích đĩa `= π·(bán kính)² = π·f(x)²`. Bình phương đến từ diện tích hình tròn, không phải nhầm lẫn.
- *"Quay quanh trục Ox và Oy khác nhau ra sao?"* Quay quanh Ox dùng đĩa (`π∫f²dx`); quay quanh Oy thường dùng vỏ trụ (mục 3) hoặc đổi sang biến `y`. Chọn sai trục → công thức sai.

⚠ **Lỗi thường gặp — quên bình phương `f(x)`**. Viết `V = π∫f(x)dx` (thiếu bình phương) là sai — đó là công thức diện tích, không phải thể tích. Đĩa cần `π·f(x)²`. Vd quay `y=√x` trên `[0,4]`: đúng `π∫_0^4 (√x)² dx = π∫x dx = 8π`; nếu quên bình phương ra `π∫√x dx = (16/3)π` — sai.

🔁 **Dừng lại tự kiểm tra**

1. Quay `y = x` trên `[0, 3]` quanh Ox. `V = ?` (kiểm bằng công thức nón).
2. Vì sao lát cắt vuông góc Ox lại là hình tròn?

<details><summary>Đáp án</summary>

1. `V = π∫_0^3 x² dx = π[x³/3]_0^3 = 9π`. Nón đáy `R=3` cao `h=3`: `(1/3)πR²h = (1/3)π·9·3 = 9π` ✓.
2. Vì quay quanh Ox, mỗi điểm `(x, f(x))` vạch một đường tròn bán kính `f(x)` → lát cắt là hình tròn.

</details>

### 📝 Tóm tắt mục 2

- Quay `y=f(x)` quanh Ox: `V = π∫_a^b f(x)² dx` (đĩa, bán kính `f(x)`).
- **Đừng quên bình phương** — bình phương đến từ diện tích hình tròn `πr²`.
- Kiểm bằng công thức quen (nón `(1/3)πR²h`, cầu `(4/3)πR³`).

---

## 3. Thể tích — Phương pháp vỏ trụ (Shell)

Khi quay quanh trục Oy, dùng vỏ trụ thay vì đĩa:
```
V = 2π·∫_a^b x·f(x) dx
```

💡 **Mỗi vỏ trụ** bán kính x, chiều cao f(x), độ dày dx → thể tích = 2πx·f(x)·dx (chu vi × cao × dày).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quay quanh Oy lại dùng vỏ trụ thay vì đĩa?"* Vì khi quay quanh Oy, để dùng đĩa ta phải biểu diễn `x` theo `y` (đảo hàm) — nhiều khi khó. Vỏ trụ giữ nguyên biến `x`: tưởng tượng "lột" vật thành các ống trụ mỏng lồng nhau, mỗi ống bán kính `x`.
- *"`2πx` ở đâu ra?"* Đó là **chu vi** của vỏ trụ bán kính `x` (chu vi đường tròn `= 2πr`). Trải phẳng vỏ trụ thành tấm: rộng `2πx`, cao `f(x)`, dày `dx` → thể tích `2πx·f(x)·dx`.

⚠ **Lỗi thường gặp — lẫn công thức đĩa và vỏ trụ**. Đĩa (quanh Ox): `π∫f²dx`. Vỏ trụ (quanh Oy): `2π∫x·f(x)dx`. Dùng nhầm đĩa cho trục Oy hoặc quên thừa số `2π` đều ra sai. Xác định **trục quay** trước khi chọn công thức.

🔁 **Dừng lại tự kiểm tra**

1. Quay `y = x²` trên `[0, 2]` quanh Oy bằng vỏ trụ. `V = ?`
2. Thừa số `2πx` trong công thức vỏ trụ biểu thị gì?

<details><summary>Đáp án</summary>

1. `V = 2π∫_0^2 x·x² dx = 2π∫_0^2 x³ dx = 2π[x⁴/4]_0^2 = 2π·4 = 8π`.
2. Chu vi đường tròn bán kính `x` (`= 2πx`) — bề rộng khi trải phẳng vỏ trụ.

</details>

### 📝 Tóm tắt mục 3

- Quay quanh Oy: `V = 2π∫_a^b x·f(x) dx` (vỏ trụ, giữ biến `x`).
- `2πx` = chu vi vỏ trụ; `f(x)` = chiều cao; `dx` = độ dày.
- Xác định **trục quay** để chọn đúng đĩa (Ox) vs vỏ trụ (Oy).

---

## 4. Độ dài cung đường cong

Cho y = f(x) trên [a, b]:
```
L = ∫_a^b √(1 + (f'(x))²) dx
```

💡 **Trực giác**: Cắt cung thành các đoạn nhỏ √(dx² + dy²) = √(1 + (dy/dx)²) · dx.

**Ví dụ**: Độ dài cung y = x^(3/2) trên [0, 1].
- f'(x) = (3/2)·x^(1/2).
- L = ∫_0^1 √(1 + 9x/4) dx.
- u = 1 + 9x/4, du = (9/4) dx.
- = (4/9)·∫_1^(13/4) √u du = (4/9)·(2/3)·u^(3/2)|_1^(13/4) = (8/27)·[(13/4)^(3/2) - 1] ≈ **1.44**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Công thức `√(1+(f')²)` từ đâu?"* Định lý Pythagoras cho đoạn cung nhỏ: chiều ngang `dx`, chiều dọc `dy = f'(x)dx`, độ dài đoạn `= √(dx² + dy²) = √(1 + (f')²)·dx`. Cộng dồn (tích phân) → tổng độ dài.
- *"Vì sao tích phân độ dài cung thường khó tính?"* Vì `√(1+(f')²)` hiếm khi có nguyên hàm sơ cấp đẹp. Vd đường tròn, parabol cho tích phân phức tạp — thường phải đổi biến khéo hoặc tính số.

⚠ **Lỗi thường gặp — quên số `1` dưới căn**. Công thức là `√(1 + (f')²)`, KHÔNG phải `√((f')²) = |f'|`. Bỏ số 1 sẽ cho kết quả sai (thiếu đóng góp chiều ngang `dx`). Vd `y = 2x` trên `[0,3]`: đúng `∫√(1+4)dx = 3√5`; quên số 1 ra `∫√4 dx = 6` — sai.

🔁 **Dừng lại tự kiểm tra**

1. Độ dài `y = 3x` từ `x=0` đến `x=4` (kiểm bằng khoảng cách hai điểm).
2. Vì sao đoạn cung nhỏ dài `√(1+(f')²)·dx`?

<details><summary>Đáp án</summary>

1. `f'=3`, `L = ∫_0^4 √(1+9)dx = √10·4 = 4√10 ≈ 12.65`. Hai điểm `(0,0),(4,12)`: `√(16+144) = √160 = 4√10` ✓.
2. Pythagoras: `√(dx² + dy²)` với `dy = f'·dx` → `√(dx²(1+(f')²)) = √(1+(f')²)·dx`.

</details>

### 📝 Tóm tắt mục 4

- Độ dài cung `y=f(x)` trên `[a,b]`: `L = ∫_a^b √(1+(f'(x))²) dx`.
- Công thức từ Pythagoras cho đoạn cung nhỏ (`dx` ngang, `f'dx` dọc).
- **Đừng quên số 1** dưới căn; tích phân này thường khó, có khi phải tính số.

---

## 5. Giá trị trung bình của hàm

```
f_tb = (1/(b-a))·∫_a^b f(x) dx
```

💡 **Trực giác**: Diện tích chia chiều rộng = chiều cao "trung bình" của đồ thị.

**Ví dụ**: Giá trị trung bình của sin x trên [0, π].
- = (1/π)·∫_0^π sin x dx = (1/π)·[-cos x]_0^π = (1/π)·(1 + 1) = **2/π ≈ 0.637**.

⟶ Giá trị trung bình của sóng sin nửa chu kỳ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia cho `(b−a)`?"* Vì `∫_a^b f dx` là **diện tích** (tổng tích lũy), chia cho bề rộng `(b−a)` cho ra **chiều cao trung bình** — đúng nghĩa "trung bình". Tương tự trung bình rời rạc `(tổng)/(số phần tử)`.
- *"Giá trị trung bình có nằm trong khoảng giá trị của hàm không?"* Có (định lý giá trị trung bình tích phân): với `f` liên tục, tồn tại `c ∈ [a,b]` mà `f(c) = f_tb`. Vd `sin x` trên `[0,π]` có `f_tb = 2/π ≈ 0.637`, nằm trong `[0,1]`.

⚠ **Lỗi thường gặp — quên chia cho `(b−a)`**. `f_tb = ∫_a^b f dx / (b−a)`, KHÔNG phải chỉ `∫_a^b f dx`. Vd trung bình của `x²` trên `[0,2]`: đúng `(1/2)∫_0^2 x²dx = (1/2)(8/3) = 4/3`; quên chia ra `8/3` — sai (và lớn hơn cả giá trị max `4`, vô lý).

🔁 **Dừng lại tự kiểm tra**

1. Giá trị trung bình của `f(x) = x` trên `[0, 4]`.
2. Giá trị trung bình của hàm hằng `f(x) = 7` trên `[2, 9]`?

<details><summary>Đáp án</summary>

1. `(1/4)∫_0^4 x dx = (1/4)[x²/2]_0^4 = (1/4)·8 = 2` (đúng bằng trung điểm, vì `x` tuyến tính).
2. `7` (trung bình của hằng số luôn bằng chính nó).

</details>

### 📝 Tóm tắt mục 5

- `f_tb = (1/(b−a))·∫_a^b f(x) dx` = diện tích chia bề rộng = chiều cao trung bình.
- **Đừng quên chia `(b−a)`**.
- Với `f` liên tục, `f_tb` thực sự đạt được tại một điểm `c ∈ [a,b]` (MVT tích phân).

---

## 6. Ứng dụng vật lý

### 6.1. Công cơ học

Lực biến thiên F(x) tác động lên vật từ a đến b:
```
W = ∫_a^b F(x) dx
```

**Ví dụ**: Lò xo Hooke F = kx. Công kéo lò xo từ 0 đến x:
- W = ∫_0^x k·t dt = (1/2)·k·x².

### 6.2. Khối tâm thanh

Thanh mỏng có mật độ ρ(x) trên [a, b]:
```
x_cm = ∫_a^b x·ρ(x) dx / ∫_a^b ρ(x) dx
```

### 6.3. Quãng đường khi vận tốc biến thiên

```
s = ∫_a^b v(t) dt
```

💡 **Trực giác — vì sao tích phân là "tổng tích lũy"**: nhiều đại lượng vật lý = tích của hai thứ (công = lực × quãng đường, quãng đường = vận tốc × thời gian). Khi một thừa số **biến thiên**, không nhân thẳng được — phải chia nhỏ, nhân trên từng mảnh, rồi cộng dồn = tích phân.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công lò xo là `(1/2)kx²` chứ không `kx·x`?"* Vì lực `F = kx` **tăng dần** khi kéo, không phải hằng. Phải tích phân: `W = ∫_0^x kt\, dt = (1/2)kx²`. Nếu lực hằng thì mới `W = F·d`.
- *"`∫v(t)dt` cho quãng đường hay độ dời?"* Cho **độ dời** (có dấu). Nếu vật đổi chiều, muốn **quãng đường thực** phải lấy `∫|v(t)|dt` (giống diện tích thật vs diện tích có dấu ở L07).

⚠ **Lỗi thường gặp — dùng `W = F·d` khi lực biến thiên**. Công thức `W = F·d` chỉ đúng khi `F` **hằng**. Với `F(x)` thay đổi (lò xo, hấp dẫn theo độ cao) phải `W = ∫F dx`. Vd lò xo `F=kx`: dùng `F·d = kx·x = kx²` ra **gấp đôi** giá trị đúng `(1/2)kx²`.

🔁 **Dừng lại tự kiểm tra**

1. Lực `F(x) = 6x` N kéo vật từ `x=0` đến `x=2` m. Công?
2. Vận tốc `v(t) = 3t²`. Độ dời từ `t=0` đến `t=2`?

<details><summary>Đáp án</summary>

1. `W = ∫_0^2 6x dx = [3x²]_0^2 = 12 J`.
2. `s = ∫_0^2 3t² dt = [t³]_0^2 = 8 m`.

</details>

### 📝 Tóm tắt mục 6

- Tích phân = **tổng tích lũy** khi một thừa số biến thiên: `W=∫F dx`, `s=∫v dt`.
- Công lò xo `W=(1/2)kx²` (lực `kx` biến thiên) — KHÔNG dùng `F·d`.
- `∫v dt` = độ dời (có dấu); quãng đường thực = `∫|v|dt`.

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
