// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-05-electric-field-potential/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 (T2) — Điện trường & Điện thế

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **điện trường E** là gì — và tại sao nó là cách mô tả "thuận tiện" cho lực điện.
- Phân biệt **điện thế V** (điện thế tại 1 điểm) và **hiệu điện thế U** (chênh lệch giữa 2 điểm).
- Biết liên hệ giữa F, E, V, U.
- Hiểu **tụ điện** — dùng để lưu trữ năng lượng điện trường.

## Kiến thức tiền đề

- [Lesson 04 — Coulomb](../lesson-04-coulomb-charge/).

---

## 1. Điện trường E

### 1.1. Định nghĩa

**Điện trường E tại 1 điểm** = lực tác dụng lên **1 điện tích thử dương đơn vị (+1 C)** đặt tại điểm đó:

\`\`\`
E = F / q   (V/m hoặc N/C)
\`\`\`

💡 **Ý nghĩa**: thay vì nói "có điện tích Q ở chỗ kia, hút/đẩy điện tích q ở chỗ này", ta nói "Q tạo ra điện trường E khắp không gian — q đặt vào sẽ bị E tác dụng lực F = q·E". Tách thành **2 bước** giúp tính toán hệ nhiều điện tích dễ hơn nhiều.

**Vì sao cần khái niệm này (khi đã có lực Coulomb)?** Vì khi có **nhiều điện tích**, ta thường muốn biết "tại điểm X có lực thế nào với điện tích thử bất kỳ". Trường E là "bản đồ lực" — tính một lần, dùng cho mọi q.

Hơn nữa, E là **đại lượng riêng của không gian**, độc lập với điện tích thử → khái niệm nền cho lý thuyết Maxwell (Lesson 08).

### 1.2. Điện trường từ điện tích điểm

\`\`\`
E = k · |Q| / r²
\`\`\`

Hướng: rời khỏi Q nếu Q > 0, vào Q nếu Q < 0.

### 1.3. Ví dụ số

**Ví dụ**: Điện trường ở 10 cm từ điện tích +5 μC:
- E = 9e9 × 5e-6 / 0.01 = **4.5 × 10⁶ V/m** = 4.5 MV/m.

Đặt 1 điện tích thử +1 μC ở đó → lực F = q·E = 1e-6 × 4.5e6 = **4.5 N**.

### 📝 Tóm tắt mục 1

- E = F/q, đơn vị V/m. Điện trường từ Q điểm: E = kQ/r².
- E là "bản đồ lực" — tính một lần dùng cho mọi điện tích thử.

---

## 2. Điện thế V và hiệu điện thế U

### 2.1. Điện thế V

**Điện thế V tại 1 điểm** = **năng lượng tiềm năng (thế năng) của 1 điện tích +1 C** đặt tại điểm đó, so với điểm "vô cùng" (V = 0):

\`\`\`
V = U_q / q   (đơn vị: Volt = V = J/C)
\`\`\`

💡 **Ý nghĩa**: V đo "vị trí" của 1 điểm trong điện trường, tương tự độ cao trong trường hấp dẫn. Điện tích "ưa" đi từ V cao xuống V thấp (như nước chảy từ cao xuống thấp).

**Vì sao có khái niệm này (khi đã có E)?** Vì:
- V là **số vô hướng** (scalar), dễ tính hơn E (vector).
- E và V liên hệ qua: **E = −dV/dr** (gradient của V).
- Trong mạch điện, ta thường nói "hiệu điện thế giữa 2 cực" — đó là khái niệm V.

### 2.2. Hiệu điện thế U = ΔV

\`\`\`
U = V_A − V_B
\`\`\`

**Công lực điện** để chuyển điện tích q từ A đến B:
\`\`\`
W = q · U_AB = q · (V_A − V_B)
\`\`\`

### 2.3. Ví dụ trực giác

**Ví dụ — Pin AA**: Hiệu điện thế giữa 2 cực = **1.5 V**. Có nghĩa: lực điện làm **công 1.5 J** khi chuyển **1 C điện tích** từ cực dương sang cực âm bên ngoài (qua mạch ngoài).

**Ví dụ — Ổ điện gia đình**: 220 V. Chuyển 1 C qua thiết bị → 220 J năng lượng được tiêu thụ.

### 2.4. Điện thế từ điện tích điểm

\`\`\`
V = k · Q / r
\`\`\`

(Lưu ý: V ∝ 1/r, không phải 1/r² như E.)

### 📝 Tóm tắt mục 2

- V = J/C = Volt. Đo "vị trí" trong trường điện.
- U = V_A − V_B. W = q·U.
- Điện thế điểm: V = kQ/r.

---

## 3. Tụ điện (Capacitor)

### 3.1. Định nghĩa

**Tụ điện** = thiết bị lưu trữ **năng lượng dưới dạng điện trường** giữa 2 bản kim loại cách nhau bởi điện môi.

\`\`\`
C = Q / U   (đơn vị: Farad = F = C/V)
\`\`\`

trong đó:
- **C** = điện dung (Farad).
- **Q** = điện tích trên 1 bản.
- **U** = hiệu điện thế giữa 2 bản.

💡 **Ý nghĩa**: C đo "khả năng tích điện" — C lớn nghĩa là với cùng U, tụ chứa nhiều Q hơn. Tụ "đầy" khi điện trường giữa các bản đẩy điện tích không vào thêm được.

### 3.2. Năng lượng tích trong tụ

\`\`\`
W = (1/2) · C · U² = (1/2) · Q² / C
\`\`\`

### 3.3. Ví dụ con số

| Loại tụ | C |
|---------|---|
| Tụ trong điện thoại | 1-100 μF |
| Tụ dùng trong máy ảnh flash | 100-1000 μF |
| Siêu tụ (supercapacitor) | 1-100 F |

**Ví dụ**: Tụ 100 μF nạp đến 10 V. 
- Q = C·U = 1e-4 × 10 = 10⁻³ C = 1 mC.
- W = (1/2)·1e-4·100 = **5 × 10⁻³ J = 5 mJ**.

(So sánh: pin AA 1.5 V chứa ~ 10,000 J — gấp 2 triệu lần tụ này. Tụ dùng để xả nhanh, không lưu trữ lâu dài.)

### 📝 Tóm tắt mục 3

- Tụ C = Q/U. Đơn vị Farad. W = (1/2)CU².
- Xả nhanh (mili-giây) → ứng dụng flash máy ảnh, mạch lọc.

---

## 4. Bài tập + Lời giải

### Bài tập

**Bài 1**: Tính E ở 5 cm từ điện tích +2 μC.

**Bài 2**: 1 điện tích −1 μC trong điện trường E = 1000 V/m hướng phải. Tính lực.

**Bài 3**: Hai điểm chênh điện thế 100 V. Tính công làm với 1 mC chuyển từ A sang B.

**Bài 4**: Tụ 50 μF nạp đến 20 V. Tính Q và năng lượng.

**Bài 5**: Vì sao tụ điện được nạp nhanh nhưng giữ điện thế chỉ trong thời gian ngắn?

### Lời giải

**Bài 1**: E = 9e9 × 2e-6 / 0.0025 = **7.2 × 10⁶ V/m**.

**Bài 2**: F = q·E = −1e-6 × 1000 = −10⁻³ N. Lực = 10⁻³ N hướng **trái** (ngược chiều E vì q âm).

**Bài 3**: W = qU = 10⁻³ × 100 = **0.1 J**.

**Bài 4**: Q = C·U = 50e-6·20 = **10⁻³ C = 1 mC**. W = 0.5·C·U² = 0.5·50e-6·400 = **0.01 J = 10 mJ**.

**Bài 5**: Tụ là 2 bản kim loại + điện môi (cách điện). Khi nối với pin, electron lập tức chuyển → tích điện rất nhanh (< 1 giây). Khi ngắt pin, tụ giữ điện trường nhưng dần dần **tự xả** qua không khí (không hoàn toàn cách điện) → mất điện trong vài giây đến phút. Khác pin: pin lưu năng lượng dạng hóa học, ổn định lâu dài.

---

## 5. Bài tiếp theo

[Lesson 06 — Dòng điện & Mạch](../lesson-06-current-circuits/).

## 📝 Tổng kết

1. **E = F/q** — điện trường, V/m.
2. **V = U_q/q** — điện thế, Volt = J/C. Pin AA = 1.5 V, ổ điện = 220 V.
3. **U = V_A − V_B** — hiệu điện thế. W = q·U.
4. **Tụ C = Q/U** — Farad. W = (1/2)CU².
`;
