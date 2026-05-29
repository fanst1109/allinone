// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/01-SolarSystem/lesson-02-seasons-sun/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mặt Trời & Mùa (The Sun & Seasons)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hoàng đạo (ecliptic)** là gì và vì sao Mặt Trời di chuyển trên đó suốt năm.
- Giải thích **độ nghiêng trục (axial tilt)** 23.5° là nguyên nhân DUY NHẤT của mùa — không phải khoảng cách Trái Đất–Mặt Trời.
- Phân biệt 4 mốc trong năm: **điểm phân (equinox)** và **điểm chí (solstice)**.
- Biết **xích vĩ Mặt Trời (solar declination, δ☉)** dao động \`±23.5°\` trong năm và tính được nó cho một ngày bất kỳ.
- Tính **độ cao Mặt Trời lúc trưa** bằng \`alt_noon = 90° − |φ − δ☉|\`, và giải thích độ dài ngày thay đổi theo vĩ độ + mùa.

## Kiến thức tiền đề

- **Xích vĩ (declination, δ)** và công thức độ cao cực đại — đã học ở [Lesson 01 — Thiên cầu & Tọa độ](../lesson-01-celestial-sphere/). Bài này coi Mặt Trời như "một ngôi sao có δ thay đổi trong năm".
- Góc, lượng giác cơ bản: [\`../../../Math/03-Trig-Complex/\`](../../../Math/03-Trig-Complex/).

---

## 1. Hoàng đạo — Đường đi của Mặt Trời trong năm (Ecliptic)

> 💡 **Trực giác / Hình dung.** Trái Đất quay quanh Mặt Trời trên một mặt phẳng. Nhưng đứng trên Trái Đất, ta lại có cảm giác **Mặt Trời** mới là cái di chuyển — mỗi ngày nó nhích một chút so với nền sao phía sau, sau đúng một năm thì quay về chỗ cũ. Vệt đường mà Mặt Trời "vẽ" trên nền sao đó gọi là **hoàng đạo**. Nó chính là hình chiếu của mặt phẳng quỹ đạo Trái Đất lên thiên cầu.

**Định nghĩa hoàng đạo (3 phần):**

- **(a) Là gì** — Hoàng đạo là **đường tròn lớn** trên thiên cầu mà Mặt Trời đi qua trong một năm (nhìn từ Trái Đất). Vì Trái Đất quay quanh Mặt Trời, hướng nhìn tới Mặt Trời thay đổi dần, vẽ thành vòng kín này.
- **(b) Vì sao cần** — Nó cho ta một "thước đo thời gian trong năm": vị trí Mặt Trời trên hoàng đạo xác định ngày nào trong năm, mùa nào, độ cao trưa ra sao. Mặt Trăng và các hành tinh cũng luôn ở gần hoàng đạo → đây là "đại lộ" của Hệ Mặt Trời trên bầu trời.
- **(c) Ví dụ trực giác bằng số** — Mặt Trời đi hết \`360°\` hoàng đạo trong \`365.25\` ngày → mỗi ngày dịch \`360 / 365.25 ≈ 0.986°\`, tức khoảng **1° mỗi ngày**, gần bằng đường kính góc của chính nó (\`0.5°\`).

**Điểm mấu chốt:** hoàng đạo **nghiêng \`23.5°\`** so với **xích đạo trời (celestial equator)**. Góc nghiêng này chính là độ nghiêng trục Trái Đất — và là lý do toàn bộ câu chuyện mùa tồn tại.

> ⚠ **Lỗi thường gặp.** Nhầm hoàng đạo (đường Mặt Trời đi trong **năm**) với đường đi hằng **ngày** của Mặt Trời (do Trái Đất tự quay, đông → tây). Hoàng đạo là chuyển động chậm trên nền sao (1°/ngày); chuyển động ngày là nhanh (15°/giờ — xem Lesson 01, nhật động).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao ta không thấy được các sao "phía sau" Mặt Trời?
> <details><summary>Đáp án</summary>Vì ánh sáng Mặt Trời ban ngày làm sáng cả bầu trời, che mất các sao nằm cùng hướng. Khi Mặt Trời "đi" dọc hoàng đạo, chòm sao bị che cũng đổi theo tháng — đó là gốc của 12 chòm hoàng đạo (zodiac).</details>

---

## 2. Độ nghiêng trục 23.5° — Nguyên nhân thật sự của mùa

> 💡 **Trực giác.** Cầm một quả cam (Trái Đất) cắm một cây tăm xuyên qua làm trục, rồi nghiêng cây tăm \`23.5°\` so với phương thẳng đứng. Đưa quả cam đi vòng quanh một ngọn đèn (Mặt Trời) mà **luôn giữ nguyên hướng nghiêng** của cây tăm. Sẽ có nửa năm bán cầu bắc "chúi" về phía đèn (nhận nhiều sáng → mùa hè), nửa năm còn lại "ngả ra xa" (mùa đông). Trục nghiêng + giữ nguyên hướng = mùa.

**Định nghĩa độ nghiêng trục (axial tilt / obliquity, 3 phần):**

- **(a) Là gì** — Góc giữa trục tự quay của Trái Đất và đường vuông góc với mặt phẳng quỹ đạo. Với Trái Đất, góc này là \`ε = 23.5°\` (chính xác hơn \`23.44°\`).
- **(b) Vì sao quan trọng** — Nếu trục **không** nghiêng (\`ε = 0\`), Mặt Trời luôn ở xích đạo trời, mọi nơi có ngày-đêm bằng nhau quanh năm, **không có mùa**. Chính độ nghiêng làm góc tới của tia nắng và độ dài ngày thay đổi theo mùa.
- **(c) Ví dụ trực giác bằng số** — Vào hạ chí, bán cầu bắc nghiêng về Mặt Trời nên Mặt Trời lên tới \`δ☉ = +23.5°\`; nửa năm sau (đông chí) nó xuống \`δ☉ = −23.5°\`. Khoảng dao động \`±23.5°\` đúng bằng độ nghiêng trục.

### ⚠ Lỗi PHỔ BIẾN NHẤT: "Mùa hè vì Trái Đất gần Mặt Trời hơn" — SAI

> ⚠ **Lỗi thường gặp (cực kỳ phổ biến).** Rất nhiều người tin mùa hè nóng vì Trái Đất ở gần Mặt Trời hơn. **Hoàn toàn sai.** Hai bằng chứng phản bác:
>
> 1. **Hai bán cầu ngược mùa cùng lúc.** Khi bắc bán cầu là mùa hè (tháng 7) thì nam bán cầu là mùa đông. Nếu nguyên nhân là khoảng cách, cả hành tinh phải cùng mùa — vô lý.
> 2. **Trái Đất thực ra GẦN Mặt Trời nhất vào tháng 1** (điểm cận nhật *perihelion*, ~147.1 triệu km) và **xa nhất vào tháng 7** (điểm viễn nhật *aphelion*, ~152.1 triệu km). Tức là bắc bán cầu nóng nhất (tháng 7) đúng lúc Trái Đất **xa** Mặt Trời nhất!
>
> Chênh lệch khoảng cách chỉ \`~3.3%\` → chênh lượng nhiệt nhận \`~7%\`, quá nhỏ so với hiệu ứng của góc nghiêng.

**Vậy nguyên nhân thật là gì? Hai cơ chế của độ nghiêng:**

1. **Góc tới của tia nắng.** Mùa hè Mặt Trời lên cao → tia nắng chiếu gần thẳng đứng → cùng một chùm sáng dồn vào diện tích nhỏ → đậm đặc, nóng. Mùa đông Mặt Trời thấp → tia nắng xiên → trải trên diện tích lớn → loãng, lạnh.
2. **Độ dài ngày.** Mùa hè ngày dài → mặt đất được sưởi nhiều giờ hơn. Mùa đông ngày ngắn → ít giờ sưởi.

**Ví dụ số (góc tới):** Cường độ nắng tỉ lệ với \`sin(alt)\`. Ở Hà Nội trưa hạ chí \`alt ≈ 88°\` → \`sin 88° ≈ 0.999\`; trưa đông chí \`alt ≈ 45°\` → \`sin 45° ≈ 0.707\`. Tỉ lệ \`0.707 / 0.999 ≈ 0.71\` → mùa đông mỗi mét vuông chỉ nhận ~71% năng lượng so với mùa hè, chỉ riêng do góc.

> 🔁 **Dừng lại tự kiểm tra.** Sao Thiên Vương (Uranus) có độ nghiêng trục ~98° (gần như "nằm ngang"). Mùa của nó sẽ cực đoan thế nào?
> <details><summary>Đáp án</summary>Cực kỳ cực đoan: mỗi cực lần lượt hướng thẳng vào Mặt Trời suốt ~42 năm Trái Đất (một nửa chu kỳ quỹ đạo 84 năm), rồi chìm trong bóng tối 42 năm. Độ nghiêng càng lớn, mùa càng khắc nghiệt.</details>

---

## 3. Điểm phân & Điểm chí (Equinoxes & Solstices)

Bốn mốc đặc biệt khi Mặt Trời đi dọc hoàng đạo, xác định bởi xích vĩ Mặt Trời \`δ☉\`:

> 💡 **Trực giác.** Hình dung \`δ☉\` như một con lắc đung đưa giữa \`+23.5°\` và \`−23.5°\` trong năm. Hai đầu mút (con lắc dừng lại để đảo chiều) là **điểm chí**; hai lần đi ngang điểm giữa \`0°\` là **điểm phân**.

| Mốc | Ngày (gần đúng) | δ☉ | Ý nghĩa ở bắc bán cầu |
|---|---|---|---|
| **Xuân phân (vernal equinox)** | ~20/3 | \`0°\` | Ngày = đêm khắp nơi; bắt đầu xuân |
| **Hạ chí (summer solstice)** | ~21/6 | \`+23.5°\` | Mặt Trời cao nhất, ngày dài nhất |
| **Thu phân (autumnal equinox)** | ~23/9 | \`0°\` | Ngày = đêm; bắt đầu thu |
| **Đông chí (winter solstice)** | ~21/12 | \`−23.5°\` | Mặt Trời thấp nhất, ngày ngắn nhất |

- **Điểm phân (equinox)** — "equi-nox" = "đêm bằng" (ngày bằng đêm). Mặt Trời ở ngay xích đạo trời (\`δ☉ = 0\`), mọc chính đông, lặn chính tây, mọi nơi có ~12h ngày + 12h đêm.
- **Điểm chí (solstice)** — "sol-stice" = "Mặt Trời đứng" (sun stands still). \`δ☉\` đạt cực trị \`±23.5°\` rồi đảo chiều; độ cao trưa của Mặt Trời "dừng" tại cực đại/cực tiểu vài ngày.

**4 ví dụ số (δ☉ cho vài ngày):**

| Ngày | δ☉ xấp xỉ | Trạng thái |
|---|---|---|
| 20/3 (xuân phân) | \`0°\` | Mặt Trời ở xích đạo trời |
| 5/5 | \`≈ +16°\` | Đang lên về phía hạ chí |
| 21/6 (hạ chí) | \`+23.5°\` | Cực bắc của hoàng đạo |
| 21/12 (đông chí) | \`−23.5°\` | Cực nam của hoàng đạo |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao mùa hè nóng nhất là tháng 7-8, chứ không phải đúng hạ chí 21/6?"* — Vì có **độ trễ mùa (seasonal lag)**: mặt đất và đại dương cần thời gian để tích nhiệt. Đỉnh nhận nắng là hạ chí, nhưng đỉnh nhiệt độ trễ ~1-1.5 tháng. Giống đun nước: lửa to nhất một lúc, nước sôi sau đó.
> - *"Ngày 'dài nhất' nghĩa là Mặt Trời ở lâu nhất trên trời?"* — Đúng. Hạ chí ở bắc bán cầu là ngày có nhiều giờ sáng nhất vì cung đường Mặt Trời trên chân trời dài nhất.

> 🔁 **Dừng lại tự kiểm tra.** Ngày xuân phân, một người ở xích đạo (\`φ = 0\`) thấy Mặt Trời trưa cao bao nhiêu?
> <details><summary>Đáp án</summary>\`alt_noon = 90° − |0° − 0°| = 90°\` — ngay đỉnh đầu (thiên đỉnh). Ở xích đạo vào điểm phân, Mặt Trời trưa đúng zenith.</details>

---

## 4. Tính xích vĩ Mặt Trời & độ cao trưa

### 4.1 Xích vĩ Mặt Trời theo ngày (gần đúng)

\`δ☉\` biến thiên gần hình sin trong năm. Công thức xấp xỉ tốt:

\`\`\`
δ☉ ≈ −23.5° × cos( 360° × (N + 10) / 365 )
\`\`\`

với \`N\` = số thứ tự ngày trong năm (1/1 → N=1). Số \`10\` vì đông chí (\`δ☉\` cực tiểu) rơi vào ~10 ngày trước 1/1.

**Walk-through bằng số thật (verify):**

- **Hạ chí 21/6** → \`N ≈ 172\`. \`360° × (172+10)/365 = 360° × 182/365 ≈ 179.5°\`. \`cos 179.5° ≈ −1\`. → \`δ☉ ≈ −23.5° × (−1) = +23.5°\` ✓ (khớp hạ chí).
- **Đông chí 21/12** → \`N ≈ 355\`. \`360° × 365/365 = 360°\`. \`cos 360° = 1\`. → \`δ☉ ≈ −23.5° × 1 = −23.5°\` ✓ (khớp đông chí).
- **Xuân phân 20/3** → \`N ≈ 79\`. \`360° × 89/365 ≈ 87.8°\`. \`cos 87.8° ≈ 0.038\`. → \`δ☉ ≈ −0.9° ≈ 0°\` ✓ (gần 0, sai số nhỏ do công thức xấp xỉ).
- **1/1** → \`N = 1\`. \`360° × 11/365 ≈ 10.8°\`. \`cos 10.8° ≈ 0.982\`. → \`δ☉ ≈ −23.1°\` (đầu năm vẫn rất gần đông chí — hợp lý).

### 4.2 Độ cao Mặt Trời lúc trưa

Mặt Trời lúc trưa = một "sao" với \`δ = δ☉\` đang qua kinh tuyến. Áp dụng đúng công thức transit của Lesson 01:

> 📐 **Công thức then chốt:**
>
> \`alt_noon = 90° − |φ − δ☉|\`
>
> \`φ\` = vĩ độ người quan sát, \`δ☉\` = xích vĩ Mặt Trời ngày đó.

**Walk-through (verify) — Hà Nội \`φ = 21°\`:**

| Ngày | δ☉ | alt_noon = 90° − |φ − δ☉| | |
|---|---|---|---|
| Hạ chí | \`+23.5°\` | \`90° − |21 − 23.5| = 90° − 2.5° = 87.5°\` | gần thiên đỉnh, rất nóng |
| Xuân/thu phân | \`0°\` | \`90° − |21 − 0| = 90° − 21° = 69°\` | trung bình |
| Đông chí | \`−23.5°\` | \`90° − |21 − (−23.5)| = 90° − 44.5° = 45.5°\` | thấp, nắng xiên |

→ Ở Hà Nội, Mặt Trời trưa dao động từ \`45.5°\` (đông chí) tới \`87.5°\` (hạ chí), chênh đúng \`2 × 23.5° = 47°\`. Đây là biên độ mùa.

> ⚠ **Lỗi thường gặp.** Quên trị tuyệt đối \`| |\` → ra độ cao > 90° (vô lý). Như Lesson 01, trị tuyệt đối đảm bảo \`alt_noon ≤ 90°\`.

### 4.3 Độ dài ngày theo vĩ độ & mùa

> 💡 **Trực giác.** Độ dài ngày = bao nhiêu phần cung quỹ đạo hằng ngày của Mặt Trời nằm **trên** chân trời. Ở xích đạo, đường này luôn cắt đôi bởi chân trời → ngày = đêm = 12h quanh năm. Càng lên cao vĩ độ, mùa hè cung trên chân trời càng dài (ngày dài), mùa đông càng ngắn.

Công thức **góc giờ lúc Mặt Trời mọc/lặn** \`H₀\` (độ):

\`\`\`
cos H₀ = −tan φ × tan δ☉
\`\`\`

Độ dài ngày \`= 2 × H₀ / 15\` (giờ), vì \`15°\` = 1 giờ.

**Walk-through (verify) — Hà Nội \`φ = 21°\`, hạ chí \`δ☉ = +23.5°\`:**

\`\`\`
cos H₀ = −tan(21°) × tan(23.5°)
       = −(0.3839) × (0.4348)
       = −0.1669
H₀ = arccos(−0.1669) = 99.6°
Độ dài ngày = 2 × 99.6° / 15 = 13.3 giờ
\`\`\`

→ Hạ chí ở Hà Nội ngày dài ~13h 17m. Đông chí (\`δ☉ = −23.5°\`) đối xứng: \`cos H₀ = +0.1669 → H₀ = 80.4° →\` ngày ~10h 43m. Tổng hai = 24h (đối xứng) ✓.

**4 ví dụ độ dài ngày hạ chí theo vĩ độ:**

| Vĩ độ φ | Độ dài ngày hạ chí | Ghi chú |
|---|---|---|
| \`0°\` (xích đạo) | 12h 0m | luôn 12h quanh năm |
| \`21°\` (Hà Nội) | ~13h 17m | chênh nhẹ |
| \`51°\` (London) | ~16h 38m | ngày dài rõ rệt |
| \`≥ 66.5°\` (Vòng Bắc Cực) | 24h ("ngày trắng") | Mặt Trời không lặn |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao ở Vòng Bắc Cực có ngày 24h?"* — Vì ở \`φ ≥ 66.5° = 90° − 23.5°\`, vào hạ chí \`−tan φ × tan δ☉ < −1\` → \`cos H₀ < −1\` (vô nghiệm) → Mặt Trời **không lặn** suốt 24h. Đông chí thì ngược lại: 24h đêm.

> 🔁 **Dừng lại tự kiểm tra.** Ngày điểm phân (\`δ☉ = 0\`), độ dài ngày ở MỌI vĩ độ là bao nhiêu?
> <details><summary>Đáp án</summary>\`cos H₀ = −tan φ × tan 0 = 0 → H₀ = 90°\`. Độ dài ngày = \`2 × 90 / 15 = 12h\` ở mọi vĩ độ. Đây đúng là ý nghĩa "equinox = đêm bằng".</details>

> 📝 **Tóm tắt toàn bài.**
> - **Hoàng đạo**: đường Mặt Trời đi trong năm trên thiên cầu, nghiêng \`23.5°\` so với xích đạo trời.
> - **Mùa do trục nghiêng \`23.5°\`**, KHÔNG do khoảng cách (Trái Đất còn gần Mặt Trời nhất vào tháng 1).
> - Cơ chế: góc tới tia nắng + độ dài ngày.
> - **δ☉** dao động \`±23.5°\`: hạ chí \`+23.5°\`, đông chí \`−23.5°\`, điểm phân \`0°\`.
> - \`alt_noon = 90° − |φ − δ☉|\`; độ dài ngày từ \`cos H₀ = −tan φ tan δ☉\`.

---

## Bài tập

1. **Độ cao trưa.** Tính độ cao Mặt Trời lúc trưa ở TP.HCM (\`φ = 10.8°\`) vào hạ chí và đông chí. Vào hạ chí, Mặt Trời ở phía bắc hay nam thiên đỉnh?

2. **Hai bán cầu ngược mùa.** Cùng ngày hạ chí bắc bán cầu (\`δ☉ = +23.5°\`), tính độ cao trưa của Mặt Trời tại Sydney (\`φ = −34°\`). So sánh với mùa ở đó.

3. **Xích vĩ theo ngày.** Dùng công thức xấp xỉ, tính \`δ☉\` cho ngày 5/8 (\`N = 217\`). Mặt Trời đang đi về phía mốc nào?

4. **Độ dài ngày.** Tính độ dài ngày ở London (\`φ = 51°\`) vào đông chí (\`δ☉ = −23.5°\`).

5. **Phản biện ngộ nhận.** Một bạn nói: "Tháng 7 nóng vì Trái Đất gần Mặt Trời nhất." Hãy chỉ ra 2 lý do bạn đó sai, kèm số liệu.

---

## Lời giải chi tiết

### Bài 1 — Độ cao trưa ở TP.HCM

Dùng \`alt_noon = 90° − |φ − δ☉|\`, \`φ = 10.8°\`.

- **Hạ chí** (\`δ☉ = +23.5°\`): \`90° − |10.8 − 23.5| = 90° − 12.7° = 77.3°\`. Vì \`δ☉ > φ\`, Mặt Trời trưa qua kinh tuyến ở **phía bắc** thiên đỉnh (Mặt Trời chếch về bắc — hiện tượng quen thuộc ở vùng nhiệt đới gần xích đạo).
- **Đông chí** (\`δ☉ = −23.5°\`): \`90° − |10.8 − (−23.5)| = 90° − 34.3° = 55.7°\`, ở phía nam thiên đỉnh.

→ TP.HCM Mặt Trời trưa rất cao quanh năm (\`55.7°\`–\`77.3°\`), một năm có 2 lần Mặt Trời qua đúng thiên đỉnh (khi \`δ☉ = φ = 10.8°\`).

### Bài 2 — Sydney vào hạ chí bắc bán cầu

\`φ = −34°\`, \`δ☉ = +23.5°\`:
\`\`\`
alt_noon = 90° − |−34 − 23.5| = 90° − 57.5° = 32.5°
\`\`\`
Mặt Trời trưa chỉ cao \`32.5°\` → nắng xiên, ngày ngắn → Sydney đang **mùa đông**. Khớp với thực tế: tháng 6 là mùa đông ở nam bán cầu — bằng chứng mùa do trục nghiêng, không do khoảng cách.

### Bài 3 — δ☉ ngày 5/8

\`N = 217\`:
\`\`\`
góc = 360° × (217 + 10)/365 = 360° × 227/365 = 223.9°
cos 223.9° = −0.720
δ☉ ≈ −23.5° × (−0.720) = +16.9°
\`\`\`
\`δ☉ ≈ +16.9°\`, dương và đang **giảm** dần từ \`+23.5°\` (hạ chí 21/6) về \`0°\` (thu phân 23/9) → Mặt Trời đang đi về phía **thu phân**.

### Bài 4 — Độ dài ngày London đông chí

\`φ = 51°\`, \`δ☉ = −23.5°\`:
\`\`\`
cos H₀ = −tan(51°) × tan(−23.5°) = −(1.2349) × (−0.4348) = +0.5369
H₀ = arccos(0.5369) = 57.5°
Độ dài ngày = 2 × 57.5 / 15 = 7.66 giờ ≈ 7h 40m
\`\`\`
→ Đông chí ở London ngày chỉ ~7h 40m (đêm dài ~16h 20m). So với hạ chí ~16h 38m → biên độ mùa rất lớn ở vĩ độ cao, lý do mùa đông Bắc Âu u tối.

### Bài 5 — Phản biện ngộ nhận

1. **Hai bán cầu ngược mùa cùng lúc.** Tháng 7 bắc bán cầu là hè thì nam bán cầu (vd Sydney, bài 2: alt trưa chỉ 32.5°) là đông. Nếu nguyên nhân là khoảng cách thì cả Trái Đất phải cùng mùa — mâu thuẫn.
2. **Tháng 7 Trái Đất ở XA Mặt Trời nhất** (viễn nhật ~152.1 triệu km), tháng 1 mới gần nhất (cận nhật ~147.1 triệu km). Vậy bắc bán cầu nóng nhất đúng lúc xa Mặt Trời nhất → khoảng cách không thể là nguyên nhân. Chênh khoảng cách chỉ ~3.3%, ảnh hưởng nhiệt ~7%, nhỏ so với hiệu ứng góc nghiêng.

Nguyên nhân thật: trục nghiêng \`23.5°\` → góc tới tia nắng + độ dài ngày thay đổi theo mùa.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Year & Sun Path**: slider ngày-trong-năm → tính \`δ☉\`, vẽ đường đi Mặt Trời trên bầu trời cho một vĩ độ chọn được, hiện độ cao trưa + độ dài ngày live.
  - **Tilt Explainer**: mô phỏng Trái Đất quanh Mặt Trời với trục nghiêng \`23.5°\` giữ nguyên hướng → xem bán cầu nào "chúi" về Mặt Trời theo mùa, kèm nhắc nhở "không phải do khoảng cách".

---

## Bài tiếp theo

→ [Lesson 03 — Mặt Trăng & thực](../lesson-03-moon-eclipses/): pha trăng, tháng giao hội 29.5 ngày, điều kiện nhật/nguyệt thực, và vì sao không có thực mỗi tháng. Ta sẽ dùng lại ý "hình học góc giữa các thiên thể" của bài này.

**Tham khảo chéo:** công thức transit \`90° − |φ − δ|\` từ [Lesson 01](../lesson-01-celestial-sphere/); lượng giác: [\`../../../Math/03-Trig-Complex/\`](../../../Math/03-Trig-Complex/).
`;
