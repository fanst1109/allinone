# Lesson 06 — Chuyển động tròn

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **chuyển động tròn đều** và phân biệt **vận tốc dài v** với **vận tốc góc $\omega$**.
- Hiểu **gia tốc hướng tâm**: vật đang đổi hướng → có gia tốc, dù tốc độ không đổi.
- Tính **lực hướng tâm $F_c = \frac{m \cdot v^2}{r}$**.
- Áp dụng cho quỹ đạo hành tinh và **3 định luật Kepler**.
- Hiểu vì sao vệ tinh không "rơi" mặc dù bị Trái Đất hút (rơi liên tục nhưng quỹ đạo cong theo bề mặt).

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/), [Lesson 03 — Các loại lực](../lesson-03-forces/) (lực hấp dẫn).

---

## 1. Chuyển động tròn đều

### 1.1. Định nghĩa

**Chuyển động tròn đều** = chuyển động trên đường tròn bán kính r với **tốc độ không đổi** $|v| = \text{const}$.

💡 **Lưu ý quan trọng**: tốc độ $|v|$ không đổi nhưng **vector vận tốc v luôn thay đổi hướng**. Đó là chuyển động có **gia tốc** dù tốc độ không đổi!

**Vì sao có gia tốc?** Vì gia tốc = thay đổi của vận tốc (vector), không phải tốc độ (scalar). Khi vật đi vòng tròn, hướng v liên tục đổi $\to \Delta v \neq 0 \to a \neq 0$.

### 1.2. Vận tốc dài v vs vận tốc góc ω

- **Vận tốc dài v** (m/s): tốc độ thật của vật trên quỹ đạo, dọc theo cung tròn.
- **Vận tốc góc $\omega$** (rad/s): tốc độ quét góc khi vật đi quanh tâm.

Liên hệ:

$$v = \omega \cdot r$$

💡 **Ví dụ**: 2 vật trên bánh xe quay đều — vật ở mép xe (r lớn) đi nhanh hơn vật gần tâm (r nhỏ) dù cả 2 có cùng $\omega$. Đó là tại sao mép đĩa quay nhanh hơn vùng trung tâm.

### 1.3. Chu kỳ và tần số

- **Chu kỳ T** (s): thời gian đi hết 1 vòng. $\omega = \frac{2\pi}{T}$.
- **Tần số f** (Hz, Hertz): số vòng/giây. $f = \frac{1}{T}$. $\omega = 2\pi \cdot f$.

### 1.4. Bốn ví dụ con số

**Ví dụ 1 — Trái Đất quay quanh Mặt Trời**: $T = 365{,}25$ ngày $\approx 3{,}16 \times 10^7$ s. $\omega = \frac{2\pi}{T} \approx 2 \times 10^{-7}$ rad/s. $r = 1{,}5 \times 10^{11}$ m. $v = \omega \cdot r \approx$ **30,000 m/s** = 30 km/s. (Bạn đang chạy với tốc độ này mà không cảm thấy gì!)

**Ví dụ 2 — Bánh xe đạp**: bán kính $r = 0{,}3$ m, xe chạy 5 m/s. $\omega = \frac{v}{r} = \frac{5}{0{,}3} \approx$ **16.7 rad/s** = 2.65 vòng/giây.

**Ví dụ 3 — Trái Đất tự quay quanh trục**: $T = 24$ giờ $= 86400$ s. $\omega = 7{,}27 \times 10^{-5}$ rad/s. Ở xích đạo $r = 6371$ km $\to v = \omega \cdot r \approx$ **463 m/s** = 1667 km/h.

**Ví dụ 4 — Trạm vũ trụ ISS**: $T = 92$ phút $= 5520$ s. Quỹ đạo cách Trái Đất 400 km, $r_{quỹ\_đạo} = 6771$ km. $v = \frac{2\pi \cdot r}{T} \approx$ **7,700 m/s**.

### ⚠ Lỗi thường gặp

- **Nghĩ chuyển động tròn đều không có gia tốc vì "tốc độ không đổi"**: SAI. Tốc độ $|v|$ không đổi nhưng **hướng** vận tốc liên tục đổi → vector v thay đổi → có gia tốc (hướng tâm). Đây là sai lầm phổ biến nhất của mục này.
- **Lẫn vận tốc dài v (m/s) với vận tốc góc $\omega$ (rad/s)**: hai đại lượng khác nhau, liên hệ $v = \omega \cdot r$. Cùng $\omega$, vật ở r lớn có v lớn hơn.
- **Quên đổi vòng/phút sang rad/s**: 1 vòng $= 2\pi$ rad. 60 vòng/phút $= \frac{60 \cdot 2\pi}{60} = 2\pi$ rad/s, KHÔNG phải 60 rad/s.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao 2 điểm trên cùng đĩa quay có cùng $\omega$ nhưng khác v?"* Vì $v = \omega \cdot r$. Mọi điểm quét cùng góc trong cùng thời gian (cùng $\omega$), nhưng điểm xa tâm (r lớn) phải đi quãng đường dài hơn trong cùng thời gian → v lớn hơn. Mép đĩa nhanh hơn gần trục.
- *"Chu kỳ và tần số khác nhau thế nào?"* Chu kỳ T = thời gian một vòng (giây); tần số f = số vòng mỗi giây (Hz). Chúng nghịch đảo: $f = \frac{1}{T}$. Quay nhanh → T nhỏ, f lớn.
- *"rad/s nghĩa là gì — radian là gì?"* Radian là cách đo góc: 1 vòng đầy $= 2\pi$ rad $\approx 6{,}28$ rad. $\omega$ tính bằng rad/s = số radian quét mỗi giây. Dùng radian (không phải độ) để công thức $v = \omega \cdot r$ đúng.

🔁 **Dừng lại tự kiểm tra**

1. Đĩa quay với chu kỳ T = 0.5 s. Tính ω và tần số f.
2. Một điểm cách tâm 0.2 m trên đĩa quay ω = 10 rad/s. Vận tốc dài của nó?

<details><summary>Đáp án</summary>

1. $\omega = \frac{2\pi}{T} = \frac{2\pi}{0{,}5} = $ **$4\pi \approx 12{,}57$ rad/s**. $f = \frac{1}{T} = \frac{1}{0{,}5} = $ **2 Hz**.
2. $v = \omega \cdot r = 10 \cdot 0{,}2 = $ **2 m/s**.

</details>

### 📝 Tóm tắt mục 1

- Chuyển động tròn đều: $|v|$ hằng, nhưng vector v đổi hướng → có gia tốc.
- $v = \omega \cdot r$. $\omega = \frac{2\pi}{T} = 2\pi f$.

---

## 2. Gia tốc hướng tâm

### 2.1. Định nghĩa

**Gia tốc hướng tâm $a_c$** = gia tốc của vật chuyển động tròn đều, luôn hướng **về tâm vòng tròn**:

$$a_c = \frac{v^2}{r} = \omega^2 \cdot r$$

💡 **Ý nghĩa**: dù tốc độ không đổi, vận tốc vẫn đổi hướng → có gia tốc. Gia tốc này không "tăng tốc" mà "đổi hướng" — nó luôn chỉ về tâm để liên tục bẻ lái đường đi thành đường tròn.

**Chứng minh trực giác** (vì sao $a_c = \frac{v^2}{r}$):

Xét vật đi qua 2 điểm cách nhau góc $\Delta\theta$ rất nhỏ. Vận tốc đổi từ $v_1$ (hướng theo tiếp tuyến tại 1) sang $v_2$ (tiếp tuyến tại 2). Cùng độ lớn $|v|$, nhưng góc giữa $v_1$ và $v_2$ $= \Delta\theta$.

$|\Delta v| = |v| \cdot \Delta\theta$ (tam giác đồng dạng).

$\Delta\theta = \frac{v \cdot \Delta t}{r}$ (vì cung = bán kính × góc).

$\to \Delta v = v \cdot \frac{v \cdot \Delta t}{r} \to a = \frac{\Delta v}{\Delta t} = $ **$\frac{v^2}{r}$**.

### 2.2. Ba ví dụ trực giác

**Ví dụ 1 — Xe chạy vào cua**: Xe $v = 20$ m/s, vào cua bán kính 50 m. $a_c = \frac{400}{50} = $ **8 m/s²**. Bạn cảm thấy "bị ép" về phía ngoài cua — đó là quán tính, không phải "lực ly tâm" thật (xem §3).

**Ví dụ 2 — Trạm ISS quay quanh Trái Đất**: $a_c = \frac{v^2}{r} = \frac{7700^2}{6{,}77 \times 10^6} \approx$ **8.76 m/s²**. Chính bằng g ở độ cao đó! Đó là tại sao phi hành gia trên ISS "không trọng lực" — họ thật ra **đang rơi tự do liên tục**, chỉ có điều quỹ đạo cong theo bề mặt Trái Đất nên không bao giờ "tiếp đất".

**Ví dụ 3 — Đu dây thừng vòng tròn**: Bạn cầm 1 vật buộc dây, quay tròn nhanh. Vật có $a_c$ hướng vào tay. Sức căng dây = lực hướng tâm.

### ⚠ Lỗi thường gặp

- **Nghĩ gia tốc hướng tâm làm vật "nhanh dần"**: KHÔNG. $a_c$ chỉ đổi **hướng** vận tốc, không đổi tốc độ. Tốc độ $|v|$ giữ nguyên trong chuyển động tròn đều — $a_c$ liên tục "bẻ lái" để giữ vật trên đường tròn.
- **Cho $a_c$ hướng ra ngoài**: $a_c$ luôn hướng **vào tâm** (centripetal = "tìm tâm"). Cảm giác "bị đẩy ra" là quán tính, không phải gia tốc thật.
- **Quên bình phương v trong $a_c = \frac{v^2}{r}$**: tốc độ gấp đôi → $a_c$ gấp **4 lần**. Phản ví dụ: $v = 10$, $r = 5 \to a_c = \frac{100}{5} = 20$; $v = 20 \to a_c = \frac{400}{5} = 80$ (gấp 4, không gấp 2).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Tốc độ không đổi sao lại có gia tốc?"* Vì gia tốc đo thay đổi của **vận tốc (vector)**, không phải tốc độ (số). Đi vòng tròn, hướng v luôn đổi $\to \Delta v \neq 0 \to a \neq 0$. Gia tốc này chỉ đổi hướng chứ không đổi độ lớn v.
- *"$a_c$ lớn khi nào?"* Khi v lớn ($a_c \propto v^2$) hoặc r nhỏ (cua gắt). Vào cua gắt tốc độ cao → $a_c$ rất lớn → cần lực hướng tâm lớn → dễ trượt nếu ma sát không đủ.
- *"Vì sao $a_c = \frac{v^2}{r}$ mà không phải $\frac{v}{r}$?"* Chứng minh hình học (§2.1): $|\Delta v| = v \cdot \Delta\theta$ và $\Delta\theta = \frac{v \Delta t}{r} \to$ ghép lại được $a = \frac{v^2}{r}$. Bình phương v đến từ việc cả độ lớn vận tốc và tốc độ quét góc đều phụ thuộc v.

🔁 **Dừng lại tự kiểm tra**

1. Xe vào cua bán kính 40 m với v = 12 m/s. Tính gia tốc hướng tâm.
2. Nếu xe đó tăng tốc lên 24 m/s (gấp đôi) trên cùng cua, a_c thay đổi thế nào?

<details><summary>Đáp án</summary>

1. $a_c = \frac{v^2}{r} = \frac{12^2}{40} = \frac{144}{40} = $ **3.6 m/s²** (hướng vào tâm cua).
2. v gấp đôi → $a_c$ gấp **4 lần** $= \frac{24^2}{40} = \frac{576}{40} = $ **14.4 m/s²**.

</details>

### 📝 Tóm tắt mục 2

- $a_c = \frac{v^2}{r} = \omega^2 \cdot r$, luôn hướng vào tâm.
- $|v|$ không đổi nhưng vector v đổi → có gia tốc.
- Chuyển động tròn đều = "rơi" liên tục về tâm với gia tốc $a_c$.

---

## 3. Lực hướng tâm

### 3.1. Định nghĩa

**Lực hướng tâm $F_c$** = **tổng lực** tác dụng lên vật chuyển động tròn, hướng về tâm:

$$F_c = m \cdot a_c = \frac{m \cdot v^2}{r}$$

💡 **Ý nghĩa quan trọng**: "lực hướng tâm" KHÔNG phải một loại lực mới. Đây là **tên gọi** cho tổng các lực thực (trọng lực, dây căng, ma sát...) hướng về tâm trong chuyển động tròn.

**Ví dụ về nguồn gốc lực hướng tâm**:
- Vệ tinh quay quanh Trái Đất: $F_c$ = lực hấp dẫn.
- Ô tô vào cua: $F_c$ = ma sát giữa lốp và đường.
- Vật buộc dây quay tròn: $F_c$ = sức căng dây.
- Electron quay quanh hạt nhân (mô hình Bohr): $F_c$ = lực Coulomb.

### 3.2. ⚠ "Lực ly tâm" — chỉ là cảm nhận

Khi bạn ngồi trong ô tô vào cua, bạn cảm thấy **bị đẩy ra ngoài**. Cảm giác này gọi là "lực ly tâm". Nhưng thật ra **không có lực thật nào đẩy bạn ra ngoài** — bạn chỉ cảm thấy quán tính (định luật I): thân bạn "muốn" đi thẳng theo phương vận tốc cũ, trong khi xe đang bẻ lái về phía tâm cua.

→ "Lực ly tâm" chỉ tồn tại trong **hệ quy chiếu quay** (quay theo vật). Trong hệ quy chiếu quán tính (đứng yên), không có lực nào đẩy ra ngoài.

### 3.3. Walk-through — Vệ tinh quay quanh Trái Đất

Tính vận tốc vệ tinh để duy trì quỹ đạo bán kính r quanh Trái Đất.

**Điều kiện**: lực hấp dẫn = lực hướng tâm:

$$\frac{G \cdot M_T \cdot m}{r^2} = \frac{m \cdot v^2}{r}$$

→ **$v = \sqrt{\frac{G \cdot M_T}{r}}$**.

**Tính cho ISS** ($r = 6371 + 400$ km $= 6{,}77 \times 10^6$ m):
- $v = \sqrt{\frac{6{,}674 \times 10^{-11} \times 5{,}97 \times 10^{24}}{6{,}77 \times 10^6}} = \sqrt{5{,}88 \times 10^7} \approx$ **7,670 m/s** = 27,600 km/h. ✓

→ Để bay vũ trụ, tên lửa phải đạt **tốc độ vũ trụ cấp 1** $\approx 7{,}9$ km/s. Dưới đó không đủ để "rơi vòng quanh" Trái Đất.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Lực hướng tâm là lực gì — có công thức riêng không?"* KHÔNG phải lực mới. "Lực hướng tâm" chỉ là **tên gọi vai trò** của tổng các lực thực hướng về tâm. Với vệ tinh đó là hấp dẫn; với xe cua đó là ma sát; với vật buộc dây đó là lực căng. Bạn phải tìm lực thực nào đang đóng vai trò đó.
- *"Lực ly tâm có thật không?"* Không trong hệ quy chiếu quán tính (đứng yên). Cảm giác "bị đẩy ra" là do quán tính — thân bạn muốn đi thẳng còn xe bẻ lái vào trong. "Lực ly tâm" chỉ là một thủ thuật toán học trong hệ quy chiếu quay.
- *"Vì sao vệ tinh không rơi xuống đất?"* Nó **đang rơi** liên tục! Nhưng nó cũng đang bay ngang đủ nhanh nên mặt đất "cong đi" dưới chân nó đúng bằng tốc độ rơi → quỹ đạo cong song song bề mặt → không bao giờ chạm đất. Cần $v \approx 7{,}9$ km/s.

🔁 **Dừng lại tự kiểm tra**

1. Vật 0.5 kg buộc dây quay tròn r = 1 m với v = 4 m/s. Lực căng dây (= lực hướng tâm) bằng bao nhiêu?
2. Ô tô 1000 kg vào cua r = 50 m với v = 10 m/s. Lực ma sát cần để giữ xe trên cua?

<details><summary>Đáp án</summary>

1. $F_c = \frac{m \cdot v^2}{r} = \frac{0{,}5 \cdot 16}{1} = $ **8 N**.
2. $F_c = \frac{m \cdot v^2}{r} = \frac{1000 \cdot 100}{50} = $ **2000 N** (ma sát phải cung cấp ít nhất 2000 N, nếu không xe trượt ra).

</details>

### 📝 Tóm tắt mục 3

- $F_c = \frac{m \cdot v^2}{r}$. KHÔNG phải lực mới, mà là tên gọi cho tổng lực hướng tâm.
- Nguồn gốc: hấp dẫn (vệ tinh), ma sát (cua xe), căng dây (quay vật).
- "Lực ly tâm" chỉ là cảm nhận quán tính, không phải lực thật.

---

## 4. Quỹ đạo hành tinh và 3 định luật Kepler

💡 **Trực giác / Hình dung**: Kepler giống như một thám tử nhìn dữ liệu vị trí hành tinh (do Tycho Brahe ghi suốt mấy chục năm) rồi đoán ra "luật chơi" mà không biết nguyên nhân: quỹ đạo là hình bầu dục (ellipse), hành tinh chạy nhanh khi gần Mặt Trời như con quay vào gần trục, và hành tinh xa thì "một năm" của nó dài hơn nhiều. Newton sau đó là nhà vật lý chỉ ra **vì sao**: tất cả chỉ là hệ quả của một công thức hấp dẫn $F = \frac{GMm}{r^2}$. Ba quy luật quan sát = một định luật nền tảng.

### 4.1. Ba định luật Kepler (1609-1619)

Trước Newton, Kepler đã mô tả quỹ đạo hành tinh quan sát được từ Tycho Brahe:

**Định luật I — Quỹ đạo ellipse**: Mọi hành tinh quay quanh Mặt Trời theo quỹ đạo **ellipse**, với Mặt Trời ở **1 trong 2 tiêu điểm**.

(Không phải vòng tròn hoàn hảo — đa số gần tròn nhưng vẫn ellipse.)

**Định luật II — Diện tích quét**: Vector từ Mặt Trời đến hành tinh **quét diện tích bằng nhau trong khoảng thời gian bằng nhau**.

→ Hành tinh đi **nhanh hơn khi gần Mặt Trời**, chậm hơn khi xa. Đây là biểu hiện của **bảo toàn momen động lượng**.

**Định luật III — Chu kỳ và khoảng cách**: $T^2 \propto r^3$ (với r = bán trục lớn của ellipse).

$$\frac{T^2}{r^3} = \text{const} \quad \text{(cho mọi hành tinh quanh cùng 1 sao)}$$

### 4.2. Suy ra Kepler III từ Newton

Cho hành tinh m quay tròn (xấp xỉ ellipse) quanh Mặt Trời M:
- Lực hấp dẫn = lực hướng tâm: $\frac{GMm}{r^2} = \frac{m \cdot v^2}{r} \to v^2 = \frac{GM}{r}$.
- $T = \frac{2\pi r}{v} \to T^2 = \frac{4\pi^2 \cdot r^2}{v^2} = \frac{4\pi^2 \cdot r^2 \cdot r}{GM} = \frac{4\pi^2 \cdot r^3}{GM}$.

→ **$\frac{T^2}{r^3} = \frac{4\pi^2}{GM} = \text{const}$**. Khớp Kepler III. Đây là **chiến thắng vĩ đại** của Newton — chứng minh được rằng cả các định luật Kepler (về thiên thể) và định luật rơi tự do (trên Trái Đất) đều là **cùng một quy luật vạn vật hấp dẫn**.

### 4.3. Số liệu Hệ Mặt Trời

| Hành tinh | r (AU) | T (năm) | $\frac{T^2}{r^3}$ (xấp xỉ) |
|-----------|--------|---------|------------------|
| Sao Thủy | 0.39 | 0.24 | 0.97 |
| Sao Kim | 0.72 | 0.62 | 1.04 |
| Trái Đất | 1.00 | 1.00 | 1.00 |
| Sao Hỏa | 1.52 | 1.88 | 1.00 |
| Sao Mộc | 5.20 | 11.86 | 1.00 |
| Sao Thổ | 9.54 | 29.46 | 1.00 |

(1 AU $= 1{,}496 \times 10^{11}$ m = khoảng cách Trái Đất - Mặt Trời.)

→ $\frac{T^2}{r^3} \approx 1$ cho mọi hành tinh — Kepler III được xác nhận.

### ⚠ Lỗi thường gặp

- **Nghĩ quỹ đạo hành tinh là vòng tròn hoàn hảo**: là **ellipse** (Kepler I), Mặt Trời ở một tiêu điểm (không phải tâm). Đa số gần tròn nhưng vẫn là ellipse — đó là lý do có "điểm gần nhất" và "xa nhất".
- **Dùng Kepler III với đơn vị tùy tiện**: $T^2 = r^3$ chỉ "đẹp" khi T tính bằng **năm** và r bằng **AU** (cho hệ Mặt Trời). Dùng giây và mét thì $\frac{T^2}{r^3} = \frac{4\pi^2}{GM}$, một hằng số khác.
- **Nghĩ hành tinh nặng hơn quay nhanh hơn**: chu kỳ chỉ phụ thuộc r (và khối lượng Mặt Trời), KHÔNG phụ thuộc khối lượng hành tinh (m triệt tiêu trong $\frac{GMm}{r^2} = \frac{mv^2}{r}$).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao hành tinh đi nhanh hơn khi gần Mặt Trời?"* Đây là Kepler II (diện tích quét đều), biểu hiện của **bảo toàn momen động lượng**. Khi gần (r nhỏ), để quét cùng diện tích trong cùng thời gian, hành tinh phải đi nhanh hơn. Giống vận động viên trượt băng kéo tay vào quay nhanh hơn.
- *"Làm sao Newton chứng minh được Kepler từ $F = \frac{GMm}{r^2}$?"* Cho lực hấp dẫn đóng vai lực hướng tâm ($\frac{GMm}{r^2} = \frac{mv^2}{r}$), suy ra $v^2 = \frac{GM}{r}$, rồi $T = \frac{2\pi r}{v} \to T^2 = \frac{4\pi^2 r^3}{GM} \to \frac{T^2}{r^3} = $ hằng số. Đúng Kepler III. Đây là chiến thắng hợp nhất "trời" và "đất".
- *"Kepler III dùng để làm gì thực tế?"* Tính chu kỳ vệ tinh ở độ cao bất kỳ, thiết kế quỹ đạo địa tĩnh, ước lượng khối lượng sao/hành tinh từ chu kỳ của vật quay quanh nó.

🔁 **Dừng lại tự kiểm tra**

1. Sao Hỏa cách Mặt Trời 1.52 AU. Dùng Kepler III ($T^2 = r^3$, đơn vị năm/AU), tính chu kỳ quỹ đạo.
2. Hai hành tinh quay quanh cùng một sao. Hành tinh xa gấp 4 lần có chu kỳ gấp mấy lần?

<details><summary>Đáp án</summary>

1. $T = r^{3/2} = 1{,}52^{1{,}5} \approx$ **1.87 năm** (khớp giá trị thật 1.88).
2. $T^2 \propto r^3 \to r$ gấp 4 $\to T^2$ gấp $4^3 = 64 \to T$ gấp $\sqrt{64} = $ **8 lần**.

</details>

### 📝 Tóm tắt mục 4

- Kepler I: quỹ đạo ellipse.
- Kepler II: diện tích quét đều → tốc độ tăng khi gần.
- Kepler III: $T^2 \propto r^3$.
- Newton chứng minh: tất cả là hệ quả của $F = \frac{GMm}{r^2}$.

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một vật trên đường ray quay tròn bán kính 2 m với chu kỳ 4 s. Tính v và ω.

**Bài 2**: Bánh xe đạp bán kính 0.35 m quay 100 vòng/phút. Tính tốc độ xe và vận tốc dài tại mép bánh.

**Bài 3**: Ô tô 1500 kg vào cua bán kính 80 m với v = 15 m/s. Tính lực ma sát cần thiết để xe không trượt ra ngoài.

**Bài 4**: Tính chu kỳ một vệ tinh ở độ cao 35,786 km (quỹ đạo địa tĩnh, GEO). $M_T = 5{,}97 \times 10^{24}$ kg, $R_T = 6371$ km.

**Bài 5**: Sao Mộc cách Mặt Trời 5.20 AU. Dùng Kepler III, tính chu kỳ quỹ đạo.

**Bài 6**: Vì sao phi hành gia trên ISS trông như "không trọng lực" dù vẫn ở trong trường hấp dẫn của Trái Đất?

### Lời giải

**Bài 1**: $\omega = \frac{2\pi}{T} = \frac{\pi}{2}$ rad/s $\approx$ **1.57 rad/s**. $v = \omega \cdot r = 1{,}57 \cdot 2 = $ **3.14 m/s**.

**Bài 2**: $\omega = 100$ vòng/phút $= \frac{100 \cdot 2\pi}{60} \approx 10{,}47$ rad/s. $v = \omega \cdot r = 10{,}47 \cdot 0{,}35 \approx$ **3.66 m/s** = 13.2 km/h.

**Bài 3**: $F_c = \frac{m \cdot v^2}{r} = \frac{1500 \cdot 225}{80} = $ **4,219 N**. Đây là lực ma sát ngang giữa lốp và đường cần để giữ xe trên cua. Nếu ma sát không đủ → xe trượt.

**Bài 4**: $r = 6371 + 35786 = 42{,}157$ km $= 4{,}22 \times 10^7$ m. $v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{6{,}674 \times 10^{-11} \cdot 5{,}97 \times 10^{24}}{4{,}22 \times 10^7}} \approx 3{,}074$ m/s. $T = \frac{2\pi \cdot r}{v} = \frac{2\pi \cdot 4{,}22 \times 10^7}{3074} \approx 86{,}200$ s $\approx$ **23.94 giờ ≈ 1 ngày**. (Quỹ đạo địa tĩnh: vệ tinh giữ nguyên vị trí phía trên 1 điểm trên Trái Đất.)

**Bài 5**: $T^2 = r^3 \to T = r^{3/2} = 5{,}20^{1{,}5} \approx$ **11.86 năm**. ✓ (Khớp dữ liệu thật.)

**Bài 6**: Phi hành gia + ISS đều đang **rơi tự do** dưới lực hấp dẫn của Trái Đất. ISS đang "rơi vòng" liên tục — quỹ đạo tròn của nó chính là sự kết hợp giữa rơi tự do (hướng tâm Trái Đất) và vận tốc ngang (tiếp tuyến). 

Trong khung quay theo ISS, mọi vật bên trong (kể cả phi hành gia) đều rơi với cùng gia tốc → không có lực đẩy giữa người và sàn → cảm giác "không trọng lượng" (apparent weightlessness). 

Đây KHÔNG phải "ngoài không gian không có hấp dẫn" — ở độ cao ISS (400 km), g vẫn $\approx 8{,}76$ m/s² (chỉ giảm 10% so với mặt đất). Cảm giác không trọng lực là do **rơi tự do**.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 07 — Vật rắn](../lesson-07-rigid-body/) — momen lực, momen quán tính.

---

## 📝 Tổng kết Lesson 06

1. **Chuyển động tròn đều**: $|v|$ hằng, hướng đổi → có gia tốc.
2. **$v = \omega \cdot r$**, $\omega = \frac{2\pi}{T}$.
3. **Gia tốc hướng tâm $a_c = \frac{v^2}{r} = \omega^2 \cdot r$**, luôn hướng tâm.
4. **Lực hướng tâm $F_c = \frac{m \cdot v^2}{r}$** — KHÔNG phải lực mới, chỉ là tổng lực hướng tâm.
5. **"Lực ly tâm"** không tồn tại trong hệ quy chiếu quán tính — chỉ là cảm nhận quán tính.
6. **3 định luật Kepler**: ellipse, diện tích đều, $T^2 \propto r^3$. Newton chứng minh đều từ $F = \frac{GMm}{r^2}$.
7. **Vệ tinh ở quỹ đạo**: $v = \sqrt{\frac{GM}{r}}$. Tốc độ vũ trụ cấp 1 $\approx 7{,}9$ km/s.

**Tiếp theo**: [Lesson 07 — Vật rắn](../lesson-07-rigid-body/)
