// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/03-Calculus/lesson-05-optimization-1d/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Cực trị 1 biến (Optimization 1D)

> "Học machine learning = giải bài toán tối ưu hóa. Đạo hàm là công cụ. Tại đáy thung lũng, độ dốc bằng 0."

Bài này chốt lại lý thuyết đạo hàm 1 biến (Lesson 02-04) bằng câu chuyện **tìm cực trị**: vì sao \`f'(x) = 0\` lại quan trọng, làm sao biết đó là max hay min, và tại sao mọi bài toán huấn luyện model machine learning đều quy về tìm cực trị của một loss function.

## Mục tiêu học tập

Sau bài này bạn cần:

- Hiểu **vì sao** tại điểm cực trị địa phương của hàm khả vi thì \`f'(x) = 0\` (điều kiện cần).
- Phân biệt rõ **điều kiện cần** và **điều kiện đủ** — biết một critical point (điểm tới hạn) chưa chắc là cực trị.
- Sử dụng được **first derivative test** (xét dấu f') và **second derivative test** (xét f'') để phân loại critical point là max / min / không phải cực trị.
- Tìm được **cực trị toàn cục** trên một đoạn đóng \`[a, b]\` bằng cách so sánh giá trị tại critical points + tại biên.
- Hiểu **điểm uốn (inflection point)** — nơi đường cong chuyển từ lồi sang lõm.
- Áp dụng được vào ví dụ **linear regression 1 chiều** — giải đóng (closed-form) bằng cách đặt đạo hàm bằng 0.
- Biết vì sao trong neural network không giải \`∇f = 0\` trực tiếp mà phải dùng iterative method (gradient descent — Lesson 07).

## Prerequisites

- [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/) — định nghĩa f'(x) và ý nghĩa hình học (slope tiếp tuyến).
- [Lesson 03 — Quy tắc đạo hàm](../lesson-03-derivative-rules/) — đạo hàm polynomial, exp, log, trig.
- [Lesson 04 — Chain rule](../lesson-04-chain-rule/) — đạo hàm hàm hợp; cần cho ví dụ MSE loss.
- Đại số bậc 2 ([Algebra Lesson 06](../../01-Algebra/lesson-06-linear-quadratic/)) — vì critical point của loss tuyến tính bậc 2 chính là đỉnh parabol.

---

## 1. Trực giác — tìm "đáy thung lũng" hoặc "đỉnh núi"

> 💡 **Trực giác / Hình dung.** Tưởng tượng bạn đang đi bộ trên đồ thị \`y = f(x)\`. Bạn muốn tìm:
> - **Điểm thấp nhất** (minimum) — đáy một thung lũng.
> - **Điểm cao nhất** (maximum) — đỉnh một ngọn núi.
>
> Tại đáy thung lũng và đỉnh núi, mặt đất **nằm ngang** một khoảnh khắc — đường tiếp tuyến song song với trục x. Mà slope của tiếp tuyến chính là \`f'(x)\`, nên ở những điểm đó: \`f'(x) = 0\`.

Đây là phát hiện then chốt của giải tích vi phân: **đạo hàm cung cấp một phương trình đại số để tìm cực trị**, thay vì phải duyệt từng điểm trên đồ thị.

### 1.1 Định nghĩa cực trị địa phương vs toàn cục

**Cực trị địa phương (local extremum)** — chỉ so sánh với các điểm "gần đó":

- Điểm \`x = a\` là **cực đại địa phương** nếu tồn tại khoảng mở \`(a − δ, a + δ)\` sao cho \`f(a) ≥ f(x)\` với mọi \`x\` trong khoảng đó.
- Điểm \`x = a\` là **cực tiểu địa phương** nếu tồn tại khoảng mở \`(a − δ, a + δ)\` sao cho \`f(a) ≤ f(x)\` với mọi \`x\` trong khoảng đó.

**Cực trị toàn cục (global / absolute extremum)** — so sánh trên toàn miền:

- \`x = a\` là **cực đại toàn cục** trên miền D nếu \`f(a) ≥ f(x)\` với mọi \`x ∈ D\`.
- \`x = a\` là **cực tiểu toàn cục** nếu \`f(a) ≤ f(x)\` với mọi \`x ∈ D\`.

Một điểm có thể là cực đại địa phương nhưng không phải cực đại toàn cục — ví dụ một quả đồi giữa hai dãy núi cao hơn.

### 1.2 Vì sao slope = 0 tại cực trị?

Lập luận trực giác (sẽ chứng minh chặt ở mục 2):

Giả sử \`a\` là cực tiểu địa phương. Đi qua a từ trái sang phải:
- Trước a: hàm đang **giảm** (đi xuống dốc) → slope **âm**: \`f'(x) < 0\`.
- Sau a: hàm bắt đầu **tăng** (đi lên dốc) → slope **dương**: \`f'(x) > 0\`.
- Tại a: slope chuyển từ âm sang dương → **đi qua 0**.

Nếu f' liên tục, theo định lý giá trị trung gian, \`f'(a) = 0\`.

> ❓ **Câu hỏi tự nhiên.**
> - *"Nếu f không khả vi tại a (vd góc nhọn) thì sao?"* — Vẫn có thể là cực trị! Ví dụ \`f(x) = |x|\` có cực tiểu tại 0, nhưng \`f'(0)\` không tồn tại. Critical point gồm CẢ những chỗ f' không tồn tại — xem mục 4.
> - *"Nếu cả \`f'(a) = 0\` thì a chắc chắn là cực trị?"* — KHÔNG. Phản ví dụ: \`f(x) = x³\` tại x=0 có \`f'(0) = 0\` nhưng không phải cực trị (hàm vẫn tăng đều, slope = 0 chỉ là một khoảnh khắc nằm ngang rồi tiếp tục đi lên). Xem mục 3.

---

## 2. Điều kiện cần (Necessary Condition) — Fermat's Theorem

**Định lý (Fermat).** Nếu hàm \`f\` có cực trị địa phương tại \`x = a\` VÀ \`f\` khả vi tại \`a\`, thì:

\`\`\`
f'(a) = 0
\`\`\`

### 2.1 Chứng minh từng bước

Giả sử \`a\` là cực đại địa phương (trường hợp cực tiểu hoàn toàn tương tự, đổi dấu bất đẳng thức).

Vì \`f\` khả vi tại \`a\`, đạo hàm tồn tại:

\`\`\`
f'(a) = lim_{h → 0} [f(a + h) − f(a)] / h
\`\`\`

Giới hạn này tồn tại, do đó giới hạn từ trái và từ phải đều bằng nhau và bằng \`f'(a)\`.

**Tử số \`f(a + h) − f(a)\`**: vì \`a\` là cực đại địa phương, với \`h\` đủ nhỏ ta có \`f(a + h) ≤ f(a)\`, nên tử số \`≤ 0\`.

**Giới hạn từ phải** (\`h → 0⁺\`, tức là \`h > 0\`):
\`\`\`
f'(a) = lim_{h → 0⁺} [f(a + h) − f(a)] / h
       = lim (số ≤ 0) / (số > 0)
       ≤ 0
\`\`\`

**Giới hạn từ trái** (\`h → 0⁻\`, tức là \`h < 0\`):
\`\`\`
f'(a) = lim_{h → 0⁻} [f(a + h) − f(a)] / h
       = lim (số ≤ 0) / (số < 0)
       ≥ 0
\`\`\`

Hai giới hạn phải bằng nhau (vì f' tồn tại), nên đồng thời \`f'(a) ≤ 0\` và \`f'(a) ≥ 0\`. Suy ra \`f'(a) = 0\`. ∎

### 2.2 Lưu ý quan trọng: chỉ là điều kiện CẦN

**Điều kiện cần (necessary)**: A → B nghĩa là "nếu A đúng thì B đúng". Áp dụng vào đây: nếu \`a\` là cực trị (khả vi), thì \`f'(a) = 0\`.

**Đảo lại không đúng**: \`f'(a) = 0\` KHÔNG suy ra \`a\` là cực trị.

**Phản ví dụ kinh điển:** \`f(x) = x³\` tại \`a = 0\`.

- \`f'(x) = 3x²\`, do đó \`f'(0) = 0\`.
- Nhưng tại 0, hàm vẫn đang tăng: với \`x > 0\` thì \`x³ > 0\`, với \`x < 0\` thì \`x³ < 0\`. Không có cực trị tại đó — chỉ có điểm yên ngựa (saddle), nơi tiếp tuyến nằm ngang giây lát rồi đi tiếp.

> ⚠ **Lỗi thường gặp.** Sinh viên thường giải \`f'(x) = 0\` xong tuyên bố luôn "đây là cực tiểu". KHÔNG được — phải kiểm tra thêm bằng first/second derivative test (mục 5).

---

## 3. Critical point (điểm tới hạn)

**Định nghĩa.** Một điểm \`x = c\` thuộc miền của \`f\` được gọi là **critical point** (điểm tới hạn) nếu:

- \`f'(c) = 0\`, **HOẶC**
- \`f'(c)\` không tồn tại.

Mọi cực trị địa phương đều là critical point. Nhưng critical point chưa chắc là cực trị.

### 3.1 Bốn ví dụ minh họa

**Ví dụ 3.1.** \`f(x) = x² − 6x + 10\`.
- \`f'(x) = 2x − 6 = 0 ⟹ x = 3\`. → Critical point: \`x = 3\`.
- Kiểm tra: parabol mở lên (hệ số x² > 0) → cực tiểu tại x = 3. \`f(3) = 9 − 18 + 10 = 1\`.

**Ví dụ 3.2.** \`f(x) = x³\`.
- \`f'(x) = 3x² = 0 ⟹ x = 0\`. → Critical point: \`x = 0\`.
- Nhưng \`x = 0\` KHÔNG phải cực trị (xem mục 2.2). Critical point loại "yên ngựa" / "inflection ngang".

**Ví dụ 3.3.** \`f(x) = |x|\`.
- Với \`x > 0\`: \`f'(x) = 1\`. Với \`x < 0\`: \`f'(x) = −1\`. Tại \`x = 0\`: f' không tồn tại (đạo hàm trái = −1, đạo hàm phải = +1).
- Critical point: \`x = 0\`. Đây là cực tiểu địa phương (cũng là toàn cục), dù f không khả vi tại đó.

**Ví dụ 3.4.** \`f(x) = x^(2/3)\`.
- \`f'(x) = (2/3) x^(−1/3)\`. Tại \`x = 0\`: \`f'(0)\` không tồn tại (chia cho 0 — tiếp tuyến thẳng đứng).
- Critical point: \`x = 0\`. Đây là cực tiểu (hàm có dạng "đỉnh nhọn ngược" — như cusp).

> ❓ **Câu hỏi tự nhiên.** *"Sao phải định nghĩa critical point bao gồm cả chỗ f' không tồn tại?"* — Vì điều kiện cần Fermat đòi hỏi **f khả vi**. Nếu f không khả vi tại a, định lý không áp dụng được, nên a vẫn có thể là cực trị mà f'(a) không có nghĩa. Để không bỏ sót, ta gộp cả vào critical point.

> 📝 **Tóm tắt mục 3.** Critical point = tập hợp các "ứng viên" cho cực trị. Có 3 loại critical point:
> 1. f'(c) = 0 → có thể là max, min, hoặc yên ngựa.
> 2. f'(c) không tồn tại do góc nhọn → thường là max/min.
> 3. f'(c) không tồn tại do tiếp tuyến đứng → có thể là cusp/cực trị.

---

## 4. Điều kiện đủ (Sufficient Condition) — phân loại critical point

Để biết một critical point \`c\` thực sự là max / min / không, có hai cách kiểm tra.

### 4.1 First Derivative Test (xét dấu f')

**Quy tắc.** Giả sử \`c\` là critical point và f liên tục tại đó. Xét dấu f' ở hai phía:

| Dấu f' trước c | Dấu f' sau c | Phân loại tại c |
|----------------|--------------|-----------------|
| + (tăng) | − (giảm) | **Cực đại địa phương** |
| − (giảm) | + (tăng) | **Cực tiểu địa phương** |
| + (tăng) | + (tăng) | Không phải cực trị (yên ngựa lên) |
| − (giảm) | − (giảm) | Không phải cực trị (yên ngựa xuống) |

> 💡 **Trực giác.** Cực đại = đỉnh núi — trước đỉnh đi lên, sau đỉnh đi xuống. Cực tiểu = đáy thung lũng — trước đáy đi xuống, sau đáy đi lên. Còn yên ngựa nghĩa là đường vẫn đi cùng hướng, chỉ "nằm ngang" một chút ở giữa.

**Áp dụng cho \`f(x) = x³\`** (đã nói tại mục 2.2):
- \`f'(x) = 3x²\`. Trước 0: \`f'(−0.1) = 0.03 > 0\`. Sau 0: \`f'(0.1) = 0.03 > 0\`. Dấu không đổi → không phải cực trị. ✓

### 4.2 Second Derivative Test (xét f'')

**Quy tắc.** Giả sử \`f'(c) = 0\` (critical point loại 1) và \`f''(c)\` tồn tại:

- \`f''(c) > 0\` → **cực tiểu địa phương tại c** (đồ thị cong lên như parabol mở lên).
- \`f''(c) < 0\` → **cực đại địa phương tại c** (đồ thị cong xuống như parabol mở xuống).
- \`f''(c) = 0\` → **không kết luận được**. Phải quay về first derivative test.

> 💡 **Trực giác.** f'' đo "độ cong" của đồ thị. Cực tiểu → đồ thị giống parabol mở lên ngay tại c → f'' dương. Cực đại → mở xuống → f'' âm.

**Vì sao đúng?** Phép xấp xỉ Taylor bậc 2 quanh c (với \`f'(c) = 0\`):
\`\`\`
f(c + h) ≈ f(c) + f'(c)·h + (1/2)·f''(c)·h²
        = f(c) + (1/2)·f''(c)·h²
\`\`\`
- Nếu \`f''(c) > 0\`: \`(1/2)·f''(c)·h² > 0\` với mọi \`h ≠ 0\` nhỏ → \`f(c + h) > f(c)\` → c là cực tiểu.
- Nếu \`f''(c) < 0\`: \`f(c + h) < f(c)\` → c là cực đại.
- Nếu \`f''(c) = 0\`: hạng tử bậc 2 biến mất, không kết luận được — phải nhìn hạng tử bậc cao hơn hoặc dùng first derivative test.

**Phản ví dụ khi \`f''(c) = 0\`:**
- \`f(x) = x⁴\`: \`f'(x) = 4x³ = 0 ⟹ x = 0\`, \`f''(x) = 12x²\`, \`f''(0) = 0\`. Second test bí. Nhưng dùng first derivative test: trước 0, f' âm; sau 0, f' dương → cực tiểu (đúng — đáy của đường cong x⁴).
- \`f(x) = x³\`: \`f'(0) = 0\`, \`f''(0) = 0\`. Đây không phải cực trị (đã chứng minh).
- Kết luận: \`f''(c) = 0\` thực sự không cho thông tin gì.

### 4.3 So sánh hai test

| | First derivative test | Second derivative test |
|---|------------------------|-------------------------|
| Cần tính | Dấu f' ở hai phía | f''(c) |
| Trường hợp f''(c) = 0 | Vẫn dùng được | Bí, phải đổi sang first test |
| f' không tồn tại tại c | Vẫn dùng được (xét hai phía) | Không áp dụng (cần f'') |
| Áp dụng phổ biến hơn | ✓ | Dùng khi f'' dễ tính |

> 📝 **Tóm tắt mục 4.** Sau khi tìm critical point bằng \`f'(c) = 0\` (hoặc f' không tồn tại), phải kiểm tra thêm bằng first hoặc second derivative test để biết là max, min, hay không phải cực trị.

---

## 5. Walk-through 4 ví dụ tìm cực trị địa phương

### 5.1 Ví dụ — Parabol bậc 2: \`f(x) = x² − 4x + 7\`

**Bước 1 — Tính f'.**
\`\`\`
f'(x) = 2x − 4
\`\`\`

**Bước 2 — Giải \`f'(x) = 0\`.**
\`\`\`
2x − 4 = 0  ⟹  x = 2
\`\`\`
Critical point duy nhất: \`x = 2\`.

**Bước 3 — Phân loại bằng second derivative test.**
\`\`\`
f''(x) = 2
f''(2) = 2 > 0  ⟹  cực tiểu địa phương tại x = 2
\`\`\`

**Bước 4 — Tính giá trị cực trị.**
\`\`\`
f(2) = 4 − 8 + 7 = 3
\`\`\`

**Kết luận.** Cực tiểu (cũng là toàn cục, vì parabol mở lên trên toàn ℝ) tại \`(2, 3)\`.

**Verify bằng first derivative test.**
- \`f'(1) = 2 − 4 = −2 < 0\` (giảm).
- \`f'(3) = 6 − 4 = 2 > 0\` (tăng).
- Dấu đổi từ − sang + → cực tiểu. ✓

### 5.2 Ví dụ — Bậc 3 có 2 critical points: \`f(x) = x³ − 3x + 1\`

**Bước 1 — Tính f'.**
\`\`\`
f'(x) = 3x² − 3
\`\`\`

**Bước 2 — Giải \`f'(x) = 0\`.**
\`\`\`
3x² − 3 = 0  ⟹  x² = 1  ⟹  x = ±1
\`\`\`
Hai critical points: \`x = −1\` và \`x = 1\`.

**Bước 3 — Phân loại.**
\`\`\`
f''(x) = 6x
f''(−1) = −6 < 0  ⟹  cực đại địa phương tại x = −1
f''(1)  = 6  > 0  ⟹  cực tiểu địa phương tại x = 1
\`\`\`

**Bước 4 — Giá trị.**
\`\`\`
f(−1) = (−1) − 3(−1) + 1 = −1 + 3 + 1 = 3
f(1)  = 1 − 3 + 1 = −1
\`\`\`

**Kết luận.** Cực đại địa phương \`(−1, 3)\`; cực tiểu địa phương \`(1, −1)\`. Trên toàn ℝ, hàm bậc 3 có \`lim_{x→+∞} f = +∞\` và \`lim_{x→−∞} f = −∞\`, nên không có cực trị toàn cục.

### 5.3 Ví dụ — Có hàm mũ: \`f(x) = x · e^(−x)\`

**Bước 1 — Tính f' bằng quy tắc tích.**
\`\`\`
f'(x) = 1 · e^(−x) + x · (−e^(−x))
       = e^(−x) − x·e^(−x)
       = e^(−x) · (1 − x)
\`\`\`

**Bước 2 — Giải \`f'(x) = 0\`.**
Vì \`e^(−x) > 0\` luôn, nên:
\`\`\`
1 − x = 0  ⟹  x = 1
\`\`\`
Critical point: \`x = 1\`.

**Bước 3 — Tính f''.**
\`\`\`
f''(x) = d/dx [e^(−x) − x·e^(−x)]
       = −e^(−x) − [e^(−x) + x·(−e^(−x))]
       = −e^(−x) − e^(−x) + x·e^(−x)
       = e^(−x) · (x − 2)
\`\`\`

**Bước 4 — Phân loại.**
\`\`\`
f''(1) = e^(−1) · (1 − 2) = −1/e ≈ −0.368 < 0  ⟹  cực đại tại x = 1
\`\`\`

**Bước 5 — Giá trị.**
\`\`\`
f(1) = 1 · e^(−1) = 1/e ≈ 0.368
\`\`\`

**Kết luận.** Cực đại địa phương tại \`(1, 1/e)\`. Đây cũng là cực đại toàn cục trên \`ℝ⁺\` (kiểm tra: \`lim_{x→∞} x·e^(−x) = 0\`, \`f(0) = 0\`).

**Ứng dụng ML.** Đây là loss giống loss của bài toán **maximum likelihood estimation** cho phân phối exponential — tìm tham số làm xác suất quan sát lớn nhất.

### 5.4 Ví dụ — Bậc 4: \`f(x) = x⁴ − 2x²\` (2 min + 1 max)

**Bước 1 — Tính f'.**
\`\`\`
f'(x) = 4x³ − 4x = 4x(x² − 1) = 4x(x − 1)(x + 1)
\`\`\`

**Bước 2 — Giải \`f'(x) = 0\`.**
\`\`\`
x = 0, x = 1, x = −1
\`\`\`
Ba critical points.

**Bước 3 — Tính f''.**
\`\`\`
f''(x) = 12x² − 4
\`\`\`

**Bước 4 — Phân loại.**
\`\`\`
f''(−1) = 12 − 4 = 8 > 0   ⟹  cực tiểu tại x = −1
f''(0)  = −4 < 0            ⟹  cực đại tại x = 0
f''(1)  = 12 − 4 = 8 > 0    ⟹  cực tiểu tại x = 1
\`\`\`

**Bước 5 — Giá trị.**
\`\`\`
f(−1) = 1 − 2 = −1
f(0)  = 0
f(1)  = 1 − 2 = −1
\`\`\`

**Kết luận.** Hai cực tiểu địa phương \`(−1, −1)\` và \`(1, −1)\` (đối xứng — vì f là hàm chẵn), một cực đại địa phương \`(0, 0)\` ở giữa. Đồ thị có hình "W" (double-well potential — vật lý lượng tử rất hay gặp).

> 💡 **Trực giác.** Hàm bậc 4 dạng \`x⁴ − 2x²\` mô tả **hệ có 2 trạng thái bền** — như nam châm có 2 hướng phân cực, hay nucleotide trong DNA có 2 cấu hình. Cực đại ở giữa là rào năng lượng phải vượt qua.

> ❓ **Câu hỏi tự nhiên.** *"Sao hàm f(x) = x⁴ − 2x² có max ở giữa cao bằng 0, nhưng 2 min bên hai bên cùng = −1? Hai min cùng giá trị có ý nghĩa gì?"* — Vì f là hàm **chẵn**: f(−x) = f(x). Đối xứng qua trục y nên giá trị tại x và −x giống hệt. Đây là biểu hiện của **đối xứng** — một khái niệm quan trọng trong vật lý và ML.

> 🔁 **Dừng lại tự kiểm tra.** Cho \`f(x) = x⁴ − 4x\`. Tìm tất cả cực trị địa phương và phân loại.
>
> <details><summary>Đáp án</summary>
>
> \`f'(x) = 4x³ − 4 = 0 ⟹ x³ = 1 ⟹ x = 1\` (chỉ 1 nghiệm thực, vì x³ = 1 ⟺ x = 1; còn hai nghiệm phức bỏ qua).
>
> \`f''(x) = 12x²\`. \`f''(1) = 12 > 0\` → cực tiểu địa phương tại x = 1.
>
> \`f(1) = 1 − 4 = −3\`. Cực tiểu duy nhất \`(1, −3)\`. Đây cũng là cực tiểu toàn cục vì \`lim_{x→±∞} f = +∞\`.
>
> </details>

---

## 6. Cực trị toàn cục trên đoạn đóng \`[a, b]\`

Trên đoạn đóng và bị chặn \`[a, b]\`, hàm liên tục **luôn đạt cực đại và cực tiểu toàn cục** (Định lý Weierstrass / Extreme Value Theorem). Cực trị toàn cục đạt tại một trong các điểm:

1. **Critical points** nằm trong khoảng mở \`(a, b)\`.
2. **Biên** của đoạn: \`x = a\` hoặc \`x = b\`.

**Quy trình chuẩn:**
1. Tính f'.
2. Tìm tất cả critical points trong \`(a, b)\`.
3. Liệt kê các giá trị f tại critical points + tại 2 biên.
4. Giá trị lớn nhất → cực đại toàn cục. Giá trị nhỏ nhất → cực tiểu toàn cục.

Không cần dùng first/second derivative test — chỉ cần SO SÁNH các giá trị.

### 6.1 Walk-through: tìm max/min của \`f(x) = x² − 2x\` trên \`[0, 3]\`

**Bước 1 — Tính f'.**
\`\`\`
f'(x) = 2x − 2
\`\`\`

**Bước 2 — Critical points trong (0, 3).**
\`\`\`
2x − 2 = 0  ⟹  x = 1
\`\`\`
\`x = 1 ∈ (0, 3)\` ✓

**Bước 3 — Liệt kê giá trị.**

| x | f(x) |
|---|------|
| 0 (biên trái) | \`0 − 0 = 0\` |
| 1 (critical) | \`1 − 2 = −1\` |
| 3 (biên phải) | \`9 − 6 = 3\` |

**Bước 4 — Chọn.**
- Cực tiểu toàn cục: \`−1\` tại \`x = 1\`.
- Cực đại toàn cục: \`3\` tại \`x = 3\` (đạt tại biên!).

> ⚠ **Lỗi thường gặp.** Sinh viên tìm \`f'(x) = 0\` được \`x = 1\`, thấy đó là cực tiểu địa phương (vì f'' > 0), rồi tuyên bố "cực tiểu toàn cục là −1, cực đại không có". SAI — phải xét cả biên. Cực đại trên \`[0, 3]\` đạt tại biên \`x = 3\`, không tại critical point nào.

### 6.2 Walk-through thứ hai: \`f(x) = x³ − 3x\` trên \`[−2, 2]\`

**Bước 1.** \`f'(x) = 3x² − 3\`.

**Bước 2.** Critical points: \`3x² − 3 = 0 ⟹ x = ±1\`. Cả hai đều thuộc \`(−2, 2)\`.

**Bước 3.** Tính giá trị:
| x | f(x) |
|---|------|
| −2 (biên) | \`−8 − (−6) = −2\` |
| −1 (critical) | \`−1 − (−3) = 2\` |
| 1 (critical) | \`1 − 3 = −2\` |
| 2 (biên) | \`8 − 6 = 2\` |

**Bước 4.**
- Cực đại toàn cục: \`2\`, đạt tại CẢ HAI điểm \`x = −1\` và \`x = 2\` (tie!).
- Cực tiểu toàn cục: \`−2\`, đạt tại CẢ HAI điểm \`x = −2\` và \`x = 1\`.

Một bài toán có thể có nhiều điểm đạt cùng giá trị cực trị.

> 📝 **Tóm tắt mục 6.** Trên đoạn đóng \`[a, b]\`, để tìm cực trị toàn cục: tìm critical points trong khoảng + so sánh giá trị với 2 biên. Cực trị toàn cục luôn đạt ở 1 trong 4 nhóm điểm này. Không bỏ sót biên!

---

## 7. Điểm uốn (Inflection Point)

**Định nghĩa.** Điểm \`x = c\` được gọi là **điểm uốn** (inflection point) nếu hàm đổi tính lồi/lõm khi đi qua c — tức là dấu f'' đổi.

- **Lồi (concave up)**: f'' > 0 — đồ thị cong lên như đáy bát. Tiếp tuyến nằm dưới đồ thị.
- **Lõm (concave down)**: f'' < 0 — đồ thị cong xuống như nắp úp. Tiếp tuyến nằm trên đồ thị.
- **Inflection point**: nơi chuyển từ lồi sang lõm (hoặc ngược lại).

### 7.1 Tìm inflection point

Điều kiện cần: \`f''(c) = 0\` hoặc \`f''(c)\` không tồn tại.
Điều kiện đủ: dấu f'' đổi khi đi qua c.

**Ví dụ.** \`f(x) = x³\`.
- \`f''(x) = 6x\`. \`f''(0) = 0\`.
- Trước 0: \`f''(−1) = −6 < 0\` (lõm). Sau 0: \`f''(1) = 6 > 0\` (lồi).
- Dấu đổi → \`x = 0\` là inflection point.

### 7.2 Phân biệt critical point và inflection point

| | Critical point | Inflection point |
|---|----------------|------------------|
| Điều kiện | f'(c) = 0 hoặc f' không tồn tại | Dấu f'' đổi (thường f''(c) = 0) |
| Ý nghĩa | Tiếp tuyến nằm ngang | Đổi lồi ↔ lõm |
| Ví dụ | \`x²\`: x = 0 (cực tiểu) | \`x³\`: x = 0 (inflection) |

Hai khái niệm **độc lập** — một điểm có thể vừa là cả hai (như \`x³\` tại 0), vừa là cực trị mà không phải inflection, vừa là inflection mà không phải cực trị.

> 💡 **Liên hệ ML.** Trong loss landscape, inflection point có liên quan đến **saddle point** ở chiều nhiều hơn — nơi gradient bằng 0 nhưng không phải min/max (Lesson 06-07).

---

## 8. Áp dụng vào Machine Learning — Linear Regression với 1 tham số

Đây là phần **quan trọng nhất** của bài — vì sao bạn cần học cực trị.

### 8.1 Đặt vấn đề

Cho 3 điểm dữ liệu: \`(x₁, y₁) = (1, 2)\`, \`(x₂, y₂) = (2, 3.5)\`, \`(x₃, y₃) = (3, 5.5)\`.

Ta muốn tìm đường thẳng \`y = a·x\` (qua gốc tọa độ, không có bias) **gần đúng nhất** với 3 điểm này.

**Câu hỏi:** chọn \`a\` bằng bao nhiêu cho "tốt nhất"?

### 8.2 Hàm loss MSE (Mean Squared Error)

"Tốt nhất" được định nghĩa qua **loss function**: tổng bình phương sai số giữa dự đoán \`a·xᵢ\` và giá trị thật \`yᵢ\`.

\`\`\`
L(a) = Σᵢ (yᵢ − a·xᵢ)²
     = (y₁ − a·x₁)² + (y₂ − a·x₂)² + (y₃ − a·x₃)²
\`\`\`

Thay số:
\`\`\`
L(a) = (2 − a·1)² + (3.5 − a·2)² + (5.5 − a·3)²
     = (2 − a)² + (3.5 − 2a)² + (5.5 − 3a)²
\`\`\`

\`L(a)\` là một **hàm bậc 2** theo a (parabol mở lên — vì hệ số \`a²\` dương).

### 8.3 Khai triển L(a)

\`\`\`
(2 − a)²       = a² − 4a + 4
(3.5 − 2a)²    = 4a² − 14a + 12.25
(5.5 − 3a)²    = 9a² − 33a + 30.25
                ─────────────────
L(a) = 14a² − 51a + 46.5
\`\`\`

Verify từng cộng:
- Hệ số a²: 1 + 4 + 9 = 14 ✓
- Hệ số a: −4 + (−14) + (−33) = −51 ✓
- Hằng số: 4 + 12.25 + 30.25 = 46.5 ✓

### 8.4 Đặt đạo hàm bằng 0 — closed-form solution

\`\`\`
L'(a) = 28a − 51
\`\`\`

Đặt \`L'(a) = 0\`:
\`\`\`
28a − 51 = 0  ⟹  a* = 51/28 ≈ 1.8214
\`\`\`

Verify đây là cực tiểu:
\`\`\`
L''(a) = 28 > 0  ⟹  parabol mở lên  ⟹  a* là cực tiểu toàn cục
\`\`\`

### 8.5 Verify bằng công thức tổng quát

Công thức closed-form cho regression qua gốc tọa độ:
\`\`\`
a* = (Σ xᵢ·yᵢ) / (Σ xᵢ²)
\`\`\`

Tính trực tiếp:
\`\`\`
Σ xᵢ·yᵢ = 1·2 + 2·3.5 + 3·5.5 = 2 + 7 + 16.5 = 25.5
Σ xᵢ²   = 1 + 4 + 9 = 14
a*      = 25.5 / 14 = 51/28 ≈ 1.8214  ✓
\`\`\`

Khớp với kết quả từ đạo hàm. Hai cách hoàn toàn tương đương — chứng tỏ bài toán linear regression đơn giản này được **giải đóng** chỉ bằng \`L'(a) = 0\`.

### 8.6 Giá trị loss tối thiểu

\`\`\`
L(1.8214) = 14·(1.8214)² − 51·(1.8214) + 46.5
          = 14·3.3175 − 92.8929 + 46.5
          = 46.4444 − 92.8929 + 46.5
          ≈ 0.0515
\`\`\`

Tổng bình phương sai số nhỏ nhất ≈ 0.0515. Tức là đường thẳng \`y = 1.8214x\` cách 3 điểm rất gần.

### 8.7 Tổng quát hóa cho n điểm

Với n điểm dữ liệu \`(xᵢ, yᵢ)\`, loss MSE và nghiệm tối ưu:
\`\`\`
L(a) = Σᵢ (yᵢ − a·xᵢ)²
L'(a) = −2 Σᵢ xᵢ(yᵢ − a·xᵢ) = 0
       ⟹  Σᵢ xᵢ·yᵢ = a · Σᵢ xᵢ²
       ⟹  a* = (Σ xᵢ·yᵢ) / (Σ xᵢ²)
\`\`\`

Đây là phiên bản **đơn giản nhất** của linear regression: 1 chiều, không bias. Phiên bản đầy đủ \`y = a·x + b\` cần đạo hàm theo 2 biến a, b — đó là **đạo hàm riêng** (Lesson 06). Trường hợp đa chiều cần linear algebra (Tầng 4).

> 💡 **Trực giác cho phần này.** Loss function là một "thung lũng" theo biến a. Bạn muốn tìm đáy thung lũng — đó chính là \`a*\` tối ưu. Vì loss MSE là parabol mở lên, đáy duy nhất chính là nơi \`L'(a) = 0\`.

---

## 9. Vì sao neural network không giải \`∇f = 0\` trực tiếp?

> ❓ **Câu hỏi tự nhiên.** *"Nếu giải \`L'(a) = 0\` cho ra \`a*\` ngay lập tức, sao trong neural network mình lại phải dùng gradient descent — iterate hàng triệu vòng lặp?"*

Trả lời ngắn:

1. **Số tham số quá lớn.** Neural network có hàng triệu tới hàng tỷ tham số. Hệ phương trình \`∇L = 0\` gồm hàng triệu phương trình bậc cao — không thể giải đóng được.
2. **Phi tuyến nặng.** Loss của NN chứa các thành phần phi tuyến (ReLU, sigmoid, tanh, attention...) khiến \`∇L = 0\` không có công thức giải.
3. **Loss landscape lồi lõm.** L có hàng triệu critical points (min, max, saddle). Tìm \`∇L = 0\` chỉ là điều kiện cần — phân loại từng cái sẽ rất tốn.
4. **Bộ nhớ.** Tính ma trận Hessian (đạo hàm bậc 2) tốn O(n²) bộ nhớ — không khả thi với n = triệu.

**Giải pháp**: **iterative method** — bắt đầu từ một điểm ngẫu nhiên, đi từng bước nhỏ theo hướng \`−∇L\` (giảm loss nhanh nhất), lặp đến khi gần điểm cực tiểu. Đó chính là **gradient descent** (Lesson 07).

| | Closed-form (giải \`L' = 0\`) | Iterative (gradient descent) |
|---|------------------------------|------------------------------|
| Áp dụng | Loss đơn giản (linear regression, ...) | Loss phức tạp (NN, deep learning) |
| Tốc độ | 1 bước | Hàng nghìn → triệu bước |
| Chính xác | Tuyệt đối | Xấp xỉ (đủ dùng) |
| Bộ nhớ | Cần ma trận n×n | Chỉ cần gradient n |

> 📝 **Tóm tắt mục 8-9.** ML = tối ưu hóa = tìm cực trị của loss. Trường hợp đơn giản giải đóng bằng \`L'(a) = 0\` (như linear regression). Trường hợp phức tạp (NN) → gradient descent, sẽ học ở Lesson 07.

---

## 10. Lỗi thường gặp — checklist

> ⚠ **Lỗi thường gặp.** Khi tìm cực trị, các sai sót phổ biến:
>
> 1. **Quên kiểm tra f''(a)** — tuyên bố "cực tiểu" mà chưa biết là max hay min.
> 2. **Quên xét điểm biên** trên đoạn đóng. Trên \`[a, b]\`, cực trị có thể nằm tại biên, không phải critical point.
> 3. **Quên xét điểm f' không tồn tại** — như \`|x|\` tại 0, hay \`x^(2/3)\` tại 0.
> 4. **Nhầm critical point với cực trị** — \`f(x) = x³\` có \`f'(0) = 0\` nhưng không phải cực trị.
> 5. **\`f''(c) = 0\` rồi kết luận luôn** — không kết luận được, phải dùng first derivative test.
> 6. **Nhầm cực đại địa phương với cực đại toàn cục** — trên ℝ không bị chặn, cực trị địa phương có thể không phải toàn cục.
> 7. **Bỏ qua dấu của hệ số bậc cao** — bậc 3 mở từ −∞ tới +∞, không có cực trị toàn cục trên ℝ.
> 8. **Nhầm inflection point với cực trị** — chúng là hai khái niệm độc lập.

---

## 11. Bài tập

Mỗi bài có lời giải chi tiết bên dưới — bạn nên thử trước rồi đối chiếu.

### Bài 11.1
Tìm và phân loại tất cả cực trị địa phương của \`f(x) = 2x³ − 9x² + 12x − 3\`.

### Bài 11.2
Tìm cực trị toàn cục của \`f(x) = x³ − 3x² + 2\` trên đoạn \`[0, 3]\`.

### Bài 11.3
Cho hàm \`f(x) = x · ln(x)\` trên \`(0, ∞)\`. Tìm cực tiểu và chứng minh đó là cực tiểu toàn cục.

### Bài 11.4
Cho 3 điểm dữ liệu: \`(1, 1), (2, 3), (3, 4)\`. Tìm \`a*\` tối ưu cho mô hình \`y = a·x\`.

### Bài 11.5
Tìm tất cả inflection points của \`f(x) = x⁴ − 6x² + 5\`.

### Bài 11.6
Một nông trại có 100m rào, cần rào kín một hình chữ nhật cạnh sông (không cần rào phía sông). Tìm kích thước để diện tích lớn nhất. (Đây là bài toán tối ưu hóa cổ điển.)

---

## 12. Lời giải chi tiết

### Lời giải 11.1

\`f(x) = 2x³ − 9x² + 12x − 3\`.

**Bước 1.** \`f'(x) = 6x² − 18x + 12 = 6(x² − 3x + 2) = 6(x − 1)(x − 2)\`.

**Bước 2.** \`f'(x) = 0 ⟹ x = 1\` hoặc \`x = 2\`.

**Bước 3.** \`f''(x) = 12x − 18\`.
- \`f''(1) = 12 − 18 = −6 < 0 ⟹ cực đại tại x = 1\`.
- \`f''(2) = 24 − 18 = 6 > 0 ⟹ cực tiểu tại x = 2\`.

**Bước 4.** Giá trị:
- \`f(1) = 2 − 9 + 12 − 3 = 2\`.
- \`f(2) = 16 − 36 + 24 − 3 = 1\`.

**Kết luận.** Cực đại địa phương \`(1, 2)\`; cực tiểu địa phương \`(2, 1)\`. Không có cực trị toàn cục trên ℝ.

### Lời giải 11.2

\`f(x) = x³ − 3x² + 2\` trên \`[0, 3]\`.

**Bước 1.** \`f'(x) = 3x² − 6x = 3x(x − 2)\`.

**Bước 2.** Critical points: \`x = 0\` và \`x = 2\`. Trong khoảng mở \`(0, 3)\` chỉ có \`x = 2\`. (x = 0 là biên — vẫn xét.)

**Bước 3.** Lập bảng:
| x | f(x) |
|---|------|
| 0 (biên) | \`0 − 0 + 2 = 2\` |
| 2 (critical) | \`8 − 12 + 2 = −2\` |
| 3 (biên) | \`27 − 27 + 2 = 2\` |

**Kết luận.** Cực đại toàn cục: \`2\`, đạt tại \`x = 0\` và \`x = 3\`. Cực tiểu toàn cục: \`−2\`, tại \`x = 2\`.

### Lời giải 11.3

\`f(x) = x · ln(x)\` trên \`(0, ∞)\`.

**Bước 1.** \`f'(x) = ln(x) + x · (1/x) = ln(x) + 1\`.

**Bước 2.** \`f'(x) = 0 ⟺ ln(x) = −1 ⟺ x = e^(−1) = 1/e ≈ 0.368\`.

**Bước 3.** \`f''(x) = 1/x > 0\` với mọi \`x > 0\`. Đặc biệt \`f''(1/e) = e > 0\` → cực tiểu địa phương.

**Bước 4.** Giá trị: \`f(1/e) = (1/e) · ln(1/e) = (1/e) · (−1) = −1/e ≈ −0.368\`.

**Toàn cục.** Vì \`f''(x) > 0\` trên toàn miền \`(0, ∞)\`, hàm **lồi nghiêm ngặt (strictly convex)**. Với hàm lồi, cực tiểu địa phương = cực tiểu toàn cục. Vậy \`(1/e, −1/e)\` là cực tiểu toàn cục.

### Lời giải 11.4

3 điểm \`(1, 1), (2, 3), (3, 4)\`. Mô hình \`y = a·x\`.

**Cách 1 — Đạo hàm.**
\`\`\`
L(a) = (1 − a)² + (3 − 2a)² + (4 − 3a)²
     = (a² − 2a + 1) + (4a² − 12a + 9) + (9a² − 24a + 16)
     = 14a² − 38a + 26
L'(a) = 28a − 38 = 0  ⟹  a* = 38/28 = 19/14 ≈ 1.3571
L''(a) = 28 > 0 ⟹ cực tiểu (đúng).
\`\`\`

**Cách 2 — Công thức closed-form.**
\`\`\`
Σ xy = 1·1 + 2·3 + 3·4 = 1 + 6 + 12 = 19
Σ x² = 1 + 4 + 9 = 14
a*    = 19/14 ≈ 1.3571  ✓
\`\`\`

**Loss tối thiểu.**
\`\`\`
L(19/14) = 14·(19/14)² − 38·(19/14) + 26
         = (19²)/14 − (38·19)/14 + 26
         = 361/14 − 722/14 + 364/14
         = 3/14 ≈ 0.214
\`\`\`

### Lời giải 11.5

\`f(x) = x⁴ − 6x² + 5\`.

**Bước 1.** \`f'(x) = 4x³ − 12x = 4x(x² − 3)\`.

**Bước 2.** \`f''(x) = 12x² − 12 = 12(x² − 1) = 12(x − 1)(x + 1)\`.

**Bước 3.** \`f''(x) = 0 ⟺ x = ±1\`.

**Bước 4.** Xét dấu f'':
- \`x < −1\`: \`(−2)² − 1 = 3 > 0\` → f'' > 0 → lồi.
- \`−1 < x < 1\`: \`(0)² − 1 = −1 < 0\` → f'' < 0 → lõm.
- \`x > 1\`: \`(2)² − 1 = 3 > 0\` → f'' > 0 → lồi.

Dấu f'' đổi tại CẢ \`x = −1\` và \`x = 1\` → cả hai đều là inflection points.

**Giá trị.** \`f(−1) = 1 − 6 + 5 = 0\`; \`f(1) = 0\`. Inflection points: \`(−1, 0)\` và \`(1, 0)\`.

### Lời giải 11.6

Gọi cạnh song song với sông là \`x\`, hai cạnh vuông góc với sông là \`y\` (mỗi cạnh dài y).

Tổng rào: \`x + 2y = 100  ⟹  x = 100 − 2y\`.

Diện tích: \`A(y) = x · y = (100 − 2y) · y = 100y − 2y²\`.

Miền hợp lệ: \`y > 0\` và \`x = 100 − 2y > 0 ⟺ y < 50\`. Vậy \`y ∈ (0, 50)\`.

**Tìm cực đại.**
\`\`\`
A'(y) = 100 − 4y = 0  ⟹  y* = 25
A''(y) = −4 < 0 ⟹ cực đại tại y = 25.
\`\`\`

Khi \`y = 25\`: \`x = 100 − 50 = 50\`.

**Diện tích cực đại.** \`A* = 50 · 25 = 1250 m²\`.

**Kiểm tra biên.** \`y → 0\` hoặc \`y → 50\`: \`A → 0\`. Không cạnh tranh với cực đại 1250.

**Kết luận.** Kích thước tối ưu: cạnh song song với sông dài 50m, hai cạnh vuông góc mỗi cạnh 25m. Diện tích cực đại 1250 m².

---

## 13. Tóm tắt cả bài

> 📝 **Tóm tắt Lesson 05.**
> 1. **Điều kiện cần (Fermat)**: cực trị địa phương + khả vi ⟹ \`f'(x) = 0\`.
> 2. **Critical point**: chỗ \`f'(x) = 0\` hoặc f' không tồn tại. Đây là TẤT CẢ ứng viên cho cực trị.
> 3. **Phân loại critical point**: dùng first derivative test (xét dấu f') hoặc second derivative test (xét f'').
>    - \`f''(c) > 0\` → cực tiểu. \`f''(c) < 0\` → cực đại. \`f''(c) = 0\` → bí, quay về first test.
> 4. **Cực trị toàn cục trên [a, b]** = max/min của tập {critical points, biên a, biên b}.
> 5. **Linear regression 1 tham số**: \`a* = (Σ xᵢyᵢ) / (Σ xᵢ²)\` — giải đóng bằng \`L'(a) = 0\`.
> 6. **NN không giải đóng được** vì quá nhiều tham số và phi tuyến → dùng gradient descent (Lesson 07).
> 7. **Inflection point** ≠ cực trị. Đây là nơi dấu f'' đổi, đường chuyển lồi ↔ lõm.

---

## 14. Liên kết

- **Bài trước:** [Lesson 04 — Chain rule](../lesson-04-chain-rule/)
- **Bài tiếp theo:** [Lesson 06 — Đạo hàm riêng + gradient](../lesson-06-partial-gradient/)
- **Trang chính tầng:** [Calculus](../index.html)
- **Tham khảo chéo:**
  - [Algebra Lesson 06 — Linear & Quadratic](../../01-Algebra/lesson-06-linear-quadratic/) — vì critical point của hàm bậc 2 là đỉnh parabol.
  - Sẽ gặp lại "cực trị" trong **Linear Algebra** (eigenvalue tối đa hóa Rayleigh quotient — sắp tới Tầng 4) và **Probability** (maximum likelihood — Tầng 5).
- **Visualization:** [visualization.html](./visualization.html) — critical points finder, hai test, đoạn đóng, linear regression MSE.
`;
