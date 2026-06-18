// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/01-Foundations/lesson-01-signals-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Tín hiệu là gì? (signals basics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **tín hiệu (signal)** là gì và vì sao xử lý tín hiệu (signal processing) là nền của âm thanh, ảnh, radio, cảm biến và dữ liệu chuỗi thời gian.
- Phân biệt **tín hiệu liên tục (continuous / analog)** và **tín hiệu rời rạc (discrete / digital)**.
- Nắm ba thuộc tính của sóng sin: **biên độ (amplitude) $A$**, **tần số (frequency) $f$** và **tần số góc (angular frequency) $\\omega = 2\\pi f$**, **pha (phase) $\\varphi$** — và công thức $x(t) = A\\sin(2\\pi f t + \\varphi)$.
- Hiểu quan hệ **sin ↔ cos** và biểu diễn **phasor** (số phức $A e^{i\\varphi}$) qua công thức Euler.
- Dùng thang **decibel (dB)** để đo biên độ và hiểu vì sao dùng thang log.
- Nhận diện bốn tín hiệu cơ bản: **xung đơn vị (impulse $\\delta$)**, **bước nhảy (step)**, **sin**, **nhiễu (noise)**.
- Hiểu trực giác máy **lấy mẫu (sampling)** một sóng sin thành dãy số — chuẩn bị cho Lesson 02.

## Kiến thức tiền đề

- [Math/03 — Số phức (complex numbers)](../../../Math/03-Trig-Complex/lesson-05-complex-numbers/) — phần phasor §4 dùng số phức.
- [Math/03 — Dạng cực & công thức Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/) — $e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$ là xương sống của phasor.
- [Physics — Dao động & sóng](../../../Physics/01-Mechanics/lesson-08-oscillation-waves/) — sóng sin xuất phát từ dao động điều hòa.
- (Liên hệ) [Music](../../../Music/) — tần số của các nốt nhạc; bài này giải thích "La = 440 Hz" nghĩa là gì.

---

## 1. Vì sao học xử lý tín hiệu?

### 1.1. Câu hỏi mở đầu — sẽ được giải đáp ngay trong bài

Bạn bấm phím **La** (nốt A4) trên đàn piano. Người ta nói nốt đó có tần số **440 Hz**.

- "440 Hz" nghĩa là gì về mặt vật lý?
- Khi điện thoại **ghi âm** nốt đó, nó lưu cái gì vào file \`.wav\`? File chỉ chứa số — số nào?
- Vì sao "to gấp đôi" lại được người ta gọi là "+6 dB", không phải "+100%"?

Cả ba câu này được trả lời cụ thể trong bài: 440 Hz ở §3, cách máy lưu (lấy mẫu) ở §7, còn dB ở §5.

> 💡 **Trực giác.** Một **tín hiệu** đơn giản là *"một đại lượng thay đổi theo thời gian (hoặc không gian) và mang thông tin"*. Giọng nói là áp suất không khí thay đổi theo thời gian. Ảnh là độ sáng thay đổi theo vị trí. Nhịp tim trên máy ECG là điện thế theo thời gian. Giá cổ phiếu theo ngày cũng là một tín hiệu. **Xử lý tín hiệu** là toán + thuật toán để *lọc, nén, phân tích, nhận dạng* các đại lượng đó.

### 1.2. Tín hiệu ở khắp nơi

| Lĩnh vực | Tín hiệu là gì | Bài toán điển hình |
| --- | --- | --- |
| **Âm thanh** | áp suất không khí $p(t)$ | nén MP3, lọc nhiễu, nhận dạng giọng nói |
| **Ảnh** | độ sáng $I(x, y)$ theo vị trí | làm nét, nén JPEG, phát hiện cạnh |
| **Radio / 5G** | điện áp ăng-ten theo $t$ | điều chế, giải mã, chống nhiễu |
| **Cảm biến (IoT)** | nhiệt độ, gia tốc theo $t$ | phát hiện rung bất thường ở máy móc |
| **Chuỗi thời gian** | doanh thu, nhịp tim theo $t$ | dự báo, phát hiện chu kỳ |

Điểm chung: tất cả đều là **hàm số theo một biến** (thường là thời gian $t$). Học xử lý tín hiệu một lần là dùng được cho mọi lĩnh vực trên — đó là lý do nó đáng học.

### 1.3. Vì sao bắt đầu từ sóng sin?

Vì một kết quả nền tảng (sẽ học kỹ ở các bài Fourier sau): **mọi tín hiệu — dù phức tạp đến đâu — đều phân tích được thành tổng các sóng sin** với tần số khác nhau. Sin là "viên gạch" của mọi tín hiệu. Hiểu một sóng sin → hiểu được khối xây dựng của tất cả.

> 📝 **Tóm tắt mục 1.**
> - Tín hiệu = đại lượng thay đổi theo thời gian/không gian, mang thông tin.
> - Âm thanh, ảnh, radio, cảm biến, chuỗi thời gian đều là tín hiệu → một bộ công cụ dùng chung.
> - Sóng sin là viên gạch cơ bản: mọi tín hiệu = tổng các sin (sẽ chứng minh ở phần Fourier).

---

## 2. Tín hiệu liên tục vs rời rạc

### 2.1. Tín hiệu liên tục (continuous / analog)

> 💡 **Trực giác.** Hãy hình dung một sợi dây vẽ liền nét trên giấy: ở **mọi** thời điểm $t$ — kể cả $t = 1{,}0000001$ giây — đều có một giá trị. Không có "khoảng trống" giữa các điểm.

- **(a) Là gì.** Tín hiệu liên tục là hàm $x(t)$ với biến $t \\in \\mathbb{R}$ (thời gian thực, vô số điểm) và giá trị $x(t) \\in \\mathbb{R}$ cũng liên tục. Viết là $x(t)$, $t$ trong ngoặc tròn.
- **(b) Vì sao tồn tại / vì sao cần.** Vì thế giới vật lý vốn liên tục: áp suất không khí, điện áp, nhiệt độ thay đổi mượt mà, không nhảy bậc. Mô hình liên tục cho phép dùng giải tích (đạo hàm, tích phân) để phân tích.
- **(c) Ví dụ số.** $x(t) = 3\\sin(2\\pi \\cdot 5 \\cdot t)$. Tại $t = 0{,}05$ s: $x = 3\\sin(2\\pi \\cdot 5 \\cdot 0{,}05) = 3\\sin(0{,}5\\pi) = 3 \\cdot 1 = 3$. Tại $t = 0{,}1$ s: $x = 3\\sin(\\pi) = 0$. Hai điểm này cùng nằm trên một đường cong liền nét.

### 2.2. Tín hiệu rời rạc (discrete / digital)

> 💡 **Trực giác.** Bây giờ hình dung bạn chỉ chấm vài chấm cách đều nhau trên cùng sợi dây đó — ví dụ mỗi 0,01 giây một chấm. Giữa hai chấm, máy tính "không biết gì". Đó là tín hiệu rời rạc: một **dãy số**.

- **(a) Là gì.** Tín hiệu rời rạc là dãy $x[n]$ với chỉ số $n \\in \\mathbb{Z}$ (số nguyên: $0, 1, 2, \\ldots$). Viết là $x[n]$, $n$ trong ngoặc **vuông** — quy ước phân biệt với liên tục.
- **(b) Vì sao cần.** Vì máy tính **không lưu được vô số điểm**. Nó chỉ đo giá trị tại các thời điểm cách đều ("lấy mẫu") rồi lưu dãy hữu hạn số. Mọi tín hiệu trong máy tính, file âm thanh, ảnh số đều là rời rạc.
- **(c) Ví dụ số.** Lấy mẫu $x(t) = 3\\sin(2\\pi \\cdot 5 \\cdot t)$ mỗi $T_s = 0{,}05$ s (tức $n$ ứng với $t = 0{,}05 n$):
  - $x[0] = 3\\sin(0) = 0$
  - $x[1] = 3\\sin(2\\pi \\cdot 5 \\cdot 0{,}05) = 3\\sin(0{,}5\\pi) = 3$
  - $x[2] = 3\\sin(\\pi) = 0$
  - $x[3] = 3\\sin(1{,}5\\pi) = -3$
  → dãy $\\{0, 3, 0, -3, 0, 3, \\ldots\\}$. **Đây chính là cái file \`.wav\` lưu**: một danh sách số nguyên/thực.

### 2.3. Bốn ví dụ phân loại

| Tín hiệu | Liên tục hay rời rạc? | Vì sao |
| --- | --- | --- |
| Áp suất âm thanh trong không khí | **Liên tục** | đại lượng vật lý, mọi $t$ đều có giá trị |
| File \`song.mp3\` đã giải nén | **Rời rạc** | dãy 44 100 mẫu/giây |
| Nhiệt độ phòng "thật" | **Liên tục** | biến đổi mượt theo $t$ |
| Log nhiệt độ cảm biến ghi mỗi phút | **Rời rạc** | chỉ có giá trị tại $t = 0, 60, 120, \\ldots$ s |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Lấy mẫu thưa quá thì sao?"* — Mất thông tin, thậm chí gây hiện tượng **aliasing** (sóng cao "giả dạng" sóng thấp). Có một tần số tối thiểu phải lấy mẫu — đó là **định lý Nyquist**, học ở [Lesson 02](../lesson-02-sampling-nyquist/).
> - *"Ngoặc tròn \`()\` vs ngoặc vuông \`[]\` quan trọng không?"* — Có, đây là quy ước chuẩn ngành: $x(t)$ là liên tục, $x[n]$ là rời rạc. Nhầm hai cái sẽ làm sai công thức.

> 🔁 **Dừng lại tự kiểm tra.** Một micro thu giọng nói. Tín hiệu *trong không khí* là gì, tín hiệu *trong file* là gì?
> <details><summary>Đáp án</summary>
> Trong không khí: **liên tục** (áp suất $p(t)$, mọi $t$ có giá trị). Trong file: **rời rạc** (dãy $p[n]$ — micro + ADC đã lấy mẫu). Bước biến liên tục → rời rạc gọi là **analog-to-digital conversion (ADC)**, gồm lấy mẫu + lượng tử hóa.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Liên tục $x(t)$: $t$ thực, vô số điểm — mô tả thế giới vật lý.
> - Rời rạc $x[n]$: $n$ nguyên, dãy hữu hạn số — cái máy tính thực sự lưu.
> - File âm thanh = tín hiệu rời rạc; chuyển từ liên tục sang rời rạc là **lấy mẫu** (Lesson 02).

---

## 3. Ba thuộc tính của sóng sin

Sóng sin tổng quát:

$$x(t) = A\\sin(2\\pi f t + \\varphi)$$

Ba con số $A$, $f$, $\\varphi$ xác định **hoàn toàn** một sóng sin. Ta đi từng cái.

### 3.1. Biên độ $A$ (amplitude)

> 💡 **Trực giác.** $A$ là "độ cao tối đa" của sóng so với trục giữa — sóng dao động trong khoảng $[-A, +A]$. Với âm thanh, $A$ lớn = to; với ánh sáng, $A$ lớn = sáng.

- **(a) Là gì.** Giá trị lớn nhất mà $|x(t)|$ đạt tới (vì $\\sin$ chạy từ $-1$ tới $1$, nên $x$ chạy từ $-A$ tới $A$).
- **(b) Vì sao cần.** Để đo "cường độ" của tín hiệu, tách riêng khỏi tần số và pha.
- **(c) Ví dụ số.** Với $x(t) = 5\\sin(\\ldots)$: đỉnh là $+5$, đáy là $-5$. Với $A = 0{,}2$: dao động nhỏ trong $[-0{,}2; 0{,}2]$.

### 3.2. Tần số $f$ (Hz) và tần số góc $\\omega = 2\\pi f$

> 💡 **Trực giác.** $f$ là *"sóng lặp lại bao nhiêu lần trong 1 giây"*. 440 Hz = sóng dao động đủ một vòng (lên-xuống-về chỗ cũ) **440 lần mỗi giây**. Đó chính là câu trả lời cho "La = 440 Hz".

- **(a) Là gì.** Tần số $f$ đo bằng **hertz (Hz)** = số chu kỳ trong 1 giây. **Chu kỳ (period)** $T = 1/f$ = thời gian một chu kỳ. **Tần số góc** $\\omega = 2\\pi f$ (đơn vị rad/s) = tốc độ quay tính theo radian; có vì hàm $\\sin$ nhận góc theo radian, mà một chu kỳ là $2\\pi$ rad.
- **(b) Vì sao cần $\\omega$ riêng?** Vì viết $\\sin(\\omega t)$ gọn hơn $\\sin(2\\pi f t)$, và $\\omega$ khớp trực tiếp với góc của phasor quay (§4). Hai cách viết tương đương: $\\sin(2\\pi f t) = \\sin(\\omega t)$.
- **(c) Ví dụ số.**
  - $f = 440$ Hz → $T = 1/440 \\approx 0{,}00227$ s = 2,27 ms một chu kỳ; $\\omega = 2\\pi \\cdot 440 \\approx 2764{,}6$ rad/s.
  - $f = 1$ Hz → $T = 1$ s; $\\omega = 2\\pi \\approx 6{,}283$ rad/s.
  - $f = 50$ Hz (điện lưới) → $T = 0{,}02$ s = 20 ms; $\\omega \\approx 314{,}16$ rad/s.
  - $f = 0{,}5$ Hz → $T = 2$ s (chậm, nửa chu kỳ mỗi giây).

> ⚠ **Lỗi thường gặp.** Quên nhân $2\\pi$. Viết $\\sin(f t)$ thay vì $\\sin(2\\pi f t)$ → tần số sai đi $2\\pi \\approx 6{,}28$ lần. Nhớ: bên trong $\\sin$ là **góc theo radian**, không phải số chu kỳ. Một chu kỳ trọn vẹn = góc $2\\pi$, nên hệ số là $2\\pi f$.

### 3.3. Pha $\\varphi$ (phase)

> 💡 **Trực giác.** $\\varphi$ là "sóng bắt đầu ở đâu" tại $t = 0$ — như thể đẩy toàn bộ sóng sang trái/phải theo trục thời gian. Hai sóng cùng $A$, cùng $f$ nhưng lệch pha là hai sóng "không khớp nhịp".

- **(a) Là gì.** Góc cộng thêm (radian) bên trong $\\sin$, quyết định giá trị tại $t = 0$: $x(0) = A\\sin(\\varphi)$.
- **(b) Vì sao cần.** Để mô tả độ lệch thời gian giữa hai sóng cùng tần số (vd hai loa lệch nhau → có thể triệt tiêu nhau). Pha là chìa khóa cho giao thoa, lọc, và biểu diễn phasor.
- **(c) Ví dụ số (cùng $A = 2$, $f = 1$ Hz, xét tại $t = 0$):**
  - $\\varphi = 0$: $x(0) = 2\\sin(0) = 0$ (bắt đầu từ giữa, đi lên).
  - $\\varphi = \\pi/2$: $x(0) = 2\\sin(\\pi/2) = 2$ (bắt đầu ở đỉnh) — đây đúng bằng $2\\cos(2\\pi t)$.
  - $\\varphi = \\pi$: $x(0) = 2\\sin(\\pi) = 0$ (bắt đầu giữa, nhưng đi **xuống**).
  - $\\varphi = -\\pi/2$: $x(0) = 2\\sin(-\\pi/2) = -2$ (bắt đầu ở đáy).

### 3.4. Walk-through: tính $x(t)$ tại điểm cụ thể

Cho $x(t) = 4\\sin\\!\\big(2\\pi \\cdot 2 \\cdot t + \\tfrac{\\pi}{6}\\big)$ ($A = 4$, $f = 2$ Hz, $\\varphi = \\pi/6$). Tính tại bốn điểm:

| $t$ (s) | Góc $2\\pi f t + \\varphi$ (rad) | $\\sin(\\cdot)$ | $x(t) = 4\\sin(\\cdot)$ |
| --- | --- | --- | --- |
| $0$ | $\\tfrac{\\pi}{6} \\approx 0{,}524$ | $0{,}5$ | $2{,}0$ |
| $0{,}125$ | $2\\pi \\cdot 2 \\cdot 0{,}125 + \\tfrac{\\pi}{6} = \\tfrac{\\pi}{2} + \\tfrac{\\pi}{6} = \\tfrac{2\\pi}{3} \\approx 2{,}094$ | $0{,}866$ | $3{,}46$ |
| $0{,}25$ | $\\pi + \\tfrac{\\pi}{6} = \\tfrac{7\\pi}{6} \\approx 3{,}665$ | $-0{,}5$ | $-2{,}0$ |
| $0{,}5$ | $2\\pi + \\tfrac{\\pi}{6} = \\tfrac{13\\pi}{6} \\approx 6{,}807$ | $0{,}5$ | $2{,}0$ |

Kiểm tra: $T = 1/f = 0{,}5$ s, nên $x(0) = x(0{,}5)$ ✓ (sóng lặp đúng sau một chu kỳ).

> 🔁 **Dừng lại tự kiểm tra.** Sóng $x(t) = 10\\sin(2\\pi \\cdot 100 t)$ có chu kỳ bao nhiêu? Tại $t = 0{,}0025$ s giá trị là?
> <details><summary>Đáp án</summary>
> $T = 1/100 = 0{,}01$ s. Góc $= 2\\pi \\cdot 100 \\cdot 0{,}0025 = 0{,}5\\pi$, $\\sin(0{,}5\\pi) = 1 \\Rightarrow x = 10$ (đúng đỉnh, vì $0{,}0025 = T/4$).
> </details>

> 📝 **Tóm tắt mục 3.**
> - $x(t) = A\\sin(2\\pi f t + \\varphi)$. $A$ = độ cao, $f$ = số chu kỳ/giây (Hz), $\\varphi$ = điểm bắt đầu.
> - $\\omega = 2\\pi f$ (rad/s); $T = 1/f$ (s).
> - 440 Hz = 440 chu kỳ mỗi giây = nốt La chuẩn.
> - Bên trong $\\sin$ là **góc radian** → luôn có hệ số $2\\pi$.

---

## 4. Sin, cos và phasor (số phức $A e^{i\\varphi}$)

### 4.1. Quan hệ sin ↔ cos

cos chỉ là sin dịch pha $\\pi/2$:

$$\\cos\\theta = \\sin\\!\\Big(\\theta + \\tfrac{\\pi}{2}\\Big), \\qquad \\sin\\theta = \\cos\\!\\Big(\\theta - \\tfrac{\\pi}{2}\\Big)$$

Nên dùng sin hay cos chỉ là quy ước về pha. Trong xử lý tín hiệu, **cos** thường tiện hơn vì khớp với phần thực của số phức (xem dưới).

### 4.2. Phasor — vì sao biểu diễn sóng bằng số phức?

> 💡 **Trực giác.** Hình dung một cây kim đồng hồ dài $A$, quay đều ngược chiều kim đồng hồ với tốc độ $\\omega$ rad/s, xuất phát lệch một góc $\\varphi$. **Bóng (hình chiếu) của đầu kim xuống trục ngang vẽ ra đúng một sóng cos; xuống trục dọc vẽ ra một sóng sin.** Cây kim quay đó chính là **phasor**.

Theo công thức Euler (đã học ở [Math/03 Lesson 06](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/)):

$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$

Một sóng cos là **phần thực** của số phức quay:

$$A\\cos(\\omega t + \\varphi) = \\operatorname{Re}\\big\\{A e^{i(\\omega t + \\varphi)}\\big\\} = \\operatorname{Re}\\big\\{\\underbrace{A e^{i\\varphi}}_{\\text{phasor}} \\cdot e^{i\\omega t}\\big\\}$$

Số phức cố định $X = A e^{i\\varphi}$ (không phụ thuộc $t$) gói gọn **biên độ + pha** vào một con số duy nhất — đó là **phasor**. Phần $e^{i\\omega t}$ là chuyển động quay chung cho mọi sóng cùng tần số, nên thường được "ẩn đi". Cộng hai sóng cùng tần số trở thành **cộng hai số phức** — đơn giản hơn nhiều so với cộng hai hàm lượng giác.

### 4.3. Walk-through: chuyển sin ↔ phasor

**Chiều thuận (sóng → phasor).** Cho $x(t) = 3\\cos(\\omega t + \\tfrac{\\pi}{3})$.
- Biên độ $A = 3$, pha $\\varphi = \\pi/3 = 60°$.
- Phasor: $X = 3 e^{i\\pi/3} = 3\\big(\\cos 60° + i\\sin 60°\\big) = 3\\big(0{,}5 + i \\cdot 0{,}866\\big) = 1{,}5 + 2{,}598\\,i$.

**Chiều ngược (phasor → sóng).** Cho phasor $X = 4 + 4i$ ở tần số $f = 10$ Hz.
- Biên độ $A = |X| = \\sqrt{4^2 + 4^2} = \\sqrt{32} = 4\\sqrt{2} \\approx 5{,}657$.
- Pha $\\varphi = \\operatorname{atan2}(4, 4) = \\pi/4 = 45°$.
- Sóng: $x(t) = 5{,}657\\cos\\!\\big(2\\pi \\cdot 10 \\cdot t + \\tfrac{\\pi}{4}\\big)$.

**Bốn ví dụ phasor (chuyển qua lại):**

| Sóng $A\\cos(\\omega t + \\varphi)$ | Phasor $A e^{i\\varphi}$ | Dạng $a + bi$ |
| --- | --- | --- |
| $2\\cos(\\omega t)$ | $2 e^{i0}$ | $2 + 0i$ |
| $2\\cos(\\omega t + \\tfrac{\\pi}{2})$ | $2 e^{i\\pi/2}$ | $0 + 2i$ |
| $\\cos(\\omega t + \\pi)$ | $1 e^{i\\pi}$ | $-1 + 0i$ |
| $\\sqrt{2}\\cos(\\omega t + \\tfrac{\\pi}{4})$ | $\\sqrt{2}\\,e^{i\\pi/4}$ | $1 + 1i$ |

> ⚠ **Lỗi thường gặp.** Dùng $\\arctan(b/a)$ thay vì \`atan2(b, a)\`. $\\arctan$ không phân biệt được góc ở quý II/III: phasor $-1 - i$ và $1 + i$ cho cùng tỉ số $b/a = 1$ nhưng pha lệch nhau $\\pi$. Luôn dùng \`atan2(b, a)\` để lấy đúng góc trong $(-\\pi, \\pi]$.

> 🔁 **Dừng lại tự kiểm tra.** Phasor của $5\\cos(\\omega t - \\tfrac{\\pi}{2})$ ở dạng $a + bi$ là gì? (Gợi ý: $-\\pi/2$ là góc chỉ xuống dưới.)
> <details><summary>Đáp án</summary>
> $5 e^{-i\\pi/2} = 5(\\cos(-90°) + i\\sin(-90°)) = 5(0 - i) = 0 - 5i$. Mà $\\cos(\\omega t - \\tfrac{\\pi}{2}) = \\sin(\\omega t)$, nên đây cũng là phasor của $5\\sin(\\omega t)$ — khớp với "sin = phần ảo".
> </details>

> 📝 **Tóm tắt mục 4.**
> - $\\cos\\theta = \\sin(\\theta + \\tfrac{\\pi}{2})$ — sin và cos chỉ lệch pha $\\pi/2$.
> - Euler: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ → sóng = phần thực của số phức quay.
> - Phasor $A e^{i\\varphi}$ gói biên độ + pha vào một số phức; cộng sóng cùng tần số = cộng số phức.
> - Lấy pha bằng \`atan2(b, a)\`, không dùng \`arctan\`.

---

## 5. Thang decibel (dB)

### 5.1. Định nghĩa và vì sao dùng log

> 💡 **Trực giác.** Tai người nghe theo kiểu **nhân**, không phải cộng: từ tiếng thì thầm tới tiếng máy bay, biên độ chênh nhau hàng **triệu lần**. Nếu vẽ trên trục thẳng, tiếng thì thầm gần như dính trục 0. Thang **log** "ép" dải khổng lồ đó về vài chục đơn vị dễ đọc — giống cách Richter đo động đất.

- **(a) Là gì.** Với biên độ (amplitude / điện áp / áp suất), decibel định nghĩa:
  $$L_{\\text{dB}} = 20 \\log_{10}\\!\\frac{A}{A_{\\text{ref}}}$$
  Nó đo **tỉ số** giữa biên độ $A$ và một mốc tham chiếu $A_{\\text{ref}}$, biểu diễn trên thang log.
- **(b) Vì sao cần / vì sao hệ số 20.** Vì biên độ trải dài nhiều bậc độ lớn; log nén lại. Hệ số là **20** (không phải 10) khi đại lượng là biên độ, vì **công suất $\\propto A^2$** và dB gốc định nghĩa theo công suất: $10\\log_{10}(P/P_{\\text{ref}}) = 10\\log_{10}(A^2/A_{\\text{ref}}^2) = 20\\log_{10}(A/A_{\\text{ref}})$.
- **(c) Ví dụ số.** $A = A_{\\text{ref}}$ → $20\\log_{10}(1) = 0$ dB (bằng mốc). $A = 10 A_{\\text{ref}}$ → $20\\log_{10}(10) = 20$ dB.

### 5.2. Bốn ví dụ số (quy luật cần thuộc)

| Tỉ số $A/A_{\\text{ref}}$ | $20\\log_{10}(\\cdot)$ | Kết quả dB | Ghi nhớ |
| --- | --- | --- | --- |
| $2$ (gấp đôi) | $20\\log_{10} 2 = 20 \\cdot 0{,}301$ | $\\approx +6{,}02$ dB | **gấp đôi biên độ ≈ +6 dB** |
| $10$ (gấp 10) | $20\\log_{10} 10 = 20 \\cdot 1$ | $+20$ dB | **×10 = +20 dB** |
| $0{,}5$ (một nửa) | $20\\log_{10} 0{,}5 = 20 \\cdot (-0{,}301)$ | $\\approx -6{,}02$ dB | nửa biên độ ≈ −6 dB |
| $\\sqrt{2} \\approx 1{,}414$ | $20\\log_{10}\\sqrt{2} = 10\\log_{10} 2$ | $\\approx +3{,}01$ dB | **×√2 = +3 dB** (gấp đôi công suất) |

Quy luật cộng: dB **cộng dồn** khi biên độ **nhân**. Gấp 4 lần = gấp đôi rồi gấp đôi = $+6 + 6 = +12$ dB ✓ (kiểm: $20\\log_{10}4 = 20 \\cdot 0{,}602 = 12{,}04$).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"dB có thể âm không?"* — Có. Biên độ nhỏ hơn mốc → log âm → dB âm. Vd $-40$ dB nghĩa là biên độ chỉ bằng $10^{-2} = 1/100$ mốc.
> - *"Khi nào 10·log, khi nào 20·log?"* — **20·log** cho biên độ (điện áp, áp suất, amplitude); **10·log** cho công suất / năng lượng. Vì $P \\propto A^2$, hai cách cho cùng số dB.
> - *"0 dB nghĩa là im lặng?"* — Không. 0 dB nghĩa **bằng đúng mốc tham chiếu**. Im lặng tuyệt đối là $-\\infty$ dB (vì $\\log 0 = -\\infty$).

> 🔁 **Dừng lại tự kiểm tra.** Tăng âm lượng từ biên độ 1 lên biên độ 8 là tăng bao nhiêu dB?
> <details><summary>Đáp án</summary>
> $20\\log_{10} 8 = 20\\log_{10} 2^3 = 3 \\cdot 20\\log_{10} 2 \\approx 3 \\cdot 6{,}02 = +18{,}06$ dB. (Gấp đôi 3 lần = +6 dB × 3.)
> </details>

> 📝 **Tóm tắt mục 5.**
> - $L_{\\text{dB}} = 20\\log_{10}(A/A_{\\text{ref}})$ cho biên độ; hệ số 20 vì $P \\propto A^2$.
> - Dùng log vì biên độ trải nhiều bậc độ lớn và tai nghe theo kiểu nhân.
> - Thuộc lòng: ×2 ≈ +6 dB, ×√2 ≈ +3 dB, ×10 = +20 dB. dB cộng khi biên độ nhân.

---

## 6. Bốn tín hiệu cơ bản

Bốn "viên gạch" thường gặp khi mô tả và kiểm thử hệ thống xử lý tín hiệu (dạng rời rạc $x[n]$).

### 6.1. Xung đơn vị (unit impulse $\\delta$)

> 💡 **Trực giác.** Một "cú búng tay" tức thời: bằng 1 tại đúng một thời điểm, bằng 0 khắp nơi khác. Như gõ một phát vào trống để nghe trống "trả lời" thế nào.

- **(a) Là gì.** $\\delta[n] = 1$ khi $n = 0$, và $= 0$ khi $n \\neq 0$.
- **(b) Vì sao cần.** Vì mọi tín hiệu rời rạc đều là **tổng các xung dịch chỗ**: $x[n] = \\sum_k x[k]\\,\\delta[n-k]$. Phản ứng của hệ với một xung ("impulse response") xác định toàn bộ hệ tuyến tính.
- **(c) Ví dụ số.** $\\delta[-2]=0,\\ \\delta[0]=1,\\ \\delta[1]=0$. Dãy: $\\ldots, 0, 0, \\mathbf{1}, 0, 0, \\ldots$ (số đậm tại $n=0$).

### 6.2. Bước nhảy đơn vị (unit step)

> 💡 **Trực giác.** Công tắc bật: trước thời điểm 0 thì tắt (0), từ 0 trở đi thì bật (1) và giữ nguyên.

- **(a) Là gì.** $u[n] = 1$ khi $n \\ge 0$, và $= 0$ khi $n < 0$.
- **(b) Vì sao cần.** Mô hình "bật nguồn", "đóng mạch tại $t=0$". Liên hệ với xung: $\\delta[n] = u[n] - u[n-1]$ (xung = sai phân của bước).
- **(c) Ví dụ số.** $u[-1]=0,\\ u[0]=1,\\ u[3]=1$. Dãy: $\\ldots, 0, 0, \\mathbf{1}, 1, 1, \\ldots$

### 6.3. Sin (sinusoid)

- **(a) Là gì.** $x[n] = A\\sin(2\\pi f_0 n + \\varphi)$ — phiên bản rời rạc của §3, $f_0$ là tần số chuẩn hóa (chu kỳ/mẫu).
- **(b) Vì sao cần.** Viên gạch của Fourier; dùng làm tín hiệu thử "thuần một tần số".
- **(c) Ví dụ số.** $A=1, f_0 = 0{,}25$: $x[0]=0,\\ x[1]=\\sin(\\tfrac{\\pi}{2})=1,\\ x[2]=0,\\ x[3]=-1$ (lặp chu kỳ 4 mẫu).

### 6.4. Nhiễu (noise)

- **(a) Là gì.** Dãy giá trị **ngẫu nhiên** không có cấu trúc dự đoán được, vd nhiễu trắng (white noise) mỗi mẫu lấy ngẫu nhiên độc lập.
- **(b) Vì sao cần.** Mọi tín hiệu thật đều lẫn nhiễu (nhiệt, điện, lượng tử hóa). Mô hình nhiễu để thiết kế bộ lọc, đo chất lượng qua **SNR** (signal-to-noise ratio, tính bằng dB — xem §5).
- **(c) Ví dụ số.** Một thể hiện nhiễu trắng: $\\{0{,}12,\\ -0{,}88,\\ 0{,}34,\\ -0{,}05,\\ 0{,}71\\}$ — không có quy luật, trung bình ≈ 0.

> ❓ **Câu hỏi tự nhiên.** *"Xung đơn vị $\\delta[n]$ rời rạc với 'hàm delta Dirac' $\\delta(t)$ liên tục có giống nhau?"* — Cùng tinh thần ("tập trung tại một điểm") nhưng khác bản chất: $\\delta[n]$ là **dãy số bình thường** (giá trị 1 tại 0), còn $\\delta(t)$ liên tục là một **phân bố (distribution)** với $\\int \\delta(t)\\,dt = 1$ chứ không phải giá trị hữu hạn tại một điểm. Bài này chỉ cần bản rời rạc.

> 📝 **Tóm tắt mục 6.**
> - Xung $\\delta[n]$: 1 tại 0, 0 còn lại — viên gạch dựng mọi tín hiệu.
> - Bước $u[n]$: 0 trước, 1 từ 0 trở đi — mô hình "bật". $\\delta = u[n]-u[n-1]$.
> - Sin: tín hiệu thử thuần tần số. Nhiễu: phần ngẫu nhiên cần lọc, đo bằng SNR (dB).

---

## 7. Từ sóng liên tục tới dãy số — preview Lesson 02

Quay lại câu hỏi mở bài: **máy lưu nốt La 440 Hz thế nào?**

Máy **lấy mẫu (sampling)**: đo giá trị sóng đều đặn mỗi $T_s$ giây (tần số lấy mẫu $f_s = 1/T_s$). CD dùng $f_s = 44\\,100$ Hz (44 100 mẫu/giây). Với sóng $x(t) = A\\sin(2\\pi \\cdot 440 \\cdot t)$, mẫu thứ $n$ là:

$$x[n] = x(n T_s) = A\\sin\\!\\Big(2\\pi \\cdot 440 \\cdot \\tfrac{n}{44100}\\Big)$$

→ file \`.wav\` chính là **danh sách các số $x[0], x[1], x[2], \\ldots$** đó. Vậy là cả ba câu hỏi mở bài đã được đóng: 440 Hz (§3), cách lưu (lấy mẫu, ở đây), và dB (§5).

> ❓ **Câu hỏi đặt ra cho bài sau.** Lấy mẫu **thưa** quá thì sao? Có một ngưỡng tần số lấy mẫu tối thiểu — nếu vi phạm, sóng cao "giả dạng" thành sóng thấp (**aliasing**). Đó là **định lý lấy mẫu Nyquist–Shannon**, học ở [Lesson 02 — Lấy mẫu & Nyquist](../lesson-02-sampling-nyquist/): để khôi phục được tín hiệu, phải lấy mẫu với $f_s > 2 f_{\\max}$.

---

## Bài tập

**Bài 1.** Cho $x(t) = 6\\sin\\!\\big(2\\pi \\cdot 4 \\cdot t + \\tfrac{\\pi}{2}\\big)$. Xác định $A$, $f$, $\\omega$, $T$, $\\varphi$ và tính $x(0)$, $x(0{,}0625)$, $x(0{,}125)$.

**Bài 2.** Một sóng có chu kỳ $T = 0{,}004$ s và biên độ 3. Viết $x(t)$ (pha 0). Tần số bao nhiêu Hz? Tần số góc $\\omega$?

**Bài 3.** Phân loại liên tục/rời rạc: (a) điện áp pin đo bằng vôn kế kim, (b) số bước chân/ngày từ smartwatch, (c) sóng radio FM trong không khí, (d) ảnh chụp lưu dạng PNG.

**Bài 4.** Chuyển sang phasor (dạng $a + bi$): (a) $4\\cos(\\omega t)$, (b) $4\\cos(\\omega t + \\tfrac{\\pi}{2})$, (c) $2\\cos(\\omega t - \\tfrac{\\pi}{3})$. Rồi chuyển ngược: phasor $X = -3 + 0i$ → sóng cos.

**Bài 5.** Tính dB: (a) biên độ tăng ×4, (b) biên độ giảm còn 1/10, (c) biên độ ×100, (d) ×2,83 (≈ $2\\sqrt{2}$). Dùng quy luật cộng dB, không bấm máy nếu được.

**Bài 6.** Viết 7 giá trị đầu của xung $\\delta[n]$ và bước $u[n]$ cho $n = -1, 0, 1, 2, 3, 4, 5$. Kiểm chứng $\\delta[n] = u[n] - u[n-1]$ tại $n = 0$ và $n = 1$.

**Bài 7.** Hai sóng cùng tần số: $x_1 = 3\\cos(\\omega t)$ và $x_2 = 4\\cos(\\omega t + \\tfrac{\\pi}{2})$. Dùng phasor, tìm biên độ và pha của tổng $x_1 + x_2$.

## Lời giải chi tiết

### Bài 1

$x(t) = 6\\sin(2\\pi \\cdot 4 t + \\tfrac{\\pi}{2})$.
- $A = 6$; $f = 4$ Hz; $\\omega = 2\\pi f = 8\\pi \\approx 25{,}13$ rad/s; $T = 1/f = 0{,}25$ s; $\\varphi = \\pi/2$.
- $x(0) = 6\\sin(\\tfrac{\\pi}{2}) = 6$.
- $x(0{,}0625)$: góc $= 8\\pi \\cdot 0{,}0625 + \\tfrac{\\pi}{2} = 0{,}5\\pi + 0{,}5\\pi = \\pi$ → $6\\sin\\pi = 0$.
- $x(0{,}125)$: góc $= 8\\pi \\cdot 0{,}125 + \\tfrac{\\pi}{2} = \\pi + 0{,}5\\pi = 1{,}5\\pi$ → $6\\sin(1{,}5\\pi) = -6$.

(Vì $\\varphi = \\pi/2$, sóng này thực ra là $6\\cos(2\\pi \\cdot 4 t)$ — bắt đầu ở đỉnh.)

### Bài 2

$f = 1/T = 1/0{,}004 = 250$ Hz. $\\omega = 2\\pi f = 500\\pi \\approx 1570{,}8$ rad/s. $x(t) = 3\\sin(2\\pi \\cdot 250 \\cdot t) = 3\\sin(500\\pi t)$.

### Bài 3

- (a) **Liên tục** — điện áp là đại lượng vật lý liền nét (kim chỉ liên tục).
- (b) **Rời rạc** — một số nguyên mỗi ngày, dãy theo $n$ = ngày.
- (c) **Liên tục** — sóng điện từ trong không khí, mọi $t$ có giá trị.
- (d) **Rời rạc** — ảnh số là lưới pixel; mỗi pixel một giá trị (rời rạc cả theo vị trí lẫn giá trị).

### Bài 4

- (a) $4\\cos(\\omega t) = 4e^{i0} = 4 + 0i$.
- (b) $4\\cos(\\omega t + \\tfrac{\\pi}{2}) = 4e^{i\\pi/2} = 4(\\cos 90° + i\\sin 90°) = 0 + 4i$.
- (c) $2\\cos(\\omega t - \\tfrac{\\pi}{3}) = 2e^{-i\\pi/3} = 2(\\cos(-60°) + i\\sin(-60°)) = 2(0{,}5 - 0{,}866 i) = 1 - 1{,}732 i$.
- Chiều ngược: $X = -3 + 0i$ → $A = |X| = 3$, $\\varphi = \\operatorname{atan2}(0, -3) = \\pi$ → $x(t) = 3\\cos(\\omega t + \\pi) = -3\\cos(\\omega t)$.

### Bài 5

Dùng ×2 → +6,02 dB; ×10 → +20 dB; ×√2 → +3,01 dB.
- (a) ×4 = ×2×2 → $+6{,}02 \\times 2 = +12{,}04$ dB.
- (b) ×(1/10) → $-20$ dB.
- (c) ×100 = ×10×10 → $+20 + 20 = +40$ dB.
- (d) ×2,83 ≈ ×2×√2 → $+6{,}02 + 3{,}01 = +9{,}03$ dB. (Kiểm: $20\\log_{10} 2{,}83 \\approx 9{,}03$ ✓.)

### Bài 6

| $n$ | $-1$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $\\delta[n]$ | 0 | **1** | 0 | 0 | 0 | 0 | 0 |
| $u[n]$ | 0 | **1** | 1 | 1 | 1 | 1 | 1 |

Kiểm chứng $\\delta[n] = u[n] - u[n-1]$:
- $n=0$: $u[0] - u[-1] = 1 - 0 = 1 = \\delta[0]$ ✓.
- $n=1$: $u[1] - u[0] = 1 - 1 = 0 = \\delta[1]$ ✓.

### Bài 7

Phasor: $X_1 = 3e^{i0} = 3 + 0i$; $X_2 = 4e^{i\\pi/2} = 0 + 4i$.
Tổng: $X = X_1 + X_2 = 3 + 4i$.
- Biên độ $A = |X| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.
- Pha $\\varphi = \\operatorname{atan2}(4, 3) \\approx 0{,}927$ rad $\\approx 53{,}13°$.
- Vậy $x_1 + x_2 = 5\\cos(\\omega t + 0{,}927)$.

Trực giác: cộng hai hàm cos lệch pha trở thành **cộng hai vector** $(3,0)$ và $(0,4)$ → vector $(3,4)$ độ dài 5. Đây là sức mạnh của phasor: phép cộng lượng giác hóa thành phép cộng vector/số phức.

## Tham khảo và bài tiếp theo

- Tiền đề: [Math/03 — Số phức](../../../Math/03-Trig-Complex/lesson-05-complex-numbers/), [Math/03 — Dạng cực & Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/), [Physics — Dao động & sóng](../../../Physics/01-Mechanics/lesson-08-oscillation-waves/).
- Liên hệ: [Music](../../../Music/) — tần số các nốt nhạc (La = 440 Hz, mỗi quãng tám gấp đôi tần số).
- **Bài tiếp theo:** [Lesson 02 — Lấy mẫu & Nyquist](../lesson-02-sampling-nyquist/) — vì sao $f_s > 2 f_{\\max}$, hiện tượng aliasing, và cách khôi phục tín hiệu từ mẫu.
- Minh họa tương tác: [visualization.html](./visualization.html) — Sin builder (slider $A$/$f$/$\\varphi$), Phasor quay đồng bộ sóng, máy tính dB.
`;
