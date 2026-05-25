# Lesson 07 — Hàm số

## Mục tiêu

- Hiểu **hàm số** là gì — gán mỗi input một output duy nhất.
- Biết các khái niệm: **tập xác định (domain)**, **tập giá trị (range)**, **hàm hợp**.
- Đọc và vẽ **đồ thị** hàm số.
- Phân biệt hàm **đơn ánh**, **toàn ánh**, **song ánh**.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Hàm số

### 1.1. Định nghĩa

**Hàm số** = quy tắc gán **mỗi giá trị x trong tập A** với **đúng MỘT giá trị y trong tập B**.

Viết: `f: A → B`, `y = f(x)`.

💡 **Là gì**: hàm số như một "cái máy" — bỏ input x vào → ra output y duy nhất.

**Vì sao quan trọng?** Vì:
- Hàm số mô hình hóa **mọi quan hệ** trong khoa học: lực phụ thuộc khối lượng, tốc độ phụ thuộc thời gian...
- Là **đối tượng nghiên cứu chính** của giải tích (đạo hàm, tích phân của hàm).
- Là **building block** của lập trình.

### 1.2. Các khái niệm

- **Tập xác định D (domain)**: tập các x mà f(x) có nghĩa.
- **Tập giá trị E (range)**: tập các y có thể nhận được.
- Vd `f(x) = √x`: D = [0, +∞), E = [0, +∞).
- Vd `g(x) = 1/x`: D = ℝ\{0}, E = ℝ\{0}.

### 1.3. Hàm hợp

**(f∘g)(x) = f(g(x))**: áp dụng g trước, rồi f.

Ví dụ: f(x) = x², g(x) = x + 1. 
- (f∘g)(x) = f(g(x)) = (x+1)².
- (g∘f)(x) = g(f(x)) = x² + 1.

Lưu ý: **f∘g ≠ g∘f** thường.

---

## 2. Đồ thị hàm số

### 2.1. Khái niệm

**Đồ thị f** = tập các điểm (x, f(x)) trên mặt phẳng Oxy.

💡 **Là gì**: cách "vẽ" hàm số để thấy hành vi.

### 2.2. Test đường thẳng đứng

Một đường cong trên mặt phẳng là đồ thị của 1 hàm số ⟺ **mọi đường thẳng đứng cắt nó tại tối đa 1 điểm**.

- Đường thẳng y = x: hàm. ✓
- Parabol y = x²: hàm. ✓
- Đường tròn x² + y² = 1: KHÔNG phải hàm (vì 1 x có thể cho 2 y).

---

## 3. Đơn / Toàn / Song ánh

- **Đơn ánh (injective)**: mọi x khác nhau → y khác nhau. (Không có 2 input cho cùng output.)
- **Toàn ánh (surjective)**: mọi y trong tập đích đều đạt được.
- **Song ánh (bijective)**: vừa đơn vừa toàn → có **hàm ngược** f⁻¹.

Ví dụ:
- f(x) = x²: KHÔNG đơn ánh (vì f(2) = f(−2) = 4).
- f(x) = x³: song ánh.
- f(x) = eˣ (từ ℝ → (0,∞)): song ánh, hàm ngược là ln(x).

---

## 4. Bài tập

### Bài tập

**Bài 1**: Tìm tập xác định:
a) f(x) = √(x − 3).
b) g(x) = 1/(x² − 4).

**Bài 2**: Cho f(x) = 2x + 1, g(x) = x². Tính (f∘g)(2) và (g∘f)(2).

**Bài 3**: y = x³ có là hàm số không? Vẽ phác họa.

**Bài 4**: Đường tròn x² + y² = 4 có là hàm số y = f(x) không?

**Bài 5**: f(x) = 3x − 5. Tính hàm ngược f⁻¹(x).

### Lời giải

**Bài 1**: 
a) x − 3 ≥ 0 → **D = [3, +∞)**.
b) x² ≠ 4 → x ≠ ±2 → **D = ℝ \ {−2, 2}**.

**Bài 2**: 
- g(2) = 4. f(4) = 9. → (f∘g)(2) = 9.
- f(2) = 5. g(5) = 25. → (g∘f)(2) = 25.

**Bài 3**: y = x³ là hàm số (mỗi x cho 1 y). Đồ thị S-shape qua O, đối xứng qua O.

**Bài 4**: Đường tròn x = 0, y = ±2 → 1 x cho 2 y → KHÔNG phải hàm. Phải tách: y = √(4−x²) hoặc y = −√(4−x²).

**Bài 5**: y = 3x − 5 → x = (y+5)/3 → **f⁻¹(x) = (x + 5)/3**. Kiểm tra: f(f⁻¹(x)) = 3·(x+5)/3 − 5 = x + 5 − 5 = x ✓.

---

## 5. Bài tiếp theo

[Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

## 📝 Tổng kết

1. **Hàm số**: mỗi x ↔ 1 y duy nhất.
2. **D (domain)** = tập x. **E (range)** = tập y.
3. **Hàm hợp**: (f∘g)(x) = f(g(x)). Thường f∘g ≠ g∘f.
4. **Test đường thẳng đứng** để kiểm tra là hàm.
5. **Song ánh** ⟺ có hàm ngược f⁻¹.
