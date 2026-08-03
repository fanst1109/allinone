// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: VisualArt/01-Color/lesson-03-color-harmony/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Hòa sắc (Color Harmony / Color Schemes)

> Chọn màu không phải là "thấy đẹp thì lấy". Có **luật hình học**: các bộ màu ăn ý nhau nằm ở những **vị trí góc** cố định trên vòng màu. Học 6 sơ đồ này là học cách sinh ra một bảng màu (palette) hài hòa chỉ từ **một góc hue** ban đầu.

## Mục tiêu học tập

- Hiểu **hòa sắc (color harmony)** = quan hệ **góc hue** giữa các màu trên vòng màu 360°.
- Tính được đúng góc cho 6 sơ đồ: **đơn sắc, tương đồng, bổ túc, bổ túc chia đôi, bộ ba, bộ bốn**.
- Với một hue gốc bất kỳ, tự dựng ra palette theo từng sơ đồ (kèm ví dụ số cụ thể).
- Biết **khi nào dùng sơ đồ nào** và tránh lỗi phổ biến "quá nhiều màu bão hòa cạnh nhau".

## Kiến thức tiền đề

- [Lesson 02 — Mô hình màu (Color Models)](../lesson-02-color-models/) — đặc biệt là **HSL/HSV**: một màu = (hue H, saturation S, lightness/value L). Bài này thao tác chủ yếu trên **H** (góc 0–360°), giữ S và L làm "âm lượng" của màu.
- Số học cộng/trừ theo modulo 360 (vòng tròn: sau 359° quay lại 0°).

---

## 1. Góc hue — ngôn ngữ chung của mọi sơ đồ hòa sắc

> 💡 **Trực giác.** Hãy tưởng tượng vòng màu là một **mặt đồng hồ 360°**: đỏ ở 12 giờ (0°), đi theo chiều kim đồng hồ qua cam, vàng, lục, lam, tím rồi quay về đỏ. "Hòa sắc" chỉ là chọn ra **vài mốc giờ** theo một quy luật khoảng cách — giống như gảy vài nốt cách nhau đúng quãng thì thành hợp âm nghe thuận tai. Cùng một quy luật khoảng cách, xoay gốc đi đâu cũng cho ra bộ màu ăn ý.

**Vòng màu HSL chuẩn** (giữ S = 70%, L = 50% để đặt tên):

| Góc | Tên (VN) | Tên (EN) | Góc | Tên (VN) | Tên (EN) |
|----:|----------|----------|----:|----------|----------|
| 0° | đỏ | red | 180° | lục lam | cyan |
| 30° | cam | orange | 210° | thiên thanh | azure |
| 60° | vàng | yellow | 240° | lam | blue |
| 90° | vàng lục | chartreuse | 270° | tím | violet |
| 120° | lục | green | 300° | tía / cánh sen | magenta |
| 150° | lục ngả lam | spring green | 330° | hồng | rose |

**Quy tắc cộng góc (dùng cho MỌI sơ đồ):** một hue "cách" hue gốc $\\theta$ độ được tính bằng

$$H_{\\text{mới}} = (H_{\\text{gốc}} + \\theta) \\bmod 360$$

Phép \`mod 360\` xử lý việc "quay vòng": ví dụ $300 + 120 = 420$, $420 \\bmod 360 = 60$ → từ tía cộng 120° ra vàng.

**Ví dụ số verify cả 2 vế** (S = 70%, L = 50%, hex tính từ công thức HSL→RGB ở Lesson 02):

| Hue | HSL | RGB | Hex |
|----:|-----|-----|-----|
| 0° | (0, 70%, 50%) | (217, 38, 38) | \`#d92626\` |
| 120° | (120, 70%, 50%) | (38, 217, 38) | \`#26d926\` |
| 180° | (180, 70%, 50%) | (38, 217, 217) | \`#26d9d9\` |
| 240° | (240, 70%, 50%) | (38, 38, 217) | \`#2626d9\` |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao chỉ đổi hue mà không đổi S/L?"* → Vì các sơ đồ hòa sắc nói về **quan hệ màu sắc (hue)**. S và L là "độ mạnh" và "độ sáng" — ta chỉnh sau để tạo phân cấp (mục 5). Trước hết cố định S/L để thấy rõ khung xương góc.
> - *"Vòng màu nghệ sĩ (RYB) hay vòng RGB/HSL?"* → Bài này dùng **HSL** (chuẩn digital, 0°=đỏ, 120°=lục, 240°=lam) vì nó là thứ code/máy tính dùng. Vòng RYB của họa sĩ đặt màu bổ túc hơi khác (đỏ↔lục lá), nhưng **nguyên lý góc là như nhau**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Từ hue 210° (thiên thanh), cộng 180° ra góc nào? Màu gì?
> 2. Từ hue 300° (tía), cộng 90° ra góc nào?
>
> <details><summary>Đáp án</summary>
>
> 1. $(210 + 180) \\bmod 360 = 390 \\bmod 360 = 30°$ → **cam**.
> 2. $(300 + 90) \\bmod 360 = 390 \\bmod 360 = 30°$ → **cam**.
> </details>

---

## 2. Sơ đồ dựa trên MỘT hue: Đơn sắc & Tương đồng

Hai sơ đồ "an toàn" nhất: dùng ít hue nên khó chói, dễ hài hòa.

### 2.1 Đơn sắc (Monochromatic) — 1 hue, đổi S/L

> 💡 **Trực giác.** Chỉ lấy **đúng một góc hue**, rồi tạo ra nhiều "tông" bằng cách đổi độ sáng (lightness) và độ bão hòa (saturation) — như chụp một cảnh rồi chỉnh sáng/tối. Kết quả cực kỳ thuần nhất, sang, nhưng dễ đơn điệu.

- **Góc:** chỉ 1 hue. Các màu con: cùng $H$, khác $S$ và/hoặc $L$.
- **Ví dụ số:** base = **210°** (thiên thanh), S = 65%, năm tông theo L:

  | Tông | HSL | Vai trò |
  |------|-----|---------|
  | rất nhạt | (210, 65%, 88%) | nền |
  | nhạt | (210, 65%, 70%) | phụ |
  | gốc | (210, 65%, 52%) | chủ đạo |
  | đậm | (210, 65%, 38%) | tương phản |
  | rất đậm | (210, 65%, 24%) | chữ / viền |

  Tất cả **hue = 210°**, chỉ trượt L từ 88% → 24%.
- **Khi nào dùng:** thương hiệu tối giản, UI cần "sạch", ảnh muốn không khí thống nhất (một buổi chiều xanh, một phòng đỏ ấm).

### 2.2 Tương đồng (Analogous) — 3 hue cạnh nhau (±30°)

> 💡 **Trực giác.** Lấy hue gốc và **hai hàng xóm sát bên** (thường ±30°). Vì nằm sát nhau trên vòng, chúng "họ hàng gần" → chuyển tiếp mượt, êm dịu, gợi cảm giác tự nhiên (hoàng hôn cam→vàng, rừng lục→lục lam).

- **Góc:** $\\{(H-30) \\bmod 360,\\; H,\\; (H+30) \\bmod 360\\}$.
- **Ví dụ số:**
  - base **120°** (lục) → **90° (vàng lục), 120° (lục), 150° (lục ngả lam)**.
  - base **30°** (cam) → **0° (đỏ), 30° (cam), 60° (vàng)** — bảng "hoàng hôn ấm".
  - base **330°** (hồng) → $(330-30)=300°$, $330°$, $(330+30) \\bmod 360 = 0°$ → **300° (tía), 330° (hồng), 0° (đỏ)** (ví dụ có quay vòng qua 0).
- **Khi nào dùng:** muốn êm, hài hòa, ít căng thẳng thị giác. **Mẹo:** chọn 1 hue làm chủ đạo (chiếm diện tích lớn), 2 hue kia làm phụ — đừng chia đều 3 phần.

> ⚠ **Lỗi thường gặp.** Lấy analogous với khoảng cách quá lớn (±60° trở lên) rồi vẫn gọi là "tương đồng". Khi khoảng vượt ~±40°, cảm giác "họ hàng gần" biến mất, palette bắt đầu giống bộ ba lỏng lẻo. Giữ trong **±30° đến ±40°**.

> 📝 **Tóm tắt mục 2.**
> - **Đơn sắc:** 1 hue, biến thiên S/L → thuần nhất nhất, rủi ro thấp nhất, dễ đơn điệu.
> - **Tương đồng:** hue ± 30° → êm dịu; nhớ chọn 1 hue trội, đừng chia đều.

---

## 3. Sơ đồ đối xứng qua tâm: Bổ túc & Bổ túc chia đôi

Nhóm này tạo **tương phản mạnh** vì lấy màu ở phía đối diện vòng tròn.

### 3.1 Bổ túc (Complementary) — 2 hue đối diện (180°)

> 💡 **Trực giác.** Hai màu **đối tâm** (cách nhau nửa vòng, 180°) là cặp tương phản mạnh nhất: đặt cạnh nhau, mỗi màu làm màu kia rực lên (bởi mắt ta nhạy nhất với cặp đối lập). Đỏ trên nền lục lam, cam trên nền lam — "nảy" khỏi trang.

- **Góc:** $\\{H,\\; (H+180) \\bmod 360\\}$.
- **Ví dụ số verify:**

  | Base | Công thức | Bổ túc | Cặp màu |
  |-----:|-----------|-------:|---------|
  | 0° (đỏ) | $(0+180)\\bmod 360$ | 180° | đỏ ↔ lục lam |
  | 30° (cam) | $(30+180)\\bmod 360$ | 210° | cam ↔ thiên thanh |
  | 210° (thiên thanh) | $(210+180)\\bmod 360 = 390\\bmod360$ | 30° | thiên thanh ↔ cam |
  | 270° (tím) | $(270+180)\\bmod 360 = 450\\bmod360$ | 90° | tím ↔ vàng lục |

  Lưu ý: bổ túc là quan hệ **đối xứng** — base 30° ↔ 210° và base 210° ↔ 30° cho cùng một cặp.
- **Khi nào dùng:** cần điểm nhấn nổi bật (nút call-to-action đỏ trên UI lục lam), poster thể thao, muốn năng lượng cao.

> ⚠ **Lỗi thường gặp.** Dùng **cả hai màu bổ túc ở cùng độ bão hòa 100% và cùng diện tích lớn** → mắt bị "rung" (vibration), chói, mệt. Cách đúng: một màu làm **nền lớn đã giảm bão hòa/làm nhạt**, màu bổ túc để **diện tích nhỏ, bão hòa cao** làm điểm nhấn (xem quy tắc 60-30-10 ở mục 5).

### 3.2 Bổ túc chia đôi (Split-Complementary) — base + 2 màu cạnh màu bổ túc

> 💡 **Trực giác.** Vẫn muốn tương phản của "bổ túc" nhưng **bớt gay gắt**: thay vì lấy đúng màu đối diện, ta lấy **hai màu nằm hai bên nó** (đối diện ±30°). Giữ được độ nổi mà dịu hơn, lại có 3 màu nên phong phú hơn cặp bổ túc.

- **Góc:** $\\{H,\\; (H+150) \\bmod 360,\\; (H+210) \\bmod 360\\}$ (vì $180-30=150$ và $180+30=210$).
- **Ví dụ số:**
  - base **0°** (đỏ) → **0°, 150° (lục ngả lam), 210° (thiên thanh)**.
  - base **60°** (vàng) → $60, (60+150)=210°, (60+210)=270°$ → **60° (vàng), 210° (thiên thanh), 270° (tím)**.
  - base **210°** (thiên thanh) → $210, (210+150)=360\\bmod360=0°, (210+210)=420\\bmod360=60°$ → **210°, 0° (đỏ), 60° (vàng)**.
- **Khi nào dùng:** lựa chọn "an toàn mà vẫn sống động" — được khuyên cho người mới vì rất khó làm xấu.

> 📝 **Tóm tắt mục 3.**
> - **Bổ túc:** $H$ và $H+180$ → tương phản mạnh nhất; giảm bão hòa/diện tích một bên để khỏi chói.
> - **Bổ túc chia đôi:** $H$, $H+150$, $H+210$ → tương phản dịu hơn, thêm 1 màu, an toàn cho người mới.

---

## 4. Sơ đồ cách đều: Bộ ba & Bộ bốn

Nhóm này chia vòng tròn thành các phần **bằng nhau** → cân bằng, rực rỡ, nhưng cần tay nghề để không loạn.

### 4.1 Bộ ba (Triadic) — 3 hue cách đều 120°

> 💡 **Trực giác.** Chia vòng 360° làm **ba phần đều** ($360/3 = 120°$) → ba màu "kiềng ba chân", vừa tương phản vừa cân bằng, tươi và vui (kiểu tranh cổ động, đồ chơi trẻ em).

- **Góc:** $\\{H,\\; (H+120)\\bmod360,\\; (H+240)\\bmod360\\}$.
- **Ví dụ số verify (hex ở S=70%, L=50%):**
  - base **0°** → **0° \`#d92626\` (đỏ), 120° \`#26d926\` (lục), 240° \`#2626d9\` (lam)** — bộ ba nguyên thủy RGB.
  - base **60°** → **60° (vàng), 180° (lục lam), 300° (tía)** — bộ ba thứ cấp.
- **Khi nào dùng:** cần bảng vui tươi, cân bằng nhiều màu. **Mẹo:** vẫn chọn 1 màu trội, 2 màu còn lại làm phụ/điểm nhấn — đừng để cả 3 "đánh nhau".

### 4.2 Bộ bốn (Tetradic / hình chữ nhật) — 2 cặp bổ túc

> 💡 **Trực giác.** Lấy **hai cặp bổ túc** cùng lúc → 4 màu tạo thành hình chữ nhật (hoặc hình vuông) trên vòng. Giàu màu nhất, nhiều khả năng phối, nhưng cũng **khó cân bằng nhất**.

- **Góc (dạng vuông, cách đều 90°):** $\\{H,\\; (H+90),\\; (H+180),\\; (H+270)\\} \\bmod 360$. Đây là 2 cặp bổ túc: $(H, H+180)$ và $(H+90, H+270)$.
- **Ví dụ số:**
  - base **0°** → **0° (đỏ), 90° (vàng lục), 180° (lục lam), 270° (tím)**. Kiểm tra cặp bổ túc: $0↔180$ ✓ và $90↔270$ ✓.
  - base **30°** → **30° (cam), 120° (lục), 210° (thiên thanh), 300° (tía)**. Cặp: $30↔210$ ✓, $120↔300$ ✓.
- **Khi nào dùng:** minh họa phức tạp, infographic nhiều hạng mục. **Cảnh báo:** với 4 màu, gần như bắt buộc dùng quy tắc phân cấp (1 màu chủ đạo áp đảo), nếu không sẽ rối.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Bộ bốn 'chữ nhật' và 'vuông' khác nhau chỗ nào?"* → **Vuông (square):** 4 màu cách đều 90° ($H, H+90, H+180, H+270$). **Chữ nhật (rectangle):** 2 cặp bổ túc nhưng khoảng giữa cặp khác 90°, ví dụ $H, H+60, H+180, H+240$ — vẫn là 2 cặp đối tâm nhưng "hẹp - rộng". Bài này minh họa dạng vuông.
> - *"Càng nhiều màu càng đẹp?"* → Ngược lại. Số màu tăng → độ khó cân bằng tăng nhanh. Đơn sắc/tương đồng thường ra sản phẩm "gọn gàng" hơn cho người mới.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Bộ ba từ base 90° gồm những góc nào?
> 2. Bộ bốn (vuông) từ base 45° gồm những góc nào? Chỉ ra 2 cặp bổ túc.
>
> <details><summary>Đáp án</summary>
>
> 1. $90,\\ (90+120)=210,\\ (90+240)=330$ → **90°, 210°, 330°**.
> 2. $45,\\ 135,\\ 225,\\ 315$. Cặp bổ túc: $45↔225$ (lệch 180 ✓) và $135↔315$ (lệch 180 ✓).
> </details>

> 📝 **Tóm tắt mục 4.**
> - **Bộ ba:** cách đều $120°$ → cân bằng, tươi; giữ 1 màu trội.
> - **Bộ bốn (vuông):** cách đều $90°$ = 2 cặp bổ túc → giàu nhất, khó nhất, bắt buộc phân cấp.

---

## 5. Chọn sơ đồ nào & lỗi thường gặp

### 5.1 Bảng chọn nhanh

| Nhu cầu | Sơ đồ nên dùng | Góc |
|---------|----------------|-----|
| Sạch, tối giản, một tông | Đơn sắc | 1 hue, đổi S/L |
| Êm dịu, tự nhiên | Tương đồng | ±30° |
| Điểm nhấn nổi bật | Bổ túc | 180° |
| Nổi bật nhưng dịu, dễ dùng | Bổ túc chia đôi | 150°, 210° |
| Vui tươi, cân bằng | Bộ ba | 120° |
| Nhiều hạng mục, phong phú | Bộ bốn | 90° |

### 5.2 Quy tắc 60-30-10 (phân cấp diện tích)

> 💡 **Trực giác.** Palette đẹp không chia đều diện tích. Tỷ lệ kinh điển: **60% màu chủ đạo** (thường đã làm nhạt/giảm bão hòa, làm nền) — **30% màu phụ** — **10% màu nhấn** (bão hòa cao, diện tích nhỏ nhất, "hét lên" đúng chỗ). Đây là lý do một poster 2 màu bổ túc trông pro: 60% nền lam nhạt, 10% cam rực làm nút.

**Ví dụ số:** bổ túc base 210° (thiên thanh) ↔ 30° (cam):
- 60% nền: hsl(210, 30%, 88%) — thiên thanh **rất nhạt, giảm bão hòa**.
- 30% phụ: hsl(210, 55%, 45%) — thiên thanh đậm hơn.
- 10% nhấn: hsl(30, 90%, 55%) — cam **bão hòa cao**, chỉ dùng cho nút/tiêu đề.

### 5.3 Lỗi kinh điển: quá nhiều màu bão hòa cạnh nhau

> ⚠ **Lỗi thường gặp (quan trọng nhất bài).** Người mới hay lấy đúng các hue của sơ đồ nhưng **để tất cả ở S = 100%, L = 50%, diện tích ngang nhau**. Kết quả: các màu "đánh nhau", không màu nào trội, mắt không biết nhìn đâu — dân thiết kế gọi là *"clown vomit"*.
>
> **Ví dụ phản chứng:** bộ ba 0°/120°/240° đều ở S 100% L 50%, mỗi màu chiếm 1/3 → chói và trẻ con. **Sửa:** giữ nguyên 3 hue nhưng (1) chọn 1 màu chủ đạo chiếm ~60%, (2) **giảm bão hòa** 2 màu còn lại, (3) chỉ để **một** màu giữ bão hòa cao làm điểm nhấn 10%.
>
> **Nguyên tắc vàng:** *sơ đồ quyết định HUE nào; còn S, L và DIỆN TÍCH mới quyết định palette đẹp hay xấu.* Đúng góc chưa đủ.

> 📝 **Tóm tắt mục 5.**
> - Sơ đồ chọn **hue**; phân cấp bằng **S, L, diện tích** (60-30-10) mới làm nên palette đẹp.
> - Số màu ít → an toàn (đơn sắc, tương đồng); số màu nhiều → mạnh nhưng phải phân cấp gắt.
> - Đừng để nhiều màu bão hòa cao, diện tích bằng nhau, cạnh nhau.

---

## 6. Bài tập

**Bài 1 (tính góc).** Với hue gốc **H = 45°**, tính các hue của từng sơ đồ:
- a) Tương đồng (±30°)
- b) Bổ túc
- c) Bổ túc chia đôi
- d) Bộ ba
- e) Bộ bốn (vuông)

**Bài 2 (quay vòng mod 360).** Với hue gốc **H = 300°** (tía), tính:
- a) Bổ túc
- b) Bộ ba
- c) Bổ túc chia đôi

**Bài 3 (nhận diện ngược).** Cho một palette có các hue: **{20°, 140°, 260°}**. Đây là sơ đồ gì? Chứng minh bằng khoảng cách góc.

**Bài 4 (vận dụng thiết kế).** Bạn làm poster bằng sơ đồ **bổ túc** base 240° (lam). Hãy đề xuất cụ thể S, L và tỷ lệ diện tích cho 3 vai trò theo quy tắc 60-30-10, và giải thích vì sao không để cả hai màu bão hòa 100% diện tích bằng nhau.

---

## 7. Lời giải chi tiết

**Bài 1** — áp dụng $H_{\\text{mới}} = (45 + \\theta) \\bmod 360$:
- a) Tương đồng: $45-30=15°$, $45°$, $45+30=75°$ → **15°, 45°, 75°**.
- b) Bổ túc: $(45+180)=225°$ → **45° ↔ 225°**.
- c) Bổ túc chia đôi: $(45+150)=195°$, $(45+210)=255°$ → **45°, 195°, 255°**.
- d) Bộ ba: $(45+120)=165°$, $(45+240)=285°$ → **45°, 165°, 285°**.
- e) Bộ bốn (vuông): $45, (45+90)=135, (45+180)=225, (45+270)=315$ → **45°, 135°, 225°, 315°**.
  Kiểm tra 2 cặp bổ túc: $45↔225$ ✓, $135↔315$ ✓.

**Bài 2** — chú ý \`mod 360\` khi vượt 360:
- a) Bổ túc: $(300+180)=480$, $480 \\bmod 360 = 120°$ → **300° ↔ 120°** (tía ↔ lục).
- b) Bộ ba: $(300+120)=420\\bmod360=60°$; $(300+240)=540\\bmod360=180°$ → **300°, 60°, 180°**.
- c) Bổ túc chia đôi: $(300+150)=450\\bmod360=90°$; $(300+210)=510\\bmod360=150°$ → **300°, 90°, 150°**.

**Bài 3** — cách tiếp cận: đo khoảng cách góc giữa các hue.
- $140 - 20 = 120°$; $260 - 140 = 120°$; và từ $260$ về $20$: $(20 + 360) - 260 = 120°$.
- Ba màu **cách đều nhau đúng 120°** → đây là **Bộ ba (Triadic)**.
- (Đây chính là bộ ba base 20°, tức xoay bộ ba nguyên thủy 0/120/240 đi 20°.)

**Bài 4** — cách tiếp cận: đúng góc trước, rồi phân cấp bằng S/L/diện tích.
- Góc: bổ túc base 240° → **240° (lam) ↔ 60° (vàng)**.
- Đề xuất 60-30-10:
  - **60% chủ đạo (nền):** hsl(240, 35%, 90%) — lam **rất nhạt, giảm bão hòa** để làm nền rộng mà không chói.
  - **30% phụ:** hsl(240, 55%, 45%) — lam đậm cho khối lớn, tiêu đề.
  - **10% nhấn:** hsl(60, 90%, 55%) — vàng **bão hòa cao**, chỉ dùng cho nút/điểm nhấn nhỏ.
- Vì sao không để cả hai màu S=100%, L=50%, diện tích bằng nhau? Vì cặp bổ túc ở bão hòa tối đa đặt cạnh nhau, diện tích ngang nhau sẽ gây **rung thị giác (vibration)**, mắt không có điểm tựa để nghỉ, và không có màu nào "thắng" để dẫn mắt → poster chói, mệt, thiếu phân cấp. Giảm bão hòa + thu nhỏ diện tích màu nhấn khiến màu vàng "nảy" đúng chỗ trên nền lam dịu.

> 🔁 **Dừng lại tự kiểm tra (tổng).** Nhìn palette \`{0°, 60°, 180°, 240°}\` — sơ đồ gì?
> <details><summary>Đáp án</summary>
> Có 2 cặp bổ túc: $0↔180$ và $60↔240$. Khoảng: $0→60=60°$, $60→180=120°$ → đây là **bộ bốn dạng chữ nhật** (rectangle tetradic), không phải vuông (vuông phải cách đều 90°).
> </details>

---

## Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — chọn **hue gốc** trên vòng màu (click hoặc kéo slider), bật/tắt 6 sơ đồ, xem **điểm & đường nối** vẽ đúng hình học trên vòng, bảng **palette hex** sinh ra, và một **poster mẫu** tự đổi màu theo palette. Chỉnh cả **saturation** (bán kính điểm) để thấy vì sao "đúng góc" chưa đủ.

## Bài tiếp theo

**[Lesson 04 — Nhiệt độ màu, tương phản & tâm lý màu](../lesson-04-temperature-contrast-psychology/)**: vì sao cùng một sơ đồ hòa sắc lại cho cảm giác "nóng" hay "lạnh", cách dùng tương phản (contrast) để dẫn mắt, và ý nghĩa tâm lý/văn hóa của từng màu.
`;
