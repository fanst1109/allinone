# Lesson 07 — Cung chuyển động (Arcs & Path)

> Gần như mọi chuyển động sống động đều đi theo **cung/đường cong (arc)**, không phải đường thẳng. Tay vung theo cung, bóng bay theo parabol, đầu gật theo vòng nhẹ. Chuyển động thẳng tuyệt đối trông **máy móc, robot**.

## Mục tiêu học tập

- Giải thích được *vì sao* chuyển động tự nhiên đi theo cung: cơ thể xoay quanh **khớp (pivot/joint)** và vật thể chịu **trọng lực (gravity)**.
- Phân biệt hai họ cung: **cung tròn** (quanh khớp xoay, bán kính $R$) và **parabol** (vật bay dưới trọng lực).
- Lượng hóa "độ cong" bằng **bán kính $R$** và **độ phồng (sagitta) $s$** — biết vì sao $R$ nhỏ = cung gắt, $R$ lớn = cung thoải.
- Dùng kỹ thuật **vẽ vết quỹ đạo (motion path / arc tracking)** để kiểm tra một chuyển động có "cong đẹp" không.
- Nhận ra chuyển động thẳng giữa hai keyframe cho cảm giác cứng/robot, và cách "bẻ cong" nó cho tự nhiên.

## Kiến thức tiền đề

- Đã nắm **timing & spacing** (khoảng cách giữa các frame) — ở [Lesson 01](../../01-Principles/lesson-01-timing-spacing/). Cung chuyển động chính là spacing đặt dọc theo một đường cong.
- Đã biết **easing & đường Bézier** — ở [Lesson 06](../lesson-06-easing-bezier/visualization.html). Đường cong quỹ đạo trong bài này dùng chung ý tưởng Bézier bậc hai.
- Toán: cộng/trừ/nhân, bình phương, căn bậc hai, chút lượng giác ($\sin, \cos$) và radian. Sẽ nhắc lại tại chỗ.

---

## 1. Vì sao chuyển động tự nhiên đi theo cung?

> 💡 **Trực giác.** Thử vung cánh tay từ đùi lên ngang vai. Bàn tay bạn **không** đi thẳng lên — nó quét một **vòng cung** quanh khớp vai. Lý do đơn giản: cẳng tay là một thanh cứng dài $R$, một đầu ghim ở khớp vai. Đầu còn lại (bàn tay) buộc phải nằm trên **đường tròn bán kính $R$**. Muốn tay đi thẳng, khớp vai phải vừa xoay vừa co giãn cánh tay — điều cơ thể không làm. Vậy **cung là kết quả bắt buộc của việc xoay quanh khớp**, không phải lựa chọn thẩm mỹ.

Có **hai nguồn gốc vật lý** khiến chuyển động cong, và gần như mọi chuyển động thực đều thuộc một trong hai (hoặc cả hai):

1. **Xoay quanh khớp (pivot/joint)** → **cung tròn**. Tay, chân, đầu, đuôi, cần cẩu, kim đồng hồ… mọi thứ gắn vào một trục xoay đều vẽ cung tròn bán kính bằng khoảng cách tới trục.
2. **Trọng lực (gravity)** → **parabol**. Vật được ném/nhảy/bật lên: phương ngang đi đều, phương dọc bị trọng lực kéo → quỹ đạo là một **đường parabol** cong xuống.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy có chuyển động nào thẳng thật không?"* → Có, nhưng hiếm và thường là **nhân tạo/máy móc**: thang máy, piston, con trỏ chuột kéo thẳng, cánh tay robot công nghiệp. Chính vì thẳng gắn với "máy", nên khi muốn nhân vật **sống**, animator bẻ cong quỹ đạo.
> - *"Đầu người gật thì cong ở đâu?"* → Đầu xoay quanh khớp cổ. Gật xuống, cằm vẽ một cung nhỏ về phía trước-xuống, không phải trượt thẳng đứng. Bỏ cung này đi, cái gật trông như búp bê gỗ.
> - *"Nhân vật đi bộ ngang màn hình — thân đi thẳng mà?"* → Nhìn kỹ: hông **nhấp nhô theo từng bước** (cao nhất khi một chân chống thẳng, thấp nhất khi hai chân dang). Đầu vẽ một chuỗi cung nhỏ lên-xuống. Đường "thẳng" chỉ là trung bình.

> 📝 **Tóm tắt mục 1.**
> - Chuyển động cong vì hai lý do vật lý: **xoay quanh khớp** (cung tròn) và **trọng lực** (parabol).
> - Chuyển động thẳng tuyệt đối = cảm giác **máy móc/robot** → dùng có chủ đích, không phải mặc định.
> - Ngay cả chuyển động "trông thẳng" (đi bộ) cũng chứa vô số cung nhỏ.

---

## 2. Hai họ cung — định nghĩa đầy đủ

### 2.1 Cung tròn quanh khớp xoay

**(a) Là gì.** Khi một điểm gắn cứng vào trục xoay cách nó khoảng $R$ (bán kính), nó di chuyển trên **đường tròn bán kính $R$**. Vị trí theo góc $\theta$ (đo từ phương thẳng đứng xuống, trục ở gốc):

$$x = R\sin\theta, \qquad y = R\cos\theta$$

**(b) Vì sao cần khái niệm bán kính $R$.** $R$ quyết định **độ cong**: cung của một khớp gần (cổ tay, $R$ nhỏ) cong gắt; cung của cả cánh tay ($R$ lớn) thoải hơn. Biết $R$ là biết ngay hình dáng vết chuyển động.

**(c) Ví dụ số cụ thể — bàn tay ở đầu cánh tay $R = 60$ px, vung từ $-60°$ đến $+60°$:**

| Góc $\theta$ | $\sin\theta$ | $\cos\theta$ | $x = 60\sin\theta$ | $y = 60\cos\theta$ |
|-------------:|-------------:|-------------:|-------------------:|-------------------:|
| $-60°$ | $-0.866$ | $0.500$ | $-52.0$ | $30.0$ |
| $-30°$ | $-0.500$ | $0.866$ | $-30.0$ | $52.0$ |
| $0°$ | $0.000$ | $1.000$ | $0.0$ | $60.0$ |
| $+30°$ | $0.500$ | $0.866$ | $30.0$ | $52.0$ |
| $+60°$ | $0.866$ | $0.500$ | $52.0$ | $30.0$ |

Nối 5 điểm này → một **cung tròn** phồng xuống dưới. Bàn tay xa nhất khỏi trục ($y=60$) ở giữa vung, gần nhất ($y=30$) ở hai đầu.

**Độ dài quãng đường bàn tay đi** (cung, không phải đường thẳng):

$$\text{độ dài cung} = R \cdot \Delta\theta_{\text{(radian)}} = 60 \times \frac{120°}{180°}\pi = 60 \times 2.094 = 125.6 \text{ px}$$

So với **đường thẳng** nối hai đầu (dây cung): khoảng cách giữa $(-52, 30)$ và $(52, 30)$ là $104$ px. Bàn tay đi $125.6$ px chứ **không** đi $104$ px — nó **vòng cung** chứ không cắt thẳng. Đây chính là "arc" mà animator phải giữ.

> ⚠ **Lỗi thường gặp.** Nội suy thẳng (linear) giữa keyframe đầu $(-52,30)$ và keyframe cuối $(52,30)$ → bàn tay **trượt ngang thành một đường thẳng $y=30$**, cắt qua giữa cung. Kết quả: tay trông như bị **kéo trên ray**, mất hết cảm giác xoay khớp. Phải chèn keyframe giữa ở $y=60$ (điểm phồng) để giữ cung.

### 2.2 Parabol do trọng lực

**(a) Là gì.** Vật được ném với vận tốc ngang $v_x$ và vận tốc dọc ban đầu $v_{y0}$ (hướng lên). Phương ngang không có lực → đi đều. Phương dọc bị **trọng lực $g$** kéo xuống → chậm dần khi lên, nhanh dần khi rơi. Quỹ đạo:

$$x(t) = v_x\, t, \qquad y(t) = v_{y0}\, t - \tfrac{1}{2} g\, t^{2}$$

Khử $t$ ($t = x/v_x$) cho thấy $y$ là hàm **bậc hai** của $x$ → hình **parabol**.

**(b) Vì sao cần khái niệm này (tách khỏi cung tròn).** Cung tròn có bán kính **không đổi**; parabol có **độ cong thay đổi** — cong gắt nhất ở đỉnh, thoải dần khi rơi. Vật bay (bóng, người nhảy, giọt nước) tuân theo parabol chứ không phải cung tròn, nên phải mô hình riêng.

**(c) Ví dụ số cụ thể — ném với $v_x = 5$, $v_{y0} = 20$, $g = 10$ (đơn vị px và "nhịp"):**

$$y(t) = 20t - 5t^{2}, \qquad x(t) = 5t$$

| $t$ | $x = 5t$ | $y = 20t - 5t^2$ | $\Delta y$ so với frame trước |
|----:|---------:|-----------------:|------------------------------:|
| 0 | 0 | 0 | — |
| 1 | 5 | $20 - 5 = 15$ | $+15$ |
| 2 | 10 | $40 - 20 = 20$ | $+5$ ← gần đỉnh, chậm lại |
| 3 | 15 | $60 - 45 = 15$ | $-5$ |
| 4 | 20 | $80 - 80 = 0$ | $-15$ ← rơi nhanh dần |

- **Đỉnh** ở $t = 2$ (khi $v_y = 20 - 10\cdot 2 = 0$), cao $y = 20$.
- **Tầm xa** (chạm đất lại) ở $t = 4$, $x = 20$. Parabol đối xứng qua đỉnh.
- Chú ý cột $\Delta y$: **spacing dọc co lại gần đỉnh** ($+5$) và **giãn ra khi rơi** ($-15$), trong khi **spacing ngang không đổi** ($\Delta x = 5$). Đây đúng là bài **timing & spacing** ([Lesson 01](../../01-Principles/lesson-01-timing-spacing/)) đặt dọc theo một cung: vật "nấn ná" ở đỉnh rồi lao xuống.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao vật chậm lại ở đỉnh?"* → Vì $v_y$ giảm về $0$ tại đỉnh rồi đổi chiều. Ở gần đỉnh, vận tốc dọc nhỏ nên các frame nằm sát nhau → tạo cảm giác **"lơ lửng" (hang time)** rất tự nhiên.
> - *"Muốn bóng nặng hơn thì chỉnh gì?"* → Tăng $g$: parabol **gắt và thấp** hơn, thời gian bay ngắn → bóng "nặng, chắc". Giảm $g$: bóng bay lâu, cao, "nhẹ như bóng bay".

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Với $v_x = 5, v_{y0} = 20, g = 10$ ở trên, nếu tăng $v_x$ lên $8$ thì tầm xa (điểm chạm đất) là bao nhiêu? Đỉnh cao bao nhiêu?
> 2. Bàn tay $R = 40$ vung từ $-90°$ đến $+90°$. Độ dài cung nó đi là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Thời gian bay chỉ phụ thuộc phương dọc: vẫn chạm đất ở $t = 4$. Tầm xa $x = 8 \times 4 = \mathbf{32}$. Đỉnh **vẫn cao $20$** (đổi $v_x$ không đổi phương dọc). → Bài học: điều khiển tầm bay và độ cao **độc lập** nhau.
> 2. $\Delta\theta = 180° = \pi$ rad. Độ dài cung $= R\cdot\Delta\theta = 40\pi = \mathbf{125.7}$ px.
> </details>

> 📝 **Tóm tắt mục 2.**
> - **Cung tròn**: $x = R\sin\theta,\ y = R\cos\theta$; bán kính $R$ cố định = độ cong cố định. Độ dài cung $= R\cdot\Delta\theta$.
> - **Parabol**: $y = v_{y0}t - \tfrac12 g t^2$; độ cong thay đổi, chậm ở đỉnh (hang time), nhanh khi rơi.
> - Tầm xa và độ cao của cú ném điều khiển **độc lập** ($v_x$ vs $v_{y0}, g$).

---

## 3. Lượng hóa độ cong: bán kính $R$ và độ phồng (sagitta) $s$

> 💡 **Trực giác.** Cho hai điểm đầu-cuối cố định (dây cung dài $L$), một cung có thể **phồng ít** (gần thẳng) hoặc **phồng nhiều** (cong mạnh). Đại lượng đo mức phồng đó là **sagitta $s$** — khoảng cách từ **giữa cung** tới **giữa dây cung**. $s$ nhỏ → gần thẳng → máy móc; $s$ lớn → cung rõ → sống động.

Quan hệ giữa bán kính $R$, dây cung $L$ và sagitta $s$ (hình học đường tròn):

$$s = R - \sqrt{R^{2} - \left(\tfrac{L}{2}\right)^{2}}$$

Đọc ngược: **$R$ càng lớn thì $s$ càng nhỏ** (cung thoải), $R \to \infty$ cho $s = 0$ (đường thẳng).

**Ví dụ số cụ thể (≥ 4)** — giữ dây cung $L = 100$ px, đổi bán kính $R$:

| Bán kính $R$ | $\sqrt{R^2 - 50^2}$ | Sagitta $s = R - \sqrt{\dots}$ | Cảm giác |
|-------------:|--------------------:|-------------------------------:|----------|
| $\infty$ (thẳng) | $R$ | $0$ | **máy móc/robot** |
| $500$ | $497.49$ | $2.51$ | cung cực nhẹ — cái gật đầu |
| $200$ | $193.65$ | $6.35$ | cung thoải — camera lia |
| $100$ | $86.60$ | $13.40$ | cung rõ — vung tay |
| $60$ | $33.17$ | $26.83$ | cung gắt — chém kiếm nặng |

Cùng một cặp điểm đầu-cuối, chỉ đổi $R$ mà cảm giác đi từ "robot" ($s=0$) đến "chém mạnh" ($s\approx 27$). Đây là "núm vặn" chính khi tinh chỉnh một arc.

> ⚠ **Lỗi thường gặp.** Nghĩ "cung nào cũng như nhau, miễn là cong". Sai — **độ cong quyết định trọng lượng cảm nhận**: vật nhẹ (lông vũ) đi cung thoải, $R$ lớn; vật nặng/lực mạnh (búa, kiếm) đi cung gắt, $R$ nhỏ, $s$ lớn. Chọn sai $R$ → vật "sai cân nặng".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Trong phần mềm (After Effects, Blender) tôi có phải tính $s$ không?"* → Không tính tay. Bạn kéo **tay cầm (handle) của keyframe/đường Bézier** cho tới khi vết cong nhìn đúng. Công thức chỉ để hiểu **vì sao** kéo xa hơn = cong hơn. Bài này minh họa bằng đường Bézier bậc hai, kéo điểm đỉnh để đổi $s$.
> - *"Bán kính xấp xỉ từ $s$ và $L$ tính sao?"* → Đảo công thức: $R \approx \dfrac{L^2}{8s} + \dfrac{s}{2}$. Ví dụ $L=100, s=13.4$: $R \approx \dfrac{10000}{107.2} + 6.7 = 93.3 + 6.7 = 100$ ✓ (khớp dòng $R=100$).

> 🔁 **Dừng lại tự kiểm tra.**
> Dây cung $L = 80$. Tính sagitta cho $R = 50$. Cung này gắt hay thoải?
>
> <details><summary>Đáp án</summary>
>
> $s = 50 - \sqrt{50^2 - 40^2} = 50 - \sqrt{2500 - 1600} = 50 - \sqrt{900} = 50 - 30 = \mathbf{20}$.
> $s = 20$ trên dây $80$ (bằng $1/4$ dây) → cung **gắt**, hợp cho một cú vung nặng.
> </details>

> 📝 **Tóm tắt mục 3.**
> - **Sagitta $s$** = độ phồng của cung so với dây cung; $s=0$ là thẳng.
> - $s = R - \sqrt{R^2 - (L/2)^2}$: $R$ lớn → $s$ nhỏ (thoải), $R$ nhỏ → $s$ lớn (gắt).
> - $R$/$s$ mã hóa **trọng lượng cảm nhận**: nhẹ = thoải, nặng/mạnh = gắt.

---

## 4. Vẽ vết quỹ đạo (Motion Path) — công cụ kiểm tra cung

> 💡 **Trực giác.** Cách nhanh nhất để biết một chuyển động có "cong đẹp" không: lấy **một điểm** trên vật (chóp mũi, đầu ngón tay, tâm quả bóng) và **chấm vị trí của nó ở từng frame**, rồi nối lại. Chuỗi chấm đó gọi là **vết quỹ đạo (motion path / arc tracking)**. Nếu chuỗi chấm tạo một **đường cong trơn** → tốt. Nếu nó **gãy khúc/zigzag** hoặc **thẳng đơ** → chuyển động sẽ trông sai.

Quy trình animator kinh điển ("track the arc"):

1. Chọn một điểm mốc trên vật.
2. Chấm vị trí điểm đó ở mọi frame (hoặc bật "motion path" trong phần mềm).
3. Nhìn hình dạng chuỗi chấm:
   - **Cong trơn, đều** → giữ.
   - **Zigzag / gấp khúc** → có frame lệch khỏi cung → sửa.
   - **Thẳng tắp** → thường là dấu hiệu nội suy linear máy móc → bẻ cong.
4. Nhìn **khoảng cách giữa các chấm** (spacing): chấm sát nhau = chậm, chấm thưa = nhanh. Đây là timing dán lên cung.

**Ví dụ số — vết của quả bóng ở mục 2.2** ($v_x=5, v_{y0}=20, g=10$): các chấm $(0,0), (5,15), (10,20), (15,15), (20,0)$. Nối lại là parabol trơn; khoảng cách dọc giữa các chấm co ở đỉnh ($15\to20$: chỉ $5$) và giãn khi rơi ($15\to0$: tới $15$) — đúng một cung sống động.

> ⚠ **Lỗi thường gặp.** Chỉ nhìn từng frame riêng lẻ thấy "ổn", nhưng nối vết lại mới lộ ra một frame **nhô ra khỏi cung** (pop) hoặc cả đoạn **thẳng đơ**. Luôn kiểm tra bằng vết quỹ đạo, đừng tin mắt trên từng frame.

> 🔁 **Dừng lại tự kiểm tra.** Vết quỹ đạo của một điểm cho ra 5 chấm nằm **thẳng hàng, cách đều nhau**. Chuyển động này gợi cảm giác gì, và thường sai ở đâu?
>
> <details><summary>Đáp án</summary>
>
> Thẳng hàng = quỹ đạo thẳng (không cung) → **máy móc/robot**. Cách đều = tốc độ không đổi (không ease) → càng cứng. Với chuyển động cơ thể, gần như luôn cần bẻ thành cung và thêm ease in/out.
> </details>

> 📝 **Tóm tắt mục 4.**
> - **Vết quỹ đạo** = chuỗi vị trí một điểm qua các frame, nối lại.
> - Cong trơn → tốt; zigzag/thẳng đơ → sửa.
> - Khoảng cách giữa chấm = spacing = timing dán lên cung.

---

## 5. Đường thẳng vs cung — cảm giác máy móc vs sống động

Đặt cạnh nhau cùng một quãng di chuyển:

| | Đường thẳng (linear) | Cung (arc) |
|--|----------------------|------------|
| Quỹ đạo | đoạn thẳng nối 2 điểm | cong trơn (tròn hoặc parabol) |
| Nguồn gốc | nội suy máy tính, ray, piston | khớp xoay, trọng lực |
| Cảm giác | cứng, cơ khí, **robot** | mềm, có sức nặng, **sống** |
| Dùng khi | máy móc, UI kỹ thuật, tia laser | cơ thể, sinh vật, vật bay |

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Khi nào cố ý dùng đường thẳng?"* → Khi muốn **nhấn tính máy móc/vô hồn**: cánh tay robot, thang máy, con trỏ, tia bắn thẳng, hoặc để tương phản với một sinh vật đi cung bên cạnh. Thẳng là một lựa chọn biểu đạt, không phải mặc định "cho tiện".

**Cách bẻ một đoạn thẳng thành cung** (thực hành trong viz):
1. Giữ nguyên điểm đầu $A$ và điểm cuối $B$.
2. Chèn một **điểm điều khiển đỉnh $C$** lệch khỏi đường thẳng $AB$ (kéo lên hoặc xuống).
3. Quỹ đạo trở thành **Bézier bậc hai** $P(t) = (1-t)^2 A + 2(1-t)t\,C + t^2 B$ — một cung trơn qua vùng $C$.
4. Kéo $C$ xa $AB$ hơn → $s$ tăng → cung gắt hơn.

> 📝 **Tóm tắt mục 5.**
> - Thẳng = robot/máy móc; cung = sống động, có sức nặng.
> - Bẻ cong bằng cách chèn điểm điều khiển đỉnh $C$ lệch khỏi dây $AB$ (Bézier bậc hai).
> - Dùng đường thẳng có chủ đích, không phải vì lười.

---

## 6. Bài tập

**Bài 1 (parabol).** Ném một quả bóng với $v_x = 6$, $v_{y0} = 30$, $g = 10$ (px, nhịp).
a) Viết $y(t)$ và $x(t)$.
b) Tìm **thời điểm đạt đỉnh** và **độ cao đỉnh**.
c) Tìm **thời điểm chạm đất lại** và **tầm xa**.
d) Lập bảng vết quỹ đạo ở $t = 0,1,2,\dots$ và nhận xét spacing.

**Bài 2 (bán kính & sagitta).** Một cú vung có dây cung $L = 80$ px.
a) Tính sagitta $s$ cho $R = 300$ và cho $R = 50$.
b) Với một **nhát kiếm nặng**, nên chọn $R$ nào? Vì sao?

**Bài 3 (độ dài cung quanh khớp).** Cẳng tay $R = 50$ px vung từ $-45°$ đến $+45°$.
a) Tính **độ dài cung** bàn tay đi.
b) Tính **khoảng cách đường thẳng** (dây cung) giữa hai đầu.
c) Bàn tay đi dài hơn dây cung bao nhiêu phần trăm? Điều đó nói gì về "arc"?

---

## 7. Lời giải chi tiết

**Bài 1.**

a) Phương ngang đi đều, phương dọc chịu trọng lực:
$$x(t) = 6t, \qquad y(t) = 30t - 5t^2$$
(vì $\tfrac12 g = \tfrac12\cdot 10 = 5$).

b) Đỉnh khi vận tốc dọc bằng $0$: $v_y = 30 - 10t = 0 \Rightarrow t = 3$. Độ cao đỉnh: $y(3) = 30\cdot3 - 5\cdot9 = 90 - 45 = \mathbf{45}$ px, ở $t = \mathbf{3}$.

c) Chạm đất khi $y = 0$: $30t - 5t^2 = 0 \Rightarrow 5t(6 - t) = 0 \Rightarrow t = 6$. Tầm xa: $x(6) = 6\cdot6 = \mathbf{36}$ px, ở $t = \mathbf{6}$.

d) Bảng vết:

| $t$ | $x=6t$ | $y=30t-5t^2$ | $\Delta y$ |
|----:|-------:|-------------:|-----------:|
| 0 | 0 | 0 | — |
| 1 | 6 | 25 | $+25$ |
| 2 | 12 | 40 | $+15$ |
| 3 | 18 | 45 | $+5$ (đỉnh) |
| 4 | 24 | 40 | $-5$ |
| 5 | 30 | 25 | $-15$ |
| 6 | 36 | 0 | $-25$ |

Nhận xét: parabol **đối xứng** qua đỉnh $t=3$. Spacing dọc **co lại gần đỉnh** ($+5$) → bóng "lơ lửng" (hang time); **giãn ra khi rơi** ($-25$) → lao nhanh. Spacing ngang đều ($\Delta x = 6$).

**Bài 2.** Công thức $s = R - \sqrt{R^2 - (L/2)^2}$, với $L/2 = 40$:

a)
- $R = 300$: $s = 300 - \sqrt{300^2 - 40^2} = 300 - \sqrt{90000 - 1600} = 300 - \sqrt{88400} = 300 - 297.32 = \mathbf{2.68}$.
- $R = 50$: $s = 50 - \sqrt{50^2 - 40^2} = 50 - \sqrt{2500 - 1600} = 50 - \sqrt{900} = 50 - 30 = \mathbf{20}$.

b) Nhát **kiếm nặng** cần cảm giác lực và trọng lượng → cung **gắt**, $s$ lớn → chọn **$R = 50$** ($s = 20$, bằng $1/4$ dây cung). $R = 300$ cho $s = 2.68$ — gần như thẳng, trông như kiếm "trượt" không có sức nặng.

**Bài 3.**

a) $\Delta\theta = 90° = \dfrac{\pi}{2} = 1.5708$ rad. Độ dài cung $= R\cdot\Delta\theta = 50 \times 1.5708 = \mathbf{78.54}$ px.

b) Hai đầu ở $\theta = \pm45°$: $x = 50\sin(\pm45°) = \pm35.36$, $y = 50\cos(45°) = 35.36$. Dây cung nối $(-35.36, 35.36)$ và $(35.36, 35.36)$ dài $= 2\times35.36 = \mathbf{70.71}$ px.

c) Bàn tay đi dài hơn dây cung: $\dfrac{78.54 - 70.71}{70.71} = \dfrac{7.83}{70.71} = 11.1\%$. Nghĩa là bàn tay **vòng cung**, đi xa hơn ~11% so với cắt thẳng. Nếu animator nội suy thẳng, bàn tay sẽ "ăn gian" quãng đường và **mất cảm giác xoay khớp** — đúng lỗi ở mục 2.1.

> 📝 **Tóm tắt bài học.**
> - Chuyển động tự nhiên đi theo **cung**: **cung tròn** (xoay quanh khớp, bán kính $R$) hoặc **parabol** (trọng lực).
> - Thẳng tuyệt đối = **máy móc/robot**; dùng có chủ đích.
> - Độ cong đo bằng **bán kính $R$** và **sagitta $s$**: $R$ nhỏ / $s$ lớn = cung gắt (nặng, mạnh); $R$ lớn / $s$ nhỏ = cung thoải (nhẹ).
> - Parabol: tầm xa ($v_x$) và độ cao ($v_{y0}, g$) điều khiển độc lập; chậm ở đỉnh (hang time), nhanh khi rơi.
> - Kiểm tra bằng **vết quỹ đạo (motion path)**: cong trơn → tốt, zigzag/thẳng đơ → sửa.

---

## Bài tiếp theo

**[Lesson 08 — Chuyển động phụ & gối đầu (Secondary Action & Overlapping)](../lesson-08-secondary-overlapping/)**: khi thân đi theo cung, các bộ phận rời (tóc, đuôi áo, tai) **đi trễ và vẽ cung riêng** — chồng lấn (overlap) và theo sau (follow-through). Cung của bài này là nền để hiểu vì sao các phần phụ "trôi theo" thành nhiều cung lệch pha.

Minh họa tương tác: [visualization.html](./visualization.html) — bật/tắt **đường thẳng ↔ cung**, kéo điểm đỉnh đổi độ cong, xem **vết quỹ đạo** so sánh, và mô phỏng **bóng ném parabol** dưới trọng lực (Play/Pause/Reset).
