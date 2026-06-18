// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/03-Applied/lesson-01-digital-filters/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Lọc số (Digital Filters: FIR/IIR)

> **Mở đầu Tier 3 — Applied.** Hai tier trước cho bạn công cụ: tích chập (Tier 1) và phổ tần số (Tier 2). Tier 3 dùng chúng để **làm việc thật** — và việc đầu tiên, phổ biến nhất, là **lọc**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao cần lọc**: loại nhiễu, tách băng tần, làm mượt / làm nét — và phát biểu được bài toán "bỏ tiếng ù 50 Hz mà giữ giọng nói" bằng ngôn ngữ tần số.
- Phân biệt **4 loại lọc theo băng tần**: thông thấp (low-pass), thông cao (high-pass), thông dải (band-pass), chặn dải (band-stop / notch); hiểu đáp ứng tần số **lý tưởng vs thực tế**.
- Hiểu **FIR (đáp ứng xung hữu hạn)**: $y[n] = \\sum_k b_k\\,x[n-k]$ — chính là **tích chập** với kernel; tuyến tính pha, luôn ổn định.
- Hiểu **IIR (đáp ứng xung vô hạn)**: $y[n] = \\sum_k b_k\\,x[n-k] - \\sum_k a_k\\,y[n-k]$ — có **hồi tiếp (feedback)**, bậc thấp nhưng có thể **bất ổn**.
- Đọc **đáp ứng tần số** $|H(f)|$ từ hệ số: cutoff, roll-off, ripple; liên hệ **định lý tích chập** (lọc trong thời gian = nhân phổ trong tần số).
- Thiết kế cơ bản: **windowed-sinc** cho FIR low-pass; quan hệ **bậc filter ↔ độ dốc roll-off**.
- Liên hệ với **bộ lọc analog RC** trong Electronics — cùng một ý tưởng, hai miền cài đặt.

## Kiến thức tiền đề

- [Tier 1 — L04: Tích chập (Convolution) & hệ LTI](../../01-Foundations/lesson-04-convolution/) — **bắt buộc**. Lọc FIR *chính là* tích chập; phải nắm "lật–trượt–nhân–cộng" và khái niệm đáp ứng xung $h[n]$.
- [Tier 2 — L08: Biến đổi Fourier](../../02-Fourier/lesson-03-fourier-transform/) — **bắt buộc**. Cần định lý tích chập và khái niệm phổ $|X(f)|$ để hiểu "lọc = cắt băng tần".
- [Electronics — L07: Bộ lọc (Filters)](../../../Electronics/01-Fundamentals/lesson-07-filters/) — đối chiếu với analog filter.
- [Electronics — L04: Tụ điện & mạch RC](../../../Electronics/01-Fundamentals/lesson-04-capacitor-rc/) — bộ lọc RC là IIR 1 cực bản analog.

---

## 1. Vì sao cần lọc số?

💡 **Trực giác / Hình dung.** Bạn ghi âm một buổi phỏng vấn bằng micro rẻ tiền cắm vào ổ điện. Khi nghe lại, có **tiếng ù 50 Hz** đều đặn (do mạng điện AC ở Việt Nam chạy 50 Hz). Giọng người nói nằm ở khoảng 100–4000 Hz. Câu hỏi:

> **Làm sao bỏ tiếng ù 50 Hz khỏi bản ghi mà vẫn giữ nguyên giọng nói?**

Suy nghĩ theo **miền tần số**: bản ghi = tổng của (giọng nói ở 100–4000 Hz) + (tiếng ù ở đúng 50 Hz). Nếu ta có một "cái sàng" cho **đi qua mọi tần số TRỪ vùng quanh 50 Hz**, ta giải quyết được. "Cái sàng theo tần số" đó **chính là một bộ lọc** (ở đây là **band-stop / notch** quanh 50 Hz).

Đây không phải ví dụ lẻ. **Lọc** là tác vụ trung tâm của xử lý tín hiệu:

| Mục đích | Ví dụ thực tế | Loại lọc |
| --- | --- | --- |
| **Loại nhiễu (denoise)** | Bỏ tiếng ù 50/60 Hz, bỏ hiss tần cao | notch / low-pass |
| **Tách băng tần** | Tách bass / mid / treble trong equalizer | band-pass nhiều dải |
| **Làm mượt (smoothing)** | Làm mịn đường nhịp tim ECG đầy gai | low-pass |
| **Làm nét (sharpen)** | Tăng cạnh ảnh, nhấn chi tiết tần cao | high-pass |
| **Chống aliasing** | Cắt tần > Nyquist trước khi lấy mẫu | low-pass |

💡 **Hai mặt của cùng một đồng xu.** Ở [Tier 1 L04](../../01-Foundations/lesson-04-convolution/) bạn đã làm mịn tín hiệu bằng cách **tích chập với cửa sổ trung bình**. Đó *là* một bộ lọc low-pass — chỉ là ta chưa gọi tên. Bài này gọi đúng tên, đo nó bằng tần số, và mở rộng sang 4 loại + 2 kiến trúc (FIR/IIR).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Tại sao không cắt 50 Hz trực tiếp trên dạng sóng thời gian?"* — Vì trên trục thời gian, tiếng ù và giọng nói **trộn lẫn** thành một đường sóng duy nhất, không tách bằng mắt được. Chỉ khi chuyển sang **tần số** (nhờ Fourier) chúng mới nằm ở các vị trí khác nhau và tách được.
- *"Lọc làm mất thông tin không?"* — Có. Lọc là **hữu ý vứt bỏ** một phần phổ. Nghệ thuật là vứt đúng phần rác mà giữ phần cần.

📝 **Tóm tắt mục 1.**
- Lọc = "cái sàng theo tần số": cho qua băng nào, chặn băng nào.
- 4 mục đích chính: denoise, tách băng, làm mượt, làm nét.
- Tư duy đúng là **miền tần số**, không phải miền thời gian.
- Làm mịn bằng tích chập (Tier 1) chính là lọc low-pass.

---

## 2. Bốn loại lọc theo băng tần

💡 **Trực giác.** Hãy hình dung trục tần số từ 0 (DC, không dao động) đến $f_s/2$ (Nyquist, dao động nhanh nhất ghi được). Một bộ lọc gắn một "độ trong suốt" cho mỗi tần số: **1 = cho qua hoàn toàn, 0 = chặn hoàn toàn**. Bốn cách tô vùng cho/chặn cho ra bốn loại lọc.

### 2.1. Đáp ứng tần số lý tưởng (brick-wall)

Gọi $f_c$ là **tần số cắt (cutoff)** — ranh giới cho/chặn. Bốn loại lý tưởng:

| Loại | Cho qua | Chặn | Dùng để |
| --- | --- | --- | --- |
| **Low-pass (LP)** | $f < f_c$ | $f > f_c$ | giữ tần thấp → làm mượt, bỏ hiss |
| **High-pass (HP)** | $f > f_c$ | $f < f_c$ | giữ tần cao → làm nét, bỏ trôi DC |
| **Band-pass (BP)** | $f_1 < f < f_2$ | ngoài dải | giữ đúng một băng → tách kênh radio |
| **Band-stop (BS / notch)** | ngoài dải | $f_1 < f < f_2$ | bỏ đúng một băng → diệt ù 50 Hz |

"Brick-wall" = bức tường gạch: đáp ứng nhảy thẳng đứng từ 1 xuống 0 tại $f_c$. **Đẹp trên giấy, không tồn tại ngoài đời.**

**4 ví dụ cụ thể** (giả sử lấy mẫu $f_s = 8000$ Hz nên Nyquist = 4000 Hz):

1. **LP $f_c = 3400$ Hz** — giữ giọng điện thoại, cắt tần cao thừa. Phổ ở 200 Hz: qua; ở 3800 Hz: chặn.
2. **HP $f_c = 80$ Hz** — bỏ tiếng "ầm" tần thấp (rung bàn, gió thổi micro), giữ giọng. Phổ ở 40 Hz: chặn; ở 500 Hz: qua.
3. **BP $f_1 = 300, f_2 = 3400$ Hz** — "băng thoại" tiêu chuẩn điện thoại. Ở 100 Hz: chặn; ở 1000 Hz: qua; ở 3800 Hz: chặn.
4. **BS $f_1 = 49, f_2 = 51$ Hz** — notch hẹp quanh 50 Hz. Ở 50 Hz: chặn; ở 200 Hz và 20 Hz: qua.

### 2.2. Lý tưởng vs thực tế

⚠ **Lỗi thường gặp — tưởng cắt được "tường gạch".** Bộ lọc lý tưởng có đáp ứng xung $h[n]$ là hàm **sinc** kéo dài **vô hạn về cả hai phía** (kể cả $n < 0$, tức cần biết tương lai). Không cài được. Thực tế ta **cắt ngắn** $h[n]$, và cái giá phải trả hiện ra ở 4 đặc trưng:

| Đặc trưng | Lý tưởng | Thực tế |
| --- | --- | --- |
| **Vùng chuyển (transition band)** | rộng 0 (thẳng đứng) | có độ dốc hữu hạn |
| **Roll-off** | vô hạn dB/octave | hữu hạn, càng dốc càng cần bậc cao |
| **Ripple** (gợn sóng) | 0 ở cả passband & stopband | có gợn nhỏ |
| **Suy hao stopband** | $-\\infty$ dB | hữu hạn (vd $-40, -60$ dB) |

Ba thuật ngữ chốt:

- **Cutoff $f_c$**: thường định nghĩa tại điểm đáp ứng tụt còn $-3$ dB (tức $|H| = 1/\\sqrt{2} \\approx 0.707$ về biên độ, = nửa công suất).
- **Roll-off**: độ dốc của vùng chuyển, đo bằng **dB/octave** (mỗi lần gấp đôi tần số) hoặc **dB/decade** (mỗi lần ×10 tần số). Lọc bậc 1: $-6$ dB/octave. Bậc 2: $-12$ dB/octave. Bậc $N$: $-6N$ dB/octave.
- **Ripple**: gợn sóng dư trong passband (làm méo biên độ) hoặc stopband (rò rỉ tần số đáng lẽ chặn).

🔁 **Dừng lại tự kiểm tra.** Một bộ lọc bậc 3 có roll-off bao nhiêu dB/octave? Để chặn tốt hơn 20 dB ở một octave ngoài cutoff thì bậc tối thiểu là bao nhiêu?

<details><summary>Đáp án</summary>

Bậc 3 → $-6 \\times 3 = -18$ dB/octave. Muốn $\\geq 20$ dB tại 1 octave: cần $6N \\geq 20 \\Rightarrow N \\geq 3.33 \\Rightarrow N = 4$ (bậc 4, $-24$ dB/octave). Bậc 3 chỉ cho 18 dB, chưa đủ.
</details>

📝 **Tóm tắt mục 2.**
- 4 loại: LP, HP, BP, BS — phân theo vùng tần số cho qua.
- Lý tưởng = brick-wall, đáp ứng xung sinc vô hạn → không cài được.
- Thực tế trả giá: transition band, roll-off hữu hạn, ripple.
- Bậc $N$ → roll-off $\\approx -6N$ dB/octave.

---

## 3. FIR — Bộ lọc đáp ứng xung hữu hạn

### 3.1. Định nghĩa: FIR chính là tích chập

**(a) Là gì.** FIR (Finite Impulse Response) tính mỗi mẫu output từ **một số hữu hạn** mẫu input gần nhất:

$$y[n] = \\sum_{k=0}^{M} b_k\\, x[n-k] = b_0 x[n] + b_1 x[n-1] + \\dots + b_M x[n-M]$$

Dãy hệ số $\\{b_0, b_1, \\dots, b_M\\}$ gọi là **kernel** (hay **tap**). Số tap là $M+1$; $M$ là **bậc (order)** của lọc.

**(b) Vì sao gọi là "đáp ứng xung hữu hạn".** Cho input là xung đơn vị $\\delta[n]$ ($\\delta[0]=1$, còn lại $=0$). Thay vào: $y[n] = b_n$. Tức **đáp ứng xung $h[n]$ của FIR chính là dãy hệ số $b_k$** — và nó **hữu hạn**, chỉ kéo dài $M+1$ mẫu rồi tắt hẳn. Hết tap → hết đáp ứng.

**(c) Liên hệ tích chập.** So với công thức tích chập rời rạc từ [Tier 1 L04](../../01-Foundations/lesson-04-convolution/):

$$(x * h)[n] = \\sum_k h[k]\\, x[n-k]$$

→ **FIR = tích chập của input với kernel $h = b$.** Không có gì mới — chỉ là cùng phép toán "lật–trượt–nhân–cộng", giờ gọi tên là "lọc".

### 3.2. Walk-through bằng số — moving average 3 điểm

Lấy FIR low-pass đơn giản nhất: **trung bình trượt 3 điểm**, kernel $b = [\\tfrac{1}{3}, \\tfrac{1}{3}, \\tfrac{1}{3}]$ (3 tap, bậc 2). Công thức:

$$y[n] = \\tfrac{1}{3}x[n] + \\tfrac{1}{3}x[n-1] + \\tfrac{1}{3}x[n-2]$$

Input nhiễu (coi $x[n]=0$ với $n<0$): $x = [\\,6,\\ 2,\\ 7,\\ 3,\\ 8,\\ 4\\,]$ (gai lên xuống mạnh).

| $n$ | $x[n]$ | Phép tính | $y[n]$ |
| --- | --- | --- | --- |
| 0 | 6 | $(6+0+0)/3$ | $2.00$ |
| 1 | 2 | $(2+6+0)/3$ | $2.67$ |
| 2 | 7 | $(7+2+6)/3$ | $5.00$ |
| 3 | 3 | $(3+7+2)/3$ | $4.00$ |
| 4 | 8 | $(8+3+7)/3$ | $6.00$ |
| 5 | 4 | $(4+8+3)/3$ | $5.00$ |

Quan sát: input nhảy $6 \\to 2 \\to 7$ (biên độ gai $\\approx 5$); output $2 \\to 2.67 \\to 5$ **mượt hơn hẳn** (chênh nhỏ lại). Trung bình trượt **nén thành phần tần cao** (gai) → đúng là một **low-pass**.

### 3.3. Hai tính chất vàng của FIR

⭐ **Luôn ổn định (always stable).** Output là tổng **hữu hạn** các input có biên độ giới hạn → output không thể bùng vô hạn. Không có hồi tiếp nên không có vòng lặp khuếch đại. (So với IIR ở mục 4 — có thể bất ổn.)

⭐ **Tuyến tính pha (linear phase) khi kernel đối xứng.** Nếu $b_k = b_{M-k}$ (kernel đối xứng gương), mọi tần số bị **trễ cùng một lượng thời gian** $= M/2$ mẫu. Hệ quả: **không méo dạng sóng** — chỉ dịch trễ đều. Cực kỳ quý cho audio và ảnh (giữ phase = giữ "hình dáng" tín hiệu).

⚠ **Lỗi thường gặp — quên độ trễ pha (group delay).** Cả với FIR tuyến tính pha, output bị **trễ $M/2$ mẫu** so với input. Nếu bạn so input và output căn theo cùng chỉ số $n$ mà quên dịch, sẽ tưởng lọc "làm lệch tín hiệu". Thực ra chỉ là trễ đều, dịch lại $M/2$ là khớp. FIR bậc cao → kernel dài → **trễ lớn** (nhược điểm so với IIR).

❓ **Câu hỏi tự nhiên.**
- *"FIR bậc càng cao càng tốt?"* — Cắt càng dốc nhưng **trễ càng lớn** và **tính càng nặng** ($M+1$ phép nhân/mẫu). Đánh đổi.
- *"Trong Go/Python tôi tự viết vòng for à?"* — Với học tập thì có; production dùng thư viện (NumPy \`np.convolve\`, SciPy \`lfilter\`) đã tối ưu (và FFT-convolution cho kernel dài, xem [Tier 2 L08](../../02-Fourier/lesson-03-fourier-transform/)).

📝 **Tóm tắt mục 3.**
- FIR: $y[n]=\\sum b_k x[n-k]$ = tích chập với kernel $b$.
- Đáp ứng xung $h = b$, hữu hạn $M+1$ mẫu.
- Luôn ổn định; tuyến tính pha nếu kernel đối xứng.
- Giá: trễ $M/2$ mẫu, $M+1$ phép nhân mỗi mẫu.

---

## 4. IIR — Bộ lọc đáp ứng xung vô hạn

### 4.1. Định nghĩa: thêm hồi tiếp

**(a) Là gì.** IIR (Infinite Impulse Response) dùng cả **output cũ** để tính output mới — có **hồi tiếp (feedback)**:

$$y[n] = \\underbrace{\\sum_{k=0}^{M} b_k\\, x[n-k]}_{\\text{feed-forward (như FIR)}} - \\underbrace{\\sum_{k=1}^{N} a_k\\, y[n-k]}_{\\text{feedback (mới)}}$$

Các $a_k$ là hệ số hồi tiếp (chú ý dấu trừ và $k$ bắt đầu từ 1: $y[n]$ không phụ thuộc chính nó).

**(b) Vì sao "đáp ứng xung vô hạn".** Vì $y$ phụ thuộc $y$ cũ, một xung đầu vào **lan mãi không tắt hẳn** — đáp ứng xung $h[n]$ kéo dài **vô hạn** (giảm dần nhưng không bao giờ chính xác bằng 0). Trái ngược FIR.

**(c) Vì sao cần IIR.** Hồi tiếp cho phép đạt **roll-off dốc với rất ít hệ số**. Một IIR bậc 2 có thể dốc bằng một FIR vài chục tap. Tiết kiệm tính toán và bộ nhớ — đó là lý do tồn tại của IIR. Tụ điện trong [mạch RC](../../../Electronics/01-Fundamentals/lesson-04-capacitor-rc/) "nhớ" điện áp cũ → bản analog của hồi tiếp; mạch RC chính là IIR 1 cực.

### 4.2. Ví dụ bộ lọc 1 cực (one-pole low-pass) + walk-through

Bộ IIR đơn giản nhất — **1 cực (one-pole)**, hệ số duy nhất $\\alpha \\in (0,1)$:

$$y[n] = (1-\\alpha)\\,x[n] + \\alpha\\,y[n-1]$$

(dạng $b_0 = 1-\\alpha$, $a_1 = -\\alpha$). Đây là **bộ làm mượt mũ (exponential moving average)** — nền của low-pass số rẻ tiền nhất.

Lấy $\\alpha = 0.5$, input $x = [\\,8,\\ 0,\\ 0,\\ 0,\\ 0\\,]$ (một xung biên độ 8), $y[-1]=0$:

| $n$ | Phép tính $0.5\\,x[n] + 0.5\\,y[n-1]$ | $y[n]$ |
| --- | --- | --- |
| 0 | $0.5(8) + 0.5(0)$ | $4.000$ |
| 1 | $0.5(0) + 0.5(4)$ | $2.000$ |
| 2 | $0.5(0) + 0.5(2)$ | $1.000$ |
| 3 | $0.5(0) + 0.5(1)$ | $0.500$ |
| 4 | $0.5(0) + 0.5(0.5)$ | $0.250$ |

Đuôi $4, 2, 1, 0.5, 0.25, \\dots$ giảm **theo cấp số nhân nhưng không bao giờ tới 0** → đó là "đáp ứng xung vô hạn". Chỉ **1 hệ số hồi tiếp** mà tạo được hiệu ứng làm mượt kéo dài — sức mạnh của IIR.

### 4.3. Cái giá: IIR có thể BẤT ỔN

⚠ **Lỗi nghiêm trọng — IIR bất ổn (instability).** Với one-pole, nếu $|\\alpha| \\geq 1$ thì hồi tiếp **khuếch đại thay vì giảm dần**. Thử $\\alpha = 1.2$, input xung $x=[1,0,0,\\dots]$:

$$y: \\ 1,\\ 1.2,\\ 1.44,\\ 1.728,\\ 2.07,\\ \\dots \\to \\infty$$

Output **bùng nổ vô hạn** dù input đã tắt. Tổng quát: IIR ổn định **chỉ khi mọi cực (pole) nằm trong vòng tròn đơn vị** $|z|<1$ trên mặt phẳng $z$. Sai một hệ số → bộ lọc gào lên. (FIR không bao giờ gặp lỗi này — đó là cái giá ngược lại của sự tiện lợi.)

⚠ **Lỗi thường gặp — IIR méo pha (nonlinear phase).** IIR **gần như không bao giờ tuyến tính pha**: các tần số khác nhau bị trễ **khác nhau** → dạng sóng bị **méo (phase distortion)**. Nghe nhạc/đo ECG thì đây là vấn đề thật. Cách chữa: lọc xuôi rồi lọc ngược (zero-phase, vd SciPy \`filtfilt\`) để triệt tiêu pha — nhưng phải xử lý offline (cần toàn bộ tín hiệu).

❓ **Câu hỏi tự nhiên.**
- *"Vậy chọn FIR hay IIR?"* — FIR khi cần **pha tuyến tính** (audio chất lượng, ảnh) và chấp nhận tính nặng. IIR khi cần **rẻ/nhanh, real-time** và không quá khắt khe về pha (điều khiển, lọc thô).
- *"IIR có lan lỗi số học không?"* — Có. Hồi tiếp tích lũy sai số làm tròn (rounding); thiết kế thực tế chia thành các **second-order section (biquad)** để giảm.

📝 **Tóm tắt mục 4.**
- IIR: thêm hồi tiếp $-\\sum a_k y[n-k]$ → đáp ứng xung vô hạn.
- Bậc thấp đạt roll-off dốc → rẻ hơn FIR.
- Rủi ro: **bất ổn** nếu cực ra ngoài vòng đơn vị; **méo pha**.
- One-pole: $y[n]=(1-\\alpha)x[n]+\\alpha y[n-1]$, ổn định khi $|\\alpha|<1$.

---

## 5. Đáp ứng tần số $|H(f)|$ — đọc bộ lọc qua phổ

### 5.1. Lọc trong thời gian = nhân trong tần số

💡 **Trực giác — đây là lý do Fourier quan trọng.** [Định lý tích chập (Tier 2 L08)](../../02-Fourier/lesson-03-fourier-transform/) nói:

$$y = x * h \\quad\\Longleftrightarrow\\quad Y(f) = X(f)\\cdot H(f)$$

Tức **lọc (tích chập) trong miền thời gian = NHÂN phổ trong miền tần số.** $H(f)$ — biến đổi Fourier của đáp ứng xung $h$ — gọi là **đáp ứng tần số**. $|H(f)|$ cho biết mỗi tần số được **nhân với hệ số bao nhiêu**:

- $|H(f)| = 1$ tại tần $f$ → cho qua nguyên.
- $|H(f)| = 0$ → chặn sạch.
- $|H(f)| = 0.5$ → giảm còn nửa biên độ ($-6$ dB).

→ Muốn biết một bộ lọc "làm gì với tín hiệu", **vẽ $|H(f)|$**. Hình dạng đường này *chính là* "cái sàng tần số" ở mục 1.

### 5.2. $|H(f)|$ của FIR từ hệ số

Với FIR, $H$ là Fourier của kernel $b$. Tính tại tần số chuẩn hóa $\\omega = 2\\pi f/f_s$:

$$H(\\omega) = \\sum_{k=0}^{M} b_k\\, e^{-j\\omega k}, \\qquad |H(\\omega)| = \\Big|\\sum_k b_k e^{-j\\omega k}\\Big|$$

**Ví dụ moving-average 3 điểm** ($b=[\\tfrac13,\\tfrac13,\\tfrac13]$), tính $|H|$ tại vài tần số:

| $f$ (so với $f_s$) | $\\omega$ | $|H(\\omega)|$ | Diễn giải |
| --- | --- | --- | --- |
| $0$ (DC) | $0$ | $\\tfrac13|1+1+1| = 1.00$ | tần thấp: qua nguyên |
| $f_s/6$ | $\\pi/3$ | $\\tfrac13|1+e^{-j\\pi/3}+e^{-j2\\pi/3}| = 0.67$ | giảm |
| $f_s/3$ | $2\\pi/3$ | $\\tfrac13|1+e^{-j2\\pi/3}+e^{-j4\\pi/3}| = 0.00$ | **chặn sạch** |
| $f_s/2$ | $\\pi$ | $\\tfrac13|1-1+1| = 0.33$ | tần cao: yếu |

$|H|$ đi từ 1 (DC) xuống 0 → đúng là **low-pass**. (Điểm 0 tại $f_s/3$ là "null" đặc trưng của moving-average.)

### 5.3. Ba thông số đọc từ $|H(f)|$

| Thông số | Đọc trên đồ thị | Ý nghĩa |
| --- | --- | --- |
| **Cutoff $f_c$** | nơi $|H|$ tụt còn $0.707$ ($-3$ dB) | ranh giới pass/stop |
| **Roll-off** | độ dốc sau cutoff (dB/octave) | bậc càng cao càng dốc |
| **Ripple** | gợn sóng nhỏ trong pass/stop band | sai số biên độ |

🔁 **Dừng lại tự kiểm tra.** Một bộ lọc có $|H(f_c)| = 0.707$. Đó là $-3$ dB. Vì sao gọi là "nửa công suất"?

<details><summary>Đáp án</summary>

Công suất tỉ lệ **bình phương biên độ**: $|H|^2 = 0.707^2 = 0.5$. Biên độ còn $70.7\\%$ nhưng công suất còn đúng **một nửa**. Theo dB: $20\\log_{10}(0.707) = -3.01$ dB. Đó là vì sao điểm $-3$ dB = điểm nửa công suất = định nghĩa chuẩn của cutoff.
</details>

📝 **Tóm tắt mục 5.**
- Lọc = nhân phổ: $Y(f)=X(f)H(f)$ (định lý tích chập).
- $|H(f)|$ = "cái sàng tần số"; $=1$ cho qua, $=0$ chặn.
- $H_{FIR}(\\omega)=\\sum b_k e^{-j\\omega k}$ — tính trực tiếp từ kernel.
- Cutoff = điểm $-3$ dB ($|H|=0.707$) = nửa công suất.

---

## 6. Thiết kế cơ bản: windowed-sinc cho FIR low-pass

### 6.1. Vì sao là sinc?

💡 **Trực giác.** Ở mục 2 ta nói: low-pass lý tưởng (brick-wall trong tần số) có đáp ứng xung là **hàm sinc** trong thời gian. Vì $|H(f)|$ là hình chữ nhật, và biến đổi Fourier ngược của hình chữ nhật chính là sinc:

$$h_{\\text{ideal}}[n] = 2 f_c'\\,\\operatorname{sinc}(2 f_c'\\, n), \\qquad \\operatorname{sinc}(x) = \\frac{\\sin(\\pi x)}{\\pi x}$$

với $f_c' = f_c/f_s$ (cutoff chuẩn hóa). Vấn đề: sinc kéo dài vô hạn cả hai phía → không cài. **Giải pháp: cắt ngắn + làm mềm hai mép.**

### 6.2. Quy trình windowed-sinc (4 bước)

1. **Chọn** cutoff chuẩn hóa $f_c'$ và số tap $M+1$ (lẻ để có tâm đối xứng → tuyến tính pha).
2. **Lấy mẫu sinc** quanh tâm: $h[n] = 2f_c'\\operatorname{sinc}(2f_c'(n - M/2))$, $n = 0..M$.
3. **Nhân cửa sổ (window)** — vd Hamming $w[n]$ — để bóp đuôi về 0 mượt, giảm ripple: $h[n] \\leftarrow h[n]\\cdot w[n]$.
4. **Chuẩn hóa** sao cho $\\sum h[n] = 1$ (gain DC = 1).

⚠ **Lỗi thường gặp — cắt sinc kiểu "chặt phăng".** Nếu cắt sinc mà KHÔNG nhân window (tức dùng cửa sổ chữ nhật), hai mép gãy đột ngột → **hiện tượng Gibbs**: ripple lớn dao động quanh cutoff trong $|H(f)|$. Luôn nhân một window mềm (Hamming/Hann/Blackman) để dập ripple.

### 6.3. Bậc filter ↔ độ dốc — ví dụ số

Số tap quyết định độ dốc transition. **4 ví dụ** (low-pass $f_c' = 0.1$, ước lượng độ rộng vùng chuyển $\\Delta f \\approx 4/(M{+}1)$ với Hamming):

| Số tap $M+1$ | Độ rộng chuyển $\\Delta f'$ (xấp xỉ) | Roll-off | Trễ $M/2$ |
| --- | --- | --- | --- |
| 11 | $\\approx 0.36$ | thoải | 5 mẫu |
| 21 | $\\approx 0.19$ | dốc hơn | 10 mẫu |
| 51 | $\\approx 0.08$ | dốc | 25 mẫu |
| 101 | $\\approx 0.04$ | rất dốc (gần brick-wall) | 50 mẫu |

→ **Nhiều tap = dốc hơn nhưng trễ lớn hơn và tính nặng hơn.** Đây là đánh đổi cốt lõi khi thiết kế FIR. Để chuyển LP thành HP: lấy "all-pass trừ low-pass" (spectral inversion). Để thành BP: nhân kernel LP với cosin tại tần số trung tâm (modulation). Để thành BS: cộng LP với HP.

🔁 **Dừng lại tự kiểm tra.** Bạn cần FIR low-pass vùng chuyển hẹp $\\Delta f' \\approx 0.02$. Ước lượng số tap?

<details><summary>Đáp án</summary>

$\\Delta f' \\approx 4/(M{+}1) \\Rightarrow M{+}1 \\approx 4/0.02 = 200$ tap. Trễ $\\approx 100$ mẫu. Hẹp gấp đôi → tap gấp đôi → trễ gấp đôi. Nếu trễ 100 mẫu là quá lớn cho ứng dụng real-time, cân nhắc IIR (ít hệ số) và chấp nhận méo pha.
</details>

📝 **Tóm tắt mục 6.**
- LP lý tưởng ↔ đáp ứng xung sinc (vô hạn) → cắt ngắn + nhân window.
- Quy trình: lấy mẫu sinc → nhân window → chuẩn hóa DC=1.
- Quên window → Gibbs ripple.
- Nhiều tap → dốc hơn nhưng trễ & tính nặng hơn.

---

## 7. Ứng dụng & liên hệ với bộ lọc analog

### 7.1. Ứng dụng thực tế

1. **Audio / nhạc** — equalizer (nhiều band-pass), bỏ ù 50/60 Hz (notch), chống aliasing trước khi resample. Xem tiếp [L13 — Audio DSP](../lesson-02-audio-dsp/).
2. **Y sinh** — lọc ECG: HP bỏ trôi đường nền (baseline wander < 0.5 Hz), notch 50 Hz bỏ nhiễu điện lưới, LP bỏ nhiễu cơ tần cao.
3. **Truyền thông / radio** — band-pass chọn đúng kênh, lọc IF, định dạng xung.
4. **Ảnh** — LP làm mờ/khử nhiễu (Gaussian blur = FIR 2D), HP làm nét (unsharp mask); CNN trong AI học chính các kernel này (xem [Tier 1 L04](../../01-Foundations/lesson-04-convolution/)).
5. **Cảm biến / IoT** — one-pole IIR làm mượt số đọc cảm biến nhiệt độ/gia tốc rẻ và nhanh.
6. **Điều khiển** — lọc nhiễu khỏi tín hiệu hồi tiếp trong vòng điều khiển (ưu tiên IIR vì độ trễ thấp).

### 7.2. Liên hệ với bộ lọc analog (Electronics)

💡 **Cùng một ý tưởng, hai miền.** [Bộ lọc RC analog (Electronics L07)](../../../Electronics/01-Fundamentals/lesson-07-filters/) cũng là low-pass: tụ điện cho tần thấp qua, chặn tần cao. Cutoff $f_c = \\dfrac{1}{2\\pi RC}$.

| | Analog (RC, Electronics) | Số (digital, bài này) |
| --- | --- | --- |
| Cài đặt | điện trở + tụ điện | dãy hệ số + phép cộng/nhân |
| Cutoff | $f_c = 1/(2\\pi RC)$ | chọn qua hệ số $b, a$ |
| Bản chất | tụ "nhớ" điện áp = hồi tiếp | one-pole IIR $y[n]=(1-\\alpha)x[n]+\\alpha y[n-1]$ |
| Roll-off RC 1 cấp | $-6$ dB/octave | one-pole IIR cũng $-6$ dB/octave |
| Đổi cutoff | thay R hoặc C (phần cứng) | đổi $\\alpha$ (1 dòng code) |

→ **Mạch RC 1 cấp = IIR one-pole.** Đó là vì sao [tụ điện & mạch RC (Electronics L04)](../../../Electronics/01-Fundamentals/lesson-04-capacitor-rc/) là tiền đề: hồi tiếp số $\\alpha y[n-1]$ là cách tụ "nhớ" trạng thái cũ. Ưu thế của lọc số: đổi cutoff = đổi một con số, không cần đổi linh kiện; và làm được brick-wall (FIR nhiều tap) mà analog gần như bất khả.

📝 **Tóm tắt mục 7.**
- Lọc số có mặt khắp: audio, y sinh, radio, ảnh, cảm biến, điều khiển.
- RC analog 1 cấp = IIR one-pole; cùng roll-off $-6$ dB/octave.
- Lọc số linh hoạt hơn (đổi cutoff = đổi số) và đạt được đáp ứng analog khó làm.

---

## Bài tập

> Làm trước, rồi đối chiếu **Lời giải chi tiết** bên dưới.

**Bài 1 (FIR walk-through).** Cho FIR kernel $b = [0.25, 0.5, 0.25]$ (low-pass "tam giác") và input $x = [4, 0, 8, 0, 4]$ ($x[n]=0$ với $n<0$). Tính $y[0..4]$ theo $y[n]=\\sum_k b_k x[n-k]$. Kernel có đối xứng (tuyến tính pha) không? Trễ bao nhiêu mẫu?

**Bài 2 (IIR walk-through + ổn định).** Cho one-pole $y[n]=(1-\\alpha)x[n]+\\alpha y[n-1]$ với $\\alpha=0.8$, input xung $x=[10,0,0,0,0]$, $y[-1]=0$. Tính $y[0..4]$. Output có tiến về 0 không? Nếu đổi $\\alpha=1.5$ thì điều gì xảy ra với 3 mẫu đầu?

**Bài 3 (Chọn loại lọc).** Với mỗi tình huống, chọn loại (LP/HP/BP/BS) và nêu vùng tần số: (a) bỏ tiếng ù 60 Hz khỏi bản ghi; (b) bỏ trôi đường nền < 0.5 Hz khỏi ECG; (c) tách giọng điện thoại 300–3400 Hz; (d) làm mượt cảm biến nhiệt độ nhiễu tần cao.

**Bài 4 (Bậc ↔ roll-off).** (a) Lọc bậc 5 roll-off bao nhiêu dB/octave? (b) Cần suy hao ≥ 40 dB ở 2 octave ngoài cutoff — bậc tối thiểu? (c) FIR 81 tap, low-pass — trễ bao nhiêu mẫu?

**Bài 5 (Đáp ứng tần số).** Cho FIR $b = [0.5, 0.5]$ (trung bình 2 điểm). (a) Tính $|H(\\omega)|$ tại $\\omega=0$ và $\\omega=\\pi$. (b) Đây là LP hay HP? (c) FIR $b=[0.5, -0.5]$ thì $|H|$ tại $\\omega=0$ và $\\omega=\\pi$ là gì — loại nào?

**Bài 6 (FIR vs IIR).** Một ứng dụng real-time cần roll-off rất dốc nhưng độ trễ phải cực nhỏ, và pha méo chấp nhận được. Nên FIR hay IIR? Giải thích đánh đổi.

---

## Lời giải chi tiết

### Bài 1

Kernel $b=[b_0,b_1,b_2]=[0.25,0.5,0.25]$, $y[n]=0.25\\,x[n]+0.5\\,x[n-1]+0.25\\,x[n-2]$.

| $n$ | Phép tính | $y[n]$ |
| --- | --- | --- |
| 0 | $0.25(4)+0.5(0)+0.25(0)$ | $1.0$ |
| 1 | $0.25(0)+0.5(4)+0.25(0)$ | $2.0$ |
| 2 | $0.25(8)+0.5(0)+0.25(4)$ | $3.0$ |
| 3 | $0.25(0)+0.5(8)+0.25(0)$ | $4.0$ |
| 4 | $0.25(4)+0.5(0)+0.25(8)$ | $3.0$ |

$y=[1,2,3,4,3]$. **Đối xứng**: $b_0=b_2=0.25$ → có, tuyến tính pha. **Trễ** $=M/2 = 2/2 = 1$ mẫu. Lưu ý input có gai $4,0,8,0,4$ (chênh tới 8) còn output $1,2,3,4,3$ mượt hơn → low-pass.

### Bài 2

$\\alpha=0.8$: $y[n]=0.2\\,x[n]+0.8\\,y[n-1]$.

| $n$ | Phép tính | $y[n]$ |
| --- | --- | --- |
| 0 | $0.2(10)+0.8(0)$ | $2.000$ |
| 1 | $0.2(0)+0.8(2)$ | $1.600$ |
| 2 | $0.2(0)+0.8(1.6)$ | $1.280$ |
| 3 | $0.2(0)+0.8(1.28)$ | $1.024$ |
| 4 | $0.2(0)+0.8(1.024)$ | $0.819$ |

Đuôi nhân $0.8$ mỗi bước → giảm hình học, **tiến về 0** (ổn định vì $|\\alpha|=0.8<1$), nhưng không bao giờ chính xác bằng 0 → đáp ứng xung vô hạn.

Với $\\alpha=1.5$: $y[0]=0.2(10)=2$? Cẩn thận — hệ số feed-forward là $1-\\alpha = -0.5$. $y[0]=-0.5(10)+1.5(0)=-5$; $y[1]=-0.5(0)+1.5(-5)=-7.5$; $y[2]=1.5(-7.5)=-11.25$. **Bùng nổ (về độ lớn)** vì $|\\alpha|=1.5>1$ → bất ổn.

### Bài 3

| | Loại | Vùng tần số |
| --- | --- | --- |
| (a) ù 60 Hz | **BS / notch** | chặn hẹp quanh 60 Hz |
| (b) trôi nền < 0.5 Hz | **HP** | cắt dưới ~0.5 Hz, giữ phần trên |
| (c) giọng 300–3400 Hz | **BP** | cho qua 300–3400 Hz |
| (d) nhiễu cao cảm biến | **LP** | cắt tần cao, giữ tần thấp (biến thiên chậm) |

### Bài 4

(a) Bậc 5 → $-6\\times5 = -30$ dB/octave.
(b) Cần $\\geq 40$ dB ở **2 octave**: mỗi octave cho $6N$ dB, 2 octave cho $12N$ dB. $12N \\geq 40 \\Rightarrow N \\geq 3.33 \\Rightarrow N=4$ (bậc 4 → $48$ dB ở 2 octave, đủ; bậc 3 chỉ $36$ dB, thiếu).
(c) FIR 81 tap → $M=80$ → trễ $M/2 = 40$ mẫu.

### Bài 5

(a) $H(\\omega)=0.5+0.5e^{-j\\omega}$.
- $\\omega=0$: $|0.5+0.5|=1.0$.
- $\\omega=\\pi$: $e^{-j\\pi}=-1$, $|0.5-0.5|=0$.
(b) DC qua (1.0), tần cao chặn (0) → **low-pass**.
(c) $b=[0.5,-0.5]$: $H=0.5-0.5e^{-j\\omega}$.
- $\\omega=0$: $|0.5-0.5|=0$ → DC bị chặn.
- $\\omega=\\pi$: $|0.5+0.5|=1$ → tần cao qua.
→ **high-pass** (đây là bộ "sai phân/difference", nhấn thay đổi nhanh = tần cao).

### Bài 6

Chọn **IIR**. Lý do: yêu cầu **roll-off dốc + trễ cực nhỏ** — IIR đạt độ dốc cao với rất ít hệ số nên **độ trễ thấp** (FIR muốn dốc tương đương phải dùng rất nhiều tap → trễ $M/2$ lớn). Đề đã nói **méo pha chấp nhận được** → bỏ được nhược điểm chính của IIR. Đánh đổi cần kiểm: phải đảm bảo **ổn định** (mọi cực trong vòng đơn vị) và để ý sai số làm tròn — thường cài bằng các biquad bậc 2 nối tiếp. Nếu pha mà quan trọng thì ngược lại phải chọn FIR và chấp nhận trễ.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Filter playground** — tín hiệu đa tần (vài sin + nhiễu), chọn loại lọc LP/HP/BP/BS + slider cutoff, xem tín hiệu vào/ra và phổ trước/sau (thấy băng bị cắt).
  2. **Đáp ứng tần số $|H(f)|$ theo bậc** — slider số tap → roll-off dốc hơn, gần brick-wall.
  3. **FIR vs IIR** — cùng cutoff, so số hệ số và dạng đáp ứng xung (FIR hữu hạn vs IIR đuôi vô hạn).

---

## Tham khảo & Bài tiếp theo

- **Tiền đề:** [Tích chập (Tier 1 L04)](../../01-Foundations/lesson-04-convolution/) · [Biến đổi Fourier (Tier 2 L08)](../../02-Fourier/lesson-03-fourier-transform/) · [Bộ lọc analog (Electronics L07)](../../../Electronics/01-Fundamentals/lesson-07-filters/) · [Tụ điện & RC (Electronics L04)](../../../Electronics/01-Fundamentals/lesson-04-capacitor-rc/)
- **Bài tiếp theo:** [L13 — Audio DSP](../lesson-02-audio-dsp/) — áp dụng lọc vào âm thanh thật: equalizer, echo/reverb, pitch, nén.
- **Đọc thêm:** Smith, *The Scientist and Engineer's Guide to Digital Signal Processing* (chương FIR/IIR, windowed-sinc) — bản miễn phí tại dspguide.com.
`;
