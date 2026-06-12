// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-02-empirical-curve-fitting/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Mô hình từ dữ liệu (Hồi quy bình phương tối thiểu)

## Mục tiêu

- Khi *chưa biết* quy luật, dựng mô hình bằng cách **khớp với dữ liệu** đo được.
- Phân biệt **nội suy (interpolation)** và **hồi quy/khớp xu hướng (regression)**.
- Hiểu và áp dụng **hồi quy tuyến tính bình phương tối thiểu (least squares)**: công thức nghiệm và walk-through bằng số.
- Hiểu **vì sao bình phương** sai số (không phải trị tuyệt đối).
- Đánh giá độ khớp bằng **hệ số xác định $R^2$**; đọc **biểu đồ phần dư (residual plot)** để bắt sai dạng.
- **Tuyến tính hóa** mô hình phi tuyến (mũ qua semi-log, lũy thừa qua log–log) để fit — tổng quát hóa cách tìm hằng số k của định luật nguội Newton ở [Lesson 01](../lesson-01-modeling-cycle/).
- **Hồi quy đa thức** và **chọn mô hình** (tuyến tính / bậc 2 / mũ / lũy thừa) từ dấu hiệu trên dữ liệu.
- Tránh các cạm bẫy: **overfitting**, **ngoại suy (extrapolation)**, **outlier**, và "**$R^2$ cao $\\neq$ nhân quả**".

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/) (đặc biệt bước 5 — kiểm chứng).
- [T4 — Đạo hàm](../../04-Calculus-1var/lesson-03-derivative-definition/) (cực tiểu hóa bằng đạo hàm = 0).
- [T1 — Hệ phương trình bậc nhất](../../01-Arithmetic-Algebra/lesson-03-linear-equations/).

---

## 1. Mô hình từ dữ liệu là gì?

💡 **Trực giác / Hình dung — vẽ một đường "đi giữa" đám điểm.** Ở [Lesson 01](../lesson-01-modeling-cycle/) ta *biết trước* quy luật (định luật Newton) rồi mới tìm hằng số. Nhưng nhiều khi ta chỉ có **bảng số đo** — doanh thu theo tháng, cân nặng theo tuổi — mà *không biết* công thức nào sinh ra chúng. Mô hình từ dữ liệu đảo ngược: nhìn vào đám điểm, **vẽ một đường khớp nhất**, rồi dùng đường đó để dự đoán.

Hình dung bằng **biểu đồ tán xạ (scatter plot)** — 5 điểm "giờ ôn → điểm" của mục 3, kèm đường khớp $\\hat{y} = 0.9x + 1.3$ đi *giữa* chúng (không qua điểm nào):

\`\`\`
 điểm y
   7 |
   6 |                        ●        ← (5,6) lệch trên đường
   5 |              ●                  ← (3,5) lệch trên
   4 |        ___---⊙___---            đường khớp ŷ = 0.9x+1.3
   3 |     ●⊙---     (4,4) lệch dưới   (⊙ = điểm trên đường)
   2 |  ●⊙
   1 |⊙
   0 +--●--+----+----+----+----+→ x (giờ ôn)
     0  1    2    3    4    5
\`\`\`

Đường *không* chạm điểm nào — nó "đi giữa", cân bằng các phần dư trên/dưới. Đó chính là khác biệt cốt lõi với nội suy (mục 2).

> 📐 **Định nghĩa đầy đủ — Khớp mô hình (model fitting)**
>
> **(a) Là gì**: Cho một tập dữ liệu gồm $n$ cặp $(x_i, y_i)$, và một **họ hàm** có tham số (vd đường thẳng $y = ax + b$ với tham số $a$, $b$). Khớp mô hình = tìm bộ tham số làm hàm "gần" dữ liệu nhất theo một **tiêu chí sai số** đã chọn.
>
> **(b) Vì sao cần**: Thực tế hiếm khi cho sẵn công thức. Dữ liệu đo luôn có **nhiễu** (sai số đo, yếu tố ngẫu nhiên). Ta cần rút ra *xu hướng* ẩn dưới nhiễu để (1) dự đoán giá trị chưa đo, (2) ước lượng tham số có ý nghĩa vật lý (vd hằng số $k$), (3) kiểm tra giả thuyết "quan hệ có tuyến tính không?".
>
> **(c) Ví dụ số**: Đo chiều cao lò xo theo khối lượng treo: ($m=1$kg, $L=12$cm), (2, 14), (3, 17), (4, 18.5), (5, 21). Các điểm gần một đường thẳng nhưng không thẳng tắp (nhiễu đo). Khớp đường thẳng $L = a\\cdot m + b$ cho ta "độ giãn trên mỗi kg" $= a$, và dự đoán $L$ tại $m = 2.5$kg dù chưa đo. (Đây là định luật Hooke — xem [Physics](../../../Physics/).)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khác gì với việc tìm hằng số k ở Lesson 01?"* Ở L01 ta đã *biết* dạng hàm ($e^{-kt}$) và chỉ dùng **1 điểm** dữ liệu để chốt $k$. Ở đây ta dùng **nhiều điểm** và tìm bộ tham số khớp *tổng thể* tốt nhất — chống nhiễu tốt hơn (1 điểm có thể là điểm đo sai).
- *"Đường khớp có phải đi qua các điểm không?"* Thường **không**. Vì dữ liệu có nhiễu, ép đường qua mọi điểm (nội suy) lại bám cả nhiễu → xem mục 2.

📝 **Tóm tắt mục 1**

- Khớp mô hình = tìm tham số của một họ hàm sao cho gần dữ liệu nhất theo tiêu chí sai số.
- Cần vì dữ liệu thực có nhiễu; ta muốn rút xu hướng để dự đoán và ước lượng tham số.
- Dùng *nhiều* điểm → bền với nhiễu hơn cách chốt tham số bằng 1 điểm ở L01.

---

## 2. Nội suy vs khớp xu hướng

💡 **Trực giác / Hình dung.** Có hai thái độ trước đám điểm:
- **Nội suy (interpolation)**: "dữ liệu là chân lý" → vẽ đường **đi qua đúng mọi điểm**.
- **Hồi quy (regression)**: "dữ liệu có nhiễu" → vẽ đường **đi giữa**, chấp nhận lệch khỏi từng điểm để bám *xu hướng*.

| | Nội suy | Hồi quy (khớp xu hướng) |
|---|---|---|
| **Đường có qua mọi điểm?** | Có | Không (cố ý) |
| **Giả định về dữ liệu** | Chính xác, không nhiễu | Có nhiễu ngẫu nhiên |
| **Số tham số** | Bằng số điểm (đa thức bậc $n-1$ cho $n$ điểm) | Ít (vd 2 cho đường thẳng) |
| **Dùng khi** | Số liệu chính xác (bảng tra, tọa độ thiết kế) | Số liệu đo có sai số (đa số thực tế) |

⚠ **Lỗi thường gặp — dùng đa thức bậc cao để "khớp hoàn hảo".** Ép đa thức bậc $n-1$ qua $n$ điểm cho sai số 0 *trên dữ liệu đã có*, nhưng giữa các điểm nó **dao động dữ dội** (hiện tượng Runge) và dự đoán ngoài vùng dữ liệu thì *thảm họa*. Phản ví dụ: 10 điểm gần như thẳng hàng + 1 chút nhiễu → đa thức bậc 9 qua hết 10 điểm sẽ uốn lượn điên loạn, còn đường thẳng hồi quy thì bám xu hướng đẹp. **Khớp hoàn hảo dữ liệu cũ ≠ dự đoán tốt dữ liệu mới** — đây là mầm mống của *overfitting* (mục 7).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vậy nội suy luôn tệ?"* Không. Khi dữ liệu *thật sự chính xác* (vd tọa độ điểm điều khiển trong đồ họa, bảng giá trị hàm toán) thì nội suy đúng việc. Chỉ tệ khi dữ liệu có nhiễu mà ta lại ép đi qua hết.
- *"Làm sao biết nên nội suy hay hồi quy?"* Hỏi: *dữ liệu của tôi có nhiễu không?* Đo vật lý/khảo sát → có nhiễu → hồi quy. Giá trị định nghĩa/thiết kế chính xác → nội suy.

🔁 **Dừng lại tự kiểm tra**

1. Bạn có 50 điểm đo nhiệt độ ngoài trời theo giờ (có sai số ±0.5°C). Nên nội suy đa thức bậc 49 hay hồi quy? Vì sao?

<details><summary>Đáp án</summary>

**Hồi quy** (hoặc spline trơn), không nội suy bậc 49. Dữ liệu có nhiễu ±0.5°C; đa thức bậc 49 sẽ bám hết nhiễu và dao động hoang dã giữa các giờ, dự đoán vô nghĩa. Ta muốn *xu hướng* nhiệt độ, không phải tái tạo từng sai số đo.

</details>

📝 **Tóm tắt mục 2**

- Nội suy: qua đúng mọi điểm (giả định dữ liệu chính xác). Hồi quy: đi giữa, chấp nhận lệch (giả định có nhiễu).
- Đa thức bậc cao "khớp hoàn hảo" → dao động Runge, dự đoán tệ — khớp dữ liệu cũ ≠ dự đoán tốt.
- Đa số dữ liệu đo có nhiễu → chọn hồi quy.

---

## 3. Hồi quy tuyến tính bình phương tối thiểu

💡 **Trực giác / Hình dung.** Với mỗi đường thẳng ứng viên $\\hat{y} = ax + b$, mỗi điểm dữ liệu lệch khỏi đường một đoạn dọc gọi là **phần dư (residual)** $e_i = y_i - (ax_i + b)$. Ta muốn đường nào tổng các đoạn lệch "nhỏ nhất". Để tránh lệch âm triệt tiêu lệch dương, ta **bình phương** từng đoạn rồi cộng lại — và đi tìm $a$, $b$ cực tiểu hóa tổng đó. Hình dung: mỗi điểm nối với đường bằng một lò xo dọc; đường tối ưu là vị trí cân bằng năng lượng lò xo nhỏ nhất.

**Phần dư là đoạn DỌC, không phải khoảng cách vuông góc.** Hình dung từng lò xo dọc kéo điểm về đường:

\`\`\`
   y                              ● y_i (điểm thật)
                                  ┊  ↕ e_i = y_i − ŷ_i  (phần dư = đoạn dọc)
            ____------------------⊙ ŷ_i (trên đường khớp)
   ____-----      ŷ = ax + b
   --
   +--------------------------------→ x
                                  x_i
\`\`\`

Tổng bình phương $S = \\sum e_i^2$ chính là "tổng năng lượng lò xo" ($\\frac12 k e^2$ bỏ hằng số). Least squares = tìm đường làm tổng năng lượng đó **nhỏ nhất**. Lưu ý ta đo lệch *theo trục y* (dọc), không phải khoảng cách vuông góc tới đường — vì ta coi $x$ là đầu vào chính xác, chỉ $y$ có nhiễu. (Khi cả hai trục đều có nhiễu thì dùng "hồi quy trực giao / total least squares", một chủ đề khác.)

> 📐 **Định nghĩa đầy đủ — Phần dư (residual) và đường khớp $\\hat{y}$**
>
> **(a) Là gì**: với điểm thứ $i$, **giá trị dự đoán** $\\hat{y}_i = a x_i + b$ (đọc *"y mũ i"*) là tung độ trên đường khớp tại $x_i$; **phần dư** $e_i = y_i - \\hat{y}_i$ là chênh lệch giữa giá trị thật và giá trị dự đoán. $e_i > 0$: điểm nằm *trên* đường; $e_i < 0$: nằm *dưới*.
>
> **(b) Vì sao cần**: phần dư là "thước đo sai" của từng điểm. Mọi tiêu chí khớp ($S = \\sum e_i^2$), mọi chỉ số chất lượng ($R^2$), mọi chẩn đoán (biểu đồ phần dư ở mục 7.5) đều xây trên $e_i$. Không có khái niệm phần dư thì không định nghĩa được "khớp tốt".
>
> **(c) Ví dụ số** (dùng đường $\\hat{y} = 0.9x + 1.3$ của mục 3.1): tại $x = 3$, $\\hat{y} = 0.9\\cdot 3 + 1.3 = 4.0$ nhưng $y$ thật $= 5$ → $e = 5 - 4 = +1.0$ (trên đường); tại $x = 4$, $\\hat{y} = 4.9$ nhưng $y = 4$ → $e = -0.9$ (dưới đường); tại $x = 1$, $\\hat{y} = 2.2$, $y = 2$ → $e = -0.2$; tại $x = 5$, $\\hat{y} = 5.8$, $y = 6$ → $e = +0.2$.

**Tiêu chí bình phương tối thiểu**: chọn $a$, $b$ cực tiểu hóa
$$S(a, b) = \\sum_i e_i^2 = \\sum_i (y_i - a\\cdot x_i - b)^2$$

**Tìm cực tiểu**: cho đạo hàm riêng theo $a$ và $b$ bằng 0 (xem [T4](../../04-Calculus-1var/lesson-05-derivative-applications/) và [T6 L04](../../06-Advanced/lesson-04-multivariable-functions/)):
$$\\begin{aligned}
\\frac{\\partial S}{\\partial b} &= -2 \\sum(y_i - a\\cdot x_i - b) = 0 \\\\
\\frac{\\partial S}{\\partial a} &= -2 \\sum x_i(y_i - a\\cdot x_i - b) = 0
\\end{aligned}$$
Giải hệ 2 phương trình này (gọi là **phương trình chuẩn — normal equations**) ra công thức đóng:
$$a = \\frac{n\\cdot\\sum xy - \\sum x\\cdot\\sum y}{n\\cdot\\sum x^2 - (\\sum x)^2}, \\quad b = \\frac{\\sum y - a\\cdot\\sum x}{n} = \\bar{y} - a\\cdot\\bar{x}$$

**Giải hệ TỪNG BƯỚC (không "dễ thấy").** Khai triển hai phương trình chuẩn (chia 2 vế cho $-2$ rồi tách tổng):
$$\\begin{aligned}
\\text{(I) từ } \\partial S/\\partial b: && \\sum y_i &= a\\sum x_i + n\\,b \\\\
\\text{(II) từ } \\partial S/\\partial a: && \\sum x_i y_i &= a\\sum x_i^2 + b\\sum x_i
\\end{aligned}$$
Đây là hệ tuyến tính 2 ẩn $a, b$ (xem [T1 — Hệ phương trình bậc nhất](../../01-Arithmetic-Algebra/lesson-03-linear-equations/)). Từ (I) rút $b$:
$$b = \\frac{\\sum y - a\\sum x}{n}.$$
Thay vào (II):
$$\\begin{aligned}
\\sum xy &= a\\sum x^2 + \\frac{\\sum y - a\\sum x}{n}\\cdot\\sum x \\\\
n\\sum xy &= a\\,n\\sum x^2 + \\sum x\\sum y - a\\,(\\sum x)^2 &&(\\text{nhân cả 2 vế với } n) \\\\
n\\sum xy - \\sum x\\sum y &= a\\big(n\\sum x^2 - (\\sum x)^2\\big) &&(\\text{gom } a) \\\\
a &= \\frac{n\\sum xy - \\sum x\\sum y}{n\\sum x^2 - (\\sum x)^2}. &&\\blacksquare
\\end{aligned}$$
Mỗi bước là phép biến đổi đại số tường minh — không có bước nào bỏ qua. Có $a$ rồi thay ngược vào $b = \\bar{y} - a\\bar{x}$.

### 3.1 Walk-through bằng số

**Ngữ cảnh thực**: 5 bạn học sinh, ghi lại *số giờ ôn thi mỗi tuần* (x) và *điểm kiểm tra* (y, thang 10). Trực giác: ôn nhiều → điểm cao hơn, nhưng *có nhiễu* (bạn ôn 3 giờ được 5 điểm trội hơn xu hướng; bạn ôn 4 giờ chỉ được 4 điểm vì hôm đó mệt). Ta muốn rút *xu hướng* "mỗi giờ ôn đáng giá bao nhiêu điểm".

Dữ liệu 5 điểm (giờ, điểm): (1, 2), (2, 3), (3, 5), (4, 4), (5, 6).

**Bước 1 — tính các tổng**:

| $x_i$ (giờ) | $y_i$ (điểm) | $x_i y_i$ | $x_i^2$ |
|----|----|------|-----|
| 1 | 2 | 2 | 1 |
| 2 | 3 | 6 | 4 |
| 3 | 5 | 15 | 9 |
| 4 | 4 | 16 | 16 |
| 5 | 6 | 30 | 25 |
| **$\\sum=15$** | **$\\sum=20$** | **$\\sum=69$** | **$\\sum=55$** |

$n = 5$, $\\sum x = 15$, $\\sum y = 20$, $\\sum xy = 69$, $\\sum x^2 = 55$.

**Bước 2 — tính $a$**:
$$a = \\frac{5\\cdot 69 - 15\\cdot 20}{5\\cdot 55 - 15^2} = \\frac{345 - 300}{275 - 225} = \\frac{45}{50} = 0.9$$

**Bước 3 — tính $b$**:
$$b = \\frac{20 - 0.9\\cdot 15}{5} = \\frac{20 - 13.5}{5} = \\frac{6.5}{5} = 1.3$$

**Kết quả**: đường khớp **$\\hat{y} = 0.9x + 1.3$**.

**Diễn giải thực**: mỗi giờ ôn thêm/tuần ≈ **+0.9 điểm** (độ dốc $a$); bạn không ôn giờ nào ($x = 0$) dự kiến ≈ **1.3 điểm** (tung độ gốc $b$). Dự đoán: ôn 6 giờ → $\\hat{y} = 0.9\\cdot 6 + 1.3 = 6.7$ điểm (dù chưa ai trong nhóm ôn 6 giờ).

**Verify**: tại $\\bar{x} = 3$, đường cho $\\hat{y} = 0.9\\cdot 3 + 1.3 = 4.0 = \\bar{y}$ ✓ (đường hồi quy luôn đi qua "trọng tâm" $(\\bar{x}, \\bar{y})$ — một tính chất đẹp dùng để kiểm tra nhanh).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao đặt đạo hàm = 0 lại ra cực tiểu chứ không phải cực đại?"* Vì $S(a,b)$ là hàm bậc 2 theo $a$, $b$ với hệ số bậc hai dương ($\\sum x^2 > 0$) — một paraboloid mở lên trên, chỉ có *một* điểm dừng và đó là cực tiểu toàn cục. Không có cực đại hữu hạn ($S \\to \\infty$ khi $a, b \\to \\infty$).
- *"Mẫu số $n\\cdot\\sum x^2 - (\\sum x)^2$ có khi nào bằng 0 không?"* Bằng 0 khi mọi $x_i$ bằng nhau (mọi điểm cùng một hoành độ) — khi đó không xác định được độ dốc (đường thẳng đứng), bài toán vô nghĩa. Với $x$ phân biệt thì mẫu $> 0$.
- *"Hồi quy y theo x và x theo y có ra cùng đường không?"* **Không!** Đổi vai trò $x\\leftrightarrow y$ cho đường khác (vì ta cực tiểu lệch *dọc* theo trục $y$). Phải rõ biến nào là "đầu vào".

⚠ **Lỗi thường gặp — lẫn $\\sum x^2$ với $(\\sum x)^2$.** $\\sum x^2 =$ tổng của các bình phương (ở ví dụ: 55); $(\\sum x)^2 =$ bình phương của tổng ($15^2 = 225$). Hai số khác hẳn nhau. Lẫn chúng → sai $a$ hoàn toàn.

🔁 **Dừng lại tự kiểm tra**

1. Cho 3 điểm (0, 1), (1, 3), (2, 5). Tính a, b. (Gợi ý: các điểm thẳng hàng hoàn hảo.)

<details><summary>Đáp án</summary>

$n=3$, $\\sum x=3$, $\\sum y=9$, $\\sum xy = 0+3+10 = 13$, $\\sum x^2 = 0+1+4 = 5$.
$a = (3\\cdot 13 - 3\\cdot 9)/(3\\cdot 5 - 9) = (39-27)/(15-9) = 12/6 =$ **2**.
$b = (9 - 2\\cdot 3)/3 = 3/3 =$ **1**. → $\\hat{y} = 2x + 1$. Thẳng hàng hoàn hảo nên residual $= 0$, đường qua đúng cả 3 điểm.

</details>

### 📝 Tóm tắt mục 3

- Bình phương tối thiểu: cực tiểu $S = \\sum(y_i - ax_i - b)^2$ (tổng bình phương phần dư).
- Cho $\\frac{\\partial S}{\\partial a} = \\frac{\\partial S}{\\partial b} = 0$ → phương trình chuẩn → công thức đóng cho $a$, $b$.
- $a = (n\\sum xy - \\sum x\\sum y)/(n\\sum x^2 - (\\sum x)^2)$, $b = \\bar{y} - a\\cdot\\bar{x}$. Đường luôn qua trọng tâm $(\\bar{x}, \\bar{y})$.
- Phân biệt $\\sum x^2$ và $(\\sum x)^2$.

---

## 4. Vì sao bình phương sai số?

💡 **Trực giác.** Tại sao cực tiểu $\\sum e_i^2$ mà không phải $\\sum |e_i|$ (tổng trị tuyệt đối)? Ba lý do:

1. **Triệt tiêu dấu** mà vẫn *trơn*: bình phương biến lệch âm thành dương (như trị tuyệt đối), nhưng $x^2$ **khả vi mọi nơi** còn $|x|$ gãy tại 0. Khả vi → đặt đạo hàm = 0 → ra **công thức nghiệm đóng** đẹp (mục 3). Trị tuyệt đối không cho nghiệm đóng, phải giải lặp.
2. **Phạt mạnh điểm lệch xa**: lệch gấp đôi bị phạt gấp *bốn* ($2^2 = 4$). Mô hình "rất sợ" sai lớn → kéo đường về phía giảm các lệch lớn.
3. **Nền tảng xác suất**: nếu nhiễu tuân theo phân phối chuẩn (Gauss), thì nghiệm bình phương tối thiểu *chính là* nghiệm hợp lý cực đại (MLE) — xem [Vectors/05-Probability](../../../Vectors/). Đây là lý do sâu xa nhất.

⚠ **Lỗi thường gặp — quên rằng bình phương nhạy với outlier.** Chính ưu điểm "phạt mạnh lệch xa" trở thành nhược điểm khi có **điểm ngoại lai (outlier)** do đo sai: một điểm lệch khổng lồ kéo cả đường về phía nó. Khi nghi ngờ outlier, cân nhắc hồi quy bền vững (robust) dùng trị tuyệt đối hoặc loại outlier trước. Phản ví dụ: dữ liệu 5 điểm thẳng + 1 điểm gõ nhầm "60" thay vì "6" → đường bình phương tối thiểu nghiêng hẳn đi.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không dùng tổng lệch $\\sum e_i$ (không bình phương, không trị tuyệt đối)?"* Vì lệch âm và dương triệt tiêu nhau: một đường tệ có thể có $\\sum e_i = 0$ mà vẫn xa mọi điểm. Phải khử dấu (bình phương hoặc trị tuyệt đối).

📝 **Tóm tắt mục 4**

- Bình phương: khử dấu + khả vi → nghiệm đóng; phạt mạnh lệch xa; là MLE khi nhiễu Gauss.
- Đánh đổi: rất nhạy với outlier — một điểm sai có thể kéo lệch cả đường.

---

## 5. Hệ số xác định R²

💡 **Trực giác.** Tìm được đường khớp rồi, câu hỏi tiếp theo: *khớp tốt cỡ nào?* $R^2$ đo "đường giải thích được bao nhiêu phần biến động của dữ liệu". So sánh mô hình của ta với một mô hình ngây thơ nhất — "đoán bừa bằng trung bình $\\bar{y}$".

> 📐 **Định nghĩa đầy đủ — Hệ số xác định $R^2$**
>
> **(a) Là gì**: $R^2 = 1 - SS_{\\text{res}} / SS_{\\text{tot}}$, với $SS_{\\text{res}} = \\sum(y_i - \\hat{y}_i)^2$ (sai số *còn lại* sau khi khớp) và $SS_{\\text{tot}} = \\sum(y_i - \\bar{y})^2$ (biến động *tổng* của $y$ quanh trung bình). $R^2 \\in (-\\infty, 1]$; gần 1 = khớp tốt.
>
> **(b) Vì sao cần**: $SS_{\\text{res}}$ một mình không nói lên gì (phụ thuộc đơn vị, số điểm). $R^2$ **chuẩn hóa** nó về thang 0–1 dễ so sánh: $R^2 = 0.81$ nghĩa là đường giải thích 81% biến động của dữ liệu, 19% còn lại là nhiễu/yếu tố chưa mô hình. Cho phép so các mô hình khác nhau trên cùng dữ liệu.
>
> **(c) Ví dụ số**: Với dữ liệu mục 3 và đường $\\hat{y} = 0.9x + 1.3$:
> - Dự đoán: $\\hat{y} = 2.2, 3.1, 4.0, 4.9, 5.8$.
> - Phần dư: $-0.2, -0.1, +1.0, -0.9, +0.2$ → $SS_{\\text{res}} = 0.04+0.01+1.0+0.81+0.04 =$ **1.90**.
> - $\\bar{y} = 4$. $SS_{\\text{tot}} = (2-4)^2+(3-4)^2+(5-4)^2+(4-4)^2+(6-4)^2 = 4+1+1+0+4 =$ **10**.
> - **$R^2 = 1 - 1.90/10 = 0.81$** → số giờ ôn giải thích được **81%** chênh lệch điểm giữa các bạn; 19% còn lại do yếu tố khác (năng khiếu, may rủi đề thi).

❓ **Câu hỏi tự nhiên của người đọc**

- *"$R^2 = 1$ nghĩa là gì? $R^2 = 0$?"* $R^2 = 1$: đường qua đúng mọi điểm ($SS_{\\text{res}} = 0$), khớp hoàn hảo. $R^2 = 0$: đường khớp không tốt hơn việc đoán bừa bằng $\\bar{y}$. $R^2 < 0$: mô hình *tệ hơn* cả đoán trung bình (xảy ra nếu ép một đường xấu, không phải đường tối ưu).
- *"$R^2$ cao có nghĩa mô hình đúng?"* **Không hẳn.** $R^2$ cao chỉ nói "khớp dữ liệu hiện có". Có thể cao do overfitting (mục 7), hoặc quan hệ là giả (tương quan $\\neq$ nhân quả). $R^2$ cũng không phát hiện được dạng sai (vd dữ liệu cong mà ép đường thẳng có thể vẫn $R^2$ khá).
- *"Vì sao so với $\\bar{y}$?"* Vì $\\bar{y}$ là "dự đoán không cần x" — mô hình tệ nhất mà vẫn hợp lý. $R^2$ đo phần *cải thiện* nhờ biết x.

⚠ **Lỗi thường gặp — chỉ nhìn $R^2$ mà không vẽ đồ thị.** Bộ dữ liệu Anscombe nổi tiếng: 4 tập dữ liệu rất khác nhau (một thẳng, một cong, một có outlier) lại có *cùng* $a$, $b$, $R^2$. Luôn **vẽ điểm + đường + phần dư**, đừng tin mỗi con số $R^2$.

🔁 **Dừng lại tự kiểm tra**

1. Một mô hình cho $SS_{\\text{res}} = 2$, $SS_{\\text{tot}} = 8$. Tính $R^2$. Diễn giải.

<details><summary>Đáp án</summary>

$R^2 = 1 - 2/8 = 1 - 0.25 =$ **0.75**. Đường giải thích 75% biến động của dữ liệu; 25% còn lại chưa giải thích (nhiễu hoặc yếu tố thiếu).

</details>

### 📝 Tóm tắt mục 5

- $R^2 = 1 - SS_{\\text{res}}/SS_{\\text{tot}}$, chuẩn hóa độ khớp về thang $\\le 1$; gần 1 = tốt.
- So mô hình với "đoán bừa bằng $\\bar{y}$"; $R^2 =$ phần biến động được giải thích.
- $R^2$ cao $\\neq$ mô hình đúng (overfitting, tương quan giả, dạng sai). Luôn vẽ đồ thị (Anscombe).

---

## 6. Tuyến tính hóa mô hình phi tuyến

💡 **Trực giác.** Công thức least squares chỉ cho đường *thẳng*. Nhưng nhiều quan hệ là *mũ* hay *lũy thừa*. Mẹo: **đổi biến bằng logarit** để "duỗi thẳng" đường cong, fit tuyến tính trên biến đã đổi, rồi đổi ngược về.

**Mô hình mũ** $y = A\\cdot e^{kx}$. Lấy ln hai vế:
$$\\ln y = \\ln A + k\\cdot x$$
Đặt $Y = \\ln y$. Thì $Y = k\\cdot x + \\ln A$ — **tuyến tính** theo $x$! Fit least squares $(x, Y)$ → độ dốc $= k$, tung độ gốc $= \\ln A$ → $A = e^{\\text{tung độ gốc}}$.

### 6.1 Tổng quát hóa "tìm k" của Lesson 01

Ở [L01](../lesson-01-modeling-cycle/) ta chốt $k$ của cà phê nguội chỉ bằng *1* điểm đo. Giờ làm đúng cách với *nhiều* điểm. Đặt $u = T - T_{\\text{phòng}}$ (nhiệt độ vượt trội), mô hình $u = u_0\\cdot e^{-kt}$. Dữ liệu đo ($T_{\\text{phòng}} = 25$):

| $t$ (phút) | $T$ (°C) | $u = T-25$ | $\\ln u$ |
|----------|--------|----------|------|
| 0 | 90 | 65 | 4.174 |
| 5 | 70 | 45 | 3.807 |
| 10 | 56 | 31 | 3.434 |
| 15 | 46 | 21 | 3.045 |

Fit least squares trên $(t, \\ln u)$: độ dốc $= (n\\cdot\\sum t\\cdot\\ln u - \\sum t\\cdot\\sum \\ln u)/(n\\cdot\\sum t^2 - (\\sum t)^2)$.
- $\\sum t = 30$, $\\sum \\ln u = 14.460$, $\\sum t\\cdot\\ln u = 99.05$, $\\sum t^2 = 350$, $n = 4$.
- độ dốc $= (4\\cdot 99.05 - 30\\cdot 14.460)/(4\\cdot 350 - 30^2) = (396.2 - 433.8)/(1400 - 900) = -37.6/500 =$ **$-0.0752$**.
- Vậy **$k \\approx 0.075$ phút⁻¹** — khớp tuyệt với giá trị 0.074 tìm bằng 1 điểm ở L01, nhưng giờ dựa trên *toàn bộ* dữ liệu nên đáng tin hơn.
- Tung độ gốc $= (\\sum \\ln u - \\text{độ dốc}\\cdot\\sum t)/n = (14.460 - (-0.0752)\\cdot 30)/4 = 16.716/4 = 4.179$ → $A = e^{4.179} \\approx$ **65.3 ≈ 65** ✓ (đúng nhiệt độ vượt trội ban đầu $u_0 = 90-25 = 65$).

### 6.2 Walk-through 2 — mũ tăng trưởng (vi khuẩn)

Nuôi vi khuẩn, đếm số tế bào (triệu) theo giờ. Nghi mũ $N = A\\cdot e^{kx}$ (tăng trưởng):

| $x$ (giờ) | $N$ (triệu) | $Y = \\ln N$ |
|---|---|---|
| 0 | 2.0 | 0.693 |
| 1 | 3.2 | 1.163 |
| 2 | 5.4 | 1.686 |
| 3 | 8.5 | 2.140 |

Fit least squares trên $(x, Y)$. Tính các tổng: $n = 4$, $\\sum x = 0+1+2+3 = 6$, $\\sum Y = 0.693+1.163+1.686+2.140 = 5.682$, $\\sum xY = 0\\cdot0.693 + 1\\cdot1.163 + 2\\cdot1.686 + 3\\cdot2.140 = 0 + 1.163 + 3.372 + 6.420 = 10.955$, $\\sum x^2 = 0+1+4+9 = 14$.

**Độ dốc** (chính là $k$):
$$k = \\frac{n\\sum xY - \\sum x\\sum Y}{n\\sum x^2 - (\\sum x)^2} = \\frac{4\\cdot 10.955 - 6\\cdot 5.682}{4\\cdot 14 - 6^2} = \\frac{43.82 - 34.092}{56 - 36} = \\frac{9.728}{20} = \\mathbf{0.486}.$$

**Tung độ gốc** ($= \\ln A$):
$$\\ln A = \\frac{\\sum Y - k\\sum x}{n} = \\frac{5.682 - 0.486\\cdot 6}{4} = \\frac{5.682 - 2.916}{4} = \\frac{2.766}{4} = 0.6915 \\Rightarrow A = e^{0.6915} \\approx \\mathbf{1.997 \\approx 2.0}.$$

→ Mô hình **$N \\approx 2.0\\cdot e^{0.486 x}$**. Kiểm tại $x = 2$: $2.0\\cdot e^{0.972} = 2.0\\cdot 2.643 = 5.29 \\approx 5.4$ ✓. **Thời gian nhân đôi** $= \\ln 2 / k = 0.693/0.486 \\approx 1.43$ giờ. Lưu ý $k > 0$ (tăng), khác Newton cooling $k > 0$ trong $e^{-kt}$ (giảm) — dấu nằm ở vị trí số mũ.

### 6.3 Walk-through 3 — lũy thừa (log–log)

Mô hình **lũy thừa** $y = A\\cdot x^n$ tuyến tính hóa bằng cách lấy ln *cả hai* biến:
$$\\ln y = \\ln A + n\\cdot\\ln x.$$
Đặt $X = \\ln x$, $Y = \\ln y$ → $Y = n\\cdot X + \\ln A$: tuyến tính giữa $\\ln y$ và $\\ln x$ (khác mũ — ở mũ chỉ log trục $y$). Đây là vì sao dữ liệu lũy thừa trông **thẳng trên giấy log–log** (cả hai trục thang log).

Ví dụ: quãng đường rơi tự do $s$ (m) theo thời gian $t$ (s), nghi $s = A\\cdot t^n$:

| $t$ | $s$ | $X = \\ln t$ | $Y = \\ln s$ |
|---|---|---|---|
| 1 | 4.9 | 0.000 | 1.589 |
| 2 | 19.6 | 0.693 | 2.976 |
| 4 | 78.4 | 1.386 | 4.362 |

Hai điểm cách đều: từ $(0, 1.589)$ đến $(1.386, 4.362)$, độ dốc $= (4.362 - 1.589)/(1.386 - 0) = 2.773/1.386 = \\mathbf{2.0}$ → $n = 2$. Tung độ gốc $= 1.589 = \\ln A \\Rightarrow A = e^{1.589} \\approx 4.9$. Vậy $s = 4.9\\,t^2$ — đúng công thức rơi tự do $s = \\frac12 g t^2$ với $g \\approx 9.8$ (vì $\\frac12\\cdot 9.8 = 4.9$). Tuyến tính hóa log–log đã "moi" ra cả số mũ $n = 2$ lẫn hệ số $A = 4.9$ từ dữ liệu thô.

### 6.4 Khi nào dùng semi-log, khi nào log–log?

| Dạng nghi ngờ | Đổi biến | Trục thẳng trên giấy | Đọc gì từ đường |
|---|---|---|---|
| Mũ $y = A e^{kx}$ | $Y = \\ln y$ (chỉ y) | **semi-log** ($y$ log, $x$ thường) | độ dốc $= k$, chặn $= \\ln A$ |
| Lũy thừa $y = A x^n$ | $X = \\ln x, Y = \\ln y$ | **log–log** (cả hai log) | độ dốc $= n$, chặn $= \\ln A$ |
| Tuyến tính $y = ax + b$ | không đổi | giấy thường | độ dốc $= a$, chặn $= b$ |

💡 **Mẹo chẩn đoán nhanh bằng mắt**: vẽ dữ liệu trên cả ba loại giấy; loại nào cho **đường thẳng nhất** thì đó là dạng mô hình. Thẳng trên semi-log → mũ; thẳng trên log–log → lũy thừa; thẳng trên giấy thường → tuyến tính.

⚠ **Lỗi thường gặp — quên rằng log làm méo trọng số sai số.** Fit trên ln y *không* cực tiểu sai số trên y mà trên ln y — điểm y nhỏ bị "phóng đại" tầm quan trọng. Với dữ liệu sạch thì ổn; cần chính xác cao thì dùng fit phi tuyến trực tiếp (Gauss–Newton). Nêu rõ đây là **xấp xỉ tiện lợi**.

⚠ **Lỗi thường gặp — lẫn semi-log với log–log.** Dùng nhầm sẽ ra dạng sai: nếu dữ liệu thật là mũ mà bạn vẽ log–log (log cả $x$) thì không thẳng, và ngược lại. Quy tắc: **mũ → chỉ log $y$; lũy thừa → log cả hai**. Kiểm bằng "đường nào thẳng nhất" ở mục 6.4.

🔁 **Dừng lại tự kiểm tra**

1. Mô hình lũy thừa $y = A\\cdot x^n$. Lấy log hai vế cho ra quan hệ tuyến tính giữa hai đại lượng nào?

<details><summary>Đáp án</summary>

$\\ln y = \\ln A + n\\cdot\\ln x$. Tuyến tính giữa **$\\ln y$ và $\\ln x$** (độ dốc $= n$, tung độ gốc $= \\ln A$). Đây là lý do dữ liệu lũy thừa trông thẳng trên giấy **log–log**.

</details>

### 📝 Tóm tắt mục 6

- $y = A\\cdot e^{kx}$ → $\\ln y = \\ln A + kx$: tuyến tính theo $x$ → fit được bằng least squares (semi-log).
- Áp dụng tìm $k$ của nguội Newton với nhiều điểm: $k \\approx 0.075$, khớp L01 nhưng bền hơn; vi khuẩn $N = 2e^{0.486x}$, nhân đôi mỗi $\\approx 1.43$ giờ.
- $y = A\\cdot x^n$ → $\\ln y$ theo $\\ln x$ (log–log), độ dốc $= n$. Vd rơi tự do $s = 4.9t^2$.
- Mũ → chỉ log $y$; lũy thừa → log cả hai. Đường nào thẳng nhất → đó là dạng mô hình.
- Cảnh báo: log méo trọng số sai số (điểm nhỏ bị phóng đại).

---

## 7. Hồi quy đa thức & chọn mô hình

### 7.1 Hồi quy đa thức (polynomial regression)

💡 **Trực giác.** Đôi khi dữ liệu *cong* rõ ràng — đường thẳng không đủ. Ta nâng họ hàm lên **đa thức bậc $d$**:
$$\\hat{y} = c_0 + c_1 x + c_2 x^2 + \\cdots + c_d x^d.$$
Điều bất ngờ: đây **vẫn là bài toán bình phương tối thiểu tuyến tính** — "tuyến tính" theo *tham số* $c_0,\\dots,c_d$ (dù cong theo $x$). Ta coi $x, x^2, \\dots, x^d$ như các "đặc trưng (feature)" riêng và giải hệ phương trình chuẩn $(d+1)$ ẩn y hệt mục 3.

> 📐 **Định nghĩa đầy đủ — Bậc của đa thức khớp (degree $d$)**
>
> **(a) Là gì**: $d$ là lũy thừa cao nhất của $x$ trong mô hình. $d = 1$: đường thẳng (2 tham số); $d = 2$: parabol (3 tham số); $d = 3$: cubic (4 tham số). Số tham số $= d + 1$.
>
> **(b) Vì sao cần**: $d$ điều khiển **độ dẻo (flexibility)** của đường. $d$ nhỏ → cứng, có thể "không với tới" dữ liệu cong (underfit). $d$ lớn → dẻo, uốn theo mọi điểm kể cả nhiễu (overfit). Chọn $d$ là chọn điểm cân bằng giữa hai thái cực này.
>
> **(c) Ví dụ số**: 3 điểm $(0,1), (1,0), (2,3)$ cong rõ. Khớp parabol $\\hat y = c_0 + c_1 x + c_2 x^2$ qua đúng 3 điểm: từ $x=0$: $c_0 = 1$; từ $x=1$: $c_0 + c_1 + c_2 = 0 \\Rightarrow c_1 + c_2 = -1$; từ $x=2$: $c_0 + 2c_1 + 4c_2 = 3 \\Rightarrow 2c_1 + 4c_2 = 2 \\Rightarrow c_1 + 2c_2 = 1$. Trừ hai phương trình: $c_2 = 2$, $c_1 = -3$. → $\\hat y = 1 - 3x + 2x^2$. Kiểm $x=2$: $1 - 6 + 8 = 3$ ✓. (3 điểm + 3 tham số → qua đúng hết, $R^2 = 1$ — đây là nội suy trá hình, xem cảnh báo dưới.)

⚠ **Lỗi thường gặp — tăng bậc $d$ để bơm $R^2$.** $R^2$ trên dữ liệu huấn luyện **luôn tăng** (không bao giờ giảm) khi thêm bậc, vì mô hình mới chứa mô hình cũ như trường hợp riêng ($c_d = 0$). Nên "$R^2$ cao nhờ bậc cao" là *ảo*. Khi $d = n-1$ (bậc bằng số điểm trừ 1) thì $R^2 = 1$ tuyệt đối — nhưng đó là **nội suy + overfitting**, dao động Runge giữa các điểm, dự đoán ngoài thảm họa (đã gặp ở mục 2). Quy tắc: chỉ nâng bậc khi dữ liệu *thật sự* cong và bậc thấp underfit rõ; dùng $R^2$ điều chỉnh (adjusted $R^2$) hoặc tập kiểm tra để so.

### 7.1b Walk-through — khớp parabol bằng phương trình chuẩn

Khi *nhiều hơn* số tham số, parabol **không** qua hết điểm — phải giải hệ phương trình chuẩn least squares. Với bậc 2, ba phương trình chuẩn (mở rộng của hệ 2 ẩn ở mục 3) là:
$$\\begin{aligned}
\\sum y &= c_0\\,n + c_1\\sum x + c_2\\sum x^2 \\\\
\\sum xy &= c_0\\sum x + c_1\\sum x^2 + c_2\\sum x^3 \\\\
\\sum x^2 y &= c_0\\sum x^2 + c_1\\sum x^3 + c_2\\sum x^4
\\end{aligned}$$
Mỗi "feature" thêm ($x^2$) sinh thêm một phương trình và kéo theo các tổng bậc cao hơn ($\\sum x^3, \\sum x^4$). Cấu trúc giống hệt mục 3 — chỉ là hệ $3\\times 3$ thay vì $2\\times 2$. Giải bằng [khử Gauss / quy tắc Cramer](../../01-Arithmetic-Algebra/lesson-03-linear-equations/). (Với $d$ lớn, viết gọn bằng ma trận $X^\\top X\\,\\mathbf c = X^\\top \\mathbf y$ — xem [Vectors](../../../Vectors/).)

### 7.1c So sánh đường thẳng vs parabol bằng R² — khi nào "đáng" nâng bậc?

💡 **Trực giác — adjusted $R^2$.** Vì $R^2$ thường *tăng* khi thêm tham số (kể cả tham số vô dụng), ta phạt số tham số bằng **$R^2$ điều chỉnh (adjusted)**:
$$R^2_{\\text{adj}} = 1 - (1 - R^2)\\cdot\\frac{n - 1}{n - p - 1},$$
với $n$ = số điểm, $p$ = số tham số (không kể $c_0$). $R^2_{\\text{adj}}$ chỉ tăng nếu tham số mới giúp *đủ nhiều*; thêm tham số rác → nó *giảm*. Ví dụ số: dữ liệu cong $n = 10$, đường thẳng cho $R^2 = 0.70$ ($p=1$), parabol cho $R^2 = 0.92$ ($p=2$).
- Thẳng: $R^2_{\\text{adj}} = 1 - (1 - 0.70)\\cdot\\frac{9}{8} = 1 - 0.30\\cdot 1.125 = 1 - 0.3375 = 0.6625$.
- Parabol: $R^2_{\\text{adj}} = 1 - (1 - 0.92)\\cdot\\frac{9}{7} = 1 - 0.08\\cdot 1.286 = 1 - 0.1029 = 0.897$.

$R^2_{\\text{adj}}$ tăng mạnh ($0.66 \\to 0.90$) → bậc 2 **đáng** (cải thiện thực, không chỉ do thêm tham số). Ngược lại nếu nâng tiếp lên bậc 9 mà $R^2$ chỉ lên $0.93$ thì $R^2_{\\text{adj}}$ sẽ *tụt* (mẫu $n - p - 1 = 10 - 9 - 1 = 0$ → vô nghĩa, dấu hiệu đã hết bậc tự do) — đúng tinh thần "đừng overfitting".

### 7.2 Bốn ví dụ chọn mô hình (tuyến tính / đa thức / mũ)

Mỗi bộ dữ liệu dưới đây minh họa "dấu hiệu" để chọn đúng họ hàm. Quy trình chung: **(1)** vẽ scatter, **(2)** nhìn hình dạng + thử các loại giấy (mục 6.4), **(3)** fit, **(4)** kiểm phần dư.

**Ví dụ A — tuyến tính.** Doanh thu (triệu) theo số nhân viên bán: (2, 5), (4, 9), (6, 14), (8, 18). Hiệu *liên tiếp* của $y$: $+4, +5, +4$ — gần **hằng số** khi $x$ tăng đều. Dấu hiệu tuyến tính: *sai phân bậc 1 không đổi*. Chọn $\\hat y = ax + b$. (Khớp ra $a \\approx 2.2$.)

**Ví dụ B — bậc 2 (parabol).** Độ cao vật ném (m) theo thời gian (s): (0, 0), (1, 25), (2, 40), (3, 45), (4, 40). $y$ tăng rồi **giảm** — có *đỉnh*. Dấu hiệu: đường đổi chiều một lần, hiệu bậc 1 giảm dần ($+25, +15, +5, -5$) nhưng hiệu *bậc 2* gần hằng số ($-10, -10, -10$). Sai phân bậc 2 không đổi ⇒ **bậc 2**. Chọn $\\hat y = c_0 + c_1 x + c_2 x^2$ (mô hình ném xiên, $c_2 < 0$ vì trọng lực).

**Ví dụ C — mũ.** Số ca nhiễm theo ngày: (0, 100), (1, 150), (2, 225), (3, 338). *Tỉ số* liên tiếp: $150/100 = 1.5$, $225/150 = 1.5$, $338/225 \\approx 1.5$ — gần **hằng số**. Dấu hiệu mũ: *tỉ số liên tiếp không đổi* (mỗi bước nhân cùng một hệ số). Chọn $y = A e^{kx}$ với $e^k = 1.5 \\Rightarrow k = \\ln 1.5 \\approx 0.405$, $A = 100$.

**Ví dụ D — lũy thừa.** Diện tích quả cầu theo bán kính: (1, 12.6), (2, 50.3), (3, 113), (4, 201). Không phải tỉ số hằng (mũ) cũng không phải hiệu hằng (tuyến tính). Thử log–log: $\\ln y$ theo $\\ln x$ cho đường thẳng độ dốc $\\approx 2$ → $y = A x^2$ (đúng $A = 4\\pi \\approx 12.57$, công thức $4\\pi r^2$). Dấu hiệu lũy thừa: thẳng trên **log–log**, số mũ thường là số "đẹp" (2, 3, 1.5...).

> **Bảng dấu hiệu nhận dạng — "đọc" dữ liệu trước khi fit:**
>
> | Dấu hiệu trên dữ liệu (x cách đều) | Mô hình | Đổi biến để thẳng |
> |---|---|---|
> | Hiệu liên tiếp $\\Delta y$ ≈ hằng | tuyến tính | không cần |
> | Hiệu **bậc 2** ≈ hằng (cong, 1 đỉnh) | bậc 2 | không cần (fit đa thức) |
> | **Tỉ số** liên tiếp $y_{i+1}/y_i$ ≈ hằng | mũ | log $y$ (semi-log) |
> | Thẳng trên log–log, mũ số "đẹp" | lũy thừa | log cả hai |

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mũ và lũy thừa khác nhau thế nào? Nhìn scatter dễ lẫn."* Mũ $e^{kx}$: $x$ ở *số mũ* → tăng "bùng nổ", tỉ số liên tiếp hằng. Lũy thừa $x^n$: $x$ ở *cơ số* → tăng "đa thức", thẳng trên log–log. Cách phân biệt chắc nhất: thử cả semi-log lẫn log–log, xem cái nào thẳng.
- *"Nếu hai mô hình cùng $R^2$ cao thì chọn cái nào?"* Chọn cái **đơn giản hơn** (ít tham số hơn) — dao cạo Occam (mục 8). Và cái nào có *ý nghĩa cơ chế* (vd ném xiên thì bậc 2 hợp lý hơn bậc 5 dù bậc 5 khớp hơn vài phần nghìn).

🔁 **Dừng lại tự kiểm tra**

1. Dữ liệu (1, 3), (2, 6), (3, 12), (4, 24). Mô hình gì? Tìm tham số.

<details><summary>Đáp án</summary>

Tỉ số liên tiếp $6/3 = 2$, $12/6 = 2$, $24/12 = 2$ — hằng ⇒ **mũ** $y = A e^{kx}$ với $e^k = 2 \\Rightarrow k = \\ln 2 \\approx 0.693$. Tại $x=1$, $y=3$: $3 = A e^{0.693} = 2A \\Rightarrow A = 1.5$. Vậy $y = 1.5\\cdot 2^x$. Kiểm $x=4$: $1.5\\cdot 16 = 24$ ✓.

</details>

2. Dữ liệu (0, 1), (1, 4), (2, 9), (3, 16). Tuyến tính, bậc 2, hay mũ?

<details><summary>Đáp án</summary>

Hiệu bậc 1: $+3, +5, +7$ (không hằng → không tuyến tính). Hiệu bậc 2: $+2, +2$ (hằng → **bậc 2**). Thật ra $y = (x+1)^2$. Tỉ số $4/1=4$ nhưng $9/4=2.25$ — không hằng nên không mũ.

</details>

### 📝 Tóm tắt mục 7

- Hồi quy đa thức bậc $d$: $\\hat y = \\sum c_j x^j$ — vẫn là least squares tuyến tính theo tham số $c_j$.
- $d$ điều khiển độ dẻo: nhỏ → underfit, lớn → overfit; $d = n-1$ → $R^2 = 1$ nhưng là nội suy/overfitting.
- $R^2$ huấn luyện luôn tăng theo $d$ → không dùng nó để chọn bậc; dùng adjusted $R^2$ / tập kiểm tra.
- Dấu hiệu chọn mô hình: $\\Delta y$ hằng → tuyến tính; $\\Delta^2 y$ hằng → bậc 2; tỉ số hằng → mũ; thẳng log–log → lũy thừa.

---

## 8. Cạm bẫy: overfitting, ngoại suy, outlier

- **Overfitting (khớp quá mức)**: thêm tham số (đa thức bậc cao) luôn giảm SS_res trên dữ liệu cũ, nhưng mô hình bám nhiễu → dự đoán dữ liệu mới tệ. Quy tắc: chọn mô hình *đơn giản nhất* khớp đủ tốt (dao cạo Occam).
- **Ngoại suy (extrapolation)**: dùng mô hình *ngoài* khoảng dữ liệu cực kỳ rủi ro. Đường khớp tốt trong [1, 5] không hứa hẹn gì tại x = 100. Mô hình tăng trưởng mũ ngoại suy cho ra dân số vô hạn (đã gặp ở [L01](../lesson-01-modeling-cycle/)).
- **Outlier**: điểm đo sai kéo lệch cả đường (mục 4). Vẽ đồ thị để phát hiện; cân nhắc loại bỏ hoặc dùng robust regression.

### 8.1 Ngoại suy — minh họa bằng số

Lấy đường ôn thi $\\hat y = 0.9x + 1.3$ (mục 3). **Nội suy** (trong vùng dữ liệu $x \\in [1,5]$): tại $x = 2.5$, $\\hat y = 0.9\\cdot 2.5 + 1.3 = 3.55$ điểm — đáng tin, vì có điểm thật bao quanh. **Ngoại suy** (ngoài vùng): tại $x = 20$ giờ/tuần, công thức cho $\\hat y = 0.9\\cdot 20 + 1.3 = 19.3$ điểm — **vô lý** (thang chỉ tới 10!). Mô hình tuyến tính không "biết" điểm có trần; nó chỉ học xu hướng *trong* $[1,5]$. Bài học: **chỉ tin mô hình trong khoảng dữ liệu đã quan sát**.

⚠ **Lỗi thường gặp — ngoại suy mù quáng.** Đa số thảm họa dự báo (dân số, giá cổ phiếu, lây nhiễm) đến từ kéo dài xu hướng ra ngoài vùng dữ liệu. Đường thẳng/mũ khớp đẹp 5 điểm đầu không hứa hẹn gì ở điểm thứ 100. Trước khi ngoại suy, hỏi: *cơ chế sinh dữ liệu có còn đúng ở đó không?* (vd tăng trưởng mũ luôn gặp giới hạn tài nguyên → bão hòa).

### 8.2 R² cao ≠ nhân quả — minh họa

⚠ **Lỗi thường gặp — suy nhân quả từ tương quan.** $R^2$ cao chỉ nói hai biến *biến thiên cùng nhau*, **không** nói biến này *gây ra* biến kia. Ví dụ kinh điển: doanh số kem và số vụ chết đuối tương quan mạnh ($R^2$ cao) theo tháng — nhưng kem không gây chết đuối; cả hai cùng bị **biến ẩn** (mùa hè nóng) chi phối. Ba khả năng khi $X, Y$ tương quan: (1) $X$ gây $Y$; (2) $Y$ gây $X$; (3) biến thứ ba $Z$ gây cả hai. Hồi quy *một mình* không phân biệt được — cần thí nghiệm có đối chứng hoặc lý lẽ cơ chế.

### 8.3 Biểu đồ phần dư — công cụ chẩn đoán

💡 **Trực giác.** Sau khi fit, đừng chỉ nhìn $R^2$ — **vẽ phần dư $e_i$ theo $x_i$**. Nếu mô hình đúng dạng, phần dư phải rải **ngẫu nhiên quanh 0**, không có hình thù. Nếu thấy **mẫu hình (pattern)**, mô hình sai dạng.

\`\`\`
 Phần dư đúng (mô hình ổn):        Phần dư cong (sai dạng — nên nâng bậc):
  e                                 e
 +| ●    ●        ●                +|        ●  ●
 0|----●-----●--------●→ x         0|---●-----------●---→ x
 -|  ●     ●     ●                 -| ●               ●
   rải đều, không hình thù            hình chữ U → dữ liệu cong, đường thẳng underfit
\`\`\`

Phần dư hình chữ U (hoặc ∩) → quan hệ phi tuyến mà ta ép đường thẳng → nâng lên bậc 2 (mục 7). Phần dư "loe rộng" khi $x$ tăng → phương sai không đều (cân nhắc fit có trọng số). Đây là lý do bộ Anscombe (mục 5) lừa được người chỉ nhìn $R^2$: vẽ phần dư ra là lộ ngay.

📝 **Tóm tắt mục 8**: khớp dữ liệu cũ tốt ≠ dự đoán tốt. Cảnh giác **overfitting** (chọn mô hình đơn giản), **ngoại suy** ($x=20$ giờ → 19.3 điểm vô lý, chỉ tin trong vùng dữ liệu), **outlier** (vẽ đồ thị, robust), **R² cao ≠ nhân quả** (kem ↔ chết đuối, biến ẩn mùa hè). Luôn **vẽ biểu đồ phần dư** để bắt sai dạng.

---

## 9. Bài tập

**Bài 1.** Một quầy có dữ liệu *số nhân viên trực* ($x$) và *số đơn xử lý được trong giờ* ($y$): (1, 1), (2, 2), (3, 2), (4, 5). Tìm đường hồi quy $\\hat{y} = ax + b$ (mỗi nhân viên thêm xử lý thêm bao nhiêu đơn?).

**Bài 2.** Với kết quả Bài 1, tính $R^2$ và diễn giải (số nhân viên giải thích được bao nhiêu % chênh lệch số đơn?).

**Bài 3.** Giải thích trong 2–3 câu vì sao least squares dùng bình phương sai số thay vì tổng trị tuyệt đối, và nêu một nhược điểm của lựa chọn này.

**Bài 4.** Một bài đăng có *lượt chia sẻ* gấp đôi mỗi ngày, nghi theo mũ $y = A\\cdot e^{kx}$: ngày 0→3, ngày 1→6, ngày 2→12, ngày 3→24. Dùng tuyến tính hóa (lấy ln) để tìm $A$ và $k$.

**Bài 5.** Một bạn fit đa thức bậc 9 qua 10 điểm đo có nhiễu, được $R^2 = 1.0$ trên dữ liệu, rồi tuyên bố "mô hình hoàn hảo". Sai ở đâu? Đề xuất cách kiểm tra đúng.

**Bài 6.** Cho 4 bộ dữ liệu (x cách đều). Với mỗi bộ, dùng *bảng dấu hiệu* (mục 7.2) để chọn mô hình (tuyến tính / bậc 2 / mũ / lũy thừa) và giải thích dấu hiệu:
a) (1, 5), (2, 8), (3, 11), (4, 14).
b) (0, 5), (1, 10), (2, 20), (3, 40).
c) (0, 1), (1, 3), (2, 7), (3, 13).

**Bài 7.** Khớp **parabol** $\\hat y = c_0 + c_1 x + c_2 x^2$ qua đúng 3 điểm (0, 2), (1, 1), (2, 6). Sau đó cho biết: vì $R^2 = 1$, có nên kết luận parabol là mô hình "đúng" cho hiện tượng sinh ra dữ liệu không?

**Bài 8.** Một nhà phân tích thấy "số quán cà phê trong thành phố" và "số ca trầm cảm" tương quan với $R^2 = 0.85$ qua các năm, kết luận "cà phê gây trầm cảm". Sai lầm logic là gì? Nêu một biến ẩn khả dĩ.

---

## 10. Lời giải chi tiết

**Bài 1.** $n=4$. Bảng: $\\sum x = 1+2+3+4 = 10$; $\\sum y = 1+2+2+5 = 10$; $\\sum xy = 1+4+6+20 = 31$; $\\sum x^2 = 1+4+9+16 = 30$.
- $a = (4\\cdot 31 - 10\\cdot 10)/(4\\cdot 30 - 10^2) = (124 - 100)/(120 - 100) = 24/20 =$ **1.2**.
- $b = (10 - 1.2\\cdot 10)/4 = (10 - 12)/4 = -2/4 =$ **$-0.5$**.
- → **$\\hat{y} = 1.2x - 0.5$**. Diễn giải: mỗi nhân viên trực thêm xử lý thêm ≈ **1.2 đơn/giờ**. Kiểm: tại $\\bar{x} = 2.5$, $\\hat{y} = 1.2\\cdot 2.5 - 0.5 = 2.5 = \\bar{y}$ ✓ (qua trọng tâm).

**Bài 2.** Dự đoán: $x=1\\to 0.7$; $x=2\\to 1.9$; $x=3\\to 3.1$; $x=4\\to 4.3$.
- Phần dư: $1-0.7=0.3$; $2-1.9=0.1$; $2-3.1=-1.1$; $5-4.3=0.7$. $SS_{\\text{res}} = 0.09+0.01+1.21+0.49 =$ **1.80**.
- $\\bar{y} = 2.5$. $SS_{\\text{tot}} = (1-2.5)^2+(2-2.5)^2+(2-2.5)^2+(5-2.5)^2 = 2.25+0.25+0.25+6.25 =$ **9.0**.
- **$R^2 = 1 - 1.80/9.0 = 1 - 0.20 = 0.80$** → số nhân viên giải thích 80% chênh lệch số đơn xử lý; 20% còn lại do yếu tố khác (chủ yếu từ ca (3 nhân viên, 2 đơn) lệch $-1.1$ — có thể hôm đó vắng khách).

**Bài 3.** Bình phương: (1) khả vi mọi nơi ($|x|$ gãy tại 0) → đặt đạo hàm = 0 ra **công thức nghiệm đóng**; (2) phạt mạnh các điểm lệch xa (lệch ×2 → phạt ×4); (3) là ước lượng hợp lý cực đại khi nhiễu Gauss. **Nhược điểm**: rất nhạy với outlier — một điểm đo sai lệch lớn kéo cả đường về phía nó.

**Bài 4.** Lấy $Y = \\ln y$: $(0, \\ln 3=1.099)$, $(1, \\ln 6=1.792)$, $(2, \\ln 12=2.485)$, $(3, \\ln 24=3.178)$. Khoảng cách đều nhau $0.693 = \\ln 2$ → độ dốc $k = 0.693$ → **$k = \\ln 2 \\approx 0.693$**. Tung độ gốc $= 1.099 = \\ln 3$ → **$A = 3$**. Vậy $y = 3\\cdot e^{0.693x} = 3\\cdot 2^x$. Kiểm: ngày 2 → $3\\cdot 4 = 12$ ✓; ngày 3 → $3\\cdot 8 = 24$ ✓. Diễn giải: bài đăng khởi đầu 3 lượt chia sẻ, **gấp đôi mỗi ngày** ($k = \\ln 2$ đúng nghĩa "nhân đôi"); ngoại suy: ngày 7 → $3\\cdot 2^7 = 384$ lượt (nhưng nhớ cảnh báo mục 7 — mũ không kéo dài mãi).

**Bài 5.** Sai: $R^2 = 1$ trên dữ liệu *huấn luyện* chỉ phản ánh đa thức bậc 9 có đủ 10 tham số để qua đúng 10 điểm — đây là **overfitting**, nó bám cả nhiễu và sẽ dao động Runge, dự đoán điểm mới rất tệ. $R^2$ trên chính dữ liệu đã fit không đo được khả năng dự đoán. **Cách kiểm tra đúng**: tách dữ liệu thành tập huấn luyện + tập kiểm tra (giữ lại vài điểm không dùng để fit), đánh giá sai số trên tập kiểm tra; hoặc dùng kiểm định chéo (cross-validation); và ưu tiên mô hình đơn giản (đường thẳng/bậc thấp) nếu nó khớp đủ tốt.

**Bài 6.**
a) Hiệu liên tiếp $\\Delta y = 8-5, 11-8, 14-11 = +3, +3, +3$ — **hằng số** ⇒ **tuyến tính**. (Thật ra $y = 3x + 2$: độ dốc 3, chặn 2.)
b) Tỉ số liên tiếp $10/5 = 2$, $20/10 = 2$, $40/20 = 2$ — **hằng** ⇒ **mũ** $y = A e^{kx}$ với $e^k = 2 \\Rightarrow k = \\ln 2 \\approx 0.693$, $A = 5$ (giá trị tại $x=0$). Tức $y = 5\\cdot 2^x$.
c) Hiệu bậc 1: $3-1, 7-3, 13-7 = +2, +4, +6$ (không hằng → không tuyến tính). Hiệu bậc 2: $4-2, 6-4 = +2, +2$ — **hằng** ⇒ **bậc 2**. (Thật ra $y = x^2 + x + 1$.) Tỉ số $3/1=3$ nhưng $7/3\\approx 2.33$ — không hằng nên không mũ.

**Bài 7.** Qua 3 điểm:
- $x=0$: $c_0 = 2$.
- $x=1$: $c_0 + c_1 + c_2 = 1 \\Rightarrow c_1 + c_2 = -1$.
- $x=2$: $c_0 + 2c_1 + 4c_2 = 6 \\Rightarrow 2c_1 + 4c_2 = 4 \\Rightarrow c_1 + 2c_2 = 2$.
- Trừ: $(c_1 + 2c_2) - (c_1 + c_2) = 2 - (-1) \\Rightarrow c_2 = 3$; rồi $c_1 = -1 - 3 = -4$.
- → **$\\hat y = 2 - 4x + 3x^2$**. Kiểm $x=2$: $2 - 8 + 12 = 6$ ✓.
- **Không** nên kết luận parabol "đúng": với 3 điểm thì parabol (3 tham số) *luôn* qua đúng hết → $R^2 = 1$ là *tất yếu*, không phải bằng chứng. Cần thêm dữ liệu và kiểm trên điểm mới; nếu chỉ có 3 điểm, mô hình bậc 2 chỉ là *một* trong vô số đường qua chúng. $R^2 = 1$ ở đây là nội suy (mục 2), không nói lên cơ chế.

**Bài 8.** Sai lầm: **suy nhân quả từ tương quan** (mục 8.2). $R^2 = 0.85$ chỉ nói hai biến cùng tăng theo thời gian, không nói cái này gây cái kia. Biến ẩn khả dĩ: **dân số / đô thị hóa** — thành phố lớn dần thì cả số quán cà phê lẫn số ca trầm cảm (được chẩn đoán) đều tăng; hoặc **mức độ tiếp cận chẩn đoán y tế** tăng theo thời gian. Muốn kết luận nhân quả phải có thí nghiệm đối chứng, không phải hồi quy quan sát.

---

## 11. Bài tiếp theo

[Lesson 03 — Mô hình rời rạc (phương trình sai phân)](../lesson-03-discrete-dynamical/): khi thời gian đi theo bước (năm, thế hệ) thay vì liên tục, mô hình thành dãy truy hồi $x_{n+1} = f(x_n)$.

## 📝 Tổng kết

1. **Khớp mô hình từ dữ liệu** = tìm tham số làm hàm gần dữ liệu nhất; cần vì dữ liệu thật có nhiễu.
2. **Nội suy** (qua mọi điểm) vs **hồi quy** (đi giữa); đa số dữ liệu đo → hồi quy.
3. **Bình phương tối thiểu**: cực tiểu $\\sum(y_i-ax_i-b)^2$ → công thức đóng $a = (n\\sum xy-\\sum x\\sum y)/(n\\sum x^2-(\\sum x)^2)$, $b = \\bar{y}-a\\bar{x}$.
4. **Vì sao bình phương**: khả vi (nghiệm đóng) + phạt lệch xa + MLE Gauss; nhược: nhạy outlier.
5. **$R^2$** $= 1 - SS_{\\text{res}}/SS_{\\text{tot}}$: phần biến động giải thích được; $R^2$ cao $\\neq$ mô hình đúng (vẽ đồ thị!).
6. **Tuyến tính hóa**: log hóa mô hình mũ/lũy thừa để fit tuyến tính. Mũ → semi-log (chỉ log $y$, độ dốc $=k$); lũy thừa → log–log (log cả hai, độ dốc $= n$). Vd $k$ nguội Newton $\\approx 0.075$, vi khuẩn $k = 0.486$, rơi tự do $s = 4.9t^2$.
7. **Hồi quy đa thức** bậc $d$: vẫn là least squares tuyến tính theo tham số; $d$ điều khiển độ dẻo (nhỏ→underfit, lớn→overfit). **Chọn mô hình** bằng dấu hiệu: $\\Delta y$ hằng → tuyến tính; $\\Delta^2 y$ hằng → bậc 2; tỉ số hằng → mũ; thẳng log–log → lũy thừa.
8. Cảnh giác **overfitting** (chọn mô hình đơn giản), **ngoại suy** (chỉ tin trong vùng dữ liệu — $x=20$ giờ → 19.3 điểm vô lý), **outlier**, và **$R^2$ cao $\\neq$ nhân quả** (kem ↔ chết đuối). Luôn **vẽ biểu đồ phần dư** để bắt sai dạng.
`;
