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

💡 **Trực giác — chain rule chạy ngược.** Đạo hàm hàm hợp (chain rule) nói $\\frac{d}{dx}F(g(x)) = F'(g(x))\\cdot g'(x)$. Đọc ngược lại: nếu một tích phân có dạng "**hàm-của-một-cụm × đạo hàm-của-cụm-đó**", thì nó chính là đạo hàm hàm hợp ai đó vừa khai triển — ta chỉ việc "cuốn ngược" về lại $F(g(x))$. Phép đặt $u = g(x)$ là cách viết hình thức của thao tác cuốn ngược đó.

$$\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du \\quad (u = g(x))$$

Sơ đồ thao tác (3 bước máy móc, làm đúng thứ tự là không sai):

\`\`\`
   ∫ f(g(x))·g'(x) dx
        │  (1) đặt u = g(x)
        ▼
   du = g'(x) dx   ──►  thay g'(x) dx bằng du
        │  (2) tích phân khúc còn lại đã biến mất x
        ▼
   ∫ f(u) du = F(u) + C
        │  (3) thế u = g(x) trở lại  (tích phân BẤT định)
        ▼          hoặc đổi cận theo u (tích phân XÁC định)
   F(g(x)) + C
\`\`\`

❓ **"Làm sao biết chọn cụm nào làm $u$?"** Tìm cụm mà **đạo hàm của nó cũng có mặt trong tích phân** (chỉ sai khác một hằng số là chấp nhận được — hằng số kéo ra ngoài được). Mẹo: thường $u$ là cái nằm **trong** một hàm khác (trong căn, trong mũ, dưới mẫu, trong $\\sin/\\cos$), còn $du$ là phần "thừa ra" bên ngoài.

**Ví dụ số cụ thể (4 cái):**

1. $\\int 2x\\cdot\\cos(x^2)\\,dx$: đặt $u = x^2$, $du = 2x\\,dx$ → $\\int\\cos u\\,du = \\sin u = \\sin(x^2) + C$.
2. $\\int \\frac{x}{x^2+1}\\,dx$: $u = x^2+1$, $du = 2x\\,dx$ → $\\frac{1}{2}\\int\\frac{du}{u} = \\frac{1}{2}\\ln|u| = \\frac{1}{2}\\ln(x^2+1) + C$.
3. $\\int \\frac{\\ln x}{x}\\,dx$: $u = \\ln x$, $du = \\frac{dx}{x}$ → $\\int u\\,du = \\frac{1}{2}(\\ln x)^2 + C$.
4. $\\int_0^1 x\\cdot e^{x^2}\\,dx$: $u = x^2$ ($x:0\\to1 \\Rightarrow u:0\\to1$) → $\\frac{1}{2}\\int_0^1 e^u\\,du = \\frac{1}{2}(e - 1) \\approx 0.859$.
5. $\\int (2x+3)^5\\,dx$: cụm trong lũy thừa là $u = 2x+3$, $du = 2\\,dx \\Rightarrow dx = \\frac{du}{2}$. $\\Rightarrow \\frac{1}{2}\\int u^5\\,du = \\frac{1}{12}u^6 = \\frac{1}{12}(2x+3)^6 + C$. *Verify:* $\\frac{d}{dx}\\frac{(2x+3)^6}{12} = \\frac{6(2x+3)^5\\cdot 2}{12} = (2x+3)^5$ ✓.
6. $\\int \\tan x\\,dx = \\int \\frac{\\sin x}{\\cos x}\\,dx$: đặt $u = \\cos x$, $du = -\\sin x\\,dx \\Rightarrow \\sin x\\,dx = -du$. $\\Rightarrow -\\int \\frac{du}{u} = -\\ln|u| = -\\ln|\\cos x| + C = \\ln|\\sec x| + C$.

#### 1.1. Walk-through chi tiết — tích phân XÁC định, hai cách

Cùng một bài $\\displaystyle\\int_0^2 x\\sqrt{x^2+1}\\,dx$, làm theo **hai cách** để thấy chỗ hay sai:

**Cách A — đổi cận theo $u$ (khuyên dùng, gọn nhất):**

$$\\begin{aligned}
u &= x^2 + 1, \\quad du = 2x\\,dx \\;\\Rightarrow\\; x\\,dx = \\tfrac{1}{2}\\,du \\\\
x = 0 &\\;\\Rightarrow\\; u = 0^2+1 = 1 \\qquad (\\text{đổi cận dưới}) \\\\
x = 2 &\\;\\Rightarrow\\; u = 2^2+1 = 5 \\qquad (\\text{đổi cận trên}) \\\\
\\int_0^2 x\\sqrt{x^2+1}\\,dx &= \\tfrac{1}{2}\\int_1^5 \\sqrt{u}\\,du = \\tfrac{1}{2}\\cdot\\Big[\\tfrac{2}{3}u^{3/2}\\Big]_1^5 \\\\
&= \\tfrac{1}{3}\\big(5^{3/2} - 1\\big) = \\tfrac{1}{3}(5\\sqrt5 - 1) \\approx 3.39
\\end{aligned}$$

**Cách B — tính nguyên hàm rồi thế $x$ (KHÔNG đổi cận):** tính nguyên hàm $\\frac{1}{3}(x^2+1)^{3/2}$ **thế $u$ về $x$ trước**, rồi mới thay cận $x = 0, 2$:

$$\\Big[\\tfrac{1}{3}(x^2+1)^{3/2}\\Big]_0^2 = \\tfrac{1}{3}\\big(5^{3/2} - 1^{3/2}\\big) = \\tfrac{1}{3}(5\\sqrt5 - 1) \\approx 3.39 \\;✓$$

Hai cách ra **cùng số**. Cách A nhanh hơn vì không phải thế $u$ về $x$; nhưng **bắt buộc** đổi cận. Cách B giữ cận cũ nhưng **bắt buộc** thế về $x$ trước khi thay số.

> ⚠ **Lỗi thường gặp #1 — trộn lẫn hai cách.** Đổi biến sang $u$ rồi **giữ nguyên cận $x$** mà thay vào $u$ → sai. Ở ví dụ trên, nếu viết $\\frac{1}{2}\\big[\\frac{2}{3}u^{3/2}\\big]_0^2$ (cận $0,2$ là cận của $x$, không phải $u$!) sẽ ra $\\frac{1}{3}(2^{3/2}-0) \\approx 0.94$ — sai hoàn toàn. **Quy tắc:** một khi đã đổi sang $u$ thì cận cũng phải là cận của $u$ ($1$ và $5$).

> ⚠ **Lỗi thường gặp #2 — quên đổi cận.** Khi đổi biến trong tích phân **xác định**, phải đổi luôn **cận** theo $u$ (ví dụ 4 ở trên: $x$ từ $0\\to1$ thành $u$ từ $0\\to1$ — tình cờ trùng nên dễ tưởng "không cần đổi"; ví dụ $1.1$ thì $0,2 \\to 1,5$ khác hẳn), hoặc thế ngược về $x$ trước khi thay cận. Quên đổi cận → sai số.

> 🔁 **Dừng lại tự kiểm tra (bất định).** Tính $\\int 3x^2\\cos(x^3)\\,dx$.
> <details><summary>Đáp án</summary>Thấy "cụm $x^3$ + đạo hàm $3x^2$" → đặt $u=x^3$, $du=3x^2\\,dx$. $\\Rightarrow \\int\\cos u\\,du = \\sin u + C = \\sin(x^3) + C$. Verify: $\\frac{d}{dx}\\sin(x^3) = 3x^2\\cos(x^3)$ ✓.</details>

> 🔁 **Dừng lại tự kiểm tra (xác định — phải đổi cận).** Tính $\\int_0^1 \\frac{x}{(x^2+1)^2}\\,dx$.
> <details><summary>Đáp án</summary>$u = x^2+1$, $du = 2x\\,dx \\Rightarrow x\\,dx = \\frac{1}{2}du$. Đổi cận: $x=0 \\Rightarrow u=1$; $x=1 \\Rightarrow u=2$. $\\Rightarrow \\frac{1}{2}\\int_1^2 u^{-2}\\,du = \\frac{1}{2}\\big[-u^{-1}\\big]_1^2 = \\frac{1}{2}\\big(-\\frac{1}{2}+1\\big) = \\frac{1}{4} = 0.25$. *Lưu ý cận đã đổi sang $1, 2$ — không phải $0, 1$.*</details>

> 📝 **Tóm tắt mục 1.** Đổi biến = **chain rule chạy ngược**. Nhận diện mẫu "**một cụm + đạo hàm của cụm**" (cụm thường nằm trong căn / mũ / mẫu / $\\sin\\cos$), đặt cụm đó là $u$. Ba bước: (1) đặt $u=g(x)$, (2) thay $g'(x)\\,dx = du$ và tích phân theo $u$, (3) thế $u$ về $x$ (bất định) **hoặc** đổi cận theo $u$ (xác định). Với tích phân **xác định**: đổi sang $u$ thì cận cũng phải là cận của $u$ — đừng trộn lẫn cận $x$ với biến $u$.

---

## 2. Tích phân từng phần (integration by parts)

💡 **Trực giác — product rule chạy ngược.** Đạo hàm của tích (product rule) nói $(uv)' = u'v + uv'$. Lấy tích phân **hai vế** theo $x$: $uv = \\int u'v\\,dx + \\int uv'\\,dx$. Chuyển vế một số hạng sang trái:

$$\\int u\\,v'\\,dx = uv - \\int u'\\,v\\,dx \\quad\\Longleftrightarrow\\quad \\int u\\,dv = uv - \\int v\\,du$$

Tức là: tích phân từng phần chỉ là **product rule viết ngược lại rồi chuyển vế**. Ý tưởng dùng nó: đổi một tích phân khó $\\int u\\,dv$ lấy một tích phân (hi vọng) **dễ hơn** $\\int v\\,du$. "Phần lời lãi" $uv$ rơi ra ngay, phần còn lại $\\int v\\,du$ — nếu chọn $u, dv$ khéo — sẽ đơn giản hơn ban đầu.

❓ **Chọn $u$ là cái nào? — Quy tắc LIATE.** Một tích $u\\,dv$ có hai mảnh; mảnh nào làm $u$ (sẽ bị **đạo hàm** thành $du$), mảnh nào làm $dv$ (sẽ bị **tích phân** thành $v$)? Chọn $u$ là loại xuất hiện *trước* trong danh sách dưới, vì **đạo hàm của nó đơn giản dần** (lý tưởng là tiến về hằng số):

| Thứ tự | Loại | Vì sao ưu tiên làm $u$ |
|:---:|------|------------------------|
| **L** | **L**ogarit ($\\ln x$, $\\log x$) | Đạo hàm $\\to \\frac{1}{x}$ — đơn giản hẳn; mà $\\ln x$ lại **khó tích phân**, nên đừng để nó làm $dv$. |
| **I** | **I**nverse trig ($\\arctan x$, $\\arcsin x$) | Tương tự, đạo hàm thành hàm hữu tỉ dễ hơn. |
| **A** | **A**lgebra (đa thức $x, x^2,\\dots$) | Đạo hàm hạ bậc dần, sau vài bước thành hằng số. |
| **T** | **T**rig ($\\sin x, \\cos x$) | Đạo/tích phân đều ra trig, "ngang ngửa" — thường làm $dv$. |
| **E** | **E**xponential ($e^x$) | Tích phân $e^x$ vẫn là $e^x$ — rất dễ làm $dv$. |

Mẹo nhớ ngắn: **mảnh "khó tích phân nhưng dễ đạo hàm" → làm $u$; mảnh "dễ tích phân" → làm $dv$.**

**Ví dụ số cụ thể (4 cái), verify bằng đạo hàm:**

1. **$\\int x\\cdot e^x\\,dx$** (Algebra × Exp). LIATE: $A$ trước $E$ → $u=x$, $dv=e^x\\,dx$. Bảng đặt:

   | | Chọn | Suy ra |
   |---|------|--------|
   | $u = x$ | (đạo hàm) | $du = dx$ |
   | $dv = e^x\\,dx$ | (tích phân) | $v = e^x$ |

   $\\Rightarrow uv - \\int v\\,du = x\\cdot e^x - \\int e^x\\,dx = e^x(x-1) + C$.
   *Vì sao $u=x$?* Đạo hàm $x \\to 1$ (hằng số) làm tích phân mới $\\int e^x\\,dx$ dễ hẳn. Nếu chọn ngược ($u=e^x$, $dv=x\\,dx$), tích phân mới $\\int \\frac{x^2}{2}e^x\\,dx$ **khó hơn** ban đầu — sai hướng.
   *Verify:* $\\frac{d}{dx}[e^x(x-1)] = e^x(x-1)+e^x = x\\cdot e^x$ ✓. Xác định: $\\int_0^1 x\\cdot e^x\\,dx = [e^x(x-1)]_0^1 = 0 - (-1) = 1$.
2. **$\\int \\ln x\\,dx$** (chỉ có $\\ln$ — "trick": coi như $\\ln x \\cdot 1$). LIATE: $L$ → $u=\\ln x$, $dv=dx$.

   | | Chọn | Suy ra |
   |---|------|--------|
   | $u = \\ln x$ | (đạo hàm) | $du = \\frac{dx}{x}$ |
   | $dv = dx$ | (tích phân) | $v = x$ |

   $\\Rightarrow x\\ln x - \\int x\\cdot\\frac{1}{x}\\,dx = x\\ln x - \\int 1\\,dx = x\\ln x - x + C$.
   *Verify:* $\\ln x + x\\cdot\\frac{1}{x} - 1 = \\ln x + 1 - 1 = \\ln x$ ✓. $\\int_1^e \\ln x\\,dx = [x\\ln x - x]_1^e = (e-e) - (0-1) = 1$.
3. **$\\int x\\cdot\\sin x\\,dx$** (Algebra × Trig). LIATE: $A$ trước $T$ → $u=x$, $dv=\\sin x\\,dx$.

   | | Chọn | Suy ra |
   |---|------|--------|
   | $u = x$ | (đạo hàm) | $du = dx$ |
   | $dv = \\sin x\\,dx$ | (tích phân) | $v = -\\cos x$ |

   $\\Rightarrow x(-\\cos x) - \\int(-\\cos x)\\,dx = -x\\cos x + \\int\\cos x\\,dx = -x\\cos x + \\sin x + C$.
   *Verify:* $-\\cos x + x\\sin x + \\cos x = x\\sin x$ ✓. $\\int_0^\\pi x\\sin x\\,dx = [-x\\cos x + \\sin x]_0^\\pi = (-\\pi\\cos\\pi + 0) - 0 = \\pi$.
4. **$\\int x^2\\cdot e^x\\,dx$** (cần từng phần **hai lần** vì $x^2$ đạo hàm hai bước mới về hằng).
   - Lần 1: $u=x^2,\\ dv=e^x dx \\to du=2x\\,dx,\\ v=e^x$. $\\Rightarrow x^2 e^x - \\int 2x\\,e^x\\,dx = x^2 e^x - 2\\int x\\,e^x\\,dx$.
   - Lần 2: dùng kết quả ví dụ 1, $\\int x\\,e^x\\,dx = e^x(x-1)$. $\\Rightarrow x^2 e^x - 2e^x(x-1) = e^x(x^2 - 2x + 2) + C$.
   *Verify:* $e^x(x^2-2x+2) + e^x(2x-2) = e^x\\cdot x^2$ ✓.

#### 2.1. Phương pháp bảng (tabular) — tăng tốc khi đa thức × $e^x$/sin/cos

Khi $u$ là đa thức (đạo hàm sẽ về $0$ sau hữu hạn bước) và $dv$ dễ tích phân liên tục ($e^x$, $\\sin x$, $\\cos x$), thay vì viết "từng phần $n$ lần", lập bảng: cột trái đạo hàm $u$ tới $0$, cột phải tích phân $dv$, rồi **nhân chéo với dấu $+,-,+,-,\\dots$**. Tính lại ví dụ 4 $\\int x^2 e^x\\,dx$:

\`\`\`
 dấu | đạo hàm (u)  | tích phân (dv)
 ----+--------------+----------------
  +  |    x²        |     eˣ
  −  |    2x        |     eˣ
  +  |    2         |     eˣ
     |    0  (dừng) |     eˣ
\`\`\`

Nhân chéo (đường chéo xuống) kèm dấu: $(+)\\,x^2 e^x + (-)\\,2x\\,e^x + (+)\\,2\\,e^x = e^x(x^2 - 2x + 2) + C$ — **cùng đáp án, nhanh hơn**. Bảng đặc biệt lợi với $\\int x^3\\sin x\\,dx$, $\\int x^4 e^x\\,dx$ (4 lần từng phần bằng tay rất dễ sai dấu).

> ❓ **"Có khi nào làm hoài không hết?"** Có dạng *vòng lặp* khi cả $u$ lẫn $dv$ đều "tái sinh" (trig × exp): $\\int e^x\\cos x\\,dx$. Từng phần **hai lần** thì tích phân gốc xuất hiện lại ở vế phải, ta **giải như phương trình ẩn $I$**. Chi tiết từng bước:
> $$\\begin{aligned}
> I &= \\int e^x\\cos x\\,dx \\\\
> &= e^x\\cos x - \\int e^x(-\\sin x)\\,dx && (u=\\cos x,\\ dv=e^x dx) \\\\
> &= e^x\\cos x + \\int e^x\\sin x\\,dx \\\\
> &= e^x\\cos x + \\Big(e^x\\sin x - \\int e^x\\cos x\\,dx\\Big) && (\\text{từng phần lần 2}) \\\\
> I &= e^x(\\cos x + \\sin x) - I \\\\
> 2I &= e^x(\\cos x + \\sin x) \\;\\Rightarrow\\; I = \\tfrac{1}{2}e^x(\\cos x + \\sin x) + C
> \\end{aligned}$$

> ⚠ **Lỗi thường gặp — chọn $u$ ngược LIATE.** Với $\\int x\\ln x\\,dx$, nếu vội chọn $u=x$ (Algebra) thì $dv=\\ln x\\,dx$ — nhưng $\\int\\ln x\\,dx$ *bản thân đã cần từng phần*, làm bài rối thêm. LIATE bảo $L$ trước $A$ → phải chọn $u=\\ln x$. Hệ quả của chọn sai: tích phân mới **khó hơn hoặc ngang** tích phân cũ — đó là tín hiệu "đổi lựa chọn $u/dv$".

> ⚠ **Lỗi thường gặp — quên dấu trừ giữa $uv$ và $\\int v\\,du$.** Công thức là $uv \\,\\boldsymbol{-}\\, \\int v\\,du$, không phải $uv + \\int v\\,du$. Mất dấu trừ là lỗi sai số phổ biến nhất; luôn viết rõ dấu trừ trước khi tính tích phân thứ hai.

> 🔁 **Tự kiểm tra (đơn).** Tính $\\int x\\cdot\\cos x\\,dx$.
> <details><summary>Đáp án</summary>$u=x, dv=\\cos x\\,dx \\to v=\\sin x$. $\\Rightarrow x\\sin x - \\int\\sin x\\,dx = x\\sin x + \\cos x + C$. Verify: $\\sin x + x\\cos x - \\sin x = x\\cos x$ ✓.</details>

> 🔁 **Tự kiểm tra (LIATE — chọn $u$ là $\\arctan$).** Tính $\\int \\arctan x\\,dx$.
> <details><summary>Đáp án</summary>Chỉ có $\\arctan x$ → coi như $\\arctan x\\cdot 1$. LIATE: $I$ → $u=\\arctan x$, $dv=dx$. $du = \\frac{dx}{1+x^2}$, $v=x$. $\\Rightarrow x\\arctan x - \\int\\frac{x}{1+x^2}\\,dx$. Tích phân còn lại đổi biến $w=1+x^2$: $= \\frac{1}{2}\\ln(1+x^2)$. Vậy $\\int\\arctan x\\,dx = x\\arctan x - \\frac{1}{2}\\ln(1+x^2) + C$. Verify: $\\arctan x + \\frac{x}{1+x^2} - \\frac{x}{1+x^2} = \\arctan x$ ✓.</details>

> 📝 **Tóm tắt mục 2.** $\\int u\\,dv = uv - \\int v\\,du$ — **product rule chạy ngược**, biến tích phân khó thành (hi vọng) dễ hơn. Chọn $u$ theo **LIATE** (Log → Inverse → Algebra → Trig → Exp): mảnh "dễ đạo hàm/khó tích phân" làm $u$. Đa thức × $e^x$/trig → dùng **bảng (tabular)** cho nhanh. Dạng *vòng lặp* ($\\int e^x\\cos x\\,dx$): từng phần hai lần rồi giải như phương trình ẩn $I$. Nhớ **dấu trừ** giữa $uv$ và $\\int v\\,du$.

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

#### 4.1. Walk-through chi tiết #1 — mẫu hai nghiệm phân biệt

Tính $\\displaystyle\\int \\frac{3x+5}{x^2+x-2}\\,dx$ từng bước:

$$\\begin{aligned}
\\text{(B1) Phân tích mẫu:}\\quad & x^2 + x - 2 = (x+2)(x-1) \\\\
\\text{(B2) Đặt dạng tách:}\\quad & \\frac{3x+5}{(x+2)(x-1)} = \\frac{A}{x+2} + \\frac{B}{x-1} \\\\
\\text{(B3) Quy đồng:}\\quad & 3x + 5 = A(x-1) + B(x+2) \\\\
\\text{(B4) Thay nghiệm để tìm }A,B:\\quad & x=1:\\ 8 = B(3) \\Rightarrow B = \\tfrac{8}{3} \\\\
& x=-2:\\ -1 = A(-3) \\Rightarrow A = \\tfrac{1}{3} \\\\
\\text{(B5) Tích phân từng mảnh:}\\quad & \\int\\!\\Big(\\tfrac{1/3}{x+2} + \\tfrac{8/3}{x-1}\\Big)dx = \\tfrac{1}{3}\\ln|x+2| + \\tfrac{8}{3}\\ln|x-1| + C
\\end{aligned}$$

*Verify nhanh hệ số:* $A + B = \\frac{1}{3} + \\frac{8}{3} = 3$ phải bằng hệ số của $x$ ở tử ($3$) ✓.

#### 4.2. Walk-through chi tiết #2 — nghiệm bội (lặp)

Khi mẫu có nhân tử lặp $(x-r)^2$, phải tách thành **đủ các bậc**: $\\frac{A}{x-r} + \\frac{B}{(x-r)^2}$ (không chỉ một mảnh). Tính $\\displaystyle\\int \\frac{x+1}{x^2(x-1)}\\,dx$:

$$\\begin{aligned}
\\frac{x+1}{x^2(x-1)} &= \\frac{A}{x} + \\frac{B}{x^2} + \\frac{C}{x-1} \\\\
x+1 &= A\\,x(x-1) + B(x-1) + C\\,x^2 \\\\
x=0:&\\quad 1 = B(-1) \\Rightarrow B = -1 \\\\
x=1:&\\quad 2 = C(1) \\Rightarrow C = 2 \\\\
\\text{so hệ số }x^2:&\\quad 0 = A + C \\Rightarrow A = -2 \\\\
\\int &= -2\\ln|x| - \\int\\! x^{-2}\\,dx + 2\\ln|x-1| = -2\\ln|x| + \\tfrac{1}{x} + 2\\ln|x-1| + C
\\end{aligned}$$

Lưu ý $\\int \\frac{B}{x^2}\\,dx = \\int -x^{-2}\\,dx = +\\frac{1}{x}$ — mảnh bậc 2 **không** ra $\\ln$ mà ra lũy thừa.

> ⚠ **Lỗi thường gặp — quên mảnh bậc cao của nghiệm bội.** Với mẫu $(x-1)^2$, viết chỉ $\\frac{A}{x-1}$ là **thiếu**; bắt buộc có cả $\\frac{B}{(x-1)^2}$. Tương tự $(x-1)^3$ cần ba mảnh.

> ⚠ **Lỗi thường gặp — nhân tử bậc 2 vô nghiệm.** Nếu mẫu chứa $x^2 + 1$ (không tách được trên số thực), mảnh tương ứng phải là $\\frac{Bx + C}{x^2+1}$ (tử bậc 1), không phải hằng số. Mảnh này tích phân ra $\\ln$ (phần $Bx$) cộng $\\arctan$ (phần $C$).

> ❓ **"Tách hệ số A, B kiểu gì cho nhanh?"** **Phương pháp che (cover-up):** để tìm hệ số của $\\frac{1}{x-r}$, che $(x-r)$ ở mẫu rồi thay $x=r$ vào phần còn lại. Ví dụ 1: hệ số của $\\frac{1}{x-1}$ = $\\frac{1}{x+1}\\big|_{x=1} = \\frac{1}{2}$. (Cover-up chỉ áp được cho nghiệm **đơn**; nghiệm bội và nhân tử bậc 2 phải quy đồng và so hệ số như mục 4.2.)

> ⚠ **Bậc tử ≥ bậc mẫu?** Phải **chia đa thức trước** để tách phần nguyên, rồi mới phân tích phần dư. Ví dụ $\\frac{x^2}{x^2-1} = 1 + \\frac{1}{x^2-1}$.

> 🔁 **Dừng lại tự kiểm tra (nghiệm đơn).** Tách rồi tính $\\int \\frac{5}{(x-2)(x+3)}\\,dx$.
> <details><summary>Đáp án</summary>Cover-up: hệ số của $\\frac{1}{x-2}$ = $\\frac{5}{x+3}\\big|_{x=2} = \\frac{5}{5} = 1$; của $\\frac{1}{x+3}$ = $\\frac{5}{x-2}\\big|_{x=-3} = \\frac{5}{-5} = -1$. $\\Rightarrow \\int\\left(\\frac{1}{x-2} - \\frac{1}{x+3}\\right)dx = \\ln|x-2| - \\ln|x+3| + C = \\ln\\left|\\frac{x-2}{x+3}\\right| + C$.</details>

> 🔁 **Dừng lại tự kiểm tra (nghiệm bội).** Tách $\\frac{1}{x(x+1)^2}$ thành tổng các phân thức đơn.
> <details><summary>Đáp án</summary>$\\frac{1}{x(x+1)^2} = \\frac{A}{x} + \\frac{B}{x+1} + \\frac{C}{(x+1)^2}$. Quy đồng: $1 = A(x+1)^2 + Bx(x+1) + Cx$. $x=0: 1 = A$. $x=-1: 1 = C(-1) \\Rightarrow C=-1$. So hệ số $x^2: 0 = A+B \\Rightarrow B=-1$. Vậy $\\frac{1}{x} - \\frac{1}{x+1} - \\frac{1}{(x+1)^2}$. Tích phân: $\\ln|x| - \\ln|x+1| + \\frac{1}{x+1} + C$.</details>

> 📝 **Tóm tắt mục 4.** Phân thức hữu tỉ (bậc tử < mẫu) tách thành tổng các mảnh: nghiệm đơn $\\to \\frac{A}{x-r}$ (ra $A\\ln|x-r|$); nghiệm bội $(x-r)^k \\to \\frac{A_1}{x-r}+\\dots+\\frac{A_k}{(x-r)^k}$; nhân tử bậc 2 vô nghiệm $\\to \\frac{Bx+C}{x^2+\\dots}$ (ra $\\ln + \\arctan$). **Cover-up** tìm hệ số nhanh cho nghiệm đơn; nghiệm bội/bậc 2 phải quy đồng & so hệ số. Bậc tử ≥ mẫu → **chia đa thức trước**. Nếu tử đúng bằng đạo hàm của mẫu → đổi biến gọn hơn tách.

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

💡 **Trực giác — đọc tích phân như đọc triệu chứng.** Mỗi kỹ thuật khớp với một "dấu hiệu hình dạng". Lướt mắt nhận diện dấu hiệu trước, đừng cắm đầu tính. Bảng tra đầy đủ, kèm **ví dụ mẫu** cho từng dạng:

| Thấy trong tích phân | Thử trước | Ví dụ mẫu | Kết quả |
|----------------------|-----------|-----------|---------|
| Một cụm + đạo hàm của cụm đó | **Đổi biến** ($u$-sub) | $\\int 2x\\cos(x^2)dx$ | $\\sin(x^2)+C$ |
| Tử = đạo hàm của mẫu | **Đổi biến** ($u=$ mẫu) | $\\int\\frac{2x}{x^2+1}dx$ | $\\ln(x^2+1)+C$ |
| Tích đa thức × $e^x$/sin/cos | **Từng phần** + bảng | $\\int x\\sin x\\,dx$ | $-x\\cos x+\\sin x+C$ |
| Có $\\ln x$ hoặc $\\arctan x$ đứng lẻ | **Từng phần** ($u$=log/inverse) | $\\int\\ln x\\,dx$ | $x\\ln x - x + C$ |
| Trig × exp (vòng lặp) | **Từng phần ×2** → giải ẩn $I$ | $\\int e^x\\cos x\\,dx$ | $\\frac{1}{2}e^x(\\cos x+\\sin x)+C$ |
| Căn $\\sqrt{a^2 - x^2}$ | **Trig sub** $x=a\\sin\\theta$ | $\\int\\sqrt{1-x^2}dx$ | $\\frac12(\\arcsin x + x\\sqrt{1-x^2})+C$ |
| Căn $\\sqrt{a^2 + x^2}$ hoặc $\\frac{1}{x^2+a^2}$ | **Trig sub** $x=a\\tan\\theta$ | $\\int\\frac{dx}{x^2+4}$ | $\\frac12\\arctan\\frac{x}{2}+C$ |
| Căn $\\sqrt{x^2 - a^2}$ | **Trig sub** $x=a\\sec\\theta$ | $\\int\\sqrt{x^2-1}dx$ | $\\frac12(x\\sqrt{x^2-1}-\\ln|x+\\sqrt{x^2-1}|)+C$ |
| Phân thức hữu tỉ, mẫu tách được, **bậc tử < mẫu** | **Phân thức đơn giản** | $\\int\\frac{1}{x^2-1}dx$ | $\\frac12\\ln\\left|\\frac{x-1}{x+1}\\right|+C$ |
| Phân thức, **bậc tử ≥ mẫu** | **Chia đa thức trước**, rồi tách | $\\int\\frac{x^2}{x^2-1}dx$ | $x + \\frac12\\ln\\left|\\frac{x-1}{x+1}\\right|+C$ |
| Cận $\\pm\\infty$ hoặc hàm vọt vô cực trong miền | **Suy rộng** (đặt $\\lim$) | $\\int_1^\\infty\\frac{dx}{x^2}$ | $1$ (hội tụ) |

❓ **"Một bài có thể cần nhiều kỹ thuật không?"** Rất thường. Ví dụ $\\int\\arctan x\\,dx$ (mục 2.1 self-check): **từng phần** trước, rồi tích phân còn lại cần **đổi biến**. Hay $\\int\\frac{1}{x^2\\sqrt{x^2-1}}dx$: **trig sub** rồi mới ra trig đơn giản. Quy tắc: chọn kỹ thuật làm tích phân **đơn giản đi một bậc**, rồi lặp lại quy trình nhận diện trên phần còn lại.

> 🔁 **Dừng lại tự kiểm tra (chọn kỹ thuật, chưa cần tính).** Mỗi tích phân dưới nên thử kỹ thuật nào trước? (a) $\\int x^2 e^{x^3}dx$; (b) $\\int x\\ln x\\,dx$; (c) $\\int\\frac{dx}{\\sqrt{9-x^2}}$; (d) $\\int\\frac{3}{(x-1)(x+2)}dx$.
> <details><summary>Đáp án</summary>(a) **Đổi biến** $u=x^3$ ($du=3x^2dx$ — có sẵn $x^2$). (b) **Từng phần**, $u=\\ln x$ (LIATE: L trước A). (c) **Trig sub** $x=3\\sin\\theta$ (dạng $\\sqrt{a^2-x^2}$, $a=3$). (d) **Phân thức đơn giản** (mẫu tách sẵn, bậc tử 0 < bậc mẫu 2).</details>

> 📝 **Tóm tắt.** Bốn kỹ thuật = bốn cách "biến lạ về quen": đổi biến (hàm hợp ngược), từng phần (tích ngược), lượng giác hoá (khử căn), phân thức (tách phân số). Suy rộng = tích phân + giới hạn. p-test: $\\infty$ cần $p>1$, kỳ dị tại 0 cần $p<1$.

---

## 7. Bài tập

1. Tính $\\int x\\cdot\\ln x\\,dx$.
2. Tính $\\int_0^{\\pi/2} x\\cdot\\cos x\\,dx$.
3. Tính $\\int \\frac{1}{x^2+4}\\,dx$.
4. Tính $\\int \\frac{1}{(x-2)(x+1)}\\,dx$.
5. Tích phân suy rộng $\\int_2^\\infty \\frac{1}{x^3}\\,dx$ hội tụ hay phân kỳ? Bằng bao nhiêu?
6. Tính $\\int_0^2 x^3\\sqrt{x^2+1}\\,dx$ (gợi ý: đổi biến, **nhớ đổi cận**).
7. Tính $\\int x^2\\sin x\\,dx$ (gợi ý: từng phần hai lần hoặc bảng).
8. Tính $\\int \\frac{2x+1}{x^2+x}\\,dx$ (phân thức hữu tỉ).
9. Tính $\\int \\frac{dx}{\\sqrt{9-x^2}}$ (đổi biến lượng giác).

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

**Bài 6.** $\\int_0^2 x^3\\sqrt{x^2+1}\\,dx$. Đặt $u = x^2+1 \\Rightarrow x^2 = u-1$, $du = 2x\\,dx \\Rightarrow x\\,dx = \\frac12 du$. Tách $x^3\\,dx = x^2\\cdot x\\,dx = (u-1)\\cdot\\frac12 du$. Đổi cận: $x=0\\Rightarrow u=1$, $x=2\\Rightarrow u=5$.
⇒ $\\frac12\\int_1^5 (u-1)\\sqrt{u}\\,du = \\frac12\\int_1^5 (u^{3/2} - u^{1/2})\\,du = \\frac12\\Big[\\frac{2}{5}u^{5/2} - \\frac{2}{3}u^{3/2}\\Big]_1^5$.
Tại $u=5$: $\\frac25\\cdot5^{5/2} - \\frac23\\cdot5^{3/2} = \\frac25\\cdot25\\sqrt5 - \\frac23\\cdot5\\sqrt5 = 10\\sqrt5 - \\frac{10\\sqrt5}{3} = \\frac{20\\sqrt5}{3}$. Tại $u=1$: $\\frac25 - \\frac23 = -\\frac{4}{15}$.
⇒ $\\frac12\\Big(\\frac{20\\sqrt5}{3} + \\frac{4}{15}\\Big) = \\frac{10\\sqrt5}{3} + \\frac{2}{15} \\approx 7.45 + 0.13 = 7.58$.

**Bài 7.** $\\int x^2\\sin x\\,dx$. Bảng (tabular), $u=x^2$ đạo hàm tới 0, $dv=\\sin x\\,dx$ tích phân liên tục ($\\sin\\to-\\cos\\to-\\sin\\to\\cos$):

\`\`\`
 dấu | đạo hàm | tích phân
 ----+---------+-----------
  +  |   x²    |  −cos x
  −  |   2x    |  −sin x
  +  |   2     |   cos x
     |   0     |
\`\`\`

Nhân chéo: $(+)x^2(-\\cos x) + (-)2x(-\\sin x) + (+)2(\\cos x) = -x^2\\cos x + 2x\\sin x + 2\\cos x + C$.
*Verify:* $\\frac{d}{dx} = (-2x\\cos x + x^2\\sin x) + (2\\sin x + 2x\\cos x) + (-2\\sin x) = x^2\\sin x$ ✓.

**Bài 8.** $\\int \\frac{2x+1}{x^2+x}\\,dx$. Để ý tử $2x+1$ **đúng bằng đạo hàm của mẫu** $x^2+x$ → đổi biến $u=x^2+x$, $du=(2x+1)dx$. ⇒ $\\int\\frac{du}{u} = \\ln|u| = \\ln|x^2+x| + C$. (Có thể tách phân thức $\\frac{2x+1}{x(x+1)} = \\frac{1}{x} + \\frac{1}{x+1}$ cũng ra $\\ln|x|+\\ln|x+1| = \\ln|x^2+x|+C$ — cùng kết quả; đổi biến gọn hơn.)

**Bài 9.** $\\int \\frac{dx}{\\sqrt{9-x^2}}$. Dạng $\\sqrt{a^2-x^2}$ với $a=3$ → đặt $x=3\\sin\\theta$, $dx=3\\cos\\theta\\,d\\theta$, $\\sqrt{9-x^2}=3\\cos\\theta$.
⇒ $\\int\\frac{3\\cos\\theta}{3\\cos\\theta}\\,d\\theta = \\int d\\theta = \\theta + C = \\arcsin\\frac{x}{3} + C$.
*Verify:* $\\frac{d}{dx}\\arcsin\\frac{x}{3} = \\frac{1/3}{\\sqrt{1-x^2/9}} = \\frac{1}{3}\\cdot\\frac{3}{\\sqrt{9-x^2}} = \\frac{1}{\\sqrt{9-x^2}}$ ✓.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 4 module tương tác: tích phân từng phần (chọn hàm, xem u/dv & kết quả), đổi biến lượng giác (diện tích cung tròn), phân thức (tách & tích phân), và p-test suy rộng (kéo p, b xem hội tụ/phân kỳ).

## 9. Bài tiếp theo

- [Lesson 10 — Giải tích tham số & toạ độ cực](../lesson-10-parametric-polar-calculus/) — áp các kỹ thuật tích phân này lên đường cong cho dưới dạng tham số và hệ toạ độ cực.
- Chuỗi & khai triển Taylor (dùng tích phân từng phần để ước lượng phần dư): [Math/06-Advanced/lesson-06-series-taylor](../../06-Advanced/lesson-06-series-taylor/).
- Tích phân suy rộng $\\int_0^\\infty e^{-x}$ là nền của phân phối liên tục: [Math/06-Advanced/lesson-08-probability-statistics](../../06-Advanced/lesson-08-probability-statistics/).
`;
