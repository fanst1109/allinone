// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Trigonometry/lesson-01-angles/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Góc: độ và radian

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **góc** là gì về mặt hình học, và **đo góc** bằng những đại lượng nào.
- Phân biệt rõ **độ (degree)** và **radian** — hai đơn vị đo góc khác nhau.
- Thuộc lòng **bảng chuyển đổi** giữa các góc đặc biệt: \`30°, 45°, 60°, 90°, 180°, 270°, 360°\` ↔ \`π/6, π/4, π/3, π/2, π, 3π/2, 2π\`.
- Trả lời được câu hỏi *"vì sao toán học và Machine Learning luôn dùng radian, không dùng độ?"* — câu hỏi tưởng nhỏ nhưng là nguyên nhân số 1 gây lỗi khi mới học \`math.Sin\`, \`numpy.sin\`.
- **Quy gọn** được góc bất kỳ (âm, vượt 360°, vượt 2π) về dải chuẩn \`[0, 360°)\` hoặc \`[0, 2π)\`.
- Hiểu khái niệm **vận tốc góc (angular velocity)** ở mức "giới thiệu, sẽ học sâu ở Tầng 3 Calculus".
- Tự tay viết được hàm Go \`deg2rad\`, \`rad2deg\`, \`normalizeAngle\` — bộ ba bạn sẽ tái sử dụng ở mọi lesson Trigonometry sau.

## Kiến thức tiền đề

- [Tầng 1 — Lesson 05: Hàm số](../../Algebra/lesson-05-functions/) — ý niệm \`f(x) = ...\` và "đầu vào → đầu ra".
- [Tầng 1 — Lesson 01: Số](../../Algebra/lesson-01-numbers/) — biết về số thực, số vô tỉ. Đặc biệt cần ý niệm **\`π\` là số vô tỉ ≈ 3.14159...** xuất phát từ tỉ số \`chu vi / đường kính\` của đường tròn.
- Phép cộng/trừ/nhân/chia số thực thông thường.

> **Ghi nhớ chính của cả bài**:
>
> Có **hai đơn vị đo góc**:
>
> 1. **Độ (°)** — quy ước "1 vòng = 360°" có gốc lịch sử từ Babylon. Tiện cho con người, nhưng là số "tùy ý".
> 2. **Radian (rad)** — đơn vị **tự nhiên** của góc: 1 radian = góc ở tâm chắn cung có độ dài bằng bán kính. 1 vòng = \`2π\` rad.
>
> Mọi thư viện toán/ML/khoa học dùng **radian**. Quên điều này → \`math.Sin(30)\` trong Go cho ra \`-0.988\` chứ không phải \`0.5\` mà bạn mong đợi.

---

## 1. Góc là gì?

### 1.1. Định nghĩa hình học

💡 **Trực giác trước**: Hãy tưởng tượng bạn đang đứng nhìn về phía bắc, sau đó quay người sang phải một chút để nhìn về phía đông-bắc. **Lượng quay đó chính là một góc**. Góc đo "mở rộng" hay "hẹp" của việc quay, không đo khoảng cách.

Hình học cổ điển định nghĩa: **góc là hình tạo bởi hai tia chung gốc**.

\`\`\`
       tia 2
        /
       /
      /
     /
    /θ
   ●─────── tia 1
   gốc
\`\`\`

- Hai tia gọi là **cạnh** của góc.
- Điểm chung của hai tia gọi là **đỉnh** (vertex).
- Phần "mở" giữa hai tia là góc, ký hiệu thường là \`θ\` (theta), \`α\`, \`β\`, hay \`∠AOB\` (đỉnh \`O\`, hai tia đi qua \`A\` và \`B\`).

### 1.2. Phân loại góc theo độ mở

Trước khi vào đơn vị cụ thể, ta gọi tên các góc quen thuộc:

| Loại góc | Mô tả | Hình minh hoạ ASCII |
|----------|-------|---------------------|
| Góc nhọn (acute) | Mở vừa phải, < góc vuông | \`\\●____\` (hai tia hơi tách) |
| Góc vuông (right) | "Vuông góc" — hai tia vuông với nhau | \`│●____\` (hình chữ L) |
| Góc tù (obtuse) | Mở rộng hơn góc vuông nhưng chưa thẳng | \`\\●_____\` ngược (rộng hơn) |
| Góc bẹt (straight) | Hai tia thẳng hàng, ngược chiều nhau | \`____●____\` |
| Góc đầy / trọn vòng (full) | Quay đúng 1 vòng, quay về vị trí ban đầu | (vòng tròn khép kín) |

ASCII chi tiết hơn:

\`\`\`
Góc nhọn (~30°-60°):     Góc vuông (90°):        Góc tù (~120°):
       /                        │                         \\
      /                         │                          \\
     /                          │                           \\
    / θ                         │ 90°                      θ \\
   ●──────                      ●──────                    ────●
\`\`\`

\`\`\`
Góc bẹt (180°):                 Góc trọn vòng (360°):
                                      ╱─────╲
   ────────●────────                 │   ●   │   (tia quay đủ 1 vòng
                                      ╲─────╱      về chính nó)
\`\`\`

💡 **Trực giác**: nghĩ tới kim đồng hồ. Kim phút chỉ 12 → kim chỉ 3: góc vuông. Kim chỉ 12 → kim chỉ 6: góc bẹt. Kim chỉ 12 → quay đủ 1 vòng về 12: góc trọn vòng.

### 1.3. Hướng quay: dương và âm

Quy ước toán học (sẽ dùng xuyên suốt mọi tầng sau):

- **Quay ngược chiều kim đồng hồ = chiều dương** (counterclockwise = positive).
- **Quay thuận chiều kim đồng hồ = chiều âm** (clockwise = negative).

Vì sao "ngược kim đồng hồ" lại là dương? Đó là quy ước, nhưng phù hợp với hệ trục \`Oxy\` quen thuộc: từ trục \`Ox\` (đông) quay ngược kim đồng hồ lên trục \`Oy\` (bắc) — đó là chiều "tăng góc".

\`\`\`
      Oy (90°)
       │
       │  ↗  chiều +
       │     (ngược kim đồng hồ)
───────●──────── Ox (0°)
       │
       │  ↘  chiều −
       │     (xuôi kim đồng hồ)
\`\`\`

Ví dụ:

- Quay từ \`Ox\` ngược kim đồng hồ tới \`Oy\` = \`+90°\`.
- Quay từ \`Ox\` xuôi kim đồng hồ tới \`−Oy\` = \`−90°\`.
- \`−90°\` và \`+270°\` chỉ cùng một vị trí cuối (cả hai đều dừng ở \`−Oy\`), nhưng đường đi khác nhau (một bên quay ngắn xuôi kim, bên kia quay dài ngược kim).

#### ❓ Câu hỏi tự nhiên: "Vậy \`−90°\` và \`+270°\` có phải cùng một góc không?"

Nếu chỉ quan tâm **vị trí cuối** thì có — chúng kết thúc ở cùng một tia. Nhưng nếu quan tâm **đường đi** (xoay vật bao xa, hết bao nhiêu vòng) thì khác. Trong hầu hết bài toán hình học và Trig sơ cấp, ta **quy gọn** về \`[0°, 360°)\` nên \`−90° ≡ 270°\`. Trong cơ học (chuyển động quay) thì giữ nguyên dấu vì hướng quay quan trọng.

#### ⚠ Lỗi thường gặp

> *"Em tưởng \`−30°\` là vô nghĩa — góc phải dương chứ?"*

Sai. Góc âm hoàn toàn hợp lệ, chỉ đơn giản nghĩa là "quay ngược chiều quy ước dương". Trong hệ trục tọa độ và lập trình đồ hoạ, góc âm dùng liên tục.

#### 🔁 Dừng lại tự kiểm tra (mục 1)

1. Vẽ góc \`+45°\` và góc \`−45°\` trên hệ trục \`Oxy\`. Chúng có đối xứng qua đâu không?
2. Trên đồng hồ, từ vị trí 12 quay tới vị trí 9 theo chiều ngược kim đồng hồ là góc bao nhiêu độ?
3. Một góc \`90°\` quay thuận chiều kim đồng hồ ghi bằng số có dấu là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. \`+45°\` ở góc phần tư I (đông-bắc), \`−45°\` ở góc phần tư IV (đông-nam). Chúng đối xứng qua trục \`Ox\`.
2. 12 → 9 theo chiều ngược kim đồng hồ: đi qua 11, 10, 9 = đi ngược 1/4 vòng = \`+90°\`. (Nếu đi thuận kim 12 → 1 → 2 → ... → 9 thì là \`−270°\` hoặc tương đương \`+90°\` mod 360°.)
3. \`−90°\`.

</details>

### 📝 Tóm tắt mục 1

- Góc = hình tạo bởi 2 tia chung gốc, đo "lượng mở" giữa chúng.
- Quy ước: ngược kim đồng hồ = \`+\`, xuôi kim đồng hồ = \`−\`.
- Góc âm và góc > 1 vòng đều hợp lệ; có thể quy gọn về \`[0, 360°)\`.
- Đo góc cần **đơn vị** — đó là chủ đề các mục sau.

---

## 2. Đơn vị Độ (degree)

### 2.1. Quy ước "1 vòng = 360°"

💡 **Trực giác**: chia trọn 1 vòng quay thành **360 phần bằng nhau**, mỗi phần là \`1°\` (1 độ). Vì sao 360? Vì người Babylon cổ đại dùng **hệ cơ số 60** (sexagesimal) — tới giờ ta vẫn thừa hưởng: 60 giây = 1 phút, 60 phút = 1 giờ, 360° = 1 vòng (gần với số ngày trong năm 365). Đây hoàn toàn là **lựa chọn lịch sử**, không phải toán học bắt buộc.

\`\`\`
                    90° (¼ vòng)
                       │
                       │
   180° (½ vòng) ──────●────── 0° = 360° (1 vòng)
                       │
                       │
                    270° (¾ vòng)
\`\`\`

Các giá trị "phải nhớ":

| Góc | Mô tả | Ví dụ trong đời sống |
|-----|-------|------------------------|
| \`0°\` | Hai tia trùng nhau | Kim phút chỉ 12, kim giây cũng chỉ 12 |
| \`30°\` | Một nửa của 60° | Kim giờ giữa 12 và 1 (1 giờ = 30°) |
| \`45°\` | Nửa của góc vuông | Đường chéo hình vuông với cạnh |
| \`60°\` | Hai cạnh của tam giác đều | Tam giác đều có 3 góc 60° |
| \`90°\` | Góc vuông | Góc trong hình chữ nhật |
| \`120°\` | Hai cạnh chia vòng làm 3 phần | Mỗi cánh của hình ngôi sao 3 cánh |
| \`180°\` | Góc bẹt, hai tia ngược chiều | Đường thẳng |
| \`270°\` | 3/4 vòng | (kim chỉ 9 từ vị trí 12, đi ngược kim) |
| \`360°\` | Trọn 1 vòng | Quay về vị trí ban đầu |

### 2.2. Phân số nhỏ hơn 1°: phút và giây (giới thiệu)

Để đo góc chính xác hơn \`1°\` (dùng trong thiên văn, hàng hải), người ta chia tiếp:

- \`1° = 60'\` (60 phút góc, ký hiệu \`'\`, đọc là *minute*).
- \`1' = 60''\` (60 giây góc, ký hiệu \`''\`, đọc là *second*).

Ví dụ: \`12°34'56''\` đọc là "12 độ 34 phút 56 giây góc".

\`\`\`
1° = 60' = 60 · 60'' = 3600''
\`\`\`

Walk-through: chuyển \`12°34'56''\` về độ thập phân.

\`\`\`
12°34'56'' = 12 + 34/60 + 56/3600
           = 12 + 0.5667 + 0.01556
           ≈ 12.5822°
\`\`\`

💡 **Trực giác**: phút và giây ở đây **không phải đơn vị thời gian** — chỉ mượn tên thôi. Đừng nhầm "giây góc" với "giây đồng hồ".

Trong khoá học này (và 99% bài ML/toán đại học) ta dùng **độ thập phân** (như \`12.5822°\`) chứ không dùng phút/giây. Mục này chỉ để bạn nhận ra khi đọc tài liệu thiên văn/hàng hải.

#### ❓ Câu hỏi tự nhiên: "Sao không chia thập phân cho gọn?"

Quy ước này có từ thời chưa có máy tính, và hệ 60 cho phép chia hết nhiều ước (60 chia hết cho 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 — rất tiện để chia bằng compa). Hệ thập phân chia kém hơn (10 chỉ chia hết cho 1, 2, 5, 10). Lý do giống y hệt vì sao 1 giờ = 60 phút chứ không phải 100 phút.

### 2.3. Bốn ví dụ cụ thể với đơn vị độ

| Tình huống | Góc tương ứng |
|------------|---------------|
| Đường chéo TV vs cạnh dài (16:9 → atan(9/16)) | ≈ \`29.36°\` |
| Trục Trái Đất nghiêng so với mặt phẳng quỹ đạo | ≈ \`23.5°\` (lý do có mùa) |
| Góc tới của ánh sáng mặt trời lúc trưa hè ở xích đạo | ≈ \`90°\` (thẳng đỉnh đầu) |
| Vĩ độ Hà Nội (kinh tuyến gốc → cực) | \`21.03°\` Bắc |

### #### ⚠ Lỗi thường gặp

> *"Em viết \`θ = 30\` trong Go, hàm \`math.Sin(θ)\` ra \`-0.988\`. Tại sao không phải \`0.5\`?"*

Vì Go (và mọi thư viện toán) hiểu \`30\` là **30 radian**, không phải 30 độ. \`30 rad\` ≈ \`30 / (2π)\` ≈ \`4.77\` vòng, tức quay gần 5 vòng + đoạn lẻ — kết quả \`sin\` ra số "ngẫu nhiên" như \`-0.988\`. Trước khi gọi \`math.Sin\`, bạn **phải đổi sang radian** (xem mục 3, 4).

### 🔁 Dừng lại tự kiểm tra (mục 2)

1. \`1/12\` vòng = ? độ.
2. Một chiếc bánh pizza chia 8 miếng đều nhau, mỗi miếng có góc đỉnh = ? độ.
3. Quy đổi \`5°15'\` về độ thập phân.

<details>
<summary>Đáp án</summary>

1. \`360°/12 = 30°\`.
2. \`360°/8 = 45°\`.
3. \`5 + 15/60 = 5 + 0.25 = 5.25°\`.

</details>

### 📝 Tóm tắt mục 2

- 1 vòng = 360°. Đây là **quy ước lịch sử** từ Babylon (cơ số 60), không phải toán học bắt buộc.
- Các giá trị cần thuộc: 30°, 45°, 60°, 90°, 180°, 270°, 360°.
- Có thể chia tiếp \`1° = 60' = 3600''\` cho mục đích chính xác cao (thiên văn).
- Mọi thư viện máy tính (\`math.Sin\`, \`numpy.sin\`, ...) **không** nhận đầu vào là độ — nhận radian (mục 3).

---

## 3. Đơn vị Radian — đơn vị TỰ NHIÊN của góc

### 3.1. Cốt lõi: định nghĩa radian từ đường tròn

💡 **Trực giác**: Đơn vị "độ" ở mục 2 là tuỳ ý (chia vòng tròn ra 360 phần — số 360 không có lý do toán học sâu sắc). Có cách nào đo góc mà số không bị "lựa chọn tuỳ ý" không? Có — **dùng độ dài cung** chia cho **bán kính**. Đó chính là radian.

**Định nghĩa**: cho đường tròn bán kính \`r\`. Một góc \`θ\` ở tâm chắn (cắt) một cung có độ dài \`s\`. Khi đó số đo radian của góc là:

\`\`\`
θ = s / r          (rad)
\`\`\`

\`\`\`
            ●     ← cung dài s
         ▲ ╱
       s╱
       ╱
      ╱  θ
     ●───────────●
     tâm    r    điểm trên đường tròn
\`\`\`

**Cụ thể bằng số**:

- Đường tròn bán kính \`r = 1\`. Cung dài \`s = 1\`. Khi đó \`θ = 1/1 = 1 rad\`.
- Đường tròn bán kính \`r = 5\`. Cung dài \`s = 5\`. Khi đó \`θ = 5/5 = 1 rad\`. **Cùng góc, cùng giá trị 1 rad** — bất kể bán kính.
- Đường tròn bán kính \`r = 2\`. Cung dài \`s = 6\`. Khi đó \`θ = 6/2 = 3 rad\`.
- Đường tròn bán kính \`r = 10\`. Cung dài \`s = 5\`. Khi đó \`θ = 5/10 = 0.5 rad\`.

💡 **Trực giác quan trọng**: số đo radian **không phụ thuộc bán kính** — chỉ phụ thuộc tỉ số \`cung/bán kính\`. Đây là lý do nó được gọi là đơn vị "tự nhiên": góc không bị gán một con số tùy tiện như "360".

### 3.2. Tại sao 1 vòng = \`2π\` rad?

Chu vi đường tròn bán kính \`r\` là \`C = 2πr\` (định nghĩa của \`π\`). Đi trọn 1 vòng = cung dài bằng cả chu vi = \`s = 2πr\`. Vậy số đo radian của góc 1 vòng:

\`\`\`
θ_full = s/r = 2πr / r = 2π   (rad)
\`\`\`

Như vậy:

\`\`\`
1 vòng = 360° = 2π rad ≈ 6.283 rad
½ vòng = 180° = π rad ≈ 3.14159 rad
¼ vòng = 90° = π/2 rad ≈ 1.5708 rad
1/6 vòng = 60° = π/3 rad ≈ 1.0472 rad
1/8 vòng = 45° = π/4 rad ≈ 0.7854 rad
1/12 vòng = 30° = π/6 rad ≈ 0.5236 rad
\`\`\`

### 3.3. "1 radian" bằng bao nhiêu độ?

Từ \`2π rad = 360°\`:

\`\`\`
1 rad = 360° / (2π) = 180° / π ≈ 57.2958°
\`\`\`

ASCII minh hoạ trên đường tròn đơn vị (bán kính 1):

\`\`\`
    Cung dài đúng 1 đơn vị (bằng bán kính)
            ↓
         ╱──●
        ╱    ╲
       │  1   ╲
       │ rad   │   ← 1 rad ≈ 57.3°
       │       │
       ●───1───●
       tâm     (bán kính = 1)
\`\`\`

Hình dung: bạn lấy một sợi dây dài đúng bằng bán kính, đặt cong theo đường tròn — góc ở tâm quét bởi sợi dây đó là **1 rad** ≈ 57.3°. Có thể "đặt" được khoảng \`2π ≈ 6.28\` sợi dây như vậy mới đi trọn vòng.

### 3.4. Bốn ví dụ tính radian từ cung và bán kính

| Bán kính \`r\` | Cung \`s\` | Góc \`θ = s/r\` |
|--------------|----------|----------------|
| 1 m | 1 m | \`1 rad ≈ 57.3°\` |
| 2 m | π m ≈ 3.14 m | \`π/2 rad = 90°\` |
| 4 cm | 5 cm | \`1.25 rad ≈ 71.6°\` |
| 10 m | 2π·10 = 62.83 m | \`2π rad = 360°\` (1 vòng) |

**Walk-through chi tiết ví dụ 3**: đường tròn \`r = 4 cm\`, cung \`s = 5 cm\`.

\`\`\`
θ = s/r = 5/4 = 1.25 rad

Đổi sang độ:
θ° = 1.25 · (180/π) = 1.25 · 57.2958 ≈ 71.62°
\`\`\`

Verify ngược lại từ độ → cung:

\`\`\`
s = r · θ = 4 · 1.25 = 5 cm   ✓
\`\`\`

#### ❓ Câu hỏi tự nhiên: "Radian có đơn vị không? Sao nó 'không có thứ nguyên'?"

Để ý công thức \`θ = s/r\`: cả \`s\` và \`r\` đều là **độ dài** (mét, cm, ...). Chia chúng cho nhau → đơn vị **triệt tiêu**, còn lại một con số "thuần". Vì thế radian được gọi là **dimensionless** (không thứ nguyên) — không có ký hiệu đơn vị bắt buộc kèm sau số.

Ví dụ: trong vật lý ta viết "góc quay là \`2.5 rad\`" hay đơn giản chỉ "\`2.5\`" — cả hai đều đúng. Khi viết \`sin(0.5)\` trong Go mà không kèm "rad", hệ thống vẫn ngầm hiểu đó là radian. Đây cũng là **lý do** radian là đơn vị tự nhiên: khi vào công thức toán, không cần "phụ thu" hệ số chuyển đổi như độ phải làm.

#### ❓ Câu hỏi tự nhiên: "Vì sao nhiều khi viết \`π/6\` thay vì \`0.5236\`?"

Vì:

1. **Chính xác tuyệt đối**: \`π/6\` là giá trị chính xác, \`0.5236\` chỉ là xấp xỉ (làm tròn 4 chữ số).
2. **Dễ thấy quan hệ**: \`π/6\` cho biết ngay đó là \`30°\` (1/6 nửa vòng). Còn \`0.5236\` thì phải tính ngược mới biết.
3. **Quan trọng với các góc đặc biệt 30°/45°/60°/90°** — chúng cho \`sin\`, \`cos\` ra giá trị **đẹp** (\`½\`, \`√2/2\`, \`√3/2\`, \`1\`). Sẽ học kỹ ở Lesson 02.

### 🔁 Dừng lại tự kiểm tra (mục 3)

1. Đường tròn bán kính \`r = 3 m\`, cung dài \`s = 6 m\`. Tính góc ở tâm theo radian và độ.
2. Đường tròn bán kính \`r = 2\`. Cung dài bao nhiêu để góc ở tâm là \`π/4\` rad?
3. Vì sao 1 vòng đầy đủ là \`2π\` rad mà không phải \`π\` rad hay \`3π\` rad?

<details>
<summary>Đáp án</summary>

1. \`θ = 6/3 = 2 rad\`. Đổi sang độ: \`2 · 180/π ≈ 114.59°\`.
2. \`s = r · θ = 2 · π/4 = π/2 ≈ 1.5708\`.
3. Vì chu vi đường tròn bán kính \`r\` là \`2πr\` (định nghĩa của \`π\`). Khi đi trọn vòng, cung dài = chu vi = \`2πr\`, nên \`θ = 2πr/r = 2π\`. Không liên quan đến lựa chọn tùy ý, đây là hệ quả trực tiếp của \`π\`.

</details>

### 📝 Tóm tắt mục 3

- Radian = \`cung / bán kính\` — đơn vị **tự nhiên**, không phụ thuộc bán kính.
- 1 vòng = \`2π\` rad ≈ 6.283 rad. 1 rad ≈ 57.3°.
- Các giá trị cần thuộc: \`π/6 = 30°\`, \`π/4 = 45°\`, \`π/3 = 60°\`, \`π/2 = 90°\`, \`π = 180°\`, \`2π = 360°\`.
- Radian "không có thứ nguyên" → công thức toán không cần hệ số phụ.

---

## 4. Công thức chuyển đổi độ ↔ radian

### 4.1. Hai công thức cốt lõi

Từ \`2π rad = 360°\`, chia hai vế cho 360:

\`\`\`
1° = 2π/360 = π/180  rad
\`\`\`

Và chia hai vế cho \`2π\`:

\`\`\`
1 rad = 360/(2π) = 180/π  ≈ 57.2958°
\`\`\`

Hai công thức tổng quát:

\`\`\`
θ_rad = θ_deg · (π / 180)
θ_deg = θ_rad · (180 / π)
\`\`\`

💡 **Trực giác để nhớ**: nhân với \`π/180\` để **vào radian** (vì \`π\` ở "phía radian"), nhân với \`180/π\` để **về độ** (vì \`180\` ở "phía độ"). Hay lẫn? Hãy nhớ: kết quả \`1°\` là số **nhỏ** (vì độ là đơn vị "nhỏ" hơn radian) → công thức \`π/180\` cho ra giá trị xấp xỉ \`0.01745\` cho \`1°\` → đúng.

### 4.2. Walk-through chuyển đổi 9 giá trị quen thuộc

| Độ | Tính \`θ_rad = θ_deg · π/180\` | Radian (dạng đẹp) | Radian (thập phân) |
|----|------------------------------|---------------------|---------------------|
| \`0°\` | \`0 · π/180 = 0\` | \`0\` | \`0\` |
| \`30°\` | \`30 · π/180 = π/6\` | \`π/6\` | \`0.5236\` |
| \`45°\` | \`45 · π/180 = 45π/180 = π/4\` | \`π/4\` | \`0.7854\` |
| \`60°\` | \`60 · π/180 = 60π/180 = π/3\` | \`π/3\` | \`1.0472\` |
| \`90°\` | \`90 · π/180 = π/2\` | \`π/2\` | \`1.5708\` |
| \`120°\` | \`120 · π/180 = 120π/180 = 2π/3\` | \`2π/3\` | \`2.0944\` |
| \`180°\` | \`180 · π/180 = π\` | \`π\` | \`3.1416\` |
| \`270°\` | \`270 · π/180 = 270π/180 = 3π/2\` | \`3π/2\` | \`4.7124\` |
| \`360°\` | \`360 · π/180 = 2π\` | \`2π\` | \`6.2832\` |

**Walk-through một ô**: \`60° → ?\` rad.

\`\`\`
60° = 60 · π/180
    = 60π/180
    Rút gọn: chia tử và mẫu cho 60:
    = π/3
    ≈ 3.14159 / 3
    ≈ 1.0472 rad
\`\`\`

Verify ngược (radian → độ):

\`\`\`
1.0472 rad · 180/π = 1.0472 · 57.2958 ≈ 60°   ✓
\`\`\`

### 4.3. Walk-through chuyển ngược radian → độ

| Radian | Tính \`θ_deg = θ_rad · 180/π\` | Độ |
|--------|------------------------------|----|
| \`π/6\` | \`(π/6) · 180/π = 180/6\` | \`30°\` |
| \`π/4\` | \`(π/4) · 180/π = 180/4\` | \`45°\` |
| \`π/3\` | \`(π/3) · 180/π = 180/3\` | \`60°\` |
| \`π/2\` | \`(π/2) · 180/π = 180/2\` | \`90°\` |
| \`π\` | \`π · 180/π = 180\` | \`180°\` |
| \`3π/2\` | \`(3π/2) · 180/π = 3 · 90\` | \`270°\` |
| \`2π\` | \`2π · 180/π = 360\` | \`360°\` |
| \`1\` (rad) | \`1 · 180/π ≈ 57.296\` | \`≈ 57.296°\` |

💡 **Mẹo nhớ bảng**: nhìn vào mẫu số của radian — đó là tỉ lệ chia của \`180°\`:

\`\`\`
π/6  → 180/6 = 30°
π/4  → 180/4 = 45°
π/3  → 180/3 = 60°
π/2  → 180/2 = 90°
π/1  → 180/1 = 180°
\`\`\`

Khi tử có hệ số khác (vd \`2π/3\`): tính như \`(2 · 180)/3 = 360/3 = 120°\`.

### 4.4. Bảng tổng hợp các góc đặc biệt (PHẢI THUỘC)

Đây là bảng bạn sẽ tra đi tra lại trong cả 3 tầng tiếp theo (Trigonometry, Calculus, Linear Algebra). Đáng thuộc lòng từ giờ:

| Độ | Radian | \`sin θ\` (xem trước Lesson 02) | \`cos θ\` (xem trước Lesson 02) |
|----|--------|--------------------------------|--------------------------------|
| \`0°\` | \`0\` | \`0\` | \`1\` |
| \`30°\` | \`π/6\` | \`1/2\` | \`√3/2\` |
| \`45°\` | \`π/4\` | \`√2/2\` | \`√2/2\` |
| \`60°\` | \`π/3\` | \`√3/2\` | \`1/2\` |
| \`90°\` | \`π/2\` | \`1\` | \`0\` |
| \`120°\` | \`2π/3\` | \`√3/2\` | \`−1/2\` |
| \`135°\` | \`3π/4\` | \`√2/2\` | \`−√2/2\` |
| \`150°\` | \`5π/6\` | \`1/2\` | \`−√3/2\` |
| \`180°\` | \`π\` | \`0\` | \`−1\` |
| \`270°\` | \`3π/2\` | \`−1\` | \`0\` |
| \`360°\` | \`2π\` | \`0\` | \`1\` |

Cột \`sin\`, \`cos\` chỉ là **preview**; chi tiết ở Lesson 02 và 03.

#### ❓ Câu hỏi tự nhiên: "Có cần thuộc lòng cả 9 ô chuyển đổi không?"

Không nhất thiết — nhưng nên thuộc **trục chính** (0, 30°, 45°, 60°, 90°, 180°, 360°) và biết suy ra từ đó. Vd \`120° = 180° − 60° = π − π/3 = 2π/3\`. Hoặc \`270° = 180° + 90° = π + π/2 = 3π/2\`. Cộng/trừ phân số \`π\` là kỹ năng cốt lõi mà bạn sẽ luyện ở Lesson 03 (đường tròn đơn vị).

#### ⚠ Lỗi thường gặp

> *"Em viết \`30° → 30·180/π\` ra ≈ 1718, sai số rất lớn."*

Bạn dùng **nhầm công thức**: \`θ_deg → θ_rad\` phải nhân với \`π/180\`, không phải \`180/π\`. Mẹo phòng tránh: kết quả radian của góc nhỏ (\`30°\`) **phải nhỏ hơn** số độ rất nhiều (\`30°\` ≈ \`0.52\` rad). Nếu ra \`1718\` thì biết ngay sai chiều.

### 🔁 Dừng lại tự kiểm tra (mục 4)

1. \`15°\` = bao nhiêu radian (dạng phân số π và dạng thập phân)?
2. \`5π/4\` rad = bao nhiêu độ?
3. \`1.5\` rad ≈ bao nhiêu độ?

<details>
<summary>Đáp án</summary>

1. \`15° = 15 · π/180 = 15π/180 = π/12 ≈ 0.2618\` rad.
2. \`5π/4 · 180/π = 5 · 180/4 = 900/4 = 225°\`.
3. \`1.5 · 180/π ≈ 1.5 · 57.2958 ≈ 85.94°\`.

</details>

### 📝 Tóm tắt mục 4

- \`θ_rad = θ_deg · π/180\`. \`θ_deg = θ_rad · 180/π\`.
- 9 cặp giá trị đặc biệt cần thuộc (0°, 30°, 45°, 60°, 90°, 120°, 180°, 270°, 360°).
- Mẹo: mẫu số \`π/n\` ↔ chia \`180°/n\`. Tử số hệ số nhân thẳng.
- Sai chiều công thức là lỗi phổ thông nhất — kiểm tra bằng thử nhanh \`30° ≈ 0.52 rad\`.

---

## 5. Vì sao toán học và ML LUÔN dùng radian?

Đây là mục **bắt buộc hiểu** vì nó là nguyên nhân số 1 gây bug khi mới học lập trình toán/ML. Nếu bạn còn nghĩ "độ và radian chỉ là hai cách viết khác nhau, dùng cái nào cũng được" — đọc mục này.

### 5.1. Lý do 1: Đạo hàm \`sin\` chỉ ĐẸP khi dùng radian

(Tầng 3 sẽ học sâu về đạo hàm. Ở đây chỉ cần biết kết luận.)

Nếu \`x\` ở **radian**, thì:

\`\`\`
d/dx [sin x] = cos x
d/dx [cos x] = −sin x
\`\`\`

Đây là công thức đẹp nhất trong giải tích, là nền cho **mọi tính toán liên quan đến dao động, sóng, mạng neural có hàm kích hoạt sinusoidal** (vd RoPE, Fourier features).

Nếu \`x\` ở **độ**, thì:

\`\`\`
d/dx [sin x°] = (π/180) · cos x°
\`\`\`

Mỗi lần lấy đạo hàm ta phải mang theo hệ số \`π/180 ≈ 0.01745\`. Lấy đạo hàm bậc 2:

\`\`\`
d²/dx² [sin x°] = (π/180)² · (−sin x°)
\`\`\`

Hệ số dính lằng nhằng mãi. Người ta chọn radian để các hệ số này **biến mất**.

💡 **Trực giác**: radian được "thiết kế" sao cho ở góc rất nhỏ, \`sin θ ≈ θ\`. Hằng số 1 ở vị trí "tỉ lệ" → đạo hàm sạch. Còn 1° = 0.01745 rad → tỉ lệ không bằng 1 → kéo theo hệ số phụ vào đạo hàm.

### 5.2. Lý do 2: Khai triển Taylor đẹp khi dùng radian

(Cũng thuộc Tầng 3 — chỉ xem trước.)

Với \`x\` ở radian:

\`\`\`
sin x = x − x³/6 + x⁵/120 − x⁷/5040 + ...
cos x = 1 − x²/2 + x⁴/24 − x⁶/720 + ...
\`\`\`

Cho \`x\` rất nhỏ (\`x → 0\`): \`sin x ≈ x\`. Thử với \`x = 0.1 rad\`:

\`\`\`
sin(0.1) thực tế ≈ 0.099833
Xấp xỉ:           0.1 − 0.001/6 = 0.1 − 0.000167 ≈ 0.099833   ✓
\`\`\`

Khít tới 5 chữ số sau dấu phẩy. Đây là cơ sở để máy tính tính \`sin\` cực nhanh — chỉ cần vài phép cộng nhân, không cần lập bảng.

Nếu dùng độ, công thức trên không còn đúng — ta phải nhân \`x\` với \`π/180\` trước. Bất tiện và mất đẹp.

### 5.3. Lý do 3: Mọi thư viện code đều nhận RADIAN

Đây là lý do **thực dụng nhất** với người học ML:

| Ngôn ngữ / lib | Hàm sin | Đơn vị đầu vào |
|----------------|---------|------------------|
| Go \`math.Sin(x)\` | \`sin(x)\` | **Radian** |
| Python \`math.sin(x)\` | \`sin(x)\` | **Radian** |
| NumPy \`np.sin(x)\` | element-wise sin | **Radian** |
| PyTorch \`torch.sin(x)\` | tensor sin | **Radian** |
| C \`sin(x)\` (math.h) | \`sin(x)\` | **Radian** |
| JavaScript \`Math.sin(x)\` | \`sin(x)\` | **Radian** |

**Walk-through một bug điển hình** trong Go:

\`\`\`go
import "math"
import "fmt"

func main() {
    // Mong đợi: sin(30°) = 0.5
    result := math.Sin(30)            // SAI: hiểu là 30 rad
    fmt.Println(result)               // In ra: -0.9880316...

    // Đúng: phải đổi 30° → radian trước
    correct := math.Sin(30 * math.Pi / 180)
    fmt.Println(correct)              // In ra: 0.4999999... (≈ 0.5) ✓
}
\`\`\`

Tại sao \`math.Sin(30)\` ra \`-0.988\`?

\`\`\`
30 rad mod 2π = 30 − 4·(2π) = 30 − 25.133 ≈ 4.867 rad
4.867 rad ≈ 4.867 · 180/π ≈ 278.87°
sin(278.87°) = sin(360° − 81.13°) = −sin(81.13°) ≈ −0.988
\`\`\`

Đó là lý do ra \`-0.988\` — không phải bug Go, mà là bạn đưa 30 rad chứ không phải 30°.

⚠ **Lỗi thường gặp** (lặp lại vì cực phổ biến): **Quên đổi độ sang radian** trước khi gọi \`math.Sin\`. Sai khoảng 57 lần (vì \`1 rad ≈ 57°\`).

#### ❓ Câu hỏi tự nhiên: "Tại sao Go không có \`math.SinDeg(x)\` cho tiện?"

Vì:

1. Triết lý "một cách đúng": thư viện chuẩn ép bạn dùng radian — tránh nhầm lẫn (nếu có cả hai, sẽ có người gọi nhầm).
2. Trong code thật bạn hiếm khi viết góc dưới dạng độ — embedding, gradient, vector rotation đều đã ở radian từ đầu.
3. Đổi đơn vị là 1 dòng code (\`x * math.Pi / 180\`) — không đáng có hàm riêng.

Nếu bạn dùng nhiều, viết hàm helper \`deg2rad\` trong project (xem \`solutions.go\`).

### 5.4. Lý do 4: Công thức vật lý/cơ học đơn giản hơn

Vận tốc góc, lực hướng tâm, dao động điều hoà — tất cả công thức vật lý chuẩn dùng radian:

\`\`\`
ω (vận tốc góc) = dθ/dt   với θ ở rad
v (vận tốc dài) = ω · r
\`\`\`

Nếu \`θ\` ở độ, phải nhân hệ số \`π/180\` vào mọi công thức → mất đẹp.

### 🔁 Dừng lại tự kiểm tra (mục 5)

1. Sửa đoạn code Go sau cho đúng (mong muốn in ra \`0.5\`):
   \`\`\`go
   x := 30.0
   fmt.Println(math.Sin(x))
   \`\`\`
2. Bạn nhập \`math.Cos(180)\` vào Go. Ra số nào? Vì sao **không** phải \`−1\`?

<details>
<summary>Đáp án</summary>

1. Đổi \`x\` sang radian trước khi gọi \`Sin\`:
   \`\`\`go
   x := 30.0 * math.Pi / 180   // hoặc dùng hàm deg2rad
   fmt.Println(math.Sin(x))    // ≈ 0.5
   \`\`\`
   Cách khác — gọi với hằng số đã ở radian: \`math.Sin(math.Pi/6)\`.

2. \`math.Cos(180)\` = \`cos(180 rad)\`. \`180 rad ≈ 180 · 57.296\` không phải vậy — đúng hơn: \`180 rad mod 2π = 180 − 28·(2π) = 180 − 175.929 = 4.071 rad ≈ 233.2°\`. \`cos(233.2°) ≈ -0.598\`. Không phải \`−1\` vì Go hiểu 180 là rad, không phải độ.

</details>

### 📝 Tóm tắt mục 5

- Radian là đơn vị tự nhiên: \`(sin x)' = cos x\` chỉ đúng khi \`x\` ở radian.
- Khai triển Taylor \`sin x ≈ x − x³/6 + ...\` cần \`x\` ở radian.
- **MỌI thư viện toán/ML đều nhận radian, không nhận độ**.
- Quên đổi đơn vị → sai khoảng 57 lần, không phải sai vài %.

---

## 6. Góc âm và góc lớn hơn 360°

### 6.1. Góc âm: quay xuôi kim đồng hồ

💡 **Trực giác**: nếu góc dương là "quay ngược kim đồng hồ thêm θ", thì góc âm là "quay xuôi kim đồng hồ θ". Cùng một đích, nhưng đi hướng ngược.

\`\`\`
+45°  từ Ox quay ngược kim đồng hồ → góc phần tư I
−45°  từ Ox quay xuôi kim đồng hồ → góc phần tư IV
\`\`\`

Tương đương: \`−θ\` và \`+(360° − θ)\` cùng kết thúc ở một tia. Ví dụ \`−30° ≡ 330°\` (cùng vị trí cuối).

Bốn ví dụ:

| Góc âm | Tương đương dương (mod 360°) |
|--------|--------------------------------|
| \`−30°\` | \`330°\` |
| \`−90°\` | \`270°\` |
| \`−180°\` | \`180°\` (góc bẹt, dù dấu nào cũng cùng vị trí) |
| \`−2π/3\` rad | \`2π − 2π/3 = 4π/3\` rad = \`240°\` |

### 6.2. Góc lớn hơn 360°: quay nhiều vòng

Khi xoay một vật quay tròn (bánh xe, kim đồng hồ, chong chóng), nó có thể quay > 1 vòng. Lúc đó số đo góc tự nhiên vượt 360°.

Bốn ví dụ:

| Góc | Phân tích | Vị trí cuối (≡ ?) |
|-----|-----------|--------------------|
| \`450°\` | \`360° + 90°\` (1 vòng + 90°) | \`90°\` |
| \`720°\` | \`2 · 360°\` (đúng 2 vòng) | \`0°\` |
| \`1000°\` | \`2 · 360° + 280°\` | \`280°\` |
| \`5π\` rad | \`2 · 2π + π\` (2 vòng + π) | \`π\` rad = \`180°\` |

### 6.3. Quy gọn góc: phép \`mod\`

**Quy gọn** = đưa góc về dải chuẩn \`[0°, 360°)\` hoặc \`[0, 2π)\` để dễ so sánh, vẽ, tính sin/cos.

\`\`\`
Quy gọn độ:   θ_norm = θ mod 360
Quy gọn rad:  θ_norm = θ mod 2π
\`\`\`

**Lưu ý**: \`mod\` toán học khác \`%\` trong nhiều ngôn ngữ lập trình. Toán: kết quả luôn ≥ 0. Lập trình (Go, C, Java): nếu đối số âm, kết quả cũng có thể âm. Phải tự "kéo lên" về dương.

Walk-through 4 ví dụ:

\`\`\`
(a) Quy gọn 450°:
    450 mod 360 = 450 − 360 = 90
    → 90°.   ✓

(b) Quy gọn -30°:
    -30 mod 360 = -30 + 360 = 330  (kéo về dương)
    → 330°.   ✓

(c) Quy gọn -210°:
    -210 + 360 = 150
    → 150°.   ✓

(d) Quy gọn 13π/4:
    Đổi sang dạng "k · 2π + phần dư":
    13π/4 = 12π/4 + π/4 = 3π + π/4 = 2π + π + π/4 = 2π + 5π/4
    → còn lại 5π/4. (đã ở [0, 2π)).
    → 5π/4 rad = 225°.   ✓
\`\`\`

Verify (d) bằng cách khác: \`13π/4 ÷ 2π = 13/8 = 1.625\`, phần nguyên = 1, vậy "trừ đi 1 vòng": \`13π/4 − 2π = 13π/4 − 8π/4 = 5π/4\`. ✓

### 6.4. Code Go: hàm \`normalizeAngle\`

(Chi tiết ở \`solutions.go\`. Đây là sketch.)

\`\`\`go
func normalizeAngle(rad float64) float64 {
    rad = math.Mod(rad, 2*math.Pi)
    if rad < 0 {
        rad += 2 * math.Pi
    }
    return rad
}
\`\`\`

Hai bước:

1. Dùng \`math.Mod(rad, 2π)\` để giảm về dải \`(−2π, 2π)\`. (Go's \`math.Mod\` giữ dấu của số bị chia.)
2. Nếu kết quả âm, cộng thêm \`2π\` để vào \`[0, 2π)\`.

#### ⚠ Lỗi thường gặp

> *"Em dùng \`rad % (2*math.Pi)\` trong Go nhưng compile lỗi."*

Đúng vậy — toán tử \`%\` trong Go **chỉ áp dụng cho số nguyên**. Với \`float64\`, phải dùng \`math.Mod()\`. Đây là khác biệt nhiều người mới Go vấp phải.

> *"Em thử \`math.Mod(-30, 360)\` mong ra \`330\`, nhưng ra \`-30\`."*

Vì \`math.Mod\` của Go (và \`fmod\` của C) trả lại số có cùng dấu với **số bị chia**. Phải kèm bước 2 \`if rad < 0 { rad += 2π }\`.

#### ❓ Câu hỏi tự nhiên: "Có cần quy gọn không? Sao máy tính không tự làm?"

\`math.Sin\`, \`math.Cos\` của Go **đã quy gọn ngầm bên trong** (dùng thuật toán argument reduction). Vì thế \`math.Sin(1000)\` vẫn ra kết quả đúng (sin của \`1000 mod 2π\`). Bạn không cần quy gọn trước khi gọi sin.

Tuy nhiên, **với góc rất lớn** (như \`1e10\`), việc quy gọn nội bộ mất độ chính xác do float precision (xem [Lesson 01 Tầng 1](../../Algebra/lesson-01-numbers/)). Khi đó nên tự \`normalizeAngle\` trước khi gọi sin/cos để giữ chính xác. Đây là tình huống ít gặp nhưng có thật trong mô phỏng vật lý/đồ hoạ.

### 🔁 Dừng lại tự kiểm tra (mục 6)

1. Quy gọn \`−450°\` về \`[0°, 360°)\`.
2. Quy gọn \`7π/3\` về \`[0, 2π)\`.
3. Có hai cách viết: \`−π/2\` hoặc \`3π/2\`. Khi nào nên dùng dạng nào?

<details>
<summary>Đáp án</summary>

1. \`−450° + 720° = 270°\` (cộng 2 vòng để vào dương rồi vào dải). Hoặc trực tiếp: \`−450 mod 360 = −90\`, cộng 360 → \`270°\`.
2. \`7π/3 = 6π/3 + π/3 = 2π + π/3\`. Quy gọn: \`π/3\`. (Trừ đi 1 vòng \`2π\`.)
3. Dùng \`−π/2\` khi muốn nhấn mạnh "quay xuôi 1/4 vòng" (vd trong cơ học, hướng quay quan trọng). Dùng \`3π/2\` khi đã quy gọn về \`[0, 2π)\` (vd để tra \`sin\`, \`cos\`). Hai cách viết cùng vị trí cuối.

</details>

### 📝 Tóm tắt mục 6

- Góc âm = quay xuôi kim đồng hồ. \`−θ ≡ 360° − θ\` (mod 360°).
- Góc > 360° = quay nhiều vòng. Quy gọn bằng \`mod 360°\` hoặc \`mod 2π\`.
- Go: \`math.Mod(rad, 2π)\` rồi xử lý nếu kết quả âm.
- \`math.Sin\`, \`math.Cos\` đã quy gọn ngầm — không cần \`normalize\` cho mục đích thông thường.

---

## 7. Vận tốc góc (angular velocity) — giới thiệu nhẹ

### 7.1. Định nghĩa

💡 **Trực giác**: vận tốc thường (\`v = dx/dt\`) đo "khoảng cách đi được mỗi đơn vị thời gian". Vận tốc **góc** (\`ω = dθ/dt\`) đo "góc quét được mỗi đơn vị thời gian". Cùng triết lý, đổi "khoảng cách" thành "góc".

\`\`\`
ω = dθ / dt   [rad/s]
\`\`\`

Ký hiệu \`ω\` (omega) — chữ Hy Lạp. Đơn vị thông dụng: \`rad/s\` (radian trên giây) hoặc \`°/s\` (độ trên giây).

(Ký hiệu \`dθ/dt\` là **đạo hàm** — Tầng 3 Calculus học chi tiết. Tạm hiểu là "góc thay đổi bao nhiêu mỗi đơn vị thời gian".)

### 7.2. Bốn ví dụ thực tế

| Vật quay | Vận tốc góc |
|----------|-------------|
| Kim giây đồng hồ (1 vòng / 60 giây) | \`ω = 2π/60 ≈ 0.105 rad/s\` |
| Kim phút đồng hồ (1 vòng / 3600 giây) | \`ω = 2π/3600 ≈ 0.001745 rad/s\` |
| Kim giờ đồng hồ (1 vòng / 43200 giây = 12h) | \`ω = 2π/43200 ≈ 1.454·10⁻⁴ rad/s\` |
| Trái đất tự quay (1 vòng / 86400 s = 24h) | \`ω = 2π/86400 ≈ 7.272·10⁻⁵ rad/s\` |

**Walk-through** kim phút:

\`\`\`
Kim phút đi 1 vòng = 2π rad
Thời gian: 1 giờ = 60 phút = 3600 giây
Vận tốc góc: ω = 2π / 3600 = π/1800 rad/s ≈ 0.001745 rad/s

Đổi sang độ/giây:
ω = 360° / 3600 s = 0.1°/s = 6°/phút
\`\`\`

### 7.3. Liên hệ với vận tốc dài

Một điểm trên đường tròn bán kính \`r\` chuyển động tròn đều có:

\`\`\`
v = ω · r    (vận tốc dài, m/s)
\`\`\`

💡 **Trực giác**: cùng vận tốc góc, điểm xa tâm đi nhanh hơn (vì phải quét cung dài hơn cho cùng 1 góc). Đây là lý do mép ngoài đĩa quay nhanh hơn tâm.

Ví dụ: bánh xe đạp bán kính \`r = 0.35 m\`, quay với \`ω = 10 rad/s\`:

\`\`\`
v = 10 · 0.35 = 3.5 m/s = 12.6 km/h
\`\`\`

#### ❓ Câu hỏi tự nhiên: "Sao phải dùng radian, không dùng độ?"

Công thức \`v = ω · r\` chỉ **đẹp** khi \`ω\` ở rad/s. Nếu \`ω\` ở °/s, phải nhân thêm \`π/180\`:

\`\`\`
v = ω° · r · π/180
\`\`\`

Lại "phụ thu" hệ số như mục 5. Vận tốc góc luôn ghi bằng \`rad/s\` trong vật lý.

### 7.4. Preview các tầng sau

- **Tầng 3 (Calculus)**: học chính thức về \`dθ/dt\`, vận tốc tức thời vs trung bình, gia tốc góc \`α = dω/dt\`.
- **Tầng 4 (Linear Algebra)**: ma trận xoay (rotation matrix) — góc theo thời gian dùng để mô phỏng vật quay trong 3D (robotics, đồ hoạ).
- **Tầng 6 (AI/ML)**: trong **RoPE** (Rotary Position Embedding của LLM), mỗi vị trí token được "xoay" bằng một góc tăng dần — y hệt vận tốc góc, chỉ thay "thời gian" bằng "vị trí token". Xem Lesson cuối Tầng 2 (RoPE preview).

### 🔁 Dừng lại tự kiểm tra (mục 7)

1. Một quạt trần quay 60 vòng/phút. Tính \`ω\` theo rad/s.
2. Bánh xe ô tô bán kính \`r = 0.3 m\` quay với \`ω = 30 rad/s\`. Vận tốc xe bao nhiêu km/h?

<details>
<summary>Đáp án</summary>

1. 60 vòng/phút = 1 vòng/giây = \`2π rad/s ≈ 6.283 rad/s\`.
2. \`v = ω · r = 30 · 0.3 = 9 m/s = 32.4 km/h\`.

</details>

### 📝 Tóm tắt mục 7

- \`ω = dθ/dt\` đo góc quét/giây, đơn vị \`rad/s\`.
- Liên hệ vận tốc dài: \`v = ω · r\`.
- Công thức chỉ đẹp khi dùng radian.
- Sẽ học sâu ở Tầng 3 (đạo hàm), ứng dụng ở Tầng 4 (rotation matrix) và Tầng 6 (RoPE).

---

## 8. Liên hệ với AI/ML và các tầng sau

### 8.1. Cosine similarity (Tầng 4)

Trong Tầng 4 (Linear Algebra), ta sẽ học **cosine similarity** — cách đo độ "giống nhau" của 2 vector:

\`\`\`
cos_sim(u, v) = cos(θ)   với θ là góc giữa u và v
\`\`\`

Để tính \`cos(θ)\` ta dùng \`math.Cos\` — và như mục 5 đã nói, hàm này nhận **radian**. Vì thế mọi pipeline embedding (Word2Vec, BERT, OpenAI Embeddings, ...) tính góc giữa hai vector ngầm dùng radian từ đầu tới cuối.

### 8.2. Position Encoding & RoPE (Tầng 6)

**Position encoding** trong Transformer:

\`\`\`
PE(pos, 2i)   = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
\`\`\`

Đối số \`pos / 10000^(...)\` là một số — được hiểu là **radian**. Nếu hiểu nhầm là độ, kết quả embedding sai hoàn toàn.

**RoPE (Rotary Position Embedding)** — kỹ thuật dùng trong LLaMA, ChatGLM, Mistral:

- Mỗi vị trí token \`pos\` được gán một **góc** \`θ_pos = pos · θ_base\`.
- Embedding tại vị trí đó được "xoay" trong mặt phẳng 2D một góc \`θ_pos\`.
- Xoay = nhân với \`[[cos θ, -sin θ], [sin θ, cos θ]]\` (ma trận xoay) — chi tiết ở Lesson 04, 05 tầng này.

Toàn bộ tính toán dùng radian.

### 8.3. Fourier Transform (Tầng 4)

Định lý Fourier: mọi tín hiệu tuần hoàn = tổng các sin/cos với tần số khác nhau:

\`\`\`
f(t) = Σ a_k · cos(k · ω · t) + b_k · sin(k · ω · t)
\`\`\`

\`ω\` là **tần số góc**, đơn vị \`rad/s\`. Lại radian. Ứng dụng: xử lý âm thanh, ảnh (\`fft2\`), nén MP3/JPEG, MFCC features cho speech-to-text.

### 8.4. Activation function & xoay trong 2D/3D

Một số kiến trúc neural network có **hàm kích hoạt sin/cos** (SIREN, NeRF) — hoạt động trên radian.

Trong **đồ hoạ 3D / Game / Robotics**: mọi rotation đều ghi bằng radian (Unity, Three.js, ROS, OpenGL). Khi convert giữa các hệ tọa độ, sai đơn vị độ ↔ radian = scene bị xoay sai hoàn toàn.

### 📝 Tóm tắt mục 8

- Mọi ứng dụng AI/ML/đồ hoạ dùng \`sin\`, \`cos\` đều cần radian.
- Cosine similarity, position encoding, RoPE, Fourier — đều radian.
- Hiểu sâu đơn vị góc = không bị lỗi khi triển khai các kỹ thuật trên.

---

## 9. Bài tập

> **Quy ước**: dùng \`π ≈ 3.14159\` khi cần số thập phân. Có thể giữ kết quả ở dạng phân số \`π\` nếu đẹp hơn.

### Bài 1 — Chuyển đổi 7 góc

Chuyển sang đơn vị còn lại:

(a) \`15°\`
(b) \`75°\`
(c) \`−120°\`
(d) \`420°\`
(e) \`π/12\` rad
(f) \`7π/6\` rad
(g) \`−3π/2\` rad

### Bài 2 — Cung và góc

Một cung trên đường tròn bán kính \`r = 4 cm\` có độ dài \`s = 5 cm\`. Tính góc ở tâm theo radian và theo độ.

### Bài 3 — Quy gọn góc

Quy gọn về \`[0°, 360°)\` hoặc \`[0, 2π)\`:

(a) \`750°\`
(b) \`−210°\`
(c) \`13π/4\`
(d) \`−7π/3\`

### Bài 4 — Hàm Go

Viết 3 hàm Go:

- \`deg2rad(deg float64) float64\`
- \`rad2deg(rad float64) float64\`
- \`normalizeAngle(rad float64) float64\` — đưa về \`[0, 2π)\`.

Test với 5 giá trị: \`0°, 90°, 180°, −90°, 720°\` (chuyển sang rad, normalize, đổi ngược lại).

### Bài 5 — Float precision

Trong Go, in ra \`math.Sin(math.Pi)\`. Kết quả là \`1.2246e-16\`, không phải \`0\` chính xác. Vì sao? Liên hệ với [Lesson 01 Tầng 1 — Số](../../Algebra/lesson-01-numbers/).

### Bài 6 — Vận tốc góc

Một chiếc đồng hồ analog tiêu chuẩn:

(a) Tính vận tốc góc của kim phút theo rad/s.
(b) Tính vận tốc góc của kim giây theo rad/s.
(c) Tỉ số \`ω_giây / ω_phút\` = ?

---

## 10. Lời giải chi tiết

### Bài 1

Công thức: \`deg → rad\`: nhân \`π/180\`. \`rad → deg\`: nhân \`180/π\`.

(a) **\`15°\` → rad**

\`\`\`
15 · π/180 = 15π/180 = π/12 rad ≈ 0.2618 rad
\`\`\`

(b) **\`75°\` → rad**

\`\`\`
75 · π/180 = 75π/180 = 5π/12 rad ≈ 1.3090 rad
\`\`\`

(c) **\`−120°\` → rad**

\`\`\`
−120 · π/180 = −120π/180 = −2π/3 rad ≈ −2.0944 rad
\`\`\`

(d) **\`420°\` → rad** (chú ý: 420 > 360, nhưng vẫn chuyển được như thường)

\`\`\`
420 · π/180 = 420π/180 = 7π/3 rad ≈ 7.3304 rad
(Có thể quy gọn: 7π/3 − 2π = 7π/3 − 6π/3 = π/3 ≈ 1.0472 rad)
\`\`\`

(e) **\`π/12\` → độ**

\`\`\`
π/12 · 180/π = 180/12 = 15°
\`\`\`

(f) **\`7π/6\` → độ**

\`\`\`
7π/6 · 180/π = 7 · 180/6 = 7 · 30 = 210°
\`\`\`

(g) **\`−3π/2\` → độ**

\`\`\`
−3π/2 · 180/π = −3 · 180/2 = −270°
\`\`\`

(Tương đương \`+90°\` nếu quy gọn về \`[0°, 360°)\`: \`−270° + 360° = 90°\`.)

### Bài 2

Định nghĩa radian: \`θ = s/r\`.

\`\`\`
θ = 5/4 = 1.25 rad
θ_deg = 1.25 · 180/π ≈ 1.25 · 57.2958 ≈ 71.62°
\`\`\`

Kiểm tra ngược: \`s = r · θ = 4 · 1.25 = 5 cm\`. ✓

### Bài 3

(a) **Quy gọn \`750°\`**:

\`\`\`
750 mod 360:
  750 - 360 = 390
  390 - 360 = 30
→ 30°.
\`\`\`

Hoặc: \`750 / 360 = 2.083\`, phần nguyên 2, vậy trừ 2 vòng: \`750 − 720 = 30°\`. ✓

(b) **Quy gọn \`−210°\`**:

\`\`\`
-210 < 0, cộng 360: -210 + 360 = 150
→ 150°.
\`\`\`

(c) **Quy gọn \`13π/4\`**:

\`\`\`
13π/4 = (8π + 5π)/4 = 2π + 5π/4
→ trừ đi 1 vòng (2π): còn 5π/4.
→ 5π/4 rad = 225°.
\`\`\`

(d) **Quy gọn \`−7π/3\`**:

\`\`\`
-7π/3 < 0, cộng 2π: -7π/3 + 2π = -7π/3 + 6π/3 = -π/3
Vẫn âm, cộng tiếp 2π: -π/3 + 2π = -π/3 + 6π/3 = 5π/3
→ 5π/3 rad = 300°.
\`\`\`

### Bài 4

Xem \`solutions.go\` cho code đầy đủ. Sketch:

\`\`\`go
const TwoPi = 2 * math.Pi

func deg2rad(deg float64) float64 {
    return deg * math.Pi / 180.0
}

func rad2deg(rad float64) float64 {
    return rad * 180.0 / math.Pi
}

func normalizeAngle(rad float64) float64 {
    r := math.Mod(rad, TwoPi)
    if r < 0 {
        r += TwoPi
    }
    return r
}
\`\`\`

Bảng test:

| Input độ | rad sau deg2rad | sau normalize | deg sau rad2deg |
|----------|------------------|----------------|------------------|
| \`0\` | \`0\` | \`0\` | \`0\` |
| \`90\` | \`π/2 ≈ 1.5708\` | \`1.5708\` | \`90\` |
| \`180\` | \`π ≈ 3.1416\` | \`3.1416\` | \`180\` |
| \`-90\` | \`-π/2 ≈ -1.5708\` | \`3π/2 ≈ 4.7124\` | \`270\` |
| \`720\` | \`4π ≈ 12.566\` | \`0\` (đúng 2 vòng) | \`0\` |

### Bài 5

\`math.Sin(math.Pi)\` trong Go in ra \`1.2246467991473515e-16\` (≈ \`1.22 · 10⁻¹⁶\`).

**Lý do**: \`math.Pi\` trong Go là **xấp xỉ float64** của \`π\`, không phải \`π\` chính xác:

\`\`\`
math.Pi = 3.141592653589793 (15-16 chữ số sau dấu phẩy)
π thực  = 3.141592653589793238... (vô hạn chữ số)
\`\`\`

Sai khác cỡ \`10⁻¹⁶\` (giới hạn float64, xem [Lesson 01 Tầng 1](../../Algebra/lesson-01-numbers/) mục về float precision).

Vì \`sin(π) = 0\` và đạo hàm \`sin'(π) = cos(π) = −1\`, nên:

\`\`\`
sin(math.Pi) ≈ sin(π) + (−1) · (math.Pi − π) = 0 + (math.Pi − π) ≈ 1.22 · 10⁻¹⁶
\`\`\`

(Áp dụng xấp xỉ tuyến tính — Tầng 3 Calculus sẽ học chính thức.)

**Cách hiểu thực dụng**: con số \`1.22e-16\` không phải "sin tính sai", mà là "máy tính không biểu diễn được \`π\` chính xác". Nếu muốn \`0\` chính xác, dùng \`math.Sin(0)\` hoặc kiểm tra \`if math.Abs(x) < 1e-10 { return 0 }\` sau khi tính sin.

### Bài 6

(a) Kim phút: 1 vòng = 1 giờ = 3600 giây.

\`\`\`
ω_phút = 2π / 3600 = π/1800 rad/s ≈ 1.745 · 10⁻³ rad/s
\`\`\`

(b) Kim giây: 1 vòng = 60 giây.

\`\`\`
ω_giây = 2π / 60 = π/30 rad/s ≈ 0.1047 rad/s
\`\`\`

(c) Tỉ số:

\`\`\`
ω_giây / ω_phút = (π/30) / (π/1800) = 1800/30 = 60
\`\`\`

Nghĩa là kim giây quay nhanh gấp 60 lần kim phút — hoàn toàn hợp lý vì kim giây xoay 1 vòng = thời gian kim phút xoay \`1/60\` vòng.

---

## Liên kết

- [solutions.go](./solutions.go) — code Go đầy đủ cho mọi hàm và bài tập.
- [visualization.html](./visualization.html) — minh hoạ tương tác (đường tròn đơn vị, chuyển đổi, demo \`sin\`).
- **Lesson tiếp theo**: [Lesson 02 — Tam giác vuông: sin, cos, tan](../lesson-02-right-triangle/) — định nghĩa 3 tỉ số lượng giác cơ bản và ứng dụng đầu tiên.
- **Tầng trước**: [Tầng 1 — Algebra](../../Algebra/).
- **Tầng này**: [Trigonometry — Tổng quan](../).
`;
