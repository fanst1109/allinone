# Lesson 03 — Integration: Euler & Verlet (tích phân số cho chuyển động)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** máy tính không giải tích phân giải tích mà **cộng dồn từng bước nhỏ** $\Delta t$ để biến gia tốc → vận tốc → vị trí.
- Cài đặt và phân tích **3 bộ tích phân số (numerical integrator)** dùng nhiều nhất trong game:
  - **Explicit (forward) Euler** — đơn giản nhất, nhưng "phình năng lượng".
  - **Semi-implicit (symplectic) Euler** — chỉ đổi thứ tự cập nhật, ổn định hơn hẳn.
  - **Verlet integration** — không lưu vận tốc tường minh, rất ổn định, dễ làm ràng buộc.
- So sánh 3 phương pháp bằng số liệu thật trên **cùng một bài toán** (vật rơi, con lắc, quỹ đạo tròn).
- Hiểu vì sao $\Delta t$ nhỏ → chính xác hơn nhưng tốn, và vì sao **fixed timestep** (Lesson 01) là điều kiện sống còn cho ổn định.
- Biết khi nào nên dùng cái nào, và RK4 đứng ở đâu.

## Kiến thức tiền đề

- [Lesson 02 — Vectors & Kinematics](../lesson-02-vectors-kinematics/) — vận tốc, gia tốc, công thức $v = v_0 + at$, $p = p_0 + v_0 t + \tfrac{1}{2}at^2$.
- [Math/04 — Tích phân xác định (definite integral)](../../../Math/04-Calculus-1var/lesson-07-definite-integral/) — tổng Riemann (Riemann sum) chính là "cộng dồn từng lát mỏng". Đây là nền tảng toán của cả bài này.
- [Vectors/03 — Calculus](../../../Vectors/03-Calculus/) — đạo hàm/tích phân theo thời gian của đại lượng vector.

---

## 1. Vì sao cần tích phân số?

### 1.1. Bài toán cụ thể mở đầu

> **Biết gia tốc trọng lực $g = 9.8\ \text{m/s}^2$ hướng xuống, làm sao máy tính ra vị trí quả bóng ở mỗi frame?**

Trong vật lý phổ thông bạn có công thức kín (closed-form):

$$p(t) = p_0 + v_0 t + \tfrac{1}{2} g t^2$$

Thả bóng từ độ cao $100\ \text{m}$, $v_0 = 0$. Sau $t = 2\ \text{s}$:

$$p(2) = 100 + 0 - \tfrac{1}{2}(9.8)(2^2) = 100 - 19.6 = 80.4\ \text{m}$$

Đẹp. Nhưng công thức này **chỉ tồn tại vì gia tốc là hằng số**. Trong game thật, gia tốc **thay đổi mỗi frame**:

- Lực cản không khí (drag) phụ thuộc vận tốc hiện tại: $a = g - k v$ → mỗi frame $a$ khác.
- Lực lò xo (spring) phụ thuộc vị trí: $a = -\frac{k}{m}(p - p_0)$ → mỗi frame $a$ khác.
- Người chơi bấm nút đẩy, va chạm đổi hướng, gió thổi... → lực thay đổi liên tục, **không có công thức kín**.

💡 **Trực giác — cộng dồn từng lát mỏng.** Bạn không biết quãng đường đi được trong 2 giây liền một mạch, nhưng bạn **biết rất rõ** chuyện gì xảy ra trong $\frac{1}{60}$ giây kế tiếp: gia tốc gần như không đổi trong khoảng cực ngắn đó, nên cứ "đi thẳng" theo vận tốc hiện tại. Lặp lại 120 lần (2 giây × 60 fps) là ra. Giống đo quãng đường xe bằng cách đọc tốc kế mỗi giây rồi cộng lại — sai tí, nhưng càng đọc dày càng đúng.

### 1.2. Liên hệ tổng Riemann

Vị trí là **tích phân của vận tốc**, vận tốc là **tích phân của gia tốc**:

$$v(t) = v_0 + \int_0^t a\,d\tau, \qquad p(t) = p_0 + \int_0^t v\,d\tau$$

Máy không tính tích phân giải tích. Nó xấp xỉ tích phân bằng **tổng Riemann** — đúng ý tưởng ở [Math/04](../../../Math/04-Calculus-1var/lesson-07-definite-integral/): chia $[0, t]$ thành các lát $\Delta t$, mỗi lát coi hàm là hằng, cộng diện tích các hình chữ nhật:

$$\int_0^t v\,d\tau \approx \sum_{i} v_i \cdot \Delta t$$

→ **Bộ tích phân số (integrator)** chính là cái vòng lặp cộng dồn này. Cả 3 phương pháp dưới đây chỉ khác nhau ở chi tiết "lấy $v_i$ và $a_i$ ở thời điểm nào".

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Tại sao không luôn dùng công thức kín cho gọn?"* — Vì chỉ vài bài toán hiếm có công thức kín. Hễ lực phụ thuộc vào trạng thái đang thay đổi (drag, spring, n-body) là hết. Tích phân số dùng được cho **mọi** lực.
- *"Cộng dồn thì sai số chứ?"* — Đúng, luôn có sai số. Cả bài này nói về việc **sai bao nhiêu, theo kiểu gì, và cách chọn phương pháp để sai ít/an toàn**.

🔁 **Dừng lại tự kiểm tra.** Vì sao bài "thả bóng dưới trọng lực thuần" lại có công thức kín, còn bài "thả bóng có lực cản" thì không?

<details><summary>Đáp án</summary>

Trọng lực thuần cho $a = g$ là **hằng số** → tích phân 2 lần ra đa thức bậc 2 đẹp. Lực cản cho $a = g - kv$ phụ thuộc $v$, mà $v$ lại đổi theo $a$ → phương trình vi phân $v' = g - kv$. Bài này vẫn giải kín được (nghiệm mũ), nhưng thêm spring/va chạm/nhiều vật là tắc. Trong game ta không phân biệt — cứ dùng integrator cho tất cả.

</details>

📝 **Tóm tắt mục 1.**
- Gia tốc đến từ lực; ta cần vị trí theo thời gian.
- Vì lực đổi mỗi frame, không có công thức kín → **cộng dồn từng bước $\Delta t$** = tổng Riemann.
- Integrator = vòng lặp cập nhật $v$ và $p$ từng frame. 3 biến thể khác nhau ở thứ tự/thời điểm lấy giá trị.

---

## 2. Explicit (forward) Euler

### 2.1. Công thức

Đơn giản nhất có thể. Dùng gia tốc và vận tốc **đầu bước** để nhảy nguyên một bước $\Delta t$:

$$
\begin{aligned}
p_{n+1} &= p_n + v_n \cdot \Delta t \\
v_{n+1} &= v_n + a_n \cdot \Delta t
\end{aligned}
$$

Trong code (chú ý: cập nhật $p$ dùng $v$ **cũ**):

```go
// Explicit Euler — dùng giá trị ĐẦU bước
p = p + v*dt   // p mới dùng v cũ
v = v + a*dt   // rồi mới cập nhật v
```

💡 **Trực giác.** Đứng ở đầu bước, nhìn vận tốc và gia tốc hiện tại, rồi **giả định chúng không đổi** suốt cả bước, đi thẳng. Như lái xe mà chỉ liếc tốc kế một lần đầu mỗi giây rồi nhắm mắt đi hết giây đó.

### 2.2. Walk-through số — vật rơi tự do

Thả vật: $p_0 = 0$ (đo quãng rơi), $v_0 = 0$, $a = 9.8$ (không đổi), $\Delta t = 0.5\ \text{s}$. Theo dõi 4 bước (tới $t = 2$):

| Bước | $t$ | $p$ (đầu bước) | $v$ (đầu bước) | $p_{new} = p + v\Delta t$ | $v_{new} = v + a\Delta t$ |
|------|-----|------|------|------|------|
| 0→1 | 0.0 | 0.00 | 0.0 | $0 + 0(0.5) = 0.00$ | $0 + 9.8(0.5) = 4.9$ |
| 1→2 | 0.5 | 0.00 | 4.9 | $0 + 4.9(0.5) = 2.45$ | $4.9 + 4.9 = 9.8$ |
| 2→3 | 1.0 | 2.45 | 9.8 | $2.45 + 9.8(0.5) = 7.35$ | $9.8 + 4.9 = 14.7$ |
| 3→4 | 1.5 | 7.35 | 14.7 | $7.35 + 14.7(0.5) = 14.70$ | $14.7 + 4.9 = 19.6$ |

Tại $t = 2$: explicit Euler cho quãng rơi $= 14.70\ \text{m}$.

Đáp án **chính xác**: $p(2) = \tfrac{1}{2}(9.8)(2^2) = 19.6\ \text{m}$.

→ Explicit Euler ra **14.70**, hụt mất **4.90 m** (sai ~25%!). Vì sao? Bước đầu nó dùng $v_0 = 0$ cho cả nửa giây đầu → "quên" rằng vật đang tăng tốc trong bước đó. Nó luôn **trễ một bước** so với thực tế.

### 2.3. Sai số bậc nhất, tích lũy

Sai số mỗi bước (local error) của Euler tỉ lệ $\Delta t^2$; sau $N = T/\Delta t$ bước, sai số toàn cục (global error) tỉ lệ $\Delta t$ → gọi là **bậc nhất (first-order)**. Cụ thể với bài trên:

| $\Delta t$ | Số bước tới $t=2$ | Quãng rơi tính được | Sai số so với 19.6 |
|------|------|------|------|
| 0.5 | 4 | 14.70 | 4.90 |
| 0.25 | 8 | 17.15 | 2.45 |
| 0.125 | 16 | 18.375 | 1.225 |
| 0.0625 | 32 | 18.9875 | 0.6125 |

Giảm $\Delta t$ một nửa → sai số giảm một nửa. Đúng đặc trưng bậc nhất (sai số $\propto \Delta t$).

### 2.4. "Phình năng lượng" — quỹ đạo xoắn ra

⚠ **Lỗi nghiêm trọng của explicit Euler: bơm năng lượng vào hệ tuần hoàn.** Với chuyển động dao động/quỹ đạo (con lắc, lò xo, hành tinh quay), explicit Euler **liên tục thêm năng lượng** khiến biên độ phình to dần — con lắc đáng lẽ đung đưa đều thì swing mỗi lúc một rộng, hành tinh đáng lẽ quay tròn thì **xoắn ốc bay ra ngoài**.

Walk-through con lắc/lò xo 1 chiều: $a = -\omega^2 x$ với $\omega = 1$, bắt đầu $x_0 = 1, v_0 = 0$, $\Delta t = 0.5$.

| Bước | $x$ | $v$ | $a = -x$ | $x_{new}=x+v\Delta t$ | $v_{new}=v+a\Delta t$ | "Năng lượng" $E=\tfrac{1}{2}(x^2+v^2)$ |
|------|-----|-----|------|------|------|------|
| 0 | 1.000 | 0.000 | −1.000 | $1.000$ | $-0.500$ | 0.500 |
| 1 | 1.000 | −0.500 | −1.000 | $0.750$ | $-1.000$ | 0.625 |
| 2 | 0.750 | −1.000 | −0.750 | $0.250$ | $-1.375$ | **1.227** |
| 3 | 0.250 | −1.375 | −0.250 | $-0.438$ | $-1.500$ | **1.220** |

$E$ đáng lẽ phải giữ nguyên $0.5$ (hệ bảo toàn năng lượng, không ma sát), nhưng explicit Euler đẩy nó lên $0.625 \to 1.227 \to \ldots$ → tăng vô hạn. Đó là quỹ đạo **xoắn ra**. Bạn sẽ thấy rõ điều này ở Module 1 của visualization (vòng tròn đỏ phình to dần).

📝 **Tóm tắt mục 2.**
- Explicit Euler: `p += v*dt; v += a*dt` (p dùng v **cũ**).
- Đơn giản nhất, nhưng sai số bậc nhất, luôn trễ một bước.
- **Bơm năng lượng** vào hệ dao động → quỹ đạo xoắn ra, dao động phình to. Tránh dùng cho orbit/spring/con lắc.

---

## 3. Semi-implicit (symplectic) Euler

### 3.1. Công thức — chỉ đổi thứ tự

Cải tiến **một dòng**: cập nhật $v$ **TRƯỚC**, rồi dùng $v$ **mới** để cập nhật $p$.

$$
\begin{aligned}
v_{n+1} &= v_n + a_n \cdot \Delta t \\
p_{n+1} &= p_n + v_{n+1} \cdot \Delta t \quad(\text{dùng } v \text{ MỚI})
\end{aligned}
$$

```go
// Semi-implicit (symplectic) Euler — đổi thứ tự!
v = v + a*dt   // cập nhật v TRƯỚC
p = p + v*dt   // rồi p dùng v MỚI
```

⚠ **Thứ tự cập nhật v/p là tất cả sự khác biệt.** Cùng 2 dòng lệnh, chỉ đảo thứ tự, nhưng explicit Euler bơm năng lượng còn semi-implicit **bảo toàn năng lượng** (symplectic). Đây là cái bẫy kinh điển: nhiều người viết `p += v*dt` rồi `v += a*dt` mà không biết mình đang dùng phiên bản kém ổn định. Trong game, **mặc định hãy dùng semi-implicit**.

### 3.2. Walk-through số — cùng bài vật rơi (so với §2.2)

$p_0 = 0, v_0 = 0, a = 9.8, \Delta t = 0.5$.

| Bước | $t$ | $v$ (đầu bước) | $v_{new} = v + a\Delta t$ | $p$ (đầu bước) | $p_{new} = p + v_{new}\Delta t$ |
|------|-----|------|------|------|------|
| 0→1 | 0.0 | 0.0 | $0 + 4.9 = 4.9$ | 0.00 | $0 + 4.9(0.5) = 2.45$ |
| 1→2 | 0.5 | 4.9 | $4.9 + 4.9 = 9.8$ | 2.45 | $2.45 + 9.8(0.5) = 7.35$ |
| 2→3 | 1.0 | 9.8 | $9.8 + 4.9 = 14.7$ | 7.35 | $7.35 + 14.7(0.5) = 14.70$ |
| 3→4 | 1.5 | 14.7 | $14.7 + 4.9 = 19.6$ | 14.70 | $14.70 + 19.6(0.5) = 24.50$ |

Tại $t = 2$: semi-implicit cho quãng rơi $= 24.50\ \text{m}$.

**So sánh trực tiếp tại $t = 2$** (cùng $\Delta t = 0.5$):

| Phương pháp | Quãng rơi | Chính xác (19.6) | Sai số |
|------|------|------|------|
| Explicit Euler | 14.70 | 19.6 | **−4.90** (hụt) |
| Semi-implicit Euler | 24.50 | 19.6 | **+4.90** (vượt) |

Thú vị: với gia tốc hằng, explicit hụt đúng bằng lượng semi-implicit vượt (cùng $4.90$), vì explicit dùng $v$ đầu bước (luôn nhỏ hơn trung bình) còn semi-implicit dùng $v$ cuối bước (luôn lớn hơn trung bình). Trung bình 2 cái $= \frac{14.70 + 24.50}{2} = 19.60$ = đúng! (Đó chính là quy tắc hình thang — gợi ý cho bài tập.)

### 3.3. Vì sao ổn định hơn — cùng bài con lắc (so với §2.4)

$a = -x, \omega = 1, x_0 = 1, v_0 = 0, \Delta t = 0.5$. Lần này cập nhật $v$ trước:

| Bước | $x$ | $a = -x$ | $v_{new}=v+a\Delta t$ | $x_{new}=x+v_{new}\Delta t$ | $E=\tfrac{1}{2}(x^2+v^2)$ |
|------|-----|------|------|------|------|
| 0 | 1.000 | −1.000 | $0 - 0.5 = -0.500$ | $1 - 0.25 = 0.750$ | 0.625 |
| 1 | 0.750 | −0.750 | $-0.5 - 0.375 = -0.875$ | $0.75 - 0.4375 = 0.3125$ | **0.431** |
| 2 | 0.3125 | −0.3125 | $-0.875 - 0.156 = -1.031$ | $0.3125 - 0.516 = -0.203$ | **0.553** |
| 3 | −0.203 | 0.203 | $-1.031 + 0.102 = -0.930$ | $-0.203 - 0.465 = -0.668$ | **0.453** |

So với explicit (§2.4) leo $0.5 \to 0.625 \to 1.227 \to \ldots$ (phình vô hạn), semi-implicit **dao động quanh** $0.5$ ($0.625, 0.431, 0.553, 0.453$) mà **không tăng dần** → quỹ đạo giữ hình dạng, không xoắn ra. Đây là tính chất **symplectic**: nó không bảo toàn năng lượng tuyệt đối từng bước, nhưng giữ năng lượng dao động bị chặn quanh giá trị đúng mãi mãi → ổn định lâu dài.

🔁 **Dừng lại tự kiểm tra.** Bạn có một game với 500 hành tinh quay quanh mặt trời, chạy hàng giờ. Dùng explicit hay semi-implicit Euler? Vì sao?

<details><summary>Đáp án</summary>

Semi-implicit. Explicit Euler bơm năng lượng → sau vài phút các hành tinh xoắn ốc bay ra khỏi màn hình. Semi-implicit giữ quỹ đạo ổn định gần như vô thời hạn với chi phí y hệt (cùng 2 phép cộng + 2 phép nhân mỗi frame). Đây là lý do gần như mọi physics engine game (Box2D, Unity 2D mặc định...) dùng semi-implicit chứ không dùng explicit.

</details>

📝 **Tóm tắt mục 3.**
- Semi-implicit: `v += a*dt; p += v*dt` (p dùng v **mới**) — chỉ đảo thứ tự so với explicit.
- Symplectic → năng lượng dao động bị chặn, **không phình** → ổn định dài hạn.
- Chi phí bằng explicit. **Đây là lựa chọn mặc định cho game.**

---

## 4. Verlet integration

### 4.1. Position Verlet — không lưu vận tốc tường minh

Ý tưởng: vị trí mới suy ra từ **hai vị trí trước đó** ($p_n$ và $p_{n-1}$) cộng đóng góp của gia tốc. Vận tốc **không** lưu riêng — nó ẩn trong hiệu $p_n - p_{n-1}$.

$$p_{n+1} = 2 p_n - p_{n-1} + a_n \cdot \Delta t^2$$

```go
// Position Verlet — chỉ lưu p hiện tại và p trước đó
pNew := 2*p - pOld + a*dt*dt
pOld = p
p = pNew
// vận tốc (nếu cần) ước lượng: v ≈ (p - pOld) / dt
```

💡 **Trực giác — quán tính tự nhiên.** $2p_n - p_{n-1} = p_n + (p_n - p_{n-1})$: "đi tiếp đúng quãng vừa đi bước trước" (đó là quán tính/vận tốc ẩn), rồi cộng độ cong do gia tốc $a\,\Delta t^2$. Giống bạn dự đoán bước chân tiếp theo của người đi đều: cứ bước tiếp một khoảng bằng khoảng vừa rồi, trừ khi có lực kéo lệch.

**Vì sao công thức là thế?** Khai triển Taylor $p$ tại $t \pm \Delta t$:

$$
\begin{aligned}
p(t+\Delta t) &= p(t) + v\Delta t + \tfrac{1}{2}a\Delta t^2 + \tfrac{1}{6}\dddot p\,\Delta t^3 + \ldots \\
p(t-\Delta t) &= p(t) - v\Delta t + \tfrac{1}{2}a\Delta t^2 - \tfrac{1}{6}\dddot p\,\Delta t^3 + \ldots
\end{aligned}
$$

Cộng hai dòng: số hạng $v\Delta t$ và $\dddot p\,\Delta t^3$ **triệt tiêu** (đối dấu), còn lại

$$p(t+\Delta t) + p(t-\Delta t) = 2p(t) + a\Delta t^2 + O(\Delta t^4)$$

→ $p_{n+1} = 2p_n - p_{n-1} + a\Delta t^2$, sai số bậc cao hơn Euler ($O(\Delta t^4)$ local) và không cần lưu $v$.

### 4.2. Bước khởi động (cần $p_{-1}$)

Verlet cần **hai** điểm để bắt đầu, nhưng ban đầu chỉ có $p_0$ và $v_0$. Tạo điểm giả $p_{-1}$ bằng một bước Taylor ngược:

$$p_{-1} = p_0 - v_0 \Delta t + \tfrac{1}{2} a_0 \Delta t^2$$

### 4.3. Walk-through số — cùng bài vật rơi

$p_0 = 0, v_0 = 0, a = 9.8, \Delta t = 0.5$, nên $a\Delta t^2 = 9.8 \times 0.25 = 2.45$.

Khởi động: $p_{-1} = 0 - 0 + \tfrac{1}{2}(9.8)(0.25) = 1.225$.

| Bước | $p_{old}$ | $p$ | $p_{new} = 2p - p_{old} + 2.45$ |
|------|------|------|------|
| 0→1 | 1.225 | 0.000 | $2(0) - 1.225 + 2.45 = 1.225$ |
| 1→2 | 0.000 | 1.225 | $2(1.225) - 0 + 2.45 = 4.900$ |
| 2→3 | 1.225 | 4.900 | $2(4.9) - 1.225 + 2.45 = 11.025$ |
| 3→4 | 4.900 | 11.025 | $2(11.025) - 4.9 + 2.45 = 19.600$ |

Tại $t = 2$: Verlet cho quãng rơi $= 19.600\ \text{m}$ = **chính xác tuyệt đối** (so với 19.6)!

Với gia tốc hằng, Verlet **đúng đến từng chữ số** vì sai số của nó bắt đầu từ đạo hàm bậc 3 trở lên, mà chuyển động $\frac{1}{2}at^2$ chỉ là bậc 2 → đạo hàm bậc 3 = 0 → không sai. (Con lắc/spring có đạo hàm bậc cao khác 0 nên vẫn sai chút, nhưng vẫn rất ổn định.)

### 4.4. So sánh năng lượng con lắc (cùng bài §2.4 / §3.3)

$a = -x, x_0 = 1, v_0 = 0, \Delta t = 0.5$, $a\Delta t^2 = -0.25 x$.

Khởi động: $p_{-1} = 1 - 0 + \tfrac{1}{2}(-1)(0.25) = 1 - 0.125 = 0.875$.

| Bước | $p_{old}$ | $p$ | $a\Delta t^2 = -0.25p$ | $p_{new}=2p - p_{old} + a\Delta t^2$ | $v\approx\frac{p_{new}-p_{old}}{2\Delta t}$ | $E\approx\tfrac{1}{2}(p^2+v^2)$ |
|------|------|------|------|------|------|------|
| 0→1 | 0.875 | 1.000 | −0.250 | $2(1) - 0.875 - 0.25 = 0.875$ | $\frac{0.875-0.875}{1}=0.000$ | 0.500 |
| 1→2 | 1.000 | 0.875 | −0.219 | $2(0.875) - 1 - 0.219 = 0.531$ | $\frac{0.531-1}{1}=-0.469$ | 0.493 |
| 2→3 | 0.875 | 0.531 | −0.133 | $2(0.531) - 0.875 - 0.133 = 0.054$ | $\frac{0.054-0.875}{1}=-0.821$ | 0.478 |

$E$ giữ quanh $0.5$ ($0.500, 0.493, 0.478$) — ổn định như semi-implicit, **không phình** như explicit. Verlet cũng là phương pháp symplectic.

### 4.5. Vì sao Verlet được yêu thích cho ràng buộc (preview cloth)

Vì vận tốc ẩn trong $p - p_{old}$, **chỉ cần dịch vị trí là tự khắc đổi vận tốc**. Khi mô phỏng vải (cloth) hay sợi dây: mỗi sợi liên kết là một ràng buộc "khoảng cách giữa 2 hạt phải bằng $L$". Sau mỗi bước Verlet, ta chỉ việc **kéo các hạt về đúng khoảng cách** (di chuyển vị trí) — Verlet tự động "hiểu" việc kéo đó như một thay đổi vận tốc, không cần đụng tới biến $v$ nào cả. Đây là cốt lõi của kỹ thuật cloth nổi tiếng (Jakobsen, Hitman). Sẽ học kỹ ở **Lesson 12 — Cloth/Verlet constraints** (sẽ dùng đúng position Verlet này).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Verlet không có $v$ thì làm sao xử lý va chạm cần đổi vận tốc?"* — Đổi vận tốc = dịch $p_{old}$. Muốn dừng hẳn vật: đặt $p_{old} = p$ (hiệu = 0 → $v = 0$). Muốn bật lại: phản chiếu $p_{old}$ qua $p$.
- *"Thêm lực cản (drag) thì sao?"* — Hơi vướng vì $v$ không tường minh; thường dùng **Velocity Verlet** (biến thể có lưu $v$) khi cần drag chính xác. Position Verlet hợp nhất với hệ ràng buộc.

📝 **Tóm tắt mục 4.**
- Position Verlet: `pNew = 2p - pOld + a*dt²`; vận tốc ẩn trong $p - p_{old}$.
- Cần khởi động $p_{-1} = p_0 - v_0\Delta t + \tfrac{1}{2}a_0\Delta t^2$.
- Sai số bậc cao, symplectic (ổn định, không phình), **rất tiện cho ràng buộc** → nền của cloth/rope (Lesson 12).

---

## 5. So sánh 3 phương pháp (+ RK4)

| Tiêu chí | Explicit Euler | Semi-implicit Euler | Position Verlet | RK4 |
|------|------|------|------|------|
| **Bậc chính xác (global)** | 1 ($O(\Delta t)$) | 1 ($O(\Delta t)$) | 2 ($O(\Delta t^2)$) | 4 ($O(\Delta t^4)$) |
| **Bảo toàn năng lượng** | ✗ phình (bơm năng lượng) | ✓ chặn (symplectic) | ✓ chặn (symplectic) | ~ rò rỉ chậm |
| **Ổn định dài hạn** | Kém (xoắn ra) | Tốt | Tốt | Tốt (nhưng đắt) |
| **Chi phí / bước** | Thấp (1 lần tính $a$) | Thấp (1 lần) | Thấp (1 lần) | **Cao** (4 lần tính $a$) |
| **Lưu vận tốc?** | Có | Có | Không (ẩn) | Có |
| **Dễ làm ràng buộc?** | Khó | Khó | **Dễ** | Khó |
| **Khi nào dùng** | Học/demo, prototyping | **Mặc định game** (player, đạn, hạt) | Cloth, rope, soft-body, ràng buộc | Mô phỏng khoa học cần chính xác cao (quỹ đạo tàu, n-body chính xác) |

**RK4 (Runge–Kutta bậc 4)** nhắc qua: lấy gia tốc ở **4 điểm** trong bước (đầu, 2 lần giữa, cuối) rồi trộn theo trọng số $\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$ → sai số bậc 4, rất chính xác. Nhưng **đắt gấp ~4 lần** (4 lần đánh giá lực/frame) và **không symplectic** (rò rỉ năng lượng chậm theo thời gian) → ít dùng cho game tương tác; hợp với mô phỏng vật lý ngoại tuyến cần độ chính xác cao. Trong 99% game, semi-implicit Euler hoặc Verlet là đủ.

⚠ **Đừng nhầm "chính xác hơn" với "ổn định hơn".** RK4 chính xác hơn semi-implicit Euler ở mỗi bước, nhưng vì không symplectic, chạy orbit hàng triệu bước thì RK4 vẫn **rò năng lượng** còn semi-implicit thì không. Game cần **ổn định** (không nổ, không xoắn) hơn là chính xác từng frame.

📝 **Tóm tắt mục 5.** Game thường: **semi-implicit Euler** cho vật thường, **Verlet** cho cloth/rope. RK4 chỉ khi cần độ chính xác khoa học và chấp nhận đắt.

---

## 6. Δt — đánh đổi chính xác / chi phí và vì sao fixed timestep quan trọng

### 6.1. Δt nhỏ → chính xác hơn nhưng tốn

Đã thấy ở §2.3: giảm $\Delta t$ một nửa thì sai số Euler giảm một nửa — nhưng số bước (số lần tính lực) **tăng gấp đôi** → tốn CPU gấp đôi. Đánh đổi:

| $\Delta t$ | Bước/giây | Chính xác | Chi phí CPU |
|------|------|------|------|
| 1/30 s | 30 | Thấp | Rẻ |
| 1/60 s | 60 | Trung bình | Vừa (chuẩn game) |
| 1/120 s | 120 | Cao | Đắt gấp đôi |

### 6.2. Δt lớn → "nổ" (mất ổn định)

⚠ **Δt quá lớn làm simulation NỔ (blow up) — số tiến tới vô cực, vật bắn đi mất.** Với hệ lò xo $a = -\omega^2 x$, semi-implicit Euler chỉ ổn định khi $\omega \Delta t < 2$. Vượt ngưỡng → mỗi bước biên độ **nhân lên** thay vì dao động → tràn số.

Walk-through cho thấy "nổ": $a = -x$ ($\omega = 1$), $x_0 = 1, v_0 = 0$, lấy $\Delta t = 2.5$ (vượt ngưỡng $\omega\Delta t = 2.5 > 2$), semi-implicit:

| Bước | $x$ | $a=-x$ | $v_{new}=v+a\Delta t$ | $x_{new}=x+v_{new}\Delta t$ |
|------|-----|------|------|------|
| 0 | 1.00 | −1.00 | $0 - 2.5 = -2.5$ | $1 - 6.25 = -5.25$ |
| 1 | −5.25 | 5.25 | $-2.5 + 13.125 = 10.625$ | $-5.25 + 26.56 = 21.31$ |
| 2 | 21.31 | −21.31 | $10.625 - 53.28 = -42.65$ | $21.31 - 106.6 = -85.3$ |

$|x|$ leo $1 \to 5.25 \to 21.31 \to 85.3 \to \ldots$ — **nhân ~4 lần mỗi bước**, vài bước nữa là `Inf`/`NaN`. Đó là "nổ". Bạn sẽ tự tay tạo ra cảnh này bằng slider $\Delta t$ ở Module 2 của visualization.

### 6.3. Vì sao fixed timestep (Lesson 01)

Nếu $\Delta t$ thay đổi mỗi frame theo tốc độ máy (variable timestep), thì:
1. **Ổn định không xác định**: máy lag → frame dài → $\Delta t$ lớn → có thể vượt ngưỡng nổ. Cùng một game, máy yếu thì vật lý nổ, máy mạnh thì không → bug không tái hiện được.
2. **Không tất định (non-deterministic)**: kết quả phụ thuộc fps → replay/multiplayer lệch nhau.

→ Giải pháp: **fixed timestep** (đã học [Lesson 01 — Game loop & timestep](../lesson-01-game-loop-timestep/)) — luôn bước vật lý với $\Delta t$ cố định (vd 1/60 s), tách rời khỏi tốc độ vẽ. Đây là điều kiện sống còn để 3 integrator trên ổn định và tất định.

🔁 **Dừng lại tự kiểm tra.** Game của bạn chạy 60fps trên máy mạnh, 20fps trên máy yếu. Dùng variable timestep ($\Delta t = $ thời gian frame thực). Điều gì có thể xảy ra trên máy yếu mà không xảy ra trên máy mạnh?

<details><summary>Đáp án</summary>

Trên máy yếu $\Delta t \approx 1/20 = 0.05$ s — lớn gấp 3 lần máy mạnh. Với lò xo cứng (ω lớn), $\omega\Delta t$ có thể vượt ngưỡng 2 → vật lý **nổ** chỉ trên máy yếu. Người chơi máy yếu thấy vật bay loạn, người máy mạnh không tái hiện được → bug "ma". Fix: fixed timestep, dồn nhiều bước vật lý nhỏ trong một frame chậm (accumulator pattern ở Lesson 01).

</details>

📝 **Tóm tắt mục 6.** $\Delta t$ nhỏ = chính xác nhưng tốn; $\Delta t$ lớn = rẻ nhưng có thể **nổ**. Mỗi integrator có ngưỡng ổn định theo $\omega\Delta t$. **Fixed timestep** đảm bảo ổn định + tất định.

---

## 7. Tích phân dùng ở đâu trong các bài sau?

Bộ tích phân số là **trái tim** của vòng lặp vật lý — mọi lực rồi cũng quy về $a = F/m$ rồi đưa vào integrator:

- [Lesson 04 — Forces (Gravity/Drag/Friction)](../lesson-04-forces-gravity-drag-friction/) — tính $a = F/m$ từ tổng lực, rồi tích phân ra chuyển động. Drag $F = -kv$ phụ thuộc $v$ → đây là lúc "không có công thức kín" rõ nhất.
- **Lesson 05 — Springs (lò xo)** — $a = -\frac{k}{m}x$ là chính bài con lắc ta walk-through ở trên; chọn integrator sai (explicit) → lò xo phình; $\Delta t$ lớn → nổ.
- **Lesson 11 — Particles (hạt)** — hàng nghìn hạt, mỗi hạt một integrator nhỏ; chi phí/bước quan trọng → semi-implicit Euler.
- **Lesson 12 — Cloth/Rope** — dùng **position Verlet** + ràng buộc khoảng cách, đúng như §4.5.

---

## 8. Bài tập

**Bài 1.** Vật rơi $p_0 = 0, v_0 = 0, a = 10$ (làm tròn $g$), $\Delta t = 1$ s. Chạy tay **explicit Euler** 3 bước (tới $t = 3$). Cho biết $p$ và $v$ tại $t = 3$. So với công thức kín $p = \tfrac{1}{2}at^2$.

**Bài 2.** Cùng số liệu Bài 1 nhưng dùng **semi-implicit Euler**. Cho $p, v$ tại $t = 3$. So sánh với explicit và với đáp án chính xác. Giải thích cái nào gần hơn và vì sao.

**Bài 3.** Cùng số liệu Bài 1 nhưng dùng **position Verlet**. Tính bước khởi động $p_{-1}$ rồi chạy 3 bước. Kết quả tại $t = 3$ có khớp đáp án chính xác không? Giải thích.

**Bài 4.** Lò xo $a = -x$, $x_0 = 1, v_0 = 0, \Delta t = 0.5$. Chạy **explicit Euler** 4 bước, tính "năng lượng" $E = \tfrac{1}{2}(x^2 + v^2)$ ở mỗi bước. $E$ tăng hay giảm? Điều này tương ứng với hiện tượng gì về quỹ đạo?

**Bài 5.** Cho biết một lập trình viên viết:
```go
p = p + v*dt
v = v + a*dt
```
cho game bắn đạn pháo theo quỹ đạo parabol kéo dài (vài giây bay). (a) Đây là integrator nào? (b) Với quỹ đạo parabol dưới trọng lực thuần, kết quả có "nổ" hay "phình" không? Giải thích. (c) Nếu đổi sang con lắc/lò xo dao động lâu thì sao?

**Bài 6.** (Ngưỡng nổ) Với lò xo $a = -\omega^2 x$, semi-implicit Euler ổn định khi $\omega\Delta t < 2$. Một lò xo có $\omega = 50\ \text{rad/s}$. (a) $\Delta t$ tối đa để không nổ là bao nhiêu? (b) Nếu game chạy fixed timestep 1/60 s, integrator này có ổn định không? (c) Nếu lò xo cứng hơn, $\omega = 200$, thì sao — và cách xử lý?

**Bài 7.** Giải thích bằng lời (không cần code): tại sao position Verlet **không cần** biến vận tốc mà vẫn mô phỏng được quán tính, và vì sao điều đó khiến nó tiện cho ràng buộc khoảng cách (cloth).

## Lời giải chi tiết

### Bài 1 — Explicit Euler

$a = 10, \Delta t = 1$, công thức `p += v*dt; v += a*dt` (p dùng v cũ):

| Bước | $t$ | $p$ | $v$ | $p_{new}=p+v\cdot1$ | $v_{new}=v+10\cdot1$ |
|------|-----|-----|-----|------|------|
| 0→1 | 0 | 0 | 0 | $0+0=0$ | $0+10=10$ |
| 1→2 | 1 | 0 | 10 | $0+10=10$ | $10+10=20$ |
| 2→3 | 2 | 10 | 20 | $10+20=30$ | $20+10=30$ |

Tại $t=3$: $p = 30, v = 30$. Chính xác: $p = \tfrac{1}{2}(10)(3^2) = 45$. Explicit hụt 15 (sai 33%) — vì luôn trễ một bước.

### Bài 2 — Semi-implicit Euler

`v += a*dt; p += v*dt` (p dùng v mới):

| Bước | $t$ | $v$ | $v_{new}=v+10$ | $p$ | $p_{new}=p+v_{new}\cdot1$ |
|------|-----|-----|------|-----|------|
| 0→1 | 0 | 0 | 10 | 0 | $0+10=10$ |
| 1→2 | 1 | 10 | 20 | 10 | $10+20=30$ |
| 2→3 | 2 | 20 | 30 | 30 | $30+30=60$ |

Tại $t=3$: $p = 60, v = 30$. Chính xác = 45. Semi-implicit **vượt** 15. So sánh: explicit cho 30 (hụt 15), semi-implicit cho 60 (vượt 15). Trung bình $\frac{30+60}{2} = 45$ = chính xác — vì explicit dùng $v$ đầu bước (dưới trung bình), semi-implicit dùng $v$ cuối bước (trên trung bình). Cả hai đều bậc nhất nên sai số tuyệt đối bằng nhau ở bài này; với $\Delta t$ nhỏ hơn cả hai đều hội tụ về 45.

### Bài 3 — Position Verlet

$a = 10, \Delta t = 1$, $a\Delta t^2 = 10$. Khởi động: $p_{-1} = p_0 - v_0\Delta t + \tfrac{1}{2}a_0\Delta t^2 = 0 - 0 + \tfrac{1}{2}(10)(1) = 5$.

| Bước | $t$ | $p_{old}$ | $p$ | $p_{new}=2p-p_{old}+10$ |
|------|-----|------|------|------|
| 0→1 | 0 | 5 | 0 | $2(0)-5+10=5$ |
| 1→2 | 1 | 0 | 5 | $2(5)-0+10=20$ |
| 2→3 | 2 | 5 | 20 | $2(20)-5+10=45$ |

Tại $t=3$: $p = 45$ = **chính xác tuyệt đối**. Vì chuyển động dưới gia tốc hằng là đa thức bậc 2, mà sai số Verlet bắt đầu từ đạo hàm bậc 3 (= 0 ở đây) → không sai. (Với con lắc đạo hàm bậc cao ≠ 0 nên Verlet vẫn lệch chút, nhưng vẫn ổn định.)

### Bài 4 — Explicit Euler trên lò xo (phình năng lượng)

Đây chính là bảng §2.4. Tóm:

| Bước | $x$ | $v$ | $E=\tfrac12(x^2+v^2)$ |
|------|-----|-----|------|
| 0 | 1.000 | 0.000 | 0.500 |
| 1 | 1.000 | −0.500 | 0.625 |
| 2 | 0.750 | −1.000 | 1.227 |
| 3 | 0.250 | −1.375 | 1.220 |

$E$ **tăng** từ 0.5 → 1.227 (và tiếp tục tăng vô hạn). Tương ứng quỹ đạo **xoắn ra ngoài** (biên độ dao động phình to dần) — explicit Euler bơm năng lượng giả vào hệ. Đáng lẽ $E$ phải giữ nguyên 0.5 mãi mãi.

### Bài 5

(a) `p += v*dt` rồi `v += a*dt` → cập nhật $p$ bằng $v$ **cũ** → **explicit (forward) Euler**.

(b) Quỹ đạo parabol dưới trọng lực thuần ($a = g$ hằng): **không nổ, không phình theo nghĩa năng lượng** vì đây không phải hệ dao động/quỹ đạo tuần hoàn — nó là chuyển động bậc 2 đi rồi rơi. Explicit Euler chỉ **lệch vị trí một chút** (hụt như Bài 1), tầm bắn sai vài %. Với $\Delta t$ nhỏ (1/60) sai số nhỏ, dùng tạm được. Hiện tượng "phình/xoắn" chỉ xuất hiện ở hệ **dao động** (lò xo, con lắc, orbit), không ở parabol một lần.

(c) Đổi sang con lắc/lò xo dao động lâu: explicit Euler **bơm năng lượng** → biên độ phình to dần, sau một lúc dao động loạn rồi nổ. Lúc này **phải** đổi sang semi-implicit (chỉ đảo thứ tự 2 dòng) hoặc Verlet. Bài học: explicit "trông ổn" với chuyển động một lần, nhưng hỏng với dao động kéo dài.

### Bài 6 — Ngưỡng nổ

Điều kiện ổn định: $\omega\Delta t < 2 \Rightarrow \Delta t < 2/\omega$.

(a) $\omega = 50$: $\Delta t < 2/50 = 0.04$ s. Vậy $\Delta t$ tối đa $\approx 0.04$ s (tức $> 25$ fps là an toàn).

(b) Fixed 1/60 ≈ 0.0167 s. Kiểm tra: $\omega\Delta t = 50 \times 0.0167 = 0.833 < 2$ → **ổn định**, dư biên độ an toàn.

(c) $\omega = 200$: $\Delta t < 2/200 = 0.01$ s. Nhưng 1/60 = 0.0167 > 0.01 → $\omega\Delta t = 200 \times 0.0167 = 3.33 > 2$ → **nổ**. Cách xử lý: (i) chạy nhiều **sub-step** vật lý nhỏ hơn trong một frame (vd 4 sub-step × 1/240 s → $\omega\Delta t = 0.833$ ổn định); hoặc (ii) dùng integrator implicit (ổn định vô điều kiện) cho lò xo siêu cứng; hoặc (iii) giảm độ cứng lò xo nếu gameplay cho phép. Đây là lý do lò xo cứng (vải căng, dây cứng) hay cần sub-stepping.

### Bài 7

Position Verlet lưu $p$ và $p_{old}$. Hiệu $p - p_{old}$ **chính là vận tốc × $\Delta t$** (quãng đi được bước vừa rồi). Công thức $p_{new} = p + (p - p_{old}) + a\Delta t^2$ nghĩa là "đi tiếp đúng quãng vừa đi (quán tính) cộng độ cong do gia tốc" → quán tính được mô phỏng **mà không cần lưu $v$ riêng** vì nó nằm ẩn trong hiệu hai vị trí.

Điều này tiện cho ràng buộc vì: khi cần ép khoảng cách 2 hạt về đúng $L$ (sợi vải), ta chỉ việc **dịch vị trí** các hạt. Verlet tự khắc "hiểu" cú dịch đó như một thay đổi vận tốc ở bước sau (vì $p - p_{old}$ đổi) — không cần tính lại $v$, không cần đồng bộ biến vận tốc với vị trí. Với hàng nghìn ràng buộc trong một tấm vải, việc "chỉ dịch vị trí rồi để Verlet lo vận tốc" làm code đơn giản và bền vững hơn nhiều (constraint relaxation — học ở Lesson 12).

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 02 — Vectors & Kinematics](../lesson-02-vectors-kinematics/).
- Bài tiếp theo: [Lesson 04 — Forces (Gravity/Drag/Friction)](../lesson-04-forces-gravity-drag-friction/) — biến lực thành gia tốc rồi đưa vào integrator này.
- Nền toán: [Math/04 — Tích phân xác định](../../../Math/04-Calculus-1var/lesson-07-definite-integral/) (tổng Riemann), [Vectors/03 — Calculus](../../../Vectors/03-Calculus/).
- Minh họa tương tác: [visualization.html](./visualization.html) — 3 phương pháp chạy đồng thời quanh quỹ đạo, slider $\Delta t$ để tự gây nổ, và đồ thị năng lượng theo thời gian.
