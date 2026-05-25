// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-07-fission-fusion/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 (T3) — Phân hạch & Nhiệt hạch

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **phân hạch (fission)** và **nhiệt hạch (fusion)** — 2 cách giải phóng năng lượng từ hạt nhân.
- Hiểu **đường cong năng lượng liên kết / nucleon** — vì sao cả 2 phản ứng đều tỏa năng lượng (nhưng theo hướng ngược nhau).
- Biết nguyên lý lò phản ứng hạt nhân, bom nguyên tử.
- Hiểu vì sao nhiệt hạch (Mặt Trời) chưa thực hiện được trên Trái Đất ở quy mô thương mại.

## Kiến thức tiền đề

- [Lesson 06 (T3) — Hạt nhân & Phóng xạ](../lesson-06-nucleus-radioactivity/) — biết năng lượng liên kết.

---

## 1. Đường cong năng lượng liên kết / nucleon

**Năng lượng liên kết / nucleon** = E_liên_kết / (Z + N). Đo "trung bình mỗi nucleon được giữ chặt thế nào".

Đồ thị E_liên_kết/nucleon theo số khối A:
- Tăng nhanh từ A nhỏ (H) đến A ≈ 60 (Fe-56 cực đại ~ 8.8 MeV/nucleon).
- Giảm chậm về phía A lớn (U-238 ≈ 7.6 MeV/nucleon).

💡 **Ý nghĩa**: hạt nhân ở vùng A ≈ 56 (Fe) **ổn định nhất**. Đi xa khỏi Fe theo 2 hướng:
- **Hạt nhân nhẹ** (H, He) ghép lại → tiến gần Fe → tỏa năng lượng (nhiệt hạch).
- **Hạt nhân nặng** (U, Pu) tách ra → tiến gần Fe → tỏa năng lượng (phân hạch).

Đó là tại sao cả 2 phản ứng đều tỏa năng lượng.

---

## 2. Phân hạch (Fission)

### 2.1. Cơ chế

Hạt nhân nặng (U-235, Pu-239) hấp thụ 1 neutron chậm → bất ổn → tách thành 2 hạt nhân nhẹ hơn + vài neutron + năng lượng.

Ví dụ:
\`\`\`
²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n + 200 MeV
\`\`\`

200 MeV mỗi phản ứng — gấp **40 triệu lần** năng lượng từ phản ứng hóa học bình thường (vài eV).

### 2.2. Phản ứng dây chuyền

Mỗi phân hạch sinh ra trung bình 2-3 neutron. Nếu mỗi neutron mới gây 1 phân hạch khác → **dây chuyền**:
- 1 → 2 → 4 → 8 → ... (gấp đôi mỗi giai đoạn).
- Ở quy mô khối lượng tới hạn (~ kg) → phản ứng diễn ra nhanh → giải phóng năng lượng khổng lồ.

### 2.3. Lò phản ứng vs Bom

**Lò phản ứng hạt nhân**: kiểm soát chậm phản ứng dây chuyền (1 neutron/phân hạch tiếp tục). Dùng:
- **Thanh điều khiển** (Cd hoặc B): hấp thụ neutron dư.
- **Chất giảm tốc** (H₂O hoặc D₂O): chậm neutron nhanh → neutron chậm (dễ gây fission).
- **Tản nhiệt**: nước nóng → sinh hơi → quay tuabin → tạo điện.

**Bom nguyên tử (A-bomb)**: gộp nhanh 2 khối "dưới tới hạn" thành "trên tới hạn" → phản ứng dây chuyền không kiểm soát → nổ.

### 2.4. Ưu nhược điểm

| Ưu | Nhược |
|----|--------|
| Năng lượng khổng lồ / 1 kg nhiên liệu | Chất thải phóng xạ (tồn tại hàng chục nghìn năm) |
| Không phát CO₂ (sạch về khí hậu) | Rủi ro tai nạn (Chernobyl 1986, Fukushima 2011) |
| Cung cấp ổn định, không phụ thuộc thời tiết | Vũ khí hạt nhân |

### 📝 Tóm tắt mục 2

- Phân hạch: U/Pu + n → 2 hạt nhỏ + 3n + 200 MeV.
- Phản ứng dây chuyền: 1 → 2 → 4 → ... cần kiểm soát.
- Lò: chậm có kiểm soát → điện. Bom: nhanh không kiểm soát → nổ.

---

## 3. Nhiệt hạch (Fusion)

### 3.1. Cơ chế

2 hạt nhân nhẹ ghép thành 1 hạt nhân nặng hơn + tỏa năng lượng.

Ví dụ — phản ứng D-T (deuterium-tritium):
\`\`\`
²H + ³H → ⁴He + n + 17.6 MeV
\`\`\`

### 3.2. Tại sao Mặt Trời sáng?

Mặt Trời hoạt động nhờ **fusion** trong lõi:
\`\`\`
4 ¹H → ⁴He + 2 e⁺ + 2 ν + 26.7 MeV
\`\`\`

Mỗi giây Mặt Trời chuyển **4 triệu tấn khối lượng** thành năng lượng (theo E = mc²) → bức xạ ra. Đã làm được vậy **4.6 tỷ năm** và còn ~ 5 tỷ năm nữa.

### 3.3. Vì sao chưa làm được trên Trái Đất?

Để fusion xảy ra, 2 hạt nhân (cùng dương) phải đẩy đến rất gần nhau → cần **nhiệt độ siêu cao** (~ 100 triệu °C) để vượt rào cản Coulomb.

Tại nhiệt độ này, không có vật liệu nào "chứa" được plasma. Các phương pháp đang nghiên cứu:
- **Magnetic confinement** (tokamak — ITER): giam plasma bằng từ trường mạnh. Dự kiến hoạt động ~ 2035.
- **Inertial confinement** (laser, NIF): bắn laser cực mạnh vào viên D-T → nén nhanh → fusion. Lần đầu đạt "ignition" 2022 (giải phóng năng lượng > năng lượng vào).

### 3.4. Tại sao fusion là "Holy Grail" của năng lượng?

- Nhiên liệu D (deuterium) **dồi dào** trong nước biển.
- T (tritium) tự sinh từ Li.
- Sản phẩm là He (an toàn, không phóng xạ).
- Năng lượng / 1 kg D-T = **gấp 10 triệu lần** dầu mỏ.
- **Không có chất thải phóng xạ lâu dài**.

→ Nếu giải được = năng lượng vô tận, sạch, an toàn. Đó là mục tiêu thế kỷ 21.

### 📝 Tóm tắt mục 3

- Fusion: 2 hạt nhân nhẹ → 1 hạt nhân nặng + năng lượng.
- Mặt Trời: 4H → He, 26.7 MeV/phản ứng.
- Khó trên Trái Đất: cần T ~ 10⁸ °C.
- ITER, NIF đang tiến triển.

---

## 4. Bài tập

### Bài tập

**Bài 1**: 1 kg U-235 phân hạch hết. Tính năng lượng tỏa ra (200 MeV/phân hạch, NA = 6.022e23).

**Bài 2**: So sánh năng lượng giải phóng / kg của fission U-235 vs đốt 1 kg dầu (44 MJ/kg).

**Bài 3**: Mặt Trời mất 4 triệu tấn/giây. Tính công suất bức xạ.

**Bài 4**: Vì sao Fe-56 là "đỉnh" của đường cong E_liên_kết / nucleon?

**Bài 5**: Vì sao bom hydrogen (H-bomb) nổ mạnh hơn bom uranium (A-bomb)?

### Lời giải

**Bài 1**: 
- Mol U-235 = 1000/235 ≈ 4.26 mol. 
- Số nguyên tử = 4.26 × 6.022e23 = 2.56e24.
- Năng lượng = 2.56e24 × 200 MeV = 5.12e26 MeV = 5.12e26 × 1.6e-13 J = **8.2 × 10¹³ J ≈ 23 GWh**.
- (So sánh: 1 nhà máy điện 1 GW chạy 23 giờ.)

**Bài 2**: 
- 1 kg U-235 fission = 8.2 × 10¹³ J.
- 1 kg dầu đốt = 4.4 × 10⁷ J.
- Tỉ lệ = 1.86 × 10⁶ → **U-235 mạnh hơn dầu 1.86 triệu lần** trên mỗi kg nhiên liệu.

**Bài 3**: 
- 4 × 10⁶ tấn/s = 4 × 10⁹ kg/s biến thành năng lượng.
- E = m·c² = 4 × 10⁹ × (3 × 10⁸)² = 3.6 × 10²⁶ J/s = **3.6 × 10²⁶ W**.
- (So sánh: 1 nhà máy điện = 10⁹ W. Mặt Trời = 360 nghìn tỷ tỷ tỷ tỷ lần đó.)

**Bài 4**: Fe-56 có **năng lượng liên kết / nucleon cao nhất** (~ 8.8 MeV). Nucleon trong Fe được "giữ chặt nhất". Tách Fe (fission) hay ghép Fe (fusion) đều **TỐN năng lượng**, không tỏa. Mọi nguyên tố khác đều có E_liên_kết/nucleon thấp hơn → đi về phía Fe (qua fission hay fusion) thì tỏa năng lượng.

**Bài 5**: 
- Bom A (fission U/Pu): khoảng 20 kt TNT cho Hiroshima.
- Bom H (fusion D-T): hàng megaton TNT (gấp 1000 lần A).

Lý do: 
1. Fusion mỗi phản ứng tỏa nhiều năng lượng / khối lượng hơn fission (vì khối lượng nucleon ban đầu nhỏ).
2. Bom H dùng **bom A làm "ngòi"** — kích nhiệt độ siêu cao để fuel D-T cháy fusion. Hiệu quả: A-bomb chỉ là kíp nổ.
3. Khối lượng fuel D-T có thể nhiều hơn (rẻ hơn, an toàn vận chuyển hơn).

---

## 5. Bài tiếp theo

[Lesson 08 — Tương đối hẹp preview](../lesson-08-relativity-preview/).

## 📝 Tổng kết

1. **Đường cong E_liên_kết/nucleon**: đỉnh ở Fe-56 (~ 8.8 MeV). Hạt nhân muốn "tiến về Fe".
2. **Phân hạch**: nặng → nhẹ. U-235 + n → 2 hạt + 3n + 200 MeV.
3. **Phản ứng dây chuyền**: 1 → 2 → 4 → ... lò kiểm soát, bom không.
4. **Nhiệt hạch**: nhẹ → nặng. 4H → He (Mặt Trời) hoặc D + T → He + n.
5. **Fusion trên Trái Đất**: cần T ~ 10⁸ °C. ITER (2035), NIF đã đạt ignition 2022.
`;
