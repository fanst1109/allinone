# Lesson 04 — Biến ngẫu nhiên liên tục (Continuous Random Variables)

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Hiểu vì sao biến ngẫu nhiên **liên tục** khác về bản chất với biến rời rạc — và vì sao công cụ "PMF cộng lại" không còn dùng được.
2. Đọc, vẽ, và kiểm tra một **PDF (Probability Density Function)** `f(x)`: điều kiện `f(x) ≥ 0` và `∫ f(x) dx = 1`.
3. Hiểu mệnh đề **gây sốc** của bài này: với biến liên tục `X`, `P(X = x) = 0` với mọi điểm `x` cụ thể — và vì sao điều đó **không** mâu thuẫn với việc đo được chiều cao của một người.
4. Tính `P(a ≤ X ≤ b) = ∫_a^b f(x) dx` bằng tích phân Riemann; biết khi nào dùng máy, khi nào tự tay.
5. Định nghĩa và dùng **CDF** `F(x) = P(X ≤ x)`; chứng minh `F'(x) = f(x)` (định lý cơ bản của giải tích).
6. Tính kỳ vọng và phương sai cho 2 phân phối liên tục cơ bản:
   - **Uniform** `U(a, b)`,
   - **Exponential** `Exp(λ)` — và hiểu tính chất **memoryless**.
7. Áp dụng công thức **đổi biến** `Y = g(X)` → `f_Y(y) = f_X(g⁻¹(y)) · |dg⁻¹/dy|` cho 2 ví dụ: `Y = X²` và `Y = e^X` (log-normal).
8. Mở rộng nhẹ sang **Joint PDF** `f(x, y)` cho 2 biến — đặt nền cho covariance ở Lesson 06.
9. Thấy 3 ứng dụng trực tiếp trong ML: noise model cho regression, sampling cho generative model, và "đổi biến" trong normalizing flow.

## Kiến thức tiền đề

- [Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/): PMF, kỳ vọng, phương sai cho biến rời rạc.
- [Calculus Lesson 08 — Tích phân](../../03-Calculus/lesson-08-integrals/): tích phân Riemann, định lý cơ bản (FTC), tích phân từng phần (sẽ dùng nhẹ khi tính E[X] cho Exponential).
- (Tham khảo) [Lesson 02 — Bayes](../lesson-02-conditional-bayes/): để hiểu vì sao normalizing flow cần đổi biến.

---

## 1. Vì sao cần biến liên tục?

### 1.1. Câu chuyện mở bài: cân một cái bánh

> Bạn lấy ra một cái bánh từ lò, đặt lên cân. Cân hiện **152.7 gram**. Hỏi: xác suất cái bánh có khối lượng **chính xác** 152.7 gram là bao nhiêu?

Trực giác đầu tiên: "ờ thì... cao chứ, vì cân đang hiện thế." Nhưng dừng lại một giây — cân chỉ hiện đến 1 chữ số thập phân. Khối lượng thật có thể là 152.7341... hay 152.6986... — vô số khả năng. Nếu cân chính xác hơn (đến 6 chữ số), nó sẽ hiện một con số khác.

Trong thực tế, **chiều cao, thời gian, nhiệt độ, khoảng cách, vận tốc, khối lượng** đều là đại lượng **liên tục**: giữa hai giá trị bất kỳ luôn có vô số giá trị khác. Đây là khác biệt căn bản so với biến rời rạc (số mặt ngửa trong 10 lần tung xu — chỉ có 11 giá trị có thể).

### 1.2. Hai loại biến ngẫu nhiên (so sánh nhanh)

| Đặc trưng | Rời rạc (Lesson 03) | Liên tục (Lesson 04) |
|---|---|---|
| Tập giá trị | Đếm được: `{0, 1, 2, ...}` hoặc hữu hạn | Khoảng số thực: `[0, ∞)`, `(−∞, ∞)`, `[0, 1]` |
| Công cụ mô tả | PMF: `p(x) = P(X = x)` | PDF: `f(x)` — **không** phải xác suất |
| Tổng kiểm tra | `Σ_x p(x) = 1` | `∫ f(x) dx = 1` |
| Xác suất khoảng | `P(a ≤ X ≤ b) = Σ_{x∈[a,b]} p(x)` | `P(a ≤ X ≤ b) = ∫_a^b f(x) dx` |
| `P(X = x)` cho 1 điểm | Có thể > 0 (vd `P(X=3) = 1/6`) | **Luôn = 0** |
| Ví dụ | Số đầu HEAD, số khách vào quán | Chiều cao, thời gian chờ |

Một câu để nhớ: **rời rạc thì cộng, liên tục thì tích phân.**

### 1.3. Trực giác: rời rạc "co lại" thành liên tục

> 💡 **Hình dung**. Tưởng tượng bạn cắt khoảng `[0, 1]` thành 10 ô đều nhau, mỗi ô gán xác suất `1/10`. Đó là PMF rời rạc. Bây giờ cắt thành 100 ô, mỗi ô `1/100`. Rồi 1000 ô, mỗi ô `1/1000`. Khi số ô → ∞, xác suất từng ô → 0, nhưng **mật độ** (xác suất chia cho độ rộng) vẫn = 1. Mật độ này chính là PDF.
>
> Hình ảnh: histogram càng chia mịn → đường cong PDF.

### 📝 Tóm tắt mục 1

- Biến liên tục có vô số giá trị có thể trong một khoảng → không gán xác suất dương cho từng điểm được.
- Thay PMF bằng PDF; thay cộng bằng tích phân.
- Trực giác: PDF là "giới hạn" của histogram khi chia bins càng ngày càng mịn.

---

## 2. PDF — Probability Density Function

### 2.1. Định nghĩa hình thức

> 💡 **Trực giác trước**. `f(x)` **không** phải `P(X = x)`. Hãy đọc `f(x)` như "mật độ xác suất quanh điểm x" — giống như mật độ dân số (người/km²): nó là một **tỉ lệ**, không phải số đếm. Để ra **xác suất thật** trên một vùng, bạn phải nhân mật độ với độ rộng vùng (tức là **tích phân**).

Một hàm `f : ℝ → ℝ` là **PDF** của biến ngẫu nhiên liên tục `X` nếu thoả mãn cả 3:

1. **Không âm**: `f(x) ≥ 0` với mọi `x ∈ ℝ`.
2. **Tổng tích phân bằng 1**: `∫_{-∞}^{∞} f(x) dx = 1`.
3. **Xác suất trên khoảng**: với mọi `a ≤ b`,

   `P(a ≤ X ≤ b) = ∫_a^b f(x) dx.`

Lưu ý: vì `P(X = a) = ∫_a^a f(x) dx = 0`, nên các bất đẳng thức `≤` và `<` cho ra **cùng một xác suất**. Tức là `P(a ≤ X ≤ b) = P(a < X < b)`.

### 2.2. Walk-through 4 ví dụ PDF

#### Ví dụ 1 — PDF hằng số trên `[0, 2]`

Cho `f(x) = 1/2` với `x ∈ [0, 2]`, `f(x) = 0` ngoài đoạn đó.

- Kiểm tra: `∫_0^2 (1/2) dx = (1/2)·2 = 1` ✓.
- `P(0.5 ≤ X ≤ 1.5) = ∫_{0.5}^{1.5} (1/2) dx = (1/2)·1 = 0.5` (đúng nửa khoảng tổng).
- Đây là `Uniform(0, 2)` — sẽ gặp lại ở mục 4.

#### Ví dụ 2 — PDF tam giác

Cho `f(x) = x` với `x ∈ [0, √2]`, `f(x) = 0` ngoài. (Hàm tăng tuyến tính từ 0.)

- Kiểm tra: `∫_0^{√2} x dx = [x²/2]_0^{√2} = 2/2 = 1` ✓.
- `P(X ≤ 1) = ∫_0^1 x dx = [x²/2]_0^1 = 1/2`.
- `P(1 ≤ X ≤ √2) = 1 − 1/2 = 1/2` (bù).

Chú ý: `f(1) = 1`. Nhưng `P(X = 1) = 0`. Giá trị `1` của PDF chỉ nói "mật độ tại x=1 là 1 đơn vị" — không phải xác suất.

#### Ví dụ 3 — PDF không bị chặn bởi 1

Cho `f(x) = 4x³` với `x ∈ [0, 1]`. Tại `x = 1`, `f(1) = 4`.

- Kiểm tra: `∫_0^1 4x³ dx = [x⁴]_0^1 = 1` ✓.
- `P(X ≤ 0.5) = (0.5)⁴ = 0.0625`. Chỉ 6.25% — vì PDF tăng nhanh, khối lượng dồn về bên phải.
- `P(0.9 ≤ X ≤ 1) = 1 − (0.9)⁴ = 1 − 0.6561 = 0.3439`. Đoạn `[0.9, 1]` dài 0.1 nhưng "hứng" 34.39% xác suất.

> ⚠ **Lỗi thường gặp**. Nhiều người tưởng `f(x) ≤ 1` luôn đúng. **Sai.** PDF có thể đạt giá trị **bất kỳ** lớn bao nhiêu cũng được, miễn là tích phân = 1. Vd `f(x) = 100` trên `[0, 0.01]` cũng hợp lệ. Cái duy nhất bị ràng buộc ≤ 1 là **xác suất**, không phải mật độ.

#### Ví dụ 4 — PDF phân phối mũ

Cho `f(x) = 2e^{−2x}` với `x ≥ 0`.

- Kiểm tra: `∫_0^∞ 2e^{−2x} dx = [−e^{−2x}]_0^∞ = 0 − (−1) = 1` ✓.
- `P(X ≤ 1) = ∫_0^1 2e^{−2x} dx = 1 − e^{−2} ≈ 1 − 0.1353 = 0.8647`.
- `P(X ≥ 2) = ∫_2^∞ 2e^{−2x} dx = e^{−4} ≈ 0.0183`.
- Phân phối có "đuôi dài" (heavy tail): xác suất dương cho mọi `x > 0`.

### 2.3. Mệnh đề gây sốc: `P(X = x) = 0`

Nếu `X` liên tục thì `P(X = c) = ∫_c^c f(t) dt = 0` cho mọi `c`.

> ❓ **Câu hỏi tự nhiên của người đọc**: "Vậy đo được chiều cao của 1 người bằng 1.72m thì là gì? Xác suất sự kiện đó = 0 chẳng lẽ nó là sự kiện không thể?"
>
> **Trả lời ngắn**: 0 ≠ không thể. Trong xác suất liên tục, "xác suất = 0" chỉ có nghĩa "mật độ tập trung trên 1 điểm đơn lẻ là 0", **không** nghĩa "sự kiện đó không bao giờ xảy ra". Đây là chỗ trực giác từ xác suất rời rạc bị sai.
>
> **Trả lời dài**: khi nói "đo được 1.72m", bạn thực ra ngầm hiểu là một **khoảng** quanh 1.72 — vd `[1.715, 1.725]` (do dụng cụ đo chính xác đến cm). Xác suất khoảng đó **dương**. Nếu chính xác đến mm, là `[1.7195, 1.7205]` — vẫn dương, nhưng nhỏ hơn. Khi chính xác → "vô hạn" (giảm về điểm), xác suất → 0. Bạn không bao giờ thực sự đo được 1 điểm.

Một câu để nhớ: **"Probability 0 không có nghĩa là impossible — chỉ là measure-zero."** (Người học sâu hơn sẽ gặp lại trong measure theory.)

### 2.4. Phân biệt PDF với probability

> 💡 **Analogy mật độ dân số**. Nếu bảo "mật độ dân số Hà Nội = 2500 người/km²", bạn không thể nói "ở đó có 2500 người". Để biết bao nhiêu người trong một quận, bạn phải nhân mật độ với **diện tích** quận đó. Tương tự, để biết xác suất `X` rơi vào `[a, b]`, bạn nhân **mật độ** với **độ rộng** (qua tích phân).

| Câu | Đúng/Sai | Lý do |
|---|---|---|
| `f(x) ≥ 0` | ✓ | Tiên đề PDF |
| `f(x) ≤ 1` | ✗ | PDF có thể lớn bao nhiêu cũng được |
| `P(X = x) = f(x)` | ✗ | `P(X=x) = 0`, không phải `f(x)` |
| `P(a ≤ X ≤ b) = ∫_a^b f(x) dx` | ✓ | Định nghĩa |
| `P(a ≤ X ≤ b) ≤ 1` | ✓ | Vì xác suất luôn ≤ 1 |
| `P(X ∈ A) = ∫_A f(x) dx` | ✓ | Tổng quát hoá cho tập đo được `A` |

### 🔁 Dừng lại tự kiểm tra (mục 2)

Cho `f(x) = c·x²` trên `[0, 3]`, `f(x) = 0` ngoài. Tìm `c` và tính `P(1 ≤ X ≤ 2)`.

<details>
<summary>Đáp án</summary>

1. Yêu cầu `∫_0^3 c·x² dx = 1` → `c·[x³/3]_0^3 = c·9 = 1` → `c = 1/9`.
2. `P(1 ≤ X ≤ 2) = ∫_1^2 (1/9)·x² dx = (1/9)·[x³/3]_1^2 = (1/9)·(8/3 − 1/3) = (1/9)·(7/3) = 7/27 ≈ 0.259`.
</details>

### 📝 Tóm tắt mục 2

- `f(x)` là **mật độ**, không phải xác suất. Có thể `> 1`.
- Hai tiên đề: `f ≥ 0` và `∫ f = 1`.
- `P(X = c) = 0` cho mọi `c` — vì tích phân trên 1 điểm = 0.
- `P(X ∈ [a,b]) = ∫_a^b f(x) dx`.

---

## 3. CDF — Cumulative Distribution Function

### 3.1. Định nghĩa và quan hệ với PDF

> 💡 **Trực giác**. CDF là "tích luỹ" — bạn đứng ở vị trí `x` và nhìn lại, hỏi "bao nhiêu khối lượng xác suất đã đi qua tới đây?". Khi `x → ∞`, đáp án phải = 1.

**Định nghĩa**. `F(x) = P(X ≤ x) = ∫_{-∞}^x f(t) dt.`

Tính chất:

1. `F` đơn điệu không giảm (vì `f ≥ 0`).
2. `lim_{x → −∞} F(x) = 0`, `lim_{x → ∞} F(x) = 1`.
3. `F` liên tục (cho biến liên tục — khác với rời rạc CDF bậc thang).
4. **Quan trọng**: `F'(x) = f(x)` (định lý cơ bản của giải tích — FTC).
5. `P(a < X ≤ b) = F(b) − F(a)`.

### 3.2. Walk-through số: CDF của PDF tam giác

Lấy lại `f(x) = x` trên `[0, √2]`.

- `F(x) = ∫_0^x t dt = x²/2` cho `x ∈ [0, √2]`.
- `F(0) = 0`, `F(√2) = 2/2 = 1` ✓.
- Kiểm tra `F'(x) = x = f(x)` ✓.
- `P(0.5 ≤ X ≤ 1) = F(1) − F(0.5) = 0.5 − 0.125 = 0.375`.

### 3.3. CDF của Exponential

Với `f(x) = λe^{−λx}` cho `x ≥ 0`:

- `F(x) = ∫_0^x λe^{−λt} dt = [−e^{−λt}]_0^x = 1 − e^{−λx}` cho `x ≥ 0`.
- `F(0) = 0`, `F(∞) = 1` ✓.

Ví dụ với `λ = 2`:

| `x` | `F(x) = 1 − e^{−2x}` | `P(X > x) = e^{−2x}` |
|---|---|---|
| 0.5 | 1 − e^{−1} ≈ 0.6321 | 0.3679 |
| 1.0 | 1 − e^{−2} ≈ 0.8647 | 0.1353 |
| 2.0 | 1 − e^{−4} ≈ 0.9817 | 0.0183 |
| 3.0 | 1 − e^{−6} ≈ 0.9975 | 0.0025 |

### 3.4. Inverse CDF — sampling từ PDF bất kỳ (Inverse Transform Sampling)

> 💡 **Trực giác**. Nếu bạn có `F`, bạn có thể "tạo" mẫu từ `X`: lấy `U ~ Uniform(0,1)`, đặt `X = F⁻¹(U)`. Cơ chế: vì `F(X) ~ Uniform(0,1)` (tính chất quan trọng), nên ngược lại `F⁻¹(U)` có phân phối đúng của `X`.

Ví dụ với Exponential(λ=2): `F(x) = 1 − e^{−2x}` → giải `u = 1 − e^{−2x}` ra `x = −(1/2)·ln(1 − u)`. Vậy `X = −(1/2)·ln(1 − U)` là mẫu Exp(2).

Đây là cách **trình bày trong nhiều thư viện** sinh số ngẫu nhiên (NumPy, Go's `rand.ExpFloat64`, ...). Sẽ dùng lại ở mục 9 (sampling cho ML).

### ❓ Câu hỏi tự nhiên

- "Sao không xài PDF mà phải có thêm CDF?" → Vì CDF cho **xác suất khoảng** trực tiếp qua trừ hai số (`F(b) − F(a)`) — không cần tích phân lại; và CDF dùng để sampling, dùng để định nghĩa quantile (median, percentile).
- "CDF có thể `> 1` không?" → Không. CDF ∈ [0, 1] luôn — vì nó **là** xác suất.
- "CDF có liên tục/khả vi tại mọi điểm không?" → Liên tục: có (cho biến liên tục). Khả vi: gần như mọi nơi; `F'(x) = f(x)` ở những chỗ `f` liên tục.

### 🔁 Dừng lại tự kiểm tra (mục 3)

Cho `f(x) = 3x²` trên `[0, 1]`. Tìm `F(x)` và `P(X ≤ 0.5)`.

<details>
<summary>Đáp án</summary>

`F(x) = ∫_0^x 3t² dt = x³` cho `x ∈ [0,1]`. `P(X ≤ 0.5) = 0.125`.
</details>

### 📝 Tóm tắt mục 3

- CDF `F(x) = P(X ≤ x)` đơn điệu tăng từ 0 → 1.
- `F'(x) = f(x)` (FTC).
- `P(a < X ≤ b) = F(b) − F(a)`.
- Inverse CDF dùng để sampling: `X = F⁻¹(U)` với `U ~ Uniform(0,1)`.

---

## 4. Phân phối đều — Uniform `U(a, b)`

### 4.1. Định nghĩa

> 💡 **Trực giác**. "Đều" = không thiên vị. Trong `[a, b]`, mọi điểm đều có "mật độ" như nhau. Ví dụ: vị trí thả 1 hạt cát ngẫu nhiên trên 1 đoạn ván, hoặc "thời điểm trong ngày" (xấp xỉ).

PDF:

```
        | 1/(b−a)   nếu a ≤ x ≤ b
f(x) = {
        | 0         ngược lại
```

CDF: với `x ∈ [a, b]`, `F(x) = (x − a)/(b − a)`; `F(x) = 0` nếu `x < a`, `F(x) = 1` nếu `x > b`.

### 4.2. Kỳ vọng và phương sai (walk-through)

**Kỳ vọng**:

`E[X] = ∫_a^b x · 1/(b−a) dx = 1/(b−a) · [x²/2]_a^b = 1/(b−a) · (b²−a²)/2 = (b+a)/2.`

(Dùng `b² − a² = (b−a)(b+a)`.) Kết quả: **trung điểm của khoảng**. Hợp lý — không thiên vị thì trung bình ở giữa.

**Kỳ vọng `X²`**:

`E[X²] = ∫_a^b x² · 1/(b−a) dx = 1/(b−a) · (b³ − a³)/3.`

**Phương sai**:

`Var(X) = E[X²] − E[X]² = (b³−a³)/(3(b−a)) − ((a+b)/2)².`

Dùng `b³ − a³ = (b−a)(b² + ab + a²)`:

`Var(X) = (b² + ab + a²)/3 − (a + b)²/4.`

Quy đồng mẫu 12:

`Var(X) = [4(b² + ab + a²) − 3(a + b)²] / 12 = [4b² + 4ab + 4a² − 3a² − 6ab − 3b²]/12 = (a² − 2ab + b²)/12 = (b − a)²/12.`

**Kết quả gọn:**

`E[X] = (a + b)/2, Var(X) = (b − a)²/12, σ = (b − a)/√12 ≈ 0.2887·(b−a).`

### 4.3. Ví dụ số

`U(0, 1)`: `E = 0.5`, `Var = 1/12 ≈ 0.0833`, `σ ≈ 0.2887`.

`U(2, 8)`: `E = 5`, `Var = 36/12 = 3`, `σ = √3 ≈ 1.732`.

`U(−1, 1)`: `E = 0`, `Var = 4/12 = 1/3 ≈ 0.333`, `σ ≈ 0.577`.

`U(0, 10)`: `E = 5`, `Var = 100/12 ≈ 8.333`, `σ ≈ 2.887`.

### 4.4. Khi nào dùng Uniform?

- **Khi không có thông tin tiên nghiệm**: trong Bayesian, Uniform thường là prior cho tham số bị chặn (vd `θ ∈ [0, 1]`).
- **Random number generation**: hầu hết hàm `rand()` trả `U(0, 1)`. Mọi phân phối khác đều bắt đầu từ đây (qua inverse CDF hoặc Box-Muller).
- **Dữ liệu thật sự đều**: ít thấy trong tự nhiên, nhưng vd "vị trí được chọn ngẫu nhiên trên 1 đoạn", "thời gian đến trong ngày của 1 yêu cầu vô tổ chức".

### 📝 Tóm tắt mục 4

- `U(a,b)`: PDF hằng = `1/(b−a)` trên `[a,b]`.
- `E[X] = (a+b)/2`, `Var = (b−a)²/12`.
- Là viên gạch cơ sở cho mọi sampling khác.

---

## 5. Phân phối mũ — `Exp(λ)`

### 5.1. Định nghĩa và bối cảnh

> 💡 **Trực giác**. `Exp(λ)` mô hình **thời gian chờ** giữa các sự kiện hiếm, độc lập, xảy ra với tốc độ trung bình `λ` lần/đơn vị. Ví dụ: thời gian giữa hai cuộc gọi tới tổng đài, thời gian sống của bóng đèn, thời gian giữa hai lần rơi vỡ máy chủ.
>
> Quan hệ với Poisson (Lesson 03): nếu số sự kiện trong 1 đơn vị thời gian là `Poisson(λ)`, thì **khoảng thời gian giữa các sự kiện** là `Exp(λ)`. Hai bộ mặt của cùng một quá trình (Poisson process).

PDF:

```
        | λ·e^{−λx}   nếu x ≥ 0
f(x) = {
        | 0           nếu x < 0
```

CDF: `F(x) = 1 − e^{−λx}` cho `x ≥ 0`.

### 5.2. Kỳ vọng và phương sai (walk-through, dùng tích phân từng phần)

**Kỳ vọng**:

`E[X] = ∫_0^∞ x · λe^{−λx} dx.`

Đặt `u = x, dv = λe^{−λx} dx`. Khi đó `du = dx`, `v = −e^{−λx}`. Tích phân từng phần:

`E[X] = [−x·e^{−λx}]_0^∞ + ∫_0^∞ e^{−λx} dx = 0 + [−1/λ · e^{−λx}]_0^∞ = 0 − (−1/λ) = 1/λ.`

(`x·e^{−λx} → 0` khi `x → ∞` vì exponential áp đảo polynomial.)

**Kết quả**: `E[X] = 1/λ`.

**Kỳ vọng `X²`** (làm tương tự, 2 lần tích phân từng phần — hoặc dùng moment generating function): `E[X²] = 2/λ²`.

**Phương sai**: `Var(X) = 2/λ² − (1/λ)² = 1/λ²`. Vậy `σ = 1/λ = E[X]` — phân phối có σ = mean (đặc trưng riêng của Exp).

### 5.3. Ví dụ số

`Exp(1)`: `E = 1`, `Var = 1`. Cuộc gọi đến trung bình mỗi 1 phút.

`Exp(2)`: `E = 0.5`, `Var = 0.25`, `σ = 0.5`. Cuộc gọi đến mỗi 0.5 phút (tốc độ 2 cuộc/phút).

`Exp(0.5)`: `E = 2`, `Var = 4`, `σ = 2`. Trung bình 2 phút/cuộc.

`Exp(10)`: `E = 0.1`, `Var = 0.01`, `σ = 0.1`. Sự kiện rất dày.

### 5.4. Tính chất memoryless

> 💡 **Trực giác**. "Bóng đèn đã sống 100h. Xác suất nó sống thêm 50h nữa, là **bằng** với xác suất một bóng đèn mới sống được 50h." Tức là bóng đèn không có "tuổi" — quá khứ không ảnh hưởng tương lai.

Hình thức: với `s, t > 0`,

`P(X > s + t | X > s) = P(X > t).`

**Chứng minh từng bước** (không lươn lẹo):

```
P(X > s + t | X > s) = P(X > s + t AND X > s) / P(X > s)
                    = P(X > s + t) / P(X > s)         (vì {X > s+t} ⊂ {X > s})
                    = e^{−λ(s+t)} / e^{−λs}
                    = e^{−λt}
                    = P(X > t).
```

Exponential là **phân phối liên tục duy nhất** có tính chất này. Trong rời rạc, tương ứng là Geometric (Lesson 03).

> ❓ **Câu hỏi tự nhiên**: "Memoryless có nghĩa lý gì trong thực tế?" → Là **giả định mô hình**, không phải sự thật. Trong đời thật, bóng đèn cũ hơn → dễ hỏng hơn (lão hoá). Memoryless chỉ đúng cho các quá trình mà "tốc độ hỏng" hằng — ví dụ phân rã hạt nhân, chờ một tin nhắn ngẫu nhiên. Khi cần mô hình lão hoá, dùng **Weibull** hoặc **Gamma**.

### 5.5. Khi nào dùng Exponential trong ML?

- **Survival analysis**: thời gian đến khi user churn, máy hỏng.
- **Reinforcement learning**: trong policy có "soft" actions, đôi khi noise được lấy từ Exp.
- **Bayesian priors**: cho tham số dương (vd precision của Gaussian).
- **Sampling baseline**: do có inverse CDF dạng đóng (`X = −ln(1−U)/λ`), Exp là 1 trong vài phân phối sample được trực tiếp.

### 🔁 Dừng lại tự kiểm tra (mục 5)

Một website nhận trung bình 3 request/giây. Giả sử thời gian giữa các request `~ Exp(3)`. Hỏi `P(không có request nào trong 2 giây)`?

<details>
<summary>Đáp án</summary>

`P(X > 2) = e^{−3·2} = e^{−6} ≈ 0.00248` ≈ 0.25%.
</details>

### 📝 Tóm tắt mục 5

- `Exp(λ)`: PDF `λe^{−λx}` trên `[0, ∞)`.
- `E = 1/λ`, `Var = 1/λ²`.
- Memoryless: quá khứ không tính.
- Liên quan trực tiếp Poisson process.

---

## 6. Đổi biến (Change of Variables)

### 6.1. Vấn đề

> Bạn có `X ~ U(0, 1)`. Đặt `Y = X²`. Hỏi PDF của `Y` là gì?

Nhầm thường gặp: "`f_Y(y) = f_X(√y)` chăng?" — **Sai**. Khi đổi biến, không chỉ giá trị di chuyển, mà cả "mật độ" cũng bị **co/dãn** theo tỉ lệ.

### 6.2. Công thức (với `g` đơn điệu, khả vi)

Cho `Y = g(X)` với `g` đơn điệu (tăng hoặc giảm) và khả vi. Đặt `X = g⁻¹(Y)`. Khi đó:

`f_Y(y) = f_X(g⁻¹(y)) · |d/dy g⁻¹(y)| = f_X(x) · |1/g'(x)|.`

**Trực giác**: yếu tố `|dg⁻¹/dy|` (Jacobian) đo "khoảng cách `dx` ánh xạ sang `dy` rộng/hẹp như thế nào". Nếu `g` "ép" `x` thành `y` ở vùng đó (dy nhỏ hơn dx), mật độ ở `y` phải **cao hơn** ở `x` — vì cùng "lượng xác suất" bị nén vào khoảng nhỏ hơn.

### 6.3. Walk-through 1: `Y = X²` với `X ~ U(0, 1)`

- `X ~ U(0,1)` → `f_X(x) = 1` trên `[0, 1]`.
- `Y = X²` → `Y ∈ [0, 1]`.
- `g(x) = x²` đơn điệu tăng trên `[0,1]`. `g⁻¹(y) = √y`. `d/dy g⁻¹(y) = 1/(2√y)`.

Áp dụng:

`f_Y(y) = f_X(√y) · |1/(2√y)| = 1 · 1/(2√y) = 1/(2√y)` cho `y ∈ (0, 1].`

**Kiểm tra tổng = 1**: `∫_0^1 1/(2√y) dy = [√y]_0^1 = 1` ✓.

**Quan sát**: `f_Y(y)` **không bị chặn** khi `y → 0` (vì `1/√y → ∞`). Nhưng tích phân vẫn hữu hạn = 1. Khối lượng dồn về phía 0 — hợp lý vì `X² < X` cho `X ∈ (0,1)`, nên `Y` "lệch trái".

**Sanity check với CDF** (cách 2 — không dùng công thức Jacobian):

`F_Y(y) = P(Y ≤ y) = P(X² ≤ y) = P(X ≤ √y) = √y` cho `y ∈ [0,1]`.

Khả vi: `f_Y(y) = F_Y'(y) = 1/(2√y)` ✓.

### 6.4. Walk-through 2: `Y = e^X` với `X ~ Exp(λ)`

Đây là một dạng "log-something". `Y = e^X` → `X = ln Y` → `dx/dy = 1/y`.

- `X ~ Exp(λ)`: `f_X(x) = λe^{−λx}` cho `x ≥ 0`. Khi `x = 0`, `y = e^0 = 1`. Vậy `Y ≥ 1`.
- `g(x) = e^x` đơn điệu tăng. `g⁻¹(y) = ln y`. `d/dy ln y = 1/y`.

`f_Y(y) = f_X(ln y) · |1/y| = λ·e^{−λ·ln y} · 1/y = λ·y^{−λ} · 1/y = λ·y^{−(λ+1)}` cho `y ≥ 1`.

**Kiểm tra**: `∫_1^∞ λ·y^{−(λ+1)} dy = λ · [−y^{−λ}/λ]_1^∞ = 0 − (−1) = 1` ✓ (giả sử `λ > 0`).

Đây là **phân phối Pareto** (đuôi power-law) — gặp nhiều trong kinh tế (phân bố thu nhập), web (số follower).

### 6.5. Trường hợp `g` không đơn điệu

Nếu `g` không đơn điệu (vd `g(x) = x²` trên toàn `ℝ`), một giá trị `y` có **nhiều** giá trị `x` thoả `g(x) = y`. Khi đó:

`f_Y(y) = Σ_{x : g(x) = y} f_X(x) · |1/g'(x)|.`

Ví dụ: `X ~ U(−1, 1)`, `Y = X²`. Mỗi `y ∈ (0, 1]` có 2 nguồn `x = ±√y`.

- `f_X(x) = 1/2` trên `[−1, 1]`.
- `|1/g'(x)| = 1/|2x| = 1/(2√y)`.
- 2 nguồn: `f_Y(y) = 2 · (1/2) · 1/(2√y) = 1/(2√y)` cho `y ∈ (0, 1]`.

Cùng kết quả như mục 6.3 (vì `|X|` với `X~U(−1,1)` có cùng phân phối `X` với `X~U(0,1)`).

### 6.6. Liên hệ ML: Normalizing Flows

Trong ML, **normalizing flow** là kỹ thuật xây phân phối phức tạp từ phân phối đơn giản qua chuỗi đổi biến **khả nghịch**: `Z ~ N(0, I)`, `X = g(Z)` với `g` là composition của nhiều phép biến đổi khả nghịch. Khi đó:

`log p_X(x) = log p_Z(g⁻¹(x)) + log |det J_{g⁻¹}(x)|.`

Đây chính là **công thức đổi biến nhiều chiều** — chỉ thêm định thức Jacobian. Đó là lý do bạn cần hiểu công thức 1 chiều ở mục này trước. Sẽ học sâu trong Tầng AI/ML.

### ⚠ Lỗi thường gặp

- Quên `|·|` (giá trị tuyệt đối) → nhận PDF âm. PDF luôn ≥ 0.
- Khi `g` không đơn điệu mà quên **tổng** trên các nhánh `g⁻¹` → ra sai tổng tích phân.
- Quên đổi miền giá trị (`Y` chạy đâu đến đâu?).

### 🔁 Dừng lại tự kiểm tra (mục 6)

`X ~ Exp(1)`, đặt `Y = 2X + 3`. Tìm `f_Y(y)`.

<details>
<summary>Đáp án</summary>

`g(x) = 2x + 3`, `g⁻¹(y) = (y−3)/2`, `|dg⁻¹/dy| = 1/2`.

`f_Y(y) = f_X((y−3)/2) · 1/2 = e^{−(y−3)/2} · 1/2 = (1/2)·e^{−(y−3)/2}` cho `y ≥ 3`.

Đây là Exp(1/2) bị dịch sang phải 3 đơn vị (location-scale family).
</details>

### 📝 Tóm tắt mục 6

- 1 chiều, `g` đơn điệu: `f_Y(y) = f_X(g⁻¹(y)) · |dg⁻¹/dy|`.
- Yếu tố Jacobian co/dãn mật độ.
- Tổng nhiều nhánh nếu `g` không đơn điệu.
- Là cơ sở cho normalizing flows trong generative ML.

---

## 7. Joint PDF — 2 biến liên tục

### 7.1. Định nghĩa

Cho 2 biến `X, Y` liên tục cùng nhau. **Joint PDF** `f_{X,Y}(x, y)` thoả:

1. `f_{X,Y}(x, y) ≥ 0`.
2. `∫∫_{ℝ²} f_{X,Y}(x, y) dx dy = 1`.
3. `P((X, Y) ∈ A) = ∫∫_A f_{X,Y}(x, y) dx dy` cho mọi tập đo được `A ⊂ ℝ²`.

### 7.2. Marginal — "quên" 1 biến

PDF của riêng `X` (gọi là **marginal**) tính bằng tích phân ra biến kia:

`f_X(x) = ∫_{-∞}^{∞} f_{X,Y}(x, y) dy.`

Tương tự `f_Y(y) = ∫_{-∞}^{∞} f_{X,Y}(x, y) dx.`

### 7.3. Độc lập

`X, Y` độc lập ⟺ `f_{X,Y}(x, y) = f_X(x) · f_Y(y)` cho mọi `x, y`.

### 7.4. Ví dụ số

Cho `f_{X,Y}(x, y) = 4xy` trên `[0,1]²`, 0 ngoài.

- Tổng: `∫_0^1 ∫_0^1 4xy dx dy = 4 · (∫_0^1 x dx)(∫_0^1 y dy) = 4 · 0.5 · 0.5 = 1` ✓.
- Marginal `f_X(x) = ∫_0^1 4xy dy = 4x · [y²/2]_0^1 = 2x` cho `x ∈ [0,1]`.
- Tương tự `f_Y(y) = 2y`.
- Kiểm tra độc lập: `f_X(x)·f_Y(y) = 2x · 2y = 4xy = f_{X,Y}` ✓ → `X, Y` độc lập.

Một ví dụ KHÔNG độc lập: `f(x,y) = 2` trên tam giác `0 ≤ y ≤ x ≤ 1`.

- Tổng: `∫_0^1 ∫_0^x 2 dy dx = ∫_0^1 2x dx = 1` ✓.
- `f_X(x) = ∫_0^x 2 dy = 2x` cho `x ∈ [0,1]`.
- `f_Y(y) = ∫_y^1 2 dx = 2(1−y)` cho `y ∈ [0,1]`.
- `f_X(x)·f_Y(y) = 4x(1−y) ≠ 2 = f(x,y)` → KHÔNG độc lập.

### 7.5. Joint nhiều chiều — đặt nền cho Lesson 06

Khi có `n` biến `X_1, ..., X_n`, joint PDF là `f(x_1, ..., x_n)`. Covariance `Cov(X_i, X_j)` đo "đồng biến tuyến tính" giữa cặp — sẽ học kỹ ở Lesson 06.

### 📝 Tóm tắt mục 7

- Joint PDF mô tả 2 biến cùng lúc; tích phân kép = 1.
- Marginal = "tích phân ra biến kia".
- Độc lập ⟺ joint = tích các marginal.

---

## 8. Liên hệ Machine Learning

### 8.1. Noise model trong regression

Mô hình linear regression `y = w·x + b + ε`, với `ε ~ N(0, σ²)` (Gaussian — Lesson 05).

- Tại sao Gaussian? Vì nếu giả sử noise đối xứng, độc lập, có phương sai hữu hạn — định lý giới hạn trung tâm (CLT) nói tổng noise → Gaussian.
- Khi training: maximize `Π_i f(y_i | x_i; w)` = minimize `Σ (y_i − w·x_i − b)² / (2σ²)` (do PDF Gaussian có dạng exp của bình phương). Đây là **MSE loss** — chính là MLE dưới giả định noise Gaussian.

Tổng quát: chọn PDF cho noise = chọn loss function. Laplace noise → L1 loss. Sẽ rõ ở Lesson 07 (MLE).

### 8.2. Sampling — generative model & diffusion

Mọi generative model (VAE, GAN, diffusion) đều cần **sampling** từ phân phối phức tạp.

**Diffusion (DDPM)** dạy cách:

1. Lấy ảnh `x_0` từ data.
2. Thêm Gaussian noise dần qua T step: `x_t = √(α_t)·x_0 + √(1−α_t)·ε`, `ε ~ N(0, I)`.
3. Học model "reverse" để gỡ noise. Mỗi step, model output trung bình & phương sai của Gaussian — sample từ đó để ra `x_{t−1}`.

Toàn bộ DDPM = chuỗi phép sampling Gaussian. Hiểu PDF, sampling, change of variable là tiền đề.

### 8.3. Normalizing Flow & Variational Inference

- **Normalizing flow**: `X = g(Z)`, `Z ~ N(0,I)`. `log p_X(x) = log p_Z(g⁻¹(x)) + log|det J_{g⁻¹}|`. Train bằng maximize log-likelihood.
- **Variational Inference (VI)**: xấp xỉ posterior `p(z|x)` bằng phân phối tham số hoá `q_φ(z|x)` (vd Gaussian) → minimize KL divergence (Lesson 08).

Cả hai dùng đến công thức đổi biến và PDF Gaussian.

### 8.4. Inverse-CDF sampling trong thực tế

Khi cần sample từ phân phối có CDF dạng đóng (Exponential, Uniform), thuật toán đơn giản:

```
1. Lấy u = uniform(0, 1).
2. Trả về x = F⁻¹(u).
```

Code Go giả định:

```go
func sampleExp(lambda float64) float64 {
    u := rand.Float64()       // U(0,1)
    return -math.Log(1-u) / lambda
}
```

Khi phân phối không có CDF dạng đóng (Gaussian), dùng các thuật toán khác: Box-Muller, rejection sampling, Metropolis-Hastings (Bayesian).

### 📝 Tóm tắt mục 8

- Chọn PDF noise = chọn loss function. Gaussian → MSE.
- Diffusion = chuỗi sampling Gaussian.
- Flow & VI dùng change of variables.
- Inverse-CDF sampling là kỹ thuật cơ sở.

---

## 9. Đóng các câu hỏi tự nhiên (Q&A)

### Q1. `P(X = x) = 0` thì có nghĩa lý gì?

Đáp: "xác suất = 0" trong xác suất liên tục **không** đồng nghĩa "sự kiện không thể xảy ra". Nó nghĩa là **mật độ tập trung trên 1 điểm = 0** (vì 1 điểm có độ rộng 0). Đo thực tế luôn cho ra 1 khoảng (do thiết bị có sai số), và xác suất của một khoảng có thể dương.

Một ví dụ chặt: chọn ngẫu nhiên 1 số thực trong `[0, 1]`. Xác suất chọn được số 0.5 chính xác là 0. Nhưng bạn vẫn có thể nói "chọn được 1 số nào đó" — đó là sự kiện chắc chắn. Mâu thuẫn? Không — vì tập "1 số nào đó" là toàn bộ `[0,1]`, có xác suất 1.

### Q2. PDF có thể `> 1` không?

Có. Vd `f(x) = 100` trên `[0, 0.01]` hợp lệ (∫ = 1). Cái ràng buộc ≤ 1 là **xác suất**, không phải mật độ.

### Q3. CDF luôn liên tục cho biến liên tục?

Có. Nếu CDF có bước nhảy `≥ 0` tại 1 điểm, thì điểm đó có `P(X = x) > 0` → biến **không** thuần liên tục (gọi là mixed).

### Q4. Tại sao công thức đổi biến có Jacobian `|dg⁻¹/dy|`?

Cách hình dung dễ nhất: trên `dx` nhỏ, `dy ≈ g'(x)·dx`. Để bảo toàn xác suất `f_X(x) dx = f_Y(y) dy`, phải có `f_Y(y) = f_X(x) · dx/dy = f_X(x)/|g'(x)| = f_X(g⁻¹(y))·|dg⁻¹/dy|`. Giá trị tuyệt đối là để PDF không âm.

### Q5. PDF và histogram khác gì?

Histogram là **ước lượng thực nghiệm** của PDF từ dữ liệu hữu hạn. Khi N → ∞ và bin width → 0 (đúng tỉ lệ), histogram (sau khi normalize) hội tụ về PDF lý thuyết. Đây là Kernel Density Estimation (KDE) — phương pháp mượt hơn histogram.

### Q6. Bậc của Var: tại sao chia 12 cho Uniform, chia λ² cho Exp?

Khác nhau vì hai phân phối có **độ rộng** khác nhau. Var đo "phương sai bình phương từ mean". Uniform có support `[a,b]` chặn, nên Var hữu hạn và phụ thuộc `(b−a)²`. Exp có support `[0,∞)`, nhưng đuôi exp giảm nhanh, nên Var hữu hạn = `1/λ²`. Khi λ nhỏ (đuôi dày), Var lớn.

---

## 10. Bài tập thực hành

> Làm xong từng bài, mở phần "Lời giải chi tiết" bên dưới để đối chiếu.

### Bài 1 — Chuẩn hoá PDF

Cho `f(x) = c·(1 − x²)` trên `[−1, 1]`, 0 ngoài.

(a) Tìm `c` để `f` là PDF.
(b) Tính `P(|X| ≤ 0.5)`.
(c) Tính `F(x)` cho `x ∈ [−1, 1]`.

### Bài 2 — Uniform thực hành

Một xe buýt đến trạm đều đặn mỗi 15 phút. Bạn đến trạm vào thời điểm ngẫu nhiên (giả định `T ~ U(0, 15)` = thời gian từ khi xe buýt cuối cùng rời trạm). Hỏi:

(a) `E[thời gian chờ]` là bao nhiêu?
(b) `P(chờ ≤ 5 phút)` ?
(c) `P(chờ ≥ 10 phút)` ?

### Bài 3 — Exp tính

Tuổi thọ một con CPU `~ Exp(λ)` với mean = 5 năm.

(a) Tìm `λ`.
(b) `P(CPU sống ≥ 7 năm)`?
(c) Một CPU đã chạy 3 năm. `P(chạy thêm ≥ 4 năm nữa)`?

### Bài 4 — Đổi biến: log-normal

`X ~ U(0, 1)`. Đặt `Y = −ln X`. Tìm `f_Y(y)`. Bạn nhận ra phân phối nào không?

### Bài 5 — Joint PDF

Cho `f(x, y) = c·(x + y)` trên `[0, 1]²`, 0 ngoài.

(a) Tìm `c`.
(b) Tìm marginal `f_X(x)`, `f_Y(y)`.
(c) `X, Y` có độc lập không?
(d) Tính `P(X + Y ≤ 1)`.

### Bài 6 — Inverse CDF sampling (thiết kế)

Bạn cần code 1 hàm trả về 1 sample từ `f(x) = 2x` trên `[0, 1]`. Bạn chỉ có sẵn `rand.Float64()` (cho `U(0,1)`).

(a) Tìm CDF `F(x)`.
(b) Tìm inverse `F⁻¹(u)`.
(c) Viết pseudocode cho hàm `sample()`.

---

## 11. Lời giải chi tiết

### Lời giải Bài 1

(a) `∫_{−1}^1 c·(1 − x²) dx = c · [x − x³/3]_{−1}^1 = c · [(1 − 1/3) − (−1 + 1/3)] = c · (2/3 + 2/3) = 4c/3`.

Đặt `4c/3 = 1` → `c = 3/4`.

(b) `P(|X| ≤ 0.5) = P(−0.5 ≤ X ≤ 0.5) = ∫_{−0.5}^{0.5} (3/4)(1 − x²) dx = (3/4)·[x − x³/3]_{−0.5}^{0.5}`.

Tại `x = 0.5`: `0.5 − 0.125/3 = 0.5 − 0.04167 = 0.4583`.
Tại `x = −0.5`: `−0.5 + 0.04167 = −0.4583`.
Hiệu: `0.4583 − (−0.4583) = 0.9167`.

`P = (3/4) · 0.9167 = 0.6875 = 11/16`.

(c) `F(x) = ∫_{−1}^x (3/4)(1 − t²) dt = (3/4)·[t − t³/3]_{−1}^x = (3/4)·[(x − x³/3) − (−1 + 1/3)] = (3/4)·(x − x³/3 + 2/3)`.

Gọn: `F(x) = (3x − x³ + 2)/4` cho `x ∈ [−1, 1]`. Kiểm tra `F(1) = (3 − 1 + 2)/4 = 4/4 = 1` ✓; `F(−1) = (−3 + 1 + 2)/4 = 0` ✓.

### Lời giải Bài 2

Thời gian chờ = `15 − T` nếu xe đến đều mỗi 15p. Nhưng cách dễ hơn: thời gian chờ `W ~ U(0, 15)` (tương đương vì đối xứng).

(a) `E[W] = (0 + 15)/2 = 7.5` phút.

(b) `P(W ≤ 5) = 5/15 = 1/3 ≈ 0.333`.

(c) `P(W ≥ 10) = (15 − 10)/15 = 1/3 ≈ 0.333`.

### Lời giải Bài 3

(a) `E[X] = 1/λ = 5` → `λ = 0.2` /năm.

(b) `P(X ≥ 7) = e^{−λ·7} = e^{−1.4} ≈ 0.2466` ≈ 24.66%.

(c) **Memoryless**: `P(X ≥ 7 | X ≥ 3) = P(X ≥ 4) = e^{−0.2·4} = e^{−0.8} ≈ 0.4493`. (Quá khứ 3 năm "không tính".)

### Lời giải Bài 4

`X ~ U(0, 1)` → `f_X(x) = 1` trên `[0, 1]`. `Y = −ln X`. Khi `x ∈ (0, 1]`, `y = −ln x ∈ [0, ∞)`.

`g(x) = −ln x` đơn điệu giảm. `g⁻¹(y) = e^{−y}`. `dg⁻¹/dy = −e^{−y}`. `|...| = e^{−y}`.

`f_Y(y) = f_X(e^{−y}) · e^{−y} = 1 · e^{−y} = e^{−y}` cho `y ≥ 0`.

→ `Y ~ Exp(1)`. (Đây chính là inverse-CDF sampling cho Exp(1)!)

### Lời giải Bài 5

(a) `∫_0^1 ∫_0^1 c·(x + y) dx dy = c · ∫_0^1 [x²/2 + xy]_0^1 dy = c · ∫_0^1 (1/2 + y) dy = c · (1/2 + 1/2) = c`.

Đặt `c = 1`.

(b) `f_X(x) = ∫_0^1 (x + y) dy = x + 1/2` cho `x ∈ [0, 1]`. Tương tự `f_Y(y) = y + 1/2`.

(c) `f_X(x)·f_Y(y) = (x + 1/2)(y + 1/2) = xy + x/2 + y/2 + 1/4 ≠ x + y = f_{X,Y}`. → **Không độc lập**.

(d) `P(X + Y ≤ 1) = ∫_0^1 ∫_0^{1−x} (x + y) dy dx = ∫_0^1 [xy + y²/2]_0^{1−x} dx = ∫_0^1 (x(1−x) + (1−x)²/2) dx`.

Khai triển: `x − x² + (1 − 2x + x²)/2 = x − x² + 1/2 − x + x²/2 = 1/2 − x²/2`.

`∫_0^1 (1/2 − x²/2) dx = 1/2 − 1/6 = 1/3`.

### Lời giải Bài 6

(a) `F(x) = ∫_0^x 2t dt = x²` cho `x ∈ [0, 1]`.

(b) Giải `u = x²` → `x = √u`. Vậy `F⁻¹(u) = √u`.

(c) Pseudocode (Go-style):

```go
func sample() float64 {
    u := rand.Float64()  // U(0,1)
    return math.Sqrt(u)
}
```

Kiểm tra: nếu `U ~ U(0,1)`, thì `√U` có CDF `P(√U ≤ x) = P(U ≤ x²) = x²` (cho `x ∈ [0,1]`). Khả vi: `f(x) = 2x` ✓.

---

## 12. Tham khảo và bài tiếp theo

- **Bài trước**: [Lesson 03 — Biến ngẫu nhiên rời rạc](../lesson-03-discrete-rv/)
- **Bài tiếp**: [Lesson 05 — Phân phối chuẩn (Gaussian)](../lesson-05-normal-distribution/) — Gaussian là **THE** phân phối liên tục của ML; sẽ dẫn ra MSE loss, CLT, và đặt nền cho Lesson 06–08.
- **Tích phân**: [Calculus Lesson 08](../../03-Calculus/lesson-08-integrals/)
- **Tham khảo ngoài**:
  - Wasserman, *All of Statistics*, Ch. 2–3.
  - Bishop, *Pattern Recognition and ML*, Ch. 2 (distributions).
  - 3Blue1Brown — *Bayes theorem, the geometry of changing beliefs* (intuition về density).
- **Visualization**: [visualization.html](./visualization.html) — 4 component tương tác (PDF/CDF, interval probability, change of variables, sampling histogram).
