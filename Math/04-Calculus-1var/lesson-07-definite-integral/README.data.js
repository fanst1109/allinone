// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-07-definite-integral/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Tích phân xác định

## Mục tiêu

- Hiểu **tích phân xác định** $\\int_a^b f(x)\\,dx$ như diện tích dưới đồ thị.
- Định nghĩa qua **tổng Riemann**.
- **Định lý cơ bản giải tích** (FTC) — kết nối đạo hàm và tích phân.
- Tính chất của tích phân xác định.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

---

## 1. Vấn đề diện tích

💡 **Câu hỏi**: Diện tích hình giới hạn bởi $y = x^2$, trục Ox, và 2 đường thẳng $x = 0$, $x = 1$ là bao nhiêu?

Đây là hình **cong** — không có công thức diện tích thẳng. Phải dùng tích phân.

💡 **Trực giác — "cộng vô số lát mỏng"**. Hình dung bạn cắt vùng cần tính thành **rất nhiều dải đứng mỏng** (như cắt một ổ bánh mì thành lát). Mỗi lát rộng $\\Delta x$ rất nhỏ, cao gần bằng $f(x)$ tại vị trí đó, nên diện tích mỗi lát $\\approx f(x) \\cdot \\Delta x$ (gần như một hình chữ nhật mảnh). Diện tích cả vùng = **cộng tất cả các lát**. Cắt càng mỏng → tổng các lát càng khít với hình cong thật. Tích phân chính là **giới hạn của phép cộng đó khi lát mỏng dần về 0** — ký hiệu $\\int$ là chữ "S" (Sum) kéo dài, $dx$ là "bề rộng vô cùng nhỏ" của một lát.

Hình dung bằng ASCII — vùng dưới $y = x^2$ trên $[0, 1]$, xấp xỉ bằng các dải đứng:

\`\`\`
 y
1┤                                   ┌─┐ ← cao f(1)=1
 │                              ┌────┤ │
 │                         ┌────┤    │ │
 │                    ┌────┤    │    │ │
 │               ┌────┤    │    │    │ │
 │          ┌────┤    │    │    │    │ │
 │     ┌────┤    │    │    │    │    │ │
0└─────┴────┴────┴────┴────┴────┴────┴─┴── x
 0                                       1
   ←Δx→  mỗi dải rộng Δx, cao f(xᵢ); cộng hết = xấp xỉ diện tích
\`\`\`

Cắt mịn hơn (nhiều dải hơn) → đường răng cưa phía trên càng bám sát parabol → tổng diện tích các dải càng gần $\\frac{1}{3}$ thật.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng công thức hình học quen thuộc?"* Vì cạnh trên là đường cong $y = x^2$, không phải đoạn thẳng — không có công thức diện tích đa giác/hình tròn nào áp được. Ý tưởng giải tích: **xấp xỉ** bằng nhiều hình chữ nhật mỏng rồi cho số hình $\\to \\infty$.
- *"Diện tích này có ra số cụ thể không?"* Có, và bằng đúng $\\frac{1}{3}$ (sẽ tính ở mục 2 + 3). Đường cong vẫn cho diện tích hữu hạn xác định.

### 📝 Tóm tắt mục 1

- Diện tích dưới đường **cong** không có công thức hình học trực tiếp.
- Giải pháp: xấp xỉ bằng hình chữ nhật mỏng, lấy giới hạn → tích phân.
- Trực giác: tích phân = **cộng vô số lát mỏng** $f(x) \\cdot \\Delta x$; $\\int$ = "S" (Sum) kéo dài.
- Ví dụ dẫn dắt $\\int_0^1 x^2\\,dx = \\frac{1}{3}$ (tính ở mục 2-3).

---

## 2. Tổng Riemann — Định nghĩa tích phân

💡 **Ý tưởng**: Chia khoảng $[a, b]$ thành $n$ đoạn nhỏ, mỗi đoạn rộng $\\Delta x = (b-a)/n$. Trên mỗi đoạn, **xấp xỉ diện tích bằng hình chữ nhật** chiều cao $f(x_i)$.

$$\\text{Tổng Riemann: } S_n = \\sum_{i=1}^n f(x_i) \\cdot \\Delta x$$

Khi $n \\to \\infty$ (mảnh càng mỏng), tổng $\\to$ diện tích thật.

$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum f(x_i) \\cdot \\Delta x$$

### Ví dụ số: $\\int_0^1 x^2\\,dx$

Chia $[0, 1]$ thành $n$ đoạn, dùng cận phải. $x_i = i/n$, $\\Delta x = 1/n$.

$$S_n = \\sum_{i=1}^n \\left(\\frac{i}{n}\\right)^2 \\cdot \\frac{1}{n} = \\frac{1}{n^3} \\cdot \\sum i^2$$

Dùng công thức $\\sum i^2 = n(n+1)(2n+1)/6$:

$$S_n = \\frac{n(n+1)(2n+1)}{6n^3} = \\frac{(1 + 1/n)(2 + 1/n)}{6}$$

Khi $n \\to \\infty$: $S_n \\to (1 \\cdot 2)/6 =$ **$\\frac{1}{3}$**.

$\\to \\int_0^1 x^2\\,dx =$ **$\\frac{1}{3}$**.

**Kiểm tra bằng số**:
- $n=10$: $S \\approx 0.385$.
- $n=100$: $S \\approx 0.3383$.
- $n=1000$: $S \\approx 0.3338$.
- $\\to \\frac{1}{3} \\approx 0.3333$.

### Ba cách chọn chiều cao hình chữ nhật — Trái / Phải / Giữa

Mỗi dải nằm trên một đoạn nhỏ $[x_{i-1}, x_i]$. Chiều cao hình chữ nhật là $f$ tại **một điểm** trong đoạn đó — chọn điểm nào thì có 3 quy ước phổ biến:

| Cách chọn | Điểm lấy chiều cao $x_i^*$ | Với $f$ **tăng** |
|-----------|---------------------------|------------------|
| **Trái (Left)** | mép trái $x_{i-1}$ | thấp hơn thật (underestimate) |
| **Phải (Right)** | mép phải $x_i$ | cao hơn thật (overestimate) |
| **Giữa (Mid)** | trung điểm $\\frac{x_{i-1}+x_i}{2}$ | thường chính xác nhất |

ASCII — cùng đường cong tăng, 3 cách đặt chiều cao dải (mỗi \`█\` là một dải):

\`\`\`
 LEFT (chiều cao = mép trái)   RIGHT (mép phải)        MID (trung điểm)
 cong ở trên, dải tụt xuống    cong ở dưới, dải nhô     dải khớp giữa, lệch ít
   ╭─                            ─╮  ┌┐                    ╭─┐
  ╭┘ ┌┐                        ┌┐ │  ││                  ┌─┤ │
 ╭┘┌┐│ │                      ┌┐│ └──┘│ ╱cong            │ │ │ ╱cong
╭┘┌┘│└─┘                    ┌─┘│└─────┘                  │ └─┤
█████████  → dải THẤP        █████████  → dải CAO        █████████ → khớp tốt
underestimate               overestimate                gần nhất
\`\`\`

Bất kể chọn cách nào, khi $n \\to \\infty$ cả ba **cùng tiến về một số** — đó là tích phân xác định. Chọn cách nào chỉ ảnh hưởng **tốc độ hội tụ**: Trái/Phải sai số $\\sim O(1/n)$, Giữa sai số $\\sim O(1/n^2)$ (nhanh hơn hẳn).

### Walk-through tổng Riemann từng bước — $\\int_0^1 x^2\\,dx$ với $n = 4$ (cận phải)

Làm tay từng bước, không bỏ qua phép nào.

**Bước 1 — tính bề rộng dải.** $\\Delta x = \\dfrac{b - a}{n} = \\dfrac{1 - 0}{4} = 0.25$.

**Bước 2 — liệt kê điểm chia.** $x_0 = 0,\\ x_1 = 0.25,\\ x_2 = 0.5,\\ x_3 = 0.75,\\ x_4 = 1$.

**Bước 3 — chọn điểm lấy chiều cao (cận phải).** $x_i^* = x_i$ với $i = 1..4$: tức $0.25,\\ 0.5,\\ 0.75,\\ 1$.

**Bước 4 — tính chiều cao $f(x_i^*) = (x_i^*)^2$ và diện tích mỗi dải $f(x_i^*)\\cdot\\Delta x$.**

| $i$ | $x_i^*$ | $f(x_i^*)=(x_i^*)^2$ | $f(x_i^*)\\cdot\\Delta x$ |
|-----|---------|----------------------|--------------------------|
| 1 | 0.25 | 0.0625 | $0.0625 \\times 0.25 = 0.015625$ |
| 2 | 0.50 | 0.2500 | $0.2500 \\times 0.25 = 0.062500$ |
| 3 | 0.75 | 0.5625 | $0.5625 \\times 0.25 = 0.140625$ |
| 4 | 1.00 | 1.0000 | $1.0000 \\times 0.25 = 0.250000$ |
| | | **tổng $S_4$ (phải)** | **0.468750** |

**Bước 5 — cộng lại.** $S_4 \\text{ (phải)} = 0.015625 + 0.0625 + 0.140625 + 0.25 = 0.46875$.

So với thật $\\frac13 \\approx 0.3333$: cận phải cho $0.46875$ — cao hơn (overestimate) vì $x^2$ tăng. Làm tương tự cận **trái** ($x_i^* = 0, 0.25, 0.5, 0.75$) ra $S_4 \\text{ (trái)} = 0.21875$ (thấp hơn). Cận **giữa** ($x_i^* = 0.125, 0.375, 0.625, 0.875$) ra $S_4 \\text{ (giữa)} = 0.328125$ — gần nhất. Giá trị thật luôn **kẹp giữa** trái và phải.

### Bảng tổng hội tụ khi $n$ tăng — $\\int_0^1 x^2\\,dx$

| $n$ | $S_n$ (trái) | $S_n$ (phải) | $S_n$ (giữa) | sai số (giữa) |
|-----|--------------|--------------|--------------|---------------|
| 4    | 0.21875  | 0.46875  | 0.328125 | 0.0052 |
| 10   | 0.285000 | 0.385000 | 0.332500 | 0.0008 |
| 100  | 0.328350 | 0.338350 | 0.333325 | 8.3e-6 |
| 1000 | 0.332834 | 0.333834 | 0.333333 | 8.3e-8 |
| $\\infty$ | $\\frac13$ | $\\frac13$ | $\\frac13$ | 0 |

Đọc bảng: trái dâng lên, phải hạ xuống, cả hai **kẹp dần** $\\frac13$; giữa đã sát ngay từ $n$ nhỏ. Tăng $n$ gấp 10 → sai số giữa giảm ~100 lần (bậc 2), còn trái/phải chỉ giảm ~10 lần (bậc 1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dùng cận trái hay cận phải của mỗi đoạn?"* Với hàm liên tục, khi $n \\to \\infty$ cả hai (và điểm bất kỳ trong đoạn) cho **cùng** giới hạn. Vd $\\int_0^1 x^2\\,dx$: cận phải cho $0.385$ ($n=10$), cận trái cho $0.285$ — nhưng cả hai $\\to \\frac{1}{3}$. Chọn cận nào chỉ ảnh hưởng tốc độ hội tụ.
- *"Vì sao $\\sum i^2 = n(n+1)(2n+1)/6$?"* Đây là công thức tổng bình phương đã biết (chứng minh bằng quy nạp). Kiểm $n=3$: $1+4+9 = 14$, công thức $3 \\cdot 4 \\cdot 7/6 = 84/6 = 14$ ✓. Nó cho phép biến tổng Riemann thành biểu thức đóng rồi mới lấy giới hạn.
- *"Hàm nào thì tổng Riemann chắc chắn hội tụ?"* Mọi hàm **liên tục** trên $[a, b]$ đều **khả tích (integrable)** — giới hạn $\\lim_n S_n$ tồn tại và không phụ thuộc cách chọn $x_i^*$ (trái/phải/giữa đều cùng số). Hàm bị chặn và chỉ gián đoạn ở hữu hạn điểm cũng khả tích. Chỉ những hàm "bệnh hoạn" (vd hàm Dirichlet — bằng 1 ở số hữu tỉ, 0 ở vô tỉ) mới không khả tích theo Riemann.

⚠ **Lỗi thường gặp — quên nhân $\\Delta x$**. Tổng Riemann là $\\sum f(x_i) \\cdot \\Delta x$, KHÔNG phải $\\sum f(x_i)$. Thiếu $\\Delta x$ (= bề rộng hình chữ nhật) thì kết quả không phải diện tích. Vd quên $1/n$ ở trên sẽ ra $\\infty$ thay vì $\\frac{1}{3}$.

🔁 **Dừng lại tự kiểm tra**

1. Với $\\int_0^1 x^2\\,dx$, công thức $S_n = (1+1/n)(2+1/n)/6$. Tính $S_n$ khi $n = 2$.
2. Khi $n \\to \\infty$, mỗi hình chữ nhật rộng $\\Delta x$ tiến về đâu?
3. Cho $f(x) = 2x$ trên $[0, 3]$, $n = 3$, cận phải. Tính $S_3$ và so với diện tích tam giác.

<details><summary>Đáp án</summary>

1. $(1+0.5)(2+0.5)/6 = (1.5 \\cdot 2.5)/6 = 3.75/6 = 0.625$ (xấp xỉ thô vì $n$ nhỏ).
2. $\\Delta x = 1/n \\to 0$ (hình chữ nhật càng mỏng, xấp xỉ càng khít đường cong).
3. $\\Delta x = 1$; $x_i^* = 1, 2, 3$; $f = 2, 4, 6$; $S_3 = (2+4+6)\\cdot 1 = 12$. Diện tích tam giác đáy 3, cao 6 là $\\frac{3 \\cdot 6}{2} = 9$. Cận phải overestimate (12 > 9) vì $f$ tăng. Dùng cận **giữa** ($x_i^* = 0.5, 1.5, 2.5$, $f = 1, 3, 5$) cho $S_3 = 9$ — khớp chính xác.

</details>

### 📝 Tóm tắt mục 2

- Tổng Riemann $S_n = \\sum f(x_i) \\cdot \\Delta x$ xấp xỉ diện tích bằng $n$ hình chữ nhật.
- $\\int_a^b f\\,dx = \\lim_{n \\to \\infty} S_n$ — giới hạn khi hình chữ nhật mỏng vô hạn.
- 3 cách chọn chiều cao: **Trái / Phải / Giữa**. Trái-phải kẹp giá trị thật; giữa hội tụ nhanh nhất ($O(1/n^2)$ so với $O(1/n)$).
- Mọi hàm **liên tục** trên $[a,b]$ đều khả tích — cả 3 cách cùng giới hạn.
- **Đừng quên $\\Delta x$**; nhớ $\\Delta x = \\frac{b-a}{n}$ chứ không phải $\\frac1n$ khi $b - a \\neq 1$.

---

## 3. Định lý cơ bản giải tích (Fundamental Theorem of Calculus)

🎯 **Đây là định lý quan trọng nhất Calculus**, kết nối đạo hàm và tích phân.

### Phần 1 (FTC1)
Nếu $f$ liên tục trên $[a, b]$ và $F(x) = \\int_a^x f(t)\\,dt$, thì **$F'(x) = f(x)$**.

💡 Đọc: "Đạo hàm của tích phân = chính hàm". Đạo hàm và tích phân là **2 phép toán ngược nhau**.

💡 **Vì sao FTC nối đạo hàm ↔ tích phân? — lập luận "diện tích tích lũy"**. Đặt $G(x) = \\int_a^x f(t)\\,dt$ = "diện tích đã gom được tính từ $a$ đến $x$". Tăng $x$ thêm một chút $h$: phần diện tích **mới thêm** là một dải hẹp từ $x$ đến $x + h$ — rộng $h$, cao gần như $f(x)$ (vì $f$ liên tục, trên đoạn cực ngắn nó gần như không đổi). Nên:

$$G(x + h) - G(x) \\approx f(x) \\cdot h \\quad\\Longrightarrow\\quad \\frac{G(x+h) - G(x)}{h} \\approx f(x)$$

Cho $h \\to 0$, vế trái đúng bằng định nghĩa đạo hàm $G'(x)$, vế phải là $f(x)$. Vậy $G'(x) = f(x)$ — **đạo hàm của diện tích tích lũy = chính hàm gốc**. Đó là FTC1, và nó *không phải trùng hợp*: gom diện tích (tích phân) rồi đo tốc độ gom (đạo hàm) thì quay lại đúng hàm ban đầu. Từ FTC1 suy ra FTC2: nếu $F$ là nguyên hàm bất kỳ thì $F$ và $G$ chỉ chênh một hằng số (vì $(F - G)' = f - f = 0$), nên $F(b) - F(a) = G(b) - G(a) = G(b) - 0 = \\int_a^b f$.

💡 **Trực giác xe chạy**: $v(t)$ là vận tốc trên đồng hồ, $G(t)$ là số trên đồng hồ quãng đường. Hai điều hiển nhiên — "tốc độ tăng quãng đường = vận tốc" ($G' = v$) và "quãng đường đi từ 0 đến $T$ = diện tích dưới đồ thị vận tốc" ($G(T) - G(0) = \\int_0^T v\\,dt$) — gộp lại chính là FTC.

### Phần 2 (FTC2) — Cách tính tích phân thực tế
Nếu $F$ là **nguyên hàm** của $f$ ($F' = f$), thì:

$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$

> 📐 **Định nghĩa đầy đủ — Định lý cơ bản giải tích (FTC)**
>
> **(a) Là gì**: Cây cầu nối **đạo hàm và tích phân**. Phần 1: nếu ta tích phân $f$ rồi đạo hàm, ta được lại $f$ (ngược nhau). Phần 2: tích phân xác định = hiệu nguyên hàm ở 2 đầu, $F(b) - F(a)$. Không cần tính tổng Riemann vô hạn nữa.
>
> **(b) Vì sao cần**: Trước Newton/Leibniz, tính diện tích = tổng Riemann thủ công, **cực kỳ khó** với hàm bất kỳ. Archimedes đã làm cho parabol bằng tổng Riemann, mất nhiều trang giấy chỉ cho 1 hàm. FTC biến phép tính diện tích thành 2 phép tính nguyên hàm + trừ — đơn giản hơn vô số lần. Đây là **lý do** Calculus tạo ra cách mạng khoa học thế kỷ 17: từ nay tính diện tích, thể tích, công, lưu lượng... trở nên hệ thống. Là đỉnh cao của toán THPT.
>
> **(c) Ví dụ số**: $\\int_0^1 x^2\\,dx$. $F(x) = x^3/3$. $F(1) - F(0) = 1/3 - 0 =$ **$\\frac{1}{3}$**. Verify bằng tổng Riemann ($n \\to \\infty$ cho cùng kết quả $\\approx 0.333$). $\\int_0^\\pi \\sin x\\,dx = \\left.-\\cos x\\right|_0^\\pi = -\\cos \\pi + \\cos 0 = 1+1 =$ **2**. $\\int_1^e (1/x)\\,dx = \\ln e - \\ln 1 =$ **1**. $\\int_0^1 e^x\\,dx = e^1 - e^0 = e - 1 \\approx$ **1.718**. Diện tích dưới đường thẳng $y = 2x$ trên $[0, 5]$: $\\int_0^5 2x\\,dx = \\left.x^2\\right|_0^5 = 25$ ✓ (= tam giác đáy 5 cao 10 $\\to \\frac{1}{2} \\cdot 5 \\cdot 10 = 25$).

Viết tắt: $F(b) - F(a)$ thường ghi là $\\left[F(x)\\right]_a^b$ hoặc $\\left.F(x)\\right|_a^b$.

💡 **Quy trình tính tích phân**:
1. Tìm nguyên hàm $F(x)$ (như L06).
2. Tính $F(b) - F(a)$.

**Ví dụ**: $\\int_0^1 x^2\\,dx$.
- $F(x) = x^3/3$ (1 nguyên hàm bất kỳ, không cần $+C$ vì cancel khi trừ).
- $F(1) - F(0) = 1/3 - 0 =$ **$\\frac{1}{3}$** ✓.

Khớp với kết quả tổng Riemann!

### Walk-through FTC từng bước — bốn ví dụ

Mỗi ví dụ: (1) tìm nguyên hàm $F$ — kiểm bằng cách đạo hàm ngược lại; (2) tính $F(b) - F(a)$.

**Ví dụ A — $\\int_0^2 3x^2\\,dx$ (đa thức).**
- Cần $F$ với $F'(x) = 3x^2$. Vì $(x^3)' = 3x^2$, lấy $F(x) = x^3$ (kiểm: $(x^3)' = 3x^2$ ✓).
- $F(2) - F(0) = 2^3 - 0^3 = 8 - 0 =$ **8**.
- Verify diện tích thật: tổng Riemann hội tụ về 8 khi $n \\to \\infty$.

**Ví dụ B — $\\int_0^\\pi \\sin x\\,dx$ (lượng giác, dễ sai dấu).**
- Cần $F'(x) = \\sin x$. Vì $(\\cos x)' = -\\sin x$, nên $(-\\cos x)' = \\sin x$ → lấy $F(x) = -\\cos x$ (kiểm: $(-\\cos x)' = \\sin x$ ✓).
- Tính từng đầu: $F(\\pi) = -\\cos\\pi = -(-1) = 1$; $F(0) = -\\cos 0 = -1$.
- $F(\\pi) - F(0) = 1 - (-1) =$ **2**. (Cẩn thận hai dấu trừ liên tiếp.)

**Ví dụ C — $\\int_1^e \\frac{1}{x}\\,dx$ (hàm $1/x$ ra log).**
- Cần $F'(x) = \\frac1x$. Theo bảng nguyên hàm, $F(x) = \\ln|x|$ (kiểm: $(\\ln x)' = \\frac1x$ ✓). Trên $[1, e]$, $x > 0$ nên bỏ trị tuyệt đối.
- $F(e) - F(1) = \\ln e - \\ln 1 = 1 - 0 =$ **1**.

**Ví dụ D — $\\int_0^1 e^x\\,dx$ (hàm mũ tự nguyên hàm).**
- Cần $F'(x) = e^x$. Vì $(e^x)' = e^x$, lấy $F(x) = e^x$ (kiểm ✓ — "hàm tự nguyên hàm").
- $F(1) - F(0) = e^1 - e^0 = e - 1 \\approx 2.718 - 1 =$ **1.718**.

**Ví dụ E (bonus) — đường thẳng, đối chiếu hình học.** $\\int_0^5 2x\\,dx$. $F(x) = x^2$. $F(5) - F(0) = 25 - 0 =$ **25**. Kiểm bằng hình học: vùng dưới $y = 2x$ trên $[0, 5]$ là tam giác đáy 5, cao $2 \\cdot 5 = 10$ → diện tích $\\frac{5 \\cdot 10}{2} = 25$ ✓. FTC và hình học khớp nhau.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không cần $+C$ ở tích phân xác định?"* Vì khi tính $F(b) - F(a)$, hằng số bị triệt tiêu: $(F(b)+C) - (F(a)+C) = F(b) - F(a)$. Tích phân **bất định** (nguyên hàm) cần $+C$, nhưng tích phân **xác định** thì không.
- *"FTC1 và FTC2 liên hệ thế nào?"* FTC1 nói "tích phân rồi đạo hàm $\\to$ trở lại hàm gốc" (chứng minh đạo hàm và tích phân ngược nhau). FTC2 là **hệ quả tính toán**: dùng nguyên hàm để tính tích phân xác định mà không cần tổng Riemann.
- *"Chọn nguyên hàm nào trong FTC2?"* Bất kỳ một nguyên hàm nào cũng được (hằng số tự triệt tiêu). Thường chọn cái đơn giản nhất với $C = 0$.

⚠ **Lỗi thường gặp — tính $F(a) - F(b)$ thay vì $F(b) - F(a)$**. Thứ tự là **cận trên trừ cận dưới**. Đảo lại sẽ ra dấu ngược. Vd $\\int_0^1 x^2\\,dx = F(1)-F(0) = 1/3$, nếu viết $F(0)-F(1) = -1/3$ là sai dấu.

⚠ **Lỗi thường gặp — sai dấu khi tìm nguyên hàm của $\\sin/\\cos$**. $\\int \\sin x\\,dx = -\\cos x$ (có dấu trừ), $\\int \\cos x\\,dx = +\\sin x$ (không trừ). Viết $\\int \\sin x\\,dx = \\cos x$ là sai — kiểm ngay bằng đạo hàm: $(\\cos x)' = -\\sin x \\neq \\sin x$. **Mẹo phòng sai**: tìm xong $F$, luôn đạo hàm $F$ kiểm có ra lại $f$ không.

⚠ **Lỗi thường gặp — dùng công thức $\\frac{x^{n+1}}{n+1}$ cho $n = -1$**. Với $\\int \\frac1x\\,dx$ ($n = -1$) công thức lũy thừa chia cho $n + 1 = 0$ → vô nghĩa. Trường hợp này nguyên hàm là $\\ln|x|$, không phải $\\frac{x^0}{0}$.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_0^2 3x^2\\,dx = ?$ (dùng FTC2).
2. $\\int_1^3 (1/x)\\,dx = ?$
3. $\\int_0^{\\pi/2} \\cos x\\,dx = ?$
4. Vì sao tính $\\int_a^b$ chỉ cần MỘT nguyên hàm $F$ bất kỳ, không cần $+C$?

<details><summary>Đáp án</summary>

1. $F(x) = x^3 \\to F(2) - F(0) = 8 - 0 = 8$.
2. $F(x) = \\ln|x| \\to \\ln 3 - \\ln 1 = \\ln 3 \\approx 1.0986$.
3. $F(x) = \\sin x \\to \\sin(\\pi/2) - \\sin 0 = 1 - 0 = 1$.
4. Vì khi trừ, hằng số triệt tiêu: $(F(b)+C) - (F(a)+C) = F(b) - F(a)$. Chọn $C = 0$ cho gọn.

</details>

### 📝 Tóm tắt mục 3

- FTC1: $\\dfrac{d}{dx} \\int_a^x f(t)\\,dt = f(x)$ — đạo hàm và tích phân ngược nhau (lập luận "diện tích tích lũy").
- FTC2: $\\int_a^b f\\,dx = F(b) - F(a)$ với $F' = f$ — tính tích phân qua nguyên hàm, không cần tổng Riemann.
- Không cần $+C$ (triệt tiêu khi trừ); thứ tự **trên trừ dưới**.
- Quy trình: tìm $F$ → đạo hàm $F$ kiểm lại ra $f$ → thế cận. Cẩn thận dấu của $\\int\\sin = -\\cos$ và $\\int\\frac1x = \\ln|x|$.

---

## 4. Tính chất tích phân xác định

| Tính chất | Công thức |
|-----------|-----------|
| Hằng nhân | $\\int c \\cdot f\\,dx = c \\cdot \\int f\\,dx$ |
| Tổng | $\\int (f + g)\\,dx = \\int f\\,dx + \\int g\\,dx$ |
| Cộng đoạn | $\\int_a^b = \\int_a^c + \\int_c^b$ |
| Đảo cận | $\\int_a^b = -\\int_b^a$ |
| Trùng cận | $\\int_a^a = 0$ |
| Diện tích âm | $f < 0 \\to$ tích phân âm |
| So sánh | $f \\leq g \\to \\int_a^b f \\leq \\int_a^b g$ |

### Walk-through verify từng tính chất bằng số

Mỗi tính chất kèm một ví dụ tính cả hai vế để thấy bằng nhau.

**1. Tuyến tính** ($\\int (\\alpha f + \\beta g) = \\alpha\\int f + \\beta\\int g$), lấy $f = x$, $g = x^2$, $[0,1]$, $\\alpha = 2$, $\\beta = 3$:
- Vế trái: $\\int_0^1 (2x + 3x^2)\\,dx = \\left[x^2 + x^3\\right]_0^1 = (1 + 1) - 0 = 2$.
- Vế phải: $2\\int_0^1 x\\,dx + 3\\int_0^1 x^2\\,dx = 2\\cdot\\frac12 + 3\\cdot\\frac13 = 1 + 1 = 2$ ✓.

**2. Cộng đoạn** ($\\int_a^c = \\int_a^b + \\int_b^c$), lấy $f = x$, tách $[0,4]$ qua $b = 2$:
- $\\int_0^4 x\\,dx = \\left[\\frac{x^2}{2}\\right]_0^4 = 8$.
- $\\int_0^2 x\\,dx + \\int_2^4 x\\,dx = \\frac{4}{2} + \\left(\\frac{16}{2} - \\frac{4}{2}\\right) = 2 + 6 = 8$ ✓.

**3. Đảo cận** ($\\int_b^a = -\\int_a^b$), lấy $f = x$, $[0,1]$:
- $\\int_1^0 x\\,dx = \\left[\\frac{x^2}{2}\\right]_1^0 = 0 - \\frac12 = -\\frac12 = -\\int_0^1 x\\,dx$ ✓. (Trực giác: đi ngược chiều thì $\\Delta x < 0$.)

**4. Trùng cận** ($\\int_a^a = 0$): $\\int_3^3 x^2\\,dx = F(3) - F(3) = 0$ — bề rộng miền bằng 0, không gom được diện tích nào.

**5. So sánh** ($f \\leq g \\Rightarrow \\int f \\leq \\int g$): trên $[0,1]$ có $x^2 \\leq x$ (vì $0 \\leq x \\leq 1$). Kiểm: $\\int_0^1 x^2 = \\frac13 \\leq \\frac12 = \\int_0^1 x$ ✓. Hệ quả "kẹp hộp": nếu $m \\leq f \\leq M$ thì $m(b-a) \\leq \\int_a^b f \\leq M(b-a)$.

⚠ **Tích phân có thể âm**: $\\int_a^b f\\,dx$ **không phải lúc nào cũng = diện tích**. Là **diện tích đại số** — phần trên Ox cộng, phần dưới trừ.

ASCII — diện tích có dấu của $\\sin x$ trên $[0, 2\\pi]$:

\`\`\`
 +1┤        ╭───╮                              dương: gom (+)
   │      ╱       ╲       (+A)
  0┼────╱───────────╲────────────────╱──── x
   │   0      π       ╲     (−A)    ╱   2π
 −1┤                    ╲─────────╱          âm: gom (−)
        └── trên Ox: + ──┘└── dưới Ox: − ──┘
   tổng đại số = (+A) + (−A) = 0   ;   diện tích thật = A + A = 4
\`\`\`

**Ví dụ**: $\\int_0^{2\\pi} \\sin x\\,dx = \\left.-\\cos x\\right|_0^{2\\pi} = -\\cos(2\\pi) + \\cos(0) = -1 + 1 =$ **0**. (Phần dương từ $0$-$\\pi$ và phần âm từ $\\pi$-$2\\pi$ triệt tiêu nhau.)

Nếu muốn **diện tích thật**: $\\int_0^{2\\pi} |\\sin x|\\,dx = 4$.

💡 **Trực giác**: tích phân xác định là **diện tích có dấu** — phần đồ thị trên trục Ox đóng góp dương, phần dưới đóng góp âm. Như "lãi và lỗ" cộng dồn: tổng đại số có thể nhỏ hơn tổng độ lớn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tích phân bằng 0 có nghĩa hàm bằng 0?"* Không. $\\int_0^{2\\pi} \\sin x\\,dx = 0$ nhưng $\\sin x$ không hề bằng 0 khắp nơi — phần dương và âm **triệt tiêu**. Tích phân = 0 chỉ nói tổng đại số bằng 0.
- *"Khi nào dùng tính chất cộng đoạn?"* Khi hàm đổi công thức/đổi dấu giữa chừng, hoặc muốn tách $\\int_a^b = \\int_a^c + \\int_c^b$ để xử lý từng phần. Rất hữu ích với hàm chia khúc hay $|f(x)|$.

⚠ **Lỗi thường gặp — lẫn tích phân với diện tích thật**. Để tính **diện tích** giữa đường và trục khi hàm đổi dấu, phải lấy $\\int|f|$ (chia đoạn theo dấu), KHÔNG phải $\\int f$. Vd diện tích của $\\sin x$ trên $[0, 2\\pi]$ là $4$, không phải $0$.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_{-1}^1 x\\,dx = ?$ Giải thích.
2. Tách $\\int_0^4 f\\,dx$ qua điểm $c = 2$ như thế nào?
3. Tính **diện tích thật** giữa $y = \\sin x$ và trục Ox trên $[0, 2\\pi]$ (không phải tích phân).

<details><summary>Đáp án</summary>

1. $\\left.x^2/2\\right|_{-1}^1 = 1/2 - 1/2 = 0$ (hàm lẻ, phần âm $[-1,0]$ triệt tiêu phần dương $[0,1]$).
2. $\\int_0^4 f\\,dx = \\int_0^2 f\\,dx + \\int_2^4 f\\,dx$ (cộng đoạn).
3. Tách theo dấu: $\\int_0^\\pi \\sin x\\,dx = 2$ (dương) và $\\int_\\pi^{2\\pi}\\sin x\\,dx = -2$ (âm). Diện tích thật $= |2| + |-2| = 4$, khác hẳn tích phân $= 0$.

</details>

### 📝 Tóm tắt mục 4

- Tích phân tuyến tính, cộng đoạn $\\int_a^b = \\int_a^c + \\int_c^b$, đảo cận đổi dấu, $\\int_a^a = 0$.
- So sánh: $f \\leq g \\Rightarrow \\int f \\leq \\int g$; kẹp hộp $m(b-a) \\leq \\int_a^b f \\leq M(b-a)$.
- Tích phân là **diện tích có dấu** — phần dưới Ox âm; có thể bằng 0 dù hàm $\\neq 0$.
- Muốn **diện tích thật** khi hàm đổi dấu: chia đoạn theo dấu rồi cộng trị tuyệt đối ($\\int|f|$).

---

## 5. Đổi biến trong tích phân xác định

$$\\int_a^b f(g(x)) \\cdot g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$$

⚠ **Lưu ý**: Phải **đổi cả cận** theo $u$.

**Ví dụ**: $\\int_0^1 2x \\cdot e^{x^2}\\,dx$.
- Đặt $u = x^2$, $du = 2x\\,dx$.
- $x = 0 \\to u = 0$; $x = 1 \\to u = 1$.
- $= \\int_0^1 e^u\\,du = e - 1 \\approx 1.718$.

### Walk-through đổi biến từng bước — ba ví dụ

Đổi biến chính là **chain rule chạy ngược** (xem [Lesson 04 — Chain rule](../lesson-04-chain-rule/)): nhận ra biểu thức trong tích phân có dạng $f(g(x))\\cdot g'(x)$ rồi gom $g(x)$ thành $u$.

**Ví dụ A — $\\int_1^2 2x\\cdot e^{x^2}\\,dx$ (đổi cận thực sự khác).**
- Đặt $u = x^2 \\Rightarrow du = 2x\\,dx$.
- Đổi cận: $x = 1 \\to u = 1$; $x = 2 \\to u = 4$ (lần này cận **thay đổi rõ**, không trùng như $[0,1]$).
- $= \\int_1^4 e^u\\,du = e^4 - e^1 \\approx 54.60 - 2.72 =$ **51.88**.

**Ví dụ B — $\\int_0^{\\sqrt\\pi} x\\cos(x^2)\\,dx$ (gom hằng số).**
- Đặt $u = x^2 \\Rightarrow du = 2x\\,dx \\Rightarrow x\\,dx = \\frac{du}{2}$.
- Đổi cận: $x = 0 \\to u = 0$; $x = \\sqrt\\pi \\to u = \\pi$.
- $= \\int_0^\\pi \\cos u\\cdot\\frac{du}{2} = \\frac12\\left[\\sin u\\right]_0^\\pi = \\frac12(\\sin\\pi - \\sin 0) = \\frac12(0 - 0) =$ **0**.

**Ví dụ C — $\\int_0^1 \\frac{2x}{1+x^2}\\,dx$ (tử là đạo hàm mẫu → ra log).**
- Đặt $u = 1 + x^2 \\Rightarrow du = 2x\\,dx$.
- Đổi cận: $x = 0 \\to u = 1$; $x = 1 \\to u = 2$.
- $= \\int_1^2 \\frac{du}{u} = \\left[\\ln u\\right]_1^2 = \\ln 2 - \\ln 1 = \\ln 2 \\approx$ **0.693**.

💡 **Trực giác**: giống đổi biến cho nguyên hàm, nhưng cận tích phân là "vị trí trên trục x" — khi đổi sang biến $u$, các vị trí đó cũng phải dịch sang giá trị $u$ tương ứng. Đổi cận giúp **không cần** thay $u$ trở lại $x$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đổi cận rồi có cần thay $u$ về $x$ không?"* Không. Khi đã đổi cận sang $u$, tính thẳng $\\int_{g(a)}^{g(b)} f(u)\\,du$ rồi áp FTC2 với biến $u$. Đỡ một bước so với nguyên hàm bất định.
- *"Nếu quên đổi cận thì sao?"* Sẽ tính $\\left[F(u)\\right]$ với cận $x$ cũ → kết quả sai. Phải chọn một trong hai: đổi cận theo $u$, **hoặc** thay $u$ về $x$ rồi dùng cận $x$ gốc — không trộn.

⚠ **Lỗi thường gặp — đổi biến nhưng giữ nguyên cận $x$**. $\\int_0^1 2x \\cdot e^{x^2}\\,dx$: sau khi đặt $u = x^2$, nếu vẫn viết $\\int_0^1 e^u\\,du$ với cận $x$ cũ thì... ở đây trùng hợp $0 \\to 0, 1 \\to 1$ nên đúng; nhưng $\\int_1^2 2x \\cdot e^{x^2}\\,dx$ thì $u$ chạy $1 \\to 4$, giữ cận $1 \\to 2$ sẽ sai. Luôn đổi cận theo $u = g(x)$.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_0^2 2x \\cdot e^{x^2}\\,dx$ — cận $u$ mới là gì? Tính kết quả.
2. Vì sao đổi cận tiện hơn thay $u$ về $x$?

<details><summary>Đáp án</summary>

1. $u = x^2$: $x=0 \\to u=0$, $x=2 \\to u=4$. $\\int_0^4 e^u\\,du = e^4 - 1 \\approx 53.6$.
2. Vì tránh được bước thay $u = g(x)$ ngược lại — tính trực tiếp trên biến $u$ với cận mới.

</details>

### 📝 Tóm tắt mục 5

- Đổi biến tích phân xác định: $\\int_a^b f(g(x))g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$.
- **Phải đổi cả cận** theo $u = g(x)$; sau đó không cần thay $u$ về $x$.
- Hoặc đổi cận, hoặc thay $u$ về $x$ rồi dùng cận gốc — không trộn lẫn.

---

## 6. Tích phân từng phần xác định

$$\\int_a^b u\\,dv = \\left[u \\cdot v\\right]_a^b - \\int_a^b v\\,du$$

💡 **Từng phần = product rule chạy ngược**. Từ $(uv)' = u'v + uv'$, lấy tích phân hai vế trên $[a,b]$: $\\left[uv\\right]_a^b = \\int_a^b u'v\\,dx + \\int_a^b uv'\\,dx$. Chuyển vế ra đúng công thức trên. Chọn $u, dv$ theo **LIATE** (ưu tiên đặt $u$ là: **L**og > **I**nverse trig > **A**lgebraic > **T**rig > **E**xponential) — vì ta muốn $u$ đạo hàm thì **đơn giản dần**, còn $dv$ thì dễ tìm nguyên hàm.

**Ví dụ**: $\\int_0^\\pi x \\cdot \\sin x\\,dx$.
- $u = x$, $dv = \\sin x\\,dx$. $v = -\\cos x$.
- $= \\left[-x \\cdot \\cos x\\right]_0^\\pi + \\int_0^\\pi \\cos x\\,dx$
- $= -\\pi \\cdot \\cos \\pi + 0 + \\left[\\sin x\\right]_0^\\pi$
- $= \\pi + 0 - 0 =$ **$\\pi$**.

💡 **Trực giác**: công thức giống nguyên hàm $\\int u\\,dv = uv - \\int v\\,du$, chỉ thêm việc **đánh giá $uv$ tại hai cận** ngay. Phần $\\left[uv\\right]_a^b$ lấy giá trị ở hai đầu, phần $\\int_a^b v\\,du$ vẫn là tích phân xác định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$\\left[u \\cdot v\\right]_a^b$ tính thế nào?"* Thay cận trên trừ cận dưới vào tích $u \\cdot v$. Ví dụ trên: $\\left[-x \\cdot \\cos x\\right]_0^\\pi = (-\\pi \\cdot \\cos \\pi) - (-0 \\cdot \\cos 0) = (-\\pi \\cdot (-1)) - 0 = \\pi$.
- *"Chọn $u, dv$ có khác nguyên hàm không?"* Không, vẫn theo **LIATE** như L06. Chỉ thêm bước đánh giá tại cận.
- *"Có khi nào phải làm từng phần hai lần không?"* Có — khi phần Algebraic là $x^2$ (đạo hàm hai lần mới hết). Walk-through $\\int_0^1 x^2 e^x\\,dx$: lần 1 lấy $u = x^2, dv = e^x dx \\Rightarrow v = e^x$, được $\\left[x^2 e^x\\right]_0^1 - \\int_0^1 2x e^x\\,dx = e - 2\\int_0^1 x e^x\\,dx$. Phần $\\int_0^1 x e^x\\,dx = 1$ (đã tính ở 🔁 trên). Vậy kết quả $= e - 2\\cdot 1 = e - 2 \\approx$ **0.718**. Verify: nguyên hàm $\\int x^2 e^x dx = (x^2 - 2x + 2)e^x$, thế cận $[(1-2+2)e - 2] = e - 2$ ✓.

⚠ **Lỗi thường gặp — quên đánh giá phần $\\left[uv\\right]$ tại cận**. Viết $\\int_0^\\pi x \\sin x\\,dx = -\\int_0^\\pi \\cos x\\,dx$ (bỏ luôn $\\left[-x \\cos x\\right]_0^\\pi$) là thiếu hẳn một phần. Cả $\\left[uv\\right]_a^b$ lẫn $\\int v\\,du$ đều phải đánh giá tại cận.

🔁 **Dừng lại tự kiểm tra**

1. $\\int_0^1 x \\cdot e^x\\,dx = ?$
2. Tính $\\left[x \\cdot \\sin x\\right]_0^{\\pi/2}$.

<details><summary>Đáp án</summary>

1. $u=x, dv=e^x\\,dx, v=e^x$: $\\left[x e^x\\right]_0^1 - \\int_0^1 e^x\\,dx = e - \\left[e^x\\right]_0^1 = e - (e-1) = 1$.
2. $(\\pi/2) \\cdot \\sin(\\pi/2) - 0 \\cdot \\sin 0 = (\\pi/2) \\cdot 1 - 0 = \\pi/2$.

</details>

### 📝 Tóm tắt mục 6

- Từng phần xác định: $\\int_a^b u\\,dv = \\left[uv\\right]_a^b - \\int_a^b v\\,du$.
- Đánh giá **cả** $\\left[uv\\right]$ tại hai cận **lẫn** tích phân còn lại; chọn $u, dv$ theo LIATE.
- Đừng bỏ sót phần $\\left[uv\\right]_a^b$.

---

## 7. Tích phân bằng số (Numerical Integration) — khi không có nguyên hàm dạng đóng

Nhiều tích phân thực tế **không** có nguyên hàm sơ cấp — ví dụ $\\int e^{-x^2}\\,dx$ (hàm mật độ Gauss, gặp lại ở phần xác suất). Khi đó không dùng FTC được; phải xấp xỉ **bằng số** từ tổng dạng Riemann nhưng thông minh hơn.

💡 **Trực giác**: thay vì xấp xỉ mỗi mảnh bằng hình chữ nhật (đỉnh phẳng), ta xấp xỉ bằng **hình thang** (đỉnh nghiêng nối 2 điểm) hoặc **cung parabol** (đỉnh cong) — bám đường cong tốt hơn, sai số nhỏ hơn nhiều với cùng số mảnh $n$.

### 7.1. Quy tắc hình thang (Trapezoidal rule)

Trên mỗi đoạn nối $(x_{i-1}, f(x_{i-1}))$ và $(x_i, f(x_i))$ bằng đoạn thẳng → mỗi mảnh là hình thang diện tích $\\frac{f(x_{i-1}) + f(x_i)}{2}\\cdot\\Delta x$. Cộng hết:

$$\\int_a^b f(x)\\,dx \\approx \\frac{\\Delta x}{2}\\left[f(x_0) + 2f(x_1) + 2f(x_2) + \\cdots + 2f(x_{n-1}) + f(x_n)\\right]$$

(các điểm trong được tính 2 lần → hệ số 2). Sai số $O(1/n^2)$ — tốt hơn Riemann trái/phải ($O(1/n)$).

### 7.2. Quy tắc Simpson

Thay đoạn thẳng bằng **parabol** đi qua 3 điểm liên tiếp ($n$ phải chẵn):

$$\\int_a^b f(x)\\,dx \\approx \\frac{\\Delta x}{3}\\left[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \\cdots + 4f(x_{n-1}) + f(x_n)\\right]$$

Hệ số xen kẽ $1, 4, 2, 4, \\ldots, 4, 1$. Sai số $O(1/n^4)$ — cực nhanh; chính xác **tuyệt đối** với mọi đa thức bậc $\\leq 3$.

### 7.3. So sánh hội tụ — $\\int_0^1 x^2\\,dx$ (thật $= \\frac13 \\approx 0.333333$)

| $n$ | Trái | Phải | Giữa | Hình thang | Simpson |
|-----|------|------|------|------------|---------|
| 4   | 0.21875  | 0.46875  | 0.328125 | 0.34375  | 0.3333333 |
| 10  | 0.285    | 0.385    | 0.3325   | 0.335    | 0.3333333 |
| 100 | 0.328350 | 0.338350 | 0.333325 | 0.333350 | 0.3333333 |

Simpson "chạm đáy" ngay từ $n = 4$ vì $x^2$ là parabol — đúng dạng Simpson dùng để xấp xỉ. Hình thang cần $n$ lớn hơn, Riemann trái/phải tệ nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao Simpson đúng tuyệt đối với $x^2$ nhưng không với $\\sin x$?"* Simpson xấp xỉ bằng parabol (đa thức bậc $\\leq 3$). $x^2$ chính là parabol → khớp 100%. $\\sin x$ không phải đa thức → còn sai số nhỏ ($O(1/n^4)$), giảm rất nhanh khi tăng $n$.
- *"Khi nào buộc phải tính bằng số?"* Khi hàm không có nguyên hàm sơ cấp ($e^{-x^2}$, $\\frac{\\sin x}{x}$), hoặc khi $f$ chỉ cho dưới dạng bảng số đo (không có công thức). Tích phân nhiều chiều thì dùng **Monte Carlo** — lấy mẫu ngẫu nhiên, sai số $O(1/\\sqrt N)$ không phụ thuộc số chiều.

⚠ **Lỗi thường gặp — quên $n$ chẵn cho Simpson**. Công thức Simpson cần số đoạn chẵn (số điểm lẻ) để ghép từng cặp đoạn thành một cung parabol. $n$ lẻ → hệ số xen kẽ lệch, kết quả sai.

### 7.4. Vì sao tích phân lại quan trọng về sau

💡 **Trực giác — tích phân là ngôn ngữ của xác suất liên tục**. Với biến liên tục (chiều cao, thời gian), xác suất không gán cho từng điểm (mỗi điểm có xác suất 0) mà cho **khoảng**: $P(a \\leq X \\leq b) = \\int_a^b p(x)\\,dx$, với $p(x)$ là **hàm mật độ (probability density)**. Điều kiện chuẩn hóa "chắc chắn xảy ra đâu đó" là $\\int_{-\\infty}^{+\\infty} p(x)\\,dx = 1$, và kỳ vọng $E[X] = \\int x\\,p(x)\\,dx$. Đúng cái phân phối quan trọng nhất — Gauss $p(x) \\propto e^{-x^2/2}$ — lại **không** có nguyên hàm sơ cấp, nên các giá trị của nó phải tính bằng số (mục 7.1–7.3) hoặc Monte Carlo. Đó là lý do mục này không chỉ là kỹ thuật phụ. Sẽ học kỹ ở các bài xác suất sau.

### 📝 Tóm tắt mục 7

- Khi không có nguyên hàm dạng đóng → tính tích phân **bằng số**.
- Hình thang (đỉnh nghiêng, $O(1/n^2)$) tốt hơn hình chữ nhật; Simpson (đỉnh parabol, $O(1/n^4)$) tốt hơn nữa.
- Simpson chính xác tuyệt đối với đa thức bậc $\\leq 3$; cần $n$ chẵn.
- Nhiều chiều → Monte Carlo (sai số $O(1/\\sqrt N)$, không phụ thuộc chiều).

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tính $\\int_1^3 (2x + 1)\\,dx$.

**Bài 2**: Tính $\\int_0^{\\pi/2} \\cos x\\,dx$.

**Bài 3**: Tính $\\int_{-2}^2 x^3\\,dx$. Giải thích kết quả.

**Bài 4**: Tính $\\int_0^1 x \\cdot e^x\\,dx$.

**Bài 5**: Tính $\\int_1^e (\\ln x)/x\\,dx$.

**Bài 6**: Tính diện tích **thật** giữa $y = x^2 - 1$ và trục Ox trên $[0, 2]$ (hàm đổi dấu tại $x = 1$).

**Bài 7**: Tính $\\int_0^2 |x - 1|\\,dx$ bằng tính chất cộng đoạn.

**Bài 8**: Xấp xỉ $\\int_0^1 x^2\\,dx$ bằng quy tắc hình thang với $n = 2$, rồi so với giá trị thật.

### Lời giải

**Bài 1**: $F(x) = x^2 + x$. $F(3) - F(1) = 12 - 2 =$ **10**.

**Bài 2**: $F(x) = \\sin x$. $\\sin(\\pi/2) - \\sin 0 =$ **1**.

**Bài 3**: $F(x) = x^4/4$. $F(2) - F(-2) = 4 - 4 =$ **0**. Vì $x^3$ là hàm lẻ, đối xứng qua O → phần âm và dương triệt tiêu.

**Bài 4**: Từng phần. $u=x, dv=e^x\\,dx \\to v=e^x$. $\\left[x \\cdot e^x\\right]_0^1 - \\int_0^1 e^x\\,dx = e - \\left[e^x\\right]_0^1 = e - (e-1) =$ **1**.

**Bài 5**: Đổi biến $u = \\ln x$, $du = dx/x$. $x=1 \\to u=0$, $x=e \\to u=1$. $= \\int_0^1 u\\,du =$ **$\\frac{1}{2}$**.

**Bài 6**: Cách tiếp cận — hàm đổi dấu nên **không** lấy $\\int f$ thẳng, phải tách theo dấu. $x^2 - 1 < 0$ trên $[0, 1]$ và $> 0$ trên $[1, 2]$. Nguyên hàm $F(x) = \\frac{x^3}{3} - x$.
- Đoạn $[0,1]$ (âm): $\\int_0^1 (x^2-1)\\,dx = F(1) - F(0) = \\left(\\frac13 - 1\\right) - 0 = -\\frac23$. Diện tích phần này $= \\left|-\\frac23\\right| = \\frac23$.
- Đoạn $[1,2]$ (dương): $\\int_1^2 (x^2-1)\\,dx = F(2) - F(1) = \\left(\\frac83 - 2\\right) - \\left(\\frac13 - 1\\right) = \\frac23 - \\left(-\\frac23\\right) = \\frac43$.
- Diện tích thật $= \\frac23 + \\frac43 =$ **2**. (Lưu ý: $\\int_0^2 (x^2-1)\\,dx = -\\frac23 + \\frac43 = \\frac23$ — đây là diện tích đại số, KHÁC diện tích thật.)

**Bài 7**: Cách tiếp cận — $|x-1|$ đổi công thức tại $x = 1$, dùng cộng đoạn. Trên $[0,1]$: $|x-1| = 1 - x$. Trên $[1,2]$: $|x-1| = x - 1$.
- $\\int_0^1 (1-x)\\,dx = \\left[x - \\frac{x^2}{2}\\right]_0^1 = 1 - \\frac12 = \\frac12$.
- $\\int_1^2 (x-1)\\,dx = \\left[\\frac{x^2}{2} - x\\right]_1^2 = (2 - 2) - \\left(\\frac12 - 1\\right) = 0 - \\left(-\\frac12\\right) = \\frac12$.
- Tổng $= \\frac12 + \\frac12 =$ **1**. (Khớp hình học: hai tam giác vuông cạnh 1 → mỗi cái $\\frac12$.)

**Bài 8**: Cách tiếp cận — hình thang với $n = 2$: $\\Delta x = 0.5$, điểm $x_0 = 0, x_1 = 0.5, x_2 = 1$. $f = 0, 0.25, 1$.
$$\\int_0^1 x^2\\,dx \\approx \\frac{\\Delta x}{2}\\left[f(x_0) + 2f(x_1) + f(x_2)\\right] = \\frac{0.5}{2}\\left[0 + 2(0.25) + 1\\right] = 0.25 \\times 1.5 = 0.375.$$
So với thật $\\frac13 \\approx 0.3333$: sai số $\\approx 0.042$. Hình thang overestimate vì $x^2$ lồi (cong lên) → đoạn thẳng nối nằm trên đường cong. Tăng $n$ → sai số giảm bậc 2.

---

## 9. Bài tiếp theo

[Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/).

## 📝 Tổng kết

1. **Tổng Riemann**: $S_n = \\sum f(x_i)\\Delta x$ = cộng vô số lát mỏng. $n \\to \\infty \\to \\int_a^b f\\,dx$. 3 cách chọn (trái/phải/giữa) cùng giới hạn; giữa hội tụ nhanh nhất.
2. **FTC**: nếu $F' = f$ thì $\\int_a^b f = F(b) - F(a)$. Đạo hàm & tích phân là ngược nhau (diện tích tích lũy $G' = f$).
3. **Tính chất**: tuyến tính, cộng đoạn, đảo cận đổi dấu, $\\int_a^a = 0$, so sánh $f\\leq g$.
4. $\\int$ có thể âm — là **diện tích có dấu**; diện tích thật khi đổi dấu dùng $\\int|f|$ (tách theo dấu).
5. Đổi biến **phải đổi cận**. Từng phần áp dụng được.
6. Không có nguyên hàm dạng đóng → tính **bằng số**: hình thang $O(1/n^2)$, Simpson $O(1/n^4)$.
`;
