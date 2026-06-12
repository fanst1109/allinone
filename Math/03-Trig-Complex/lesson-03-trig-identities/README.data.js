// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-03-trig-identities/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đồng nhất thức lượng giác

## Mục tiêu

- Thuộc và áp dụng được các công thức **cộng, trừ, nhân đôi, hạ bậc**.
- Biến đổi tích thành tổng và ngược lại.
- Biến **$a\\cdot\\sin x + b\\cdot\\cos x$** thành dạng **$R\\cdot\\sin(x + \\varphi)$**.

## Kiến thức tiền đề

- [Lesson 02 — sin, cos, tan](../lesson-02-sin-cos-tan/).

---

## 1. Đồng nhất thức cơ bản

💡 **Trực giác / Hình dung**: các đồng nhất thức cơ bản chỉ là "đọc lại" hình ảnh điểm chạy trên đường tròn đơn vị. $\\sin^2 + \\cos^2 = 1$ = định lý Pythagore cho bán kính 1. Tính chẵn/lẻ = soi gương qua trục. Tính tuần hoàn = đi hết một vòng thì lặp lại. Không cần học thuộc rời rạc — tất cả suy từ một bức tranh.

### 1.1. Pythagore lượng giác

$$\\sin^2 x + \\cos^2 x = 1$$

Suy ra (dùng $\\sec x = \\frac{1}{\\cos x}$, $\\csc x = \\frac{1}{\\sin x}$, $\\cot x = \\frac{\\cos x}{\\sin x}$):
- $1 + \\tan^2 x = \\sec^2 x = \\frac{1}{\\cos^2 x}$ (chia 2 vế cho $\\cos^2 x$).
- $1 + \\cot^2 x = \\csc^2 x = \\frac{1}{\\sin^2 x}$ (chia 2 vế cho $\\sin^2 x$).

💡 **Vì sao đúng?** Vì điểm $(\\cos x, \\sin x)$ nằm trên đường tròn bán kính 1, theo Pythagore khoảng cách$^2 = 1$.

**Chứng minh từng bước $\\sin^2 x + \\cos^2 x = 1$** (từ đường tròn đơn vị, không bỏ bước):
- Đường tròn đơn vị có phương trình $X^2 + Y^2 = 1$ (mọi điểm cách gốc đúng 1 đơn vị — đây là định nghĩa khoảng cách Pythagore với bán kính $= 1$).
- Theo định nghĩa lượng giác trên đường tròn đơn vị, điểm ứng với góc $x$ có tọa độ $X = \\cos x$, $Y = \\sin x$.
- Thay vào phương trình đường tròn: $(\\cos x)^2 + (\\sin x)^2 = 1$, tức $\\cos^2 x + \\sin^2 x = 1$. Đúng với **mọi** $x$ (kể cả góc tù, âm, $> 360°$ — vì điểm vẫn nằm trên đường tròn). ∎

**Chứng minh biến thể $1 + \\tan^2 x = \\sec^2 x$** (chia, không bỏ bước): lấy $\\sin^2 x + \\cos^2 x = 1$, chia cả 2 vế cho $\\cos^2 x$ (giả sử $\\cos x \\neq 0$):
$$\\frac{\\sin^2 x}{\\cos^2 x} + \\frac{\\cos^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} \\;\\Rightarrow\\; \\tan^2 x + 1 = \\sec^2 x. \\quad ∎$$

**Walk-through $\\sin^2 + \\cos^2 = 1$ bằng 4 góc cụ thể** (verify cả 2 vế):

| $x$ | $\\sin x$ | $\\cos x$ | $\\sin^2 x$ | $\\cos^2 x$ | Tổng |
|-----|----------|----------|------------|------------|------|
| $0°$ | $0$ | $1$ | $0$ | $1$ | $0+1=1$ ✓ |
| $30°$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{4}$ | $\\frac{3}{4}$ | $\\frac{1}{4}+\\frac{3}{4}=1$ ✓ |
| $45°$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{1}{2}$ | $\\frac{1}{2}$ | $\\frac{1}{2}+\\frac{1}{2}=1$ ✓ |
| $120°$ | $\\frac{\\sqrt{3}}{2}$ | $-\\frac{1}{2}$ | $\\frac{3}{4}$ | $\\frac{1}{4}$ | $\\frac{3}{4}+\\frac{1}{4}=1$ ✓ |
| $210°$ | $-\\frac{1}{2}$ | $-\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{4}$ | $\\frac{3}{4}$ | $\\frac{1}{4}+\\frac{3}{4}=1$ ✓ |

Bình phương khử dấu âm → góc ở phần tư nào cũng cho tổng $= 1$.

**Verify biến thể $1 + \\cot^2 x = \\csc^2 x$ bằng số** (lấy $x = 45°$): $\\cot 45° = 1$ → vế trái $1 + 1^2 = 2$. $\\sin 45° = \\frac{\\sqrt{2}}{2}$ → $\\csc 45° = \\frac{2}{\\sqrt{2}} = \\sqrt{2}$ → vế phải $(\\sqrt{2})^2 = 2$ ✓. Thử thêm $x = 30°$: $\\cot 30° = \\sqrt{3}$ → vế trái $1 + 3 = 4$; $\\csc 30° = \\frac{1}{1/2} = 2$ → vế phải $4$ ✓.

### 1.2. Tính chẵn lẻ

- $\\sin(-x) = -\\sin x$ (lẻ).
- $\\cos(-x) = \\cos x$ (chẵn).
- $\\tan(-x) = -\\tan x$ (lẻ).

**Vì sao?** Góc $-x$ là điểm đối xứng với góc $x$ qua **trục hoành** (Ox): hoành độ ($\\cos$) giữ nguyên → cos chẵn; tung độ ($\\sin$) đổi dấu → sin lẻ; $\\tan = \\frac{\\sin}{\\cos}$ nên cũng đổi dấu → tan lẻ.

**Verify bằng 4 giá trị**:
- $\\sin(-30°) = -\\frac{1}{2}$, còn $-\\sin 30° = -\\frac{1}{2}$ ✓.
- $\\cos(-30°) = \\frac{\\sqrt3}{2}$, còn $\\cos 30° = \\frac{\\sqrt3}{2}$ ✓ (không đổi dấu).
- $\\sin(-90°) = -1 = -\\sin 90°$ ✓.
- $\\tan(-45°) = -1 = -\\tan 45°$ ✓.

### 1.3. Tính tuần hoàn

- $\\sin(x + 2\\pi) = \\sin x$.
- $\\cos(x + 2\\pi) = \\cos x$.
- $\\tan(x + \\pi) = \\tan x$.

### 1.4. Quan hệ bù, phụ

- $\\sin(\\pi - x) = \\sin x$. (góc bù → sin bằng nhau)
- $\\cos(\\pi - x) = -\\cos x$.
- $\\sin(\\frac{\\pi}{2} - x) = \\cos x$. (góc phụ → sin = cos đối)
- $\\cos(\\frac{\\pi}{2} - x) = \\sin x$.

**Verify $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$ bằng số**: lấy $x = \\frac{\\pi}{3}$. $\\tan(\\frac{\\pi}{3}) = \\sqrt{3}$ → vế trái $1 + (\\sqrt{3})^2 = 1 + 3 = 4$. $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$ → vế phải $\\frac{1}{(1/2)^2} = \\frac{1}{1/4} = 4$ ✓. Khớp.

⚠ **Lỗi thường gặp — viết $\\sin^2 x$ thành $\\sin x^2$**. $\\sin^2 x$ nghĩa là $(\\sin x)^2$ (bình phương kết quả), KHÁC $\\sin(x^2)$ (sin của x bình phương). Phản ví dụ tại $x = \\frac{\\pi}{2}$: $\\sin^2(\\frac{\\pi}{2}) = 1^2 = 1$, còn $\\sin((\\frac{\\pi}{2})^2) = \\sin(2.467) \\approx 0.624$. Khác hẳn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"góc bù và góc phụ khác nhau ra sao?"* **Bù** = cộng lại bằng $\\pi$ (180°), liên quan $\\sin(\\pi-x)=\\sin x$. **Phụ** = cộng lại bằng $\\frac{\\pi}{2}$ (90°), liên quan $\\sin(\\frac{\\pi}{2}-x)=\\cos x$. Đừng lẫn hai cái.
- *"$\\cos(\\pi-x) = -\\cos x$ có dấu trừ, vì sao sin thì không?"* Vì góc $\\pi-x$ đối xứng với x qua **trục tung**: tung độ (sin) giữ nguyên, hoành độ (cos) đổi dấu. Hình học quyết định dấu.

🔁 **Dừng lại tự kiểm tra**

1. Cho $\\sin x = 0.6$. Tính $\\cos^2 x$ rồi $\\cos x$ (giả sử x phần tư I).
2. $\\sin(\\pi - \\frac{\\pi}{6})$ bằng mấy?

<details><summary>Đáp án</summary>

1. $\\cos^2 x = 1 - \\sin^2 x = 1 - 0.36 = 0.64$ → $\\cos x = 0.8$ (phần tư I → dương).
2. $\\sin(\\pi - \\frac{\\pi}{6}) = \\sin(\\frac{\\pi}{6}) = \\frac{1}{2}$ (góc bù, sin bằng nhau).

</details>

### 📝 Tóm tắt mục 1

- $\\sin^2 + \\cos^2 = 1$ (Pythagore); chia ra $1+\\tan^2=\\frac{1}{\\cos^2}$, $1+\\cot^2=\\frac{1}{\\sin^2}$.
- Chẵn/lẻ: cos chẵn, sin & tan lẻ. Tuần hoàn: sin/cos chu kỳ $2\\pi$, tan chu kỳ $\\pi$.
- Góc bù (tổng $\\pi$): sin giữ, cos đổi dấu. Góc phụ (tổng $\\frac{\\pi}{2}$): sin ↔ cos.

---

## 2. Công thức cộng (Sum formulas)

$$\\begin{aligned}
\\sin(a + b) &= \\sin a \\cdot \\cos b + \\cos a \\cdot \\sin b \\\\
\\sin(a - b) &= \\sin a \\cdot \\cos b - \\cos a \\cdot \\sin b \\\\
\\cos(a + b) &= \\cos a \\cdot \\cos b - \\sin a \\cdot \\sin b \\\\
\\cos(a - b) &= \\cos a \\cdot \\cos b + \\sin a \\cdot \\sin b \\\\
\\tan(a + b) &= \\frac{\\tan a + \\tan b}{1 - \\tan a \\cdot \\tan b}
\\end{aligned}$$

💡 **Mẹo nhớ sin**: "sin cùng cos chéo cộng" (sa.cb + ca.sb), với cos thì "cos cùng trừ sin chéo".

**Ví dụ số**: tính $\\sin 75^\\circ$.
- $75 = 45 + 30$.
- $\\sin 75^\\circ = \\sin 45\\cdot\\cos 30 + \\cos 45\\cdot\\sin 30 = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4} = $ **$\\frac{\\sqrt{6}+\\sqrt{2}}{4}$**.

### 2.1. Chứng minh công thức cộng (từng bước)

💡 **Trực giác**: chỉ cần chứng minh MỘT công thức gốc — $\\cos(a - b)$ — bằng đường tròn đơn vị; bốn công thức còn lại suy ra cơ học (thay dấu, dùng góc phụ). Không phải học thuộc 5 chứng minh rời.

**Bước nền — chứng minh $\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$** (dùng khoảng cách trên đường tròn đơn vị):

Đặt trên đường tròn đơn vị hai điểm $A = (\\cos a, \\sin a)$ và $B = (\\cos b, \\sin b)$, gốc $O = (0,0)$. Góc $\\angle AOB = a - b$.

- **Tính $|AB|^2$ bằng tọa độ** (công thức khoảng cách):
$$\\begin{aligned}
|AB|^2 &= (\\cos a - \\cos b)^2 + (\\sin a - \\sin b)^2 \\\\
&= \\cos^2 a - 2\\cos a\\cos b + \\cos^2 b + \\sin^2 a - 2\\sin a\\sin b + \\sin^2 b \\\\
&= (\\cos^2 a + \\sin^2 a) + (\\cos^2 b + \\sin^2 b) - 2(\\cos a\\cos b + \\sin a\\sin b) \\\\
&= 1 + 1 - 2(\\cos a\\cos b + \\sin a\\sin b) = 2 - 2(\\cos a\\cos b + \\sin a\\sin b).
\\end{aligned}$$
- **Tính $|AB|^2$ bằng định lý cosin** (Mục 9) trong tam giác $OAB$ với $OA = OB = 1$ và góc xen $= a - b$:
$$|AB|^2 = 1^2 + 1^2 - 2\\cdot 1\\cdot 1\\cdot\\cos(a-b) = 2 - 2\\cos(a-b).$$
- **So sánh hai cách** (cùng là $|AB|^2$): $2 - 2\\cos(a-b) = 2 - 2(\\cos a\\cos b + \\sin a\\sin b)$. Rút gọn:
$$\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b. \\quad ∎$$

**Suy ra $\\cos(a + b)$**: thay $b \\to -b$, dùng $\\cos(-b) = \\cos b$, $\\sin(-b) = -\\sin b$:
$$\\cos(a + b) = \\cos(a - (-b)) = \\cos a\\cos b + \\sin a(-\\sin b) = \\cos a\\cos b - \\sin a\\sin b. \\quad ∎$$

**Suy ra $\\sin(a + b)$**: dùng góc phụ $\\sin x = \\cos(90° - x)$:
$$\\begin{aligned}
\\sin(a + b) &= \\cos\\big(90° - (a+b)\\big) = \\cos\\big((90° - a) - b\\big) \\\\
&= \\cos(90° - a)\\cos b + \\sin(90° - a)\\sin b \\\\
&= \\sin a\\cos b + \\cos a\\sin b. \\quad ∎
\\end{aligned}$$

**Suy ra $\\sin(a - b)$**: thay $b \\to -b$: $\\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b$. ∎

**Suy ra $\\tan(a + b)$**: chia $\\frac{\\sin(a+b)}{\\cos(a+b)}$ rồi chia tử & mẫu cho $\\cos a\\cos b$:
$$\\tan(a+b) = \\frac{\\sin a\\cos b + \\cos a\\sin b}{\\cos a\\cos b - \\sin a\\sin b} = \\frac{\\tan a + \\tan b}{1 - \\tan a\\tan b}. \\quad ∎$$

**Verify $\\cos(a-b)$ bằng số** ($a = 60°$, $b = 30°$ → $\\cos 30° = \\frac{\\sqrt 3}{2}$): vế phải $\\cos 60\\cos 30 + \\sin 60\\sin 30 = \\frac{1}{2}\\cdot\\frac{\\sqrt3}{2} + \\frac{\\sqrt3}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt3}{4} + \\frac{\\sqrt3}{4} = \\frac{\\sqrt3}{2}$ ✓ ($= \\cos 30°$).

### 2.2. Bốn ví dụ áp dụng công thức cộng

**Ví dụ 1 — $\\cos 75°$**: $\\cos(45+30) = \\cos45\\cos30 - \\sin45\\sin30 = \\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt3}{2} - \\frac{\\sqrt2}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt6 - \\sqrt2}{4} \\approx 0.2588$ ✓.

**Ví dụ 2 — $\\sin 15°$**: $\\sin(45-30) = \\sin45\\cos30 - \\cos45\\sin30 = \\frac{\\sqrt6 - \\sqrt2}{4} \\approx 0.2588$. Để ý $\\sin 15° = \\cos 75°$ (góc phụ, vì $15 + 75 = 90$).

**Ví dụ 3 — $\\tan 105°$**: $105 = 60 + 45$, $\\tan 60 = \\sqrt3$, $\\tan 45 = 1$:
$$\\tan 105° = \\frac{\\sqrt3 + 1}{1 - \\sqrt3\\cdot 1} = \\frac{\\sqrt3+1}{1-\\sqrt3} = \\frac{(\\sqrt3+1)(1+\\sqrt3)}{(1-\\sqrt3)(1+\\sqrt3)} = \\frac{4 + 2\\sqrt3}{-2} = -(2+\\sqrt3) \\approx -3.732 ✓.$$

**Ví dụ 4 — góc qua tam giác Pythagore** ($\\sin a = \\frac{3}{5}, \\cos a = \\frac{4}{5}, \\sin b = \\frac{5}{13}, \\cos b = \\frac{12}{13}$):
$$\\sin(a+b) = \\frac{3}{5}\\cdot\\frac{12}{13} + \\frac{4}{5}\\cdot\\frac{5}{13} = \\frac{36}{65} + \\frac{20}{65} = \\frac{56}{65} \\approx 0.8615.$$

> 📐 **Định nghĩa đầy đủ — Công thức cộng**
>
> **(a) Là gì**: 5 đồng nhất thức biểu diễn sin/cos/tan của $(a+b)$ qua sin/cos/tan của a và b riêng. KHÔNG đơn giản như $\\sin(a+b) = \\sin a + \\sin b$ (= SAI) — phải có "cross terms".
>
> **(b) Vì sao cần**: Vì cho phép tính sin/cos của góc bất kỳ qua các góc đã biết (30°, 45°, 60°...). Đây là nền tảng để **suy ra mọi công thức** lượng giác khác: nhân đôi (cho b = a), hạ bậc, biến tích thành tổng, v.v. Trong vật lý: cộng 2 dao động cùng tần số → 1 dao động kết quả (giao thoa sóng). Trong đồ hoạ: nối 2 phép quay = 1 phép quay với góc tổng.
>
> **(c) Ví dụ số**: $\\sin 75^\\circ = \\sin(45+30) = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}+\\sqrt{2}}{4} \\approx $ **0.9659**. Kiểm tra máy tính $\\sin 75^\\circ \\approx 0.9659$ ✓. $\\cos 75^\\circ = \\cos 45\\cdot\\cos 30 - \\sin 45\\cdot\\sin 30 = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}-\\sqrt{2}}{4} \\approx 0.2588$. $\\cos(60^\\circ-30^\\circ) = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2} \\approx 0.866$. Verify: $\\cos 60\\cdot\\cos 30 + \\sin 60\\cdot\\sin 30 = \\frac{1}{2}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{3}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{3}}{4} + \\frac{\\sqrt{3}}{4} = \\frac{\\sqrt{3}}{2}$ ✓.

⚠ **Lỗi thường gặp — số 1 trong trig: $\\sin(a+b) \\neq \\sin a + \\sin b$**. Phản ví dụ bằng số: $\\sin(30^\\circ+60^\\circ) = \\sin 90^\\circ = 1$, nhưng $\\sin 30^\\circ + \\sin 60^\\circ = \\frac{1}{2} + \\frac{\\sqrt{3}}{2} \\approx 1.366$. $1 \\neq 1.366$. Phải dùng công thức cộng đầy đủ với "cross terms". Tương tự $\\cos(a+b) \\neq \\cos a + \\cos b$.

⚠ **Lỗi thường gặp 2 — quên dấu của cos: vế phải là TRỪ**. $\\cos(a+b) = \\cos a\\cdot\\cos b - \\sin a\\cdot\\sin b$ (dấu **trừ**), ngược dấu với sin. Mẹo: "cos đổi dấu, sin giữ dấu". Phản ví dụ nếu nhầm dấu cộng: $\\cos 90^\\circ = \\cos(60+30)$ lẽ ra = 0, nếu dùng dấu + ra $\\frac{1}{2}\\cdot\\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{3}}{2}\\cdot\\frac{1}{2}=\\frac{\\sqrt{3}}{2} \\neq 0$ → sai; dùng dấu − ra $\\frac{\\sqrt{3}}{4} - \\frac{\\sqrt{3}}{4} = 0$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cần thuộc cả 5 công thức không?"* Thuộc kỹ $\\sin(a+b)$ và $\\cos(a+b)$. Bốn cái còn lại suy ra: thay $b\\to-b$ (dùng chẵn/lẻ) cho dạng "trừ", và tan = sin/cos cho tan.
- *"Vì sao $\\tan(a+b)$ lại có mẫu $1 - \\tan a\\cdot\\tan b$?"* Vì chia $\\frac{\\sin(a+b)}{\\cos(a+b)}$ rồi chia tử & mẫu cho $\\cos a\\cdot\\cos b$. Mẫu thành $1 - \\tan a \\tan b$. Nó **không xác định** khi $\\tan a\\cdot\\tan b = 1$ (vd a = b = 45°, vì a+b = 90°).

🔁 **Dừng lại tự kiểm tra**

1. Dùng công thức cộng tính $\\sin 15^\\circ$ (gợi ý: 45° − 30°).
2. $\\cos(x + \\frac{\\pi}{2})$ rút gọn bằng gì?

<details><summary>Đáp án</summary>

1. $\\sin 15^\\circ = \\sin(45-30) = \\sin 45\\cos 30 - \\cos 45\\sin 30 = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}-\\sqrt{2}}{4} \\approx 0.2588$.
2. $\\cos x \\cos(\\frac{\\pi}{2}) - \\sin x \\sin(\\frac{\\pi}{2}) = \\cos x\\cdot 0 - \\sin x\\cdot 1 = -\\sin x$.

</details>

### 📝 Tóm tắt mục 2

- $\\sin(a\\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b$; $\\cos(a\\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b$.
- cos đổi dấu ($\\mp$), sin giữ dấu ($\\pm$); tuyệt đối $\\sin(a+b) \\neq \\sin a + \\sin b$.
- Là gốc suy ra mọi công thức nhân đôi, hạ bậc, tích↔tổng.

---

## 3. Công thức nhân đôi

💡 **Trực giác / Hình dung**: nhân đôi không phải công thức mới — chỉ là công thức cộng với \`b = a\`. "Cộng góc a với chính nó". Nhớ được công thức cộng là tự suy ra được nhân đôi, không cần học riêng.

Thay b = a vào công thức cộng:

$$\\begin{aligned}
\\sin 2a &= 2\\cdot\\sin a \\cdot \\cos a \\\\
\\cos 2a &= \\cos^2 a - \\sin^2 a = 2\\cdot\\cos^2 a - 1 = 1 - 2\\cdot\\sin^2 a \\\\
\\tan 2a &= \\frac{2\\cdot\\tan a}{1 - \\tan^2 a}
\\end{aligned}$$

**Chứng minh từng bước $\\cos 2a$ có 3 dạng**:
- Dạng gốc: $\\cos 2a = \\cos(a+a) = \\cos a\\cdot\\cos a - \\sin a\\cdot\\sin a = \\cos^2 a - \\sin^2 a$.
- Thay $\\sin^2 a = 1 - \\cos^2 a$: $\\cos^2 a - (1 - \\cos^2 a) = 2\\cos^2 a - 1$.
- Thay $\\cos^2 a = 1 - \\sin^2 a$: $(1 - \\sin^2 a) - \\sin^2 a = 1 - 2\\sin^2 a$.

**Ví dụ**: $\\sin 60^\\circ = \\sin(2\\cdot 30^\\circ) = 2\\cdot\\sin 30^\\circ\\cdot\\cos 30^\\circ = 2\\cdot\\frac{1}{2}\\cdot\\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{2}$ ✓.

**4 ví dụ số verify**:
- $\\cos 60^\\circ = \\cos(2\\cdot 30^\\circ) = 1 - 2\\sin^2 30^\\circ = 1 - 2\\cdot\\frac{1}{4} = \\frac{1}{2}$ ✓.
- $\\cos 90^\\circ = \\cos(2\\cdot 45^\\circ) = 1 - 2\\sin^2 45^\\circ = 1 - 2\\cdot\\frac{1}{2} = 0$ ✓.
- $\\sin 90^\\circ = 2 \\sin 45 \\cos 45 = 2\\cdot\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{2}}{2} = 2\\cdot\\frac{1}{2} = 1$ ✓.
- $\\tan 60^\\circ = \\tan(2\\cdot 30^\\circ) = \\frac{2 \\tan 30}{1-\\tan^2 30} = \\frac{2\\cdot(1/\\sqrt{3})}{1-1/3} = \\frac{2/\\sqrt{3}}{2/3} = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$ ✓.

⚠ **Lỗi thường gặp — viết $\\sin 2a = 2 \\sin a$**. Sai. $\\sin 2a = 2 \\sin a \\cos a$ (có thêm cos a). Phản ví dụ tại a = 30°: $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2} \\approx 0.866$, còn $2 \\sin 30^\\circ = 2\\cdot\\frac{1}{2} = 1$. Khác. Tương tự $\\cos 2a \\neq 2 \\cos a$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\\cos 2a$ có tới 3 dạng?"* Vì dùng $\\sin^2 + \\cos^2 = 1$ để thay qua lại. Mỗi dạng tiện cho một mục đích: dạng $1 - 2\\sin^2 a$ để khử sin, dạng $2\\cos^2 a - 1$ để khử cos (rất hữu ích khi hạ bậc, mục 4).
- *"Có công thức nhân ba không?"* Có: $\\sin 3a = 3 \\sin a - 4 \\sin^3 a$, $\\cos 3a = 4 \\cos^3 a - 3 \\cos a$ (suy từ De Moivre, học ở Lesson 07).

🔁 **Dừng lại tự kiểm tra**

1. Cho $\\sin a = \\frac{3}{5}$, a phần tư I. Tính $\\sin 2a$.
2. Cho $\\cos a = 0.6$. Tính $\\cos 2a$ (dùng dạng tiện nhất).

<details><summary>Đáp án</summary>

1. $\\cos a = \\frac{4}{5}$ (phần tư I). $\\sin 2a = 2\\cdot\\frac{3}{5}\\cdot\\frac{4}{5} = \\frac{24}{25} = 0.96$.
2. Dùng $\\cos 2a = 2\\cos^2 a - 1 = 2\\cdot 0.36 - 1 = 0.72 - 1 = -0.28$.

</details>

### 📝 Tóm tắt mục 3

- $\\sin 2a = 2 \\sin a \\cos a$; $\\cos 2a$ có 3 dạng ($\\cos^2-\\sin^2$, $2\\cos^2-1$, $1-2\\sin^2$).
- Tất cả là công thức cộng với b = a — không cần học riêng.
- Cảnh báo: $\\sin 2a \\neq 2 \\sin a$.

---

## 4. Công thức hạ bậc

💡 **Trực giác / Hình dung**: "hạ bậc" = biến **bình phương** (sin²a, bậc 2, khó tích phân) thành **bậc nhất** của góc gấp đôi (cos 2a). Đổi độ khó: thay vì bình phương rối, ta có một cos đơn giản. Đây là "đảo ngược" công thức nhân đôi của cos.

Đảo lại từ cos 2a:

$$\\begin{aligned}
\\sin^2 a &= \\frac{1 - \\cos 2a}{2} \\\\
\\cos^2 a &= \\frac{1 + \\cos 2a}{2} \\\\
\\tan^2 a &= \\frac{1 - \\cos 2a}{1 + \\cos 2a}
\\end{aligned}$$

**Chứng minh từng bước $\\sin^2 a = \\frac{1 - \\cos 2a}{2}$**: từ $\\cos 2a = 1 - 2\\sin^2 a$, chuyển vế: $2\\sin^2 a = 1 - \\cos 2a$ → chia 2 → $\\sin^2 a = \\frac{1 - \\cos 2a}{2}$. Xong, không bước nào bỏ qua.

⟶ **Cực hữu ích** khi tích phân (tránh bình phương).

**Ví dụ**: $\\int \\sin^2 x \\, dx = \\int \\frac{1 - \\cos 2x}{2} \\, dx = \\frac{x}{2} - \\frac{\\sin(2x)}{4} + C$.

**Verify bằng số tại $a = \\frac{\\pi}{6}$ (30°)**: $\\sin^2 30^\\circ = (\\frac{1}{2})^2 = \\frac{1}{4}$. Theo công thức: $\\frac{1 - \\cos 60^\\circ}{2} = \\frac{1 - 1/2}{2} = \\frac{1/2}{2} = \\frac{1}{4}$ ✓. Và $\\cos^2 30^\\circ = (\\frac{\\sqrt{3}}{2})^2 = \\frac{3}{4}$; công thức: $\\frac{1 + \\cos 60^\\circ}{2} = \\frac{1 + 1/2}{2} = \\frac{3/2}{2} = \\frac{3}{4}$ ✓.

⚠ **Lỗi thường gặp — lẫn dấu giữa sin² và cos²**. $\\sin^2$ đi với dấu **trừ** ($1 - \\cos 2a$), $\\cos^2$ đi với dấu **cộng** ($1 + \\cos 2a$). Mẹo: cos là "co-dương" → dấu cộng. Phản ví dụ nếu đảo dấu: tính $\\cos^2 0 = 1$ nhưng dùng nhầm $\\frac{1-\\cos 0}{2} = 0$ → sai; đúng phải $\\frac{1+\\cos 0}{2} = 1$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tích phân $\\sin^2 x$ lại cần hạ bậc?"* Vì $\\int\\sin^2 x \\, dx$ không có nguyên hàm sơ cấp ở dạng $\\sin^2$. Hạ bậc biến nó thành $\\int\\frac{1-\\cos 2x}{2} \\, dx$ — chỉ còn tích phân hằng và cos, dễ.
- *"Giá trị trung bình của $\\sin^2 x$ trên một chu kỳ là bao nhiêu?"* Đúng **$\\frac{1}{2}$** (vì $\\cos 2x$ trung bình bằng 0). Đây là gốc của "giá trị hiệu dụng" trong điện AC.

🔁 **Dừng lại tự kiểm tra**

1. Viết $\\cos^2 x$ theo $\\cos 2x$ rồi tính tại $x = \\frac{\\pi}{4}$.
2. Tính $\\int \\cos^2 x \\, dx$.

<details><summary>Đáp án</summary>

1. $\\cos^2 x = \\frac{1+\\cos 2x}{2}$. Tại $\\frac{\\pi}{4}$: $\\frac{1 + \\cos(\\pi/2)}{2} = \\frac{1+0}{2} = \\frac{1}{2}$ ($= (\\frac{\\sqrt{2}}{2})^2$ ✓).
2. $\\int\\frac{1+\\cos 2x}{2} \\, dx = \\frac{x}{2} + \\frac{\\sin(2x)}{4} + C$.

</details>

### 📝 Tóm tắt mục 4

- $\\sin^2 a = \\frac{1-\\cos 2a}{2}$, $\\cos^2 a = \\frac{1+\\cos 2a}{2}$ — đảo từ nhân đôi của cos.
- sin² đi dấu trừ, cos² đi dấu cộng (đừng lẫn).
- Dùng chủ yếu để **tích phân** bình phương sin/cos.

---

## 5. Biến tích thành tổng

💡 **Trực giác / Hình dung**: **tích** của hai hàm lượng giác rất khó tích phân; **tổng** thì dễ (mỗi hạng tử là một sin/cos riêng). Các công thức này là cây cầu biến phép nhân rối thành phép cộng gọn — y hệt vai trò của logarit ("nhân → cộng") nhưng cho lượng giác.

$$\\begin{aligned}
\\sin a \\cdot \\cos b &= \\tfrac{1}{2}[\\sin(a+b) + \\sin(a-b)] \\\\
\\cos a \\cdot \\cos b &= \\tfrac{1}{2}[\\cos(a-b) + \\cos(a+b)] \\\\
\\sin a \\cdot \\sin b &= \\tfrac{1}{2}[\\cos(a-b) - \\cos(a+b)]
\\end{aligned}$$

**Chứng minh từng bước $\\sin a \\cos b = \\tfrac{1}{2}[\\sin(a+b)+\\sin(a-b)]$**: cộng hai công thức cộng: $\\sin(a+b) = \\sin a \\cos b + \\cos a \\sin b$ và $\\sin(a-b) = \\sin a \\cos b - \\cos a \\sin b$. Cộng lại: $\\sin(a+b)+\\sin(a-b) = 2 \\sin a \\cos b$ (các hạng tử $\\cos a \\sin b$ triệt tiêu). Chia 2 → đpcm.

**Verify bằng số (a = 60°, b = 30°)**: vế trái $\\sin 60\\cdot\\cos 30 = \\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{3}}{2} = \\frac{3}{4}$. Vế phải $\\tfrac{1}{2}[\\sin 90 + \\sin 30] = \\tfrac{1}{2}[1 + \\frac{1}{2}] = \\tfrac{1}{2}\\cdot\\frac{3}{2} = \\frac{3}{4}$ ✓.

⟶ Dùng để **tích phân** sản phẩm sin/cos, hoặc giải PT.

⚠ **Lỗi thường gặp — lẫn thứ tự dấu trong $\\sin a \\sin b$**. Công thức là $\\tfrac{1}{2}[\\cos(a-b) - \\cos(a+b)]$ — $\\cos(a-b)$ đứng trước với dấu **cộng**, $\\cos(a+b)$ sau với dấu **trừ**. Phản ví dụ a=b=30°: $\\sin 30\\cdot\\sin 30 = \\frac{1}{4}$; đúng $\\tfrac{1}{2}[\\cos 0 - \\cos 60] = \\tfrac{1}{2}[1 - \\frac{1}{2}] = \\frac{1}{4}$ ✓; nếu đảo dấu $\\tfrac{1}{2}[\\cos 60 - \\cos 0] = \\tfrac{1}{2}[\\frac{1}{2} - 1] = -\\frac{1}{4} < 0$ → vô lý vì $\\sin^2 \\ge 0$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng tích→tổng thay vì hạ bậc?"* Hạ bậc cho $\\sin^2$, $\\cos^2$ (cùng góc). Tích→tổng cho tích **hai góc khác nhau** như $\\sin 3x \\cos x$. Khác mục đích.
- *"Có gì liên hệ với hiện tượng 'beat' trong âm thanh?"* Có. Hai âm tần số gần nhau nhân/cộng lại tạo dao động biên độ chậm (beat) — chính là công thức tích↔tổng (mục 6).

🔁 **Dừng lại tự kiểm tra**

1. Viết $2 \\sin 5x \\cos 3x$ thành tổng.
2. $\\cos x \\cos 2x$ bằng tổng nào?

<details><summary>Đáp án</summary>

1. $2 \\sin 5x \\cos 3x = \\sin(5x+3x) + \\sin(5x-3x) = \\sin 8x + \\sin 2x$.
2. $\\cos x \\cos 2x = \\tfrac{1}{2}[\\cos(x-2x) + \\cos(x+2x)] = \\tfrac{1}{2}[\\cos x + \\cos 3x]$ (dùng $\\cos(-x)=\\cos x$).

</details>

### 📝 Tóm tắt mục 5

- Tích hai hàm lượng giác → tổng/hiệu (giống log biến nhân thành cộng).
- $\\sin a \\sin b = \\tfrac{1}{2}[\\cos(a-b) - \\cos(a+b)]$ (chú ý thứ tự dấu).
- Dùng để tích phân tích hai góc khác nhau và giải PT.

---

## 6. Biến tổng thành tích

💡 **Trực giác / Hình dung**: chiều ngược của mục 5. Khi giải phương trình, ta muốn đưa về **tích = 0** (vì khi đó từng thừa số bằng 0 cho ngay nghiệm). Một **tổng** sin/cos khó cho ra nghiệm, nhưng nếu biến thành **tích** thì giải được tức thì. Đây là vũ khí chính cho Lesson 04.

$$\\begin{aligned}
\\sin a + \\sin b &= 2\\cdot\\sin\\tfrac{a+b}{2}\\cdot\\cos\\tfrac{a-b}{2} \\\\
\\sin a - \\sin b &= 2\\cdot\\cos\\tfrac{a+b}{2}\\cdot\\sin\\tfrac{a-b}{2} \\\\
\\cos a + \\cos b &= 2\\cdot\\cos\\tfrac{a+b}{2}\\cdot\\cos\\tfrac{a-b}{2} \\\\
\\cos a - \\cos b &= -2\\cdot\\sin\\tfrac{a+b}{2}\\cdot\\sin\\tfrac{a-b}{2}
\\end{aligned}$$

**Verify $\\sin a + \\sin b$ bằng số (a = 90°, b = 30°)**: vế trái $\\sin 90 + \\sin 30 = 1 + \\frac{1}{2} = \\frac{3}{2}$. Vế phải $2\\cdot\\sin\\frac{90+30}{2}\\cdot\\cos\\frac{90-30}{2} = 2\\cdot\\sin 60\\cdot\\cos 30 = 2\\cdot\\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{3}}{2} = 2\\cdot\\frac{3}{4} = \\frac{3}{2}$ ✓.

⟶ Dùng để **giải PT** (đưa về dạng tích = 0).

⚠ **Lỗi thường gặp — quên dấu trừ ở $\\cos a - \\cos b$**. Công thức này có dấu **âm** đứng đầu: $\\cos a - \\cos b = -2 \\sin(\\ldots)\\cdot\\sin(\\ldots)$. Phản ví dụ a = 60°, b = 0°: $\\cos 60 - \\cos 0 = \\frac{1}{2} - 1 = -\\frac{1}{2}$; đúng $-2\\cdot\\sin 30\\cdot\\sin 30 = -2\\cdot\\frac{1}{2}\\cdot\\frac{1}{2} = -\\frac{1}{2}$ ✓; nếu quên dấu trừ ra $+\\frac{1}{2}$ → sai dấu.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công thức có $\\frac{a+b}{2}$ và $\\frac{a-b}{2}$?"* Vì đặt $p = \\frac{a+b}{2}$, $q = \\frac{a-b}{2}$ thì $a = p+q$, $b = p-q$. Khai triển $\\sin(p+q) + \\sin(p-q)$ cho ra $2 \\sin p \\cos q$ — chính là công thức.
- *"Dùng để giải PT thế nào?"* Vd $\\sin 3x + \\sin x = 0$ → $2 \\sin 2x \\cos x = 0$ → $\\sin 2x = 0$ HOẶC $\\cos x = 0$. Tích bằng 0 tách thành hai PT cơ bản.

🔁 **Dừng lại tự kiểm tra**

1. Viết $\\cos 5x + \\cos x$ thành tích.
2. $\\sin 4x - \\sin 2x$ bằng tích nào?

<details><summary>Đáp án</summary>

1. $\\cos 5x + \\cos x = 2 \\cos\\frac{5x+x}{2} \\cos\\frac{5x-x}{2} = 2 \\cos 3x \\cos 2x$.
2. $\\sin 4x - \\sin 2x = 2 \\cos\\frac{4x+2x}{2} \\sin\\frac{4x-2x}{2} = 2 \\cos 3x \\sin x$.

</details>

### 📝 Tóm tắt mục 6

- Tổng/hiệu sin/cos → tích (dùng nửa-tổng và nửa-hiệu góc).
- $\\cos a - \\cos b = -2 \\sin(\\ldots) \\sin(\\ldots)$ có dấu trừ đầu.
- Công cụ chính để đưa PT lượng giác về dạng **tích = 0**.

---

## 7. a·sin x + b·cos x = R·sin(x + φ)

**Quan trọng cho dao động, sóng**.

$$a\\cdot\\sin x + b\\cdot\\cos x = R\\cdot\\sin(x + \\varphi)$$

trong đó:
- $R = \\sqrt{a^2 + b^2}$ (biên độ tổng hợp).
- $\\tan\\varphi = \\frac{b}{a}$ (pha).

💡 **Trực giác**: 2 dao động cùng tần số ($\\sin x$ và $\\cos x = \\sin(x + \\frac{\\pi}{2})$) cộng lại = 1 dao động cùng tần số, biên độ R, pha $\\varphi$.

**Ví dụ**: $3\\cdot\\sin x + 4\\cdot\\cos x = R\\cdot\\sin(x + \\varphi)$.
- $R = \\sqrt{9 + 16} = 5$.
- $\\tan\\varphi = \\frac{4}{3}$ → $\\varphi \\approx 53.13^\\circ \\approx 0.927$ rad.
- → $5\\cdot\\sin(x + 0.927)$.

⟶ **Biên độ thay đổi từ ban đầu 3 hoặc 4 lên 5**.

**Chứng minh từng bước công thức tổng hợp**: khai triển vế phải $R \\sin(x+\\varphi) = R(\\sin x \\cos\\varphi + \\cos x \\sin\\varphi) = (R \\cos\\varphi) \\sin x + (R \\sin\\varphi) \\cos x$. Đối chiếu với $a \\sin x + b \\cos x$: cần $R \\cos\\varphi = a$ và $R \\sin\\varphi = b$. Bình phương cộng lại: $R^2(\\cos^2\\varphi + \\sin^2\\varphi) = a^2 + b^2$ → $R = \\sqrt{a^2+b^2}$. Chia: $\\tan\\varphi = \\frac{R \\sin\\varphi}{R \\cos\\varphi} = \\frac{b}{a}$. Xong.

⚠ **Lỗi thường gặp — biên độ tổng hợp KHÔNG phải $a + b$**. Là $\\sqrt{a^2+b^2}$. Phản ví dụ: $3 \\sin x + 4 \\cos x$ có biên độ $\\sqrt{9+16} = 5$, KHÔNG phải $3+4 = 7$. (Tại x cụ thể không bao giờ vượt 5.) Lý do: sin x và cos x lệch pha 90°, cộng theo kiểu Pythagore chứ không cộng thẳng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi xác định $\\varphi$ từ $\\tan\\varphi = \\frac{b}{a}$, có nguy cơ sai phần tư không?"* Có. $\\tan\\varphi = \\frac{b}{a}$ cho hai $\\varphi$ cách nhau $\\pi$. Phải dùng dấu của $a = R \\cos\\varphi$ và $b = R \\sin\\varphi$ để chọn đúng phần tư của $\\varphi$ (giống \`atan2\`).
- *"Có viết được dạng $R \\cos(x - \\psi)$ không?"* Được. $a \\sin x + b \\cos x$ cũng $= R \\cos(x - \\psi)$ với $R$ y hệt và $\\tan\\psi = \\frac{a}{b}$. Hai cách tương đương, chọn cái tiện.

🔁 **Dừng lại tự kiểm tra**

1. Biên độ của $5 \\sin x + 12 \\cos x$ là bao nhiêu?
2. Đưa $\\sin x + \\cos x$ về dạng $R \\sin(x+\\varphi)$.

<details><summary>Đáp án</summary>

1. $R = \\sqrt{5^2+12^2} = \\sqrt{169} = 13$.
2. $R = \\sqrt{1+1} = \\sqrt{2}$, $\\tan\\varphi = \\frac{1}{1} = 1$ → $\\varphi = \\frac{\\pi}{4}$. Vậy $\\sqrt{2} \\sin(x + \\frac{\\pi}{4})$.

</details>

### 📝 Tóm tắt mục 7

- $a \\sin x + b \\cos x = R \\sin(x+\\varphi)$ với $R = \\sqrt{a^2+b^2}$, $\\tan\\varphi = \\frac{b}{a}$.
- Biên độ tổng hợp $= \\sqrt{a^2+b^2}$, KHÔNG phải a+b.
- Là cách tổng hợp hai dao động cùng tần số thành một; nền cho giải PT (L04).

---

## 8. Định lý cosin (Law of Cosines)

💡 **Trực giác / Hình dung**: ta đã có **Pythagore** cho tam giác **vuông**: $a^2 + b^2 = c^2$. Nếu tam giác **không vuông** thì sao? Định lý cosin là **bản tổng quát** của Pythagore: nó thêm một số hạng hiệu chỉnh $-2ab\\cos C$ để "vá" khi góc $C$ khác $90°$.

**Phát biểu**: tam giác bất kỳ với 3 cạnh $a, b, c$ và 3 góc đối diện $A, B, C$ (cạnh $a$ đối đỉnh $A$...). Khi đó:

$$c^2 = a^2 + b^2 - 2ab\\cos C$$

Đối xứng (đổi vai trò các cạnh/góc):

$$\\begin{aligned}
a^2 &= b^2 + c^2 - 2bc\\cos A \\\\
b^2 &= a^2 + c^2 - 2ac\\cos B
\\end{aligned}$$

\`\`\`
            A
           /\\
        b /  \\ c
         /    \\
        / C    \\
       B────────  ... C đối diện cạnh c = AB
              a
\`\`\`
(Quy ước: đỉnh $A,B,C$; cạnh đối diện cùng tên thường $a,b,c$; góc $C$ là góc tại đỉnh $C$, **xen giữa** hai cạnh $a$ và $b$.)

### 8.1. Vì sao là "tổng quát của Pythagore"?

Khi $C = 90°$ thì $\\cos C = 0$, số hạng hiệu chỉnh biến mất:

$$c^2 = a^2 + b^2 - 2ab\\cdot 0 = a^2 + b^2 \\quad \\leftarrow \\text{Pythagore}.$$

| $C$ | $\\cos C$ | $-2ab\\cos C$ | $c^2$ so với $a^2+b^2$ |
|-----|----------|--------------|------------------------|
| $< 90°$ (nhọn) | $> 0$ | âm | $c^2 < a^2+b^2$ → cạnh đối **ngắn** hơn |
| $= 90°$ (vuông) | $0$ | $0$ | $c^2 = a^2+b^2$ (Pythagore) |
| $> 90°$ (tù) | $< 0$ | dương | $c^2 > a^2+b^2$ → cạnh đối **dài** hơn |

Trực giác khớp hình học: mở rộng góc đối → nới dài cạnh đối.

### 8.2. Chứng minh từng bước (tọa độ + Pythagore lượng giác)

**Setup**: đặt $C = (0,0)$ ở gốc, $B = (a, 0)$ trên trục Ox (cạnh $CB$ dài $a$), và $A = (b\\cos C, b\\sin C)$ (đi từ $C$ một góc $C$, khoảng cách $b$).

**Bước 1** — $c^2 = |AB|^2$ bằng công thức khoảng cách:
$$c^2 = (b\\cos C - a)^2 + (b\\sin C - 0)^2.$$
**Bước 2** — khai triển:
$$c^2 = b^2\\cos^2 C - 2ab\\cos C + a^2 + b^2\\sin^2 C.$$
**Bước 3** — nhóm $b^2(\\cos^2 C + \\sin^2 C)$:
$$c^2 = a^2 + b^2(\\cos^2 C + \\sin^2 C) - 2ab\\cos C.$$
**Bước 4** — dùng Pythagore lượng giác $\\cos^2 C + \\sin^2 C = 1$:
$$c^2 = a^2 + b^2 - 2ab\\cos C. \\quad ∎$$
Chứng minh dùng được cả góc nhọn lẫn tù (vì $0° < C < 180°$ nên $\\sin C > 0$, và $\\cos C$ tự đổi dấu khi $C$ vượt $90°$).

### 8.3. Walk-through — 3 ví dụ giải tam giác

**Ví dụ 1 — biết 2 cạnh + góc xen ($a = 5, b = 7, C = 60°$), tính $c$**:
$$c^2 = 25 + 49 - 2\\cdot 5\\cdot 7\\cdot\\cos 60° = 74 - 70\\cdot\\tfrac{1}{2} = 74 - 35 = 39 \\;\\Rightarrow\\; c = \\sqrt{39} \\approx 6.245.$$
Kiểm: $C = 60° < 90°$ → kỳ vọng $c < \\sqrt{74} \\approx 8.6$; thực tế $6.245 < 8.6$ ✓.

**Ví dụ 2 — biết 3 cạnh ($a=4, b=5, c=6$), tính các góc** (đảo công thức: $\\cos C = \\frac{a^2+b^2-c^2}{2ab}$):
$$\\begin{aligned}
\\cos A &= \\frac{b^2+c^2-a^2}{2bc} = \\frac{25+36-16}{60} = \\frac{45}{60} = 0.75 \\;\\Rightarrow\\; A \\approx 41.41°, \\\\
\\cos B &= \\frac{a^2+c^2-b^2}{2ac} = \\frac{16+36-25}{48} = \\frac{27}{48} = 0.5625 \\;\\Rightarrow\\; B \\approx 55.77°, \\\\
\\cos C &= \\frac{a^2+b^2-c^2}{2ab} = \\frac{16+25-36}{40} = \\frac{5}{40} = 0.125 \\;\\Rightarrow\\; C \\approx 82.82°.
\\end{aligned}$$
Kiểm tổng góc: $41.41 + 55.77 + 82.82 = 180.00°$ ✓.

**Ví dụ 3 — góc tù ($a = 6, b = 8, C = 120°$), tính $c$**:
$$c^2 = 36 + 64 - 2\\cdot 6\\cdot 8\\cdot\\cos 120° = 100 - 96\\cdot(-\\tfrac{1}{2}) = 100 + 48 = 148 \\;\\Rightarrow\\; c = \\sqrt{148} \\approx 12.166.$$
Kiểm: $C = 120° > 90°$ → kỳ vọng $c > \\sqrt{100} = 10$; thực tế $12.166 > 10$ ✓.

**Ví dụ 4 — định lý cosin "nhận ra" tam giác vuông ($a=3, b=4, c=5$)**:
$$25 = 9 + 16 - 24\\cos C \\;\\Rightarrow\\; 25 = 25 - 24\\cos C \\;\\Rightarrow\\; \\cos C = 0 \\;\\Rightarrow\\; C = 90°. ✓$$

⚠ **Lỗi thường gặp — đặt sai góc xen giữa**. Số hạng $-2ab\\cos C$ phải dùng góc $C$ **xen giữa** đúng hai cạnh $a$ và $b$. Nếu lỡ dùng góc $A$ (đối diện $a$) vào công thức của $c$ thì sai. Mẹo: trong $c^2 = a^2 + b^2 - 2ab\\cos C$, **chữ in hoa $C$ (góc) phải khác chữ thường $a,b$ đang bình phương**, và $C$ đối diện cạnh $c$ đang tính.

⚠ **Lỗi thường gặp 2 — quên dấu trừ**. Là $a^2 + b^2 \\boldsymbol{-} 2ab\\cos C$, KHÔNG phải dấu cộng. Phản ví dụ $a=3,b=4,C=90°$: đúng cho $c^2 = 9+16-0 = 25$ → $c=5$; nếu dùng dấu cộng và quên $\\cos 90°=0$ thì ra số khác → sai.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Biết 3 cạnh thì chắc gì tạo được tam giác?"* Phải thỏa **bất đẳng thức tam giác**: mỗi cạnh nhỏ hơn tổng hai cạnh kia. Nếu vi phạm, định lý cosin cho $|\\cos C| > 1$ (vô lý) → báo ngay dữ liệu sai. Vd $a=1,b=1,c=5$: $\\cos C = \\frac{1+1-25}{2} = -11.5 \\notin [-1,1]$ → tam giác không tồn tại.
- *"Khi nào dùng cosin, khi nào dùng sin (Mục 9)?"* Cosin khi biết **2 cạnh + góc xen** (SAS) hoặc **3 cạnh** (SSS). Định lý sin khi biết **2 góc + 1 cạnh** (AAS/ASA) hoặc **2 cạnh + góc đối** (SSA).

🔁 **Dừng lại tự kiểm tra**

1. Tam giác có $a = 8, b = 6, C = 90°$. Tính $c$.
2. Tam giác có 3 cạnh $a = 7, b = 8, c = 9$. Tính $\\cos B$.

<details><summary>Đáp án</summary>

1. $c^2 = 64 + 36 - 2\\cdot 8\\cdot 6\\cdot\\cos 90° = 100 - 0 = 100 \\Rightarrow c = 10$ (chính là bộ ba $6,8,10$).
2. $\\cos B = \\frac{a^2+c^2-b^2}{2ac} = \\frac{49+81-64}{2\\cdot 7\\cdot 9} = \\frac{66}{126} = \\frac{11}{21} \\approx 0.524 \\Rightarrow B \\approx 58.4°$.

</details>

### 📝 Tóm tắt mục 8

- $c^2 = a^2 + b^2 - 2ab\\cos C$ — tổng quát của Pythagore; khi $C = 90°$ → $\\cos C = 0$ → quay về $a^2+b^2$.
- Dùng để: tính cạnh khi biết 2 cạnh + góc xen (SAS); tính góc khi biết 3 cạnh (SSS, đảo công thức $\\cos C = \\frac{a^2+b^2-c^2}{2ab}$).
- Cẩn thận dấu trừ và chọn đúng góc xen giữa.

---

## 9. Định lý sin (Law of Sines)

💡 **Trực giác / Hình dung**: trong một tam giác, **cạnh càng dài thì góc đối diện càng lớn**. Định lý sin định lượng chính xác quan hệ đó: tỉ số $\\frac{\\text{cạnh}}{\\sin(\\text{góc đối})}$ là **hằng số** cho cả 3 cặp, và hằng số đó bằng $2R$ (đường kính đường tròn ngoại tiếp).

**Phát biểu**:

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$

với $R$ là bán kính đường tròn ngoại tiếp (đi qua cả 3 đỉnh).

### 9.1. Chứng minh từng bước (qua đường cao)

Hạ đường cao $h$ từ đỉnh $C$ xuống cạnh $AB$ (cạnh $c$). Xét hai tam giác vuông tạo bởi $h$:
- Trong tam giác vuông chứa góc $A$: $\\sin A = \\frac{h}{b}$ → $h = b\\sin A$.
- Trong tam giác vuông chứa góc $B$: $\\sin B = \\frac{h}{a}$ → $h = a\\sin B$.

Cùng là $h$ nên $b\\sin A = a\\sin B$, chia hai vế cho $\\sin A\\sin B$:

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B}.$$

Hạ đường cao từ đỉnh khác cho cặp còn lại → cả 3 tỉ số bằng nhau. ∎ (Việc tỉ số chung bằng $2R$ chứng minh bằng đường tròn ngoại tiếp; tạm dùng kết quả.)

### 9.2. Walk-through — 3 ví dụ giải tam giác

**Ví dụ 1 — biết 2 góc + 1 cạnh ($A = 30°, B = 75°, a = 10$), tính $b$**:

$C = 180° - 30° - 75° = 75°$. Dùng $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$:
$$\\frac{10}{\\sin 30°} = \\frac{b}{\\sin 75°} \\;\\Rightarrow\\; \\frac{10}{0.5} = \\frac{b}{0.9659} \\;\\Rightarrow\\; b = 20\\cdot 0.9659 \\approx 19.319.$$

**Ví dụ 2 — tìm bán kính ngoại tiếp ($a = 10, A = 30°$)**:
$$2R = \\frac{a}{\\sin A} = \\frac{10}{0.5} = 20 \\;\\Rightarrow\\; R = 10.$$

**Ví dụ 3 — biết 2 cạnh + góc đối ($a = 8, b = 6, A = 60°$), tính $B$** (trường hợp SSA):
$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} \\;\\Rightarrow\\; \\sin B = \\frac{b\\sin A}{a} = \\frac{6\\cdot\\frac{\\sqrt3}{2}}{8} = \\frac{3\\sqrt3}{8} \\approx 0.6495 \\;\\Rightarrow\\; B \\approx 40.5°.$$
(Vì cạnh $b < a$ nên $B < A$, chỉ có một nghiệm — không rơi vào *ambiguous case*.)

⚠ **Lỗi thường gặp — ambiguous case (SSA)**. Khi biết 2 cạnh + góc đối **không xen**, $\\sin B = k$ có thể cho **hai** góc $B$ và $180° - B$ (vì $\\sin$ bằng nhau ở hai góc bù). Phải kiểm cả hai xem tam giác nào hợp lệ (tổng 3 góc $< 180°$). Vd $a=6, b=8, A=30°$: $\\sin B = \\frac{8\\sin30°}{6} = \\frac{4}{6} \\approx 0.667$ → $B \\approx 41.8°$ HOẶC $B \\approx 138.2°$, cả hai đều cho tam giác hợp lệ → **hai tam giác**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Định lý sin và cosin trùng vai trò không?"* Không, **bù trừ**. Cosin cần (và cho) một góc xen 2 cạnh hoặc cả 3 cạnh; sin cần một **cặp cạnh–góc đối** đã biết. Nếu chỉ có SAS hoặc SSS thì sin bí (không có cặp đối nào trọn vẹn) → phải khởi đầu bằng cosin.
- *"Vì sao tỉ số bằng $2R$ chứ không phải $R$?"* Vì với một dây cung, góc nội tiếp chắn cung bằng nửa góc ở tâm; suy ra cạnh $= 2R\\sin(\\text{góc đối})$. Chi tiết học ở hình học đường tròn.

🔁 **Dừng lại tự kiểm tra**

1. Tam giác có $A = 45°, B = 60°, a = 12$. Tính $b$.
2. Tam giác có $a = 14, A = 30°$. Tính $2R$ và $R$.

<details><summary>Đáp án</summary>

1. $\\frac{12}{\\sin 45°} = \\frac{b}{\\sin 60°} \\Rightarrow b = \\frac{12\\cdot(\\sqrt3/2)}{\\sqrt2/2} = \\frac{12\\sqrt3}{\\sqrt2} = 6\\sqrt6 \\approx 14.70$.
2. $2R = \\frac{14}{\\sin 30°} = \\frac{14}{0.5} = 28 \\Rightarrow R = 14$.

</details>

### 📝 Tóm tắt mục 9

- $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$ — cạnh tỉ lệ với sin góc đối.
- Dùng khi biết 2 góc + 1 cạnh (AAS/ASA) hoặc 2 cạnh + góc đối (SSA — coi chừng ambiguous case có 2 nghiệm).
- Bù trừ với định lý cosin: SAS/SSS dùng cosin, AAS/ASA/SSA dùng sin.

---

## 10. Bài tập

### Bài tập

**Bài 1**: Tính $\\cos 75^\\circ$ dùng công thức cộng.

**Bài 2**: Đơn giản $(\\sin x + \\cos x)^2$.

**Bài 3**: Biểu diễn $\\cos 2x$ theo $\\sin x$, theo $\\cos x$.

**Bài 4**: Tính $\\int_0^\\pi \\sin^2 x \\, dx$.

**Bài 5**: Biến đổi $\\sqrt{3}\\cdot\\sin x + \\cos x$ sang dạng $R\\cdot\\sin(x + \\varphi)$.

**Bài 6**: Tam giác có $a = 8, b = 10, C = 45°$. Tính $c$ (dùng định lý cosin).

**Bài 7**: Tam giác có 3 cạnh $a = 5, b = 6, c = 7$. Tính $\\cos A$ rồi góc $A$.

**Bài 8**: Tam giác có $A = 40°, B = 60°, a = 10$. Tính cạnh $b$ (dùng định lý sin).

### Lời giải

**Bài 1**: $\\cos 75^\\circ = \\cos(45+30) = \\cos 45\\cdot\\cos 30 - \\sin 45\\cdot\\sin 30 = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = $ **$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$**.

**Bài 2**: $(\\sin x + \\cos x)^2 = \\sin^2 x + 2\\cdot\\sin x\\cdot\\cos x + \\cos^2 x = $ **$1 + \\sin 2x$**.

**Bài 3**:  
- $\\cos 2x = 1 - 2\\sin^2 x$.  
- $\\cos 2x = 2\\cos^2 x - 1$.

**Bài 4**: $\\int_0^\\pi \\sin^2 x \\, dx = \\int_0^\\pi \\frac{1 - \\cos 2x}{2} \\, dx = [\\frac{x}{2} - \\frac{\\sin(2x)}{4}]_0^\\pi = \\frac{\\pi}{2} - 0 - 0 + 0 = $ **$\\frac{\\pi}{2}$**.

**Bài 5**: $R = \\sqrt{3 + 1} = $ **2**. $\\tan\\varphi = \\frac{1}{\\sqrt{3}}$ → $\\varphi = \\frac{\\pi}{6}$. → **$2\\cdot\\sin(x + \\frac{\\pi}{6})$**.

**Bài 6**: $c^2 = a^2 + b^2 - 2ab\\cos C = 64 + 100 - 2\\cdot 8\\cdot 10\\cdot\\cos 45° = 164 - 160\\cdot\\frac{\\sqrt2}{2} = 164 - 80\\sqrt2 \\approx 164 - 113.14 = 50.86$. Vậy $c \\approx \\sqrt{50.86} \\approx$ **7.13**. Kiểm: $C = 45° < 90°$ → $c < \\sqrt{164} \\approx 12.8$; $7.13 < 12.8$ ✓.

**Bài 7**: đảo định lý cosin: $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{36 + 49 - 25}{2\\cdot 6\\cdot 7} = \\frac{60}{84} = \\frac{5}{7} \\approx 0.714$. → $A = \\arccos(0.714) \\approx$ **44.4°**. (Cạnh $a=5$ nhỏ nhất → $A$ nhỏ nhất, hợp lý.)

**Bài 8**: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$ → $b = \\frac{a\\sin B}{\\sin A} = \\frac{10\\cdot\\sin 60°}{\\sin 40°} = \\frac{10\\cdot 0.8660}{0.6428} \\approx$ **13.47**. Kiểm: $B = 60° > A = 40°$ → cạnh $b > a = 10$; $13.47 > 10$ ✓.

---

## 11. Bài tiếp theo

[Lesson 04 — Phương trình lượng giác](../lesson-04-trig-equations/).

## 📝 Tổng kết

1. **$\\sin^2 + \\cos^2 = 1$** (Pythagore lượng giác); chia ra $1+\\tan^2 = \\sec^2$, $1+\\cot^2 = \\csc^2$.
2. **Công thức cộng** là gốc — chứng minh $\\cos(a-b)$ bằng đường tròn đơn vị, suy ra hết; nhân đôi = cộng với $b=a$.
3. **Hạ bậc**: $\\sin^2 x = \\frac{1-\\cos 2x}{2}$, $\\cos^2 x = \\frac{1+\\cos 2x}{2}$ — dùng để tích phân.
4. **Tích ↔ tổng**: cho giải PT.
5. **$a\\cdot\\sin x + b\\cdot\\cos x = \\sqrt{a^2+b^2}\\cdot\\sin(x + \\varphi)$** — tổng hợp dao động.
6. **Định lý cosin** $c^2 = a^2 + b^2 - 2ab\\cos C$ (tổng quát Pythagore, dùng SAS/SSS) và **định lý sin** $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$ (dùng AAS/ASA/SSA) — giải tam giác bất kỳ.

## Bảng công thức tổng hợp (cheatsheet)

| Nhóm | Công thức |
|------|-----------|
| **Pythagore** | $\\sin^2 x + \\cos^2 x = 1$; $\\;1+\\tan^2 x = \\sec^2 x$; $\\;1+\\cot^2 x = \\csc^2 x$ |
| **Cộng/Hiệu** | $\\sin(a\\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b$ |
| | $\\cos(a\\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b$ |
| | $\\tan(a\\pm b) = \\dfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b}$ |
| **Nhân đôi** | $\\sin 2a = 2\\sin a\\cos a$ |
| | $\\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$ |
| | $\\tan 2a = \\dfrac{2\\tan a}{1 - \\tan^2 a}$ |
| **Hạ bậc** | $\\sin^2 a = \\dfrac{1-\\cos 2a}{2}$; $\\;\\cos^2 a = \\dfrac{1+\\cos 2a}{2}$ |
| **Định lý cosin** | $c^2 = a^2 + b^2 - 2ab\\cos C$ |
| **Định lý sin** | $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$ |
`;
