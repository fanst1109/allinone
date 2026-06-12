# Lesson 07 — Phương trình vi phân (ODE)

## Mục tiêu

- Hiểu **PT vi phân thường (ODE)**: PT chứa hàm và đạo hàm.
- Giải ODE bậc 1: tách biến, tuyến tính.
- ODE bậc 2 tuyến tính hệ số hằng.
- Mô hình hóa: dao động, tăng trưởng dân số, RC circuit.

## Kiến thức tiền đề

- [T4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. PT vi phân là gì?

💡 **Trực giác — ODE mô tả "tốc độ thay đổi phụ thuộc trạng thái hiện tại"**: phương trình đại số nói *"giá trị bằng bao nhiêu"* ($x^2 = 9 \to x = 3$). Phương trình vi phân nói một điều sâu hơn — *"hệ thống đang thay đổi nhanh chậm thế nào, tùy theo nó đang ở đâu"*. Hình dung một tài khoản tiết kiệm: lãi suất 5%/năm nghĩa là *"tốc độ tăng tiền = 5% số tiền hiện có"*. Càng nhiều tiền, càng sinh lãi nhanh. Viết ra: $\frac{dM}{dt} = 0.05\cdot M$. Đây chính là một ODE — vế trái là "tốc độ thay đổi", vế phải phụ thuộc vào "trạng thái hiện tại $M$". Giải ODE = từ luật "thay đổi thế nào" suy ngược ra "giá trị theo thời gian là gì" ($M(t) = M_0 e^{0.05t}$).

So sánh hai loại "phương trình":

| | Phương trình đại số | Phương trình vi phân (ODE) |
|---|---|---|
| Ẩn số | một **số** $x$ | một **hàm** $y(x)$ |
| Vd | $x^2 - 5x + 6 = 0$ | $y' = 2y$ |
| Nghiệm | $x = 2$ hoặc $x = 3$ (vài số) | $y = Ce^{2x}$ (cả **họ hàm**) |
| "Giải" nghĩa là | tìm số thỏa đẳng thức | tìm hàm mà đạo hàm khớp luật |

💡 **Định nghĩa**: PT chứa hàm chưa biết $y(x)$ và **đạo hàm** của nó: $y'$, $y''$, ...

**Bậc (order)** = bậc đạo hàm cao nhất xuất hiện.

**Tuyến tính (linear)** = $y$ và các đạo hàm của nó chỉ xuất hiện ở **lũy thừa 1**, không nhân nhau, không nằm trong hàm phi tuyến ($\sin y$, $e^y$, $(y')^2$...). Dạng tổng quát tuyến tính: $a_n(x)y^{(n)} + \cdots + a_1(x)y' + a_0(x)y = g(x)$. Tuyến tính dễ giải hơn nhiều vì có cấu trúc đẹp (nguyên lý chồng chất nghiệm).

**Bốn ví dụ nhận diện bậc + tuyến tính**:

| ODE | Bậc | Tuyến tính? | Vì sao |
|---|---|---|---|
| $y' = 2x$ | 1 | ✓ | $y'$ bậc 1, không có hàm phi tuyến của $y$ |
| $y'' + y = 0$ | 2 | ✓ | $y''$, $y$ đều bậc 1 |
| $(y')^2 + y = x$ | 1 | ✗ | $(y')^2$ — đạo hàm bị bình phương |
| $y'' + \sin y = 0$ | 2 | ✗ | $\sin y$ — $y$ nằm trong hàm phi tuyến (con lắc lớn) |

Thêm 2 ví dụ: $y''' + y' = x$ (bậc 3, tuyến tính); $y\cdot y' = 1$ (bậc 1, **phi tuyến** vì $y$ nhân $y'$).

### Vì sao quan trọng?

Tự nhiên thường mô tả qua **tốc độ thay đổi**, không phải giá trị trực tiếp:
- Vận tốc = đạo hàm vị trí: $v = \frac{ds}{dt}$.
- Gia tốc = đạo hàm vận tốc: $F = ma \to a = F/m \to \frac{d^2s}{dt^2} = F/m$.
- Phóng xạ: $\frac{dN}{dt} = -\lambda\cdot N$ (tốc độ phân rã tỉ lệ $N$).
- Nguội: $\frac{dT}{dt} = -k(T - T_{\text{phòng}})$.

⟶ ODE = **ngôn ngữ của khoa học**.

### 1.1. Trường hướng (slope field) — "nhìn" nghiệm mà chưa cần giải

💡 **Trực giác**: một ODE bậc 1 dạng $y' = F(x, y)$ cho biết, tại **mỗi điểm $(x, y)$** trên mặt phẳng, đường nghiệm đi qua đó phải có **độ dốc (slope)** bằng $F(x, y)$. Nếu ta vẽ một gạch nhỏ với độ dốc đó tại nhiều điểm, ta được "trường hướng" — như rắc mạt sắt quanh nam châm để thấy từ trường mà không cần phương trình. Nghiệm là đường cong "trôi theo" các gạch này.

**Ví dụ — $y' = y$** (tốc độ thay đổi = giá trị hiện tại). Tại mỗi điểm, độ dốc = chính tung độ $y$ của điểm đó:
- Tại $y = 0$: dốc $0$ (gạch nằm ngang).
- Tại $y = 1$: dốc $1$ (gạch nghiêng $45°$).
- Tại $y = 2$: dốc $2$ (dốc hơn).
- Tại $y = -1$: dốc $-1$ (nghiêng xuống).

ASCII trường hướng (mỗi gạch = độ dốc tại điểm đó), nghiệm $y = Ce^x$ "lướt" theo:

```
  y
  2 |  /   /   /   /   /      dốc=2: nghiêng mạnh lên
    |
  1 |  /   /   /   /   /      dốc=1: nghiêng 45°
    |
  0 |  -   -   -   -   -      dốc=0: nằm ngang  (nghiệm y=0)
    |
 -1 |  \   \   \   \   \      dốc=-1: nghiêng xuống
    +----------------------- x
       càng lên cao gạch càng dốc → nghiệm e^x cong vểnh lên
```

Đường nghiệm $y = e^x$ (đi qua $(0,1)$) luôn tiếp tuyến với gạch tại mỗi điểm: ở $y$ thấp đi thoai thoải, lên cao thì vọt lên — đúng "càng nhiều càng tăng nhanh".

❓ **Trường hướng để làm gì nếu vẫn phải giải ODE?** Nhiều ODE **không có công thức nghiệm dạng đóng** (vd $y' = x^2 + y^2$). Trường hướng (+ phương pháp số như Euler) cho ta hình dạng nghiệm mà không cần công thức. Nó cũng giúp thấy ngay **nghiệm cân bằng** (chỗ $y' = 0$, gạch ngang) và hành vi dài hạn.

> 📐 **Định nghĩa đầy đủ — Phương trình vi phân thường (ODE)**
>
> **(a) Là gì**: PT trong đó **ẩn số là 1 hàm** $y(x)$ (không phải 1 số), và PT có chứa các đạo hàm của hàm đó. "Giải ODE" = tìm hàm $y(x)$ thoả PT, thường có 1 hằng số tự do (cần điều kiện đầu $y(x_0) = y_0$ để xác định cụ thể).
>
> **(b) Vì sao cần**: Hầu hết quy luật khoa học không phát biểu trực tiếp về **giá trị** mà về **tốc độ thay đổi**. Newton định luật 2: $F = ma = m\cdot\frac{d^2s}{dt^2}$ (PT vi phân bậc 2 cho $s(t)$). Phóng xạ: $\frac{dN}{dt} = -\lambda N$ (tốc độ phân rã tỉ lệ $N$). RC mạch: $V = R\cdot\frac{dq}{dt} + \frac{q}{C}$. Logistic dân số: $\frac{dN}{dt} = rN(1-N/K)$. Cơ học lượng tử: Schrödinger PT là PT vi phân riêng phần. Mô hình hoá COVID, kinh tế, khí hậu — tất cả đều ODE/PDE. Giải ODE = "tích phân" hàm theo thời gian/không gian.
>
> **(c) Ví dụ số**: $y' = 2x \to y = x^2 + C$ (nguyên hàm). $y(0) = 5 \to C = 5 \to y = x^2+5$. $\frac{dN}{dt} = -0.1N \to N(t) = N_0\cdot e^{-0.1t}$. Nếu $N_0 = 1000$, sau 10 đơn vị thời gian: $N(10) = 1000\cdot e^{-1} \approx 368$. Con lắc nhỏ: $\theta'' + (g/L)\cdot\theta = 0 \to \theta(t) = A\cos(\omega t+\varphi)$ với $\omega = \sqrt{g/L}$. $L = 1$m, $g = 9.8 \to \omega \approx 3.13$ rad/s, chu kỳ $T \approx \mathbf{2.01}$s. Lò xo $m=1$kg, $k=100$ N/m: $\omega = 10$ rad/s, $T = 0.628$s.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nghiệm ODE là số hay hàm?"* Là **hàm** $y(x)$, không phải 1 con số. Vd $y' = 2x$ có nghiệm $y = x^2 + C$ (cả họ hàm). Đây là khác biệt cốt lõi với phương trình đại số.
- *"Vì sao có hằng số C?"* Vì "tích phân" mất thông tin hằng số. Cần thêm **điều kiện đầu** (vd $y(0) = 5$) để chốt $C$, ra 1 nghiệm cụ thể.

⚠ **Lỗi thường gặp — quên hằng số C khi giải**. Mỗi lần tích phân sinh 1 hằng số. ODE bậc 1 → 1 hằng số; bậc 2 → 2 hằng số. Phản ví dụ: $y' = 2x \to$ viết $y = x^2$ (thiếu $C$) là sai; phải $y = x^2 + C$, rồi dùng điều kiện đầu tìm $C$.

🔁 **Dừng lại tự kiểm tra**

1. $y = 3e^{2x}$ có là nghiệm của $y' = 2y$ không?
2. Bậc của $y''' + y' = x$ là mấy?

<details><summary>Đáp án</summary>

1. $y' = 6e^{2x} = 2\cdot(3e^{2x}) = 2y$ ✓ → **có**.
2. **Bậc 3** (đạo hàm cao nhất là $y'''$).

</details>

### 1.2. Bản đồ chọn phương pháp (đọc trước, dùng suốt bài)

Khi gặp một ODE, hỏi tuần tự — câu trả lời "có" đầu tiên chỉ ra phương pháp:

```
ODE đến tay
   │
   ├─ Bậc 1?
   │     ├─ Vế phải = f(x)·g(y)?  ──► TÁCH BIẾN (mục 2)
   │     └─ Dạng y' + P(x)y = Q(x)? ──► THỪA SỐ TÍCH PHÂN (mục 3)
   │
   └─ Bậc 2 dạng y'' + a y' + b y = 0 (hệ số hằng)?
         └─► PT ĐẶC TRƯNG r² + ar + b = 0, xét Δ (mục 4)
              Δ>0 hai mũ thực · Δ=0 kép nhân x · Δ<0 dao động
```

| Dấu hiệu nhận ra | Phương pháp | Mục |
|---|---|---|
| $\frac{dy}{dx} = f(x)g(y)$ tách được | Tách biến | 2 |
| $y' + P(x)y = Q(x)$ (tuyến tính bậc 1) | Thừa số tích phân $\mu = e^{\int P}$ | 3 |
| $y'' + ay' + by = 0$ | PT đặc trưng + xét $\Delta$ | 4 |

⚠ Lưu ý: vài ODE bậc 1 vừa tách biến **vừa** tuyến tính (vd $y' = ky$) — chọn cách nào cũng ra cùng đáp số. Nhiều ODE phi tuyến (vd $y' = x^2 + y^2$) **không** thuộc ba lớp trên → cần phương pháp số hoặc trường hướng (mục 1.1).

### 📝 Tóm tắt mục 1

- ODE: phương trình chứa hàm chưa biết $y(x)$ và đạo hàm của nó; nghiệm là **hàm** (cả họ + hằng số).
- Bậc = bậc đạo hàm cao nhất; tuyến tính = $y$, $y'$, ... chỉ bậc 1, không nằm trong hàm phi tuyến.
- ODE là "ngôn ngữ" mô tả quy luật qua tốc độ thay đổi; trường hướng cho "nhìn" nghiệm khi chưa giải.
- Bản đồ chọn phương pháp: tách biến / thừa số tích phân / PT đặc trưng (mục 1.2).

---

## 2. ODE bậc 1 — Tách biến (Separable)

💡 **Trực giác / Hình dung**: nếu vế phải "tách" được thành phần chỉ-x nhân phần chỉ-y, ta dồn mọi thứ y về 1 vế, mọi thứ x về vế kia, rồi tích phân từng vế độc lập. Như phân loại đồ vào 2 ngăn rồi xử lý riêng.

Dạng:

$$\frac{dy}{dx} = f(x)\cdot g(y)$$

**Cách giải**: tách 2 vế:

$$\frac{dy}{g(y)} = f(x)\,dx$$

Tích phân 2 vế.

**Ví dụ 1**: $\frac{dy}{dx} = -2x\cdot y$.
- $\frac{dy}{y} = -2x\,dx$.
- $\int \frac{dy}{y} = -\int 2x\,dx \to \ln|y| = -x^2 + C$.
- → $\mathbf{y = A\cdot e^{-x^2}}$ ($A = e^C$).

  **Verify bằng thế ngược** ($A = 3$): $y = 3e^{-x^2}$, $y' = 3\cdot(-2x)e^{-x^2} = -2x\cdot(3e^{-x^2}) = -2x\cdot y$ ✓ — đúng PT gốc. Đây là cách tự kiểm: lấy nghiệm, đạo hàm, thay lại xem có khớp không.

**Ví dụ 2 — Tăng trưởng dân số**: $\frac{dN}{dt} = k\cdot N$.
- $\frac{dN}{N} = k\,dt \to \ln|N| = kt + C \to \mathbf{N(t) = N_0\cdot e^{kt}}$.

→ Tăng trưởng cấp số nhân. Nếu $k > 0$ (sinh nhiều hơn chết) thì bùng nổ.

### 2.1. Quy trình tách biến — 4 bước

Mỗi bài tách biến chạy đúng 4 bước:

> **Bước 1 — kiểm tra dạng**: viết được $\frac{dy}{dx} = f(x)\cdot g(y)$ không? (vế phải = tích phần-x × phần-y).
>
> **Bước 2 — tách**: chuyển mọi thứ chứa $y$ (gồm $dy$) sang một vế, mọi thứ chứa $x$ (gồm $dx$) sang vế kia: $\frac{dy}{g(y)} = f(x)\,dx$.
>
> **Bước 3 — tích phân hai vế** (mỗi vế một biến độc lập), nhớ **một** hằng số $C$ ở vế phải.
>
> **Bước 4 — giải $y$ theo $x$** rồi (nếu có) dùng điều kiện đầu chốt $C$.

### 2.2. Walk-through 3 ví dụ từng bước

**Walk-through A — Tăng trưởng mũ** $\frac{dN}{dt} = kN$, $N(0) = N_0$ (vi khuẩn, lãi kép, dân số đầu).

$$\begin{aligned}
\text{B1: } & f(t)=k,\ g(N)=N \text{ (tách được)} \\
\text{B2: } & \frac{dN}{N} = k\,dt \\
\text{B3: } & \int\frac{dN}{N} = \int k\,dt \;\Rightarrow\; \ln|N| = kt + C \\
\text{B4: } & N = e^{kt+C} = e^C\cdot e^{kt} = A\,e^{kt} \\
       & N(0)=A=N_0 \;\Rightarrow\; \boxed{N(t) = N_0\,e^{kt}}
\end{aligned}$$

Verify bằng số ($N_0 = 100$, $k = 0.2$/giờ): $N(5) = 100\,e^{1} \approx 272$; $N(10) = 100\,e^{2} \approx 739$. Kiểm tra đạo hàm: $N'(5) = 0.2\cdot 272 = 54.4$, đúng bằng $kN$ ✓.

**Walk-through B — Mô hình logistic** $\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$ ($K$ = sức chứa môi trường — dân số bị giới hạn).

$$\begin{aligned}
\text{B1: } & f(t)=r,\ g(N)=N\!\left(1-\tfrac{N}{K}\right) \text{ (tách được)} \\
\text{B2: } & \frac{dN}{N\left(1-\frac{N}{K}\right)} = r\,dt \\
\text{B3: } & \text{phân thức từng phần: } \frac{1}{N(1-N/K)} = \frac{1}{N} + \frac{1/K}{1-N/K} \\
       & \int\!\left(\frac{1}{N} + \frac{1/K}{1-N/K}\right)dN = \int r\,dt \\
       & \ln|N| - \ln\!\left|1-\tfrac{N}{K}\right| = rt + C \;\Rightarrow\; \ln\!\frac{N}{1-N/K} = rt+C \\
\text{B4: } & \frac{N}{1-N/K} = A\,e^{rt} \;\Rightarrow\; \boxed{N(t) = \frac{K}{1 + \left(\frac{K-N_0}{N_0}\right)e^{-rt}}}
\end{aligned}$$

Verify ($K = 1000$, $N_0 = 100$, $r = 0.5$): $t=0 \to N = \frac{1000}{1+9} = 100$ ✓. $t\to\infty \to e^{-rt}\to 0 \to N \to 1000 = K$ ✓ (chạm trần). Khác mũ: lúc đầu gần như mũ ($N$ nhỏ thì $1-N/K \approx 1$), về sau bão hòa thành chữ S.

ASCII so sánh mũ (bùng nổ) vs logistic (chữ S, chạm trần $K$):

```
  N                                  mũ: N₀eᵏᵗ
  K |- - - - - - - - - ____------       /
    |              __--    ← logistic  /
    |           _-       bão hòa      /
    |        _-                      /
 N₀ |____--                      __--
    +------------------------------------ t
       chung gốc, mũ vọt thẳng, logistic uốn cong nằm ngang ở K
```

**Walk-through C — Làm nguội Newton** $\frac{dT}{dt} = -k(T - T_s)$ ($T_s$ = nhiệt độ phòng; cốc cà phê nguội dần).

$$\begin{aligned}
\text{B1: } & \text{đặt } u = T - T_s \Rightarrow \frac{du}{dt} = \frac{dT}{dt} = -ku \text{ (tách được)} \\
\text{B2: } & \frac{du}{u} = -k\,dt \\
\text{B3: } & \ln|u| = -kt + C \\
\text{B4: } & u = A\,e^{-kt} \Rightarrow T - T_s = A\,e^{-kt} \\
       & T(0)=T_0 \Rightarrow A = T_0 - T_s \Rightarrow \boxed{T(t) = T_s + (T_0 - T_s)e^{-kt}}
\end{aligned}$$

Verify (cà phê $T_0 = 90°$C, phòng $T_s = 25°$C, $k = 0.1$/phút): $t=0 \to T = 25 + 65 = 90$ ✓. $t=10 \to T = 25 + 65\,e^{-1} = 25 + 23.9 = 48.9°$C. $t\to\infty \to T \to 25°$C (bằng phòng) ✓. Chênh lệch $T-T_s$ giảm theo hàm mũ — nguội nhanh lúc đầu (chênh lớn), chậm dần khi gần nhiệt độ phòng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi ODE bậc 1 đều tách biến được?"* Không. Chỉ khi vế phải $= f(x)\cdot g(y)$. Vd $\frac{dy}{dx} = x + y$ KHÔNG tách được (phải dùng phương pháp tuyến tính, mục 3).
- *"Vì sao $\frac{dN}{dt} = kN$ ra hàm mũ?"* Vì "tốc độ tỉ lệ với lượng hiện có" = đặc trưng của hàm mũ (càng nhiều càng tăng nhanh). Đây là mô hình lãi kép, dân số, phóng xạ ($k < 0$).

⚠ **Lỗi thường gặp — quên $|y|$ và hằng số khi tích phân $1/y$**. $\int \frac{dy}{y} = \ln|y| + C$ (có trị tuyệt đối). Quên $C$ → mất họ nghiệm; quên $|\cdot|$ → sai miền. Sau khi mũ hóa: $y = \pm e^C\cdot e^{...} = A\cdot e^{...}$, $A$ gói cả dấu.

⚠ **Lỗi thường gặp — chia cho 0 khi tách biến (đánh rơi nghiệm hằng)**. Bước 2 chia hai vế cho $g(y)$ — nhưng nếu $g(y_0) = 0$ tại giá trị $y_0$ nào đó thì phép chia **không hợp lệ** ở đó, và $y \equiv y_0$ (hằng) thường là một **nghiệm bị bỏ sót**. Phản ví dụ: $\frac{dy}{dx} = y^2 - y = y(y-1)$. Chia cho $y(y-1)$ làm mất hai nghiệm hằng $y \equiv 0$ và $y \equiv 1$ (cả hai cho $y' = 0 = g(y)$ ✓). Với logistic, $N \equiv 0$ và $N \equiv K$ là hai nghiệm cân bằng bị chia mất — phải kiểm riêng. **Quy tắc**: trước khi chia $g(y)$, giải $g(y) = 0$ và ghi các nghiệm hằng ra trước.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\frac{dy}{dx} = 3y$ với $y(0) = 2$.
2. Cà phê $90°$C trong phòng $25°$C, $k = 0.1$/phút. Sau bao lâu còn $60°$C?
3. Tìm mọi nghiệm hằng (cân bằng) của $\frac{dy}{dx} = y(2 - y)$.

<details><summary>Đáp án</summary>

1. $\frac{dy}{y} = 3\,dx \to \ln|y| = 3x + C \to y = A\cdot e^{3x}$. $y(0) = A = 2 \to \mathbf{y = 2e^{3x}}$.
2. $T(t) = 25 + 65e^{-0.1t} = 60 \to e^{-0.1t} = 35/65 = 0.538 \to -0.1t = \ln 0.538 = -0.619 \to t = \mathbf{6.19}$ phút.
3. $g(y) = y(2-y) = 0 \to y \equiv 0$ và $y \equiv 2$ (hai nghiệm cân bằng; đừng quên khi tách biến).

</details>

### 📝 Tóm tắt mục 2

- Tách biến (4 bước): kiểm tra dạng $f(x)g(y)$ → tách → tích phân → giải $y$ + chốt $C$.
- Ba mô hình kinh điển: mũ $N_0 e^{kt}$ (bùng nổ), logistic $\frac{K}{1+\ldots e^{-rt}}$ (chữ S, chạm trần $K$), nguội Newton $T_s + (T_0-T_s)e^{-kt}$ (tiệm cận $T_s$).
- Nhớ $|y|$ và hằng số $C$; và **kiểm nghiệm hằng** $g(y)=0$ trước khi chia (đừng đánh rơi).

---

## 3. ODE bậc 1 tuyến tính

💡 **Trực giác / Hình dung**: khi không tách biến được, ta nhân cả phương trình với 1 "thừa số phép thuật" $\mu(x)$ khiến vế trái gập lại thành đạo hàm của 1 tích $(\mu\cdot y)'$. Rồi chỉ việc tích phân ngược. $\mu$ được thiết kế đúng để $(\mu y)' = \mu y' + \mu'y$ khớp với vế trái.

Dạng:

$$y' + P(x)\cdot y = Q(x)$$

**Phương pháp thừa số tích phân**: nhân 2 vế với $\mu(x) = e^{\int P(x)\,dx}$:

$$\begin{aligned}
(\mu\cdot y)' &= \mu\cdot Q \\
\mu\cdot y &= \int \mu\cdot Q\,dx \\
y &= \frac{1}{\mu} \int \mu\cdot Q\,dx
\end{aligned}$$

### 3.1. Quy trình thừa số tích phân — 4 bước

> **Bước 1 — chuẩn dạng**: viết về đúng $y' + P(x)y = Q(x)$ (hệ số của $y'$ phải là $1$; nếu không, chia cả hai vế cho nó trước).
>
> **Bước 2 — tính $\mu$**: $\mu(x) = e^{\int P(x)\,dx}$ (không cần $+C$ ở bước này — chọn một nguyên hàm bất kỳ là đủ).
>
> **Bước 3 — gập vế trái**: nhân cả PT với $\mu$ thì vế trái thành $(\mu y)'$; viết $(\mu y)' = \mu Q$.
>
> **Bước 4 — tích phân**: $\mu y = \int \mu Q\,dx + C$, rồi chia $\mu$ ra $y$, dùng điều kiện đầu chốt $C$.

### 3.2. Walk-through 2 ví dụ từng bước

**Walk-through A — $y' + 2y = 4$** (vd cân bằng, đã có ở trên, nay viết đủ 4 bước):

$$\begin{aligned}
\text{B1: } & P(x)=2,\ Q(x)=4 \quad(\text{hệ số } y' \text{ đã là } 1) \\
\text{B2: } & \mu = e^{\int 2\,dx} = e^{2x} \\
\text{B3: } & (e^{2x}y)' = e^{2x}\cdot 4 \\
\text{B4: } & e^{2x}y = \int 4e^{2x}\,dx = 2e^{2x} + C \\
       & \boxed{y = 2 + C\,e^{-2x}}
\end{aligned}$$

Khi $t \to \infty$: $e^{-2x}\to 0 \to y \to 2$ (cân bằng). Verify ($C = 3$): $y = 2 + 3e^{-2x}$, $y' = -6e^{-2x}$; $y' + 2y = -6e^{-2x} + 4 + 6e^{-2x} = 4$ ✓.

**Walk-through B — $xy' + y = x^2$** (hệ số $y'$ KHÔNG phải $1$ — phải chuẩn dạng trước; $x > 0$):

$$\begin{aligned}
\text{B1: } & \text{chia cho } x:\ y' + \tfrac{1}{x}y = x \;\Rightarrow\; P=\tfrac{1}{x},\ Q=x \\
\text{B2: } & \mu = e^{\int \frac{1}{x}\,dx} = e^{\ln x} = x \\
\text{B3: } & (xy)' = x\cdot x = x^2 \quad(\text{để ý vế trái gốc } xy'+y \text{ đúng là } (xy)') \\
\text{B4: } & xy = \int x^2\,dx = \tfrac{x^3}{3} + C \\
       & \boxed{y = \tfrac{x^2}{3} + \tfrac{C}{x}}
\end{aligned}$$

Verify ($C = 0$): $y = x^2/3$, $y' = 2x/3$; $xy' + y = \frac{2x^2}{3} + \frac{x^2}{3} = x^2$ ✓. Lưu ý mẹo: trong ví dụ này vế trái gốc $xy' + y$ **vốn đã** là $(xy)'$ — đó chính là lý do $\mu = x$ "khớp đẹp".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\mu = e^{\int P\,dx}$?"* Để $\mu' = P\cdot\mu$, khi đó $\mu y' + P\mu y = \mu y' + \mu'y = (\mu y)'$ — gập lại thành đạo hàm tích. Đó là yêu cầu thiết kế $\mu$.
- *"Nghiệm gồm 2 phần: 2 và $C\cdot e^{-2x}$, nghĩa là gì?"* "2" là nghiệm riêng (trạng thái cân bằng lâu dài); $C\cdot e^{-2x}$ là phần phụ tắt dần về 0. Cấu trúc "cân bằng + transient" rất phổ biến trong vật lý/kỹ thuật.

⚠ **Lỗi thường gặp — quên nhân $Q$ với $\mu$ ở vế phải**. Sau khi nhân $\mu$, vế phải phải là $\mu\cdot Q$ (cả hai vế nhân $\mu$). Phản ví dụ: $y'+2y=4$, $\mu=e^{2x}$. Vế phải đúng $\int 4e^{2x}\,dx$; nếu quên $\mu$, tích $\int 4\,dx = 4x$ → nghiệm sai.

⚠ **Lỗi thường gặp — áp điều kiện đầu TRƯỚC khi viết $+C$ (chốt $C$ vào nghiệm thiếu hằng)**. Đây là lỗi "chết người" xuyên suốt mọi phương pháp giải ODE: phải có nghiệm tổng quát đầy đủ (kèm $C$) **rồi mới** thay $y(x_0) = y_0$ để tìm $C$. Phản ví dụ với $y' + 2y = 4$, $y(0) = 5$: nếu vội viết $y = 2$ (bỏ $C\,e^{-2x}$) rồi thấy $y(0) = 2 \neq 5$ thì bí. Làm đúng: nghiệm tổng quát $y = 2 + C e^{-2x}$, thay $y(0) = 2 + C = 5 \to C = 3 \to y = 2 + 3e^{-2x}$. **Nhớ**: $+C$ trước, điều kiện đầu sau.

⚠ **Lỗi thường gặp — quên chuẩn dạng (hệ số $y' \neq 1$)**. Nếu PT là $2y' + 4y = 8$, KHÔNG được lấy $P = 4$. Phải chia cho $2$ trước: $y' + 2y = 4 \to P = 2$. Lấy nhầm $P$ → $\mu$ sai → cả nghiệm sai.

🔁 **Dừng lại tự kiểm tra**

1. Tìm thừa số tích phân $\mu$ cho $y' + 3y = x$.
2. Giải $y' + y = e^{x}$ với $y(0) = 1$ (chú ý: viết $+C$ trước rồi mới chốt).

<details><summary>Đáp án</summary>

1. $P = 3 \to \mu = e^{\int 3\,dx} = \mathbf{e^{3x}}$.
2. $\mu = e^x$; $(e^x y)' = e^x\cdot e^x = e^{2x}$; $e^x y = \frac{e^{2x}}{2} + C$; $y = \frac{e^x}{2} + Ce^{-x}$. $y(0) = \frac12 + C = 1 \to C = \frac12 \to \mathbf{y = \frac{e^x + e^{-x}}{2} = \cosh x}$.

</details>

### 📝 Tóm tắt mục 3

- Dạng $y' + P(x)y = Q(x)$; nhân $\mu = e^{\int P\,dx}$ → vế trái $= (\mu y)'$.
- Giải: $\mu y = \int \mu Q\,dx \to y = \frac{1}{\mu}\int \mu Q\,dx$ (nhớ nhân $Q$ với $\mu$).
- Nghiệm thường = cân bằng + phần transient tắt dần.

---

## 4. ODE bậc 2 tuyến tính hệ số hằng

💡 **Trực giác / Hình dung**: đoán nghiệm dạng $y = e^{rx}$ (vì đạo hàm của mũ lại ra mũ). Thay vào, phương trình rút gọn thành PT bậc 2 cho $r$ (PT đặc trưng). $\Delta$ quyết định "tính cách" nghiệm: 2 nghiệm thực → tắt dần không dao động; nghiệm phức → **dao động** (sin/cos); nghiệm kép → trường hợp tới hạn. Đây là toán học của lò xo, mạch điện, con lắc.

$$y'' + a\cdot y' + b\cdot y = 0$$

(Thuần nhất — vế phải $= 0$.)

**Phương pháp**: tìm nghiệm dạng $y = e^{rx}$. Thay vào → **PT đặc trưng**:

$$r^2 + a\cdot r + b = 0$$

3 trường hợp theo $\Delta = a^2 - 4b$:

### TH1: $\Delta > 0$ — 2 nghiệm thực $r_1, r_2$

$$y = C_1\cdot e^{r_1 x} + C_2\cdot e^{r_2 x}$$

### TH2: $\Delta = 0$ — nghiệm kép $r$

$$y = (C_1 + C_2\cdot x)\cdot e^{rx}$$

### TH3: $\Delta < 0$ — 2 nghiệm phức $\alpha \pm \beta i$

$$y = e^{\alpha x}\cdot(C_1\cos(\beta x) + C_2\sin(\beta x))$$

→ **Dao động**.

**Walk-through 3 trường hợp** (mỗi TH 1 ví dụ):
- $\Delta > 0$: $y'' - 3y' + 2y = 0 \to r^2 - 3r + 2 = 0 \to r = 1, 2 \to y = C_1 e^x + C_2 e^{2x}$.
- $\Delta = 0$: $y'' - 4y' + 4y = 0 \to r^2 - 4r + 4 = 0 \to r = 2$ (kép) $\to y = (C_1 + C_2 x)e^{2x}$.
- $\Delta < 0$: $y'' + 4y = 0 \to r^2 + 4 = 0 \to r = \pm 2i \to y = C_1\cos(2x) + C_2\sin(2x)$.

### 4.1. Vì sao $y = e^{rx}$ rút thành PT đặc trưng — dẫn từng bước

Thay $y = e^{rx}$ vào $y'' + ay' + by = 0$. Vì $y' = re^{rx}$, $y'' = r^2 e^{rx}$:

$$\begin{aligned}
r^2 e^{rx} + a\,r e^{rx} + b\,e^{rx} &= 0 \\
e^{rx}\,(r^2 + ar + b) &= 0 \\
\end{aligned}$$

Mà $e^{rx} \neq 0$ với mọi $x$, nên buộc $r^2 + ar + b = 0$ — đó là **PT đặc trưng (characteristic equation)**. Vậy mỗi nghiệm $r$ của PT bậc 2 này cho một nghiệm $e^{rx}$ của ODE; ODE bậc 2 cần **hai** nghiệm độc lập tổ hợp lại.

### 4.2. Walk-through 2 ví dụ đầy đủ — mỗi trường hợp một, kèm điều kiện đầu

**Walk-through A — $\Delta > 0$ (tắt dần không dao động), có IVP**: $y'' - 3y' + 2y = 0$, $y(0) = 3$, $y'(0) = 4$.

$$\begin{aligned}
\text{PT đặc trưng: } & r^2 - 3r + 2 = 0,\ \Delta = 9 - 8 = 1 > 0 \\
& r = \frac{3 \pm 1}{2} = 2,\ 1 \\
\text{Tổng quát: } & y = C_1 e^{x} + C_2 e^{2x} \\
y' &= C_1 e^{x} + 2C_2 e^{2x} \\
\text{Đầu: } & y(0) = C_1 + C_2 = 3 \\
       & y'(0) = C_1 + 2C_2 = 4 \\
\text{Trừ: } & C_2 = 1,\ C_1 = 2 \\
& \boxed{y = 2e^{x} + e^{2x}}
\end{aligned}$$

Verify: $y(0) = 2 + 1 = 3$ ✓; $y'(0) = 2\cdot 1 + 2\cdot 1\cdot 1 = 2 + 2 = 4$ ✓. Cả hai mũ dương ($r > 0$) → nghiệm tăng vọt; nếu là $-1, -2$ thì tắt dần về 0.

**Walk-through B — $\Delta < 0$ (dao động tắt dần), có IVP**: $y'' + 2y' + 5y = 0$, $y(0) = 2$, $y'(0) = 0$ (lò xo có ma sát, thả từ biên độ 2).

$$\begin{aligned}
\text{PT đặc trưng: } & r^2 + 2r + 5 = 0,\ \Delta = 4 - 20 = -16 < 0 \\
& r = \frac{-2 \pm \sqrt{-16}}{2} = -1 \pm 2i \quad(\alpha = -1,\ \beta = 2) \\
\text{Tổng quát: } & y = e^{-x}\big(C_1\cos 2x + C_2\sin 2x\big) \\
y' &= e^{-x}\big[(-C_1 + 2C_2)\cos 2x + (-C_2 - 2C_1)\sin 2x\big] \\
\text{Đầu: } & y(0) = C_1 = 2 \\
       & y'(0) = -C_1 + 2C_2 = 0 \Rightarrow C_2 = 1 \\
& \boxed{y = e^{-x}\big(2\cos 2x + \sin 2x\big)}
\end{aligned}$$

Verify: $y(0) = e^0(2\cdot 1 + 0) = 2$ ✓. $\alpha = -1 < 0$ → biên độ $\sim e^{-x}$ tắt dần; $\beta = 2$ → dao động với tần số góc 2. Đây là "dao động tắt dần (damped oscillation)" — lò xo có ma sát, chuông ngừng ngân.

ASCII dao động tắt dần ($e^{-x}$ bao ngoài, sin/cos lượn trong):

```
  y
  2 *._
    |  '-._    ___
    |      `\ /   \        biên độ co dần theo eˉˣ
  0 +--------V-----\---/----V----- x
    |               \_/  (dao động vẫn, nhưng nhỏ dần)
    |
       envelope ±eˉˣ ôm lấy đường lượn → tắt về 0
```

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nghiệm phức lại cho dao động (cos, sin)?"* Vì $e^{i\beta x} = \cos\beta x + i\sin\beta x$ (Euler, Lesson 06). Nghiệm mũ phức "biến" thành dao động thực. Phần thực $\alpha$ của nghiệm cho biên độ tăng/tắt ($e^{\alpha x}$).
- *"Vì sao bậc 2 cần 2 hằng số $C_1, C_2$?"* Vì cần 2 điều kiện đầu (vd $y(0)$ và $y'(0)$) — như ném vật cần biết vị trí và vận tốc ban đầu.
- *"Vì sao được phép cộng hai nghiệm lại ($C_1 y_1 + C_2 y_2$)?"* Vì PT **tuyến tính thuần nhất** có **nguyên lý chồng chất (superposition)**: nếu $y_1$ và $y_2$ đều là nghiệm thì mọi tổ hợp $C_1 y_1 + C_2 y_2$ cũng là nghiệm. Kiểm: thay vào $L[y] = y'' + ay' + by$, vì đạo hàm tuyến tính nên $L[C_1 y_1 + C_2 y_2] = C_1 L[y_1] + C_2 L[y_2] = C_1\cdot 0 + C_2\cdot 0 = 0$ ✓. Đây là vì sao chỉ cần tìm 2 nghiệm cơ sở độc lập là đủ phủ toàn bộ. Lưu ý: nguyên lý này **không** áp dụng cho PT phi tuyến (vd $(y')^2 = y$).

⚠ **Lỗi thường gặp — dùng nhầm công thức nghiệm khi $\Delta = 0$**. Nghiệm kép KHÔNG phải $y = C_1 e^{rx} + C_2 e^{rx}$ (gộp thành 1 hằng số, mất nghiệm). Phải có **nhân $x$**: $y = (C_1 + C_2\cdot x)e^{rx}$. Phản ví dụ: $y''-4y'+4y=0$, nếu viết $y = Ce^{2x}$ thì chỉ 1 hằng số, không đủ cho bài toán 2 điều kiện đầu.

🔁 **Dừng lại tự kiểm tra**

1. Giải $y'' - 5y' + 6y = 0$.
2. Phân loại 3 trường hợp $\Delta$ cho: a) $y'' + 6y' + 9y = 0$; b) $y'' + y = 0$.
3. Giải $y'' - 2y' + y = 0$ với $y(0) = 1$, $y'(0) = 3$.

<details><summary>Đáp án</summary>

1. $r^2 - 5r + 6 = 0 \to r = 2, 3$ ($\Delta = 1 > 0$) $\to y = \mathbf{C_1 e^{2x} + C_2 e^{3x}}$.
2. a) $r^2 + 6r + 9 = (r+3)^2 = 0 \to r = -3$ kép ($\Delta = 0$) $\to y = (C_1 + C_2 x)e^{-3x}$. b) $r^2 + 1 = 0 \to r = \pm i$ ($\Delta < 0$, $\alpha = 0$) $\to y = C_1\cos x + C_2\sin x$ (dao động không tắt).
3. $r^2 - 2r + 1 = (r-1)^2 = 0 \to r = 1$ kép $\to y = (C_1 + C_2 x)e^x$. $y(0) = C_1 = 1$; $y' = (C_1 + C_2 + C_2 x)e^x$, $y'(0) = C_1 + C_2 = 3 \to C_2 = 2 \to \mathbf{y = (1 + 2x)e^x}$.

</details>

### 4.3. Bài toán giá trị đầu (Initial Value Problem) — nghiệm tổng quát vs nghiệm riêng

💡 **Trực giác**: nghiệm tổng quát là **cả họ** đường cong (chứa hằng số tự do); điều kiện đầu chọn ra **đúng một** đường đi qua điểm/trạng thái cho trước. Bậc $n$ → $n$ hằng số → cần $n$ điều kiện. Như ném một vật: biết luật $a = -g$ chưa đủ để biết quỹ đạo — phải biết thêm **vị trí đầu** $s(0)$ và **vận tốc đầu** $s'(0)$.

| | Cần bao nhiêu điều kiện | Điển hình |
|---|---|---|
| ODE bậc 1 | 1 ($y(x_0) = y_0$) | $y' = ky,\ y(0) = N_0$ |
| ODE bậc 2 | 2 ($y(x_0)$ và $y'(x_0)$) | $y'' + \omega^2 y = 0,\ y(0),\ y'(0)$ |

ASCII — họ nghiệm $y = Ce^x$ (mỗi $C$ một đường), điều kiện $y(0)=1$ chọn đúng đường $C=1$:

```
   y
   |          C=2 ↗
   |        C=1 ↗   ← điều kiện y(0)=1 chốt đường này
 1 *------ C=0.5 ↗
   |     C=0 (trục)
   +------------------- x
      cả họ song song nhau; 1 điểm đầu → 1 đường duy nhất
```

⚠ **Lỗi thường gặp — áp điều kiện $y'(0)$ vào $y$ thay vì vào $y'$**. Với bậc 2, điều kiện thứ hai là về **đạo hàm** $y'(x_0)$ — phải lấy đạo hàm nghiệm tổng quát trước rồi mới thay. Phản ví dụ: $y = C_1\cos 2x + C_2\sin 2x$, $y'(0) = 4$. Sai: thay $x=0$ vào $y$ ra $C_1$. Đúng: $y' = -2C_1\sin 2x + 2C_2\cos 2x$, $y'(0) = 2C_2 = 4 \to C_2 = 2$.

🔁 **Dừng lại tự kiểm tra**

1. $y'' + 4y = 0$, $y(0) = 0$, $y'(0) = 6$. Tìm nghiệm.

<details><summary>Đáp án</summary>

Tổng quát $y = C_1\cos 2x + C_2\sin 2x$. $y(0) = C_1 = 0$. $y' = -2C_1\sin 2x + 2C_2\cos 2x$, $y'(0) = 2C_2 = 6 \to C_2 = 3 \to \mathbf{y = 3\sin 2x}$.

</details>

### 📝 Tóm tắt mục 4

- Đoán $y = e^{rx}$ → $e^{rx}(r^2 + ar + b) = 0$ → PT đặc trưng $r^2 + ar + b = 0$.
- $\Delta > 0$: $C_1 e^{r_1 x}+C_2 e^{r_2 x}$ (tắt/tăng không dao động); $\Delta = 0$: $(C_1+C_2 x)e^{rx}$ (nhớ nhân $x$); $\Delta < 0$: $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$ → dao động ($\alpha < 0$ tắt dần, $\alpha = 0$ điều hòa thuần).
- Bậc 2 → 2 hằng số → cần 2 điều kiện đầu; điều kiện $y'(x_0)$ áp vào $y'$ (đạo hàm trước, thay sau).

---

## 5. Ví dụ — Con lắc đơn (linearized)

💡 **Trực giác / Hình dung**: con lắc nhỏ là TH3 ($\Delta < 0$) điển hình — không có ma sát nên $\alpha = 0$ (biên độ không tắt), nghiệm thuần dao động cos/sin với tần số $\omega = \sqrt{g/L}$. Đây là vì sao đồng hồ quả lắc giữ nhịp đều.

$$m\cdot\theta'' + \frac{mg}{L}\cdot\theta = 0 \quad\to\quad \theta'' + \frac{g}{L}\cdot\theta = 0$$

PT đặc trưng: $r^2 + g/L = 0 \to r = \pm i\cdot\sqrt{g/L} = \pm i\omega$.

Nghiệm: $\mathbf{\theta(t) = C_1\cos(\omega t) + C_2\sin(\omega t)} = A\cos(\omega t + \varphi)$.

→ Dao động điều hòa, chu kỳ $T = \frac{2\pi}{\omega} = 2\pi\sqrt{L/g}$.

(Đã gặp ở [T3 L08](../../03-Trig-Complex/lesson-08-trig-applications/) — dao động điều hòa.)

### 5.1. Ba trường hợp $\Delta$ = ba "tính cách" vật lý của hệ dao động

💡 **Trực giác**: lò xo + vật + giảm chấn (damper) cho PT $m s'' + c s' + k s = 0$ ($c$ = hệ số ma sát/giảm chấn). Ba trường hợp $\Delta$ của PT đặc trưng **chính là** ba hành vi vật lý quan sát được — toán và vật lý khớp 1-1:

| $\Delta$ | Tên vật lý | Nghiệm | Hình ảnh đời thực |
|---|---|---|---|
| $\Delta < 0$ (ma sát yếu) | **dao động tắt dần (underdamped)** | $e^{\alpha t}(C_1\cos\beta t + C_2\sin\beta t)$, $\alpha<0$ | chuông ngân nhỏ dần, xích đu đẩy một lần |
| $\Delta = 0$ (ma sát "vừa khít") | **tới hạn (critically damped)** | $(C_1 + C_2 t)e^{rt}$ | cửa tự đóng êm, kim đồng hồ không nảy |
| $\Delta > 0$ (ma sát mạnh) | **quá tắt (overdamped)** | $C_1 e^{r_1 t} + C_2 e^{r_2 t}$, $r_{1,2}<0$ | piston cửa nặng, về vị trí chậm, không vọt qua |
| $\Delta < 0$, $c = 0$ ($\alpha = 0$) | **điều hòa thuần** | $C_1\cos\beta t + C_2\sin\beta t$ | con lắc lý tưởng, không ma sát (như mục 5) |

❓ **Vì sao "tới hạn" lại đáng giá nhất trong kỹ thuật?** Vì nó là ranh giới: về vị trí cân bằng **nhanh nhất có thể mà không vọt quá (overshoot)**. Bộ giảm chấn ô tô, cơ cấu đóng cửa, kim đồng hồ analog đều thiết kế quanh "tới hạn" — nếu underdamped thì rung lắc, nếu overdamped thì ì chậm.

---

## 6. Ví dụ — Mạch RC

💡 **Trực giác / Hình dung**: tụ điện nạp như đổ nước vào bình qua ống hẹp — lúc đầu nhanh (chênh lệch lớn), càng đầy càng chậm, tiệm cận giá trị tối đa $C\cdot V$. "Thời hằng" $\tau = RC$ đo tốc độ nạp: sau $\tau$ giây nạp được $\sim 63\%$, sau $5\tau$ coi như đầy.

PT: $R\cdot\frac{dq}{dt} + \frac{q}{C} = V$ (nguồn không đổi).

**Giải bằng thừa số tích phân** (đây là tuyến tính bậc 1 — đúng phương pháp mục 3, $q(0) = 0$):

$$\begin{aligned}
\text{Chuẩn dạng (chia } R): \ & q' + \frac{1}{RC}q = \frac{V}{R} \;\Rightarrow\; P = \frac{1}{RC},\ Q = \frac{V}{R} \\
\mu &= e^{\int \frac{1}{RC}\,dt} = e^{t/(RC)} \\
\big(e^{t/(RC)}q\big)' &= \frac{V}{R}\,e^{t/(RC)} \\
e^{t/(RC)}q &= \frac{V}{R}\cdot RC\,e^{t/(RC)} + K = CV\,e^{t/(RC)} + K \\
q &= CV + K e^{-t/(RC)} \\
q(0) = 0 \Rightarrow K = -CV \;\Rightarrow\; & \boxed{q(t) = CV\big(1 - e^{-t/(RC)}\big)}
\end{aligned}$$

- → Tụ nạp đến giá trị $C\cdot V$ theo hàm mũ. Thời hằng $\tau = RC$.

**Verify bằng số** ($R = 1$kΩ, $C = 1$mF $\to \tau = RC = 1$s, $V = 5$V, $q_{\max} = CV = 5$mC):
- $t = 0$: $q = 5\cdot(1 - e^0) = 5\cdot 0 = 0$ (tụ rỗng ban đầu) ✓.
- $t = \tau = 1$s: $q = 5\cdot(1 - e^{-1}) = 5\cdot 0.632 = \mathbf{3.16}$ mC ($\sim 63\%$).
- $t \to \infty$: $q \to 5\cdot(1 - 0) = 5$ mC (nạp đầy) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tụ không nạp đầy ngay lập tức?"* Vì điện trở $R$ cản dòng. $R$ lớn → ống hẹp → nạp chậm ($\tau = RC$ lớn).
- *"$\tau = RC$ có ý nghĩa thực tế gì?"* Là "đồng hồ" của mạch: thiết kế bộ định thời, lọc tín hiệu đều dựa $\tau$. Sau $5\tau$ tụ coi như đầy ($>99\%$).

⚠ **Lỗi thường gặp — nhầm dấu trong hàm mũ nạp/xả**. Nạp: $q = CV(1 - e^{-t/\tau})$ (tăng từ 0). Xả: $q = q_0\cdot e^{-t/\tau}$ (giảm về 0). Lẫn 2 công thức → mô tả sai chiều biến thiên.

### 6.1. Xả tụ — walk-through ngược chiều

Khi ngắt nguồn ($V = 0$), tụ đã nạp $q_0$ sẽ xả qua $R$: $R\frac{dq}{dt} + \frac{q}{C} = 0$. Đây là **tách biến** (cũng là tuyến tính thuần nhất):

$$\begin{aligned}
\frac{dq}{q} &= -\frac{1}{RC}\,dt \\
\ln|q| &= -\frac{t}{RC} + C' \\
q(t) &= q_0\,e^{-t/(RC)} \quad (q(0) = q_0)
\end{aligned}$$

Verify ($q_0 = 5$ mC, $\tau = 1$s): $t = 0 \to q = 5$ mC ✓; $t = 1 \to q = 5e^{-1} = 1.84$ mC (còn $\sim 37\%$); $t = 5\tau \to q = 5e^{-5} = 0.034$ mC ($< 1\%$, coi như xả hết). Nạp leo lên $CV$, xả tụt về 0 — **đối xứng gương** qua đường $q = CV/2\cdot(\ldots)$, cùng một $\tau$.

❓ **Vì sao nạp và xả cùng thời hằng $\tau = RC$?** Vì cả hai đều do **cùng** mạch $R$–$C$ điều khiển: $\tau$ là đặc trưng của linh kiện, không phụ thuộc chiều dòng. Đổi $V$ chỉ đổi mức bão hòa $CV$, không đổi tốc độ tiến tới nó.

🔁 **Dừng lại tự kiểm tra**

1. Mạch RC có $\tau = 2$s, $V = 10$V, $C = 1$mF. Tính $q$ tại $t = 2$s.
2. Tụ nạp đầy $q_0 = 8$ mC, $\tau = 4$s, bắt đầu xả. Còn bao nhiêu sau $4$s?

<details><summary>Đáp án</summary>

1. $q_{\max} = CV = 10$ mC. $q(2) = 10\cdot(1 - e^{-2/2}) = 10\cdot(1 - e^{-1}) = 10\cdot 0.632 = \mathbf{6.32}$ mC.
2. Xả: $q(t) = 8e^{-t/4}$. $q(4) = 8e^{-1} = 8\cdot 0.368 = \mathbf{2.94}$ mC ($\sim 37\%$).

</details>

### 📝 Tóm tắt mục 6

- Mạch RC = ODE bậc 1 tuyến tính: $q(t) = CV(1 - e^{-t/\tau})$, nạp đầy dần.
- Thời hằng $\tau = RC$: sau $\tau$ nạp $\sim 63\%$, sau $5\tau$ coi như đầy.
- Nạp: $(1 - e^{-t/\tau})$ tăng từ 0 đến $CV$; xả: $q_0 e^{-t/\tau}$ giảm về 0 — cùng $\tau$, đừng nhầm dấu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Giải $y' = 3x^2$.

**Bài 2**: Giải $y' = -y$ với $y(0) = 5$.

**Bài 3**: Giải $y'' + 4y = 0$.

**Bài 4**: PT phân rã phóng xạ $\frac{dN}{dt} = -\lambda N$ với chu kỳ bán rã $T_{1/2} = 5730$ năm (C-14). Tìm $\lambda$.

**Bài 5**: Giải $y' + y = e^x$ với $y(0) = 1$.

**Bài 6** (làm nguội Newton): Một thanh kim loại $200°$C đặt trong phòng $20°$C, sau 10 phút còn $120°$C. a) Tìm $k$. b) Sau 30 phút nhiệt độ là bao nhiêu?

**Bài 7** (logistic): Đàn cá hồ có sức chứa $K = 5000$, $r = 0.4$/năm, ban đầu $N_0 = 500$. Viết $N(t)$ và tính $N$ khi $t \to \infty$.

**Bài 8** (tuyến tính, chuẩn dạng): Giải $xy' - y = x^2$ ($x > 0$).

**Bài 9** (bậc 2, $\Delta < 0$ + IVP): Giải $y'' + 9y = 0$ với $y(0) = 1$, $y'(0) = 6$.

**Bài 10** (bậc 2, $\Delta = 0$ + IVP): Giải $y'' + 4y' + 4y = 0$ với $y(0) = 1$, $y'(0) = 1$.

### Lời giải

**Bài 1**: $y = \int 3x^2\,dx = \mathbf{x^3 + C}$.

**Bài 2**: $\frac{dy}{y} = -dx \to \ln y = -x + C \to y = A\cdot e^{-x}$. $y(0) = A = 5$. → $\mathbf{y = 5\cdot e^{-x}}$.

**Bài 3**: $r^2 + 4 = 0 \to r = \pm 2i$. → $\mathbf{y = C_1\cos(2x) + C_2\sin(2x)}$.

**Bài 4**: $N(t) = N_0\cdot e^{-\lambda t}$. $N(T_{1/2}) = N_0/2 \to e^{-\lambda T} = 1/2 \to \lambda T = \ln 2 \to \mathbf{\lambda = \dfrac{\ln 2}{5730} \approx 1.21\cdot 10^{-4}}$ /năm.

**Bài 5**: $\mu = e^x$. $e^x\cdot y = \int e^x\cdot e^x\,dx = \frac{e^{2x}}{2} + C \to y = \frac{e^x}{2} + C\cdot e^{-x}$. $y(0) = \frac{1}{2} + C = 1 \to C = \frac{1}{2}$. → $\mathbf{y = \dfrac{e^x + e^{-x}}{2} = \cosh x}$.

**Bài 6**: Công thức nguội Newton $T(t) = T_s + (T_0 - T_s)e^{-kt} = 20 + 180e^{-kt}$.
- a) $T(10) = 20 + 180e^{-10k} = 120 \to e^{-10k} = \frac{100}{180} = 0.556 \to -10k = \ln 0.556 = -0.588 \to \mathbf{k \approx 0.0588}$/phút.
- b) $T(30) = 20 + 180e^{-0.0588\cdot 30} = 20 + 180e^{-1.764} = 20 + 180\cdot 0.171 = 20 + 30.8 = \mathbf{50.8°}$C.

**Bài 7**: Công thức logistic (Walk-through B): $N(t) = \dfrac{K}{1 + \left(\frac{K-N_0}{N_0}\right)e^{-rt}}$. Với $K=5000$, $N_0 = 500$: $\frac{K-N_0}{N_0} = \frac{4500}{500} = 9$. → $\mathbf{N(t) = \dfrac{5000}{1 + 9e^{-0.4t}}}$. Khi $t\to\infty$: $e^{-0.4t}\to 0 \to N \to \dfrac{5000}{1} = \mathbf{5000} = K$ (chạm sức chứa).

**Bài 8**: Chuẩn dạng — chia cho $x$: $y' - \frac{1}{x}y = x$. $P = -\frac{1}{x} \to \mu = e^{\int -\frac{1}{x}dx} = e^{-\ln x} = \frac{1}{x}$. $\left(\frac{1}{x}y\right)' = \frac{1}{x}\cdot x = 1 \to \frac{y}{x} = \int 1\,dx = x + C \to \mathbf{y = x^2 + Cx}$. Verify ($C=0$): $y = x^2$, $xy' - y = 2x^2 - x^2 = x^2$ ✓.

**Bài 9**: $r^2 + 9 = 0 \to r = \pm 3i$ ($\alpha = 0$, $\beta = 3$). Tổng quát $y = C_1\cos 3x + C_2\sin 3x$. $y(0) = C_1 = 1$. $y' = -3C_1\sin 3x + 3C_2\cos 3x$, $y'(0) = 3C_2 = 6 \to C_2 = 2$. → $\mathbf{y = \cos 3x + 2\sin 3x}$.

**Bài 10**: $r^2 + 4r + 4 = (r+2)^2 = 0 \to r = -2$ kép. Tổng quát $y = (C_1 + C_2 x)e^{-2x}$. $y(0) = C_1 = 1$. $y' = C_2 e^{-2x} - 2(C_1 + C_2 x)e^{-2x} = (C_2 - 2C_1 - 2C_2 x)e^{-2x}$, $y'(0) = C_2 - 2C_1 = 1 \to C_2 = 3$. → $\mathbf{y = (1 + 3x)e^{-2x}}$.

---

## 8. Bài tiếp theo

[Lesson 08 — Xác suất & thống kê](../lesson-08-probability-statistics/).

## 📝 Tổng kết

1. **ODE**: PT chứa hàm $y(x)$ + đạo hàm; nghiệm là **hàm** (cả họ, kèm hằng số). Bậc = bậc cao nhất của đạo hàm; tuyến tính = $y$ và đạo hàm chỉ bậc 1. ODE = "tốc độ thay đổi phụ thuộc trạng thái hiện tại".
2. **Trường hướng (slope field)**: $y' = F(x,y)$ cho độ dốc tại mỗi điểm; nghiệm "trôi theo" — thấy hành vi mà chưa cần công thức.
3. **Bậc 1 tách biến** (4 bước): $\frac{dy}{g(y)} = f(x)\,dx$ → tích phân. Ba mô hình: mũ, logistic (chữ S), nguội Newton. Nhớ kiểm **nghiệm hằng** $g(y)=0$.
4. **Bậc 1 tuyến tính**: chuẩn dạng $y'+Py=Q$ → thừa số tích phân $\mu = e^{\int P}$ → $(\mu y)' = \mu Q$.
5. **Bậc 2 tuyến tính hệ số hằng**: $e^{rx}(r^2+ar+b)=0$ → PT đặc trưng. 3 dạng nghiệm theo $\Delta$ ($>0$ tắt không dao động, $=0$ kép nhân $x$, $<0$ dao động).
6. **IVP**: bậc $n$ → $n$ hằng số → $n$ điều kiện. Luôn viết $+C$ **trước**, áp điều kiện đầu **sau**.
7. **Ứng dụng**: dao động (con lắc, lò xo tắt dần), phóng xạ, RC, dân số (mũ/logistic), làm nguội.
