# Lesson 01 — Động học (Kinematics)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu 3 đại lượng cốt lõi mô tả chuyển động: **vị trí (x)**, **vận tốc (v)**, **gia tốc (a)** — biết mỗi cái đo gì, đơn vị, và liên hệ giữa chúng.
- Phân biệt **độ dịch chuyển (displacement)** và **quãng đường (distance)**, **vận tốc** và **tốc độ**.
- Đọc và vẽ được 3 loại đồ thị chuyển động: **x-t**, **v-t**, **a-t** — và biết mối liên hệ "diện tích/độ dốc" giữa chúng.
- Áp dụng được **3 phương trình chuyển động thẳng biến đổi đều** (gia tốc hằng) để giải bài toán.
- Tính được chuyển động **rơi tự do** (g = 9.8 m/s²) và chuyển động **ném ngang/ném xiên** (đến cuối bài).
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

**Độ dịch chuyển** = **vị trí cuối − vị trí đầu** = `Δx = x₂ − x₁`.

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
| **Độ dịch chuyển Δx** | **0 m** | Vị trí cuối − đầu = 0 (về chỗ cũ!) |
| **Quãng đường s** | **400 m** | 200 m đi + 200 m về |

→ Độ dịch chuyển = 0 dù bạn đã đi rất nhiều — vì đại lượng này chỉ quan tâm điểm đầu và điểm cuối. Quãng đường thì cộng dồn tất cả.

### ⚠ Lỗi thường gặp

- **Lẫn độ dịch chuyển với quãng đường**: nhiều người trả lời "đi 200 m rồi về thì đi được 0 m" — sai. Đi được (quãng đường) là **400 m**; chỉ **độ dịch chuyển** mới = 0. Đọc kỹ đề hỏi cái nào.
- **Quên dấu của độ dịch chuyển**: đi từ x = +10 m về x = +3 m → Δx = 3 − 10 = **−7 m** (âm vì đi ngược chiều dương), KHÔNG phải +7 m. Quãng đường thì = 7 m (luôn dương).
- **Nhầm gốc tọa độ**: nói "vật ở 50 m" mà chưa chọn gốc O thì vô nghĩa. Luôn nêu rõ gốc + chiều dương trước.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao phải phân biệt độ dịch chuyển và quãng đường — chẳng phải đi đâu thì đi được bấy nhiêu sao?"* Chỉ đúng khi đi thẳng một chiều không quay lại. Hễ có đổi hướng, hai cái tách nhau ngay: chạy 1 vòng sân vận động 400 m rồi về chỗ cũ → quãng đường 400 m nhưng độ dịch chuyển 0 m. Vật lý cần độ dịch chuyển (có hướng) để tính vận tốc, gia tốc; cần quãng đường để tính nhiên liệu, mòn lốp...
- *"Độ dịch chuyển có thể âm, vậy quãng đường có âm được không?"* Không bao giờ. Quãng đường là tổng độ dài đường đi — luôn ≥ 0. Chỉ độ dịch chuyển (vector) mới có dấu.
- *"Khi nào |Δx| = s?"* Khi vật đi thẳng theo một chiều, không quay lại. Vd đi từ x=0 đến x=+30 m một mạch: Δx = +30 m, s = 30 m, |Δx| = s. Cứ đổi chiều là s > |Δx|.

🔁 **Dừng lại tự kiểm tra**

1. Một người đi từ x = +2 m sang x = −5 m theo đường thẳng. Tính Δx và s.
2. Người đó đi tiếp từ x = −5 m quay lại x = +1 m. Tính tổng quãng đường s và tổng độ dịch chuyển Δx cho cả hành trình (từ +2 m).

<details><summary>Đáp án</summary>

1. Δx = −5 − 2 = **−7 m** (đi theo chiều âm). Quãng đường s = |−7| = **7 m** (đoạn này đi thẳng nên |Δx| = s).
2. Đoạn 2 dài |1 − (−5)| = 6 m → tổng s = 7 + 6 = **13 m**. Tổng độ dịch chuyển = vị trí cuối − đầu = 1 − 2 = **−1 m**. Thấy ngay s (13) > |Δx| (1) vì có quay lại.

</details>

### 📝 Tóm tắt mục 1

- **Vị trí x**: tọa độ vật so với gốc O.
- **Độ dịch chuyển Δx**: vector từ vị trí đầu đến vị trí cuối. Có dấu.
- **Quãng đường s**: tổng độ dài đường đi. Luôn dương.
- Ví dụ vòng tròn: đi rồi quay về → Δx = 0 nhưng s ≠ 0.

---

## 2. Vận tốc và tốc độ

### 2.1. Vận tốc trung bình — v_tb

**Vận tốc trung bình** là **độ dịch chuyển chia cho thời gian**:

```
v_tb = Δx / Δt
```

💡 **Ý nghĩa**: vận tốc trung bình cho biết "trung bình mỗi giây vật dịch chuyển bao nhiêu mét theo chiều nào". Nếu Δx = +20 m sau 4 giây → v_tb = +5 m/s (đi theo chiều dương với tốc độ trung bình 5 m/s).

**Vì sao cần đại lượng này?** Vì biết vật **đã đi tới đâu** chưa đủ — ta thường muốn biết **đi nhanh hay chậm**. Vận tốc trung bình là phép đo "tốc độ trung bình có hướng" qua một quá trình.

**Đơn vị**: m/s (chuẩn SI). Cũng có km/h trong đời thường (1 m/s = 3.6 km/h).

**Có dấu**: dương = đi theo chiều dương, âm = ngược lại.

### 2.2. Vận tốc tức thời — v(t)

**Vận tốc trung bình** trên một khoảng thời gian dài có thể "che giấu" thực tế (vd: đi 100 km trong 2 giờ, nhưng nửa giờ đầu kẹt xe đứng yên!). Để biết **vận tốc đúng tại 1 khoảnh khắc** t cụ thể, ta lấy giới hạn:

```
v(t) = lim (Δt → 0) Δx/Δt = dx/dt
```

Đây là **đạo hàm của vị trí theo thời gian**.

💡 **Hình dung**: vận tốc tức thời là số trên đồng hồ tốc độ của xe **ngay lúc này** — bao gồm cả hướng (đang chạy về hướng nào).

### 2.3. Tốc độ (Speed) — |v|

**Tốc độ** = **độ lớn của vận tốc** = |v|, luôn dương. Tốc độ chỉ trả lời "đi nhanh hay chậm", không quan tâm hướng.

**Ví dụ**: xe đang chạy vận tốc **−60 km/h** (về hướng Tây, chọn Đông là dương) → tốc độ = **60 km/h**.

### 2.4. Ví dụ số cụ thể

**Ví dụ**: Một người chạy bộ từ x = 0 m đến x = +800 m hết 4 phút (240 s), rồi quay lại x = +200 m mất thêm 2 phút (120 s). Tính:

a) **Vận tốc trung bình toàn quá trình**:
- Δx = 200 − 0 = +200 m.
- Δt = 240 + 120 = 360 s.
- v_tb = 200/360 ≈ **+0.56 m/s**.

b) **Tốc độ trung bình** (quãng đường ÷ thời gian):
- s = 800 (đi) + (800−200) = 800 + 600 = 1400 m.
- Tốc độ tb = 1400/360 ≈ **3.89 m/s**.

→ Vận tốc tb (0.56) << tốc độ tb (3.89) vì người này quay lại, làm Δx nhỏ trong khi s lớn.

### ⚠ Lỗi thường gặp

- **Nhầm vận tốc và tốc độ**: Vận tốc có hướng (vector); tốc độ chỉ là số (scalar). Khi học vật lý nghiêm túc, đừng dùng lẫn lộn.
- **Quên dấu**: nếu vật đổi hướng, vận tốc đổi dấu. Δx có thể âm.
- **Lẫn đơn vị km/h và m/s**: xe "chạy 72" — 72 km/h hay 72 m/s? Khác nhau 3.6 lần! 72 km/h = 72/3.6 = **20 m/s**. Trong mọi công thức vật lý SI phải đổi về m/s trước. Phản ví dụ: tính quãng đường phanh với v = 72 (hiểu nhầm là m/s) sẽ ra kết quả sai gấp ~13 lần (vì v vào bình phương).
- **Lấy trung bình cộng vận tốc khi quãng đường bằng nhau**: đi 1 nửa đường 20 m/s, nửa sau 60 m/s → tốc độ trung bình KHÔNG phải (20+60)/2 = 40 m/s, mà là trung bình điều hòa = 2·20·60/(20+60) = **30 m/s** (vì đoạn chậm tốn nhiều thời gian hơn).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vận tốc trung bình và tốc độ trung bình khác nhau chỗ nào?"* Vận tốc trung bình = **độ dịch chuyển** / thời gian (có hướng, có thể âm hoặc 0). Tốc độ trung bình = **quãng đường** / thời gian (luôn ≥ 0). Ví dụ chạy 1 vòng về chỗ cũ: vận tốc tb = 0 (Δx=0), nhưng tốc độ tb > 0.
- *"Tại sao cần vận tốc tức thời, đã có vận tốc trung bình rồi?"* Vì trung bình "làm phẳng" mọi biến động. Đi 100 km trong 2 giờ → v_tb = 50 km/h, nhưng có thể nửa giờ đầu kẹt xe đứng yên, sau đó chạy 80 km/h. Đồng hồ tốc độ hiển thị vận tốc **tức thời** (ngay lúc đó), thứ quyết định bạn có bị bắn tốc độ hay không.
- *"v âm nghĩa là gì — đi lùi à?"* Nghĩa là đi theo **chiều âm** của trục đã chọn. Nếu chọn Đông là dương, v = −5 m/s nghĩa là đang đi về Tây với tốc độ 5 m/s. Dấu chỉ hướng, độ lớn |v| = 5 m/s là tốc độ.

🔁 **Dừng lại tự kiểm tra**

1. Đổi 90 km/h ra m/s.
2. Một xe đi 60 km về Đông trong 1 giờ, rồi 60 km về Tây trong 2 giờ. Tính vận tốc trung bình và tốc độ trung bình (km/h).

<details><summary>Đáp án</summary>

1. 90 km/h = 90/3.6 = **25 m/s**.
2. Δx = 60 − 60 = 0 km → vận tốc tb = 0/3 = **0 km/h**. Quãng đường s = 120 km, thời gian 3 h → tốc độ tb = 120/3 = **40 km/h**. Hai con số khác hẳn vì xe quay lại.

</details>

### 📝 Tóm tắt mục 2

- **Vận tốc trung bình** v_tb = Δx/Δt, có hướng.
- **Vận tốc tức thời** v(t) = dx/dt, có hướng.
- **Tốc độ** = |v|, luôn dương.
- Đơn vị: m/s.

---

## 3. Gia tốc

### 3.1. Định nghĩa

**Gia tốc** là **độ biến thiên vận tốc trên 1 đơn vị thời gian**:

```
a = Δv / Δt    (gia tốc trung bình)
a(t) = dv/dt   (gia tốc tức thời = đạo hàm vận tốc)
```

💡 **Ý nghĩa cụ thể**: gia tốc cho biết "vận tốc đang thay đổi nhanh hay chậm". Đại lượng này KHÁC vận tốc:
- **Vận tốc** = vật đang đi nhanh thế nào.
- **Gia tốc** = vận tốc đang TĂNG hay GIẢM thế nào.

**Vì sao cần khái niệm này?** Vì rất nhiều hiện tượng (rơi tự do, ô tô tăng tốc/phanh, vệ tinh) đều có vận tốc thay đổi liên tục. Một con số chỉ vận tốc không đủ để mô tả — ta cần biết "vận tốc đang đổi như thế nào". Đó là gia tốc.

**Đơn vị**: m/s² (mét trên giây bình phương).

**Có dấu**:
- a cùng chiều với v → vật **tăng tốc**.
- a ngược chiều với v → vật **giảm tốc (đang phanh)**.

### 3.2. Ví dụ trực giác

**Ví dụ 1 — Xe tăng tốc**: Xe đứng yên (v = 0), sau 5 giây đạt v = 20 m/s.
- a = Δv/Δt = (20 − 0)/5 = **+4 m/s²**.
- Mỗi giây vận tốc tăng 4 m/s.

**Ví dụ 2 — Xe phanh**: Xe đang chạy v = 20 m/s, phanh trong 2 giây thì dừng (v = 0).
- a = (0 − 20)/2 = **−10 m/s²** (âm vì giảm tốc).
- Mỗi giây vận tốc giảm 10 m/s.

**Ví dụ 3 — Quả táo rơi**: Thả 1 quả táo, sau 1 giây v = 9.8 m/s. Sau 2 giây v = 19.6 m/s.
- a = 9.8 m/s² (= **g**, gia tốc trọng trường).
- Quả táo "tăng tốc đều" với mỗi giây nhanh hơn 9.8 m/s.

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

- *"Vật đang đứng yên (v=0) thì gia tốc chắc chắn = 0?"* Không! Ngay lúc thả một quả bóng, v = 0 nhưng a = g = 9.8 m/s² (đang bắt đầu rơi). Tương tự, vật ở điểm cao nhất khi ném lên có v = 0 nhưng a = −9.8 m/s². v và a độc lập với nhau tại 1 thời điểm.
- *"Gia tốc có thể đổi không, hay luôn là hằng?"* Đổi được. Bài này tập trung vào gia tốc **hằng** (rơi tự do, xe tăng tốc đều) vì giải được bằng 3 phương trình đơn giản ở mục 5. Thực tế a thường thay đổi (vd xe vào cua, lò xo dao động — học ở Lesson 08).
- *"m/s² nghĩa là gì — sao lại 'giây bình phương'?"* Vì gia tốc = (m/s) thay đổi mỗi giây = (m/s)/s = m/s². Đọc là "mỗi giây, vận tốc thay đổi thêm bấy nhiêu m/s". Vd a = 4 m/s²: sau 1 s vận tốc tăng 4 m/s, sau 2 s tăng 8 m/s.

🔁 **Dừng lại tự kiểm tra**

1. Xe đi với v = −12 m/s và có gia tốc a = −3 m/s². Xe đang nhanh lên hay chậm đi?
2. Xe đạp tăng từ 4 m/s lên 10 m/s trong 3 giây. Tính gia tốc.

<details><summary>Đáp án</summary>

1. a và v **cùng dấu** (cùng âm = cùng chiều) → xe **nhanh lên** (theo chiều âm). Sau 1 s, v = −15 m/s (độ lớn tăng).
2. a = Δv/Δt = (10 − 4)/3 = **2 m/s²**.

</details>

### 📝 Tóm tắt mục 3

- **Gia tốc** a = dv/dt (m/s²).
- a cùng chiều v → tăng tốc; ngược chiều → phanh.
- Ví dụ điển hình: rơi tự do có a = g = 9.8 m/s².

---

## 4. Đồ thị x-t, v-t, a-t

💡 **Trực giác / Hình dung**: hãy coi 3 đồ thị như "ba góc nhìn camera" cùng một chuyến đi. Đồ thị x-t là bản đồ GPS ghi "lúc nào ở đâu"; **độ dốc** của nó (lên dốc gắt hay thoải) cho biết đi nhanh hay chậm → đó là v-t. Tiếp tục lấy độ dốc của v-t được a-t. Đi ngược lại: **diện tích** dưới v-t cộng dồn lại cho biết đã dịch chuyển bao xa. "Độ dốc đi xuôi, diện tích đi ngược" là chìa khóa nhớ cả mục này.

### 4.1. Đồ thị x-t (Position vs Time)

Trục dọc = vị trí x, trục ngang = thời gian t.

**Ý nghĩa độ dốc (slope)** của đồ thị x-t:
```
độ dốc tại thời điểm t = dx/dt = v(t)
```

→ **Độ dốc x-t = vận tốc tức thời.**

- Đồ thị x-t là đường thẳng → vận tốc không đổi.
- Đồ thị x-t đi lên → v > 0 (đang tiến).
- Đồ thị x-t đi xuống → v < 0 (lùi).
- Đồ thị x-t dốc đứng → v lớn (nhanh).
- Đồ thị x-t cong (parabola) → vận tốc thay đổi → có gia tốc.

### 4.2. Đồ thị v-t (Velocity vs Time)

Trục dọc = vận tốc v, trục ngang = thời gian.

**Hai ý nghĩa**:
- **Độ dốc v-t = gia tốc a(t)**.
- **Diện tích dưới đường v-t = độ dịch chuyển Δx**.

(Lý do "diện tích = độ dịch chuyển": chia thời gian thành các khoảng nhỏ Δt, trong mỗi khoảng vật đi v·Δt → tổng = Σv·Δt = diện tích.)

### 4.3. Đồ thị a-t (Acceleration vs Time)

Trục dọc = a, trục ngang = t.

**Diện tích dưới a-t = Δv** (độ biến thiên vận tốc).

### 4.4. Tổng kết quan hệ

```
   x ── đạo hàm ──→ v ── đạo hàm ──→ a
       ←── tích phân ───   ←── tích phân ──
```

Hoặc dạng đồ thị:
- **Độ dốc** x-t → v; **độ dốc** v-t → a.
- **Diện tích** v-t → Δx; **diện tích** a-t → Δv.

### ⚠ Lỗi thường gặp

- **Đọc đồ thị x-t như "đường đi thật" của vật**: đồ thị x-t đi lên rồi xuống KHÔNG có nghĩa vật bay lên rồi rơi xuống — nó chỉ nghĩa vật tiến (x tăng) rồi lùi (x giảm) trên đường thẳng. Trục dọc là vị trí, không phải độ cao.
- **Lấy giá trị thay vì độ dốc**: trên đồ thị x-t, một điểm cao (x lớn) KHÔNG nghĩa là v lớn. v là **độ dốc** tại điểm đó. Vật có thể ở rất xa (x lớn) mà đứng yên (độ dốc = 0 → v = 0).
- **Quên dấu của diện tích**: phần đồ thị v-t **nằm dưới trục** (v < 0) cho diện tích **âm** (Δx âm — vật lùi lại). Phải trừ chứ không cộng phần đó.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao diện tích dưới đường v-t lại ra độ dịch chuyển — nghe chẳng liên quan?"* Vì độ dịch chuyển trong một khoảng nhỏ Δt là v·Δt — chính là diện tích của một cột mỏng chiều cao v, bề rộng Δt trên đồ thị v-t. Cộng hết các cột mỏng = tổng diện tích = tổng độ dịch chuyển. Ví dụ: chạy đều v = 5 m/s trong 4 s → diện tích = hình chữ nhật 5 × 4 = **20 m** = Δx.
- *"Đồ thị x-t cong (parabola) nghĩa là gì?"* Nghĩa là độ dốc (v) đang thay đổi → vật có gia tốc. Parabola mở lên (cong úp xuống dần dốc hơn) là a > 0; cong xuống là a < 0. Đường **thẳng** mới là v không đổi (a = 0).
- *"Nếu chỉ có đồ thị a-t, lấy lại x được không?"* Được nhưng cần thêm điều kiện đầu. Diện tích a-t cho Δv, nhưng phải biết v₀ để ra v(t); rồi diện tích v-t cho Δx, phải biết x₀ để ra x(t). Thiếu v₀, x₀ thì chỉ biết "thay đổi" chứ không biết giá trị tuyệt đối.

🔁 **Dừng lại tự kiểm tra**

1. Đồ thị v-t là đường nằm ngang ở v = 6 m/s từ t = 0 đến t = 5 s. Vật đi được bao xa? Gia tốc bằng bao nhiêu?
2. Đồ thị x-t là đường thẳng đi xuống. Vận tốc dương hay âm? Gia tốc bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Diện tích (hình chữ nhật) = 6 × 5 = **30 m** = Δx. Đường nằm ngang → độ dốc = 0 → **a = 0**.
2. Đường thẳng **đi xuống** → độ dốc âm → **v < 0** (vật lùi). Đường thẳng → độ dốc không đổi → **a = 0**.

</details>

### 📝 Tóm tắt mục 4

3 đồ thị x-t, v-t, a-t liên hệ qua đạo hàm (độ dốc) và tích phân (diện tích).

---

## 5. Ba phương trình chuyển động thẳng biến đổi đều

💡 **Trực giác / Hình dung**: coi 3 phương trình như "3 công thức nấu ăn" cho cùng một nguyên liệu (v₀, a, t, x, v). Mỗi công thức bỏ ra một nguyên liệu khác nhau: (1) không có x, (2) không có v, (3) không có t. Khi giải bài, nhìn xem đề **không cho/không hỏi** đại lượng nào → chọn công thức thiếu đúng đại lượng đó. Không cần học thuộc cả ba một cách rời rạc — chúng đều suy ra từ định nghĩa "v = v₀ + at" cộng với "lấy trung bình".

Khi gia tốc **không đổi** (vd rơi tự do, xe tăng tốc đều), có 3 phương trình quan trọng (chứng minh bên dưới):

```
(1)  v = v₀ + a·t                  (vận tốc theo thời gian)
(2)  x = x₀ + v₀·t + (1/2)·a·t²    (vị trí theo thời gian)
(3)  v² = v₀² + 2·a·(x − x₀)       (vận tốc theo vị trí, không có t)
```

Trong đó:
- x₀, v₀ = vị trí và vận tốc tại t = 0.
- x, v = tại thời điểm t.
- a = gia tốc (hằng số).

### 5.1. Chứng minh

**Phương trình (1)**: a hằng, lấy tích phân:
```
v(t) = v₀ + ∫₀ᵗ a · dt' = v₀ + a·t
```

**Phương trình (2)**: tích phân v:
```
x(t) = x₀ + ∫₀ᵗ v · dt' = x₀ + ∫₀ᵗ (v₀ + a·t') dt' = x₀ + v₀·t + (1/2)·a·t²
```

**Phương trình (3)**: từ (1), t = (v − v₀)/a. Thay vào (2):
```
x − x₀ = v₀·(v − v₀)/a + (1/2)·a·[(v − v₀)/a]²
       = (v₀·v − v₀²)/a + (v − v₀)²/(2a)
       = ...
→ v² = v₀² + 2·a·(x − x₀)
```

### 5.2. Walk-through 2 ví dụ

**Ví dụ 1 — Xe tăng tốc**: Xe khởi hành từ điểm A (x₀ = 0), gia tốc đều a = 2 m/s². Tính:

a) Vận tốc sau 5 giây?
- Áp (1): v = 0 + 2·5 = **10 m/s**.

b) Quãng đường đi sau 5 giây?
- Áp (2): x = 0 + 0·5 + 0.5·2·25 = **25 m**.

c) Khi v = 20 m/s, xe đã đi được bao xa?
- Áp (3): 20² = 0² + 2·2·(x − 0) → x = 400/4 = **100 m**.

**Ví dụ 2 — Xe phanh**: Xe chạy v₀ = 30 m/s, phanh với a = −6 m/s². Tính quãng đường phanh đến khi dừng.

- Dừng → v = 0. Áp (3): 0² = 30² + 2·(−6)·Δx → Δx = 900/12 = **75 m**.

### ⚠ Lỗi thường gặp

- **Dùng 3 phương trình khi a KHÔNG hằng**: chúng CHỈ đúng cho gia tốc không đổi. Xe vào cua, lò xo dao động, sức cản không khí đáng kể → a thay đổi → ba phương trình này SAI. Phải kiểm tra "a có hằng không?" trước khi dùng.
- **Sai dấu của a khi phanh**: xe chạy chiều dương phanh thì a phải **âm** (ngược chiều v). Quên dấu âm → tính ra "quãng đường phanh âm" vô lý. Phản ví dụ: v₀=30, a=+6 (quên dấu), phương trình (3): 0 = 900 + 12·Δx → Δx = −75 m (vô nghĩa).
- **Quên đổi km/h sang m/s**: thay v₀ = 72 (km/h) trực tiếp vào công thức SI → kết quả sai. Đổi 72 km/h = 20 m/s trước.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Làm sao biết chọn phương trình nào?"* Liệt kê 5 đại lượng v₀, v, a, t, và Δx = x−x₀. Đề thường cho 3, hỏi 1. Đại lượng còn lại (không cho, không hỏi) cho biết bỏ phương trình nào: thiếu x → (1); thiếu v → (2); thiếu t → (3).
- *"Phương trình (3) khác (1),(2) ở chỗ nào?"* (3) không chứa t — dùng khi đề không cho và không hỏi thời gian (vd "tính quãng đường phanh đến khi dừng"). Nếu dùng (1),(2) phải giải qua 2 bước (tìm t trước), còn (3) ra thẳng.
- *"Hệ số 1/2 trong x = x₀+v₀t+½at² ở đâu ra?"* Vì trong thời gian t, vận tốc tăng đều từ v₀ đến v₀+at, **trung bình** = v₀ + ½at. Quãng đường = vận tốc trung bình × t = v₀t + ½at². Đó là lý do có ½ — nó là trung bình của phần tăng tốc.

🔁 **Dừng lại tự kiểm tra**

1. Xe đứng yên (v₀=0) tăng tốc a = 2 m/s². Sau bao lâu đạt 30 m/s, và đã đi bao xa lúc đó?
2. Xe chạy 40 m/s phanh với a = −8 m/s². Quãng đường phanh đến khi dừng?

<details><summary>Đáp án</summary>

1. (1): 30 = 0 + 2t → t = **15 s**. (2): x = 0 + 0 + ½·2·15² = **225 m** (hoặc dùng (3): 30² = 2·2·x → x = 225 m).
2. Không hỏi t → dùng (3): 0² = 40² + 2·(−8)·Δx → Δx = 1600/16 = **100 m**.

</details>

### 📝 Tóm tắt mục 5

3 phương trình cho chuyển động a hằng. Chọn phương trình theo cái nào "cho-tìm" gọn nhất:
- Cho t → tìm v: (1).
- Cho t → tìm x: (2).
- KHÔNG có t, biết v₀, v, x: (3).

---

## 6. Rơi tự do

### 6.1. Khái niệm

**Rơi tự do** = chuyển động chỉ do **lực hấp dẫn** (bỏ qua sức cản không khí). Mọi vật, không kể khối lượng, đều rơi với cùng **gia tốc trọng trường g**:

```
g ≈ 9.8 m/s²  (gần mặt đất)
```

(Mặt trăng: g ≈ 1.6 m/s². Sao Hỏa: g ≈ 3.7 m/s². Bài này chỉ Trái Đất.)

💡 **Hiểu lầm phổ biến**: "lông và sắt cùng rơi cùng tốc độ" — đúng trong **chân không**, nhưng trong không khí lông rơi chậm vì sức cản không khí lớn hơn lực hấp dẫn so với trọng lượng.

### 6.2. Áp dụng 3 phương trình

Với rơi tự do, chọn trục y dương hướng lên (theo quy ước phổ biến) → a = −g = −9.8 m/s².

**Ví dụ — Thả vật từ độ cao 20 m**:

a) Vận tốc khi chạm đất?
- Áp (3): v² = 0 + 2·(−9.8)·(0 − 20) = 392 → v = ±19.8 m/s. Lấy v = −19.8 m/s (đi xuống).
- Tốc độ chạm đất: **19.8 m/s** ≈ 71.3 km/h.

b) Thời gian rơi?
- Áp (1): −19.8 = 0 + (−9.8)·t → t = **2.02 giây**.

c) Cùng độ cao 20 m, nếu ném xuống với v₀ = 5 m/s thì thời gian rơi?
- Áp (2): 0 = 20 + (−5)·t + 0.5·(−9.8)·t² → 4.9t² + 5t − 20 = 0.
- t = (−5 + √(25 + 392))/9.8 = (−5 + 20.42)/9.8 ≈ **1.57 giây** (nhanh hơn).

### ⚠ Lỗi thường gặp

- **Nghĩ vật nặng rơi nhanh hơn**: trong chân không, lông và búa rơi **cùng tốc độ** (đã được chứng minh trên Mặt Trăng, Apollo 15). Khối lượng m không vào kết quả vì a = F/m = mg/m = g (m tự triệt tiêu). Trong không khí thật, lông chậm hơn chỉ vì **sức cản**, không phải vì nhẹ.
- **Lẫn dấu của g**: nếu chọn trục y dương hướng **lên**, thì a = **−9.8** m/s² (gia tốc hướng xuống). Quên dấu âm → vật "rơi lên trời". Nếu chọn y dương hướng xuống thì a = +9.8 — phải nhất quán suốt bài.
- **Quên rằng vật ném lên vẫn có a = g suốt**: khi ném vật lên, ở điểm cao nhất v = 0 nhưng a vẫn = −9.8 m/s² (không phải 0). Gia tốc do trọng lực không bao giờ tắt khi vật còn trong không khí.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Thời gian rơi có phụ thuộc khối lượng không?"* Không (bỏ qua sức cản). Từ h = ½gt² → t = √(2h/g), không có m. Hòn đá 1 kg và 10 kg thả cùng độ cao chạm đất cùng lúc.
- *"Vì sao ném xuống với v₀=5 m/s lại rơi nhanh hơn (1.57 s so với 2.02 s)?"* Vì vật đã có sẵn vận tốc hướng xuống ngay từ đầu, cộng thêm vào vận tốc do trọng lực — nên đi hết quãng đường nhanh hơn so với thả nhẹ (v₀ = 0).
- *"g = 9.8 hay 10 m/s²?"* Giá trị chính xác gần mặt biển ≈ 9.81 m/s². Nhiều bài làm tròn 10 m/s² cho dễ tính. Bài này dùng 9.8. Khác nhau ~2%, không ảnh hưởng ý nghĩa.

🔁 **Dừng lại tự kiểm tra**

1. Thả một vật từ độ cao 5 m (v₀=0). Thời gian rơi? (dùng g = 9.8)
2. Một vật được ném thẳng lên với v₀ = 19.6 m/s. Bao lâu thì nó đạt điểm cao nhất?

<details><summary>Đáp án</summary>

1. h = ½gt² → 5 = ½·9.8·t² → t² = 1.02 → t ≈ **1.01 s**.
2. Tại điểm cao nhất v = 0. (1) với a = −9.8: 0 = 19.6 + (−9.8)t → t = **2 s**.

</details>

### 📝 Tóm tắt mục 6

- Rơi tự do: a = g = 9.8 m/s² (xuống).
- Mọi vật rơi cùng tốc độ trong chân không.
- Áp 3 phương trình với a = −g (chọn y dương lên).

---

## 7. Chuyển động 2 chiều — Ném ngang

💡 **Trực giác / Hình dung**: tưởng tượng cùng lúc bạn **thả** một viên bi từ tay (rơi thẳng xuống) và **bắn ngang** một viên khác từ cùng độ cao. Cả hai chạm đất **cùng một lúc**! Vì trục dọc (rơi) không "biết" gì về trục ngang (bay). Chuyển động 2D = ghép hai chuyển động 1D độc lập: ngang thì đều như xe chạy thẳng, dọc thì rơi tự do như thả bi. Giải riêng từng trục rồi ghép lại.

### 7.1. Nguyên lý độc lập

Trong chuyển động 2D, **mỗi trục độc lập nhau**:
- Trục ngang (x): vận tốc không đổi (không có lực ngang) → chuyển động đều, x = v_x·t.
- Trục dọc (y): chỉ chịu lực hấp dẫn → rơi tự do, y = y₀ − (1/2)·g·t².

### 7.2. Ví dụ — Ném ngang từ vách núi

Một viên đá được ném ngang với vận tốc đầu v₀ = 15 m/s từ vách núi cao h = 45 m. Tính:

a) **Thời gian rơi**:
- Trục dọc: 0 = 45 − 0.5·9.8·t² → t² = 45/4.9 ≈ 9.18 → t ≈ **3.03 giây**.

b) **Khoảng cách ngang khi chạm đất**:
- Trục ngang: x = 15 × 3.03 = **45.5 m**.

c) **Tốc độ chạm đất** (cả 2 thành phần):
- v_x = 15 m/s (không đổi).
- v_y = 0 − 9.8 × 3.03 ≈ −29.7 m/s.
- |v| = √(15² + 29.7²) = √(225 + 882) ≈ **33.3 m/s**.

### ⚠ Lỗi thường gặp

- **Trộn lẫn vận tốc 2 trục vào một phương trình**: trục ngang dùng x = v_x·t (a=0); trục dọc dùng rơi tự do (a=g). KHÔNG được dùng v₀ = 15 m/s (ngang) trong phương trình rơi của trục dọc. Hai trục giải riêng.
- **Nghĩ vận tốc ngang ảnh hưởng thời gian rơi**: SAI. Thời gian rơi chỉ phụ thuộc độ cao h và g: t = √(2h/g). Bắn ngang 15 m/s hay 150 m/s từ cùng vách núi đều **rơi hết cùng thời gian**, chỉ bay xa khác nhau.
- **Cộng tốc độ 2 trục bằng phép cộng thường**: tốc độ chạm đất KHÔNG phải v_x + v_y = 15 + 29.7 = 44.7 m/s. Phải dùng **Pytago** (vì là vector vuông góc): |v| = √(v_x² + v_y²) = 33.3 m/s.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao bắn ngang và thả rơi lại chạm đất cùng lúc?"* Vì trọng lực chỉ tác dụng theo phương dọc, kéo cả hai xuống với cùng a = g. Vận tốc ngang không tạo và không làm chậm chuyển động dọc. Trục dọc của cả hai giống hệt nhau → cùng thời gian rơi.
- *"Quỹ đạo ném ngang có hình gì?"* Hình **parabola**. Vì x = v_x·t (tỉ lệ với t) còn y giảm theo t² → kết hợp ra y là hàm bậc 2 của x → parabola.
- *"Nếu ném xiên (góc lên) thì sao?"* Tách v₀ thành v_x = v₀cosθ (ngang, đều) và v_y = v₀sinθ (dọc, chịu trọng lực). Cùng nguyên lý độc lập, chỉ khác là trục dọc có vận tốc đầu hướng lên.

🔁 **Dừng lại tự kiểm tra**

1. Bi ném ngang v₀ = 8 m/s từ độ cao 20 m. Bao lâu chạm đất? Bay xa bao nhiêu theo phương ngang? (g=9.8)
2. Hai viên bi từ cùng độ cao: A thả rơi, B bắn ngang 30 m/s. Viên nào chạm đất trước?

<details><summary>Đáp án</summary>

1. Trục dọc: 20 = ½·9.8·t² → t² = 4.08 → t ≈ **2.02 s**. Trục ngang: x = 8 × 2.02 ≈ **16.2 m**.
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

**Bài 1**: Vận tốc không đổi → a = 0. Áp (2): x = 5 + 10·8 + 0 = **85 m**.

**Bài 2**:
- a) Δx = 3 − 1 = +2 km = +2000 m. Δt = 20 phút = 1200 s. v_tb = 2000/1200 ≈ **+1.67 m/s** (về phía Đông).
- b) Quãng đường s = 3 + 1 = 4 km = 4000 m. Tốc độ tb = 4000/1200 ≈ **3.33 m/s**.

**Bài 3**:
- a) v = 0 + 3·10 = **30 m/s**.
- b) x = 0·10 + 0.5·3·100 = **150 m**.

**Bài 4**:
- a) Dùng (2) với y₀ = 80, v₀ = 0, a = −9.8: 0 = 80 + 0 − 4.9·t² → t² = 16.33 → t ≈ **4.04 giây**.
- b) v = 0 − 9.8·4.04 = −39.6 m/s → tốc độ ≈ **39.6 m/s** ≈ 143 km/h.

**Bài 5**: Áp (3): 0 = 25² + 2·a·50 → a = −625/100 = **−6.25 m/s²**. Cần phanh ít nhất 6.25 m/s².

**Bài 6**:
- Thời gian rơi: t = √(2·20/9.8) = √4.08 ≈ 2.02 s.
- Khoảng cách ngang: x = 10·2.02 = **20.2 m**.

---

## 9. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) — vì sao vật có gia tốc? Câu trả lời: F = m·a.
- **Liên kết Math**: đạo hàm (slope) và tích phân (diện tích) — sẽ học chi tiết ở [`Math/04-Calculus-1var/lesson-03,07`](../../../Math/04-Calculus-1var/) (chưa triển khai).

---

## 📝 Tổng kết Lesson 01

1. **Vị trí x**: tọa độ vật so với gốc. **Độ dịch chuyển Δx**: vị trí cuối − đầu (có dấu). **Quãng đường s**: tổng đường đi (luôn dương).
2. **Vận tốc v** = Δx/Δt = dx/dt (có hướng). **Tốc độ** = |v|.
3. **Gia tốc a** = Δv/Δt = dv/dt. Cùng chiều v → tăng tốc; ngược chiều → phanh.
4. **3 đồ thị x-t, v-t, a-t** liên hệ qua slope/diện tích.
5. **3 phương trình chuyển động đều (a hằng)**:
   - v = v₀ + at
   - x = x₀ + v₀t + (1/2)at²
   - v² = v₀² + 2a(x − x₀)
6. **Rơi tự do**: a = g ≈ 9.8 m/s². Áp 3 phương trình với a = −g.
7. **Chuyển động 2D**: 2 trục độc lập (ngang đều + dọc rơi tự do).

**Tiếp theo**: [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/)
