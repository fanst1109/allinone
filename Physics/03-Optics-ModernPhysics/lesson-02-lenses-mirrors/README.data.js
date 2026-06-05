// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/03-Optics-ModernPhysics/lesson-02-lenses-mirrors/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 (T3) — Thấu kính & Gương

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **thấu kính hội tụ** (lồi) và **thấu kính phân kỳ** (lõm).
- Áp dụng **phương trình thấu kính mỏng**: 1/f = 1/d_o + 1/d_i.
- Tính **độ phóng đại** m = h_i/h_o = −d_i/d_o.
- Phân biệt **ảnh thật** (real) vs **ảnh ảo** (virtual).
- Hiểu nguyên lý các dụng cụ quang: kính lúp, máy ảnh, mắt, kính cận/viễn.

## Kiến thức tiền đề

- [Lesson 01 (T3) — Quang hình](../lesson-01-geometric-optics/) — Snell's law.

---

## 1. Thấu kính

### 1.1. Phân loại

**Thấu kính hội tụ (convex, lồi)**: dày ở giữa, mỏng ở mép. Tập trung tia song song vào 1 điểm = **tiêu điểm F**. **f > 0**.

**Thấu kính phân kỳ (concave, lõm)**: mỏng giữa, dày mép. Phân tán tia. **f < 0**.

💡 **Trực giác — tiêu cự (focal length) f**: f đo "độ hội tụ" của thấu kính.

**Định nghĩa đầy đủ — tiêu cự f**:
- **(a) Là gì**: khoảng cách (đơn vị độ dài, vd cm) từ thấu kính đến điểm mà chùm tia song song (đến từ vô cực) hội tụ lại = tiêu điểm F. f nhỏ → tia bị bẻ mạnh → hội tụ gần.
- **(b) Vì sao cần**: f tóm gọn toàn bộ "sức mạnh quang học" của một thấu kính vào MỘT con số, để ta tính được vị trí ảnh cho mọi vị trí vật mà không cần biết hình dạng cong chi tiết của thấu kính. Độ tụ \`P = 1/f\` (đơn vị diop, m⁻¹) là cách kính cận/viễn được kê đơn.
- **(c) Ví dụ số kèm đơn vị**: kính lúp \`f = 10 cm\`. Chùm nắng song song qua nó hội tụ thành điểm cháy cách kính đúng 10 cm. Độ tụ \`P = 1/0.1 m = +10 diop\`.

### 1.2. Phương trình thấu kính mỏng

\`\`\`
1/f = 1/d_o + 1/d_i
\`\`\`

trong đó:
- **f** = tiêu cự (focal length).
- **d_o** = khoảng cách từ vật đến thấu kính (object distance).
- **d_i** = khoảng cách từ ảnh đến thấu kính (image distance).

**Độ phóng đại**:
\`\`\`
m = h_i / h_o = −d_i / d_o
\`\`\`

### 1.3. Quy ước dấu

- **d_o > 0**: vật ở trước thấu kính (mọi trường hợp thông thường).
- **d_i > 0**: ảnh ở SAU thấu kính (cùng phía ánh sáng đi ra) → **ảnh thật** (real image).
- **d_i < 0**: ảnh ở TRƯỚC thấu kính (cùng phía vật) → **ảnh ảo** (virtual image).
- **f > 0** cho lồi, **f < 0** cho lõm.
- **m > 0**: ảnh cùng chiều với vật. **m < 0**: ngược chiều (lộn).

### 1.4. Ảnh thật vs Ảnh ảo

- **Ảnh thật**: ánh sáng thực sự hội tụ tại đó → có thể chiếu lên màn. Vd ảnh trên phim máy ảnh.
- **Ảnh ảo**: ánh sáng phân kỳ; mắt nhìn ngược lại "thấy" ánh sáng dường như từ đó. KHÔNG chiếu màn được. Vd kính lúp.

### 1.5. Walk-through — Thấu kính lồi f = 10 cm

**Trường hợp 1**: vật ở d_o = 30 cm (xa hơn 2f = 20 cm):
- 1/d_i = 1/10 − 1/30 = 3/30 − 1/30 = 2/30 → d_i = **15 cm** (sau thấu kính).
- m = −15/30 = **−0.5** (ảnh thật, ngược, nhỏ hơn). 
- → Đây là cách máy ảnh hoạt động: vật xa → ảnh thật ngược, nhỏ trên cảm biến.

**Trường hợp 2**: vật ở d_o = 5 cm (gần hơn f = 10 cm):
- 1/d_i = 1/10 − 1/5 = 1/10 − 2/10 = −1/10 → d_i = **−10 cm**.
- m = −(−10)/5 = **+2**. Ảnh **ảo**, **cùng chiều**, **gấp đôi**.
- → Đây là kính lúp: đưa vật gần kính (trong khoảng f) → ảnh ảo phóng đại.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dấu của d_i nói lên điều gì?"* \`d_i > 0\` → ảnh ở phía bên kia thấu kính (cùng phía tia ló) → **ảnh thật**, chiếu được lên màn. \`d_i < 0\` → ảnh ở cùng phía vật → **ảnh ảo**, chỉ nhìn được bằng mắt, không hứng được lên màn.
- *"Tại sao kính lúp lúc phóng to lúc lật ngược?"* Phụ thuộc vật ở trong hay ngoài tiêu cự. Vật trong khoảng f (d_o < f) → ảnh ảo cùng chiều, phóng to (dùng làm kính lúp). Vật ngoài 2f → ảnh thật ngược, thu nhỏ (như máy ảnh).
- *"m âm nghĩa là gì?"* \`m < 0\` → ảnh **ngược chiều** vật (lộn ngược). \`m > 0\` → cùng chiều. \`|m| > 1\` phóng to, \`|m| < 1\` thu nhỏ.

⚠ **Lỗi thường gặp**

- **Quên quy ước dấu của f.** Thấu kính phân kỳ có \`f < 0\`. Thay \`f = +20\` cho thấu kính lõm sẽ ra ảnh sai loại. Lõm luôn cho ảnh ảo, thu nhỏ với vật thật.
- **Cộng nhầm \`1/f = 1/d_o − 1/d_i\`.** Công thức đúng là \`1/f = 1/d_o + 1/d_i\` (cộng). Dấu âm chỉ xuất hiện qua việc d_i tự mang dấu âm khi ảnh ảo.
- **Tưởng ảnh ảo "không có thật".** Ảnh ảo vẫn nhìn thấy rõ bằng mắt (ảnh trong gương, kính lúp) — chỉ là không hứng được lên màn vì tia sáng không thực sự hội tụ tại đó.

🔁 **Dừng lại tự kiểm tra**

1. Thấu kính lồi f = 12 cm, vật ở d_o = 24 cm. Tính d_i và m. Ảnh thật hay ảo?
2. Thấu kính phân kỳ f = −15 cm, vật ở d_o = 30 cm. d_i dương hay âm?

<details><summary>Đáp án</summary>

1. \`1/d_i = 1/12 − 1/24 = 2/24 − 1/24 = 1/24 → d_i = 24 cm\` (>0 → **ảnh thật**). \`m = −24/24 = −1\` → ảnh ngược chiều, cùng kích thước. (Vật ở đúng 2f → ảnh ở 2f, bằng vật, lộn ngược.)
2. \`1/d_i = 1/(−15) − 1/30 = −2/30 − 1/30 = −3/30 = −1/10 → d_i = −10 cm\`. **Âm** → ảnh ảo (thấu kính phân kỳ luôn cho ảnh ảo với vật thật).

</details>

### 📝 Tóm tắt mục 1

- Hội tụ (f > 0) vs phân kỳ (f < 0).
- 1/f = 1/d_o + 1/d_i.
- Ảnh thật d_i > 0 (chiếu màn), ảnh ảo d_i < 0 (chỉ nhìn được).

---

## 2. Gương

### 2.1. Gương cầu

Có 2 loại:
- **Gương cầu lồi** (convex): "phình ra" — phản xạ phân kỳ. f < 0.
- **Gương cầu lõm** (concave): "lõm vào" — tập trung. f > 0.

Phương trình tương tự thấu kính: **1/f = 1/d_o + 1/d_i**. Tiêu cự liên hệ bán kính: **f = R/2**.

### 2.2. Ứng dụng

- **Gương lõm**: gương trang điểm phóng to khi gần, gương vệ tinh thu sóng.
- **Gương lồi**: gương chiếu hậu xe (rộng tầm nhìn nhưng làm vật nhìn xa hơn), gương trong siêu thị.
- **Kính viễn vọng**: gương lõm thu ánh sáng từ ngôi sao.

💡 **Trực giác**: gương lõm "ôm lấy" ánh sáng và gom về một điểm (như chảo vệ tinh); gương lồi "đẩy" ánh sáng ra rộng → cho tầm nhìn rộng nhưng vật trông nhỏ và xa hơn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Gương dùng cùng công thức \`1/f = 1/d_o + 1/d_i\` với thấu kính sao?"* Đúng, công thức giống hệt. Khác biệt: với gương, ảnh thật nằm cùng phía vật (phía trước gương, vì ánh sáng bị bật ngược lại); với thấu kính, ảnh thật nằm phía sau.
- *"Vì sao gương chiếu hậu ghi 'vật ở gần hơn so với hình'?"* Vì gương lồi cho ảnh ảo thu nhỏ → não bộ tưởng vật ở xa, nhưng thực tế gần hơn. Đánh đổi để có tầm nhìn rộng.
- *"f = R/2 từ đâu ra?"* Với gương cầu, tia song song gần trục phản xạ hội tụ tại điểm cách gương nửa bán kính cong. Nên \`f = R/2\`.

⚠ **Lỗi thường gặp**

- **Lẫn lồi/lõm giữa gương và thấu kính.** Gương LÕM (concave) hội tụ — như thấu kính LỒI. Tên gọi ngược nhau nhưng tác dụng (hội tụ, f>0) giống nhau. Đừng ghép "lõm = phân kỳ".
- **Quên đổi R sang f.** Đề cho R = 40 cm thì f = 20 cm, KHÔNG phải 40 cm.

🔁 **Dừng lại tự kiểm tra**

1. Gương cầu lõm có R = 30 cm. Tiêu cự bằng bao nhiêu?
2. Gương chiếu hậu xe là loại gương cầu gì, và vì sao?

<details><summary>Đáp án</summary>

1. \`f = R/2 = 30/2 = 15 cm\` (dương vì gương lõm hội tụ).
2. Gương **cầu lồi** (f < 0). Lý do: cho ảnh ảo thu nhỏ → trường nhìn rộng hơn, tài xế quan sát được nhiều làn đường phía sau.

</details>

### 📝 Tóm tắt mục 2

- Gương cầu: 1/f = 1/d_o + 1/d_i, f = R/2.
- Lõm tập trung (f > 0), lồi phân kỳ (f < 0).

---

## 3. Dụng cụ quang thực tế

### 3.1. Mắt người

Cơ chế: thấu kính (gồm giác mạc + thủy tinh thể) → ảnh thật ngược lên võng mạc → thần kinh xử lý.

**Điều tiết**: thủy tinh thể có thể thay đổi độ cong → đổi f để nhìn rõ vật ở khoảng cách khác nhau.

**Tật khúc xạ**:
- **Cận thị (myopia)**: nhãn cầu quá dài hoặc thủy tinh thể quá cong → ảnh hội tụ TRƯỚC võng mạc → nhìn xa mờ. Chữa: **kính phân kỳ** (f < 0) để phân tán ánh sáng.
- **Viễn thị (hyperopia)**: ngược lại — ảnh hội tụ SAU võng mạc → nhìn gần mờ. Chữa: **kính hội tụ** (f > 0).

### 3.2. Máy ảnh

Thấu kính hội tụ → ảnh thật, ngược, nhỏ hơn vật lên cảm biến/phim. Điều chỉnh d_i bằng cách di chuyển thấu kính theo cảm biến để focus.

### 3.3. Kính hiển vi

2 thấu kính:
- **Vật kính** (objective): rất gần vật, f nhỏ, tạo ảnh thật phóng đại.
- **Thị kính** (eyepiece): hoạt động như kính lúp, phóng to ảnh từ vật kính.
- Tổng độ phóng = m_vật kính × m_thị kính. Có thể đạt 1000×.

### 3.4. Kính viễn vọng

Tương tự kính hiển vi nhưng cho vật rất xa.
- Vật kính có f LỚN (để thu ánh sáng nhiều và tạo ảnh nhỏ rõ).
- Thị kính f nhỏ (phóng to).
- Độ phóng = f_vật kính / f_thị kính.

💡 **Trực giác**: mọi dụng cụ quang đều là biến thể của "đặt vật ở đâu so với f để được ảnh mong muốn". Mắt/máy ảnh muốn ảnh thật trên võng mạc/cảm biến; kính lúp/hiển vi muốn ảnh ảo phóng to để mắt ngắm.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cận thị đeo kính gì, viễn thị đeo kính gì — làm sao nhớ?"* Cận = ảnh hội tụ TRƯỚC võng mạc (hội tụ quá sớm) → cần kính PHÂN KỲ (f<0) để "đẩy lùi" tiêu điểm ra sau. Viễn = hội tụ SAU võng mạc (quá muộn) → cần kính HỘI TỤ (f>0) để kéo tiêu điểm về trước. Mẹo: cận-lõm, viễn-lồi.
- *"Vì sao kính hiển vi cần 2 thấu kính, dùng 1 cái không được sao?"* 1 thấu kính cho độ phóng giới hạn (~20×). Ghép vật kính tạo ảnh thật phóng to, rồi thị kính phóng tiếp ảnh đó → tích hai độ phóng → tới 1000×.
- *"Độ phóng đại kính hiển vi và viễn vọng tính khác nhau sao?"* Hiển vi: \`m = m_vật × m_thị\` (tích hai độ phóng tuyến tính). Viễn vọng: \`M = f_vật / f_thị\` (tỉ số hai tiêu cự) — vì vật ở vô cực nên đo độ phóng GÓC.

⚠ **Lỗi thường gặp**

- **Đảo ngược cận/viễn.** Cận thị nhìn GẦN rõ, nhìn XA mờ → đeo kính phân kỳ. Nhiều người nhầm "nhìn xa mờ thì đeo kính phóng to" (hội tụ) — sai.
- **Tưởng kính viễn vọng dùng thị kính f lớn.** Ngược lại: vật kính f LỚN, thị kính f NHỎ → \`M = f_vật/f_thị\` lớn. Đặt ngược → M < 1 (thu nhỏ).

🔁 **Dừng lại tự kiểm tra**

1. Một người nhìn gần (đọc sách) bị mờ, nhìn xa rõ. Bị tật gì, đeo kính loại nào?
2. Kính viễn vọng có f_vật = 80 cm, f_thị = 4 cm. Độ phóng đại?

<details><summary>Đáp án</summary>

1. Nhìn gần mờ = **viễn thị (hyperopia)** → đeo kính **hội tụ** (f > 0).
2. \`M = f_vật/f_thị = 80/4 = 20×\`.

</details>

### 📝 Tóm tắt mục 3

- Mắt = thấu kính tự điều tiết. Cận → phân kỳ, viễn → hội tụ.
- Máy ảnh: ảnh thật ngược trên cảm biến.
- Kính hiển vi / viễn vọng: 2 thấu kính ghép.

---

## 4. Bài tập

### Bài tập

**Bài 1**: Thấu kính hội tụ f = 20 cm. Vật cao 5 cm đặt ở d_o = 60 cm. Tính d_i, m, kích thước ảnh.

**Bài 2**: Vật ở d_o = 5 cm trước thấu kính lồi f = 8 cm. Tính d_i và m.

**Bài 3**: Kính lúp f = 5 cm. Vật ở d_o = 3 cm. Tính độ phóng đại.

**Bài 4**: Người bị cận thị nhìn xa nhất được 50 cm (không đeo kính). Tính f của kính cần đeo để nhìn xa (∞).

**Bài 5**: Kính viễn vọng có f_vật = 100 cm, f_thị = 5 cm. Tính độ phóng đại.

### Lời giải

**Bài 1**: 1/d_i = 1/20 − 1/60 = 3/60 − 1/60 = 2/60 → d_i = **30 cm** (sau thấu kính, ảnh thật). m = −30/60 = **−0.5** (ngược, nhỏ hơn 1/2). h_i = m·h_o = −0.5·5 = **−2.5 cm** (cao 2.5 cm, ngược).

**Bài 2**: 1/d_i = 1/8 − 1/5 = 5/40 − 8/40 = −3/40 → d_i = **−13.33 cm** (ảo, cùng phía vật). m = −(−13.33)/5 = **+2.67** (ảo, cùng chiều, lớn 2.67 lần).

**Bài 3**: 1/d_i = 1/5 − 1/3 = 3/15 − 5/15 = −2/15 → d_i = **−7.5 cm** (ảo). m = −(−7.5)/3 = **+2.5** (phóng đại 2.5×).

**Bài 4**: Cần kính phân kỳ làm vật ở ∞ "hiện ra" ở 50 cm. 1/(−50) = 1/f + 1/∞ → 1/f = −1/50 → **f = −50 cm** (phân kỳ).

**Bài 5**: M = f_vật / f_thị = 100/5 = **20×**.

---

## 5. Bài tiếp theo

[Lesson 03 — Quang sóng](../lesson-03-wave-optics/).

## 📝 Tổng kết

1. **Thấu kính lồi (hội tụ, f > 0)** vs **lõm (phân kỳ, f < 0)**.
2. **1/f = 1/d_o + 1/d_i**, m = −d_i/d_o.
3. **Ảnh thật d_i > 0** (chiếu màn) vs **ảnh ảo d_i < 0** (chỉ nhìn).
4. **Gương cầu**: 1/f = 1/d_o + 1/d_i, f = R/2.
5. **Ứng dụng**: mắt (cận đeo lõm, viễn đeo lồi), máy ảnh, hiển vi, viễn vọng.
`;
