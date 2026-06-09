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

💡 **Trực giác.** Đến giờ mỗi mô hình chỉ có *một* biến ($N$, $T$, $S$). Nhưng thực tế các đại lượng **ảnh hưởng lẫn nhau**: số thú phụ thuộc số mồi, số người nhiễm phụ thuộc số người khỏe. Khi đó tốc độ thay đổi của mỗi biến phụ thuộc *cả những biến khác* → ta có **hệ ODE** (nhiều phương trình giải đồng thời).

Dạng tổng quát 2 biến:
$$\begin{cases} \dfrac{dx}{dt} = f(x, y) \\[6pt] \dfrac{dy}{dt} = g(x, y) \end{cases}$$
Không gian $(x, y)$ gọi là **mặt phẳng pha (phase plane)**; mỗi điều kiện đầu vẽ một **quỹ đạo** trong đó. Hành vi dài hạn = quỹ đạo tiến tới đâu (điểm cân bằng, vòng kín, hay phân kỳ).

📝 **Tóm tắt mục 1**: hệ ODE mô tả nhiều biến tương tác; phân tích qua mặt phẳng pha và các điểm cân bằng.

---

## 2. Mô hình thú–mồi Lotka–Volterra

💡 **Trực giác.** Thỏ (mồi $x$) và cáo (thú $y$). Không cáo → thỏ sinh sôi mũ. Có cáo → thỏ bị ăn (giảm theo số chạm thỏ×cáo). Cáo không thỏ → chết đói (giảm mũ); ăn được thỏ → sinh thêm. Kết quả: hai bên **đuổi nhau theo chu kỳ** — thỏ nhiều → cáo tăng → thỏ giảm → cáo đói giảm → thỏ lại tăng...

**Mô hình**:
$$\begin{cases} \dfrac{dx}{dt} = \alpha x - \beta xy & \text{(mồi: sinh mũ − bị săn)} \\[6pt] \dfrac{dy}{dt} = \delta xy - \gamma y & \text{(thú: sinh nhờ ăn − chết tự nhiên)} \end{cases}$$
$\alpha$: tốc độ sinh mồi; $\beta$: hiệu quả săn; $\delta$: hiệu quả chuyển mồi thành thú; $\gamma$: tốc độ chết của thú. Số hạng $xy$ = tần suất "chạm nhau" (giả định trộn đều).

**Điểm cân bằng** (cả hai đạo hàm = 0):
- $(0, 0)$: cùng tuyệt chủng.
- $(x^*, y^*) = (\gamma/\delta,\ \alpha/\beta)$: cùng tồn tại. Quanh điểm này, quỹ đạo là **vòng kín** → dao động tuần hoàn không tắt.

**Walk-through số**: $\alpha = 1$, $\beta = 0.1$, $\delta = 0.075$, $\gamma = 1.5$.
- $x^* = \gamma/\delta = 1.5/0.075 = $ **20** (mồi cân bằng); $y^* = \alpha/\beta = 1/0.1 = $ **10** (thú cân bằng).
- Bắt đầu lệch khỏi $(20,10)$, vd $(40, 9)$: mồi đông → $\frac{dy}{dt} = 0.075 \cdot 40 \cdot 9 - 1.5 \cdot 9 = 27 - 13.5 = +13.5 > 0$ → thú tăng; rồi thú đông ăn bớt mồi... → vòng tuần hoàn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dao động lệch pha chứ không đồng pha?"* Vì thú phản ứng *sau* mồi: phải có nhiều mồi *trước*, thú mới tăng *sau*; đỉnh thú đến sau đỉnh mồi. Đó là độ trễ tạo vòng đuổi nhau.
- *"Số hạng $x \cdot y$ nghĩa là gì?"* Tần suất gặp gỡ thú–mồi tỉ lệ *tích* hai số lượng (giống va chạm phân tử). Đây là **giả định trộn đều** — mọi thú gặp mọi mồi như nhau.

⚠ **Lỗi thường gặp — coi Lotka–Volterra là chính xác sinh thái.** Mô hình bỏ qua sức chứa môi trường, tuổi, không gian, nhiều loài. Dao động vòng kín "trung tính" của nó rất nhạy (nhiễu nhỏ đổi biên độ) — thực tế hệ sinh thái ổn định hơn. Đây là **toy model** kinh điển để hiểu *cơ chế* dao động, không để dự báo chính xác số thỏ.

🔁 **Dừng lại tự kiểm tra**

1. Với $\alpha=1$, $\beta=0.1$, $\delta=0.075$, $\gamma=1.5$, nếu hệ đang ở đúng $(x^*, y^*) = (20, 10)$ thì điều gì xảy ra theo thời gian?

<details><summary>Đáp án</summary>

Cả hai đạo hàm = 0 → hệ **đứng yên** tại $(20, 10)$ mãi (điểm cân bằng). Chỉ khi lệch khỏi điểm này mới sinh dao động vòng quanh nó.

</details>

### 📝 Tóm tắt mục 2

- Lotka–Volterra: $\frac{dx}{dt} = \alpha x - \beta xy$, $\frac{dy}{dt} = \delta xy - \gamma y$; $xy$ = tần suất gặp (trộn đều).
- Cân bằng cùng tồn tại $(\gamma/\delta,\ \alpha/\beta)$; quanh đó quỹ đạo vòng kín → dao động lệch pha (thú trễ sau mồi).
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

**Walk-through số**: $N = 1000$, $I_0 = 1$, $S_0 = 999$, $\beta = 0.4$, $\gamma = 0.1$ ($R_0 = 4$).
- Đầu dịch $\frac{dI}{dt} \approx 1 \cdot (0.4 \cdot 999/1000 - 0.1) = 1 \cdot (0.3996 - 0.1) \approx +0.3$ → $I$ tăng.
- $I$ tăng đến **đỉnh** khi $\frac{dI}{dt} = 0 \iff \beta S/N = \gamma \iff S = \gamma N/\beta = N/R_0 = 1000/4 = $ **250**. Khi $S$ giảm xuống 250, dịch đạt đỉnh rồi thoái.
- Cuối dịch: không phải ai cũng nhiễm — còn một phần $S_0$ "sống sót" (giải qua phương trình cuối dịch).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dịch tắt dù còn người nhạy cảm?"* Khi $S$ tụt dưới $N/R_0$, mỗi ca lây $< 1$ người mới (vì ít "mồi" khỏe để lây) → $I$ giảm. Dịch tắt do *cạn người dễ nhiễm trong tiếp xúc*, không cần mọi người đều nhiễm — đây là *miễn dịch cộng đồng*.
- *"Giảm $\beta$ bằng cách nào trong đời thực?"* Khẩu trang, giãn cách, rửa tay giảm tiếp xúc hiệu quả → giảm $\beta$ → giảm $R_0$ → "làm phẳng đường cong" (đỉnh thấp hơn, muộn hơn, đỡ quá tải y tế).

⚠ **Lỗi thường gặp — quên giả định "trộn đều" của SIR.** SIR giả định mọi người tiếp xúc đồng đều, dân số kín, không sinh tử, miễn dịch vĩnh viễn. Thực tế có cấu trúc mạng xã hội, vùng miền, biến chủng, miễn dịch suy giảm → cần mở rộng (SEIR thêm nhóm phơi nhiễm E, mô hình mạng...). SIR cho *bức tranh định tính* (có đỉnh, có ngưỡng), không phải số ca chính xác.

🔁 **Dừng lại tự kiểm tra**

1. Một bệnh có $\beta = 0.2$, $\gamma = 0.1$. Tính $R_0$ và cho biết dịch có bùng không. Ngưỡng miễn dịch cộng đồng?

<details><summary>Đáp án</summary>

$R_0 = \beta/\gamma = 0.2/0.1 = $ **2** $> 1$ → **dịch bùng**. Ngưỡng miễn dịch cộng đồng $= 1 - 1/R_0 = 1 - 1/2 = $ **50%**.

</details>

### 📝 Tóm tắt mục 3

- SIR: $\frac{dS}{dt} = -\beta SI/N$, $\frac{dI}{dt} = \beta SI/N - \gamma I$, $\frac{dR}{dt} = \gamma I$.
- $R_0 = \beta/\gamma$: dịch bùng $\iff R_0 > 1$; đỉnh khi $S = N/R_0$; ngưỡng miễn dịch cộng đồng $1 - 1/R_0$.
- Giả định trộn đều/dân số kín — bức tranh định tính, cần mở rộng cho chính xác.

---

## 4. Phân tích điểm cân bằng của hệ

💡 Với hệ, ổn định không còn là $|f'| < 1$ (1 biến) mà xét **trị riêng** của ma trận Jacobian tại điểm cân bằng ([T6 L03](../../06-Advanced/lesson-03-eigenvalues-eigenvectors/)): phần thực âm → ổn định (quỹ đạo hút vào); có phần thực dương → không ổn định; thuần ảo → vòng kín (Lotka–Volterra). Chi tiết kỹ thuật để dành cho môn hệ động lực; ở đây chỉ cần biết: *dấu phần thực trị riêng* quyết định hút/đẩy, *phần ảo* tạo dao động.

📝 **Tóm tắt mục 4**: ổn định của hệ xét qua trị riêng Jacobian — phần thực quyết định hút/đẩy, phần ảo tạo xoáy/dao động.

---

## 5. Bài tập

**Bài 1.** Lotka–Volterra với $\alpha = 0.8$, $\beta = 0.04$, $\delta = 0.02$, $\gamma = 0.6$. Tìm điểm cân bằng cùng tồn tại $(x^*, y^*)$.

**Bài 2.** Giải thích trong vài câu vì sao đỉnh quần thể thú đến *sau* đỉnh quần thể mồi.

**Bài 3.** SIR có $\beta = 0.5$, $\gamma = 0.2$. (a) $R_0$? (b) Dịch bùng không? (c) Tại đỉnh dịch, tỉ lệ $S/N$ bằng bao nhiêu?

**Bài 4.** Một bệnh $R_0 = 5$. Cần bao nhiêu % dân miễn dịch để chặn dịch? Nếu tiêm chủng chỉ đạt 70%, dịch có chặn được không?

**Bài 5.** Nêu 2 giả định của mô hình SIR và, với mỗi giả định, một tình huống thực tế làm nó sai.

---

## 6. Lời giải chi tiết

**Bài 1.** $x^* = \gamma/\delta = 0.6/0.02 = $ **30**; $y^* = \alpha/\beta = 0.8/0.04 = $ **20**. → $(30, 20)$.

**Bài 2.** Thú sinh sản *nhờ ăn mồi* (số hạng $\delta \cdot x \cdot y$), nên cần mồi đông *trước* thì thú mới tăng *sau* — có độ trễ. Khi mồi đạt đỉnh rồi bắt đầu giảm (vì bị ăn nhiều), thú vẫn còn tăng thêm một lúc (do còn nhiều mồi), nên đỉnh thú trễ pha sau đỉnh mồi. Độ trễ này tạo vòng tuần hoàn đuổi nhau.

**Bài 3.** (a) $R_0 = 0.5/0.2 = $ **2.5**. (b) $R_0 > 1$ → **bùng**. (c) Đỉnh khi $S/N = \gamma/\beta = 1/R_0 = 1/2.5 = $ **0.4** (40% còn nhạy cảm).

**Bài 4.** Ngưỡng $= 1 - 1/R_0 = 1 - 1/5 = $ **80%**. Tiêm $70\% < 80\%$ → **chưa chặn được dịch** ($R$ hiệu dụng vẫn $> 1$); cần đạt $\ge 80\%$.

**Bài 5.** Ví dụ: (1) *Trộn đều* — mọi người tiếp xúc như nhau; sai vì thực tế có cụm gia đình/trường học, người ở xa hiếm gặp nhau. (2) *Miễn dịch vĩnh viễn sau khỏi* — sai với cúm/COVID khi miễn dịch suy giảm và có biến chủng, người khỏi vẫn tái nhiễm (cần mô hình SIRS). (Chấp nhận các giả định khác: dân số kín không sinh tử; $\gamma, \beta$ hằng số.)

---

## 7. Bài tiếp theo

[Lesson 06 — Mô hình tối ưu (LP, Lagrange)](../lesson-06-optimization-models/): chuyển từ "hệ tiến hóa thế nào" sang "làm sao tốt nhất dưới ràng buộc".

## 📝 Tổng kết

1. **Hệ ODE** mô tả nhiều biến tương tác; phân tích qua mặt phẳng pha & điểm cân bằng.
2. **Lotka–Volterra** thú–mồi: dao động lệch pha quanh $(\gamma/\delta, \alpha/\beta)$; toy model cho cơ chế.
3. **SIR**: $R_0 = \beta/\gamma$ quyết định bùng dịch ($R_0 > 1$); đỉnh khi $S = N/R_0$; ngưỡng miễn dịch $1 - 1/R_0$.
4. Giả định trộn đều/dân số kín — cho bức tranh định tính, cần mở rộng (SEIR, mạng) để chính xác.
5. Ổn định của hệ xét qua trị riêng Jacobian.
