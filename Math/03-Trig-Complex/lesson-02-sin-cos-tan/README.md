# Lesson 02 — sin, cos, tan

## Mục tiêu

- Định nghĩa **sin, cos, tan** qua đường tròn lượng giác (không chỉ trong tam giác vuông).
- Đồ thị 3 hàm — chu kỳ, biên độ, pha.
- Bảng giá trị các góc đặc biệt: $0, 30, 45, 60, 90^\circ$...
- Hiểu **biến đổi $A\cdot\sin(\omega\cdot x + \varphi)$** — sóng, dao động, sóng điện xoay chiều.

## Kiến thức tiền đề

- [Lesson 01 — Góc & radian](../lesson-01-angles-radians/).

---

## 1. Định nghĩa (qua đường tròn lượng giác)

💡 **Vì sao dùng đường tròn, không tam giác?** Trong tam giác vuông, góc chỉ có thể từ $0^\circ$ đến $90^\circ$. Nhưng ta cần sin/cos cho mọi góc (kể cả $270^\circ$, $-50^\circ$). Đường tròn lượng giác giải quyết: lấy điểm trên đường tròn r=1, ứng với góc $\theta$.

Cho điểm M trên đường tròn đơn vị, ứng với góc $\theta$:
- **$\cos\theta$** = hoành độ của M.
- **$\sin\theta$** = tung độ của M.
- **$\tan\theta$** $= \frac{\sin\theta}{\cos\theta}$ (khi $\cos\theta \neq 0$).

⟶ Sin, cos định nghĩa cho **mọi $\theta \in \mathbb{R}$**.

> 📐 **Định nghĩa đầy đủ — sin, cos**
>
> **(a) Là gì**: $\sin\theta$ và $\cos\theta$ là **toạ độ** của 1 điểm M trên đường tròn bán kính 1, sau khi quay từ trục x dương 1 góc $\theta$ ngược chiều kim đồng hồ. $\cos\theta$ = hoành độ, $\sin\theta$ = tung độ. $\tan\theta$ = sin/cos (slope của OM).
>
> **(b) Vì sao cần**: Định nghĩa qua tam giác vuông chỉ hợp lệ cho $0 < \theta < 90^\circ$. Đường tròn lượng giác mở rộng cho **mọi $\theta \in \mathbb{R}$** (kể cả âm, lớn hơn $360^\circ$). Quan trọng hơn — định nghĩa này làm cho sin/cos **tuần hoàn** chu kỳ $2\pi$ một cách tự nhiên (đi quanh đường tròn 1 vòng), và giải thích vì sao $\sin^2 + \cos^2 = 1$ (vì điểm trên đường tròn r=1 thoả $x^2 + y^2 = 1$).
>
> **(c) Ví dụ số**: $\theta = 0$: $M = (1, 0)$ → $\cos 0 = 1$, $\sin 0 = 0$. $\theta = \frac{\pi}{2}$: $M = (0, 1)$ → $\cos\frac{\pi}{2} = 0$, $\sin\frac{\pi}{2} = 1$. $\theta = \pi$: $M = (-1, 0)$. $\theta = \frac{\pi}{4}$ ($45^\circ$): $M = (\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$. $\theta = \frac{2\pi}{3}$ ($120^\circ$): $M = (-\frac{1}{2}, \frac{\sqrt{3}}{2})$. Verify: $\cos^2 + \sin^2 = (-\frac{1}{2})^2 + (\frac{\sqrt{3}}{2})^2 = \frac{1}{4} + \frac{3}{4} = $ **1** ✓.

⚠ **Lỗi thường gặp — viết $\tan\frac{\pi}{2} = \infty$ như một số**. Tại $\theta = \frac{\pi}{2}$ thì cos = 0 → $\tan = \frac{\sin}{\cos} = \frac{1}{0}$ **không xác định** (undefined), không phải bằng vô cực như một con số. Khi giải toán phải loại $\theta = \frac{\pi}{2} + k\pi$ khỏi miền của tan.

❓ **Câu hỏi tự nhiên của người đọc**

- *"sin và cos có thể lớn hơn 1 không?"* **Không**. Vì là toạ độ điểm trên đường tròn bán kính 1, luôn $-1 \le \sin\theta \le 1$ và $-1 \le \cos\theta \le 1$. Nếu tính ra $\sin x = 1.2$ thì chắc chắn sai ở đâu đó. Riêng **tan** thì không bị chặn (chạy khắp $\mathbb{R}$).
- *"Định nghĩa tam giác vuông và định nghĩa đường tròn có mâu thuẫn không?"* Không — chúng **trùng nhau** trong khoảng $0 < \theta < \frac{\pi}{2}$ (xem mục 5). Đường tròn chỉ **mở rộng** ra mọi góc, không thay thế.

🔁 **Dừng lại tự kiểm tra**

1. Tại $\theta = \frac{3\pi}{2}$, điểm M ở đâu? cos và sin bằng mấy?
2. Có góc nào mà $\sin\theta = \cos\theta = 0.8$ cùng lúc không?

<details><summary>Đáp án</summary>

1. $\theta = \frac{3\pi}{2}$ → điểm $(0, -1)$ (dưới cùng). $\cos\frac{3\pi}{2} = 0$, $\sin\frac{3\pi}{2} = -1$.
2. Không. Nếu cả hai bằng 0.8 thì $\cos^2 + \sin^2 = 0.64 + 0.64 = 1.28 \neq 1$, vi phạm hệ thức Pythagore.

</details>

### 📝 Tóm tắt mục 1

- $\cos\theta$ = hoành độ, $\sin\theta$ = tung độ điểm M trên đường tròn đơn vị; $\tan\theta$ = sin/cos.
- Định nghĩa này dùng được cho **mọi $\theta \in \mathbb{R}$** (vượt 0–90°), khác định nghĩa tam giác vuông.
- Luôn $|\sin|, |\cos| \le 1$; tan không xác định khi cos = 0.

---

## 2. Bảng giá trị đặc biệt

| θ | $0$ | $\frac{\pi}{6}$ ($30^\circ$) | $\frac{\pi}{4}$ ($45^\circ$) | $\frac{\pi}{3}$ ($60^\circ$) | $\frac{\pi}{2}$ ($90^\circ$) | $\pi$ ($180^\circ$) | $\frac{3\pi}{2}$ ($270^\circ$) | $2\pi$ ($360^\circ$) |
|---|---|---|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\frac{1}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{3}}{2}$ | $1$ | $0$ | $-1$ | $0$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{2}}{2}$ | $\frac{1}{2}$ | $0$ | $-1$ | $0$ | $1$ |
| $\tan\theta$ | $0$ | $\frac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | $\infty$ | $0$ | $\infty$ | $0$ |

💡 **Mẹo nhớ "bàn tay"**: sin của $0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$ $= \frac{\sqrt{0}}{2}, \frac{\sqrt{1}}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}, \frac{\sqrt{4}}{2}$. Cos thì đảo ngược thứ tự.

**Verify mẹo "bàn tay" bằng số**: $\frac{\sqrt{0}}{2} = 0$ ($\sin 0^\circ$), $\frac{\sqrt{1}}{2} = \frac{1}{2}$ ($\sin 30^\circ$), $\frac{\sqrt{2}}{2} \approx 0.707$ ($\sin 45^\circ$), $\frac{\sqrt{3}}{2} \approx 0.866$ ($\sin 60^\circ$), $\frac{\sqrt{4}}{2} = \frac{2}{2} = 1$ ($\sin 90^\circ$). Tăng dần 0 → 1, khớp trực giác "góc lớn dần thì điểm leo cao dần".

⚠ **Lỗi thường gặp — nhớ lẫn $\frac{\sqrt{3}}{2}$ với $\frac{\sqrt{2}}{2}$, hoặc gán nhầm cho 30°/60°**. Quy luật: sin **tăng** theo góc ($\sin 30^\circ = \frac{1}{2} < \sin 60^\circ = \frac{\sqrt{3}}{2}$), cos **giảm** theo góc ($\cos 30^\circ = \frac{\sqrt{3}}{2} > \cos 60^\circ = \frac{1}{2}$). Phản ví dụ sai hay gặp: viết $\sin 60^\circ = \frac{1}{2}$ — sai, đó là $\sin 30^\circ$. Kiểm nhanh: 60° gần 90° nên sin phải gần 1 → chọn $\frac{\sqrt{3}}{2}$ ($\approx 0.87$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\sin 30^\circ = \cos 60^\circ$ và $\sin 60^\circ = \cos 30^\circ$?"* Vì 30° và 60° là hai góc **phụ nhau** (cộng lại 90°), mà $\sin\theta = \cos(90^\circ - \theta)$. Đây cũng là gốc chữ "co" trong cosine = "complement" (phụ).
- *"Phải học thuộc cả bảng không?"* Nên thuộc cột 30°, 45°, 60° (ba góc lõi); các góc 120°, 135°... suy ra bằng quy tắc dấu + góc bù (mục 6).

🔁 **Dừng lại tự kiểm tra**

1. $\cos 45^\circ$ bằng mấy? So với $\cos 30^\circ$ lớn hơn hay nhỏ hơn?
2. $\tan 60^\circ$ bằng mấy? (gợi ý: sin/cos)

<details><summary>Đáp án</summary>

1. $\cos 45^\circ = \frac{\sqrt{2}}{2} \approx 0.707$, nhỏ hơn $\cos 30^\circ = \frac{\sqrt{3}}{2} \approx 0.866$ (cos giảm khi góc tăng).
2. $\tan 60^\circ = \frac{\sin 60^\circ}{\cos 60^\circ} = \frac{\sqrt{3}/2}{1/2} = \sqrt{3} \approx 1.732$.

</details>

### 📝 Tóm tắt mục 2

- Ba góc lõi 30°/45°/60° cho $\sin = \frac{1}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}$ (và cos đảo ngược).
- sin tăng, cos giảm khi góc tăng trong [0°, 90°]; góc phụ → sin = cos đối.
- Mẹo "bàn tay" $\frac{\sqrt{n}}{2}$ (n = 0,1,2,3,4) verify được bằng số.

---

## 3. Đồ thị 3 hàm

💡 **Trực giác / Hình dung**: tưởng tượng một điểm chạy quanh đường tròn đơn vị với tốc độ đều. **Bóng của nó chiếu lên trục tung** vẽ ra đồ thị sin (lên–xuống theo hình sóng); **bóng chiếu lên trục hoành** vẽ ra cos. Vì điểm quay vòng lặp lại, hai bóng cũng lặp lại → đồ thị là sóng tuần hoàn. cos chỉ là sin "đi trước" một phần tư vòng.

### 3.1. y = sin x

- **D** $= \mathbb{R}$, **E** $= [-1, 1]$.
- **Chu kỳ**: $2\pi$. $\sin(x + 2\pi) = \sin x$.
- **Lẻ**: $\sin(-x) = -\sin x$. Đồ thị đối xứng qua O.
- Đi qua $O(0, 0)$, cực đại tại $\frac{\pi}{2}$ ($= 1$), cực tiểu tại $\frac{3\pi}{2}$ ($= -1$).

### 3.2. y = cos x

- **D** $= \mathbb{R}$, **E** $= [-1, 1]$.
- **Chu kỳ**: $2\pi$.
- **Chẵn**: $\cos(-x) = \cos x$. Đối xứng qua trục Oy.
- Đi qua $(0, 1)$, cực đại tại $x = 0$, cực tiểu tại $\pi$.
- **Liên hệ với sin**: $\cos x = \sin(x + \frac{\pi}{2})$. Cos sớm pha hơn sin $\frac{\pi}{2}$.

### 3.3. y = tan x

- **D** $= \mathbb{R} \setminus \{\frac{\pi}{2} + k\pi\}$, **E** $= \mathbb{R}$.
- **Chu kỳ**: $\pi$ (ngắn hơn sin/cos!).
- **Lẻ**: $\tan(-x) = -\tan x$.
- **Tiệm cận đứng** tại $x = \frac{\pi}{2} + k\pi$ (nơi cos = 0).

❓ **Vì sao tan chu kỳ $\pi$ chứ không $2\pi$?** Vì tan = sin/cos. Khi x tăng $\pi$, cả sin và cos đổi dấu cùng lúc → tỉ số không đổi.

**Verify chu kỳ tan $= \pi$ bằng số**: $\tan(\frac{\pi}{4}) = 1$. Cộng $\pi$: $\tan(\frac{\pi}{4} + \pi) = \tan(\frac{5\pi}{4})$. Tại $\frac{5\pi}{4}$ (phần tư III), $\sin = -\frac{\sqrt{2}}{2}$, $\cos = -\frac{\sqrt{2}}{2}$ → $\tan = \frac{-\sqrt{2}/2}{-\sqrt{2}/2} = 1$ ✓ — bằng đúng $\tan(\frac{\pi}{4})$, đúng là tuần hoàn chu kỳ $\pi$.

⚠ **Lỗi thường gặp — nhầm tính chẵn/lẻ giữa sin và cos**. cos là hàm **chẵn** ($\cos(-x) = \cos x$), sin là hàm **lẻ** ($\sin(-x) = -\sin x$). Phản ví dụ: viết $\cos(-\frac{\pi}{3}) = -\cos(\frac{\pi}{3}) = -\frac{1}{2}$ là **sai**; đúng là $\cos(-\frac{\pi}{3}) = \cos(\frac{\pi}{3}) = +\frac{1}{2}$ (cos không đổi dấu khi đảo góc). Còn $\sin(-\frac{\pi}{3}) = -\sin(\frac{\pi}{3}) = -\frac{\sqrt{3}}{2}$ mới đúng.

🔁 **Dừng lại tự kiểm tra**

1. Đồ thị $y = \cos x$ đạt cực đại ($= 1$) tại những x nào?
2. Hàm tan có tiệm cận đứng tại đâu trong khoảng $(0, 2\pi)$?

<details><summary>Đáp án</summary>

1. Tại $x = k\cdot 2\pi$ ($0, 2\pi, 4\pi, -2\pi, \ldots$) — nơi điểm ở mép phải đường tròn $(1, 0)$.
2. Tại $x = \frac{\pi}{2}$ và $x = \frac{3\pi}{2}$ (những chỗ $\cos x = 0$).

</details>

### 📝 Tóm tắt mục 3

- sin & cos: miền $\mathbb{R}$, giá trị $[-1, 1]$, chu kỳ $2\pi$; tan chu kỳ $\pi$, giá trị toàn $\mathbb{R}$.
- cos chẵn (đối xứng Oy), sin & tan lẻ (đối xứng O); $\cos x = \sin(x + \frac{\pi}{2})$.
- tan có tiệm cận đứng tại $x = \frac{\pi}{2} + k\pi$ (chỗ cos = 0).

---

## 4. Biến đổi A·sin(ω·x + φ) — Mô hình sóng

💡 **Trực giác / Hình dung**: bốn tham số là 4 "nút chỉnh" trên sóng sin gốc. **A** kéo sóng cao/thấp (vặn âm lượng). **$\omega$** ép sóng chặt/giãn theo chiều ngang (vặn tần số — nốt cao/thấp). **$\varphi$** trượt sóng sang trái/phải (chỉnh thời điểm bắt đầu). **k** nâng/hạ cả sóng lên xuống (dịch mức nền). Hiểu 4 nút này là hiểu mọi tín hiệu hình sin.

$$y = A\cdot\sin(\omega\cdot x + \varphi) + k$$

- **A** = biên độ (amplitude). Giá trị max-min của $y = 2A$.
- **$\omega$** = tần số góc (angular frequency). Càng lớn càng "co lại". Chu kỳ $T = \frac{2\pi}{\omega}$.
- **$\varphi$** = pha ban đầu. Dịch đồ thị sang trái $\frac{\varphi}{\omega}$ đơn vị.
- **k** = dịch dọc.

**Ví dụ**: $y = 3\cdot\sin(2x + \frac{\pi}{4})$.
- $A = 3$ → dao động từ -3 đến 3.
- $\omega = 2$ → chu kỳ $T = \pi$ (đồ thị "nén" lại).
- $\varphi = \frac{\pi}{4}$ → dịch sang trái $\frac{\pi}{8}$.

💡 **Ứng dụng thực tế**:
- **Sóng âm**: tai nghe được 20 Hz – 20 kHz, biểu diễn bằng tổng các sin với $\omega$, $\varphi$ khác nhau.
- **Điện xoay chiều**: $U = U_0\cdot\sin(\omega t)$. VN dùng 50 Hz → $\omega = 100\pi$ rad/s.
- **Dao động điều hòa**: con lắc, lò xo (Physics).
- **Tín hiệu**: Fourier — mọi hàm tuần hoàn = tổng sin/cos.

⚠ **Lỗi thường gặp — tính chu kỳ là $T = \frac{\omega}{2\pi}$ (lộn ngược)**. Đúng là $T = \frac{2\pi}{\omega}$. $\omega$ càng lớn → sóng càng "nén" → chu kỳ càng **ngắn**. Phản ví dụ: $y = \sin(2x)$ có $\omega = 2$ → $T = \frac{2\pi}{2} = \pi$ (ngắn hơn sin x); nếu tính nhầm $T = \frac{2}{2\pi} = \frac{1}{\pi} \approx 0.318$ thì vô lý (không khớp đồ thị thực).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\varphi$ dịch sang trái hay phải, và bao nhiêu?"* Viết lại $A\cdot\sin(\omega(x + \frac{\varphi}{\omega}))$ → dịch **sang trái** $\frac{\varphi}{\omega}$ đơn vị (khi $\varphi > 0$). Vd $\sin(2x + \frac{\pi}{4})$ dịch trái $\frac{\pi/4}{2} = \frac{\pi}{8}$.
- *"A âm thì sao?"* $A = -3$ thì biên độ vẫn là $|A| = 3$, nhưng sóng bị **lật ngược** (đỉnh thành đáy). Tương đương thêm pha $\pi$.

🔁 **Dừng lại tự kiểm tra**

1. $y = 4\cdot\sin(\pi x)$ có biên độ và chu kỳ bao nhiêu?
2. Giá trị lớn nhất và nhỏ nhất của $y = 2\cdot\sin(x) + 5$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. Biên độ $A = 4$; $\omega = \pi$ → $T = \frac{2\pi}{\pi} = 2$.
2. $\sin$ chạy trong $[-1, 1]$ → $y$ chạy từ $2\cdot(-1)+5 = 3$ đến $2\cdot 1+5 = 7$. Max = 7, min = 3.

</details>

### 📝 Tóm tắt mục 4

- $y = A\cdot\sin(\omega x + \varphi) + k$: A = biên độ, $\omega$ = tần số góc, $\varphi$ = pha, k = dịch dọc.
- Chu kỳ $T = \frac{2\pi}{\omega}$ ($\omega$ lớn → T ngắn); dịch ngang $\frac{\varphi}{\omega}$ ($\varphi>0$ → trái).
- Là mô hình của sóng âm, điện AC, dao động điều hòa, Fourier.

---

## 5. Quan hệ tam giác vuông (vẫn đúng)

💡 **Trực giác / Hình dung**: định nghĩa tam giác vuông là **trường hợp riêng** của định nghĩa đường tròn. Đặt huyền = bán kính 1, thì cạnh kề = hoành độ (cos), cạnh đối = tung độ (sin). Tam giác chỉ "phóng to/thu nhỏ" tam giác trong đường tròn đơn vị, nên tỉ số cạnh không đổi → cùng giá trị sin/cos.

Khi $0 < \theta < \frac{\pi}{2}$:
```
       │╲
       │ ╲ c (huyền)
   a   │  ╲
       │   ╲ θ
       └────╲
          b
```
- $\sin\theta = \frac{a}{c}$ (đối/huyền).
- $\cos\theta = \frac{b}{c}$ (kề/huyền).
- $\tan\theta = \frac{a}{b}$ (đối/kề).

⟶ **Trùng với định nghĩa qua đường tròn** (vì điểm trên đường tròn đơn vị tạo tam giác vuông).

**Verify trùng khớp bằng số**: tam giác 3-4-5 (a=3 đối, b=4 kề, c=5 huyền). $\sin\theta = \frac{3}{5} = 0.6$, $\cos\theta = \frac{4}{5} = 0.8$. Kiểm Pythagore lượng giác: $0.6^2 + 0.8^2 = 0.36 + 0.64 = 1$ ✓ — đúng như điểm trên đường tròn đơn vị.

⚠ **Lỗi thường gặp — đảo "đối/kề" của sin và cos**. $\sin = $ đối/huyền (SOH), $\cos = $ kề/huyền (CAH), $\tan = $ đối/kề (TOA). Phản ví dụ: trong tam giác 3-4-5 với $\theta$ kề cạnh 4, nếu viết $\cos\theta = \frac{3}{5}$ là sai (3 là cạnh **đối**, không phải kề) → đúng là $\cos\theta = \frac{4}{5}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Định nghĩa này dùng được cho góc tù (>90°) không?"* Không — tam giác vuông không có góc >90°. Với góc tù phải quay lại định nghĩa đường tròn. Đó chính là lý do ta cần đường tròn.
- *"SOH-CAH-TOA là gì?"* Mẹo nhớ tiếng Anh: **S**in = **O**pposite/**H**ypotenuse, **C**os = **A**djacent/**H**ypotenuse, **T**an = **O**pposite/**A**djacent.

🔁 **Dừng lại tự kiểm tra**

1. Tam giác vuông có cạnh đối $\theta = 5$, huyền = 13. $\sin\theta$, $\cos\theta$?
2. $\tan\theta$ trong tam giác đó?

<details><summary>Đáp án</summary>

1. $\sin\theta = \frac{5}{13}$. Cạnh kề $= \sqrt{13^2 - 5^2} = \sqrt{144} = 12$ → $\cos\theta = \frac{12}{13}$.
2. $\tan\theta = $ đối/kề $= \frac{5}{12}$.

</details>

### 📝 Tóm tắt mục 5

- SOH-CAH-TOA: sin = đối/huyền, cos = kề/huyền, tan = đối/kề.
- Chỉ dùng cho $0 < \theta < \frac{\pi}{2}$; là trường hợp riêng của định nghĩa đường tròn.
- Khớp Pythagore lượng giác (vd tam giác 3-4-5: $0.6^2+0.8^2=1$).

---

## 6. Quy luật dấu trên 4 góc phần tư

| Phần tư | I (0-90°) | II (90-180°) | III (180-270°) | IV (270-360°) |
|---------|-----------|---------------|----------------|---------------|
| sin | + | + | − | − |
| cos | + | − | − | + |
| tan | + | − | + | − |

💡 **Mẹo "ASTC"**: All – Sin – Tan – Cos (góc phần tư nào hàm nào DƯƠNG). All Students Take Calculus.

**Verify quy luật dấu bằng số (mỗi phần tư 1 góc)**:
- Phần tư I, 30°: $\sin = \frac{1}{2}$ (+), $\cos = \frac{\sqrt{3}}{2}$ (+), $\tan = \frac{\sqrt{3}}{3}$ (+) → **All** dương ✓.
- Phần tư II, 120°: $\sin = \frac{\sqrt{3}}{2}$ (+), $\cos = -\frac{1}{2}$ (−), $\tan = -\sqrt{3}$ (−) → chỉ **Sin** dương ✓.
- Phần tư III, 210°: $\sin = -\frac{1}{2}$ (−), $\cos = -\frac{\sqrt{3}}{2}$ (−), $\tan = \frac{\sqrt{3}}{3}$ (+) → chỉ **Tan** dương ✓.
- Phần tư IV, 300°: $\sin = -\frac{\sqrt{3}}{2}$ (−), $\cos = \frac{1}{2}$ (+), $\tan = -\sqrt{3}$ (−) → chỉ **Cos** dương ✓.

⚠ **Lỗi thường gặp — gán nhầm dấu khi giải $\sin x = a$ ra hai góc**. Một giá trị sin (vd $\frac{1}{2}$) ứng với **hai góc** ở hai phần tư khác nhau (30° ở I và 150° ở II), khác nhau ở dấu của cos. Nếu bài cho thêm điều kiện "góc phần tư III" thì cả sin lẫn cos đều âm — phải chọn đúng dấu, đừng mặc định dương.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Biết $\sin x = 0.6$ và x ở phần tư II thì $\cos x$ dấu gì?"* Phần tư II → cos **âm**. $\cos x = -\sqrt{1-0.36} = -0.8$.
- *"Vì sao tan dương ở cả phần tư I và III?"* Vì tan = sin/cos. Ở I cả hai dương → dương; ở III cả hai âm → âm/âm = dương. Cùng dấu thì thương dương.

🔁 **Dừng lại tự kiểm tra**

1. Góc 200° nằm ở phần tư nào? Dấu của sin, cos, tan?
2. $\cos x > 0$ và $\sin x < 0$ thì x ở phần tư nào?

<details><summary>Đáp án</summary>

1. $200^\circ \in (180^\circ, 270^\circ)$ → phần tư **III**: sin −, cos −, tan +.
2. cos + (phải I hoặc IV), sin − (phải III hoặc IV) → giao là phần tư **IV**.

</details>

### 📝 Tóm tắt mục 6

- ASTC: phần tư I tất cả dương, II chỉ sin+, III chỉ tan+, IV chỉ cos+.
- tan dương ở I & III (sin, cos cùng dấu), âm ở II & IV.
- Khi giải PT lượng giác, dùng dấu để chọn đúng nghiệm trong phần tư yêu cầu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính $\sin(\frac{2\pi}{3})$, $\cos(\frac{2\pi}{3})$, $\tan(\frac{2\pi}{3})$.

**Bài 2**: Đồ thị $y = 2\cdot\sin(3x)$. Biên độ và chu kỳ?

**Bài 3**: $y = \sin x + \cos x$. Biên độ là bao nhiêu? (Gợi ý: dùng công thức $A\cdot\sin(x+\varphi)$.)

**Bài 4**: $\cos x = -\frac{1}{2}$. Tìm x trong $[0, 2\pi]$.

**Bài 5**: Trong góc phần tư III, $\sin x = -\frac{3}{5}$. Tính $\cos x$, $\tan x$.

### Lời giải

**Bài 1**: $\frac{2\pi}{3} = 120^\circ$.  
- $\sin(120^\circ) = \sin(180-60) = \sin 60^\circ = $ **$\frac{\sqrt{3}}{2}$**.  
- $\cos(120^\circ) = -\cos 60^\circ = $ **$-\frac{1}{2}$**.  
- $\tan = \frac{\sin}{\cos} = $ **$-\sqrt{3}$**.

**Bài 2**: $A = 2$, $T = \frac{2\pi}{3}$.

**Bài 3**: $\sin x + \cos x = \sqrt{2}\cdot\sin(x + \frac{\pi}{4})$. Biên độ $= $ **$\sqrt{2}$**.

**Bài 4**: $\cos x = -\frac{1}{2}$ → $x = \frac{2\pi}{3}$ hoặc $x = \frac{4\pi}{3}$.

**Bài 5**: $\sin^2 + \cos^2 = 1$ → $\cos^2 = 1 - \frac{9}{25} = \frac{16}{25}$ → $\cos = \pm\frac{4}{5}$. Phần tư III: $\cos < 0$ → $\cos = $ **$-\frac{4}{5}$**. $\tan = \frac{\sin}{\cos} = \frac{-3/5}{-4/5} = $ **$\frac{3}{4}$**.

---

## 8. Bài tiếp theo

[Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/) — công thức cộng, nhân đôi, hạ bậc.

## 📝 Tổng kết

1. **sin, cos, tan** định nghĩa qua đường tròn lượng giác, áp dụng mọi $\theta \in \mathbb{R}$.
2. **Chu kỳ**: sin & cos $= 2\pi$, tan $= \pi$.
3. **Bảng giá trị**: $0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}$ — nhớ thuộc lòng.
4. **$A\cdot\sin(\omega\cdot x + \varphi)$**: mô hình sóng. A = biên độ, $\omega$ = tần số, $\varphi$ = pha.
5. **ASTC**: dấu sin/cos/tan trên 4 góc phần tư.
