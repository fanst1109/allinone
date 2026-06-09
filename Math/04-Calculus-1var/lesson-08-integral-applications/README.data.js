// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-08-integral-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Ứng dụng tích phân

## Mục tiêu

- Tính **diện tích** giữa 2 đường cong.
- Tính **thể tích vật thể tròn xoay** (đĩa, vỏ trụ).
- **Độ dài cung** đường cong.
- **Giá trị trung bình** của hàm trên $[a, b]$.
- Ứng dụng vật lý: công, momen, khối tâm.

## Kiến thức tiền đề

- [Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/).

---

## 1. Diện tích giữa 2 đường cong

Cho $f(x) \\ge g(x)$ trên $[a, b]$:

$$S = \\int_a^b [f(x) - g(x)]\\,dx$$

💡 **Trực giác**: Diện tích = hiệu giữa diện tích "trần" ($f$) và "sàn" ($g$).

**Ví dụ**: Tính diện tích giới hạn bởi $y = x^2$ và $y = x$.
- Tìm giao điểm: $x^2 = x \\to x = 0, 1$.
- Trên $[0, 1]$, $x \\ge x^2 \\to f = x$, $g = x^2$.
- $S = \\int_0^1 (x - x^2)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{3} =$ **$\\frac{1}{6}$**.

⚠ **Nếu 2 đường giao nhau nhiều lần**, phải chia nhỏ và lấy $|f - g|$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết đường nào là 'trần' ($f$) đường nào là 'sàn' ($g$)?"* Trên mỗi khoảng, thử một điểm: đường có giá trị **lớn hơn** là trần. Vd trên $(0,1)$, tại $x=0.5$: $x = 0.5 > x^2 = 0.25 \\to y=x$ là trần. Nếu thứ tự đảo trên khoảng khác → phải chia đoạn.
- *"Cận tích phân lấy từ đâu?"* Từ **giao điểm** của hai đường (giải $f = g$). Ở ví dụ: $x^2 = x \\to x = 0, 1 \\to$ cận $[0,1]$.

⚠ **Lỗi thường gặp — không xét đường nào trên/dưới, ra diện tích âm**. Nếu lấy $\\int(x^2 - x)\\,dx$ (sàn trừ trần) trên $[0,1]$ ra $-\\frac{1}{6} < 0$ — diện tích không thể âm. Phải lấy trần $-$ sàn $= \\int(x - x^2)\\,dx = \\frac{1}{6}$. Diện tích luôn lấy $|f - g|$ hoặc xác định đúng thứ tự.

🔁 **Dừng lại tự kiểm tra**

1. Diện tích giữa $y = x$ và $y = x^3$ trên $[0, 1]$ (đường nào trên?).
2. Cận tích phân của diện tích giữa $y = x^2$ và $y = 2x$ là gì?

<details><summary>Đáp án</summary>

1. Tại $x=0.5$: $x=0.5 > x^3=0.125 \\to y=x$ trên. $S = \\int_0^1 (x - x^3)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^4}{4}\\right]_0^1 = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$.
2. Giao: $x^2 = 2x \\to x = 0, 2 \\to$ cận $[0, 2]$.

</details>

### 📝 Tóm tắt mục 1

- Diện tích giữa hai đường: $S = \\int_a^b (\\text{trần} - \\text{sàn})\\,dx$, cận = giao điểm.
- Xác định trần/sàn bằng cách thử điểm; nếu đổi thứ tự giữa chừng → **chia đoạn**.
- Diện tích luôn $\\ge 0$; lấy $|f - g|$ để tránh kết quả âm.

---

## 2. Thể tích vật thể tròn xoay — Phương pháp đĩa

🎯 **Bài toán**: Quay đồ thị $y = f(x) \\ge 0$ trên $[a, b]$ quanh trục Ox → khối tròn xoay. $V = ?$

💡 **Ý tưởng**: Cắt vật bằng các mặt phẳng vuông góc trục → mỗi lát là **đĩa tròn** bán kính $f(x)$, độ dày $dx$.
- $dV = \\pi\\cdot f(x)^2 \\cdot dx$.
- $V = \\int_a^b \\pi\\cdot f(x)^2\\,dx$.

**Ví dụ**: Quay $y = \\sqrt{x}$ trên $[0, 4]$ quanh Ox.
- $V = \\pi\\cdot\\int_0^4 x\\,dx = \\pi\\cdot\\left[\\frac{x^2}{2}\\right]_0^4 = \\pi\\cdot 8 =$ **$8\\pi$**.

> 📐 **Định nghĩa đầy đủ — Thể tích vật tròn xoay (đĩa)**
>
> **(a) Là gì**: Khối được tạo bằng cách quay đường cong $y = f(x)$ (với $f \\ge 0$) trên đoạn $[a, b]$ quanh trục Ox tạo nên 1 vật 3D đối xứng. Cắt vật bằng mặt phẳng vuông trục → mỗi lát là **đĩa tròn** bán kính $f(x)$, độ dày $dx$. Tổng các đĩa $= V = \\pi\\cdot\\int f(x)^2\\,dx$.
>
> **(b) Vì sao cần**: Vì nhiều hình 3D không có công thức $V$ đơn giản — bình hoa, mặt ly, các bộ phận quay (trục, bánh xe có khía). Trước Calculus, Archimedes đã tính $V$ cầu bằng phương pháp này (thủ công, mất nhiều trang). FTC + nguyên hàm biến nó thành phép tính 5 phút. Cốt lõi của thiết kế cơ khí (mô-men quán tính), hoá học (thể tích bình phản ứng), y học (CT scan = tích phân khúc xạ tia X).
>
> **(c) Ví dụ số**: Quay $y = \\sqrt{x}$ trên $[0, 4]$ quanh Ox: $V = \\pi\\cdot\\int_0^4 x\\,dx = \\pi\\cdot 8 =$ **$8\\pi$** $\\approx 25.13$. Quay $y = x$ trên $[0, 3] \\to$ nón cao 3, $R=3$: $V = \\pi\\cdot\\int_0^3 x^2\\,dx = \\pi\\cdot 9 = 9\\pi$. Kiểm công thức nón $\\frac{1}{3}\\pi R^2 h = \\frac{1}{3}\\pi\\cdot 9\\cdot 3 = 9\\pi$ ✓. Cầu $R = 2$: quay $y = \\sqrt{4-x^2}$ trên $[-2, 2]$: $V = \\pi\\cdot\\int_{-2}^2 (4-x^2)\\,dx = \\pi\\cdot\\left[4x-\\frac{x^3}{3}\\right]_{-2}^2 = \\pi\\cdot\\left(\\frac{8}{3}-\\left(-\\frac{8}{3}\\right) + 8 - (-8)\\right) = \\ldots = \\frac{32\\pi}{3}$. Kiểm $\\frac{4}{3}\\pi\\cdot 8 = \\frac{32\\pi}{3}$ ✓.

### Hình cầu (ví dụ kinh điển)

Quay nửa đường tròn $y = \\sqrt{R^2 - x^2}$ quanh Ox:
- $V = \\pi\\cdot\\int_{-R}^R (R^2 - x^2)\\,dx = \\pi\\cdot\\left[R^2 x - \\frac{x^3}{3}\\right]_{-R}^R = \\pi\\cdot\\left(R^3\\cdot 2 - \\frac{2R^3}{3}\\right) =$ **$\\frac{4}{3}\\cdot\\pi\\cdot R^3$** ✓.

Khớp công thức hình cầu — đây là cách Archimedes phát hiện (trước khi có Calculus chính thức).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao có $f(x)^2$ chứ không phải $f(x)$?"* Vì mỗi lát cắt là **đĩa tròn** bán kính $f(x)$, diện tích đĩa $= \\pi\\cdot(\\text{bán kính})^2 = \\pi\\cdot f(x)^2$. Bình phương đến từ diện tích hình tròn, không phải nhầm lẫn.
- *"Quay quanh trục Ox và Oy khác nhau ra sao?"* Quay quanh Ox dùng đĩa ($\\pi\\int f^2\\,dx$); quay quanh Oy thường dùng vỏ trụ (mục 3) hoặc đổi sang biến $y$. Chọn sai trục → công thức sai.

⚠ **Lỗi thường gặp — quên bình phương $f(x)$**. Viết $V = \\pi\\int f(x)\\,dx$ (thiếu bình phương) là sai — đó là công thức diện tích, không phải thể tích. Đĩa cần $\\pi\\cdot f(x)^2$. Vd quay $y=\\sqrt{x}$ trên $[0,4]$: đúng $\\pi\\int_0^4 (\\sqrt{x})^2\\,dx = \\pi\\int x\\,dx = 8\\pi$; nếu quên bình phương ra $\\pi\\int \\sqrt{x}\\,dx = \\frac{16}{3}\\pi$ — sai.

🔁 **Dừng lại tự kiểm tra**

1. Quay $y = x$ trên $[0, 3]$ quanh Ox. $V = ?$ (kiểm bằng công thức nón).
2. Vì sao lát cắt vuông góc Ox lại là hình tròn?

<details><summary>Đáp án</summary>

1. $V = \\pi\\int_0^3 x^2\\,dx = \\pi\\left[\\frac{x^3}{3}\\right]_0^3 = 9\\pi$. Nón đáy $R=3$ cao $h=3$: $\\frac{1}{3}\\pi R^2 h = \\frac{1}{3}\\pi\\cdot 9\\cdot 3 = 9\\pi$ ✓.
2. Vì quay quanh Ox, mỗi điểm $(x, f(x))$ vạch một đường tròn bán kính $f(x)$ → lát cắt là hình tròn.

</details>

### 📝 Tóm tắt mục 2

- Quay $y=f(x)$ quanh Ox: $V = \\pi\\int_a^b f(x)^2\\,dx$ (đĩa, bán kính $f(x)$).
- **Đừng quên bình phương** — bình phương đến từ diện tích hình tròn $\\pi r^2$.
- Kiểm bằng công thức quen (nón $\\frac{1}{3}\\pi R^2 h$, cầu $\\frac{4}{3}\\pi R^3$).

---

## 3. Thể tích — Phương pháp vỏ trụ (Shell)

Khi quay quanh trục Oy, dùng vỏ trụ thay vì đĩa:

$$V = 2\\pi\\cdot\\int_a^b x\\cdot f(x)\\,dx$$

💡 **Mỗi vỏ trụ** bán kính $x$, chiều cao $f(x)$, độ dày $dx$ → thể tích $= 2\\pi x\\cdot f(x)\\cdot dx$ (chu vi × cao × dày).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao quay quanh Oy lại dùng vỏ trụ thay vì đĩa?"* Vì khi quay quanh Oy, để dùng đĩa ta phải biểu diễn $x$ theo $y$ (đảo hàm) — nhiều khi khó. Vỏ trụ giữ nguyên biến $x$: tưởng tượng "lột" vật thành các ống trụ mỏng lồng nhau, mỗi ống bán kính $x$.
- *"$2\\pi x$ ở đâu ra?"* Đó là **chu vi** của vỏ trụ bán kính $x$ (chu vi đường tròn $= 2\\pi r$). Trải phẳng vỏ trụ thành tấm: rộng $2\\pi x$, cao $f(x)$, dày $dx$ → thể tích $2\\pi x\\cdot f(x)\\cdot dx$.

⚠ **Lỗi thường gặp — lẫn công thức đĩa và vỏ trụ**. Đĩa (quanh Ox): $\\pi\\int f^2\\,dx$. Vỏ trụ (quanh Oy): $2\\pi\\int x\\cdot f(x)\\,dx$. Dùng nhầm đĩa cho trục Oy hoặc quên thừa số $2\\pi$ đều ra sai. Xác định **trục quay** trước khi chọn công thức.

🔁 **Dừng lại tự kiểm tra**

1. Quay $y = x^2$ trên $[0, 2]$ quanh Oy bằng vỏ trụ. $V = ?$
2. Thừa số $2\\pi x$ trong công thức vỏ trụ biểu thị gì?

<details><summary>Đáp án</summary>

1. $V = 2\\pi\\int_0^2 x\\cdot x^2\\,dx = 2\\pi\\int_0^2 x^3\\,dx = 2\\pi\\left[\\frac{x^4}{4}\\right]_0^2 = 2\\pi\\cdot 4 = 8\\pi$.
2. Chu vi đường tròn bán kính $x$ ($= 2\\pi x$) — bề rộng khi trải phẳng vỏ trụ.

</details>

### 📝 Tóm tắt mục 3

- Quay quanh Oy: $V = 2\\pi\\int_a^b x\\cdot f(x)\\,dx$ (vỏ trụ, giữ biến $x$).
- $2\\pi x$ = chu vi vỏ trụ; $f(x)$ = chiều cao; $dx$ = độ dày.
- Xác định **trục quay** để chọn đúng đĩa (Ox) vs vỏ trụ (Oy).

---

## 4. Độ dài cung đường cong

Cho $y = f(x)$ trên $[a, b]$:

$$L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\,dx$$

💡 **Trực giác**: Cắt cung thành các đoạn nhỏ $\\sqrt{dx^2 + dy^2} = \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} \\cdot dx$.

**Ví dụ**: Độ dài cung $y = x^{3/2}$ trên $[0, 1]$.
- $f'(x) = \\frac{3}{2}\\cdot x^{1/2}$.
- $L = \\int_0^1 \\sqrt{1 + \\frac{9x}{4}}\\,dx$.
- $u = 1 + \\frac{9x}{4}$, $du = \\frac{9}{4}\\,dx$.
- $= \\frac{4}{9}\\cdot\\int_1^{13/4} \\sqrt{u}\\,du = \\frac{4}{9}\\cdot\\frac{2}{3}\\cdot u^{3/2}\\Big|_1^{13/4} = \\frac{8}{27}\\cdot\\left[\\left(\\frac{13}{4}\\right)^{3/2} - 1\\right] \\approx$ **$1.44$**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Công thức $\\sqrt{1+(f')^2}$ từ đâu?"* Định lý Pythagoras cho đoạn cung nhỏ: chiều ngang $dx$, chiều dọc $dy = f'(x)dx$, độ dài đoạn $= \\sqrt{dx^2 + dy^2} = \\sqrt{1 + (f')^2}\\cdot dx$. Cộng dồn (tích phân) → tổng độ dài.
- *"Vì sao tích phân độ dài cung thường khó tính?"* Vì $\\sqrt{1+(f')^2}$ hiếm khi có nguyên hàm sơ cấp đẹp. Vd đường tròn, parabol cho tích phân phức tạp — thường phải đổi biến khéo hoặc tính số.

⚠ **Lỗi thường gặp — quên số $1$ dưới căn**. Công thức là $\\sqrt{1 + (f')^2}$, KHÔNG phải $\\sqrt{(f')^2} = |f'|$. Bỏ số 1 sẽ cho kết quả sai (thiếu đóng góp chiều ngang $dx$). Vd $y = 2x$ trên $[0,3]$: đúng $\\int\\sqrt{1+4}\\,dx = 3\\sqrt{5}$; quên số 1 ra $\\int\\sqrt{4}\\,dx = 6$ — sai.

🔁 **Dừng lại tự kiểm tra**

1. Độ dài $y = 3x$ từ $x=0$ đến $x=4$ (kiểm bằng khoảng cách hai điểm).
2. Vì sao đoạn cung nhỏ dài $\\sqrt{1+(f')^2}\\cdot dx$?

<details><summary>Đáp án</summary>

1. $f'=3$, $L = \\int_0^4 \\sqrt{1+9}\\,dx = \\sqrt{10}\\cdot4 = 4\\sqrt{10} \\approx 12.65$. Hai điểm $(0,0),(4,12)$: $\\sqrt{16+144} = \\sqrt{160} = 4\\sqrt{10}$ ✓.
2. Pythagoras: $\\sqrt{dx^2 + dy^2}$ với $dy = f'\\cdot dx$ → $\\sqrt{dx^2(1+(f')^2)} = \\sqrt{1+(f')^2}\\cdot dx$.

</details>

### 📝 Tóm tắt mục 4

- Độ dài cung $y=f(x)$ trên $[a,b]$: $L = \\int_a^b \\sqrt{1+(f'(x))^2}\\,dx$.
- Công thức từ Pythagoras cho đoạn cung nhỏ ($dx$ ngang, $f'dx$ dọc).
- **Đừng quên số 1** dưới căn; tích phân này thường khó, có khi phải tính số.

---

## 5. Giá trị trung bình của hàm

$$f_{tb} = \\frac{1}{b-a}\\cdot\\int_a^b f(x)\\,dx$$

💡 **Trực giác**: Diện tích chia chiều rộng = chiều cao "trung bình" của đồ thị.

**Ví dụ**: Giá trị trung bình của $\\sin x$ trên $[0, \\pi]$.
- $= \\frac{1}{\\pi}\\cdot\\int_0^\\pi \\sin x\\,dx = \\frac{1}{\\pi}\\cdot[-\\cos x]_0^\\pi = \\frac{1}{\\pi}\\cdot(1 + 1) =$ **$\\frac{2}{\\pi} \\approx 0.637$**.

⟶ Giá trị trung bình của sóng sin nửa chu kỳ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chia cho $(b-a)$?"* Vì $\\int_a^b f\\,dx$ là **diện tích** (tổng tích lũy), chia cho bề rộng $(b-a)$ cho ra **chiều cao trung bình** — đúng nghĩa "trung bình". Tương tự trung bình rời rạc $\\frac{\\text{tổng}}{\\text{số phần tử}}$.
- *"Giá trị trung bình có nằm trong khoảng giá trị của hàm không?"* Có (định lý giá trị trung bình tích phân): với $f$ liên tục, tồn tại $c \\in [a,b]$ mà $f(c) = f_{tb}$. Vd $\\sin x$ trên $[0,\\pi]$ có $f_{tb} = \\frac{2}{\\pi} \\approx 0.637$, nằm trong $[0,1]$.

⚠ **Lỗi thường gặp — quên chia cho $(b-a)$**. $f_{tb} = \\frac{\\int_a^b f\\,dx}{b-a}$, KHÔNG phải chỉ $\\int_a^b f\\,dx$. Vd trung bình của $x^2$ trên $[0,2]$: đúng $\\frac{1}{2}\\int_0^2 x^2\\,dx = \\frac{1}{2}\\cdot\\frac{8}{3} = \\frac{4}{3}$; quên chia ra $\\frac{8}{3}$ — sai (và lớn hơn cả giá trị max $4$, vô lý).

🔁 **Dừng lại tự kiểm tra**

1. Giá trị trung bình của $f(x) = x$ trên $[0, 4]$.
2. Giá trị trung bình của hàm hằng $f(x) = 7$ trên $[2, 9]$?

<details><summary>Đáp án</summary>

1. $\\frac{1}{4}\\int_0^4 x\\,dx = \\frac{1}{4}\\left[\\frac{x^2}{2}\\right]_0^4 = \\frac{1}{4}\\cdot8 = 2$ (đúng bằng trung điểm, vì $x$ tuyến tính).
2. $7$ (trung bình của hằng số luôn bằng chính nó).

</details>

### 📝 Tóm tắt mục 5

- $f_{tb} = \\frac{1}{b-a}\\cdot\\int_a^b f(x)\\,dx$ = diện tích chia bề rộng = chiều cao trung bình.
- **Đừng quên chia $(b-a)$**.
- Với $f$ liên tục, $f_{tb}$ thực sự đạt được tại một điểm $c \\in [a,b]$ (MVT tích phân).

---

## 6. Ứng dụng vật lý

### 6.1. Công cơ học

Lực biến thiên $F(x)$ tác động lên vật từ $a$ đến $b$:

$$W = \\int_a^b F(x)\\,dx$$

**Ví dụ**: Lò xo Hooke $F = kx$. Công kéo lò xo từ 0 đến $x$:
- $W = \\int_0^x k\\cdot t\\,dt = \\frac{1}{2}\\cdot k\\cdot x^2$.

### 6.2. Khối tâm thanh

Thanh mỏng có mật độ $\\rho(x)$ trên $[a, b]$:

$$x_{cm} = \\frac{\\int_a^b x\\cdot\\rho(x)\\,dx}{\\int_a^b \\rho(x)\\,dx}$$

### 6.3. Quãng đường khi vận tốc biến thiên

$$s = \\int_a^b v(t)\\,dt$$

💡 **Trực giác — vì sao tích phân là "tổng tích lũy"**: nhiều đại lượng vật lý = tích của hai thứ (công = lực × quãng đường, quãng đường = vận tốc × thời gian). Khi một thừa số **biến thiên**, không nhân thẳng được — phải chia nhỏ, nhân trên từng mảnh, rồi cộng dồn = tích phân.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công lò xo là $\\frac{1}{2}kx^2$ chứ không $kx\\cdot x$?"* Vì lực $F = kx$ **tăng dần** khi kéo, không phải hằng. Phải tích phân: $W = \\int_0^x kt\\,dt = \\frac{1}{2}kx^2$. Nếu lực hằng thì mới $W = F\\cdot d$.
- *"$\\int v(t)\\,dt$ cho quãng đường hay độ dời?"* Cho **độ dời** (có dấu). Nếu vật đổi chiều, muốn **quãng đường thực** phải lấy $\\int|v(t)|\\,dt$ (giống diện tích thật vs diện tích có dấu ở L07).

⚠ **Lỗi thường gặp — dùng $W = F\\cdot d$ khi lực biến thiên**. Công thức $W = F\\cdot d$ chỉ đúng khi $F$ **hằng**. Với $F(x)$ thay đổi (lò xo, hấp dẫn theo độ cao) phải $W = \\int F\\,dx$. Vd lò xo $F=kx$: dùng $F\\cdot d = kx\\cdot x = kx^2$ ra **gấp đôi** giá trị đúng $\\frac{1}{2}kx^2$.

🔁 **Dừng lại tự kiểm tra**

1. Lực $F(x) = 6x$ N kéo vật từ $x=0$ đến $x=2$ m. Công?
2. Vận tốc $v(t) = 3t^2$. Độ dời từ $t=0$ đến $t=2$?

<details><summary>Đáp án</summary>

1. $W = \\int_0^2 6x\\,dx = [3x^2]_0^2 = 12$ J.
2. $s = \\int_0^2 3t^2\\,dt = [t^3]_0^2 = 8$ m.

</details>

### 📝 Tóm tắt mục 6

- Tích phân = **tổng tích lũy** khi một thừa số biến thiên: $W=\\int F\\,dx$, $s=\\int v\\,dt$.
- Công lò xo $W=\\frac{1}{2}kx^2$ (lực $kx$ biến thiên) — KHÔNG dùng $F\\cdot d$.
- $\\int v\\,dt$ = độ dời (có dấu); quãng đường thực = $\\int|v|\\,dt$.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Diện tích giới hạn $y = x^2$ và $y = 4$.

**Bài 2**: Thể tích quay $y = \\sin x$, $0 \\le x \\le \\pi$ quanh Ox.

**Bài 3**: Độ dài đường thẳng $y = 2x$ từ $x=0$ đến $x=3$.

**Bài 4**: Giá trị trung bình của $x^2$ trên $[0, 2]$.

**Bài 5**: Lực $F(x) = 3x^2$ N tác dụng kéo vật từ $x=0$ đến $x=2$ m. Tính công.

### Lời giải

**Bài 1**: $x^2 = 4 \\to x = \\pm 2$. Trên $[-2, 2]$, $4 \\ge x^2$. $S = \\int_{-2}^2 (4 - x^2)\\,dx = \\left[4x - \\frac{x^3}{3}\\right]_{-2}^2 = \\left(8 - \\frac{8}{3}\\right) - \\left(-8 + \\frac{8}{3}\\right) =$ **$\\frac{32}{3}$**.

**Bài 2**: $V = \\pi\\cdot\\int_0^\\pi \\sin^2 x\\,dx = \\pi\\cdot\\int_0^\\pi \\frac{1 - \\cos 2x}{2}\\,dx = \\pi\\cdot\\left[\\frac{x}{2} - \\frac{\\sin(2x)}{4}\\right]_0^\\pi =$ **$\\frac{\\pi^2}{2}$**.

**Bài 3**: $f' = 2$. $L = \\int_0^3 \\sqrt{1+4}\\,dx = \\sqrt{5}\\cdot3 =$ **$3\\sqrt{5} \\approx 6.71$**. (Kiểm tra: từ $(0,0)$ đến $(3,6)$, khoảng cách $= \\sqrt{9+36} = \\sqrt{45} = 3\\sqrt{5}$ ✓.)

**Bài 4**: $\\frac{1}{2}\\cdot\\int_0^2 x^2\\,dx = \\frac{1}{2}\\cdot\\left[\\frac{x^3}{3}\\right]_0^2 = \\frac{1}{2}\\cdot\\frac{8}{3} =$ **$\\frac{4}{3}$**.

**Bài 5**: $W = \\int_0^2 3x^2\\,dx = [x^3]_0^2 =$ **$8$ J**.

---

## 8. 🎉 HOÀN THÀNH TIER 4 — CALCULUS 1-VAR (8/8)!

Tiếp theo: **Tier 5 — Số học, Tổ hợp, Logic** (chưa triển khai).

## 📝 Tổng kết Tier 4

1. **Giới hạn**: lim dãy và hàm, định nghĩa $\\varepsilon$-N/$\\varepsilon$-$\\delta$.
2. **Liên tục**: 3 điều kiện, định lý giá trị trung gian.
3. **Đạo hàm**: slope tiếp tuyến = vận tốc tức thời.
4. **Quy tắc**: tổng, tích, thương, chain rule (quan trọng nhất).
5. **Ứng dụng đh**: cực trị, khảo sát, l'Hôpital, tối ưu.
6. **Nguyên hàm**: đảo đạo hàm, đổi biến + từng phần.
7. **Tích phân xác định**: tổng Riemann, FTC: $\\int_a^b f = F(b)-F(a)$.
8. **Ứng dụng**: diện tích, thể tích tròn xoay, độ dài cung, công.

🎉 Đây là **xương sống của Toán phổ thông cao + năm 1 đại học**. Tier 5+ sẽ học các nhánh khác (NT, combinatorics, ĐSTT, đa biến).
`;
