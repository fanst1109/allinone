// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/02-Trigonometry/lesson-01-angles/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Góc: độ và radian

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **góc** là gì về mặt hình học, và **đo góc** bằng những đại lượng nào.
- Phân biệt rõ **độ (degree)** và **radian** — hai đơn vị đo góc khác nhau.
- Thuộc lòng **bảng chuyển đổi** giữa các góc đặc biệt: $30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ, 180^\\circ, 270^\\circ, 360^\\circ$ $\\leftrightarrow$ $\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi$.
- Trả lời được câu hỏi *"vì sao toán học và Machine Learning luôn dùng radian, không dùng độ?"* — câu hỏi tưởng nhỏ nhưng là nguyên nhân số 1 gây lỗi khi mới học \`math.Sin\`, \`numpy.sin\`.
- **Quy gọn** được góc bất kỳ (âm, vượt $360^\\circ$, vượt $2\\pi$) về dải chuẩn $[0, 360^\\circ)$ hoặc $[0, 2\\pi)$.
- Hiểu khái niệm **vận tốc góc (angular velocity)** ở mức "giới thiệu, sẽ học sâu ở Tầng 3 Calculus".
- Tự tay viết được hàm Go \`deg2rad\`, \`rad2deg\`, \`normalizeAngle\` — bộ ba bạn sẽ tái sử dụng ở mọi lesson Trigonometry sau.

## Kiến thức tiền đề

- [Tầng 1 — Lesson 05: Hàm số](../../01-Algebra/lesson-05-functions/) — ý niệm \`f(x) = ...\` và "đầu vào → đầu ra".
- [Tầng 1 — Lesson 01: Số](../../01-Algebra/lesson-01-numbers/) — biết về số thực, số vô tỉ. Đặc biệt cần ý niệm **$\\pi$ là số vô tỉ $\\approx 3.14159\\ldots$** xuất phát từ tỉ số $\\frac{\\text{chu vi}}{\\text{đường kính}}$ của đường tròn.
- Phép cộng/trừ/nhân/chia số thực thông thường.

> **Ghi nhớ chính của cả bài**:
>
> Có **hai đơn vị đo góc**:
>
> 1. **Độ ($^\\circ$)** — quy ước "1 vòng $= 360^\\circ$" có gốc lịch sử từ Babylon. Tiện cho con người, nhưng là số "tùy ý".
> 2. **Radian (rad)** — đơn vị **tự nhiên** của góc: 1 radian = góc ở tâm chắn cung có độ dài bằng bán kính. 1 vòng $= 2\\pi$ rad.
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
- Phần "mở" giữa hai tia là góc, ký hiệu thường là $\\theta$ (theta), $\\alpha$, $\\beta$, hay $\\angle AOB$ (đỉnh $O$, hai tia đi qua $A$ và $B$).

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

Vì sao "ngược kim đồng hồ" lại là dương? Đó là quy ước, nhưng phù hợp với hệ trục $Oxy$ quen thuộc: từ trục $Ox$ (đông) quay ngược kim đồng hồ lên trục $Oy$ (bắc) — đó là chiều "tăng góc".

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

- Quay từ $Ox$ ngược kim đồng hồ tới $Oy$ $= +90^\\circ$.
- Quay từ $Ox$ xuôi kim đồng hồ tới $-Oy$ $= -90^\\circ$.
- $-90^\\circ$ và $+270^\\circ$ chỉ cùng một vị trí cuối (cả hai đều dừng ở $-Oy$), nhưng đường đi khác nhau (một bên quay ngắn xuôi kim, bên kia quay dài ngược kim).

#### ❓ Câu hỏi tự nhiên: "Vậy \`−90°\` và \`+270°\` có phải cùng một góc không?"

Nếu chỉ quan tâm **vị trí cuối** thì có — chúng kết thúc ở cùng một tia. Nhưng nếu quan tâm **đường đi** (xoay vật bao xa, hết bao nhiêu vòng) thì khác. Trong hầu hết bài toán hình học và Trig sơ cấp, ta **quy gọn** về $[0^\\circ, 360^\\circ)$ nên $-90^\\circ \\equiv 270^\\circ$. Trong cơ học (chuyển động quay) thì giữ nguyên dấu vì hướng quay quan trọng.

#### ⚠ Lỗi thường gặp

> *"Em tưởng $-30^\\circ$ là vô nghĩa — góc phải dương chứ?"*

Sai. Góc âm hoàn toàn hợp lệ, chỉ đơn giản nghĩa là "quay ngược chiều quy ước dương". Trong hệ trục tọa độ và lập trình đồ hoạ, góc âm dùng liên tục.

#### 🔁 Dừng lại tự kiểm tra (mục 1)

1. Vẽ góc $+45^\\circ$ và góc $-45^\\circ$ trên hệ trục $Oxy$. Chúng có đối xứng qua đâu không?
2. Trên đồng hồ, từ vị trí 12 quay tới vị trí 9 theo chiều ngược kim đồng hồ là góc bao nhiêu độ?
3. Một góc $90^\\circ$ quay thuận chiều kim đồng hồ ghi bằng số có dấu là bao nhiêu?

<details>
<summary>Đáp án</summary>

1. $+45^\\circ$ ở góc phần tư I (đông-bắc), $-45^\\circ$ ở góc phần tư IV (đông-nam). Chúng đối xứng qua trục $Ox$.
2. 12 → 9 theo chiều ngược kim đồng hồ: đi qua 11, 10, 9 = đi ngược 1/4 vòng $= +90^\\circ$. (Nếu đi thuận kim 12 → 1 → 2 → ... → 9 thì là $-270^\\circ$ hoặc tương đương $+90^\\circ$ mod $360^\\circ$.)
3. $-90^\\circ$.

</details>

### 📝 Tóm tắt mục 1

- Góc = hình tạo bởi 2 tia chung gốc, đo "lượng mở" giữa chúng.
- Quy ước: ngược kim đồng hồ $= +$, xuôi kim đồng hồ $= -$.
- Góc âm và góc > 1 vòng đều hợp lệ; có thể quy gọn về $[0, 360^\\circ)$.
- Đo góc cần **đơn vị** — đó là chủ đề các mục sau.

---

## 2. Đơn vị Độ (degree)

### 2.1. Quy ước "1 vòng = 360°"

💡 **Trực giác**: chia trọn 1 vòng quay thành **360 phần bằng nhau**, mỗi phần là $1^\\circ$ (1 độ). Vì sao 360? Vì người Babylon cổ đại dùng **hệ cơ số 60** (sexagesimal) — tới giờ ta vẫn thừa hưởng: 60 giây = 1 phút, 60 phút = 1 giờ, $360^\\circ$ = 1 vòng (gần với số ngày trong năm 365). Đây hoàn toàn là **lựa chọn lịch sử**, không phải toán học bắt buộc.

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
| $0^\\circ$ | Hai tia trùng nhau | Kim phút chỉ 12, kim giây cũng chỉ 12 |
| $30^\\circ$ | Một nửa của $60^\\circ$ | Kim giờ giữa 12 và 1 (1 giờ $= 30^\\circ$) |
| $45^\\circ$ | Nửa của góc vuông | Đường chéo hình vuông với cạnh |
| $60^\\circ$ | Hai cạnh của tam giác đều | Tam giác đều có 3 góc $60^\\circ$ |
| $90^\\circ$ | Góc vuông | Góc trong hình chữ nhật |
| $120^\\circ$ | Hai cạnh chia vòng làm 3 phần | Mỗi cánh của hình ngôi sao 3 cánh |
| $180^\\circ$ | Góc bẹt, hai tia ngược chiều | Đường thẳng |
| $270^\\circ$ | 3/4 vòng | (kim chỉ 9 từ vị trí 12, đi ngược kim) |
| $360^\\circ$ | Trọn 1 vòng | Quay về vị trí ban đầu |

### 2.2. Phân số nhỏ hơn 1°: phút và giây (giới thiệu)

Để đo góc chính xác hơn $1^\\circ$ (dùng trong thiên văn, hàng hải), người ta chia tiếp:

- $1^\\circ = 60'$ (60 phút góc, ký hiệu $'$, đọc là *minute*).
- $1' = 60''$ (60 giây góc, ký hiệu $''$, đọc là *second*).

Ví dụ: $12^\\circ 34' 56''$ đọc là "12 độ 34 phút 56 giây góc".

$$1^\\circ = 60' = 60 \\cdot 60'' = 3600''$$

Walk-through: chuyển $12^\\circ 34' 56''$ về độ thập phân.

$$\\begin{aligned}
12^\\circ 34' 56'' &= 12 + \\frac{34}{60} + \\frac{56}{3600} \\\\
                  &= 12 + 0.5667 + 0.01556 \\\\
                  &\\approx 12.5822^\\circ
\\end{aligned}$$

💡 **Trực giác**: phút và giây ở đây **không phải đơn vị thời gian** — chỉ mượn tên thôi. Đừng nhầm "giây góc" với "giây đồng hồ".

Trong khoá học này (và 99% bài ML/toán đại học) ta dùng **độ thập phân** (như $12.5822^\\circ$) chứ không dùng phút/giây. Mục này chỉ để bạn nhận ra khi đọc tài liệu thiên văn/hàng hải.

#### ❓ Câu hỏi tự nhiên: "Sao không chia thập phân cho gọn?"

Quy ước này có từ thời chưa có máy tính, và hệ 60 cho phép chia hết nhiều ước (60 chia hết cho 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 — rất tiện để chia bằng compa). Hệ thập phân chia kém hơn (10 chỉ chia hết cho 1, 2, 5, 10). Lý do giống y hệt vì sao 1 giờ = 60 phút chứ không phải 100 phút.

### 2.3. Bốn ví dụ cụ thể với đơn vị độ

| Tình huống | Góc tương ứng |
|------------|---------------|
| Đường chéo TV vs cạnh dài (16:9 $\\to \\arctan(9/16)$) | $\\approx 29.36^\\circ$ |
| Trục Trái Đất nghiêng so với mặt phẳng quỹ đạo | $\\approx 23.5^\\circ$ (lý do có mùa) |
| Góc tới của ánh sáng mặt trời lúc trưa hè ở xích đạo | $\\approx 90^\\circ$ (thẳng đỉnh đầu) |
| Vĩ độ Hà Nội (kinh tuyến gốc → cực) | $21.03^\\circ$ Bắc |

### #### ⚠ Lỗi thường gặp

> *"Em viết \`θ = 30\` trong Go, hàm \`math.Sin(θ)\` ra \`-0.988\`. Tại sao không phải \`0.5\`?"*

Vì Go (và mọi thư viện toán) hiểu \`30\` là **30 radian**, không phải 30 độ. $30$ rad $\\approx \\frac{30}{2\\pi} \\approx 4.77$ vòng, tức quay gần 5 vòng + đoạn lẻ — kết quả \`sin\` ra số "ngẫu nhiên" như \`-0.988\`. Trước khi gọi \`math.Sin\`, bạn **phải đổi sang radian** (xem mục 3, 4).

### 🔁 Dừng lại tự kiểm tra (mục 2)

1. $\\frac{1}{12}$ vòng = ? độ.
2. Một chiếc bánh pizza chia 8 miếng đều nhau, mỗi miếng có góc đỉnh = ? độ.
3. Quy đổi $5^\\circ 15'$ về độ thập phân.

<details>
<summary>Đáp án</summary>

1. $\\frac{360^\\circ}{12} = 30^\\circ$.
2. $\\frac{360^\\circ}{8} = 45^\\circ$.
3. $5 + \\frac{15}{60} = 5 + 0.25 = 5.25^\\circ$.

</details>

### 📝 Tóm tắt mục 2

- 1 vòng $= 360^\\circ$. Đây là **quy ước lịch sử** từ Babylon (cơ số 60), không phải toán học bắt buộc.
- Các giá trị cần thuộc: $30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ, 180^\\circ, 270^\\circ, 360^\\circ$.
- Có thể chia tiếp $1^\\circ = 60' = 3600''$ cho mục đích chính xác cao (thiên văn).
- Mọi thư viện máy tính (\`math.Sin\`, \`numpy.sin\`, ...) **không** nhận đầu vào là độ — nhận radian (mục 3).

---

## 3. Đơn vị Radian — đơn vị TỰ NHIÊN của góc

### 3.1. Cốt lõi: định nghĩa radian từ đường tròn

💡 **Trực giác**: Đơn vị "độ" ở mục 2 là tuỳ ý (chia vòng tròn ra 360 phần — số 360 không có lý do toán học sâu sắc). Có cách nào đo góc mà số không bị "lựa chọn tuỳ ý" không? Có — **dùng độ dài cung** chia cho **bán kính**. Đó chính là radian.

**Định nghĩa**: cho đường tròn bán kính $r$. Một góc $\\theta$ ở tâm chắn (cắt) một cung có độ dài $s$. Khi đó số đo radian của góc là:

$$\\theta = \\frac{s}{r} \\quad \\text{(rad)}$$

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

- Đường tròn bán kính $r = 1$. Cung dài $s = 1$. Khi đó $\\theta = \\frac{1}{1} = 1$ rad.
- Đường tròn bán kính $r = 5$. Cung dài $s = 5$. Khi đó $\\theta = \\frac{5}{5} = 1$ rad. **Cùng góc, cùng giá trị 1 rad** — bất kể bán kính.
- Đường tròn bán kính $r = 2$. Cung dài $s = 6$. Khi đó $\\theta = \\frac{6}{2} = 3$ rad.
- Đường tròn bán kính $r = 10$. Cung dài $s = 5$. Khi đó $\\theta = \\frac{5}{10} = 0.5$ rad.

💡 **Trực giác quan trọng**: số đo radian **không phụ thuộc bán kính** — chỉ phụ thuộc tỉ số $\\frac{\\text{cung}}{\\text{bán kính}}$. Đây là lý do nó được gọi là đơn vị "tự nhiên": góc không bị gán một con số tùy tiện như "360".

### 3.2. Tại sao 1 vòng = \`2π\` rad?

Chu vi đường tròn bán kính $r$ là $C = 2\\pi r$ (định nghĩa của $\\pi$). Đi trọn 1 vòng = cung dài bằng cả chu vi $= s = 2\\pi r$. Vậy số đo radian của góc 1 vòng:

$$\\theta_\\text{full} = \\frac{s}{r} = \\frac{2\\pi r}{r} = 2\\pi \\quad \\text{(rad)}$$

Như vậy:

$$\\begin{aligned}
1 \\text{ vòng} &= 360^\\circ = 2\\pi \\text{ rad} \\approx 6.283 \\text{ rad} \\\\
\\tfrac{1}{2} \\text{ vòng} &= 180^\\circ = \\pi \\text{ rad} \\approx 3.14159 \\text{ rad} \\\\
\\tfrac{1}{4} \\text{ vòng} &= 90^\\circ = \\tfrac{\\pi}{2} \\text{ rad} \\approx 1.5708 \\text{ rad} \\\\
\\tfrac{1}{6} \\text{ vòng} &= 60^\\circ = \\tfrac{\\pi}{3} \\text{ rad} \\approx 1.0472 \\text{ rad} \\\\
\\tfrac{1}{8} \\text{ vòng} &= 45^\\circ = \\tfrac{\\pi}{4} \\text{ rad} \\approx 0.7854 \\text{ rad} \\\\
\\tfrac{1}{12} \\text{ vòng} &= 30^\\circ = \\tfrac{\\pi}{6} \\text{ rad} \\approx 0.5236 \\text{ rad}
\\end{aligned}$$

### 3.3. "1 radian" bằng bao nhiêu độ?

Từ $2\\pi$ rad $= 360^\\circ$:

$$1 \\text{ rad} = \\frac{360^\\circ}{2\\pi} = \\frac{180^\\circ}{\\pi} \\approx 57.2958^\\circ$$

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

Hình dung: bạn lấy một sợi dây dài đúng bằng bán kính, đặt cong theo đường tròn — góc ở tâm quét bởi sợi dây đó là **1 rad** $\\approx 57.3^\\circ$. Có thể "đặt" được khoảng $2\\pi \\approx 6.28$ sợi dây như vậy mới đi trọn vòng.

### 3.4. Bốn ví dụ tính radian từ cung và bán kính

| Bán kính $r$ | Cung $s$ | Góc $\\theta = \\frac{s}{r}$ |
|--------------|----------|----------------|
| 1 m | 1 m | $1 \\text{ rad} \\approx 57.3^\\circ$ |
| 2 m | $\\pi$ m $\\approx 3.14$ m | $\\frac{\\pi}{2} \\text{ rad} = 90^\\circ$ |
| 4 cm | 5 cm | $1.25 \\text{ rad} \\approx 71.6^\\circ$ |
| 10 m | $2\\pi \\cdot 10 = 62.83$ m | $2\\pi \\text{ rad} = 360^\\circ$ (1 vòng) |

**Walk-through chi tiết ví dụ 3**: đường tròn $r = 4$ cm, cung $s = 5$ cm.

$$\\begin{aligned}
\\theta &= \\frac{s}{r} = \\frac{5}{4} = 1.25 \\text{ rad} \\\\
\\theta^\\circ &= 1.25 \\cdot \\frac{180}{\\pi} = 1.25 \\cdot 57.2958 \\approx 71.62^\\circ
\\end{aligned}$$

Verify ngược lại từ độ → cung:

$$s = r \\cdot \\theta = 4 \\cdot 1.25 = 5 \\text{ cm} \\quad \\checkmark$$

#### ❓ Câu hỏi tự nhiên: "Radian có đơn vị không? Sao nó 'không có thứ nguyên'?"

Để ý công thức $\\theta = \\frac{s}{r}$: cả $s$ và $r$ đều là **độ dài** (mét, cm, ...). Chia chúng cho nhau → đơn vị **triệt tiêu**, còn lại một con số "thuần". Vì thế radian được gọi là **dimensionless** (không thứ nguyên) — không có ký hiệu đơn vị bắt buộc kèm sau số.

Ví dụ: trong vật lý ta viết "góc quay là $2.5$ rad" hay đơn giản chỉ "$2.5$" — cả hai đều đúng. Khi viết \`sin(0.5)\` trong Go mà không kèm "rad", hệ thống vẫn ngầm hiểu đó là radian. Đây cũng là **lý do** radian là đơn vị tự nhiên: khi vào công thức toán, không cần "phụ thu" hệ số chuyển đổi như độ phải làm.

#### ❓ Câu hỏi tự nhiên: "Vì sao nhiều khi viết \`π/6\` thay vì \`0.5236\`?"

Vì:

1. **Chính xác tuyệt đối**: $\\frac{\\pi}{6}$ là giá trị chính xác, $0.5236$ chỉ là xấp xỉ (làm tròn 4 chữ số).
2. **Dễ thấy quan hệ**: $\\frac{\\pi}{6}$ cho biết ngay đó là $30^\\circ$ (1/6 nửa vòng). Còn $0.5236$ thì phải tính ngược mới biết.
3. **Quan trọng với các góc đặc biệt $30^\\circ / 45^\\circ / 60^\\circ / 90^\\circ$** — chúng cho \`sin\`, \`cos\` ra giá trị **đẹp** ($\\frac{1}{2}$, $\\frac{\\sqrt{2}}{2}$, $\\frac{\\sqrt{3}}{2}$, $1$). Sẽ học kỹ ở Lesson 02.

### 🔁 Dừng lại tự kiểm tra (mục 3)

1. Đường tròn bán kính $r = 3$ m, cung dài $s = 6$ m. Tính góc ở tâm theo radian và độ.
2. Đường tròn bán kính $r = 2$. Cung dài bao nhiêu để góc ở tâm là $\\frac{\\pi}{4}$ rad?
3. Vì sao 1 vòng đầy đủ là $2\\pi$ rad mà không phải $\\pi$ rad hay $3\\pi$ rad?

<details>
<summary>Đáp án</summary>

1. $\\theta = \\frac{6}{3} = 2$ rad. Đổi sang độ: $2 \\cdot \\frac{180}{\\pi} \\approx 114.59^\\circ$.
2. $s = r \\cdot \\theta = 2 \\cdot \\frac{\\pi}{4} = \\frac{\\pi}{2} \\approx 1.5708$.
3. Vì chu vi đường tròn bán kính $r$ là $2\\pi r$ (định nghĩa của $\\pi$). Khi đi trọn vòng, cung dài = chu vi $= 2\\pi r$, nên $\\theta = \\frac{2\\pi r}{r} = 2\\pi$. Không liên quan đến lựa chọn tùy ý, đây là hệ quả trực tiếp của $\\pi$.

</details>

### 📝 Tóm tắt mục 3

- Radian $= \\frac{\\text{cung}}{\\text{bán kính}}$ — đơn vị **tự nhiên**, không phụ thuộc bán kính.
- 1 vòng $= 2\\pi$ rad $\\approx 6.283$ rad. 1 rad $\\approx 57.3^\\circ$.
- Các giá trị cần thuộc: $\\frac{\\pi}{6} = 30^\\circ$, $\\frac{\\pi}{4} = 45^\\circ$, $\\frac{\\pi}{3} = 60^\\circ$, $\\frac{\\pi}{2} = 90^\\circ$, $\\pi = 180^\\circ$, $2\\pi = 360^\\circ$.
- Radian "không có thứ nguyên" → công thức toán không cần hệ số phụ.

---

## 4. Công thức chuyển đổi độ ↔ radian

### 4.1. Hai công thức cốt lõi

Từ $2\\pi$ rad $= 360^\\circ$, chia hai vế cho 360:

$$1^\\circ = \\frac{2\\pi}{360} = \\frac{\\pi}{180} \\text{ rad}$$

Và chia hai vế cho $2\\pi$:

$$1 \\text{ rad} = \\frac{360}{2\\pi} = \\frac{180}{\\pi} \\approx 57.2958^\\circ$$

Hai công thức tổng quát:

$$\\begin{aligned}
\\theta_\\text{rad} &= \\theta_\\text{deg} \\cdot \\frac{\\pi}{180} \\\\
\\theta_\\text{deg} &= \\theta_\\text{rad} \\cdot \\frac{180}{\\pi}
\\end{aligned}$$

💡 **Trực giác để nhớ**: nhân với $\\frac{\\pi}{180}$ để **vào radian** (vì $\\pi$ ở "phía radian"), nhân với $\\frac{180}{\\pi}$ để **về độ** (vì $180$ ở "phía độ"). Hay lẫn? Hãy nhớ: kết quả $1^\\circ$ là số **nhỏ** (vì độ là đơn vị "nhỏ" hơn radian) → công thức $\\frac{\\pi}{180}$ cho ra giá trị xấp xỉ $0.01745$ cho $1^\\circ$ → đúng.

### 4.2. Walk-through chuyển đổi 9 giá trị quen thuộc

| Độ | Tính $\\theta_\\text{rad} = \\theta_\\text{deg} \\cdot \\frac{\\pi}{180}$ | Radian (dạng đẹp) | Radian (thập phân) |
|----|------------------------------|---------------------|---------------------|
| $0^\\circ$ | $0 \\cdot \\frac{\\pi}{180} = 0$ | $0$ | $0$ |
| $30^\\circ$ | $30 \\cdot \\frac{\\pi}{180} = \\frac{\\pi}{6}$ | $\\frac{\\pi}{6}$ | $0.5236$ |
| $45^\\circ$ | $45 \\cdot \\frac{\\pi}{180} = \\frac{45\\pi}{180} = \\frac{\\pi}{4}$ | $\\frac{\\pi}{4}$ | $0.7854$ |
| $60^\\circ$ | $60 \\cdot \\frac{\\pi}{180} = \\frac{60\\pi}{180} = \\frac{\\pi}{3}$ | $\\frac{\\pi}{3}$ | $1.0472$ |
| $90^\\circ$ | $90 \\cdot \\frac{\\pi}{180} = \\frac{\\pi}{2}$ | $\\frac{\\pi}{2}$ | $1.5708$ |
| $120^\\circ$ | $120 \\cdot \\frac{\\pi}{180} = \\frac{120\\pi}{180} = \\frac{2\\pi}{3}$ | $\\frac{2\\pi}{3}$ | $2.0944$ |
| $180^\\circ$ | $180 \\cdot \\frac{\\pi}{180} = \\pi$ | $\\pi$ | $3.1416$ |
| $270^\\circ$ | $270 \\cdot \\frac{\\pi}{180} = \\frac{270\\pi}{180} = \\frac{3\\pi}{2}$ | $\\frac{3\\pi}{2}$ | $4.7124$ |
| $360^\\circ$ | $360 \\cdot \\frac{\\pi}{180} = 2\\pi$ | $2\\pi$ | $6.2832$ |

**Walk-through một ô**: $60^\\circ \\to ?$ rad.

$$\\begin{aligned}
60^\\circ &= 60 \\cdot \\frac{\\pi}{180} \\\\
         &= \\frac{60\\pi}{180} \\quad \\text{(rút gọn: chia tử và mẫu cho 60)} \\\\
         &= \\frac{\\pi}{3} \\\\
         &\\approx \\frac{3.14159}{3} \\\\
         &\\approx 1.0472 \\text{ rad}
\\end{aligned}$$

Verify ngược (radian → độ):

$$1.0472 \\text{ rad} \\cdot \\frac{180}{\\pi} = 1.0472 \\cdot 57.2958 \\approx 60^\\circ \\quad \\checkmark$$

### 4.3. Walk-through chuyển ngược radian → độ

| Radian | Tính $\\theta_\\text{deg} = \\theta_\\text{rad} \\cdot \\frac{180}{\\pi}$ | Độ |
|--------|------------------------------|----|
| $\\frac{\\pi}{6}$ | $\\frac{\\pi}{6} \\cdot \\frac{180}{\\pi} = \\frac{180}{6}$ | $30^\\circ$ |
| $\\frac{\\pi}{4}$ | $\\frac{\\pi}{4} \\cdot \\frac{180}{\\pi} = \\frac{180}{4}$ | $45^\\circ$ |
| $\\frac{\\pi}{3}$ | $\\frac{\\pi}{3} \\cdot \\frac{180}{\\pi} = \\frac{180}{3}$ | $60^\\circ$ |
| $\\frac{\\pi}{2}$ | $\\frac{\\pi}{2} \\cdot \\frac{180}{\\pi} = \\frac{180}{2}$ | $90^\\circ$ |
| $\\pi$ | $\\pi \\cdot \\frac{180}{\\pi} = 180$ | $180^\\circ$ |
| $\\frac{3\\pi}{2}$ | $\\frac{3\\pi}{2} \\cdot \\frac{180}{\\pi} = 3 \\cdot 90$ | $270^\\circ$ |
| $2\\pi$ | $2\\pi \\cdot \\frac{180}{\\pi} = 360$ | $360^\\circ$ |
| $1$ (rad) | $1 \\cdot \\frac{180}{\\pi} \\approx 57.296$ | $\\approx 57.296^\\circ$ |

💡 **Mẹo nhớ bảng**: nhìn vào mẫu số của radian — đó là tỉ lệ chia của $180^\\circ$:

$$\\begin{aligned}
\\tfrac{\\pi}{6} &\\to \\tfrac{180}{6} = 30^\\circ \\\\
\\tfrac{\\pi}{4} &\\to \\tfrac{180}{4} = 45^\\circ \\\\
\\tfrac{\\pi}{3} &\\to \\tfrac{180}{3} = 60^\\circ \\\\
\\tfrac{\\pi}{2} &\\to \\tfrac{180}{2} = 90^\\circ \\\\
\\tfrac{\\pi}{1} &\\to \\tfrac{180}{1} = 180^\\circ
\\end{aligned}$$

Khi tử có hệ số khác (vd $\\frac{2\\pi}{3}$): tính như $\\frac{2 \\cdot 180}{3} = \\frac{360}{3} = 120^\\circ$.

### 4.4. Bảng tổng hợp các góc đặc biệt (PHẢI THUỘC)

Đây là bảng bạn sẽ tra đi tra lại trong cả 3 tầng tiếp theo (Trigonometry, Calculus, Linear Algebra). Đáng thuộc lòng từ giờ:

| Độ | Radian | $\\sin\\theta$ (xem trước Lesson 02) | $\\cos\\theta$ (xem trước Lesson 02) |
|----|--------|--------------------------------|--------------------------------|
| $0^\\circ$ | $0$ | $0$ | $1$ |
| $30^\\circ$ | $\\frac{\\pi}{6}$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ |
| $45^\\circ$ | $\\frac{\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}$ |
| $60^\\circ$ | $\\frac{\\pi}{3}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2}$ |
| $90^\\circ$ | $\\frac{\\pi}{2}$ | $1$ | $0$ |
| $120^\\circ$ | $\\frac{2\\pi}{3}$ | $\\frac{\\sqrt{3}}{2}$ | $-\\frac{1}{2}$ |
| $135^\\circ$ | $\\frac{3\\pi}{4}$ | $\\frac{\\sqrt{2}}{2}$ | $-\\frac{\\sqrt{2}}{2}$ |
| $150^\\circ$ | $\\frac{5\\pi}{6}$ | $\\frac{1}{2}$ | $-\\frac{\\sqrt{3}}{2}$ |
| $180^\\circ$ | $\\pi$ | $0$ | $-1$ |
| $270^\\circ$ | $\\frac{3\\pi}{2}$ | $-1$ | $0$ |
| $360^\\circ$ | $2\\pi$ | $0$ | $1$ |

Cột \`sin\`, \`cos\` chỉ là **preview**; chi tiết ở Lesson 02 và 03.

#### ❓ Câu hỏi tự nhiên: "Có cần thuộc lòng cả 9 ô chuyển đổi không?"

Không nhất thiết — nhưng nên thuộc **trục chính** ($0, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ, 180^\\circ, 360^\\circ$) và biết suy ra từ đó. Vd $120^\\circ = 180^\\circ - 60^\\circ = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}$. Hoặc $270^\\circ = 180^\\circ + 90^\\circ = \\pi + \\frac{\\pi}{2} = \\frac{3\\pi}{2}$. Cộng/trừ phân số $\\pi$ là kỹ năng cốt lõi mà bạn sẽ luyện ở Lesson 03 (đường tròn đơn vị).

#### ⚠ Lỗi thường gặp

> *"Em viết $30^\\circ \\to 30 \\cdot \\frac{180}{\\pi}$ ra $\\approx 1718$, sai số rất lớn."*

Bạn dùng **nhầm công thức**: $\\theta_\\text{deg} \\to \\theta_\\text{rad}$ phải nhân với $\\frac{\\pi}{180}$, không phải $\\frac{180}{\\pi}$. Mẹo phòng tránh: kết quả radian của góc nhỏ ($30^\\circ$) **phải nhỏ hơn** số độ rất nhiều ($30^\\circ \\approx 0.52$ rad). Nếu ra $1718$ thì biết ngay sai chiều.

### 🔁 Dừng lại tự kiểm tra (mục 4)

1. $15^\\circ$ = bao nhiêu radian (dạng phân số $\\pi$ và dạng thập phân)?
2. $\\frac{5\\pi}{4}$ rad = bao nhiêu độ?
3. $1.5$ rad $\\approx$ bao nhiêu độ?

<details>
<summary>Đáp án</summary>

1. $15^\\circ = 15 \\cdot \\frac{\\pi}{180} = \\frac{15\\pi}{180} = \\frac{\\pi}{12} \\approx 0.2618$ rad.
2. $\\frac{5\\pi}{4} \\cdot \\frac{180}{\\pi} = \\frac{5 \\cdot 180}{4} = \\frac{900}{4} = 225^\\circ$.
3. $1.5 \\cdot \\frac{180}{\\pi} \\approx 1.5 \\cdot 57.2958 \\approx 85.94^\\circ$.

</details>

### 📝 Tóm tắt mục 4

- $\\theta_\\text{rad} = \\theta_\\text{deg} \\cdot \\frac{\\pi}{180}$. $\\theta_\\text{deg} = \\theta_\\text{rad} \\cdot \\frac{180}{\\pi}$.
- 9 cặp giá trị đặc biệt cần thuộc ($0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ, 120^\\circ, 180^\\circ, 270^\\circ, 360^\\circ$).
- Mẹo: mẫu số $\\frac{\\pi}{n}$ ↔ chia $\\frac{180^\\circ}{n}$. Tử số hệ số nhân thẳng.
- Sai chiều công thức là lỗi phổ thông nhất — kiểm tra bằng thử nhanh $30^\\circ \\approx 0.52$ rad.

---

## 5. Vì sao toán học và ML LUÔN dùng radian?

Đây là mục **bắt buộc hiểu** vì nó là nguyên nhân số 1 gây bug khi mới học lập trình toán/ML. Nếu bạn còn nghĩ "độ và radian chỉ là hai cách viết khác nhau, dùng cái nào cũng được" — đọc mục này.

### 5.1. Lý do 1: Đạo hàm \`sin\` chỉ ĐẸP khi dùng radian

(Tầng 3 sẽ học sâu về đạo hàm. Ở đây chỉ cần biết kết luận.)

Nếu $x$ ở **radian**, thì:

$$\\begin{aligned}
\\frac{d}{dx}[\\sin x] &= \\cos x \\\\
\\frac{d}{dx}[\\cos x] &= -\\sin x
\\end{aligned}$$

Đây là công thức đẹp nhất trong giải tích, là nền cho **mọi tính toán liên quan đến dao động, sóng, mạng neural có hàm kích hoạt sinusoidal** (vd RoPE, Fourier features).

Nếu $x$ ở **độ**, thì:

$$\\frac{d}{dx}[\\sin x^\\circ] = \\frac{\\pi}{180} \\cdot \\cos x^\\circ$$

Mỗi lần lấy đạo hàm ta phải mang theo hệ số $\\frac{\\pi}{180} \\approx 0.01745$. Lấy đạo hàm bậc 2:

$$\\frac{d^2}{dx^2}[\\sin x^\\circ] = \\left(\\frac{\\pi}{180}\\right)^2 \\cdot (-\\sin x^\\circ)$$

Hệ số dính lằng nhằng mãi. Người ta chọn radian để các hệ số này **biến mất**.

💡 **Trực giác**: radian được "thiết kế" sao cho ở góc rất nhỏ, $\\sin\\theta \\approx \\theta$. Hằng số 1 ở vị trí "tỉ lệ" → đạo hàm sạch. Còn $1^\\circ = 0.01745$ rad → tỉ lệ không bằng 1 → kéo theo hệ số phụ vào đạo hàm.

### 5.2. Lý do 2: Khai triển Taylor đẹp khi dùng radian

(Cũng thuộc Tầng 3 — chỉ xem trước.)

Với $x$ ở radian:

$$\\begin{aligned}
\\sin x &= x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\frac{x^7}{5040} + \\cdots \\\\
\\cos x &= 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\frac{x^6}{720} + \\cdots
\\end{aligned}$$

Cho $x$ rất nhỏ ($x \\to 0$): $\\sin x \\approx x$. Thử với $x = 0.1$ rad:

$$\\begin{aligned}
\\sin(0.1) \\text{ thực tế} &\\approx 0.099833 \\\\
\\text{Xấp xỉ: } 0.1 - \\frac{0.001}{6} &= 0.1 - 0.000167 \\approx 0.099833 \\quad \\checkmark
\\end{aligned}$$

Khít tới 5 chữ số sau dấu phẩy. Đây là cơ sở để máy tính tính \`sin\` cực nhanh — chỉ cần vài phép cộng nhân, không cần lập bảng.

Nếu dùng độ, công thức trên không còn đúng — ta phải nhân $x$ với $\\frac{\\pi}{180}$ trước. Bất tiện và mất đẹp.

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

$$\\begin{aligned}
30 \\text{ rad} \\bmod 2\\pi &= 30 - 4 \\cdot (2\\pi) = 30 - 25.133 \\approx 4.867 \\text{ rad} \\\\
4.867 \\text{ rad} &\\approx 4.867 \\cdot \\frac{180}{\\pi} \\approx 278.87^\\circ \\\\
\\sin(278.87^\\circ) &= \\sin(360^\\circ - 81.13^\\circ) = -\\sin(81.13^\\circ) \\approx -0.988
\\end{aligned}$$

Đó là lý do ra \`-0.988\` — không phải bug Go, mà là bạn đưa 30 rad chứ không phải $30^\\circ$.

⚠ **Lỗi thường gặp** (lặp lại vì cực phổ biến): **Quên đổi độ sang radian** trước khi gọi \`math.Sin\`. Sai khoảng 57 lần (vì $1$ rad $\\approx 57^\\circ$).

#### ❓ Câu hỏi tự nhiên: "Tại sao Go không có \`math.SinDeg(x)\` cho tiện?"

Vì:

1. Triết lý "một cách đúng": thư viện chuẩn ép bạn dùng radian — tránh nhầm lẫn (nếu có cả hai, sẽ có người gọi nhầm).
2. Trong code thật bạn hiếm khi viết góc dưới dạng độ — embedding, gradient, vector rotation đều đã ở radian từ đầu.
3. Đổi đơn vị là 1 dòng code (\`x * math.Pi / 180\`) — không đáng có hàm riêng.

Nếu bạn dùng nhiều, viết hàm helper \`deg2rad\` trong project (xem \`solutions.go\`).

### 5.4. Lý do 4: Công thức vật lý/cơ học đơn giản hơn

Vận tốc góc, lực hướng tâm, dao động điều hoà — tất cả công thức vật lý chuẩn dùng radian:

$$\\begin{aligned}
\\omega \\text{ (vận tốc góc)} &= \\frac{d\\theta}{dt} \\quad \\text{với } \\theta \\text{ ở rad} \\\\
v \\text{ (vận tốc dài)} &= \\omega \\cdot r
\\end{aligned}$$

Nếu $\\theta$ ở độ, phải nhân hệ số $\\frac{\\pi}{180}$ vào mọi công thức → mất đẹp.

### 🔁 Dừng lại tự kiểm tra (mục 5)

1. Sửa đoạn code Go sau cho đúng (mong muốn in ra \`0.5\`):
   \`\`\`go
   x := 30.0
   fmt.Println(math.Sin(x))
   \`\`\`
2. Bạn nhập \`math.Cos(180)\` vào Go. Ra số nào? Vì sao **không** phải $-1$?

<details>
<summary>Đáp án</summary>

1. Đổi \`x\` sang radian trước khi gọi \`Sin\`:
   \`\`\`go
   x := 30.0 * math.Pi / 180   // hoặc dùng hàm deg2rad
   fmt.Println(math.Sin(x))    // ≈ 0.5
   \`\`\`
   Cách khác — gọi với hằng số đã ở radian: \`math.Sin(math.Pi/6)\`.

2. \`math.Cos(180)\` $= \\cos(180 \\text{ rad})$. $180$ rad $\\approx 180 \\cdot 57.296$ không phải vậy — đúng hơn: $180 \\text{ rad} \\bmod 2\\pi = 180 - 28 \\cdot (2\\pi) = 180 - 175.929 = 4.071 \\text{ rad} \\approx 233.2^\\circ$. $\\cos(233.2^\\circ) \\approx -0.598$. Không phải $-1$ vì Go hiểu 180 là rad, không phải độ.

</details>

### 📝 Tóm tắt mục 5

- Radian là đơn vị tự nhiên: $(\\sin x)' = \\cos x$ chỉ đúng khi $x$ ở radian.
- Khai triển Taylor $\\sin x \\approx x - \\frac{x^3}{6} + \\cdots$ cần $x$ ở radian.
- **MỌI thư viện toán/ML đều nhận radian, không nhận độ**.
- Quên đổi đơn vị → sai khoảng 57 lần, không phải sai vài %.

---

## 6. Góc âm và góc lớn hơn 360°

### 6.1. Góc âm: quay xuôi kim đồng hồ

💡 **Trực giác**: nếu góc dương là "quay ngược kim đồng hồ thêm $\\theta$", thì góc âm là "quay xuôi kim đồng hồ $\\theta$". Cùng một đích, nhưng đi hướng ngược.

- $+45^\\circ$: từ $Ox$ quay ngược kim đồng hồ $\\to$ góc phần tư I.
- $-45^\\circ$: từ $Ox$ quay xuôi kim đồng hồ $\\to$ góc phần tư IV.

Tương đương: $-\\theta$ và $+(360^\\circ - \\theta)$ cùng kết thúc ở một tia. Ví dụ $-30^\\circ \\equiv 330^\\circ$ (cùng vị trí cuối).

Bốn ví dụ:

| Góc âm | Tương đương dương (mod $360^\\circ$) |
|--------|--------------------------------|
| $-30^\\circ$ | $330^\\circ$ |
| $-90^\\circ$ | $270^\\circ$ |
| $-180^\\circ$ | $180^\\circ$ (góc bẹt, dù dấu nào cũng cùng vị trí) |
| $-\\frac{2\\pi}{3}$ rad | $2\\pi - \\frac{2\\pi}{3} = \\frac{4\\pi}{3}$ rad $= 240^\\circ$ |

### 6.2. Góc lớn hơn 360°: quay nhiều vòng

Khi xoay một vật quay tròn (bánh xe, kim đồng hồ, chong chóng), nó có thể quay > 1 vòng. Lúc đó số đo góc tự nhiên vượt $360^\\circ$.

Bốn ví dụ:

| Góc | Phân tích | Vị trí cuối ($\\equiv$ ?) |
|-----|-----------|--------------------|
| $450^\\circ$ | $360^\\circ + 90^\\circ$ (1 vòng $+ 90^\\circ$) | $90^\\circ$ |
| $720^\\circ$ | $2 \\cdot 360^\\circ$ (đúng 2 vòng) | $0^\\circ$ |
| $1000^\\circ$ | $2 \\cdot 360^\\circ + 280^\\circ$ | $280^\\circ$ |
| $5\\pi$ rad | $2 \\cdot 2\\pi + \\pi$ (2 vòng $+ \\pi$) | $\\pi$ rad $= 180^\\circ$ |

### 6.3. Quy gọn góc: phép \`mod\`

**Quy gọn** = đưa góc về dải chuẩn $[0^\\circ, 360^\\circ)$ hoặc $[0, 2\\pi)$ để dễ so sánh, vẽ, tính sin/cos.

$$\\begin{aligned}
\\text{Quy gọn độ:} \\quad \\theta_\\text{norm} &= \\theta \\bmod 360 \\\\
\\text{Quy gọn rad:} \\quad \\theta_\\text{norm} &= \\theta \\bmod 2\\pi
\\end{aligned}$$

**Lưu ý**: \`mod\` toán học khác \`%\` trong nhiều ngôn ngữ lập trình. Toán: kết quả luôn $\\geq 0$. Lập trình (Go, C, Java): nếu đối số âm, kết quả cũng có thể âm. Phải tự "kéo lên" về dương.

Walk-through 4 ví dụ:

$$\\begin{aligned}
\\text{(a) Quy gọn } 450^\\circ: \\quad & 450 \\bmod 360 = 450 - 360 = 90 \\to 90^\\circ \\quad \\checkmark \\\\
\\text{(b) Quy gọn } -30^\\circ: \\quad & -30 \\bmod 360 = -30 + 360 = 330 \\text{ (kéo về dương)} \\to 330^\\circ \\quad \\checkmark \\\\
\\text{(c) Quy gọn } -210^\\circ: \\quad & -210 + 360 = 150 \\to 150^\\circ \\quad \\checkmark \\\\
\\text{(d) Quy gọn } \\tfrac{13\\pi}{4}: \\quad & \\tfrac{13\\pi}{4} = \\tfrac{12\\pi}{4} + \\tfrac{\\pi}{4} = 3\\pi + \\tfrac{\\pi}{4} = 2\\pi + \\pi + \\tfrac{\\pi}{4} = 2\\pi + \\tfrac{5\\pi}{4} \\\\
& \\to \\text{còn lại } \\tfrac{5\\pi}{4} \\text{ (đã ở } [0, 2\\pi)) \\to \\tfrac{5\\pi}{4} \\text{ rad} = 225^\\circ \\quad \\checkmark
\\end{aligned}$$

Verify (d) bằng cách khác: $\\frac{13\\pi}{4} \\div 2\\pi = \\frac{13}{8} = 1.625$, phần nguyên $= 1$, vậy "trừ đi 1 vòng": $\\frac{13\\pi}{4} - 2\\pi = \\frac{13\\pi}{4} - \\frac{8\\pi}{4} = \\frac{5\\pi}{4}$. $\\checkmark$

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

1. Dùng \`math.Mod(rad, 2π)\` để giảm về dải $(-2\\pi, 2\\pi)$. (Go's \`math.Mod\` giữ dấu của số bị chia.)
2. Nếu kết quả âm, cộng thêm $2\\pi$ để vào $[0, 2\\pi)$.

#### ⚠ Lỗi thường gặp

> *"Em dùng \`rad % (2*math.Pi)\` trong Go nhưng compile lỗi."*

Đúng vậy — toán tử \`%\` trong Go **chỉ áp dụng cho số nguyên**. Với \`float64\`, phải dùng \`math.Mod()\`. Đây là khác biệt nhiều người mới Go vấp phải.

> *"Em thử \`math.Mod(-30, 360)\` mong ra \`330\`, nhưng ra \`-30\`."*

Vì \`math.Mod\` của Go (và \`fmod\` của C) trả lại số có cùng dấu với **số bị chia**. Phải kèm bước 2 \`if rad < 0 { rad += 2π }\`.

#### ❓ Câu hỏi tự nhiên: "Có cần quy gọn không? Sao máy tính không tự làm?"

\`math.Sin\`, \`math.Cos\` của Go **đã quy gọn ngầm bên trong** (dùng thuật toán argument reduction). Vì thế \`math.Sin(1000)\` vẫn ra kết quả đúng (sin của $1000 \\bmod 2\\pi$). Bạn không cần quy gọn trước khi gọi sin.

Tuy nhiên, **với góc rất lớn** (như $10^{10}$), việc quy gọn nội bộ mất độ chính xác do float precision (xem [Lesson 01 Tầng 1](../../01-Algebra/lesson-01-numbers/)). Khi đó nên tự \`normalizeAngle\` trước khi gọi sin/cos để giữ chính xác. Đây là tình huống ít gặp nhưng có thật trong mô phỏng vật lý/đồ hoạ.

### 🔁 Dừng lại tự kiểm tra (mục 6)

1. Quy gọn $-450^\\circ$ về $[0^\\circ, 360^\\circ)$.
2. Quy gọn $\\frac{7\\pi}{3}$ về $[0, 2\\pi)$.
3. Có hai cách viết: $-\\frac{\\pi}{2}$ hoặc $\\frac{3\\pi}{2}$. Khi nào nên dùng dạng nào?

<details>
<summary>Đáp án</summary>

1. $-450^\\circ + 720^\\circ = 270^\\circ$ (cộng 2 vòng để vào dương rồi vào dải). Hoặc trực tiếp: $-450 \\bmod 360 = -90$, cộng 360 $\\to 270^\\circ$.
2. $\\frac{7\\pi}{3} = \\frac{6\\pi}{3} + \\frac{\\pi}{3} = 2\\pi + \\frac{\\pi}{3}$. Quy gọn: $\\frac{\\pi}{3}$. (Trừ đi 1 vòng $2\\pi$.)
3. Dùng $-\\frac{\\pi}{2}$ khi muốn nhấn mạnh "quay xuôi 1/4 vòng" (vd trong cơ học, hướng quay quan trọng). Dùng $\\frac{3\\pi}{2}$ khi đã quy gọn về $[0, 2\\pi)$ (vd để tra \`sin\`, \`cos\`). Hai cách viết cùng vị trí cuối.

</details>

### 📝 Tóm tắt mục 6

- Góc âm = quay xuôi kim đồng hồ. $-\\theta \\equiv 360^\\circ - \\theta$ (mod $360^\\circ$).
- Góc $> 360^\\circ$ = quay nhiều vòng. Quy gọn bằng mod $360^\\circ$ hoặc mod $2\\pi$.
- Go: \`math.Mod(rad, 2π)\` rồi xử lý nếu kết quả âm.
- \`math.Sin\`, \`math.Cos\` đã quy gọn ngầm — không cần \`normalize\` cho mục đích thông thường.

---

## 7. Vận tốc góc (angular velocity) — giới thiệu nhẹ

### 7.1. Định nghĩa

💡 **Trực giác**: vận tốc thường ($v = \\frac{dx}{dt}$) đo "khoảng cách đi được mỗi đơn vị thời gian". Vận tốc **góc** ($\\omega = \\frac{d\\theta}{dt}$) đo "góc quét được mỗi đơn vị thời gian". Cùng triết lý, đổi "khoảng cách" thành "góc".

$$\\omega = \\frac{d\\theta}{dt} \\quad [\\text{rad/s}]$$

Ký hiệu $\\omega$ (omega) — chữ Hy Lạp. Đơn vị thông dụng: rad/s (radian trên giây) hoặc $^\\circ$/s (độ trên giây).

(Ký hiệu $\\frac{d\\theta}{dt}$ là **đạo hàm** — Tầng 3 Calculus học chi tiết. Tạm hiểu là "góc thay đổi bao nhiêu mỗi đơn vị thời gian".)

### 7.2. Bốn ví dụ thực tế

| Vật quay | Vận tốc góc |
|----------|-------------|
| Kim giây đồng hồ (1 vòng / 60 giây) | $\\omega = \\frac{2\\pi}{60} \\approx 0.105$ rad/s |
| Kim phút đồng hồ (1 vòng / 3600 giây) | $\\omega = \\frac{2\\pi}{3600} \\approx 0.001745$ rad/s |
| Kim giờ đồng hồ (1 vòng / 43200 giây = 12h) | $\\omega = \\frac{2\\pi}{43200} \\approx 1.454 \\cdot 10^{-4}$ rad/s |
| Trái đất tự quay (1 vòng / 86400 s = 24h) | $\\omega = \\frac{2\\pi}{86400} \\approx 7.272 \\cdot 10^{-5}$ rad/s |

**Walk-through** kim phút:

$$\\begin{aligned}
\\text{Kim phút đi 1 vòng} &= 2\\pi \\text{ rad} \\\\
\\text{Thời gian: 1 giờ} &= 60 \\text{ phút} = 3600 \\text{ giây} \\\\
\\omega &= \\frac{2\\pi}{3600} = \\frac{\\pi}{1800} \\text{ rad/s} \\approx 0.001745 \\text{ rad/s} \\\\
\\text{Đổi sang độ/giây: } \\omega &= \\frac{360^\\circ}{3600 \\text{ s}} = 0.1^\\circ/\\text{s} = 6^\\circ/\\text{phút}
\\end{aligned}$$

### 7.3. Liên hệ với vận tốc dài

Một điểm trên đường tròn bán kính $r$ chuyển động tròn đều có:

$$v = \\omega \\cdot r \\quad \\text{(vận tốc dài, m/s)}$$

💡 **Trực giác**: cùng vận tốc góc, điểm xa tâm đi nhanh hơn (vì phải quét cung dài hơn cho cùng 1 góc). Đây là lý do mép ngoài đĩa quay nhanh hơn tâm.

Ví dụ: bánh xe đạp bán kính $r = 0.35$ m, quay với $\\omega = 10$ rad/s:

$$v = 10 \\cdot 0.35 = 3.5 \\text{ m/s} = 12.6 \\text{ km/h}$$

#### ❓ Câu hỏi tự nhiên: "Sao phải dùng radian, không dùng độ?"

Công thức $v = \\omega \\cdot r$ chỉ **đẹp** khi $\\omega$ ở rad/s. Nếu $\\omega$ ở $^\\circ$/s, phải nhân thêm $\\frac{\\pi}{180}$:

$$v = \\omega^\\circ \\cdot r \\cdot \\frac{\\pi}{180}$$

Lại "phụ thu" hệ số như mục 5. Vận tốc góc luôn ghi bằng rad/s trong vật lý.

### 7.4. Preview các tầng sau

- **Tầng 3 (Calculus)**: học chính thức về $\\frac{d\\theta}{dt}$, vận tốc tức thời vs trung bình, gia tốc góc $\\alpha = \\frac{d\\omega}{dt}$.
- **Tầng 4 (Linear Algebra)**: ma trận xoay (rotation matrix) — góc theo thời gian dùng để mô phỏng vật quay trong 3D (robotics, đồ hoạ).
- **Tầng 6 (AI/ML)**: trong **RoPE** (Rotary Position Embedding của LLM), mỗi vị trí token được "xoay" bằng một góc tăng dần — y hệt vận tốc góc, chỉ thay "thời gian" bằng "vị trí token". Xem Lesson cuối Tầng 2 (RoPE preview).

### 🔁 Dừng lại tự kiểm tra (mục 7)

1. Một quạt trần quay 60 vòng/phút. Tính $\\omega$ theo rad/s.
2. Bánh xe ô tô bán kính $r = 0.3$ m quay với $\\omega = 30$ rad/s. Vận tốc xe bao nhiêu km/h?

<details>
<summary>Đáp án</summary>

1. 60 vòng/phút = 1 vòng/giây $= 2\\pi$ rad/s $\\approx 6.283$ rad/s.
2. $v = \\omega \\cdot r = 30 \\cdot 0.3 = 9$ m/s $= 32.4$ km/h.

</details>

### 📝 Tóm tắt mục 7

- $\\omega = \\frac{d\\theta}{dt}$ đo góc quét/giây, đơn vị rad/s.
- Liên hệ vận tốc dài: $v = \\omega \\cdot r$.
- Công thức chỉ đẹp khi dùng radian.
- Sẽ học sâu ở Tầng 3 (đạo hàm), ứng dụng ở Tầng 4 (rotation matrix) và Tầng 6 (RoPE).

---

## 8. Liên hệ với AI/ML và các tầng sau

### 8.1. Cosine similarity (Tầng 4)

Trong Tầng 4 (Linear Algebra), ta sẽ học **cosine similarity** — cách đo độ "giống nhau" của 2 vector:

$$\\text{cos\\_sim}(u, v) = \\cos(\\theta) \\quad \\text{với } \\theta \\text{ là góc giữa } u \\text{ và } v$$

Để tính $\\cos(\\theta)$ ta dùng \`math.Cos\` — và như mục 5 đã nói, hàm này nhận **radian**. Vì thế mọi pipeline embedding (Word2Vec, BERT, OpenAI Embeddings, ...) tính góc giữa hai vector ngầm dùng radian từ đầu tới cuối.

### 8.2. Position Encoding & RoPE (Tầng 6)

**Position encoding** trong Transformer:

$$\\begin{aligned}
PE(\\text{pos}, 2i)   &= \\sin\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right) \\\\
PE(\\text{pos}, 2i+1) &= \\cos\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)
\\end{aligned}$$

Đối số $\\frac{\\text{pos}}{10000^{(\\ldots)}}$ là một số — được hiểu là **radian**. Nếu hiểu nhầm là độ, kết quả embedding sai hoàn toàn.

**RoPE (Rotary Position Embedding)** — kỹ thuật dùng trong LLaMA, ChatGLM, Mistral:

- Mỗi vị trí token $\\text{pos}$ được gán một **góc** $\\theta_\\text{pos} = \\text{pos} \\cdot \\theta_\\text{base}$.
- Embedding tại vị trí đó được "xoay" trong mặt phẳng 2D một góc $\\theta_\\text{pos}$.
- Xoay = nhân với $\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$ (ma trận xoay) — chi tiết ở Lesson 04, 05 tầng này.

Toàn bộ tính toán dùng radian.

### 8.3. Fourier Transform (Tầng 4)

Định lý Fourier: mọi tín hiệu tuần hoàn = tổng các sin/cos với tần số khác nhau:

$$f(t) = \\sum_k a_k \\cdot \\cos(k \\cdot \\omega \\cdot t) + b_k \\cdot \\sin(k \\cdot \\omega \\cdot t)$$

$\\omega$ là **tần số góc**, đơn vị rad/s. Lại radian. Ứng dụng: xử lý âm thanh, ảnh (\`fft2\`), nén MP3/JPEG, MFCC features cho speech-to-text.

### 8.4. Activation function & xoay trong 2D/3D

Một số kiến trúc neural network có **hàm kích hoạt sin/cos** (SIREN, NeRF) — hoạt động trên radian.

Trong **đồ hoạ 3D / Game / Robotics**: mọi rotation đều ghi bằng radian (Unity, Three.js, ROS, OpenGL). Khi convert giữa các hệ tọa độ, sai đơn vị độ ↔ radian = scene bị xoay sai hoàn toàn.

### 📝 Tóm tắt mục 8

- Mọi ứng dụng AI/ML/đồ hoạ dùng \`sin\`, \`cos\` đều cần radian.
- Cosine similarity, position encoding, RoPE, Fourier — đều radian.
- Hiểu sâu đơn vị góc = không bị lỗi khi triển khai các kỹ thuật trên.

---

## 9. Bài tập

> **Quy ước**: dùng $\\pi \\approx 3.14159$ khi cần số thập phân. Có thể giữ kết quả ở dạng phân số $\\pi$ nếu đẹp hơn.

### Bài 1 — Chuyển đổi 7 góc

Chuyển sang đơn vị còn lại:

(a) $15^\\circ$
(b) $75^\\circ$
(c) $-120^\\circ$
(d) $420^\\circ$
(e) $\\frac{\\pi}{12}$ rad
(f) $\\frac{7\\pi}{6}$ rad
(g) $-\\frac{3\\pi}{2}$ rad

### Bài 2 — Cung và góc

Một cung trên đường tròn bán kính $r = 4$ cm có độ dài $s = 5$ cm. Tính góc ở tâm theo radian và theo độ.

### Bài 3 — Quy gọn góc

Quy gọn về $[0^\\circ, 360^\\circ)$ hoặc $[0, 2\\pi)$:

(a) $750^\\circ$
(b) $-210^\\circ$
(c) $\\frac{13\\pi}{4}$
(d) $-\\frac{7\\pi}{3}$

### Bài 4 — Hàm Go

Viết 3 hàm Go:

- \`deg2rad(deg float64) float64\`
- \`rad2deg(rad float64) float64\`
- \`normalizeAngle(rad float64) float64\` — đưa về \`[0, 2π)\`.

Test với 5 giá trị: $0^\\circ, 90^\\circ, 180^\\circ, -90^\\circ, 720^\\circ$ (chuyển sang rad, normalize, đổi ngược lại).

### Bài 5 — Float precision

Trong Go, in ra \`math.Sin(math.Pi)\`. Kết quả là \`1.2246e-16\`, không phải \`0\` chính xác. Vì sao? Liên hệ với [Lesson 01 Tầng 1 — Số](../../01-Algebra/lesson-01-numbers/).

### Bài 6 — Vận tốc góc

Một chiếc đồng hồ analog tiêu chuẩn:

(a) Tính vận tốc góc của kim phút theo rad/s.
(b) Tính vận tốc góc của kim giây theo rad/s.
(c) Tỉ số $\\frac{\\omega_\\text{giây}}{\\omega_\\text{phút}}$ = ?

---

## 10. Lời giải chi tiết

### Bài 1

Công thức: deg → rad: nhân $\\frac{\\pi}{180}$. rad → deg: nhân $\\frac{180}{\\pi}$.

(a) **$15^\\circ \\to$ rad**

$$15 \\cdot \\frac{\\pi}{180} = \\frac{15\\pi}{180} = \\frac{\\pi}{12} \\text{ rad} \\approx 0.2618 \\text{ rad}$$

(b) **$75^\\circ \\to$ rad**

$$75 \\cdot \\frac{\\pi}{180} = \\frac{75\\pi}{180} = \\frac{5\\pi}{12} \\text{ rad} \\approx 1.3090 \\text{ rad}$$

(c) **$-120^\\circ \\to$ rad**

$$-120 \\cdot \\frac{\\pi}{180} = -\\frac{120\\pi}{180} = -\\frac{2\\pi}{3} \\text{ rad} \\approx -2.0944 \\text{ rad}$$

(d) **$420^\\circ \\to$ rad** (chú ý: 420 > 360, nhưng vẫn chuyển được như thường)

$$\\begin{aligned}
420 \\cdot \\frac{\\pi}{180} &= \\frac{420\\pi}{180} = \\frac{7\\pi}{3} \\text{ rad} \\approx 7.3304 \\text{ rad} \\\\
\\text{(quy gọn: } \\tfrac{7\\pi}{3} - 2\\pi &= \\tfrac{7\\pi}{3} - \\tfrac{6\\pi}{3} = \\tfrac{\\pi}{3} \\approx 1.0472 \\text{ rad)}
\\end{aligned}$$

(e) **$\\frac{\\pi}{12} \\to$ độ**

$$\\frac{\\pi}{12} \\cdot \\frac{180}{\\pi} = \\frac{180}{12} = 15^\\circ$$

(f) **$\\frac{7\\pi}{6} \\to$ độ**

$$\\frac{7\\pi}{6} \\cdot \\frac{180}{\\pi} = \\frac{7 \\cdot 180}{6} = 7 \\cdot 30 = 210^\\circ$$

(g) **$-\\frac{3\\pi}{2} \\to$ độ**

$$-\\frac{3\\pi}{2} \\cdot \\frac{180}{\\pi} = -\\frac{3 \\cdot 180}{2} = -270^\\circ$$

(Tương đương $+90^\\circ$ nếu quy gọn về $[0^\\circ, 360^\\circ)$: $-270^\\circ + 360^\\circ = 90^\\circ$.)

### Bài 2

Định nghĩa radian: $\\theta = \\frac{s}{r}$.

$$\\begin{aligned}
\\theta &= \\frac{5}{4} = 1.25 \\text{ rad} \\\\
\\theta_\\text{deg} &= 1.25 \\cdot \\frac{180}{\\pi} \\approx 1.25 \\cdot 57.2958 \\approx 71.62^\\circ
\\end{aligned}$$

Kiểm tra ngược: $s = r \\cdot \\theta = 4 \\cdot 1.25 = 5$ cm. $\\checkmark$

### Bài 3

(a) **Quy gọn $750^\\circ$**:

$$\\begin{aligned}
750 \\bmod 360: \\quad & 750 - 360 = 390 \\\\
& 390 - 360 = 30 \\\\
& \\to 30^\\circ
\\end{aligned}$$

Hoặc: $\\frac{750}{360} = 2.083$, phần nguyên 2, vậy trừ 2 vòng: $750 - 720 = 30^\\circ$. $\\checkmark$

(b) **Quy gọn $-210^\\circ$**:

$$-210 < 0, \\text{ cộng } 360: \\quad -210 + 360 = 150 \\to 150^\\circ$$

(c) **Quy gọn $\\frac{13\\pi}{4}$**:

$$\\begin{aligned}
\\frac{13\\pi}{4} &= \\frac{8\\pi + 5\\pi}{4} = 2\\pi + \\frac{5\\pi}{4} \\\\
&\\to \\text{trừ đi 1 vòng } (2\\pi): \\text{ còn } \\frac{5\\pi}{4} \\\\
&\\to \\frac{5\\pi}{4} \\text{ rad} = 225^\\circ
\\end{aligned}$$

(d) **Quy gọn $-\\frac{7\\pi}{3}$**:

$$\\begin{aligned}
-\\tfrac{7\\pi}{3} < 0, \\text{ cộng } 2\\pi: \\quad & -\\tfrac{7\\pi}{3} + 2\\pi = -\\tfrac{7\\pi}{3} + \\tfrac{6\\pi}{3} = -\\tfrac{\\pi}{3} \\\\
\\text{Vẫn âm, cộng tiếp } 2\\pi: \\quad & -\\tfrac{\\pi}{3} + 2\\pi = -\\tfrac{\\pi}{3} + \\tfrac{6\\pi}{3} = \\tfrac{5\\pi}{3} \\\\
& \\to \\tfrac{5\\pi}{3} \\text{ rad} = 300^\\circ
\\end{aligned}$$

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
| $0$ | $0$ | $0$ | $0$ |
| $90$ | $\\frac{\\pi}{2} \\approx 1.5708$ | $1.5708$ | $90$ |
| $180$ | $\\pi \\approx 3.1416$ | $3.1416$ | $180$ |
| $-90$ | $-\\frac{\\pi}{2} \\approx -1.5708$ | $\\frac{3\\pi}{2} \\approx 4.7124$ | $270$ |
| $720$ | $4\\pi \\approx 12.566$ | $0$ (đúng 2 vòng) | $0$ |

### Bài 5

\`math.Sin(math.Pi)\` trong Go in ra \`1.2246467991473515e-16\` ($\\approx 1.22 \\cdot 10^{-16}$).

**Lý do**: \`math.Pi\` trong Go là **xấp xỉ float64** của $\\pi$, không phải $\\pi$ chính xác:

$$\\begin{aligned}
\\texttt{math.Pi} &= 3.141592653589793 \\quad \\text{(15-16 chữ số sau dấu phẩy)} \\\\
\\pi \\text{ thực} &= 3.141592653589793238\\ldots \\quad \\text{(vô hạn chữ số)}
\\end{aligned}$$

Sai khác cỡ $10^{-16}$ (giới hạn float64, xem [Lesson 01 Tầng 1](../../01-Algebra/lesson-01-numbers/) mục về float precision).

Vì $\\sin(\\pi) = 0$ và đạo hàm $\\sin'(\\pi) = \\cos(\\pi) = -1$, nên:

$$\\sin(\\texttt{math.Pi}) \\approx \\sin(\\pi) + (-1) \\cdot (\\texttt{math.Pi} - \\pi) = 0 + (\\texttt{math.Pi} - \\pi) \\approx 1.22 \\cdot 10^{-16}$$

(Áp dụng xấp xỉ tuyến tính — Tầng 3 Calculus sẽ học chính thức.)

**Cách hiểu thực dụng**: con số \`1.22e-16\` không phải "sin tính sai", mà là "máy tính không biểu diễn được $\\pi$ chính xác". Nếu muốn \`0\` chính xác, dùng \`math.Sin(0)\` hoặc kiểm tra \`if math.Abs(x) < 1e-10 { return 0 }\` sau khi tính sin.

### Bài 6

(a) Kim phút: 1 vòng = 1 giờ = 3600 giây.

$$\\omega_\\text{phút} = \\frac{2\\pi}{3600} = \\frac{\\pi}{1800} \\text{ rad/s} \\approx 1.745 \\cdot 10^{-3} \\text{ rad/s}$$

(b) Kim giây: 1 vòng = 60 giây.

$$\\omega_\\text{giây} = \\frac{2\\pi}{60} = \\frac{\\pi}{30} \\text{ rad/s} \\approx 0.1047 \\text{ rad/s}$$

(c) Tỉ số:

$$\\frac{\\omega_\\text{giây}}{\\omega_\\text{phút}} = \\frac{\\pi/30}{\\pi/1800} = \\frac{1800}{30} = 60$$

Nghĩa là kim giây quay nhanh gấp 60 lần kim phút — hoàn toàn hợp lý vì kim giây xoay 1 vòng = thời gian kim phút xoay $\\frac{1}{60}$ vòng.

---

## Liên kết

- [solutions.go](./solutions.go) — code Go đầy đủ cho mọi hàm và bài tập.
- [visualization.html](./visualization.html) — minh hoạ tương tác (đường tròn đơn vị, chuyển đổi, demo \`sin\`).
- **Lesson tiếp theo**: [Lesson 02 — Tam giác vuông: sin, cos, tan](../lesson-02-right-triangle/) — định nghĩa 3 tỉ số lượng giác cơ bản và ứng dụng đầu tiên.
- **Tầng trước**: [Tầng 1 — Algebra](../../01-Algebra/).
- **Tầng này**: [Trigonometry — Tổng quan](../).
`;
