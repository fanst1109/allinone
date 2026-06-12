// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-05-derivative-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Ứng dụng đạo hàm

## Mục tiêu

- Tìm **cực trị** (max/min) của hàm số.
- Khảo sát **đồng/nghịch biến**, **lồi/lõm**, **điểm uốn**.
- Vẽ đồ thị hàm số có hệ thống.
- Tìm **tiệm cận** (đứng/ngang/xiên) để dựng dáng đồ thị ở vô cực.
- **Quy tắc l'Hôpital** cho giới hạn dạng $0/0$, $\\infty/\\infty$ và các dạng vô định khác.
- Bài toán tối ưu thực tế (hộp, diện tích, chi phí, quãng đường).
- **Tốc độ liên quan (related rates)** — liên hệ các tốc độ thay đổi theo thời gian.
- **Xấp xỉ tuyến tính (linear approximation)** — tính nhanh giá trị gần đúng bằng tiếp tuyến.

## Kiến thức tiền đề

- [Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

---

## 1. Đồng / nghịch biến

**Định lý**: Cho $f$ khả vi trên $(a, b)$.
- $f'(x) > 0$ trên $(a, b)$ → $f$ **đồng biến** (tăng).
- $f'(x) < 0$ → $f$ **nghịch biến** (giảm).
- $f'(x) = 0$ trên 1 khoảng → $f$ hằng số.

💡 **Trực giác**: Slope dương = đồ thị đi lên, slope âm = đi xuống.

**Ví dụ 1**: $f(x) = x^3 - 3x$.
- $f'(x) = 3x^2 - 3 = 3(x^2-1)$.
- $f' = 0$ tại $x = \\pm 1$.
- $x < -1$: $f' > 0$ → đồng biến.
- $-1 < x < 1$: $f' < 0$ → nghịch biến.
- $x > 1$: $f' > 0$ → đồng biến.

**Ví dụ 2** (chỉ tăng): $f(x) = x^3 + x$.
- $f'(x) = 3x^2 + 1 > 0$ với **mọi** $x$ (tổng số dương).
- Không có nghiệm $f'=0$ → $f$ đồng biến trên toàn $\\mathbb{R}$, không có khoảng giảm.

**Ví dụ 3** (parabol): $f(x) = -x^2 + 6x$.
- $f'(x) = -2x + 6 = 0 \\to x = 3$.
- $x < 3$: $f' = -2x+6 > 0$ → đồng biến; $x > 3$: $f' < 0$ → nghịch biến.

**Ví dụ 4** (hữu tỉ): $f(x) = \\dfrac{1}{x}$ trên $\\mathbb{R}\\setminus\\{0\\}$.
- $f'(x) = -\\dfrac{1}{x^2} < 0$ với mọi $x \\neq 0$ → nghịch biến trên $(-\\infty, 0)$ **và** trên $(0, \\infty)$ (xét riêng từng khoảng, không nối qua $x=0$ vì không xác định ở đó).

📊 **Đọc dấu $f'$ từ trục số (ví dụ 1)** — lập bảng dấu là cốt lõi của mọi bài khảo sát:

\`\`\`
 x      -∞        -1         1        +∞
 f'      +    0    −    0    +
        ───────●─────────●────────
 f      tăng       giảm       tăng
                ↗ CĐ      ↘  ↗ CT
              (-1, 2)        (1, -2)
\`\`\`

Dấu $f'$ đọc thành "hình dáng" đồ thị: lên–đỉnh–xuống–đáy–lên. Mỗi lần $f'$ đổi dấu là một cực trị.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$f'(x) > 0$ tại 1 điểm có đủ kết luận đồng biến không?"* Không — phải $f' > 0$ trên cả **khoảng**. Tính đồng biến là tính chất của khoảng, không của một điểm. Vd $f(x) = x^3$ có $f'(0) = 0$ nhưng vẫn đồng biến trên toàn $\\mathbb{R}$ (vì $f' \\ge 0$ và chỉ bằng 0 tại một điểm rời rạc).
- *"$f' = 0$ tại vài điểm rời thì còn đồng biến không?"* Vẫn có thể. $x^3$ đồng biến dù $f'(0) = 0$, vì $f'$ không **đổi dấu** quanh đó. Đồng biến nghiêm ngặt cho phép $f' = 0$ tại các điểm cô lập.

⚠ **Lỗi thường gặp — kết luận biến thiên chỉ từ dấu $f'$ tại MỘT điểm**. $f(x) = x^3 - 3x$: nhìn $f'(0) = -3 < 0$ rồi nói "f giảm" là phiến diện — phải xét dấu $f'$ trên từng khoảng $(-\\infty,-1), (-1,1), (1,\\infty)$ mới đủ. Luôn lập bảng dấu, không thay một điểm.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2 - 4x$. Khoảng đồng biến, nghịch biến?
2. $f(x) = e^x$. Đồng hay nghịch biến trên $\\mathbb{R}$?

<details><summary>Đáp án</summary>

1. $f'(x) = 2x - 4 = 0 \\to x = 2$. $x < 2$: $f' < 0$ (nghịch biến); $x > 2$: $f' > 0$ (đồng biến).
2. $f'(x) = e^x > 0$ với mọi $x$ → **đồng biến** trên toàn $\\mathbb{R}$.

</details>

### 📝 Tóm tắt mục 1

- $f' > 0$ trên khoảng → đồng biến; $f' < 0$ → nghịch biến; $f' \\equiv 0$ → hằng.
- Tính biến thiên là tính chất của **khoảng**, phải xét dấu $f'$ trên từng khoảng (lập bảng).
- $f' = 0$ tại điểm rời rạc không phá đồng/nghịch biến (vd $x^3$).

---

## 2. Cực trị

**Định nghĩa**: $f$ đạt **cực đại** tại $x_0$ nếu $f(x_0) \\ge f(x)$ trong 1 lân cận nhỏ. **Cực tiểu** tương tự ($\\le$).

**Điều kiện cần (Fermat)**: Nếu $f$ khả vi và đạt cực trị tại $x_0 \\in (a, b)$, thì **$f'(x_0) = 0$**.

⚠ **Không phải ngược lại**: $f'(x_0) = 0$ chưa chắc cực trị. VD $f(x) = x^3$, $f'(0) = 0$ nhưng không phải cực trị (điểm yên ngựa = saddle point).

### 2.1. Quy tắc bảng biến thiên

Xét dấu $f'(x)$:
- $f'$ đổi từ $+$ sang $-$ tại $x_0$ → **cực đại**.
- $f'$ đổi từ $-$ sang $+$ tại $x_0$ → **cực tiểu**.
- $f'$ không đổi dấu → không phải cực trị.

### 2.2. Quy tắc đạo hàm bậc 2

Nếu $f'(x_0) = 0$:
- $f''(x_0) > 0$ → **cực tiểu**.
- $f''(x_0) < 0$ → **cực đại**.
- $f''(x_0) = 0$ → chưa kết luận được.

**Ví dụ**: $f(x) = x^3 - 3x$.
- $f'(x) = 3x^2 - 3 = 0 \\to x = \\pm 1$.
- $f''(x) = 6x$.
- $f''(1) = 6 > 0 \\to x = 1$ **cực tiểu** ($f(1) = -2$).
- $f''(-1) = -6 < 0 \\to x = -1$ **cực đại** ($f(-1) = 2$).

### 2.3. Bốn ví dụ số phân loại cực trị

Áp dụng cả hai test trên các dạng hàm khác nhau (đa thức, mũ, log, lượng giác) để thấy quy trình luôn giống nhau.

**Ví dụ A — parabol**: $f(x) = x^2 - 6x + 1$.
- $f'(x) = 2x - 6 = 0 \\to x = 3$.
- $f''(x) = 2 > 0$ → **cực tiểu** tại $x = 3$. $f(3) = 9 - 18 + 1 = -8$.
- Verify first test: $f'(2) = -2 < 0$ (giảm), $f'(4) = 2 > 0$ (tăng) → đổi $-\\to+$ → cực tiểu ✓.

**Ví dụ B — bậc 3 có 2 cực trị**: $f(x) = 2x^3 - 3x^2 - 12x$.
- $f'(x) = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x-2)(x+1) = 0 \\to x = -1, 2$.
- $f''(x) = 12x - 6$. $f''(-1) = -18 < 0$ → **cực đại** tại $x=-1$, $f(-1) = -2+(-3)\\cdot 1 - 12\\cdot(-1) = -2 -3 +12 = 7$.
- $f''(2) = 18 > 0$ → **cực tiểu** tại $x=2$, $f(2) = 16 - 12 - 24 = -20$.

**Ví dụ C — hàm mũ**: $f(x) = x\\,e^{-x}$ (mô hình maximum likelihood).
- $f'(x) = e^{-x}(1 - x) = 0$. Vì $e^{-x} > 0$ luôn → $x = 1$.
- $f''(x) = e^{-x}(x - 2)$. $f''(1) = e^{-1}(1-2) = -1/e < 0$ → **cực đại** tại $x=1$. $f(1) = 1/e \\approx 0.368$.

**Ví dụ D — test bậc 2 thất bại**: $f(x) = x^4$.
- $f'(x) = 4x^3 = 0 \\to x = 0$. $f''(x) = 12x^2$, $f''(0) = 0$ → **test bậc 2 bí**.
- Quay về first test: $f'(-0.1) = -0.004 < 0$ (giảm), $f'(0.1) = 0.004 > 0$ (tăng) → đổi $-\\to+$ → **cực tiểu** tại $x=0$ ✓.

> 📐 **Định nghĩa đầy đủ — Cực trị**
>
> **(a) Là gì**: 1 điểm $x_0$ mà $f(x_0)$ lớn (hoặc nhỏ) hơn mọi $f(x)$ gần đó. **Cực đại** = đỉnh "đồi" địa phương, **cực tiểu** = đáy "thung lũng" địa phương. KHÔNG bắt buộc là max/min toàn cục.
>
> **(b) Vì sao cần**: Mọi bài toán tối ưu hoá đều quy về tìm cực trị — kinh tế (tối đa lợi nhuận), kỹ thuật (giảm thiểu vật liệu), ML (giảm thiểu loss function). Fermat (~1637) phát hiện: tại cực trị, đạo hàm $= 0$ (slope tiếp tuyến nằm ngang) — đây là điều kiện CẦN dễ kiểm. Đạo hàm cấp 2 phân loại: lồi ($f''>0$) hay lõm ($f''<0$). Đây là cốt lõi của **gradient descent** trong AI.
>
> **(c) Ví dụ số**: $f(x) = x^2 - 4x + 5$. $f'(x) = 2x - 4 = 0 \\to x = 2$. $f''(2) = 2 > 0$ → **cực tiểu**. $f(2) = 4 - 8 + 5 = 1$. $f(x) = x^3$: $f'(0) = 0$ nhưng KHÔNG cực trị ($f$ đồng biến). Kiểm: $f'(x) = 3x^2 \\ge 0$ luôn, không đổi dấu → $x=0$ là điểm uốn nhưng không cực trị. $f(x) = \\sin x$: cực đại tại $\\pi/2 + k\\cdot 2\\pi$, cực tiểu tại $3\\pi/2 + k\\cdot 2\\pi$. Tối ưu thực tế: chu vi 100m, $S = a(50-a) \\to a=25 \\to S_{max} = 625\\text{m}^2$ (hình vuông).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$f' = 0$ thì luôn có cực trị?"* Không — đó chỉ là điều kiện **cần**. $x^3$ có $f'(0) = 0$ nhưng không cực trị (điểm yên ngựa). Phải kiểm thêm: $f'$ đổi dấu, hoặc dấu $f''$.
- *"Cực trị địa phương khác giá trị lớn nhất/nhỏ nhất toàn cục thế nào?"* Cực trị địa phương chỉ so với **lân cận**; max/min toàn cục so với **toàn miền**. Trên đoạn đóng $[a,b]$, max/min toàn cục nằm ở **cực trị địa phương HOẶC ở hai đầu mút** — phải kiểm cả mút.
- *"$f''(x_0) = 0$ thì sao?"* Test đạo hàm bậc 2 thất bại, không kết luận được. Quay về xét dấu $f'$ quanh $x_0$. Vd $x^4$ tại 0: $f''(0) = 0$ nhưng vẫn là cực tiểu.

⚠ **Lỗi thường gặp — quên kiểm hai đầu mút khi tìm max/min trên $[a,b]$**. Tìm min của $f(x) = x^2$ trên $[1, 3]$: $f'=0$ cho $x=0$ **nằm ngoài** đoạn → bỏ; min thực ra tại mút $x=1$ ($f=1$). Chỉ giải $f'=0$ rồi quên mút sẽ ra kết quả sai.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2 - 6x + 1$. Tìm cực trị (loại gì, giá trị).
2. $f(x) = x^4$. $f''(0) = 0$ — làm sao biết $x=0$ là cực tiểu?

<details><summary>Đáp án</summary>

1. $f' = 2x - 6 = 0 \\to x = 3$; $f''(3) = 2 > 0$ → **cực tiểu**; $f(3) = 9 - 18 + 1 = -8$.
2. Xét dấu $f' = 4x^3$: $x<0$ thì $f'<0$ (giảm), $x>0$ thì $f'>0$ (tăng) → đổi $-\\to+$ → **cực tiểu** tại 0.

</details>

### 2.4. Cực trị TOÀN CỤC trên đoạn đóng [a, b] — không quên hai mút

💡 **Trực giác**: cực trị địa phương (mục 2.1–2.3) chỉ so với **lân cận nhỏ** — như một quả đồi giữa hai dãy núi cao hơn vẫn là "đỉnh địa phương". Còn **cực trị toàn cục (global / absolute extremum)** là điểm cao/thấp nhất trên **toàn miền**. Trên đoạn đóng $[a,b]$, hàm liên tục **luôn đạt** cả max và min toàn cục (Định lý Weierstrass) — và chúng chỉ có thể nằm ở **một trong hai loại điểm**: critical point bên trong $(a,b)$, **hoặc** ở hai đầu mút $a, b$.

**Quy trình chuẩn** (không cần test bậc 1/bậc 2, chỉ SO SÁNH giá trị):
1. Tính $f'$, tìm tất cả nghiệm $f'=0$ (và chỗ $f'$ không tồn tại) **nằm trong** $(a,b)$.
2. Lập bảng giá trị $f$ tại các điểm đó **cộng với** $f(a)$ và $f(b)$.
3. Giá trị lớn nhất → max toàn cục; nhỏ nhất → min toàn cục.

**Walk-through — $f(x) = x^3 - 3x$ trên $[-2, 2]$**:

| $x$ | loại | $f(x) = x^3 - 3x$ |
|---|---|---|
| $-2$ | mút trái | $-8 + 6 = -2$ |
| $-1$ | critical ($f'=0$) | $-1 + 3 = 2$ |
| $1$ | critical ($f'=0$) | $1 - 3 = -2$ |
| $2$ | mút phải | $8 - 6 = 2$ |

- Max toàn cục $= 2$, đạt tại **cả** $x=-1$ (critical) **và** $x=2$ (mút) — hoà.
- Min toàn cục $= -2$, đạt tại **cả** $x=-2$ (mút) **và** $x=1$ (critical).

⚠ **Lỗi thường gặp — bỏ mút**: trên $[-2,2]$ nếu chỉ tìm $f'=0$ ra $x=\\pm1$ rồi nói "max $=2$ tại $x=-1$, min $=-2$ tại $x=1$" thì vẫn đúng số nhưng **may mắn**; với $f(x)=x^2$ trên $[1,3]$, $f'=0$ cho $x=0$ **ngoài đoạn** → bỏ; max/min thực ra ở hai mút ($f(1)=1$ là min, $f(3)=9$ là max). Quên mút → trả lời sai hoàn toàn.

### 📝 Tóm tắt mục 2

- Fermat: cực trị (trong khoảng mở) $\\implies f' = 0$ — điều kiện **cần**, không đủ.
- Phân loại: $f'$ đổi $+\\to-$ (cực đại), $-\\to+$ (cực tiểu); hoặc $f''>0$ (tiểu), $f''<0$ (đại).
- Max/min trên $[a,b]$: kiểm cả điểm $f'=0$ **lẫn hai mút**; $f''=0$ thì quay về xét dấu $f'$.
- Toàn cục trên $[a,b]$ = max/min của tập {critical points trong $(a,b)$} ∪ {$a, b$} — chỉ cần so sánh giá trị, có thể đạt tại nhiều điểm (hoà).

---

## 3. Lồi / lõm & Điểm uốn

**Định nghĩa**:
- **Lồi (concave up)** trên $(a, b)$: đồ thị nằm trên tiếp tuyến. $f''(x) > 0$.
- **Lõm (concave down)**: dưới tiếp tuyến. $f''(x) < 0$.
- **Điểm uốn**: chuyển giữa lồi/lõm. $f''(x_0) = 0$ và đổi dấu.

💡 **Mẹo hình ảnh**:
- Lồi (parabol mở lên): "có thể chứa nước" 🥣.
- Lõm: úp ngược.

**Ví dụ**: $f(x) = x^3$ có $f''(x) = 6x$.
- $x < 0$: $f'' < 0$ → lõm.
- $x > 0$: $f'' > 0$ → lồi.
- **Điểm uốn**: $x = 0$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Lồi/lõm khác đồng/nghịch biến chỗ nào?"* Đồng/nghịch biến ($f'$) nói đồ thị đi **lên hay xuống**. Lồi/lõm ($f''$) nói đồ thị **cong kiểu gì** (mở lên hay mở xuống). Một hàm có thể vừa tăng vừa lõm xuống (vd $\\sqrt{x}$: tăng nhưng cong xuống).
- *"$f''(x_0) = 0$ thì chắc chắn có điểm uốn?"* Không — $f''$ phải **đổi dấu** mới là điểm uốn. $f(x) = x^4$ có $f''(0) = 0$ nhưng $f'' = 12x^2 \\ge 0$ không đổi dấu → KHÔNG phải điểm uốn (vẫn lồi hai phía).

⚠ **Lỗi thường gặp — gọi mọi nghiệm $f''=0$ là điểm uốn**. Phản ví dụ $x^4$ ở trên: $f''(0)=0$ nhưng không đổi dấu → không uốn. Điều kiện đủ: $f''(x_0)=0$ **và** $f''$ đổi dấu qua $x_0$.

🔁 **Dừng lại tự kiểm tra**

1. $f(x) = x^2$. Lồi hay lõm? Có điểm uốn không?
2. $f(x) = x^3 - 3x$. Tìm điểm uốn.

<details><summary>Đáp án</summary>

1. $f'' = 2 > 0$ luôn → **lồi** mọi nơi; không đổi dấu → **không có** điểm uốn.
2. $f'' = 6x = 0 \\to x = 0$; $f''$ đổi dấu $-\\to+$ qua 0 → **điểm uốn tại $(0, 0)$**.

</details>

### 📝 Tóm tắt mục 3

- $f'' > 0$ → lồi (mở lên, "chứa nước"); $f'' < 0$ → lõm (mở xuống).
- Điểm uốn = nơi $f''$ **đổi dấu** (không chỉ bằng 0).
- Lồi/lõm ($f''$) độc lập với tăng/giảm ($f'$); một hàm có thể tăng-mà-lõm.

---

## 4. Khảo sát đồ thị — Quy trình 7 bước

1. **Miền xác định**.
2. **Tính giới hạn** tại biên ($\\infty$, các điểm gián đoạn) → tiệm cận.
3. **$f'(x)$** → bảng biến thiên (đồng/nghịch biến, cực trị).
4. **$f''(x)$** → lồi/lõm, điểm uốn.
5. **Điểm đặc biệt**: cắt trục Ox, Oy.
6. **Bảng biến thiên** tổng hợp.
7. **Vẽ đồ thị**.

💡 **Trực giác**: quy trình gom mọi công cụ đã học thành một "checklist" — $f'$ cho biến thiên + cực trị, $f''$ cho lồi/lõm + uốn, giới hạn cho tiệm cận. Làm theo thứ tự thì đồ thị "tự lộ ra" mà không cần thử nhiều điểm.

### 4.1. Tiệm cận (asymptotes) — bước 2 chi tiết

> 📐 **Định nghĩa đầy đủ — Tiệm cận**
>
> **(a) Là gì**: đường thẳng mà đồ thị **tiến gần vô hạn** nhưng (thường) không chạm.
> - **Tiệm cận đứng (vertical)** $x = c$: khi $\\lim_{x\\to c^\\pm} f(x) = \\pm\\infty$. Tìm ở chỗ hàm **không xác định** (mẫu $=0$, $\\ln$ của 0…).
> - **Tiệm cận ngang (horizontal)** $y = L$: khi $\\lim_{x\\to\\pm\\infty} f(x) = L$ (hữu hạn). Mô tả dáng đồ thị ở **vô cực**.
> - **Tiệm cận xiên (oblique)** $y = ax+b$ ($a\\neq 0$): khi $f(x) - (ax+b) \\to 0$ lúc $x\\to\\pm\\infty$. Xuất hiện khi bậc tử hơn bậc mẫu đúng 1.
>
> **(b) Vì sao cần**: tiệm cận quyết định **dáng đồ thị ở rìa** — nếu bỏ qua, đồ thị vẽ sai hoàn toàn ở vô cực. Bảng biến thiên chỉ nói "tăng/giảm", tiệm cận nói "tăng tới đâu".
>
> **(c) Ví dụ số**: $f(x) = \\dfrac{2x+1}{x-1}$. Mẫu $=0$ tại $x=1$ → **tiệm cận đứng** $x=1$ (vì $\\lim_{x\\to1^+}=+\\infty$). $\\lim_{x\\to\\pm\\infty}\\dfrac{2x+1}{x-1} = \\dfrac{2}{1} = 2$ → **tiệm cận ngang** $y=2$.

**Tiệm cận xiên — walk-through** $f(x) = \\dfrac{x^2 + 1}{x}$:
- $= x + \\dfrac{1}{x}$. Khi $x\\to\\pm\\infty$, $\\dfrac{1}{x}\\to 0$ → $f(x) \\approx x$ → **tiệm cận xiên** $y = x$.
- Mẫu $=0$ tại $x=0$, $\\lim_{x\\to0^+} = +\\infty$ → **tiệm cận đứng** $x = 0$.

### 4.2. Walk-through khảo sát đầy đủ — Ví dụ 1: f(x) = x³ − 3x²

**Bước 1 — Miền xác định**: $\\mathbb{R}$ (đa thức).

**Bước 2 — Giới hạn biên**: $\\lim_{x\\to+\\infty} f = +\\infty$, $\\lim_{x\\to-\\infty} f = -\\infty$. Đa thức bậc 3 → **không có tiệm cận**.

**Bước 3 — $f'$, biến thiên, cực trị**:
$$f'(x) = 3x^2 - 6x = 3x(x-2) = 0 \\implies x = 0,\\ 2.$$
- $x<0$: $f'>0$ (tăng). $0<x<2$: $f'<0$ (giảm). $x>2$: $f'>0$ (tăng).
- $x=0$: đổi $+\\to-$ → **cực đại**, $f(0) = 0$.
- $x=2$: đổi $-\\to+$ → **cực tiểu**, $f(2) = 8 - 12 = -4$.

**Bước 4 — $f''$, lồi/lõm, điểm uốn**:
$$f''(x) = 6x - 6 = 6(x-1) = 0 \\implies x = 1.$$
- $x<1$: $f''<0$ (lõm). $x>1$: $f''>0$ (lồi). Đổi dấu → **điểm uốn** $(1, f(1)) = (1, -2)$.

**Bước 5 — Điểm cắt trục**: $f(x) = x^2(x-3) = 0 \\to x = 0$ (kép), $x = 3$. Cắt Oy tại $(0,0)$.

**Bước 6 — Bảng biến thiên tổng hợp**:

\`\`\`
 x      -∞       0        1        2       +∞
 f'      +   0    −        −    0    +
 f''     −        −   0    +        +
        ──────●──────────────────●──────
 f      ↗ ⌢   CĐ  ↘ ⌢ uốn ↘ ⌣    CT  ↗ ⌣
              (0,0)     (1,-2)   (2,-4)
\`\`\`

(\`⌢\` = lõm, \`⌣\` = lồi.) Đồ thị: từ $-\\infty$ đi lên (lõm) tới đỉnh $(0,0)$, đi xuống qua điểm uốn $(1,-2)$ chuyển sang lồi, chạm đáy $(2,-4)$ rồi lên $+\\infty$.

### 4.3. Walk-through khảo sát đầy đủ — Ví dụ 2 (hàm hữu tỉ): f(x) = x²/(x−1)

**Bước 1 — Miền xác định**: $x \\neq 1$.

**Bước 2 — Tiệm cận**:
- Đứng: $x = 1$ (mẫu $=0$; $\\lim_{x\\to1^+} = +\\infty$, $\\lim_{x\\to1^-} = -\\infty$).
- Chia đa thức: $\\dfrac{x^2}{x-1} = x + 1 + \\dfrac{1}{x-1}$. Khi $x\\to\\pm\\infty$, $\\dfrac{1}{x-1}\\to0$ → **tiệm cận xiên** $y = x + 1$.

**Bước 3 — $f'$**:
$$f'(x) = \\frac{2x(x-1) - x^2\\cdot 1}{(x-1)^2} = \\frac{x^2 - 2x}{(x-1)^2} = \\frac{x(x-2)}{(x-1)^2}.$$
$f'=0 \\to x = 0,\\ 2$. Mẫu $(x-1)^2 > 0$ luôn (trừ $x=1$), nên dấu $f'$ theo tử $x(x-2)$:
- $x<0$: $f'>0$ (tăng). $0<x<1$: $f'<0$ (giảm). $1<x<2$: $f'<0$ (giảm). $x>2$: $f'>0$ (tăng).
- $x=0$: đổi $+\\to-$ → **cực đại**, $f(0) = 0$.
- $x=2$: đổi $-\\to+$ → **cực tiểu**, $f(2) = \\dfrac{4}{1} = 4$.

⚠ Lưu ý: tại $x=1$ hàm không xác định, $f'$ không đổi dấu "qua cực trị" ở đó — chỉ là tiệm cận đứng, không phải cực trị.

**Bước 4 — $f''$**: $f''(x) = \\dfrac{2}{(x-1)^3}$.
- $x<1$: $f''<0$ (lõm). $x>1$: $f''>0$ (lồi). $f''$ không bao giờ $=0$ → **không có điểm uốn** (chỉ đổi dấu qua tiệm cận đứng $x=1$, nơi hàm gián đoạn).

**Bước 5–7 — dáng đồ thị**:
\`\`\`
        |        tiệm cận xiên y = x+1
   CĐ   |        ⌣ lồi
  (0,0)●|       ●(2,4) CT
    ⌢   |  x=1  ↗
 ───────┼───────────────
        |← tiệm cận đứng
\`\`\`
Nhánh trái ($x<1$): lõm, có cực đại $(0,0)$, lao xuống $-\\infty$ khi $x\\to1^-$. Nhánh phải ($x>1$): từ $+\\infty$ xuống đáy $(2,4)$ rồi bám tiệm cận xiên $y=x+1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bỏ bước nào được không?"* Với hàm đơn giản (parabol) có thể tắt, nhưng với hàm hữu tỉ/có tiệm cận thì bước tính giới hạn ở biên là **bắt buộc** — nếu không sẽ vẽ sai dáng ở vô cực.
- *"Tiệm cận đứng tìm ở đâu?"* Ở các điểm hàm không xác định (mẫu $=0$) mà lim ra $\\pm\\infty$. Tiệm cận ngang ở $\\lim_{x \\to \\pm\\infty} f$.

⚠ **Lỗi thường gặp — quên xét miền xác định trước**. Khảo sát $f(x) = \\ln x$ mà quên $x > 0$ sẽ vẽ cả phần $x < 0$ (không tồn tại). Bước 1 (miền xác định) phải làm **đầu tiên**, mọi bước sau chỉ xét trong miền.

🔁 **Dừng lại tự kiểm tra**

1. Hàm $f(x) = 1/(x-1)$ có tiệm cận đứng và ngang ở đâu?
2. Bước nào trong 7 bước phát hiện cực trị?

<details><summary>Đáp án</summary>

1. Tiệm cận đứng $x = 1$ (mẫu = 0, $\\lim = \\pm\\infty$); tiệm cận ngang $y = 0$ ($\\lim_{x \\to \\pm\\infty} = 0$).
2. Bước 3 — lập bảng biến thiên từ dấu $f'(x)$.

</details>

### 📝 Tóm tắt mục 4

- Quy trình 7 bước: miền XĐ → giới hạn/tiệm cận → $f'$ (biến thiên) → $f''$ (lồi/lõm) → điểm đặc biệt → bảng → vẽ.
- Miền xác định làm **đầu tiên**; tiệm cận từ giới hạn ở biên.
- Gom đủ thông tin $f', f''$, giới hạn thì dáng đồ thị tự hiện ra.

---

## 5. Quy tắc l'Hôpital — Cứu cánh cho $0/0$ và $\\infty/\\infty$

💡 **Trực giác**: gần điểm tới hạn, mỗi hàm xấp xỉ tuyến tính theo slope của nó: $f \\approx f'\\cdot(x-a)$, $g \\approx g'\\cdot(x-a)$. Tỉ số $f/g \\approx f'/g'$ (phần $(x-a)$ triệt tiêu). Vậy khi cả hai cùng về 0 (hay $\\infty$), tỉ số được quyết định bởi **tốc độ** thay đổi — chính là đạo hàm.

🎯 **Phát biểu**: Nếu $\\lim f(x)/g(x)$ dạng $0/0$ hoặc $\\infty/\\infty$, và $f, g$ khả vi với $g'(x) \\neq 0$ trong lân cận, thì:

$$\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$$

**Ví dụ 1**: $\\lim_{x \\to 0} \\dfrac{\\sin x}{x}$.
- Dạng $0/0$.
- $= \\lim \\dfrac{\\cos x}{1} = \\cos 0 = \\mathbf{1}$.

**Ví dụ 2**: $\\lim_{x \\to \\infty} \\dfrac{\\ln x}{x}$.
- Dạng $\\infty/\\infty$.
- $= \\lim \\dfrac{1/x}{1} = 0$.

**Ví dụ 3** (áp dụng 2 lần): $\\lim_{x \\to 0} \\dfrac{1 - \\cos x}{x^2}$.
- Dạng $0/0$. $= \\lim \\dfrac{\\sin x}{2x}$. Vẫn $0/0$.
- $= \\lim \\dfrac{\\cos x}{2} = \\mathbf{1/2}$.

**Ví dụ 4** (so sánh "tốc độ vô hạn"): $\\lim_{x\\to\\infty} \\dfrac{e^x}{x^2}$.
- Dạng $\\infty/\\infty$. $\\to \\lim \\dfrac{e^x}{2x}$ (vẫn $\\infty/\\infty$) $\\to \\lim \\dfrac{e^x}{2} = +\\infty$.
- Kết luận: $e^x$ "thắng" mọi đa thức ở vô cực — hàm mũ tăng nhanh hơn lũy thừa bất kỳ.

**Ví dụ 5** (dạng $0\\cdot\\infty$ → biến đổi): $\\lim_{x\\to0^+} x\\ln x$.
- Dạng $0\\cdot(-\\infty)$ — **chưa** dùng l'Hôpital trực tiếp được. Viết lại thành phân số:
$$\\lim_{x\\to0^+} x\\ln x = \\lim_{x\\to0^+} \\frac{\\ln x}{1/x} \\quad (\\text{dạng } -\\infty/\\infty).$$
- $= \\lim \\dfrac{1/x}{-1/x^2} = \\lim (-x) = 0$. Vậy $x\\ln x \\to 0$.

**Ví dụ 6** (dạng $1^\\infty$ → lấy log): $\\lim_{x\\to\\infty}\\left(1 + \\dfrac{1}{x}\\right)^x$.
- Đặt $y = \\left(1+\\tfrac1x\\right)^x$, lấy $\\ln$: $\\ln y = x\\ln\\!\\left(1+\\tfrac1x\\right)$ — dạng $\\infty\\cdot0$. Viết $\\dfrac{\\ln(1+1/x)}{1/x}$ (dạng $0/0$).
- l'Hôpital: tử' $= \\dfrac{-1/x^2}{1+1/x}$, mẫu' $= -1/x^2$ → tỉ số $= \\dfrac{1}{1+1/x} \\to 1$. Vậy $\\ln y \\to 1 \\Rightarrow y \\to e$. (Đây chính là định nghĩa số $e$.)

⚠ **Không áp dụng nếu chưa phải $0/0$ hoặc $\\infty/\\infty$**. Kiểm tra trước. Phản ví dụ: $\\lim_{x \\to 0} (x+1)/(x+2)$ thay trực tiếp được $= 1/2$ (dạng $1/2$, KHÔNG vô định). Nếu cứ "đạo hàm tử/mẫu" ra $\\lim 1/1 = 1$ → **sai**. Luôn kiểm dạng trước khi dùng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đạo hàm tử/mẫu rồi vẫn $0/0$ thì sao?"* Áp dụng tiếp (l'Hôpital nhiều lần). Vd $(1-\\cos x)/x^2$: lần 1 → $\\sin x/2x$ (vẫn $0/0$); lần 2 → $\\cos x/2 \\to 1/2$.
- *"l'Hôpital có phải đạo hàm thương $(f/g)'$?"* KHÔNG. Đây là $f'/g'$ (đạo hàm riêng tử và mẫu rồi chia), không phải quy tắc thương $(f'g-fg')/g^2$. Lẫn hai cái là lỗi rất phổ biến.
- *"Dạng $0\\cdot\\infty$ hay $\\infty-\\infty$ dùng được không?"* Phải **biến đổi về $0/0$ hoặc $\\infty/\\infty$** trước. Vd $x\\cdot\\ln x$ ($0\\cdot\\infty$ khi $x\\to0^+$) → viết $\\ln x/(1/x)$ (dạng $\\infty/\\infty$) rồi l'Hôpital.

🔁 **Dừng lại tự kiểm tra**

1. $\\lim_{x \\to 0} (e^x - 1 - x)/x^2 = ?$
2. Có được dùng l'Hôpital cho $\\lim_{x \\to 1} (x^2+1)/(x+3)$ không?

<details><summary>Đáp án</summary>

1. $0/0$ → $(e^x - 1)/2x$ (vẫn $0/0$) → $e^x/2 \\to 1/2$.
2. **Không** — thay trực tiếp ra $2/4 = 1/2$, không phải vô định. Dùng l'Hôpital ở đây sẽ sai.

</details>

### 📝 Tóm tắt mục 5

- l'Hôpital: chỉ dạng $0/0$ hoặc $\\infty/\\infty$ → $\\lim f/g = \\lim f'/g'$ (đạo hàm **riêng** tử, mẫu).
- Có thể áp **nhiều lần** nếu vẫn vô định; dạng $0\\cdot\\infty$, $\\infty-\\infty$ phải biến đổi về phân số trước.
- KHÔNG nhầm với quy tắc thương; KHÔNG dùng khi chưa phải dạng vô định.

---

## 6. Bài toán tối ưu (Optimization)

**Mẫu câu hỏi**: Tìm cách làm sao để tối đa/tối thiểu một đại lượng.

### Ví dụ kinh điển: Hộp lớn nhất

Cho tấm giấy $12\\times12$ cm. Cắt 4 góc vuông cạnh $x$, gấp lại thành hộp không nắp. Tìm $x$ để thể tích lớn nhất.

**Giải**:
- $V(x) = x\\cdot(12-2x)^2$ với $0 < x < 6$.
- $V'(x) = (12-2x)^2 + x\\cdot 2\\cdot(12-2x)\\cdot(-2) = (12-2x)\\cdot[(12-2x) - 4x] = (12-2x)\\cdot(12-6x)$.
- $V' = 0 \\to x = 6$ (loại, biên) hoặc $x = 2$.
- $V''(2) < 0$ → cực đại.
- → **$x = 2$ cm, $V_{max} = 2\\cdot 8^2 = 128$ cm³**.

💡 **Trực giác — quy trình tối ưu**: (1) gọi tên đại lượng cần tối ưu và biến tự do, (2) viết đại lượng đó thành hàm 1 biến (dùng ràng buộc để khử biến thừa), (3) tìm miền hợp lệ của biến, (4) giải $f'=0$, (5) kiểm cực trị bằng $f''$ hoặc xét dấu, (6) **kiểm cả biên miền**.

### Ví dụ 2: Diện tích lớn nhất cạnh sông (chỉ rào 3 mặt)

Một nông trại có $100$ m rào, rào kín hình chữ nhật **dựa lưng vào sông** (mặt sông không cần rào). Tìm kích thước cho diện tích lớn nhất.

**Giải**:
- Gọi cạnh song song với sông là $x$, hai cạnh vuông góc mỗi cạnh $y$. Ràng buộc rào: $x + 2y = 100 \\to x = 100 - 2y$.
- Diện tích: $A(y) = (100 - 2y)\\,y = 100y - 2y^2$, miền $0 < y < 50$.
- $A'(y) = 100 - 4y = 0 \\to y = 25$. $A''(y) = -4 < 0$ → **cực đại**.
- $x = 100 - 50 = 50$, $A_{max} = 50\\cdot25 = \\mathbf{1250}$ m². Biên $y\\to0$ hoặc $y\\to50$ cho $A\\to0$ → không cạnh tranh.

💡 So với rào kín 4 mặt (chu vi 100 → hình vuông cạnh 25, $S=625$), rào 3 mặt cho diện tích **gấp đôi** vì tiết kiệm được một cạnh. Tỉ lệ tối ưu: cạnh song song sông gấp đôi cạnh vuông góc.

### Ví dụ 3: Chi phí lon sữa rẻ nhất (tối thiểu vật liệu)

Một lon hình trụ chứa $V = 500$ cm³. Tìm bán kính $r$ để **diện tích tôn** (vỏ) nhỏ nhất → tốn ít vật liệu nhất.

**Giải**:
- Thể tích: $\\pi r^2 h = 500 \\to h = \\dfrac{500}{\\pi r^2}$.
- Diện tích toàn phần (2 đáy + thân): $S(r) = 2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + 2\\pi r\\cdot\\dfrac{500}{\\pi r^2} = 2\\pi r^2 + \\dfrac{1000}{r}$, miền $r > 0$.
- $S'(r) = 4\\pi r - \\dfrac{1000}{r^2} = 0 \\to 4\\pi r^3 = 1000 \\to r^3 = \\dfrac{250}{\\pi} \\to r = \\sqrt[3]{\\dfrac{250}{\\pi}} \\approx 4.30$ cm.
- $S''(r) = 4\\pi + \\dfrac{2000}{r^3} > 0$ với mọi $r>0$ → **cực tiểu** (toàn cục, vì $S$ lồi).
- Khi đó $h = \\dfrac{500}{\\pi r^2} \\approx \\dfrac{500}{\\pi\\cdot18.5} \\approx 8.6$ cm — tức $h \\approx 2r$ (đường kính = chiều cao). Đây là **tỉ lệ tối ưu kinh điển** cho lon trụ.

⚠ Tại sao $h = 2r$? Đặt nghiệm vào: từ $4\\pi r^3 = 1000 = 2\\cdot500 = 2\\pi r^2 h \\Rightarrow 4\\pi r^3 = 2\\pi r^2 h \\Rightarrow h = 2r$. Hình trụ tốn ít vỏ nhất khi cao bằng đường kính.

### Ví dụ 4: Quãng đường nhanh nhất (định luật khúc xạ thu nhỏ)

Người cứu hộ ở bờ, điểm $A$ cách mép nước $0$ (ngay bờ), người đuối nước ở $B$. Đơn giản hóa: chạy trên cát từ điểm $(0,0)$ tới điểm $(x, 0)$ trên mép rồi bơi tới $(8, 6)$. Tốc độ chạy $v_1 = 8$ m/s, bơi $v_2 = 2$ m/s. (Bài rút gọn: tìm điểm xuống nước $x$ tối thiểu thời gian — minh hoạ tối ưu thời gian.)

**Giải** (phiên bản gọn — tối thiểu thời gian theo $x$):
- Thời gian: $T(x) = \\dfrac{x}{8} + \\dfrac{\\sqrt{(8-x)^2 + 6^2}}{2}$, miền $0 \\le x \\le 8$.
- $T'(x) = \\dfrac{1}{8} + \\dfrac{-(8-x)}{2\\sqrt{(8-x)^2+36}} = 0 \\to \\dfrac{8-x}{\\sqrt{(8-x)^2+36}} = \\dfrac{1}{4}$.
- Đặt $u = 8-x$: $\\dfrac{u}{\\sqrt{u^2+36}} = \\dfrac14 \\Rightarrow 16u^2 = u^2 + 36 \\Rightarrow u^2 = \\dfrac{36}{15} = 2.4 \\Rightarrow u \\approx 1.55$.
- $x = 8 - 1.55 \\approx \\mathbf{6.45}$ m. Kiểm biên: $T(0), T(8)$ đều lớn hơn → $x\\approx6.45$ là min.

💡 Đây là dạng thu nhỏ của **định luật Snell** (khúc xạ ánh sáng): ánh sáng/người chọn đường tối thiểu thời gian, không phải tối thiểu quãng đường — vì tốc độ hai môi trường khác nhau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao loại $x = 6$ ở ví dụ hộp?"* Vì miền hợp lệ là $0 < x < 6$ (cắt góc cạnh $x$, không thể $\\ge 6$ vì tấm chỉ $12$). $x = 6$ cho $V = 0$ (hộp dẹp) — biên, không phải cực đại.
- *"Làm sao biết nghiệm $f'=0$ là max chứ không phải min?"* Kiểm $f''$ (vd $V''(2) < 0$ → cực đại) hoặc so giá trị với hai biên. Đừng giả định nghiệm duy nhất là max.

⚠ **Lỗi thường gặp — quên ràng buộc miền của biến**. Tối ưu mà để biến chạy tự do vô hạn dễ ra nghiệm vô lý (cạnh âm, kích thước lớn hơn vật liệu). Luôn xác định miền hợp lệ (vd $0 < x < 6$) **trước** khi tìm cực trị.

🔁 **Dừng lại tự kiểm tra**

1. Chu vi hình chữ nhật $= 20$. Diện tích lớn nhất là bao nhiêu, đạt khi nào?
2. Trong bài hộp, vì sao $V(2)$ lớn hơn $V$ tại hai biên $x\\to0$ và $x\\to6$?

<details><summary>Đáp án</summary>

1. $2a+2b=20 \\to b=10-a$, $S=a(10-a)$, $S'=10-2a=0 \\to a=5$, $S=25$ (hình vuông cạnh 5).
2. $V(0)=0$ (chưa gấp), $V(6)=0$ (hộp dẹp), $V(2)=128 > 0$ → cực đại nằm trong khoảng, lớn hơn cả hai biên.

</details>

### 📝 Tóm tắt mục 6

- Quy trình: viết đại lượng cần tối ưu thành hàm 1 biến (dùng ràng buộc), xác định **miền**, giải $f'=0$, kiểm $f''$/biên.
- Luôn xác định **miền hợp lệ** của biến trước, loại nghiệm vô lý/biên.
- Nghiệm $f'=0$ chưa chắc là max — phải kiểm cực trị và so với biên.

---

## 7. Tốc độ liên quan (Related Rates)

💡 **Trực giác**: nhiều đại lượng cùng thay đổi **theo thời gian** và bị buộc với nhau bởi một công thức (vd thể tích bóng bay buộc với bán kính qua $V = \\frac43\\pi r^3$). Nếu biết tốc độ thay đổi của đại lượng này ($\\frac{dr}{dt}$), ta suy ra tốc độ của đại lượng kia ($\\frac{dV}{dt}$) bằng cách **đạo hàm hai vế theo $t$** (dùng chain rule). Không tìm cực trị — đây là chuyển đổi tốc độ.

🎯 **Quy trình 5 bước**:
1. Vẽ hình, đặt tên biến phụ thuộc thời gian.
2. Viết phương trình **ràng buộc** giữa các biến (hình học/vật lý).
3. **Đạo hàm hai vế theo $t$** (mọi biến là hàm của $t$ → chain rule, kèm $\\frac{d}{dt}$).
4. Thay số liệu tại **thời điểm quan tâm** (thay sau khi đã đạo hàm, không trước!).
5. Giải ra tốc độ cần tìm.

### 7.1. Ví dụ 1 — Bóng bay phồng lên

Bơm khí vào bóng cầu với tốc độ $\\frac{dV}{dt} = 100$ cm³/s. Bán kính đang là $r = 5$ cm. Bán kính tăng nhanh cỡ nào?

**Giải**:
- Ràng buộc: $V = \\dfrac43\\pi r^3$.
- Đạo hàm theo $t$: $\\dfrac{dV}{dt} = 4\\pi r^2\\cdot\\dfrac{dr}{dt}$ (chain rule — $r$ là hàm của $t$).
- Thay $r=5$, $\\frac{dV}{dt}=100$: $100 = 4\\pi\\cdot25\\cdot\\dfrac{dr}{dt} = 100\\pi\\cdot\\dfrac{dr}{dt}$.
- $\\dfrac{dr}{dt} = \\dfrac{1}{\\pi} \\approx \\mathbf{0.318}$ cm/s.

💡 Khi $r$ càng lớn, cùng tốc độ bơm $\\frac{dV}{dt}$ thì $\\frac{dr}{dt}$ càng **nhỏ** (vì $4\\pi r^2$ ở mẫu lớn dần) — bóng to ra càng chậm phồng bán kính.

### 7.2. Ví dụ 2 — Thang trượt tường

Thang dài $10$ m dựa tường. Chân thang trượt xa tường với tốc độ $\\frac{dx}{dt} = 2$ m/s. Khi chân cách tường $x = 6$ m, đỉnh thang tụt xuống nhanh cỡ nào?

**Giải**:
- Ràng buộc Pythagoras: $x^2 + y^2 = 10^2 = 100$ ($x$ = khoảng cách chân–tường, $y$ = chiều cao đỉnh).
- Đạo hàm theo $t$: $2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0 \\Rightarrow \\dfrac{dy}{dt} = -\\dfrac{x}{y}\\dfrac{dx}{dt}$.
- Tại $x=6$: $y = \\sqrt{100 - 36} = 8$. Thay: $\\dfrac{dy}{dt} = -\\dfrac{6}{8}\\cdot2 = \\mathbf{-1.5}$ m/s.
- Dấu âm → đỉnh **đang tụt xuống** với tốc độ $1.5$ m/s.

⚠ **Lỗi thường gặp — thay số TRƯỚC khi đạo hàm**. Nếu thay $x=6$ vào ràng buộc $x^2+y^2=100$ ngay từ đầu thành "$36 + y^2 = 100$" rồi mới đạo hàm, $x$ trở thành hằng số → mất hạng tử $2x\\frac{dx}{dt}$ → sai. **Phải đạo hàm khi mọi biến còn là hàm của $t$, rồi mới thay số.**

🔁 **Dừng lại tự kiểm tra**

1. Nước chảy vào bể trụ (bán kính đáy $2$ m) với $3$ m³/phút. Mực nước dâng nhanh cỡ nào?
2. Trong ví dụ thang, khi $x=8$ thì $\\frac{dy}{dt}$ là bao nhiêu?

<details><summary>Đáp án</summary>

1. $V = \\pi r^2 h = 4\\pi h$ (r cố định). $\\frac{dV}{dt} = 4\\pi\\frac{dh}{dt} \\Rightarrow 3 = 4\\pi\\frac{dh}{dt} \\Rightarrow \\frac{dh}{dt} = \\frac{3}{4\\pi}\\approx 0.239$ m/phút.
2. $x=8 \\to y=\\sqrt{100-64}=6$. $\\frac{dy}{dt} = -\\frac{8}{6}\\cdot2 = -\\frac{8}{3}\\approx -2.67$ m/s (tụt nhanh hơn — càng gần đỉnh chạm đất càng nhanh).

</details>

### 📝 Tóm tắt mục 7

- Related rates: nhiều đại lượng cùng biến theo $t$, buộc nhau bởi 1 phương trình → đạo hàm hai vế theo $t$ (chain rule) để liên hệ các tốc độ.
- **Đạo hàm trước, thay số sau** — thay số sớm sẽ làm mất hạng tử của biến bị "đóng băng".
- Dấu của tốc độ cho biết tăng (+) hay giảm (−).

---

## 8. Xấp xỉ tuyến tính (Linear Approximation)

💡 **Trực giác**: gần một điểm $a$, đồ thị "trông như" đường thẳng — chính là **tiếp tuyến** tại $a$. Vậy với $x$ gần $a$, ta thay $f(x)$ bằng giá trị trên tiếp tuyến để tính nhanh mà không cần máy tính.

🎯 **Công thức** (tiếp tuyến tại $a$):
$$f(x) \\approx L(x) = f(a) + f'(a)\\,(x - a).$$

Đây là Taylor bậc 1 — xấp xỉ tốt khi $x$ đủ gần $a$; sai số tỉ lệ $f''$ (độ cong).

### 8.1. Ví dụ 1 — √4.1

Chọn $f(x) = \\sqrt{x}$, $a = 4$ (vì $\\sqrt4 = 2$ đẹp). $f'(x) = \\dfrac{1}{2\\sqrt x}$, $f'(4) = \\dfrac14$.
$$\\sqrt{4.1} \\approx 2 + \\tfrac14(4.1 - 4) = 2 + 0.025 = \\mathbf{2.025}.$$
Giá trị thật $\\sqrt{4.1} = 2.02485\\ldots$ → sai số chỉ $\\approx 0.0001$.

### 8.2. Ví dụ 2 — (1.02)¹⁰

$f(x) = x^{10}$, $a = 1$. $f'(x) = 10x^9$, $f'(1) = 10$.
$$(1.02)^{10} \\approx 1 + 10(1.02 - 1) = 1 + 0.2 = \\mathbf{1.2}.$$
Thật: $1.02^{10} = 1.21899\\ldots$ → xấp xỉ $1.2$ khá sát (sai do bỏ hạng tử bậc 2).

### 8.3. Ví dụ 3 — ln(1.05)

$f(x) = \\ln x$, $a = 1$. $f'(x) = 1/x$, $f'(1) = 1$, $f(1) = 0$.
$$\\ln(1.05) \\approx 0 + 1\\cdot(1.05 - 1) = \\mathbf{0.05}.$$
Thật: $\\ln 1.05 = 0.04879\\ldots$ ✓. (Quy tắc gần đúng nổi tiếng: $\\ln(1+x)\\approx x$ với $x$ nhỏ.)

### 8.4. Ví dụ 4 — sin(0.1)

$f(x) = \\sin x$, $a = 0$. $f'(0) = \\cos 0 = 1$, $f(0) = 0$.
$$\\sin(0.1) \\approx 0 + 1\\cdot(0.1 - 0) = \\mathbf{0.1}.$$
Thật: $\\sin 0.1 = 0.09983\\ldots$ → cơ sở của xấp xỉ $\\sin x \\approx x$ trong vật lý (dao động nhỏ).

⚠ **Lỗi thường gặp — dùng cho $x$ xa $a$**. Xấp xỉ chỉ tốt khi $|x-a|$ nhỏ. Vd $\\sqrt{9}$ từ $a=4$: $L(9) = 2 + \\frac14(5) = 3.25$ nhưng thật $\\sqrt9 = 3$ → sai $0.25$. Càng xa, độ cong $f''$ kéo đồ thị rời tiếp tuyến → sai lớn. Chọn $a$ là điểm "đẹp" **gần** $x$ nhất.

🔁 **Dừng lại tự kiểm tra**

1. Xấp xỉ $\\sqrt{25.3}$ dùng $a = 25$.
2. Xấp xỉ $e^{0.02}$ dùng $a = 0$.

<details><summary>Đáp án</summary>

1. $f=\\sqrt x$, $f'(25)=\\frac{1}{10}$. $\\sqrt{25.3}\\approx 5 + \\frac{1}{10}(0.3) = 5.03$ (thật $5.0299\\ldots$ ✓).
2. $f=e^x$, $f'(0)=1$, $f(0)=1$. $e^{0.02}\\approx 1 + 1\\cdot0.02 = 1.02$ (thật $1.0202\\ldots$ ✓).

</details>

### 📝 Tóm tắt mục 8

- Gần $a$: $f(x) \\approx f(a) + f'(a)(x-a)$ — giá trị trên tiếp tuyến.
- Tốt khi $x$ gần $a$; sai số do độ cong $f''$. Chọn $a$ "đẹp" và gần $x$.
- Cơ sở của các xấp xỉ vật lý: $\\sin x\\approx x$, $\\ln(1+x)\\approx x$, $(1+x)^n\\approx 1+nx$.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Tìm cực trị $f(x) = x^3 - 6x^2 + 9x$.

**Bài 2**: Khảo sát đồng/nghịch biến $f(x) = x^4 - 4x^2$.

**Bài 3**: Tính $\\lim_{x \\to 0} (e^x - 1)/x$.

**Bài 4**: Tìm điểm uốn của $f(x) = x^3 - 3x^2 + 2$.

**Bài 5**: Một mảnh đất chữ nhật cần chu vi 100 m. Diện tích lớn nhất bao nhiêu?

**Bài 6**: Khảo sát đầy đủ (miền XĐ, tiệm cận, biến thiên, lồi/lõm) hàm $f(x) = \\dfrac{x}{x-2}$.

**Bài 7**: Tìm max/min toàn cục của $f(x) = x^3 - 3x^2 + 2$ trên đoạn $[0, 3]$.

**Bài 8**: Tính $\\lim_{x\\to0^+} x^2\\ln x$.

**Bài 9** (related rates): Một vũng dầu tròn loang ra với bán kính tăng $\\frac{dr}{dt} = 0.5$ m/s. Khi $r = 10$ m, diện tích vũng dầu tăng nhanh cỡ nào?

**Bài 10** (xấp xỉ tuyến tính): Dùng xấp xỉ tuyến tính tính gần đúng $\\sqrt[3]{8.1}$.

### Lời giải

**Bài 1**: $f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$. $f'=0 \\to x=1, 3$.  
- $f''(x) = 6x - 12$. $f''(1) = -6$ → CĐ. $f(1) = 4$. $f''(3) = 6$ → CT. $f(3) = 0$.  
→ **CĐ $(1, 4)$; CT $(3, 0)$**.

**Bài 2**: $f'(x) = 4x^3 - 8x = 4x(x^2-2)$. $f'=0 \\to x=0, \\pm\\sqrt{2}$.  
- $x < -\\sqrt{2}$: $f' < 0$ → giảm.  
- $-\\sqrt{2} < x < 0$: $f' > 0$ → tăng.  
- $0 < x < \\sqrt{2}$: $f' < 0$ → giảm.  
- $x > \\sqrt{2}$: $f' > 0$ → tăng.

**Bài 3**: $0/0$, l'Hôpital: $\\lim e^x / 1 = \\mathbf{1}$.

**Bài 4**: $f''(x) = 6x - 6$. $f''=0 \\to x = 1$. $f(1) = 0$ → **điểm uốn $(1, 0)$**.

**Bài 5**: $2a + 2b = 100 \\to b = 50 - a$. $S(a) = a\\cdot(50-a) = 50a - a^2$. $S'(a) = 50 - 2a = 0 \\to a = 25$. $S = 25\\cdot25 = \\mathbf{625}$ **m²** (hình vuông).

**Bài 6**: $f(x) = \\dfrac{x}{x-2}$.
- **Miền XĐ**: $x \\neq 2$.
- **Tiệm cận**: đứng $x = 2$ (mẫu $=0$); ngang $y = \\lim_{x\\to\\pm\\infty}\\dfrac{x}{x-2} = 1$.
- **$f'$**: $f'(x) = \\dfrac{1\\cdot(x-2) - x\\cdot1}{(x-2)^2} = \\dfrac{-2}{(x-2)^2} < 0$ với mọi $x\\neq2$ → **nghịch biến** trên $(-\\infty,2)$ và $(2,\\infty)$; **không có cực trị**.
- **$f''$**: $f''(x) = \\dfrac{4}{(x-2)^3}$. $x<2$: $f''<0$ (lõm); $x>2$: $f''>0$ (lồi). Không có nghiệm $f''=0$ → **không có điểm uốn** (chỉ đổi dấu qua tiệm cận đứng).
- Cắt trục: $f(0) = 0 \\to$ qua gốc $(0,0)$.

**Bài 7**: $f(x) = x^3 - 3x^2 + 2$ trên $[0,3]$.
- $f'(x) = 3x^2 - 6x = 3x(x-2)$. $f'=0 \\to x=0$ (mút), $x=2$ (trong khoảng).
- Bảng giá trị: $f(0) = 2$ (mút), $f(2) = 8 - 12 + 2 = -2$ (critical), $f(3) = 27 - 27 + 2 = 2$ (mút).
- **Max toàn cục $= 2$** tại $x=0$ và $x=3$; **min toàn cục $= -2$** tại $x=2$.

**Bài 8**: $0^+\\cdot(-\\infty)$ → viết $\\dfrac{\\ln x}{1/x^2}$ (dạng $-\\infty/\\infty$). l'Hôpital: $\\dfrac{1/x}{-2/x^3} = \\dfrac{x^3}{-2x} = -\\dfrac{x^2}{2} \\to \\mathbf{0}$.

**Bài 9**: $A = \\pi r^2 \\Rightarrow \\dfrac{dA}{dt} = 2\\pi r\\dfrac{dr}{dt}$. Thay $r=10$, $\\frac{dr}{dt}=0.5$: $\\dfrac{dA}{dt} = 2\\pi\\cdot10\\cdot0.5 = 10\\pi \\approx \\mathbf{31.4}$ m²/s.

**Bài 10**: $f(x) = \\sqrt[3]{x} = x^{1/3}$, $a = 8$ ($\\sqrt[3]8 = 2$). $f'(x) = \\frac13 x^{-2/3}$, $f'(8) = \\frac13\\cdot\\frac{1}{4} = \\frac{1}{12}$. $\\sqrt[3]{8.1} \\approx 2 + \\frac{1}{12}(0.1) = 2 + 0.00833 = \\mathbf{2.0083}$ (thật $2.00829\\ldots$ ✓).

---

## 10. Bài tiếp theo

[Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

## 📝 Tổng kết

1. **$f' > 0$ → tăng, $f' < 0$ → giảm** (xét dấu trên từng khoảng, lập bảng).
2. **Cực trị**: $f'$ đổi dấu (hoặc $f''>0/<0$); $f'=0$ chỉ là điều kiện **cần** (vd $x^3$). Trên $[a,b]$ phải kiểm cả **hai mút**.
3. **Lồi/lõm**: $f''$. Điểm uốn = $f''$ **đổi dấu** (không chỉ $=0$).
4. **Tiệm cận**: đứng (mẫu $=0$, lim $\\pm\\infty$), ngang (lim ở $\\pm\\infty$), xiên (bậc tử hơn mẫu 1).
5. **l'Hôpital**: $0/0$ hoặc $\\infty/\\infty$ → tính $\\lim f'/g'$; dạng $0\\cdot\\infty$, $1^\\infty$ phải biến đổi trước.
6. **Tối ưu**: viết $f(x)$, xác định miền, giải $f'=0$, kiểm max/min bằng $f''$/biên.
7. **Related rates**: đạo hàm ràng buộc theo $t$ (chain rule) — **đạo hàm trước, thay số sau**.
8. **Xấp xỉ tuyến tính**: $f(x)\\approx f(a)+f'(a)(x-a)$ — tốt khi $x$ gần $a$.
`;
