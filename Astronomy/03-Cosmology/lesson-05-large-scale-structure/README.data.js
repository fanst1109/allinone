// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Astronomy/03-Cosmology/lesson-05-large-scale-structure/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Cấu trúc lớn của vũ trụ (Large-Scale Structure)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **mạng vũ trụ (cosmic web)** là gì: vật chất trong vũ trụ không rải đều mà gom thành **sợi (filament)**, **tường (wall/sheet)**, các **siêu đám (supercluster)**, ngăn cách bởi những **khoảng trống (void)** khổng lồ.
- Đọc được **bản đồ khảo sát redshift thiên hà (galaxy redshift survey)** như SDSS — vì sao càng xa càng "đỏ" và bản đồ 3D dựng ra sao.
- Giải thích **cấu trúc hình thành từ thăng giáng mật độ (density fluctuation)**: hạt giống in trong CMB → hấp dẫn khuếch đại dần thành mạng vũ trụ.
- Định cỡ các cấu trúc theo thang **megaparsec (Mpc)** và biết "đâu là cấu trúc lớn nhất".

## Kiến thức tiền đề

- **Redshift & định luật Hubble** — đo khoảng cách qua dịch chuyển đỏ: [\`../lesson-01-expanding-universe/\`](../lesson-01-expanding-universe/).
- **CMB & thăng giáng nhiệt độ** — "hạt giống" của cấu trúc: [\`../lesson-02-big-bang-cmb/\`](../lesson-02-big-bang-cmb/).
- **Vật chất tối** — bộ khung hấp dẫn dựng nên mạng vũ trụ: [\`../lesson-03-dark-matter-energy/\`](../lesson-03-dark-matter-energy/).
- Xác suất / thống kê cơ bản (để hiểu "thăng giáng" δ): [\`../../../Vectors/05-Probability/\`](../../../Vectors/05-Probability/).

---

## 1. Mạng vũ trụ là gì?

> 💡 **Trực giác / Hình dung.** Nhúng một miếng bọt biển (sponge) vào nước rồi soi nó dưới kính: bạn thấy các *vách* vật liệu mỏng bao quanh những *lỗ rỗng* lớn, và nơi nhiều vách giao nhau thì vật liệu dày lại thành *gân*. Vũ trụ ở thang lớn trông y hệt: thiên hà bám vào các **sợi (filament)** như giọt nước trên mạng nhện, giữa các sợi là **khoảng trống (void)** gần như rỗng. Đây là "mạng vũ trụ (cosmic web)".

**Định nghĩa (3 phần):**

- **(a) Là gì** — Mạng vũ trụ là cách vật chất (thiên hà + vật chất tối) tự tổ chức ở thang ≳ 10 Mpc: **nút (node)** = siêu đám thiên hà nơi nhiều sợi giao nhau; **sợi (filament)** = "cầu" thiên hà nối các nút; **tường (wall/sheet)** = mặt phẳng mỏng thiên hà; **khoảng trống (void)** = bong bóng gần như rỗng đường kính 30–300 triệu năm ánh sáng.
- **(b) Vì sao tồn tại / cần khái niệm này** — Nếu chỉ nói "vũ trụ có nhiều thiên hà" ta bỏ lỡ điều quan trọng: chúng **không phân bố ngẫu nhiên đều**. Sự sắp xếp thành mạng là *dấu vân tay* trực tiếp của hấp dẫn + vật chất tối tác động suốt 13.8 tỉ năm. Mô tả được mạng → kiểm chứng được mô hình vũ trụ.
- **(c) Ví dụ trực giác bằng số** — **Tường Sloan (Sloan Great Wall)** dài ~1.37 tỉ năm ánh sáng (~420 Mpc) là một trong các cấu trúc lớn nhất biết tới; **Void Boötes** rộng ~330 triệu năm ánh sáng gần như không có thiên hà. So sánh: dải Ngân Hà chỉ ~0.03 Mpc đường kính → mạng vũ trụ lớn hơn cả vạn lần.

**4 ví dụ số — thang kích thước ($1 \\ \\text{Mpc} \\approx 3{,}26$ triệu năm ánh sáng $\\approx 3{,}086 \\times 10^{22} \\ \\text{m}$):**

| Cấu trúc | Kích thước điển hình | Đổi ra năm ánh sáng |
|---|---|---|
| Thiên hà (vd Ngân Hà) | ~0.03 Mpc | ~100 nghìn ly |
| Nhóm thiên hà (Local Group) | ~3 Mpc | ~10 triệu ly |
| Đám thiên hà (Virgo Cluster) | ~5 Mpc | ~16 triệu ly |
| Siêu đám (Laniakea) | ~160 Mpc | ~520 triệu ly |
| Sợi / Tường Sloan | ~420 Mpc | ~1.37 tỉ ly |

> ⚠ **Lỗi thường gặp.** Tưởng mạng vũ trụ là cấu trúc "phẳng" như mạng nhện 2D. Thực ra nó **3 chiều**: filament là ống/dây trong không gian, void là bong bóng. Bản đồ 2D ta hay thấy chỉ là một "lát cắt mỏng" của khối 3D.

> 🔁 **Dừng lại tự kiểm tra.** Sắp xếp theo thứ tự kích thước tăng dần: void, thiên hà, đám thiên hà, siêu đám.
> <details><summary>Đáp án</summary>thiên hà (~0.03 Mpc) < đám thiên hà (~5 Mpc) < siêu đám (~160 Mpc) ≈ void (~30–300 Mpc, cùng cỡ siêu đám). Void và siêu đám là hai mặt của cùng một mạng — nơi này dày thì nơi kia rỗng.</details>

---

## 2. Khảo sát redshift thiên hà — dựng bản đồ 3D thế nào?

> 💡 **Trực giác.** Đứng giữa rừng đêm với một chiếc đèn pin, bạn chỉ thấy *hướng* tới từng cái cây (2 góc trên bầu trời). Muốn biết cây ở *xa hay gần* (chiều thứ 3), bạn cần một thước đo khoảng cách. Với thiên hà, "thước" đó là **redshift**: theo định luật Hubble, redshift càng lớn → thiên hà càng xa. Đo redshift cho hàng triệu thiên hà → cắm được tọa độ 3D của từng cái → hiện ra mạng vũ trụ.

**Cách làm (SDSS — Sloan Digital Sky Survey):**

1. Chụp ảnh bầu trời → xác định **2 tọa độ góc** (RA, Dec) của mỗi thiên hà.
2. Tách **quang phổ (spectrum)** của thiên hà → đo độ dịch các vạch phổ về phía đỏ → ra **redshift z**.
3. Đổi $z$ sang khoảng cách qua định luật Hubble: $v \\approx c\\,z$ (với $z$ nhỏ) và $d = v / H_0$.
4. Ghép (RA, Dec, d) → một điểm 3D. Lặp lại cho **hàng triệu thiên hà** → bản đồ.

**Walk-through bằng số thật (verify):** Một thiên hà có $z = 0{,}1$. Lấy $H_0 = 70 \\ \\text{km/s/Mpc}$.

$$\\begin{aligned}
v &\\approx c\\,z = 300\\,000 \\ \\text{km/s} \\times 0{,}1 = 30\\,000 \\ \\text{km/s} \\\\
d &= \\frac{v}{H_0} = \\frac{30\\,000}{70} \\approx 428 \\ \\text{Mpc}
\\end{aligned}$$

Đổi ra: $428 \\ \\text{Mpc} \\times 3{,}26 \\approx 1{,}4 \\ \\text{tỉ năm ánh sáng}$. Vậy một thiên hà $z = 0{,}1$ nằm cách ta ~1.4 tỉ ly — đủ xa để góp vào bản đồ cấu trúc lớn.

**4 ví dụ số (đổi $z \\to d$, $H_0 = 70$):**

| $z$ | $v \\approx c\\,z$ (km/s) | $d = v/H_0$ (Mpc) | ≈ năm ánh sáng |
|---|---|---|---|
| 0,01 | 3 000 | 43 | 140 triệu |
| 0,05 | 15 000 | 214 | 700 triệu |
| 0,1 | 30 000 | 428 | 1,4 tỉ |
| 0,2 | 60 000 | 857 | 2,8 tỉ |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao không đo khoảng cách trực tiếp mà phải qua redshift?"* — Với thiên hà ngoài ~vài chục Mpc, không có "thước" hình học nào với tới (thị sai parallax chỉ dùng được trong Ngân Hà). Redshift là cách *duy nhất* khả thi để định cỡ hàng triệu thiên hà nhanh.
> - *"$v \\approx c\\,z$ có luôn đúng không?"* — Chỉ gần đúng khi $z$ nhỏ ($z \\lesssim 0{,}1$). Khi $z$ lớn phải dùng công thức tương đối tính/vũ trụ học đầy đủ; khoảng cách lúc đó còn tách thành nhiều loại (comoving, luminosity...). Bài này dùng xấp xỉ $z$ nhỏ cho trực giác.
> - *"Redshift do giãn nở có lẫn chuyển động riêng của thiên hà không?"* — Có. Thiên hà còn có **vận tốc riêng (peculiar velocity)** khi rơi vào đám. Điều này gây méo "Fingers of God" trên bản đồ — các đám bị kéo dài theo phương nhìn. Đây là một *toy artifact* cần hiệu chỉnh, không phải cấu trúc thật.

> ⚠ **Lỗi thường gặp.** Coi $d = v/H_0$ là "khoảng cách hiện tại chính xác". Đây là **toy estimate** tốt cho trực giác và $z$ nhỏ; vũ trụ học thật phân biệt nhiều loại khoảng cách. Đừng dùng nó để báo cáo số liệu chính xác ở $z$ lớn.

> 🔁 **Dừng lại tự kiểm tra.** Thiên hà A có $z = 0{,}02$, thiên hà B có $z = 0{,}06$. Ai xa hơn, gấp mấy lần (xấp xỉ)?
> <details><summary>Đáp án</summary>B xa hơn. Vì $d \\propto z$ (qua $v = c\\,z$, $d = v/H_0$), tỉ lệ khoảng cách $\\approx 0{,}06/0{,}02 = 3$ lần.</details>

---

## 3. Cấu trúc hình thành thế nào? Từ hạt giống CMB tới mạng vũ trụ

> 💡 **Trực giác.** Tưởng tượng một mặt nước phẳng gần như hoàn hảo, nhưng có những gợn lăn tăn cực nhỏ. Nếu có một cơ chế "khuếch đại" gợn nào nhô lên thì hút thêm nước về phía nó — gợn nhỏ dần phình thành sóng lớn, đáy gợn thành vùng cạn. Trong vũ trụ, **hấp dẫn** chính là bộ khuếch đại đó: nơi mật độ nhỉnh hơn trung bình một chút sẽ hút thêm vật chất → càng đặc → hút mạnh hơn → "chảy" thành sợi và nút, để lại void rỗng.

**Định nghĩa — thăng giáng mật độ (density fluctuation), 3 phần:**

- **(a) Là gì** — Đại lượng $\\delta = \\dfrac{\\rho - \\bar\\rho}{\\bar\\rho}$: độ lệch mật độ tương đối so với mật độ trung bình $\\bar\\rho$. $\\delta > 0$: vùng đậm đặc hơn trung bình; $\\delta < 0$: vùng loãng (mầm của void).
- **(b) Vì sao cần** — Để định lượng "vũ trụ ban đầu gồ ghề bao nhiêu". CMB cho thấy $\\delta \\sim 10^{-5}$ lúc 380 000 năm tuổi — cực kỳ mịn. Cần đại lượng $\\delta$ để theo dõi nó *lớn lên* theo thời gian thành cấu trúc $\\delta \\sim 1$ (và hơn) ngày nay.
- **(c) Ví dụ trực giác bằng số** — Vùng có $\\rho$ lớn hơn trung bình 0.001%: $\\delta = 0{,}00001 = 10^{-5}$, đúng cỡ vết lốm đốm nóng/lạnh trong CMB. Ngày nay một đám thiên hà có $\\rho$ gấp ~200 lần trung bình: $\\delta \\approx 199$.

**Dòng thời gian hình thành cấu trúc:**

| Thời điểm | $\\delta$ điển hình | Trạng thái |
|---|---|---|
| ~380 000 năm (CMB) | $\\sim 10^{-5}$ | Hạt giống — lốm đốm nhiệt độ trong CMB |
| Vài trăm triệu năm | $\\sim 0{,}01$–$0{,}1$ | Vật chất tối gom thành "quầng halo" đầu tiên; sao/thiên hà sơ khai bật sáng |
| Vài tỉ năm | $\\sim 1$ | Sợi và void thành hình; thiên hà tụ dọc sợi |
| Ngày nay (13.8 tỉ năm) | $\\sim 1$ đến $\\sim 200+$ | Mạng vũ trụ trưởng thành: siêu đám, tường, void lớn |

**Vai trò vật chất tối:** Vật chất thường (baryon) trước CMB bị áp lực photon ghìm, không thể tụ. **Vật chất tối** không tương tác với ánh sáng → bắt đầu tụ *sớm hơn*, dựng sẵn bộ khung hấp dẫn. Sau CMB, baryon "rơi vào" các hố thế vật chất tối đã đào sẵn → tăng tốc hình thành cấu trúc. Không có vật chất tối, 13.8 tỉ năm **không đủ** để mạng vũ trụ kịp lớn từ $\\delta \\sim 10^{-5}$.

> ❓ **Câu hỏi tự nhiên.**
> - *"$\\delta \\sim 10^{-5}$ nhỏ xíu sao thành cấu trúc khổng lồ được?"* — Vì hấp dẫn là *bất ổn định*: vùng $\\delta > 0$ hút thêm vật chất → $\\delta$ tăng → hút mạnh hơn (vòng phản hồi dương). Trong giai đoạn vật chất thống trị, $\\delta$ tăng tỉ lệ với hệ số giãn nở $a$ — đủ thời gian để từ $10^{-5}$ lên $\\sim 1$.
> - *"Vì sao void rỗng dần?"* — Vùng $\\delta < 0$ *đẩy* vật chất ra phía các vùng đậm xung quanh (theo nghĩa tương đối: vật chất chảy về nơi đậm). Void cứ rỗng thêm, ranh giới của nó dồn thành tường.

> ⚠ **Lỗi thường gặp.** Nghĩ thiên hà "bay vào nhau" để tạo đám. Phần lớn là **vật chất rơi vào hố thế hấp dẫn** đã có sẵn (do vật chất tối), chứ không phải va chạm ngẫu nhiên. Cấu trúc lớn = hệ quả của trường hấp dẫn, không phải của các cú đâm.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao bản đồ thiên hà ngày nay (mạng vũ trụ rõ ràng) và bản đồ CMB (gần như mịn, $\\delta \\sim 10^{-5}$) lại "khớp" với nhau dù trông rất khác?
> <details><summary>Đáp án</summary>Vì các vết lốm đốm $\\delta \\sim 10^{-5}$ trong CMB chính là **bản thiết kế** của mạng vũ trụ: nơi CMB hơi đậm → 13.8 tỉ năm sau là nơi có sợi/siêu đám; nơi hơi loãng → thành void. Hấp dẫn chỉ phóng đại bản vẽ có sẵn, không vẽ lại.</details>

---

## 4. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **Mạng vũ trụ**: thiên hà gom thành sợi/tường/nút, ngăn bởi void rỗng; thang ≳ 10 Mpc.
> - **Thang kích thước**: thiên hà 0.03 Mpc → đám 5 Mpc → siêu đám 160 Mpc → tường ~420 Mpc.
> - **Khảo sát redshift (SDSS)**: (RA, Dec) + $z$ → khoảng cách $d = v/H_0$ → bản đồ 3D hàng triệu thiên hà.
> - **Hình thành cấu trúc**: hạt giống $\\delta \\sim 10^{-5}$ trong CMB → hấp dẫn (vật chất tối dẫn đường) khuếch đại dần thành mạng $\\delta \\sim 1+$ ngày nay.
> - **Vật chất tối** là điều kiện cần: dựng khung hố thế sớm, nếu không 13.8 tỉ năm không đủ.

---

## Bài tập

1. **Đổi redshift sang khoảng cách.** Một thiên hà trong SDSS có $z = 0{,}15$. Lấy $H_0 = 70 \\ \\text{km/s/Mpc}$, $c = 300\\,000 \\ \\text{km/s}$. Tính vận tốc lùi xa và khoảng cách (Mpc và năm ánh sáng). Xấp xỉ $z$ nhỏ có còn hợp lý không?

2. **Thang kích thước.** Đổi đường kính void Boötes (~330 triệu năm ánh sáng) sang Mpc. Nó lớn gấp bao nhiêu lần đường kính Ngân Hà (~100 000 năm ánh sáng)?

3. **Thăng giáng mật độ.** Một vùng có mật độ $\\rho = 1{,}0008 \\, \\bar\\rho$. Tính $\\delta$. Một đám thiên hà có $\\rho \\approx 200 \\, \\bar\\rho$. Tính $\\delta$. So sánh hai giá trị và cho biết cái nào giống "hạt giống CMB" hơn.

4. **Vận tốc riêng & Fingers of God.** Giải thích vì sao một đám thiên hà thật (hình cầu trong không gian) lại hiện ra thành một "ngón tay" dài kéo về phía người quan sát trên bản đồ redshift. (Gợi ý: thiên hà trong đám có vận tốc riêng ngẫu nhiên cộng/trừ vào redshift giãn nở.)

5. **Vai trò vật chất tối.** Trình bày 2 lý do vì sao nếu vũ trụ KHÔNG có vật chất tối thì mạng vũ trụ như ngày nay khó hình thành kịp trong 13.8 tỉ năm.

---

## Lời giải chi tiết

### Bài 1 — Đổi redshift sang khoảng cách

**Cách tiếp cận:** dùng $v \\approx c\\,z$ rồi $d = v/H_0$.

$$\\begin{aligned}
v &\\approx c\\,z = 300\\,000 \\times 0{,}15 = 45\\,000 \\ \\text{km/s} \\\\
d &= \\frac{v}{H_0} = \\frac{45\\,000}{70} \\approx 643 \\ \\text{Mpc}
\\end{aligned}$$

Đổi năm ánh sáng: $643 \\times 3{,}26 \\approx 2{,}1 \\ \\text{tỉ năm ánh sáng}$.

**Xấp xỉ $z$ nhỏ còn hợp lý không?** $z = 0{,}15$ đã hơi vượt ngưỡng $z \\lesssim 0{,}1$, sai số bắt đầu đáng kể (cỡ vài %–10%). Dùng cho trực giác thì chấp nhận được, nhưng báo cáo chính xác cần công thức vũ trụ học đầy đủ.

### Bài 2 — Thang kích thước

**Đổi void sang Mpc:** dùng $1 \\ \\text{Mpc} = 3{,}26$ triệu ly:

$$330 \\text{ triệu ly} \\div 3{,}26 \\ (\\text{triệu ly/Mpc}) \\approx 101 \\ \\text{Mpc}$$

**So với Ngân Hà:**

$$\\frac{330\\,000\\,000 \\ \\text{ly}}{100\\,000 \\ \\text{ly}} = 3300 \\text{ lần}$$

Void Boötes rộng gấp ~**3 300 lần** đường kính Ngân Hà. Một khoảng trống gần như rỗng to gấp vài nghìn lần cả một thiên hà — đó là quy mô của void.

### Bài 3 — Thăng giáng mật độ

Dùng $\\delta = \\dfrac{\\rho - \\bar\\rho}{\\bar\\rho}$.

- Vùng $\\rho = 1{,}0008 \\, \\bar\\rho$:

  $$\\delta = \\frac{1{,}0008 \\, \\bar\\rho - \\bar\\rho}{\\bar\\rho} = 0{,}0008 = 8 \\times 10^{-4}$$

- Đám thiên hà $\\rho = 200 \\, \\bar\\rho$:

  $$\\delta = \\frac{200 \\, \\bar\\rho - \\bar\\rho}{\\bar\\rho} = 199$$

**So sánh:** $\\delta = 8 \\times 10^{-4}$ rất nhỏ, gần với "hạt giống CMB" ($\\delta \\sim 10^{-5}$, cùng bậc cực nhỏ) hơn nhiều so với $\\delta = 199$ của đám đã sụp đổ. Vùng thứ nhất là cấu trúc *sơ khai/tuyến tính*; đám thiên hà là cấu trúc *đã trưởng thành/phi tuyến*.

### Bài 4 — Fingers of God

**Lập luận từng bước:**

1. Bản đồ redshift đặt khoảng cách theo $d = v/H_0$, trong đó $v$ được đo từ redshift.
2. Một đám thiên hà thật có dạng gần cầu, nhưng các thiên hà bên trong chuyển động hỗn loạn với **vận tốc riêng** lớn (±~1000 km/s) do hố thế hấp dẫn của đám.
3. Vận tốc riêng này **cộng/trừ** vào vận tốc giãn nở Hubble theo phương nhìn. Thiên hà đang lao về phía ta → redshift nhỏ hơn → bản đồ đặt nó gần hơn; lao ra xa → redshift lớn hơn → đặt xa hơn.
4. Kết quả: cụm cầu bị **kéo dãn dọc theo đường ngắm** thành một "ngón tay" trỏ thẳng về người quan sát ("Fingers of God").

Đây là **méo do vận tốc riêng (redshift-space distortion)**, một artifact của phép đo, không phải hình dạng thật của đám.

### Bài 5 — Vai trò vật chất tối

Hai lý do:

1. **Tụ sớm hơn baryon.** Trước thời điểm CMB (380 000 năm), vật chất thường (baryon) còn bị áp lực bức xạ photon ghìm chặt, δ không tăng được. Vật chất tối không tương tác điện từ nên *không bị photon ghìm* → bắt đầu tụ và đào hố thế hấp dẫn *trước* khi vũ trụ trong suốt. Khi baryon được "thả tự do" sau CMB, hố thế đã sẵn → tiết kiệm hàng trăm triệu năm.
2. **Đủ khối lượng để khuếch đại.** Vật chất tối chiếm ~85% tổng vật chất. Hấp dẫn của nó mới đủ mạnh để kéo $\\delta$ từ $10^{-5}$ lên $\\sim 1$ trong 13.8 tỉ năm. Chỉ với baryon (~15%), tốc độ tăng trưởng quá chậm → vũ trụ ngày nay sẽ gần như còn mịn, không có mạng vũ trụ rõ rệt.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Bản đồ mạng vũ trụ**: sinh hàng trăm "thiên hà" tụ thành sợi/nút quanh các void; slider điều chỉnh độ tương phản (mức $\\delta$) để thấy mạng rõ dần.
  - **Mô phỏng tăng trưởng cấu trúc**: slider thời gian (từ CMB tới nay) cho thấy các hạt từ phân bố gần đều ($\\delta$ nhỏ) gom dần thành sợi/nút khi hấp dẫn khuếch đại $\\delta$.
  - **Bộ đổi redshift → khoảng cách**: nhập $z$ và $H_0$ → tính $v$, $d$ (Mpc + năm ánh sáng) ngay.

---

## Bài tiếp theo

→ [Lesson 06 — Ngoại hành tinh](../lesson-06-exoplanets/): rời thang Mpc của mạng vũ trụ để quay về thang hệ sao — làm sao phát hiện hành tinh quanh các sao khác, vùng sống được, và phương trình Drake ước lượng số nền văn minh.

**Tham khảo chéo:** xác suất & thống kê dùng cho ước lượng δ và (ở L06) phương trình Drake → [\`../../../Vectors/05-Probability/\`](../../../Vectors/05-Probability/).
`;
