// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-07-coordinate-3d/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Tọa độ Oxyz

## Mục tiêu

- Hiểu **hệ tọa độ 3 chiều Oxyz**.
- Tính **khoảng cách** trong không gian 3D.
- Viết **phương trình mặt phẳng** và **phương trình đường thẳng** trong không gian.
- Tính khoảng cách điểm-mặt-đường.

## Kiến thức tiền đề

- [Lesson 06 — Tọa độ Oxy](../lesson-06-coordinate-plane-conics/) — biết khái niệm tọa độ 2D.

---

## 1. Hệ tọa độ 3D

💡 **Trực giác / Hình dung**: đứng trong 1 căn phòng — góc phòng là gốc O. Vị trí 1 con ruồi cần 3 số: cách tường trái bao xa (x), cách tường sau bao xa (y), cao bao nhiêu so với sàn (z). 3 trục Ox, Oy, Oz như 3 mép tường gặp nhau ở góc, đôi một vuông góc. Khoảng cách 3D = Pythagoras áp dụng 2 lần.

**Hệ tọa độ Oxyz**: 3 trục Ox, Oy, Oz đôi một vuông góc, cắt nhau tại O.

Mỗi điểm M có 3 tọa độ **(x, y, z)** = hoành độ, tung độ, **cao độ**.

### Khoảng cách 2 điểm A(x₁, y₁, z₁), B(x₂, y₂, z₂)

$$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$

(Pythagoras mở rộng 3D.)

### Vector

**Vector AB** $= (x_2-x_1, y_2-y_1, z_2-z_1)$.

**Tích vô hướng** $u \\cdot v = u_1 v_1 + u_2 v_2 + u_3 v_3$.

**Độ lớn** $|u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$.

**Góc**: $\\cos(\\theta) = \\frac{u\\cdot v}{|u|\\cdot|v|}$.

**4 ví dụ số đa dạng (khoảng cách 3D)**:
- A(0,0,0), B(2,3,6): $d = \\sqrt{4+9+36} = \\sqrt{49} = $ **7**.
- A(1,1,1), B(2,3,3): $d = \\sqrt{1+4+4} = \\sqrt{9} = $ **3**.
- A(0,0,0), B(1,2,2): $d = \\sqrt{1+4+4} = $ **3**.
- A(−1,0,2), B(1,4,2): $d = \\sqrt{4+16+0} = \\sqrt{20} = $ **2√5 ≈ 4.47** (cùng z).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khoảng cách 3D vẫn là Pythagoras?"* Áp Pythagoras 2 lần: trước trên mặt phẳng đáy ($\\sqrt{\\Delta x^2+\\Delta y^2}$), rồi với chiều cao $\\Delta z \\to \\sqrt{(\\Delta x^2+\\Delta y^2)+\\Delta z^2} = \\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}$.
- *"Tích vô hướng $u\\cdot v = 0$ nghĩa là gì?"* 2 vector **vuông góc** ($\\cos\\theta = 0 \\to \\theta = 90^\\circ$). Đây là cách kiểm vuông góc nhanh nhất trong 3D.
- *"Độ lớn vector và khoảng cách 2 điểm liên hệ sao?"* $|AB|$ = độ lớn vector AB = khoảng cách giữa A và B.

⚠ **Lỗi thường gặp**: quên căn bậc 2 hoặc thiếu 1 thành phần z. Phản ví dụ: A(0,0,0), B(2,3,6) — nếu chỉ tính $\\sqrt{4+9} = \\sqrt{13}$ (quên z) là sai; đúng phải gồm cả $6^2 = 36 \\to \\sqrt{49} = 7$. Lỗi tích vô hướng: nhân chéo thay vì nhân cùng thành phần.

🔁 **Dừng lại tự kiểm tra**

1. A(1,2,3), B(3,5,3). Tính khoảng cách AB.
2. $u = (1,2,2)$, $v = (2,-2,1)$. Tính $u\\cdot v$. Hai vector có vuông góc không?

<details><summary>Đáp án</summary>

1. $d = \\sqrt{2^2+3^2+0^2} = \\sqrt{13} \\approx$ **3.61**.
2. $u\\cdot v = 2 - 4 + 2 = $ **0** → **vuông góc**.

</details>

### 📝 Tóm tắt mục 1

- Hệ Oxyz: mỗi điểm $= (x, y, z)$; 3 trục đôi một vuông góc tại O.
- **Khoảng cách 3D**: $d = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$ (Pythagoras 2 lần).
- **Tích vô hướng**: $u\\cdot v = u_1 v_1+u_2 v_2+u_3 v_3$; $= 0 \\iff$ vuông góc.
- Độ lớn $|u| = \\sqrt{u_1^2+u_2^2+u_3^2}$; góc qua $\\cos\\theta = \\frac{u\\cdot v}{|u||v|}$.

---

## 2. Phương trình mặt phẳng

Mặt phẳng có **vector pháp tuyến** $n = (A, B, C)$ đi qua điểm M₀(x₀, y₀, z₀):

$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$

Hoặc dạng tổng quát:

$$Ax + By + Cz + D = 0$$

💡 **Ý nghĩa**: vector pháp tuyến $n \\perp$ với mọi vector nằm trong mặt phẳng.

> 📐 **Định nghĩa đầy đủ — Phương trình mặt phẳng Ax+By+Cz+D=0**
>
> **(a) Là gì**: Tập điểm $(x,y,z)$ trong $\\mathbb{R}^3$ thoả 1 PT tuyến tính 3 biến. Hệ số $(A, B, C)$ **không phải tùy ý** — chúng là vector pháp tuyến **n** vuông góc với mặt phẳng đó.
>
> **(b) Vì sao cần**: Vì mặt phẳng là "1D ít hơn không gian" — cần 1 hạn chế (1 PT) để xác định. Vector pháp tuyến đóng vai trò "hướng" thay cho điểm — biết hướng vuông góc thì biết được mặt phẳng. Trong đồ hoạ 3D, vật lý (mặt cân bằng lực), tối ưu hoá (siêu phẳng phân lớp trong SVM), mặt phẳng là nguyên thuỷ cơ bản. Hằng số D quy định mặt phẳng "dời" khỏi gốc bao xa.
>
> **(c) Ví dụ số**: Mặt phẳng $2x + y + 2z = 6$ có **$n = (2, 1, 2)$** (vector pháp tuyến). Điểm $(1, 2, 1)$ có thuộc không? $2\\cdot 1+2+2\\cdot 1 = 6$ ✓ → có. Điểm $(0,0,0)$: $0 \\neq 6$ → không thuộc. Khoảng cách từ O đến mặt phẳng: $\\frac{|0+0+0-6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = $ **2**. Mặt phẳng song song $x+y+z = 0$ và $x+y+z = 5$: cùng $n = (1,1,1) \\to$ khoảng cách $= \\frac{|0-5|}{\\sqrt{3}} = \\frac{5}{\\sqrt{3}} \\approx 2.89$.

**Khoảng cách từ điểm P(x₀, y₀, z₀) đến mặt Ax + By + Cz + D = 0**:

$$d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vector pháp tuyến lấy từ đâu trong PT?"* Trực tiếp từ hệ số: mặt $Ax+By+Cz+D=0$ có $n = (A, B, C)$. Vd $2x+y+2z-6=0 \\to n = (2,1,2)$.
- *"Vì sao khoảng cách có dấu trị tuyệt đối?"* Vì khoảng cách luôn $\\ge 0$; tử số có thể âm (điểm nằm "phía sau" mặt phẳng) nên lấy $|...|$.
- *"2 mặt phẳng song song nhận biết sao?"* Cùng vector pháp tuyến (tỉ lệ): $(A,B,C)$ của mặt này tỉ lệ với mặt kia.

⚠ **Lỗi thường gặp**: quên chuẩn hóa (chia cho $\\sqrt{A^2+B^2+C^2}$) khi tính khoảng cách, hoặc dùng sai dấu D. Phản ví dụ: khoảng cách từ O tới $2x+y+2z-6=0$ $= \\frac{|-6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = $ **2**; nếu quên chia $\\sqrt{9}$ thì ra 6 (sai gấp 3). Lỗi khác: lẫn vector pháp tuyến $(A,B,C)$ với 1 điểm trên mặt.

🔁 **Dừng lại tự kiểm tra**

1. Mặt phẳng $x - 2y + 2z + 3 = 0$. Vector pháp tuyến là gì?
2. Khoảng cách từ O(0,0,0) tới mặt phẳng đó?

<details><summary>Đáp án</summary>

1. $n = $ **(1, −2, 2)**.
2. $d = \\frac{|0-0+0+3|}{\\sqrt{1+4+4}} = \\frac{3}{3} = $ **1**.

</details>

### 📝 Tóm tắt mục 2

- Mặt phẳng: $Ax + By + Cz + D = 0$, vector pháp tuyến **$n = (A, B, C)$**.
- Qua điểm M₀ với pháp $n$: $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$.
- Khoảng cách điểm–mặt: $\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$ (nhớ chuẩn hóa).
- 2 mặt song song ↔ pháp tuyến tỉ lệ.

---

## 3. Phương trình đường thẳng

💡 **Trực giác / Hình dung**: 1 đường thẳng trong không gian = "1 điểm xuất phát + 1 hướng đi". Tham số t giống "thời gian": tại t=0 ở điểm M₀, t tăng thì trượt theo hướng vector chỉ phương u, t âm thì trượt ngược. Như con kiến bò thẳng đều — biết vị trí ban đầu + vận tốc (hướng) là biết toàn bộ đường đi.

Đường thẳng qua M₀(x₀, y₀, z₀) với **vector chỉ phương** $u = (a, b, c)$:

**Tham số**:

$$\\begin{aligned}
x &= x_0 + a\\cdot t \\\\
y &= y_0 + b\\cdot t \\\\
z &= z_0 + c\\cdot t
\\end{aligned}$$

**Chính tắc** (nếu $a, b, c \\neq 0$):

$$\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}$$

**Verify bằng số**: đường qua M₀(1,2,0) với $u = (3,1,4)$. Tham số: $x = 1+3t$, $y = 2+t$, $z = 4t$. Tại $t=0 \\to (1,2,0) = M_0$ ✓. Tại $t=1 \\to (4,3,4)$ (điểm khác trên đường). Kiểm điểm $(4,3,4)$ bằng dạng chính tắc: $\\frac{4-1}{3} = 1$, $\\frac{3-2}{1} = 1$, $\\frac{4-0}{4} = 1 \\to$ cả 3 $= 1 = t$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vector chỉ phương có duy nhất không?"* Không — mọi bội số $k\\cdot u$ ($k\\neq 0$) cũng là chỉ phương của cùng đường thẳng (cùng hướng). Vd $(3,1,4)$ và $(6,2,8)$ chỉ cùng 1 đường.
- *"Dạng chính tắc khi a hoặc b = 0 thì sao?"* Không chia cho 0 được; phải viết riêng (vd nếu $a=0$ thì $x = x_0$ cố định, còn 2 phần kia bằng nhau).
- *"Sao 2D không cần z mà 3D cần?"* Vì 3D có thêm chiều cao — đường thẳng phải mô tả cả hướng theo z.

⚠ **Lỗi thường gặp**: lẫn vector chỉ phương ($\\parallel$ đường) với vector pháp tuyến ($\\perp$ mặt). Đường thẳng dùng **chỉ phương**, mặt phẳng dùng **pháp tuyến**. Phản ví dụ: PT mặt $2x+y+2z=6$ có pháp $(2,1,2)$; đường vuông góc mặt này nhận đúng $(2,1,2)$ làm **chỉ phương** (vì $u \\parallel n$ khi đường $\\perp$ mặt).

🔁 **Dừng lại tự kiểm tra**

1. Viết PT tham số đường thẳng qua A(2,0,1) với vector chỉ phương $(1,-1,2)$.
2. Điểm $(4,-2,5)$ có nằm trên đường đó không?

<details><summary>Đáp án</summary>

1. $x = 2+t$, $y = -t$, $z = 1+2t$.
2. Từ x: $4 = 2+t \\to t=2$. Kiểm y: $-2 = -2$ ✓; z: $1+4 = 5$ ✓ → **có nằm trên** ($t=2$).

</details>

### 📝 Tóm tắt mục 3

- Đường thẳng = điểm M₀ + vector chỉ phương $u = (a,b,c)$.
- **Tham số**: $x = x_0+at$, $y = y_0+bt$, $z = z_0+ct$ ($t$ là tham số "thời gian").
- **Chính tắc**: $\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c}$ (khi $a,b,c \\neq 0$).
- Vector chỉ phương không duy nhất (mọi bội số đều được); đừng lẫn với pháp tuyến.

---

## 4. Vị trí tương đối

💡 **Trực giác / Hình dung**: trong không gian 3D có 1 khả năng mới mà 2D không có — 2 đường **chéo nhau** (skew): không cắt và cũng không song song, như 1 cây cầu vượt và con đường bên dưới (2 đường ở 2 "tầng" khác nhau, không gặp dù kéo dài, nhưng không cùng hướng). Trong mặt phẳng 2D, 2 đường chỉ có thể cắt hoặc song song.

### 2 đường thẳng

- **Song song**: vector chỉ phương $u_1 \\parallel u_2$, không có điểm chung.
- **Trùng nhau**: $u_1 \\parallel u_2$, có điểm chung.
- **Cắt nhau**: có điểm chung duy nhất.
- **Chéo nhau**: không cùng mặt phẳng (đặc thù 3D, không có ở 2D).

### Đường thẳng và mặt phẳng

- **Vuông góc**: $u \\parallel n$.
- **Song song**: $u \\perp n$ và đường không trên mặt.
- **Cắt**: tại 1 điểm.

### 2 mặt phẳng

- **Song song**: $n_1 \\parallel n_2$.
- **Trùng**: $n_1 \\parallel n_2$, cùng D (so với chuẩn hóa).
- **Cắt**: tạo đường giao tuyến.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường $\\perp$ mặt thì u quan hệ gì với n?"* $u \\parallel n$ (chỉ phương đường song song pháp tuyến mặt) — vì đường vuông góc mặt thì cùng hướng với pháp tuyến.
- *"Đường $\\parallel$ mặt thì u quan hệ gì với n?"* $u \\perp n$ (chỉ phương vuông góc pháp tuyến), tức $u\\cdot n = 0$, và đường không nằm trên mặt.
- *"Làm sao phân biệt chéo nhau với cắt nhau?"* Cùng giải hệ tham số 2 đường: có nghiệm chung → cắt; vô nghiệm và $u_1$ không $\\parallel u_2$ → chéo nhau.

⚠ **Lỗi thường gặp**: cho rằng "2 đường không cắt thì song song" (đúng ở 2D, sai ở 3D). Phản ví dụ: đường $x=t,y=0,z=0$ (trục Ox) và đường $x=0,y=1,z=s$ — không cắt (đường 2 luôn có $y=1\\neq 0$), nhưng chỉ phương $(1,0,0)$ và $(0,0,1)$ không $\\parallel$ → **chéo nhau**, không song song.

🔁 **Dừng lại tự kiểm tra**

1. Đường có chỉ phương $u=(2,1,2)$, mặt phẳng có pháp tuyến $n=(2,1,2)$. Đường và mặt quan hệ gì?
2. 2D có khả năng "chéo nhau" giữa 2 đường không?

<details><summary>Đáp án</summary>

1. $u \\parallel n$ → đường **vuông góc** với mặt phẳng.
2. Không — chéo nhau là đặc thù 3D. Trong mặt phẳng, 2 đường chỉ cắt hoặc song song (hoặc trùng).

</details>

### 📝 Tóm tắt mục 4

- 2 đường thẳng 3D: song song / trùng / cắt / **chéo nhau** (đặc thù 3D).
- Đường $\\perp$ mặt ↔ $u \\parallel n$; đường $\\parallel$ mặt ↔ $u \\perp n$ (và không nằm trên mặt).
- 2 mặt: song song ($n_1 \\parallel n_2$), trùng, hoặc cắt (tạo giao tuyến).
- "Không cắt → song song" chỉ đúng trong 2D, sai trong 3D (có thể chéo nhau).

---

## 5. Bài tập

### Bài tập

**Bài 1**: A(1, 2, 3), B(4, 6, 8). Tính khoảng cách.

**Bài 2**: Viết PT mặt phẳng qua A(2, 1, 3) với vector pháp tuyến $n = (1, 2, 1)$.

**Bài 3**: Tính khoảng cách từ O(0,0,0) đến mặt phẳng $2x + y + 2z - 6 = 0$.

**Bài 4**: Cho $u = (1, 2, 2)$ và $v = (2, 1, -1)$. Tính $u\\cdot v$ và góc.

**Bài 5**: Viết PT tham số đường thẳng qua A(1, 2, 0) với vector chỉ phương $(3, 1, 4)$.

### Lời giải

**Bài 1**: $d = \\sqrt{9 + 16 + 25} = \\sqrt{50} = $ **5√2 ≈ 7.07**.

**Bài 2**: $1(x-2) + 2(y-1) + 1(z-3) = 0 \\to$ **x + 2y + z − 7 = 0**.

**Bài 3**: $d = \\frac{|0 + 0 + 0 - 6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = $ **2**.

**Bài 4**: $u\\cdot v = 2 + 2 - 2 = 2$. $|u| = \\sqrt{9} = 3$. $|v| = \\sqrt{6}$. $\\cos\\theta = \\frac{2}{3\\sqrt{6}} \\approx 0.272 \\to \\theta \\approx$ **74.2°**.

**Bài 5**: $x = 1 + 3t$, $y = 2 + t$, $z = 4t$.

---

## 6. Bài tiếp theo

[Lesson 08 — Biến hình & Vector](../lesson-08-transformations-vector-geo/).

## 📝 Tổng kết

1. **Oxyz**: mỗi điểm $= (x, y, z)$. $d = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$.
2. **Mặt phẳng**: $Ax + By + Cz + D = 0$. Vector pháp $n = (A,B,C)$.
3. **Đường thẳng**: tham số $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$.
4. **Khoảng cách điểm-mặt**: $\\frac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$.
5. **Đặc thù 3D**: 2 đường có thể **chéo nhau** (không có ở 2D).
`;
