// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Physics/01-Mechanics/lesson-02-newton-laws/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — 3 định luật Newton

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **lực** là gì, đơn vị (Newton, N), và vì sao đây là khái niệm nền tảng của cơ học.
- Phát biểu và hiểu **3 định luật Newton**:
  - **Định luật I (Quán tính)**: vật không chịu lực → trạng thái chuyển động không đổi.
  - **Định luật II**: **$F = m\\cdot a$** — lực tỉ lệ thuận với gia tốc.
  - **Định luật III**: lực và phản lực bằng nhau, ngược chiều, tác dụng lên 2 vật khác nhau.
- Phân biệt **khối lượng (mass, kg)** và **trọng lượng (weight, N)**.
- Vẽ được **sơ đồ vật tự do (Free Body Diagram, FBD)** cho các tình huống cơ học cơ bản.
- Giải được bài toán cơ bản: vật trên mặt phẳng nằm ngang, vật trên mặt phẳng nghiêng, thang máy tăng/giảm tốc.

## Kiến thức tiền đề

- [Lesson 01 — Động học](../lesson-01-kinematics/) — biết vị trí, vận tốc, gia tốc.

---

## 1. Lực là gì?

### 1.1. Định nghĩa

**Lực (Force, F)** = đại lượng đo **tương tác** giữa các vật, làm vật **thay đổi trạng thái chuyển động** (vận tốc) hoặc **biến dạng**.

💡 **Ý nghĩa cụ thể**: lực là cách 1 vật "đẩy" hoặc "kéo" vật khác. Khi bạn đẩy cái bàn, **bạn tác dụng lực lên bàn**. Khi Trái Đất hút bạn xuống, **Trái Đất tác dụng lực lên bạn** (= trọng lực).

**Vì sao cần khái niệm này?** Vì nếu không có lực, mọi vật sẽ chuyển động đều mãi (định luật I). Lực là **nguyên nhân** làm vận tốc thay đổi (= sinh gia tốc). Không có lực thì không có gia tốc, không có gia tốc thì không có hiện tượng cơ học thú vị nào.

**Đơn vị**: **Newton (N)**. 1 N = lực cần để gia tốc một vật 1 kg với gia tốc 1 m/s². Theo định nghĩa SI: $1\\ \\text{N} = 1\\ \\text{kg}\\cdot\\text{m/s}^2$.

**Có hướng (vector)**: lực luôn có hướng. Khi viết F = 10 N, ta cần biết "theo hướng nào".

### 1.2. Cảm nhận thực tế 1 N là bao nhiêu?

- **1 N** ≈ trọng lượng của 1 quả táo nhỏ (100 g) ở Trái Đất.
- **10 N** ≈ trọng lượng 1 kg gạo.
- **600 N** ≈ trọng lượng của một người 60 kg.
- **10,000 N** = 10 kN ≈ lực đẩy 1 ô tô con.

### ⚠ Lỗi thường gặp ở khái niệm lực

- **Nghĩ "vật chuyển động thì phải có lực đẩy nó"**: SAI (đây là sai lầm Aristotle, sửa ở mục 2). Vật chuyển động đều KHÔNG cần lực. Lực chỉ cần để **thay đổi** chuyển động.
- **Quên lực là vector**: viết "F = 10 N" mà không nêu hướng là chưa đủ. Hai lực 10 N ngược chiều triệt tiêu nhau (tổng = 0); cùng chiều thì cộng (= 20 N). Phản ví dụ: kéo co hai bên đều 500 N → dây không nhúc nhích vì tổng lực = 0, KHÔNG phải 1000 N.
- **Lẫn "lực" với "năng lượng" hoặc "động lượng"**: lực (N) là tương tác tức thời; năng lượng (J) và động lượng (kg·m/s) là đại lượng tích lũy. Đơn vị khác nhau, không thay thế được.

### 1.3. Các loại lực thường gặp (sẽ học kỹ ở Lesson 03)

| Loại lực | Nguồn gốc | Ký hiệu |
|----------|-----------|---------|
| Trọng lực | Hấp dẫn của Trái Đất | $W$ hoặc $F_g = m\\cdot g$ |
| Lực căng | Dây kéo | $T$ |
| Lực ma sát | Giữa 2 bề mặt tiếp xúc | $f$ |
| Lực đàn hồi | Lò xo, vật biến dạng | $F_{đh} = k\\cdot x$ |
| Phản lực pháp tuyến | Mặt phẳng đẩy vật vuông góc | $N$ |
| Lực điện | Giữa các điện tích | $F_e$ |

### ❓ Câu hỏi tự nhiên của người đọc

- *"1 Newton lớn hay nhỏ?"* Khá nhỏ trong đời thường: 1 N ≈ trọng lượng quả táo 100 g. Cầm chai nước 1 lít → bạn đang chống lại ~10 N. Lực phanh gấp một ô tô con khoảng vài nghìn N.
- *"Vì sao đơn vị lực lại là kg·m/s²?"* Vì từ $F = m\\cdot a$: $m$ tính bằng kg, $a$ bằng m/s² $\\to$ tích là $\\text{kg}\\cdot\\text{m/s}^2$. Người ta gọi gọn cụm này là "Newton" để tiện. Nó không phải đơn vị bịa ra mà là hệ quả trực tiếp của định luật II.
- *"Có lực 'âm' không?"* Lực là vector nên có dấu **theo trục đã chọn**: $F = -5$ N nghĩa là lực 5 N hướng theo chiều âm. "Âm" chỉ hướng, không phải lực "nhỏ hơn 0".

🔁 **Dừng lại tự kiểm tra**

1. Hai người đẩy một thùng cùng chiều, mỗi người 80 N. Tổng lực? Nếu đẩy ngược chiều nhau thì tổng lực?
2. Một lực gia tốc vật 3 kg với a = 4 m/s². Lực bằng bao nhiêu N? Đổi ra "tương đương trọng lượng bao nhiêu kg gạo"?

<details><summary>Đáp án</summary>

1. Cùng chiều: $80 + 80 = $ **160 N**. Ngược chiều (bằng nhau): $80 - 80 = $ **0 N** (thùng không gia tốc).
2. $F = m\\cdot a = 3\\cdot 4 = $ **12 N**. Vì 10 N ≈ trọng lượng 1 kg gạo $\\to$ 12 N ≈ trọng lượng **1,2 kg gạo**.

</details>

### 📝 Tóm tắt mục 1

- **Lực** = tương tác giữa các vật, gây gia tốc hoặc biến dạng.
- Đơn vị: Newton (N). $1\\ \\text{N} = 1\\ \\text{kg}\\cdot\\text{m/s}^2$.
- Lực có hướng (vector).

---

## 2. Định luật I — Quán tính

### 2.1. Phát biểu

**Một vật KHÔNG chịu lực (hoặc tổng các lực = 0) sẽ giữ nguyên trạng thái chuyển động**:
- Nếu đang đứng yên → vẫn đứng yên.
- Nếu đang chuyển động → tiếp tục chuyển động thẳng đều (cùng v).

💡 **Ý nghĩa**: trước Newton, người ta tin "vật sống động cần lực để giữ nó chuyển động" (Aristotle). Newton lật ngược: **lực KHÔNG cần thiết để giữ chuyển động — lực chỉ cần để THAY ĐỔI chuyển động**.

**Vì sao quan trọng?** Đây là phát biểu mang tính cách mạng. Trên Trái Đất, mọi vật đều bị ma sát/sức cản → cuối cùng đều dừng → khiến ta lầm tưởng "cần lực để vật chạy". Định luật I nói: nếu loại bỏ mọi lực cản, vật sẽ chạy mãi mãi với cùng v. Đây là thuộc tính **bẩm sinh** của vật chất, gọi là **quán tính (inertia)**.

### 2.2. Ví dụ trực giác

**Ví dụ 1 — Xe đột ngột phanh**: Bạn đang ngồi trong xe chạy v = 60 km/h. Xe đột phanh → tại sao thân bạn bị xô về phía trước? Vì theo định luật I, thân bạn "muốn" tiếp tục chuyển động với v = 60 km/h. Chỉ có dây an toàn (lực ngoài) mới giữ bạn lại.

**Ví dụ 2 — Tàu vũ trụ Voyager**: Phóng năm 1977, không có ma sát trong không gian. Tàu vẫn chạy với gần như cùng vận tốc gần 50 năm sau (chỉ đổi hướng nhẹ do hấp dẫn các thiên thể). Đây là minh họa hoàn hảo cho định luật I.

**Ví dụ 3 — Khăn trải bàn**: Kéo khăn nhanh dưới chén → chén "giữ nguyên" (không di chuyển ngang). Khi khăn đi ra, ma sát kịp tác động chén thì khăn đã hết → chén rơi xuống bàn an toàn.

### ⚠ Lỗi thường gặp

- **Nghĩ "lực ly tâm" đẩy bạn ra khi xe vào cua"**: thật ra không có lực đẩy ra — thân bạn chỉ **muốn đi thẳng** (quán tính), trong khi xe bẻ lái. Cảm giác "bị đẩy ra" là quán tính, không phải một lực thật (chi tiết ở Lesson 06).
- **Lẫn "tổng lực = 0" với "không có lực nào"**: vật đứng yên trên bàn vẫn chịu trọng lực VÀ phản lực — chúng triệt tiêu (tổng = 0). Định luật I áp dụng khi **tổng** lực = 0, không đòi hỏi vắng mặt mọi lực.
- **Nghĩ vật chuyển động đều thì không có lực nào**: chỉ đúng khi không ma sát. Trên Trái Đất xe chạy đều vẫn cần lực động cơ để **cân bằng** ma sát (tổng = 0), không phải không có lực.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Nếu lực không cần để duy trì chuyển động, sao xe tắt máy lại dừng?"* Vì có ma sát và sức cản không khí — đó là các lực **cản** làm xe giảm tốc. Trong không gian không ma sát (Voyager) thì xe chạy mãi. Định luật I nói về trường hợp lý tưởng không lực cản.
- *"Quán tính có phải là một loại lực không?"* Không. Quán tính là **xu hướng** của vật giữ nguyên trạng thái — một thuộc tính, không phải lực. Khối lượng m chính là thước đo định lượng của quán tính.
- *"Vật càng nặng quán tính càng lớn?"* Đúng. $m$ lớn $\\to$ khó thay đổi vận tốc hơn (cần lực lớn hơn để cùng $a$, theo $F = m\\cdot a$). Đẩy xe tải khó hơn đẩy xe đạp vì quán tính lớn hơn.

🔁 **Dừng lại tự kiểm tra**

1. Một cuốn sách nằm yên trên bàn. Tổng lực tác dụng lên nó bằng bao nhiêu? Có lực nào tác dụng lên nó không?
2. Phi thuyền trong không gian sâu tắt động cơ. Nó sẽ dừng lại, chậm dần, hay tiếp tục chạy đều?

<details><summary>Đáp án</summary>

1. Tổng lực = **0** (nên sách đứng yên, định luật I). Nhưng vẫn **có lực**: trọng lực kéo xuống và phản lực bàn đẩy lên — chúng triệt tiêu.
2. **Tiếp tục chạy đều** — không ma sát, không lực cản → quán tính giữ nguyên vận tốc (như Voyager).

</details>

### 📝 Tóm tắt mục 2

- Vật không chịu lực → giữ nguyên v (đứng yên hoặc chuyển động đều).
- Quán tính = thuộc tính bẩm sinh của vật chất.
- Lực CHỈ cần khi muốn THAY ĐỔI chuyển động.

---

## 3. Định luật II — F = m·a

### 3.1. Phát biểu

**Gia tốc của một vật tỉ lệ thuận với tổng lực tác dụng, tỉ lệ nghịch với khối lượng**:

$$F = m \\cdot a$$

Trong đó:
- **$F$** = tổng lực (vector), đơn vị N.
- **$m$** = khối lượng vật, đơn vị kg.
- **$a$** = gia tốc (vector), đơn vị m/s².

💡 **Ý nghĩa cốt lõi**: đây là **liên hệ định lượng** giữa nguyên nhân (lực) và kết quả (gia tốc). Nếu định luật I cho biết "không có lực thì không có gia tốc", thì định luật II cho biết **lực bao nhiêu sẽ gây gia tốc bao nhiêu**.

**Vì sao tỉ lệ nghịch với m?** Vì khối lượng lớn = quán tính lớn = "khó đẩy hơn". Đẩy 1 xe đạp với F = 100 N → gia tốc lớn; đẩy 1 ô tô với cùng F → gia tốc gần như không thấy được. Đó là vì ô tô có m gấp 100 lần xe đạp → a chỉ bằng 1/100.

### 3.2. Diễn dịch quan trọng

Khi tổng các lực $= 0 \\to a = 0 \\to$ vật đứng yên hoặc chuyển động đều (= định luật I là **trường hợp đặc biệt** của định luật II với $F = 0$).

### 3.3. Ba ví dụ số cụ thể

**Ví dụ 1 — Đẩy hộp trên sàn không ma sát**: Đẩy hộp 5 kg với $F = 20$ N. Tính $a$.
- $a = \\frac{F}{m} = \\frac{20}{5} = $ **4 m/s²**.
- Mỗi giây vận tốc tăng 4 m/s.

**Ví dụ 2 — Quả táo rơi**: Trọng lực kéo táo 100 g xuống. Tính gia tốc.
- $F_g = m\\cdot g = 0{,}1\\cdot 9{,}8 = 0{,}98$ N.
- $a = \\frac{F}{m} = \\frac{0{,}98}{0{,}1} = $ **9,8 m/s²** $= g$.
- $\\to$ Đúng quy luật rơi tự do: mọi vật rơi với cùng gia tốc $g$ (đã thấy ở Lesson 01).
- Vì sao? Vì $F_g = m\\cdot g$ và $a = \\frac{F}{m} \\to a = g$ ($m$ hủy lẫn nhau).

**Ví dụ 3 — Xe ô tô tăng tốc**: Ô tô 1500 kg, từ 0 lên 30 m/s trong 6 giây. Tính lực động cơ.
- $a = \\frac{30 - 0}{6} = 5\\ \\text{m/s}^2$.
- $F = m\\cdot a = 1500\\cdot 5 = $ **7 500 N = 7,5 kN**.

### 3.4. Trọng lượng vs Khối lượng

Đây là 2 khái niệm thường nhầm lẫn:

| | Khối lượng (mass, m) | Trọng lượng (weight, W) |
|---|----------------------|--------------------------|
| **Ý nghĩa** | Lượng vật chất trong vật, "khó di chuyển thế nào" | Lực hấp dẫn Trái Đất tác dụng lên vật |
| **Đơn vị** | kg | N (Newton) |
| **Phụ thuộc nơi?** | KHÔNG ($m$ luôn như nhau ở Trái Đất, Mặt Trăng, ngoài vũ trụ) | CÓ ($W = m\\cdot g$, $g$ khác nhau ở mỗi nơi) |
| **Đo bằng** | Cân thăng bằng | Cân lò xo |

**Ví dụ**: Một người 60 kg.
- Ở Trái Đất ($g = 9{,}8\\ \\text{m/s}^2$): $W = 60 \\times 9{,}8 = $ **588 N**.
- Ở Mặt Trăng ($g = 1{,}6\\ \\text{m/s}^2$): $W = 60 \\times 1{,}6 = $ **96 N**.
- Ngoài không gian ($g \\approx 0$): $W \\approx$ **0 N**. Nhưng khối lượng $m$ vẫn $= $ **60 kg**.

→ Khi nói "tôi nặng 60 kg" — chính xác phải nói "khối lượng tôi là 60 kg". "Trọng lượng" của bạn $= 588$ N (ở Trái Đất).

### ⚠ Lỗi thường gặp

- **Nhầm khối lượng (kg) với trọng lượng (N)**: cân hiển thị "60 kg" thật ra đang đo trọng lượng rồi chia cho g. Lên Mặt Trăng khối lượng vẫn 60 kg nhưng trọng lượng chỉ 96 N (≈ cảm giác nhẹ như 9.8 kg ở Trái Đất). Trong F = m·a phải dùng **khối lượng** (kg), không dùng kg như đơn vị lực.
- **Dùng F là một lực riêng lẻ thay vì TỔNG lực**: $F$ trong $F = m\\cdot a$ là **tổng (hợp) lực** (net force). Nếu vật chịu 50 N kéo và 20 N ma sát ngược, thì $a = \\frac{50-20}{m}$, KHÔNG phải $\\frac{50}{m}$.
- **Quên rằng a cùng hướng với hợp lực**: gia tốc luôn theo hướng của tổng lực, không phải hướng vận tốc. Xe đang chạy tới nhưng phanh → tổng lực hướng lùi → a hướng lùi (xe chậm dần).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao mọi vật rơi với cùng gia tốc g dù khác khối lượng?"* Vì trọng lực $F_g = m\\cdot g$ tỉ lệ với $m$, mà gia tốc $a = \\frac{F}{m} = \\frac{mg}{m} = g$ — $m$ triệt tiêu. Vật nặng chịu lực kéo lớn hơn, nhưng cũng "ì" hơn đúng tỉ lệ $\\to$ cùng $a$.
- *"$F = m\\cdot a$ hay $a = \\frac{F}{m}$ — cái nào đúng?"* Cùng một phương trình, chỉ viết khác. Dùng $F = m\\cdot a$ khi tìm lực (biết $m$, $a$); dùng $a = \\frac{F}{m}$ khi tìm gia tốc (biết lực, $m$).
- *"Trên Mặt Trăng tôi nhảy cao hơn vì nhẹ hơn — khối lượng giảm à?"* Không, khối lượng giữ nguyên. Bạn nhảy cao hơn vì **trọng lượng** (lực kéo xuống) nhỏ hơn ($g$ chỉ $1{,}6\\ \\text{m/s}^2$), nên cùng lực đạp chân tạo gia tốc lên lớn hơn và rơi xuống chậm hơn.

🔁 **Dừng lại tự kiểm tra**

1. Vật 4 kg chịu lực kéo 30 N và lực ma sát 6 N ngược chiều. Tính gia tốc.
2. Một người có khối lượng 50 kg. Trọng lượng trên Trái Đất ($g=9{,}8$)? Trên Sao Hỏa ($g=3{,}7$)?

<details><summary>Đáp án</summary>

1. Hợp lực $= 30 - 6 = 24$ N. $a = \\frac{F}{m} = \\frac{24}{4} = $ **6 m/s²**.
2. Trái Đất: $W = 50\\cdot 9{,}8 = $ **490 N**. Sao Hỏa: $W = 50\\cdot 3{,}7 = $ **185 N**. Khối lượng vẫn 50 kg ở cả hai.

</details>

### 📝 Tóm tắt mục 3

- **$F = m\\cdot a$** — định luật trung tâm của cơ học cổ điển.
- $m$ tỉ lệ nghịch $a$: vật càng nặng càng khó tăng tốc.
- Trọng lượng $W = m\\cdot g$, khác khối lượng $m$.

---

## 4. Định luật III — Lực và phản lực

### 4.1. Phát biểu

**Nếu vật A tác dụng lực F lên vật B, thì vật B đồng thời tác dụng ngược lại lên A một lực có ĐỘ LỚN BẰNG NHAU và HƯỚNG NGƯỢC CHIỀU**:

$$F_{(A\\to B)} = -F_{(B\\to A)}$$

💡 **Ý nghĩa cốt lõi**: lực luôn **đi theo cặp** — không bao giờ có "lực một chiều". Khi bạn đẩy tường, tường cũng đẩy bạn (đó là lý do bạn cảm thấy áp lực ở tay).

**Vì sao cần định luật này?** Vì không có nó, ta sẽ không hiểu được nhiều hiện tượng:
- Vì sao tên lửa bay lên (khí phụt xuống → khí "đẩy" tên lửa lên).
- Vì sao bơi được (tay đẩy nước về sau → nước đẩy người về trước).
- Vì sao đứng vững trên mặt đất (Trái Đất hút bạn xuống → bạn hút Trái Đất lên với cùng lực, nhưng Trái Đất quá nặng nên không nhúc nhích).

### 4.2. ⚠ Lỗi thường gặp — 2 lực phải tác dụng lên 2 VẬT KHÁC NHAU

Nếu 2 lực cùng tác dụng lên CÙNG 1 vật, đó **KHÔNG** phải cặp lực-phản lực.

**Ví dụ nhầm lẫn**: Quyển sách đặt trên bàn.
- Trọng lực W = lực Trái Đất kéo sách XUỐNG.
- Phản lực N = lực bàn đẩy sách LÊN.
- Hai lực này **bằng nhau, ngược chiều, cùng tác dụng lên sách**.
- → Đây KHÔNG phải cặp định luật III! (Cả 2 đều tác dụng lên sách.)
- → Đây chỉ là **2 lực cân bằng** theo định luật I (sách đứng yên vì F_net = 0).

**Cặp định luật III thực sự**:
- W = lực Trái Đất hút sách. Cặp = lực sách hút Trái Đất (theo định luật vạn vật hấp dẫn, sách cũng kéo Trái Đất lên với cùng lực!).
- N = lực bàn đẩy sách. Cặp = lực sách ép xuống bàn.

→ Nhớ quy tắc: **cặp định luật III luôn ở trên 2 vật khác nhau**.

### 4.3. Ba ví dụ trực giác

**Ví dụ 1 — Đi bộ**: Khi đi, bạn đẩy mặt đất **về sau** (qua chân). Mặt đất đẩy bạn **về phía trước**. Lực đó đẩy bạn tiến lên.

**Ví dụ 2 — Tên lửa**: Đốt nhiên liệu → khí phụt xuống với vận tốc lớn. Theo định luật III, khí cũng đẩy tên lửa lên với lực bằng. Đây là cách tên lửa hoạt động trong vũ trụ (không cần "đẩy vào không khí" như máy bay).

**Ví dụ 3 — Bơi**: Tay bạn đẩy nước về sau. Nước đẩy tay về trước. Cộng dồn lực này khắp cơ thể → người bơi tiến lên.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Nếu lực và phản lực bằng nhau và ngược chiều, sao chúng không triệt tiêu, vật vẫn chuyển động được?"* Vì hai lực tác dụng lên **hai vật khác nhau**, không lên cùng một vật → không cộng vào nhau để triệt tiêu. Lực bạn đẩy đất tác dụng lên đất; phản lực đất đẩy tác dụng lên bạn → chính phản lực này làm bạn tiến.
- *"Trái Đất hút tôi và tôi hút Trái Đất bằng nhau — sao chỉ tôi rơi mà Trái Đất không nhúc nhích?"* Lực bằng nhau, nhưng gia tốc $a = \\frac{F}{m}$. Trái Đất có $m$ khổng lồ ($\\approx 6\\times 10^{24}$ kg) $\\to a$ của nó $\\approx 0$; còn bạn $m$ nhỏ $\\to a = g$ lớn. Cùng lực, vật nặng hơn gia tốc nhỏ hơn.
- *"Làm sao phân biệt cặp định luật III với hai lực cân bằng?"* Cặp định luật III: cùng **loại** lực, trên **hai vật khác nhau**, luôn bằng nhau (kể cả khi vật đang gia tốc). Hai lực cân bằng: trên **cùng một vật**, có thể khác loại, chỉ bằng nhau khi vật cân bằng.

🔁 **Dừng lại tự kiểm tra**

1. Bạn đẩy tường với lực 200 N. Tường đẩy lại bạn bao nhiêu? Theo hướng nào?
2. Quả táo ($m = 0{,}1$ kg) rơi, Trái Đất hút nó với $F = 0{,}98$ N. Táo hút Trái Đất với lực bao nhiêu? Gia tốc của Trái Đất do lực này ($m_{TĐ} \\approx 6\\times 10^{24}$ kg)?

<details><summary>Đáp án</summary>

1. **200 N**, hướng **ngược lại** (từ tường ra phía bạn). Đó là lý do tay bạn cảm thấy áp lực.
2. Cũng **0,98 N** (cặp định luật III). $a$ của Trái Đất $= \\frac{0{,}98}{6\\times 10^{24}} \\approx$ **1,6×10⁻²⁵ m/s²** — nhỏ đến mức không đo nổi, nên ta coi Trái Đất "đứng yên".

</details>

### 📝 Tóm tắt mục 4

- Lực đi theo cặp: A → B và B → A, bằng nhau, ngược chiều.
- 2 lực trên **2 vật khác nhau** (đừng nhầm với 2 lực cân bằng trên cùng 1 vật).
- Ứng dụng: tên lửa, bơi, đi bộ, đứng vững.

---

## 5. Free Body Diagram (FBD)

💡 **Trực giác / Hình dung**: FBD giống như "cô lập một nghi phạm để thẩm vấn riêng". Bạn tách đúng **một vật** ra khỏi khung cảnh, rồi liệt kê **tất cả những gì đang tác dụng lên nó** dưới dạng mũi tên. Đừng vẽ lực mà vật này tác dụng lên vật khác — chỉ vẽ lực **vào** vật đang xét. Khi đã có đủ mũi tên, áp F = m·a riêng từng trục là xong.

### 5.1. Quy trình vẽ

Free Body Diagram = sơ đồ biểu diễn **tất cả các lực tác dụng LÊN 1 VẬT cụ thể**. Quy trình 4 bước:

1. **Tách vật ra** khỏi môi trường (vẽ vật như 1 hình chữ nhật/điểm).
2. **Xác định mọi lực tác dụng lên nó**: trọng lực, phản lực pháp tuyến, lực ma sát, lực kéo (dây), lực ngoại lực...
3. **Vẽ mũi tên** cho mỗi lực, gốc tại vật, hướng theo lực, độ dài tỉ lệ với độ lớn.
4. **Chọn hệ tọa độ** (thường: x ngang, y dọc) và phân tích từng lực thành thành phần.

### 5.2. Walk-through 3 ví dụ

**Ví dụ 1 — Quyển sách trên bàn**:
\`\`\`
        N (lên)
        ↑
   [SÁCH]
        ↓
        W (xuống)
\`\`\`
- Tổng lực: $F = N - W = m\\cdot a$. Sách đứng yên $\\to a = 0 \\to N = W = m\\cdot g$.

**Ví dụ 2 — Kéo hộp trên sàn (có ma sát)**:
\`\`\`
              N
              ↑
   f ←─── [HỘP] ───→ T  (lực kéo)
              ↓
              W
\`\`\`
- Trục y: $N - W = 0 \\to N = W = m\\cdot g$.
- Trục x: $T - f = m\\cdot a \\to a = \\frac{T - f}{m}$.

**Ví dụ 3 — Vật trên mặt phẳng nghiêng góc $\\theta$**:
\`\`\`
         N
         ↑ (vuông góc mặt nghiêng)
       /
     [VẬT]
       \\\\
         ↓
         W (luôn xuống thẳng đứng)
\`\`\`
Phân tích W theo trục song song và vuông góc mặt nghiêng:
- $W_{\\text{song song}} = W\\cdot\\sin\\theta = m\\cdot g\\cdot\\sin\\theta$ (kéo vật xuống dốc).
- $W_{\\text{vuông góc}} = W\\cdot\\cos\\theta = m\\cdot g\\cdot\\cos\\theta$ (ép vật vào mặt nghiêng).
- $N = W\\cdot\\cos\\theta$ (cân bằng theo trục vuông góc).
- Gia tốc trượt xuống dốc (nếu không ma sát): $a = g\\cdot\\sin\\theta$.

### ⚠ Lỗi thường gặp khi vẽ FBD

- **Vẽ cả lực mà vật tác dụng lên vật khác**: FBD chỉ chứa lực **tác dụng LÊN** vật đang xét. Vd với cuốn sách, KHÔNG vẽ "lực sách đè bàn" trong FBD của sách — lực đó tác dụng lên bàn.
- **Bịa ra "lực chuyển động" theo hướng vật đi**: nhiều người vẽ một mũi tên về phía trước "vì vật đang đi tới". Không có lực như vậy. Chỉ vẽ các lực thực: trọng lực, phản lực, ma sát, lực kéo... Vật đang đi tới là do quán tính, không cần lực.
- **Quên N = m·g luôn đúng**: trên mặt nghiêng $N = m\\cdot g\\cdot\\cos\\theta$ (nhỏ hơn); trong thang máy tăng tốc $N = m(g+a)$. N tự điều chỉnh, KHÔNG cố định bằng trọng lượng.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao trên mặt nghiêng phải tách trọng lực thành 2 thành phần?"* Vì gia tốc xảy ra **dọc mặt nghiêng**, nên ta chọn trục theo mặt nghiêng. Trọng lực thẳng đứng phải tách thành phần song song dốc ($mg\\cdot\\sin\\theta$, gây trượt) và vuông góc dốc ($mg\\cdot\\cos\\theta$, bị N cân bằng) để áp $F = m\\cdot a$ đúng trục.
- *"Phản lực N có luôn bằng trọng lượng không?"* Không. Chỉ khi mặt phẳng nằm ngang và không có lực dọc khác. Trên dốc $N = mg\\cdot\\cos\\theta$; có ai đè thêm lên thì N tăng; thang máy gia tốc thì N đổi theo.
- *"Tại sao cần chọn hệ tọa độ — vẽ lực là đủ rồi mà?"* Vì để cộng vector lực phải chiếu chúng lên trục. Chọn trục khéo (vd song song mặt nghiêng) làm phương trình gọn nhất, ít phải tách lực.

🔁 **Dừng lại tự kiểm tra**

1. Vật 2 kg nằm yên trên mặt ngang. Liệt kê các lực trong FBD và tính phản lực N. ($g=9{,}8$)
2. Vật 3 kg trên mặt nghiêng 30° không ma sát. Thành phần trọng lực kéo vật xuống dốc bằng bao nhiêu? Gia tốc trượt?

<details><summary>Đáp án</summary>

1. Hai lực: trọng lực $W = 2\\cdot 9{,}8 = 19{,}6$ N (xuống) và phản lực N (lên). Vật yên $\\to N = W = $ **19,6 N**.
2. $mg\\cdot\\sin\\theta = 3\\cdot 9{,}8\\cdot\\sin 30^\\circ = 3\\cdot 9{,}8\\cdot 0{,}5 = $ **14,7 N**. Gia tốc $a = g\\cdot\\sin\\theta = 9{,}8\\cdot 0{,}5 = $ **4,9 m/s²** (xuống dốc).

</details>

### 📝 Tóm tắt mục 5

- FBD = mọi lực TRÊN 1 vật, vẽ như mũi tên.
- Chọn hệ tọa độ $\\to$ phân tích lực theo trục $\\to$ áp dụng $F = m\\cdot a$ riêng mỗi trục.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Một vật 10 kg chịu lực $F = 50$ N theo phương ngang (không ma sát). Tính gia tốc.

**Bài 2**: Một người 70 kg đứng trong thang máy. Tính lực thang máy tác dụng lên người trong các trường hợp:
a) Thang máy đứng yên.
b) Thang máy đi lên với $a = 2\\ \\text{m/s}^2$ (tăng tốc).
c) Thang máy đi xuống với $a = 2\\ \\text{m/s}^2$ (giảm tốc, tức gia tốc hướng lên).

**Bài 3**: Hai vật $m_1 = 2$ kg và $m_2 = 3$ kg nối với nhau bằng dây, kéo $m_1$ bằng lực $F = 25$ N (không ma sát). Tính gia tốc cả hệ và lực căng dây.

**Bài 4**: Vật 5 kg trượt trên mặt phẳng nghiêng 30° (không ma sát). Tính gia tốc.

**Bài 5**: Một quả bóng 0,4 kg đập vào tường với $v = 10$ m/s, dội ngược lại với $v = 8$ m/s trong 0,05 giây. Tính lực trung bình mà tường tác dụng lên bóng.

**Bài 6**: Vì sao khi đi thang máy đang tăng tốc đi lên, bạn cảm thấy **nặng hơn**?

### Lời giải

**Bài 1**: $a = \\frac{F}{m} = \\frac{50}{10} = $ **5 m/s²**.

**Bài 2**: $W = 70 \\times 9{,}8 = 686$ N (lực Trái Đất kéo người xuống). Gọi $N = $ lực thang máy đẩy người lên.
- a) Đứng yên: $a = 0$. $N - W = 0 \\to$ **N = 686 N** (cảm giác "nặng đúng").
- b) Tăng tốc lên: $a = +2\\ \\text{m/s}^2$ (lên). $N - W = m\\cdot a \\to N = W + m\\cdot a = 686 + 70\\cdot 2 = $ **826 N** (cảm thấy nặng hơn).
- c) Giảm tốc khi đi xuống = gia tốc lên $2\\ \\text{m/s}^2$. Cùng như (b): $N = $ **826 N**.

**Bài 3**: Hệ chung: $F = (m_1 + m_2)\\cdot a \\to 25 = 5\\cdot a \\to$ **a = 5 m/s²**.
Cô lập $m_2$: lực căng dây $T$ kéo $m_2 \\to T = m_2\\cdot a = 3\\cdot 5 = $ **15 N**.

**Bài 4**: $a = g\\cdot\\sin(30^\\circ) = 9{,}8\\cdot 0{,}5 = $ **4,9 m/s²** (xuống dốc).

**Bài 5**:
- Vận tốc trước: +10 m/s (vào tường). Vận tốc sau: −8 m/s (dội ra). $\\Delta v = -8 - 10 = -18$ m/s.
- Gia tốc trung bình: $a = \\frac{\\Delta v}{\\Delta t} = \\frac{-18}{0{,}05} = -360\\ \\text{m/s}^2$ (hướng xa tường).
- Lực: $F = m\\cdot a = 0{,}4\\cdot (-360) = $ **−144 N**. Lực tường tác dụng lên bóng $= 144$ N (hướng xa tường).

**Bài 6**: Khi thang máy tăng tốc đi lên ($a$ hướng lên), theo $F = m\\cdot a$ phải có **tổng lực hướng lên** lên người. Phân tích lực trên người: $N$ (sàn thang đẩy lên) $- W$ (Trái Đất kéo xuống) $= m\\cdot a \\to$ **$N = W + m\\cdot a > W$**. Tức là sàn thang phải đẩy bạn mạnh hơn bình thường → cảm giác như bạn nặng hơn. Lực này gọi là "trọng lượng biểu kiến (apparent weight)". 

Ngược lại, khi thang máy đi xuống (gia tốc hướng xuống) hoặc cuối hành trình lên (giảm tốc), $N < W \\to$ cảm giác nhẹ. Nếu thang máy rơi tự do ($a = g$), $N = 0 \\to$ cảm giác "không trọng lực".

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 03 — Các loại lực](../lesson-03-forces/) — chi tiết ma sát, đàn hồi, hấp dẫn.
- **Liên kết Lesson 01**: $F \\to a \\to v \\to x$ (chuỗi liên kết của cơ học cổ điển).

---

## 📝 Tổng kết Lesson 02

1. **Lực** = tương tác gây gia tốc/biến dạng. Đơn vị Newton ($\\text{N} = \\text{kg}\\cdot\\text{m/s}^2$).
2. **Định luật I**: $F = 0 \\to v$ không đổi (quán tính).
3. **Định luật II**: **$F = m\\cdot a$** — liên hệ định lượng lực và gia tốc.
4. **Định luật III**: lực đi theo cặp, bằng nhau, ngược chiều, trên **2 vật khác nhau**.
5. **Khối lượng (kg)** ≠ **trọng lượng (N)**. $W = m\\cdot g$.
6. **FBD**: vẽ mọi lực trên 1 vật $\\to$ phân tích trục x, y $\\to$ áp $F = m\\cdot a$ riêng từng trục.

**Tiếp theo**: [Lesson 03 — Các loại lực](../lesson-03-forces/)
`;
