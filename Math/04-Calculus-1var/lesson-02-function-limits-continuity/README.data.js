// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-02-function-limits-continuity/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Giới hạn hàm & Liên tục

## Mục tiêu

- Hiểu **giới hạn hàm số** lim_{x→a} f(x).
- Giới hạn 1 bên (trái, phải) và giới hạn 2 bên.
- Định nghĩa **hàm liên tục** tại 1 điểm và trên 1 khoảng.
- Phân loại điểm gián đoạn.
- Định lý giá trị trung gian (IVT).

## Kiến thức tiền đề

- [Lesson 01 — Giới hạn dãy](../lesson-01-sequences-limits/).

---

## 1. Giới hạn hàm số

💡 **Là gì**: lim_{x→a} f(x) = L có nghĩa **khi x càng gần a, f(x) càng gần L**.

⚠ **Quan trọng**: Giá trị tại x = a **không quan trọng** (có thể f(a) không xác định, hoặc khác L). Chỉ quan tâm "xung quanh a".

**Ví dụ kinh điển**: f(x) = (x² - 1)/(x - 1) khi x → 1.
- Tại x = 1: f(1) = 0/0 = không xác định!
- Nhưng x ≠ 1: f(x) = (x-1)(x+1)/(x-1) = x + 1.
- lim_{x→1} f(x) = 1 + 1 = **2**.

⟶ Giới hạn tồn tại dù f không xác định tại a.

### Định nghĩa hình thức (ε-δ, Cauchy 1820)
\`\`\`
lim_{x→a} f(x) = L
⟺
∀ε > 0, ∃δ > 0, ∀x: 0 < |x - a| < δ ⟹ |f(x) - L| < ε
\`\`\`

💡 Đọc: "Cho dù sai số ε đòi nhỏ thế nào, có khoảng (a-δ, a+δ) (trừ chính a) làm cho f rơi vào khoảng (L-ε, L+ε)".

> 📐 **Định nghĩa đầy đủ — Liên tục tại a**
>
> **(a) Là gì**: Hàm f liên tục tại a khi và chỉ khi **3 điều** đồng thời đúng: (1) f(a) xác định, (2) lim_{x→a} f(x) tồn tại, (3) chúng bằng nhau: lim = f(a). Đồ thị "vẽ được không nhấc bút" qua điểm a.
>
> **(b) Vì sao cần**: Liên tục là điều kiện đảm bảo các tính chất "đẹp" — IVT (PT có nghiệm khi đổi dấu), định lý cực trị (đạt min/max trên đoạn đóng), tích phân được. Hàm liên tục là **vật liệu tốt** của Giải tích. Mọi hàm "tự nhiên" (đa thức, sin, cos, e^x, ln x) đều liên tục trên miền xác định. Gián đoạn là dấu hiệu của "biến động đột ngột" — vd nhiệt độ thay đổi pha (đá → nước), điện áp on/off.
>
> **(c) Ví dụ số**: f(x) = x² liên tục tại 2: f(2) = 4, lim_{x→2} x² = 4, khớp ✓. f(x) = (x²−1)/(x−1) **gián đoạn bỏ được** tại 1: f(1) chưa định nghĩa, nhưng lim = 2 → sửa f(1)=2 thì liên tục. f(x) = 1/x **gián đoạn vô hạn** tại 0: lim trái = -∞, lim phải = +∞. f(x) = ⌊x⌋ (sàn) **gián đoạn nhảy** tại mọi số nguyên: f(2−) = 1, f(2+) = 2.

---

## 2. Giới hạn 1 bên

**Giới hạn trái**: lim_{x→a⁻} f(x) — x tiến a từ phía nhỏ hơn.

**Giới hạn phải**: lim_{x→a⁺} f(x) — x tiến a từ phía lớn hơn.

**Định lý**: Giới hạn 2 bên tồn tại ⟺ 2 giới hạn 1 bên tồn tại và **bằng nhau**.

**Ví dụ**: f(x) = |x|/x. Khi x → 0:
- x < 0: f = -1 → lim trái = -1.
- x > 0: f = 1 → lim phải = 1.
- Khác nhau → **lim 2 bên KHÔNG tồn tại**.

---

## 3. Giới hạn vô hạn / vô cùng

- **lim f(x) = ∞**: f tăng vô hạn khi x → a. VD lim_{x→0} 1/x² = +∞.
- **lim_{x→∞} f(x) = L**: x ra vô cùng, f tiến L. VD lim_{x→∞} 1/x = 0.

---

## 4. Quy tắc tính giới hạn hàm

Tương tự dãy: lim(f+g) = lim f + lim g, ... (khi cả 2 tồn tại).

**Dạng không xác định** (giống dãy): 0/0, ∞/∞, ∞-∞, 0·∞, 1^∞...

### Mẹo giải 0/0

- Phân tích nhân tử (như VD trên).
- Liên hợp (cho căn).
- Sin x/x = 1.

---

## 5. Hàm liên tục

💡 **Trực giác**: Hàm liên tục là hàm "vẽ được không nhấc bút" — không có nhảy, không có lỗ.

**Định nghĩa hình thức**: f liên tục tại a nếu:
\`\`\`
lim_{x→a} f(x) = f(a)
\`\`\`

**3 điều kiện**:
1. f(a) xác định.
2. lim_{x→a} f(x) tồn tại.
3. Bằng nhau: lim = f(a).

⟶ Nếu thiếu 1 trong 3 → **gián đoạn**.

**Ví dụ**: f(x) = x² liên tục tại mọi x ∈ ℝ vì lim_{x→a} x² = a² = f(a).

---

## 6. Phân loại điểm gián đoạn

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Bỏ được** (removable) | lim tồn tại nhưng ≠ f(a) hoặc f(a) chưa định nghĩa | f(x) = (x²-1)/(x-1) tại x=1 |
| **Nhảy** (jump) | lim trái ≠ lim phải, cả 2 hữu hạn | |x|/x tại 0 |
| **Vô hạn** | lim = ±∞ | 1/x tại 0 |

💡 **Bỏ được**: ta có thể "lấp" lỗ bằng cách định nghĩa lại f(a) = lim.

---

## 7. Hàm liên tục cơ bản

Các hàm sau **liên tục trên toàn miền xác định**:
- Đa thức (polynomial).
- Hàm hữu tỉ (P(x)/Q(x)) — liên tục mọi nơi trừ Q = 0.
- Lượng giác (sin, cos liên tục mọi ℝ; tan liên tục trừ π/2 + kπ).
- Mũ a^x.
- Log log_a x (trên (0, ∞)).
- Tổ hợp (cộng, trừ, nhân, chia, hợp) của các hàm liên tục → liên tục.

---

## 8. Định lý giá trị trung gian (IVT)

🎯 **Phát biểu**: Nếu f liên tục trên [a, b] và y_0 là số nằm giữa f(a) và f(b), thì ∃ c ∈ [a, b] sao cho f(c) = y_0.

💡 **Trực giác**: Vẽ đường liền nét từ điểm A đến B, không thể "nhảy qua" giá trị trung gian.

### Hệ quả — Định lý Bolzano

Nếu f liên tục trên [a, b] và f(a)·f(b) < 0 (khác dấu), thì **f(c) = 0 có nghiệm** trong (a, b).

⟶ Dùng để chứng minh PT có nghiệm mà không cần giải.

**Ví dụ**: x³ - x - 1 = 0. Đặt f(x) = x³ - x - 1. f(1) = -1, f(2) = 5. f đổi dấu → có nghiệm trong (1, 2). (Thực tế nghiệm ≈ 1.3247.)

---

## 9. Bài tập

### Bài tập

**Bài 1**: Tính lim_{x→2} (x² - 4)/(x - 2).

**Bài 2**: Tính lim_{x→0} sin(3x)/x.

**Bài 3**: f(x) = (x² - 9)/(x - 3) khi x ≠ 3, f(3) = 5. Hỏi f liên tục tại 3 không?

**Bài 4**: Tính lim_{x→∞} (3x² + 1)/(x² + 5).

**Bài 5**: PT x³ + x - 3 = 0 có nghiệm trong (1, 2) không?

### Lời giải

**Bài 1**: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 → lim = **4**.

**Bài 2**: lim sin(3x)/x = lim 3·sin(3x)/(3x) = 3·1 = **3**.

**Bài 3**: lim_{x→3} (x²-9)/(x-3) = lim (x+3) = 6. Nhưng f(3) = 5 ≠ 6 → **gián đoạn bỏ được** (sửa f(3)=6 thì liên tục).

**Bài 4**: Chia tử mẫu cho x²: (3 + 1/x²)/(1 + 5/x²) → 3/1 = **3**.

**Bài 5**: f liên tục. f(1) = -1, f(2) = 7. f(1)·f(2) < 0 → **có nghiệm** trong (1, 2) (Bolzano).

---

## 10. Bài tiếp theo

[Lesson 03 — Đạo hàm: định nghĩa](../lesson-03-derivative-definition/).

## 📝 Tổng kết

1. **lim_{x→a} f(x) = L**: f xung quanh a càng gần L tùy ý.
2. Giới hạn 2 bên tồn tại ⟺ 2 giới hạn 1 bên = nhau.
3. **Liên tục tại a**: lim = f(a). 3 loại gián đoạn (bỏ được, nhảy, vô hạn).
4. **IVT**: liên tục thì đi qua mọi giá trị trung gian.
5. **Bolzano**: f(a)·f(b) < 0 và liên tục → có nghiệm.
`;
