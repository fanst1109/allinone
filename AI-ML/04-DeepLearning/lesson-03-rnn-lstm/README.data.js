// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/04-DeepLearning/lesson-03-rnn-lstm/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson T4-L03 — RNN / LSTM

> "MLP và CNN xử lý input có kích thước cố định — một ảnh, một vector. Nhưng câu 'Tôi yêu mèo' có 3 từ, 'The quick brown fox jumps over the lazy dog' có 9 từ. RNN là câu trả lời đầu tiên: xử lý input **có độ dài tùy ý**, duy trì **trạng thái ẩn** qua thời gian. LSTM giải quyết vấn đề chết người của RNN: **gradient vanishing** khiến mạng quên mọi thứ từ 10+ bước trước."

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Viết công thức RNN cơ bản $h_t = \\tanh(W_h \\cdot h_{t-1} + W_x \\cdot x_t + b)$ và giải thích từng thành phần.
2. Vẽ RNN "unrolled" qua T time steps và chỉ ra đường đi của gradient khi backpropagation through time (BPTT).
3. Chứng minh bằng số tại sao gradient **vanish** sau 50 bước với tanh — và tại sao **explode** cũng có thể xảy ra.
4. Giải thích 4 gates của LSTM ($f_t$, $i_t$, $o_t$, $\\tilde{c}_t$) — **mỗi gate làm gì**, không chỉ viết công thức.
5. Trace tay qua 1 LSTM cell với input cụ thể: tính $f_t$, $i_t$, $\\tilde{c}_t$, $c_t$, $o_t$, $h_t$.
6. So sánh LSTM với GRU — GRU đơn giản hơn ở chỗ nào, khi nào nên dùng GRU.
7. Phác họa kiến trúc **seq2seq**: encoder → context vector → decoder — nền tảng của machine translation trước Transformer.

## Kiến thức tiền đề

- [T4-L01 — Neural network](../lesson-01-neural-network/): backprop, chain rule, vanishing gradient trong MLP. RNN chỉ là MLP cuộn theo thời gian.
- [T4-L02 — CNN](../lesson-02-cnn/): hiểu skip connection ResNet giúp gradient truyền thẳng → LSTM cell state làm điều tương tự theo chiều thời gian.
- [Tầng 3 — Calculus, chain rule](../../03-Calculus/lesson-04-chain-rule/): BPTT = chain rule nhân liên tiếp qua T steps.

---

## 1. RNN — Recurrent Neural Network

### 1.1. Vấn đề: xử lý sequence

Cho input là chuỗi $x_1, x_2, \\ldots, x_T$ (ví dụ: từng từ trong câu). MLP thông thường cần biết trước T để thiết kế kiến trúc. Cách khác: dùng **1 hidden state** duy nhất và cập nhật nó qua từng bước.

> **💡 Trực giác**
> Hãy nghĩ đến cách bạn đọc câu "Tôi **không** thích điều đó". Khi đọc đến "điều đó", bộ nhớ ngắn hạn của bạn đã tích lũy ngữ cảnh: "có từ 'không' trước đó". RNN mô phỏng điều này bằng hidden state $h_t$ — bộ nhớ ngắn hạn của mạng.

### 1.2. Công thức RNN

\`\`\`
h_t = tanh(W_h · h_{t-1} + W_x · x_t + b_h)
y_t = W_y · h_t + b_y
\`\`\`

**Ký hiệu**:
- $x_t \\in \\mathbb{R}^d$: input tại time step t (ví dụ: word embedding 300 chiều)
- $h_t \\in \\mathbb{R}^H$: hidden state tại bước t (H là hidden size, ví dụ 128)
- $h_0 = 0$ (thường): khởi tạo bằng vector 0
- $W_x \\in \\mathbb{R}^{H \\times d}$: weight cho input
- $W_h \\in \\mathbb{R}^{H \\times H}$: weight cho hidden state (recurrent weight)
- $b_h \\in \\mathbb{R}^H$: bias
- $y_t$: output tại bước t (có thể chỉ dùng $h_T$ cuối cùng cho classification)

**Điều đặc biệt**: $W_x$, $W_h$, $b_h$ **dùng lại** ở mọi time step (weight sharing theo thời gian) — giống như CNN chia sẻ filter ở mọi vị trí không gian.

### 1.3. Walk-through: RNN unroll 5 steps

**Setup**: d=2, H=3, input sequence $x = [[1,0],[0,1],[1,1],[0,0],[1,-1]]$

Dùng W_x, W_h đơn giản để tính tay (ma trận thật dùng random init):

\`\`\`
W_x (H×d, 3×2) = [[0.1, 0.2],
                   [0.3, 0.4],
                   [0.5, 0.6]]

W_h (H×H, 3×3) = [[0.1, 0.0, 0.0],
                   [0.0, 0.1, 0.0],
                   [0.0, 0.0, 0.1]]   (identity-ish để dễ trace)

b_h = [0, 0, 0]
h_0 = [0, 0, 0]
\`\`\`

**Bước 1** (t=1, x_1=[1,0]):
\`\`\`
z_1 = W_x·x_1 + W_h·h_0 + b
    = [0.1×1+0.2×0, 0.3×1+0.4×0, 0.5×1+0.6×0] + [0,0,0]
    = [0.1, 0.3, 0.5]
h_1 = tanh([0.1, 0.3, 0.5]) = [0.100, 0.291, 0.462]
\`\`\`

**Bước 2** (t=2, x_2=[0,1]):
\`\`\`
z_2 = W_x·[0,1] + W_h·h_1
    = [0.2, 0.4, 0.6] + [0.010, 0.029, 0.046]
    = [0.210, 0.429, 0.646]
h_2 = tanh([0.210, 0.429, 0.646]) = [0.207, 0.404, 0.570]
\`\`\`

**Nhận xét**: $h_2$ có "nhớ" thông tin từ $x_1$ (qua $h_1$ được cộng vào). Càng nhiều bước, ảnh hưởng của $x_1$ càng nhỏ dần → **vanishing memory**.

> **❓ Câu hỏi tự nhiên**
> **Q: Tại sao dùng tanh mà không phải ReLU cho RNN?**
> A: tanh có output trong (-1,1) — giúp hidden state không "nổ" sau nhiều bước nhân liên tiếp. ReLU có thể làm h_t tăng vô hạn (exploding). Tuy nhiên, tanh lại gây vanishing gradient khi |input| lớn (gradient tanh → 0 ở đuôi). Đây là trade-off.
>
> **Q: output y_t dùng khi nào?**
> A: Tùy task: (1) Many-to-one (classification): chỉ dùng $h_T$. (2) Many-to-many (translation): dùng mọi $y_t$. (3) One-to-many (image captioning): x chỉ là 1 vector ảnh.

---

## 2. Vanishing Gradient Problem

### 2.1. Backpropagation Through Time (BPTT)

Gradient của loss L theo hidden state $h_0$:
\`\`\`
∂L/∂h_0 = (∂L/∂h_T) × Π_{t=1}^{T} (∂h_t/∂h_{t-1})
\`\`\`

Mỗi Jacobian $\\partial h_t / \\partial h_{t-1} = \\text{diag}(1 - \\tanh^2(z_t)) \\times W_h$.

Nếu $\\|W_h\\| < 1$ và tanh gradient < 1: tích sau T bước → **exponentially small**.

### 2.2. Tính số cụ thể

Giả sử mỗi bước gradient nhân với factor **ρ** (spectral norm của Jacobian):

| T (số bước) | ρ = 0.95 | ρ = 0.90 | ρ = 0.80 |
|-------------|---------|---------|---------|
| 10 | 0.599 | 0.349 | 0.107 |
| 20 | 0.358 | 0.122 | 0.012 |
| 30 | 0.215 | 0.042 | 0.001 |
| 50 | 0.077 | 0.005 | 1.4×10⁻⁵ |
| 100 | 0.006 | 2.7×10⁻⁵ | 2.0×10⁻¹⁰ |

> **⚠ Lỗi thường gặp**
> Nhiều người nhầm vanishing gradient là lỗi của activation function. Thực ra với RNN, ngay cả khi activation là ReLU, **recurrent weight matrix $W_h$** mới là nguyên nhân chính: nếu singular value nhỏ hơn 1, gradient vanish; lớn hơn 1, gradient explode. Không có activation nào "cứu" được chuyện này một cách tổng quát.

> **💡 Hậu quả thực tế**
> RNN "quên" thông tin từ hơn 10-20 bước trước. Ví dụ: trong câu "The **cat** that ate all the fish and slept all day **was** lazy" — khi đến "was", RNN đã không còn nhớ "cat" là số ít, nên không thể conjugate đúng. LSTM sinh ra để giải quyết chính xác vấn đề này.

---

## 3. LSTM — Long Short-Term Memory

### 3.1. Ý tưởng cốt lõi

**Hochreiter & Schmidhuber (1997)** nhận ra: cần một **cell state** $c_t$ hoạt động như "highway" — thông tin có thể đi qua nhiều bước mà không bị nhân liên tiếp với weight matrix.

Cập nhật $c_t$: **cộng** (additive), không **nhân**:
\`\`\`
c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t
\`\`\`

Gradient của $c_t$ theo $c_{t-1}$ = $f_t$ (forget gate values). Vì $f_t \\approx 1$ (gate mở), gradient **không giảm** qua nhiều bước.

> **💡 Analogy tuyệt vời**
> $c_t$ giống như **conveyor belt** trong nhà máy — băng chuyền chạy thẳng, không bị biến đổi. Các gate là "cánh tay robot" bên cạnh: forget gate quyết định bỏ thông tin nào, input gate thêm thông tin gì mới.

### 3.2. Bốn gate LSTM

**Input nhận vào**: $[h_{t-1}, x_t]$ — nối 2 vector lại thành 1.

\`\`\`
Forget gate:  f_t = σ(W_f · [h_{t-1}, x_t] + b_f)
Input gate:   i_t = σ(W_i · [h_{t-1}, x_t] + b_i)
Candidate:    c̃_t = tanh(W_c · [h_{t-1}, x_t] + b_c)
Output gate:  o_t = σ(W_o · [h_{t-1}, x_t] + b_o)
\`\`\`

**Cập nhật state**:
\`\`\`
c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t
h_t = o_t ⊙ tanh(c_t)
\`\`\`

**Giải thích từng gate**:

| Gate | Công dụng | Giá trị |
|------|-----------|---------|
| **Forget $f_t$** | Quên bao nhiêu % từ cell state cũ | $\\sigma \\in (0,1)$: 0=xóa hết, 1=giữ hết |
| **Input $i_t$** | Lưu bao nhiêu % thông tin mới | $\\sigma \\in (0,1)$: 0=bỏ qua, 1=lưu hết |
| **Candidate $\\tilde{c}_t$** | Thông tin mới "ứng viên" (chưa lọc) | $\\tanh \\in (-1,1)$ |
| **Output $o_t$** | Phần nào của cell state đưa ra $h_t$ | $\\sigma \\in (0,1)$ |

> **❓ Tại sao forget gate dùng σ, candidate dùng tanh?**
> Gate ($f, i, o$) cần giá trị trong $[0,1]$ để hoạt động như "van" (0=đóng, 1=mở) → sigmoid. Candidate $\\tilde{c}_t$ cần có dấu (+/-) để bổ sung/xóa thông tin → tanh. Cell state $c_t$ lấy weighted sum của 2 thứ nên cũng có thể âm/dương.

### 3.3. Walk-through tay: 1 LSTM cell

**Thiết lập**: giả sử H=2 (2 hidden units để tính tay), d=2.

Input: $x_t = [0,5,\\ -0,3]$, $h_{t-1} = [0,2,\\ 0,1]$, $c_{t-1} = [0,3,\\ -0,1]$.

Để đơn giản, dùng ma trận đồng nhất + offset nhỏ cho các gate:
\`\`\`
concat = [h_{t-1}, x_t] = [0.2, 0.1, 0.5, -0.3]  (4D)
\`\`\`

Giả sử các pre-activation (W·concat + b) đã tính sẵn:
\`\`\`
pre_f = [1.0, 0.8]   → f_t = σ(1.0, 0.8) = [0.731, 0.690]
pre_i = [0.5, -0.5]  → i_t = σ(0.5, -0.5) = [0.622, 0.378]
pre_c = [0.3, 0.7]   → c̃_t = tanh(0.3, 0.7) = [0.291, 0.604]
pre_o = [0.9, 0.4]   → o_t = σ(0.9, 0.4) = [0.711, 0.599]
\`\`\`

**Bước 1 — Cell state mới**:
\`\`\`
c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t
    = [0.731×0.3, 0.690×(-0.1)] + [0.622×0.291, 0.378×0.604]
    = [0.219, -0.069] + [0.181, 0.228]
    = [0.400, 0.159]
\`\`\`

**Bước 2 — Hidden state mới**:
\`\`\`
h_t = o_t ⊙ tanh(c_t)
    = [0.711, 0.599] ⊙ tanh([0.400, 0.159])
    = [0.711, 0.599] ⊙ [0.380, 0.158]
    = [0.270, 0.095]
\`\`\`

> **🔁 Kiểm tra gradient flow**
> $\\partial c_t / \\partial c_{t-1} = f_t = [0,731,\\ 0,690]$. Vì gần 1, gradient truyền ngược qua cell state gần như không mất. So với RNN thông thường: mỗi bước nhân thêm 1 ma trận $\\times \\tanh'$ → nhanh chóng về 0.
>
> <details><summary>Tại sao cell state gradient không vanish?</summary>
> $c_t = f_t \\odot c_{t-1} + \\ldots$ → $\\partial c_t / \\partial c_{t-1} = \\text{diag}(f_t)$. Miễn $f_t \\approx 1$ (cổng quên mở), hạng này gần $I$. Không có nhân thêm $W_h$ như RNN thuần túy.
> </details>

---

## 4. GRU — Gated Recurrent Unit

**Cho 2014** đề xuất GRU như phiên bản đơn giản hơn LSTM với chỉ **2 gates**:

\`\`\`
Reset gate:   r_t = σ(W_r · [h_{t-1}, x_t])
Update gate:  z_t = σ(W_z · [h_{t-1}, x_t])
Candidate:    h̃_t = tanh(W · [r_t ⊙ h_{t-1}, x_t])
Output:       h_t = (1 − z_t) ⊙ h_{t-1} + z_t ⊙ h̃_t
\`\`\`

**Khác biệt so với LSTM**:
| | LSTM | GRU |
|-|------|-----|
| Gates | 3 (f, i, o) | 2 (r, z) |
| States | $c_t + h_t$ | $h_t$ |
| Tham số | $4H(H+d+1)$ | $3H(H+d+1)$ |
| Hiệu năng | Tốt cho long sequences | Nhanh hơn, tốt trên short-medium |

> **💡 Khi nào dùng GRU?**
> Dataset nhỏ, cần train nhanh, hoặc sequence ngắn (< 100 bước) → GRU thường đủ tốt. Long-range dependency quan trọng → LSTM. Trên thực tế, thường thử cả 2 và chọn theo validation loss.

---

## 5. Sequence-to-Sequence (Seq2Seq)

### 5.1. Kiến trúc encoder-decoder

**Encoder RNN**: đọc toàn bộ input sequence $x_1, \\ldots, x_T$ và tóm lại vào **context vector** $c = h_T$ (hidden state cuối).

**Decoder RNN**: nhận context vector $c$ làm $h_0$, sinh output sequence từng bước:
\`\`\`
h'_1 = RNN(c, y_0)     # y_0 = <START> token
y_1  = softmax(W_y · h'_1)
h'_2 = RNN(h'_1, y_1)
y_2  = softmax(W_y · h'_2)
...
\`\`\`
Dừng khi sinh ra \`<END>\` token.

### 5.2. Ví dụ: "I love cats" → "Tôi yêu mèo"

\`\`\`
Encoder:
  x_1 = embed("I")       → h_1
  x_2 = embed("love")    → h_2
  x_3 = embed("cats")    → h_3 = context c

Decoder:
  Input: c, token <START>
  h'_1 = RNN(c, embed("<START>")) → predict "Tôi"
  h'_2 = RNN(h'_1, embed("Tôi")) → predict "yêu"
  h'_3 = RNN(h'_2, embed("yêu")) → predict "mèo"
  h'_4 = RNN(h'_3, embed("mèo")) → predict "<END>"
\`\`\`

### 5.3. Hạn chế: bottleneck

Toàn bộ thông tin câu nguồn phải đi qua **1 vector c** có chiều cố định (ví dụ 512 float). Câu dài 100 từ → context vector bị "nén" quá mức → quality giảm.

**Giải pháp**: Attention mechanism — decoder nhìn trực tiếp vào **mọi hidden state** của encoder, không chỉ $h_T$. Đây là tiền thân trực tiếp của Transformer (bài T4-L04).

> **❓ Câu hỏi tự nhiên**
> **Q: Sao không dùng hết sequence output của encoder (không chỉ h_T)?**
> A: Đây chính xác là Attention! Seq2seq gốc (2014) chỉ dùng $h_T$ vì đơn giản. Attention (2015) cho decoder "nhìn" vào $[h_1, \\ldots, h_T]$ có trọng số.

---

## 6. Bài tập

**Bài 1**: RNN với H=2, d=2. Cho $W_x = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$, $W_h = \\begin{bmatrix} 0,5 & 0 \\\\ 0 & 0,5 \\end{bmatrix}$, $b=0$, $h_0=[0, 0]$.
- (a) Tính $h_1$ với $x_1 = [0,6,\\ 0,8]$.
- (b) Tính $h_2$ với $x_2 = [-0,3,\\ 0,5]$.

**Bài 2**: Vanishing gradient. RNN 60 bước, mỗi Jacobian có spectral norm ρ = 0.92.
- (a) |gradient| tại input layer = bao nhiêu?
- (b) Cần ρ = ? để sau 60 bước gradient ≥ 0.1?

**Bài 3**: LSTM forget gate. Nếu $f_t = [0,0,\\ 0,0]$ (forget gate đóng hoàn toàn) và $i_t = [1,0,\\ 1,0]$, $\\tilde{c}_t = [0,5,\\ -0,3]$, $c_{t-1} = [100,\\ -200]$: tính $c_t$. Giải thích ý nghĩa.

**Bài 4**: Seq2seq. Input "good morning" → encoder → context vector. Decoder cần sinh "buenos días" (tiếng Tây Ban Nha). Viết pseudocode 5 bước (không cần số cụ thể) mô tả quá trình decoder.

---

## 7. Lời giải chi tiết

### Bài 1

**(a)** $h_1 = \\tanh(W_x \\cdot x_1 + W_h \\cdot h_0 + b)$

\`\`\`
W_x·x_1 = [[1,0],[0,1]]·[0.6,0.8] = [0.6, 0.8]
W_h·h_0 = [[0.5,0],[0,0.5]]·[0,0] = [0, 0]
z_1 = [0.6, 0.8]
h_1 = tanh([0.6, 0.8]) = [0.537, 0.664]
\`\`\`

**(b)** $h_2 = \\tanh(W_x \\cdot x_2 + W_h \\cdot h_1)$

\`\`\`
W_x·x_2 = [[-0.3], [0.5]] = [-0.3, 0.5]  (identity mapping)
W_h·h_1 = [[0.5,0],[0,0.5]]·[0.537, 0.664] = [0.269, 0.332]
z_2 = [-0.3+0.269, 0.5+0.332] = [-0.031, 0.832]
h_2 = tanh([-0.031, 0.832]) = [-0.031, 0.682]
\`\`\`

### Bài 2

**(a)** $|\\text{grad}| = \\rho^{60} = 0,92^{60}$

\`\`\`
0.92^60 = e^(60 × ln(0.92)) = e^(60 × (-0.0834)) = e^(-5.005) ≈ 0.0067
\`\`\`

Gradient chỉ còn ~0.67% so với ban đầu.

**(b)** Cần $\\rho^{60} \\geq 0,1$:
\`\`\`
ρ^60 = 0.1
ρ = 0.1^(1/60) = 10^(-1/60) = 10^(-0.01667) ≈ 0.9624
\`\`\`

Vậy $\\rho \\geq 0,9624$ — rất khó đảm bảo trong training thực tế.

### Bài 3

\`\`\`
c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t
    = [0,0] ⊙ [100,-200] + [1,1] ⊙ [0.5,-0.3]
    = [0,0] + [0.5,-0.3]
    = [0.5, -0.3]
\`\`\`

**Ý nghĩa**: Forget gate = 0 → **xóa hoàn toàn** cell state cũ dù nó có giá trị rất lớn (100, -200). Input gate = 1 → **ghi hoàn toàn** candidate mới. LSTM đã "forget" toàn bộ lịch sử và bắt đầu từ đầu. Đây là cơ chế xử lý "ranh giới câu" — khi gặp dấu chấm, forget gate học cách reset.

### Bài 4

\`\`\`python
# Pseudocode decoder seq2seq
c = encoder(["good", "morning"])  # context vector
h = c                              # khởi tạo decoder hidden state
token = "<START>"
output = []

for step in range(MAX_LEN):
    h = lstm_cell(h, embed(token))
    probs = softmax(W_out @ h)
    token = argmax(probs)          # greedy decoding (hoặc beam search)
    if token == "<END>": break
    output.append(token)

# output = ["buenos", "días"]
\`\`\`

**5 bước chính**:
1. Encoder đọc "good morning" → context $c$.
2. Decoder khởi tạo $h_0 = c$.
3. Bước 1: input \`<START>\` → $h_1$ → predict "buenos".
4. Bước 2: input "buenos" → $h_2$ → predict "días".
5. Bước 3: input "días" → $h_3$ → predict \`<END>\` → dừng.

---

## 8. Code & Minh họa

[visualization.html](./visualization.html) — RNN unroll animation, vanishing gradient chart, LSTM gate visualizer, seq2seq demo.

---

## 9. Bài tiếp theo

[T4-L04 — Transformer & Attention](../lesson-04-transformer-attention/) — giải quyết bottleneck của seq2seq và sequential processing của RNN bằng self-attention O(1) parallel.

📝 **Tóm tắt bài này**:
- RNN: $h_t = \\tanh(W_h \\cdot h_{t-1} + W_x \\cdot x_t + b)$ — xử lý sequence bằng hidden state tích lũy.
- Vanishing gradient: product của T Jacobians → gradient $\\sim \\rho^T \\to 0$ với $\\rho < 1$.
- LSTM: cell state $c_t$ với additive update → gradient highway, giải quyết vanishing.
- 4 gates: forget (ghi đè bao nhiêu từ quá khứ), input (thêm bao nhiêu mới), candidate (mới là gì), output (đưa ra bao nhiêu).
- GRU: 2 gates, ít tham số hơn, hiệu năng tương đương nhiều task.
- Seq2seq: encoder → context → decoder, nhưng bottleneck 1 vector → cần Attention.
`;
