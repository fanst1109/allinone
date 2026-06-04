# Lesson 06 — Nguyên hàm (Antiderivatives)

## Mục tiêu

- Hiểu **nguyên hàm** F(x) là gì — đạo hàm ngược của f(x).
- Thuộc **bảng nguyên hàm cơ bản**.
- 2 kỹ thuật chính: **đổi biến** (u-substitution), **từng phần** (integration by parts).
- Phân biệt nguyên hàm (vô định) và tích phân xác định (sẽ học ở L07).

## Kiến thức tiền đề

- [Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

---

## 1. Nguyên hàm là gì?

💡 **Định nghĩa**: F(x) là nguyên hàm của f(x) trên (a, b) nếu **F'(x) = f(x)** với mọi x.

**Ký hiệu**: ∫ f(x) dx = F(x) + C (C = hằng số bất kỳ).

⚠ **Vì sao có +C**: Vì đạo hàm của hằng số = 0. Nếu F là 1 nguyên hàm thì F + 1, F + π, F + (-5) cũng đều là nguyên hàm. Tập hợp tất cả = F + C.

**Ví dụ**: f(x) = 2x.
- F(x) = x² là nguyên hàm (vì (x²)' = 2x).
- F(x) = x² + 7 cũng là.
- Tổng quát: ∫ 2x dx = **x² + C**.

> 📐 **Định nghĩa đầy đủ — Nguyên hàm**
>
> **(a) Là gì**: F(x) là **nguyên hàm** của f(x) khi đạo hàm F'(x) = f(x). Tập hợp tất cả nguyên hàm = F(x) + C với C ∈ ℝ tùy ý — vì đạo hàm "xoá" hằng số. Ký hiệu ∫ f dx = F + C đại diện cho **họ vô hạn** đường cong song song.
>
> **(b) Vì sao cần**: Đạo hàm cho slope, nhưng nhiều bài toán đi ngược — biết tốc độ thay đổi, tìm hàm. Vận tốc → vị trí, gia tốc → vận tốc, mật độ → khối lượng, lãi suất → số dư. Đây là **đảo ngược của đạo hàm**, và là bước đầu cho tích phân xác định (FTC sẽ liên kết). Không có nguyên hàm, không tính được diện tích, thể tích, công, lưu lượng, v.v. ∫ f dx tồn tại với mọi f liên tục (Định lý cơ bản giải tích).
>
> **(c) Ví dụ số**: ∫ 2x dx = x² + C. Verify: (x² + C)' = 2x ✓. ∫ cos x dx = sin x + C (vì (sin x)' = cos x). ∫ 1/x dx = ln|x| + C. Bài toán: nếu v(t) = 9.8t (vận tốc rơi tự do), thì vị trí s(t) = ∫ 9.8t dt = 4.9t² + C. Với s(0) = 0 → C = 0 → **s(t) = 4.9t²** (công thức rơi quen thuộc). ∫ (x² + 3x + 1) dx = x³/3 + 3x²/2 + x + C.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết mình tìm nguyên hàm đúng?"* **Đạo hàm ngược lại** để kiểm! Nếu `(F(x))' = f(x)` thì đúng. Đây là cách tự kiểm mọi bài nguyên hàm — luôn làm được vì đạo hàm dễ hơn nguyên hàm.
- *"`+C` có thật sự quan trọng không, hay chỉ là quy ước?"* Rất quan trọng. Nó biểu thị **họ vô hạn** nguyên hàm. Trong bài toán thực (vd vận tốc → vị trí), `C` được xác định bởi **điều kiện ban đầu** (vd `s(0)=0`). Bỏ `C` = mất thông tin.
- *"Mọi hàm đều có nguyên hàm?"* Mọi hàm **liên tục** đều có (theo FTC, L07). Nhưng nguyên hàm không phải lúc nào cũng viết được bằng hàm sơ cấp — vd `∫ e^{−x²} dx` tồn tại nhưng không có công thức sơ cấp.

⚠ **Lỗi thường gặp — quên `+C`**. Viết `∫ 2x dx = x²` là **thiếu**. Mọi nguyên hàm bất định phải có `+C`. Đây là lỗi #1 của người mới học tích phân.

🔁 **Dừng lại tự kiểm tra**

1. `∫ 3x² dx = ?` (nhớ `+C`). Kiểm bằng đạo hàm.
2. `F(x) = x² + 5` và `G(x) = x² − 3` đều là nguyên hàm của hàm nào?

<details><summary>Đáp án</summary>

1. `x³ + C`. Kiểm: `(x³ + C)' = 3x²` ✓.
2. Cả hai là nguyên hàm của `2x` (vì `(x²+5)' = (x²−3)' = 2x`); chúng khác nhau đúng một hằng số.

</details>

### 📝 Tóm tắt mục 1

- `F` là nguyên hàm của `f` ⟺ `F' = f`; `∫ f dx = F + C` là **họ vô hạn** đường cong.
- **Luôn kèm `+C`** (lỗi phổ biến nhất khi quên); `C` xác định bởi điều kiện ban đầu.
- Kiểm kết quả bằng cách **đạo hàm ngược lại**; mọi hàm liên tục đều có nguyên hàm.

---

## 2. Bảng nguyên hàm cơ bản

Tra ngược bảng đạo hàm (L04):

| f(x) | ∫ f dx |
|------|--------|
| 0 | C |
| 1 | x + C |
| x^n (n ≠ -1) | x^(n+1)/(n+1) + C |
| 1/x | ln |x| + C |
| e^x | e^x + C |
| a^x | a^x / ln a + C |
| sin x | -cos x + C |
| cos x | sin x + C |
| 1/cos²x | tan x + C |
| 1/(1+x²) | arctan x + C |
| 1/√(1-x²) | arcsin x + C |

💡 **Phải thuộc bảng**. Tích phân = "đảo bảng đạo hàm".

⚠ **Quan trọng**: ∫ 1/x dx = ln**|x|** + C, không phải ln x (vì miền âm phải có |x|).

**Verify vài dòng bảng bằng đạo hàm ngược**:
- `∫ x^n dx = x^{n+1}/(n+1)`: `(x^{n+1}/(n+1))' = (n+1)x^n/(n+1) = x^n` ✓.
- `∫ e^x dx = e^x + C`: `(e^x)' = e^x` ✓.
- `∫ 1/(1+x²) dx = arctan x + C`: `(arctan x)' = 1/(1+x²)` ✓ (từ L04).
- `∫ sin x dx = −cos x + C`: `(−cos x)' = −(−sin x) = sin x` ✓ (chú ý **dấu trừ**).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao `∫ x^n dx` loại trừ `n = −1`?"* Vì công thức `x^{n+1}/(n+1)` chia cho `n+1 = 0` khi `n = −1` → vô nghĩa. Trường hợp `n = −1` (tức `∫ 1/x`) có nguyên hàm riêng là `ln|x| + C` — một ngoại lệ đặc biệt.
- *"`∫ sin x = −cos x` sao lại có dấu trừ?"* Vì `(cos x)' = −sin x`, nên để đạo hàm ra `+sin x` cần `−cos x`. Đây là chỗ rất hay sai dấu — kiểm bằng đạo hàm ngược là chắc.

🔁 **Dừng lại tự kiểm tra**

1. `∫ cos x dx = ?` `∫ sin x dx = ?` (chú ý dấu)
2. `∫ x³ dx = ?`

<details><summary>Đáp án</summary>

1. `∫ cos x = sin x + C`; `∫ sin x = −cos x + C`. (Đạo hàm tạo dấu trừ với cos; nguyên hàm "trả" dấu trừ cho sin.)
2. `x⁴/4 + C` (kiểm: `(x⁴/4)' = x³` ✓).

</details>

### 📝 Tóm tắt mục 2

- Bảng nguyên hàm = đảo bảng đạo hàm; thuộc `x^n, e^x, 1/x, sin/cos, 1/(1+x²)`.
- `∫ x^n = x^{n+1}/(n+1)` (trừ `n=−1`); `∫ 1/x = ln|x| + C` (có `|·|`).
- Cẩn thận **dấu** ở `∫ sin x = −cos x`; luôn kiểm bằng đạo hàm ngược.

---

## 3. Quy tắc cơ bản

```
∫ c·f(x) dx = c·∫ f(x) dx
∫ (f + g) dx = ∫ f dx + ∫ g dx
```

⚠ **Không có quy tắc cho tích và thương** (khác đạo hàm). Phải dùng kỹ thuật đổi biến/từng phần.

**Ví dụ**: ∫ (3x² + 2sin x) dx = 3·(x³/3) + 2·(-cos x) + C = **x³ - 2cos x + C**.

💡 **Trực giác**: nguyên hàm "thừa hưởng" tính tuyến tính từ đạo hàm. Vì `(F+G)' = F'+G'` và `(cF)' = cF'`, đảo ngược lại thì tích phân cũng tách qua tổng và rút hằng số ra ngoài.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có quy tắc tổng mà không có quy tắc tích?"* Vì đạo hàm tích là `f'g + fg'` (rối, không tách gọn), nên đảo ngược không cho công thức đơn giản. Tích/thương phải dùng kỹ thuật (đổi biến, từng phần) — đó là lý do tích phân **khó hơn** đạo hàm.
- *"`∫ f·g dx = ∫f · ∫g` đúng không?"* SAI hoàn toàn. Phản ví dụ: `∫ x·x dx = ∫ x² dx = x³/3`, nhưng `∫x · ∫x = (x²/2)(x²/2) = x⁴/4`. Khác nhau.

⚠ **Lỗi thường gặp — bịa quy tắc nhân/chia cho tích phân**. Không tồn tại `∫ fg = ∫f·∫g` hay `∫ f/g = ∫f/∫g`. Gặp tích/thương phải nghĩ tới đổi biến (mục 4) hoặc từng phần (mục 5).

🔁 **Dừng lại tự kiểm tra**

1. `∫ (4x³ − 6x + 2) dx = ?`
2. `∫ x²·cos x dx` — tách thành `∫x² · ∫cos x` được không?

<details><summary>Đáp án</summary>

1. `x⁴ − 3x² + 2x + C` (tách tổng + rút hằng số).
2. **Không** — không có quy tắc tích cho tích phân; phải dùng từng phần (mục 5).

</details>

### 📝 Tóm tắt mục 3

- Tích phân **tuyến tính**: `∫(f±g) = ∫f ± ∫g`, `∫cf = c∫f`.
- **Không** có quy tắc cho tích/thương (khác đạo hàm) → dùng đổi biến/từng phần.
- Đừng bịa `∫fg = ∫f·∫g` — sai (phản ví dụ `∫x·x`).

---

## 4. Đổi biến — u-substitution

🎯 **Mục đích**: Tìm 1 phần biểu thức là g(x) và đạo hàm của nó cũng có mặt → đặt u = g(x) → đơn giản.

```
∫ f(g(x))·g'(x) dx = ∫ f(u) du    (đặt u = g(x), du = g'(x) dx)
```

💡 **Trực giác**: Đây là **đảo ngược chain rule**.

**Ví dụ 1**: ∫ 2x·cos(x²) dx.
- Đặt u = x², du = 2x dx → ∫ cos(u) du = sin(u) + C = **sin(x²) + C**.

**Kiểm tra**: (sin x²)' = cos(x²)·2x ✓.

**Ví dụ 2**: ∫ x/(x²+1) dx.
- Đặt u = x²+1, du = 2x dx → x dx = du/2.
- ∫ (1/u)·(du/2) = (1/2)·ln|u| + C = **(1/2)·ln(x²+1) + C**.

**Ví dụ 3**: ∫ e^(3x) dx.
- u = 3x, du = 3 dx → dx = du/3.
- ∫ e^u · (du/3) = (1/3)·e^u + C = **(1/3)·e^(3x) + C**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn `u` là phần nào?"* Chọn `u = g(x)` sao cho `g'(x)` (đạo hàm của nó) **cũng xuất hiện** trong biểu thức (sai khác hằng số). Ở ví dụ 1, `u = x²` vì `2x` có sẵn. Nếu không thấy `g'` → đổi biến không trực tiếp dùng được.
- *"Phải đổi cả `dx` thành `du`?"* Đúng — không được để lẫn `x` và `u`. Sau khi đặt `u = g(x)`, mọi `x` và `dx` phải biến hết thành `u` và `du`. Cuối cùng thay `u = g(x)` trở lại.

⚠ **Lỗi thường gặp — quên đổi `dx` hoặc để sót `x`**. `∫ 2x·cos(x²) dx`: nếu chỉ thay `cos(x²) → cos u` mà giữ `2x dx` thì sai. Phải dùng `du = 2x dx` để **nuốt trọn** `2x dx`, kết quả `∫ cos u du`. Nếu sau khi đặt còn `x` lẻ loi → chọn `u` chưa đúng.

🔁 **Dừng lại tự kiểm tra**

1. `∫ 3x²·(x³+1)⁵ dx` — đặt `u = ?`
2. Kiểm `∫ e^{3x} dx = (1/3)e^{3x} + C` bằng đạo hàm.

<details><summary>Đáp án</summary>

1. `u = x³+1`, `du = 3x² dx` → `∫ u⁵ du = u⁶/6 + C = (x³+1)⁶/6 + C`.
2. `((1/3)e^{3x})' = (1/3)·e^{3x}·3 = e^{3x}` ✓.

</details>

### 📝 Tóm tắt mục 4

- Đổi biến = **đảo chain rule**: `∫ f(g(x))·g'(x) dx = ∫ f(u) du`.
- Chọn `u = g(x)` sao cho `g'(x)` có mặt; đổi **cả** `x` và `dx` sang `u, du`.
- Cuối cùng thay `u = g(x)` trở lại; nếu còn `x` lẻ → chọn `u` sai.

---

## 5. Từng phần — Integration by parts

```
∫ u dv = u·v - ∫ v du
```

💡 **Trực giác**: Đây là **đảo ngược product rule** (uv)' = u'v + uv' → ∫ uv' = uv - ∫ u'v.

**Mẹo chọn u, dv**: chọn u là phần khi đạo hàm sẽ **đơn giản** (vd: x, ln x), dv là phần dễ tích phân.

### Quy tắc nhớ "LIATE"

Ưu tiên chọn u theo thứ tự:
- **L**ogarith (ln, log)
- **I**nverse trig (arcsin, arctan)
- **A**lgebra (x, x², ...)
- **T**rig (sin, cos)
- **E**xponential (e^x, a^x)

**Ví dụ 1**: ∫ x·e^x dx.
- u = x (A), dv = e^x dx (E). du = dx, v = e^x.
- = x·e^x - ∫ e^x dx = x·e^x - e^x + C = **e^x·(x - 1) + C**.

**Ví dụ 2**: ∫ ln x dx.
- u = ln x, dv = dx. du = dx/x, v = x.
- = x·ln x - ∫ x·(1/x) dx = x·ln x - x + C = **x·(ln x - 1) + C**.

**Ví dụ 3**: ∫ x·cos x dx.
- u = x (A), dv = cos x dx (T). du = dx, v = sin x.
- = x·sin x - ∫ sin x dx = **x·sin x + cos x + C**.

**Verify ví dụ 1 bằng đạo hàm ngược** — `∫ x·e^x dx = e^x(x−1) + C`:
- `(e^x(x−1))' = e^x(x−1) + e^x·1 = e^x(x−1+1) = e^x·x = x·e^x` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao chọn `u` theo LIATE?"* Vì ta muốn `∫ v du` (tích phân còn lại) **đơn giản hơn** ban đầu. Chọn `u` là phần khi đạo hàm sẽ "teo nhỏ" (`ln x → 1/x`, `x → 1`), `dv` là phần dễ lấy nguyên hàm. LIATE xếp thứ tự ưu tiên đó.
- *"Gặp `∫ ln x dx` không có 'dv' rõ ràng thì sao?"* Đặt `u = ln x`, `dv = dx` (coi như nhân 1). Khi đó `v = x`, ra `x ln x − ∫ x·(1/x) dx = x ln x − x + C`. Mẹo "dv = dx" rất hay dùng cho `ln x`, `arctan x`.

⚠ **Lỗi thường gặp — chọn `u, dv` ngược làm bài khó hơn**. `∫ x·e^x dx`: nếu chọn `u = e^x`, `dv = x dx` thì `∫ v du = ∫ (x²/2)e^x dx` — **phức tạp hơn** ban đầu. Đúng phải chọn `u = x` (theo LIATE: A trước E) để `du = dx` làm tích phân teo lại.

🔁 **Dừng lại tự kiểm tra**

1. `∫ x·e^{2x} dx = ?` (chọn `u = x`, `dv = e^{2x}dx`).
2. Trong `∫ ln x dx`, vì sao đặt `dv = dx`?

<details><summary>Đáp án</summary>

1. `u=x, du=dx`; `dv=e^{2x}dx, v=(1/2)e^{2x}`. `= (x/2)e^{2x} − ∫(1/2)e^{2x}dx = (x/2)e^{2x} − (1/4)e^{2x} + C`.
2. Vì `ln x` không có nguyên hàm hiển nhiên để làm `dv`; đặt `dv=dx` cho `v=x`, còn `u=ln x` đạo hàm thành `1/x` đơn giản.

</details>

### 📝 Tóm tắt mục 5

- Từng phần = **đảo product rule**: `∫ u dv = uv − ∫ v du`.
- Chọn `u` theo **LIATE** (Log, Inverse trig, Algebra, Trig, Exp) để `∫ v du` gọn hơn.
- Mẹo `dv = dx` cho `∫ ln x`, `∫ arctan x`; chọn ngược sẽ làm bài khó hơn.

---

## 6. Các dạng đặc biệt

### 6.1. ∫ 1/(ax+b) dx
```
= (1/a)·ln|ax + b| + C
```

### 6.2. ∫ 1/(x² + a²) dx
```
= (1/a)·arctan(x/a) + C
```

### 6.3. ∫ tan x dx
```
= -ln|cos x| + C
```
(Đổi biến u = cos x, du = -sin x dx).

💡 **Trực giác**: ba dạng này là "mẫu thường gặp" mà mọi người thuộc lòng — đều suy ra được từ đổi biến hoặc bảng cơ bản, nhưng nhớ sẵn giúp tiết kiệm thời gian.

**Verify từng dạng bằng đạo hàm ngược**:
- `∫ 1/(ax+b) dx = (1/a)ln|ax+b|`: `((1/a)ln|ax+b|)' = (1/a)·a/(ax+b) = 1/(ax+b)` ✓.
- `∫ 1/(x²+a²) dx = (1/a)arctan(x/a)`: `((1/a)arctan(x/a))' = (1/a)·(1/a)/(1+(x/a)²) = 1/(a²+x²)` ✓.
- `∫ tan x dx = −ln|cos x|`: `(−ln|cos x|)' = −(1/cos x)·(−sin x) = sin x/cos x = tan x` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"`∫ 1/(x²+a²)` và `∫ 1/(a²−x²)` có giống nhau không?"* Khác hẳn. Dạng `+` ra `arctan`; dạng `−` (hiệu) ra `ln` (phân tích phân thức). Để ý dấu giữa hai hạng tử.
- *"Phải thuộc hết các dạng đặc biệt?"* Nên nhớ ba dạng trên vì rất hay gặp. Khi quên, vẫn suy lại được bằng đổi biến (vd `tan x` qua `u = cos x`).

⚠ **Lỗi thường gặp — thiếu hệ số `1/a`**. `∫ 1/(x²+4) dx = (1/2)arctan(x/2)`, KHÔNG phải `arctan(x/2)`. Hệ số `1/a` (ở đây `a=2`) rất dễ rơi rớt — verify bằng đạo hàm sẽ phát hiện ngay.

🔁 **Dừng lại tự kiểm tra**

1. `∫ 1/(x²+9) dx = ?`
2. `∫ 1/(2x+5) dx = ?`

<details><summary>Đáp án</summary>

1. `a=3` → `(1/3)arctan(x/3) + C`.
2. `(1/2)ln|2x+5| + C`.

</details>

### 📝 Tóm tắt mục 6

- `∫ 1/(ax+b) dx = (1/a)ln|ax+b| + C`; `∫ 1/(x²+a²) dx = (1/a)arctan(x/a) + C`.
- `∫ tan x dx = −ln|cos x| + C` (đổi biến `u = cos x`).
- Đừng quên hệ số `1/a`; verify bằng đạo hàm ngược.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính ∫ (x⁴ + 3x² - 5) dx.

**Bài 2**: Tính ∫ sin(2x) dx.

**Bài 3**: Tính ∫ x²·e^(x³) dx.

**Bài 4**: Tính ∫ x·sin x dx.

**Bài 5**: Tính ∫ 1/(x²+4) dx.

### Lời giải

**Bài 1**: x⁵/5 + x³ - 5x + C.

**Bài 2**: u = 2x → ∫ sin u · (du/2) = -(1/2)·cos u + C = **-(1/2)·cos(2x) + C**.

**Bài 3**: u = x³, du = 3x² dx → x² dx = du/3. → (1/3)·∫ e^u du = **(1/3)·e^(x³) + C**.

**Bài 4**: Từng phần: u = x, dv = sin x dx. v = -cos x. → -x·cos x + ∫ cos x dx = **-x·cos x + sin x + C**.

**Bài 5**: Dạng 1/(x²+a²) với a=2 → **(1/2)·arctan(x/2) + C**.

---

## 8. Bài tiếp theo

[Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

## 📝 Tổng kết

1. **∫ f dx = F + C** với F' = f. **Phải có +C** vì hằng số mất khi đạo hàm.
2. **Bảng cơ bản**: thuộc x^n, sin/cos, e^x, 1/x, 1/(1+x²).
3. **Đổi biến** = đảo chain rule. Đặt u = phần "khó", du có sẵn trong biểu thức.
4. **Từng phần** = đảo product rule: ∫ u dv = uv - ∫ v du. Chọn u theo LIATE.
5. Không có quy tắc nhân/chia trực tiếp như đạo hàm.
