// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/01-SolarSystem/lesson-02-seasons-sun/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mặt Trời & Mùa (The Sun & Seasons)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **hoàng đạo (ecliptic)** là gì và vì sao Mặt Trời di chuyển trên đó suốt năm.
- Giải thích **độ nghiêng trục (axial tilt)** $23{,}5^\\circ$ là nguyên nhân DUY NHẤT của mùa — không phải khoảng cách Trái Đất–Mặt Trời.
- Phân biệt 4 mốc trong năm: **điểm phân (equinox)** và **điểm chí (solstice)**.
- Biết **xích vĩ Mặt Trời (solar declination, $\\delta_\\odot$)** dao động $\\pm 23{,}5^\\circ$ trong năm và tính được nó cho một ngày bất kỳ.
- Tính **độ cao Mặt Trời lúc trưa** bằng $\\text{alt}_{noon} = 90^\\circ - |\\varphi - \\delta_\\odot|$, và giải thích độ dài ngày thay đổi theo vĩ độ + mùa.

## Kiến thức tiền đề

- **Xích vĩ (declination, $\\delta$)** và công thức độ cao cực đại — đã học ở [Lesson 01 — Thiên cầu & Tọa độ](../lesson-01-celestial-sphere/). Bài này coi Mặt Trời như "một ngôi sao có $\\delta$ thay đổi trong năm".
- Góc, lượng giác cơ bản: [\`../../../Math/03-Trig-Complex/\`](../../../Math/03-Trig-Complex/).

---

## 1. Hoàng đạo — Đường đi của Mặt Trời trong năm (Ecliptic)

> 💡 **Trực giác / Hình dung.** Trái Đất quay quanh Mặt Trời trên một mặt phẳng. Nhưng đứng trên Trái Đất, ta lại có cảm giác **Mặt Trời** mới là cái di chuyển — mỗi ngày nó nhích một chút so với nền sao phía sau, sau đúng một năm thì quay về chỗ cũ. Vệt đường mà Mặt Trời "vẽ" trên nền sao đó gọi là **hoàng đạo**. Nó chính là hình chiếu của mặt phẳng quỹ đạo Trái Đất lên thiên cầu.

**Định nghĩa hoàng đạo (3 phần):**

- **(a) Là gì** — Hoàng đạo là **đường tròn lớn** trên thiên cầu mà Mặt Trời đi qua trong một năm (nhìn từ Trái Đất). Vì Trái Đất quay quanh Mặt Trời, hướng nhìn tới Mặt Trời thay đổi dần, vẽ thành vòng kín này.
- **(b) Vì sao cần** — Nó cho ta một "thước đo thời gian trong năm": vị trí Mặt Trời trên hoàng đạo xác định ngày nào trong năm, mùa nào, độ cao trưa ra sao. Mặt Trăng và các hành tinh cũng luôn ở gần hoàng đạo → đây là "đại lộ" của Hệ Mặt Trời trên bầu trời.
- **(c) Ví dụ trực giác bằng số** — Mặt Trời đi hết $360^\\circ$ hoàng đạo trong $365{,}25$ ngày → mỗi ngày dịch $360 / 365{,}25 \\approx 0{,}986^\\circ$, tức khoảng **1° mỗi ngày**, gần bằng đường kính góc của chính nó ($0{,}5^\\circ$).

**Điểm mấu chốt:** hoàng đạo **nghiêng $23{,}5^\\circ$** so với **xích đạo trời (celestial equator)**. Góc nghiêng này chính là độ nghiêng trục Trái Đất — và là lý do toàn bộ câu chuyện mùa tồn tại.

> ⚠ **Lỗi thường gặp.** Nhầm hoàng đạo (đường Mặt Trời đi trong **năm**) với đường đi hằng **ngày** của Mặt Trời (do Trái Đất tự quay, đông → tây). Hoàng đạo là chuyển động chậm trên nền sao (1°/ngày); chuyển động ngày là nhanh (15°/giờ — xem Lesson 01, nhật động).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao ta không thấy được các sao "phía sau" Mặt Trời?
> <details><summary>Đáp án</summary>Vì ánh sáng Mặt Trời ban ngày làm sáng cả bầu trời, che mất các sao nằm cùng hướng. Khi Mặt Trời "đi" dọc hoàng đạo, chòm sao bị che cũng đổi theo tháng — đó là gốc của 12 chòm hoàng đạo (zodiac).</details>

---

## 2. Độ nghiêng trục 23.5° — Nguyên nhân thật sự của mùa

> 💡 **Trực giác.** Cầm một quả cam (Trái Đất) cắm một cây tăm xuyên qua làm trục, rồi nghiêng cây tăm \`23.5°\` so với phương thẳng đứng. Đưa quả cam đi vòng quanh một ngọn đèn (Mặt Trời) mà **luôn giữ nguyên hướng nghiêng** của cây tăm. Sẽ có nửa năm bán cầu bắc "chúi" về phía đèn (nhận nhiều sáng → mùa hè), nửa năm còn lại "ngả ra xa" (mùa đông). Trục nghiêng + giữ nguyên hướng = mùa.

**Định nghĩa độ nghiêng trục (axial tilt / obliquity, 3 phần):**

- **(a) Là gì** — Góc giữa trục tự quay của Trái Đất và đường vuông góc với mặt phẳng quỹ đạo. Với Trái Đất, góc này là $\\varepsilon = 23{,}5^\\circ$ (chính xác hơn $23{,}44^\\circ$).
- **(b) Vì sao quan trọng** — Nếu trục **không** nghiêng ($\\varepsilon = 0$), Mặt Trời luôn ở xích đạo trời, mọi nơi có ngày-đêm bằng nhau quanh năm, **không có mùa**. Chính độ nghiêng làm góc tới của tia nắng và độ dài ngày thay đổi theo mùa.
- **(c) Ví dụ trực giác bằng số** — Vào hạ chí, bán cầu bắc nghiêng về Mặt Trời nên Mặt Trời lên tới $\\delta_\\odot = +23{,}5^\\circ$; nửa năm sau (đông chí) nó xuống $\\delta_\\odot = -23{,}5^\\circ$. Khoảng dao động $\\pm 23{,}5^\\circ$ đúng bằng độ nghiêng trục.


### ⚠ Lỗi PHỔ BIẾN NHẤT: "Mùa hè vì Trái Đất gần Mặt Trời hơn" — SAI

> ⚠ **Lỗi thường gặp (cực kỳ phổ biến).** Rất nhiều người tin mùa hè nóng vì Trái Đất ở gần Mặt Trời hơn. **Hoàn toàn sai.** Hai bằng chứng phản bác:
>
> 1. **Hai bán cầu ngược mùa cùng lúc.** Khi bắc bán cầu là mùa hè (tháng 7) thì nam bán cầu là mùa đông. Nếu nguyên nhân là khoảng cách, cả hành tinh phải cùng mùa — vô lý.
> 2. **Trái Đất thực ra GẦN Mặt Trời nhất vào tháng 1** (điểm cận nhật *perihelion*, ~147,1 triệu km) và **xa nhất vào tháng 7** (điểm viễn nhật *aphelion*, ~152,1 triệu km). Tức là bắc bán cầu nóng nhất (tháng 7) đúng lúc Trái Đất **xa** Mặt Trời nhất!
>
> Chênh lệch khoảng cách chỉ $\\sim 3{,}3\\%$ → chênh lượng nhiệt nhận $\\sim 7\\%$, quá nhỏ so với hiệu ứng của góc nghiêng.

**Vậy nguyên nhân thật là gì? Hai cơ chế của độ nghiêng:**

1. **Góc tới của tia nắng.** Mùa hè Mặt Trời lên cao → tia nắng chiếu gần thẳng đứng → cùng một chùm sáng dồn vào diện tích nhỏ → đậm đặc, nóng. Mùa đông Mặt Trời thấp → tia nắng xiên → trải trên diện tích lớn → loãng, lạnh.
2. **Độ dài ngày.** Mùa hè ngày dài → mặt đất được sưởi nhiều giờ hơn. Mùa đông ngày ngắn → ít giờ sưởi.

**Ví dụ số (góc tới):** Cường độ nắng tỉ lệ với $\\sin(\\text{alt})$. Ở Hà Nội trưa hạ chí $\\text{alt} \\approx 88^\\circ \\to \\sin 88^\\circ \\approx 0{,}999$; trưa đông chí $\\text{alt} \\approx 45^\\circ \\to \\sin 45^\\circ \\approx 0{,}707$. Tỉ lệ $0{,}707 / 0{,}999 \\approx 0{,}71$ → mùa đông mỗi mét vuông chỉ nhận ~71% năng lượng so với mùa hè, chỉ riêng do góc.

> 🔁 **Dừng lại tự kiểm tra.** Sao Thiên Vương (Uranus) có độ nghiêng trục ~98° (gần như "nằm ngang"). Mùa của nó sẽ cực đoan thế nào?
> <details><summary>Đáp án</summary>Cực kỳ cực đoan: mỗi cực lần lượt hướng thẳng vào Mặt Trời suốt ~42 năm Trái Đất (một nửa chu kỳ quỹ đạo 84 năm), rồi chìm trong bóng tối 42 năm. Độ nghiêng càng lớn, mùa càng khắc nghiệt.</details>

---

## 3. Điểm phân & Điểm chí (Equinoxes & Solstices)

Bốn mốc đặc biệt khi Mặt Trời đi dọc hoàng đạo, xác định bởi xích vĩ Mặt Trời $\\delta_\\odot$:

> 💡 **Trực giác.** Hình dung $\\delta_\\odot$ như một con lắc đung đưa giữa $+23{,}5^\\circ$ và $-23{,}5^\\circ$ trong năm. Hai đầu mút (con lắc dừng lại để đảo chiều) là **điểm chí**; hai lần đi ngang điểm giữa $0^\\circ$ là **điểm phân**.

| Mốc | Ngày (gần đúng) | $\\delta_\\odot$ | Ý nghĩa ở bắc bán cầu |
|---|---|---|---|
| **Xuân phân (vernal equinox)** | ~20/3 | $0^\\circ$ | Ngày = đêm khắp nơi; bắt đầu xuân |
| **Hạ chí (summer solstice)** | ~21/6 | $+23{,}5^\\circ$ | Mặt Trời cao nhất, ngày dài nhất |
| **Thu phân (autumnal equinox)** | ~23/9 | $0^\\circ$ | Ngày = đêm; bắt đầu thu |
| **Đông chí (winter solstice)** | ~21/12 | $-23{,}5^\\circ$ | Mặt Trời thấp nhất, ngày ngắn nhất |

- **Điểm phân (equinox)** — "equi-nox" = "đêm bằng" (ngày bằng đêm). Mặt Trời ở ngay xích đạo trời ($\\delta_\\odot = 0$), mọc chính đông, lặn chính tây, mọi nơi có ~12h ngày + 12h đêm.
- **Điểm chí (solstice)** — "sol-stice" = "Mặt Trời đứng" (sun stands still). $\\delta_\\odot$ đạt cực trị $\\pm 23{,}5^\\circ$ rồi đảo chiều; độ cao trưa của Mặt Trời "dừng" tại cực đại/cực tiểu vài ngày.

**4 ví dụ số ($\\delta_\\odot$ cho vài ngày):**

| Ngày | $\\delta_\\odot$ xấp xỉ | Trạng thái |
|---|---|---|
| 20/3 (xuân phân) | $0^\\circ$ | Mặt Trời ở xích đạo trời |
| 5/5 | $\\approx +16^\\circ$ | Đang lên về phía hạ chí |
| 21/6 (hạ chí) | $+23{,}5^\\circ$ | Cực bắc của hoàng đạo |
| 21/12 (đông chí) | $-23{,}5^\\circ$ | Cực nam của hoàng đạo |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao mùa hè nóng nhất là tháng 7-8, chứ không phải đúng hạ chí 21/6?"* — Vì có **độ trễ mùa (seasonal lag)**: mặt đất và đại dương cần thời gian để tích nhiệt. Đỉnh nhận nắng là hạ chí, nhưng đỉnh nhiệt độ trễ ~1-1.5 tháng. Giống đun nước: lửa to nhất một lúc, nước sôi sau đó.
> - *"Ngày 'dài nhất' nghĩa là Mặt Trời ở lâu nhất trên trời?"* — Đúng. Hạ chí ở bắc bán cầu là ngày có nhiều giờ sáng nhất vì cung đường Mặt Trời trên chân trời dài nhất.

> 🔁 **Dừng lại tự kiểm tra.** Ngày xuân phân, một người ở xích đạo ($\\varphi = 0$) thấy Mặt Trời trưa cao bao nhiêu?
> <details><summary>Đáp án</summary>$\\text{alt}_{noon} = 90^\\circ - |0^\\circ - 0^\\circ| = 90^\\circ$ — ngay đỉnh đầu (thiên đỉnh). Ở xích đạo vào điểm phân, Mặt Trời trưa đúng zenith.</details>

---

## 4. Tính xích vĩ Mặt Trời & độ cao trưa

### 4.1 Xích vĩ Mặt Trời theo ngày (gần đúng)

$\\delta_\\odot$ biến thiên gần hình sin trong năm. Công thức xấp xỉ tốt:

$$\\delta_\\odot \\approx -23{,}5^\\circ \\times \\cos\\left( \\frac{360^\\circ \\times (N + 10)}{365} \\right)$$

với $N$ = số thứ tự ngày trong năm (1/1 → $N=1$). Số $10$ vì đông chí ($\\delta_\\odot$ cực tiểu) rơi vào ~10 ngày trước 1/1.

**Walk-through bằng số thật (verify):**

- **Hạ chí 21/6** → $N \\approx 172$. $\\dfrac{360^\\circ \\times (172+10)}{365} = \\dfrac{360^\\circ \\times 182}{365} \\approx 179{,}5^\\circ$. $\\cos 179{,}5^\\circ \\approx -1$. → $\\delta_\\odot \\approx -23{,}5^\\circ \\times (-1) = +23{,}5^\\circ$ ✓ (khớp hạ chí).
- **Đông chí 21/12** → $N \\approx 355$. $\\dfrac{360^\\circ \\times 365}{365} = 360^\\circ$. $\\cos 360^\\circ = 1$. → $\\delta_\\odot \\approx -23{,}5^\\circ \\times 1 = -23{,}5^\\circ$ ✓ (khớp đông chí).
- **Xuân phân 20/3** → $N \\approx 79$. $\\dfrac{360^\\circ \\times 89}{365} \\approx 87{,}8^\\circ$. $\\cos 87{,}8^\\circ \\approx 0{,}038$. → $\\delta_\\odot \\approx -0{,}9^\\circ \\approx 0^\\circ$ ✓ (gần 0, sai số nhỏ do công thức xấp xỉ).
- **1/1** → $N = 1$. $\\dfrac{360^\\circ \\times 11}{365} \\approx 10{,}8^\\circ$. $\\cos 10{,}8^\\circ \\approx 0{,}982$. → $\\delta_\\odot \\approx -23{,}1^\\circ$ (đầu năm vẫn rất gần đông chí — hợp lý).

### 4.2 Độ cao Mặt Trời lúc trưa

Mặt Trời lúc trưa = một "sao" với $\\delta = \\delta_\\odot$ đang qua kinh tuyến. Áp dụng đúng công thức transit của Lesson 01:

> 📐 **Công thức then chốt:**
>
> $$\\text{alt}_{noon} = 90^\\circ - |\\varphi - \\delta_\\odot|$$
>
> $\\varphi$ = vĩ độ người quan sát, $\\delta_\\odot$ = xích vĩ Mặt Trời ngày đó.

**Walk-through (verify) — Hà Nội $\\varphi = 21^\\circ$:**

| Ngày | $\\delta_\\odot$ | $\\text{alt}_{noon} = 90^\\circ - |\\varphi - \\delta_\\odot|$ | |
|---|---|---|---|
| Hạ chí | $+23{,}5^\\circ$ | $90^\\circ - |21 - 23{,}5| = 90^\\circ - 2{,}5^\\circ = 87{,}5^\\circ$ | gần thiên đỉnh, rất nóng |
| Xuân/thu phân | $0^\\circ$ | $90^\\circ - |21 - 0| = 90^\\circ - 21^\\circ = 69^\\circ$ | trung bình |
| Đông chí | $-23{,}5^\\circ$ | $90^\\circ - |21 - (-23{,}5)| = 90^\\circ - 44{,}5^\\circ = 45{,}5^\\circ$ | thấp, nắng xiên |

→ Ở Hà Nội, Mặt Trời trưa dao động từ $45{,}5^\\circ$ (đông chí) tới $87{,}5^\\circ$ (hạ chí), chênh đúng $2 \\times 23{,}5^\\circ = 47^\\circ$. Đây là biên độ mùa.

> ⚠ **Lỗi thường gặp.** Quên trị tuyệt đối $| \\cdot |$ → ra độ cao $> 90^\\circ$ (vô lý). Như Lesson 01, trị tuyệt đối đảm bảo $\\text{alt}_{noon} \\leq 90^\\circ$.

### 4.3 Độ dài ngày theo vĩ độ & mùa

> 💡 **Trực giác.** Độ dài ngày = bao nhiêu phần cung quỹ đạo hằng ngày của Mặt Trời nằm **trên** chân trời. Ở xích đạo, đường này luôn cắt đôi bởi chân trời → ngày = đêm = 12h quanh năm. Càng lên cao vĩ độ, mùa hè cung trên chân trời càng dài (ngày dài), mùa đông càng ngắn.

Công thức **góc giờ lúc Mặt Trời mọc/lặn** $H_0$ (độ):

$$\\cos H_0 = -\\tan\\varphi \\times \\tan\\delta_\\odot$$

Độ dài ngày $= 2 \\times H_0 / 15$ (giờ), vì $15^\\circ$ = 1 giờ.

**Walk-through (verify) — Hà Nội $\\varphi = 21^\\circ$, hạ chí $\\delta_\\odot = +23{,}5^\\circ$:**

$$\\begin{aligned}
\\cos H_0 &= -\\tan(21^\\circ) \\times \\tan(23{,}5^\\circ) \\\\
&= -(0{,}3839) \\times (0{,}4348) \\\\
&= -0{,}1669 \\\\
H_0 &= \\arccos(-0{,}1669) = 99{,}6^\\circ \\\\
\\text{Độ dài ngày} &= 2 \\times 99{,}6^\\circ / 15 = 13{,}3 \\ \\text{giờ}
\\end{aligned}$$

→ Hạ chí ở Hà Nội ngày dài ~13h 17m. Đông chí ($\\delta_\\odot = -23{,}5^\\circ$) đối xứng: $\\cos H_0 = +0{,}1669 \\to H_0 = 80{,}4^\\circ \\to$ ngày ~10h 43m. Tổng hai = 24h (đối xứng) ✓.

**4 ví dụ độ dài ngày hạ chí theo vĩ độ:**

| Vĩ độ $\\varphi$ | Độ dài ngày hạ chí | Ghi chú |
|---|---|---|
| $0^\\circ$ (xích đạo) | 12h 0m | luôn 12h quanh năm |
| $21^\\circ$ (Hà Nội) | ~13h 17m | chênh nhẹ |
| $51^\\circ$ (London) | ~16h 38m | ngày dài rõ rệt |
| $\\geq 66{,}5^\\circ$ (Vòng Bắc Cực) | 24h ("ngày trắng") | Mặt Trời không lặn |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao ở Vòng Bắc Cực có ngày 24h?"* — Vì ở $\\varphi \\geq 66{,}5^\\circ = 90^\\circ - 23{,}5^\\circ$, vào hạ chí $-\\tan\\varphi \\times \\tan\\delta_\\odot < -1$ → $\\cos H_0 < -1$ (vô nghiệm) → Mặt Trời **không lặn** suốt 24h. Đông chí thì ngược lại: 24h đêm.

> 🔁 **Dừng lại tự kiểm tra.** Ngày điểm phân ($\\delta_\\odot = 0$), độ dài ngày ở MỌI vĩ độ là bao nhiêu?
> <details><summary>Đáp án</summary>$\\cos H_0 = -\\tan\\varphi \\times \\tan 0 = 0 \\to H_0 = 90^\\circ$. Độ dài ngày $= 2 \\times 90 / 15 = 12$h ở mọi vĩ độ. Đây đúng là ý nghĩa "equinox = đêm bằng".</details>

> 📝 **Tóm tắt toàn bài.**
> - **Hoàng đạo**: đường Mặt Trời đi trong năm trên thiên cầu, nghiêng $23{,}5^\\circ$ so với xích đạo trời.
> - **Mùa do trục nghiêng $23{,}5^\\circ$**, KHÔNG do khoảng cách (Trái Đất còn gần Mặt Trời nhất vào tháng 1).
> - Cơ chế: góc tới tia nắng + độ dài ngày.
> - **$\\delta_\\odot$** dao động $\\pm 23{,}5^\\circ$: hạ chí $+23{,}5^\\circ$, đông chí $-23{,}5^\\circ$, điểm phân $0^\\circ$.
> - $\\text{alt}_{noon} = 90^\\circ - |\\varphi - \\delta_\\odot|$; độ dài ngày từ $\\cos H_0 = -\\tan\\varphi \\tan\\delta_\\odot$.

---

## Bài tập

1. **Độ cao trưa.** Tính độ cao Mặt Trời lúc trưa ở TP.HCM ($\\varphi = 10{,}8^\\circ$) vào hạ chí và đông chí. Vào hạ chí, Mặt Trời ở phía bắc hay nam thiên đỉnh?

2. **Hai bán cầu ngược mùa.** Cùng ngày hạ chí bắc bán cầu ($\\delta_\\odot = +23{,}5^\\circ$), tính độ cao trưa của Mặt Trời tại Sydney ($\\varphi = -34^\\circ$). So sánh với mùa ở đó.

3. **Xích vĩ theo ngày.** Dùng công thức xấp xỉ, tính $\\delta_\\odot$ cho ngày 5/8 ($N = 217$). Mặt Trời đang đi về phía mốc nào?

4. **Độ dài ngày.** Tính độ dài ngày ở London ($\\varphi = 51^\\circ$) vào đông chí ($\\delta_\\odot = -23{,}5^\\circ$).

5. **Phản biện ngộ nhận.** Một bạn nói: "Tháng 7 nóng vì Trái Đất gần Mặt Trời nhất." Hãy chỉ ra 2 lý do bạn đó sai, kèm số liệu.

---

## Lời giải chi tiết

### Bài 1 — Độ cao trưa ở TP.HCM

Dùng $\\text{alt}_{noon} = 90^\\circ - |\\varphi - \\delta_\\odot|$, $\\varphi = 10{,}8^\\circ$.

- **Hạ chí** ($\\delta_\\odot = +23{,}5^\\circ$): $90^\\circ - |10{,}8 - 23{,}5| = 90^\\circ - 12{,}7^\\circ = 77{,}3^\\circ$. Vì $\\delta_\\odot > \\varphi$, Mặt Trời trưa qua kinh tuyến ở **phía bắc** thiên đỉnh (Mặt Trời chếch về bắc — hiện tượng quen thuộc ở vùng nhiệt đới gần xích đạo).
- **Đông chí** ($\\delta_\\odot = -23{,}5^\\circ$): $90^\\circ - |10{,}8 - (-23{,}5)| = 90^\\circ - 34{,}3^\\circ = 55{,}7^\\circ$, ở phía nam thiên đỉnh.

→ TP.HCM Mặt Trời trưa rất cao quanh năm ($55{,}7^\\circ$–$77{,}3^\\circ$), một năm có 2 lần Mặt Trời qua đúng thiên đỉnh (khi $\\delta_\\odot = \\varphi = 10{,}8^\\circ$).

### Bài 2 — Sydney vào hạ chí bắc bán cầu

$\\varphi = -34^\\circ$, $\\delta_\\odot = +23{,}5^\\circ$:

$$\\text{alt}_{noon} = 90^\\circ - |-34 - 23{,}5| = 90^\\circ - 57{,}5^\\circ = 32{,}5^\\circ$$

Mặt Trời trưa chỉ cao $32{,}5^\\circ$ → nắng xiên, ngày ngắn → Sydney đang **mùa đông**. Khớp với thực tế: tháng 6 là mùa đông ở nam bán cầu — bằng chứng mùa do trục nghiêng, không do khoảng cách.

### Bài 3 — δ☉ ngày 5/8

$N = 217$:

$$\\begin{aligned}
\\text{góc} &= \\frac{360^\\circ \\times (217 + 10)}{365} = \\frac{360^\\circ \\times 227}{365} = 223{,}9^\\circ \\\\
\\cos 223{,}9^\\circ &= -0{,}720 \\\\
\\delta_\\odot &\\approx -23{,}5^\\circ \\times (-0{,}720) = +16{,}9^\\circ
\\end{aligned}$$

$\\delta_\\odot \\approx +16{,}9^\\circ$, dương và đang **giảm** dần từ $+23{,}5^\\circ$ (hạ chí 21/6) về $0^\\circ$ (thu phân 23/9) → Mặt Trời đang đi về phía **thu phân**.

### Bài 4 — Độ dài ngày London đông chí

$\\varphi = 51^\\circ$, $\\delta_\\odot = -23{,}5^\\circ$:

$$\\begin{aligned}
\\cos H_0 &= -\\tan(51^\\circ) \\times \\tan(-23{,}5^\\circ) = -(1{,}2349) \\times (-0{,}4348) = +0{,}5369 \\\\
H_0 &= \\arccos(0{,}5369) = 57{,}5^\\circ \\\\
\\text{Độ dài ngày} &= 2 \\times 57{,}5 / 15 = 7{,}66 \\ \\text{giờ} \\approx 7\\text{h } 40\\text{m}
\\end{aligned}$$

→ Đông chí ở London ngày chỉ ~7h 40m (đêm dài ~16h 20m). So với hạ chí ~16h 38m → biên độ mùa rất lớn ở vĩ độ cao, lý do mùa đông Bắc Âu u tối.

### Bài 5 — Phản biện ngộ nhận

1. **Hai bán cầu ngược mùa cùng lúc.** Tháng 7 bắc bán cầu là hè thì nam bán cầu (vd Sydney, bài 2: alt trưa chỉ 32.5°) là đông. Nếu nguyên nhân là khoảng cách thì cả Trái Đất phải cùng mùa — mâu thuẫn.
2. **Tháng 7 Trái Đất ở XA Mặt Trời nhất** (viễn nhật ~152.1 triệu km), tháng 1 mới gần nhất (cận nhật ~147.1 triệu km). Vậy bắc bán cầu nóng nhất đúng lúc xa Mặt Trời nhất → khoảng cách không thể là nguyên nhân. Chênh khoảng cách chỉ ~3.3%, ảnh hưởng nhiệt ~7%, nhỏ so với hiệu ứng góc nghiêng.

Nguyên nhân thật: trục nghiêng \`23.5°\` → góc tới tia nắng + độ dài ngày thay đổi theo mùa.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Year & Sun Path**: slider ngày-trong-năm → tính $\\delta_\\odot$, vẽ đường đi Mặt Trời trên bầu trời cho một vĩ độ chọn được, hiện độ cao trưa + độ dài ngày live.
  - **Tilt Explainer**: mô phỏng Trái Đất quanh Mặt Trời với trục nghiêng $23{,}5^\\circ$ giữ nguyên hướng → xem bán cầu nào "chúi" về Mặt Trời theo mùa, kèm nhắc nhở "không phải do khoảng cách".

---

## Bài tiếp theo

→ [Lesson 03 — Mặt Trăng & thực](../lesson-03-moon-eclipses/): pha trăng, tháng giao hội 29.5 ngày, điều kiện nhật/nguyệt thực, và vì sao không có thực mỗi tháng. Ta sẽ dùng lại ý "hình học góc giữa các thiên thể" của bài này.

**Tham khảo chéo:** công thức transit \`90° − |φ − δ|\` từ [Lesson 01](../lesson-01-celestial-sphere/); lượng giác: [\`../../../Math/03-Trig-Complex/\`](../../../Math/03-Trig-Complex/).
`;
