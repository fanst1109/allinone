// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/02-Fourier/lesson-02-epicycles-euler/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Epicycle & Fourier phức (Complex Fourier / vector quay)

> **Câu hỏi mở bài.** Làm sao **chỉ bằng một chuỗi vòng tròn quay** — vòng này gắn lên đầu mút vòng kia — lại vẽ ra được *bất kỳ* hình nào: một chữ ký tay, hình trái tim, chữ cái, hay khuôn mặt? Câu trả lời nằm gọn trong một công thức duy nhất: **chuỗi Fourier phức**. Mỗi số hạng của chuỗi *chính là một vòng tròn quay*. Cộng tất cả lại, đầu mút của vòng cuối cùng vạch ra hình mà ta muốn. Bài này sẽ "đóng" câu hỏi đó bằng số cụ thể và một cỗ máy vẽ tương tác.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **công thức Euler** $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ và vì sao nó biến "một góc" thành "một điểm trên đường tròn đơn vị".
- Hiểu **phasor / vector quay** $e^{in\\omega_0 t}$: một vector bán kính 1 quay với tần số $n$.
- Viết được **chuỗi Fourier dạng phức** $f(t) = \\sum_{n=-\\infty}^{\\infty} c_n e^{in\\omega_0 t}$ và tính hệ số $c_n = \\frac{1}{T}\\int_0^T f(t)\\,e^{-in\\omega_0 t}\\,dt$.
- Hiểu **vì sao xuất hiện chỉ số $n$ âm** trong dạng phức (mà dạng sin/cos không có).
- Chuyển qua lại giữa $c_n$ và bộ hệ số $a_n, b_n$ của chuỗi Fourier thực (đã học ở L06).
- Hiểu **trực giác epicycle**: mỗi $c_n$ là một vòng tròn bán kính $|c_n|$, pha ban đầu $\\arg(c_n)$, quay tần số $n$; nối đuôi nhau thì đầu mút vẽ ra $f(t)$.
- Đọc được **phổ (spectrum)** $|c_n|$ theo $n$ và thấy nó là cây cầu sang **biến đổi Fourier** (L08).

## Kiến thức tiền đề

- [L06 — Chuỗi Fourier (dạng sin/cos)](../lesson-01-fourier-series/) — bài này là phiên bản phức, gọn hơn của L06.
- [Math/03 — Số phức, dạng cực & Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/) — nền tảng $e^{i\\theta}$, nhân số phức = quay + co giãn.
- [Tier1 L01 — Tín hiệu cơ bản & phasor](../../01-Foundations/lesson-01-signals-basics/) — khái niệm phasor, tần số góc $\\omega$.

---

## 1. Vì sao chuyển sang dạng phức?

### 1.1. Trực giác: một vector quay thay cho cả cặp sin–cos

> 💡 **Trực giác.** Ở L06, mỗi tần số $n$ cần **hai** số ($a_n$ cho cos, $b_n$ cho sin) và **hai** hàm lượng giác. Hình dung khác đi: thay vì "cộng một sóng cos và một sóng sin", hãy tưởng tượng một **cây kim đồng hồ** dài $r_n$ quay đều. Bóng của kim chiếu lên trục ngang cho ra cos, chiếu lên trục dọc cho ra sin. Một cây kim quay mã hoá *đồng thời* cả cos lẫn sin. Dạng phức chính là "ngôn ngữ của kim quay".

So sánh trực tiếp hai cách viết cùng một tín hiệu:

| | Dạng thực (L06) | Dạng phức (bài này) |
| --- | --- | --- |
| Số hạng tần số $n$ | $a_n\\cos(n\\omega_0 t) + b_n\\sin(n\\omega_0 t)$ | $c_n e^{in\\omega_0 t} + c_{-n} e^{-in\\omega_0 t}$ |
| Số "tham số" mỗi tần số | 2 số thực | 1 số phức (= 2 số thực) |
| Phép tính chính | đạo hàm/tích phân của $\\sin,\\cos$ rườm rà | đạo hàm/tích phân của $e^{x}$ — bất biến |
| Câu hỏi điển hình | "biên độ cos và sin là bao nhiêu?" | "vector quay này dài bao nhiêu, pha bao nhiêu?" |

Lý do toán học khiến dạng phức "đẹp": $\\dfrac{d}{dt} e^{in\\omega_0 t} = in\\omega_0\\, e^{in\\omega_0 t}$ — đạo hàm chỉ là nhân với một hằng số. Không hàm lượng giác nào có tính chất sạch như vậy. Mọi phép lọc, dịch pha, vi/tích phân trên tín hiệu trở thành phép nhân số phức.

### 1.2. Vì sao đây là "ăn tiền" cho việc vẽ hình

Một hình vẽ trên mặt phẳng là một đường đi của điểm $(x(t), y(t))$. Nếu ta **gói** nó thành **một số phức** $z(t) = x(t) + i\\,y(t)$, thì toàn bộ hình chỉ là *một hàm phức theo thời gian*. Chuỗi Fourier phức phân tích $z(t)$ thành tổng các vector quay → vẽ lại hình bằng epicycle. Dạng sin/cos *không* gói gọn được $x$ và $y$ vào một đối tượng như vậy.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao ta không dùng dạng sin/cos để vẽ hình 2D trực tiếp?
> <details><summary>Đáp án</summary>Vì hình 2D cần đồng thời toạ độ $x$ và $y$. Số phức $z = x + iy$ nhét cả hai vào một đối tượng nên một chuỗi Fourier phức là đủ. Với sin/cos bạn phải chạy hai chuỗi rời cho $x(t)$ và $y(t)$ — vẫn được, nhưng mất đi vẻ đẹp "một vector quay = một số hạng" và không nhìn ra ngay cấu trúc epicycle.</details>

📝 **Tóm tắt mục 1.** Dạng phức: (1) gom cặp $\\cos/\\sin$ thành **một** vector quay; (2) đạo hàm/tích phân của $e^x$ bất biến → đại số gọn; (3) gói $x,y$ thành $z=x+iy$ → vẽ hình 2D bằng đúng một chuỗi.

---

## 2. Công thức Euler — viên gạch nền

### 2.1. Phát biểu và ý nghĩa hình học

$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$

**(a) Là gì.** $e^{i\\theta}$ là **điểm trên đường tròn đơn vị** ứng với góc $\\theta$ (đo từ trục thực dương, ngược chiều kim đồng hồ). Phần thực là $\\cos\\theta$ (toạ độ ngang), phần ảo là $\\sin\\theta$ (toạ độ dọc).

**(b) Vì sao tồn tại / vì sao cần.** Nó nối hai thế giới tưởng như rời nhau: **hàm mũ** (tăng trưởng) và **lượng giác** (dao động). Nhờ vậy mọi phép quay trở thành phép nhân mũ: quay thêm góc $\\phi$ = nhân với $e^{i\\phi}$. Đây là điều khiến "vector quay" có một ký hiệu duy nhất, gọn.

**(c) Ví dụ trực giác bằng số.**

| $\\theta$ | $e^{i\\theta}$ | Vị trí trên đường tròn |
| --- | --- | --- |
| $0$ | $1$ | điểm $(1,0)$ — bên phải |
| $\\pi/2$ | $i$ | điểm $(0,1)$ — trên đỉnh |
| $\\pi$ | $-1$ | điểm $(-1,0)$ — bên trái |
| $3\\pi/2$ | $-i$ | điểm $(0,-1)$ — dưới đáy |

Kiểm chứng $\\theta = \\pi$: $e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + i\\cdot 0 = -1$ ✓. Đây chính là đẳng thức nổi tiếng $e^{i\\pi} + 1 = 0$.

> 💡 **Trực giác.** Nhân hai số phức = **cộng góc, nhân độ dài**. Vì $e^{i\\alpha}\\cdot e^{i\\beta} = e^{i(\\alpha+\\beta)}$, nhân với $e^{i\\phi}$ (độ dài 1) chỉ **quay** điểm đi góc $\\phi$, không co giãn. Đó là lý do "vector quay" hoạt động.

### 2.2. Hai hệ thức ngược (rút cos, sin từ mũ)

Cộng/trừ $e^{i\\theta}$ và $e^{-i\\theta} = \\cos\\theta - i\\sin\\theta$:

$$\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}, \\qquad \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}$$

> ⚠ **Lỗi thường gặp.** Quên dấu/hệ số $2i$ ở mẫu của $\\sin$. Kiểm tra nhanh với $\\theta = \\pi/2$: $\\sin(\\pi/2) = \\dfrac{e^{i\\pi/2} - e^{-i\\pi/2}}{2i} = \\dfrac{i - (-i)}{2i} = \\dfrac{2i}{2i} = 1$ ✓. Nếu bạn ra $-1$ hay $i$, là đã sai dấu hoặc bỏ $i$ ở mẫu.

**Hệ quả cốt lõi:** một sóng cos thực $\\cos(n\\omega_0 t)$ tách thành **hai** vector quay — một quay xuôi tần số $+n$, một quay ngược tần số $-n$, mỗi cái biên độ $1/2$. Đây là gốc rễ của chỉ số âm ở mục 3.

> ❓ **Câu hỏi tự nhiên.**
> - *"$e$ mũ một số ảo nghĩa là gì? Mũ thường là nhân lặp cơ mà?"* — Không hiểu theo "nhân lặp". Hiểu qua **chuỗi luỹ thừa**: $e^{x} = 1 + x + \\frac{x^2}{2!} + \\cdots$. Thay $x = i\\theta$, gom phần thực và ảo lại, ta được đúng chuỗi của $\\cos\\theta$ và $\\sin\\theta$. Euler là một **định lý**, không phải định nghĩa tuỳ tiện.
> - *"Vì sao quay ngược chiều kim đồng hồ là chiều dương?"* — Quy ước toán học chuẩn: góc dương đo ngược chiều kim đồng hồ. Vector $e^{+i\\theta}$ với $\\theta$ tăng sẽ quay ngược chiều kim đồng hồ.

🔁 **Dừng lại tự kiểm tra.** Tính $e^{i\\cdot 3\\pi/2}$.
<details><summary>Đáp án</summary>$\\cos(3\\pi/2) + i\\sin(3\\pi/2) = 0 + i(-1) = -i$. Điểm $(0,-1)$ ở đáy đường tròn.</details>

📝 **Tóm tắt mục 2.** $e^{i\\theta}$ = điểm trên đường tròn đơn vị ở góc $\\theta$. Nhân số phức = cộng góc. $\\cos,\\sin$ là tổ hợp của $e^{\\pm i\\theta}$ → một sóng thực luôn cần **cặp** tần số $+n$ và $-n$.

---

## 3. Chuỗi Fourier phức

### 3.1. Vector quay $e^{in\\omega_0 t}$ — viên gạch của tín hiệu

Với chu kỳ $T$ và **tần số góc cơ bản** $\\omega_0 = \\dfrac{2\\pi}{T}$, hàm

$$\\phi_n(t) = e^{in\\omega_0 t}$$

là một **vector quay (phasor)**: độ dài luôn $= 1$, quay với tần số $n$ lần tần số cơ bản. Tại $t=0$ nó nằm ở $1$ (góc 0); càng $|n|$ lớn nó quay càng nhanh; $n<0$ thì quay ngược chiều.

### 3.2. Công thức tổng hợp và phân tích

**Tổng hợp (synthesis)** — dựng tín hiệu từ các vector quay:

$$f(t) = \\sum_{n=-\\infty}^{\\infty} c_n\\, e^{in\\omega_0 t}$$

**Phân tích (analysis)** — rút từng hệ số ra khỏi tín hiệu:

$$c_n = \\frac{1}{T}\\int_{0}^{T} f(t)\\, e^{-in\\omega_0 t}\\, dt$$

> 💡 **Trực giác công thức $c_n$.** Nhân $f(t)$ với $e^{-in\\omega_0 t}$ là "giữ cây kim tần số $n$ đứng yên" — như đứng trên một vòng quay tròn ngược lại đúng tốc độ $n$ để nhìn thành phần $n$ thành bất động. Lấy tích phân (trung bình theo chu kỳ) thì mọi tần số khác *quay tròn nên trung bình về 0*, chỉ còn lại đúng $c_n$. Đó là **tính trực giao** của các $e^{in\\omega_0 t}$.

Nền tảng là hệ thức trực giao:

$$\\frac{1}{T}\\int_0^T e^{i(m-n)\\omega_0 t}\\,dt = \\begin{cases} 1 & m = n \\\\ 0 & m \\ne n \\end{cases}$$

### 3.3. Vì sao có chỉ số $n$ âm?

> ❓ **Câu hỏi tự nhiên.** *"Tần số âm là cái gì? Sao một sóng lại có tần số âm?"*

Tần số âm **không** là một hiện tượng vật lý riêng — nó là *kế toán toán học*. Từ mục 2.2, một sóng thực $\\cos(n\\omega_0 t)$ = nửa vector quay xuôi $+n$ cộng nửa vector quay ngược $-n$. Để tổng các vector quay (vốn phức) lại ra một **hàm thực**, phần ảo phải triệt tiêu. Điều đó xảy ra đúng khi:

$$c_{-n} = \\overline{c_n} \\quad (\\text{liên hợp phức})$$

Cặp $c_n$ và $c_{-n}$ là hai vector quay ngược chiều, đối xứng gương; phần ảo của chúng khử nhau ở mọi $t$, để lại quỹ đạo thực. **Nếu $f(t)$ thực thì phổ đối xứng liên hợp.** (Khi vẽ hình 2D ở mục 5, $z(t)$ là phức nên điều kiện này không bắt buộc — đó là lý do hình vẽ tự do hơn sóng thực.)

### 3.4. Quan hệ giữa $c_n$ và $a_n, b_n$ (cầu nối L06)

Chuỗi thực L06: $f(t) = \\dfrac{a_0}{2} + \\sum_{n=1}^{\\infty}\\big[a_n\\cos(n\\omega_0 t) + b_n\\sin(n\\omega_0 t)\\big]$. Thay $\\cos,\\sin$ bằng mũ (mục 2.2) và gom theo $e^{in\\omega_0 t}$:

$$c_0 = \\frac{a_0}{2}, \\qquad c_n = \\frac{a_n - i\\,b_n}{2}, \\qquad c_{-n} = \\frac{a_n + i\\,b_n}{2} \\quad (n \\ge 1)$$

Ngược lại: $a_n = c_n + c_{-n} = 2\\,\\mathrm{Re}(c_n)$ và $b_n = i(c_n - c_{-n}) = -2\\,\\mathrm{Im}(c_n)$.

> ⚠ **Lỗi thường gặp.** Nhầm dấu: $c_n = \\frac{a_n - i b_n}{2}$ (dấu **trừ** $i b_n$), còn $c_{-n} = \\frac{a_n + i b_n}{2}$. Đảo dấu là sai. Mẹo nhớ: chỉ số dương $n$ đi với dấu trừ (đến từ $e^{-in\\omega_0 t}$ trong công thức phân tích).

### 3.5. Bốn ví dụ số tính $c_n$

**Ví dụ 1 — Một cosin thuần.** $f(t) = \\cos(\\omega_0 t)$. Vì $\\cos = \\frac{e^{i\\omega_0 t} + e^{-i\\omega_0 t}}{2}$, đọc thẳng ra:

$$c_1 = \\tfrac12,\\quad c_{-1} = \\tfrac12,\\quad c_n = 0\\ (\\lvert n\\rvert \\ne 1).$$

Kiểm tra đối xứng liên hợp: $c_{-1} = \\overline{c_1} = \\overline{1/2} = 1/2$ ✓ (số thực nên tự liên hợp).

**Ví dụ 2 — Một sin thuần.** $f(t) = \\sin(\\omega_0 t) = \\dfrac{e^{i\\omega_0 t} - e^{-i\\omega_0 t}}{2i}$. Nhân tử/mẫu cho $-i$ ($\\frac{1}{2i} = \\frac{-i}{2}$):

$$c_1 = \\frac{1}{2i} = -\\frac{i}{2},\\qquad c_{-1} = -\\frac{1}{2i} = \\frac{i}{2}.$$

Kiểm tra: $c_{-1} = \\overline{c_1} = \\overline{-i/2} = i/2$ ✓. Pha $\\arg(c_1) = -\\pi/2$ — đúng với "sin trễ pha cos $90°$".

**Ví dụ 3 — Hằng số (thành phần DC).** $f(t) = 5$. Khi đó $c_0 = \\frac{1}{T}\\int_0^T 5\\,dt = 5$, và mọi $c_n = 0$ với $n\\ne 0$ (tích phân của vector quay trọn vòng = 0). $c_0$ là **giá trị trung bình** của tín hiệu — tâm của toàn bộ hệ epicycle.

**Ví dụ 4 — Sóng vuông lẻ.** $f(t)$ chu kỳ $T$, bằng $+1$ trên nửa đầu $[0, T/2)$, $-1$ trên nửa sau. Tính trực tiếp với $n\\ne 0$:

$$c_n = \\frac{1}{T}\\left[\\int_0^{T/2} e^{-in\\omega_0 t}dt - \\int_{T/2}^{T} e^{-in\\omega_0 t}dt\\right].$$

Đặt $\\omega_0 = 2\\pi/T$. Sau khi lấy tích phân và rút gọn (chi tiết ở Lời giải BT3):

$$c_n = \\begin{cases} \\dfrac{2}{i\\pi n} = -\\dfrac{2i}{\\pi n} & n \\text{ lẻ} \\\\[2mm] 0 & n \\text{ chẵn} \\end{cases}, \\qquad c_0 = 0.$$

Vậy chỉ tần số lẻ tồn tại, biên độ $|c_n| = \\dfrac{2}{\\pi|n|}$ giảm dần như $1/|n|$. Số: $|c_1| = \\frac{2}{\\pi}\\approx 0{,}637$, $|c_3| = \\frac{2}{3\\pi}\\approx 0{,}212$, $|c_5|\\approx 0{,}127$. Đây chính là preset "sóng vuông" trong viz.

> 🔁 **Dừng lại tự kiểm tra.** Với $f(t)=\\cos(2\\omega_0 t)$ (hài bậc 2), các $c_n$ khác 0 là gì?
> <details><summary>Đáp án</summary>$c_2 = c_{-2} = 1/2$, mọi hệ số khác bằng 0. Tần số gấp đôi → kim quay nhanh gấp đôi.</details>

📝 **Tóm tắt mục 3.** $f(t)=\\sum c_n e^{in\\omega_0 t}$, $c_n = \\frac1T\\int_0^T f\\,e^{-in\\omega_0 t}dt$. Chỉ số âm đến từ việc một sóng thực = cặp vector quay ngược chiều; tín hiệu thực ⇒ $c_{-n}=\\overline{c_n}$. Cầu nối L06: $c_n = (a_n - i b_n)/2$.

---

## 4. Epicycle — dựng hình bằng vector quay nối đuôi

### 4.1. Trực giác cỗ máy

> 💡 **Trực giác.** Hình dung hệ bánh răng đồng hồ thiên văn cổ: một cánh tay gắn ở tâm, đầu cánh tay gắn cánh tay thứ hai ngắn hơn quay nhanh hơn, đầu cánh tay đó lại gắn cánh tay thứ ba... **Đầu mút của cánh tay cuối cùng** để lại vệt mực — đó là hình vẽ. Mỗi cánh tay = một số hạng $c_n e^{in\\omega_0 t}$: độ dài cánh tay $= |c_n|$, góc khởi đầu $= \\arg(c_n)$, tốc độ quay $= n$.

Cụ thể, tại thời điểm $t$, đầu mút (vị trí cây bút) là tổng tích luỹ:

$$P(t) = \\sum_{n} c_n\\, e^{in\\omega_0 t} = \\underbrace{c_0}_{\\text{tâm}} + c_1 e^{i\\omega_0 t} + c_{-1}e^{-i\\omega_0 t} + c_2 e^{2i\\omega_0 t} + \\cdots$$

Mỗi số hạng "đẩy" cây bút đi thêm một đoạn vector; cộng dồn theo thứ tự biên độ giảm dần cho hoạt hình đẹp nhất.

### 4.2. Walk-through dựng từ 1–2 số hạng

Lấy tín hiệu phức đơn giản $z(t) = e^{i\\omega_0 t} + \\tfrac12 e^{2i\\omega_0 t}$ (hai vector quay; $c_1 = 1$, $c_2 = \\tfrac12$). Đặt $\\omega_0 = 2\\pi$ (chu kỳ $T=1$). Tính đầu mút tại vài mốc $t$:

| $t$ | $e^{i\\omega_0 t}$ | $\\tfrac12 e^{2i\\omega_0 t}$ | $P(t) = $ tổng | điểm $(x,y)$ |
| --- | --- | --- | --- | --- |
| $0$ | $1$ | $0{,}5$ | $1{,}5$ | $(1{,}5,\\ 0)$ |
| $1/8$ | $e^{i\\pi/4}\\approx 0{,}71+0{,}71i$ | $\\tfrac12 e^{i\\pi/2}=0{,}5i$ | $0{,}71 + 1{,}21i$ | $(0{,}71,\\ 1{,}21)$ |
| $1/4$ | $i$ | $\\tfrac12 e^{i\\pi}=-0{,}5$ | $-0{,}5 + i$ | $(-0{,}5,\\ 1)$ |
| $1/2$ | $-1$ | $\\tfrac12 e^{2i\\pi}=0{,}5$ | $-0{,}5$ | $(-0{,}5,\\ 0)$ |

Nối các điểm $(x,y)$ này (và các mốc dày hơn) ta được một đường cong khép kín — quỹ đạo do **hai** epicycle vẽ ra. Thêm số hạng $c_3, c_4, \\dots$ thì đường cong càng bám sát hình mục tiêu. Đây chính xác là điều slider "số vòng tròn N" trong viz làm.

> ⚠ **Lỗi thường gặp.** Cộng các vector quay **song song** (cùng gốc) thay vì **nối đuôi**. Về kết quả điểm cuối thì giống nhau (cộng vector có tính giao hoán), nhưng hoạt hình epicycle phải vẽ nối đuôi: gốc vòng sau = đầu mút vòng trước. Vẽ song song thì mất hình ảnh "bánh răng lồng nhau".

> ❓ **Câu hỏi tự nhiên.** *"Thứ tự nối các vòng có quan trọng không?"* — Với *vị trí điểm cuối* thì không (cộng giao hoán). Với *hình ảnh động* thì chỉ ảnh hưởng thẩm mỹ. Thông lệ: sắp theo $|c_n|$ giảm dần, hoặc theo $n = 0, +1, -1, +2, -2, \\dots$ để vòng to ở ngoài.

🔁 **Dừng lại tự kiểm tra.** Nếu mọi $c_n$ đều nhân thêm $e^{i\\pi/2}$ (cùng một pha), hình thay đổi thế nào?
<details><summary>Đáp án</summary>Toàn bộ hình **quay** đi $90°$ quanh tâm $c_0$ (đúng hơn: quanh gốc nếu $c_0$ cũng được nhân). Nhân chung một pha cho mọi hệ số = quay cả tổng. Hình dạng giữ nguyên, chỉ định hướng đổi.</details>

📝 **Tóm tắt mục 4.** Epicycle = chuỗi vector quay nối đuôi; vòng $n$ có bán kính $|c_n|$, pha đầu $\\arg(c_n)$, tốc độ $n$. Đầu mút vòng cuối vẽ ra $f(t)$. Càng nhiều vòng, hình càng sắc.

---

## 5. Phổ (spectrum) và cầu nối sang biến đổi Fourier

### 5.1. Phổ biên độ $|c_n|$

**Phổ biên độ** là đồ thị cột $|c_n|$ theo $n$ (kèm phổ pha $\\arg(c_n)$ nếu cần). Nó trả lời: "tín hiệu này gồm những tần số nào, mỗi tần số mạnh ra sao?"

- Sóng vuông (Ví dụ 4): các cột chỉ ở $n$ lẻ, cao $\\frac{2}{\\pi|n|}$ — *tắt dần* như $1/|n|$.
- Sóng răng cưa: cột ở mọi $n\\ne 0$, cao $\\frac{1}{\\pi|n|}$.
- Một cosin thuần: đúng hai cột ở $\\pm 1$, cao $1/2$ — phổ "vạch".

> 💡 **Trực giác.** Bán kính vòng tròn trong cỗ máy epicycle **chính là** chiều cao cột phổ. Vòng nào to (cột cao) đóng góp nhiều vào hình; vòng tí xíu (cột thấp) chỉ thêm chi tiết nhỏ. Cắt bớt các cột thấp = **nén** tín hiệu/hình mà mắt gần như không thấy khác — nền của JPEG/MP3.

### 5.2. Từ chuỗi Fourier sang biến đổi Fourier (L08)

Chuỗi Fourier áp cho tín hiệu **tuần hoàn** → phổ là **vạch rời rạc** tại $n\\omega_0$. Khi cho chu kỳ $T \\to \\infty$ (tín hiệu *không* tuần hoàn), các vạch xích lại sát nhau:

$$\\omega_0 = \\frac{2\\pi}{T} \\to 0 \\quad\\Rightarrow\\quad \\text{phổ vạch} \\to \\text{phổ liên tục } X(\\omega).$$

Tổng $\\sum_n$ trở thành tích phân $\\int d\\omega$, và ta được **biến đổi Fourier** — chủ đề L08. Nói gọn: biến đổi Fourier là chuỗi Fourier khi số vòng epicycle trở nên *dày đặc liên tục*.

> ❓ **Câu hỏi tự nhiên.** *"Phổ rời rạc và phổ liên tục khác nhau ở đâu?"* — Tín hiệu tuần hoàn chỉ chứa các tần số là **bội nguyên** của $\\omega_0$ → vạch rời. Tín hiệu bất kỳ (một xung, một nốt nhạc tắt dần) chứa **mọi** tần số ở mức độ khác nhau → đường cong liên tục.

📝 **Tóm tắt mục 5.** Phổ $|c_n|$ = bán kính các vòng epicycle. Cắt cột thấp = nén. Cho $T\\to\\infty$, phổ vạch hoá thành phổ liên tục → biến đổi Fourier (L08).

---

## 6. Ứng dụng thực tế

1. **Fourier drawing (vẽ hình bằng epicycle).** Lấy một đường viền (chữ ký, logo, hình trái tim), lấy mẫu thành dãy điểm phức $z_k$, chạy DFT để ra $c_n$, rồi cho chuỗi vòng tròn quay vẽ lại — thứ bạn thấy trong các video "vẽ hình bằng vòng tròn" nổi tiếng. Viz của bài này là một bản thu nhỏ.
2. **Nén ảnh/âm thanh (JPEG, MP3).** Giữ lại các $c_n$ biên độ lớn, bỏ các $c_n$ nhỏ. JPEG dùng họ hàng DCT trên từng khối 8×8; MP3 bỏ các thành phần tần số tai người ít nhạy.
3. **Phân tích tần số.** Equalizer, tuner đàn, nhận diện nốt nhạc, phát hiện rung động hỏng hóc trong máy móc — đều đọc phổ $|c_n|$ hoặc $|X(\\omega)|$.
4. **Lọc tín hiệu (filtering).** Lọc thông thấp = nhân phổ với mặt nạ giữ $n$ nhỏ, zero $n$ lớn. Trong miền vector quay, lọc chỉ là "giữ lại vài cây kim".
5. **Quang học & vật lý.** Nhiễu xạ qua khe là biến đổi Fourier của khe; tinh thể học (X-ray crystallography) đọc phổ để suy ra cấu trúc nguyên tử.

---

## 7. Bài tập

1. **Euler cơ bản.** Tính $e^{i\\theta}$ tại $\\theta = \\pi/4$, $\\theta = 2\\pi/3$, $\\theta = -\\pi/2$. Vẽ (mô tả) vị trí trên đường tròn đơn vị.
2. **Đổi giữa hai dạng.** Cho chuỗi thực $f(t) = 3 + 2\\cos(\\omega_0 t) - 4\\sin(\\omega_0 t) + \\cos(2\\omega_0 t)$. Tìm tất cả $c_n$ khác 0. Kiểm tra $c_{-n} = \\overline{c_n}$.
3. **Hệ số sóng vuông.** Chứng minh đầy đủ công thức $c_n = -\\frac{2i}{\\pi n}$ ($n$ lẻ), $0$ ($n$ chẵn) cho sóng vuông $\\pm 1$ ở Ví dụ 4.
4. **Sóng răng cưa.** Cho $f(t) = t$ trên $[-T/2, T/2)$ lặp tuần hoàn. Tính $c_n$ và phổ $|c_n|$. So sánh tốc độ tắt với sóng vuông.
5. **Epicycle hai vòng.** Cho $z(t) = 2e^{i\\omega_0 t} + e^{-i 2\\omega_0 t}$. Tính vị trí đầu mút $P(t)$ tại $t = 0, T/4, T/2$. Bán kính hai vòng và tần số mỗi vòng là bao nhiêu?
6. **Quan hệ phổ–thực.** Một tín hiệu có $c_1 = 1 - i$, $c_{-1} = 1 + i$, các hệ số khác 0. Tín hiệu này có thực không? Viết lại $f(t)$ dưới dạng $a_1\\cos + b_1\\sin$.

---

## 8. Lời giải chi tiết

### Bài 1 — Euler cơ bản

- $\\theta = \\pi/4$: $e^{i\\pi/4} = \\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4} = \\frac{\\sqrt2}{2} + i\\frac{\\sqrt2}{2} \\approx 0{,}707 + 0{,}707i$. Góc $45°$, nửa trên bên phải.
- $\\theta = 2\\pi/3$: $\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3} = -\\frac12 + i\\frac{\\sqrt3}{2} \\approx -0{,}5 + 0{,}866i$. Góc $120°$, nửa trên bên trái.
- $\\theta = -\\pi/2$: $\\cos(-\\frac{\\pi}{2}) + i\\sin(-\\frac{\\pi}{2}) = 0 - i = -i$. Điểm $(0,-1)$, đáy đường tròn.

### Bài 2 — Đổi giữa hai dạng

Áp công thức $c_0 = a_0/2$, $c_n = (a_n - i b_n)/2$, $c_{-n} = (a_n + i b_n)/2$. Ở đây $\\frac{a_0}{2} = 3 \\Rightarrow c_0 = 3$. Tần số 1: $a_1 = 2$, $b_1 = -4$:

$$c_1 = \\frac{2 - i(-4)}{2} = \\frac{2 + 4i}{2} = 1 + 2i,\\qquad c_{-1} = \\frac{2 - 4i}{2} = 1 - 2i.$$

Tần số 2: $a_2 = 1$, $b_2 = 0$: $c_2 = c_{-2} = 1/2$. Kiểm tra: $\\overline{c_1} = \\overline{1+2i} = 1 - 2i = c_{-1}$ ✓. Tín hiệu thực nên phổ đối xứng liên hợp.

### Bài 3 — Hệ số sóng vuông

Với $n \\ne 0$, $\\omega_0 = 2\\pi/T$:

$$c_n = \\frac{1}{T}\\left[\\int_0^{T/2} e^{-in\\omega_0 t}\\,dt - \\int_{T/2}^{T} e^{-in\\omega_0 t}\\,dt\\right].$$

Nguyên hàm: $\\int e^{-in\\omega_0 t}dt = \\dfrac{e^{-in\\omega_0 t}}{-in\\omega_0}$. Đặt $k = -in\\omega_0$. Tích phân thứ nhất:

$$\\int_0^{T/2} = \\frac{1}{k}\\left(e^{k\\cdot T/2} - 1\\right),\\quad e^{-in\\omega_0 \\cdot T/2} = e^{-in\\pi} = (-1)^n.$$

Tích phân thứ hai (cận $T/2 \\to T$), với $e^{-in\\omega_0 T} = e^{-2\\pi i n} = 1$:

$$\\int_{T/2}^{T} = \\frac{1}{k}\\left(1 - (-1)^n\\right).$$

Ghép lại (chú ý dấu trừ trước tích phân thứ hai):

$$c_n = \\frac{1}{T}\\cdot\\frac{1}{k}\\Big[\\big((-1)^n - 1\\big) - \\big(1 - (-1)^n\\big)\\Big] = \\frac{1}{T k}\\big(2(-1)^n - 2\\big) = \\frac{2\\big((-1)^n - 1\\big)}{T k}.$$

Thay $k = -in\\omega_0 = -in\\cdot 2\\pi/T$ nên $Tk = -2\\pi i n$:

$$c_n = \\frac{2\\big((-1)^n - 1\\big)}{-2\\pi i n} = \\frac{(-1)^n - 1}{-\\pi i n}.$$

Với $n$ **chẵn**: $(-1)^n - 1 = 0 \\Rightarrow c_n = 0$. Với $n$ **lẻ**: $(-1)^n - 1 = -2$:

$$c_n = \\frac{-2}{-\\pi i n} = \\frac{2}{\\pi i n} = \\frac{2}{\\pi i n}\\cdot\\frac{-i}{-i} = \\frac{-2i}{\\pi n}.$$

Vậy $c_n = -\\dfrac{2i}{\\pi n}$ ($n$ lẻ), $0$ ($n$ chẵn), $c_0 = 0$ (trung bình của $\\pm1$ là 0). $\\blacksquare$

### Bài 4 — Sóng răng cưa

$f(t) = t$ trên $[-T/2, T/2)$. $c_0 = \\frac1T\\int_{-T/2}^{T/2} t\\,dt = 0$ (hàm lẻ). Với $n\\ne 0$:

$$c_n = \\frac1T\\int_{-T/2}^{T/2} t\\,e^{-in\\omega_0 t}\\,dt.$$

Tích phân từng phần ($u=t$, $dv = e^{-in\\omega_0 t}dt$, $v = \\frac{e^{-in\\omega_0 t}}{-in\\omega_0}$):

$$c_n = \\frac1T\\left[\\left.\\frac{t\\,e^{-in\\omega_0 t}}{-in\\omega_0}\\right|_{-T/2}^{T/2} - \\int_{-T/2}^{T/2}\\frac{e^{-in\\omega_0 t}}{-in\\omega_0}\\,dt\\right].$$

Tích phân còn lại (vector quay trọn chu kỳ) bằng 0. Số hạng biên, dùng $e^{\\mp in\\pi} = (-1)^n$:

$$c_n = \\frac{1}{T}\\cdot\\frac{1}{-in\\omega_0}\\left[\\frac{T}{2}(-1)^n - \\left(-\\frac{T}{2}\\right)(-1)^n\\right] = \\frac{1}{T}\\cdot\\frac{T(-1)^n}{-in\\omega_0} = \\frac{(-1)^n}{-in\\omega_0}.$$

Thay $\\omega_0 = 2\\pi/T$: $c_n = \\dfrac{(-1)^n T}{-2\\pi i n} = \\dfrac{(-1)^{n+1}T}{2\\pi i n} = (-1)^{n}\\dfrac{iT}{2\\pi n}$ (rút $1/i = -i$). Biên độ $|c_n| = \\dfrac{T}{2\\pi|n|} \\propto \\dfrac{1}{|n|}$.

**So sánh:** răng cưa có phổ ở **mọi** $n\\ne0$ (cả chẵn lẫn lẻ) trong khi sóng vuông chỉ có $n$ lẻ; cả hai tắt như $1/|n|$. Vì răng cưa có bước nhảy giống sóng vuông, tốc độ tắt cùng bậc $1/|n|$ (đặc trưng của hàm gián đoạn).

### Bài 5 — Epicycle hai vòng

$z(t) = 2e^{i\\omega_0 t} + e^{-i2\\omega_0 t}$: vòng 1 bán kính $2$, tần số $+1$; vòng 2 bán kính $1$, tần số $-2$ (quay ngược, nhanh gấp đôi). Với $\\omega_0 = 2\\pi/T$:

- $t=0$: $2\\cdot1 + 1 = 3 \\Rightarrow (3, 0)$.
- $t=T/4$ ($\\omega_0 t = \\pi/2$): $2e^{i\\pi/2} + e^{-i\\pi} = 2i + (-1) = -1 + 2i \\Rightarrow (-1, 2)$.
- $t=T/2$ ($\\omega_0 t = \\pi$): $2e^{i\\pi} + e^{-i2\\pi} = -2 + 1 = -1 \\Rightarrow (-1, 0)$.

### Bài 6 — Quan hệ phổ–thực

Kiểm tra điều kiện thực $c_{-1} = \\overline{c_1}$: $\\overline{c_1} = \\overline{1 - i} = 1 + i = c_{-1}$ ✓ → **tín hiệu thực**. Đổi sang $a,b$: $a_1 = 2\\,\\mathrm{Re}(c_1) = 2\\cdot1 = 2$; $b_1 = -2\\,\\mathrm{Im}(c_1) = -2\\cdot(-1) = 2$. Vậy

$$f(t) = 2\\cos(\\omega_0 t) + 2\\sin(\\omega_0 t).$$

Kiểm tra ngược: $c_1 = (a_1 - i b_1)/2 = (2 - 2i)/2 = 1 - i$ ✓.

---

## 9. Tham khảo & Bài tiếp theo

- **Bài tiếp:** [L08 — Biến đổi Fourier (Fourier Transform)](../lesson-03-fourier-transform/) — cho $T\\to\\infty$, phổ vạch hoá liên tục.
- **Ôn lại:** [L06 — Chuỗi Fourier dạng sin/cos](../lesson-01-fourier-series/) · [Math/03 — Số phức & Euler](../../../Math/03-Trig-Complex/lesson-06-complex-polar-euler/) · [Tier1 L01 — Tín hiệu & phasor](../../01-Foundations/lesson-01-signals-basics/).
- **Minh hoạ tương tác:** [visualization.html](./visualization.html) — cỗ máy epicycle, phasor Euler, phổ $|c_n|$.

> **Đóng lại câu hỏi mở bài.** "Làm sao vẽ mọi hình bằng các vòng tròn quay?" — Gói hình thành $z(t)=x(t)+iy(t)$, phân tích Fourier phức ra các $c_n$, mỗi $c_n$ là một vòng tròn (bán kính $|c_n|$, pha $\\arg c_n$, tốc độ $n$). Nối đuôi chúng, đầu mút cây bút vẽ lại đúng hình. Càng nhiều vòng, càng giống. Hãy mở viz và kéo slider N để tự thấy.
`;
