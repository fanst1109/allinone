// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/07-Mathematical-Modeling/lesson-06-optimization-models/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Mô hình tối ưu (LP, Lagrange)

## Mục tiêu

- Mô hình hóa bài toán "làm sao **tốt nhất** dưới ràng buộc": tối đa lợi nhuận, tối thiểu chi phí.
- **Tối ưu không ràng buộc (unconstrained optimization)**: tìm cực trị bằng đạo hàm bằng 0 ($f'(x) = 0$), kiểm tra dấu đạo hàm cấp 2.
- **Quy hoạch tuyến tính (Linear Programming)**: hàm mục tiêu + ràng buộc tuyến tính; miền khả thi lồi; nghiệm ở đỉnh; giải bằng đồ thị.
- **Nhân tử Lagrange**: tối ưu có ràng buộc đẳng thức; $\\nabla f = \\lambda \\nabla g$; ý nghĩa "giá bóng (shadow price)" của $\\lambda$.
- Áp dụng được vào các **mô hình thực**: sản xuất, khẩu phần, vận tải, định giá, tồn kho.

## Kiến thức tiền đề

- [Lesson 01 — Chu trình mô hình hóa](../lesson-01-modeling-cycle/).
- [T6 L04 — Hàm nhiều biến, gradient, cực trị có ràng buộc](../../06-Advanced/lesson-04-multivariable-functions/).
- [T1 — Hệ bất phương trình bậc nhất](../../01-Arithmetic-Algebra/lesson-05-inequalities/).
- [T4 — Đạo hàm và cực trị một biến](../../04-Calculus-1var/lesson-05-applications-derivative/) (nền cho tối ưu không ràng buộc).

---

## 1. Bài toán tối ưu là gì?

💡 **Trực giác — tìm điểm tốt nhất trong một "khu vực được phép".** Hình dung bạn đứng trên một sườn đồi và muốn lên **điểm cao nhất**, nhưng bị giăng dây thừng quây lại một khu — chỉ được đi trong khu đó. "Cao nhất" là **hàm mục tiêu (objective function)**; "đi đâu" là **biến quyết định (decision variable)**; "dây thừng quây khu" là **ràng buộc (constraint)**. Tối ưu = tìm chỗ cao nhất *mà chân vẫn còn trong khu*. Hai khả năng:

- Đỉnh cao nhất nằm **bên trong** khu → đó là cực trị "tự do" (đạo hàm bằng 0), ràng buộc không cản → **tối ưu không ràng buộc**.
- Đỉnh nằm **ngoài** khu, nên chỗ tốt nhất bị **đẩy ra sát dây** (biên) → ràng buộc "chặt" → **tối ưu có ràng buộc** (LP, Lagrange).

Rất nhiều quyết định thực tế có đúng dạng này: *"chọn phương án làm một đại lượng lớn nhất (hoặc nhỏ nhất), nhưng phải nằm trong giới hạn nguồn lực"*. Sản xuất bao nhiêu mỗi loại để lời nhất *khi* gỗ và công có hạn? Pha khẩu phần rẻ nhất *mà* đủ dinh dưỡng? Đặt giá bán bao nhiêu để lợi nhuận lớn nhất?

### 1.1 Ba thành phần của mọi bài toán tối ưu

Mọi bài toán tối ưu có 3 thành phần:
- **Biến quyết định (decision variable)**: cái ta chọn (số sản phẩm $x$, $y$; giá bán $p$; số lượng đặt hàng $q$...).
- **Hàm mục tiêu (objective function)**: cái cần cực đại/cực tiểu (lợi nhuận $P$, chi phí $C$, diện tích $A$).
- **Ràng buộc (constraint)**: giới hạn — $\\le$ (nguồn lực có hạn), $\\ge$ (yêu cầu tối thiểu), $=$ (cân đối/đẳng thức).

Dạng tổng quát viết gọn:

$$\\max_{x}\\ f(x) \\quad \\text{(hoặc } \\min_x f(x)\\text{)} \\qquad \\text{với điều kiện} \\quad g_i(x) \\le c_i,\\ \\ x \\ge 0$$

### 1.2 Phân loại bài toán tối ưu

| Loại | Hàm mục tiêu | Ràng buộc | Công cụ giải |
|------|--------------|-----------|--------------|
| **Không ràng buộc** | bất kỳ (khả vi) | không (hoặc "lỏng") | $f'(x) = 0$, kiểm $f''$ (mục 2) |
| **Quy hoạch tuyến tính (LP)** | tuyến tính | bất phương trình tuyến tính | đồ thị / simplex (mục 3) |
| **Ràng buộc đẳng thức** | trơn (khả vi) | đẳng thức $g = c$ | nhân tử Lagrange (mục 4) |
| **Rời rạc / nguyên (integer)** | bất kỳ | biến nguyên | duyệt / nhánh-cận (mục 5.5) |

💡 **Nhận diện nhanh "max hay min?"** Đọc đề tìm động từ mục tiêu: *"lời nhất / lớn nhất / nhiều nhất"* → **max**; *"rẻ nhất / ít nhất / tiết kiệm"* → **min**. Mọi bài min đều đổi thành max bằng cách lấy dấu trừ ($\\min f = -\\max(-f)$), nên lý thuyết chỉ cần học một chiều.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không cứ thử hết mọi phương án rồi chọn cái tốt nhất?"* Vì biến thường **liên tục** (giá có thể là 99.000 hay 99.001...) → vô hạn phương án, không thử hết được. Tối ưu cho ta cách *tính thẳng* ra điểm tốt nhất.
- *"Bài toán có chắc luôn có nghiệm không?"* Không. Nếu miền khả thi rỗng (ràng buộc mâu thuẫn) → **vô nghiệm**; nếu mục tiêu tăng mãi không chặn → **vô cực (unbounded)**. Mô hình tốt phải tránh hai trường hợp này.

🔁 **Dừng lại tự kiểm tra**

1. Phân loại các bài sau dùng công cụ nào: (a) "đặt giá vé bao nhiêu để doanh thu lớn nhất, không giới hạn"; (b) "trộn 2 nguyên liệu rẻ nhất, mỗi chất ít nhất X"; (c) "diện tích lớn nhất với chu vi cố định 40".

<details><summary>Đáp án</summary>

(a) **Không ràng buộc** → $R'(p) = 0$. (b) **LP (min)** — mục tiêu & ràng buộc tuyến tính, dấu $\\ge$. (c) **Lagrange** — ràng buộc đẳng thức (chu vi $= 40$). 

</details>

📝 **Tóm tắt mục 1**: tối ưu = chọn **biến quyết định** để cực trị **hàm mục tiêu** thỏa các **ràng buộc**. Phân loại theo dạng mục tiêu/ràng buộc → chọn công cụ: $f'=0$ (không ràng buộc), đồ thị/simplex (LP), Lagrange (đẳng thức), duyệt (rời rạc).

---

## 2. Tối ưu không ràng buộc (đạo hàm bằng 0)

💡 **Trực giác — đỉnh đồi là chỗ "đường nằm ngang".** Khi đi bộ lên đồi, ngay tại **đỉnh** mặt đất phẳng ngang một thoáng — độ dốc bằng 0. Đáy thung lũng cũng vậy. Độ dốc của đồ thị hàm chính là **đạo hàm $f'(x)$**. Nên cực trị (nếu nằm bên trong miền, không bị ràng buộc đẩy ra biên) chỉ có thể ở chỗ $f'(x) = 0$. Đó là điểm dừng (stationary point).

> 📐 **Định nghĩa đầy đủ — Điểm dừng & tiêu chuẩn đạo hàm cấp 2**
>
> **(a) Là gì**: Với hàm khả vi $f(x)$, **điểm dừng** là $x^*$ thỏa $f'(x^*) = 0$. Để phân biệt cực đại / cực tiểu, xét dấu **đạo hàm cấp 2 $f''(x^*)$**: $f'' < 0$ → cực **đại** (đồ thị cong xuống như mái vòm), $f'' > 0$ → cực **tiểu** (cong lên như cái bát), $f'' = 0$ → chưa kết luận (xét thêm).
>
> **(b) Vì sao cần**: Đây là công cụ tối ưu **cơ bản nhất** — khi không có ràng buộc nào "chặt", chỉ cần giải một phương trình $f'(x) = 0$. Vô số mô hình kinh tế (giá tối ưu, sản lượng tối ưu, cỡ lô đặt hàng tiết kiệm) quy về dạng này. Nó cũng là **viên gạch nền** cho mọi thuật toán tối ưu nâng cao (gradient descent trong ML là "lăn xuống dốc" tới chỗ $f' = 0$).
>
> **(c) Ví dụ số — lợi nhuận một loại sản phẩm**: Một quán bán $q$ ly trà sữa/ngày. Doanh thu $R(q) = 50q - 0{,}5q^2$ (giá giảm khi bán nhiều — co giãn cầu); chi phí $C(q) = 10q + 200$. Lợi nhuận $P(q) = R - C = 40q - 0{,}5q^2 - 200$. Đạo hàm $P'(q) = 40 - q$; cho $= 0 \\Rightarrow q = 40$. Kiểm $P''(q) = -1 < 0$ → cực **đại**. Vậy bán **40 ly/ngày**, lợi nhuận $P(40) = 40\\cdot 40 - 0{,}5\\cdot 1600 - 200 = 1600 - 800 - 200 = $ **600**.

### 2.1 Quy trình 3 bước

> **Bước 1 — lập hàm mục tiêu một biến** $f(x)$ từ đề (dồn mọi thứ về một biến quyết định; nếu có 2 biến ràng buộc nhau bằng đẳng thức, dùng đẳng thức để khử bớt một biến).
>
> **Bước 2 — giải $f'(x) = 0$** tìm các điểm dừng $x^*$.
>
> **Bước 3 — phân loại** bằng $f''(x^*)$ (hoặc xét dấu $f'$ quanh $x^*$): $f'' < 0$ → cực đại, $f'' > 0$ → cực tiểu. Đừng quên kiểm **biên miền** nếu $x$ bị chặn (vd $q \\ge 0$).

### 2.2 Walk-through ví dụ 1 — giá bán tối đa lợi nhuận

**Đề**: Một cửa hàng nhập áo giá vốn 100 (nghìn)/cái. Ở mức giá bán $p$, mỗi tháng bán được $D(p) = 500 - 2p$ cái (giá càng cao bán càng ít). Đặt giá $p$ bao nhiêu để **lợi nhuận lớn nhất**?

- **Bước 1 — lập hàm**: Lợi nhuận = (giá bán − giá vốn) × số bán:
$$P(p) = (p - 100)\\,(500 - 2p) = -2p^2 + 700p - 50000$$
- **Bước 2 — đạo hàm bằng 0**:
$$P'(p) = -4p + 700 = 0 \\ \\Rightarrow\\ p = 175$$
- **Bước 3 — phân loại**: $P''(p) = -4 < 0$ → cực **đại** ✓. Số bán $D(175) = 500 - 350 = 150$ cái; lợi nhuận $P(175) = (175 - 100)\\cdot 150 = 75 \\cdot 150 = $ **11.250** (nghìn).

→ **Đặt giá 175 nghìn/áo**, bán 150 cái/tháng, lời 11,25 triệu. Verify lân cận: $p = 170 \\Rightarrow P = 70\\cdot 160 = 11200 < 11250$ ✓; $p = 180 \\Rightarrow P = 80\\cdot 140 = 11200 < 11250$ ✓ — đúng là đỉnh.

### 2.3 Walk-through ví dụ 2 — chi phí tồn kho tối thiểu (cỡ lô EOQ)

**Đề**: Một cửa hàng bán 1.200 thùng nước/năm. Mỗi lần đặt hàng tốn phí cố định 30 (nghìn) bất kể số lượng; phí lưu kho 6 (nghìn)/thùng/năm (tính trên tồn kho trung bình). Đặt mỗi lần bao nhiêu thùng $q$ để **tổng chi phí nhỏ nhất**?

- **Bước 1 — lập hàm**: Số lần đặt/năm $= 1200/q$ → phí đặt $= 30\\cdot \\frac{1200}{q} = \\frac{36000}{q}$. Tồn kho trung bình $= q/2$ → phí lưu kho $= 6\\cdot \\frac{q}{2} = 3q$. Tổng:
$$C(q) = \\frac{36000}{q} + 3q, \\qquad q > 0$$
- **Bước 2 — đạo hàm bằng 0**: $C'(q) = -\\dfrac{36000}{q^2} + 3 = 0 \\Rightarrow q^2 = 12000 \\Rightarrow q = \\sqrt{12000} \\approx \\mathbf{109{,}5}$ thùng.
- **Bước 3 — phân loại**: $C''(q) = \\dfrac{72000}{q^3} > 0$ với $q > 0$ → cực **tiểu** ✓.

→ Đặt **~110 thùng/lần** (≈ 11 lần/năm). Chi phí $C(109{,}5) = \\frac{36000}{109{,}5} + 3\\cdot 109{,}5 \\approx 328{,}8 + 328{,}5 \\approx$ **657** (nghìn). Lưu ý đặc trưng EOQ: tại tối ưu **phí đặt = phí lưu kho** (cùng ≈ 329) — đó là dấu hiệu cân bằng đẹp của bài toán này.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Giải $f'(x) = 0$ ra nhiều nghiệm thì chọn cái nào?"* Tính $f$ tại tất cả nghiệm (và tại biên miền nếu có), rồi chọn giá trị lớn nhất (cho max) / nhỏ nhất (cho min). Đừng dừng ở nghiệm đầu tiên.
- *"$f''(x^*) = 0$ thì sao?"* Tiêu chuẩn cấp 2 *thất bại*, phải xét dấu $f'$ hai bên $x^*$ (đổi $+\\to-$: cực đại; $-\\to+$: cực tiểu; không đổi: điểm yên ngựa, không phải cực trị).
- *"Vì sao tối ưu không ràng buộc lại liên quan tới có ràng buộc?"* Vì nếu cực trị tự do *vô tình* nằm trong miền khả thi thì nó cũng là nghiệm của bài có ràng buộc. Luôn thử nó trước; chỉ khi nó *ngoài* miền mới phải đẩy ra biên (LP/Lagrange).

⚠ **Lỗi thường gặp — quên kiểm $f''$ (hoặc quên biên).** Giải $f'(x)=0$ mới chỉ tìm *điểm dừng*, **chưa** biết max hay min. Ví dụ $f(x) = x^3$ có $f'(0)=0$ nhưng $x=0$ **không** là cực trị (điểm uốn). Luôn kiểm $f''$ hoặc dấu $f'$. Ngoài ra nếu $x$ bị chặn (vd $0 \\le q \\le 100$) mà điểm dừng nằm ngoài đoạn, cực trị rơi vào **đầu mút** — phải so cả hai biên.

🔁 **Dừng lại tự kiểm tra**

1. Cực đại $P(q) = 30q - 0{,}25q^2 - 100$ (lợi nhuận theo sản lượng $q \\ge 0$). Tìm $q$ và $P$ tối ưu.

<details><summary>Đáp án</summary>

$P'(q) = 30 - 0{,}5q = 0 \\Rightarrow q = 60$. $P''(q) = -0{,}5 < 0$ → cực **đại**. $P(60) = 30\\cdot 60 - 0{,}25\\cdot 3600 - 100 = 1800 - 900 - 100 = $ **800**. Vậy sản xuất **60 đơn vị**, lời 800.

</details>

### 📝 Tóm tắt mục 2

- Cực trị tự do (không ràng buộc) nằm ở **điểm dừng** $f'(x) = 0$.
- Phân loại bằng $f''$: $<0$ cực đại, $>0$ cực tiểu, $=0$ chưa kết luận (xét dấu $f'$).
- Mô hình thực: giá bán tối ưu, cỡ lô đặt hàng (EOQ), sản lượng tối ưu — đều quy về một biến rồi $f' = 0$.
- Nhớ kiểm **biên miền** khi biến bị chặn.

---

## 3. Quy hoạch tuyến tính (LP)

💡 **Trực giác — đẩy thước tới mép.** Khi mục tiêu và ràng buộc đều *tuyến tính*, miền các phương án hợp lệ là một **đa giác lồi**. Hàm mục tiêu là họ đường thẳng song song; tối ưu = đẩy đường đó xa nhất theo hướng tốt mà vẫn chạm miền → luôn chạm tại **một đỉnh**.

> 📐 **Định nghĩa đầy đủ — Quy hoạch tuyến tính & miền khả thi**
>
> **(a) Là gì**: LP = bài toán cực trị một hàm mục tiêu *tuyến tính* dưới các ràng buộc *tuyến tính* (bất phương trình/phương trình bậc nhất). **Miền khả thi** = tập mọi $(x, y)$ thỏa *tất cả* ràng buộc — giao của các nửa mặt phẳng, là một đa giác lồi.
>
> **(b) Vì sao cần**: Vô số bài thực tế (sản xuất, vận tải, khẩu phần, phân bổ vốn) khớp dạng này. LP có lý thuyết đẹp (nghiệm ở đỉnh) và thuật toán hiệu quả (đơn hình — simplex, điểm trong) giải được bài hàng triệu biến — xương sống của *vận trù học (operations research)*.
>
> **(c) Ví dụ số**: Xưởng mộc làm **bàn** ($x$ cái, lời 40 nghìn) và **ghế** ($y$ cái, lời 30 nghìn). Mỗi bàn tốn 2 tấm gỗ + 1 giờ công; mỗi ghế tốn 1 tấm gỗ + 3 giờ công. Trong tuần có 40 tấm gỗ, 45 giờ công. Làm bao nhiêu bàn, bao nhiêu ghế để lời nhất? Mô hình:
> > Cực đại $P = 40x + 30y$; ràng buộc $2x + y \\le 40$ (gỗ), $x + 3y \\le 45$ (công), $x \\ge 0$, $y \\ge 0$.

### 3.1 Quy trình 5 bước giải LP bằng đồ thị

> **Bước 1 — đặt biến quyết định** từ câu hỏi "ta chọn cái gì?" (số bàn $x$, số ghế $y$).
>
> **Bước 2 — viết hàm mục tiêu** $P$ theo biến, ghi rõ max hay min.
>
> **Bước 3 — dịch mỗi câu "có hạn / yêu cầu" thành một bất phương trình** + luôn thêm $x \\ge 0, y \\ge 0$.
>
> **Bước 4 — vẽ miền khả thi** (giao các nửa mặt phẳng) và tìm **mọi đỉnh** (giao từng cặp đường ràng buộc, giữ lại điểm thỏa *tất cả* ràng buộc).
>
> **Bước 5 — tính $P$ tại từng đỉnh**, chọn đỉnh cho giá trị tốt nhất.

### 3.2 Giải ví dụ xưởng mộc (walk-through đầy đủ)

**Lập mô hình từ lời văn** (bước 1–3 đã có ở định nghĩa trên). **Vẽ miền khả thi** — hai đường ràng buộc cắt nhau cùng hai trục tạo một tứ giác:

\`\`\`
 y
 45 +.
    | .                  đường gỗ:   2x + y = 40  (dốc đứng)
    |  .                 đường công: x + 3y = 45  (thoải)
    |   .
 15 +----.____           miền khả thi = vùng tô (dưới CẢ hai đường,
    |####|####.___                       trong góc phần tư x,y ≥ 0)
 10 +####|########* (15,10)  ← giao gỗ ∩ công
    |####|########|.
    |####|########| .
    |####|########|  .
  0 +####+--------+---*------ x
    0    .       15   20
         .            ↑
       (0,15)       (20,0) chạm gỗ
       chạm công

 Bốn đỉnh:  (0,0) · (20,0) · (15,10) · (0,15)
\`\`\`

**Tìm các đỉnh của miền khả thi** (giao các đường ràng buộc):
- $(0, 0)$: $P = 0$.
- $(20, 0)$: chạm gỗ $2x = 40$; công $20 \\le 45$ ✓. $P = 40 \\cdot 20 = $ **800**.
- $(0, 15)$: chạm công $3y = 45$; gỗ $15 \\le 40$ ✓. $P = 30 \\cdot 15 = $ **450**.
- Giao gỗ $\\cap$ công: $2x + y = 40$ và $x + 3y = 45$. Từ pt1: $y = 40 - 2x$. Thế: $x + 3(40 - 2x) = 45 \\to x + 120 - 6x = 45 \\to -5x = -75 \\to$ **$x = 15, y = 10$**. Kiểm gỗ $30+10 = 40$ ✓, công $15+30 = 45$ ✓. $P = 40 \\cdot 15 + 30 \\cdot 10 = 600 + 300 = $ **900**.

**So các đỉnh**: $P = 0, 800, 450,$ **900** → tối ưu tại **$(15, 10)$, $P = 900$**. Tức làm **15 bàn + 10 ghế** mỗi tuần thì lời nhất = **900 nghìn**, dùng hết cả 40 gỗ lẫn 45 công (cả hai ràng buộc đều "chặt").

💡 **Hình dung đường mức hàm mục tiêu trượt qua miền.** Mỗi giá trị lợi nhuận cố định $P = k$ là một đường thẳng $40x + 30y = k$. Tăng $k$ → đường tịnh tiến song song ra xa gốc. Đẩy tới khi đường *vừa chạm* miền lần cuối — điểm chạm cuối cùng là đỉnh tối ưu:

\`\`\`
 y
    \\   \\   \\   \\        các đường mức P = 300, 600, 900...
     \\   \\   \\   \\       (song song, càng xa gốc P càng lớn)
      \\ ##\\###\\## \\
       \\##*\\(15,10) ← đường P=900 chạm miền lần cuối tại đây
        \\##\\####\\  \\
 ────────\\───\\────\\──\\──── x
          \\   \\    \\  \\
\`\`\`

### 3.3 Ví dụ LP thứ hai — bài khẩu phần (minimization)

**Đề**: Pha một khẩu phần ăn từ hai loại thực phẩm: **gạo** ($x$ phần, 2 nghìn/phần) và **đậu** ($y$ phần, 3 nghìn/phần). Mỗi phần gạo cho 3 đơn vị tinh bột + 1 đơn vị đạm; mỗi phần đậu cho 1 tinh bột + 2 đạm. Khẩu phần cần **ít nhất** 12 tinh bột và **ít nhất** 8 đạm. Pha sao cho **rẻ nhất**?

**Lập mô hình** (mục tiêu min, ràng buộc $\\ge$):
$$\\min\\ C = 2x + 3y \\quad\\text{với}\\quad 3x + y \\ge 12,\\ \\ x + 2y \\ge 8,\\ \\ x \\ge 0,\\ y \\ge 0$$

**Miền khả thi** ở đây nằm *phía trên* hai đường (vì $\\ge$), không bị chặn lên trên — nhưng min vẫn ở đỉnh dưới:

\`\`\`
 y
12 *.                  miền khả thi = vùng PHÍA TRÊN cả hai đường
   | .                 (ràng buộc ≥, mở lên trên-phải)
   |  .   #############
   |   . ##############
 4 +    *##############   ← (3.2, 2.4) giao hai đường
   |   #.###############
   |  ##.################
   | ###.################
 0 +----*------*--------- x
   0    4      8
      (4,0)  đạm chạm tại (8,0)
\`\`\`

**Tìm đỉnh** (giao từng cặp ràng buộc chặt):
- $(0, 12)$: chạm tinh bột $y = 12$; đạm $0 + 24 = 24 \\ge 8$ ✓. $C = 3\\cdot 12 = $ **36**.
- $(8, 0)$: chạm đạm $x = 8$; tinh bột $24 \\ge 12$ ✓. $C = 2\\cdot 8 = $ **16**.
- Giao tinh bột $\\cap$ đạm: $3x + y = 12$ và $x + 2y = 8$. Từ pt1: $y = 12 - 3x$. Thế: $x + 2(12 - 3x) = 8 \\to x + 24 - 6x = 8 \\to -5x = -16 \\to x = 3{,}2,\\ y = 12 - 9{,}6 = 2{,}4$. $C = 2\\cdot 3{,}2 + 3\\cdot 2{,}4 = 6{,}4 + 7{,}2 = $ **13,6**.

**So các đỉnh**: $C = 36,\\ 16,\\ \\mathbf{13{,}6}$ → rẻ nhất tại **$(3{,}2,\\ 2{,}4)$, $C = 13{,}6$ nghìn**. Tức trộn **3,2 phần gạo + 2,4 phần đậu**, vừa đủ cả 12 tinh bột lẫn 8 đạm (cả hai ràng buộc chặt). Đây chính là bài "diet problem" kinh điển — bài LP thực tế đầu tiên trong lịch sử (Stigler, 1945).

### 3.4 Vì sao nghiệm luôn ở đỉnh?

💡 Hàm mục tiêu tuyến tính tăng đều theo một hướng (gradient không đổi). Trong một đa giác lồi, đi theo hướng tăng sẽ luôn dẫn ra **biên**, rồi dọc biên tới một **đỉnh** — không thể có cực đại ở giữa miền (ở đó còn đi tiếp được). Nên chỉ cần *kiểm tra hữu hạn đỉnh*, không cần quét cả miền vô hạn điểm. (Ngoại lệ: nếu mục tiêu song song một cạnh → cả cạnh tối ưu, nhưng đỉnh vẫn nằm trong số nghiệm.)

**Kiểm bằng số — điểm trong miền luôn thua đỉnh.** Lấy bài xưởng mộc, thử một điểm *bên trong* miền, vd $(10, 5)$ (gỗ $25 \\le 40$, công $25 \\le 45$ — đều lỏng): $P = 40\\cdot 10 + 30\\cdot 5 = 550$. Còn nhỏ hơn cả đỉnh tệ nhất $(0,15)$ cho $450$? Không — $550 > 450$, nhưng vẫn **thua xa** đỉnh tối ưu $(15,10)$ cho $900$. Điểm trong miền *luôn* còn đi tiếp được theo hướng tăng (cả gỗ lẫn công đều dư) → chưa thể tối ưu. Chỉ khi *kẹt* ở đỉnh — mọi hướng đi tiếp đều vi phạm một ràng buộc — mới hết cải thiện.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ xét giao điểm các ràng buộc?"* Vì đỉnh đa giác = nơi *hai* ràng buộc cùng "chặt" (dấu =). Nghiệm tối ưu ở đỉnh → tìm đỉnh = giải các cặp phương trình ràng buộc.
- *"Nhiều biến thì sao, vẽ đồ thị được không?"* Không (4D+ không vẽ nổi). Khi đó dùng **simplex**: đi từ đỉnh này sang đỉnh kề tốt hơn cho tới khi không cải thiện được — chính là khai thác "nghiệm ở đỉnh" một cách có hệ thống.

⚠ **Lỗi thường gặp — quên ràng buộc $x, y \\ge 0$.** Bỏ ràng buộc không âm → miền khả thi sai, có thể ra nghiệm "sản xuất $-5$ cái". Luôn kèm $x \\ge 0, y \\ge 0$ cho biến vật lý.

🔁 **Dừng lại tự kiểm tra**

1. Với bài trên, nếu lời mỗi **bàn** tăng lên 60 ($P = 60x + 30y$), đỉnh $(20,0)$ cho $P$ bao nhiêu? So với $(15,10)$.

<details><summary>Đáp án</summary>

$(20,0)$: $P = 60 \\cdot 20 = $ **1200**. $(15,10)$: $P = 60 \\cdot 15 + 30 \\cdot 10 = 900 + 300 = $ **1200**. *Hòa nhau* → mục tiêu song song cạnh nối $(20,0)$–$(15,10)$, cả cạnh đó tối ưu (mọi điểm trên cạnh cho $P = 1200$). Tăng lời bàn thêm nữa → $(20,0)$ thắng (chỉ làm bàn).

</details>

### 📝 Tóm tắt mục 3

- LP: cực trị mục tiêu tuyến tính dưới ràng buộc tuyến tính; miền khả thi = đa giác lồi.
- Quy trình 5 bước: đặt biến → mục tiêu → ràng buộc (+ không âm) → vẽ miền & tìm đỉnh → so $P$ các đỉnh.
- Nghiệm tối ưu luôn ở **một đỉnh** → chỉ kiểm tra hữu hạn đỉnh (đồ thị) hoặc dùng simplex (nhiều biến).
- Áp dụng cả max (sản xuất, đường mức đẩy ra xa) lẫn min (khẩu phần, đường mức đẩy về gần).
- Nhớ ràng buộc không âm.

---

## 4. Nhân tử Lagrange (ràng buộc đẳng thức)

💡 **Trực giác — tiếp xúc đường mức.** Khi ràng buộc là *đẳng thức* $g(x,y) = c$ (đi đúng trên một đường cong), tối ưu $f$ xảy ra ở chỗ **đường mức của $f$ tiếp xúc đường ràng buộc**. Tại đó hai gradient cùng phương: $\\nabla f = \\lambda \\cdot \\nabla g$. Vì nếu $\\nabla f$ còn thành phần dọc theo đường ràng buộc, ta đi tiếp được để tăng $f$.

> 📐 **Định nghĩa đầy đủ — Nhân tử Lagrange $\\lambda$**
>
> **(a) Là gì**: Để cực trị $f(x,y)$ với ràng buộc $g(x,y) = c$, giải hệ **$\\nabla f = \\lambda \\nabla g$** cùng với $g = c$. Số $\\lambda$ là *nhân tử Lagrange*.
>
> **(b) Vì sao cần — và $\\lambda$ nghĩa là gì**: Nó biến bài toán *có ràng buộc* thành giải hệ phương trình *không ràng buộc*. Quan trọng hơn, $\\lambda = $ **giá bóng (shadow price)**: tốc độ thay đổi giá trị tối ưu khi nới lỏng ràng buộc, $df^*/dc = \\lambda$. Tức "nếu có thêm 1 đơn vị nguồn lực $c$ thì mục tiêu tăng $\\lambda$" — cực kỳ hữu ích trong kinh tế (giá trị cận biên của tài nguyên).
>
> **(c) Ví dụ số — rào mảnh vườn**: Bạn có **20 m hàng rào**, muốn quây một mảnh vườn hình chữ nhật (cạnh $x, y$) sao cho **diện tích lớn nhất**. Chu vi $2(x+y) = 20$ → ràng buộc $g = x + y = 10$; mục tiêu $f = x \\cdot y$. $\\nabla f = (y, x)$, $\\nabla g = (1, 1)$ → $y = \\lambda$, $x = \\lambda$ → **$x = y = 5$** → vườn **vuông $5 \\times 5$**, diện tích $= 25$ m². $\\lambda = 5 = $ giá bóng: mua thêm hàng rào để $x+y = 11$ thì diện tích tối ưu $\\approx 30.25$ m², tức **thêm 1 m "tổng cạnh" ($\\approx 2$ m rào) cho thêm ~5 m² vườn**. Kiểm: $f^*(c) = (c/2)^2 \\to df^*/dc = c/2 = 5$ tại $c = 10$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tối ưu lại là hình vuông?"* Vì với chu vi cố định, tích $x \\cdot y$ lớn nhất khi hai cạnh bằng nhau (bất đẳng thức AM–GM). Lagrange cho ra điều này một cách máy móc qua $\\nabla f = \\lambda \\nabla g$.
- *"$\\lambda$ âm/dương nghĩa là gì?"* Dấu cho biết nới ràng buộc làm mục tiêu tăng ($\\lambda > 0$) hay giảm. Độ lớn $|\\lambda| = $ mức nhạy. $\\lambda \\approx 0$ → ràng buộc "lỏng", gần như không ảnh hưởng tối ưu.

⚠ **Lỗi thường gặp — quên phương trình ràng buộc $g = c$.** Hệ Lagrange gồm $\\nabla f = \\lambda \\nabla g$ *và* $g = c$ (đủ phương trình cho $x, y, \\lambda$). Chỉ giải $\\nabla f = \\lambda \\nabla g$ là thiếu, ra vô số nghiệm theo $\\lambda$.

🔁 **Dừng lại tự kiểm tra**

1. Cực đại $f = x \\cdot y$ với $x + y = 20$. Tìm $x, y$, diện tích và $\\lambda$.

<details><summary>Đáp án</summary>

$\\nabla f = (y,x) = \\lambda(1,1)$ → $x = y$; ràng buộc $x + y = 20$ → **$x = y = 10$**, diện tích $= 100$. $\\lambda = x = 10$ (giá bóng: nới tổng lên 21 → diện tích $\\approx 110.25$, tăng ~10).

</details>

### 4.1 Walk-through Lagrange thứ hai — hộp tốn ít vật liệu nhất

**Đề**: Làm một **hộp đáy vuông không nắp** chứa đúng **32 lít** (thể tích $V = 32$). Đáy cạnh $x$, chiều cao $h$. Dùng **ít vật liệu nhất** (tối thiểu diện tích bề mặt). Tìm $x, h$.

- **Ràng buộc đẳng thức**: thể tích $g = x^2 h = 32$.
- **Mục tiêu**: diện tích (đáy + 4 thành) $f = x^2 + 4xh$ (không nắp → chỉ 1 đáy).
- **Gradient** (theo $x, h$): $\\nabla f = (2x + 4h,\\ 4x)$, $\\nabla g = (2xh,\\ x^2)$.
- **Hệ $\\nabla f = \\lambda \\nabla g$**:
$$\\begin{aligned}
2x + 4h &= \\lambda\\,(2xh) \\\\
4x &= \\lambda\\,(x^2) \\ \\Rightarrow\\ \\lambda = \\tfrac{4}{x}
\\end{aligned}$$
Thế $\\lambda = 4/x$ vào pt đầu: $2x + 4h = \\frac{4}{x}\\cdot 2xh = 8h \\Rightarrow 2x = 4h \\Rightarrow x = 2h$. Kết với $x^2 h = 32$: $(2h)^2 h = 4h^3 = 32 \\Rightarrow h^3 = 8 \\Rightarrow h = 2,\\ x = 4$.

→ Hộp **đáy $4\\times 4$, cao $2$** (thể tích $4^2\\cdot 2 = 32$ ✓). Diện tích nhỏ nhất $f = 16 + 4\\cdot 4\\cdot 2 = 16 + 32 = $ **48**. Verify lân cận: $x = 3, h = 32/9 \\approx 3{,}56 \\Rightarrow f = 9 + 4\\cdot 3\\cdot 3{,}56 \\approx 9 + 42{,}7 = 51{,}7 > 48$ ✓.

### 📝 Tóm tắt mục 4

- Lagrange: cực trị $f$ với $g = c$ → giải $\\nabla f = \\lambda \\nabla g$ *và* $g = c$.
- $\\lambda = $ giá bóng $= df^*/dc$: mục tiêu thay đổi bao nhiêu khi nới 1 đơn vị ràng buộc.
- Tại tối ưu, đường mức $f$ tiếp xúc đường ràng buộc.
- Dùng được cho cả bài hình học (hộp ít vật liệu, vườn lớn nhất) lẫn kinh tế (tối ưu dưới ngân sách).

---

## 5. Mô hình tối ưu thực tế

Phần này gom các **mô hình kinh điển** — mỗi mô hình chỉ rõ biến / mục tiêu / ràng buộc và thuộc loại nào, để khi gặp bài lời văn bạn nhận ra ngay nên dùng công cụ gì.

### 5.1 Mô hình sản xuất (product mix)

**Tình huống**: nhà máy làm nhiều loại sản phẩm, mỗi loại tiêu tốn các nguồn lực chung (máy, giờ công, nguyên liệu) khác nhau, mỗi loại lời khác nhau.

| Thành phần | Cụ thể |
|------------|--------|
| Biến | $x_i$ = số đơn vị sản phẩm loại $i$ |
| Mục tiêu | $\\max \\sum \\text{lời}_i \\cdot x_i$ |
| Ràng buộc | mỗi nguồn lực: $\\sum (\\text{tiêu hao}_{i})\\,x_i \\le$ tổng có; $x_i \\ge 0$ |
| Loại | **LP** |

Đây chính là bài xưởng mộc (mục 3.2). Trong thực tế hàng trăm sản phẩm × hàng chục nguồn lực → giải bằng simplex/solver.

### 5.2 Mô hình khẩu phần (diet)

**Tình huống**: trộn các nguyên liệu sao cho **rẻ nhất** mà vẫn đủ mọi yêu cầu dinh dưỡng (calo, đạm, vitamin...).

| Thành phần | Cụ thể |
|------------|--------|
| Biến | $x_j$ = lượng nguyên liệu $j$ |
| Mục tiêu | $\\min \\sum \\text{giá}_j \\cdot x_j$ |
| Ràng buộc | mỗi chất: $\\sum (\\text{hàm lượng}_{j})\\,x_j \\ge$ nhu cầu; $x_j \\ge 0$ |
| Loại | **LP (min)** |

Đã giải ở mục 3.3. Cùng khung này áp cho "trộn xăng/hợp kim đạt chuẩn rẻ nhất", "pha thức ăn chăn nuôi".

### 5.3 Mô hình vận tải (transportation)

**Tình huống**: $m$ kho (cung $s_i$) chở hàng tới $n$ cửa hàng (cầu $d_j$); chi phí chở 1 đơn vị từ kho $i$ tới cửa hàng $j$ là $c_{ij}$. Lập kế hoạch chở **rẻ nhất**.

| Thành phần | Cụ thể |
|------------|--------|
| Biến | $x_{ij}$ = lượng chở từ kho $i$ tới cửa hàng $j$ |
| Mục tiêu | $\\min \\sum_{i,j} c_{ij}\\,x_{ij}$ |
| Ràng buộc | mỗi kho chở hết: $\\sum_j x_{ij} = s_i$; mỗi cửa hàng đủ hàng: $\\sum_i x_{ij} = d_j$; $x_{ij} \\ge 0$ |
| Loại | **LP** (dạng đặc biệt, có thuật toán riêng nhanh hơn) |

**Ví dụ nhỏ**: 2 kho (cung 30, 20), 2 cửa hàng (cầu 25, 25), chi phí $c = \\begin{pmatrix} 4 & 6 \\\\ 5 & 3\\end{pmatrix}$. Cách rẻ: kho 2 (rẻ tới cửa hàng 2: giá 3) chở hết 20 cho cửa hàng 2; kho 1 chở 25 tới cửa hàng 1 (giá 4) + 5 còn lại tới cửa hàng 2 (giá 6). Tổng $= 4\\cdot 25 + 6\\cdot 5 + 3\\cdot 20 = 100 + 30 + 60 = $ **190**.

### 5.4 Mô hình định giá & sản lượng (calculus)

**Tình huống**: chọn giá $p$ (hoặc sản lượng $q$) để tối đa lợi nhuận, với cầu phụ thuộc giá $D(p)$.

| Thành phần | Cụ thể |
|------------|--------|
| Biến | giá $p$ (hoặc sản lượng $q$) |
| Mục tiêu | $\\max P(p) = (p - \\text{vốn})\\,D(p)$ |
| Ràng buộc | thường không (hoặc $p \\ge$ vốn) → **tối ưu không ràng buộc** |
| Loại | $P'(p) = 0$ |

Đã giải ở mục 2.2 (giá áo) và 2.3 (EOQ). Đây là cầu nối tối ưu ↔ kinh tế vi mô: tại tối ưu **doanh thu cận biên = chi phí cận biên** ($R'(q) = C'(q)$) — viết lại của $P'(q) = 0$.

### 5.5 Tối ưu rời rạc / nguyên (integer programming)

⚠ **Khi biến phải là số nguyên** (không thể làm 3,2 chiếc xe), không được làm tròn nghiệm LP một cách ngây thơ — nghiệm nguyên tối ưu có thể *không* là điểm tròn gần nghiệm LP.

💡 **Trực giác**: LP cho nghiệm trong cả miền liên tục; ép về lưới điểm nguyên có thể *trượt khỏi* đỉnh. Phải duyệt các điểm nguyên trong miền (với bài nhỏ) hoặc dùng **nhánh-cận (branch and bound)** (bài lớn).

**Ví dụ knapsack (xếp ba lô)**: ba lô tải tối đa 10 kg. Có 3 món: A (6 kg, giá trị 8), B (5 kg, giá trị 6), C (4 kg, giá trị 5). Chọn tập món **tổng cân $\\le 10$**, **tổng giá trị lớn nhất** (mỗi món lấy 0 hoặc 1 — biến nhị phân). Duyệt các tổ hợp khả thi:

| Chọn | Cân | Giá trị |
|------|-----|---------|
| A | 6 | 8 |
| B | 5 | 6 |
| C | 4 | 5 |
| B+C | 9 | **11** |
| A+C | 10 | 13 |
| A+B | 11 | ✗ quá tải |

→ Tối ưu **A+C** (cân 10, giá trị **13**). Đây là **0/1 knapsack** — bài tối ưu nguyên NP-khó kinh điển; với $n$ lớn dùng quy hoạch động (xem [Tier 5 — tổ hợp & thuật toán](../../05-NumberTheory-Combinatorics-Logic/lesson-08-algorithmic-thinking/) nếu muốn đi sâu).

### 📝 Tóm tắt mục 5

- **Sản xuất / khẩu phần / vận tải** → LP (max hoặc min, ràng buộc bất phương trình).
- **Định giá / sản lượng / EOQ** → tối ưu không ràng buộc ($f' = 0$).
- **Vườn / hộp dưới đẳng thức** → Lagrange.
- **Biến nguyên (knapsack, phân công)** → tối ưu rời rạc; không làm tròn nghiệm LP ngây thơ.

---

## 6. Bài tập

**Bài 1.** Tiệm bánh làm bánh kem ($x$) lời 5, bánh mì ($y$) lời 4. Lò nướng tối đa 10 mẻ/ngày ($x + y \\le 10$); bột đủ cho $2x + y \\le 16$. Cực đại $P = 5x + 4y$ với $x, y \\ge 0$. Liệt kê các đỉnh và tìm tối ưu.

**Bài 2.** Giải thích trong vài câu vì sao nghiệm LP luôn nằm ở một đỉnh của miền khả thi.

**Bài 3.** Cực đại $f = x \\cdot y$ với ràng buộc $3x + 2y = 12$ (dùng Lagrange). Tìm $x, y, f$ và $\\lambda$.

**Bài 4.** Diễn giải ý nghĩa thực tế của giá bóng $\\lambda$ trong Bài 3 (nếu ràng buộc là "ngân sách $= 12$").

**Bài 5.** Một bài LP có ràng buộc không âm bị bỏ quên, cho nghiệm tối ưu $x = 8, y = -3$. Sai ở đâu và cần thêm gì?

**Bài 6** (tối ưu không ràng buộc). Một quán cà phê bán $q$ ly/ngày với doanh thu $R(q) = 60q - q^2$ và chi phí $C(q) = 12q + 150$. Tìm $q$ để lợi nhuận lớn nhất và lợi nhuận đó.

**Bài 7** (EOQ). Cửa hàng bán 800 thùng/năm, phí đặt 50/lần, phí lưu kho 4/thùng/năm. Tìm cỡ lô đặt hàng $q$ tối ưu (tổng chi phí nhỏ nhất).

**Bài 8** (Lagrange — hình học). Tìm điểm trên đường thẳng $x + y = 10$ sao cho tổng bình phương $f = x^2 + y^2$ nhỏ nhất. Cho biết $\\lambda$ và ý nghĩa.

**Bài 9** (rời rạc — knapsack). Ba lô tải tối đa 8 kg. Món A (5 kg, giá 9), B (4 kg, giá 7), C (3 kg, giá 5). Mỗi món lấy 0 hoặc 1. Chọn tập tối ưu.

---

## 7. Lời giải chi tiết

**Bài 1.** Đỉnh:
- $(0,0)$: $P = 0$.
- $(8,0)$: từ $2x \\le 16 \\to x \\le 8$; $x+y$: $8 \\le 10$ ✓. $P = 40$.
- $(0,10)$: $x+y = 10$; $2x+y = 10 \\le 16$ ✓. $P = 40$.
- Giao $x+y=10 \\cap 2x+y=16$: trừ → $x = 6, y = 4$. $P = 5 \\cdot 6+4 \\cdot 4 = 30+16 = $ **46**.
→ Tối ưu **$(6,4)$, $P = 46$**: làm **6 bánh kem + 4 bánh mì**/ngày, lời 46.

**Bài 2.** Hàm mục tiêu tuyến tính có gradient (hướng tăng) không đổi. Trong miền lồi, từ bất kỳ điểm trong nào còn có thể đi theo hướng gradient để tăng mục tiêu → cực đại không thể ở trong miền, phải ở biên; dọc biên (cũng tuyến tính) lại tiếp tục tăng tới một đỉnh. Vậy tối ưu đạt tại đỉnh (nơi hai ràng buộc cùng chặt). Hệ quả: chỉ cần kiểm tra hữu hạn đỉnh.

**Bài 3.** $\\nabla f = (y, x)$, $\\nabla g = (3, 2)$ → $y = 3\\lambda$, $x = 2\\lambda$. Ràng buộc $3x + 2y = 12 \\to 3(2\\lambda) + 2(3\\lambda) = 12 \\to 12\\lambda = 12 \\to \\lambda = 1$ → **$x = 2, y = 3$**, $f = x \\cdot y = $ **6**. $\\lambda = $ **1**.

**Bài 4.** $\\lambda = 1 = $ giá bóng của ngân sách: nếu ngân sách tăng từ 12 lên 13, giá trị tối ưu $f$ tăng thêm $\\approx 1$ (lên $\\approx 7$). Nó cho biết "1 đồng ngân sách thêm đáng giá bao nhiêu" — căn cứ quyết định có nên vay/đầu tư thêm nguồn lực không.

**Bài 5.** Bỏ ràng buộc không âm → miền khả thi mở rộng sang vùng vô lý; $y = -3$ nghĩa "sản xuất âm 3 đơn vị", không có nghĩa vật lý. Cần thêm **$x \\ge 0, y \\ge 0$** rồi giải lại; nghiệm đúng sẽ nằm ở đỉnh của miền *có* ràng buộc không âm.

**Bài 6.** Lợi nhuận $P(q) = R - C = 60q - q^2 - 12q - 150 = -q^2 + 48q - 150$.
- $P'(q) = -2q + 48 = 0 \\Rightarrow q = 24$. $P''(q) = -2 < 0$ → cực **đại** ✓.
- $P(24) = -576 + 48\\cdot 24 - 150 = -576 + 1152 - 150 = $ **426**. → Bán **24 ly/ngày**, lời **426**. (Verify $q=23$: $-529+1104-150=425<426$ ✓.)

**Bài 7.** Phí đặt $= 50\\cdot \\frac{800}{q} = \\frac{40000}{q}$; phí lưu kho $= 4\\cdot \\frac{q}{2} = 2q$. Tổng $C(q) = \\frac{40000}{q} + 2q$.
- $C'(q) = -\\frac{40000}{q^2} + 2 = 0 \\Rightarrow q^2 = 20000 \\Rightarrow q = \\sqrt{20000} \\approx $ **141,4**. $C''(q) = \\frac{80000}{q^3} > 0$ → cực **tiểu** ✓.
- → Đặt **~141 thùng/lần**. $C \\approx \\frac{40000}{141{,}4} + 2\\cdot 141{,}4 \\approx 283 + 283 = $ **566** (phí đặt = phí lưu kho, đúng đặc trưng EOQ).

**Bài 8.** Ràng buộc $g = x + y = 10$; mục tiêu $f = x^2 + y^2$. $\\nabla f = (2x, 2y)$, $\\nabla g = (1,1)$ → $2x = \\lambda$, $2y = \\lambda$ → $x = y$. Kết với $x + y = 10$ → **$x = y = 5$**, $f = 25 + 25 = $ **50**. $\\lambda = 2x = $ **10**. Ý nghĩa giá bóng: nới $x + y = 11$ → $x=y=5{,}5$, $f = 60{,}5$, tăng $\\approx 10{,}5 \\approx \\lambda$. (Trực giác: điểm trên đường gần gốc O nhất là chân đường vuông góc, nằm chính giữa.)

**Bài 9.** Duyệt các tập có tổng cân $\\le 8$:

| Chọn | Cân | Giá |
|------|-----|-----|
| A | 5 | 9 |
| B | 4 | 7 |
| C | 3 | 5 |
| B+C | 7 | **12** |
| A+C | 8 | 14 |
| A+B | 9 | ✗ quá tải |

→ Tối ưu **A+C** (cân 8, giá **14**). Lưu ý A+C *vừa khít* tải trọng và thắng B+C; không thể thêm món nào nữa.

---

## 8. Bài tiếp theo

[Lesson 07 — Mô hình ngẫu nhiên (Monte Carlo, Markov)](../lesson-07-stochastic-monte-carlo/): khi hệ có yếu tố *ngẫu nhiên*, ta mô hình bằng xác suất thay vì phương trình tất định.

## 📝 Tổng kết

1. **Tối ưu** = chọn **biến quyết định** để cực trị **hàm mục tiêu** thỏa **ràng buộc**. Phân loại → chọn công cụ.
2. **Không ràng buộc**: cực trị ở $f'(x) = 0$; phân loại bằng $f''$ ($<0$ max, $>0$ min). Mô hình: giá tối ưu, EOQ, sản lượng tối ưu. Nhớ kiểm biên.
3. **LP**: mục tiêu + ràng buộc tuyến tính → miền khả thi lồi; nghiệm ở **đỉnh** (đồ thị/simplex). Quy trình 5 bước; dùng cho cả max (sản xuất) lẫn min (khẩu phần). Nhớ $x, y \\ge 0$.
4. **Lagrange**: ràng buộc đẳng thức → $\\nabla f = \\lambda \\nabla g$ *và* $g = c$. Dùng cho vườn/hộp/tối ưu dưới ngân sách.
5. **$\\lambda = $ giá bóng** $= df^*/dc$: giá trị cận biên của nới lỏng ràng buộc.
6. **Mô hình thực**: sản xuất / khẩu phần / vận tải (LP), định giá / EOQ ($f'=0$), knapsack / phân công (tối ưu rời rạc — không làm tròn nghiệm LP ngây thơ).
`;
