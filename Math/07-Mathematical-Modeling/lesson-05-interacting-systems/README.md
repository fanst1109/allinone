# Lesson 05 — Hệ tương tác (Lotka–Volterra, SIR)

## Mục tiêu

- Mô hình hóa **nhiều biến tác động lẫn nhau** bằng *hệ* phương trình vi phân.
- **Thú–mồi (Lotka–Volterra)**: vì sao hai quần thể dao động lệch pha; quỹ đạo tuần hoàn trong mặt phẳng pha.
- **Dịch bệnh SIR**: chia dân số S–I–R; số sinh sản cơ bản $R_0$; ngưỡng bùng dịch và đỉnh dịch.
- Giả định nền và hạn chế; hướng mở rộng (SEIR).

## Kiến thức tiền đề

- [Lesson 04 — Mô hình liên tục (ODE)](../lesson-04-continuous-ode-models/).
- [T6 L07 — ODE](../../06-Advanced/lesson-07-differential-equations/); [T6 L03 — trị riêng](../../06-Advanced/lesson-03-eigenvalues-eigenvectors/) (phân tích ổn định).

---

## 1. Hệ phương trình vi phân

💡 **Trực giác — "nhiều đại lượng ảnh hưởng lẫn nhau".** Đến giờ mỗi mô hình chỉ có *một* biến ($N$, $T$, $S$). Nhưng thực tế các đại lượng **ảnh hưởng lẫn nhau**: số thú phụ thuộc số mồi, số người nhiễm phụ thuộc số người khỏe. Khi đó tốc độ thay đổi của mỗi biến phụ thuộc *cả những biến khác* → ta có **hệ ODE** (nhiều phương trình giải đồng thời).

Hình dung **hai cái xích đu nối với nhau bằng lò xo**: đẩy một cái, lò xo kéo cái kia, rồi cái kia phản hồi ngược lại. Bạn không thể mô tả chiếc xích đu thứ nhất mà bỏ qua chiếc thứ hai — chuyển động của cái này *là một phần* của định luật chi phối cái kia. Một biến (single ODE) như **một** chiếc xích đu cô lập; hệ ODE như **mạng lưới xích đu** ràng buộc nhau. Toán học bắt buộc: phải giải **cùng lúc**, không thể giải xong biến này rồi mới sang biến kia.

Một cách nhìn khác — **bảng điều khiển có nhiều kim đồng hồ**: mỗi kim (biến) nhích theo tốc độ riêng, nhưng tốc độ đó lại đọc từ *vị trí của các kim khác*. Tất cả nhúc nhích đồng thời, khóa chặt vào nhau.

Dạng tổng quát 2 biến:
$$\begin{cases} \dfrac{dx}{dt} = f(x, y) \\[6pt] \dfrac{dy}{dt} = g(x, y) \end{cases}$$
Điểm mấu chốt: vế phải của **mỗi** phương trình chứa **cả $x$ lẫn $y$**. Nếu $f$ chỉ phụ thuộc $x$ và $g$ chỉ phụ thuộc $y$ thì hai phương trình **rời nhau (decoupled)** — giải độc lập như hai bài 1 biến, không có "tương tác". Sự **ghép cặp (coupling)** nằm đúng ở chỗ biến này xuất hiện trong phương trình của biến kia.

Không gian $(x, y)$ gọi là **mặt phẳng pha (phase plane)**; mỗi điều kiện đầu vẽ một **quỹ đạo (trajectory)** trong đó. Hành vi dài hạn = quỹ đạo tiến tới đâu (điểm cân bằng, vòng kín, hay phân kỳ).

### 1.1. Đọc mặt phẳng pha — trục là gì, mũi tên là gì

💡 **Trực giác.** Mặt phẳng pha **không** vẽ "biến theo thời gian" như đồ thị thường ($x$ trục ngang là *thời gian*). Thay vào đó, **mỗi trục là một biến**: trục ngang $x$, trục dọc $y$. Một **điểm** $(x, y)$ = "trạng thái hiện tại của cả hệ" (vd "20 con mồi, 10 con thú"). Thời gian $t$ bị **giấu đi** — nó là tham số chạy *dọc theo* đường cong.

Tại mỗi điểm, hệ cho ta một **vector vận tốc** $\left(\dfrac{dx}{dt}, \dfrac{dy}{dt}\right)$ — mũi tên chỉ "trạng thái sẽ trôi về hướng nào tiếp theo". Gắn mũi tên lên khắp mặt phẳng → **trường vector (vector field)**; quỹ đạo là đường đi *thuận theo các mũi tên*.

```
   y
   ↑    ↖  ↑  ↗            mỗi mũi tên = (dx/dt, dy/dt)
   │   ←  •  →   quỹ đạo bám theo mũi tên
   │    ↙  ↓  ↘            (• = một trạng thái (x,y))
   └──────────────→ x
```

**Ba kiểu hành vi dài hạn** mà quỹ đạo có thể có:

| Kiểu | Hình dạng quỹ đạo | Ví dụ trong bài |
|------|-------------------|-----------------|
| **Hút về điểm cân bằng** | xoáy ốc/đi thẳng vào 1 điểm rồi dừng | SIR tiến tới $(S_\infty, 0, R_\infty)$ |
| **Vòng kín (closed orbit)** | đường cong khép kín, lặp mãi | Lotka–Volterra dao động tuần hoàn |
| **Phân kỳ** | trôi ra vô cực | quần thể bùng nổ không kiểm soát |

### 1.2. Bốn ví dụ hệ tương tác thực tế

Để thấy "hệ ODE" không chỉ là toán suông, đây là **bốn** tình huống đời thực mà các đại lượng khóa chặt vào nhau:

1. **Thú–mồi (sinh thái)**: thỏ $x$ và cáo $y$. Thỏ nuôi cáo, cáo ăn thỏ → dao động tuần hoàn. (Mục 2.)
2. **Dịch bệnh (dịch tễ)**: người khỏe $S$, nhiễm $I$, khỏi $R$. Người nhiễm "chuyển hóa" người khỏe thành nhiễm mới. (Mục 3.)
3. **Cạnh tranh hai loài (sinh thái)**: hai loài cùng ăn một nguồn tài nguyên (vd hai loài chim tranh hạt). Loài này đông thì loài kia thiệt — có thể dẫn tới "loại trừ cạnh tranh" (một loài tuyệt chủng) hoặc cùng tồn tại. (Mục 2.4.)
4. **Phản ứng hóa học dao động (Belousov–Zhabotinsky)**: nồng độ hai chất trung gian tăng/giảm xen kẽ, làm dung dịch **đổi màu tuần hoàn** — bằng chứng nhìn thấy được của vòng kín trong mặt phẳng pha hóa học.

Thêm hai ví dụ ngoài bài (để thấy độ phổ quát): **đua vũ trang quân sự** (mô hình Richardson: chi tiêu vũ khí của nước A kích chi tiêu của nước B và ngược lại); **giá–tồn kho thị trường** (giá cao → sản xuất nhiều → tồn kho tăng → giá giảm → ... dao động kinh tế).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không giải lần lượt từng biến cho gọn?"* Vì $\frac{dx}{dt}$ cần biết $y$ *tại cùng thời điểm*, mà $y$ lại đang thay đổi theo $\frac{dy}{dt}$ vốn cần biết $x$. Hai biến tiến hóa **đồng thời, khóa nhau** — đóng băng một biến để giải biến kia sẽ cho kết quả sai.
- *"Mặt phẳng pha khác đồ thị $x(t)$ thế nào?"* Đồ thị $x(t)$ và $y(t)$ là **hai đường riêng** theo trục thời gian (thấy "khi nào đỉnh"). Mặt phẳng pha gộp lại thành **một** đường trong không gian $(x,y)$ (thấy "hình dạng tương tác": vòng kín? xoáy? thẳng?). Hai cách nhìn bổ trợ nhau.

🔁 **Dừng lại tự kiểm tra**

1. Hệ $\frac{dx}{dt} = -x$, $\frac{dy}{dt} = -2y$ có phải "hệ tương tác" thực sự không?

<details><summary>Đáp án</summary>

**Không** — đây là hệ **rời nhau (decoupled)**: $\frac{dx}{dt}$ chỉ chứa $x$, $\frac{dy}{dt}$ chỉ chứa $y$. Giải độc lập: $x(t) = x_0 e^{-t}$, $y(t) = y_0 e^{-2t}$. Không có số hạng nào trộn $x$ với $y$ → không có "tương tác". Tương tác thật cần biến này nằm trong phương trình của biến kia (vd số hạng $xy$).

</details>

📝 **Tóm tắt mục 1**: hệ ODE mô tả nhiều biến **khóa nhau** (coupling: biến này trong phương trình biến kia); phân tích qua **mặt phẳng pha** (mỗi trục một biến, điểm = trạng thái, mũi tên = vận tốc) và các **điểm cân bằng**. Ba hành vi dài hạn: hút về điểm, vòng kín, phân kỳ.

---

## 2. Mô hình thú–mồi Lotka–Volterra

💡 **Trực giác.** Thỏ (mồi $x$) và cáo (thú $y$). Không cáo → thỏ sinh sôi mũ. Có cáo → thỏ bị ăn (giảm theo số chạm thỏ×cáo). Cáo không thỏ → chết đói (giảm mũ); ăn được thỏ → sinh thêm. Kết quả: hai bên **đuổi nhau theo chu kỳ** — thỏ nhiều → cáo tăng → thỏ giảm → cáo đói giảm → thỏ lại tăng...

### 2.1. Xây dựng mô hình — từng số hạng nghĩa là gì

Trước khi viết hệ, hãy **dựng từng số hạng từ lời** để không học vẹt:

| Cơ chế sinh học | Phụ thuộc | Số hạng toán | Dấu |
|-----------------|-----------|--------------|-----|
| Mồi sinh sản (không cáo) | tỉ lệ số mồi $x$ | $+\alpha x$ | tăng $x$ |
| Mồi bị săn | tỉ lệ *chạm* mồi×thú | $-\beta xy$ | giảm $x$ |
| Thú sinh nhờ ăn mồi | tỉ lệ *chạm* mồi×thú | $+\delta xy$ | tăng $y$ |
| Thú chết tự nhiên (không mồi) | tỉ lệ số thú $y$ | $-\gamma y$ | giảm $y$ |

Ghép lại thành **mô hình**:
$$\begin{cases} \dfrac{dx}{dt} = \alpha x - \beta xy & \text{(mồi: sinh mũ − bị săn)} \\[6pt] \dfrac{dy}{dt} = \delta xy - \gamma y & \text{(thú: sinh nhờ ăn − chết tự nhiên)} \end{cases}$$
$\alpha$: tốc độ sinh mồi; $\beta$: hiệu quả săn; $\delta$: hiệu quả chuyển mồi thành thú; $\gamma$: tốc độ chết của thú. Số hạng $xy$ = tần suất "chạm nhau" (giả định trộn đều).

💡 **Vì sao số hạng tương tác là $xy$ chứ không phải $x + y$?** Tần suất hai cá thể "gặp nhau" tỉ lệ với *tích* — giống va chạm phân tử trong hóa học (mục 1.2, ví dụ 4). Nếu có $x=40$ mồi và $y=10$ thú, số "cặp gặp tiềm năng" $\approx 40 \times 10 = 400$; gấp đôi mồi ($x=80$) thì số cặp gấp đôi (800). Tổng $x+y$ thì **sai bản chất**: 40 mồi + 0 thú cho $x+y=40$ nhưng số cuộc săn phải bằng **0** (không có thú nào săn), còn $xy = 40\times 0 = 0$ ✓ — đúng.

### 2.2. Tìm điểm cân bằng — giải từng bước

**Điểm cân bằng (equilibrium / fixed point)** = trạng thái mà **cả hai** đạo hàm bằng 0 → hệ đứng yên. Giải hệ:
$$\begin{cases} \alpha x - \beta xy = 0 \\ \delta xy - \gamma y = 0 \end{cases} \Rightarrow \begin{cases} x(\alpha - \beta y) = 0 \\ y(\delta x - \gamma) = 0 \end{cases}$$

Mỗi phương trình cho **2 lựa chọn** (đặt từng nhân tử = 0):
- PT1: $x = 0$ **hoặc** $y = \alpha/\beta$.
- PT2: $y = 0$ **hoặc** $x = \gamma/\delta$.

Ghép các lựa chọn tương thích:
- **$(0, 0)$**: chọn $x=0$ và $y=0$ → cùng tuyệt chủng.
- **$(x^*, y^*) = (\gamma/\delta,\ \alpha/\beta)$**: chọn $x = \gamma/\delta$ và $y = \alpha/\beta$ → cùng tồn tại. Quanh điểm này, quỹ đạo là **vòng kín** → dao động tuần hoàn không tắt.

(Các ghép còn lại — vd $x=0$ và $x=\gamma/\delta$ — mâu thuẫn, loại.)

⚠ **Để ý điểm "lạ"**: $x^*$ (mồi cân bằng) phụ thuộc $\gamma, \delta$ — **tham số của thú**; $y^*$ (thú cân bằng) phụ thuộc $\alpha, \beta$ — **tham số của mồi**. Tức là *mức cân bằng của loài này do loài kia quyết định* — một phản trực giác thú vị: muốn nhiều thú hơn, không phải tăng tham số thú, mà chỉnh tham số mồi.

### 2.3. Walk-through số — một vòng dao động đầy đủ

**Walk-through số**: $\alpha = 1$, $\beta = 0.1$, $\delta = 0.075$, $\gamma = 1.5$.
- $x^* = \gamma/\delta = 1.5/0.075 = $ **20** (mồi cân bằng); $y^* = \alpha/\beta = 1/0.1 = $ **10** (thú cân bằng).
- Bắt đầu lệch khỏi $(20,10)$, vd $(40, 9)$: mồi đông → $\frac{dy}{dt} = 0.075 \cdot 40 \cdot 9 - 1.5 \cdot 9 = 27 - 13.5 = +13.5 > 0$ → thú tăng; rồi thú đông ăn bớt mồi... → vòng tuần hoàn.

**Theo dõi 4 pha của một chu kỳ** (đọc dấu của hai đạo hàm tại mỗi pha):

| Pha | Trạng thái thô | $\frac{dx}{dt}=x(\alpha-\beta y)$ | $\frac{dy}{dt}=y(\delta x-\gamma)$ | Diễn giải |
|-----|----------------|-----------------------------------|------------------------------------|-----------|
| ① | mồi đông, thú ít ($x$ lớn, $y$ nhỏ) | $+$ ($y<10$) | $+$ ($x>20$) | cả hai tăng — thú bắt đầu hưởng lợi |
| ② | cả hai đông ($x$ lớn, $y$ lớn) | $-$ ($y>10$) | $+$ ($x>20$) | mồi bị ăn bớt, thú vẫn tăng |
| ③ | mồi ít, thú đông | $-$ ($y>10$) | $-$ ($x<20$) | cả hai giảm — thú thiếu ăn |
| ④ | cả hai ít | $+$ ($y<10$) | $-$ ($x<20$) | mồi hồi phục, thú còn đói giảm |

Kiểm chứng số tại pha ②, lấy $(x,y)=(40, 12)$:
$$\frac{dx}{dt} = 40(1 - 0.1\cdot 12) = 40(1 - 1.2) = 40\cdot(-0.2) = -8 < 0 \;\checkmark \text{ (mồi giảm)}$$
$$\frac{dy}{dt} = 12(0.075\cdot 40 - 1.5) = 12(3 - 1.5) = 12\cdot 1.5 = +18 > 0 \;\checkmark \text{ (thú tăng)}$$
→ đúng pha ②. Bốn pha nối tiếp tạo **chu trình đi ngược chiều kim đồng hồ** quanh $(20, 10)$.

### 2.3b. Mặt phẳng pha và quỹ đạo — ASCII

Vẽ quỹ đạo trong mặt phẳng pha $(x = \text{mồi}, y = \text{thú})$ — đường khép kín quanh điểm cân bằng $(20, 10)$, đi **ngược chiều kim đồng hồ** (theo thứ tự pha ①→②→③→④):

```
   y (thú)
    │
 16 │           ╭─────────╮        ② mồi & thú đều đông
    │        ╭──╯    ↑    ╰──╮       (mồi bắt đầu giảm)
 12 │      ╭─╯   ③       ②  ╰─╮
    │     ╱    thú đông       ╲
 10 │····•·········●·········•····  y* = 10 (cân bằng)
    │     ╲   mồi ít     mồi đông╱
  8 │      ╰─╮   ④       ①  ╭─╯
    │        ╰──╮    ↓    ╭──╯
  4 │           ╰─────────╯        ④ cả hai ít → mồi hồi phục
    │
    └────┼────────┼────────┼────── x (mồi)
        10       20       40
                 x* = 20
            ● = điểm cân bằng (20,10)
   ↺ ngược chiều kim đồng hồ: ① → ② → ③ → ④ → ①
```

Cùng thông tin nhìn **theo thời gian** (hai đường $x(t)$, $y(t)$) — thấy rõ **lệch pha**: đỉnh thú đến *sau* đỉnh mồi:

```
   số lượng
    │      ╱╲ mồi (x)              ╱╲
 40 │     ╱  ╲                    ╱  ╲
    │    ╱    ╲     ╱╲ thú (y)   ╱    ╲
 20 │···╱······╲···╱··╲·········╱······╲···
    │  ╱        ╲ ╱    ╲       ╱        ╲
    │ ╱          X      ╲     ╱
    └─────────────────────────────────→ t
         ↑     ↑
       đỉnh   đỉnh thú (trễ)
       mồi
```

**Walk-through Euler giải số một bước** — xem hệ "chạy" cụ thể từ một trạng thái. Euler: $x_{\text{mới}} = x + \frac{dx}{dt}\cdot \Delta t$ (xem [Lesson 04 — ODE](../lesson-04-continuous-ode-models/) cho phương pháp Euler 1 biến). Lấy $(x_0, y_0) = (40, 9)$, bước $\Delta t = 0.1$:

$$\begin{aligned}
\frac{dx}{dt}\Big|_0 &= \alpha x_0 - \beta x_0 y_0 = 1\cdot 40 - 0.1\cdot 40\cdot 9 = 40 - 36 = +4 \\
\frac{dy}{dt}\Big|_0 &= \delta x_0 y_0 - \gamma y_0 = 0.075\cdot 40\cdot 9 - 1.5\cdot 9 = 27 - 13.5 = +13.5 \\[4pt]
x_1 &= x_0 + \tfrac{dx}{dt}\Delta t = 40 + 4\cdot 0.1 = 40.4 \\
y_1 &= y_0 + \tfrac{dy}{dt}\Delta t = 9 + 13.5\cdot 0.1 = 10.35
\end{aligned}$$

Sau 1 bước: $(40.4,\ 10.35)$ — mồi tăng nhẹ, thú tăng nhanh hơn (đang ở pha ① chuyển ②). Lặp hàng nghìn bước nhỏ → vẽ ra cả quỹ đạo. **Cảnh báo toy method**: Euler đơn giản với hệ vòng kín "thật" sẽ **trôi xoáy ra** (sai số tích lũy làm biên độ phình to giả) — thực tế dùng Runge–Kutta bậc 4 hoặc tích phân bảo toàn. Euler ở đây chỉ để *thấy cơ chế cập nhật*, không để mô phỏng dài chính xác.

### 2.4. Mở rộng — mô hình cạnh tranh hai loài

💡 **Trực giác.** Không phải mọi tương tác là "ăn nhau". Hai loài cùng tranh **một nguồn tài nguyên** (hạt, nước, ánh sáng) thì *cả hai cùng kìm hãm nhau* — đông loài này thì loài kia thiệt. Khác thú–mồi (một bên lợi một bên hại), đây là **cùng hại**.

Mô hình cạnh tranh Lotka–Volterra (mỗi loài có sức chứa $K$ riêng, bị loài kia "lấn"):
$$\begin{cases} \dfrac{dx}{dt} = r_1 x\left(1 - \dfrac{x + a_{12}\,y}{K_1}\right) \\[8pt] \dfrac{dy}{dt} = r_2 y\left(1 - \dfrac{y + a_{21}\,x}{K_2}\right) \end{cases}$$
$a_{12}$ = mức loài $y$ lấn vào "phần ăn" của loài $x$. **Kết cục** phụ thuộc tham số: (a) một loài thắng → loài kia tuyệt chủng (*loại trừ cạnh tranh — competitive exclusion*); (b) **cùng tồn tại** ở một điểm cân bằng ổn định nếu mỗi loài tự kìm mình mạnh hơn kìm loài kia. Đây là ví dụ thứ 3 trong [danh sách hệ tương tác](#12-bốn-ví-dụ-hệ-tương-tác-thực-tế).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dao động lệch pha chứ không đồng pha?"* Vì thú phản ứng *sau* mồi: phải có nhiều mồi *trước*, thú mới tăng *sau*; đỉnh thú đến sau đỉnh mồi. Đó là độ trễ tạo vòng đuổi nhau.
- *"Số hạng $x \cdot y$ nghĩa là gì?"* Tần suất gặp gỡ thú–mồi tỉ lệ *tích* hai số lượng (giống va chạm phân tử). Đây là **giả định trộn đều** — mọi thú gặp mọi mồi như nhau.
- *"Vì sao gọi là vòng kín 'trung tính' (neutral cycle)?"* Vì biên độ dao động **chỉ phụ thuộc điều kiện đầu** — lệch nhiều thì vòng to, lệch ít thì vòng nhỏ, và vòng đó cứ lặp **mãi** không lớn lên cũng không tắt. Khác **chu trình giới hạn (limit cycle)** thật (mục dưới), nơi mọi quỹ đạo bị hút về *cùng một* vòng bất kể bắt đầu ở đâu.
- *"Quần thể có thể về 0 rồi 'sống lại' không?"* Trong toy model lý tưởng (liên tục, không nhiễu): không — quỹ đạo vòng kín không bao giờ chạm trục, $x, y$ luôn $>0$. Nhưng nếu biên độ quá lớn, số mồi xuống *rất gần 0*; thực tế khi đó **một con cuối cùng chết là tuyệt chủng vĩnh viễn** — đây là một lý do toy model phi thực tế.

### 2.5. Chu trình giới hạn (limit cycle) — phân biệt với vòng kín trung tính

💡 **Là gì.** **Chu trình giới hạn** là một quỹ đạo **khép kín cô lập** mà các quỹ đạo lân cận đều **xoáy về phía nó** (hoặc xoáy ra xa). Khác hẳn vòng kín "trung tính" của Lotka–Volterra:

| | Vòng kín trung tính (Lotka–Volterra) | Chu trình giới hạn (limit cycle) |
|---|---|---|
| Biên độ | tùy điều kiện đầu (vô số vòng lồng nhau) | **một** biên độ cố định, hút mọi quỹ đạo về |
| Bền với nhiễu | **không** (đẩy nhẹ → đổi vòng) | **có** (đẩy nhẹ → quay lại vòng cũ) |
| Ví dụ | thú–mồi cổ điển | nhịp tim, phản ứng BZ, dao động Van der Pol |

**Vì sao quan trọng?** Hệ sinh học thật (nhịp tim, đồng hồ sinh học circadian) **dao động bền** — đẩy lệch một chút rồi tự về nhịp cũ. Vòng kín trung tính *không* giải thích được tính bền đó; cần limit cycle. Sửa Lotka–Volterra (thêm sức chứa cho mồi) có thể biến vòng trung tính thành điểm hút *hoặc* limit cycle, tùy tham số.

⚠ **Hai lỗi thường gặp với Lotka–Volterra**

**Lỗi A — coi Lotka–Volterra là chính xác sinh thái.** Mô hình bỏ qua sức chứa môi trường, tuổi, không gian, nhiều loài. Dao động vòng kín "trung tính" rất nhạy (nhiễu nhỏ đổi biên độ) — thực tế hệ sinh thái ổn định hơn. Đây là **toy model** kinh điển để hiểu *cơ chế* dao động, không để dự báo chính xác số thỏ.

**Lỗi B — bỏ quên/nhầm dấu số hạng tương tác $xy$.** Đây là lỗi *cơ học* hay gặp nhất khi tự viết hệ:
- **Bỏ số hạng $xy$**: viết $\frac{dx}{dt} = \alpha x$, $\frac{dy}{dt} = -\gamma y$ → hai phương trình **rời nhau**, mồi bùng nổ mũ còn thú tắt mũ, **mất hoàn toàn** sự đuổi nhau. Số hạng $xy$ chính *là* tương tác — bỏ nó là bỏ cả mô hình.
- **Nhầm dấu**: mồi *bị ăn* nên phải là $-\beta xy$ (giảm $x$); thú *được lợi* nên phải là $+\delta xy$ (tăng $y$). Đảo dấu (cho mồi $+\beta xy$, thú $-\delta xy$) là mô tả "mồi sinh ra nhờ gặp thú" — vô nghĩa sinh học, và mô hình sẽ cho hành vi sai (cả hai cùng bùng nổ). **Mẹo nhớ**: ai bị hại thì dấu $-$, ai hưởng lợi thì dấu $+$ ở số hạng $xy$.

🔁 **Dừng lại tự kiểm tra**

1. Với $\alpha=1$, $\beta=0.1$, $\delta=0.075$, $\gamma=1.5$, nếu hệ đang ở đúng $(x^*, y^*) = (20, 10)$ thì điều gì xảy ra theo thời gian?

<details><summary>Đáp án</summary>

Cả hai đạo hàm = 0 → hệ **đứng yên** tại $(20, 10)$ mãi (điểm cân bằng). Chỉ khi lệch khỏi điểm này mới sinh dao động vòng quanh nó.

</details>

2. Tại trạng thái $(x, y) = (10, 20)$ (mồi ít, thú đông) với cùng tham số trên, tính dấu của $\frac{dx}{dt}$ và $\frac{dy}{dt}$. Đây là pha nào trong 4 pha?

<details><summary>Đáp án</summary>

$\frac{dx}{dt} = 10(1 - 0.1\cdot 20) = 10(1 - 2) = -10 < 0$ (mồi giảm). $\frac{dy}{dt} = 20(0.075\cdot 10 - 1.5) = 20(0.75 - 1.5) = 20\cdot(-0.75) = -15 < 0$ (thú giảm). Cả hai giảm → **pha ③** (mồi ít, thú đông, cả hai đang tụt — thú thiếu ăn).

</details>

### 📝 Tóm tắt mục 2

- Lotka–Volterra: $\frac{dx}{dt} = \alpha x - \beta xy$, $\frac{dy}{dt} = \delta xy - \gamma y$; $xy$ = tần suất gặp (trộn đều), **tích** chứ không phải tổng.
- Điểm cân bằng tìm bằng cách phân tích nhân tử: $(0,0)$ và cùng tồn tại $(\gamma/\delta,\ \alpha/\beta)$; mức cân bằng loài này do tham số loài kia quyết định.
- Quanh điểm cân bằng → quỹ đạo **vòng kín ngược chiều kim đồng hồ** → dao động lệch pha (thú trễ sau mồi); 4 pha đọc qua dấu hai đạo hàm.
- **Vòng kín trung tính** ≠ **chu trình giới hạn** (limit cycle bền với nhiễu, hút mọi quỹ đạo).
- Mở rộng: cạnh tranh hai loài (cùng hại) → loại trừ cạnh tranh hoặc cùng tồn tại.
- 2 lỗi: coi là chính xác sinh thái; bỏ/nhầm dấu số hạng $xy$.
- Toy model cho *cơ chế*, không dự báo chính xác.

---

## 3. Mô hình dịch bệnh SIR

💡 **Trực giác.** Chia dân số thành 3 nhóm: **S** (Susceptible — chưa nhiễm, có thể nhiễm), **I** (Infected — đang nhiễm và lây), **R** (Recovered/Removed — đã khỏi/miễn dịch hoặc cách ly). Người dịch chuyển S → I → R. Dịch bùng khi mỗi ca lây cho hơn 1 người.

**Mô hình** (dân số $N = S + I + R$ không đổi):
$$\begin{cases} \dfrac{dS}{dt} = -\dfrac{\beta S I}{N} & \text{(khỏe → nhiễm)} \\[6pt] \dfrac{dI}{dt} = \dfrac{\beta S I}{N} - \gamma I & \text{(nhiễm mới − khỏi)} \\[6pt] \dfrac{dR}{dt} = \gamma I & \text{(khỏi)} \end{cases}$$
$\beta$: tốc độ lây (số tiếp xúc hiệu quả/người/ngày); $\gamma$: tốc độ khỏi ($1/\gamma$ = số ngày nhiễm trung bình).

> 📐 **Định nghĩa đầy đủ — Số sinh sản cơ bản $R_0$**
>
> **(a) Là gì**: $R_0 = \beta/\gamma$ = số người trung bình mà **một** ca nhiễm lây ra, trong dân số *toàn bộ còn nhạy cảm* (đầu dịch, $S \approx N$).
>
> **(b) Vì sao cần**: $R_0$ là *ngưỡng* quyết định dịch bùng hay tắt. $\frac{dI}{dt} = I \cdot (\beta S/N - \gamma)$; đầu dịch $S/N \approx 1$ nên $\frac{dI}{dt} > 0 \iff \beta > \gamma \iff$ **$R_0 > 1$**. Một con số duy nhất tóm tắt "dịch có lan không". Cũng cho **ngưỡng miễn dịch cộng đồng** $1 - 1/R_0$.
>
> **(c) Ví dụ số**: $\beta = 0.4$/ngày, $\gamma = 0.1$/ngày (nhiễm ~10 ngày) → $R_0 = 4$ → mỗi ca lây 4 người → bùng mạnh. Sởi $R_0 \approx 12$–$18$; cúm mùa $\approx 1.3$; COVID gốc $\approx 2.5$–$3$. Ngưỡng miễn dịch cộng đồng với $R_0 = 4$: $1 - 1/4 = $ **75%** dân cần miễn dịch để chặn dịch.

### 3.1. Walk-through số — toàn bộ diễn tiến một trận dịch

**Walk-through số**: $N = 1000$, $I_0 = 1$, $S_0 = 999$, $\beta = 0.4$, $\gamma = 0.1$ ($R_0 = 4$).
- Đầu dịch $\frac{dI}{dt} \approx 1 \cdot (0.4 \cdot 999/1000 - 0.1) = 1 \cdot (0.3996 - 0.1) \approx +0.3$ → $I$ tăng.
- $I$ tăng đến **đỉnh** khi $\frac{dI}{dt} = 0 \iff \beta S/N = \gamma \iff S = \gamma N/\beta = N/R_0 = 1000/4 = $ **250**. Khi $S$ giảm xuống 250, dịch đạt đỉnh rồi thoái.
- Cuối dịch: không phải ai cũng nhiễm — còn một phần $S_0$ "sống sót" (giải qua phương trình cuối dịch).

**Đỉnh dịch — vì sao đúng tại $S = N/R_0$, bằng số.** $\frac{dI}{dt} = I\left(\dfrac{\beta S}{N} - \gamma\right)$. Số ca $I$ vẫn còn $>0$, nên dấu của $\frac{dI}{dt}$ do dấu của ngoặc quyết định:
$$\frac{dI}{dt} = 0 \iff \frac{\beta S}{N} = \gamma \iff S = \frac{\gamma N}{\beta} = \frac{N}{\beta/\gamma} = \frac{N}{R_0} = \frac{1000}{4} = 250.$$
- Khi $S > 250$: $\frac{\beta S}{N} > \gamma$ → ngoặc dương → $I$ **tăng** (dịch đang lên).
- Khi $S < 250$: ngoặc âm → $I$ **giảm** (dịch thoái).
- Đỉnh đúng tại lúc $S$ băng qua 250. **Diễn giải**: mỗi ca nhiễm cần "mồi" khỏe để lây; khi người khỏe cạn dưới ngưỡng $N/R_0$, một ca lây trung bình $<1$ ca mới → số nhiễm bắt đầu tụt.

**Quy mô đỉnh — bao nhiêu người nhiễm cùng lúc?** Với SIR có công thức (suy từ chia hai phương trình $dI/dS$):
$$I_{\max} = N\left(1 - \frac{1}{R_0} - \frac{\ln R_0}{R_0}\right).$$
Thay $R_0 = 4$, $N = 1000$: $I_{\max} = 1000\left(1 - 0.25 - \dfrac{\ln 4}{4}\right) = 1000(1 - 0.25 - \dfrac{1.386}{4}) = 1000(0.75 - 0.3466) \approx$ **403 ca** cùng lúc ở đỉnh — đây là con số quyết định *bệnh viện có quá tải không*.

### 3.2. Diễn tiến S–I–R theo thời gian — ASCII

```
   số người
 1000 │●╲                                    ╭──────── R (khỏi)
      │  ╲  S (khỏe)                       ╭─╯
      │   ╲                              ╭╯
  500 │    ╲                          ╭─╯
      │     ╲___                   ╭─╯  ┄┄┄┄┄┄ S∞ ≈ phần "sống sót"
  403 │   ┊   ╲╲___       ╭───╮  ╭─╯
      │   ┊      ╲╲____╭──╯ I  ╲╯              (I = đang nhiễm)
  250 │┄┄┄┼┄┄┄┄┄┄┄╲╲╲╭─╯       ╲___
      │   ┊        ╳ ╯            ╲────___
    0 │___┊_______╱____________________╲________→ t
          ┊      ↑
       S=250  đỉnh I (≈403 ca)
       (ngưỡng)
   • S giảm đơn điệu;  • I lên đỉnh rồi tắt;  • R tăng đơn điệu tới R∞.
```

Và **mặt phẳng pha SIR** (chiếu lên $S$–$I$, vì $R = N - S - I$ suy ra được) — quỹ đạo **không** vòng kín mà **đi một chiều** từ góc phải xuống, cong lên đỉnh tại $S = N/R_0$ rồi tụt về trục $I = 0$:

```
   I (nhiễm)
 403 │            ╭─╮  ← đỉnh tại S = N/R₀ = 250
      │          ╱   ╲
      │        ╱       ╲
      │      ╱           ╲
      │    ╱               ╲___
    1 │  •────────────────────────●  ← kết: I=0, S = S∞ (sống sót)
    0 │__┼__________┼______________┼____→ S (khỏe)
        S₀=999    S=250          S∞
                (ngưỡng đỉnh)
   ► quỹ đạo đi từ phải (S₀≈N) sang trái, KHÔNG quay lại (dịch chỉ chạy 1 lần).
```

Khác Lotka–Volterra (vòng kín lặp mãi), SIR là quỹ đạo **mở, một chiều** — dịch chạy một lần rồi tắt, vì $S$ chỉ giảm (không ai từ R quay lại S trong SIR cơ bản).

### 3.3. Walk-through Euler giải số hệ SIR — một bước

Cùng cách như Lotka–Volterra: $X_{\text{mới}} = X + \frac{dX}{dt}\cdot \Delta t$ cho cả ba biến. Lấy $N=1000$, $(S,I,R) = (999, 1, 0)$, $\beta=0.4$, $\gamma=0.1$, bước $\Delta t = 1$ ngày:

$$\begin{aligned}
\frac{dS}{dt} &= -\frac{\beta S I}{N} = -\frac{0.4\cdot 999\cdot 1}{1000} = -0.3996 \\
\frac{dI}{dt} &= \frac{\beta S I}{N} - \gamma I = 0.3996 - 0.1\cdot 1 = +0.2996 \\
\frac{dR}{dt} &= \gamma I = 0.1\cdot 1 = +0.1 \\[4pt]
S_1 &= 999 + (-0.3996)\cdot 1 = 998.60 \\
I_1 &= 1 + 0.2996\cdot 1 = 1.30 \\
R_1 &= 0 + 0.1\cdot 1 = 0.10
\end{aligned}$$

**Kiểm tra bảo toàn**: $S_1 + I_1 + R_1 = 998.60 + 1.30 + 0.10 = 1000.00 = N$ ✓ — tổng dân số không đổi (vì $\frac{dS}{dt} + \frac{dI}{dt} + \frac{dR}{dt} = 0$ luôn). Đây là **phép thử sanity** mọi bước phải qua: nếu tổng lệch khỏi $N$, code sai. Lặp ~150 bước (ngày) → vẽ ra cả ba đường ở mục 3.2.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dịch tắt dù còn người nhạy cảm?"* Khi $S$ tụt dưới $N/R_0$, mỗi ca lây $< 1$ người mới (vì ít "mồi" khỏe để lây) → $I$ giảm. Dịch tắt do *cạn người dễ nhiễm trong tiếp xúc*, không cần mọi người đều nhiễm — đây là *miễn dịch cộng đồng*.
- *"Giảm $\beta$ bằng cách nào trong đời thực?"* Khẩu trang, giãn cách, rửa tay giảm tiếp xúc hiệu quả → giảm $\beta$ → giảm $R_0$ → "làm phẳng đường cong" (đỉnh thấp hơn, muộn hơn, đỡ quá tải y tế).
- *"$R_0$ và $R_t$ (hiệu dụng) khác gì?"* $R_0$ là số lây *khi toàn dân còn nhạy cảm* ($S \approx N$). Khi dịch đã chạy, một phần dân miễn dịch, **số lây hiệu dụng** $R_t = R_0\cdot \dfrac{S}{N}$ giảm dần. Dịch thoái khi $R_t < 1 \iff \dfrac{S}{N} < \dfrac{1}{R_0}$ — đúng là ngưỡng đỉnh $S = N/R_0$.
- *"Vì sao $1/\gamma$ là số ngày nhiễm trung bình?"* Phương trình $\frac{dR}{dt} = \gamma I$ nói mỗi ngày tỉ lệ $\gamma$ số người nhiễm khỏi bệnh. Nếu một nhóm nhiễm không thêm ai mới, số còn nhiễm tắt mũ $I(t) = I_0 e^{-\gamma t}$ → "thời gian sống trung bình" của trạng thái nhiễm là $1/\gamma$ (giống hằng số thời gian phân rã). $\gamma = 0.1$/ngày → trung bình **10 ngày** nhiễm.

### 3.4. Miễn dịch cộng đồng (herd immunity) — walk-through bằng số

💡 **Trực giác.** Không cần *mọi* người miễn dịch để chặn dịch — chỉ cần đủ nhiều để mỗi ca lây trung bình $<1$ người. Người đã miễn dịch như "tường chắn" che cho người chưa miễn: virus đụng tường thì cụt đường lây.

**Suy ngưỡng.** Gọi $p$ = tỉ lệ dân miễn dịch (nên $S/N = 1-p$). Dịch không bùng khi số lây hiệu dụng $R_t = R_0(1-p) \le 1$:
$$R_0(1 - p) \le 1 \iff 1 - p \le \frac{1}{R_0} \iff p \ge 1 - \frac{1}{R_0}.$$
→ **ngưỡng miễn dịch cộng đồng** $p^* = 1 - \dfrac{1}{R_0}$.

**Bốn ví dụ số** (đa dạng $R_0$):

| Bệnh | $R_0$ | $p^* = 1 - 1/R_0$ | Diễn giải |
|------|-------|-------------------|-----------|
| Cúm mùa | $1.3$ | $1 - 1/1.3 \approx$ **23%** | dễ chặn, ngưỡng thấp |
| COVID gốc | $2.5$ | $1 - 1/2.5 = 1 - 0.4 =$ **60%** | cần đa số |
| Bài này ($R_0=4$) | $4$ | $1 - 1/4 =$ **75%** | khó hơn |
| Sởi | $15$ | $1 - 1/15 \approx$ **93%** | rất khó, cần phủ vắc-xin gần như toàn dân |

→ $R_0$ **càng lớn, ngưỡng càng cao**. Sởi $R_0\approx 15$ giải thích vì sao chỉ cần phủ vắc-xin tụt vài % là dịch sởi bùng lại.

### 3.5. Mở rộng SEIR — thêm nhóm phơi nhiễm

💡 Nhiều bệnh có **thời gian ủ bệnh**: đã nhiễm nhưng *chưa lây* (vd COVID ủ vài ngày). SIR gộp luôn vào I; **SEIR** tách thêm nhóm **E (Exposed — phơi nhiễm, đã nhiễm nhưng chưa lây)**:
$$\begin{cases} \dfrac{dS}{dt} = -\dfrac{\beta S I}{N} \\[6pt] \dfrac{dE}{dt} = \dfrac{\beta S I}{N} - \sigma E & \text{(vào E khi nhiễm, rời E khi hết ủ)} \\[6pt] \dfrac{dI}{dt} = \sigma E - \gamma I \\[6pt] \dfrac{dR}{dt} = \gamma I \end{cases}$$
$1/\sigma$ = thời gian ủ trung bình. SEIR cho **đỉnh muộn hơn, thoải hơn** SIR (độ trễ ủ bệnh làm chậm bùng). Còn các biến thể khác: **SIRS** (miễn dịch suy giảm, R quay lại S — cúm/COVID), **SIS** (không miễn dịch, I về thẳng S — cảm lạnh). Mỗi chữ là một "ngăn" (compartment); chọn ngăn nào tùy sinh học bệnh.

⚠ **Lỗi thường gặp — quên giả định "trộn đều" của SIR.** SIR giả định mọi người tiếp xúc đồng đều, dân số kín, không sinh tử, miễn dịch vĩnh viễn. Thực tế có cấu trúc mạng xã hội, vùng miền, biến chủng, miễn dịch suy giảm → cần mở rộng (SEIR thêm nhóm phơi nhiễm E, mô hình mạng...). SIR cho *bức tranh định tính* (có đỉnh, có ngưỡng), không phải số ca chính xác.

⚠ **Lỗi thường gặp — viết số hạng lây là $\beta S$ thay vì $\beta SI/N$.** Lây mới phải tỉ lệ với *cả* số người dễ nhiễm $S$ **và** số người đang lây $I$ (lại là số hạng tích $S\cdot I$, giống $xy$ ở Lotka–Volterra). Viết $\frac{dS}{dt} = -\beta S$ là "người khỏe tự biến mất không cần ai lây" — vô nghĩa: nếu $I=0$ (không ai nhiễm) thì *không* được có ca mới, mà $\beta SI/N = 0$ ✓ còn $\beta S \neq 0$ ✗. Chia $N$ để $\beta$ là "số tiếp xúc/người" không phụ thuộc quy mô dân số.

🔁 **Dừng lại tự kiểm tra**

1. Một bệnh có $\beta = 0.2$, $\gamma = 0.1$. Tính $R_0$ và cho biết dịch có bùng không. Ngưỡng miễn dịch cộng đồng?

<details><summary>Đáp án</summary>

$R_0 = \beta/\gamma = 0.2/0.1 = $ **2** $> 1$ → **dịch bùng**. Ngưỡng miễn dịch cộng đồng $= 1 - 1/R_0 = 1 - 1/2 = $ **50%**.

</details>

2. Với $N = 1000$, $R_0 = 5$, tính $S$ tại đỉnh dịch và số ca khỏi tối thiểu phải tích lũy trước khi dịch bắt đầu thoái.

<details><summary>Đáp án</summary>

Đỉnh tại $S = N/R_0 = 1000/5 = $ **200**. Tức trước khi thoái, số người đã rời nhóm S phải là $1000 - 200 = $ **800** (chuyển sang I hoặc R). Dịch thoái khi $S$ tụt qua 200.

</details>

3. Bệnh có $1/\gamma = 5$ ngày (thời gian nhiễm) và mỗi ca lây 3 người trước khi khỏi. $R_0$ và $\beta$ là bao nhiêu?

<details><summary>Đáp án</summary>

"Mỗi ca lây 3 người" chính là định nghĩa $R_0 = $ **3**. Mà $\gamma = 1/5 = 0.2$/ngày; $R_0 = \beta/\gamma \Rightarrow \beta = R_0\gamma = 3\cdot 0.2 = $ **0.6**/ngày.

</details>

### 📝 Tóm tắt mục 3

- SIR: $\frac{dS}{dt} = -\beta SI/N$, $\frac{dI}{dt} = \beta SI/N - \gamma I$, $\frac{dR}{dt} = \gamma I$; tổng $S+I+R=N$ bảo toàn.
- $R_0 = \beta/\gamma$: dịch bùng $\iff R_0 > 1$; số lây hiệu dụng $R_t = R_0 S/N$ tụt khi dân miễn dần.
- Đỉnh dịch khi $S = N/R_0$; quy mô đỉnh $I_{\max} = N(1 - 1/R_0 - \ln R_0/R_0)$.
- Ngưỡng miễn dịch cộng đồng $p^* = 1 - 1/R_0$; $R_0$ càng lớn ngưỡng càng cao (sởi ~93%).
- Mở rộng: SEIR (thêm E phơi nhiễm), SIRS (miễn dịch suy giảm), SIS (không miễn dịch).
- 2 lỗi: quên giả định trộn đều; viết lây là $\beta S$ thay vì $\beta SI/N$.
- Giả định trộn đều/dân số kín — bức tranh định tính, cần mở rộng cho chính xác.

---

## 4. Phân tích điểm cân bằng của hệ

💡 **Trực giác — viên bi trong địa hình.** Điểm cân bằng **ổn định** như viên bi dưới đáy bát: đẩy nhẹ thì nó lăn về. **Không ổn định** như viên bi trên đỉnh đồi: đẩy nhẹ thì lăn đi mất. Với hệ 1 biến ta xét $|f'| < 1$ (hoặc dấu $f'$); với hệ nhiều biến phải xét **toàn bộ ma trận** đạo hàm riêng — **ma trận Jacobian**.

### 4.1. Ma trận Jacobian — tuyến tính hóa quanh điểm cân bằng

Với hệ $\frac{dx}{dt} = f(x,y)$, $\frac{dy}{dt} = g(x,y)$, **Jacobian** là ma trận các đạo hàm riêng:
$$J = \begin{pmatrix} \dfrac{\partial f}{\partial x} & \dfrac{\partial f}{\partial y} \\[8pt] \dfrac{\partial g}{\partial x} & \dfrac{\partial g}{\partial y} \end{pmatrix}.$$
Gần điểm cân bằng, hệ phi tuyến **xấp xỉ tuyến tính**: lệch nhỏ $(\delta x, \delta y)$ tiến hóa theo $J$ đánh giá *tại điểm cân bằng đó*. **Trị riêng (eigenvalue)** $\lambda$ của $J$ ([T6 L03](../../06-Advanced/lesson-03-eigenvalues-eigenvectors/)) quyết định số phận:

| Trị riêng $\lambda = a \pm bi$ | Hành vi gần điểm cân bằng | Tên |
|--------------------------------|---------------------------|-----|
| Cả hai thực, $<0$ | hút thẳng vào | nút ổn định (stable node) |
| Cả hai thực, $>0$ | đẩy thẳng ra | nút không ổn định |
| Thực, trái dấu | hút một hướng, đẩy hướng kia | **điểm yên ngựa (saddle)** |
| Phức, phần thực $a<0$ | xoáy ốc vào | tiêu điểm ổn định (spiral) |
| Phức, phần thực $a>0$ | xoáy ốc ra | tiêu điểm không ổn định |
| Thuần ảo ($a=0$) | vòng kín quanh điểm | **tâm (center)** — Lotka–Volterra |

Tóm: *dấu phần thực* quyết định hút ($a<0$)/đẩy ($a>0$); *phần ảo* $b\neq 0$ tạo dao động (xoáy/vòng).

### 4.2. Walk-through số — Jacobian của Lotka–Volterra

Với $f = \alpha x - \beta xy$, $g = \delta xy - \gamma y$, đạo hàm riêng:
$$J = \begin{pmatrix} \alpha - \beta y & -\beta x \\ \delta y & \delta x - \gamma \end{pmatrix}.$$

**Tại điểm cùng tồn tại** $(x^*, y^*) = (\gamma/\delta,\ \alpha/\beta)$, các số hạng đường chéo triệt tiêu ($\alpha - \beta\cdot\frac{\alpha}{\beta} = 0$ và $\delta\cdot\frac{\gamma}{\delta} - \gamma = 0$):
$$J^* = \begin{pmatrix} 0 & -\beta x^* \\ \delta y^* & 0 \end{pmatrix} = \begin{pmatrix} 0 & -\beta\gamma/\delta \\ \delta\alpha/\beta & 0 \end{pmatrix}.$$
Trị riêng giải từ $\lambda^2 - (\text{trace})\lambda + \det = 0$. Ở đây trace $= 0$, $\det = (\beta\gamma/\delta)(\delta\alpha/\beta) = \alpha\gamma > 0$, nên:
$$\lambda^2 + \alpha\gamma = 0 \Rightarrow \lambda = \pm i\sqrt{\alpha\gamma} \quad (\text{thuần ảo}).$$
Với số bài ($\alpha=1$, $\gamma=1.5$): $\lambda = \pm i\sqrt{1.5} \approx \pm 1.22\,i$. **Thuần ảo → tâm (center) → vòng kín** ✓ — khớp chính xác với dao động tuần hoàn ta quan sát ở mục 2. Tần số dao động $\approx \sqrt{\alpha\gamma}$, chu kỳ $\approx 2\pi/\sqrt{\alpha\gamma}$.

**Tại $(0,0)$**: $J = \begin{pmatrix} \alpha & 0 \\ 0 & -\gamma \end{pmatrix}$, trị riêng $\lambda_1 = \alpha > 0$, $\lambda_2 = -\gamma < 0$ → **trái dấu → điểm yên ngựa (saddle)**: hút theo trục thú (cáo tự chết) nhưng đẩy theo trục mồi (thỏ sinh sôi). Nghĩa là "cùng tuyệt chủng" *không* ổn định — chỉ cần một con mồi sống sót là quần thể bật lại.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao phải tuyến tính hóa, không xét thẳng hệ phi tuyến?"* Vì hệ phi tuyến nói chung **không giải đóng** được. Nhưng *gần* điểm cân bằng, lệch nhỏ tiến hóa gần như tuyến tính ($J$) — và hệ tuyến tính thì trị riêng giải xong hành vi. Đây là kỹ thuật chủ lực của lý thuyết hệ động lực.
- *"Trị riêng thuần ảo thì kết luận có chắc không?"* **Không hoàn toàn** — đây là ca biên: tuyến tính hóa nói "tâm/vòng kín", nhưng số hạng phi tuyến *có thể* biến nó thành xoáy vào/ra. Lotka–Volterra may mắn có đại lượng bảo toàn nên đúng là vòng kín; nói chung ca thuần ảo cần phân tích sâu hơn.

🔁 **Dừng lại tự kiểm tra**

1. Một điểm cân bằng có Jacobian với trị riêng $\lambda_1 = -2$, $\lambda_2 = -0.5$. Ổn định hay không? Kiểu gì?

<details><summary>Đáp án</summary>

Cả hai thực và **âm** → quỹ đạo hút vào → **ổn định**, kiểu **nút ổn định (stable node)**. (Như viên bi dưới đáy bát — đẩy nhẹ là về.)

</details>

2. Trị riêng $\lambda = -0.3 \pm 2i$. Hành vi gần điểm cân bằng?

<details><summary>Đáp án</summary>

Phức, phần thực $-0.3 < 0$ → **xoáy ốc vào** (tiêu điểm ổn định — stable spiral). Phần ảo $\pm 2i$ tạo xoáy; phần thực âm kéo vào → dao động tắt dần.

</details>

📝 **Tóm tắt mục 4**: ổn định của hệ xét qua **trị riêng ma trận Jacobian** tại điểm cân bằng — *dấu phần thực* quyết định hút ($<0$)/đẩy ($>0$), *phần ảo* tạo xoáy/dao động. Lotka–Volterra tại điểm cùng tồn tại có trị riêng thuần ảo ($\pm i\sqrt{\alpha\gamma}$) → tâm/vòng kín; tại $(0,0)$ là điểm yên ngựa.

---

## 5. Bài tập

**Bài 1.** Lotka–Volterra với $\alpha = 0.8$, $\beta = 0.04$, $\delta = 0.02$, $\gamma = 0.6$. Tìm điểm cân bằng cùng tồn tại $(x^*, y^*)$.

**Bài 2.** Giải thích trong vài câu vì sao đỉnh quần thể thú đến *sau* đỉnh quần thể mồi.

**Bài 3.** SIR có $\beta = 0.5$, $\gamma = 0.2$. (a) $R_0$? (b) Dịch bùng không? (c) Tại đỉnh dịch, tỉ lệ $S/N$ bằng bao nhiêu?

**Bài 4.** Một bệnh $R_0 = 5$. Cần bao nhiêu % dân miễn dịch để chặn dịch? Nếu tiêm chủng chỉ đạt 70%, dịch có chặn được không?

**Bài 5.** Nêu 2 giả định của mô hình SIR và, với mỗi giả định, một tình huống thực tế làm nó sai.

**Bài 6.** Lotka–Volterra $\alpha=1$, $\beta=0.1$, $\delta=0.075$, $\gamma=1.5$. Tại trạng thái $(x,y) = (30, 8)$, tính $\frac{dx}{dt}$ và $\frac{dy}{dt}$, rồi cho biết hệ đang ở pha nào trong 4 pha.

**Bài 7.** SIR có $N = 10000$, $\beta = 0.6$, $\gamma = 0.15$, bắt đầu $(S,I,R) = (9999, 1, 0)$. Dùng Euler bước $\Delta t = 1$ ngày, tính trạng thái sau **một** bước và kiểm tra bảo toàn $S+I+R$.

**Bài 8.** Một bệnh có thời gian nhiễm trung bình 4 ngày và mỗi ca lây trung bình 2 người. (a) Tính $\gamma$, $R_0$, $\beta$. (b) Tỉ lệ $S/N$ tại đỉnh dịch. (c) Ngưỡng miễn dịch cộng đồng.

---

## 6. Lời giải chi tiết

**Bài 1.** $x^* = \gamma/\delta = 0.6/0.02 = $ **30**; $y^* = \alpha/\beta = 0.8/0.04 = $ **20**. → $(30, 20)$.

**Bài 2.** Thú sinh sản *nhờ ăn mồi* (số hạng $\delta \cdot x \cdot y$), nên cần mồi đông *trước* thì thú mới tăng *sau* — có độ trễ. Khi mồi đạt đỉnh rồi bắt đầu giảm (vì bị ăn nhiều), thú vẫn còn tăng thêm một lúc (do còn nhiều mồi), nên đỉnh thú trễ pha sau đỉnh mồi. Độ trễ này tạo vòng tuần hoàn đuổi nhau.

**Bài 3.** (a) $R_0 = 0.5/0.2 = $ **2.5**. (b) $R_0 > 1$ → **bùng**. (c) Đỉnh khi $S/N = \gamma/\beta = 1/R_0 = 1/2.5 = $ **0.4** (40% còn nhạy cảm).

**Bài 4.** Ngưỡng $= 1 - 1/R_0 = 1 - 1/5 = $ **80%**. Tiêm $70\% < 80\%$ → **chưa chặn được dịch** ($R$ hiệu dụng vẫn $> 1$); cần đạt $\ge 80\%$.

**Bài 5.** Ví dụ: (1) *Trộn đều* — mọi người tiếp xúc như nhau; sai vì thực tế có cụm gia đình/trường học, người ở xa hiếm gặp nhau. (2) *Miễn dịch vĩnh viễn sau khỏi* — sai với cúm/COVID khi miễn dịch suy giảm và có biến chủng, người khỏi vẫn tái nhiễm (cần mô hình SIRS). (Chấp nhận các giả định khác: dân số kín không sinh tử; $\gamma, \beta$ hằng số.)

**Bài 6.** Tính hai đạo hàm tại $(30, 8)$:
$$\frac{dx}{dt} = \alpha x - \beta xy = 1\cdot 30 - 0.1\cdot 30\cdot 8 = 30 - 24 = +6 > 0 \;(\text{mồi tăng}).$$
$$\frac{dy}{dt} = \delta xy - \gamma y = 0.075\cdot 30\cdot 8 - 1.5\cdot 8 = 18 - 12 = +6 > 0 \;(\text{thú tăng}).$$
Cả hai dương, mồi đông ($x=30>x^*=20$) và thú ít ($y=8<y^*=10$) → **pha ①** (mồi đông, thú ít, cả hai bắt đầu tăng — thú vừa hưởng lợi).

**Bài 7.** $R_0 = 0.6/0.15 = 4$. Các đạo hàm tại $(9999, 1, 0)$:
$$\begin{aligned}
\frac{dS}{dt} &= -\frac{\beta S I}{N} = -\frac{0.6\cdot 9999\cdot 1}{10000} = -0.59994 \\
\frac{dI}{dt} &= \frac{\beta S I}{N} - \gamma I = 0.59994 - 0.15\cdot 1 = +0.44994 \\
\frac{dR}{dt} &= \gamma I = 0.15\cdot 1 = +0.15
\end{aligned}$$
Một bước Euler ($\Delta t = 1$): $S_1 = 9999 - 0.59994 = $ **9998.40**, $I_1 = 1 + 0.44994 = $ **1.45**, $R_1 = 0 + 0.15 = $ **0.15**. Kiểm tra: $9998.40 + 1.45 + 0.15 = 10000.00 = N$ ✓ (bảo toàn).

**Bài 8.** (a) $\gamma = 1/4 = $ **0.25**/ngày; $R_0 = $ **2** (mỗi ca lây 2 người); $\beta = R_0\gamma = 2\cdot 0.25 = $ **0.5**/ngày. (b) Đỉnh khi $S/N = 1/R_0 = 1/2 = $ **0.5** (50% còn nhạy cảm). (c) Ngưỡng miễn dịch cộng đồng $= 1 - 1/R_0 = 1 - 1/2 = $ **50%**.

---

## 7. Bài tiếp theo

[Lesson 06 — Mô hình tối ưu (LP, Lagrange)](../lesson-06-optimization-models/): chuyển từ "hệ tiến hóa thế nào" sang "làm sao tốt nhất dưới ràng buộc".

## 📝 Tổng kết

1. **Hệ ODE** mô tả nhiều biến tương tác; phân tích qua mặt phẳng pha & điểm cân bằng.
2. **Lotka–Volterra** thú–mồi: dao động lệch pha quanh $(\gamma/\delta, \alpha/\beta)$; toy model cho cơ chế.
3. **SIR**: $R_0 = \beta/\gamma$ quyết định bùng dịch ($R_0 > 1$); đỉnh khi $S = N/R_0$; ngưỡng miễn dịch $1 - 1/R_0$.
4. Giả định trộn đều/dân số kín — cho bức tranh định tính, cần mở rộng (SEIR, mạng) để chính xác.
5. Ổn định của hệ xét qua trị riêng Jacobian.
