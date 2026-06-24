# Lesson 04 — Forces: Gravity, Drag, Friction (lực trong mô phỏng)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** chuyển động thực tế sinh ra từ **lực (force)** chứ không phải gán thẳng vận tốc — lực tạo gia tốc, gia tốc đổi vận tốc, vận tốc đổi vị trí.
- Dùng thành thạo **định luật II Newton** $\vec{F} = m\vec{a}$ ở dạng mô phỏng $\vec{a} = \vec{F}/m$, và biết **cộng nhiều lực** (net force) trước khi chia khối lượng.
- Mô hình hóa 3 loại lực phổ biến nhất trong game: **trọng lực (gravity)**, **lực kéo / cản (drag / air resistance)**, **ma sát (friction)**.
- Hiểu **vận tốc tới hạn (terminal velocity)** — vì sao vật rơi trong không khí không tăng tốc mãi.
- Cài đặt mẫu **`applyForce` accumulator**: cộng dồn lực mỗi frame, chia khối lượng, tích phân, rồi reset — nền của mọi engine vật lý.
- Tránh 3 lỗi kinh điển: quên chia khối lượng, đặt sai dấu drag (làm vật tăng tốc vô hạn), và ma sát "đảo chiều" vật khi không kẹp về 0.

## Kiến thức tiền đề

- [Lesson 03 — Integration (Euler/Verlet)](../lesson-03-integration-euler-verlet/) — **bắt buộc**. Bài này chỉ tính ra **gia tốc**; việc biến gia tốc → vận tốc → vị trí là tích phân số đã học ở L03.
- [Physics — Lực (forces)](../../../Physics/01-Mechanics/lesson-03-forces/) — nền vật lý về lực.
- [Physics — Ba định luật Newton](../../../Physics/01-Mechanics/lesson-02-newton-laws/) — $\vec{F} = m\vec{a}$ và quán tính.
- [Lesson 02 — Vectors & Kinematics](../lesson-02-vectors-kinematics/) — lực là **vector**, mọi phép cộng/nhân ở đây là phép vector.

---

## 1. Vì sao mô phỏng bằng LỰC, không gán thẳng vận tốc?

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn đẩy một chiếc xe đẩy siêu thị. Bạn không "đặt" vận tốc cho nó — bạn **đẩy** (tác dụng lực). Xe nặng thì cùng cú đẩy đó nó tăng tốc chậm hơn xe nhẹ. Buông tay (hết lực đẩy) nhưng ma sát bánh xe vẫn còn → xe chậm dần rồi dừng. Mọi chuyển động "thật" mà mắt ta thấy hợp lý đều ra đời theo cách đó: **lực sinh gia tốc, gia tốc thay đổi vận tốc**.

### 1.1. Câu hỏi mở đầu

> **Vì sao một chiếc lông vũ và một viên bi sắt — thả từ cùng độ cao — rơi rất khác nhau trong không khí, nhưng lại rơi *giống hệt* nhau trong chân không (như video phi hành gia thả búa và lông trên Mặt Trăng)? Và làm sao mô phỏng được điều đó trong game?**

Câu trả lời ngắn: **trọng lực** kéo cả hai với cùng *gia tốc* $g$ (không phụ thuộc khối lượng), nhưng trong không khí còn có **lực cản (drag)** — và lực cản tác động mạnh hơn rất nhiều lên lông vũ (nhẹ, diện tích lớn) so với bi sắt. Bài này sẽ xây từng mảnh để cuối bài bạn mô phỏng được chính xác cảnh này (xem module "Lông vũ vs Bi sắt" trong [visualization.html](./visualization.html)).

### 1.2. Hai cách làm — và vì sao chọn lực

| Cách | Mô tả | Vấn đề |
|------|-------|--------|
| **Gán thẳng vận tốc** (kinematic) | Mỗi frame ta tự đặt `pos += velocity·dt`, velocity do code quyết định | Không có quán tính, không tự nhiên; muốn vật "nặng" hay "chịu gió" phải hard-code từng trường hợp |
| **Mô phỏng bằng lực** (dynamic) | Lực → gia tốc → tích phân ra vận tốc & vị trí | Một công thức duy nhất xử lý gravity, gió, va chạm, lò xo... — tổ hợp được, tự nhiên |

→ Game/engine vật lý chọn cách thứ hai vì nó **tổ hợp (compose)**: thêm một lực mới (gió, lực đẩy, lò xo) chỉ là *cộng thêm một vector* vào net force, không phải viết lại logic chuyển động.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao "gán thẳng vận tốc" khó tạo cảm giác vật nặng?
> <details><summary>Đáp án</summary>Vì khi gán thẳng, vận tốc đạt giá trị mong muốn ngay lập tức — không có giai đoạn "tăng tốc dần". Cảm giác nặng/nhẹ đến từ <em>gia tốc</em> (cùng lực, vật nặng tăng tốc chậm hơn). Chỉ mô hình lực mới sinh ra điều đó tự nhiên qua $a = F/m$.</details>

---

## 2. Định luật II Newton: $\vec{F} = m\vec{a}$ → $\vec{a} = \vec{F}/m$

> 💡 **Trực giác.** $\vec{F} = m\vec{a}$ đọc là: "lực bằng khối lượng nhân gia tốc". Nhưng trong mô phỏng ta biết **lực** và **khối lượng**, cần tìm **gia tốc**, nên ta dùng dạng đảo $\vec{a} = \vec{F}/m$. Khối lượng đóng vai trò "độ ì": cùng một lực, $m$ càng lớn thì $a$ càng nhỏ.

### 2.1. Định nghĩa các đại lượng (tự đủ)

**Lực (force) $\vec{F}$** — *(a) Là gì:* đại lượng vector mô tả "sự đẩy/kéo" tác dụng lên vật, đơn vị **Newton (N)**. *(b) Vì sao cần:* vì chuyển động đổi (tăng/giảm tốc, đổi hướng) chỉ xảy ra khi có lực — không lực thì vật giữ nguyên vận tốc (định luật I Newton). *(c) Ví dụ số:* đẩy hộp với lực $\vec{F} = (5, 0)$ N nghĩa là đẩy sang phải 5 N.

**Khối lượng (mass) $m$** — *(a) Là gì:* đại lượng vô hướng (số dương) đo "lượng vật chất" / độ ì của vật, đơn vị **kg**. *(b) Vì sao cần:* nó quyết định cùng một lực sinh ra bao nhiêu gia tốc — chính là cái làm vật "nặng" hay "nhẹ" khi va chạm/chịu lực. *(c) Ví dụ số:* $m = 2$ kg chịu lực 10 N → $a = 10/2 = 5$ m/s².

**Gia tốc (acceleration) $\vec{a}$** — *(a) Là gì:* tốc độ thay đổi của vận tốc theo thời gian, đơn vị **m/s²**. *(b) Vì sao cần:* nó là cầu nối giữa lực và chuyển động — đây chính là đại lượng ta tích phân (L03) để ra vận tốc. *(c) Ví dụ số:* $a = 5$ m/s² nghĩa là cứ mỗi giây vận tốc tăng thêm 5 m/s.

### 2.2. Walk-through bằng số — một lực

Vật $m = 4$ kg chịu một lực duy nhất $\vec{F} = (8, -12)$ N. Gia tốc:

$$\vec{a} = \frac{\vec{F}}{m} = \frac{(8, -12)}{4} = (2, -3) \text{ m/s}^2$$

Kiểm tra ngược: $m\vec{a} = 4 \cdot (2, -3) = (8, -12) = \vec{F}$ ✓.

### 2.3. Cộng nhiều lực (net force) — chia khối lượng MỘT lần ở cuối

Khi nhiều lực cùng tác dụng, ta **cộng vector tất cả lại** thành **net force** $\vec{F}_{net}$ rồi mới chia khối lượng:

$$\vec{F}_{net} = \sum_i \vec{F}_i, \qquad \vec{a} = \frac{\vec{F}_{net}}{m}$$

> ⚠ **Lỗi thường gặp — quên chia khối lượng.** Rất nhiều người mới cộng các lực rồi cộng thẳng vào vận tốc (`vel += F_net·dt`). Sai! Đơn vị không khớp: lực không phải gia tốc. Phải `acc = F_net / mass` *trước*, rồi `vel += acc·dt`. Triệu chứng: vật nặng và vật nhẹ chuyển động y hệt nhau khi chịu cùng lực (lẽ ra vật nặng phải ì hơn).

**Walk-through đầy đủ: net force → gia tốc → tích phân (Euler bán-ẩn, $dt = 0.1$ s).**

Vật $m = 2$ kg đang đứng yên tại $\vec{p} = (0, 0)$, $\vec{v} = (0, 0)$. Ba lực tác dụng:

- Trọng lực: $\vec{F}_g = (0, -19.6)$ N (vì $m \cdot g = 2 \cdot 9.8 = 19.6$, hướng xuống).
- Gió thổi ngang: $\vec{F}_w = (6, 0)$ N.
- Một lực đẩy chéo: $\vec{F}_p = (-2, 4)$ N.

**Bước 1 — Net force (cộng vector):**

$$\vec{F}_{net} = (0, -19.6) + (6, 0) + (-2, 4) = (0 + 6 - 2,\; -19.6 + 0 + 4) = (4, -15.6) \text{ N}$$

**Bước 2 — Gia tốc (chia khối lượng):**

$$\vec{a} = \frac{(4, -15.6)}{2} = (2, -7.8) \text{ m/s}^2$$

**Bước 3 — Tích phân vận tốc (Euler: $\vec{v} \mathrel{+}= \vec{a}\,dt$):**

$$\vec{v} = (0, 0) + (2, -7.8)\cdot 0.1 = (0.2, -0.78) \text{ m/s}$$

**Bước 4 — Tích phân vị trí (semi-implicit: dùng $\vec{v}$ *mới*):**

$$\vec{p} = (0, 0) + (0.2, -0.78)\cdot 0.1 = (0.02, -0.078) \text{ m}$$

Sau frame này: vật đã có vận tốc và đã dịch chuyển. Frame sau ta lặp lại từ Bước 1 (các lực có thể đã đổi). Đây chính là vòng lặp mọi engine chạy 60 lần/giây.

### 2.4. Bốn ví dụ số $\vec{a} = \vec{F}/m$

| # | $\vec{F}_{net}$ (N) | $m$ (kg) | $\vec{a} = \vec{F}/m$ (m/s²) | Ghi chú |
|---|---|---|---|---|
| 1 | $(10, 0)$ | $2$ | $(5, 0)$ | lực ngang, vật tăng tốc sang phải |
| 2 | $(0, -19.6)$ | $2$ | $(0, -9.8)$ | chỉ trọng lực → đúng bằng $g$ |
| 3 | $(0, -49)$ | $5$ | $(0, -9.8)$ | vật nặng hơn nhưng $a$ vẫn $-9.8$ (vì $F_g$ tỉ lệ $m$) |
| 4 | $(3, 4)$ | $0.5$ | $(6, 8)$ | vật nhẹ → gia tốc lớn; $\|a\| = 10$ |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Khối lượng có thể bằng 0 không?"* — Không. Chia cho 0 → vô cực. Vật "bất động" (tường, sàn) thường mô hình bằng `mass = ∞` (hoặc `invMass = 1/mass = 0` để khi nhân vào thì lực không sinh gia tốc). Lưu **nghịch đảo khối lượng** `invMass` là mẹo phổ biến trong engine.
> - *"Vì sao ví dụ 2 và 3 ra cùng $a = -9.8$?"* — Vì trọng lực $F_g = m g$ *tỉ lệ thuận* với $m$; khi chia lại cho $m$ thì $m$ triệt tiêu: $a = mg/m = g$. Đây chính là lý do lông vũ và bi sắt rơi cùng gia tốc *khi không có không khí*.

> 📝 **Tóm tắt mục 2.**
> - Mô phỏng dùng dạng đảo: $\vec{a} = \vec{F}_{net}/m$.
> - **Cộng tất cả lực** thành net force *trước*, **chia khối lượng** *một lần ở cuối*.
> - Quên chia khối lượng = lỗi #1; triệu chứng là vật nặng/nhẹ chuyển động như nhau.
> - Gia tốc tính ra ở đây được đem **tích phân** (L03) để ra vận tốc & vị trí.

---

## 3. Trọng lực (Gravity)

### 3.1. Trọng lực gần mặt đất — lực không đổi

> 💡 **Trực giác.** Ở quy mô một màn game (vài chục mét), Trái Đất kéo mọi vật xuống với *cùng một gia tốc* $g \approx 9.8$ m/s², bất kể vật nặng nhẹ. Nên cách đơn giản nhất: **bỏ qua khối lượng, gán thẳng gia tốc trọng trường** $\vec{a}_g = (0, -g)$ (trong tọa độ màn hình y hướng lên).

Có hai cách tương đương để đưa trọng lực vào hệ:

**Cách A — như một gia tốc hằng** (đơn giản, hay dùng): mỗi frame cộng $\vec{a}\mathrel{+}=(0, -g)$. Không cần khối lượng.

**Cách B — như một lực** (đúng dạng, để cộng chung với các lực khác): $\vec{F}_g = m \cdot \vec{g} = (0, -m g)$. Khi chia lại cho $m$ ra đúng $(0, -g)$.

→ Dùng **Cách B** khi vật còn chịu lực khác (drag, gió), để mọi thứ cộng chung vào net force rồi chia $m$ một lần. Dùng Cách A khi *chỉ* có trọng lực.

> ⚠ **Lỗi dấu.** Trong tọa độ màn hình (canvas) **y tăng xuống dưới**, nên "xuống" là **+y**, và trọng lực phải là $(0, +g)$. Trong tọa độ toán học (y hướng lên) thì là $(0, -g)$. Chọn một quy ước và nhất quán — đảo dấu → vật "rơi lên trời".

**Bốn ví dụ số (lực trọng trường $F_g = m g$, lấy $g = 9.8$):**

| # | $m$ (kg) | $F_g = m g$ (N) | $a_g = F_g/m$ (m/s²) |
|---|---|---|---|
| 1 | $1$ | $9.8$ | $9.8$ |
| 2 | $2$ | $19.6$ | $9.8$ |
| 3 | $0.5$ | $4.9$ | $9.8$ |
| 4 | $10$ | $98$ | $9.8$ |

Cột cuối luôn $9.8$ — đó là điểm mấu chốt: **gia tốc trọng trường không phụ thuộc khối lượng.**

### 3.2. Lực hấp dẫn giữa hai vật (gravitation) — cho orbit

> 💡 **Trực giác.** Trọng lực $(0, -g)$ ở trên chỉ là *xấp xỉ địa phương*. Tổng quát, **mọi cặp vật hút nhau**, lực càng mạnh khi gần và khi khối lượng lớn. Đây là lực giữ hành tinh quay quanh Mặt Trời.

Độ lớn lực hấp dẫn Newton giữa hai vật khối lượng $m_1, m_2$ cách nhau $r$:

$$F = G\,\frac{m_1 m_2}{r^2}$$

với $G \approx 6.674\times 10^{-11}$ (đơn vị SI). Lực hướng dọc đường nối hai tâm, kéo chúng lại gần.

**Walk-through (số nhỏ minh họa, không phải SI thật):** giả sử trong game ta đặt $G = 1$, hành tinh $m_1 = 1000$, vệ tinh $m_2 = 1$, khoảng cách $r = 10$. Khi đó:

$$F = 1 \cdot \frac{1000 \cdot 1}{10^2} = \frac{1000}{100} = 10$$

Lực này hướng từ vệ tinh về phía hành tinh; chia cho $m_2 = 1$ ra gia tốc $a = 10$ hướng vào tâm — chính lực này bẻ cong đường đi thẳng của vệ tinh thành quỹ đạo cong (orbit). Chi tiết quỹ đạo: xem [Astronomy — Gravity & Orbits](../../../Astronomy/01-SolarSystem/lesson-05-gravity-orbits/) nếu có.

**Bốn ví dụ số ($G = 1$, $m_1 = 1000$, $m_2 = 1$):**

| # | $r$ | $F = 1000/r^2$ | Nhận xét |
|---|---|---|---|
| 1 | $10$ | $10$ | xa nhất trong nhóm |
| 2 | $5$ | $40$ | gần một nửa → lực gấp 4 (luật nghịch bình phương) |
| 3 | $2$ | $250$ | rất gần → lực rất mạnh |
| 4 | $20$ | $2.5$ | xa gấp đôi $r=10$ → lực bằng 1/4 |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao $r$ giảm một nửa thì lực gấp 4, không phải gấp 2?"* — Vì $r$ ở **mẫu số bình phương**: $F \propto 1/r^2$. $r \to r/2$ thì $1/r^2 \to 1/(r/2)^2 = 4/r^2$. So sánh ví dụ 1 ($r=10, F=10$) và ví dụ 2 ($r=5, F=40$): đúng gấp 4.

> 📝 **Tóm tắt mục 3.**
> - Trọng lực địa phương = lực/gia tốc **không đổi**; gia tốc $g$ **độc lập khối lượng**.
> - Đưa vào dạng lực $\vec{F}_g = (0, -mg)$ để cộng chung với drag/gió; dạng gia tốc $(0,-g)$ khi chỉ có trọng lực.
> - Cẩn thận **dấu y** theo hệ tọa độ (canvas y xuống → trọng lực $+y$).
> - Lực hấp dẫn hai vật $F = G m_1 m_2 / r^2$ (luật nghịch bình phương) sinh ra orbit.

---

## 4. Lực kéo / cản (Drag / Air Resistance)

> 💡 **Trực giác.** Thò tay ra ngoài cửa xe đang chạy — bạn cảm thấy không khí *đẩy ngược lại*. Càng đi nhanh, lực đẩy ngược càng mạnh. Drag là lực **luôn ngược hướng vận tốc**, "phanh" vật lại. Đây là lý do vật rơi không tăng tốc mãi.

### 4.1. Hai mô hình drag

**Drag tuyến tính (linear, low-speed):** độ lớn tỉ lệ *tốc độ*:

$$\vec{F}_{drag} = -k\,\vec{v}$$

Dấu trừ = ngược hướng $\vec{v}$. Hệ số $k > 0$ (đơn vị kg/s) gom mọi yếu tố (độ nhớt, hình dạng). Dùng cho vật nhỏ/chậm (bụi, viên bi trong dầu).

**Drag bậc hai (quadratic, high-speed):** độ lớn tỉ lệ *bình phương* tốc độ:

$$\vec{F}_{drag} = -k\,|\vec{v}|\,\vec{v} = -k\,|\vec{v}|^2\,\hat{v}$$

với $\hat{v} = \vec{v}/|\vec{v}|$ là vector đơn vị chỉ hướng. Đây là mô hình thực tế cho không khí ở tốc độ thường (người nhảy dù, ô tô).

> ⚠ **Lỗi dấu drag — vật tăng tốc vô hạn.** Nếu lỡ viết $\vec{F}_{drag} = +k\vec{v}$ (quên dấu trừ), drag sẽ *cùng hướng* vận tốc, **bơm thêm năng lượng** → vật tăng tốc bùng nổ tới vô cực (NaN). Luôn nhớ: drag **chống lại** chuyển động, nên hệ số phải âm so với $\vec{v}$. Triệu chứng debug: vận tốc tăng mỗi frame thay vì giảm dù không có lực đẩy.

> ⚠ **Lỗi $\hat{v}$ khi $\vec{v} = 0$.** Tính $\hat{v} = \vec{v}/|\vec{v}|$ khi vật đứng yên → chia cho 0 → NaN. Luôn kiểm tra `if (speed > 0)` trước khi chuẩn hóa, đứng yên thì drag = 0.

### 4.2. Vận tốc tới hạn (terminal velocity)

> 💡 **Trực giác.** Khi rơi, trọng lực kéo xuống (không đổi), drag cản lại (tăng theo tốc độ). Lúc đầu drag nhỏ → vật tăng tốc. Càng nhanh drag càng lớn, đến khi **drag = trọng lực**, net force = 0, gia tốc = 0 → vật rơi với **tốc độ không đổi**. Tốc độ đó là *vận tốc tới hạn* $v_t$.

**Tìm $v_t$ — drag tuyến tính.** Cân bằng: $mg = k v_t$ ⟹

$$v_t = \frac{mg}{k}$$

**Walk-through số:** $m = 2$ kg, $g = 9.8$, $k = 4$ kg/s:

$$v_t = \frac{2 \cdot 9.8}{4} = \frac{19.6}{4} = 4.9 \text{ m/s}$$

Kiểm tra ở $v = 4.9$: drag $= k v = 4 \cdot 4.9 = 19.6$ N; trọng lực $= mg = 19.6$ N → bằng nhau, net = 0 ✓.

**Tìm $v_t$ — drag bậc hai.** Cân bằng: $mg = k v_t^2$ ⟹

$$v_t = \sqrt{\frac{mg}{k}}$$

**Walk-through số:** $m = 2$, $g = 9.8$, $k = 0.5$:

$$v_t = \sqrt{\frac{2 \cdot 9.8}{0.5}} = \sqrt{\frac{19.6}{0.5}} = \sqrt{39.2} \approx 6.26 \text{ m/s}$$

### 4.3. Bốn ví dụ số (drag tuyến tính $F = -k v$, theo trục đứng)

| # | $v$ (m/s, xuống) | $k$ | $F_{drag} = -k v$ | Hướng |
|---|---|---|---|---|
| 1 | $+2$ | $3$ | $-6$ | ngược lên (cản) |
| 2 | $+5$ | $3$ | $-15$ | cản mạnh hơn (nhanh hơn) |
| 3 | $-4$ (đang bay lên) | $3$ | $+12$ | cản xuống (luôn ngược $v$) |
| 4 | $0$ | $3$ | $0$ | đứng yên → không drag |

Chú ý ví dụ 3: vật bay *lên* thì drag hướng *xuống* — drag luôn theo dấu ngược $v$.

> 🔁 **Dừng lại tự kiểm tra.** Vật $m=1$, $g=10$, drag tuyến tính $k=2$. Vận tốc tới hạn là bao nhiêu? Ở $v_t$ gia tốc bằng mấy?
> <details><summary>Đáp án</summary>$v_t = mg/k = (1\cdot10)/2 = 5$ m/s. Tại $v_t$: drag $= kv_t = 2\cdot5 = 10$ N $=$ trọng lực $mg = 10$ N → net force = 0 → gia tốc = 0. Vật rơi đều ở 5 m/s.</details>

> ❓ **Câu hỏi tự nhiên.** *"Vật có bao giờ chạy nhanh hơn $v_t$ không?"* — Nếu thả từ trạng thái đứng yên thì không: nó tăng tốc tiệm cận $v_t$ từ dưới. Nhưng nếu bạn *ném xuống* nhanh hơn $v_t$, drag sẽ lớn hơn trọng lực → vật **chậm lại** về $v_t$. $v_t$ là điểm cân bằng hút mọi vận tốc về nó.

> 📝 **Tóm tắt mục 4.**
> - Drag **luôn ngược hướng** vận tốc: tuyến tính $-k\vec{v}$, bậc hai $-k|\vec{v}|\vec{v}$.
> - Sai dấu drag → tăng tốc vô hạn (NaN); $\hat v$ khi $v=0$ → NaN — kiểm `speed>0`.
> - Vận tốc tới hạn: tuyến tính $v_t = mg/k$; bậc hai $v_t = \sqrt{mg/k}$ — nơi drag cân bằng trọng lực.

---

## 5. Ma sát (Friction)

> 💡 **Trực giác.** Đẩy nhẹ một quyển sách trên bàn — nó không nhúc nhích (ma sát *tĩnh* giữ chặt). Đẩy mạnh hơn vượt ngưỡng — nó bắt đầu trượt, rồi *chậm dần* khi buông tay (ma sát *động* cản lại). Ma sát là lực ở **bề mặt tiếp xúc**, luôn chống lại xu hướng trượt.

### 5.1. Ma sát tĩnh vs động

- **Ma sát tĩnh (static):** chống lại *xu hướng bắt đầu trượt*. Vật chưa trượt thì ma sát tĩnh đúng bằng (và ngược chiều) lực đẩy, tới một **ngưỡng tối đa** $F_{s,max} = \mu_s N$. Vượt ngưỡng → vật bắt đầu trượt.
- **Ma sát động (kinetic):** khi vật *đang trượt*, ma sát có độ lớn gần như không đổi $F_k = \mu_k N$, **ngược hướng vận tốc**.

Trong đó:
- $N$ = **lực pháp tuyến (normal force)** — lực mặt sàn đẩy vuông góc lên vật. Trên mặt phẳng ngang $N = mg$.
- $\mu_s, \mu_k$ = **hệ số ma sát** (tĩnh / động), không thứ nguyên, thường $\mu_s > \mu_k$ (khó *bắt đầu* trượt hơn là *duy trì* trượt).

Công thức cốt lõi (ma sát động trong game, đơn giản hóa):

$$\vec{F}_{friction} = -\mu\,N\,\hat{v} = -\mu\,m g\,\hat{v}$$

(ngược hướng vận tốc, trên mặt ngang).

### 5.2. Walk-through số (ma sát động trên mặt ngang)

Hộp $m = 3$ kg trượt sang phải với $v = (4, 0)$, $g = 9.8$, $\mu_k = 0.3$. Mặt ngang nên $N = mg = 3 \cdot 9.8 = 29.4$ N.

$$F_{friction} = \mu_k N = 0.3 \cdot 29.4 = 8.82 \text{ N, hướng } -x \text{ (ngược } v)$$

Gia tốc do ma sát: $a = F/m = 8.82 / 3 = 2.94$ m/s² (giảm tốc, hướng $-x$).

Sau $dt = 0.1$ s: $v_x = 4 - 2.94 \cdot 0.1 = 4 - 0.294 = 3.706$ m/s. Vật chậm dần — đúng như trực giác.

> ⚠ **Lỗi ma sát làm vật ĐẢO CHIỀU.** Ma sát chỉ được phép *làm dừng* vật, không được đẩy nó chạy ngược. Nhưng nếu áp công thức `v -= frictionAccel·dt` một cách máy móc, frame mà $v$ rất nhỏ, lượng trừ có thể *lớn hơn* $v$ → vật đổi dấu vận tốc (chạy ngược!) rồi ma sát lại đẩy ngược nữa → rung lắc quanh 0. **Cách sửa: kẹp về 0** — nếu lượng giảm tốc đủ để đảo dấu, đặt thẳng $v = 0$:
> ```
> dv = frictionAccel * dt
> if (abs(v) <= dv) v = 0          // kẹp về 0, không cho đảo chiều
> else v -= sign(v) * dv
> ```

### 5.3. Bốn ví dụ số ($N = mg$, $m = 2$, $g = 9.8$ ⟹ $N = 19.6$ N)

| # | $\mu_k$ | $F_f = \mu_k N$ (N) | $a_f = F_f/m$ (m/s²) | Bề mặt tương ứng |
|---|---|---|---|---|
| 1 | $0.05$ | $0.98$ | $0.49$ | băng (trượt rất lâu mới dừng) |
| 2 | $0.3$ | $5.88$ | $2.94$ | gỗ |
| 3 | $0.6$ | $11.76$ | $5.88$ | cao su / nhám |
| 4 | $1.0$ | $19.6$ | $9.8$ | rất bám (dừng gần như tức thì) |

$\mu$ càng lớn → giảm tốc càng mạnh → dừng càng nhanh. Đây là tham số bạn chỉnh để mô phỏng "mặt băng" vs "mặt nhám" trong module Friction của viz.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao đẩy một cái tủ nặng lúc đầu cảm thấy "cứng" rồi đột nhiên "nhẹ hơn" khi nó bắt đầu trượt?
> <details><summary>Đáp án</summary>Vì $\mu_s > \mu_k$: lúc chưa trượt phải thắng ma sát <em>tĩnh</em> tối đa $\mu_s N$ (lớn). Khi đã trượt, chỉ còn ma sát <em>động</em> $\mu_k N$ (nhỏ hơn) → cảm thấy nhẹ hơn dù vẫn đang đẩy.</details>

> 📝 **Tóm tắt mục 5.**
> - Tĩnh: giữ vật tới ngưỡng $\mu_s N$; động: cản trượt với $\mu_k N$, ngược hướng $v$.
> - Trên mặt ngang $N = mg$ nên $F_f = \mu m g$.
> - **Bắt buộc kẹp về 0** khi giảm tốc vượt vận tốc còn lại — nếu không vật đảo chiều / rung.

---

## 6. Mẫu áp lực: `applyForce` accumulator

> 💡 **Trực giác.** Mỗi frame ta như một kế toán: **gom (accumulate)** mọi lực tác dụng trong frame vào một "rổ" `acc`, cuối frame chia khối lượng để ra gia tốc, tích phân, rồi **đổ rổ về 0** cho frame sau. Lực không "nhớ" qua frame — phải áp lại mỗi frame.

Mẫu chuẩn (mọi engine: Box2D, Matter.js, Unity rigidbody... đều theo ý này):

```go
type Body struct {
    pos, vel, acc Vec2  // vị trí, vận tốc, gia tốc tích lũy
    mass          float64
}

// Gọi nhiều lần mỗi frame, mỗi lần một lực. CHIA khối lượng ngay khi cộng:
//   F = m·a  →  a = F/m  →  a tích lũy += F/mass
func (b *Body) applyForce(f Vec2) {
    b.acc = b.acc.Add(f.Scale(1.0 / b.mass))
}

// Mỗi frame:
func (b *Body) update(dt float64) {
    // 1. Áp các lực (gom vào acc qua applyForce ở trên)
    b.applyForce(Vec2{0, b.mass * G})          // trọng lực (dạng lực → /mass triệt tiêu)
    b.applyForce(b.vel.Scale(-k))              // drag tuyến tính -k·v
    // ... gió, lò xo, va chạm ...

    // 2. Tích phân (semi-implicit Euler — xem L03)
    b.vel = b.vel.Add(b.acc.Scale(dt))         // v += a·dt
    b.pos = b.pos.Add(b.vel.Scale(dt))         // p += v·dt  (dùng v MỚI)

    // 3. RESET accumulator — lực không nhớ qua frame!
    b.acc = Vec2{0, 0}
}
```

> ⚠ **Lỗi quên reset `acc`.** Nếu không đặt `acc = 0` cuối frame, lực frame trước *cộng dồn* mãi → gia tốc tăng vô hạn → vật bắn đi. Reset là bắt buộc.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao chia khối lượng ngay trong `applyForce`, không cộng lực thô rồi chia một lần?"* — Cả hai đúng về mặt toán (cộng $F_i/m$ = cộng $F_i$ rồi $/m$ vì $m$ chung). Chia ngay tiện hơn vì nhiều engine cho mỗi body một khối lượng riêng, và lưu sẵn `invMass = 1/mass` để nhân (nhanh hơn chia, và `invMass = 0` biểu diễn vật bất động gọn gàng).

> 📝 **Tóm tắt mục 6.**
> - `applyForce(f)`: `acc += f / mass` — gom lực, chia khối lượng ngay.
> - Mỗi frame: áp lực → tích phân (L03) → **reset `acc = 0`**.
> - Quên reset = lực cộng dồn = vật bắn đi.

---

## 7. Bức tranh lớn: lực + tích phân = nền mọi mô phỏng

Mọi thứ trong bài này khớp vào một vòng lặp duy nhất:

```
mỗi frame:
  acc = 0
  applyForce(gravity)      ← §3
  applyForce(drag)         ← §4
  applyForce(friction)     ← §5
  applyForce(gió, lò xo, va chạm ...)
  a = Σ F / m              ← §2 (đã chia trong applyForce)
  v += a·dt; p += v·dt     ← L03 tích phân
  acc = 0
```

- **Tích phân (L03)** là cỗ máy biến gia tốc thành chuyển động — bài này chỉ cung cấp gia tốc.
- **Lò xo (L05)** chỉ là *thêm một lực nữa*: $\vec{F}_{spring} = -k_s(\vec{x} - \vec{x}_0)$ (định luật Hooke). Cộng vào net force y như gravity/drag. Sẽ học kỹ ở [Lesson 05 — Springs & Oscillation](../lesson-05-springs-oscillation/).
- **Va chạm (collision, Tier 2)** sinh ra **lực/xung lượng (impulse)** đẩy hai vật tách nhau — cũng quy về thay đổi vận tốc, cùng một framework.

Hiểu chương này = bạn đã có "engine vật lý mini" trong đầu: thêm bất kỳ hiện tượng nào chỉ là viết thêm một hàm trả về vector lực.

---

## Bài tập

> Làm trước khi xem lời giải. Mọi bài có đáp án step-by-step ở mục kế tiếp.

**Bài 1 (net force → gia tốc).** Vật $m = 5$ kg chịu 3 lực: $\vec{F}_1 = (10, 0)$, $\vec{F}_2 = (0, -49)$ (trọng lực), $\vec{F}_3 = (-4, 9)$. Tính net force và gia tốc.

**Bài 2 (gravity, độc lập khối lượng).** Hai vật $m_A = 1$ kg và $m_B = 8$ kg cùng chịu *chỉ* trọng lực ($g = 9.8$). Tính lực trọng trường và gia tốc mỗi vật. Vật nào rơi nhanh hơn (trong chân không)? Giải thích.

**Bài 3 (terminal velocity tuyến tính).** Vật $m = 4$ kg, $g = 9.8$, drag tuyến tính $\vec{F} = -k\vec{v}$ với $k = 8$ kg/s. (a) Tính vận tốc tới hạn $v_t$. (b) Tại $v = 3$ m/s (xuống), tính net force và gia tốc — vật còn đang tăng hay giảm tốc?

**Bài 4 (terminal velocity bậc hai).** Người nhảy dù $m = 80$ kg, $g = 9.8$, drag bậc hai $\vec{F} = -k|\vec{v}|\vec{v}$ với $k = 0.25$. Tính vận tốc tới hạn.

**Bài 5 (friction kẹp 0).** Hộp $m = 2$ kg trượt với $v = (0.5, 0)$ m/s, $g = 9.8$, $\mu_k = 0.4$, $dt = 0.1$ s. (a) Tính gia tốc ma sát. (b) Áp một bước tích phân — có hiện tượng đảo chiều không? Phải làm gì?

**Bài 6 (lông vũ vs bi sắt — tổng hợp).** Bi sắt $m = 5$ kg, $k_{sắt} = 0.1$; lông vũ $m = 0.01$ kg, $k_{lông} = 0.5$ (drag tuyến tính, $g = 9.8$). Tính $v_t$ mỗi vật. Vật nào "treo lơ lửng" chậm hơn? Trong chân không ($k = 0$) thì sao?

---

## Lời giải chi tiết

### Bài 1

**Net force** (cộng từng thành phần):

$$\vec{F}_{net} = (10 + 0 - 4,\; 0 - 49 + 9) = (6, -40) \text{ N}$$

**Gia tốc** (chia khối lượng $m = 5$):

$$\vec{a} = \frac{(6, -40)}{5} = (1.2, -8) \text{ m/s}^2$$

Kiểm tra ngược: $5 \cdot (1.2, -8) = (6, -40) = \vec{F}_{net}$ ✓.

### Bài 2

Lực trọng trường $F_g = m g$:
- Vật A: $F_g = 1 \cdot 9.8 = 9.8$ N; gia tốc $a = F_g/m = 9.8/1 = 9.8$ m/s².
- Vật B: $F_g = 8 \cdot 9.8 = 78.4$ N; gia tốc $a = 78.4/8 = 9.8$ m/s².

**Hai vật rơi nhanh như nhau** (cùng $a = 9.8$). Vật B chịu lực lớn hơn 8 lần, nhưng cũng "ì" hơn 8 lần (khối lượng gấp 8) — hai cái triệt tiêu: $a = mg/m = g$. Đây chính là lý do trong chân không, lông vũ và bi sắt chạm đất cùng lúc.

### Bài 3

**(a) Vận tốc tới hạn:** cân bằng $mg = k v_t$ ⟹

$$v_t = \frac{mg}{k} = \frac{4 \cdot 9.8}{8} = \frac{39.2}{8} = 4.9 \text{ m/s}$$

**(b) Tại $v = 3$ m/s (xuống):**
- Trọng lực: $F_g = mg = 39.2$ N (xuống).
- Drag: $F_{drag} = -k v = -8 \cdot 3 = -24$ N (lên, ngược $v$); độ lớn 24 N.
- Net (lấy xuống là dương): $39.2 - 24 = 15.2$ N (vẫn xuống).
- Gia tốc: $a = 15.2 / 4 = 3.8$ m/s² (xuống).

Net force còn hướng xuống ($> 0$) → vật **vẫn đang tăng tốc** (chưa đạt $v_t = 4.9$). Hợp lý: $3 < 4.9$.

### Bài 4

Drag bậc hai, cân bằng $mg = k v_t^2$ ⟹

$$v_t = \sqrt{\frac{mg}{k}} = \sqrt{\frac{80 \cdot 9.8}{0.25}} = \sqrt{\frac{784}{0.25}} = \sqrt{3136} = 56 \text{ m/s}$$

(≈ 200 km/h — đúng cỡ vận tốc rơi tự do của người trước khi bung dù.)

### Bài 5

$N = mg = 2 \cdot 9.8 = 19.6$ N. Ma sát động:

$$F_f = \mu_k N = 0.4 \cdot 19.6 = 7.84 \text{ N}; \quad a_f = \frac{F_f}{m} = \frac{7.84}{2} = 3.92 \text{ m/s}^2$$

**(a)** Gia tốc ma sát = $3.92$ m/s², hướng $-x$ (ngược $v$).

**(b)** Lượng giảm vận tốc một bước: $dv = a_f \cdot dt = 3.92 \cdot 0.1 = 0.392$ m/s.

Vận tốc hiện tại chỉ $0.5$ m/s. Nếu trừ máy móc: $0.5 - 0.392 = 0.108$ — chưa đảo chiều ở bước này. Nhưng nếu $dt$ lớn hơn (vd $dt = 0.2$ → $dv = 0.784 > 0.5$) thì $0.5 - 0.784 = -0.284$ → **vật đảo chiều chạy ngược** (sai!). **Phải kẹp:** kiểm tra `if (abs(v) <= dv) v = 0`. Với $dt = 0.2$ ở trên, $0.5 \le 0.784$ → đặt $v = 0$ (vật dừng hẳn), không cho âm.

### Bài 6

Drag tuyến tính, $v_t = mg/k$:
- **Bi sắt:** $v_t = \dfrac{5 \cdot 9.8}{0.1} = \dfrac{49}{0.1} = 490$ m/s.
- **Lông vũ:** $v_t = \dfrac{0.01 \cdot 9.8}{0.5} = \dfrac{0.098}{0.5} = 0.196$ m/s.

**Lông vũ "treo lơ lửng" hơn** — vận tốc tới hạn chỉ ~0.2 m/s, rơi rất chậm; bi sắt tới hạn 490 m/s (thực tế chạm đất trước khi đạt, nên gần như rơi tự do). Khác biệt do lông vũ vừa **rất nhẹ** ($mg$ nhỏ) vừa **drag lớn** ($k$ cao).

**Trong chân không ($k = 0$):** không có drag, $v_t = mg/k \to \infty$ (không tồn tại). Cả hai chỉ chịu trọng lực → cùng gia tốc $g = 9.8$ → **rơi y hệt nhau**, chạm đất cùng lúc. Đây chính xác là cảnh thí nghiệm búa–lông trên Mặt Trăng. (Mô phỏng trực tiếp trong module "Lông vũ vs Bi sắt" của [visualization.html](./visualization.html).)

---

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác realtime:
  1. **Force Playground** — vật rơi, bật/tắt từng lực (trọng lực, drag tuyến tính/bậc hai, gió), kéo slider hệ số $k$ và khối lượng, xem quỹ đạo + biểu đồ vận tốc tiệm cận vận tốc tới hạn.
  2. **Lông vũ vs Bi sắt** — hai vật khác khối lượng/drag rơi cạnh nhau, gạt công tắc **chân không / không khí** để thấy chúng rơi giống/khác nhau.
  3. **Friction Lab** — vật trượt trên mặt phẳng, kéo slider $\mu$ thấy nó dừng nhanh/chậm, vector các lực (trọng lực, pháp tuyến, ma sát) vẽ realtime.

---

## Bài tiếp theo

- [Lesson 05 — Springs & Oscillation](../lesson-05-springs-oscillation/) — lò xo (định luật Hooke) chỉ là *thêm một lực nữa* vào đúng framework này; sinh ra dao động điều hòa.

## Tham khảo

- [Lesson 03 — Integration (Euler/Verlet)](../lesson-03-integration-euler-verlet/) — cỗ máy tích phân biến gia tốc thành chuyển động.
- [Physics — Lực (forces)](../../../Physics/01-Mechanics/lesson-03-forces/)
- [Physics — Ba định luật Newton](../../../Physics/01-Mechanics/lesson-02-newton-laws/)
- [Lesson 02 — Vectors & Kinematics](../lesson-02-vectors-kinematics/) — lực và mọi đại lượng ở đây đều là vector.
