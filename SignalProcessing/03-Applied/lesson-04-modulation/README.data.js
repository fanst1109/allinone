// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/03-Applied/lesson-04-modulation/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 15 — Điều chế (Modulation: AM/FM, số)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao phải điều chế**: tín hiệu băng gốc (tiếng nói vài kHz) không thể truyền xa qua không gian, phải "cõng" lên sóng mang (carrier) tần số cao (MHz, GHz); và vì sao điều chế cho phép nhiều đài chia sẻ cùng một dải phổ.
- Phân biệt **sóng mang (carrier)** và **tín hiệu băng gốc (baseband / message)**.
- Nắm **AM (điều biên — Amplitude Modulation)**: công thức, phổ (sóng mang + 2 dải biên), chỉ số điều chế, hiện tượng overmodulation.
- Nắm **FM (điều tần — Frequency Modulation)**: tần số tức thời, băng thông Carson, so sánh AM vs FM về nhiễu và băng thông.
- Hiểu **giải điều chế (demodulation)**: envelope detector cho AM, nhân lại sóng mang + lọc thông thấp (coherent detection).
- Biết sơ lược **điều chế số**: ASK / FSK / PSK / QAM và biểu đồ chòm sao (constellation).
- Liên hệ ứng dụng: radio, WiFi, 4G/5G, modem.

## Kiến thức tiền đề

- [Tier 1 — L01 Tín hiệu cơ bản](../../01-Foundations/lesson-01-signals-basics/) — biên độ, tần số, pha của sóng sin.
- [Tier 2 — L08 Biến đổi Fourier](../../02-Fourier/lesson-03-fourier-transform/) — **tính chất dịch tần (frequency shifting)**, nền tảng để hiểu vì sao nhân với sóng mang lại dịch phổ.
- [Tier 3 — L01 Lọc số](../lesson-01-digital-filters/) — lọc thông thấp (low-pass) dùng trong khâu giải điều chế.

---

## 1. Vì sao cần điều chế? (đặt vấn đề)

> **Câu hỏi mở bài:** Đài FM phát ở 100 MHz, nhưng tiếng nói con người chỉ trải từ ~300 Hz đến ~3.4 kHz. Vậy *làm sao nhét được tiếng nói vài kHz vào một sóng 100 MHz*? Và tại sao không phát thẳng tiếng nói ra anten mà phải qua bước "điều chế"?

Có **ba lý do cốt lõi**, ta giải đáp ngay tại đây (không để treo):

### 1.1. Kích thước anten

Để bức xạ sóng điện từ hiệu quả, chiều dài anten phải cỡ **một phần tư bước sóng** $\\lambda/4$, với $\\lambda = c / f$ ($c \\approx 3\\times10^8$ m/s).

- Tiếng nói 3 kHz: $\\lambda = \\dfrac{3\\times10^8}{3\\times10^3} = 10^5$ m $= 100$ km → anten $\\lambda/4 = 25$ km. **Không tưởng.**
- Sóng mang 100 MHz: $\\lambda = \\dfrac{3\\times10^8}{10^8} = 3$ m → anten $\\lambda/4 = 0{,}75$ m. **Vừa cái anten xe hơi.**

Dời tiếng nói lên 100 MHz → anten co từ 25 km xuống 0,75 m. Đó là lý do vật lý số một.

### 1.2. Chia sẻ phổ tần (multiplexing)

Nếu mọi đài đều phát thẳng tiếng nói (0–3,4 kHz), tất cả sẽ **chồng lên nhau** trên cùng dải tần → nghe được mỗi mớ hỗn độn. Điều chế dời mỗi đài lên một **sóng mang khác nhau**:

- Đài A: 99,5 MHz · Đài B: 100,1 MHz · Đài C: 102,7 MHz …

Bộ thu chỉ cần lọc quanh tần số đài muốn nghe (frequency-division multiplexing). Đây chính là "vạch số" trên radio.

### 1.3. Truyền xa & ít nhiễu

Sóng tần cao truyền xa hơn, ít suy hao trong môi trường phù hợp, và (với FM) chống nhiễu biên độ tốt hơn.

💡 **Trực giác / Hình dung.** Hãy tưởng tượng tiếng nói là một **kiện hàng nhẹ nhưng cồng kềnh** không tự đi xa được. Sóng mang là **xe tải tốc độ cao**. "Điều chế" = chất kiện hàng lên xe tải. Bên kia, "giải điều chế" = dỡ hàng xuống. Bản thân cái xe (sóng mang thuần) không mang thông tin gì — thông tin nằm ở *cách kiện hàng làm biến đổi chiếc xe* (biến đổi biên độ → AM, biến đổi tốc độ/tần số → FM).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Sóng mang thuần $\\cos(2\\pi f_c t)$ có mang tin không?"* — Không. Một sin thuần chỉ là một vạch phổ tại $f_c$, không chứa thông tin. Phải **làm nó biến thiên theo message** thì mới có tin.
- *"Vậy thông tin nằm ở đâu trong sóng đã điều chế?"* — Nằm ở **các dải biên (sideband)** xuất hiện hai bên $f_c$ (xem §3). Sóng mang chỉ là "cọc neo" tần số.

📝 **Tóm tắt mục 1.** (1) Điều chế dời message từ băng gốc lên tần số cao. (2) Ba lý do: anten ngắn lại, nhiều đài chia sẻ phổ, truyền xa/ít nhiễu. (3) Sóng mang thuần không mang tin — tin nằm ở cách message làm biến đổi sóng mang.

---

## 2. Sóng mang và tín hiệu băng gốc

**Tín hiệu băng gốc (baseband / message)** $x(t)$: tín hiệu gốc cần truyền (tiếng nói, nhạc, dữ liệu). Phổ của nó tập trung quanh DC (0 Hz) tới $f_{max}$ (vd 3,4 kHz cho thoại, 20 kHz cho nhạc).

**Sóng mang (carrier)** $c(t) = A_c \\cos(2\\pi f_c t + \\phi)$: một sin tần số cao $f_c \\gg f_{max}$. Nó có **ba thuộc tính có thể biến đổi**:

| Thuộc tính sóng mang | Biến đổi theo message → kỹ thuật |
|---|---|
| Biên độ $A_c$ | **AM** (Amplitude Modulation) |
| Tần số $f_c$ | **FM** (Frequency Modulation) |
| Pha $\\phi$ | **PM** (Phase Modulation) — họ hàng FM |

→ Mỗi cách "nhúng" message vào một thuộc tính sinh ra một loại điều chế.

📝 **Tóm tắt mục 2.** Message $x(t)$ ở băng gốc, sóng mang $c(t)$ ở tần cao có 3 thuộc tính (biên/tần/pha). Điều chế = cho message điều khiển một trong ba thuộc tính đó.

---

## 3. AM — Điều biên (Amplitude Modulation)

💡 **Trực giác.** Giữ tần số sóng mang **cố định**, chỉ cho **biên độ** của nó phình to / thót lại **theo dạng của message**. Vẽ ra, ta thấy sóng mang dao động nhanh được "bọc" trong một **đường bao (envelope)** chính là hình dạng message. Tai/mạch chỉ cần đọc lại đường bao là khôi phục được message.

### 3.1. Công thức AM (standard / DSB-LC)

$$s(t) = \\big[\\,1 + m\\cdot x(t)\\,\\big]\\cdot A_c\\cos(2\\pi f_c t)$$

Trong đó:

- $x(t)$: message **đã chuẩn hóa** sao cho $|x(t)| \\le 1$ (đỉnh bằng 1).
- $m$: **chỉ số điều chế (modulation index)**, $0 < m \\le 1$. $m$ cho biết biên độ message làm sóng mang "phình" bao nhiêu phần trăm.
- $A_c$: biên độ sóng mang.

Đường bao của $s(t)$ là $A_c[1 + m\\,x(t)]$. Vì $1 + m\\,x(t) > 0$ khi $m \\le 1$, đường bao luôn dương → bám đúng hình dạng $x(t)$. Khi $m > 1$ thì $1 + m\\,x(t)$ có thể âm → đường bao "lật", gây méo (xem §3.4).

### 3.2. Phổ của AM — walk-through từng bước

Đây là phần lõi. Lấy message đơn giản nhất: **một tông** $x(t) = \\cos(2\\pi f_m t)$ (vd $f_m = 5$ kHz). Sóng mang $f_c = 100$ kHz, $A_c = 1$.

$$s(t) = [1 + m\\cos(2\\pi f_m t)]\\cos(2\\pi f_c t)$$

Khai triển:

$$s(t) = \\underbrace{\\cos(2\\pi f_c t)}_{\\text{sóng mang}} \\;+\\; m\\cos(2\\pi f_m t)\\cos(2\\pi f_c t)$$

Dùng công thức tích thành tổng $\\cos a\\cos b = \\tfrac12[\\cos(a-b) + \\cos(a+b)]$:

$$m\\cos(2\\pi f_m t)\\cos(2\\pi f_c t) = \\frac{m}{2}\\cos\\!\\big(2\\pi (f_c - f_m) t\\big) + \\frac{m}{2}\\cos\\!\\big(2\\pi (f_c + f_m) t\\big)$$

Vậy:

$$s(t) = \\cos(2\\pi f_c t) + \\frac{m}{2}\\cos\\big(2\\pi (f_c{-}f_m) t\\big) + \\frac{m}{2}\\cos\\big(2\\pi (f_c{+}f_m) t\\big)$$

**Phổ gồm đúng 3 vạch:**

| Thành phần | Tần số | Biên độ |
|---|---|---|
| Dải biên dưới (LSB) | $f_c - f_m = 95$ kHz | $m/2$ |
| Sóng mang | $f_c = 100$ kHz | $1$ |
| Dải biên trên (USB) | $f_c + f_m = 105$ kHz | $m/2$ |

→ Phép nhân với sóng mang đã **dịch phổ của message** ($\\pm f_m$ quanh DC) lên thành $\\pm f_m$ **quanh $f_c$**. Đây chính là **tính chất dịch tần (frequency shifting)** của biến đổi Fourier — xem [Tier 2 L08](../../02-Fourier/lesson-03-fourier-transform/): nhân với $\\cos(2\\pi f_c t)$ trong miền thời gian = dịch phổ đi $\\pm f_c$ trong miền tần số.

Với message thật trải $0 \\to f_{max}$ (không phải một tông), mỗi tần số $f$ trong message tạo một cặp vạch tại $f_c \\pm f$ → ta được **hai dải biên** liên tục, mỗi dải rộng $f_{max}$, đối xứng quanh $f_c$:

\`\`\`
       LSB          carrier         USB
   ┌────────┐         |         ┌────────┐
───┴────────┴─────────┼─────────┴────────┴───►  f
  fc-fmax    fc-... fc fc+...   fc+fmax
\`\`\`

**Băng thông AM:** $B_{AM} = 2 f_{max}$ (gấp đôi băng gốc, vì có 2 dải biên).

### 3.3. Ví dụ số (≥4)

**Ví dụ 1 — tông đơn, $m = 0{,}5$.** $f_c = 100$ kHz, $f_m = 5$ kHz. Phổ: vạch $100$ kHz biên độ 1; hai vạch $95$ kHz và $105$ kHz biên độ $m/2 = 0{,}25$. Băng thông $= 2\\times 5 = 10$ kHz.

**Ví dụ 2 — tông đơn, $m = 1$ (điều chế tới hạn).** Cùng $f_c, f_m$. Hai dải biên biên độ $m/2 = 0{,}5$ — to nhất có thể mà chưa méo. Đường bao chạm 0 ở đáy nhưng không lật.

**Ví dụ 3 — thoại, $m = 0{,}8$.** $f_c = 1{,}000$ MHz (1 MHz, băng AM thương mại), $f_{max} = 5$ kHz. Hai dải biên: $0{,}995$–$1{,}000$ MHz (LSB) và $1{,}000$–$1{,}005$ MHz (USB). Băng thông $= 2\\times5 = 10$ kHz. Đó là lý do các đài AM cách nhau 10 kHz trên vạch số.

**Ví dụ 4 — nhạc HiFi.** $f_{max} = 15$ kHz → băng thông AM $= 30$ kHz. Rộng hơn → ít đài nhét vừa hơn trong cùng dải phổ. (AM thương mại thường giới hạn audio ~5 kHz để tiết kiệm phổ → âm AM nghe "đục".)

**Ví dụ 5 — hai tông.** $x(t) = 0{,}5\\cos(2\\pi\\cdot 1\\text{k}\\,t) + 0{,}5\\cos(2\\pi\\cdot 4\\text{k}\\,t)$, $f_c = 50$ kHz. Phổ: carrier 50 kHz; cặp $\\pm1$ kHz → 49 & 51 kHz; cặp $\\pm4$ kHz → 46 & 54 kHz. Băng thông $= 2\\times4 = 8$ kHz (do thành phần cao nhất là 4 kHz).

### 3.4. Chỉ số điều chế và overmodulation

Chỉ số $m$ (còn ký hiệu $\\mu$) định nghĩa qua biên độ: $m = \\dfrac{A_{max} - A_{min}}{A_{max} + A_{min}}$ của đường bao.

- $m < 1$: **undermodulation** — dùng chưa hết "tầm", đường bao không chạm 0, công suất dải biên thấp → tỉ số tín/tạp kém.
- $m = 1$: tới hạn, đường bao chạm 0 tại đáy.
- $m > 1$: **overmodulation** — $1 + m\\,x(t)$ chuyển âm tại một số thời điểm → đường bao bị **lật (phase reversal)**. Envelope detector đơn giản đọc $|\\text{bao}|$ sẽ "gập" phần âm lên → message méo nặng + sinh hài tần cao → nhiễu ("splatter") tràn sang đài lân cận.

⚠ **Lỗi thường gặp — overmodulation.** Đẩy $m > 1$ để "to tiếng hơn" là sai lầm kinh điển. Hậu quả: tiếng méo, vỡ, và **chiếm phổ của đài bên cạnh** (vi phạm quy định phát thanh). Phản chứng cụ thể: với $x = \\cos$, tại đáy message $x = -1$, $1 + m(-1) = 1 - m$. Nếu $m = 1{,}5$ → $1 - 1{,}5 = -0{,}5 < 0$ → bao âm → detector gập lên thành $+0{,}5$ → khôi phục sai. Luôn giữ $m \\le 1$ (thực tế thường $0{,}7$–$0{,}9$).

🔁 **Dừng lại tự kiểm tra.**
1. AM với $f_c = 200$ kHz, message một tông $f_m = 8$ kHz. Ba vạch phổ ở đâu? Băng thông?
2. Tại $m = 1$, biên độ mỗi dải biên (so với carrier $=1$) là bao nhiêu?

<details><summary>Đáp án</summary>

1. Vạch tại $200$ kHz (carrier), $192$ kHz (LSB), $208$ kHz (USB). Băng thông $= 2\\times 8 = 16$ kHz.
2. $m/2 = 0{,}5$.
</details>

📝 **Tóm tắt mục 3.** AM: $s = [1 + m\\,x]\\,A_c\\cos(2\\pi f_c t)$. Phổ = carrier + 2 dải biên dịch $\\pm f_{max}$ quanh $f_c$ (do dịch tần Fourier). Băng thông $2f_{max}$. Giữ $m\\le1$ để tránh méo overmodulation.

---

## 4. FM — Điều tần (Frequency Modulation)

💡 **Trực giác.** Lần này giữ **biên độ sóng mang cố định**, nhưng cho **tần số tức thời** của nó **chạy nhanh / chậm theo message**. Message lớn → sóng dày (tần số cao); message nhỏ/âm → sóng thưa (tần số thấp). Vẽ ra: biên độ không đổi, chỉ "mật độ" dao động thay đổi.

### 4.1. Tần số tức thời và công thức

**Tần số tức thời (instantaneous frequency)** $f_i(t) = f_c + k_f\\,x(t)$, với $k_f$ là độ nhạy tần (Hz trên đơn vị message). Vì pha là tích phân của tần số góc:

$$s(t) = A_c\\cos\\!\\Big(2\\pi f_c t + 2\\pi k_f\\!\\int_0^t x(\\tau)\\,d\\tau\\Big)$$

Với message một tông $x(t) = \\cos(2\\pi f_m t)$:

$$s(t) = A_c\\cos\\!\\Big(2\\pi f_c t + \\beta\\sin(2\\pi f_m t)\\Big), \\qquad \\beta = \\frac{\\Delta f}{f_m}$$

trong đó $\\Delta f = k_f\\cdot\\max|x|$ là **độ lệch tần đỉnh (peak frequency deviation)**, và $\\beta$ là **chỉ số điều chế FM**.

### 4.2. Băng thông Carson

Khác AM (băng thông gọn $2f_{max}$), phổ FM về mặt lý thuyết **vô hạn** (nhiều dải biên, biên độ theo hàm Bessel). Trên thực tế dùng **công thức Carson** để ước lượng băng thông chứa ~98% công suất:

$$\\boxed{\\,B_{FM} \\approx 2(\\Delta f + f_{max})\\,} = 2 f_{max}(\\beta + 1)$$

**Ví dụ số (≥4):**

1. **FM thương mại (broadcast).** $\\Delta f = 75$ kHz, $f_{max} = 15$ kHz → $B = 2(75+15) = 180$ kHz. (Khe FM cấp 200 kHz/đài — khớp.)
2. **FM hẹp (narrowband, bộ đàm).** $\\Delta f = 5$ kHz, $f_{max} = 3$ kHz → $B = 2(5+3) = 16$ kHz. Gần AM.
3. **$\\beta$ nhỏ.** $\\Delta f = 2$ kHz, $f_m = 4$ kHz → $\\beta = 0{,}5$; $B = 2\\times4\\times(0{,}5+1) = 12$ kHz.
4. **$\\beta$ lớn (chất lượng cao).** $\\Delta f = 60$ kHz, $f_m = 10$ kHz → $\\beta = 6$; $B = 2\\times10\\times7 = 140$ kHz.

⚠ **Lỗi thường gặp — quên rằng băng thông FM rộng.** Sinh viên hay nghĩ FM cũng gọn như AM. Sai: FM broadcast tốn $180$ kHz, gấp **18 lần** AM thoại ($10$ kHz). Đổi lại được chất lượng và chống nhiễu. Đừng "tăng $\\Delta f$ cho rõ tiếng" mà quên rằng băng thông phình ra theo Carson và lấn đài bên cạnh.

### 4.3. AM vs FM — so sánh

| Tiêu chí | AM | FM |
|---|---|---|
| Biến đổi thuộc tính nào | Biên độ | Tần số |
| Băng thông | Gọn: $2f_{max}$ | Rộng: $2(\\Delta f + f_{max})$ |
| Chống nhiễu biên độ | **Kém** (nhiễu cộng vào biên độ → vào thẳng tín hiệu) | **Tốt** (tin nằm ở tần số, limiter cắt nhiễu biên độ) |
| Mạch thu | Đơn giản (envelope detector) | Phức tạp hơn (discriminator/PLL) |
| Chất lượng âm | Trung bình | Cao (HiFi) |
| Ứng dụng điển hình | Phát thanh AM, hàng không | Phát thanh FM, bộ đàm, âm thanh TV cũ |

❓ **Câu hỏi tự nhiên.** *"Vì sao FM chống nhiễu tốt hơn?"* — Nhiễu trong không khí chủ yếu **cộng vào biên độ** (sét, động cơ…). AM mang tin ở biên độ → nhiễu vào thẳng. FM mang tin ở **tần số**; máy thu FM có **mạch giới hạn (limiter)** cắt phẳng biên độ trước khi giải mã → loại bỏ phần lớn nhiễu biên độ. Đó là lý do đài FM nghe "sạch" hơn AM.

🔁 **Dừng lại tự kiểm tra.** Một đài FM có $\\Delta f = 50$ kHz, $f_{max} = 12$ kHz. Băng thông Carson? Chỉ số $\\beta$ ứng với tông $f_m = 12$ kHz?

<details><summary>Đáp án</summary>

$B = 2(50 + 12) = 124$ kHz. $\\beta = \\Delta f / f_m = 50/12 \\approx 4{,}17$.
</details>

📝 **Tóm tắt mục 4.** FM: tần số tức thời $f_i = f_c + k_f x(t)$, biên độ không đổi. Băng thông Carson $2(\\Delta f + f_{max})$ — rộng hơn AM nhiều, đổi lại chống nhiễu biên độ tốt và chất lượng cao.

---

## 5. Giải điều chế (Demodulation)

Bên thu phải **lấy lại $x(t)$** từ sóng đã điều chế. Hai cách chính cho AM:

### 5.1. Envelope detector (cho AM)

💡 **Trực giác.** Vì message AM = đường bao của sóng mang, chỉ cần "vẽ lại đường bao" là xong. Mạch điện: diode chỉnh lưu (giữ phần dương) + tụ + điện trở (RC) làm trơn → bám theo đỉnh sóng mang = đường bao.

- Diode → $|s(t)|$ (chỉnh lưu nửa chu kỳ).
- RC low-pass → loại dao động tần $f_c$, giữ lại đường bao $A_c[1 + m\\,x(t)]$.
- Tụ chặn DC → còn $m\\,x(t)$.

Điều kiện: hằng số thời gian RC phải **lớn hơn chu kỳ sóng mang** ($1/f_c$) nhưng **nhỏ hơn chu kỳ message nhanh nhất** ($1/f_{max}$). Đây là một bộ lọc thông thấp → liên hệ [Tier 3 L01 Lọc số](../lesson-01-digital-filters/).

Chỉ hoạt động đúng khi $m \\le 1$ (đường bao luôn dương). Đây là lý do overmodulation phá envelope detector.

### 5.2. Coherent detection — nhân lại sóng mang + lọc thông thấp

💡 **Trực giác.** Điều chế đã *dịch phổ lên $f_c$*. Để hạ về băng gốc, **dịch ngược lại** bằng cách nhân thêm một bản sao sóng mang, rồi lọc bỏ phần tần cao.

Nhân $s(t)$ với sóng mang đồng pha (local oscillator) $\\cos(2\\pi f_c t)$:

$$s(t)\\cos(2\\pi f_c t) = [1 + m\\,x(t)]\\cos^2(2\\pi f_c t) = \\frac{1 + m\\,x(t)}{2}\\big[1 + \\cos(4\\pi f_c t)\\big]$$

Tách ra:

$$= \\underbrace{\\frac{1 + m\\,x(t)}{2}}_{\\text{băng gốc — giữ lại}} + \\underbrace{\\frac{1 + m\\,x(t)}{2}\\cos(4\\pi f_c t)}_{\\text{quanh } 2f_c \\text{ — lọc bỏ}}$$

Cho qua **lọc thông thấp (low-pass)** cắt trên $f_{max}$ → bỏ thành phần quanh $2f_c$, còn lại $\\tfrac12[1 + m\\,x(t)]$. Chặn DC → ra $\\tfrac{m}{2}x(t)$. Xong.

⚠ **Lỗi thường gặp.** Coherent detection đòi sóng mang nội **đúng tần số và đúng pha** với sóng mang phát. Lệch pha $\\theta$ → tín hiệu nhân thêm $\\cos\\theta$ (lệch $90°$ → mất hẳn tín hiệu). FM/PSK dùng PLL (vòng khóa pha) để đồng bộ. Đây là lý do envelope detector (không cần đồng bộ) phổ biến cho AM rẻ tiền.

📝 **Tóm tắt mục 5.** Giải điều chế AM: envelope detector (diode + RC, $m\\le1$) hoặc coherent (nhân sóng mang + low-pass, cần đồng bộ pha). Cả hai đều kết thúc bằng một **bộ lọc thông thấp** — chính là kiến thức Tier 3 L01.

---

## 6. Điều chế số (Digital Modulation) — sơ lược

Khi message là **bit (0/1)** thay vì sóng analog, ta điều chế **rời rạc** theo từng symbol. Ba "biến thể số" của AM/FM/PM:

| Kỹ thuật | Biến đổi gì theo bit | Minh họa |
|---|---|---|
| **ASK** (Amplitude-Shift Keying) | Biên độ: bit 1 → có sóng mang, bit 0 → tắt (OOK) | "AM số" |
| **FSK** (Frequency-Shift Keying) | Tần số: bit 0 → $f_0$, bit 1 → $f_1$ | "FM số" — modem dial-up cổ |
| **PSK** (Phase-Shift Keying) | Pha: bit 0 → $0°$, bit 1 → $180°$ (BPSK) | "PM số" |

### 6.1. Chòm sao (constellation) và QAM

💡 **Trực giác.** Mỗi symbol gửi đi là một điểm trên mặt phẳng phức (trục I = in-phase $\\cos$, trục Q = quadrature $\\sin$). Tập các điểm khả dĩ vẽ ra **chòm sao (constellation)**. Càng nhiều điểm → mỗi symbol cõng được nhiều bit hơn → tốc độ cao hơn, nhưng các điểm gần nhau → dễ nhầm khi nhiễu.

- **BPSK**: 2 điểm (pha $0°, 180°$) → 1 bit/symbol.
- **QPSK**: 4 điểm (pha $45°,135°,225°,315°$) → 2 bit/symbol.
- **QAM** (Quadrature Amplitude Modulation): kết hợp **cả biên độ và pha** → lưới điểm. 16-QAM → 16 điểm → 4 bit/symbol; 64-QAM → 6 bit/symbol; 256-QAM → 8 bit/symbol.

Số bit mỗi symbol $= \\log_2(\\text{số điểm})$. **Ví dụ:** 16-QAM → $\\log_2 16 = 4$ bit/symbol; 256-QAM → $\\log_2 256 = 8$ bit/symbol.

⚠ **Đánh đổi.** Chòm sao dày (256-QAM) cho throughput cao nhưng cần **SNR cao** (tín hiệu sạch); kênh nhiễu → các điểm "nhòe" chồng nhau → lỗi bit. Hệ thống thật (WiFi, 4G/5G) **đổi chòm sao theo chất lượng kênh** (adaptive modulation): gần router dùng 256-QAM, ở xa rớt về QPSK.

❓ **Liên hệ Networking.** Đây chính là tầng vật lý (PHY) của [Networking](../../../Networking/): WiFi 6 dùng tới 1024-QAM, 4G/5G dùng QPSK→256-QAM tùy điều kiện sóng; "tốc độ mạng tụt khi đi xa router" chính là rớt chòm sao. Phần mạch tạo/khuếch đại sóng liên hệ [Electronics](../../../Electronics/).

🔁 **Dừng lại tự kiểm tra.** 64-QAM cõng bao nhiêu bit/symbol? Nếu tốc độ symbol là 1 triệu symbol/giây thì bit rate?

<details><summary>Đáp án</summary>

$\\log_2 64 = 6$ bit/symbol → $6\\times10^6 = 6$ Mbit/s.
</details>

📝 **Tóm tắt mục 6.** Điều chế số: ASK/FSK/PSK = bản rời rạc của AM/FM/PM. QAM kết hợp biên+pha thành chòm sao; số điểm $\\to \\log_2$ bit/symbol. Đánh đổi throughput ↔ chống nhiễu → adaptive modulation trong WiFi/4G/5G.

---

## 7. Ứng dụng thực tế

1. **Phát thanh AM/FM** — đài AM (530–1700 kHz, băng thông 10 kHz), đài FM (88–108 MHz, băng thông 200 kHz).
2. **WiFi (802.11)** — OFDM + QAM (tới 256-QAM ở WiFi 5, 1024-QAM ở WiFi 6) trên hàng trăm sóng mang con.
3. **4G/5G di động** — QPSK/16/64/256-QAM thích nghi theo chất lượng kênh; FSK/PSK trong báo hiệu.
4. **Modem (dial-up, DSL, cáp)** — QAM trên đường dây điện thoại/cáp đồng trục.
5. **Bluetooth** — GFSK (FSK lọc Gauss), biến thể của FM.
6. **Truyền hình số (DVB), vệ tinh** — QAM/PSK bậc cao.
7. **RFID, remote control** — ASK/OOK đơn giản, rẻ.
8. **Modem âm thanh cổ (Bell 103)** — FSK nghe được "tiếng rít" chính là 0/1 ở hai tần số.

---

## Bài tập

> Làm trước, đối chiếu mục **Lời giải chi tiết** ngay dưới.

1. **(AM phổ)** AM một tông: $f_c = 600$ kHz, $f_m = 4$ kHz, $m = 0{,}6$, $A_c = 1$. Liệt kê 3 vạch phổ (tần số + biên độ) và băng thông.
2. **(Overmodulation)** Message $x(t) = \\cos(2\\pi f_m t)$, $m = 1{,}4$. Tại đáy message ($x = -1$), giá trị $1 + m\\,x$ bằng bao nhiêu? Vì sao envelope detector cho kết quả sai? Giá trị $m$ tối đa để tránh?
3. **(Carson)** Đài FM: $\\Delta f = 40$ kHz, $f_{max} = 8$ kHz. Tính băng thông Carson và chỉ số $\\beta$ (với $f_m = f_{max}$). So sánh băng thông này với một đài AM truyền cùng message.
4. **(Demod coherent)** Cho $s(t) = [1 + m x(t)]\\cos(2\\pi f_c t)$. Nếu bộ thu nhân với $\\cos(2\\pi f_c t + 90°) = -\\sin(2\\pi f_c t)$ (lệch pha $90°$) rồi lọc thông thấp, kết quả thu được là gì? Rút ra điều kiện cho coherent detection.
5. **(QAM)** Một kênh dùng 16-QAM với tốc độ symbol 5 Msym/s. (a) Bao nhiêu bit/symbol? (b) Bit rate? (c) Nếu kênh xấu phải rớt về QPSK, bit rate mới là bao nhiêu?
6. **(So sánh)** Giải thích ngắn gọn vì sao nghe đài AM khi đi qua đường dây điện cao thế hay "rẹt rẹt" còn FM thì không.

---

## Lời giải chi tiết

### Bài 1 — AM phổ

Công thức 3 vạch: carrier tại $f_c$ biên độ $A_c$; hai dải biên tại $f_c \\pm f_m$ biên độ $m A_c/2$.

- Carrier: $600$ kHz, biên độ $1$.
- LSB: $600 - 4 = 596$ kHz, biên độ $m/2 = 0{,}3$.
- USB: $600 + 4 = 604$ kHz, biên độ $0{,}3$.
- Băng thông $= 2 f_m = 8$ kHz.

### Bài 2 — Overmodulation

Tại $x = -1$: $1 + m\\,x = 1 + 1{,}4\\times(-1) = 1 - 1{,}4 = -0{,}4$.

Đường bao $A_c(1 + mx) = -0{,}4 < 0$ → bao **âm**. Envelope detector lấy trị tuyệt đối/chỉnh lưu sẽ "gập" $-0{,}4$ thành $+0{,}4$, tức đọc sai dấu/hình dạng message → méo phi tuyến, sinh hài bậc cao (splatter) lấn phổ. **$m$ tối đa để bao luôn $\\ge 0$ là $m = 1$** (khi đó tại đáy $1 + 1\\cdot(-1) = 0$, vừa chạm 0 không lật).

### Bài 3 — Carson

$B_{FM} = 2(\\Delta f + f_{max}) = 2(40 + 8) = 96$ kHz.

$\\beta = \\dfrac{\\Delta f}{f_m} = \\dfrac{40}{8} = 5$.

AM truyền cùng message ($f_{max} = 8$ kHz): $B_{AM} = 2 f_{max} = 16$ kHz.

So sánh: FM tốn $96$ kHz, gấp **6 lần** AM ($16$ kHz). FM "ăn" phổ nhiều hơn nhưng chống nhiễu tốt hơn.

### Bài 4 — Demod lệch pha

$$s(t)\\cdot(-\\sin(2\\pi f_c t)) = -[1 + m x(t)]\\cos(2\\pi f_c t)\\sin(2\\pi f_c t)$$

Dùng $\\cos\\theta\\sin\\theta = \\tfrac12\\sin(2\\theta)$:

$$= -\\frac{1 + m x(t)}{2}\\sin(4\\pi f_c t)$$

Toàn bộ năng lượng nằm quanh $2f_c$, **không có thành phần băng gốc**. Sau lọc thông thấp → **ra 0** (mất hết tín hiệu).

→ Điều kiện coherent detection: sóng mang nội phải **đồng bộ cả tần số và pha** với sóng mang phát. Lệch pha $\\theta$ làm tín hiệu thu nhân thêm $\\cos\\theta$; tại $\\theta = 90°$, $\\cos 90° = 0$ → mất hẳn. Đây là lý do dùng PLL để khóa pha.

### Bài 5 — QAM

(a) $\\log_2 16 = 4$ bit/symbol.

(b) Bit rate $= 4 \\times 5\\times10^6 = 20$ Mbit/s.

(c) QPSK $= \\log_2 4 = 2$ bit/symbol → $2 \\times 5\\times10^6 = 10$ Mbit/s (giảm một nửa, đổi lấy độ bền nhiễu).

### Bài 6 — AM nhiễu, FM sạch

Đường dây cao thế phát nhiễu điện từ **cộng vào biên độ** sóng thu. AM mang thông tin **ở biên độ** → nhiễu biên độ đi thẳng vào tín hiệu được giải điều chế → nghe "rẹt rẹt". FM mang tin **ở tần số**; máy thu FM có **limiter** cắt phẳng biên độ trước khi giải mã, loại phần lớn nhiễu biên độ → nghe sạch.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **AM modulator**: chọn message (sin / tổng 2 sin), chỉnh $f_c$ và chỉ số $m$; xem message, sóng mang, sóng AM (với đường bao) và phổ (carrier + 2 dải biên); cảnh báo overmodulation khi $m > 1$.
  2. **FM modulator**: vẽ sóng FM (tần số đặc/thưa theo message) và so băng thông Carson với AM.
  3. **Constellation số**: chuyển ASK / FSK / PSK / QAM, xem chòm sao và dạng sóng tương ứng.

## Tham khảo & Bài tiếp theo

- Tiền đề: [Tín hiệu cơ bản](../../01-Foundations/lesson-01-signals-basics/) · [Biến đổi Fourier (dịch tần)](../../02-Fourier/lesson-03-fourier-transform/) · [Lọc số](../lesson-01-digital-filters/)
- **Bài tiếp theo:** [Wavelet (preview)](../lesson-05-wavelet-preview/) — phân tích tín hiệu đa phân giải theo cả thời gian lẫn tần số.
- Liên hệ ngành: [Networking](../../../Networking/) (PHY: QAM, OFDM) · [Electronics](../../../Electronics/) (mạch dao động, khuếch đại, PLL).
`;
