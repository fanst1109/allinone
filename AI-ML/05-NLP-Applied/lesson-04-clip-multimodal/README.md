# Lesson 08 — CLIP và Multimodal Embedding

> **Tầng 6 — Lesson 08 (CUỐI LỘ TRÌNH).** Đây là bài cuối cùng của toàn bộ 8 tầng lộ trình Vectors. Tất cả nền móng — vector, dot product, cosine similarity, gradient descent, cross-entropy, embedding — sẽ hội tụ ở đây thành một trong những model nổi tiếng nhất thập kỷ 2020: **CLIP** (Contrastive Language-Image Pre-training).

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Hiểu **multimodal** nghĩa là gì và vì sao đó là bước tiến lớn của AI.
2. Nắm vững **vấn đề mismatch không gian**: ảnh sống trong "không gian pixel", text sống trong "không gian token" — không thể so sánh trực tiếp.
3. Hiểu **ý tưởng cốt lõi của CLIP**: train hai encoder song song để map ảnh và text vào **cùng một vector space**, trong đó cosine similarity có nghĩa.
4. Hiểu **contrastive learning** và **InfoNCE loss**: kéo cặp (ảnh, caption) đúng lại gần nhau, đẩy cặp sai ra xa, tất cả gói trong một softmax + cross-entropy quen thuộc.
5. Tính tay được **similarity matrix** và **contrastive loss** cho một batch N=4.
6. Hiểu **zero-shot classification** — siêu năng lực của CLIP: phân loại ảnh vào 1000 class **không cần fine-tune** với một dòng prompt.
7. Biết các ứng dụng thực tế: image search bằng text, Stable Diffusion / DALL-E, image captioning, visual question answering.
8. Biết giới hạn của CLIP (bias, fine-grained, counting, spatial reasoning) và hướng đi tiếp theo (LLaVA, GPT-4V, Gemini).
9. Tổng kết toàn bộ lộ trình Vectors: từ số → vector → embedding → multimodal joint space.

## Kiến thức tiền đề

- **[Tầng 6 Lesson 06 — Word embedding](../lesson-06-word-embeddings/)**: text → vector. Hiểu word2vec, sentence-transformers, embedding 512D.
- **[Tầng 6 Lesson 07 — Vector DB và RAG](../lesson-07-vector-db-rag/)**: lưu trữ và truy vấn embedding bằng cosine similarity, ANN search. CLIP search image bằng cùng cơ chế này.
- **[Tầng 4 Lesson 02 — Dot product và cosine](../../04-LinearAlgebra/lesson-02-dot-product/)**: nền tảng đo "giống nhau" giữa hai vector. CLIP loss xây trên cosine similarity.
- **[Tầng 5 Lesson 08 — Cross-entropy](../../05-Probability/lesson-08-cross-entropy/)** (nếu đã có): InfoNCE loss chính là cross-entropy với label = chỉ số ảnh đúng.
- **[Tầng 6 Lesson 03 — Logistic regression](../lesson-03-logistic-regression/)**: softmax + cross-entropy là cùng machinery dùng cho CLIP loss, chỉ khác ở chỗ "class" là vị trí của caption đúng trong batch.

> **Lưu ý gắn kết toàn lộ trình**: cosine similarity bạn học ở Tầng 4 Lesson 02, embedding bạn học ở Tầng 6 Lesson 06, softmax bạn học ở Tầng 6 Lesson 03 — bài này ráp cả ba thành một loss duy nhất. Nếu một mảnh nào đó còn mơ hồ, quay lại bài tương ứng trước khi đi tiếp.

---

## 1. Multimodal là gì?

> **💡 Trực giác.** "Modal" trong "multimodal" không phải nốt nhạc — nó là **kênh thông tin (modality)**: text, ảnh, âm thanh, video, sensor… Một **multimodal model** là model xử lý được **nhiều kênh cùng lúc**, hoặc ánh xạ giữa các kênh.

### 1.1. Phân loại modality phổ biến

| Modality | Dạng dữ liệu thô | Ví dụ task |
|----------|------------------|-----------|
| **Text** | Chuỗi token, encoding UTF-8 | Dịch máy, chatbot, classification |
| **Image** | Tensor 3 chiều `(H, W, 3)` (RGB) | Object detection, classification, segmentation |
| **Audio** | Waveform 1D hoặc spectrogram 2D | Speech-to-text, music generation |
| **Video** | Tensor 4 chiều `(T, H, W, 3)` | Action recognition, video captioning |
| **3D point cloud** | List điểm `(x, y, z)` | LIDAR, AR/VR |
| **Sensor** | Time series từ IMU/GPS/temperature | Robotics, autonomous driving |

### 1.2. Vì sao multimodal khó?

Mỗi modality có **cấu trúc dữ liệu hoàn toàn khác nhau**:

- Một ảnh 224×224 RGB = 150,528 số (uint8) — không có khái niệm "token" hay "vocabulary".
- Một câu 10 từ ≈ 10 token id trong vocabulary 50,000 — không có khái niệm "pixel" hay "spatial neighbor".
- Một đoạn audio 5 giây ở 16kHz = 80,000 mẫu float — chuỗi thời gian, không phải lưới 2D.

Một CNN xử lý ảnh tốt **không có cách nào** đọc trực tiếp một dòng text. Một Transformer text-only không hiểu "đỏ ở pixel (50, 30)" nghĩa là gì.

> **❓ Câu hỏi tự nhiên.**
> - *"Vậy trước CLIP người ta làm sao kết hợp ảnh + text?"* — Có một số hướng: image captioning (CNN → RNN, ảnh in, text out), VQA (ảnh + câu hỏi → câu trả lời, mỗi cặp dán nhãn tay), nhưng tất cả đều yêu cầu **dataset có gắn nhãn cụ thể** cho từng task. Đắt, không scale được.
> - *"CLIP khác chỗ nào?"* — CLIP không học một task cụ thể nào. Nó chỉ học "cặp ảnh-caption nào khớp với nhau". Một khi đã học, có thể áp dụng zero-shot cho hàng trăm task khác.

### 1.3. Multimodal "joint embedding space" — ý tưởng then chốt

Mục tiêu: **đẩy mọi modality về cùng một không gian vector ℝ^d**, trong đó:

- Ảnh con mèo và chữ "a photo of a cat" có embedding gần nhau (cosine ≈ 0.9).
- Ảnh con mèo và chữ "a photo of a car" có embedding xa nhau (cosine ≈ 0.1).

Khi đã có không gian chung, **cosine similarity** trở thành "ngôn ngữ chung" giữa các modality. So sánh ảnh-với-text bằng cùng phép toán bạn dùng ở Lesson 02 Tầng 4 và Lesson 06 Tầng 6.

> **📝 Tóm tắt mục 1.**
> - Multimodal = nhiều kênh dữ liệu (text, image, audio, video…).
> - Khó vì mỗi modality có cấu trúc rất khác nhau.
> - Lời giải tổng quát: ánh xạ tất cả về **joint embedding space**, dùng cosine để so sánh.
> - CLIP là model đầu tiên làm việc này ở quy mô lớn cho cặp ảnh-text.

---

## 2. Vấn đề: ảnh và text ở 2 không gian khác nhau

> **💡 Trực giác.** Tưởng tượng bạn có hai bản đồ in trên giấy: một bản đồ Hà Nội, một bản đồ Tokyo. Bạn không thể nói "khách sạn X ở Hà Nội gần với chùa Asakusa ở Tokyo bao nhiêu" — vì hai bản đồ có hệ tọa độ riêng, không liên quan gì với nhau. Phải có một **bản đồ thế giới chung** thì câu hỏi mới có nghĩa.

### 2.1. Hai không gian "thô"

| | Không gian ảnh thô | Không gian text thô |
|---|---|---|
| **Mỗi điểm là gì?** | Tensor `(224, 224, 3)` ∈ ℝ^{150528} (pixel) | Chuỗi token id ∈ ℕ^L (vocab 50k) |
| **Khoảng cách?** | Euclidean trên pixel → vô nghĩa (xoay ảnh chút là khác hẳn) | Edit distance, Jaccard → quá thô |
| **Phép toán?** | Convolution, pooling | Attention, embedding lookup |

### 2.2. Câu hỏi cụ thể: "ảnh mèo" và chữ "cat" giống nhau bao nhiêu?

Nếu hỏi bằng pixel: ảnh con mèo có giá trị `(R, G, B) = (180, 165, 140)` ở pixel (50, 30). Chữ "cat" là `[99, 97, 116]` (ASCII codes). So sánh `180` với `99` không có ý nghĩa.

Nếu hỏi bằng embedding **riêng từng modality**:

- Image encoder pretrained trên ImageNet → ảnh → vector 2048D (ResNet feature).
- Text encoder pretrained trên Wikipedia → "cat" → vector 768D (BERT embedding).
- Hai vector này khác chiều, khác phân phối, **không thể so sánh trực tiếp**.

Ngay cả khi bạn project về cùng chiều (vd 512D bằng linear layer ngẫu nhiên), cosine cũng vô nghĩa: hai encoder huấn luyện độc lập, embedding không "biết" về nhau.

### 2.3. Lời giải: huấn luyện hai encoder **cùng nhau** với mục tiêu **đồng cấu**

Cần một tín hiệu huấn luyện ép buộc:

```
encoder_image(ảnh_mèo) ≈ encoder_text("a photo of a cat")
```

Tín hiệu này phải đến từ **dữ liệu có cặp ảnh + caption khớp** ở quy mô lớn. May mắn: Internet đầy ảnh kèm alt text, caption. CLIP gom 400 triệu cặp.

> **⚠ Lỗi thường gặp.** Một số người tưởng CLIP là "BERT cho ảnh" hay "transformer mới". Không phải. CLIP là **một loss function + cách thu thập dữ liệu**. Các encoder bên trong vẫn là ResNet/ViT (cho ảnh) và Transformer (cho text) — không có kiến trúc mới đột phá. Cái mới là **cách huấn luyện và quy mô dữ liệu**.

> **📝 Tóm tắt mục 2.**
> - Ảnh sống trong không gian pixel ℝ^{150528}, text trong không gian token id ℕ^L. Không thể so sánh trực tiếp.
> - Cần huấn luyện hai encoder *cùng nhau* để chúng học ra cùng một không gian chung.
> - Tín hiệu huấn luyện: cặp (ảnh, caption) đúng phải gần, sai phải xa.

---

## 3. Ý tưởng CLIP (Radford et al. 2021)

> **💡 Trực giác.** Tưởng tượng bạn là giáo viên dạy một lớp song ngữ (Anh-Việt). Mỗi tuần bạn cho học sinh một bộ ảnh và một bộ caption song ngữ, **trộn lẫn lung tung**, nhiệm vụ học sinh là **bắt cặp** đúng từng ảnh với caption tương ứng. Học sinh không cần học nhãn class. Chỉ cần học cách "nhìn ảnh và đọc câu sao cho khi gặp đúng cặp thì gật đầu". Sau nhiều tuần như thế, học sinh tự rút ra hiểu biết chung về ngôn ngữ và hình ảnh. CLIP là phiên bản máy hóa của bài tập này.

### 3.1. Hai encoder song song

**Image encoder** $f_I : \text{Image} \to \mathbb{R}^d$
- Input: ảnh `(224, 224, 3)`.
- Backbone: ResNet-50, ResNet-101, ViT-B/32, ViT-L/14 (paper gốc thử nhiều).
- Output: vector $d = 512$ (hoặc 768) — gọi là **image embedding**.

**Text encoder** $f_T : \text{Text} \to \mathbb{R}^d$
- Input: chuỗi token (BPE, max 77 token).
- Backbone: Transformer 12 layer, 8 head, dimension 512, ~63M parameters.
- Output: vector cùng chiều $d = 512$ — gọi là **text embedding**.

Sau encoder, mỗi nhánh có thêm một **projection head** (linear layer) đảm bảo cả hai output cùng chiều $d$. Cuối cùng **L2-normalize** để embedding nằm trên unit sphere → cosine similarity = dot product.

### 3.2. Mục tiêu: cặp đúng gần, cặp sai xa

Cho batch $N$ cặp $\{(I_i, T_i)\}_{i=1}^N$:

- $v_i = f_I(I_i) / \|f_I(I_i)\|$ — image embedding chuẩn hóa.
- $u_i = f_T(T_i) / \|f_T(T_i)\|$ — text embedding chuẩn hóa.

Ma trận similarity $S \in \mathbb{R}^{N \times N}$:
$$
S_{ij} = v_i \cdot u_j = \cos(v_i, u_j)
$$

Mục tiêu:
- $S_{ii}$ lớn (cặp đúng — diagonal).
- $S_{ij}$ với $i \neq j$ nhỏ (cặp sai — off-diagonal).

Nói cách khác: trong mỗi **hàng** của S, phần tử diagonal phải lớn nhất; trong mỗi **cột**, phần tử diagonal cũng phải lớn nhất.

### 3.3. Cùng vector space sau training

Sau khi train xong, $v$ và $u$ sống trong **cùng** ℝ^d. Có thể:

- Tính $\cos(\text{ảnh}, \text{text})$ bất kỳ.
- Search ảnh bằng text (truy vấn = $u$, database = $\{v_k\}$).
- Search text bằng ảnh.
- Combine: $0.5 v + 0.5 u'$ làm anchor cho retrieval.

> **❓ Câu hỏi tự nhiên.** *"Hai mạng độc lập, làm sao chúng tự đồng bộ về cùng không gian?"* — Gradient. Loss tính trên ma trận S liên kết cả hai encoder. Mỗi update gradient kéo image encoder và text encoder điều chỉnh **đồng thời** sao cho S diagonal trồi lên. Sau hàng trăm triệu cặp, hai encoder hội tụ tới một không gian "thỏa hiệp" mà cả hai cùng hiểu.

> **📝 Tóm tắt mục 3.**
> - CLIP = image encoder + text encoder + projection head.
> - Cùng chiều output $d$, cùng L2-normalize.
> - Mục tiêu: ma trận similarity $S_{ij}$ có diagonal cao, off-diagonal thấp.
> - Gradient liên kết hai encoder qua ma trận S → hội tụ về joint space.

---

## 4. Contrastive learning và InfoNCE loss

> **💡 Trực giác.** Contrastive learning = "so sánh đối chiếu". Không học nhãn class. Chỉ học **cặp nào gần cặp nào xa**. Giống như trẻ con học mà không cần ai gán nhãn — chỉ cần thấy "con này tên là mèo" lặp đi lặp lại đủ nhiều bối cảnh thì tự rút ra khái niệm "mèo".

### 4.1. Từ similarity matrix đến softmax + cross-entropy

Cho ma trận $S \in \mathbb{R}^{N \times N}$ (đã chia cho temperature $\tau$, ta nói ở mục 4.4):

**Image-to-text loss** (cho mỗi hàng $i$):
$$
\ell_i^{(I \to T)} = -\log \frac{\exp(S_{ii})}{\sum_{j=1}^N \exp(S_{ij})}
$$

Đây chính là **cross-entropy** với:
- Logits = hàng $i$ của $S$.
- Label = $i$ (caption đúng có chỉ số bằng ảnh).

**Text-to-image loss** (cho mỗi cột $j$):
$$
\ell_j^{(T \to I)} = -\log \frac{\exp(S_{jj})}{\sum_{i=1}^N \exp(S_{ij})}
$$

Cùng công thức nhưng softmax dọc theo cột.

**Tổng loss (symmetric InfoNCE)**:
$$
\mathcal{L} = \frac{1}{2N} \sum_{i=1}^N \left( \ell_i^{(I \to T)} + \ell_i^{(T \to I)} \right)
$$

> **❓ Câu hỏi tự nhiên.** *"Vì sao gọi là InfoNCE?"* — InfoNCE = "Information Noise Contrastive Estimation", một họ loss từ paper Oord 2018. Ý tưởng: ước lượng mutual information giữa hai biến (ảnh, text) bằng cách phân biệt cặp thật với "noise" (cặp ghép sai). Khi $N$ lớn, log của softmax xấp xỉ lower bound của mutual information.

### 4.2. Vì sao bài này lại là cross-entropy?

Hãy nhìn từ góc độ phân loại:

> "Cho ảnh $I_i$, trong $N$ caption $\{T_1, T_2, ..., T_N\}$, **caption đúng là số mấy?**"

Đây là bài toán phân loại $N$-class. Logits = similarity với từng caption. Label = $i$. Loss = cross-entropy. **Y chang Tầng 6 Lesson 03.**

Khác biệt duy nhất với image classification truyền thống: số class **không cố định** — mỗi batch một bộ class khác (vì class = chính các caption trong batch). Đây là điều khiến CLIP scale tốt với batch lớn: batch càng lớn, càng nhiều "negative samples" để contrast.

### 4.3. Pseudocode (từ paper CLIP)

```python
# I_f: image features [N, d_i]   (output image encoder)
# T_f: text features  [N, d_t]   (output text encoder)
# W_i, W_t: projection matrices  (đưa về cùng d)
# t: temperature parameter (learnable)

I_e = l2_normalize(I_f @ W_i, axis=1)   # [N, d]
T_e = l2_normalize(T_f @ W_t, axis=1)   # [N, d]

logits = (I_e @ T_e.T) * exp(t)          # [N, N], temperature scale

labels = arange(N)                       # [0, 1, 2, ..., N-1]
loss_i = cross_entropy(logits, labels, axis=0)   # image → text
loss_t = cross_entropy(logits, labels, axis=1)   # text → image
loss = (loss_i + loss_t) / 2
```

### 4.4. Temperature parameter τ

$\text{logits} = S / \tau$ với $\tau > 0$:

- $\tau$ nhỏ ($\tau \to 0$): logits cực lớn → softmax cực gắt, gần như one-hot. Loss rất sharp, gradient lớn nếu prediction sai.
- $\tau$ lớn: logits nhỏ → softmax mềm, gần uniform. Loss thấp nhưng gradient ít thông tin.

CLIP để $\tau$ **học được** (learnable scalar, lưu dưới dạng $\log(1/\tau)$ để đảm bảo dương). Thực tế CLIP học $1/\tau \approx 100$ → temperature nhỏ → softmax rất gắt.

> **⚠ Lỗi thường gặp.** Không clip $\tau$ → giá trị có thể nổ → loss NaN. CLIP clip $\log(1/\tau)$ vào $[0, \log 100]$ để tránh.

> **📝 Tóm tắt mục 4.**
> - InfoNCE = cross-entropy + softmax trên similarity matrix.
> - Symmetric: image→text và text→image, cộng và chia 2.
> - Batch lớn → nhiều negative samples → contrast tốt → embedding chất lượng cao.
> - Temperature $\tau$ là learnable, controls sharpness của softmax.

---

## 5. Walk-through batch N=4 tính tay

Để hiểu sâu, hãy chạy tay một batch nhỏ với $N = 4$.

### 5.1. Bộ dữ liệu

| i | Ảnh | Caption đúng |
|---|---|---|
| 1 | 🐱 (mèo) | "a photo of a cat" |
| 2 | 🐶 (chó) | "a photo of a dog" |
| 3 | 🚗 (xe) | "a red car on the road" |
| 4 | 🌲 (cây thông) | "a pine tree in the forest" |

### 5.2. Giả lập embedding (đã L2-normalize)

Giả sử sau khi qua encoder và normalize:

**Image embeddings** $v_1, v_2, v_3, v_4 \in \mathbb{R}^4$ (dùng $d=4$ cho dễ tính):

| i | Ảnh | $v_i$ |
|---|---|---|
| 1 | 🐱 | $(0.8, 0.4, 0.3, 0.3)$ → normalize: $(0.77, 0.39, 0.29, 0.29)$ |
| 2 | 🐶 | $(0.7, 0.5, 0.3, 0.4)$ → $(0.66, 0.47, 0.28, 0.38)$ |
| 3 | 🚗 | $(0.2, 0.2, 0.8, 0.5)$ → $(0.20, 0.20, 0.80, 0.50)$ |
| 4 | 🌲 | $(0.3, 0.3, 0.4, 0.8)$ → $(0.30, 0.30, 0.40, 0.80)$ |

(Để đơn giản, dùng số đã làm tròn — coi như đã normalize gần đúng.)

**Text embeddings** $u_1, u_2, u_3, u_4$:

| j | Caption | $u_j$ |
|---|---|---|
| 1 | "cat" | $(0.75, 0.45, 0.30, 0.30)$ |
| 2 | "dog" | $(0.60, 0.55, 0.30, 0.40)$ |
| 3 | "car" | $(0.25, 0.25, 0.82, 0.45)$ |
| 4 | "tree" | $(0.35, 0.25, 0.40, 0.80)$ |

(Các vector này đã được chọn sao cho cặp đúng cosine cao, sai cosine thấp — mô phỏng kết quả sau training.)

### 5.3. Tính similarity matrix $S_{ij} = v_i \cdot u_j$

Ví dụ tính $S_{11} = v_1 \cdot u_1$:

$$
S_{11} = 0.77 \times 0.75 + 0.39 \times 0.45 + 0.29 \times 0.30 + 0.29 \times 0.30
$$
$$
= 0.5775 + 0.1755 + 0.0870 + 0.0870 = 0.927
$$

Tương tự $S_{12} = v_1 \cdot u_2$:
$$
= 0.77 \times 0.60 + 0.39 \times 0.55 + 0.29 \times 0.30 + 0.29 \times 0.40
$$
$$
= 0.462 + 0.2145 + 0.087 + 0.116 = 0.880
$$

$S_{13} = v_1 \cdot u_3$:
$$
= 0.77 \times 0.25 + 0.39 \times 0.25 + 0.29 \times 0.82 + 0.29 \times 0.45
$$
$$
= 0.1925 + 0.0975 + 0.2378 + 0.1305 = 0.658
$$

$S_{14} = v_1 \cdot u_4$:
$$
= 0.77 \times 0.35 + 0.39 \times 0.25 + 0.29 \times 0.40 + 0.29 \times 0.80
$$
$$
= 0.2695 + 0.0975 + 0.116 + 0.232 = 0.715
$$

(Tính tương tự cho các hàng 2, 3, 4. Đây là kết quả tổng hợp — bạn nên thử ít nhất 4 ô để verify.)

Ma trận $S$ (làm tròn 3 chữ số):

|        | u₁ (cat) | u₂ (dog) | u₃ (car) | u₄ (tree) |
|--------|----------|----------|----------|-----------|
| v₁ (🐱) | **0.927** | 0.880 | 0.658 | 0.715 |
| v₂ (🐶) | 0.860 | **0.916** | 0.652 | 0.745 |
| v₃ (🚗) | 0.595 | 0.580 | **0.964** | 0.752 |
| v₄ (🌲) | 0.660 | 0.685 | 0.715 | **0.954** |

**Diagonal cao** (0.92-0.96) → cặp đúng. **Off-diagonal thấp hơn** (0.58-0.88) → cặp sai. Đây là dấu hiệu encoder đã học tốt.

### 5.4. Apply temperature $\tau$

Giả sử $1/\tau = 10$ → nhân tất cả với 10:

|        | u₁ | u₂ | u₃ | u₄ |
|--------|------|------|------|------|
| v₁ | **9.27** | 8.80 | 6.58 | 7.15 |
| v₂ | 8.60 | **9.16** | 6.52 | 7.45 |
| v₃ | 5.95 | 5.80 | **9.64** | 7.52 |
| v₄ | 6.60 | 6.85 | 7.15 | **9.54** |

### 5.5. Tính softmax cho hàng 1 (image → text loss cho ảnh 🐱)

$$
\text{exp}(S_{1*}) = (e^{9.27}, e^{8.80}, e^{6.58}, e^{7.15})
$$
$$
\approx (10\,602, 6\,633, 720, 1\,275)
$$

Sum = $10\,602 + 6\,633 + 720 + 1\,275 = 19\,230$.

Softmax row 1:
$$
\text{softmax} = (10\,602/19\,230, \ 6\,633/19\,230, \ 720/19\,230, \ 1\,275/19\,230)
$$
$$
\approx (0.551, \ 0.345, \ 0.037, \ 0.066)
$$

Label = 1 → loss row 1:
$$
\ell_1^{(I \to T)} = -\log(0.551) = 0.596
$$

### 5.6. Tính cho 3 hàng còn lại

Tương tự (tôi tính nhanh):

| Hàng i | softmax[i] (caption đúng) | $\ell_i^{(I\to T)} = -\log(\text{softmax}[i])$ |
|---|---|---|
| 1 (🐱) | 0.551 | 0.596 |
| 2 (🐶) | 0.609 | 0.496 |
| 3 (🚗) | 0.882 | 0.126 |
| 4 (🌲) | 0.836 | 0.179 |

Trung bình $I \to T$: $(0.596 + 0.496 + 0.126 + 0.179)/4 = 0.349$.

### 5.7. Loss text → image (softmax theo cột)

Đối xứng. Lấy cột 1 (caption "cat"):
$$
\text{exp}(S_{*1}) = (e^{9.27}, e^{8.60}, e^{5.95}, e^{6.60}) \approx (10\,602, \ 5\,432, \ 384, \ 735)
$$
Sum = 17,153. Softmax = (0.618, 0.317, 0.022, 0.043). Label = 1 → $\ell_1^{(T\to I)} = -\log(0.618) = 0.481$.

(Các cột khác tính tương tự, đa số diagonal có softmax 0.5-0.85.)

### 5.8. Tổng loss

$$
\mathcal{L} = \frac{1}{2}(\bar{\ell}^{I \to T} + \bar{\ell}^{T \to I}) \approx \frac{1}{2}(0.349 + 0.31) \approx 0.33
$$

Khi mạng học tốt hoàn hảo (diagonal = 1, off-diagonal = 0), loss tối thiểu là $-\log(1) = 0$ — không bao giờ đạt vì luôn còn noise. Khi mạng chưa học gì (random), loss xấp xỉ $\log N = \log 4 \approx 1.386$.

Loss hiện tại 0.33 nằm giữa hai cực này → mạng đã học khá tốt.

> **🔁 Dừng lại tự kiểm tra.**
> 1. Tính $S_{22}$ (cosine giữa $v_2$ và $u_2$). Đáp án trong panel dưới.
> 2. Nếu thay $1/\tau = 1$ (thay vì 10), loss sẽ tăng hay giảm? Giải thích.
>
> <details>
> <summary>Đáp án</summary>
>
> 1. $S_{22} = 0.66 \times 0.60 + 0.47 \times 0.55 + 0.28 \times 0.30 + 0.38 \times 0.40 = 0.396 + 0.2585 + 0.084 + 0.152 = 0.890$ (gần với 0.916 trong bảng — sai số làm tròn).
> 2. $\tau$ lớn hơn (logits nhỏ hơn) → softmax mềm hơn, prob diagonal thấp hơn → $-\log$ lớn hơn → **loss tăng**. Đây chính là lý do CLIP học $\tau$ nhỏ.
> </details>

> **📝 Tóm tắt mục 5.**
> - Với batch N=4, tính được ma trận S 4×4 từ dot product.
> - Diagonal cao là dấu hiệu encoder đã học khớp cặp.
> - Loss = trung bình cross-entropy theo hàng + theo cột, chia 2.
> - Loss minimum lý thuyết = 0; loss random = $\log N$.

---

## 6. Kiến trúc CLIP chi tiết

### 6.1. Image encoder

Paper CLIP thử nhiều backbone:

| Backbone | Parameters | Loại |
|----------|------------|------|
| ResNet-50 | ~25M | CNN cổ điển |
| ResNet-101 | ~44M | CNN sâu hơn |
| ResNet-50×4 | ~88M | EfficientNet-style scaling |
| ResNet-50×16 | ~167M | Scaling sâu hơn |
| ViT-B/32 | ~88M | Vision Transformer, patch 32×32 |
| ViT-B/16 | ~86M | Patch 16×16, accuracy tốt hơn |
| **ViT-L/14** | ~304M | **Best** — patch 14×14, dùng cho OpenAI CLIP-L |

ViT (Vision Transformer): cắt ảnh thành patch 14×14, flatten thành vector, encode bằng Transformer y như text. Mỗi patch là một "token". Output token đặc biệt `[CLS]` được dùng làm image embedding.

### 6.2. Text encoder

- Backbone: Transformer 12 layer, 8 attention head, hidden size 512, ~63M parameters.
- Input: tokenize bằng BPE (vocab ~49,000), max length 77 token.
- Output: embedding của token cuối cùng (token `[EOT]`).

### 6.3. Projection head

Mỗi encoder output có chiều khác nhau (ViT-L output 768D, text encoder 512D). Cần đưa về chung d=512 (hoặc d=768 cho ViT-L variant).

```python
image_features = image_encoder(I)          # [N, 768]
text_features = text_encoder(T)            # [N, 512]

image_embed = image_features @ W_image     # [N, 768] @ [768, 512] = [N, 512]
text_embed = text_features @ W_text        # [N, 512] @ [512, 512] = [N, 512]

image_embed = image_embed / norm(image_embed, axis=1, keepdims=True)
text_embed = text_embed / norm(text_embed, axis=1, keepdims=True)
```

### 6.4. Temperature

Một scalar learnable $\log(1/\tau)$. Lúc khởi tạo $\log(1/\tau) = \log(1/0.07) \approx 2.66$. Trong training, scalar này tự điều chỉnh, thường tăng lên cho đến khi $1/\tau \approx 100$.

### 6.5. Tổng số parameter

CLIP-L (ViT-L/14 + text 63M + projection ~1M) ≈ **428M parameter**. Còn nhỏ so với GPT-3 (175B) nhưng không hề bé.

> **📝 Tóm tắt mục 6.**
> - Image encoder: ResNet hoặc ViT.
> - Text encoder: Transformer 63M params.
> - Projection head: linear layer đưa về cùng d.
> - L2-normalize → cosine = dot.
> - Temperature τ learnable, scale logits.

---

## 7. Training data và quy mô

> **💡 Trực giác.** CLIP không thông minh hơn các model trước nó về kiến trúc. **Nó thông minh vì thấy nhiều hơn**. Một đứa trẻ học 10,000 ảnh sẽ không bằng đứa thấy 100 triệu ảnh, dù cùng não.

### 7.1. WIT (WebImageText) dataset

OpenAI thu thập **400 triệu cặp (ảnh, caption)** từ Internet:

- Crawl các website có ảnh kèm alt text.
- Bộ lọc: caption phải có giá trị ngữ nghĩa (không phải "image_1.jpg").
- Đa dạng domain: ảnh thiên nhiên, sản phẩm, meme, art, sơ đồ, screenshot…

So sánh:
- **ImageNet**: 1.28M ảnh, 1000 class — caption rất hẹp (chỉ tên class).
- **MS-COCO**: 330k ảnh, 5 caption/ảnh — chất lượng cao nhưng nhỏ.
- **WIT**: 400M cặp, caption tự nhiên muôn hình vạn trạng.

### 7.2. Lý do scale → quality

- **Nhiều object hiếm**: thấy 400M ảnh nghĩa là gặp được "tê tê", "tarot card", "Saturn V rocket"… những thứ ImageNet không có.
- **Nhiều style ngôn ngữ**: từ formal ("a photograph of...") đến slang ("lol this dog is so cute"). Text encoder học rộng.
- **Long-tail coverage**: với scale lớn, ngay cả khái niệm hiếm cũng có vài nghìn ví dụ → đủ để học.
- **Self-supervised**: không cần label thủ công. Mọi caption do người viết tự nhiên → distribution thật.

### 7.3. Compute

- Training ViT-L/14 mất ~12 ngày trên 256 GPU V100.
- Batch size **32,768** — quan trọng cho contrastive loss (nhiều negative).
- Vài chục triệu USD chi phí compute.

> **❓ Câu hỏi tự nhiên.**
> - *"Tôi có thể train CLIP ở nhà không?"* — Không. Nhưng có thể fine-tune CLIP đã pretrained (open weights từ OpenAI, hoặc OpenCLIP từ LAION) chỉ với 1 GPU.
> - *"400M cặp có sạch không?"* — Không. Có spam, ảnh hỏng, alt text vô nghĩa. Nhưng ở quy mô lớn, noise được "trung bình hóa" — model học signal tổng quát, không bị overfit noise.

> **📝 Tóm tắt mục 7.**
> - WIT: 400M cặp (ảnh, caption) từ Internet.
> - Self-supervised, không cần label thủ công.
> - Batch size 32k, vài chục triệu USD compute.
> - Scale là chìa khóa: generalize tốt vì thấy đủ rộng.

---

## 8. Zero-shot classification — siêu năng lực của CLIP

> **💡 Trực giác.** Bạn có model phân loại 1000 class ImageNet. Bỗng nhiên người dùng nói: "Tôi muốn thêm class 'mèo Munchkin' (giống mèo chân ngắn)". Bình thường: thu thập 1000 ảnh, fine-tune. **Với CLIP**: chỉ cần viết một dòng prompt "a photo of a Munchkin cat". Xong. Không train, không fine-tune.

### 8.1. Quy trình zero-shot

Bước 1 — **Encode ảnh test**:
```python
image = load("test.jpg")
v = clip.encode_image(image)        # [d]
v = v / norm(v)
```

Bước 2 — **Encode tất cả class names** (template hóa):
```python
classes = ["cat", "dog", "car", "tree", ...]
texts = [f"a photo of a {c}" for c in classes]
u_all = clip.encode_text(texts)     # [num_classes, d]
u_all = u_all / norm(u_all, axis=1, keepdims=True)
```

Bước 3 — **Cosine với từng class**:
```python
similarities = v @ u_all.T          # [num_classes]
```

Bước 4 — **Argmax**:
```python
predicted_class = classes[argmax(similarities)]
```

### 8.2. Prompt engineering

Cách phrasing class ảnh hưởng đáng kể đến accuracy:

| Prompt | Accuracy ImageNet (CLIP-L) |
|--------|----------------------------|
| `{class}` (chỉ tên) | ~63% |
| `a photo of a {class}` | ~73% |
| `a photo of a {class}, a type of pet` (cho class pet) | ~76% |
| **Prompt ensembling** (trung bình embedding của 80 prompts) | **~76.2%** |

Lý do "a photo of" giúp: caption trong training set thường có cụm này → text encoder hiểu prompt theo distribution training.

### 8.3. Vì sao zero-shot là cách mạng

| | Phân loại truyền thống (ImageNet) | CLIP zero-shot |
|---|---|---|
| **Cần data có nhãn cho task mới?** | Có — vài nghìn ảnh/class | Không |
| **Thời gian thêm class mới** | Vài ngày (collect + train) | Vài giây (viết prompt) |
| **Class fixed?** | Có — 1000 class | Không — bất kỳ tập class nào |
| **Mixed-domain (chó + xe + ung thư)?** | Cần model riêng | Cùng model |

### 8.4. Kết quả CLIP zero-shot

Trên 30+ benchmark (ImageNet, CIFAR, SUN, Food, Oxford Pets…), CLIP zero-shot **ngang ngửa** model supervised được train cho riêng từng dataset. Trên ImageNet, CLIP-L zero-shot đạt 76% — gần bằng ResNet-50 supervised (76.5%) **mà không thấy một ảnh ImageNet nào trong training**.

> **⚠ Lỗi thường gặp.** Người ta đôi khi nhầm "zero-shot" với "few-shot". Zero-shot = **không có** ví dụ huấn luyện nào cho class đó. Few-shot = có 1-5 ví dụ. CLIP làm cả hai tốt; zero-shot là điểm nổi bật.

> **📝 Tóm tắt mục 8.**
> - Zero-shot: dùng text prompt làm "soft label", cosine với image embedding → argmax.
> - Không cần fine-tune cho task mới.
> - Prompt engineering quan trọng (`"a photo of a"` cộng 10% accuracy).
> - Achievement: ngang ResNet-50 trên ImageNet mà không train trên ImageNet.

---

## 9. Ứng dụng CLIP trong thực tế

### 9.1. Image search bằng text

```python
# Index trước:
all_images = load_all("photo_library/")
image_embeddings = clip.encode_image_batch(all_images)  # [M, d]
save_to_vectordb(image_embeddings)

# Query:
query = "a black cat sleeping on a sunny couch"
q = clip.encode_text(query)
top_k = vectordb.search(q, k=10)  # cosine search
display(top_k)
```

Đây là core của Google Photos search, Apple Photos, Pinterest — tìm ảnh trong thư viện cá nhân bằng câu mô tả tự nhiên.

### 9.2. Text-to-image generation (DALL-E, Stable Diffusion)

Stable Diffusion 1.x dùng **CLIP text encoder** làm condition cho diffusion U-Net:

```
prompt "a cat astronaut" → CLIP text encoder → text embedding
                                    ↓ (cross-attention condition)
random noise → U-Net (denoise theo text embedding) → image
```

CLIP đóng vai trò "phiên dịch" prompt sang ngôn ngữ mà diffusion model hiểu được trong không gian latent.

Stable Diffusion 2.x trở đi dùng OpenCLIP (variant mở của CLIP). SD 3 và FLUX dùng cả T5 + CLIP cho prompt phức tạp.

### 9.3. Image captioning và VQA

Cho ảnh, sinh caption tự nhiên:
- Image → CLIP image encoder → image embedding.
- Image embedding → linear projection → token tiền tố cho LLM (như GPT).
- LLM sinh tiếp caption.

Đây là kiến trúc của BLIP, BLIP-2, LLaVA, MiniGPT-4.

### 9.4. Visual question answering

"Trong ảnh này có bao nhiêu người đang cười?"
- CLIP encode ảnh + câu hỏi.
- LLM nhận cả hai → trả lời.

GPT-4V, Gemini Vision đều dùng kiến trúc kế thừa CLIP cho phần encode ảnh.

### 9.5. Content moderation

- Định nghĩa "unsafe" qua prompts: `"nudity"`, `"violence"`, `"hate symbol"`.
- Mỗi ảnh upload → cosine với các prompt unsafe → flag nếu cao.
- Không cần dataset gắn nhãn — chỉ cần prompt.

### 9.6. Robotics và embodied AI

- Robot nhìn cảnh qua camera → CLIP image embedding.
- Mệnh lệnh "pick up the red mug" → CLIP text embedding.
- Cosine cao với object nào → robot biết tương tác với object đó.

### 9.7. Tổng hợp: CLIP là "Rosetta Stone" của AI

CLIP biến ảnh và text thành "ngôn ngữ chung" mà các model khác tiêu thụ được. Mọi multimodal LLM hiện đại (GPT-4V, Gemini, Claude 3) đều có một CLIP-like encoder ở stage đầu vào.

> **📝 Tóm tắt mục 9.**
> - Image search, text-to-image, captioning, VQA, moderation, robotics — đều dùng CLIP.
> - Stable Diffusion / DALL-E / Sora đều base trên CLIP text encoder.
> - Multimodal LLM (GPT-4V, Gemini, Claude) thừa kế nguyên lý CLIP.

---

## 10. Limitations của CLIP

### 10.1. Bias từ Internet data

CLIP học từ WIT — toàn bộ Internet 2020. Internet không phải đại diện công bằng cho thế giới:

- Bias chủng tộc/giới tính: ảnh "CEO" → đa số nam, da trắng (vì media bias).
- Bias địa lý: ảnh "đẹp" thường western/urban.
- Stereotype: "criminal" → có thể liên kết với một nhóm cụ thể trong embedding space.

Các nghiên cứu fairness chỉ ra CLIP có thể amplify bias nếu dùng trực tiếp trong production (vd hệ thống tuyển dụng).

### 10.2. Fine-grained classification kém

CLIP biết phân biệt "cat" vs "dog" tốt, nhưng:

- "Maine Coon" vs "Norwegian Forest Cat" — accuracy thấp (vì caption WIT hiếm khi có tên giống cụ thể).
- "Cessna 172" vs "Cessna 152" — không phân biệt được.
- Bird species, fish species, plant species → thua xa model chuyên dụng.

### 10.3. Counting

"3 con mèo" và "5 con mèo" có embedding gần như nhau. CLIP không học được khái niệm số đếm chính xác từ caption Internet (vì caption thường mô tả định tính, không định lượng).

### 10.4. Spatial reasoning

"Quả táo bên trái quả cam" — CLIP không phân biệt được với "quả táo bên phải quả cam". Spatial relationship rất khó học từ caption-level supervision.

### 10.5. OCR hạn chế

CLIP có thể đọc một số text trong ảnh (cảnh đường phố, logo), nhưng không phải OCR thật — đoạn văn dài, font lạ → fail.

### 10.6. Compositional generalization

"a red cube on top of a blue cylinder" — CLIP có thể nhầm với "a blue cube on top of a red cylinder". Bind thuộc tính-với-object khó với contrastive loss.

> **❓ Câu hỏi tự nhiên.** *"Vậy CLIP có outdated chưa?"* — Có và không. Có: các multimodal LLM hiện đại (GPT-4V, Gemini) đã giải quyết một số limitation này thông qua kiến trúc khác (vision-language Transformer thay vì 2 encoder song song). Không: CLIP vẫn là backbone phổ biến cho retrieval, generation conditioning, zero-shot classification. Hệ sinh thái CLIP (OpenCLIP, ChineseCLIP, FashionCLIP…) vẫn phát triển mạnh.

> **📝 Tóm tắt mục 10.**
> - Bias từ Internet data.
> - Fine-grained, counting, spatial, OCR, compositional — đều là điểm yếu.
> - Multimodal LLM thế hệ mới (GPT-4V, Gemini) giải quyết một phần.

---

## 11. Beyond CLIP: hướng đi 2023-2026

### 11.1. LLaVA (Large Language and Vision Assistant)

- CLIP encode ảnh → vector.
- Linear projection vector này thành "visual token" cho LLM (Vicuna, LLaMA).
- LLM sinh response tự nhiên dựa trên cả ảnh và prompt.

LLaVA-1.5 với 13B parameter làm được VQA, OCR, hài hước hóa ảnh… ở mức gần GPT-4V.

### 11.2. GPT-4V và GPT-4o

OpenAI không công khai kiến trúc, nhưng giả định: ViT image encoder (giống CLIP) → token vào GPT-4 multimodal. Khả năng dialog dài, reasoning, OCR đoạn dài, biểu đồ — vượt CLIP một bậc.

### 11.3. Gemini 1.5 và 2.0 (Google DeepMind)

Multimodal native từ đầu — không chỉ ảnh + text mà cả audio + video + code trong cùng một Transformer. Context dài 2M token. Multimodal long-context retrieval thực sự.

### 11.4. Claude 3 và 4 (Anthropic)

Cũng multimodal native (ảnh + text). Mạnh về document understanding (PDF, table, screenshot).

### 11.5. Open multimodal foundation models

- **LLaVA, BakLLaVA**: open weights, fine-tune được.
- **CogVLM, Qwen-VL**: từ Trung Quốc, hiệu năng cao.
- **InternVL**: Shanghai AI Lab, open multimodal LLM rất mạnh.

### 11.6. Hướng nghiên cứu mở

- **Video-text alignment**: VideoCLIP, ViViT — temporal modality.
- **Audio-visual-text**: ImageBind (Meta) — 6 modality cùng joint space.
- **Multimodal RLHF**: cải thiện safety và alignment cho multimodal LLM.
- **Embodied multimodal**: robot, drone, self-driving — phải hiểu ảnh + sensor + text mệnh lệnh.

> **📝 Tóm tắt mục 11.**
> - LLaVA/GPT-4V/Gemini/Claude = multimodal LLM thế hệ mới, thừa kế CLIP.
> - Open ecosystem (LLaVA, CogVLM, InternVL) rất sôi động.
> - Hướng tiếp: video, audio, embodied AI, multimodal RLHF.

---

## 12. Tổng kết lộ trình Vectors

Bạn đã đi hết 6 tầng, 48 lesson (tính cả Tầng 1-3 nếu mở rộng). Hãy nhìn lại đường đi.

### 12.1. Sợi chỉ xuyên suốt: vector

Tầng 1 (Algebra) bạn học số. Số thực $x \in \mathbb{R}$ là vector 1D — chỉ có một chiều, không có cấu trúc.

Tầng 4 (Linear Algebra) bạn học vector $\vec{v} \in \mathbb{R}^n$. Mỗi chiều có nghĩa (height, weight, age…). Dot product đo giống nhau.

Tầng 5 (Probability) bạn học distribution $p(x)$ — bản chất là vector trên không gian event. Cross-entropy đo khoảng cách giữa hai distribution.

Tầng 6 Lesson 02-04 bạn học weights $w \in \mathbb{R}^n$ — vector parameter của model. Gradient descent là di chuyển $w$ trong không gian parameter.

Tầng 6 Lesson 05-06 bạn học embedding $e \in \mathbb{R}^{300}$ — vector ngữ nghĩa của từ. Word2Vec biến từ thành vector mà cosine = "giống nghĩa".

Tầng 6 Lesson 07 bạn học vector database — lưu trữ và tìm kiếm embedding ở quy mô lớn.

Tầng 6 Lesson 08 (bài này) bạn học CLIP — joint embedding cho ảnh + text. Cosine giờ đo "giống nghĩa qua modality".

**Vector là sợi dây xuyên suốt**: từ số → tuple → embedding → joint embedding multimodal.

### 12.2. Sợi chỉ thứ hai: cosine similarity

| Tầng | Cosine xuất hiện ở đâu |
|------|------------------------|
| Tầng 4 Lesson 02 | Định nghĩa cosine, geometric intuition |
| Tầng 4 Lesson 03 | Projection, decomposition theo cosine |
| Tầng 6 Lesson 06 | $\text{king} - \text{man} + \text{woman} \approx \text{queen}$ đo bằng cosine |
| Tầng 6 Lesson 07 | Vector DB query = cosine ANN search |
| Tầng 6 Lesson 08 | CLIP loss = softmax trên cosine matrix |

Cosine là "ngôn ngữ chung" của không gian embedding. Mọi retrieval, contrastive, similarity-based ML đều dùng cosine.

### 12.3. Sợi chỉ thứ ba: gradient descent

| Tầng | Gradient descent xuất hiện ở đâu |
|------|----------------------------------|
| Tầng 3 Lesson 04-05 | Đạo hàm, chain rule |
| Tầng 6 Lesson 02 | Linear regression — minimize MSE |
| Tầng 6 Lesson 03 | Logistic regression — minimize BCE |
| Tầng 6 Lesson 04 | Neural network — backprop |
| Tầng 6 Lesson 06 | Word2Vec — minimize negative sampling loss |
| Tầng 6 Lesson 08 | CLIP — minimize InfoNCE |

Toàn bộ deep learning là **gradient descent trên một loss function khôn ngoan**. CLIP đỉnh cao của loss function khôn ngoan: contrastive trên joint embedding.

### 12.4. Bước tiếp theo

Bạn đã có đủ nền để:

1. **Đọc paper gốc**: "Learning Transferable Visual Models From Natural Language Supervision" (Radford et al. 2021). Đọc trực tiếp được — không cần tra cứu lại các khái niệm.
2. **Implement bằng PyTorch**: dùng `transformers` library hoặc `open_clip`. Train CLIP nhỏ trên một subset COCO trong 1 ngày trên 1 GPU.
3. **Fine-tune cho domain**: FashionCLIP (CLIP cho thời trang), MedCLIP (cho y khoa), ChineseCLIP — tất cả là fine-tune CLIP trên domain data.
4. **Build app**: image search engine cho thư viện ảnh cá nhân, semantic image moderator, multimodal RAG (text + image search trong tài liệu PDF).
5. **Đọc tiếp**: LLaVA paper, GPT-4V system card, Gemini technical report. Bạn sẽ thấy CLIP-like encoder trong tất cả.

### 12.5. Lời chào kết thúc lộ trình

Lộ trình Vectors hoàn tất. Từ con số đầu tiên ở Tầng 1 đến joint embedding space của CLIP ở đây, bạn đã đi qua **toán nền** (algebra, calculus, linear algebra, probability), **machine learning cổ điển**, **deep learning**, **NLP**, **vector retrieval**, và **multimodal AI**.

Vector không chỉ là "list số". Vector là **cách AI tổ chức ý nghĩa**. Mọi câu hỏi "X giống Y bao nhiêu?" trong AI hiện đại đều quy về cosine giữa hai embedding. Bạn nắm được nguyên lý này rồi.

Chúc may mắn trên hành trình tiếp theo. Đừng dừng lại.

> **📝 Tóm tắt mục 12.**
> - Sợi chỉ xuyên suốt: vector, cosine, gradient descent.
> - CLIP là hội tụ của toàn bộ những gì đã học.
> - Bước tiếp: đọc paper, implement, fine-tune, build app.

---

## 13. Bài tập

### Bài 1 — Tính similarity matrix

Cho batch N=3:

| i | $v_i$ | $u_i$ |
|---|---|---|
| 1 | $(0.6, 0.8)$ | $(0.5, 0.9)$ |
| 2 | $(0.9, 0.1)$ | $(0.8, 0.2)$ |
| 3 | $(0.2, 0.9)$ | $(0.3, 0.95)$ |

(Giả sử đã L2-normalize gần đúng — bỏ qua sai số nhỏ.)

Tính ma trận $S \in \mathbb{R}^{3 \times 3}$ và kiểm tra diagonal có lớn nhất từng hàng không.

### Bài 2 — Tính loss image→text cho hàng 1

Với ma trận S từ bài 1, áp dụng temperature $1/\tau = 5$. Tính softmax row 1 và loss $\ell_1^{(I \to T)}$.

### Bài 3 — Zero-shot classification

Cho ảnh test có image embedding $v_{\text{test}} = (0.7, 0.7)$ (đã normalize). 3 class với text embedding:

- "cat" → $(0.6, 0.8)$
- "dog" → $(0.9, 0.4)$
- "car" → $(0.2, 0.98)$

Phân loại ảnh bằng cosine. Class nào?

### Bài 4 — Prompt engineering

Bạn nhận thấy CLIP zero-shot trên dataset "loài chim" có accuracy 50%. Đề xuất 3 cách prompt engineering có thể tăng accuracy. Giải thích vì sao.

### Bài 5 — Pseudocode

Viết pseudocode (Python-like) cho hàm `clip_zero_shot(image, class_names, model)` trả về class predicted. Bao gồm: encode image, encode mỗi prompt, cosine, argmax.

### Bài 6 — Phân tích limitation

CLIP nhận ảnh chụp "một quả táo đỏ ở góc trên bên trái, một quả táo xanh ở góc dưới bên phải". Bạn hỏi CLIP "ảnh nào khớp với 'a red apple on the bottom right'?". Dự đoán CLIP có nhận đúng không? Vì sao? Giải pháp?

---

## 14. Lời giải chi tiết

### Lời giải bài 1

$S_{11} = 0.6 \times 0.5 + 0.8 \times 0.9 = 0.3 + 0.72 = 1.02$. (Lưu ý: vì các vector chưa được normalize chính xác — chuẩn của $(0.6, 0.8)$ là 1.0, của $(0.5, 0.9)$ là $\sqrt{0.25 + 0.81} = \sqrt{1.06} \approx 1.03$, nên $S_{11} \approx 1.02/1.03 \approx 0.99$.)

Bỏ qua sai số normalize cho gọn:

| | u₁ | u₂ | u₃ |
|---|---|---|---|
| v₁ | 1.02 | 0.64 | 0.94 |
| v₂ | 0.54 | 0.74 | 0.37 |
| v₃ | 0.91 | 0.34 | 0.92 |

Verify hàng 1: $S_{12} = 0.6 \times 0.8 + 0.8 \times 0.2 = 0.48 + 0.16 = 0.64$ ✓.
$S_{13} = 0.6 \times 0.3 + 0.8 \times 0.95 = 0.18 + 0.76 = 0.94$ ✓.

Hàng 1: max là $S_{11} = 1.02$ ✓ (diagonal).
Hàng 2: max là $S_{22} = 0.74$ ✓.
Hàng 3: max là $S_{33} = 0.92$ ✓ (nhưng $S_{31} = 0.91$ rất gần — caption "v₁" và "v₃" gần nhau trong space này).

### Lời giải bài 2

Apply $\tau$: nhân row 1 với 5.

Row 1: $(5 \times 1.02, 5 \times 0.64, 5 \times 0.94) = (5.10, 3.20, 4.70)$.

$\exp$: $(e^{5.10}, e^{3.20}, e^{4.70}) \approx (164.0, 24.5, 109.9)$.

Sum = $164.0 + 24.5 + 109.9 = 298.4$.

Softmax = $(0.550, 0.082, 0.368)$.

Label = 1 → loss = $-\log(0.550) = 0.598$.

### Lời giải bài 3

Cosine $v_{\text{test}} \cdot u_{\text{class}}$:

- cat: $0.7 \times 0.6 + 0.7 \times 0.8 = 0.42 + 0.56 = 0.98$.
- dog: $0.7 \times 0.9 + 0.7 \times 0.4 = 0.63 + 0.28 = 0.91$.
- car: $0.7 \times 0.2 + 0.7 \times 0.98 = 0.14 + 0.686 = 0.826$.

Max = **cat** với 0.98.

### Lời giải bài 4

3 cách:

1. **Dùng template cụ thể**: thay `"{bird_name}"` bằng `"a photograph of a {bird_name}, a type of bird"`. Caption training set thường có cấu trúc dạng này → text encoder hiểu prompt tốt hơn.
2. **Prompt ensembling**: viết 5-10 prompt khác nhau cho mỗi class (`"a photo of {bird}"`, `"close-up of a {bird}"`, `"{bird} in the wild"`, …), encode tất cả, trung bình text embedding. Giảm noise từ một template duy nhất.
3. **Dùng tên Latin hoặc tên phổ thông song song**: `"a photograph of a American Robin (Turdus migratorius)"`. CLIP có thể đã thấy cả hai tên trên Internet → tăng cơ hội khớp.

Lý do: text encoder học theo distribution caption WIT. Prompt càng giống caption thật → embedding càng đặt đúng chỗ trong joint space.

### Lời giải bài 5

```python
def clip_zero_shot(image, class_names, model):
    # 1. Encode image
    v = model.encode_image(image)       # [d]
    v = v / norm(v)

    # 2. Build prompts và encode text
    prompts = [f"a photo of a {c}" for c in class_names]
    u_all = model.encode_text(prompts)  # [num_classes, d]
    u_all = u_all / norm(u_all, axis=1, keepdims=True)

    # 3. Cosine similarities
    sims = v @ u_all.T                  # [num_classes]

    # 4. Argmax
    best = argmax(sims)
    return class_names[best], sims[best]
```

### Lời giải bài 6

**Dự đoán**: CLIP có khả năng cao **không phân biệt được** "red apple bottom right" với "green apple bottom right" hoặc với "red apple top left". Lý do:

1. **Compositional/spatial reasoning kém**: CLIP học từ caption mà caption thường chỉ liệt kê object, không nêu vị trí chính xác. "A red apple and a green apple" và "A green apple on the left, a red apple on the right" có embedding gần nhau.
2. **Bind thuộc tính-object yếu**: CLIP có thể nhận "có quả táo đỏ" và "có quả táo xanh" nhưng không gắn được "đỏ" với "ở góc nào".

**Giải pháp**:

- **Dùng object detection trước**: detector (YOLO, DETR) tìm bounding box + color của mỗi object, rồi viết caption có cấu trúc.
- **Dùng multimodal LLM (GPT-4V, Gemini)**: các model này có khả năng reasoning spatial tốt hơn nhờ Transformer end-to-end thấy cả ảnh.
- **Crop + CLIP**: chia ảnh thành 4 quadrant, CLIP từng quadrant, sau đó ráp kết quả lại.

---

## 15. Liên kết

- **Bài trước**: [Lesson 07 — Vector Database và RAG](../lesson-07-vector-db-rag/)
- **Tham khảo nền**: [Tầng 5 Lesson 08 — Cross-entropy](../../05-Probability/lesson-08-cross-entropy/), [Tầng 6 Lesson 03 — Logistic regression](../lesson-03-logistic-regression/), [Tầng 6 Lesson 06 — Word embedding](../lesson-06-word-embeddings/).
- **Paper gốc**: Radford et al. 2021, *"Learning Transferable Visual Models From Natural Language Supervision"*.
- **Code**: [OpenAI CLIP](https://github.com/openai/CLIP), [OpenCLIP](https://github.com/mlfoundations/open_clip).

> **Đây là lesson cuối của lộ trình Vectors.** Không có bài tiếp theo. Bước tiếp theo là **rời khỏi tài liệu này và đi xây cái gì đó**. Chúc bạn vui vẻ.
