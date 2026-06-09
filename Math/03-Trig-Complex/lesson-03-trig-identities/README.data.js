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

Suy ra:
- $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$ (chia 2 vế cho $\\cos^2 x$).
- $1 + \\cot^2 x = \\frac{1}{\\sin^2 x}$.

💡 **Vì sao đúng?** Vì điểm $(\\cos x, \\sin x)$ nằm trên đường tròn bán kính 1, theo Pythagore khoảng cách$^2 = 1$.

### 1.2. Tính chẵn lẻ

- $\\sin(-x) = -\\sin x$ (lẻ).
- $\\cos(-x) = \\cos x$ (chẵn).
- $\\tan(-x) = -\\tan x$ (lẻ).

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

## 8. Bài tập

### Bài tập

**Bài 1**: Tính $\\cos 75^\\circ$ dùng công thức cộng.

**Bài 2**: Đơn giản $(\\sin x + \\cos x)^2$.

**Bài 3**: Biểu diễn $\\cos 2x$ theo $\\sin x$, theo $\\cos x$.

**Bài 4**: Tính $\\int_0^\\pi \\sin^2 x \\, dx$.

**Bài 5**: Biến đổi $\\sqrt{3}\\cdot\\sin x + \\cos x$ sang dạng $R\\cdot\\sin(x + \\varphi)$.

### Lời giải

**Bài 1**: $\\cos 75^\\circ = \\cos(45+30) = \\cos 45\\cdot\\cos 30 - \\sin 45\\cdot\\sin 30 = \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = $ **$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$**.

**Bài 2**: $(\\sin x + \\cos x)^2 = \\sin^2 x + 2\\cdot\\sin x\\cdot\\cos x + \\cos^2 x = $ **$1 + \\sin 2x$**.

**Bài 3**:  
- $\\cos 2x = 1 - 2\\sin^2 x$.  
- $\\cos 2x = 2\\cos^2 x - 1$.

**Bài 4**: $\\int_0^\\pi \\sin^2 x \\, dx = \\int_0^\\pi \\frac{1 - \\cos 2x}{2} \\, dx = [\\frac{x}{2} - \\frac{\\sin(2x)}{4}]_0^\\pi = \\frac{\\pi}{2} - 0 - 0 + 0 = $ **$\\frac{\\pi}{2}$**.

**Bài 5**: $R = \\sqrt{3 + 1} = $ **2**. $\\tan\\varphi = \\frac{1}{\\sqrt{3}}$ → $\\varphi = \\frac{\\pi}{6}$. → **$2\\cdot\\sin(x + \\frac{\\pi}{6})$**.

---

## 9. Bài tiếp theo

[Lesson 04 — Phương trình lượng giác](../lesson-04-trig-equations/).

## 📝 Tổng kết

1. **$\\sin^2 + \\cos^2 = 1$**, công thức cộng, nhân đôi, hạ bậc.
2. **Hạ bậc**: $\\sin^2 x = \\frac{1-\\cos 2x}{2}$, $\\cos^2 x = \\frac{1+\\cos 2x}{2}$ — dùng để tích phân.
3. **Tích ↔ tổng**: cho giải PT.
4. **$a\\cdot\\sin x + b\\cdot\\cos x = \\sqrt{a^2+b^2}\\cdot\\sin(x + \\varphi)$** — tổng hợp dao động.
`;
