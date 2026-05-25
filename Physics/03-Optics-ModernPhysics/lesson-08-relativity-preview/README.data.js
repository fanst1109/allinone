// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-08-relativity-preview/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 (T3) — Tương đối hẹp preview

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **2 nguyên lý** của Tương đối hẹp Einstein (1905).
- Biết các hệ quả "kỳ lạ": **dãn thời gian, co độ dài, đồng thời tương đối**.
- Hiểu **E = mc²** — phương trình nổi tiếng nhất vật lý.
- Biết khi nào dùng tương đối (v gần c) và khi nào dùng Newton (v << c).

## Kiến thức tiền đề

Cơ học Newton (Lesson 02 T1) và sóng EM (Lesson 08 T2).

---

## 1. Hai nguyên lý của Tương đối hẹp

Einstein (1905) đặt ra 2 tiền đề đơn giản nhưng cách mạng:

1. **Nguyên lý tương đối**: Các định luật vật lý có cùng dạng trong mọi hệ quy chiếu quán tính (không gia tốc). Không thể xác định bạn đang "đứng yên" hay "chuyển động đều" trong vũ trụ.

2. **Bất biến tốc độ ánh sáng**: Tốc độ ánh sáng **c = 3 × 10⁸ m/s** trong chân không **giống nhau cho mọi quan sát viên**, bất kể họ chuyển động thế nào hay nguồn ánh sáng chuyển động thế nào.

💡 **Tại sao "kỳ lạ"?** Vì:
- Trong Newton: nếu xe chạy 100 km/h và bạn ném bóng về phía trước 30 km/h, người đứng yên thấy bóng đi **130 km/h** (cộng vận tốc).
- Theo Einstein: nếu xe chạy 0.5c và bạn bật đèn pin về phía trước, người đứng yên KHÔNG thấy ánh sáng đi 1.5c. Họ thấy ánh sáng đi **đúng c** (không phải 1.5c). 

Điều này dường như mâu thuẫn — nhưng được xác nhận trong **mọi thí nghiệm**.

---

## 2. Hệ quả 1 — Dãn thời gian (Time Dilation)

Đồng hồ chuyển động **đi chậm hơn** so với đồng hồ đứng yên (theo quan sát của người đứng yên):

\`\`\`
Δt' = Δt / √(1 − v²/c²) = γ · Δt
\`\`\`

trong đó γ = 1/√(1 − v²/c²) = **hệ số Lorentz**.

### 2.1. Ví dụ

**Phi hành gia bay với v = 0.9c trong 10 năm (theo đồng hồ của họ)**. Đồng hồ Trái Đất chạy bao nhiêu năm?
- γ = 1/√(1 − 0.81) = 1/√0.19 ≈ 2.29.
- Trái Đất: 10 × 2.29 = **22.9 năm** đã trôi.
- → Phi hành gia "trẻ hơn" 12.9 năm so với người ở Trái Đất.

Đây là **paradox sinh đôi** nổi tiếng (paradox chỉ là tên gọi — không có mâu thuẫn).

### 2.2. Thí nghiệm thực

- **Muon trong tia vũ trụ**: muon có chu kỳ phân rã 2.2 μs. Sinh ra ở 60 km trên cao, nếu không có dãn thời gian, chỉ đi được 660 m trước khi tan rã. Nhưng thực tế chúng tới mặt đất → dãn thời gian thật.
- **Đồng hồ trên máy bay**: đồng hồ atomic trên máy bay chạy chậm hơn đồng hồ trên mặt đất một chút (~ nano giây). Đã được đo (Hafele-Keating 1971).

---

## 3. Hệ quả 2 — Co độ dài (Length Contraction)

Vật chuyển động **ngắn hơn** theo chiều chuyển động:

\`\`\`
L = L₀ · √(1 − v²/c²) = L₀ / γ
\`\`\`

**Ví dụ**: Một thanh dài 1 m đứng yên. Bay với v = 0.9c → quan sát viên đứng yên đo được L = 1/2.29 = **0.437 m**.

(Theo trục vuông góc chuyển động, không co.)

---

## 4. Hệ quả 3 — E = mc²

Hệ thức nổi tiếng nhất:
\`\`\`
E = m · c²
\`\`\`

trong đó m là **khối lượng nghỉ**. E là năng lượng tổng (khi đứng yên).

💡 **Ý nghĩa**: khối lượng và năng lượng là **2 dạng của cùng một thứ**. m chỉ là "năng lượng đông đặc" — có thể chuyển hóa thành năng lượng (vd phản ứng hạt nhân) và ngược lại.

### Ví dụ trực giác

**1 gam khối lượng = ?**
- E = 0.001 × (3 × 10⁸)² = **9 × 10¹³ J** = 90 TJ.
- Đủ điện cho **20,000 hộ gia đình trong 1 năm**.
- Bom Hiroshima (~ 15 kt TNT) tương đương ~ 0.7 gam khối lượng chuyển hóa.

Đó là tại sao phản ứng hạt nhân (chuyển m → E theo công thức này) cực kỳ mạnh.

---

## 5. Khi nào dùng Newton vs Einstein?

| v/c | γ | Newton sai số | Dùng |
|-----|---|---------------|------|
| 0.01 | 1.00005 | 0.005% | Newton OK |
| 0.1 | 1.005 | 0.5% | Newton xấp xỉ |
| 0.5 | 1.155 | 15% | Phải dùng Einstein |
| 0.9 | 2.29 | Không thể dùng Newton |
| 0.99 | 7.09 | Einstein bắt buộc |
| 1.0 | ∞ | Chỉ đạt được cho photon |

→ Trong đời sống thường ngày (v ≤ 1000 km/h), v/c ~ 10⁻⁶ → Newton chính xác đến vài ppm. Chỉ ở quy mô hạt cao năng (máy gia tốc), GPS (chính xác cao), du hành vũ trụ tốc độ cao mới cần Einstein.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Tính γ cho v = 0.8c.

**Bài 2**: Phi hành gia bay 5 năm với v = 0.95c. Trái Đất trôi qua bao nhiêu năm?

**Bài 3**: Tính năng lượng 1 kg theo E = mc².

**Bài 4**: Vì sao không thể đạt v = c?

**Bài 5**: GPS có cần tính tương đối không?

### Lời giải

**Bài 1**: γ = 1/√(1 − 0.64) = 1/√0.36 = 1/0.6 = **5/3 ≈ 1.667**.

**Bài 2**: γ = 1/√(1 − 0.9025) = 1/√0.0975 ≈ 3.2. Đồng hồ Trái Đất: 5 × 3.2 = **16 năm**.

**Bài 3**: E = 1 · (3×10⁸)² = **9 × 10¹⁶ J = 90 PJ**. Đủ cho cả thành phố lớn dùng vài tháng.

**Bài 4**: γ = 1/√(1 − v²/c²). Khi v → c, γ → ∞. Năng lượng cần để gia tốc tiếp = γ·mc² → ∞ → cần năng lượng vô hạn. Chỉ photon (m = 0) đạt được c.

**Bài 5**: CÓ. GPS vệ tinh chuyển động khoảng 14,000 km/h và ở quỹ đạo cao → cả tương đối hẹp (đồng hồ chậm) và tương đối tổng quát (g khác, đồng hồ nhanh hơn) đều có hiệu lực. Nếu không hiệu chỉnh, lỗi vị trí sẽ ~ 10 km/ngày. Hiệu chỉnh → chính xác 5-10 m. **Đây là ứng dụng thực tế hằng ngày của thuyết tương đối**.

---

## 7. 🎉 HOÀN THÀNH PHYSICS!

Bạn vừa hoàn thành **24/24 lesson** trên 3 tier:
- **Tier 1 — Mechanics**: từ động học → Newton → công năng lượng → vật rắn → dao động.
- **Tier 2 — Thermo & EM**: nhiệt → khí lý tưởng → entropy → điện tích → mạch → từ trường → sóng EM.
- **Tier 3 — Optics & Modern**: quang hình → quang sóng → photon → Bohr → hạt nhân → fission/fusion → tương đối.

Vật lý cơ bản từ Newton đến Einstein — đầy đủ trong tầm tay.

## 📝 Tổng kết

1. **2 tiên đề Einstein**: định luật giống nhau ở mọi hệ quán tính + tốc độ c bất biến.
2. **Dãn thời gian**: Δt' = γ·Δt. Đồng hồ chuyển động chạy chậm.
3. **Co độ dài**: L = L₀/γ. Vật chuyển động ngắn lại theo chiều di chuyển.
4. **E = mc²**: m và E là 2 dạng của cùng 1 thứ. 1 g = 9 × 10¹³ J.
5. **Khi nào Einstein**: v gần c (~ 10% c trở lên). Newton OK đến đó.
`;
