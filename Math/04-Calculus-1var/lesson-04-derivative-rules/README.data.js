// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-04-derivative-rules/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Quy tắc đạo hàm

## Mục tiêu

- Thuộc **bảng đạo hàm cơ bản** (x^n, sin, cos, e^x, ln x, ...).
- Áp dụng **5 quy tắc đại số**: hằng nhân, tổng/hiệu, tích, thương, chuỗi.
- Đặc biệt: **Quy tắc chuỗi** (chain rule) — quan trọng nhất Calculus.
- Đạo hàm **hàm hợp** và **hàm ngược**.

## Kiến thức tiền đề

- [Lesson 03 — Định nghĩa đạo hàm](../lesson-03-derivative-definition/).

---

## 1. Bảng đạo hàm cơ bản

| f(x) | f'(x) | Ghi chú |
|------|-------|---------|
| c (hằng) | 0 | |
| x | 1 | |
| x^n | n·x^(n-1) | n bất kỳ thực |
| √x | 1/(2√x) | = (1/2)·x^(-1/2) |
| 1/x | -1/x² | |
| e^x | e^x | đẹp nhất! |
| a^x | a^x · ln a | |
| ln x | 1/x | |
| log_a x | 1/(x·ln a) | |
| sin x | cos x | |
| cos x | -sin x | |
| tan x | 1/cos²x = sec²x | |
| cot x | -1/sin²x | |
| arcsin x | 1/√(1-x²) | -1<x<1 |
| arccos x | -1/√(1-x²) | |
| arctan x | 1/(1+x²) | |

💡 **Phải thuộc**. Có thể chứng minh từ định nghĩa, nhưng dùng nhiều thì nhớ.

**4 ví dụ số đa dạng (dùng \`(x^n)' = n·x^{n-1}\`)**:
- \`n\` nguyên dương: \`(x⁵)' = 5x⁴\`.
- \`n\` âm: \`(x⁻²)' = −2x⁻³ = −2/x³\` (khớp \`(1/x²)'\`).
- \`n\` phân số: \`(x^{1/2})' = (1/2)x^{−1/2} = 1/(2√x)\` (khớp \`(√x)'\`).
- \`n = 1\`: \`(x¹)' = 1·x⁰ = 1\`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao \`(e^x)' = e^x\` mà \`(a^x)' = a^x·ln a\`?"* Vì \`e\` là cơ số "tự nhiên" mà \`ln e = 1\`. Tổng quát \`(a^x)' = a^x·ln a\`; thay \`a = e\` thì \`ln e = 1\` triệt tiêu → \`(e^x)' = e^x\`. Đây chính là lý do \`e\` đặc biệt.
- *"\`(ln x)' = 1/x\` chỉ đúng khi \`x > 0\`?"* \`ln x\` chỉ xác định khi \`x > 0\`. Khi cần đạo hàm \`ln|x|\` (cả \`x < 0\`), kết quả vẫn là \`1/x\` — chi tiết này quan trọng ở phần nguyên hàm \`∫1/x dx = ln|x| + C\` (L06).

⚠ **Lỗi thường gặp — \`(x^n)' = n·x^{n-1}\` nhưng \`(a^x)' ≠ x·a^{x-1}\`**. Khi **biến nằm ở số mũ** (như \`2^x\`), KHÔNG dùng quy tắc lũy thừa. \`(2^x)' = 2^x·ln 2\`, không phải \`x·2^{x−1}\`. Phân biệt "biến ở cơ số" (\`x^n\`) với "biến ở số mũ" (\`a^x\`).

🔁 **Dừng lại tự kiểm tra**

1. \`(x^{−3})' = ?\`
2. \`(3^x)' = ?\` và \`(x^3)' = ?\` — khác nhau thế nào?

<details><summary>Đáp án</summary>

1. \`−3x^{−4} = −3/x⁴\`.
2. \`(3^x)' = 3^x·ln 3\` (biến ở mũ); \`(x³)' = 3x²\` (biến ở cơ số). Hoàn toàn khác công thức.

</details>

### 📝 Tóm tắt mục 1

- Thuộc bảng: \`(x^n)' = n·x^{n−1}\`, \`(e^x)' = e^x\`, \`(ln x)' = 1/x\`, \`(sin x)' = cos x\`, \`(cos x)' = −sin x\`.
- \`(a^x)' = a^x·ln a\`; thay \`a = e\` → \`(e^x)' = e^x\` (vì \`ln e = 1\`).
- Phân biệt biến ở **cơ số** (\`x^n\`) với biến ở **số mũ** (\`a^x\`) — hai công thức khác hẳn.

---

## 2. Năm quy tắc đại số

### 2.1. Hằng nhân
\`\`\`
(c·f)' = c·f'
\`\`\`
**Ví dụ**: (5x³)' = 5·(x³)' = 5·3x² = 15x².

### 2.2. Tổng / hiệu
\`\`\`
(f ± g)' = f' ± g'
\`\`\`
**Ví dụ**: (x² + sin x)' = 2x + cos x.

### 2.3. Tích (Product rule)
\`\`\`
(f·g)' = f'·g + f·g'
\`\`\`

💡 **Vì sao**: Khai triển định nghĩa, một phần tăng do f tăng, phần kia do g tăng.

**Ví dụ**: (x²·sin x)' = 2x·sin x + x²·cos x.

⚠ **Lỗi thường gặp**: (f·g)' ≠ f'·g'. Đây không phải lũy thừa.

### 2.4. Thương (Quotient rule)
\`\`\`
(f/g)' = (f'·g - f·g') / g²
\`\`\`

**Mẹo nhớ "low-d-high - high-d-low" / "square the low"**:
- Mẫu × đạo hàm tử − tử × đạo hàm mẫu, tất cả chia cho mẫu bình phương.

**Ví dụ**: (sin x / x)' = (cos x · x - sin x · 1) / x² = (x·cos x - sin x) / x².

### 2.5. Chuỗi (Chain rule) — QUAN TRỌNG NHẤT

\`\`\`
(f(g(x)))' = f'(g(x)) · g'(x)
\`\`\`

💡 **Trực giác**: Hàm trong hàm. Đạo hàm = (đạo hàm ngoài tại g(x)) × (đạo hàm trong).

> 📐 **Định nghĩa đầy đủ — Chain rule**
>
> **(a) Là gì**: Khi y = f(g(x)) là hàm hợp (g trong f), thì dy/dx = (df/du) · (du/dx) với u = g(x). Theo ký hiệu Leibniz: dy/dx = dy/du · du/dx — như "nhân phân số" (chứ thực ra là 1 định lý).
>
> **(b) Vì sao cần**: Vì 90% hàm trong thực tế là hàm hợp — sin(2x+1), e^(-x²), ln(cos x), v.v. Không có chain rule = không thể tính đạo hàm chúng. Đặc biệt quan trọng trong **AI/ML**: backpropagation trong neural network = chain rule áp dụng nhiều lớp. ChatGPT, Stable Diffusion... đều chạy được nhờ chain rule. Đây là rule "đóng vai trò xương sống" trong tính toán symbolic.
>
> **(c) Ví dụ số**: y = sin(x²). Ngoài: f(u) = sin u, f'(u) = cos u. Trong: u = x², u' = 2x. y' = cos(x²)·2x. Tại x = 1: y'(1) = cos(1)·2 ≈ **1.0806**. y = e^(3x): ngoài e^u, trong 3x → y' = e^(3x)·3 = 3e^(3x). y = ln(cos x): y' = (1/cos x)·(−sin x) = −tan x. y = (2x+1)^5: y' = 5(2x+1)^4·2 = 10(2x+1)^4. Hợp 3 lớp y = sin(ln(x²)): y' = cos(ln(x²)) · (1/x²) · 2x = 2cos(ln(x²))/x.

**Ví dụ 1**: y = sin(x²).
- f(u) = sin u, g(x) = x².
- y' = cos(x²) · 2x.

**Ví dụ 2**: y = e^(3x+1).
- f(u) = e^u, g = 3x+1.
- y' = e^(3x+1) · 3.

**Ví dụ 3** (hợp 3 lớp): y = ln(sin(x²)).
- y' = (1/sin(x²)) · cos(x²) · 2x = 2x·cos(x²)/sin(x²) = 2x·cot(x²).

⟶ **Quy tắc**: từ ngoài vào trong, mỗi lớp nhân thêm đạo hàm.

**Verify product rule bằng số** — \`(x²·sin x)' = 2x·sin x + x²·cos x\` tại \`x = 1\`:
- Công thức: \`2·1·sin 1 + 1·cos 1 = 2·0.8415 + 0.5403 = 2.223\`.
- Xấp xỉ định nghĩa: \`[f(1.001) − f(1)]/0.001 ≈ (1.002001·sin 1.001 − sin 1)/0.001 ≈ 2.224\` ✓ (sai số do bước hữu hạn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tích KHÔNG phải \`f'·g'\`?"* Vì khi \`f·g\` thay đổi, đóng góp đến từ **hai nguồn**: \`f\` đổi (giữ \`g\`) cho \`f'·g\`, và \`g\` đổi (giữ \`f\`) cho \`f·g'\`. Cộng lại: \`f'g + fg'\`. Phản ví dụ số: \`(x·x)' = (x²)' = 2x\`, nhưng \`f'·g' = 1·1 = 1 ≠ 2x\`.
- *"Khi nào dùng chain rule?"* Bất cứ khi nào có "hàm trong hàm" — \`sin(2x)\`, \`e^{x²}\`, \`(3x+1)^5\`. Hỏi "có lớp ngoài và lớp trong không?". Nếu có → chain rule, nhân thêm đạo hàm lớp trong.
- *"Thứ tự áp dụng nhiều quy tắc?"* Từ ngoài vào: nhận diện cấu trúc ngoài cùng (tích? thương? hợp?) rồi áp quy tắc tương ứng, các phần con xử lý đệ quy.

⚠ **Lỗi thường gặp — quên đạo hàm lớp trong của chain rule**. Viết \`(sin(2x))' = cos(2x)\` là **thiếu** — đúng phải \`cos(2x)·2 = 2cos(2x)\`. Verify: tại \`x=0\`, định nghĩa cho slope \`≈ [sin(0.002)−0]/0.001 = 2\`, khớp \`2cos 0 = 2\`, không phải \`cos 0 = 1\`.

🔁 **Dừng lại tự kiểm tra**

1. \`(x³·e^x)' = ?\`
2. \`(e^{x²})' = ?\` (đừng quên lớp trong)

<details><summary>Đáp án</summary>

1. Tích: \`3x²·e^x + x³·e^x = x²·e^x·(3 + x)\`.
2. Chain: lớp ngoài \`e^u → e^u\`, lớp trong \`x² → 2x\` → \`e^{x²}·2x = 2x·e^{x²}\`.

</details>

### 📝 Tóm tắt mục 2

- Hằng nhân \`(cf)' = cf'\`; tổng \`(f±g)' = f'±g'\`.
- Tích \`(fg)' = f'g + fg'\` (KHÔNG \`f'g'\`); thương \`(f/g)' = (f'g − fg')/g²\`.
- Chain \`(f(g(x)))' = f'(g(x))·g'(x)\` — quan trọng nhất, **đừng quên đạo hàm lớp trong**.

---

## 3. Đạo hàm hàm ngược

Nếu y = f(x) và x = f^(-1)(y), thì:
\`\`\`
(f^(-1))'(y) = 1 / f'(x)
\`\`\`

💡 **Hệ quả**: Đồ thị y = f(x) và y = f^(-1)(x) đối xứng qua y = x → slope nghịch đảo nhau.

**Ví dụ**: Chứng minh (arcsin x)' = 1/√(1-x²).
- y = arcsin x ⟺ x = sin y.
- (sin y)' theo y = cos y.
- → (arcsin)' = 1/cos y = 1/√(1-sin²y) = **1/√(1-x²)** ✓.

💡 **Trực giác**: đồ thị \`f\` và \`f⁻¹\` đối xứng qua đường \`y = x\` (lật chéo). Khi lật, đường dốc thoải (\`f'\` nhỏ) thành dốc đứng (\`(f⁻¹)'\` lớn) và ngược lại → slope **nghịch đảo** nhau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`(f⁻¹)'(y) = 1/f'(x)\` — \`x\` ở đây là gì?"* Là điểm sao cho \`f(x) = y\` (tức \`x = f⁻¹(y)\`). Phải tính đạo hàm \`f'\` **tại điểm \`x\` tương ứng**, không phải tại \`y\`. Vd \`f(x)=x²\` (\`x>0\`), \`f⁻¹(y)=√y\`: tại \`y=4\` thì \`x=2\`, \`(f⁻¹)'(4) = 1/f'(2) = 1/(2·2) = 1/4\`, khớp \`(√y)'|_{y=4} = 1/(2√4) = 1/4\` ✓.
- *"Cần điều kiện gì để công thức đúng?"* Cần \`f'(x) ≠ 0\` (nếu \`f'(x) = 0\`, tiếp tuyến của \`f\` nằm ngang → tiếp tuyến của \`f⁻¹\` đứng → đạo hàm không tồn tại).

⚠ **Lỗi thường gặp — quên \`f'\` phải tính tại \`x\` chứ không tại \`y\`**. Viết \`(f⁻¹)'(y) = 1/f'(y)\` là sai. Phải tìm \`x = f⁻¹(y)\` trước rồi mới thay vào \`f'\`.

🔁 **Dừng lại tự kiểm tra**

1. \`(arctan x)'\` — dùng \`y = arctan x ⟺ x = tan y\` và \`(tan y)' = 1/cos²y\`.
2. \`f(x) = x³\`, \`f⁻¹(y) = ∛y\`. Tính \`(f⁻¹)'(8)\` qua công thức hàm ngược.

<details><summary>Đáp án</summary>

1. \`(arctan)' = 1/(tan y)' = cos²y = 1/(1+tan²y) = 1/(1+x²)\` ✓.
2. \`y=8 → x=2\`. \`f'(x)=3x²\`, \`f'(2)=12\` → \`(f⁻¹)'(8) = 1/12\`. Khớp \`(∛y)'|_8 = (1/3)·8^{−2/3} = 1/12\` ✓.

</details>

### 📝 Tóm tắt mục 3

- \`(f⁻¹)'(y) = 1/f'(x)\` với \`x = f⁻¹(y)\` (tính \`f'\` tại \`x\`, KHÔNG tại \`y\`).
- Trực giác: đồ thị đối xứng qua \`y = x\` → slope nghịch đảo.
- Điều kiện \`f'(x) ≠ 0\`; dùng để suy \`(arcsin)', (arctan)'\`...

---

## 4. Đạo hàm bậc cao

f''(x) = (f'(x))'. Đạo hàm của đạo hàm.

**Ví dụ**: f(x) = x⁴.
- f'(x) = 4x³.
- f''(x) = 12x².
- f'''(x) = 24x.
- f⁽⁴⁾(x) = 24.
- f⁽⁵⁾(x) = 0.

**Ý nghĩa vật lý**:
- s(t) = vị trí.
- v(t) = s'(t) = vận tốc.
- a(t) = v'(t) = s''(t) = **gia tốc**.

💡 **Trực giác**: \`f'\` đo "tốc độ đổi của \`f\`", \`f''\` đo "tốc độ đổi của \`f'\`" — tức độ cong/gia tốc. Nếu \`f\` là vị trí, \`f'\` là vận tốc (nhanh chậm), \`f''\` là gia tốc (đang tăng tốc hay phanh).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đạo hàm của đa thức bậc \`n\` đến lúc nào thì bằng 0?"* Sau \`n+1\` lần. Vd \`x⁴\`: \`4x³ → 12x² → 24x → 24 → 0\`. Mỗi lần đạo hàm hạ bậc đi 1; bậc 0 (hằng) thì đạo hàm tiếp ra 0.
- *"\`f''\` dùng để làm gì?"* Xác định lồi/lõm và phân loại cực trị (L05): \`f'' > 0\` → lõm lên (cực tiểu), \`f'' < 0\` → lõm xuống (cực đại). Trong vật lý là gia tốc.

⚠ **Lỗi thường gặp — tính \`f''\` mà bỏ quy tắc tích/chuỗi ở bước hai**. \`f'\` thường vẫn là tích/hợp, nên đạo hàm tiếp phải áp lại đầy đủ quy tắc. Vd \`f = x·e^x\` → \`f' = e^x(x+1)\` (tích) → \`f'' = e^x(x+1) + e^x = e^x(x+2)\` — bước hai vẫn cần product rule, không "đạo hàm thẳng".

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = x⁵\`. Tính \`f'''(x)\`.
2. \`f(x) = sin x\`. \`f''(x) = ?\` và \`f⁗(x) = ?\`

<details><summary>Đáp án</summary>

1. \`f' = 5x⁴\`, \`f'' = 20x³\`, \`f''' = 60x²\`.
2. \`f' = cos x\`, \`f'' = −sin x\`, \`f''' = −cos x\`, \`f⁗ = sin x\` (chu kỳ 4).

</details>

### 📝 Tóm tắt mục 4

- \`f''(x) = (f'(x))'\` — đạo hàm của đạo hàm; tiếp tục cho \`f''', f^{(n)}\`.
- Đa thức bậc \`n\` → đạo hàm thứ \`n+1\` bằng 0.
- Ý nghĩa: vị trí → vận tốc (\`f'\`) → gia tốc (\`f''\`); \`sin x\` lặp chu kỳ 4.

---

## 5. Bài tập đa quy tắc

### Bài tập

**Bài 1**: Tính đạo hàm của f(x) = (x² + 1)·cos x.

**Bài 2**: Tính (e^(2x)·sin x)'.

**Bài 3**: Tính đạo hàm của f(x) = (x² + 1) / (x - 3).

**Bài 4**: Tính (sin(cos(x²)))'.

**Bài 5**: Tính f''(x) khi f(x) = e^(2x)·x.

### Lời giải

**Bài 1**: Tích: (2x)·cos x + (x²+1)·(-sin x) = **2x·cos x - (x²+1)·sin x**.

**Bài 2**: Tích + chuỗi: (e^(2x))' = 2e^(2x). f' = 2e^(2x)·sin x + e^(2x)·cos x = **e^(2x)·(2sin x + cos x)**.

**Bài 3**: Thương: f' = [(2x)·(x-3) - (x²+1)·1] / (x-3)² = (2x² - 6x - x² - 1)/(x-3)² = **(x² - 6x - 1)/(x-3)²**.

**Bài 4**: 3 lớp:  
- Lớp ngoài: sin(u) → cos(u).  
- Lớp giữa: cos(v) → -sin(v).  
- Lớp trong: x² → 2x.  
- Kết quả: **cos(cos(x²)) · (-sin(x²)) · 2x = -2x·sin(x²)·cos(cos(x²))**.

**Bài 5**: f' = 2e^(2x)·x + e^(2x)·1 = e^(2x)·(2x+1).  
- f'' = (e^(2x)·(2x+1))' = 2e^(2x)·(2x+1) + e^(2x)·2 = **e^(2x)·(4x + 4) = 4e^(2x)·(x+1)**.

---

## 6. Bài tiếp theo

[Lesson 05 — Ứng dụng đạo hàm](../lesson-05-derivative-applications/).

## 📝 Tổng kết

1. **Bảng đạo hàm**: thuộc x^n, e^x, ln, sin/cos/tan, arcsin/arctan.
2. **5 quy tắc**: hằng nhân, tổng, **tích f'g+fg'**, **thương (f'g-fg')/g²**, **chuỗi f'(g)·g'**.
3. **Chain rule** quan trọng nhất — từ ngoài vào trong, mỗi lớp nhân đạo hàm.
4. **Hàm ngược**: (f⁻¹)' = 1/f'.
5. **Đạo hàm bậc cao**: f'' = vận tốc đổi (= gia tốc).
`;
