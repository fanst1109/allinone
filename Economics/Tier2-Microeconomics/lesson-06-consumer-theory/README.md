# Lesson 06 — Consumer Theory (Lý thuyết tiêu dùng)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **utility (hữu dụng)** — cách kinh tế học mô hình hóa "thoả mãn / hạnh phúc" của người tiêu dùng.
- Vẽ và đọc được **đường bàng quan (indifference curve)** — tập các điểm cho cùng mức utility.
- Hiểu **tỉ lệ thay thế biên (MRS)** — bạn sẵn sàng đổi bao nhiêu Y lấy 1 X tại một điểm.
- Vẽ **đường ngân sách (budget constraint)** và biết nó dịch chuyển thế nào khi giá / thu nhập đổi.
- Tìm **điểm tiêu dùng tối ưu** bằng điều kiện $\text{MRS} = P_x / P_y$.
- Phân tích được **hiệu ứng thu nhập + hiệu ứng thay thế** khi giá đổi.

## Kiến thức tiền đề

- [Lesson 01](../../Tier1-Foundations/lesson-01-thinking-like-economist/) — chi phí cơ hội, tư duy biên.
- Đạo hàm riêng (sẽ học kỹ ở Vectors/Calculus); ở đây dùng ý nghĩa "độ dốc" cảm tính.

## 1. Utility — mô hình hóa sở thích

### 1.1. Khái niệm

**Utility** = một con số đo lường mức độ thoả mãn người tiêu dùng nhận được khi tiêu thụ một bó hàng $(x, y)$.

- Hàm utility $U(x, y)$ — gán điểm cho mỗi bó.
- Quy ước: utility *ordinal* (thứ tự) — chỉ thứ tự quan trọng, không phải con số tuyệt đối. $U(A) > U(B)$ nghĩa "A được thích hơn B".

#### 💡 Trực giác

Hình dung bạn đang chọn giữa các bữa ăn: bún bò vs phở vs cơm tấm. Bạn có sở thích nội tâm: bún bò = 80đ, phở = 70đ, cơm tấm = 60đ. Đây là utility — *cách biểu diễn sở thích bằng số*. Việc bún bò "80đ" không quan trọng; quan trọng là 80 > 70 > 60.

### 1.2. 4 dạng hàm utility thường gặp

1. **Cobb-Douglas**: $U(x, y) = x^\alpha \cdot y^\beta$. Đại diện hàng "đi đôi" — cần cả 2 mà không thay thế hoàn toàn. Vd $U = x^{0.5} \cdot y^{0.5}$ (gạo + thịt).
2. **Tuyến tính (thay thế hoàn hảo)**: $U(x, y) = ax + by$. Người tiêu dùng coi X và Y tương đương theo tỉ lệ. Vd: tờ 50k và 2 tờ 25k.
3. **Leontief (bổ sung hoàn hảo)**: $U(x, y) = \min(ax, by)$. Hai hàng phải dùng theo tỉ lệ cố định. Vd: giày trái + giày phải (1:1).
4. **Quasi-linear**: $U(x, y) = v(x) + y$. Một hàng có lợi ích biên giảm dần, một hàng giữ utility tuyến tính (thường là tiền). Vd: số chai bia + tiền còn lại.

### 1.3. Lợi ích biên giảm dần (đã gặp ở Lesson 01)

Đối với hầu hết hàng hóa: $MU_x = \partial U / \partial x$ giảm khi $x$ tăng.

Ví dụ với $U = \sqrt{x}$: $MU_x = \frac{1}{2\sqrt{x}}$. Tại $x=1$, $MU = 0.5$. Tại $x=4$, $MU = 0.25$. Tại $x=100$, $MU = 0.05$.

## 2. Đường bàng quan (Indifference Curve)

### 2.1. Định nghĩa

**Đường bàng quan (IC)** = tập tất cả bó hàng $(x, y)$ cho **cùng mức utility**. Người tiêu dùng "không thiên vị" giữa các bó trên cùng IC.

#### 💡 Trực giác

Đứng trên đỉnh đồi $U = 10$. Đi vòng quanh giữ độ cao = đi dọc IC. Đi lên đỉnh cao hơn $U = 12$ = đổi sang IC khác (xa gốc tọa độ hơn).

### 2.2. 4 thuộc tính của IC

1. **Càng xa gốc, utility càng cao** (more is better).
2. **Dốc xuống**: tăng X phải giảm Y (vì utility không đổi).
3. **Lồi về phía gốc**: vì lợi ích biên giảm dần → MRS giảm khi X tăng.
4. **Không cắt nhau**: vì nếu cắt → cùng điểm có 2 mức utility (mâu thuẫn).

### 2.3. MRS — Tỉ lệ thay thế biên

**$\text{MRS}_{xy}$** = số đơn vị Y bạn sẵn sàng từ bỏ để có thêm 1 đơn vị X, *giữ utility không đổi*.

Toán: $\text{MRS} = MU_x / MU_y$ = âm độ dốc của IC.

**Walk-through**: $U = x \cdot y$. $MU_x = y$, $MU_y = x$ $\to \text{MRS} = y/x$.

- Tại $(2, 8)$: $\text{MRS} = \frac{8}{2} = 4$. Bạn sẵn sàng đổi 4 Y lấy 1 X. (Vì bạn đang có nhiều Y, ít X.)
- Tại $(8, 2)$: $\text{MRS} = \frac{2}{8} = 0.25$. Đã có nhiều X → đổi rẻ.

MRS giảm khi đi dọc IC từ trái sang phải = IC lồi.

## 3. Đường ngân sách (Budget Constraint)

### 3.1. Định nghĩa

$$P_x \cdot x + P_y \cdot y = I$$

Với $I$ = thu nhập, $P_x, P_y$ = giá. Đây là phương trình tuyến tính: tất cả bó hàng $(x, y)$ *trong khả năng chi*.

**Đường thẳng** trên hệ trục $(x, y)$:
- Cắt trục X tại $(I/P_x, 0)$.
- Cắt trục Y tại $(0, I/P_y)$.
- Độ dốc = $-P_x/P_y$.

### 3.2. Dịch chuyển khi gì đổi

1. **Thu nhập tăng**: cả 2 intercept tăng → đường dịch song song ra ngoài.
2. **Giá X tăng**: intercept X co lại; intercept Y không đổi → đường xoay vào quanh điểm Y.
3. **Giá Y tăng**: ngược lại.

## 4. Lựa chọn tối ưu

### 4.1. Điều kiện tối ưu

Tối ưu = điểm IC cao nhất *tiếp xúc* với đường ngân sách. Tại tiếp điểm: **độ dốc IC = độ dốc đường ngân sách**:

$$\text{MRS} = \frac{P_x}{P_y} \qquad \text{hay tương đương:} \qquad \frac{MU_x}{P_x} = \frac{MU_y}{P_y}$$

Diễn giải: tại điểm tối ưu, *lợi ích biên mỗi đồng* chi cho X = lợi ích biên mỗi đồng chi cho Y. Đây là **luật cân bằng biên** (equimarginal principle).

### 4.2. Walk-through

$U = x \cdot y$, $P_x = 2$, $P_y = 4$, $I = 100$.

- Đường ngân sách: $2x + 4y = 100$.
- Tối ưu: $\text{MRS} = \frac{y}{x} = \frac{P_x}{P_y} = 0.5 \to y = 0.5x$.
- Thay vào ngân sách: $2x + 4(0.5x) = 100 \to 4x = 100 \to x^* = 25, y^* = 12.5$.
- Utility tối ưu: $U^* = 25 \times 12.5 = 312.5$.

Kiểm tra điều kiện equimarginal: $MU_x/P_x = y/2 = 6.25$; $MU_y/P_y = x/4 = 6.25$ ✓.

### 4.3. 4 ví dụ số khác

1. $U = x^{0.5} \cdot y^{0.5}, P_x = 1, P_y = 1, I = 10$: $MU_x = 0.5 (y/x)^{0.5}$, $MU_y = 0.5 (x/y)^{0.5}$. $\text{MRS} = y/x = 1 \to y = x$. Ngân sách: $x + y = 10 \to x^* = y^* = 5$.
2. Tuyến tính $U = 2x + y, P_x = 1, P_y = 1, I = 10$: $\text{MRS} = 2 > 1 = P_x/P_y \to$ mua TOÀN BỘ là X. Giải pháp góc (corner solution): $x^* = 10, y^* = 0$.
3. Leontief $U = \min(x, y), P_x = 1, P_y = 2, I = 30$: phải có $x = y$. $x + 2y = 30 \to x = y = 10$.
4. Quasi-linear $U = \sqrt{x} + y, P_x = 1, P_y = 1, I = 10$: $\text{MRS} = \frac{1}{2\sqrt{x}} = 1 \to x^* = 0.25, y^* = 9.75$. (Một phần nhỏ vào X vì $MU_x$ giảm rất nhanh.)

## 5. Phân tích thay đổi giá

### 5.1. Hiệu ứng thu nhập + thay thế

Khi $P_x$ tăng:

- **Hiệu ứng thay thế** (substitution effect): X tương đối đắt hơn Y → chuyển sang Y. Người tiêu dùng đi *dọc* IC ban đầu (giữ utility) đến điểm có ít X hơn.
- **Hiệu ứng thu nhập** (income effect): tổng "sức mua" giảm → tiêu dùng cả X và Y giảm (cho hàng bình thường) hoặc tăng X (cho hàng Giffen — ngoại lệ hiếm).

**Tổng hiệu ứng** trên X: thường là *giảm* (vì cả 2 hiệu ứng cùng chiều âm) → đây là cơ sở vi mô của *quy luật cầu* (Lesson 02).

#### ⚠ Lỗi thường gặp

- **Nhầm utility cardinal với ordinal**: utility chỉ có ý nghĩa thứ tự. $U = 100$ không có nghĩa "hạnh phúc gấp đôi $U = 50$".
- **Áp dụng $\text{MRS} = P_x/P_y$ cho mọi trường hợp**: corner solutions không thoả mãn (vd thay thế hoàn hảo). Phải kiểm tra điều kiện *nội điểm* (interior).

## 6. Bài tập thực hành

### Bài 1 — Tối ưu Cobb-Douglas

$U = x^{0.5} \cdot y^{0.5}, P_x = 2, P_y = 8, I = 80$. Tìm $(x^*, y^*)$.

### Bài 2 — MRS thay đổi theo điểm

$U = x \cdot y^2$. Tính MRS tại $(4, 6)$ và $(6, 4)$.

### Bài 3 — Dịch chuyển ngân sách

Bạn đang chi $(x=10, y=5)$ với $P_x = 2, P_y = 4, I = 40$. Bây giờ $P_x$ giảm xuống $1$.

- (a) Đường ngân sách dịch thế nào?
- (b) Nếu $U = xy$, tìm $(x^*, y^*)$ mới.
- (c) Phân tích hiệu ứng thay thế và thu nhập (mô tả định tính).

### Bài 4 — Corner solution

$U = 3x + y, P_x = 1, P_y = 2, I = 30$. Tìm $(x^*, y^*)$. Vì sao là corner?

## 7. Lời giải chi tiết

### Lời giải Bài 1

$\text{MRS} = \frac{y}{x} = \frac{P_x}{P_y} = \frac{2}{8} = 0.25 \to y = 0.25x$. Ngân sách: $2x + 8(0.25x) = 80 \to 4x = 80 \to x^* = 20, y^* = 5$. $U^* = \sqrt{20 \times 5} = 10$.

### Lời giải Bài 2

$MU_x = y^2$, $MU_y = 2xy$. $\text{MRS} = \frac{y^2}{2xy} = \frac{y}{2x}$.

- Tại $(4, 6)$: $\text{MRS} = \frac{6}{8} = 0.75$.
- Tại $(6, 4)$: $\text{MRS} = \frac{4}{12} = 0.33$.

MRS giảm khi X tăng (giữ vùng) → IC lồi.

### Lời giải Bài 3

(a) $P_x = 1 \to$ intercept X tăng từ $20$ lên $40$. Intercept Y không đổi ($10$). Đường ngân sách *xoay ra ngoài quanh điểm Y*.

(b) $\text{MRS} = \frac{y}{x} = \frac{1}{4} \to y = x/4$. Ngân sách: $x + 4(x/4) = 40 \to 2x = 40 \to x^* = 20, y^* = 5$. (X tăng nhiều, Y không đổi — vì sở thích Cobb-Douglas).

(c) **Hiệu ứng thay thế** (giữ utility cũ $U = 50$ và giá mới): $y/x = 1/4, xy = 50 \to x = 14.14, y = 3.54$. So với cũ $(10, 5)$: X tăng $+4.14$, Y giảm $-1.46$. **Hiệu ứng thu nhập** (đi đến điểm mới $(20, 5)$ từ $(14.14, 3.54)$): X tăng $+5.86$, Y tăng $+1.46$. Tổng X: $+10$, Y: $0$. Phân tách giúp hiểu *vì sao* X tăng đến mức $20$.

### Lời giải Bài 4

$\text{MRS} = \frac{3}{1} = 3 > \frac{1}{2} = P_x/P_y$. Mua chỉ X. $x^* = I/P_x = 30, y^* = 0$. Corner vì sở thích tuyến tính (thay thế hoàn hảo) — không có incentive trộn.

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 07 — Production & Cost](../lesson-07-production-cost/).
- **Bài trước**: [Lesson 05 — Market Failures](../../Tier1-Foundations/lesson-05-market-failures/).
- **Minh họa**: [visualization.html](./visualization.html) — vẽ IC + budget tương tác, tìm tối ưu.
