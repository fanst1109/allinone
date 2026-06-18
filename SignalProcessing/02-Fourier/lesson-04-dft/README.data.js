// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/02-Fourier/lesson-04-dft/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 — Biến đổi Fourier rời rạc (DFT)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** cần một phiên bản rời rạc của biến đổi Fourier: máy tính chỉ có $N$ mẫu rời rạc, không có hàm liên tục.
- Phát biểu chính xác **định nghĩa DFT** và **IDFT** (biến đổi ngược), hiểu từng ký hiệu.
- **Tự tính DFT** của một dãy nhỏ ($N=4$) bằng số học thuần — từng $X[k]$, dùng các căn đơn vị $\\{1, -i, -1, i\\}$.
- Diễn giải **bin** $k$: ánh xạ bin $\\to$ tần số Hz, hiểu **phân giải tần số** $\\Delta f = f_s / N$.
- Nắm các **tính chất** then chốt: tuần hoàn, đối xứng liên hợp cho tín hiệu thực, ý nghĩa bin Nyquist $N/2$.
- Hiểu **ma trận DFT** và vì sao chi phí $O(N^2)$ — động lực dẫn tới FFT.
- Nhận biết **rò rỉ phổ (spectral leakage)** và ý tưởng **windowing**.

## Kiến thức tiền đề

- [L08 — Biến đổi Fourier (Fourier Transform)](../lesson-03-fourier-transform/) — DFT là phiên bản rời rạc, hữu hạn của FT.
- [Tier 1 L02 — Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/) — vì sao tín hiệu số chỉ là $N$ mẫu cách đều, và giới hạn Nyquist.
- [Số phức, dạng cực & công thức Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/) — $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, nhân/cộng số phức. Bắt buộc cho mọi tính toán dưới đây.

---

## 1. Vì sao cần DFT? — Bài toán mở đầu

> **Tình huống.** Bạn thu âm một nốt nhạc và máy tính lưu lại **đúng 8 con số** — biên độ tại 8 thời điểm cách đều:
> $$x = [\\,0,\\; 0.707,\\; 1,\\; 0.707,\\; 0,\\; -0.707,\\; -1,\\; -0.707\\,]$$
> Tai bạn nghe ra "một nốt cao tầm trung". Nhưng máy tính chỉ thấy 8 con số. **Làm sao tính ra phổ tần số — tức là tín hiệu này chứa những tần số nào, mỗi tần số mạnh bao nhiêu — bằng số học thuần, không cần giải tích?**

Biến đổi Fourier liên tục (L08) trả lời câu hỏi này cho **hàm liên tục** $x(t)$ xác định với *mọi* $t$:

$$X(f) = \\int_{-\\infty}^{\\infty} x(t)\\, e^{-i 2\\pi f t}\\, dt$$

Nhưng máy tính **không có** $x(t)$. Nó chỉ có:

1. **Hữu hạn mẫu**: $N$ con số $x[0], x[1], \\ldots, x[N-1]$, không phải hàm liên tục.
2. **Rời rạc theo thời gian**: các mẫu cách nhau $T_s = 1/f_s$ giây (xem [Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/)).
3. **Không có tích phân**: máy chỉ biết cộng, nhân — không tính được $\\int$.

💡 **Trực giác.** DFT thay tích phân $\\int$ bằng **tổng hữu hạn** $\\sum$, và thay biến tần số liên tục $f$ bằng một **bộ tần số rời rạc** — gọi là các **bin**. Thay vì hỏi "biên độ tại *mọi* tần số là bao nhiêu?", DFT hỏi: "với $N$ mẫu, ta phân biệt được $N$ tần số đặc biệt — biên độ tại từng tần số đó là bao nhiêu?". Giống như thay vì cân từng hạt cát, ta chia cát vào $N$ cái rổ rồi cân từng rổ.

Kết quả: DFT là một công thức **chỉ gồm phép cộng và nhân số phức**, máy tính chạy được trực tiếp. Đó chính là thứ ta cần.

📝 **Tóm tắt mục 1.** Máy tính chỉ có $N$ mẫu rời rạc và không tính được tích phân. DFT là phiên bản "số học thuần" của Fourier: tổng hữu hạn thay tích phân, bin rời rạc thay tần số liên tục.

---

## 2. Định nghĩa DFT và IDFT

### 2.1. Công thức xuôi (DFT)

Cho dãy $N$ mẫu phức (hoặc thực) $x[0], x[1], \\ldots, x[N-1]$, **biến đổi Fourier rời rạc** sinh ra $N$ hệ số phức $X[0], \\ldots, X[N-1]$:

$$\\boxed{\\,X[k] = \\sum_{n=0}^{N-1} x[n]\\, e^{-i 2\\pi k n / N}\\,}, \\qquad k = 0, 1, \\ldots, N-1$$

**Định nghĩa 3 phần** (theo chuẩn: là gì / vì sao cần / ví dụ số):

- **(a) Là gì.** $X[k]$ là một **số phức** đo "tín hiệu khớp với sóng cosin/sin tần số bin $k$ tới mức nào". $|X[k]|$ là **biên độ** (độ mạnh) của thành phần tần số đó; $\\arg X[k]$ là **pha** (sóng đó lệch bao nhiêu). Đầu vào $N$ số, đầu ra $N$ số phức.
- **(b) Vì sao cần.** FT liên tục cần hàm $x(t)$ và tích phân — máy không có. DFT chỉ cần $N$ mẫu và phép cộng/nhân. Mỗi số hạng $x[n]\\, e^{-i 2\\pi k n/N}$ là "quay mẫu $x[n]$ đi một góc" rồi cộng dồn; nếu tín hiệu thật sự chứa tần số bin $k$, các vector quay này **cộng dồn cùng hướng** $\\to |X[k]|$ lớn. Nếu không, chúng triệt tiêu $\\to |X[k]| \\approx 0$.
- **(c) Ví dụ số.** Với $x = [1,1,1,1]$ ($N=4$), tại $k=0$: $X[0] = 1 + 1 + 1 + 1 = 4$ (tín hiệu hằng $\\to$ toàn bộ "năng lượng" dồn vào bin tần số 0). Các bin khác bằng 0 (xem §3).

Ký hiệu gọn: đặt **căn đơn vị** $W_N = e^{-i 2\\pi / N}$ (đọc là "twiddle factor"). Khi đó:

$$X[k] = \\sum_{n=0}^{N-1} x[n]\\, W_N^{\\,kn}$$

### 2.2. Công thức ngược (IDFT)

Từ $N$ hệ số $X[k]$, ta khôi phục lại **chính xác** dãy gốc:

$$\\boxed{\\,x[n] = \\frac{1}{N}\\sum_{k=0}^{N-1} X[k]\\, e^{+i 2\\pi k n / N}\\,}, \\qquad n = 0, 1, \\ldots, N-1$$

Hai điểm khác so với xuôi: **dấu mũ là $+$** (quay ngược chiều) và có **hệ số chuẩn hóa $1/N$**.

💡 **Trực giác về $1/N$ và dấu $+$.** DFT xuôi "đo" tín hiệu khớp với từng sóng. IDFT "lắp ráp" tín hiệu lại bằng cách cộng các sóng đó với trọng số $X[k]$. Vì lúc đo ta cộng $N$ số hạng (làm độ lớn phình lên $N$ lần), lúc lắp ráp phải chia lại cho $N$. Dấu $+$ vì lắp ráp là "quay ngược" thao tác đo.

⚠ **Lỗi thường gặp — đặt $1/N$ sai chỗ.** Có 3 quy ước: ($1/N$ ở IDFT — phổ biến nhất, dùng trong bài này), ($1/N$ ở DFT), hoặc ($1/\\sqrt{N}$ ở cả hai — "unitary"). Khác quy ước $\\to$ biên độ $|X[k]|$ khác nhau theo hệ số $N$. **Luôn kiểm tra thư viện bạn dùng** (\`numpy.fft\` đặt $1/N$ ở IDFT, giống bài này).

❓ **Câu hỏi tự nhiên.**
- *"Đầu vào thực mà sao đầu ra phức?"* — Vì $X[k]$ mã hóa cả **biên độ và pha**. Một số thực không đủ chỗ; cần 2 thành phần (real + imag), tức số phức. Pha cho biết sóng cosin lệch bao nhiêu — bỏ pha là mất thông tin về thời điểm.
- *"DFT có làm mất thông tin không?"* — Không. IDFT khôi phục lại **chính xác** $x[n]$ (không sai số ngoài làm tròn). DFT chỉ là **đổi cách biểu diễn**: từ miền thời gian sang miền tần số, song ánh (bijective) — như đổi tọa độ Descartes sang cực.

📝 **Tóm tắt mục 2.** DFT: $X[k]=\\sum_n x[n] e^{-i2\\pi kn/N}$ — đo độ mạnh & pha từng tần số bin. IDFT: $x[n]=\\frac1N\\sum_k X[k] e^{+i2\\pi kn/N}$ — khôi phục chính xác. $X[k]$ phức vì chứa cả biên độ lẫn pha. Để ý quy ước $1/N$.

---

## 3. Walk-through đầy đủ: tính DFT của $x = [1, 0, -1, 0]$ với $N=4$

Đây là phần cốt lõi — bạn phải **tính theo được từng bước**.

### 3.1. Bảng các căn đơn vị cho $N=4$

Với $N=4$, $W_4^{\\,m} = e^{-i 2\\pi m / 4} = e^{-i \\pi m / 2}$. Chỉ có **4 giá trị**, lặp tuần hoàn:

| $m \\bmod 4$ | $e^{-i\\pi m/2}$ | Giá trị |
| :---: | :---: | :---: |
| 0 | $e^{0}$ | $1$ |
| 1 | $e^{-i\\pi/2}$ | $-i$ |
| 2 | $e^{-i\\pi}$ | $-1$ |
| 3 | $e^{-i 3\\pi/2}$ | $+i$ |

(Nhắc lại từ [Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/): $e^{-i\\pi/2} = \\cos(-\\tfrac\\pi2) + i\\sin(-\\tfrac\\pi2) = 0 - i = -i$.)

Công thức cho $N=4$: $\\;X[k] = \\sum_{n=0}^{3} x[n]\\, W_4^{\\,kn}$, với $W_4^{\\,kn}$ tra bảng theo $(kn \\bmod 4)$.

Dãy đầu vào: $x[0]=1,\\; x[1]=0,\\; x[2]=-1,\\; x[3]=0$.

### 3.2. Tính $X[0]$ (bin 0 — thành phần một chiều / DC)

$k=0 \\Rightarrow kn = 0$ với mọi $n \\Rightarrow W_4^{0} = 1$:

$$X[0] = x[0]\\cdot 1 + x[1]\\cdot 1 + x[2]\\cdot 1 + x[3]\\cdot 1 = 1 + 0 + (-1) + 0 = \\mathbf{0}$$

$X[0]$ luôn bằng **tổng các mẫu** = giá trị trung bình $\\times N$. Ở đây trung bình bằng 0 nên $X[0]=0$.

### 3.3. Tính $X[1]$

$k=1$: cần $W_4^{\\,n}$ với $n=0,1,2,3$, tức $kn \\bmod 4 = 0,1,2,3 \\to 1, -i, -1, i$:

$$\\begin{aligned}
X[1] &= x[0]\\,W_4^{0} + x[1]\\,W_4^{1} + x[2]\\,W_4^{2} + x[3]\\,W_4^{3} \\\\
     &= 1\\cdot 1 + 0\\cdot(-i) + (-1)\\cdot(-1) + 0\\cdot i \\\\
     &= 1 + 0 + 1 + 0 = \\mathbf{2}
\\end{aligned}$$

### 3.4. Tính $X[2]$ (bin Nyquist)

$k=2$: $kn = 0,2,4,6 \\to kn\\bmod 4 = 0,2,0,2 \\to 1, -1, 1, -1$:

$$\\begin{aligned}
X[2] &= 1\\cdot 1 + 0\\cdot(-1) + (-1)\\cdot 1 + 0\\cdot(-1) \\\\
     &= 1 + 0 - 1 + 0 = \\mathbf{0}
\\end{aligned}$$

### 3.5. Tính $X[3]$

$k=3$: $kn = 0,3,6,9 \\to kn\\bmod 4 = 0,3,2,1 \\to 1, i, -1, -i$:

$$\\begin{aligned}
X[3] &= 1\\cdot 1 + 0\\cdot i + (-1)\\cdot(-1) + 0\\cdot(-i) \\\\
     &= 1 + 0 + 1 + 0 = \\mathbf{2}
\\end{aligned}$$

### 3.6. Kết quả & verify

$$X = [\\,0,\\; 2,\\; 0,\\; 2\\,]$$

**Verify bằng IDFT** — lắp ráp lại $x[0]$ để chắc chắn:
$$x[0] = \\frac14\\sum_{k=0}^{3} X[k]\\,e^{+i2\\pi k\\cdot 0/4} = \\frac14(0 + 2 + 0 + 2) = \\frac14\\cdot 4 = 1 = x[0]\\;\\checkmark$$

Kiểm $x[1]$: $e^{+i2\\pi k/4} = 1, i, -1, -i$ cho $k=0,1,2,3$:
$$x[1] = \\tfrac14\\big(0\\cdot1 + 2\\cdot i + 0\\cdot(-1) + 2\\cdot(-i)\\big) = \\tfrac14(2i - 2i) = 0 = x[1]\\;\\checkmark$$

🔁 **Dừng lại tự kiểm tra.** Tính $X[1]$ cho dãy $x=[1,1,1,1]$.
<details><summary>Đáp án</summary>

$X[1] = 1\\cdot1 + 1\\cdot(-i) + 1\\cdot(-1) + 1\\cdot i = (1-1) + (-i+i) = 0$. Tín hiệu hằng chỉ có thành phần DC; mọi bin $k\\neq 0$ đều bằng 0. (Và $X[0] = 4$.)
</details>

⚠ **Lỗi thường gặp khi tính tay.** (1) Quên $kn \\bmod N$ — dùng thẳng $W_4^6$ thay vì $W_4^{6\\bmod4}=W_4^2$. (2) Nhầm dấu mũ: DFT là $-i$, không phải $+i$. (3) Quên rằng $e^{-i\\pi/2} = -i$ (không phải $+i$).

📝 **Tóm tắt mục 3.** DFT của $[1,0,-1,0]$ là $[0,2,0,2]$. Quy trình: với mỗi $k$, lập bộ hệ số $W_4^{kn}$ (tra bảng theo $kn\\bmod4$), nhân với mẫu, cộng dồn. Luôn verify bằng IDFT.

---

## 4. Diễn giải bin $k$: từ chỉ số sang Hertz

DFT cho $N$ con số $X[0..N-1]$, nhưng "bin $k$" tương ứng **tần số vật lý** nào?

### 4.1. Công thức cốt lõi

Nếu tín hiệu được lấy mẫu ở tần số $f_s$ (samples/giây) và có $N$ mẫu, thì:

$$\\boxed{\\,f_k = k \\cdot \\frac{f_s}{N}\\,} \\quad\\text{(Hz)}, \\qquad \\text{phân giải tần số}\\quad \\Delta f = \\frac{f_s}{N}$$

- **(a) $\\Delta f$ là gì.** Khoảng cách (Hz) giữa hai bin liền kề — "độ mịn" của lưới tần số DFT. Bin chỉ tồn tại tại bội số của $\\Delta f$.
- **(b) Vì sao cần.** Bin là chỉ số nguyên không có đơn vị; muốn nói "tín hiệu chứa 440 Hz" phải quy đổi bin $\\to$ Hz. $\\Delta f$ cho biết DFT "nhìn thấy" được những tần số nào.
- **(c) Ví dụ số.** $f_s = 8000$ Hz, $N=8 \\Rightarrow \\Delta f = 1000$ Hz. Bin 0,1,2,... ứng với 0, 1000, 2000, ... Hz.

### 4.2. Bốn ví dụ số (bin $\\to$ Hz)

| # | $f_s$ | $N$ | $\\Delta f = f_s/N$ | Bin $k$ | $f_k = k\\,\\Delta f$ |
| :-: | :-: | :-: | :-: | :-: | :-: |
| 1 | 8000 Hz | 8 | 1000 Hz | $k=3$ | $3000$ Hz |
| 2 | 44100 Hz | 1024 | $\\approx 43.07$ Hz | $k=10$ | $\\approx 430.7$ Hz |
| 3 | 1000 Hz | 100 | 10 Hz | $k=44$ | $440$ Hz (nốt La) |
| 4 | 48000 Hz | 480 | 100 Hz | $k=1$ | $100$ Hz |

💡 **Trực giác — muốn phân giải mịn hơn thì làm sao?** $\\Delta f = f_s/N$. Muốn $\\Delta f$ nhỏ (phân biệt được hai tần số gần nhau) thì tăng $N$ — tức **thu dài hơn**. Lấy 1 giây tín hiệu thì $\\Delta f = 1$ Hz; lấy 0.1 giây thì $\\Delta f = 10$ Hz. Phân giải tần số = nghịch đảo thời lượng quan sát. Đây là một dạng "nguyên lý bất định": muốn biết tần số chính xác, phải quan sát lâu.

⚠ **Lỗi cực phổ biến — nhầm bin với Hz.** "Đỉnh ở bin 5" **không** có nghĩa là "5 Hz". Phải nhân $\\Delta f$: nếu $f_s=8000, N=16$ thì $\\Delta f = 500$, bin 5 $= 2500$ Hz. Một con số "5" trên trục bin và "5 Hz" là hai thứ hoàn toàn khác.

❓ **Câu hỏi tự nhiên.** *"Bin $k$ lớn (gần $N$) là tần số rất cao à?"* — Không hẳn. Với tín hiệu **thực**, các bin từ $N/2{+}1$ đến $N-1$ là "ảnh gương" của nửa đầu (xem §5). Chỉ bin $0$ đến $N/2$ mang tần số "thật" từ 0 đến $f_s/2$ (Nyquist). Bin $N{-}1$ thực chất tương ứng tần số $-\\Delta f$, không phải tần số cao nhất.

🔁 **Dừng lại tự kiểm tra.** $f_s = 16000$ Hz, $N = 32$. (a) $\\Delta f$? (b) Bin của 2000 Hz?
<details><summary>Đáp án</summary>

(a) $\\Delta f = 16000/32 = 500$ Hz. (b) $k = f/\\Delta f = 2000/500 = 4$ $\\to$ bin 4.
</details>

📝 **Tóm tắt mục 4.** $f_k = k\\,f_s/N$, $\\Delta f = f_s/N$. Tăng $N$ (thu lâu hơn) $\\to$ phân giải mịn hơn. Đừng nhầm chỉ số bin với Hz.

---

## 5. Tính chất quan trọng của DFT

### 5.1. Tuần hoàn: $X[k] = X[k+N]$

DFT coi cả phổ $X[k]$ là **tuần hoàn chu kỳ $N$**. Vì $W_N^{(k+N)n} = W_N^{kn}\\cdot W_N^{Nn} = W_N^{kn}\\cdot 1$ (do $W_N^{N} = e^{-i2\\pi} = 1$). Hệ quả: $X[-1] = X[N-1]$, $X[N] = X[0]$, ...

**Ví dụ số** ($x=[1,0,-1,0]$, $X=[0,2,0,2]$): $X[4]$ "phải" bằng $X[0]=0$, $X[5]=X[1]=2$, ... — phổ lặp lại sau mỗi 4 bin.

### 5.2. Đối xứng liên hợp (cho tín hiệu **thực**): $X[N-k] = \\overline{X[k]}$

Nếu mọi $x[n]$ là **số thực**, thì nửa sau của phổ là **liên hợp phức của nửa đầu** (gập gương):

$$X[N-k] = \\overline{X[k]} \\quad\\Rightarrow\\quad |X[N-k]| = |X[k]|$$

**Ví dụ số.** $x=[1,0,-1,0]$ thực $\\to X=[0,2,0,2]$. Kiểm: $X[3]$ phải $= \\overline{X[1]}$. Ta có $X[1]=2$ (thực), $\\overline{X[1]}=2 = X[3]$ ✓. Biên độ đối xứng quanh bin $N/2=2$.

💡 **Trực giác.** Tín hiệu thực không phân biệt được "quay xuôi" và "quay ngược" cùng tốc độ — sin/cos thật là tổng của hai sóng phức quay ngược chiều. Nên năng lượng tần số $+f$ và $-f$ (tức bin $k$ và bin $N-k$) luôn bằng nhau. Vì vậy với tín hiệu thực, **chỉ cần nửa phổ** ($k=0..N/2$); nửa kia dư thừa.

### 5.3. Bin Nyquist $k = N/2$

Khi $N$ chẵn, bin $N/2$ ứng với tần số $f_s/2$ — **tần số Nyquist**, tần số cao nhất DFT phân biệt được (xem [Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/)). Tại đây $W_N^{(N/2)n} = (-1)^n$, nên $X[N/2] = \\sum_n x[n](-1)^n$ — **luôn là số thực** (với $x$ thực). Bin này là tâm đối xứng của §5.2.

**Ví dụ số.** $N=4 \\to$ Nyquist là bin 2. $X[2] = x[0]-x[1]+x[2]-x[3] = 1-0+(-1)-0 = 0$ — đúng như tính ở §3.4, và là số thực.

⚠ **Lỗi thường gặp.** Vẽ cả $N$ bin rồi tưởng tín hiệu thực có $N$ tần số độc lập. Thực ra chỉ $N/2+1$ bin ($0$ tới $N/2$) là độc lập; phần còn lại là gương. Vẽ phổ một phía (one-sided) chỉ tới bin $N/2$ để khỏi nhầm.

❓ **Câu hỏi tự nhiên.** *"Nếu chỉ nửa phổ là độc lập, ta có mất một nửa thông tin?"* — Không. Đầu vào thực có $N$ số thực; đầu ra có $N/2+1$ số **phức** nhưng $X[0]$ và $X[N/2]$ là thực $\\to$ tổng bậc tự do thực $= 2\\cdot(N/2-1) + 2 = N$. Khớp đúng. Không thừa, không thiếu.

📝 **Tóm tắt mục 5.** Phổ tuần hoàn chu kỳ $N$. Tín hiệu thực $\\to$ đối xứng liên hợp $X[N-k]=\\overline{X[k]}$, chỉ nửa phổ độc lập. Bin $N/2$ là Nyquist ($f_s/2$), luôn thực.

---

## 6. Ma trận DFT & chi phí $O(N^2)$ — vì sao cần FFT

### 6.1. DFT là một phép nhân ma trận

Đặt $W = W_N = e^{-i2\\pi/N}$. Vì $X[k] = \\sum_n x[n] W^{kn}$, toàn bộ DFT là **một phép nhân ma trận–vector** $X = F_N\\, x$, với $F_N$ là **ma trận DFT** $N\\times N$ có phần tử $(F_N)_{k,n} = W^{kn}$:

$$
F_4 =
\\begin{bmatrix}
W^0 & W^0 & W^0 & W^0 \\\\
W^0 & W^1 & W^2 & W^3 \\\\
W^0 & W^2 & W^4 & W^6 \\\\
W^0 & W^3 & W^6 & W^9
\\end{bmatrix}
=
\\begin{bmatrix}
1 & 1 & 1 & 1 \\\\
1 & -i & -1 & i \\\\
1 & -1 & 1 & -1 \\\\
1 & i & -1 & -i
\\end{bmatrix}
$$

(Rút gọn bằng $W_4^{m} = W_4^{m\\bmod 4}$: ví dụ $W^6 = W^2 = -1$, $W^9 = W^1 = -i$.)

**Verify** với $x=[1,0,-1,0]^\\top$: hàng 1 (bin 0) $\\cdot x = 1-0-1-0 = 0$; hàng 2 (bin 1) $\\cdot x = 1\\cdot1 + (-i)\\cdot0 + (-1)\\cdot(-1) + i\\cdot 0 = 2$. Khớp $X=[0,2,0,2]$ ✓.

### 6.2. Chi phí và động lực FFT

Nhân ma trận $N\\times N$ với vector $N$ phần tử cần $N^2$ phép nhân phức $\\Rightarrow$ DFT trực tiếp là $O(N^2)$.

| $N$ | $N^2$ (DFT trực tiếp) | $N\\log_2 N$ (FFT) | Tăng tốc |
| :-: | :-: | :-: | :-: |
| 8 | 64 | 24 | 2.7× |
| 1024 | $\\approx 10^6$ | 10240 | 100× |
| $10^6$ | $10^{12}$ | $\\approx 2\\times10^7$ | 50000× |

Với âm thanh thực ($N$ hàng nghìn tới triệu), $O(N^2)$ là không khả thi. **FFT (Fast Fourier Transform)** khai thác cấu trúc lặp của $W^{kn}$ để tính cùng kết quả chỉ trong $O(N\\log N)$ — đề tài [L10](../lesson-05-fft/).

📝 **Tóm tắt mục 6.** DFT $= F_N x$, ma trận $W^{kn}$. Chi phí $O(N^2)$ không khả thi với $N$ lớn $\\to$ động lực cho FFT $O(N\\log N)$.

---

## 7. Rò rỉ phổ (spectral leakage) & windowing

### 7.1. Khi tần số không "rơi đúng bin"

DFT giả định ngầm rằng đoạn $N$ mẫu **lặp lại tuần hoàn** vô hạn. Nếu tín hiệu chứa một tần số đúng bằng một bin ($f = k\\,\\Delta f$), nó vừa khít số chu kỳ nguyên trong cửa sổ $\\to$ năng lượng dồn gọn vào một bin.

Nhưng nếu tần số nằm **giữa hai bin** (ví dụ $f = 2.5\\,\\Delta f$), đoạn lặp lại bị **đứt gãy** ở mép cửa sổ — tạo ra "bậc nhảy" giả. DFT diễn giải bậc nhảy đó thành **nhiều tần số rải khắp các bin lân cận**: năng lượng "rò" ra. Đó là **rò rỉ phổ (spectral leakage)**.

⚠ **Lỗi thường gặp — đọc nhầm leakage thành nhiều tần số.** Thấy phổ có một đỉnh cao kèm nhiều đỉnh nhỏ xung quanh, đừng kết luận "tín hiệu có nhiều tần số". Rất có thể chỉ là **một** tần số rơi giữa bin, rò ra hai bên. Cách kiểm: đổi $N$ — nếu các đỉnh phụ thay đổi mạnh thì đó là leakage, không phải tần số thật.

**Ví dụ số.** $f_s=8$ Hz, $N=8 \\Rightarrow \\Delta f=1$ Hz. Sin 2 Hz $\\to$ đúng bin 2, năng lượng gọn. Sin 2.5 Hz $\\to$ không có bin nào, năng lượng trải ra bin 2, 3 và rò sang 1, 4... Module (b) trong visualization minh họa trực tiếp hiện tượng này.

### 7.2. Windowing — giảm leakage

**Windowing** nhân tín hiệu với một hàm cửa sổ (Hann, Hamming, Blackman...) thuôn về 0 ở hai mép $\\to$ xóa "bậc nhảy" ở chỗ nối $\\to$ giảm leakage (đổi lại đỉnh chính hơi rộng ra). Đây là tiền đề cho **Spectrogram** ([L11](../lesson-06-spectrogram/)), nơi ta cắt tín hiệu dài thành nhiều cửa sổ ngắn rồi DFT từng cửa sổ.

### 7.3. Ứng dụng thực tế (01–08)

1. **Equalizer / phân tích âm thanh**: DFT cho biết dải bass/mid/treble mạnh yếu ra sao.
2. **Nhận dạng nốt nhạc / tuner**: tìm bin có $|X[k]|$ lớn nhất $\\to$ tần số cơ bản $\\to$ tên nốt.
3. **Nén ảnh JPEG / audio MP3**: biến đổi sang miền tần số (DCT — họ hàng DFT) rồi bỏ tần số tai/mắt ít nhạy.
4. **Lọc nhiễu (denoising)**: chuyển sang miền tần số, zero các bin nhiễu, IDFT trở lại.
5. **Truyền thông OFDM (Wi-Fi, 4G/5G)**: dữ liệu được điều chế trực tiếp lên các bin DFT.
6. **Phân tích rung động cơ khí**: bin có đỉnh bất thường $\\to$ chẩn đoán hỏng hóc ổ trục.
7. **Xử lý ảnh y tế (MRI)**: dữ liệu thu trong "k-space" là miền Fourier, IDFT tạo ảnh.
8. **Đo phổ thiên văn / radar**: tách tần số Doppler để đo vận tốc.

📝 **Tóm tắt mục 7.** Leakage xảy ra khi tần số rơi giữa bin (cửa sổ không khít chu kỳ nguyên). Windowing thuôn mép giảm leakage. DFT là nền của EQ, tuner, nén, lọc nhiễu, OFDM, MRI...

---

## Bài tập

1. **Tính DFT $N=4$.** Cho $x = [1, 1, 1, 1]$. Tính $X[0], X[1], X[2], X[3]$ bằng bảng căn đơn vị. Giải thích kết quả.
2. **Tính DFT $N=4$ (tín hiệu thực, khác nhau).** Cho $x = [0, 1, 0, -1]$. Tính cả 4 bin. Bin nào có năng lượng? Tần số bin đó là gì nếu $f_s = 4$ Hz?
3. **Bin $\\to$ Hz.** $f_s = 44100$ Hz, $N = 2048$. (a) $\\Delta f$? (b) Bin nào gần nhất với 1000 Hz? (c) Tần số chính xác của bin đó?
4. **Đối xứng liên hợp.** Cho tín hiệu thực $N=8$ có $X[1] = 3 - 4i$. Không tính lại, suy ra $X[7]$ và $|X[7]|$.
5. **Phân giải tần số.** Bạn cần phân biệt 440 Hz với 441 Hz. Lấy mẫu ở $f_s = 8000$ Hz. Cần tối thiểu bao nhiêu mẫu $N$ (và bao nhiêu giây thu)?
6. **Leakage.** $f_s = 16$ Hz, $N = 16$. Sin tần số nào sẽ rơi *đúng* bin (không leakage)? Cho 3 ví dụ. Sin 3.5 Hz thì sao?

---

## Lời giải chi tiết

### Bài 1 — DFT của $[1,1,1,1]$

Dùng bảng $W_4 \\in \\{1,-i,-1,i\\}$.

- $X[0] = 1+1+1+1 = \\mathbf 4$ (tổng các mẫu).
- $X[1] = 1\\cdot1 + 1\\cdot(-i) + 1\\cdot(-1) + 1\\cdot i = (1-1) + (-i+i) = \\mathbf 0$.
- $X[2] = 1\\cdot1 + 1\\cdot(-1) + 1\\cdot1 + 1\\cdot(-1) = \\mathbf 0$.
- $X[3] = 1\\cdot1 + 1\\cdot i + 1\\cdot(-1) + 1\\cdot(-i) = (1-1)+(i-i) = \\mathbf 0$.

$X = [4,0,0,0]$. **Giải thích:** tín hiệu hằng (không đổi) chỉ có thành phần một chiều (DC, bin 0). Mọi sóng dao động (bin $\\geq 1$) khớp với nó bằng 0. Verify IDFT: $x[n] = \\frac14\\cdot 4\\cdot e^{0} = 1$ cho mọi $n$ ✓.

### Bài 2 — DFT của $[0,1,0,-1]$

- $X[0] = 0+1+0-1 = \\mathbf 0$.
- $X[1] = 0\\cdot1 + 1\\cdot(-i) + 0\\cdot(-1) + (-1)\\cdot i = -i - i = \\mathbf{-2i}$.
- $X[2] = 0\\cdot1 + 1\\cdot(-1) + 0\\cdot1 + (-1)\\cdot(-1) = -1+1 = \\mathbf 0$.
- $X[3] = 0\\cdot1 + 1\\cdot i + 0\\cdot(-1) + (-1)\\cdot(-i) = i + i = \\mathbf{2i}$.

$X = [0, -2i, 0, 2i]$. **Năng lượng** ở bin 1 và bin 3 ($|X[1]|=|X[3]|=2$). Đối xứng liên hợp: $X[3] = \\overline{X[1]} = \\overline{-2i} = 2i$ ✓. Nếu $f_s = 4$ Hz, $\\Delta f = 4/4 = 1$ Hz $\\to$ bin 1 $= 1$ Hz. Đây là sin 1 Hz (pha 90°): $x[n] = \\sin(2\\pi n/4)$ cho $[0,1,0,-1]$ ✓.

### Bài 3 — Bin $\\to$ Hz, $f_s=44100, N=2048$

(a) $\\Delta f = 44100/2048 \\approx \\mathbf{21.53}$ **Hz**.
(b) $k = 1000/21.53 \\approx 46.4 \\to$ bin gần nhất là $\\mathbf{46}$.
(c) $f_{46} = 46 \\times 21.53 \\approx \\mathbf{990.5}$ **Hz** (lệch ~9.5 Hz so với 1000 — lưới bin không khít đúng 1000 Hz).

### Bài 4 — Đối xứng liên hợp, $N=8$

Với tín hiệu thực: $X[N-k] = \\overline{X[k]}$. Vậy $X[8-1] = X[7] = \\overline{X[1]} = \\overline{3-4i} = \\mathbf{3+4i}$. Biên độ $|X[7]| = \\sqrt{3^2+4^2} = \\mathbf 5$ (bằng $|X[1]|$, đúng tính chất gương).

### Bài 5 — Phân giải tần số

Cần $\\Delta f \\leq 1$ Hz để tách 440 với 441. $\\Delta f = f_s/N \\leq 1 \\Rightarrow N \\geq f_s = 8000$. Vậy **$N \\geq 8000$ mẫu**, tương ứng thời lượng $T = N/f_s = 8000/8000 = \\mathbf 1$ **giây**. Khẳng định lại trực giác §4: phân giải 1 Hz $\\Leftrightarrow$ quan sát 1 giây.

### Bài 6 — Leakage, $f_s=16, N=16$

$\\Delta f = 16/16 = 1$ Hz. Tần số rơi **đúng bin** là bội số nguyên của $\\Delta f$ trong khoảng $(0, f_s/2]$: ví dụ **1 Hz (bin 1), 3 Hz (bin 3), 7 Hz (bin 7)** — không leakage. Sin **3.5 Hz** không trùng bin nào ($3.5/1 = 3.5$, không nguyên) $\\to$ cửa sổ chứa 3.5 chu kỳ, không khít $\\to$ năng lượng **rò ra bin 3, 4 và lan các bin lân cận**. Đây chính là spectral leakage; muốn giảm thì windowing (§7.2) hoặc chọn $N$ sao cho tần số rơi đúng bin.

---

## Tham khảo & Bài tiếp theo

- **Bài trước:** [L08 — Biến đổi Fourier (Fourier Transform)](../lesson-03-fourier-transform/)
- **Tiền đề:** [Tier 1 L02 — Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/) · [Số phức, dạng cực & Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/)
- **Bài tiếp theo:** [L10 — FFT (Fast Fourier Transform)](../lesson-05-fft/) — tính cùng kết quả DFT trong $O(N\\log N)$ thay vì $O(N^2)$.
- **Sẽ học kỹ ở:** [L11 — Spectrogram](../lesson-06-spectrogram/) — DFT theo cửa sổ trượt + windowing để xem phổ biến đổi theo thời gian.
- **Minh họa tương tác:** [visualization.html](./visualization.html)
`;
