# Lesson 08 — Hàm sơ cấp

## Mục tiêu

- Khảo sát các loại **hàm sơ cấp (elementary functions)** quan trọng:
  - **Hàm hằng** $y = c$ (đường ngang).
  - **Hàm bậc 1** $y = ax + b$ (đường thẳng).
  - **Hàm bậc 2** $y = ax^2 + bx + c$ (parabol).
  - **Hàm đa thức (polynomial)** $y = a_n x^n + \dots + a_0$ và **phân thức hữu tỉ (rational)** $y = P(x)/Q(x)$.
  - **Hàm mũ (exponential)** $y = a^x$ ($a > 0, a \neq 1$), đặc biệt $e^x$.
  - **Hàm log (logarithm)** $y = \log_a(x)$.
  - **Hàm trị tuyệt đối** $y = |x|$ và **hàm sàn/trần (floor/ceiling)** $\lfloor x \rfloor$, $\lceil x \rceil$.
- Hiểu mối liên hệ giữa **mũ và log** (hàm ngược của nhau).
- Đọc được **tính chất** mỗi họ hàm: đồng biến/nghịch biến, **tiệm cận (asymptote)**, miền xác định (domain) và miền giá trị (range).
- Nắm **biến đổi đồ thị (graph transformation)**: dịch (shift), co giãn (scale), lật (reflect) — $f(x-h)+k$, $a\,f(x)$, $f(-x)$.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/): đa thức, phân tích nhân tử.
- [Lesson 04 — PT bậc 2](../lesson-04-quadratic-equations/): $\Delta$, nghiệm, đỉnh parabol.
- [Lesson 06 — Lũy thừa, log](../lesson-06-powers-roots-logs/): $a^n$, $\log_a x$ và các quy tắc.
- [Lesson 07 — Hàm số](../lesson-07-functions-intro/): khái niệm hàm, domain/range, hàm hợp, hàm ngược, hàm chẵn/lẻ.

💡 **Bài này khác Lesson 07 ở đâu?** Lesson 07 dạy *"hàm số là gì"* (quy tắc input→output, cách tìm domain/range nói chung). Bài này đi **danh mục cụ thể**: với mỗi *họ* hàm sơ cấp, ta hỏi *"nó trông như thế nào, dùng ở đâu, đồ thị có hình gì, đổi dạng ra sao"*. Coi đây là "sổ tay nhận dạng" các đường cong bạn sẽ gặp suốt giải tích, vật lý và ML.

---

## 0. Bộ sưu tập trực giác — mỗi họ hàm "trông như thế nào"

💡 Trước khi đi vào từng họ, đây là **bức tranh tổng thể**: mỗi hàm sơ cấp có một "dáng" đặc trưng và một "công việc" mà nó làm tốt nhất. Học nhận diện dáng trước, công thức sau.

```
   HẰNG y=c        BẬC 1 y=x       BẬC 2 y=x²       MŨ y=2ˣ
   |               |        /       |    \   /        |      |
 c ─────────       |      /         |     \ /         |     /
   |               |    /           |      V          |   _/
   |____________   |__/_________    |________         |__/______

   "đứng yên"      "dốc đều"        "ném vật"        "bùng nổ"


   LOG y=log x     |x| trị tuyệt    SÀN ⌊x⌋          PHÂN THỨC 1/x
   |        _____  |   \   /         |    __          |  |
   |    ___/       |    \ /          |  _|            |  |
   |  _/           |     V           |_|              |__|________
   |_/__________   |________         |  __            |  |
                                        |             |  |
   "nén / chậm"    "khoảng cách"    "bậc thang"       "tiệm cận 2 phía"
```

| Họ hàm | Dáng đồ thị | Công việc đặc trưng (dùng ở đâu) |
|--------|-------------|----------------------------------|
| Hằng $y=c$ | Đường ngang | Giá trị cố định: phí cố định, hằng số vật lý |
| Bậc 1 $y=ax+b$ | Đường thẳng | Quan hệ tuyến tính: vận tốc đều, linear regression |
| Bậc 2 $y=ax^2+bx+c$ | Parabol | **Ném vật** (quỹ đạo), tối ưu hóa (tìm min/max) |
| Đa thức bậc $n$ | Lượn $\le n-1$ "khúc" | Khớp đường cong (curve fitting), nội suy |
| Phân thức $P/Q$ | Có tiệm cận | Tỉ lệ, nồng độ, tốc độ phản ứng bão hòa |
| Mũ $a^x$ | **Bùng nổ / phân rã** | **Tăng trưởng**: dân số, lãi kép, phóng xạ |
| Log $\log_a x$ | Cong, tăng chậm | **Nén** thang đo: pH, Richter, decibel, $O(\log n)$ |
| Trị tuyệt đối $|x|$ | Chữ V | **Khoảng cách**, sai số (loss L1) |
| Sàn/trần $\lfloor x\rfloor$ | Bậc thang | Làm tròn, chia ô, giá cước bậc thang |

Phần còn lại của bài "mổ xẻ" từng dòng trong bảng này bằng số cụ thể.

---

## 1. Hàm hằng & hàm bậc 1 — Đường ngang và đường thẳng

### 1.0. Hàm hằng

$$y = c \quad (c \text{ là số cố định})$$

💡 **Là gì**: output **không đổi** dù x là gì — đồ thị là **đường nằm ngang** ở độ cao $c$. Đây là trường hợp đặc biệt của bậc 1 với $a = 0$.

- $D = \mathbb{R}$, $E = \{c\}$ (chỉ đúng một giá trị).
- Không đồng biến cũng không nghịch biến (phẳng lì).
- **Vừa chẵn vừa lẻ?** $f(-x) = c = f(x)$ → chẵn (đối xứng trục y). Lẻ chỉ khi $c = 0$.

**4 ví dụ số**: với $f(x) = 5$: $f(0) = 5$, $f(100) = 5$, $f(-3) = 5$, $f(\sqrt{2}) = 5$ — mọi input đều ra 5.

**Dùng ở đâu**: phí thuê bao cố định (50.000đ/tháng bất kể dùng bao nhiêu), gia tốc trọng trường $g \approx 9.8$ coi như hằng, đường tiệm cận ngang của hàm khác.

### 1.1. Hàm bậc 1

$$y = ax + b$$

💡 **Là gì**: đồ thị là đường thẳng. **$a$ = hệ số góc** (slope) đo "dốc", **$b$ = tung độ gốc** (cắt trục y).

- $a > 0$: đồng biến (tăng).
- $a < 0$: nghịch biến (giảm).
- $a = 0$: hằng số (đường ngang).

**Vì sao quan trọng**: mô hình tuyến tính trong hầu hết mọi thứ — vận tốc đều, chi phí cố định, ML linear regression.

**Verify slope bằng số**: $y = 2x - 3$. Tại $x=0$ → $y=-3$; tại $x=1$ → $y=-1$. Khi x tăng 1, y tăng 2 → slope $a=2$ ✓. Cắt trục y tại $b=-3$ ✓.

**Bảng giá trị + đồ thị** $y = 2x - 3$:

| x | $-1$ | $0$ | $1$ | $2$ | $3$ |
|---|----|----|----|----|----|
| $y$ | $-5$ | $-3$ | $-1$ | $1$ | $3$ |

```
   y
 3 |              *
   |           /
 1 |        *
   |      /
 0 +----*----------- x
   |  /  1   2   3
-3 |*  (0,-3) tung độ gốc
   /
   slope = +2: x tăng 1 → y tăng 2
```

**4 ví dụ số đa dạng** (tính giá trị, slope, giao trục):

1. $y = 3x + 6$: $a=3>0$ tăng; cắt y tại $(0,6)$; cắt x tại $x=-6/3=-2$. $y(4)=18$.
2. $y = -\tfrac12 x + 2$: $a=-0.5<0$ giảm; cắt y tại $(0,2)$; cắt x tại $x=4$. $y(-2)=3$.
3. $y = 0\cdot x + 7 = 7$: hàm hằng (đường ngang), không cắt trục x. $y(99)=7$.
4. $y = x$ (với $a=1,b=0$): đường phân giác góc phần tư I–III, đi qua gốc O. $y(-5)=-5$.

⚠ **Lỗi thường gặp**: nhầm "hệ số góc" với "tung độ gốc". $a$ là **độ dốc** (x tăng 1 thì y tăng $a$); $b$ là **chỗ cắt trục y** (giá trị tại $x=0$).

❓ **Câu hỏi tự nhiên của người đọc**: *"Đường thẳng cắt trục x ở đâu?"* Giải $ax+b=0$ → $x = -b/a$. Vd $2x-3=0$ → $x = 1.5$.

🔁 **Dừng lại tự kiểm tra**: $y = -x + 4$ đồng biến hay nghịch biến? Cắt trục y ở đâu?

<details><summary>Đáp án</summary>

$a = -1 < 0$ → **nghịch biến** (giảm). Cắt trục y tại $(0, 4)$.

</details>

### 📝 Tóm tắt mục 1

- Hàm hằng $y=c$: đường ngang, $E=\{c\}$, là bậc 1 với $a=0$.
- $y = ax + b$: đường thẳng, $a$ = độ dốc, $b$ = tung độ gốc.
- $a>0$ tăng, $a<0$ giảm, $a=0$ ngang. Cắt trục x tại $x = -b/a$.

---

## 2. Hàm bậc 2 — Parabol

$$y = ax^2 + bx + c$$

💡 **Là gì**: đồ thị là **parabol**.

- **$a > 0$**: parabol "mở lên" (mặt cười).
- **$a < 0$**: mở xuống (mặt buồn).
- **Đỉnh** tại $x = -b/(2a)$, $y = c - b^2/(4a) = -\Delta/(4a)$.
- Đối xứng qua trục đứng $x = -b/(2a)$.

**Ứng dụng**: quỹ đạo ném (Lesson 01 Physics), tối ưu hóa (max/min của parabol).

**Verify đỉnh bằng số**: $y = x^2 - 4x + 3$. Đỉnh tại $x = -(-4)/(2\cdot 1) = 2$; $y(2) = 4-8+3 = -1$ → đỉnh $(2, -1)$. Liên hệ nghiệm (chỗ cắt trục x) ở [Lesson 04](../lesson-04-quadratic-equations/): $x=1, x=3$, đỉnh nằm chính giữa $(1+3)/2 = 2$ ✓.

**Bảng giá trị + đồ thị** $y = x^2 - 4x + 3$ (đỉnh $(2,-1)$, mở lên):

| x | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|----|----|----|----|----|
| $y$ | $3$ | $0$ | $-1$ | $0$ | $3$ |

```
   y
 3 *               *
   |             /
   | \         /
 0 +--*-----*-------- x
   |   \   / 3   4
-1 |    \_/  ← đỉnh (2,-1) = MIN
       trục đối xứng x = 2
```

**4 ví dụ số đa dạng** (tìm đỉnh, hướng mở, range):

1. $y = x^2$: $a=1>0$ mở lên; đỉnh $(0,0)$ là **min**; $E=[0,\infty)$.
2. $y = -2x^2 + 8x - 5$: $a=-2<0$ mở xuống; đỉnh $x=-8/(2\cdot-2)=2$, $y(2)=-8+16-5=3$ → đỉnh $(2,3)$ là **max**; $E=(-\infty,3]$.
3. $y = x^2 + 2x + 1 = (x+1)^2$: đỉnh $(-1,0)$ (nghiệm kép); $y(1)=4$.
4. $y = 3x^2 - 12$: đỉnh $(0,-12)$; cắt x tại $3x^2=12 \Rightarrow x=\pm 2$; $E=[-12,\infty)$.

⚠ **Lỗi thường gặp**: nhớ sai dấu công thức đỉnh — là $x = -b/(2a)$, với $b=-4$ thì $-b = +4$, không phải $-4$.

❓ **Câu hỏi tự nhiên của người đọc**: *"Đỉnh là max hay min?"* Nếu $a>0$ (mở lên) → đỉnh là **điểm thấp nhất (min)**; nếu $a<0$ (mở xuống) → đỉnh là **max**.

🔁 **Dừng lại tự kiểm tra**: tìm đỉnh của $y = x^2 - 6x + 5$.

<details><summary>Đáp án</summary>

$x = 6/2 = 3$, $y(3) = 9-18+5 = -4$ → đỉnh $(3, -4)$, là **min** (vì $a>0$).

</details>

### 📝 Tóm tắt mục 2

- $y = ax^2+bx+c$: parabol; $a>0$ mở lên (đỉnh = min), $a<0$ mở xuống (đỉnh = max).
- Đỉnh tại $x = -b/(2a)$, nằm giữa 2 nghiệm; trục đối xứng đứng qua đỉnh.

---

## 3. Hàm đa thức & phân thức hữu tỉ

### 3.1. Hàm đa thức (polynomial)

$$y = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0 \quad (a_n \neq 0)$$

💡 **Là gì**: tổng các lũy thừa nguyên không âm của x. **Bậc (degree)** $n$ = số mũ cao nhất. Hằng (bậc 0), bậc 1, bậc 2 ở trên đều là trường hợp riêng. Đồ thị là **đường cong mượt** (không gãy, không nhảy), lượn lên xuống **tối đa $n-1$ lần**.

- $D = \mathbb{R}$ (đa thức tính được với mọi x — không có mẫu, căn hay log).
- **Hành vi đuôi (end behavior)** quyết định bởi số hạng bậc cao nhất $a_n x^n$:
  - $n$ chẵn: hai đuôi cùng hướng (cùng lên nếu $a_n>0$, cùng xuống nếu $a_n<0$) — giống parabol.
  - $n$ lẻ: hai đuôi ngược hướng (xuống-lên nếu $a_n>0$) — giống $x^3$.

**Trực giác "đuôi đa thức"**: khi $|x|$ rất lớn, số hạng bậc cao nhất "nuốt chửng" các số hạng còn lại. Vd $y = x^3 - 100x$: tại $x=1000$, $x^3 = 10^9$ áp đảo $100x = 10^5$ → đồ thị xử sự gần như $x^3$.

**Walk-through $y = x^3 - 3x$ (bậc lẻ, lượn $2$ khúc)**:

| x | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|----|----|---|---|---|
| $y$ | $-2$ | $2$ | $0$ | $-2$ | $2$ |

```
   y
 2 |   *           *
   | /   \       /
 0 +-------*---*------- x
   |    \   /  1   2
-2 *      *
   end behavior: x→−∞ ⇒ y→−∞ ; x→+∞ ⇒ y→+∞ (đuôi ngược, bậc lẻ)
```

Đồ thị lên (tới max cục bộ tại $x=-1$), xuống (tới min cục bộ tại $x=1$), rồi lên — **2 khúc lượn** $= n-1 = 3-1$.

**4 ví dụ số đa dạng**:

1. $y = x^3$: bậc 3 lẻ, qua O, hàm lẻ; $y(2)=8$, $y(-2)=-8$. Lượn $0$ khúc (đơn điệu tăng).
2. $y = x^4 - 5x^2 + 4$: bậc 4 chẵn, hai đuôi cùng lên. Nghiệm: đặt $t=x^2$, $t^2-5t+4=0 \Rightarrow t=1,4 \Rightarrow x=\pm1,\pm2$. $y(0)=4$.
3. $y = 2x^3 - 6x^2$: bậc 3, $y(0)=0$, $y(3)=54-54=0$, $y(1)=2-6=-4$.
4. $y = -x^2 + 1$: bậc 2 (đa thức là khái niệm bao trùm); đuôi cùng xuống vì $a_n<0$; $y(0)=1$.

❓ **Câu hỏi tự nhiên của người đọc**: *"Đa thức bậc $n$ có nhiều nhất bao nhiêu nghiệm?"* Tối đa $n$ nghiệm thực (định lý cơ bản đại số). $x^3-3x = x(x^2-3)$ có $3$ nghiệm $0,\pm\sqrt3$. Có thể ít hơn: $x^2+1$ (bậc 2) có $0$ nghiệm thực.

⚠ **Lỗi thường gặp**: tưởng "bậc $n$ thì lượn $n$ khúc". Sai — lượn **tối đa $n-1$** khúc (tối đa $n-1$ điểm cực trị). $x^3$ bậc 3 nhưng lượn $0$ khúc.

🔁 **Dừng lại tự kiểm tra**: $y = x^4$ có bao nhiêu khúc lượn? Hai đuôi hướng nào?

<details><summary>Đáp án</summary>

Bậc chẵn $a_n=1>0$ → hai đuôi **cùng lên**. Đồ thị giống parabol bẹt đáy, lượn **1** khúc (chỉ một min tại O). (Tối đa $n-1=3$ nhưng thực tế chỉ 1.)

</details>

### 3.2. Phân thức hữu tỉ (rational function)

$$y = \frac{P(x)}{Q(x)} \quad (P, Q \text{ là đa thức}, \ Q \neq 0)$$

💡 **Là gì**: thương hai đa thức. Điều thú vị nhất: **tiệm cận (asymptote)** — đường mà đồ thị tiến sát nhưng không chạm.

- $D = \mathbb{R} \setminus \{x : Q(x) = 0\}$ (loại các x làm mẫu bằng 0).
- **Tiệm cận đứng (vertical asymptote)**: tại $x = x_0$ làm $Q(x_0)=0$ nhưng $P(x_0)\neq 0$ → đồ thị "bay" lên $\pm\infty$.
- **Tiệm cận ngang (horizontal asymptote)**: hành vi khi $x\to\pm\infty$, so bậc tử/mẫu:
  - bậc tử $<$ bậc mẫu → tiệm cận $y=0$.
  - bậc tử $=$ bậc mẫu → tiệm cận $y = $ (tỉ số hệ số cao nhất).
  - bậc tử $>$ bậc mẫu → không có tiệm cận ngang (có thể có tiệm cận xiên).

**Trực giác — hàm $y = 1/x$**: x càng gần 0, $1/x$ càng to khủng (tiệm cận đứng $x=0$); x càng lớn, $1/x$ càng về 0 (tiệm cận ngang $y=0$). Như "chia một cái bánh cho $x$ người": ít người → phần to; rất đông → phần bé tí.

**Walk-through $y = 1/x$**:

| x | $-2$ | $-0.5$ | $0.5$ | $1$ | $2$ |
|---|----|----|----|---|---|
| $y$ | $-0.5$ | $-2$ | $2$ | $1$ | $0.5$ |

```
        y |   |
          |   |  * (0.5, 2)
        1 +   *  (1,1)
          |   | *_ (2, 0.5)
   ───────+───+────────── x  (tiệm cận ngang y=0)
        * |   |
   (−1,−1)|   |
          |   |  tiệm cận đứng x=0
```

Hai nhánh: x>0 ở góc phần tư I, x<0 ở góc III. Đây là **hàm lẻ** ($1/(-x) = -1/x$).

**4 ví dụ số đa dạng** (domain + tiệm cận):

1. $y = \dfrac{1}{x-2}$: $D=\mathbb{R}\setminus\{2\}$; tiệm cận đứng $x=2$, ngang $y=0$. $y(3)=1$, $y(1)=-1$.
2. $y = \dfrac{2x+1}{x-3}$: $D=\mathbb{R}\setminus\{3\}$; bậc tử = bậc mẫu = 1 → tiệm cận ngang $y=2/1=2$; đứng $x=3$. $y(0)=-1/3$.
3. $y = \dfrac{x}{x^2-1}$: $D=\mathbb{R}\setminus\{-1,1\}$; hai tiệm cận đứng $x=\pm1$; bậc tử < mẫu → ngang $y=0$.
4. $y = \dfrac{x^2}{x^2+1}$: $D=\mathbb{R}$ (mẫu $>0$ luôn); tiệm cận ngang $y=1$; $E=[0,1)$. $y(0)=0$, $y(1)=0.5$.

⚠ **Lỗi thường gặp**: tưởng "đồ thị không bao giờ cắt tiệm cận ngang". Sai — tiệm cận ngang nói về **đuôi** ($x\to\pm\infty$); ở giữa đồ thị có thể cắt qua. Vd $y=x/(x^2+1)$ cắt $y=0$ tại $x=0$. (Tiệm cận **đứng** thì thật sự không bao giờ chạm.)

🔁 **Dừng lại tự kiểm tra**: tìm domain và tiệm cận đứng của $y = \dfrac{x+1}{x^2-9}$.

<details><summary>Đáp án</summary>

$x^2-9=0 \Rightarrow x=\pm3$ → $D=\mathbb{R}\setminus\{-3,3\}$. Tiệm cận đứng tại $x=-3$ và $x=3$ (tử khác 0 tại đó). Bậc tử < mẫu → tiệm cận ngang $y=0$.

</details>

### 📝 Tóm tắt mục 3

- Đa thức bậc $n$: $D=\mathbb{R}$, lượn **tối đa $n-1$** khúc; đuôi quyết định bởi $a_n x^n$ (chẵn cùng hướng, lẻ ngược hướng); tối đa $n$ nghiệm.
- Phân thức $P/Q$: loại x làm $Q=0$; **tiệm cận đứng** ở nghiệm mẫu, **tiệm cận ngang** so bậc tử/mẫu.
- $y=1/x$ là nguyên mẫu: lẻ, hai nhánh, tiệm cận $x=0$ và $y=0$.

---

## 4. Hàm mũ — Tăng trưởng cấp số nhân

$$y = a^x \quad (a > 0, a \neq 1)$$

💡 **Là gì**: x tăng đều → y tăng theo **cấp số nhân**.

- $a > 1$: tăng (y tăng nhanh khi x tăng).
- $0 < a < 1$: giảm.
- $y > 0$ luôn (đồ thị nằm trên trục x).
- Cắt trục y tại $(0, 1)$ (vì $a^0 = 1$).

**Cơ số phổ biến**: $e \approx 2.718$. Hàm $e^x$ là hàm "đẹp nhất" — đạo hàm = chính nó.

**Ứng dụng**: dân số, lãi kép, phóng xạ, vi khuẩn nhân đôi.

**Verify "cấp số nhân" bằng số**: $y = 2^x$. $y(0)=1, y(1)=2, y(2)=4, y(3)=8$ — mỗi bước x tăng 1, y **nhân đôi** (không phải cộng). So với hàm bậc 1 cộng đều, mũ nhân đều.

**Bảng giá trị + đồ thị** $y = 2^x$ (tiệm cận ngang $y=0$ bên trái):

| x | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
|---|----|----|---|---|---|---|
| $y$ | $0.25$ | $0.5$ | $1$ | $2$ | $4$ | $8$ |

```
   y
 8 |              *
   |             /
 4 |          *
   |        /
 2 |     *
 1 |  *
 0 +__*___________ x   (tiệm cận y=0, không bao giờ chạm)
   -2 -1  0  1  2  3
```

**4 ví dụ số đa dạng** (tính giá trị, tăng/giảm):

1. $y = 2^x$: $a=2>1$ tăng; $y(10)=1024$, $y(-3)=1/8$.
2. $y = (1/2)^x = 2^{-x}$: $0<a<1$ **giảm**; $y(0)=1$, $y(1)=0.5$, $y(-2)=4$. Gương của $2^x$ qua trục y.
3. $y = e^x$ ($e\approx2.718$): $y(0)=1$, $y(1)\approx2.718$, $y(2)\approx7.389$.
4. $y = 10^x$: $y(0)=1$, $y(2)=100$, $y(-1)=0.1$ — cơ số 10 dùng cho thang log thập phân.

So sánh **tốc độ** $2^x$ vs $x^2$: tại $x=2$ bằng nhau (4=4); $x=4$: $2^4=16=4^2$; $x=5$: $2^5=32>25$; từ đó mũ vượt hẳn và không bao giờ thua lại.

⚠ **Lỗi thường gặp**: lẫn $2^x$ (hàm mũ — biến ở **số mũ**) với $x^2$ (hàm lũy thừa — biến ở **cơ số**). $2^3=8$ nhưng $3^2=9$ — khác nhau, và tốc độ tăng cũng khác hẳn khi x lớn.

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao $a^x > 0$ luôn, đồ thị không chạm trục x?"* Vì nhân số dương $a$ với chính nó (kể cả mũ âm = nghịch đảo) **không bao giờ ra 0 hay âm**. $2^{-10} = 1/1024$ rất nhỏ nhưng vẫn dương → đồ thị tiệm cận trục x chứ không cắt.

🔁 **Dừng lại tự kiểm tra**: $y = 3^x$, tính $y(0), y(2), y(-1)$.

<details><summary>Đáp án</summary>

$y(0)=1$, $y(2)=9$, $y(-1)=1/3$.

</details>

### 📝 Tóm tắt mục 4

- $y = a^x$ ($a>0, a\neq 1$): x tăng đều → y **nhân** đều (cấp số nhân).
- $a>1$ tăng, $0<a<1$ giảm; $y>0$ luôn, cắt trục y tại $(0,1)$; tiệm cận ngang $y=0$.
- Phân biệt với $x^n$ (biến ở cơ số, không phải số mũ).

---

## 5. Hàm log — Hàm ngược của mũ

$$y = \log_a(x)$$

💡 **Là gì**: hàm ngược của $y = a^x$. "log mạnh thế nào để ra x?".

- $D = (0, +\infty)$ (x phải dương).
- $E = \mathbb{R}$.
- $a > 1$: log tăng (chậm).
- Cắt trục x tại $(1, 0)$ (vì $\log_a(1) = 0$).
- **Đối xứng với $a^x$ qua đường $y = x$** (mọi cặp hàm ngược).

**Cơ số phổ biến**: $\ln$ (cơ số $e$), $\log_{10}$, $\log_2$.

**Ứng dụng**: đo "độ lớn" (decibel, Richter, pH), entropy ML, complexity $O(\log n)$.

**Verify đối xứng qua y=x bằng số**: hàm mũ $2^3 = 8$ ↔ điểm $(3, 8)$. Hàm log ngược: $\log_2(8) = 3$ ↔ điểm $(8, 3)$. Hai điểm $(3,8)$ và $(8,3)$ đối xứng nhau qua đường $y=x$ ✓ — đó là quan hệ hàm ngược.

**Bảng giá trị + đồ thị** $y = \log_2(x)$ (tiệm cận đứng $x=0$):

| x | $0.25$ | $0.5$ | $1$ | $2$ | $4$ | $8$ |
|---|----|----|---|---|---|---|
| $y$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |

```
   y |        tiệm cận đứng x=0
 3 |   |              ____*
 2 |   |        __*---
 1 |   |   _*--
 0 +---|-*---------------- x   cắt trục x tại (1,0)
   |   *  1  2   4      8
-1 | *|
-2 *  |
```

So với $2^x$ ở mục 4: bảng này chính là bảng của $2^x$ **đổi chỗ cột x↔y** — minh chứng quan hệ hàm ngược.

**4 ví dụ số đa dạng** (tính giá trị, domain):

1. $y=\log_2 x$: $y(1)=0$, $y(8)=3$, $y(1/4)=-2$, $y(32)=5$.
2. $y=\log_{10} x$: $y(1)=0$, $y(100)=2$, $y(0.001)=-3$ — mỗi lần x ×10 thì y +1.
3. $y=\ln x$ (cơ số $e$): $y(1)=0$, $y(e)=1$, $y(e^2)=2$, $y(1/e)=-1$.
4. $y=\log_2(x-3)$: $D=(3,\infty)$ (cần $x-3>0$); $y(4)=0$, $y(7)=2$, $y(5)=1$.

⚠ **Lỗi thường gặp**: quên điều kiện đối số $> 0$. $\log_a(x)$ chỉ định nghĩa với $x > 0$ (xem [Lesson 06](../lesson-06-powers-roots-logs/)); $\log(0)$ và $\log(\text{số âm})$ vô nghĩa trong $\mathbb{R}$.

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao log tăng 'chậm'?"* Vì để $y$ tăng thêm 1, $x$ phải **nhân** thêm $a$ lần. $\log_{10}$: từ $y=2$ lên $y=3$, x phải nhảy từ 100 lên 1000. x tăng gấp 10 mà y chỉ +1 → cảm giác "chậm".

🔁 **Dừng lại tự kiểm tra**: $y = \log_2(x)$, tính $y(1), y(16), y(1/2)$.

<details><summary>Đáp án</summary>

$y(1)=0$, $y(16)=4$, $y(1/2)=-1$.

</details>

### 📝 Tóm tắt mục 5

- $y = \log_a(x)$: hàm ngược của $a^x$, đối xứng qua $y=x$.
- $D = (0,\infty)$, cắt trục x tại $(1,0)$; tăng **chậm** (x nhân a thì y chỉ +1); tiệm cận đứng $x=0$.
- Đối số phải $> 0$.

---

## 6. Hàm trị tuyệt đối & hàm sàn/trần

### 6.1. Hàm trị tuyệt đối $y = |x|$

$$|x| = \begin{cases} x & \text{nếu } x \ge 0 \\ -x & \text{nếu } x < 0 \end{cases}$$

💡 **Là gì**: "khoảng cách từ x tới 0" — luôn $\ge 0$. Đồ thị hình **chữ V**, đỉnh tại gốc O, hai cạnh dốc $\pm1$. Đây là hàm từng khúc (piecewise, xem [Lesson 07](../lesson-07-functions-intro/)) nhưng quan trọng đủ để đứng riêng.

- $D=\mathbb{R}$, $E=[0,\infty)$.
- **Hàm chẵn**: $|-x|=|x|$ → đối xứng trục y.
- Nghịch biến trên $(-\infty,0]$, đồng biến trên $[0,\infty)$ — "gãy" tại O (không trơn).

```
   y
 2 \           /
   | \       /
 1 |   \   /
   |     \ /
 0 +------V------- x   đỉnh (0,0)
  -2 -1   0  1  2
```

**4 ví dụ số**: $|{-5}|=5$, $|3|=3$, $|0|=0$, $|{-0.7}|=0.7$. Với $y=|x-2|$ (V dịch sang phải 2): $y(2)=0$, $y(5)=3$, $y(0)=2$.

**Dùng ở đâu**: khoảng cách $|a-b|$, sai số tuyệt đối, hàm mất mát L1 trong ML, biên độ dao động.

### 6.2. Hàm sàn $\lfloor x\rfloor$ và trần $\lceil x\rceil$

💡 **Là gì**: **sàn (floor)** $\lfloor x\rfloor$ = số nguyên lớn nhất $\le x$ ("làm tròn xuống"); **trần (ceiling)** $\lceil x\rceil$ = số nguyên nhỏ nhất $\ge x$ ("làm tròn lên"). Đồ thị hình **bậc thang** — nhảy nguyên, đi ngang giữa các số nguyên.

- $D=\mathbb{R}$, $E=\mathbb{Z}$ (chỉ ra số nguyên).
- Không liên tục: "nhảy" 1 đơn vị tại mỗi số nguyên.

```
   ⌊x⌋ (sàn)
 2 |        ___o
   |    ___o
 1 |___o
   o
 0 +---+---+---+--- x
   0   1   2   3
   (o = không lấy điểm đó, ─ = đoạn ngang lấy)
```

**4 ví dụ số** (chú ý số âm — bẫy lớn):

| x | $\lfloor x\rfloor$ | $\lceil x\rceil$ |
|---|----|----|
| $2.3$ | $2$ | $3$ |
| $2.0$ | $2$ | $2$ |
| $-1.2$ | $-2$ | $-1$ |
| $-0.5$ | $-1$ | $0$ |

⚠ **Lỗi thường gặp**: với số âm, "làm tròn xuống" nghĩa là về phía $-\infty$, không phải "bỏ phần thập phân". $\lfloor -1.2\rfloor = -2$ (KHÔNG phải $-1$). "Bỏ phần thập phân" là phép **truncate** ($-1$), khác floor.

**Dùng ở đâu**: chia trang ($\lceil n/k\rceil$ trang cho n mục, k mục/trang), giá cước bậc thang, lập chỉ mục mảng, phân ô lưới.

🔁 **Dừng lại tự kiểm tra**: tính $\lfloor 3.9\rfloor$, $\lceil 3.1\rceil$, $\lfloor -2.5\rfloor$, $|{-4}|+|3|$.

<details><summary>Đáp án</summary>

$\lfloor 3.9\rfloor=3$, $\lceil 3.1\rceil=4$, $\lfloor -2.5\rfloor=-3$ (về phía $-\infty$), $|{-4}|+|3|=4+3=7$.

</details>

### 📝 Tóm tắt mục 6

- $|x|$: chữ V, đỉnh O, $E=[0,\infty)$, hàm chẵn — đo khoảng cách/sai số.
- $\lfloor x\rfloor$/$\lceil x\rceil$: bậc thang, $E=\mathbb{Z}$; số âm floor về $-\infty$ (bẫy).

---

## 7. Biến đổi đồ thị — dịch, co giãn, lật

💡 **Là gì**: từ một đồ thị "gốc" $y=f(x)$ đã biết, tạo đồ thị mới bằng cách **thêm/nhân hằng số** vào x hoặc y. Học một lần, áp cho mọi họ hàm ở trên — đỡ phải dựng bảng giá trị lại từ đầu.

### 7.1. Bốn phép biến đổi cơ bản

| Biến đổi | Tác dụng lên đồ thị | Ghi nhớ |
|----------|---------------------|---------|
| $f(x)+k$ | dịch **lên** $k$ (nếu $k>0$) | cộng *ngoài* → dọc, đúng chiều trực giác |
| $f(x-h)$ | dịch **sang phải** $h$ (nếu $h>0$) | trừ *trong* → ngang, **ngược** trực giác |
| $a\,f(x)$ | co giãn **dọc** hệ số $a$ ($a>1$ kéo cao, $0<a<1$ ép dẹt) | nhân ngoài |
| $f(-x)$ | **lật qua trục y** (gương trái-phải) | đảo dấu trong |
| $-f(x)$ | **lật qua trục x** (gương trên-dưới) | đảo dấu ngoài |

⚠ **Lỗi #1 — dịch trái/phải ngược dấu**: $f(x-h)$ dịch **sang phải** $h$ (không phải trái). Trực giác: để điểm mới đạt cùng giá trị, x phải *lớn hơn* $h$ → đồ thị trượt sang phải. Verify $f(x)=x^2$, $f(x-3)=(x-3)^2$: đỉnh gốc tại $x=0$, đỉnh mới tại $x=3$ (sang **phải** 3) ✓. Ngược lại $f(x+2)=(x+2)^2$ có đỉnh tại $x=-2$ (sang **trái**).

### 7.2. Walk-through từng bước $f(x)=x^2 \to (x-3)^2+2$

Áp dụng lần lượt: trừ trong (dịch phải 3), cộng ngoài (dịch lên 2).

| x | $x^2$ (gốc) | $(x-3)^2$ (phải 3) | $(x-3)^2+2$ (lên 2) |
|---|----|----|----|
| $0$ | $0$ | $9$ | $11$ |
| $3$ | $9$ | $0$ | $2$ |
| $4$ | $16$ | $1$ | $3$ |

Đỉnh dời từ $(0,0) \to (3,0) \to (3,2)$. Tổng quát: $y=(x-h)^2+k$ là parabol đỉnh $(h,k)$ — đây là **dạng đỉnh** của hàm bậc 2 (liên hệ [Lesson 04](../lesson-04-quadratic-equations/)).

### 7.3. Bốn ví dụ biến đổi đa họ hàm

**Ví dụ 1 — dịch ngang+dọc** ($f(x)=|x| \to |x+1|-3$): trừ trong là $x-(-1)$ → dịch **trái** 1; cộng ngoài $-3$ → dịch **xuống** 3. Đỉnh V dời $(0,0)\to(-1,-3)$. Kiểm tra $x=-1$: $|0|-3=-3$ ✓.

**Ví dụ 2 — co giãn dọc** ($f(x)=x^2 \to 3x^2$ và $\to \tfrac12 x^2$): $3x^2$ tại $x=2$ cho $12$ (cao gấp 3 so với $x^2=4$) → parabol **hẹp/dốc** hơn. $\tfrac12 x^2$ tại $x=2$ cho $2$ → **bẹt** hơn.

**Ví dụ 3 — lật qua trục x** ($f(x)=2^x \to -2^x$): mọi giá trị đổi dấu. $-2^0=-1$, $-2^2=-4$. Đồ thị mũ tăng lật thành cong **đi xuống dưới** trục x, tiệm cận $y=0$ từ phía dưới.

**Ví dụ 4 — lật qua trục y** ($f(x)=\ln x \to \ln(-x)$): $D$ đổi từ $(0,\infty)$ thành $(-\infty,0)$ (cần $-x>0$). $\ln(-x)$ tại $x=-1$ cho $0$, tại $x=-e$ cho $1$. Đồ thị log soi gương sang nửa trái.

❓ **Câu hỏi tự nhiên của người đọc**: *"Khi vừa dịch vừa co giãn, làm theo thứ tự nào?"* Với $y=a\,f(x-h)+k$: làm **trong ra ngoài** — dịch ngang $h$, rồi co giãn dọc $a$ (và lật nếu $a<0$), cuối cùng dịch dọc $k$. Đổi thứ tự co giãn và dịch dọc cho kết quả khác.

🔁 **Dừng lại tự kiểm tra**: đồ thị $y=(x+2)^2-1$ là parabol đỉnh ở đâu, mở hướng nào? Còn $y=-(x-1)^2$?

<details><summary>Đáp án</summary>

$(x+2)^2-1$: dịch trái 2, xuống 1 → đỉnh $(-2,-1)$, mở **lên** ($a=1>0$). $-(x-1)^2$: dịch phải 1, lật trục x → đỉnh $(1,0)$, mở **xuống**.

</details>

### 📝 Tóm tắt mục 7

- $f(x)+k$: dọc lên $k$; $f(x-h)$: ngang **phải** $h$ (ngược trực giác — bẫy).
- $a\,f(x)$: co giãn dọc; $f(-x)$ lật trục y; $-f(x)$ lật trục x.
- $y=(x-h)^2+k$ = parabol đỉnh $(h,k)$; thứ tự áp: trong→ngoài.

---

## 8. Bảng tổng hợp các hàm sơ cấp

| Hàm | Đồ thị | D | E | Tính chất nổi bật |
|-----|--------|---|---|-------------------|
| Hằng $y=c$ | Đường ngang | $\mathbb{R}$ | $\{c\}$ | Phẳng; chẵn |
| Bậc 1 $y=ax+b$ | Đường thẳng | $\mathbb{R}$ | $\mathbb{R}$ ($a\neq0$) | Slope $a$; tăng $a>0$ |
| Bậc 2 $y=ax^2+bx+c$ | Parabol | $\mathbb{R}$ | $[y_{min},\infty)$ / $(-\infty,y_{max}]$ | Đỉnh $x=-b/(2a)$ |
| Đa thức bậc $n$ | Cong mượt | $\mathbb{R}$ | tùy | Lượn $\le n-1$ khúc; $\le n$ nghiệm |
| Phân thức $1/x$ | 2 nhánh | $\mathbb{R}\setminus\{0\}$ | $\mathbb{R}\setminus\{0\}$ | Tiệm cận $x=0$, $y=0$; lẻ |
| Mũ $y=a^x$ | Cong bùng nổ | $\mathbb{R}$ | $(0,\infty)$ | Qua $(0,1)$; tiệm cận $y=0$; tăng $a>1$ |
| Log $y=\log_a x$ | Cong chậm | $(0,\infty)$ | $\mathbb{R}$ | Qua $(1,0)$; tiệm cận $x=0$; ngược của $a^x$ |
| Trị tuyệt đối $y=|x|$ | Chữ V | $\mathbb{R}$ | $[0,\infty)$ | Đỉnh O; chẵn; gãy tại 0 |
| Sàn $y=\lfloor x\rfloor$ | Bậc thang | $\mathbb{R}$ | $\mathbb{Z}$ | Làm tròn xuống; không liên tục |

**Thứ tự tăng trưởng khi $x$ lớn** (rất quan trọng cho độ phức tạp thuật toán):

$$\log_a x \ \ll\ x \ \ll\ x^2 \ \ll\ x^n \ \ll\ a^x \quad (a>1, n\ge 1)$$

Verify tại $x=10$: $\log_2 10\approx3.3 < 10 < 100 < 1000\,(x^3) < 1024\,(2^{10})$. Đây là vì sao $O(\log n)$ "tốt nhất" và $O(2^n)$ "không xài được" (liên hệ [Lesson 07](../lesson-07-functions-intro/) phần ML, và DataStructures).

---

## 9. Bài tập

### Bài tập

**Bài 1**: Đường thẳng $y = 2x - 3$. Tính y khi $x = 5$. Cắt trục x tại đâu?

**Bài 2**: Parabol $y = x^2 - 4x + 3$. Tìm đỉnh.

**Bài 3**: $y = 2^x$. Tính $y(0), y(3), y(-2)$.

**Bài 4**: $y = \log_2(x)$. Tính $y(1), y(8), y(1/4)$.

**Bài 5**: Vẽ phác họa các hàm: $y = x$, $y = x^2$, $y = e^x$, $y = \ln(x)$. Nhận xét tăng trưởng.

**Bài 6**: Cho $y = \dfrac{x+1}{x-2}$. Tìm domain, tiệm cận đứng và tiệm cận ngang. Tính $y(0)$.

**Bài 7**: Đa thức $y = x^3 - 4x$. Tìm các nghiệm và số khúc lượn tối đa.

**Bài 8**: Tính $\lfloor 4.7\rfloor$, $\lceil 4.2\rceil$, $\lfloor -3.1\rfloor$, $|{-6}|$, $|2-9|$.

**Bài 9**: Đồ thị $y = |x-3|+1$ là chữ V đỉnh ở đâu? Tính $y(3)$, $y(0)$, $y(6)$.

**Bài 10**: Mô tả biến đổi từ $y=x^2$ để được $y=2(x+1)^2-4$. Tìm đỉnh.

**Bài 11**: Bài toán quỹ đạo ném (ứng dụng parabol): độ cao $h(t) = -5t^2 + 20t$ (mét, t giây). Vật đạt độ cao cực đại bao nhiêu, tại thời điểm nào? Khi nào chạm đất?

**Bài 12**: Bài toán phân rã (ứng dụng mũ): khối lượng chất phóng xạ $m(t) = 100\cdot(0.5)^{t/3}$ (gam, t giờ). Tính $m(0)$, $m(3)$, $m(6)$. Sau bao lâu còn 12.5g?

### Lời giải

**Bài 1**: $y(5) = 10 - 3 = $ **7**. Cắt trục x: $y = 0 \to 2x = 3 \to x = $ **3/2**.

**Bài 2**: Đỉnh tại $x = 4/2 = 2$. $y(2) = 4 - 8 + 3 = -1$. → đỉnh **$(2, -1)$**.

**Bài 3**: $y(0) = 1$, $y(3) = 8$, $y(-2) = 1/4$.

**Bài 4**: $y(1) = 0$, $y(8) = 3$, $y(1/4) = -2$.

**Bài 5**: 
- $y = x$: đường thẳng, slope 1.
- $y = x^2$: parabol mở lên, đỉnh O.
- $y = e^x$: tăng RẤT nhanh.
- $y = \ln(x)$: tăng RẤT chậm.

Thứ tự **tăng trưởng** khi x lớn: $\ln(x) \ll x \ll x^2 \ll e^x$. Đó là tại sao trong CS, thuật toán $O(\log n)$ "tốt nhất", $O(n^2)$ "kém", $O(2^n)$ "không dùng được".

**Bài 6**: Domain: mẫu $x-2\neq0 \Rightarrow x\neq2$ → **$D=\mathbb{R}\setminus\{2\}$**. Tiệm cận đứng **$x=2$** (mẫu = 0, tử $\neq0$ tại đó). Bậc tử = bậc mẫu = 1, tỉ số hệ số cao nhất $1/1$ → tiệm cận ngang **$y=1$**. $y(0)=\dfrac{0+1}{0-2}=-\dfrac12$.

**Bài 7**: $x^3-4x = x(x^2-4) = x(x-2)(x+2)$ → nghiệm **$x=0, 2, -2$** (3 nghiệm, đúng bằng bậc). Bậc 3 → lượn **tối đa $3-1=2$** khúc. Verify: $y(1)=1-4=-3$, $y(-1)=-1+4=3$ → có lên xuống thật.

**Bài 8**: $\lfloor 4.7\rfloor=4$; $\lceil 4.2\rceil=5$; $\lfloor -3.1\rfloor=-4$ (về phía $-\infty$, KHÔNG phải $-3$); $|{-6}|=6$; $|2-9|=|-7|=7$.

**Bài 9**: $|x-3|+1$ = chữ V của $|x|$ dịch **phải 3, lên 1** → đỉnh **$(3,1)$**. $y(3)=|0|+1=1$; $y(0)=|-3|+1=4$; $y(6)=|3|+1=4$ (đối xứng quanh $x=3$ ✓).

**Bài 10**: Từ $x^2$: (1) trừ trong $x-(-1)$ → dịch **trái 1**; (2) nhân ngoài 2 → co giãn dọc, parabol **hẹp hơn** (dốc gấp đôi); (3) cộng ngoài $-4$ → dịch **xuống 4**. Đỉnh dời $(0,0)\to(-1,0)\to(-1,-4)$ → đỉnh **$(-1,-4)$**, mở lên. Kiểm tra $x=-1$: $2\cdot0-4=-4$ ✓.

**Bài 11** (parabol): $h(t)=-5t^2+20t$, $a=-5<0$ mở xuống → đỉnh là **max**. Đỉnh tại $t=-b/(2a)=-20/(2\cdot-5)=2$ giây. $h(2)=-5\cdot4+40=20$ m → **cao nhất 20 m tại t=2 s**. Chạm đất khi $h=0$: $-5t^2+20t=0 \Rightarrow -5t(t-4)=0 \Rightarrow t=0$ (lúc ném) hoặc **$t=4$ giây** (rơi xuống). Đỉnh nằm giữa $0$ và $4$ tại $t=2$ ✓.

**Bài 12** (mũ phân rã): $m(0)=100\cdot0.5^0=100$ g. $m(3)=100\cdot0.5^1=50$ g. $m(6)=100\cdot0.5^2=25$ g — cứ **3 giờ giảm một nửa** (chu kì bán rã = 3 h, là số $3$ ở mẫu của $t/3$). Còn $12.5$ g: $12.5=100\cdot0.5^{t/3} \Rightarrow 0.5^{t/3}=0.125=0.5^3 \Rightarrow t/3=3 \Rightarrow$ **$t=9$ giờ** (qua 3 chu kì: $100\to50\to25\to12.5$).

---

## 10. 🎉 HOÀN THÀNH TIER 1 MATH (8/8)!

Tiếp theo: **Tier 2 — Geometry** (chưa triển khai).

## 📝 Tổng kết Tier 1

Sau 8 lesson, bạn nắm được:
1. **Hệ số học** ($\mathbb{N} \to \mathbb{Z} \to \mathbb{Q} \to \mathbb{R}$).
2. **Biểu thức đại số** (đa thức, hằng đẳng thức, phân tích).
3. **PT bậc 1** + hệ 2 ẩn.
4. **PT bậc 2** ($\Delta$, Viete).
5. **Bất phương trình** (xét dấu tam thức).
6. **Lũy thừa, căn, log**.
7. **Hàm số** (domain, range, hàm hợp).
8. **Hàm sơ cấp** (hằng, bậc 1, bậc 2, đa thức, phân thức, mũ, log, trị tuyệt đối, sàn/trần) + biến đổi đồ thị.

🎉 Đây là **nền tảng đại số phổ thông** đã hoàn chỉnh.
