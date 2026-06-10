# Lesson 06 — Word Embedding: Từ thưa sang dày, từ ký tự sang nghĩa

## Mục tiêu học tập

Sau bài này bạn:

- Giải thích được **hạn chế của BoW/TF-IDF** (thưa, không capture ngữ nghĩa) và **vì sao cần biểu diễn dày**.
- Hiểu **distributional hypothesis** (Firth 1957) — nền tảng triết học của mọi word embedding hiện đại.
- Trình bày kiến trúc **Word2Vec** (skip-gram, CBOW): input → hidden → output, loss, negative sampling.
- Thực hiện **vector arithmetic** trên embedding: $\text{king} - \text{man} + \text{woman} \approx \text{queen}$ và lý giải vì sao có kết quả này.
- Hiểu **GloVe** từ góc nhìn ma trận co-occurrence và mối liên hệ với SVD (Tầng 4 Lesson 08).
- Phân biệt **intrinsic vs extrinsic evaluation**, biết tên benchmark phổ biến.
- Hiểu **giới hạn của static embedding** (đa nghĩa) và lý do **contextual embedding** (BERT) ra đời.
- Biết **sentence embedding** hiện đại (Sentence-BERT, OpenAI `text-embedding-3`, Cohere) — input cho RAG ở Lesson 07.

## Kiến thức tiền đề

- [Lesson 05 — Text vectorization](../lesson-05-text-vectorization/) — BoW, TF-IDF; bạn cần hiểu vì sao những phương pháp này thưa.
- [Lesson 04 — Neural network](../lesson-04-neural-network/) — forward pass, softmax, cross-entropy, backprop. Word2Vec là NN nhỏ.
- [Tầng 4 Lesson 02 — Dot product](../../04-LinearAlgebra/lesson-02-dot-product/) — cosine similarity giữa 2 embedding là dot product (sau khi chuẩn hoá).
- [Tầng 4 Lesson 08 — SVD](../../04-LinearAlgebra/lesson-08-svd/) (nếu đã đọc) — giúp hiểu GloVe theo góc factorization.
- [Tầng 5 Lesson 06 — Cross-entropy](../../05-Probability/lesson-06-cross-entropy/) — loss của skip-gram.

---

## 1. Vì sao BoW/TF-IDF không đủ?

> 💡 **Trực giác.** Bạn vừa học ở Lesson 05 rằng một câu có thể biểu diễn bằng vector đếm từ. Nhưng nếu mở câu trả lời ngay lúc này: *"con mèo"* và *"con chó"* có cùng độ tương đồng cosine với *"laptop"* — đều bằng 0! BoW không biết rằng mèo và chó là động vật, còn laptop thì không. Đó là lý do chúng ta cần một biểu diễn **biết nghĩa**.

Hãy bắt đầu bằng cách "đóng" hai câu hỏi mà người đọc nào cũng đặt ra khi rời Lesson 05:

**Câu hỏi 1.** *"BoW có vấn đề gì? Đã dùng hàng chục năm mà?"*

Có 4 vấn đề lớn:

1. **Vector quá thưa (sparse).** Một văn bản với vocabulary 50 000 từ → vector 50 000 chiều, gần như toàn 0. Lưu trữ và tính toán đều lãng phí.
2. **Vector quá dài.** d = |V| nghĩa là chiều bằng size vocab. Tăng dữ liệu → tăng vocab → tăng d. Không scale.
3. **Không capture semantic.** *"cat"* và *"dog"* được mã hoá thành 2 chiều khác nhau, hoàn toàn trực giao. Cosine similarity = 0, dù chúng đều là pets. Trong khi đó *"cat"* và *"automobile"* cũng cho 0. Mô hình không phân biệt được "khác nhau nhưng liên quan" vs "khác nhau hoàn toàn".
4. **Không capture syntax/morphology.** *"run"*, *"running"*, *"ran"* là 3 chiều rời rạc, không liên hệ.

**Câu hỏi 2.** *"Vậy vector dày (dense) sẽ khác BoW thế nào?"*

| | BoW / TF-IDF (sparse) | Embedding (dense) |
|---|---|---|
| Chiều | $d = \lvert V \rvert$ (50 000+) | $d = 50, 100, 300, 768$ |
| Ô khác 0 | < 1% | ~ 100% |
| Học cách nào | Đếm tần suất | Học từ corpus bằng NN |
| Capture semantic | Không | Có (giống nhau → gần nhau) |
| Tổ hợp được | Không | Có ($\text{king} - \text{man} + \text{woman}$) |

> ❓ **Câu hỏi tự nhiên.** *"Nhưng từ một vector toàn 0 và một số 1 sang một vector toàn số thực — làm sao biết các con số ấy mang nghĩa gì?"*
>
> Đây là điểm khó nhất của bài này. Câu trả lời: **không một chiều nào "nghĩa là 'động vật'" hay "nghĩa là 'giống cái'"**. Nghĩa nằm trong **mối quan hệ giữa các vector**, không nằm trong từng ô. Chúng ta sẽ thấy điều này ở mục 7 (vector arithmetic).

> 📝 **Tóm tắt mục 1.**
> - BoW/TF-IDF tạo vector thưa, dài, không capture nghĩa.
> - Embedding là vector **dày, ngắn** (d = 50–768), học từ corpus.
> - Nghĩa nằm ở quan hệ vector, không ở từng ô.

---

## 2. Distributional hypothesis — nền tảng triết học

> 💡 **Trực giác.** Tưởng tượng bạn không biết tiếng Anh, ai đó đưa cho bạn 1 triệu câu chứa từ `bardiwac`. Sau khi đọc:
> - "He ordered a glass of bardiwac with his steak."
> - "The bardiwac in this region has a fruity taste."
> - "Pour me a bardiwac, please."
>
> Bạn sẽ đoán: bardiwac là một **loại đồ uống có cồn**, gần với *wine*. Bạn đoán được mà không cần ai dạy nghĩa — chỉ bằng cách quan sát các từ đi kèm. Đó là **distributional hypothesis**.

### 2.1 Phát biểu hình thức

> **Firth (1957):** *"You shall know a word by the company it keeps."*

Tương đương: **Hai từ có nghĩa giống nhau ⟺ chúng xuất hiện trong các ngữ cảnh giống nhau.**

Định nghĩa "context": cửa sổ các từ xung quanh từ trung tâm. Window size `w = 2` nghĩa là 2 từ bên trái + 2 từ bên phải.

### 2.2 Ví dụ bằng số cụ thể

Cho 3 câu (đã chuẩn hoá):

```
1. the cat sat on the mat
2. the dog sat on the rug
3. i bought a laptop
```

Với window size 1, đếm xem mỗi từ xuất hiện cạnh từ nào:

| Từ | Context (window=1) |
|---|---|
| cat | the, sat |
| dog | the, sat |
| laptop | a |
| mat | the |
| rug | the |
| sat | cat/dog, on |

Quan sát:

- `cat` và `dog` cùng có context `{the, sat}` → đoán: cùng loại từ (animal).
- `mat` và `rug` cùng có context `{the}` (và đều xuất hiện sau `on the`) → đoán: cùng loại (vật để đặt).
- `laptop` có context `{a}`, không trùng với cat/dog → khác loại.

**Đây chính là tín hiệu mà mọi thuật toán embedding khai thác.** Cho mô hình "nhìn thấy" co-occurrence đủ nhiều, nó tự học ra rằng cat ≈ dog.

### 2.3 Ma trận co-occurrence

Đây là cách đơn giản nhất để hiện thực hoá distributional hypothesis: với vocab $|V|$, lập ma trận $X \in \mathbb{R}^{|V| \times |V|}$ trong đó $X[i][j]$ = số lần từ `j` xuất hiện trong window của từ `i`.

Với 3 câu trên (vocab = {the, cat, dog, sat, on, mat, rug, i, bought, a, laptop}), window = 1:

```
          the cat dog sat on mat rug i bought a laptop
the         0   1   1   0  2   1   1  0    0  0   0
cat         1   0   0   1  0   0   0  0    0  0   0
dog         1   0   0   1  0   0   0  0    0  0   0
sat         0   1   1   0  2   0   0  0    0  0   0
on          2   0   0   2  0   0   0  0    0  0   0
mat         1   0   0   0  0   0   0  0    0  0   0
rug         1   0   0   0  0   0   0  0    0  0   0
i           0   0   0   0  0   0   0  0    1  0   0
bought      0   0   0   0  0   0   0  1    0  1   0
a           0   0   0   0  0   0   0  0    1  0   1
laptop      0   0   0   0  0   0   0  0    0  1   0
```

Lấy hàng của `cat` $= (1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0)$ và hàng `dog` $= (1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0)$. Cosine similarity $= 1,0$ (giống hệt). Hàng `cat` vs `laptop` $= (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)$. Cosine $= 0$.

> ❓ **Câu hỏi tự nhiên.** *"Vậy mỗi hàng của X là embedding của từ rồi đúng không?"*
>
> Gần đúng. Vấn đề: ma trận này vẫn **|V| chiều, vẫn thưa**. Bước tiếp theo là **giảm chiều** (dimensionality reduction) — chiếu từ |V| xuống 50–300 chiều. Có 2 cách:
> 1. **SVD trên X** (đã học ở Tầng 4 Lesson 08) — đây chính là tư tưởng của các phương pháp "count-based" như LSA.
> 2. **Train một NN dự đoán co-occurrence** — đây là tư tưởng của Word2Vec.

> ⚠ **Lỗi thường gặp.** Distributional hypothesis **không nói** "từ giống nhau về nghĩa thì đồng nghĩa". Nó nói "**phân bố** co-occurrence giống nhau". Hai từ trái nghĩa như *hot* và *cold* cũng có context giống nhau (đều theo sau "feels", đều trước "weather") → embedding của chúng lại **gần nhau**. Đây là điểm yếu (sẽ bàn ở mục 11).

> 🔁 **Dừng lại tự kiểm tra.**
>
> 1. Nếu corpus chỉ có 1 câu, hỏi distributional hypothesis có còn ý nghĩa không?
> 2. Cho vocab 100 000 từ, ma trận co-occurrence có bao nhiêu ô? Có thực tế không?
>
> <details><summary>Đáp án</summary>
>
> 1. Không. Distributional hypothesis cần **nhiều ngữ cảnh khác nhau** để phân biệt từ. Với 1 câu, mỗi từ chỉ có 1 context — không đủ thống kê.
> 2. 100 000 × 100 000 = **10 tỷ** ô. Mỗi ô là `int32` (4 byte) → 40 GB. Không thực tế, đó là lý do phải dùng phương pháp khác để học embedding trực tiếp ở chiều thấp.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Firth 1957: "Bạn biết một từ qua bạn bè nó đi cùng."
> - Hai từ có context giống nhau → embedding nên gần nhau.
> - Co-occurrence matrix là cách trực tiếp nhất, nhưng quá to → cần dimensionality reduction hoặc NN.

---

## 3. Embedding là gì — định nghĩa hình thức

**Embedding** của một từ `w` là một vector dày $e_w \in \mathbb{R}^d$ với:

- $d$ nhỏ hơn nhiều so với $|V|$ (thường $d = 50, 100, 300, 768$).
- Mọi ô của $e_w$ đều là số thực (không bị giới hạn dương, không one-hot).
- Các từ có nghĩa gần nhau → $\cos(e_u, e_v)$ gần 1.
- $e_w$ được **học** từ corpus, không phải gán bằng tay.

### 3.1 Toàn bộ vocabulary = ma trận embedding

Tập hợp tất cả embedding tạo thành **ma trận embedding** $E \in \mathbb{R}^{|V| \times d}$. Hàng `i` của $E$ = embedding của từ thứ `i` trong vocab.

Ví dụ vocab 4 từ {king, queen, man, woman}, d = 3:

```
E = [
  [ 0.6,  0.7,  0.4],   # king
  [ 0.6,  0.7, -0.4],   # queen
  [ 0.5,  0.1,  0.4],   # man
  [ 0.5,  0.1, -0.4],   # woman
]
```

Quan sát: chiều 1 và 2 giống nhau giữa các cặp (king/queen, man/woman) — có thể "ý nghĩa" của 2 chiều này là "royalty" và "humanness". Chiều 3 = ±0.4 phân biệt male/female. **Lưu ý**: chúng ta không gán "ý nghĩa" cho chiều, chỉ là quan sát hậu kỳ.

### 3.2 Bốn ví dụ số cụ thể về cosine similarity

Với `E` trên, tính cosine sim cho 4 cặp:

1. $\text{king} \cdot \text{queen} = 0,6 \cdot 0,6 + 0,7 \cdot 0,7 + 0,4 \cdot (-0,4) = 0,36 + 0,49 - 0,16 = 0,69$. Norm $= \sqrt{0,36+0,49+0,16} = \sqrt{1,01} \approx 1,005$. $\cos = 0,69 / (1,005 \cdot 1,005) \approx 0,683$.
2. $\text{king} \cdot \text{man} = 0,6 \cdot 0,5 + 0,7 \cdot 0,1 + 0,4 \cdot 0,4 = 0,30+0,07+0,16 = 0,53$. $\|\text{king}\| \approx 1,005$, $\|\text{man}\| = \sqrt{0,25+0,01+0,16} = \sqrt{0,42} \approx 0,648$. $\cos \approx 0,53/(1,005 \cdot 0,648) \approx 0,814$.
3. $\text{king} \cdot \text{woman} = 0,6 \cdot 0,5 + 0,7 \cdot 0,1 + 0,4 \cdot (-0,4) = 0,30+0,07-0,16 = 0,21$. $\cos \approx 0,21/(1,005 \cdot 0,648) \approx 0,323$.
4. $\text{man} \cdot \text{woman} = 0,5 \cdot 0,5 + 0,1 \cdot 0,1 + 0,4 \cdot (-0,4) = 0,25+0,01-0,16 = 0,10$. $\cos \approx 0,10/(0,648 \cdot 0,648) \approx 0,238$.

Quan sát: king-man (cùng nam, cùng human) > king-queen (cùng royalty) > king-woman (khác giới, khác royalty) > man-woman (chỉ chung human, trái giới). Mọi chuyện hợp lý — embedding "biết" nhiều thứ.

> ⚠ **Lỗi thường gặp.** Đừng nghĩ "chiều 3 = giới tính". Chiều của embedding **không có nghĩa độc lập** — chúng được học để tổng hợp lại cho ra similarity đúng. Bằng cách áp dụng PCA (Tầng 4) lên ma trận embedding, ta có thể tìm một **hướng (direction)** trong không gian biểu diễn "giới tính" — nhưng đó là một combination tuyến tính của nhiều chiều, không phải một chiều cụ thể.

> 📝 **Tóm tắt mục 3.**
> - Embedding = vector dày $e_w \in \mathbb{R}^d$.
> - Toàn bộ vocab gói gọn trong ma trận $E \in \mathbb{R}^{|V| \times d}$.
> - Chiều embedding không có nghĩa độc lập; nghĩa nằm ở **hướng** trong không gian.

---

## 4. Word2Vec (Mikolov 2013) — bức tranh tổng thể

**Word2Vec** là kỹ thuật học embedding bằng một neural network rất nhỏ (1 hidden layer, không activation phi tuyến). Đây là phương pháp đột phá năm 2013, mở ra cả lĩnh vực embedding hiện đại.

Word2Vec có **2 variant**, cùng triết lý nhưng đảo input/output:

| Variant | Input | Output |
|---|---|---|
| **Skip-gram** | 1 từ trung tâm (center) | Dự đoán các từ trong cửa sổ ngữ cảnh |
| **CBOW (Continuous Bag of Words)** | Các từ ngữ cảnh (gộp lại) | Dự đoán từ trung tâm |

Cả hai đều dùng cùng kiến trúc NN nhỏ. Khác biệt nằm ở "hướng" dự đoán.

> 💡 **Trực giác.** Hãy nhớ distributional hypothesis: "biết từ qua context của nó". Word2Vec biến điều đó thành một **bài toán dự đoán có giám sát (self-supervised)**: trượt cửa sổ qua corpus, mỗi vị trí tạo một cặp (center, context). Mô hình học để dự đoán đúng cặp này. Trong quá trình học, vector embedding tự điều chỉnh để cặp (center, context) thật sự cho ra dot product cao, còn cặp ngẫu nhiên cho ra dot product thấp.

### 4.1 Sliding window — tạo dữ liệu training

Cho câu: `the cat sat on the mat` và window = 2.

Trượt center qua từng vị trí:

| Center | Context (window=2) | Training pairs (center, context) |
|---|---|---|
| the (pos 0) | cat, sat | (the, cat), (the, sat) |
| cat (pos 1) | the, sat, on | (cat, the), (cat, sat), (cat, on) |
| sat (pos 2) | the, cat, on, the | (sat, the), (sat, cat), (sat, on), (sat, the) |
| on (pos 3) | cat, sat, the, mat | (on, cat), (on, sat), (on, the), (on, mat) |
| the (pos 4) | sat, on, mat | (the, sat), (the, on), (the, mat) |
| mat (pos 5) | on, the | (mat, on), (mat, the) |

Trên 1 câu 6 từ ta đã có ~ 18 cặp training. Trên corpus 1 tỷ từ → vài tỷ cặp.

> ❓ **Câu hỏi tự nhiên.** *"Sao 'the' xuất hiện 2 lần ở pos 0 và pos 4 không bị trùng?"*
>
> Không trùng vì context **khác nhau**: pos 0 có context `{cat, sat}`, pos 4 có context `{sat, on, mat}`. Cả 2 đều cập nhật embedding của `the`, nhưng cập nhật theo các hướng khác nhau. Trên cả corpus, embedding của `the` sẽ học từ tất cả các context xuất hiện.

> 📝 **Tóm tắt mục 4.**
> - Word2Vec = NN nhỏ học embedding, 2 variant Skip-gram và CBOW.
> - Dữ liệu = các cặp (center, context) tạo từ sliding window.
> - Self-supervised: không cần label, tự sinh data từ text raw.

---

## 5. Skip-gram chi tiết — kiến trúc và loss

> 💡 **Trực giác.** Skip-gram nói: "Cho tôi một từ trung tâm, tôi sẽ đoán những từ nào hay xuất hiện quanh nó." Để đoán đúng, mạng phải **học một biểu diễn (embedding) của từ trung tâm sao cho dot product với embedding các từ context là lớn**.

### 5.1 Kiến trúc

3 layer, **không có activation phi tuyến** (đây là điểm quan trọng — sẽ giải thích sau):

```
Input (one-hot |V|)  →  Hidden layer (d)  →  Output (softmax |V|)
       x                    h = W^T x          y = softmax(W'^T h)
```

- **W ∈ ℝ^{|V|×d}**: ma trận input embedding (hàng `i` = embedding của từ `i` khi nó là center).
- **W' ∈ ℝ^{|V|×d}**: ma trận output embedding (hàng `j` = embedding của từ `j` khi nó là context).

Khi input là one-hot của từ thứ `i`:
- $h = W^\top x$ đơn giản lấy ra **hàng `i` của W** (vì các ô khác trong x đều = 0). Đây là embedding center của từ `i`.
- $y_j = \text{softmax}(W'^\top h)_j = \dfrac{\exp(w'_j \cdot h)}{\sum_k \exp(w'_k \cdot h)}$. Đây là xác suất từ `j` xuất hiện trong context của từ `i`.

### 5.2 Walk-through bằng số

Vocab 4 từ {king, queen, man, woman}, d = 2.

Giả sử ma trận sau khi train được:

```
W (center) = [
  [0.9, 0.1],   # king
  [0.8, 0.3],   # queen
  [0.7, 0.0],   # man
  [0.6, 0.2],   # woman
]
W' (context) = [
  [0.5, 0.4],   # king (làm context)
  [0.4, 0.5],   # queen
  [0.6, 0.1],   # man
  [0.3, 0.4],   # woman
]
```

Input: one-hot của `king` = `(1, 0, 0, 0)`. Center embedding:

```
h = W^T · (1,0,0,0)^T = hàng 0 của W = (0.9, 0.1)
```

Score (dot product) cho mỗi từ làm context:

```
score(king as ctx)   = (0.5)(0.9) + (0.4)(0.1) = 0.45 + 0.04 = 0.49
score(queen as ctx)  = (0.4)(0.9) + (0.5)(0.1) = 0.36 + 0.05 = 0.41
score(man as ctx)    = (0.6)(0.9) + (0.1)(0.1) = 0.54 + 0.01 = 0.55
score(woman as ctx)  = (0.3)(0.9) + (0.4)(0.1) = 0.27 + 0.04 = 0.31
```

Softmax (chia exp):

```
e^0.49 = 1.632
e^0.41 = 1.507
e^0.55 = 1.733
e^0.31 = 1.363
Sum    = 6.235

P(king as ctx | king)   = 1.632/6.235 = 0.262
P(queen as ctx | king)  = 1.507/6.235 = 0.242
P(man as ctx | king)    = 1.733/6.235 = 0.278
P(woman as ctx | king)  = 1.363/6.235 = 0.219
```

Nếu corpus thật có nhiều cặp `(king, man)` (vì hai từ này hay đi cùng), loss sẽ ép `P(man as ctx | king)` lên cao, tức tăng `score(man as ctx)` = dot product giữa W[king] và W'[man].

### 5.3 Loss — cross-entropy

Với một cặp training (center = `c`, context = `o`):

```
L = -log P(o | c) = -log [ exp(w'_o · h_c) / Σ_k exp(w'_k · h_c) ]
   = -w'_o · h_c + log Σ_k exp(w'_k · h_c)
```

Trên toàn corpus với T cặp:

```
L_total = -(1/T) Σ_t log P(o_t | c_t)
```

Đây chính là **cross-entropy** mà bạn đã học ở Lesson 03 và Tầng 5.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao không có activation phi tuyến? Mọi NN khác đều có ReLU/sigmoid."*
>
> Đây là điểm rất tinh tế. Mục tiêu của Word2Vec **không phải dự đoán cực kỳ chính xác** — mà là **tạo ra embedding tốt**. Nếu thêm phi tuyến, mạng "nhớ" được nhiều luật phức tạp, nhưng embedding $h = W^\top x$ không còn là biểu diễn tuyến tính đẹp. Loại bỏ phi tuyến ⟹ embedding chính là hàm tuyến tính của input ⟹ vector arithmetic (mục 7) hoạt động.

### 5.4 Negative sampling — vấn đề tốc độ

> ⚠ **Vấn đề lớn của softmax.** Mẫu số $\sum_k \exp(w'_k \cdot h)$ chạy qua **toàn bộ vocabulary** ($|V| = 100\,000+$). Mỗi training step phải tính 100 000 dot product. Trên 1 tỷ cặp training → $10^{14}$ dot product. Không khả thi.

**Negative sampling** (Mikolov 2013, paper số 2) thay softmax bằng task nhị phân nhỏ:

- Cho cặp dương `(c, o)`: lực mô hình đoán "có liên quan" (label = 1).
- Lấy mẫu `k` cặp âm `(c, n_1), ..., (c, n_k)` với `n_i` chọn ngẫu nhiên từ vocab: ép đoán "không liên quan" (label = 0). Thông thường `k = 5` (corpus to) đến `k = 20` (corpus nhỏ).

Loss mới:

```
L = -log σ(w'_o · h_c) - Σ_{i=1..k} log σ(-w'_{n_i} · h_c)
```

Trong đó $\sigma(x) = 1/(1 + e^{-x})$ là sigmoid (đã học ở Lesson 03).

**Tốc độ**: mỗi step chỉ tính `k+1` dot product (ví dụ 6), không phải |V|. Nhanh hơn ~ |V|/(k+1) lần ≈ 17 000 lần với |V| = 100 000, k = 5.

**Mini walk-through.** Với `c = king`, `o = man`, k = 2, lấy ngẫu nhiên `n_1 = laptop`, `n_2 = pizza`.

Giả sử dot product hiện tại:

```
w'_man · h_king    = 0.55  → σ(0.55) = 0.634   → mong muốn càng gần 1 càng tốt
w'_laptop · h_king = 0.10  → σ(-0.10) = 0.475  → mong muốn càng gần 1 càng tốt (vì label âm)
w'_pizza · h_king  = 0.05  → σ(-0.05) = 0.488
```

Loss $= -\log(0,634) - \log(0,475) - \log(0,488) = 0,456 + 0,744 + 0,717 = 1,917$. Gradient sẽ ép $\sigma(w'_{\text{man}} \cdot h_{\text{king}})$ lên cao hơn, và $\sigma(w'_{\text{laptop}} \cdot h_{\text{king}}), \sigma(w'_{\text{pizza}} \cdot h_{\text{king}})$ xuống thấp hơn.

> ❓ **Câu hỏi tự nhiên.** *"Sampling negative ngẫu nhiên đều có công bằng không? Từ phổ biến (the, a) bị chọn quá nhiều?"*
>
> Đúng vậy — đó là vấn đề. Mikolov dùng **unigram distribution mũ 3/4**: $P(w) \propto \text{count}(w)^{0,75}$. Mũ 0.75 nén bớt frequency cao và lift up frequency thấp, cân bằng training tốt hơn so với đều hoặc theo unigram thường.

> 🔁 **Dừng lại tự kiểm tra.**
>
> 1. Skip-gram dùng cross-entropy. Cross-entropy yêu cầu xác suất tổng = 1. Negative sampling không cho ra xác suất tổng = 1 — vậy nó "đúng" theo nghĩa nào?
> 2. Trong Skip-gram, ta có **2 ma trận** W và W'. Sau khi train xong, dùng ma trận nào làm embedding?
>
> <details><summary>Đáp án</summary>
>
> 1. Negative sampling là **xấp xỉ** của softmax đầy đủ. Nó không cho ra phân phối xác suất chuẩn nhưng đủ để kéo cặp đúng lại gần và đẩy cặp sai ra xa. Đây là một dạng **Noise Contrastive Estimation (NCE)** đơn giản hoá.
> 2. Thường dùng **W** (center embedding). Một số nghiên cứu lấy **trung bình W và W'** để có embedding ổn định hơn (GloVe cũng làm vậy).
> </details>

> 📝 **Tóm tắt mục 5.**
> - Skip-gram = NN 1-hidden, không phi tuyến, output softmax over vocab.
> - Embedding của từ trung tâm = hidden layer = hàng của W.
> - Cross-entropy loss → negative sampling để chạy nhanh.

---

## 6. CBOW — đảo chiều

**CBOW (Continuous Bag of Words)**: cho **các từ context**, dự đoán **từ trung tâm**.

Kiến trúc:

```
Inputs (k one-hot)  →  Avg embedding (d)  →  Output (softmax |V|)
   x_1, ..., x_k       h = (1/k) Σ W^T x_i      y = softmax(W'^T h)
```

Khác Skip-gram ở chỗ: hidden layer là **trung bình embedding** của các từ context, không phải embedding của 1 từ.

### 6.1 Walk-through nhanh

Câu `the cat sat on the mat`, window = 2, center = `sat`. Context = `{the, cat, on, the}`.

Lookup embedding cho từng context (giả sử W[the] = (0.1, 0.2), W[cat] = (0.5, 0.6), W[on] = (0.3, 0.1), W[the] = (0.1, 0.2)):

```
h = ((0.1+0.5+0.3+0.1)/4, (0.2+0.6+0.1+0.2)/4) = (0.25, 0.275)
```

Sau đó tính softmax over vocab dựa trên `h`, mong cho ra xác suất cao cho `sat`.

### 6.2 So sánh Skip-gram vs CBOW

| Tiêu chí | Skip-gram | CBOW |
|---|---|---|
| Input | 1 từ | nhiều từ (avg) |
| Output | nhiều từ | 1 từ |
| Số gradient mỗi cặp | Nhiều (1 cho mỗi context word) | Ít hơn |
| Train với corpus nhỏ | Tốt hơn | Kém hơn |
| Train với từ hiếm | Tốt hơn | Kém hơn |
| Tốc độ training | Chậm hơn | Nhanh hơn |

Mikolov 2013 khuyến nghị: **Skip-gram cho corpus nhỏ và quan tâm rare words; CBOW cho corpus to, từ phổ thông**.

### 6.3 Khi nào chọn cái nào — quy tắc thực dụng

Trong thực tế, hai quy tắc đơn giản:

- **Corpus < 100 triệu token, vocab có nhiều từ ít gặp** → Skip-gram. Vì với từ hiếm, ta cần "tận dụng" mỗi lần xuất hiện để học, và Skip-gram tạo 2k gradient mỗi lần xuất hiện (k = window).
- **Corpus > 1 tỷ token, vocab "phẳng" (ít từ hiếm)** → CBOW. Vì CBOW nhanh hơn ~2-4 lần và đủ tốt khi đã có nhiều data.

Số liệu thực tế (Mikolov et al. 2013, paper số 2): với corpus 6B token + vocab 1M từ:

| Model | Time | Sem accuracy | Syn accuracy |
|---|---|---|---|
| Skip-gram | ~ 1.5 ngày | **65.6%** | 61.0% |
| CBOW | ~ 7 giờ | 57.3% | **68.9%** |

Skip-gram thắng về semantic (king−man+woman); CBOW thắng về syntactic (walking−walked). Điều này cho thấy 2 kiến trúc bắt đặc tính khác nhau.

### 6.4 Walk-through nhỏ: cùng câu, 2 hướng

Câu `the cat sat on the mat`, center = `sat` (vị trí 2), window = 2. Context = `{the (pos 0), cat (pos 1), on (pos 3), the (pos 4)}`.

**Skip-gram tạo các training pair:**

```
(sat, the), (sat, cat), (sat, on), (sat, the)
```

→ 4 gradient update riêng cho mỗi cặp. Embedding của `sat` được "kéo" theo 4 hướng khác nhau (về phía the, về phía cat, về phía on, về phía the).

**CBOW tạo 1 training point:**

```
input = avg(emb(the), emb(cat), emb(on), emb(the))
target = sat
```

→ 1 gradient update. Embedding của `sat` được "kéo" về phía trung bình.

Skip-gram "khai thác triệt để" mỗi từ — đó là lý do tốt cho corpus nhỏ. CBOW gộp gọn — đó là lý do nhanh.

> 📝 **Tóm tắt mục 6.**
> - CBOW = đảo input/output của skip-gram, dùng trung bình embedding context.
> - Nhanh hơn, đơn giản hơn, nhưng kém với từ hiếm.
> - Skip-gram thắng semantic, CBOW thắng syntactic — chọn theo bối cảnh.

---

## 7. Vector arithmetic — phép thuật `king − man + woman ≈ queen`

> 💡 **Trực giác.** Embedding có một tính chất kỳ diệu: **các "ý nghĩa" được mã hoá thành hướng (direction)**. "Từ king sang man" và "từ queen sang woman" cùng đi theo một hướng — hướng "royalty → non-royalty". Cộng/trừ vector theo các hướng này → di chuyển theo trục ý nghĩa.

### 7.1 Phát biểu

Mikolov 2013 phát hiện: với embedding học từ Word2Vec, các quan hệ ngữ pháp/ngữ nghĩa thể hiện thành **vector offset**:

- $\text{vec}(\text{king}) - \text{vec}(\text{man}) \approx \text{vec}(\text{queen}) - \text{vec}(\text{woman})$ (offset "royalty")
- $\text{vec}(\text{Paris}) - \text{vec}(\text{France}) \approx \text{vec}(\text{Rome}) - \text{vec}(\text{Italy})$ (offset "capital_of")
- $\text{vec}(\text{walking}) - \text{vec}(\text{walked}) \approx \text{vec}(\text{running}) - \text{vec}(\text{ran})$ (offset "tense")

Suy ra: $\text{vec}(\text{king}) - \text{vec}(\text{man}) + \text{vec}(\text{woman}) \approx \text{vec}(\text{queen})$.

### 7.2 Walk-through bằng số trên mini-embedding 4D

Hãy tự tính. Cho mini-embedding 4D (royalty, humanness, female, country):

```
king   = ( 0.90, 0.95,  0.0, 0.10)
queen  = ( 0.90, 0.95,  1.0, 0.10)
man    = ( 0.10, 0.95,  0.0, 0.20)
woman  = ( 0.10, 0.95,  1.0, 0.20)
Paris  = ( 0.20, 0.10,  0.0, 0.90)
France = ( 0.15, 0.05,  0.0, 0.95)
Rome   = ( 0.25, 0.10,  0.0, 0.92)
Italy  = ( 0.15, 0.05,  0.0, 0.96)
```

**Bài toán 1:** $\text{king} - \text{man} + \text{woman} = ?$

```
king − man + woman 
= (0.90−0.10+0.10, 0.95−0.95+0.95, 0.0−0.0+1.0, 0.10−0.20+0.20)
= (0.90, 0.95, 1.0, 0.10)
```

So với queen = `(0.90, 0.95, 1.0, 0.10)`. **Bằng đúng queen!** Đây là toy example "sạch" — chiều 3 (female) trở thành 1.0 vì cộng woman.

**Bài toán 2:** $\text{Paris} - \text{France} + \text{Italy} = ?$

```
Paris − France + Italy
= (0.20−0.15+0.15, 0.10−0.05+0.05, 0.0−0.0+0.0, 0.90−0.95+0.96)
= (0.20, 0.10, 0.0, 0.91)
```

So với Rome = `(0.25, 0.10, 0.0, 0.92)`. Cosine similarity:

```
dot = 0.20·0.25 + 0.10·0.10 + 0·0 + 0.91·0.92
    = 0.05 + 0.01 + 0 + 0.8372 = 0.8972
‖result‖ = √(0.04 + 0.01 + 0 + 0.8281) = √0.8781 ≈ 0.937
‖Rome‖   = √(0.0625 + 0.01 + 0 + 0.8464) = √0.9189 ≈ 0.959
cos = 0.8972 / (0.937·0.959) = 0.8972/0.8986 = 0.9984
```

Cos = 0.9984 → cực gần Rome. ✓

### 7.3 Vì sao có hiện tượng này?

Có 2 cách giải thích, đan nhau:

**Cách 1 — về cấu trúc loss.** Skip-gram học $w'_o \cdot w_c \approx \log P(o \mid c)$. Levy & Goldberg (2014) chứng minh điều này tương đương với **factorization của ma trận PMI** (Pointwise Mutual Information). Ma trận PMI có cấu trúc tuyến tính, do đó embedding cũng có cấu trúc tuyến tính → hỗ trợ arithmetic.

**Cách 2 — về analogies.** Hai cặp `(king, queen)` và `(man, woman)` xuất hiện trong các context "song song" trong corpus: nói tới gender mà royalty hằng không đổi → offset "gender" được học chung. Mọi cặp khác cùng offset gender (actor/actress, prince/princess) cũng học cùng vector offset đó.

### 7.4 Cảnh báo — đây là toy

> ⚠ **Đừng dùng toy embedding 4D này cho production.** Mini-embedding của chúng ta là **gán bằng tay** để minh hoạ. Embedding thật:
> - Không có chiều "royalty" hay "female" rõ ràng — chúng phân tán qua nhiều chiều.
> - Phải dùng cosine để so sánh (không phải bằng tuyệt đối).
> - Không phải mọi analogy đều "trúng đích" — accuracy trên benchmark Google analogies ~60-70% với Word2Vec.

### 7.5 Cách dùng thực tế

Cho embedding thật (300 chiều, train trên Google News, có sẵn online):

```
result = vec("king") − vec("man") + vec("woman")
nearest = argmax_w cos(result, vec(w)) với w ∈ vocab, w ∉ {king, man, woman}
```

Loại bỏ 3 từ input để tránh trả về chính chúng (cos cao sẵn). Kết quả: `queen` thường nằm top-1 hoặc top-3.

> ❓ **Câu hỏi tự nhiên.** *"Nếu loại bỏ king, man, woman khỏi danh sách candidate, sao bài toán không trở thành 'tìm từ giống king − man + woman nhất' mà cứ cho ra queen — sao không phải 'princess' hay 'goddess'?"*
>
> Vì embedding học từ corpus chứa hàng triệu lần `queen` cùng context royal/female, ít hơn với `princess` (trẻ + female) hay `goddess` (thần thoại). Vector offset đúng nhất từ `king` để tới "royal female adult" là `queen`. Princess thường top-3 hoặc top-5.

> 🔁 **Dừng lại tự kiểm tra.**
>
> 1. Tại sao trừ `man` và cộng `woman` chứ không phải ngược lại?
> 2. Với analogy `Tokyo : Japan = ? : Korea`, viết phương trình vector và đáp án.
>
> <details><summary>Đáp án</summary>
>
> 1. Vì ta đi từ `king` (đã là royal+male) cần loại bỏ "male" (trừ man) rồi thêm "female" (cộng woman) → ra royal+female = queen. Đảo lại sẽ ra "royal male — woman + man" — không hợp lý vì chiều giới ngược.
> 2. $\text{Tokyo} - \text{Japan} + \text{Korea} = ?$. Vector offset "Tokyo − Japan" = vector "is_capital_of_inverse". Cộng vào Korea → "capital of Korea" = **Seoul**.
> </details>

> 📝 **Tóm tắt mục 7.**
> - Embedding học từ Word2Vec hỗ trợ vector arithmetic.
> - Offset giữa cặp tương đồng = hướng ý nghĩa (gender, capital, tense, ...).
> - Là hệ quả của factorization PMI (Levy & Goldberg 2014).
> - Toy 4D dùng để hiểu, không dùng thật.

---

## 8. GloVe (Pennington 2014) — count-based đối thủ

> 💡 **Trực giác.** Word2Vec học bằng cách trượt cửa sổ và tối ưu prediction. **GloVe** (Global Vectors) hỏi: tại sao không học trực tiếp từ **ma trận co-occurrence** (mục 2.3)? Đếm 1 lần, optimize 1 lần — đó là tinh thần count-based.

### 8.1 Ma trận co-occurrence X

Định nghĩa $X_{ij}$ = số lần từ `j` xuất hiện trong context window của từ `i` trên toàn corpus. Đây là một con số dương rất to (corpus 1 tỷ token, từ phổ biến có thể đạt $10^7$).

Mục tiêu GloVe: tìm $w_i, \tilde{w}_j \in \mathbb{R}^d$ sao cho:

```
w_i · w̃_j + b_i + b̃_j ≈ log X_{ij}
```

Hai bias `b_i, b̃_j` hấp thụ "tần suất riêng" của từng từ.

### 8.2 Loss của GloVe

```
J = Σ_{i,j: X_{ij}>0} f(X_{ij}) · (w_i · w̃_j + b_i + b̃_j − log X_{ij})²
```

Trong đó $f(x)$ là **weighting function**:

```
f(x) = (x / x_max)^α   nếu x < x_max,   = 1 nếu x ≥ x_max
```

`x_max = 100`, `α = 0.75` là siêu tham số mặc định. Mục đích: giảm trọng số cho cặp xuất hiện quá ít (noise) và cặp xuất hiện quá nhiều (saturate).

### 8.3 Walk-through số

Cho 3 từ {ice, steam, water}, ma trận X giả:

```
X[ice][water]    = 1.36 × 10^5
X[steam][water]  = 1.58 × 10^4
X[ice][solid]    = 1.9 × 10^4
X[steam][solid]  = 2.2 × 10^2
```

Log:
```
log X[ice][water]   ≈ 11.82
log X[steam][water] ≈ 9.67
log X[ice][solid]   ≈ 9.85
log X[steam][solid] ≈ 5.39
```

GloVe sẽ học để dot product $w_{\text{ice}} \cdot \tilde{w}_{\text{water}} = 11,82 - b_{\text{ice}} - \tilde{b}_{\text{water}}$. Sau training, $w_{\text{ice}}$ và $w_{\text{steam}}$ sẽ có offset rõ ràng (steam ↔ ice ≈ vapor ↔ solid).

### 8.4 Tỉ số xác suất — đặc trưng GloVe

Pennington 2014 lập luận: cái thật sự mang thông tin **không phải** $X_{ij}$ mà là **tỉ số** $X_{ik}/X_{jk}$. Ví dụ:

| k | P(k\|ice) | P(k\|steam) | Tỉ số |
|---|---|---|---|
| solid | 1.9·10⁻⁴ | 2.2·10⁻⁵ | **8.9** (lớn) |
| gas | 6.6·10⁻⁵ | 7.8·10⁻⁴ | **0.085** (nhỏ) |
| water | 3.0·10⁻³ | 2.2·10⁻³ | 1.36 (≈1) |
| fashion | 1.7·10⁻⁵ | 1.8·10⁻⁵ | 0.96 (≈1) |

Tỉ số phân biệt được "ice-thuộc về" (solid: 8.9) vs "steam-thuộc về" (gas: 0.085). Trong khi đó từ trung tính (water, fashion) cho tỉ số ≈ 1.

GloVe thiết kế loss để dot product khớp với `log` của tỉ số → embedding học được tính discriminative này.

### 8.5 Mối liên hệ SVD

> ❓ **Câu hỏi tự nhiên.** *"GloVe nghe giống matrix factorization. Liên hệ với SVD ở Tầng 4 Lesson 08 thế nào?"*
>
> SVD phân tích $X = U\Sigma V^\top$ cho phép giảm chiều: lấy top-d singular vector → embedding d chiều. GloVe cũng tìm $w_i \cdot \tilde{w}_j \approx \log X_{ij}$ — bản chất là **weighted matrix factorization** của ma trận $\log X$ (với weight $f(X_{ij})$).
>
> So với SVD trên X thô:
> - SVD chuẩn dùng L2 loss đều, GloVe dùng weighted L2.
> - SVD trên log X gần tương đương GloVe khi weight = 1.
>
> Đây là điểm gặp nhau giữa "count-based" (GloVe, LSA) và "predict-based" (Word2Vec): chúng đều **factorize implicit/explicit một ma trận thống kê**.

### 8.6 So sánh Word2Vec vs GloVe

| | Word2Vec | GloVe |
|---|---|---|
| Phương pháp | Trượt cửa sổ + NN | Đếm global + factorization |
| Hyper chính | window, k (neg samples) | x_max, α |
| Tốc độ train | Phụ thuộc corpus size | Phụ thuộc |X|² (lần đếm xong rồi nhanh) |
| Memory peak | Thấp (streaming) | Cao (giữ ma trận X) |
| Chất lượng | Tương đương trên benchmark | Tương đương |
| Phổ biến | Vẫn dùng | Vẫn dùng (GloVe vectors 6B-840B token từ Stanford rất phổ biến) |

> 📝 **Tóm tắt mục 8.**
> - GloVe học embedding bằng cách factorize log của ma trận co-occurrence.
> - Loss bình phương sai số có weighting $f(X_{ij})$.
> - Tương đương SVD weighted; cùng "họ" với LSA, PCA.
> - Cho kết quả tương đương Word2Vec; chọn cái nào tuỳ pipeline.

---

## 9. Đánh giá embedding — Intrinsic và Extrinsic

Có embedding rồi, làm sao biết nó "tốt"? Có 2 cách đánh giá.

### 9.1 Intrinsic — đánh giá nội tại

Đánh giá embedding **tách rời khỏi downstream task**. Có 2 nhóm benchmark phổ biến.

**Word similarity benchmark.** Bộ dữ liệu (vd `WordSim-353`, `SimLex-999`) gồm cặp từ kèm điểm tương đồng do con người gán (vd 0–10). Cách tính:

1. Cho mỗi cặp, tính cosine similarity của embedding.
2. Tính **Spearman correlation** giữa cosine sim và điểm người gán.
3. Correlation cao → embedding "đồng ý" với người.

Ví dụ một số entry trong WordSim-353:

| word1 | word2 | human score |
|---|---|---|
| computer | keyboard | 7.62 |
| king | queen | 8.58 |
| professor | doctor | 6.62 |
| stock | jaguar | 0.92 |
| baby | mother | 7.85 |

Word2Vec trên Google News thường đạt Spearman ~0.65–0.70 trên WordSim-353.

**Analogy benchmark.** Google Analogy Test Set có ~19 000 câu hỏi dạng `a : b :: c : ?`. Ví dụ:

```
Athens : Greece :: Oslo : ?           (đáp án: Norway)
walking : walked :: swimming : ?       (swam)
better : best :: stronger : ?          (strongest)
```

Đánh giá: tính $\text{vec}(b) - \text{vec}(a) + \text{vec}(c)$, tìm nearest neighbor (trừ a, b, c), so với đáp án.

**Accuracy** đo: % câu trả lời đúng. Word2Vec đạt ~73% syntactic + ~62% semantic trên Google Analogies.

### 9.2 Extrinsic — đánh giá qua downstream task

Đưa embedding làm **input cho task thật** (sentiment analysis, NER, machine translation), đo metric của task.

Ví dụ:
- **Sentiment analysis**: embedding → LSTM → accuracy phân loại review tích cực/tiêu cực.
- **NER (Named Entity Recognition)**: embedding → BiLSTM-CRF → F1 trên CoNLL-2003.

Extrinsic là thước đo **quan trọng nhất** vì cuối cùng ta dùng embedding cho task chứ không phải để có embedding.

### 9.3 Trade-off

| | Intrinsic | Extrinsic |
|---|---|---|
| Tốc độ | Nhanh (chỉ cần benchmark) | Chậm (phải train downstream) |
| Phản ánh chất lượng thực | Một phần | Toàn phần |
| Dễ so sánh | Có | Khó hơn (phụ thuộc model downstream) |
| Risk | Có thể "overfit" benchmark | Tốn tài nguyên |

> ⚠ **Lỗi thường gặp.** Embedding tốt trên word similarity **không đảm bảo** tốt cho mọi task. Ví dụ embedding train trên Wikipedia tổng quát có thể yếu khi dùng cho text y khoa — đó là lý do có **domain-specific embedding** (BioBERT, FinBERT).

### 9.4 Walk-through Spearman bằng tay

Cho 4 cặp với điểm người chấm vs cosine của embedding:

| | word1 | word2 | human | cos |
|---|---|---|---|---|
| a | dog | cat | 8.5 | 0.78 |
| b | car | truck | 7.8 | 0.82 |
| c | tree | book | 1.5 | 0.32 |
| d | king | queen | 9.0 | 0.91 |

**Bước 1.** Rank cột `human` (cao nhất = rank 1): d=1, a=2, b=3, c=4.

**Bước 2.** Rank cột `cos`: d=1, b=2, a=3, c=4.

**Bước 3.** Tính $d_i = \text{rank}_{\text{human}} - \text{rank}_{\text{cos}}$ cho mỗi cặp:

```
a: 2 − 3 = −1, d² = 1
b: 3 − 2 = +1, d² = 1
c: 4 − 4 = 0,  d² = 0
d: 1 − 1 = 0,  d² = 0
Σ d² = 2
```

**Bước 4.** Spearman công thức ngắn (khi không có tie):

```
ρ = 1 − (6 · Σ d²) / (n · (n² − 1))
  = 1 − (6 · 2) / (4 · 15)
  = 1 − 12/60 = 1 − 0.2 = 0.8
```

Khá cao — embedding của bạn "đồng ý" với người về thứ tự, dù không khớp tuyệt đối.

> ❓ **Câu hỏi tự nhiên.** *"Sao không dùng Pearson trực tiếp giữa human và cos?"*
>
> Vì Pearson đo **quan hệ tuyến tính**: nếu human ∈ [0, 10] và cos ∈ [-1, 1], scale khác nhau, Pearson kéo theo. Spearman chỉ quan tâm **thứ tự**, robust hơn nhiều khi 2 thang đo khác bản chất.

> 📝 **Tóm tắt mục 9.**
> - Intrinsic: word similarity (Spearman) + analogy (accuracy). Nhanh.
> - Extrinsic: dùng cho downstream task, đo metric task. Thực chất hơn.
> - Cả hai bổ sung lẫn nhau.
> - Spearman = correlation trên rank — chuẩn cho word similarity benchmark.

---

## 10. Visualisation embedding — t-SNE và UMAP

Embedding sống trong không gian 50–768 chiều, không thể vẽ trực tiếp. Cần **chiếu xuống 2D/3D** để con người nhìn được.

### 10.1 t-SNE (t-Distributed Stochastic Neighbor Embedding)

**Ý tưởng.** Giữ nguyên **quan hệ láng giềng**: nếu A và B gần nhau trong d chiều → chúng cũng gần nhau trong 2D. Còn các điểm xa nhau thì không bắt buộc giữ khoảng cách.

**Cách hoạt động (sơ lược).**

1. Trong không gian gốc d chiều, với mỗi cặp `(i, j)` tính xác suất chọn `j` làm láng giềng của `i`: $p_{j|i}$ từ Gaussian.
2. Trong không gian 2D, tham số hoá vị trí $y_i$ và tính xác suất $q_{ij}$ từ Student-t distribution.
3. Minimize KL divergence $\text{KL}(P \| Q)$ bằng gradient descent trên $y_i$.

**Kết quả.** Các từ liên quan gom thành cluster rõ rệt. Ví dụ embedding 50 từ:

- Cluster động vật: cat, dog, lion, elephant, tiger.
- Cluster country: France, Germany, Japan, Italy, Vietnam.
- Cluster colour: red, blue, green, yellow, purple.

t-SNE cho thấy embedding học được "loại từ" (semantic category) mà không cần label.

> ⚠ **Lỗi thường gặp với t-SNE.**
> - **Khoảng cách giữa cluster không có ý nghĩa.** t-SNE nén global, chỉ giữ local. Đừng kết luận "cluster A xa cluster B nên không liên quan".
> - **Cluster size không có ý nghĩa.** Cluster to/nhỏ trong t-SNE không phản ánh density gốc.
> - **Phụ thuộc hyperparameter `perplexity`** (thường 5–50). Đổi perplexity → kết quả khác.

### 10.2 UMAP (Uniform Manifold Approximation and Projection)

Tương tự t-SNE nhưng:
- Giữ cả global structure tốt hơn (khoảng cách giữa cluster có ý nghĩa hơn).
- Nhanh hơn (scale tốt với 10^6+ điểm).
- Có nền tảng toán học từ topology (manifold learning).

Hiện nay UMAP là lựa chọn mặc định cho embedding visualisation trong các tool như TensorFlow Projector, BERTopic, scanpy.

### 10.3 Liên hệ PCA

PCA (Tầng 4 Lesson 06) cũng giảm chiều, nhưng **tuyến tính**. Với embedding (cấu trúc phi tuyến phức tạp), PCA thường không đủ — t-SNE/UMAP cho cluster rõ hơn nhiều.

### 10.4 Walk-through bằng số — perplexity của t-SNE

> 💡 **Trực giác.** Perplexity nói "với mỗi điểm, tôi quan tâm tới bao nhiêu láng giềng?". Perplexity 5 = focus rất local (chỉ 5 điểm gần nhất). Perplexity 50 = nhìn rộng hơn.

Công thức: với mỗi điểm `i`, tìm $\sigma_i$ sao cho **entropy** của phân phối $p_{\cdot|i}$ bằng $\log(\text{perplexity})$.

Ví dụ với perplexity = 5, entropy mong muốn $= \log(5) \approx 1,609$. Khi đó với mỗi điểm có "ảnh hưởng đáng kể" của khoảng 5 điểm xung quanh.

**Hệ quả thực tế.** Cho 50 từ chia 5 cluster (10 từ/cluster):

- Perplexity = 5: mỗi cluster bị "vỡ" thành 2-3 sub-cluster nhỏ (focus quá local).
- Perplexity = 10-15: cluster đẹp, 5 cluster rõ rệt.
- Perplexity = 50: gần bằng số điểm, mất cấu trúc local.

Đây là lý do "đổi perplexity → kết quả khác" — bạn phải thử nhiều giá trị.

### 10.5 Hậu kỳ — tìm "hướng" trong embedding

PCA trên ma trận embedding của 1000 cặp (male, female) (như man/woman, king/queen, actor/actress, ...) cho ra một **principal direction** — đó là **"gender direction"** trong không gian embedding.

Cụ thể: gọi $g$ là vector đơn vị này. Khi đó:

- $\text{vec}(\text{king}) \cdot g - \text{vec}(\text{queen}) \cdot g \approx -1,5$ (queen "female hơn" king).
- $\text{vec}(\text{woman}) \cdot g - \text{vec}(\text{man}) \cdot g \approx -1,5$.
- $\text{vec}(\text{doctor}) \cdot g \approx +0,3$ (lệch về male trong corpus 2013) → embedding **encode bias xã hội**!

Đây là tiền đề cho cả lĩnh vực **bias mitigation** trong embedding (Bolukbasi 2016).

> 📝 **Tóm tắt mục 10.**
> - t-SNE giữ local neighbour, cluster đẹp nhưng khoảng cách cluster không có nghĩa.
> - UMAP nhanh hơn, giữ global tốt hơn.
> - Cả hai đều phi tuyến, vượt trội PCA cho embedding.
> - PCA hậu kỳ tìm ra "hướng" mang nghĩa (gender, sentiment) — cũng phơi bày bias.

---

## 11. Giới hạn của static embedding

Word2Vec/GloVe gán **một vector cố định** cho mỗi từ. Đây là **static embedding** — bất kể từ xuất hiện trong câu nào, embedding luôn như nhau.

### 11.1 Vấn đề đa nghĩa (polysemy)

Tiếng Anh có rất nhiều từ đa nghĩa:

- **bank**: ngân hàng / bờ sông.
- **bat**: con dơi / cây gậy bóng chày.
- **apple**: trái táo / công ty Apple.
- **java**: cà phê Java / ngôn ngữ Java / hòn đảo Java.

Word2Vec trộn các nghĩa vào 1 vector duy nhất. Vector "bank" sẽ là một dạng "trung bình" giữa "tiền + tài chính" và "nước + cát" — không thật sự đại diện cho nghĩa nào.

**Ví dụ cụ thể.** Cho 2 câu:

```
A: I deposited money at the bank.       (nghĩa: ngân hàng)
B: I sat on the river bank.             (nghĩa: bờ sông)
```

Với static embedding, $\text{vec}(\text{bank})$ ở câu A và câu B **giống hệt nhau**. Không có cách nào phân biệt nghĩa từ embedding.

### 11.2 Contextual embedding (ELMo, BERT, GPT)

**Ý tưởng.** Cho embedding **phụ thuộc vào context** — cùng từ ở 2 câu khác nhau → 2 embedding khác nhau.

- **ELMo (2018)**: BiLSTM 2-layer, embedding = concat trạng thái hidden từ 2 hướng.
- **BERT (2018)**: Transformer encoder, embedding = output cuối ở vị trí của từ đó.
- **GPT (2018)**: Transformer decoder, tương tự nhưng causal.

**Cách dùng.** Với BERT:

```
text = "I deposited money at the bank."
tokens = tokenizer(text)               # [CLS, i, deposited, money, at, the, bank, ., SEP]
output = bert(tokens)                  # (seq_len, 768)
bank_embedding_A = output[6]           # embedding của bank trong context A

text = "I sat on the river bank."
... 
bank_embedding_B = output[6]           # embedding của bank trong context B

# Hai embedding KHÁC NHAU
cos(bank_embedding_A, bank_embedding_B) < 1
```

Với BERT, ta thấy: `bank` trong A gần với `account`, `loan`. `bank` trong B gần với `shore`, `river`. **Đúng ngữ nghĩa cụ thể.**

### 11.3 Bài này không đi sâu BERT

BERT cần Transformer (self-attention, multi-head, positional encoding) — đó là một lesson riêng. Ở đây chỉ cần biết:

- **Static embedding** (Word2Vec/GloVe): 1 từ = 1 vector. Đơn giản, đủ cho nhiều ứng dụng cơ bản.
- **Contextual embedding** (BERT/GPT): 1 từ trong context = 1 vector. Mạnh hơn, là chuẩn từ 2018 trở đi.

### 11.4 4 ví dụ số về polysemy

Cho 4 cặp câu, tính cosine của `bank` (static vs contextual giả lập):

| Câu A | Câu B | cos static | cos contextual (BERT) |
|---|---|---|---|
| I deposited at the **bank**. | River **bank** is muddy. | 1.00 | 0.31 |
| Apple stock rises. | I ate an apple. | 1.00 | 0.42 |
| Bat flew at night. | He swung the bat. | 1.00 | 0.38 |
| Java is a language. | Java coffee is bitter. | 1.00 | 0.45 |

Static = 1.00 (trùng vector hoàn toàn). Contextual phân biệt rõ — đó chính là power của BERT.

### 11.5 Các giai đoạn lịch sử

| Giai đoạn | Model | Năm | Đặc trưng |
|---|---|---|---|
| Sparse | One-hot, BoW, TF-IDF | < 2013 | Vector thưa, dài |
| Static dense | Word2Vec, GloVe, fastText | 2013-2017 | Vector dày, 1 từ = 1 vector |
| Contextual | ELMo, BERT, GPT, RoBERTa | 2018-2019 | Vector phụ thuộc context |
| Instruction-tuned | text-embedding-3, voyage-2, embed-v3 | 2022+ | Tinh chỉnh cho retrieval, multilingual |

Bài này tập trung **Static dense** (Word2Vec/GloVe) vì nó là foundation. Hiểu được tại sao $\text{king} - \text{man} + \text{woman} \approx \text{queen}$ là chìa khoá hiểu mọi cái đến sau.

> 📝 **Tóm tắt mục 11.**
> - Static embedding mỗi từ 1 vector → không xử lý được đa nghĩa.
> - Contextual embedding (BERT) cho mỗi (từ, context) một vector → giải quyết.
> - Bài này chỉ giới thiệu, sẽ học sâu khi gặp Transformer.
> - Lịch sử: Sparse → Static dense → Contextual → Instruction-tuned.

---

## 12. Sentence embedding — đầu vào của RAG

Trên thực tế, thường ta cần embedding cho **câu / đoạn / tài liệu**, không chỉ từng từ. Đó là **sentence embedding**.

### 12.1 Cách đơn giản nhất — averaging

Cho câu = `[w_1, w_2, ..., w_n]`. Sentence embedding = trung bình embedding các từ:

```
sent_emb = (1/n) Σ_i vec(w_i)
```

Đây là cách dùng nhanh, không train thêm gì. Hạn chế: bỏ word order (`John yêu Mary` ≡ `Mary yêu John`).

**Cải tiến**: weighted average bằng TF-IDF (từ Lesson 05). Từ phổ biến (the, a) có weight thấp → ít ảnh hưởng.

### 12.2 Sentence-BERT (SBERT, 2019)

Fine-tune BERT với **siamese architecture** (hai tower chia sẻ trọng số) để embedding của 2 câu đồng nghĩa cosine cao, 2 câu khác nghĩa cos thấp.

Output: vector 768 chiều cho cả câu. Cosine similarity ánh xạ trực tiếp tới "semantic similarity".

**Ưu điểm.**
- Train xong, encode 1 câu → 1 forward pass (10ms với GPU).
- Có thể dùng FAISS/HNSW cho nearest-neighbour search ở scale triệu câu.

### 12.3 OpenAI text-embedding-3, Cohere embed-v3, Voyage

Các provider thương mại cung cấp embedding API:

| Model | Chiều | Context length | Note |
|---|---|---|---|
| OpenAI `text-embedding-3-small` | 1536 (có thể trim) | 8192 | Cheap, default |
| OpenAI `text-embedding-3-large` | 3072 (có thể trim) | 8192 | Strong |
| Cohere `embed-v3.0` | 1024 | 512 | Multilingual |
| Voyage `voyage-2` | 1024 | 4000 | Strong on retrieval |

Tất cả cùng API: gửi string → trả về vector. Cosine similarity là metric chính.

### 12.4 Liên hệ Lesson 07 — RAG

> 💡 **Bước kế tiếp.** Embedding là input cho **vector database** (Lesson 07). Quy trình RAG:
>
> 1. **Index time:** đoạn văn → embedding → lưu DB.
> 2. **Query time:** câu hỏi → embedding → nearest neighbour trong DB → lấy đoạn liên quan.
> 3. **Generation:** LLM nhận câu hỏi + các đoạn liên quan → trả lời.
>
> Tất cả phụ thuộc vào **chất lượng embedding** + **tốc độ nearest-neighbour search**. Đó là chủ đề Lesson 07.

### 12.5 Multimodal embedding — bước nhảy cuối

Embedding không chỉ cho text. Ảnh, audio, video cũng có thể embed về cùng không gian:

- **CLIP** (OpenAI 2021): ảnh + caption cùng không gian 512 chiều. $\cos(\text{image\_emb}, \text{text\_emb})$ cao nếu ảnh khớp caption.
- **Sẽ học ở Lesson 08** — đỉnh cuối cùng của Tầng 6.

### 12.6 Walk-through — averaging vs Sentence-BERT

Cho 2 câu:

```
S1 = "I love eating pizza for dinner"
S2 = "I enjoy having pasta in the evening"
```

Nghĩa rất giống nhau. Tính sentence embedding 2 cách:

**Cách 1 — averaging Word2Vec.** Với mini-embedding (gán bằng tay):

```
emb("love")    = (0.5, 0.6, 0.1)
emb("eating")  = (0.3, 0.7, 0.2)
emb("pizza")   = (0.2, 0.5, 0.8)
emb("dinner")  = (0.4, 0.6, 0.7)
... (bỏ qua "I", "for")
```

`sent(S1) = avg = ((0.5+0.3+0.2+0.4)/4, (0.6+0.7+0.5+0.6)/4, (0.1+0.2+0.8+0.7)/4) = (0.35, 0.6, 0.45)`.

Tương tự $\text{sent}(S_2) \approx (0,40, 0,55, 0,50)$ (giả sử pasta gần pizza, enjoy gần love).

Cosine $\cos(S_1, S_2) \approx 0,98$ — cao, nhưng cũng cao tương đương cho 2 câu "I love eating pizza" và "I love programming pizza" (vô nghĩa) vì cũng dùng cùng từ.

**Cách 2 — Sentence-BERT.** Encode trực tiếp (768D). $\cos(S_1, S_2) \approx 0,85$ — vẫn cao, nhưng cho cặp vô nghĩa $\cos \approx 0,6$. SBERT phân biệt được semantic, không chỉ overlap từ vựng.

### 12.7 Chunking — bước chuẩn bị cho RAG

Trước khi embed, ta phải **chia tài liệu thành đoạn nhỏ** (chunk). Một paper 50 trang sẽ vượt context length của model (8192 token). Quy tắc thực dụng:

- Chunk size: 200-500 token.
- Overlap: 50-100 token (để khái niệm bắc cầu không bị cắt).
- Tránh chia giữa câu (split theo `\n\n` hoặc `\n` trước).

Mỗi chunk → 1 embedding → 1 entry trong vector DB. Đây là input của Lesson 07.

> ⚠ **Lỗi thường gặp.** Đừng dùng cùng 1 model cho cả document embedding và query embedding nếu document được train asymmetric (vd OpenAI `text-embedding-3` thì OK; một số SBERT model thì cần dùng đúng query vs passage embedder).

> 📝 **Tóm tắt mục 12.**
> - Sentence embedding = vector cho cả câu. Cách đơn giản: trung bình word embedding.
> - Sentence-BERT, OpenAI, Cohere cung cấp sentence embedding chất lượng cao.
> - Là input chính cho RAG (Lesson 07) và multimodal (Lesson 08).
> - Chunking là bước tiền xử lý: 200-500 token, overlap 50-100.

---

## 13. Bài tập

### Bài tập 1 — Co-occurrence thủ công

Cho 4 câu:

```
1. cats love fish
2. dogs love bones
3. cats and dogs are pets
4. fish swim in water
```

Vocab = `{cats, love, fish, dogs, bones, and, are, pets, swim, in, water}`. Với window size 1, lập ma trận co-occurrence X (chỉ liệt kê 6 ô khác 0 đầu tiên theo thứ tự alphabet của từ trung tâm). Sau đó tính cosine similarity giữa hàng `cats` và `dogs`.

### Bài tập 2 — Skip-gram softmax

Vocab 3 từ {A, B, C}. Center embedding `h_A = (1, 0)`. Output embedding `w'_A = (0.5, 0.5), w'_B = (1.0, 0.0), w'_C = (0.0, 1.0)`. Tính:

(a) Score $w'_i \cdot h_A$ cho mỗi $i$.
(b) Softmax $P(i \mid A)$ cho mỗi $i$.
(c) Cross-entropy loss nếu context thực tế là B.

### Bài tập 3 — Vector arithmetic

Cho mini embedding 3D:

```
Paris  = (1.0, 2.0, 0.5)
France = (1.0, 1.5, 0.0)
Berlin = (0.9, 2.1, 1.0)
Germany = (0.9, 1.6, 0.5)
Tokyo  = (3.0, 2.5, 4.0)
Japan  = (3.0, 2.0, 3.5)
```

(a) Tính $\text{Paris} - \text{France} + \text{Germany}$. So với Berlin (cosine).
(b) Tính $\text{Tokyo} - \text{Japan} + \text{France}$. Đáp án mong đợi là gì?

### Bài tập 4 — Negative sampling tốc độ

Vocab 100 000 từ, hidden d = 300. Mỗi step training Skip-gram với softmax đầy đủ phải tính bao nhiêu phép nhân (multiplication)? Với negative sampling k = 5 thì bao nhiêu? Tính tỉ số tăng tốc.

### Bài tập 5 — GloVe loss

Cho $X[\text{ice}][\text{solid}] = 1,9 \times 10^4$, $X[\text{steam}][\text{solid}] = 2,2 \times 10^2$. Giả sử embedding hiện tại:

```
w_ice    = (1.0, 0.5)
w_steam  = (0.2, 1.0)
w̃_solid = (0.8, 0.3)
b_ice = 0.1, b_steam = 0.0, b̃_solid = 0.2
x_max = 100, α = 0.75
```

(a) Tính $\log X[\text{ice}][\text{solid}]$ và $\log X[\text{steam}][\text{solid}]$.
(b) Tính dự đoán $w_{\text{ice}} \cdot \tilde{w}_{\text{solid}} + b_{\text{ice}} + \tilde{b}_{\text{solid}}$.
(c) Tính weight $f(X[\text{ice}][\text{solid}])$ (vì $X > x_{\text{max}}$, $f = 1$).
(d) Tính $\text{error}^2$ và loss.

### Bài tập 6 — Đánh giá embedding

Cho 5 cặp `(word1, word2, human_score)`:

| | word1 | word2 | human | cosine của embedding của bạn |
|---|---|---|---|---|
| 1 | dog | cat | 8.5 | 0.78 |
| 2 | car | truck | 7.8 | 0.82 |
| 3 | dog | car | 2.1 | 0.15 |
| 4 | tree | book | 1.5 | 0.32 |
| 5 | king | queen | 9.0 | 0.91 |

Tính **Spearman rank correlation** giữa human và cosine. (Hint: rank cả hai cột, tính Pearson trên rank).

---

## 14. Lời giải chi tiết

### Lời giải 1

Đầu tiên cần liệt kê các cặp co-occurrence với window=1 cho từng câu:

Câu 1 `cats love fish`: (cats, love), (love, cats), (love, fish), (fish, love).
Câu 2 `dogs love bones`: (dogs, love), (love, dogs), (love, bones), (bones, love).
Câu 3 `cats and dogs are pets`: (cats, and), (and, cats), (and, dogs), (dogs, and), (dogs, are), (are, dogs), (are, pets), (pets, are).
Câu 4 `fish swim in water`: (fish, swim), (swim, fish), (swim, in), (in, swim), (in, water), (water, in).

Đếm cho hàng `cats`: (cats, love)=1, (cats, and)=1. Hàng cats = `[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]` (theo thứ tự vocab cats, love, fish, dogs, bones, and, are, pets, swim, in, water).

Hàng `dogs`: (dogs, love)=1, (dogs, and)=1, (dogs, are)=1. = `[0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0]`.

**Cosine sim cats vs dogs:**

```
dot = 0·0 + 1·1 + 0·0 + 0·0 + 0·0 + 1·1 + 0·1 + 0·0 + ... = 2
‖cats‖ = √2 ≈ 1.414
‖dogs‖ = √3 ≈ 1.732
cos = 2/(1.414·1.732) = 2/2.449 ≈ 0.816
```

Khá cao — distributional hypothesis "đoán" cats ≈ dogs từ chỉ 4 câu. ✓

6 ô khác 0 đầu tiên (alphabet center): (and, cats), (and, dogs), (are, dogs), (are, pets), (bones, love), (cats, and).

### Lời giải 2

(a) Scores:

```
w'_A · h_A = (0.5)(1) + (0.5)(0) = 0.5
w'_B · h_A = (1.0)(1) + (0.0)(0) = 1.0
w'_C · h_A = (0.0)(1) + (1.0)(0) = 0.0
```

(b) Softmax:

```
e^0.5 = 1.649
e^1.0 = 2.718
e^0.0 = 1.000
Sum   = 5.367

P(A | A) = 1.649/5.367 = 0.307
P(B | A) = 2.718/5.367 = 0.506
P(C | A) = 1.000/5.367 = 0.186
```

(c) Loss $= -\log P(B \mid A) = -\log(0,506) = 0,681$.

### Lời giải 3

(a) $\text{Paris} - \text{France} + \text{Germany}$:

```
= (1.0−1.0+0.9, 2.0−1.5+1.6, 0.5−0.0+0.5)
= (0.9, 2.1, 1.0)
```

So với Berlin `(0.9, 2.1, 1.0)` — **bằng đúng**! Cosine = 1.0.

(b) $\text{Tokyo} - \text{Japan} + \text{France}$:

```
= (3.0−3.0+1.0, 2.5−2.0+1.5, 4.0−3.5+0.0)
= (1.0, 2.0, 0.5)
```

So với Paris `(1.0, 2.0, 0.5)` — bằng đúng Paris! Đáp án mong đợi: **Paris** (thủ đô của Pháp), khi đi từ "capital of Japan" trừ Japan + France.

### Lời giải 4

**Softmax đầy đủ.** Mỗi step:

- Lookup hidden: `h = W[i]`, không nhân (vì one-hot).
- Output: dot product `h` với mỗi hàng `W'[j]`, j = 1..|V|. Mỗi dot $= d$ phép nhân. Tổng $= |V| \cdot d = 100\,000 \times 300 = 3 \cdot 10^7$ phép nhân.

(Có thêm exp + sum cho softmax nhưng đó là O(|V|), bỏ qua.)

**Negative sampling k=5.** Mỗi step:

- 1 cặp dương + 5 cặp âm = 6 dot product $d$. Tổng $= 6 \cdot d = 1800$ phép nhân.

**Tỉ số tăng tốc** $= 3 \cdot 10^7 / 1800 \approx 16\,667$ lần. ✓

### Lời giải 5

(a) $\log X[\text{ice}][\text{solid}] = \log(1,9 \cdot 10^4) = \log(19000) \approx 9,852$.

$\log X[\text{steam}][\text{solid}] = \log(220) \approx 5,394$.

(b) Dự đoán $w_{\text{ice}} \cdot \tilde{w}_{\text{solid}} + b_{\text{ice}} + \tilde{b}_{\text{solid}}$:

```
w_ice · w̃_solid = 1.0·0.8 + 0.5·0.3 = 0.8 + 0.15 = 0.95
+ b_ice + b̃_solid = 0.1 + 0.2 = 0.3
Tổng = 0.95 + 0.3 = 1.25
```

(c) Weight: $X[\text{ice}][\text{solid}] = 19000 > x_{\text{max}} = 100$ → $f = 1$.

(d) Error $= 1,25 - 9,852 = -8,602$. $\text{Error}^2 = 73,99$. Loss $= 1 \cdot 73,99 = 73,99$.

Loss rất to → embedding hiện tại chưa khớp; gradient descent sẽ điều chỉnh.

### Lời giải 6

Rank human (8.5=2, 7.8=3, 2.1=4, 1.5=5, 9.0=1):

| | human | rank_h |
|---|---|---|
| 1 | 8.5 | 2 |
| 2 | 7.8 | 3 |
| 3 | 2.1 | 4 |
| 4 | 1.5 | 5 |
| 5 | 9.0 | 1 |

Rank cosine (0.78=3, 0.82=2, 0.15=5, 0.32=4, 0.91=1):

| | cos | rank_c |
|---|---|---|
| 1 | 0.78 | 3 |
| 2 | 0.82 | 2 |
| 3 | 0.15 | 5 |
| 4 | 0.32 | 4 |
| 5 | 0.91 | 1 |

Spearman = Pearson correlation giữa rank_h và rank_c. Trung bình rank_h = rank_c = 3.

```
deviation rank_h: -1, 0, 1, 2, -2
deviation rank_c: 0, -1, 2, 1, -2

cov = ((-1)(0) + (0)(-1) + (1)(2) + (2)(1) + (-2)(-2)) / 5
    = (0 + 0 + 2 + 2 + 4)/5 = 8/5 = 1.6
var = ((-1)² + 0² + 1² + 2² + (-2)²)/5 = (1+0+1+4+4)/5 = 10/5 = 2.0
sd  = √2 ≈ 1.414

Spearman = 1.6 / (1.414·1.414) = 1.6/2.0 = 0.8
```

Spearman = 0.8 → embedding "đồng ý" mạnh với người. ✓

---

## 15. Liên hệ và bước tiếp theo

- **Lesson 05** (Text vectorization): nền BoW/TF-IDF mà Lesson 06 vượt qua.
- **Lesson 04** (Neural network): Skip-gram = NN nhỏ, dùng softmax + cross-entropy của Lesson 03/04.
- **Tầng 4 Lesson 08** (SVD): GloVe ≈ weighted matrix factorization, cùng "họ" với SVD.
- **Tầng 5 Lesson 06** (Cross-entropy): loss của Skip-gram.
- **Lesson 07 (sắp tới)**: Vector database + RAG — dùng sentence embedding làm input.
- **Lesson 08 (sắp tới)**: CLIP — multimodal embedding (ảnh + text cùng không gian).

## Tài liệu tham khảo

- Mikolov et al. 2013, *"Efficient Estimation of Word Representations in Vector Space"* (Word2Vec paper).
- Mikolov et al. 2013, *"Distributed Representations of Words and Phrases and their Compositionality"* (Negative sampling).
- Pennington, Socher, Manning 2014, *"GloVe: Global Vectors for Word Representation"*.
- Levy & Goldberg 2014, *"Neural Word Embedding as Implicit Matrix Factorization"*.
- Firth 1957, *"A synopsis of linguistic theory 1930-1955"* (Distributional hypothesis).
- van der Maaten & Hinton 2008, *"Visualizing Data using t-SNE"*.
- McInnes, Healy, Melville 2018, *"UMAP: Uniform Manifold Approximation and Projection"*.
- Reimers & Gurevych 2019, *"Sentence-BERT"*.

## File liên quan

- [`visualization.html`](./visualization.html) — 4 component tương tác: distributional viewer, vector arithmetic, t-SNE preset, mini skip-gram trainer.
