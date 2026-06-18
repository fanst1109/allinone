# Lesson 16 — Wavelet (preview): vượt giới hạn Fourier, phân giải đa tỉ lệ

> Bài **cuối cùng** của lĩnh vực Signal Processing (Tier 3 — Applied, L16).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** Fourier và STFT có một **trade-off thời gian–tần số cố định** — và vì sao đó là một giới hạn thật sự.
- Hiểu ý tưởng cốt lõi của **wavelet**: một hàm sóng nhỏ $\psi$ khu trú **cả thời gian lẫn tần số**, và phép biến đổi sinh ra bằng **co giãn (scale)** + **dịch (shift)**.
- Phân biệt **CWT** (continuous wavelet transform) và **DWT** (discrete wavelet transform); đọc được **scalogram**.
- Làm được **walk-through Haar DWT bằng số** trên một dãy nhỏ: cặp **average/detail**, phân rã đa mức.
- Hiểu cơ chế **nén & khử nhiễu wavelet** (vứt hệ số detail nhỏ) và so sánh với DCT/JPEG.
- Biết các **ứng dụng thực tế** (JPEG2000, ECG, địa chấn, phát hiện đột biến) và **hướng học tiếp**.

## Kiến thức tiền đề

- [Tier 2 — L11 Spectrogram & STFT](../../02-Fourier/lesson-06-spectrogram-stft/) — **bắt buộc**. Bài này trực tiếp đóng câu hỏi mở từ L11.
- [Tier 1 — L05 Tương quan & Năng lượng](../../01-Foundations/lesson-05-correlation-energy/) — CWT chính là tương quan tín hiệu với wavelet.
- [Tier 3 — L14 Ảnh & Fourier 2D](../lesson-03-image-2d-fourier/) — để so sánh nén wavelet với DCT/JPEG.

---

## 1. Vì sao cần wavelet? — một câu hỏi STFT không trả lời được

> 💡 **Trực giác / Hình dung.** Tưởng tượng bạn ghi âm một bản nhạc: có **một nốt trầm ngân dài 2 giây** (tần số thấp, kéo dài) và **một tiếng gõ "tóc" rất ngắn 5 ms** (tần số cao, chớp nhoáng) chen vào giữa. Bạn muốn một "bản đồ" cho biết: *ở thời điểm nào, có tần số nào?* STFT (Lesson 11) làm việc đó bằng cách trượt **một khung cửa sổ độ rộng cố định** dọc tín hiệu rồi lấy Fourier trong mỗi khung. Vấn đề: **bạn phải chọn một độ rộng khung duy nhất cho cả tín hiệu.**

**Câu hỏi mở của bài:** STFT chọn **một** độ rộng khung cho **toàn bộ** tín hiệu. Nếu tín hiệu vừa có **nốt trầm dài** vừa có **tiếng gõ ngắn** thì khung đó nên rộng hay hẹp?

- Khung **rộng** (ví dụ 100 ms): phân giải **tần số** tốt — phân biệt được nốt trầm 80 Hz với 82 Hz. Nhưng phân giải **thời gian** kém — tiếng gõ 5 ms bị "bôi" ra cả 100 ms, không biết nó xảy ra đúng lúc nào.
- Khung **hẹp** (ví dụ 5 ms): phân giải **thời gian** tốt — định vị được tiếng gõ. Nhưng phân giải **tần số** kém — nốt trầm dài bị nhòe thành một dải tần rộng, không đọc được cao độ.

Bạn **không thể chọn cả hai cùng tốt** với một khung. Đây không phải lỗi cài đặt — đó là một **định luật**.

### 1.1. Nguyên lý bất định thời gian–tần số (đóng câu hỏi từ L11)

Với mọi cửa sổ phân tích, tích của độ rộng thời gian $\Delta t$ và độ rộng tần số $\Delta f$ luôn bị chặn dưới:

$$\Delta t \cdot \Delta f \ge \frac{1}{4\pi}$$

Đây là **nguyên lý bất định (uncertainty principle)** của xử lý tín hiệu (cùng dạng toán với Heisenberg trong vật lý). Ý nghĩa: **càng định vị tốt trong thời gian thì càng mờ trong tần số, và ngược lại.** Không có cách nào phá vỡ.

STFT cố định $\Delta t$ (vì khung cố định) ⇒ cố định luôn cả $\Delta f$ ⇒ **một lưới phân giải đồng đều** trên toàn mặt phẳng thời gian–tần số:

```
tần số ▲   STFT: mọi ô cùng kích thước (khung cố định)
       │  ┌──┬──┬──┬──┬──┬──┐
  cao  │  │  │  │  │  │  │  │   ← ô cao cũng rộng như ô thấp
       │  ├──┼──┼──┼──┼──┼──┤      → tiếng gõ ngắn bị bôi ra
 thấp  │  │  │  │  │  │  │  │
       └──┴──┴──┴──┴──┴──┴──┴──▶ thời gian
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy Fourier thường (không trượt khung) thì sao?"* — Tệ hơn: Fourier cho **độ phân giải tần số hoàn hảo nhưng KHÔNG có thông tin thời gian** ($\Delta t = \infty$). Nó nói "có 80 Hz trong tín hiệu" nhưng không nói 80 Hz xuất hiện **lúc nào**.
> - *"Có thể chạy STFT hai lần, một khung rộng một khung hẹp rồi ghép?"* — Có người làm vậy (multi-resolution STFT), nhưng đó chính là **đi nửa đường tới wavelet**. Wavelet làm việc đó một cách có hệ thống và toán học gọn gàng.

### 1.2. Ý tưởng giải phóng: cho độ phân giải **thay đổi theo tần số**

Quan sát then chốt: **tín hiệu tần số cao thường ngắn (cần định vị thời gian tốt); tín hiệu tần số thấp thường dài (cần phân giải tần số tốt).** Vậy tại sao dùng cùng một khung?

Wavelet đề xuất: **cửa sổ co giãn theo tần số.**

- Tần số **cao** → cửa sổ **hẹp** (định vị thời gian sắc — bắt được tiếng gõ).
- Tần số **thấp** → cửa sổ **rộng** (phân giải tần số tốt — đọc được cao độ nốt trầm).

```
tần số ▲   Wavelet: ô cao thì hẹp-cao, ô thấp thì rộng-thấp
       │  ┌┬┬┬┬┬┬┬┐
  cao  │  ├┼┼┼┼┼┼┼┤   ← nhiều ô hẹp: định vị thời gian tốt
       │  ├─┼─┼─┼─┤
       │  ├──┼──┼──┤
 thấp  │  │     │     │ ← ít ô rộng: phân giải tần số tốt
       └──┴─────┴─────┴──▶ thời gian
```

Cùng tuân nguyên lý bất định (diện tích mỗi ô vẫn $\ge \frac{1}{4\pi}$), nhưng wavelet **phân bổ lại** diện tích đó cho khôn ngoan — đúng chỗ cần.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao không có khung STFT nào "tốt cho cả nốt trầm dài lẫn tiếng gõ ngắn"?
> 2. Wavelet xử lý tần số cao bằng cửa sổ rộng hay hẹp?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì nguyên lý bất định: khung rộng ⇒ tần số sắc nhưng thời gian mờ (bôi tiếng gõ); khung hẹp ⇒ thời gian sắc nhưng tần số mờ (nhòe nốt trầm). Một khung không thể tốt cả hai.
> 2. **Hẹp** — để định vị thời gian sắc, bắt đúng thời điểm sự kiện ngắn.
> </details>

> 📝 **Tóm tắt mục 1.**
> - STFT dùng **một** khung cố định ⇒ lưới phân giải **đồng đều** ⇒ không tốt cho tín hiệu vừa có thành phần dài vừa có thành phần ngắn.
> - Nguyên lý bất định $\Delta t \cdot \Delta f \ge \frac{1}{4\pi}$: không thể sắc cả thời gian lẫn tần số cùng lúc.
> - Wavelet **không phá** nguyên lý đó, mà cho **độ phân giải thay đổi**: cao → hẹp, thấp → rộng.

---

## 2. Hạn chế của Fourier/STFT — nhắc lại gọn

| Biến đổi | Thông tin thời gian | Thông tin tần số | Vấn đề |
|---|---|---|---|
| **Fourier (DFT)** | Không có | Hoàn hảo | Không biết tần số xảy ra **khi nào** |
| **STFT** | Có, nhưng độ phân giải **cố định** | Có, nhưng độ phân giải **cố định** | Một khung không hợp cho mọi tần số |
| **Wavelet** | Có, **thay đổi** theo scale | Có, **thay đổi** theo scale | Phức tạp hơn, nhiều lựa chọn mother wavelet |

Fourier coi tín hiệu là tổng các **sin/cos vô hạn** — mỗi sin trải dài toàn trục thời gian (không khu trú). Đó là lý do gốc nó "mù" thời gian. Wavelet thay sin vô hạn bằng **sóng nhỏ khu trú** — sinh ra khả năng định vị thời gian.

---

## 3. Wavelet là gì?

> 💡 **Trực giác.** "Wavelet" = "**sóng nhỏ**" (wave + let). Khác với sin trải dài vô tận, wavelet là một **nhịp sóng ngắn** dao động vài chu kỳ rồi tắt về 0 ở hai đầu. Vì nó **ngắn**, nó "biết" mình ở **đâu** trên trục thời gian; vì nó **dao động**, nó "biết" mình ứng với **tần số** nào.

### 3.1. Định nghĩa hàm wavelet (mother wavelet)

Một hàm $\psi(t)$ là **wavelet mẹ (mother wavelet)** nếu thỏa 2 điều kiện cơ bản:

1. **Trung bình bằng 0** (admissibility): $\int_{-\infty}^{\infty} \psi(t)\,dt = 0$ — nó dao động lên rồi xuống, không có thành phần "một chiều".
2. **Năng lượng hữu hạn & khu trú**: $\int_{-\infty}^{\infty} |\psi(t)|^2\,dt < \infty$, và $\psi(t) \to 0$ khi $|t| \to \infty$ (tắt nhanh ở hai đầu).

**Định nghĩa 3 phần — wavelet là gì:**

- **(a) Là gì:** một hàm sóng khu trú đo "có bao nhiêu **dao động kiểu $\psi$** ở **vị trí này**, với **độ co giãn này**". Khác với sin của Fourier (toàn cục), wavelet là **cục bộ**.
- **(b) Vì sao cần:** Fourier dùng sin vô hạn nên không định vị được thời gian; STFT dùng khung cố định nên phân giải cứng nhắc. Wavelet vừa khu trú thời gian, vừa **tự điều chỉnh độ phân giải theo tần số** — giải đúng bài toán mục 1.
- **(c) Ví dụ trực giác bằng số:** wavelet **Haar** đơn giản nhất:

$$\psi(t) = \begin{cases} +1 & 0 \le t < \tfrac12 \\ -1 & \tfrac12 \le t < 1 \\ 0 & \text{ngược lại} \end{cases}$$

Kiểm tra điều kiện (1): $\int_0^{1/2}(+1)\,dt + \int_{1/2}^{1}(-1)\,dt = \tfrac12 - \tfrac12 = 0$ ✓. Nó là "một bước lên rồi một bước xuống" — phát hiện **sự thay đổi đột ngột** cực tốt.

### 3.2. Hai phép biến đổi sinh: scale và shift

Từ **một** mother wavelet $\psi$, ta sinh ra cả một họ bằng 2 phép biến đổi:

$$\psi_{a,b}(t) = \frac{1}{\sqrt{a}}\,\psi\!\left(\frac{t - b}{a}\right)$$

- **$b$ — shift (dịch):** trượt wavelet sang vị trí thời gian $b$. Đây là cách wavelet "đi tới chỗ cần xét".
- **$a$ — scale (co giãn):** $a$ lớn → wavelet **giãn rộng** ra (ứng tần số **thấp**); $a$ nhỏ → wavelet **co hẹp** lại (ứng tần số **cao**).
- Hệ số $\frac{1}{\sqrt{a}}$ giữ **năng lượng** không đổi khi co giãn (chuẩn hóa).

> ⚠ **Lỗi thường gặp.** Đừng nhầm "scale lớn = tần số cao". **Ngược lại:** scale lớn ⇒ wavelet rộng ⇒ ứng với **tần số thấp** (sóng chậm). Scale nhỏ ⇒ wavelet hẹp ⇒ **tần số cao**. Nhớ: "co lại thì nhanh" (scale nhỏ, tần số cao).

**Ví dụ số (4 ví dụ co giãn/dịch Haar):**

| $a$ (scale) | $b$ (shift) | Hỗ trợ (support) của $\psi_{a,b}$ | Ý nghĩa |
|---|---|---|---|
| $a=1, b=0$ | gốc | $[0,1)$ | wavelet gốc, ở đầu tín hiệu |
| $a=2, b=0$ | giãn ×2 | $[0,2)$ | rộng hơn → tần số thấp hơn |
| $a=1, b=4$ | dịch +4 | $[4,5)$ | wavelet gốc nhưng ở vị trí $t=4$ |
| $a=\tfrac12, b=3$ | co ×½ | $[3, 3.5)$ | hẹp hơn → tần số cao, ở $t=3$ |

### 3.3. Vài mother wavelet (sơ lược)

- **Haar** (1909): bước vuông $+1/-1$. Đơn giản nhất, rời rạc hoàn hảo. Tốt cho **phát hiện cạnh/đột biến**; nhược điểm: không trơn (gây "khối" như nén ảnh thô).
- **Morlet**: một sóng sin gói trong một "bao" Gauss (sin × chuông Gauss). Trơn, **rất tốt cho phân tích tần số–thời gian** (CWT, scalogram âm thanh/địa chấn).
- **Daubechies (dbN)**: họ wavelet trơn, **trực giao**, có "moment triệt tiêu" — biểu diễn tín hiệu trơn bằng rất ít hệ số. Là **trái tim của nén ảnh JPEG2000** (db9/7).

> 📝 **Tóm tắt mục 3.**
> - Wavelet $\psi$ = sóng nhỏ khu trú, trung bình 0, tắt ở hai đầu.
> - Họ wavelet sinh từ **scale $a$** (co giãn ↔ tần số) và **shift $b$** (vị trí thời gian).
> - Scale **nhỏ ⇒ tần số cao**; scale **lớn ⇒ tần số thấp**.
> - Mother wavelet phổ biến: Haar (đột biến), Morlet (scalogram), Daubechies (nén).

---

## 4. CWT — biến đổi wavelet liên tục

> 💡 **Trực giác.** CWT trả lời: "Tại **vị trí $b$**, với **độ co giãn $a$**, tín hiệu **giống wavelet đến mức nào?**" — y hệt ý tưởng **tương quan (correlation)** ở [Lesson 05](../../01-Foundations/lesson-05-correlation-energy/): trượt một mẫu (template) dọc tín hiệu, mỗi vị trí tính một "điểm khớp". Ở đây template là wavelet, và ta lặp việc đó cho **nhiều scale**.

### 4.1. Công thức

$$W(a,b) = \int_{-\infty}^{\infty} x(t)\,\psi_{a,b}^{*}(t)\,dt = \frac{1}{\sqrt{a}}\int_{-\infty}^{\infty} x(t)\,\psi^{*}\!\left(\frac{t-b}{a}\right)dt$$

Đây chính là **tích trong (inner product)** giữa tín hiệu $x$ và wavelet $\psi_{a,b}$ — đo độ tương quan. $W(a,b)$ lớn ⇒ tại $b$ có thành phần "giống $\psi$ ở scale $a$".

**Liên hệ L05:** ở L05 ta có $\text{corr}(b) = \sum_t x[t]\,h[t-b]$ (trượt template $h$). CWT là **cùng phép đó nhưng template là wavelet co giãn được**: lặp tương quan cho từng scale $a$ ⇒ một mặt phẳng 2D $(a, b)$.

### 4.2. Scalogram

Vẽ $|W(a,b)|^2$ (năng lượng) trên mặt phẳng (vị trí $b$, scale $a$) → **scalogram**. Tương tự spectrogram của STFT, nhưng:

- Trục dọc là **scale** (≈ nghịch đảo tần số), không phải tần số đều.
- Độ phân giải **thay đổi**: scale nhỏ (tần số cao) → ô hẹp theo thời gian (bắt sự kiện ngắn sắc nét); scale lớn (tần số thấp) → ô rộng.

> ❓ **Câu hỏi tự nhiên.** *"Scalogram khác spectrogram chỗ nào khi nhìn?"* — Một xung gõ ngắn trong spectrogram là **vệt mờ dọc nhiều khung**; trong scalogram nó là **đỉnh sắc hình nón** ở scale nhỏ, chỉ đúng vào thời điểm gõ. Đó là điểm Module A của visualization minh họa trực tiếp.

---

## 5. DWT & walk-through Haar bằng số

CWT tính cho **mọi** $(a,b)$ liên tục → cực dư thừa và tốn. **DWT** (discrete wavelet transform) chỉ lấy scale **lũy thừa 2** ($a = 1, 2, 4, 8, \dots$) và shift tương ứng — vừa đủ, không mất thông tin, tính **rất nhanh** ($O(n)$, còn nhanh hơn FFT $O(n\log n)$).

### 5.1. Bước Haar: cặp average & detail

Haar DWT xử lý dãy theo **từng cặp** $(x_{2i}, x_{2i+1})$, sinh ra 2 số:

$$\text{average: } s_i = \frac{x_{2i} + x_{2i+1}}{2}, \qquad \text{detail: } d_i = \frac{x_{2i} - x_{2i+1}}{2}$$

- **average** $s$ = "phần trơn" (xấp xỉ thô, tần số thấp) — nửa độ phân giải.
- **detail** $d$ = "phần thay đổi" (tần số cao) — bao nhiêu thông tin bị mất khi làm trơn.

**Khôi phục hoàn toàn** (không mất mát): $x_{2i} = s_i + d_i$, $x_{2i+1} = s_i - d_i$. Kiểm tra: $s+d = \frac{x_{2i}+x_{2i+1}}{2}+\frac{x_{2i}-x_{2i+1}}{2} = x_{2i}$ ✓.

> ⚠ **Lưu ý chuẩn hóa.** Có nhiều quy ước hệ số: chia $2$ (như trên, dễ tính tay), chia $\sqrt{2}$ (giữ năng lượng — chuẩn trực giao), hoặc không chia (lifting). Bài này dùng **chia 2** cho dễ tính tay; tính chất khôi phục vẫn đúng.

### 5.2. Walk-through ĐẦY ĐỦ trên dãy $[4, 6, 10, 12]$

**Mức 1** — ghép cặp $(4,6)$ và $(10,12)$:

$$
\begin{aligned}
\text{cặp }(4,6):\quad & s_0 = \tfrac{4+6}{2} = 5, \quad & d_0 = \tfrac{4-6}{2} = -1 \\
\text{cặp }(10,12):\quad & s_1 = \tfrac{10+12}{2} = 11, \quad & d_1 = \tfrac{10-12}{2} = -1
\end{aligned}
$$

Sau mức 1:
- **averages** (xấp xỉ): $[5,\ 11]$
- **details** (mức 1): $[-1,\ -1]$

**Mức 2** — đệ quy trên dãy averages $[5, 11]$:

$$s_0^{(2)} = \tfrac{5+11}{2} = 8, \qquad d_0^{(2)} = \tfrac{5-11}{2} = -3$$

Sau mức 2:
- **average cuối** (DC, giá trị trung bình toàn dãy): $[8]$
- **detail mức 2**: $[-3]$

**Kết quả DWT đầy đủ** (1 average + các detail từ thô đến mịn):

$$[4,6,10,12] \;\xrightarrow{\text{Haar DWT}}\; \underbrace{[\,8\,]}_{\text{avg}} \;|\; \underbrace{[\,-3\,]}_{d^{(2)}} \;|\; \underbrace{[\,-1,\,-1\,]}_{d^{(1)}}$$

**Kiểm chứng — average cuối phải bằng trung bình toàn dãy:** $\frac{4+6+10+12}{4} = \frac{32}{4} = 8$ ✓. Và $8$ đúng là average cuối ta tính ra.

**Khôi phục ngược (verify không mất mát):**
- Mức 2: $s_0 = 8 + (-3) = 5$, $s_1 = 8 - (-3) = 11$ → averages mức 1 = $[5, 11]$ ✓.
- Mức 1, cặp 0: $x_0 = 5 + (-1) = 4$, $x_1 = 5 - (-1) = 6$ → $[4,6]$ ✓.
- Mức 1, cặp 1: $x_2 = 11 + (-1) = 10$, $x_3 = 11 - (-1) = 12$ → $[10,12]$ ✓.
- Ghép lại: $[4, 6, 10, 12]$ — **khôi phục chính xác**. ✓

> ❓ **Câu hỏi tự nhiên.** *"Vì sao các detail mức 1 đều bằng −1 (nhỏ), còn average chứa số lớn?"* — Vì dãy này **trơn cục bộ** (mỗi cặp chỉ chênh 2). Detail nhỏ = ít thay đổi cục bộ ⇒ **đây là chìa khóa của nén**: phần lớn detail nhỏ, có thể vứt bỏ mà gần như không ảnh hưởng (mục 6).

> 🔁 **Dừng lại tự kiểm tra.** Tính Haar DWT mức 1 cho $[8, 8, 0, 4]$.
> <details><summary>Đáp án</summary>
>
> Cặp $(8,8)$: $s_0=8$, $d_0=0$. Cặp $(0,4)$: $s_1=2$, $d_1=-2$. → averages $[8,2]$, details $[0,-2]$. Detail $d_0=0$ vì cặp đầu **không đổi**; $d_1=-2$ vì cặp sau có bước nhảy. Haar "bắt" đúng chỗ thay đổi.
> </details>

> 📝 **Tóm tắt mục 5.**
> - DWT lấy scale lũy thừa 2 → nhanh $O(n)$, không dư thừa.
> - Bước Haar: average $s=\frac{a+b}{2}$, detail $d=\frac{a-b}{2}$; khôi phục $a=s+d$, $b=s-d$.
> - Phân rã **đa mức**: lặp trên dãy average → 1 average cuối + các tầng detail thô→mịn.
> - Dãy trơn ⇒ detail nhỏ ⇒ mở đường cho nén.

---

## 6. Nén & khử nhiễu wavelet

> 💡 **Trực giác.** Sau DWT, một tín hiệu/ảnh thực tế cho ra **rất nhiều hệ số detail gần 0** (vì hầu hết vùng là trơn) và **ít hệ số lớn** (ở cạnh, đột biến). **Vứt** các hệ số nhỏ đi rồi khôi phục → tín hiệu gần như y nguyên nhưng lưu ít số hơn nhiều. Đó là **nén**. Nếu "nhiễu" chính là các detail nhỏ ngẫu nhiên, vứt chúng = **khử nhiễu**.

### 6.1. Thresholding (ngưỡng hóa)

Chọn ngưỡng $\tau$. Với mọi hệ số detail $d$:

- **Hard threshold:** giữ $d$ nếu $|d| \ge \tau$, ngược lại đặt $d = 0$.
- **Soft threshold:** kéo mọi $d$ về phía 0 một lượng $\tau$ (mượt hơn, ít nhiễu giả).

**Ví dụ số.** DWT cho detail $[\,-3,\ -1,\ -1,\ 0.2,\ 5,\ 0.1\,]$, ngưỡng $\tau = 1$ (hard):

$$[\,-3,\ -1,\ -1,\ 0.2,\ 5,\ 0.1\,] \xrightarrow{\tau=1} [\,-3,\ -1,\ -1,\ 0,\ 5,\ 0\,]$$

Vứt $0.2$ và $0.1$ (nhỏ hơn 1). **Giữ 4/6 hệ số** → tỉ lệ nén ~33% mà tín hiệu gần như không đổi (chỉ mất 2 chi tiết tí hon).

### 6.2. So với DCT/JPEG (Tier 3 — L14)

JPEG (xem [L14 — Ảnh & Fourier 2D](../lesson-03-image-2d-fourier/)) chia ảnh thành **khối 8×8**, lấy **DCT** từng khối, lượng tử hóa rồi vứt hệ số tần số cao.

| | JPEG (DCT) | JPEG2000 (wavelet) |
|---|---|---|
| Đơn vị | Khối **8×8 độc lập** | **Toàn ảnh** đa mức |
| Hiện vật khi nén mạnh | **"Blocking"** — thấy rõ ô vuông 8×8 | **Mờ dần** mượt, không ô vuông |
| Đa tỉ lệ | Không (1 kích thước khối) | Có (phân rã nhiều mức) |
| Progressive | Hạn chế | Tốt — tải thô → mịn dần |

Vì wavelet xử lý **toàn ảnh, đa tỉ lệ**, nó không bị cắt khối nên không có hiện vật "ô vuông" đặc trưng của JPEG ở mức nén cao — lý do JPEG2000 được chọn cho ảnh y tế, lưu trữ phim.

> ⚠ **Lỗi thường gặp.** "Nén wavelet = không mất mát." Sai: vứt hệ số nhỏ là **lossy (mất mát)**. Wavelet **có thể** lossless (giữ hết hệ số, db5/3 nguyên), nhưng khi nén mạnh nó **chủ động bỏ** hệ số nhỏ — mất mát có kiểm soát.

> 📝 **Tóm tắt mục 6.**
> - Tín hiệu thực ⇒ nhiều detail nhỏ, ít detail lớn ⇒ vứt nhỏ = nén/khử nhiễu.
> - Hard/soft thresholding theo ngưỡng $\tau$.
> - So DCT/JPEG: wavelet toàn ảnh đa tỉ lệ ⇒ không "blocking", progressive tốt (JPEG2000).

---

## 7. Ứng dụng thực tế

01. **Nén ảnh JPEG2000** (`.jp2`) — chuẩn dùng Daubechies; ảnh y tế (DICOM), lưu trữ điện ảnh số (DCP), bản đồ độ phân giải cao.
02. **Khử nhiễu (denoising)** — ảnh thiên văn, ảnh y tế, audio: thresholding hệ số detail loại nhiễu mà giữ cạnh sắc (khác blur Gauss làm mờ cả cạnh).
03. **Phân tích ECG / điện tim** — wavelet bắt **phức bộ QRS** (đột biến nhanh) và sóng P/T (chậm) cùng lúc nhờ đa tỉ lệ; phát hiện loạn nhịp.
04. **Địa chấn (seismic)** — phân tích sóng địa chấn dầu khí và động đất: sự kiện đột ngột ngắn lẫn nền chậm.
05. **Phát hiện đột biến / cạnh** — Haar/Daubechies định vị chính xác **bước nhảy** trong tín hiệu (phát hiện lỗi máy móc, gãy xu hướng tài chính).
06. **Fingerprint (FBI WSQ)** — chuẩn nén vân tay của FBI dùng wavelet, giữ chi tiết rãnh vân tốt hơn JPEG.
07. **Watermark & forensics** — nhúng dấu ẩn vào hệ số detail; phát hiện ảnh giả qua bất thường hệ số wavelet.
08. **Trích đặc trưng cho AI/ML** — hệ số wavelet làm feature cho phân loại tín hiệu (EEG, rung động máy) trước khi đưa vào mô hình → xem [AI-ML](../../../AI-ML/).

---

## Bài tập

1. **Haar mức 1.** Tính average & detail (chia 2) cho dãy $[2, 8, 6, 6]$.
2. **Phân rã đa mức.** Tính Haar DWT **đầy đủ** (mọi mức) cho $[1, 3, 5, 9]$. Kiểm chứng average cuối bằng trung bình toàn dãy.
3. **Khôi phục.** Cho DWT đầy đủ của một dãy 4 phần tử: average cuối $=10$, $d^{(2)}=2$, $d^{(1)}=[1, -1]$. Khôi phục dãy gốc.
4. **Thresholding & nén.** Detail của một tín hiệu là $[4, 0.5, -0.3, -2, 0.8, 3]$. Áp hard threshold $\tau = 1$. Bao nhiêu hệ số được giữ? Tỉ lệ nén (số giữ / tổng)?
5. **Scale ↔ tần số.** Wavelet ở scale $a=8$ ứng với tần số cao hay thấp so với $a=2$? Cái nào định vị thời gian sắc hơn?
6. **STFT vs wavelet (khái niệm).** Một tín hiệu có nốt 50 Hz kéo dài 1 s và một xung gõ 3 ms. Giải thích vì sao một khung STFT 200 ms và một khung 4 ms đều không lý tưởng, còn wavelet thì hợp cả hai. (≥3 câu)

## Lời giải chi tiết

### Bài 1
Cặp $(2,8)$: $s_0=\frac{2+8}{2}=5$, $d_0=\frac{2-8}{2}=-3$. Cặp $(6,6)$: $s_1=\frac{6+6}{2}=6$, $d_1=\frac{6-6}{2}=0$.
→ averages $[5, 6]$, details $[-3, 0]$. Detail $d_1=0$ vì cặp thứ hai không đổi.

### Bài 2
**Mức 1** trên $[1,3,5,9]$: cặp $(1,3)$ → $s_0=2, d_0=-1$; cặp $(5,9)$ → $s_1=7, d_1=-2$.
averages $[2,7]$, $d^{(1)}=[-1,-2]$.
**Mức 2** trên $[2,7]$: $s=\frac{2+7}{2}=4.5$, $d=\frac{2-7}{2}=-2.5$.
average cuối $[4.5]$, $d^{(2)}=[-2.5]$.
**Kết quả:** $[4.5]\,|\,[-2.5]\,|\,[-1,-2]$.
**Kiểm chứng:** trung bình toàn dãy $=\frac{1+3+5+9}{4}=\frac{18}{4}=4.5$ = average cuối ✓.

### Bài 3
**Mức 2** (đảo): $s_0 = 10 + 2 = 12$, $s_1 = 10 - 2 = 8$ → averages mức 1 $=[12, 8]$.
**Mức 1**, cặp 0 với $d^{(1)}_0=1$: $x_0 = 12+1=13$, $x_1=12-1=11$.
**Mức 1**, cặp 1 với $d^{(1)}_1=-1$: $x_2 = 8+(-1)=7$, $x_3=8-(-1)=9$.
→ Dãy gốc $[13, 11, 7, 9]$.
**Kiểm chứng:** trung bình $=\frac{13+11+7+9}{4}=\frac{40}{4}=10$ = average cuối ✓.

### Bài 4
$|4|,|0.5|,|{-0.3}|,|{-2}|,|0.8|,|3|$ so với $\tau=1$: giữ $4$ (≥1), bỏ $0.5$, bỏ $0.3$, giữ $-2$ (≥1), bỏ $0.8$, giữ $3$.
→ Sau ngưỡng: $[4, 0, 0, -2, 0, 3]$. **Giữ 3/6 hệ số.** Tỉ lệ giữ $=3/6=50\%$ (vứt 50% — nén ~2×, sai số chỉ từ 3 hệ số nhỏ bị bỏ).

### Bài 5
Scale lớn ⇒ wavelet **giãn rộng** ⇒ **tần số thấp**. Vậy $a=8$ ứng tần số **thấp hơn** $a=2$. Định vị thời gian sắc hơn là **$a=2$** (wavelet hẹp hơn → bắt sự kiện ngắn chính xác hơn). Quy tắc: "co lại thì nhanh & định vị tốt".

### Bài 6
Khung STFT **200 ms**: đủ rộng để đọc chính xác nốt 50 Hz (phân giải tần số tốt), **nhưng** xung gõ 3 ms bị bôi ra cả 200 ms — không biết nó xảy ra lúc nào (thời gian mờ). Khung **4 ms**: định vị xung gõ tốt, **nhưng** chỉ chứa $0.05$ chu kỳ của sóng 50 Hz nên không đọc nổi tần số 50 Hz (tần số mờ). Một khung cố định không thể tốt cả hai vì nguyên lý bất định. **Wavelet** dùng scale lớn (cửa sổ rộng) cho thành phần 50 Hz → đọc tần số tốt, và scale nhỏ (cửa sổ hẹp) cho xung gõ → định vị thời gian sắc — phân giải **thay đổi theo tần số** nên hợp cả hai sự kiện cùng lúc.

---

## Kết thúc lĩnh vực Signal Processing 🎓

Đây là **bài cuối** của lĩnh vực Signal Processing. Lộ trình bạn đã đi:

- **Tier 1 — Foundations:** tín hiệu, lấy mẫu, tích chập, **tương quan** (nền của CWT bài này), năng lượng.
- **Tier 2 — Fourier:** DFT/FFT, phổ, **STFT & spectrogram** (giới hạn mà wavelet vượt qua).
- **Tier 3 — Applied:** lọc, audio DSP, ảnh & Fourier 2D, điều chế, và **wavelet** — đỉnh của phân tích đa tỉ lệ.

### Hướng đi tiếp

- **[AI-ML](../../../AI-ML/)** — hệ số wavelet/Fourier là **feature** kinh điển cho phân loại tín hiệu (EEG, audio, rung động); cầu nối tự nhiên từ DSP sang học máy.
- **[Math](../../../Math/)** — đào sâu nền toán: giải tích Fourier, không gian Hilbert, đại số tuyến tính (cơ sở trực giao = ý tưởng wavelet trực giao).
- **Đọc thêm wavelet nâng cao:** multiresolution analysis (MRA) của Mallat; lifting scheme (DWT không cần bộ nhớ phụ); wavelet packets; dual-tree complex wavelet; ứng dụng JPEG2000/EZW/SPIHT.

> Cảm ơn bạn đã đi hết lĩnh vực. Mọi khái niệm "treo" của Fourier (mù thời gian, khung cứng) đã được wavelet đóng lại. Tín hiệu giờ có thể được nhìn **ở mọi tỉ lệ, đúng nơi, đúng lúc**.
