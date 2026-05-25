// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-08-em-waves/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 (T2) — Sóng điện từ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **sóng điện từ (Electromagnetic wave, EM wave)** là gì — và vì sao chúng tồn tại.
- Biết **tốc độ ánh sáng c** = 3 × 10⁸ m/s, hằng số cơ bản của vũ trụ.
- Hiểu **phổ điện từ**: từ radio (λ lớn) đến tia gamma (λ nhỏ), với ánh sáng nhìn thấy chỉ là 1 dải nhỏ.
- Áp dụng v = λ·f = c cho sóng điện từ trong chân không.
- Biết **Maxwell preview**: 4 phương trình thống nhất điện và từ — dự đoán sóng EM (1865).

## Kiến thức tiền đề

- [Lesson 07 — Từ trường & cảm ứng](../lesson-07-magnetism-induction/).
- [Lesson 08 (T1) — Sóng cơ](../../01-Mechanics/lesson-08-oscillation-waves/).

---

## 1. Maxwell preview — Thống nhất điện và từ

### 1.1. 4 phương trình Maxwell (1865)

James Clerk Maxwell tổng hợp toàn bộ điện-từ vào **4 phương trình**:

1. **Định luật Gauss cho điện**: ∇·E = ρ/ε₀ — điện tích sinh điện trường.
2. **Định luật Gauss cho từ**: ∇·B = 0 — **không có** "từ tích" đơn lẻ (không có monopole).
3. **Định luật Faraday**: ∇×E = −∂B/∂t — từ trường biến đổi sinh điện trường.
4. **Định luật Ampère-Maxwell**: ∇×B = μ₀J + μ₀ε₀∂E/∂t — **điện trường biến đổi sinh từ trường** (Maxwell thêm vào).

### 1.2. Hệ quả vĩ đại — Sóng EM

Maxwell phát hiện: nếu E biến đổi → sinh B biến đổi → sinh E biến đổi → ... một chuỗi tự duy trì lan truyền trong không gian. Đó là **sóng điện từ**.

Hơn nữa, từ phương trình tính ra vận tốc:
\`\`\`
c = 1 / √(μ₀·ε₀) ≈ 3 × 10⁸ m/s
\`\`\`

**Đây chính là tốc độ ánh sáng đo được trong thí nghiệm!** → Ánh sáng = sóng EM. Sự thống nhất hoành tráng nhất vật lý cổ điển.

💡 **Ý nghĩa**: trước Maxwell, điện và từ là 2 hiện tượng riêng. Ánh sáng là... ánh sáng. Sau Maxwell: cả 3 là **cùng 1 thứ** — điện trường và từ trường dao động lan truyền.

### 📝 Tóm tắt mục 1

- 4 phương trình Maxwell thống nhất điện + từ.
- Hệ quả: c = 1/√(μ₀ε₀) = tốc độ ánh sáng → ánh sáng = sóng EM.

---

## 2. Sóng điện từ

### 2.1. Cấu trúc

Sóng EM gồm:
- **Điện trường E** dao động vuông góc chiều truyền.
- **Từ trường B** dao động vuông góc với cả E và chiều truyền.
- Cả 2 đồng pha, biên độ liên hệ: E = c·B.

→ Sóng **ngang** (transverse), không cần môi trường vật chất (lan truyền cả trong chân không).

### 2.2. v = λ·f = c

Trong chân không, mọi sóng EM (radio, ánh sáng, tia X) đều có cùng tốc độ:
\`\`\`
c = λ · f = 2.998 × 10⁸ m/s
\`\`\`

### 2.3. Năng lượng và động lượng

Sóng EM mang năng lượng (qua công thức Poynting) **và** động lượng. Đó là tại sao:
- Ánh sáng Mặt Trời sưởi ấm Trái Đất (năng lượng).
- Áp suất bức xạ — cánh buồm mặt trời hoạt động (động lượng).

### 📝 Tóm tắt mục 2

- Sóng EM: E và B vuông góc nhau và vuông góc chiều truyền.
- v = c = 3·10⁸ m/s trong chân không (không phụ thuộc λ).
- Mang cả năng lượng và động lượng.

---

## 3. Phổ điện từ

Phổ EM trải dài qua **20 bậc 10** về tần số!

| Loại sóng | f (Hz) | λ | Ứng dụng / Đặc điểm |
|-----------|--------|---|----------------------|
| **Radio AM** | 0.5-1.5 × 10⁶ | 200-600 m | Phát thanh AM |
| **Radio FM** | 88-108 × 10⁶ | 2.8-3.4 m | Phát thanh FM, TV cổ |
| **Microwave** | 1-300 × 10⁹ | 1mm-30cm | Lò vi sóng, WiFi, 5G |
| **Hồng ngoại** | 0.3-400 × 10¹² | 0.7μm-1mm | Điều khiển TV, nhiệt cơ thể |
| **Ánh sáng nhìn thấy** | 400-790 × 10¹² | 380-780 nm | Mắt người thấy được |
| **Tử ngoại UV** | 0.79-30 × 10¹⁵ | 10-380 nm | Đèn UV, da rám, vitamin D |
| **Tia X** | 30 × 10¹⁵ - 30 × 10¹⁸ | 0.01-10 nm | Chụp X-quang |
| **Tia Gamma** | > 30 × 10¹⁸ | < 0.01 nm | Phóng xạ, vũ trụ, điều trị ung thư |

### 3.1. Ánh sáng nhìn thấy — chi tiết

Mắt người chỉ "thấy" được dải hẹp: ~ 400-790 THz = 380-780 nm. Trong dải này:

| Màu | λ (nm) | f (THz) |
|-----|--------|---------|
| Tím | 380-450 | 670-790 |
| Xanh dương | 450-490 | 610-670 |
| Lục | 490-570 | 530-610 |
| Vàng | 570-590 | 510-530 |
| Cam | 590-620 | 480-510 |
| Đỏ | 620-780 | 400-480 |

→ "7 màu cầu vồng" thực ra là dải liên tục, mắt nhìn thành từng "vùng màu".

### 3.2. Vì sao mắt người chỉ thấy được dải này?

Vì Mặt Trời phát ra ánh sáng tập trung mạnh nhất ở dải nhìn thấy (do nhiệt độ ~ 5800 K). Tiến hóa "tối ưu" mắt cho dải có ánh sáng nhiều nhất. Côn trùng (ong) thấy được UV, rắn thấy được hồng ngoại — đều hữu ích cho môi trường sống của chúng.

### 📝 Tóm tắt mục 3

- Phổ EM: radio → micro → hồng ngoại → ánh sáng → UV → X → gamma.
- Tất cả cùng v = c.
- Ánh sáng nhìn thấy = dải 380-780 nm (chỉ 1 octave!).

---

## 4. Bài tập

### Bài tập

**Bài 1**: Tính λ của sóng radio FM 100 MHz.

**Bài 2**: Đèn LED đỏ phát λ = 700 nm. Tính f và năng lượng 1 photon (E = h·f, h = 6.63·10⁻³⁴ J·s).

**Bài 3**: Vì sao lò vi sóng làm nóng nước nhưng không làm nóng đĩa sứ?

**Bài 4**: Tia X có f = 10¹⁸ Hz. Tính λ.

**Bài 5**: Vì sao tia gamma từ phóng xạ rất nguy hiểm với DNA?

### Lời giải

**Bài 1**: λ = c/f = 3e8/1e8 = **3 m**. (Đó là tại sao anten radio FM dài ~ 1 m.)

**Bài 2**: f = c/λ = 3e8/7e-7 = 4.29 × 10¹⁴ Hz. E = h·f = 6.63e-34 × 4.29e14 = **2.84 × 10⁻¹⁹ J** = 1.77 eV.

**Bài 3**: Lò vi sóng phát ở tần số ~ 2.45 GHz, λ ≈ 12 cm. Tần số này gần với tần số dao động của phân tử nước (H₂O có moment lưỡng cực). Sóng vi sóng "lắc" các phân tử nước → nhiệt. Đĩa sứ không chứa nước (hoặc rất ít) → không hấp thụ → vẫn lạnh.

**Bài 4**: λ = 3e8/1e18 = 3 × 10⁻¹⁰ m = **0.3 nm**. Đủ nhỏ để xuyên qua mô mềm và bị xương cản → chụp X-quang.

**Bài 5**: Tia gamma có f cực cao → mỗi photon có **năng lượng cực lớn** (E = h·f). Đủ để "phá liên kết" trong phân tử DNA → đột biến gen, ung thư. Đó là tại sao chì che phóng xạ — Pb hấp thụ tia gamma rất tốt.

---

## 5. Kết thúc Tier 2 — Thermo & Electromagnetism

🎉 **HOÀN THÀNH 8/8 LESSON TIER 2!**

Tổng Physics: 16/24 lesson. Còn Tier 3 — Optics & Modern Physics.

[Lesson 01 — Quang hình](../../03-Optics-ModernPhysics/lesson-01-geometric-optics/).

## 📝 Tổng kết

1. **Maxwell** (1865): 4 phương trình thống nhất điện + từ. Dự đoán sóng EM với v = 1/√(μ₀ε₀) = c.
2. **Sóng EM**: E và B dao động vuông góc nhau và vuông góc chiều truyền. Sóng ngang, không cần môi trường.
3. **c = λ·f** trong chân không. Không phụ thuộc λ.
4. **Phổ EM**: 20 bậc 10. Mắt người thấy 1 octave hẹp (380-780 nm).
5. **Năng lượng photon**: E = h·f. Tần số cao = photon "mạnh" → tia gamma nguy hiểm.
`;
