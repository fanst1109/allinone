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

### 📝 Tóm tắt mục 3

- **Gia tốc** a = dv/dt (m/s²).
- a cùng chiều v → tăng tốc; ngược chiều → phanh.
- Ví dụ điển hình: rơi tự do có a = g = 9.8 m/s².

---

## 4. Đồ thị x-t, v-t, a-t

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

### 📝 Tóm tắt mục 4

3 đồ thị x-t, v-t, a-t liên hệ qua đạo hàm (độ dốc) và tích phân (diện tích).

---

## 5. Ba phương trình chuyển động thẳng biến đổi đều

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

### 📝 Tóm tắt mục 6

- Rơi tự do: a = g = 9.8 m/s² (xuống).
- Mọi vật rơi cùng tốc độ trong chân không.
- Áp 3 phương trình với a = −g (chọn y dương lên).

---

## 7. Chuyển động 2 chiều — Ném ngang

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
