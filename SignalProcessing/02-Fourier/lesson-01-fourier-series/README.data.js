// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/02-Fourier/lesson-01-fourier-series/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Chuỗi Fourier (Fourier Series)

> Bài mở đầu **Tier 2 — Fourier**. Đây là viên gạch nền cho toàn bộ phần biến đổi Fourier sắp tới: ý tưởng rằng **mọi tín hiệu tuần hoàn đều có thể dựng lại từ một chồng các sóng sin/cos thuần**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** một sóng vuông — trông chẳng "cong" như sin chút nào — lại bằng tổng (vô hạn) các sóng sin.
- Viết được **dạng lượng giác** của chuỗi Fourier và gọi tên đúng 3 thành phần: $a_0$ (mức DC), $a_n$ (cosine), $b_n$ (sine).
- Dùng được **công thức hệ số** $a_n, b_n$ và hiểu chúng là phép **"chiếu" tín hiệu lên từng sóng hài (harmonic)**.
- Tự tay **tính chuỗi Fourier của sóng vuông** từng bước tích phân, ra $b_n = \\dfrac{4}{n\\pi}$ cho $n$ lẻ.
- Hiểu **hiện tượng Gibbs**: vì sao gần bước nhảy luôn có overshoot ~9% và vì sao nó **không biến mất** dù lấy bao nhiêu số hạng.
- Hiểu **tính trực giao (orthogonality)** của họ $\\{\\sin, \\cos\\}$ làm cho các hệ số tách rời nhau.
- Nhìn trước **dạng phức** $c_n e^{in\\omega_0 t}$ — cầu nối sang Lesson 07.

## Kiến thức tiền đề

- [Tier 1 — Lesson 03: Tổng hợp sóng (superposition)](../../01-Foundations/lesson-03-wave-superposition/) — cộng nhiều sóng sin lại. Chuỗi Fourier chính là **đảo ngược** của bài đó: thay vì cho trước các sóng để cộng, ta **tìm ra** chúng từ một tín hiệu cho trước.
- [Math — Giải tích một biến (tích phân)](../../../Math/04-Calculus-1var/) — công thức hệ số là các tích phân $\\int_0^T \\dots\\, dt$.
- [Vectors — Đại số tuyến tính (tích trong, cơ sở trực giao)](../../../Vectors/04-LinearAlgebra/) — "chiếu lên harmonic" chính là tích trong của hàm; họ sin/cos là một **cơ sở trực giao** của không gian hàm.

---

## 1. Vì sao một sóng vuông lại bằng tổng các sin?

> 💡 **Trực giác.** Hình dung một dàn nhạc. Mỗi nhạc cụ chỉ phát được **một** nốt sin thuần (tần số cố định, biên độ cố định). Câu hỏi: nếu chỉ có sin, làm sao dàn nhạc tái tạo được một âm thanh "gắt" như sóng vuông — thứ có **góc nhọn** và **cạnh dựng đứng**? Câu trả lời của Fourier: **cho đủ nhiều nhạc cụ, mỗi cái một tần số là bội của tần số gốc, rồi chỉnh biên độ vừa khéo — tổng của chúng tiến tới đúng sóng vuông.** Góc nhọn không nằm trong bất kỳ một sin nào; nó *xuất hiện* từ cách các sin cộng dồn lại.

Ở [Tier 1 — Lesson 03](../../01-Foundations/lesson-03-wave-superposition/) ta đã cộng vài sóng sin và thấy dạng sóng thay đổi. Bài đó đi **xuôi**: cho trước biên độ + tần số → ra dạng sóng. Chuỗi Fourier đi **ngược**:

$$\\text{tín hiệu tuần hoàn } f(t) \\;\\xrightarrow{\\;?\\;}\\; \\text{biên độ của từng sóng sin/cos thành phần}$$

**Phát biểu trung tâm (định lý Dirichlet, dạng thực dụng):** nếu $f(t)$ tuần hoàn chu kỳ $T$, bị chặn, có hữu hạn cực trị và hữu hạn điểm gián đoạn trong một chu kỳ (gọi là *điều kiện Dirichlet*), thì $f(t)$ bằng một tổng (vô hạn) các sin và cos có tần số là **bội nguyên** của tần số gốc $\\omega_0 = \\frac{2\\pi}{T}$:

$$f(t) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty}\\Big[\\,a_n\\cos(n\\omega_0 t) + b_n\\sin(n\\omega_0 t)\\,\\Big].$$

Sóng vuông thoả điều kiện Dirichlet (chỉ có 2 điểm nhảy mỗi chu kỳ) → nó **có** chuỗi Fourier. Phần sau ta sẽ tính ra nó một cách tường minh.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao chỉ dùng tần số bội nguyên $\\omega_0, 2\\omega_0, 3\\omega_0\\dots$ mà không phải tần số bất kỳ?"* — Vì $f$ **tuần hoàn chu kỳ $T$**. Một sin chỉ tuần hoàn theo $T$ nếu nó "vừa khít" $k$ chu kỳ trong $T$, tức tần số là bội của $\\omega_0$. Sin tần số lẻ (như $1.5\\,\\omega_0$) sẽ không lặp lại sau mỗi $T$ → phá tính tuần hoàn của tổng.
> - *"Tổng vô hạn — vậy có thật sự bằng, hay chỉ xấp xỉ?"* — Bằng theo nghĩa: tại mọi điểm $f$ liên tục, tổng riêng phần hội tụ về đúng $f(t)$. Tại điểm nhảy, nó hội tụ về **trung bình** của giá trị hai bên (xem §5).

> 🔁 **Dừng lại tự kiểm tra.** Một tín hiệu có chu kỳ $T = 0.5$ s. Tần số gốc $\\omega_0$ và harmonic thứ 3 có tần số bao nhiêu (rad/s)?
> <details><summary>Đáp án</summary>
>
> $\\omega_0 = \\dfrac{2\\pi}{T} = \\dfrac{2\\pi}{0.5} = 4\\pi \\approx 12.57$ rad/s. Harmonic thứ 3: $3\\omega_0 = 12\\pi \\approx 37.70$ rad/s.
> </details>

---

## 2. Dạng lượng giác và ba thành phần

$$\\boxed{\\,f(t) = \\underbrace{\\frac{a_0}{2}}_{\\text{DC}} + \\sum_{n=1}^{\\infty}\\Big[\\underbrace{a_n\\cos(n\\omega_0 t)}_{\\text{cosine harmonic}} + \\underbrace{b_n\\sin(n\\omega_0 t)}_{\\text{sine harmonic}}\\Big]\\,}, \\qquad \\omega_0 = \\frac{2\\pi}{T}.$$

Ba thành phần, mỗi cái có ý nghĩa vật lý riêng:

**(1) $\\dfrac{a_0}{2}$ — thành phần một chiều (DC / mức trung bình).**
- *Là gì:* hằng số không đổi theo thời gian — chính là **giá trị trung bình** của $f$ trên một chu kỳ.
- *Vì sao tồn tại:* sin và cos đều có trung bình bằng 0 trên một chu kỳ, nên tổng các harmonic luôn dao động quanh 0. Nếu tín hiệu thật dao động quanh mức 5 (chứ không phải 0), ta cần một hằng số "nâng" toàn bộ lên — đó là $a_0/2$.
- *Ví dụ số:* tín hiệu $f(t) = 3 + 2\\sin(\\omega_0 t)$ có mức trung bình 3 → $a_0/2 = 3$, tức $a_0 = 6$.

**(2) $a_n\\cos(n\\omega_0 t)$ — các harmonic cosine.**
- $\\cos$ là hàm **chẵn** (đối xứng qua trục tung). $a_n$ đo "phần đối xứng chẵn" của tín hiệu ở tần số $n\\omega_0$.

**(3) $b_n\\sin(n\\omega_0 t)$ — các harmonic sine.**
- $\\sin$ là hàm **lẻ** (đối xứng tâm). $b_n$ đo "phần đối xứng lẻ" ở tần số $n\\omega_0$.

> 💡 **Mẹo đối xứng (tiết kiệm tính toán).** Nếu $f$ là hàm **lẻ** ($f(-t) = -f(t)$, ví dụ sóng vuông tâm gốc) thì **mọi $a_n = 0$** — chỉ còn sine. Nếu $f$ **chẵn** ($f(-t)=f(t)$) thì **mọi $b_n = 0$** — chỉ còn cosine. Đây là lý do sóng vuông (lẻ) ở §4 chỉ ra $b_n$.

> ⚠ **Lỗi thường gặp:** viết DC là $a_0$ thay vì $a_0/2$. Quy ước phổ biến đặt $a_0/2$ để **một công thức $a_n$ duy nhất** dùng được cho cả $n=0$ (xem §3). Nếu bạn dùng $a_0$ trần thì công thức $a_0$ phải nhân thêm $1/2$ — phải nhất quán một trong hai quy ước.

> 📝 **Tóm tắt mục 2.** Chuỗi Fourier = mức DC ($a_0/2$) + chồng các cosine ($a_n$) + chồng các sine ($b_n$), tất cả ở tần số bội của $\\omega_0 = 2\\pi/T$. Hàm lẻ → chỉ sine; hàm chẵn → chỉ cosine.

---

## 3. Công thức hệ số — "chiếu" tín hiệu lên từng harmonic

$$\\boxed{\\;a_0 = \\frac{2}{T}\\int_{0}^{T} f(t)\\,dt, \\qquad a_n = \\frac{2}{T}\\int_{0}^{T} f(t)\\cos(n\\omega_0 t)\\,dt, \\qquad b_n = \\frac{2}{T}\\int_{0}^{T} f(t)\\sin(n\\omega_0 t)\\,dt.\\;}$$

(Cận tích phân lấy trên **bất kỳ một chu kỳ** nào cũng được, thường $[0,T]$ hoặc $[-T/2, T/2]$.)

### 3.1 Trực giác hình học: hệ số = tích trong

> 💡 **Hình dung.** Trong [đại số tuyến tính](../../../Vectors/04-LinearAlgebra/), để tìm thành phần của một vector $\\vec v$ theo hướng cơ sở $\\vec e_k$, ta lấy **tích trong** $\\langle \\vec v, \\vec e_k\\rangle$ rồi chia cho $\\|\\vec e_k\\|^2$. Hàm số cũng là "vector" trong một không gian vô hạn chiều, với **tích trong** định nghĩa bằng tích phân:
>
> $$\\langle f, g\\rangle = \\int_0^T f(t)\\,g(t)\\,dt.$$
>
> Công thức $b_n$ chính là $\\dfrac{\\langle f,\\ \\sin(n\\omega_0 t)\\rangle}{\\langle \\sin(n\\omega_0 t),\\ \\sin(n\\omega_0 t)\\rangle}$ — **chiếu $f$ lên harmonic thứ $n$**. Hệ số $\\frac{2}{T}$ chính là $1/\\|\\sin\\|^2$ vì $\\int_0^T \\sin^2(n\\omega_0 t)\\,dt = T/2$.

Vì sao việc "chiếu" lại tách được từng hệ số một cách độc lập, không lẫn vào nhau? Vì họ $\\{\\sin, \\cos\\}$ **trực giao** (tích trong giữa hai harmonic khác nhau = 0). Ta chứng minh kỹ ở §6.

### 3.2 Bốn ví dụ số nhanh

Lấy $T = 2\\pi$ nên $\\omega_0 = 1$.

1. $f(t) = 5$ (hằng số). $a_0 = \\frac{2}{2\\pi}\\int_0^{2\\pi}5\\,dt = \\frac{1}{\\pi}\\cdot 5\\cdot 2\\pi = 10$ → DC $= a_0/2 = 5$ ✓ (đúng bằng giá trị hằng).
2. $f(t) = \\sin t$. $b_1 = \\frac{1}{\\pi}\\int_0^{2\\pi}\\sin t\\sin t\\,dt = \\frac{1}{\\pi}\\cdot\\pi = 1$; mọi hệ số khác $=0$. Chuỗi của nó là chính nó ✓.
3. $f(t) = \\cos t$. $a_1 = \\frac{1}{\\pi}\\int_0^{2\\pi}\\cos^2 t\\,dt = \\frac{1}{\\pi}\\cdot\\pi = 1$; còn lại $0$.
4. $f(t) = 2\\cos t$ có $a_1 = 2$ (tuyến tính — nhân đôi tín hiệu thì nhân đôi mọi hệ số).

> 🔁 **Dừng lại tự kiểm tra.** Tín hiệu $f(t) = 4$ trên chu kỳ $T = 1$. Hệ số $b_3$ bằng bao nhiêu?
> <details><summary>Đáp án</summary>
>
> $b_3 = \\frac{2}{1}\\int_0^1 4\\sin(3\\cdot 2\\pi t)\\,dt = 8\\int_0^1\\sin(6\\pi t)\\,dt = 0$ vì tích phân của sin trên trọn số nguyên chu kỳ luôn bằng 0. Thực ra **mọi** $a_n, b_n$ ($n\\ge1$) đều bằng 0 cho hằng số — chỉ còn DC $= 4$.
> </details>

> 📝 **Tóm tắt mục 3.** Mỗi hệ số = tích phân của $f$ nhân với harmonic tương ứng, chia chuẩn hoá $2/T$. Đây là phép chiếu trực giao của $f$ lên cơ sở $\\{\\sin, \\cos\\}$.

---

## 4. Walk-through đầy đủ: chuỗi Fourier của sóng vuông

Đây là ví dụ kinh điển, làm **từng bước không nhảy cóc**.

**Định nghĩa sóng vuông lẻ, chu kỳ $T = 2\\pi$ (nên $\\omega_0 = 1$), biên độ $\\pm 1$:**

$$f(t) = \\begin{cases} +1, & 0 < t < \\pi, \\\\ -1, & \\pi < t < 2\\pi. \\end{cases}$$

### Bước 1 — DC bằng 0

$$a_0 = \\frac{2}{2\\pi}\\int_0^{2\\pi} f(t)\\,dt = \\frac{1}{\\pi}\\left[\\int_0^{\\pi}(+1)\\,dt + \\int_{\\pi}^{2\\pi}(-1)\\,dt\\right] = \\frac{1}{\\pi}\\big[\\pi - \\pi\\big] = 0.$$

Hợp lý: nửa chu kỳ dương, nửa âm, đối xứng → trung bình 0.

### Bước 2 — mọi $a_n = 0$ (vì $f$ lẻ)

$f(t)$ là hàm lẻ (lấy gốc tại điểm nhảy), $\\cos$ là chẵn → tích $f\\cdot\\cos$ là **lẻ** → tích phân trên chu kỳ đối xứng bằng 0. Vậy $a_n = 0$ với mọi $n$. (Đây chính là "mẹo đối xứng" ở §2.)

### Bước 3 — tính $b_n$ tường minh

$$b_n = \\frac{2}{2\\pi}\\int_0^{2\\pi} f(t)\\sin(nt)\\,dt = \\frac{1}{\\pi}\\left[\\int_0^{\\pi}(+1)\\sin(nt)\\,dt + \\int_{\\pi}^{2\\pi}(-1)\\sin(nt)\\,dt\\right].$$

Nguyên hàm: $\\displaystyle\\int \\sin(nt)\\,dt = -\\frac{1}{n}\\cos(nt)$. Tính từng phần:

$$\\int_0^{\\pi}\\sin(nt)\\,dt = \\left[-\\frac{\\cos(nt)}{n}\\right]_0^{\\pi} = -\\frac{\\cos(n\\pi)}{n} + \\frac{\\cos 0}{n} = \\frac{1 - \\cos(n\\pi)}{n}.$$

$$\\int_{\\pi}^{2\\pi}\\sin(nt)\\,dt = \\left[-\\frac{\\cos(nt)}{n}\\right]_{\\pi}^{2\\pi} = -\\frac{\\cos(2n\\pi)}{n} + \\frac{\\cos(n\\pi)}{n} = \\frac{\\cos(n\\pi) - 1}{n}.$$

Vì $\\cos(2n\\pi) = 1$. Ghép lại (chú ý số hạng thứ hai có dấu trừ phía trước):

$$b_n = \\frac{1}{\\pi}\\left[\\frac{1-\\cos(n\\pi)}{n} - \\frac{\\cos(n\\pi)-1}{n}\\right] = \\frac{1}{\\pi}\\cdot\\frac{2\\big(1 - \\cos(n\\pi)\\big)}{n} = \\frac{2\\big(1 - \\cos(n\\pi)\\big)}{n\\pi}.$$

### Bước 4 — thay $\\cos(n\\pi) = (-1)^n$

$$\\cos(n\\pi) = (-1)^n = \\begin{cases} +1, & n \\text{ chẵn} \\\\ -1, & n \\text{ lẻ}.\\end{cases}$$

- **$n$ chẵn:** $1 - \\cos(n\\pi) = 1 - 1 = 0 \\Rightarrow b_n = 0$.
- **$n$ lẻ:** $1 - \\cos(n\\pi) = 1 - (-1) = 2 \\Rightarrow b_n = \\dfrac{2\\cdot 2}{n\\pi} = \\dfrac{4}{n\\pi}$.

$$\\boxed{\\,b_n = \\begin{cases} \\dfrac{4}{n\\pi}, & n \\text{ lẻ} \\\\[4pt] 0, & n \\text{ chẵn}.\\end{cases}\\,}$$

### Bước 5 — viết chuỗi

$$f(t) = \\frac{4}{\\pi}\\left(\\sin t + \\frac{1}{3}\\sin 3t + \\frac{1}{5}\\sin 5t + \\frac{1}{7}\\sin 7t + \\cdots\\right) = \\frac{4}{\\pi}\\sum_{k=0}^{\\infty}\\frac{\\sin\\big((2k+1)t\\big)}{2k+1}.$$

**Kiểm tra số cụ thể** tại $t = \\pi/2$ (đỉnh, $f = +1$): $\\sin(\\pi/2)=1,\\ \\sin(3\\pi/2)=-1,\\ \\sin(5\\pi/2)=1,\\dots$

$$\\frac{4}{\\pi}\\left(1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7} + \\cdots\\right) = \\frac{4}{\\pi}\\cdot\\frac{\\pi}{4} = 1\\ \\checkmark$$

(dùng chuỗi Leibniz $1 - \\frac13 + \\frac15 - \\cdots = \\pi/4$). Đúng bằng $f(\\pi/2) = +1$.

> ⚠ **Lỗi thường gặp:** quên đổi dấu của tích phân nửa sau ($-1$ nhân vào). Nếu cộng nhầm dấu, hai số hạng triệt tiêu và bạn ra $b_n = 0$ với mọi $n$ — kết quả vô lý (sóng vuông không phải hằng 0).

> 🔁 **Dừng lại tự kiểm tra.** Biên độ harmonic thứ 5 ($b_5$) lớn hơn hay nhỏ hơn harmonic thứ 3, và tỉ lệ bao nhiêu?
> <details><summary>Đáp án</summary>
>
> $b_3 = \\frac{4}{3\\pi} \\approx 0.4244$, $b_5 = \\frac{4}{5\\pi}\\approx 0.2546$. $b_5$ nhỏ hơn; tỉ lệ $b_5/b_3 = 3/5 = 0.6$. Biên độ giảm như $1/n$ — harmonic càng cao đóng góp càng ít.
> </details>

> 📝 **Tóm tắt mục 4.** Sóng vuông lẻ biên độ 1: $a_0 = 0$, mọi $a_n = 0$ (do lẻ), $b_n = 4/(n\\pi)$ cho $n$ lẻ và $0$ cho $n$ chẵn. Chuỗi chỉ chứa các harmonic lẻ, biên độ giảm như $1/n$.

---

## 5. Hội tụ và hiện tượng Gibbs

**Tổng riêng phần (partial sum)** dùng $N$ số hạng đầu:

$$S_N(t) = \\frac{4}{\\pi}\\sum_{\\substack{n=1 \\\\ n\\text{ lẻ}}}^{N}\\frac{\\sin(nt)}{n}.$$

Khi $N$ tăng, $S_N$ tiến càng gần sóng vuông ở vùng phẳng. Nhưng **gần bước nhảy** (tại $t = 0, \\pi, 2\\pi$) luôn có một **mấu nhọn vượt quá** giá trị thật — đó là **hiện tượng Gibbs (Gibbs phenomenon)**.

> 💡 **Trực giác Gibbs.** Mỗi $S_N$ là tổng các sin **trơn** — không sin nào nhảy dựng đứng. Để mô phỏng một bước nhảy đột ngột bằng các đường cong trơn, tổng buộc phải "lao quá đà" rồi "kéo lại", giống như xe phanh gấp bị chúi mũi. Càng nhiều số hạng, cú chúi càng **hẹp** (sát bước nhảy hơn) nhưng **chiều cao đỉnh vọt thì gần như không đổi**.

**Đặc trưng định lượng:** đỉnh overshoot tiến tới khoảng **8.95% của bước nhảy** (không phải 0). Với sóng vuông nhảy từ $-1$ lên $+1$ (biên độ bước nhảy $= 2$), overshoot $\\approx 0.0895\\times 2 \\approx 0.179$, nên đỉnh chạm $\\approx 1.179$ thay vì dừng ở $1$.

**Bốn ví dụ số — giá trị $S_N$ tại đỉnh overshoot đầu tiên** (ngay sau bước nhảy tại $t=0^+$):

| $N$ (số harmonic lẻ tính tới) | Vị trí đỉnh $\\approx$ | Giá trị đỉnh $S_N$ | Overshoot trên mức $1$ |
| --- | --- | --- | --- |
| $N=1$ (chỉ $\\sin t$) | $t = \\pi/2 \\approx 1.571$ | $\\approx 1.273$ | $+27.3\\%$ |
| $N=3$ ($\\sin t,\\sin3t$) | $t \\approx 0.785$ | $\\approx 1.201$ | $+20.1\\%$ |
| $N=11$ | $t \\approx 0.262$ | $\\approx 1.187$ | $+18.7\\%$ |
| $N \\to \\infty$ | $t \\to 0^+$ | $\\to \\approx 1.179$ | $\\to +8.95\\%$ của bước nhảy ($\\approx 17.9\\%$ của biên độ 1) |

(Với $N=1$ chưa hình thành Gibbs thật sự — đỉnh ở giữa; từ $N\\ge3$ trở đi đỉnh dịch dần về sát bước nhảy và chiều cao hội tụ về hằng số Gibbs.)

**Tại chính điểm nhảy** $t = 0$: mọi $\\sin(n\\cdot 0) = 0$ nên $S_N(0) = 0$ với mọi $N$. Đây là **trung bình** của $-1$ và $+1$ — đúng như định lý Dirichlet tiên đoán: tại điểm gián đoạn, chuỗi hội tụ về $\\frac{f(0^-)+f(0^+)}{2} = \\frac{-1+1}{2}=0$.

> ⚠ **Lỗi thường gặp (quan trọng): "thêm nhiều số hạng thì Gibbs sẽ hết".** **Sai.** Tăng $N$ chỉ làm vùng overshoot **hẹp lại** (đẩy đỉnh sát bước nhảy), nhưng **chiều cao đỉnh không giảm về 0** — nó hội tụ về ~8.95% và đứng yên ở đó mãi mãi. Gibbs là tính chất nội tại của việc xấp xỉ bước nhảy bằng tổng hữu hạn các hàm trơn, không phải lỗi tính toán. (Hệ quả thực tế: lọc tín hiệu lý tưởng bằng cắt tần số sắc gây "ringing" — dao động Gibbs — quanh các cạnh.)

> ❓ **Câu hỏi tự nhiên.** *"Nếu đỉnh không hề thấp đi, sao người ta vẫn nói chuỗi hội tụ về $f$?"* — Vì hội tụ ở đây là **theo từng điểm** (pointwise) tại các điểm $f$ liên tục, và **theo nghĩa năng lượng** ($L^2$): diện tích phần sai lệch tiến về 0 vì vùng overshoot ngày càng hẹp. Chỉ có hội tụ **đều** (uniform) là thất bại — và đó chính xác là điều Gibbs mô tả.

> 🔁 **Dừng lại tự kiểm tra.** Với $N \\to \\infty$, đỉnh Gibbs của một sóng vuông nhảy từ $0$ lên $10$ (biên độ bước nhảy = 10) sẽ chạm tới giá trị bao nhiêu?
> <details><summary>Đáp án</summary>
>
> Overshoot $\\approx 8.95\\%$ của biên độ bước nhảy $= 0.0895 \\times 10 \\approx 0.895$. Đỉnh chạm $\\approx 10.895$.
> </details>

> 📝 **Tóm tắt mục 5.** Tổng riêng phần hội tụ về sóng vuông ở vùng phẳng và về trung bình hai bên tại điểm nhảy. Gần bước nhảy luôn có overshoot ~8.95% — tăng $N$ làm nó hẹp lại nhưng **không thấp đi**. Đó là hiện tượng Gibbs.

---

## 6. Vì sao hệ số tách rời được: tính trực giao

Toàn bộ "phép chiếu" ở §3 chỉ hoạt động được vì họ hàm cơ sở **trực giao** trên một chu kỳ. Lấy $T = 2\\pi$, $\\omega_0 = 1$ cho gọn. Các quan hệ then chốt (với $m, n$ nguyên dương):

$$\\int_0^{2\\pi}\\sin(mt)\\sin(nt)\\,dt = \\begin{cases}\\pi, & m=n \\\\ 0, & m\\neq n,\\end{cases} \\qquad \\int_0^{2\\pi}\\cos(mt)\\cos(nt)\\,dt = \\begin{cases}\\pi, & m=n \\\\ 0, & m\\neq n,\\end{cases}$$

$$\\int_0^{2\\pi}\\sin(mt)\\cos(nt)\\,dt = 0 \\quad \\text{(với mọi } m, n).$$

**Chứng minh trường hợp $\\int\\sin(mt)\\sin(nt)$ với $m\\neq n$** (từng bước, dùng công thức tích thành tổng):

$$\\sin(mt)\\sin(nt) = \\frac{1}{2}\\big[\\cos((m-n)t) - \\cos((m+n)t)\\big].$$

$$\\int_0^{2\\pi}\\sin(mt)\\sin(nt)\\,dt = \\frac{1}{2}\\int_0^{2\\pi}\\cos((m-n)t)\\,dt - \\frac{1}{2}\\int_0^{2\\pi}\\cos((m+n)t)\\,dt.$$

Vì $m\\neq n$, cả $(m-n)$ và $(m+n)$ đều là **số nguyên khác 0**, mà $\\int_0^{2\\pi}\\cos(kt)\\,dt = \\big[\\frac{\\sin(kt)}{k}\\big]_0^{2\\pi} = 0$ cho mọi nguyên $k\\neq 0$. Vậy cả hai tích phân $=0$ → tổng $=0$. ∎

**Vì sao điều này làm hệ số độc lập:** thay chuỗi $f = \\sum_m b_m\\sin(mt)$ vào công thức tính $b_n$:

$$b_n = \\frac{1}{\\pi}\\int_0^{2\\pi}\\Big(\\sum_m b_m\\sin(mt)\\Big)\\sin(nt)\\,dt = \\frac{1}{\\pi}\\sum_m b_m\\underbrace{\\int_0^{2\\pi}\\sin(mt)\\sin(nt)\\,dt}_{=\\,0 \\text{ trừ khi } m=n}.$$

Mọi số hạng $m\\neq n$ **chết** (tích phân $=0$); chỉ sống sót $m=n$, cho $b_n = \\frac{1}{\\pi}\\cdot b_n\\cdot\\pi = b_n$ — nhất quán. Trực giao nghĩa là **mỗi harmonic "tự lo phần mình", không rò rỉ năng lượng sang harmonic khác** → giải được từng hệ số riêng lẻ, đúng như tìm toạ độ theo cơ sở trực giao trong [đại số tuyến tính](../../../Vectors/04-LinearAlgebra/).

> 💡 **Trực giác.** "Trực giao" giữa hai harmonic = chúng **vuông góc** trong không gian hàm: nhân chúng rồi lấy trung bình một chu kỳ ra 0. Giống hai vector $\\hat x, \\hat y$ vuông góc nên thành phần $x$ của một vector không ảnh hưởng thành phần $y$.

> 📝 **Tóm tắt mục 6.** $\\{\\sin(n\\omega_0 t), \\cos(n\\omega_0 t)\\}$ là cơ sở **trực giao**: tích phân tích của hai harmonic khác nhau trên một chu kỳ bằng 0. Nhờ đó công thức chiếu ở §3 tách rời từng hệ số.

---

## 7. Preview — dạng phức (Lesson 07)

Dùng công thức Euler $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, ta gộp cặp $\\cos(n\\omega_0 t)$ và $\\sin(n\\omega_0 t)$ thành **một** số hạng mũ phức gọn hơn:

$$\\boxed{\\;f(t) = \\sum_{n=-\\infty}^{+\\infty} c_n\\, e^{\\,in\\omega_0 t}, \\qquad c_n = \\frac{1}{T}\\int_0^{T} f(t)\\,e^{-in\\omega_0 t}\\,dt.\\;}$$

Liên hệ với dạng lượng giác: $c_n = \\frac{1}{2}(a_n - i b_n)$ cho $n>0$, và $c_0 = a_0/2$. Chỉ số $n$ chạy **cả âm** (tần số "âm" — chỉ là cách ghi gọn của cặp sin/cos).

Vì sao đáng đổi sang phức: một công thức $c_n$ duy nhất thay cho ba công thức $a_0, a_n, b_n$; đại số mũ dễ thao tác hơn lượng giác; và đây là cây cầu thẳng tới **biến đổi Fourier** cho tín hiệu không tuần hoàn. Ta đào sâu ở [Lesson 07 — Epicycle & Euler](../lesson-02-epicycles-euler/), nơi mỗi $c_n e^{in\\omega_0 t}$ được nhìn như một **vòng tròn quay (epicycle)** trong mặt phẳng phức.

> 📝 **Tóm tắt mục 7.** Dạng phức gói cặp sin/cos vào $c_n e^{in\\omega_0 t}$ với $n$ chạy cả âm. Gọn hơn, dễ thao tác hơn, và là tiền đề trực tiếp cho biến đổi Fourier.

---

## Bài tập

1. **DC và đối xứng.** Cho $f(t) = 2 + 3\\cos(\\omega_0 t) - \\sin(2\\omega_0 t)$. Xác định $a_0/2$, mọi $a_n$, mọi $b_n$ mà không cần tính tích phân.

2. **Tính $b_n$ trực tiếp.** Cho sóng vuông lẻ chu kỳ $T = 2\\pi$ nhưng biên độ $\\pm 3$ (thay vì $\\pm1$). Tính $b_n$.

3. **Tần số harmonic.** Một tín hiệu tuần hoàn chu kỳ $T = 4$ ms. Tính $\\omega_0$ (rad/s) và tần số (Hz) của harmonic thứ 7.

4. **Chứng minh trực giao sin–cos.** Chứng minh $\\int_0^{2\\pi}\\sin(mt)\\cos(nt)\\,dt = 0$ với **mọi** $m, n$ nguyên dương, từng bước.

5. **Gibbs định lượng.** Một sóng vuông nhảy từ $-5$ lên $+5$. Khi $N\\to\\infty$, đỉnh overshoot Gibbs chạm tới giá trị nào? Vùng overshoot có hẹp lại không khi tăng $N$? Chiều cao đỉnh có giảm không?

6. **Kiểm tra điểm.** Dùng chuỗi sóng vuông $\\pm1$ ở §4, tính giá trị tổng riêng phần $S_1(t)$ (chỉ một số hạng) tại $t = \\pi/2$ và $t = \\pi/4$.

7. **(Mở rộng) Sóng răng cưa.** Cho răng cưa lẻ $f(t) = t$ trên $(-\\pi, \\pi)$, chu kỳ $2\\pi$. Lập tích phân cho $b_n$ và cho biết nó là hàm lẻ hay chẵn (→ còn $a_n$ hay $b_n$?).

---

## Lời giải chi tiết

**Bài 1.** Tín hiệu đã ở sẵn dạng Fourier nên "đọc thẳng" hệ số.
- Trung bình $= 2$ → $a_0/2 = 2$ (tức $a_0 = 4$).
- Hệ số cosine: chỉ có $\\cos(\\omega_0 t)$ với hệ số $3$ → $a_1 = 3$, mọi $a_n = 0$ với $n\\neq 1$.
- Hệ số sine: chỉ có $\\sin(2\\omega_0 t)$ với hệ số $-1$ → $b_2 = -1$, mọi $b_n = 0$ với $n\\neq 2$.

**Bài 2.** Tuyến tính: nhân tín hiệu với 3 thì mọi hệ số nhân 3. Từ kết quả §4 ($b_n = 4/(n\\pi)$ cho $n$ lẻ):
$$b_n = \\begin{cases}\\dfrac{12}{n\\pi}, & n \\text{ lẻ} \\\\ 0, & n \\text{ chẵn}.\\end{cases}$$
(Có thể kiểm chứng bằng cách lặp lại tích phân Bước 3 với biên độ $\\pm3$: hằng số 3 chui ra khỏi tích phân.)

**Bài 3.** $\\omega_0 = \\dfrac{2\\pi}{T} = \\dfrac{2\\pi}{0.004} = 500\\pi \\approx 1570.8$ rad/s. Harmonic thứ 7 có tần số góc $7\\omega_0 = 3500\\pi \\approx 10996$ rad/s; tần số $f_7 = 7/T = 7/0.004 = 1750$ Hz.

**Bài 4.** Dùng tích thành tổng: $\\sin(mt)\\cos(nt) = \\frac{1}{2}\\big[\\sin((m+n)t) + \\sin((m-n)t)\\big]$.
$$\\int_0^{2\\pi}\\sin(mt)\\cos(nt)\\,dt = \\tfrac12\\int_0^{2\\pi}\\sin((m+n)t)\\,dt + \\tfrac12\\int_0^{2\\pi}\\sin((m-n)t)\\,dt.$$
Với mọi nguyên $k$: $\\int_0^{2\\pi}\\sin(kt)\\,dt = \\big[-\\frac{\\cos(kt)}{k}\\big]_0^{2\\pi} = 0$ nếu $k\\neq 0$ (vì $\\cos(2\\pi k)=\\cos 0$); và nếu $k=0$ thì $\\sin(0)=0$ → tích phân $0$. Cả $(m+n)$ và $(m-n)$ đều nguyên nên cả hai tích phân $=0$ → tổng $=0$. ∎

**Bài 5.** Overshoot $\\approx 8.95\\%$ của biên độ bước nhảy. Bước nhảy ở đây $= 5 - (-5) = 10$ → overshoot $\\approx 0.895$, đỉnh chạm $\\approx 5 + 0.895 = 5.895$. Khi tăng $N$: vùng overshoot **hẹp lại** (đỉnh dịch sát bước nhảy), nhưng **chiều cao đỉnh KHÔNG giảm** — vẫn ~8.95%. Đây là bản chất hiện tượng Gibbs.

**Bài 6.** $S_1(t) = \\frac{4}{\\pi}\\sin t$.
- Tại $t = \\pi/2$: $S_1 = \\frac{4}{\\pi}\\cdot 1 = \\frac{4}{\\pi} \\approx 1.273$ (vọt trên 1 — đây là overshoot thô của $N=1$).
- Tại $t = \\pi/4$: $S_1 = \\frac{4}{\\pi}\\sin(\\pi/4) = \\frac{4}{\\pi}\\cdot\\frac{\\sqrt2}{2} = \\frac{2\\sqrt2}{\\pi} \\approx 0.900$ (chưa tới 1 vì mới một harmonic).

**Bài 7.** $f(t) = t$ trên $(-\\pi,\\pi)$ là hàm **lẻ** ($f(-t) = -t = -f(t)$) → mọi $a_n = 0$, chỉ còn $b_n$.
$$b_n = \\frac{2}{2\\pi}\\int_{-\\pi}^{\\pi} t\\sin(nt)\\,dt = \\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} t\\sin(nt)\\,dt.$$
Tích phân từng phần ($u=t,\\ dv=\\sin(nt)dt$): $\\int t\\sin(nt)dt = -\\frac{t\\cos(nt)}{n} + \\frac{\\sin(nt)}{n^2}$. Thay cận và rút gọn (dùng $\\cos(n\\pi)=(-1)^n$, $\\sin(\\pm n\\pi)=0$) cho
$$b_n = \\frac{2}{n}(-1)^{n+1} = \\begin{cases} +\\frac{2}{n}, & n \\text{ lẻ} \\\\ -\\frac{2}{n}, & n \\text{ chẵn}.\\end{cases}$$
Khác sóng vuông: răng cưa có **cả** harmonic chẵn lẫn lẻ, biên độ giảm như $1/n$.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — ba module tương tác:
  1. **Bộ dựng tổng riêng phần** — chọn dạng sóng (vuông / răng cưa / tam giác), kéo slider số harmonic $N$ và xem chuỗi Fourier dựng dần dạng sóng, overshoot Gibbs tô đỏ.
  2. **Phổ harmonic** — bar chart biên độ $b_n$ theo $n$, thấy ngay sóng vuông chỉ có cột lẻ và giảm như $1/n$.
  3. **Kính lúp Gibbs** — phóng to vùng quanh bước nhảy, đo overshoot và xác nhận nó hội tụ về ~8.95% (không thấp đi) khi tăng $N$.

## Tham khảo & Bài tiếp theo

- **Bài tiếp:** [Lesson 07 — Epicycle & Euler](../lesson-02-epicycles-euler/) — nhìn mỗi harmonic phức $c_n e^{in\\omega_0 t}$ như một vòng tròn quay; chuỗi Fourier trở thành chồng các epicycle vẽ lại hình.
- **Tiền đề ôn lại:** [Tier 1 — Lesson 03: Tổng hợp sóng](../../01-Foundations/lesson-03-wave-superposition/), [Math — Tích phân](../../../Math/04-Calculus-1var/), [Vectors — Trực giao & cơ sở](../../../Vectors/04-LinearAlgebra/).
- **Đào sâu lý thuyết:** phần [Math](../../../Math/) — chứng minh hội tụ Dirichlet, hằng số Gibbs $\\frac{2}{\\pi}\\int_0^{\\pi}\\frac{\\sin x}{x}dx - 1 \\approx 0.0895$, và không gian $L^2$.
`;
