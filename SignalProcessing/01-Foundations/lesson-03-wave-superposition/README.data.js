// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/01-Foundations/lesson-03-wave-superposition/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Tổng hợp sóng (Superposition) & Harmonics

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao một sóng phức tạp luôn có thể coi là tổng của nhiều sóng sin đơn giản** — ý tưởng cốt lõi dẫn tới chuỗi Fourier.
- Áp dụng được **nguyên lý chồng chập (superposition)**: cộng hai sóng điểm-theo-điểm tại từng thời điểm $t$.
- Phân biệt **giao thoa tăng cường (constructive)** và **giao thoa triệt tiêu (destructive)**, tính được **phách (beat)** với công thức $f_\\text{beat} = |f_1 - f_2|$.
- Hiểu **tần số cơ bản (fundamental) $f_0$**, các **harmonic** bội $2f_0, 3f_0, \\ldots$, và **timbre (âm sắc)** là phân bố biên độ các harmonic.
- Dựng được **sóng vuông** và **sóng răng cưa** bằng cách cộng dần các harmonic (preview hiện tượng Gibbs).
- Liên hệ trực tiếp tới **chuỗi Fourier**: mọi sóng tuần hoàn phân tích được thành tổng các harmonic.

## Kiến thức tiền đề

- [L01 — Tín hiệu cơ bản](../lesson-01-signals-basics/) — biên độ, tần số, pha của một sin đơn.
- [Physics — Dao động & sóng](../../../Physics/01-Mechanics/lesson-08-oscillation-waves/) — sóng cơ học, dao động điều hòa.

## 1. Vì sao học tổng hợp sóng?

💡 **Trực giác / Hình dung.** Đánh cùng một nốt **La (A4, 440 Hz)** trên **đàn guitar** và trên **piano**, tai bạn lập tức phân biệt được hai nhạc cụ — dù *cao độ* (pitch) giống hệt nhau. Vì sao?

Câu trả lời: cả hai đều phát ra **440 Hz làm tần số cơ bản**, nhưng kèm theo đó là một "tập hợp" các tần số bội (880, 1320, 1760 Hz...) với **biên độ khác nhau** ở mỗi nhạc cụ. Chính cái "công thức trộn" các tần số bội này — gọi là **harmonic content** — tạo ra **âm sắc (timbre)** riêng. Guitar mạnh ở harmonic thấp, piano có phổ harmonic khác → cùng nốt, khác tiếng.

Đó là bài học hôm nay: **một âm thanh thực tế = tổng của nhiều sóng sin thuần.** Hiểu được điều này, bạn nắm được ý tưởng nền của **toàn bộ xử lý tín hiệu**:

- **Tổng hợp âm thanh (synthesizer)**: cộng nhiều sin để "vẽ" ra nhạc cụ ảo.
- **Nén MP3 / JPEG**: bỏ bớt các tần số tai/mắt ít nhạy.
- **Lọc nhiễu**: tách và loại bỏ các thành phần tần số không mong muốn.
- **Chuỗi Fourier (Tier 2)**: phát biểu chính xác "mọi sóng tuần hoàn = tổng harmonic".

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Mọi sóng đều phân tích được thành sin sao? Cả sóng vuông sắc cạnh?"* → Đúng, miễn là **tuần hoàn** (lặp lại). §5 sẽ dựng sóng vuông từ sin để bạn thấy tận mắt.
- *"Vì sao lại là sin chứ không phải hàm khác?"* → Vì sin là dạng sóng **"thuần" về tần số**: một sin chỉ chứa đúng một tần số. Nó là "viên gạch" nhỏ nhất không thể chia nhỏ hơn về mặt tần số. Lý do toán học sâu hơn (sin là eigenfunction của hệ tuyến tính) sẽ gặp ở Tier 2.

## 2. Nguyên lý chồng chập (Superposition)

### 2.1. Phát biểu

💡 **Trực giác.** Thả hai viên đá xuống mặt hồ ở hai điểm khác nhau. Tại một điểm bất kỳ, mặt nước **nhô lên đúng bằng tổng** độ nhô mà từng gợn sóng tạo ra nếu nó đứng một mình. Sóng không "va" vào nhau rồi nát — chúng **cộng dồn**, đi qua nhau, rồi tiếp tục như cũ.

**Nguyên lý chồng chập:** trong một **hệ tuyến tính**, nếu sóng 1 tạo giá trị $y_1(t)$ và sóng 2 tạo $y_2(t)$, thì khi cả hai cùng có mặt, giá trị tổng là

$$y(t) = y_1(t) + y_2(t).$$

Đơn giản chỉ là **cộng điểm-theo-điểm** (point-wise): tại mỗi thời điểm $t$, lấy giá trị của mỗi sóng rồi cộng lại.

### 2.2. Ví dụ số

Cho hai sóng:

$$y_1(t) = \\sin(t), \\qquad y_2(t) = \\sin(2t).$$

Tính tổng $y(t) = y_1(t) + y_2(t)$ tại vài mốc $t$ (đơn vị radian):

| $t$ | $y_1 = \\sin t$ | $y_2 = \\sin 2t$ | $y = y_1 + y_2$ |
|---|---|---|---|
| $0$ | $0.000$ | $0.000$ | $\\mathbf{0.000}$ |
| $\\pi/4 \\approx 0.785$ | $0.707$ | $1.000$ | $\\mathbf{1.707}$ |
| $\\pi/2 \\approx 1.571$ | $1.000$ | $0.000$ | $\\mathbf{1.000}$ |
| $3\\pi/4 \\approx 2.356$ | $0.707$ | $-1.000$ | $\\mathbf{-0.293}$ |
| $\\pi \\approx 3.142$ | $0.000$ | $0.000$ | $\\mathbf{0.000}$ |

Kiểm tra hàng $t = \\pi/4$: $\\sin(\\pi/4) = 0.707$, $\\sin(2 \\cdot \\pi/4) = \\sin(\\pi/2) = 1.000$. Tổng $= 0.707 + 1.000 = 1.707$ ✓. Đường $y$ không còn là sin thuần — nó là một **dạng sóng mới**, phức tạp hơn, nhưng vẫn được sinh ra **chỉ bằng phép cộng**.

Thêm 4 ví dụ với hai sóng cùng tần số, lệch pha — $y_1 = \\sin t$, $y_2 = \\sin(t + \\pi/2) = \\cos t$:

| $t$ | $\\sin t$ | $\\cos t$ | tổng |
|---|---|---|---|
| $0$ | $0.000$ | $1.000$ | $1.000$ |
| $\\pi/4$ | $0.707$ | $0.707$ | $1.414$ |
| $\\pi/2$ | $1.000$ | $0.000$ | $1.000$ |
| $\\pi$ | $0.000$ | $-1.000$ | $-1.000$ |

→ Tổng vẫn là một sin (cùng tần số) nhưng biên độ $\\sqrt{2} \\approx 1.414$ và lệch pha. Cộng hai sin **cùng tần số** luôn ra một sin cùng tần số; cộng hai sin **khác tần số** ra dạng sóng mới.

⚠ **Lỗi thường gặp.** Superposition chỉ đúng trong **hệ tuyến tính**. Nhiều hệ thực tế *phi tuyến* (loa quá tải, dây đàn căng cực mạnh) sẽ sinh thêm tần số mới (distortion) — lúc đó "tổng" không còn đơn giản là cộng. Trong bài này ta luôn giả định hệ tuyến tính.

🔁 **Dừng lại tự kiểm tra.** Cho $y_1 = \\sin t$, $y_2 = -\\sin t$. Tổng tại $t = \\pi/2$ bằng bao nhiêu?
<details><summary>Đáp án</summary>
$\\sin(\\pi/2) + (-\\sin(\\pi/2)) = 1 + (-1) = 0$. Thực ra tổng bằng $0$ ở **mọi** $t$ — hai sóng ngược pha triệt tiêu nhau hoàn toàn (xem §3).
</details>

📝 **Tóm tắt mục 2.**
- Chồng chập = cộng giá trị **điểm-theo-điểm** tại mỗi $t$.
- Chỉ đúng trong hệ tuyến tính.
- Cộng sin cùng tần số → vẫn là sin cùng tần số; cộng sin khác tần số → dạng sóng mới.

## 3. Giao thoa (Interference) & Phách (Beat)

### 3.1. Tăng cường và triệt tiêu

Khi cộng hai sóng **cùng tần số, cùng biên độ** $A$, kết quả phụ thuộc **hiệu pha** $\\Delta\\phi$:

$$y(t) = A\\sin(\\omega t) + A\\sin(\\omega t + \\Delta\\phi).$$

💡 **Trực giác.** Hai người cùng đẩy một chiếc xích đu. Nếu họ đẩy **đồng nhịp** (cùng pha), lực cộng dồn → xích đu vung cao. Nếu một người đẩy tới lúc người kia kéo lui (**ngược pha**), hai lực khử nhau → xích đu đứng yên.

- **Cùng pha** ($\\Delta\\phi = 0$): hai sóng "đồng nhịp" → biên độ tổng = $2A$. Đây là **giao thoa tăng cường (constructive)**.
- **Ngược pha** ($\\Delta\\phi = \\pi$, tức nửa chu kỳ): đỉnh sóng này gặp đáy sóng kia → biên độ tổng = $0$. Đây là **giao thoa triệt tiêu (destructive)**.

Ví dụ số với $A = 1$, $\\omega = 1$, tại $t = \\pi/2$ (nơi $\\sin = 1$):

| $\\Delta\\phi$ | $\\sin(\\pi/2)$ | $\\sin(\\pi/2 + \\Delta\\phi)$ | tổng |
|---|---|---|---|
| $0$ (cùng pha) | $1.000$ | $1.000$ | $\\mathbf{2.000}$ (tăng cường) |
| $\\pi/2$ | $1.000$ | $0.000$ | $1.000$ |
| $\\pi$ (ngược pha) | $1.000$ | $-1.000$ | $\\mathbf{0.000}$ (triệt tiêu) |
| $3\\pi/2$ | $1.000$ | $0.000$ | $1.000$ |

Đây chính là nguyên lý của **tai nghe chống ồn (noise-cancelling)**: máy tạo một sóng **ngược pha** với tiếng ồn → triệt tiêu destructive.

### 3.2. Phách (Beat) — hai tần số gần nhau

💡 **Trực giác.** Khi lên dây đàn, người ta vặn dây tới khi tiếng "wah... wah... wah..." (âm lượng lên xuống chậm) **chậm dần rồi biến mất**. Tiếng "wah" đó là **phách (beat)**: khi hai tần số rất gần nhau, lúc thì chúng cùng pha (to lên), lúc thì ngược pha (nhỏ đi), luân phiên theo một nhịp chậm.

Cộng hai sin tần số $f_1, f_2$ gần nhau, dùng công thức tổng-thành-tích:

$$\\sin(2\\pi f_1 t) + \\sin(2\\pi f_2 t) = 2 \\cos\\!\\Big(2\\pi \\tfrac{f_1 - f_2}{2} t\\Big)\\, \\sin\\!\\Big(2\\pi \\tfrac{f_1 + f_2}{2} t\\Big).$$

Đọc kết quả: một sóng **nhanh** ở tần số trung bình $\\frac{f_1+f_2}{2}$ (cao độ ta nghe), bị **bao** bởi một "đường viền" (envelope) cos **chậm** ở tần số $\\frac{|f_1-f_2|}{2}$. Vì envelope là $|\\cos|$ (lên-xuống hai lần mỗi chu kỳ cos), tai nghe được **hai** đỉnh to mỗi chu kỳ → **tần số phách**:

$$\\boxed{f_\\text{beat} = |f_1 - f_2|.}$$

**Walk-through số.** Hai dây đàn $f_1 = 440$ Hz và $f_2 = 443$ Hz:

- Tần số phách: $f_\\text{beat} = |440 - 443| = 3$ Hz → nghe **3 lần "wah" mỗi giây**.
- Chu kỳ phách: $T_\\text{beat} = 1/3 \\approx 0.333$ s.
- Cao độ nghe được: trung bình $\\frac{440 + 443}{2} = 441.5$ Hz.

Thêm ví dụ số:

| $f_1$ (Hz) | $f_2$ (Hz) | $f_\\text{beat} = |f_1-f_2|$ | $T_\\text{beat}$ (s) |
|---|---|---|---|
| $440$ | $441$ | $1$ | $1.000$ |
| $440$ | $445$ | $5$ | $0.200$ |
| $440$ | $450$ | $10$ | $0.100$ |
| $440$ | $440$ | $0$ | $\\infty$ (đã đúng dây — không còn phách) |

→ Càng chỉnh gần, $f_\\text{beat}$ càng nhỏ, "wah" càng chậm; khi khớp hẳn, phách biến mất. Đây là phản hồi vật lý dùng để lên dây.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Phách có phải một tần số 'mới' thật không?"* → Không có sóng nào dao động ở 3 Hz cả; 3 Hz chỉ là nhịp **lên-xuống của âm lượng** (amplitude modulation). Phổ tần số thật vẫn chỉ có 440 và 443 Hz.
- *"Khi nào nghe ra phách, khi nào nghe ra hai nốt riêng?"* → Hai tần số rất gần (vài Hz) → tai gộp thành một âm "rung". Cách xa hơn (vài chục Hz trở lên) → tai tách thành hai nốt và nghe "nghịch tai" (dissonance).

⚠ **Lỗi thường gặp.** Nhầm $f_\\text{beat} = \\frac{|f_1-f_2|}{2}$ (tần số của hàm cos envelope) với tần số phách **nghe được**. Tai nghe $|f_1 - f_2|$ vì mỗi chu kỳ cos cho **hai** đỉnh biên độ (do $|\\cos|$).

🔁 **Dừng lại tự kiểm tra.** Đánh đồng thời hai âm $300$ Hz và $304$ Hz. Bạn nghe bao nhiêu "phách" mỗi giây, ở cao độ nào?
<details><summary>Đáp án</summary>
$f_\\text{beat} = |300 - 304| = 4$ Hz → 4 phách/giây. Cao độ nghe: $\\frac{300+304}{2} = 302$ Hz.
</details>

📝 **Tóm tắt mục 3.**
- Cùng pha → tăng cường (biên độ $2A$); ngược pha → triệt tiêu (biên độ $0$).
- Hai tần số gần nhau → phách, $f_\\text{beat} = |f_1 - f_2|$.
- Phách là dao động **âm lượng**, không phải tần số mới.

## 4. Harmonic & Overtone — gốc của âm sắc

### 4.1. Định nghĩa

Khi một dây đàn / cột khí dao động, nó không rung ở **một** tần số mà ở **cả một dãy** tần số là bội nguyên của một tần số thấp nhất:

- **Tần số cơ bản (fundamental) $f_0$**: tần số thấp nhất, quyết định **cao độ (pitch)** ta nghe. Vd dây đàn La: $f_0 = 440$ Hz.
- **Harmonic thứ $n$**: tần số $n \\cdot f_0$. Harmonic 1 = $f_0$ chính là fundamental. Harmonic 2 = $2f_0 = 880$, harmonic 3 = $3f_0 = 1320$...
- **Overtone**: tên gọi các harmonic **trên** fundamental (overtone 1 = harmonic 2, v.v.). Hai từ chỉ lệch nhau cách đánh số.

**(a) Là gì** — harmonic là các tần số bội $n f_0$ cùng có mặt trong một âm thực.
**(b) Vì sao tồn tại** — một dây căng hai đầu cố định chỉ dao động được ở các "mode" mà chiều dài dây chứa số nguyên lần nửa bước sóng → chỉ những tần số $f_0, 2f_0, 3f_0, \\ldots$ "vừa khít". Vì sao cần khái niệm này? Vì **âm sắc** không nằm ở fundamental (cái này chỉ là cao độ) mà nằm ở **biên độ tương đối** của các harmonic.
**(c) Ví dụ trực giác bằng số** — sáo phát La gần như chỉ có $f_0 = 440$ với chút harmonic 2 → tiếng "mượt", gần sin thuần. Kèn đồng có harmonic 2,3,4,5... biên độ lớn → tiếng "chói, sáng".

Với $f_0 = 220$ Hz (nốt La quãng dưới):

| Harmonic $n$ | Tần số $n f_0$ | Tên nhạc |
|---|---|---|
| $1$ | $220$ Hz | fundamental (A3) |
| $2$ | $440$ Hz | quãng tám (A4) |
| $3$ | $660$ Hz | quãng tám + quãng năm (E5) |
| $4$ | $880$ Hz | hai quãng tám (A5) |
| $5$ | $1100$ Hz | (≈ C#6) |

### 4.2. Timbre (âm sắc) = phân bố biên độ harmonic

💡 **Trực giác.** Hãy coi mỗi harmonic như một "thanh trượt" trên bàn mixer. Cùng một nốt $f_0$, nhưng kéo các thanh trượt khác nhau → ra **tiếng nhạc cụ khác nhau**. Đó là vì sao guitar và piano (mục §1) khác tiếng dù cùng 440 Hz: chúng có **cấu hình thanh trượt harmonic khác nhau**.

Một âm thực có thể viết:

$$y(t) = \\sum_{n=1}^{N} A_n \\sin(2\\pi n f_0\\, t + \\phi_n),$$

với $A_n$ là biên độ harmonic thứ $n$. **Bộ số $\\{A_n\\}$ chính là timbre.** Đây đã là một **chuỗi Fourier** — sẽ phát biểu chính thức ở Tier 2.

❓ **Câu hỏi tự nhiên.** *"Đổi $f_0$ thì đổi nốt; đổi $\\{A_n\\}$ thì đổi gì?"* → Đổi $f_0$ = đổi cao độ (nốt cao/thấp). Đổi $\\{A_n\\}$ = đổi **âm sắc** (nhạc cụ nào) mà giữ nguyên cao độ.

📝 **Tóm tắt mục 4.**
- $f_0$ quyết định cao độ; harmonic là bội $n f_0$.
- Timbre = phân bố biên độ $\\{A_n\\}$ các harmonic.
- $y(t) = \\sum_n A_n \\sin(2\\pi n f_0 t + \\phi_n)$ — đã là một chuỗi Fourier.

## 5. Dựng sóng tuần hoàn từ harmonic

Đây là phần "wow": **chỉ cộng sin** mà ra được sóng vuông sắc cạnh.

### 5.1. Sóng vuông (square wave)

Sóng vuông biên độ $1$, tần số cơ bản $f_0$, được dựng từ **các harmonic lẻ** với biên độ $1/n$:

$$y(t) = \\frac{4}{\\pi}\\sum_{k=0}^{\\infty} \\frac{1}{2k+1}\\sin\\big(2\\pi (2k+1) f_0\\, t\\big) = \\frac{4}{\\pi}\\Big(\\sin\\omega t + \\tfrac{1}{3}\\sin 3\\omega t + \\tfrac{1}{5}\\sin 5\\omega t + \\cdots\\Big),$$

với $\\omega = 2\\pi f_0$. Chỉ harmonic **lẻ** (1, 3, 5, 7...), biên độ giảm theo $1/n$.

**Walk-through cộng dần** (bỏ hệ số $\\frac{4}{\\pi}$ để gọn, xét tại $t$ sao cho $\\omega t = \\pi/2$, tức điểm giữa nửa chu kỳ dương — sóng vuông lý tưởng $= 1$ ở đây):

| Số hạng dùng | Biểu thức tại $\\omega t = \\pi/2$ | Giá trị (chưa nhân $4/\\pi$) | $\\times \\tfrac{4}{\\pi}$ |
|---|---|---|---|
| 1 số ($n=1$) | $\\sin\\tfrac{\\pi}{2}$ | $1.000$ | $1.273$ |
| 2 số ($n=1,3$) | $1 + \\tfrac{1}{3}\\sin\\tfrac{3\\pi}{2}$ | $1 - 0.333 = 0.667$ | $0.849$ |
| 3 số ($+\\,n=5$) | $0.667 + \\tfrac{1}{5}\\sin\\tfrac{5\\pi}{2}$ | $0.667 + 0.200 = 0.867$ | $1.103$ |
| 4 số ($+\\,n=7$) | $0.867 + \\tfrac{1}{7}\\sin\\tfrac{7\\pi}{2}$ | $0.867 - 0.143 = 0.724$ | $0.922$ |
| 5 số ($+\\,n=9$) | $0.724 + \\tfrac{1}{9}\\sin\\tfrac{9\\pi}{2}$ | $0.724 + 0.111 = 0.835$ | $1.063$ |

Kiểm tra hàng 3: $\\sin\\frac{5\\pi}{2} = \\sin\\frac{\\pi}{2} = 1$, nên $+\\frac{1}{5}\\cdot 1 = +0.200$ ✓. Giá trị dao động quanh **$1.0$** và **xích lại gần** khi thêm số hạng — đúng giá trị sóng vuông lý tưởng. Càng nhiều harmonic, cạnh càng dốc, đỉnh càng phẳng.

### 5.2. Sóng răng cưa (sawtooth)

Sóng răng cưa dùng **tất cả** harmonic (chẵn lẫn lẻ), biên độ $1/n$, dấu xen kẽ:

$$y(t) = \\frac{2}{\\pi}\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(2\\pi n f_0\\, t) = \\frac{2}{\\pi}\\Big(\\sin\\omega t - \\tfrac{1}{2}\\sin 2\\omega t + \\tfrac{1}{3}\\sin 3\\omega t - \\cdots\\Big).$$

Khác sóng vuông ở chỗ: dùng **cả harmonic chẵn**, nên dốc một bên và rơi thẳng đứng một bên → hình "răng cưa".

### 5.3. Hiện tượng Gibbs (preview)

⚠ **Lỗi thường gặp / điều bất ngờ.** Dù cộng **bao nhiêu** harmonic, ngay tại **chỗ nhảy** (cạnh đứng của sóng vuông) luôn còn một **bướu vọt lố (overshoot) ~9%** không bao giờ biến mất — chỉ co hẹp lại. Đây là **hiện tượng Gibbs**. Nó cho thấy chuỗi vô hạn hội tụ "gần đúng khắp nơi" nhưng "ngoan cố" ở điểm gián đoạn. Sẽ học kỹ ở [Chuỗi Fourier](../../02-Fourier/lesson-01-fourier-series/).

❓ **Câu hỏi tự nhiên.** *"Vì sao sóng vuông chỉ cần harmonic lẻ?"* → Sóng vuông có tính **đối xứng nửa sóng** (half-wave symmetry): nửa sau là bản lật của nửa trước. Tính đối xứng này khử sạch mọi harmonic chẵn. Sóng răng cưa không có đối xứng đó nên giữ cả harmonic chẵn.

🔁 **Dừng lại tự kiểm tra.** Sóng vuông $f_0 = 100$ Hz. Ba tần số đầu tiên xuất hiện trong nó là gì?
<details><summary>Đáp án</summary>
Chỉ harmonic lẻ: $100$ Hz ($n=1$), $300$ Hz ($n=3$), $500$ Hz ($n=5$). Không có $200$ Hz.
</details>

📝 **Tóm tắt mục 5.**
- Sóng vuông = $\\frac{4}{\\pi}\\sum$ harmonic **lẻ**, biên độ $1/n$.
- Sóng răng cưa = $\\frac{2}{\\pi}\\sum$ **mọi** harmonic, dấu xen kẽ.
- Cộng càng nhiều harmonic, hình càng khớp — nhưng Gibbs overshoot ~9% ở cạnh không mất.

## 6. Liên hệ tới chuỗi Fourier

Toàn bộ bài này hội tụ về một phát biểu lớn:

> **Mọi sóng tuần hoàn (chu kỳ $T$, tần số $f_0 = 1/T$) đều phân tích được thành tổng các harmonic** $\\sin/\\cos$ ở tần số $n f_0$:
> $$y(t) = a_0 + \\sum_{n=1}^{\\infty}\\big[a_n \\cos(2\\pi n f_0 t) + b_n \\sin(2\\pi n f_0 t)\\big].$$

Bài này đi theo chiều **tổng hợp (synthesis)**: cho trước biên độ harmonic → cộng lại ra sóng. Chiều ngược lại — cho trước sóng → **tìm** biên độ từng harmonic — gọi là **phân tích (analysis)**, chính là [Chuỗi Fourier](../../02-Fourier/lesson-01-fourier-series/) (Tier 2, L06). Công cụ tính nhanh phổ tần số trên máy tính là **FFT**, sẽ gặp sau đó.

Liên hệ ứng dụng âm nhạc: xem [Music](../../../Music/) để thấy harmonic content quyết định âm sắc nhạc cụ thế nào.

## 7. Ứng dụng thực tế

1. **Tai nghe chống ồn (active noise cancelling)** — micro thu tiếng ồn, hệ tạo sóng **ngược pha** phát vào tai → giao thoa triệt tiêu (§3.1).
2. **Lên dây nhạc cụ** — nhạc công nghe **phách** giữa dây cần chỉnh và nốt chuẩn, vặn tới khi $f_\\text{beat} \\to 0$ (§3.2).
3. **Synthesizer cộng (additive synthesis)** — dựng tiếng nhạc cụ ảo bằng cách cộng nhiều sin với biên độ harmonic định trước (§4, §5).
4. **Phân biệt nhạc cụ / nhận dạng giọng nói** — máy phân tích harmonic content (timbre) để biết là guitar hay piano, ai đang nói (§4.2).
5. **Nén âm thanh MP3 / nén ảnh JPEG** — chuyển tín hiệu sang miền tần số (Fourier), bỏ các thành phần tai/mắt ít nhạy → giảm dung lượng (§6).
6. **Equalizer (EQ)** — tăng/giảm biên độ từng dải harmonic để chỉnh âm bass/treble (§4.2).
7. **Đo độ méo (THD — total harmonic distortion)** — đánh giá ampli bằng cách đo các harmonic "thừa" mà hệ phi tuyến sinh ra (⚠ §2.2).
8. **Mô phỏng giao thoa quang/sóng radio** — anten mảng pha (phased array) lái chùm sóng bằng cách điều khiển pha để tăng cường theo hướng mong muốn (§3.1).

## Bài tập

1. **Cộng điểm-theo-điểm.** Cho $y_1(t) = 2\\sin t$ và $y_2(t) = \\sin 2t$. Tính $y(t) = y_1 + y_2$ tại $t = 0,\\ \\pi/4,\\ \\pi/2,\\ \\pi$.
2. **Giao thoa.** Hai sóng cùng tần số, cùng biên độ $A = 3$. Tính biên độ tổng khi (a) cùng pha, (b) lệch pha $\\pi$, (c) lệch pha $\\pi/2$ (gợi ý: dùng $\\sqrt{A^2 + A^2}$ cho trường hợp vuông pha).
3. **Phách.** Hai âm $f_1 = 256$ Hz và $f_2 = 260$ Hz phát đồng thời. Tính $f_\\text{beat}$, chu kỳ phách $T_\\text{beat}$, và cao độ nghe được.
4. **Harmonic.** Một nốt có $f_0 = 196$ Hz (nốt Sol, G3). Liệt kê tần số của 5 harmonic đầu. Harmonic nào rơi gần $784$ Hz?
5. **Sóng vuông.** Sóng vuông $f_0 = 50$ Hz. (a) Liệt kê 4 tần số đầu tiên có trong nó. (b) Biên độ tương đối của harmonic 3 so với harmonic 1 là bao nhiêu?
6. **Sóng răng cưa vs vuông.** Vì sao sóng răng cưa $f_0 = 50$ Hz có thành phần $100$ Hz còn sóng vuông cùng $f_0$ thì không?

## Lời giải chi tiết

### Bài 1

$y_1 = 2\\sin t$, $y_2 = \\sin 2t$. Cộng từng điểm:

| $t$ | $2\\sin t$ | $\\sin 2t$ | $y$ |
|---|---|---|---|
| $0$ | $0$ | $0$ | $0$ |
| $\\pi/4$ | $2 \\cdot 0.707 = 1.414$ | $\\sin(\\pi/2) = 1.000$ | $2.414$ |
| $\\pi/2$ | $2 \\cdot 1 = 2.000$ | $\\sin\\pi = 0.000$ | $2.000$ |
| $\\pi$ | $0$ | $\\sin 2\\pi = 0$ | $0$ |

Cách tiếp cận: tại mỗi $t$ tính riêng từng sóng rồi cộng (nguyên lý chồng chập §2). Kiểm tra $t=\\pi/4$: $1.414 + 1.000 = 2.414$ ✓.

### Bài 2

Cộng hai sin cùng tần số, biên độ $A=3$:

- **(a) Cùng pha** ($\\Delta\\phi = 0$): biên độ tổng $= A + A = 6$ (tăng cường tối đa, §3.1).
- **(b) Ngược pha** ($\\Delta\\phi = \\pi$): biên độ tổng $= A - A = 0$ (triệt tiêu hoàn toàn).
- **(c) Vuông pha** ($\\Delta\\phi = \\pi/2$): $A\\sin\\omega t + A\\cos\\omega t$. Hợp thành một sin biên độ $\\sqrt{A^2 + A^2} = A\\sqrt{2} = 3\\sqrt{2} \\approx 4.243$.

### Bài 3

$f_1 = 256$, $f_2 = 260$.

- $f_\\text{beat} = |256 - 260| = 4$ Hz → nghe 4 phách/giây.
- $T_\\text{beat} = 1/f_\\text{beat} = 1/4 = 0.25$ s.
- Cao độ nghe = trung bình $\\frac{256 + 260}{2} = 258$ Hz (§3.2).

### Bài 4

$f_0 = 196$ Hz. Harmonic $n$ có tần số $n \\cdot 196$:

| $n$ | $n f_0$ (Hz) |
|---|---|
| $1$ | $196$ |
| $2$ | $392$ |
| $3$ | $588$ |
| $4$ | $784$ |
| $5$ | $980$ |

Harmonic **4** rơi đúng $784$ Hz ($4 \\times 196 = 784$).

### Bài 5

Sóng vuông $f_0 = 50$ Hz chỉ chứa harmonic **lẻ** với biên độ $1/n$ (§5.1).

- **(a)** 4 tần số đầu: $n = 1,3,5,7$ → $50, 150, 250, 350$ Hz.
- **(b)** Biên độ harmonic 3 so với harmonic 1: tỷ lệ $\\frac{1/3}{1/1} = \\frac{1}{3} \\approx 0.333$ (tức ~33%).

### Bài 6

Thành phần $100$ Hz là **harmonic 2** ($2 \\times 50$).

- **Sóng răng cưa** dùng **mọi** harmonic (chẵn lẫn lẻ, §5.2) → có harmonic 2 = $100$ Hz.
- **Sóng vuông** chỉ dùng harmonic **lẻ** do tính đối xứng nửa sóng (half-wave symmetry, §5.3) khử sạch mọi harmonic chẵn → không có $100$ Hz.

## Tham khảo & Bài tiếp theo

- Tiền đề: [L01 — Tín hiệu cơ bản](../lesson-01-signals-basics/), [Physics — Dao động & sóng](../../../Physics/01-Mechanics/lesson-08-oscillation-waves/).
- **Bài tiếp theo:** [L04 — Tích chập (Convolution)](../lesson-04-convolution/) — cách hai tín hiệu "trộn" vào nhau, nền của lọc số (filtering).
- Preview Tier 2: [Chuỗi Fourier (Fourier Series)](../../02-Fourier/lesson-01-fourier-series/) — phân tích ngược một sóng thành các harmonic.
- Liên hệ ứng dụng: [Music](../../../Music/) — harmonic content và âm sắc nhạc cụ.
- Minh họa tương tác: [visualization.html](./visualization.html).
`;
