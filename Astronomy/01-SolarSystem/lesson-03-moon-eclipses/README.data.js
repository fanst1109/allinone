// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/01-SolarSystem/lesson-03-moon-eclipses/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Mặt Trăng & Thực (The Moon & Eclipses)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích **pha Mặt Trăng (lunar phases)** bằng hình học góc Mặt Trời–Trái Đất–Trăng, và phân biệt **tháng giao hội (synodic month)** 29.5 ngày với tháng sao 27.3 ngày.
- Hiểu điều kiện xảy ra **nhật thực (solar eclipse)** và **nguyệt thực (lunar eclipse)**.
- Trả lời câu hỏi cốt lõi: **vì sao không có thực mỗi tháng** (quỹ đạo Trăng nghiêng ~5°, chỉ thực khi Trăng gần **nút *node***).
- Phân biệt **bóng tối *umbra*** và **bóng nửa tối *penumbra***.
- Giải thích **thủy triều (tides)** bằng gradient lực hấp dẫn, và vì sao có **triều cường (spring tide)** / **triều kém (neap tide)**.

## Kiến thức tiền đề

- Hình học góc giữa các thiên thể — ý tưởng từ [Lesson 02 — Mặt Trời & mùa](../lesson-02-seasons-sun/).
- Khái niệm hoàng đạo (ecliptic) — [Lesson 02](../lesson-02-seasons-sun/).
- Lực hấp dẫn (sẽ học sâu ở [Lesson 05](../lesson-05-gravity-orbits/)) — ở đây chỉ cần ý "lực giảm theo khoảng cách".

---

## 1. Pha Mặt Trăng — Hình học ánh sáng (Lunar Phases)

> 💡 **Trực giác / Hình dung.** Mặt Trăng là một quả bóng tối, **luôn được Mặt Trời chiếu sáng đúng một nửa** (nửa hướng về Mặt Trời). "Pha" chỉ là việc: từ Trái Đất, ta nhìn thấy **bao nhiêu phần** của nửa-sáng đó. Khi Trăng ở giữa ta và Mặt Trời, ta nhìn vào mặt tối → trăng non (không thấy). Khi Trăng ở phía đối diện Mặt Trời, ta nhìn thẳng vào mặt sáng → trăng tròn.

**Định nghĩa pha (3 phần):**

- **(a) Là gì** — Pha là phần đĩa Mặt Trăng được chiếu sáng mà ta thấy từ Trái Đất, quyết định bởi **góc pha** = góc Mặt Trời–Trăng nhìn từ Trái Đất (góc giãn cách *elongation*).
- **(b) Vì sao cần** — Pha cho biết vị trí tương đối Mặt Trời–Trái Đất–Trăng, từ đó suy ra thời điểm trong tháng âm và điều kiện có thể xảy ra thực.
- **(c) Ví dụ trực giác bằng số** — Elongation \`0°\` → trăng non (new moon); \`90°\` → bán nguyệt (quarter); \`180°\` → trăng tròn (full moon). Phần sáng nhìn thấy \`≈ (1 − cos(elongation)) / 2\`: tại \`90°\` cho \`(1−0)/2 = 0.5\` = đúng nửa đĩa ✓.

**Chu kỳ 8 pha (theo elongation tăng dần):**

| Pha | Elongation | Phần sáng thấy | Mọc/lặn (gần đúng) |
|---|---|---|---|
| Trăng non (new) | \`0°\` | 0% | mọc/lặn cùng Mặt Trời |
| Lưỡi liềm đầu (waxing crescent) | \`~45°\` | ~15% | chiều tối, hướng tây |
| Thượng huyền (first quarter) | \`90°\` | 50% | trưa mọc, nửa đêm lặn |
| Trăng khuyết đầu (waxing gibbous) | \`~135°\` | ~85% | |
| Trăng tròn (full) | \`180°\` | 100% | mọc lúc hoàng hôn, lặn lúc bình minh |
| Trăng khuyết cuối (waning gibbous) | \`~225°\` | ~85% | |
| Hạ huyền (last quarter) | \`270°\` | 50% | nửa đêm mọc, trưa lặn |
| Lưỡi liềm cuối (waning crescent) | \`~315°\` | ~15% | rạng sáng, hướng đông |

> ⚠ **Lỗi thường gặp.** Nghĩ pha Mặt Trăng do **bóng Trái Đất** che. **Sai.** Pha là do góc nhìn vào nửa-sáng/nửa-tối tự nhiên của Trăng. Bóng Trái Đất chỉ liên quan tới **nguyệt thực** (hiếm, chỉ khi trăng tròn + gần nút). Nếu pha do bóng Trái Đất thì sẽ có "thực" mỗi đêm — vô lý.

### 1.1 Tháng giao hội vs tháng sao

- **Tháng sao (sidereal month) = 27.3 ngày**: thời gian Trăng quay đúng \`360°\` quanh Trái Đất so với nền sao.
- **Tháng giao hội (synodic month) = 29.5 ngày**: thời gian giữa hai lần cùng pha (vd trăng non → trăng non).

> 💡 **Vì sao 29.5 > 27.3?** Trong lúc Trăng quay quanh Trái Đất, **Trái Đất cũng đi quanh Mặt Trời**, nên Trăng phải quay thêm ~2 ngày nữa mới "đuổi kịp" để lại thẳng hàng Mặt Trời–Trái Đất–Trăng (cùng pha). Walk-through: Trái Đất đi \`360°/365.25 ≈ 0.986°/ngày\`. Trong 27.3 ngày Trái Đất đã dịch \`27.3 × 0.986 ≈ 26.9°\`. Trăng đi \`360°/27.3 ≈ 13.18°/ngày\`, cần thêm \`26.9 / (13.18 − 0.986) ≈ 2.2\` ngày để bù → \`27.3 + 2.2 ≈ 29.5\` ngày ✓.

> 🔁 **Dừng lại tự kiểm tra.** Trăng tròn mọc vào lúc nào trong ngày?
> <details><summary>Đáp án</summary>Lúc hoàng hôn (~18h). Vì trăng tròn ở elongation 180° (đối diện Mặt Trời) — khi Mặt Trời lặn ở tây thì Trăng mọc ở đông, và lặn lúc bình minh.</details>

---

## 2. Nhật thực & Nguyệt thực (Solar & Lunar Eclipses)

> 💡 **Trực giác.** Thực = ba thiên thể **thẳng hàng** và một cái đổ bóng lên cái kia.
> - **Nhật thực**: Trăng chen vào giữa Mặt Trời và Trái Đất → bóng Trăng đổ lên Trái Đất → ta thấy Mặt Trời bị che. Xảy ra lúc **trăng non**.
> - **Nguyệt thực**: Trái Đất chen vào giữa Mặt Trời và Trăng → bóng Trái Đất đổ lên Trăng → Trăng tối/đỏ. Xảy ra lúc **trăng tròn**.

**Định nghĩa nhật thực (3 phần):**

- **(a) Là gì** — Mặt Trăng che khuất (một phần hoặc toàn phần) Mặt Trời khi nhìn từ Trái Đất. Cần Mặt Trời–Trăng–Trái Đất gần thẳng hàng, Trăng ở giữa.
- **(b) Vì sao xảy ra được dù Trăng nhỏ hơn Mặt Trời rất nhiều** — Trùng hợp kỳ diệu: Mặt Trời to gấp ~400 lần Mặt Trăng nhưng cũng xa gấp ~400 lần → **đường kính góc của hai cái gần bằng nhau (~0.5°)** → Trăng vừa khít che được Mặt Trời (nhật thực toàn phần).
- **(c) Ví dụ số** — Mặt Trời đường kính ~1.39 triệu km ở ~150 triệu km → góc \`≈ 0.53°\`. Mặt Trăng ~3474 km ở ~384400 km → góc \`≈ 0.52°\`. Hai con số gần trùng → toàn phần khi Trăng ở cận điểm, "hình khuyên" khi Trăng ở viễn điểm.

**Bảng so sánh:**

| | Nhật thực | Nguyệt thực |
|---|---|---|
| Pha xảy ra | Trăng non | Trăng tròn |
| Ai đổ bóng | Trăng → Trái Đất | Trái Đất → Trăng |
| Nhìn thấy ở | Vùng hẹp (vệt bóng) | Cả nửa Trái Đất đang đêm |
| An toàn nhìn? | KHÔNG (hại mắt) | Có (an toàn) |
| Trăng màu? | — | Đỏ ("trăng máu") do ánh sáng khúc xạ qua khí quyển |

---

## 3. Vì sao KHÔNG có thực mỗi tháng? (Câu hỏi cốt lõi)

> ❓ **Câu hỏi tự nhiên.** Trăng non mỗi tháng (29.5 ngày), trăng tròn mỗi tháng. Vậy sao không có nhật thực mỗi trăng non, nguyệt thực mỗi trăng tròn?

> 💡 **Trực giác / câu trả lời.** Vì quỹ đạo Mặt Trăng quanh Trái Đất **nghiêng ~5.1°** so với hoàng đạo (đường Mặt Trời). Phần lớn các trăng non/tròn, Trăng nằm **lệch lên trên hoặc xuống dưới** đường thẳng hàng → bóng "trượt qua" phía trên/dưới, không trúng. Chỉ khi Trăng tình cờ ở gần **giao điểm của hai mặt phẳng** (gọi là **nút *node***) đúng vào lúc trăng non/tròn thì mới thẳng hàng đủ → có thực.

**Định nghĩa nút (node, 3 phần):**

- **(a) Là gì** — Hai điểm mà quỹ đạo nghiêng của Mặt Trăng cắt mặt phẳng hoàng đạo: nút lên (ascending) và nút xuống (descending).
- **(b) Vì sao quan trọng** — Thực chỉ xảy ra khi trăng non/tròn rơi vào **gần một nút** (gọi là "mùa thực" *eclipse season*). Ngoài mùa thực, Trăng lệch quá nhiều, bóng không trúng.
- **(c) Ví dụ số** — Độ lệch của Trăng so với hoàng đạo lúc xa nút nhất \`≈ 5.1°\`. Ở khoảng cách Trăng, \`5.1°\` tương ứng lệch ~\`384400 × tan 5.1° ≈ 34000 km\` — lớn hơn bán kính bóng/đĩa rất nhiều → trượt qua.

**Hệ quả số:** vì mặt phẳng quỹ đạo Trăng cũng **tiến động** (nút quay ~1 vòng/18.6 năm), "mùa thực" xảy ra ~2 lần/năm, mỗi năm thường có **2–5 lần thực** (cả nhật + nguyệt). Không phải 24 lần như "mỗi tháng một lần".

> ⚠ **Lỗi thường gặp.** Nghĩ "nếu quỹ đạo Trăng phẳng trùng hoàng đạo thì sẽ thực mỗi tháng" — đúng về định tính, và đó chính là lý do thực hiếm: chỉ vì cái nghiêng 5° nhỏ bé. Đừng bỏ qua góc nghiêng này khi giải thích.

> 🔁 **Dừng lại tự kiểm tra.** Nếu quỹ đạo Trăng nghiêng \`0°\` (trùng hoàng đạo), một năm có bao nhiêu lần nhật thực?
> <details><summary>Đáp án</summary>12 (mỗi trăng non đều thẳng hàng → mỗi tháng 1 nhật thực) + 12 nguyệt thực. Chính góc nghiêng 5° làm con số tụt xuống còn 2–5/năm.</details>

---

## 4. Bóng umbra & penumbra

> 💡 **Trực giác.** Một vật chắn nguồn sáng **lớn** (không phải điểm) tạo hai vùng bóng: lõi tối hoàn toàn ở giữa, và viền mờ xung quanh nơi nguồn sáng bị che một phần.

- **Umbra (bóng tối)** — vùng nguồn sáng bị che **hoàn toàn**. Đứng trong umbra của Mặt Trăng → thấy nhật thực **toàn phần**. Trăng đi qua umbra Trái Đất → nguyệt thực toàn phần.
- **Penumbra (bóng nửa tối)** — vùng nguồn sáng bị che **một phần**. Đứng trong penumbra → thấy nhật thực **một phần**.
- **Antumbra** — vùng nối dài sau đỉnh umbra; ở đây Trăng quá xa nên không che hết Mặt Trời → **nhật thực hình khuyên (annular)**, viền sáng "nhẫn" quanh Trăng.

**Ví dụ số:** vệt umbra của Mặt Trăng trên mặt đất rộng chỉ ~100–270 km → nhật thực toàn phần chỉ thấy ở dải hẹp; penumbra rộng hàng nghìn km → vùng rộng lớn thấy một phần.

---

## 5. Thủy triều — Gradient hấp dẫn (Tides)

> 💡 **Trực giác.** Lực hấp dẫn của Mặt Trăng **không đều** trên Trái Đất: phía gần Trăng bị kéo mạnh hơn phía xa. Nước ở phía gần "phình" về phía Trăng; phía xa thì... cũng phình ra (vì phần rắn Trái Đất bị kéo "ra khỏi" nước phía xa). Kết quả: **hai bướu nước** — hai lần triều cao mỗi ngày.

**Định nghĩa lực triều (tidal force, 3 phần):**

- **(a) Là gì** — Hiệu lực hấp dẫn giữa hai điểm cách nhau (gradient của lực). Lực hấp dẫn \`∝ 1/r²\` nên chênh lệch (lực triều) \`∝ 1/r³\`.
- **(b) Vì sao quan trọng** — Chính chênh lệch (không phải lực tổng) tạo triều. Vì \`∝ 1/r³\`, vật **gần** quan trọng hơn vật **to-mà-xa**.
- **(c) Ví dụ số (vì sao Mặt Trăng thắng Mặt Trời dù Mặt Trời nặng hơn cực nhiều):** Mặt Trời nặng gấp ~\`2.7×10⁷\` lần Mặt Trăng, nhưng xa gấp ~\`389\` lần. Lực triều \`∝ M/r³\`:
  \`\`\`
  Tỉ lệ triều Trăng/Mặt Trời = (M_trăng/M_trời) × (r_trời/r_trăng)³
                             ≈ (1/2.7e7) × (389)³
                             ≈ (3.7e−8) × (5.89e7)
                             ≈ 2.2
  \`\`\`
  → Triều Mặt Trăng mạnh gấp **~2.2 lần** triều Mặt Trời. Mặt Trăng thắng nhờ ở gần (lũy thừa 3).

### 5.1 Triều cường & triều kém

- **Triều cường (spring tide)** — khi Mặt Trời, Trái Đất, Trăng **thẳng hàng** (trăng non hoặc trăng tròn): triều Mặt Trời + Mặt Trăng cộng dồn → biên độ triều **lớn nhất**.
- **Triều kém (neap tide)** — khi Mặt Trời và Trăng **vuông góc** (thượng/hạ huyền): hai triều triệt tiêu một phần → biên độ **nhỏ nhất**.

> ❓ **Câu hỏi tự nhiên.** *"Spring tide có liên quan mùa xuân không?"* — Không. "Spring" ở đây nghĩa "vọt lên" (như lò xo), xảy ra 2 lần/tháng âm (trăng non + trăng tròn), không liên quan mùa.

> 🔁 **Dừng lại tự kiểm tra.** Triều cường xảy ra vào những pha nào?
> <details><summary>Đáp án</summary>Trăng non và trăng tròn (Mặt Trời–Trái Đất–Trăng thẳng hàng, elongation 0° và 180°). Triều kém vào thượng huyền và hạ huyền (90°, 270°).</details>

> 📝 **Tóm tắt toàn bài.**
> - **Pha**: do góc nhìn vào nửa-sáng của Trăng (KHÔNG do bóng Trái Đất). Tháng giao hội 29.5 ngày > tháng sao 27.3 ngày vì Trái Đất cũng đi quanh Mặt Trời.
> - **Nhật thực**: trăng non, Trăng che Mặt Trời. **Nguyệt thực**: trăng tròn, Trái Đất che Trăng.
> - **Không thực mỗi tháng** vì quỹ đạo Trăng nghiêng ~5° → chỉ thực khi trăng non/tròn gần **nút**. ~2–5 lần/năm.
> - **Umbra** (toàn phần) / **penumbra** (một phần) / antumbra (hình khuyên).
> - **Triều** từ gradient hấp dẫn \`∝ M/r³\`; Trăng thắng Mặt Trời (~2.2×). Triều cường (thẳng hàng) / triều kém (vuông góc).

---

## Bài tập

1. **Pha & elongation.** Mặt Trăng có elongation \`90°\` (thượng huyền). Bao nhiêu % đĩa được chiếu sáng? Trăng mọc/lặn lúc nào?

2. **Tháng giao hội.** Giải thích bằng số vì sao tháng giao hội (29.5 ngày) dài hơn tháng sao (27.3 ngày).

3. **Điều kiện thực.** Đêm nay là trăng tròn nhưng không có nguyệt thực. Nêu lý do hình học.

4. **Lực triều.** Tính tỉ lệ lực triều của Mặt Trăng so với Mặt Trời (dùng \`M_trời/M_trăng ≈ 2.7×10⁷\`, \`r_trời/r_trăng ≈ 389\`). Vì sao Trăng thắng dù nhẹ hơn nhiều?

5. **Triều cường/kém.** Một ngư dân thấy hôm nay trăng tròn. Hôm nay triều cường hay triều kém? Còn 1 tuần sau (thượng/hạ huyền)?

---

## Lời giải chi tiết

### Bài 1 — Pha tại elongation 90°

Phần sáng \`≈ (1 − cos(elongation))/2 = (1 − cos 90°)/2 = (1 − 0)/2 = 0.5 = 50%\`.

→ Đúng một nửa đĩa sáng = thượng huyền (first quarter). Thượng huyền mọc khoảng giữa trưa (~12h) và lặn khoảng nửa đêm (~24h) — vì nó "đi sau" Mặt Trời 90° (≈ 6 giờ).

### Bài 2 — Tháng giao hội dài hơn tháng sao

Trong một tháng sao (27.3 ngày) Trăng quay đúng \`360°\` so với nền sao. Nhưng Trái Đất cũng đi quanh Mặt Trời \`360°/365.25 ≈ 0.986°/ngày\`:
\`\`\`
Trái Đất dịch trong 27.3 ngày: 27.3 × 0.986 ≈ 26.9°
\`\`\`
Để Mặt Trời–Trái Đất–Trăng lại thẳng hàng (cùng pha), Trăng phải quay thêm \`26.9°\`. Tốc độ tương đối Trăng so với hướng Mặt Trời \`≈ 13.18° − 0.986° = 12.19°/ngày\`:
\`\`\`
Thời gian bù = 26.9 / 12.19 ≈ 2.2 ngày
Tháng giao hội ≈ 27.3 + 2.2 ≈ 29.5 ngày ✓
\`\`\`

### Bài 3 — Trăng tròn nhưng không nguyệt thực

Vì quỹ đạo Mặt Trăng nghiêng ~5.1° so với hoàng đạo. Đêm nay tuy là trăng tròn (Trái Đất giữa Mặt Trời và Trăng về kinh độ), nhưng Trăng đang ở **xa nút** → nằm lệch lên trên (hoặc xuống dưới) mặt phẳng hoàng đạo tới ~34000 km → bóng (umbra) của Trái Đất trượt qua phía dưới/trên, không trùm lên Trăng → không có nguyệt thực. Chỉ khi trăng tròn rơi gần một nút mới có thực.

### Bài 4 — Tỉ lệ lực triều

Lực triều \`∝ M/r³\`:
\`\`\`
Tỉ lệ = (M_trăng/M_trời) × (r_trời/r_trăng)³
      = (1/2.7×10⁷) × (389)³
      = (3.70×10⁻⁸) × (5.886×10⁷)
      = 2.18
\`\`\`
→ Triều Mặt Trăng mạnh gấp ~**2.2 lần** triều Mặt Trời. Mặc dù Mặt Trời nặng hơn \`2.7×10⁷\` lần, nó xa hơn \`389\` lần và lực triều phụ thuộc \`1/r³\` → \`389³ ≈ 5.9×10⁷\` lấn át tỉ số khối lượng. Bài học: với triều, **gần** quan trọng hơn **nặng**.

### Bài 5 — Triều cường/kém theo pha

- **Hôm nay trăng tròn** → Mặt Trời–Trái Đất–Trăng thẳng hàng → triều Mặt Trời và Mặt Trăng cộng dồn → **triều cường (spring tide)**, biên độ lớn nhất.
- **1 tuần sau** → Trăng tới thượng/hạ huyền (elongation 90°/270°), Mặt Trời và Trăng vuông góc → hai triều triệt tiêu một phần → **triều kém (neap tide)**, biên độ nhỏ nhất.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Phase Geometry**: kéo slider vị trí Mặt Trăng trên quỹ đạo → mô phỏng hình học Mặt Trời–Trái Đất–Trăng, hiển thị pha tương ứng (đĩa sáng/tối) + elongation + % chiếu sáng live.
  - **Eclipse Simulator**: slider "vị trí nút" + chọn pha (non/tròn) → kiểm tra điều kiện thực: thẳng hàng đủ gần nút thì báo "có thực", lệch quá thì "không thực", minh họa vì sao không thực mỗi tháng.

---

## Bài tiếp theo

→ [Lesson 04 — Định luật Kepler](../lesson-04-kepler-laws/): hình dạng elip của quỹ đạo, định luật diện tích, và \`T² = a³\`. Ta sẽ hiểu vì sao Trăng (và mọi vật) chuyển động nhanh-chậm khác nhau trên quỹ đạo.

**Tham khảo chéo:** lực hấp dẫn nền tảng của triều sẽ học kỹ ở [Lesson 05 — Hấp dẫn & quỹ đạo](../lesson-05-gravity-orbits/).
`;
