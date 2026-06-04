// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-05-multiple-integrals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Tích phân kép & bội

## Mục tiêu

- Hiểu **tích phân kép** ∫∫ f(x,y) dA — thể tích dưới mặt cong.
- Tính tích phân kép bằng tích phân lặp.
- Đổi biến (tọa độ cực).
- Tích phân bội (3 biến trở lên).

## Kiến thức tiền đề

- [Lesson 04 — Hàm nhiều biến](../lesson-04-multivariable-functions/), [T4 L07-08 — Tích phân](../../04-Calculus-1var/lesson-07-definite-integral/).

---

## 1. Tích phân kép — Định nghĩa

💡 **Trực giác**: Tích phân 1 biến ∫_a^b f(x) dx = diện tích dưới đồ thị. **Tích phân kép** ∫∫_D f(x,y) dA = **thể tích** dưới mặt cong z = f(x,y) trên miền D ⊂ ℝ².

### Định nghĩa Riemann

Chia D thành n×n ô vuông nhỏ ΔA. Lấy tổng f·ΔA. Khi n → ∞:
\`\`\`
∫∫_D f(x, y) dA = lim_{n→∞} Σ f(xᵢ, yⱼ)·ΔA
\`\`\`

> 📐 **Định nghĩa đầy đủ — Tích phân kép ∫∫_D f dA**
>
> **(a) Là gì**: Mở rộng tích phân 1 biến lên 2 biến. Tổng Riemann 2D: chia miền D thành n² ô nhỏ ΔA, cộng f·ΔA, lấy giới hạn n → ∞. Hình học = **thể tích** khối nằm dưới mặt cong z = f(x,y) trên miền D (nếu f ≥ 0; có thể âm).
>
> **(b) Vì sao cần**: Rất nhiều đại lượng "phân bố trên 1 miền 2D" cần tổng hợp: khối lượng tấm phẳng có mật độ ρ(x,y), tổng nhiệt năng trên 1 vùng, lượng nước rơi trên 1 vùng theo mật độ mưa, xác suất P(X,Y ∈ D) trong xác suất nhiều biến. Tích phân 1 biến không đủ — phải mở rộng. Fubini cho phép biến tích phân kép thành 2 tích phân lặp (đơn) — tính được.
>
> **(c) Ví dụ số**: ∫∫_{[0,1]×[0,2]} (x+2y) dA. Trong (theo y): ∫_0^2 (x+2y) dy = 2x + 4. Ngoài (theo x): ∫_0^1 (2x+4) dx = **5**. Diện tích đĩa bán kính 3: ∫∫_D 1 dA dùng tọa độ cực = ∫_0^{2π}∫_0^3 r dr dθ = π·9 = **9π** ✓ (= πR²). Thể tích cầu R: ∫∫∫ 1 dV bằng toạ độ cầu = (4/3)πR³. Khối lượng đĩa mật độ ρ = r (đặc hơn ở rìa): M = ∫_0^{2π}∫_0^R r·r dr dθ = (2π/3)R³.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân kép khác gì 2 lần tích phân đơn?"* Tích phân kép quét trên **cả miền 2D** (cộng f·ΔA của mọi ô nhỏ). Fubini cho phép tính nó **bằng** 2 tích phân đơn lồng nhau — đó là kỹ thuật tính, còn ý nghĩa là tổng trên 2D.
- *"f âm thì ∫∫ ra gì?"* Phần f < 0 đóng góp **âm** (thể tích "dưới mặt xy" tính trừ). Nếu cần thể tích thực luôn dương, lấy ∫∫|f|.

⚠ **Lỗi thường gặp — quên dА = dx·dy (hệ tọa độ Descartes), nhầm sang cực mà bỏ r**. Trong tọa độ cực dA = **r·dr·dθ** (có thừa số r), KHÔNG phải dr·dθ. Phản ví dụ: diện tích đĩa bán kính 3 = ∫∫ r dr dθ = 9π; nếu quên r: ∫∫ dr dθ = 3·2π = 6π (sai).

🔁 **Dừng lại tự kiểm tra**

1. ∫∫_D 1 dA với D = hình chữ nhật [0,2]×[0,3] bằng bao nhiêu?

<details><summary>Đáp án</summary>

= diện tích hình chữ nhật = 2·3 = **6**. (∫_0^2∫_0^3 1 dy dx = ∫_0^2 3 dx = 6.)

</details>

### 📝 Tóm tắt mục 1

- ∫∫_D f dA = tổng f·ΔA trên cả miền 2D = thể tích dưới mặt cong (nếu f ≥ 0).
- Fubini biến tích phân kép thành 2 tích phân đơn lồng nhau.
- ∫∫_D 1 dA = diện tích D; phần f < 0 đóng góp âm.

---

## 2. Tính bằng tích phân lặp (iterated integral)

💡 **Trực giác / Hình dung**: cắt khối thể tích thành các "lát mỏng". Với mỗi x cố định, lát theo y có diện tích A(x) = ∫f dy. Cộng tất cả các lát (∫A(x) dx) ra thể tích. Giống đo thể tích ổ bánh mì bằng cách cộng diện tích từng lát cắt × độ dày.

🎯 **Định lý Fubini**: Nếu f đủ "đẹp" và D = [a,b] × [c,d] (hình chữ nhật):
\`\`\`
∫∫_D f dA = ∫_a^b [∫_c^d f(x, y) dy] dx = ∫_c^d [∫_a^b f(x, y) dx] dy
\`\`\`

Tính tích phân trong trước (theo 1 biến, biến kia hằng), rồi tích phân ngoài.

### Ví dụ

\`\`\`
∫∫_{[0,1]×[0,2]} (x + 2y) dA
\`\`\`

Tính trong (theo y):
\`\`\`
∫_0^2 (x + 2y) dy = [xy + y²]_0^2 = 2x + 4
\`\`\`

Tính ngoài (theo x):
\`\`\`
∫_0^1 (2x + 4) dx = [x² + 4x]_0^1 = 5
\`\`\`

⟶ Kết quả = **5**.

**Verify đổi thứ tự** (Fubini nói kết quả không đổi): tính trong theo x trước. ∫_0^1 (x+2y) dx = [x²/2 + 2yx]_0^1 = 1/2 + 2y. Ngoài theo y: ∫_0^2 (1/2 + 2y) dy = [y/2 + y²]_0^2 = 1 + 4 = **5** ✓. Hai thứ tự cho cùng đáp số.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi thứ tự tích phân luôn cho cùng kết quả?"* Trên hình chữ nhật và f "đẹp": **luôn** (Fubini). Trên miền cong, đổi thứ tự thì **cận tích phân thay đổi** theo (xem mục 3) — phải tính lại cận, nhưng kết quả cuối vẫn bằng nhau.
- *"Khi nào chọn thứ tự nào?"* Chọn thứ tự khiến tích phân **trong dễ tính hơn** hoặc cận đơn giản hơn. Đây là kỹ năng quan trọng khi gặp miền cong.

⚠ **Lỗi thường gặp — coi biến ngoài là hằng nhưng quên thế cận đúng**. Khi tính tích phân trong, biến ngoài là **hằng** (giữ nguyên trong biểu thức), nhưng cận của tích phân trong có thể **phụ thuộc** biến ngoài (miền cong). Trên hình chữ nhật thì cận là số cố định.

🔁 **Dừng lại tự kiểm tra**

1. Tính ∫_0^1 ∫_0^1 (x + y) dy dx.

<details><summary>Đáp án</summary>

Trong: ∫_0^1 (x+y) dy = [xy + y²/2]_0^1 = x + 1/2. Ngoài: ∫_0^1 (x + 1/2) dx = [x²/2 + x/2]_0^1 = 1/2 + 1/2 = **1**.

</details>

### 📝 Tóm tắt mục 2

- Fubini: tính tích phân trong (1 biến, biến kia hằng) rồi tích phân ngoài.
- Đổi thứ tự cho cùng kết quả (hình chữ nhật, f đẹp); chọn thứ tự dễ tính hơn.
- Tích phân trong: biến ngoài là hằng, nhưng cận có thể phụ thuộc nó (miền cong).

---

## 3. Miền không-chữ-nhật

💡 **Trực giác / Hình dung**: với miền cong (tam giác, hình quạt...), cận của biến trong **không cố định** mà "men theo đường biên". Cố định x, biến y chạy từ biên dưới g(x) tới biên trên h(x) — cận là **hàm của x**. Như quét từng cột dọc qua hình, mỗi cột cao thấp khác nhau.

Nếu D = {(x, y) : a ≤ x ≤ b, g(x) ≤ y ≤ h(x)} (đường biên y = g, h):
\`\`\`
∫∫_D f dA = ∫_a^b [∫_{g(x)}^{h(x)} f(x, y) dy] dx
\`\`\`

**Ví dụ**: Tính ∫∫_T x·y dA, T = tam giác (0,0), (1,0), (1,1).
- T: 0 ≤ x ≤ 1, 0 ≤ y ≤ x.
- Trong: ∫_0^x x·y dy = x·[y²/2]_0^x = x³/2.
- Ngoài: ∫_0^1 x³/2 dx = 1/8.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao tìm cận g(x), h(x)?"* Vẽ miền D, cố định 1 giá trị x, xem y chạy từ biên nào tới biên nào. Vd tam giác trên: tại x cố định, y đi từ trục Ox (y=0) lên đường y=x.
- *"Tích phân trong còn ra số không?"* Không — ra **biểu thức theo x** (vì cận phụ thuộc x), rồi tích phân ngoài mới khử hết thành số.

⚠ **Lỗi thường gặp — đặt cận biến trong là hằng số thay vì hàm**. Trên miền cong, cận tích phân **trong** phải là hàm của biến ngoài. Phản ví dụ: tam giác T ở trên, nếu đặt nhầm 0 ≤ y ≤ 1 (cố định) thì tính ra diện tích hình vuông, không phải tam giác → sai miền.

🔁 **Dừng lại tự kiểm tra**

1. Mô tả cận cho miền D dưới parabol y = x², trên trục Ox, từ x = 0 đến x = 2.

<details><summary>Đáp án</summary>

0 ≤ x ≤ 2, **0 ≤ y ≤ x²**. ∫∫_D f dA = ∫_0^2 ∫_0^{x²} f dy dx (cận trên của y là hàm x²).

</details>

### 📝 Tóm tắt mục 3

- Miền cong: cận biến trong là **hàm** của biến ngoài (men theo biên).
- Tích phân trong ra biểu thức theo biến ngoài, rồi tích phân ngoài khử thành số.
- Vẽ miền + quét cột để xác định cận g(x), h(x).

---

## 4. Đổi biến — Tọa độ cực

💡 **Trực giác / Hình dung**: với miền tròn, dùng (x, y) khiến cận xấu (đường tròn x²+y² = R²). Đổi sang (r, θ) — "khoảng cách tới tâm" và "góc" — thì hình tròn thành hình chữ nhật đơn giản (0 ≤ r ≤ R, 0 ≤ θ ≤ 2π). Thừa số **r** trong dA = r·dr·dθ là vì ô lưới cực ở xa tâm thì **to hơn** (cung dài hơn): diện tích ô ≈ r·dr·dθ.

Với miền tròn / đối xứng quay, dùng tọa độ cực:
\`\`\`
x = r·cos θ, y = r·sin θ
dA = r·dr·dθ
\`\`\`

(Yếu tố Jacobian = r.)

**Ví dụ**: Tính ∫∫_D (x² + y²) dA, D = đĩa bán kính R.
- D: 0 ≤ r ≤ R, 0 ≤ θ ≤ 2π.
- x² + y² = r².
- = ∫_0^{2π} ∫_0^R r²·r dr dθ = ∫_0^{2π} [r⁴/4]_0^R dθ = ∫_0^{2π} R⁴/4 dθ = **π·R⁴/2**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dA = r·dr·dθ chứ không phải dr·dθ?"* Ô lưới cực hình "rẻ quạt" có 2 cạnh: bề dày dr và cung r·dθ (cung = bán kính × góc). Diện tích ô ≈ dr × (r·dθ) = r·dr·dθ. Thừa số r là Jacobian của phép đổi biến.
- *"Khi nào nên đổi sang cực?"* Khi miền tròn/quạt/vành khăn HOẶC biểu thức chứa x²+y² (thành r², gọn hẳn).

⚠ **Lỗi thường gặp — quên thừa số r**. Đây là lỗi #1 với tọa độ cực. Phản ví dụ: diện tích đĩa bán kính R = ∫∫ r dr dθ = πR². Nếu quên r: ∫∫ dr dθ = R·2π = 2πR (sai cả thứ nguyên — ra chu vi-ish chứ không phải diện tích).

🔁 **Dừng lại tự kiểm tra**

1. Tính diện tích đĩa bán kính 2 bằng tọa độ cực.

<details><summary>Đáp án</summary>

∫_0^{2π}∫_0^2 r dr dθ = ∫_0^{2π} [r²/2]_0^2 dθ = ∫_0^{2π} 2 dθ = 4π. Khớp πR² = π·4 = **4π** ✓.

</details>

### 📝 Tóm tắt mục 4

- Tọa độ cực: x = r cosθ, y = r sinθ; miền tròn → hình chữ nhật trong (r,θ).
- **dA = r·dr·dθ** (đừng quên r — Jacobian).
- Dùng khi miền tròn/quạt hoặc biểu thức chứa x²+y² = r².

---

## 5. Tích phân bội (n biến)

💡 **Trực giác / Hình dung**: tích phân kép cộng f trên miền 2D (diện tích), tích phân bội 3 cộng f trên khối 3D (thể tích). Nếu f = mật độ, tích phân = khối lượng cả vật. Tọa độ trụ (cho hình trụ) và cầu (cho hình cầu) là các "hệ tọa độ thuận" giống tọa độ cực nhưng cho 3D — mỗi cái có Jacobian riêng.

**3 biến**: ∫∫∫_V f(x, y, z) dV — tích phân trên khối V trong ℝ³.

\`\`\`
∫∫∫_V f dV = ∫_a^b ∫_c^d ∫_e^f f(x, y, z) dz dy dx
\`\`\`

(Thứ tự lặp tùy chọn.)

### Tọa độ trụ và cầu

- **Trụ**: x = r·cos θ, y = r·sin θ, z = z. dV = r·dr·dθ·dz.
- **Cầu**: x = ρ·sin φ·cos θ, y = ρ·sin φ·sin θ, z = ρ·cos φ. dV = ρ²·sin φ·dρ·dφ·dθ.

**Verify thể tích cầu bán kính R** (tọa độ cầu, f = 1):
- ∫_0^{2π}∫_0^π∫_0^R ρ²·sin φ dρ dφ dθ.
- Theo ρ: ∫_0^R ρ² dρ = R³/3. Theo φ: ∫_0^π sin φ dφ = 2. Theo θ: ∫_0^{2π} dθ = 2π.
- Tích = (R³/3)·2·2π = **(4/3)πR³** ✓ (đúng công thức thể tích cầu).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Jacobian trụ và cầu khác nhau thế nào?"* Trụ: **r** (giống cực, thêm z không đổi). Cầu: **ρ²·sin φ** (phức tạp hơn vì cả 2 góc cong). Nhớ sai Jacobian → sai toàn bộ.
- *"Khi nào dùng trụ vs cầu?"* Trụ cho vật có trục đối xứng (lon, ống). Cầu cho vật đối xứng quanh 1 điểm (quả bóng, hành tinh).

⚠ **Lỗi thường gặp — dùng nhầm Jacobian giữa trụ và cầu**. dV cầu là ρ²·sin φ·dρ dφ dθ, KHÔNG phải ρ·... Phản ví dụ: tính thể tích cầu mà dùng Jacobian = ρ (như trụ) → ra (πR³)·... sai hệ số, không khớp (4/3)πR³.

🔁 **Dừng lại tự kiểm tra**

1. Jacobian (dV) trong tọa độ cầu là gì?

<details><summary>Đáp án</summary>

dV = **ρ²·sin φ·dρ·dφ·dθ**. (ρ² vì khối cách tâm xa thì lớn hơn; sin φ điều chỉnh theo góc cực.)

</details>

### 📝 Tóm tắt mục 5

- ∫∫∫_V f dV cộng f trên khối 3D (= khối lượng nếu f = mật độ).
- Trụ: dV = r dr dθ dz (trục đối xứng); cầu: dV = ρ² sinφ dρ dφ dθ (đối xứng điểm).
- Chọn đúng hệ tọa độ + đúng Jacobian là then chốt.

---

## 6. Ứng dụng

### 6.1. Diện tích & thể tích

- Diện tích D = ∫∫_D 1 dA.
- Thể tích vật khối V = ∫∫∫_V 1 dV.

### 6.2. Khối tâm

\`\`\`
x̄ = ∫∫_D x·ρ dA / ∫∫_D ρ dA
ȳ = ∫∫_D y·ρ dA / ∫∫_D ρ dA
\`\`\`

ρ(x, y) = mật độ.

### 6.3. Momen quán tính

\`\`\`
I_z = ∫∫_D (x² + y²)·ρ dA
\`\`\`

Đại lượng quan trọng trong cơ học.

💡 **Trực giác / Hình dung**: cùng 1 công cụ tích phân kép/bội, đổi hàm f là ra đại lượng khác. f = 1 → diện tích/thể tích. f = ρ (mật độ) → khối lượng. f = x·ρ → "momen" để tính khối tâm. f = (x²+y²)·ρ → momen quán tính (đo "khó quay" của vật). Khối tâm = vị trí trung bình có trọng số theo mật độ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khối tâm chia cho ∫∫ρ dA?"* Vì đó là **trung bình có trọng số**: tử = tổng (vị trí × khối lượng nhỏ), mẫu = tổng khối lượng. Chia ra vị trí trung bình. Mật độ đều thì ρ rút gọn → khối tâm = trọng tâm hình học.

⚠ **Lỗi thường gặp — quên chia cho tổng khối lượng khi tính khối tâm**. x̄ = (∫∫ xρ dA)/(∫∫ ρ dA). Quên mẫu số → ra "momen" chứ không phải tọa độ (sai thứ nguyên).

🔁 **Dừng lại tự kiểm tra**

1. Khối tâm của hình vuông [0,2]×[0,2] mật độ đều nằm ở đâu?

<details><summary>Đáp án</summary>

Mật độ đều → khối tâm = tâm hình học = **(1, 1)** (trung điểm theo cả 2 trục).

</details>

### 📝 Tóm tắt mục 6

- Đổi hàm f → đại lượng khác: f=1 (diện tích/thể tích), f=ρ (khối lượng), f=(x²+y²)ρ (momen quán tính).
- Khối tâm = trung bình vị trí có trọng số mật độ: x̄ = (∫∫xρ dA)/(∫∫ρ dA).
- Mật độ đều → khối tâm = trọng tâm hình học.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính ∫_0^1 ∫_0^2 (3x²·y) dy dx.

**Bài 2**: Tính ∫∫_D x dA trên D = {(x,y) : 0 ≤ x ≤ 1, x ≤ y ≤ 1}.

**Bài 3**: Tính thể tích hình cầu bán kính R bằng tích phân.

**Bài 4**: Tính ∫∫_D dA trên D = đĩa bán kính 3.

**Bài 5**: Khối tâm tam giác đỉnh (0,0), (1,0), (0,1) (mật độ đều).

### Lời giải

**Bài 1**: Trong (theo y): ∫_0^2 3x²·y dy = 3x²·[y²/2]_0^2 = 6x². Ngoài: ∫_0^1 6x² dx = **2**.

**Bài 2**: ∫_0^1 ∫_x^1 x dy dx = ∫_0^1 x(1-x) dx = [x²/2 - x³/3]_0^1 = 1/2 - 1/3 = **1/6**.

**Bài 3**: V = ∫_0^{2π} ∫_0^π ∫_0^R ρ²·sin φ dρ dφ dθ = (R³/3)·2·(2π) = **(4/3)·π·R³** ✓.

**Bài 4**: Diện tích đĩa = ∫_0^{2π} ∫_0^3 r dr dθ = ∫_0^{2π} (9/2) dθ = **9π**. Khớp πR² = 9π ✓.

**Bài 5**: D: 0 ≤ x ≤ 1, 0 ≤ y ≤ 1-x. S(D) = 1/2.  
- ∫∫ x dA = ∫_0^1 x(1-x) dx = 1/6. x̄ = (1/6)/(1/2) = **1/3**.  
- Tương tự ȳ = **1/3**. → khối tâm (1/3, 1/3).

---

## 8. Bài tiếp theo

[Lesson 06 — Chuỗi & Taylor](../lesson-06-series-taylor/).

## 📝 Tổng kết

1. **∫∫_D f dA** = thể tích dưới mặt cong f(x,y) trên miền D.
2. **Fubini**: tính tích phân lặp, thứ tự đổi được khi f "đẹp".
3. **Tọa độ cực**: dA = r·dr·dθ. Cho miền tròn.
4. **Cầu, trụ**: cho 3 chiều với đối xứng quay.
5. **Ứng dụng**: diện tích, thể tích, khối tâm, momen quán tính.
`;
