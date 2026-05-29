// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/04-DeepLearning/lesson-04-transformer-attention/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson T4-L04 — Transformer & Attention

> "RNN xử lý sequence từng bước — bước t phải chờ bước t-1. Với câu 1000 từ thì đó là 1000 bước tuần tự. Transformer vứt bỏ recurrence hoàn toàn: mọi từ nói chuyện với mọi từ khác **cùng lúc** (O(1) thay vì O(n)), và câu hỏi 'từ này liên quan đến từ nào?' được trả lời bằng **dot-product attention** — 3 ma trận Q, K, V và 1 phép softmax. BERT, GPT, T5, CLIP, Stable Diffusion đều là Transformer. Hiểu bài này = hiểu nền tảng của mọi AI hiện đại."

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Giải thích **self-attention** là gì bằng câu nói đơn giản (không phải công thức), rồi viết được công thức \`Attention(Q,K,V) = softmax(QKᵀ/√d_k)V\` và chứng minh output shape = input shape.
2. Tính tay attention weights cho câu 3 tokens với Q, K cụ thể — verify softmax row-sum = 1.
3. Giải thích **tại sao chia cho √d_k** — thực ra không phải convention mà là necessity.
4. Mô tả **multi-head attention**: h heads làm gì, concat xong shape trông như thế nào, tại sao nhiều head tốt hơn 1 head.
5. Viết công thức và ý nghĩa **positional encoding** sinusoidal — tại sao không thể bỏ.
6. Phác họa kiến trúc Transformer encoder và decoder — phân biệt masked self-attention và cross-attention.
7. So sánh complexity: RNN O(n) sequential vs Transformer O(n²) memory nhưng O(1) depth parallelism.

## Kiến thức tiền đề

- [T4-L03 — RNN/LSTM](../lesson-03-rnn-lstm/): seq2seq, bottleneck context vector — Attention giải quyết chính xác vấn đề này.
- [Tầng 4 — Ma trận & softmax](../../04-LinearAlgebra/lesson-05-matrices/): nhân ma trận, softmax là normalize exp. Attention = nhân ma trận + softmax.
- [Tầng 5 — Probability, Entropy](../../05-Probability/): softmax = phân phối xác suất trên tokens.

---

## 1. Vấn đề: RNN không song song được

Với input sequence dài n từ:
- **RNN**: phải xử lý tuần tự, bước t chờ bước t-1 → **O(n) thời gian** (không parallel được)
- **Gradient path**: thông tin từ token 1 đến token n phải đi qua n-1 hidden states → vanishing
- **Bottleneck**: toàn bộ câu nguồn nén vào 1 vector c

> **💡 Trực giác tuyệt vời**
> Hãy nghĩ cách bạn đọc câu "The **animal** didn't cross the street because **it** was too tired." — bạn biết ngay "it" = "animal" (không phải "street"). Bạn không đọc tuần tự rồi "nhớ" — bạn nhìn toàn bộ câu cùng lúc và "chú ý" đến từ liên quan. Transformer mô phỏng chính xác điều này.

---

## 2. Self-Attention — Cơ chế cốt lõi

### 2.1. Ý tưởng

Cho mỗi token trong sequence, ta muốn biết: **từ nào khác trong câu liên quan nhất đến từ này?**

**Cơ chế**: mỗi token sinh 3 vector:
- **Query (Q)**: "Tôi đang tìm kiếm gì?"
- **Key (K)**: "Tôi có thể cung cấp thông tin gì?"
- **Value (V)**: "Nội dung thực sự của tôi là gì?"

Attention weight giữa token i và token j = \`Q_i · K_j\` (dot product). Token i "chú ý" nhiều đến j nếu query của i khớp với key của j.

### 2.2. Công thức

Input: \`X ∈ R^{n×d}\` — ma trận n token, mỗi token d chiều.

\`\`\`
Q = X W_Q,   W_Q ∈ R^{d×d_k}
K = X W_K,   W_K ∈ R^{d×d_k}
V = X W_V,   W_V ∈ R^{d×d_v}

Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V
\`\`\`

Output: \`n × d_v\` — cùng n tokens, mỗi token d_v chiều.

**Tại sao chia √d_k?**

Dot product \`Q_i · K_j = Σ q_a k_a\`. Nếu q và k là random, mỗi hạng có mean=0, var=1. Tổng d_k hạng → variance = d_k → std = √d_k. Khi d_k lớn (ví dụ 64), dot product có thể lên đến magnitude ~64 → softmax nhận input cực lớn → softmax bão hòa → gradient ≈ 0.

**Chia √d_k** để normalize về std ≈ 1 trước khi softmax → gradient không mất.

> **⚠ Lỗi thường gặp**
> Nhầm rằng √d_k là một hyperparameter có thể tune. Không — nó là kết quả từ phân tích phương sai, giống như weight initialization trong Xavier. Không cần tune.

### 2.3. Walk-through tay — câu 3 tokens

Câu: **"the cat sat"** → 3 tokens, mỗi token embedding d=4.

Giả sử **Q, K** (sau projection W_Q, W_K) như sau:

\`\`\`
Q = [[ 1,  0,  1,  0],   # "the"
     [ 0,  1,  0,  1],   # "cat"
     [ 1,  1,  0,  0]]   # "sat"

K = [[ 1,  0,  0,  1],   # "the"
     [ 0,  1,  1,  0],   # "cat"
     [ 1,  0,  1,  0]]   # "sat"
\`\`\`

**Bước 1 — Tính QKᵀ** (3×3 ma trận):

QKᵀ[0,0] = Q[0]·K[0] = 1×1+0×0+1×0+0×1 = **1**
QKᵀ[0,1] = Q[0]·K[1] = 1×0+0×1+1×1+0×0 = **1**
QKᵀ[0,2] = Q[0]·K[2] = 1×1+0×0+1×1+0×0 = **2**

QKᵀ[1,0] = Q[1]·K[0] = 0×1+1×0+0×0+1×1 = **1**
QKᵀ[1,1] = Q[1]·K[1] = 0×0+1×1+0×1+1×0 = **1**
QKᵀ[1,2] = Q[1]·K[2] = 0×1+1×0+0×1+1×0 = **0**

QKᵀ[2,0] = Q[2]·K[0] = 1×1+1×0+0×0+0×1 = **1**
QKᵀ[2,1] = Q[2]·K[1] = 1×0+1×1+0×1+0×0 = **1**
QKᵀ[2,2] = Q[2]·K[2] = 1×1+1×0+0×1+0×0 = **1**

\`\`\`
QKᵀ = [[1, 1, 2],
        [1, 1, 0],
        [1, 1, 1]]
\`\`\`

**Bước 2 — Chia √d_k**: d_k = 4, √4 = 2.

\`\`\`
QKᵀ / √d_k = [[0.5, 0.5, 1.0],
               [0.5, 0.5, 0.0],
               [0.5, 0.5, 0.5]]
\`\`\`

**Bước 3 — Softmax theo từng hàng**:

Hàng 0 \`[0.5, 0.5, 1.0]\`:
exp: \`[e^0.5, e^0.5, e^1.0] = [1.649, 1.649, 2.718]\`, tổng = 6.016
→ \`[0.274, 0.274, 0.452]\`  ✓ (tổng = 1)

Hàng 1 \`[0.5, 0.5, 0.0]\`:
exp: \`[1.649, 1.649, 1.0]\`, tổng = 4.298
→ \`[0.384, 0.384, 0.233]\`  ✓

Hàng 2 \`[0.5, 0.5, 0.5]\`:
exp: \`[1.649, 1.649, 1.649]\`, tổng = 4.947
→ \`[0.333, 0.333, 0.333]\`  ✓

\`\`\`
A = softmax(QKᵀ/√d_k) =
    [[0.274, 0.274, 0.452],   # "the" chú ý nhất đến "sat"
     [0.384, 0.384, 0.233],   # "cat" chú ý đều "the" và "cat"
     [0.333, 0.333, 0.333]]   # "sat" chú ý đều cả 3
\`\`\`

**Bước 4 — Nhân với V**:

Giả sử V = Q (để đơn giản). Output[0] = 0.274×Q[0] + 0.274×Q[1] + 0.452×Q[2]:
\`\`\`
= 0.274×[1,0,1,0] + 0.274×[0,1,0,1] + 0.452×[1,1,0,0]
= [0.274,0,0.274,0] + [0,0.274,0,0.274] + [0.452,0.452,0,0]
= [0.726, 0.726, 0.274, 0.274]
\`\`\`

> **🔁 Tự kiểm tra**
> Output có shape gì? n×d_v = 3×4. Kiểm tra A có shape 3×3 ✓, V có shape 3×4 ✓, A·V = 3×4 ✓.
> <details><summary>Tại sao softmax theo hàng (không phải theo cột)?</summary>
> Mỗi hàng i của A = "token i phân bổ bao nhiêu chú ý cho mỗi token j". Tổng attention trên mọi j = 1 → phân phối xác suất. Softmax theo cột sẽ không có ý nghĩa.
> </details>

---

## 3. Multi-Head Attention

### 3.1. Tại sao cần nhiều head?

Trong câu "I saw the man with the telescope", từ "saw" vừa liên quan đến "I" (chủ thể) vừa liên quan đến "man" (tân ngữ) vừa liên quan đến "telescope" (phương tiện). **1 head** chỉ học được 1 pattern. **h heads** học h patterns khác nhau — mỗi head có thể capture loại relationship khác nhau.

### 3.2. Công thức

\`\`\`
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) · W_O

head_i = Attention(X W_Q_i, X W_K_i, X W_V_i)
\`\`\`

Trong paper gốc (Vaswani 2017): \`h=8\`, \`d_model=512\`, \`d_k = d_v = d_model/h = 64\`.

**Tham số**:
- Mỗi head: W_Q_i, W_K_i, W_V_i ∈ R^{512×64} → 3×512×64 = 98.304 per head × 8 = 786.432
- Output projection W_O ∈ R^{512×512} = 262.144
- Tổng 1 multi-head attention: ~1.05M tham số

**Shape trace**:
1. X: n×512
2. Q_i, K_i, V_i: n×64 (sau projection)
3. head_i: n×64
4. Concat: n×(64×8) = n×512
5. × W_O: n×512 ✓ (same shape as input)

> **❓ Câu hỏi tự nhiên**
> **Q: 8 heads với d_k=64 có cùng tham số với 1 head d_k=512 không?**
> A: Tham số tương đương, nhưng 8 heads có **8 lần softmax** → 8 different attention distributions → biểu diễn phong phú hơn nhiều. Empirically, multi-head luôn tốt hơn single head cùng số tham số.
>
> **Q: Các head có thể học được gì?**
> A: Nghiên cứu interpretability cho thấy: head học syntactic dependency (chủ-vị), head học coreference (nó → antecedent), head học positional (i→i+1 hoặc i→i-1), head học semantic similarity.

---

## 4. Positional Encoding

### 4.1. Vấn đề: self-attention permutation-invariant

Nếu hoán vị các từ trong câu, attention weight thay đổi nhưng output mỗi từ không biết vị trí của nó. "Cat sat mat" và "mat cat sat" → cùng output (chỉ khác thứ tự). Thực ra **thứ tự quan trọng**!

### 4.2. Sinusoidal Positional Encoding

\`\`\`
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
\`\`\`

**Input thực**: \`X' = X_embed + PE\` — cộng PE vào embedding.

**Tại sao sinusoidal?** Có thể biểu diễn vị trí tương đối: \`PE(pos+k)\` là linear function của \`PE(pos)\` → model có thể học "token j cách token i bao nhiêu vị trí" từ dot product của PE.

**Ví dụ tính PE cho pos=0,1,2, d=4**:

\`d_model=4\`: i=0 → 10000^0=1; i=1 → 10000^0.5 ≈ 100.

| pos | PE[0] = sin(pos/1) | PE[1] = cos(pos/1) | PE[2] = sin(pos/100) | PE[3] = cos(pos/100) |
|-----|-----|-----|-----|-----|
| 0 | sin(0)=0 | cos(0)=1 | sin(0)=0 | cos(0)=1 |
| 1 | sin(1)=0.841 | cos(1)=0.540 | sin(0.01)=0.010 | cos(0.01)=1.000 |
| 2 | sin(2)=0.909 | cos(2)=-0.416 | sin(0.02)=0.020 | cos(0.02)=1.000 |
| 3 | sin(3)=0.141 | cos(3)=-0.990 | sin(0.03)=0.030 | cos(0.03)=1.000 |

Các chiều thấp (i=0) oscillate nhanh → capture vị trí gần; chiều cao (i large) oscillate chậm → capture vị trí xa.

> **⚠ Lỗi thường gặp**
> Nhiều implementation nhầm \`10000^(2i/d)\` = \`exp(2i/d × log(10000))\`. Cẩn thận với integer overflow khi i, d lớn — luôn dùng float64.

---

## 5. Transformer Architecture

### 5.1. Encoder

Mỗi encoder layer gồm **2 sub-layers**:
1. **Multi-Head Self-Attention** — mọi token nhìn mọi token
2. **Feed-Forward Network (FFN)** — áp dụng độc lập cho từng token: \`FFN(x) = max(0, xW_1+b_1)W_2+b_2\`

Mỗi sub-layer có **Residual connection** và **Layer Normalization**:
\`\`\`
Output = LayerNorm(x + SubLayer(x))
\`\`\`

Paper gốc: **6 encoder layers**, d_model=512, FFN d_ff=2048, h=8 heads.

### 5.2. Decoder

Mỗi decoder layer gồm **3 sub-layers**:
1. **Masked Self-Attention** — token t chỉ nhìn token 1..t (causal masking), không nhìn tương lai
2. **Cross-Attention** — Q từ decoder, K,V từ encoder output
3. **FFN** — như encoder

**Causal masking** quan trọng: khi train, decoder nhận toàn bộ target sequence nhưng mask upper triangle của attention matrix → không "cheat" bằng cách nhìn token tương lai.

### 5.3. Tổng quan Architecture

\`\`\`
Input Tokens → Embedding + Positional Encoding
                    ↓
             [Encoder × 6]
              ┌─────────────────┐
              │ Multi-Head Attn │ ← tất cả tokens nhìn nhau
              │ + Residual + LN │
              │ FFN             │
              │ + Residual + LN │
              └─────────────────┘
                    ↓ encoder output
             [Decoder × 6]
              ┌──────────────────────────┐
              │ Masked Self-Attn + R+LN  │ ← chỉ nhìn quá khứ
              │ Cross-Attn (K,V=encoder) │ ← kết nối encoder
              │ + Residual + LN          │
              │ FFN + Residual + LN      │
              └──────────────────────────┘
                    ↓
             Linear + Softmax → Output Probabilities
\`\`\`

---

## 6. Tại sao Transformer thống trị?

### 6.1. So sánh với RNN

| Thuộc tính | RNN/LSTM | Transformer |
|-----------|----------|-------------|
| **Parallel trong training** | Không (sequential) | Có (O(1) depth) |
| **Long-range dependency** | Khó (gradient vanish) | Dễ (direct attention) |
| **Memory** | O(n) — chỉ cần h_t | O(n²) — attention matrix |
| **Inference** | Sequential per step | Parallel per step |
| **Scale** | Khó scale deep | Scale rất tốt (GPT-4: ~1.8T params) |

> **❓ O(n²) có phải vấn đề?**
> Với câu 512 tokens: n²=262.144 attention values — OK. Với document 100K tokens (GPT-4): n²=10¹⁰ — không OK. Giải pháp: Flash Attention (tính attention tiết kiệm memory), Sliding Window Attention (Longformer, Mistral), Linear Attention approx.

### 6.2. Foundation model connections

- **BERT**: Encoder-only, masked language model, bi-directional attention
- **GPT**: Decoder-only, causal language model, auto-regressive
- **T5**: Encoder-decoder, text-to-text format
- **CLIP**: Image Encoder (ViT) + Text Encoder (Transformer), contrastive learning
- **Stable Diffusion**: UNet + Cross-attention với text embeddings từ CLIP

Tất cả đều là biến thể của kiến trúc "Attention is All You Need" (Vaswani et al., 2017).

---

## 7. Bài tập

**Bài 1**: Attention matrix. Cho câu 4 tokens với QKᵀ/√d_k:
\`\`\`
S = [[2, 0, 0, 0],
     [1, 2, 0, 0],
     [0, 1, 2, 0],
     [0, 0, 1, 2]]
\`\`\`
Tính softmax theo từng hàng. Token nào "chú ý" nhất đến chính nó?

**Bài 2**: Multi-head. d_model=256, h=4 heads. Tính:
- (a) d_k và d_v của mỗi head.
- (b) Số tham số của 1 multi-head attention layer (gồm W_O).

**Bài 3**: Positional encoding. Tính PE(5, 0), PE(5, 1) với d_model=512. Dùng: 2i=0, 2i+1=1.

**Bài 4**: Transformer vs RNN. Câu dài n=1000 tokens.
- (a) RNN cần bao nhiêu sequential operations để train 1 sample?
- (b) Transformer: attention layer cần bao nhiêu operations? (tính n² float ops)
- (c) Tại sao Transformer vẫn nhanh hơn dù O(n²) vs O(n)?

---

## 8. Lời giải chi tiết

### Bài 1

Softmax hàng i: \`A[i,j] = exp(S[i,j]) / Σ_k exp(S[i,k])\`

**Hàng 0** \`[2,0,0,0]\`: exp = \`[7.389,1,1,1]\`, tổng=10.389 → \`[0.711, 0.096, 0.096, 0.096]\`

**Hàng 1** \`[1,2,0,0]\`: exp = \`[2.718,7.389,1,1]\`, tổng=12.107 → \`[0.224, 0.610, 0.083, 0.083]\`

**Hàng 2** \`[0,1,2,0]\`: exp = \`[1,2.718,7.389,1]\`, tổng=12.107 → \`[0.083, 0.224, 0.610, 0.083]\`

**Hàng 3** \`[0,0,1,2]\`: exp = \`[1,1,2.718,7.389]\`, tổng=12.107 → \`[0.083, 0.083, 0.224, 0.610]\`

Mỗi token chú ý **nhất đến chính nó** (diagonal đều lớn nhất). Lý do: diagonal luôn là giá trị lớn nhất trong ma trận S. Trong thực tế, không phải lúc nào cũng vậy — model học attention pattern phù hợp với task.

### Bài 2

**(a)** d_k = d_v = d_model/h = 256/4 = **64**

**(b)** Tham số:
- Mỗi head: W_Q_i + W_K_i + W_V_i ∈ R^{256×64} → 3 × 256 × 64 = 49.152 per head
- 4 heads: 4 × 49.152 = **196.608**
- Output projection W_O ∈ R^{256×256} = **65.536**
- Tổng: 196.608 + 65.536 = **262.144 tham số** (không tính bias)

### Bài 3

PE(pos=5, 2i=0): \`sin(5 / 10000^0) = sin(5) = -0.959\`

PE(pos=5, 2i+1=1): \`cos(5 / 10000^0) = cos(5) = 0.284\`

(Với 10000^(2i/512) = 10000^(0/512) = 10000^0 = 1 cho i=0)

### Bài 4

**(a)** RNN train 1 sample (câu n=1000 tokens): cần **1000 sequential operations** (mỗi h_t phụ thuộc h_{t-1}). Không parallel được.

**(b)** Transformer attention: QKᵀ — phép nhân n×d × d×n = **n² = 10⁶ ops** per head. Nhưng n² ops này hoàn toàn **parallel** (không có dependency giữa các (i,j)).

**(c)** Tốc độ thực: GPU có hàng nghìn CUDA cores → n² parallel ops chạy gần như cùng lúc. Trong khi RNN 1000 sequential steps không thể parallel → thực tế Transformer **nhanh hơn nhiều lần** trên GPU, dù O(n²) phức tạp hơn O(n) trên lý thuyết sequential machine.

---

## 9. Code & Minh họa

[visualization.html](./visualization.html) — attention heatmap tương tác, multi-head visualizer, positional encoding plot, transformer architecture diagram.

---

## 10. Bài tiếp theo

[T5-L01 — Text vectorization](../../05-NLP-Applied/lesson-01-text-vectorization/) — ứng dụng Transformer: tokenization, word2vec, BERT embeddings, fine-tuning.

📝 **Tóm tắt bài này**:
- Self-attention: \`Attention(Q,K,V) = softmax(QKᵀ/√d_k)V\` — mỗi token nhìn tất cả tokens, trả về context-aware representation.
- Chia √d_k: normalize để softmax không saturate khi d_k lớn.
- Multi-head: h heads capture h loại relationship khác nhau, concat → projection.
- Positional encoding: cộng sinusoidal PE vào embedding để model biết vị trí.
- Transformer = self-attention + FFN + residual + LN, xếp chồng 6 encoder + 6 decoder.
- Foundation của BERT, GPT, T5, CLIP — toàn bộ AI hiện đại.
`;
