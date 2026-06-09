// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/03-Cosmology/lesson-01-expanding-universe/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Vũ trụ giãn nở (The Expanding Universe)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **định luật Hubble (Hubble's law)** $v = H_0 \\, d$ và ý nghĩa của hằng số Hubble $H_0 \\approx 70 \\ \\text{km/s/Mpc}$.
- Đo **dịch chuyển đỏ (redshift, z)** từ phổ và liên hệ nó với **vận tốc lùi xa (recession velocity)**.
- Giải thích vì sao vũ trụ giãn nở **không có tâm** — mọi điểm đều thấy mọi điểm khác lùi xa.
- Tính **thời gian Hubble (Hubble time)** $t_H = \\dfrac{1}{H_0}$ và hiểu vì sao nó xấp xỉ tuổi vũ trụ.
- Phân biệt "thiên hà bay trong không gian" với "không gian giữa các thiên hà giãn ra".

## Kiến thức tiền đề

- Sóng ánh sáng & phổ vạch: [\`../../02-StarsGalaxies/lesson-01-radiation-spectra/\`](../../02-StarsGalaxies/lesson-01-radiation-spectra/) — bài này dùng vạch phổ để đo redshift.
- Thiên hà & khoảng cách vũ trụ: [\`../../02-StarsGalaxies/lesson-07-galaxies/\`](../../02-StarsGalaxies/lesson-07-galaxies/).
- Đơn vị **parsec** và megaparsec (Mpc): $1 \\ \\text{Mpc} \\approx 3{,}26$ triệu năm ánh sáng $\\approx 3{,}086 \\times 10^{19} \\ \\text{km}$.

---

## 1. Phát hiện vũ trụ giãn nở

> 💡 **Trực giác / Hình dung.** Năm 1929, Edwin Hubble đo phổ của nhiều thiên hà và thấy điều lạ: hầu hết vạch phổ đều **dịch về phía đỏ** (bước sóng dài ra), nghĩa là chúng đang **lùi xa** ta. Hơn nữa, thiên hà **càng xa thì lùi càng nhanh**. Hình dung những hạt nho khô trong một ổ bánh mì đang nở: nho ở xa trôi ra nhanh hơn nho ở gần — vì có nhiều "bột nở" hơn xen giữa.

Đây là bằng chứng quan sát đầu tiên cho thấy vũ trụ **không tĩnh** mà đang **giãn nở (expanding)** — một trong những phát hiện lớn nhất của khoa học thế kỷ 20.

> ⚠ **Lỗi thường gặp.** "Thiên hà lùi xa nghĩa là chúng đang bay đi trong một không gian đứng yên, và Trái Đất là tâm vụ nổ." **Sai cả hai.** (1) Không phải thiên hà *bay đi* mà chính **không gian giữa chúng giãn ra** (kéo chúng tách nhau). (2) **Không có tâm** — xem Mục 3.

---

## 2. Định luật Hubble và redshift

### 2.1 Định luật Hubble

> 💡 **Trực giác.** "Càng xa, lùi càng nhanh, và lùi nhanh đúng theo tỉ lệ với khoảng cách." Gấp đôi khoảng cách → gấp đôi vận tốc lùi. Đó chính là một đường thẳng đi qua gốc tọa độ trên đồ thị vận tốc–khoảng cách.

**Định nghĩa hằng số Hubble \`H₀\` (3 phần):**

- **(a) Là gì** — $H_0$ là **tốc độ giãn nở hiện nay** của vũ trụ: với mỗi megaparsec khoảng cách tăng thêm, vận tốc lùi xa tăng thêm $\\sim 70 \\ \\text{km/s}$. Đơn vị $\\text{km/s/Mpc}$ = (vận tốc)/(khoảng cách) = nghịch đảo của thời gian.
- **(b) Vì sao cần** — Ta cần một con số duy nhất gói gọn quan hệ "xa hơn ⇒ nhanh hơn". $H_0$ cho phép, chỉ cần đo redshift (suy ra $v$), tính ngay khoảng cách $d = v/H_0$ — đây là **thước đo khoảng cách vũ trụ** cho các thiên hà quá xa để dùng cách khác.
- **(c) Ví dụ số** — Thiên hà cách $10 \\ \\text{Mpc}$ lùi với $v = 70 \\times 10 = 700 \\ \\text{km/s}$; cách $100 \\ \\text{Mpc}$ lùi $7000 \\ \\text{km/s}$; cách $200 \\ \\text{Mpc}$ lùi $14000 \\ \\text{km/s}$ (gấp đôi vì xa gấp đôi).

**Công thức:**

$$v = H_0 \\, d$$

- $v$ = vận tốc lùi xa (km/s)
- $d$ = khoảng cách (Mpc)
- $H_0 \\approx 70 \\ \\text{km/s/Mpc}$

**Walk-through bằng số thật (verify):** Một thiên hà cách $d = 100 \\ \\text{Mpc}$.

$$v = H_0 \\, d = 70 \\ \\text{km/s/Mpc} \\times 100 \\ \\text{Mpc} = 7000 \\ \\text{km/s}$$

→ Thiên hà này lùi xa ta với **7000 km/s**. Kiểm tra ngược: $d = v/H_0 = 7000/70 = 100 \\ \\text{Mpc}$ ✓.

**4 ví dụ số (với $H_0 = 70$):**

| d (Mpc) | $v = H_0 \\, d$ (km/s) | Diễn giải |
|---|---|---|
| 10 | 700 | Thiên hà gần |
| 100 | 7000 | Walk-through ở trên |
| 1000 | 70 000 | $\\sim 0{,}23c$ — bắt đầu cần hiệu chỉnh tương đối tính |
| 4280 | ~300 000 (= c) | Khoảng cách mà $v$ chạm tốc độ ánh sáng (chân trời Hubble) |

### 2.2 Dịch chuyển đỏ (redshift, z)

> 💡 **Trực giác.** Khi không gian giãn, sóng ánh sáng đang bay trong đó cũng **bị kéo dài ra**, giống vạch kẻ trên một sợi dây thun bị căng. Bước sóng dài ra ⇒ ánh sáng "đỏ hơn". Đo mức đỏ hơn này chính là đo lượng giãn nở.

**Định nghĩa redshift (3 phần):**

- **(a) Là gì** — $z$ là **mức tăng tương đối của bước sóng**: vạch phổ đo được dài hơn bao nhiêu so với khi đứng yên trong phòng thí nghiệm.
- **(b) Vì sao cần** — Ta không thể "đặt thước" tới thiên hà. Nhưng phổ vạch của các nguyên tố (vd Hydro) có bước sóng **biết trước**. So bước sóng thu được với bước sóng chuẩn → đo được $z$ → suy ra vận tốc/khoảng cách.
- **(c) Ví dụ số** — Vạch Hydro chuẩn $\\lambda_0 = 656{,}3 \\ \\text{nm}$. Nếu đo được $\\lambda = 663{,}0 \\ \\text{nm}$ thì $\\Delta\\lambda = 6{,}7 \\ \\text{nm}$, $z = 6{,}7/656{,}3 \\approx 0{,}0102$.

**Công thức:**

$$z = \\dfrac{\\Delta\\lambda}{\\lambda_0} = \\dfrac{\\lambda_{\\text{quan sát}} - \\lambda_0}{\\lambda_0}$$

Với redshift nhỏ ($z \\ll 1$, vận tốc nhỏ so với ánh sáng), vận tốc lùi xa:

$$v \\approx c\\,z \\qquad (c = 300\\,000 \\ \\text{km/s})$$

**Walk-through bằng số thật (verify):** $z = 0{,}0102$ (ví dụ trên):

$$v \\approx c\\,z = 300\\,000 \\ \\text{km/s} \\times 0{,}0102 = 3060 \\ \\text{km/s}$$

→ Suy ra khoảng cách: $d = v/H_0 = 3060/70 \\approx 43{,}7 \\ \\text{Mpc}$.

**4 ví dụ số:**

| $\\lambda_0$ (nm) | $\\lambda$ đo (nm) | $z = \\Delta\\lambda/\\lambda_0$ | $v \\approx cz$ (km/s) |
|---|---|---|---|
| 656,3 | 663,0 | 0,0102 | 3060 |
| 500,0 | 510,0 | 0,0200 | 6000 |
| 121,6 | 133,8 | 0,1003 | ~30 000 |
| 400,0 | 480,0 | 0,2000 | (≈ 60 000, đã cần công thức tương đối tính) |

> ⚠ **Lỗi thường gặp.** Dùng $v = cz$ cho $z$ lớn (vd $z = 3$). Sai — $v = cz$ chỉ là xấp xỉ khi $z \\ll 1$. Với $z$ lớn phải dùng công thức tương đối tính/vũ trụ học; $z$ *không* bị chặn ở 1 dù $v < c$.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Redshift này có giống hiệu ứng Doppler của còi xe cứu thương không?"* — Gần giống nhưng khác bản chất. Doppler là do chuyển động *trong* không gian. Redshift vũ trụ học (cosmological redshift) là do **không gian tự giãn** kéo dài sóng trên đường đi. Với z nhỏ hai cái cho công thức gần như nhau nên ta dùng chung.
> - *"Có thiên hà nào dịch xanh (lùi lại gần) không?"* — Có, vài thiên hà rất gần (như Andromeda) đang tiến về ta vì lực hấp dẫn cục bộ thắng giãn nở. Giãn nở Hubble chỉ thắng ở khoảng cách lớn.

> 🔁 **Dừng lại tự kiểm tra.** Vạch chuẩn $\\lambda_0 = 500 \\ \\text{nm}$, đo được $\\lambda = 515 \\ \\text{nm}$. Tính $z$ và $v$.
> <details><summary>Đáp án</summary>$z = (515-500)/500 = 15/500 = 0{,}03$. $v \\approx cz = 300\\,000 \\times 0{,}03 = 9000 \\ \\text{km/s}$. (Và $d = 9000/70 \\approx 129 \\ \\text{Mpc}$.)</details>

---

## 3. Vũ trụ giãn nở KHÔNG có tâm

> 💡 **Trực giác — quả bóng phồng.** Vẽ các chấm lên một quả bóng cao su rồi thổi phồng. Đứng trên **bất kỳ** chấm nào, bạn đều thấy mọi chấm khác lùi ra xa, và chấm xa lùi nhanh hơn. **Không chấm nào là tâm** — tâm phồng nằm *bên trong* quả bóng, không nằm trên mặt (nơi ta sống). Vũ trụ 3 chiều của ta giống *mặt* quả bóng: giãn đều khắp nơi, không có điểm đặc biệt.

**Mô hình bánh mì nho khô (raisin bread):** Ổ bột nở gấp đôi sau khi nướng. Hai hạt nho ban đầu cách $1 \\ \\text{cm}$ → sau khi nở cách $2 \\ \\text{cm}$; hai hạt cách $3 \\ \\text{cm}$ → thành $6 \\ \\text{cm}$. Trong cùng thời gian nướng:

- Cặp gần: dịch ra $1 \\ \\text{cm}$ → vận tốc nhỏ.
- Cặp xa: dịch ra $3 \\ \\text{cm}$ → vận tốc lớn gấp 3.

→ Đây **chính là** định luật Hubble: vận tốc tỉ lệ khoảng cách. Và mọi hạt nho đều "thấy" mình ở trung tâm. Không hạt nào thực sự là tâm.

> ⚠ **Lỗi thường gặp (sửa lỗi quan trọng).** "Vì mọi thiên hà lùi xa **ta**, nên **ta** ở tâm vũ trụ / tâm Big Bang." **Sai.** Bất kỳ quan sát viên ở thiên hà nào *cũng* thấy hệt như vậy — mọi thứ lùi xa *họ*. Đó là dấu hiệu của giãn nở **đồng đều, không tâm**, chứ không phải bằng chứng ta đặc biệt. Big Bang không nổ ra "tại một điểm trong không gian" mà xảy ra **ở mọi nơi cùng lúc**.

> ❓ **Câu hỏi tự nhiên.** *"Nếu không có tâm thì Big Bang nổ ở đâu?"* — Ở **khắp nơi**. Lúc đầu toàn bộ không gian (kể cả chỗ bây giờ là bạn) bị nén cực nóng đặc. Giãn nở là *không gian tự lớn ra*, không phải vật chất văng ra từ một điểm. (Lesson 02 nói kỹ.)

> 🔁 **Dừng lại tự kiểm tra.** Trong mô hình bánh mì nho, nếu một quan sát viên ngồi trên hạt nho ở rìa ổ bánh, người đó có thấy mình là tâm không?
> <details><summary>Đáp án</summary>Có. Người đó vẫn thấy mọi hạt khác lùi xa mình, hạt xa lùi nhanh hơn — y hệt người ở giữa ổ. Không hạt nào phân biệt được mình "ở rìa" chỉ bằng quan sát giãn nở. Đó là ý nghĩa "không có tâm".</details>

---

## 4. Thời gian Hubble & tuổi vũ trụ

> 💡 **Trực giác.** Nếu các thiên hà đang lùi xa, hãy "tua ngược phim": chúng từng chụm lại gần nhau hơn, và nếu lùi đều thì có một thời điểm **mọi thứ chồng lên nhau** — đó là lúc giãn nở bắt đầu. Khoảng thời gian từ lúc đó tới nay xấp xỉ $1/H_0$.

**Định nghĩa thời gian Hubble (3 phần):**

- **(a) Là gì** — $t_H = \\dfrac{1}{H_0}$ là thời gian để vũ trụ giãn tới kích thước hiện nay **nếu** tốc độ giãn không đổi. Nó là nghịch đảo của hằng số Hubble.
- **(b) Vì sao cần** — Cho ta một **ước lượng tuổi vũ trụ** chỉ từ một con số đo được ($H_0$), không cần biết gì thêm.
- **(c) Ví dụ số** — Với $H_0 = 70 \\ \\text{km/s/Mpc}$, $t_H \\approx 14 \\ \\text{tỉ năm}$ (tính dưới đây).

**Walk-through bằng số thật (verify):** Đổi $H_0$ về đơn vị $1/\\text{giây}$ rồi nghịch đảo.

$$\\begin{aligned}
1 \\ \\text{Mpc} &= 3{,}086 \\times 10^{19} \\ \\text{km} \\\\
H_0 &= 70 \\ \\text{km/s/Mpc} = \\frac{70}{3{,}086 \\times 10^{19}} \\ \\frac{\\text{km/s}}{\\text{km}} = 2{,}268 \\times 10^{-18} \\ \\text{s}^{-1} \\\\
t_H &= \\frac{1}{H_0} = \\frac{1}{2{,}268 \\times 10^{-18}} = 4{,}41 \\times 10^{17} \\ \\text{s} \\\\
&= \\frac{4{,}41 \\times 10^{17} \\ \\text{s}}{3{,}156 \\times 10^{7} \\ \\text{s/năm}} \\approx 1{,}40 \\times 10^{10} \\ \\text{năm} = 14{,}0 \\ \\text{tỉ năm}
\\end{aligned}$$

→ Tuổi vũ trụ **xấp xỉ 14 tỉ năm**. (Số đo chính xác hiện nay là **13.8 tỉ năm** — rất gần, sai khác do tốc độ giãn nở thực không hằng định.)

> ❓ **Câu hỏi tự nhiên.** *"Vì sao $t_H = 14$ tỉ nhưng tuổi thật là 13.8 tỉ? Sai do đâu?"* — Vì $t_H$ giả định giãn nở **đều mãi mãi**. Thực tế hấp dẫn từng hãm giãn nở (làm vũ trụ trẻ hơn ước lượng đơn giản), rồi năng lượng tối lại tăng tốc (Lesson 03). Hai hiệu ứng gần triệt tiêu nên $1/H_0$ trùng hợp rất sát tuổi thật.

> 🔁 **Dừng lại tự kiểm tra.** Nếu $H_0$ đo được lớn hơn (vd $100 \\ \\text{km/s/Mpc}$), tuổi vũ trụ ước lượng sẽ lớn hơn hay nhỏ hơn?
> <details><summary>Đáp án</summary>Nhỏ hơn. $t_H = 1/H_0$, $H_0$ lớn ⇒ $t_H$ nhỏ. $H_0 = 100$ cho $t_H \\approx 9{,}8$ tỉ năm. (Đây từng là "khủng hoảng tuổi" lịch sử: $H_0$ lớn cho vũ trụ trẻ hơn cả các sao già nhất — vô lý — nên $H_0$ phải nhỏ hơn.)</details>

> 📝 **Tóm tắt toàn bài.**
> - **Định luật Hubble**: $v = H_0 \\, d$, $H_0 \\approx 70 \\ \\text{km/s/Mpc}$. Thiên hà càng xa lùi càng nhanh.
> - **Redshift**: $z = \\dfrac{\\Delta\\lambda}{\\lambda_0}$; với $z$ nhỏ $v \\approx c\\,z$. Đo vạch phổ → suy vận tốc & khoảng cách.
> - **Không tâm**: bánh mì nho / quả bóng phồng — mọi điểm thấy mọi điểm lùi xa; Big Bang xảy ra ở mọi nơi.
> - **Thời gian Hubble**: $t_H = \\dfrac{1}{H_0} \\approx 14 \\ \\text{tỉ năm}$ ≈ tuổi vũ trụ (13.8 tỉ năm).

---

## Bài tập

1. **Vận tốc lùi xa.** Một thiên hà cách $d = 250 \\ \\text{Mpc}$. Dùng $H_0 = 70 \\ \\text{km/s/Mpc}$, tính vận tốc lùi xa.

2. **Khoảng cách từ redshift.** Đo vạch Hydro $\\lambda_0 = 656{,}3 \\ \\text{nm}$ của một quasar, thu được $\\lambda = 689{,}1 \\ \\text{nm}$. Tính $z$, $v$ (dùng $v \\approx c\\,z$) và khoảng cách $d$.

3. **Thời gian Hubble với $H_0$ khác.** Một số phép đo cho $H_0 = 73 \\ \\text{km/s/Mpc}$. Ước lượng tuổi vũ trụ (tỉ năm). So sánh với $H_0 = 67$.

4. **Không có tâm.** Trong mô hình bánh mì nho, ổ bột nở sao cho mọi khoảng cách tăng 3 lần sau 1 giờ. Hai hạt cách nhau $2 \\ \\text{cm}$ và hai hạt khác cách nhau $5 \\ \\text{cm}$. Tính vận tốc lùi của mỗi cặp và kiểm tra rằng $v$ tỉ lệ với $d$.

5. **Giới hạn của $v \\approx c\\,z$.** Một thiên hà rất xa có $z = 1{,}5$. Vì sao **không** được kết luận $v = 1{,}5c = 450\\,000 \\ \\text{km/s}$? Giải thích bằng lời (không cần công thức tương đối tính).

---

## Lời giải chi tiết

### Bài 1 — Vận tốc lùi xa

$$v = H_0 \\, d = 70 \\ \\text{km/s/Mpc} \\times 250 \\ \\text{Mpc} = 17\\,500 \\ \\text{km/s}$$

→ Thiên hà lùi xa với **17 500 km/s** ($\\approx 0{,}058c$ — vẫn nhỏ so với ánh sáng nên $v \\approx c\\,z$ còn dùng tốt).

### Bài 2 — Khoảng cách từ redshift

**Bước 1 — tính $z$:**

$$z = \\frac{\\Delta\\lambda}{\\lambda_0} = \\frac{689{,}1 - 656{,}3}{656{,}3} = \\frac{32{,}8}{656{,}3} = 0{,}0500$$

**Bước 2 — vận tốc:**

$$v \\approx c\\,z = 300\\,000 \\times 0{,}0500 = 15\\,000 \\ \\text{km/s}$$

**Bước 3 — khoảng cách:**

$$d = \\frac{v}{H_0} = \\frac{15\\,000}{70} \\approx 214 \\ \\text{Mpc}$$

→ Quasar cách **~214 Mpc** (≈ 700 triệu năm ánh sáng).

### Bài 3 — Thời gian Hubble với $H_0$ khác

Dùng tỉ lệ: với $H_0 = 70$ ta có $t_H \\approx 14{,}0$ tỉ năm. Vì $t_H \\propto 1/H_0$:

- $H_0 = 73$: $t_H = 14{,}0 \\times \\dfrac{70}{73} \\approx 13{,}4$ tỉ năm.
- $H_0 = 67$: $t_H = 14{,}0 \\times \\dfrac{70}{67} \\approx 14{,}6$ tỉ năm.

→ $H_0$ càng lớn, vũ trụ ước lượng càng **trẻ**. Chênh lệch giữa 67 và 73 (đúng "căng thẳng Hubble — Hubble tension" trong vũ trụ học hiện đại) cho tuổi lệch ~1.2 tỉ năm.

### Bài 4 — Không có tâm

Nở 3 lần trong 1 giờ ⇒ mỗi khoảng cách tăng thêm $\\Delta d = 2 \\, d$ (từ $d$ lên $3d$). Vận tốc lùi $= \\Delta d / 1 \\ \\text{giờ}$:

- Cặp $2 \\ \\text{cm}$: $\\Delta d = 2 \\times 2 = 4 \\ \\text{cm}$ → $v = 4 \\ \\text{cm/h}$.
- Cặp $5 \\ \\text{cm}$: $\\Delta d = 2 \\times 5 = 10 \\ \\text{cm}$ → $v = 10 \\ \\text{cm/h}$.

Kiểm tra tỉ lệ: $v/d$ cho cặp 1 là $4/2 = 2 \\ (\\text{1/h})$; cặp 2 là $10/5 = 2 \\ (\\text{1/h})$. **Bằng nhau** ⇒ $v = (2/\\text{h}) \\, d$, đúng dạng $v = H \\, d$ với "hằng số Hubble" của ổ bánh $= 2/\\text{h}$. Vận tốc tỉ lệ khoảng cách, không cần biết "tâm" ở đâu.

### Bài 5 — Giới hạn của $v \\approx c\\,z$

$v \\approx c\\,z$ chỉ là **xấp xỉ cho $z$ nhỏ** ($z \\ll 1$), suy ra từ Doppler bậc nhất. Với $z = 1{,}5$ (không nhỏ), xấp xỉ này sai. Lý do bằng lời:

1. **Redshift vũ trụ học tích lũy trên cả đường đi**: ánh sáng bị kéo dài dần trong suốt hành trình hàng tỉ năm, không phải một cú Doppler tức thời. $z$ lớn phản ánh tổng lượng giãn nở tích lũy, không quy thẳng ra một vận tốc đơn giản.
2. Nếu cứ áp $v = c\\,z$ cho mọi $z$ thì khi $z > 1$ sẽ ra $v > c$ — mâu thuẫn với thuyết tương đối nếu hiểu đó là vận tốc *qua* không gian. Thực ra $z$ có thể lớn tùy ý mà không vi phạm gì, vì nó đo *giãn nở của không gian*, không phải vật bay nhanh hơn ánh sáng.

→ Phải dùng công thức tương đối tính/vũ trụ học (ngoài phạm vi bài), không dùng $v = c\\,z$.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Vũ trụ phồng**: lưới điểm phồng theo slider thời gian; chọn bất kỳ điểm làm "quê nhà" để thấy mọi điểm khác lùi xa nó — minh họa "không có tâm".
  - **Máy tính Hubble**: nhập \`d\` (hoặc \`v\`, hoặc \`z\`) → tính các đại lượng còn lại và thời gian Hubble, live.
  - **Demo redshift**: kéo \`z\` để thấy vạch phổ dịch về phía đỏ và bước sóng dài ra.

---

## Bài tiếp theo

→ [Lesson 02 — Big Bang & CMB](../lesson-02-big-bang-cmb/): tua ngược giãn nở tới khởi nguyên nóng đặc, dòng thời gian vũ trụ, và bức xạ nền vi sóng — "tiếng vọng" của Big Bang. Ta dùng lại redshift của bài này để hiểu vì sao bức xạ khởi nguyên giờ chỉ còn ~2.7 K.

**Tham khảo chéo:** phổ vạch nguyên tố [\`../../02-StarsGalaxies/lesson-01-radiation-spectra/\`](../../02-StarsGalaxies/lesson-01-radiation-spectra/).
`;
