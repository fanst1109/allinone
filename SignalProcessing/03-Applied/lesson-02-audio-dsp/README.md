# Lesson 13 — Audio DSP (xử lý âm thanh số)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao DSP là nền của mọi app âm thanh**: equalizer trong Spotify, vang/echo trong karaoke, nén động (compression) trong podcast, đổi giọng "chipmunk" trong app vui.
- Cài đặt (hiểu cơ chế) **equalizer (EQ)** bằng nhiều bộ lọc band-pass song song, mỗi băng tần một gain riêng.
- Phân biệt **delay/echo FIR** ($y[n]=x[n]+\alpha\,x[n-D]$) với **reverb hồi tiếp IIR** ($y[n]=x[n]+\alpha\,y[n-D]$), và liên hệ với **convolution reverb** (tích chập với impulse response của phòng).
- Hiểu vì sao **resampling đổi cả cao độ lẫn tốc độ**, còn **pitch shift** giữ nguyên thời gian (sơ lược phase vocoder).
- Nắm khái niệm **nén động (dynamic range compression)**: threshold, ratio.
- Hiểu **biên độ/loudness, clipping, dither** — và vì sao chúng quyết định "nghe sạch hay rè".
- Biết trình duyệt làm DSP realtime bằng **Web Audio API**.

## Kiến thức tiền đề

- [Tier 3 — Lesson 12: Lọc số (digital filters)](../lesson-01-digital-filters/) — FIR/IIR, đáp ứng tần số. EQ và reverb đều là bộ lọc.
- [Tier 1 — Lesson 04: Tích chập (convolution)](../../01-Foundations/lesson-04-convolution/) — nền của FIR filter và convolution reverb.
- [Tier 1 — Lesson 02: Lấy mẫu & Nyquist (sampling)](../../01-Foundations/lesson-02-sampling-nyquist/) — vì sao resample sai gây **aliasing**.

Liên hệ ứng dụng âm nhạc: [Music](../../../Music/).

---

## 1. Vì sao học Audio DSP?

> **Mở bài — hai câu hỏi cụ thể:**
> 1. Echo trong phòng karaoke (giọng vọng lại nhỏ dần) được tạo bằng **phép gì**?
> 2. Khi app làm giọng bạn "chipmunk" (cao vống lên), nó làm bằng cách nào — và vì sao tua nhanh băng cassette cũng cho hiệu ứng tương tự?

Cả hai đều là **phép toán trên dãy mẫu (sample)** $x[n]$ — chính là DSP. Câu trả lời:

1. Echo = **cộng tín hiệu với bản trễ của chính nó**: $y[n]=x[n]+\alpha\,x[n-D]$. Đây là một **FIR filter** một tap trễ. Ta sẽ chứng minh bằng số ở §3.
2. Chipmunk = **resampling** (đọc mẫu nhanh hơn / ít mẫu hơn) → cao độ lên *và* thời lượng ngắn lại — y hệt tua nhanh cassette. Muốn cao độ lên mà **giữ thời lượng** thì cần **pitch shift** (§4).

Mọi tính năng âm thanh quen thuộc đều quy về vài phép DSP:

| Tính năng | Phép DSP cốt lõi | Mục |
|---|---|---|
| Equalizer (bass/treble) | nhiều band-pass song song + gain | §2 |
| Echo / vang | delay FIR + feedback IIR | §3 |
| Reverb "phòng hòa nhạc" | tích chập với impulse response | §3.4 |
| Chipmunk / chậm-trầm | resampling | §4.1 |
| Auto-tune / đổi cao độ giữ nhịp | pitch shift (phase vocoder) | §4.2 |
| "Loud" như nhạc thương mại | dynamic range compression | §5 |
| Tránh rè khi to | tránh clipping; dither khi giảm bit | §6 |

> 💡 **Trực giác.** Một file audio chỉ là một **dãy số** — ví dụ 44 100 số mỗi giây (sample rate 44.1 kHz), mỗi số là biên độ màng loa tại một thời điểm. "Hiệu chỉnh âm thanh" = "làm toán trên dãy số đó". Toàn bộ bài này là vài công thức cộng/nhân/trễ trên dãy số.

---

## 2. Equalizer (EQ)

### 2.1 EQ là gì và vì sao cần?

**(a) Là gì.** **Equalizer** là bộ chỉnh **độ lớn (gain) của từng dải tần số** một cách độc lập: tăng bass (tần thấp), giảm "tiếng mũi" 1 kHz, tăng treble (tần cao)...

**(b) Vì sao cần.** Tai người nghe từ ~20 Hz đến ~20 kHz. Một bản thu có thể "thiếu bass" hoặc "chói treble". Ta muốn **nhân biên độ của riêng những tần số đó** mà không đụng tần số khác. Lọc thông thấp/cao đơn lẻ ([Lesson 12](../lesson-01-digital-filters/)) chỉ cắt một phía; EQ là **nhiều band-pass song song**, mỗi băng một gain.

**(c) Ví dụ trực giác bằng số.** Cho EQ 3 băng: Low (0–250 Hz), Mid (250–4000 Hz), High (4–20 kHz). Đặt gain Low = +6 dB, Mid = 0 dB, High = −3 dB. Một thành phần 100 Hz biên độ 1.0 → ra $1.0 \times 10^{6/20} \approx 2.0$ (gấp đôi). Thành phần 8 kHz biên độ 1.0 → ra $1.0 \times 10^{-3/20} \approx 0.71$.

> 💡 **Trực giác.** EQ giống **bàn trộn nước nhiều vòi**: tách nước thành các "băng nhiệt độ", vặn to/nhỏ từng băng, rồi gộp lại. Tách = các band-pass; vặn = gain; gộp = cộng các băng.

### 2.2 Cơ chế: tách phổ → nhân gain → cộng lại

Gọi tín hiệu vào $x[n]$. Tách thành $K$ băng bằng $K$ bộ band-pass $h_k$:

$$x_k[n] = (h_k * x)[n] \quad (k=1\ldots K)$$

Nhân mỗi băng với gain tuyến tính $g_k$ rồi cộng:

$$y[n] = \sum_{k=1}^{K} g_k \, x_k[n]$$

Vì tích chập và cộng đều **tuyến tính**, toàn bộ EQ tương đương **một** bộ lọc duy nhất có đáp ứng tần số $H(f)=\sum_k g_k H_k(f)$ — đó là lý do EQ được vẽ bằng **một đường cong gain theo tần số**.

> **Đổi giữa gain tuyến tính và decibel (dB):**
> $$g_{\text{dB}} = 20\log_{10} g_{\text{lin}}, \qquad g_{\text{lin}} = 10^{\,g_{\text{dB}}/20}$$
> Vì sao dB? Tai nghe theo **tỉ lệ nhân**, không theo cộng. +6 dB ≈ gấp đôi biên độ; +20 dB = gấp 10 lần.

### 2.3 Bốn ví dụ EQ bằng số

Cho ba thành phần đầu vào (biên độ): 100 Hz = 1.0, 1 kHz = 1.0, 10 kHz = 1.0. EQ 3 băng như §2.1.

**Ví dụ 1 — "Bass boost" (Low +6, Mid 0, High 0):**
- 100 Hz: $1.0 \times 10^{6/20}=1.995 \approx 2.00$
- 1 kHz: $1.0 \times 10^{0}=1.00$
- 10 kHz: $1.0 \times 10^{0}=1.00$ → bass to gấp đôi, phần còn lại giữ nguyên.

**Ví dụ 2 — "Treble cut" (Low 0, Mid 0, High −6):**
- 10 kHz: $1.0 \times 10^{-6/20}=0.501 \approx 0.50$ → treble còn nửa, đỡ chói.

**Ví dụ 3 — "Telephone / điện thoại" (Low −20, Mid +3, High −20):**
- 100 Hz: $10^{-20/20}=0.10$; 1 kHz: $10^{3/20}=1.41$; 10 kHz: $0.10$.
- Chỉ còn dải giữa → nghe như loa điện thoại.

**Ví dụ 4 — "Loudness ấm" (Low +4, Mid −2, High +4) — đường cong chữ U (smile EQ):**
- 100 Hz: $10^{4/20}=1.585$; 1 kHz: $10^{-2/20}=0.794$; 10 kHz: $1.585$.
- Lõm giữa, nâng hai đầu → nghe "đầy" hơn ở âm lượng nhỏ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tăng một băng quá nhiều có sao không?"* → Có. Nếu tổng các băng tại một tần số làm biên độ vượt 1.0 (full-scale), tín hiệu **clip** (méo, rè) — xem §6. Đẩy bass +12 dB rồi mở to là cách dễ làm rè nhất.
> - *"Các băng có chồng lấn không?"* → Có chút chồng lấn ở mép (đáp ứng band-pass không vuông tuyệt đối). Vì thế tổng các gain ở vùng chồng có thể cộng dồn — cần để ý.
> - *"Vì sao không chỉ dùng một low-pass + một high-pass?"* → Vì bạn muốn chỉnh **độc lập** nhiều dải, kể cả dải giữa. Một cặp low/high không cho bạn nâng riêng dải 2–4 kHz (vùng "hiện diện" của giọng hát).

> ⚠ **Lỗi thường gặp — cộng dB như cộng số thường.** Hai băng cùng +6 dB ở vùng chồng lấn **không** thành +12 dB một cách hiển nhiên. dB là log: phải đổi sang tuyến tính, cộng biên độ (nếu cùng pha) rồi đổi lại. $10^{6/20}+10^{6/20}=2(1.995)=3.99 \Rightarrow 20\log_{10}3.99 \approx 12.02$ dB — *trùng hợp* gần +12 ở đây vì cùng pha và bằng nhau, nhưng đừng tổng quát hóa: lệch pha thì kết quả khác hẳn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Gain +3 dB tương ứng hệ số tuyến tính bao nhiêu?
> 2. EQ là tuyến tính hay phi tuyến? Hệ quả là gì?
>
> <details><summary>Đáp án</summary>
>
> 1. $10^{3/20}=1.413$ — tăng ~41% biên độ (≈ gấp đôi *công suất*, vì công suất ∝ biên độ²).
> 2. Tuyến tính (chỉ gồm tích chập + cộng + nhân hằng). Hệ quả: cả EQ thu gọn thành **một** đáp ứng tần số $H(f)$, và thứ tự các băng không ảnh hưởng kết quả.
> </details>

> 📝 **Tóm tắt §2.**
> - EQ = nhiều **band-pass song song**, mỗi băng một **gain** $g_k$, rồi **cộng** lại.
> - $y[n]=\sum_k g_k (h_k * x)[n]$; toàn bộ tương đương một $H(f)=\sum_k g_k H_k(f)$.
> - Gain tính bằng dB: $g_{\text{lin}}=10^{g_{\text{dB}}/20}$; +6 dB ≈ ×2.
> - Đẩy gain quá tay → vượt full-scale → clipping (§6).

---

## 3. Delay & Echo & Reverb

### 3.1 Delay FIR — một tiếng vọng

**(a) Là gì.** Delay là **trễ tín hiệu D mẫu rồi trộn lại** với bản gốc. Echo đơn giản nhất:

$$y[n] = x[n] + \alpha\,x[n-D]$$

- $D$ = số mẫu trễ. Với sample rate $f_s$, độ trễ thời gian $T = D/f_s$. Vd $f_s=44100$, $D=22050$ → $T=0.5$ s.
- $\alpha \in (0,1)$ = độ lớn tiếng vọng (vd 0.5 = vọng bằng nửa gốc).

Đây là **FIR** vì đầu ra chỉ phụ thuộc đầu vào (không hồi tiếp): nó là tích chập với impulse response hai tap $h=[1,\,0,\ldots,0,\,\alpha]$ (số 0 ở giữa: $D-1$ con).

**(b) Vì sao tồn tại.** Mô phỏng âm thanh **dội lại** từ một bức tường: đi thêm quãng đường → đến tai trễ $T$ giây và yếu đi (hệ số $\alpha$).

**(c) Walk-through bằng số.** Lấy $D=2$, $\alpha=0.5$. Đầu vào là một "click": $x=[1,0,0,0,0]$ (xung đơn vị).

| $n$ | $x[n]$ | $x[n-2]$ | $y[n]=x[n]+0.5\,x[n-2]$ |
|---|---|---|---|
| 0 | 1 | — (0) | 1.0 |
| 1 | 0 | — (0) | 0.0 |
| 2 | 0 | $x[0]=1$ | $0+0.5(1)=0.5$ |
| 3 | 0 | $x[1]=0$ | 0.0 |
| 4 | 0 | $x[2]=0$ | 0.0 |

→ Ra $y=[1,0,0.5,0,0]$: tiếng gốc lúc $n=0$, **một** tiếng vọng bằng nửa lúc $n=2$. Đúng như "nói một tiếng, nghe vọng một lần".

### 3.2 Reverb IIR — vọng nhiều lần nhỏ dần

**(a) Là gì.** Thêm **hồi tiếp (feedback)**: đầu ra trễ được trộn ngược vào chính nó:

$$y[n] = x[n] + \alpha\,y[n-D]$$

Khác biệt mấu chốt với §3.1: vế phải dùng $y[n-D]$ (đầu **ra** trễ), không phải $x[n-D]$. Đây là **IIR** (Infinite Impulse Response) — một xung vào sinh ra **vô hạn** tiếng vọng nhỏ dần.

**(b) Vì sao tồn tại.** Phòng thật dội âm **nhiều lần** (tường này sang tường kia), mỗi lần yếu đi → đuôi vang (reverb tail) tắt dần. Một tiếng vọng (FIR) không đủ; cần chuỗi vọng → dùng feedback.

**(c) Walk-through bằng số.** $D=2$, $\alpha=0.5$, vào click $x=[1,0,0,0,0,0,0]$ (coi $y[n]=0$ với $n<0$):

| $n$ | $x[n]$ | $y[n-2]$ | $y[n]=x[n]+0.5\,y[n-2]$ |
|---|---|---|---|
| 0 | 1 | 0 | 1.0 |
| 1 | 0 | 0 | 0.0 |
| 2 | 0 | $y[0]=1$ | $0.5$ |
| 3 | 0 | $y[1]=0$ | 0.0 |
| 4 | 0 | $y[2]=0.5$ | $0.25$ |
| 5 | 0 | $y[3]=0$ | 0.0 |
| 6 | 0 | $y[4]=0.25$ | $0.125$ |

→ Ra $y=[1,0,0.5,0,0.25,0,0.125,\ldots]$: vọng tại $n=2,4,6,\ldots$ với biên độ $0.5,0.25,0.125\ldots$ (mỗi lần ×0.5) — đuôi vang **giảm theo cấp số nhân**, đúng tinh thần reverb.

> ⚠ **Lỗi thường gặp — đặt $\alpha \ge 1$.** Với FIR ($\alpha<1$ vẫn an toàn dù $\alpha>1$ chỉ làm vọng to hơn gốc). Nhưng với **IIR**, nếu $\alpha \ge 1$ thì đuôi vang **không tắt mà phình to vô hạn** → tín hiệu nổ (runaway), clip, rồi rè đặc. Luôn giữ $0<\alpha<1$ cho reverb hồi tiếp.

### 3.3 So sánh FIR vs IIR delay

| | FIR delay (§3.1) | IIR reverb (§3.2) |
|---|---|---|
| Công thức | $y[n]=x[n]+\alpha x[n-D]$ | $y[n]=x[n]+\alpha y[n-D]$ |
| Hồi tiếp? | Không | Có |
| Số tiếng vọng | 1 (hữu hạn) | Vô hạn, nhỏ dần |
| Ổn định | Luôn ổn định | Ổn định khi $|\alpha|<1$ |
| Dùng cho | "slapback" echo, ping-pong | đuôi vang phòng |

### 3.4 Convolution reverb — tích chập với "vân tay" của phòng

> 💡 **Trực giác.** Vỗ tay **một cái** trong nhà thờ rồi thu lại âm dội — bản ghi đó là **impulse response (IR)** $h[n]$ của không gian: "phản ứng của phòng với một xung". Muốn một bản nhạc nghe như đang vang trong nhà thờ đó, ta **tích chập** nhạc với IR:
> $$y[n] = (x * h)[n] = \sum_{k} x[k]\,h[n-k]$$

Đây chính là [tích chập (Lesson 04)](../../01-Foundations/lesson-04-convolution/) áp dụng vào âm thanh: IR đóng vai trò "lõi" của bộ lọc. IR thật của phòng dài hàng chục nghìn mẫu (đuôi vang vài giây) nên tích chập trực tiếp tốn kém → thực tế dùng **FFT** ([Lesson 11](../../02-Fourier/lesson-05-fft/)) để tích chập nhanh trong miền tần số.

So với reverb IIR (§3.2): IIR là **mô hình** xấp xỉ (rẻ, realtime); convolution reverb là **bản sao chân thực** một không gian cụ thể (đắt hơn, "thật" hơn).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. $D=3,\alpha=0.4$, FIR, vào $x=[1,0,0,0,0,0]$. $y[3]=?$
> 2. Vì sao reverb dùng IIR còn echo "slapback" một lần dùng FIR?
>
> <details><summary>Đáp án</summary>
>
> 1. $y[3]=x[3]+0.4\,x[0]=0+0.4(1)=0.4$. (Chỉ một vọng tại $n=D=3$.)
> 2. Reverb cần **chuỗi** vọng tắt dần → cần hồi tiếp (IIR). Slapback chỉ cần **một** bản dội → FIR đủ và luôn ổn định.
> </details>

> 📝 **Tóm tắt §3.**
> - FIR delay $y=x+\alpha x[n-D]$: một tiếng vọng, luôn ổn định.
> - IIR reverb $y=x+\alpha y[n-D]$: vô hạn vọng nhỏ dần, cần $|\alpha|<1$ để ổn định.
> - Convolution reverb = tích chập nhạc với **impulse response** thật của phòng (Lesson 04), thường làm qua FFT.

---

## 4. Cao độ & tốc độ

### 4.1 Resampling đổi CẢ cao độ lẫn tốc độ

**(a) Là gì.** Resampling = đọc lại tín hiệu với **mật độ mẫu khác**. Nếu phát 44.1k mẫu với tốc độ "giả vờ" là 88.2k mẫu/s, mọi thứ nhanh gấp đôi → ngắn nửa thời lượng *và* cao độ tăng một quãng tám.

**(b) Vì sao gắn cao độ với tốc độ.** Cao độ (pitch) = tần số dao động. Một sóng sin 440 Hz là "lên xuống 440 lần/giây". Nếu bạn **tua nhanh ×2**, nó lên xuống 880 lần/giây → 880 Hz = cao hơn đúng một quãng tám. Tua = đổi tốc độ = đổi tần số = đổi cao độ. Đó là vì sao **tua băng cassette nhanh → giọng chipmunk**.

**(c) Walk-through bằng số.** Sóng sin 1 Hz lấy mẫu 8 mẫu/chu kỳ. "Nén thời gian ×2" = bỏ mẫu xen kẽ (lấy mẫu chẵn): còn 4 mẫu/chu kỳ với cùng tốc độ phát → một chu kỳ trôi qua trong nửa thời gian → nghe **2 Hz**, cao gấp đôi, dài bằng nửa.

Tỉ lệ resample $r$: thời lượng mới $= T_{\text{cũ}}/r$, cao độ mới $= r \times$ cao độ cũ. $r=2$ → chipmunk; $r=0.5$ → "ma trầm" (chậm lại, trầm xuống).

> ⚠ **Lỗi thường gặp — aliasing khi tăng tốc/giảm mẫu (downsample).** Khi $r>1$ (đẩy tần số lên) hoặc khi giảm sample rate, tần số có thể vượt **Nyquist** ($f_s/2$). Lúc đó tần số cao "gập" thành tần số sai → **aliasing** (tiếng kim loại lạ, sai cao độ). Phải **lọc thông thấp trước khi downsample** (anti-alias filter). Xem [Lesson 02 — Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/): tín hiệu chứa tần số $> f_s/2$ là nguồn gốc aliasing.

### 4.2 Pitch shift — đổi cao độ, GIỮ thời lượng

**(a) Vì sao cần.** Auto-tune, hòa giọng, "nâng tông bài hát mà không hát nhanh hơn" — cần đổi pitch **mà nhịp giữ nguyên**. Resampling không làm được (nó dính cả hai).

**(b) Hai cách phổ biến.**
- **Time-stretch rồi resample.** Trước hết **kéo dài/nén thời gian** mà giữ pitch (giữ tần số, chỉ thay độ dài), rồi resample về thời lượng gốc. Hai bước, hiệu ứng net: pitch đổi, thời lượng giữ.
- **Phase vocoder (sơ lược).** Phân tích tín hiệu thành các khung chồng lấn bằng **STFT** ([Lesson 11 — Spectrogram/STFT](../../02-Fourier/lesson-06-spectrogram-stft/)): mỗi khung cho biết biên độ và **pha** của từng thành phần tần số. Để time-stretch, ta **đặt lại các khung thưa/dày hơn** trên trục thời gian nhưng **điều chỉnh pha cho khớp** (giữ liền mạch, không vỡ tiếng), rồi tổng hợp lại. Sau đó resample để đổi pitch. "Phase" trong tên = phần khó nhất: nối pha giữa các khung sao cho không nghe lụp bụp.

**(c) Ví dụ trực giác.** Muốn nâng giọng +2 semitone mà giữ nhịp: tỉ lệ pitch $= 2^{2/12}=1.122$. Cách "stretch+resample": time-stretch ×1.122 (dài ra 12.2%, pitch giữ nguyên) rồi resample ×1.122 (ngắn lại về cũ, pitch lên 12.2%). Net: dài như cũ, cao hơn 2 semitone.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao chipmunk dễ làm còn auto-tune khó?"* → Chipmunk chỉ là resample (đọc nhanh). Pitch shift giữ nhịp phải phân tích phổ + nối pha — khó hơn nhiều.
> - *"Quãng tám liên hệ thế nào với ×2?"* → Lên một quãng tám = tần số ×2 = pitch ratio 2.0. Một semitone = $2^{1/12} \approx 1.0595$ (12 semitone/quãng tám). Liên hệ [Music](../../../Music/).

> 📝 **Tóm tắt §4.**
> - **Resampling** đổi **cả** pitch lẫn thời lượng (tua băng): $r>1$ → cao & ngắn.
> - Downsample/đẩy pitch lên có thể gây **aliasing** nếu không lọc thông thấp trước (Lesson 02).
> - **Pitch shift** giữ thời lượng: time-stretch (phase vocoder, STFT) rồi resample.
> - 1 quãng tám = ×2; 1 semitone = $2^{1/12}$.

---

## 5. Nén động (Dynamic Range Compression)

**(a) Là gì.** Compressor **giảm độ chênh giữa đoạn to và đoạn nhỏ**. Mọi mẫu có biên độ (theo dB) **vượt ngưỡng (threshold) $T$** sẽ bị nén theo **tỉ lệ (ratio) $R$**.

**(b) Vì sao cần.** Giọng nói trong podcast lúc to lúc nhỏ → khó nghe trên loa điện thoại. Nén lại làm âm lượng đều, rồi nâng tổng thể (make-up gain) → nghe "to và đầy" như nhạc thương mại.

**(c) Công thức (vùng trên ngưỡng).** Với mức vào $L_{\text{in}}$ (dB), mức ra:

$$L_{\text{out}} = \begin{cases} L_{\text{in}} & L_{\text{in}} \le T \\[4pt] T + \dfrac{L_{\text{in}} - T}{R} & L_{\text{in}} > T \end{cases}$$

**Walk-through bằng số.** $T=-20$ dB, $R=4{:}1$. Mức vào $-8$ dB (vượt ngưỡng 12 dB):

$$L_{\text{out}} = -20 + \frac{-8-(-20)}{4} = -20 + \frac{12}{4} = -20 + 3 = -17 \text{ dB}.$$

→ 12 dB vượt ngưỡng bị nén còn 3 dB. Tín hiệu $-30$ dB (dưới ngưỡng) **không đổi**. Kết quả: chênh lệch to-nhỏ thu hẹp.

> ❓ **Câu hỏi tự nhiên.** *"Ratio ∞:1 là gì?"* → Đó là **limiter**: mọi thứ trên ngưỡng bị ép phẳng về đúng $T$ (chống vượt full-scale tuyệt đối). *"Attack/Release?"* → Thời gian compressor bắt đầu/ngừng tác động — sơ lược ở đây, là hằng số thời gian để hiệu ứng nghe tự nhiên.

> 📝 **Tóm tắt §5.** Compressor: trên ngưỡng $T$, nén phần vượt theo $1/R$. $R=4{:}1$, vượt 12 dB → còn 3 dB. Dưới ngưỡng giữ nguyên. Mục tiêu: âm lượng đều, rồi make-up gain cho to.

---

## 6. Biên độ, loudness, clipping & dither

### 6.1 Full-scale và clipping

Mẫu audio thường chuẩn hóa về $[-1,\,1]$ (full-scale). Nếu phép xử lý (EQ boost, feedback lớn, make-up gain) đẩy mẫu **ra ngoài** khoảng đó, hệ thống **cắt phẳng** ở $\pm 1$ → **clipping**.

**Walk-through.** Sóng sin biên độ 1.5 (đã vượt): mọi giá trị $>1$ bị ghim về 1, $<-1$ ghim về $-1$ → đỉnh sin biến thành **mặt phẳng** (gần như sóng vuông). Sóng vuông giàu hài bậc cao → tai nghe **rè/méo (distortion)**.

> ⚠ **Lỗi thường gặp — "cứ to là hay".** Nâng gain tới mức clip để "to hơn" sẽ thêm méo cứng (hard clip), càng to càng rè. Đúng cách: nén động (§5) + giữ đỉnh dưới full-scale (limiter), rồi mới nâng.

### 6.2 Bit depth, lượng tử hóa & dither

Mỗi mẫu lưu bằng số bit hữu hạn (16-bit, 24-bit...). **Lượng tử hóa (quantization)** làm tròn biên độ về mức gần nhất → sai số nhỏ (quantization noise). Khi **giảm bit depth** (vd 24→16 bit), sai số làm tròn có thể **tương quan với tín hiệu** → nghe như méo nhỏ ở đoạn rất khẽ.

**Dither** = cộng một lượng **nhiễu ngẫu nhiên rất nhỏ** *trước khi* làm tròn. Nghịch lý có lợi: nhiễu ngẫu nhiên "phá vỡ" tương quan → lỗi làm tròn trở thành **tiếng rít nền nhẹ, đều** (dễ chịu cho tai) thay vì méo tín hiệu. Đánh đổi: nền nhiễu cao hơn chút, nhưng "sạch" về cảm giác.

> 📝 **Tóm tắt §6.** Giữ mẫu trong $[-1,1]$ để tránh clipping (méo). Khi giảm bit depth, dùng **dither** biến méo lượng tử thành nhiễu nền êm.

---

## 7. Web Audio API — DSP realtime trong trình duyệt

Trình duyệt làm DSP thật, realtime, qua **Web Audio API**: một **graph các node** nối với nhau (nguồn → xử lý → loa).

| Node | Vai trò | Tương ứng mục |
|---|---|---|
| `OscillatorNode` | sinh sóng (sine/square/saw) | nguồn test §2 |
| `AudioBufferSourceNode` | phát buffer mẫu (file/thu) | nguồn nhạc |
| `BiquadFilterNode` | bộ lọc bậc 2 (low/high/peaking...) | **mỗi băng EQ** §2 |
| `DelayNode` | trễ D mẫu | echo/reverb §3 |
| `ConvolverNode` | tích chập với IR | convolution reverb §3.4 |
| `DynamicsCompressorNode` | nén động | §5 |
| `GainNode` | nhân biên độ | gain/make-up |
| `AnalyserNode` | lấy phổ FFT để vẽ | hiển thị §2 |

Ví dụ EQ 3 băng = nối 3 `BiquadFilterNode` kiểu `peaking` (mỗi cái một `frequency` + `gain`) rồi gộp; reverb = `ConvolverNode` nạp một IR buffer. `AnalyserNode.getByteFrequencyData()` cho phổ realtime để vẽ canvas — đúng những gì visualization của bài này làm.

> 💡 **Trực giác.** Web Audio = "lắp dây" giữa các hộp xử lý có sẵn (đã tối ưu C++ trong trình duyệt). Bạn không tự viết vòng lặp `for n`; bạn **mô tả graph**, trình duyệt chạy DSP ở luồng audio riêng (`AudioWorklet` cho code tùy biến).

---

## Bài tập

> Làm xong hãy đối chiếu mục **Lời giải chi tiết** ngay dưới.

**Bài 1 (Delay FIR).** $y[n]=x[n]+0.5\,x[n-3]$, vào $x=[1,0,0,0,0,0]$. Tính $y[0..5]$.

**Bài 2 (Reverb IIR).** $y[n]=x[n]+0.6\,y[n-1]$, vào $x=[1,0,0,0]$ ($y[n]=0$ với $n<0$). Tính $y[0..3]$ và mô tả đuôi vang.

**Bài 3 (EQ dB).** EQ đặt 1 kHz = +9 dB, 8 kHz = −6 dB. Thành phần 1 kHz và 8 kHz đều có biên độ vào 0.4. Biên độ ra mỗi cái là bao nhiêu (tuyến tính)?

**Bài 4 (Resample / pitch).** Sample rate 48 kHz, một sóng sin 500 Hz. (a) Nếu resample tỉ lệ $r=1.5$ (đẩy nhanh), cao độ mới và thời lượng so với cũ? (b) Tần số mới có vượt Nyquist không? (c) Muốn nâng đúng +1 quãng tám thì $r=?$

**Bài 5 (Compressor).** $T=-24$ dB, $R=3{:}1$. Tín hiệu (a) $-30$ dB, (b) $-12$ dB. Tính mức ra mỗi trường hợp.

**Bài 6 (Clipping).** Sóng sin biên độ 1.0 nhân gain +6 dB rồi phát ra hệ $[-1,1]$. Có clip không? Nếu có, đỉnh bị ghim ở đâu và hệ quả âm thanh?

---

## Lời giải chi tiết

**Bài 1.** FIR, $D=3,\alpha=0.5$. Chỉ có vọng tại $n=D=3$:
- $y[0]=x[0]+0.5x[-3]=1$
- $y[1]=0$, $y[2]=0$
- $y[3]=x[3]+0.5x[0]=0+0.5(1)=0.5$
- $y[4]=0$, $y[5]=0$.
→ $y=[1,0,0,0.5,0,0]$: gốc + một vọng nửa biên độ trễ 3 mẫu.

**Bài 2.** IIR, $D=1,\alpha=0.6$:
- $y[0]=x[0]+0.6\,y[-1]=1+0=1$
- $y[1]=x[1]+0.6\,y[0]=0+0.6(1)=0.6$
- $y[2]=x[2]+0.6\,y[1]=0+0.6(0.6)=0.36$
- $y[3]=0+0.6(0.36)=0.216$
→ $y=[1,0.6,0.36,0.216,\ldots]$: mỗi mẫu = 0.6 × trước → đuôi vang **giảm cấp số nhân** (công bội 0.6), tắt dần vô hạn. Vì $|\alpha|=0.6<1$ nên ổn định.

**Bài 3.** Đổi dB → tuyến tính rồi nhân:
- 1 kHz: $g=10^{9/20}=2.818$ → ra $0.4 \times 2.818 = 1.127$.
- 8 kHz: $g=10^{-6/20}=0.501$ → ra $0.4 \times 0.501 = 0.200$.
- *Chú ý:* băng 1 kHz cho ra **1.127 > 1.0** → nếu hệ chuẩn full-scale $[-1,1]$, thành phần này **clip**! (Liên hệ §6 — boost mạnh dễ gây méo.)

**Bài 4.**
- (a) $r=1.5$: cao độ mới $=1.5\times 500=750$ Hz; thời lượng mới $=T_{\text{cũ}}/1.5 \approx 0.667\,T_{\text{cũ}}$ (ngắn lại ~33%).
- (b) Nyquist $=48000/2=24000$ Hz. 750 Hz $\ll$ 24 kHz → **không** vượt Nyquist, không aliasing trong ví dụ này. (Aliasing chỉ nguy hiểm khi tần số bị đẩy gần/vượt 24 kHz, hoặc khi downsample.)
- (c) +1 quãng tám = ×2 tần số → $r=2$.

**Bài 5.** $T=-24,R=3$.
- (a) $-30$ dB $< T$ → **không nén**, ra $-30$ dB.
- (b) $-12$ dB $> T$ (vượt 12 dB): $L_{\text{out}}=-24+\dfrac{-12-(-24)}{3}=-24+\dfrac{12}{3}=-24+4=-20$ dB. → 12 dB vượt ngưỡng nén còn 4 dB.

**Bài 6.** +6 dB $=10^{6/20}=1.995 \approx 2.0$ → biên độ đỉnh $1.0 \times 2.0 = 2.0 > 1.0$. **Có clip.** Mọi phần $>1$ ghim về $1$ (và $<-1$ về $-1$) → đỉnh sin thành **mặt phẳng** ≈ sóng vuông → sinh nhiều hài bậc cao → nghe **rè/méo (hard clipping)**. Cách tránh: giảm gain hoặc dùng limiter giữ đỉnh dưới full-scale.

---

## Tham khảo & Bài tiếp

- Tiền đề: [Tier 3 — L12: Lọc số](../lesson-01-digital-filters/) · [Tier 1 — L04: Tích chập](../../01-Foundations/lesson-04-convolution/) · [Tier 1 — L02: Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/).
- Liên quan: [Tier 2 — L11: FFT](../../02-Fourier/lesson-05-fft/) (convolution reverb nhanh) · [Tier 2 — L12: Spectrogram/STFT](../../02-Fourier/lesson-06-spectrogram-stft/) (phase vocoder) · [Music](../../../Music/) (quãng tám, semitone).
- **Bài tiếp theo:** [Tier 3 — L14: Ảnh & Fourier 2D](../lesson-03-image-2d-fourier/) — mở rộng tín hiệu 1D (âm thanh) sang 2D (ảnh), DFT hai chiều, lọc ảnh.
- [Visualization tương tác](./visualization.html) — EQ, Echo/Reverb, Pitch/Speed.
