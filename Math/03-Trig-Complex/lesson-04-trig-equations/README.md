# Lesson 04 — Phương trình lượng giác

## Mục tiêu

- Giải **PT cơ bản**: $\sin x = a$, $\cos x = a$, $\tan x = a$.
- Áp dụng được nghiệm tổng quát (vô số nghiệm).
- Giải PT bậc 2 theo $\sin x$ / $\cos x$.
- Đưa **$a\cdot\sin x + b\cdot\cos x = c$** về PT cơ bản.

## Kiến thức tiền đề

- [Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/).

---

## 1. Phương trình cơ bản sin x = a

💡 **Đặc thù của PT lượng giác**: Vì sin/cos tuần hoàn, một PT có **vô số nghiệm** — phải viết ở dạng tổng quát.

$$\sin x = a \quad (|a| \le 1)$$

**Nghiệm tổng quát**: Nếu $\sin\alpha = a$ thì:

$$x = \alpha + k\cdot 2\pi \quad \text{hoặc} \quad x = \pi - \alpha + k\cdot 2\pi \quad (k \in \mathbb{Z})$$

💡 **Vì sao 2 họ nghiệm?** Trên đường tròn đơn vị, có 2 điểm có cùng tung độ a: 1 ở phần tư I/II và 1 ở phần tư III/IV (đối xứng qua trục Oy → góc $\pi - \alpha$).

**Ví dụ số**: $\sin x = \frac{1}{2}$.
- $\alpha = \frac{\pi}{6}$ (vì $\sin\frac{\pi}{6} = \frac{1}{2}$).
- $x = \frac{\pi}{6} + k\cdot 2\pi$, hoặc $x = \pi - \frac{\pi}{6} + k\cdot 2\pi = \frac{5\pi}{6} + k\cdot 2\pi$.

⚠ **Điều kiện**: $|a| > 1$ → **vô nghiệm**.

> 📐 **Định nghĩa đầy đủ — Nghiệm tổng quát PT sin x = a**
>
> **(a) Là gì**: 1 PT lượng giác có **vô số nghiệm** do tính tuần hoàn. Nghiệm "tổng quát" = toàn bộ tập nghiệm, viết bằng 1 (hoặc 2) công thức kèm số nguyên $k \in \mathbb{Z}$ chạy tự do. Hai họ vì có 2 điểm trên đường tròn cùng tung độ (đối xứng qua trục Oy).
>
> **(b) Vì sao cần**: PT đại số $x^2 = 4$ có hữu hạn nghiệm. PT lượng giác KHÔNG — sin tuần hoàn nên nghiệm xuất hiện vô hạn lần. Phải có ký hiệu nén tất cả: "$x = \alpha + k\cdot 2\pi$, $k \in \mathbb{Z}$". Trong vật lý: thời điểm dao động đạt giá trị x cụ thể xảy ra lặp đi lặp lại — cần biết tất cả các thời điểm, không chỉ 1.
>
> **(c) Ví dụ số**: $\sin x = \frac{1}{2}$ → $\alpha = \frac{\pi}{6}$. Nghiệm: $\frac{\pi}{6}, \frac{5\pi}{6}, \frac{\pi}{6}+2\pi, \frac{5\pi}{6}+2\pi, \frac{\pi}{6}-2\pi, \ldots$ Vô hạn. $\sin x = \frac{\sqrt{2}}{2}$ → $\alpha = \frac{\pi}{4}$ → $x = \frac{\pi}{4} + k\cdot 2\pi$ hoặc $\frac{3\pi}{4} + k\cdot 2\pi$. $\sin x = 1$ → $\alpha = \frac{\pi}{2}$, 2 họ trùng nhau (vì sin x đạt max chỉ tại 1 điểm/chu kỳ) → $x = \frac{\pi}{2} + k\cdot 2\pi$. $\sin x = 2$ → $|a|>1$ → **vô nghiệm**.

⚠ **Lỗi thường gặp — chỉ lấy 1 họ nghiệm, quên họ $\pi - \alpha$**. $\sin x = a$ (với $0 < |a| < 1$) có **hai** họ. Phản ví dụ: giải $\sin x = \frac{1}{2}$ mà chỉ ghi $x = \frac{\pi}{6} + k2\pi$ là **mất một nửa nghiệm** — góc $\frac{5\pi}{6}$ cũng có $\sin = \frac{1}{2}$ nhưng bị bỏ. Luôn nhớ họ thứ hai $x = \pi - \alpha + k2\pi$.

⚠ **Lỗi thường gặp 2 — quên $+k\cdot 2\pi$**. Viết $x = \frac{\pi}{6}$ (thiếu $+k2\pi$) là chỉ nêu 1 nghiệm trong vô hạn nghiệm. PT lượng giác phải ghi nghiệm tổng quát.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào hai họ nghiệm trùng làm một?"* Khi $a = \pm 1$. Vd $\sin x = 1$: $\alpha = \frac{\pi}{2}$ và $\pi - \frac{\pi}{2} = \frac{\pi}{2}$ — trùng → chỉ 1 họ $x = \frac{\pi}{2} + k2\pi$.
- *"Đề chỉ hỏi nghiệm trong $[0, 2\pi)$ thì sao?"* Vẫn tìm nghiệm tổng quát rồi cho k = 0, 1, ... lấy ra các nghiệm rơi trong khoảng. Vd $\sin x = \frac{1}{2}$ trên $[0, 2\pi)$ → $\{\frac{\pi}{6}, \frac{5\pi}{6}\}$.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\sin x = -\frac{1}{2}$ (nghiệm tổng quát).
2. $\sin x = 1.5$ có nghiệm không?

<details><summary>Đáp án</summary>

1. $\alpha = -\frac{\pi}{6}$ (vì $\sin(-\frac{\pi}{6}) = -\frac{1}{2}$). $x = -\frac{\pi}{6} + k2\pi$ hoặc $x = \pi - (-\frac{\pi}{6}) + k2\pi = \frac{7\pi}{6} + k2\pi$.
2. **Không** — vì $|1.5| > 1$ mà $\sin$ chỉ nhận giá trị trong $[-1, 1]$.

</details>

### 📝 Tóm tắt mục 1

- $\sin x = a$ cần $|a| \le 1$; nghiệm: $x = \alpha + k2\pi$ HOẶC $x = \pi - \alpha + k2\pi$.
- Luôn hai họ (trừ khi $a = \pm 1$ thì gộp một); đừng quên $+k2\pi$.
- $|a| > 1$ → vô nghiệm.

---

## 2. Phương trình cơ bản cos x = a

💡 **Trực giác / Hình dung**: cắt đường tròn đơn vị bằng một **đường thẳng đứng** $x = a$ (vì cos = hoành độ). Đường này cắt đường tròn ở hai điểm **đối xứng qua trục hoành** — một ở trên, một ở dưới, góc $+\alpha$ và $-\alpha$. Vì thế nghiệm gọn lại thành $\pm\alpha + k2\pi$ (một họ với dấu ±), khác sin (hai họ riêng).

$$\cos x = a \quad (|a| \le 1)$$

**Nghiệm tổng quát**: Nếu $\cos\alpha = a$ thì:

$$x = \pm\alpha + k\cdot 2\pi \quad (k \in \mathbb{Z})$$

**Ví dụ**: $\cos x = -\frac{\sqrt{2}}{2}$.
- $\alpha = \frac{3\pi}{4}$ ($\cos\frac{3\pi}{4} = -\frac{\sqrt{2}}{2}$).
- $x = \pm\frac{3\pi}{4} + k\cdot 2\pi$.

**4 ví dụ số đa dạng**:
- $\cos x = \frac{1}{2}$ → $\alpha = \frac{\pi}{3}$ → $x = \pm\frac{\pi}{3} + k2\pi$.
- $\cos x = 0$ → $\alpha = \frac{\pi}{2}$ → $x = \pm\frac{\pi}{2} + k2\pi$ ($= \frac{\pi}{2} + k\pi$).
- $\cos x = -1$ → $\alpha = \pi$ → $x = \pm\pi + k2\pi = \pi + k2\pi$ (hai dấu trùng).
- $\cos x = 2$ → $|a|>1$ → **vô nghiệm**.

⚠ **Lỗi thường gặp — viết $\cos x = a$ thành hai họ kiểu $\alpha$ và $\pi - \alpha$ như sin**. Cos dùng $\pm\alpha$, KHÔNG phải $\pi - \alpha$. Phản ví dụ: $\cos x = \frac{1}{2}$ có nghiệm $\frac{\pi}{3}$ và $-\frac{\pi}{3}$ ($\equiv \frac{5\pi}{3}$), KHÔNG phải $\frac{\pi}{3}$ và $\frac{2\pi}{3}$ (vì $\cos(\frac{2\pi}{3}) = -\frac{1}{2} \neq \frac{1}{2}$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao cos dùng $\pm\alpha$ còn sin dùng $\alpha, \pi-\alpha$?"* Vì cos đối xứng qua trục hoành (Ox), nên hai nghiệm là $+\alpha, -\alpha$. sin đối xứng qua trục tung (Oy), nên hai nghiệm là $\alpha, \pi-\alpha$. Khác trục đối xứng.
- *"$-\alpha + k2\pi$ có khác $(2\pi - \alpha) + k2\pi$ không?"* Không khác về tập nghiệm — chỉ là chọn đại diện k khác. $-\frac{\pi}{3}$ và $\frac{5\pi}{3}$ là cùng vị trí.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\cos x = \frac{\sqrt{3}}{2}$.
2. $\cos x = -\frac{1}{2}$ có nghiệm nào trong $[0, 2\pi)$?

<details><summary>Đáp án</summary>

1. $\alpha = \frac{\pi}{6}$ → $x = \pm\frac{\pi}{6} + k2\pi$.
2. $\alpha = \frac{2\pi}{3}$ → $x = \pm\frac{2\pi}{3} + k2\pi$. Trong $[0, 2\pi)$: $\frac{2\pi}{3}$ và $-\frac{2\pi}{3} + 2\pi = \frac{4\pi}{3}$.

</details>

### 📝 Tóm tắt mục 2

- $\cos x = a$ ($|a|\le 1$): $x = \pm\alpha + k2\pi$ (một họ với dấu ±).
- Dùng $\pm\alpha$, KHÔNG dùng $\pi-\alpha$ (đó là của sin).
- $a = \pm 1$ → hai dấu gộp một họ.

---

## 3. Phương trình cơ bản tan x = a

💡 **Trực giác / Hình dung**: tan tuần hoàn chu kỳ **$\pi$** (không phải $2\pi$), nên một giá trị tan lặp lại sau mỗi nửa vòng. Trên đường tròn, hai điểm đối tâm (cách nhau $\pi$) có cùng tan vì cả sin và cos đều đổi dấu (tỉ số giữ nguyên). Vì thế tan chỉ có **một họ** nghiệm với bước nhảy $\pi$, và nhận **mọi** giá trị $a \in \mathbb{R}$ (không bị chặn $|a|\le 1$ như sin/cos).

$$\tan x = a \quad (\text{mọi } a \in \mathbb{R})$$

**Nghiệm**:

$$x = \alpha + k\cdot\pi \quad (k \in \mathbb{Z})$$

(chỉ 1 họ, chu kỳ $\pi$).

**Ví dụ**: $\tan x = 1$ → $x = \frac{\pi}{4} + k\cdot\pi$.

**4 ví dụ số đa dạng**:
- $\tan x = 0$ → $\alpha = 0$ → $x = k\pi$.
- $\tan x = \sqrt{3}$ → $\alpha = \frac{\pi}{3}$ → $x = \frac{\pi}{3} + k\pi$.
- $\tan x = -1$ → $\alpha = -\frac{\pi}{4}$ → $x = -\frac{\pi}{4} + k\pi$.
- $\tan x = 100$ → $\alpha = \arctan(100) \approx 1.5608$ → $x \approx 1.5608 + k\pi$ (tan nhận giá trị lớn tùy ý, gần $\frac{\pi}{2}$).

⚠ **Lỗi thường gặp — dùng bước $+k\cdot 2\pi$ cho tan**. Tan chu kỳ **$\pi$**, nên phải $+k\pi$. Phản ví dụ: $\tan x = 1$ có nghiệm $\frac{\pi}{4}$ và $\frac{5\pi}{4}$ (cách nhau $\pi$). Nếu viết $\frac{\pi}{4} + k2\pi$ thì bỏ mất $\frac{5\pi}{4}$. Ngoài ra phải loại $x = \frac{\pi}{2} + k\pi$ (nơi tan không xác định) khỏi miền.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tan chỉ một họ mà sin/cos hai họ?"* Vì chu kỳ tan là $\pi$, đã "gói" cả hai điểm đối tâm vào một bước nhảy. sin/cos chu kỳ $2\pi$ nên trong một chu kỳ có hai nghiệm riêng.
- *"$\tan x = a$ luôn có nghiệm với mọi a?"* Đúng, vì tan: $\mathbb{R} \to \mathbb{R}$ phủ hết trục số (trừ các điểm gián đoạn). Không có ràng buộc $|a| \le 1$.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\tan x = \frac{\sqrt{3}}{3}$.
2. $\tan x = -1$ có nghiệm nào trong $[0, 2\pi)$?

<details><summary>Đáp án</summary>

1. $\tan(\frac{\pi}{6}) = \frac{\sqrt{3}}{3}$ → $x = \frac{\pi}{6} + k\pi$.
2. $\alpha = -\frac{\pi}{4}$ → $x = -\frac{\pi}{4} + k\pi$. Trong $[0, 2\pi)$: $-\frac{\pi}{4} + \pi = \frac{3\pi}{4}$ và $-\frac{\pi}{4} + 2\pi = \frac{7\pi}{4}$.

</details>

### 📝 Tóm tắt mục 3

- $\tan x = a$: một họ $x = \alpha + k\pi$ (chu kỳ $\pi$), với mọi $a \in \mathbb{R}$.
- Dùng $+k\pi$ (KHÔNG $+k2\pi$); loại $x = \frac{\pi}{2} + k\pi$ khỏi miền.
- Không có ràng buộc $|a| \le 1$ như sin/cos.

---

## 4. Các trường hợp đặc biệt

💡 **Trực giác / Hình dung**: đây là các giá trị "ở mép" ($a = 0, \pm 1$) — nơi hai họ nghiệm gộp lại hoặc rơi đúng trục toạ độ. Thay vì áp công thức tổng quát rồi rút gọn, ta nhớ thẳng các vị trí đặc biệt trên đường tròn: $\sin = 0$ ở hai đầu trục hoành, $\cos = 0$ ở hai đầu trục tung...

| PT | Nghiệm |
|----|--------|
| $\sin x = 0$ | $x = k\pi$ |
| $\sin x = 1$ | $x = \frac{\pi}{2} + k\cdot 2\pi$ |
| $\sin x = -1$ | $x = -\frac{\pi}{2} + k\cdot 2\pi$ |
| $\cos x = 0$ | $x = \frac{\pi}{2} + k\pi$ |
| $\cos x = 1$ | $x = k\cdot 2\pi$ |
| $\cos x = -1$ | $x = \pi + k\cdot 2\pi$ |
| $\tan x = 0$ | $x = k\pi$ |
| $\tan x = 1$ | $x = \frac{\pi}{4} + k\pi$ |

⚠ **Lỗi thường gặp — nhầm $\sin x = 0$ ($x = k\pi$) với $\cos x = 0$ ($x = \frac{\pi}{2} + k\pi$)**. Phản ví dụ: tại $x = \frac{\pi}{2}$, $\sin(\frac{\pi}{2}) = 1 \neq 0$ (nên $\frac{\pi}{2}$ KHÔNG là nghiệm của $\sin x = 0$), nhưng $\cos(\frac{\pi}{2}) = 0$. Nhớ: sin = 0 ở **trục hoành** ($0, \pi, 2\pi$...), cos = 0 ở **trục tung** ($\frac{\pi}{2}, \frac{3\pi}{2}$...).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\sin x = 1$ chỉ $+k2\pi$ mà $\sin x = 0$ lại $k\pi$?"* Vì $\sin = 0$ xảy ra **hai lần** mỗi vòng (tại 0 và $\pi$) → gộp thành bước $\pi$. Còn $\sin = 1$ chỉ **một lần** mỗi vòng (tại $\frac{\pi}{2}$) → bước $2\pi$.
- *"$\cos x = 0$ viết $\pm\frac{\pi}{2} + k2\pi$ hay $\frac{\pi}{2} + k\pi$?"* Hai cách cho cùng tập nghiệm; $\frac{\pi}{2} + k\pi$ gọn hơn.

🔁 **Dừng lại tự kiểm tra**

1. Nghiệm của $\cos x = 1$ là gì?
2. $\sin x = -1$ có nghiệm nào trong $[0, 2\pi)$?

<details><summary>Đáp án</summary>

1. $x = k2\pi$ (cos đạt max = 1 chỉ tại mép phải đường tròn).
2. $x = -\frac{\pi}{2} + k2\pi$ → trong $[0, 2\pi)$ là $-\frac{\pi}{2} + 2\pi = \frac{3\pi}{2}$.

</details>

### 📝 Tóm tắt mục 4

- $\sin x = 0$: $x = k\pi$; $\cos x = 0$: $x = \frac{\pi}{2} + k\pi$ (đừng lẫn).
- $\sin x = \pm 1$, $\cos x = \pm 1$: chỉ một họ $+k2\pi$ (max/min đạt một lần/vòng).
- Nhớ theo vị trí trên đường tròn (trục hoành/trục tung) nhanh hơn áp công thức.

---

## 5. PT bậc 2 theo sin / cos

💡 **Trực giác / Hình dung**: nếu trong PT chỉ xuất hiện **một** hàm (toàn sin, hoặc toàn cos), thì coi hàm đó như một ẩn `t` và giải PT bậc 2 đại số quen thuộc. Sau khi ra `t`, mỗi giá trị `t` lại thành một PT lượng giác cơ bản (mục 1-3). Hai tầng: đại số trước, lượng giác sau.

**Ví dụ**: $2\cdot\sin^2 x - \sin x - 1 = 0$.

Đặt $t = \sin x$ ($-1 \le t \le 1$):
- $2t^2 - t - 1 = 0$
- $t = 1$ hoặc $t = -\frac{1}{2}$.

⟶ Giải tiếp:
- $\sin x = 1$ → $x = \frac{\pi}{2} + k\cdot 2\pi$.
- $\sin x = -\frac{1}{2}$ → $x = -\frac{\pi}{6} + k\cdot 2\pi$ hoặc $x = \pi + \frac{\pi}{6} + k\cdot 2\pi = \frac{7\pi}{6} + k\cdot 2\pi$.

⚠ **Lỗi thường gặp — quên điều kiện $-1 \le t \le 1$ rồi giữ nghiệm t "ảo"**. Vì $t = \sin x$ (hoặc cos x) bị chặn trong $[-1, 1]$. Phản ví dụ: PT $t^2 - 3t + 2 = 0$ cho $t = 1$ và $t = 2$. Nghiệm $t = 2$ phải **loại** vì $\sin x = 2$ vô nghiệm — chỉ giữ $\sin x = 1$.

⚠ **Lỗi thường gặp 2 — PT lẫn cả sin và cos bậc 2 mà không quy về một hàm**. Vd $\sin^2 x + \cos x = 1$ có cả hai. Phải dùng $\sin^2 x = 1 - \cos^2 x$ đưa về một ẩn cos trước: $1 - \cos^2 x + \cos x = 1$ → $\cos x - \cos^2 x = 0$ → $\cos x(1 - \cos x) = 0$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào đặt ẩn phụ được?"* Khi PT chỉ chứa một hàm lượng giác (hoặc quy được về một hàm nhờ $\sin^2 + \cos^2 = 1$). Nếu lẫn $\sin x \cos x$ thì cân nhắc công thức nhân đôi.
- *"Sau khi đặt t, có cần đổi miền k không?"* Không, k vẫn chạy $\mathbb{Z}$. Chỉ cần với mỗi t hợp lệ, viết đủ các họ nghiệm của PT cơ bản tương ứng.

🔁 **Dừng lại tự kiểm tra**

1. Giải $2\cos^2 x - 3\cos x + 1 = 0$.
2. Trong PT $t^2 - t - 6 = 0$ (với $t = \sin x$), nghiệm nào bị loại?

<details><summary>Đáp án</summary>

1. $t = \cos x$: $2t^2 - 3t + 1 = 0$ → $t = 1$ hoặc $t = \frac{1}{2}$. $\cos x = 1 \to x = k2\pi$; $\cos x = \frac{1}{2} \to x = \pm\frac{\pi}{3} + k2\pi$.
2. $t = 3$ hoặc $t = -2$; **cả hai** bị loại (đều ngoài $[-1,1]$) → PT vô nghiệm.

</details>

### 📝 Tóm tắt mục 5

- Đặt $t = \sin x$ (hoặc cos x), giải PT bậc 2 đại số, rồi giải PT lượng giác cơ bản.
- Bắt buộc kiểm tra $-1 \le t \le 1$, loại nghiệm t ngoài khoảng.
- PT lẫn sin & cos: dùng $\sin^2 + \cos^2 = 1$ quy về một hàm trước.

---

## 6. PT a·sin x + b·cos x = c

💡 **Trực giác / Hình dung**: vế trái là tổng của hai dao động lệch pha — đã biết từ L03 rằng nó gộp lại thành **một** sóng $R \sin(x+\varphi)$. Gộp xong, PT phức tạp biến thành PT cơ bản $\sin(x+\varphi) = \frac{c}{R}$. Cốt lõi: nén hai hàm thành một rồi áp công thức mục 1.

**Cách giải**: dùng công thức tổng hợp ở L03.

$$a\cdot\sin x + b\cdot\cos x = R\cdot\sin(x + \varphi) = c$$

trong đó $R = \sqrt{a^2+b^2}$, $\tan\varphi = \frac{b}{a}$.

⟶ Đưa về $\sin(x + \varphi) = \frac{c}{R}$.

**Điều kiện có nghiệm**: $|\frac{c}{R}| \le 1$ → **$c^2 \le a^2 + b^2$**.

**Ví dụ**: $\sqrt{3}\cdot\sin x + \cos x = 1$.
- $R = \sqrt{3+1} = 2$, $\tan\varphi = \frac{1}{\sqrt{3}}$ → $\varphi = \frac{\pi}{6}$.
- $2\cdot\sin(x + \frac{\pi}{6}) = 1$ → $\sin(x + \frac{\pi}{6}) = \frac{1}{2}$.
- $x + \frac{\pi}{6} = \frac{\pi}{6} + k\cdot 2\pi$ → $x = k\cdot 2\pi$.
- $x + \frac{\pi}{6} = \pi - \frac{\pi}{6} + k\cdot 2\pi = \frac{5\pi}{6} + k\cdot 2\pi$ → $x = \frac{4\pi}{6} + k\cdot 2\pi = \frac{2\pi}{3} + k\cdot 2\pi$.

⚠ **Lỗi thường gặp — không kiểm tra điều kiện $c^2 \le a^2+b^2$**. Sau khi đưa về $\sin(x+\varphi) = \frac{c}{R}$, nếu $|\frac{c}{R}| > 1$ thì **vô nghiệm**. Phản ví dụ: $\sin x + \cos x = 3$ có $R = \sqrt{2} \approx 1.41$, $\frac{c}{R} = \frac{3}{1.41} \approx 2.12 > 1$ → vô nghiệm (tổng $\sin x + \cos x$ không bao giờ vượt $\sqrt{2}$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao điều kiện có nghiệm là $c^2 \le a^2+b^2$?"* Vì $a \sin x + b \cos x$ có biên độ $R = \sqrt{a^2+b^2}$, tức luôn nằm trong $[-R, R]$. PT $= c$ chỉ giải được khi $|c| \le R$, tức $c^2 \le a^2+b^2$.
- *"Có cách nào khác ngoài $R\cdot\sin(x+\varphi)$?"* Có: chia cả hai vế cho $\sqrt{a^2+b^2}$, hoặc dùng phép thế $t = \tan(\frac{x}{2})$ (Weierstrass). Nhưng $R\cdot\sin(x+\varphi)$ trực quan nhất.

🔁 **Dừng lại tự kiểm tra**

1. $3 \sin x + 4 \cos x = 6$ có nghiệm không?
2. $\sin x - \sqrt{3} \cos x = 1$: tìm R và đưa về PT cơ bản.

<details><summary>Đáp án</summary>

1. $R = \sqrt{9+16} = 5$. $|c|=6 > 5$ → **vô nghiệm**.
2. $R = \sqrt{1+3} = 2$, viết $2 \sin(x - \frac{\pi}{3}) = 1$ (vì hệ số cos âm → $\varphi = -\frac{\pi}{3}$) → $\sin(x - \frac{\pi}{3}) = \frac{1}{2}$.

</details>

### 📝 Tóm tắt mục 6

- Gộp $a \sin x + b \cos x = R \sin(x+\varphi)$ rồi giải $\sin(x+\varphi) = \frac{c}{R}$.
- Điều kiện có nghiệm: $c^2 \le a^2+b^2$ (tức $|\frac{c}{R}| \le 1$).
- Là PT cơ bản mục 1 sau khi nén hai hàm thành một.

---

## 7. PT bằng phương pháp biến tổng thành tích

💡 **Trực giác / Hình dung**: nguyên lý chủ đạo của giải PT là **đưa về tích = 0**, vì khi `A·B = 0` thì `A = 0` HOẶC `B = 0` — tách thành các PT cơ bản. Một **tổng** sin/cos không cho ngay nghiệm, nhưng công thức tổng→tích (L03) biến nó thành tích. Đây là lý do ta học tổng→tích.

**Ví dụ**: $\sin x + \sin 3x = 0$.

Biến tổng thành tích: $\sin x + \sin 3x = 2\cdot\sin(2x)\cdot\cos(x)$.

⟶ $2\cdot\sin 2x\cdot\cos x = 0$ → $\sin 2x = 0$ hoặc $\cos x = 0$.
- $\sin 2x = 0$ → $2x = k\pi$ → $x = \frac{k\pi}{2}$.
- $\cos x = 0$ → $x = \frac{\pi}{2} + k\pi$.

Kết hợp: $x = \frac{k\pi}{2}$ (đã bao gồm cả).

⚠ **Lỗi thường gặp — chuyển vế sai trước khi biến đổi**. Để dùng tổng→tích cần đưa PT về dạng $(\text{tổng}) = 0$ hoặc $(\text{hiệu}) = 0$. Phản ví dụ: $\sin 3x = \sin x$ phải chuyển thành $\sin 3x - \sin x = 0$ rồi mới dùng $\sin a - \sin b = 2 \cos(\ldots) \sin(\ldots)$. Nếu để nguyên $\sin 3x = \sin x$ rồi "rút" sin hai vế là **sai** (mất nghiệm, và sin không "rút" được như số).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\sin A = \sin B$ giải thế nào nhanh?"* Dùng tính chất: $\sin A = \sin B \iff A = B + k2\pi$ HOẶC $A = \pi - B + k2\pi$. Tương đương với chuyển vế rồi tổng→tích.
- *"Vì sao đôi khi hai họ nghiệm gộp lại được?"* Vì một họ có thể là tập con của họ kia. Vd $x = \frac{k\pi}{2}$ đã chứa cả $x = \frac{\pi}{2} + k\pi$. Nên kiểm tra trùng lặp khi gộp.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\cos 3x = \cos x$ (gợi ý: chuyển vế, dùng cos a − cos b).
2. $\sin 2x + \sin x = 0$ cho ra những PT cơ bản nào?

<details><summary>Đáp án</summary>

1. $\cos 3x - \cos x = 0$ → $-2 \sin 2x \sin x = 0$ → $\sin 2x = 0$ ($x = \frac{k\pi}{2}$) HOẶC $\sin x = 0$ ($x = k\pi$, đã nằm trong $\frac{k\pi}{2}$). Nghiệm: $x = \frac{k\pi}{2}$.
2. $\sin 2x + \sin x = 2 \sin(\frac{3x}{2}) \cos(\frac{x}{2}) = 0$ → $\sin(\frac{3x}{2}) = 0$ HOẶC $\cos(\frac{x}{2}) = 0$.

</details>

### 📝 Tóm tắt mục 7

- Đưa PT về **tích = 0** rồi tách thành các PT cơ bản.
- Chuyển hết về một vế trước khi dùng tổng→tích (đừng "rút" sin/cos hai vế).
- $\sin A = \sin B \iff A = B + k2\pi$ hoặc $A = \pi - B + k2\pi$; kiểm tra trùng họ khi gộp.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Giải $\sin x = \frac{\sqrt{2}}{2}$.

**Bài 2**: Giải $2\cdot\cos^2 x + \cos x - 1 = 0$.

**Bài 3**: Giải $\sin x + \sqrt{3}\cdot\cos x = 1$.

**Bài 4**: Giải $\tan x = -1$.

**Bài 5**: Giải $\sin 2x = \sin x$.

### Lời giải

**Bài 1**: $\sin x = \frac{\sqrt{2}}{2} = \sin(\frac{\pi}{4})$. $x = \frac{\pi}{4} + k\cdot 2\pi$ hoặc $x = \pi - \frac{\pi}{4} + k\cdot 2\pi = \frac{3\pi}{4} + k\cdot 2\pi$.

**Bài 2**: Đặt $t = \cos x$. $2t^2 + t - 1 = 0$ → $t = \frac{1}{2}$ hoặc $t = -1$.  
- $\cos x = \frac{1}{2}$ → $x = \pm\frac{\pi}{3} + k\cdot 2\pi$.  
- $\cos x = -1$ → $x = \pi + k\cdot 2\pi$.

**Bài 3**: $R = 2$, $\varphi = \frac{\pi}{3}$. $2\cdot\sin(x + \frac{\pi}{3}) = 1$ → $\sin(x + \frac{\pi}{3}) = \frac{1}{2}$.  
- $x + \frac{\pi}{3} = \frac{\pi}{6} + k\cdot 2\pi$ → $x = -\frac{\pi}{6} + k\cdot 2\pi$.  
- $x + \frac{\pi}{3} = \frac{5\pi}{6} + k\cdot 2\pi$ → $x = \frac{\pi}{2} + k\cdot 2\pi$.

**Bài 4**: $\tan x = -1 = \tan(-\frac{\pi}{4})$. $x = -\frac{\pi}{4} + k\pi$.

**Bài 5**: $\sin 2x - \sin x = 0$ → $2\cdot\cos(\frac{3x}{2})\cdot\sin(\frac{x}{2}) = 0$.  
- $\cos(\frac{3x}{2}) = 0$ → $\frac{3x}{2} = \frac{\pi}{2} + k\pi$ → $x = \frac{\pi}{3} + \frac{2k\pi}{3}$.  
- $\sin(\frac{x}{2}) = 0$ → $x = 2k\pi$.

---

## 9. Bài tiếp theo

[Lesson 05 — Số phức](../lesson-05-complex-numbers/) — i, dạng đại số, ý nghĩa.

## 📝 Tổng kết

1. **$\sin x = a$**: $x = \alpha + k\cdot 2\pi$ hoặc $\pi-\alpha + k\cdot 2\pi$.
2. **$\cos x = a$**: $x = \pm\alpha + k\cdot 2\pi$.
3. **$\tan x = a$**: $x = \alpha + k\pi$.
4. **Bậc 2 theo sin/cos**: đặt ẩn phụ.
5. **$a\cdot\sin x + b\cdot\cos x = c$**: dùng $R\cdot\sin(x+\varphi)$. Có nghiệm khi $c^2 \le a^2+b^2$.
