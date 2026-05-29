// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: AI-ML/lesson-05-text-vectorization/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Text vectorization cổ điển: One-hot, Bag-of-Words, TF-IDF

> **Tầng 6 — AI/ML**, bài 5/8. Chuyển từ "dữ liệu số đẹp" (Lesson 02-04) sang **dữ liệu văn bản** — thứ mà model không hiểu trực tiếp.

## 1. Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Hiểu **vì sao** ML model cần biến text → vector (input của mọi layer đều là số).
2. Phân biệt 3 mức **tokenization**: word-level, character-level, subword (BPE / WordPiece).
3. Cài bằng tay được **One-hot encoding** và biết tại sao nó tệ cho text dài.
4. Tính được **Bag-of-Words (BoW)** cho một corpus nhỏ, hiểu rằng BoW vứt thứ tự.
5. Cài bằng tay **TF-IDF**: TF, DF, IDF, TF-IDF, và lý giải vì sao TF-IDF "phạt từ phổ biến, thưởng từ riêng".
6. Mở rộng sang **n-gram** để giữ context cục bộ.
7. Dùng **cosine similarity** trên TF-IDF để xây một **search engine** mini.
8. Nêu được **3 hạn chế** của vectorization cổ điển — cái neo để Lesson 06 (Word Embeddings) giải quyết.

## 2. Prerequisites

Bạn cần đã nắm vững các bài này (nếu quên, mở lại tab):

- **Vector và dot product**: [\`../../04-LinearAlgebra/lesson-02-dot-product/\`](../../04-LinearAlgebra/lesson-02-dot-product/) — cosine similarity giữa 2 doc về bản chất là dot product chuẩn hoá.
- **Norm L2**: [\`../../04-LinearAlgebra/lesson-01-vector-basics/\`](../../04-LinearAlgebra/lesson-01-vector-basics/) — để chuẩn hoá vector TF-IDF.
- **Logarit**: [\`../../01-Algebra/lesson-07-exponent-log/\`](../../01-Algebra/lesson-07-exponent-log/) — IDF dùng \`log\`.
- **Pipeline ML**: [\`../lesson-01-ml-pipeline/\`](../lesson-01-ml-pipeline/) — vectorization chính là bước "feature engineering" trong pipeline.

> 💡 **Trực giác mở đầu**. Trong Lesson 02 (linear regression), input của bạn là số đẹp: tuổi = 25, lương = 12, kinh nghiệm = 3. Bạn có thể cho thẳng vào \`y = w·x + b\`. Nhưng nếu input là câu *"Hôm nay trời đẹp"* thì sao? Phép nhân \`w · "Hôm nay trời đẹp"\` không tồn tại. Bài này dạy 3 cách biến chuỗi ký tự thành **vector số** — bước "không thể bỏ qua" để ML đụng được vào ngôn ngữ.

---

## 3. Vấn đề: ML model chỉ ăn số

### 3.1. Tại sao bắt buộc phải vectorize?

Quay lại pipeline ML từ Lesson 01:

\`\`\`
data → feature vector x → model f(x; w) → prediction ŷ → loss → gradient → update w
\`\`\`

Mọi phép toán trong \`f\` đều là **tuyến tính + phi tuyến** trên **số thực**: cộng, nhân ma trận, ReLU, sigmoid... Không có chỗ nào "nhân ma trận với chuỗi ký tự". Vậy nên **trước khi đưa text vào model, ta phải có hàm**:

$$\\text{vectorize}: \\text{text} \\to \\mathbb{R}^d$$

biến mỗi câu / mỗi từ thành một vector \`d\` chiều. Bài này giới thiệu 3 cách cổ điển: **one-hot**, **BoW**, **TF-IDF**. Lesson 06 sẽ giới thiệu cách "hiện đại" hơn (embedding).

### 3.2. Câu hỏi mở: vectorize "Hôm nay trời đẹp" thế nào?

Có ít nhất 4 quyết định phải đưa ra:

1. **Đơn vị (token) là gì?** Cả câu, từng từ, từng ký tự, hay từng subword?
2. **Vocab của ta gồm những gì?** Toàn bộ tiếng Việt? Chỉ corpus train?
3. **Vector mỗi token thế nào?** Một số nguyên, một vector dài V chiều, hay một vector dày 300 chiều?
4. **Vector cả câu (document) thế nào?** Gộp các token bằng cách nào?

3 phương pháp dưới đây trả lời 4 câu trên theo cách khác nhau.

> ❓ **"Tại sao không cứ map mỗi từ thành một số nguyên — alice=1, bob=2 — rồi xong?"**
>
> Vì với model toán học (linear, neural), số nguyên gánh **thứ tự** và **khoảng cách**. Nếu \`alice=1, bob=2, cat=3\`, model sẽ tự "hiểu" rằng \`cat - bob = bob - alice\` (cat xa alice gấp đôi xa bob), điều này vô nghĩa với từ vựng. Đó là lý do one-hot xuất hiện: mỗi từ thành vector riêng, không từ nào "gần" từ nào.

---

## 4. Tokenization — bước 0 của mọi pipeline NLP

**Token** là đơn vị nhỏ nhất bạn quyết định coi là "1 đơn vị nghĩa" để vectorize.

### 4.1. Word-level (split theo khoảng trắng / dấu câu)

Cách đơn giản nhất: cắt theo space, lowercase, bỏ dấu câu.

**Ví dụ 1.**

\`\`\`
Input : "Hôm nay trời đẹp."
Tokens: ["hôm", "nay", "trời", "đẹp"]
\`\`\`

**Ví dụ 2.**

\`\`\`
Input : "Tôi ăn cơm. Anh ăn phở!"
Tokens: ["tôi", "ăn", "cơm", "anh", "ăn", "phở"]
\`\`\`

**Ưu**: nhanh, dễ hiểu, vocab gọn.

**Nhược**:
- Tiếng Việt **không bị space tách từ** đúng như tiếng Anh: "máy tính" là 1 từ, nhưng split theo space sẽ ra \`["máy", "tính"]\`. Để tách đúng cần thư viện chuyên dụng (\`vncorenlp\`, \`underthesea\`).
- **Out-of-vocabulary (OOV)**: từ chưa thấy lúc train (vd "covid", "blockchain") → không có vector, phải dùng \`<UNK>\`.

### 4.2. Character-level

Token = 1 ký tự. Vocab cực nhỏ (~100 cho ASCII, ~200 cho tiếng Việt có dấu).

\`\`\`
Input : "đẹp"
Tokens: ["đ", "ẹ", "p"]
\`\`\`

**Ưu**: không bao giờ OOV.

**Nhược**: chuỗi dài (1 câu → 50–100 token), model phải "học cách ghép chữ thành nghĩa" — tốn rất nhiều tham số.

### 4.3. Subword: BPE và WordPiece

Trung gian giữa word và char. Ý tưởng: gộp các chuỗi ký tự **xuất hiện nhiều** thành 1 token.

**Byte-Pair Encoding (BPE)** — thuật toán dùng cho GPT:
1. Bắt đầu vocab = mọi ký tự.
2. Đếm cặp ký tự liền nhau xuất hiện nhiều nhất → gộp thành token mới.
3. Lặp đến khi vocab đạt kích thước mong muốn (vd 50k).

**Ví dụ**: với corpus \`["low", "lower", "lowest"]\`, BPE sẽ học \`"lo"\`, \`"low"\`, \`"er"\`, \`"est"\` thành token, vì các chuỗi này xuất hiện lặp lại.

\`\`\`
Input : "lower"
Tokens (BPE đã train): ["low", "er"]
\`\`\`

**WordPiece** (BERT) tương tự, khác ở tiêu chí chọn cặp gộp (dùng likelihood thay vì tần suất).

**Ưu**: vừa gọn (~50k vocab), vừa không OOV (từ lạ luôn cắt được thành các subword đã biết).

**Nhược**: cần train tokenizer trước — không thuần "split string".

### 4.4. Walk-through 3 câu tiếng Việt

Giả sử ta lowercase + bỏ dấu câu trước, rồi split theo space:

| Câu | Word-level | Char-level (rút gọn) |
|-----|------------|----------------------|
| "Hôm nay trời đẹp." | \`["hôm","nay","trời","đẹp"]\` (4 token) | \`["h","ô","m"," ","n","a","y"," ",...]\` (~20 token) |
| "Tôi yêu Hà Nội." | \`["tôi","yêu","hà","nội"]\` (4 token) | \`["t","ô","i"," ","y","ê","u",...]\` (~15 token) |
| "Học máy là vui." | \`["học","máy","là","vui"]\` (4 token) | \`["h","ọ","c"," ","m","á","y",...]\` (~14 token) |

Tổng **vocab word-level** từ 3 câu: \`{hôm, nay, trời, đẹp, tôi, yêu, hà, nội, học, máy, là, vui}\` = **12 từ**.

> ⚠ **Lỗi thường gặp**. Coi tokenization là "bước trivial". Thực tế, tokenizer tệ → model tệ. Sai phổ biến: quên lowercase ("Hôm" và "hôm" thành 2 token khác nhau), quên bỏ dấu câu ("đẹp." vs "đẹp" thành 2 token), tách sai "máy tính".

> 📝 **Tóm tắt mục 4**.
> - Word-level: nhanh, OOV cao.
> - Char-level: không OOV, chuỗi dài.
> - Subword (BPE/WordPiece): chuẩn công nghiệp hiện nay.
> - Tiếng Việt cần thư viện tách từ riêng vì space ≠ ranh giới từ.

---

## 5. One-hot encoding — vector "đơn vị" cho mỗi token

### 5.1. Định nghĩa

Cho **vocab** \`V = [w_1, w_2, ..., w_V]\` (cố định thứ tự). Mỗi từ \`w_i\` thành vector V-chiều:

$$\\text{one-hot}(w_i) = \\underbrace{[0, 0, \\ldots, 0, \\underbrace{1}_{\\text{vị trí } i}, 0, \\ldots, 0]}_{V \\text{ phần tử}}$$

Đúng 1 vị trí có giá trị 1 (vị trí của từ trong vocab), còn lại = 0.

### 5.2. Ví dụ chi tiết với vocab 5 từ

Vocab: \`V = ["tôi", "yêu", "học", "máy", "tính"]\` (V = 5, index từ 0).

| Từ | Index | One-hot vector |
|----|-------|----------------|
| \`tôi\` | 0 | \`[1, 0, 0, 0, 0]\` |
| \`yêu\` | 1 | \`[0, 1, 0, 0, 0]\` |
| \`học\` | 2 | \`[0, 0, 1, 0, 0]\` |
| \`máy\` | 3 | \`[0, 0, 0, 1, 0]\` |
| \`tính\` | 4 | \`[0, 0, 0, 0, 1]\` |

**Ví dụ tính dot product** (đo độ tương đồng theo Lesson \`04-LinearAlgebra/lesson-02-dot-product\`):

- \`tôi · yêu = 1·0 + 0·1 + 0·0 + 0·0 + 0·0 = 0\`
- \`tôi · tôi = 1·1 + ... = 1\`
- \`học · máy = 0\`
- \`máy · tính = 0\`

**Mọi cặp từ khác nhau đều dot = 0**, tức **vuông góc**. Đây là tính chất quan trọng nhất (và cũng là hạn chế lớn nhất) của one-hot.

### 5.3. Vector cho cả câu

Một câu = tập các one-hot. Có 2 cách "gộp":

1. **Tổng (sum)**: cộng các one-hot lại → đếm tần suất → ra **Bag-of-Words** (mục 6).
2. **Concatenate (xếp nối)**: giữ thứ tự, nhưng độ dài thay đổi theo câu → không tiện cho model.

Trong thực tế one-hot **không** dùng đứng một mình để biểu diễn câu — nó là **input layer của embedding** (xem Lesson 06).

### 5.4. Walk-through 4 ví dụ one-hot

Cùng vocab \`["the","cat","sits","on","mat"]\` (V=5).

**Ví dụ A**: \`"cat"\` → vị trí 1 → \`[0,1,0,0,0]\`.

**Ví dụ B**: \`"the"\` → vị trí 0 → \`[1,0,0,0,0]\`.

**Ví dụ C**: \`"mat"\` → vị trí 4 → \`[0,0,0,0,1]\`.

**Ví dụ D** (từ ngoài vocab): \`"dog"\` → không có index → thường map thành \`<UNK>\` (cần thêm 1 vị trí cho UNK, thành V+1 chiều) hoặc bỏ qua.

### 5.5. Vấn đề của one-hot

1. **Cao chiều và thưa**: vocab 50k → mỗi từ là vector 50k chiều, 49,999 số 0 và 1 số 1. Lưu trữ + tính toán cực tốn (dù sparse format giúp).
2. **Không biểu diễn semantic similarity**: \`cat · dog = 0\`, \`cat · table = 0\`, \`cat · cat = 1\`. Model không biết "cat gần dog hơn table".
3. **Không capture được thứ tự** (khi gộp tổng): "dog bites man" và "man bites dog" cho ra cùng tổng.

> ❓ **"Vậy one-hot có còn dùng không?"**
>
> Có, nhưng **gián tiếp**: trong neural network, layer đầu tiên \`Embedding(V, d)\` về bản chất là phép nhân \`one-hot · W\` với \`W ∈ R^{V×d}\`. Nhân one-hot với ma trận = chọn 1 hàng của ma trận. One-hot vẫn là "khái niệm trừu tượng" để định nghĩa embedding, nhưng ta không bao giờ tạo vector one-hot trong RAM — chỉ lưu **index**.

> 📝 **Tóm tắt mục 5**. One-hot = vector V-chiều đúng 1 vị trí = 1. Đơn giản, dễ hiểu, nhưng vuông góc mọi cặp và cực thưa. Là viên gạch nền để build BoW/embedding sau này.

---

## 6. Bag-of-Words (BoW) — đếm từ trong document

### 6.1. Định nghĩa

Document \`d\` được biểu diễn bằng vector \`V\` chiều, mỗi chiều = **số lần xuất hiện** của từ tương ứng trong \`d\`.

$$\\text{BoW}(d)_i = \\text{count}(w_i, d)$$

Tương đương: BoW = tổng các one-hot của các token trong \`d\`.

### 6.2. Vì sao gọi là "Bag"?

Vì nó coi document như một **túi từ** (multiset) — chỉ quan tâm "có từ gì, mỗi từ bao nhiêu lần", **không quan tâm thứ tự**.

> 💡 **Trực giác**. Hình dung mỗi câu là một cái túi: bạn đổ tất cả các từ vào. Lúc lấy ra, bạn chỉ thấy "trong túi có 3 từ 'the', 2 từ 'cat', 1 từ 'sat'", chứ không thấy chúng nằm theo thứ tự nào.

### 6.3. Walk-through với 3 documents

Cho 3 doc nhỏ:

- \`d1 = "the cat sat on the mat"\`
- \`d2 = "the dog sat on the log"\`
- \`d3 = "cat and dog are friends"\`

**Bước 1 — Tokenize + lowercase + bỏ dấu câu** (đã lowercase):

| Doc | Tokens |
|-----|--------|
| d1 | \`[the, cat, sat, on, the, mat]\` |
| d2 | \`[the, dog, sat, on, the, log]\` |
| d3 | \`[cat, and, dog, are, friends]\` |

**Bước 2 — Xây vocab** (union, sắp xếp alphabet):

\`\`\`
V = [and, are, cat, dog, friends, log, mat, on, sat, the]
    (V = 10 từ)
\`\`\`

**Bước 3 — Đếm tần suất từng từ trong từng doc**:

| Từ \\ Doc | d1 | d2 | d3 |
|----------|----|----|----|
| and      | 0  | 0  | 1  |
| are      | 0  | 0  | 1  |
| cat      | 1  | 0  | 1  |
| dog      | 0  | 1  | 1  |
| friends  | 0  | 0  | 1  |
| log      | 0  | 1  | 0  |
| mat      | 1  | 0  | 0  |
| on       | 1  | 1  | 0  |
| sat      | 1  | 1  | 0  |
| the      | 2  | 2  | 0  |

**Bước 4 — Vector BoW**:

\`\`\`
BoW(d1) = [0, 0, 1, 0, 0, 0, 1, 1, 1, 2]
BoW(d2) = [0, 0, 0, 1, 0, 1, 0, 1, 1, 2]
BoW(d3) = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
\`\`\`

### 6.4. Kiểm tra: dot product giữa d1 và d2

Theo Lesson 04-LinearAlgebra/lesson-02-dot-product:

\`\`\`
d1 · d2 = 0·0 + 0·0 + 1·0 + 0·1 + 0·0 + 0·1 + 1·0 + 1·1 + 1·1 + 2·2
        = 0 + 0 + 0 + 0 + 0 + 0 + 0 + 1 + 1 + 4
        = 6
\`\`\`

\`d1 · d3 = 0+0+1+0+0+0+0+0+0+0 = 1\` (chỉ chung từ \`cat\`).

\`d2 · d3 = 0+0+0+1+0+0+0+0+0+0 = 1\` (chỉ chung từ \`dog\`).

**Quan sát**: d1 và d2 "giống nhau" hơn d3, đúng trực giác (d1+d2 đều nói về \`sat on the\`...).

### 6.5. Vấn đề: BoW vứt thứ tự

**Ví dụ phản chứng kinh điển**:

- \`"dog bites man"\` → BoW = \`[1, 1, 1]\` với vocab \`[bites, dog, man]\`.
- \`"man bites dog"\` → BoW = \`[1, 1, 1]\` với cùng vocab.

**Hai câu có nghĩa hoàn toàn khác nhau, nhưng vector BoW giống hệt.** Đây là hạn chế lớn — bài 4.7 (n-gram) sẽ giảm bớt một phần.

> ⚠ **Lỗi thường gặp**. Quên rằng BoW lưu **count** chứ không phải **có/không**. Một số tài liệu gọi "binary BoW" (chỉ 0/1 dù từ xuất hiện 5 lần) là biến thể, không phải mặc định.

> 🔁 **Dừng lại tự kiểm tra**.
>
> Cho vocab \`[a, b, c]\` và doc \`"a c a a b"\`. BoW = ?
>
> <details><summary>Đáp án</summary>
> Đếm: a xuất hiện 3 lần, b 1 lần, c 1 lần → BoW = \`[3, 1, 1]\`.
> </details>

> 📝 **Tóm tắt mục 6**. BoW(d) = vector đếm tần suất, V chiều. Là tổng các one-hot. Mất thứ tự, không biểu diễn semantic, nhưng đơn giản và là baseline cho nhiều bài classification (spam, sentiment).

---

## 7. TF-IDF — sửa BoW: phạt từ phổ biến, thưởng từ riêng

### 7.1. Vì sao cần TF-IDF?

BoW có một sai lầm rõ rệt: **từ phổ biến (the, là, của) xuất hiện ở mọi doc → BoW gán count cao cho chúng → chiếm trọng số lớn**, nhưng những từ đó không phân biệt được doc nào với doc nào.

Trực giác:
- Nếu từ \`the\` xuất hiện trong **100%** doc, nó **không mang thông tin** để phân biệt → trọng số phải nhỏ.
- Nếu từ \`mitochondria\` chỉ xuất hiện trong **1/1000** doc, nó **rất phân biệt** → trọng số phải lớn.

TF-IDF mã hoá đúng intuition này: nhân TF (Term Frequency) với IDF (Inverse Document Frequency).

### 7.2. Term Frequency (TF)

TF đo "trong doc d, từ t xuất hiện nhiều hay ít". Có 2 biến thể phổ biến:

1. **Raw count**: \`TF(t, d) = count(t, d)\`.
2. **Normalized**: \`TF(t, d) = count(t, d) / |d|\` với \`|d|\` là tổng số token trong d. Cách này tránh bias do doc dài.

Mặc định trong bài này ta dùng **normalized** (chia cho độ dài doc).

### 7.3. Document Frequency (DF) và Inverse Document Frequency (IDF)

- \`DF(t)\` = **số document** chứa từ \`t\` (không quan tâm xuất hiện bao nhiêu lần trong mỗi doc).
- \`IDF(t) = log(N / DF(t))\` với \`N\` = tổng số doc.

Một số biến thể thêm \`+1\` chống chia 0 hoặc dùng \`ln\` thay \`log10\`. Bài này dùng \`log\` cơ số 10 (dễ tính tay) và **không** smooth:

$$\\text{IDF}(t) = \\log_{10}\\!\\left(\\frac{N}{\\text{DF}(t)}\\right)$$

**Ví dụ với N=4**:

| DF(t) | N/DF | IDF = log10(N/DF) |
|-------|------|-------------------|
| 4     | 1    | log(1) = **0**     |
| 2     | 2    | log(2) ≈ **0.301** |
| 1     | 4    | log(4) ≈ **0.602** |

→ Từ xuất hiện ở **mọi doc** (\`DF=N\`) bị "cấm" với IDF = 0. Từ chỉ xuất hiện ở 1/4 doc có IDF cao nhất.

### 7.4. Công thức TF-IDF

$$\\text{TF-IDF}(t, d) = \\text{TF}(t, d) \\times \\text{IDF}(t)$$

Vector TF-IDF của doc d = vector V chiều, mỗi chiều là \`TF-IDF(w_i, d)\`.

### 7.5. Walk-through chi tiết với 4 docs, vocab 6 từ

**Corpus**:

- \`d1 = "cat sat mat"\` — 3 token
- \`d2 = "dog sat log"\` — 3 token
- \`d3 = "cat cat dog"\` — 3 token
- \`d4 = "the cat the dog the"\` — 5 token

\`N = 4\`.

**Bước 1 — Vocab** (sắp xếp alphabet):

\`\`\`
V = [cat, dog, log, mat, sat, the]
    (V=6, index 0..5)
\`\`\`

**Bước 2 — Đếm count(t, d)**:

| t \\ d | d1 | d2 | d3 | d4 |
|-------|----|----|----|----|
| cat   | 1  | 0  | 2  | 1  |
| dog   | 0  | 1  | 1  | 1  |
| log   | 0  | 1  | 0  | 0  |
| mat   | 1  | 0  | 0  | 0  |
| sat   | 1  | 1  | 0  | 0  |
| the   | 0  | 0  | 0  | 3  |

**Bước 3 — TF (normalized: count / |d|)**.

\`|d1|=3, |d2|=3, |d3|=3, |d4|=5\`.

| t \\ d | TF(d1) | TF(d2) | TF(d3) | TF(d4) |
|-------|--------|--------|--------|--------|
| cat   | 1/3 ≈ 0.333 | 0     | 2/3 ≈ 0.667 | 1/5 = 0.200 |
| dog   | 0           | 1/3 ≈ 0.333 | 1/3 ≈ 0.333 | 1/5 = 0.200 |
| log   | 0           | 1/3 ≈ 0.333 | 0          | 0           |
| mat   | 1/3 ≈ 0.333 | 0          | 0          | 0           |
| sat   | 1/3 ≈ 0.333 | 1/3 ≈ 0.333 | 0          | 0           |
| the   | 0           | 0          | 0          | 3/5 = 0.600 |

**Bước 4 — DF(t)**:

| t   | DF | docs chứa t   |
|-----|----|---------------|
| cat | 3  | d1, d3, d4    |
| dog | 3  | d2, d3, d4    |
| log | 1  | d2            |
| mat | 1  | d1            |
| sat | 2  | d1, d2        |
| the | 1  | d4            |

**Bước 5 — IDF = log10(N/DF) với N=4**:

| t   | N/DF | IDF                |
|-----|------|--------------------|
| cat | 4/3 ≈ 1.333 | log10(1.333) ≈ **0.125** |
| dog | 4/3 ≈ 1.333 | **0.125**          |
| log | 4/1 = 4      | log10(4) ≈ **0.602**     |
| mat | 4            | **0.602**          |
| sat | 4/2 = 2      | log10(2) ≈ **0.301**     |
| the | 4            | **0.602**          |

**Quan sát**: \`cat\` và \`dog\` xuất hiện ở 3/4 doc → IDF thấp (0.125). \`log, mat, the\` chỉ xuất hiện ở 1 doc → IDF cao nhất (0.602).

**Bước 6 — TF-IDF(t,d) = TF(t,d) · IDF(t)**:

| t \\ d | TF-IDF(d1) | TF-IDF(d2) | TF-IDF(d3) | TF-IDF(d4) |
|-------|------------|------------|------------|------------|
| cat   | 0.333 × 0.125 ≈ **0.0417** | 0           | 0.667 × 0.125 ≈ **0.0833** | 0.200 × 0.125 = **0.0250** |
| dog   | 0           | 0.333 × 0.125 ≈ **0.0417** | 0.333 × 0.125 ≈ **0.0417** | 0.200 × 0.125 = **0.0250** |
| log   | 0           | 0.333 × 0.602 ≈ **0.2007** | 0           | 0           |
| mat   | 0.333 × 0.602 ≈ **0.2007** | 0           | 0           | 0           |
| sat   | 0.333 × 0.301 ≈ **0.1003** | 0.333 × 0.301 ≈ **0.1003** | 0           | 0           |
| the   | 0           | 0           | 0           | 0.600 × 0.602 ≈ **0.3612** |

**Vector TF-IDF của mỗi doc** (theo thứ tự \`[cat, dog, log, mat, sat, the]\`):

\`\`\`
TFIDF(d1) ≈ [0.042, 0.000, 0.000, 0.201, 0.100, 0.000]
TFIDF(d2) ≈ [0.000, 0.042, 0.201, 0.000, 0.100, 0.000]
TFIDF(d3) ≈ [0.083, 0.042, 0.000, 0.000, 0.000, 0.000]
TFIDF(d4) ≈ [0.025, 0.025, 0.000, 0.000, 0.000, 0.361]
\`\`\`

**Phân tích kết quả**:
- d1 nổi bật ở \`mat\` (0.201) và \`sat\` (0.100) — đúng vì đây là 2 từ "đặc trưng" của d1.
- d2 nổi bật ở \`log\` (0.201) và \`sat\` (0.100).
- d3 chỉ nổi \`cat\` (do count = 2).
- d4 cực kỳ nổi \`the\` (0.361) — vì d4 lặp \`the\` đến 3 lần.

> ❓ **"Tại sao 'the' trong d4 lại có TF-IDF cao? Tưởng từ phổ biến phải bị phạt?"**
>
> Trong corpus này, \`the\` chỉ xuất hiện ở **1 doc duy nhất (d4)** → DF = 1 → IDF cao. Trong corpus thật, \`the\` sẽ xuất hiện ở **hầu hết** doc → DF ≈ N → IDF ≈ 0. Toy example 4 doc chưa đủ để bộc lộ hành vi "phạt the". Trong thực tế, ta thường có stoplist (\`the, a, is, ...\`) loại bỏ trước khi tính TF-IDF.

> ⚠ **Lỗi thường gặp**.
> 1. Nhầm IDF là "tần suất ngược trong doc" — không, nó là **inverse document frequency**, đếm theo **doc** chứ không theo token.
> 2. Quên log → IDF bị thổi phồng cho từ hiếm.
> 3. Không normalize TF → doc dài có TF lớn bất công.
> 4. Tự "thêm 1" vào DF mà không nói (smoothing) → kết quả số khác sách.

> 🔁 **Dừng lại tự kiểm tra**.
>
> Với corpus trên, nếu thêm \`d5 = "cat dog the"\` (3 token), \`DF(the)\` bằng bao nhiêu? IDF(the) đổi thế nào?
>
> <details><summary>Đáp án</summary>
> DF(the) = 2 (d4 và d5). N = 5. IDF(the) = log10(5/2) = log10(2.5) ≈ 0.398. Giảm so với 0.602 trước đây vì 'the' không còn "độc quyền" cho 1 doc.
> </details>

> 📝 **Tóm tắt mục 7**.
> - TF đo "có nhiều trong doc này không".
> - IDF đo "có hiếm trong cả corpus không".
> - Tích TF·IDF: cao khi từ vừa nhiều trong doc vừa hiếm toàn corpus → đặc trưng cho doc đó.

---

## 8. N-grams — vá lỗi "mất thứ tự" của BoW

### 8.1. Định nghĩa

**N-gram** = chuỗi N token liên tiếp. Thay vì token đơn lẻ, ta dùng cặp (bigram), bộ ba (trigram), v.v. làm "từ" trong vocab.

**Ví dụ**: \`"dog bites man"\` với:

- **Unigram** (N=1): \`[dog, bites, man]\`
- **Bigram** (N=2): \`[dog bites, bites man]\`
- **Trigram** (N=3): \`[dog bites man]\`

Câu \`"man bites dog"\`:

- **Bigram**: \`[man bites, bites dog]\` — **khác hoàn toàn** bigram của câu trước.

→ BoW trên bigram **phân biệt được** "dog bites man" vs "man bites dog". Đó là cách n-gram vá lỗi mất thứ tự.

### 8.2. Walk-through với 2 doc

- \`d1 = "tôi yêu mèo"\` → bigram: \`[tôi yêu, yêu mèo]\`
- \`d2 = "mèo yêu tôi"\` → bigram: \`[mèo yêu, yêu tôi]\`

Vocab bigram: \`[mèo yêu, tôi yêu, yêu mèo, yêu tôi]\`.

| bigram \\ doc | d1 | d2 |
|--------------|----|----|
| mèo yêu      | 0  | 1  |
| tôi yêu      | 1  | 0  |
| yêu mèo      | 1  | 0  |
| yêu tôi      | 0  | 1  |

BoW unigram (\`tôi, yêu, mèo\`) cho cả hai doc đều là \`[1,1,1]\` — giống nhau. BoW bigram phân biệt được.

### 8.3. Trade-off

- **Ưu**: giữ context cục bộ (2-3 từ).
- **Nhược**: vocab nổ. Nếu vocab unigram là V, thì bigram có thể lên tới V² (thực tế ít hơn nhiều, nhưng vẫn lớn).

Trong thực tế thường dùng **unigram + bigram** kết hợp (kéo dài vector nhưng cải thiện rõ rệt cho classification).

> 📝 **Tóm tắt mục 8**. N-gram = token-of-N-words. Bigram là minimum để phân biệt thứ tự.

---

## 9. Cosine similarity trên TF-IDF — đo độ giống nhau giữa documents

### 9.1. Nhắc lại từ Tầng 4

Cosine similarity giữa 2 vector \`u, v ≠ 0\`:

$$\\cos(u, v) = \\frac{u \\cdot v}{\\|u\\| \\cdot \\|v\\|} \\in [-1, 1]$$

Với vector tần suất / TF-IDF, mọi giá trị ≥ 0 nên \`cos ∈ [0, 1]\`. \`1\` = giống hệt hướng, \`0\` = vuông góc (không chia sẻ từ nào sau khi cân nhắc IDF).

Xem chi tiết: [\`../../04-LinearAlgebra/lesson-02-dot-product/\`](../../04-LinearAlgebra/lesson-02-dot-product/).

### 9.2. Walk-through: cosine giữa d1, d2, d3, d4 (từ mục 7)

Lấy lại các vector TF-IDF:

\`\`\`
TFIDF(d1) ≈ [0.042, 0.000, 0.000, 0.201, 0.100, 0.000]
TFIDF(d2) ≈ [0.000, 0.042, 0.201, 0.000, 0.100, 0.000]
TFIDF(d3) ≈ [0.083, 0.042, 0.000, 0.000, 0.000, 0.000]
TFIDF(d4) ≈ [0.025, 0.025, 0.000, 0.000, 0.000, 0.361]
\`\`\`

**Norm L2** (làm tròn):

- \`||d1|| = √(0.042² + 0.201² + 0.100²) = √(0.00176 + 0.04040 + 0.01000) = √0.05216 ≈ 0.228\`
- \`||d2|| = √(0.042² + 0.201² + 0.100²) ≈ 0.228\`
- \`||d3|| = √(0.083² + 0.042²) = √(0.00689 + 0.00176) = √0.00865 ≈ 0.0930\`
- \`||d4|| = √(0.025² + 0.025² + 0.361²) = √(0.00063 + 0.00063 + 0.13032) ≈ 0.362\`

**Dot product**:

- \`d1·d2 = 0 + 0 + 0 + 0 + 0.100·0.100 + 0 = 0.0100\` (chung từ \`sat\`)
- \`d1·d3 = 0.042·0.083 + 0 + ... ≈ 0.00349\`
- \`d1·d4 = 0.042·0.025 + 0 + ... ≈ 0.00105\`
- \`d2·d3 = 0 + 0.042·0.042 + 0 + 0 + 0 + 0 ≈ 0.00176\`
- \`d2·d4 = 0 + 0.042·0.025 + 0 + 0 + 0 + 0 ≈ 0.00105\`
- \`d3·d4 = 0.083·0.025 + 0.042·0.025 + 0 + 0 + 0 + 0 ≈ 0.00313\`

**Cosine**:

| Cặp   | Dot     | ||·|| × ||·||    | Cosine ≈ |
|-------|---------|------------------|----------|
| d1,d2 | 0.0100  | 0.228·0.228 = 0.0520 | **0.192** |
| d1,d3 | 0.00349 | 0.228·0.0930 = 0.0212 | **0.165** |
| d1,d4 | 0.00105 | 0.228·0.362 = 0.0826 | **0.013** |
| d2,d3 | 0.00176 | 0.228·0.0930 = 0.0212 | **0.083** |
| d2,d4 | 0.00105 | 0.228·0.362 = 0.0826 | **0.013** |
| d3,d4 | 0.00313 | 0.0930·0.362 = 0.0337 | **0.093** |

**Đọc kết quả**:
- d1 và d2 giống nhau nhất (0.192) — chia sẻ từ \`sat\` (IDF=0.301 cao).
- d1-d4 và d2-d4 thấp nhất (0.013) — chỉ chia sẻ \`cat\`/\`dog\` có IDF=0.125 rất nhỏ.
- Lưu ý d4 có vector dài (||·|| = 0.362) do \`the\` nặng nhưng không match với ai → cosine nhỏ.

### 9.3. Tại sao cosine, không phải dot thuần?

Cosine **chuẩn hoá theo độ dài** doc. Doc dài có TF nhỏ hơn nhưng có thể có nhiều từ → dot product dễ to giả tạo. Cosine chia cho \`||·||\` → fair.

> 📝 **Tóm tắt mục 9**. Cosine TF-IDF là cách "đo độ giống nhau" cổ điển. Cao = chia sẻ nhiều từ riêng (IDF cao). Là nền tảng cho search engine và recommend.

---

## 10. Mini search engine bằng TF-IDF

### 10.1. Pipeline

\`\`\`
1. Index: với mỗi doc trong corpus, tính vector TF-IDF.
2. Query: người dùng gõ query q (cũng là 1 chuỗi text).
3. Vectorize query: dùng cùng vocab + cùng IDF của corpus, tính TF-IDF(q).
4. Score: tính cos(q, d) cho mọi d.
5. Rank: sort descending, trả về top-k.
\`\`\`

### 10.2. Walk-through

Dùng lại corpus 4 doc ở mục 7. Query: \`q = "cat sat"\` (2 token, |q|=2).

**Bước 1 — Tokenize query**: \`[cat, sat]\`.

**Bước 2 — TF của query**:
- \`TF(cat, q) = 1/2 = 0.500\`
- \`TF(sat, q) = 1/2 = 0.500\`
- Các từ khác = 0.

**Bước 3 — TF-IDF của query** (dùng IDF đã tính từ corpus):
- \`TFIDF(cat, q) = 0.500 · 0.125 = 0.0625\`
- \`TFIDF(sat, q) = 0.500 · 0.301 = 0.1505\`

Vector \`q = [0.0625, 0, 0, 0, 0.1505, 0]\`.

**Bước 4 — Norm**: \`||q|| = √(0.0625² + 0.1505²) = √(0.0039 + 0.0227) = √0.0266 ≈ 0.163\`.

**Bước 5 — Cosine với mỗi doc**:

- \`q·d1 = 0.0625·0.042 + 0.1505·0.100 ≈ 0.00263 + 0.01505 = 0.01768\`
  - \`cos(q,d1) = 0.01768 / (0.163·0.228) = 0.01768 / 0.03716 ≈ **0.476**\`
- \`q·d2 = 0 + 0.1505·0.100 = 0.01505\`
  - \`cos(q,d2) = 0.01505 / (0.163·0.228) ≈ **0.405**\`
- \`q·d3 = 0.0625·0.083 + 0 ≈ 0.00519\`
  - \`cos(q,d3) = 0.00519 / (0.163·0.0930) ≈ **0.343**\`
- \`q·d4 = 0.0625·0.025 + 0 ≈ 0.00156\`
  - \`cos(q,d4) = 0.00156 / (0.163·0.362) ≈ **0.026**\`

**Bước 6 — Rank**:

| Rank | Doc | Cosine |
|------|-----|--------|
| 1    | d1  | 0.476  |
| 2    | d2  | 0.405  |
| 3    | d3  | 0.343  |
| 4    | d4  | 0.026  |

→ d1 (\`cat sat mat\`) đứng nhất vì chứa **cả 2 từ** trong query, và \`sat\` có IDF cao. d4 cuối cùng vì chỉ chứa \`cat\` với count nhỏ trong doc rất loãng.

> 💡 **Liên hệ thực tế**. Google trước 2018 (trước BERT) **dùng rất nhiều TF-IDF + BM25** (biến thể của TF-IDF có tính độ dài doc tốt hơn). Cosine TF-IDF là baseline đầu tiên của mọi search engine.

> ❓ **"Sao không tính dot product thuần — nhanh hơn?"**
>
> Dot product thuần đo "match có nhiều không" nhưng thiên vị doc dài. Vd doc dài 1000 từ có TF nhỏ nhưng dot vẫn lớn so với doc 5 từ. Cosine cân bằng = "tỷ lệ match", công bằng giữa doc dài và doc ngắn.

> 📝 **Tóm tắt mục 10**. Search engine TF-IDF = vector hoá doc + query → cosine → rank. Đơn giản, nhanh, không cần neural network — vẫn là baseline mạnh.

---

## 11. Hạn chế của vectorization cổ điển

3 vấn đề chính, mỗi cái là **động lực** cho 1 kỹ thuật hiện đại hơn:

### 11.1. Cao chiều và thưa

- Vocab tiếng Anh thực tế: 100k–1M từ. Mỗi doc là vector 100k chiều, hầu hết là 0.
- Tốn RAM (dù sparse format đỡ), tính toán chậm.
- **Giải pháp**: dense embedding (~300–1024 chiều) ở Lesson 06.

### 11.2. Không biểu diễn synonym / semantic

- \`car · automobile = 0\` trong one-hot và TF-IDF, dù 2 từ gần nghĩa.
- \`dog · puppy = 0\`, \`happy · joyful = 0\`.
- Search "automobile" không tìm thấy doc nói về "car".
- **Giải pháp**: embedding học từ co-occurrence — từ gần nghĩa sẽ có vector gần nhau (Lesson 06).

### 11.3. Không có context (mọi từ "đứng độc lập")

- \`bank\` trong "river bank" và "bank account" có cùng vector → mơ hồ.
- \`apple\` (quả) và \`Apple\` (công ty) cùng vector.
- **Giải pháp**: contextual embedding (BERT, GPT) — từ thay đổi vector theo ngữ cảnh xung quanh.

> ❓ **"Vậy TF-IDF còn dùng được không trong 2026?"**
>
> Có, ở 2 chỗ:
> 1. **Baseline rẻ, mạnh**: BM25 (biến thể TF-IDF) vẫn là retrieval baseline trong nhiều RAG system, kể cả khi dùng song song với dense retrieval.
> 2. **Bài toán đơn giản**: spam detection, sentiment đơn giản, classification có vocab cố định — TF-IDF + Logistic Regression vẫn hơn neural network nếu ít data.

---

## 12. Liên hệ với các bài tiếp theo

- **Lesson 06 — Word Embedding** ([\`../lesson-06-word-embeddings/\`](../lesson-06-word-embeddings/)): biểu diễn dày 300-D, học từ co-occurrence. Giải quyết 11.1 và 11.2.
- **Lesson 07 — Vector DB + RAG** ([\`../lesson-07-vector-db-rag/\`](../lesson-07-vector-db-rag/)): cosine similarity trên embedding để retrieve doc cho LLM. Pipeline tương tự mục 10 ở đây, chỉ thay TF-IDF bằng embedding.
- **Lesson 08 — CLIP** ([\`../lesson-08-clip-multimodal/\`](../lesson-08-clip-multimodal/)): ý tưởng "ảnh và text cùng không gian" — vẫn dùng cosine similarity, vẫn cần biết text vectorization tốt.

Cách nhìn: TF-IDF / BoW là **bậc thang đầu tiên** để hiểu khái niệm "doc → vector". Mọi kỹ thuật hiện đại đều giữ ý tưởng đó, chỉ thay cách tạo vector.

---

## 13. Bài tập

> **Quy tắc**: làm tay trước, kiểm tra với "Lời giải chi tiết" ở mục 14. Đừng đọc đáp án trước.

### Bài 1 — Tokenize + vocab

Cho 3 câu (đã lowercase, bỏ dấu câu):
- \`s1 = "tôi đi học"\`
- \`s2 = "tôi đi làm"\`
- \`s3 = "anh đi học"\`

**Yêu cầu**: liệt kê tokens của từng câu (word-level), xây vocab union (sắp xếp alphabet).

### Bài 2 — One-hot

Với vocab ở Bài 1, viết vector one-hot cho từng từ.

### Bài 3 — BoW

Tính vector BoW của \`s1, s2, s3\` ở Bài 1. Tính \`BoW(s1) · BoW(s2)\`.

### Bài 4 — TF-IDF tay

Cho corpus 3 doc:
- \`d1 = "apple banana"\`
- \`d2 = "apple cherry"\`
- \`d3 = "banana cherry date"\`

Tính TF (normalized), DF, IDF (log10), và TF-IDF cho mọi cặp (t, d). N=3.

### Bài 5 — Cosine similarity

Dựa trên TF-IDF ở Bài 4, tính \`cos(d1, d2)\`, \`cos(d1, d3)\`, \`cos(d2, d3)\`. Doc nào giống d1 nhất?

### Bài 6 — Mini search

Với corpus Bài 4, query \`q = "apple date"\`. Tính TF-IDF(q) (dùng IDF của corpus), rồi rank d1, d2, d3 theo cosine với q.

---

## 14. Lời giải chi tiết

### Lời giải Bài 1

**Tokens**:
- s1: \`[tôi, đi, học]\`
- s2: \`[tôi, đi, làm]\`
- s3: \`[anh, đi, học]\`

**Vocab union** (alphabet):

\`\`\`
V = [anh, đi, học, làm, tôi]   (V=5)
\`\`\`

### Lời giải Bài 2

| Từ   | Index | One-hot          |
|------|-------|------------------|
| anh  | 0     | \`[1, 0, 0, 0, 0]\` |
| đi   | 1     | \`[0, 1, 0, 0, 0]\` |
| học  | 2     | \`[0, 0, 1, 0, 0]\` |
| làm  | 3     | \`[0, 0, 0, 1, 0]\` |
| tôi  | 4     | \`[0, 0, 0, 0, 1]\` |

### Lời giải Bài 3

Đếm theo vocab \`[anh, đi, học, làm, tôi]\`:

| s | anh | đi | học | làm | tôi |
|---|-----|----|----|-----|-----|
| s1| 0   | 1  | 1  | 0   | 1   |
| s2| 0   | 1  | 0  | 1   | 1   |
| s3| 1   | 1  | 1  | 0   | 0   |

BoW:
- \`BoW(s1) = [0, 1, 1, 0, 1]\`
- \`BoW(s2) = [0, 1, 0, 1, 1]\`
- \`BoW(s3) = [1, 1, 1, 0, 0]\`

\`BoW(s1) · BoW(s2) = 0·0 + 1·1 + 1·0 + 0·1 + 1·1 = 0+1+0+0+1 = **2**\` (chia sẻ \`đi, tôi\`).

### Lời giải Bài 4

Vocab: \`[apple, banana, cherry, date]\` (V=4). N=3.

**Count(t, d)**:

| t       | d1 | d2 | d3 |
|---------|----|----|----|
| apple   | 1  | 1  | 0  |
| banana  | 1  | 0  | 1  |
| cherry  | 0  | 1  | 1  |
| date    | 0  | 0  | 1  |

\`|d1|=2, |d2|=2, |d3|=3\`.

**TF**:

| t       | TF(d1) | TF(d2) | TF(d3) |
|---------|--------|--------|--------|
| apple   | 0.500  | 0.500  | 0      |
| banana  | 0.500  | 0      | 1/3 ≈ 0.333 |
| cherry  | 0      | 0.500  | 0.333  |
| date    | 0      | 0      | 0.333  |

**DF**:

- apple: 2 (d1, d2)
- banana: 2 (d1, d3)
- cherry: 2 (d2, d3)
- date: 1 (d3)

**IDF = log10(N/DF) với N=3**:

- IDF(apple) = log10(3/2) = log10(1.5) ≈ **0.176**
- IDF(banana) ≈ **0.176**
- IDF(cherry) ≈ **0.176**
- IDF(date) = log10(3/1) = log10(3) ≈ **0.477**

**TF-IDF(t, d) = TF · IDF** (4 chữ số):

| t       | TFIDF(d1)             | TFIDF(d2)             | TFIDF(d3)              |
|---------|-----------------------|-----------------------|------------------------|
| apple   | 0.500·0.176 = **0.0880** | 0.500·0.176 = **0.0880** | 0                      |
| banana  | 0.500·0.176 = **0.0880** | 0                      | 0.333·0.176 ≈ **0.0586** |
| cherry  | 0                      | 0.500·0.176 = **0.0880** | 0.333·0.176 ≈ **0.0586** |
| date    | 0                      | 0                      | 0.333·0.477 ≈ **0.1589** |

Vector theo thứ tự \`[apple, banana, cherry, date]\`:

\`\`\`
d1 = [0.0880, 0.0880, 0.0000, 0.0000]
d2 = [0.0880, 0.0000, 0.0880, 0.0000]
d3 = [0.0000, 0.0586, 0.0586, 0.1589]
\`\`\`

### Lời giải Bài 5

**Norm L2**:

- \`||d1|| = √(0.0880² + 0.0880²) = √(0.00774 + 0.00774) = √0.01548 ≈ 0.1244\`
- \`||d2|| = √(0.0880² + 0.0880²) ≈ 0.1244\`
- \`||d3|| = √(0.0586² + 0.0586² + 0.1589²) = √(0.00343 + 0.00343 + 0.02525) = √0.03211 ≈ 0.1792\`

**Dot**:

- \`d1·d2 = 0.0880·0.0880 + 0 + 0 + 0 = 0.00774\` (chung apple)
- \`d1·d3 = 0 + 0.0880·0.0586 + 0 + 0 ≈ 0.00516\` (chung banana)
- \`d2·d3 = 0 + 0 + 0.0880·0.0586 + 0 ≈ 0.00516\` (chung cherry)

**Cosine**:

- \`cos(d1,d2) = 0.00774 / (0.1244·0.1244) = 0.00774 / 0.01548 = **0.500**\`
- \`cos(d1,d3) = 0.00516 / (0.1244·0.1792) = 0.00516 / 0.02229 ≈ **0.231**\`
- \`cos(d2,d3) = 0.00516 / (0.1244·0.1792) ≈ **0.231**\`

**Doc giống d1 nhất**: **d2** (0.500). Phù hợp: d1 và d2 đều có \`apple\`, còn d3 không có.

### Lời giải Bài 6

Query \`q = "apple date"\`, |q|=2.

**TF(q)**:
- apple: 0.500
- date: 0.500
- banana, cherry: 0

**TF-IDF(q)** (dùng IDF của corpus):
- apple: 0.500·0.176 = 0.0880
- date: 0.500·0.477 ≈ 0.2385

Vector \`q = [0.0880, 0, 0, 0.2385]\`.

\`||q|| = √(0.0880² + 0.2385²) = √(0.00774 + 0.05688) = √0.06462 ≈ 0.2542\`.

**Dot với mỗi doc**:

- \`q·d1 = 0.0880·0.0880 + 0 + 0 + 0.2385·0 = 0.00774\`
  - \`cos = 0.00774 / (0.2542·0.1244) = 0.00774 / 0.03162 ≈ **0.245**\`
- \`q·d2 = 0.0880·0.0880 + 0 + 0 + 0 = 0.00774\`
  - \`cos = 0.00774 / (0.2542·0.1244) ≈ **0.245**\`
- \`q·d3 = 0 + 0 + 0 + 0.2385·0.1589 ≈ 0.03790\`
  - \`cos = 0.03790 / (0.2542·0.1792) = 0.03790 / 0.04556 ≈ **0.832**\`

**Rank**:

| Rank | Doc | Cosine |
|------|-----|--------|
| 1    | d3  | 0.832  |
| 2    | d1  | 0.245  |
| 2    | d2  | 0.245  |

→ **d3 áp đảo** vì chứa \`date\` — từ có IDF cao nhất (0.477). Đây chính là cơ chế "phạt từ phổ biến, thưởng từ riêng" của TF-IDF: từ hiếm \`date\` quyết định kết quả search.

> 💡 **Bài học chốt**. TF-IDF không chỉ là một công thức — nó là cách mã hoá intuition "từ riêng quan trọng hơn từ phổ biến" thành đại số tuyến tính. Khi bạn cosine, bạn đang đo "tỷ lệ trùng các từ riêng" giữa 2 doc.

---

## 15. Liên kết

- **Trang chính lĩnh vực**: [\`../index.html\`](../index.html)
- **Trang chính repo**: [\`../../../index.html\`](../../../index.html)
- **Bài trước**: [Lesson 04 — Neural network](../lesson-04-neural-network/)
- **Bài sau**: [Lesson 06 — Word embedding](../lesson-06-word-embeddings/)
- **Visualization**: [\`./visualization.html\`](./visualization.html)

## 16. Tài liệu tham khảo

- Manning, Raghavan & Schütze, *Introduction to Information Retrieval* (Stanford), Ch.6 — Scoring, term weighting and the vector space model.
- Jurafsky & Martin, *Speech and Language Processing*, Ch.6 — Vector Semantics.
- Salton & Buckley (1988), *Term-weighting approaches in automatic text retrieval*.
`;
