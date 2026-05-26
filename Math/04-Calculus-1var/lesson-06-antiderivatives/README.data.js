// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-06-antiderivatives/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Nguyên hàm (Antiderivatives)

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

---

## 3. Quy tắc cơ bản

\`\`\`
∫ c·f(x) dx = c·∫ f(x) dx
∫ (f + g) dx = ∫ f dx + ∫ g dx
\`\`\`

⚠ **Không có quy tắc cho tích và thương** (khác đạo hàm). Phải dùng kỹ thuật đổi biến/từng phần.

**Ví dụ**: ∫ (3x² + 2sin x) dx = 3·(x³/3) + 2·(-cos x) + C = **x³ - 2cos x + C**.

---

## 4. Đổi biến — u-substitution

🎯 **Mục đích**: Tìm 1 phần biểu thức là g(x) và đạo hàm của nó cũng có mặt → đặt u = g(x) → đơn giản.

\`\`\`
∫ f(g(x))·g'(x) dx = ∫ f(u) du    (đặt u = g(x), du = g'(x) dx)
\`\`\`

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

---

## 5. Từng phần — Integration by parts

\`\`\`
∫ u dv = u·v - ∫ v du
\`\`\`

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

---

## 6. Các dạng đặc biệt

### 6.1. ∫ 1/(ax+b) dx
\`\`\`
= (1/a)·ln|ax + b| + C
\`\`\`

### 6.2. ∫ 1/(x² + a²) dx
\`\`\`
= (1/a)·arctan(x/a) + C
\`\`\`

### 6.3. ∫ tan x dx
\`\`\`
= -ln|cos x| + C
\`\`\`
(Đổi biến u = cos x, du = -sin x dx).

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
`;
