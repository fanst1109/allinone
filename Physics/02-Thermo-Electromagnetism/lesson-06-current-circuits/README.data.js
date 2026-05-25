// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-06-current-circuits/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 (T2) — Dòng điện & Mạch

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **dòng điện I** = tốc độ chuyển động của điện tích.
- Áp dụng **định luật Ohm** V = I·R.
- Tính trở mạch nối tiếp và song song.
- Áp dụng **định luật Kirchhoff** cho mạch phức tạp.
- Tính **công suất điện** P = U·I.

## Kiến thức tiền đề

- [Lesson 05 — Điện trường & điện thế](../lesson-05-electric-field-potential/).

---

## 1. Dòng điện I

### 1.1. Định nghĩa

**Dòng điện I** = lượng điện tích đi qua tiết diện trên đơn vị thời gian:

\`\`\`
I = ΔQ / Δt   (đơn vị: Ampere = A = C/s)
\`\`\`

💡 **Ý nghĩa**: I đo "lưu lượng điện tích". Tương tự lưu lượng nước qua ống (lít/giây) — I là điện tích/giây.

**Vì sao cần?** Vì trong mạch điện thực tế, ta thường quan tâm "có bao nhiêu điện tích chảy qua" hơn là "tổng có bao nhiêu".

**Quy ước chiều dòng điện**: theo **chiều di chuyển của điện tích dương** (ngược chiều di chuyển electron trong dây kim loại). Quy ước lịch sử từ trước khi biết electron.

### 1.2. Ví dụ con số

| Tình huống | I |
|------------|---|
| Bóng đèn LED 1 W ở 5V | ~ 0.2 A |
| Bóng đèn sợi đốt 60 W ở 220 V | ~ 0.27 A |
| Cầu chì gia đình | 15-30 A |
| Sét tia | 30,000 A (rất ngắn) |
| Khởi động ô tô | 100-200 A |

### 📝 Tóm tắt mục 1

- I = ΔQ/Δt, đơn vị Ampere (A).
- Chiều dòng điện = chiều di chuyển của điện tích dương.

---

## 2. Định luật Ohm

### 2.1. Phát biểu

Trong nhiều vật liệu (đặc biệt kim loại ở nhiệt độ thường):

\`\`\`
V = I · R
\`\`\`

trong đó **R** = **điện trở** (Ohm, Ω = V/A).

💡 **Ý nghĩa**: R đo "khó-dễ cho dòng điện đi qua". R lớn → cần hiệu điện thế V lớn để có cùng I.

**Vì sao có R?** Vì electron va chạm với các nguyên tử trong vật liệu khi đi qua → mất năng lượng (thành nhiệt). Vật liệu dẫn tốt (Cu, Ag) → R nhỏ. Cách điện (nhựa) → R cực lớn.

### 2.2. Công suất điện

\`\`\`
P = U · I = I² · R = U² / R   (đơn vị: Watt)
\`\`\`

💡 Vì sao 3 biểu thức? Vì kết hợp với V = IR, ta thay vào để dùng tùy thông tin có.

### 2.3. Ví dụ

**Ví dụ — Bóng đèn 100 W ở 220 V**:
- I = P/U = 100/220 ≈ **0.45 A**.
- R = U/I = 220/0.45 ≈ **484 Ω**.

### 📝 Tóm tắt mục 2

- V = IR. R Ohm = V/A.
- P = UI. P trong điện trở → biến thành nhiệt (định luật Joule).

---

## 3. Mạch nối tiếp và song song

### 3.1. Nối tiếp

Dòng điện qua tất cả linh kiện **bằng nhau**:
\`\`\`
R_tổng = R₁ + R₂ + R₃ + ...
\`\`\`

💡 Hình dung: ống nước dài hơn → khó cho nước chảy hơn → tổng R lớn.

### 3.2. Song song

Hiệu điện thế qua mỗi nhánh **bằng nhau**:
\`\`\`
1/R_tổng = 1/R₁ + 1/R₂ + 1/R₃ + ...
\`\`\`

(Cho 2 R: R_tổng = R₁·R₂ / (R₁ + R₂).)

💡 Hình dung: thêm nhiều ống song song → dễ chảy hơn → R tổng giảm.

### 3.3. Ví dụ

**Ví dụ**: 2 điện trở R = 100 Ω.
- Nối tiếp: R_tổng = **200 Ω**.
- Song song: R_tổng = 100·100/(100+100) = **50 Ω**.

### 📝 Tóm tắt mục 3

- Nối tiếp: R cộng. Cùng I.
- Song song: 1/R cộng. Cùng U.

---

## 4. Định luật Kirchhoff

### 4.1. Định luật I — Nút (KCL)

**Tổng các dòng vào 1 nút = tổng các dòng ra**.

(Hệ quả của bảo toàn điện tích.)

### 4.2. Định luật II — Mạch vòng (KVL)

**Tổng các U trong 1 mạch kín = 0**.

(Hệ quả của bảo toàn năng lượng — đi vòng kín, năng lượng không thay đổi.)

### 4.3. Ví dụ — Mạch có pin + 2 R song song

Pin 12 V, R₁ = 4 Ω, R₂ = 6 Ω nối song song. Tính I tổng.
- R_tổng = 4·6/10 = 2.4 Ω.
- I_tổng = 12/2.4 = **5 A**.
- I_R1 = 12/4 = 3 A. I_R2 = 12/6 = 2 A. Tổng = 5 A ✓ (Kirchhoff I).

---

## 5. Bài tập

### Bài tập

**Bài 1**: Bóng đèn 60 W chạy ở 220 V. Tính I và R.

**Bài 2**: 3 điện trở 10, 20, 30 Ω nối tiếp với pin 12 V. Tính I.

**Bài 3**: 3 điện trở 10, 20, 30 Ω nối song song với pin 12 V. Tính I tổng.

**Bài 4**: 1 thiết bị 1000 W chạy 1 giờ. Tiêu thụ bao nhiêu kWh? Tiền điện ở giá 3000 đồng/kWh?

**Bài 5**: Vì sao đèn LED tiết kiệm hơn đèn sợi đốt?

### Lời giải

**Bài 1**: I = 60/220 = **0.273 A**. R = 220/0.273 = **806 Ω**.

**Bài 2**: R_tổng = 60 Ω. I = 12/60 = **0.2 A**.

**Bài 3**: 1/R = 1/10 + 1/20 + 1/30 = 6/60 + 3/60 + 2/60 = 11/60. R = 60/11 = **5.45 Ω**. I = 12/5.45 = **2.2 A**.

**Bài 4**: Năng lượng = 1 kW × 1 h = **1 kWh**. Tiền = **3000 đồng**.

**Bài 5**: Đèn sợi đốt biến > 95% năng lượng thành **nhiệt** (sợi tóc 2000-3000°C), chỉ < 5% thành ánh sáng. Đèn LED: bán dẫn phát ánh sáng trực tiếp, hiệu suất ~ 30-40%. Cùng "lượng ánh sáng", LED tiêu thụ năng lượng ít hơn ~ 5-10 lần. Lý do giúp tiết kiệm điện toàn cầu.

---

## 6. Bài tiếp theo

[Lesson 07 — Từ trường & Cảm ứng](../lesson-07-magnetism-induction/).

## 📝 Tổng kết

1. **I = ΔQ/Δt**, Ampere.
2. **V = IR** (Ohm's Law). P = UI = I²R = U²/R.
3. **Nối tiếp**: R cộng. **Song song**: 1/R cộng.
4. **Kirchhoff**: I — nút (bảo toàn điện tích), II — vòng (bảo toàn năng lượng).
`;
