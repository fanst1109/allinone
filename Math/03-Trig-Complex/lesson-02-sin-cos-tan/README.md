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

💡 **Trực giác hình ảnh — "cos là bóng ngang, sin là bóng dọc"**: hình dung một con kiến bò trên đường tròn bán kính 1, xuất phát từ điểm $(1, 0)$ và bò ngược chiều kim đồng hồ. Tại mỗi thời điểm, vị trí con kiến là $M = (x, y)$. Chiếu M xuống **trục hoành** ⟶ được $x = \cos\theta$ (bóng ngang). Chiếu M lên **trục tung** ⟶ được $y = \sin\theta$ (bóng dọc). Khi $\theta$ tăng, con kiến leo lên (sin tăng) rồi sang trái (cos giảm) — cứ thế lặp lại sau mỗi vòng. Đây là lý do sâu xa khiến sin/cos là **sóng tuần hoàn**: chuyển động tròn nhìn từ một phía chính là dao động lên–xuống.

```
                  y
                  ↑
              · · M=(cosθ, sinθ)
          ·      ╱│·
        ·       ╱ │  ·
       ·       ╱  │   ·
      ·     OP╱   │sinθ = tung độ
      ·     ╱     │    ·     (bóng dọc)
      ·    ╱ θ    │    ·
──────●───●───────┴────●─────→ x
   (-1,0) O   cosθ    (1,0)
              hoành độ
            (bóng ngang)
```

**Bốn ví dụ đọc tọa độ trực tiếp** (không cần tam giác, chỉ nhìn điểm M):

1. $\theta = 0$: M ở mép phải $(1, 0)$ ⟶ $\cos 0 = 1$, $\sin 0 = 0$, $\tan 0 = \frac{0}{1} = 0$.
2. $\theta = \frac{\pi}{2}$ ($90^\circ$): M ở đỉnh $(0, 1)$ ⟶ $\cos = 0$, $\sin = 1$, $\tan = \frac{1}{0}$ **không xác định**.
3. $\theta = \pi$ ($180^\circ$): M ở mép trái $(-1, 0)$ ⟶ $\cos = -1$, $\sin = 0$, $\tan = \frac{0}{-1} = 0$.
4. $\theta = \frac{3\pi}{2}$ ($270^\circ$): M ở đáy $(0, -1)$ ⟶ $\cos = 0$, $\sin = -1$, $\tan = \frac{-1}{0}$ **không xác định**.

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

### 2.1. Vì sao những giá trị này đúng — suy từ 2 tam giác

Mẹo "bàn tay" tiện nhớ, nhưng các giá trị $\frac{1}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}$ **không phải tự nhiên mà có** — chúng suy ra từ hai tam giác đặc biệt. Hiểu cách suy thì không bao giờ phải học vẹt.

#### Tam giác 45-45-90 (cho góc 45°)

💡 **Trực giác**: lấy một hình vuông cạnh 1, cắt theo đường chéo ⟶ được tam giác vuông cân, hai góc nhọn đều $45^\circ$, hai cạnh góc vuông đều dài 1.

```
        ╱│
       ╱ │
   c  ╱  │ 1   (cạnh góc vuông)
     ╱   │
    ╱ 45°│
   ╱─────┘
      1     (cạnh góc vuông)
```

Theo Pythagore, cạnh huyền $c = \sqrt{1^2 + 1^2} = \sqrt{2}$. Áp SOH-CAH-TOA cho góc $45^\circ$:

$$\begin{aligned}
\sin 45^\circ &= \frac{\text{đối}}{\text{huyền}} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} \approx 0.707 \\
\cos 45^\circ &= \frac{\text{kề}}{\text{huyền}} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} \approx 0.707 \\
\tan 45^\circ &= \frac{\text{đối}}{\text{kề}} = \frac{1}{1} = 1
\end{aligned}$$

Vì hai cạnh góc vuông bằng nhau nên $\sin 45^\circ = \cos 45^\circ$ — điều này hợp lý: $45^\circ$ là góc "cân bằng" giữa ngang và dọc trên đường tròn, điểm M nằm đúng trên đường phân giác $y = x$.

#### Tam giác 30-60-90 (cho góc 30° và 60°)

💡 **Trực giác**: lấy một **tam giác đều** cạnh 2, hạ đường cao từ một đỉnh ⟶ cắt đôi thành hai tam giác vuông $30$-$60$-$90$. Cạnh huyền = 2 (cạnh tam giác đều), cạnh đáy ngắn = 1 (nửa cạnh đáy).

```
         ╱│
        ╱ │
    2  ╱  │ h        h = √(2² − 1²) = √3
      ╱   │
     ╱ 30°│
    ╱─────┘
   60°  1
```

Đường cao $h = \sqrt{2^2 - 1^2} = \sqrt{4 - 1} = \sqrt{3}$. Bây giờ đọc hai góc:

**Góc $30^\circ$** (ở đỉnh trên, cạnh đối là cạnh ngắn = 1):

$$\begin{aligned}
\sin 30^\circ &= \frac{\text{đối}}{\text{huyền}} = \frac{1}{2} \\
\cos 30^\circ &= \frac{\text{kề}}{\text{huyền}} = \frac{\sqrt{3}}{2} \\
\tan 30^\circ &= \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3} \approx 0.577
\end{aligned}$$

**Góc $60^\circ$** (ở đáy, cạnh đối là đường cao = $\sqrt{3}$):

$$\begin{aligned}
\sin 60^\circ &= \frac{\sqrt{3}}{2} \\
\cos 60^\circ &= \frac{1}{2} \\
\tan 60^\circ &= \frac{\sqrt{3}}{1} = \sqrt{3} \approx 1.732
\end{aligned}$$

⟶ Để ý: $\sin 30^\circ = \cos 60^\circ = \frac{1}{2}$ và $\sin 60^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2}$. Đó là vì trong tam giác này, cạnh đối với góc $30^\circ$ chính là cạnh kề với góc $60^\circ$ — hai góc **phụ nhau** ($30 + 60 = 90$).

**Verify hệ thức Pythagore lượng giác cho cả 3 góc lõi**:

- $30^\circ$: $\sin^2 + \cos^2 = (\frac{1}{2})^2 + (\frac{\sqrt{3}}{2})^2 = \frac{1}{4} + \frac{3}{4} = 1$ ✓.
- $45^\circ$: $(\frac{\sqrt{2}}{2})^2 + (\frac{\sqrt{2}}{2})^2 = \frac{1}{2} + \frac{1}{2} = 1$ ✓.
- $60^\circ$: $(\frac{\sqrt{3}}{2})^2 + (\frac{1}{2})^2 = \frac{3}{4} + \frac{1}{4} = 1$ ✓.

### 2.2. Bảng mở rộng — góc đặc biệt ở mọi góc phần tư

Từ 3 góc lõi cộng quy tắc dấu (mục 6), suy ra tọa độ điểm M cho 16 góc đặc biệt quanh đường tròn. Bảng dưới cho cả tọa độ $M = (\cos\theta, \sin\theta)$ để đối chiếu trực quan:

| $\theta$ | $M = (\cos\theta, \sin\theta)$ | $\sin\theta$ | $\cos\theta$ | $\tan\theta$ |
|----------|-------------------------------|--------------|--------------|--------------|
| $0^\circ$ | $(1, 0)$ | $0$ | $1$ | $0$ |
| $30^\circ$ | $(\frac{\sqrt{3}}{2}, \frac{1}{2})$ | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$ |
| $45^\circ$ | $(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $1$ |
| $60^\circ$ | $(\frac{1}{2}, \frac{\sqrt{3}}{2})$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $\sqrt{3}$ |
| $90^\circ$ | $(0, 1)$ | $1$ | $0$ | KXĐ |
| $120^\circ$ | $(-\frac{1}{2}, \frac{\sqrt{3}}{2})$ | $\frac{\sqrt{3}}{2}$ | $-\frac{1}{2}$ | $-\sqrt{3}$ |
| $135^\circ$ | $(-\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$ | $\frac{\sqrt{2}}{2}$ | $-\frac{\sqrt{2}}{2}$ | $-1$ |
| $150^\circ$ | $(-\frac{\sqrt{3}}{2}, \frac{1}{2})$ | $\frac{1}{2}$ | $-\frac{\sqrt{3}}{2}$ | $-\frac{\sqrt{3}}{3}$ |
| $180^\circ$ | $(-1, 0)$ | $0$ | $-1$ | $0$ |
| $210^\circ$ | $(-\frac{\sqrt{3}}{2}, -\frac{1}{2})$ | $-\frac{1}{2}$ | $-\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$ |
| $225^\circ$ | $(-\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$ | $-\frac{\sqrt{2}}{2}$ | $-\frac{\sqrt{2}}{2}$ | $1$ |
| $240^\circ$ | $(-\frac{1}{2}, -\frac{\sqrt{3}}{2})$ | $-\frac{\sqrt{3}}{2}$ | $-\frac{1}{2}$ | $\sqrt{3}$ |
| $270^\circ$ | $(0, -1)$ | $-1$ | $0$ | KXĐ |
| $300^\circ$ | $(\frac{1}{2}, -\frac{\sqrt{3}}{2})$ | $-\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $-\sqrt{3}$ |
| $315^\circ$ | $(\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$ | $-\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $-1$ |
| $330^\circ$ | $(\frac{\sqrt{3}}{2}, -\frac{1}{2})$ | $-\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $-\frac{\sqrt{3}}{3}$ |

(KXĐ = không xác định, vì $\cos\theta = 0$.)

**Bốn ví dụ tính bằng cả hai cách (tam giác và đường tròn)**:

1. **$\sin 60^\circ$** — Tam giác: cạnh đối $\sqrt{3}$ / huyền $2 = \frac{\sqrt{3}}{2}$. Đường tròn: M $= (\frac{1}{2}, \frac{\sqrt{3}}{2})$, tung độ $= \frac{\sqrt{3}}{2}$. Cùng đáp án ✓.
2. **$\cos 120^\circ$** — Đường tròn: M ở QII, $= (-\frac{1}{2}, \frac{\sqrt{3}}{2})$, hoành độ $= -\frac{1}{2}$. Tam giác không trực tiếp dùng được (góc tù), phải qua góc bù $180^\circ - 120^\circ = 60^\circ$: $\cos 120^\circ = -\cos 60^\circ = -\frac{1}{2}$ ✓.
3. **$\tan 45^\circ$** — Tam giác: đối/kề $= \frac{1}{1} = 1$. Đường tròn: $\frac{\sin 45^\circ}{\cos 45^\circ} = \frac{\sqrt{2}/2}{\sqrt{2}/2} = 1$ ✓.
4. **$\tan 30^\circ$** — Tam giác: $\frac{1}{\sqrt{3}}$, hữu tỉ hóa mẫu $= \frac{1}{\sqrt{3}} \cdot \frac{\sqrt{3}}{\sqrt{3}} = \frac{\sqrt{3}}{3} \approx 0.577$. Đường tròn: $\frac{\sin 30^\circ}{\cos 30^\circ} = \frac{1/2}{\sqrt{3}/2} = \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}$ ✓.

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

```
 y
 1┤      .-''-.                      .-''-.
  │    .'      '.                  .'      '.
 0┼──.'─────────'.──────────────.'─────────'.───→ x
  │ 0          π '.    π      2π'.          .' 3π
-1┤              '.__.'          '.__.'
       π/2          3π/2
   ↑lên     ↑đỉnh=1   ↑xuống   ↑đáy=-1
```

sin xuất phát từ 0, leo lên đỉnh 1 tại $\frac{\pi}{2}$, về 0 tại $\pi$, xuống đáy $-1$ tại $\frac{3\pi}{2}$, rồi về 0 tại $2\pi$ — đúng một vòng quanh đường tròn.

### 3.2. y = cos x

- **D** $= \mathbb{R}$, **E** $= [-1, 1]$.
- **Chu kỳ**: $2\pi$.
- **Chẵn**: $\cos(-x) = \cos x$. Đối xứng qua trục Oy.
- Đi qua $(0, 1)$, cực đại tại $x = 0$, cực tiểu tại $\pi$.
- **Liên hệ với sin**: $\cos x = \sin(x + \frac{\pi}{2})$. Cos sớm pha hơn sin $\frac{\pi}{2}$.

```
 y
 1┤'-.                  .-''-.                  .-'
  │   '.              .'      '.              .'
 0┼─────'.──────────.'─────────'.──────────.'────→ x
  │ 0     '.    π  .'     2π    '.        .' 3π
-1┤         '.__.'              '.__.'
              π          ↑đáy=-1
   ↑đỉnh=1
```

cos chỉ là sin **trượt sang trái $\frac{\pi}{2}$**: nó khởi đầu ngay ở đỉnh 1 (vì $\cos 0 = 1$), trong khi sin khởi đầu ở 0.

### 3.3. y = tan x

- **D** $= \mathbb{R} \setminus \{\frac{\pi}{2} + k\pi\}$, **E** $= \mathbb{R}$.
- **Chu kỳ**: $\pi$ (ngắn hơn sin/cos!).
- **Lẻ**: $\tan(-x) = -\tan x$.
- **Tiệm cận đứng** tại $x = \frac{\pi}{2} + k\pi$ (nơi cos = 0).

```
 y     ┊            ┊            ┊
       ┊  ╱         ┊  ╱         ┊  ╱
       ┊ ╱          ┊ ╱          ┊ ╱
 ──────┊╱───────────┊╱───────────┊╱──────→ x
      ╱┊0          ╱┊π          ╱┊2π
     ╱ ┊          ╱ ┊          ╱ ┊
       ┊          ┊            ┊
     -π/2        π/2          3π/2
     (tiệm cận)  (tiệm cận)   (tiệm cận)
```

tan lao từ $-\infty$ lên $+\infty$ trong mỗi khoảng rộng $\pi$, đứt quãng tại mỗi tiệm cận (chỗ $\cos = 0$). Khác sin/cos, tan **không bị chặn** trên/dưới.

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

💡 **Mẹo SOH-CAH-TOA bằng ASCII** — gắn nhãn 3 cạnh quanh góc $\theta$:

```
              │╲
              │ ╲
   ĐỐI        │  ╲  HUYỀN
 (opposite)   │   ╲  (hypotenuse)
   đối diện θ  │    ╲
              │  θ  ╲
              └──────╲
               KỀ (adjacent)
              liền kề góc θ

  SOH:  Sin = Đối / Huyền      (S = O/H)
  CAH:  Cos = Kề  / Huyền      (C = A/H)
  TOA:  Tan = Đối / Kề         (T = O/A)
```

Mấu chốt: cạnh **đối** là cạnh KHÔNG chạm vào góc $\theta$; cạnh **kề** là cạnh chạm vào $\theta$ (mà không phải huyền); **huyền** luôn là cạnh dài nhất, đối diện góc vuông.

⚠ **Lỗi thường gặp — đảo "đối/kề" của sin và cos**. $\sin = $ đối/huyền (SOH), $\cos = $ kề/huyền (CAH), $\tan = $ đối/kề (TOA). Phản ví dụ: trong tam giác 3-4-5 với $\theta$ kề cạnh 4, nếu viết $\cos\theta = \frac{3}{5}$ là sai (3 là cạnh **đối**, không phải kề) → đúng là $\cos\theta = \frac{4}{5}$.

⚠ **Lỗi thường gặp — máy tính / code để sai chế độ độ (DEG) vs radian (RAD)**. Hàm `sin`, `cos`, `tan` trong hầu hết ngôn ngữ lập trình (Go, Python, C, JS) nhận **radian**, không phải độ. Ví dụ trong Go: `math.Sin(30)` cho $\sin(30 \text{ rad}) \approx -0.988$, **không phải** $\sin 30^\circ = 0.5$. Phải đổi sang radian trước: `math.Sin(30 * math.Pi / 180)` hoặc `math.Sin(math.Pi/6)` mới ra $0.5$. Trên máy tính cầm tay: kiểm tra góc trên màn hình ghi `DEG` hay `RAD` trước khi bấm — đây là lỗi #1 khiến đáp án "sai một cách bí ẩn".

**Verify lỗi DEG/RAD bằng số**: $\sin 30^\circ = 0.5$ (đúng). Nhưng $30$ radian $\approx 4.77$ vòng $\to$ tương đương $30 - 4 \times 2\pi \approx 4.87$ rad, cho $\sin \approx -0.988$. Hai kết quả cách nhau một trời một vực — nếu nhập nhầm chế độ, không có cách nào ra đúng.

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

```
            y
            ↑
       S    │    A
    (Sin+)  │  (All+)     ← QI: cả sin, cos, tan đều +
            │             ← QII: chỉ Sin +
────────────●────────────→ x
            │             ← QIII: chỉ Tan +
       T    │    C        ← QIV: chỉ Cos +
    (Tan+)  │  (Cos+)
            │
```

Đọc ngược chiều kim đồng hồ từ QI: **A**ll → **S**in → **T**an → **C**os ("**A**ll **S**tudents **T**ake **C**alculus"). Hàm nào KHÔNG có tên trong góc phần tư đó thì **âm**. Vì $\cos\theta = $ hoành độ và $\sin\theta = $ tung độ điểm M, dấu của cos/sin chính là dấu của $x$/$y$ — không cần học vẹt, chỉ cần nhìn M nằm góc phần tư nào.

**Verify quy luật dấu bằng số (mỗi phần tư 1 góc)**:
- Phần tư I, 30°: $\sin = \frac{1}{2}$ (+), $\cos = \frac{\sqrt{3}}{2}$ (+), $\tan = \frac{\sqrt{3}}{3}$ (+) → **All** dương ✓.
- Phần tư II, 120°: $\sin = \frac{\sqrt{3}}{2}$ (+), $\cos = -\frac{1}{2}$ (−), $\tan = -\sqrt{3}$ (−) → chỉ **Sin** dương ✓.
- Phần tư III, 210°: $\sin = -\frac{1}{2}$ (−), $\cos = -\frac{\sqrt{3}}{2}$ (−), $\tan = \frac{\sqrt{3}}{3}$ (+) → chỉ **Tan** dương ✓.
- Phần tư IV, 300°: $\sin = -\frac{\sqrt{3}}{2}$ (−), $\cos = \frac{1}{2}$ (+), $\tan = -\sqrt{3}$ (−) → chỉ **Cos** dương ✓.

⚠ **Lỗi thường gặp — gán nhầm dấu khi giải $\sin x = a$ ra hai góc**. Một giá trị sin (vd $\frac{1}{2}$) ứng với **hai góc** ở hai phần tư khác nhau (30° ở I và 150° ở II), khác nhau ở dấu của cos. Nếu bài cho thêm điều kiện "góc phần tư III" thì cả sin lẫn cos đều âm — phải chọn đúng dấu, đừng mặc định dương.

⚠ **Lỗi thường gặp — quên áp dấu sau khi quy về góc nhọn**. Tính $\sin 210^\circ$: tách $210^\circ = 180^\circ + 30^\circ$, lấy $\sin 30^\circ = \frac{1}{2}$ rồi **quên** rằng $210^\circ$ ở QIII nên sin âm → trả lời $\frac{1}{2}$ (sai), đúng là $-\frac{1}{2}$. Quy trình an toàn: (1) tìm góc phần tư, (2) tra trị tuyệt đối qua góc tham chiếu, (3) áp dấu theo ASTC.

**Walk-through chọn dấu khi giải $\sin x = -\frac{1}{2}$ (4 bước)**:

1. Trị tuyệt đối $|\sin x| = \frac{1}{2}$ ⟶ góc tham chiếu (nhọn) là $30^\circ$.
2. $\sin x < 0$ ⟶ M nằm dưới trục hoành ⟶ QIII hoặc QIV.
3. QIII: $x = 180^\circ + 30^\circ = 210^\circ$. QIV: $x = 360^\circ - 30^\circ = 330^\circ$.
4. Kiểm tra: $\sin 210^\circ = -\frac{1}{2}$ ✓, $\sin 330^\circ = -\frac{1}{2}$ ✓. Hai nghiệm trong $[0, 2\pi]$.

**Walk-through dấu cho 4 góc bất kỳ (mỗi phần tư một góc, suy dấu trước khi tính)**:

- $\cos 160^\circ$: $160^\circ \in (90, 180)$ ⟶ QII ⟶ chỉ Sin+ ⟶ $\cos 160^\circ < 0$ (âm).
- $\tan 250^\circ$: $250^\circ \in (180, 270)$ ⟶ QIII ⟶ chỉ Tan+ ⟶ $\tan 250^\circ > 0$ (dương).
- $\sin 320^\circ$: $320^\circ \in (270, 360)$ ⟶ QIV ⟶ chỉ Cos+ ⟶ $\sin 320^\circ < 0$ (âm).
- $\cos 40^\circ$: $40^\circ \in (0, 90)$ ⟶ QI ⟶ All+ ⟶ $\cos 40^\circ > 0$ (dương).

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

## 7. Hàm lượng giác ngược (arcsin, arccos, arctan)

💡 **Trực giác / Hình dung**: sin, cos, tan trả lời câu hỏi *"góc $\theta$ cho ra tỉ số bao nhiêu?"*. Hàm ngược trả lời câu hỏi **ngược lại**: *"tỉ số này ứng với góc nào?"*. Ví dụ: leo một con dốc, biết độ cao và quãng đường thì $\sin\theta$ cho biết tỉ số; nhưng nếu biết tỉ số $0.5$ và muốn tìm **độ nghiêng của dốc** thì cần $\arcsin(0.5) = 30^\circ$. Đó là bài toán đảo, xuất hiện khắp nơi (góc ngắm, góc tới của tia sáng, hướng vector).

> 📐 **Định nghĩa đầy đủ — hàm lượng giác ngược**
>
> **(a) Là gì**: $\arcsin x$ (đọc "arcsin x", còn viết $\sin^{-1} x$) là **góc** $\theta$ sao cho $\sin\theta = x$. Tương tự $\arccos x$ thỏa $\cos(\arccos x) = x$, và $\arctan x$ thỏa $\tan(\arctan x) = x$.
>
> **(b) Vì sao cần — và vì sao phải GIỚI HẠN miền giá trị**: sin tuần hoàn nên $\sin\theta = 0.5$ có **vô số** nghiệm ($30^\circ, 150^\circ, 390^\circ, \ldots$). Nếu $\arcsin$ trả về tất cả thì nó không còn là một **hàm** (mỗi đầu vào phải cho đúng một đầu ra). Vì vậy ta quy ước chọn **một** nghiệm trong một khoảng cố định gọi là *giá trị chính (principal value)*:
> - $\arcsin x \in [-\frac{\pi}{2}, \frac{\pi}{2}]$ (tức $[-90^\circ, 90^\circ]$), với $x \in [-1, 1]$.
> - $\arccos x \in [0, \pi]$ (tức $[0^\circ, 180^\circ]$), với $x \in [-1, 1]$.
> - $\arctan x \in (-\frac{\pi}{2}, \frac{\pi}{2})$, với $x \in \mathbb{R}$ (mọi số thực — tan không bị chặn).
>
> **(c) Ví dụ số**: $\arcsin(0.5) = 30^\circ$ (chọn góc trong $[-90, 90]$, không chọn $150^\circ$). $\arccos(0.5) = 60^\circ$. $\arccos(-0.5) = 120^\circ$ (nằm trong $[0, 180]$). $\arctan(1) = 45^\circ$. $\arctan(\sqrt{3}) = 60^\circ$.

**Bốn ví dụ tính hàm ngược (kèm walk-through chọn giá trị chính)**:

1. **$\arcsin(\frac{\sqrt{3}}{2})$** — Tìm $\theta \in [-90^\circ, 90^\circ]$ có $\sin\theta = \frac{\sqrt{3}}{2}$. Tra bảng: $\sin 60^\circ = \frac{\sqrt{3}}{2}$ và $60^\circ \in [-90, 90]$ ⟶ $\arcsin(\frac{\sqrt{3}}{2}) = 60^\circ$.
2. **$\arccos(0)$** — Tìm $\theta \in [0^\circ, 180^\circ]$ có $\cos\theta = 0$. $\cos 90^\circ = 0$ ⟶ $\arccos(0) = 90^\circ$.
3. **$\arctan(-1)$** — Tìm $\theta \in (-90^\circ, 90^\circ)$ có $\tan\theta = -1$. $\tan(-45^\circ) = -1$ và $-45^\circ$ trong khoảng ⟶ $\arctan(-1) = -45^\circ$ (KHÔNG chọn $135^\circ$, dù $\tan 135^\circ = -1$, vì $135^\circ$ ngoài khoảng chính).
4. **$\arcsin(-\frac{1}{2})$** — $\sin(-30^\circ) = -\frac{1}{2}$ và $-30^\circ \in [-90, 90]$ ⟶ $\arcsin(-\frac{1}{2}) = -30^\circ$.

⚠ **Lỗi thường gặp — tưởng $\sin^{-1} x = \frac{1}{\sin x}$**. Ký hiệu $\sin^{-1}$ nghĩa là **hàm ngược** (arcsin), KHÔNG phải nghịch đảo. Nghịch đảo của $\sin x$ là $\csc x = \frac{1}{\sin x}$ (cosecant), hoàn toàn khác. Phản ví dụ: $\sin^{-1}(0.5) = 30^\circ$, còn $\frac{1}{\sin(0.5 \text{ rad})} \approx \frac{1}{0.479} \approx 2.086$ — không liên quan gì nhau.

⚠ **Lỗi thường gặp — quên máy tính chỉ trả về giá trị chính**. Giải $\sin x = \frac{1}{2}$ trong $[0, 2\pi]$, bấm máy ra $\arcsin(0.5) = 30^\circ$ rồi dừng → **thiếu nghiệm** $150^\circ$. Máy chỉ cho 1 nghiệm (giá trị chính); nghiệm còn lại phải tự suy bằng đối xứng đường tròn ($180^\circ - 30^\circ = 150^\circ$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao miền của arccos là $[0, 180^\circ]$ mà arcsin lại là $[-90^\circ, 90^\circ]$?"* Vì phải chọn một khoảng mà hàm gốc **đơn điệu** (tăng hoặc giảm liên tục, không lặp) để mỗi giá trị ứng đúng 1 góc. cos giảm đều trên $[0, 180^\circ]$; sin tăng đều trên $[-90^\circ, 90^\circ]$. Mỗi hàm có khoảng đẹp riêng.
- *"$\arcsin(2)$ bằng mấy?"* **Không tồn tại**. Vì $\sin\theta$ luôn trong $[-1, 1]$, không góc nào cho $\sin = 2$. Miền xác định của arcsin/arccos là $[-1, 1]$.

🔁 **Dừng lại tự kiểm tra**

1. $\arccos(-1)$ bằng mấy?
2. Giải $\cos x = \frac{\sqrt{2}}{2}$ trong $[0, 2\pi]$ — có mấy nghiệm, là những góc nào?

<details><summary>Đáp án</summary>

1. Tìm $\theta \in [0^\circ, 180^\circ]$ có $\cos\theta = -1$ ⟶ $\theta = 180^\circ = \pi$. Vậy $\arccos(-1) = \pi$.
2. Giá trị chính $\arccos(\frac{\sqrt{2}}{2}) = 45^\circ$ (QI). cos dương ở QI và QIV ⟶ nghiệm thứ hai $360^\circ - 45^\circ = 315^\circ$. Hai nghiệm: $45^\circ$ và $315^\circ$ (tức $\frac{\pi}{4}$ và $\frac{7\pi}{4}$).

</details>

### 📝 Tóm tắt mục 7

- arcsin/arccos/arctan là hàm **ngược**: cho tỉ số, trả về góc.
- Giá trị chính: $\arcsin \in [-90^\circ, 90^\circ]$, $\arccos \in [0^\circ, 180^\circ]$, $\arctan \in (-90^\circ, 90^\circ)$.
- $\sin^{-1}$ là arcsin, KHÔNG phải $\frac{1}{\sin}$; máy tính chỉ trả 1 nghiệm — tự suy nghiệm còn lại.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính $\sin(\frac{2\pi}{3})$, $\cos(\frac{2\pi}{3})$, $\tan(\frac{2\pi}{3})$.

**Bài 2**: Đồ thị $y = 2\cdot\sin(3x)$. Biên độ và chu kỳ?

**Bài 3**: $y = \sin x + \cos x$. Biên độ là bao nhiêu? (Gợi ý: dùng công thức $A\cdot\sin(x+\varphi)$.)

**Bài 4**: $\cos x = -\frac{1}{2}$. Tìm x trong $[0, 2\pi]$.

**Bài 5**: Trong góc phần tư III, $\sin x = -\frac{3}{5}$. Tính $\cos x$, $\tan x$.

**Bài 6**: Tính $\arcsin(\frac{\sqrt{2}}{2})$, $\arccos(-\frac{1}{2})$, $\arctan(\sqrt{3})$ (cho kết quả theo độ).

**Bài 7**: Một con dốc trượt tuyết cao $30$ m, mặt dốc dài $60$ m. Góc nghiêng của dốc so với mặt ngang là bao nhiêu?

### Lời giải

**Bài 1**: $\frac{2\pi}{3} = 120^\circ$.  
- $\sin(120^\circ) = \sin(180-60) = \sin 60^\circ = $ **$\frac{\sqrt{3}}{2}$**.  
- $\cos(120^\circ) = -\cos 60^\circ = $ **$-\frac{1}{2}$**.  
- $\tan = \frac{\sin}{\cos} = $ **$-\sqrt{3}$**.

**Bài 2**: $A = 2$, $T = \frac{2\pi}{3}$.

**Bài 3**: $\sin x + \cos x = \sqrt{2}\cdot\sin(x + \frac{\pi}{4})$. Biên độ $= $ **$\sqrt{2}$**.

**Bài 4**: $\cos x = -\frac{1}{2}$ → $x = \frac{2\pi}{3}$ hoặc $x = \frac{4\pi}{3}$.

**Bài 5**: $\sin^2 + \cos^2 = 1$ → $\cos^2 = 1 - \frac{9}{25} = \frac{16}{25}$ → $\cos = \pm\frac{4}{5}$. Phần tư III: $\cos < 0$ → $\cos = $ **$-\frac{4}{5}$**. $\tan = \frac{\sin}{\cos} = \frac{-3/5}{-4/5} = $ **$\frac{3}{4}$**.

**Bài 6**:
- $\arcsin(\frac{\sqrt{2}}{2})$: tìm góc trong $[-90^\circ, 90^\circ]$ có sin $= \frac{\sqrt{2}}{2}$ → $\sin 45^\circ = \frac{\sqrt{2}}{2}$ → **$45^\circ$**.
- $\arccos(-\frac{1}{2})$: tìm góc trong $[0^\circ, 180^\circ]$ có cos $= -\frac{1}{2}$ → $\cos 120^\circ = -\frac{1}{2}$ → **$120^\circ$**.
- $\arctan(\sqrt{3})$: tìm góc trong $(-90^\circ, 90^\circ)$ có tan $= \sqrt{3}$ → $\tan 60^\circ = \sqrt{3}$ → **$60^\circ$**.

**Bài 7**: Độ cao là cạnh đối, mặt dốc là cạnh huyền → $\sin\theta = \frac{\text{đối}}{\text{huyền}} = \frac{30}{60} = \frac{1}{2}$. Vậy $\theta = \arcsin(\frac{1}{2}) = $ **$30^\circ$**. (Bài toán đảo điển hình: biết tỉ số, dùng hàm ngược tìm góc.)

---

## 9. Bài tiếp theo

[Lesson 03 — Đồng nhất thức](../lesson-03-trig-identities/) — công thức cộng, nhân đôi, hạ bậc.

## 📝 Tổng kết

1. **sin, cos, tan** định nghĩa qua đường tròn lượng giác, áp dụng mọi $\theta \in \mathbb{R}$.
2. **Chu kỳ**: sin & cos $= 2\pi$, tan $= \pi$.
3. **Bảng giá trị**: $0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}$ — nhớ thuộc lòng.
4. **$A\cdot\sin(\omega\cdot x + \varphi)$**: mô hình sóng. A = biên độ, $\omega$ = tần số, $\varphi$ = pha.
5. **ASTC**: dấu sin/cos/tan trên 4 góc phần tư.
6. **Hàm ngược** arcsin/arccos/arctan: cho tỉ số → trả về góc, với giá trị chính giới hạn ($\arcsin \in [-90^\circ, 90^\circ]$, $\arccos \in [0^\circ, 180^\circ]$).
7. **Giá trị đặc biệt** suy từ hai tam giác: 45-45-90 (cạnh $1, 1, \sqrt{2}$) và 30-60-90 (cạnh $1, \sqrt{3}, 2$).
