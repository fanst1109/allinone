# Lesson 07 — Phương trình vi phân (ODE)

## Mục tiêu

- Hiểu **PT vi phân thường (ODE)**: PT chứa hàm và đạo hàm.
- Giải ODE bậc 1: tách biến, tuyến tính.
- ODE bậc 2 tuyến tính hệ số hằng.
- Mô hình hóa: dao động, tăng trưởng dân số, RC circuit.

## Kiến thức tiền đề

- [T4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. PT vi phân là gì?

💡 **Định nghĩa**: PT chứa hàm chưa biết y(x) và **đạo hàm** của nó: y', y'', ...

**Bậc** = bậc đạo hàm cao nhất.

**Ví dụ**:
- y' = 2x: bậc 1.
- y'' + y = 0: bậc 2.
- (y')² + y = x: phi tuyến (do bình phương y').

### Vì sao quan trọng?

Tự nhiên thường mô tả qua **tốc độ thay đổi**, không phải giá trị trực tiếp:
- Vận tốc = đạo hàm vị trí: v = ds/dt.
- Gia tốc = đạo hàm vận tốc: F = ma → a = F/m → d²s/dt² = F/m.
- Phóng xạ: dN/dt = -λ·N (tốc độ phân rã tỉ lệ N).
- Nguội: dT/dt = -k(T - T_phòng).

⟶ ODE = **ngôn ngữ của khoa học**.

> 📐 **Định nghĩa đầy đủ — Phương trình vi phân thường (ODE)**
>
> **(a) Là gì**: PT trong đó **ẩn số là 1 hàm** y(x) (không phải 1 số), và PT có chứa các đạo hàm của hàm đó. "Giải ODE" = tìm hàm y(x) thoả PT, thường có 1 hằng số tự do (cần điều kiện đầu y(x₀) = y₀ để xác định cụ thể).
>
> **(b) Vì sao cần**: Hầu hết quy luật khoa học không phát biểu trực tiếp về **giá trị** mà về **tốc độ thay đổi**. Newton định luật 2: F = ma = m·d²s/dt² (PT vi phân bậc 2 cho s(t)). Phóng xạ: dN/dt = −λN (tốc độ phân rã tỉ lệ N). RC mạch: V = R·dq/dt + q/C. Logistic dân số: dN/dt = rN(1−N/K). Cơ học lượng tử: Schrödinger PT là PT vi phân riêng phần. Mô hình hoá COVID, kinh tế, khí hậu — tất cả đều ODE/PDE. Giải ODE = "tích phân" hàm theo thời gian/không gian.
>
> **(c) Ví dụ số**: y' = 2x → y = x² + C (nguyên hàm). y(0) = 5 → C = 5 → y = x²+5. dN/dt = −0.1N → N(t) = N₀·e^(−0.1t). Nếu N₀ = 1000, sau 10 đơn vị thời gian: N(10) = 1000·e⁻¹ ≈ 368. Con lắc nhỏ: θ'' + (g/L)·θ = 0 → θ(t) = A·cos(ωt+φ) với ω = √(g/L). L = 1m, g = 9.8 → ω ≈ 3.13 rad/s, chu kỳ T ≈ **2.01s**. Lò xo m=1kg, k=100 N/m: ω = 10 rad/s, T = 0.628s.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nghiệm ODE là số hay hàm?"* Là **hàm** y(x), không phải 1 con số. Vd y' = 2x có nghiệm y = x² + C (cả họ hàm). Đây là khác biệt cốt lõi với phương trình đại số.
- *"Vì sao có hằng số C?"* Vì "tích phân" mất thông tin hằng số. Cần thêm **điều kiện đầu** (vd y(0) = 5) để chốt C, ra 1 nghiệm cụ thể.

⚠ **Lỗi thường gặp — quên hằng số C khi giải**. Mỗi lần tích phân sinh 1 hằng số. ODE bậc 1 → 1 hằng số; bậc 2 → 2 hằng số. Phản ví dụ: y' = 2x → viết y = x² (thiếu C) là sai; phải y = x² + C, rồi dùng điều kiện đầu tìm C.

🔁 **Dừng lại tự kiểm tra**

1. y = 3e^(2x) có là nghiệm của y' = 2y không?
2. Bậc của y''' + y' = x là mấy?

<details><summary>Đáp án</summary>

1. y' = 6e^(2x) = 2·(3e^(2x)) = 2y ✓ → **có**.
2. **Bậc 3** (đạo hàm cao nhất là y''').

</details>

### 📝 Tóm tắt mục 1

- ODE: phương trình chứa hàm chưa biết y(x) và đạo hàm của nó; nghiệm là **hàm**.
- Bậc = bậc đạo hàm cao nhất; giải = tìm họ hàm + dùng điều kiện đầu chốt hằng số.
- ODE là "ngôn ngữ" mô tả quy luật qua tốc độ thay đổi.

---

## 2. ODE bậc 1 — Tách biến (Separable)

💡 **Trực giác / Hình dung**: nếu vế phải "tách" được thành phần chỉ-x nhân phần chỉ-y, ta dồn mọi thứ y về 1 vế, mọi thứ x về vế kia, rồi tích phân từng vế độc lập. Như phân loại đồ vào 2 ngăn rồi xử lý riêng.

Dạng:
```
dy/dx = f(x) · g(y)
```

**Cách giải**: tách 2 vế:
```
dy/g(y) = f(x) dx
```

Tích phân 2 vế.

**Ví dụ 1**: dy/dx = -2x·y.
- dy/y = -2x dx.
- ∫ dy/y = -∫ 2x dx → ln|y| = -x² + C.
- → **y = A·e^(-x²)** (A = e^C).

**Ví dụ 2 — Tăng trưởng dân số**: dN/dt = k·N.
- dN/N = k dt → ln|N| = kt + C → **N(t) = N₀·e^(kt)**.

→ Tăng trưởng cấp số nhân. Nếu k > 0 (sinh nhiều hơn chết) thì bùng nổ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi ODE bậc 1 đều tách biến được?"* Không. Chỉ khi vế phải = f(x)·g(y). Vd dy/dx = x + y KHÔNG tách được (phải dùng phương pháp tuyến tính, mục 3).
- *"Vì sao dN/dt = kN ra hàm mũ?"* Vì "tốc độ tỉ lệ với lượng hiện có" = đặc trưng của hàm mũ (càng nhiều càng tăng nhanh). Đây là mô hình lãi kép, dân số, phóng xạ (k < 0).

⚠ **Lỗi thường gặp — quên |y| và hằng số khi tích phân 1/y**. ∫dy/y = ln|y| + C (có trị tuyệt đối). Quên C → mất họ nghiệm; quên |·| → sai miền. Sau khi mũ hóa: y = ±e^C·e^(...) = A·e^(...), A gói cả dấu.

🔁 **Dừng lại tự kiểm tra**

1. Giải dy/dx = 3y với y(0) = 2.

<details><summary>Đáp án</summary>

dy/y = 3 dx → ln|y| = 3x + C → y = A·e^(3x). y(0) = A = 2 → **y = 2e^(3x)**.

</details>

### 📝 Tóm tắt mục 2

- Tách biến: dồn y về 1 vế, x về vế kia, tích phân từng vế.
- Áp dụng khi dy/dx = f(x)·g(y); dN/dt = kN → N₀·e^(kt) (tăng trưởng/phân rã mũ).
- Nhớ |y| và hằng số C khi tích phân.

---

## 3. ODE bậc 1 tuyến tính

💡 **Trực giác / Hình dung**: khi không tách biến được, ta nhân cả phương trình với 1 "thừa số phép thuật" μ(x) khiến vế trái gập lại thành đạo hàm của 1 tích (μ·y)'. Rồi chỉ việc tích phân ngược. μ được thiết kế đúng để (μy)' = μy' + μ'y khớp với vế trái.

Dạng:
```
y' + P(x)·y = Q(x)
```

**Phương pháp thừa số tích phân**: nhân 2 vế với μ(x) = e^(∫P(x) dx):
```
(μ·y)' = μ·Q
μ·y = ∫ μ·Q dx
y = (1/μ) · ∫ μ·Q dx
```

**Ví dụ**: y' + 2y = 4.
- P = 2, Q = 4. μ = e^(2x).
- e^(2x)·y = ∫ 4·e^(2x) dx = 2·e^(2x) + C.
- → **y = 2 + C·e^(-2x)**.

Khi t → ∞: y → 2 (cân bằng).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao μ = e^(∫P dx)?"* Để μ' = P·μ, khi đó μy' + Pμy = μy' + μ'y = (μy)' — gập lại thành đạo hàm tích. Đó là yêu cầu thiết kế μ.
- *"Nghiệm gồm 2 phần: 2 và C·e^(−2x), nghĩa là gì?"* "2" là nghiệm riêng (trạng thái cân bằng lâu dài); C·e^(−2x) là phần phụ tắt dần về 0. Cấu trúc "cân bằng + transient" rất phổ biến trong vật lý/kỹ thuật.

⚠ **Lỗi thường gặp — quên nhân Q với μ ở vế phải**. Sau khi nhân μ, vế phải phải là μ·Q (cả hai vế nhân μ). Phản ví dụ: y'+2y=4, μ=e^(2x). Vế phải đúng ∫4e^(2x)dx; nếu quên μ, tích ∫4 dx = 4x → nghiệm sai.

🔁 **Dừng lại tự kiểm tra**

1. Tìm thừa số tích phân μ cho y' + 3y = x.

<details><summary>Đáp án</summary>

P = 3 → μ = e^(∫3 dx) = **e^(3x)**.

</details>

### 📝 Tóm tắt mục 3

- Dạng y' + P(x)y = Q(x); nhân μ = e^(∫P dx) → vế trái = (μy)'.
- Giải: μy = ∫μQ dx → y = (1/μ)∫μQ dx (nhớ nhân Q với μ).
- Nghiệm thường = cân bằng + phần transient tắt dần.

---

## 4. ODE bậc 2 tuyến tính hệ số hằng

💡 **Trực giác / Hình dung**: đoán nghiệm dạng y = e^(rx) (vì đạo hàm của mũ lại ra mũ). Thay vào, phương trình rút gọn thành PT bậc 2 cho r (PT đặc trưng). Δ quyết định "tính cách" nghiệm: 2 nghiệm thực → tắt dần không dao động; nghiệm phức → **dao động** (sin/cos); nghiệm kép → trường hợp tới hạn. Đây là toán học của lò xo, mạch điện, con lắc.

```
y'' + a·y' + b·y = 0
```

(Thuần nhất — vế phải = 0.)

**Phương pháp**: tìm nghiệm dạng y = e^(rx). Thay vào → **PT đặc trưng**:
```
r² + a·r + b = 0
```

3 trường hợp theo Δ = a² - 4b:

### TH1: Δ > 0 — 2 nghiệm thực r₁, r₂
```
y = C₁·e^(r₁x) + C₂·e^(r₂x)
```

### TH2: Δ = 0 — nghiệm kép r
```
y = (C₁ + C₂·x)·e^(rx)
```

### TH3: Δ < 0 — 2 nghiệm phức α ± βi
```
y = e^(αx)·(C₁·cos(βx) + C₂·sin(βx))
```

→ **Dao động**.

**Walk-through 3 trường hợp** (mỗi TH 1 ví dụ):
- Δ > 0: y'' − 3y' + 2y = 0 → r² − 3r + 2 = 0 → r = 1, 2 → y = C₁eˣ + C₂e^(2x).
- Δ = 0: y'' − 4y' + 4y = 0 → r² − 4r + 4 = 0 → r = 2 (kép) → y = (C₁ + C₂x)e^(2x).
- Δ < 0: y'' + 4y = 0 → r² + 4 = 0 → r = ±2i → y = C₁cos(2x) + C₂sin(2x).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nghiệm phức lại cho dao động (cos, sin)?"* Vì e^(iβx) = cos βx + i sin βx (Euler, Lesson 06). Nghiệm mũ phức "biến" thành dao động thực. Phần thực α của nghiệm cho biên độ tăng/tắt (e^(αx)).
- *"Vì sao bậc 2 cần 2 hằng số C₁, C₂?"* Vì cần 2 điều kiện đầu (vd y(0) và y'(0)) — như ném vật cần biết vị trí và vận tốc ban đầu.

⚠ **Lỗi thường gặp — dùng nhầm công thức nghiệm khi Δ = 0**. Nghiệm kép KHÔNG phải y = C₁e^(rx) + C₂e^(rx) (gộp thành 1 hằng số, mất nghiệm). Phải có **nhân x**: y = (C₁ + C₂·x)e^(rx). Phản ví dụ: y''−4y'+4y=0, nếu viết y = Ce^(2x) thì chỉ 1 hằng số, không đủ cho bài toán 2 điều kiện đầu.

🔁 **Dừng lại tự kiểm tra**

1. Giải y'' − 5y' + 6y = 0.

<details><summary>Đáp án</summary>

r² − 5r + 6 = 0 → r = 2, 3 (Δ = 1 > 0) → y = **C₁e^(2x) + C₂e^(3x)**.

</details>

### 📝 Tóm tắt mục 4

- Đoán y = e^(rx) → PT đặc trưng r² + ar + b = 0.
- Δ > 0: C₁e^(r₁x)+C₂e^(r₂x); Δ = 0: (C₁+C₂x)e^(rx) (nhớ nhân x); Δ < 0: e^(αx)(C₁cos βx + C₂sin βx) → dao động.
- Bậc 2 → 2 hằng số → cần 2 điều kiện đầu.

---

## 5. Ví dụ — Con lắc đơn (linearized)

💡 **Trực giác / Hình dung**: con lắc nhỏ là TH3 (Δ < 0) điển hình — không có ma sát nên α = 0 (biên độ không tắt), nghiệm thuần dao động cos/sin với tần số ω = √(g/L). Đây là vì sao đồng hồ quả lắc giữ nhịp đều.

```
m·θ'' + (mg/L)·θ = 0  →  θ'' + (g/L)·θ = 0
```

PT đặc trưng: r² + g/L = 0 → r = ±i·√(g/L) = ±iω.

Nghiệm: **θ(t) = C₁·cos(ωt) + C₂·sin(ωt)** = A·cos(ωt + φ).

→ Dao động điều hòa, chu kỳ T = 2π/ω = 2π·√(L/g).

(Đã gặp ở [T3 L08](../../03-Trig-Complex/lesson-08-trig-applications/) — dao động điều hòa.)

---

## 6. Ví dụ — Mạch RC

💡 **Trực giác / Hình dung**: tụ điện nạp như đổ nước vào bình qua ống hẹp — lúc đầu nhanh (chênh lệch lớn), càng đầy càng chậm, tiệm cận giá trị tối đa C·V. "Thời hằng" τ = RC đo tốc độ nạp: sau τ giây nạp được ~63%, sau 5τ coi như đầy.

PT: R·(dq/dt) + q/C = V (nguồn không đổi).

- Đây là tuyến tính bậc 1. Giải: q(t) = C·V·(1 - e^(-t/(RC))).
- → Tụ nạp đến giá trị C·V theo hàm mũ. Thời hằng τ = RC.

**Verify bằng số** (R = 1kΩ, C = 1mF → τ = RC = 1s, V = 5V, q_max = CV = 5mC):
- t = 0: q = 5·(1 − e⁰) = 5·0 = 0 (tụ rỗng ban đầu) ✓.
- t = τ = 1s: q = 5·(1 − e⁻¹) = 5·0.632 = **3.16 mC** (~63%).
- t → ∞: q → 5·(1 − 0) = 5 mC (nạp đầy) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tụ không nạp đầy ngay lập tức?"* Vì điện trở R cản dòng. R lớn → ống hẹp → nạp chậm (τ = RC lớn).
- *"τ = RC có ý nghĩa thực tế gì?"* Là "đồng hồ" của mạch: thiết kế bộ định thời, lọc tín hiệu đều dựa τ. Sau 5τ tụ coi như đầy (>99%).

⚠ **Lỗi thường gặp — nhầm dấu trong hàm mũ nạp/xả**. Nạp: q = CV(1 − e^(−t/τ)) (tăng từ 0). Xả: q = q₀·e^(−t/τ) (giảm về 0). Lẫn 2 công thức → mô tả sai chiều biến thiên.

🔁 **Dừng lại tự kiểm tra**

1. Mạch RC có τ = 2s, V = 10V, C = 1mF. Tính q tại t = 2s.

<details><summary>Đáp án</summary>

q_max = CV = 10 mC. q(2) = 10·(1 − e^(−2/2)) = 10·(1 − e⁻¹) = 10·0.632 = **6.32 mC**.

</details>

### 📝 Tóm tắt mục 6

- Mạch RC = ODE bậc 1 tuyến tính: q(t) = CV(1 − e^(−t/τ)), nạp đầy dần.
- Thời hằng τ = RC: sau τ nạp ~63%, sau 5τ coi như đầy.
- Nạp: (1 − e^(−t/τ)) tăng; xả: e^(−t/τ) giảm — đừng nhầm dấu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Giải y' = 3x².

**Bài 2**: Giải y' = -y với y(0) = 5.

**Bài 3**: Giải y'' + 4y = 0.

**Bài 4**: PT phân rã phóng xạ dN/dt = -λN với chu kỳ bán rã T₁/₂ = 5730 năm (C-14). Tìm λ.

**Bài 5**: Giải y' + y = e^x với y(0) = 1.

### Lời giải

**Bài 1**: y = ∫ 3x² dx = **x³ + C**.

**Bài 2**: dy/y = -dx → ln y = -x + C → y = A·e^(-x). y(0) = A = 5. → **y = 5·e^(-x)**.

**Bài 3**: r² + 4 = 0 → r = ±2i. → **y = C₁·cos(2x) + C₂·sin(2x)**.

**Bài 4**: N(t) = N₀·e^(-λt). N(T₁/₂) = N₀/2 → e^(-λT) = 1/2 → λT = ln 2 → **λ = ln 2 / 5730 ≈ 1.21·10⁻⁴ /năm**.

**Bài 5**: μ = e^x. e^x·y = ∫ e^x·e^x dx = e^(2x)/2 + C → y = e^x/2 + C·e^(-x). y(0) = 1/2 + C = 1 → C = 1/2. → **y = (e^x + e^(-x))/2 = cosh x**.

---

## 8. Bài tiếp theo

[Lesson 08 — Xác suất & thống kê](../lesson-08-probability-statistics/).

## 📝 Tổng kết

1. **ODE**: PT chứa hàm + đạo hàm. Bậc = bậc cao nhất của đạo hàm.
2. **Bậc 1 tách biến**: dy/g(y) = f(x) dx.
3. **Bậc 1 tuyến tính**: dùng thừa số tích phân μ = e^(∫P).
4. **Bậc 2 tuyến tính**: PT đặc trưng r² + ar + b = 0. 3 dạng nghiệm theo Δ.
5. **Ứng dụng**: dao động, phóng xạ, RC, dân số.
