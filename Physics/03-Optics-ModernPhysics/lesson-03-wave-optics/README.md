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

**Định nghĩa đầy đủ — hiệu quang lộ (path difference) Δl**:
- **(a) Là gì**: hiệu KHOẢNG CÁCH (đơn vị độ dài) mà hai sóng đi từ hai nguồn đến cùng một điểm P. `Δl = r₂ − r₁`.
- **(b) Vì sao cần**: vì hai sóng giao thoa tăng cường hay triệt tiêu hoàn toàn quyết định bởi việc chúng tới P CÙNG PHA hay NGƯỢC PHA, mà điều đó phụ thuộc Δl so với λ. Δl gói trọn thông tin "lệch pha" thành một độ dài đo được.
- **(c) Ví dụ số kèm đơn vị**: λ = 500 nm. Nếu `Δl = 1000 nm = 2λ` → số nguyên lần λ → cùng pha → vân SÁNG. Nếu `Δl = 750 nm = 1.5λ` → nửa lẻ → ngược pha → vân TỐI.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 2 bóng đèn thường không cho giao thoa?"* Vì chúng không **kết hợp** (coherent): pha ánh sáng mỗi bóng nhảy ngẫu nhiên hàng tỷ lần/giây, độc lập nhau → vân giao thoa "rung lắc" siêu nhanh → mắt thấy trung bình mờ đều. Phải cùng nguồn (chia qua 2 khe) hoặc laser.
- *"Năng lượng đi đâu ở vân tối?"* Không mất — nó được "dồn" sang vân sáng. Tổng năng lượng bảo toàn; giao thoa chỉ phân bố lại sáng-tối.
- *"Δl = 0 thì sao?"* `Δl = 0 = 0·λ` → cùng pha → vân sáng trung tâm (chính giữa màn).

⚠ **Lỗi thường gặp**

- **Đảo điều kiện sáng/tối.** Vân SÁNG khi `Δl = nλ` (nguyên lần); vân TỐI khi `Δl = (n+½)λ` (nửa lẻ). Nhiều người nhớ ngược.
- **Tưởng cần 2 nguồn vật lý riêng.** Thực tế chỉ cần 1 nguồn kết hợp chia làm hai (2 khe) — đó mới đảm bảo hiệu pha cố định.

🔁 **Dừng lại tự kiểm tra**

1. λ = 600 nm. Tại điểm P, hiệu quang lộ Δl = 1500 nm. Vân sáng hay tối?
2. Tại điểm Q, Δl = 1800 nm. Vân gì?

<details><summary>Đáp án</summary>

1. `Δl/λ = 1500/600 = 2.5 = (2 + ½)` → nửa lẻ → ngược pha → vân **TỐI**.
2. `1800/600 = 3` → nguyên lần → cùng pha → vân **SÁNG**.

</details>

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

💡 **Trực giác**: `Δy = λL/d` — ba cách "kéo giãn" vân cho dễ thấy: tăng λ (ánh sáng đỏ vân thưa hơn xanh), tăng L (màn xa hơn), hoặc giảm d (khe sát nhau hơn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi sang ánh sáng đỏ thì vân thưa hay dày hơn?"* Đỏ có λ lớn hơn xanh → Δy lớn hơn → vân **thưa** hơn (cách xa nhau hơn).
- *"Vì sao cần ánh sáng đơn sắc?"* Ánh sáng trắng = nhiều λ, mỗi λ cho hệ vân với Δy khác nhau → các vân chồng lên nhau, nhòe màu, khó đo. Đơn sắc (1 λ) cho vân sắc nét.
- *"Δy đo giữa 2 vân sáng hay vân sáng-tối?"* Giữa 2 vân SÁNG liên tiếp (hoặc 2 vân tối liên tiếp). Vân sáng và vân tối kề nhau cách `Δy/2`.

⚠ **Lỗi thường gặp**

- **Quên đổi đơn vị về mét.** d thường cho bằng mm (×10⁻³), λ bằng nm (×10⁻⁹). Trộn đơn vị → sai cả triệu lần. Luôn đưa hết về mét trước khi thay số.
- **Lẫn d và L.** d = khoảng cách GIỮA 2 KHE (rất nhỏ, sub-mm); L = khoảng cách KHE-MÀN (lớn, ~m). Đặt nhầm → kết quả vô lý.
- **Đếm sai số khoảng.** "5 vân sáng liên tiếp" tạo ra **4 khoảng** Δy, không phải 5. Chia tổng độ dài cho 4.

🔁 **Dừng lại tự kiểm tra**

1. λ = 400 nm, d = 0.1 mm, L = 1.5 m. Tính Δy.
2. Đo được 6 vân sáng liên tiếp trải dài 10 mm. Mỗi Δy bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. `Δy = (4×10⁻⁷ × 1.5)/(1×10⁻⁴) = 6×10⁻⁷/10⁻⁴ = 6×10⁻³ m = 6 mm`.
2. 6 vân = **5 khoảng** → `Δy = 10 mm / 5 = 2 mm`.

</details>

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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nhiễu xạ và giao thoa khác nhau thế nào?"* Cùng bản chất (chồng chất sóng). "Nhiễu xạ" nhấn mạnh sóng tỏa ra sau MỘT khe/rìa; "giao thoa" nhấn mạnh sự kết hợp của nhiều sóng (vd 2 khe). Vân Young thực ra là giao thoa của hai sóng đã nhiễu xạ.
- *"Vì sao nghe được người nói sau góc tường nhưng không nhìn thấy họ?"* Vì λ âm (~1 m) cỡ kích thước góc tường → âm nhiễu xạ vòng qua. λ ánh sáng (~500 nm) quá nhỏ so với góc tường → đi gần như thẳng, không vòng → không thấy.
- *"Khe rộng ra thì chùm sáng sau khe rộng hay hẹp?"* Khe RỘNG → góc tỏa NHỎ (`sinθ = λ/a`, a lớn thì θ nhỏ) → chùm gần như đi thẳng. Khe hẹp → tỏa rộng.

⚠ **Lỗi thường gặp**

- **Tưởng khe càng rộng càng tỏa nhiều.** Ngược lại: khe HẸP tỏa rộng (góc lớn). `sinθ = λ/a` — a nhỏ thì θ lớn.
- **Nghĩ ánh sáng "luôn đi thẳng tuyệt đối".** Đó chỉ là xấp xỉ quang hình, đúng khi khe/vật cản >> λ. Khi kích thước ~ λ thì nhiễu xạ rõ.

🔁 **Dừng lại tự kiểm tra**

1. Ánh sáng λ = 500 nm qua khe rộng a = 1 μm. Tính góc tới vân tối đầu tiên.
2. Vì sao radio (λ ~ vài trăm m) thu được tín hiệu dù có núi/nhà che, còn ánh sáng thì không "vòng" qua được?

<details><summary>Đáp án</summary>

1. `sinθ = λ/a = (500×10⁻⁹)/(1×10⁻⁶) = 0.5 → θ = 30°`. Khe cỡ 2λ → tỏa khá rộng.
2. λ sóng radio cỡ hàng chục–trăm mét, tương đương hoặc lớn hơn kích thước núi/nhà → nhiễu xạ vòng qua dễ. λ ánh sáng (~500 nm) bé hơn vật cản hàng triệu lần → không nhiễu xạ đáng kể → đi thẳng, bị chặn.

</details>

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
