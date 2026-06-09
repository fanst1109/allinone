# Lesson 01 — Động học (Kinematics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu 3 đại lượng cốt lõi mô tả chuyển động: **vị trí (x)**, **vận tốc (v)**, **gia tốc (a)** — biết mỗi cái đo gì, đơn vị, và liên hệ giữa chúng.
- Phân biệt **độ dịch chuyển (displacement)** và **quãng đường (distance)**, **vận tốc** và **tốc độ**.
- Đọc và vẽ được 3 loại đồ thị chuyển động: **x-t**, **v-t**, **a-t** — và biết mối liên hệ "diện tích/độ dốc" giữa chúng.
- Áp dụng được **3 phương trình chuyển động thẳng biến đổi đều** (gia tốc hằng) để giải bài toán.
- Tính được chuyển động **rơi tự do** ($g = 9{,}8\ \text{m/s}^2$) và chuyển động **ném ngang/ném xiên** (đến cuối bài).
- Phân biệt chuyển động **1 chiều** (đường thẳng) và **2 chiều** (mặt phẳng — vd ném xiên).

## Kiến thức tiền đề

Không có. Bạn cần biết:
- Đại số cơ bản: giải phương trình bậc 2, hàm số.
- Khái niệm vector ở mức trực giác (mũi tên có hướng và độ dài). Sẽ dùng đầy đủ ở bài này.

---

## 1. Vị trí, độ dịch chuyển, quãng đường

### 1.1. Vị trí (Position) — x

**Vị trí** của một vật là **tọa độ** của nó so với một điểm gốc đã chọn.

💡 **Ý nghĩa cụ thể**: vị trí cho ta biết "vật đang ở đâu so với điểm gốc". Ví dụ: bạn đứng cách cửa nhà **5 m** về phía Đông — đó là vị trí x = +5 m (chọn Đông là dương).

**Vì sao cần "điểm gốc"?** Bởi vì "ở đâu" là khái niệm tương đối — không có điểm tham chiếu thì 1 con số không có nghĩa. Ta luôn phải chọn **hệ tọa độ**: gốc O + chiều dương.

**Đơn vị**: mét (m) trong hệ SI. Cũng có thể dùng cm, km, dặm... tùy bài toán.

**Ký hiệu**:
- Trong 1 chiều: x (chỉ số dọc trục).
- Trong 2 chiều: cặp (x, y).
- Trong 3 chiều: (x, y, z), hoặc vector vị trí **r** = (x, y, z).

### 1.2. Độ dịch chuyển (Displacement) — Δx

**Độ dịch chuyển** = **vị trí cuối − vị trí đầu** $= \Delta x = x_2 - x_1$.

💡 **Ý nghĩa cụ thể**: độ dịch chuyển là "đường chim bay" từ vị trí ban đầu đến vị trí cuối, **có hướng**. Một mũi tên đi thẳng từ A đến B.

**Vì sao cần đại lượng này (mà không chỉ dùng vị trí)?** Vì khi vật chuyển động, ta thường quan tâm "nó đã đi được bao xa theo hướng nào" hơn là tọa độ tuyệt đối. Độ dịch chuyển trả lời câu hỏi đó gọn nhất.

**Có dấu** (trong 1 chiều): dương nếu đi theo chiều dương, âm nếu ngược lại.

### 1.3. Quãng đường (Distance) — s

**Quãng đường** = tổng độ dài đường đi vật đã đi, **không quan tâm hướng**, luôn dương.

### 💡 So sánh độ dịch chuyển vs quãng đường — ví dụ cụ thể

Bạn đi từ nhà (vị trí x = 0) ra cửa hàng cách 200 m (x = +200 m), rồi quay về nhà:

| Đại lượng | Giá trị | Giải thích |
|-----------|---------|-------------|
| Vị trí cuối | x = 0 m | Bạn về nhà |
| Vị trí đầu | x = 0 m | Bắt đầu ở nhà |
| **Độ dịch chuyển $\Delta x$** | **0 m** | Vị trí cuối − đầu $= 0$ (về chỗ cũ!) |
| **Quãng đường $s$** | **400 m** | 200 m đi + 200 m về |

→ Độ dịch chuyển = 0 dù bạn đã đi rất nhiều — vì đại lượng này chỉ quan tâm điểm đầu và điểm cuối. Quãng đường thì cộng dồn tất cả.

### ⚠ Lỗi thường gặp

- **Lẫn độ dịch chuyển với quãng đường**: nhiều người trả lời "đi 200 m rồi về thì đi được 0 m" — sai. Đi được (quãng đường) là **400 m**; chỉ **độ dịch chuyển** mới = 0. Đọc kỹ đề hỏi cái nào.
- **Quên dấu của độ dịch chuyển**: đi từ $x = +10$ m về $x = +3$ m $\to \Delta x = 3 - 10 = $ **−7 m** (âm vì đi ngược chiều dương), KHÔNG phải +7 m. Quãng đường thì $= 7$ m (luôn dương).
- **Nhầm gốc tọa độ**: nói "vật ở 50 m" mà chưa chọn gốc O thì vô nghĩa. Luôn nêu rõ gốc + chiều dương trước.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao phải phân biệt độ dịch chuyển và quãng đường — chẳng phải đi đâu thì đi được bấy nhiêu sao?"* Chỉ đúng khi đi thẳng một chiều không quay lại. Hễ có đổi hướng, hai cái tách nhau ngay: chạy 1 vòng sân vận động 400 m rồi về chỗ cũ → quãng đường 400 m nhưng độ dịch chuyển 0 m. Vật lý cần độ dịch chuyển (có hướng) để tính vận tốc, gia tốc; cần quãng đường để tính nhiên liệu, mòn lốp...
- *"Độ dịch chuyển có thể âm, vậy quãng đường có âm được không?"* Không bao giờ. Quãng đường là tổng độ dài đường đi — luôn ≥ 0. Chỉ độ dịch chuyển (vector) mới có dấu.
- *"Khi nào $|\Delta x| = s$?"* Khi vật đi thẳng theo một chiều, không quay lại. Vd đi từ $x=0$ đến $x=+30$ m một mạch: $\Delta x = +30$ m, $s = 30$ m, $|\Delta x| = s$. Cứ đổi chiều là $s > |\Delta x|$.

🔁 **Dừng lại tự kiểm tra**

1. Một người đi từ $x = +2$ m sang $x = -5$ m theo đường thẳng. Tính $\Delta x$ và $s$.
2. Người đó đi tiếp từ $x = -5$ m quay lại $x = +1$ m. Tính tổng quãng đường $s$ và tổng độ dịch chuyển $\Delta x$ cho cả hành trình (từ +2 m).

<details><summary>Đáp án</summary>

1. $\Delta x = -5 - 2 = $ **−7 m** (đi theo chiều âm). Quãng đường $s = |-7| = $ **7 m** (đoạn này đi thẳng nên $|\Delta x| = s$).
2. Đoạn 2 dài $|1 - (-5)| = 6$ m $\to$ tổng $s = 7 + 6 = $ **13 m**. Tổng độ dịch chuyển = vị trí cuối − đầu $= 1 - 2 = $ **−1 m**. Thấy ngay $s$ (13) $> |\Delta x|$ (1) vì có quay lại.

</details>

### 📝 Tóm tắt mục 1

- **Vị trí $x$**: tọa độ vật so với gốc O.
- **Độ dịch chuyển $\Delta x$**: vector từ vị trí đầu đến vị trí cuối. Có dấu.
- **Quãng đường $s$**: tổng độ dài đường đi. Luôn dương.
- Ví dụ vòng tròn: đi rồi quay về $\to \Delta x = 0$ nhưng $s \neq 0$.

---

## 2. Vận tốc và tốc độ

### 2.1. Vận tốc trung bình — v_tb

**Vận tốc trung bình** là **độ dịch chuyển chia cho thời gian**:

$$v_{tb} = \frac{\Delta x}{\Delta t}$$

💡 **Ý nghĩa**: vận tốc trung bình cho biết "trung bình mỗi giây vật dịch chuyển bao nhiêu mét theo chiều nào". Nếu $\Delta x = +20$ m sau 4 giây → $v_{tb} = +5$ m/s (đi theo chiều dương với tốc độ trung bình 5 m/s).

**Vì sao cần đại lượng này?** Vì biết vật **đã đi tới đâu** chưa đủ — ta thường muốn biết **đi nhanh hay chậm**. Vận tốc trung bình là phép đo "tốc độ trung bình có hướng" qua một quá trình.

**Đơn vị**: m/s (chuẩn SI). Cũng có km/h trong đời thường ($1\ \text{m/s} = 3{,}6\ \text{km/h}$).

**Có dấu**: dương = đi theo chiều dương, âm = ngược lại.

### 2.2. Vận tốc tức thời — v(t)

**Vận tốc trung bình** trên một khoảng thời gian dài có thể "che giấu" thực tế (vd: đi 100 km trong 2 giờ, nhưng nửa giờ đầu kẹt xe đứng yên!). Để biết **vận tốc đúng tại 1 khoảnh khắc** t cụ thể, ta lấy giới hạn:

$$v(t) = \lim_{\Delta t\to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt}$$

Đây là **đạo hàm của vị trí theo thời gian**.

💡 **Hình dung**: vận tốc tức thời là số trên đồng hồ tốc độ của xe **ngay lúc này** — bao gồm cả hướng (đang chạy về hướng nào).

### 2.3. Tốc độ (Speed) — |v|

**Tốc độ** = **độ lớn của vận tốc** $= |v|$, luôn dương. Tốc độ chỉ trả lời "đi nhanh hay chậm", không quan tâm hướng.

**Ví dụ**: xe đang chạy vận tốc **−60 km/h** (về hướng Tây, chọn Đông là dương) → tốc độ = **60 km/h**.

### 2.4. Ví dụ số cụ thể

**Ví dụ**: Một người chạy bộ từ x = 0 m đến x = +800 m hết 4 phút (240 s), rồi quay lại x = +200 m mất thêm 2 phút (120 s). Tính:

a) **Vận tốc trung bình toàn quá trình**:
- $\Delta x = 200 - 0 = +200$ m.
- $\Delta t = 240 + 120 = 360$ s.
- $v_{tb} = \frac{200}{360} \approx +0{,}56\ \text{m/s}$.

b) **Tốc độ trung bình** (quãng đường ÷ thời gian):
- $s = 800\ (\text{đi}) + (800 - 200) = 800 + 600 = 1400$ m.
- Tốc độ tb $= \frac{1400}{360} \approx 3{,}89\ \text{m/s}$.

→ Vận tốc tb (0,56) << tốc độ tb (3,89) vì người này quay lại, làm $\Delta x$ nhỏ trong khi $s$ lớn.

### ⚠ Lỗi thường gặp

- **Nhầm vận tốc và tốc độ**: Vận tốc có hướng (vector); tốc độ chỉ là số (scalar). Khi học vật lý nghiêm túc, đừng dùng lẫn lộn.
- **Quên dấu**: nếu vật đổi hướng, vận tốc đổi dấu. $\Delta x$ có thể âm.
- **Lẫn đơn vị km/h và m/s**: xe "chạy 72" — 72 km/h hay 72 m/s? Khác nhau 3,6 lần! $72\ \text{km/h} = \frac{72}{3{,}6} = 20\ \text{m/s}$. Trong mọi công thức vật lý SI phải đổi về m/s trước. Phản ví dụ: tính quãng đường phanh với $v = 72$ (hiểu nhầm là m/s) sẽ ra kết quả sai gấp ~13 lần (vì $v$ vào bình phương).
- **Lấy trung bình cộng vận tốc khi quãng đường bằng nhau**: đi 1 nửa đường 20 m/s, nửa sau 60 m/s → tốc độ trung bình KHÔNG phải $\frac{20+60}{2} = 40$ m/s, mà là trung bình điều hòa $= \frac{2\cdot 20\cdot 60}{20+60} = 30\ \text{m/s}$ (vì đoạn chậm tốn nhiều thời gian hơn).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vận tốc trung bình và tốc độ trung bình khác nhau chỗ nào?"* Vận tốc trung bình = **độ dịch chuyển** / thời gian (có hướng, có thể âm hoặc 0). Tốc độ trung bình = **quãng đường** / thời gian (luôn ≥ 0). Ví dụ chạy 1 vòng về chỗ cũ: vận tốc tb = 0 (Δx=0), nhưng tốc độ tb > 0.
- *"Tại sao cần vận tốc tức thời, đã có vận tốc trung bình rồi?"* Vì trung bình "làm phẳng" mọi biến động. Đi 100 km trong 2 giờ $\to v_{tb} = 50$ km/h, nhưng có thể nửa giờ đầu kẹt xe đứng yên, sau đó chạy 80 km/h. Đồng hồ tốc độ hiển thị vận tốc **tức thời** (ngay lúc đó), thứ quyết định bạn có bị bắn tốc độ hay không.
- *"$v$ âm nghĩa là gì — đi lùi à?"* Nghĩa là đi theo **chiều âm** của trục đã chọn. Nếu chọn Đông là dương, $v = -5$ m/s nghĩa là đang đi về Tây với tốc độ 5 m/s. Dấu chỉ hướng, độ lớn $|v| = 5$ m/s là tốc độ.

🔁 **Dừng lại tự kiểm tra**

1. Đổi 90 km/h ra m/s.
2. Một xe đi 60 km về Đông trong 1 giờ, rồi 60 km về Tây trong 2 giờ. Tính vận tốc trung bình và tốc độ trung bình (km/h).

<details><summary>Đáp án</summary>

1. $90\ \text{km/h} = \frac{90}{3{,}6} = $ **25 m/s**.
2. $\Delta x = 60 - 60 = 0$ km $\to$ vận tốc tb $= \frac{0}{3} = $ **0 km/h**. Quãng đường $s = 120$ km, thời gian 3 h $\to$ tốc độ tb $= \frac{120}{3} = $ **40 km/h**. Hai con số khác hẳn vì xe quay lại.

</details>

### 📝 Tóm tắt mục 2

- **Vận tốc trung bình** $v_{tb} = \frac{\Delta x}{\Delta t}$, có hướng.
- **Vận tốc tức thời** $v(t) = \frac{dx}{dt}$, có hướng.
- **Tốc độ** $= |v|$, luôn dương.
- Đơn vị: m/s.

---

## 3. Gia tốc

### 3.1. Định nghĩa

**Gia tốc** là **độ biến thiên vận tốc trên 1 đơn vị thời gian**:

$$\begin{aligned}
a &= \frac{\Delta v}{\Delta t} \quad &&\text{(gia tốc trung bình)} \\
a(t) &= \frac{dv}{dt} \quad &&\text{(gia tốc tức thời = đạo hàm vận tốc)}
\end{aligned}$$

💡 **Ý nghĩa cụ thể**: gia tốc cho biết "vận tốc đang thay đổi nhanh hay chậm". Đại lượng này KHÁC vận tốc:
- **Vận tốc** = vật đang đi nhanh thế nào.
- **Gia tốc** = vận tốc đang TĂNG hay GIẢM thế nào.

**Vì sao cần khái niệm này?** Vì rất nhiều hiện tượng (rơi tự do, ô tô tăng tốc/phanh, vệ tinh) đều có vận tốc thay đổi liên tục. Một con số chỉ vận tốc không đủ để mô tả — ta cần biết "vận tốc đang đổi như thế nào". Đó là gia tốc.

**Đơn vị**: m/s² (mét trên giây bình phương).

**Có dấu**:
- a cùng chiều với v → vật **tăng tốc**.
- a ngược chiều với v → vật **giảm tốc (đang phanh)**.

### 3.2. Ví dụ trực giác

**Ví dụ 1 — Xe tăng tốc**: Xe đứng yên ($v = 0$), sau 5 giây đạt $v = 20$ m/s.
- $a = \frac{\Delta v}{\Delta t} = \frac{20 - 0}{5} = $ **+4 m/s²**.
- Mỗi giây vận tốc tăng 4 m/s.

**Ví dụ 2 — Xe phanh**: Xe đang chạy $v = 20$ m/s, phanh trong 2 giây thì dừng ($v = 0$).
- $a = \frac{0 - 20}{2} = $ **−10 m/s²** (âm vì giảm tốc).
- Mỗi giây vận tốc giảm 10 m/s.

**Ví dụ 3 — Quả táo rơi**: Thả 1 quả táo, sau 1 giây $v = 9{,}8$ m/s. Sau 2 giây $v = 19{,}6$ m/s.
- $a = 9{,}8\ \text{m/s}^2$ (= **g**, gia tốc trọng trường).
- Quả táo "tăng tốc đều" với mỗi giây nhanh hơn 9,8 m/s.

### 3.3. Bảng so sánh trực quan

| Đại lượng | Ý nghĩa | Đơn vị | Ví dụ con số |
|-----------|---------|--------|---------------|
| Vị trí x | "Ở đâu" | m | 100 m |
| Vận tốc v | "Đi nhanh thế nào, hướng nào" | m/s | 30 m/s |
| Gia tốc a | "Vận tốc đổi nhanh thế nào" | m/s² | 5 m/s² |
| Quãng đường s | "Đi tổng bao xa" | m | 200 m (≥ 0) |

### ⚠ Lỗi thường gặp

- **Lẫn vận tốc với gia tốc**: "vật đi nhanh nên gia tốc lớn" — SAI. Một xe chạy đều 100 m/s có **vận tốc lớn nhưng gia tốc = 0** (vận tốc không đổi). Gia tốc đo sự **thay đổi** vận tốc, không phải vận tốc.
- **Nghĩ a âm = chậm lại, a dương = nhanh lên**: chỉ đúng khi v dương. Nếu v âm (đi chiều âm) mà a âm (cùng chiều v) thì vật **tăng tốc** theo chiều âm. Quy tắc đúng: a **cùng chiều** v → tăng tốc; **ngược chiều** v → giảm tốc, bất kể dấu cụ thể.
- **Nghĩ gia tốc 0 thì vật đứng yên**: a = 0 chỉ nghĩa là vận tốc **không đổi** — vật có thể đang chạy đều với v = 50 m/s.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vật đang đứng yên ($v=0$) thì gia tốc chắc chắn $= 0$?"* Không! Ngay lúc thả một quả bóng, $v = 0$ nhưng $a = g = 9{,}8\ \text{m/s}^2$ (đang bắt đầu rơi). Tương tự, vật ở điểm cao nhất khi ném lên có $v = 0$ nhưng $a = -9{,}8\ \text{m/s}^2$. $v$ và $a$ độc lập với nhau tại 1 thời điểm.
- *"Gia tốc có thể đổi không, hay luôn là hằng?"* Đổi được. Bài này tập trung vào gia tốc **hằng** (rơi tự do, xe tăng tốc đều) vì giải được bằng 3 phương trình đơn giản ở mục 5. Thực tế a thường thay đổi (vd xe vào cua, lò xo dao động — học ở Lesson 08).
- *"m/s² nghĩa là gì — sao lại 'giây bình phương'?"* Vì gia tốc = (m/s) thay đổi mỗi giây = (m/s)/s = m/s². Đọc là "mỗi giây, vận tốc thay đổi thêm bấy nhiêu m/s". Vd a = 4 m/s²: sau 1 s vận tốc tăng 4 m/s, sau 2 s tăng 8 m/s.

🔁 **Dừng lại tự kiểm tra**

1. Xe đi với $v = -12$ m/s và có gia tốc $a = -3\ \text{m/s}^2$. Xe đang nhanh lên hay chậm đi?
2. Xe đạp tăng từ 4 m/s lên 10 m/s trong 3 giây. Tính gia tốc.

<details><summary>Đáp án</summary>

1. $a$ và $v$ **cùng dấu** (cùng âm = cùng chiều) $\to$ xe **nhanh lên** (theo chiều âm). Sau 1 s, $v = -15$ m/s (độ lớn tăng).
2. $a = \frac{\Delta v}{\Delta t} = \frac{10 - 4}{3} = $ **2 m/s²**.

</details>

### 📝 Tóm tắt mục 3

- **Gia tốc** $a = \frac{dv}{dt}$ (m/s²).
- $a$ cùng chiều $v \to$ tăng tốc; ngược chiều $\to$ phanh.
- Ví dụ điển hình: rơi tự do có $a = g = 9{,}8\ \text{m/s}^2$.

---

## 4. Đồ thị x-t, v-t, a-t

💡 **Trực giác / Hình dung**: hãy coi 3 đồ thị như "ba góc nhìn camera" cùng một chuyến đi. Đồ thị x-t là bản đồ GPS ghi "lúc nào ở đâu"; **độ dốc** của nó (lên dốc gắt hay thoải) cho biết đi nhanh hay chậm → đó là v-t. Tiếp tục lấy độ dốc của v-t được a-t. Đi ngược lại: **diện tích** dưới v-t cộng dồn lại cho biết đã dịch chuyển bao xa. "Độ dốc đi xuôi, diện tích đi ngược" là chìa khóa nhớ cả mục này.

### 4.1. Đồ thị x-t (Position vs Time)

Trục dọc = vị trí x, trục ngang = thời gian t.

**Ý nghĩa độ dốc (slope)** của đồ thị x-t:

$$\text{độ dốc tại thời điểm } t = \frac{dx}{dt} = v(t)$$

→ **Độ dốc x-t = vận tốc tức thời.**

- Đồ thị x-t là đường thẳng $\to$ vận tốc không đổi.
- Đồ thị x-t đi lên $\to v > 0$ (đang tiến).
- Đồ thị x-t đi xuống $\to v < 0$ (lùi).
- Đồ thị x-t dốc đứng $\to v$ lớn (nhanh).
- Đồ thị x-t cong (parabola) $\to$ vận tốc thay đổi $\to$ có gia tốc.

### 4.2. Đồ thị v-t (Velocity vs Time)

Trục dọc = vận tốc v, trục ngang = thời gian.

**Hai ý nghĩa**:
- **Độ dốc v-t = gia tốc $a(t)$**.
- **Diện tích dưới đường v-t = độ dịch chuyển $\Delta x$**.

(Lý do "diện tích = độ dịch chuyển": chia thời gian thành các khoảng nhỏ $\Delta t$, trong mỗi khoảng vật đi $v\cdot \Delta t \to$ tổng $= \sum v\cdot \Delta t = $ diện tích.)

### 4.3. Đồ thị a-t (Acceleration vs Time)

Trục dọc = a, trục ngang = t.

**Diện tích dưới a-t $= \Delta v$** (độ biến thiên vận tốc).

### 4.4. Tổng kết quan hệ

```
   x ── đạo hàm ──→ v ── đạo hàm ──→ a
       ←── tích phân ───   ←── tích phân ──
```

Hoặc dạng đồ thị:
- **Độ dốc** x-t $\to v$; **độ dốc** v-t $\to a$.
- **Diện tích** v-t $\to \Delta x$; **diện tích** a-t $\to \Delta v$.

### ⚠ Lỗi thường gặp

- **Đọc đồ thị x-t như "đường đi thật" của vật**: đồ thị x-t đi lên rồi xuống KHÔNG có nghĩa vật bay lên rồi rơi xuống — nó chỉ nghĩa vật tiến (x tăng) rồi lùi (x giảm) trên đường thẳng. Trục dọc là vị trí, không phải độ cao.
- **Lấy giá trị thay vì độ dốc**: trên đồ thị x-t, một điểm cao (x lớn) KHÔNG nghĩa là v lớn. v là **độ dốc** tại điểm đó. Vật có thể ở rất xa (x lớn) mà đứng yên (độ dốc = 0 → v = 0).
- **Quên dấu của diện tích**: phần đồ thị v-t **nằm dưới trục** (v < 0) cho diện tích **âm** (Δx âm — vật lùi lại). Phải trừ chứ không cộng phần đó.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao diện tích dưới đường v-t lại ra độ dịch chuyển — nghe chẳng liên quan?"* Vì độ dịch chuyển trong một khoảng nhỏ $\Delta t$ là $v\cdot \Delta t$ — chính là diện tích của một cột mỏng chiều cao $v$, bề rộng $\Delta t$ trên đồ thị v-t. Cộng hết các cột mỏng = tổng diện tích = tổng độ dịch chuyển. Ví dụ: chạy đều $v = 5$ m/s trong 4 s $\to$ diện tích = hình chữ nhật $5 \times 4 = $ **20 m** $= \Delta x$.
- *"Đồ thị x-t cong (parabola) nghĩa là gì?"* Nghĩa là độ dốc ($v$) đang thay đổi $\to$ vật có gia tốc. Parabola mở lên (cong úp xuống dần dốc hơn) là $a > 0$; cong xuống là $a < 0$. Đường **thẳng** mới là $v$ không đổi ($a = 0$).
- *"Nếu chỉ có đồ thị a-t, lấy lại x được không?"* Được nhưng cần thêm điều kiện đầu. Diện tích a-t cho $\Delta v$, nhưng phải biết $v_0$ để ra $v(t)$; rồi diện tích v-t cho $\Delta x$, phải biết $x_0$ để ra $x(t)$. Thiếu $v_0$, $x_0$ thì chỉ biết "thay đổi" chứ không biết giá trị tuyệt đối.

🔁 **Dừng lại tự kiểm tra**

1. Đồ thị v-t là đường nằm ngang ở $v = 6$ m/s từ $t = 0$ đến $t = 5$ s. Vật đi được bao xa? Gia tốc bằng bao nhiêu?
2. Đồ thị x-t là đường thẳng đi xuống. Vận tốc dương hay âm? Gia tốc bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Diện tích (hình chữ nhật) $= 6 \times 5 = $ **30 m** $= \Delta x$. Đường nằm ngang $\to$ độ dốc $= 0 \to$ **a = 0**.
2. Đường thẳng **đi xuống** $\to$ độ dốc âm $\to$ **v < 0** (vật lùi). Đường thẳng $\to$ độ dốc không đổi $\to$ **a = 0**.

</details>

### 📝 Tóm tắt mục 4

3 đồ thị x-t, v-t, a-t liên hệ qua đạo hàm (độ dốc) và tích phân (diện tích).

---

## 5. Ba phương trình chuyển động thẳng biến đổi đều

💡 **Trực giác / Hình dung**: coi 3 phương trình như "3 công thức nấu ăn" cho cùng một nguyên liệu (v₀, a, t, x, v). Mỗi công thức bỏ ra một nguyên liệu khác nhau: (1) không có x, (2) không có v, (3) không có t. Khi giải bài, nhìn xem đề **không cho/không hỏi** đại lượng nào → chọn công thức thiếu đúng đại lượng đó. Không cần học thuộc cả ba một cách rời rạc — chúng đều suy ra từ định nghĩa "v = v₀ + at" cộng với "lấy trung bình".

Khi gia tốc **không đổi** (vd rơi tự do, xe tăng tốc đều), có 3 phương trình quan trọng (chứng minh bên dưới):

$$\begin{aligned}
(1)\quad & v = v_0 + a\cdot t &&\text{(vận tốc theo thời gian)} \\
(2)\quad & x = x_0 + v_0\cdot t + \tfrac{1}{2}\cdot a\cdot t^2 &&\text{(vị trí theo thời gian)} \\
(3)\quad & v^2 = v_0^2 + 2\cdot a\cdot (x - x_0) &&\text{(vận tốc theo vị trí, không có } t\text{)}
\end{aligned}$$

Trong đó:
- x₀, v₀ = vị trí và vận tốc tại t = 0.
- x, v = tại thời điểm t.
- a = gia tốc (hằng số).

### 5.1. Chứng minh

**Phương trình (1)**: $a$ hằng, lấy tích phân:

$$v(t) = v_0 + \int_0^t a \cdot dt' = v_0 + a\cdot t$$

**Phương trình (2)**: tích phân $v$:

$$x(t) = x_0 + \int_0^t v \cdot dt' = x_0 + \int_0^t (v_0 + a\cdot t')\, dt' = x_0 + v_0\cdot t + \tfrac{1}{2}\cdot a\cdot t^2$$

**Phương trình (3)**: từ (1), $t = \frac{v - v_0}{a}$. Thay vào (2):

$$\begin{aligned}
x - x_0 &= v_0\cdot \frac{v - v_0}{a} + \tfrac{1}{2}\cdot a\cdot \left[\frac{v - v_0}{a}\right]^2 \\
&= \frac{v_0\cdot v - v_0^2}{a} + \frac{(v - v_0)^2}{2a} \\
&= \ldots \\
\to\ & v^2 = v_0^2 + 2\cdot a\cdot (x - x_0)
\end{aligned}$$

### 5.2. Walk-through 2 ví dụ

**Ví dụ 1 — Xe tăng tốc**: Xe khởi hành từ điểm A ($x_0 = 0$), gia tốc đều $a = 2\ \text{m/s}^2$. Tính:

a) Vận tốc sau 5 giây?
- Áp (1): $v = 0 + 2\cdot 5 = $ **10 m/s**.

b) Quãng đường đi sau 5 giây?
- Áp (2): $x = 0 + 0\cdot 5 + 0{,}5\cdot 2\cdot 25 = $ **25 m**.

c) Khi $v = 20$ m/s, xe đã đi được bao xa?
- Áp (3): $20^2 = 0^2 + 2\cdot 2\cdot (x - 0) \to x = \frac{400}{4} = $ **100 m**.

**Ví dụ 2 — Xe phanh**: Xe chạy $v_0 = 30$ m/s, phanh với $a = -6\ \text{m/s}^2$. Tính quãng đường phanh đến khi dừng.

- Dừng $\to v = 0$. Áp (3): $0^2 = 30^2 + 2\cdot (-6)\cdot \Delta x \to \Delta x = \frac{900}{12} = $ **75 m**.

### ⚠ Lỗi thường gặp

- **Dùng 3 phương trình khi a KHÔNG hằng**: chúng CHỈ đúng cho gia tốc không đổi. Xe vào cua, lò xo dao động, sức cản không khí đáng kể → a thay đổi → ba phương trình này SAI. Phải kiểm tra "a có hằng không?" trước khi dùng.
- **Sai dấu của a khi phanh**: xe chạy chiều dương phanh thì $a$ phải **âm** (ngược chiều $v$). Quên dấu âm $\to$ tính ra "quãng đường phanh âm" vô lý. Phản ví dụ: $v_0=30$, $a=+6$ (quên dấu), phương trình (3): $0 = 900 + 12\cdot \Delta x \to \Delta x = -75$ m (vô nghĩa).
- **Quên đổi km/h sang m/s**: thay $v_0 = 72$ (km/h) trực tiếp vào công thức SI $\to$ kết quả sai. Đổi $72\ \text{km/h} = 20\ \text{m/s}$ trước.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Làm sao biết chọn phương trình nào?"* Liệt kê 5 đại lượng v₀, v, a, t, và Δx = x−x₀. Đề thường cho 3, hỏi 1. Đại lượng còn lại (không cho, không hỏi) cho biết bỏ phương trình nào: thiếu x → (1); thiếu v → (2); thiếu t → (3).
- *"Phương trình (3) khác (1),(2) ở chỗ nào?"* (3) không chứa t — dùng khi đề không cho và không hỏi thời gian (vd "tính quãng đường phanh đến khi dừng"). Nếu dùng (1),(2) phải giải qua 2 bước (tìm t trước), còn (3) ra thẳng.
- *"Hệ số $\frac{1}{2}$ trong $x = x_0+v_0 t+\frac{1}{2}at^2$ ở đâu ra?"* Vì trong thời gian $t$, vận tốc tăng đều từ $v_0$ đến $v_0+at$, **trung bình** $= v_0 + \frac{1}{2}at$. Quãng đường = vận tốc trung bình $\times t = v_0 t + \frac{1}{2}at^2$. Đó là lý do có $\frac{1}{2}$ — nó là trung bình của phần tăng tốc.

🔁 **Dừng lại tự kiểm tra**

1. Xe đứng yên ($v_0=0$) tăng tốc $a = 2\ \text{m/s}^2$. Sau bao lâu đạt 30 m/s, và đã đi bao xa lúc đó?
2. Xe chạy 40 m/s phanh với $a = -8\ \text{m/s}^2$. Quãng đường phanh đến khi dừng?

<details><summary>Đáp án</summary>

1. (1): $30 = 0 + 2t \to t = $ **15 s**. (2): $x = 0 + 0 + \frac{1}{2}\cdot 2\cdot 15^2 = $ **225 m** (hoặc dùng (3): $30^2 = 2\cdot 2\cdot x \to x = 225$ m).
2. Không hỏi $t \to$ dùng (3): $0^2 = 40^2 + 2\cdot (-8)\cdot \Delta x \to \Delta x = \frac{1600}{16} = $ **100 m**.

</details>

### 📝 Tóm tắt mục 5

3 phương trình cho chuyển động $a$ hằng. Chọn phương trình theo cái nào "cho-tìm" gọn nhất:
- Cho $t \to$ tìm $v$: (1).
- Cho $t \to$ tìm $x$: (2).
- KHÔNG có $t$, biết $v_0$, $v$, $x$: (3).

---

## 6. Rơi tự do

### 6.1. Khái niệm

**Rơi tự do** = chuyển động chỉ do **lực hấp dẫn** (bỏ qua sức cản không khí). Mọi vật, không kể khối lượng, đều rơi với cùng **gia tốc trọng trường g**:

$$g \approx 9{,}8\ \text{m/s}^2 \quad \text{(gần mặt đất)}$$

(Mặt trăng: $g \approx 1{,}6\ \text{m/s}^2$. Sao Hỏa: $g \approx 3{,}7\ \text{m/s}^2$. Bài này chỉ Trái Đất.)

💡 **Hiểu lầm phổ biến**: "lông và sắt cùng rơi cùng tốc độ" — đúng trong **chân không**, nhưng trong không khí lông rơi chậm vì sức cản không khí lớn hơn lực hấp dẫn so với trọng lượng.

### 6.2. Áp dụng 3 phương trình

Với rơi tự do, chọn trục y dương hướng lên (theo quy ước phổ biến) $\to a = -g = -9{,}8\ \text{m/s}^2$.

**Ví dụ — Thả vật từ độ cao 20 m**:

a) Vận tốc khi chạm đất?
- Áp (3): $v^2 = 0 + 2\cdot (-9{,}8)\cdot (0 - 20) = 392 \to v = \pm 19{,}8$ m/s. Lấy $v = -19{,}8$ m/s (đi xuống).
- Tốc độ chạm đất: **19,8 m/s** $\approx 71{,}3$ km/h.

b) Thời gian rơi?
- Áp (1): $-19{,}8 = 0 + (-9{,}8)\cdot t \to t = $ **2,02 giây**.

c) Cùng độ cao 20 m, nếu ném xuống với $v_0 = 5$ m/s thì thời gian rơi?
- Áp (2): $0 = 20 + (-5)\cdot t + 0{,}5\cdot (-9{,}8)\cdot t^2 \to 4{,}9t^2 + 5t - 20 = 0$.
- $t = \frac{-5 + \sqrt{25 + 392}}{9{,}8} = \frac{-5 + 20{,}42}{9{,}8} \approx$ **1,57 giây** (nhanh hơn).

### ⚠ Lỗi thường gặp

- **Nghĩ vật nặng rơi nhanh hơn**: trong chân không, lông và búa rơi **cùng tốc độ** (đã được chứng minh trên Mặt Trăng, Apollo 15). Khối lượng $m$ không vào kết quả vì $a = \frac{F}{m} = \frac{mg}{m} = g$ ($m$ tự triệt tiêu). Trong không khí thật, lông chậm hơn chỉ vì **sức cản**, không phải vì nhẹ.
- **Lẫn dấu của g**: nếu chọn trục y dương hướng **lên**, thì $a = $ **−9,8** m/s² (gia tốc hướng xuống). Quên dấu âm $\to$ vật "rơi lên trời". Nếu chọn y dương hướng xuống thì $a = +9{,}8$ — phải nhất quán suốt bài.
- **Quên rằng vật ném lên vẫn có a = g suốt**: khi ném vật lên, ở điểm cao nhất $v = 0$ nhưng $a$ vẫn $= -9{,}8\ \text{m/s}^2$ (không phải 0). Gia tốc do trọng lực không bao giờ tắt khi vật còn trong không khí.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Thời gian rơi có phụ thuộc khối lượng không?"* Không (bỏ qua sức cản). Từ $h = \frac{1}{2}gt^2 \to t = \sqrt{\frac{2h}{g}}$, không có $m$. Hòn đá 1 kg và 10 kg thả cùng độ cao chạm đất cùng lúc.
- *"Vì sao ném xuống với $v_0=5$ m/s lại rơi nhanh hơn (1,57 s so với 2,02 s)?"* Vì vật đã có sẵn vận tốc hướng xuống ngay từ đầu, cộng thêm vào vận tốc do trọng lực — nên đi hết quãng đường nhanh hơn so với thả nhẹ ($v_0 = 0$).
- *"$g = 9{,}8$ hay $10\ \text{m/s}^2$?"* Giá trị chính xác gần mặt biển $\approx 9{,}81\ \text{m/s}^2$. Nhiều bài làm tròn $10\ \text{m/s}^2$ cho dễ tính. Bài này dùng 9,8. Khác nhau ~2%, không ảnh hưởng ý nghĩa.

🔁 **Dừng lại tự kiểm tra**

1. Thả một vật từ độ cao 5 m ($v_0=0$). Thời gian rơi? (dùng $g = 9{,}8$)
2. Một vật được ném thẳng lên với $v_0 = 19{,}6$ m/s. Bao lâu thì nó đạt điểm cao nhất?

<details><summary>Đáp án</summary>

1. $h = \frac{1}{2}gt^2 \to 5 = \frac{1}{2}\cdot 9{,}8\cdot t^2 \to t^2 = 1{,}02 \to t \approx$ **1,01 s**.
2. Tại điểm cao nhất $v = 0$. (1) với $a = -9{,}8$: $0 = 19{,}6 + (-9{,}8)t \to t = $ **2 s**.

</details>

### 📝 Tóm tắt mục 6

- Rơi tự do: $a = g = 9{,}8\ \text{m/s}^2$ (xuống).
- Mọi vật rơi cùng tốc độ trong chân không.
- Áp 3 phương trình với $a = -g$ (chọn y dương lên).

---

## 7. Chuyển động 2 chiều — Ném ngang

💡 **Trực giác / Hình dung**: tưởng tượng cùng lúc bạn **thả** một viên bi từ tay (rơi thẳng xuống) và **bắn ngang** một viên khác từ cùng độ cao. Cả hai chạm đất **cùng một lúc**! Vì trục dọc (rơi) không "biết" gì về trục ngang (bay). Chuyển động 2D = ghép hai chuyển động 1D độc lập: ngang thì đều như xe chạy thẳng, dọc thì rơi tự do như thả bi. Giải riêng từng trục rồi ghép lại.

### 7.1. Nguyên lý độc lập

Trong chuyển động 2D, **mỗi trục độc lập nhau**:
- Trục ngang (x): vận tốc không đổi (không có lực ngang) $\to$ chuyển động đều, $x = v_x\cdot t$.
- Trục dọc (y): chỉ chịu lực hấp dẫn $\to$ rơi tự do, $y = y_0 - \frac{1}{2}\cdot g\cdot t^2$.

### 7.2. Ví dụ — Ném ngang từ vách núi

Một viên đá được ném ngang với vận tốc đầu $v_0 = 15$ m/s từ vách núi cao $h = 45$ m. Tính:

a) **Thời gian rơi**:
- Trục dọc: $0 = 45 - 0{,}5\cdot 9{,}8\cdot t^2 \to t^2 = \frac{45}{4{,}9} \approx 9{,}18 \to t \approx$ **3,03 giây**.

b) **Khoảng cách ngang khi chạm đất**:
- Trục ngang: $x = 15 \times 3{,}03 = $ **45,5 m**.

c) **Tốc độ chạm đất** (cả 2 thành phần):
- $v_x = 15$ m/s (không đổi).
- $v_y = 0 - 9{,}8 \times 3{,}03 \approx -29{,}7$ m/s.
- $|v| = \sqrt{15^2 + 29{,}7^2} = \sqrt{225 + 882} \approx$ **33,3 m/s**.

### ⚠ Lỗi thường gặp

- **Trộn lẫn vận tốc 2 trục vào một phương trình**: trục ngang dùng $x = v_x\cdot t$ ($a=0$); trục dọc dùng rơi tự do ($a=g$). KHÔNG được dùng $v_0 = 15$ m/s (ngang) trong phương trình rơi của trục dọc. Hai trục giải riêng.
- **Nghĩ vận tốc ngang ảnh hưởng thời gian rơi**: SAI. Thời gian rơi chỉ phụ thuộc độ cao $h$ và $g$: $t = \sqrt{\frac{2h}{g}}$. Bắn ngang 15 m/s hay 150 m/s từ cùng vách núi đều **rơi hết cùng thời gian**, chỉ bay xa khác nhau.
- **Cộng tốc độ 2 trục bằng phép cộng thường**: tốc độ chạm đất KHÔNG phải $v_x + v_y = 15 + 29{,}7 = 44{,}7$ m/s. Phải dùng **Pytago** (vì là vector vuông góc): $|v| = \sqrt{v_x^2 + v_y^2} = 33{,}3$ m/s.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao bắn ngang và thả rơi lại chạm đất cùng lúc?"* Vì trọng lực chỉ tác dụng theo phương dọc, kéo cả hai xuống với cùng a = g. Vận tốc ngang không tạo và không làm chậm chuyển động dọc. Trục dọc của cả hai giống hệt nhau → cùng thời gian rơi.
- *"Quỹ đạo ném ngang có hình gì?"* Hình **parabola**. Vì $x = v_x\cdot t$ (tỉ lệ với $t$) còn $y$ giảm theo $t^2 \to$ kết hợp ra $y$ là hàm bậc 2 của $x \to$ parabola.
- *"Nếu ném xiên (góc lên) thì sao?"* Tách $v_0$ thành $v_x = v_0\cos\theta$ (ngang, đều) và $v_y = v_0\sin\theta$ (dọc, chịu trọng lực). Cùng nguyên lý độc lập, chỉ khác là trục dọc có vận tốc đầu hướng lên.

🔁 **Dừng lại tự kiểm tra**

1. Bi ném ngang $v_0 = 8$ m/s từ độ cao 20 m. Bao lâu chạm đất? Bay xa bao nhiêu theo phương ngang? ($g=9{,}8$)
2. Hai viên bi từ cùng độ cao: A thả rơi, B bắn ngang 30 m/s. Viên nào chạm đất trước?

<details><summary>Đáp án</summary>

1. Trục dọc: $20 = \frac{1}{2}\cdot 9{,}8\cdot t^2 \to t^2 = 4{,}08 \to t \approx$ **2,02 s**. Trục ngang: $x = 8 \times 2{,}02 \approx$ **16,2 m**.
2. **Cùng lúc** — thời gian rơi chỉ phụ thuộc độ cao, không phụ thuộc vận tốc ngang.

</details>

### 📝 Tóm tắt mục 7

- 2 trục độc lập nhau: ngang = đều, dọc = rơi tự do.
- Thời gian rơi không phụ thuộc vận tốc ngang.

---

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một xe bắt đầu từ x = 5 m, chạy thẳng với vận tốc không đổi 10 m/s theo chiều dương. Tìm vị trí sau 8 giây.

**Bài 2**: Người chạy bộ đi 3 km về phía Đông trong 15 phút, rồi quay lại 1 km về phía Tây trong 5 phút. Tính:
a) Vận tốc trung bình.
b) Tốc độ trung bình.

**Bài 3**: Xe khởi hành (v₀ = 0) với gia tốc 3 m/s², chạy trong 10 giây. Tính:
a) Vận tốc cuối.
b) Quãng đường đi.

**Bài 4**: Một quả bóng được thả từ độ cao 80 m. Tính:
a) Thời gian rơi.
b) Tốc độ chạm đất.

**Bài 5**: Xe đang chạy v = 25 m/s, phanh để tránh chướng ngại. Quãng đường phanh tối đa cho phép = 50 m. Tính gia tốc phanh tối thiểu cần thiết.

**Bài 6**: Một viên bi được ném ngang từ độ cao 20 m với v₀ = 10 m/s. Tính khoảng cách ngang khi viên bi chạm đất.

### Lời giải

**Bài 1**: Vận tốc không đổi $\to a = 0$. Áp (2): $x = 5 + 10\cdot 8 + 0 = $ **85 m**.

**Bài 2**:
- a) $\Delta x = 3 - 1 = +2$ km $= +2000$ m. $\Delta t = 20$ phút $= 1200$ s. $v_{tb} = \frac{2000}{1200} \approx$ **+1,67 m/s** (về phía Đông).
- b) Quãng đường $s = 3 + 1 = 4$ km $= 4000$ m. Tốc độ tb $= \frac{4000}{1200} \approx$ **3,33 m/s**.

**Bài 3**:
- a) $v = 0 + 3\cdot 10 = $ **30 m/s**.
- b) $x = 0\cdot 10 + 0{,}5\cdot 3\cdot 100 = $ **150 m**.

**Bài 4**:
- a) Dùng (2) với $y_0 = 80$, $v_0 = 0$, $a = -9{,}8$: $0 = 80 + 0 - 4{,}9\cdot t^2 \to t^2 = 16{,}33 \to t \approx$ **4,04 giây**.
- b) $v = 0 - 9{,}8\cdot 4{,}04 = -39{,}6$ m/s $\to$ tốc độ $\approx$ **39,6 m/s** $\approx 143$ km/h.

**Bài 5**: Áp (3): $0 = 25^2 + 2\cdot a\cdot 50 \to a = -\frac{625}{100} = $ **−6,25 m/s²**. Cần phanh ít nhất 6,25 m/s².

**Bài 6**:
- Thời gian rơi: $t = \sqrt{\frac{2\cdot 20}{9{,}8}} = \sqrt{4{,}08} \approx 2{,}02$ s.
- Khoảng cách ngang: $x = 10\cdot 2{,}02 = $ **20,2 m**.

---

## 9. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) — vì sao vật có gia tốc? Câu trả lời: $F = m\cdot a$.
- **Liên kết Math**: đạo hàm (slope) và tích phân (diện tích) — sẽ học chi tiết ở [`Math/04-Calculus-1var/lesson-03,07`](../../../Math/04-Calculus-1var/) (chưa triển khai).

---

## 📝 Tổng kết Lesson 01

1. **Vị trí $x$**: tọa độ vật so với gốc. **Độ dịch chuyển $\Delta x$**: vị trí cuối − đầu (có dấu). **Quãng đường $s$**: tổng đường đi (luôn dương).
2. **Vận tốc $v = \frac{\Delta x}{\Delta t} = \frac{dx}{dt}$** (có hướng). **Tốc độ** $= |v|$.
3. **Gia tốc $a = \frac{\Delta v}{\Delta t} = \frac{dv}{dt}$**. Cùng chiều $v \to$ tăng tốc; ngược chiều $\to$ phanh.
4. **3 đồ thị x-t, v-t, a-t** liên hệ qua slope/diện tích.
5. **3 phương trình chuyển động đều ($a$ hằng)**:
   - $v = v_0 + at$
   - $x = x_0 + v_0 t + \frac{1}{2}at^2$
   - $v^2 = v_0^2 + 2a(x - x_0)$
6. **Rơi tự do**: $a = g \approx 9{,}8\ \text{m/s}^2$. Áp 3 phương trình với $a = -g$.
7. **Chuyển động 2D**: 2 trục độc lập (ngang đều + dọc rơi tự do).

**Tiếp theo**: [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/)
