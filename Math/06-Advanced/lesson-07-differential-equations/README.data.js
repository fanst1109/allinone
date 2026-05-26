// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/06-Advanced/lesson-07-differential-equations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Phương trình vi phân (ODE)

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

---

## 2. ODE bậc 1 — Tách biến (Separable)

Dạng:
\`\`\`
dy/dx = f(x) · g(y)
\`\`\`

**Cách giải**: tách 2 vế:
\`\`\`
dy/g(y) = f(x) dx
\`\`\`

Tích phân 2 vế.

**Ví dụ 1**: dy/dx = -2x·y.
- dy/y = -2x dx.
- ∫ dy/y = -∫ 2x dx → ln|y| = -x² + C.
- → **y = A·e^(-x²)** (A = e^C).

**Ví dụ 2 — Tăng trưởng dân số**: dN/dt = k·N.
- dN/N = k dt → ln|N| = kt + C → **N(t) = N₀·e^(kt)**.

→ Tăng trưởng cấp số nhân. Nếu k > 0 (sinh nhiều hơn chết) thì bùng nổ.

---

## 3. ODE bậc 1 tuyến tính

Dạng:
\`\`\`
y' + P(x)·y = Q(x)
\`\`\`

**Phương pháp thừa số tích phân**: nhân 2 vế với μ(x) = e^(∫P(x) dx):
\`\`\`
(μ·y)' = μ·Q
μ·y = ∫ μ·Q dx
y = (1/μ) · ∫ μ·Q dx
\`\`\`

**Ví dụ**: y' + 2y = 4.
- P = 2, Q = 4. μ = e^(2x).
- e^(2x)·y = ∫ 4·e^(2x) dx = 2·e^(2x) + C.
- → **y = 2 + C·e^(-2x)**.

Khi t → ∞: y → 2 (cân bằng).

---

## 4. ODE bậc 2 tuyến tính hệ số hằng

\`\`\`
y'' + a·y' + b·y = 0
\`\`\`

(Thuần nhất — vế phải = 0.)

**Phương pháp**: tìm nghiệm dạng y = e^(rx). Thay vào → **PT đặc trưng**:
\`\`\`
r² + a·r + b = 0
\`\`\`

3 trường hợp theo Δ = a² - 4b:

### TH1: Δ > 0 — 2 nghiệm thực r₁, r₂
\`\`\`
y = C₁·e^(r₁x) + C₂·e^(r₂x)
\`\`\`

### TH2: Δ = 0 — nghiệm kép r
\`\`\`
y = (C₁ + C₂·x)·e^(rx)
\`\`\`

### TH3: Δ < 0 — 2 nghiệm phức α ± βi
\`\`\`
y = e^(αx)·(C₁·cos(βx) + C₂·sin(βx))
\`\`\`

→ **Dao động**.

---

## 5. Ví dụ — Con lắc đơn (linearized)

\`\`\`
m·θ'' + (mg/L)·θ = 0  →  θ'' + (g/L)·θ = 0
\`\`\`

PT đặc trưng: r² + g/L = 0 → r = ±i·√(g/L) = ±iω.

Nghiệm: **θ(t) = C₁·cos(ωt) + C₂·sin(ωt)** = A·cos(ωt + φ).

→ Dao động điều hòa, chu kỳ T = 2π/ω = 2π·√(L/g).

(Đã gặp ở [T3 L08](../../03-Trig-Complex/lesson-08-trig-applications/) — dao động điều hòa.)

---

## 6. Ví dụ — Mạch RC

PT: R·(dq/dt) + q/C = V (nguồn không đổi).

- Đây là tuyến tính bậc 1. Giải: q(t) = C·V·(1 - e^(-t/(RC))).
- → Tụ nạp đến giá trị C·V theo hàm mũ. Thời hằng τ = RC.

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
`;
