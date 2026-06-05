# Lesson 05 — Động lượng & Va chạm

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

```
p = m · v
```

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

### ⚠ Lỗi thường gặp

- **Lẫn động lượng p = mv với động năng KE = ½mv²**: p (vector, ∝ v) đo "đà"; KE (scalar, ∝ v²) đo năng lượng. Trong va chạm mềm, p bảo toàn nhưng KE mất. Đừng dùng lẫn.
- **Quên động lượng là vector (có hướng)**: hai vật cùng tốc độ ngược chiều có tổng động lượng nhỏ (triệt tiêu một phần). Phản ví dụ: A (2 kg, +5 m/s) và B (2 kg, −5 m/s) → tổng p = 10 − 10 = **0**, không phải 20.
- **Dùng đơn vị sai**: p đơn vị kg·m/s, không phải N hay J. Phải dùng v bằng m/s (đổi km/h trước).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao cần động lượng khi đã có động năng?"* Vì chúng bảo toàn trong các điều kiện khác nhau. Động lượng bảo toàn trong **mọi** va chạm (hệ kín); động năng chỉ bảo toàn trong va chạm đàn hồi. Để giải va chạm mềm (xe tông) phải dùng p, không dùng KE.
- *"Viên đạn nhẹ vs xe tải nặng — cái nào động lượng lớn hơn?"* Tùy tốc độ. Đạn 10 g bay 800 m/s có p = 8 kg·m/s; xe tải 5000 kg chạy 20 m/s có p = 100,000 kg·m/s. Khối lượng lớn thường thắng vì p tỉ lệ thuận m.
- *"Ánh sáng không có khối lượng sao có động lượng?"* Photon có p = E/c dù m = 0 (cơ học lượng tử/tương đối). Đó là vì sao ánh sáng "đẩy" được — cánh buồm mặt trời dùng áp suất bức xạ.

🔁 **Dừng lại tự kiểm tra**

1. Tính động lượng của xe 1000 kg chạy 25 m/s.
2. Hai vật: A (3 kg, +4 m/s) và B (2 kg, −6 m/s). Tổng động lượng của hệ?

<details><summary>Đáp án</summary>

1. p = m·v = 1000·25 = **25,000 kg·m/s**.
2. p_tổng = 3·4 + 2·(−6) = 12 − 12 = **0 kg·m/s** (triệt tiêu vì ngược chiều).

</details>

### 📝 Tóm tắt mục 1

- p = m·v, vector, đơn vị kg·m/s.
- p đo "khả năng đẩy", khác với KE (năng lượng).

---

## 2. Định lý xung lượng — Impulse

### 2.1. Phát biểu

**Xung lượng J** = lực × khoảng thời gian tác dụng:
```
J = F · Δt
```

**Định lý xung lượng**: xung lượng tác dụng lên vật bằng độ biến thiên động lượng:
```
J = Δp = m·v_cuối − m·v_đầu
```

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

### ⚠ Lỗi thường gặp

- **Quên dấu khi vật dội ngược**: bóng đập tường v=+10, dội v=−8 → Δv = −8 − 10 = −18 (không phải −2 hay +2). Δp = m·Δv = m·(−18). Nếu chỉ tính "10−8=2" → sai hoàn toàn, vì bỏ qua đổi hướng.
- **Nghĩ "lực lớn = nguy hiểm" mà quên thời gian**: cùng Δp, lực phụ thuộc Δt (F = Δp/Δt). Va chạm cứng (Δt nhỏ) → F khổng lồ; có đệm (Δt lớn) → F nhỏ. Đây là chìa khóa an toàn.
- **Lẫn xung lượng J (kg·m/s, = Δp) với lực F (N)**: J là lực **tích trong thời gian**, đơn vị khác lực.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Túi khí, đệm xốp, gập gối khi tiếp đất — vì sao đều an toàn hơn?"* Tất cả **kéo dài thời gian dừng** Δt. Cùng động lượng cần triệt tiêu (Δp), Δt lớn → lực F = Δp/Δt nhỏ → ít chấn thương. Sàn cứng dừng trong khoảnh khắc → F cực lớn → gãy xương.
- *"Vì sao bóng dội ngược 'đập' mạnh hơn bóng dính lại?"* Vì dội ngược đổi hướng vận tốc → Δp lớn hơn (từ +v đến −v', chênh v+v') so với dính lại (từ +v đến 0). Δp lớn hơn → xung lượng và lực lớn hơn.
- *"Định lý xung lượng có phải định luật mới không?"* Không — chỉ là định luật II Newton viết lại: F = ma = m·Δv/Δt → F·Δt = m·Δv = Δp. Tiện hơn khi lực biến thiên nhanh trong thời gian ngắn (va chạm).

🔁 **Dừng lại tự kiểm tra**

1. Bóng 0.2 kg bay vào tường v = 15 m/s, dội ngược v = 12 m/s. Tính độ biến thiên động lượng.
2. Nếu va chạm trên kéo dài 0.02 s, lực trung bình tường tác dụng lên bóng?

<details><summary>Đáp án</summary>

1. Δp = m·(v_cuối − v_đầu) = 0.2·(−12 − 15) = 0.2·(−27) = **−5.4 kg·m/s**.
2. F = Δp/Δt = −5.4/0.02 = **−270 N** (hướng ngược chiều bóng tới, tức đẩy ra).

</details>

### 📝 Tóm tắt mục 2

- J = F·Δt = Δp.
- Kéo dài Δt → giảm F (nguyên lý túi khí, đệm).

---

## 3. Định luật bảo toàn động lượng

### 3.1. Phát biểu

**Trong một hệ KÍN không chịu ngoại lực (hoặc tổng ngoại lực = 0), tổng động lượng của hệ là HẰNG SỐ**:

```
p_trước = p_sau
m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'  (cho 2 vật)
```

💡 **Ý nghĩa**: nếu 2 vật va chạm/tương tác chỉ với nhau (không có lực ngoài), tổng động lượng trước = sau. Lý do: theo định luật III, lực 2 vật tác dụng lên nhau bằng và ngược → tổng Δp = 0.

**Vì sao quan trọng?** Định luật này hoạt động **trong cả các trường hợp KE không bảo toàn**. Nó là công cụ chính để giải các bài va chạm.

### 3.2. Ứng dụng — Tên lửa

Tên lửa hoạt động nhờ bảo toàn động lượng. Trước khi phụt: tên lửa + nhiên liệu đứng yên (p_tổng = 0). Sau khi phụt khí xuống với vận tốc lớn:
- p_khí (xuống) + p_tên_lửa (lên) = 0.
- → tên lửa "bị đẩy" lên với động lượng bằng và ngược với khí.

Không cần "đẩy vào không khí" — tên lửa hoạt động cả trong chân không. Đây là tại sao tàu vũ trụ bay được.

### ⚠ Lỗi thường gặp

- **Áp dụng bảo toàn p khi có ngoại lực đáng kể**: nếu hệ chịu ngoại lực (vd ma sát lớn với sàn, lực bên ngoài) thì p **không** bảo toàn cho riêng hệ đó. Bảo toàn chỉ đúng cho hệ **kín** (tổng ngoại lực = 0) hoặc trong thời gian va chạm rất ngắn (ngoại lực chưa kịp tác động).
- **Quên dấu vận tốc trước/sau**: viết m₁v₁ + m₂v₂ = ... phải dùng dấu đúng. Vật đi ngược chiều mang v âm. Phản ví dụ: bỏ dấu của vật đi ngược → tổng p sai.
- **Nghĩ p bảo toàn nghĩa là vận tốc không đổi**: không. Vận tốc từng vật thay đổi sau va chạm, chỉ **tổng** p của hệ giữ nguyên.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Tên lửa đẩy vào cái gì trong chân không?"* Không đẩy vào gì cả — nó đẩy chính **khí phụt ra**. Khí bị đẩy xuống mang động lượng xuống; theo bảo toàn, tên lửa nhận động lượng lên bằng và ngược. Không cần không khí.
- *"Vì sao súng giật ngược khi bắn?"* Trước khi bắn p = 0. Đạn bay tới mang động lượng dương → súng phải mang động lượng âm (giật ngược) để tổng p giữ = 0. Súng nặng hơn đạn nhiều nên vận tốc giật nhỏ.
- *"Bảo toàn p và bảo toàn năng lượng — dùng cái nào?"* p luôn bảo toàn trong va chạm hệ kín → dùng trước tiên. Năng lượng (KE) chỉ bảo toàn nếu va chạm đàn hồi. Va chạm mềm: chỉ dùng p.

🔁 **Dừng lại tự kiểm tra**

1. Súng 4 kg bắn đạn 0.01 kg với 500 m/s. Vận tốc giật của súng?
2. Người 60 kg đứng yên trên ván trượt (không ma sát), ném quả bóng 2 kg về trước với 5 m/s. Người chuyển động thế nào?

<details><summary>Đáp án</summary>

1. Bảo toàn p: 0 = 0.01·500 + 4·v → v = −5/4 = **−1.25 m/s** (giật ngược).
2. Trước: p = 0. Sau: bóng có p = 2·5 = +10 → người phải có p = −10 → v = −10/60 ≈ **−0.17 m/s** (lùi về sau).

</details>

### 📝 Tóm tắt mục 3

- Hệ kín: tổng p bảo toàn. p_trước = p_sau.
- Áp dụng: va chạm, tên lửa, súng giật, bóng bida.

---

## 4. Va chạm

💡 **Trực giác / Hình dung**: hình dung hai thái cực. Va chạm **đàn hồi** như hai quả bida bằng thép: chạm "cách" rồi bật ra, không méo mó, không nóng lên — năng lượng chuyển động được bảo toàn nguyên vẹn. Va chạm **mềm** như hai cục đất sét: chạm "bịch" rồi dính, méo mó, nóng lên — một phần năng lượng chuyển động "biến mất" thành biến dạng và nhiệt. Điểm chung: cả hai đều bảo toàn **động lượng**; chỉ khác ở chỗ động năng có còn nguyên hay không.

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
```
v₁' = ((m₁ − m₂)v₁ + 2m₂v₂) / (m₁ + m₂)
v₂' = ((m₂ − m₁)v₂ + 2m₁v₁) / (m₁ + m₂)
```

**Trường hợp đặc biệt — 2 vật cùng khối lượng** (m₁ = m₂):
- v₁' = v₂, v₂' = v₁.
- → 2 vật **đổi vận tốc cho nhau!** Đây là pha tuyệt vời của bida: bóng đứng yên bị bóng khác đụng cùng khối lượng → bóng đứng yên chạy với v của bóng đụng, bóng đụng dừng lại.

### 4.3. Va chạm hoàn toàn mềm (2 vật dính nhau)

Sau va chạm 2 vật có cùng vận tốc v_chung:
```
m₁v₁ + m₂v₂ = (m₁ + m₂)·v_chung
v_chung = (m₁v₁ + m₂v₂) / (m₁ + m₂)
```

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

### ⚠ Lỗi thường gặp

- **Dùng bảo toàn KE cho va chạm mềm**: SAI — va chạm mềm **mất** động năng (thành nhiệt, biến dạng). Chỉ va chạm đàn hồi mới bảo toàn KE. Phản ví dụ: xe tông dính nhau mà giả định KE bảo toàn → ra vận tốc sai.
- **Nghĩ "bảo toàn động lượng" nghĩa là "bảo toàn năng lượng"**: hai cái khác nhau. p bảo toàn trong mọi va chạm hệ kín; KE chỉ bảo toàn khi đàn hồi. Va chạm mềm: p bảo toàn, KE giảm.
- **Quên năng lượng mất không vi phạm bảo toàn năng lượng tổng**: KE "mất" chuyển thành nhiệt/âm thanh/biến dạng — tổng năng lượng vẫn bảo toàn, chỉ rời khỏi dạng động năng.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Va chạm mềm mất năng lượng — vậy có vi phạm bảo toàn năng lượng không?"* Không. Động năng "mất" biến thành nhiệt (kim loại nóng lên), âm thanh ("rầm"), và biến dạng vĩnh viễn. Tổng năng lượng vẫn bảo toàn, chỉ là KE chuyển sang dạng khác.
- *"Vì sao hai vật cùng khối lượng va chạm đàn hồi lại đổi vận tốc cho nhau?"* Giải hệ hai phương trình (bảo toàn p và KE) với m₁=m₂ ra đúng v₁'=v₂, v₂'=v₁. Trực giác: bida — bóng đang chạy đụng bóng đứng yên cùng cỡ → bóng chạy dừng lại, bóng đứng yên chạy đi (stun shot).
- *"Khi nào va chạm là đàn hồi, khi nào mềm?"* Đàn hồi (xấp xỉ): vật cứng, bật ra không méo — bida, bóng cao su, hạt cơ bản. Mềm: vật biến dạng, dính, phát nhiệt — xe tông, đạn cắm gỗ, đất sét. Thực tế đa số va chạm thường có chút mất KE (không hoàn toàn đàn hồi).

🔁 **Dừng lại tự kiểm tra**

1. Vật A (2 kg, 6 m/s) va chạm hoàn toàn mềm với B (4 kg, đứng yên), dính nhau. Vận tốc chung sau va chạm?
2. Trong va chạm đàn hồi, A (1 kg, 8 m/s) đụng B (1 kg, đứng yên). Vận tốc của A và B sau va chạm?

<details><summary>Đáp án</summary>

1. v_chung = (m_A·v_A + m_B·v_B)/(m_A+m_B) = (2·6 + 4·0)/6 = 12/6 = **2 m/s**.
2. Cùng khối lượng, đàn hồi → đổi vận tốc: A dừng (**0 m/s**), B chạy (**8 m/s**).

</details>

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
