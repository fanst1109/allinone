// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-08-trig-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Ứng dụng: dao động, sóng, Fourier preview

## Mục tiêu

- Áp dụng số phức và lượng giác vào **dao động điều hòa, sóng, mạch điện AC**.
- Hiểu **phasor** — biểu diễn dao động bằng số phức.
- Giới thiệu **chuỗi Fourier**: mọi hàm tuần hoàn = tổng sin/cos.

## Kiến thức tiền đề

- [Lesson 07 — De Moivre](../lesson-07-de-moivre/).

---

## 1. Dao động điều hòa (Simple Harmonic Motion)

💡 **Là gì**: Chuyển động lặp đi lặp lại quanh vị trí cân bằng, ví dụ con lắc lò xo, con lắc đơn.

**Phương trình**:

$$x(t) = A\\cos(\\omega t + \\varphi)$$

- **$A$** = biên độ (max displacement).
- **$\\omega$** = tần số góc (rad/s). Liên quan tần số f: $\\omega = 2\\pi f$.
- **$\\varphi$** = pha ban đầu.
- **Chu kỳ T** $= \\dfrac{2\\pi}{\\omega}$.

**Ví dụ**: Lò xo k, khối lượng m. $\\omega = \\sqrt{\\dfrac{k}{m}}$. Nếu $k = 100$ N/m, $m = 1$ kg → $\\omega = 10$ rad/s, $T = \\dfrac{2\\pi}{10} \\approx 0.628$s.

**4 ví dụ số đa dạng**:
- $x(t) = 2\\cos(\\pi t)$: $A = 2$, $\\omega = \\pi$ → $T = \\dfrac{2\\pi}{\\pi} = 2$s, $f = \\dfrac{1}{T} = 0.5$ Hz.
- $x(t) = 0.1\\cos(20\\pi t)$: $A = 0.1$, $\\omega = 20\\pi$ → $T = 0.1$s, $f = 10$ Hz.
- Con lắc lò xo $k = 400$, $m = 4$: $\\omega = \\sqrt{\\dfrac{400}{4}} = \\sqrt{100} = 10$ rad/s, $T \\approx 0.628$s.
- $x(t) = 5\\cos\\left(2t + \\dfrac{\\pi}{2}\\right) = -5\\sin(2t)$: $A = 5$, $T = \\pi$ (pha π/2 biến cos thành −sin).

⚠ **Lỗi thường gặp — lẫn tần số $f$ (Hz) với tần số góc $\\omega$ (rad/s)**. Liên hệ: $\\omega = 2\\pi f$. Phản ví dụ: dao động "50 Hz" có $\\omega = 2\\pi\\cdot 50 = 100\\pi \\approx 314$ rad/s, KHÔNG phải $\\omega = 50$. Nhầm hai đại lượng làm sai chu kỳ gấp ~6.28 lần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cos hay sin để mô tả dao động?"* Cả hai đều được — chỉ khác pha π/2. Quy ước phổ biến dùng cos vì tại t=0 cho ngay biên độ. $\\sin(\\omega t) = \\cos\\left(\\omega t - \\dfrac{\\pi}{2}\\right)$.
- *"Chu kỳ T và tần số f liên hệ sao?"* $f = \\dfrac{1}{T}$ (số dao động mỗi giây) và $\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$. Ba đại lượng quy về nhau.

🔁 **Dừng lại tự kiểm tra**

1. Dao động $x(t) = 3\\cos(4\\pi t)$. Chu kỳ và tần số?
2. Con lắc lò xo $k = 100$, $m = 0.25$. $\\omega$ bằng mấy?

<details><summary>Đáp án</summary>

1. $\\omega = 4\\pi$ → $T = \\dfrac{2\\pi}{4\\pi} = 0.5$s, $f = \\dfrac{1}{0.5} = 2$ Hz.
2. $\\omega = \\sqrt{\\dfrac{100}{0.25}} = \\sqrt{400} = 20$ rad/s.

</details>

### 📝 Tóm tắt mục 1

- SHM: $x(t) = A\\cos(\\omega t + \\varphi)$; A = biên độ, ω = tần số góc, φ = pha.
- $T = \\dfrac{2\\pi}{\\omega}$, $f = \\dfrac{1}{T}$, $\\omega = 2\\pi f$ (đừng lẫn f và ω).
- Lò xo: $\\omega = \\sqrt{\\dfrac{k}{m}}$.

---

## 2. Biểu diễn dao động bằng số phức (Phasor)

💡 **Mẹo**: Thay vì viết $\\cos(\\omega t + \\varphi)$, ta viết **phần thực của $e^{i(\\omega t+\\varphi)}$** $= Ae^{i\\varphi}e^{i\\omega t}$.

⟶ Phần phasor $Ae^{i\\varphi}$ là **số phức cố định** (không phụ thuộc t), gọi là **phasor**.

**Cộng 2 dao động** cùng tần số:
- $x_1(t) = A_1\\cos(\\omega t + \\varphi_1)$, phasor $Z_1 = A_1 e^{i\\varphi_1}$.
- $x_2(t) = A_2\\cos(\\omega t + \\varphi_2)$, phasor $Z_2 = A_2 e^{i\\varphi_2}$.
- Tổng $x_1 + x_2$ tương ứng phasor **$Z = Z_1 + Z_2$** (cộng số phức).

⟶ Cộng dao động đã quy về **cộng số phức** — đơn giản hơn nhiều cộng cos.

> 📐 **Định nghĩa đầy đủ — Phasor**
>
> **(a) Là gì**: Số phức **cố định** $Ae^{i\\varphi}$ đại diện cho dao động $A\\cos(\\omega t + \\varphi)$ khi tần số ω đã biết. Phasor "thu gọn" 1 hàm thời gian thành 1 số phức — chỉ giữ lại 2 thông tin quan trọng: biên độ A và pha φ.
>
> **(b) Vì sao cần**: Khi nhiều dao động cùng tần số cộng nhau (mạch điện AC, giao thoa sóng), tính trực tiếp $A_1\\cos(\\omega t+\\varphi_1) + A_2\\cos(\\omega t+\\varphi_2)$ cần công thức cộng — rối. Phasor biến phép này thành **cộng vector số phức** $Z_1 + Z_2$ — đơn giản, hiển thị trên Argand. Nguyên lý cốt lõi của: kỹ thuật điện (giải mạch AC bằng phasor thay vì PT vi phân), tín hiệu số (DSP), antenna engineering.
>
> **(c) Ví dụ số**: 2 dao động cùng ω: $x_1 = 3\\cos(\\omega t)$, $x_2 = 4\\cos\\left(\\omega t + \\dfrac{\\pi}{2}\\right)$. Phasor $Z_1 = 3$, $Z_2 = 4e^{i\\pi/2} = 4i$. Tổng $Z = 3 + 4i$ → $|Z| = 5$, $\\arg = \\arctan\\dfrac{4}{3} \\approx 53.13^\\circ$. Vậy $x_1+x_2 =$ **$5\\cos(\\omega t + 53.13^\\circ)$** (KHÔNG phải $7\\cos$ — biên độ tổng không cộng đơn giản!). Verify số: tại $t = 0$, $x_1+x_2 = 3 + 0 = 3$ và $5\\cos(53.13^\\circ) = 5\\cdot 0.6 = 3$ ✓.

**Ví dụ thực tế**: Mạch điện AC.
- $U_1 = 10\\cos(100\\pi t)$, phasor $Z_1 = 10$.
- $U_2 = 10\\cos\\left(100\\pi t + \\dfrac{\\pi}{2}\\right)$, phasor $Z_2 = 10e^{i\\pi/2} = 10i$.
- Tổng phasor $= 10 + 10i$. $|Z| = 10\\sqrt{2}$, $\\arg = \\dfrac{\\pi}{4}$.
- → $U_{\\text{tổng}} = 10\\sqrt{2}\\cos\\left(100\\pi t + \\dfrac{\\pi}{4}\\right)$. Biên độ tổng $= 10\\sqrt{2}$ chứ không phải 20.

⚠ **Lỗi thường gặp — cộng biên độ trực tiếp $A_1 + A_2$**. Hai dao động cùng tần số nhưng **lệch pha** cộng theo kiểu vector (qua phasor), không cộng số học. Phản ví dụ: $3\\cos(\\omega t) + 4\\cos\\left(\\omega t + \\dfrac{\\pi}{2}\\right)$ cho biên độ $|3 + 4i| = 5$, KHÔNG phải 7. Chỉ khi **cùng pha** ($\\varphi_1 = \\varphi_2$) mới được cộng thẳng $A_1+A_2$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phasor bỏ được $e^{i\\omega t}$?"* Vì khi mọi dao động **cùng ω**, thừa số $e^{i\\omega t}$ chung cho tất cả, có thể đặt ra ngoài tổng → chỉ còn cộng các phasor cố định. Tách xong cộng lại sau.
- *"Hai dao động khác tần số có dùng phasor được không?"* **Không** trực tiếp — phasor chỉ gọn khi cùng ω. Khác tần số phải xử lý riêng (hoặc Fourier).
- *"Khi nào tổng hai dao động cùng biên độ bằng 0?"* Khi ngược pha (lệch π) và cùng biên độ: $A\\cos(\\omega t) + A\\cos(\\omega t+\\pi) = A - A = 0$ (giao thoa triệt tiêu).

🔁 **Dừng lại tự kiểm tra**

1. Phasor của $6\\cos\\left(\\omega t + \\dfrac{\\pi}{2}\\right)$ là gì?
2. Cộng $x_1 = 5\\cos(\\omega t)$ và $x_2 = 5\\cos(\\omega t + \\pi)$. Biên độ tổng?

<details><summary>Đáp án</summary>

1. $Z = 6e^{i\\pi/2} = 6i$.
2. $Z = 5 + 5e^{i\\pi} = 5 - 5 = 0$ → biên độ tổng = **0** (triệt tiêu hoàn toàn).

</details>

### 📝 Tóm tắt mục 2

- Phasor $Ae^{i\\varphi}$ thu gọn dao động $A\\cos(\\omega t+\\varphi)$ (khi ω cố định).
- Cộng dao động cùng tần số = **cộng phasor** (cộng vector số phức), KHÔNG cộng biên độ thẳng.
- Biên độ tổng = mô-đun phasor tổng; chỉ dùng được khi các dao động cùng ω.

---

## 3. Sóng (Wave)

💡 **Trực giác / Hình dung**: dao động ở mục 1 chỉ "lên xuống tại chỗ" (phụ thuộc thời gian t). Sóng là dao động **lan ra không gian** — mỗi điểm x dao động, nhưng lệch pha so với điểm bên cạnh, tạo "vệt" di chuyển. Vì thế hàm sóng phụ thuộc **cả x lẫn t**: $y(x,t)$. Số sóng k đo "dao động theo không gian", ω đo "dao động theo thời gian".

Sóng = dao động truyền theo không gian:

$$y(x, t) = A\\sin(kx - \\omega t + \\varphi)$$

- **$k$** = số sóng (rad/m). $\\lambda = \\dfrac{2\\pi}{k}$ = bước sóng.
- **$\\omega$** = tần số góc (rad/s).
- **vận tốc sóng $v = \\dfrac{\\omega}{k} = \\lambda f$**.

**Ví dụ**: Sóng âm 440 Hz (nốt La). $f = 440$ → $\\omega = 880\\pi$. Trong không khí $v \\approx 340$ m/s → $\\lambda = \\dfrac{340}{440} \\approx 0.77$ m.

⚠ **Lỗi thường gặp — lẫn bước sóng λ với chu kỳ T**. λ là chu kỳ **theo không gian** (mét), T là chu kỳ **theo thời gian** (giây). Liên hệ: $v = \\dfrac{\\lambda}{T} = \\lambda f$. Phản ví dụ: sóng 440 Hz có $T = \\dfrac{1}{440} \\approx 0.00227$s (thời gian) nhưng $\\lambda \\approx 0.77$m (không gian) — hai con số khác hẳn, đừng trộn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tần số cao thì bước sóng dài hay ngắn?"* Ngắn. Vì $\\lambda = \\dfrac{v}{f}$ (v cố định), f tăng → λ giảm. Nốt cao (f lớn) có bước sóng ngắn.
- *"Vì sao trong $kx - \\omega t$ lại có dấu trừ?"* Dấu trừ cho sóng chạy **sang phải** (chiều +x). Dấu cộng ($kx + \\omega t$) cho sóng chạy sang trái.

🔁 **Dừng lại tự kiểm tra**

1. Sóng âm 170 Hz trong không khí ($v = 340$ m/s). Bước sóng?
2. Bước sóng 2m, vận tốc 340 m/s. Tần số bao nhiêu?

<details><summary>Đáp án</summary>

1. $\\lambda = \\dfrac{v}{f} = \\dfrac{340}{170} = 2$m.
2. $f = \\dfrac{v}{\\lambda} = \\dfrac{340}{2} = 170$ Hz.

</details>

### 📝 Tóm tắt mục 3

- Sóng $y(x,t) = A\\sin(kx - \\omega t + \\varphi)$ phụ thuộc cả không gian x và thời gian t.
- k = số sóng ($\\lambda = \\dfrac{2\\pi}{k}$), ω = tần số góc; $v = \\dfrac{\\omega}{k} = \\lambda f$.
- λ (không gian, mét) ≠ T (thời gian, giây) — đừng lẫn; f cao → λ ngắn.

---

## 4. Chuỗi Fourier — Preview

💡 **Trực giác / Hình dung**: tưởng tượng một "thợ lắp ráp âm thanh". Cho bất kỳ hình sóng tuần hoàn nào (kể cả sóng vuông có góc cạnh), Fourier nói: chỉ cần **chồng nhiều sóng sin/cos thuần** với tần số bội nhau (1×, 2×, 3×...) và biên độ thích hợp là tái tạo được. Sin/cos là "viên gạch lego" của mọi tín hiệu tuần hoàn.

🎯 **Định lý Fourier (1822)**: Mọi hàm tuần hoàn $f(x)$ chu kỳ 2π "đủ tốt" đều có thể viết:

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left[a_n\\cos(nx) + b_n\\sin(nx)\\right]$$

Trong đó:
- $a_n = \\dfrac{1}{\\pi} \\displaystyle\\int_{-\\pi}^{\\pi} f(x)\\cos(nx)\\,dx$.
- $b_n = \\dfrac{1}{\\pi} \\displaystyle\\int_{-\\pi}^{\\pi} f(x)\\sin(nx)\\,dx$.

⟶ **Mọi tín hiệu = tổng các sóng sin/cos cơ bản**. Đây là nền tảng cho:
- **Nén ảnh JPEG** (Discrete Cosine Transform).
- **Nén nhạc MP3** (FFT).
- **Phân tích phổ** trong vật lý, kỹ thuật.

### Ví dụ trực quan: Sóng vuông

Hàm sóng vuông (square wave) $f(x) = 1$ nếu $0 < x < \\pi$, $-1$ nếu $\\pi < x < 2\\pi$. Khai triển Fourier:

$$f(x) = \\frac{4}{\\pi}\\left[\\sin x + \\frac{1}{3}\\sin 3x + \\frac{1}{5}\\sin 5x + \\frac{1}{7}\\sin 7x + \\ldots\\right]$$

⟶ Càng nhiều số hạng, càng gần sóng vuông. Visualization sẽ minh họa điều này.

❓ **Vì sao kỳ lạ vậy?** Sin là hàm "mềm" mà tổng vô hạn cho ra hàm "có góc vuông"? Đáp: Hội tụ trong nghĩa trung bình, không hội tụ đều. Hiện tượng **Gibbs** — tại điểm gián đoạn, tổng riêng luôn dao động khoảng ~9% biên độ.

⚠ **Lỗi thường gặp — bỏ hệ số $\\dfrac{a_0}{2}$ (thành phần một chiều)**. $\\dfrac{a_0}{2}$ là **giá trị trung bình** của hàm trên một chu kỳ. Phản ví dụ: hàm $f(x) = 3 + \\sin x$ có trung bình 3 → $\\dfrac{a_0}{2} = 3$. Nếu bỏ, chuỗi Fourier dao động quanh 0 thay vì quanh 3 — sai mức nền.

❓ **Câu hỏi tự nhiên của người đọc (bổ sung)**

- *"Vì sao hàm lẻ chỉ có sin, hàm chẵn chỉ có cos?"* Hàm lẻ ($f(-x) = -f(x)$) đối xứng tâm như sin → các hệ số $a_n$ (của cos, vốn chẵn) đều bằng 0. Ngược lại hàm chẵn chỉ còn cos. Mẹo này giảm nửa khối lượng tính.
- *"'Đủ tốt' nghĩa là gì?"* Điều kiện Dirichlet: hàm bị chặn, có hữu hạn cực trị và điểm gián đoạn trong một chu kỳ. Hầu hết tín hiệu thực tế đều thỏa.

🔁 **Dừng lại tự kiểm tra**

1. Hàm $f(x) = x$ trên $[-\\pi, \\pi]$ là chẵn hay lẻ? Chuỗi Fourier chỉ chứa sin hay cos?
2. Trong khai triển sóng vuông, hệ số của $\\sin 5x$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. Lẻ ($(-x) = -x$) → chỉ chứa **sin** (mọi $a_n = 0$).
2. $\\dfrac{4}{\\pi}\\cdot\\dfrac{1}{5} = \\dfrac{4}{5\\pi}$ (từ chuỗi $\\dfrac{4}{\\pi}\\left[\\sin x + \\dfrac{\\sin 3x}{3} + \\dfrac{\\sin 5x}{5} + \\ldots\\right]$).

</details>

### 📝 Tóm tắt mục 4

- Fourier: mọi hàm tuần hoàn "đủ tốt" $= \\dfrac{a_0}{2} + \\sum(a_n\\cos nx + b_n\\sin nx)$.
- $\\dfrac{a_0}{2}$ = giá trị trung bình (đừng bỏ); hàm lẻ → chỉ sin, hàm chẵn → chỉ cos.
- Nền của JPEG, MP3, phân tích phổ; hiện tượng Gibbs (~9%) tại điểm gián đoạn.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Dao động $x(t) = 5\\cos\\left(2\\pi t + \\dfrac{\\pi}{3}\\right)$. Tìm biên độ, chu kỳ, tần số.

**Bài 2**: Cộng 2 dao động $x_1 = 3\\cos(\\omega t)$, $x_2 = 4\\cos\\left(\\omega t + \\dfrac{\\pi}{2}\\right)$. Tìm biên độ dao động tổng.

**Bài 3**: Sóng âm 880 Hz (nốt La cao 1 quãng tám). Bước sóng trong không khí ($v = 340$ m/s)?

**Bài 4**: Phasor của dao động $2\\cos\\left(\\omega t + \\dfrac{\\pi}{4}\\right)$?

**Bài 5**: Khai triển Fourier của $f(x) = x$ trên $[-\\pi, \\pi]$?

### Lời giải

**Bài 1**: $A = 5$, $T = \\dfrac{2\\pi}{2\\pi} = 1$s, $f = 1$ Hz.

**Bài 2**: Phasor: $Z_1 = 3$, $Z_2 = 4i$. $Z = 3 + 4i$. $|Z| = \\sqrt{9+16} =$ **$5$**. Biên độ tổng $= 5$.

**Bài 3**: $\\lambda = \\dfrac{v}{f} = \\dfrac{340}{880} \\approx$ **$0.386$ m** (cao gấp đôi nốt La 440 → bước sóng giảm đôi).

**Bài 4**: $Z =$ **$2e^{i\\pi/4} = \\sqrt{2} + i\\sqrt{2}$**.

**Bài 5**: f lẻ → $a_n = 0$. $b_n = \\dfrac{1}{\\pi}\\displaystyle\\int_{-\\pi}^{\\pi} x\\sin(nx)\\,dx = \\dfrac{2(-1)^{n+1}}{n}$.  
→ $x = 2\\left[\\sin x - \\dfrac{\\sin 2x}{2} + \\dfrac{\\sin 3x}{3} - \\ldots\\right]$.

---

## 6. 🎉 HOÀN THÀNH TIER 3 — TRIG & COMPLEX (8/8)!

Tiếp theo: **Tier 4 — Calculus 1-var** (giới hạn, đạo hàm, tích phân).

## 📝 Tổng kết Tier 3

1. **Radian** = ngôn ngữ chuẩn. $180^\\circ = \\pi$ rad.
2. **sin, cos, tan** qua đường tròn lượng giác.
3. **Đồng nhất thức**: cộng, nhân đôi, hạ bậc, tích↔tổng.
4. **PT lượng giác**: vô số nghiệm, $x = \\alpha + k\\cdot 2\\pi$.
5. **Số phức**: $i^2 = -1$, $\\mathbb{C}$ đóng cho mọi PT đa thức.
6. **Euler**: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$. Đẹp nhất: $e^{i\\pi} + 1 = 0$.
7. **De Moivre**: lũy thừa & căn → đa giác đều.
8. **Ứng dụng**: dao động, sóng, phasor, Fourier (preview).

🎉 Đây là **nền tảng vào Calculus**. Tier 4 sẽ dùng radian + lượng giác liên tục.
`;
