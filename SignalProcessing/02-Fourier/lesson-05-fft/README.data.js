// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/02-Fourier/lesson-05-fft/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10 — FFT: Fast Fourier Transform (Cooley-Tukey)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao DFT trực tiếp $O(N^2)$ quá chậm** và FFT $O(N \\log N)$ thay đổi cuộc chơi (với $N = 2^{20}$, nhanh hơn ~50.000 lần).
- Nắm **ý tưởng chia để trị (divide and conquer)** của Cooley-Tukey: tách DFT theo chỉ số chẵn/lẻ.
- Hiểu và tự tính **phép butterfly** cùng **twiddle factor** $W_N^k$.
- Chạy tay **đầy đủ một FFT radix-2 DIT cho $N = 8$**: bit-reversal, $\\log_2 N$ tầng, mỗi tầng $N/2$ butterfly — bằng số thật.
- Chứng minh độ phức tạp $O(N \\log N)$ và so sánh số phép tính với $N^2$.
- Hiểu điều kiện $N = 2^k$, kỹ thuật zero-padding, và các biến thể (radix-4, mixed-radix, Bluestein).
- Biết các ứng dụng: audio thời gian thực, xử lý ảnh, nhân đa thức / số lớn nhanh.

## Kiến thức tiền đề

- [Lesson 09 — DFT (Discrete Fourier Transform)](../lesson-04-dft/) — FFT chỉ là cách tính DFT nhanh, **kết quả y hệt**. Phải nắm chắc công thức DFT và số phức $W_N = e^{-2\\pi i / N}$.
- [Algorithms — chia để trị (divide and conquer)](../../../Algorithms/) — FFT là một thuật toán chia để trị kinh điển, cùng họ với merge sort.
- [DataFoundations — binary & bit](../../../DataFoundations/01-NumberRepresentation/lesson-01-binary-hex/) — cần cho **bit-reversal**, bước sắp xếp lại đầu vào của FFT.

---

## 1. Vì sao cần FFT? Đặt vấn đề bằng số

> **Bài toán:** Một file audio 1 giây ở 44.100 Hz, ta gom $N = 2^{20} \\approx 10^6$ mẫu để phân tích phổ tần số. DFT trực tiếp cần bao nhiêu phép tính? Có chạy nổi thời gian thực không?

Nhắc lại công thức DFT (từ [Lesson 09](../lesson-04-dft/)):

$$X[k] = \\sum_{n=0}^{N-1} x[n] \\, W_N^{nk}, \\qquad W_N = e^{-2\\pi i / N}, \\qquad k = 0, 1, \\ldots, N-1.$$

Để tính **một** giá trị $X[k]$ ta cần $N$ phép nhân phức + $N$ phép cộng. Có $N$ giá trị $k$ ⟹ tổng cộng $N \\times N = N^2$ phép nhân phức. Đây là $O(N^2)$.

**Tính cụ thể cho $N = 2^{20} = 1.048.576$:**

$$N^2 = (2^{20})^2 = 2^{40} \\approx 1{,}1 \\times 10^{12} \\text{ phép nhân phức.}$$

Một CPU làm ~$10^9$ phép nhân phức/giây ⟹ mất ~**1.100 giây ≈ 18 phút** cho một giây audio. Hoàn toàn vô vọng cho thời gian thực.

**FFT làm điều này trong $O(N \\log N)$:**

$$N \\log_2 N = 2^{20} \\times 20 = 1.048.576 \\times 20 \\approx 2{,}1 \\times 10^7 \\text{ phép.}$$

Tỉ số tăng tốc:

$$\\frac{N^2}{N \\log_2 N} = \\frac{2^{40}}{2^{20} \\times 20} = \\frac{2^{20}}{20} = \\frac{1.048.576}{20} \\approx 52.000 \\text{ lần.}$$

> **Đóng câu hỏi mở bài:** DFT trực tiếp mất ~18 phút; FFT mất ~20 mili-giây ($2{,}1 \\times 10^7 / 10^9$). FFT nhanh hơn ~**52.000 lần** — đủ để phân tích phổ audio **thời gian thực** trên điện thoại. Đó là lý do mọi phần mềm âm thanh, ảnh, viễn thông đều dùng FFT.

> 💡 **Trực giác.** DFT trực tiếp giống như mỗi người trong phòng bắt tay với **tất cả** người khác: $N$ người ⟹ ~$N^2$ cái bắt tay. FFT khôn hơn: chia phòng làm đôi liên tục, mỗi lần chỉ làm $N$ việc, chia được $\\log_2 N$ lần ⟹ $N \\log N$. Cùng "biết hết mọi người", nhưng ít việc hơn rất nhiều.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"FFT có ra kết quả khác DFT không?"* — **Không.** FFT và DFT cho **đúng cùng một** $X[k]$ (sai khác chỉ do làm tròn số thực). FFT chỉ là cách **sắp xếp lại phép tính** để khỏi tính lặp.
> - *"Vì sao tính lặp?"* — Trong DFT trực tiếp, các tích như $x[2] \\cdot W_N^{2k}$ với $k$ khác nhau dùng đi dùng lại các lũy thừa của $W_N$. FFT khai thác cấu trúc tuần hoàn của $W_N$ để tái sử dụng.

> 📝 **Tóm tắt mục 1.**
> - DFT trực tiếp là $O(N^2)$; FFT là $O(N \\log N)$.
> - Với $N = 2^{20}$: $2^{40}$ vs $2^{20}\\times 20$ ⟹ nhanh ~52.000 lần.
> - FFT cho **kết quả y hệt** DFT, chỉ khác cách tổ chức phép tính.

---

## 2. Ý tưởng chia để trị: tách chẵn/lẻ

> 💡 **Trực giác.** Muốn tính tổng cho cả mảng, ta **tách mảng làm hai nửa**: các chỉ số **chẵn** ($x[0], x[2], x[4], \\ldots$) và các chỉ số **lẻ** ($x[1], x[3], x[5], \\ldots$). Mỗi nửa là một DFT kích thước $N/2$. Sau khi có kết quả hai nửa, ta **ghép** lại thành kết quả đầy đủ chỉ với $O(N)$ việc. Lặp lại đệ quy ⟹ chia được $\\log_2 N$ lần.

### 2.1. Walk-through đại số dẫn công thức

Bắt đầu từ định nghĩa và tách tổng theo $n$ chẵn ($n = 2m$) và $n$ lẻ ($n = 2m+1$):

$$
\\begin{aligned}
X[k] &= \\sum_{n=0}^{N-1} x[n] \\, W_N^{nk} \\\\
     &= \\sum_{m=0}^{N/2-1} x[2m] \\, W_N^{2mk} \\;+\\; \\sum_{m=0}^{N/2-1} x[2m+1] \\, W_N^{(2m+1)k} \\\\
     &= \\sum_{m=0}^{N/2-1} x[2m] \\, W_N^{2mk} \\;+\\; W_N^{k}\\sum_{m=0}^{N/2-1} x[2m+1] \\, W_N^{2mk}.
\\end{aligned}
$$

Bước then chốt là đẳng thức **$W_N^2 = W_{N/2}$**, chứng minh trực tiếp:

$$W_N^2 = \\left(e^{-2\\pi i / N}\\right)^2 = e^{-2\\pi i \\cdot 2 / N} = e^{-2\\pi i / (N/2)} = W_{N/2}.$$

Thay $W_N^{2mk} = (W_N^2)^{mk} = W_{N/2}^{mk}$ vào:

$$X[k] = \\underbrace{\\sum_{m=0}^{N/2-1} x[2m] \\, W_{N/2}^{mk}}_{E[k]} \\;+\\; W_N^{k}\\underbrace{\\sum_{m=0}^{N/2-1} x[2m+1] \\, W_{N/2}^{mk}}_{O[k]}.$$

Trong đó:

- $E[k]$ = DFT kích thước $N/2$ của các mẫu **chẵn (even)**.
- $O[k]$ = DFT kích thước $N/2$ của các mẫu **lẻ (odd)**.

### 2.2. Hai nửa cho ra cả $N$ kết quả nhờ tính tuần hoàn

$E[k]$ và $O[k]$ chỉ định nghĩa cho $k = 0, \\ldots, N/2-1$. Nhưng $X[k]$ cần tới $k = N-1$. Bí quyết: $E, O$ **tuần hoàn chu kỳ $N/2$**, và twiddle có tính chất nửa-vòng:

$$E[k + N/2] = E[k], \\qquad O[k + N/2] = O[k],$$

$$W_N^{k+N/2} = W_N^k \\cdot W_N^{N/2} = W_N^k \\cdot e^{-\\pi i} = -\\,W_N^k.$$

(Vì $W_N^{N/2} = e^{-2\\pi i \\cdot (N/2)/N} = e^{-\\pi i} = -1$.) Từ đó với $k = 0, \\ldots, N/2-1$:

$$\\boxed{X[k] = E[k] + W_N^{k}\\, O[k]}, \\qquad \\boxed{X[k + N/2] = E[k] - W_N^{k}\\, O[k]}.$$

Đây là **trái tim của FFT**: chỉ cần tính $E[k]$, $O[k]$ và một tích $W_N^k O[k]$ là ra **hai** giá trị đầu ra ($X[k]$ và $X[k+N/2]$) chỉ bằng một phép cộng và một phép trừ.

> ⚠ **Lỗi thường gặp.** Tưởng phải tính $E$ và $O$ cho **cả** $N$ chỉ số. **Sai.** Chỉ tính cho nửa đầu $k = 0 \\ldots N/2-1$; nửa sau lấy lại nhờ tính tuần hoàn ($E[k+N/2]=E[k]$) và dấu trừ của twiddle. Đây chính là chỗ tiết kiệm tính toán.

> 🔁 **Dừng lại tự kiểm tra.** Với $N = 8$, công thức cho $X[5]$ viết theo $E, O$ nào?
> <details><summary>Đáp án</summary>
> $5 = 1 + 8/2 = 1 + 4$, nên $X[5] = X[1+4] = E[1] - W_8^{1}\\,O[1]$. Lưu ý dùng $E[1], O[1]$ (chỉ số $\\bmod\\ N/2$), không phải $E[5]$.
> </details>

> 📝 **Tóm tắt mục 2.** Tách chẵn/lẻ ⟹ $X[k] = E[k] + W_N^k O[k]$ và $X[k+N/2] = E[k] - W_N^k O[k]$. Một cặp $E[k], O[k]$ sinh ra hai output. Đệ quy trên hai nửa kích thước $N/2$.

---

## 3. Butterfly và twiddle factor

### 3.1. Twiddle factor là gì?

**Twiddle factor (hệ số xoay)** là số phức $W_N^k = e^{-2\\pi i k / N}$ — một điểm trên đường tròn đơn vị, ứng với góc quay $-2\\pi k / N$.

- **(a) Là gì:** một số phức có độ lớn $|W_N^k| = 1$, chỉ làm nhiệm vụ **xoay** $O[k]$ một góc trước khi cộng/trừ với $E[k]$.
- **(b) Vì sao cần:** nó "mã hóa" sự khác biệt pha giữa mẫu lẻ và mẫu chẵn (mẫu lẻ lệch 1 vị trí thời gian ⟹ lệch pha). Không có twiddle, ta không ghép đúng hai nửa.
- **(c) Ví dụ số:** với $N = 8$:
  - $W_8^0 = e^0 = 1$
  - $W_8^1 = e^{-i\\pi/4} = \\tfrac{\\sqrt2}{2} - i\\tfrac{\\sqrt2}{2} \\approx 0{,}707 - 0{,}707\\,i$
  - $W_8^2 = e^{-i\\pi/2} = -i$
  - $W_8^3 = e^{-i3\\pi/4} \\approx -0{,}707 - 0{,}707\\,i$

### 3.2. Phép butterfly

**Butterfly** là phép cơ bản nhất của FFT. Cho hai số phức đầu vào $a, b$ và một twiddle $W$, butterfly sinh hai số phức đầu ra:

$$\\text{butterfly}(a, b, W) = \\big(\\; a + W b, \\;\\; a - W b \\;\\big).$$

Tên gọi "butterfly" (con bướm) đến từ sơ đồ luồng dữ liệu: hai đường vào chéo nhau giống cánh bướm.

\`\`\`
a ──────●────────► a + W·b
         \\      /
          \\    /
           \\  /
            \\/
            /\\
           /  \\   (× W trên nhánh dưới)
          /    \\
b ──────●────────► a − W·b
\`\`\`

### 3.3. Walk-through một butterfly bằng số

Cho $a = 3 + 0i$, $b = 1 + 0i$, $W = W_8^2 = -i$.

Bước 1 — tính $Wb$:
$$Wb = (-i)(1 + 0i) = -i = 0 - 1i.$$

Bước 2 — output trên:
$$a + Wb = (3 + 0i) + (0 - 1i) = 3 - 1i.$$

Bước 3 — output dưới:
$$a - Wb = (3 + 0i) - (0 - 1i) = 3 + 1i.$$

Vậy $\\text{butterfly}(3, 1, -i) = (3 - i,\\; 3 + i)$. Chỉ **một** phép nhân phức ($Wb$) cộng **hai** phép cộng/trừ ⟹ ra hai kết quả.

> ❓ **Câu hỏi tự nhiên.** *"Sao gọi là 1 phép nhân mà ra 2 output?"* — Vì $Wb$ tính **một lần**, rồi dùng chung: lần cộng cho output trên, lần trừ cho output dưới. Đó là chìa khóa tiết kiệm.

> 🔁 **Dừng lại tự kiểm tra.** Tính $\\text{butterfly}(2, 2, W_8^0)$ với $W_8^0 = 1$.
> <details><summary>Đáp án</summary>
> $Wb = 1 \\cdot 2 = 2$. Output trên $= 2 + 2 = 4$. Output dưới $= 2 - 2 = 0$. Kết quả $(4, 0)$.
> </details>

> 📝 **Tóm tắt mục 3.** Butterfly $(a,b,W) \\to (a+Wb,\\ a-Wb)$ là đơn vị tính của FFT: 1 nhân phức + 2 cộng/trừ ⟹ 2 output. Twiddle $W_N^k$ xoay nhánh lẻ trước khi ghép.

---

## 4. Walk-through ĐẦY ĐỦ: FFT $N = 8$ (radix-2 DIT)

Ta tính FFT của tín hiệu thật, từng tầng, không bỏ bước. DIT = **Decimation In Time** (chia nhỏ theo miền thời gian = tách chẵn/lẻ ở đầu vào).

**Tín hiệu đầu vào** (8 mẫu thực, chọn cho dễ kiểm tra):

$$x = [0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6,\\ 7].$$

### 4.1. Bước 1 — Bit-reversal sắp xếp lại đầu vào

FFT radix-2 DIT in-place yêu cầu đầu vào theo **thứ tự đảo bit (bit-reversal)**. Với $N = 8$, mỗi chỉ số viết 3 bit, **đảo ngược thứ tự bit**, rồi đọc lại:

| Chỉ số gốc | Nhị phân | Đảo bit | Chỉ số mới |
|:---:|:---:|:---:|:---:|
| 0 | 000 | 000 | 0 |
| 1 | 001 | 100 | 4 |
| 2 | 010 | 010 | 2 |
| 3 | 011 | 110 | 6 |
| 4 | 100 | 001 | 1 |
| 5 | 101 | 101 | 5 |
| 6 | 110 | 011 | 3 |
| 7 | 111 | 111 | 7 |

Lấy phần tử ở "chỉ số mới" của mảng gốc để xếp vào vị trí thứ tự. Mảng sau bit-reversal:

$$x_{br} = [\\,x[0], x[4], x[2], x[6], x[1], x[5], x[3], x[7]\\,] = [0,\\ 4,\\ 2,\\ 6,\\ 1,\\ 5,\\ 3,\\ 7].$$

> 💡 **Vì sao cần đảo bit?** Đệ quy "tách chẵn/lẻ" lặp lại nhiều lần sẽ gom các phần tử về đúng nhóm. Đảo bit cho ngay **thứ tự cuối cùng** mà đệ quy đó tạo ra, để ta gộp from-bottom-up in-place mà không cần mảng phụ. Chi tiết bit ở [DataFoundations binary/bit](../../../DataFoundations/01-NumberRepresentation/lesson-01-binary-hex/).

> ⚠ **Lỗi thường gặp với bit-reversal.** (1) Quên đệm 0 cho đủ số bit: chỉ số 1 với $N=8$ phải là \`001\` (3 bit), đảo ra \`100\` = 4 — nếu viết \`1\` rồi đảo thành \`1\` là **sai**. (2) Dùng số bit của $N$ thay vì $\\log_2 N$: $N=8$ dùng **3** bit ($\\log_2 8$), không phải 8 bit.

### 4.2. Bước 2 — Tầng 1 (size-2 DFT, twiddle $W_2^0 = 1$)

Có $\\log_2 8 = 3$ tầng. Tầng 1 ghép các cặp kề nhau, mỗi nhóm 2 phần tử, twiddle $W_2^0 = 1$. $N/2 = 4$ butterfly.

Mảng hiện tại: $[0,\\ 4,\\ 2,\\ 6,\\ 1,\\ 5,\\ 3,\\ 7]$. Butterfly trên các cặp $(0,1), (2,3), (4,5), (6,7)$ (theo vị trí), $W = 1$:

- BF cặp (0,4): $(0+1\\cdot4,\\ 0-1\\cdot4) = (4,\\ -4)$
- BF cặp (2,6): $(2+6,\\ 2-6) = (8,\\ -4)$
- BF cặp (1,5): $(1+5,\\ 1-5) = (6,\\ -4)$
- BF cặp (3,7): $(3+7,\\ 3-7) = (10,\\ -4)$

Sau tầng 1:

$$[\\,4,\\ -4,\\ 8,\\ -4,\\ 6,\\ -4,\\ 10,\\ -4\\,].$$

### 4.3. Bước 3 — Tầng 2 (size-4 DFT, twiddle $W_4^0, W_4^1$)

Mỗi nhóm 4 phần tử; ghép phần tử cách nhau 2 vị trí. Twiddle: $W_4^0 = 1$, $W_4^1 = e^{-i\\pi/2} = -i$. $N/2 = 4$ butterfly.

**Nhóm A** = vị trí [0,1,2,3] = $[4, -4, 8, -4]$. Butterfly (0,2) với $W_4^0=1$ và (1,3) với $W_4^1=-i$:

- $(a,b) = (4, 8)$, $W=1$: $(4 + 8,\\ 4 - 8) = (12,\\ -4)$ → vị trí 0 và 2.
- $(a,b) = (-4, -4)$, $W=-i$: $Wb = -i\\cdot(-4) = 4i$. $(-4 + 4i,\\ -4 - 4i)$ → vị trí 1 và 3.

Nhóm A sau tầng 2: $[\\,12,\\ -4+4i,\\ -4,\\ -4-4i\\,]$.

**Nhóm B** = vị trí [4,5,6,7] = $[6, -4, 10, -4]$. Butterfly (4,6) với $W_4^0=1$ và (5,7) với $W_4^1=-i$:

- $(a,b) = (6, 10)$, $W=1$: $(6 + 10,\\ 6 - 10) = (16,\\ -4)$ → vị trí 4 và 6.
- $(a,b) = (-4, -4)$, $W=-i$: $Wb = 4i$. $(-4 + 4i,\\ -4 - 4i)$ → vị trí 5 và 7.

Nhóm B sau tầng 2: $[\\,16,\\ -4+4i,\\ -4,\\ -4-4i\\,]$.

Sau tầng 2 (toàn mảng):

$$[\\,12,\\ -4+4i,\\ -4,\\ -4-4i,\\ \\ 16,\\ -4+4i,\\ -4,\\ -4-4i\\,].$$

### 4.4. Bước 4 — Tầng 3 (size-8 DFT, twiddle $W_8^0, W_8^1, W_8^2, W_8^3$)

Tầng cuối ghép phần tử cách nhau 4 vị trí: cặp (0,4), (1,5), (2,6), (3,7). Twiddle:

- $W_8^0 = 1$
- $W_8^1 = \\tfrac{\\sqrt2}{2}(1 - i) \\approx 0{,}7071 - 0{,}7071\\,i$
- $W_8^2 = -i$
- $W_8^3 = -\\tfrac{\\sqrt2}{2}(1 + i) \\approx -0{,}7071 - 0{,}7071\\,i$

Mảng vào tầng 3: $[\\,12,\\ -4+4i,\\ -4,\\ -4-4i,\\ 16,\\ -4+4i,\\ -4,\\ -4-4i\\,]$.

**Butterfly (0,4)**, $a=12$, $b=16$, $W=W_8^0=1$:
$$Wb = 16. \\quad X[0] = 12 + 16 = 28. \\quad X[4] = 12 - 16 = -4.$$

**Butterfly (1,5)**, $a=-4+4i$, $b=-4+4i$, $W=W_8^1 \\approx 0{,}7071 - 0{,}7071\\,i$:
$$
\\begin{aligned}
Wb &= (0{,}7071 - 0{,}7071i)(-4 + 4i) \\\\
   &= 0{,}7071(-4) + 0{,}7071(4i) -0{,}7071i(-4) -0{,}7071i(4i)\\\\
   &= -2{,}8284 + 2{,}8284i + 2{,}8284i + 2{,}8284 \\\\
   &= 0 + 5{,}6569\\,i \\approx 4\\sqrt2\\, i.
\\end{aligned}
$$
$$X[1] = (-4+4i) + 5{,}6569i = -4 + 9{,}6569\\,i.$$
$$X[5] = (-4+4i) - 5{,}6569i = -4 - 1{,}6569\\,i.$$

**Butterfly (2,6)**, $a=-4$, $b=-4$, $W=W_8^2=-i$:
$$Wb = (-i)(-4) = 4i. \\quad X[2] = -4 + 4i. \\quad X[6] = -4 - 4i.$$

**Butterfly (3,7)**, $a=-4-4i$, $b=-4-4i$, $W=W_8^3 \\approx -0{,}7071 - 0{,}7071\\,i$:
$$
\\begin{aligned}
Wb &= (-0{,}7071 - 0{,}7071i)(-4 - 4i) \\\\
   &= (-0{,}7071)(-4) + (-0{,}7071)(-4i) + (-0{,}7071i)(-4) + (-0{,}7071i)(-4i)\\\\
   &= 2{,}8284 + 2{,}8284i + 2{,}8284i - 2{,}8284 \\\\
   &= 0 + 5{,}6569\\,i.
\\end{aligned}
$$
$$X[3] = (-4-4i) + 5{,}6569i = -4 + 1{,}6569\\,i.$$
$$X[7] = (-4-4i) - 5{,}6569i = -4 - 9{,}6569\\,i.$$

### 4.5. Kết quả cuối và kiểm chứng

$$
\\begin{aligned}
X[0] &= 28 \\\\
X[1] &= -4 + 9{,}6569\\,i \\\\
X[2] &= -4 + 4i \\\\
X[3] &= -4 + 1{,}6569\\,i \\\\
X[4] &= -4 \\\\
X[5] &= -4 - 1{,}6569\\,i \\\\
X[6] &= -4 - 4i \\\\
X[7] &= -4 - 9{,}6569\\,i
\\end{aligned}
$$

**Kiểm chứng nhanh hai giá trị bằng DFT trực tiếp:**

- $X[0] = \\sum_n x[n] = 0+1+2+3+4+5+6+7 = 28$ ✓ ($X[0]$ luôn là tổng tín hiệu).
- $X[4] = \\sum_n x[n] W_8^{4n} = \\sum_n x[n](-1)^n = 0-1+2-3+4-5+6-7 = -4$ ✓ ($W_8^4 = e^{-i\\pi}=-1$, nên $W_8^{4n}=(-1)^n$).

Đồng thời tín hiệu thực ⟹ phổ **đối xứng liên hợp**: $X[k] = \\overline{X[8-k]}$. Kiểm: $X[1] = -4 + 9{,}66i$ và $X[7] = -4 - 9{,}66i$ đúng là liên hợp ✓. Mọi cặp khớp ⟹ tin tưởng kết quả.

> 🔁 **Dừng lại tự kiểm tra.** FFT $N=8$ có mấy tầng, mỗi tầng mấy butterfly, tổng cộng bao nhiêu butterfly?
> <details><summary>Đáp án</summary>
> $\\log_2 8 = 3$ tầng, mỗi tầng $N/2 = 4$ butterfly ⟹ $3 \\times 4 = 12$ butterfly. Mỗi butterfly 1 nhân phức ⟹ ~12 nhân phức, so với DFT trực tiếp $N^2 = 64$.
> </details>

> 📝 **Tóm tắt mục 4.** Quy trình FFT radix-2 DIT: (1) bit-reversal đầu vào → (2..) $\\log_2 N$ tầng, tầng $s$ dùng twiddle $W_{2^s}^j$, mỗi tầng $N/2$ butterfly. Kết quả khớp DFT trực tiếp, có đối xứng liên hợp khi tín hiệu thực.

---

## 5. Phân tích độ phức tạp $O(N \\log N)$

Đếm thẳng từ cấu trúc:

- Số tầng = số lần chia đôi tới khi còn 1 phần tử = $\\log_2 N$.
- Mỗi tầng có $N/2$ butterfly, mỗi butterfly = 1 nhân phức + 2 cộng/trừ.

$$\\text{Số nhân phức} = \\log_2 N \\times \\frac{N}{2} = \\frac{N \\log_2 N}{2} = O(N \\log N).$$

Hoặc qua quan hệ truy hồi (đệ quy chia đôi, ghép $O(N)$):

$$T(N) = 2\\,T(N/2) + O(N) \\;\\xRightarrow{\\text{Master theorem}}\\; T(N) = O(N \\log N).$$

(Cùng dạng truy hồi với merge sort — xem [Algorithms chia để trị](../../../Algorithms/).)

**Bảng so sánh số phép tính** (ước lượng nhân phức; FFT lấy $\\tfrac{N}{2}\\log_2 N$):

| $N$ | DFT $N^2$ | FFT $\\tfrac{N}{2}\\log_2 N$ | Tăng tốc |
|---:|---:|---:|---:|
| $8 = 2^3$ | 64 | 12 | ~5× |
| $1.024 = 2^{10}$ | 1.048.576 | 5.120 | ~205× |
| $65.536 = 2^{16}$ | $4{,}3 \\times 10^9$ | 524.288 | ~8.200× |
| $1.048.576 = 2^{20}$ | $1{,}1 \\times 10^{12}$ | $1{,}05 \\times 10^7$ | ~52.000× |

Tăng tốc tỉ lệ $\\dfrac{N^2}{(N/2)\\log_2 N} = \\dfrac{2N}{\\log_2 N}$ — **càng lớn càng đáng giá**.

> ❓ **Câu hỏi tự nhiên.** *"$O(N \\log N)$ với $O(N^2)$ khác bao nhiêu khi $N$ nhỏ?"* — Với $N=8$ chỉ ~5×, không nhiều. Lợi ích bùng nổ khi $N$ lớn: $N=2^{20}$ là ~52.000×. Với $N \\le 4$ DFT trực tiếp thậm chí có thể nhanh hơn do FFT có overhead.

> 📝 **Tóm tắt mục 5.** $\\log_2 N$ tầng × $N/2$ butterfly = $O(N \\log N)$. Truy hồi $T(N)=2T(N/2)+O(N)$. Tăng tốc $\\approx 2N/\\log_2 N$, tăng nhanh theo $N$.

---

## 6. Điều kiện $N = 2^k$, zero-padding, và các biến thể

### 6.1. Vì sao cần $N$ là lũy thừa của 2?

Radix-2 Cooley-Tukey chia đôi mảng ở mỗi tầng. Chia đôi sạch $\\log_2 N$ lần ⟹ $N$ phải là **lũy thừa của 2** ($2, 4, 8, 16, \\ldots$). Nếu $N = 12$, chia đôi ra 6, rồi 3 — số lẻ, không chia tiếp được bằng radix-2.

> ⚠ **Lỗi thường gặp.** Áp radix-2 cho $N$ không phải lũy thừa 2 (vd $N=1000$) ⟹ thuật toán hỏng hoặc cho kết quả sai. Phải xử lý $N$ trước.

### 6.2. Zero-padding

Cách phổ biến nhất: **đệm 0** cho đủ lũy thừa 2 gần nhất.

- Ví dụ $N=1000$ ⟹ đệm thêm 24 số 0 thành $N'=1024 = 2^{10}$.
- Lưu ý: zero-padding **không thêm thông tin tần số mới**, chỉ **nội suy** phổ dày hơn (tăng độ phân giải hiển thị bin tần số), và cho phép dùng FFT radix-2.

### 6.3. Các biến thể FFT

| Biến thể | Ý tưởng | Khi nào dùng |
|---|---|---|
| **Radix-4** | Chia làm 4 nhánh mỗi tầng, ít nhân hơn radix-2 ~25% | $N = 4^k$ |
| **Split-radix** | Trộn radix-2 và radix-4, số phép nhân thấp nhất họ Cooley-Tukey | $N=2^k$, tối ưu cao |
| **Mixed-radix** | Chia theo các thừa số nguyên tố của $N$ (3, 5, 7...) | $N$ hợp số bất kỳ |
| **Bluestein (chirp-z)** | Biến DFT bất kỳ thành tích chập, dùng FFT lớn hơn | $N$ là số nguyên tố lớn |

> 💡 Thư viện thực tế (FFTW, numpy.fft, scipy) tự chọn biến thể tốt nhất theo phân tích thừa số của $N$ — bạn gọi \`fft(x)\` với $N$ bất kỳ vẫn nhanh, không cần tự đệm.

> 📝 **Tóm tắt mục 6.** Radix-2 cần $N=2^k$. Không đủ thì zero-pad lên lũy thừa 2 gần nhất (nội suy phổ, không thêm thông tin). Biến thể: radix-4, split-radix, mixed-radix, Bluestein xử lý mọi $N$.

---

## 7. Ứng dụng thực tế

1. **Audio thời gian thực** — equalizer, auto-tune, nhận diện giọng nói: cửa sổ FFT liên tục trên luồng âm thanh (dẫn tới STFT/spectrogram — [bài tiếp theo](../lesson-06-spectrogram-stft/)). Nhờ FFT, phổ tính được trong vài mili-giây.
2. **Xử lý ảnh** — JPEG dùng DCT (họ hàng FFT); lọc nhiễu, làm mờ/sắc nét bằng nhân trong miền tần số nhanh hơn convolution trực tiếp.
3. **Nhân đa thức / số lớn nhanh** — nhân hai đa thức bậc $n$ trong $O(n \\log n)$ (thay vì $O(n^2)$) bằng cách: FFT hệ số → nhân điểm-điểm → IFFT. Đây là nền của nhân số nguyên cực lớn (thuật toán Schönhage-Strassen). Liên hệ trực tiếp [Algorithms chia để trị](../../../Algorithms/).
4. **Viễn thông** — OFDM (4G/5G, Wi-Fi) điều chế/giải điều chế dữ liệu trên hàng nghìn sóng mang con bằng FFT/IFFT mỗi symbol.
5. **Giải phương trình vi phân & mô phỏng khoa học** — phương pháp phổ (spectral methods) chuyển đạo hàm thành nhân trong miền tần số.

> 💡 **Liên hệ chia để trị.** FFT là ví dụ kinh điển cho thấy đổi $O(N^2) \\to O(N\\log N)$ bằng chia để trị có thể "mở khóa" cả một ngành công nghệ. Cùng tư duy với merge sort, nhân Karatsuba — xem [Algorithms](../../../Algorithms/).

---

## Bài tập

1. **Bit-reversal.** Cho $N = 16$, tính chỉ số đảo bit của các chỉ số gốc 1, 5, 11, 14. (Dùng 4 bit.)

2. **Một butterfly.** Tính $\\text{butterfly}(a, b, W)$ với $a = 2 + 3i$, $b = 1 - i$, $W = W_8^2 = -i$.

3. **Tách chẵn/lẻ.** Cho $N = 8$. Viết công thức $X[6]$ và $X[2]$ theo $E[\\cdot]$, $O[\\cdot]$ và twiddle phù hợp.

4. **FFT $N=4$ đầy đủ.** Tính FFT của $x = [1, 2, 3, 4]$ qua bit-reversal + 2 tầng. Kiểm tra $X[0]$ và $X[2]$ bằng DFT trực tiếp.

5. **Đếm phép tính.** Với $N = 4096 = 2^{12}$: tính số nhân phức của DFT trực tiếp và của FFT, rồi tỉ số tăng tốc.

6. **Zero-padding.** Cho tín hiệu 700 mẫu, muốn dùng radix-2 FFT. Cần đệm bao nhiêu số 0? $N'$ là bao nhiêu?

7. **(Nâng cao) Tính chất đối xứng.** Tín hiệu thực $x$ độ dài $N$. Chứng minh $X[k] = \\overline{X[N-k]}$. Suy ra chỉ cần lưu nửa phổ.

---

## Lời giải chi tiết

### Bài 1 — Bit-reversal $N=16$ (4 bit)

Viết mỗi chỉ số 4 bit, đảo ngược thứ tự bit, đọc lại:

| Gốc | Nhị phân | Đảo | Kết quả |
|:---:|:---:|:---:|:---:|
| 1 | 0001 | 1000 | 8 |
| 5 | 0101 | 1010 | 10 |
| 11 | 1011 | 1101 | 13 |
| 14 | 1110 | 0111 | 7 |

**Đáp số:** $1 \\to 8$, $5 \\to 10$, $11 \\to 13$, $14 \\to 7$.

### Bài 2 — Một butterfly

$a = 2+3i$, $b = 1-i$, $W = -i$.

Bước 1: $Wb = (-i)(1 - i) = -i + i^2 = -i - 1 = -1 - i$.

Bước 2 (output trên): $a + Wb = (2+3i) + (-1-i) = 1 + 2i$.

Bước 3 (output dưới): $a - Wb = (2+3i) - (-1-i) = 3 + 4i$.

**Đáp số:** $(1 + 2i,\\ 3 + 4i)$.

### Bài 3 — Tách chẵn/lẻ cho $X[6]$, $X[2]$

Công thức chuẩn: $X[k] = E[k] + W_N^k O[k]$ cho $k < N/2$; $X[k+N/2] = E[k] - W_N^k O[k]$.

- $X[2]$: $2 < 4$ nên dùng trực tiếp: $X[2] = E[2] + W_8^2\\, O[2]$.
- $X[6]$: $6 = 2 + 4 = 2 + N/2$ nên $X[6] = E[2] - W_8^2\\, O[2]$.

(Chú ý $E, O$ là DFT kích thước 4, chỉ số lấy $\\bmod\\ 4$; ở đây $2 < 4$ nên giữ nguyên.)

### Bài 4 — FFT $N=4$ đầy đủ, $x = [1,2,3,4]$

**Bit-reversal** ($N=4$, 2 bit): $0\\,(00)\\to00=0$, $1\\,(01)\\to10=2$, $2\\,(10)\\to01=1$, $3\\,(11)\\to11=3$. Mảng đảo bit: $[x[0], x[2], x[1], x[3]] = [1, 3, 2, 4]$.

**Tầng 1** ($W_2^0 = 1$), butterfly cặp (0,1) và (2,3):
- $(1, 3)$: $(1+3,\\ 1-3) = (4, -2)$.
- $(2, 4)$: $(2+4,\\ 2-4) = (6, -2)$.

Sau tầng 1: $[4, -2, 6, -2]$.

**Tầng 2** ($W_4^0=1$, $W_4^1=-i$), butterfly cặp (0,2) và (1,3):
- $(a,b)=(4,6)$, $W=1$: $(4+6,\\ 4-6) = (10, -2)$ → vị trí 0, 2.
- $(a,b)=(-2,-2)$, $W=-i$: $Wb = (-i)(-2) = 2i$. $(-2 + 2i,\\ -2 - 2i)$ → vị trí 1, 3.

**Kết quả:** $X = [10,\\ -2+2i,\\ -2,\\ -2-2i]$.

**Kiểm chứng DFT trực tiếp:**
- $X[0] = 1+2+3+4 = 10$ ✓.
- $X[2] = \\sum_n x[n] W_4^{2n} = \\sum_n x[n](-1)^n = 1 - 2 + 3 - 4 = -2$ ✓ (vì $W_4^2 = e^{-i\\pi} = -1$).

### Bài 5 — Đếm phép tính $N = 4096 = 2^{12}$

- DFT trực tiếp: $N^2 = 4096^2 = 16.777.216 \\approx 1{,}68 \\times 10^7$ nhân phức.
- FFT: $\\tfrac{N}{2}\\log_2 N = \\tfrac{4096}{2}\\times 12 = 2048 \\times 12 = 24.576$ nhân phức.
- Tăng tốc: $16.777.216 / 24.576 \\approx 683$ lần. (Hoặc nhanh: $\\tfrac{2N}{\\log_2 N} = \\tfrac{8192}{12} \\approx 683$.)

### Bài 6 — Zero-padding 700 mẫu

Lũy thừa 2 nhỏ nhất $\\ge 700$ là $2^{10} = 1024$ (vì $2^9 = 512 < 700$). Cần đệm $1024 - 700 = 324$ số 0. $N' = 1024$.

### Bài 7 — Đối xứng liên hợp của tín hiệu thực

Với $x[n]$ thực ($\\overline{x[n]} = x[n]$):

$$
\\begin{aligned}
\\overline{X[k]} &= \\overline{\\sum_{n} x[n]\\, e^{-2\\pi i nk/N}}
= \\sum_n \\overline{x[n]}\\; \\overline{e^{-2\\pi i nk/N}} \\\\
&= \\sum_n x[n]\\, e^{+2\\pi i nk/N}
= \\sum_n x[n]\\, e^{-2\\pi i n(N-k)/N} \\cdot e^{2\\pi i n N / N}.
\\end{aligned}
$$

Vì $e^{2\\pi i n N / N} = e^{2\\pi i n} = 1$ (n nguyên), nên:

$$\\overline{X[k]} = \\sum_n x[n]\\, e^{-2\\pi i n(N-k)/N} = X[N-k].$$

Vậy $X[k] = \\overline{X[N-k]}$. **Hệ quả:** biết nửa phổ $X[0 \\ldots N/2]$ là suy ra phần còn lại bằng liên hợp ⟹ chỉ cần lưu ~$N/2 + 1$ giá trị thay vì $N$ (tiết kiệm một nửa bộ nhớ, dùng trong \`rfft\`).

---

## Tham khảo & Bài tiếp theo

- Bài trước: [Lesson 09 — DFT](../lesson-04-dft/) (công thức gốc mà FFT tăng tốc).
- Bài tiếp theo: [Lesson 11 — Spectrogram (STFT)](../lesson-06-spectrogram-stft/) — chạy FFT trên các cửa sổ thời gian liên tiếp để xem phổ **biến đổi theo thời gian**.
- Liên quan: [Algorithms — chia để trị](../../../Algorithms/) (cùng tư duy đệ quy chia đôi), [DataFoundations — binary & bit](../../../DataFoundations/01-NumberRepresentation/lesson-01-binary-hex/) (bit-reversal).
- Cooley, J. W. & Tukey, J. W. (1965). *An algorithm for the machine calculation of complex Fourier series.* — bài báo gốc.

[▶ Mở visualization](./visualization.html)
`;
