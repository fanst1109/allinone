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

<svg viewBox="0 0 400 300" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường tròn đơn vị: điểm M=(cos θ, sin θ), cos θ là hình chiếu xuống trục x (bóng ngang), sin θ là hình chiếu lên trục y (bóng dọc)">
<defs><marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker></defs>
<line x1="65.0" y1="30" x2="65.0" y2="270" stroke="#e2e8f0"/>
<line x1="40" y1="45.0" x2="330" y2="45.0" stroke="#e2e8f0"/>
<line x1="117.5" y1="30" x2="117.5" y2="270" stroke="#e2e8f0"/>
<line x1="40" y1="97.5" x2="330" y2="97.5" stroke="#e2e8f0"/>
<line x1="170.0" y1="30" x2="170.0" y2="270" stroke="#e2e8f0"/>
<line x1="40" y1="150.0" x2="330" y2="150.0" stroke="#e2e8f0"/>
<line x1="222.5" y1="30" x2="222.5" y2="270" stroke="#e2e8f0"/>
<line x1="40" y1="202.5" x2="330" y2="202.5" stroke="#e2e8f0"/>
<line x1="275.0" y1="30" x2="275.0" y2="270" stroke="#e2e8f0"/>
<line x1="40" y1="255.0" x2="330" y2="255.0" stroke="#e2e8f0"/>
<line x1="40" y1="150" x2="335" y2="150" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar1)"/>
<line x1="170" y1="275" x2="170" y2="20" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar1)"/>
<text x="330" y="166" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
<text x="178" y="30" font-size="13" font-weight="700" fill="#1a202c">y</text>
<circle cx="170" cy="150" r="105" fill="none" stroke="#cbd5e0" stroke-width="1.6"/>
<circle cx="275" cy="150" r="3" fill="#1a202c"/>
<text x="281" y="168" font-size="11" fill="#475569" text-anchor="start">(1,0)</text>
<circle cx="65" cy="150" r="3" fill="#1a202c"/>
<text x="59" y="168" font-size="11" fill="#475569" text-anchor="end">(−1,0)</text>
<text x="176" y="39" font-size="11" fill="#475569">(0,1)</text>
<text x="176" y="269" font-size="11" fill="#475569">(0,−1)</text>
<text x="164" y="166" font-size="12" font-weight="700" fill="#1a202c" text-anchor="end">O</text>
<path d="M 204 150 A 34 34 0 0 0 191.9 124.0" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<text x="208.3" y="138.1" font-size="13" fill="#dc2626" font-weight="700">θ</text>
<line x1="170" y1="150" x2="237.5" y2="69.6" stroke="#1d4ed8" stroke-width="2.2"/>
<text x="189.7" y="105.8" font-size="11" fill="#1d4ed8" font-weight="700">1</text>
<line x1="237.5" y1="69.6" x2="237.5" y2="150" stroke="#15803d" stroke-width="2" stroke-dasharray="5 3"/>
<line x1="170" y1="150" x2="237.5" y2="150" stroke="#dc2626" stroke-width="3"/>
<line x1="237.5" y1="69.6" x2="170" y2="69.6" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
<circle cx="237.5" cy="69.6" r="4.5" fill="#1d4ed8"/>
<text x="245.5" y="65.6" font-size="12" fill="#1d4ed8" font-weight="700">M = (cos θ, sin θ)</text>
<text x="245.5" y="113.8" font-size="11" fill="#15803d" font-weight="700">sin θ = tung độ</text>
<text x="245.5" y="127.8" font-size="10" fill="#15803d">(bóng dọc)</text>
<text x="203.7" y="180" font-size="11" fill="#dc2626" font-weight="700" text-anchor="middle">cos θ = hoành độ</text>
<text x="203.7" y="193" font-size="10" fill="#dc2626" text-anchor="middle">(bóng ngang)</text>
<circle cx="237.5" cy="150" r="3" fill="#dc2626"/>
</svg>

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

<svg viewBox="0 0 400 285" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tam giác vuông cân 45-45-90: hai cạnh góc vuông dài 1, cạnh huyền √2">
<polygon points="60,210 230,210 230,40" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M 218 210 L 218 198 L 230 198" fill="none" stroke="#475569" stroke-width="1.2"/>
<path d="M 94.0 210.0 A 34 34 0 0 0 84.0 186.0" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<path d="M 206.0 64.0 A 34 34 0 0 0 230.0 74.0" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<text x="145" y="232" font-size="12" fill="#15803d" text-anchor="middle" font-weight="700">1  (cạnh góc vuông)</text>
<text x="240" y="130" font-size="12" fill="#15803d" text-anchor="start" font-weight="700">1</text>
<text x="252" y="130" font-size="11" fill="#15803d" text-anchor="start" font-weight="400">(cạnh góc vuông)</text>
<text x="128" y="115" font-size="13" fill="#dc2626" text-anchor="end" font-weight="700">c = √2</text>
<text x="128" y="131" font-size="11" fill="#dc2626" text-anchor="end" font-weight="400">(huyền)</text>
<text x="98" y="204" font-size="12" fill="#dc2626" text-anchor="start" font-weight="700">45°</text>
<text x="214" y="62" font-size="12" fill="#dc2626" text-anchor="end" font-weight="700">45°</text>
<text x="30" y="270" font-size="11" fill="#475569" text-anchor="start" font-weight="400">Cắt hình vuông cạnh 1 theo đường chéo → tam giác vuông cân</text>
</svg>

Theo Pythagore, cạnh huyền $c = \sqrt{1^2 + 1^2} = \sqrt{2}$. Áp SOH-CAH-TOA cho góc $45^\circ$:

$$\begin{aligned}
\sin 45^\circ &= \frac{\text{đối}}{\text{huyền}} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} \approx 0.707 \\
\cos 45^\circ &= \frac{\text{kề}}{\text{huyền}} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} \approx 0.707 \\
\tan 45^\circ &= \frac{\text{đối}}{\text{kề}} = \frac{1}{1} = 1
\end{aligned}$$

Vì hai cạnh góc vuông bằng nhau nên $\sin 45^\circ = \cos 45^\circ$ — điều này hợp lý: $45^\circ$ là góc "cân bằng" giữa ngang và dọc trên đường tròn, điểm M nằm đúng trên đường phân giác $y = x$.

#### Tam giác 30-60-90 (cho góc 30° và 60°)

💡 **Trực giác**: lấy một **tam giác đều** cạnh 2, hạ đường cao từ một đỉnh ⟶ cắt đôi thành hai tam giác vuông $30$-$60$-$90$. Cạnh huyền = 2 (cạnh tam giác đều), cạnh đáy ngắn = 1 (nửa cạnh đáy).

<svg viewBox="0 0 400 295" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tam giác vuông 30-60-90: cạnh đáy 1, đường cao √3, cạnh huyền 2; góc 60° ở đáy, góc 30° ở đỉnh">
<polygon points="60,225 155,225 155,61" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M 143 225 L 143 213 L 155 213" fill="none" stroke="#475569" stroke-width="1.2"/>
<path d="M 88.0 225.0 A 28 28 0 0 0 74.0 200.8" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<path d="M 135.0 95.6 A 40 40 0 0 0 155.0 101.0" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<text x="107.5" y="247" font-size="12" fill="#15803d" text-anchor="middle" font-weight="700">1  (nửa cạnh đáy)</text>
<text x="165" y="140" font-size="13" fill="#15803d" text-anchor="start" font-weight="700">h = √3</text>
<text x="165" y="157" font-size="11" fill="#475569" text-anchor="start" font-weight="400">h = √(2² − 1²)</text>
<text x="95.5" y="120" font-size="13" fill="#dc2626" text-anchor="end" font-weight="700">2</text>
<text x="95.5" y="136" font-size="11" fill="#dc2626" text-anchor="end" font-weight="400">(huyền)</text>
<text x="90" y="214" font-size="12" fill="#dc2626" text-anchor="start" font-weight="700">60°</text>
<text x="147" y="101" font-size="12" fill="#dc2626" text-anchor="end" font-weight="700">30°</text>
<text x="20" y="280" font-size="11" fill="#475569" text-anchor="start" font-weight="400">Tam giác đều cạnh 2, hạ đường cao → hai tam giác vuông 30-60-90</text>
</svg>

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

<svg viewBox="0 0 640 260" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y = sin x từ 0 đến 3π: qua gốc O, đỉnh 1 tại π/2, về 0 tại π, đáy −1 tại 3π/2, về 0 tại 2π">
<defs><marker id="ar4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker></defs>
<line x1="60.0" y1="39.0" x2="60.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="150.0" y1="39.0" x2="150.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="240.0" y1="39.0" x2="240.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="330.0" y1="39.0" x2="330.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="420.0" y1="39.0" x2="420.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="510.0" y1="39.0" x2="510.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="600.0" y1="39.0" x2="600.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="42.8" y1="200.0" x2="611.5" y2="200.0" stroke="#e2e8f0"/>
<line x1="42.8" y1="60.0" x2="611.5" y2="60.0" stroke="#e2e8f0"/>
<line x1="37.1" y1="130" x2="628.6" y2="130" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar4)"/>
<line x1="60" y1="235.0" x2="60" y2="7.5" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar4)"/>
<text x="624.6" y="148" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
<text x="68" y="17.5" font-size="13" font-weight="700" fill="#1a202c">y</text>
<line x1="60.0" y1="126" x2="60.0" y2="134" stroke="#1a202c"/>
<text x="68.0" y="148" font-size="11" fill="#475569" text-anchor="middle">0</text>
<line x1="150.0" y1="126" x2="150.0" y2="134" stroke="#1a202c"/>
<text x="150.0" y="148" font-size="11" fill="#475569" text-anchor="middle">π/2</text>
<line x1="240.0" y1="126" x2="240.0" y2="134" stroke="#1a202c"/>
<text x="240.0" y="148" font-size="11" fill="#475569" text-anchor="middle">π</text>
<line x1="330.0" y1="126" x2="330.0" y2="134" stroke="#1a202c"/>
<text x="330.0" y="148" font-size="11" fill="#475569" text-anchor="middle">3π/2</text>
<line x1="420.0" y1="126" x2="420.0" y2="134" stroke="#1a202c"/>
<text x="420.0" y="148" font-size="11" fill="#475569" text-anchor="middle">2π</text>
<line x1="510.0" y1="126" x2="510.0" y2="134" stroke="#1a202c"/>
<text x="510.0" y="148" font-size="11" fill="#475569" text-anchor="middle">5π/2</text>
<line x1="600.0" y1="126" x2="600.0" y2="134" stroke="#1a202c"/>
<text x="600.0" y="148" font-size="11" fill="#475569" text-anchor="middle">3π</text>
<line x1="56" y1="60.0" x2="64" y2="60.0" stroke="#1a202c"/>
<text x="52" y="64.0" font-size="11" fill="#475569" text-anchor="end">1</text>
<line x1="56" y1="200.0" x2="64" y2="200.0" stroke="#1a202c"/>
<text x="52" y="204.0" font-size="11" fill="#475569" text-anchor="end">−1</text>
<polyline points="60.0,130.0 63.0,126.3 66.0,122.7 69.0,119.0 72.0,115.4 75.0,111.9 78.0,108.4 81.0,104.9 84.0,101.5 87.0,98.2 90.0,95.0 93.0,91.9 96.0,88.9 99.0,85.9 102.0,83.2 105.0,80.5 108.0,78.0 111.0,75.6 114.0,73.4 117.0,71.3 120.0,69.4 123.0,67.6 126.0,66.1 129.0,64.6 132.0,63.4 135.0,62.4 138.0,61.5 141.0,60.9 144.0,60.4 147.0,60.1 150.0,60.0 153.0,60.1 156.0,60.4 159.0,60.9 162.0,61.5 165.0,62.4 168.0,63.4 171.0,64.6 174.0,66.1 177.0,67.6 180.0,69.4 183.0,71.3 186.0,73.4 189.0,75.6 192.0,78.0 195.0,80.5 198.0,83.2 201.0,85.9 204.0,88.9 207.0,91.9 210.0,95.0 213.0,98.2 216.0,101.5 219.0,104.9 222.0,108.4 225.0,111.9 228.0,115.4 231.0,119.0 234.0,122.7 237.0,126.3 240.0,130.0 243.0,133.7 246.0,137.3 249.0,141.0 252.0,144.6 255.0,148.1 258.0,151.6 261.0,155.1 264.0,158.5 267.0,161.8 270.0,165.0 273.0,168.1 276.0,171.1 279.0,174.1 282.0,176.8 285.0,179.5 288.0,182.0 291.0,184.4 294.0,186.6 297.0,188.7 300.0,190.6 303.0,192.4 306.0,193.9 309.0,195.4 312.0,196.6 315.0,197.6 318.0,198.5 321.0,199.1 324.0,199.6 327.0,199.9 330.0,200.0 333.0,199.9 336.0,199.6 339.0,199.1 342.0,198.5 345.0,197.6 348.0,196.6 351.0,195.4 354.0,193.9 357.0,192.4 360.0,190.6 363.0,188.7 366.0,186.6 369.0,184.4 372.0,182.0 375.0,179.5 378.0,176.8 381.0,174.1 384.0,171.1 387.0,168.1 390.0,165.0 393.0,161.8 396.0,158.5 399.0,155.1 402.0,151.6 405.0,148.1 408.0,144.6 411.0,141.0 414.0,137.3 417.0,133.7 420.0,130.0 423.0,126.3 426.0,122.7 429.0,119.0 432.0,115.4 435.0,111.9 438.0,108.4 441.0,104.9 444.0,101.5 447.0,98.2 450.0,95.0 453.0,91.9 456.0,88.9 459.0,85.9 462.0,83.2 465.0,80.5 468.0,78.0 471.0,75.6 474.0,73.4 477.0,71.3 480.0,69.4 483.0,67.6 486.0,66.1 489.0,64.6 492.0,63.4 495.0,62.4 498.0,61.5 501.0,60.9 504.0,60.4 507.0,60.1 510.0,60.0 513.0,60.1 516.0,60.4 519.0,60.9 522.0,61.5 525.0,62.4 528.0,63.4 531.0,64.6 534.0,66.1 537.0,67.6 540.0,69.4 543.0,71.3 546.0,73.4 549.0,75.6 552.0,78.0 555.0,80.5 558.0,83.2 561.0,85.9 564.0,88.9 567.0,91.9 570.0,95.0 573.0,98.2 576.0,101.5 579.0,104.9 582.0,108.4 585.0,111.9 588.0,115.4 591.0,119.0 594.0,122.7 597.0,126.3 600.0,130.0" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
<line x1="150.0" y1="130" x2="150.0" y2="60.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="150.0" cy="60.0" r="3.5" fill="#dc2626"/>
<text x="150.0" y="51.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="middle">đỉnh = 1</text>
<line x1="330.0" y1="130" x2="330.0" y2="200.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="330.0" cy="200.0" r="3.5" fill="#dc2626"/>
<text x="330.0" y="215.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="middle">đáy = −1</text>
<line x1="510.0" y1="130" x2="510.0" y2="60.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="510.0" cy="60.0" r="3.5" fill="#dc2626"/>
<text x="510.0" y="51.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="middle">đỉnh = 1</text>
<text x="596.0" y="37.0" font-size="12" fill="#1d4ed8" font-weight="700" text-anchor="end">y = sin x</text>
</svg>

sin xuất phát từ 0, leo lên đỉnh 1 tại $\frac{\pi}{2}$, về 0 tại $\pi$, xuống đáy $-1$ tại $\frac{3\pi}{2}$, rồi về 0 tại $2\pi$ — đúng một vòng quanh đường tròn.

### 3.2. y = cos x

- **D** $= \mathbb{R}$, **E** $= [-1, 1]$.
- **Chu kỳ**: $2\pi$.
- **Chẵn**: $\cos(-x) = \cos x$. Đối xứng qua trục Oy.
- Đi qua $(0, 1)$, cực đại tại $x = 0$, cực tiểu tại $\pi$.
- **Liên hệ với sin**: $\cos x = \sin(x + \frac{\pi}{2})$. Cos sớm pha hơn sin $\frac{\pi}{2}$.

<svg viewBox="0 0 640 260" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y = cos x từ 0 đến 3π: khởi đầu ở đỉnh 1 tại x = 0, về 0 tại π/2, đáy −1 tại π, đỉnh 1 tại 2π, đáy −1 tại 3π">
<defs><marker id="ar5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker></defs>
<line x1="60.0" y1="39.0" x2="60.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="150.0" y1="39.0" x2="150.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="240.0" y1="39.0" x2="240.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="330.0" y1="39.0" x2="330.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="420.0" y1="39.0" x2="420.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="510.0" y1="39.0" x2="510.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="600.0" y1="39.0" x2="600.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="42.8" y1="200.0" x2="611.5" y2="200.0" stroke="#e2e8f0"/>
<line x1="42.8" y1="60.0" x2="611.5" y2="60.0" stroke="#e2e8f0"/>
<line x1="37.1" y1="130" x2="628.6" y2="130" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
<line x1="60" y1="235.0" x2="60" y2="7.5" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar5)"/>
<text x="624.6" y="148" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
<text x="68" y="17.5" font-size="13" font-weight="700" fill="#1a202c">y</text>
<line x1="60.0" y1="126" x2="60.0" y2="134" stroke="#1a202c"/>
<text x="68.0" y="148" font-size="11" fill="#475569" text-anchor="middle">0</text>
<line x1="150.0" y1="126" x2="150.0" y2="134" stroke="#1a202c"/>
<text x="150.0" y="148" font-size="11" fill="#475569" text-anchor="middle">π/2</text>
<line x1="240.0" y1="126" x2="240.0" y2="134" stroke="#1a202c"/>
<text x="240.0" y="148" font-size="11" fill="#475569" text-anchor="middle">π</text>
<line x1="330.0" y1="126" x2="330.0" y2="134" stroke="#1a202c"/>
<text x="330.0" y="148" font-size="11" fill="#475569" text-anchor="middle">3π/2</text>
<line x1="420.0" y1="126" x2="420.0" y2="134" stroke="#1a202c"/>
<text x="420.0" y="148" font-size="11" fill="#475569" text-anchor="middle">2π</text>
<line x1="510.0" y1="126" x2="510.0" y2="134" stroke="#1a202c"/>
<text x="510.0" y="148" font-size="11" fill="#475569" text-anchor="middle">5π/2</text>
<line x1="600.0" y1="126" x2="600.0" y2="134" stroke="#1a202c"/>
<text x="600.0" y="148" font-size="11" fill="#475569" text-anchor="middle">3π</text>
<line x1="56" y1="60.0" x2="64" y2="60.0" stroke="#1a202c"/>
<text x="52" y="64.0" font-size="11" fill="#475569" text-anchor="end">1</text>
<line x1="56" y1="200.0" x2="64" y2="200.0" stroke="#1a202c"/>
<text x="52" y="204.0" font-size="11" fill="#475569" text-anchor="end">−1</text>
<polyline points="60.0,60.0 63.0,60.1 66.0,60.4 69.0,60.9 72.0,61.5 75.0,62.4 78.0,63.4 81.0,64.6 84.0,66.1 87.0,67.6 90.0,69.4 93.0,71.3 96.0,73.4 99.0,75.6 102.0,78.0 105.0,80.5 108.0,83.2 111.0,85.9 114.0,88.9 117.0,91.9 120.0,95.0 123.0,98.2 126.0,101.5 129.0,104.9 132.0,108.4 135.0,111.9 138.0,115.4 141.0,119.0 144.0,122.7 147.0,126.3 150.0,130.0 153.0,133.7 156.0,137.3 159.0,141.0 162.0,144.6 165.0,148.1 168.0,151.6 171.0,155.1 174.0,158.5 177.0,161.8 180.0,165.0 183.0,168.1 186.0,171.1 189.0,174.1 192.0,176.8 195.0,179.5 198.0,182.0 201.0,184.4 204.0,186.6 207.0,188.7 210.0,190.6 213.0,192.4 216.0,193.9 219.0,195.4 222.0,196.6 225.0,197.6 228.0,198.5 231.0,199.1 234.0,199.6 237.0,199.9 240.0,200.0 243.0,199.9 246.0,199.6 249.0,199.1 252.0,198.5 255.0,197.6 258.0,196.6 261.0,195.4 264.0,193.9 267.0,192.4 270.0,190.6 273.0,188.7 276.0,186.6 279.0,184.4 282.0,182.0 285.0,179.5 288.0,176.8 291.0,174.1 294.0,171.1 297.0,168.1 300.0,165.0 303.0,161.8 306.0,158.5 309.0,155.1 312.0,151.6 315.0,148.1 318.0,144.6 321.0,141.0 324.0,137.3 327.0,133.7 330.0,130.0 333.0,126.3 336.0,122.7 339.0,119.0 342.0,115.4 345.0,111.9 348.0,108.4 351.0,104.9 354.0,101.5 357.0,98.2 360.0,95.0 363.0,91.9 366.0,88.9 369.0,85.9 372.0,83.2 375.0,80.5 378.0,78.0 381.0,75.6 384.0,73.4 387.0,71.3 390.0,69.4 393.0,67.6 396.0,66.1 399.0,64.6 402.0,63.4 405.0,62.4 408.0,61.5 411.0,60.9 414.0,60.4 417.0,60.1 420.0,60.0 423.0,60.1 426.0,60.4 429.0,60.9 432.0,61.5 435.0,62.4 438.0,63.4 441.0,64.6 444.0,66.1 447.0,67.6 450.0,69.4 453.0,71.3 456.0,73.4 459.0,75.6 462.0,78.0 465.0,80.5 468.0,83.2 471.0,85.9 474.0,88.9 477.0,91.9 480.0,95.0 483.0,98.2 486.0,101.5 489.0,104.9 492.0,108.4 495.0,111.9 498.0,115.4 501.0,119.0 504.0,122.7 507.0,126.3 510.0,130.0 513.0,133.7 516.0,137.3 519.0,141.0 522.0,144.6 525.0,148.1 528.0,151.6 531.0,155.1 534.0,158.5 537.0,161.8 540.0,165.0 543.0,168.1 546.0,171.1 549.0,174.1 552.0,176.8 555.0,179.5 558.0,182.0 561.0,184.4 564.0,186.6 567.0,188.7 570.0,190.6 573.0,192.4 576.0,193.9 579.0,195.4 582.0,196.6 585.0,197.6 588.0,198.5 591.0,199.1 594.0,199.6 597.0,199.9 600.0,200.0" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
<line x1="60.0" y1="130" x2="60.0" y2="60.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="60.0" cy="60.0" r="3.5" fill="#dc2626"/>
<text x="60.0" y="51.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="start">đỉnh = 1</text>
<line x1="240.0" y1="130" x2="240.0" y2="200.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="240.0" cy="200.0" r="3.5" fill="#dc2626"/>
<text x="240.0" y="215.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="middle">đáy = −1</text>
<line x1="420.0" y1="130" x2="420.0" y2="60.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="420.0" cy="60.0" r="3.5" fill="#dc2626"/>
<text x="420.0" y="51.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="middle">đỉnh = 1</text>
<line x1="600.0" y1="130" x2="600.0" y2="200.0" stroke="#94a3b8" stroke-dasharray="4 3"/>
<circle cx="600.0" cy="200.0" r="3.5" fill="#dc2626"/>
<text x="600.0" y="215.0" font-size="11" fill="#dc2626" font-weight="700" text-anchor="end">đáy = −1</text>
<text x="596.0" y="37.0" font-size="12" fill="#1d4ed8" font-weight="700" text-anchor="end">y = cos x</text>
</svg>

cos chỉ là sin **trượt sang trái $\frac{\pi}{2}$**: nó khởi đầu ngay ở đỉnh 1 (vì $\cos 0 = 1$), trong khi sin khởi đầu ở 0.

### 3.3. y = tan x

- **D** $= \mathbb{R} \setminus \{\frac{\pi}{2} + k\pi\}$, **E** $= \mathbb{R}$.
- **Chu kỳ**: $\pi$ (ngắn hơn sin/cos!).
- **Lẻ**: $\tan(-x) = -\tan x$.
- **Tiệm cận đứng** tại $x = \frac{\pi}{2} + k\pi$ (nơi cos = 0).

<svg viewBox="0 0 640 260" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y = tan x: các nhánh lặp chu kỳ π, tiệm cận đứng nét đứt tại −π/2, π/2, 3π/2; mỗi nhánh đi từ −∞ lên +∞">
<defs><marker id="ar6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker></defs>
<line x1="60.0" y1="39.0" x2="60.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="150.0" y1="39.0" x2="150.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="240.0" y1="39.0" x2="240.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="330.0" y1="39.0" x2="330.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="420.0" y1="39.0" x2="420.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="510.0" y1="39.0" x2="510.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="600.0" y1="39.0" x2="600.0" y2="221.0" stroke="#e2e8f0"/>
<line x1="42.8" y1="200.0" x2="611.5" y2="200.0" stroke="#e2e8f0"/>
<line x1="42.8" y1="60.0" x2="611.5" y2="60.0" stroke="#e2e8f0"/>
<line x1="37.1" y1="130" x2="628.6" y2="130" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
<line x1="60" y1="235.0" x2="60" y2="7.5" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar6)"/>
<text x="624.6" y="148" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
<text x="68" y="17.5" font-size="13" font-weight="700" fill="#1a202c">y</text>
<line x1="-30.0" y1="126" x2="-30.0" y2="134" stroke="#1a202c"/>
<text x="-30.0" y="148" font-size="11" fill="#475569" text-anchor="middle">−π/2</text>
<line x1="60.0" y1="126" x2="60.0" y2="134" stroke="#1a202c"/>
<text x="68.0" y="148" font-size="11" fill="#475569" text-anchor="middle">0</text>
<line x1="150.0" y1="126" x2="150.0" y2="134" stroke="#1a202c"/>
<text x="150.0" y="148" font-size="11" fill="#475569" text-anchor="middle">π/2</text>
<line x1="240.0" y1="126" x2="240.0" y2="134" stroke="#1a202c"/>
<text x="240.0" y="148" font-size="11" fill="#475569" text-anchor="middle">π</text>
<line x1="330.0" y1="126" x2="330.0" y2="134" stroke="#1a202c"/>
<text x="330.0" y="148" font-size="11" fill="#475569" text-anchor="middle">3π/2</text>
<line x1="420.0" y1="126" x2="420.0" y2="134" stroke="#1a202c"/>
<text x="420.0" y="148" font-size="11" fill="#475569" text-anchor="middle">2π</text>
<line x1="56" y1="60.0" x2="64" y2="60.0" stroke="#1a202c"/>
<text x="52" y="64.0" font-size="11" fill="#475569" text-anchor="end">1</text>
<line x1="56" y1="200.0" x2="64" y2="200.0" stroke="#1a202c"/>
<text x="52" y="204.0" font-size="11" fill="#475569" text-anchor="end">−1</text>
<line x1="-30.0" y1="21.5" x2="-30.0" y2="235.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="-26.0" y="33.5" font-size="10" fill="#94a3b8">tiệm cận</text>
<line x1="150.0" y1="21.5" x2="150.0" y2="235.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="154.0" y="33.5" font-size="10" fill="#94a3b8">tiệm cận</text>
<line x1="330.0" y1="21.5" x2="330.0" y2="235.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="334.0" y="33.5" font-size="10" fill="#94a3b8">tiệm cận</text>
<polyline points="-12.4,229.1 -9.5,214.2 -6.6,202.7 -3.7,193.7 -0.8,186.3 2.1,180.2 5.0,175.0 7.9,170.5 10.8,166.5 13.7,163.0 16.6,159.8 19.5,156.9 22.4,154.3 25.3,151.8 28.2,149.6 31.1,147.4 33.9,145.4 36.8,143.5 39.7,141.6 42.6,139.9 45.5,138.1 48.4,136.5 51.3,134.8 54.2,133.2 57.1,131.6 60.0,130.0 62.9,128.4 65.8,126.8 68.7,125.2 71.6,123.5 74.5,121.9 77.4,120.1 80.3,118.4 83.2,116.5 86.1,114.6 88.9,112.6 91.8,110.4 94.7,108.2 97.6,105.7 100.5,103.1 103.4,100.2 106.3,97.0 109.2,93.5 112.1,89.5 115.0,85.0 117.9,79.8 120.8,73.7 123.7,66.3 126.6,57.3 129.5,45.8 132.4,30.9" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
<polyline points="167.6,229.1 170.5,214.2 173.4,202.7 176.3,193.7 179.2,186.3 182.1,180.2 185.0,175.0 187.9,170.5 190.8,166.5 193.7,163.0 196.6,159.8 199.5,156.9 202.4,154.3 205.3,151.8 208.2,149.6 211.1,147.4 213.9,145.4 216.8,143.5 219.7,141.6 222.6,139.9 225.5,138.1 228.4,136.5 231.3,134.8 234.2,133.2 237.1,131.6 240.0,130.0 242.9,128.4 245.8,126.8 248.7,125.2 251.6,123.5 254.5,121.9 257.4,120.1 260.3,118.4 263.2,116.5 266.1,114.6 268.9,112.6 271.8,110.4 274.7,108.2 277.6,105.7 280.5,103.1 283.4,100.2 286.3,97.0 289.2,93.5 292.1,89.5 295.0,85.0 297.9,79.8 300.8,73.7 303.7,66.3 306.6,57.3 309.5,45.8 312.4,30.9" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
<polyline points="347.6,229.1 350.5,214.2 353.4,202.7 356.3,193.7 359.2,186.3 362.1,180.2 365.0,175.0 367.9,170.5 370.8,166.5 373.7,163.0 376.6,159.8 379.5,156.9 382.4,154.3 385.3,151.8 388.2,149.6 391.1,147.4 393.9,145.4 396.8,143.5 399.7,141.6 402.6,139.9 405.5,138.1 408.4,136.5 411.3,134.8 414.2,133.2 417.1,131.6 420.0,130.0 422.9,128.4 425.8,126.8 428.7,125.2 431.6,123.5 434.5,121.9 437.4,120.1 440.3,118.4 443.2,116.5 446.1,114.6 448.9,112.6 451.8,110.4 454.7,108.2 457.6,105.7 460.5,103.1 463.4,100.2 466.3,97.0 469.2,93.5 472.1,89.5 475.0,85.0 477.9,79.8 480.8,73.7 483.7,66.3 486.6,57.3 489.5,45.8 492.4,30.9" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
<text x="109.0" y="92.5" font-size="11" fill="#dc2626" font-weight="700">tan(π/4) = 1</text>
<circle cx="105.0" cy="98.5" r="3.5" fill="#dc2626"/>
<circle cx="285.0" cy="98.5" r="3.5" fill="#dc2626"/>
<text x="289.0" y="92.5" font-size="11" fill="#dc2626" font-weight="700">tan(5π/4) = 1</text>
<text x="338.0" y="214.0" font-size="11" fill="#475569">chu kỳ π, không bị chặn</text>
</svg>

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

<svg viewBox="0 0 320 235" style="max-width:340px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Tam giác vuông với góc θ: cạnh đối a, cạnh kề b, cạnh huyền c">
<polygon points="230,190 80,190 80,50" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M 92 190 L 92 178 L 80 178" fill="none" stroke="#475569" stroke-width="1.2"/>
<path d="M 203.7 165.4 A 36 36 0 0 0 194.0 190.0" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<text x="155.0" y="214" font-size="13" fill="#15803d" text-anchor="middle" font-weight="700">b  (kề)</text>
<text x="70" y="125" font-size="13" fill="#15803d" text-anchor="end" font-weight="700">a</text>
<text x="70" y="142" font-size="11" fill="#475569" text-anchor="end" font-weight="400">(đối)</text>
<text x="170" y="108" font-size="13" fill="#dc2626" text-anchor="start" font-weight="700">c (huyền)</text>
<text x="190" y="184" font-size="14" fill="#dc2626" text-anchor="end" font-weight="700">θ</text>
</svg>

- $\sin\theta = \frac{a}{c}$ (đối/huyền).
- $\cos\theta = \frac{b}{c}$ (kề/huyền).
- $\tan\theta = \frac{a}{b}$ (đối/kề).

⟶ **Trùng với định nghĩa qua đường tròn** (vì điểm trên đường tròn đơn vị tạo tam giác vuông).

**Verify trùng khớp bằng số**: tam giác 3-4-5 (a=3 đối, b=4 kề, c=5 huyền). $\sin\theta = \frac{3}{5} = 0.6$, $\cos\theta = \frac{4}{5} = 0.8$. Kiểm Pythagore lượng giác: $0.6^2 + 0.8^2 = 0.36 + 0.64 = 1$ ✓ — đúng như điểm trên đường tròn đơn vị.

💡 **Mẹo SOH-CAH-TOA bằng hình** — gắn nhãn 3 cạnh quanh góc $\theta$:

<svg viewBox="0 0 620 260" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Mẹo SOH-CAH-TOA: cạnh đối (opposite) không chạm góc θ, cạnh kề (adjacent) liền kề θ, cạnh huyền (hypotenuse) đối diện góc vuông; Sin = Đối/Huyền, Cos = Kề/Huyền, Tan = Đối/Kề">
<polygon points="300,200 110,200 110,50" fill="#dbeafe" fill-opacity="0.5" stroke="#1d4ed8" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M 122 200 L 122 188 L 110 188" fill="none" stroke="#475569" stroke-width="1.2"/>
<path d="M 268.5 175.4 A 40 40 0 0 0 260.0 200.0" fill="none" stroke="#dc2626" stroke-width="1.6"/>
<text x="205.0" y="224" font-size="13" fill="#15803d" text-anchor="middle" font-weight="700">KỀ (adjacent)</text>
<text x="205.0" y="240" font-size="11" fill="#475569" text-anchor="middle" font-weight="400">liền kề góc θ</text>
<text x="98" y="115" font-size="13" fill="#1d4ed8" text-anchor="end" font-weight="700">ĐỐI</text>
<text x="98" y="131" font-size="11" fill="#1d4ed8" text-anchor="end" font-weight="400">(opposite)</text>
<text x="98" y="147" font-size="11" fill="#475569" text-anchor="end" font-weight="400">đối diện θ</text>
<text x="222" y="110" font-size="13" fill="#dc2626" text-anchor="start" font-weight="700">HUYỀN</text>
<text x="222" y="126" font-size="11" fill="#dc2626" text-anchor="start" font-weight="400">(hypotenuse)</text>
<text x="256" y="194" font-size="14" fill="#dc2626" text-anchor="end" font-weight="700">θ</text>
<text x="380" y="95" font-size="13" fill="#1d4ed8" text-anchor="start" font-weight="700">SOH: Sin = Đối / Huyền</text>
<text x="380" y="125" font-size="13" fill="#15803d" text-anchor="start" font-weight="700">CAH: Cos = Kề / Huyền</text>
<text x="380" y="155" font-size="13" fill="#dc2626" text-anchor="start" font-weight="700">TOA: Tan = Đối / Kề</text>
<rect x="368" y="70" width="230" height="105" rx="8" fill="none" stroke="#cbd5e0"/>
</svg>

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

<svg viewBox="0 0 400 310" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Mẹo ASTC: bốn góc phần tư, QI All (sin, cos, tan đều dương), QII Sin dương, QIII Tan dương, QIV Cos dương, đọc ngược chiều kim đồng hồ">
<defs><marker id="ar9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/></marker></defs>
<rect x="190" y="30" width="130" height="120" fill="#dcfce7" fill-opacity="0.6"/>
<rect x="60" y="30" width="130" height="120" fill="#dbeafe" fill-opacity="0.6"/>
<rect x="60" y="150" width="130" height="120" fill="#fee2e2" fill-opacity="0.6"/>
<rect x="190" y="150" width="130" height="120" fill="#fef3c7" fill-opacity="0.7"/>
<circle cx="190" cy="150" r="95" fill="none" stroke="#cbd5e0" stroke-dasharray="5 4"/>
<line x1="40" y1="150" x2="340" y2="150" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar9)"/>
<line x1="190" y1="280" x2="190" y2="20" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar9)"/>
<text x="336" y="166" font-size="13" font-weight="700" fill="#1a202c" text-anchor="end">x</text>
<text x="198" y="30" font-size="13" font-weight="700" fill="#1a202c">y</text>
<circle cx="190" cy="150" r="3.5" fill="#1a202c"/>
<text x="255" y="80" font-size="30" font-weight="800" fill="#15803d" text-anchor="middle">A</text>
<text x="255" y="98" font-size="12" font-weight="700" fill="#15803d" text-anchor="middle">(All +)</text>
<text x="255" y="114" font-size="10" fill="#475569" text-anchor="middle">QI: sin, cos, tan đều +</text>
<text x="125" y="80" font-size="30" font-weight="800" fill="#1d4ed8" text-anchor="middle">S</text>
<text x="125" y="98" font-size="12" font-weight="700" fill="#1d4ed8" text-anchor="middle">(Sin +)</text>
<text x="125" y="114" font-size="10" fill="#475569" text-anchor="middle">QII: chỉ sin +</text>
<text x="125" y="205" font-size="30" font-weight="800" fill="#dc2626" text-anchor="middle">T</text>
<text x="125" y="223" font-size="12" font-weight="700" fill="#dc2626" text-anchor="middle">(Tan +)</text>
<text x="125" y="239" font-size="10" fill="#475569" text-anchor="middle">QIII: chỉ tan +</text>
<text x="255" y="205" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">C</text>
<text x="255" y="223" font-size="12" font-weight="700" fill="#b45309" text-anchor="middle">(Cos +)</text>
<text x="255" y="239" font-size="10" fill="#475569" text-anchor="middle">QIV: chỉ cos +</text>
<path d="M 302 120 A 116 116 0 0 0 220 38" fill="none" stroke="#475569" stroke-width="1.4" marker-end="url(#ar9)"/>
<text x="298" y="58" font-size="10" fill="#475569" text-anchor="start">ngược chiều</text>
<text x="298" y="70" font-size="10" fill="#475569" text-anchor="start">kim đồng hồ</text>
<text x="200" y="298" font-size="11" fill="#475569" text-anchor="middle">A → S → T → C: "All Students Take Calculus"</text>
</svg>

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
