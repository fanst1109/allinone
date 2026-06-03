# Lesson 07 — Hàm số

## Mục tiêu

- Hiểu **hàm số** là gì — gán mỗi input một output duy nhất.
- Biết các khái niệm: **tập xác định (domain)**, **tập giá trị (range)**, **hàm hợp**.
- Đọc và vẽ **đồ thị** hàm số.
- Phân biệt hàm **đơn ánh**, **toàn ánh**, **song ánh**.
- Nhận biết **hàm chẵn/lẻ** (đối xứng) và **hàm từng khúc (piecewise)**.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Hàm số

### 1.1. Định nghĩa

**Hàm số** = quy tắc gán **mỗi giá trị x trong tập A** với **đúng MỘT giá trị y trong tập B**.

Viết: `f: A → B`, `y = f(x)`.

💡 **Là gì**: hàm số như một "cái máy" — bỏ input x vào → ra output y duy nhất.

**Vì sao quan trọng?** Vì:
- Hàm số mô hình hóa **mọi quan hệ** trong khoa học: lực phụ thuộc khối lượng, tốc độ phụ thuộc thời gian...
- Là **đối tượng nghiên cứu chính** của giải tích (đạo hàm, tích phân của hàm).
- Là **building block** của lập trình.

### 1.2. Các khái niệm

- **Tập xác định D (domain)**: tập các x mà f(x) có nghĩa.
- **Tập giá trị E (range)**: tập các y có thể nhận được.
- Vd `f(x) = √x`: D = [0, +∞), E = [0, +∞).
- Vd `g(x) = 1/x`: D = ℝ\{0}, E = ℝ\{0}.

### 1.3. Hàm hợp

**(f∘g)(x) = f(g(x))**: áp dụng g trước, rồi f.

Ví dụ: f(x) = x², g(x) = x + 1. 
- (f∘g)(x) = f(g(x)) = (x+1)².
- (g∘f)(x) = g(f(x)) = x² + 1.

Lưu ý: **f∘g ≠ g∘f** thường.

⚠ **Lỗi thường gặp khi tìm tập xác định**: chú ý 2 trường hợp làm biểu thức "vô nghĩa": **mẫu = 0** (vd `1/x` cần `x≠0`) và **căn bậc chẵn của số âm** (vd `√x` cần `x≥0`). Bỏ sót điều kiện này là lỗi phổ biến nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mỗi x chỉ được 1 y? Quan hệ 1-nhiều thì sao?"* Quan hệ 1 x → nhiều y **không phải hàm số** (vd `x² + y² = 1`). Tính "duy nhất" của output là điều kiện cốt lõi để gọi là hàm.
- *"`(f∘g)` và `(g∘f)` có bao giờ bằng nhau không?"* Có, trường hợp đặc biệt — ví dụ khi `g = f⁻¹` thì cả hai bằng `x`. Nhưng nói chung khác nhau.

🔁 **Dừng lại tự kiểm tra**: cho `f(x) = 2x`, `g(x) = x+3`. Tính `(f∘g)(1)` và `(g∘f)(1)`.

<details><summary>Đáp án</summary>

`(f∘g)(1) = f(4) = 8`; `(g∘f)(1) = g(2) = 5`. Khác nhau → `f∘g ≠ g∘f`.

</details>

### 📝 Tóm tắt mục 1

- Hàm số: mỗi `x` ↔ **đúng 1** `y`. `f: A → B`, `y = f(x)`.
- Domain D = các x hợp lệ (tránh chia 0, căn số âm); Range E = các y nhận được.
- Hàm hợp `(f∘g)(x) = f(g(x))`; thường `f∘g ≠ g∘f`.

---

## 2. Đồ thị hàm số

### 2.1. Khái niệm

**Đồ thị f** = tập các điểm (x, f(x)) trên mặt phẳng Oxy.

💡 **Là gì**: cách "vẽ" hàm số để thấy hành vi.

### 2.2. Test đường thẳng đứng

Một đường cong trên mặt phẳng là đồ thị của 1 hàm số ⟺ **mọi đường thẳng đứng cắt nó tại tối đa 1 điểm**.

- Đường thẳng y = x: hàm. ✓
- Parabol y = x²: hàm. ✓
- Đường tròn x² + y² = 1: KHÔNG phải hàm (vì 1 x có thể cho 2 y).

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao 'đường thẳng đứng' lại là phép thử?"* Vì đường thẳng đứng `x = c` gom tất cả các điểm có **cùng** `x = c`. Nếu nó cắt đồ thị ở 2 điểm → có 2 giá trị y cho cùng 1 x → vi phạm tính "duy nhất" → không phải hàm.

🔁 **Dừng lại tự kiểm tra**: parabol nằm ngang `x = y²` có phải đồ thị hàm `y = f(x)` không?

<details><summary>Đáp án</summary>

**Không**. Vd `x=4` cho `y=2` và `y=−2` → đường thẳng đứng cắt 2 điểm.

</details>

### 📝 Tóm tắt mục 2

- Đồ thị f = tập điểm `(x, f(x))` trên Oxy.
- **Test đường thẳng đứng**: cắt tối đa 1 điểm ⟺ là đồ thị hàm số.

---

## 3. Đơn / Toàn / Song ánh

- **Đơn ánh (injective)**: mọi x khác nhau → y khác nhau. (Không có 2 input cho cùng output.)
- **Toàn ánh (surjective)**: mọi y trong tập đích đều đạt được.
- **Song ánh (bijective)**: vừa đơn vừa toàn → có **hàm ngược** f⁻¹.

Ví dụ:
- f(x) = x²: KHÔNG đơn ánh (vì f(2) = f(−2) = 4).
- f(x) = x³: song ánh.
- f(x) = eˣ (từ ℝ → (0,∞)): song ánh, hàm ngược là ln(x).

💡 **Trực giác**: **đơn ánh** = "không đụng hàng" (không 2 input ra cùng output); **toàn ánh** = "phủ kín" (mọi output đều có người chọn); **song ánh** = vừa không đụng hàng vừa phủ kín → ghép cặp 1-1 hoàn hảo → đảo ngược được.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ song ánh mới có hàm ngược?"* Vì hàm ngược phải gửi mỗi `y` về **đúng 1** `x`. Nếu không đơn ánh, 1 `y` ứng 2 `x` → không biết về cái nào. Nếu không toàn ánh, có `y` không có `x` → không định nghĩa được.
- *"`x²` không đơn ánh, vậy nó vô dụng?"* Không — chỉ cần **thu hẹp miền** về `[0,∞)` thì `x²` thành đơn ánh, có ngược là `√x`. Đó là lý do `√` định nghĩa cho x≥0.

🔁 **Dừng lại tự kiểm tra**: `f(x) = 2x + 1` có song ánh không? Hàm ngược?

<details><summary>Đáp án</summary>

Có (mọi hàm bậc 1 với a≠0 đều song ánh). Ngược: `y = 2x+1 → x = (y−1)/2 → f⁻¹(x) = (x−1)/2`.

</details>

### 📝 Tóm tắt mục 3

- Đơn ánh (input khác → output khác), toàn ánh (phủ hết đích), song ánh (cả hai).
- Chỉ **song ánh** mới có hàm ngược `f⁻¹`.
- Hàm không đơn ánh có thể "cứu" bằng cách thu hẹp miền.

---

## 4. Hàm chẵn, hàm lẻ & hàm từng khúc

### 4.1. Hàm chẵn / hàm lẻ

💡 **Trực giác**: đây là 2 kiểu **đối xứng** của đồ thị.
- **Hàm chẵn**: `f(−x) = f(x)` với mọi x → đồ thị **đối xứng qua trục y** (như soi gương). Vd `f(x)=x²`: `f(−3)=9=f(3)` ✓.
- **Hàm lẻ**: `f(−x) = −f(x)` → đồ thị **đối xứng qua gốc O** (quay 180°). Vd `f(x)=x³`: `f(−2)=−8=−f(2)` ✓.
- Đa số hàm **không chẵn cũng không lẻ**. Vd `f(x)=x+1`: `f(−1)=0`, nhưng `f(1)=2` và `−f(1)=−2` → không thỏa cả hai.

⚠ **Lỗi thường gặp**: tưởng "không chẵn thì phải lẻ". Sai — phần lớn hàm chẳng thuộc loại nào.

### 4.2. Hàm từng khúc (piecewise)

💡 **Là gì**: hàm dùng **công thức khác nhau trên các khoảng khác nhau** của x. Ví dụ kinh điển — trị tuyệt đối:
```
        ⎧  x    nếu x ≥ 0
|x| =   ⎨
        ⎩ −x    nếu x < 0
```
Tính `|−4|`: vì `−4 < 0` → dùng nhánh `−x` → `−(−4) = 4`.

**Ví dụ giá điện bậc thang** (đời sống): 
```
        ⎧ 1500·x          nếu x ≤ 50   (kWh)
giá =   ⎨
        ⎩ 75000 + 2500·(x−50)   nếu x > 50
```
Dùng 100 kWh: `x>50` → `75000 + 2500·50 = 200000` đồng.

❓ **Câu hỏi tự nhiên của người đọc**: *"Hàm từng khúc có còn là 'một hàm' không?"* Có — vẫn mỗi x cho đúng 1 y, chỉ là quy tắc tính đổi theo vùng. Test đường thẳng đứng vẫn qua.

🔁 **Dừng lại tự kiểm tra**: `f(x)=x²` chẵn hay lẻ? Còn `f(x)=x³−x`?

<details><summary>Đáp án</summary>

`x²` **chẵn** (`(−x)²=x²`). `x³−x` **lẻ**: `f(−x)=−x³+x = −(x³−x) = −f(x)`.

</details>

### 📝 Tóm tắt mục 4

- Hàm chẵn: `f(−x)=f(x)` (đối xứng trục y); hàm lẻ: `f(−x)=−f(x)` (đối xứng gốc O).
- Đa số hàm không chẵn không lẻ.
- Hàm từng khúc: đổi công thức theo khoảng x; `|x|` là ví dụ chuẩn.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tìm tập xác định:
a) f(x) = √(x − 3).
b) g(x) = 1/(x² − 4).

**Bài 2**: Cho f(x) = 2x + 1, g(x) = x². Tính (f∘g)(2) và (g∘f)(2).

**Bài 3**: y = x³ có là hàm số không? Vẽ phác họa.

**Bài 4**: Đường tròn x² + y² = 4 có là hàm số y = f(x) không?

**Bài 5**: f(x) = 3x − 5. Tính hàm ngược f⁻¹(x).

**Bài 6**: Xét tính chẵn/lẻ: a) `f(x) = x⁴ − 2`, b) `g(x) = x³ + x`.

**Bài 7**: Cho hàm từng khúc `f(x) = x+1` nếu `x ≥ 0`, `f(x) = −x` nếu `x < 0`. Tính `f(2)` và `f(−3)`.

### Lời giải

**Bài 1**: 
a) x − 3 ≥ 0 → **D = [3, +∞)**.
b) x² ≠ 4 → x ≠ ±2 → **D = ℝ \ {−2, 2}**.

**Bài 2**: 
- g(2) = 4. f(4) = 9. → (f∘g)(2) = 9.
- f(2) = 5. g(5) = 25. → (g∘f)(2) = 25.

**Bài 3**: y = x³ là hàm số (mỗi x cho 1 y). Đồ thị S-shape qua O, đối xứng qua O.

**Bài 4**: Đường tròn x = 0, y = ±2 → 1 x cho 2 y → KHÔNG phải hàm. Phải tách: y = √(4−x²) hoặc y = −√(4−x²).

**Bài 5**: y = 3x − 5 → x = (y+5)/3 → **f⁻¹(x) = (x + 5)/3**. Kiểm tra: f(f⁻¹(x)) = 3·(x+5)/3 − 5 = x + 5 − 5 = x ✓.

**Bài 6**: a) `f(−x) = (−x)⁴ − 2 = x⁴ − 2 = f(x)` → **chẵn**. b) `g(−x) = −x³ − x = −(x³+x) = −g(x)` → **lẻ**.

**Bài 7**: `f(2)`: vì `2 ≥ 0` → nhánh `x+1` → `3`. `f(−3)`: vì `−3 < 0` → nhánh `−x` → `3`.

---

## 6. Bài tiếp theo

[Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

## 📝 Tổng kết

1. **Hàm số**: mỗi x ↔ 1 y duy nhất.
2. **D (domain)** = tập x. **E (range)** = tập y.
3. **Hàm hợp**: (f∘g)(x) = f(g(x)). Thường f∘g ≠ g∘f.
4. **Test đường thẳng đứng** để kiểm tra là hàm.
5. **Song ánh** ⟺ có hàm ngược f⁻¹.
