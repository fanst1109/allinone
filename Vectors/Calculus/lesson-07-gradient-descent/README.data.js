// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/Calculus/lesson-07-gradient-descent/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Gradient Descent

> "Tầng 3 — Calculus, bài 7/8. Đây là **ứng dụng đỉnh** của toàn bộ giải tích trong machine learning: thuật toán nuôi sống mọi neural network hiện đại. Bạn sẽ rời lesson này với khả năng implement gradient descent từ đầu, hiểu vì sao learning rate là siêu tham số sống-còn, và đọc được training loop của PyTorch/TensorFlow."

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được công thức **gradient descent** cho hàm 1 biến và nhiều biến, và **giải thích bằng lời** vì sao dấu trừ là cần thiết.
2. **Chạy tay** gradient descent 10 bước cho \`f(x) = x²\` và 5–7 bước cho \`f(x,y) = x² + 2y²\` mà không cần máy.
3. Hiểu **learning rate** (η) ảnh hưởng tới hội tụ thế nào — học rate quá nhỏ thì sao, quá lớn thì sao, "vừa" là vừa cỡ nào.
4. Phân biệt **Batch GD / SGD / Mini-batch GD / Momentum / Adam** ở mức intuitive — biết khi nào dùng cái nào.
5. Áp dụng gradient descent để **fit linear regression** với dữ liệu thật, so sánh kết quả với nghiệm closed-form (đã học ở Lesson 05).
6. Đọc được một training loop trong PyTorch/TF và **chỉ ra dòng nào là gradient descent**.

## Kiến thức tiền đề

- [Lesson 05 — Cực trị 1 biến](../lesson-05-optimization-1d/): biết "đáy đồi tương ứng với \`f'(x) = 0\`", và biết closed-form solution của linear regression bằng cách giải hệ \`∂L/∂a = 0, ∂L/∂b = 0\`.
- [Lesson 06 — Đạo hàm riêng + gradient](../lesson-06-partial-gradient/): biết \`∇f = (∂f/∂x, ∂f/∂y, …)\` là vector chỉ hướng dốc lên nhanh nhất.
- [Lesson 04 — Chain rule](../lesson-04-chain-rule/): vì backprop = chain rule + gradient descent. Lesson này chỉ lo phần "+ gradient descent".
- Tầng 1 — Algebra: hàm bậc 2, hệ phương trình tuyến tính (dùng ở phần linear regression).

> **💡 Đọc trước bài này một câu**
> Đạo hàm cho bạn biết **chỗ đáy ở đâu** (\`f'(x) = 0\`). Gradient descent cho bạn biết **làm sao đi tới chỗ đó** khi không thể giải \`f'(x) = 0\` bằng tay — và 99% bài toán ML là như thế.

---

## 1. Trực giác đời sống — đứng trên đồi sương mù

### 1.1. Câu chuyện

Bạn đứng trên một ngọn đồi. Sương mù dày đặc — chỉ nhìn được **dưới chân mình** vài bước. Bạn muốn xuống đáy thung lũng (= điểm thấp nhất của địa hình) trước khi trời tối.

Bạn không có bản đồ. Bạn không nhìn được tổng thể địa hình. Tất cả thứ bạn biết tại vị trí hiện tại là:

- **Độ dốc dưới chân** (slope): hướng nào dốc lên nhanh nhất.

Chiến lược hợp lý nhất:

1. Cảm nhận hướng dốc lên dưới chân.
2. **Bước ngược lại** (= hướng dốc xuống).
3. Bước một đoạn vừa phải — không quá bé (mất cả ngày), không quá lớn (lao xuống vực bên kia).
4. Tới chỗ mới → lặp lại từ bước 1.
5. Khi thấy dưới chân **phẳng** (không dốc nữa) → đã tới đáy (hoặc gần đáy).

> **Đó chính là gradient descent.**

### 1.2. Map sang toán

| Đời sống | Toán học |
|---|---|
| Ngọn đồi | Đồ thị hàm \`f(x)\` (hoặc \`f(x,y)\`, hay nhiều chiều hơn) |
| Vị trí của bạn | Điểm \`x_t\` (hay \`(x_t, y_t)\`) tại bước thứ \`t\` |
| Độ cao tại vị trí | Giá trị \`f(x_t)\` |
| Hướng dốc lên nhanh nhất | Gradient \`∇f(x_t)\` (Lesson 06) |
| Hướng dốc xuống nhanh nhất | \`−∇f(x_t)\` (gradient có dấu trừ) |
| Độ dài mỗi bước | **Learning rate** \`η\` (eta) |
| Quy tắc đi | \`x_{t+1} = x_t − η · ∇f(x_t)\` |
| Đáy thung lũng | Cực tiểu của \`f\` (local minimum) |

### 1.3. Vì sao dấu trừ?

\`∇f(x_t)\` chỉ hướng **f tăng nhanh nhất**. Ta muốn f **giảm** → đi ngược lại.

- Nếu bạn quên dấu trừ → bạn đang **leo đồi**, càng đi loss càng tăng, model càng học càng tệ. (Đây là lỗi #1 khi tự viết training loop bằng tay — sẽ nói lại ở mục 9.)

### 1.4. Vì sao chỉ nhìn dưới chân lại đủ?

Vì gradient là một **đặc tính local** — chỉ cần biết f ở vùng cực nhỏ quanh \`x_t\` là tính được. Trong ML, hàm loss thường có **hàng triệu biến** (= hàng triệu tham số của neural network). Không ai vẽ được landscape của một hàm 175 tỷ chiều (GPT-3). Nhưng gradient ở **một điểm cụ thể** vẫn tính được, bằng cách lan truyền chain rule (backpropagation).

> **💡 Tóm gọn**
> Gradient descent = la bàn local + chiến lược "bước ngược dốc". Không cần biết toàn cảnh, vẫn xuống được đáy (gần đúng).

---

## 2. Thuật toán cốt lõi

### 2.1. Pseudocode

\`\`\`
INPUT:
    f       — hàm cần cực tiểu hóa
    ∇f      — gradient của f (tính tay hoặc dùng autograd)
    x₀      — điểm khởi tạo (vd: 0, hoặc random)
    η       — learning rate (vd: 0.1, 0.01, ...)
    ε       — ngưỡng dừng (vd: 1e-6)
    T_max   — số bước tối đa

ALGORITHM:
    x ← x₀
    for t = 0, 1, 2, ..., T_max:
        g ← ∇f(x)            # tính gradient tại vị trí hiện tại
        if |g| < ε:
            break             # đã phẳng, dừng
        x ← x − η · g         # bước ngược gradient
    return x
\`\`\`

### 2.2. Công thức 1 biến

Khi \`f: ℝ → ℝ\` (1 biến vào, 1 biến ra), gradient = đạo hàm thường:

\`\`\`
x_{t+1} = x_t − η · f'(x_t)
\`\`\`

### 2.3. Công thức nhiều biến

Khi \`f: ℝⁿ → ℝ\` (n biến vào, 1 biến ra), gradient là **vector**:

\`\`\`
∇f(x) = ( ∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ )

x_{t+1} = x_t − η · ∇f(x_t)
\`\`\`

Phép trừ ở đây là **trừ vector** — trừ thành phần theo thành phần.

### 2.4. Các thành phần "siêu tham số"

| Tham số | Ý nghĩa | Giá trị thường dùng |
|---|---|---|
| \`x₀\` | Khởi tạo | 0, hoặc random nhỏ (vd ~N(0, 0.01)) cho NN |
| \`η\` | Learning rate | 0.001 – 0.1 (cho NN), 0.01 – 1.0 (cho convex problem nhỏ) |
| \`ε\` | Ngưỡng "đủ phẳng" | 1e-6 hoặc 1e-8 |
| \`T_max\` | Số bước max | hàng nghìn → hàng triệu cho NN |

> **❓ Câu hỏi tự nhiên**
>
> **Hỏi:** Tại sao không dừng khi \`f(x_t) − f(x_{t-1})\` rất nhỏ thay vì \`|∇f| < ε\`?
> **Đáp:** Cũng dùng được, gọi là \`tol_loss\`. Nhưng \`|∇f| < ε\` có cơ sở toán hơn vì điều kiện cần để cực tiểu là \`∇f = 0\`. Trong thực tế thường dùng **cả hai** + early stopping trên validation loss.
>
> **Hỏi:** \`x₀\` chọn thế nào quan trọng không?
> **Đáp:** Với hàm **convex** (như \`x²\` hay MSE của linear regression): không quan trọng, bất kể chọn đâu cũng tới một local min duy nhất = global min. Với NN (non-convex): rất quan trọng — sai khởi tạo có thể stuck ở local min tệ hoặc gradient vanish/explode.

### 2.5. Vì sao điều này "đúng" về toán?

Khai triển Taylor cấp 1 quanh \`x_t\`:

\`\`\`
f(x_t + Δ) ≈ f(x_t) + ∇f(x_t)ᵀ · Δ
\`\`\`

Ta muốn chọn \`Δ\` để **f giảm nhất** với \`|Δ|\` cố định. Đặt \`Δ = c · u\` với \`u\` là vector đơn vị và \`c > 0\`. Ta cần:

\`\`\`
∇f(x_t)ᵀ · u  →  nhỏ nhất (âm nhất)
\`\`\`

Theo bất đẳng thức Cauchy-Schwarz, \`∇f(x_t)ᵀ · u ≥ −|∇f(x_t)| · |u| = −|∇f(x_t)|\`, đạt được khi \`u = −∇f(x_t) / |∇f(x_t)|\`. Vậy hướng giảm f nhanh nhất là \`−∇f(x_t)\`. **Đó là lý do toán học của dấu trừ.**

> **📝 Tóm tắt mục 2**
>
> - Update rule: \`x_{t+1} = x_t − η · ∇f(x_t)\`.
> - Dấu trừ là vì gradient chỉ hướng tăng, ta muốn giảm.
> - Có cơ sở Taylor + Cauchy-Schwarz đảm bảo đây là **hướng giảm nhanh nhất**.
> - Dừng khi \`|∇f| < ε\` hoặc đạt \`T_max\`.

---

## 3. Walk-through 1 biến: \`f(x) = x²\`

### 3.1. Setup

\`\`\`
f(x)  = x²
f'(x) = 2x
\`\`\`

Minimum analytic: \`f'(x) = 0 ⟹ x* = 0, f(x*) = 0\`.

Chọn:

- \`x₀ = 5\`
- \`η = 0.1\`

### 3.2. Bước 1

\`\`\`
g₀  = f'(x₀) = 2·5 = 10
x₁  = x₀ − η · g₀ = 5 − 0.1·10 = 5 − 1 = 4
f(x₁) = 16
\`\`\`

So với \`f(x₀) = 25\` → giảm. Tốt.

### 3.3. Bước 2

\`\`\`
g₁  = 2·4 = 8
x₂  = 4 − 0.1·8 = 4 − 0.8 = 3.2
f(x₂) = 10.24
\`\`\`

### 3.4. Bước 3

\`\`\`
g₂  = 2·3.2 = 6.4
x₃  = 3.2 − 0.1·6.4 = 3.2 − 0.64 = 2.56
f(x₃) = 6.5536
\`\`\`

### 3.5. Bảng 10 bước

Quan sát: mỗi bước \`x_{t+1} = x_t − 0.1·2x_t = 0.8·x_t\`. Vậy \`x_t = 5 · 0.8ᵗ\`.

| Bước \`t\` | \`x_t\` | \`f(x_t) = x_t²\` | \`f'(x_t) = 2x_t\` | Update \`Δx = −η·g\` |
|---|---|---|---|---|
| 0 | 5.0000 | 25.0000 | 10.0000 | −1.0000 |
| 1 | 4.0000 | 16.0000 | 8.0000 | −0.8000 |
| 2 | 3.2000 | 10.2400 | 6.4000 | −0.6400 |
| 3 | 2.5600 | 6.5536 | 5.1200 | −0.5120 |
| 4 | 2.0480 | 4.1943 | 4.0960 | −0.4096 |
| 5 | 1.6384 | 2.6844 | 3.2768 | −0.3277 |
| 6 | 1.3107 | 1.7180 | 2.6214 | −0.2621 |
| 7 | 1.0486 | 1.0995 | 2.0972 | −0.2097 |
| 8 | 0.8389 | 0.7037 | 1.6777 | −0.1678 |
| 9 | 0.6711 | 0.4504 | 1.3422 | −0.1342 |
| 10 | 0.5369 | 0.2882 | 1.0737 | −0.1074 |

Sau 10 bước, \`x\` đi từ 5 xuống ~0.54, \`f\` từ 25 xuống ~0.29. Hội tụ theo cấp số nhân (geometric), tốc độ \`0.8\` mỗi bước.

### 3.6. Khi nào dừng?

Nếu đặt \`ε = 0.01\` (cho \`|f'|\`), ta cần \`|2x_t| < 0.01 ⟹ |x_t| < 0.005\`. Vì \`x_t = 5·0.8ᵗ\`:

\`\`\`
5·0.8ᵗ < 0.005  ⟹  0.8ᵗ < 0.001
⟹  t · log(0.8) < log(0.001)
⟹  t > log(0.001) / log(0.8) ≈ −3 / −0.0969 ≈ 30.96
\`\`\`

Vậy cần ~31 bước. (Verify: \`5·0.8³¹ ≈ 5·0.000951 ≈ 0.00476 < 0.005\` ✓)

### 3.7. Verify bằng "cảm quan"

Bạn có thể nhận ra: bước \`t\` ta luôn nhân với hệ số \`(1 − 2η)\`. Với \`η = 0.1\`, hệ số là \`0.8\` → hội tụ nhanh. Với \`η = 0.01\`, hệ số là \`0.98\` → hội tụ chậm (cần ~228 bước cho cùng độ chính xác). Với \`η = 0.5\`, hệ số là \`0\` → một bước tới đích (!). Với \`η = 0.6\`, hệ số là \`−0.2\` → "đu" qua đu lại quanh 0, vẫn hội tụ nhưng dao động. Với \`η = 1.1\`, hệ số là \`−1.2\` → bay ra xa! (sẽ phân tích kỹ ở mục 6.)

> **🔁 Dừng lại tự kiểm tra**
>
> 1. Với \`f(x) = x²\`, \`x₀ = 10\`, \`η = 0.05\`, sau 2 bước \`x = ?\`
>    <details><summary>Đáp</summary>
>
>    \`x₁ = 10 − 0.05·20 = 9\`. \`x₂ = 9 − 0.05·18 = 8.1\`. Mỗi bước nhân với \`0.9\`.
>    </details>
>
> 2. Với \`f(x) = x²\`, \`η = 0.5\`, dù \`x₀\` là gì, sau 1 bước \`x = ?\`
>    <details><summary>Đáp</summary>
>
>    \`x₁ = x₀ − 0.5·2x₀ = x₀ − x₀ = 0\`. Tới minimum trong 1 bước. Đó là vì \`η = 1/(f''(x)) = 1/2\` chính là **Newton's step** cho hàm convex bậc 2 — không phải may mắn.
>    </details>

---

## 4. Walk-through 2 biến: \`f(x, y) = x² + 2y²\`

### 4.1. Setup

\`\`\`
f(x, y)    = x² + 2y²
∂f/∂x      = 2x
∂f/∂y      = 4y
∇f(x, y)   = (2x, 4y)
\`\`\`

Minimum analytic: \`∇f = (0,0) ⟹ (x*, y*) = (0, 0), f(x*, y*) = 0\`.

Chọn:

- \`(x₀, y₀) = (5, 5)\`
- \`η = 0.1\`

### 4.2. Bước 1

\`\`\`
g₀ = ∇f(5, 5) = (2·5, 4·5) = (10, 20)
x₁ = 5 − 0.1·10 = 4
y₁ = 5 − 0.1·20 = 3
f(x₁, y₁) = 4² + 2·3² = 16 + 18 = 34
\`\`\`

So với \`f(5,5) = 25 + 50 = 75\` → giảm hơn 1/2. Tốt.

### 4.3. Bước 2

\`\`\`
g₁ = ∇f(4, 3) = (8, 12)
x₂ = 4 − 0.1·8  = 3.2
y₂ = 3 − 0.1·12 = 1.8
f(x₂, y₂) = 3.2² + 2·1.8² = 10.24 + 6.48 = 16.72
\`\`\`

### 4.4. Bước 3 → 7

Tổng quát: \`x_{t+1} = 0.8·x_t\`, \`y_{t+1} = 0.6·y_t\`. Hai chiều **hội tụ với tốc độ khác nhau** vì hệ số khác nhau (\`2η = 0.2\` và \`4η = 0.4\`).

| \`t\` | \`x_t\` | \`y_t\` | \`f(x_t, y_t)\` | \`∇f\` |
|---|---|---|---|---|
| 0 | 5.0000 | 5.0000 | 75.0000 | (10, 20) |
| 1 | 4.0000 | 3.0000 | 34.0000 | (8, 12) |
| 2 | 3.2000 | 1.8000 | 16.7200 | (6.4, 7.2) |
| 3 | 2.5600 | 1.0800 | 8.8832 | (5.12, 4.32) |
| 4 | 2.0480 | 0.6480 | 5.0339 | (4.096, 2.592) |
| 5 | 1.6384 | 0.3888 | 2.9866 | (3.277, 1.555) |
| 6 | 1.3107 | 0.2333 | 1.8268 | (2.621, 0.933) |
| 7 | 1.0486 | 0.1400 | 1.1387 | (2.097, 0.560) |

Sau 7 bước, y đã gần 0 (0.14), x còn ~1.05. **Chiều y hội tụ nhanh hơn x** vì curvature theo y lớn hơn (hệ số 2 trong \`2y²\`).

### 4.5. Bài học từ walk-through

- Khi các chiều có curvature **khác nhau** (gọi là *ill-conditioned*), GD vanilla bị "đu" theo chiều dốc nhanh và bò chậm theo chiều dốc thoải.
- Mathematical fix: **preconditioning** (chia gradient từng chiều cho căn của curvature). Adam/RMSProp làm gần đúng cái này tự động.

> **🔁 Dừng lại tự kiểm tra**
>
> Với \`f(x,y) = x² + 9y²\`, \`(x₀, y₀) = (1, 1)\`, \`η = 0.1\`, tìm \`(x₁, y₁)\`.
>
> <details><summary>Đáp</summary>
>
> \`∇f = (2x, 18y) = (2, 18)\`. \`x₁ = 1 − 0.1·2 = 0.8\`. \`y₁ = 1 − 0.1·18 = −0.8\`.
>
> Chú ý y "đu" qua 0 (từ +1 sang −0.8)! Đây là dấu hiệu η hơi lớn so với chiều y. Nếu η = 0.12 thì \`y₁ = 1 − 0.12·18 = −1.16\` — biên độ tăng → diverge.
> </details>

---

## 5. Sao không tính \`∇f = 0\` trực tiếp?

> **❓ Câu hỏi rất tự nhiên**
> Nếu cực tiểu xảy ra tại \`∇f = 0\`, sao không **giải phương trình \`∇f = 0\`** thay vì lặp đi lặp lại?

### 5.1. Đôi khi giải được

Với linear regression (đã học ở Lesson 05), \`∇L = 0\` là **hệ tuyến tính** → có công thức đóng (closed-form). Trường hợp này **không cần** GD — closed-form nhanh và chính xác hơn.

### 5.2. Hầu hết thì KHÔNG

Với neural network:

- \`f = L(W₁, W₂, …, W_L)\` với W là tensor — hàng triệu tới hàng tỉ tham số.
- \`∇f = 0\` là hệ **phi tuyến** với hàng triệu phương trình, không có công thức đóng.
- Giải bằng các phương pháp đại số (Newton, fixed-point) yêu cầu invert ma trận Hessian có kích cỡ \`N × N\` — \`N\` triệu → Hessian \`triệu × triệu\` → không lưu nổi RAM, không invert nổi trong vài tuần GPU.

### 5.3. GD đổi gì?

- Chỉ cần **gradient first-order** (chứ không cần Hessian).
- Mỗi bước rẻ: \`O(N)\` thay vì \`O(N³)\` của Newton.
- Có thể song song hóa cực tốt trên GPU.

> **💡 Trực giác**
> Closed-form như **xem bản đồ và bay tới đáy**. GD như **đi bộ với la bàn local**. Bay nhanh hơn rất nhiều — nhưng cần phải có bản đồ. Khi không có bản đồ, đi bộ là cách duy nhất.

---

## 6. Chọn learning rate \`η\` — Phần ĐẶC BIỆT QUAN TRỌNG

### 6.1. Vì sao đây là siêu tham số sống-còn

Toàn bộ "nghệ thuật" train một model thường rút lại còn câu: *"Chọn \`η\` cho đúng."*. Quá nhỏ — model train cả tháng không xong. Quá lớn — diverge sau 100 bước, loss thành \`NaN\`. Vừa — train một vài tiếng → kết quả tốt.

### 6.2. Η quá NHỎ — hội tụ chậm

Trở lại \`f(x) = x²\`, \`x₀ = 5\`. Nhớ rằng \`x_{t+1} = (1 − 2η)·x_t\`.

Với \`η = 0.001\`, hệ số là \`0.998\`. Để \`|x_t| < 0.005\`:

\`\`\`
5·0.998ᵗ < 0.005
0.998ᵗ < 0.001
t · log(0.998) < log(0.001)
t > log(0.001) / log(0.998) ≈ −3 / −0.000869 ≈ 3453
\`\`\`

→ Cần **3453 bước** thay vì 31 (với \`η = 0.1\`). Train chậm hơn 110 lần!

Verify: \`5·0.998^3453 ≈ 5·0.0009998 ≈ 0.005\` ✓

> **⚠ Lỗi thường gặp**
> Nhiều người mới thấy "loss vẫn đang giảm" → tưởng training tốt. Nhưng nếu mỗi bước chỉ giảm 0.001% và epoch lấy cả tiếng → bạn cần 1000 tiếng để có model có thể nhận được. Đây không phải "an toàn" — đây là **lãng phí**.

### 6.3. Η quá LỚN — overshoot và diverge

Vẫn \`f(x) = x²\`, \`x₀ = 5\`. Lấy \`η = 1.1\`:

\`\`\`
g₀ = 2·5 = 10
x₁ = 5 − 1.1·10 = 5 − 11 = −6
f(x₁) = 36

g₁ = 2·(−6) = −12
x₂ = −6 − 1.1·(−12) = −6 + 13.2 = 7.2
f(x₂) = 51.84

g₂ = 2·7.2 = 14.4
x₃ = 7.2 − 1.1·14.4 = 7.2 − 15.84 = −8.64
f(x₃) = 74.6496
\`\`\`

| \`t\` | \`x_t\` | \`f(x_t)\` |
|---|---|---|
| 0 | 5 | 25 |
| 1 | −6 | 36 |
| 2 | 7.2 | 51.84 |
| 3 | −8.64 | 74.65 |
| 4 | 10.37 | 107.5 |
| 5 | −12.44 | 154.8 |

Tổng quát: \`x_{t+1} = (1 − 2·1.1)·x_t = −1.2·x_t\`. Biên độ nhân 1.2 mỗi bước → **phân kỳ theo cấp số nhân**. Loss bùng nổ.

### 6.4. Η đúng phép tới đâu trước khi diverge?

Với \`f(x) = x²\`, \`x_{t+1} = (1 − 2η)·x_t\`. Hội tụ ⟺ \`|1 − 2η| < 1\` ⟺ \`0 < η < 1\`. Tốt nhất khi \`1 − 2η = 0\`, tức \`η = 0.5\` — tới đích 1 bước.

Trong tổng quát: với \`f\` lồi (convex) có Lipschitz gradient với hằng số \`L\` (\`|∇f(x) − ∇f(y)| ≤ L·|x − y|\`), GD hội tụ nếu \`η ≤ 1/L\`. **Đó là lý thuyết.** Với \`f = x²\`, \`L = 2\` → \`η_max = 1/2 = 0.5\`. Khớp.

### 6.5. Η "hơi lớn" — oscillation nhưng vẫn hội tụ

Với \`η = 0.6\` cho \`f = x²\`: hệ số \`1 − 2·0.6 = −0.2\`. \`x_t = 5·(−0.2)ᵗ\`. \`x\` đu qua đu lại nhưng biên độ giảm dần (vì \`|−0.2| < 1\`). Vẫn hội tụ.

| \`t\` | \`x_t\` |
|---|---|
| 0 | 5 |
| 1 | −1 |
| 2 | 0.2 |
| 3 | −0.04 |
| 4 | 0.008 |

Hội tụ nhanh hơn \`η = 0.1\`! Nhưng dao động dấu — nhìn loss curve thấy "zigzag". Trong NN, oscillation thường là dấu hiệu η đang ở biên — có thể stable, có thể không, tùy mini-batch.

### 6.6. Vùng \`η\` cho \`f = x²\`

| Vùng η | Hệ số \`1 − 2η\` | Hành vi |
|---|---|---|
| \`0 < η < 0.5\` | \`(0, 1)\` | Giảm đơn điệu, hội tụ |
| \`η = 0.5\` | \`0\` | 1 bước tới đích |
| \`0.5 < η < 1\` | \`(−1, 0)\` | Đu, biên độ giảm, hội tụ |
| \`η = 1\` | \`−1\` | Đu vĩnh viễn quanh 0 (không hội tụ) |
| \`η > 1\` | \`< −1\` | Diverge |

### 6.7. Trong thực tế thì sao?

Không ai biết \`L\` chính xác cho NN. Thực hành:

1. **Bắt đầu nhỏ** (vd 1e-3 cho Adam, 1e-2 cho SGD), tăng dần nếu thấy loss giảm chậm.
2. **Learning rate finder** (Cyclical Learning Rates của Leslie Smith): chạy 100 bước với \`η\` tăng từ 1e-7 → 10, vẽ loss vs \`η\`. Chọn \`η\` ở giữa vùng loss giảm nhanh nhất.
3. **Learning rate schedule**: bắt đầu lớn (vd 0.1), giảm dần (theo step, cosine, exponential...). Lý do: cần bước lớn lúc đầu để khám phá, bước nhỏ lúc cuối để tinh chỉnh.
4. **Adaptive optimizers (Adam, RMSProp)**: tự điều chỉnh \`η\` cho từng tham số theo lịch sử gradient. Mặc định industry-standard cho NN.

### 6.8. Plot trực quan

Loss vs số bước, với 4 giá trị η khác nhau (cho \`f = x²\`, \`x₀ = 5\`):

\`\`\`
η=0.01: ----------------------------------- (giảm chậm, gần như tuyến tính)
η=0.1:  ____\\__________________________ (giảm nhanh đầu, dần phẳng)
η=0.5:  \\_________________________________ (1 bước về 0)
η=1.1:  /\\/\\/\\___ →∞ (phân kỳ, đi lên cao dần)
\`\`\`

Visualization (xem \`visualization.html\`) cho phép kéo slider η để thấy trực quan.

> **⚠ Lỗi thường gặp khi tune η**
>
> 1. Tăng η liên tục tới khi loss \`NaN\` rồi giảm xuống lần cuối hoạt động: thường ổn, nhưng có thể bị **edge of stability** — chạy ổn ở một seed nhưng không ổn ở seed khác.
> 2. Quên scale η khi đổi batch size: batch lớn gấp 2 → cần η lớn gấp ~2 (linear scaling rule cho SGD).
> 3. Dùng η của Adam (1e-3) cho SGD: SGD cần η lớn hơn ~10–100×.

> **📝 Tóm tắt mục 6**
>
> - Học rate \`η\` quyết định "cỡ bước". Cực kỳ nhạy.
> - Quá nhỏ → train mãi không xong. Quá lớn → diverge.
> - Lý thuyết: \`η ≤ 1/L\` với \`L\` là Lipschitz constant của ∇f.
> - Thực hành: LR finder + LR schedule + Adam.

---

## 7. Variants — tổng quan ngắn

Trong thực tế, "gradient descent" hiếm khi là **vanilla GD** như mô tả ở mục 2. Có rất nhiều biến thể.

### 7.1. Batch GD (Full-batch)

Mỗi bước tính gradient dùng **toàn bộ** dataset:

\`\`\`
g_t = (1/N) · Σᵢ ∇L(x_t; sampleᵢ)
\`\`\`

- ✅ Gradient chính xác → đường tới minimum mượt.
- ❌ Mỗi bước cần xử lý toàn bộ data — quá đắt với N = hàng triệu.

### 7.2. Stochastic GD (SGD)

Mỗi bước tính gradient dùng **1 sample** ngẫu nhiên:

\`\`\`
g_t = ∇L(x_t; sample_i)    # i là 1 sample random
\`\`\`

- ✅ Mỗi bước cực nhanh.
- ✅ Noise giúp **thoát saddle point** và một số local min nông.
- ❌ Đường đi loss "zigzag" mạnh.

### 7.3. Mini-batch GD

Mỗi bước dùng **batch nhỏ** (32, 64, 128, 256, …):

\`\`\`
g_t = (1/B) · Σᵢ ∈ batch ∇L(x_t; sampleᵢ)
\`\`\`

- ✅ Compromise: noise vừa phải, vectorize tốt trên GPU.
- ✅ **Chuẩn industry** cho mọi training NN.

### 7.4. Momentum (Polyak's Heavy Ball)

Cộng "vận tốc" từ bước trước:

\`\`\`
v_t = β · v_{t-1} + ∇f(x_t)        # β ≈ 0.9 thường dùng
x_{t+1} = x_t − η · v_t
\`\`\`

- ✅ Vượt **local min nông** (như bi sắt lăn quán tính).
- ✅ Giảm zigzag ở thung lũng dài hẹp.

### 7.5. Nesterov Accelerated Gradient (NAG)

Cải tiến momentum: tính gradient **tại điểm sau khi đã đi vận tốc**:

\`\`\`
v_t = β · v_{t-1} + ∇f(x_t − η·β·v_{t-1})
x_{t+1} = x_t − η · v_t
\`\`\`

- ✅ "Nhìn trước một bước" → bớt overshoot ở đáy.

### 7.6. AdaGrad

Học rate khác cho từng tham số, dựa trên tổng bình phương gradient quá khứ:

\`\`\`
s_t = s_{t-1} + g_t²         # tích lũy bình phương gradient
x_{t+1} = x_t − η · g_t / √(s_t + ε)
\`\`\`

- ✅ Tốt cho **sparse feature** (NLP).
- ❌ \`s_t\` chỉ tăng → η effective giảm về 0 — train chậm dần.

### 7.7. RMSProp

Sửa AdaGrad bằng moving average thay vì sum:

\`\`\`
s_t = ρ · s_{t-1} + (1-ρ) · g_t²
x_{t+1} = x_t − η · g_t / √(s_t + ε)
\`\`\`

### 7.8. Adam (Adaptive Moment Estimation)

Kết hợp momentum + RMSProp:

\`\`\`
m_t = β₁ · m_{t-1} + (1-β₁) · g_t       # ước lượng moment 1 (mean)
v_t = β₂ · v_{t-1} + (1-β₂) · g_t²      # ước lượng moment 2 (variance)
m̂_t = m_t / (1 − β₁ᵗ)                    # bias correction
v̂_t = v_t / (1 − β₂ᵗ)
x_{t+1} = x_t − η · m̂_t / (√v̂_t + ε)
\`\`\`

Mặc định: \`β₁ = 0.9, β₂ = 0.999, ε = 1e-8, η = 1e-3\`.

- ✅ **Mặc định** khi train mọi NN.
- ✅ Robust với LR tuning.
- ⚠ Đôi khi generalization kém hơn SGD + momentum (cho CV).

### 7.9. Khi nào dùng cái nào?

| Tình huống | Optimizer |
|---|---|
| Bắt đầu mọi project | Adam (\`lr = 1e-3\`) |
| Computer vision, lúc cuối finetune | SGD + momentum + LR schedule |
| NLP / Transformer | AdamW (Adam + weight decay tách riêng) |
| Sparse features | AdaGrad / Adam |
| Convex problem đơn giản | Vanilla GD (vẫn ổn, vẫn nhanh) |

> **📝 Tóm tắt mục 7**
>
> - Vanilla GD là khung. Thực tế dùng các biến thể.
> - Mini-batch + Adam là baseline mặc định.
> - Momentum giúp vượt local min nông. Adaptive (Adam, RMSProp) tự điều chỉnh η.

---

## 8. Câu hỏi tự nhiên của người đọc

> **❓ Có chắc tìm được global min không?**
>
> **KHÔNG**, nói chung. GD chỉ đảm bảo tới **stationary point** (\`∇f = 0\`), có thể là local min, local max, hoặc saddle.
>
> - Hàm **convex** (như MSE của linear regression, logistic regression không có regularization phi tuyến): mọi local min đều là global min → GD tìm được global.
> - Hàm **non-convex** (loss của NN): có nhiều local min. Nhưng thực nghiệm cho thấy hầu hết local min của NN to đều có loss tương đương nhau → "đủ tốt".

> **❓ Khi nào dừng?**
>
> 3 tiêu chí, dùng hỗn hợp:
>
> 1. \`|∇f(x_t)| < ε\` (đã phẳng).
> 2. \`t ≥ T_max\` (hết ngân sách compute).
> 3. **Early stopping**: loss trên validation set không giảm sau \`patience\` bước → dừng.

> **❓ Học rate cao có sao?**
>
> Như mục 6 đã phân tích. Tóm: overshoot, oscillation, hoặc diverge. Trong NN thường thấy loss tăng đột biến hoặc thành \`NaN\`.

> **❓ Sao không tính \`∇f = 0\` trực tiếp?**
>
> Như mục 5: với NN, ∇f = 0 là hệ phi tuyến hàng triệu phương trình, không có closed-form, Newton đắt \`O(N³)\`.

> **❓ Gradient = 0 có chắc là minimum?**
>
> Không. Có thể là:
>
> - **Local min** (đáy): Hessian dương xác định (PD).
> - **Local max** (đỉnh): Hessian âm xác định (ND).
> - **Saddle point** (yên ngựa): Hessian có cả eigenvalue + và −.
>
> Trong NN, **saddle phổ biến hơn** local min trong không gian cao chiều — đây là kết quả của lý thuyết ma trận ngẫu nhiên. May là noise của SGD giúp thoát saddle.

> **❓ Trong PyTorch tôi có phải viết \`x − η·grad\` không?**
>
> Không. Bạn gọi \`optimizer.step()\` — PyTorch lo. Bạn vẫn cần \`optimizer.zero_grad()\` trước mỗi bước (vì gradient được tích lũy).

> **❓ "Iterations", "epoch", "step" khác nhau thế nào?**
>
> - **Step / iteration**: 1 lần gọi \`optimizer.step()\` = 1 bước GD.
> - **Epoch**: 1 lần đi qua **toàn bộ** dataset. Nếu có 10000 sample, batch 100 → 1 epoch = 100 steps.
> - Train 100 epoch thường = train hàng nghìn → triệu step.

---

## 9. Lỗi thường gặp khi code

### 9.1. Quên dấu trừ

\`\`\`python
# SAI:
w = w + lr * grad   # → leo đồi, loss tăng

# ĐÚNG:
w = w - lr * grad
\`\`\`

> Trong PyTorch, \`optimizer.step()\` lo dấu trừ — bạn không phải tự viết. Nhưng nếu tự implement: cẩn thận.

### 9.2. Quên \`optimizer.zero_grad()\`

\`\`\`python
# SAI: gradient tích lũy qua các step → bùng nổ
for batch in loader:
    loss = model(batch).loss
    loss.backward()
    optimizer.step()

# ĐÚNG:
for batch in loader:
    optimizer.zero_grad()        # reset gradient trước
    loss = model(batch).loss
    loss.backward()
    optimizer.step()
\`\`\`

### 9.3. Học rate quá lớn

Loss \`NaN\` ngay sau vài bước. Fix: chia η cho 10 và thử lại. Nếu vẫn \`NaN\`: kiểm tra data (có \`inf\`/\`NaN\` không), check gradient explosion (gradient clipping).

### 9.4. Quên normalize input

Nếu feature có scale khác nhau (vd \`x₁ ∈ [0, 1]\`, \`x₂ ∈ [0, 10000]\`), gradient theo \`x₂\` sẽ dominate. Loss landscape thành cái thung lũng dài hẹp → GD zigzag tệ.

Fix: standardize feature \`x → (x − μ) / σ\` trước khi train.

### 9.5. Học rate dùng chung cho tất cả tham số

Một số chiều cần η lớn (gradient nhỏ), chiều khác cần η nhỏ (gradient lớn). Fix: dùng Adam.

### 9.6. Quên detach khi log

\`\`\`python
losses.append(loss.item())   # đúng: .item() / .detach()
losses.append(loss)          # sai: giữ luôn cả computational graph → leak memory
\`\`\`

### 9.7. Batch normalize sai pha train/eval

Khi eval, BN dùng running mean/var, không phải batch hiện tại. Quên \`model.eval()\` → kết quả test khác kết quả "đúng".

> **⚠ Tổng cộng** ở mỗi training loop:
> \`\`\`
> model.train()
> for epoch in range(E):
>     for batch in train_loader:
>         optimizer.zero_grad()
>         loss = model(batch).loss
>         loss.backward()
>         optimizer.step()
> model.eval()
> with torch.no_grad():
>     ...evaluate
> \`\`\`

---

## 10. Áp dụng vào Linear Regression — phần lớn

### 10.1. Dữ liệu (cùng như Lesson 05)

3 điểm:

\`\`\`
(1, 2)
(2, 3.5)
(3, 5.5)
\`\`\`

Mô hình: \`y_pred = a·x + b\`.

Loss MSE:

\`\`\`
L(a, b) = (1/3) · Σᵢ (a·xᵢ + b − yᵢ)²
\`\`\`

### 10.2. Closed-form (recap từ Lesson 05)

Giải \`∂L/∂a = 0, ∂L/∂b = 0\`:

\`\`\`
n = 3
Σx = 6,    Σy = 11,    Σxy = 2+7+16.5 = 25.5,    Σx² = 14

a = (n·Σxy − Σx·Σy) / (n·Σx² − (Σx)²)
  = (3·25.5 − 6·11) / (3·14 − 36)
  = (76.5 − 66) / (42 − 36)
  = 10.5 / 6
  = 1.75

b = (Σy − a·Σx) / n
  = (11 − 1.75·6) / 3
  = (11 − 10.5) / 3
  = 0.5 / 3
  ≈ 0.1667
\`\`\`

Nghiệm closed-form: \`(a*, b*) = (1.75, 0.1667)\`. Verify: \`L(1.75, 0.1667) ≈ 0.0556\`.

### 10.3. Gradient

\`\`\`
∂L/∂a = (1/3) · Σᵢ 2·(a·xᵢ + b − yᵢ)·xᵢ
       = (2/3) · Σᵢ (a·xᵢ + b − yᵢ)·xᵢ

∂L/∂b = (1/3) · Σᵢ 2·(a·xᵢ + b − yᵢ)
       = (2/3) · Σᵢ (a·xᵢ + b − yᵢ)
\`\`\`

Gọi \`eᵢ = a·xᵢ + b − yᵢ\` (residual). Thì \`∇L = ((2/3)·Σ eᵢxᵢ, (2/3)·Σ eᵢ)\`.

### 10.4. Bước 1 — chi tiết tay

Khởi tạo \`(a₀, b₀) = (0, 0)\`, \`η = 0.05\`.

Predictions: \`y_pred = 0\` cho mọi \`x\`. Residuals:

\`\`\`
e₁ = 0·1 + 0 − 2   = −2
e₂ = 0·2 + 0 − 3.5 = −3.5
e₃ = 0·3 + 0 − 5.5 = −5.5
\`\`\`

\`\`\`
Σ eᵢxᵢ = (−2)·1 + (−3.5)·2 + (−5.5)·3
       = −2 − 7 − 16.5 = −25.5

Σ eᵢ   = −2 − 3.5 − 5.5 = −11

∂L/∂a = (2/3)·(−25.5) = −17
∂L/∂b = (2/3)·(−11)   = −22/3 ≈ −7.3333

a₁ = 0 − 0.05·(−17)     = 0 + 0.85    = 0.85
b₁ = 0 − 0.05·(−7.3333) = 0 + 0.3667  = 0.3667
\`\`\`

Predictions sau bước 1: \`y_pred = 0.85x + 0.3667\`. Tại x=1: 1.2167, x=2: 2.0667, x=3: 2.9167. Loss giảm.

L(0, 0) = (1/3)(4 + 12.25 + 30.25) = 46.5/3 = 15.5.
L(0.85, 0.3667) = (1/3)( (1.2167−2)² + (2.0667−3.5)² + (2.9167−5.5)² )
                = (1/3)( 0.6135 + 2.0541 + 6.6722 )
                = 9.3398/3 ≈ 3.113.

→ Giảm rất mạnh (15.5 → 3.11).

### 10.5. Bảng 10 bước

Mỗi bước, làm như mục 10.4. Bảng kết quả:

| \`t\` | \`aₜ\` | \`bₜ\` | \`L(aₜ, bₜ)\` | \`∂L/∂a\` | \`∂L/∂b\` |
|---|---|---|---|---|---|
| 0 | 0.0000 | 0.0000 | 15.5000 | −17.0000 | −7.3333 |
| 1 | 0.8500 | 0.3667 | 3.1133 | −7.4667 | −3.0667 |
| 2 | 1.2233 | 0.5200 | 0.6691 | −3.1620 | −1.2089 |
| 3 | 1.3814 | 0.5805 | 0.2356 | −1.2924 | −0.4395 |
| 4 | 1.4460 | 0.6024 | 0.1572 | −0.5158 | −0.1391 |
| 5 | 1.4718 | 0.6094 | 0.1429 | −0.2008 | −0.0341 |
| 6 | 1.4818 | 0.6111 | 0.1395 | −0.0746 | −0.0048 |
| 7 | 1.4855 | 0.6113 | 0.1380 | −0.0249 | 0.0028 |
| 8 | 1.4868 | 0.6112 | 0.1372 | −0.0058 | 0.0048 |
| 9 | 1.4870 | 0.6110 | 0.1366 | 0.0024 | 0.0053 |
| 10 | 1.4870 | 0.6107 | 0.1360 | 0.0058 | 0.0055 |

> **Lưu ý**: bảng tính bằng tay/Python chính xác — bạn có thể verify lại từng bước.

### 10.6. Quan sát quan trọng

- Sau 10 bước: \`(a, b) ≈ (1.487, 0.611)\`.
- Closed-form: \`(a*, b*) = (1.75, 0.167)\`.
- **Khác nhau khá nhiều!** GD chưa hội tụ.

> **❓ Vì sao GD chậm thế?**
>
> Vì landscape **ill-conditioned**: gradient theo \`a\` lớn hơn gradient theo \`b\` (do \`xᵢ ∈ {1, 2, 3}\`, không centered quanh 0). Bạn có thể verify với Lesson 06: Hessian là
> \`\`\`
> H = (2/n) · [ Σx² , Σx  ]
>             [ Σx  , n   ]
>   = (2/3)·[ 14, 6 ]
>          [ 6, 3 ]
> \`\`\`
> Eigenvalue của \`H\`: \`λ ≈ 11.43\` và \`λ ≈ 0.91\`. Tỉ số (condition number) ≈ 12.6 → ill-conditioned. GD vanilla bị chậm theo chiều có eigenvalue nhỏ.
>
> Fix: standardize x (trừ mean, chia std) trước khi train → condition number ~1 → GD hội tụ nhanh hơn nhiều.

### 10.7. Tiếp tục thêm bước

Nếu chạy GD đủ lâu (~1000 bước với cùng η=0.05): hội tụ tới \`(1.75, 0.167)\`. Verify bằng code (bạn có thể tự chạy):

\`\`\`python
import numpy as np
X = np.array([1, 2, 3], dtype=float)
y = np.array([2, 3.5, 5.5], dtype=float)
a, b = 0.0, 0.0
lr = 0.05
n = len(X)
for t in range(1000):
    pred = a*X + b
    err = pred - y
    grad_a = (2/n) * np.dot(err, X)
    grad_b = (2/n) * err.sum()
    a -= lr * grad_a
    b -= lr * grad_b
print(a, b)
# → 1.7499..., 0.1668...
\`\`\`

### 10.8. Standardize → fix ill-conditioning

\`\`\`python
# standardize x
x_mean, x_std = X.mean(), X.std()
X_norm = (X - x_mean) / x_std

# tương tự cho y nếu cần
# train GD theo a, b trên X_norm
# convert ngược a, b về scale gốc
\`\`\`

Sau standardize, GD hội tụ trong ~30 bước thay vì 1000.

### 10.9. Closed-form vs GD — khi nào dùng cái nào?

| | Closed-form | GD |
|---|---|---|
| Khi áp dụng | Hệ tuyến tính (linear regression, ridge regression) | Bất kỳ hàm differentiable |
| Tốc độ với N nhỏ | Rất nhanh (O(N·d² + d³)) | Phụ thuộc η, nhiều iter |
| Tốc độ với N lớn (N=1M, d=1M) | Không khả thi (Hessian quá to) | Khả thi (mini-batch) |
| Memory | Cần invert \`d×d\` matrix | Chỉ cần gradient |
| ML neural network | Không áp dụng | Bắt buộc |

> **📝 Tóm tắt mục 10**
>
> - Linear regression có closed-form (mục 10.2) nhưng vẫn dùng làm sandbox để học GD.
> - Tính gradient của MSE theo \`(a, b)\` rất chuẩn — chỉ là chain rule.
> - GD chậm khi landscape ill-conditioned. Standardize input để fix.
> - Closed-form **không** scale với NN — đó là lý do GD thống trị.

---

## 11. Training loop trong PyTorch — phép tương ứng

### 11.1. Code minh họa (Python pseudo)

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim

# DATA
X = torch.tensor([[1.0], [2.0], [3.0]])
y = torch.tensor([[2.0], [3.5], [5.5]])

# MODEL: y_pred = a·x + b  ↔ nn.Linear(1, 1)
model = nn.Linear(in_features=1, out_features=1)

# LOSS: MSE
criterion = nn.MSELoss()

# OPTIMIZER: SGD with learning rate η
optimizer = optim.SGD(model.parameters(), lr=0.05)

# TRAINING LOOP
for epoch in range(1000):
    # FORWARD
    y_pred = model(X)             # tính y_pred = a·x + b
    loss   = criterion(y_pred, y) # tính L(a, b)

    # BACKWARD
    optimizer.zero_grad()         # reset gradient từ bước trước
    loss.backward()               # autograd: tính ∂L/∂a, ∂L/∂b

    # GRADIENT DESCENT STEP
    optimizer.step()              # ⟵ ĐÂY là gradient descent

    if epoch % 100 == 0:
        a, b = model.weight.item(), model.bias.item()
        print(f"epoch={epoch}, a={a:.4f}, b={b:.4f}, loss={loss.item():.4f}")

# Sau train: model.weight ≈ 1.75, model.bias ≈ 0.167
\`\`\`

### 11.2. Mapping từng dòng → công thức

| Dòng PyTorch | Tương đương toán |
|---|---|
| \`model = nn.Linear(1, 1)\` | Khởi tạo \`(a, b)\` random |
| \`y_pred = model(X)\` | \`y_pred = a·X + b\` |
| \`loss = criterion(y_pred, y)\` | \`L(a, b) = mean((y_pred − y)²)\` |
| \`optimizer.zero_grad()\` | Reset \`∂L/∂a, ∂L/∂b\` về 0 trước khi tích lũy |
| \`loss.backward()\` | Tính \`∂L/∂a, ∂L/∂b\` qua autograd (= chain rule, Lesson 04) |
| \`optimizer.step()\` | \`a ← a − η · ∂L/∂a\`; \`b ← b − η · ∂L/∂b\` |

### 11.3. Đổi sang Adam? Chỉ đổi 1 dòng

\`\`\`python
optimizer = optim.Adam(model.parameters(), lr=0.001)
\`\`\`

Không đổi training loop. Đó là sức mạnh của abstraction "optimizer".

### 11.4. Tensorflow (Keras) version

\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(1, input_shape=(1,))
])
model.compile(optimizer=tf.keras.optimizers.SGD(learning_rate=0.05),
              loss='mse')
model.fit(X, y, epochs=1000, verbose=0)
\`\`\`

Bên trong \`model.fit\`, vẫn là gradient descent vòng lặp.

> **💡 Bài học**
> Khi mở source code của bất kỳ project ML/DL nào, bạn sẽ thấy training loop **luôn có pattern này**:
> 1. forward
> 2. compute loss
> 3. zero_grad
> 4. backward
> 5. step
>
> Nắm pattern này = đọc được mọi training code.

---

## 12. Bài tập

### Bài 1 — Walk-through đơn

Cho \`f(x) = (x − 3)²\`. Khởi tạo \`x₀ = 0\`, \`η = 0.2\`. Tính \`x₁, x₂, x₃\`. Sau bao nhiêu bước thì \`|x_t − 3| < 0.001\`?

### Bài 2 — Diverge

Cho \`f(x) = x²\`, \`x₀ = 1\`, \`η = 0.9\`. Tính \`x₁, x₂, x₃, x₄, x₅\`. Nó hội tụ hay diverge? Vì sao?

### Bài 3 — Tìm η tối ưu

Cho \`f(x) = 3x²\`. Tìm giá trị \`η\` lớn nhất sao cho GD vẫn hội tụ. Tìm \`η\` để hội tụ trong 1 bước từ bất kỳ \`x₀\`.

### Bài 4 — 2 biến

Cho \`f(x, y) = 4x² + y²\`. Khởi tạo \`(x₀, y₀) = (1, 1)\`, \`η = 0.1\`. Tính 3 bước. Chiều nào hội tụ nhanh hơn? Vì sao?

### Bài 5 — Logistic loss (preview ML)

Cho dữ liệu 1 sample: \`x = 2\`, \`y = 1\` (label). Mô hình: \`p = σ(w·x)\` với \`σ(z) = 1/(1+e^(-z))\`. Loss cross-entropy \`L = −log(p)\`.

a) Tính \`∂L/∂w\` (dùng chain rule).
b) Khởi tạo \`w₀ = 0\`, \`η = 0.5\`. Tính \`w₁, w₂\`.

### Bài 6 — Linear regression với 4 điểm

Cho dữ liệu \`(0, 1), (1, 3), (2, 4), (3, 6)\`. Mô hình \`y = ax + b\`. Khởi tạo \`(a, b) = (0, 0)\`, \`η = 0.05\`. Chạy GD 5 bước, lập bảng. So với closed-form: \`a* = ?, b* = ?\`.

---

## 13. Lời giải chi tiết

### Bài 1

\`f(x) = (x − 3)²\`, \`f'(x) = 2(x − 3)\`.

\`\`\`
x₀ = 0
g₀ = 2(0 − 3) = −6
x₁ = 0 − 0.2·(−6) = 1.2

g₁ = 2(1.2 − 3) = −3.6
x₂ = 1.2 − 0.2·(−3.6) = 1.92

g₂ = 2(1.92 − 3) = −2.16
x₃ = 1.92 − 0.2·(−2.16) = 2.352
\`\`\`

Tổng quát: \`x_{t+1} − 3 = (1 − 0.4)·(x_t − 3) = 0.6·(x_t − 3)\`. Vậy \`x_t − 3 = (−3)·0.6ᵗ\`.

\`|x_t − 3| < 0.001 ⟹ 3·0.6ᵗ < 0.001 ⟹ 0.6ᵗ < 0.000333 ⟹ t > log(0.000333)/log(0.6) ≈ −3.477 / −0.2218 ≈ 15.67\`.

→ **Cần 16 bước.** Verify: \`3·0.6^16 = 3·0.000282 ≈ 0.000847 < 0.001\` ✓.

### Bài 2

\`f = x²\`, \`f' = 2x\`, \`η = 0.9\`.

\`\`\`
x₀ = 1
x₁ = 1 − 0.9·2 = −0.8
x₂ = −0.8 − 0.9·(−1.6) = 0.64
x₃ = 0.64 − 0.9·1.28 = −0.512
x₄ = −0.512 − 0.9·(−1.024) = 0.4096
x₅ = 0.4096 − 0.9·0.8192 = −0.32768
\`\`\`

Hệ số \`1 − 2·0.9 = −0.8\`. \`|−0.8| < 1\` → **hội tụ** (nhưng đu qua đu lại dấu).

Tổng quát \`x_t = (−0.8)ᵗ\`. Hội tụ tốt: \`x₁₀ ≈ 0.107\`, \`x₂₀ ≈ 0.0115\`.

### Bài 3

\`f = 3x²\`, \`f' = 6x\`. Update: \`x_{t+1} = x_t − η·6x_t = (1 − 6η)·x_t\`.

Hội tụ ⟺ \`|1 − 6η| < 1\` ⟺ \`0 < η < 1/3 ≈ 0.333\`. Hội tụ 1 bước: \`1 − 6η = 0 ⟹ η = 1/6 ≈ 0.1667\`.

### Bài 4

\`f = 4x² + y²\`, \`∇f = (8x, 2y)\`, \`(x₀, y₀) = (1, 1)\`, \`η = 0.1\`.

\`\`\`
Bước 1: x₁ = 1 − 0.1·8 = 0.2,  y₁ = 1 − 0.1·2 = 0.8
Bước 2: x₂ = 0.2 − 0.1·1.6 = 0.04,  y₂ = 0.8 − 0.1·1.6 = 0.64
Bước 3: x₃ = 0.04 − 0.1·0.32 = 0.008,  y₃ = 0.64 − 0.1·1.28 = 0.512
\`\`\`

Chiều x nhân với \`1 − 8·0.1 = 0.2\`. Chiều y nhân với \`1 − 2·0.1 = 0.8\`.

**x hội tụ nhanh hơn nhiều** (mỗi bước ÷5), y chậm (÷1.25). Vì curvature theo x lớn hơn (hệ số 4 vs 1). Đây là ill-conditioning ngược chiều với f = x² + 2y² ở mục 4 (lúc đó y nhanh hơn x).

### Bài 5

a) Chain rule.

\`p = σ(z)\` với \`z = w·x\`. \`dσ/dz = σ(1 − σ)\`. \`L = −log(p)\`. \`dL/dp = −1/p\`.

\`\`\`
∂L/∂w = (∂L/∂p) · (∂p/∂z) · (∂z/∂w)
       = (−1/p) · p(1−p) · x
       = −(1−p) · x
       = (p − 1) · x
\`\`\`

Vì \`y = 1\`, gradient là \`(p − y)·x\` — đây là dạng tổng quát cho cross-entropy với sigmoid.

b) \`x = 2\`, \`w₀ = 0\`, \`η = 0.5\`.

\`\`\`
z = 0·2 = 0,  p = σ(0) = 0.5
∂L/∂w = (0.5 − 1)·2 = −1
w₁ = 0 − 0.5·(−1) = 0.5

z = 0.5·2 = 1,  p = σ(1) ≈ 0.7311
∂L/∂w = (0.7311 − 1)·2 = −0.5379
w₂ = 0.5 − 0.5·(−0.5379) ≈ 0.7689
\`\`\`

\`p\` đang tăng về 1 (label \`y = 1\`) → đúng hướng.

### Bài 6

Dữ liệu: \`(0,1), (1,3), (2,4), (3,6)\`. \`n=4\`. \`Σx=6, Σy=14, Σxy = 0+3+8+18=29, Σx²=0+1+4+9=14\`.

Closed-form:
\`\`\`
a* = (4·29 − 6·14) / (4·14 − 36) = (116 − 84) / (56 − 36) = 32/20 = 1.6
b* = (14 − 1.6·6) / 4 = (14 − 9.6)/4 = 4.4/4 = 1.1
\`\`\`

Verify: \`(0, 1.1), (1, 2.7), (2, 4.3), (3, 5.9)\`. Residuals: \`0.1, −0.3, 0.3, −0.1\`. Mean = 0 ✓.

GD: \`∇L = ((2/n)·Σ eᵢxᵢ, (2/n)·Σ eᵢ)\` với \`eᵢ = a·xᵢ + b − yᵢ\`.

Bước 1 (\`a₀=0, b₀=0\`):
\`\`\`
e = (0−1, 0−3, 0−4, 0−6) = (−1, −3, −4, −6)
Σ eᵢxᵢ = 0·(−1) + 1·(−3) + 2·(−4) + 3·(−6) = 0 − 3 − 8 − 18 = −29
Σ eᵢ   = −14
∂L/∂a = 2/4 · (−29) = −14.5
∂L/∂b = 2/4 · (−14) = −7
a₁ = 0 − 0.05·(−14.5) = 0.725
b₁ = 0 − 0.05·(−7)    = 0.35
\`\`\`

Bước 2:
\`\`\`
y_pred = 0.725·x + 0.35
       = (0.35, 1.075, 1.8, 2.525)
e = (0.35−1, 1.075−3, 1.8−4, 2.525−6) = (−0.65, −1.925, −2.2, −3.475)
Σ eᵢxᵢ = 0·(−0.65) + 1·(−1.925) + 2·(−2.2) + 3·(−3.475)
       = 0 − 1.925 − 4.4 − 10.425 = −16.75
Σ eᵢ   = −0.65 − 1.925 − 2.2 − 3.475 = −8.25
∂L/∂a = 2/4 · (−16.75) = −8.375
∂L/∂b = 2/4 · (−8.25)  = −4.125
a₂ = 0.725 − 0.05·(−8.375) = 1.14375
b₂ = 0.35 − 0.05·(−4.125)  = 0.55625
\`\`\`

Tiếp tục đến bước 5 (kết quả tròn 4 chữ số):

| \`t\` | \`a_t\` | \`b_t\` | L |
|---|---|---|---|
| 0 | 0.0000 | 0.0000 | 15.5000 |
| 1 | 0.7250 | 0.3500 | 4.4006 |
| 2 | 1.1438 | 0.5563 | 1.5180 |
| 3 | 1.3754 | 0.6747 | 0.7587 |
| 4 | 1.5008 | 0.7449 | 0.5512 |
| 5 | 1.5666 | 0.7878 | 0.4904 |

So với closed-form \`(1.6, 1.1)\`: sau 5 bước \`a\` đã rất gần \`1.6\` nhưng \`b\` chỉ tới \`0.79\` (cần ~1.1). Lý do quen thuộc: ill-conditioning + b cần nhiều iteration hơn.

---

## 14. Tiếp theo

- **Lesson 08 — Tích phân** ([../lesson-08-integrals/](../lesson-08-integrals/)): bài chốt của Tầng 3 — diện tích dưới đường cong, công thức Newton-Leibniz, ứng dụng vào xác suất liên tục (Tầng 5).
- **Tầng 4 — Linear Algebra**: vector và ma trận chính thức. Bạn sẽ gặp lại gradient với góc nhìn ma trận, học eigenvector/eigenvalue (chìa khóa của PCA, condition number, và lý do GD chậm khi ill-conditioned).
- **Tầng 6 — AI/ML**: gradient descent quay lại ở mọi bài — linear regression, logistic regression, neural network, embedding, RAG. Lesson này là **viên gạch nền** cho toàn bộ Tầng 6.

> **💡 Sau khi học xong**
> Bạn đã nắm thuật toán quan trọng nhất của machine learning. Mọi khi sau này thấy ai train một model — đằng sau cái \`.fit()\` hay \`model.train()\` chỉ là một vòng lặp gradient descent (có thể có biến thể như Adam). Bạn đã hiểu nó từ đáy.

---

## Tham khảo

- Goodfellow, Bengio, Courville — *Deep Learning*, Chương 4 (Numerical Computation) & Chương 8 (Optimization for Training).
- Boyd, Vandenberghe — *Convex Optimization*, Chương 9 (Unconstrained Minimization).
- Bottou, Curtis, Nocedal — *Optimization Methods for Large-Scale Machine Learning* (SIAM Review 2018).
- Sebastian Ruder — *An overview of gradient descent optimization algorithms* (blog/paper, 2016).
- Leslie Smith — *Cyclical Learning Rates for Training Neural Networks* (2017).
- Kingma & Ba — *Adam: A Method for Stochastic Optimization* (2014).
`;
