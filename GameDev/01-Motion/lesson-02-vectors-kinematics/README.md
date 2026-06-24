# Lesson 02 — Vectors & Kinematics (vector chuyển động 2D)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** mọi vật trong game (nhân vật, đạn, hạt khói) đều được mô tả bằng **vector 2D**: vị trí, vận tốc, gia tốc.
- Thành thạo các phép trên vector 2D: cộng, trừ, nhân vô hướng (scalar), độ dài (magnitude), chuẩn hoá (normalize), góc/hướng.
- Hiểu **kinematics** (động học) trong game loop: mỗi frame cập nhật `v += a·Δt; p += v·Δt` — đây là tích phân Euler thô.
- Mô phỏng **ném xiên (projectile)**: vận tốc đầu + gia tốc trọng trường → quỹ đạo parabol, tính tầm xa và độ cao cực đại.
- Chuyển **góc → vector vận tốc** $(\cos\theta, \sin\theta) \cdot speed$ để di chuyển nhân vật theo input.
- Tránh bug kinh điển: **đi chéo nhanh gấp √2** khi quên chuẩn hoá vector input.

## Kiến thức tiền đề

- [L01 — Game Loop & Timestep](../lesson-01-game-loop-timestep/) — bài này dùng `Δt` (delta time) từ game loop. Nếu chưa rõ vì sao phải nhân `Δt`, đọc L01 trước.
- [Vectors/04 — Vectors (cơ bản)](../../../Vectors/04-LinearAlgebra/lesson-01-vectors/) — định nghĩa vector, phép cộng/nhân scalar tổng quát (n chiều). Bài này áp dụng riêng cho 2D.
- [Vectors/04 — Norm & Distance](../../../Vectors/04-LinearAlgebra/lesson-03-norm-distance/) — độ dài (norm) và khoảng cách, nền cho magnitude/normalize.
- [Physics — Kinematics](../../../Physics/01-Mechanics/lesson-01-kinematics/) — công thức động học vật lý ($v = v_0 + at$, $s = v_0 t + \frac{1}{2}at^2$); ở đây ta rời rạc hoá chúng theo frame.

---

## 1. Vì sao mọi thứ trong game là vector 2D?

> 💡 **Trực giác / Hình dung**
> Hãy hình dung nhân vật Mario đang đi **chéo lên-phải**: vừa tiến sang phải, vừa nhảy lên. Tốc độ "sang phải" và tốc độ "lên trên" là **hai con số riêng biệt** nhưng xảy ra **cùng lúc**. Gói hai con số đó vào một cặp `(x, y)` — đó chính là **vector**. Vận tốc không phải một số, nó là một **mũi tên**: có hướng (chéo lên-phải) và độ lớn (đi nhanh hay chậm).

Đặt vấn đề cụ thể (sẽ giải đáp ngay trong bài này):

> *"Nhân vật bấm giữ phím Phải + phím Lên cùng lúc. Nó di chuyển nhanh thế nào, theo hướng nào? Tốc độ ngang `vx` và tốc độ dọc `vy` cộng lại ra sao? Liệu đi chéo có nhanh hơn đi thẳng không?"*

Trả lời ngắn (chi tiết ở §2 và §6): vận tốc tổng là vector `(vx, vy)`. Độ lớn của nó là $\sqrt{v_x^2 + v_y^2}$. Nếu `vx = vy = 200` thì tốc độ chéo = $\sqrt{200^2 + 200^2} = 200\sqrt{2} \approx 283$ — **nhanh hơn đi thẳng (200) gấp √2 lần**. Đó là một **bug** nếu ta không xử lý (xem §6).

Trong một game, **mọi đại lượng có hướng** đều là vector 2D:

| Đại lượng | Ký hiệu | Ý nghĩa | Đơn vị (ví dụ) |
| --- | --- | --- | --- |
| Vị trí (position) | $\vec{p} = (p_x, p_y)$ | vật đang ở đâu trên màn hình | pixel |
| Vận tốc (velocity) | $\vec{v} = (v_x, v_y)$ | vị trí thay đổi nhanh thế nào & hướng nào | pixel/giây |
| Gia tốc (acceleration) | $\vec{a} = (a_x, a_y)$ | vận tốc thay đổi nhanh thế nào (vd trọng lực) | pixel/giây² |

Ba đại lượng này liên kết với nhau qua **kinematics** (§3): gia tốc làm đổi vận tốc, vận tốc làm đổi vị trí. Toàn bộ "vật lý" cơ bản của game chỉ là cập nhật ba vector này mỗi frame.

> 📝 **Tóm tắt mục 1**
> - Vector 2D = cặp `(x, y)`, biểu diễn một **mũi tên** có hướng + độ lớn.
> - Vị trí, vận tốc, gia tốc đều là vector 2D.
> - Đi chéo (nếu không xử lý) nhanh hơn đi thẳng √2 lần — bug sẽ giải ở §6.

---

## 2. Vector 2D và các phép toán

> 💡 **Trực giác / Hình dung**
> Một vector 2D `(x, y)` giống một **chỉ dẫn đi đường**: "đi sang phải `x` bước, rồi lên trên `y` bước". Cộng hai vector = nối hai chỉ dẫn lại (đi cái thứ nhất xong đi tiếp cái thứ hai). Nhân với một số = phóng to/thu nhỏ độ dài bước mà giữ nguyên hướng.

### 2.1. Định nghĩa

Vector 2D là cặp số thực $\vec{v} = (x, y)$. Hai thành phần `x` (ngang) và `y` (dọc) **độc lập**.

> ⚠ **Lỗi thường gặp — trục y hướng xuống trong canvas**
> Trong toán học quen thuộc, trục `y` hướng **lên**. Nhưng trong hệ toạ độ màn hình/canvas, gốc `(0,0)` ở **góc trên-trái** và `y` **tăng dần khi đi xuống**. Vì vậy "rơi xuống" là `y` **tăng** → trọng lực có `a = (0, +g)` (dương), và "nhảy lên" là `vy` **âm**. Toàn bộ bài này dùng quy ước canvas: **y hướng xuống**.

### 2.2. Cộng và trừ — cộng từng thành phần

$$\vec{a} + \vec{b} = (a_x + b_x,\; a_y + b_y) \qquad \vec{a} - \vec{b} = (a_x - b_x,\; a_y - b_y)$$

**4 ví dụ số:**

1. $(3, 4) + (1, 2) = (4, 6)$.
2. $(200, 0) + (0, -150) = (200, -150)$ — đi phải + nhảy lên (y âm vì lên).
3. $(5, -3) - (2, 1) = (3, -4)$.
4. $(-10, -10) + (10, 10) = (0, 0)$ — hai vận tốc ngược nhau triệt tiêu → đứng yên.

Ý nghĩa game: muốn biết "đi từ A tới B cần vector gì?" → lấy $\vec{B} - \vec{A}$. Vd quái vật ở `(300, 100)`, người chơi ở `(50, 220)`: vector từ quái tới người = $(50, 220) - (300, 100) = (-250, 120)$ → "đi sang trái 250, xuống 120".

### 2.3. Nhân vô hướng (scalar multiplication) — phóng to/thu nhỏ

$$k \cdot \vec{v} = (k \cdot x,\; k \cdot y)$$

**4 ví dụ số:**

1. $2 \cdot (3, 4) = (6, 8)$ — dài gấp đôi, cùng hướng.
2. $0.5 \cdot (10, -20) = (5, -10)$ — ngắn một nửa.
3. $-1 \cdot (3, 4) = (-3, -4)$ — đảo ngược hướng (180°), giữ độ dài.
4. $0 \cdot (99, 99) = (0, 0)$ — co về gốc.

Ý nghĩa game: $\vec v \cdot \Delta t$ (vận tốc nhân thời gian frame) chính là nhân scalar — ra **quãng đường đi trong frame đó**.

### 2.4. Độ dài (magnitude / norm)

> 💡 Magnitude trả lời câu hỏi *"mũi tên này dài bao nhiêu?"* — tức **tốc độ** nếu vector là vận tốc. Nó là cạnh huyền của tam giác vuông có hai cạnh `x` và `y` (định lý Pythagoras).

$$|\vec{v}| = \sqrt{x^2 + y^2}$$

**4 ví dụ số:**

1. $|(3, 4)| = \sqrt{9 + 16} = \sqrt{25} = 5$.
2. $|(5, 12)| = \sqrt{25 + 144} = \sqrt{169} = 13$.
3. $|(1, 1)| = \sqrt{2} \approx 1.414$.
4. $|(0, -7)| = \sqrt{0 + 49} = 7$ — vector dọc, độ dài = trị tuyệt đối thành phần.

Đây chính là **norm** trong [Vectors/04 — Norm & Distance](../../../Vectors/04-LinearAlgebra/lesson-03-norm-distance/), áp dụng cho 2 chiều.

> ⚠ **Lỗi thường gặp:** so sánh độ dài bằng $|\vec v|$ đòi phải tính `sqrt` (chậm). Khi chỉ cần **so sánh** (vd "vật nào gần hơn?"), so **bình phương độ dài** $x^2 + y^2$ là đủ và nhanh hơn — vì `sqrt` đơn điệu tăng. Chỉ tính `sqrt` khi cần con số thật.

### 2.5. Chuẩn hoá (normalize) — lấy hướng, vứt độ dài

> 💡 Chuẩn hoá biến một vector thành **vector đơn vị (unit vector)** — cùng hướng nhưng độ dài đúng bằng **1**. Hình dung: bạn chỉ quan tâm "đi hướng nào" chứ không quan tâm "đi bao xa" → ép độ dài về 1, rồi tự nhân với tốc độ mong muốn sau.

$$\hat{v} = \frac{\vec{v}}{|\vec{v}|} = \left(\frac{x}{|\vec{v}|},\; \frac{y}{|\vec{v}|}\right)$$

**4 ví dụ số:**

1. $\widehat{(3, 4)} = (3/5,\; 4/5) = (0.6,\; 0.8)$. Kiểm tra độ dài: $\sqrt{0.6^2 + 0.8^2} = \sqrt{0.36 + 0.64} = \sqrt{1} = 1$ ✓.
2. $\widehat{(0, -10)} = (0,\; -1)$ — hướng thẳng lên (y âm), độ dài 1.
3. $\widehat{(1, 1)} = (1/\sqrt{2},\; 1/\sqrt{2}) \approx (0.707,\; 0.707)$. Kiểm tra: $0.707^2 \cdot 2 \approx 1$ ✓.
4. $\widehat{(6, 8)} = (6/10,\; 8/10) = (0.6,\; 0.8)$ — cùng kết quả ví dụ 1 vì cùng hướng (chỉ khác độ dài).

> ⚠ **Lỗi thường gặp — chia cho 0**: vector `(0, 0)` không có hướng, $|\vec{0}| = 0$ → normalize sẽ chia cho 0 (NaN). Luôn kiểm tra `if len > 0` trước khi chia.

### 2.6. Hướng (góc) ↔ vector

Vector `(x, y)` có góc $\theta = \text{atan2}(y, x)$ (đo từ trục x dương, ngược chiều kim đồng hồ trong toán; nhưng nhớ y hướng xuống trong canvas nên trông như cùng chiều kim đồng hồ).

Ngược lại, từ góc + tốc độ → vector (xem §5):
$$\vec{v} = (\cos\theta,\; \sin\theta) \cdot \text{speed}$$

> 🔁 **Dừng lại tự kiểm tra**
> 1. Tính $|(8, 6)|$ và chuẩn hoá nó.
> 2. Vector `(0, 5)` trong canvas trỏ lên hay xuống?
>
> <details><summary>Đáp án</summary>
>
> 1. $|(8,6)| = \sqrt{64+36} = \sqrt{100} = 10$. Chuẩn hoá: $(8/10, 6/10) = (0.8, 0.6)$.
> 2. Trỏ **xuống** — vì trong canvas y dương = đi xuống. Muốn trỏ lên phải là `(0, -5)`.
> </details>

> 📝 **Tóm tắt mục 2**
> - Cộng/trừ: theo từng thành phần. Nhân scalar: phóng to/thu nhỏ giữ hướng.
> - Độ dài $|\vec v| = \sqrt{x^2+y^2}$ = tốc độ; so sánh thì dùng bình phương cho nhanh.
> - Normalize $\hat v = \vec v / |\vec v|$ → unit vector (độ dài 1); coi chừng chia 0.
> - Canvas: **y hướng xuống**, lên = y âm.

---

## 3. Kinematics — cập nhật vị trí mỗi frame

> 💡 **Trực giác / Hình dung**
> Tưởng tượng một chiếc xe: **chân ga** (gia tốc) làm **tốc độ** (vận tốc) tăng dần; **tốc độ** làm **vị trí** thay đổi. Mỗi frame là một "lát thời gian" `Δt`. Trong lát đó: vận tốc được cộng thêm một chút do gia tốc, rồi vị trí được cộng thêm một chút do vận tốc. Lặp lại 60 lần/giây → chuyển động mượt.

### 3.1. Hai dòng "thần chú"

Mỗi frame (mỗi vòng game loop, xem [L01](../lesson-01-game-loop-timestep/)), với `Δt` = thời gian frame (giây):

```text
v += a · Δt      // gia tốc đổi vận tốc
p += v · Δt      // vận tốc đổi vị trí
```

Đây là **tích phân Euler (semi-implicit)** — ở Lesson 03 ta sẽ so sánh với Verlet và bàn vì sao thứ tự hai dòng quan trọng. Tạm thời chấp nhận: cập nhật `v` trước, rồi dùng `v` mới cập nhật `p`.

Vì đây là **vector**, mỗi dòng tách thành 2 phép cho x và y:

```text
vx += ax · Δt        vy += ay · Δt
px += vx · Δt        py += vy · Δt
```

### 3.2. Walk-through bằng số thật

Cho:
- $\vec{p}_0 = (0, 0)$ (gốc trên-trái)
- $\vec{v}_0 = (50, -80)$ (đi phải 50, đi lên 80 — nhớ y âm = lên)
- $\vec{a} = (0, 200)$ (trọng lực kéo xuống, y dương = xuống)
- $\Delta t = 0.1$ giây

**Frame 1:**
- $v_x = 50 + 0 \cdot 0.1 = 50$. $v_y = -80 + 200 \cdot 0.1 = -80 + 20 = -60$. → $\vec{v}_1 = (50, -60)$.
- $p_x = 0 + 50 \cdot 0.1 = 5$. $p_y = 0 + (-60) \cdot 0.1 = -6$. → $\vec{p}_1 = (5, -6)$.

**Frame 2:**
- $v_x = 50 + 0 = 50$. $v_y = -60 + 200 \cdot 0.1 = -60 + 20 = -40$. → $\vec{v}_2 = (50, -40)$.
- $p_x = 5 + 50 \cdot 0.1 = 10$. $p_y = -6 + (-40) \cdot 0.1 = -6 - 4 = -10$. → $\vec{p}_2 = (10, -10)$.

**Frame 3:**
- $v_x = 50$. $v_y = -40 + 20 = -20$. → $\vec{v}_3 = (50, -20)$.
- $p_x = 10 + 5 = 15$. $p_y = -10 + (-20)(0.1) = -10 - 2 = -12$. → $\vec{p}_3 = (15, -12)$.

**Frame 4:**
- $v_x = 50$. $v_y = -20 + 20 = 0$. → $\vec{v}_4 = (50, 0)$ — **đỉnh cao nhất**, vận tốc dọc = 0.
- $p_x = 15 + 5 = 20$. $p_y = -12 + 0 = -12$. → $\vec{p}_4 = (20, -12)$ (cao nhất, y nhỏ nhất = -12).

**Frame 5:**
- $v_x = 50$. $v_y = 0 + 20 = 20$. → bắt đầu **rơi xuống** (vy dương).
- $p_x = 20 + 5 = 25$. $p_y = -12 + 20 \cdot 0.1 = -12 + 2 = -10$. → $\vec{p}_5 = (25, -10)$.

Bảng tổng hợp:

| Frame | $\vec v = (v_x, v_y)$ | $\vec p = (p_x, p_y)$ | Ghi chú |
| --- | --- | --- | --- |
| 0 | (50, −80) | (0, 0) | xuất phát |
| 1 | (50, −60) | (5, −6) | đang lên |
| 2 | (50, −40) | (10, −10) | đang lên |
| 3 | (50, −20) | (15, −12) | gần đỉnh |
| 4 | (50, 0) | (20, −12) | **đỉnh** (vy=0) |
| 5 | (50, 20) | (25, −10) | bắt đầu rơi |

Quan sát: `vx` không đổi (không có gia tốc ngang); `vy` tăng đều +20 mỗi frame; quỹ đạo `p` là một **parabol** mở xuống (vì y âm = lên).

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao nhân `Δt`? Bỏ đi có sao không?"* → Vì `v` đơn vị pixel/**giây**, mà mỗi frame chỉ trôi `Δt` giây. Bỏ `Δt` → vật bay với tốc độ phụ thuộc frame rate (60fps nhanh gấp đôi 30fps). Xem [L01](../lesson-01-game-loop-timestep/).
> - *"Kết quả này có chính xác như vật lý thật không?"* → Không hoàn toàn. Euler tích luỹ sai số nhỏ mỗi frame; `Δt` càng lớn sai càng nhiều. Lesson 03 (Verlet) cải thiện.
> - *"Sao lại cập nhật `v` trước `p`?"* → Đây là semi-implicit Euler, ổn định hơn cho lực như trọng lực/lò xo. Chi tiết ở Lesson 03.

> ⚠ **Lỗi thường gặp:** cập nhật `p += v·Δt` **trước** rồi mới `v += a·Δt` (Euler tường minh) cho kết quả hơi khác và kém ổn định với lò xo. Giữ đúng thứ tự `v` trước, `p` sau.

> 🔁 **Dừng lại tự kiểm tra**
> Với $\vec p_0=(0,0)$, $\vec v_0=(10,10)$, $\vec a=(0,100)$, $\Delta t=0.5$: tính $\vec v_1, \vec p_1$.
>
> <details><summary>Đáp án</summary>
>
> $v_x = 10 + 0 = 10$; $v_y = 10 + 100 \cdot 0.5 = 60$ → $\vec v_1=(10,60)$.
> $p_x = 0 + 10 \cdot 0.5 = 5$; $p_y = 0 + 60 \cdot 0.5 = 30$ → $\vec p_1=(5,30)$.
> </details>

> 📝 **Tóm tắt mục 3**
> - Mỗi frame: `v += a·Δt` rồi `p += v·Δt` (cho cả x và y).
> - Trọng lực = gia tốc dọc cố định `(0, +g)` (y dương = xuống trong canvas).
> - Quỹ đạo dưới gia tốc cố định là **parabol**.
> - Đây là Euler thô — sai số nhỏ, Lesson 03 cải thiện.

---

## 4. Ném xiên (projectile) — quỹ đạo parabol

> 💡 **Trực giác / Hình dung**
> Bắn một viên đạn đại bác: ban đầu nó có vận tốc theo hướng nòng súng. Trọng lực kéo nó xuống đều đặn. Kết quả: viên đạn đi lên chậm dần, đứng yên (theo phương dọc) ở đỉnh, rồi rơi nhanh dần — vẽ thành một **đường cong parabol**. Phương ngang đi đều (không có lực cản), phương dọc thì như §3.

### 4.1. Thiết lập

Vận tốc đầu từ góc bắn $\theta$ và tốc độ $s$ (xem §5):
$$\vec{v}_0 = (s\cos\theta,\; -s\sin\theta)$$
(dấu trừ ở `y` vì góc dương = bắn lên, mà lên là y âm trong canvas).

Gia tốc chỉ có trọng lực: $\vec{a} = (0, g)$ với $g > 0$.

### 4.2. Công thức tầm xa và độ cao max (vật lý liên tục)

Từ [Physics — Kinematics](../../../Physics/01-Mechanics/lesson-01-kinematics/), với tốc độ đầu $s$, góc $\theta$, gia tốc $g$ (bắn từ mặt đất):

- **Thời gian bay** (đến khi chạm đất lại): $T = \dfrac{2 s \sin\theta}{g}$.
- **Tầm xa (range)**: $R = \dfrac{s^2 \sin(2\theta)}{g}$ — cực đại khi $\theta = 45°$.
- **Độ cao cực đại**: $H = \dfrac{(s\sin\theta)^2}{2g} = \dfrac{s^2 \sin^2\theta}{2g}$.

### 4.3. Walk-through bằng số thật

Cho $s = 100$ (pixel/s), $\theta = 30°$, $g = 200$ (pixel/s²). Biết $\sin 30° = 0.5$, $\cos 30° \approx 0.866$, $\sin 60° \approx 0.866$.

- Vận tốc đầu: $v_{0x} = 100 \cdot 0.866 = 86.6$; $v_{0y} = -100 \cdot 0.5 = -50$ (lên). → $\vec v_0 = (86.6,\; -50)$.
- Thời gian bay: $T = \dfrac{2 \cdot 100 \cdot 0.5}{200} = \dfrac{100}{200} = 0.5$ giây.
- Tầm xa: $R = \dfrac{100^2 \cdot \sin 60°}{200} = \dfrac{10000 \cdot 0.866}{200} = \dfrac{8660}{200} = 43.3$ pixel.
   - Kiểm chứng cách khác: $R = v_{0x} \cdot T = 86.6 \cdot 0.5 = 43.3$ ✓ (phương ngang đi đều).
- Độ cao max: $H = \dfrac{100^2 \cdot 0.5^2}{2 \cdot 200} = \dfrac{10000 \cdot 0.25}{400} = \dfrac{2500}{400} = 6.25$ pixel.
   - Kiểm chứng: thời gian đến đỉnh $= v_{0y}/g = 50/200 = 0.25$s (= nửa T ✓); $H = \tfrac12 g t^2 = \tfrac12 \cdot 200 \cdot 0.25^2 = 100 \cdot 0.0625 = 6.25$ ✓.

**4 ví dụ tầm xa (cùng $s=100, g=200$), thấy 45° xa nhất:**

| Góc $\theta$ | $\sin 2\theta$ | $R = \frac{s^2 \sin 2\theta}{g}$ |
| --- | --- | --- |
| 15° | $\sin 30° = 0.5$ | $\frac{10000 \cdot 0.5}{200} = 25$ |
| 30° | $\sin 60° = 0.866$ | $43.3$ |
| 45° | $\sin 90° = 1.0$ | $\frac{10000}{200} = 50$ ← **xa nhất** |
| 60° | $\sin 120° = 0.866$ | $43.3$ (đối xứng với 30°) |

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Vì sao 45° xa nhất?"* → Vì $R \propto \sin(2\theta)$, mà $\sin$ đạt cực đại 1 tại $2\theta = 90° \Rightarrow \theta = 45°$.
> - *"Vì sao 30° và 60° cùng tầm xa?"* → Vì $\sin(2\cdot30°)=\sin60°=\sin120°=\sin(2\cdot60°)$ — cặp góc bù nhau $(\theta, 90°-\theta)$ luôn cùng range.
> - *"Trong game thật có dùng công thức kín này không?"* → Phần lớn **không** — game chỉ chạy vòng lặp `v += a·Δt; p += v·Δt` mỗi frame (§3) và để quỹ đạo tự xuất hiện. Công thức kín chỉ dùng khi cần biết trước điểm rơi (vd AI ngắm bắn).

> ⚠ **Lỗi thường gặp:** quên dấu trừ ở `v0y`. Nếu viết $v_{0y} = s \cdot \sin\theta$ (dương) trong canvas, đạn sẽ bắn **xuống đất** ngay thay vì lên trời. Nhớ: góc bắn lên → `vy` âm.

> 🔁 **Dừng lại tự kiểm tra**
> Với $s = 200$, $\theta = 45°$, $g = 200$: tính tầm xa $R$ và độ cao max $H$. ($\sin 90° = 1$, $\sin 45° \approx 0.707$.)
>
> <details><summary>Đáp án</summary>
>
> $R = \frac{200^2 \cdot 1}{200} = \frac{40000}{200} = 200$ pixel.
> $v_{0y} = 200 \cdot 0.707 = 141.4$; $H = \frac{141.4^2}{2 \cdot 200} = \frac{20000}{400} = 50$ pixel.
> </details>

> 📝 **Tóm tắt mục 4**
> - Ném xiên = vận tốc đầu theo góc + trọng lực không đổi → parabol.
> - $R = \frac{s^2\sin2\theta}{g}$ (max ở 45°), $H = \frac{s^2\sin^2\theta}{2g}$, $T = \frac{2s\sin\theta}{g}$.
> - Game thường mô phỏng bằng vòng lặp Euler, không dùng công thức kín.

---

## 5. Vận tốc theo hướng — di chuyển nhân vật theo input

> 💡 **Trực giác / Hình dung**
> Cần trục (joystick) hoặc chuột chỉ cho bạn một **hướng** (góc). Nhưng vật chuyển động cần một **vector vận tốc**. Chuyển góc → vector: đi theo hướng đó với "bước" $(\cos\theta, \sin\theta)$ (đây là điểm trên đường tròn đơn vị), rồi nhân với tốc độ mong muốn.

### 5.1. Công thức

$$\vec{v} = (\cos\theta,\; \sin\theta) \cdot \text{speed}$$

Trong canvas (y xuống), góc 0° = sang phải, 90° = **xuống** (vì sin dương = y dương = xuống). Để "bắn lên" với góc đo theo kiểu toán, ta thường phủ định y: $v_y = -\sin\theta \cdot speed$.

**4 ví dụ số** (tốc độ `speed = 100`):

1. $\theta = 0°$: $(\cos 0°, \sin 0°) \cdot 100 = (1, 0) \cdot 100 = (100, 0)$ — sang phải.
2. $\theta = 90°$: $(\cos 90°, \sin 90°) \cdot 100 = (0, 1) \cdot 100 = (0, 100)$ — đi **xuống** (canvas).
3. $\theta = 45°$: $(\cos 45°, \sin 45°) \cdot 100 = (0.707, 0.707) \cdot 100 = (70.7, 70.7)$ — chéo xuống-phải. Kiểm tra độ dài: $\sqrt{70.7^2 \cdot 2} = \sqrt{10000} = 100$ ✓ (đúng bằng speed).
4. $\theta = 180°$: $(\cos 180°, \sin 180°) \cdot 100 = (-1, 0) \cdot 100 = (-100, 0)$ — sang trái.

> ⚠ **Lỗi thường gặp:** trộn lẫn độ (degree) và radian. `Math.cos` trong JS/Go nhận **radian**. Đổi: $\text{rad} = \theta_{deg} \cdot \pi / 180$. Quên đổi → hướng sai bét.

### 5.2. Di chuyển theo phím WASD

Cách thông dụng hơn cho game top-down: đọc input thành vector hướng rồi nhân tốc độ.

```text
dir = (0, 0)
nếu giữ A (trái):  dir.x -= 1
nếu giữ D (phải):  dir.x += 1
nếu giữ W (lên):   dir.y -= 1     // y âm = lên
nếu giữ S (xuống): dir.y += 1
// (chuẩn hoá dir ở đây — xem §6!)
v = dir · speed
p += v · Δt
```

Nếu chỉ bấm D: `dir = (1, 0)` → đi phải tốc độ `speed`. Nếu bấm W+D: `dir = (1, -1)` → **độ dài $\sqrt 2$**, nên phải chuẩn hoá (§6) để không đi chéo nhanh hơn.

> 📝 **Tóm tắt mục 5**
> - Góc → vector: $(\cos\theta, \sin\theta)\cdot\text{speed}$; nhớ đổi độ ↔ radian.
> - Top-down: gom input phím thành `dir`, **chuẩn hoá**, rồi nhân `speed`.
> - Canvas: lên = y âm, nên $v_y = -\sin\theta \cdot speed$ nếu góc đo kiểu toán.

---

## 6. Bug kinh điển: đi chéo nhanh gấp √2

> 💡 **Trực giác / Hình dung**
> Nhấn phím Phải, vật đi với tốc độ 200. Nhấn phím Lên, cũng 200. Nhấn **cả hai cùng lúc** — bạn nghĩ vật vẫn đi 200 theo hướng chéo? Không! Hai tốc độ cộng theo Pythagoras, ra $\sqrt{200^2 + 200^2} = 200\sqrt 2 \approx 283$. Vật đi chéo **nhanh hơn 41%** so với đi thẳng — người chơi sẽ "lách chéo" để chạy nhanh hơn. Đây là bug có trong vô số game đầu tay.

### 6.1. Vì sao xảy ra

Nếu cộng trực tiếp `dir = (1, 1)` rồi nhân speed:
$$\vec{v} = (1, 1) \cdot 200 = (200, 200), \quad |\vec{v}| = \sqrt{200^2 + 200^2} = 200\sqrt{2} \approx 283$$

Trong khi đi thẳng $(1, 0) \cdot 200 = (200, 0)$, độ dài đúng 200.

### 6.2. Cách sửa — chuẩn hoá hướng trước khi nhân tốc độ

Chuẩn hoá `dir` về độ dài 1 **trước** khi nhân speed:
$$\hat{dir} = \frac{(1,1)}{|(1,1)|} = \frac{(1,1)}{\sqrt 2} = (0.707, 0.707), \quad \vec v = \hat{dir} \cdot 200 = (141.4, 141.4)$$
$$|\vec v| = \sqrt{141.4^2 + 141.4^2} = \sqrt{40000} = 200 \;\checkmark$$

Bây giờ đi chéo cũng đúng 200 — bằng đi thẳng.

**Bảng so sánh (speed = 200):**

| Input | `dir` thô | Không normalize → tốc độ | Có normalize → tốc độ |
| --- | --- | --- | --- |
| Phải | (1, 0) | $|(200,0)| = 200$ | 200 |
| Phải + Lên | (1, −1) | $|(200,-200)| = 283$ ✗ | $|(141.4,-141.4)| = 200$ ✓ |
| Phải + Xuống | (1, 1) | 283 ✗ | 200 ✓ |
| Lên (chỉ một phím) | (0, −1) | 200 | 200 |

> ⚠ **Lỗi thường gặp:** chuẩn hoá khi `dir = (0,0)` (không bấm phím nào) → chia cho 0 → NaN → vật biến mất. Luôn `if |dir| > 0` mới chuẩn hoá; nếu không thì `v = (0,0)`.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Game thật có cố tình giữ bug này không?"* → Hiếm. Một số speedrun lợi dụng nó (vd "strafe jumping" trong Quake) nhưng đó là quyết định thiết kế, không phải mặc định nên có.
> - *"Có cần normalize khi dùng joystick analog không?"* → Joystick analog đã cho vector có độ dài ≤ 1 sẵn (tròn), nên **không** ép về 1 — chỉ **clamp** nếu vượt 1. Normalize cứng chỉ dùng cho input số (phím on/off).

> 🔁 **Dừng lại tự kiểm tra**
> Nhân vật bấm Trái + Xuống, speed = 300. Không normalize thì tốc độ thật bao nhiêu? Có normalize thì vector vận tốc là gì?
>
> <details><summary>Đáp án</summary>
>
> Không normalize: `dir=(-1,1)`, `v=(-300,300)`, tốc độ $=\sqrt{300^2+300^2}=300\sqrt2\approx424$ (nhanh sai).
> Có normalize: $\hat{dir}=(-0.707,0.707)$, `v=(-212.1, 212.1)`, tốc độ đúng 300.
> </details>

> 📝 **Tóm tắt mục 6**
> - Cộng input phím không chuẩn hoá → đi chéo nhanh gấp √2 (≈ 41%).
> - Sửa: chuẩn hoá `dir` về độ dài 1 **rồi** nhân speed.
> - Coi chừng chia 0 khi không có input; joystick analog thì clamp chứ không normalize.

---

## 7. Vector này dẫn tới đâu?

Vector + kinematics là **nền móng** cho toàn bộ Tier Motion và xa hơn:

- **[Lesson 03 — Integration (Euler/Verlet)](../lesson-03-integration-euler-verlet/)** (bài tiếp): vì sao Euler thô tích luỹ sai số, và Verlet/RK4 sửa thế nào. Hai dòng `v += a·Δt; p += v·Δt` ở §3 chính là Euler.
- **Lesson 04 — Lực (Forces)**: thay vì set gia tốc trực tiếp, ta cộng các **lực** (trọng lực, lò xo, ma sát) rồi $\vec a = \vec F / m$ (định luật II Newton). Gia tốc lại quay về vòng lặp này.
- **Tier 2 — Va chạm (Collision)**: phát hiện và phản hồi va chạm đều dùng vector — vector pháp tuyến, phản xạ vận tốc $\vec v' = \vec v - 2(\vec v \cdot \hat n)\hat n$ (cần tích vô hướng — học ở [Vectors/04](../../../Vectors/04-LinearAlgebra/lesson-01-vectors/)).

Toàn bộ đại số vector tổng quát (n chiều, tích vô hướng, tích có hướng, ma trận) nằm ở [Vectors/04 — Linear Algebra](../../../Vectors/04-LinearAlgebra/lesson-01-vectors/). Bài này chỉ là lát cắt 2D ứng dụng vào game.

---

## Bài tập

**Bài 1.** Cho $\vec a = (3, -4)$, $\vec b = (-1, 2)$, $k = 2$. Tính:
- $\vec a + \vec b$
- $\vec a - \vec b$
- $k \cdot \vec a$
- $|\vec a|$ (độ dài)
- $\hat a$ (chuẩn hoá $\vec a$)

**Bài 2.** Một vật có $\vec p_0 = (10, 50)$, $\vec v_0 = (30, -40)$, $\vec a = (0, 100)$ (trọng lực), $\Delta t = 0.2$s. Cập nhật theo Euler semi-implicit và liệt kê $\vec v, \vec p$ qua **3 frame** (frame 1, 2, 3). Cho biết frame nào vật đạt đỉnh (vy đổi dấu).

**Bài 3.** Bắn projectile với $s = 150$, $\theta = 30°$, $g = 250$. Tính thời gian bay $T$, tầm xa $R$, độ cao max $H$. ($\sin 30° = 0.5$, $\sin 60° \approx 0.866$.)

**Bài 4.** Với cùng $s$ và $g$, hai góc nào cho **cùng tầm xa** với $\theta = 20°$? Giải thích và tính tỉ lệ $R(20°) / R(45°)$. ($\sin 40° \approx 0.643$.)

**Bài 5.** Người chơi bấm phím **Phải + Lên** (`dir = (1, -1)`), `speed = 250`. Tính vector vận tốc khi (a) **không** chuẩn hoá và (b) **có** chuẩn hoá. So sánh độ lớn của hai trường hợp với tốc độ khi chỉ đi thẳng.

**Bài 6.** Chuyển góc $\theta = 120°$ (đo kiểu toán, ngược chiều kim đồng hồ từ trục x) với tốc độ 80 thành vector vận tốc trong **hệ canvas** (y hướng xuống, lên = y âm). ($\cos 120° = -0.5$, $\sin 120° \approx 0.866$.)

**Bài 7.** (Gỡ bug) Một đoạn code di chuyển nhân vật:
```text
dir = (0, 0)
nếu Right: dir.x += 1
nếu Up:    dir.y -= 1
v = dir · speed
p += v · Δt
```
Chỉ ra **2 lỗi tiềm ẩn** và cách sửa.

**Bài 8.** Quái vật ở $\vec p_m = (400, 300)$ muốn lao thẳng về phía người chơi ở $\vec p_c = (100, 180)$ với tốc độ 200. Tính vector vận tốc của quái (gợi ý: hướng = chuẩn hoá của $\vec p_c - \vec p_m$).

---

## Lời giải chi tiết

### Bài 1

$\vec a = (3, -4)$, $\vec b = (-1, 2)$, $k = 2$.

- $\vec a + \vec b = (3 + (-1),\; -4 + 2) = (2, -2)$.
- $\vec a - \vec b = (3 - (-1),\; -4 - 2) = (4, -6)$.
- $k \cdot \vec a = 2 \cdot (3, -4) = (6, -8)$.
- $|\vec a| = \sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.
- $\hat a = \vec a / |\vec a| = (3/5,\; -4/5) = (0.6,\; -0.8)$. Kiểm tra: $\sqrt{0.6^2 + 0.8^2} = \sqrt{1} = 1$ ✓.

### Bài 2

$\vec p_0 = (10, 50)$, $\vec v_0 = (30, -40)$, $\vec a = (0, 100)$, $\Delta t = 0.2$. Mỗi frame `vy += 100·0.2 = +20`; `vx` không đổi.

**Frame 1:**
- $v_x = 30$; $v_y = -40 + 20 = -20$ → $\vec v_1 = (30, -20)$.
- $p_x = 10 + 30 \cdot 0.2 = 16$; $p_y = 50 + (-20)(0.2) = 50 - 4 = 46$ → $\vec p_1 = (16, 46)$.

**Frame 2:**
- $v_x = 30$; $v_y = -20 + 20 = 0$ → $\vec v_2 = (30, 0)$ — **đỉnh** (vy = 0, sắp đổi dấu).
- $p_x = 16 + 6 = 22$; $p_y = 46 + 0 = 46$ → $\vec p_2 = (22, 46)$ (cao nhất, y nhỏ nhất).

**Frame 3:**
- $v_x = 30$; $v_y = 0 + 20 = 20$ → $\vec v_3 = (30, 20)$ — rơi xuống (vy dương).
- $p_x = 22 + 6 = 28$; $p_y = 46 + 20 \cdot 0.2 = 46 + 4 = 50$ → $\vec p_3 = (28, 50)$.

**Đỉnh ở frame 2** ($v_y = 0$). Sau đó vy dương = vật rơi xuống.

### Bài 3

$s = 150$, $\theta = 30°$, $g = 250$.

- $v_{0y} = s\sin\theta = 150 \cdot 0.5 = 75$ (độ lớn phương dọc).
- $T = \dfrac{2 s \sin\theta}{g} = \dfrac{2 \cdot 75}{250} = \dfrac{150}{250} = 0.6$ giây.
- $R = \dfrac{s^2 \sin 2\theta}{g} = \dfrac{150^2 \cdot \sin 60°}{250} = \dfrac{22500 \cdot 0.866}{250} = \dfrac{19485}{250} \approx 77.9$ pixel.
- $H = \dfrac{s^2 \sin^2\theta}{2g} = \dfrac{22500 \cdot 0.25}{500} = \dfrac{5625}{500} = 11.25$ pixel.

Kiểm chứng $R$: $v_{0x} = 150\cos30° = 150 \cdot 0.866 = 129.9$; $R = v_{0x} \cdot T = 129.9 \cdot 0.6 = 77.9$ ✓.

### Bài 4

Tầm xa $R \propto \sin(2\theta)$. Hai góc cho cùng range là cặp **bù về tổng 90°**: $\theta$ và $90° - \theta$, vì $\sin(2\theta) = \sin(180° - 2\theta) = \sin(2(90° - \theta))$.

- Với $\theta = 20°$: góc còn lại $= 90° - 20° = 70°$. Kiểm tra: $\sin 40° = \sin 140° = \sin(2 \cdot 70°)$ ✓.
- Tỉ lệ: $\dfrac{R(20°)}{R(45°)} = \dfrac{\sin 40°}{\sin 90°} = \dfrac{0.643}{1} = 0.643$.

→ Bắn góc 20° chỉ đi xa được 64.3% so với góc tối ưu 45°.

### Bài 5

`dir = (1, -1)`, `speed = 250`.

**(a) Không chuẩn hoá:**
- $\vec v = (1, -1) \cdot 250 = (250, -250)$.
- $|\vec v| = \sqrt{250^2 + 250^2} = 250\sqrt 2 \approx 353.6$.

**(b) Có chuẩn hoá:**
- $|(1,-1)| = \sqrt 2 \approx 1.414$; $\hat{dir} = (1/\sqrt2,\; -1/\sqrt2) \approx (0.707,\; -0.707)$.
- $\vec v = (0.707, -0.707) \cdot 250 = (176.8,\; -176.8)$.
- $|\vec v| = \sqrt{176.8^2 \cdot 2} = \sqrt{62500} = 250$ ✓.

**So sánh:** đi thẳng (chỉ một phím) tốc độ = 250. Không chuẩn hoá → đi chéo 353.6 (**nhanh hơn 41.4%** = √2 lần — bug). Có chuẩn hoá → đi chéo đúng 250 (bằng đi thẳng — đúng).

### Bài 6

$\theta = 120°$, speed 80, hệ canvas (lên = y âm → $v_y = -\sin\theta \cdot speed$).

- $v_x = \cos 120° \cdot 80 = -0.5 \cdot 80 = -40$.
- $v_y = -\sin 120° \cdot 80 = -0.866 \cdot 80 = -69.3$.
- $\vec v = (-40, -69.3)$ — đi sang **trái** và **lên** (vì y âm), hợp lý với góc 120° (góc phần tư II, chếch lên-trái).
- Kiểm tra độ dài: $\sqrt{40^2 + 69.3^2} = \sqrt{1600 + 4802} = \sqrt{6402} \approx 80$ ✓.

### Bài 7

Hai lỗi:

1. **Không chuẩn hoá `dir`** → khi bấm Right + Up đồng thời, `dir = (1, -1)`, độ dài $\sqrt2$, nhân speed ra tốc độ chéo $\approx 1.41 \times$ speed (bug đi chéo nhanh §6). **Sửa:** chuẩn hoá `dir` trước khi nhân speed: `if |dir|>0: dir = dir / |dir|`.

2. **Chia cho 0 khi không bấm phím nào** → `dir = (0,0)`, nếu thêm bước chuẩn hoá ngây thơ sẽ chia cho $|dir| = 0$ → NaN, vật biến mất. **Sửa:** chỉ chuẩn hoá khi `|dir| > 0`; nếu `dir = (0,0)` thì `v = (0,0)` (đứng yên).

Code sửa:
```text
dir = (0, 0)
nếu Right: dir.x += 1
nếu Up:    dir.y -= 1
nếu |dir| > 0:           // tránh chia 0
    dir = dir / |dir|    // chuẩn hoá → đi chéo không nhanh hơn
v = dir · speed
p += v · Δt
```

### Bài 8

Quái ở $\vec p_m = (400, 300)$, người chơi ở $\vec p_c = (100, 180)$, tốc độ 200.

1. Vector hướng (chưa chuẩn hoá): $\vec d = \vec p_c - \vec p_m = (100 - 400,\; 180 - 300) = (-300, -120)$.
2. Độ dài: $|\vec d| = \sqrt{(-300)^2 + (-120)^2} = \sqrt{90000 + 14400} = \sqrt{104400} \approx 323.1$.
3. Chuẩn hoá: $\hat d = (-300/323.1,\; -120/323.1) \approx (-0.9285,\; -0.3714)$.
4. Vận tốc: $\vec v = \hat d \cdot 200 \approx (-185.7,\; -74.3)$.

Kiểm tra độ dài: $\sqrt{185.7^2 + 74.3^2} = \sqrt{34484 + 5520} = \sqrt{40004} \approx 200$ ✓. Quái lao về phía người chơi (sang trái và lên) đúng tốc độ 200.

---

## Tham khảo và bài tiếp theo

- Bài trước: [L01 — Game Loop & Timestep](../lesson-01-game-loop-timestep/) — nguồn của `Δt`.
- **Bài tiếp theo: [L03 — Integration (Euler/Verlet)](../lesson-03-integration-euler-verlet/)** — cải thiện độ chính xác của vòng lặp `v += a·Δt; p += v·Δt`.
- Liên hệ nền tảng:
  - [Vectors/04 — Vectors](../../../Vectors/04-LinearAlgebra/lesson-01-vectors/) — đại số vector tổng quát, tích vô hướng (dùng cho phản xạ va chạm).
  - [Vectors/04 — Norm & Distance](../../../Vectors/04-LinearAlgebra/lesson-03-norm-distance/) — magnitude và khoảng cách.
  - [Physics — Kinematics](../../../Physics/01-Mechanics/lesson-01-kinematics/) — công thức động học liên tục.
- Minh họa tương tác: [visualization.html](./visualization.html) — 3 module: bắn projectile kéo vector vận tốc, vector playground (cộng + chuẩn hoá), và demo bug đi chéo gấp √2.
