// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/02-Thermo-Electromagnetism/lesson-07-magnetism-induction/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 (T2) — Từ trường & Cảm ứng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **từ trường B** là gì — và nguồn gốc từ "dòng điện di chuyển".
- Tính **lực Lorentz** F = q·v × B trên điện tích chuyển động.
- Hiểu **cảm ứng điện từ Faraday**: từ trường biến đổi sinh ra điện trường (và ngược lại).
- Phân biệt **2 loại nam châm**: nam châm vĩnh cửu vs nam châm điện.
- Biết nguyên lý hoạt động của máy phát điện và động cơ điện.

## Kiến thức tiền đề

- [Lesson 06 — Dòng điện & mạch](../lesson-06-current-circuits/).

---

## 1. Từ trường B

### 1.1. Định nghĩa

**Từ trường B** = trường tác dụng lực lên **điện tích đang chuyển động** (và lên dòng điện, vốn là điện tích di chuyển).

Đơn vị: **Tesla (T) = N·s/(C·m) = N/(A·m)**. Một đơn vị nhỏ hơn: **Gauss (G) = 10⁻⁴ T**.

💡 **Ý nghĩa**: từ trường mô tả "vùng không gian mà nếu có điện tích di chuyển/dòng điện qua, sẽ chịu lực". Khác điện trường (tác dụng lên cả điện tích đứng yên), từ trường **chỉ tác dụng khi điện tích di chuyển**.

**Vì sao tồn tại?** Theo lý thuyết tương đối, từ trường thực ra là "điện trường nhìn từ hệ quy chiếu khác" — khi bạn di chuyển so với điện tích, bạn "thấy" thêm từ trường. Nhưng trong khung làm việc thông thường, ta coi B là đại lượng riêng.

### 1.2. Lực Lorentz

**Lực lên điện tích q di chuyển với vận tốc v trong từ trường B**:

\`\`\`
F = q · v × B   (tích vector!)
\`\`\`

Độ lớn: F = |q|·v·B·sin(θ), với θ = góc giữa v và B.

Hướng: theo **quy tắc bàn tay phải** (cho điện tích dương, bàn tay trái cho điện tích âm).

💡 **Ý nghĩa**: lực Lorentz **vuông góc** với cả v và B. Đó là tại sao trong từ trường đều, điện tích chuyển động vòng tròn — lực Lorentz đóng vai trò lực hướng tâm.

### 1.3. Ví dụ con số

| Tình huống | B |
|------------|---|
| Từ trường Trái Đất (mặt biển) | ~ 5 × 10⁻⁵ T = 0.5 Gauss |
| Nam châm tủ lạnh | ~ 0.01 T = 100 Gauss |
| Nam châm neodymium mạnh | ~ 1 T |
| Máy MRI bệnh viện | 1.5 - 7 T |
| Nam châm phòng thí nghiệm vật lý hạt | 10 - 50 T |
| Sao neutron (bề mặt) | 10⁸ - 10¹¹ T (cực lớn) |

### 📝 Tóm tắt mục 1

- B = từ trường, đơn vị Tesla.
- Lực Lorentz F = q·v × B, vuông góc cả v và B.
- Trái Đất có B ≈ 5 × 10⁻⁵ T (lý do la bàn hoạt động).

---

## 2. Nguồn của từ trường

### 2.1. Hai loại nguồn

**Mọi từ trường đều sinh từ điện tích chuyển động**. Hai dạng phổ biến:

1. **Dòng điện** trong dây dẫn — sinh từ trường xung quanh (định luật Ampère).
2. **Spin/quỹ đạo electron** trong nguyên tử — sinh "từ tính bẩm sinh" của vật liệu sắt, neodymium...

→ Cả nam châm điện và nam châm vĩnh cửu đều là **điện tích di chuyển** ở quy mô vi mô.

### 2.2. Dây dẫn thẳng

Từ trường ở khoảng cách r từ dây dẫn dài có dòng I:
\`\`\`
B = μ₀ · I / (2π · r)
\`\`\`

trong đó **μ₀** = hằng số từ = **4π × 10⁻⁷ T·m/A**.

Hướng: theo quy tắc nắm tay phải (ngón cái theo chiều I, các ngón còn lại theo chiều B vòng quanh dây).

### 2.3. Vòng dây (cuộn solenoid)

Bên trong cuộn solenoid dài có n vòng/m và dòng I:
\`\`\`
B = μ₀ · n · I
\`\`\`

→ B đều và mạnh — nguyên lý nam châm điện công nghiệp.

### 📝 Tóm tắt mục 2

- Nguồn từ trường = điện tích di chuyển.
- Dây thẳng: B = μ₀I/(2πr).
- Solenoid: B = μ₀nI (đều bên trong).

---

## 3. Cảm ứng điện từ (Faraday)

### 3.1. Định luật Faraday

**Hiệu điện thế cảm ứng ε** sinh ra khi **từ thông Φ qua mạch thay đổi**:

\`\`\`
ε = −dΦ / dt
\`\`\`

trong đó **Φ = B·A·cos(θ)** = từ thông (Wb, Weber).

💡 **Ý nghĩa**: nếu từ trường qua 1 cuộn dây **đang thay đổi** (do nam châm di chuyển, B tăng/giảm, hoặc cuộn xoay), sẽ sinh ra hiệu điện thế trong cuộn → dòng điện chạy.

**Dấu trừ** = **định luật Lenz**: dòng cảm ứng có chiều **chống lại** sự thay đổi từ thông (giống "quán tính từ"). Đây là biểu hiện của bảo toàn năng lượng.

### 3.2. Ý nghĩa lịch sử

Faraday (1831) phát hiện: **từ trường biến đổi sinh ra điện**. Đây là phát hiện vĩ đại — mở đường cho:
- **Máy phát điện**: xoay cuộn dây trong từ trường → tạo dòng AC.
- **Máy biến áp**: dòng AC trong cuộn 1 → tạo từ trường biến đổi → cảm ứng dòng vào cuộn 2.
- **Mọi nhà máy điện** ngày nay (trừ pin và panel mặt trời) đều dựa vào nguyên lý này.

### 3.3. Ví dụ — Máy phát điện đơn giản

Cuộn dây N vòng, diện tích A, quay với vận tốc góc ω trong từ trường B đều:
- Φ(t) = B·A·cos(ωt).
- ε = −dΦ/dt = B·A·ω·sin(ωt) — sóng sin (dòng AC).
- ε_max = B·A·ω·N.

### 📝 Tóm tắt mục 3

- ε = −dΦ/dt (Faraday).
- Φ thay đổi → ε sinh → dòng cảm ứng.
- Cơ sở của mọi máy phát điện.

---

## 4. Bài tập

### Bài tập

**Bài 1**: 1 electron bay với v = 10⁶ m/s vuông góc với từ trường B = 0.01 T. Tính lực.

**Bài 2**: Tính B ở khoảng cách 10 cm từ dây dẫn có I = 5 A.

**Bài 3**: Solenoid 1000 vòng/m, I = 2 A. Tính B trong lòng.

**Bài 4**: Cuộn dây 100 vòng, A = 0.01 m², trong B = 0.5 T. Quay với ω = 100 rad/s. Tính ε_max.

**Bài 5**: Vì sao máy biến áp hoạt động được với dòng AC mà không với DC?

### Lời giải

**Bài 1**: F = q·v·B = 1.6e-19 · 10⁶ · 0.01 = **1.6 × 10⁻¹⁵ N**. Lực Lorentz → electron chạy vòng tròn.

**Bài 2**: B = μ₀·I/(2π·r) = 4π·10⁻⁷·5/(2π·0.1) = **10⁻⁵ T** = 0.1 Gauss. (Khoảng 5 lần từ trường Trái Đất.)

**Bài 3**: B = μ₀·n·I = 4π·10⁻⁷·1000·2 = **2.51 × 10⁻³ T** ≈ 25 Gauss.

**Bài 4**: ε_max = B·A·ω·N = 0.5·0.01·100·100 = **50 V**.

**Bài 5**: Máy biến áp dùng nguyên lý cảm ứng Faraday: dòng vào cuộn 1 sinh từ trường → từ trường biến đổi sinh ε ở cuộn 2. **DC (dòng 1 chiều)** = dòng ổn định → từ trường ổn định → KHÔNG thay đổi → không có cảm ứng → cuộn 2 không sinh ε. **AC (dòng xoay chiều)** = liên tục thay đổi → từ trường liên tục thay đổi → có cảm ứng → cuộn 2 có dòng. Đó là lý do điện gia đình dùng AC (220 V, 50 Hz) — dễ biến đổi điện thế qua máy biến áp.

---

## 5. Bài tiếp theo

[Lesson 08 — Sóng điện từ](../lesson-08-em-waves/).

## 📝 Tổng kết

1. **B (Tesla)** = từ trường, tác dụng lực lên điện tích di chuyển.
2. **F = q·v × B** (Lorentz), vuông góc cả v và B.
3. **Nguồn từ trường**: dòng điện (dây thẳng B = μ₀I/2πr, solenoid B = μ₀nI).
4. **Faraday**: ε = −dΦ/dt — từ trường biến đổi sinh điện.
5. **Lenz**: dòng cảm ứng chống lại sự thay đổi từ thông (bảo toàn năng lượng).
`;
