// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-05-momentum-collisions/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Động lượng & Va chạm

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **động lượng $p = m \\cdot v$** — đại lượng khác động năng, đo "khả năng đẩy" của một vật.
- Phát biểu **định lý xung lượng**: $J = F \\cdot \\Delta t = \\Delta p$.
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

$$p = m \\cdot v$$

Đơn vị: **kg·m/s**.

💡 **Ý nghĩa cụ thể**: động lượng đo "khả năng đẩy" của vật khi va chạm. Vật càng nặng và càng nhanh → động lượng càng lớn → khi đập vào vật khác sẽ "đẩy" mạnh hơn.

**Vì sao cần đại lượng này (mà không chỉ dùng vận tốc hoặc động năng)?** Vì:
- **Vận tốc** không tính tới khối lượng — 1 viên đạn nhỏ chạy 800 m/s vs 1 xe ben chạy 800 m/s đập khác nhau dù cùng v.
- **Động năng $KE = \\frac{1}{2}mv^2$** đo "năng lượng" — nhưng trong va chạm, "khả năng đẩy" khác với "năng lượng". Bằng chứng: động lượng được **bảo toàn trong mọi va chạm**, còn động năng thì chỉ bảo toàn trong va chạm đàn hồi.

→ p và KE là 2 đại lượng **bổ sung cho nhau**, mô tả các khía cạnh khác nhau của chuyển động.

**Có hướng** (vector): p có cùng hướng với v.

### 1.2. Bốn ví dụ con số

**Ví dụ 1 — Ô tô 1500 kg chạy 20 m/s**: $p = 1500 \\times 20 = $ **30,000 kg·m/s**.

**Ví dụ 2 — Viên đạn 10 g bay 800 m/s**: $p = 0{,}01 \\times 800 = $ **8 kg·m/s**.

**Ví dụ 3 — Xe đẩy 100 kg chạy 2 m/s**: p = **200 kg·m/s**.

**Ví dụ 4 — Hạt photon**: photon không có khối lượng nhưng có động lượng $p = \\frac{E}{c}$. Đó là tại sao ánh sáng có thể "đẩy" (radiation pressure) — cánh buồm mặt trời hoạt động.

### 1.3. So sánh động lượng và động năng

| | Động lượng p | Động năng KE |
|---|--------------|----------------|
| **Công thức** | $m \\cdot v$ | $\\frac{1}{2} \\cdot m \\cdot v^2$ |
| **Đơn vị** | kg·m/s | J |
| **Vector/scalar** | Vector (có hướng) | Scalar |
| **Phụ thuộc v** | Tuyến tính | Bình phương |
| **Bảo toàn trong va chạm** | LUÔN (kín không ngoại lực) | Chỉ va chạm đàn hồi |

### ⚠ Lỗi thường gặp

- **Lẫn động lượng $p = mv$ với động năng $KE = \\frac{1}{2}mv^2$**: p (vector, $\\propto v$) đo "đà"; KE (scalar, $\\propto v^2$) đo năng lượng. Trong va chạm mềm, p bảo toàn nhưng KE mất. Đừng dùng lẫn.
- **Quên động lượng là vector (có hướng)**: hai vật cùng tốc độ ngược chiều có tổng động lượng nhỏ (triệt tiêu một phần). Phản ví dụ: A (2 kg, +5 m/s) và B (2 kg, −5 m/s) → tổng $p = 10 - 10 = $ **0**, không phải 20.
- **Dùng đơn vị sai**: p đơn vị kg·m/s, không phải N hay J. Phải dùng v bằng m/s (đổi km/h trước).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao cần động lượng khi đã có động năng?"* Vì chúng bảo toàn trong các điều kiện khác nhau. Động lượng bảo toàn trong **mọi** va chạm (hệ kín); động năng chỉ bảo toàn trong va chạm đàn hồi. Để giải va chạm mềm (xe tông) phải dùng p, không dùng KE.
- *"Viên đạn nhẹ vs xe tải nặng — cái nào động lượng lớn hơn?"* Tùy tốc độ. Đạn 10 g bay 800 m/s có p = 8 kg·m/s; xe tải 5000 kg chạy 20 m/s có p = 100,000 kg·m/s. Khối lượng lớn thường thắng vì p tỉ lệ thuận m.
- *"Ánh sáng không có khối lượng sao có động lượng?"* Photon có p = E/c dù m = 0 (cơ học lượng tử/tương đối). Đó là vì sao ánh sáng "đẩy" được — cánh buồm mặt trời dùng áp suất bức xạ.

🔁 **Dừng lại tự kiểm tra**

1. Tính động lượng của xe 1000 kg chạy 25 m/s.
2. Hai vật: A (3 kg, +4 m/s) và B (2 kg, −6 m/s). Tổng động lượng của hệ?

<details><summary>Đáp án</summary>

1. $p = m \\cdot v = 1000 \\cdot 25 = $ **25,000 kg·m/s**.
2. $p_{tổng} = 3 \\cdot 4 + 2 \\cdot (-6) = 12 - 12 = $ **0 kg·m/s** (triệt tiêu vì ngược chiều).

</details>

### 📝 Tóm tắt mục 1

- $p = m \\cdot v$, vector, đơn vị kg·m/s.
- p đo "khả năng đẩy", khác với KE (năng lượng).

---

## 2. Định lý xung lượng — Impulse

### 2.1. Phát biểu

**Xung lượng J** = lực × khoảng thời gian tác dụng:

$$J = F \\cdot \\Delta t$$

**Định lý xung lượng**: xung lượng tác dụng lên vật bằng độ biến thiên động lượng:

$$J = \\Delta p = m \\cdot v_{cuối} - m \\cdot v_{đầu}$$

💡 **Ý nghĩa**: Định lý này có thể coi như "định luật II Newton phát biểu lại theo p":
- Định luật II cũ: $F = m \\cdot a = m \\cdot \\frac{\\Delta v}{\\Delta t} \\to F \\cdot \\Delta t = m \\cdot \\Delta v = \\Delta p \\to$ **$F = \\frac{\\Delta p}{\\Delta t}$**.
- Đại lượng "tốc độ thay đổi động lượng" = lực.

**Vì sao hữu ích?** Ứng dụng thực tế trong **giảm sốc**:
- Cùng $\\Delta p$ (vd dừng xe), nhưng nếu $\\Delta t$ dài (phanh từ từ) thì F nhỏ. Nếu $\\Delta t$ ngắn (va chạm) thì F lớn.
- Đây là nguyên lý túi khí, ván trượt thủy, đệm nhảy: kéo dài $\\Delta t$ để giảm F.

### 2.2. Ví dụ — Túi khí ô tô

Người 70 kg bay với v = 20 m/s khi xe đột tông. Tính lực tác dụng lên người:

a) **Không có túi khí** (dừng trong 0.05 s do va vào vô lăng):
- $\\Delta p = 70 \\times (0 - 20) = -1400$ kg·m/s.
- $F = \\frac{\\Delta p}{\\Delta t} = \\frac{-1400}{0{,}05} = $ **−28,000 N** (28 kN — rất nguy hiểm, gãy xương).

b) **Có túi khí** (dừng trong 0.3 s do túi khí phồng và xẹp dần):
- $F = \\frac{-1400}{0{,}3} = $ **−4,667 N** (4.7 kN — đáng kể nhưng sống được).

→ Túi khí **kéo dài thời gian va chạm 6 lần** → giảm lực 6 lần. Đó là cứu mạng.

### ⚠ Lỗi thường gặp

- **Quên dấu khi vật dội ngược**: bóng đập tường $v = +10$, dội $v = -8 \\to \\Delta v = -8 - 10 = -18$ (không phải −2 hay +2). $\\Delta p = m \\cdot \\Delta v = m \\cdot (-18)$. Nếu chỉ tính "10−8=2" → sai hoàn toàn, vì bỏ qua đổi hướng.
- **Nghĩ "lực lớn = nguy hiểm" mà quên thời gian**: cùng $\\Delta p$, lực phụ thuộc $\\Delta t$ ($F = \\frac{\\Delta p}{\\Delta t}$). Va chạm cứng ($\\Delta t$ nhỏ) → F khổng lồ; có đệm ($\\Delta t$ lớn) → F nhỏ. Đây là chìa khóa an toàn.
- **Lẫn xung lượng J (kg·m/s, $= \\Delta p$) với lực F (N)**: J là lực **tích trong thời gian**, đơn vị khác lực.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Túi khí, đệm xốp, gập gối khi tiếp đất — vì sao đều an toàn hơn?"* Tất cả **kéo dài thời gian dừng** $\\Delta t$. Cùng động lượng cần triệt tiêu ($\\Delta p$), $\\Delta t$ lớn → lực $F = \\frac{\\Delta p}{\\Delta t}$ nhỏ → ít chấn thương. Sàn cứng dừng trong khoảnh khắc → F cực lớn → gãy xương.
- *"Vì sao bóng dội ngược 'đập' mạnh hơn bóng dính lại?"* Vì dội ngược đổi hướng vận tốc → $\\Delta p$ lớn hơn (từ $+v$ đến $-v'$, chênh $v + v'$) so với dính lại (từ $+v$ đến 0). $\\Delta p$ lớn hơn → xung lượng và lực lớn hơn.
- *"Định lý xung lượng có phải định luật mới không?"* Không — chỉ là định luật II Newton viết lại: $F = ma = m \\cdot \\frac{\\Delta v}{\\Delta t} \\to F \\cdot \\Delta t = m \\cdot \\Delta v = \\Delta p$. Tiện hơn khi lực biến thiên nhanh trong thời gian ngắn (va chạm).

🔁 **Dừng lại tự kiểm tra**

1. Bóng 0.2 kg bay vào tường v = 15 m/s, dội ngược v = 12 m/s. Tính độ biến thiên động lượng.
2. Nếu va chạm trên kéo dài 0.02 s, lực trung bình tường tác dụng lên bóng?

<details><summary>Đáp án</summary>

1. $\\Delta p = m \\cdot (v_{cuối} - v_{đầu}) = 0{,}2 \\cdot (-12 - 15) = 0{,}2 \\cdot (-27) = $ **−5.4 kg·m/s**.
2. $F = \\frac{\\Delta p}{\\Delta t} = \\frac{-5{,}4}{0{,}02} = $ **−270 N** (hướng ngược chiều bóng tới, tức đẩy ra).

</details>

### 📝 Tóm tắt mục 2

- $J = F \\cdot \\Delta t = \\Delta p$.
- Kéo dài $\\Delta t$ → giảm F (nguyên lý túi khí, đệm).

---

## 3. Định luật bảo toàn động lượng

### 3.1. Phát biểu

**Trong một hệ KÍN không chịu ngoại lực (hoặc tổng ngoại lực = 0), tổng động lượng của hệ là HẰNG SỐ**:

$$\\begin{aligned}
p_{trước} &= p_{sau} \\\\
m_1 v_1 + m_2 v_2 &= m_1 v_1' + m_2 v_2' \\quad \\text{(cho 2 vật)}
\\end{aligned}$$

💡 **Ý nghĩa**: nếu 2 vật va chạm/tương tác chỉ với nhau (không có lực ngoài), tổng động lượng trước = sau. Lý do: theo định luật III, lực 2 vật tác dụng lên nhau bằng và ngược → tổng Δp = 0.

**Vì sao quan trọng?** Định luật này hoạt động **trong cả các trường hợp KE không bảo toàn**. Nó là công cụ chính để giải các bài va chạm.

### 3.2. Ứng dụng — Tên lửa

Tên lửa hoạt động nhờ bảo toàn động lượng. Trước khi phụt: tên lửa + nhiên liệu đứng yên (p_tổng = 0). Sau khi phụt khí xuống với vận tốc lớn:
- p_khí (xuống) + p_tên_lửa (lên) = 0.
- → tên lửa "bị đẩy" lên với động lượng bằng và ngược với khí.

Không cần "đẩy vào không khí" — tên lửa hoạt động cả trong chân không. Đây là tại sao tàu vũ trụ bay được.

### ⚠ Lỗi thường gặp

- **Áp dụng bảo toàn p khi có ngoại lực đáng kể**: nếu hệ chịu ngoại lực (vd ma sát lớn với sàn, lực bên ngoài) thì p **không** bảo toàn cho riêng hệ đó. Bảo toàn chỉ đúng cho hệ **kín** (tổng ngoại lực = 0) hoặc trong thời gian va chạm rất ngắn (ngoại lực chưa kịp tác động).
- **Quên dấu vận tốc trước/sau**: viết $m_1 v_1 + m_2 v_2 = \\ldots$ phải dùng dấu đúng. Vật đi ngược chiều mang v âm. Phản ví dụ: bỏ dấu của vật đi ngược → tổng p sai.
- **Nghĩ p bảo toàn nghĩa là vận tốc không đổi**: không. Vận tốc từng vật thay đổi sau va chạm, chỉ **tổng** p của hệ giữ nguyên.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Tên lửa đẩy vào cái gì trong chân không?"* Không đẩy vào gì cả — nó đẩy chính **khí phụt ra**. Khí bị đẩy xuống mang động lượng xuống; theo bảo toàn, tên lửa nhận động lượng lên bằng và ngược. Không cần không khí.
- *"Vì sao súng giật ngược khi bắn?"* Trước khi bắn p = 0. Đạn bay tới mang động lượng dương → súng phải mang động lượng âm (giật ngược) để tổng p giữ = 0. Súng nặng hơn đạn nhiều nên vận tốc giật nhỏ.
- *"Bảo toàn p và bảo toàn năng lượng — dùng cái nào?"* p luôn bảo toàn trong va chạm hệ kín → dùng trước tiên. Năng lượng (KE) chỉ bảo toàn nếu va chạm đàn hồi. Va chạm mềm: chỉ dùng p.

🔁 **Dừng lại tự kiểm tra**

1. Súng 4 kg bắn đạn 0.01 kg với 500 m/s. Vận tốc giật của súng?
2. Người 60 kg đứng yên trên ván trượt (không ma sát), ném quả bóng 2 kg về trước với 5 m/s. Người chuyển động thế nào?

<details><summary>Đáp án</summary>

1. Bảo toàn p: $0 = 0{,}01 \\cdot 500 + 4 \\cdot v \\to v = -\\frac{5}{4} = $ **−1.25 m/s** (giật ngược).
2. Trước: $p = 0$. Sau: bóng có $p = 2 \\cdot 5 = +10 \\to$ người phải có $p = -10 \\to v = \\frac{-10}{60} \\approx$ **−0.17 m/s** (lùi về sau).

</details>

### 📝 Tóm tắt mục 3

- Hệ kín: tổng p bảo toàn. $p_{trước} = p_{sau}$.
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

Hai vật $m_1, m_2$ với vận tốc $v_1, v_2$ va chạm đàn hồi. Sau va chạm $v_1', v_2'$:

**Bảo toàn p**: $m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$.
**Bảo toàn KE**: $\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}m_1 v_1'^2 + \\frac{1}{2}m_2 v_2'^2$.

Giải hệ phương trình → công thức gọn:

$$\\begin{aligned}
v_1' &= \\frac{(m_1 - m_2)v_1 + 2m_2 v_2}{m_1 + m_2} \\\\
v_2' &= \\frac{(m_2 - m_1)v_2 + 2m_1 v_1}{m_1 + m_2}
\\end{aligned}$$

**Trường hợp đặc biệt — 2 vật cùng khối lượng** ($m_1 = m_2$):
- $v_1' = v_2$, $v_2' = v_1$.
- → 2 vật **đổi vận tốc cho nhau!** Đây là pha tuyệt vời của bida: bóng đứng yên bị bóng khác đụng cùng khối lượng → bóng đứng yên chạy với v của bóng đụng, bóng đụng dừng lại.

### 4.3. Va chạm hoàn toàn mềm (2 vật dính nhau)

Sau va chạm 2 vật có cùng vận tốc $v_{chung}$:

$$\\begin{aligned}
m_1 v_1 + m_2 v_2 &= (m_1 + m_2) \\cdot v_{chung} \\\\
v_{chung} &= \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}
\\end{aligned}$$

**Năng lượng mất**: $\\Delta KE = KE_{trước} - KE_{sau}$ (luôn $> 0$ cho va chạm mềm).

### 4.4. Walk-through 3 ví dụ

**Ví dụ 1 — Bida đàn hồi đối xứng**: Bóng A (1 kg, 5 m/s) đập bóng B (1 kg, 0 m/s) đứng yên.
- $m_1 = m_2 \\to v_1' = 0$, $v_2' = 5$ m/s.
- → A dừng, B chạy 5 m/s. Pha "stun shot" trong bida.

**Ví dụ 2 — Xe tải tông xe con (hoàn toàn mềm)**: Xe tải 5000 kg, 20 m/s tông xe con 1000 kg đứng yên. 2 xe dính nhau.
- $v_{chung} = \\frac{5000 \\cdot 20 + 1000 \\cdot 0}{5000 + 1000} = \\frac{100000}{6000} = $ **16.67 m/s**.
- $KE_{trước} = 0{,}5 \\cdot 5000 \\cdot 400 = 1{,}000{,}000$ J.
- $KE_{sau} = 0{,}5 \\cdot 6000 \\cdot 277{,}8 = 833{,}400$ J.
- $\\Delta KE_{mất} \\approx$ **166,600 J** (16.7% biến thành tiếng "rầm", biến dạng kim loại, nhiệt).

**Ví dụ 3 — Đạn cắm vào khối gỗ**: Đạn 20 g bay 400 m/s cắm vào khối gỗ 4 kg đứng yên trên ray trơn (không ma sát).
- $v_{chung} = \\frac{0{,}02 \\cdot 400 + 4 \\cdot 0}{0{,}02 + 4} = \\frac{8}{4{,}02} \\approx$ **1.99 m/s**.
- → Đạn + gỗ trượt với 1.99 m/s sau va chạm.
- $\\Delta KE_{mất} = 0{,}5 \\cdot 0{,}02 \\cdot 160000 - 0{,}5 \\cdot 4{,}02 \\cdot 3{,}96 \\approx 1600 - 7{,}96 = $ **~ 1592 J** mất (nhiệt, biến dạng).

### ⚠ Lỗi thường gặp

- **Dùng bảo toàn KE cho va chạm mềm**: SAI — va chạm mềm **mất** động năng (thành nhiệt, biến dạng). Chỉ va chạm đàn hồi mới bảo toàn KE. Phản ví dụ: xe tông dính nhau mà giả định KE bảo toàn → ra vận tốc sai.
- **Nghĩ "bảo toàn động lượng" nghĩa là "bảo toàn năng lượng"**: hai cái khác nhau. p bảo toàn trong mọi va chạm hệ kín; KE chỉ bảo toàn khi đàn hồi. Va chạm mềm: p bảo toàn, KE giảm.
- **Quên năng lượng mất không vi phạm bảo toàn năng lượng tổng**: KE "mất" chuyển thành nhiệt/âm thanh/biến dạng — tổng năng lượng vẫn bảo toàn, chỉ rời khỏi dạng động năng.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Va chạm mềm mất năng lượng — vậy có vi phạm bảo toàn năng lượng không?"* Không. Động năng "mất" biến thành nhiệt (kim loại nóng lên), âm thanh ("rầm"), và biến dạng vĩnh viễn. Tổng năng lượng vẫn bảo toàn, chỉ là KE chuyển sang dạng khác.
- *"Vì sao hai vật cùng khối lượng va chạm đàn hồi lại đổi vận tốc cho nhau?"* Giải hệ hai phương trình (bảo toàn p và KE) với $m_1 = m_2$ ra đúng $v_1' = v_2$, $v_2' = v_1$. Trực giác: bida — bóng đang chạy đụng bóng đứng yên cùng cỡ → bóng chạy dừng lại, bóng đứng yên chạy đi (stun shot).
- *"Khi nào va chạm là đàn hồi, khi nào mềm?"* Đàn hồi (xấp xỉ): vật cứng, bật ra không méo — bida, bóng cao su, hạt cơ bản. Mềm: vật biến dạng, dính, phát nhiệt — xe tông, đạn cắm gỗ, đất sét. Thực tế đa số va chạm thường có chút mất KE (không hoàn toàn đàn hồi).

🔁 **Dừng lại tự kiểm tra**

1. Vật A (2 kg, 6 m/s) va chạm hoàn toàn mềm với B (4 kg, đứng yên), dính nhau. Vận tốc chung sau va chạm?
2. Trong va chạm đàn hồi, A (1 kg, 8 m/s) đụng B (1 kg, đứng yên). Vận tốc của A và B sau va chạm?

<details><summary>Đáp án</summary>

1. $v_{chung} = \\frac{m_A \\cdot v_A + m_B \\cdot v_B}{m_A + m_B} = \\frac{2 \\cdot 6 + 4 \\cdot 0}{6} = \\frac{12}{6} = $ **2 m/s**.
2. Cùng khối lượng, đàn hồi → đổi vận tốc: A dừng (**0 m/s**), B chạy (**8 m/s**).

</details>

### 📝 Tóm tắt mục 4

- Đàn hồi: bảo toàn cả p và KE. $m_1 = m_2$ → đổi vận tốc.
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

**Bài 1**: $p = 0{,}5 \\times 30 = $ **15 kg·m/s**.

**Bài 2**: $\\Delta p = 0{,}4 \\cdot (-8) - 0{,}4 \\cdot 10 = -3{,}2 - 4 = -7{,}2$ kg·m/s. $F = \\frac{\\Delta p}{\\Delta t} = \\frac{-7{,}2}{0{,}05} = $ **−144 N** (hướng ngược chiều ban đầu, tức là dội).

**Bài 3**: Bảo toàn p: $m_{đạn} \\cdot v_{đạn} + m_{súng} \\cdot v_{súng} = 0 \\to 0{,}02 \\cdot 400 + 5 \\cdot v_{súng} = 0 \\to v_{súng} = $ **−1.6 m/s** (súng giật ngược lại 1.6 m/s).

**Bài 4**: $m_A = 2$, $m_B = 3$.
- $v_A' = \\frac{(2-3) \\cdot 4 + 2 \\cdot 3 \\cdot (-2)}{5} = \\frac{-4 - 12}{5} = $ **-3.2 m/s** (dội ngược).
- $v_B' = \\frac{(3-2) \\cdot (-2) + 2 \\cdot 2 \\cdot 4}{5} = \\frac{-2 + 16}{5} = $ **+2.8 m/s** (đổi chiều, đi cùng chiều A ban đầu).
- Kiểm tra p: trước $= 2 \\cdot 4 + 3 \\cdot (-2) = 2$; sau $= 2 \\cdot (-3{,}2) + 3 \\cdot 2{,}8 = -6{,}4 + 8{,}4 = 2$ ✓.
- Kiểm tra KE: trước $= 16 + 6 = 22$; sau $= 10{,}24 + 11{,}76 = 22$ ✓.

**Bài 5**: 
- Sau cắm (va chạm hoàn toàn mềm): $v_{chung} = \\frac{0{,}01 \\cdot 500}{0{,}01 + 2} = \\frac{5}{2{,}01} \\approx 2{,}488$ m/s.
- KE sau cắm $= 0{,}5 \\cdot 2{,}01 \\cdot 2{,}488^2 = 6{,}22$ J.
- Đu lên cao h: $0{,}5 \\cdot 2{,}01 \\cdot v^2 = 2{,}01 \\cdot g \\cdot h \\to h = \\frac{v^2}{2g} = \\frac{6{,}19}{19{,}6} \\approx$ **0.316 m = 31.6 cm**.

**Bài 6**: Theo định lý xung lượng $F \\cdot \\Delta t = \\Delta p$. Đầu rơi xuống có cùng $\\Delta p$ dù đập vào gì. **Đệm** kéo dài thời gian dừng $\\Delta t$ (lớn) → F nhỏ → ít hại. **Sàn cứng** dừng đầu trong khoảnh khắc $\\Delta t$ cực ngắn → F cực lớn → gãy xương, chấn thương. Đây cũng là nguyên lý của túi khí ô tô và ván nhảy đệm xốp.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 06 — Chuyển động tròn](../lesson-06-circular-motion/) — lực hướng tâm và quỹ đạo hành tinh.

---

## 📝 Tổng kết Lesson 05

1. **Động lượng $p = m \\cdot v$** (vector). Khác với KE — đo "khả năng đẩy", không phải năng lượng.
2. **Xung lượng $J = F \\cdot \\Delta t = \\Delta p$**. Kéo dài $\\Delta t$ → giảm F (túi khí, đệm).
3. **Bảo toàn p** trong hệ kín. Áp dụng: va chạm, tên lửa, súng giật.
4. **Va chạm đàn hồi**: bảo toàn p và KE. $m_1 = m_2$ → đổi vận tốc.
5. **Va chạm mềm**: chỉ bảo toàn p. KE mất → nhiệt, biến dạng.

**Tiếp theo**: [Lesson 06 — Chuyển động tròn](../lesson-06-circular-motion/)
`;
