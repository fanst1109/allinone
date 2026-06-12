# Lesson 05 — Bất phương trình

## Mục tiêu học tập

- Hiểu **bất phương trình** vs phương trình — và ý nghĩa "tập nghiệm".
- Giải bất phương trình bậc 1 và bậc 2.
- Áp dụng **xét dấu tam thức bậc 2**.
- Vẽ **miền nghiệm** trên trục số.
- Dùng **ký hiệu khoảng** (hợp/giao) và giải **bất phương trình chứa trị tuyệt đối $|x|$**.
- Lập **bảng xét dấu** cho **bất phương trình tích/thương**.
- Giải **hệ bất phương trình** (lấy giao các tập nghiệm).

## Kiến thức tiền đề

- [Lesson 04 — Phương trình bậc 2](../lesson-04-quadratic-equations/).

---

## 1. Bất phương trình

### 1.1. Định nghĩa

**Bất phương trình (inequality)** = "phương trình" nhưng thay dấu $=$ bằng $<$, $>$, $\le$, $\ge$.

💡 **Trực giác — chiếc cân lệch.** Nếu phương trình ($=$) là **chiếc cân thăng bằng** (2 đĩa ngang nhau), thì bất phương trình là **chiếc cân lệch** — một đĩa nặng hơn, nghiêng xuống. $A < B$ nghĩa là "đĩa A nhẹ hơn đĩa B", cân nghiêng về phía B. Phương trình hỏi *"x nào làm cân thăng bằng"* (thường ra 1-2 điểm), còn bất phương trình hỏi *"x nào làm cân nghiêng đúng chiều mình muốn"* (thường ra **cả một khoảng** các x).

Hình dung trên trục số: nghiệm của một bất phương trình không phải vài chấm rời rạc mà là **một đoạn liền** (hoặc vài đoạn) — "vùng" mà điều kiện đúng:

```
   phương trình  x = 2     →     ●            (1 điểm)
                          ──────┼──────────  x
                                2

   bất phương trình x < 2  →  ◄══════○         (cả một tia)
                          ──────────┼───────  x
                                    2
```

**Vì sao cần?** Vì rất nhiều bài toán đời thực không hỏi "bằng đúng bao nhiêu" mà hỏi "ít nhất / nhiều nhất / trong khoảng nào":
- Tốc độ xe phải $< 80$ km/h (giới hạn trên).
- Nhiệt độ phải $\ge 20^\circ$C để hoa nở (ngưỡng dưới).
- Lợi nhuận $> 0$ (doanh nghiệp lãi).
- Tuổi vào rạp phim $13+$: $x \ge 13$.
- Ngân sách: tổng chi $\le 5$ triệu.

**Tập nghiệm** = tập hợp mọi x thỏa mãn — thường là **khoảng** trên trục số, không phải điểm.

#### 1.1.1. Bốn dấu — đọc và ý nghĩa

| Dấu | Đọc | Lấy đầu mút? | Ví dụ tập nghiệm |
|-----|-----|:---:|---|
| $<$ | nhỏ hơn (strict) | Không | $x < 4 \to (-\infty, 4)$ |
| $\le$ | nhỏ hơn hoặc bằng | Có | $x \le 4 \to (-\infty, 4]$ |
| $>$ | lớn hơn (strict) | Không | $x > 4 \to (4, +\infty)$ |
| $\ge$ | lớn hơn hoặc bằng | Có | $x \ge 4 \to [4, +\infty)$ |

"Strict" (nghiêm ngặt: $<, >$) = **không** lấy đầu mút; "non-strict" ($\le, \ge$) = lấy cả đầu mút. Đây là gốc của quy ước ngoặc tròn/vuông ở mục 3.

### 1.2. Quy tắc giải

Giải bất phương trình bậc 1 **gần giống** giải phương trình bậc 1: chuyển vế, gộp số hạng đồng dạng, chia hệ số. Có **ba quy tắc biến đổi tương đương** (làm BPT mới có cùng tập nghiệm):

> **Quy tắc 1 — cộng/trừ.** Cộng (hoặc trừ) cùng một số (hoặc biểu thức) vào cả 2 vế → **giữ nguyên** chiều dấu. Vd $x - 3 < 5 \Rightarrow x < 8$ (cộng 3 hai vế).
>
> **Quy tắc 2 — nhân/chia số DƯƠNG.** Nhân/chia cả 2 vế với số **dương** → **giữ nguyên** chiều dấu. Vd $2x < 8 \Rightarrow x < 4$ (chia 2 > 0).
>
> **Quy tắc 3 — nhân/chia số ÂM.** Nhân/chia cả 2 vế với số **âm** → **PHẢI đảo chiều** dấu. Vd $-2x < 8 \Rightarrow x > -4$ (chia $-2$, đổi $<$ thành $>$).

⚠ **Khi nhân/chia cả 2 vế với số ÂM, phải đảo dấu bất đẳng thức** ($< \iff >$, $\le \iff \ge$). Đây là quy tắc hay quên nhất.

💡 **Vì sao nhân số âm phải đảo dấu — bằng số cụ thể.** Lấy một bất đẳng thức chắc chắn đúng: $2 < 3$. Nhân cả 2 vế với $-1$:

```
   2  <  3            (đúng)
  ───────────────────────────── trục số
  ◄─┬──┬──┬──┬──┬──┬──┬──┬──┬─►
   -3 -2 -1  0  1  2  3
        ●           ●
       -2 ........ 2 và 3 ở bên phải, nhỏ bên trái

   nhân -1:  điểm 2 → -2,  điểm 3 → -3
   trên trục:  -3  nằm BÊN TRÁI  -2
   nên  -2  >  -3            (chiều ĐẢO lại!)
```

Số âm "lật" toàn bộ thứ tự trên trục số: cái gì đang lớn hơn (xa bên phải) sau khi nhân $-1$ trở thành nhỏ hơn (xa bên trái). Nên nếu không đảo dấu ta sẽ viết sai $-2 < -3$ (vô lý). **Bốn ví dụ kiểm chứng quy tắc 3:**

| Gốc (đúng) | Nhân với | Kết quả ĐÚNG (đã đảo) | Nếu KHÔNG đảo (sai) |
|---|---|---|---|
| $2 < 3$ | $-1$ | $-2 > -3$ ✓ | $-2 < -3$ ✗ |
| $1 < 5$ | $-2$ | $-2 > -10$ ✓ | $-2 < -10$ ✗ |
| $-4 < -1$ | $-1$ | $4 > 1$ ✓ | $4 < 1$ ✗ |
| $6 > 2$ | $-3$ | $-18 < -6$ ✓ | $-18 > -6$ ✗ |

### 1.3. Ví dụ — giải từng bước + trục số nghiệm

**Ví dụ 1** (chia số dương): $2x + 3 < 11$.

$$\begin{aligned}
2x + 3 &< 11 \\
2x &< 8 &&\text{(trừ 3 — quy tắc 1, giữ dấu)} \\
x &< 4 &&\text{(chia 2 > 0 — quy tắc 2, giữ dấu)}
\end{aligned}$$

Tập nghiệm $(-\infty, 4)$:

```
  ◄══════════════════○            ○ = không lấy 4
  ──────────────────┼─────────  x
                    4
```

**Ví dụ 2** (chia số âm → ĐẢO DẤU): $-3x + 6 \ge 0$.

$$\begin{aligned}
-3x + 6 &\ge 0 \\
-3x &\ge -6 &&\text{(trừ 6)} \\
x &\le 2 &&\text{(chia } -3 < 0 \text{ → đổi } \ge \text{ thành } \le)
\end{aligned}$$

Tập nghiệm $(-\infty, 2]$:

```
  ◄═════════════════●              ● = lấy 2 (vì \le)
  ─────────────────┼─────────  x
                   2
```

**Ví dụ 3** (biến ở cả 2 vế): $5x - 2 \le 3x + 8$.

$$\begin{aligned}
5x - 2 &\le 3x + 8 \\
5x - 3x &\le 8 + 2 &&\text{(gom x trái, số phải)} \\
2x &\le 10 \\
x &\le 5 &&\text{(chia 2 > 0 — giữ dấu)}
\end{aligned}$$

Tập nghiệm $(-\infty, 5]$.

**Ví dụ 4** (kết quả gom về biến âm → đảo): $7 - 4x > 2x + 1$.

$$\begin{aligned}
7 - 4x &> 2x + 1 \\
-4x - 2x &> 1 - 7 \\
-6x &> -6 \\
x &< 1 &&\text{(chia } -6 < 0 \text{ → đổi } > \text{ thành } <)
\end{aligned}$$

Tập nghiệm $(-\infty, 1)$. Lưu ý dù vế trái ban đầu trông "lớn", việc gom $x$ ra hệ số âm vẫn bắt ta đảo dấu khi chia.

### 1.4. Verify nghiệm BPT bằng cách thử điểm

Tập nghiệm là khoảng → **thử 1 điểm trong và 1 điểm ngoài** để chắc đúng cả chiều lẫn đầu mút.

- Ví dụ 1 ($x<4$): thử $x=0$ (trong): $2\cdot 0+3 = 3 < 11$ ✓; thử $x=5$ (ngoài): $2\cdot 5 + 3 = 13 < 11$ **sai** ✓ (đúng là ngoài tập).
- Ví dụ 2 ($x\le 2$): thử $x=0$ (trong): $-3\cdot 0 + 6 = 6 \ge 0$ ✓; thử $x=3$ (ngoài): $-3\cdot 3 + 6 = -3 \ge 0$ **sai** ✓.
- Ví dụ 4 ($x<1$): thử $x=0$: $7 > 1$ ✓; thử $x=2$: $7-8=-1 > 5$ sai ✓. **Mẹo**: nếu thử điểm "trong" mà BPT sai, gần như chắc chắn bạn **quên đảo dấu** ở đâu đó.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nhân số âm phải đảo dấu?"* Vì số âm "lật" thứ tự trục số. $3 < 5$ đúng, nhân cả 2 với $-1$: $-3$ và $-5$, mà $-3 > -5$ → phải đổi $<$ thành $>$ (xem bảng 4 ví dụ ở mục 1.2).
- *"Ngoặc tròn `(` hay vuông `[` khi nào?"* Vuông $[\ ]$ khi **lấy cả** đầu mút (dấu $\le, \ge$); tròn $(\ )$ khi **không lấy** (dấu $<, >$, và luôn dùng cho $\pm\infty$ vì vô cực không phải số để "lấy").
- *"Khi chỉ CỘNG/TRỪ thì có bao giờ phải đảo không?"* **Không.** Đảo dấu chỉ xảy ra khi **nhân hoặc chia** với số **âm**. Cộng/trừ luôn giữ nguyên chiều — vì dịch cả 2 đĩa cân cùng một lượng không làm đổi bên nào nặng hơn.
- *"Nếu nhân với một biểu thức chứa x (vd $x-1$) thì sao?"* **Rất nguy hiểm** — vì $x-1$ có thể âm hoặc dương tùy x, ta không biết có đảo dấu hay không. Đây là lỗi kinh điển ở BPT có mẫu (xem mục 4 và ⚠ ở đó). Cách an toàn: **chuyển hết về một vế rồi xét dấu**, không nhân chéo.

🔁 **Dừng lại tự kiểm tra**: giải $-2x + 1 \ge 7$.

<details><summary>Đáp án</summary>

$-2x \ge 6$ → chia $-2$ (đảo dấu) → $x \le -3$. Tập nghiệm $(-\infty, -3]$. Verify: thử $x=-4$ (trong): $-2(-4)+1 = 9 \ge 7$ ✓; thử $x=0$ (ngoài): $1 \ge 7$ sai ✓.

</details>

### 📝 Tóm tắt mục 1

- BPT thay $=$ bằng $<, >, \le, \ge$; nghiệm là **khoảng**, không phải điểm. Trực giác: chiếc cân lệch.
- Giải như PT với 3 quy tắc: cộng/trừ (giữ dấu), nhân/chia số dương (giữ dấu), nhân/chia số âm (**đảo dấu**).
- $[\ ]$ lấy đầu mút (dấu $\le, \ge$), $(\ )$ không lấy (dấu $<, >$); $\infty$ luôn dùng $($.
- Verify bằng thử 1 điểm trong + 1 điểm ngoài; sai ở điểm "trong" thường là dấu hiệu quên đảo dấu.

---

## 2. Bất phương trình bậc 2 — Xét dấu tam thức

### 2.1. Tam thức bậc 2

**Tam thức bậc 2 (quadratic trinomial)** $f(x) = ax^2 + bx + c$ (với $a \neq 0$).

💡 **Trực giác — parabol cắt trục hoành ở đâu.** Đồ thị $y = ax^2 + bx + c$ là một **parabol**. Dấu của $f(x)$ chính là **đồ thị nằm trên hay dưới trục Ox**: $f(x) > 0$ ⟺ parabol ở **trên** trục (phần dương), $f(x) < 0$ ⟺ parabol ở **dưới** trục. Nghiệm $x_1, x_2$ là chỗ parabol **cắt** trục Ox (giá trị 0). Nên giải BPT bậc 2 = "nhìn parabol, hỏi nó ở trên hay dưới trục trong vùng nào".

```
   a > 0 (parabol mở lên):              a < 0 (parabol mở xuống):
        \         /                          ___
   (+)   \  (-)  /   (+)                  /       \
   ───────●─────●────── x             ───●─────────●─── x
          x₁    x₂                  (-) / (+)       \ (-)
        ngoài: + ; trong: -          ngoài: - ; trong: +
```

**Quy tắc xét dấu** (với $a > 0$, $\Delta > 0$, nghiệm $x_1 < x_2$):

$$\begin{array}{c|ccccc} x & & x_1 & & x_2 & \\ \hline f(x) & + & 0 & - & 0 & + \end{array}$$

- **Bên ngoài 2 nghiệm** ($x < x_1$ hoặc $x > x_2$): $f(x)$ **cùng dấu** với $a$.
- **Bên trong 2 nghiệm** ($x_1 < x < x_2$): $f(x)$ **trái dấu** với $a$.

Quy tắc nhớ: "**trong trái, ngoài cùng**" (trong khoảng 2 nghiệm thì trái dấu $a$, ngoài thì cùng dấu $a$). Nhìn lại 2 hình parabol trên để thấy vì sao: phần parabol ở giữa 2 giao điểm luôn nằm **ngược phía** so với 2 nhánh vươn ra vô cực.

### 2.2. Quy trình 4 bước giải BPT bậc 2

> **Bước 1 — đưa về dạng chuẩn** một vế bằng 0: $ax^2 + bx + c \ \square\ 0$ (với $\square$ là $<, \le, >, \ge$). Nếu $a < 0$, có thể nhân $-1$ cả 2 vế (NHỚ đảo dấu BPT) để được $a > 0$ cho dễ.
>
> **Bước 2 — tìm nghiệm** của $ax^2+bx+c = 0$ (tính $\Delta$, dùng công thức nghiệm). Đây là các "mốc đổi dấu".
>
> **Bước 3 — lập bảng xét dấu / nhớ "trong trái ngoài cùng"** để biết dấu $f(x)$ trên từng vùng.
>
> **Bước 4 — chọn vùng theo dấu BPT.** Cần $f(x) < 0$ → lấy vùng dấu $-$; cần $f(x) > 0$ → lấy vùng dấu $+$. Dấu $\le, \ge$ thì **lấy thêm** các nghiệm (đầu mút).

### 2.3. Walk-through giải bất phương trình bậc 2 — 4 ví dụ

**Ví dụ 1** ($\Delta>0$, lấy "trong"): $x^2 - 5x + 6 < 0$.
- Bước 1: đã chuẩn, $a = 1 > 0$.
- Bước 2: $x^2 - 5x + 6 = 0 \to x = 2$ hoặc $x = 3$.
- Bước 3: $a>0$ → ngoài 2 nghiệm: $+$; trong: $-$.
- Bước 4: BPT $< 0$ → cần phần "trong" (dấu $-$), strict nên không lấy mút → **$2 < x < 3$**, tức $(2, 3)$.

```
        (+)      (-)      (+)
  ───────●═══════════●────────  x
         2           3
        lấy phần GIỮA (không lấy mút)
```

**Ví dụ 2** (cùng tam thức, lấy "ngoài" + mút): $x^2 - 5x + 6 \ge 0$.
- Nghiệm 2, 3; $a>0$. Cần "$+$" hoặc 0 → ngoài 2 nghiệm hoặc tại nghiệm (dấu $\ge$ lấy cả mút) → **$x \le 2$ hoặc $x \ge 3$**, tức $(-\infty, 2] \cup [3, +\infty)$.

**Ví dụ 3** ($a < 0$ — đổi dấu trước cho dễ): $-x^2 + 2x + 3 > 0$.
- Bước 1: nhân $-1$ cả 2 vế, **đảo dấu BPT**: $x^2 - 2x - 3 < 0$ (giờ $a = 1 > 0$).
- Bước 2: $x^2 - 2x - 3 = 0 \to x = 3$ hoặc $x = -1$.
- Bước 3: $a>0$ → trong: $-$, ngoài: $+$.
- Bước 4: cần $< 0$ → lấy "trong" → **$-1 < x < 3$**, tức $(-1, 3)$.

(Có thể giải trực tiếp không đổi dấu: với $-x^2+2x+3$, $a<0$ nên "trong dương, ngoài âm"; cần $>0$ → lấy "trong" → vẫn $-1 < x < 3$. Hai cách cho cùng kết quả.)

**Ví dụ 4** ($\Delta=0$, nghiệm kép): $x^2 - 6x + 9 \le 0$.
- Bước 2: $\Delta = 36 - 36 = 0$ → nghiệm kép $x = 3$. Tam thức $= (x-3)^2$.
- Vì $(x-3)^2 \ge 0$ với **mọi** x → chỉ $\le 0$ khi $= 0$, tức $x = 3$. Tập nghiệm: **$\{3\}$** (đúng một điểm).
- Nếu đề là $< 0$ (strict): $(x-3)^2 < 0$ **vô nghiệm** ($\varnothing$); nếu là $\ge 0$: đúng với **mọi x** ($\mathbb{R}$).

### 2.4. Ba trường hợp Δ — bảng tổng hợp

| $\Delta$ | Số nghiệm | Dấu $f(x)$ (giả sử $a>0$) | $f(x) > 0$ | $f(x) < 0$ |
|---|---|---|---|---|
| $\Delta > 0$ | 2 nghiệm $x_1 < x_2$ | $+$ ngoài, $-$ trong | $x<x_1$ hoặc $x>x_2$ | $x_1 < x < x_2$ |
| $\Delta = 0$ | nghiệm kép $x_0$ | $+$ mọi nơi, $=0$ tại $x_0$ | mọi $x \neq x_0$ | $\varnothing$ (vô nghiệm) |
| $\Delta < 0$ | vô nghiệm | $+$ với mọi x | mọi x ($\mathbb{R}$) | $\varnothing$ |

(Với $a < 0$ thì đảo "$+$" ↔ "$-$" trong cột dấu.)

- **$\Delta > 0$**: 2 nghiệm phân biệt, áp dụng "trong trái ngoài cùng".
- **$\Delta = 0$**: 1 nghiệm kép → $f(x) \ge 0$ cho mọi x ($a > 0$) hoặc $\le 0$ ($a < 0$), dấu "$=$" tại nghiệm.
- **$\Delta < 0$**: KHÔNG nghiệm → $f(x)$ cùng dấu $a$ cho mọi x.

### 2.5. Bảng xét dấu bằng số thật — verify không cần nhớ quy tắc

Với $f(x) = x^2 - 5x + 6$ (nghiệm 2, 3; $a=1>0$), thử từng vùng:

| Vùng | Điểm thử | f(điểm) | Dấu |
|------|----------|---------|:---:|
| $x < 2$ | $x = 0$ | $0-0+6 = 6$ | + |
| $2 < x < 3$ | $x = 2.5$ | $6.25-12.5+6 = -0.25$ | − |
| $x > 3$ | $x = 4$ | $16-20+6 = 2$ | + |

Đúng "trong trái (−), ngoài cùng (+)". Thử điểm là cách **không cần nhớ quy tắc** vẫn ra dấu — chọn một số "dễ tính" trong mỗi vùng (thường $0$, hoặc số nguyên gần nghiệm) rồi thay vào.

Thử thêm cho tam thức có $a < 0$: $g(x) = -x^2 + 2x + 3$ (nghiệm $-1, 3$):

| Vùng | Điểm thử | g(điểm) | Dấu |
|------|----------|---------|:---:|
| $x < -1$ | $x = -2$ | $-4 - 4 + 3 = -5$ | − |
| $-1 < x < 3$ | $x = 0$ | $0 + 0 + 3 = 3$ | + |
| $x > 3$ | $x = 4$ | $-16 + 8 + 3 = -5$ | − |

Khớp "trong dương (+), ngoài âm (−)" vì $a < 0$ — đảo lại so với $a>0$.

⚠ **Lỗi thường gặp ở BPT bậc 2**

- **Quên đổi dấu BPT khi nhân $-1$ để đưa $a$ về dương.** Vd $-x^2 + 2x + 3 > 0$ nhân $-1$ phải thành $x^2 - 2x - 3 < 0$ (đổi $>$ thành $<$), không phải $\ldots > 0$.
- **Áp sai "trong/ngoài" vì quên xét dấu $a$.** Quy tắc "trong trái ngoài cùng" so với **dấu của $a$**, không phải mặc định "trong âm". Khi $a < 0$ thì "trong dương".
- **Quên lấy đầu mút khi dấu $\le, \ge$.** $x^2 - 5x + 6 \ge 0$ phải có $x \le 2$ (lấy cả 2), không phải $x < 2$.
- **Nhầm "$\Delta < 0$ → vô nghiệm BPT".** $\Delta<0$ chỉ nói tam thức **không cắt trục**; BPT vẫn có thể đúng với mọi x. Vd $x^2+1>0$ đúng $\forall x$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$x^2+1 > 0$ giải sao khi không có nghiệm?"* $\Delta = 0 - 4 = -4 < 0$, $a>0$ → $f(x)$ **luôn dương** → BPT đúng với **mọi x** (tập nghiệm $\mathbb{R}$). Không cần xét dấu phức tạp. Ngược lại $x^2 + 1 < 0$ **vô nghiệm**.
- *"Lấy 'trong' hay 'ngoài'?"* Nhìn dấu BPT: cần $f(x)<0$ → lấy vùng dấu $-$; cần $f(x)>0$ → lấy vùng dấu $+$. Đừng quan tâm "trong/ngoài" trừu tượng — quan tâm **dấu** mình cần rồi khoanh vùng có dấu đó.
- *"Vì sao nghiệm kép cho ra điểm hoặc tập rỗng?"* Vì $(x-x_0)^2 \ge 0$ luôn: nó chạm 0 đúng tại $x_0$ và dương mọi nơi khác. Nên $\le 0$ chỉ tại 1 điểm, $< 0$ không bao giờ, $\ge 0$ mọi nơi.

🔁 **Dừng lại tự kiểm tra**: giải $x^2 - x - 6 > 0$.

<details><summary>Đáp án</summary>

Nghiệm $x^2-x-6=0$: $x = 3, x = -2$. $a>0$, cần $>0$ → lấy **ngoài**: $x < -2$ hoặc $x > 3$, tức $(-\infty, -2) \cup (3, +\infty)$. Verify: thử $x=0$ (trong): $-6 > 0$ sai ✓ (đúng là loại); thử $x=-3$ (ngoài): $9+3-6=6>0$ ✓.

</details>

### 📝 Tóm tắt mục 2

- Dấu $f(x)$ = parabol ở trên (+) hay dưới (−) trục Ox; nghiệm là chỗ cắt trục.
- Tam thức bậc 2: "trong trái, ngoài cùng" so với dấu của $a$.
- Quy trình 4 bước: chuẩn hóa → tìm nghiệm → xét dấu → chọn vùng theo dấu BPT (lấy mút nếu $\le, \ge$).
- 3 trường hợp $\Delta$: $>0$ (2 vùng đổi dấu), $=0$ (nghiệm kép → điểm/$\varnothing$/$\mathbb{R}$), $<0$ ($f$ cùng dấu $a$ với mọi x).
- Verify nhanh bằng **thử 1 điểm mỗi vùng** — không cần nhớ quy tắc.

---

## 3. Bất phương trình trị tuyệt đối & ký hiệu khoảng

### 3.1. Ký hiệu khoảng, hợp và giao

Tập nghiệm BPT thường viết bằng **khoảng (interval)**:
- $(a, b)$: $a < x < b$ (không lấy mút). $[a, b]$: $a \le x \le b$ (lấy cả 2 mút).
- $[a, b)$, $(a, b]$: lấy một mút (nửa đóng nửa mở).
- $(-\infty, b)$, $[a, +\infty)$: tia; phía $\infty$ **luôn** dùng ngoặc tròn.
- **Hợp (union)** $\cup$: gộp 2 khoảng rời. Vd $x < -2$ hoặc $x > 3$ viết $(-\infty, -2) \cup (3, +\infty)$.
- **Giao (intersection)** $\cap$: phần chung. Vd $x > 1$ và $x < 5$ viết $(1, 5)$.

💡 **Trực giác hợp vs giao trên trục số.** "Hoặc" (OR) → **hợp** $\cup$: lấy tất cả các vùng được tô bởi **ít nhất một** điều kiện. "Và" (AND) → **giao** $\cap$: chỉ lấy vùng được tô bởi **cả hai** điều kiện (chồng lên nhau).

```
   Giao  (x > 1) AND (x < 5):
   x>1:        ○════════════►
   x<5:   ◄═══════════○
   chung:      ●═══════●          → (1, 5)
          ─────┼───────┼──── x
               1       5

   Hợp  (x < -2) OR (x > 3):
   x<-2: ◄═════○
   x>3:               ○═════►
   gộp:  ◄═════○      ○═════►      → (-∞,-2) ∪ (3,+∞)
        ──────┼──────┼─────── x
             -2      3
```

**Bốn ví dụ đọc ngược từ điều kiện sang khoảng:**

| Điều kiện | Ký hiệu khoảng |
|---|---|
| $-3 \le x < 2$ | $[-3, 2)$ |
| $x > 0$ và $x \le 10$ | $(0, 10]$ |
| $x \le -1$ hoặc $x \ge 4$ | $(-\infty, -1] \cup [4, +\infty)$ |
| mọi số thực | $(-\infty, +\infty) = \mathbb{R}$ |

### 3.2. Bất phương trình chứa |x|

💡 **Trực giác**: $|x|$ là **khoảng cách từ x tới 0** trên trục số (luôn $\ge 0$). Nên:
- $|x| < k$ ($k>0$) $\iff$ x **gần 0 hơn k** $\iff -k < x < k$. (**một** khoảng, ở giữa)
- $|x| > k$ ($k>0$) $\iff$ x **xa 0 hơn k** $\iff x < -k$ hoặc $x > k$. (**hai** khoảng, hai bên)

```
   |x| < 3   "gần 0 hơn 3"          |x| > 3   "xa 0 hơn 3"
   ───●═══════════●───  x          ◄══●           ●══►  x
     -3    0      3                  -3    0       3
        một đoạn giữa                  hai tia ngoài
```

**Quy tắc tổng quát** (với $k > 0$):

$$|A| < k \iff -k < A < k \qquad\qquad |A| > k \iff A < -k \ \text{hoặc}\ A > k$$

(với $A$ là biểu thức bất kỳ theo $x$; $\le, \ge$ tương tự nhưng lấy thêm mút).

**Ví dụ 1**: $|x| < 3 \iff -3 < x < 3$, tức $(-3, 3)$.

**Ví dụ 2**: $|x - 2| \le 5 \iff -5 \le x-2 \le 5 \iff -3 \le x \le 7$, tức $[-3, 7]$.

**Ví dụ 3**: $|2x + 1| > 3 \iff 2x+1 > 3$ hoặc $2x+1 < -3 \iff x > 1$ hoặc $x < -2$, tức $(-\infty,-2) \cup (1,+\infty)$.

**Ví dụ 4** (hệ số trước x, dấu $\ge$): $|3x - 6| \ge 9$.
$$\begin{aligned}
|3x - 6| \ge 9 &\iff 3x - 6 \ge 9 \ \text{hoặc}\ 3x - 6 \le -9 \\
&\iff 3x \ge 15 \ \text{hoặc}\ 3x \le -3 \\
&\iff x \ge 5 \ \text{hoặc}\ x \le -1
\end{aligned}$$
Tập nghiệm: $(-\infty, -1] \cup [5, +\infty)$. Trục số:
```
  ◄═════════●           ●═════════►
  ──────────┼───────────┼────────  x
            -1          5
```

⚠ **Lỗi thường gặp**

- **Nhầm chiều.** $|x| < k$ ra **một** khoảng (ở giữa); $|x| > k$ ra **hai** khoảng (hai bên). Đừng đảo.
- **Quên trường hợp vế phải âm.** $|x| < -2$ **vô nghiệm** (khoảng cách không thể nhỏ hơn số âm), còn $|x| > -2$ **đúng với mọi x** (mọi khoảng cách đều $> -2$). Luôn kiểm tra dấu của $k$ trước.
- **Bỏ dấu trị tuyệt đối tùy tiện.** $|2x+1| > 3$ **không** thành $2x+1 > 3$ rồi bỏ luôn nhánh âm — phải có **cả hai** nhánh $2x+1>3$ và $2x+1<-3$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$|x-2|$ nghĩa là gì?"* Là **khoảng cách từ x tới 2**. $|x-2| \le 5$ = "các x cách 2 không quá 5 đơn vị" = $[-3, 7]$.
- *"Vì sao $|x|<k$ là MỘT khoảng còn $|x|>k$ là HAI?"* Vì "gần 0" là một vùng liền quanh 0; "xa 0" tách thành hai phía (trái và phải), ở giữa bị loại.

🔁 **Dừng lại tự kiểm tra**: giải $|x + 1| < 4$.

<details><summary>Đáp án</summary>

$-4 < x+1 < 4$ → $-5 < x < 3$, tức $(-5, 3)$. Verify: $x=0$: $|1|=1<4$ ✓; $x=4$: $|5|=5<4$ sai ✓.

</details>

### 📝 Tóm tắt mục 3

- Khoảng: $[\ ]$ lấy mút, $(\ )$ không; $\cup$ hợp (OR, gộp), $\cap$ giao (AND, chung); phía $\infty$ luôn $($.
- $|A| < k$ → một khoảng $-k<A<k$; $|A| > k$ → hai nhánh $A<-k$ hoặc $A>k$.
- $|x - a|$ = khoảng cách từ x tới a; nhớ kiểm tra dấu vế phải ($|A|<$ số âm → vô nghiệm).

---

## 4. Bất phương trình tích & thương — bảng xét dấu

💡 **Trực giác — luật dấu của phép nhân/chia.** Một tích $A \cdot B$ **dương** khi $A, B$ **cùng dấu** (cùng + hoặc cùng −), và **âm** khi **trái dấu**. Thương $A/B$ tuân đúng luật đó (nhưng thêm điều kiện $B \neq 0$). Nên giải $A\cdot B > 0$ hay $A/B < 0$ không cần khai triển — chỉ cần **theo dõi dấu của từng nhân tử trên trục số** rồi nhân các dấu lại. Công cụ làm việc này gọn gàng là **bảng xét dấu (sign table)**.

### 4.1. Quy trình lập bảng xét dấu — 5 bước

> **Bước 1 — chuyển hết về một vế**, vế kia bằng 0. (BPT tích/thương phải có dạng $\ldots \ \square\ 0$, KHÔNG nhân chéo — xem ⚠.)
>
> **Bước 2 — phân tích thành tích/thương các nhân tử bậc 1** (hoặc bậc 2 đã biết dấu).
>
> **Bước 3 — tìm nghiệm của từng nhân tử** (chỗ mỗi nhân tử bằng 0) và **nghiệm của mẫu** (chỗ biểu thức không xác định). Xếp các mốc này tăng dần trên trục.
>
> **Bước 4 — lập bảng**: mỗi nhân tử một hàng, đánh dấu $+/-$ trên từng vùng (nhân tử $x - r$ dương khi $x > r$, âm khi $x < r$); hàng cuối nhân các dấu lại. Tại nghiệm mẫu ghi $\|$ (không xác định).
>
> **Bước 5 — đọc nghiệm** theo dấu BPT cần, lưu ý: nghiệm tử lấy nếu $\le/\ge$, nghiệm **mẫu KHÔNG bao giờ lấy**.

### 4.2. Walk-through 1 — bất phương trình tích

Giải $(x - 1)(x + 2) > 0$.
- Bước 1, 2: đã có dạng tích, vế phải 0.
- Bước 3: nghiệm các nhân tử: $x = 1$ (từ $x-1$), $x = -2$ (từ $x+2$). Mốc trên trục: $-2 < 1$.
- Bước 4 — bảng xét dấu:

$$\begin{array}{c|ccccc}
x & -\infty & -2 & & 1 & +\infty \\ \hline
x + 2 & - & 0 & + & + & + \\
x - 1 & - & - & - & 0 & + \\ \hline
(x-1)(x+2) & + & 0 & - & 0 & +
\end{array}$$

- Bước 5: cần $> 0$ → lấy vùng dấu $+$ → $x < -2$ hoặc $x > 1$, tức **$(-\infty, -2) \cup (1, +\infty)$**.

Verify từng vùng bằng số thật:

| Vùng | Điểm thử | $(x-1)(x+2)$ | Dấu |
|---|---|---|:---:|
| $x < -2$ | $x=-3$ | $(-4)(-1)=4$ | + |
| $-2<x<1$ | $x=0$ | $(-1)(2)=-2$ | − |
| $x>1$ | $x=2$ | $(1)(4)=4$ | + |

Khớp hàng cuối của bảng.

### 4.3. Walk-through 2 — bất phương trình thương

Giải $\dfrac{x - 3}{x + 1} \le 0$.
- Bước 1, 2: đã có dạng thương, vế phải 0.
- Bước 3: tử $= 0$ tại $x = 3$ (được lấy nếu thỏa, vì dấu $\le$); mẫu $= 0$ tại $x = -1$ (**KHÔNG xác định**, không bao giờ lấy). Mốc: $-1 < 3$.
- Bước 4 — bảng xét dấu (dùng $\|$ ở chỗ mẫu = 0):

$$\begin{array}{c|ccccc}
x & -\infty & -1 & & 3 & +\infty \\ \hline
x - 3 & - & - & - & 0 & + \\
x + 1 & - & 0(\|) & + & + & + \\ \hline
\dfrac{x-3}{x+1} & + & \| & - & 0 & +
\end{array}$$

- Bước 5: cần $\le 0$ → lấy vùng dấu $-$ và điểm $= 0$ → vùng $-1 < x < 3$, thêm $x = 3$ (tử = 0, $\le$ cho lấy), **loại** $x = -1$ (mẫu = 0). Tập nghiệm: **$(-1, 3]$**.

```
   (+)    ‖    (-)      ●(=0)   (+)
  ────────┼───────────────●──────  x
         -1               3
       loại mút         lấy mút
       (mẫu=0)          (tử=0, dấu ≤)
```

Verify: $x=0$ (trong): $\frac{-3}{1}=-3 \le 0$ ✓; $x=3$: $\frac{0}{4}=0 \le 0$ ✓; $x=-1$: mẫu 0, không xác định → loại ✓; $x=4$ (ngoài): $\frac{1}{5}>0$ → loại ✓.

⚠ **Lỗi NGHIÊM TRỌNG — nhân chéo BPT có mẫu chứa biến.** Với phương trình thì $\frac{x-3}{x+1} \le 0$ có thể "nhân chéo", nhưng với **bất phương trình thì KHÔNG** — vì $x+1$ có thể **âm hoặc dương** tùy x, mà nhân số âm phải đảo dấu (không biết khi nào). Sai điển hình:

$$\frac{x-3}{x+1} \le 0 \ \xRightarrow{\text{SAI nhân chéo}}\ x - 3 \le 0 \ \Rightarrow\ x \le 3$$

Cách "sai" này cho $x \le 3$, **bao gồm cả** $x = -1$ (mẫu = 0, vô nghĩa) và $x = -2$ ($\frac{-5}{-1}=5 > 0$, KHÔNG thỏa $\le 0$). Cách đúng (bảng xét dấu) cho $(-1, 3]$ — khác hẳn. **Luôn dùng bảng xét dấu, không nhân chéo.**

### 4.4. Phân tích bậc 2 thành tích rồi xét dấu

BPT bậc 2 ở mục 2 thực ra là trường hợp riêng của tích: $x^2 - 5x + 6 = (x-2)(x-3)$, nên $(x-2)(x-3) < 0$ giải bằng bảng xét dấu cho **cùng** kết quả $2 < x < 3$. Bảng xét dấu là công cụ **tổng quát** cho mọi BPT đa thức/phân thức:

Giải $\dfrac{(x-1)(x-4)}{x+2} \ge 0$. Mốc: $-2$ (mẫu), $1, 4$ (tử). Bảng:

$$\begin{array}{c|ccccccc}
x & -\infty & -2 & & 1 & & 4 & +\infty \\ \hline
x+2 & - & \| & + & + & + & + & + \\
x-1 & - & - & - & 0 & + & + & + \\
x-4 & - & - & - & - & - & 0 & + \\ \hline
\text{thương} & - & \| & + & 0 & - & 0 & +
\end{array}$$

Cần $\ge 0$ → lấy vùng $+$ và nghiệm tử: $-2 < x \le 1$ hoặc $x \ge 4$, tức **$(-2, 1] \cup [4, +\infty)$** (loại $x=-2$ vì mẫu = 0).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mỗi nhân tử $x-r$ âm bên trái r, dương bên phải r?"* Vì $x - r < 0 \iff x < r$ và $x - r > 0 \iff x > r$ — mốc đổi dấu đúng tại $x = r$.
- *"Tại sao nghiệm mẫu không bao giờ lấy nhưng nghiệm tử thì có thể?"* Nghiệm mẫu làm biểu thức **không xác định** (chia 0) → luôn loại. Nghiệm tử làm biểu thức $= 0$ → lấy nếu dấu BPT là $\le$ hoặc $\ge$ (vì $0$ thỏa "$\le 0$").
- *"Bao nhiêu cột trong bảng?"* Bằng số mốc cộng 1 khoảng cuối; mỗi mốc tạo ranh giới giữa 2 vùng. 2 mốc → 3 vùng, 3 mốc → 4 vùng.

🔁 **Dừng lại tự kiểm tra**: giải $\dfrac{x+2}{x-1} > 0$.

<details><summary>Đáp án</summary>

Mốc: $-2$ (tử), $1$ (mẫu). Bảng dấu thương: $+$ khi $x<-2$, $-$ khi $-2<x<1$, $+$ khi $x>1$. Cần $>0$ (strict, không lấy mút) → $x < -2$ hoặc $x > 1$, tức **$(-\infty, -2) \cup (1, +\infty)$**. Verify: $x=-3$: $\frac{-1}{-4}>0$ ✓; $x=0$: $\frac{2}{-1}<0$ loại ✓; $x=2$: $\frac{4}{1}>0$ ✓.

</details>

### 📝 Tóm tắt mục 4

- Tích/thương: theo dõi **dấu từng nhân tử** rồi nhân dấu — không khai triển, không nhân chéo.
- Lập **bảng xét dấu**: mỗi nhân tử 1 hàng, mốc tăng dần, hàng cuối nhân dấu; ghi $\|$ ở nghiệm mẫu.
- Nghiệm **tử** lấy nếu $\le/\ge$; nghiệm **mẫu KHÔNG bao giờ** lấy.
- ⚠ Cấm nhân chéo BPT có mẫu chứa biến — vì không biết mẫu âm hay dương.

---

## 5. Hệ bất phương trình

💡 **Trực giác — phải đúng đồng thời.** Hệ bất phương trình (system of inequalities) là **nhiều BPT cùng phải đúng một lúc** (nối bởi "và"). Nghiệm của hệ = **giao** $\cap$ của các tập nghiệm riêng — phần trục số mà **tất cả** điều kiện cùng tô. Như một ứng viên phải thỏa **mọi** tiêu chí tuyển dụng (tuổi $\ge 18$ **và** kinh nghiệm $\ge 2$ năm **và** lương kỳ vọng $\le 20$ triệu): chỉ ai lọt qua tất cả mới đậu.

### 5.1. Quy trình — giải từng cái rồi lấy giao

> **Bước 1**: giải **từng** bất phương trình riêng lẻ, ra từng tập nghiệm (từng khoảng).
>
> **Bước 2**: vẽ **tất cả** các tập đó lên **cùng một trục số**.
>
> **Bước 3**: lấy **phần chồng nhau (giao)** — vùng được tô bởi mọi điều kiện. Nếu không có vùng chung → hệ **vô nghiệm**.

### 5.2. Walk-through 1 — hệ 2 BPT bậc 1

Giải hệ $\begin{cases} 2x - 1 > 3 \\ x + 4 \le 10 \end{cases}$.

- BPT (1): $2x - 1 > 3 \Rightarrow 2x > 4 \Rightarrow x > 2$, tức $(2, +\infty)$.
- BPT (2): $x + 4 \le 10 \Rightarrow x \le 6$, tức $(-\infty, 6]$.
- Vẽ lên cùng trục và lấy giao:

```
  (1) x>2:        ○════════════════►
  (2) x≤6:  ◄═══════════════●
  giao:           ○═════════●            → (2, 6]
        ──────────┼─────────┼────────  x
                  2         6
```

Tập nghiệm: **$(2, 6]$**. Verify: $x=3$: $2\cdot3-1=5>3$ ✓ và $3+4=7\le10$ ✓; $x=6$: $11>3$ ✓ và $10\le10$ ✓; $x=2$: $3>3$ sai → loại mút trái ✓.

### 5.3. Walk-through 2 — hệ vô nghiệm

Giải hệ $\begin{cases} x > 5 \\ x < 1 \end{cases}$.

```
  x>5:                    ○══════►
  x<1:  ◄═══○
  giao:  (không có vùng chung)
        ─────┼──────────────┼─────  x
             1              5
```

Không số nào vừa $> 5$ vừa $< 1$ → **vô nghiệm** ($\varnothing$).

### 5.4. Walk-through 3 — hệ có BPT bậc 2

Giải hệ $\begin{cases} x^2 - 4 \le 0 \\ x - 1 > 0 \end{cases}$.

- BPT (1): $x^2 - 4 \le 0 \iff (x-2)(x+2) \le 0$. Nghiệm $\pm 2$, $a>0$ → lấy "trong" + mút → $-2 \le x \le 2$, tức $[-2, 2]$.
- BPT (2): $x - 1 > 0 \Rightarrow x > 1$, tức $(1, +\infty)$.
- Giao:

```
  (1):  ●═══════════════●
  (2):              ○════════►
  giao:             ○═══════●           → (1, 2]
       ─────┼───────┼───────┼──── x
           -2       1       2
```

Tập nghiệm: **$(1, 2]$**. Verify: $x=1.5$: $1.5^2-4=-1.75\le0$ ✓ và $1.5-1>0$ ✓; $x=2$: $0\le0$ ✓ và $1>0$ ✓; $x=1$: $1-1>0$ sai → loại ✓.

⚠ **Lỗi thường gặp ở hệ BPT**

- **Lấy hợp thay vì giao.** Hệ là "**và**" → giao (phần chung), không phải "hoặc" → hợp. Đừng gộp 2 khoảng lại.
- **Quên đầu mút khi lấy giao.** Tại biên giao, đầu mút được lấy chỉ khi **cả hai** điều kiện đều lấy nó. Vd $x \le 6$ và $x > 2$ → mút 6 lấy (vì (1) $\le$), mút 2 loại (vì (2) strict).
- **Kết luận "vô nghiệm" vội.** Phải vẽ trục số kiểm tra có chồng nhau không, đừng đoán.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hệ khác gì BPT $|x|>k$ ra 2 khoảng?"* $|x|>k$ là **một** BPT mà nghiệm rời thành 2 khoảng (bản chất là "hoặc", hợp). Hệ là **nhiều** BPT nối "và" (giao). Đừng lẫn.
- *"Nếu một BPT trong hệ vô nghiệm thì sao?"* Nếu một điều kiện đã $\varnothing$ thì giao với bất cứ gì cũng $\varnothing$ → cả hệ vô nghiệm.

🔁 **Dừng lại tự kiểm tra**: giải hệ $\begin{cases} 3x + 1 \ge 4 \\ -2x > -8 \end{cases}$.

<details><summary>Đáp án</summary>

(1): $3x \ge 3 \Rightarrow x \ge 1$, tức $[1,+\infty)$. (2): $-2x > -8 \Rightarrow x < 4$ (chia $-2$, đảo dấu), tức $(-\infty, 4)$. Giao: **$[1, 4)$**. Verify: $x=1$: $4\ge4$ ✓ và $-2>-8$ ✓; $x=4$: $13\ge4$ ✓ nhưng $-8>-8$ sai → loại mút 4 ✓.

</details>

### 📝 Tóm tắt mục 5

- Hệ BPT = nhiều BPT cùng đúng ("và") → nghiệm là **giao** $\cap$ các tập riêng.
- Quy trình: giải từng cái → vẽ chung 1 trục → lấy vùng chồng nhau.
- Không chồng → vô nghiệm $\varnothing$; đầu mút biên giao lấy chỉ khi **cả hai** đều lấy.
- ⚠ Hệ là giao (AND), không phải hợp (OR) — đừng gộp khoảng.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Giải $3x - 5 \ge 2x + 1$.

**Bài 2**: Giải $-2x + 7 < 1$.

**Bài 3**: Giải $x^2 - 4x + 3 > 0$.

**Bài 4**: Giải $2x^2 + 5x - 3 \le 0$.

**Bài 5**: Giải $x^2 + 4 > 0$ (chú ý $\Delta$).

**Bài 6**: Giải $-x^2 + 6x - 9 \ge 0$.

**Bài 7**: Giải $|x - 1| < 3$ và viết tập nghiệm bằng ký hiệu khoảng.

**Bài 8**: Giải $|2x + 3| \ge 5$.

**Bài 9**: Giải bất phương trình tích $(x + 3)(x - 2) < 0$ (lập bảng xét dấu).

**Bài 10**: Giải bất phương trình thương $\dfrac{x - 4}{x + 1} \ge 0$ (chú ý đầu mút và mẫu).

**Bài 11**: Giải hệ $\begin{cases} 2x - 3 \le 5 \\ x + 1 > -2 \end{cases}$ và viết nghiệm bằng ký hiệu khoảng.

**Bài 12**: Giải hệ $\begin{cases} x^2 - 9 < 0 \\ x \ge 0 \end{cases}$.

### Lời giải

**Bài 1**: $3x - 2x \ge 1 + 5$ → **$x \ge 6$**, tức $[6, +\infty)$. Verify: $x=6$: $13 \ge 13$ ✓; $x=5$: $10 \ge 11$ sai ✓.

**Bài 2**: $-2x < 1 - 7 = -6$. Chia $-2$ (đảo dấu): **$x > 3$**, tức $(3, +\infty)$. Verify: $x=4$: $-1 < 1$ ✓; $x=3$: $1 < 1$ sai → loại mút ✓.

**Bài 3**: Nghiệm PT $x^2 - 4x + 3 = 0$: $x = 1, x = 3$. $a = 1 > 0$. BPT $> 0$ → ngoài → **$x < 1$ hoặc $x > 3$**, tức $(-\infty, 1) \cup (3, +\infty)$. Trục số:
```
  ◄═════○           ○═════►
  ──────┼───────────┼──────  x
        1           3
```

**Bài 4**: Nghiệm: $x = \dfrac{-5 \pm \sqrt{25 + 24}}{4} = \dfrac{-5 \pm 7}{4} = \tfrac{1}{2}$ hoặc $-3$. $a = 2 > 0$. BPT $\le 0$ → trong + lấy mút → **$-3 \le x \le \tfrac{1}{2}$**, tức $[-3, \tfrac{1}{2}]$. Verify: $x=0$: $-3 \le 0$ ✓; $x=1$: $2+5-3=4 \le 0$ sai ✓.

**Bài 5**: $\Delta = 0 - 16 = -16 < 0$. $a = 1 > 0$ → $f(x) > 0$ cho mọi x → tập nghiệm = **$\mathbb{R}$**.

**Bài 6**: Đổi dấu nhân $-1$ (đảo dấu BPT): $x^2 - 6x + 9 \le 0$. Nghiệm: $(x - 3)^2 \le 0$. Vì $(x-3)^2 \ge 0$ luôn → chỉ $= 0$ khi **$x = 3$**. Tập nghiệm: **$\{3\}$** (một điểm — trường hợp $\Delta=0$).

**Bài 7**: $|x-1| < 3 \iff -3 < x-1 < 3 \iff -2 < x < 4$. Tập nghiệm: **$(-2, 4)$**. (Một khoảng vì dạng $|A|<k$.)

**Bài 8**: $|2x+3| \ge 5 \iff 2x+3 \ge 5$ hoặc $2x+3 \le -5 \iff x \ge 1$ hoặc $x \le -4$. Tập nghiệm: **$(-\infty, -4] \cup [1, +\infty)$**. (Hai khoảng vì dạng $|A|\ge k$.)

**Bài 9**: Bảng xét dấu, mốc $-3, 2$:

$$\begin{array}{c|ccccc}
x & -\infty & -3 & & 2 & +\infty \\ \hline
x+3 & - & 0 & + & + & + \\
x-2 & - & - & - & 0 & + \\ \hline
(x+3)(x-2) & + & 0 & - & 0 & +
\end{array}$$

Cần $< 0$ → lấy vùng dấu $-$ (strict, không lấy mút) → **$-3 < x < 2$**, tức $(-3, 2)$. Verify: $x=0$: $(3)(-2)=-6<0$ ✓; $x=3$: $(6)(1)=6<0$ sai ✓.

**Bài 10**: $\dfrac{x-4}{x+1} \ge 0$. Tử $=0$ tại $x=4$ (lấy được vì $\ge$); mẫu $=0$ tại $x=-1$ (loại). Bảng dấu thương: $+$ khi $x<-1$, $-$ khi $-1<x<4$, $+$ khi $x>4$. Cần $\ge 0$ → vùng $+$ và nghiệm tử → $x < -1$ hoặc $x \ge 4$. Tập nghiệm: **$(-\infty, -1) \cup [4, +\infty)$** (loại $x=-1$ vì mẫu = 0, lấy $x=4$ vì tử = 0). Verify: $x=-2$: $\frac{-6}{-1}=6\ge0$ ✓; $x=0$: $\frac{-4}{1}<0$ loại ✓; $x=4$: $\frac{0}{5}=0\ge0$ ✓.

**Bài 11**: Giải từng cái rồi lấy giao.
- (1) $2x - 3 \le 5 \Rightarrow 2x \le 8 \Rightarrow x \le 4$, tức $(-\infty, 4]$.
- (2) $x + 1 > -2 \Rightarrow x > -3$, tức $(-3, +\infty)$.
- Giao:
```
  (1) x≤4:  ◄═══════════════●
  (2) x>-3:        ○════════════════►
  giao:            ○═══════●            → (-3, 4]
       ────────────┼───────┼──────  x
                  -3       4
```
Tập nghiệm: **$(-3, 4]$**.

**Bài 12**: 
- (1) $x^2 - 9 < 0 \iff (x-3)(x+3) < 0$. Nghiệm $\pm 3$, $a>0$ → lấy "trong" (strict) → $-3 < x < 3$, tức $(-3, 3)$.
- (2) $x \ge 0$, tức $[0, +\infty)$.
- Giao: $[0, 3)$ (lấy mút 0 vì (2) là $\ge$; loại mút 3 vì (1) strict). Tập nghiệm: **$[0, 3)$**. Verify: $x=0$: $-9<0$ ✓ và $0\ge0$ ✓; $x=3$: $0<0$ sai → loại ✓.

---

## 7. Bài tiếp theo

[Lesson 06 — Lũy thừa, căn, logarit](../lesson-06-powers-roots-logs/).

## 📝 Tổng kết

1. **BPT**: thay $=$ bằng $<, >, \le, \ge$. Nghiệm = **khoảng** (cân lệch), không phải điểm.
2. **Quy tắc**: như PT — cộng/trừ và nhân/chia số dương giữ dấu; nhân/chia số **âm → ĐẢO dấu**.
3. **Tam thức bậc 2**: "trong trái, ngoài cùng" (so với dấu $a$); quy trình 4 bước; lấy mút nếu $\le, \ge$.
4. $\Delta < 0$ → $f(x)$ cùng dấu $a$ cho mọi x; $\Delta = 0$ → nghiệm kép cho điểm / $\varnothing$ / $\mathbb{R}$.
5. **Trị tuyệt đối**: $|A|<k$ → một khoảng $-k<A<k$; $|A|>k$ → hai nhánh; $|A|<$ số âm → vô nghiệm.
6. **Tích/thương**: **bảng xét dấu** (nhân dấu từng nhân tử); nghiệm mẫu không bao giờ lấy; ⚠ **cấm nhân chéo**.
7. **Hệ BPT**: giải từng cái → lấy **giao** $\cap$ (AND); không chồng → vô nghiệm.
