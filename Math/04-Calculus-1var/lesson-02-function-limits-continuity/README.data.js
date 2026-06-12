// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-02-function-limits-continuity/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Giới hạn hàm & Liên tục

## Mục tiêu

- Hiểu **giới hạn hàm số** $\\lim_{x \\to a} f(x)$.
- Giới hạn 1 bên (trái, phải) và giới hạn 2 bên.
- Định nghĩa **hàm liên tục** tại 1 điểm và trên 1 khoảng.
- Phân loại điểm gián đoạn.
- Định lý giá trị trung gian (IVT).

## Kiến thức tiền đề

- [Lesson 01 — Giới hạn dãy](../lesson-01-sequences-limits/).

---

## 1. Giới hạn hàm số

💡 **Là gì**: $\\lim_{x \\to a} f(x) = L$ có nghĩa **khi $x$ càng gần $a$, $f(x)$ càng gần $L$**.

💡 **Trực giác cốt lõi — "tiến tới mà không cần chạm"**: tưởng tượng bạn lái xe trên một con đường (đồ thị $y = f(x)$) hướng về cột mốc tại $x = a$. Câu hỏi của giới hạn **không** phải "có cái gì ngay tại cột mốc?" mà là "khi tôi tiến sát cột mốc, độ cao của con đường đang **nhắm tới** giá trị nào?". Bạn có thể không bao giờ tới đúng cột mốc (đường có thể bị đào hố ngay tại đó — $f(a)$ không xác định), hoặc tại cột mốc có một biển báo lẻ treo lơ lửng ở độ cao khác ($f(a) \\neq L$) — cả hai đều **không** ảnh hưởng tới "độ cao đang nhắm tới". Giới hạn chỉ đọc **xu hướng của lân cận**, không đọc giá trị tại điểm.

Cụ thể hơn, "tiến tới mà không cần chạm" thể hiện ngay trong ký hiệu $0 < |x - a|$ của định nghĩa hình thức bên dưới: dấu $0 <$ cố ý **loại trừ** $x = a$. Ta lấy thông tin từ mọi điểm sát $a$, trừ đúng $a$.

⚠ **Quan trọng**: Giá trị tại $x = a$ **không quan trọng** (có thể $f(a)$ không xác định, hoặc khác $L$). Chỉ quan tâm "xung quanh $a$".

**Bảng tiến gần (numerical approach) cho $\\lim_{x \\to 1} \\frac{x^2-1}{x-1}$** — thấy tận mắt "tiến tới mà không chạm":

| $x$ (trái) | $f(x)$ | | $x$ (phải) | $f(x)$ |
|-----------|--------|---|-----------|--------|
| $0.9$ | $1.9$ | | $1.1$ | $2.1$ |
| $0.99$ | $1.99$ | | $1.01$ | $2.01$ |
| $0.999$ | $1.999$ | | $1.001$ | $2.001$ |
| $0.9999$ | $1.9999$ | | $1.0001$ | $2.0001$ |
| $1$ | **không xác định** | | $1$ | **không xác định** |

Hai cột cùng ép $f(x)$ về **2** — dù ngay tại $x = 1$ hàm "thủng lỗ". Đó chính là $\\lim_{x \\to 1} f(x) = 2$.

ASCII đồ thị (lỗ trống tại $x = 1$, ký hiệu \`o\` = điểm bị khoét):

\`\`\`
 f(x)
  3 |                          /
    |                       /
  2 |- - - - - - - - - - o          <- lim = 2, nhưng f(1) không tồn tại
    |                 / :
  1 |              /    :
    |           /       :
  0 +--------------------+---------- x
    0       0.5     1   (a=1)   1.5
\`\`\`

**Ví dụ kinh điển**: $f(x) = \\frac{x^2 - 1}{x - 1}$ khi $x \\to 1$.
- Tại $x = 1$: $f(1) = \\frac{0}{0} =$ không xác định!
- Nhưng $x \\neq 1$: $f(x) = \\frac{(x-1)(x+1)}{x-1} = x + 1$.
- $\\lim_{x \\to 1} f(x) = 1 + 1 =$ **2**.

⟶ Giới hạn tồn tại dù $f$ không xác định tại $a$.

### Định nghĩa hình thức ($\\varepsilon$-$\\delta$, Cauchy 1820)

$$\\lim_{x \\to a} f(x) = L \\iff \\forall \\varepsilon > 0,\\ \\exists \\delta > 0,\\ \\forall x: 0 < |x - a| < \\delta \\implies |f(x) - L| < \\varepsilon$$

💡 Đọc: "Cho dù sai số $\\varepsilon$ đòi nhỏ thế nào, có khoảng $(a-\\delta, a+\\delta)$ (trừ chính $a$) làm cho $f$ rơi vào khoảng $(L-\\varepsilon, L+\\varepsilon)$".

> 📐 **Định nghĩa đầy đủ — Liên tục tại $a$**
>
> **(a) Là gì**: Hàm $f$ liên tục tại $a$ khi và chỉ khi **3 điều** đồng thời đúng: (1) $f(a)$ xác định, (2) $\\lim_{x \\to a} f(x)$ tồn tại, (3) chúng bằng nhau: $\\lim = f(a)$. Đồ thị "vẽ được không nhấc bút" qua điểm $a$.
>
> **(b) Vì sao cần**: Liên tục là điều kiện đảm bảo các tính chất "đẹp" — IVT (PT có nghiệm khi đổi dấu), định lý cực trị (đạt min/max trên đoạn đóng), tích phân được. Hàm liên tục là **vật liệu tốt** của Giải tích. Mọi hàm "tự nhiên" (đa thức, $\\sin$, $\\cos$, $e^x$, $\\ln x$) đều liên tục trên miền xác định. Gián đoạn là dấu hiệu của "biến động đột ngột" — vd nhiệt độ thay đổi pha (đá → nước), điện áp on/off.
>
> **(c) Ví dụ số**: $f(x) = x^2$ liên tục tại 2: $f(2) = 4$, $\\lim_{x \\to 2} x^2 = 4$, khớp ✓. $f(x) = \\frac{x^2-1}{x-1}$ **gián đoạn bỏ được** tại 1: $f(1)$ chưa định nghĩa, nhưng $\\lim = 2 \\to$ sửa $f(1)=2$ thì liên tục. $f(x) = \\frac{1}{x}$ **gián đoạn vô hạn** tại 0: $\\lim$ trái $= -\\infty$, $\\lim$ phải $= +\\infty$. $f(x) = \\lfloor x \\rfloor$ (sàn) **gián đoạn nhảy** tại mọi số nguyên: $f(2^-) = 1$, $f(2^+) = 2$.

**4 ví dụ số đa dạng cho $\\lim_{x \\to a} f(x)$** (đủ các "kiểu" gặp được):
- Hàm liên tục thường (thay trực tiếp): $\\lim_{x \\to 3} (2x+1) = 7$. Verify: $x = 2.99 \\to 6.98$, $x = 3.01 \\to 7.02$ — kẹp về 7.
- Dạng $\\frac{0}{0}$ rút gọn được: $\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = \\lim(x+2) = 4$. Verify: $x = 1.999 \\to 3.999$, $x = 2.001 \\to 4.001$.
- Giới hạn không tồn tại (hai bên lệch): $\\lim_{x \\to 0} \\frac{|x|}{x}$ — trái $= -1$, phải $= +1 \\to$ không tồn tại.
- Giới hạn tại điểm hàm xác định nhưng lệch giá trị: $f(x) = 1$ mọi $x \\neq 0$, $f(0) = 5 \\to \\lim_{x \\to 0} f = 1 \\neq f(0)$.

**Một cái bẫy thực sự — bảng giá trị có thể lừa**: với $f(x) = \\sin\\!\\left(\\frac{1}{x}\\right)$ khi $x \\to 0$, nếu bạn lập bảng tại $x = \\frac{1}{\\pi}, \\frac{1}{2\\pi}, \\frac{1}{3\\pi}, \\dots$ thì $f$ luôn $= 0$ → tưởng $\\lim = 0$. Nhưng tại $x = \\frac{1}{\\pi/2 + 2k\\pi}$ thì $f = 1$, và tại $x = \\frac{1}{-\\pi/2 + 2k\\pi}$ thì $f = -1$. Hàm dao động **vô số lần** càng gần 0 càng nhanh → $\\lim_{x \\to 0} \\sin(1/x)$ **không tồn tại**. Bài học: bảng số là **gợi ý**, không phải chứng minh; chỉ định nghĩa $\\varepsilon$-$\\delta$ hoặc quy tắc đại số mới chắc chắn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu chỉ quan tâm 'xung quanh $a$', sao không thay luôn $x = a$ vào?"* Với hàm liên tục thì thay được (đó chính là định nghĩa liên tục). Nhưng khi gặp $\\frac{0}{0}$ (như $\\frac{x^2-1}{x-1}$ tại 1), thay trực tiếp ra vô nghĩa — phải rút gọn rồi mới thay. Giới hạn là công cụ xử lý đúng những chỗ "thay không được".
- *"$\\delta$ phụ thuộc vào gì?"* Phụ thuộc cả $\\varepsilon$ lẫn điểm $a$. $\\varepsilon$ đòi nhỏ hơn → $\\delta$ thường phải nhỏ hơn. Giống $\\varepsilon$-N của dãy: trật tự "$\\forall \\varepsilon, \\exists \\delta$" cho phép $\\delta$ co theo $\\varepsilon$.

⚠ **Lỗi thường gặp — tưởng $\\lim_{x \\to a} f(x) = f(a)$ luôn đúng**. Sai cho hàm gián đoạn. Phản ví dụ: $f(x) = \\frac{x^2-1}{x-1}$ có $f(1)$ không xác định nhưng $\\lim = 2$; hay $f(x) = \\lfloor x \\rfloor$ có $f(2) = 2$ nhưng $\\lim_{x \\to 2^-} = 1$. Thay trực tiếp chỉ hợp lệ khi đã biết hàm liên tục tại đó.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1} = ?$
2. Giá trị $f(2)$ có ảnh hưởng tới $\\lim_{x \\to 2} f(x)$ không?

<details><summary>Đáp án</summary>

1. $x^3-1 = (x-1)(x^2+x+1) \\to$ rút gọn còn $x^2+x+1 \\to$ thay $x=1 \\to 3$.
2. Không. Giới hạn chỉ phụ thuộc giá trị $f$ ở **lân cận** $a$, không phụ thuộc $f(a)$.

</details>

### 📝 Tóm tắt mục 1

- $\\lim_{x \\to a} f(x) = L$: $f(x)$ gần $L$ tùy ý khi $x$ gần $a$ — **không quan tâm $f(a)$**.
- Định nghĩa $\\varepsilon$-$\\delta$: $\\forall \\varepsilon > 0, \\exists \\delta > 0, 0 < |x-a| < \\delta \\implies |f(x)-L| < \\varepsilon$.
- Gặp $\\frac{0}{0}$: rút gọn/nhân liên hợp trước rồi mới thay.

---

## 2. Giới hạn 1 bên

**Giới hạn trái**: $\\lim_{x \\to a^-} f(x)$ — $x$ tiến $a$ từ phía nhỏ hơn.

**Giới hạn phải**: $\\lim_{x \\to a^+} f(x)$ — $x$ tiến $a$ từ phía lớn hơn.

**Định lý**: Giới hạn 2 bên tồn tại $\\iff$ 2 giới hạn 1 bên tồn tại và **bằng nhau**.

**Ví dụ**: $f(x) = \\frac{|x|}{x}$. Khi $x \\to 0$:
- $x < 0$: $f = -1 \\to \\lim$ trái $= -1$.
- $x > 0$: $f = 1 \\to \\lim$ phải $= 1$.
- Khác nhau → **$\\lim$ 2 bên KHÔNG tồn tại**.

ASCII đồ thị hàm dấu $\\frac{|x|}{x}$ (nhảy tại 0, hai bên lệch):

\`\`\`
 f(x)
  +1 |          o========   (x > 0: f = +1)
     |
   0 +----------+--------- x
     |          : a=0
  -1 |======o   :          (x < 0: f = -1)
\`\`\`

Hai mép \`o\` ở hai độ cao khác nhau → không có giá trị duy nhất để "tiến tới" → giới hạn hai bên DNE.

💡 **Trực giác**: tưởng tượng đi bộ trên đồ thị tiến về điểm $x = a$. Đi từ bên trái thấy hàm dẫn về giá trị nào ($\\lim$ trái), đi từ bên phải thấy dẫn về đâu ($\\lim$ phải). Chỉ khi hai lối đi gặp nhau ở cùng một điểm thì mới có giới hạn hai bên.

**3 ví dụ walk-through giới hạn một bên**:
- Hàm chia khúc: $f(x) = \\begin{cases} x^2 & x < 1 \\\\ x+3 & x \\ge 1 \\end{cases}$. $\\lim_{x \\to 1^-} = 1^2 = 1$; $\\lim_{x \\to 1^+} = 1+3 = 4$. Lệch → $\\lim_{x \\to 1}$ DNE.
- Biên miền xác định: $f(x) = \\sqrt{x}$ tại $x = 0$. Bên trái $x < 0$ không xác định (không lấy căn số âm) → chỉ có $\\lim_{x \\to 0^+} \\sqrt{x} = 0$. Đây là giới hạn một bên "tự nhiên" — không phải lỗi.
- Tiệm cận đứng lệch dấu: $f(x) = \\frac{1}{x}$. $\\lim_{x \\to 0^-} = -\\infty$, $\\lim_{x \\to 0^+} = +\\infty$. Hai bên bay về hai vô cực khác → $\\lim_{x \\to 0} \\frac{1}{x}$ DNE.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào bắt buộc xét 1 bên?"* Khi hàm "đổi công thức" qua $a$ (hàm chia khúc), có giá trị tuyệt đối quanh $a$, hoặc $a$ là biên miền xác định (vd $\\sqrt{x}$ tại $x = 0$ chỉ có $\\lim$ phải). Hàm trơn thông thường thì hai bên tự khớp.
- *"Hàm sàn $\\lfloor x \\rfloor$ tại $x = 2$ có giới hạn không?"* Không. $\\lim$ trái $= 1$ (các giá trị ngay dưới 2 như $1.99$ cho $\\lfloor \\cdot \\rfloor = 1$), $\\lim$ phải $= 2$. Lệch → không tồn tại giới hạn hai bên.

⚠ **Lỗi thường gặp — kết luận có giới hạn khi mới xét 1 bên**. Tính $\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty$ rồi vội nói "$\\lim = +\\infty$" là sai: $\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty$. Hai bên lệch → giới hạn hai bên KHÔNG tồn tại. Luôn kiểm tra cả hai phía ở điểm nghi ngờ.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$ với $x < 1$, $f(x) = x + 3$ với $x \\ge 1$. $\\lim_{x \\to 1} f(x)$ có tồn tại không?
2. $\\lim_{x \\to 0^-} \\frac{|x|}{x} = ?$

<details><summary>Đáp án</summary>

1. $\\lim$ trái $= 1^2 = 1$, $\\lim$ phải $= 1+3 = 4$. Lệch → **không tồn tại**.
2. Với $x < 0$, $|x| = -x \\to \\frac{|x|}{x} = -1$. $\\lim$ trái $= -1$.

</details>

### 📝 Tóm tắt mục 2

- $\\lim$ trái $\\lim_{x \\to a^-}$ (tiến từ phía nhỏ), $\\lim$ phải $\\lim_{x \\to a^+}$ (tiến từ phía lớn).
- Giới hạn hai bên tồn tại $\\iff$ hai $\\lim$ một bên tồn tại **và bằng nhau**.
- Bắt buộc xét một bên ở: hàm chia khúc, $|\\cdot|$, biên miền xác định.

---

## 3. Giới hạn vô hạn / vô cùng

- **$\\lim f(x) = \\infty$**: $f$ tăng vô hạn khi $x \\to a$. VD $\\lim_{x \\to 0} \\frac{1}{x^2} = +\\infty$.
- **$\\lim_{x \\to \\infty} f(x) = L$**: $x$ ra vô cùng, $f$ tiến $L$. VD $\\lim_{x \\to \\infty} \\frac{1}{x} = 0$.

💡 **Trực giác — phân biệt hai loại "vô cùng"**: $\\lim = \\infty$ (giá trị hàm bay lên trời, tiệm cận **đứng**) khác $\\lim_{x \\to \\infty}$ (biến bay ra xa, xét tiệm cận **ngang**). Đừng lẫn "hàm ra vô cực" với "biến ra vô cực".

**Walk-through giới hạn ∞ — chia cho lũy thừa lớn nhất**: $\\lim_{x \\to \\infty} \\frac{3x^2 + 2x}{x^2 - 5}$ là dạng vô định $\\frac{\\infty}{\\infty}$. Chia cả tử và mẫu cho $x^2$ (lũy thừa cao nhất):

$$\\frac{3x^2 + 2x}{x^2 - 5} = \\frac{3 + \\dfrac{2}{x}}{1 - \\dfrac{5}{x^2}} \\xrightarrow{x \\to \\infty} \\frac{3 + 0}{1 - 0} = 3$$

Verify số: $x = 100 \\to \\frac{30200}{9995} \\approx 3.022$; $x = 1000 \\to \\approx 3.002$ — tiến về 3 ✓.

**Quy tắc nhanh cho thương đa thức $\\frac{P(x)}{Q(x)}$ tại $x \\to \\infty$** (bậc tử $m$, bậc mẫu $n$):

$$\\lim_{x \\to \\infty} \\frac{P(x)}{Q(x)} = \\begin{cases} 0 & m < n \\ (\\text{mẫu trội}) \\\\[4pt] \\dfrac{\\text{hệ số đầu } P}{\\text{hệ số đầu } Q} & m = n \\\\[4pt] \\pm\\infty & m > n \\ (\\text{tử trội}) \\end{cases}$$

Verify 3 trường hợp:
- $m < n$: $\\lim_{x \\to \\infty} \\frac{x+1}{x^2+3} = 0$. Check $x = 1000 \\to \\frac{1001}{1000003} \\approx 0.001 \\to 0$ ✓.
- $m = n$: $\\lim_{x \\to \\infty} \\frac{2x^3+x}{5x^3-7} = \\frac{2}{5}$. Check $x = 1000 \\to \\approx 0.4$ ✓.
- $m > n$: $\\lim_{x \\to \\infty} \\frac{x^2+1}{x-1} = +\\infty$. Check $x = 1000 \\to \\approx 1001$, tăng vô hạn ✓.

⚠ **Cẩn thận dấu khi $x \\to -\\infty$ với lũy thừa lẻ**: $\\lim_{x \\to -\\infty} x^3 = -\\infty$ (không phải $+\\infty$). Và với căn: $\\sqrt{x^2} = |x| = -x$ khi $x < 0$ — sai dấu này là lỗi kinh điển khi xử lý $\\frac{\\sqrt{x^2+1}}{x}$ tại $-\\infty$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\lim = \\infty$ có phải là 'giới hạn tồn tại' không?"* Theo nghĩa chặt (giới hạn hữu hạn) thì KHÔNG — ta nói "giới hạn vô cực" như một mô tả hành vi, không phải một số. Khi viết $\\lim_{x \\to 0} \\frac{1}{x^2} = +\\infty$ ta đang nói "hàm tăng vô hạn", đây là cách diễn đạt được chấp nhận.
- *"Làm sao tính $\\lim_{x \\to \\infty}$ của hàm hữu tỉ nhanh?"* So bậc tử/mẫu: bậc tử < mẫu → 0; bằng nhau → tỉ số hệ số đầu; tử > mẫu → $\\pm\\infty$. Vd $\\lim_{x \\to \\infty} \\frac{3x^2+1}{x^2+5} = \\frac{3}{1} = 3$.

⚠ **Lỗi thường gặp — nhầm tiệm cận đứng với ngang**. $\\frac{1}{x}$: tại $x \\to 0$ ra $\\pm\\infty$ (tiệm cận **đứng** $x = 0$); tại $x \\to \\infty$ ra $0$ (tiệm cận **ngang** $y = 0$). Hai câu hỏi hoàn toàn khác nhau, đừng trộn lẫn.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to \\infty} \\frac{2x^3 + x}{5x^3 - 1} = ?$
2. $\\lim_{x \\to 0} \\frac{1}{x^2} = ?$ (cẩn thận hai bên)

<details><summary>Đáp án</summary>

1. Cùng bậc 3 → tỉ số hệ số đầu $= \\frac{2}{5}$.
2. $+\\infty$ cả hai bên (vì $x^2 > 0$ luôn → khác $\\frac{1}{x}$). Ở đây nói $\\lim = +\\infty$ hợp lệ vì hai bên khớp.

</details>

### 📝 Tóm tắt mục 3

- $\\lim = \\infty$: hàm tăng/giảm vô hạn tại điểm $a$ → tiệm cận **đứng**.
- $\\lim_{x \\to \\infty} = L$: biến ra vô cực, hàm tiến $L$ → tiệm cận **ngang**.
- Hàm hữu tỉ tại vô cực: so bậc tử/mẫu để có kết quả nhanh.

---

## 4. Quy tắc tính giới hạn hàm

Tương tự dãy: $\\lim(f+g) = \\lim f + \\lim g$, ... (khi cả 2 tồn tại).

Giả sử $\\lim_{x \\to a} f = L$ và $\\lim_{x \\to a} g = M$ đều là số thực. Khi đó:

| Quy tắc | Phát biểu |
|---------|-----------|
| Tổng / Hiệu | $\\lim (f \\pm g) = L \\pm M$ |
| Hằng số | $\\lim (c \\cdot f) = c \\cdot L$ |
| Tích | $\\lim (f \\cdot g) = L \\cdot M$ |
| Thương | $\\lim (f / g) = L / M$, **miễn $M \\neq 0$** |
| Lũy thừa | $\\lim f^n = L^n$ ($n$ nguyên dương) |
| Hợp | nếu $g$ liên tục tại $L$ thì $\\lim g(f(x)) = g(L)$ |

**Walk-through kết hợp**: $\\lim_{x \\to 2} \\frac{x^2 + 3x}{x+1}$ — tách từng mảnh: $\\lim x^2 = 4$, $\\lim 3x = 6$, nên $\\lim(x^2+3x) = 10$ (quy tắc tổng); $\\lim(x+1) = 3 \\neq 0$, dùng quy tắc thương → $\\frac{10}{3}$. Khớp thay số trực tiếp $\\frac{4+6}{3} = \\frac{10}{3}$ ✓.

**Định lý kẹp (squeeze theorem)** — vũ khí cho hàm dao động: nếu $g(x) \\le f(x) \\le h(x)$ quanh $a$ và $\\lim g = \\lim h = L$ thì $\\lim f = L$. Ví dụ $\\lim_{x \\to 0} x^2 \\sin(1/x)$: vì $-1 \\le \\sin(1/x) \\le 1$ nên $-x^2 \\le x^2 \\sin(1/x) \\le x^2$; hai mép cùng $\\to 0$ → kẹp được $\\lim = 0$ (dù $\\sin(1/x)$ dao động điên cuồng).

**Dạng không xác định** (giống dãy): $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0 \\cdot \\infty$, $1^\\infty$...

### Mẹo giải $\\frac{0}{0}$

- Phân tích nhân tử (như VD trên).
- Liên hợp (cho căn).
- $\\frac{\\sin x}{x} = 1$.

💡 **Trực giác — vì sao có $\\frac{0}{0}$ mà vẫn ra số hữu hạn**: $\\frac{0}{0}$ không có nghĩa "tử và mẫu đều bằng 0" mà là "cả hai cùng tiến về 0". Tốc độ tiến về 0 của tử so với mẫu quyết định kết quả. Như cuộc đua hai vận động viên cùng về đích: ai nhanh hơn (gấp mấy lần) mới là câu trả lời.

#### Kỹ thuật 1 — phân tích nhân tử (walk-through 4 ví dụ)

Khi tử/mẫu là **đa thức** và cùng triệt tiêu tại $x = a$, chúng đều có nhân tử $(x - a)$. Rút gọn rồi mới thay:

- $\\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim \\frac{(x-1)(x+1)}{x-1} = \\lim (x+1) = 2$.
- $\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = \\lim (x+2) = 4$.
- $\\lim_{x \\to 3} \\frac{x^2-5x+6}{x-3} = \\lim \\frac{(x-2)(x-3)}{x-3} = \\lim (x-2) = 1$.
- $\\lim_{x \\to 1} \\frac{x^3-1}{x-1} = \\lim \\frac{(x-1)(x^2+x+1)}{x-1} = \\lim (x^2+x+1) = 3$.

Tổng quát đẹp: $\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n \\cdot a^{n-1}$ — đây chính là đạo hàm của $x^n$ (sẽ gặp ở [Lesson 03](../lesson-03-derivative-definition/)).

#### Kỹ thuật 2 — nhân lượng liên hợp (rationalize, walk-through 4 ví dụ)

Khi có **căn** $\\sqrt{\\dots}$, nhân tử và mẫu với "lượng liên hợp" để biến hiệu căn thành hiệu bình phương ($(\\sqrt{A}-B)(\\sqrt{A}+B) = A - B^2$):

$$\\begin{aligned}
\\lim_{x \\to 0} \\frac{\\sqrt{x+1}-1}{x}
&= \\lim_{x \\to 0} \\frac{(\\sqrt{x+1}-1)(\\sqrt{x+1}+1)}{x(\\sqrt{x+1}+1)} \\\\[4pt]
&= \\lim_{x \\to 0} \\frac{(x+1)-1}{x(\\sqrt{x+1}+1)}
= \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x+1}+1)} \\\\[4pt]
&= \\lim_{x \\to 0} \\frac{1}{\\sqrt{x+1}+1} = \\frac{1}{2}
\\end{aligned}$$

Verify số: $x = 0.01 \\to \\frac{\\sqrt{1.01}-1}{0.01} \\approx 0.4988$; $x = 0.001 \\to \\approx 0.4999 \\to 0.5$ ✓.

Thêm 3 ví dụ liên hợp:
- $\\lim_{x \\to 4} \\frac{\\sqrt{x}-2}{x-4} = \\lim \\frac{x-4}{(x-4)(\\sqrt{x}+2)} = \\lim \\frac{1}{\\sqrt{x}+2} = \\frac{1}{4}$.
- $\\lim_{x \\to 0} \\frac{x}{\\sqrt{x+9}-3} = \\lim \\frac{x(\\sqrt{x+9}+3)}{(x+9)-9} = \\lim (\\sqrt{x+9}+3) = 6$.
- $\\lim_{x \\to 1} \\frac{x-1}{\\sqrt{x}-1} = \\lim \\frac{(x-1)(\\sqrt{x}+1)}{x-1} = \\lim (\\sqrt{x}+1) = 2$.

#### Kỹ thuật 3 — giới hạn đặc biệt $\\dfrac{\\sin x}{x} = 1$

💡 Với $x$ nhỏ (radian), $\\sin x \\approx x$. Bảng kiểm:

| $x$ | $\\sin x$ | $\\sin x / x$ |
|-----|---------|-------------|
| $1$ | $0.84147$ | $0.84147$ |
| $0.1$ | $0.09983$ | $0.99833$ |
| $0.01$ | $0.00999983$ | $0.99998$ |
| $0.001$ | $0.0009999998$ | $0.99999983$ |

**Chứng minh từng bước (định lý kẹp)** — trên đường tròn đơn vị, với $x \\in (0, \\frac{\\pi}{2})$, so diện tích:

$$\\begin{aligned}
&\\text{tam giác nhỏ} < \\text{hình quạt} < \\text{tam giác lớn} \\\\[4pt]
&\\tfrac{1}{2}\\sin x < \\tfrac{1}{2}x < \\tfrac{1}{2}\\tan x \\\\[4pt]
&\\sin x < x < \\frac{\\sin x}{\\cos x}
\\end{aligned}$$

Chia ba vế cho $\\sin x > 0$ rồi lật ngược (đảo dấu bất đẳng thức):

$$\\cos x < \\frac{\\sin x}{x} < 1$$

Khi $x \\to 0^+$, $\\cos x \\to 1$, hai mép kẹp $\\frac{\\sin x}{x}$ về 1. Hàm $\\frac{\\sin x}{x}$ chẵn nên phía âm cũng vậy. Kết luận $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.

Áp dụng nhanh: $\\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} 3 \\cdot \\frac{\\sin 3x}{3x} = 3 \\cdot 1 = 3$ (đặt $u = 3x$).

#### Kỹ thuật 4 — giới hạn đặc biệt $\\dfrac{e^x - 1}{x} = 1$

$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$$

Verify số: $x = 0.001 \\to \\frac{e^{0.001}-1}{0.001} = \\frac{0.0010005}{0.001} \\approx 1.0005 \\to 1$; $x = -0.001 \\to \\approx 0.9995 \\to 1$. Đây là đạo hàm của $e^x$ tại 0 (sẽ chứng minh kỹ ở Lesson về đạo hàm). Họ hàng: $\\lim_{x \\to 0} \\frac{1-\\cos x}{x^2} = \\frac{1}{2}$ (verify: $x = 0.1 \\to \\frac{1-0.995004}{0.01} = 0.4996 \\approx 0.5$).

⚠ **Vòng lặp logic cấm**: KHÔNG dùng L'Hôpital để chứng minh $\\frac{\\sin x}{x} \\to 1$ — vì L'Hôpital cần $(\\sin x)' = \\cos x$, mà điều đó lại cần chính giới hạn này. Phải chứng minh bằng hình học/kẹp như trên.

**Verify mẹo bằng số** — $\\lim_{x \\to 1} \\frac{x^2-1}{x-1} = 2$:
- Thay gần: $x = 1.001 \\to \\frac{1.002001 - 1}{0.001} = \\frac{0.002001}{0.001} = 2.001 \\to$ tiến 2 ✓.
- Phân tích: $\\frac{(x-1)(x+1)}{x-1} = x+1 \\to 2$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng nhân liên hợp thay vì phân tích nhân tử?"* Khi biểu thức có **căn**. Vd $\\lim_{x \\to 0} \\frac{\\sqrt{x+1}-1}{x}$: nhân tử/mẫu với $\\sqrt{x+1}+1 \\to$ tử thành $(x+1)-1 = x \\to$ rút gọn $x \\to \\frac{1}{\\sqrt{x+1}+1} \\to \\frac{1}{2}$.
- *"$\\frac{0}{0}$ luôn ra số hữu hạn?"* Không. Có thể ra số ($\\frac{x^2-1}{x-1} \\to 2$), ra $\\infty$ ($\\frac{x}{x^2} = \\frac{1}{x} \\to \\infty$ khi $x \\to 0$), hoặc không tồn tại. Vì thế nó là dạng **vô định** — phải biến đổi mới biết.

⚠ **Lỗi thường gặp — kết luận $\\frac{0}{0} = 1$ hoặc $\\frac{0}{0} = 0$**. Phản ví dụ ngay: $\\lim_{x \\to 0} \\frac{2x}{x} = 2$ (không phải 1 hay 0), $\\lim_{x \\to 0} \\frac{x^2}{x} = 0$, $\\lim_{x \\to 0} \\frac{x}{x^2} = \\infty$. Ba kết quả khác nhau cho cùng dạng $\\frac{0}{0} \\to$ bắt buộc biến đổi.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = ?$
2. $\\lim_{x \\to 0} \\frac{\\sqrt{4+x} - 2}{x} = ?$

<details><summary>Đáp án</summary>

1. $\\frac{(x-3)(x+3)}{x-3} = x+3 \\to 6$.
2. Nhân liên hợp $\\sqrt{4+x}+2$: tử $\\to (4+x)-4 = x \\to \\frac{1}{\\sqrt{4+x}+2} \\to \\frac{1}{4}$.

</details>

### 📝 Tóm tắt mục 4

- $\\lim$ phân phối qua $+, -, \\cdot, /$ khi cả hai tồn tại (thương cần mẫu $\\neq 0$).
- $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$... là **vô định** — phải biến đổi (nhân tử, liên hợp, $\\frac{\\sin x}{x}$).
- Cùng dạng $\\frac{0}{0}$ có thể ra số, $\\infty$, hoặc không tồn tại tùy biểu thức.

---

## 5. Hàm liên tục

💡 **Trực giác**: Hàm liên tục là hàm "vẽ được không nhấc bút" — không có nhảy, không có lỗ.

**Định nghĩa hình thức**: $f$ liên tục tại $a$ nếu:

$$\\lim_{x \\to a} f(x) = f(a)$$

**3 điều kiện**:
1. $f(a)$ xác định.
2. $\\lim_{x \\to a} f(x)$ tồn tại.
3. Bằng nhau: $\\lim = f(a)$.

⟶ Nếu thiếu 1 trong 3 → **gián đoạn**.

#### Quy trình kiểm tra 3 điều kiện — walk-through ≥3 ví dụ

Mỗi điều kiện bịt một loại "vỡ": (1) có lỗ trống không, (2) có nhảy/dao động không, (3) giá trị thật có khớp xu hướng không. Kiểm theo thứ tự:

**Ví dụ A — liên tục**: $f(x) = x^2 + 1$ tại $a = 3$.
1. $f(3) = 10$ → xác định ✓.
2. $\\lim_{x \\to 3} (x^2+1) = 10$ → tồn tại ✓.
3. $10 = 10$ → khớp ✓. **Kết luận: liên tục** (phân loại: không gián đoạn).

**Ví dụ B — gián đoạn bỏ được** (vi phạm (3)): $f(x) = \\begin{cases} \\frac{x^2-9}{x-3} & x \\ne 3 \\\\ 1 & x = 3 \\end{cases}$ tại $a = 3$.
1. $f(3) = 1$ → xác định ✓.
2. $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = \\lim (x+3) = 6$ → tồn tại ✓.
3. $6 \\ne 1$ → **vi phạm**. Gián đoạn **bỏ được** — sửa $f(3) = 6$ thì liên tục.

**Ví dụ C — gián đoạn nhảy** (vi phạm (2)): $f(x) = \\begin{cases} x^2 & x \\le 1 \\\\ 2x & x > 1 \\end{cases}$ tại $a = 1$.
1. $f(1) = 1^2 = 1$ → xác định ✓.
2. $\\lim_{x \\to 1^-} = 1$, $\\lim_{x \\to 1^+} = 2 \\cdot 1 = 2$. Hai bên lệch → giới hạn **không tồn tại** → **vi phạm (2)**. Gián đoạn **nhảy** (jump), bước nhảy $= 2 - 1 = 1$.

**Ví dụ D — gián đoạn vô hạn** (vi phạm (1) và (2)): $f(x) = \\frac{1}{x-2}$ tại $a = 2$.
1. $f(2)$ → chia 0, **không xác định** → vi phạm (1).
2. $\\lim_{x \\to 2^-} = -\\infty$, $\\lim_{x \\to 2^+} = +\\infty$ → DNE → vi phạm (2). Gián đoạn **vô hạn** (tiệm cận đứng $x = 2$).

**4 ví dụ số đa dạng**:
- Liên tục: $f(x) = x^2$ tại $a = 2$: $f(2) = 4 = \\lim_{x \\to 2} x^2$ ✓.
- Gián đoạn (lỗ): $f(x) = \\frac{x^2-1}{x-1}$ tại $1$: $f(1)$ không xác định → vi phạm điều kiện (1).
- Gián đoạn (giá trị lệch): $f(x) = x+1$ nếu $x \\neq 1$, $f(1) = 5 \\to \\lim = 2 \\neq 5 = f(1) \\to$ vi phạm (3).
- Gián đoạn ($\\lim$ không tồn tại): $f(x) = \\frac{|x|}{x}$ tại $0 \\to$ vi phạm (2) (hai bên lệch).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Liên tục tại 1 điểm khác liên tục trên 1 khoảng thế nào?"* Liên tục trên $(a,b)$ nghĩa là liên tục tại **mọi** điểm trong khoảng. Một hàm có thể liên tục khắp nơi trừ vài điểm (vd $\\frac{1}{x}$ liên tục mọi nơi trừ $0$).
- *"Vì sao cần đủ cả 3 điều kiện?"* Vì mỗi điều kiện bịt một loại "vỡ": (1) hàm phải có giá trị tại đó (không có lỗ trống), (2) phải có xu hướng rõ ràng (không nhảy/dao động), (3) giá trị thật phải khớp xu hướng (không "lệch điểm"). Thiếu bất kỳ điều nào → vẽ phải nhấc bút.

⚠ **Lỗi thường gặp — chỉ kiểm $f(a)$ xác định rồi kết luận liên tục**. $f(x) = \\lfloor x \\rfloor$ có $f(2) = 2$ (xác định) nhưng vẫn gián đoạn tại 2 vì $\\lim$ không tồn tại. Phải kiểm đủ **cả ba** điều kiện, không chỉ điều kiện (1).

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = \\frac{x-2}{x-2}$ với $x \\neq 2$, không định nghĩa tại 2. Liên tục tại 2 không?
2. $f(x) = x^2$ nếu $x \\le 1$, $f(x) = 2x$ nếu $x > 1$. Liên tục tại 1?

<details><summary>Đáp án</summary>

1. Không (vi phạm điều kiện 1 — $f(2)$ không tồn tại), dù $\\lim = 1$. Đây là gián đoạn **bỏ được**.
2. $\\lim$ trái $= 1$, $\\lim$ phải $= 2$, $f(1) = 1$. $\\lim$ hai bên lệch → **gián đoạn nhảy**, không liên tục.

</details>

### 📝 Tóm tắt mục 5

- Liên tục tại $a$ $\\iff$ đủ 3 điều: $f(a)$ xác định, $\\lim_{x \\to a} f$ tồn tại, hai cái bằng nhau.
- Liên tục trên khoảng = liên tục tại mọi điểm trong khoảng.
- Thiếu bất kỳ điều kiện nào → gián đoạn (phải kiểm cả ba).

---

## 6. Phân loại điểm gián đoạn

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Bỏ được** (removable) | $\\lim$ tồn tại nhưng $\\neq f(a)$ hoặc $f(a)$ chưa định nghĩa | $f(x) = \\frac{x^2-1}{x-1}$ tại $x=1$ |
| **Nhảy** (jump) | $\\lim$ trái $\\neq \\lim$ phải, cả 2 hữu hạn | $\\frac{|x|}{x}$ tại 0 |
| **Vô hạn** | $\\lim = \\pm\\infty$ | $\\frac{1}{x}$ tại 0 |

💡 **Bỏ được**: ta có thể "lấp" lỗ bằng cách định nghĩa lại $f(a) = \\lim$.

ASCII đối chiếu 3 loại gián đoạn (ký hiệu \`o\` = lỗ, \`|\` = bay vô hạn):

\`\`\`
 BỎ ĐƯỢC (removable)     NHẢY (jump)            VÔ HẠN (infinite)
   |   o                    |  o====               |   :  |
   |  /                     |                       |   :  |
   | /                      |==o                    |   :  |
   |/                       |                       +---:--+--- x
   +-------                 +--------               |   :
  lim tồn tại,             lim trái ≠ phải,        lim = ±∞,
  chỉ lệch 1 điểm          cả hai hữu hạn          tiệm cận đứng
  -> lấp được             -> KHÔNG lấp được       -> KHÔNG lấp được
\`\`\`

**4 ví dụ phân loại nhanh**:
- $\\frac{x^2-1}{x-1}$ tại 1 → **bỏ được** ($\\lim = 2$ tồn tại, chỉ thiếu $f(1)$).
- $\\frac{\\sin x}{x}$ tại 0 → **bỏ được** ($\\lim = 1$; định nghĩa $f(0)=1$ là liên tục).
- $\\lfloor x \\rfloor$ (hàm sàn) tại $x = 2$ → **nhảy** ($\\lim_{2^-} = 1$, $\\lim_{2^+} = 2$, đều hữu hạn).
- $\\frac{1}{x^2}$ tại 0 → **vô hạn** ($\\lim = +\\infty$ cả hai bên).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'bỏ được' lại tên như vậy?"* Vì chỉ cần định nghĩa lại đúng 1 giá trị $f(a) = \\lim$ là lỗ biến mất, hàm liên tục. Hai loại kia (nhảy, vô hạn) không "lấp" được — $\\lim$ hai bên lệch hoặc bằng $\\infty$, sửa 1 điểm không cứu nổi.
- *"Phân biệt nhảy và vô hạn ra sao?"* Nhảy: cả hai $\\lim$ một bên **hữu hạn** nhưng khác nhau (vd $\\frac{|x|}{x}$ cho $-1$ và $1$). Vô hạn: ít nhất một $\\lim$ một bên $= \\pm\\infty$ (vd $\\frac{1}{x}$ tại 0).

⚠ **Lỗi thường gặp — gọi mọi gián đoạn là 'bỏ được'**. Chỉ gián đoạn bỏ được mới cần $\\lim$ hai bên tồn tại và bằng nhau. $\\frac{1}{x}$ tại 0 là gián đoạn **vô hạn** — không bỏ được; gọi nhầm là bỏ được rồi "lấp" sẽ sai.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = \\frac{\\sin(x)}{x}$ (không định nghĩa tại 0). Loại gián đoạn nào?
2. $f(x) = \\lfloor x \\rfloor$ tại $x = 3$. Loại nào?

<details><summary>Đáp án</summary>

1. **Bỏ được** — $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ tồn tại; định nghĩa $f(0) = 1$ thì liên tục.
2. **Nhảy** — $\\lim$ trái $= 2$, $\\lim$ phải $= 3$, cả hai hữu hạn nhưng lệch.

</details>

### 📝 Tóm tắt mục 6

- 3 loại gián đoạn: bỏ được ($\\lim$ tồn tại nhưng $\\neq f(a)$/$f(a)$ thiếu), nhảy (hai bên hữu hạn lệch), vô hạn ($\\lim = \\pm\\infty$).
- Chỉ **bỏ được** mới "lấp" được bằng cách định nghĩa lại $f(a) = \\lim$.
- Phân biệt nhảy ↔ vô hạn dựa vào $\\lim$ một bên hữu hạn hay vô cực.

---

## 7. Hàm liên tục cơ bản

Các hàm sau **liên tục trên toàn miền xác định**:
- Đa thức (polynomial).
- Hàm hữu tỉ ($\\frac{P(x)}{Q(x)}$) — liên tục mọi nơi trừ $Q = 0$.
- Lượng giác ($\\sin$, $\\cos$ liên tục mọi $\\mathbb{R}$; $\\tan$ liên tục trừ $\\frac{\\pi}{2} + k\\pi$).
- Mũ $a^x$.
- Log $\\log_a x$ (trên $(0, \\infty)$).
- Tổ hợp (cộng, trừ, nhân, chia, hợp) của các hàm liên tục → liên tục.

💡 **Trực giác**: các hàm "đẹp" quen thuộc đều liên tục trên miền của chúng, và ghép chúng lại (cộng/nhân/hợp) vẫn liên tục. Nhờ vậy, để chứng minh một hàm phức tạp như $e^{\\sin x} \\cdot \\ln(x^2+1)$ liên tục, ta chỉ cần nhận ra nó được ghép từ các viên gạch liên tục — không phải kiểm $\\varepsilon$-$\\delta$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\tan x$ liên tục trên toàn $\\mathbb{R}$ không?"* Không. $\\tan x = \\frac{\\sin x}{\\cos x}$ gián đoạn (vô hạn) tại $x = \\frac{\\pi}{2} + k\\pi$ (chỗ $\\cos x = 0$). Nó liên tục trên **miền xác định** (bỏ các điểm đó) — không phải toàn $\\mathbb{R}$.
- *"$\\frac{P(x)}{Q(x)}$ liên tục ở đâu?"* Mọi nơi trừ chỗ $Q(x) = 0$. Vd $\\frac{1}{x^2-1}$ gián đoạn tại $x = \\pm 1$, liên tục ở mọi điểm khác.

⚠ **Lỗi thường gặp — quên loại trừ điểm mẫu bằng 0 / ngoài miền**. Nói "$\\ln x$ liên tục trên $\\mathbb{R}$" là sai — $\\ln x$ chỉ xác định và liên tục trên $(0, \\infty)$. Luôn kèm miền xác định khi phát biểu tính liên tục.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = \\frac{x^2}{x-2}$ gián đoạn tại đâu?
2. $f(x) = \\sqrt{x} + \\cos x$ liên tục trên miền nào?

<details><summary>Đáp án</summary>

1. Tại $x = 2$ (mẫu bằng 0) — gián đoạn vô hạn; liên tục ở mọi điểm khác.
2. Trên $[0, \\infty)$ — $\\sqrt{x}$ chỉ xác định khi $x \\ge 0$, $\\cos x$ liên tục khắp nơi → giao là $[0, \\infty)$.

</details>

### 📝 Tóm tắt mục 7

- Đa thức, mũ, $\\sin/\\cos$ liên tục trên toàn $\\mathbb{R}$; $\\ln x$ trên $(0,\\infty)$; hữu tỉ trừ chỗ mẫu $= 0$; $\\tan x$ trừ $\\frac{\\pi}{2}+k\\pi$.
- Tổ hợp ($+, -, \\cdot, /$, hợp) các hàm liên tục → liên tục (trên miền hợp lệ).
- Luôn kèm **miền xác định** khi nói về tính liên tục.

---

## 8. Định lý giá trị trung gian (IVT)

🎯 **Phát biểu**: Nếu $f$ liên tục trên $[a, b]$ và $y_0$ là số nằm giữa $f(a)$ và $f(b)$, thì $\\exists c \\in [a, b]$ sao cho $f(c) = y_0$.

💡 **Trực giác**: Vẽ đường liền nét từ điểm $A$ đến $B$, không thể "nhảy qua" giá trị trung gian.

### Hệ quả — Định lý Bolzano

Nếu $f$ liên tục trên $[a, b]$ và $f(a) \\cdot f(b) < 0$ (khác dấu), thì **$f(c) = 0$ có nghiệm** trong $(a, b)$.

⟶ Dùng để chứng minh PT có nghiệm mà không cần giải.

ASCII trực giác IVT — đường liền nét đi từ $f(a)$ tới $f(b)$ **buộc** cắt mọi mức $y_0$ ở giữa:

\`\`\`
 f(b) |              .--*
      |          .-'
 y0   |- - - - *  <- IVT đảm bảo có c với f(c) = y0
      |     .-'
 f(a) |--*-'
      +--+-----+----- x
         a  c  b
\`\`\`

**Ví dụ + chứng minh tồn tại nghiệm**: chứng minh $x^3 - x - 1 = 0$ có nghiệm trong $(1, 2)$.
1. Đặt $f(x) = x^3 - x - 1$. $f$ là **đa thức → liên tục** trên $[1, 2]$ (điều kiện IVT/Bolzano thỏa).
2. Tính hai đầu: $f(1) = 1 - 1 - 1 = -1 < 0$; $f(2) = 8 - 2 - 1 = 5 > 0$.
3. $f(1) \\cdot f(2) = (-1)(5) = -5 < 0$ → **đổi dấu**.
4. Theo Bolzano (hệ quả IVT với $y_0 = 0$), $\\exists c \\in (1, 2)$ sao cho $f(c) = 0$. ∎

**Tìm nghiệm bằng chia đôi (bisection) — walk-through 3 bước**: nghiệm thật $\\approx 1.3247$.
- Trung điểm $1.5$: $f(1.5) = 3.375 - 1.5 - 1 = 0.875 > 0$ → đổi dấu nằm ở $(1, 1.5)$.
- Trung điểm $1.25$: $f(1.25) = 1.953 - 1.25 - 1 = -0.297 < 0$ → đổi dấu ở $(1.25, 1.5)$.
- Trung điểm $1.375$: $f(1.375) = 2.600 - 1.375 - 1 = 0.225 > 0$ → đổi dấu ở $(1.25, 1.375)$ → nghiệm $\\in (1.25, 1.375)$, hội tụ dần về $1.3247$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"IVT có cần liên tục không, hay hàm nào cũng đúng?"* **Bắt buộc liên tục**. Hàm sàn $\\lfloor x \\rfloor$ trên $[0, 2]$ đi từ $0$ lên $2$ nhưng KHÔNG bao giờ nhận giá trị $1.5$ — vì nó nhảy, không liên tục. IVT sụp đổ ngay khi mất tính liên tục.
- *"Bolzano nói có nghiệm — tìm nghiệm ở đâu?"* Bolzano chỉ khẳng định **tồn tại** nghiệm trong $(a,b)$, không cho vị trí. Để tìm, dùng **chia đôi (bisection)**: lấy trung điểm $c$, xét dấu $f(c)$, thu hẹp nửa khoảng còn đổi dấu — lặp lại đến khi đủ chính xác.

⚠ **Lỗi thường gặp — dùng Bolzano khi $f(a) \\cdot f(b) > 0$**. Cùng dấu KHÔNG kết luận được gì: $f(x) = x^2-1$ trên $[-2, 2]$ có $f(-2) = f(2) = 3 > 0$ nhưng vẫn có **hai** nghiệm $\\pm 1$ ở giữa. Bolzano chỉ cho chiều "đổi dấu $\\implies$ có nghiệm", không cho chiều ngược.

🔁 **Dừng lại tự kiểm tra**

1. PT $\\cos x = x$ có nghiệm trong $(0, 1)$ không? (Đặt $f(x) = \\cos x - x$.)
2. $f(x) = \\frac{1}{x}$ trên $[-1, 1]$ đi từ $-1$ lên $1$, có nhận giá trị $0$ không? IVT áp dụng được không?

<details><summary>Đáp án</summary>

1. $f(0) = 1 > 0$, $f(1) = \\cos 1 - 1 \\approx -0.46 < 0$. Đổi dấu, $f$ liên tục → **có nghiệm** trong $(0,1)$.
2. Không nhận $0$ ($\\frac{1}{x}$ không bao giờ bằng 0). IVT **không áp dụng được** vì $f$ gián đoạn vô hạn tại $0 \\in [-1,1]$.

</details>

### 📝 Tóm tắt mục 8

- IVT: $f$ liên tục trên $[a,b]$ → $f$ nhận **mọi** giá trị giữa $f(a)$ và $f(b)$.
- Hệ quả Bolzano: liên tục $+ f(a) \\cdot f(b) < 0 \\implies$ có nghiệm $f(c)=0$ trong $(a,b)$.
- Tính liên tục là **bắt buộc**; chỉ kết luận được khi hai đầu **đổi dấu**.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Tính $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.

**Bài 2**: Tính $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}$.

**Bài 3**: $f(x) = \\frac{x^2 - 9}{x - 3}$ khi $x \\neq 3$, $f(3) = 5$. Hỏi $f$ liên tục tại 3 không?

**Bài 4**: Tính $\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 + 5}$.

**Bài 5**: PT $x^3 + x - 3 = 0$ có nghiệm trong $(1, 2)$ không?

**Bài 6**: Tính $\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}$ (nhân liên hợp).

**Bài 7**: Tính $\\lim_{x \\to \\infty} \\big(\\sqrt{x^2 + x} - x\\big)$ (dạng $\\infty - \\infty$).

**Bài 8**: Phân loại điểm gián đoạn của $f(x) = \\frac{x-2}{|x-2|}$ tại $x = 2$.

**Bài 9**: Tìm $a$ để $f(x) = \\begin{cases} x^2 & x \\le 2 \\\\ ax + 1 & x > 2 \\end{cases}$ liên tục tại $x = 2$.

**Bài 10**: Tính $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$ (gợi ý: nhân liên hợp $1 + \\cos x$ rồi dùng $\\frac{\\sin x}{x}$).

### Lời giải

**Bài 1**: $\\frac{x^2-4}{x-2} = \\frac{(x-2)(x+2)}{x-2} = x+2 \\to \\lim =$ **4**.

**Bài 2**: $\\lim \\frac{\\sin(3x)}{x} = \\lim 3 \\cdot \\frac{\\sin(3x)}{3x} = 3 \\cdot 1 =$ **3**.

**Bài 3**: $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = \\lim (x+3) = 6$. Nhưng $f(3) = 5 \\neq 6 \\to$ **gián đoạn bỏ được** (sửa $f(3)=6$ thì liên tục).

**Bài 4**: Chia tử mẫu cho $x^2$: $\\frac{3 + 1/x^2}{1 + 5/x^2} \\to \\frac{3}{1} =$ **3**.

**Bài 5**: $f$ liên tục. $f(1) = -1$, $f(2) = 7$. $f(1) \\cdot f(2) < 0 \\to$ **có nghiệm** trong $(1, 2)$ (Bolzano).

**Bài 6**: Thay trực tiếp $\\frac{\\sqrt{4}-2}{0} = \\frac{0}{0}$. Nhân liên hợp $\\sqrt{x+4}+2$: $\\frac{(x+4)-4}{x(\\sqrt{x+4}+2)} = \\frac{x}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2} \\to \\frac{1}{\\sqrt{4}+2} = \\frac{1}{4}$. **Đáp số: $\\frac{1}{4}$.**

**Bài 7**: Dạng $\\infty - \\infty$. Nhân liên hợp $\\sqrt{x^2+x}+x$: $\\frac{(x^2+x)-x^2}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x}$. Chia tử mẫu cho $x$ (với $x > 0$): $\\frac{1}{\\sqrt{1+1/x}+1} \\to \\frac{1}{1+1} = \\frac{1}{2}$. Verify: $x = 1000 \\to \\sqrt{1001000} - 1000 \\approx 0.4999$ ✓. **Đáp số: $\\frac{1}{2}$.**

**Bài 8**: $\\lim_{x \\to 2^-}$: với $x < 2$, $|x-2| = -(x-2)$ → $f = \\frac{x-2}{-(x-2)} = -1$. $\\lim_{x \\to 2^+}$: với $x > 2$, $|x-2| = x-2$ → $f = +1$. Hai bên hữu hạn nhưng lệch ($-1 \\ne 1$) → **gián đoạn nhảy** (jump). $f(2)$ cũng không xác định (chia 0).

**Bài 9**: Cần $\\lim_{x \\to 2^-} = \\lim_{x \\to 2^+} = f(2)$. $\\lim_{x \\to 2^-} x^2 = 4 = f(2)$. $\\lim_{x \\to 2^+} (ax+1) = 2a + 1$. Đặt $2a + 1 = 4 \\Rightarrow a = \\frac{3}{2}$. **Đáp số: $a = \\frac{3}{2}$.**

**Bài 10**: Nhân liên hợp $1 + \\cos x$: $\\frac{(1-\\cos x)(1+\\cos x)}{x^2(1+\\cos x)} = \\frac{1-\\cos^2 x}{x^2(1+\\cos x)} = \\frac{\\sin^2 x}{x^2(1+\\cos x)} = \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\frac{1}{1+\\cos x}$. Khi $x \\to 0$: $\\left(\\frac{\\sin x}{x}\\right)^2 \\to 1^2 = 1$ và $\\frac{1}{1+\\cos x} \\to \\frac{1}{2}$. Tích $\\to \\frac{1}{2}$. **Đáp số: $\\frac{1}{2}$.**

---

## 10. Bài tiếp theo

[Lesson 03 — Đạo hàm: định nghĩa](../lesson-03-derivative-definition/).

## 📝 Tổng kết

1. **$\\lim_{x \\to a} f(x) = L$**: $f$ xung quanh $a$ càng gần $L$ tùy ý.
2. Giới hạn 2 bên tồn tại $\\iff$ 2 giới hạn 1 bên = nhau.
3. **Liên tục tại $a$**: $\\lim = f(a)$. 3 loại gián đoạn (bỏ được, nhảy, vô hạn).
4. **IVT**: liên tục thì đi qua mọi giá trị trung gian.
5. **Bolzano**: $f(a) \\cdot f(b) < 0$ và liên tục → có nghiệm.
`;
