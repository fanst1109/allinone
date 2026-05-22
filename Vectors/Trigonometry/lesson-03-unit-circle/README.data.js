// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Trigonometry/lesson-03-unit-circle/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đường tròn đơn vị (Unit Circle)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **đường tròn đơn vị** (unit circle) là gì và vì sao nó là công cụ chuẩn để mở rộng \`sin\`, \`cos\`, \`tan\` ra mọi góc.
- Trả lời được những câu hỏi mà Lesson 02 còn bỏ ngỏ: *"\`sin 150°\` là gì? \`cos(-45°)\` là gì? \`sin 720°\` thì sao?"*
- Thuộc tọa độ của **12 góc đặc biệt** trên đường tròn đơn vị (0°, 30°, 45°, 60°, 90°, ... 360°).
- Biết dấu của \`sin\`, \`cos\`, \`tan\` trong **4 quadrant** (góc tư) và mnemonic "All Students Take Calculus".
- Áp dụng **công thức quy gọn (reduction formulas)** để chuyển góc bất kỳ về góc nhọn quen thuộc.
- Hiểu khái niệm **góc tham chiếu (reference angle)** và quy trình 3 bước để tính \`sin/cos\` của góc bất kỳ.
- Liên hệ tới **positional encoding** của Transformer — sin/cos với tần số khác nhau chính là các điểm quay trên đường tròn đơn vị.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác vuông, SOH-CAH-TOA](../lesson-02-right-triangle/): biết \`sin = đối/huyền\`, \`cos = kề/huyền\`, \`tan = đối/kề\` cho **góc nhọn**.
- [Lesson 01 — Góc và radian](../lesson-01-angles/): biết đổi giữa độ và radian, \`180° = π rad\`, \`360° = 2π rad\`.
- Từ Algebra Tầng 1: phương trình đường tròn \`x² + y² = r²\` (xem [Algebra/lesson-07-systems](../../Algebra/) nếu cần).
- Định lý Pythagoras: \`a² + b² = c²\` trong tam giác vuông.

> **Bức tranh lớn của cả bài**: ở Lesson 02 ta định nghĩa \`sin/cos/tan\` chỉ cho **góc nhọn trong tam giác vuông**. Đó là một định nghĩa hẹp — không nói gì về \`sin 150°\`, \`cos(-30°)\`, \`sin 720°\`. Bài này thay định nghĩa "tam giác" bằng định nghĩa "đường tròn đơn vị": **\`(cos θ, sin θ)\` là tọa độ của điểm P trên đường tròn bán kính 1 sau khi quay góc θ ngược chiều kim đồng hồ**. Với định nghĩa mới, mọi góc thực đều có sin và cos — kể cả âm, kể cả lớn hơn 360°.

---

## 1. Vấn đề: định nghĩa Lesson 02 quá hẹp

### 1.1. Nhắc lại định nghĩa tam giác

Ở Lesson 02 ta nói: trong tam giác vuông có một góc nhọn \`θ\` (tức \`0° < θ < 90°\`), với cạnh **đối** = đối diện góc \`θ\`, cạnh **kề** = liền kề \`θ\`, cạnh **huyền** = đối diện góc vuông:

\`\`\`
sin θ = đối / huyền
cos θ = kề / huyền
tan θ = đối / kề
\`\`\`

Quy ước "SOH-CAH-TOA". Đây là định nghĩa rất trực quan — nó hoạt động hoàn hảo cho góc nhọn.

### 1.2. Những câu hỏi mà định nghĩa cũ không trả lời được

Hãy thử áp dụng định nghĩa tam giác cho các góc dưới đây:

- **\`sin 150°\` = ?** Tam giác nào có một góc \`150°\`? Không có — tổng 3 góc trong tam giác là \`180°\`, mà nếu một góc đã là \`150°\` thì hai góc còn lại tổng chỉ \`30°\`, không thể có góc vuông (\`90°\`) trong đó. Vậy "tam giác vuông có góc nhọn \`150°\`" **không tồn tại**. Định nghĩa tam giác **chịu thua** ở đây.
- **\`cos(-45°)\` = ?** Góc âm có nghĩa là gì trong tam giác? Tam giác không có góc âm. Định nghĩa tam giác **không nói gì** về góc âm.
- **\`sin 720°\` = ?** \`720°\` = quay hai vòng tròn. Trong tam giác, góc nhọn không thể bằng \`720°\`. **Không định nghĩa**.
- **\`tan 90°\` = ?** Tam giác vuông có một góc \`90°\` — nhưng đó là góc vuông, **không phải góc nhọn**. Nếu thử cho \`θ = 90°\` trong "tam giác vuông có góc nhọn \`90°\`" — vô lý ngay (tổng góc đã > 180°).

→ Định nghĩa tam giác **chỉ hoạt động cho** \`0° < θ < 90°\` (góc nhọn ngặt). Mọi góc khác đều "ngoài vùng phủ sóng".

💡 **Tại sao điều này quan trọng?** Trong thực tế (vật lý, đồ họa máy tính, ML), góc xuất hiện ở mọi giá trị:

- Vật chuyển động tròn: góc tăng đều theo thời gian, vượt \`360°\` là chuyện bình thường (quay vòng thứ 2, thứ 3...).
- Quay vector trong 2D/3D: thường biểu diễn bằng ma trận \`[[cos θ, -sin θ], [sin θ, cos θ]]\` — phải hoạt động với mọi \`θ\`, không chỉ góc nhọn.
- Positional encoding trong Transformer (sẽ học mục 10): \`sin(pos / 10000^(2i/d))\` với \`pos\` chạy từ 0 tới nhiều nghìn — góc cực lớn.

Cần **một định nghĩa tổng quát** áp dụng cho mọi \`θ ∈ ℝ\`. Đó là **đường tròn đơn vị**.

#### 📝 Tóm tắt mục 1

- Định nghĩa tam giác chỉ áp dụng cho góc nhọn \`0° < θ < 90°\`.
- Mọi góc khác (góc tù, góc bẹt, góc âm, góc > 360°) đều không có nghĩa trong khung tam giác.
- Cần định nghĩa tổng quát hơn — đó là **đường tròn đơn vị** ở mục tiếp theo.

---

## 2. Đường tròn đơn vị — định nghĩa mới

### 2.1. Đường tròn đơn vị là gì?

💡 **Trực giác trước**: vẽ một đường tròn tâm tại gốc tọa độ \`O = (0, 0)\` với bán kính bằng \`1\`. Đó là **đường tròn đơn vị** (unit circle). Mọi điểm \`P\` trên đường tròn này có tọa độ \`(x, y)\` thỏa mãn:

\`\`\`
x² + y² = 1
\`\`\`

Đây là phương trình đường tròn tâm \`O\`, bán kính \`1\` (suy ra từ định lý Pythagoras: khoảng cách từ \`O\` tới \`(x, y)\` là \`√(x² + y²) = 1\`).

ASCII vẽ:

\`\`\`
                  y
                  ↑
              · · · · ·                       
          ·               ·                   
        ·                   ·                 
       ·         (0,1)       ·                
      ·            ●          ·               
      ·                       ·               
      ·                       ·               
(-1,0)●─────────● ●──────────●(1,0) → x       
      ·         O=(0,0)      ·                
      ·                       ·               
      ·                       ·               
       ·          ●          ·                
        ·       (0,-1)      ·                 
          ·               ·                   
              · · · · ·                       
\`\`\`

Bốn điểm "trục":

- \`(1, 0)\`: bên phải, góc \`0°\`.
- \`(0, 1)\`: trên đỉnh, góc \`90°\`.
- \`(-1, 0)\`: bên trái, góc \`180°\`.
- \`(0, -1)\`: dưới đáy, góc \`270°\`.

### 2.2. Chọn một điểm và đo góc

Bây giờ chọn một điểm \`P\` bất kỳ trên đường tròn đơn vị. Vẽ bán kính \`OP\` (đoạn thẳng từ tâm tới \`P\`).

**Quy ước đo góc**:

- Góc \`θ\` = góc mà bán kính \`OP\` tạo với **trục \`Ox\` dương** (phần dương của trục hoành, đi sang phải).
- Đo **ngược chiều kim đồng hồ** (counter-clockwise): từ \`Ox+\` xoay lên trên là góc dương.
- Đo cùng chiều kim đồng hồ: góc âm.

\`\`\`
                  y
                  ↑
              · · · · ·
          ·     P=(x,y)
        ·       ●           
       ·       ╱·           
      ·       ╱  ·          
      ·      ╱    ·         
      ·    OP     ·         
      ·    ╱θ     ·         
──────●───●─────────●─────→ x
   (-1,0) O    Ox+ (1,0)    
      ·      ╲    ·         
       ·      ╲ ·           
        ·              ·    
          ·               · 
              · · · · ·     
\`\`\`

Góc \`θ\` ở đây là góc giữa \`OP\` và \`Ox+\`.

### 2.3. Định nghĩa mới của sin và cos

Đây là điểm then chốt:

> **Cho góc \`θ\` (bất kỳ, độ hoặc radian), đặt \`P\` là điểm trên đường tròn đơn vị sao cho bán kính \`OP\` tạo với \`Ox+\` góc \`θ\` (đo ngược chiều kim đồng hồ).**
>
> **Khi đó**:
> - \`cos θ = x_P\` (tọa độ hoành của \`P\`)
> - \`sin θ = y_P\` (tọa độ tung của \`P\`)

Tức là \`P = (cos θ, sin θ)\`. Đó là tất cả.

💡 **Trực giác**: hình dung \`P\` như một con kiến bò trên đường tròn. Khi \`θ\` tăng, con kiến quay ngược chiều kim đồng hồ. Tại bất kỳ thời điểm nào, \`cos θ\` là vị trí "ngang" của nó và \`sin θ\` là vị trí "dọc". Quay đủ một vòng (\`θ = 360°\`) thì kiến về chỗ cũ → \`sin\` và \`cos\` lặp lại.

**Tan θ** vẫn định nghĩa qua tỉ số:

\`\`\`
tan θ = sin θ / cos θ = y_P / x_P
\`\`\`

(không xác định khi \`cos θ = 0\`, tức tại \`θ = 90°, 270°, ...\`).

### 2.4. Bốn ví dụ trực tiếp từ định nghĩa

Trước khi học bảng đặc biệt, ta áp dụng định nghĩa cho 4 trường hợp dễ nhất:

**Ví dụ 1**: \`θ = 0°\`. Bán kính \`OP\` chỉ thẳng sang phải, \`P = (1, 0)\`.

\`\`\`
cos 0° = 1
sin 0° = 0
tan 0° = 0 / 1 = 0
\`\`\`

**Ví dụ 2**: \`θ = 90°\`. Quay 1/4 vòng ngược kim đồng hồ, \`OP\` chỉ thẳng lên trên, \`P = (0, 1)\`.

\`\`\`
cos 90° = 0
sin 90° = 1
tan 90° = 1 / 0 = không xác định (∞)
\`\`\`

**Ví dụ 3**: \`θ = 180°\`. Quay nửa vòng, \`OP\` chỉ thẳng sang trái, \`P = (-1, 0)\`.

\`\`\`
cos 180° = -1
sin 180° = 0
tan 180° = 0 / (-1) = 0
\`\`\`

**Ví dụ 4**: \`θ = 270°\`. Quay 3/4 vòng, \`OP\` chỉ thẳng xuống dưới, \`P = (0, -1)\`.

\`\`\`
cos 270° = 0
sin 270° = -1
tan 270° = -1 / 0 = không xác định
\`\`\`

Nhìn lại: **không cần tam giác**, chỉ cần nhìn tọa độ.

#### ❓ Câu hỏi tự nhiên: "Vì sao bán kính = 1?"

Vì làm cho công thức **gọn**. Nếu bán kính là \`r\`, ta có \`cos θ = x_P / r\` và \`sin θ = y_P / r\`. Khi \`r = 1\`, mẫu số biến mất — đỡ một phép chia.

Nhưng quan trọng hơn: định nghĩa **không phụ thuộc bán kính**. Cùng góc \`θ\`, dù vẽ đường tròn bán kính \`1\` hay \`100\`, các tỉ số \`x/r\` và \`y/r\` đều giống nhau (hai đường tròn đồng dạng). Chọn \`r = 1\` chỉ để tiện đếm — \`cos θ\` chính là \`x_P\` luôn, không cần chia.

#### ❓ Câu hỏi tự nhiên: "Có vẻ định nghĩa mới khác hẳn định nghĩa tam giác — chúng có khớp không?"

Khớp. Mục 3 sẽ chứng minh chi tiết.

#### 🔁 Dừng lại tự kiểm tra (mục 2)

1. \`P\` nằm ở đâu trên đường tròn đơn vị khi \`θ = 360°\`?
2. Phương trình của đường tròn đơn vị là gì?
3. \`tan 90°\` bằng bao nhiêu? Vì sao?
4. Nếu \`cos θ = 0.5\` và \`sin θ = √3/2\`, điểm \`P\` ở đâu?

<details>
<summary>Đáp án</summary>

1. \`P = (1, 0)\` — quay đúng 1 vòng trở về vị trí ban đầu (giống \`θ = 0°\`).
2. \`x² + y² = 1\`.
3. Không xác định, vì \`tan 90° = sin 90° / cos 90° = 1 / 0\`. Chia cho 0 không có nghĩa.
4. \`P = (0.5, √3/2) ≈ (0.5, 0.866)\` — trong góc tư thứ I (QI), tương ứng \`θ = 60°\`.

</details>

#### 📝 Tóm tắt mục 2

- Đường tròn đơn vị: tâm \`(0, 0)\`, bán kính \`1\`, phương trình \`x² + y² = 1\`.
- Mỗi góc \`θ\` xác định một điểm duy nhất \`P = (cos θ, sin θ)\` trên đường tròn.
- Định nghĩa này áp dụng cho **mọi** \`θ\` thực — dương, âm, nhỏ, lớn.
- \`tan θ = sin θ / cos θ\`, không xác định khi \`cos θ = 0\`.

---

## 3. Kiểm tra tính nhất quán với định nghĩa tam giác

### 3.1. Vì sao phải kiểm tra?

Nếu định nghĩa mới (đường tròn đơn vị) cho \`sin 30° = 0.5\` mà định nghĩa cũ (tam giác) cho \`sin 30° = 0.7\` thì hỗn loạn — không biết đáp án đúng là cái nào. Toán học không cho phép điều đó.

→ Phải **chứng minh** hai định nghĩa khớp nhau trên vùng giao (\`0° < θ < 90°\`).

### 3.2. Chứng minh cho góc nhọn

Xét \`0° < θ < 90°\` (tức \`P\` nằm trong **góc tư thứ I** — \`x > 0, y > 0\`).

Vẽ hình chiếu của \`P\` xuống trục \`Ox\`. Gọi điểm chiếu là \`Q = (x_P, 0)\`. Khi đó tam giác \`OQP\` là tam giác vuông tại \`Q\`:

\`\`\`
            y
            ↑
            ·              
        ·   P=(x_P, y_P)   
            ●              
       ·   ╱│              
          ╱ │              
         ╱  │              
       OP   │ y_P (cạnh đối với θ)
       ╱    │              
      ╱     │              
     ╱θ     │              
────●───────●─────→ x      
    O   x_P Q              
    └───────┘              
      cạnh kề              
\`\`\`

Trong tam giác vuông \`OQP\`:

- Góc nhọn tại \`O\` là \`θ\`.
- Cạnh **huyền** = \`OP\` = bán kính đường tròn = \`1\`.
- Cạnh **đối** với \`θ\` = \`QP\` = \`y_P\` (độ cao).
- Cạnh **kề** với \`θ\` = \`OQ\` = \`x_P\` (chiều ngang).

Áp dụng SOH-CAH-TOA (định nghĩa cũ):

\`\`\`
sin θ = đối / huyền = y_P / 1 = y_P   ✓ (khớp định nghĩa mới: sin θ = y_P)
cos θ = kề / huyền  = x_P / 1 = x_P   ✓ (khớp định nghĩa mới: cos θ = x_P)
tan θ = đối / kề    = y_P / x_P       ✓ (khớp: tan θ = sin θ / cos θ)
\`\`\`

→ Trên vùng \`0° < θ < 90°\`, **hai định nghĩa cho cùng kết quả**. Khớp.

💡 **Cách hiểu khác**: định nghĩa đường tròn đơn vị **mở rộng** định nghĩa tam giác. Trên vùng góc nhọn chúng trùng nhau; ra ngoài vùng đó, định nghĩa tam giác "chết", còn đường tròn vẫn chạy.

### 3.3. Bốn ví dụ kiểm chứng cụ thể

**Ví dụ 1**: \`θ = 30°\`. Định nghĩa tam giác cho \`sin 30° = 1/2\` (tam giác đều bị cắt đôi, cạnh đối nhỏ là nửa cạnh huyền). Đường tròn đơn vị: \`P = (√3/2, 1/2)\`, nên \`sin 30° = y_P = 1/2\`. ✓

**Ví dụ 2**: \`θ = 45°\`. Tam giác vuông cân: hai cạnh góc vuông bằng nhau, mỗi cạnh = huyền \`/√2\`. Vậy \`sin 45° = cos 45° = 1/√2 = √2/2\`. Đường tròn: \`P = (√2/2, √2/2)\`. ✓

**Ví dụ 3**: \`θ = 60°\`. Cũng từ tam giác đều: cạnh đối với góc \`60°\` = \`√3/2 ·\` cạnh huyền. \`sin 60° = √3/2\`. Đường tròn: \`P = (1/2, √3/2)\`, \`sin 60° = √3/2\`. ✓

**Ví dụ 4**: \`θ = 90°\` (giáp ranh). Tam giác "thoái hóa" thành đoạn thẳng dọc — về mặt giới hạn, \`sin 90° = 1\`. Đường tròn: \`P = (0, 1)\`, \`sin 90° = 1\`. ✓

#### ❓ Câu hỏi tự nhiên: "Vậy \`sin\` và \`cos\` trong tam giác chỉ là trường hợp đặc biệt?"

Đúng. Định nghĩa tam giác là "phiên bản giới hạn" của định nghĩa đường tròn cho góc nhọn. Từ giờ trở đi ta xài định nghĩa đường tròn cho mọi tính toán — nó tổng quát hơn và đẹp hơn (không cần vẽ tam giác mỗi lần).

#### 📝 Tóm tắt mục 3

- Hai định nghĩa **khớp** trên vùng \`0° < θ < 90°\`.
- Đường tròn đơn vị là phiên bản **tổng quát hóa** của tam giác.
- Trên vùng góc nhọn: hình chiếu của \`P\` xuống trục tọa độ tạo thành tam giác vuông cạnh huyền \`= 1\`, đối \`= sin θ\`, kề \`= cos θ\`.

---

## 4. Tọa độ tại các góc đặc biệt — bảng phải thuộc

### 4.1. Vì sao phải thuộc?

Các góc \`0°, 30°, 45°, 60°, 90°, ...\` xuất hiện thường xuyên trong bài tập và trong code thật (đồ họa, vật lý, geo). Tra máy tính mỗi lần là chậm và mất trực giác. **Thuộc lòng** 12 góc trong bảng dưới đây là khoản đầu tư xứng đáng.

### 4.2. Bảng 12 góc đặc biệt

| \`θ\` (độ) | \`θ\` (rad) | \`P = (cos θ, sin θ)\` | \`cos θ\` | \`sin θ\` | \`tan θ\` |
|----------|-----------|----------------------|---------|---------|---------|
| \`0°\` | \`0\` | \`(1, 0)\` | \`1\` | \`0\` | \`0\` |
| \`30°\` | \`π/6\` | \`(√3/2, 1/2)\` | \`√3/2 ≈ 0.866\` | \`1/2 = 0.5\` | \`1/√3 ≈ 0.577\` |
| \`45°\` | \`π/4\` | \`(√2/2, √2/2)\` | \`√2/2 ≈ 0.707\` | \`√2/2 ≈ 0.707\` | \`1\` |
| \`60°\` | \`π/3\` | \`(1/2, √3/2)\` | \`1/2 = 0.5\` | \`√3/2 ≈ 0.866\` | \`√3 ≈ 1.732\` |
| \`90°\` | \`π/2\` | \`(0, 1)\` | \`0\` | \`1\` | không xác định |
| \`120°\` | \`2π/3\` | \`(-1/2, √3/2)\` | \`-1/2\` | \`√3/2\` | \`-√3\` |
| \`135°\` | \`3π/4\` | \`(-√2/2, √2/2)\` | \`-√2/2\` | \`√2/2\` | \`-1\` |
| \`150°\` | \`5π/6\` | \`(-√3/2, 1/2)\` | \`-√3/2\` | \`1/2\` | \`-1/√3\` |
| \`180°\` | \`π\` | \`(-1, 0)\` | \`-1\` | \`0\` | \`0\` |
| \`210°\` | \`7π/6\` | \`(-√3/2, -1/2)\` | \`-√3/2\` | \`-1/2\` | \`1/√3\` |
| \`225°\` | \`5π/4\` | \`(-√2/2, -√2/2)\` | \`-√2/2\` | \`-√2/2\` | \`1\` |
| \`240°\` | \`4π/3\` | \`(-1/2, -√3/2)\` | \`-1/2\` | \`-√3/2\` | \`√3\` |
| \`270°\` | \`3π/2\` | \`(0, -1)\` | \`0\` | \`-1\` | không xác định |
| \`300°\` | \`5π/3\` | \`(1/2, -√3/2)\` | \`1/2\` | \`-√3/2\` | \`-√3\` |
| \`315°\` | \`7π/4\` | \`(√2/2, -√2/2)\` | \`√2/2\` | \`-√2/2\` | \`-1\` |
| \`330°\` | \`11π/6\` | \`(√3/2, -1/2)\` | \`√3/2\` | \`-1/2\` | \`-1/√3\` |
| \`360°\` | \`2π\` | \`(1, 0)\` | \`1\` | \`0\` | \`0\` |

### 4.3. Mẹo ghi nhớ: "bàn tay trái"

Một mẹo phổ thông để nhớ giá trị \`sin\` của 5 góc đầu (\`0°, 30°, 45°, 60°, 90°\`):

\`\`\`
sin 0°  = √0 / 2 = 0
sin 30° = √1 / 2 = 1/2
sin 45° = √2 / 2
sin 60° = √3 / 2
sin 90° = √4 / 2 = 1
\`\`\`

Tử số chạy \`√0, √1, √2, √3, √4\` (\`0, 1, √2, √3, 2\`), mẫu luôn là \`2\`. Đẹp.

Với \`cos\` thì **ngược lại**:

\`\`\`
cos 0°  = √4 / 2 = 1
cos 30° = √3 / 2
cos 45° = √2 / 2
cos 60° = √1 / 2 = 1/2
cos 90° = √0 / 2 = 0
\`\`\`

→ Chỉ cần nhớ một quy tắc, ra cả \`sin\` và \`cos\` của 5 góc đầu.

### 4.4. Vẽ đường tròn với 12 góc

\`\`\`
                       (0, 1)
                  90°
       (−1/2,√3/2)│(1/2,√3/2)
        120°      │     60°
    135°╲         │         ╱45°
   (−√2/2,        │       (√2/2,
      √2/2)       │        √2/2)
  150°            │           30°
 (−√3/2,1/2)─────┼─────(√3/2,1/2)
 180°            │           0°
 (−1,0)──────────●────────(1,0)──→ x
                 │           360°
  (−√3/2,-1/2)   │        (√3/2,-1/2)
  210°           │           330°
   (−√2/2,       │       (√2/2,
     −√2/2)      │       −√2/2)
    225°╲        │        ╱315°
        240°     │     300°
       (−1/2,    │     (1/2,
        −√3/2)   │     −√3/2)
                  270°
                 (0,−1)
\`\`\`

### 4.5. Bốn ví dụ áp dụng

**Ví dụ 1**: tính \`sin 30° + cos 60°\`.

Tra bảng: \`sin 30° = 1/2\`, \`cos 60° = 1/2\`. Tổng \`= 1\`.

**Ví dụ 2**: tính \`tan(π/4)\`.

\`π/4 = 45°\`. \`tan 45° = sin 45° / cos 45° = (√2/2) / (√2/2) = 1\`.

**Ví dụ 3**: kiểm chứng \`sin²θ + cos²θ = 1\` cho \`θ = 60°\`.

\`sin 60° = √3/2\`, \`cos 60° = 1/2\`. \`(√3/2)² + (1/2)² = 3/4 + 1/4 = 1\`. ✓ (Đây là **Pythagorean identity** — sẽ học kỹ ở Lesson 05.)

**Ví dụ 4**: tính \`sin 120°\`.

Tra bảng: \`sin 120° = √3/2\`. Hoặc dùng quy gọn ở mục 7: \`sin 120° = sin(180° - 60°) = sin 60° = √3/2\`.

#### ⚠ Lỗi thường gặp với bảng đặc biệt

- **Nhầm \`sin 30°\` với \`sin 60°\`**. Cả hai đều có dạng \`√k/2\` nhưng \`sin 30° = 1/2\` (nhỏ) còn \`sin 60° = √3/2 ≈ 0.866\` (gần \`1\`). Trực giác: góc gần \`90°\` thì \`sin\` gần \`1\`.
- **Quên đổi đơn vị**. \`sin(30)\` trong Go (\`math.Sin(30)\`) nghĩa là \`sin(30 radian)\`, không phải \`sin 30°\`. Phải chuyển \`30° = π/6\` trước: \`math.Sin(math.Pi/6)\` mới đúng.
- **Viết \`cos 30° = 1/2\`** (sai — đó là \`cos 60°\`). Quy tắc nhớ: với góc nhỏ (\`30°\`), \`cos\` lớn (gần 1); với góc lớn (\`60°\`), \`cos\` nhỏ. Trên đường tròn: góc bé → \`P\` gần \`(1, 0)\` → \`x\` lớn → \`cos\` lớn.

#### 🔁 Dừng lại tự kiểm tra (mục 4)

1. \`cos 120°\` = ?
2. \`sin(5π/6)\` = ?
3. \`tan 225°\` = ?
4. Tọa độ \`P\` khi \`θ = 7π/4\` là gì?
5. \`cos 315°\` = ?

<details>
<summary>Đáp án</summary>

1. \`-1/2\`. Tra bảng.
2. \`5π/6 = 150°\`, \`sin 150° = 1/2\`.
3. \`225°\` ở QIII, \`tan 225° = sin/cos = (-√2/2)/(-√2/2) = 1\`.
4. \`7π/4 = 315°\`, \`P = (√2/2, -√2/2)\`.
5. \`√2/2 ≈ 0.707\`.

</details>

#### 📝 Tóm tắt mục 4

- Thuộc 12 (thực ra 16) tọa độ đặc biệt trên đường tròn đơn vị.
- Mẹo \`sin\` 5 góc đầu: \`√0/2, √1/2, √2/2, √3/2, √4/2\`. \`cos\` đảo ngược thứ tự.
- Pythagorean: \`sin²θ + cos²θ = 1\` luôn đúng (sẽ chứng minh tổng quát ở Lesson 05).

---

## 5. Quadrant — bốn góc tư và dấu

### 5.1. Bốn quadrant

Hai trục \`Ox\` và \`Oy\` chia mặt phẳng thành **4 vùng**, gọi là **góc tư (quadrant)** I, II, III, IV — đánh số ngược chiều kim đồng hồ bắt đầu từ vùng trên-phải.

\`\`\`
            y
            ↑
            │
     QII    │    QI
   x<0,y>0  │  x>0,y>0
            │
────────────●────────────→ x
            O
   x<0,y<0  │  x>0,y<0
     QIII   │    QIV
            │
\`\`\`

Tương ứng với góc \`θ\`:

| Quadrant | Góc \`θ\` (độ) | Góc \`θ\` (rad) | Dấu \`x\` | Dấu \`y\` |
|----------|--------------|---------------|---------|---------|
| **QI** | \`0° < θ < 90°\` | \`0 < θ < π/2\` | \`+\` | \`+\` |
| **QII** | \`90° < θ < 180°\` | \`π/2 < θ < π\` | \`-\` | \`+\` |
| **QIII** | \`180° < θ < 270°\` | \`π < θ < 3π/2\` | \`-\` | \`-\` |
| **QIV** | \`270° < θ < 360°\` | \`3π/2 < θ < 2π\` | \`+\` | \`-\` |

### 5.2. Dấu của sin, cos, tan theo quadrant

Vì \`cos θ = x_P\` và \`sin θ = y_P\`, dấu của \`sin/cos\` chính là dấu của \`x_P, y_P\`:

| Quadrant | \`cos θ = x\` | \`sin θ = y\` | \`tan θ = y/x\` |
|----------|-------------|-------------|---------------|
| **QI** | \`+\` | \`+\` | \`+\` |
| **QII** | \`-\` | \`+\` | \`-\` (vì \`+/-\`) |
| **QIII** | \`-\` | \`-\` | \`+\` (vì \`-/-\`) |
| **QIV** | \`+\` | \`-\` | \`-\` (vì \`-/+\`) |

### 5.3. Mnemonic "All Students Take Calculus"

Một mnemonic phổ thông để nhớ dấu **dương** ở mỗi quadrant:

\`\`\`
        y
        ↑
        │
   S    │    A
 (Sin+) │  (All+)        ← QI: tất cả sin, cos, tan đều dương
        │                ← QII: chỉ Sin dương
────────●────────→ x
        │                ← QIII: chỉ Tan dương
   T    │    C           ← QIV: chỉ Cos dương
 (Tan+) │  (Cos+)
        │
\`\`\`

Đọc theo thứ tự quadrant I → II → III → IV: **All - Students - Take - Calculus**. Mỗi chữ cái đầu = tên hàm dương ở quadrant đó.

- **A** (QI): **A**ll — \`sin+, cos+, tan+\`.
- **S** (QII): **S**in — chỉ \`sin+\`, hai cái kia âm.
- **T** (QIII): **T**an — chỉ \`tan+\`.
- **C** (QIV): **C**os — chỉ \`cos+\`.

### 5.4. Bốn ví dụ áp dụng mnemonic

**Ví dụ 1**: dấu của \`cos 200°\`?

\`200°\` nằm trong \`(180°, 270°)\` → **QIII**. Ở QIII chỉ Tan dương → \`cos 200°\` âm. Đáp: \`cos 200° < 0\`.

**Ví dụ 2**: dấu của \`sin 300°\`?

\`300°\` nằm trong \`(270°, 360°)\` → **QIV**. Ở QIV chỉ Cos dương → \`sin 300° < 0\`.

**Ví dụ 3**: dấu của \`tan 150°\`?

\`150°\` nằm trong \`(90°, 180°)\` → **QII**. Ở QII chỉ Sin dương → \`tan 150°\` âm. Đáp: \`tan 150° < 0\`. Kiểm: tra bảng, \`tan 150° = -1/√3\` ✓.

**Ví dụ 4**: nếu \`sin θ < 0\` và \`cos θ > 0\`, \`θ\` thuộc quadrant nào?

\`sin < 0\` → QIII hoặc QIV. \`cos > 0\` → QI hoặc QIV. Giao: **QIV**. (Tức \`270° < θ < 360°\`.)

#### ❓ Câu hỏi tự nhiên: "Tại sao mnemonic này hữu ích — sao không nhớ thẳng bảng dấu?"

Bảng có 12 ô (4 quadrant × 3 hàm), khó nhớ trực tiếp. Mnemonic nén thông tin xuống còn 4 chữ + 1 quy tắc ngầm (cái nào không trong list = âm). Khi bạn cần dấu của \`cos 200°\` chỉ cần biết quadrant + nhớ "TIII = Tan dương" → mọi thứ khác âm → \`cos 200° < 0\`. Tốc độ não bộ tăng đáng kể.

Khi quá quen, bạn sẽ không cần mnemonic nữa — trực giác đường tròn sẽ thay thế. Nhưng giai đoạn đầu nó là chiếc xe đẩy hữu ích.

#### ⚠ Lỗi thường gặp với dấu

- **Không kiểm tra dấu, chỉ tra giá trị tuyệt đối**. Ví dụ tính \`sin 210°\`: nhìn \`210° = 180° + 30°\`, rút \`sin 30° = 1/2\` rồi **quên** áp dấu của QIII → trả lời \`1/2\` (sai, đúng là \`-1/2\`).
- **Nhầm QIV với QII**. \`350°\` ở đâu? Nhiều người nói QII (vì gần \`90°\` hay sao đó). Đáp: QIV (vì \`270° < 350° < 360°\`). Nhớ: QIV là vùng cuối, sát \`360°\`.
- **Quên \`tan θ < 0\` ở QII và QIV**. \`tan\` âm ở 2 quadrant chứ không chỉ 1.

#### 🔁 Dừng lại tự kiểm tra (mục 5)

1. Dấu của \`cos 100°\`?
2. Dấu của \`tan 280°\`?
3. Nếu \`sin θ > 0\` và \`tan θ < 0\`, \`θ\` ở quadrant nào?
4. \`θ = 5π/4\` thuộc quadrant nào? Dấu của \`sin θ\`?

<details>
<summary>Đáp án</summary>

1. \`100° ∈ (90°, 180°)\` → QII → chỉ Sin dương → \`cos 100° < 0\`.
2. \`280° ∈ (270°, 360°)\` → QIV → chỉ Cos dương → \`tan 280° < 0\`.
3. \`sin > 0\` → QI hoặc QII. \`tan < 0\` → QII hoặc QIV. Giao: **QII**.
4. \`5π/4 = 225° ∈ (180°, 270°)\` → **QIII** → chỉ Tan dương → \`sin 225° < 0\` (giá trị \`-√2/2\`).

</details>

#### 📝 Tóm tắt mục 5

- 4 quadrant chia mặt phẳng. QI là vùng trên-phải, đếm ngược chiều kim đồng hồ.
- Dấu \`cos = dấu x\`, dấu \`sin = dấu y\`.
- Mnemonic **A**ll **S**tudents **T**ake **C**alculus → hàm dương ở từng quadrant.
- \`tan\` âm ở QII và QIV; dương ở QI và QIII.

---

## 6. Công thức quy gọn (reduction formulas)

### 6.1. Ý tưởng

💡 **Trực giác**: nếu bạn thuộc \`sin/cos\` của góc nhọn (\`0° → 90°\`), bạn có thể tính \`sin/cos\` của **mọi** góc bằng cách "phản chiếu" qua trục \`Ox\` hoặc \`Oy\`. Đường tròn đơn vị có nhiều đối xứng — khai thác đối xứng đó cho công thức gọn.

### 6.2. Sáu công thức quy gọn chính

| Công thức | Ý nghĩa hình học |
|-----------|------------------|
| \`sin(-θ) = -sin θ\` | Lật \`P\` qua trục \`Ox\`: \`y\` đổi dấu, \`x\` giữ nguyên. |
| \`cos(-θ) = cos θ\` | Lật qua \`Ox\`: \`x\` giữ nguyên. |
| \`tan(-θ) = -tan θ\` | Hệ quả: \`sin/cos\` đổi dấu thì \`tan\` đổi dấu. |
| \`sin(π - θ) = sin θ\` | Lật \`P\` qua trục \`Oy\`: \`x\` đổi dấu, \`y\` giữ. |
| \`cos(π - θ) = -cos θ\` | Lật qua \`Oy\`: \`x\` đổi dấu. |
| \`sin(π + θ) = -sin θ\` | Quay thêm \`180°\`: cả \`x\` và \`y\` đổi dấu. |
| \`cos(π + θ) = -cos θ\` | Cả \`x\` đổi dấu. |
| \`sin(2π + θ) = sin θ\` | Quay đủ vòng — về chỗ cũ. **Chu kỳ 2π**. |
| \`cos(2π + θ) = cos θ\` | Tương tự. |

### 6.3. Walk-through từng công thức bằng hình

#### Công thức 1: \`cos(-θ) = cos θ\`, \`sin(-θ) = -sin θ\`

Góc \`-θ\` đo theo chiều kim đồng hồ (xuống dưới), trong khi \`θ\` đo ngược chiều (lên trên). Hai bán kính đối xứng nhau qua trục \`Ox\`:

\`\`\`
         y
         ↑
         │
       P=(x,y)        ← góc θ
       ●              
       │╲             
       │ ╲            
       │  ╲           
       │θ  ╲          
─────●─┴────●─→ x     
     │  -θ ╱          
     │    ╱           
     │   ╱            
       ●              
     P'=(x,-y)        ← góc -θ
\`\`\`

\`P\` và \`P'\` có cùng tọa độ \`x\` nhưng \`y\` đối nhau. Nên:

\`\`\`
cos(-θ) = x_P' = x_P = cos θ
sin(-θ) = y_P' = -y_P = -sin θ
\`\`\`

**Verify với θ = 30°**: \`cos(-30°) = cos 30° = √3/2\`, \`sin(-30°) = -sin 30° = -1/2\`. Tra bảng \`θ = 330°\` (≡ \`-30°\`): \`P = (√3/2, -1/2)\` ✓.

**Verify với θ = 60°**: \`cos(-60°) = cos 60° = 1/2\`. Đường tròn: \`-60° ≡ 300°\`, \`P = (1/2, -√3/2)\`, \`cos = 1/2\` ✓.

**Lưu ý ngôn ngữ**: hàm thỏa \`f(-x) = f(x)\` gọi là **hàm chẵn** (even); \`f(-x) = -f(x)\` gọi là **hàm lẻ** (odd). Vậy \`cos\` là **chẵn**, \`sin\` và \`tan\` là **lẻ**.

#### Công thức 2: \`sin(π - θ) = sin θ\`, \`cos(π - θ) = -cos θ\`

Góc \`π - θ\` = \`180° - θ\` là **phản chiếu của θ qua trục Oy**.

\`\`\`
         y
         ↑
         │
  P'=(-x,y) │  P=(x,y)
       ●    │    ●     
        ╲   │   ╱      
         ╲  │  ╱       
          ╲ │ ╱        
   π-θ     ╲│╱  θ      
─────●──────●──────●─→ x
            O             
\`\`\`

\`P'\` có cùng \`y\` nhưng \`x\` đối dấu. Nên:

\`\`\`
sin(π - θ) = y_P' = y_P = sin θ
cos(π - θ) = x_P' = -x_P = -cos θ
\`\`\`

**Verify với θ = 30°**: \`sin(180° - 30°) = sin 150° = sin 30° = 1/2\`. Tra bảng \`sin 150° = 1/2\` ✓. \`cos 150° = -cos 30° = -√3/2\`. Tra bảng \`cos 150° = -√3/2\` ✓.

**Verify với θ = 45°**: \`sin 135° = sin 45° = √2/2\` ✓. \`cos 135° = -cos 45° = -√2/2\` ✓.

#### Công thức 3: \`sin(π + θ) = -sin θ\`, \`cos(π + θ) = -cos θ\`

Góc \`π + θ\` = \`180° + θ\` là **đối xứng qua gốc O** của góc \`θ\` (quay thêm nửa vòng).

\`\`\`
         y
         ↑
         │
       P=(x,y)         
       ●               
        ╲              
         ╲             
       θ  ╲            
─────●─────●─────→ x   
       π+θ ╲           
            ╲          
             ●         
        P''=(-x,-y)    
\`\`\`

Cả \`x\` và \`y\` đối dấu:

\`\`\`
sin(π + θ) = -sin θ
cos(π + θ) = -cos θ
\`\`\`

**Verify θ = 30°**: \`sin 210° = -sin 30° = -1/2\` ✓. \`cos 210° = -cos 30° = -√3/2\` ✓.

**Verify θ = 60°**: \`sin 240° = -sin 60° = -√3/2\` ✓. \`cos 240° = -cos 60° = -1/2\` ✓.

#### Công thức 4: \`sin(2π + θ) = sin θ\`, \`cos(2π + θ) = cos θ\` — tính tuần hoàn

Quay đủ một vòng (\`2π = 360°\`) thì \`P\` về đúng vị trí cũ. Tức **góc \`θ\` và \`θ + 2π\` là cùng một điểm trên đường tròn**.

\`\`\`
sin(θ + 2π) = sin θ
cos(θ + 2π) = cos θ
\`\`\`

Hệ quả: cộng/trừ bất kỳ bội số nguyên của \`2π\`, kết quả không đổi.

**Verify**: \`sin 390° = sin(360° + 30°) = sin 30° = 1/2\` ✓. \`cos 720° = cos(2 × 360°) = cos 0° = 1\` ✓.

**Đây chính là tính chu kỳ** — sẽ học kỹ ở Lesson 04 khi vẽ đồ thị.

### 6.4. Bảng tóm tắt 4 phép biến đổi cơ bản

| Phép | \`sin\` mới | \`cos\` mới | \`tan\` mới |
|------|-----------|-----------|-----------|
| \`-θ\` (lật qua Ox) | \`-sin θ\` | \`cos θ\` | \`-tan θ\` |
| \`π - θ\` (lật qua Oy) | \`sin θ\` | \`-cos θ\` | \`-tan θ\` |
| \`π + θ\` (đối xứng O) | \`-sin θ\` | \`-cos θ\` | \`tan θ\` |
| \`2π + θ\` (quay đủ vòng) | \`sin θ\` | \`cos θ\` | \`tan θ\` |

### 6.5. Bốn ví dụ áp dụng

**Ví dụ 1**: tính \`sin 150°\` bằng quy gọn.

\`150° = 180° - 30°\`. Dùng \`sin(π - θ) = sin θ\` với \`θ = 30°\`:

\`\`\`
sin 150° = sin(180° - 30°) = sin 30° = 1/2
\`\`\`

Đối chiếu bảng: \`sin 150° = 1/2\` ✓.

**Ví dụ 2**: tính \`cos 210°\` bằng quy gọn.

\`210° = 180° + 30°\`. Dùng \`cos(π + θ) = -cos θ\`:

\`\`\`
cos 210° = -cos 30° = -√3/2
\`\`\`

Đối chiếu bảng: ✓.

**Ví dụ 3**: tính \`sin(-45°)\`.

\`sin\` là hàm lẻ: \`sin(-45°) = -sin 45° = -√2/2 ≈ -0.707\`.

Đối chiếu đường tròn: \`-45° ≡ 315°\`, \`P = (√2/2, -√2/2)\`, \`sin = -√2/2\` ✓.

**Ví dụ 4**: tính \`cos 765°\`.

\`765° = 720° + 45° = 2 × 360° + 45°\`. Quy chu kỳ:

\`\`\`
cos 765° = cos 45° = √2/2
\`\`\`

#### 🔁 Tự kiểm tra: tính \`sin 150°\` bằng 2 cách

**Cách 1 (quy gọn)**: \`sin 150° = sin(180° - 30°) = sin 30° = 1/2\`.

**Cách 2 (đường tròn trực tiếp)**: \`150°\` ở QII (\`90° < 150° < 180°\`), nên \`sin > 0\`, \`cos < 0\` (mnemonic ASTC: Sin+). Điểm \`P\` ứng \`150°\` đối xứng với \`P\` ứng \`30°\` qua trục \`Oy\`. \`P_30° = (√3/2, 1/2)\` → \`P_150° = (-√3/2, 1/2)\`. Vậy \`sin 150° = 1/2\`.

**Hai cách cho cùng đáp án \`1/2\`** ✓. Đây là tính nhất quán: quy gọn chỉ là viết gọn lại đối xứng của đường tròn.

#### 📝 Tóm tắt mục 6

- \`sin\` là hàm **lẻ**: \`sin(-θ) = -sin θ\`. \`cos\` là hàm **chẵn**: \`cos(-θ) = cos θ\`.
- \`sin(π - θ) = sin θ\`, \`cos(π - θ) = -cos θ\` — lật qua \`Oy\`.
- \`sin(π + θ) = -sin θ\`, \`cos(π + θ) = -cos θ\` — đối xứng qua \`O\`.
- Cộng bội của \`2π\` không đổi — chu kỳ.

---

## 7. Tính giá trị cho góc bất kỳ — quy trình 3 bước

### 7.1. Vấn đề

Cho một góc \`θ ∈ [0°, 360°)\` (không nhất thiết đặc biệt). Làm sao tính \`sin θ, cos θ, tan θ\`?

Với góc đặc biệt: tra bảng. Với góc bất kỳ: dùng máy tính. Nhưng có một kỹ thuật để **suy ra** từ góc nhọn — gọi là **góc tham chiếu (reference angle)**.

### 7.2. Định nghĩa: góc tham chiếu

> **Góc tham chiếu** \`α\` của một góc \`θ\` là góc nhọn (\`0 ≤ α ≤ 90°\`) tạo bởi cạnh \`OP\` và **trục Ox gần nhất** (tức \`Ox+\` hoặc \`Ox-\`, tùy chỗ nào gần hơn).

Cách tính \`α\` theo quadrant:

| Quadrant của \`θ\` | \`α\` |
|------------------|-----|
| QI (\`0° < θ < 90°\`) | \`α = θ\` |
| QII (\`90° < θ < 180°\`) | \`α = 180° - θ\` (hay \`π - θ\`) |
| QIII (\`180° < θ < 270°\`) | \`α = θ - 180°\` (hay \`θ - π\`) |
| QIV (\`270° < θ < 360°\`) | \`α = 360° - θ\` (hay \`2π - θ\`) |

Trực giác hình học: \`α\` là "khoảng cách góc" từ \`OP\` về trục \`Ox\` gần nhất, đo theo đường ngắn.

### 7.3. Quy trình 3 bước

**Cho góc \`θ\`, tính \`sin θ\`, \`cos θ\`, \`tan θ\`:**

1. **Bước 1**: Xác định \`θ\` thuộc quadrant nào → suy ra **dấu** của \`sin, cos, tan\` (mnemonic ASTC).
2. **Bước 2**: Tính **góc tham chiếu** \`α\` (góc nhọn).
3. **Bước 3**: Tra bảng \`sin α, cos α, tan α\` (đều dương vì \`α\` là góc nhọn), rồi **áp dấu** từ bước 1.

### 7.4. Bốn ví dụ chi tiết

**Ví dụ 1**: tính \`sin 120°, cos 120°, tan 120°\`.

- Bước 1: \`120° ∈ (90°, 180°)\` → **QII**. ASTC: ở QII chỉ Sin dương → \`sin+, cos-, tan-\`.
- Bước 2: \`α = 180° - 120° = 60°\`.
- Bước 3: \`sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3\`.

Áp dấu:

\`\`\`
sin 120° = +√3/2 = √3/2
cos 120° = -1/2
tan 120° = -√3
\`\`\`

Đối chiếu bảng (mục 4.2): ✓ ✓ ✓.

**Ví dụ 2**: tính \`sin 210°, cos 210°, tan 210°\`.

- Bước 1: \`210° ∈ (180°, 270°)\` → **QIII**. ASTC: chỉ Tan dương → \`sin-, cos-, tan+\`.
- Bước 2: \`α = 210° - 180° = 30°\`.
- Bước 3: \`sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3\`.

Áp dấu:

\`\`\`
sin 210° = -1/2
cos 210° = -√3/2
tan 210° = +1/√3
\`\`\`

Đối chiếu bảng: ✓.

**Ví dụ 3**: tính \`sin 315°, cos 315°, tan 315°\`.

- Bước 1: \`315° ∈ (270°, 360°)\` → **QIV**. ASTC: chỉ Cos dương → \`sin-, cos+, tan-\`.
- Bước 2: \`α = 360° - 315° = 45°\`.
- Bước 3: \`sin 45° = √2/2, cos 45° = √2/2, tan 45° = 1\`.

Áp dấu:

\`\`\`
sin 315° = -√2/2
cos 315° = +√2/2 = √2/2
tan 315° = -1
\`\`\`

**Ví dụ 4**: tính \`sin 330°, cos 330°, tan 330°\`.

- Bước 1: \`330° ∈ (270°, 360°)\` → **QIV** → \`sin-, cos+, tan-\`.
- Bước 2: \`α = 360° - 330° = 30°\`.
- Bước 3: \`sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3\`.

Áp dấu:

\`\`\`
sin 330° = -1/2
cos 330° = √3/2
tan 330° = -1/√3
\`\`\`

Đối chiếu: ✓.

#### ❓ Câu hỏi tự nhiên: "Quy trình này có ích gì khi máy tính đã có sin/cos sẵn?"

Hai lý do:

1. **Trực giác**: máy tính ra số \`0.5\` cho \`sin 30°\`, nhưng cho \`sin 210°\` ra \`-0.5\`. Vì sao âm? Vì sao cùng độ lớn? Quy trình 3 bước trả lời chính xác: dấu từ quadrant, độ lớn từ góc tham chiếu. Hiểu cơ chế, không chỉ kết quả.
2. **Tính tay khi cần**: làm bài thi không máy tính, làm việc với góc đặc biệt (hay xuất hiện trong vật lý, kỹ thuật), debug code khi nghi ngờ thư viện sai — đều cần quy trình tay.

Khi quen, bạn sẽ làm 3 bước trong đầu trong 2 giây.

#### ⚠ Lỗi thường gặp với reference angle

- **Lấy \`α = θ - 90°\` cho QII** (thay vì \`180° - θ\`). Sai. \`α\` phải là khoảng cách đến **trục Ox gần nhất**, không phải trục Oy. Với QII trục Ox gần nhất là \`Ox-\` (góc \`180°\`), nên \`α = 180° - θ\`.
- **Quên áp dấu**, đặc biệt với \`cos\` ở QII/QIII. Ví dụ \`cos 150° = +√3/2\` (sai) thay vì \`-√3/2\`. Áp dấu là bước **bắt buộc** sau khi tra bảng — không bao giờ bỏ qua.
- **Tính \`α\` cho góc âm hoặc > 360°** trước khi quy về \`[0°, 360°)\`. Cần làm \`θ mod 360°\` trước, rồi mới xét quadrant.

#### 🔁 Tự kiểm tra (mục 7)

Tính bằng quy trình 3 bước:

1. \`sin 240°\` = ?
2. \`cos 300°\` = ?
3. \`tan 135°\` = ?
4. \`sin(-60°)\` = ?

<details>
<summary>Đáp án</summary>

1. \`240° ∈ QIII\` → \`sin-\`. \`α = 240° - 180° = 60°\`. \`sin 60° = √3/2\`. → \`sin 240° = -√3/2\`.
2. \`300° ∈ QIV\` → \`cos+\`. \`α = 360° - 300° = 60°\`. \`cos 60° = 1/2\`. → \`cos 300° = 1/2\`.
3. \`135° ∈ QII\` → \`tan-\`. \`α = 180° - 135° = 45°\`. \`tan 45° = 1\`. → \`tan 135° = -1\`.
4. \`-60° ≡ 300°\` (cộng 360°) → QIV → \`sin-\`. \`α = 60°\`. \`sin 60° = √3/2\`. → \`sin(-60°) = -√3/2\`. (Hoặc nhanh hơn: \`sin(-θ) = -sin θ = -sin 60° = -√3/2\`.)

</details>

#### 📝 Tóm tắt mục 7

- Mọi góc bất kỳ quy về **góc nhọn α** (góc tham chiếu) + **dấu theo quadrant**.
- Quy trình 3 bước: (1) quadrant + dấu, (2) \`α\`, (3) áp dấu vào bảng.
- Đây là cách **chuẩn** để tính tay và xây trực giác.

---

## 8. Chu kỳ và tính tuần hoàn

### 8.1. Định nghĩa chu kỳ

💡 **Trực giác**: con kiến quay quanh đường tròn. Cứ đi đủ \`2π\` rad (= \`360°\`) là về chỗ cũ. Nên \`sin\` và \`cos\` **lặp lại sau mỗi \`2π\`** — chúng là **hàm tuần hoàn** với **chu kỳ \`2π\`**.

\`\`\`
sin(θ + 2π) = sin θ   với mọi θ ∈ ℝ
cos(θ + 2π) = cos θ
\`\`\`

Một hàm \`f\` gọi là **tuần hoàn với chu kỳ \`T\`** nếu \`f(θ + T) = f(θ)\` với mọi \`θ\`, và \`T\` là số dương **nhỏ nhất** có tính chất này. Với \`sin, cos\`, chu kỳ là \`T = 2π\`.

### 8.2. Bốn ví dụ tuần hoàn

**Ví dụ 1**: \`sin 390° = sin(360° + 30°) = sin 30° = 1/2\`.

**Ví dụ 2**: \`cos 720° = cos(2 · 360° + 0°) = cos 0° = 1\`.

**Ví dụ 3**: \`sin(-330°) = sin(-330° + 360°) = sin 30° = 1/2\`. Hoặc trực tiếp: \`sin(-330°) = -sin 330° = -(-1/2) = 1/2\`.

**Ví dụ 4**: \`cos 1080° = cos(3 · 360°) = cos 0° = 1\`.

→ Bí kíp: với góc to (hoặc âm), **rút mod \`360°\`** (hay mod \`2π\`) đưa về \`[0°, 360°)\`, rồi áp dụng các kỹ thuật đã học.

### 8.3. Chu kỳ của tan: chỉ \`π\`, không phải \`2π\`

\`tan\` cũng tuần hoàn, nhưng chu kỳ **ngắn hơn**:

\`\`\`
tan(θ + π) = tan θ   (KHÔNG phải 2π)
\`\`\`

**Vì sao?** Từ công thức quy gọn \`sin(π + θ) = -sin θ\` và \`cos(π + θ) = -cos θ\`:

\`\`\`
tan(π + θ) = sin(π + θ) / cos(π + θ) 
           = (-sin θ) / (-cos θ) 
           = sin θ / cos θ 
           = tan θ
\`\`\`

Hai dấu âm triệt tiêu nhau → \`tan\` lặp lại sau \`π\` chứ không cần đợi \`2π\`.

**Verify**: \`tan 30° = 1/√3 ≈ 0.577\`. \`tan 210° = tan(180° + 30°) = tan 30° = 1/√3 ≈ 0.577\`. ✓ Đối chiếu bảng: \`tan 210° = 1/√3\` ✓.

### 8.4. Góc đồng kết (coterminal angles)

Hai góc \`θ_1\` và \`θ_2\` gọi là **đồng kết (coterminal)** nếu chúng cho cùng điểm \`P\` trên đường tròn — tức \`θ_2 = θ_1 + 2πk\` với \`k\` nguyên.

**Bốn ví dụ**:

| Góc gốc | Đồng kết |
|---------|----------|
| \`30°\` | \`390°, 750°, -330°, -690°, ...\` |
| \`90°\` | \`450°, -270°, ...\` |
| \`180°\` | \`-180°, 540°, ...\` |
| \`π/4\` | \`π/4 + 2π = 9π/4\`, \`π/4 - 2π = -7π/4\`, ... |

Vì góc đồng kết → cùng \`P\` → cùng \`sin, cos, tan\`. Ta luôn có thể đổi góc xấu sang góc đẹp đồng kết.

#### ❓ Câu hỏi tự nhiên: "Vậy \`tan(θ + π) = tan θ\` có vẻ mâu thuẫn — \`θ + π\` là góc đối xứng qua O, không đồng kết với \`θ\`?"

Đúng — \`θ + π\` **không** đồng kết với \`θ\` (chúng là hai điểm đối nhau qua tâm). Nhưng \`tan\` chỉ là **tỉ số** \`y/x\`, và hai điểm đối nhau qua tâm có cả \`x\` lẫn \`y\` đổi dấu → tỉ số \`y/x\` không đổi. Nên \`tan\` của hai góc đó bằng nhau, mặc dù \`sin\` và \`cos\` riêng từng cái thì đối dấu.

Hai điểm khác nhau, cùng \`tan\`. Đây là vì sao \`tan\` có **chu kỳ ngắn hơn** \`sin/cos\`.

#### 🔁 Tự kiểm tra (mục 8)

1. Một góc đồng kết với \`45°\` trong khoảng \`(360°, 720°)\`?
2. \`cos 1110°\` = ?
3. \`tan 765°\` = ?

<details>
<summary>Đáp án</summary>

1. \`45° + 360° = 405°\` (nằm trong \`(360°, 720°)\`).
2. \`1110° = 3 · 360° + 30° = 1080° + 30°\`. \`cos 1110° = cos 30° = √3/2\`.
3. \`765° = 2 · 360° + 45° = 720° + 45°\`. \`tan 765° = tan 45° = 1\`. (Hoặc dùng chu kỳ \`π = 180°\` của tan: \`765° mod 180° = 765 - 4·180 = 765 - 720 = 45°\`. \`tan 45° = 1\`.)

</details>

#### 📝 Tóm tắt mục 8

- \`sin, cos\` có chu kỳ \`2π\` (360°).
- \`tan\` có chu kỳ \`π\` (180°) — ngắn hơn vì \`tan\` là tỉ số.
- Góc đồng kết = chênh nhau bội của \`2π\` → cho cùng \`sin, cos, tan\`.
- Bí kíp tính góc to: rút mod \`2π\` (hoặc \`π\` cho \`tan\`).

---

## 9. Liên hệ với Machine Learning

### 9.1. Positional encoding trong Transformer

Bài báo **"Attention Is All You Need"** (Vaswani et al., 2017) giới thiệu Transformer — kiến trúc cơ sở cho GPT, BERT, Claude, v.v. Một thành phần nhỏ nhưng quan trọng là **positional encoding**: cách đưa thông tin "vị trí token" vào model.

Công thức:

\`\`\`
PE(pos, 2i)   = sin( pos / 10000^(2i/d) )
PE(pos, 2i+1) = cos( pos / 10000^(2i/d) )
\`\`\`

Trong đó:
- \`pos\` = vị trí của token trong câu (0, 1, 2, ...).
- \`i\` = chỉ số chiều trong vector encoding.
- \`d\` = số chiều embedding (vd 512, 768).

💡 **Đường tròn đơn vị xuất hiện ở đâu?** Với mỗi \`i\`, cặp \`(PE(pos, 2i), PE(pos, 2i+1)) = (sin α, cos α)\` với \`α = pos / 10000^(2i/d)\`. Đây chính là **một điểm trên đường tròn đơn vị**, quay với góc \`α\` phụ thuộc vào \`pos\`.

Các chiều \`i\` khác nhau quay với **tốc độ khác nhau**:

- \`i = 0\`: tần số \`1/10000^0 = 1\` — quay nhanh, chu kỳ \`2π\` token.
- \`i = d/4\` (giữa): tần số \`1/10000^(1/2) = 0.01\` — quay chậm hơn, chu kỳ 100·2π token.
- \`i = d/2\` (cuối): tần số \`1/10000\` — quay rất chậm, chu kỳ 10000·2π token.

→ Mỗi token nhận một **chữ ký vị trí** dạng \`(sin θ_1, cos θ_1, sin θ_2, cos θ_2, ...)\` với các tần số khác nhau. Vị trí khác nhau cho chữ ký khác nhau. Mô hình học cách "đọc" chữ ký này.

**Tại sao dùng sin/cos thay vì đánh số \`pos\` trực tiếp?** Vì sin/cos cho mô hình khả năng **tổng quát hóa** sang vị trí chưa thấy (do tính tuần hoàn) và **biểu diễn khoảng cách tương đối** dễ dàng (nhờ công thức cộng góc — sẽ học Lesson 06).

### 9.2. RoPE — Rotary Position Embedding

Trong các LLM hiện đại (LLaMA, GPT-NeoX, Qwen), positional encoding kiểu cũ thường được thay bằng **RoPE** (Su et al., 2021). Ý tưởng: thay vì *cộng* PE vào embedding, RoPE **xoay** embedding theo ma trận:

\`\`\`
R_θ = [[cos θ, -sin θ],
       [sin θ,  cos θ]]
\`\`\`

Áp ma trận này vào cặp embedding (treat từng cặp \`(x_2i, x_2i+1)\` như vector 2D). Ma trận \`R_θ\` là **ma trận xoay** — quay vector quanh gốc một góc \`θ\`. Bài học sâu hơn về ma trận xoay sẽ ở Lesson 07.

→ **Đường tròn đơn vị là nền tảng của positional encoding hiện đại**. Hiểu \`(cos θ, sin θ)\` là tọa độ điểm quay = hiểu nửa cốt lõi của Transformer.

### 9.3. Cosine similarity và hình cầu đơn vị

Trong NLP và search ngữ nghĩa, hai embedding \`u, v\` được so sánh bằng **cosine similarity**:

\`\`\`
cos_sim(u, v) = (u · v) / (||u|| · ||v||)
\`\`\`

Nếu cả \`u\` và \`v\` đã **chuẩn hóa L2** (\`||u|| = ||v|| = 1\`, tức nằm trên **hình cầu đơn vị**), công thức rút gọn thành \`u · v\`. \`cos_sim\` thực chất là \`cos\` của góc giữa hai vector.

→ "Đường tròn đơn vị" trong 2D mở rộng thành "hình cầu đơn vị" trong nhiều chiều. Sẽ học Tầng 4 (Linear Algebra) và Tầng 6 (AI/ML).

### 9.4. Ứng dụng đời thường: dao động và sóng

\`sin θ\` và \`cos θ\` mô tả mọi **dao động đều**: con lắc đồng hồ, dòng điện xoay chiều, sóng âm, sóng ánh sáng. Một vật chuyển động tròn với tốc độ góc \`ω\` có vị trí ngang là \`cos(ωt)\` và vị trí dọc là \`sin(ωt)\` tại thời điểm \`t\`. Đường tròn đơn vị là "hộp đen" sinh ra mọi dao động trong vật lý.

#### 📝 Tóm tắt mục 9

- **Positional encoding** trong Transformer = nhiều điểm quay với tần số khác nhau trên đường tròn đơn vị.
- **RoPE** = áp ma trận xoay \`[[cos θ, -sin θ], [sin θ, cos θ]]\` vào embedding.
- **Cosine similarity** trên hình cầu đơn vị = \`cos\` của góc giữa hai vector.
- Đường tròn đơn vị là nền của mọi mô hình dao động (vật lý, kỹ thuật, ML).

---

## 10. Bài tập

### Bài 1: bảng giá trị cho 12 góc

Tính \`sin θ, cos θ, tan θ\` (dạng phân số căn nếu có thể) cho các góc:

a) \`θ = 0°\`
b) \`θ = π/6\`
c) \`θ = π/3\`
d) \`θ = 90°\`
e) \`θ = 2π/3\`
f) \`θ = 135°\`
g) \`θ = π\`
h) \`θ = 7π/6\`
i) \`θ = 240°\`
j) \`θ = 3π/2\`
k) \`θ = 11π/6\`
l) \`θ = 100°\` (góc bất kỳ, dùng máy tính, làm tròn 4 chữ số thập phân).

### Bài 2: nghiệm trên \`[0, 2π)\`

Tìm tất cả \`θ ∈ [0, 2π)\` sao cho \`sin θ = 1/2\`.

### Bài 3: nghiệm trên \`[-2π, 2π)\`

Tìm tất cả \`θ ∈ [-2π, 2π)\` sao cho \`cos θ = -√3/2\`.

### Bài 4: dùng Pythagorean identity

Cho \`sin θ = 3/5\` và \`θ\` thuộc QII. Tìm \`cos θ\` và \`tan θ\`.

(Gợi ý: dùng \`sin²θ + cos²θ = 1\` để tìm \`|cos θ|\`, rồi áp dấu theo quadrant.)

### Bài 5: chứng minh \`cos(π/2 - θ) = sin θ\`

Đây là **cofunction identity** — chứng minh bằng cách dùng đường tròn đơn vị (đối xứng qua đường \`y = x\`).

### Bài 6: code Go

Viết file \`solutions.go\` với các hàm:

a) \`pointOnCircle(theta float64) (x, y float64)\` — trả \`(cos θ, sin θ)\`.

b) \`whichQuadrant(theta float64) int\` — trả \`1, 2, 3, 4\` ứng QI/QII/QIII/QIV. Với góc trên trục (vd \`θ = 90°\`), trả \`0\`. Phải xử lý cả góc âm và góc > \`2π\` (quy về \`[0, 2π)\` trước).

c) Hàm \`main()\` chạy test 8 góc: \`0°, 30°, 45°, 90°, 150°, 210°, 300°, 359°\`. In \`(cos, sin, quadrant)\` cho mỗi.

---

## 11. Lời giải chi tiết

### Bài 1

| Câu | \`θ\` | Quadrant/Trục | \`cos θ\` | \`sin θ\` | \`tan θ\` |
|-----|-----|---------------|---------|---------|---------|
| a) | \`0°\` | Trục Ox+ | \`1\` | \`0\` | \`0\` |
| b) | \`π/6 = 30°\` | QI | \`√3/2\` | \`1/2\` | \`1/√3 ≈ 0.577\` |
| c) | \`π/3 = 60°\` | QI | \`1/2\` | \`√3/2\` | \`√3 ≈ 1.732\` |
| d) | \`90°\` | Trục Oy+ | \`0\` | \`1\` | không xác định |
| e) | \`2π/3 = 120°\` | QII | \`-1/2\` | \`√3/2\` | \`-√3\` |
| f) | \`135°\` | QII | \`-√2/2\` | \`√2/2\` | \`-1\` |
| g) | \`π = 180°\` | Trục Ox- | \`-1\` | \`0\` | \`0\` |
| h) | \`7π/6 = 210°\` | QIII | \`-√3/2\` | \`-1/2\` | \`1/√3\` |
| i) | \`240°\` | QIII | \`-1/2\` | \`-√3/2\` | \`√3\` |
| j) | \`3π/2 = 270°\` | Trục Oy- | \`0\` | \`-1\` | không xác định |
| k) | \`11π/6 = 330°\` | QIV | \`√3/2\` | \`-1/2\` | \`-1/√3\` |
| l) | \`100°\` | QII | \`≈ -0.1736\` | \`≈ 0.9848\` | \`≈ -5.6713\` |

**Cách tính câu l)** (góc bất kỳ): áp dụng quy trình 3 bước.

- Bước 1: \`100° ∈ QII\` → \`sin+, cos-, tan-\`.
- Bước 2: \`α = 180° - 100° = 80°\`.
- Bước 3: tra máy: \`sin 80° ≈ 0.9848\`, \`cos 80° ≈ 0.1736\`, \`tan 80° ≈ 5.6713\`.

Áp dấu:

\`\`\`
sin 100° ≈ +0.9848
cos 100° ≈ -0.1736
tan 100° ≈ -5.6713
\`\`\`

### Bài 2

**Đề**: Tìm tất cả \`θ ∈ [0, 2π)\` với \`sin θ = 1/2\`.

**Cách tiếp cận**:

- \`sin θ = 1/2 > 0\` → \`θ\` ở QI hoặc QII (ASTC: Sin dương ở QI, QII).
- Tra bảng: \`sin 30° = 1/2\`, tức \`α = 30°\` là góc tham chiếu.
- Tại QI: \`θ_1 = α = 30° = π/6\`.
- Tại QII: \`θ_2 = 180° - α = 150° = 5π/6\`.

**Đáp số**: \`θ = π/6\` hoặc \`θ = 5π/6\`.

**Kiểm chứng**:
- \`sin(π/6) = 1/2\` ✓ (tra bảng).
- \`sin(5π/6) = sin(π - π/6) = sin(π/6) = 1/2\` ✓ (quy gọn mục 6).

### Bài 3

**Đề**: Tìm tất cả \`θ ∈ [-2π, 2π)\` với \`cos θ = -√3/2\`.

**Cách tiếp cận**:

- \`cos θ = -√3/2 < 0\` → \`θ\` ở QII hoặc QIII (ASTC: Cos âm ở QII, QIII).
- Tra bảng: \`cos 30° = √3/2\`, tức \`α = 30° = π/6\`.
- Tại QII: \`θ = π - α = π - π/6 = 5π/6 = 150°\`.
- Tại QIII: \`θ = π + α = π + π/6 = 7π/6 = 210°\`.

→ Trong \`[0, 2π)\`: hai nghiệm \`5π/6\` và \`7π/6\`.

Để mở rộng sang \`[-2π, 0)\`: dùng tính tuần hoàn — trừ \`2π\` từ mỗi nghiệm:

\`\`\`
5π/6 - 2π = 5π/6 - 12π/6 = -7π/6
7π/6 - 2π = 7π/6 - 12π/6 = -5π/6
\`\`\`

Kiểm: \`-7π/6 ≥ -2π = -12π/6\` ✓ (vì \`-7π/6 > -12π/6\`). Và \`-5π/6 ≥ -2π\` ✓.

**Đáp số 4 nghiệm**: \`θ ∈ {-7π/6, -5π/6, 5π/6, 7π/6}\`.

**Kiểm chứng tại \`θ = -7π/6\`**: \`-7π/6 + 2π = 5π/6\` (đồng kết với \`5π/6\`) → cùng \`cos\` → \`cos(-7π/6) = cos(5π/6) = -√3/2\` ✓.

### Bài 4

**Đề**: \`sin θ = 3/5\`, \`θ ∈ QII\`. Tìm \`cos θ, tan θ\`.

**Cách tiếp cận**: Pythagorean identity \`sin²θ + cos²θ = 1\`:

\`\`\`
(3/5)² + cos²θ = 1
9/25 + cos²θ = 1
cos²θ = 1 - 9/25 = 16/25
cos θ = ±4/5
\`\`\`

Ở QII, \`cos < 0\`, nên \`cos θ = -4/5\`.

\`\`\`
tan θ = sin θ / cos θ = (3/5) / (-4/5) = -3/4
\`\`\`

**Đáp số**: \`cos θ = -4/5\`, \`tan θ = -3/4\`.

**Kiểm chứng dấu**: \`θ ∈ QII\` → ASTC: \`sin+ (3/5 > 0 ✓), cos- (-4/5 < 0 ✓), tan- (-3/4 < 0 ✓)\`. Khớp.

**Cảm nhận hình học**: điểm \`P = (-4/5, 3/5)\` thật sự nằm trên đường tròn đơn vị vì \`(-4/5)² + (3/5)² = 16/25 + 9/25 = 25/25 = 1\` ✓.

### Bài 5: chứng minh \`cos(π/2 - θ) = sin θ\`

**Cách tiếp cận**: dùng đối xứng trên đường tròn đơn vị.

Đặt \`θ ∈ (0, π/2)\` (góc nhọn). Đặt:

- \`P = (cos θ, sin θ)\` ứng với góc \`θ\`.
- \`P' = (cos(π/2 - θ), sin(π/2 - θ))\` ứng với góc \`π/2 - θ\`.

Vẽ:

\`\`\`
         y
         ↑
         │ y = x  (đường phân giác QI)
         │  ╱
       P'│ ╱   
         ●     ← góc π/2 - θ
        ╱│    
       ╱ │    
      ╱  │   P
     ╱   │   ●  ← góc θ
    ╱    │   │  
   ╱     │   │  
─────────●───●──→ x
         O   x_P
\`\`\`

**Quan sát**: hai góc \`θ\` và \`π/2 - θ\` cộng lại bằng \`π/2\` (\`= 90°\`). Hai bán kính \`OP\` và \`OP'\` đối xứng nhau qua đường phân giác \`y = x\` của QI.

Phép đối xứng qua \`y = x\` đổi tọa độ \`(a, b) ↔ (b, a)\`. Nên:

\`\`\`
P' = (y_P, x_P) = (sin θ, cos θ)
\`\`\`

Mặt khác theo định nghĩa đường tròn đơn vị:

\`\`\`
P' = (cos(π/2 - θ), sin(π/2 - θ))
\`\`\`

So sánh hai biểu diễn của \`P'\`:

\`\`\`
cos(π/2 - θ) = sin θ      ✓ (đpcm)
sin(π/2 - θ) = cos θ      (bonus: cofunction kia)
\`\`\`

**Kiểm chứng với \`θ = 30°\`**:

\`\`\`
cos(90° - 30°) = cos 60° = 1/2
sin 30° = 1/2          ✓ Khớp
\`\`\`

**Kiểm chứng với \`θ = 45°\`**:

\`\`\`
cos(90° - 45°) = cos 45° = √2/2
sin 45° = √2/2         ✓ Khớp
\`\`\`

(Chứng minh trên đúng cho \`θ ∈ (0, π/2)\`. Mở rộng cho mọi \`θ\` thực: dùng tính tuần hoàn + công thức cộng — sẽ học Lesson 06.)

### Bài 6: code Go

Lời giải đầy đủ trong file [\`solutions.go\`](./solutions.go). Tóm tắt:

\`\`\`go
func pointOnCircle(theta float64) (x, y float64) {
    return math.Cos(theta), math.Sin(theta)
}

func whichQuadrant(theta float64) int {
    // Quy về [0, 2π) trước
    t := math.Mod(theta, 2*math.Pi)
    if t < 0 { t += 2 * math.Pi }
    const eps = 1e-9
    switch {
    case math.Abs(t) < eps || math.Abs(t - 2*math.Pi) < eps: return 0  // trục Ox+
    case math.Abs(t - math.Pi/2) < eps: return 0                        // trục Oy+
    case math.Abs(t - math.Pi) < eps: return 0                          // trục Ox-
    case math.Abs(t - 3*math.Pi/2) < eps: return 0                      // trục Oy-
    case t < math.Pi/2:    return 1
    case t < math.Pi:      return 2
    case t < 3*math.Pi/2:  return 3
    default:               return 4
    }
}
\`\`\`

**Kết quả test cho 8 góc**:

| Góc | \`(cos, sin)\` | Quadrant |
|-----|--------------|----------|
| \`0°\` | \`(1.000, 0.000)\` | 0 (trục) |
| \`30°\` | \`(0.866, 0.500)\` | 1 |
| \`45°\` | \`(0.707, 0.707)\` | 1 |
| \`90°\` | \`(0.000, 1.000)\` | 0 (trục) |
| \`150°\` | \`(-0.866, 0.500)\` | 2 |
| \`210°\` | \`(-0.866, -0.500)\` | 3 |
| \`300°\` | \`(0.500, -0.866)\` | 4 |
| \`359°\` | \`(0.9998, -0.0175)\` | 4 |

**Độ phức tạp**: O(1) cho cả hai hàm.

---

## Code và minh họa

- Code Go đầy đủ: [\`solutions.go\`](./solutions.go) — chạy \`go run solutions.go\` để xem bảng tọa độ 12 góc, kiểm tra quadrant, verify công thức quy gọn, và đáp án bài tập.
- Trang minh họa tương tác: [\`visualization.html\`](./visualization.html) — kéo điểm \`P\` quanh đường tròn đơn vị, xem \`(cos θ, sin θ)\`, quadrant tô màu, dấu sin/cos/tan, và visualizer cho 4 công thức quy gọn.

## Bài tiếp theo

- **Trước**: [Lesson 02 — Tam giác vuông, SOH-CAH-TOA](../lesson-02-right-triangle/)
- **Tiếp**: [Lesson 04 — Đồ thị hàm lượng giác](../lesson-04-trig-graphs/) — vẽ \`y = sin x\` và \`y = cos x\` theo \`x ∈ ℝ\`, hiểu tính chu kỳ một cách trực quan, biên độ, pha, tần số.
- **Tham khảo**: Khan Academy "Unit circle"; 3Blue1Brown "Trigonometry"; Vaswani et al. "Attention Is All You Need" (positional encoding); Su et al. "RoFormer: Enhanced Transformer with Rotary Position Embedding" (RoPE).
`;
