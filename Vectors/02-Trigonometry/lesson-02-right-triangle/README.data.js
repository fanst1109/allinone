// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/02-Trigonometry/lesson-02-right-triangle/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Tam giác vuông: sin, cos, tan

> **Tầng 2 — Trigonometry · Bài 2/6**
>
> Đây là bài học "đặt nền" cho toàn bộ lượng giác. Sau bài này, mỗi khi nhìn thấy $\\sin\\theta$, $\\cos\\theta$, $\\tan\\theta$, bạn không còn nghĩ tới "một cái nút trên máy tính bỏ túi" mà nghĩ ngay tới **ba tỷ số cạnh trong một tam giác vuông**. Đó là khác biệt giữa hiểu công thức và **biết công thức từ đâu ra**.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Vẽ được một tam giác vuông và chỉ đúng đâu là **cạnh đối**, **cạnh kề**, **cạnh huyền** ứng với một góc nhọn cho trước.
- Phát biểu và dùng được định lý **Pythagoras** $a^2 + b^2 = c^2$ để tìm cạnh thiếu.
- Tính được $\\sin\\theta$, $\\cos\\theta$, $\\tan\\theta$ cho bất kỳ tam giác vuông nào bằng cách áp dụng quy tắc **SOH-CAH-TOA**.
- Thuộc lòng **bảng giá trị đặc biệt** ở $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ — không cần máy tính.
- Chứng minh và sử dụng **đẳng thức Pythagoras** $\\sin^2\\theta + \\cos^2\\theta = 1$ cùng hai hệ quả.
- Hiểu **hàm ngược** $\\arcsin$, $\\arccos$, $\\arctan$ và biết vì sao \`math.Atan2(y, x)\` quan trọng hơn \`math.Atan(y/x)\` trong code.
- Nhìn thấy mối liên hệ giữa $\\cos\\theta$ và **cosine similarity** sẽ học ở Tầng 4/6.

## Kiến thức tiền đề

- [Lesson 01 — Góc: độ và radian](../lesson-01-angles/): biết góc là gì, đổi qua lại giữa độ và radian.
- Tầng 1 ([Algebra](../../01-Algebra/)) — Lesson 04 (căn bậc hai), Lesson 06 (Pythagoras đã được nhắc khi tính slope).

> Bài này hoàn toàn **không** đòi hỏi máy tính bỏ túi cho phần lý thuyết. Toàn bộ giá trị đặc biệt sẽ được tính tay từ hình học.

---

## 1. Tam giác vuông — ôn lại nền

### 💡 Trực giác

Tam giác vuông là **viên gạch xây nhà** của lượng giác. Lý do: mọi tam giác bất kỳ đều có thể chia thành hai tam giác vuông bằng cách hạ đường cao, và mọi vector trong mặt phẳng đều có thể "vuông góc hóa" thành hai cạnh — một ngang, một dọc — tạo thành tam giác vuông. Hiểu sâu một tam giác vuông = hiểu mọi tam giác.

### 1.1. Định nghĩa

Tam giác vuông (right triangle) là tam giác có **đúng một góc bằng $90^\\circ$**.

- Cạnh đối diện góc $90^\\circ$ gọi là **cạnh huyền** (hypotenuse). Nó luôn là **cạnh dài nhất** trong tam giác.
- Hai cạnh kề góc $90^\\circ$ (kề vào nó từ hai phía) gọi là **hai cạnh góc vuông** (legs).
- Hai góc nhọn (acute angles) còn lại có **tổng bằng $90^\\circ$**. Lý do: tổng ba góc của một tam giác $= 180^\\circ$, mà góc vuông đã "ăn" $90^\\circ$, nên hai góc còn lại phải chia nhau $90^\\circ$.

\`\`\`
            B
            |\\
            | \\
   cạnh kề  |  \\   cạnh huyền
  của góc A |   \\      c
    (b)     |    \\
            |     \\
            |______\\  <- góc vuông (90°)
            C   a   A
                |
       cạnh đối của góc A
\`\`\`

Nhìn từ góc nhọn **A**:

| Tên gọi | Là cạnh nào | Ý nghĩa |
|---------|-------------|---------|
| Cạnh đối (opposite) của A | $a$ (đối diện A) | Cạnh không chạm vào đỉnh A |
| Cạnh kề (adjacent) của A | $b$ | Cạnh kẹp giữa A và góc vuông |
| Cạnh huyền (hypotenuse) | $c$ | Cạnh đối diện góc vuông |

> Một điểm dễ nhầm: "cạnh kề" của A **không phải là cạnh huyền**, dù cả hai đều chạm đỉnh A. Quy ước phân biệt: cạnh huyền luôn là cạnh đối diện góc $90^\\circ$. Cạnh kề là **cạnh còn lại** chạm A — tức cạnh kẹp giữa A và góc vuông.

### 1.2. Định lý Pythagoras

Trong một tam giác vuông với hai cạnh góc vuông $a$, $b$ và cạnh huyền $c$:

$$a^2 + b^2 = c^2$$

- $c$ luôn là **cạnh huyền** (dài nhất).
- Đọc là "bình phương cạnh huyền = tổng bình phương hai cạnh góc vuông".

### Walk-through bằng số thật (4 ví dụ)

| $a$ | $b$ | $a^2 + b^2$ | $c = \\sqrt{a^2+b^2}$ | Có là tam giác vuông số nguyên? |
|-----|-----|-----------|----------------|---------------------------------|
| 3   | 4   | $9 + 16 = 25$ | $\\sqrt{25} = 5$      | ✓ Bộ ba 3-4-5 (kinh điển) |
| 5   | 12  | $25 + 144 = 169$ | $\\sqrt{169} = 13$ | ✓ Bộ ba 5-12-13 |
| 8   | 15  | $64 + 225 = 289$ | $\\sqrt{289} = 17$ | ✓ Bộ ba 8-15-17 |
| 1   | 1   | $1 + 1 = 2$ | $\\sqrt{2} \\approx 1.4142$     | Không nguyên, nhưng vẫn vuông |
| 1   | $\\sqrt{3}$  | $1 + 3 = 4$ | $\\sqrt{4} = 2$          | Tam giác 30-60-90 (sẽ gặp lại) |

> Các bộ $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$ gọi là **bộ ba Pythagore (Pythagorean triple)** — ba số nguyên thỏa mãn $a^2 + b^2 = c^2$. Chúng được dùng làm "tam giác sạch" trong bài tập vì kết quả tròn.

### Chứng minh ngắn (cắt ghép hình)

Có hàng trăm cách chứng minh Pythagoras. Cách dễ hình dung nhất:

\`\`\`
   Ghép 4 tam giác vuông giống nhau vào trong 1 hình vuông cạnh (a+b):

     ┌─────────────┐
     │ \\         / │     - Hình vuông lớn cạnh (a+b)  → diện tích (a+b)²
     │  \\   c   /  │     - Bên trong: hình vuông nhỏ cạnh c (xoay 45°)
     │   \\     /   │       → diện tích c²
     │ T1 \\   / T2 │     - 4 tam giác vuông, mỗi cái diện tích (a·b)/2
     │     \\ /     │       → tổng 4·(a·b)/2 = 2ab
     │      X      │
     │     / \\     │     Vậy: (a+b)² = c² + 2ab
     │    /   \\    │           a² + 2ab + b² = c² + 2ab
     │ T3/  c  \\T4 │           a² + b² = c²    ✓
     │  /       \\  │
     │ /         \\ │
     └─────────────┘
\`\`\`

Hai vế triệt tiêu $2ab$ → ra ngay $a^2 + b^2 = c^2$. Không phải "dễ thấy", mà là khai triển trực tiếp.

### ⚠ Lỗi thường gặp

1. **Nhầm cạnh huyền** với một trong hai cạnh góc vuông. Cạnh huyền **luôn đối diện góc $90^\\circ$** và **luôn dài nhất**. Khi cho $a = 3$, $c = 5$, đừng vội viết $b^2 = 5^2 + 3^2 = 34$ — đó là sai. Đúng là $b^2 = c^2 - a^2 = 25 - 9 = 16 \\to b = 4$.
2. **Quên rằng Pythagoras chỉ áp dụng cho tam giác vuông**. Với tam giác bất kỳ phải dùng **định luật cosin** (sẽ học ở Lesson 04): $c^2 = a^2 + b^2 - 2ab\\cos C$. Pythagoras là trường hợp đặc biệt khi $C = 90^\\circ$ (vì $\\cos 90^\\circ = 0$).
3. **Cho rằng "3-4-5" là tỷ lệ duy nhất". Bộ ba Pythagore có vô số: $(3,4,5)$, $(6,8,10)$, $(9,12,15)$, ... — tất cả bội số của $(3,4,5)$ đều là tam giác vuông.

### ❓ Câu hỏi tự nhiên

**Q1: Tại sao cạnh huyền lại dài nhất?**

Vì cạnh huyền đối diện góc lớn nhất ($90^\\circ$), và trong một tam giác, **cạnh đối diện góc lớn hơn thì dài hơn** (định lý cạnh-góc). Hai góc nhọn còn lại đều $< 90^\\circ$, nên hai cạnh đối diện chúng đều ngắn hơn cạnh huyền.

**Q2: Có thể có tam giác vuông với cạnh huyền = cạnh góc vuông không?**

Không. Nếu $c = a$ thì $a^2 + b^2 = a^2 \\Rightarrow b^2 = 0 \\Rightarrow b = 0$. Tam giác suy biến thành một đoạn thẳng, không còn là tam giác.

**Q3: Pythagoras có dùng được khi cạnh là số vô tỉ không?**

Có. Định lý đúng cho mọi số thực dương. Ví dụ tam giác cạnh $(1, 1, \\sqrt{2})$: $1^2 + 1^2 = 2 = (\\sqrt{2})^2$. Đó chính là tam giác vuông cân — sẽ dùng ngay ở mục giá trị đặc biệt $45^\\circ$.

### 🔁 Dừng lại tự kiểm tra (Mục 1)

1. Cho tam giác vuông có cạnh huyền 13 và một cạnh góc vuông 5. Tìm cạnh còn lại. *(Đáp: $b^2 = 169 - 25 = 144 \\to b = 12$)*
2. Bộ $(6, 8, 10)$ có là tam giác vuông không? *(Đáp: $6^2 + 8^2 = 36 + 64 = 100 = 10^2$ → có)*
3. Hai góc nhọn của một tam giác vuông là $35^\\circ$ và $X^\\circ$. $X = ?$ *(Đáp: $90 - 35 = 55^\\circ$)*

### 📝 Tóm tắt mục 1

- Tam giác vuông = tam giác có 1 góc $90^\\circ$.
- Cạnh huyền (hypotenuse) đối diện góc $90^\\circ$ và là cạnh dài nhất.
- 2 góc nhọn cộng lại $= 90^\\circ$.
- Pythagoras: $a^2 + b^2 = c^2$ với $c$ là huyền.
- Pythagoras là **trường hợp đặc biệt** của định luật cosin khi góc $= 90^\\circ$.

---

## 2. Định nghĩa sin, cos, tan qua tỉ số cạnh

### 💡 Trực giác

Cố định góc nhọn $\\theta$ rồi vẽ một loạt tam giác vuông có cùng góc $\\theta$ đó nhưng kích thước khác nhau (nhỏ, vừa, to). Mọi tam giác vẽ ra đều **đồng dạng** (similar) — vì có cùng các góc $90^\\circ$, $\\theta$, và $90^\\circ - \\theta$. Đồng dạng nghĩa là **tỉ số giữa các cạnh không đổi**, dù tam giác có to hay nhỏ.

Vậy chỉ cần 3 tỷ số là đủ "đại diện" cho góc $\\theta$. Người ta đặt tên cho chúng là $\\sin\\theta$, $\\cos\\theta$, $\\tan\\theta$. Đó là toàn bộ trigonometry tam giác vuông gói gọn trong 3 dòng:

### 2.1. Ba tỷ số

Trong tam giác vuông, đứng từ góc nhọn $\\theta$:

$$\\sin\\theta = \\frac{\\text{đối (opposite)}}{\\text{huyền (hypotenuse)}}$$

$$\\cos\\theta = \\frac{\\text{kề (adjacent)}}{\\text{huyền (hypotenuse)}}$$

$$\\tan\\theta = \\frac{\\text{đối (opposite)}}{\\text{kề (adjacent)}}$$

### Mnemonic SOH-CAH-TOA

Ba chữ cái cho mỗi hàm, rất dễ nhớ:

| Viết tắt | Ý | Công thức |
|----------|---|-----------|
| **SOH** | **S**in = **O**pposite / **H**ypotenuse | $\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}$ |
| **CAH** | **C**os = **A**djacent / **H**ypotenuse | $\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}$ |
| **TOA** | **T**an = **O**pposite / **A**djacent   | $\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}$ |

> Đọc to nhiều lần "SO-CA-TO-A" cho thuộc — trong các kỳ thi và phỏng vấn bạn không có thời gian suy luận, chỉ có 2 giây để viết ra.

### 2.2. Walk-through bằng tam giác cụ thể

**Ví dụ 1: tam giác 3-4-5**

\`\`\`
            B
            |\\
            | \\
        4   |  \\  5
            |   \\
            |____\\
            C  3  A   ← từ A nhìn ra:
                          opp(A) = a = 4 (đối diện A là cạnh BC = 4)
                          adj(A) = b = 3 (kề A, không phải huyền)
                          hyp   = c = 5
\`\`\`

Tính từ góc A:

- $\\sin A = \\dfrac{\\text{opp}}{\\text{hyp}} = \\dfrac{4}{5} = 0.8$
- $\\cos A = \\dfrac{\\text{adj}}{\\text{hyp}} = \\dfrac{3}{5} = 0.6$
- $\\tan A = \\dfrac{\\text{opp}}{\\text{adj}} = \\dfrac{4}{3} \\approx 1.333$

Verify Pythagoras: $\\left(\\frac{4}{5}\\right)^2 + \\left(\\frac{3}{5}\\right)^2 = \\frac{16}{25} + \\frac{9}{25} = \\frac{25}{25} = 1$ ✓ — đây cũng đúng là $\\sin^2 A + \\cos^2 A = 1$ (sẽ chứng minh ở mục 6).

**Ví dụ 2: tam giác 5-12-13**

Từ góc đối diện cạnh 5:

- $\\sin\\theta = \\dfrac{5}{13} \\approx 0.3846$
- $\\cos\\theta = \\dfrac{12}{13} \\approx 0.9231$
- $\\tan\\theta = \\dfrac{5}{12} \\approx 0.4167$

Vì $\\frac{5}{13}$ nhỏ và $\\frac{12}{13}$ lớn, có thể đoán ngay $\\theta$ là **góc nhỏ** (gần 0). Verify: $\\arctan\\frac{5}{12} \\approx 22.6^\\circ$ — đúng góc nhọn nhỏ.

**Ví dụ 3: tam giác 8-15-17**

Từ góc đối diện cạnh 15 (góc lớn hơn trong 2 góc nhọn):

- $\\sin\\theta = \\dfrac{15}{17} \\approx 0.8824$
- $\\cos\\theta = \\dfrac{8}{17} \\approx 0.4706$
- $\\tan\\theta = \\dfrac{15}{8} = 1.875$

Tại đây $\\sin > \\cos$ → $\\theta > 45^\\circ$. Verify: $\\arctan\\frac{15}{8} \\approx 61.93^\\circ$.

**Ví dụ 4: tam giác $1$-$1$-$\\sqrt{2}$ (vuông cân)**

\`\`\`
            |\\
            | \\
        1   |  \\  √2
            |   \\
            |____\\
                1
\`\`\`

Hai cạnh góc vuông bằng nhau → hai góc nhọn bằng nhau → mỗi góc $= 45^\\circ$. Tính:

- $\\sin 45^\\circ = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2} \\approx 0.7071$
- $\\cos 45^\\circ = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2} \\approx 0.7071$
- $\\tan 45^\\circ = \\dfrac{1}{1} = 1$

$\\sin = \\cos$ chính là dấu hiệu $\\theta = 45^\\circ$. Sẽ dùng kết quả này ở mục 4.

### 💡 Trực giác sâu hơn: vì sao gọi là "sin", "cos"?

- **sin** rút gọn từ Latin *sinus* nghĩa là "vịnh" hoặc "túi" — dịch chuyển từ tiếng Ả Rập *jiba* qua chuyển ngữ nhầm thành *jaib* (cùng âm trong Ả Rập). Hình ảnh: nếu cạnh huyền là một sợi dây cung, $\\sin\\theta$ là **độ cao của dây cung so với đường nằm ngang** — đo "cong nhiều hay ít".
- **cos** = "complement sin" = sin của góc bù $90^\\circ - \\theta$. Vì $\\cos\\theta = \\sin(90^\\circ - \\theta)$, nó đo thành phần "ngang" trong khi sin đo thành phần "dọc".
- **tan** = "tangent" (tiếp tuyến). Khi vẽ đường tròn đơn vị (sẽ ở Lesson 03), $\\tan\\theta$ chính là độ dài đoạn tiếp tuyến từ điểm trên đường tròn xuống trục — Lesson 03 sẽ chỉ rõ.

Cách hình dung trực quan nhất:

> Nắm chặt cạnh huyền. Khi $\\theta$ rất nhỏ ($\\approx 0^\\circ$), cạnh đối gần như không có (rất ngắn), cạnh kề trùng huyền. Vậy $\\sin\\theta \\approx 0$, $\\cos\\theta \\approx 1$.
>
> Khi $\\theta$ tiến tới $90^\\circ$, cạnh đối "vươn dài" gần bằng huyền, cạnh kề co lại còn 0. Vậy $\\sin\\theta \\to 1$, $\\cos\\theta \\to 0$.
>
> Càng tăng $\\theta$ từ $0^\\circ$ đến $90^\\circ$: $\\sin$ đi từ 0 lên 1 (đơn điệu tăng), $\\cos$ đi từ 1 xuống 0 (đơn điệu giảm).

### ❓ Câu hỏi tự nhiên

**Q1: Nếu tôi chọn tam giác to gấp đôi (6-8-10 thay vì 3-4-5), $\\sin$ có đổi không?**

Không. $\\sin A = \\frac{8}{10} = 0.8$ (tam giác 6-8-10) $= \\frac{4}{5} = 0.8$ (tam giác 3-4-5). Tỷ số giữ nguyên dù tam giác phóng to/thu nhỏ. Đó chính là lý do $\\sin/\\cos/\\tan$ được định nghĩa là **hàm của góc**, không phải hàm của kích thước tam giác.

**Q2: $\\sin\\theta$ có thể $> 1$ không?**

Trong tam giác vuông thì **không**. Vì $\\text{opp} \\le \\text{hyp}$ luôn đúng (cạnh đối là cạnh góc vuông, ngắn hơn cạnh huyền) → $\\sin = \\frac{\\text{opp}}{\\text{hyp}} \\le 1$. Tương tự $\\cos \\le 1$. Còn $\\tan = \\frac{\\text{opp}}{\\text{adj}}$ thì **có thể bất kỳ giá trị nào** từ 0 đến $+\\infty$ khi $\\theta \\to 90^\\circ$ (do $\\text{adj} \\to 0$).

**Q3: Vậy tôi có 3 hàm. Ba có thừa không? Một có suy ra hai cái còn lại?**

Có: biết $\\sin\\theta$, bạn suy ra $\\cos\\theta = \\sqrt{1 - \\sin^2\\theta}$ (từ đẳng thức Pythagoras ở mục 6) và $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$. Tức về mặt toán học, **một là đủ**. Lý do ta định nghĩa cả 3: tiện công thức và tiện ngữ cảnh (ví dụ slope của đường thẳng $= \\tan(\\text{góc với Ox})$, không tự nhiên nếu phải viết $\\sin/\\cos$).

**Q4: $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ — chứng minh trong 1 dòng**

$$\\frac{\\sin\\theta}{\\cos\\theta} = \\frac{\\text{opp}/\\text{hyp}}{\\text{adj}/\\text{hyp}} = \\frac{\\text{opp}}{\\text{hyp}} \\cdot \\frac{\\text{hyp}}{\\text{adj}} = \\frac{\\text{opp}}{\\text{adj}} = \\tan\\theta \\quad ✓$$

### ⚠ Lỗi thường gặp

1. **Nhầm "đối" và "kề"**. Quy tắc: đứng từ góc cần tính, "đối" = cạnh không chạm góc đó; "kề" = cạnh chạm góc đó nhưng không phải huyền.
2. **Quên rằng cùng tam giác nhưng nhìn từ góc khác → tỷ số khác**. Trong tam giác 3-4-5, từ góc A (đối diện 4): $\\sin A = \\frac{4}{5}$. Nhưng từ góc B (đối diện 3): $\\sin B = \\frac{3}{5}$. Hai góc khác nhau → hai giá trị $\\sin$ khác nhau.
3. **Áp dụng cho tam giác không vuông**. SOH-CAH-TOA chỉ đúng cho tam giác vuông. Với tam giác bất kỳ, có **định luật sin** và **định luật cosin** (Lesson 04).

### 🔁 Dừng lại tự kiểm tra (Mục 2)

1. Trong tam giác 5-12-13, tính $\\cos$ của góc đối diện cạnh 12. *(Đáp: cạnh kề = 5, huyền = 13 → $\\cos = \\frac{5}{13} \\approx 0.385$)*
2. Nếu $\\sin\\theta = 0.6$ thì $\\cos\\theta$ là bao nhiêu (giả sử $\\theta$ nhọn)? *(Đáp: $\\cos\\theta = \\sqrt{1 - 0.36} = \\sqrt{0.64} = 0.8$)*
3. $\\tan 45^\\circ$ bằng bao nhiêu? *(Đáp: 1, vì tam giác vuông cân có $\\text{opp} = \\text{adj}$)*

### 📝 Tóm tắt mục 2

- $\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}$.
- Mnemonic: **SOH-CAH-TOA**.
- Tỷ số không phụ thuộc kích thước tam giác (chỉ phụ thuộc góc).
- $0 \\le \\sin\\theta \\le 1$, $0 \\le \\cos\\theta \\le 1$ (trong tam giác vuông).
- $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.

---

## 3. Giá trị đặc biệt 0°, 30°, 45°, 60°, 90°

### 💡 Trực giác

Có 5 góc bạn phải thuộc lòng như bảng cửu chương: **$0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$**. Lý do: chúng xuất hiện trong xoay ảnh, rotation matrix, RoPE positional encoding, phân tích vector — và quan trọng nhất, **được tính bằng tay từ hình học**, không cần máy tính. Bạn không thể tra $\\sin 30^\\circ$ lúc đang vẽ bảng trên giấy.

### 3.1. Góc 45° — từ tam giác vuông cân

Tam giác vuông cân (hai cạnh góc vuông bằng nhau) → hai góc nhọn cùng $= 45^\\circ$. Đặt mỗi cạnh góc vuông $= 1$, dùng Pythagoras:

$$\\text{huyền}^2 = 1^2 + 1^2 = 2 \\to \\text{huyền} = \\sqrt{2}$$

\`\`\`
        45°
         |\\
         | \\
       1 |  \\ √2
         |   \\
         |____\\ 45°
            1
\`\`\`

Từ định nghĩa SOH-CAH-TOA:

$$\\begin{aligned}
\\sin 45^\\circ &= \\frac{\\text{opp}}{\\text{hyp}} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2} \\approx 0.7071 \\\\[4pt]
\\cos 45^\\circ &= \\frac{\\text{adj}}{\\text{hyp}} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2} \\approx 0.7071 \\\\[4pt]
\\tan 45^\\circ &= \\frac{\\text{opp}}{\\text{adj}} = \\frac{1}{1} = 1
\\end{aligned}$$

> Vì sao viết $\\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$? Quy ước "khử mẫu căn" — nhân tử và mẫu cho $\\sqrt{2}$: $\\frac{1}{\\sqrt{2}} \\cdot \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$. Hai cách viết đều đúng, nhưng $\\frac{\\sqrt{2}}{2}$ được coi là "dạng chuẩn".

### 3.2. Góc 30° và 60° — từ tam giác đều cắt đôi

Vẽ tam giác đều cạnh 2. Mỗi góc trong $= 60^\\circ$. Hạ đường cao từ một đỉnh xuống cạnh đối diện → cắt tam giác thành **hai tam giác vuông giống nhau**, mỗi cái:

- Có góc $60^\\circ$ (góc gốc của tam giác đều).
- Có góc $90^\\circ$ (do đường cao vuông góc đáy).
- Suy ra góc thứ ba $= 180 - 60 - 90 = 30^\\circ$.

\`\`\`
           A   <- góc đỉnh A = 60°
          /|\\
         / | \\
        /  |  \\
     2 /   |   \\ 2
      /    | h  \\
     /     |     \\
    /______|______\\
   B       D       C
   <- 1 ->|<- 1 ->
   
   Tam giác ABD vuông tại D:
     - góc B = 60°  (góc gốc)
     - góc A_trong_ABD = 30° (góc A bị chia đôi)
     - BD = 1 (đáy đã bị đường cao chia đôi từ 2 thành 1+1)
     - AB = 2 (cạnh tam giác đều)
     - AD = h (đường cao, cần tính)
\`\`\`

Tìm $h$ bằng Pythagoras trong tam giác $ABD$:

$$\\begin{aligned}
AD^2 + BD^2 &= AB^2 \\\\[4pt]
h^2 + 1^2 &= 2^2 \\\\[4pt]
h^2 &= 4 - 1 = 3 \\\\[4pt]
h &= \\sqrt{3}
\\end{aligned}$$

Vậy tam giác vuông $ABD$ có 3 cạnh: $1, \\sqrt{3}, 2$. Đây gọi là **tam giác 30-60-90 đặc biệt**, tỉ lệ cạnh $1 : \\sqrt{3} : 2$.

\`\`\`
           A (góc 30°)
           |\\
           | \\
       √3  |  \\ 2  ← huyền
           |   \\
           |____\\ B (góc 60°)
              1
            (D ở đỉnh vuông)
\`\`\`

Bây giờ đọc tỷ số từ **hai góc** khác nhau:

**Từ góc $60^\\circ$ (đỉnh B):**

- $\\text{opp}(B) = AD = \\sqrt{3}$ (đối diện B)
- $\\text{adj}(B) = BD = 1$ (kề B, không phải huyền)
- $\\text{hyp} = AB = 2$

$$\\begin{aligned}
\\sin 60^\\circ &= \\frac{\\sqrt{3}}{2} \\approx 0.8660 \\\\[4pt]
\\cos 60^\\circ &= \\frac{1}{2} = 0.5 \\\\[4pt]
\\tan 60^\\circ &= \\frac{\\sqrt{3}}{1} = \\sqrt{3} \\approx 1.7321
\\end{aligned}$$

**Từ góc $30^\\circ$ (đỉnh A):**

- $\\text{opp}(A) = BD = 1$
- $\\text{adj}(A) = AD = \\sqrt{3}$
- $\\text{hyp} = AB = 2$

$$\\begin{aligned}
\\sin 30^\\circ &= \\frac{1}{2} = 0.5 \\\\[4pt]
\\cos 30^\\circ &= \\frac{\\sqrt{3}}{2} \\approx 0.8660 \\\\[4pt]
\\tan 30^\\circ &= \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3} \\approx 0.5774
\\end{aligned}$$

> Để ý sự **đối xứng**: $\\sin 30^\\circ = \\cos 60^\\circ = 0.5$ và $\\cos 30^\\circ = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$. Đó là quy tắc tổng quát $\\sin(90^\\circ - \\theta) = \\cos\\theta$ (sẽ chứng minh ở Lesson 03 trên đường tròn).

### 3.3. Góc 0° và 90° — các trường hợp giới hạn

Khi $\\theta \\to 0^\\circ$ thì tam giác vuông "ép phẳng" — cạnh đối co về 0, cạnh kề $\\approx$ huyền:

$$\\sin 0^\\circ = 0, \\quad \\cos 0^\\circ = 1, \\quad \\tan 0^\\circ = \\frac{0}{1} = 0$$

Khi $\\theta \\to 90^\\circ$ thì cạnh kề co về 0, cạnh đối $\\approx$ huyền:

$$\\sin 90^\\circ = 1, \\quad \\cos 90^\\circ = 0, \\quad \\tan 90^\\circ = \\frac{1}{0} = \\text{không xác định (undefined)}$$

> $\\tan 90^\\circ$ không có giá trị: khi $\\cos = 0$, mẫu của $\\tan = \\frac{\\sin}{\\cos}$ bằng 0 → chia cho 0. Đồ thị $\\tan\\theta$ có **đường tiệm cận đứng** tại $90^\\circ$. Trong code Go, \`math.Tan(math.Pi/2)\` trả về một số khổng lồ ($\\approx 1.6 \\times 10^{16}$) chứ không phải \`Inf\`, vì \`math.Pi/2\` không biểu diễn chính xác được bằng float64. Đừng tin số đó.

### 3.4. Bảng giá trị bắt buộc thuộc lòng

| $\\theta$ (độ) | $\\theta$ (rad) | $\\sin\\theta$         | $\\cos\\theta$         | $\\tan\\theta$         |
|---------:|----------:|:----------------|:----------------|:----------------|
| $\\mathbf{0^\\circ}$   | $0$         | $0$               | $1$               | $0$               |
| $\\mathbf{30^\\circ}$  | $\\pi/6$       | $\\mathbf{\\frac{1}{2}}$         | $\\mathbf{\\frac{\\sqrt{3}}{2}}$        | $\\mathbf{\\frac{\\sqrt{3}}{3}} = \\frac{1}{\\sqrt{3}}$ |
| $\\mathbf{45^\\circ}$  | $\\pi/4$       | $\\mathbf{\\frac{\\sqrt{2}}{2}}$        | $\\mathbf{\\frac{\\sqrt{2}}{2}}$        | $\\mathbf{1}$           |
| $\\mathbf{60^\\circ}$  | $\\pi/3$       | $\\mathbf{\\frac{\\sqrt{3}}{2}}$        | $\\mathbf{\\frac{1}{2}}$         | $\\mathbf{\\sqrt{3}}$          |
| $\\mathbf{90^\\circ}$  | $\\pi/2$       | $1$               | $0$               | không xác định  |

**Mẹo nhớ**: viết tử số của $\\sin$ theo thứ tự $0, 1, 2, 3, 4$, lấy $\\sqrt{\\phantom{x}}$ rồi chia cho 2:

| $\\theta$ | $\\sin\\theta$ (theo công thức nhớ) |
|-----|------------------------------|
| $0^\\circ$  | $\\frac{\\sqrt{0}}{2} = 0$                   |
| $30^\\circ$ | $\\frac{\\sqrt{1}}{2} = \\frac{1}{2}$                 |
| $45^\\circ$ | $\\frac{\\sqrt{2}}{2}$                       |
| $60^\\circ$ | $\\frac{\\sqrt{3}}{2}$                       |
| $90^\\circ$ | $\\frac{\\sqrt{4}}{2} = \\frac{2}{2} = 1$             |

$\\cos\\theta$ ngược lại (viết tử số 4, 3, 2, 1, 0 rồi căn $/ 2$). $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$, tính nhanh.

### ⚠ Lỗi thường gặp

1. **Nhớ nhầm $\\sin 30^\\circ$ với $\\sin 60^\\circ$**. Lý do: cả hai liên quan đến tam giác 30-60-90 và đều có dạng "phân số có 2 ở mẫu". Nhớ chốt:
   > $\\sin 30^\\circ = 0.5$ (rõ ràng nhỏ vì $30^\\circ$ là góc nhỏ).
   > $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2} \\approx 0.866$ (gần 1 vì $60^\\circ$ là góc lớn).
2. **Quên $\\tan 90^\\circ$ không tồn tại**. Khi gặp công thức có $\\tan(\\ldots)$ và $\\ldots$ có thể tiến đến $90^\\circ$, phải xét đặc biệt.
3. **Viết $\\frac{\\sqrt{2}}{2}$ thành $\\frac{2}{\\sqrt{2}}$** — đúng về toán nhưng "phi chuẩn". Quy ước: khử mẫu căn, đáp án cuối ở dạng tử số có căn.

### ❓ Câu hỏi tự nhiên

**Q1: Vì sao chỉ ưu tiên các góc 30, 45, 60? Tại sao không phải 20, 50, 80?**

Vì 30, 45, 60 có **giá trị đóng dạng đại số đẹp** ($\\frac{1}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}$). Các góc khác (như $20^\\circ$) có $\\sin$ là một số vô tỉ phức tạp, chỉ tính được gần đúng. Trong tính toán giải tích và trong thiết kế (rotation matrix, đường chéo hình vuông, tam giác đều), các góc 30/45/60 xuất hiện rất tự nhiên — toán học "ưu ái" chúng vì hình học chuẩn (hình vuông, tam giác đều) cho ra chúng.

**Q2: Tôi cần thuộc lòng cả radian lẫn độ?**

Có, vì ngữ cảnh khác nhau:

- Trong hình học và lập trình GUI/web: **độ**.
- Trong toán cao cấp, đạo hàm, ML library (\`numpy\`, Go \`math\`): **radian**. \`math.Sin(x)\` trong Go nhận radian.

Cố gắng "song ngữ" — khi nghĩ $30^\\circ$ luôn liên tưởng $\\frac{\\pi}{6}$.

**Q3: Sau bảng này, bao giờ cần biết $\\sin 22^\\circ$?**

Trong các bài đo đạc thực tế, đúng — không có bảng tay nào. Lúc đó dùng \`math.Sin(22 * math.Pi / 180)\`. Bảng tay chỉ phục vụ tính nhanh và để bạn **không bị lệ thuộc máy tính** khi suy luận lý thuyết.

### 🔁 Dừng lại tự kiểm tra (Mục 3)

1. $\\sin 60^\\circ + \\cos 30^\\circ = ?$ *(Đáp: $\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{3}}{2} = \\sqrt{3}$)*
2. $\\tan 45^\\circ \\cdot \\sin 30^\\circ = ?$ *(Đáp: $1 \\cdot 0.5 = 0.5$)*
3. Một thang nghiêng $45^\\circ$, dài 4m. Chân thang cách tường bao nhiêu? *(Đáp: $\\text{adj} = 4\\cos 45^\\circ = 4 \\cdot \\frac{\\sqrt{2}}{2} = 2\\sqrt{2} \\approx 2.83$m)*

### 📝 Tóm tắt mục 3

- Tam giác vuông cân (45-45-90) có tỉ lệ cạnh $1 : 1 : \\sqrt{2}$.
- Tam giác 30-60-90 có tỉ lệ cạnh $1 : \\sqrt{3} : 2$.
- Mẹo nhớ: $\\sin\\theta = \\frac{\\sqrt{k}}{2}$ với $k = 0, 1, 2, 3, 4$ cho $\\theta = 0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$.
- $\\tan 90^\\circ$ không xác định.
- $\\sin 30^\\circ = \\cos 60^\\circ = 0.5$; $\\sin 60^\\circ = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$.

---

## 4. Các hàm phụ: cotangent, secant, cosecant

### 💡 Trực giác

Ba hàm này là **nghịch đảo** của ba hàm chính. Trong ML/AI ngày nay, chúng **ít dùng**, nhưng vẫn xuất hiện trong sách giáo khoa và một số chứng minh, nên đáng biết.

### 4.1. Định nghĩa

$$\\begin{aligned}
\\cot\\theta &= \\frac{1}{\\tan\\theta} = \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{\\text{adj}}{\\text{opp}} \\\\[4pt]
\\sec\\theta &= \\frac{1}{\\cos\\theta} = \\frac{\\text{hyp}}{\\text{adj}} \\\\[4pt]
\\csc\\theta &= \\frac{1}{\\sin\\theta} = \\frac{\\text{hyp}}{\\text{opp}}
\\end{aligned}$$

($\\csc$ = cosecant; một số nơi viết $\\operatorname{cosec}$.)

### 4.2. Walk-through cho \`θ = 30°\`

| Hàm | Giá trị | Tính bằng |
|-----|---------|-----------|
| $\\cot 30^\\circ$ | $\\sqrt{3} \\approx 1.732$     | $\\frac{1}{\\tan 30^\\circ} = \\frac{1}{\\sqrt{3}/3} = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$ |
| $\\sec 30^\\circ$ | $\\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3} \\approx 1.155$ | $\\frac{1}{\\cos 30^\\circ} = \\frac{1}{\\sqrt{3}/2} = \\frac{2}{\\sqrt{3}}$ |
| $\\csc 30^\\circ$ | $2$              | $\\frac{1}{\\sin 30^\\circ} = \\frac{1}{1/2} = 2$ |

### 4.3. Khi nào không xác định?

- $\\cot\\theta$ không xác định khi $\\sin\\theta = 0$ (tức $\\theta = 0^\\circ, 180^\\circ, \\ldots$).
- $\\sec\\theta$ không xác định khi $\\cos\\theta = 0$ (tức $\\theta = 90^\\circ, 270^\\circ, \\ldots$).
- $\\csc\\theta$ không xác định khi $\\sin\\theta = 0$ (như $\\cot$).

### ⚠ Lưu ý

- $\\sec$ và $\\cos$ chứ không phải $\\sec \\leftrightarrow \\sin$. Tên gây nhầm: "secant" gợi "sin" nhưng thực ra là nghịch đảo $\\cos$. Lý do lịch sử (cách dựng hình từ thời cổ đại).
- Trong Go, **không có** sẵn \`math.Cot\`, \`math.Sec\`, \`math.Csc\`. Phải tự định nghĩa nếu cần: \`cot := 1.0/math.Tan(x)\`.

### 📝 Tóm tắt mục 4

- 3 hàm phụ là nghịch đảo: $\\cot = \\frac{1}{\\tan}$, $\\sec = \\frac{1}{\\cos}$, $\\csc = \\frac{1}{\\sin}$.
- Ít dùng trong code ML, không có sẵn trong \`math\` của Go.
- Cần để hiểu một số đẳng thức cổ điển ở mục 6.

---

## 5. Pythagorean identity — đẳng thức QUAN TRỌNG NHẤT

### 💡 Trực giác

Đây là **đẳng thức trung tâm của trigonometry**, sẽ xuất hiện ở mọi bài sau (Lesson 03 dùng để chứng minh điểm di chuyển trên đường tròn; Lesson 04 dùng cho định luật cosin; Lesson 05 dùng để rút gọn công thức cộng góc; Tầng 4 dùng để chuẩn hóa vector).

Phát biểu:

$$\\sin^2\\theta + \\cos^2\\theta = 1 \\quad (\\text{đúng với mọi góc } \\theta, \\text{ kể cả âm, lớn hơn } 90^\\circ, \\text{ vô tỉ } \\ldots)$$

> Lưu ý cách viết: $\\sin^2\\theta$ nghĩa là $(\\sin\\theta)^2$, **không phải** $\\sin(\\sin\\theta)$ hay $\\sin(\\theta^2)$. Đây là quy ước cổ điển của trigonometry.

### 5.1. Chứng minh từ Pythagoras

Lấy tam giác vuông với cạnh $a$ (opp), $b$ (adj), $c$ (hyp). Theo Pythagoras (mục 1.2):

$$a^2 + b^2 = c^2$$

Chia cả hai vế cho $c^2$ (được phép vì $c > 0$):

$$\\begin{aligned}
\\frac{a^2}{c^2} + \\frac{b^2}{c^2} &= \\frac{c^2}{c^2} \\\\[4pt]
\\left(\\frac{a}{c}\\right)^2 + \\left(\\frac{b}{c}\\right)^2 &= 1
\\end{aligned}$$

Nhưng $\\frac{a}{c} = \\sin\\theta$ và $\\frac{b}{c} = \\cos\\theta$ (theo định nghĩa SOH-CAH-TOA). Vậy:

$$\\sin^2\\theta + \\cos^2\\theta = 1 \\quad ✓$$

Chứng minh xong. Mỗi bước đều có lý do rõ — không có "dễ thấy".

### 5.2. Verify bằng số ở các góc đặc biệt

| $\\theta$ | $\\sin\\theta$ | $\\cos\\theta$ | $\\sin^2\\theta$ | $\\cos^2\\theta$ | Tổng |
|-----|---------|---------|---------|---------|------|
| $0^\\circ$  | $0$       | $1$       | $0$       | $1$       | 1 ✓  |
| $30^\\circ$ | $\\frac{1}{2}$     | $\\frac{\\sqrt{3}}{2}$    | $\\frac{1}{4}$     | $\\frac{3}{4}$     | 1 ✓  |
| $45^\\circ$ | $\\frac{\\sqrt{2}}{2}$    | $\\frac{\\sqrt{2}}{2}$    | $\\frac{1}{2}$     | $\\frac{1}{2}$     | 1 ✓  |
| $60^\\circ$ | $\\frac{\\sqrt{3}}{2}$    | $\\frac{1}{2}$     | $\\frac{3}{4}$     | $\\frac{1}{4}$     | 1 ✓  |
| $90^\\circ$ | $1$       | $0$       | $1$       | $0$       | 1 ✓  |

Tất cả đều cộng đúng 1 — bằng chứng số học cho đẳng thức.

### 5.3. Hai hệ quả

**Hệ quả 1: $1 + \\tan^2\\theta = \\sec^2\\theta$**

Chứng minh: chia cả hai vế của $\\sin^2\\theta + \\cos^2\\theta = 1$ cho $\\cos^2\\theta$ (đòi $\\cos\\theta \\neq 0$):

$$\\begin{aligned}
\\frac{\\sin^2\\theta}{\\cos^2\\theta} + \\frac{\\cos^2\\theta}{\\cos^2\\theta} &= \\frac{1}{\\cos^2\\theta} \\\\[4pt]
\\left(\\frac{\\sin\\theta}{\\cos\\theta}\\right)^2 + 1 &= \\left(\\frac{1}{\\cos\\theta}\\right)^2 \\\\[4pt]
\\tan^2\\theta + 1 &= \\sec^2\\theta \\quad ✓
\\end{aligned}$$

**Verify cho $\\theta = 30^\\circ$:**

- $\\tan 30^\\circ = \\frac{1}{\\sqrt{3}} \\to \\tan^2 30^\\circ = \\frac{1}{3}$
- $\\sec 30^\\circ = \\frac{2}{\\sqrt{3}} \\to \\sec^2 30^\\circ = \\frac{4}{3}$
- $1 + \\frac{1}{3} = \\frac{4}{3}$ ✓

**Hệ quả 2: $1 + \\cot^2\\theta = \\csc^2\\theta$**

Chứng minh: chia hai vế của $\\sin^2\\theta + \\cos^2\\theta = 1$ cho $\\sin^2\\theta$ (đòi $\\sin\\theta \\neq 0$):

$$1 + \\cot^2\\theta = \\csc^2\\theta \\quad ✓$$

**Verify cho $\\theta = 30^\\circ$:**

- $\\cot 30^\\circ = \\sqrt{3} \\to \\cot^2 30^\\circ = 3$
- $\\csc 30^\\circ = 2 \\to \\csc^2 30^\\circ = 4$
- $1 + 3 = 4$ ✓

### 5.4. Vì sao đẳng thức này quan trọng

- **Cho phép chuyển đổi qua lại giữa $\\sin$ và $\\cos$**: nếu biết $\\sin\\theta = 0.6$ (và biết $\\theta$ là góc nhọn), ta tính ngay $\\cos\\theta = \\sqrt{1 - 0.36} = 0.8$. Không cần đo cạnh hay máy tính.
- **Bảo toàn năng lượng / chuẩn vector**: trong vật lý, $\\sin^2$ và $\\cos^2$ thường biểu diễn năng lượng theo hai phương trục — tổng phải bằng tổng năng lượng ($= 1$ sau chuẩn hóa).
- **Trong ML**: dùng trong RoPE positional encoding — đảm bảo vector quay không đổi độ dài ($\\lVert v \\rVert^2 = \\sin^2 + \\cos^2 = 1$, sẽ thấy ở Lesson 06).

### ❓ Câu hỏi tự nhiên

**Q1: Đẳng thức có đúng khi $\\theta > 90^\\circ$ không? Tam giác vuông không có góc nhọn nào $> 90^\\circ$.**

Có. Khi mở rộng $\\sin$ và $\\cos$ ra ngoài tam giác vuông (bằng đường tròn đơn vị — Lesson 03), đẳng thức vẫn đúng. Chứng minh ở Lesson 03: trên đường tròn đơn vị, mỗi điểm có tọa độ $(\\cos\\theta, \\sin\\theta)$ và **trên đường tròn đơn vị, mọi điểm thỏa $x^2 + y^2 = 1$** → đẳng thức luôn đúng.

**Q2: Còn $\\theta$ âm?**

Đúng luôn. $\\cos(-\\theta) = \\cos\\theta$ và $\\sin(-\\theta) = -\\sin\\theta$, nên $\\sin^2(-\\theta) + \\cos^2(-\\theta) = \\sin^2\\theta + \\cos^2\\theta = 1$.

**Q3: Có công thức tương tự cho $\\tan$?**

Có, chính là Hệ quả 1: $\\tan^2\\theta = \\sec^2\\theta - 1$. Dùng khi trong tích phân và đạo hàm cần thay $1 + \\tan^2$ bằng $\\sec^2$.

### 🔁 Dừng lại tự kiểm tra (Mục 5)

1. $\\sin\\theta = 0.6$, $\\theta$ nhọn. Tính $\\cos\\theta$ và $\\tan\\theta$. *(Đáp: $\\cos\\theta = 0.8$, $\\tan\\theta = \\frac{0.6}{0.8} = 0.75$)*
2. Chứng minh $\\sin\\theta \\cdot \\csc\\theta = 1$ cho mọi $\\theta$ mà $\\sin\\theta \\neq 0$. *(Đáp: $\\csc\\theta = \\frac{1}{\\sin\\theta} \\to \\sin\\theta \\cdot \\frac{1}{\\sin\\theta} = 1$)*
3. Đúng/Sai: $\\sin^2 30^\\circ + \\cos^2 30^\\circ = \\sin^2 60^\\circ + \\cos^2 60^\\circ$. *(Đáp: Đúng — cả hai đều bằng 1)*

### 📝 Tóm tắt mục 5

- $\\sin^2\\theta + \\cos^2\\theta = 1$ đúng cho mọi $\\theta$.
- Suy ra $1 + \\tan^2\\theta = \\sec^2\\theta$ và $1 + \\cot^2\\theta = \\csc^2\\theta$.
- Dùng để chuyển đổi $\\sin \\leftrightarrow \\cos$ khi biết một trong hai.
- Là nền cho định nghĩa "đường tròn đơn vị" (Lesson 03) và chuẩn hóa vector (Tầng 4).

---

## 6. Hàm ngược: \`arcsin\`, \`arccos\`, \`arctan\`

### 💡 Trực giác

$\\sin$, $\\cos$, $\\tan$ đi từ **góc → tỉ số**. Trong nhiều bài toán thực tế, ta cần đi ngược: **biết tỉ số (đo được từ thực tế) → tìm góc**.

Ví dụ: bạn đứng cách tòa nhà 100m, ngước lên thấy đỉnh tòa nhà ở độ cao 60m. Hỏi góc nâng (góc giữa đường ngắm và mặt đất)?

$$\\begin{aligned}
\\tan\\theta &= \\frac{\\text{đối}}{\\text{kề}} = \\frac{60}{100} = 0.6 \\\\[4pt]
\\theta &= \\arctan(0.6) \\approx 30.96^\\circ
\\end{aligned}$$

Hàm $\\arctan$ (đọc là "arc tangent") trả lời câu hỏi: "góc nào có $\\tan$ bằng 0.6?".

### 6.1. Định nghĩa

| Hàm | Ký hiệu | Đọc | Ý nghĩa |
|-----|---------|-----|---------|
| arcsin | $\\arcsin x$ hoặc $\\sin^{-1} x$ | "arc sin" | Tìm $\\theta$ sao cho $\\sin\\theta = x$ |
| arccos | $\\arccos x$ hoặc $\\cos^{-1} x$ | "arc cos" | Tìm $\\theta$ sao cho $\\cos\\theta = x$ |
| arctan | $\\arctan x$ hoặc $\\tan^{-1} x$ | "arc tan" | Tìm $\\theta$ sao cho $\\tan\\theta = x$ |

> Cảnh báo: $\\sin^{-1} x$ **không có nghĩa là** $\\frac{1}{\\sin x}$. Đó là ký hiệu hàm ngược, **không phải nghịch đảo số học**. Để tránh nhầm lẫn, ưu tiên viết $\\arcsin$ (mà code Go và Python cũng dùng \`asin\`).

### 6.2. Vấn đề "nhiều nghiệm" và phạm vi (range)

Bài toán: tìm $\\theta$ sao cho $\\sin\\theta = 0.5$.

Có **vô số** đáp án: $\\theta = 30^\\circ, 150^\\circ, 390^\\circ, 510^\\circ, -210^\\circ, \\ldots$ (vì $\\sin$ lặp chu kỳ $360^\\circ$, và đối xứng qua $90^\\circ$).

Để hàm ngược **xác định một-một**, ta phải giới hạn $\\theta$ về một đoạn:

| Hàm    | Domain (miền vào)  | Range (miền ra)        |
|--------|--------------------|------------------------|
| arcsin | $[-1, 1]$          | $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}] = [-90^\\circ, 90^\\circ]$ |
| arccos | $[-1, 1]$          | $[0, \\pi] = [0^\\circ, 180^\\circ]$ |
| arctan | $(-\\infty, +\\infty)$         | $(-\\frac{\\pi}{2}, \\frac{\\pi}{2}) = (-90^\\circ, 90^\\circ)$ |

- $\\arcsin(0.5) = \\frac{\\pi}{6} = 30^\\circ$ (chỉ giá trị này trong khoảng cho phép, không phải $150^\\circ$).
- $\\arccos(0.5) = \\frac{\\pi}{3} = 60^\\circ$ (vì $\\cos 60^\\circ = 0.5$).
- $\\arctan(1) = \\frac{\\pi}{4} = 45^\\circ$ (vì $\\tan 45^\\circ = 1$).

### 6.3. Walk-through 5 ví dụ

| Biểu thức           | Tính                       | Kết quả   |
|---------------------|----------------------------|-----------|
| $\\arcsin(1)$         | $\\sin\\theta = 1 \\to \\theta = 90^\\circ$     | $\\frac{\\pi}{2}$ ($90^\\circ$) |
| $\\arcsin(0.5)$       | $\\sin\\theta = \\frac{1}{2} \\to \\theta = 30^\\circ$   | $\\frac{\\pi}{6}$ ($30^\\circ$) |
| $\\arccos(0)$         | $\\cos\\theta = 0 \\to \\theta = 90^\\circ$     | $\\frac{\\pi}{2}$ ($90^\\circ$) |
| $\\arccos(-1)$        | $\\cos\\theta = -1 \\to \\theta = 180^\\circ$   | $\\pi$ ($180^\\circ$)  |
| $\\arctan(\\sqrt{3})$        | $\\tan\\theta = \\sqrt{3} \\to \\theta = 60^\\circ$    | $\\frac{\\pi}{3}$ ($60^\\circ$) |

### 6.4. \`arctan\` vs \`Atan2\` — vấn đề chia cho 0 và quadrant

Trong code Go, có **hai hàm**:

\`\`\`go
math.Atan(y / x)       // 1 đối số
math.Atan2(y, x)       // 2 đối số (chú ý: y trước, x sau)
\`\`\`

\`math.Atan\` nhận một tỉ số \`y/x\` và trả về $\\theta \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2})$. Vấn đề:

1. **\`x = 0\` → chia cho 0**. Trong Go, \`0.0/0.0\` ra \`NaN\`; còn \`1.0/0.0\` ra \`+Inf\`. \`Atan(NaN) = NaN\`. Code crash.
2. **Mất thông tin quadrant**. Với điểm $(x, y) = (1, 1)$ và $(-1, -1)$, cả hai có $\\frac{y}{x} = 1$. Atan cho cùng đáp án $\\frac{\\pi}{4} = 45^\\circ$. Nhưng thực tế hai điểm này nằm ở **hai góc đối nhau** (góc thật là $45^\\circ$ và $225^\\circ$ tương ứng).

\`math.Atan2(y, x)\` xử lý cả hai:

\`\`\`
Atan2(1, 1)    → π/4 (45°)     — quadrant I
Atan2(1, -1)   → 3π/4 (135°)   — quadrant II
Atan2(-1, -1)  → -3π/4 (-135°) — quadrant III
Atan2(-1, 1)   → -π/4 (-45°)   — quadrant IV
Atan2(1, 0)    → π/2 (90°)     — trục Oy dương, không crash
Atan2(0, 0)    → 0 (quy ước)
\`\`\`

\`Atan2\` trả về $\\theta \\in (-\\pi, \\pi]$ — đầy đủ toàn vòng tròn. Nó nhận **dấu của cả $x$ và $y$** để xác định quadrant.

> **Quy tắc thực hành**: trong mọi code computer graphics, computer vision, robotics, ML có liên quan tọa độ — **luôn dùng \`Atan2(y, x)\`**, không dùng \`Atan(y/x)\`. Trừ khi bạn chắc chắn $x > 0$.

### ❓ Câu hỏi tự nhiên

**Q1: $\\arcsin(2)$ có giá trị không?**

Không. Domain của $\\arcsin$ là $[-1, 1]$ (vì $\\sin\\theta \\le 1$). Trong Go, \`math.Asin(2)\` trả về \`NaN\`.

**Q2: Vì sao $\\arccos$ có range $[0, \\pi]$ mà $\\arcsin$ lại là $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$?**

Vì người ta cố tình chọn khoảng để hàm là **đơn điệu** (tăng đều hoặc giảm đều) trên khoảng đó:

- $\\sin$ tăng đều trên $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ từ $-1$ đến $1$ → chọn khoảng này cho arcsin.
- $\\cos$ giảm đều trên $[0, \\pi]$ từ $1$ đến $-1$ → chọn khoảng này cho arccos.

Cả hai quy ước đều phổ thông, được dùng nhất quán trong mọi thư viện toán học.

**Q3: $\\arctan$ trả về $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$ — ngoặc tròn ở hai đầu, vì sao?**

Vì $\\tan(\\pm\\frac{\\pi}{2})$ **không xác định** (chia cho 0), nên $\\arctan$ không bao giờ trả về đúng $\\pm\\frac{\\pi}{2}$. Khi đầu vào tiến tới $\\pm\\infty$, đầu ra tiến tới $\\pm\\frac{\\pi}{2}$ nhưng không bao giờ chạm. Ngoặc tròn $(\\ldots)$ là **khoảng mở**, ký hiệu cho "không bao gồm hai đầu".

### ⚠ Lỗi thường gặp

1. **Quên đổi đơn vị**. Go \`math.Asin\` trả về **radian**. Nếu cần độ phải nhân $\\frac{180}{\\pi}$. Đừng nhầm $\\arcsin(0.5) = 30^\\circ$ (đúng) với $30$ (Go trả về 0.5236 rad, không phải 30).
2. **Dùng \`Atan\` cho $(x, y)$ có $x < 0$**. Sẽ trả về sai quadrant. Luôn \`Atan2(y, x)\`.
3. **Quên kiểm tra domain**. $\\arcsin(1.0001)$ (do lỗi làm tròn float) → NaN. Trong code nên \`math.Min(1.0, math.Max(-1.0, x))\` trước khi gọi \`Asin\`.

### 🔁 Dừng lại tự kiểm tra (Mục 6)

1. $\\arcsin\\frac{\\sqrt{2}}{2}$ bằng bao nhiêu (theo độ)? *(Đáp: $45^\\circ$)*
2. \`Atan2(0, -1)\` bằng bao nhiêu? *(Đáp: $\\pi$ — điểm $(-1, 0)$ nằm trên trục Ox âm)*
3. Một robot biết vị trí mục tiêu $(x, y) = (-3, 4)$ từ gốc. Tính góc hướng (so với trục Ox dương) bằng Atan2. *(Đáp: \`Atan2(4, -3)\` $\\approx 2.214$ rad $\\approx 126.87^\\circ$ — quadrant II)*

### 📝 Tóm tắt mục 6

- $\\arcsin/\\arccos/\\arctan$ đảo ngược $\\sin/\\cos/\\tan$, có range giới hạn để xác định một-một.
- $\\arcsin: [-1, 1] \\to [-90^\\circ, 90^\\circ]$; $\\arccos: [-1, 1] \\to [0^\\circ, 180^\\circ]$; $\\arctan: \\mathbb{R} \\to (-90^\\circ, 90^\\circ)$.
- \`Atan2(y, x)\` luôn ưu tiên hơn \`Atan(y/x)\` trong code: tránh chia 0, đúng quadrant.
- Trong Go: \`math.Asin\`, \`math.Acos\`, \`math.Atan\`, \`math.Atan2\` — đầu ra **radian**.

---

## 7. Ứng dụng cổ điển

### 7.1. Tính chiều cao tòa nhà

Bạn đứng cách tòa nhà $d = 50$m (khoảng cách nằm ngang đến chân tòa), ngước nhìn lên đỉnh, dùng dụng cụ đo được **góc nâng** (angle of elevation) $\\theta = 35^\\circ$ (góc giữa đường ngắm và mặt đất). Hỏi chiều cao tòa nhà $h$?

\`\`\`
              ┌── đỉnh tòa
              │
              │ h
              │
   bạn -------+
      \\  θ
       \\
        \\---- d = 50m -----+
\`\`\`

$$\\tan\\theta = \\frac{\\text{đối}}{\\text{kề}} = \\frac{h}{d} \\to h = d \\cdot \\tan\\theta = 50 \\cdot \\tan 35^\\circ \\approx 50 \\cdot 0.7002 \\approx 35.01\\text{m}$$

### 7.2. Laser rangefinder

Một laser bắn từ điểm A đến điểm B, đo được khoảng cách $c = 12$m. Góc giữa tia laser và mặt đất là $\\theta = 22^\\circ$. Tính khoảng cách ngang giữa A và hình chiếu của B xuống mặt đất.

$$\\text{adj} = c \\cdot \\cos\\theta = 12 \\cdot \\cos 22^\\circ \\approx 12 \\cdot 0.9272 \\approx 11.13\\text{m}$$

Hai ứng dụng tiêu biểu. Trong AI/ML, các phép tính này tổng quát hơn xuất hiện trong:

- **Computer vision**: tính khoảng cách camera-vật từ disparity (stereo).
- **Robotics**: SLAM, odometry — robot tính vị trí hiện tại từ tốc độ và góc lái.
- **Animation**: keyframe interpolation.

### 📝 Tóm tắt mục 7

- $\\tan\\theta = \\frac{\\text{đối}}{\\text{kề}}$ dùng để tính chiều cao khi biết khoảng cách và góc.
- $\\cos\\theta = \\frac{\\text{kề}}{\\text{huyền}}$ dùng để chiếu vector lên trục.
- Đây là các phép tính nền cho computer vision và robotics.

---

## 8. Liên hệ với Tầng sau — Machine Learning & AI

### 8.1. Cosine similarity (Tầng 4 & Tầng 6)

Trong Tầng 4 (Linear Algebra) và Tầng 6 (AI/ML), khi xử lý embedding (vector biểu diễn từ hoặc câu), một độ đo quan trọng là **cosine similarity**:

$$\\text{cos\\_sim}(a, b) = \\frac{a \\cdot b}{\\lVert a \\rVert \\cdot \\lVert b \\rVert}$$

Đây chính là $\\cos\\theta$ với $\\theta$ là **góc giữa hai vector**. Tại sao quan trọng?

| Góc giữa 2 vector | $\\cos\\theta$ | Ý nghĩa |
|-------------------|---------|---------|
| $0^\\circ$                | $1$       | Cùng hướng → 2 vector "rất giống nhau" |
| $90^\\circ$               | $0$       | Vuông góc → "không liên quan" |
| $180^\\circ$              | $-1$      | Ngược chiều → "đối lập" |

Trong RAG (retrieval-augmented generation), khi tìm tài liệu liên quan đến câu hỏi:

1. Encode câu hỏi → vector $q$.
2. So $q$ với mọi tài liệu $d_i$ qua $\\text{cos\\_sim}(q, d_i)$.
3. Top-k tài liệu có cosine cao nhất → context cho LLM.

Hiểu $\\cos\\theta$ là **tỉ số kề/huyền** giúp bạn hình dung: hai vector hợp với nhau một "tam giác vuông trong không gian nhiều chiều", và cosine đo "hai vector cùng hướng tới mức nào".

### 8.2. Đường tròn đơn vị & Positional encoding (Lesson 03 + Tầng 6)

$\\sin$ và $\\cos$ tổng quát hóa từ tam giác vuông ra đường tròn đơn vị (Lesson 03). Trên đường tròn, mỗi điểm có tọa độ $(\\cos\\theta, \\sin\\theta)$ và quay đều theo $\\theta$.

Trong Transformer, **positional encoding** sin/cos cho mỗi vị trí $\\text{pos}$ trong câu được mã hóa thành vector dạng:

$$\\begin{aligned}
PE(\\text{pos}, 2i) &= \\sin\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right) \\\\[4pt]
PE(\\text{pos}, 2i+1) &= \\cos\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)
\\end{aligned}$$

Lý do dùng sin/cos: hai vị trí gần nhau có vector PE gần nhau; vị trí xa nhau → góc xoay khác nhau. Đây là ứng dụng trực tiếp của tính chu kỳ và đồng dạng của sin/cos đã học. Lesson 06 sẽ đi vào RoPE — phiên bản xoay thay vì cộng.

### 📝 Tóm tắt mục 8

- $\\cos\\theta$ xuất hiện ở cosine similarity — đo độ giống nhau giữa hai vector ML.
- $\\sin/\\cos$ được dùng để encode vị trí (positional encoding) trong Transformer.
- Hai góc nhìn — hình học tam giác (bài này) và đường tròn (Lesson 03) — là **một**.

---

## 9. Bài tập

> Làm trước, đối chiếu với lời giải ở mục 10.

**Bài 1.** Cho tam giác vuông có 3 cạnh 3, 4, 5. Tính $\\sin$, $\\cos$, $\\tan$ của:
   (a) Góc đối diện cạnh 3.
   (b) Góc đối diện cạnh 4.
   Kiểm chứng $\\sin^2 A + \\cos^2 A = 1$ cho mỗi góc.

**Bài 2.** Một cái thang dài 5m, tựa vào tường, tạo góc $60^\\circ$ với mặt đất.
   (a) Chiều cao chân thang lên tường là bao nhiêu?
   (b) Khoảng cách chân thang tới chân tường là bao nhiêu?
   (c) Nếu chiều cao tường là 6m, thang có chạm đỉnh tường không?

**Bài 3.** Chứng minh tay (không dùng máy tính) rằng $\\tan^2 30^\\circ + 1 = \\sec^2 30^\\circ$.

**Bài 4.** Tính $\\sin 15^\\circ$. *Gợi ý*: dùng công thức $\\sin(A - B) = \\sin A \\cos B - \\cos A \\sin B$ (sẽ được chứng minh chính thức ở Lesson 05). Áp dụng $A = 45^\\circ$, $B = 30^\\circ$.

**Bài 5.** Trong Go, viết hàm:
\`\`\`go
func triangleSides(hypotenuse, angleDeg float64) (opp, adj float64)
\`\`\`
trả về hai cạnh góc vuông khi biết cạnh huyền và một góc nhọn (tính bằng độ). Test với input \`(5, 60.0)\` và in kết quả ra console kèm phép kiểm chứng Pythagoras.

**Bài 6.** Tại sao \`math.Atan2(y, x)\` thường được dùng thay \`math.Atan(y/x)\` trong ML và computer graphics? Cho hai ví dụ cụ thể $(x, y)$ mà \`Atan(y/x)\` cho kết quả khác (sai) so với \`Atan2(y, x)\`. Giải thích vì sao.

---

## 10. Lời giải chi tiết

### Bài 1.

Đặt tên tam giác:

\`\`\`
            C
            |\\
            | \\
        4   |  \\  5
            |   \\
            |____\\
            B  3  A
\`\`\`

($B$ là góc vuông, cạnh đối diện B là cạnh huyền $c = 5$. Cạnh $a = BC = 4$ đối diện đỉnh A, cạnh $b = CA = 3$... thực ra ta đặt lại cho rõ.)

Đặt: cạnh đối diện đỉnh $A$ ký hiệu là $a = 3$ (BC), đối diện $B$ là $b = 4$... — quy ước này không quan trọng. Quan trọng là **góc đối diện cạnh 3** và **góc đối diện cạnh 4**.

Gọi:
- $\\alpha$ = góc đối diện cạnh 3 → cạnh đối của $\\alpha$ = 3, cạnh kề = 4, huyền = 5.
- $\\beta$ = góc đối diện cạnh 4 → cạnh đối của $\\beta$ = 4, cạnh kề = 3, huyền = 5.

**(a) Góc $\\alpha$:**

$$\\begin{aligned}
\\sin\\alpha &= \\frac{3}{5} = 0.6 \\\\[4pt]
\\cos\\alpha &= \\frac{4}{5} = 0.8 \\\\[4pt]
\\tan\\alpha &= \\frac{3}{4} = 0.75
\\end{aligned}$$

Verify: $\\sin^2\\alpha + \\cos^2\\alpha = 0.36 + 0.64 = 1.00$ ✓.

$\\alpha = \\arcsin(0.6) \\approx 36.87^\\circ$.

**(b) Góc $\\beta$:**

$$\\begin{aligned}
\\sin\\beta &= \\frac{4}{5} = 0.8 \\\\[4pt]
\\cos\\beta &= \\frac{3}{5} = 0.6 \\\\[4pt]
\\tan\\beta &= \\frac{4}{3} \\approx 1.333
\\end{aligned}$$

Verify: $\\sin^2\\beta + \\cos^2\\beta = 0.64 + 0.36 = 1.00$ ✓.

$\\beta = \\arcsin(0.8) \\approx 53.13^\\circ$.

Kiểm chứng: $\\alpha + \\beta = 36.87 + 53.13 = 90.00^\\circ$ ✓ (hai góc nhọn cộng $= 90^\\circ$).

### Bài 2.

Thang là cạnh huyền $c = 5$m, góc với mặt đất $\\theta = 60^\\circ$.

\`\`\`
   |  tường
   |
   | h = opp
   |
   |          5m (thang)
   |        /
   |      /
   |    /
   |  /
   |/ θ=60°
   +─── d = adj ──── mặt đất
\`\`\`

**(a) Chiều cao $h$:** $h$ là cạnh **đối** của góc $60^\\circ$ (cạnh đối diện đỉnh tạo bởi thang và mặt đất).

$$\\begin{aligned}
\\sin 60^\\circ &= \\frac{h}{5} \\\\[4pt]
h &= 5\\sin 60^\\circ = 5 \\cdot \\frac{\\sqrt{3}}{2} = \\frac{5\\sqrt{3}}{2} \\approx 4.330\\text{m}
\\end{aligned}$$

**(b) Khoảng cách $d$:** cạnh **kề** của góc $60^\\circ$.

$$\\begin{aligned}
\\cos 60^\\circ &= \\frac{d}{5} \\\\[4pt]
d &= 5\\cos 60^\\circ = 5 \\cdot \\frac{1}{2} = 2.5\\text{m}
\\end{aligned}$$

Verify Pythagoras: $h^2 + d^2 = \\left(\\frac{5\\sqrt{3}}{2}\\right)^2 + 2.5^2 = \\frac{75}{4} + \\frac{25}{4} = \\frac{100}{4} = 25 = 5^2$ ✓.

**(c) Chiều cao tường 6m, thang lên tới 4.33m → thang không chạm đỉnh** (còn thiếu 1.67m).

### Bài 3.

Cần chứng minh $\\tan^2 30^\\circ + 1 = \\sec^2 30^\\circ$ bằng cách tính trực tiếp cả hai vế.

**Tính $\\tan^2 30^\\circ$:**

$$\\begin{aligned}
\\tan 30^\\circ &= \\frac{\\sqrt{3}}{3} \\quad \\text{(từ bảng giá trị đặc biệt)} \\\\[4pt]
\\tan^2 30^\\circ &= \\left(\\frac{\\sqrt{3}}{3}\\right)^2 = \\frac{3}{9} = \\frac{1}{3}
\\end{aligned}$$

**Tính $\\sec^2 30^\\circ$:**

$$\\begin{aligned}
\\cos 30^\\circ &= \\frac{\\sqrt{3}}{2} \\\\[4pt]
\\sec 30^\\circ &= \\frac{1}{\\cos 30^\\circ} = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3} \\\\[4pt]
\\sec^2 30^\\circ &= \\left(\\frac{2\\sqrt{3}}{3}\\right)^2 = \\frac{4 \\cdot 3}{9} = \\frac{12}{9} = \\frac{4}{3}
\\end{aligned}$$

**So sánh:**

$$\\begin{aligned}
\\tan^2 30^\\circ + 1 &= \\frac{1}{3} + 1 = \\frac{1}{3} + \\frac{3}{3} = \\frac{4}{3} \\\\[4pt]
\\sec^2 30^\\circ &= \\frac{4}{3} \\\\[4pt]
&\\to \\tan^2 30^\\circ + 1 = \\sec^2 30^\\circ = \\frac{4}{3} \\quad ✓
\\end{aligned}$$

### Bài 4.

Dùng $\\sin(A - B) = \\sin A \\cos B - \\cos A \\sin B$. Đặt $A = 45^\\circ$, $B = 30^\\circ$, vậy $A - B = 15^\\circ$:

$$\\begin{aligned}
\\sin 15^\\circ &= \\sin(45^\\circ - 30^\\circ) \\\\[4pt]
&= \\sin 45^\\circ \\cos 30^\\circ - \\cos 45^\\circ \\sin 30^\\circ \\\\[4pt]
&= \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2} \\\\[4pt]
&= \\frac{\\sqrt{2} \\cdot \\sqrt{3}}{4} - \\frac{\\sqrt{2} \\cdot 1}{4} \\\\[4pt]
&= \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4} \\\\[4pt]
&= \\frac{\\sqrt{6} - \\sqrt{2}}{4}
\\end{aligned}$$

Số học: $\\sqrt{6} \\approx 2.449$, $\\sqrt{2} \\approx 1.414$. Vậy $\\sin 15^\\circ \\approx \\frac{2.449 - 1.414}{4} \\approx \\frac{1.035}{4} \\approx 0.2588$. Đối chiếu máy tính: $\\sin 15^\\circ = 0.25882\\ldots$ ✓.

### Bài 5.

\`\`\`go
package main

import (
    "fmt"
    "math"
)

func triangleSides(hypotenuse, angleDeg float64) (opp, adj float64) {
    theta := angleDeg * math.Pi / 180 // đổi độ → radian
    opp = hypotenuse * math.Sin(theta)
    adj = hypotenuse * math.Cos(theta)
    return
}

func main() {
    h, deg := 5.0, 60.0
    opp, adj := triangleSides(h, deg)
    fmt.Printf("hyp=%.4f, θ=%.1f°\\n", h, deg)
    fmt.Printf("  opp = %.4f (kỳ vọng: 5·sin60° = 5·√3/2 ≈ 4.3301)\\n", opp)
    fmt.Printf("  adj = %.4f (kỳ vọng: 5·cos60° = 5·0.5  = 2.5000)\\n", adj)
    fmt.Printf("  opp²+adj² = %.4f (kỳ vọng: hyp² = 25)\\n", opp*opp+adj*adj)
}
\`\`\`

Kết quả mong đợi:

\`\`\`
hyp=5.0000, θ=60.0°
  opp = 4.3301 (kỳ vọng: 5·sin60° = 5·√3/2 ≈ 4.3301)
  adj = 2.5000 (kỳ vọng: 5·cos60° = 5·0.5  = 2.5000)
  opp²+adj² = 25.0000 (kỳ vọng: hyp² = 25)
\`\`\`

### Bài 6.

**Lý do dùng \`Atan2(y, x)\`:**

1. **Tránh chia cho 0**: khi $x = 0$, biểu thức $\\frac{y}{x}$ sẽ là \`Inf\` hoặc \`NaN\` trong float. \`Atan2(y, 0)\` xử lý đặc biệt và trả về $\\pm\\frac{\\pi}{2}$ tùy dấu của $y$.
2. **Giữ đúng quadrant**: $\\frac{y}{x}$ mất thông tin dấu (vì cả $(y, x)$ và $(-y, -x)$ cho cùng tỉ số). \`Atan2\` dùng dấu của cả 2 đối số → xác định đúng 1 trong 4 quadrant.

**Hai ví dụ cụ thể:**

**Ví dụ A — Mất quadrant:**

Lấy điểm $P_1 = (1, 1)$ (quadrant I) và $P_2 = (-1, -1)$ (quadrant III).

\`\`\`
P1: y/x = 1/1 = 1   →  Atan(1) = π/4 = 45°
P2: y/x = -1/-1 = 1 →  Atan(1) = π/4 = 45°    (SAI! P2 phải là 225° hoặc -135°)
\`\`\`

Với Atan2:
\`\`\`
Atan2(1, 1)   = π/4   = 45°    ✓ (đúng quadrant I)
Atan2(-1, -1) = -3π/4 = -135°  ✓ (đúng quadrant III)
\`\`\`

**Ví dụ B — Chia cho 0:**

Lấy điểm $P_3 = (0, 1)$ (trên trục Oy dương).

\`\`\`
Atan(1/0) → Atan(+Inf) — về mặt giới hạn = π/2, nhưng trong code: 1.0/0.0 = +Inf, Atan(+Inf) ≈ π/2.
                          OK ở đây, nhưng nếu code logic không cẩn thận Inf sẽ lan ra nơi khác và crash.

Atan2(1, 0) = π/2     ✓ (xử lý case x=0 trực tiếp, không gặp Inf)
\`\`\`

Còn $P_4 = (0, 0)$ thì sao? \`Atan(0/0)\` = \`Atan(NaN)\` = \`NaN\` (crash logic). \`Atan2(0, 0)\` = \`0\` theo quy ước Go (không crash, dù về toán là không xác định).

**Trong ML/CV ứng dụng**: tính hướng của optical flow vector tại mỗi pixel $(u, v)$ — $\\theta = $ \`Atan2(v, u)\`. Với nhiều pixel có $u = 0$ hoặc $(u, v) = (0, 0)$, dùng \`Atan(v/u)\` sẽ làm hỏng pipeline.

---

## 11. Liên kết

- Code lời giải: [solutions.go](./solutions.go)
- Trực quan hóa tương tác: [visualization.html](./visualization.html)
- Lesson trước: [Lesson 01 — Góc: độ và radian](../lesson-01-angles/)
- Lesson sau: [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/) — mở rộng sin/cos ra mọi góc, không chỉ góc nhọn.
- Liên hệ tầng sau:
  - Tầng 4 Linear Algebra — cosine similarity sẽ học chính thức.
  - Tầng 6 AI/ML — RoPE positional encoding, transformer attention.
`;
