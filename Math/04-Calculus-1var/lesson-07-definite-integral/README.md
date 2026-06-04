# Lesson 07 — Tích phân xác định

## Mục tiêu

- Hiểu **tích phân xác định** ∫_a^b f(x) dx như diện tích dưới đồ thị.
- Định nghĩa qua **tổng Riemann**.
- **Định lý cơ bản giải tích** (FTC) — kết nối đạo hàm và tích phân.
- Tính chất của tích phân xác định.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

---

## 1. Vấn đề diện tích

💡 **Câu hỏi**: Diện tích hình giới hạn bởi y = x², trục Ox, và 2 đường thẳng x = 0, x = 1 là bao nhiêu?

Đây là hình **cong** — không có công thức diện tích thẳng. Phải dùng tích phân.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng công thức hình học quen thuộc?"* Vì cạnh trên là đường cong `y = x²`, không phải đoạn thẳng — không có công thức diện tích đa giác/hình tròn nào áp được. Ý tưởng giải tích: **xấp xỉ** bằng nhiều hình chữ nhật mỏng rồi cho số hình → ∞.
- *"Diện tích này có ra số cụ thể không?"* Có, và bằng đúng `1/3` (sẽ tính ở mục 2 + 3). Đường cong vẫn cho diện tích hữu hạn xác định.

### 📝 Tóm tắt mục 1

- Diện tích dưới đường **cong** không có công thức hình học trực tiếp.
- Giải pháp: xấp xỉ bằng hình chữ nhật mỏng, lấy giới hạn → tích phân.
- Ví dụ dẫn dắt `∫_0^1 x² dx = 1/3` (tính ở mục 2-3).

---

## 2. Tổng Riemann — Định nghĩa tích phân

💡 **Ý tưởng**: Chia khoảng [a, b] thành n đoạn nhỏ, mỗi đoạn rộng Δx = (b-a)/n. Trên mỗi đoạn, **xấp xỉ diện tích bằng hình chữ nhật** chiều cao f(x_i).

```
Tổng Riemann: S_n = Σ_{i=1}^n f(x_i) · Δx
```

Khi n → ∞ (mảnh càng mỏng), tổng → diện tích thật.

```
∫_a^b f(x) dx = lim_{n→∞} Σ f(x_i) · Δx
```

### Ví dụ số: ∫_0^1 x² dx

Chia [0, 1] thành n đoạn, dùng cận phải. x_i = i/n, Δx = 1/n.

```
S_n = Σ_{i=1}^n (i/n)² · (1/n) = (1/n³)·Σ i²
```

Dùng công thức Σ i² = n(n+1)(2n+1)/6:
```
S_n = n(n+1)(2n+1)/(6n³) = (1 + 1/n)(2 + 1/n)/6
```

Khi n → ∞: S_n → (1·2)/6 = **1/3**.

⟶ ∫_0^1 x² dx = **1/3**.

**Kiểm tra bằng số**:
- n=10: S ≈ 0.385.
- n=100: S ≈ 0.3383.
- n=1000: S ≈ 0.3338.
- → 1/3 ≈ 0.3333.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cận trái hay cận phải của mỗi đoạn?"* Với hàm liên tục, khi `n → ∞` cả hai (và điểm bất kỳ trong đoạn) cho **cùng** giới hạn. Vd `∫_0^1 x² dx`: cận phải cho `0.385` (n=10), cận trái cho `0.285` — nhưng cả hai → `1/3`. Chọn cận nào chỉ ảnh hưởng tốc độ hội tụ.
- *"Vì sao `Σ i² = n(n+1)(2n+1)/6`?"* Đây là công thức tổng bình phương đã biết (chứng minh bằng quy nạp). Kiểm `n=3`: `1+4+9 = 14`, công thức `3·4·7/6 = 84/6 = 14` ✓. Nó cho phép biến tổng Riemann thành biểu thức đóng rồi mới lấy giới hạn.

⚠ **Lỗi thường gặp — quên nhân `Δx`**. Tổng Riemann là `Σ f(x_i)·Δx`, KHÔNG phải `Σ f(x_i)`. Thiếu `Δx` (= bề rộng hình chữ nhật) thì kết quả không phải diện tích. Vd quên `1/n` ở trên sẽ ra `∞` thay vì `1/3`.

🔁 **Dừng lại tự kiểm tra**

1. Với `∫_0^1 x² dx`, công thức `S_n = (1+1/n)(2+1/n)/6`. Tính `S_n` khi `n = 2`.
2. Khi `n → ∞`, mỗi hình chữ nhật rộng `Δx` tiến về đâu?

<details><summary>Đáp án</summary>

1. `(1+0.5)(2+0.5)/6 = (1.5·2.5)/6 = 3.75/6 = 0.625` (xấp xỉ thô vì `n` nhỏ).
2. `Δx = 1/n → 0` (hình chữ nhật càng mỏng, xấp xỉ càng khít đường cong).

</details>

### 📝 Tóm tắt mục 2

- Tổng Riemann `S_n = Σ f(x_i)·Δx` xấp xỉ diện tích bằng `n` hình chữ nhật.
- `∫_a^b f dx = lim_{n→∞} S_n` — giới hạn khi hình chữ nhật mỏng vô hạn.
- **Đừng quên `Δx`**; cận trái/phải đều cho cùng giới hạn với hàm liên tục.

---

## 3. Định lý cơ bản giải tích (Fundamental Theorem of Calculus)

🎯 **Đây là định lý quan trọng nhất Calculus**, kết nối đạo hàm và tích phân.

### Phần 1 (FTC1)
Nếu f liên tục trên [a, b] và F(x) = ∫_a^x f(t) dt, thì **F'(x) = f(x)**.

💡 Đọc: "Đạo hàm của tích phân = chính hàm". Đạo hàm và tích phân là **2 phép toán ngược nhau**.

### Phần 2 (FTC2) — Cách tính tích phân thực tế
Nếu F là **nguyên hàm** của f (F' = f), thì:
```
∫_a^b f(x) dx = F(b) - F(a)
```

> 📐 **Định nghĩa đầy đủ — Định lý cơ bản giải tích (FTC)**
>
> **(a) Là gì**: Cây cầu nối **đạo hàm và tích phân**. Phần 1: nếu ta tích phân f rồi đạo hàm, ta được lại f (ngược nhau). Phần 2: tích phân xác định = hiệu nguyên hàm ở 2 đầu, F(b) − F(a). Không cần tính tổng Riemann vô hạn nữa.
>
> **(b) Vì sao cần**: Trước Newton/Leibniz, tính diện tích = tổng Riemann thủ công, **cực kỳ khó** với hàm bất kỳ. Archimedes đã làm cho parabol bằng tổng Riemann, mất nhiều trang giấy chỉ cho 1 hàm. FTC biến phép tính diện tích thành 2 phép tính nguyên hàm + trừ — đơn giản hơn vô số lần. Đây là **lý do** Calculus tạo ra cách mạng khoa học thế kỷ 17: từ nay tính diện tích, thể tích, công, lưu lượng... trở nên hệ thống. Là đỉnh cao của toán THPT.
>
> **(c) Ví dụ số**: ∫_0^1 x² dx. F(x) = x³/3. F(1) − F(0) = 1/3 − 0 = **1/3**. Verify bằng tổng Riemann (n→∞ cho cùng kết quả ≈ 0.333). ∫_0^π sin x dx = [-cos x]_0^π = -cos π + cos 0 = 1+1 = **2**. ∫_1^e (1/x) dx = ln e − ln 1 = **1**. ∫_0^1 e^x dx = e^1 − e^0 = e − 1 ≈ **1.718**. Diện tích dưới đường thẳng y = 2x trên [0, 5]: ∫_0^5 2x dx = [x²]_0^5 = 25 ✓ (= tam giác đáy 5 cao 10 → ½·5·10 = 25).

Viết tắt: F(b) - F(a) thường ghi là [F(x)]_a^b hoặc F(x)|_a^b.

💡 **Quy trình tính tích phân**:
1. Tìm nguyên hàm F(x) (như L06).
2. Tính F(b) - F(a).

**Ví dụ**: ∫_0^1 x² dx.
- F(x) = x³/3 (1 nguyên hàm bất kỳ, không cần +C vì cancel khi trừ).
- F(1) - F(0) = 1/3 - 0 = **1/3** ✓.

Khớp với kết quả tổng Riemann!

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không cần `+C` ở tích phân xác định?"* Vì khi tính `F(b) − F(a)`, hằng số bị triệt tiêu: `(F(b)+C) − (F(a)+C) = F(b) − F(a)`. Tích phân **bất định** (nguyên hàm) cần `+C`, nhưng tích phân **xác định** thì không.
- *"FTC1 và FTC2 liên hệ thế nào?"* FTC1 nói "tích phân rồi đạo hàm → trở lại hàm gốc" (chứng minh đạo hàm và tích phân ngược nhau). FTC2 là **hệ quả tính toán**: dùng nguyên hàm để tính tích phân xác định mà không cần tổng Riemann.
- *"Chọn nguyên hàm nào trong FTC2?"* Bất kỳ một nguyên hàm nào cũng được (hằng số tự triệt tiêu). Thường chọn cái đơn giản nhất với `C = 0`.

⚠ **Lỗi thường gặp — tính `F(a) − F(b)` thay vì `F(b) − F(a)`**. Thứ tự là **cận trên trừ cận dưới**. Đảo lại sẽ ra dấu ngược. Vd `∫_0^1 x² dx = F(1)−F(0) = 1/3`, nếu viết `F(0)−F(1) = −1/3` là sai dấu.

🔁 **Dừng lại tự kiểm tra**

1. `∫_0^2 3x² dx = ?` (dùng FTC2).
2. `∫_1^3 (1/x) dx = ?`

<details><summary>Đáp án</summary>

1. `F(x) = x³` → `F(2) − F(0) = 8 − 0 = 8`.
2. `F(x) = ln|x|` → `ln 3 − ln 1 = ln 3 ≈ 1.0986`.

</details>

### 📝 Tóm tắt mục 3

- FTC1: `d/dx ∫_a^x f(t)dt = f(x)` — đạo hàm và tích phân ngược nhau.
- FTC2: `∫_a^b f dx = F(b) − F(a)` với `F' = f` — tính tích phân qua nguyên hàm.
- Không cần `+C` (triệt tiêu khi trừ); thứ tự **trên trừ dưới**.

---

## 4. Tính chất tích phân xác định

| Tính chất | Công thức |
|-----------|-----------|
| Hằng nhân | ∫ c·f dx = c·∫ f dx |
| Tổng | ∫ (f + g) dx = ∫ f dx + ∫ g dx |
| Cộng đoạn | ∫_a^b = ∫_a^c + ∫_c^b |
| Đảo cận | ∫_a^b = -∫_b^a |
| Trùng cận | ∫_a^a = 0 |
| Diện tích âm | f < 0 → tích phân âm |

⚠ **Tích phân có thể âm**: ∫_a^b f dx **không phải lúc nào cũng = diện tích**. Là **diện tích đại số** — phần trên Ox cộng, phần dưới trừ.

**Ví dụ**: ∫_0^{2π} sin x dx = [-cos x]_0^{2π} = -cos(2π) + cos(0) = -1 + 1 = **0**. (Phần dương từ 0-π và phần âm từ π-2π triệt tiêu nhau.)

Nếu muốn **diện tích thật**: ∫_0^{2π} |sin x| dx = 4.

💡 **Trực giác**: tích phân xác định là **diện tích có dấu** — phần đồ thị trên trục Ox đóng góp dương, phần dưới đóng góp âm. Như "lãi và lỗ" cộng dồn: tổng đại số có thể nhỏ hơn tổng độ lớn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân bằng 0 có nghĩa hàm bằng 0?"* Không. `∫_0^{2π} sin x dx = 0` nhưng `sin x` không hề bằng 0 khắp nơi — phần dương và âm **triệt tiêu**. Tích phân = 0 chỉ nói tổng đại số bằng 0.
- *"Khi nào dùng tính chất cộng đoạn?"* Khi hàm đổi công thức/đổi dấu giữa chừng, hoặc muốn tách `∫_a^b = ∫_a^c + ∫_c^b` để xử lý từng phần. Rất hữu ích với hàm chia khúc hay `|f(x)|`.

⚠ **Lỗi thường gặp — lẫn tích phân với diện tích thật**. Để tính **diện tích** giữa đường và trục khi hàm đổi dấu, phải lấy `∫|f|` (chia đoạn theo dấu), KHÔNG phải `∫f`. Vd diện tích của `sin x` trên `[0, 2π]` là `4`, không phải `0`.

🔁 **Dừng lại tự kiểm tra**

1. `∫_{-1}^1 x dx = ?` Giải thích.
2. Tách `∫_0^4 f dx` qua điểm `c = 2` như thế nào?

<details><summary>Đáp án</summary>

1. `[x²/2]_{-1}^1 = 1/2 − 1/2 = 0` (hàm lẻ, phần âm `[−1,0]` triệt tiêu phần dương `[0,1]`).
2. `∫_0^4 f dx = ∫_0^2 f dx + ∫_2^4 f dx` (cộng đoạn).

</details>

### 📝 Tóm tắt mục 4

- Tích phân tuyến tính, cộng đoạn `∫_a^b = ∫_a^c + ∫_c^b`, đảo cận đổi dấu, `∫_a^a = 0`.
- Tích phân là **diện tích có dấu** — phần dưới Ox âm; có thể bằng 0 dù hàm ≠ 0.
- Muốn **diện tích thật** khi hàm đổi dấu: dùng `∫|f|`.

---

## 5. Đổi biến trong tích phân xác định

```
∫_a^b f(g(x))·g'(x) dx = ∫_{g(a)}^{g(b)} f(u) du
```

⚠ **Lưu ý**: Phải **đổi cả cận** theo u.

**Ví dụ**: ∫_0^1 2x·e^(x²) dx.
- Đặt u = x², du = 2x dx.
- x = 0 → u = 0; x = 1 → u = 1.
- = ∫_0^1 e^u du = e - 1 ≈ 1.718.

💡 **Trực giác**: giống đổi biến cho nguyên hàm, nhưng cận tích phân là "vị trí trên trục x" — khi đổi sang biến `u`, các vị trí đó cũng phải dịch sang giá trị `u` tương ứng. Đổi cận giúp **không cần** thay `u` trở lại `x`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi cận rồi có cần thay `u` về `x` không?"* Không. Khi đã đổi cận sang `u`, tính thẳng `∫_{g(a)}^{g(b)} f(u) du` rồi áp FTC2 với biến `u`. Đỡ một bước so với nguyên hàm bất định.
- *"Nếu quên đổi cận thì sao?"* Sẽ tính `[F(u)]` với cận `x` cũ → kết quả sai. Phải chọn một trong hai: đổi cận theo `u`, **hoặc** thay `u` về `x` rồi dùng cận `x` gốc — không trộn.

⚠ **Lỗi thường gặp — đổi biến nhưng giữ nguyên cận `x`**. `∫_0^1 2x·e^{x²} dx`: sau khi đặt `u = x²`, nếu vẫn viết `∫_0^1 e^u du` với cận `x` cũ thì... ở đây trùng hợp `0→0, 1→1` nên đúng; nhưng `∫_1^2 2x·e^{x²} dx` thì `u` chạy `1→4`, giữ cận `1→2` sẽ sai. Luôn đổi cận theo `u = g(x)`.

🔁 **Dừng lại tự kiểm tra**

1. `∫_0^2 2x·e^{x²} dx` — cận `u` mới là gì? Tính kết quả.
2. Vì sao đổi cận tiện hơn thay `u` về `x`?

<details><summary>Đáp án</summary>

1. `u = x²`: `x=0→u=0`, `x=2→u=4`. `∫_0^4 e^u du = e⁴ − 1 ≈ 53.6`.
2. Vì tránh được bước thay `u = g(x)` ngược lại — tính trực tiếp trên biến `u` với cận mới.

</details>

### 📝 Tóm tắt mục 5

- Đổi biến tích phân xác định: `∫_a^b f(g(x))g'(x)dx = ∫_{g(a)}^{g(b)} f(u)du`.
- **Phải đổi cả cận** theo `u = g(x)`; sau đó không cần thay `u` về `x`.
- Hoặc đổi cận, hoặc thay `u` về `x` rồi dùng cận gốc — không trộn lẫn.

---

## 6. Tích phân từng phần xác định

```
∫_a^b u dv = [u·v]_a^b - ∫_a^b v du
```

**Ví dụ**: ∫_0^π x·sin x dx.
- u = x, dv = sin x dx. v = -cos x.
- = [-x·cos x]_0^π + ∫_0^π cos x dx
- = -π·cos π + 0 + [sin x]_0^π
- = π + 0 - 0 = **π**.

💡 **Trực giác**: công thức giống nguyên hàm `∫u dv = uv − ∫v du`, chỉ thêm việc **đánh giá `uv` tại hai cận** ngay. Phần `[uv]_a^b` lấy giá trị ở hai đầu, phần `∫_a^b v du` vẫn là tích phân xác định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"`[u·v]_a^b` tính thế nào?"* Thay cận trên trừ cận dưới vào tích `u·v`. Ví dụ trên: `[−x·cos x]_0^π = (−π·cos π) − (−0·cos 0) = (−π·(−1)) − 0 = π`.
- *"Chọn `u, dv` có khác nguyên hàm không?"* Không, vẫn theo **LIATE** như L06. Chỉ thêm bước đánh giá tại cận.

⚠ **Lỗi thường gặp — quên đánh giá phần `[uv]` tại cận**. Viết `∫_0^π x sin x dx = −∫_0^π cos x dx` (bỏ luôn `[−x cos x]_0^π`) là thiếu hẳn một phần. Cả `[uv]_a^b` lẫn `∫v du` đều phải đánh giá tại cận.

🔁 **Dừng lại tự kiểm tra**

1. `∫_0^1 x·e^x dx = ?`
2. Tính `[x·sin x]_0^{π/2}`.

<details><summary>Đáp án</summary>

1. `u=x, dv=e^x dx, v=e^x`: `[x e^x]_0^1 − ∫_0^1 e^x dx = e − [e^x]_0^1 = e − (e−1) = 1`.
2. `(π/2)·sin(π/2) − 0·sin 0 = (π/2)·1 − 0 = π/2`.

</details>

### 📝 Tóm tắt mục 6

- Từng phần xác định: `∫_a^b u dv = [uv]_a^b − ∫_a^b v du`.
- Đánh giá **cả** `[uv]` tại hai cận **lẫn** tích phân còn lại; chọn `u, dv` theo LIATE.
- Đừng bỏ sót phần `[uv]_a^b`.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính ∫_1^3 (2x + 1) dx.

**Bài 2**: Tính ∫_0^{π/2} cos x dx.

**Bài 3**: Tính ∫_{-2}^2 x³ dx. Giải thích kết quả.

**Bài 4**: Tính ∫_0^1 x·e^x dx.

**Bài 5**: Tính ∫_1^e (ln x)/x dx.

### Lời giải

**Bài 1**: F(x) = x² + x. F(3) - F(1) = 12 - 2 = **10**.

**Bài 2**: F(x) = sin x. sin(π/2) - sin 0 = **1**.

**Bài 3**: F(x) = x⁴/4. F(2) - F(-2) = 4 - 4 = **0**. Vì x³ là hàm lẻ, đối xứng qua O → phần âm và dương triệt tiêu.

**Bài 4**: Từng phần. u=x, dv=e^x dx → v=e^x. [x·e^x]_0^1 - ∫_0^1 e^x dx = e - [e^x]_0^1 = e - (e-1) = **1**.

**Bài 5**: Đổi biến u = ln x, du = dx/x. x=1→u=0, x=e→u=1. = ∫_0^1 u du = **1/2**.

---

## 8. Bài tiếp theo

[Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/).

## 📝 Tổng kết

1. **Tổng Riemann**: S_n = Σ f(x_i)Δx. n → ∞ → ∫_a^b f dx.
2. **FTC**: nếu F' = f thì ∫_a^b f = F(b) - F(a). Đạo hàm & tích phân là ngược nhau.
3. **Tính chất**: cộng đoạn, đảo cận, ∫_a^a = 0.
4. ∫ có thể âm — là diện tích đại số.
5. Đổi biến **phải đổi cận**. Từng phần áp dụng được.
