// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/03-Calculus/lesson-01-limits/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Giới hạn (Limits)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **giới hạn** ở mức trực giác: *"x tiến gần a thì f(x) tiến gần gì?"* — và biết khi nào trực giác đó đáng tin, khi nào phải cẩn thận.
- Đọc và viết được định nghĩa **ε-δ** (Cauchy–Weierstrass), chơi được "game ε-δ" cho các ví dụ cụ thể.
- Tính được giới hạn ở các dạng cơ bản: thay số trực tiếp, dạng vô định $0/0$ (phân tích nhân tử, nhân liên hợp), giới hạn tại vô cực.
- Biết **3 giới hạn đặc biệt** sẽ dùng cả Tầng 3:
  - $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — dùng chứng minh $(\\sin x)' = \\cos x$ ở Lesson 02.
  - $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$ — dùng chứng minh $(e^x)' = e^x$.
  - $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e$ — định nghĩa số $e$ qua giới hạn.
- Hiểu **liên tục (continuity)** = "không có đứt gãy" và vì sao nó là điều kiện tiền đề của đạo hàm.
- Thấy được mối liên hệ với ML/AI: đạo hàm là một giới hạn, softmax với temperature → 0 xấp xỉ argmax (cũng là một giới hạn).

## Kiến thức tiền đề

- [Lesson 05 — Hàm số là gì](../../01-Algebra/lesson-05-functions/): biết đọc ký hiệu $f(x)$, hiểu đồ thị, hiểu khái niệm domain.
- [Lesson 06 — Hàm bậc 1 và bậc 2](../../01-Algebra/lesson-06-linear-quadratic/): biết slope, tiếp tuyến (chúng ta sẽ định nghĩa lại tiếp tuyến qua giới hạn ở Lesson 02).
- [Lesson 07 — Hàm mũ và log](../../01-Algebra/lesson-07-exp-log-functions/): để hiểu các giới hạn liên quan tới $e^x$, $\\ln x$.

> **Ghi nhớ chính của cả bài**: giới hạn không phải "f tại a", mà là "f gần a". Hai khái niệm này có thể bằng nhau (khi f liên tục) hoặc khác nhau (khi f có đứt gãy hay không xác định tại a). Lý do mọi cơ chế "chuyển động" trong giải tích — đạo hàm, tích phân, chuỗi — đều xây trên giới hạn là vì: để nói "tốc độ thay đổi **tức thời**" hay "diện tích **chính xác**", ta phải nói được "tiến tới gần vô hạn nhưng không chạm".

---

## 1. Trực giác giới hạn

### 1.1. Hỏi câu nào?

💡 **Trực giác trước**: Cho hàm $f$ và một điểm $a$. Câu hỏi *"limit của f tại a"* không hỏi $f(a)$ bằng bao nhiêu — mà hỏi:

> *"Nếu tôi cho $x$ đi rất gần $a$ (mà chưa chạm $a$), thì $f(x)$ đang đi tới giá trị nào?"*

Ký hiệu:

$$\\lim_{x \\to a} f(x) = L$$

Đọc: *"giới hạn của f(x) khi x tiến tới a bằng L"*.

**Analogy con kiến**: tưởng tượng một con kiến bò dọc đồ thị $y = f(x)$. Bạn dán một mảnh dán tại $x = a$ trên trục hoành. Con kiến đi từ bên trái lại, rồi từ bên phải lại — bạn **không cần** con kiến chạm điểm $x = a$, chỉ cần xem nó đang **nhắm tới độ cao nào**. Độ cao đó chính là $L$.

Quan trọng: con kiến có thể **không bao giờ chạm** $x = a$ (nếu $f$ không xác định tại đó), hoặc có chạm nhưng độ cao tại chỗ chạm **khác** độ cao nó đang nhắm tới. Cả hai trường hợp đều ổn với khái niệm giới hạn — giới hạn chỉ quan tâm tới **hành vi xung quanh**, không phải giá trị **tại** điểm.

### 1.2. Ví dụ chạy được bằng tay

**Ví dụ 1**: $f(x) = x^2$, hỏi $\\lim_{x \\to 2} f(x)$.

Cho $x$ đi từ trái lại 2, rồi từ phải lại 2, lập bảng:

| $x$ | $f(x) = x^2$ |
|-----|-------------|
| $1.9$ | $3.61$ |
| $1.99$ | $3.9601$ |
| $1.999$ | $3.996001$ |
| $1.9999$ | $3.99960001$ |
| $2.0001$ | $4.00040001$ |
| $2.001$ | $4.004001$ |
| $2.01$ | $4.0401$ |
| $2.1$ | $4.41$ |

Cả hai phía đều ép $f(x)$ về $4$. Vậy:

$$\\lim_{x \\to 2} x^2 = 4$$

Lưu ý ở ví dụ này: $f(2) = 4$ cũng đúng — giá trị giới hạn và giá trị tại điểm trùng nhau. Đó là vì $f(x) = x^2$ **liên tục** tại $x = 2$. Phần lớn các hàm bạn đã gặp đều như vậy, nên ban đầu giới hạn có vẻ trùng với "thay số". Nhưng đừng để cảm giác đó lừa — sự khác biệt sẽ rõ ràng ở mục 5 (dạng $0/0$).

**Ví dụ 2**: $f(x) = \\frac{x^2 - 1}{x - 1}$, hỏi $\\lim_{x \\to 1} f(x)$.

Tại $x = 1$, mẫu = 0 → $f(1)$ **không xác định**. Nhưng giới hạn vẫn tồn tại:

| $x$ | $f(x) = \\frac{x^2 - 1}{x - 1}$ |
|-----|---------------------------|
| $0.9$ | $1.9$ |
| $0.99$ | $1.99$ |
| $0.999$ | $1.999$ |
| $0.9999$ | $1.9999$ |
| $1.0001$ | $2.0001$ |
| $1.001$ | $2.001$ |
| $1.01$ | $2.01$ |
| $1.1$ | $2.1$ |

Hai phía cùng ép $f(x)$ về $2$. Vậy $\\lim_{x \\to 1} f(x) = 2$ — dù $f(1)$ không tồn tại. Đây là trường hợp giới hạn **không thể** thay bằng "tính $f(a)$".

(Cách giải gọn: $\\frac{x^2 - 1}{x - 1} = \\frac{(x-1)(x+1)}{x-1} = x + 1$, miễn $x \\neq 1$. Khi $x \\to 1$, $x + 1 \\to 2$. Sẽ học kỹ ở mục 5.)

**Ví dụ 3**: $f(x) = \\text{sign}(x)$ (hàm dấu — bằng $+1$ nếu $x > 0$, $-1$ nếu $x < 0$, $0$ nếu $x = 0$), hỏi $\\lim_{x \\to 0} f(x)$.

Bên trái: $x = -0.1, -0.01, \\ldots$ → $f(x) = -1$.
Bên phải: $x = 0.1, 0.01, \\ldots$ → $f(x) = +1$.

Hai phía **khác nhau**. Vậy $\\lim_{x \\to 0} \\text{sign}(x)$ **không tồn tại** (DNE — does not exist). Chú ý: $f(0) = 0$ vẫn được định nghĩa rõ — nhưng "giới hạn không tồn tại" và "giá trị tại điểm" là hai chuyện riêng.

**Ví dụ 4**: $f(x) = 1/x$, hỏi $\\lim_{x \\to 0} f(x)$.

Bên phải $x \\to 0^+$: $f(0.1) = 10$, $f(0.01) = 100$, $f(0.001) = 1000$, … → $+\\infty$.
Bên trái $x \\to 0^-$: $f(-0.1) = -10$, $f(-0.01) = -100$, … → $-\\infty$.

Hai phía đi về hai vô cực khác nhau. $\\lim_{x \\to 0} 1/x$ **không tồn tại** (cũng DNE — mặc dù ta có thể nói riêng $\\lim_{x \\to 0^+} 1/x = +\\infty$).

### 1.3. Giới hạn một phía (one-sided limits)

Ký hiệu:

- $\\lim_{x \\to a^-} f(x)$ — giới hạn **trái** (left-hand limit), $x$ tiến tới $a$ từ phía nhỏ hơn $a$.
- $\\lim_{x \\to a^+} f(x)$ — giới hạn **phải** (right-hand limit), $x$ tiến tới $a$ từ phía lớn hơn $a$.

**Quan hệ then chốt**:

$$\\lim_{x \\to a} f(x) = L \\quad \\Longleftrightarrow \\quad \\lim_{x \\to a^-} f(x) = L \\ \\text{ VÀ } \\ \\lim_{x \\to a^+} f(x) = L$$

Tức là: giới hạn hai phía tồn tại và bằng $L$ **khi và chỉ khi** cả hai giới hạn một phía tồn tại và đều bằng $L$.

Ví dụ áp dụng:

- $\\lim_{x \\to 0} \\text{sign}(x)$: trái = $-1$, phải = $+1$, khác nhau → DNE. ✓ khớp ví dụ 3.
- $\\lim_{x \\to 2} x^2$: trái và phải đều = $4$ → tồn tại, bằng $4$. ✓ khớp ví dụ 1.

⚠ **Lỗi thường gặp**: viết $\\lim f(x) = \\infty$ rồi gọi giới hạn đó "tồn tại". Trong nghĩa nghiêm ngặt, $\\infty$ không phải số thực, nên giới hạn "bằng vô cực" cũng được xem là **không tồn tại** (theo nghĩa "không tồn tại số thực $L$"). Tuy nhiên ký hiệu $\\lim = +\\infty$ vẫn được dùng để **mô tả hành vi** — ta phân biệt rõ hai cách dùng ở mục 6.

#### ❓ Câu hỏi tự nhiên của người đọc

**Q1**: "Sao không định nghĩa luôn $\\lim f(x)$ là $f(a)$? Đỡ phải nghĩ phức tạp."

A: Vì có rất nhiều trường hợp $f(a)$ không tồn tại nhưng giới hạn vẫn có ý nghĩa, và ngược lại. Cụ thể:
- $\\frac{x^2 - 1}{x - 1}$ tại $x = 1$: $f(1)$ không có nghĩa ($0/0$), nhưng giới hạn = 2 — nếu không có khái niệm giới hạn, ta không định nghĩa được đạo hàm.
- Hàm $f(x) = x^2$ với $x \\neq 3$ và $f(3) = 100$: giới hạn tại 3 là 9 (vì gần 3 thì f gần 9), nhưng $f(3) = 100$. Giới hạn không "nhìn thấy" cái nhảy lẻ tẻ tại một điểm.

**Q2**: "$f(a)$ không xác định thì sao bảng giá trị vẫn tính được?"

A: Vì bảng chỉ tính $f$ tại các $x$ **gần** $a$ chứ không tại chính $a$. $\\frac{x^2 - 1}{x - 1}$ tại $x = 0.999$ cho 1.999 — không có vấn đề gì, mẫu $\\neq 0$. Chỉ tại đúng $x = 1$ mới hỏng. Đó cũng là ý chính của giới hạn: "lấy thông tin xung quanh, không cần thông tin tại điểm".

**Q3**: "Có hàm nào mà bảng giá trị lừa mình không?"

A: Có. Hàm $f(x) = \\sin(1/x)$ khi $x \\to 0$ dao động giữa $-1$ và $+1$ vô số lần. Nếu bạn lập bảng tại $x = 1/\\pi, 1/2\\pi, 1/3\\pi, \\ldots$ toàn ra $0$, bạn sẽ tưởng giới hạn = 0. Nhưng tại $x = 2/(\\pi + 4k\\pi)$, giá trị = 1. Bảng giá trị **không phải chứng minh**, chỉ là gợi ý. Để chắc chắn cần ε-δ hoặc các quy tắc đại số (mục 3 và 7).

#### 🔁 Dừng lại tự kiểm tra (mục 1)

1. $\\lim_{x \\to 3} (x + 5)$ = ?
2. $f(x) = |x|/x$. Tính $\\lim_{x \\to 0^-} f(x)$, $\\lim_{x \\to 0^+} f(x)$, và $\\lim_{x \\to 0} f(x)$.
3. Cho $f(x) = x$ với $x \\neq 5$ và $f(5) = 100$. Tính $\\lim_{x \\to 5} f(x)$.

<details>
<summary>Đáp án</summary>

1. $8$ (thay số trực tiếp; hàm liên tục).
2. $|x|/x = -1$ nếu $x < 0$, $+1$ nếu $x > 0$. Nên $\\lim_{x \\to 0^-} = -1$, $\\lim_{x \\to 0^+} = +1$. Hai phía khác → $\\lim_{x \\to 0}$ **DNE**.
3. $5$ — giới hạn không quan tâm tới giá trị "lạ" tại đúng điểm 5; xung quanh 5 thì $f(x) = x \\to 5$.

</details>

📝 **Tóm tắt mục 1**:

- $\\lim_{x \\to a} f(x)$ hỏi "f gần a hành xử ra sao", **không** hỏi $f(a)$.
- Giới hạn tồn tại ⇔ giới hạn trái và phải bằng nhau.
- Bảng giá trị giúp đoán giới hạn nhưng không chứng minh — có hàm dao động mạnh có thể lừa bảng.
- Hai trường hợp tự nhiên dẫn tới khái niệm giới hạn: (a) $f(a)$ không xác định ($0/0$); (b) $f(a)$ có nhưng cô lập, không phản ánh "xung quanh".

---

## 2. Định nghĩa hình thức ε-δ

### 2.1. Vì sao cần định nghĩa hình thức?

Ở mục 1 ta dùng cụm *"x tiến gần a"* và *"f(x) tiến gần L"*. Đó là trực giác — không phải định nghĩa toán học. Hai vấn đề:

1. "Gần" là gần bao nhiêu? $0.1$ đã đủ gần chưa? $10^{-100}$?
2. Nếu hàm dao động mạnh (như $\\sin(1/x)$), "tiến gần" có thể không có nghĩa.

Định nghĩa ε-δ (do Cauchy đề xuất và Weierstrass làm chính xác) cho ta **một test cụ thể** để kiểm tra "L có phải là giới hạn của f tại a hay không" — không cần vẽ đồ thị, không cần lập bảng.

### 2.2. Định nghĩa

> Cho hàm $f$ xác định trên một khoảng quanh $a$ (không nhất thiết tại $a$). Ta nói:
>
> $$\\lim_{x \\to a} f(x) = L$$
>
> nếu với **mọi** số dương $\\epsilon > 0$ (đọc: *epsilon*), tồn tại một số dương $\\delta > 0$ (*delta*) sao cho:
>
> $$\\text{nếu } \\ 0 < |x - a| < \\delta \\ \\text{ thì } \\ |f(x) - L| < \\epsilon.$$

Diễn giải chậm:

- $\\epsilon$ đo "f(x) gần L tới mức nào" — bạn chọn trước, ε càng nhỏ càng "khó".
- $\\delta$ đo "x gần a tới mức nào" — sau khi nhìn ε, **bạn** tìm được δ.
- Điều kiện $0 < |x - a|$ nghĩa là $x \\neq a$ (ta không quan tâm $f(a)$).
- Điều kiện $|x - a| < \\delta$ nghĩa là $x$ trong khoảng $(a - \\delta, a + \\delta)$.
- Kết luận $|f(x) - L| < \\epsilon$ nghĩa là $f(x)$ trong dải $(L - \\epsilon, L + \\epsilon)$.

💡 **Trực giác bằng game**: hai người chơi.

- **Người 1 (kẻ thách thức)**: nói "tôi yêu cầu $f(x)$ gần $L$ trong khoảng $\\epsilon$. Bạn làm được không?"
- **Người 2 (bạn)**: trả lời "được, miễn $x$ gần $a$ trong khoảng $\\delta$ (mà tôi sẽ chỉ ra)."

Bạn (người 2) thắng game **với mọi** ε mà người 1 đưa ra (kể cả ε siêu nhỏ) ⇔ $\\lim = L$.

Nếu có một ε nào đó người 1 đưa ra mà bạn **không tìm được** δ tương ứng, bạn thua → $L$ không phải giới hạn.

### 2.3. Chơi game với \`lim_{x → 2} x² = 4\`

Ta sẽ chứng minh $\\lim_{x \\to 2} x^2 = 4$ bằng ε-δ.

**Bước 1**: Người 1 cho ε > 0 bất kỳ. Mục tiêu của ta: tìm δ > 0 sao cho $0 < |x - 2| < \\delta \\implies |x^2 - 4| < \\epsilon$.

**Bước 2**: Biến đổi $|x^2 - 4|$:

$$|x^2 - 4| = |(x - 2)(x + 2)| = |x - 2| \\cdot |x + 2|$$

Ta muốn ép tích này nhỏ hơn ε. Phần $|x - 2|$ ta kiểm soát được (chính là δ). Phần $|x + 2|$ thì sao? Nó cũng phụ thuộc x.

**Bước 3 — chặn $|x + 2|$**: giả sử ta hạn chế $|x - 2| < 1$ (tức $1 < x < 3$). Khi đó $3 < x + 2 < 5$, nên $|x + 2| < 5$.

**Bước 4 — chọn δ**: nếu $|x - 2| < \\delta \\leq 1$ thì:

$$|x^2 - 4| = |x - 2| \\cdot |x + 2| < \\delta \\cdot 5 = 5\\delta$$

Muốn $5\\delta \\leq \\epsilon$, chọn $\\delta = \\epsilon/5$. Để đảm bảo cả $\\delta \\leq 1$, chọn:

$$\\delta = \\min(1, \\epsilon/5)$$

**Bước 5 — kiểm tra**: với δ này, nếu $0 < |x - 2| < \\delta$, thì:

- $|x + 2| < 5$ (vì $\\delta \\leq 1$)
- $|x - 2| < \\epsilon/5$ (vì $\\delta \\leq \\epsilon/5$)
- $\\implies |x^2 - 4| < 5 \\cdot (\\epsilon/5) = \\epsilon$. ✓

Vậy với **mọi** ε > 0, **luôn** tìm được $\\delta = \\min(1, \\epsilon/5)$. Định nghĩa được thỏa mãn → $\\lim_{x \\to 2} x^2 = 4$.

**Walk-through với số cụ thể**:

| $\\epsilon$ (người 1 thách) | $\\delta = \\min(1, \\epsilon/5)$ (bạn chọn) | Kiểm tra: $\\lvert x - 2 \\rvert < \\delta \\implies \\lvert x^2 - 4 \\rvert < \\epsilon$? |
|---------------------|------------------------------|---------------------------------------------|
| $1$ | $\\min(1, 0.2) = 0.2$ | $x \\in (1.8, 2.2)$, $x^2 \\in (3.24, 4.84)$, $\\lvert x^2 - 4 \\rvert \\leq 0.84 < 1$ ✓ |
| $0.1$ | $\\min(1, 0.02) = 0.02$ | $x \\in (1.98, 2.02)$, $x^2 \\in (3.9204, 4.0804)$, $\\lvert x^2 - 4 \\rvert \\leq 0.0804 < 0.1$ ✓ |
| $0.01$ | $\\min(1, 0.002) = 0.002$ | $x \\in (1.998, 2.002)$, $\\lvert x^2 - 4 \\rvert \\leq 0.008004 < 0.01$ ✓ |
| $0.0001$ | $\\min(1, 0.00002) = 0.00002$ | $\\lvert x^2 - 4 \\rvert \\leq 0.0000800004 < 0.0001$ ✓ |

Mỗi lần ε nhỏ đi 10 lần, ta chọn δ nhỏ đi 10 lần (xấp xỉ) — game này luôn thắng được.

### 2.4. Khi nào chứng minh "không phải giới hạn"?

Phủ định: $\\lim_{x \\to a} f(x) \\neq L$ nếu **tồn tại** một ε > 0 sao cho **với mọi** δ > 0, **có** một $x$ trong $(a - \\delta, a + \\delta) \\setminus \\{a\\}$ mà $|f(x) - L| \\geq \\epsilon$.

Ví dụ: chứng minh $\\lim_{x \\to 0} \\text{sign}(x) \\neq 0$.

Lấy $\\epsilon = 0.5$. Với mọi $\\delta > 0$, lấy $x = \\delta/2 > 0$ (nằm trong $(-\\delta, \\delta) \\setminus \\{0\\}$). Khi đó $\\text{sign}(x) = 1$, nên $|\\text{sign}(x) - 0| = 1 \\geq 0.5$. Vậy $L = 0$ không phải giới hạn.

(Tương tự không có \`L\` nào khác đáp ứng, nên giới hạn DNE.)

#### ❓ Câu hỏi tự nhiên: "Sao phải khổ thế? Bảng giá trị không đủ à?"

A: Bảng giá trị đủ cho "đoán" L. Nhưng để **chứng minh** L đúng, hoặc để **xử lý các hàm khó** (\`sin(1/x)\`, hàm Dirichlet, ...), ta cần ε-δ.

May mắn là trong thực hành — và trong cả phần còn lại của Tầng 3 — ta hiếm khi quay lại ε-δ. Ta sẽ chứng minh **một lần** các quy tắc tính giới hạn (mục 7), rồi dùng các quy tắc đó cho tất cả ví dụ về sau. ε-δ chỉ là "nền móng" — không phải công cụ hàng ngày.

⚠ **Lỗi thường gặp**:

- **Chọn δ phụ thuộc x**: δ chỉ được phụ thuộc ε, không được phụ thuộc x. Nếu bạn viết "chọn $\\delta = \\epsilon / (2x + 4)$", đó là sai — vì x thay đổi.
- **Quên điều kiện $0 < |x - a|$**: phải có $0 <$ để loại trừ $x = a$. Nếu bỏ điều kiện này, định nghĩa sẽ yêu cầu cả $f(a)$, mà ta muốn tránh.
- **Nghĩ $\\delta$ phải bằng $\\epsilon$**: hoàn toàn không. $\\delta$ có thể là $\\epsilon/5$, $\\epsilon^2$, $\\sqrt{\\epsilon}$, … tùy hàm. Quan trọng là tồn tại.

#### 🔁 Dừng lại tự kiểm tra (mục 2)

1. Chứng minh nhanh $\\lim_{x \\to 3} (2x + 1) = 7$ bằng ε-δ — chọn δ theo ε.
2. Đúng/sai: "với mọi ε > 0, δ = ε/2 đều dùng được cho $\\lim_{x \\to 2} x^2 = 4$."

<details>
<summary>Đáp án</summary>

1. $|(2x + 1) - 7| = |2x - 6| = 2|x - 3|$. Muốn $< \\epsilon$, cần $|x - 3| < \\epsilon/2$. Chọn $\\delta = \\epsilon/2$.
2. **Sai**. Với ε = 1, δ = 0.5 → $x \\in (1.5, 2.5)$, $x^2 \\in (2.25, 6.25)$, $|x^2 - 4|$ max $\\approx 2.25$ không nhỏ hơn 1. Hàm $x^2$ không tuyến tính nên cần $\\delta$ phụ thuộc cả "khoảng kiểm soát" lẫn ε; cần $\\delta = \\min(1, \\epsilon/5)$ như đã chứng minh.

</details>

📝 **Tóm tắt mục 2**:

- ε-δ biến "tiến gần" mơ hồ thành test cụ thể.
- Chứng minh $\\lim = L$: với **mọi** ε, **tìm** δ thỏa $|x - a| < \\delta \\implies |f(x) - L| < \\epsilon$.
- Trong thực hành, hiếm khi dùng ε-δ trực tiếp — sẽ dùng các quy tắc tính giới hạn (mục 7) thay thế.

---

## 3. Tính giới hạn cơ bản: thay số trực tiếp

Nếu $f$ **liên tục** tại $a$ (định nghĩa chính xác ở mục 8), thì:

$$\\lim_{x \\to a} f(x) = f(a)$$

Tức là "thay $x = a$ vào". Đây là trường hợp dễ nhất — và hầu hết hàm sơ cấp (đa thức, mũ, log, sin, cos, tan trên miền xác định) đều liên tục tại mọi điểm trong miền.

**4 ví dụ áp dụng**:

| Giới hạn | Thay số | Kết quả |
|----------|---------|---------|
| $\\lim_{x \\to 5} (3x + 1)$ | $3 \\cdot 5 + 1$ | $16$ |
| $\\lim_{x \\to 2} (x^3 - 2x + 7)$ | $8 - 4 + 7$ | $11$ |
| $\\lim_{x \\to 0} \\cos(x)$ | $\\cos(0)$ | $1$ |
| $\\lim_{x \\to 3} \\frac{x^2 + 1}{x + 2}$ | $\\frac{9 + 1}{3 + 2} = \\frac{10}{5}$ | $2$ |

Walk-through ví dụ thứ 4 (thương 2 đa thức): $\\lim_{x \\to 3} \\frac{x^2 + 1}{x + 2}$. Tử tại $x = 3$: $9 + 1 = 10$. Mẫu tại $x = 3$: $3 + 2 = 5$. Mẫu khác 0, nên thay số được: $10/5 = 2$.

**Điều kiện bắt buộc** để "thay số" hợp lệ:

1. $f(a)$ xác định (đặc biệt: mẫu khác 0, biểu thức trong căn bậc chẵn không âm, log có đối số dương, ...).
2. $f$ liên tục tại $a$ (sẽ học ở mục 8 — gần như mọi hàm sơ cấp ta gặp đều liên tục trên miền xác định, nên điều kiện này tự động).

Nếu thay số ra **$0/0$**, **$\\infty - \\infty$**, **$0 \\cdot \\infty$**, **$\\infty/\\infty$** — đó là **dạng vô định** (indeterminate form). Phải xử lý đặc biệt, mục 5 và 6.

⚠ **Lỗi thường gặp**: thấy mẫu = 0 thì kết luận "giới hạn = ∞" hoặc "DNE". Sai — phải xem tử cùng lúc. Nếu tử cũng = 0, ta ở dạng $0/0$, có thể có giới hạn hữu hạn. Nếu tử ≠ 0 và mẫu = 0, mới có thể là vô cực (mục 6).

📝 **Tóm tắt mục 3**: Nếu $f$ xác định và liên tục tại $a$ thì giới hạn = $f(a)$. Nếu thay số ra dạng vô định, đi sang mục 5/6.

---

## 4. Dạng \`0/0\` (vô định) — trick cốt lõi

### 4.1. Vì sao \`0/0\` "vô định"?

💡 **Trực giác**: viết $f(x)/g(x)$ với $f(a) = g(a) = 0$. Khi $x \\to a$, **cả** tử và mẫu cùng "co về 0" — tỉ số $0/0$ có thể:

- Trở thành hữu hạn bất kỳ (vd $\\lim_{x \\to 0} \\frac{2x}{x} = 2$).
- Trở thành 0 (vd $\\lim_{x \\to 0} \\frac{x^2}{x} = 0$).
- Trở thành ∞ (vd $\\lim_{x \\to 0} \\frac{x}{x^2}$).
- Không tồn tại ($\\frac{x \\cdot \\sin(1/x)}{x}$).

Không có quy tắc chung "0/0 = bao nhiêu" — phải **biến đổi đại số** để khử dạng vô định.

### 4.2. Kỹ thuật 1: Phân tích nhân tử

Khi tử và mẫu có nhân tử chung dạng $(x - a)$, **rút gọn** trước, rồi mới thay $x = a$.

**Ví dụ 1**: $\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$.

Thay trực tiếp: $\\frac{1 - 1}{1 - 1} = \\frac{0}{0}$. Vô định.

Phân tích: $x^2 - 1 = (x - 1)(x + 1)$. Nên:

$$\\frac{x^2 - 1}{x - 1} = \\frac{(x - 1)(x + 1)}{x - 1} = x + 1 \\quad (\\text{miễn } x \\neq 1)$$

Khi $x \\to 1$ (không chạm 1), biểu thức = $x + 1 \\to 2$. Vậy:

$$\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = 2$$

**Ví dụ 2**: $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.

Thay: $0/0$. Phân tích: $x^2 - 4 = (x - 2)(x + 2)$.

$$\\frac{x^2 - 4}{x - 2} = x + 2 \\to 4 \\quad \\text{khi } x \\to 2.$$

Kết quả: $\\lim = 4$.

**Ví dụ 3**: $\\lim_{x \\to 3} \\frac{x^2 - 5x + 6}{x - 3}$.

Thay: tử = $9 - 15 + 6 = 0$, mẫu = $0$. Phân tích tử: $x^2 - 5x + 6 = (x - 2)(x - 3)$.

$$\\frac{(x - 2)(x - 3)}{x - 3} = x - 2 \\to 1 \\quad \\text{khi } x \\to 3.$$

Kết quả: $\\lim = 1$.

**Ví dụ 4**: $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1}$.

Thay: $0/0$. Phân tích: $x^3 - 1 = (x - 1)(x^2 + x + 1)$ (hằng đẳng thức $a^3 - b^3$).

$$\\frac{x^3 - 1}{x - 1} = x^2 + x + 1 \\to 1 + 1 + 1 = 3 \\quad \\text{khi } x \\to 1.$$

Kết quả: $\\lim = 3$.

(Tổng quát: $\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n \\cdot a^{n-1}$. Đây sẽ là đạo hàm của $x^n$ — Lesson 03.)

### 4.3. Kỹ thuật 2: Nhân lượng liên hợp (rationalize)

Khi tử hoặc mẫu chứa căn $\\sqrt{\\ldots}$, nhân cả tử và mẫu với "lượng liên hợp" để bỏ căn.

**Ví dụ 1**: $\\lim_{x \\to 0} \\frac{\\sqrt{x + 1} - 1}{x}$.

Thay: tử = $\\sqrt{1} - 1 = 0$, mẫu = $0$. Vô định.

Nhân tử và mẫu với liên hợp $\\sqrt{x + 1} + 1$:

$$\\begin{aligned}
\\frac{(\\sqrt{x + 1} - 1)(\\sqrt{x + 1} + 1)}{x \\cdot (\\sqrt{x + 1} + 1)}
&= \\frac{(x + 1) - 1}{x \\cdot (\\sqrt{x + 1} + 1)} \\\\[4pt]
&= \\frac{x}{x \\cdot (\\sqrt{x + 1} + 1)} \\\\[4pt]
&= \\frac{1}{\\sqrt{x + 1} + 1} \\quad (\\text{miễn } x \\neq 0)
\\end{aligned}$$

Khi $x \\to 0$: $\\frac{1}{\\sqrt{1} + 1} = \\frac{1}{2}$. Kết quả: $\\lim = 1/2$.

Verify bằng bảng: $x = 0.01$ → $\\frac{\\sqrt{1.01} - 1}{0.01} \\approx \\frac{1.004988 - 1}{0.01} \\approx 0.4988$. $x = 0.001$ → $\\approx 0.4999$. Đều tiến tới $0.5$. ✓

**Ví dụ 2**: $\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$.

Thay: $0/0$. Nhân liên hợp $\\sqrt{x} + 2$:

$$\\begin{aligned}
\\frac{(\\sqrt{x} - 2)(\\sqrt{x} + 2)}{(x - 4)(\\sqrt{x} + 2)}
&= \\frac{x - 4}{(x - 4)(\\sqrt{x} + 2)} \\\\[4pt]
&= \\frac{1}{\\sqrt{x} + 2} \\quad (\\text{miễn } x \\neq 4)
\\end{aligned}$$

Khi $x \\to 4$: $\\frac{1}{2 + 2} = \\frac{1}{4}$. Kết quả: $\\lim = 1/4$.

**Ví dụ 3**: $\\lim_{x \\to 0} \\frac{x}{\\sqrt{x + 9} - 3}$.

Thay: $\\frac{0}{\\sqrt{9} - 3} = \\frac{0}{0}$. Nhân liên hợp $\\sqrt{x + 9} + 3$:

$$\\begin{aligned}
\\frac{x \\cdot (\\sqrt{x + 9} + 3)}{(\\sqrt{x + 9})^2 - 9}
&= \\frac{x \\cdot (\\sqrt{x + 9} + 3)}{x + 9 - 9} \\\\[4pt]
&= \\frac{x \\cdot (\\sqrt{x + 9} + 3)}{x} \\\\[4pt]
&= \\sqrt{x + 9} + 3 \\quad (\\text{miễn } x \\neq 0)
\\end{aligned}$$

Khi $x \\to 0$: $\\sqrt{9} + 3 = 6$. Kết quả: $\\lim = 6$.

**Ví dụ 4**: $\\lim_{x \\to 1} \\frac{x - 1}{\\sqrt{x} - 1}$. Hai cách:

Cách 1 — nhân liên hợp $\\sqrt{x} + 1$:

$$\\frac{(x - 1)(\\sqrt{x} + 1)}{(\\sqrt{x} - 1)(\\sqrt{x} + 1)} = \\frac{(x - 1)(\\sqrt{x} + 1)}{x - 1} = \\sqrt{x} + 1 \\to 2.$$

Cách 2 — đặt $t = \\sqrt{x}$, $x = t^2$, $x \\to 1 \\iff t \\to 1$:

$$\\frac{t^2 - 1}{t - 1} = \\frac{(t - 1)(t + 1)}{t - 1} = t + 1 \\to 2.$$

Cả hai cách cho cùng kết quả $2$. ✓

### 4.4. Giới hạn đặc biệt: \`lim_{x → 0} (sin x) / x = 1\`

💡 **Trực giác**: với x nhỏ (radian), $\\sin x \\approx x$. Ví dụ:

| $x$ | $\\sin(x)$ | $\\sin(x)/x$ |
|-----|----------|------------|
| $1$ | $0.84147$ | $0.84147$ |
| $0.5$ | $0.47943$ | $0.95885$ |
| $0.1$ | $0.09983$ | $0.99833$ |
| $0.01$ | $0.00999983$ | $0.99998$ |
| $0.001$ | $0.0009999998$ | $0.99999983$ |

Tỉ số tiến rõ ràng về $1$. Đây là **giới hạn đặc biệt** số 1 của Tầng 3 — sẽ là chìa khóa chứng minh $(\\sin x)' = \\cos x$ ở Lesson 02.

**Chứng minh chặt** (hình học, sketch — sẽ học kỹ ở Lesson 02):

Trên đường tròn đơn vị, với $x \\in (0, \\pi/2)$:

$$\\begin{aligned}
&\\text{diện tích tam giác nhỏ} < \\text{diện tích hình quạt} < \\text{diện tích tam giác lớn} \\\\[4pt]
&\\tfrac{1}{2}\\sin(x) \\cdot 1 < \\tfrac{1}{2} x \\cdot 1^2 < \\tfrac{1}{2}\\tan(x) \\cdot 1 \\\\[4pt]
&\\sin(x) < x < \\tan(x) = \\frac{\\sin(x)}{\\cos(x)}
\\end{aligned}$$

Chia cả 3 vế cho $\\sin(x) > 0$:

$$1 < \\frac{x}{\\sin(x)} < \\frac{1}{\\cos(x)}$$

Lật ngược (chia 1 cho mỗi vế, đảo dấu bất đẳng thức):

$$\\cos(x) < \\frac{\\sin(x)}{x} < 1$$

Khi $x \\to 0^+$, $\\cos(x) \\to 1$. Theo định lý kẹp (squeeze theorem): $\\frac{\\sin(x)}{x} \\to 1$. Phía âm: $\\frac{\\sin(x)}{x}$ là hàm chẵn, nên trái = phải. Kết luận:

$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1.$$

⚠ **Lỗi thường gặp**: dùng L'Hôpital (sẽ học sau) để chứng minh giới hạn này — **vòng lặp logic** vì L'Hôpital cần $(\\sin x)' = \\cos x$, mà điều này cần chính giới hạn $\\frac{\\sin(x)}{x} \\to 1$. Phải chứng minh hình học như trên.

### 4.5. Thêm hai giới hạn đặc biệt (sẽ gặp lại)

- $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$. Verify: $x = 0.1$, $\\frac{1 - 0.995004}{0.01} = 0.4996 \\approx 0.5$. ✓
- $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$. Verify: $x = 0.001$, $\\frac{e^{0.001} - 1}{0.001} = \\frac{1.0005}{1} \\approx 1.0005 \\to 1$.

Sẽ thấy lại ở Lesson 02 — chúng định nghĩa đạo hàm tại 0 của $\\sin$, $\\cos - 1$, $e^x$.

#### ❓ Câu hỏi tự nhiên

**Q1**: "Khi nào dùng phân tích, khi nào dùng liên hợp?"

A: Tử/mẫu là **đa thức** → phân tích nhân tử (tìm $(x - a)$). Tử/mẫu có **căn bậc hai** → nhân liên hợp. Kết hợp khi cần.

**Q2**: "Có cách \`máy\` nào không cần đoán nhân tử?"

A: Có — **L'Hôpital** (đạo hàm tử và mẫu rồi tính giới hạn) sẽ học sau khi học đạo hàm. Nhưng L'Hôpital cần đạo hàm, mà đạo hàm cần một số giới hạn đặc biệt phải chứng minh không qua L'Hôpital (như $\\sin x / x$). Nên mục này vẫn cần thiết.

**Q3**: "Phân tích thất bại thì sao?"

A: Có thể là dạng $0/0$ "ẩn" cần biến đổi khác (đặt biến mới, lượng giác hóa, dùng Taylor expansion sau này). Không phải mọi $0/0$ đều xử được bằng nhân tử + liên hợp. Khi học chuỗi (Tầng cao hơn), sẽ có công cụ mạnh hơn.

#### 🔁 Dừng lại tự kiểm tra (mục 4)

1. $\\lim_{x \\to 5} \\frac{x^2 - 25}{x - 5}$ = ?
2. $\\lim_{x \\to 0} \\frac{\\sin 3x}{x}$ = ?  (gợi ý: viết $\\frac{\\sin 3x}{x} = 3 \\cdot \\frac{\\sin 3x}{3x}$ rồi đặt $u = 3x$).
3. $\\lim_{x \\to 9} \\frac{\\sqrt{x} - 3}{x - 9}$ = ?

<details>
<summary>Đáp án</summary>

1. $\\frac{(x - 5)(x + 5)}{x - 5} = x + 5 \\to 10$.
2. $3 \\cdot \\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 3 \\cdot 1 = 3$.
3. Nhân liên hợp $\\sqrt{x} + 3$: $\\frac{x - 9}{(x - 9)(\\sqrt{x} + 3)} = \\frac{1}{\\sqrt{x} + 3} \\to \\frac{1}{6}$.

</details>

📝 **Tóm tắt mục 4**:

- $0/0$ là dạng vô định — không có giá trị mặc định, phải xử lý.
- Hai kỹ thuật chính: **phân tích nhân tử** (đa thức) và **nhân liên hợp** (căn).
- $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — giới hạn đặc biệt số 1, chứng minh hình học bằng squeeze theorem.
- Tổng quát hơn: $\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n \\cdot a^{n-1}$ (sẽ thành đạo hàm).

---

## 5. Giới hạn vô cực và giới hạn tại vô cực

### 5.1. \`lim = +∞\` hay \`−∞\`

💡 **Trực giác**: nếu khi $x \\to a$, $f(x)$ **không** nhắm tới một số thực mà phình to vô hạn về phía dương (hoặc âm), ta viết:

$$\\lim_{x \\to a} f(x) = +\\infty \\quad (\\text{hoặc } -\\infty)$$

Lưu ý ký hiệu này không nói "giới hạn tồn tại bằng một số ∞" — vì ∞ không phải số. Nó chỉ là **mô tả hành vi** (giới hạn theo nghĩa số thực vẫn DNE).

**Ví dụ 1**: $\\lim_{x \\to 0^+} 1/x$.

| $x$ (dương) | $1/x$ |
|-------------|-------|
| $0.1$ | $10$ |
| $0.01$ | $100$ |
| $0.001$ | $1000$ |
| $0.0001$ | $10000$ |

Đi lên không giới hạn. Viết: $\\lim_{x \\to 0^+} 1/x = +\\infty$.

**Ví dụ 2**: $\\lim_{x \\to 0^-} 1/x$.

| $x$ (âm) | $1/x$ |
|----------|-------|
| $-0.1$ | $-10$ |
| $-0.01$ | $-100$ |
| $-0.001$ | $-1000$ |

Viết: $\\lim_{x \\to 0^-} 1/x = -\\infty$.

Vì hai phía khác nhau ($+\\infty$ và $-\\infty$), $\\lim_{x \\to 0} 1/x$ **DNE** (không tồn tại).

**Ví dụ 3**: $\\lim_{x \\to 2} \\frac{1}{(x - 2)^2}$. Mẫu $(x - 2)^2$ luôn dương và → 0. Bất kể x → 2 từ phía nào, $\\frac{1}{(x - 2)^2} \\to +\\infty$. Vậy $\\lim = +\\infty$ (cả hai phía cùng giá trị).

**Ví dụ 4**: $\\lim_{x \\to 0} \\ln(x)$ (chỉ định nghĩa cho $x > 0$ nên thực chất là $\\lim_{x \\to 0^+}$). Bảng: $\\ln(0.1) \\approx -2.30$, $\\ln(0.01) \\approx -4.61$, $\\ln(0.001) \\approx -6.91$, $\\ln(10^{-10}) \\approx -23.03$. Tiến tới $-\\infty$. Viết: $\\lim_{x \\to 0^+} \\ln(x) = -\\infty$.

### 5.2. \`lim_{x → ∞} f(x) = L\`

Đây là giới hạn **tại vô cực** — hỏi *"khi x rất lớn (dương) thì f(x) tiến tới đâu?"*

**Ví dụ 1**: $\\lim_{x \\to \\infty} 1/x$.

| $x$ | $1/x$ |
|-----|-------|
| $10$ | $0.1$ |
| $100$ | $0.01$ |
| $1000$ | $0.001$ |
| $10^6$ | $10^{-6}$ |

Tiến về $0$. Viết: $\\lim_{x \\to \\infty} 1/x = 0$.

Tương tự: $\\lim_{x \\to -\\infty} 1/x = 0$ ($1/(-10) = -0.1$, $1/(-100) = -0.01$, … → 0 từ phía âm).

**Ví dụ 2**: $\\lim_{x \\to \\infty} (1 + 1/x)$. Bằng $1 + \\lim(1/x) = 1 + 0 = 1$.

**Ví dụ 3**: $\\lim_{x \\to \\infty} e^{-x}$. $e^{-10} \\approx 4.5 \\cdot 10^{-5}$, $e^{-100} \\approx 10^{-44}$, → 0.

**Ví dụ 4 (thương 2 đa thức)**: $\\lim_{x \\to \\infty} \\frac{3x^2 + 2x}{x^2 - 5}$.

Mánh: **chia cả tử và mẫu cho lũy thừa lớn nhất** — ở đây là $x^2$:

$$\\frac{3x^2 + 2x}{x^2 - 5} = \\frac{3 + 2/x}{1 - 5/x^2}$$

Khi $x \\to \\infty$: $2/x \\to 0$, $5/x^2 \\to 0$. Nên:

$$\\lim = \\frac{3 + 0}{1 - 0} = 3.$$

Verify bằng số: $x = 100$, $\\frac{30000 + 200}{10000 - 5} = \\frac{30200}{9995} \\approx 3.022$. $x = 1000 \\to 3.00200\\ldots \\approx 3.002$. ✓ Tiến về 3.

### 5.3. Quy tắc nhanh cho thương đa thức tại ∞

Cho $P(x), Q(x)$ là đa thức bậc $m, n$:

$$\\lim_{x \\to \\infty} \\frac{P(x)}{Q(x)} = \\begin{cases}
0 & \\text{nếu } m < n \\ (\\text{mẫu trội}) \\\\[4pt]
\\dfrac{\\text{hệ số cao nhất } P}{\\text{hệ số cao nhất } Q} & \\text{nếu } m = n \\\\[4pt]
\\pm\\infty & \\text{nếu } m > n \\ (\\text{tử trội, dấu tùy hệ số})
\\end{cases}$$

**Verify** với 3 ví dụ:

- $\\lim_{x \\to \\infty} \\frac{x + 1}{x^2 + 3}$. Bậc tử 1, mẫu 2, $1 < 2$ → 0. Check: $x = 1000$, $\\frac{1001}{1000003} \\approx 0.001$. ✓
- $\\lim_{x \\to \\infty} \\frac{2x^3 + x}{5x^3 - 7}$. Bậc tử = mẫu = 3. Hệ số cao nhất: $2/5$. Check: $x = 1000$, $\\frac{2 \\cdot 10^9 + 1000}{5 \\cdot 10^9 - 7} \\approx 0.4$. ✓
- $\\lim_{x \\to \\infty} \\frac{x^2 + 1}{x - 1}$. Bậc tử 2 > mẫu 1 → $+\\infty$. Check: $x = 1000$, $\\frac{1000001}{999} \\approx 1001$. Tăng vô hạn. ✓

### 5.4. Các dạng vô định khác (∞ − ∞, 0·∞, ∞/∞)

Ngoài $0/0$, còn các dạng vô định:

- **$\\infty - \\infty$**: vd $\\lim_{x \\to \\infty} (\\sqrt{x^2 + x} - x)$. Trực tiếp: $\\infty - \\infty$ vô định. Nhân liên hợp:

  $$\\begin{aligned}
  \\frac{(\\sqrt{x^2 + x} - x)(\\sqrt{x^2 + x} + x)}{\\sqrt{x^2 + x} + x}
  &= \\frac{x^2 + x - x^2}{\\sqrt{x^2 + x} + x} \\\\[4pt]
  &= \\frac{x}{\\sqrt{x^2 + x} + x}
  \\end{aligned}$$

  Chia tử mẫu cho $x$ (x > 0 với x → ∞):

  $$= \\frac{1}{\\sqrt{1 + 1/x} + 1} \\to \\frac{1}{1 + 1} = \\frac{1}{2}.$$

  Verify: $x = 1000$, $\\sqrt{1001000} - 1000 \\approx 1000.4999 - 1000 = 0.4999$. ✓

- **$0 \\cdot \\infty$**: vd $\\lim_{x \\to \\infty} x \\cdot \\sin(1/x)$. Đặt $u = 1/x$, $u \\to 0$. Biểu thức = $\\frac{1}{u} \\cdot \\sin(u) = \\frac{\\sin(u)}{u} \\to 1$. Vô định nhưng có giới hạn = 1.

- **$\\infty/\\infty$**: chính là thương đa thức ở mục 5.3, hoặc sẽ dùng L'Hôpital sau.

⚠ **Lỗi thường gặp**:

- Viết $\\infty - \\infty = 0$. Sai — $\\infty - \\infty$ là vô định, có thể bằng bất kỳ.
- Viết $\\infty/\\infty = 1$. Sai — phụ thuộc tốc độ tử mẫu (vd $x^2/x = x \\to \\infty$, không phải 1).
- Quên dấu khi $x \\to -\\infty$ đối với hàm có lũy thừa lẻ. Vd $\\lim_{x \\to -\\infty} x^3 = -\\infty$, không phải $+\\infty$.

📝 **Tóm tắt mục 5**:

- $\\lim = \\pm\\infty$ mô tả hành vi nổ về vô cực (giới hạn theo nghĩa số thực vẫn DNE).
- $\\lim_{x \\to \\infty} f(x) = L$: chia tử mẫu cho lũy thừa lớn nhất (thương đa thức) hoặc nhân liên hợp (căn).
- 4 dạng vô định: $0/0$, $\\infty - \\infty$, $0 \\cdot \\infty$, $\\infty/\\infty$ — đều cần biến đổi đại số.

---

## 6. Tính chất của giới hạn (limit laws)

Giả sử $\\lim_{x \\to a} f(x) = L$ và $\\lim_{x \\to a} g(x) = M$ đều tồn tại (số thực). Khi đó:

| Quy tắc | Phát biểu |
|---------|-----------|
| Tổng | $\\lim (f + g) = L + M$ |
| Hiệu | $\\lim (f - g) = L - M$ |
| Hằng | $\\lim (c \\cdot f) = c \\cdot L$ |
| Tích | $\\lim (f \\cdot g) = L \\cdot M$ |
| Thương | $\\lim (f / g) = L / M$, miễn $M \\neq 0$ |
| Lũy thừa | $\\lim (f^n) = L^n$ (n nguyên dương) |
| Hợp (nhẹ) | Nếu $g$ liên tục tại $L$ thì $\\lim g(f(x)) = g(L)$ |

### Walk-through ví dụ kết hợp

$\\lim_{x \\to 2} \\frac{x^2 + 3x}{x + 1}$.

- $\\lim x^2 = 4$ (mục 1)
- $\\lim 3x = 6$
- $\\lim (x^2 + 3x) = 4 + 6 = 10$ (quy tắc tổng)
- $\\lim (x + 1) = 3$
- Mẫu ≠ 0, dùng quy tắc thương: $\\lim = 10/3$.

Khớp với "thay số trực tiếp" $\\frac{4 + 6}{3} = \\frac{10}{3}$. ✓

### Định lý kẹp (squeeze theorem)

Nếu $g(x) \\leq f(x) \\leq h(x)$ quanh $a$ (trừ tại $a$), và $\\lim g = \\lim h = L$, thì $\\lim f = L$.

**Ví dụ**: $\\lim_{x \\to 0} x^2 \\cdot \\sin(1/x)$. Hàm $\\sin(1/x)$ dao động giữa $-1$ và $+1$. Nhân với $x^2 \\geq 0$:

$$-x^2 \\leq x^2 \\sin(1/x) \\leq x^2$$

$\\lim_{x \\to 0} (-x^2) = 0$, $\\lim_{x \\to 0} x^2 = 0$. Theo squeeze: $\\lim = 0$. ✓

⚠ **Lỗi thường gặp**: dùng quy tắc thương khi mẫu → 0. Phải tách trường hợp: nếu tử cũng → 0, dùng các kỹ thuật mục 4; nếu tử → c ≠ 0, kết quả là ±∞ (DNE theo nghĩa số thực).

📝 **Tóm tắt mục 6**: Các quy tắc cộng/trừ/nhân/chia/lũy thừa cho phép tách giới hạn phức tạp thành các giới hạn con. Squeeze theorem xử lý hàm dao động.

---

## 7. Liên tục (continuity)

### 7.1. Định nghĩa

> Hàm $f$ được gọi là **liên tục tại $a$** nếu:
>
> 1. $f(a)$ xác định.
> 2. $\\lim_{x \\to a} f(x)$ tồn tại (số thực).
> 3. $\\lim_{x \\to a} f(x) = f(a)$.

Ba điều kiện này nói: "giá trị tại điểm" = "giá trị giới hạn tiến tới khi gần điểm". Trực giác — đồ thị không có đứt gãy / không có lỗ / không có nhảy tại $a$.

💡 **Trực giác hình ảnh**: nếu vẽ đồ thị $f$ mà không nhấc bút lên thì $f$ liên tục tại mọi điểm trong đoạn đang vẽ.

### 7.2. 4 ví dụ liên tục / không liên tục

**Ví dụ 1** — liên tục: $f(x) = x^2$ tại $x = 2$.
- $f(2) = 4$ ✓
- $\\lim_{x \\to 2} f(x) = 4$ ✓
- Bằng nhau ✓ → liên tục.

**Ví dụ 2** — không liên tục do **lỗ** (removable): $f(x) = \\frac{x^2 - 1}{x - 1}$ tại $x = 1$.
- $f(1)$ không xác định → vi phạm điều kiện 1.
- $\\lim = 2$ tồn tại — nhưng không "vá" vì f chưa định nghĩa.
- (Nếu định nghĩa lại $f(1) = 2$, hàm trở thành liên tục — gọi là "removable discontinuity".)

**Ví dụ 3** — không liên tục do **nhảy** (jump): $f(x) = \\text{sign}(x)$ tại $x = 0$.
- $f(0) = 0$ ✓ xác định.
- $\\lim_{x \\to 0^-} = -1$, $\\lim_{x \\to 0^+} = +1$ → giới hạn hai phía DNE.
- Vi phạm điều kiện 2 → không liên tục.

**Ví dụ 4** — không liên tục do **vô cực**: $f(x) = 1/x$ tại $x = 0$.
- $f(0)$ không xác định.
- $\\lim_{x \\to 0^-} = -\\infty$, $\\lim_{x \\to 0^+} = +\\infty$ → DNE.
- Không liên tục.

### 7.3. Vì sao liên tục quan trọng cho đạo hàm?

**Định lý**: nếu $f$ có đạo hàm tại $a$ thì $f$ liên tục tại $a$.

Chứng minh sketch: đạo hàm = $\\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$ tồn tại (số thực) ⟹ tử $(f(a + h) - f(a))$ phải tiến về 0 (vì mẫu → 0 và thương hữu hạn) ⟹ $f(a + h) \\to f(a)$ ⟹ liên tục.

Hệ quả: hàm **không liên tục** thì **không có đạo hàm** tại điểm đứt gãy. Ví dụ $|x|$ liên tục tại 0 nhưng vẫn không có đạo hàm tại 0 (sẽ thấy ở Lesson 02 — góc nhọn). Liên tục là điều kiện **cần** nhưng không đủ cho đạo hàm.

⚠ **Lỗi thường gặp**: nghĩ "liên tục ⟹ trơn (smooth) ⟹ có đạo hàm". Sai — $|x|$ là ví dụ liên tục nhưng không khả vi tại 0.

📝 **Tóm tắt mục 7**: Liên tục tại $a$ = $\\lim_{x \\to a} f = f(a)$. Hàm liên tục là tiền đề "đầu vào tốt" của hầu hết kết quả giải tích, đặc biệt đạo hàm.

---

## 8. Số \`e\` qua giới hạn

### 8.1. Định nghĩa

Số $e \\approx 2.71828\\ldots$ (số Euler) có nhiều cách định nghĩa tương đương. Một cách:

$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$$

💡 **Trực giác lãi suất ghép liên tục** (compound interest): gửi \`$1\` lãi 100%/năm. Nếu ghép 1 lần/năm: $(1 + 1)^1 = 2$. Ghép 2 lần/năm: $(1 + 0.5)^2 = 2.25$. Ghép n lần/năm: $(1 + 1/n)^n$. Khi $n \\to \\infty$ (ghép liên tục), tổng tiền tiến tới $e \\approx 2.71828$.

### 8.2. Walk-through bằng số

| $n$ | $(1 + 1/n)^n$ |
|-----|---------------|
| $1$ | $2.0000000000$ |
| $2$ | $2.2500000000$ |
| $5$ | $2.4883200000$ |
| $10$ | $2.5937424601$ |
| $100$ | $2.7048138294$ |
| $1000$ | $2.7169239322$ |
| $10000$ | $2.7181459268$ |
| $100000$ | $2.7182682371$ |
| $1000000$ | $2.7182804693$ |
| $10^7$ | $2.7182816925$ |
| $10^8$ | $2.7182817983$ |

Hội tụ rất chậm về $e \\approx 2.71828182845904\\ldots$. Sau $10^8$ lần ghép, mới chính xác tới chữ số thứ 6. Đó là lý do định nghĩa qua chuỗi $e = 1 + \\frac{1}{1!} + \\frac{1}{2!} + \\frac{1}{3!} + \\cdots$ (hội tụ nhanh hơn) thực tế dùng để tính $e$.

### 8.3. Dạng tương đương

$$e = \\lim_{h \\to 0} (1 + h)^{1/h}$$

(Đặt $h = 1/n$; khi $n \\to \\infty$, $h \\to 0^+$.) Verify: $h = 0.001$, $(1.001)^{1000} \\approx 2.7169$. ✓

Và:

$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$$

(Đây là phát biểu khác của "đạo hàm $e^x$ tại 0 bằng 1" — sẽ dùng ở Lesson 02 chứng minh $(e^x)' = e^x$.)

#### ❓ Câu hỏi tự nhiên: "Vì sao chọn $e$ chứ không phải $2$ hay $10$ làm cơ số log/exp?"

A: Vì $e$ là số duy nhất khiến $\\frac{d}{dx} e^x = e^x$ (đạo hàm = chính nó). Mọi hàm mũ khác có hệ số xấp xỉ: $\\frac{d}{dx} 2^x = 2^x \\cdot \\ln 2$, $\\frac{d}{dx} 10^x = 10^x \\cdot \\ln 10$. Chọn cơ số $e$ triệt tiêu hệ số $\\ln a$ → công thức đạo hàm/tích phân gọn nhất. Đây là lý do $e^x$ và $\\ln x$ xuất hiện khắp giải tích, không phải vì đẹp mắt.

📝 **Tóm tắt mục 8**:

- $e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\approx 2.71828\\ldots$.
- Hội tụ chậm: cần $n \\approx 10^8$ để có 6 chữ số đúng.
- Dạng tương đương $\\lim_{h \\to 0} (1 + h)^{1/h} = e$ và $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$.

---

## 9. Liên hệ với ML/AI

### 9.1. Đạo hàm là một giới hạn

Định nghĩa đạo hàm — sẽ học Lesson 02:

$$f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$$

Tử dạng $0/0$ (vì khi $h \\to 0$, $f(a + h) \\to f(a)$, nên $f(a + h) - f(a) \\to 0$). Toàn bộ chương đạo hàm = giải các giới hạn $0/0$.

Ví dụ tính nhanh $(x^2)'$ tại $x = 3$:

$$\\begin{aligned}
\\lim_{h \\to 0} \\frac{(3 + h)^2 - 9}{h}
&= \\lim_{h \\to 0} \\frac{9 + 6h + h^2 - 9}{h} \\\\[4pt]
&= \\lim_{h \\to 0} \\frac{6h + h^2}{h} \\\\[4pt]
&= \\lim_{h \\to 0} (6 + h) \\\\[4pt]
&= 6
\\end{aligned}$$

Khớp với $(x^2)' = 2x$ tại $x = 3$ (sẽ chứng minh tổng quát ở Lesson 02).

### 9.2. Softmax với temperature → 0

Hàm softmax dùng trong logistic regression và mạng neural:

$$\\text{softmax}(z_i; T) = \\frac{\\exp(z_i / T)}{\\sum_j \\exp(z_j / T)}$$

$T$ là **temperature** (tham số nhiệt độ). Khi $T \\to 0^+$:

- Số $\\exp(z_i / T)$ lớn nhất (tương ứng với $z_i$ lớn nhất) trội hơn tất cả → softmax tiến về vector one-hot của $\\arg\\max$.
- Khi $T \\to \\infty$: tất cả $\\exp(z_i/T) \\to 1$, softmax → uniform $(1/n, \\ldots, 1/n)$.

$$\\begin{aligned}
\\lim_{T \\to 0^+} \\text{softmax}(z; T) &= \\text{one\\_hot}(\\arg\\max z) \\\\[4pt]
\\lim_{T \\to \\infty} \\text{softmax}(z; T) &= \\text{uniform}
\\end{aligned}$$

Vậy softmax là "giới hạn liên tục" giữa argmax (hard, không khả vi) và uniform (mất thông tin). Trong huấn luyện, ta dùng T cố định để có gradient mượt; suy luận có thể cho $T \\to 0$ để decode hard.

### 9.3. Continuity và loss functions

Loss function được chọn liên tục (và thường khả vi) để gradient descent hoạt động. Hinge loss có **gãy** tại 0 nhưng vẫn liên tục — vẫn dùng được với subgradient. Step loss (0/1) không liên tục — không tối ưu trực tiếp bằng gradient được, nên thường dùng cross-entropy (liên tục, khả vi) làm proxy.

📝 **Tóm tắt mục 9**:

- Đạo hàm = giới hạn $0/0$; backprop = chain rule áp lên các giới hạn này.
- Softmax temperature → 0 cho argmax (limit); → ∞ cho uniform.
- Liên tục là điều kiện ngầm để gradient descent hoạt động.

---

## 10. Bài tập

Mỗi bài có **lời giải chi tiết step-by-step** ở mục tiếp theo.

### Bài 1 — Thay số trực tiếp

Tính:

a) $\\lim_{x \\to 4} (x^2 - 3x + 1)$
b) $\\lim_{x \\to 0} \\cos(x) \\cdot e^x$
c) $\\lim_{x \\to \\pi/2} \\sin(x)$
d) $\\lim_{x \\to 2} \\frac{x^3 + 1}{x^2 - 1}$

### Bài 2 — Dạng \`0/0\` (phân tích nhân tử)

Tính:

a) $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$
b) $\\lim_{x \\to -1} \\frac{x^2 + 2x + 1}{x + 1}$
c) $\\lim_{x \\to 2} \\frac{x^3 - 8}{x - 2}$
d) $\\lim_{x \\to 1} \\frac{x^4 - 1}{x - 1}$

### Bài 3 — Dạng \`0/0\` (nhân liên hợp)

Tính:

a) $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$
b) $\\lim_{x \\to 1} \\frac{\\sqrt{x} - 1}{x - 1}$
c) $\\lim_{x \\to 0} \\frac{x}{\\sqrt{1 + 3x} - 1}$

### Bài 4 — Giới hạn tại vô cực

Tính:

a) $\\lim_{x \\to \\infty} \\frac{4x^2 + 5}{2x^2 - x + 1}$
b) $\\lim_{x \\to \\infty} \\frac{x + 1}{x^2 + 3x}$
c) $\\lim_{x \\to \\infty} \\frac{2x^3 - x}{x^2 + 4}$
d) $\\lim_{x \\to \\infty} (\\sqrt{x^2 + 1} - x)$

### Bài 5 — Giới hạn đặc biệt và liên tục

a) Tính $\\lim_{x \\to 0} \\frac{\\sin 5x}{x}$.
b) Tính $\\lim_{x \\to 0} \\frac{\\sin 5x}{\\sin 2x}$.
c) Hàm $f(x) = \\frac{x^2 - 4}{x - 2}$ nếu $x \\neq 2$; $f(2) = ?$ để $f$ liên tục tại 2?

### Bài 6 — ε-δ và squeeze

a) Chứng minh bằng ε-δ rằng $\\lim_{x \\to 3} (4x - 1) = 11$.
b) Dùng squeeze theorem: $\\lim_{x \\to 0} x \\cdot \\cos(1/x)$ = ?
c) $\\lim_{x \\to \\infty} \\frac{\\sin x}{x}$ = ?

---

## 11. Lời giải chi tiết

### Bài 1

a) Đa thức liên tục. Thay $x = 4$: $16 - 12 + 1 = 5$. **Đáp số: 5**.

b) Tích hai hàm liên tục tại 0. Thay: $\\cos(0) \\cdot e^0 = 1 \\cdot 1 = 1$. **Đáp số: 1**.

c) $\\sin(x)$ liên tục. Thay: $\\sin(\\pi/2) = 1$. **Đáp số: 1**.

d) Tử tại 2: $8 + 1 = 9$. Mẫu tại 2: $4 - 1 = 3$. Mẫu ≠ 0, thay được: $9/3 = 3$. **Đáp số: 3**.

### Bài 2

a) $0/0$. $x^2 - 9 = (x - 3)(x + 3)$. Rút gọn: $x + 3 \\to 6$. **Đáp số: 6**.

b) $0/0$. $x^2 + 2x + 1 = (x + 1)^2$. Rút gọn: $\\frac{(x + 1)^2}{x + 1} = x + 1 \\to 0$. **Đáp số: 0**.

c) $0/0$. $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$. Rút gọn: $x^2 + 2x + 4 \\to 4 + 4 + 4 = 12$. **Đáp số: 12**.

d) $0/0$. $x^4 - 1 = (x - 1)(x^3 + x^2 + x + 1)$. Rút gọn: $x^3 + x^2 + x + 1 \\to 1 + 1 + 1 + 1 = 4$. **Đáp số: 4**.

(Verify công thức tổng quát: $\\lim_{x \\to 1} \\frac{x^n - 1}{x - 1} = n$, đây là $n = 4$.)

### Bài 3

a) $0/0$. Nhân liên hợp $\\sqrt{x + 4} + 2$:

$$\\begin{aligned}
\\frac{(x + 4) - 4}{x \\cdot (\\sqrt{x + 4} + 2)}
&= \\frac{x}{x \\cdot (\\sqrt{x + 4} + 2)} \\\\[4pt]
&= \\frac{1}{\\sqrt{x + 4} + 2} \\to \\frac{1}{2 + 2} = \\frac{1}{4}.
\\end{aligned}$$

**Đáp số: 1/4**.

b) $0/0$. Nhân liên hợp $\\sqrt{x} + 1$:

$$\\frac{x - 1}{(x - 1)(\\sqrt{x} + 1)} = \\frac{1}{\\sqrt{x} + 1} \\to \\frac{1}{1 + 1} = \\frac{1}{2}.$$

**Đáp số: 1/2**.

c) $0/0$. Nhân liên hợp $\\sqrt{1 + 3x} + 1$:

$$\\begin{aligned}
\\frac{x \\cdot (\\sqrt{1 + 3x} + 1)}{(1 + 3x) - 1}
&= \\frac{x \\cdot (\\sqrt{1 + 3x} + 1)}{3x} \\\\[4pt]
&= \\frac{\\sqrt{1 + 3x} + 1}{3} \\to \\frac{1 + 1}{3} = \\frac{2}{3}.
\\end{aligned}$$

**Đáp số: 2/3**.

### Bài 4

a) Bậc tử = mẫu = 2. Tỉ số hệ số cao: $4/2 = 2$. **Đáp số: 2**.

b) Bậc tử 1 < mẫu 2. **Đáp số: 0**.

c) Bậc tử 3 > mẫu 2; hệ số dương → $+\\infty$. **Đáp số: $+\\infty$** (DNE theo nghĩa số thực).

d) $\\infty - \\infty$. Nhân liên hợp:

$$\\begin{aligned}
\\frac{(\\sqrt{x^2 + 1} - x)(\\sqrt{x^2 + 1} + x)}{\\sqrt{x^2 + 1} + x}
&= \\frac{(x^2 + 1) - x^2}{\\sqrt{x^2 + 1} + x} \\\\[4pt]
&= \\frac{1}{\\sqrt{x^2 + 1} + x}
\\end{aligned}$$

Khi $x \\to \\infty$, mẫu $\\to \\infty$, nên tỉ số → 0. **Đáp số: 0**.

### Bài 5

a) $\\frac{\\sin 5x}{x} = 5 \\cdot \\frac{\\sin 5x}{5x}$. Đặt $u = 5x \\to 0$. $5 \\cdot \\frac{\\sin(u)}{u} \\to 5 \\cdot 1 = 5$. **Đáp số: 5**.

b) Viết $\\frac{\\sin 5x}{\\sin 2x} = \\frac{\\sin 5x}{5x} \\cdot \\frac{2x}{\\sin 2x} \\cdot \\frac{5}{2}$. Khi $x \\to 0$: phần 1 → 1, phần 2 → 1. Tổng: $5/2$. **Đáp số: 5/2**.

c) Để $f$ liên tục tại 2, cần $f(2) = \\lim_{x \\to 2} f(x)$. Giới hạn: $\\frac{(x - 2)(x + 2)}{x - 2} = x + 2 \\to 4$. **Đáp số: $f(2) = 4$**.

### Bài 6

a) $|(4x - 1) - 11| = |4x - 12| = 4|x - 3|$. Muốn $< \\epsilon$, cần $4|x - 3| < \\epsilon \\iff |x - 3| < \\epsilon/4$. Chọn $\\delta = \\epsilon/4$. Kiểm tra: $0 < |x - 3| < \\epsilon/4 \\implies |(4x - 1) - 11| = 4|x - 3| < 4 \\cdot \\epsilon/4 = \\epsilon$. ✓

b) $\\cos(1/x) \\in [-1, +1]$, nên $-|x| \\leq x \\cdot \\cos(1/x) \\leq |x|$. $\\lim (-|x|) = \\lim |x| = 0$. Squeeze: **đáp số 0**.

c) $-1/x \\leq \\frac{\\sin x}{x} \\leq 1/x$ (với $x > 0$). $\\lim \\pm 1/x = 0$. Squeeze: **đáp số 0**.

(Lưu ý: với $x \\to 0$, $\\frac{\\sin x}{x} \\to 1$; với $x \\to \\infty$, $\\frac{\\sin x}{x} \\to 0$. Hai giới hạn khác nhau — bối cảnh quyết định.)

---

## 12. Liên kết và bài tiếp theo

- [\`visualization.html\`](./visualization.html) — mini-app tương tác: ε-δ explorer, 0/0 simplifier, bảng \`sin(x)/x\`, slider tính \`e\`.
- **Bài tiếp theo**: [Lesson 02 — Đạo hàm 1 biến](../lesson-02-derivatives/) — sẽ định nghĩa đạo hàm là một giới hạn cụ thể $\\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$, và dùng các kỹ thuật mục 4 (đặc biệt $0/0$) liên tục.
- **Tham khảo chéo**:
  - Số $e$ xuất hiện ở [Lesson 07 — Hàm mũ và log](../../01-Algebra/lesson-07-exp-log-functions/) (Tầng 1) — ở đó định nghĩa qua chuỗi, ở đây qua giới hạn.
  - $\\frac{\\sin x}{x}$ cần kiến thức $\\sin$ từ [Tầng 2 — Trigonometry](../../02-Trigonometry/).
  - Tích phân (Lesson 08) cũng là một giới hạn — của tổng Riemann.

> **Câu để mang theo**: mọi cơ chế "tức thời" hay "vô hạn" trong giải tích đều là một giới hạn được ngụy trang. Khi đọc tới $\\frac{d}{dx}$, $\\int$, $\\sum_{n=1}^\\infty$, hãy luôn nhớ — có một $\\lim$ ẩn dưới đó.
`;
