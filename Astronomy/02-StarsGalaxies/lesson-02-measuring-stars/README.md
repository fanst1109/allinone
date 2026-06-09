# Lesson 02 — Đo sao: độ sáng & khoảng cách (Measuring Stars)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **cấp sao biểu kiến (apparent magnitude, m)** và **cấp sao tuyệt đối (absolute magnitude, M)**.
- Hiểu **thang cấp sao là thang logarit "ngược"**: số nhỏ = sáng hơn; chênh 5 cấp = 100 lần độ sáng.
- Dùng công thức $m_1 - m_2 = -2{,}5\log\left(\dfrac{F_1}{F_2}\right)$ để so sánh độ sáng (flux).
- Hiểu **độ trưng (luminosity)** vs **độ rọi/flux** và **định luật nghịch đảo bình phương**.
- Đo **khoảng cách bằng thị sai (parallax)**: $d \ [\text{pc}] = \dfrac{1}{p \ ['']}$, và phân biệt **parsec** với **năm ánh sáng**.

## Kiến thức tiền đề

- **Logarit** (cơ số 10) — đại số: [`../../../Math/`](../../../Math/).
- **Lượng giác** (tan của góc rất nhỏ) cho thị sai: [`../../../Math/03-Trig-Complex/`](../../../Math/03-Trig-Complex/).
- **Độ trưng L** và Stefan–Boltzmann — [Lesson 01](../lesson-01-radiation-spectra/).

---

## 1. Cấp sao biểu kiến — sáng cỡ nào *trông từ Trái Đất*

> 💡 **Trực giác / Hình dung.** Người Hy Lạp cổ (Hipparchus) xếp sao sáng nhất là "hạng 1", mờ nhất mắt thường thấy là "hạng 6". Họ xếp **ngược**: số càng nhỏ càng sáng. Hệ thống ngày nay giữ truyền thống đó nhưng làm chính xác bằng toán học.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Cấp sao biểu kiến m** là con số đo độ sáng của thiên thể *như ta thấy từ Trái Đất*. Quy ước: **số nhỏ hơn = sáng hơn**; mỗi bậc 5 cấp tương ứng đúng **100 lần** chênh lệch độ sáng.
- **(b) Vì sao tồn tại / cần** — Mắt người cảm nhận độ sáng theo kiểu *logarit* (gấp đôi flux không thấy "gấp đôi sáng"). Thang cấp sao khớp với cảm nhận đó và nén dải độ sáng cực rộng (Mặt Trời sáng gấp hàng tỉ tỉ lần sao mờ nhất) vào một con số dễ dùng.
- **(c) Ví dụ trực giác bằng số** — Mặt Trời `m = −26.7` (rất âm = cực sáng), trăng rằm `m ≈ −12.7`, Sirius `m = −1.46` (sao sáng nhất bầu trời đêm), sao mờ nhất mắt thường `m ≈ +6`.

**4 ví dụ số cụ thể:**

| Thiên thể | m (biểu kiến) | Ghi chú |
|---|---|---|
| Mặt Trời | −26.7 | Sáng nhất bầu trời |
| Sirius | −1.46 | Sao sáng nhất ban đêm |
| Sao Bắc Cực (Polaris) | +1.98 | Trung bình |
| Giới hạn mắt thường | +6.0 | Trời tối, không ô nhiễm sáng |

> ⚠ **Lỗi thường gặp.** Tưởng "cấp sao cao = sáng". **Ngược lại!** `m = −1.46` (Sirius) **sáng hơn** `m = +6` (sao mờ). Luôn nhớ: **số nhỏ/âm = sáng; số lớn/dương = mờ.**

> 🔁 **Dừng lại tự kiểm tra.** Sao A có $m = 2$, sao B có $m = 5$. Sao nào sáng hơn khi nhìn từ Trái Đất?
> <details><summary>Đáp án</summary>Sao **A** ($m = 2$) sáng hơn, vì số nhỏ hơn. Chênh 3 cấp ⇒ A sáng hơn B khoảng $100^{3/5} \approx 15{,}8$ lần.</details>

---

## 2. Thang logarit — công thức cấp sao

> 💡 **Trực giác.** "Chênh 5 cấp = 100 lần độ sáng" nghĩa là mỗi 1 cấp ứng với hệ số $100^{1/5} = 10^{0{,}4} \approx 2{,}512$. Đi xuống 1 cấp (sáng hơn) → flux nhân $2{,}512$; đi lên 1 cấp (mờ hơn) → flux chia $2{,}512$.

> 📐 **Công thức Pogson:**
> $$m_1 - m_2 = -2{,}5 \log_{10}\left(\frac{F_1}{F_2}\right)$$
>
> trong đó $F$ là **flux** (độ rọi, năng lượng nhận được trên mỗi $\text{m}^2$ ở Trái Đất). Dấu trừ phản ánh "số nhỏ = sáng". Đảo lại: $\dfrac{F_1}{F_2} = 10^{-0{,}4\,(m_1 - m_2)}$.

**Walk-through bằng số thật (verify cả 2 vế):**

1. **Chênh đúng 5 cấp.** $m_1 - m_2 = 5$:
   $$\frac{F_1}{F_2} = 10^{-0{,}4 \times 5} = 10^{-2} = 0{,}01$$
   → sao có m lớn hơn 5 đơn vị thì **mờ gấp 100 lần** (flux $= 1/100$). Verify ngược: $m_1 - m_2 = -2{,}5\log(0{,}01) = -2{,}5 \times (-2) = 5$ ✓.

2. **Chênh 1 cấp.** $\Delta m = 1$ → $\dfrac{F_1}{F_2} = 10^{-0{,}4} = 0{,}398 \approx \dfrac{1}{2{,}512}$. Mỗi cấp = hệ số $2{,}512$. ✓

3. **Sirius vs Mặt Trời** ($m_{Sirius} = -1{,}46$, $m_{Sun} = -26{,}7$):
   $$\begin{aligned}
   \Delta m &= -1{,}46 - (-26{,}7) = 25{,}24 \\
   \frac{F_{Sun}}{F_{Sirius}} &= 10^{0{,}4 \times 25{,}24} = 10^{10{,}10} \approx 1{,}26 \times 10^{10}
   \end{aligned}$$
   → Mặt Trời sáng hơn Sirius (nhìn từ Trái Đất) khoảng **13 tỉ lần**. (Hợp lý: Mặt Trời ở ngay cạnh ta.)

4. **Hai sao chênh 2,5 cấp.** $\Delta m = 2{,}5$:
   $$\frac{F_1}{F_2} = 10^{-0{,}4 \times 2{,}5} = 10^{-1} = 0{,}1$$
   → chênh 2,5 cấp = đúng **10 lần** độ sáng. (Mẹo nhớ: 2,5 cấp ↔ ×10.)

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao là 2,5 mà không phải số tròn?"* — Vì người ta *chốt* "5 cấp = 100 lần" trước (để khớp thang cổ của Hipparchus), rồi giải ra hệ số $2{,}5 = \dfrac{5}{\log_{10}(100)} = \dfrac{5}{2}$. Con số $2{,}5$ là hệ quả, không phải chọn tùy ý.
> - *"log cơ số mấy?"* — Cơ số 10 ($\log_{10}$). Trong công thức Pogson luôn là log thập phân.

> ⚠ **Lỗi thường gặp.** Quên dấu trừ → ra kết quả ngược (sáng thành mờ). Cách kiểm tra nhanh: sao sáng hơn phải có m **nhỏ hơn**; nếu phép tính cho ngược, bạn quên dấu $-$.

> 🔁 **Dừng lại tự kiểm tra.** Hai sao chênh 10 cấp. Tỉ số độ sáng bằng bao nhiêu?
> <details><summary>Đáp án</summary>10 cấp = 2 lần "bậc 5 cấp" $= 100 \times 100 = 10000$ lần. Hoặc: $\dfrac{F_1}{F_2} = 10^{0{,}4 \times 10} = 10^4 = 10000$.</details>

---

## 3. Độ trưng vs Flux & định luật nghịch đảo bình phương

> 💡 **Trực giác.** Một bóng đèn 100 W tỏa cùng một công suất, nhưng đứng xa thì *trông mờ hơn*. Ánh sáng trải ra trên một mặt cầu ngày càng to: bán kính gấp đôi → diện tích cầu gấp 4 → mỗi m² nhận 1/4 ánh sáng. Đó là **nghịch đảo bình phương**.

**Hai khái niệm phải tách bạch:**

- **Độ trưng L (luminosity)** — tổng công suất sao phát ra ($\text{W}$). **Thuộc tính nội tại** của sao, không đổi theo khoảng cách. (Đã gặp ở Lesson 01: $L = 4\pi R^2 \sigma T^4$.)
- **Flux F (độ rọi)** — năng lượng nhận được trên mỗi $\text{m}^2$ tại Trái Đất ($\text{W/m}^2$). **Phụ thuộc khoảng cách**: sao càng xa, F càng nhỏ.

> 📐 **Định luật nghịch đảo bình phương:**
> $$F = \frac{L}{4\pi d^2}$$
>
> với $d$ là khoảng cách tới sao. Hệ quả: $F \propto \dfrac{1}{d^2}$.

**Walk-through số thật (verify):**

Mặt Trời $L_\odot = 3{,}83 \times 10^{26} \ \text{W}$, khoảng cách $d = 1{,}496 \times 10^{11} \ \text{m}$ (1 AU):
$$\begin{aligned}
F &= \frac{3{,}83 \times 10^{26}}{4\pi \times (1{,}496 \times 10^{11})^2} \\
  &= \frac{3{,}83 \times 10^{26}}{4\pi \times 2{,}238 \times 10^{22}} \\
  &= \frac{3{,}83 \times 10^{26}}{2{,}812 \times 10^{23}} \approx 1362 \ \text{W/m}^2
\end{aligned}$$
→ khớp với **hằng số Mặt Trời ~1361 W/m²** (năng lượng tới đỉnh khí quyển Trái Đất) ✓.

**4 ví dụ về nghịch đảo bình phương:**

| d (so với gốc) | F (so với gốc) |
|---|---|
| ×1 | ×1 |
| ×2 | ×1/4 |
| ×3 | ×1/9 |
| ×10 | ×1/100 |

> 📌 **Liên hệ với cấp tuyệt đối M:** **Cấp sao tuyệt đối M** là cấp sao biểu kiến mà sao *sẽ có nếu đặt nó ở khoảng cách chuẩn 10 parsec*. Nó đo độ sáng **nội tại** (giống L), tách khỏi hiệu ứng khoảng cách. Công thức module khoảng cách:
> $$m - M = 5\log_{10}(d) - 5 \quad (d \text{ tính bằng parsec})$$

> ❓ **Câu hỏi tự nhiên.**
> - *"Sao trông sáng tức là sao mạnh?"* — **Không nhất thiết.** Sao có thể trông sáng vì *gần* (m nhỏ) hoặc vì *thực sự mạnh* (L lớn). Sirius trông là sao sáng nhất đêm phần lớn vì nó **gần** ($8{,}6$ ly), không phải vì mạnh nhất. M tách hai nguyên nhân đó.
> - *"Mặt Trời cấp tuyệt đối bao nhiêu?"* — $M_{Sun} \approx +4{,}83$. Nghĩa là nếu đặt Mặt Trời ở 10 pc, nó chỉ là một sao mờ nhạt mắt thường vừa thấy — Mặt Trời thực ra là sao khá tầm thường.

> 🔁 **Dừng lại tự kiểm tra.** Một sao bị dời ra xa gấp 5 lần. Flux nhận được thay đổi thế nào?
> <details><summary>Đáp án</summary>$F \propto \dfrac{1}{d^2}$ nên xa gấp 5 → flux giảm $\dfrac{1}{5^2} = \dfrac{1}{25}$ lần (chỉ còn 4%). Sao trông mờ đi nhiều.</details>

---

## 4. Đo khoảng cách bằng thị sai (Parallax)

> 💡 **Trực giác.** Giơ ngón tay trước mặt, nhắm luân phiên mắt trái/phải: ngón tay "nhảy" so với nền xa. Ngón càng gần, nó nhảy càng nhiều. Trái Đất quay quanh Mặt Trời tạo ra "hai mắt" cách nhau 2 AU (đường kính quỹ đạo) → sao gần "nhảy" nhiều hơn sao xa. Đo góc nhảy → suy khoảng cách.

**Định nghĩa (3 phần):**

- **(a) Là gì** — **Thị sai (parallax) p** là nửa góc dịch chuyển biểu kiến của một sao khi Trái Đất đi từ một đầu quỹ đạo sang đầu kia (cách nhau 6 tháng). Đo bằng **giây cung (arcsecond, ")**.
- **(b) Vì sao cần** — Đây là cách **trực tiếp**, không cần giả định gì, để đo khoảng cách tới sao gần — nền tảng của cả "thang khoảng cách vũ trụ". Sao càng xa, p càng nhỏ → có giới hạn (vệ tinh Gaia đo được tới ~vài nghìn pc).
- **(c) Ví dụ trực giác bằng số** — Sao gần nhất Proxima Centauri có $p = 0{,}769''$ → $d = \dfrac{1}{0{,}769} = 1{,}30 \ \text{pc}$. Không có sao nào có $p \geq 1''$ (tức không sao nào gần hơn 1 pc).

> 📐 **Công thức thị sai:** $d \ [\text{pc}] = \dfrac{1}{p \ ['']}$.
>
> Đây là *định nghĩa* của parsec: khoảng cách mà tại đó 1 AU chắn một góc đúng 1 giây cung. (Hình học: $\tan p = \dfrac{1 \ \text{AU}}{d}$; với p rất nhỏ, $p \ [\text{rad}] \approx \dfrac{1 \ \text{AU}}{d}$, rút gọn thành $d \ [\text{pc}] = \dfrac{1}{p \ ['']}$.)

**Walk-through số thật (verify):**

1. $p = 0{,}1''$:
   $$d = \frac{1}{0{,}1} = 10 \ \text{pc} = 32{,}6 \ \text{ly}$$
   Verify ngược: ở 10 pc, 1 AU chắn $p = \dfrac{1}{10} = 0{,}1''$ ✓.

2. **$p = 0{,}769''$ (Proxima):** $d = \dfrac{1}{0{,}769} = 1{,}30 \ \text{pc} = 4{,}24 \ \text{ly}$ — đúng khoảng cách đã biết tới sao gần nhất ✓.

3. **$p = 0{,}379''$ (Sirius):** $d = \dfrac{1}{0{,}379} = 2{,}64 \ \text{pc} = 8{,}6 \ \text{ly}$ — khớp giá trị quan trắc ✓.

4. **$p = 0{,}001''$ (sao xa):** $d = \dfrac{1}{0{,}001} = 1000 \ \text{pc} = 3260 \ \text{ly}$. Góc cực nhỏ → cần vệ tinh chính xác cao.

> 📏 **Đơn vị khoảng cách:**
> - **Năm ánh sáng (light-year, ly)** = quãng đường ánh sáng đi trong 1 năm $\approx 9{,}46 \times 10^{12} \ \text{km}$.
> - **Parsec (pc)** $= 3{,}26 \ \text{ly} \approx 3{,}086 \times 10^{13} \ \text{km}$. Thiên văn học chuyên nghiệp dùng pc vì gắn trực tiếp với phép đo thị sai ($d = \dfrac{1}{p}$), không cần đổi.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao không đo khoảng cách bằng thước hay radar?"* — Sao quá xa, radar/laser vô dụng. Thị sai là hình học thuần túy, chỉ cần đo góc — phép đo khoảng cách *trực tiếp* duy nhất tới sao.
> - *"Vì sao parallax có giới hạn?"* — Sao càng xa, $p$ càng nhỏ, tới mức nhỏ hơn sai số đo góc thì vô dụng. Ngoài tầm parallax, dùng phương pháp gián tiếp (sao chuẩn, Cepheid — học sau).
> - *"1 AU là gì?"* — Đơn vị thiên văn (astronomical unit) = khoảng cách Trái Đất–Mặt Trời trung bình $\approx 1{,}496 \times 10^8 \ \text{km}$.

> ⚠ **Lỗi thường gặp.** Quên rằng $p$ phải tính bằng **giây cung**, không phải độ. $0{,}1^\circ$ rất khác $0{,}1''$ ($1^\circ = 3600''$). Công thức $d = \dfrac{1}{p}$ chỉ đúng với p tính bằng arcsecond.

> 🔁 **Dừng lại tự kiểm tra.** Sao Vega có $p = 0{,}13''$. Khoảng cách bằng bao nhiêu pc và ly?
> <details><summary>Đáp án</summary>$d = \dfrac{1}{0{,}13} = 7{,}7 \ \text{pc}$; đổi sang ly: $7{,}7 \times 3{,}26 = 25 \ \text{ly}$. (Vega cách ~25 năm ánh sáng — khớp.)</details>

---

## 5. Tóm tắt

> 📝 **Tóm tắt toàn bài.**
> - **Cấp biểu kiến m**: độ sáng *nhìn từ Trái Đất*; **số nhỏ/âm = sáng**.
> - **Thang logarit**: 5 cấp = 100 lần; mỗi cấp = ×$2{,}512$; $m_1 - m_2 = -2{,}5\log\left(\dfrac{F_1}{F_2}\right)$.
> - **Độ trưng L** (nội tại, không đổi) vs **flux F** (phụ thuộc khoảng cách): $F = \dfrac{L}{4\pi d^2}$, nghịch đảo bình phương.
> - **Cấp tuyệt đối M**: cấp biểu kiến nếu đặt sao ở 10 pc; đo độ sáng nội tại. $m - M = 5\log d - 5$.
> - **Thị sai**: $d \ [\text{pc}] = \dfrac{1}{p \ ['']}$; parsec $= 3{,}26$ ly. Proxima $p = 0{,}769'' \to 1{,}30 \ \text{pc}$.

---

## Bài tập

1. **So sánh độ sáng.** Sao A có $m = 1{,}0$, sao B có $m = 6{,}0$. Tỉ số flux $\dfrac{F_A}{F_B}$ bằng bao nhiêu? Sao nào sáng hơn?

2. **Cấp ↔ tỉ số tổng quát.** Hai sao chênh $\Delta m = 3{,}5$. Tính tỉ số độ sáng.

3. **Nghịch đảo bình phương.** Một sao được dời ra xa gấp 4 lần. (a) Flux thay đổi thế nào? (b) Cấp biểu kiến m thay đổi bao nhiêu đơn vị (mờ đi mấy cấp)?

4. **Thị sai → khoảng cách.** Sao 61 Cygni có $p = 0{,}286''$. Tính khoảng cách theo pc và ly.

5. **Khoảng cách → thị sai.** Một sao cách 50 pc. Thị sai của nó (arcsecond) bằng bao nhiêu?

6. **Module khoảng cách.** Một sao có $m = 7$, $M = 2$. Tính khoảng cách d (pc) bằng công thức $m - M = 5\log d - 5$.

---

## Lời giải chi tiết

### Bài 1 — So sánh độ sáng

$\Delta m = m_A - m_B = 1{,}0 - 6{,}0 = -5{,}0$.
$$\frac{F_A}{F_B} = 10^{-0{,}4 \times \Delta m} = 10^{-0{,}4 \times (-5)} = 10^2 = 100$$
→ Sao **A sáng gấp 100 lần** sao B. (Khớp quy tắc: chênh 5 cấp = 100 lần; A có m nhỏ hơn nên sáng hơn.)

### Bài 2 — Cấp ↔ tỉ số tổng quát

$$\frac{F_1}{F_2} = 10^{-0{,}4 \times (-3{,}5)} = 10^{1{,}4} = 25{,}1$$
(Lấy sao sáng hơn làm tử số.) → chênh 3,5 cấp ⇒ sáng hơn **~25 lần**. Verify: $-2{,}5\log(25{,}1) = -2{,}5 \times 1{,}4 = -3{,}5$ ✓.

### Bài 3 — Nghịch đảo bình phương

**(a)** $F \propto \dfrac{1}{d^2}$; xa gấp 4 → $F \to \dfrac{F}{4^2} = \dfrac{F}{16}$. Flux còn **1/16** (≈ 6,25%).

**(b)** Đổi tỉ số flux $1/16$ sang cấp sao:
$$\Delta m = -2{,}5\log\left(\frac{F_{mới}}{F_{cũ}}\right) = -2{,}5\log\left(\frac{1}{16}\right) = -2{,}5 \times (-1{,}204) = +3{,}01$$
→ sao **mờ đi ~3 cấp** (m tăng thêm ~3). Trực giác: ×16 độ sáng ≈ chênh 3 cấp (vì $2{,}512^3 \approx 15{,}85 \approx 16$).

### Bài 4 — Thị sai → khoảng cách (61 Cygni)

$$d = \frac{1}{p} = \frac{1}{0{,}286} = 3{,}50 \ \text{pc}$$
Đổi sang ly: $3{,}50 \times 3{,}26 = 11{,}4 \ \text{ly}$. (61 Cygni — sao đầu tiên đo được parallax, năm 1838 — cách ~11,4 năm ánh sáng. Khớp.)

### Bài 5 — Khoảng cách → thị sai

Đảo công thức: $p = \dfrac{1}{d} = \dfrac{1}{50} = 0{,}02''$. → thị sai **0,02 giây cung** (rất nhỏ, cần thiết bị tốt).

### Bài 6 — Module khoảng cách

$$\begin{aligned}
m - M &= 5\log d - 5 \\
7 - 2 &= 5\log d - 5 \\
5 &= 5\log d - 5 \\
10 &= 5\log d \\
\log d &= 2 \\
d &= 10^2 = 100 \ \text{pc}
\end{aligned}$$
→ sao cách **100 pc** (≈ 326 ly). Kiểm tra trực giác: $m - M = 5$ đúng nghĩa "ở xa gấp 10 lần khoảng cách chuẩn 10 pc" → $10 \times 10 = 100 \ \text{pc}$ ✓.

---

## Code & Minh họa

- **Visualization tương tác**: [visualization.html](./visualization.html) — gồm:
  - **Mô phỏng thị sai (parallax simulator)**: kéo slider khoảng cách sao; thấy "đường nền 2 AU" → góc thị sai p thay đổi → tính ngay `d = 1/p` (pc + ly). Sao gần "nhảy" nhiều, sao xa "nhảy" ít.
  - **Magnitude calculator**: nhập 2 cấp sao (m₁, m₂) → ra tỉ số flux; hoặc nhập tỉ số flux → ra hiệu cấp. Minh họa "5 cấp = 100 lần".
  - **Inverse-square demo**: kéo khoảng cách → flux giảm theo `1/d²` (biểu diễn bằng độ sáng đĩa sao).

---

## Bài tiếp theo

→ [Lesson 03 — Biểu đồ H-R](../lesson-03-hr-diagram/): xếp các sao theo nhiệt độ (lớp phổ OBAFGKM) và độ trưng để lộ ra cấu trúc ẩn của "dân số" sao. Ta dùng lại **độ trưng L** (Lesson 01) và **cấp tuyệt đối M** (bài này) làm trục đứng.

**Tham khảo chéo:** logarit → [`../../../Math/`](../../../Math/); lượng giác góc nhỏ cho parallax → [`../../../Math/03-Trig-Complex/`](../../../Math/03-Trig-Complex/).
