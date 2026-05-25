# Lesson 03 (T3) — Quang sóng (Wave Optics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **giao thoa ánh sáng** — bằng chứng quan trọng nhất rằng ánh sáng là sóng.
- Phân biệt **giao thoa tăng cường** (constructive) và **giao thoa triệt tiêu** (destructive).
- Tính khoảng cách vân sáng/tối trong thí nghiệm **Young hai khe**: Δy = λ·L/d.
- Hiểu **nhiễu xạ** — sóng bị "bẻ" khi qua khe hẹp.
- Hiểu vì sao giao thoa và nhiễu xạ chỉ thấy với λ ~ kích thước khe (quy luật bước sóng so với kích thước).

## Kiến thức tiền đề

- [Lesson 08 (T1) — Sóng cơ](../../01-Mechanics/lesson-08-oscillation-waves/) — biết v = λf.
- [Lesson 08 (T2) — Sóng điện từ](../../02-Thermo-Electromagnetism/lesson-08-em-waves/).

---

## 1. Giao thoa ánh sáng

### 1.1. Khái niệm

**Giao thoa** = hiện tượng 2 sóng kết hợp với nhau → tạo ra vùng **tăng cường** (chỗ sáng hơn) và **triệt tiêu** (chỗ tối).

💡 **Ý nghĩa**: hiện tượng này CHỈ XẢY RA với sóng. Hạt thì không. Nên nếu thấy giao thoa → vật đó là sóng. Thí nghiệm giao thoa của Thomas Young (1801) chứng minh ánh sáng là sóng.

### 1.2. Điều kiện giao thoa

2 sóng **kết hợp** (coherent) = có:
- Cùng tần số (cùng λ).
- Hiệu pha không đổi theo thời gian.

→ Để có giao thoa rõ ràng, 2 sóng phải **từ cùng nguồn** (vd cùng đi qua 2 khe từ 1 đèn).

### 1.3. Tăng cường vs Triệt tiêu

Tại điểm P bất kỳ, hiệu đường đi từ 2 khe đến P = Δl.

- **Δl = n·λ** (n nguyên): 2 sóng cùng pha → **tăng cường** → vân **SÁNG**.
- **Δl = (n + 1/2)·λ**: 2 sóng ngược pha → **triệt tiêu** → vân **TỐI**.

### 📝 Tóm tắt mục 1

- Giao thoa = bằng chứng sóng (Young 1801).
- 2 nguồn kết hợp + hiệu đường = n·λ → sáng; (n+0.5)·λ → tối.

---

## 2. Thí nghiệm Young hai khe

### 2.1. Mô tả

Ánh sáng đơn sắc đi qua **2 khe hẹp** cách nhau d, chiếu lên màn xa L. Trên màn xuất hiện các **vân sáng-tối đan xen**.

### 2.2. Công thức khoảng cách vân

```
Δy = λ · L / d
```

trong đó:
- **Δy** = khoảng cách giữa 2 vân sáng (hoặc 2 vân tối) liên tiếp.
- **λ** = bước sóng ánh sáng.
- **L** = khoảng cách từ khe đến màn.
- **d** = khoảng cách giữa 2 khe.

### 2.3. Ví dụ số

**Ví dụ**: Đèn laser λ = 600 nm = 6 × 10⁻⁷ m. d = 0.2 mm = 2 × 10⁻⁴ m. L = 2 m.
- Δy = 6e-7 · 2 / 2e-4 = **6 × 10⁻³ m = 6 mm**.
- Trên màn cách 2 m, vân sáng cách nhau 6 mm.

### 2.4. Vì sao d phải rất nhỏ?

Nếu d quá lớn → Δy quá nhỏ → vân quá sát nhau, không phân biệt được. Đó là tại sao thí nghiệm Young cần khe rất hẹp (sub-mm).

### 📝 Tóm tắt mục 2

- Young 2 khe: ánh sáng đơn sắc → vân sáng-tối trên màn.
- Δy = λL/d. λ nhỏ → vân sát nhau.

---

## 3. Nhiễu xạ (Diffraction)

### 3.1. Khái niệm

**Nhiễu xạ** = hiện tượng sóng "bẻ" khi đi qua khe hẹp hoặc qua rìa vật cản.

💡 **Ý nghĩa**: ánh sáng không hoàn toàn đi thẳng — khi gặp khe có kích thước ~ λ, nó tỏa ra mọi hướng phía sau khe (gần như nguồn điểm mới).

### 3.2. Quy luật quan trọng — kích thước khe vs bước sóng

- Khe **lớn** hơn λ rất nhiều → ánh sáng đi thẳng (quang hình áp dụng được).
- Khe **gần bằng** λ → nhiễu xạ rõ rệt, ánh sáng "tỏa".
- Khe **nhỏ hơn** λ → ánh sáng phát ra mọi hướng (gần như nguồn điểm).

→ Đó là tại sao ta dễ thấy giao thoa với khe ~ 0.1 mm (lớn hơn λ ánh sáng 100×) nhưng cần điều kiện đặc biệt.

### 3.3. Nhiễu xạ qua khe đơn

Sau khe có chiều rộng a, vân tối đầu tiên ở góc:
```
sin(θ) = λ / a
```

→ Khe **càng hẹp** → ánh sáng càng tỏa rộng (góc lớn). Khe rộng → đi thẳng.

### 3.4. Ví dụ trực giác

**Ví dụ — Sóng nước trong cảng**: sóng đi qua khe giữa 2 đập biển. Khe hẹp (~ λ sóng) → sóng tỏa ra mọi hướng vào trong cảng. Khe rộng → sóng tiếp tục đi thẳng.

**Ví dụ — Sóng âm vòng qua góc**: tiếng nói có λ ~ 1 m → có thể vòng qua góc tòa nhà (rìa = vật cản, nhiễu xạ). Nhưng ánh sáng có λ ~ 500 nm → không vòng qua góc được (a >> λ).

### 📝 Tóm tắt mục 3

- Nhiễu xạ: sóng "bẻ" khi qua khe hoặc rìa.
- Nhiễu xạ rõ khi kích thước khe ~ λ.
- Khe nhỏ → tỏa nhiều; khe lớn → đi thẳng.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Thí nghiệm Young với λ = 500 nm, d = 0.5 mm, L = 1 m. Tính Δy.

**Bài 2**: Trong thí nghiệm Young, khoảng cách 5 vân sáng liên tiếp đo được 4 mm. d = 0.3 mm, L = 1.5 m. Tính λ.

**Bài 3**: Vì sao ta không thấy giao thoa khi bật 2 bóng đèn?

**Bài 4**: Sóng âm tần số 343 Hz đi qua cửa rộng 1 m (λ_âm = 1 m). Có nhiễu xạ rõ không?

**Bài 5**: Vì sao đĩa CD hoặc tem chuột máy tính có cầu vồng khi quan sát?

### Lời giải

**Bài 1**: Δy = 5e-7 · 1 / 5e-4 = **10⁻³ m = 1 mm**.

**Bài 2**: 5 vân sáng = 4 khoảng → 1 Δy = 1 mm. λ = Δy·d/L = 1e-3 · 3e-4 / 1.5 = **2 × 10⁻⁷ m = 200 nm** (UV).

**Bài 3**: 2 bóng đèn KHÔNG là 2 nguồn kết hợp. Pha của ánh sáng từ mỗi bóng thay đổi ngẫu nhiên ~ 10⁹ lần/giây (do dao động electron trong dây). 2 bóng không đồng bộ → hiệu pha luôn đổi → giao thoa "rung lắc" với tốc độ siêu nhanh → mắt thấy trung bình = không có giao thoa. Phải có nguồn LASER (kết hợp) hoặc chia ánh sáng từ 1 nguồn duy nhất qua 2 khe (như Young).

**Bài 4**: λ ≈ kích thước cửa → CÓ nhiễu xạ rõ. Đó là tại sao bạn nghe được giọng nói từ phòng bên dù không nhìn thấy — âm thanh "vòng" qua cửa và rìa.

**Bài 5**: Mặt CD có hàng triệu rãnh siêu nhỏ, cách nhau ~ 1 μm — tương đương λ ánh sáng. Mỗi rãnh phản xạ như 1 nguồn → giao thoa giữa các rãnh → các bước sóng (màu) khác nhau bị phản xạ ở các góc khác nhau → cầu vồng. Tương tự cánh bướm, lông công.

---

## 5. Bài tiếp theo

[Lesson 04 — Photon &amp; Lưỡng tính sóng-hạt](../lesson-04-photon-wave-particle/).

## 📝 Tổng kết

1. **Giao thoa** = bằng chứng ánh sáng là sóng. Cần 2 nguồn kết hợp.
2. **Young 2 khe**: Δy = λL/d.
3. **Nhiễu xạ**: sóng bẻ khi qua khe ~ λ.
4. **Quy luật**: khe << λ → tỏa rộng; khe >> λ → đi thẳng.
