// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-06-nucleus-radioactivity/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 (T3) — Hạt nhân & Phóng xạ

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu cấu trúc **hạt nhân** và khái niệm **năng lượng liên kết**.
- Phân biệt 3 loại phóng xạ: **α (alpha)**, **β (beta)**, **γ (gamma)**.
- Tính **chu kỳ bán rã t½** và lượng chất phóng xạ còn lại theo thời gian.
- Hiểu **hiệu ứng phân rã** và ứng dụng (C-14 dating, y tế).
- Biết cảnh báo an toàn phóng xạ.

## Kiến thức tiền đề

- [Lesson 01 Chemistry — Cấu trúc nguyên tử](../../../Chemistry/01-Structure/lesson-01-atom-structure/) — biết đồng vị.

---

## 1. Hạt nhân

### 1.1. Cấu trúc

Hạt nhân = Z proton + N neutron, kích thước ~ 10⁻¹⁵ m (femtomet, gấp 100,000 lần nhỏ hơn nguyên tử).

**Lực hạt nhân mạnh** giữ p và n lại với nhau, mạnh hơn lực đẩy điện giữa các proton. Chỉ tác dụng ở cự ly rất ngắn.

### 1.2. Năng lượng liên kết — E = mc²

**Quan sát kỳ lạ**: khối lượng hạt nhân < tổng khối lượng các nucleon riêng lẻ.

Ví dụ — He-4 (2p + 2n):
- m(2p) + m(2n) = 2(1.007276) + 2(1.008665) = 4.0319 u.
- m(He-4) đo được = 4.0026 u.
- **Hụt khối** Δm = 0.0293 u.

Phần "hụt khối" này biến thành **năng lượng liên kết** theo Einstein E = mc²:
- E_liên_kết = 0.0293 · 931.5 MeV/u = **27.3 MeV** (931.5 = c² trong đơn vị MeV/u).

→ Cần 27.3 MeV để "tách" He-4 thành 2p + 2n.

### 📝 Tóm tắt mục 1

- Hạt nhân = p + n, giữ bởi lực hạt nhân mạnh.
- Hụt khối = năng lượng liên kết (E = mc²). He-4 có E_liên_kết = 27.3 MeV.

---

## 2. Ba loại phóng xạ

### 2.1. Phóng xạ α (alpha)

**Phát ra hạt α** = hạt nhân He-4 (2p + 2n).

\`\`\`
ᴬZ X → ᴬ⁻⁴Z₋₂Y + ⁴₂He
\`\`\`

Ví dụ: ²³⁸U → ²³⁴Th + α.

**Đặc điểm**:
- Nặng (so với β, γ), ion hóa mạnh, **đi xa ngắn** (vài cm trong không khí).
- **Tờ giấy** chặn được.
- Nguy hiểm khi **hít vào hoặc nuốt vào cơ thể** (ion hóa mô).

### 2.2. Phóng xạ β (beta)

**Phát ra electron** (β⁻) hoặc positron (β⁺).

β⁻: 1 neutron → 1 proton + 1 electron + 1 antineutrino:
\`\`\`
ᴬZ X → ᴬZ₊₁ Y + β⁻
\`\`\`

Ví dụ: ¹⁴C → ¹⁴N + β⁻ (chu kỳ 5730 năm, dùng định tuổi cổ vật).

**Đặc điểm**:
- Nhẹ, đi xa hơn α (vài mét trong không khí).
- **Tấm nhôm** vài mm chặn được.
- Nguy hiểm: gây bỏng phóng xạ trên da.

### 2.3. Phóng xạ γ (gamma)

**Photon năng lượng cực cao** (E > 100 keV, λ < 10 pm).

Phát ra khi hạt nhân từ trạng thái kích thích về trạng thái cơ bản (sau khi đã có phân rã α hoặc β).

**Đặc điểm**:
- Không có khối lượng. Đi xa rất nhiều (km trong không khí).
- Cần **chì dày** (vài cm) hoặc bê tông để chặn.
- **NGUY HIỂM NHẤT**: xuyên qua cả cơ thể, phá DNA, gây ung thư.

### 📝 Tóm tắt mục 2

| Loại | Là gì | Đi xa | Chặn |
|------|-------|-------|------|
| α | Hạt nhân He | vài cm | Giấy |
| β | Electron | vài m | Nhôm |
| γ | Photon E cao | km | Chì dày |

---

## 3. Chu kỳ bán rã

### 3.1. Định nghĩa

**Chu kỳ bán rã t½** = thời gian để **lượng chất phóng xạ giảm còn 1 nửa**.

Phân rã ngẫu nhiên ở quy mô từng hạt nhân, nhưng **tổng số hạt phân rã** tuân theo định luật mũ:
\`\`\`
N(t) = N₀ · (1/2)^(t/t½)
\`\`\`

hoặc tương đương:
\`\`\`
N(t) = N₀ · e^(−λt)
\`\`\`

trong đó **λ** = hằng số phân rã = ln(2)/t½.

### 3.2. Bảng t½ một số đồng vị

| Đồng vị | t½ | Ứng dụng |
|---------|-----|----------|
| Carbon-14 | 5,730 năm | Định tuổi cổ vật < 50,000 năm |
| Uranium-238 | 4.5 tỷ năm | Định tuổi đá / Trái Đất |
| Iodine-131 | 8 ngày | Điều trị ung thư giáp |
| Technetium-99m | 6 giờ | Chụp ảnh y tế |
| Plutonium-239 | 24,000 năm | Vũ khí hạt nhân, lò phản ứng |
| Polonium-210 | 138 ngày | Cực độc — vụ Litvinenko 2006 |
| Radon-222 | 3.8 ngày | Khí phóng xạ trong nhà, gây ung thư phổi |

### 3.3. Walk-through — Định tuổi cổ vật bằng C-14

Một mẫu xương có lượng C-14 còn lại 25% so với cây sống.
- 25% = (1/2)^n → n = 2 chu kỳ bán rã.
- t = 2 × 5730 = **11,460 năm**.

### 📝 Tóm tắt mục 3

- N(t) = N₀ · (1/2)^(t/t½).
- C-14: t½ = 5730 năm → định tuổi cổ vật.
- U-238: t½ = 4.5 tỷ năm → định tuổi đá địa chất.

---

## 4. Ứng dụng

### 4.1. Y tế

- **Chụp PET / SPECT**: tiêm đồng vị (vd Tc-99m), theo dõi nơi nó tập trung → "soi" cơ quan.
- **Điều trị ung thư**: chiếu γ (Co-60) hoặc proton vào khối u → giết tế bào ung thư.
- **Iodine-131**: uống → tập trung ở tuyến giáp → phá tế bào ung thư giáp.

### 4.2. Định tuổi

- **C-14**: cổ vật hữu cơ < 50,000 năm (xương, gỗ, da).
- **K-Ar, U-Pb**: đá và meteorite (triệu đến tỷ năm). Định tuổi Trái Đất = 4.54 tỷ năm.

### 4.3. Cảnh báo — Tác hại

Phóng xạ cao → đột biến DNA → ung thư, sảy thai. Liều an toàn cho người: < 1 mSv/năm (millisievert). Tia X chụp 1 lần ≈ 0.1 mSv. Liều gây bệnh phóng xạ cấp: > 1 Sv (1000 mSv).

### 📝 Tóm tắt mục 4

- Y tế: chẩn đoán + điều trị.
- Định tuổi: C-14, U-Pb.
- Phải tuân thủ giới hạn an toàn.

---

## 5. Bài tập

### Bài tập

**Bài 1**: ²³⁵U phát ra α. Sản phẩm là gì?

**Bài 2**: 1 mẫu có 1 g C-14 ban đầu. Sau 11,460 năm còn bao nhiêu?

**Bài 3**: Mẫu xương C-14 còn 12.5%. Tuổi?

**Bài 4**: Tại sao gamma nguy hiểm hơn alpha (về xuyên thấu)?

**Bài 5**: Vì sao radon là khí phóng xạ trong nhà rất nguy hiểm dù chỉ là α?

### Lời giải

**Bài 1**: ²³⁵U → ²³¹Th + α. (Z giảm 2, A giảm 4.)

**Bài 2**: 11,460 / 5,730 = 2 chu kỳ → còn (1/2)² = 1/4 → **0.25 g**.

**Bài 3**: 12.5% = (1/2)³ → 3 chu kỳ → t = 3 × 5730 = **17,190 năm**.

**Bài 4**: Gamma là photon không khối lượng → ít tương tác với vật chất → xuyên qua mô người dễ dàng. Alpha to và nặng → tương tác mạnh ở quy mô gần → chỉ vài cm. Nhưng ngược lại: nếu alpha vào CƠ THỂ (qua hô hấp), nó ion hóa mạnh ngay tại chỗ → tàn phá cục bộ rất nặng. Quy tắc: γ nguy hiểm từ XA, α nguy hiểm từ BÊN TRONG.

**Bài 5**: Radon là khí trong tự nhiên (từ U phân rã trong lòng đất). Có thể thấm vào nhà qua nền móng, nhất là nhà có hầm. Hít vào phổi → α "bắn" vào tế bào phổi → ung thư phổi. Đây là nguyên nhân thứ 2 gây ung thư phổi (sau hút thuốc). Cần xét nghiệm Rn ở nhà, đặc biệt khu đất giàu uranium.

---

## 6. Bài tiếp theo

[Lesson 07 — Phân hạch & Nhiệt hạch](../lesson-07-fission-fusion/).

## 📝 Tổng kết

1. **Hạt nhân**: p + n, lực hạt nhân mạnh. E_liên_kết = Δm·c².
2. **3 loại phóng xạ**: α (He nặng, đi gần), β (e, đi xa), γ (photon, xuyên rất xa).
3. **t½**: N(t) = N₀·(1/2)^(t/t½). C-14 (5730 năm) định tuổi.
4. **Ứng dụng**: y tế (PET, xạ trị), khảo cổ, địa chất.
5. **An toàn**: liều < 1 mSv/năm. Radon trong nhà phải kiểm tra.
`;
