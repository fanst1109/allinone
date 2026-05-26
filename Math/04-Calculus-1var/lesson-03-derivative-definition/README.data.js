// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-03-derivative-definition/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đạo hàm: Định nghĩa & ý nghĩa hình học

## Mục tiêu

- Hiểu **đạo hàm** là gì qua 2 hình ảnh: **vận tốc tức thời** và **slope tiếp tuyến**.
- Định nghĩa hình thức bằng giới hạn.
- Tính đạo hàm bằng định nghĩa cho vài hàm cơ bản.
- Hiểu sự khác biệt: f khả vi ⟹ f liên tục (nhưng ngược lại không đúng).

## Kiến thức tiền đề

- [Lesson 02 — Giới hạn hàm](../lesson-02-function-limits-continuity/).

---

## 1. Đạo hàm là gì — 2 hình ảnh trực giác

### 1.1. Hình ảnh "vận tốc tức thời" (động lực học)

Một vật chuyển động: vị trí s(t) tại thời điểm t. Vận tốc trung bình từ t đến t+Δt:
\`\`\`
v_tb = [s(t+Δt) - s(t)] / Δt
\`\`\`

⟶ Khi Δt → 0, ta được **vận tốc tức thời** tại thời điểm t.

\`\`\`
v(t) = lim_{Δt→0} [s(t+Δt) - s(t)] / Δt = s'(t)
\`\`\`

### 1.2. Hình ảnh "slope tiếp tuyến" (hình học)

Trên đồ thị y = f(x):
- Chọn 2 điểm A(x, f(x)) và B(x+h, f(x+h)).
- Đường thẳng AB có hệ số góc **[f(x+h) - f(x)] / h** (= cát tuyến).
- Khi h → 0, B trượt về A → cát tuyến trở thành **tiếp tuyến**.
- Hệ số góc tiếp tuyến = **f'(x)**.

💡 **Cả 2 hình ảnh dẫn đến cùng 1 định nghĩa**: đạo hàm.

---

## 2. Định nghĩa hình thức

\`\`\`
f'(x) = lim_{h→0} [f(x+h) - f(x)] / h
\`\`\`

Cách viết khác (kế Leibniz):
\`\`\`
df/dx = lim_{Δx→0} Δy/Δx
\`\`\`

**Ý nghĩa hình học**: f'(a) = slope tiếp tuyến với đồ thị y = f(x) tại điểm (a, f(a)).

**Phương trình tiếp tuyến tại (a, f(a))**:
\`\`\`
y = f(a) + f'(a)·(x - a)
\`\`\`

> 📐 **Định nghĩa đầy đủ — Đạo hàm f'(x)**
>
> **(a) Là gì**: Giới hạn của tỉ số "biến thiên hàm/biến thiên biến" khi biến biến thiên → 0. Đo "tốc độ tức thời f thay đổi khi x thay đổi" tại đúng 1 điểm. Hình học = slope tiếp tuyến. Vật lý = vận tốc tức thời (nếu x = thời gian, f = vị trí).
>
> **(b) Vì sao cần**: Trước Newton/Leibniz (~1670), không có cách nói chính xác "vận tốc tại 1 thời điểm" (cần khoảng thời gian Δt để chia khoảng cách, nhưng Δt = 0 thì chia 0 vô nghĩa). Giới hạn lim h→0 giải quyết — cho ra 1 số duy nhất khi h tiến 0 đúng cách. Đạo hàm trở thành công cụ trung tâm: tối ưu hoá (f' = 0 tại cực trị), mô hình hoá (ODE), xấp xỉ (Taylor), ML (gradient descent).
>
> **(c) Ví dụ số**: f(x) = x², tại x = 3. Tỉ số = [(3+h)² − 9]/h = (6h+h²)/h = 6+h. Cho h → 0 → **f'(3) = 6**. Verify công thức (x²)' = 2x → 2·3 = 6 ✓. f(x) = x³ tại x = 2: f'(2) = 3·4 = 12. f(x) = 1/x tại x = 2: f'(2) = −1/4 = −0.25. Hàm hằng f(x) = 5: f'(x) = 0 ∀x (slope tiếp tuyến của đường ngang = 0). f(x) = |x| tại x = 0: **không tồn tại** (slope trái = −1, slope phải = +1).

---

## 3. Tính đạo hàm bằng định nghĩa

### 3.1. f(x) = x² (ví dụ kinh điển)

\`\`\`
f'(x) = lim_{h→0} [(x+h)² - x²] / h
      = lim_{h→0} [x² + 2xh + h² - x²] / h
      = lim_{h→0} [2xh + h²] / h
      = lim_{h→0} (2x + h)
      = 2x
\`\`\`

⟶ **(x²)' = 2x**.

### 3.2. f(x) = 1/x

\`\`\`
f'(x) = lim [(1/(x+h)) - (1/x)] / h
      = lim [(x - (x+h)) / (x(x+h))] / h
      = lim [-h / (x(x+h))] / h
      = lim [-1 / (x(x+h))]
      = -1/x²
\`\`\`

⟶ **(1/x)' = -1/x²**.

### 3.3. f(x) = √x

\`\`\`
f'(x) = lim [√(x+h) - √x] / h
      = lim [(√(x+h) - √x)(√(x+h) + √x)] / [h(√(x+h) + √x)]
      = lim [h / (h(√(x+h) + √x))]
      = lim [1 / (√(x+h) + √x)]
      = 1/(2√x)
\`\`\`

⟶ **(√x)' = 1/(2√x)**.

### 3.4. f(x) = sin x

Dùng đồng nhất thức sin(x+h) - sin x = 2·cos(x+h/2)·sin(h/2) và lim sin(h/2)/(h/2) = 1:
\`\`\`
f'(x) = lim [sin(x+h) - sin x] / h
      = lim [2·cos(x+h/2)·sin(h/2)] / h
      = lim cos(x+h/2) · [sin(h/2) / (h/2)]
      = cos(x) · 1 = cos x
\`\`\`

⟶ **(sin x)' = cos x**.

---

## 4. Ký hiệu khác nhau cho đạo hàm

- **Newton**: f'(x), y'.
- **Leibniz**: df/dx, dy/dx — "tỉ số vi phân".
- **Lagrange cấp cao**: f''(x), f'''(x), f^(n)(x).
- **Leibniz cấp cao**: d²y/dx², d^n y/dx^n.

💡 **Khi nào dùng cái nào**:
- f'(x): nhanh, gọn (thường dùng).
- dy/dx: nhấn mạnh đạo hàm theo BIẾN nào (quan trọng khi nhiều biến).

---

## 5. Khả vi & Liên tục

**Định lý**: Nếu f khả vi tại a (f'(a) tồn tại) thì f liên tục tại a.

**Chiều ngược KHÔNG đúng**: f liên tục không nhất thiết khả vi.

**Ví dụ**: f(x) = |x| liên tục tại 0 nhưng KHÔNG khả vi.
- lim trái: f'(0⁻) = -1.
- lim phải: f'(0⁺) = 1.
- Khác nhau → f'(0) không tồn tại (góc "nhọn" tại x=0).

💡 **Tóm tắt**:
- Khả vi ⟹ Liên tục.
- Liên tục ⇏ Khả vi (đồ thị có "góc nhọn").

⚠ **Cực đoan**: Hàm Weierstrass — liên tục mọi nơi nhưng không khả vi tại bất kỳ điểm nào!

---

## 6. Đạo hàm 1 bên

Tương tự giới hạn 1 bên:
\`\`\`
f'(a⁻) = lim_{h→0⁻} [f(a+h) - f(a)] / h
f'(a⁺) = lim_{h→0⁺} [f(a+h) - f(a)] / h
\`\`\`

f khả vi tại a ⟺ f'(a⁻) = f'(a⁺).

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính đạo hàm của f(x) = 3x² + 1 bằng định nghĩa.

**Bài 2**: Tính f'(x) của f(x) = cos x bằng định nghĩa.

**Bài 3**: Viết PT tiếp tuyến của y = x² tại điểm (3, 9).

**Bài 4**: f(x) = |x-2|. Hỏi f khả vi tại x = 2 không?

**Bài 5**: Vận tốc s(t) = 5t² (m, s). Tìm vận tốc tại t = 3.

### Lời giải

**Bài 1**: f(x+h) - f(x) = 3(x+h)² + 1 - 3x² - 1 = 6xh + 3h². → f' = lim (6x + 3h) = **6x**.

**Bài 2**: cos(x+h) - cos x = -2·sin(x+h/2)·sin(h/2). → f' = lim [-sin(x+h/2)·sin(h/2)/(h/2)] = **-sin x**.

**Bài 3**: f'(x) = 2x → f'(3) = 6. PT: y = 9 + 6(x-3) = **6x - 9**.

**Bài 4**: x < 2: f = -(x-2), f' = -1. x > 2: f = x-2, f' = 1. Khác → **không khả vi** tại x=2.

**Bài 5**: v(t) = s'(t) = 10t → v(3) = **30 m/s**.

---

## 8. Bài tiếp theo

[Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

## 📝 Tổng kết

1. **f'(x) = lim_{h→0} [f(x+h) - f(x)]/h** — slope tiếp tuyến = vận tốc tức thời.
2. PT tiếp tuyến tại (a, f(a)): **y = f(a) + f'(a)·(x - a)**.
3. **Khả vi ⟹ Liên tục**, không ngược.
4. Hàm |x| liên tục tại 0, **không khả vi** (góc nhọn).
5. Đạo hàm cơ bản: **(x²)' = 2x, (√x)' = 1/(2√x), (sin x)' = cos x, (1/x)' = -1/x²**.
`;
