// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-06-series-taylor/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Chuỗi & Khai triển Taylor

## Mục tiêu

- Hiểu **chuỗi số** Σ aₙ — hội tụ/phân kỳ.
- Các tiêu chí hội tụ: so sánh, tỉ số (d'Alembert), Cauchy.
- **Chuỗi luỹ thừa** & bán kính hội tụ.
- **Khai triển Taylor** — xấp xỉ hàm bằng đa thức.

## Kiến thức tiền đề

- [T4 L01 — Giới hạn dãy](../../04-Calculus-1var/lesson-01-sequences-limits/), L03-04 đạo hàm.

---

## 1. Chuỗi số

💡 **Trực giác / Hình dung**: cộng vô hạn số — kết quả có thể là **số hữu hạn** (hội tụ) hay **vô cùng / không ổn định** (phân kỳ). Nghịch lý? Hình dung đi bộ: bước 1/2, rồi 1/4, rồi 1/8... tổng tiến tới đúng 1 dù vô hạn bước. Nhưng cộng 1+1+1+... thì lớn vô hạn. Chuỗi hội tụ = "các số hạng nhỏ đủ nhanh để tổng dừng lại".

\`\`\`
Σ_{n=1}^∞ aₙ = a₁ + a₂ + a₃ + ...
\`\`\`

**Tổng riêng** S_N = a₁ + ... + a_N. Nếu S_N có giới hạn S khi N → ∞, chuỗi **hội tụ** với tổng S. Ngược lại **phân kỳ**.

### Ví dụ kinh điển

**Cấp số nhân**: Σ a·r^n (n=0..∞) = a/(1-r) khi |r| < 1.
- 1 + 1/2 + 1/4 + 1/8 + ... = 1/(1-1/2) = **2**.
- 1 + 1 + 1 + ... = phân kỳ.

**Chuỗi điều hòa**: Σ 1/n = 1 + 1/2 + 1/3 + ... → **phân kỳ** (mặc dù aₙ → 0).

**Chuỗi p**: Σ 1/n^p hội tụ ⟺ p > 1.
- p = 1: phân kỳ (điều hòa).
- p = 2: hội tụ. Σ 1/n² = π²/6 (Euler).

**4 ví dụ số đa dạng** (phân loại hội tụ/phân kỳ):
- Σ (1/2)ⁿ = 1 + 1/2 + 1/4 + ... = **2** (hội tụ, |r| < 1).
- Σ 1/n² = 1 + 1/4 + 1/9 + ... = **π²/6 ≈ 1.645** (hội tụ, p = 2 > 1).
- Σ 1/n = 1 + 1/2 + 1/3 + ... = **∞** (phân kỳ, điều hòa p = 1).
- Σ 2ⁿ = 1 + 2 + 4 + ... = **∞** (phân kỳ, r = 2 > 1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"aₙ → 0 thì chuỗi hội tụ chứ?"* **Không đủ!** Chuỗi điều hòa Σ1/n có 1/n → 0 nhưng vẫn phân kỳ. aₙ → 0 chỉ là điều kiện **cần**, không đủ.
- *"Cấp số nhân hội tụ khi nào?"* |r| < 1. Tổng = a/(1−r). Vd r = 1/3: hội tụ; r = 1 hoặc r ≥ 1: phân kỳ.

⚠ **Lỗi thường gặp — kết luận hội tụ chỉ vì các số hạng nhỏ dần**. Phản ví dụ: Σ1/n có số hạng nhỏ dần về 0 nhưng tổng → ∞ (phân kỳ). Tốc độ nhỏ dần phải **đủ nhanh** (như 1/n² hoặc rⁿ với |r|<1).

🔁 **Dừng lại tự kiểm tra**

1. Σ (1/4)ⁿ (n từ 0) hội tụ về bao nhiêu?
2. Σ 1/n^(1/2) hội tụ hay phân kỳ?

<details><summary>Đáp án</summary>

1. a = 1, r = 1/4 → tổng = 1/(1−1/4) = 1/(3/4) = **4/3**.
2. p = 1/2 ≤ 1 → **phân kỳ** (chuỗi p chỉ hội tụ khi p > 1).

</details>

### 📝 Tóm tắt mục 1

- Chuỗi hội tụ ⟺ tổng riêng S_N có giới hạn hữu hạn.
- Cấp số nhân Σrⁿ hội tụ ⟺ |r| < 1, tổng a/(1−r); chuỗi p Σ1/nᵖ hội tụ ⟺ p > 1.
- aₙ → 0 là **cần nhưng không đủ** (điều hòa phản ví dụ).

---

## 2. Tiêu chí hội tụ

💡 **Trực giác / Hình dung**: vì không cộng được vô hạn số bằng tay, ta cần "máy dò" báo hội tụ/phân kỳ mà **không cần tính tổng**. Tiêu chí tỉ số nhìn "mỗi số hạng nhỏ đi bao nhiêu lần so với số trước" (như cấp số nhân ngầm): co lại (< 1) → hội tụ; phình ra (> 1) → phân kỳ.

### 2.1. Điều kiện cần
Σ aₙ hội tụ ⟹ aₙ → 0.

⚠ **Ngược không đúng**: aₙ → 0 không kết luận được. (VD chuỗi điều hòa.)

### 2.2. So sánh
0 ≤ aₙ ≤ bₙ. Nếu Σ bₙ hội tụ → Σ aₙ hội tụ.

### 2.3. Tỉ số (D'Alembert)
Tính L = lim |aₙ₊₁/aₙ|.
- L < 1: hội tụ.
- L > 1: phân kỳ.
- L = 1: chưa kết luận được.

**Ví dụ**: Σ n!/n^n. aₙ₊₁/aₙ = (n+1)!·n^n / ((n+1)^(n+1)·n!) = n^n/(n+1)^n = (n/(n+1))^n → 1/e < 1. **Hội tụ**.

### 2.4. Cauchy (căn)
L = lim ⁿ√|aₙ|. L < 1: hội tụ; L > 1: phân kỳ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"L = 1 thì sao?"* Tiêu chí tỉ số/căn **bất lực** (chưa kết luận). Phải dùng cách khác (so sánh, chuỗi p). Vd Σ1/n và Σ1/n² đều cho L = 1 nhưng 1 phân kỳ, 1 hội tụ.
- *"Khi nào dùng tỉ số vs so sánh?"* Tỉ số rất hợp khi có **giai thừa hoặc lũy thừa** (n!, rⁿ) vì chúng rút gọn đẹp. So sánh hợp khi aₙ giống 1 chuỗi đã biết (1/n, 1/n²).

⚠ **Lỗi thường gặp — quên lấy trị tuyệt đối**. Tiêu chí tỉ số dùng |aₙ₊₁/aₙ|, không phải aₙ₊₁/aₙ. Với chuỗi đan dấu (vd (−1)ⁿ/n), bỏ trị tuyệt đối sẽ ra số âm và kết luận sai.

🔁 **Dừng lại tự kiểm tra**

1. Dùng tiêu chí tỉ số cho Σ 1/n!. Hội tụ?

<details><summary>Đáp án</summary>

aₙ₊₁/aₙ = n!/(n+1)! = 1/(n+1) → 0 < 1 khi n → ∞ → **hội tụ** (thực ra tổng = e − 1 ≈ 1.718).

</details>

### 📝 Tóm tắt mục 2

- Điều kiện cần: aₙ → 0 (không đủ).
- Tỉ số (D'Alembert): L = lim|aₙ₊₁/aₙ|; < 1 hội tụ, > 1 phân kỳ, = 1 bất lực.
- Tỉ số/căn hợp với n!, rⁿ; so sánh hợp khi giống chuỗi đã biết. Luôn lấy trị tuyệt đối.

---

## 3. Chuỗi luỹ thừa

💡 **Trực giác / Hình dung**: chuỗi lũy thừa = "đa thức vô hạn" theo x. Khác chuỗi số (cố định), nó hội tụ hay không **tùy giá trị x**. Vùng x làm nó hội tụ là 1 khoảng đối xứng quanh 0 với "bán kính" R: gần 0 (|x| < R) thì các số hạng xⁿ đủ nhỏ → hội tụ; xa quá (|x| > R) thì xⁿ phình → phân kỳ. R như "tầm với" của chuỗi.

\`\`\`
Σ aₙ·x^n  =  a₀ + a₁·x + a₂·x² + ...
\`\`\`

**Bán kính hội tụ R**: chuỗi hội tụ với |x| < R, phân kỳ với |x| > R.
- Tính: 1/R = lim |aₙ₊₁/aₙ| (hoặc lim ⁿ√|aₙ|).

**4 ví dụ số đa dạng**:
- Σ xⁿ/n!: R = ∞ (hội tụ mọi x — đây là eˣ).
- Σ xⁿ: 1/R = lim|1/1| = 1 → R = 1 (cấp số nhân, hội tụ |x| < 1).
- Σ xⁿ/n: 1/R = lim n/(n+1) = 1 → R = **1**.
- Σ n!·xⁿ: 1/R = lim (n+1)!/n! = lim(n+1) = ∞ → R = **0** (chỉ hội tụ tại x = 0).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại biên |x| = R thì sao?"* Tiêu chí không kết luận — phải xét riêng từng đầu mút. Vd Σxⁿ/n: tại x = −1 hội tụ (đan dấu), tại x = 1 phân kỳ (điều hòa).
- *"R = ∞ và R = 0 nghĩa là gì?"* R = ∞: hội tụ với mọi x (như eˣ, sin x). R = 0: chỉ hội tụ đúng tại x = 0 (vô dụng để xấp xỉ).

⚠ **Lỗi thường gặp — nhầm 1/R với R**. Công thức cho **1/R** = lim|aₙ₊₁/aₙ|, phải nghịch đảo để ra R. Phản ví dụ: Σn!xⁿ cho lim = ∞ = 1/R → R = 0 (KHÔNG phải R = ∞).

🔁 **Dừng lại tự kiểm tra**

1. Tìm bán kính hội tụ của Σ xⁿ/2ⁿ.

<details><summary>Đáp án</summary>

aₙ = 1/2ⁿ. 1/R = lim |aₙ₊₁/aₙ| = lim (2ⁿ/2ⁿ⁺¹) = 1/2 → R = **2** (hội tụ với |x| < 2).

</details>

### 📝 Tóm tắt mục 3

- Chuỗi lũy thừa = "đa thức vô hạn" theo x; hội tụ trong |x| < R.
- 1/R = lim|aₙ₊₁/aₙ| → nhớ **nghịch đảo** để ra R.
- R = ∞ (mọi x), R = 0 (chỉ x=0); biên |x|=R xét riêng.

---

## 4. Khai triển Taylor

🎯 **Phát biểu**: Hàm f có đạo hàm vô hạn lần tại điểm a có thể (đôi khi) viết:
\`\`\`
f(x) = f(a) + f'(a)(x-a) + f''(a)(x-a)²/2! + f'''(a)(x-a)³/3! + ...
     = Σ_{n=0}^∞ f^(n)(a)/n! · (x-a)^n
\`\`\`

⟶ **Xấp xỉ hàm phức tạp bằng đa thức**.

> 📐 **Định nghĩa đầy đủ — Khai triển Taylor**
>
> **(a) Là gì**: Cách viết 1 hàm "đẹp" f(x) thành 1 **tổng đa thức vô hạn** quanh điểm a: f(x) = Σ f^(n)(a)/n! · (x−a)^n. Hệ số đa thức là các đạo hàm bậc n của f tại a, chia n!. Khai triển quanh a=0 gọi là Maclaurin.
>
> **(b) Vì sao cần**: Máy tính, máy bỏ túi không "biết" sin x, e^x trực tiếp — chúng tính qua **vài số hạng đầu của Taylor**. Trong vật lý: xấp xỉ "tuyến tính" (giữ chỉ x), "bậc 2" (thêm x²) đủ cho hầu hết tính toán gần điểm cân bằng (con lắc nhỏ → sin θ ≈ θ → dao động điều hoà). Trong ML: Taylor bậc 2 cho phương pháp Newton-Raphson, quasi-Newton (BFGS), Hessian. Quan trọng nhất — Taylor cho cầu nối **giải tích ↔ đại số**: hàm bất kỳ → "đa thức vô hạn".
>
> **(c) Ví dụ số**: e^x = 1 + x + x²/2 + x³/6 + x⁴/24 + .... Tính e^0.5 với 4 số hạng: 1+0.5+0.125+0.0208 ≈ 1.6458. Giá trị thật: 1.6487 (sai ~0.0029). sin x = x − x³/6 + x⁵/120 − ... sin(0.1) ≈ 0.1 − 0.000167 = 0.0998334. Thật: 0.0998334 ✓. cos x = 1 − x²/2 + x⁴/24 − .... ln(1+x) = x − x²/2 + x³/3 − ... (chỉ hội tụ |x|≤1). 1/(1−x) = 1 + x + x² + ... (cấp số nhân). Euler: e^(iπ) = 1 + iπ + (iπ)²/2 + ... = cos π + i·sin π = −1.

**Tại a = 0** (Maclaurin):
\`\`\`
f(x) = f(0) + f'(0)·x + f''(0)·x²/2! + ...
\`\`\`

### Khai triển nổi tiếng

| f(x) | Khai triển Maclaurin | Hội tụ |
|------|----------------------|--------|
| e^x | 1 + x + x²/2! + x³/3! + ... | ∀x |
| sin x | x - x³/3! + x⁵/5! - ... | ∀x |
| cos x | 1 - x²/2! + x⁴/4! - ... | ∀x |
| ln(1+x) | x - x²/2 + x³/3 - ... | -1 < x ≤ 1 |
| 1/(1-x) | 1 + x + x² + x³ + ... | |x| < 1 |

💡 **Ứng dụng**: Máy tính tính sin, cos, e^x bằng vài số hạng Taylor.

**Ví dụ**: tính e^0.5.
- 1 + 0.5 + 0.125 + 0.0208 + 0.0026 ≈ **1.6484**.
- Giá trị thật: 1.6487. Sai 0.0003 với chỉ 5 số hạng.

**Verify sin(0.1) bằng Taylor**: sin x = x − x³/6 + x⁵/120 − ... Tại x = 0.1: 0.1 − 0.001/6 + ... = 0.1 − 0.0001667 = **0.0998333**. Máy tính: sin(0.1) = 0.0998334 ✓ (sai < 10⁻⁶ với 2 số hạng — vì x nhỏ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Lấy bao nhiêu số hạng là đủ?"* Tùy độ chính xác cần + x gần a tới đâu. x càng gần a (điểm khai triển), hội tụ càng nhanh. Vd eˣ tại x = 0.5 chỉ cần ~5 số hạng; tại x = 10 cần rất nhiều.
- *"Hàm nào cũng khai triển Taylor được?"* Cần f khả vi vô hạn lần tại a. Và chuỗi phải **hội tụ về đúng f** (hầu hết hàm quen thuộc thỏa, vài hàm bệnh lý không).
- *"Vì sao chia n!?"* Để đạo hàm bậc n của vế phải tại a khớp đúng f⁽ⁿ⁾(a). Đạo hàm xⁿ n lần ra n! → chia n! để triệt tiêu.

⚠ **Lỗi thường gặp — sai dấu xen kẽ trong sin/cos**. sin x = x − x³/6 + x⁵/120 − ... dấu **+ − + −**. Nếu cộng hết dấu +: sin(0.1) ≈ 0.1 + 0.000167 = 0.100167 (sai). Tương tự cos x = 1 − x²/2 + x⁴/24 − ...

🔁 **Dừng lại tự kiểm tra**

1. Viết 3 số hạng đầu của eˣ và tính e^0.1.
2. cos x đến bậc 4 là gì?

<details><summary>Đáp án</summary>

1. eˣ ≈ 1 + x + x²/2. Tại 0.1: 1 + 0.1 + 0.005 = **1.105** (thật: 1.10517 ✓).
2. cos x ≈ 1 − x²/2 + x⁴/24.

</details>

### 📝 Tóm tắt mục 4

- Taylor: f(x) = Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ — xấp xỉ hàm bằng đa thức quanh a.
- Hệ số chia n! để đạo hàm khớp; x gần a → hội tụ nhanh.
- Nhớ dấu xen kẽ của sin (x − x³/6 + ...) và cos (1 − x²/2 + ...).

---

## 5. Công thức Euler (lại)

💡 **Trực giác / Hình dung**: Euler là "phép màu" nối hàm mũ với lượng giác. Khai triển Taylor của eˣ, cos x, sin x là 3 chuỗi riêng. Nhưng khi cắm x = iθ vào eˣ, các lũy thừa của i (i² = −1, i³ = −i, i⁴ = 1...) **tự động tách** chuỗi thành phần thực (= cos θ) và phần ảo (= sin θ). 3 hàm hóa ra là 1 gia đình.

Từ Taylor:
- e^(iθ) = 1 + iθ + (iθ)²/2! + (iθ)³/3! + ...
- = (1 - θ²/2! + θ⁴/4! - ...) + i(θ - θ³/3! + ...)
- = **cos θ + i·sin θ**

Đã CM ở [T3 L06](../../03-Trig-Complex/lesson-06-complex-polar-euler/).

**Walk-through chứng minh từng bước** (gom theo thực/ảo):
- (iθ)⁰ = 1, (iθ)¹ = iθ, (iθ)² = −θ², (iθ)³ = −iθ³, (iθ)⁴ = θ⁴, ...
- Phần không có i (lũy thừa chẵn): 1 − θ²/2! + θ⁴/4! − ... = **cos θ**.
- Phần có i (lũy thừa lẻ): i(θ − θ³/3! + θ⁵/5! − ...) = **i·sin θ**.
- Cộng lại: e^(iθ) = cos θ + i·sin θ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"e^(iπ) = −1 nghĩa là gì?"* Cắm θ = π: cos π + i·sin π = −1 + 0 = **−1**. Đẳng thức Euler e^(iπ) + 1 = 0 nối 5 hằng số đẹp nhất (e, i, π, 1, 0).
- *"Vì sao tách được thực/ảo gọn vậy?"* Vì i² = −1 tạo dấu xen kẽ đúng khớp với dấu của chuỗi cos, sin. Không trùng hợp — đó là lý do sâu xa sin/cos "dao động".

⚠ **Lỗi thường gặp — quên (iθ)² = −θ²**, viết thành +θ². Phản ví dụ: nếu (iθ)² = +θ² thì phần thực thành 1 + θ²/2 + ... = cosh θ (sai), không ra cos θ.

🔁 **Dừng lại tự kiểm tra**

1. Tính e^(iπ/2) bằng công thức Euler.

<details><summary>Đáp án</summary>

e^(iπ/2) = cos(π/2) + i·sin(π/2) = 0 + i·1 = **i**.

</details>

### 📝 Tóm tắt mục 5

- Euler: e^(iθ) = cos θ + i·sin θ, suy ra từ khai triển Taylor.
- Lũy thừa của i (i²=−1...) tách chuỗi thành phần thực (cos) và ảo (sin).
- e^(iπ) = −1; nối hàm mũ với lượng giác.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính tổng cấp số nhân Σ 2·(1/3)^n (n=0..∞).

**Bài 2**: Chuỗi Σ (n+1)/(n²+1) hội tụ hay phân kỳ?

**Bài 3**: Tính bán kính hội tụ của Σ x^n/n.

**Bài 4**: Viết khai triển Taylor của cos x đến bậc 6.

**Bài 5**: Dùng Taylor xấp xỉ √(1 + 0.1) đến bậc 2.

### Lời giải

**Bài 1**: a = 2, r = 1/3. Tổng = 2/(1-1/3) = **3**.

**Bài 2**: (n+1)/(n²+1) ≈ 1/n khi n lớn → so sánh với điều hòa → **phân kỳ**.

**Bài 3**: aₙ = 1/n. lim |aₙ₊₁/aₙ| = lim n/(n+1) = 1 → R = **1**.

**Bài 4**: cos x = 1 - x²/2! + x⁴/4! - x⁶/6! + ... = **1 - x²/2 + x⁴/24 - x⁶/720**.

**Bài 5**: (1+x)^(1/2) ≈ 1 + x/2 - x²/8. Với x = 0.1: 1 + 0.05 - 0.00125 = **1.04875**. Thật: 1.04881.

---

## 7. Bài tiếp theo

[Lesson 07 — Phương trình vi phân](../lesson-07-differential-equations/).

## 📝 Tổng kết

1. **Chuỗi hội tụ**: tổng riêng có giới hạn. **Điều kiện cần**: aₙ → 0 (không đủ).
2. **Tiêu chí tỉ số (D'Alembert)**: lim |aₙ₊₁/aₙ| < 1.
3. **Cấp số nhân** Σ r^n hội tụ ⟺ |r| < 1.
4. **Chuỗi p** Σ 1/n^p hội tụ ⟺ p > 1.
5. **Taylor**: xấp xỉ hàm bằng đa thức. e^x, sin x, cos x, ln(1+x) khai triển được.
`;
