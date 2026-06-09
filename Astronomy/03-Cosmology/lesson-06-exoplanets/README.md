# Lesson 06 — Ngoại hành tinh (Exoplanets)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Biết **ngoại hành tinh (exoplanet)** là gì và 4 **phương pháp phát hiện** chính: quá cảnh (transit), vận tốc xuyên tâm (radial velocity), chụp ảnh trực tiếp (direct imaging), vi thấu kính (microlensing).
- Tính **độ sâu quá cảnh (transit depth)** từ tỉ số bán kính: $\delta = \left(\dfrac{R_p}{R_*}\right)^2$, và đọc đường cong ánh sáng (light curve).
- Hiểu **vùng sống được (habitable zone)** — vì sao có khoảng cách "vừa phải" để nước lỏng tồn tại.
- Dùng **phương trình Drake (Drake equation)** để ước lượng số nền văn minh liên lạc được, và biết nó là công cụ tư duy chứ không phải con số chắc chắn.
- Nhận biết vài hệ tiêu biểu: **TRAPPIST-1**, các hành tinh **Kepler**.

## Kiến thức tiền đề

- **Định luật hấp dẫn & quỹ đạo** (sao và hành tinh quay quanh khối tâm chung): [`../../01-SolarSystem/lesson-03-kepler-orbits/`](../../01-SolarSystem/lesson-03-kepler-orbits/) nếu có.
- **Dịch chuyển Doppler** (đã dùng cho redshift): [`../lesson-01-expanding-universe/`](../lesson-01-expanding-universe/).
- **Xác suất cơ bản** (để đọc phương trình Drake như một tích các xác suất): [`../../../Vectors/05-Probability/`](../../../Vectors/05-Probability/).

---

## 1. Ngoại hành tinh & vì sao khó thấy

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng đứng ở Hà Nội cố nhìn một con đom đóm đậu ngay cạnh ngọn hải đăng ở San Francisco. Ánh hải đăng (ngôi sao) chói gấp hàng tỉ lần con đom đóm (hành tinh) và ở sát nó. Đó là lý do hầu hết ngoại hành tinh **không nhìn thấy trực tiếp** — ta phải phát hiện chúng *gián tiếp*, qua ảnh hưởng của chúng lên ngôi sao chủ.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Ngoại hành tinh là hành tinh quay quanh một ngôi sao **khác Mặt Trời** (hoặc trôi tự do không sao chủ). Tính tới nay đã xác nhận hơn **5 700** ngoại hành tinh.
- **(b) Vì sao cần khái niệm này** — Để trả lời câu hỏi cổ xưa "Trái Đất có cô đơn không?". Muốn ước lượng khả năng có sự sống nơi khác, trước hết phải biết hành tinh *phổ biến đến mức nào* — và ngày nay ta biết: gần như **mỗi ngôi sao đều có hành tinh**.
- **(c) Ví dụ trực giác bằng số** — Sao Mộc sáng hơn Mặt Trời $\sim 10^{-9}$ lần (chỉ phản xạ ánh sao). Tách một nguồn yếu hơn tỉ lần ở sát một nguồn chói là cực khó → cần phương pháp gián tiếp.

> ❓ **Câu hỏi tự nhiên.** *"Sao không chụp thẳng cho nhanh?"* — Chụp trực tiếp được, nhưng chỉ với hành tinh **lớn, nóng (tự phát hồng ngoại), xa sao chủ**. Đa số hành tinh nhỏ và sát sao → bị ánh sao nuốt → phải dùng transit/RV.

---

## 2. Bốn phương pháp phát hiện

### 2.1 Quá cảnh (Transit) — phương pháp của Kepler/TESS

> 💡 **Trực giác.** Khi hành tinh đi ngang qua *trước* đĩa sao (nhìn từ Trái Đất), nó che bớt một mẩu ánh sao → độ sáng sao **tụt nhẹ** rồi hồi phục. Vẽ độ sáng theo thời gian được một "vết lõm" — đó là **đường cong ánh sáng quá cảnh**.

**Định nghĩa — độ sâu quá cảnh (transit depth), 3 phần:**

- **(a) Là gì** — Tỉ lệ độ sáng bị che: $\delta = \left(\dfrac{R_p}{R_*}\right)^2$, với $R_p$ = bán kính hành tinh, $R_*$ = bán kính sao. Vì độ sáng $\propto$ diện tích đĩa, mà diện tích $\propto$ bán kính bình phương, nên độ che $\propto (R_p/R_*)^2$.
- **(b) Vì sao cần** — $\delta$ đo *trực tiếp* được từ đường cong ánh sáng → cho ngay **kích thước hành tinh** so với sao. Đây là cách phát hiện hiệu quả nhất (Kepler tìm hàng nghìn hành tinh).
- **(c) Ví dụ trực giác bằng số** — Sao Mộc ($R_p \approx 0{,}1 \, R_\odot$) trước Mặt Trời: $\delta = 0{,}1^2 = 0{,}01 = 1\%$. Trái Đất ($R_p \approx 0{,}009 \, R_\odot$): $\delta = 0{,}009^2 \approx 8 \times 10^{-5} = 0{,}008\%$.

**Walk-through bằng số thật (verify) — Sao Mộc trước Mặt Trời:**

Bán kính Sao Mộc ≈ 71 500 km; bán kính Mặt Trời ≈ 696 000 km.

$$\begin{aligned}
\frac{R_p}{R_*} &= \frac{71\,500}{696\,000} \approx 0{,}1027 \\
\delta &= (0{,}1027)^2 \approx 0{,}01055 \approx 1{,}06\%
\end{aligned}$$

→ Sao Mộc che ~**1%** ánh Mặt Trời — dễ phát hiện.

**Walk-through — Trái Đất trước Mặt Trời:**

Bán kính Trái Đất ≈ 6 371 km.

$$\begin{aligned}
\frac{R_p}{R_*} &= \frac{6371}{696\,000} \approx 0{,}00915 \\
\delta &= (0{,}00915)^2 \approx 8{,}4 \times 10^{-5} \approx 0{,}0084\%
\end{aligned}$$

→ Trái Đất chỉ che ~**0.008%** — cần kính cực nhạy (Kepler) mới đo nổi.

**4 ví dụ số (độ sâu quá cảnh trước một sao cỡ Mặt Trời):**

| Hành tinh | $R_p$ (so với $R_\odot$) | $\delta = (R_p/R_*)^2$ | Độ sâu |
|---|---|---|---|
| Sao Mộc | 0,103 | 0,0106 | ~1.06% |
| Sao Hải Vương | 0,035 | 0,00126 | ~0.13% |
| Trái Đất | 0,00915 | $8{,}4 \times 10^{-5}$ | ~0.0084% |
| Sao Hỏa | 0,00487 | $2{,}4 \times 10^{-5}$ | ~0.0024% |

> ⚠ **Lỗi thường gặp.** Tưởng độ sâu tỉ lệ với $R_p$ (bậc 1). KHÔNG — nó tỉ lệ **bình phương** $R_p/R_*$. Tăng bán kính hành tinh gấp đôi → độ sâu gấp **bốn**, không phải gấp đôi.

> 🔁 **Dừng lại tự kiểm tra.** Một hành tinh có $R_p = 2 \, R_\oplus$ quá cảnh một sao cỡ Mặt Trời. Độ sâu gấp mấy lần so với Trái Đất quá cảnh cùng sao đó?
> <details><summary>Đáp án</summary>$\delta \propto R_p^2$ nên gấp $2^2 = $ **4 lần**. Trái Đất ~0.0084% → hành tinh này ~0.034%.</details>

### 2.2 Vận tốc xuyên tâm (Radial Velocity)

> 💡 **Trực giác.** Sao và hành tinh quay quanh **khối tâm chung**, nên sao bị hành tinh kéo "lắc" qua lại quanh tâm này. Khi sao tiến về ta → phổ dịch xanh; lùi ra xa → dịch đỏ. Đo dao động Doppler tuần hoàn của vạch phổ → suy ra có hành tinh và khối lượng tối thiểu của nó. Đây là cách phát hiện **ngoại hành tinh đầu tiên quanh sao kiểu Mặt Trời (51 Pegasi b, 1995)**.

Sao Mộc làm Mặt Trời lắc với biên độ vận tốc ~12.5 m/s; Trái Đất chỉ ~0.09 m/s → hành tinh nhỏ rất khó dò bằng RV.

### 2.3 Chụp ảnh trực tiếp (Direct Imaging)

Dùng **vành che (coronagraph)** chặn ánh sao để lộ hành tinh. Chỉ hiệu quả với hành tinh lớn, trẻ, nóng (tự phát hồng ngoại) và xa sao chủ (vd hệ HR 8799).

### 2.4 Vi thấu kính hấp dẫn (Microlensing)

Khi một sao (kèm hành tinh) đi ngang trước một sao nền xa hơn, hấp dẫn của nó **bẻ cong và khuếch đại** ánh sao nền (sẽ học kỹ cơ chế bẻ cong ánh sáng ở [Lesson 07](../lesson-07-relativity-spacetime/)). Hành tinh tạo một "đỉnh phụ" trong đường cong khuếch đại → phát hiện được cả hành tinh ở rất xa.

**Bảng so sánh 4 phương pháp:**

| Phương pháp | Đo gì | Mạnh với | Hạn chế |
|---|---|---|---|
| Transit | Độ giảm sáng $\delta = (R_p/R_*)^2$ | Hành tinh sát sao, nhiều hành tinh cùng lúc | Cần quỹ đạo "nghiêng đúng" để che sao |
| Radial velocity | Dao động vận tốc Doppler của sao | Hành tinh nặng, sát sao | Khó với hành tinh nhỏ; chỉ cho khối lượng tối thiểu |
| Direct imaging | Ảnh trực tiếp | Hành tinh lớn, nóng, xa sao | Không thấy hành tinh nhỏ/sát sao |
| Microlensing | Đỉnh khuếch đại ánh sao nền | Hành tinh rất xa, kể cả trôi tự do | Sự kiện chỉ xảy ra một lần, không lặp |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao không phải hành tinh nào cũng quá cảnh được?"* — Vì cần quỹ đạo của hành tinh **gần như nằm trên đường ngắm** từ Trái Đất thì nó mới đi ngang đĩa sao. Đa số hệ nghiêng "lệch" → không quá cảnh. Đó là lý do transit chỉ thấy một phần nhỏ số hành tinh thật sự tồn tại.

---

## 3. Vùng sống được (Habitable Zone)

> 💡 **Trực giác.** Truyện "Cô bé tóc vàng" (Goldilocks): bát cháo không quá nóng, không quá lạnh, *vừa đủ ấm*. Vùng sống được là dải khoảng cách quanh sao mà ở đó nhiệt độ "vừa phải" để **nước lỏng** tồn tại trên bề mặt hành tinh đá — không quá gần (nước bốc hơi) cũng không quá xa (nước đóng băng).

**Định nghĩa (3 phần):**

- **(a) Là gì** — Dải bán kính quỹ đạo quanh một sao nơi một hành tinh đá có thể giữ nước lỏng bề mặt (giả định khí quyển hợp lý).
- **(b) Vì sao cần** — Nước lỏng được xem là điều kiện gần như bắt buộc cho sự sống như ta biết. Khoanh vùng sống được giúp *ưu tiên mục tiêu* khi săn hành tinh có khả năng có sự sống.
- **(c) Ví dụ trực giác bằng số** — Quanh Mặt Trời, vùng sống được khoảng **0.95–1.4 AU**: Trái Đất (1 AU) nằm trong; Sao Kim (0.72 AU) quá nóng; Sao Hỏa (1.52 AU) gần rìa ngoài, hơi lạnh.

**Hệ tiêu biểu — TRAPPIST-1:** một sao lùn đỏ lạnh, chỉ ~0.09 khối lượng Mặt Trời, có **7 hành tinh đá** kích cỡ Trái Đất; **3–4** hành tinh nằm trong vùng sống được. Vì sao lùn đỏ mờ và lạnh, vùng sống được ở rất gần sao (các hành tinh quay quanh trong vài ngày).

> ⚠ **Lỗi thường gặp.** "Trong vùng sống được = chắc chắn có sự sống/ở được". Sai — vùng sống được chỉ là *điều kiện cần về nhiệt độ*. Còn cần khí quyển phù hợp, từ trường che bức xạ, không bị khóa thủy triều bất lợi... Nó là sàng lọc bước đầu, không phải kết luận.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao vùng sống được của một sao lùn đỏ (mờ) lại gần sao hơn nhiều so với của Mặt Trời?
> <details><summary>Đáp án</summary>Vì sao lùn đỏ phát ít năng lượng → muốn nhận đủ nhiệt cho nước lỏng, hành tinh phải nằm sát hơn. Như ngồi gần lửa nhỏ thì phải xích lại gần mới ấm.</details>

---

## 4. Phương trình Drake

> 💡 **Trực giác.** Bạn muốn đoán "có bao nhiêu tiệm phở mở cửa lúc này ở Hà Nội đang có khách". Bạn nhân: (số tiệm) × (tỉ lệ đang mở) × (tỉ lệ có khách)... Mỗi thừa số thu hẹp dần. Phương trình Drake làm đúng vậy với "số nền văn minh liên lạc được trong Ngân Hà": nhân một chuỗi xác suất/tỉ lệ lại với nhau.

**Định nghĩa (3 phần):**

- **(a) Là gì** — Công thức ước lượng $N$ = số nền văn minh trong Ngân Hà mà ta có thể liên lạc:

  $$N = R_* \times f_p \times n_e \times f_l \times f_i \times f_c \times L$$

- **(b) Vì sao cần** — Để *cấu trúc hóa* sự không chắc chắn: thay vì cãi nhau "có người ngoài hành tinh không", ta tách thành các thừa số đo được/đoán được riêng rẽ → thấy rõ chỗ nào ta biết, chỗ nào còn mù mờ.
- **(c) Ví dụ trực giác bằng số** — Xem walk-through bên dưới.

**Ý nghĩa các thừa số:**

| Ký hiệu | Ý nghĩa | Giá trị minh họa |
|---|---|---|
| $R_*$ | Số sao mới sinh mỗi năm trong Ngân Hà | ~1.5 /năm |
| $f_p$ | Tỉ lệ sao có hành tinh | ~1 (gần như mọi sao) |
| $n_e$ | Số hành tinh sống được trung bình mỗi hệ | ~0.4 |
| $f_l$ | Tỉ lệ hành tinh sống được có sự sống nảy sinh | ~0.5 (rất bất định) |
| $f_i$ | Tỉ lệ trong đó có trí tuệ | ~0.1 (rất bất định) |
| $f_c$ | Tỉ lệ phát tín hiệu liên lạc được | ~0.2 (rất bất định) |
| $L$ | Tuổi thọ (năm) của giai đoạn phát tín hiệu | ~10 000 năm (đoán) |

**Walk-through bằng số thật (verify):** Nhân các giá trị minh họa trên:

$$\begin{aligned}
N &= 1{,}5 \times 1 \times 0{,}4 \times 0{,}5 \times 0{,}1 \times 0{,}2 \times 10\,000 \\
1{,}5 \times 0{,}4 &= 0{,}6 \\
0{,}6 \times 0{,}5 &= 0{,}3 \\
0{,}3 \times 0{,}1 &= 0{,}03 \\
0{,}03 \times 0{,}2 &= 0{,}006 \\
0{,}006 \times 10\,000 &= 60
\end{aligned}$$

→ Với bộ giá trị này, $N \approx 60$ nền văn minh. Nhưng nếu $L$ chỉ 100 năm thay vì 10 000: $N \approx 0{,}6$ (làm tròn < 1, gần như cô đơn). Một thừa số đổi → kết quả đổi 100 lần.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vậy phương trình cho con số đúng không?"* — **Không.** Bốn thừa số cuối ($f_l, f_i, f_c, L$) chủ yếu là *phỏng đoán*. Phương trình Drake là **công cụ tư duy** để biết ta cần đo gì, không phải máy cho đáp số.
> - *"Phần nào ta đã biết khá chắc?"* — $R_*$ và $f_p$ (nay biết hành tinh rất phổ biến) và phần nào $n_e$. Càng về cuối càng mù mờ.

> ⚠ **Lỗi thường gặp.** Lấy phương trình Drake làm "bằng chứng" có/không có người ngoài hành tinh. Nó chỉ phơi bày sự bất định: vì các thừa số nhân nhau, một thừa số nhỏ kéo cả tích về gần 0; một thừa số lớn đẩy lên hàng nghìn.

> 🔁 **Dừng lại tự kiểm tra.** Giữ nguyên bộ giá trị minh họa nhưng đặt $f_l = 0{,}05$ (sự sống hiếm hơn). $N$ mới bằng bao nhiêu?
> <details><summary>Đáp án</summary>So với bộ gốc, $f_l$ giảm từ 0,5 xuống 0,05 = chia 10. Vậy $N = 60/10 = $ **6**. Một thừa số giảm 10 lần → $N$ giảm đúng 10 lần (vì là tích).</details>

---

## 5. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **Ngoại hành tinh** rất phổ biến (>5 700 xác nhận); hầu hết phát hiện *gián tiếp*.
> - **Transit**: độ sâu $\delta = (R_p/R_*)^2$ — Sao Mộc ~1%, Trái Đất ~0.008%. Tỉ lệ với bình phương bán kính.
> - **Radial velocity**: đo sao "lắc" qua Doppler; **direct imaging**: chụp hành tinh lớn/nóng; **microlensing**: khuếch đại ánh sao nền.
> - **Vùng sống được**: dải cho nước lỏng (~0.95–1.4 AU quanh Mặt Trời); TRAPPIST-1 có nhiều hành tinh đá trong vùng.
> - **Phương trình Drake**: tích 7 thừa số → ước lượng N; là công cụ tư duy, không phải đáp số chắc chắn.

---

## Bài tập

1. **Độ sâu quá cảnh.** Một hành tinh bán kính $R_p = 1{,}5 \, R_\oplus$ quá cảnh một sao cỡ Mặt Trời. Dùng $R_\oplus \approx 0{,}00915 \, R_\odot$, tính độ sâu $\delta$ (%) và so với Trái Đất.

2. **Suy bán kính hành tinh từ đường cong.** Kepler đo độ sâu quá cảnh $\delta = 0{,}25\%$ trên một sao có $R_* = 0{,}8 \, R_\odot$. Tính $R_p$ theo $R_\odot$ rồi đổi ra $R_\oplus$ ($R_\odot \approx 109 \, R_\oplus$). Hành tinh này cỡ gì?

3. **Vùng sống được.** Giải thích vì sao Sao Kim (0.72 AU) và Sao Hỏa (1.52 AU) đều không lý tưởng cho nước lỏng bề mặt, dù Sao Hỏa nằm gần rìa vùng sống được của Mặt Trời.

4. **Phương trình Drake.** Lấy $R_* = 2$, $f_p = 1$, $n_e = 0{,}5$, $f_l = 0{,}3$, $f_i = 0{,}1$, $f_c = 0{,}1$, $L = 1000$. Tính $N$. Sau đó tăng $L$ lên 100 000 và tính lại — nhận xét vai trò của $L$.

5. **Chọn phương pháp.** Bạn muốn phát hiện một hành tinh đá nhỏ, sát một sao mờ. Phương pháp nào hợp lý nhất và vì sao? Phương pháp nào gần như vô vọng?

---

## Lời giải chi tiết

### Bài 1 — Độ sâu quá cảnh

$R_p = 1{,}5 \, R_\oplus = 1{,}5 \times 0{,}00915 \, R_\odot = 0{,}013725 \, R_\odot$.

$$\delta = \left(\frac{R_p}{R_*}\right)^2 = (0{,}013725)^2 \approx 1{,}88 \times 10^{-4} \approx 0{,}0188\%$$

So với Trái Đất (~0.0084%): tỉ lệ $= 1{,}5^2 = $ **2.25 lần** sâu hơn (vì $\delta \propto R_p^2$). Khớp: $0{,}0084\% \times 2{,}25 \approx 0{,}0189\%$.

### Bài 2 — Suy bán kính từ đường cong

Từ $\delta = \left(\dfrac{R_p}{R_*}\right)^2$ → $R_p = R_* \times \sqrt{\delta}$.

$$\begin{aligned}
\sqrt{\delta} &= \sqrt{0{,}0025} = 0{,}05 \\
R_p &= 0{,}8 \, R_\odot \times 0{,}05 = 0{,}04 \, R_\odot
\end{aligned}$$

Đổi ra $R_\oplus$: $R_p = 0{,}04 \times 109 \, R_\oplus \approx 4{,}36 \, R_\oplus$.

Hành tinh cỡ ~4.4 lần bán kính Trái Đất — cỡ một **"tiểu Hải Vương" (sub-Neptune)**, lớn hơn Trái Đất nhiều, có thể nhiều khí.

### Bài 3 — Vùng sống được

**Sao Kim (0.72 AU):** quá gần Mặt Trời → nhận nhiều bức xạ → nước bốc hơi, hơi nước là khí nhà kính → hiệu ứng nhà kính mất kiểm soát (runaway greenhouse), bề mặt ~465°C. Nằm *trong* rìa trong của vùng sống được → quá nóng.

**Sao Hỏa (1.52 AU):** gần rìa *ngoài* vùng sống được nhưng:
1. Khối lượng nhỏ → hấp dẫn yếu → đã mất phần lớn khí quyển → áp suất quá thấp để giữ nước lỏng ổn định.
2. Mất từ trường → gió Mặt Trời thổi bay khí quyển. Kết quả: lạnh, khô, nước chủ yếu là băng.

Bài học: nằm gần/ trong vùng sống được là **điều kiện cần chứ chưa đủ** — còn phụ thuộc khí quyển và từ trường (khớp callout ⚠ ở mục 3).

### Bài 4 — Phương trình Drake

**Lần 1, $L = 1000$:**

$$\begin{aligned}
N &= 2 \times 1 \times 0{,}5 \times 0{,}3 \times 0{,}1 \times 0{,}1 \times 1000 \\
2 \times 0{,}5 &= 1 \\
1 \times 0{,}3 &= 0{,}3 \\
0{,}3 \times 0{,}1 &= 0{,}03 \\
0{,}03 \times 0{,}1 &= 0{,}003 \\
0{,}003 \times 1000 &= 3
\end{aligned}$$

→ $N = $ **3**.

**Lần 2, $L = 100\,000$:** chỉ $L$ tăng 100 lần → $N$ tăng 100 lần → $N = $ **300**.

**Nhận xét:** $N$ tỉ lệ thẳng với $L$. Vì các nền văn minh "đến rồi đi", nếu mỗi nền chỉ phát tín hiệu trong thời gian ngắn ($L$ nhỏ) thì hiếm khi hai nền cùng tồn tại đồng thời để liên lạc → $N$ nhỏ. $L$ là thừa số *bất định nhất* và ảnh hưởng tuyến tính rất mạnh.

### Bài 5 — Chọn phương pháp

**Hợp lý nhất: Quá cảnh (transit).** Hành tinh sát sao → xác suất quỹ đạo che đĩa sao cao hơn, và quá cảnh xảy ra thường xuyên (chu kỳ ngắn) nên dễ bắt lặp lại. Với sao **mờ và nhỏ** (lùn đỏ), $R_*$ nhỏ → cùng một hành tinh cho $\delta = (R_p/R_*)^2$ *lớn hơn* → dễ đo. (Đây chính là cách TRAPPIST-1 được khảo sát.)

**Gần như vô vọng: Chụp ảnh trực tiếp.** Hành tinh nhỏ, lạnh, sát sao → bị ánh sao nuốt hoàn toàn, coronagraph không tách nổi. Radial velocity cũng yếu (hành tinh nhỏ → sao lắc rất ít).

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Simulator đường cong ánh sáng quá cảnh**: slider bán kính hành tinh ($R_p/R_*$) → vẽ "vết lõm" độ sáng và hiện độ sâu $\delta = (R_p/R_*)^2$ ngay; có preset Sao Mộc, Trái Đất, sub-Neptune.
  - **Calculator phương trình Drake**: 7 slider cho từng thừa số → tính $N$ live, kèm cảnh báo về độ bất định của các thừa số cuối.

---

## Bài tiếp theo

→ [Lesson 07 — Tương đối & không-thời gian](../lesson-07-relativity-spacetime/): hiểu sâu cơ chế **bẻ cong ánh sáng** (nền tảng của vi thấu kính), khối lượng làm cong không-thời gian, sóng hấp dẫn. Ta sẽ thấy hấp dẫn không phải "lực hút" mà là hình học.

**Tham khảo chéo:** xác suất cho phương trình Drake → [`../../../Vectors/05-Probability/`](../../../Vectors/05-Probability/).
