// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-03-trig-identities/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đồng nhất thức lượng giác

## Mục tiêu

- Thuộc và áp dụng được các công thức **cộng, trừ, nhân đôi, hạ bậc**.
- Biến đổi tích thành tổng và ngược lại.
- Biến **a·sin x + b·cos x** thành dạng **R·sin(x + φ)**.

## Kiến thức tiền đề

- [Lesson 02 — sin, cos, tan](../lesson-02-sin-cos-tan/).

---

## 1. Đồng nhất thức cơ bản

### 1.1. Pythagore lượng giác

\`\`\`
sin²x + cos²x = 1
\`\`\`

Suy ra:
- 1 + tan²x = 1/cos²x (chia 2 vế cho cos²x).
- 1 + cot²x = 1/sin²x.

💡 **Vì sao đúng?** Vì điểm (cos x, sin x) nằm trên đường tròn bán kính 1, theo Pythagore khoảng cách² = 1.

### 1.2. Tính chẵn lẻ

- sin(-x) = -sin x (lẻ).
- cos(-x) = cos x (chẵn).
- tan(-x) = -tan x (lẻ).

### 1.3. Tính tuần hoàn

- sin(x + 2π) = sin x.
- cos(x + 2π) = cos x.
- tan(x + π) = tan x.

### 1.4. Quan hệ bù, phụ

- sin(π - x) = sin x. (góc bù → sin bằng nhau)
- cos(π - x) = -cos x.
- sin(π/2 - x) = cos x. (góc phụ → sin = cos đối)
- cos(π/2 - x) = sin x.

---

## 2. Công thức cộng (Sum formulas)

\`\`\`
sin(a + b) = sin a · cos b + cos a · sin b
sin(a - b) = sin a · cos b - cos a · sin b
cos(a + b) = cos a · cos b - sin a · sin b
cos(a - b) = cos a · cos b + sin a · sin b
tan(a + b) = (tan a + tan b) / (1 - tan a · tan b)
\`\`\`

💡 **Mẹo nhớ sin**: "sin cùng cos chéo cộng" (sa.cb + ca.sb), với cos thì "cos cùng trừ sin chéo".

**Ví dụ số**: tính sin 75°.
- 75 = 45 + 30.
- sin 75° = sin 45·cos 30 + cos 45·sin 30 = (√2/2)·(√3/2) + (√2/2)·(1/2) = √6/4 + √2/4 = **(√6+√2)/4**.

> 📐 **Định nghĩa đầy đủ — Công thức cộng**
>
> **(a) Là gì**: 5 đồng nhất thức biểu diễn sin/cos/tan của (a+b) qua sin/cos/tan của a và b riêng. KHÔNG đơn giản như sin(a+b) = sin a + sin b (= SAI) — phải có "cross terms".
>
> **(b) Vì sao cần**: Vì cho phép tính sin/cos của góc bất kỳ qua các góc đã biết (30°, 45°, 60°...). Đây là nền tảng để **suy ra mọi công thức** lượng giác khác: nhân đôi (cho b = a), hạ bậc, biến tích thành tổng, v.v. Trong vật lý: cộng 2 dao động cùng tần số → 1 dao động kết quả (giao thoa sóng). Trong đồ hoạ: nối 2 phép quay = 1 phép quay với góc tổng.
>
> **(c) Ví dụ số**: sin 75° = sin(45+30) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6+√2)/4 ≈ **0.9659**. Kiểm tra máy tính sin 75° ≈ 0.9659 ✓. cos 75° = cos 45·cos 30 − sin 45·sin 30 = (√2/2)(√3/2) − (√2/2)(1/2) = (√6−√2)/4 ≈ 0.2588. cos(60°−30°) = cos 30° = √3/2 ≈ 0.866. Verify: cos 60·cos 30 + sin 60·sin 30 = (1/2)(√3/2) + (√3/2)(1/2) = √3/4 + √3/4 = √3/2 ✓.

---

## 3. Công thức nhân đôi

Thay b = a vào công thức cộng:

\`\`\`
sin 2a = 2·sin a · cos a
cos 2a = cos²a - sin²a = 2·cos²a - 1 = 1 - 2·sin²a
tan 2a = 2·tan a / (1 - tan²a)
\`\`\`

**Ví dụ**: sin 60° = sin(2·30°) = 2·sin 30°·cos 30° = 2·(1/2)·(√3/2) = √3/2 ✓.

---

## 4. Công thức hạ bậc

Đảo lại từ cos 2a:
\`\`\`
sin²a = (1 - cos 2a) / 2
cos²a = (1 + cos 2a) / 2
tan²a = (1 - cos 2a) / (1 + cos 2a)
\`\`\`

⟶ **Cực hữu ích** khi tích phân (tránh bình phương).

**Ví dụ**: ∫ sin²x dx = ∫ (1 - cos 2x)/2 dx = x/2 - sin(2x)/4 + C.

---

## 5. Biến tích thành tổng

\`\`\`
sin a · cos b = ½[sin(a+b) + sin(a-b)]
cos a · cos b = ½[cos(a-b) + cos(a+b)]
sin a · sin b = ½[cos(a-b) - cos(a+b)]
\`\`\`

⟶ Dùng để **tích phân** sản phẩm sin/cos, hoặc giải PT.

---

## 6. Biến tổng thành tích

\`\`\`
sin a + sin b = 2·sin((a+b)/2)·cos((a-b)/2)
sin a - sin b = 2·cos((a+b)/2)·sin((a-b)/2)
cos a + cos b = 2·cos((a+b)/2)·cos((a-b)/2)
cos a - cos b = -2·sin((a+b)/2)·sin((a-b)/2)
\`\`\`

⟶ Dùng để **giải PT** (đưa về dạng tích = 0).

---

## 7. a·sin x + b·cos x = R·sin(x + φ)

**Quan trọng cho dao động, sóng**.

\`\`\`
a·sin x + b·cos x = R·sin(x + φ)
\`\`\`
trong đó:
- R = √(a² + b²) (biên độ tổng hợp).
- tan φ = b/a (pha).

💡 **Trực giác**: 2 dao động cùng tần số (sin x và cos x = sin(x + π/2)) cộng lại = 1 dao động cùng tần số, biên độ R, pha φ.

**Ví dụ**: 3·sin x + 4·cos x = R·sin(x + φ).
- R = √(9 + 16) = 5.
- tan φ = 4/3 → φ ≈ 53.13° ≈ 0.927 rad.
- → 5·sin(x + 0.927).

⟶ **Biên độ thay đổi từ ban đầu 3 hoặc 4 lên 5**.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính cos 75° dùng công thức cộng.

**Bài 2**: Đơn giản (sin x + cos x)².

**Bài 3**: Biểu diễn cos 2x theo sin x, theo cos x.

**Bài 4**: Tính ∫₀^π sin²x dx.

**Bài 5**: Biến đổi √3·sin x + cos x sang dạng R·sin(x + φ).

### Lời giải

**Bài 1**: cos 75° = cos(45+30) = cos 45·cos 30 - sin 45·sin 30 = (√2/2)(√3/2) - (√2/2)(1/2) = **(√6 - √2)/4**.

**Bài 2**: (sin x + cos x)² = sin²x + 2·sin x·cos x + cos²x = **1 + sin 2x**.

**Bài 3**:  
- cos 2x = 1 - 2sin²x.  
- cos 2x = 2cos²x - 1.

**Bài 4**: ∫₀^π sin²x dx = ∫₀^π (1 - cos 2x)/2 dx = [x/2 - sin(2x)/4]₀^π = π/2 - 0 - 0 + 0 = **π/2**.

**Bài 5**: R = √(3 + 1) = **2**. tan φ = 1/√3 → φ = π/6. → **2·sin(x + π/6)**.

---

## 9. Bài tiếp theo

[Lesson 04 — Phương trình lượng giác](../lesson-04-trig-equations/).

## 📝 Tổng kết

1. **sin²+cos² = 1**, công thức cộng, nhân đôi, hạ bậc.
2. **Hạ bậc**: sin²x = (1-cos 2x)/2, cos²x = (1+cos 2x)/2 — dùng để tích phân.
3. **Tích ↔ tổng**: cho giải PT.
4. **a·sin x + b·cos x = √(a²+b²)·sin(x + φ)** — tổng hợp dao động.
`;
