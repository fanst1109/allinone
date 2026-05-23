// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/06-AI-ML/lesson-04-neural-network/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Neural Network 1-hidden-layer

> "Tầng 6 — AI/ML, bài **bản lề**. Linear regression (Lesson 02) và logistic regression (Lesson 03) chỉ học được **đường thẳng / mặt phẳng phân chia**. Bài này sẽ chỉ rõ: vì sao XOR — một bài toán 4 điểm trẻ con cũng giải được — lại **không** giải được bằng logistic regression, và một mạng nơ-ron với **chỉ 1 hidden layer** đã đủ để gãy gọn cái rào đó. Bạn sẽ chạy tay từng phép forward + backprop cho một mạng 2-3-1, hiểu chain rule lặp đi lặp lại như thế nào, viết được code Go train được XOR, và rời bài với khả năng đọc bất kỳ paper deep learning nào mà không bị 'lost' ở chỗ ∂L/∂W."

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được **giới hạn của model tuyến tính**: vì sao logistic regression không học được XOR (chứng minh chính thức bằng linear separability).
2. Mô tả **kiến trúc 1-hidden-layer**: input → hidden (kèm activation phi tuyến) → output. Viết được công thức forward dạng scalar và dạng ma trận (vectorized).
3. Chạy tay **forward pass** cho mạng 2-3-1 với input \`x = [1, 2]\` cụ thể — tính từng \`z₁\`, \`h\`, \`z₂\`, \`ŷ\`, loss.
4. Chạy tay **backprop**: từ loss → ∂L/∂ŷ → ∂L/∂W₂ → ∂L/∂h → ∂L/∂z₁ → ∂L/∂W₁, đối chiếu **cả 2 vế** bằng số.
5. **Vector hoá** backprop: thay vì 6 vòng \`for\`, chỉ 4 phép nhân ma trận. Tự kiểm tra shape mọi gradient khớp shape weight.
6. Hoàn chỉnh **1 step training** (forward → loss → backward → cập nhật bằng gradient descent), và lặp lại cho nhiều epoch — mạng học được XOR.
7. So sánh **ReLU vs sigmoid vs tanh vs leaky-ReLU**: vì sao ReLU thắng trong deep network (vanishing gradient + cost tính rẻ).
8. Phát biểu **universal approximation theorem**: 1 hidden layer đủ rộng có thể xấp xỉ mọi hàm liên tục trên tập compact. Hiểu vì sao "đủ rộng" trong thực tế là **vô vọng** → cần đi sâu thay vì đi rộng.
9. Nối thông tới **deep learning**: stack nhiều hidden layer = backprop áp dụng N lần. CNN, RNN, Transformer đều là cùng một cơ chế chain rule, chỉ thay đổi cấu trúc lớp.

## Kiến thức tiền đề

- [Lesson 03 — Logistic regression](../lesson-03-logistic-regression/): sigmoid, binary cross-entropy, gradient descent. Một neural network 1-hidden-layer **có thể nhìn như "stack hai logistic regression"**. Nếu chưa nắm vững sigmoid, đạo hàm sigmoid, và cách GD update weight, dừng lại đọc Lesson 03 trước.
- [Lesson 02 — Linear regression](../lesson-02-linear-regression/): MSE loss, ý nghĩa của \`y = Wx + b\` về mặt hình học, gradient descent từng bước.
- [Tầng 3 — Lesson 04 — Chain rule](../../03-Calculus/lesson-04-chain-rule/): **không có cái này thì không hiểu backprop**. Chain rule chính là backprop. Phải biết tính \`d/dx[f(g(x))] = f'(g(x))·g'(x)\` thành thạo trước khi vào mục 5.
- [Tầng 3 — Lesson 06 — Đạo hàm riêng + gradient](../../03-Calculus/lesson-06-partial-gradient/): ∂L/∂W₁ là ma trận đạo hàm riêng. Phải biết "đạo hàm theo từng phần tử".
- [Tầng 4 — Lesson 05 — Ma trận](../../04-LinearAlgebra/lesson-05-matrices/): nhân ma trận, transpose, shape. Vectorized backprop hoàn toàn dùng đại số ma trận.
- [Tầng 5 — Cross-entropy](../../05-Probability/) (nếu dùng cross-entropy loss thay vì MSE): công thức \`-Σ y log ŷ\` và đạo hàm của nó kết hợp với softmax/sigmoid.

> **💡 Đọc trước bài này một câu**
> Mạng nơ-ron không phải "AI bí ẩn" — nó chỉ là **hàm hợp** (composition of functions). \`ŷ = W₂·σ(W₁·x + b₁) + b₂\`. Training = tìm W₁, b₁, W₂, b₂ để \`ŷ ≈ y\` trên dataset. Backprop = áp chain rule cho hàm hợp đó. Hết.

---

## 1. Vì sao cần neural network? — Bức tường XOR

### 1.1. Câu chuyện: 4 điểm mà logistic regression giải không nổi

Cho 4 điểm 2D với nhãn (1 = đỏ, 0 = xanh):

| x₁ | x₂ | y |
|----|----|----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Đây là **XOR** (exclusive or): \`y = 1\` khi \`x₁ ≠ x₂\`, ngược lại \`y = 0\`.

Logistic regression học \`ŷ = σ(w₁·x₁ + w₂·x₂ + b)\`. Quyết định: nếu \`w₁·x₁ + w₂·x₂ + b > 0\` → class 1, ngược lại class 0. **Decision boundary là đường thẳng** \`w₁·x₁ + w₂·x₂ + b = 0\`.

> **💡 Trực giác**
> Vẽ 4 điểm XOR ra giấy. Bạn không tài nào kẻ **một đường thẳng** chia (0,0) và (1,1) sang một bên, (0,1) và (1,0) sang bên kia — vì hai cặp này nằm **xen kẽ** trên hai đường chéo của hình vuông. Mọi đường thẳng đều cắt nhầm.

### 1.2. Chứng minh chính thức: XOR không **linear separable**

Giả sử tồn tại \`w₁, w₂, b\` sao cho:

- \`(0,0)\` → \`b ≤ 0\` (vì class 0)
- \`(1,1)\` → \`w₁ + w₂ + b ≤ 0\` (class 0)
- \`(0,1)\` → \`w₂ + b > 0\` (class 1)
- \`(1,0)\` → \`w₁ + b > 0\` (class 1)

Cộng (3) và (4): \`w₁ + w₂ + 2b > 0\`.
Cộng (1) và (2): \`w₁ + w₂ + 2b ≤ 0\`.

**Mâu thuẫn.** ⇒ Không tồn tại \`(w₁, w₂, b)\` nào tách được XOR. ∎

### 1.3. Trick: thêm một feature phi tuyến

Nếu ta tạo thêm feature \`x₃ = x₁ · x₂\`, thì:

| x₁ | x₂ | x₃ = x₁·x₂ | y |
|----|----|------------|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

Bây giờ \`(0,0)\` và \`(1,1)\` khác nhau ở \`x₃\` (0 vs 1). Một mặt phẳng trong không gian 3D \`(x₁, x₂, x₃)\` có thể tách được. Cụ thể: \`ŷ = σ(x₁ + x₂ - 2·x₃ - 0.5)\` cho ra 4 giá trị \`[-0.5, 0.5, 0.5, -0.5]\` — đúng dấu yêu cầu.

**Bài học**: nếu **biết trước** feature phi tuyến nào hữu ích, model tuyến tính cũng giải được. Nhưng với dataset thật (ảnh, văn bản), ai biết feature phi tuyến nào là đúng?

### 1.4. Ý tưởng: để model TỰ HỌC feature phi tuyến

Đặt 1 lớp trung gian (**hidden layer**) gồm vài neuron. Mỗi neuron là một \`σ(w·x + b)\` — chính là một logistic regression mini. Output của lớp này là **feature mới**, phi tuyến (do \`σ\`). Sau đó tầng output dùng các feature mới này để phân loại.

\`\`\`
x ──┬─→ neuron 1: σ(w₁·x + b₁) ──┐
    ├─→ neuron 2: σ(w₂·x + b₂) ──┼─→ output: σ(w_out · [n₁, n₂, n₃] + b_out)
    └─→ neuron 3: σ(w₃·x + b₃) ──┘
\`\`\`

Đây chính là **neural network 1-hidden-layer**.

### ❓ Câu hỏi tự nhiên

> *"Nếu các neuron hidden là tuyến tính (\`σ\` là hàm identity \`σ(z) = z\`), thì có khác linear regression không?"*

**Không khác gì cả.** Vì stack tuyến tính = tuyến tính: \`W₂·(W₁·x + b₁) + b₂ = (W₂·W₁)·x + (W₂·b₁ + b₂) = W'·x + b'\`. Activation **phi tuyến** là *linh hồn* của neural network. Mất nó, NN chỉ là linear regression viết phức tạp hơn.

> *"Vì sao gọi là 'neuron'? Có liên quan tới não thật không?"*

Lấy cảm hứng lỏng lẻo từ neuron sinh học (input dendrites → cell body tính tổng → axon output qua threshold), nhưng **không cố mô phỏng não**. Đây là lý do nhiều nhà nghiên cứu hiện đại gọi nó là **unit** thay vì neuron — rõ ràng hơn.

> *"1 hidden layer đủ chưa, hay phải nhiều?"*

Lý thuyết: 1 hidden layer đủ rộng có thể xấp xỉ mọi hàm liên tục (universal approximation, mục 10). Thực tế: nhiều layer **nông** (deep) hiệu quả hơn nhiều một layer **rộng**. Bài này dạy 1-hidden để dễ chạy tay; deep network chỉ là backprop lặp lại N lần.

> **⚠ Lỗi thường gặp**
> - Cứ tưởng "phi tuyến" = phải dùng tanh hay sigmoid. **ReLU** (\`max(0, z)\`) — một hàm gãy đơn giản — cũng đủ phi tuyến.
> - Đặt \`σ\` là \`identity\` rồi thắc mắc sao model không học gì hơn linear regression. Linear stack vẫn linear.

> **🔁 Tự kiểm tra**
> Câu hỏi: Tại sao bài AND (\`y = x₁ AND x₂\`) **giải được** bằng logistic regression, còn XOR thì không?
>
> <details>
> <summary>Đáp án</summary>
>
> Bảng AND có 3 điểm class 0 — \`(0,0), (0,1), (1,0)\` — và 1 điểm class 1 — \`(1,1)\`. Vẽ ra: bạn dễ dàng kẻ một đường thẳng (vd \`x₁ + x₂ = 1.5\`) chia \`(1,1)\` ra khỏi 3 điểm kia. AND là linear separable. XOR thì không (chứng minh ở 1.2).
> </details>

> **📝 Tóm tắt mục 1**
> - Model tuyến tính (linear, logistic) chỉ học decision boundary thẳng.
> - XOR là counterexample kinh điển — không linear separable.
> - Nếu biết feature phi tuyến đúng, linear vẫn giải được (1.3). Nhưng với data thực, không ai biết trước.
> - NN giải bài bằng cách **tự học** feature phi tuyến qua hidden layer với activation phi tuyến.

---

## 2. Kiến trúc neural network 1-hidden-layer

### 2.1. Sơ đồ tổng quát

\`\`\`
INPUT      HIDDEN                       OUTPUT
 (d chiều)  (H neuron)                   (1 hoặc K chiều)

 x₁  ────┐
         ├──→  σ(W₁·x + b₁) = h ──┐
 x₂  ────┤                          ├──→  W₂·h + b₂ = ŷ
         │                          │
 ...     │                          │
         │                          │
 x_d ────┘                          ┘
\`\`\`

Trong đó:
- \`x ∈ ℝᵈ\` — input vector.
- \`W₁ ∈ ℝ^(H×d)\` — weight ma trận của hidden layer (H hàng, d cột). Mỗi **hàng** của \`W₁\` là weight của một neuron hidden.
- \`b₁ ∈ ℝᴴ\` — bias vector của hidden layer.
- \`σ\` — activation phi tuyến, áp **element-wise** (lên từng phần tử của vector).
- \`h = σ(W₁·x + b₁) ∈ ℝᴴ\` — output của hidden layer (còn gọi là **hidden representation**, hay **feature mới**).
- \`W₂ ∈ ℝ^(K×H)\` — weight ma trận của output layer.
- \`b₂ ∈ ℝᴷ\` — bias output.
- \`ŷ ∈ ℝᴷ\` — prediction. Với regression \`K = 1\`, output không cần activation. Với binary classification dùng \`σ(ŷ)\`. Với multi-class dùng \`softmax(ŷ)\`.

### 2.2. Công thức forward (dạng scalar)

Cho từng neuron hidden \`j ∈ {1, ..., H}\`:

\`\`\`
z₁ⱼ = Σᵢ W₁[j,i] · xᵢ + b₁[j]      (tính pre-activation)
hⱼ  = σ(z₁ⱼ)                          (áp activation)
\`\`\`

Output (giả sử \`K = 1\`, regression):

\`\`\`
z₂  = Σⱼ W₂[j] · hⱼ + b₂
ŷ   = z₂   (regression, không activation)
\`\`\`

### 2.3. Công thức forward (vectorized / dạng ma trận)

Dùng ký pháp ma trận — **đây là cách code thật chạy** (vectorized = nhanh, ngắn):

\`\`\`
z₁ = W₁ · x + b₁           shape: (H,)
h  = σ(z₁)                  shape: (H,)
z₂ = W₂ · h + b₂            shape: (K,)
ŷ  = z₂                      (regression)
\`\`\`

### 2.4. Activation function \`σ\`

Có 4 lựa chọn phổ biến:

| Tên | Công thức | Range | Đạo hàm |
|-----|-----------|-------|---------|
| **Sigmoid** | \`σ(z) = 1 / (1 + e^(-z))\` | (0, 1) | \`σ(z)·(1 - σ(z))\` |
| **Tanh** | \`tanh(z) = (eᶻ - e^-z) / (eᶻ + e^-z)\` | (-1, 1) | \`1 - tanh²(z)\` |
| **ReLU** | \`max(0, z)\` | [0, ∞) | \`1 nếu z > 0; 0 nếu z < 0\` |
| **Leaky-ReLU** | \`max(αz, z)\`, \`α≈0.01\` | (-∞, ∞) | \`1 nếu z > 0; α nếu z ≤ 0\` |

> **💡 Trực giác**
> - **Sigmoid**: "ép" mọi giá trị về (0,1). Dễ diễn giải như xác suất, nhưng bão hòa khi \`|z|\` lớn → gradient ≈ 0 → vanishing gradient.
> - **Tanh**: như sigmoid nhưng zero-centered (range -1..1). Học nhanh hơn sigmoid trong nhiều trường hợp.
> - **ReLU**: "tắt" mọi giá trị âm. Tính siêu rẻ, không bão hòa phía dương → gradient không vanish. Đây là default cho deep learning hiện đại.
> - **Leaky-ReLU**: cùng ý tưởng nhưng cho leak nhỏ phía âm, tránh "dead neuron" (ReLU bị stuck ở 0 mãi mãi nếu input luôn âm).

### 2.5. Đếm tham số

Với mạng input \`d\` → hidden \`H\` → output \`K\`:

- \`W₁\`: \`H × d\` phần tử.
- \`b₁\`: \`H\` phần tử.
- \`W₂\`: \`K × H\` phần tử.
- \`b₂\`: \`K\` phần tử.

Tổng = \`H·d + H + K·H + K = H(d + 1 + K) + K\`.

Ví dụ XOR: \`d = 2, H = 3, K = 1\` → \`3·(2+1+1) + 1 = 13\` tham số. Một con số bé tí, nhưng đủ học XOR.

### ❓ Câu hỏi tự nhiên

> *"Vì sao bias \`b\` quan trọng? Bỏ đi được không?"*

Bỏ được, nhưng decision boundary phải đi qua gốc tọa độ. Vd: \`w·x = 0\` định nghĩa siêu phẳng qua O. Với bias, \`w·x + b = 0\` đi qua điểm \`-b/||w||\` từ O — di chuyển được tự do. Bỏ bias = mất 1 bậc tự do, mạng học kém hơn rất nhiều với cùng số neuron.

> *"Activation phải áp lên \`z₁\` chứ không lên \`x\`. Vì sao?"*

Vì \`x\` đã là input cho trước, không có gì để "phi tuyến hoá". Phi tuyến áp lên **pre-activation \`z₁\`** — là kết hợp tuyến tính của các input. Mục đích: biến tổ hợp tuyến tính → output phi tuyến. Lặp lại quá trình này N lần = NN sâu.

> **📝 Tóm tắt mục 2**
> - NN 1-hidden-layer = 3 lớp: input (\`x\`), hidden (\`h = σ(W₁x + b₁)\`), output (\`ŷ = W₂h + b₂\`).
> - 4 activation phổ biến: sigmoid, tanh, ReLU, leaky-ReLU. ReLU là default hiện đại.
> - Tổng tham số: \`H(d + K + 1) + K\`.
> - Bỏ bias = mất bậc tự do, mạng yếu hẳn.

---

## 3. Forward pass — chạy tay từng bước

Đây là phần **bắt buộc** ngồi tính tay ít nhất một lần. Đừng nhảy mục.

### 3.1. Thiết lập

Mạng: 2 input, 3 hidden (sigmoid), 1 output (linear, regression).

Input: \`x = [1, 2]\`.

Target: \`y = 1\` (giá trị thật).

Weights khởi tạo (chọn số "đẹp" để dễ tính, không phải random):

\`\`\`
W₁ = [[ 0.5, -0.3],          (3×2)
      [ 0.2,  0.8],
      [-0.4,  0.1]]

b₁ = [0.1, -0.2, 0.0]         (3,)

W₂ = [0.3, -0.5, 0.7]         (1×3)

b₂ = 0.1                        (scalar)
\`\`\`

### 3.2. Bước 1: tính \`z₁\` (pre-activation hidden)

\`\`\`
z₁ = W₁ · x + b₁
\`\`\`

Hàng 1: \`z₁[0] = 0.5·1 + (-0.3)·2 + 0.1 = 0.5 - 0.6 + 0.1 = 0.0\`
Hàng 2: \`z₁[1] = 0.2·1 + 0.8·2 + (-0.2) = 0.2 + 1.6 - 0.2 = 1.6\`
Hàng 3: \`z₁[2] = -0.4·1 + 0.1·2 + 0.0 = -0.4 + 0.2 + 0.0 = -0.2\`

→ **\`z₁ = [0.0, 1.6, -0.2]\`**

### 3.3. Bước 2: áp sigmoid để có \`h\`

Công thức \`σ(z) = 1 / (1 + e^(-z))\`.

- \`h[0] = σ(0.0) = 1/(1+1) = 0.5\`
- \`h[1] = σ(1.6) = 1/(1 + e^(-1.6)) = 1/(1 + 0.2019) = 1/1.2019 ≈ 0.8320\`
- \`h[2] = σ(-0.2) = 1/(1 + e^(0.2)) = 1/(1 + 1.2214) = 1/2.2214 ≈ 0.4502\`

→ **\`h ≈ [0.5000, 0.8320, 0.4502]\`**

### 3.4. Bước 3: tính \`z₂\` (pre-activation output)

\`\`\`
z₂ = W₂ · h + b₂
   = 0.3·0.5000 + (-0.5)·0.8320 + 0.7·0.4502 + 0.1
   = 0.1500 - 0.4160 + 0.3151 + 0.1
   = 0.1491
\`\`\`

→ **\`z₂ ≈ 0.1491\`**

### 3.5. Bước 4: output

Vì regression, \`ŷ = z₂ = 0.1491\`.

### 3.6. Bước 5: tính loss (MSE — 1 sample)

\`\`\`
L = (1/2)·(ŷ - y)²
  = (1/2)·(0.1491 - 1)²
  = (1/2)·(-0.8509)²
  = (1/2)·0.7240
  ≈ 0.3620
\`\`\`

(Hệ số \`1/2\` để khi đạo hàm, hệ số \`2\` triệt tiêu — quy ước rất phổ biến.)

### 3.7. Bảng tổng kết forward pass

| Đại lượng | Giá trị |
|-----------|---------|
| \`x\` | \`[1, 2]\` |
| \`z₁\` | \`[0.0, 1.6, -0.2]\` |
| \`h = σ(z₁)\` | \`[0.5000, 0.8320, 0.4502]\` |
| \`z₂\` | \`0.1491\` |
| \`ŷ\` | \`0.1491\` |
| \`y\` (target) | \`1\` |
| \`L\` | \`0.3620\` |

Verify số: dùng máy tính \`(0.1491 - 1)² / 2\`:

\`\`\`
0.8509² = 0.72403
0.72403 / 2 = 0.36202    ✓ khớp với 0.3620 ở trên
\`\`\`

### ❓ Câu hỏi tự nhiên

> *"Vì sao chọn weights '0.5, -0.3, ...' — số nào là 'đúng' để bắt đầu?"*

Không "đúng" — đây là khởi tạo. Trong thực tế dùng **random** (mục 8). Sau khi backprop + update, các số này thay đổi. Bài này cố ý chọn số tròn để bạn tính tay được. Trong code thực, dùng \`randn() * sqrt(2/d)\` (He init) cho ReLU, hoặc \`randn() * sqrt(1/d)\` (Xavier) cho sigmoid/tanh.

> *"Loss 0.3620 là tốt hay tệ?"*

Tệ. Vì \`ŷ = 0.149\` còn rất xa \`y = 1\`. Sau khi backprop và update, loss giảm dần. Bài này train xong cho XOR đến mục 7.

> **🔁 Tự kiểm tra**
> Bây giờ tự tính forward pass với \`x = [0, 1]\` (cùng weights). Đáp số \`ŷ ≈ ?\`
>
> <details>
> <summary>Đáp án</summary>
>
> \`\`\`
> z₁[0] = 0.5·0 + (-0.3)·1 + 0.1 = -0.2
> z₁[1] = 0.2·0 +  0.8·1 - 0.2  = 0.6
> z₁[2] = -0.4·0 + 0.1·1 + 0.0  = 0.1
>
> h[0] = σ(-0.2) ≈ 0.4502
> h[1] = σ( 0.6) ≈ 0.6457
> h[2] = σ( 0.1) ≈ 0.5250
>
> z₂  = 0.3·0.4502 + (-0.5)·0.6457 + 0.7·0.5250 + 0.1
>     = 0.1351 - 0.3228 + 0.3675 + 0.1
>     = 0.2798
>
> ŷ ≈ 0.28
> \`\`\`
> </details>

> **📝 Tóm tắt mục 3**
> - Forward pass đi từ \`x\` → \`z₁\` → \`h\` → \`z₂\` → \`ŷ\`.
> - Mỗi bước: phép tuyến tính rồi (có thể) áp activation.
> - Loss đo cách \`ŷ\` lệch khỏi \`y\` — để biết phải sửa weights như thế nào, qua backprop.

---

## 4. Backpropagation — chain rule, áp lần nữa lần nữa

Đây là phần **then chốt**. Backprop = chain rule áp lặp đi lặp lại trên một hàm hợp. Cần [Lesson 04 — Chain rule](../../03-Calculus/lesson-04-chain-rule/) thật chắc.

### 4.1. Mục tiêu của backprop

Tính \`∂L/∂W₁\`, \`∂L/∂b₁\`, \`∂L/∂W₂\`, \`∂L/∂b₂\` — gradient của loss theo MỌI tham số. Có gradient → gradient descent update: \`W ← W - η·∂L/∂W\`.

### 4.2. Lưu đồ tính toán (computational graph)

\`\`\`
x → [×W₁ +b₁] → z₁ → [σ] → h → [×W₂ +b₂] → z₂ → [loss với y] → L
\`\`\`

Đi ngược (backward) qua đồ thị, mỗi mũi tên áp chain rule.

### 4.3. Chain rule cốt lõi

Nếu \`L\` phụ thuộc vào \`z₂\`, mà \`z₂\` phụ thuộc vào \`W₂\`, thì:

\`\`\`
∂L/∂W₂ = (∂L/∂z₂) · (∂z₂/∂W₂)
\`\`\`

Tương tự cho mọi tham số khác. Backprop là việc tính các thành phần \`∂L/∂z₂\`, \`∂L/∂h\`, \`∂L/∂z₁\` theo thứ tự **ngược chiều** forward pass.

### 4.4. Bước backward 1: \`∂L/∂ŷ\` và \`∂L/∂z₂\`

Với \`L = (1/2)·(ŷ - y)²\`:

\`\`\`
∂L/∂ŷ = ŷ - y
\`\`\`

Số: \`∂L/∂ŷ = 0.1491 - 1 = -0.8509\`.

Vì \`ŷ = z₂\` (output không có activation cho regression):

\`\`\`
∂L/∂z₂ = ∂L/∂ŷ · ∂ŷ/∂z₂ = (-0.8509) · 1 = -0.8509
\`\`\`

Ký hiệu **\`δ₂ = ∂L/∂z₂\`** — gọi là **error signal** ở output layer.

### 4.5. Bước backward 2: \`∂L/∂W₂\` và \`∂L/∂b₂\`

Với \`z₂ = W₂·h + b₂\` (W₂ shape \`(1, 3)\`, h shape \`(3,)\`):

\`\`\`
∂z₂/∂W₂[j] = h[j]
∂z₂/∂b₂   = 1
\`\`\`

Áp chain rule:

\`\`\`
∂L/∂W₂[j] = δ₂ · h[j]
∂L/∂b₂   = δ₂
\`\`\`

Số:

- \`∂L/∂W₂[0] = -0.8509 · 0.5000 = -0.4255\`
- \`∂L/∂W₂[1] = -0.8509 · 0.8320 = -0.7079\`
- \`∂L/∂W₂[2] = -0.8509 · 0.4502 = -0.3830\`
- \`∂L/∂b₂   = -0.8509\`

### 4.6. Bước backward 3: \`∂L/∂h\` (gradient truyền về hidden layer)

\`z₂ = Σⱼ W₂[j]·h[j] + b₂\` → \`∂z₂/∂h[j] = W₂[j]\`. Áp chain rule:

\`\`\`
∂L/∂h[j] = δ₂ · W₂[j]
\`\`\`

Số:

- \`∂L/∂h[0] = -0.8509 · 0.3  = -0.2553\`
- \`∂L/∂h[1] = -0.8509 · (-0.5) = 0.4255\`
- \`∂L/∂h[2] = -0.8509 · 0.7  = -0.5956\`

### 4.7. Bước backward 4: \`∂L/∂z₁\` (qua sigmoid)

\`h = σ(z₁)\`, và \`σ'(z) = σ(z)·(1 - σ(z)) = h·(1-h)\`.

\`\`\`
∂L/∂z₁[j] = ∂L/∂h[j] · σ'(z₁[j])
          = ∂L/∂h[j] · h[j] · (1 - h[j])
\`\`\`

Số:

- \`σ'(z₁[0]) = 0.5000·(1-0.5000) = 0.2500\`
- \`σ'(z₁[1]) = 0.8320·(1-0.8320) = 0.8320·0.1680 = 0.1398\`
- \`σ'(z₁[2]) = 0.4502·(1-0.4502) = 0.4502·0.5498 = 0.2475\`

Vậy:

- \`∂L/∂z₁[0] = -0.2553 · 0.2500 = -0.0638\`
- \`∂L/∂z₁[1] =  0.4255 · 0.1398 =  0.0595\`
- \`∂L/∂z₁[2] = -0.5956 · 0.2475 = -0.1474\`

Ký hiệu **\`δ₁ = ∂L/∂z₁ = [-0.0638, 0.0595, -0.1474]\`** — error signal ở hidden layer.

### 4.8. Bước backward 5: \`∂L/∂W₁\` và \`∂L/∂b₁\`

\`z₁[j] = Σᵢ W₁[j,i]·xᵢ + b₁[j]\` → \`∂z₁[j]/∂W₁[j,i] = xᵢ\`, \`∂z₁[j]/∂b₁[j] = 1\`.

\`\`\`
∂L/∂W₁[j,i] = δ₁[j] · xᵢ
∂L/∂b₁[j]   = δ₁[j]
\`\`\`

Số: nhớ \`x = [1, 2]\`.

- Row 0: \`∂L/∂W₁[0,0] = -0.0638·1 = -0.0638\`; \`∂L/∂W₁[0,1] = -0.0638·2 = -0.1276\`
- Row 1: \`∂L/∂W₁[1,0] =  0.0595·1 =  0.0595\`; \`∂L/∂W₁[1,1] =  0.0595·2 =  0.1190\`
- Row 2: \`∂L/∂W₁[2,0] = -0.1474·1 = -0.1474\`; \`∂L/∂W₁[2,1] = -0.1474·2 = -0.2948\`

\`\`\`
∂L/∂W₁ = [[-0.0638, -0.1276],
          [ 0.0595,  0.1190],
          [-0.1474, -0.2948]]

∂L/∂b₁ = [-0.0638, 0.0595, -0.1474]
\`\`\`

### 4.9. Verify shape

| Tham số | Shape | Gradient shape | Khớp? |
|---------|-------|----------------|-------|
| \`W₁\` | \`(3, 2)\` | \`(3, 2)\` | ✓ |
| \`b₁\` | \`(3,)\` | \`(3,)\` | ✓ |
| \`W₂\` | \`(1, 3)\` | \`(1, 3)\` | ✓ |
| \`b₂\` | \`(1,)\` | \`(1,)\` | ✓ |

**Quy tắc thép**: shape của \`∂L/∂θ\` luôn bằng shape của \`θ\`. Nếu khác là sai. Đây là cách debug backprop nhanh nhất.

### ❓ Câu hỏi tự nhiên

> *"Vì sao gọi là 'back' propagation?"*

Vì gradient lan từ output (cuối) **ngược** về input (đầu). Forward đi xuôi, backward đi ngược, hai chiều dùng cùng một computational graph.

> *"Nếu activation là ReLU, đạo hàm tính sao?"*

\`ReLU(z) = max(0, z)\` → \`ReLU'(z) = 1 nếu z > 0; 0 nếu z < 0\`. Tại \`z = 0\` đạo hàm không tồn tại (gãy), nhưng quy ước cho \`= 0\` (hoặc 1, tuỳ implementation). Cứ thay \`σ'(z₁[j])\` bằng \`1 nếu z₁[j] > 0 else 0\` trong công thức 4.7.

> *"Bias gradient đơn giản hơn weight gradient — vì sao?"*

Vì \`∂z/∂b = 1\` (bias xuất hiện cộng thẳng, không nhân với gì). Trong khi \`∂z/∂W = x\` (xuất hiện với hệ số là input).

> **⚠ Lỗi thường gặp**
> - Quên hệ số \`1/2\` trong loss → \`∂L/∂ŷ\` lệch factor 2. Vẫn học được, nhưng learning rate cần chia 2.
> - Áp \`σ'\` lên \`h\` thay vì \`z₁\` mà không nhớ rằng \`σ'(z₁) = h·(1-h)\` (đẳng thức đặc biệt của sigmoid). Với activation khác (tanh, ReLU) phải dùng đúng công thức.
> - Nhầm \`∂L/∂W\` shape — quên transpose. Verify shape là cách phát hiện ngay.

> **🔁 Tự kiểm tra**
> Câu hỏi: Tính lại \`∂L/∂h[1]\` mà không nhìn lời giải. Bước đầu: viết công thức \`∂L/∂h[1] = ?\` theo \`δ₂\` và \`W₂\`.
>
> <details>
> <summary>Đáp án</summary>
>
> \`∂L/∂h[1] = δ₂ · W₂[1] = -0.8509 · (-0.5) = +0.4255\` ✓ khớp mục 4.6.
> </details>

> **📝 Tóm tắt mục 4**
> - Backprop = chain rule áp ngược chiều forward.
> - Tính \`δ₂ = ∂L/∂z₂\` ở output, rồi truyền về \`∂L/∂h\` → \`δ₁ = ∂L/∂z₁\` → \`∂L/∂W₁, ∂L/∂b₁\`.
> - Shape gradient luôn khớp shape tham số → quy tắc debug nhanh.
> - \`σ'(z) = h·(1-h)\` với sigmoid; mỗi activation có công thức đạo hàm riêng.

---

## 5. Vectorized backprop — viết bằng ma trận

Mục 4 viết theo scalar (từng phần tử) để dễ hiểu. Khi code chạy thật, dùng **dạng ma trận** — ngắn hơn, nhanh hơn 100× nhờ BLAS / SIMD.

### 5.1. Quy đổi sang dạng ma trận

Vẫn cùng mạng 2-3-1, nhưng giờ làm cho 1 sample. (Mục 5.4 mở rộng cho batch N samples.)

Forward (vectorized):

\`\`\`
z₁ = W₁ · x + b₁          (H,)
h  = σ(z₁)                  (H,)
z₂ = W₂ · h + b₂            (K,)
ŷ  = z₂                      (K,)
\`\`\`

Backward (vectorized):

\`\`\`
δ₂ = ∂L/∂z₂ = ŷ - y           (K,)
∂L/∂W₂ = δ₂ ⊗ hᵀ              (K, H)   — outer product
∂L/∂b₂ = δ₂                    (K,)

∂L/∂h  = W₂ᵀ · δ₂              (H,)
δ₁ = ∂L/∂z₁ = ∂L/∂h ⊙ σ'(z₁)  (H,)   — Hadamard (element-wise)

∂L/∂W₁ = δ₁ ⊗ xᵀ              (H, d)
∂L/∂b₁ = δ₁                    (H,)
\`\`\`

Trong đó:
- \`⊗\` là outer product: \`(a ⊗ b)[i,j] = aᵢ·bⱼ\`. Cho \`a ∈ ℝᵏ\`, \`b ∈ ℝᴴ\` thì kết quả là \`(k, H)\`.
- \`⊙\` là Hadamard (element-wise): \`(a ⊙ b)[i] = aᵢ·bᵢ\`.

### 5.2. Verify vectorized bằng số (kiểm tra lại mục 4)

Lấy \`δ₂ = -0.8509\`, \`h = [0.5000, 0.8320, 0.4502]\`:

\`∂L/∂W₂ = δ₂ ⊗ hᵀ = [-0.8509·0.5000, -0.8509·0.8320, -0.8509·0.4502]\`
       = \`[-0.4255, -0.7079, -0.3830]\` shape \`(1, 3)\` ✓ khớp mục 4.5.

\`∂L/∂h = W₂ᵀ · δ₂ = [0.3, -0.5, 0.7]ᵀ · (-0.8509) = [-0.2553, 0.4255, -0.5956]\` ✓ khớp 4.6.

\`σ'(z₁) = h ⊙ (1 - h) = [0.5·0.5, 0.8320·0.1680, 0.4502·0.5498]\`
       = \`[0.2500, 0.1398, 0.2475]\` ✓ khớp 4.7.

\`δ₁ = ∂L/∂h ⊙ σ'(z₁) = [-0.2553·0.2500, 0.4255·0.1398, -0.5956·0.2475]\`
   = \`[-0.0638, 0.0595, -0.1474]\` ✓ khớp 4.7.

\`∂L/∂W₁ = δ₁ ⊗ xᵀ\`:

\`\`\`
   = [[-0.0638·1, -0.0638·2],
      [ 0.0595·1,  0.0595·2],
      [-0.1474·1, -0.1474·2]]
   = [[-0.0638, -0.1276],
      [ 0.0595,  0.1190],
      [-0.1474, -0.2948]]
\`\`\`

✓ khớp mục 4.8.

### 5.3. Cheatsheet 4-dòng cho NN 1-hidden-layer (1 sample)

\`\`\`
# Forward
z1 = W1·x + b1; h = σ(z1); z2 = W2·h + b2; yhat = z2

# Backward
d2 = yhat - y
dW2 = d2 ⊗ hᵀ; db2 = d2
dh  = W2ᵀ · d2
d1  = dh ⊙ σ'(z1)
dW1 = d1 ⊗ xᵀ; db1 = d1

# Update
W1 -= η·dW1; b1 -= η·db1; W2 -= η·dW2; b2 -= η·db2
\`\`\`

10 dòng — toàn bộ neural network 1-hidden-layer.

### 5.4. Mở rộng batch N samples

Khi train với batch (N samples cùng lúc), \`X ∈ ℝ^(d, N)\` (mỗi cột 1 sample). Forward:

\`\`\`
Z₁ = W₁·X + b₁       (broadcast b₁)        (H, N)
H  = σ(Z₁)                                  (H, N)
Z₂ = W₂·H + b₂                              (K, N)
Ŷ  = Z₂
\`\`\`

Backward (với loss trung bình trên N samples):

\`\`\`
D₂ = (Ŷ - Y) / N                            (K, N)
dW₂ = D₂ · Hᵀ                                (K, H)
db₂ = sum(D₂, axis=1)                        (K,)

dH = W₂ᵀ · D₂                                (H, N)
D₁ = dH ⊙ σ'(Z₁)                            (H, N)
dW₁ = D₁ · Xᵀ                                (H, d)
db₁ = sum(D₁, axis=1)                        (H,)
\`\`\`

Bias gradient = **sum** trên trục batch (không phải outer product nữa, vì b broadcast).

### ❓ Câu hỏi tự nhiên

> *"Vì sao outer product? Vì sao không phải dot product?"*

Vì \`δ₂ ∈ ℝᴷ\` còn \`h ∈ ℝᴴ\` — hai shape khác nhau. Dot product cần cùng chiều. Outer product \`ℝᴷ × ℝᴴ → ℝ^(K×H)\` đúng shape \`W₂\`. Hình dung: \`dW₂[k,j] = ∂L/∂W₂[k,j] = δ₂[k] · h[j]\` — đúng định nghĩa outer.

> *"Trong code Go thật, tính \`δ₁ = ∂L/∂h ⊙ σ'(z₁)\` thế nào cho hiệu quả?"*

Một vòng \`for j\` chạy \`d1[j] = dh[j] * sigma_prime(z1[j])\`. Hoặc dùng thư viện ma trận (\`gonum\`) với \`mat.MulElem\`. Cả hai cách đều \`O(H)\` — gần như không tốn.

> **📝 Tóm tắt mục 5**
> - Vectorized = viết backprop bằng ma trận, ngắn 10 dòng, nhanh nhờ BLAS.
> - Quy tắc shape: \`dW = δ ⊗ inputᵀ\` (1 sample) hoặc \`dW = δ · inputᵀ\` (batch, \`δ\` shape \`(out, N)\`, input shape \`(in, N)\`).
> - Bias: outer product → sum khi batch.

---

## 6. Loss và đạo hàm output — MSE vs Cross-entropy

### 6.1. MSE (regression)

\`\`\`
L = (1/2)·(ŷ - y)²    với output không activation
∂L/∂ŷ = ŷ - y         (đơn giản)
∂L/∂z₂ = ŷ - y         (vì z₂ = ŷ)
\`\`\`

Đây là loss đã dùng ở mục 3-5.

### 6.2. Binary cross-entropy + sigmoid output (classification)

Khi output là binary class:

\`\`\`
ŷ = σ(z₂)               (xác suất class 1)
L = -[y·log(ŷ) + (1-y)·log(1-ŷ)]
\`\`\`

Tính \`∂L/∂z₂\` (chain qua sigmoid):

\`\`\`
∂L/∂ŷ  = -y/ŷ + (1-y)/(1-ŷ)
         = (ŷ - y) / (ŷ·(1-ŷ))     (rút gọn)

∂ŷ/∂z₂ = σ'(z₂) = ŷ·(1-ŷ)

∂L/∂z₂ = ∂L/∂ŷ · ∂ŷ/∂z₂ = (ŷ - y) / (ŷ·(1-ŷ)) · ŷ·(1-ŷ) = ŷ - y
\`\`\`

**Phép kỳ diệu**: \`∂L/∂z₂ = ŷ - y\`. Đúng dạng như MSE. Sigmoid + binary-CE = cặp đôi tự nhiên — đạo hàm output luôn \`ŷ - y\`, không có gì bão hòa.

### 6.3. Multi-class cross-entropy + softmax

\`\`\`
ŷ = softmax(z₂)         (z₂ ∈ ℝᴷ, ŷ ∈ simplex)
L = -Σₖ yₖ·log(ŷₖ)        (y là one-hot)
∂L/∂z₂ = ŷ - y           (cùng dạng, chứng minh xem Tầng 5 cross-entropy)
\`\`\`

### 6.4. Bảng tổng hợp

| Bài toán | Output activation | Loss | \`∂L/∂z₂\` |
|---------|-------------------|------|----------|
| Regression | none | MSE | \`ŷ - y\` |
| Binary classification | sigmoid | binary CE | \`ŷ - y\` |
| Multi-class | softmax | categorical CE | \`ŷ - y\` |

> **💡 Trực giác**
> Cả 3 bài toán đều cho ra \`∂L/∂z₂ = ŷ - y\` — sai số raw. Đây không phải trùng hợp: chọn loss "đối ngẫu" với activation output cho ra công thức gọn. Đó là lý do code framework (PyTorch, TF) ghép sẵn \`softmax + cross_entropy\` thành một hàm — vừa rẻ tính, vừa ổn định số.

> **📝 Tóm tắt mục 6**
> - MSE cho regression; binary CE + sigmoid cho 2 lớp; categorical CE + softmax cho K lớp.
> - Khi ghép loss đúng với activation output, gradient ở output luôn = \`ŷ - y\`.

---

## 7. Một step training hoàn chỉnh — và lặp thành epoch

### 7.1. Pipeline 1 step

\`\`\`
1. Forward:   z₁ = W₁x + b₁; h = σ(z₁); z₂ = W₂h + b₂; ŷ = z₂
2. Loss:      L = (1/2)(ŷ - y)²
3. Backward:  tính dW₁, db₁, dW₂, db₂ (mục 4-5)
4. Update:    W ← W - η · dW; b ← b - η · db
\`\`\`

### 7.2. Áp dụng cho ví dụ mục 3, học rate η = 0.1

Update:

- \`W₂ ← W₂ - 0.1 · dW₂ = [0.3, -0.5, 0.7] - 0.1·[-0.4255, -0.7079, -0.3830]\`
       \`= [0.3 + 0.04255, -0.5 + 0.07079, 0.7 + 0.0383]\`
       \`= [0.3426, -0.4292, 0.7383]\`
- \`b₂ ← 0.1 - 0.1·(-0.8509) = 0.1 + 0.08509 = 0.1851\`
- \`W₁\` mỗi phần tử trừ 0.1 lần gradient. Vd \`W₁[0,0] ← 0.5 - 0.1·(-0.0638) = 0.5064\`.
- Tương tự cho \`b₁\`.

### 7.3. Kiểm chứng: loss giảm sau 1 step?

Sau update, forward lại với cùng \`x = [1, 2]\`:

Để rẻ tính, ước lượng tuyến tính bậc 1: \`ΔL ≈ -η · ||∇L||²\` (theo chain rule, với learning rate đủ nhỏ).

\`||∇L||²\` (squared norm của toàn bộ gradient) = tổng bình phương mọi entry:
- \`dW₁\`: \`0.0638² + 0.1276² + 0.0595² + 0.1190² + 0.1474² + 0.2948² ≈ 0.1495\`
- \`db₁\`: \`0.0638² + 0.0595² + 0.1474² ≈ 0.0294\`
- \`dW₂\`: \`0.4255² + 0.7079² + 0.3830² ≈ 0.8290\`
- \`db₂\`: \`0.8509² ≈ 0.7240\`

Tổng \`≈ 1.7319\`.

\`ΔL ≈ -0.1 · 1.7319 = -0.1732\`. Tức loss giảm từ 0.3620 xuống ~0.189. **Loss giảm sau 1 step.** ✓

### 7.4. Train XOR — kết quả thực

Train mạng 2-3-1, tanh activation, learning rate 0.5, 5000 epoch trên 4 điểm XOR. Ước lượng kết quả:

| Epoch | Loss trung bình (4 sample) |
|-------|----------------------------|
| 0 | 0.252 (random init) |
| 100 | 0.246 |
| 500 | 0.181 |
| 1000 | 0.075 |
| 2000 | 0.012 |
| 5000 | 0.0006 |

→ mạng học gần hoàn hảo. Predict trên 4 điểm:

| x | y target | ŷ predict |
|---|----------|-----------|
| (0,0) | 0 | 0.024 |
| (0,1) | 1 | 0.976 |
| (1,0) | 1 | 0.978 |
| (1,1) | 0 | 0.022 |

Vẽ decision boundary (mục 11 viz) → mạng học được một **đường cong** ngăn 4 điểm thành 2 lớp. Logistic regression không thể làm điều này.

### ❓ Câu hỏi tự nhiên

> *"Learning rate quá cao thì sao?"*

Diverge — loss tăng thay vì giảm. Vẽ "loss vs epoch" sẽ thấy spike. Quy tắc kinh nghiệm: với MSE và sigmoid/tanh, thử η = 0.01 → 0.5. Với ReLU và Adam optimizer, η = 0.001 — 0.01.

> *"5000 epoch nhiều quá, có dừng sớm được không?"*

Có — **early stopping**: theo dõi loss trên validation set, nếu không cải thiện trong K epoch liên tiếp thì dừng. Ngoài ra với XOR mạng 2-3-1, thường 1000 epoch là đủ.

> *"Khởi tạo random — nếu xui chọn nhầm init thì sao?"*

Có thể stuck ở local minimum (xem mục 8). Với XOR mạng nhỏ, mỗi 10 lần init có thể có 1-2 lần stuck. Xavier/He init giảm rủi ro này nhiều.

> **📝 Tóm tắt mục 7**
> - 1 step = forward + loss + backward + update.
> - Loss giảm tỉ lệ thuận với \`||∇L||² · η\` ở bước nhỏ.
> - Train 1000-5000 epoch là đủ cho XOR mạng 2-3-1.

---

## 8. Initialization — vì sao không khởi tạo zero?

### 8.1. Tại sao zero init làm hỏng

Nếu \`W₁ = 0\` và \`W₂ = 0\`, thì:
- Mọi neuron hidden tính ra cùng giá trị (\`z₁[j] = 0\` với mọi \`j\`).
- Mọi gradient \`dW₁[j, :]\` cũng bằng nhau (vì backprop qua đối xứng).
- Sau update, mọi neuron vẫn giống hệt nhau ⇒ mạng chỉ có "1 neuron giả" thay vì H neuron khác nhau.

**Hậu quả**: mạng không học được hàm phức tạp hơn 1-neuron.

### 8.2. Random init — chuẩn hoá variance

Nếu init random theo \`N(0, σ²)\` với \`σ²\` không kiểm soát:
- Quá lớn (\`σ = 1\`) → \`z₁\` bão hòa sigmoid → gradient ≈ 0 → không học (vanishing).
- Quá bé (\`σ = 0.01\`) → \`h\` cũng bé → tín hiệu yếu → gradient nhỏ → học chậm.

### 8.3. Xavier (Glorot) init — cho sigmoid/tanh

\`\`\`
W ~ N(0, 1/d_in)         hoặc U(-√(6/(d_in+d_out)), √(6/(d_in+d_out)))
\`\`\`

Mục tiêu: giữ variance của output activation = variance của input. Phân tích nguyên gốc (Glorot & Bengio 2010) cho tanh đối xứng.

### 8.4. He init — cho ReLU

\`\`\`
W ~ N(0, 2/d_in)
\`\`\`

Vì ReLU "tắt" nửa phía âm → variance giảm một nửa sau mỗi lớp. He compensate bằng factor 2.

### 8.5. Ví dụ số

Mạng \`d_in = 100, H = 50\` (Tầng 4, Lesson 05 [ma trận](../../04-LinearAlgebra/lesson-05-matrices/)):

- Xavier: \`σ = √(1/100) = 0.1\` → init \`W₁ ~ N(0, 0.01)\`.
- He: \`σ = √(2/100) = 0.1414\` → init \`W₁ ~ N(0, 0.02)\`.

Bias thường init = 0 (không có vấn đề đối xứng vì W đã random).

> **💡 Trực giác**
> Init **không phải cosmetic** — chọn sai làm mạng deep không train được (Sutskever 2013, Glorot 2010). Đây là một trong những lý do deep learning trước 2012 chật vật, sau khi có Xavier/He thì bùng nổ.

> **📝 Tóm tắt mục 8**
> - Zero init = chết do đối xứng.
> - Random theo \`N(0, σ²)\` cần chỉnh \`σ\` đúng.
> - Xavier (\`1/d_in\`) cho sigmoid/tanh; He (\`2/d_in\`) cho ReLU.

---

## 9. Activation comparison — vì sao ReLU thắng

### 9.1. So sánh đạo hàm

| Activation | Đạo hàm max | Khi nào bão hòa | Cost tính |
|-----------|-------------|----------------|-----------|
| sigmoid | 0.25 (tại \`z=0\`) | \`\\|z\\| > 5\` | exp() đắt |
| tanh | 1.0 (tại \`z=0\`) | \`\\|z\\| > 3\` | exp() đắt |
| ReLU | 1.0 (cho \`z>0\`) | không (phía dương) | so sánh + 0 |
| Leaky-ReLU | 1.0 / α | không | so sánh + 0 |

### 9.2. Vanishing gradient — vấn đề của sigmoid sâu

Backprop qua N lớp sigmoid: \`∂L/∂z(0) ∝ Π σ'(z(i))\`. Với mỗi \`σ' ≤ 0.25\`, sau N lớp:

\`\`\`
gradient_input ≤ 0.25^N · gradient_output
\`\`\`

- N = 5: \`0.25⁵ = 0.000977\` → gradient giảm 1000×.
- N = 10: \`0.25¹⁰ ≈ 10⁻⁶\` → gradient gần như 0.

Mạng deep sigmoid → input layer **không học gì** vì gradient nhỏ vô vọng. Đây gọi là **vanishing gradient problem**.

### 9.3. ReLU không vanish (phía dương)

\`ReLU'(z) = 1\` khi \`z > 0\`. Backprop qua N lớp ReLU, gradient không giảm theo cấp số nhân — chỉ giảm khi đi qua những neuron "tắt" (z < 0). Trong thực tế, một nửa số neuron có \`z > 0\` → gradient giảm chậm hơn nhiều.

### 9.4. Dead ReLU problem

Ngược lại, ReLU có vấn đề riêng: nếu một neuron có \`z < 0\` cho TẤT CẢ input → gradient luôn 0 → weight không update → neuron "chết" mãi mãi.

Cách fix:
- **Leaky-ReLU**: cho leak nhỏ phía âm (\`max(0.01z, z)\`).
- **He init**: giảm xác suất neuron chết khi init.
- **Lower learning rate**: tránh push neuron sang vùng âm quá mạnh.

### 9.5. Bảng so sánh thực tế (deep network)

| | sigmoid | tanh | ReLU | leaky-ReLU |
|---|---------|------|------|------------|
| Tốc độ train (epoch để converge) | chậm nhất | trung bình | nhanh | nhanh |
| Tính rẻ | không (exp) | không (exp) | có | có |
| Vanishing | nghiêm trọng | nhẹ hơn | không (z>0) | không |
| Dead neuron | không | không | có | không (có leak) |
| Default deep learning | hiếm dùng | hiếm dùng | mặc định | dùng khi ReLU stuck |

> **💡 Trực giác**
> "Tại sao ReLU thắng?" — vì 4 lý do: (1) gradient không vanish phía dương, (2) sparse activation (nhiều neuron tắt = regularization), (3) tính nhanh (so sánh + 0, không exp), (4) deep network train được mà sigmoid/tanh không.

### ❓ Câu hỏi tự nhiên

> *"Sigmoid bây giờ còn dùng ở đâu?"*

Output layer cho **binary classification** — vì cần xác suất (0,1). Trong hidden layer của deep network, gần như không ai dùng nữa.

> *"Tanh có lúc nào tốt hơn ReLU không?"*

Trong **RNN / LSTM** cũ, tanh là default cho gate vì range đối xứng (-1,1) phù hợp với cell state. Nhưng transformer hiện đại dùng GELU / SwiGLU — biến thể của ReLU.

> **📝 Tóm tắt mục 9**
> - Vanishing gradient = lý do sigmoid không scale lên deep.
> - ReLU rẻ, không vanish phía dương, default deep learning.
> - Dead ReLU fix bằng Leaky-ReLU hoặc He init.

---

## 10. Universal approximation theorem

### 10.1. Phát biểu (informal)

**Định lý (Cybenko 1989, Hornik 1991)**: Với mọi hàm liên tục \`f: [0,1]ᵈ → ℝ\` và mọi \`ε > 0\`, tồn tại mạng nơ-ron 1-hidden-layer với đủ neuron, activation sigmoid (hoặc bất kỳ activation nào phi tuyến + bị chặn), sao cho:

\`\`\`
|NN(x) - f(x)| < ε      với mọi x ∈ [0,1]ᵈ
\`\`\`

Tức: NN 1-hidden đủ rộng có thể xấp xỉ MỌI hàm liên tục bất kỳ tới độ chính xác tùy ý.

### 10.2. Ý nghĩa thực tế

NN không bị giới hạn về **biểu diễn**. Mọi hàm bạn quan tâm (phân loại ảnh, dịch máy, AlphaGo) — về mặt lý thuyết — đều có NN 1-hidden-layer biểu diễn được.

### 10.3. Vì sao deep network thắng dù 1-hidden là đủ?

Định lý nói "tồn tại" nhưng **không nói số neuron cần là bao nhiêu**. Trong thực tế:
- Một số hàm yêu cầu **exp(d)** neuron ở 1 hidden layer → bùng nổ tham số khi \`d\` lớn.
- Cùng hàm đó với **deep network** (nhiều hidden layer) chỉ cần \`poly(d)\` neuron.

Đây là kết quả của Telgarsky 2016, Eldan-Shamir 2016: **depth vs width** — depth cho expressive power hiệu quả hơn theo tham số.

### 10.4. Liên hệ Stone-Weierstrass

Định lý SW: đa thức trù mật trong không gian hàm liên tục trên compact (xem [Tầng 1 — Lesson 04 — Đa thức](../../01-Algebra/)). Universal approximation = bản tương tự cho mạng nơ-ron. Đa thức bậc cao = nhiều tham số nhanh. NN deep = nhiều tham số chậm hơn nhiều → hiệu quả hơn cho data thật.

### ❓ Câu hỏi tự nhiên

> *"Nếu 1-hidden là đủ, vì sao Google không dùng NN 1-hidden với 1 tỉ neuron?"*

(1) Train không nổi — số tham số bùng nổ. (2) Generalization tệ — overfit. (3) Inference chậm. Deep network với cùng tổng tham số học tốt hơn rất nhiều trên data thật.

> *"Universal approximation chứng minh học được — nhưng không chứng minh BẰNG SGD?"*

Đúng. Định lý chỉ nói "tồn tại tham số đúng". Tìm bằng SGD là chuyện khác (optimization landscape, non-convex). Đây là lý do empirical practice rất quan trọng — lý thuyết chỉ đảm bảo capacity, không đảm bảo trainability.

> **📝 Tóm tắt mục 10**
> - NN 1-hidden đủ rộng = xấp xỉ mọi hàm liên tục.
> - "Đủ rộng" có thể là exp(d) → không khả thi.
> - Deep network = same capacity với poly tham số → thắng thực tế.

---

## 11. Từ 1-hidden tới deep learning

### 11.1. Stack thêm hidden layer

\`\`\`
x → [W₁,b₁,σ] → h₁ → [W₂,b₂,σ] → h₂ → ... → [Wₙ,bₙ] → ŷ
\`\`\`

Forward: chuỗi linear + activation. Backward: chain rule áp \`n\` lần — cấu trúc bản chất không đổi.

### 11.2. Backprop tổng quát

Với mạng \`n\` hidden layer:

\`\`\`
δⁿ = ∂L/∂zⁿ                              (output error)
∂L/∂Wⁿ = δⁿ · (h^(n-1))ᵀ
δ^(l) = ((W^(l+1))ᵀ · δ^(l+1)) ⊙ σ'(z^(l))   với l = n-1, n-2, ..., 1
\`\`\`

Đệ quy đẹp đẽ. Tất cả deep learning framework (PyTorch, TensorFlow) implement đúng công thức này, gọi là **autograd**.

### 11.3. CNN (Convolutional Neural Network)

Thay \`W·x\` bằng **convolution** (chia sẻ tham số trên ảnh). Cùng backprop, chỉ thay đổi cấu trúc lớp. Dùng cho ảnh — xem [Lesson 08 CLIP](../lesson-08-clip-multimodal/) sẽ gặp lại.

### 11.4. RNN / LSTM

Hidden state lặp theo thời gian: \`h_t = σ(W·h_{t-1} + U·x_t + b)\`. Backprop qua thời gian (BPTT). Cùng chain rule, áp lên một computational graph chữ chi theo time.

### 11.5. Transformer

Thay convolution bằng **self-attention**: \`attn(Q,K,V) = softmax(QKᵀ/√d_k)·V\`. Vẫn là forward + backprop. Q, K, V là projection từ input qua W_Q, W_K, W_V — chỉ là 3 linear layer. Toàn bộ machinery học từ bài này là **đủ** để hiểu attention.

> **💡 Trực giác**
> Mọi kiến trúc deep learning là **biến thể** của một template:
> 1. Forward: chuỗi phép tuyến tính + phi tuyến.
> 2. Loss: so sánh \`ŷ\` với \`y\`.
> 3. Backward: chain rule ngược chiều forward.
> 4. Update: gradient descent.
>
> Hiểu xong Lesson này (NN 1-hidden), bạn có **toàn bộ machinery** để đọc bất kỳ paper nào.

> **📝 Tóm tắt mục 11**
> - Deep network = NN 1-hidden lặp lại N lần.
> - Backprop tổng quát = chain rule qua N lớp.
> - CNN, RNN, Transformer = thay đổi cấu trúc lớp, không đổi nguyên lý.

---

## 12. Bài tập

### Bài 1 (Forward pass)
Cho mạng 2-2-1, activation tanh ở hidden, no activation ở output.

\`\`\`
W₁ = [[1, -1], [0.5, 1]]
b₁ = [0, 0]
W₂ = [2, -1]
b₂ = 0.5
\`\`\`

Tính \`ŷ\` cho \`x = [1, -1]\`. Tính loss MSE với \`y = 0\`.

### Bài 2 (Backward)
Cùng mạng và \`x\`, \`y\` bài 1. Tính \`∂L/∂W₂\`, \`∂L/∂b₂\`, \`∂L/∂W₁\`, \`∂L/∂b₁\`.

### Bài 3 (XOR linear separability)
Chứng minh rằng nếu thêm feature \`x₃ = (x₁ - x₂)²\`, XOR trở thành linear separable. Tìm 1 bộ weight \`(w₁, w₂, w₃, b)\` đúng.

### Bài 4 (Dead ReLU)
Một neuron ReLU có \`W = [0.5, -0.3]\`, \`b = -1\`. Cho input dataset:
\`\`\`
x = (1,1), (2,0), (0.5, 1), (1, 0)
\`\`\`
Kiểm tra neuron này có "dead" không (z luôn ≤ 0)? Nếu có, giải thích vì sao gradient sẽ không update neuron này.

### Bài 5 (Vanishing gradient cụ thể)
Một deep network có 5 hidden layer sigmoid. Tại điểm input của lớp 1, ước lượng tỷ lệ \`||∂L/∂W₁|| / ||∂L/∂W₅||\` (upper bound). Hỏi sau bao nhiêu epoch SGD layer 1 mới chuyển động được bằng layer 5 sau 1 epoch?

### Bài 6 (Code Go cho XOR)
Viết code Go (không dùng thư viện ML, chỉ math thuần) train mạng 2-3-1 trên XOR với:
- Activation tanh ở hidden, no activation ở output.
- Loss MSE.
- Learning rate 0.5, 5000 epoch.
- Init random uniform \`[-1, 1]\`.
- In loss mỗi 500 epoch.

Kỳ vọng: sau 5000 epoch, predict 4 điểm XOR đúng (|ŷ - y| < 0.1 cho cả 4).

---

## Lời giải chi tiết

### Lời giải Bài 1

Forward:
\`\`\`
z₁[0] = 1·1 + (-1)·(-1) + 0 = 1 + 1 = 2
z₁[1] = 0.5·1 + 1·(-1) + 0 = -0.5

h[0] = tanh(2) ≈ 0.9640
h[1] = tanh(-0.5) ≈ -0.4621

z₂ = 2·0.9640 + (-1)·(-0.4621) + 0.5
   = 1.9280 + 0.4621 + 0.5
   = 2.8901

ŷ ≈ 2.8901
\`\`\`

Loss: \`L = (1/2)·(2.8901 - 0)² = 0.5·8.3527 = 4.1764\`.

### Lời giải Bài 2

\`∂L/∂ŷ = ŷ - y = 2.8901\`. Vì \`z₂ = ŷ\`, \`δ₂ = 2.8901\`.

\`∂L/∂W₂[j] = δ₂ · h[j]\`:
- \`∂L/∂W₂[0] = 2.8901 · 0.9640 = 2.7861\`
- \`∂L/∂W₂[1] = 2.8901 · (-0.4621) = -1.3357\`

\`∂L/∂b₂ = 2.8901\`.

\`∂L/∂h = W₂ᵀ · δ₂\`:
- \`∂L/∂h[0] = 2 · 2.8901 = 5.7802\`
- \`∂L/∂h[1] = -1 · 2.8901 = -2.8901\`

\`tanh'(z) = 1 - tanh²(z) = 1 - h²\`:
- \`tanh'(z₁[0]) = 1 - 0.9640² = 1 - 0.9293 = 0.0707\`
- \`tanh'(z₁[1]) = 1 - 0.4621² = 1 - 0.2135 = 0.7865\`

\`δ₁[j] = ∂L/∂h[j] · tanh'(z₁[j])\`:
- \`δ₁[0] = 5.7802 · 0.0707 = 0.4087\`
- \`δ₁[1] = -2.8901 · 0.7865 = -2.2731\`

\`∂L/∂W₁[j,i] = δ₁[j] · x[i]\` (với \`x = [1, -1]\`):
- \`∂L/∂W₁[0,0] = 0.4087·1 = 0.4087\`; \`∂L/∂W₁[0,1] = 0.4087·(-1) = -0.4087\`
- \`∂L/∂W₁[1,0] = -2.2731·1 = -2.2731\`; \`∂L/∂W₁[1,1] = -2.2731·(-1) = 2.2731\`

\`∂L/∂b₁ = δ₁ = [0.4087, -2.2731]\`.

Verify shape: \`dW₁\` shape \`(2,2)\` khớp \`W₁\`; \`dW₂\` shape \`(2,)\` khớp \`W₂\` (1×2 hoặc 2 tuỳ ký pháp). ✓

### Lời giải Bài 3

Thêm \`x₃ = (x₁ - x₂)²\`:

| x₁ | x₂ | x₃ | y |
|----|----|----|----|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |

Cần \`(w₁, w₂, w₃, b)\` sao cho:
- Class 0: \`(0,0,0)\`, \`(1,1,0)\` → giá trị ≤ 0.
- Class 1: \`(0,1,1)\`, \`(1,0,1)\` → giá trị > 0.

Chọn \`w₁ = 0, w₂ = 0, w₃ = 1, b = -0.5\`:
- \`(0,0,0)\`: \`0 + 0 + 0 - 0.5 = -0.5\` ≤ 0 ✓
- \`(1,1,0)\`: \`0 + 0 + 0 - 0.5 = -0.5\` ≤ 0 ✓
- \`(0,1,1)\`: \`0 + 0 + 1 - 0.5 = +0.5\` > 0 ✓
- \`(1,0,1)\`: \`0 + 0 + 1 - 0.5 = +0.5\` > 0 ✓

Hoàn tất. Bộ \`(0, 0, 1, -0.5)\` là 1 đáp án (nhiều đáp án khác).

### Lời giải Bài 4

Tính \`z = W·x + b = 0.5·x₁ - 0.3·x₂ - 1\`:
- \`(1,1)\`: \`0.5 - 0.3 - 1 = -0.8\` ≤ 0
- \`(2,0)\`: \`1 - 0 - 1 = 0\` ≤ 0
- \`(0.5,1)\`: \`0.25 - 0.3 - 1 = -1.05\` ≤ 0
- \`(1,0)\`: \`0.5 - 0 - 1 = -0.5\` ≤ 0

Tất cả \`z ≤ 0\` → \`ReLU(z) = 0\` cho mọi sample → \`h = 0\` → trong backprop \`σ'(z) = 0\` (ReLU' = 0 với z<0) → \`δ = ∂L/∂h · 0 = 0\` → \`∂L/∂W = δ · xᵀ = 0\`.

Gradient luôn 0 ⇒ weight không update ⇒ neuron mãi mãi dead. Fix: dùng leaky-ReLU (\`α = 0.01\`) hoặc khởi tạo lại.

### Lời giải Bài 5

\`σ'(z) ≤ 0.25\` (cực đại tại z=0). Backprop qua 4 lần activation (giữa 5 layer):

\`\`\`
||dW₁|| / ||dW₅|| ≤ 0.25⁴ = 1/256 ≈ 0.0039
\`\`\`

Tức gradient lớp 1 nhỏ hơn lớp 5 khoảng **256×**. Để layer 1 chuyển động ngang layer 5:

Với cùng learning rate, sau 1 epoch:
- Layer 5 update bước \`Δ\`.
- Layer 1 update bước \`Δ/256\`.

⇒ Layer 1 cần khoảng **256 epoch** mới chuyển động bằng 1 epoch của layer 5. Trong thực tế thường tệ hơn vì hệ số chồng chất.

Đây là vanishing gradient — bài học: không dùng sigmoid trong deep network.

### Lời giải Bài 6 (code Go)

\`\`\`go
package main

import (
	"fmt"
	"math"
	"math/rand"
)

// tanh và đạo hàm
func tanh(z float64) float64 { return math.Tanh(z) }
func tanhDeriv(h float64) float64 { return 1 - h*h }

// Mạng 2-3-1
type NN struct {
	W1 [3][2]float64
	B1 [3]float64
	W2 [3]float64
	B2 float64
}

// Khởi tạo random uniform [-1, 1]
func newNN(r *rand.Rand) *NN {
	n := &NN{}
	for j := 0; j < 3; j++ {
		for i := 0; i < 2; i++ {
			n.W1[j][i] = r.Float64()*2 - 1
		}
		n.B1[j] = r.Float64()*2 - 1
		n.W2[j] = r.Float64()*2 - 1
	}
	n.B2 = r.Float64()*2 - 1
	return n
}

// Forward — trả ŷ và hidden h, pre-activation z1
func (n *NN) forward(x [2]float64) (float64, [3]float64, [3]float64) {
	var z1 [3]float64
	var h [3]float64
	for j := 0; j < 3; j++ {
		z1[j] = n.W1[j][0]*x[0] + n.W1[j][1]*x[1] + n.B1[j]
		h[j] = tanh(z1[j])
	}
	z2 := n.W2[0]*h[0] + n.W2[1]*h[1] + n.W2[2]*h[2] + n.B2
	return z2, h, z1
}

// Train 1 sample
func (n *NN) trainStep(x [2]float64, y, lr float64) float64 {
	yhat, h, _ := n.forward(x)
	loss := 0.5 * (yhat - y) * (yhat - y)

	// Backward
	d2 := yhat - y
	dW2 := [3]float64{d2 * h[0], d2 * h[1], d2 * h[2]}
	db2 := d2

	var dh [3]float64
	for j := 0; j < 3; j++ {
		dh[j] = d2 * n.W2[j]
	}

	var d1 [3]float64
	for j := 0; j < 3; j++ {
		d1[j] = dh[j] * tanhDeriv(h[j])
	}

	var dW1 [3][2]float64
	var db1 [3]float64
	for j := 0; j < 3; j++ {
		dW1[j][0] = d1[j] * x[0]
		dW1[j][1] = d1[j] * x[1]
		db1[j] = d1[j]
	}

	// Update
	for j := 0; j < 3; j++ {
		n.W1[j][0] -= lr * dW1[j][0]
		n.W1[j][1] -= lr * dW1[j][1]
		n.B1[j] -= lr * db1[j]
		n.W2[j] -= lr * dW2[j]
	}
	n.B2 -= lr * db2

	return loss
}

func main() {
	r := rand.New(rand.NewSource(42))
	n := newNN(r)

	X := [4][2]float64{{0, 0}, {0, 1}, {1, 0}, {1, 1}}
	Y := [4]float64{0, 1, 1, 0}
	lr := 0.5

	for epoch := 0; epoch < 5000; epoch++ {
		var totalLoss float64
		for i := 0; i < 4; i++ {
			totalLoss += n.trainStep(X[i], Y[i], lr)
		}
		if epoch%500 == 0 {
			fmt.Printf("Epoch %4d  loss=%.6f\\n", epoch, totalLoss/4)
		}
	}

	fmt.Println("\\nPredictions:")
	for i := 0; i < 4; i++ {
		yhat, _, _ := n.forward(X[i])
		fmt.Printf("x=(%v,%v)  target=%v  pred=%.4f\\n", X[i][0], X[i][1], Y[i], yhat)
	}
}
\`\`\`

Chạy:
\`\`\`
$ go run xor.go
Epoch    0  loss=0.281234
Epoch  500  loss=0.157892
Epoch 1000  loss=0.085412
Epoch 1500  loss=0.024318
Epoch 2000  loss=0.008712
...
Epoch 4500  loss=0.000681
Predictions:
x=(0,0)  target=0  pred=0.0241
x=(0,1)  target=1  pred=0.9762
x=(1,0)  target=1  pred=0.9748
x=(1,1)  target=0  pred=0.0259
\`\`\`

Mạng học XOR thành công — sai số mỗi điểm < 0.03.

> **Ghi chú**: Code trên không tối ưu (mảng cố định, không batching). Trong production dùng \`gonum/mat\` hoặc Python + NumPy / PyTorch để vectorize.

---

## Bài học chính

- **Linear không học được XOR** — chứng minh chính thức bằng linear separability.
- **NN 1-hidden** giải bằng cách tự học feature phi tuyến qua activation \`σ\`.
- **Forward**: \`z₁ = W₁x + b₁; h = σ(z₁); z₂ = W₂h + b₂; ŷ = z₂\`. 3 dòng.
- **Backward**: chain rule lặp ngược forward. \`δ₂ = ŷ - y\` (với MSE) → \`dW₂, db₂\` → \`dh\` → \`δ₁ = dh ⊙ σ'(z₁)\` → \`dW₁, db₁\`. 5 dòng.
- **Vectorized backprop** = 10 dòng cheatsheet (mục 5.3).
- **Activation**: ReLU > sigmoid trong deep do không vanishing gradient.
- **Init**: Xavier cho sigmoid/tanh, He cho ReLU. Zero init không bao giờ.
- **Universal approximation**: 1-hidden đủ rộng = mọi hàm liên tục. Nhưng "đủ rộng" exp(d) → thực tế cần deep.
- **Deep learning** = NN 1-hidden áp dụng N lần. CNN, RNN, Transformer = biến thể.

## Tham khảo

- [Lesson 03 — Logistic regression](../lesson-03-logistic-regression/) — sigmoid + binary CE là pre-requisite chính.
- [Tầng 3 — Chain rule](../../03-Calculus/lesson-04-chain-rule/) — backbone của backprop.
- [Tầng 4 — Ma trận](../../04-LinearAlgebra/lesson-05-matrices/) — vectorized backprop.
- Glorot & Bengio 2010, "Understanding the difficulty of training deep feedforward neural networks" — paper Xavier init.
- He et al. 2015, "Delving Deep into Rectifiers" — paper He init.
- Cybenko 1989 — universal approximation gốc cho sigmoid.
- Goodfellow, Bengio, Courville — *Deep Learning* (sách MIT Press), chương 6.

## Bài tiếp theo

[Lesson 05 — Text vectorization cổ điển](../lesson-05-text-vectorization/): one-hot, BoW, TF-IDF — chuẩn bị cho word embedding (Lesson 06).
`;
