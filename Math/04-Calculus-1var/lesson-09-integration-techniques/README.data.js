// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-09-integration-techniques/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 09 (T4) — Kỹ thuật tính tích phân

## Mục tiêu

- Nắm bốn kỹ thuật trụ cột để **tính được** những tích phân mà Lesson 06–08 mới chỉ "định nghĩa": **đổi biến**, **tích phân từng phần**, **đổi biến lượng giác**, **phân tích thành phân thức đơn giản**.
- Hiểu **tích phân suy rộng** (cận vô hạn / hàm không bị chặn) và tiêu chí hội tụ p-test.
- Biết **chọn kỹ thuật nào** cho từng dạng tích phân.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/) (bảng nguyên hàm, ý tưởng đổi biến).
- [Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/) (định lý cơ bản giải tích: $\\int_a^b f = F(b) - F(a)$).
- [Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/) — đây là *động cơ*: ta cần tính được tích phân thật để dùng vào diện tích/thể tích.

> 💡 **Vì sao cần bài này?** Lesson 07 nói "tích phân = $F(b) - F(a)$", nhưng *tìm F* mới là phần khó. Hầu hết tích phân thực tế không tra bảng trực tiếp được — $\\int x\\cdot e^x\\,dx$, $\\int\\sqrt{1-x^2}\\,dx$, $\\int\\frac{1}{x^2-1}\\,dx$ đều "tịt" nếu chỉ có bảng nguyên hàm. Bốn kỹ thuật dưới đây là bộ đồ nghề để **biến tích phân lạ về tích phân quen**.

---

## 1. Đổi biến (substitution) — ôn nhanh

💡 **Trực giác.** Đổi biến là "quy tắc hàm hợp chạy ngược". Nếu thấy trong tích phân có **một cụm và đạo hàm của cụm đó**, đặt cụm đó làm $u$.

$$\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du \\quad (u = g(x))$$

**Ví dụ số cụ thể (4 cái):**

1. $\\int 2x\\cdot\\cos(x^2)\\,dx$: đặt $u = x^2$, $du = 2x\\,dx$ → $\\int\\cos u\\,du = \\sin u = \\sin(x^2) + C$.
2. $\\int \\frac{x}{x^2+1}\\,dx$: $u = x^2+1$, $du = 2x\\,dx$ → $\\frac{1}{2}\\int\\frac{du}{u} = \\frac{1}{2}\\ln|u| = \\frac{1}{2}\\ln(x^2+1) + C$.
3. $\\int \\frac{\\ln x}{x}\\,dx$: $u = \\ln x$, $du = \\frac{dx}{x}$ → $\\int u\\,du = \\frac{1}{2}(\\ln x)^2 + C$.
4. $\\int_0^1 x\\cdot e^{x^2}\\,dx$: $u = x^2$ ($x:0\\to1 \\Rightarrow u:0\\to1$) → $\\frac{1}{2}\\int_0^1 e^u\\,du = \\frac{1}{2}(e - 1) \\approx 0.859$.

> ⚠ **Lỗi thường gặp.** Khi đổi biến trong tích phân **xác định**, phải đổi luôn **cận** theo $u$ (ví dụ 4: $x$ từ $0\\to1$ thành $u$ từ $0\\to1$), hoặc thế ngược về $x$ trước khi thay cận. Quên đổi cận → sai số.

> 🔁 **Dừng lại tự kiểm tra.** Tính $\\int 3x^2\\cos(x^3)\\,dx$.
> <details><summary>Đáp án</summary>Thấy "cụm $x^3$ + đạo hàm $3x^2$" → đặt $u=x^3$, $du=3x^2\\,dx$. $\\Rightarrow \\int\\cos u\\,du = \\sin u + C = \\sin(x^3) + C$. Verify: $\\frac{d}{dx}\\sin(x^3) = 3x^2\\cos(x^3)$ ✓.</details>

> 📝 **Tóm tắt mục 1.** Đổi biến = quy tắc hàm hợp chạy ngược. Nhận diện mẫu "**một cụm + đạo hàm của cụm**", đặt cụm đó là $u$. Với tích phân **xác định**, bắt buộc đổi cận theo $u$ (hoặc thế ngược về $x$ trước khi thay số).

---

## 2. Tích phân từng phần (integration by parts)

💡 **Trực giác.** Đây là "quy tắc tích chạy ngược". Từ $(uv)' = u'v + uv'$, lấy tích phân hai vế rồi chuyển vế:

$$\\int u\\,dv = uv - \\int v\\,du$$

Ý tưởng: đổi một tích phân khó $\\int u\\,dv$ lấy một tích phân (hi vọng) **dễ hơn** $\\int v\\,du$.

❓ **Chọn $u$ là cái nào?** Theo thứ tự ưu tiên **LIATE** — chọn $u$ là loại xuất hiện *trước* trong danh sách (vì đạo hàm nó sẽ đơn giản dần):
**L**ogarit → **I**nverse (hàm ngược, arctan...) → **A**lgebra (đa thức) → **T**rig → **E**xponential.

**Ví dụ số cụ thể (4 cái), verify bằng đạo hàm:**

1. $\\int x\\cdot e^x\\,dx$: $u=x$ (A), $dv=e^x\\,dx$ → $du=dx$, $v=e^x$. $\\Rightarrow x\\cdot e^x - \\int e^x\\,dx = e^x(x-1) + C$.
   *Verify:* $\\frac{d}{dx}[e^x(x-1)] = e^x(x-1)+e^x = x\\cdot e^x$ ✓. Xác định: $\\int_0^1 x\\cdot e^x\\,dx = [e^x(x-1)]_0^1 = 0 - (-1) = 1$.
2. $\\int \\ln x\\,dx$: viết $u=\\ln x$ (L), $dv=dx$ → $du=\\frac{dx}{x}$, $v=x$. $\\Rightarrow x\\ln x - \\int x\\cdot\\frac{1}{x}\\,dx = x\\ln x - x + C$.
   *Verify:* $\\ln x + 1 - 1 = \\ln x$ ✓. $\\int_1^e \\ln x\\,dx = [x\\ln x - x]_1^e = (e-e) - (0-1) = 1$.
3. $\\int x\\cdot\\sin x\\,dx$: $u=x$, $dv=\\sin x\\,dx$ → $v=-\\cos x$. $\\Rightarrow -x\\cos x + \\int\\cos x\\,dx = -x\\cos x + \\sin x + C$.
   *Verify:* $-\\cos x + x\\sin x + \\cos x = x\\sin x$ ✓. $\\int_0^\\pi x\\sin x\\,dx = [-x\\cos x + \\sin x]_0^\\pi = \\pi$.
4. $\\int x^2\\cdot e^x\\,dx$: từng phần **hai lần** $\\Rightarrow e^x(x^2 - 2x + 2) + C$.
   *Verify:* $e^x(x^2-2x+2) + e^x(2x-2) = e^x\\cdot x^2$ ✓.

> ❓ **"Có khi nào làm hoài không hết?"** Có dạng *vòng lặp* như $\\int e^x\\cos x\\,dx$: từng phần hai lần thì tích phân gốc xuất hiện lại ở vế phải, ta **giải như phương trình ẩn I**. Kết quả: $\\int e^x\\cos x\\,dx = \\frac{1}{2}e^x(\\cos x + \\sin x) + C$.

> 🔁 **Tự kiểm tra.** Tính $\\int x\\cdot\\cos x\\,dx$.
> <details><summary>Đáp án</summary>$u=x, dv=\\cos x\\,dx \\to v=\\sin x$. $\\Rightarrow x\\sin x - \\int\\sin x\\,dx = x\\sin x + \\cos x + C$. Verify: $\\sin x + x\\cos x - \\sin x = x\\cos x$ ✓.</details>

> 📝 **Tóm tắt mục 2.** $\\int u\\,dv = uv - \\int v\\,du$ — biến tích phân khó thành (hi vọng) dễ hơn. Chọn $u$ theo **LIATE** (Log → Inverse → Algebra → Trig → Exp). Dạng *vòng lặp* ($\\int e^x\\cos x\\,dx$): từng phần hai lần rồi giải như phương trình ẩn $I$.

---

## 3. Đổi biến lượng giác (trig substitution)

💡 **Trực giác.** Khi trong tích phân có $\\sqrt{a^2-x^2}$, $\\sqrt{a^2+x^2}$, $\\sqrt{x^2-a^2}$ — những căn này chính là **cạnh tam giác vuông**. Đặt $x$ theo $\\sin/\\tan/\\sec$ để biến căn thành một hàm lượng giác trơn (dùng $1-\\sin^2 = \\cos^2$, $1+\\tan^2 = \\sec^2$).

| Dạng căn | Đặt | Đồng nhất thức dùng |
|----------|-----|---------------------|
| $\\sqrt{a^2-x^2}$ | $x = a\\cdot\\sin\\theta$ | $1 - \\sin^2\\theta = \\cos^2\\theta$ |
| $\\sqrt{a^2+x^2}$ | $x = a\\cdot\\tan\\theta$ | $1 + \\tan^2\\theta = \\sec^2\\theta$ |
| $\\sqrt{x^2-a^2}$ | $x = a\\cdot\\sec\\theta$ | $\\sec^2\\theta - 1 = \\tan^2\\theta$ |

**Ví dụ số cụ thể (4 cái):**

1. $\\int \\sqrt{1-x^2}\\,dx$: đặt $x=\\sin\\theta$, $dx=\\cos\\theta\\,d\\theta$, $\\sqrt{1-x^2}=\\cos\\theta$. $\\Rightarrow \\int\\cos^2\\theta\\,d\\theta = \\frac{1}{2}(\\theta + \\sin\\theta\\cos\\theta)$.
   Thế lại: $= \\frac{1}{2}(\\arcsin x + x\\sqrt{1-x^2}) + C$. *Đây là diện tích dưới cung tròn.*
   $\\int_0^1 \\sqrt{1-x^2}\\,dx = \\frac{1}{2}\\left(\\frac{\\pi}{2} + 0\\right) = \\frac{\\pi}{4}$ — đúng bằng diện tích **¼ hình tròn** đơn vị ✓.
2. $\\int \\frac{1}{1+x^2}\\,dx$: $x=\\tan\\theta$, $dx=\\sec^2\\theta\\,d\\theta$, $1+x^2=\\sec^2\\theta$ $\\Rightarrow \\int d\\theta = \\theta = \\arctan x + C$.
3. $\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx$: $x=\\sin\\theta$ $\\Rightarrow \\int d\\theta = \\arcsin x + C$.
4. $\\int \\sqrt{x^2-1}\\,dx$ ($x\\ge1$): $x=\\sec\\theta$ $\\Rightarrow \\frac{1}{2}(x\\sqrt{x^2-1} - \\ln|x+\\sqrt{x^2-1}|) + C$.

> ⚠ **Lỗi thường gặp.** Sau khi tính xong theo $\\theta$, phải **đổi ngược về $x$** (dùng tam giác: $\\sin\\theta = \\frac{x}{a} \\Rightarrow \\cos\\theta = \\frac{\\sqrt{a^2-x^2}}{a}$...). Để nguyên $\\theta$ là chưa xong.

> 🔁 **Dừng lại tự kiểm tra.** Tính $\\int \\frac{1}{\\sqrt{4-x^2}}\\,dx$.
> <details><summary>Đáp án</summary>Dạng $\\sqrt{a^2-x^2}$ với $a=2$ → đặt $x=2\\sin\\theta$, $dx=2\\cos\\theta\\,d\\theta$, $\\sqrt{4-x^2}=2\\cos\\theta$. $\\Rightarrow \\int\\frac{2\\cos\\theta}{2\\cos\\theta}\\,d\\theta = \\int d\\theta = \\theta + C = \\arcsin\\frac{x}{2} + C$. Verify: $\\frac{d}{dx}\\arcsin\\frac{x}{2} = \\frac{1/2}{\\sqrt{1-x^2/4}} = \\frac{1}{\\sqrt{4-x^2}}$ ✓.</details>

> 📝 **Tóm tắt mục 3.** Ba dạng căn → ba phép đặt: $\\sqrt{a^2-x^2}\\to a\\sin\\theta$, $\\sqrt{a^2+x^2}\\to a\\tan\\theta$, $\\sqrt{x^2-a^2}\\to a\\sec\\theta$. Đồng nhất thức Pythagoras khử căn. Nhớ **đổi ngược về $x$** bằng tam giác vuông.

---

## 4. Phân tích thành phân thức đơn giản (partial fractions)

💡 **Trực giác.** Phân thức hữu tỉ $\\frac{P(x)}{Q(x)}$ (bậc tử < bậc mẫu) khó tích phân trực tiếp, nhưng **mọi phân thức như vậy đều tách được thành tổng các mảnh kiểu $\\frac{A}{x-r}$** — mà mỗi mảnh tích phân ra $A\\cdot\\ln|x-r|$ ngay.

**Ví dụ số cụ thể (4 cái):**

1. $\\frac{1}{x^2-1} = \\frac{1}{(x-1)(x+1)} = \\frac{1}{2}\\cdot\\frac{1}{x-1} - \\frac{1}{2}\\cdot\\frac{1}{x+1}$.
   $\\Rightarrow \\int\\frac{1}{x^2-1}\\,dx = \\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$.
2. $\\frac{1}{x(x+1)} = \\frac{1}{x} - \\frac{1}{x+1}$ $\\Rightarrow \\int = \\ln|x| - \\ln|x+1| = \\ln\\left|\\frac{x}{x+1}\\right| + C$.
3. $\\frac{x+3}{x(x-1)}$: tách $= \\frac{A}{x} + \\frac{B}{x-1}$. Cho $x=0$: $\\frac{3}{-1}=A \\Rightarrow A=-3$; $x=1$: $\\frac{4}{1}=B \\Rightarrow B=4$.
   $\\Rightarrow \\int = -3\\ln|x| + 4\\ln|x-1| + C$.
4. $\\frac{2x}{x^2-1}$: ở đây tử là đạo hàm của mẫu → đổi biến nhanh hơn: $= \\ln|x^2-1| + C$ (không cần tách).

> ❓ **"Tách hệ số A, B kiểu gì cho nhanh?"** **Phương pháp che (cover-up):** để tìm hệ số của $\\frac{1}{x-r}$, che $(x-r)$ ở mẫu rồi thay $x=r$ vào phần còn lại. Ví dụ 1: hệ số của $\\frac{1}{x-1}$ = $\\frac{1}{x+1}\\big|_{x=1} = \\frac{1}{2}$.

> ⚠ **Bậc tử ≥ bậc mẫu?** Phải **chia đa thức trước** để tách phần nguyên, rồi mới phân tích phần dư. Ví dụ $\\frac{x^2}{x^2-1} = 1 + \\frac{1}{x^2-1}$.

> 🔁 **Dừng lại tự kiểm tra.** Tách rồi tính $\\int \\frac{5}{(x-2)(x+3)}\\,dx$.
> <details><summary>Đáp án</summary>Cover-up: hệ số của $\\frac{1}{x-2}$ = $\\frac{5}{x+3}\\big|_{x=2} = \\frac{5}{5} = 1$; của $\\frac{1}{x+3}$ = $\\frac{5}{x-2}\\big|_{x=-3} = \\frac{5}{-5} = -1$. $\\Rightarrow \\int\\left(\\frac{1}{x-2} - \\frac{1}{x+3}\\right)dx = \\ln|x-2| - \\ln|x+3| + C = \\ln\\left|\\frac{x-2}{x+3}\\right| + C$.</details>

> 📝 **Tóm tắt mục 4.** Phân thức hữu tỉ (bậc tử < mẫu) tách thành tổng các $\\frac{A}{x-r}$ → mỗi mảnh tích phân ra $A\\ln|x-r|$. **Cover-up** tìm hệ số nhanh. Bậc tử ≥ mẫu → **chia đa thức trước**. Nếu tử đúng bằng đạo hàm của mẫu → đổi biến gọn hơn tách.

---

## 5. Tích phân suy rộng (improper integrals)

💡 **Trực giác.** Tích phân suy rộng là tích phân trên miền **vô hạn** (cận $\\infty$) hoặc của hàm **vọt lên vô cùng** trong miền. Ta định nghĩa nó là **giới hạn** của tích phân thường:

$$\\int_1^{\\infty} f(x)\\,dx = \\lim_{b\\to\\infty}\\int_1^{b} f(x)\\,dx$$

Nếu giới hạn hữu hạn → **hội tụ**; nếu $= \\infty$ hoặc không tồn tại → **phân kỳ**.

> 📐 **Tiêu chí p (p-test) — định nghĩa đầy đủ.**
> **(a) Là gì:** xét $\\int_1^\\infty x^{-p}\\,dx$. Tính: $\\int_1^b x^{-p}\\,dx = \\left[\\frac{x^{1-p}}{1-p}\\right]_1^b$.
> **(b) Kết luận:** khi $b\\to\\infty$, số hạng $b^{1-p}$ → 0 **chỉ khi** $p > 1$. Vậy:
> - $p > 1$: **hội tụ**, giá trị $= \\frac{1}{p-1}$.
> - $p \\le 1$: **phân kỳ** ($= \\infty$).
> **(c) Ví dụ số:** $p=2 \\to \\frac{1}{2-1} = 1$; $p=3 \\to \\frac{1}{2}$; $p=1$ ($\\int_1^\\infty \\frac{dx}{x} = \\ln b \\to \\infty$) phân kỳ; $p=0.5$ phân kỳ.

**Ví dụ số cụ thể (4 cái):**

1. $\\int_1^\\infty \\frac{1}{x^2}\\,dx = \\left[-\\frac{1}{x}\\right]_1^\\infty = 0 - (-1) = 1$ (hội tụ). *Diện tích vô hạn bề ngang nhưng hữu hạn!*
2. $\\int_1^\\infty \\frac{1}{x}\\,dx = [\\ln x]_1^\\infty = \\infty$ (phân kỳ) — ranh giới đúng tại $p=1$.
3. $\\int_0^\\infty e^{-x}\\,dx = [-e^{-x}]_0^\\infty = 0 - (-1) = 1$ — nền của phân phối mũ trong xác suất.
4. $\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx = [2\\sqrt{x}]_0^1 = 2$ (suy rộng tại $x=0$ vì $\\frac{1}{\\sqrt{x}} \\to \\infty$; vẫn hội tụ vì $p=\\frac{1}{2} < 1$ cho cận **0**).

> ❓ **"Sao chỗ thì $p>1$ hội tụ, chỗ thì $p<1$ hội tụ?"** Khác cận! Tại **$\\infty$** cần hàm tắt nhanh $\\Rightarrow p>1$. Tại **điểm kỳ dị 0** cần hàm không quá nhọn $\\Rightarrow p<1$. Hai bài toán đối xứng nhau.

> 🔁 **Dừng lại tự kiểm tra.** $\\int_1^\\infty \\frac{1}{x^{1.5}}\\,dx$ hội tụ hay phân kỳ? Nếu hội tụ, bằng bao nhiêu?
> <details><summary>Đáp án</summary>$p = 1.5 > 1$ → **hội tụ**, giá trị $= \\frac{1}{p-1} = \\frac{1}{0.5} = 2$. Kiểm tra: $\\int_1^b x^{-1.5}dx = [-2x^{-0.5}]_1^b = -\\frac{2}{\\sqrt{b}} + 2 \\to 2$ khi $b\\to\\infty$ ✓.</details>

> 📝 **Tóm tắt mục 5.** Tích phân suy rộng = **giới hạn** của tích phân thường (cận $\\infty$ hoặc hàm vọt vô cực). Hữu hạn → hội tụ; ngược lại → phân kỳ. **p-test**: tại $\\infty$ cần $p>1$; tại điểm kỳ dị (vd $0$) cần $p<1$ — hai điều kiện đối xứng.

---

## 6. Chọn kỹ thuật nào? (sơ đồ quyết định)

| Thấy trong tích phân | Thử trước |
|----------------------|-----------|
| Một cụm + đạo hàm của cụm đó | **Đổi biến** |
| Tích của hai loại hàm khác nhau (đa thức × $e^x$/sin/ln) | **Từng phần** (LIATE) |
| Căn $\\sqrt{a^2\\pm x^2}$, $\\sqrt{x^2-a^2}$ | **Đổi biến lượng giác** |
| Phân thức hữu tỉ (mẫu phân tích được) | **Phân thức đơn giản** |
| Cận $\\infty$ hoặc hàm vọt vô cực | **Suy rộng** (lim) |

> 📝 **Tóm tắt.** Bốn kỹ thuật = bốn cách "biến lạ về quen": đổi biến (hàm hợp ngược), từng phần (tích ngược), lượng giác hoá (khử căn), phân thức (tách phân số). Suy rộng = tích phân + giới hạn. p-test: $\\infty$ cần $p>1$, kỳ dị tại 0 cần $p<1$.

---

## 7. Bài tập

1. Tính $\\int x\\cdot\\ln x\\,dx$.
2. Tính $\\int_0^{\\pi/2} x\\cdot\\cos x\\,dx$.
3. Tính $\\int \\frac{1}{x^2+4}\\,dx$.
4. Tính $\\int \\frac{1}{(x-2)(x+1)}\\,dx$.
5. Tích phân suy rộng $\\int_2^\\infty \\frac{1}{x^3}\\,dx$ hội tụ hay phân kỳ? Bằng bao nhiêu?

## Lời giải chi tiết

**Bài 1.** $\\int x\\cdot\\ln x\\,dx$. LIATE: $u=\\ln x$ (L trước A), $dv=x\\,dx$ → $du=\\frac{dx}{x}$, $v=\\frac{x^2}{2}$.
⇒ $\\frac{x^2}{2}\\ln x - \\int\\frac{x^2}{2}\\cdot\\frac{1}{x}\\,dx = \\frac{x^2}{2}\\ln x - \\int\\frac{x}{2}\\,dx = \\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C$.
*Verify:* $\\frac{d}{dx} = x\\ln x + \\frac{x^2}{2}\\cdot\\frac{1}{x} - \\frac{x}{2} = x\\ln x + \\frac{x}{2} - \\frac{x}{2} = x\\ln x$ ✓.

**Bài 2.** $\\int_0^{\\pi/2} x\\cos x\\,dx$. $u=x, dv=\\cos x\\,dx \\to v=\\sin x$.
⇒ $[x\\sin x]_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x\\,dx = \\left(\\frac{\\pi}{2}\\cdot1 - 0\\right) - [-\\cos x]_0^{\\pi/2} = \\frac{\\pi}{2} - (0 - (-1)) = \\frac{\\pi}{2} - 1 \\approx 0.5708$.

**Bài 3.** $\\int \\frac{1}{x^2+4}\\,dx$. Dạng $\\sqrt{a^2+x^2}$-họ với $a=2$: $x=2\\tan\\theta$. Nhanh hơn dùng công thức $\\int\\frac{dx}{x^2+a^2} = \\frac{1}{a}\\arctan\\frac{x}{a}$.
⇒ $= \\frac{1}{2}\\cdot\\arctan\\frac{x}{2} + C$.

**Bài 4.** $\\int \\frac{1}{(x-2)(x+1)}\\,dx$. Tách $= \\frac{A}{x-2} + \\frac{B}{x+1}$. Che: $A = \\frac{1}{x+1}\\big|_{x=2} = \\frac{1}{3}$; $B = \\frac{1}{x-2}\\big|_{x=-1} = \\frac{1}{-3} = -\\frac{1}{3}$.
⇒ $\\int = \\frac{1}{3}\\ln|x-2| - \\frac{1}{3}\\ln|x+1| = \\frac{1}{3}\\ln\\left|\\frac{x-2}{x+1}\\right| + C$.

**Bài 5.** $\\int_2^\\infty x^{-3}\\,dx$. $p=3 > 1$ → **hội tụ**. $= \\left[\\frac{x^{-2}}{-2}\\right]_2^\\infty = 0 - \\left(-\\frac{1}{2\\cdot4}\\right) = \\frac{1}{8} = 0.125$.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 4 module tương tác: tích phân từng phần (chọn hàm, xem u/dv & kết quả), đổi biến lượng giác (diện tích cung tròn), phân thức (tách & tích phân), và p-test suy rộng (kéo p, b xem hội tụ/phân kỳ).

## 9. Bài tiếp theo

- [Lesson 10 — Giải tích tham số & toạ độ cực](../lesson-10-parametric-polar-calculus/) — áp các kỹ thuật tích phân này lên đường cong cho dưới dạng tham số và hệ toạ độ cực.
- Chuỗi & khai triển Taylor (dùng tích phân từng phần để ước lượng phần dư): [Math/06-Advanced/lesson-06-series-taylor](../../06-Advanced/lesson-06-series-taylor/).
- Tích phân suy rộng $\\int_0^\\infty e^{-x}$ là nền của phân phối liên tục: [Math/06-Advanced/lesson-08-probability-statistics](../../06-Advanced/lesson-08-probability-statistics/).
`;
