// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-05-momentum-collisions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Động lượng & Va chạm

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **động lượng p = m·v** — đại lượng khác động năng, đo "khả năng đẩy" của một vật.
- Phát biểu **định lý xung lượng**: J = F·Δt = Δp.
- Áp dụng **định luật bảo toàn động lượng** cho hệ kín (không có ngoại lực).
- Phân biệt 2 loại **va chạm**: **đàn hồi** (bảo toàn KE và p) vs **mềm** (chỉ bảo toàn p, mất KE).
- Giải các bài toán va chạm 1D cơ bản: 2 vật va chạm trên đường thẳng.
- Hiểu ứng dụng: tên lửa, túi khí, gậy bida.

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) và [Lesson 04 — Công & năng lượng](../lesson-04-work-energy/).

---

## 1. Động lượng p

### 1.1. Định nghĩa

**Động lượng** (momentum) **p** = tích **khối lượng** × **vận tốc**:

\`\`\`
p = m · v
\`\`\`

Đơn vị: **kg·m/s**.

💡 **Ý nghĩa cụ thể**: động lượng đo "khả năng đẩy" của vật khi va chạm. Vật càng nặng và càng nhanh → động lượng càng lớn → khi đập vào vật khác sẽ "đẩy" mạnh hơn.

**Vì sao cần đại lượng này (mà không chỉ dùng vận tốc hoặc động năng)?** Vì:
- **Vận tốc** không tính tới khối lượng — 1 viên đạn nhỏ chạy 800 m/s vs 1 xe ben chạy 800 m/s đập khác nhau dù cùng v.
- **Động năng KE = (1/2)mv²** đo "năng lượng" — nhưng trong va chạm, "khả năng đẩy" khác với "năng lượng". Bằng chứng: động lượng được **bảo toàn trong mọi va chạm**, còn động năng thì chỉ bảo toàn trong va chạm đàn hồi.

→ p và KE là 2 đại lượng **bổ sung cho nhau**, mô tả các khía cạnh khác nhau của chuyển động.

**Có hướng** (vector): p có cùng hướng với v.

### 1.2. Bốn ví dụ con số

**Ví dụ 1 — Ô tô 1500 kg chạy 20 m/s**: p = 1500 × 20 = **30,000 kg·m/s**.

**Ví dụ 2 — Viên đạn 10 g bay 800 m/s**: p = 0.01 × 800 = **8 kg·m/s**.

**Ví dụ 3 — Xe đẩy 100 kg chạy 2 m/s**: p = **200 kg·m/s**.

**Ví dụ 4 — Hạt photon**: photon không có khối lượng nhưng có động lượng p = E/c. Đó là tại sao ánh sáng có thể "đẩy" (radiation pressure) — cánh buồm mặt trời hoạt động.

### 1.3. So sánh động lượng và động năng

| | Động lượng p | Động năng KE |
|---|--------------|----------------|
| **Công thức** | m·v | (1/2)·m·v² |
| **Đơn vị** | kg·m/s | J |
| **Vector/scalar** | Vector (có hướng) | Scalar |
| **Phụ thuộc v** | Tuyến tính | Bình phương |
| **Bảo toàn trong va chạm** | LUÔN (kín không ngoại lực) | Chỉ va chạm đàn hồi |

### 📝 Tóm tắt mục 1

- p = m·v, vector, đơn vị kg·m/s.
- p đo "khả năng đẩy", khác với KE (năng lượng).

---

## 2. Định lý xung lượng — Impulse

### 2.1. Phát biểu

**Xung lượng J** = lực × khoảng thời gian tác dụng:
\`\`\`
J = F · Δt
\`\`\`

**Định lý xung lượng**: xung lượng tác dụng lên vật bằng độ biến thiên động lượng:
\`\`\`
J = Δp = m·v_cuối − m·v_đầu
\`\`\`

💡 **Ý nghĩa**: Định lý này có thể coi như "định luật II Newton phát biểu lại theo p":
- Định luật II cũ: F = m·a = m·(Δv/Δt) → F·Δt = m·Δv = Δp → **F = Δp/Δt**.
- Đại lượng "tốc độ thay đổi động lượng" = lực.

**Vì sao hữu ích?** Ứng dụng thực tế trong **giảm sốc**:
- Cùng Δp (vd dừng xe), nhưng nếu Δt dài (phanh từ từ) thì F nhỏ. Nếu Δt ngắn (va chạm) thì F lớn.
- Đây là nguyên lý túi khí, ván trượt thủy, đệm nhảy: kéo dài Δt để giảm F.

### 2.2. Ví dụ — Túi khí ô tô

Người 70 kg bay với v = 20 m/s khi xe đột tông. Tính lực tác dụng lên người:

a) **Không có túi khí** (dừng trong 0.05 s do va vào vô lăng):
- Δp = 70 × (0 − 20) = −1400 kg·m/s.
- F = Δp/Δt = −1400/0.05 = **−28,000 N** (28 kN — rất nguy hiểm, gãy xương).

b) **Có túi khí** (dừng trong 0.3 s do túi khí phồng và xẹp dần):
- F = −1400/0.3 = **−4,667 N** (4.7 kN — đáng kể nhưng sống được).

→ Túi khí **kéo dài thời gian va chạm 6 lần** → giảm lực 6 lần. Đó là cứu mạng.

### 📝 Tóm tắt mục 2

- J = F·Δt = Δp.
- Kéo dài Δt → giảm F (nguyên lý túi khí, đệm).

---

## 3. Định luật bảo toàn động lượng

### 3.1. Phát biểu

**Trong một hệ KÍN không chịu ngoại lực (hoặc tổng ngoại lực = 0), tổng động lượng của hệ là HẰNG SỐ**:

\`\`\`
p_trước = p_sau
m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'  (cho 2 vật)
\`\`\`

💡 **Ý nghĩa**: nếu 2 vật va chạm/tương tác chỉ với nhau (không có lực ngoài), tổng động lượng trước = sau. Lý do: theo định luật III, lực 2 vật tác dụng lên nhau bằng và ngược → tổng Δp = 0.

**Vì sao quan trọng?** Định luật này hoạt động **trong cả các trường hợp KE không bảo toàn**. Nó là công cụ chính để giải các bài va chạm.

### 3.2. Ứng dụng — Tên lửa

Tên lửa hoạt động nhờ bảo toàn động lượng. Trước khi phụt: tên lửa + nhiên liệu đứng yên (p_tổng = 0). Sau khi phụt khí xuống với vận tốc lớn:
- p_khí (xuống) + p_tên_lửa (lên) = 0.
- → tên lửa "bị đẩy" lên với động lượng bằng và ngược với khí.

Không cần "đẩy vào không khí" — tên lửa hoạt động cả trong chân không. Đây là tại sao tàu vũ trụ bay được.

### 📝 Tóm tắt mục 3

- Hệ kín: tổng p bảo toàn. p_trước = p_sau.
- Áp dụng: va chạm, tên lửa, súng giật, bóng bida.

---

## 4. Va chạm

### 4.1. Hai loại va chạm

| Loại | Bảo toàn p | Bảo toàn KE | Ví dụ |
|------|------------|--------------|-------|
| **Đàn hồi (elastic)** | ✓ | ✓ | Bida (gần đúng), bóng bàn, hạt cơ bản |
| **Mềm (inelastic)** | ✓ | ✗ (1 phần mất thành nhiệt, biến dạng) | Xe tông, đạn cắm vào vật |
| **Hoàn toàn mềm** | ✓ | ✗ (mất tối đa) | 2 vật dính vào nhau sau va chạm |

### 4.2. Va chạm đàn hồi 1 chiều

Hai vật m₁, m₂ với vận tốc v₁, v₂ va chạm đàn hồi. Sau va chạm v₁', v₂':

**Bảo toàn p**: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'.
**Bảo toàn KE**: (1/2)m₁v₁² + (1/2)m₂v₂² = (1/2)m₁v₁'² + (1/2)m₂v₂'².

Giải hệ phương trình → công thức gọn:
\`\`\`
v₁' = ((m₁ − m₂)v₁ + 2m₂v₂) / (m₁ + m₂)
v₂' = ((m₂ − m₁)v₂ + 2m₁v₁) / (m₁ + m₂)
\`\`\`

**Trường hợp đặc biệt — 2 vật cùng khối lượng** (m₁ = m₂):
- v₁' = v₂, v₂' = v₁.
- → 2 vật **đổi vận tốc cho nhau!** Đây là pha tuyệt vời của bida: bóng đứng yên bị bóng khác đụng cùng khối lượng → bóng đứng yên chạy với v của bóng đụng, bóng đụng dừng lại.

### 4.3. Va chạm hoàn toàn mềm (2 vật dính nhau)

Sau va chạm 2 vật có cùng vận tốc v_chung:
\`\`\`
m₁v₁ + m₂v₂ = (m₁ + m₂)·v_chung
v_chung = (m₁v₁ + m₂v₂) / (m₁ + m₂)
\`\`\`

**Năng lượng mất**: ΔKE = KE_trước − KE_sau (luôn > 0 cho va chạm mềm).

### 4.4. Walk-through 3 ví dụ

**Ví dụ 1 — Bida đàn hồi đối xứng**: Bóng A (1 kg, 5 m/s) đập bóng B (1 kg, 0 m/s) đứng yên.
- m₁ = m₂ → v₁' = 0, v₂' = 5 m/s.
- → A dừng, B chạy 5 m/s. Pha "stun shot" trong bida.

**Ví dụ 2 — Xe tải tông xe con (hoàn toàn mềm)**: Xe tải 5000 kg, 20 m/s tông xe con 1000 kg đứng yên. 2 xe dính nhau.
- v_chung = (5000·20 + 1000·0)/(5000+1000) = 100000/6000 = **16.67 m/s**.
- KE_trước = 0.5·5000·400 = 1,000,000 J.
- KE_sau = 0.5·6000·277.8 = 833,400 J.
- ΔKE_mất ≈ **166,600 J** (16.7% biến thành tiếng "rầm", biến dạng kim loại, nhiệt).

**Ví dụ 3 — Đạn cắm vào khối gỗ**: Đạn 20 g bay 400 m/s cắm vào khối gỗ 4 kg đứng yên trên ray trơn (không ma sát).
- v_chung = (0.02·400 + 4·0)/(0.02+4) = 8/4.02 ≈ **1.99 m/s**.
- → Đạn + gỗ trượt với 1.99 m/s sau va chạm.
- ΔKE_mất = 0.5·0.02·160000 − 0.5·4.02·3.96 ≈ 1600 − 7.96 = **~ 1592 J** mất (nhiệt, biến dạng).

### 📝 Tóm tắt mục 4

- Đàn hồi: bảo toàn cả p và KE. m₁ = m₂ → đổi vận tốc.
- Mềm: chỉ bảo toàn p. KE mất biến thành nhiệt/biến dạng.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính động lượng của một quả bóng 0.5 kg bay với v = 30 m/s.

**Bài 2**: Một quả bóng 0.4 kg đập vào tường với v = 10 m/s, dội ngược lại với v = 8 m/s trong 0.05 giây. Tính lực trung bình tường tác dụng lên bóng.

**Bài 3**: Súng 5 kg bắn đạn 0.02 kg với vận tốc 400 m/s. Tính vận tốc giật của súng.

**Bài 4**: Hai xe đẩy: A (2 kg, 4 m/s) và B (3 kg, −2 m/s, đi ngược) va chạm đàn hồi. Tính v_A', v_B'.

**Bài 5**: Đạn 10 g bay 500 m/s cắm vào khối gỗ 2 kg treo. Sau va chạm, hệ đu lên cao bao nhiêu?

**Bài 6**: Vì sao đập đầu vào sàn cứng nguy hiểm hơn nhiều so với đập vào đệm?

### Lời giải

**Bài 1**: p = 0.5 × 30 = **15 kg·m/s**.

**Bài 2**: Δp = 0.4·(−8) − 0.4·10 = −3.2 − 4 = −7.2 kg·m/s. F = Δp/Δt = −7.2/0.05 = **−144 N** (hướng ngược chiều ban đầu, tức là dội).

**Bài 3**: Bảo toàn p: m_đạn·v_đạn + m_súng·v_súng = 0 → 0.02·400 + 5·v_súng = 0 → v_súng = **−1.6 m/s** (súng giật ngược lại 1.6 m/s).

**Bài 4**: m_A = 2, m_B = 3.
- v_A' = ((2-3)·4 + 2·3·(-2))/5 = (-4 - 12)/5 = **-3.2 m/s** (dội ngược).
- v_B' = ((3-2)·(-2) + 2·2·4)/5 = (-2 + 16)/5 = **+2.8 m/s** (đổi chiều, đi cùng chiều A ban đầu).
- Kiểm tra p: trước = 2·4 + 3·(-2) = 2; sau = 2·(-3.2) + 3·2.8 = -6.4 + 8.4 = 2 ✓.
- Kiểm tra KE: trước = 16+6 = 22; sau = 10.24+11.76 = 22 ✓.

**Bài 5**: 
- Sau cắm (va chạm hoàn toàn mềm): v_chung = (0.01·500)/(0.01+2) = 5/2.01 ≈ 2.488 m/s.
- KE sau cắm = 0.5·2.01·2.488² = 6.22 J.
- Đu lên cao h: 0.5·2.01·v² = 2.01·g·h → h = v²/(2g) = 6.19/19.6 ≈ **0.316 m = 31.6 cm**.

**Bài 6**: Theo định lý xung lượng F·Δt = Δp. Đầu rơi xuống có cùng Δp dù đập vào gì. **Đệm** kéo dài thời gian dừng Δt (lớn) → F nhỏ → ít hại. **Sàn cứng** dừng đầu trong khoảnh khắc Δt cực ngắn → F cực lớn → gãy xương, chấn thương. Đây cũng là nguyên lý của túi khí ô tô và ván nhảy đệm xốp.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 06 — Chuyển động tròn](../lesson-06-circular-motion/) — lực hướng tâm và quỹ đạo hành tinh.

---

## 📝 Tổng kết Lesson 05

1. **Động lượng p = m·v** (vector). Khác với KE — đo "khả năng đẩy", không phải năng lượng.
2. **Xung lượng J = F·Δt = Δp**. Kéo dài Δt → giảm F (túi khí, đệm).
3. **Bảo toàn p** trong hệ kín. Áp dụng: va chạm, tên lửa, súng giật.
4. **Va chạm đàn hồi**: bảo toàn p và KE. m₁ = m₂ → đổi vận tốc.
5. **Va chạm mềm**: chỉ bảo toàn p. KE mất → nhiệt, biến dạng.

**Tiếp theo**: [Lesson 06 — Chuyển động tròn](../lesson-06-circular-motion/)
`;
