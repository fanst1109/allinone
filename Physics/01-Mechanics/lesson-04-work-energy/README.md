# Lesson 04 — Công & Năng lượng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **công cơ học** $W = F\cdot d\cdot\cos(\theta)$ — không phải lực cũng không phải khoảng cách, mà là cách lực "chuyển" năng lượng vào hệ.
- Phân biệt 2 dạng năng lượng cơ bản: **động năng (KE)** và **thế năng (PE)**.
- Biết **định lý động năng-công**: tổng công $= \Delta KE$.
- Áp dụng **định luật bảo toàn năng lượng** cho các bài toán cơ học (con lắc, vật trượt mặt nghiêng, lò xo).
- Hiểu **công suất (P)** = năng lượng/thời gian $= F\cdot v$, đơn vị Watt.

## Kiến thức tiền đề

- [Lesson 02 — 3 định luật Newton](../lesson-02-newton-laws/) và [Lesson 03 — Các loại lực](../lesson-03-forces/).

---

## 1. Công cơ học

### 1.1. Định nghĩa

**Công cơ học** W = lượng năng lượng được chuyển bởi một lực khi vật dịch chuyển:

$$W = F \cdot d \cdot \cos(\theta)$$

trong đó:
- **$F$** = độ lớn lực (N).
- **$d$** = độ dịch chuyển (m).
- **$\theta$** = góc giữa $F$ và $d$.

Đơn vị: **Joule (J)**. $1\ \text{J} = 1\ \text{N}\cdot\text{m}$.

💡 **Ý nghĩa cụ thể**: công là "ai làm gì cho ai". Khi bạn nâng quả tạ lên cao, **bạn làm công lên tạ** = năng lượng được chuyển từ cơ bắp bạn sang tạ (dưới dạng thế năng).

**Vì sao cần khái niệm này (mà không chỉ dùng lực hoặc khoảng cách)?** Vì:
- Đẩy tường với F = 1000 N nhưng tường không di chuyển → **không có công**, không tiêu hao năng lượng cơ học (mặc dù cơ bắp mỏi vì lý do sinh học khác).
- Mang tạ đi ngang qua sàn (lực nâng vuông góc chuyển động) → **không có công** (lực ⊥ d).
- Chỉ khi **lực có thành phần dọc theo chiều chuyển động**, công mới được sinh ra.

Đó là lý do có cos(θ): chỉ lấy phần lực **dọc** chuyển động.

### 1.2. Phân tích cos(θ) — 4 trường hợp

| $\theta$ | $\cos(\theta)$ | $W$ | Ý nghĩa |
|---|--------|---|----------|
| 0° | 1 | $F\cdot d$ (max) | Lực cùng chiều chuyển động: dồn toàn lực vào việc tăng tốc |
| 90° | 0 | 0 | Lực vuông góc chuyển động: không công |
| 180° | −1 | $-F\cdot d$ | Lực ngược chiều: lấy năng lượng đi (vd ma sát) |
| 60° | 0,5 | $F\cdot d/2$ | Một nửa lực có ích |

### 1.3. Bốn ví dụ số

**Ví dụ 1 — Đẩy hộp 50 N đi 10 m cùng chiều**:
- $W = 50 \times 10 \times \cos(0^\circ) = $ **500 J**.

**Ví dụ 2 — Mang vali nặng 100 N đi ngang 20 m**:
- Lực nâng (lên) $\perp$ chuyển động (ngang) $\to \theta = 90^\circ \to W = $ **0 J**.
- Cảm giác mệt vì cơ bắp dùng ATP (sinh học), nhưng cơ học không có công.

**Ví dụ 3 — Kéo xe đẩy với dây nghiêng 30° so với mặt đất, F = 100 N, đi 5 m**:
- $W = 100 \times 5 \times \cos(30^\circ) = 100 \times 5 \times 0{,}866 = $ **433 J**.

**Ví dụ 4 — Ma sát chống chuyển động**: hộp trượt 10 m, $f_k = 20$ N (ngược chiều chuyển động).
- $W_{\text{ma sát}} = 20 \times 10 \times \cos(180^\circ) = $ **−200 J**.
- Năng lượng này biến thành nhiệt — không lấy lại được.

### ⚠ Lỗi thường gặp

- **Nghĩ "có lực + có mệt = có công"**: đẩy tường đứng yên với 1000 N → W = 0 (vì d = 0), dù cơ bắp mỏi. Công cơ học cần **dịch chuyển theo hướng lực**. Cảm giác mệt là sinh học, khác công vật lý.
- **Quên cos(θ) khi lực không cùng chiều chuyển động**: kéo vali bằng dây nghiêng 30° $\to$ chỉ thành phần ngang sinh công. Phản ví dụ: $F=100$ N, $d=5$ m, nếu quên cos thì $W = 500$ J, đúng phải là $100\cdot 5\cdot\cos 30^\circ = 433$ J.
- **Bỏ qua dấu âm của công cản**: ma sát ngược chiều → W < 0 (lấy năng lượng đi). Cộng nhầm thành dương → sai cân bằng năng lượng.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Mang vali đi ngang 100 m mà bảo công = 0 — vô lý, tôi mệt thật mà?"* Công cơ học = 0 vì lực nâng (thẳng đứng) vuông góc với chuyển động (ngang). Cơ thể bạn tốn năng lượng sinh học (giữ cơ căng liên tục) nhưng không "chuyển năng lượng vào vali" theo nghĩa cơ học. Hai khái niệm khác nhau.
- *"Công âm nghĩa là gì?"* Nghĩa là lực **lấy năng lượng ra** khỏi vật thay vì cho vào. Ma sát làm công âm → biến động năng thành nhiệt. Trọng lực làm công âm khi vật đi lên (lấy động năng, tích thành thế năng).
- *"Joule lớn hay nhỏ?"* 1 J khá nhỏ: nâng quả táo 100 g lên 1 m tốn ~1 J. Một thanh sô-cô-la chứa $\sim 10^6$ J (1 MJ). Đun sôi 1 lít nước $\sim 3\times 10^5$ J.

🔁 **Dừng lại tự kiểm tra**

1. Đẩy hộp 40 N đi 6 m theo đúng chiều lực. Công bằng bao nhiêu?
2. Kéo xe bằng dây nghiêng 60° so với mặt đất, $F = 50$ N, đi 10 m. Công bằng bao nhiêu? ($\cos 60^\circ = 0{,}5$)

<details><summary>Đáp án</summary>

1. $W = 40\cdot 6\cdot\cos 0^\circ = $ **240 J**.
2. $W = 50\cdot 10\cdot\cos 60^\circ = 50\cdot 10\cdot 0{,}5 = $ **250 J** (chỉ thành phần ngang của lực sinh công).

</details>

### 📝 Tóm tắt mục 1

- $W = F\cdot d\cdot\cos(\theta)$, đơn vị J.
- Lực $\perp$ chuyển động $\to W = 0$.
- Lực ngược chiều $\to W < 0$ (lấy năng lượng).

---

## 2. Động năng (Kinetic Energy)

### 2.1. Định nghĩa

**Động năng KE** = năng lượng do vật **chuyển động** mà có:

$$KE = \frac{1}{2} \cdot m \cdot v^2$$

Đơn vị: J.

💡 **Ý nghĩa cụ thể**: KE đo "khả năng làm công" của một vật đang chuyển động. Vật càng nhanh, càng nặng → "đập" càng mạnh, gây tác hại càng lớn (lý do tốc độ ô tô càng cao thì tai nạn càng kinh hoàng).

**Vì sao công thức là $\frac{1}{2}\cdot m\cdot v^2$ và không phải $m\cdot v$?**

**Chứng minh**: từ định luật II và phương trình chuyển động.

Vật khối lượng $m$, lực $F$ không đổi tác dụng $\to$ gia tốc $a = \frac{F}{m}$. Từ $v^2 = v_0^2 + 2\cdot a\cdot d$:
- $a\cdot d = \frac{v^2 - v_0^2}{2}$.
- $F\cdot d = m\cdot a\cdot d = m\cdot\frac{v^2 - v_0^2}{2} = \frac{1}{2}mv^2 - \frac{1}{2}m\cdot v_0^2$.

Vế trái = công $W$. Vế phải = thay đổi của "đại lượng" $\frac{1}{2}mv^2$. Đó là động năng KE.

→ **Định lý động năng-công**: $W_{\text{tổng}} = \Delta KE = \frac{1}{2}mv^2 - \frac{1}{2}mv_0^2$.

### 2.2. Bốn ví dụ số

**Ví dụ 1 — Ô tô 1000 kg chạy 20 m/s**: $KE = 0{,}5 \times 1000 \times 400 = $ **200 000 J = 200 kJ**.

**Ví dụ 2 — Cùng ô tô chạy 40 m/s** (gấp đôi vận tốc): $KE = 0{,}5 \times 1000 \times 1600 = $ **800 kJ** (gấp 4 lần, không phải gấp 2!).

→ **Bài học**: tốc độ tăng 2× → động năng tăng 4× → tai nạn ở 80 km/h gây hại gấp 4 lần ở 40 km/h.

**Ví dụ 3 — Viên đạn 10 g bay 800 m/s**: $KE = 0{,}5 \times 0{,}01 \times 640000 = $ **3 200 J**. Đủ để làm hư hại nghiêm trọng.

**Ví dụ 4 — Vận động viên 60 kg chạy 10 m/s**: $KE = 0{,}5 \times 60 \times 100 = $ **3 000 J**. Khoảng tương đương viên đạn (về năng lượng — nhưng do diện tích tiếp xúc khác nhau, viên đạn nguy hiểm hơn vì áp suất cục bộ).

### ⚠ Lỗi thường gặp

- **Nghĩ động năng tỉ lệ thuận với vận tốc**: $KE \propto v^2$ chứ không phải $v$. Tốc độ gấp đôi $\to$ KE gấp **4 lần**, không phải gấp 2. Đây là lý do tai nạn ở tốc độ cao tàn khốc hơn nhiều.
- **Quên ½ trong công thức**: $KE = \frac{1}{2}mv^2$, không phải $mv^2$ (đó là động lượng nhân $v$). Phản ví dụ: $m=2$, $v=10 \to KE = \frac{1}{2}\cdot 2\cdot 100 = 100$ J, KHÔNG phải 200 J.
- **Cho KE có dấu hoặc hướng**: KE là **scalar**, luôn $\geq 0$ (vì $v^2\geq 0$). Vật đi chiều âm $v=-5$ vẫn có $KE = \frac{1}{2}m\cdot 25 > 0$.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao công thức là $\frac{1}{2}mv^2$ mà không phải $mv$?"* Vì nó suy ra từ $F\cdot d = \frac{1}{2}mv^2 - \frac{1}{2}mv_0^2$ (chứng minh trên, dùng $v^2 = v_0^2+2ad$). Đại lượng "công làm tăng" chính là $\frac{1}{2}mv^2$. $mv$ là động lượng — đại lượng khác (Lesson 05).
- *"KE và động lượng khác nhau thế nào — đều liên quan m và v mà?"* $KE = \frac{1}{2}mv^2$ (scalar, $\propto v^2$) đo "năng lượng/khả năng sinh công"; động lượng $p = mv$ (vector, $\propto v$) đo "đà/khả năng đẩy". Trong va chạm, $p$ luôn bảo toàn còn KE có thể mất (Lesson 05).
- *"Định lý động năng-công dùng để làm gì?"* Tính nhanh vận tốc/quãng đường mà không cần biết thời gian: tổng công = thay đổi KE. Vd biết lực và quãng đường $\to$ ra vận tốc cuối ngay.

🔁 **Dừng lại tự kiểm tra**

1. Ô tô 1200 kg chạy 10 m/s. Động năng? Nếu tăng lên 30 m/s thì KE gấp mấy lần?
2. Hợp lực 100 N tác dụng lên vật 5 kg (ban đầu đứng yên) trong quãng đường 4 m. Vận tốc cuối? (dùng định lý KE-công)

<details><summary>Đáp án</summary>

1. $KE = \frac{1}{2}\cdot 1200\cdot 100 = $ **60 000 J = 60 kJ**. $v$ gấp 3 $\to$ KE gấp $3^2 = $ **9 lần** ($= 540$ kJ).
2. $W = F\cdot d = 100\cdot 4 = 400$ J $= \frac{1}{2}\cdot 5\cdot v^2 \to v^2 = 160 \to v = $ **12,6 m/s**.

</details>

### 📝 Tóm tắt mục 2

- $KE = \frac{1}{2}mv^2$, chỉ phụ thuộc $m$ và $|v|$ (không hướng).
- Định lý động năng-công: $W = \Delta KE$.

---

## 3. Thế năng (Potential Energy)

### 3.1. Thế năng hấp dẫn

**Thế năng hấp dẫn PE_grav** = năng lượng "tích lũy" khi vật ở **độ cao** h so với điểm gốc:

$$PE_{\text{grav}} = m \cdot g \cdot h$$

💡 **Ý nghĩa**: thế năng là "tiềm năng" — không tỏ ra ngay, nhưng sẵn sàng biến thành động năng khi vật rơi.

**Vì sao tỉ lệ thuận với h?** Vì để nâng vật lên cao $h$, phải làm công chống trọng lực $= F\cdot d = m\cdot g\cdot h$. Công này không mất — nó "đọng lại" trong vật dưới dạng PE.

**Lưu ý**: PE là **tương đối** — phải chọn điểm gốc. Vật ở "cao 5 m so với sàn" hay "cao 105 m so với đáy hầm" — đều cùng vật, nhưng PE khác nhau tùy gốc chọn. Chỉ **biến thiên $\Delta PE$** mới có ý nghĩa vật lý (= công mà trọng lực sẽ làm).

### 3.2. Thế năng đàn hồi

**Thế năng đàn hồi PE_đh** = năng lượng tích lũy khi lò xo bị biến dạng x từ vị trí cân bằng:

$$PE_{đh} = \frac{1}{2} \cdot k \cdot x^2$$

**Chứng minh**: Lực đàn hồi $F = k\cdot x$ (lấy độ lớn). Công để kéo lò xo từ 0 đến $x$: $\int_0^x k\cdot x'\, dx' = \frac{1}{2}\cdot k\cdot x^2$.

### 3.3. Ba ví dụ số

**Ví dụ 1**: Nâng vali 5 kg lên 1,5 m. $PE_{\text{grav}} = 5 \times 9{,}8 \times 1{,}5 = $ **73,5 J**.

**Ví dụ 2**: Lò xo $k = 200$ N/m nén 0,1 m. $PE_{đh} = 0{,}5 \times 200 \times 0{,}01 = $ **1 J**.

**Ví dụ 3**: Nước trên thác cao 30 m, 1 kg. $PE_{\text{grav}} = 1 \times 9{,}8 \times 30 = $ **294 J**. Khi nước rơi xuống đáy, năng lượng này chuyển thành KE và nhiệt.

### ⚠ Lỗi thường gặp

- **Quên chọn gốc thế năng**: $PE_{\text{grav}} = mgh$ chỉ có nghĩa khi đã chọn mốc $h = 0$. Cùng vật, chọn gốc khác $\to$ PE khác. Chỉ **$\Delta PE$** (chênh lệch) mới có ý nghĩa vật lý, nên gốc chọn ở đâu không ảnh hưởng kết quả cuối.
- **Lẫn h với quãng đường đi**: trong $mgh$, $h$ là **độ cao thẳng đứng**, không phải quãng đường dọc mặt nghiêng. Vật trượt 10 m trên dốc 30° chỉ lên/xuống $h = 10\cdot\sin 30^\circ = 5$ m.
- **Quên ½ và bình phương trong PE đàn hồi**: $PE_{đh} = \frac{1}{2}kx^2$, không phải $kx$. Phản ví dụ: $k=200$, $x=0{,}1 \to \frac{1}{2}\cdot 200\cdot 0{,}01 = 1$ J, KHÔNG phải $200\cdot 0{,}1 = 20$ J.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Thế năng 'tích' ở đâu — trong vật à?"* Không nằm trong một chỗ cụ thể của vật; nó nằm trong **cấu hình của hệ** (vật + Trái Đất, hoặc lò xo bị nén). Đó là "năng lượng tiềm tàng" do vị trí/biến dạng, sẵn sàng chuyển thành KE khi được thả.
- *"PE có thể âm không?"* Có, nếu chọn gốc cao hơn vị trí vật. Vd chọn gốc tại mặt bàn, vật dưới sàn (thấp hơn) có $h < 0 \to PE < 0$. Điều này hợp lệ vì chỉ $\Delta PE$ quan trọng.
- *"Vì sao PE đàn hồi là $\frac{1}{2}kx^2$ mà không phải $kx\cdot x$?"* Vì khi nén lò xo, lực tăng dần từ 0 đến $kx$ (không phải hằng). Công = lực **trung bình** × quãng đường $= (\frac{1}{2}kx)\cdot x = \frac{1}{2}kx^2$. Hệ số $\frac{1}{2}$ đến từ việc lấy trung bình lực tăng tuyến tính.

🔁 **Dừng lại tự kiểm tra**

1. Nâng vật 3 kg lên cao 2 m. Thế năng hấp dẫn tăng bao nhiêu? ($g=9{,}8$)
2. Lò xo $k = 400$ N/m nén 0,05 m. Thế năng đàn hồi?

<details><summary>Đáp án</summary>

1. $\Delta PE = mgh = 3\cdot 9{,}8\cdot 2 = $ **58,8 J**.
2. $PE_{đh} = \frac{1}{2}kx^2 = \frac{1}{2}\cdot 400\cdot 0{,}05^2 = \frac{1}{2}\cdot 400\cdot 0{,}0025 = $ **0,5 J**.

</details>

### 📝 Tóm tắt mục 3

- $PE_{\text{grav}} = m\cdot g\cdot h$ (chọn gốc đặt $h = 0$).
- $PE_{đh} = \frac{1}{2}\cdot k\cdot x^2$ (gốc tại vị trí tự nhiên của lò xo).
- PE là tương đối; chỉ $\Delta PE$ có ý nghĩa.

---

## 4. Định luật bảo toàn năng lượng

### 4.1. Phát biểu

**Trong một hệ kín không có ma sát hoặc các lực không bảo toàn, tổng năng lượng cơ học (KE + PE) là HẰNG SỐ**:

$$KE_1 + PE_1 = KE_2 + PE_2 = \text{const}$$

💡 **Ý nghĩa**: năng lượng không tự tạo, không tự mất — chỉ **chuyển dạng**. Khi vật rơi: PE → KE. Khi vật lên dốc: KE → PE.

**Vì sao quan trọng?** Đây là **một trong những định luật vật lý sâu sắc nhất**. Áp dụng được cho mọi hiện tượng, không chỉ cơ học. Nếu có ma sát, một phần năng lượng cơ học biến thành **nhiệt** — nhưng tổng năng lượng (cơ học + nhiệt) vẫn bảo toàn.

### 4.2. Walk-through — Con lắc đơn

Một con lắc đơn dài 1 m kéo ra góc 30° rồi thả. Tính tốc độ ở vị trí thấp nhất.

**Phân tích bằng bảo toàn**:
- Ở vị trí cao nhất (30°): $KE = 0$ (đứng yên), $PE = m\cdot g\cdot h$.
  - $h = L - L\cdot\cos\theta = 1 - \cos(30^\circ) = 1 - 0{,}866 = 0{,}134$ m.
  - $PE_1 = m \times 9{,}8 \times 0{,}134 \approx 1{,}313\cdot m$ J.
- Ở vị trí thấp nhất: $KE = \frac{1}{2}mv^2$, $PE = 0$ (chọn gốc tại đáy).

Bảo toàn: $KE_1 + PE_1 = KE_2 + PE_2 \to 0 + 1{,}313\cdot m = \frac{1}{2}mv^2 + 0$.

→ $v = \sqrt{2 \times 1{,}313} = $ **1,62 m/s**.

(Lưu ý $m$ hủy lẫn nhau — kết quả không phụ thuộc khối lượng. Con lắc to nhỏ bằng nhau trong vacuum đều dao động cùng tốc độ ở đáy.)

### 4.3. Khi có ma sát

Nếu có ma sát, một phần năng lượng chuyển thành nhiệt:

$$KE_1 + PE_1 = KE_2 + PE_2 + Q \quad \text{(nhiệt do ma sát)}$$

trong đó $Q = |W_{\text{ma sát}}| = f_k \times d$.

### ⚠ Lỗi thường gặp

- **Áp dụng KE + PE = const khi có ma sát**: chỉ đúng khi **không** lực không bảo toàn. Có ma sát $\to$ một phần biến thành nhiệt $Q \to$ phải dùng $KE_1 + PE_1 = KE_2 + PE_2 + Q$.
- **Quên rằng kết quả độc lập khối lượng (rơi/trượt không ma sát)**: $v = \sqrt{2gh}$ không chứa $m$. Vật nặng nhẹ chạm đáy cùng tốc độ. Nhiều người nghĩ vật nặng nhanh hơn — sai.
- **Cộng năng lượng như có hướng**: năng lượng là scalar — cộng số học, không cần xét hướng (khác động lượng). Nhưng phải nhất quán gốc thế năng cho cả trước và sau.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Năng lượng 'mất' do ma sát đi đâu?"* Không thực sự mất — biến thành **nhiệt** (làm nóng bề mặt) và đôi khi âm thanh. Tổng năng lượng (cơ học + nhiệt) vẫn bảo toàn. "Mất" chỉ là mất khỏi dạng cơ học.
- *"Vì sao bảo toàn năng lượng giúp giải bài nhanh hơn dùng $F = m\cdot a$?"* Vì nó chỉ cần biết **trạng thái đầu và cuối**, bỏ qua chi tiết đường đi và thời gian. Con lắc, vật trượt dốc cong... khó tính lực từng điểm nhưng bảo toàn năng lượng cho $v$ cuối ngay.
- *"Con lắc dao động mãi không nếu bảo toàn năng lượng?"* Lý tưởng (không ma sát, không cản) thì có. Thực tế có ma sát ở trục + cản không khí → mỗi chu kỳ mất chút năng lượng thành nhiệt → biên độ giảm dần → cuối cùng dừng.

🔁 **Dừng lại tự kiểm tra**

1. Vật thả rơi từ độ cao 5 m (không cản). Tốc độ chạm đất? (dùng bảo toàn, $g=9{,}8$)
2. Xe trượt máng không ma sát từ độ cao 2 m. Nếu có ma sát làm mất 30 J và xe nặng 4 kg, tốc độ ở đáy giảm hay tăng so với không ma sát?

<details><summary>Đáp án</summary>

1. $mgh = \frac{1}{2}mv^2 \to v = \sqrt{2gh} = \sqrt{2\cdot 9{,}8\cdot 5} = \sqrt{98} \approx$ **9,9 m/s** (độc lập $m$).
2. Có ma sát $\to$ một phần PE thành nhiệt $\to$ KE ở đáy nhỏ hơn $\to$ tốc độ **giảm** so với trường hợp không ma sát. (Không ma sát: $KE = mgh = 4\cdot 9{,}8\cdot 2 = 78{,}4$ J; có ma sát: $KE = 78{,}4 - 30 = 48{,}4$ J $\to v$ nhỏ hơn.)

</details>

### 📝 Tóm tắt mục 4

- Không ma sát: $KE + PE = \text{const}$.
- Có ma sát: $KE + PE + Q = \text{const}$ (năng lượng tổng vẫn bảo toàn).

---

## 5. Công suất (Power)

### 5.1. Định nghĩa

**Công suất P** = công làm được trên đơn vị thời gian:

$$P = \frac{W}{t} = F \cdot v$$

Đơn vị: **Watt (W)**. $1\ \text{W} = 1\ \text{J/s}$.

💡 **Ý nghĩa**: công suất đo "nhanh thế nào". Cùng 100 J công, làm trong 1 giây (P = 100 W) "mạnh hơn" làm trong 10 giây (P = 10 W).

**Vì sao quan trọng?** Vì trong thực tế, ta thường quan tâm "máy này có đủ mạnh để làm việc này không" hơn là "tổng năng lượng cuối cùng". Đó là tại sao xe ô tô có chỉ số kW (= công suất động cơ), bóng đèn có công suất W.

### 5.2. Ví dụ con số

| Thiết bị | Công suất |
|----------|-----------|
| Bóng đèn LED | 5-15 W |
| Lò vi sóng | 800-1200 W |
| Máy bơm nước nhỏ | 750 W (1 HP) |
| Ô tô con (động cơ) | 100,000 W = 100 kW |
| Nhà máy điện lớn | 1,000 MW = 1 GW |

**1 HP (mã lực) $= 745{,}7$ W** (Watt định nghĩa: công suất nâng 75 kg lên 1 m trong 1 giây).

### 5.3. Walk-through

Một thang máy nâng vật 500 kg lên 20 m trong 10 giây. Tính công suất.
- $W = m\cdot g\cdot h = 500 \times 9{,}8 \times 20 = 98\,000$ J.
- $P = \frac{W}{t} = \frac{98000}{10} = $ **9 800 W = 9,8 kW** (≈ 13 HP).

### ⚠ Lỗi thường gặp

- **Lẫn công suất (W) với năng lượng (J)**: công suất là **tốc độ** dùng năng lượng, không phải lượng năng lượng. Bóng đèn 60 W dùng 60 J **mỗi giây**. "kWh" trên hóa đơn điện là **năng lượng** (công suất × thời gian), không phải công suất.
- **Lẫn ký hiệu W (công) và W (Watt)**: công W tính bằng Joule; công suất P tính bằng Watt (cũng viết tắt W). Để ý ngữ cảnh.
- **Quên P = F·v chỉ đúng khi F cùng chiều v**: tổng quát $P = F\cdot v\cdot\cos\theta$. Lực vuông góc chuyển động $\to$ công suất tức thời $= 0$.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Cùng nâng một vật lên cùng độ cao, vì sao công suất khác nhau?"* Vì công (mgh) như nhau nhưng **thời gian** khác. Nâng nhanh (t nhỏ) → P lớn; nâng chậm (t lớn) → P nhỏ. Công suất đo "làm nhanh thế nào".
- *"kWh là gì — sao đo điện lại bằng đơn vị này?"* kWh = kilowatt-giờ = năng lượng tiêu thụ khi dùng 1 kW trong 1 giờ $= 1000\ \text{W} \times 3600\ \text{s} = 3{,}6\times 10^6$ J. Nó là **năng lượng** (J), tiện hơn J vì hóa đơn điện tính theo năng lượng dùng.
- *"$P = F\cdot v$ nghĩa là gì trực giác?"* Công suất = lực × vận tốc. Xe chạy nhanh ($v$ lớn) cần công suất lớn để duy trì cùng lực kéo. Đó là vì sao xe tăng tốc ở tốc độ cao "đuối" hơn — cùng công suất, $v$ lớn thì lực còn lại nhỏ.

🔁 **Dừng lại tự kiểm tra**

1. Một động cơ làm 6000 J công trong 3 giây. Công suất bằng bao nhiêu W? Đổi ra HP.
2. Xe kéo với lực 2000 N chạy đều 15 m/s. Công suất động cơ?

<details><summary>Đáp án</summary>

1. $P = \frac{W}{t} = \frac{6000}{3} = $ **2000 W**. Đổi: $\frac{2000}{745{,}7} \approx$ **2,68 HP**.
2. $P = F\cdot v = 2000\cdot 15 = $ **30 000 W = 30 kW**.

</details>

### 📝 Tóm tắt mục 5

- $P = \frac{W}{t} = F\cdot v$. Đơn vị $\text{W} = \text{J/s}$.
- $1\ \text{HP} = 745{,}7$ W.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính công khi đẩy hộp 30 N đi 5 m theo hướng cùng chiều lực.

**Bài 2**: Một ô tô 1500 kg tăng tốc từ $0 \to 25$ m/s. Tính công lực động cơ đã làm (bỏ qua ma sát).

**Bài 3**: Vật 2 kg được thả từ độ cao 10 m. Tính tốc độ chạm đất (bỏ qua sức cản).

**Bài 4**: Lò xo $k = 500$ N/m nén 0,2 m, sau đó thả ra đẩy vật 0,5 kg. Tính tốc độ vật khi lò xo về vị trí cân bằng.

**Bài 5**: Con lắc dài 0,8 m kéo ra 45° rồi thả. Tính tốc độ vật ở vị trí thấp nhất.

**Bài 6**: Vận động viên 70 kg chạy lên cầu thang 5 m trong 6 giây. Tính công suất.

### Lời giải

**Bài 1**: $W = 30 \times 5 \times \cos(0) = $ **150 J**.

**Bài 2**: 
- $\Delta KE = \frac{1}{2}\cdot 1500\cdot 25^2 - 0 = 468\,750$ J.
- $W = \Delta KE = $ **468,75 kJ** (định lý động năng-công).

**Bài 3**: $PE = KE \to m\cdot g\cdot h = \frac{1}{2}mv^2 \to v = \sqrt{2gh} = \sqrt{2\cdot 9{,}8\cdot 10} = \sqrt{196} = $ **14 m/s**. (Bỏ qua $m$ — đúng với mọi vật.)

**Bài 4**: $PE_{đh} = KE \to \frac{1}{2}\cdot 500\cdot 0{,}04 = \frac{1}{2}\cdot 0{,}5\cdot v^2 \to 10 = 0{,}25\cdot v^2 \to v^2 = 40 \to$ **$v \approx 6{,}32$ m/s**.

**Bài 5**: $h = L(1 - \cos\theta) = 0{,}8\cdot(1 - \cos 45^\circ) = 0{,}8\cdot(1 - 0{,}707) = 0{,}234$ m. $v = \sqrt{2gh} = \sqrt{2\cdot 9{,}8\cdot 0{,}234} \approx$ **2,14 m/s**.

**Bài 6**: 
- $W = m\cdot g\cdot h = 70\cdot 9{,}8\cdot 5 = 3430$ J.
- $P = \frac{3430}{6} \approx$ **571,7 W** ≈ 0,77 HP.

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Động lượng](../lesson-05-momentum-collisions/) — đại lượng khác để mô tả chuyển động, hữu ích cho va chạm.

---

## 📝 Tổng kết Lesson 04

1. **Công $W = F\cdot d\cdot\cos(\theta)$**. Lực $\perp$ chuyển động $\to W = 0$.
2. **Động năng $KE = \frac{1}{2}mv^2$**. Định lý KE-W: $W_{\text{tổng}} = \Delta KE$.
3. **Thế năng**: $PE_{\text{grav}} = m\cdot g\cdot h$, $PE_{đh} = \frac{1}{2}kx^2$.
4. **Bảo toàn năng lượng**: $KE + PE = \text{const}$ (không ma sát).
5. **Công suất $P = \frac{W}{t} = F\cdot v$**. Đơn vị W (Watt).

**Tiếp theo**: [Lesson 05 — Động lượng & Va chạm](../lesson-05-momentum-collisions/)
